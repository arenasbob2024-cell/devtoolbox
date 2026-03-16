'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function parseIni(ini: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  let currentSection: Record<string, unknown> = result;

  for (const raw of ini.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;

    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();
      result[sectionName] = {};
      currentSection = result[sectionName] as Record<string, unknown>;
      continue;
    }

    const kvMatch = line.match(/^([^=]+?)=(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      let val: string | number | boolean = kvMatch[2].trim();
      // Remove inline comments
      const commentIdx = val.indexOf(' ;');
      if (commentIdx > -1) val = val.substring(0, commentIdx).trim();
      // Remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // Type coercion
      if (val === 'true') { currentSection[key] = true; continue; }
      if (val === 'false') { currentSection[key] = false; continue; }
      if (/^-?\d+$/.test(String(val))) { currentSection[key] = parseInt(String(val), 10); continue; }
      if (/^-?\d+\.\d+$/.test(String(val))) { currentSection[key] = parseFloat(String(val)); continue; }
      currentSection[key] = val;
    }
  }
  return result;
}

function jsonToIni(obj: unknown): string {
  if (typeof obj !== 'object' || obj === null) return '';
  const lines: string[] = [];
  const entries = Object.entries(obj as Record<string, unknown>);

  // First pass: top-level key-value pairs
  for (const [key, val] of entries) {
    if (typeof val !== 'object' || val === null || Array.isArray(val)) {
      lines.push(`${key}=${iniStringify(val)}`);
    }
  }

  // Second pass: sections
  for (const [key, val] of entries) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      if (lines.length > 0) lines.push('');
      lines.push(`[${key}]`);
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        lines.push(`${k}=${iniStringify(v)}`);
      }
    }
  }
  return lines.join('\n');
}

function iniStringify(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') return val.includes(' ') || val.includes('=') ? `"${val}"` : val;
  return String(val);
}

export default function IniToJsonConverter() {
  const { dict } = useLang();
  const t = dict.tools['ini-to-json'] as Record<string, string>;

  const [iniInput, setIniInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const convertToJson = () => {
    try {
      const parsed = parseIni(iniInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid INI');
    }
  };

  const convertToIni = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setIniInput(jsonToIni(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const loadSample = () => {
    setIniInput(`; Application configuration
app_name=My Application
version=2.1.0
debug=false

[server]
host=localhost
port=8080
max_connections=100

[database]
driver=mysql
host=db.example.com
port=3306
name=myapp
username=admin

[logging]
level=info
file=/var/log/app.log
max_size=10485760`);
    setJsonInput('');
    setError('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ini-to-json">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToJson} className="btn btn-primary">{t.iniToJson || 'INI → JSON'}</button>
        <button onClick={convertToIni} className="btn btn-secondary">{t.jsonToIni || 'JSON → INI'}</button>
        <button onClick={loadSample} className="btn btn-ghost">{dict.common.loadSample}</button>
        <button onClick={() => { setIniInput(''); setJsonInput(''); setError(''); }} className="btn btn-ghost">{dict.common.clear}</button>
      </div>

      {error && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(244,63,94,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>INI</label>
            <CopyButton text={iniInput} />
          </div>
          <textarea
            value={iniInput}
            onChange={e => setIniInput(e.target.value)}
            placeholder={t.iniPlaceholder || 'Paste your INI config here...'}
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
