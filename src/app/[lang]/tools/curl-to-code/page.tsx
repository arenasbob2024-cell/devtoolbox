'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  data: string;
  auth: { user: string; pass: string } | null;
  cookies: string;
  isJson: boolean;
}

function parseCurl(input: string): ParsedCurl {
  const result: ParsedCurl = {
    method: 'GET',
    url: '',
    headers: {},
    data: '',
    auth: null,
    cookies: '',
    isJson: false,
  };

  // Normalize: join line continuations, trim
  let cmd = input.trim();
  cmd = cmd.replace(/\\\s*\n/g, ' ').replace(/\\\s*\r\n/g, ' ');

  // Remove leading "curl" keyword
  if (/^curl\s/i.test(cmd)) {
    cmd = cmd.replace(/^curl\s+/i, '');
  }

  const tokens: string[] = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;
  let escape = false;

  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i];
    if (escape) {
      current += ch;
      escape = false;
      continue;
    }
    if (ch === '\\' && !inSingle) {
      escape = true;
      continue;
    }
    if (ch === "'" && !inDouble) {
      inSingle = !inSingle;
      continue;
    }
    if (ch === '"' && !inSingle) {
      inDouble = !inDouble;
      continue;
    }
    if ((ch === ' ' || ch === '\t') && !inSingle && !inDouble) {
      if (current.length > 0) {
        tokens.push(current);
        current = '';
      }
      continue;
    }
    current += ch;
  }
  if (current.length > 0) tokens.push(current);

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token === '-X' || token === '--request') {
      i++;
      if (i < tokens.length) result.method = tokens[i].toUpperCase();
    } else if (token === '-H' || token === '--header') {
      i++;
      if (i < tokens.length) {
        const colonIdx = tokens[i].indexOf(':');
        if (colonIdx > 0) {
          const key = tokens[i].substring(0, colonIdx).trim();
          const value = tokens[i].substring(colonIdx + 1).trim();
          result.headers[key] = value;
        }
      }
    } else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
      i++;
      if (i < tokens.length) {
        result.data = tokens[i];
        if (result.method === 'GET') result.method = 'POST';
      }
    } else if (token === '--data-urlencode') {
      i++;
      if (i < tokens.length) {
        const part = tokens[i];
        if (result.data) result.data += '&' + encodeURIComponent(part);
        else result.data = encodeURIComponent(part);
        if (result.method === 'GET') result.method = 'POST';
        if (!result.headers['Content-Type']) {
          result.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
      }
    } else if (token === '-u' || token === '--user') {
      i++;
      if (i < tokens.length) {
        const parts = tokens[i].split(':');
        result.auth = { user: parts[0], pass: parts.slice(1).join(':') };
      }
    } else if (token === '-b' || token === '--cookie') {
      i++;
      if (i < tokens.length) result.cookies = tokens[i];
    } else if (token === '-L' || token === '--location' || token === '-s' || token === '--silent' || token === '-k' || token === '--insecure' || token === '-v' || token === '--verbose' || token === '--compressed') {
      // flags without values, skip
    } else if (token === '-o' || token === '--output' || token === '-A' || token === '--user-agent') {
      i++; // skip the value
    } else if (!token.startsWith('-')) {
      result.url = token;
    }
    i++;
  }

  // Detect JSON body
  if (result.data) {
    try {
      JSON.parse(result.data);
      result.isJson = true;
    } catch {
      // not json
    }
  }

  // Check Content-Type header for JSON
  const ct = result.headers['Content-Type'] || result.headers['content-type'] || '';
  if (ct.includes('application/json')) result.isJson = true;

  return result;
}

type TargetLang = 'python' | 'javascript' | 'php' | 'go' | 'rust' | 'java' | 'csharp' | 'ruby';

function generateCode(parsed: ParsedCurl, lang: TargetLang): string {
  const { method, url, headers, data, auth, cookies, isJson } = parsed;

  switch (lang) {
    case 'python': {
      const lines: string[] = ['import requests', ''];
      const kwargs: string[] = [];

      if (Object.keys(headers).length > 0) {
        lines.push('headers = {');
        for (const [k, v] of Object.entries(headers)) {
          lines.push(`    "${k}": "${v}",`);
        }
        lines.push('}');
        kwargs.push('headers=headers');
      }

      if (data && isJson) {
        lines.push('');
        lines.push(`json_data = ${data}`);
        kwargs.push('json=json_data');
      } else if (data) {
        lines.push('');
        lines.push(`data = "${data}"`);
        kwargs.push('data=data');
      }

      if (auth) {
        kwargs.push(`auth=("${auth.user}", "${auth.pass}")`);
      }

      if (cookies) {
        lines.push('');
        lines.push('cookies = {');
        cookies.split(';').forEach(c => {
          const [k, ...v] = c.trim().split('=');
          if (k) lines.push(`    "${k.trim()}": "${v.join('=').trim()}",`);
        });
        lines.push('}');
        kwargs.push('cookies=cookies');
      }

      lines.push('');
      const argsStr = kwargs.length > 0 ? `, ${kwargs.join(', ')}` : '';
      lines.push(`response = requests.${method.toLowerCase()}("${url}"${argsStr})`);
      lines.push('');
      lines.push('print(response.status_code)');
      lines.push('print(response.text)');
      return lines.join('\n');
    }

    case 'javascript': {
      const lines: string[] = [];
      const opts: string[] = [];
      opts.push(`  method: "${method}"`);

      if (Object.keys(headers).length > 0 || auth) {
        const allHeaders = { ...headers };
        if (auth) {
          allHeaders['Authorization'] = `Basic \${btoa("${auth.user}:${auth.pass}")}`;
        }
        if (cookies) {
          allHeaders['Cookie'] = cookies;
        }
        opts.push('  headers: {');
        for (const [k, v] of Object.entries(allHeaders)) {
          if (k === 'Authorization' && auth) {
            opts.push(`    "Authorization": \`Basic \${btoa("${auth.user}:${auth.pass}")}\`,`);
          } else {
            opts.push(`    "${k}": "${v}",`);
          }
        }
        opts.push('  }');
      }

      if (data) {
        if (isJson) {
          opts.push(`  body: JSON.stringify(${data})`);
        } else {
          opts.push(`  body: "${data}"`);
        }
      }

      lines.push(`const response = await fetch("${url}", {`);
      lines.push(opts.join(',\n'));
      lines.push('});');
      lines.push('');
      lines.push('const data = await response.json();');
      lines.push('console.log(data);');
      return lines.join('\n');
    }

    case 'php': {
      const lines: string[] = ['<?php', '', '$ch = curl_init();', ''];
      lines.push(`curl_setopt($ch, CURLOPT_URL, "${url}");`);
      lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);');

      if (method !== 'GET') {
        lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${method}");`);
      }

      if (Object.keys(headers).length > 0) {
        lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [');
        for (const [k, v] of Object.entries(headers)) {
          lines.push(`    "${k}: ${v}",`);
        }
        lines.push(']);');
      }

      if (data) {
        lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, '${data.replace(/'/g, "\\'")}');`);
      }

      if (auth) {
        lines.push(`curl_setopt($ch, CURLOPT_USERPWD, "${auth.user}:${auth.pass}");`);
      }

      if (cookies) {
        lines.push(`curl_setopt($ch, CURLOPT_COOKIE, "${cookies}");`);
      }

      lines.push('');
      lines.push('$response = curl_exec($ch);');
      lines.push('curl_close($ch);');
      lines.push('');
      lines.push('echo $response;');
      return lines.join('\n');
    }

    case 'go': {
      const lines: string[] = ['package main', '', 'import (', '\t"fmt"', '\t"io"', '\t"net/http"'];
      if (data) lines.push('\t"strings"');
      if (auth) lines.push('\t"encoding/base64"');
      lines.push(')', '');
      lines.push('func main() {');

      if (data) {
        lines.push(`\tbody := strings.NewReader(\`${data}\`)`);
        lines.push(`\treq, err := http.NewRequest("${method}", "${url}", body)`);
      } else {
        lines.push(`\treq, err := http.NewRequest("${method}", "${url}", nil)`);
      }
      lines.push('\tif err != nil {');
      lines.push('\t\tpanic(err)');
      lines.push('\t}');

      for (const [k, v] of Object.entries(headers)) {
        lines.push(`\treq.Header.Set("${k}", "${v}")`);
      }

      if (auth) {
        lines.push(`\treq.Header.Set("Authorization", "Basic " + base64.StdEncoding.EncodeToString([]byte("${auth.user}:${auth.pass}")))`);
      }

      if (cookies) {
        lines.push(`\treq.Header.Set("Cookie", "${cookies}")`);
      }

      lines.push('');
      lines.push('\tclient := &http.Client{}');
      lines.push('\tresp, err := client.Do(req)');
      lines.push('\tif err != nil {');
      lines.push('\t\tpanic(err)');
      lines.push('\t}');
      lines.push('\tdefer resp.Body.Close()');
      lines.push('');
      lines.push('\trespBody, _ := io.ReadAll(resp.Body)');
      lines.push('\tfmt.Println(string(respBody))');
      lines.push('}');
      return lines.join('\n');
    }

    case 'rust': {
      const lines: string[] = [
        '// Add to Cargo.toml: reqwest = { version = "0.11", features = ["blocking"] }',
        '',
        'use reqwest::blocking::Client;',
        '',
        'fn main() -> Result<(), Box<dyn std::error::Error>> {',
        '    let client = Client::new();',
        '',
      ];

      lines.push(`    let response = client.${method.toLowerCase()}("${url}")`);

      for (const [k, v] of Object.entries(headers)) {
        lines.push(`        .header("${k}", "${v}")`);
      }

      if (auth) {
        lines.push(`        .basic_auth("${auth.user}", Some("${auth.pass}"))`);
      }

      if (data) {
        if (isJson) {
          lines.push(`        .json(&serde_json::from_str::<serde_json::Value>(r#"${data}"#)?)`);
        } else {
          lines.push(`        .body("${data}")`);
        }
      }

      lines.push('        .send()?;');
      lines.push('');
      lines.push('    println!("{}", response.text()?);');
      lines.push('    Ok(())');
      lines.push('}');
      return lines.join('\n');
    }

    case 'java': {
      const lines: string[] = [
        'import java.net.URI;',
        'import java.net.http.HttpClient;',
        'import java.net.http.HttpRequest;',
        'import java.net.http.HttpResponse;',
        '',
        'public class Main {',
        '    public static void main(String[] args) throws Exception {',
        '        HttpClient client = HttpClient.newHttpClient();',
        '',
      ];

      lines.push('        HttpRequest request = HttpRequest.newBuilder()');
      lines.push(`            .uri(URI.create("${url}"))`);

      if (data) {
        lines.push(`            .method("${method}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(data)}))`);
      } else {
        lines.push(`            .method("${method}", HttpRequest.BodyPublishers.noBody())`);
      }

      for (const [k, v] of Object.entries(headers)) {
        lines.push(`            .header("${k}", "${v}")`);
      }

      if (auth) {
        lines.push(`            .header("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString("${auth.user}:${auth.pass}".getBytes()))`);
      }

      if (cookies) {
        lines.push(`            .header("Cookie", "${cookies}")`);
      }

      lines.push('            .build();');
      lines.push('');
      lines.push('        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());');
      lines.push('        System.out.println(response.statusCode());');
      lines.push('        System.out.println(response.body());');
      lines.push('    }');
      lines.push('}');
      return lines.join('\n');
    }

    case 'csharp': {
      const lines: string[] = [
        'using System;',
        'using System.Net.Http;',
        'using System.Text;',
        'using System.Threading.Tasks;',
        '',
        'class Program',
        '{',
        '    static async Task Main()',
        '    {',
        '        using var client = new HttpClient();',
        '',
      ];

      for (const [k, v] of Object.entries(headers)) {
        if (k.toLowerCase() === 'content-type') continue;
        lines.push(`        client.DefaultRequestHeaders.Add("${k}", "${v}");`);
      }

      if (auth) {
        lines.push(`        client.DefaultRequestHeaders.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes("${auth.user}:${auth.pass}")));`);
      }

      if (cookies) {
        lines.push(`        client.DefaultRequestHeaders.Add("Cookie", "${cookies}");`);
      }

      lines.push('');

      const ct = headers['Content-Type'] || headers['content-type'] || (isJson ? 'application/json' : 'text/plain');

      if (data) {
        lines.push(`        var content = new StringContent(@"${data.replace(/"/g, '""')}", Encoding.UTF8, "${ct}");`);
        lines.push(`        var response = await client.${method === 'POST' ? 'PostAsync' : method === 'PUT' ? 'PutAsync' : 'SendAsync'}(`);
        if (method !== 'POST' && method !== 'PUT') {
          lines.push(`            new HttpRequestMessage(new HttpMethod("${method}"), "${url}") { Content = content });`);
        } else {
          lines.push(`            "${url}", content);`);
        }
      } else {
        if (method === 'GET') {
          lines.push(`        var response = await client.GetAsync("${url}");`);
        } else if (method === 'DELETE') {
          lines.push(`        var response = await client.DeleteAsync("${url}");`);
        } else {
          lines.push(`        var response = await client.SendAsync(`);
          lines.push(`            new HttpRequestMessage(new HttpMethod("${method}"), "${url}"));`);
        }
      }

      lines.push('');
      lines.push('        var body = await response.Content.ReadAsStringAsync();');
      lines.push('        Console.WriteLine($"Status: {response.StatusCode}");');
      lines.push('        Console.WriteLine(body);');
      lines.push('    }');
      lines.push('}');
      return lines.join('\n');
    }

    case 'ruby': {
      const lines: string[] = [
        "require 'net/http'",
        "require 'uri'",
        "require 'json'",
        '',
      ];

      lines.push(`uri = URI.parse("${url}")`);
      lines.push('http = Net::HTTP.new(uri.host, uri.port)');
      lines.push('http.use_ssl = true if uri.scheme == "https"');
      lines.push('');

      const rubyMethod = method.charAt(0) + method.slice(1).toLowerCase();
      lines.push(`request = Net::HTTP::${rubyMethod}.new(uri.request_uri)`);

      for (const [k, v] of Object.entries(headers)) {
        lines.push(`request["${k}"] = "${v}"`);
      }

      if (auth) {
        lines.push(`request.basic_auth("${auth.user}", "${auth.pass}")`);
      }

      if (cookies) {
        lines.push(`request["Cookie"] = "${cookies}"`);
      }

      if (data) {
        if (isJson) {
          lines.push(`request.body = '${data}'`);
          lines.push('request["Content-Type"] = "application/json"');
        } else {
          lines.push(`request.body = "${data}"`);
        }
      }

      lines.push('');
      lines.push('response = http.request(request)');
      lines.push('puts response.code');
      lines.push('puts response.body');
      return lines.join('\n');
    }

    default:
      return '';
  }
}

const SAMPLE_CURL = `curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiZGV2In0.abc123" \\
  -d '{"name": "John Doe", "email": "john@example.com", "role": "admin"}'`;

const LANGUAGES: { id: TargetLang; label: string }[] = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'php', label: 'PHP' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'java', label: 'Java' },
  { id: 'csharp', label: 'C#' },
  { id: 'ruby', label: 'Ruby' },
];

export default function CurlToCode() {
  const { dict } = useLang();
  const t = dict.tools['curl-to-code'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [selectedLang, setSelectedLang] = useState<TargetLang>('python');

  const convert = (curlInput?: string, lang?: TargetLang) => {
    const src = curlInput ?? input;
    const target = lang ?? selectedLang;
    if (!src.trim()) {
      setError('Please enter a cURL command');
      setOutput('');
      return;
    }
    try {
      const parsed = parseCurl(src);
      if (!parsed.url) {
        setError('Could not find a URL in the cURL command');
        setOutput('');
        return;
      }
      const code = generateCode(parsed, target);
      setOutput(code);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to parse cURL command');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(SAMPLE_CURL);
    try {
      const parsed = parseCurl(SAMPLE_CURL);
      setOutput(generateCode(parsed, selectedLang));
      setError('');
    } catch {
      // ignore
    }
  };

  const handleLangChange = (lang: TargetLang) => {
    setSelectedLang(lang);
    if (input.trim()) {
      convert(input, lang);
    }
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'cURL to Code Converter'}
      description={(t.pageDescription as string) || 'Convert cURL commands to code'}
      toolId="curl-to-code"
    >
      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => convert()} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      {/* Error display */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          {error}
        </div>
      )}

      {/* Input area */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
          cURL Command
        </label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={'curl -X GET https://api.example.com/data -H "Authorization: Bearer token"'}
          style={{
            minHeight: 150,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
          }}
        />
      </div>

      {/* Language tabs */}
      <div style={{ marginBottom: 12 }}>
        <div style={{
          display: 'flex',
          gap: 0,
          borderBottom: '2px solid var(--border-color)',
          overflowX: 'auto',
        }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => handleLangChange(lang.id)}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: selectedLang === lang.id ? 700 : 400,
                color: selectedLang === lang.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                borderBottom: selectedLang === lang.id ? '2px solid var(--accent-blue)' : '2px solid transparent',
                cursor: 'pointer',
                marginBottom: -2,
                whiteSpace: 'nowrap',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output area */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>
            Generated Code
          </label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea
          value={output}
          readOnly
          placeholder={common.resultPlaceholder}
          style={{
            minHeight: 350,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            opacity: output ? 1 : 0.5,
          }}
        />
      </div>

      {/* SEO section */}
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
