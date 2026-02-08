'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function UrlParser() {
  const { dict } = useLang();
  const t = dict.tools['url-parser'];
  const [input, setInput] = useState('');

  let parsed: URL | null = null;
  try {
    if (input.trim()) parsed = new URL(input.trim());
  } catch {
    parsed = null;
  }

  const parts = parsed ? [
    { label: 'Protocol', value: parsed.protocol },
    { label: 'Hostname', value: parsed.hostname },
    { label: 'Port', value: parsed.port || '(default)' },
    { label: 'Pathname', value: parsed.pathname },
    { label: 'Search', value: parsed.search || '(none)' },
    { label: 'Hash', value: parsed.hash || '(none)' },
    { label: 'Origin', value: parsed.origin },
  ] : [];

  const params = parsed && parsed.search ? Array.from(new URLSearchParams(parsed.search)).map(([k, v]) => ({ key: k, value: v })) : [];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="url-parser">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>URL</label>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="https://example.com/path?key=value#hash"
          style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />
      </div>
      {parsed && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {parts.map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
                <code style={{ fontSize: 13, wordBreak: 'break-all' }}>{value}</code>
              </div>
            ))}
          </div>
          {params.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Query Parameters</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {params.map(({ key, value }) => (
                  <div key={key} style={{ display: 'flex', gap: 8, padding: '6px 12px', background: 'var(--bg-input)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
                    <code style={{ color: 'var(--accent-blue)' }}>{key}</code>
                    <span style={{ color: 'var(--text-secondary)' }}>=</span>
                    <code>{value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ToolLayout>
  );
}
