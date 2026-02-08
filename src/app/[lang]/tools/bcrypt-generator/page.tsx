'use client';

import { useState } from 'react';
import bcrypt from 'bcryptjs';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function BcryptGenerator() {
  const { dict } = useLang();
  const t = dict.tools['bcrypt-generator'];
  const [password, setPassword] = useState('');
  const [cost, setCost] = useState(10);
  const [hash, setHash] = useState('');

  const generate = async () => {
    if (!password) return;
    const h = await bcrypt.hash(password, cost);
    setHash(h);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="bcrypt-generator">
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Cost (4-12)</label>
        <input
          type="number"
          value={cost}
          onChange={e => setCost(Math.min(12, Math.max(4, parseInt(e.target.value) || 10)))}
          min={4}
          max={12}
          style={{ width: 80, padding: '8px 12px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button onClick={generate} className="btn btn-primary">{dict.common.generate}</button>
        <button onClick={() => { setPassword(''); setHash(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>
      {hash && (
        <div style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>Bcrypt Hash</span>
            <CopyButton text={hash} />
          </div>
          <code style={{ fontSize: 12, wordBreak: 'break-all' }}>{hash}</code>
        </div>
      )}
    </ToolLayout>
  );
}
