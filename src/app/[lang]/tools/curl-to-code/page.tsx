'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ParsedCurl {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
  auth?: { username: string; password: string };
  cookies?: Record<string, string>;
}

function encodeBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return btoa(str);
  }
}

function parseCurlCommand(curlStr: string): ParsedCurl {
  const parsed: ParsedCurl = {
    method: 'GET',
    url: '',
    headers: {},
    cookies: {},
  };

  // Remove curl keyword at the beginning
  let cleaned = curlStr.trim();
  if (cleaned.startsWith('curl ')) {
    cleaned = cleaned.substring(5);
  }

  // Single quotes handling - convert to double quotes for easier parsing
  let inSingleQuote = false;
  let inDoubleQuote = false;
  let sanitized = '';
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      sanitized += '"';
    } else if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
      sanitized += char;
    } else {
      sanitized += char;
    }
  }

  // Extract URL - look for first unquoted word or quoted string
  const urlMatch = sanitized.match(/(?:^|\s)(?:"([^"]*)"|([^\s]+))/);
  if (urlMatch) {
    parsed.url = urlMatch[1] || urlMatch[2];
  }

  // Parse method (-X or --request)
  const methodMatch = sanitized.match(/(?:-X|--request)\s+(?:"([^"]*)"|(\S+))/);
  if (methodMatch) {
    parsed.method = (methodMatch[1] || methodMatch[2]).toUpperCase();
  }

  // Parse headers (-H or --header)
  const headerRegex = /(?:-H|--header)\s+(?:"([^"]*)"|(\S+))/g;
  let headerMatch;
  while ((headerMatch = headerRegex.exec(sanitized))) {
    const headerLine = headerMatch[1] || headerMatch[2];
    const [key, ...valueParts] = headerLine.split(':');
    if (key && valueParts.length > 0) {
      parsed.headers[key.trim()] = valueParts.join(':').trim();
    }
  }

  // Parse body (-d, --data, or --data-raw)
  const bodyMatch = sanitized.match(/(?:-d|--data|--data-raw)\s+(?:"([^"]*)"|'([^']*)'|(\S+))/);
  if (bodyMatch) {
    parsed.body = bodyMatch[1] || bodyMatch[2] || bodyMatch[3];
  }

  // Parse form data (-F or --form)
  const formMatch = sanitized.match(/(?:-F|--form)\s+(?:"([^"]*)"|(\S+))/);
  if (formMatch) {
    const formData = formMatch[1] || formMatch[2];
    if (!parsed.body) {
      parsed.body = formData;
    }
  }

  // Parse authentication (-u or --user)
  const authMatch = sanitized.match(/(?:-u|--user)\s+(?:"([^"]*)"|(\S+))/);
  if (authMatch) {
    const authStr = authMatch[1] || authMatch[2];
    const [username, password] = authStr.split(':');
    if (username) {
      parsed.auth = { username, password: password || '' };
    }
  }

  // Parse cookies (-b or --cookie)
  const cookieMatch = sanitized.match(/(?:-b|--cookie)\s+(?:"([^"]*)"|(\S+))/);
  if (cookieMatch) {
    const cookieStr = cookieMatch[1] || cookieMatch[2];
    const cookies = cookieStr.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=').map((s) => s.trim());
      if (key && value) {
        parsed.cookies![key] = value;
      }
    }
  }

  return parsed;
}

function generateJavaScript(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `const response = await fetch('${url}', {\n`;
  code += `  method: '${method}',\n`;

  if (Object.keys(headers).length > 0 || auth) {
    code += `  headers: {\n`;
    for (const [key, value] of Object.entries(headers)) {
      code += `    '${key}': '${value}',\n`;
    }
    if (auth) {
      const encoded = encodeBase64(`${auth.username}:${auth.password}`);
      code += `    'Authorization': 'Basic ${encoded}',\n`;
    }
    code += `  },\n`;
  }

  if (body) {
    code += `  body: ${typeof body === 'string' && body.startsWith('{') ? body : `'${body}'`},\n`;
  }

  code += `});\nconst data = await response.json();`;
  return code;
}

function generatePython(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `import requests\n\n`;

  if (auth) {
    code += `auth = ('${auth.username}', '${auth.password}')\n\n`;
  }

  const headerDict = Object.entries(headers)
    .map(([k, v]) => `    '${k}': '${v}'`)
    .join(',\n');

  code += `response = requests.${method.toLowerCase()}(\n`;
  code += `  '${url}',\n`;

  if (headerDict) {
    code += `  headers={\n${headerDict}\n  },\n`;
  }

  if (body) {
    code += `  json=${typeof body === 'string' && body.startsWith('{') ? body : `'${body}'`},\n`;
  }

  if (auth) {
    code += `  auth=auth,\n`;
  }

  code += `)\ndata = response.json()`;
  return code;
}

function generateGo(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `package main\n\nimport (\n`;
  code += `  "fmt"\n`;
  if (body || auth) code += `  "io"\n`;
  code += `  "net/http"\n`;
  if (body && typeof body === 'string' && body.startsWith('{')) code += `  "strings"\n`;
  code += `)\n\nfunc main() {\n`;

  if (body) {
    code += `  body := strings.NewReader(\`${body}\`)\n`;
  }

  code += `  req, _ := http.NewRequest("${method}", "${url}", ${body ? 'body' : 'nil'})\n`;

  for (const [key, value] of Object.entries(headers)) {
    code += `  req.Header.Add("${key}", "${value}")\n`;
  }

  if (auth) {
    code += `  req.SetBasicAuth("${auth.username}", "${auth.password}")\n`;
  }

  code += `  resp, _ := http.DefaultClient.Do(req)\n`;
  code += `  defer resp.Body.Close()\n`;
  code += `  fmt.Println(resp.Status)\n`;
  code += `}`;

  return code;
}

function generateJava(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `import java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.util.Base64;\n\n`;
  code += `public class CurlRequest {\n`;
  code += `  public static void main(String[] args) throws Exception {\n`;
  code += `    URL url = new URL("${url}");\n`;
  code += `    HttpURLConnection conn = (HttpURLConnection) url.openConnection();\n`;
  code += `    conn.setRequestMethod("${method}");\n`;

  for (const [key, value] of Object.entries(headers)) {
    code += `    conn.setRequestProperty("${key}", "${value}");\n`;
  }

  if (auth) {
    const encoded = encodeBase64(`${auth.username}:${auth.password}`);
    code += `    conn.setRequestProperty("Authorization", "Basic ${encoded}");\n`;
  }

  if (body) {
    code += `    conn.setDoOutput(true);\n`;
    code += `    conn.getOutputStream().write("${body}".getBytes());\n`;
  }

  code += `    int responseCode = conn.getResponseCode();\n`;
  code += `    System.out.println("Response Code: " + responseCode);\n`;
  code += `  }\n`;
  code += `}`;

  return code;
}

function generatePHP(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `<?php\n\n$curl = curl_init();\n\n`;
  code += `curl_setopt_array($curl, [\n`;
  code += `  CURLOPT_URL => '${url}',\n`;
  code += `  CURLOPT_CUSTOMREQUEST => '${method}',\n`;

  const headerArr = Object.entries(headers)
    .map(([k, v]) => `    '${k}: ${v}'`)
    .join(',\n');

  if (headerArr || auth) {
    code += `  CURLOPT_HTTPHEADER => [\n${headerArr}${auth ? (headerArr ? ',\n' : '') + `    'Authorization: Basic ' . base64_encode('${auth.username}:${auth.password}')` : ''}\n  ],\n`;
  }

  if (body) {
    code += `  CURLOPT_POSTFIELDS => '${body}',\n`;
  }

  code += `]);\n\n`;
  code += `$response = curl_exec($curl);\n`;
  code += `curl_close($curl);\n`;
  code += `echo $response;`;

  return code;
}

function generateNodeAxios(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `const axios = require('axios');\n\n`;
  code += `const config = {\n`;
  code += `  method: '${method.toLowerCase()}',\n`;
  code += `  url: '${url}',\n`;

  const headerObj = Object.entries(headers)
    .map(([k, v]) => `    '${k}': '${v}'`)
    .join(',\n');

  if (headerObj || auth) {
    code += `  headers: {\n${headerObj}${auth ? (headerObj ? ',\n' : '') + `    'Authorization': 'Basic ' + Buffer.from('${auth.username}:${auth.password}').toString('base64')` : ''}\n  },\n`;
  }

  if (body) {
    code += `  data: ${typeof body === 'string' && body.startsWith('{') ? body : `'${body}'`},\n`;
  }

  code += `};\n\naxios(config)\n`;
  code += `  .then((response) => console.log(response.data))\n`;
  code += `  .catch((error) => console.error(error));`;

  return code;
}

function generateRuby(parsed: ParsedCurl): string {
  const { url, method, headers, body, auth } = parsed;

  let code = `require 'net/http'\nrequire 'json'\nrequire 'base64'\n\n`;
  code += `uri = URI('${url}')\n`;
  code += `http = Net::HTTP.new(uri.host, uri.port)\n`;
  code += `request = Net::HTTP::${method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()}.new(uri.path)\n\n`;

  for (const [key, value] of Object.entries(headers)) {
    code += `request['${key}'] = '${value}'\n`;
  }

  if (auth) {
    code += `request.basic_auth('${auth.username}', '${auth.password}')\n`;
  }

  if (body) {
    code += `\nrequest.body = ${typeof body === 'string' && body.startsWith('{') ? body : `'${body}'`}\n`;
  }

  code += `\nresponse = http.request(request)\n`;
  code += `puts response.body`;

  return code;
}

function generateCode(language: string, parsed: ParsedCurl): string {
  switch (language) {
    case 'javascript':
      return generateJavaScript(parsed);
    case 'python':
      return generatePython(parsed);
    case 'go':
      return generateGo(parsed);
    case 'java':
      return generateJava(parsed);
    case 'php':
      return generatePHP(parsed);
    case 'nodejs':
      return generateNodeAxios(parsed);
    case 'ruby':
      return generateRuby(parsed);
    default:
      return '';
  }
}

export default function CurlToCode() {
  const { dict } = useLang();
  const t = dict.tools['curl-to-code'];
  const [curlInput, setCurlInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      if (!curlInput.trim()) {
        setError('Please enter a cURL command');
        setGeneratedCode('');
        return;
      }

      const parsed = parseCurlCommand(curlInput);

      if (!parsed.url) {
        setError('Could not find URL in cURL command');
        setGeneratedCode('');
        return;
      }

      const code = generateCode(selectedLanguage, parsed);
      setGeneratedCode(code);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error parsing cURL command');
      setGeneratedCode('');
    }
  };

  const loadSample = () => {
    setCurlInput(t.inputPlaceholder);
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="curl-to-code">
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleConvert} className="btn btn-primary">
          {t.convertBtn}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {t.loadSample}
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-primary)', fontWeight: 500 }}>
            {t.inputLabel}
          </label>
          <textarea
            value={curlInput}
            onChange={(e) => setCurlInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.inputPlaceholder}
            style={{
              width: '100%',
              minHeight: 200,
              padding: 12,
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              fontFamily: 'monospace',
              fontSize: 14,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-primary)', fontWeight: 500 }}>
            {t.languageLabel}
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => {
              setSelectedLanguage(e.target.value);
              if (generatedCode) {
                const parsed = parseCurlCommand(curlInput);
                if (parsed.url) {
                  setGeneratedCode(generateCode(e.target.value, parsed));
                }
              }
            }}
            style={{
              width: '100%',
              padding: 10,
              marginBottom: 12,
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            <option value="javascript">{t.javascript}</option>
            <option value="python">{t.pythonRequests}</option>
            <option value="go">{t.go}</option>
            <option value="java">{t.java}</option>
            <option value="php">{t.php}</option>
            <option value="nodejs">{t.nodejs}</option>
            <option value="ruby">{t.ruby}</option>
          </select>

          <div
            style={{
              position: 'relative',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              minHeight: 200,
              overflow: 'auto',
            }}
          >
            {generatedCode ? (
              <>
                <pre
                  style={{
                    padding: 12,
                    margin: 0,
                    fontSize: 13,
                    fontFamily: 'monospace',
                    color: 'var(--text-primary)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {generatedCode}
                </pre>
                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                  <CopyButton text={generatedCode} />
                </div>
              </>
            ) : (
              <div
                style={{
                  padding: 12,
                  color: 'var(--text-secondary)',
                  fontStyle: 'italic',
                }}
              >
                {error ? `Error: ${error}` : t.outputLabel}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: 'var(--text-primary)' }}>
          {t.seoTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
          {t.seoContent}
        </p>

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle}
        </h3>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
