'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const { dict } = useLang();
  const t = dict.tools['hash-generator'];
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [uppercase, setUppercase] = useState(false);

  const generate = async () => {
    if (!input) return;
    const algorithms: Record<string, string> = {
      'SHA-1': 'SHA-1',
      'SHA-256': 'SHA-256',
      'SHA-384': 'SHA-384',
      'SHA-512': 'SHA-512',
    };
    const results: Record<string, string> = {};
    for (const [name, algo] of Object.entries(algorithms)) {
      results[name] = await hashText(input, algo);
    }
    setHashes(results);
  };

  const formatHash = (hash: string) => uppercase ? hash.toUpperCase() : hash;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="hash-generator"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputText}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 120 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateHashes}</button>
        <button onClick={() => { setInput(''); setHashes({}); }} className="btn btn-secondary">{dict.common.clear}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'auto', cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          {t.uppercase}
        </label>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(hashes).map(([name, hash]) => (
            <div key={name} style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '12px 16px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{name}</span>
                <CopyButton text={formatHash(hash)} label={dict.common.copy} />
              </div>
              <code style={{
                fontSize: 12,
                wordBreak: 'break-all',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}>
                {formatHash(hash)}
              </code>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
