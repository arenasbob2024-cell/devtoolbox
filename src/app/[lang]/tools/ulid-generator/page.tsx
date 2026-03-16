'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const CROCKFORD_BASE32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function encodeTime(now: number, len: number): string {
  let str = '';
  let t = now;
  for (let i = len; i > 0; i--) {
    str = CROCKFORD_BASE32[t & 31] + str;
    t = Math.floor(t / 32);
  }
  return str;
}

function encodeRandom(len: number): string {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  let str = '';
  for (let i = 0; i < len; i++) {
    str += CROCKFORD_BASE32[arr[i] & 31];
  }
  return str;
}

function generateULID(): string {
  const now = Date.now();
  const timeStr = encodeTime(now, 10);
  const randomStr = encodeRandom(16);
  return timeStr + randomStr;
}

function decodeULIDTimestamp(ulid: string): Date | null {
  if (ulid.length !== 26) return null;
  const timeChars = ulid.substring(0, 10).toUpperCase();
  let time = 0;
  for (const ch of timeChars) {
    const idx = CROCKFORD_BASE32.indexOf(ch);
    if (idx === -1) return null;
    time = time * 32 + idx;
  }
  return new Date(time);
}

export default function UlidGenerator() {
  const { dict } = useLang();
  const t = dict.tools['ulid-generator'] as Record<string, string>;

  const [ulids, setUlids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [lowercase, setLowercase] = useState(false);
  const [decodeInput, setDecodeInput] = useState('');
  const [decodeResult, setDecodeResult] = useState('');

  const generate = () => {
    const newUlids = Array.from({ length: count }, () => {
      const ulid = generateULID();
      return lowercase ? ulid.toLowerCase() : ulid;
    });
    setUlids(newUlids);
  };

  const decode = () => {
    const cleaned = decodeInput.trim().toUpperCase();
    const date = decodeULIDTimestamp(cleaned);
    if (date && !isNaN(date.getTime())) {
      setDecodeResult(`Timestamp: ${date.toISOString()}\nUnix ms: ${date.getTime()}`);
    } else {
      setDecodeResult('Invalid ULID format (must be 26 characters, Crockford Base32)');
    }
  };

  const allText = ulids.join('\n');

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ulid-generator">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateBtn || 'Generate ULIDs'}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.countLabel || 'Count'}:</label>
          <input
            type="number"
            value={count}
            onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 60, padding: '6px 10px', fontSize: 13 }}
          />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, cursor: 'pointer' }}>
          <input type="checkbox" checked={lowercase} onChange={e => setLowercase(e.target.checked)} />
          {t.lowercaseLabel || 'Lowercase'}
        </label>
        {ulids.length > 0 && <CopyButton text={allText} />}
      </div>

      {ulids.length > 0 && (
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
          {ulids.map((ulid, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontFamily: 'monospace', fontSize: 14 }}>
              <span>{ulid}</span>
              <CopyButton text={ulid} />
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 8 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.decodeTitle || 'Decode ULID Timestamp'}</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            value={decodeInput}
            onChange={e => setDecodeInput(e.target.value)}
            placeholder={t.decodePlaceholder || 'Paste a ULID to decode...'}
            style={{ flex: 1, padding: '8px 12px', fontFamily: 'monospace', fontSize: 13 }}
          />
          <button onClick={decode} className="btn btn-secondary">{t.decodeBtn || 'Decode'}</button>
        </div>
        {decodeResult && (
          <pre style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text-secondary)', margin: 0, whiteSpace: 'pre-wrap' }}>
            {decodeResult}
          </pre>
        )}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
