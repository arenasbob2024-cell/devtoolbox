'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

export default function TimestampConverter() {
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
    if (isNaN(ts)) { setResult('Invalid timestamp'); return; }
    // Auto-detect seconds vs milliseconds
    const d = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
    setResult([
      `UTC:   ${d.toUTCString()}`,
      `Local: ${d.toLocaleString()}`,
      `ISO:   ${d.toISOString()}`,
      `Relative: ${getRelative(d)}`,
    ].join('\n'));
  };

  const dateToTs = () => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) { setResultTs('Invalid date'); return; }
    setResultTs([
      `Seconds:      ${Math.floor(d.getTime() / 1000)}`,
      `Milliseconds: ${d.getTime()}`,
    ].join('\n'));
  };

  const useNow = () => {
    setTimestamp(String(now));
  };

  const getRelative = (d: Date) => {
    const diff = Date.now() - d.getTime();
    const abs = Math.abs(diff);
    if (abs < 60000) return `${Math.round(abs / 1000)} seconds ${diff > 0 ? 'ago' : 'from now'}`;
    if (abs < 3600000) return `${Math.round(abs / 60000)} minutes ${diff > 0 ? 'ago' : 'from now'}`;
    if (abs < 86400000) return `${Math.round(abs / 3600000)} hours ${diff > 0 ? 'ago' : 'from now'}`;
    return `${Math.round(abs / 86400000)} days ${diff > 0 ? 'ago' : 'from now'}`;
  };

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to readable dates and vice versa. Auto-detects seconds and milliseconds."
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
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>Current Unix Timestamp</div>
          <code style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-blue)' }}>{now}</code>
        </div>
        <CopyButton text={String(now)} label="Copy" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Timestamp to Date */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Timestamp → Date</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              value={timestamp}
              onChange={e => setTimestamp(e.target.value)}
              placeholder="e.g. 1700000000"
              style={{ flex: 1 }}
            />
            <button onClick={useNow} className="btn btn-secondary" style={{ fontSize: 12 }}>Now</button>
          </div>
          <button onClick={tsToDate} className="btn btn-primary" style={{ marginBottom: 12, width: '100%' }}>Convert →</button>
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
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Date → Timestamp</h3>
          <input
            type="text"
            value={dateStr}
            onChange={e => setDateStr(e.target.value)}
            placeholder="e.g. 2025-01-01 or Jan 1, 2025 12:00"
            style={{ marginBottom: 12 }}
          />
          <button onClick={dateToTs} className="btn btn-primary" style={{ marginBottom: 12, width: '100%' }}>Convert →</button>
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
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Unix Timestamps</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          A Unix timestamp represents the number of seconds since January 1, 1970 (UTC). It&apos;s widely used in programming, databases, and APIs. This tool auto-detects whether the input is in seconds or milliseconds.
        </p>
      </div>
    </ToolLayout>
  );
}
