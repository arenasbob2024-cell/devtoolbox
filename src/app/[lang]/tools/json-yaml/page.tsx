'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (obj === undefined) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(':') || obj.includes('#') || obj.includes('"') || obj.includes("'") || obj.startsWith(' ') || obj.endsWith(' ') || /^[\[\]{}>|*&!%@,`]/.test(obj)) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return obj || '""';
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj.map(item => {
      const val = jsonToYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const lines = val.split('\n');
        return `${pad}- ${lines[0]}\n${lines.slice(1).map(l => `${pad}  ${l}`).join('\n')}`;
      }
      return `${pad}- ${val}`;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([key, val]) => {
      const safeKey = /[:\s#\[\]{}>,|*&!%@'"`]/.test(key) ? `"${key}"` : key;
      if (typeof val === 'object' && val !== null) {
        return `${pad}${safeKey}:\n${jsonToYaml(val, indent + 1)}`;
      }
      return `${pad}${safeKey}: ${jsonToYaml(val, indent)}`;
    }).join('\n');
  }
  return String(obj);
}

function yamlToJson(yaml: string): unknown {
  const lines = yaml.split('\n');
  const result: unknown[] = [{}];
  const indentStack: number[] = [0];
  const keyStack: string[] = [''];
  
  // Simple YAML parser for basic structures
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const match = line.match(/^(\s*)(- )?(.*)/);
    if (!match) continue;
    
    const indent = match[1].length;
    const isArray = !!match[2];
    let content = match[3];
    if (isArray) content = match[2] + content;
    
    // Parse key-value or array items
    if (isArray) {
      const val = content.replace(/^- /, '').trim();
      const kvMatch = val.match(/^([^:]+):\s*(.*)/);
      if (kvMatch) {
        // array of objects - simplified handling
        void indent; // basic YAML parsing
      }
      void val;
    }
  }
  
  // For complex YAML, use a regex-based approach
  try {
    // Try to parse simple YAML
    return parseSimpleYaml(yaml);
  } catch {
    throw new Error('Invalid YAML or unsupported YAML syntax');
  }
}

function parseSimpleYaml(yaml: string): unknown {
  const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  if (lines.length === 0) return {};
  
  // Check if it's an array
  if (lines[0].trim().startsWith('- ')) {
    return parseYamlArray(lines, 0).value;
  }
  
  return parseYamlObject(lines, 0).value;
}

function parseYamlValue(val: string): unknown {
  val = val.trim();
  if (val === '' || val === 'null' || val === '~') return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^-?\d+$/.test(val)) return parseInt(val);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
  if (val === '[]') return [];
  if (val === '{}') return {};
  return val;
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseYamlObject(lines: string[], baseIndent: number): { value: Record<string, unknown>; consumed: number } {
  const obj: Record<string, unknown> = {};
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const indent = getIndent(line);
    if (indent < baseIndent) break;
    if (indent > baseIndent) break;
    
    const match = line.trim().match(/^([^:]+?):\s*(.*)/);
    if (!match) { i++; continue; }
    
    const key = match[1].replace(/^["']|["']$/g, '');
    const val = match[2].trim();
    
    if (val === '' || val === '|' || val === '>') {
      // Check next lines for nested content
      const nextI = i + 1;
      if (nextI < lines.length) {
        const nextIndent = getIndent(lines[nextI]);
        if (nextIndent > indent) {
          if (lines[nextI].trim().startsWith('- ')) {
            const result = parseYamlArray(lines.slice(nextI), nextIndent);
            obj[key] = result.value;
            i = nextI + result.consumed;
          } else {
            const result = parseYamlObject(lines.slice(nextI), nextIndent);
            obj[key] = result.value;
            i = nextI + result.consumed;
          }
          continue;
        }
      }
      obj[key] = null;
    } else {
      obj[key] = parseYamlValue(val);
    }
    i++;
  }
  
  return { value: obj, consumed: i };
}

function parseYamlArray(lines: string[], baseIndent: number): { value: unknown[]; consumed: number } {
  const arr: unknown[] = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    const indent = getIndent(line);
    if (indent < baseIndent) break;
    
    if (line.trim().startsWith('- ')) {
      const val = line.trim().replace(/^- /, '').trim();
      const kvMatch = val.match(/^([^:]+?):\s*(.*)/);
      
      if (kvMatch) {
        // Array item is an object
        const obj: Record<string, unknown> = {};
        const key = kvMatch[1].replace(/^["']|["']$/g, '');
        const v = kvMatch[2].trim();
        obj[key] = v ? parseYamlValue(v) : null;
        
        // Check for more keys at deeper indent
        let j = i + 1;
        while (j < lines.length && !lines[j].trim().startsWith('- ') && getIndent(lines[j]) > indent) {
          const km = lines[j].trim().match(/^([^:]+?):\s*(.*)/);
          if (km) {
            obj[km[1].replace(/^["']|["']$/g, '')] = parseYamlValue(km[2]);
          }
          j++;
        }
        arr.push(obj);
        i = j;
        continue;
      } else {
        arr.push(parseYamlValue(val));
      }
    }
    i++;
  }
  
  return { value: arr, consumed: i };
}

export default function JsonYamlConverter() {
  const { dict } = useLang();
  const t = dict.tools['json-yaml'];

  const [jsonInput, setJsonInput] = useState('');
  const [yamlInput, setYamlInput] = useState('');
  const [error, setError] = useState('');

  const convertToYaml = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setYamlInput(jsonToYaml(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.invalidJson);
    }
  };

  const convertToJson = () => {
    try {
      const result = yamlToJson(yamlInput);
      setJsonInput(JSON.stringify(result, null, 2));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.invalidYaml);
    }
  };

  const loadSample = () => {
    const sample = {
      server: {
        host: "localhost",
        port: 8080,
        ssl: true
      },
      database: {
        driver: "postgresql",
        host: "db.example.com",
        name: "myapp",
        pool_size: 10
      },
      features: ["auth", "logging", "cache"],
      logging: {
        level: "info",
        format: "json"
      }
    };
    setJsonInput(JSON.stringify(sample, null, 2));
    setYamlInput('');
    setError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-yaml"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToYaml} className="btn btn-primary">{t.jsonToYaml}</button>
        <button onClick={convertToJson} className="btn btn-secondary">{t.yamlToJson}</button>
        <button onClick={loadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setYamlInput(''); setError(''); }} className="btn btn-ghost">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON</label>
            <CopyButton text={jsonInput} />
          </div>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={t.jsonPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>YAML</label>
            <CopyButton text={yamlInput} />
          </div>
          <textarea
            value={yamlInput}
            onChange={e => setYamlInput(e.target.value)}
            placeholder={t.yamlPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
