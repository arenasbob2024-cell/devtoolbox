'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

function parsePem(input: string): { type: string; base64: string; valid: boolean } | null {
  const match = input.match(/-----BEGIN ([^-]+)-----([\s\S]*?)-----END \1-----/);
  if (!match) return null;
  const type = match[1].trim();
  const base64 = match[2].replace(/\s/g, '');
  const valid = /^[A-Za-z0-9+/=]+$/.test(base64);
  return { type, base64, valid };
}

export default function PemDecoder() {
  const { dict } = useLang();
  const t = dict.tools['pem-decoder'];
  const [input, setInput] = useState('');

  const parsed = input.trim() ? parsePem(input) : null;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="pem-decoder">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>PEM Certificate</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----"
          style={{ minHeight: 150, width: '100%' }}
        />
      </div>
      {parsed && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Type</div>
            <code style={{ fontSize: 14 }}>{parsed.type}</code>
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Base64 valid</div>
            <span style={{ color: parsed.valid ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{parsed.valid ? 'Yes' : 'No'}</span>
          </div>
          <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Base64 length</div>
            <code>{parsed.base64.length} chars</code>
          </div>
        </div>
      )}
      {input.trim() && !parsed && (
        <div style={{ color: 'var(--accent-rose)', fontSize: 14 }}>Could not parse PEM. Expected -----BEGIN ... ----- block.</div>
      )}
    </ToolLayout>
  );
}
