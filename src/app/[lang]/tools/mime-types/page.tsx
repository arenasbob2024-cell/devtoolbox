'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const MIME_MAP: Record<string, string> = {
  html: 'text/html', htm: 'text/html', css: 'text/css', js: 'application/javascript', json: 'application/json', xml: 'application/xml',
  pdf: 'application/pdf', zip: 'application/zip', txt: 'text/plain', md: 'text/markdown', svg: 'image/svg+xml',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', ico: 'image/x-icon',
  woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', mp3: 'audio/mpeg', mp4: 'video/mp4', webm: 'video/webm',
};

export default function MimeTypes() {
  const { dict } = useLang();
  const t = dict.tools['mime-types'];
  const [ext, setExt] = useState('');
  const result = ext ? MIME_MAP[ext.toLowerCase().replace(/^\./, '')] : null;

  const entries = Object.entries(MIME_MAP).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="mime-types">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Extension (e.g. .json, pdf)</label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="text"
            value={ext}
            onChange={e => setExt(e.target.value)}
            placeholder=".json"
            style={{ flex: 1, padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
          />
          {result && <CopyButton text={result} />}
        </div>
        {ext && (
          <div style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
            {result ? <code style={{ color: 'var(--accent-emerald)' }}>{result}</code> : 'Not found'}
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Common MIME types</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
        {entries.map(([e, m]) => (
          <div key={e} style={{ background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600 }}>.{e}</span>
            <code style={{ fontSize: 11, color: 'var(--text-secondary)', wordBreak: 'break-all' }}>{m}</code>
            <CopyButton text={m} />
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
