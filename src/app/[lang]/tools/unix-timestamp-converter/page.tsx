'use client';

import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const NOTABLE_TIMESTAMPS = [
  { name: 'Unix Epoch', timestamp: 0, date: '1970-01-01 00:00:00 UTC' },
  { name: 'Year 2000 (Y2K)', timestamp: 946684800, date: '2000-01-01 00:00:00 UTC' },
  { name: 'Unix 1 Billion', timestamp: 1000000000, date: '2001-09-09 01:46:40 UTC' },
  { name: 'iPhone Launch', timestamp: 1183248000, date: '2007-07-01 00:00:00 UTC' },
  { name: 'Year 2020', timestamp: 1577836800, date: '2020-01-01 00:00:00 UTC' },
  { name: 'Year 2025', timestamp: 1735689600, date: '2025-01-01 00:00:00 UTC' },
  { name: 'Unix 2 Billion', timestamp: 2000000000, date: '2033-05-18 03:33:20 UTC' },
  { name: 'Y2K38 Problem', timestamp: 2147483647, date: '2038-01-19 03:14:07 UTC' },
  { name: 'Year 2050', timestamp: 2524608000, date: '2050-01-01 00:00:00 UTC' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRelativeTime(d: Date, t: Record<string, any>): string {
  const diff = Date.now() - d.getTime();
  const abs = Math.abs(diff);
  const suffix = diff > 0 ? t.ago : t.fromNow;

  if (abs < 1000) return `just now`;
  if (abs < 60000) return `${Math.floor(abs / 1000)} seconds ${suffix}`;
  if (abs < 3600000) return `${Math.floor(abs / 60000)} minutes ${suffix}`;
  if (abs < 86400000) return `${Math.floor(abs / 3600000)} hours ${suffix}`;
  if (abs < 2592000000) return `${Math.floor(abs / 86400000)} days ${suffix}`;
  if (abs < 31536000000) return `${Math.floor(abs / 2592000000)} months ${suffix}`;
  return `${Math.floor(abs / 31536000000)} years ${suffix}`;
}

export default function UnixTimestampConverter() {
  const { dict } = useLang();
  const t = dict.tools['unix-timestamp-converter'];

  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  // Timestamp -> Date
  const [tsInput, setTsInput] = useState('');
  const [tsUnit, setTsUnit] = useState<'seconds' | 'milliseconds'>('seconds');
  const [tsResult, setTsResult] = useState<{
    local: string;
    utc: string;
    iso: string;
    relative: string;
  } | null>(null);
  const [tsError, setTsError] = useState('');

  // Date -> Timestamp
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [dtResult, setDtResult] = useState<{ seconds: number; milliseconds: number } | null>(null);
  const [dtError, setDtError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const convertTimestamp = useCallback(() => {
    setTsError('');
    setTsResult(null);
    const num = parseInt(tsInput);
    if (isNaN(num)) {
      setTsError(t.invalidTimestamp);
      return;
    }
    const ms = tsUnit === 'seconds' ? num * 1000 : num;
    const d = new Date(ms);
    if (isNaN(d.getTime())) {
      setTsError(t.invalidTimestamp);
      return;
    }
    setTsResult({
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      iso: d.toISOString(),
      relative: getRelativeTime(d, t),
    });
  }, [tsInput, tsUnit, t]);

  const convertDate = useCallback(() => {
    setDtError('');
    setDtResult(null);
    const d = new Date(year, month - 1, day, hour, minute, second);
    if (isNaN(d.getTime())) {
      setDtError(t.invalidDate);
      return;
    }
    setDtResult({
      seconds: Math.floor(d.getTime() / 1000),
      milliseconds: d.getTime(),
    });
  }, [year, month, day, hour, minute, second, t]);

  const useCurrentTimestamp = () => {
    setTsInput(String(now));
    setTsUnit('seconds');
  };

  const handleNotableClick = (ts: number) => {
    setTsInput(String(ts));
    setTsUnit('seconds');
    const d = new Date(ts * 1000);
    setTsResult({
      local: d.toLocaleString(),
      utc: d.toUTCString(),
      iso: d.toISOString(),
      relative: getRelativeTime(d, t),
    });
    setTsError('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6,
    color: 'var(--text-secondary)',
  };

  const resultRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--bg-input)',
    borderRadius: 6,
    padding: '8px 12px',
    border: '1px solid var(--border-color)',
    marginBottom: 6,
  };

  const cellStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--border-color)',
    fontSize: 13,
    color: 'var(--text-primary)',
  };

  const smallInputStyle: React.CSSProperties = {
    ...inputStyle,
    padding: '8px 10px',
    fontSize: 13,
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="unix-timestamp-converter">
      {/* Current Timestamp */}
      <div style={{
        background: 'var(--bg-input)',
        borderRadius: 8,
        padding: '14px 18px',
        marginBottom: 24,
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{t.currentTimestamp}</div>
          <code style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>{now}</code>
        </div>
        <CopyButton text={String(now)} label={dict.common.copy} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Timestamp -> Date */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.timestampToDate}</h3>

          <label style={labelStyle}>{t.timestampInput}</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              value={tsInput}
              onChange={e => setTsInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && convertTimestamp()}
              placeholder={t.timestampPlaceholder}
              style={{ ...inputStyle, flex: 1, fontFamily: 'monospace' }}
            />
            <button onClick={useCurrentTimestamp} className="btn btn-secondary" style={{ fontSize: 12, flexShrink: 0 }}>
              Now
            </button>
          </div>

          <label style={labelStyle}>{t.unit}</label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => setTsUnit('seconds')}
              className={tsUnit === 'seconds' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, flex: 1 }}
            >
              {t.seconds}
            </button>
            <button
              onClick={() => setTsUnit('milliseconds')}
              className={tsUnit === 'milliseconds' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, flex: 1 }}
            >
              {t.milliseconds}
            </button>
          </div>

          <button onClick={convertTimestamp} className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }}>
            {dict.common.convert}
          </button>

          {tsError && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>{tsError}</div>}

          {tsResult && (
            <div>
              {[
                { label: t.localTime, value: tsResult.local },
                { label: t.utcTime, value: tsResult.utc },
                { label: t.isoFormat, value: tsResult.iso },
                { label: t.relativeTime, value: tsResult.relative },
              ].map(({ label, value }) => (
                <div key={label} style={resultRowStyle}>
                  <div>
                    <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>{label}: </span>
                    <code style={{ fontSize: 12, fontFamily: 'monospace' }}>{value}</code>
                  </div>
                  <CopyButton text={value} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date -> Timestamp */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.dateToTimestamp}</h3>

          <label style={labelStyle}>{t.dateInput}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.year}</label>
              <input type="number" value={year} onChange={e => setYear(parseInt(e.target.value) || 2025)} style={smallInputStyle} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.month}</label>
              <input type="number" value={month} min={1} max={12} onChange={e => setMonth(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))} style={smallInputStyle} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.day}</label>
              <input type="number" value={day} min={1} max={31} onChange={e => setDay(Math.min(31, Math.max(1, parseInt(e.target.value) || 1)))} style={smallInputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.hour}</label>
              <input type="number" value={hour} min={0} max={23} onChange={e => setHour(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))} style={smallInputStyle} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.minute}</label>
              <input type="number" value={minute} min={0} max={59} onChange={e => setMinute(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))} style={smallInputStyle} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: 11 }}>{t.second}</label>
              <input type="number" value={second} min={0} max={59} onChange={e => setSecond(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))} style={smallInputStyle} />
            </div>
          </div>

          <button onClick={convertDate} className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }}>
            {dict.common.convert}
          </button>

          {dtError && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>{dtError}</div>}

          {dtResult && (
            <div>
              <div style={resultRowStyle}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>{t.seconds}: </span>
                  <code style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace' }}>{dtResult.seconds}</code>
                </div>
                <CopyButton text={String(dtResult.seconds)} />
              </div>
              <div style={resultRowStyle}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>{t.milliseconds}: </span>
                  <code style={{ fontSize: 14, fontWeight: 700, fontFamily: 'monospace' }}>{dtResult.milliseconds}</code>
                </div>
                <CopyButton text={String(dtResult.milliseconds)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notable Timestamps */}
      <div style={{ marginTop: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.notableDates}</h3>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Name</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Timestamp</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Date (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {NOTABLE_TIMESTAMPS.map(item => (
                <tr
                  key={item.name}
                  onClick={() => handleNotableClick(item.timestamp)}
                  style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-input)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{item.name}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace', color: 'var(--accent)' }}>{item.timestamp}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 12 }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
