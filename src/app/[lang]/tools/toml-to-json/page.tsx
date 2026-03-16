'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentSection = result;
  const lines = toml.split('\n');

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    // Section header [section] or [section.subsection]
    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const keys = sectionMatch[1].split('.');
      let obj = result;
      for (const key of keys) {
        const k = key.trim().replace(/^["']|["']$/g, '');
        if (!(k in obj) || typeof obj[k] !== 'object' || obj[k] === null) {
          obj[k] = {};
        }
        obj = obj[k] as Record<string, unknown>;
      }
      currentSection = obj;
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^([^\s=]+)\s*=\s*(.*)/);
    if (kvMatch) {
      const key = kvMatch[1].trim().replace(/^["']|["']$/g, '');
      const val = kvMatch[2].trim();
      currentSection[key] = parseTomlValue(val);
    }
  }
  return result;
}

function parseTomlValue(val: string): unknown {
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (/^-?\d+$/.test(val)) return parseInt(val, 10);
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\').replace(/\\"/g, '"');
  }
  if (val.startsWith('[') && val.endsWith(']')) {
    const inner = val.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map(v => parseTomlValue(v.trim()));
  }
  // Bare string or date
  return val;
}

function jsonToToml(obj: unknown, prefix = ''): string {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return '';
  const lines: string[] = [];
  const sections: string[] = [];

  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      const sectionKey = prefix ? `${prefix}.${key}` : key;
      sections.push(`[${sectionKey}]`);
      sections.push(jsonToToml(val, sectionKey));
    } else {
      lines.push(`${key} = ${tomlStringify(val)}`);
    }
  }
  return [...lines, ...sections].join('\n');
}

function tomlStringify(val: unknown): string {
  if (val === null || val === undefined) return '""';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return `"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  if (Array.isArray(val)) return `[${val.map(v => tomlStringify(v)).join(', ')}]`;
  return '""';
}

export default function TomlToJsonConverter() {
  const { dict } = useLang();
  const t = dict.tools['toml-to-json'] as Record<string, string>;

  const [tomlInput, setTomlInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const convertToJson = () => {
    try {
      const parsed = parseToml(tomlInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid TOML');
    }
  };

  const convertToToml = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setTomlInput(jsonToToml(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const loadSample = () => {
    setTomlInput(`# Server configuration
title = "My App Config"

[server]
host = "localhost"
port = 8080
ssl = true

[database]
driver = "postgresql"
host = "db.example.com"
name = "myapp"
pool_size = 10
tags = ["production", "primary"]

[logging]
level = "info"
format = "json"`);
    setJsonInput('');
    setError('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="toml-to-json">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToJson} className="btn btn-primary">{t.tomlToJson || 'TOML → JSON'}</button>
        <button onClick={convertToToml} className="btn btn-secondary">{t.jsonToToml || 'JSON → TOML'}</button>
        <button onClick={loadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
        <button onClick={() => { setTomlInput(''); setJsonInput(''); setError(''); }} className="btn btn-ghost">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>TOML</label>
            <CopyButton text={tomlInput} />
          </div>
          <textarea
            value={tomlInput}
            onChange={e => setTomlInput(e.target.value)}
            placeholder={t.tomlPlaceholder || 'Paste your TOML here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON</label>
            <CopyButton text={jsonInput} />
          </div>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={t.jsonPlaceholder || 'Paste your JSON here...'}
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
