'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// Minimal TOML parser for common cases
function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentSection = result;
  const lines = toml.split('\n');

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;

    // Section header [section] or [section.subsection]
    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const keys = sectionMatch[1].split('.');
      let obj = result;
      for (const key of keys) {
        if (!obj[key] || typeof obj[key] !== 'object') obj[key] = {};
        obj = obj[key] as Record<string, unknown>;
      }
      currentSection = obj;
      continue;
    }

    // Array of tables [[section]]
    const arrayMatch = line.match(/^\[\[([^\]]+)\]\]$/);
    if (arrayMatch) {
      const keys = arrayMatch[1].split('.');
      let obj = result;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]] || typeof obj[keys[i]] !== 'object') obj[keys[i]] = {};
        obj = obj[keys[i]] as Record<string, unknown>;
      }
      const lastKey = keys[keys.length - 1];
      if (!Array.isArray(obj[lastKey])) obj[lastKey] = [];
      const newItem: Record<string, unknown> = {};
      (obj[lastKey] as unknown[]).push(newItem);
      currentSection = newItem;
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^([^=]+?)\s*=\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim().replace(/^"|"$/g, '');
      let value: unknown = kvMatch[2].trim();

      // Parse value
      const v = value as string;
      if (v === 'true') value = true;
      else if (v === 'false') value = false;
      else if (/^-?\d+$/.test(v)) value = parseInt(v, 10);
      else if (/^-?\d+\.\d+$/.test(v)) value = parseFloat(v);
      else if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
        value = v.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\');
      else if (v.startsWith('[') && v.endsWith(']')) {
        try { value = JSON.parse(v.replace(/'/g, '"')); } catch { value = v; }
      }

      currentSection[key] = value;
    }
  }
  return result;
}

function jsonToToml(obj: unknown, prefix = ''): string {
  if (typeof obj !== 'object' || obj === null) return '';
  let sections = '';
  let kvPairs = '';

  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object') {
        for (const item of value) {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          sections += `\n[[${fullKey}]]\n`;
          sections += jsonToToml(item, '');
        }
      } else {
        const formatted = JSON.stringify(value);
        kvPairs += `${key} = ${formatted}\n`;
      }
    } else if (typeof value === 'object') {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      sections += `\n[${fullKey}]\n`;
      sections += jsonToToml(value, fullKey);
    } else if (typeof value === 'string') {
      kvPairs += `${key} = "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      kvPairs += `${key} = ${value}\n`;
    }
  }
  return kvPairs + sections;
}

const SAMPLE_TOML = `# Config file example
title = "My App"
version = "1.0.0"

[database]
server = "192.168.1.1"
ports = [8001, 8001, 8002]
enabled = true
max_connections = 5000

[server]
host = "localhost"
port = 3000

[[products]]
name = "Widget"
price = 9.99

[[products]]
name = "Gadget"
price = 19.99`;

export default function TomlJsonTool() {
  const { dict } = useLang();
  const t = dict.tools['toml-json'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'toml2json' | 'json2toml'>('toml2json');
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setOutput('');
    try {
      if (mode === 'toml2json') {
        const parsed = parseToml(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(input);
        setOutput(jsonToToml(parsed).trim());
      }
    } catch (e: unknown) {
      setError(t.conversionError || `Conversion error: ${e instanceof Error ? e.message : 'Invalid input'}`);
    }
  };

  const loadSample = () => {
    if (mode === 'toml2json') {
      setInput(SAMPLE_TOML);
    } else {
      setInput(JSON.stringify({ title: "My App", version: "1.0.0", database: { server: "192.168.1.1", ports: [8001, 8002], enabled: true } }, null, 2));
    }
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'toml2json' ? 'json2toml' : 'toml2json');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="toml-json">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', background: 'var(--bg-input)', borderRadius: 8,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <button
            onClick={() => setMode('toml2json')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'toml2json' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'toml2json' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
            }}
          >
            TOML → JSON
          </button>
          <button
            onClick={() => setMode('json2toml')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'json2toml' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'json2toml' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
            }}
          >
            JSON → TOML
          </button>
        </div>
        <button onClick={convert} className="btn btn-primary">{t.convert || 'Convert'} →</button>
        <button onClick={swap} className="btn btn-secondary">⇅ {dict.common.swap}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample || 'Sample'}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'toml2json' ? 'TOML' : 'JSON'}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'toml2json' ? (t.tomlPlaceholder || 'Paste TOML here...') : (t.jsonPlaceholder || 'Paste JSON here...')}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'toml2json' ? 'JSON' : 'TOML'}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About TOML to JSON Converter'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'TOML (Tom\'s Obvious Minimal Language) is a popular configuration file format used in Rust (Cargo.toml), Python (pyproject.toml), and many other tools. This converter transforms TOML to JSON and vice versa, making it easy to work with configuration data across different formats. Supports tables, arrays of tables, inline tables, and all TOML data types.'}
        </p>
      </div>
    </ToolLayout>
  );
}
