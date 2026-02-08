'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => {
      let uuid = generateUUID();
      if (noDashes) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(newUuids);
  };

  const allText = uuids.join('\n');

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUIDs (v4) in bulk. Supports uppercase, no-dash formats."
      toolId="uuid-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">Generate UUIDs</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Count:</label>
          <input
            type="number"
            value={count}
            onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 60, padding: '6px 10px', fontSize: 13 }}
            min={1}
            max={100}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          Uppercase
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} />
          No dashes
        </label>
        {uuids.length > 0 && <CopyButton text={allText} label="Copy All" />}
      </div>

      {uuids.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {uuids.map((uuid, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-input)',
              borderRadius: 6,
              padding: '8px 14px',
              border: '1px solid var(--border-color)',
            }}>
              <code style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text-primary)' }}>{uuid}</code>
              <CopyButton text={uuid} label="Copy" />
            </div>
          ))}
        </div>
      )}

      {uuids.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
          <p>Click &quot;Generate UUIDs&quot; to create random UUIDs</p>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About UUID v4</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          UUID (Universally Unique Identifier) v4 generates random 128-bit identifiers. With 122 random bits, the probability of a collision is astronomically low. UUIDs are commonly used as database primary keys, session tokens, and distributed system identifiers.
        </p>
      </div>
    </ToolLayout>
  );
}
