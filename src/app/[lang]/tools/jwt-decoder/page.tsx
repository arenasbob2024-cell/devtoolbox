'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function decodeJwt(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('invalidFormat');

  const decodeBase64Url = (str: string) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return JSON.parse(atob(base64));
  };

  const header = decodeBase64Url(parts[0]);
  const payload = decodeBase64Url(parts[1]);

  return { header, payload, signature: parts[2] };
}

export default function JwtDecoder() {
  const { dict } = useLang();
  const t = dict.tools['jwt-decoder'];

  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const decode = () => {
    try {
      setError('');
      const result = decodeJwt(input.trim());
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
    } catch (e: unknown) {
      const msg = e instanceof Error && e.message === 'invalidFormat' ? t.invalidFormat : t.invalidJwt;
      setError(msg);
      setHeader(''); setPayload(''); setSignature('');
    }
  };

  const loadSample = () => {
    setInput('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="jwt-decoder"
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jwtToken}</label>
          <button onClick={loadSample} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.loadSample}</button>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 100 }} />
      </div>

      <button onClick={decode} className="btn btn-primary" style={{ marginBottom: 16 }}>{t.decodeJwt}</button>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>✕ {error}</div>
      )}

      {header && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: t.header, value: header, color: '#f43f5e' },
            { label: t.payload, value: payload, color: '#8b5cf6' },
            { label: t.signature, value: signature, color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
              border: '1px solid var(--border-color)', borderLeft: `3px solid ${color}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color }}>{label}</span>
                <CopyButton text={value} />
              </div>
              <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-all' }}>
                {value}
              </pre>
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
