'use client';

import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ConvertedResult {
  unixSec: number;
  unixMs: number;
  iso: string;
  utc: string;
  local: string;
  relative: string;
  dayOfWeek: string;
  timezone: string;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getRelativeTime(date: Date, t: Record<string, string>): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  const suffix = diff > 0 ? t.ago : t.fromNow;
  if (absDiff < 60000) return `${Math.floor(absDiff / 1000)}s ${suffix}`;
  if (absDiff < 3600000) return `${Math.floor(absDiff / 60000)}m ${suffix}`;
  if (absDiff < 86400000) return `${Math.floor(absDiff / 3600000)}h ${suffix}`;
  if (absDiff < 2592000000) return `${Math.floor(absDiff / 86400000)}d ${suffix}`;
  if (absDiff < 31536000000) return `${Math.floor(absDiff / 2592000000)}mo ${suffix}`;
  return `${Math.floor(absDiff / 31536000000)}y ${suffix}`;
}

export default function EpochConverter() {
  const { dict } = useLang();
  const t = dict.tools['epoch-converter'];

  const [epochInput, setEpochInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [format, setFormat] = useState<'auto' | 'seconds' | 'milliseconds'>('auto');
  const [result, setResult] = useState<ConvertedResult | null>(null);
  const [error, setError] = useState('');
  const [currentTs, setCurrentTs] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const convertFromEpoch = useCallback((input: string) => {
    setError('');
    const trimmed = input.trim();
    if (!trimmed) {
      setError(t.invalidInput);
      setResult(null);
      return;
    }
    const num = Number(trimmed);
    if (isNaN(num)) {
      setError(t.invalidInput);
      setResult(null);
      return;
    }
    let ms: number;
    if (format === 'auto') {
      ms = trimmed.length >= 13 ? num : num * 1000;
    } else if (format === 'milliseconds') {
      ms = num;
    } else {
      ms = num * 1000;
    }
    const date = new Date(ms);
    if (isNaN(date.getTime())) {
      setError(t.invalidInput);
      setResult(null);
      return;
    }
    setResult({
      unixSec: Math.floor(ms / 1000),
      unixMs: ms,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, [format, t]);

  const convertFromDate = useCallback((input: string) => {
    setError('');
    const trimmed = input.trim();
    if (!trimmed) {
      setError(t.invalidInput);
      setResult(null);
      return;
    }
    const date = new Date(trimmed);
    if (isNaN(date.getTime())) {
      setError(t.invalidInput);
      setResult(null);
      return;
    }
    const ms = date.getTime();
    setResult({
      unixSec: Math.floor(ms / 1000),
      unixMs: ms,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }, [t]);

  const handleNow = () => {
    const now = Date.now();
    const date = new Date(now);
    setEpochInput(Math.floor(now / 1000).toString());
    setDateInput('');
    setError('');
    setResult({
      unixSec: Math.floor(now / 1000),
      unixMs: now,
      iso: date.toISOString(),
      utc: date.toUTCString(),
      local: date.toLocaleString(),
      relative: getRelativeTime(date, t),
      dayOfWeek: DAYS[date.getUTCDay()],
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  const handleClear = () => {
    setEpochInput('');
    setDateInput('');
    setResult(null);
    setError('');
  };

  const quickReferences = [
    { label: t.quickNow, value: Math.floor(Date.now() / 1000), ms: Date.now() },
    { label: t.quickToday, value: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000), ms: new Date().setHours(0, 0, 0, 0) },
    { label: t.quickY2K, value: 946684800, ms: 946684800000 },
    { label: t.quickEpoch, value: 0, ms: 0 },
  ];

  const rows = result
    ? [
        { label: t.unixSec, value: result.unixSec.toString() },
        { label: t.unixMs, value: result.unixMs.toString() },
        { label: t.iso8601, value: result.iso },
        { label: t.utcDate, value: result.utc },
        { label: t.localDate, value: result.local },
        { label: t.relative, value: result.relative },
        { label: t.dayOfWeek, value: result.dayOfWeek },
        { label: t.timezone, value: result.timezone },
      ]
    : [];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="epoch-converter">
      {/* Live timestamp */}
      <div
        style={{
          background: 'var(--bg-input)',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid var(--border-color)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{t.liveTs}:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent-blue)' }}>{currentTs}</code>
          <CopyButton text={currentTs.toString()} />
        </div>
      </div>

      {/* Format selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.format}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(['auto', 'seconds', 'milliseconds'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={format === f ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              {f === 'auto' ? t.auto : f === 'seconds' ? t.seconds : t.milliseconds}
            </button>
          ))}
        </div>
      </div>

      {/* Input panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.epochInput}</label>
          <input
            type="text"
            value={epochInput}
            onChange={(e) => setEpochInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && convertFromEpoch(epochInput)}
            placeholder={t.epochPlaceholder}
            style={{ width: '100%', marginBottom: 8 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => convertFromEpoch(epochInput)} className="btn btn-primary" style={{ flex: 1 }}>
              {t.convertBtn}
            </button>
            <button onClick={handleNow} className="btn btn-secondary">
              {t.nowBtn}
            </button>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.dateInput}</label>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && convertFromDate(dateInput)}
            placeholder={t.datePlaceholder}
            style={{ width: '100%', marginBottom: 8 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => convertFromDate(dateInput)} className="btn btn-primary" style={{ flex: 1 }}>
              {t.convertBtn}
            </button>
            <button onClick={handleClear} className="btn btn-secondary">
              {t.clearBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.quickRef}</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
          {quickReferences.map((ref) => (
            <button
              key={ref.label}
              onClick={() => convertFromEpoch(ref.value.toString())}
              style={{
                padding: '8px 12px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            >
              {ref.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: '10px 14px', borderRadius: 8, background: '#fee2e2', color: '#dc2626', fontSize: 13 }}>
          {error}
        </div>
      )}

      {/* Results */}
      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.results}</h2>
        {result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'var(--bg-input)',
                  borderRadius: 6,
                  padding: '10px 14px',
                  border: '1px solid var(--border-color)',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginRight: 8 }}>{label}:</span>
                  <code style={{ fontSize: 13, wordBreak: 'break-all' }}>{value}</code>
                </div>
                <CopyButton text={value} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 14 }}>{t.emptyState}</div>
        )}
      </div>

      {/* SEO content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.seoContent}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
