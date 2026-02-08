'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

async function hmac(message: string, secret: string, algo: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: algo }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HmacGenerator() {
  const { dict } = useLang();
  const t = dict.tools['hmac-generator'];
  const [message, setMessage] = useState('');
  const [secret, setSecret] = useState('');
  const [result, setResult] = useState<{ sha256: string; sha1: string } | null>(null);

  const generate = async () => {
    if (!message || !secret) return;
    const sha256 = await hmac(message, secret, 'SHA-256');
    const sha1 = await hmac(message, secret, 'SHA-1');
    setResult({ sha256, sha1 });
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="hmac-generator">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message to sign" style={{ minHeight: 80, width: '100%', marginBottom: 12 }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Secret Key</label>
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Your secret key" style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={generate} className="btn btn-primary">{dict.common.generate}</button>
        <button onClick={() => { setMessage(''); setSecret(''); setResult(null); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>HMAC-SHA256</span>
              <CopyButton text={result.sha256} />
            </div>
            <code style={{ fontSize: 12, wordBreak: 'break-all' }}>{result.sha256}</code>
          </div>
          <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-purple)' }}>HMAC-SHA1</span>
              <CopyButton text={result.sha1} />
            </div>
            <code style={{ fontSize: 12, wordBreak: 'break-all' }}>{result.sha1}</code>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
