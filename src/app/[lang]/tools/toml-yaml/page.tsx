'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// ---- Basic TOML Parser ----
function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentSection = result;
  const lines = toml.split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === '' || line.startsWith('#')) continue;

    // Section header [section] or [section.subsection]
    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const parts = sectionMatch[1].split('.').map(p => p.trim());
      let target = result;
      for (const part of parts) {
        if (!(part in target) || typeof target[part] !== 'object' || Array.isArray(target[part])) {
          target[part] = {};
        }
        target = target[part] as Record<string, unknown>;
      }
      currentSection = target;
      continue;
    }

    // Array of tables [[section]]
    const arrayTableMatch = line.match(/^\[\[([^\]]+)\]\]$/);
    if (arrayTableMatch) {
      const parts = arrayTableMatch[1].split('.').map(p => p.trim());
      let target = result;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in target)) target[parts[i]] = {};
        target = target[parts[i]] as Record<string, unknown>;
      }
      const lastKey = parts[parts.length - 1];
      if (!Array.isArray(target[lastKey])) target[lastKey] = [];
      const newObj: Record<string, unknown> = {};
      (target[lastKey] as unknown[]).push(newObj);
      currentSection = newObj;
      continue;
    }

    // Key = value
    const kvMatch = line.match(/^([^=]+?)\s*=\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const value = parseTomlValue(kvMatch[2].trim());
      currentSection[key] = value;
    }
  }

  return result;
}

function parseTomlValue(val: string): unknown {
  // String (double quotes)
  if (val.startsWith('"') && val.endsWith('"')) {
    return val.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\').replace(/\\"/g, '"');
  }
  // String (single quotes)
  if (val.startsWith("'") && val.endsWith("'")) {
    return val.slice(1, -1);
  }
  // Boolean
  if (val === 'true') return true;
  if (val === 'false') return false;
  // Integer
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  // Float
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  // Array
  if (val.startsWith('[') && val.endsWith(']')) {
    const inner = val.slice(1, -1).trim();
    if (inner === '') return [];
    // Simple split by comma (doesn't handle nested arrays with commas in strings)
    const items = splitArrayItems(inner);
    return items.map(item => parseTomlValue(item.trim()));
  }
  // Inline table
  if (val.startsWith('{') && val.endsWith('}')) {
    const inner = val.slice(1, -1).trim();
    if (inner === '') return {};
    const obj: Record<string, unknown> = {};
    const pairs = inner.split(',');
    for (const pair of pairs) {
      const eqIdx = pair.indexOf('=');
      if (eqIdx !== -1) {
        const k = pair.slice(0, eqIdx).trim();
        const v = pair.slice(eqIdx + 1).trim();
        obj[k] = parseTomlValue(v);
      }
    }
    return obj;
  }
  // Unquoted string fallback
  return val;
}

function splitArrayItems(str: string): string[] {
  const items: string[] = [];
  let depth = 0;
  let current = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      current += ch;
      if (ch === stringChar && str[i - 1] !== '\\') inString = false;
    } else if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      current += ch;
    } else if (ch === '[' || ch === '{') {
      depth++;
      current += ch;
    } else if (ch === ']' || ch === '}') {
      depth--;
      current += ch;
    } else if (ch === ',' && depth === 0) {
      items.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) items.push(current);
  return items;
}

// ---- Basic YAML Parser ----
function parseYaml(yaml: string): Record<string, unknown> {
  const lines = yaml.split('\n');
  return parseYamlLines(lines, 0, 0).value as Record<string, unknown>;
}

function parseYamlLines(lines: string[], startIdx: number, baseIndent: number): { value: unknown; nextIdx: number } {
  const result: Record<string, unknown> = {};
  let i = startIdx;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '' || line.trim().startsWith('#')) { i++; continue; }

    const currentIndent = line.length - line.trimStart().length;
    if (currentIndent < baseIndent) break;
    if (currentIndent > baseIndent && i > startIdx) break;

    const trimmed = line.trim();

    // Array item at current level: "- value" or "- key: value"
    if (trimmed.startsWith('- ')) {
      const arr: unknown[] = [];
      while (i < lines.length) {
        const aLine = lines[i];
        if (aLine.trim() === '' || aLine.trim().startsWith('#')) { i++; continue; }
        const aIndent = aLine.length - aLine.trimStart().length;
        if (aIndent < baseIndent) break;
        if (aIndent !== baseIndent) break;
        const aTrimmed = aLine.trim();
        if (!aTrimmed.startsWith('- ')) break;
        const itemVal = aTrimmed.slice(2).trim();
        // Check if following lines are indented (nested object under array item)
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          if (nextLine.trim() !== '' && !nextLine.trim().startsWith('#')) {
            const nextIndent = nextLine.length - nextLine.trimStart().length;
            if (nextIndent > baseIndent + 2 || (nextIndent > baseIndent && nextLine.trim().includes(': '))) {
              // Check if itemVal contains a key: value
              if (itemVal.includes(': ')) {
                const colonIdx = itemVal.indexOf(': ');
                const k = itemVal.slice(0, colonIdx);
                const v = itemVal.slice(colonIdx + 2);
                const sub = parseYamlLines(lines, i + 1, nextIndent);
                const obj = sub.value as Record<string, unknown>;
                obj[k] = parseYamlScalar(v);
                arr.push(obj);
                i = sub.nextIdx;
                continue;
              }
            }
          }
        }
        arr.push(parseYamlScalar(itemVal));
        i++;
      }
      return { value: arr, nextIdx: i };
    }

    // Key: value pair
    const kvMatch = trimmed.match(/^([^:]+?):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const val = kvMatch[2].trim();

      if (val === '' || val === '|' || val === '>') {
        // Check next lines for nested content
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          if (nextLine.trim() !== '') {
            const nextIndent = nextLine.length - nextLine.trimStart().length;
            if (nextIndent > currentIndent) {
              const sub = parseYamlLines(lines, i + 1, nextIndent);
              result[key] = sub.value;
              i = sub.nextIdx;
              continue;
            }
          }
        }
        result[key] = '';
      } else if (val.startsWith('[') && val.endsWith(']')) {
        // Inline array
        const inner = val.slice(1, -1).trim();
        if (inner === '') {
          result[key] = [];
        } else {
          result[key] = inner.split(',').map(s => parseYamlScalar(s.trim()));
        }
      } else if (val.startsWith('{') && val.endsWith('}')) {
        // Inline object
        const inner = val.slice(1, -1).trim();
        if (inner === '') {
          result[key] = {};
        } else {
          const obj: Record<string, unknown> = {};
          const pairs = inner.split(',');
          for (const pair of pairs) {
            const ci = pair.indexOf(':');
            if (ci !== -1) {
              obj[pair.slice(0, ci).trim()] = parseYamlScalar(pair.slice(ci + 1).trim());
            }
          }
          result[key] = obj;
        }
      } else {
        result[key] = parseYamlScalar(val);
      }
      i++;
    } else {
      i++;
    }
  }

  return { value: result, nextIdx: i };
}

function parseYamlScalar(val: string): unknown {
  if (val === 'true' || val === 'True' || val === 'TRUE') return true;
  if (val === 'false' || val === 'False' || val === 'FALSE') return false;
  if (val === 'null' || val === 'Null' || val === 'NULL' || val === '~') return null;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  // Remove surrounding quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  return val;
}

// ---- Serializers ----
function objectToYaml(obj: unknown, indent: number = 0): string {
  const prefix = '  '.repeat(indent);

  if (obj === null) return 'null';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    if (obj.includes('\n') || obj.includes(': ') || obj.includes('#') || obj === '') {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    }
    return obj;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    // Check if all primitive
    const allPrimitive = obj.every(item => typeof item !== 'object' || item === null);
    if (allPrimitive) {
      return '\n' + obj.map(item => `${prefix}- ${objectToYaml(item, indent + 1)}`).join('\n');
    }
    return '\n' + obj.map(item => {
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const entries = Object.entries(item as Record<string, unknown>);
        if (entries.length === 0) return `${prefix}- {}`;
        const first = `${prefix}- ${entries[0][0]}: ${objectToYaml(entries[0][1], indent + 2)}`;
        const rest = entries.slice(1).map(([k, v]) => {
          const valStr = objectToYaml(v, indent + 2);
          return `${prefix}  ${k}: ${valStr}`;
        });
        return [first, ...rest].join('\n');
      }
      return `${prefix}- ${objectToYaml(item, indent + 1)}`;
    }).join('\n');
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return entries.map(([k, v]) => {
      const valStr = objectToYaml(v, indent + 1);
      if (typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).length > 0) {
        return `${prefix}${k}:\n${valStr}`;
      }
      if (Array.isArray(v) && v.length > 0) {
        return `${prefix}${k}:${valStr}`;
      }
      return `${prefix}${k}: ${valStr}`;
    }).join('\n');
  }

  return String(obj);
}

function objectToToml(obj: Record<string, unknown>, prefix: string = ''): string {
  const lines: string[] = [];
  const sections: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      lines.push(`${key} = ""`);
    } else if (typeof value === 'string') {
      lines.push(`${key} = "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      lines.push(`${key} = ${value}`);
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        // Array of tables
        for (const item of value) {
          const sectionName = prefix ? `${prefix}.${key}` : key;
          sections.push(`\n[[${sectionName}]]`);
          sections.push(objectToToml(item as Record<string, unknown>, sectionName).replace(/^\n+/, ''));
        }
      } else {
        // Inline array
        const items = value.map(v => {
          if (typeof v === 'string') return `"${v}"`;
          return String(v);
        });
        lines.push(`${key} = [${items.join(', ')}]`);
      }
    } else if (typeof value === 'object') {
      const sectionName = prefix ? `${prefix}.${key}` : key;
      sections.push(`\n[${sectionName}]`);
      sections.push(objectToToml(value as Record<string, unknown>, sectionName).replace(/^\n+/, ''));
    }
  }

  return lines.join('\n') + (sections.length > 0 ? '\n' + sections.join('\n') : '');
}

export default function TomlYaml() {
  const { dict } = useLang();
  const t = dict.tools['toml-yaml'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'toml2yaml' | 'yaml2toml'>('toml2yaml');

  const convert = () => {
    setError('');
    try {
      if (mode === 'toml2yaml') {
        const parsed = parseToml(input);
        const yaml = objectToYaml(parsed);
        setOutput(yaml);
      } else {
        const parsed = parseYaml(input);
        const toml = objectToToml(parsed);
        setOutput(toml.trim());
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => m === 'toml2yaml' ? 'yaml2toml' : 'toml2yaml');
    setInput(output);
    setOutput('');
    setError('');
  };

  const loadSample = () => {
    if (mode === 'toml2yaml') {
      setInput(`# Project configuration
title = "My Project"
version = "1.0.0"
debug = false

[server]
host = "localhost"
port = 8080
workers = 4

[database]
url = "postgres://localhost/mydb"
max_connections = 100
enabled = true

[logging]
level = "info"
outputs = ["stdout", "file"]

[[dependencies]]
name = "express"
version = "4.18.0"

[[dependencies]]
name = "lodash"
version = "4.17.21"`);
    } else {
      setInput(`# Project configuration
title: My Project
version: 1.0.0
debug: false

server:
  host: localhost
  port: 8080
  workers: 4

database:
  url: postgres://localhost/mydb
  max_connections: 100
  enabled: true

logging:
  level: info
  outputs:
  - stdout
  - file

dependencies:
- name: express
  version: 4.18.0
- name: lodash
  version: 4.17.21`);
    }
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'TOML / YAML Converter'}
      description={(t.pageDescription as string) || 'Convert between TOML and YAML formats'}
      toolId="toml-yaml"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)} style={{ padding: '8px 12px', fontSize: 13 }}>
          <option value="toml2yaml">TOML &rarr; YAML</option>
          <option value="yaml2toml">YAML &rarr; TOML</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={swap} className="btn btn-secondary">{common.swap || 'Swap'}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'toml2yaml' ? 'TOML' : 'YAML'} {common.input}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'toml2yaml' ? 'title = "My Project"\n[server]\nport = 8080' : 'title: My Project\nserver:\n  port: 8080'}
            style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'toml2yaml' ? 'YAML' : 'TOML'}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
