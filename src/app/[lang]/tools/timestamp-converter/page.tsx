'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function TimestampConverter() {
  const { dict } = useLang();
  const t = dict.tools['timestamp-converter'];

  const [timestamp, setTimestamp] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [result, setResult] = useState('');
  const [resultTs, setResultTs] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const tsToDate = () => {
    const ts = parseInt(timestamp);
    if (isNaN(ts)) { setResult(t.invalidTimestamp); return; }
    // Auto-detect seconds vs milliseconds
    const d = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
    setResult([
      `${t.utc}:   ${d.toUTCString()}`,
      `${t.local}: ${d.toLocaleString()}`,
      `${t.iso}:   ${d.toISOString()}`,
      `${t.relative}: ${getRelative(d)}`,
    ].join('\n'));
  };

  const dateToTs = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) { setResultTs(t.invalidDate); return; }
    setResultTs([
      `${t.seconds}:      ${Math.floor(d.getTime() / 1000)}`,
      `${t.milliseconds}: ${d.getTime()}`,
    ].join('\n'));
  };

  const useNow = () => {
    setTimestamp(String(now));
  };

  const getRelative = (d: Date) => {
    const diff = Date.now() - d.getTime();
    const abs = Math.abs(diff);
    if (abs < 60000) return `${Math.round(abs / 1000)} seconds ${diff > 0 ? t.ago : t.fromNow}`;
    if (abs < 3600000) return `${Math.round(abs / 60000)} minutes ${diff > 0 ? t.ago : t.fromNow}`;
    if (abs < 86400000) return `${Math.round(abs / 3600000)} hours ${diff > 0 ? t.ago : t.fromNow}`;
    return `${Math.round(abs / 86400000)} days ${diff > 0 ? t.ago : t.fromNow}`;
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="timestamp-converter"
    >
      {/* Current time */}
      <div style={{
        background: 'var(--bg-input)',
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.currentTimestamp}</div>
          <code style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-blue)' }}>{now}</code>
        </div>
        <CopyButton text={String(now)} label={dict.common.copy} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Timestamp to Date */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.timestampToDate}</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              value={timestamp}
              onChange={e => setTimestamp(e.target.value)}
              placeholder={t.timestampPlaceholder}
              style={{ flex: 1 }}
            />
            <button onClick={useNow} className="btn btn-secondary" style={{ fontSize: 12 }}>{t.now}</button>
          </div>
          <button onClick={tsToDate} className="btn btn-primary" style={{ marginBottom: 12, width: '100%' }}>{dict.common.convert} →</button>
          {result && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '12px 16px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <CopyButton text={result} />
              </div>
              <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{result}</pre>
            </div>
          )}
        </div>

        {/* Date to Timestamp */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.dateToTimestamp}</h3>
          <input
            type="text"
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            placeholder={t.datePlaceholder}
            style={{ marginBottom: 12 }}
          />
          <button onClick={dateToTs} className="btn btn-primary" style={{ marginBottom: 12, width: '100%' }}>{dict.common.convert} →</button>
          {resultTs && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '12px 16px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
                <CopyButton text={resultTs} />
              </div>
              <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: 0 }}>{resultTs}</pre>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
