'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type UnitKey = 'bit' | 'byte' | 'kilobyte' | 'megabyte' | 'gigabyte' | 'terabyte' | 'petabyte' | 'kibibyte' | 'mebibyte' | 'gibibyte' | 'tebibyte';

interface UnitDef {
  key: UnitKey;
  symbol: string;
  binaryFactor: number;
  decimalFactor: number;
}

const UNITS: UnitDef[] = [
  { key: 'bit',      symbol: 'b',   binaryFactor: 1 / 8,           decimalFactor: 1 / 8 },
  { key: 'byte',     symbol: 'B',   binaryFactor: 1,               decimalFactor: 1 },
  { key: 'kilobyte', symbol: 'KB',  binaryFactor: 1024,            decimalFactor: 1000 },
  { key: 'megabyte', symbol: 'MB',  binaryFactor: 1024 ** 2,       decimalFactor: 1000 ** 2 },
  { key: 'gigabyte', symbol: 'GB',  binaryFactor: 1024 ** 3,       decimalFactor: 1000 ** 3 },
  { key: 'terabyte', symbol: 'TB',  binaryFactor: 1024 ** 4,       decimalFactor: 1000 ** 4 },
  { key: 'petabyte', symbol: 'PB',  binaryFactor: 1024 ** 5,       decimalFactor: 1000 ** 5 },
  { key: 'kibibyte', symbol: 'KiB', binaryFactor: 1024,            decimalFactor: 1024 },
  { key: 'mebibyte', symbol: 'MiB', binaryFactor: 1024 ** 2,       decimalFactor: 1024 ** 2 },
  { key: 'gibibyte', symbol: 'GiB', binaryFactor: 1024 ** 3,       decimalFactor: 1024 ** 3 },
  { key: 'tebibyte', symbol: 'TiB', binaryFactor: 1024 ** 4,       decimalFactor: 1024 ** 4 },
];

const COMMON_SIZES = [
  { name: 'Floppy Disk (1.44 MB)', bytes: 1_509_949.44 },
  { name: 'CD-ROM (700 MB)', bytes: 734_003_200 },
  { name: 'DVD (4.7 GB)', bytes: 5_046_586_573 },
  { name: 'USB Drive (8 GB)', bytes: 8_589_934_592 },
  { name: 'Blu-ray (25 GB)', bytes: 26_843_545_600 },
  { name: 'SSD (256 GB)', bytes: 274_877_906_944 },
  { name: 'Hard Drive (1 TB)', bytes: 1_099_511_627_776 },
  { name: 'Hard Drive (4 TB)', bytes: 4_398_046_511_104 },
];

function formatNumber(n: number): string {
  if (n === 0) return '0';
  if (!Number.isFinite(n)) return '---';
  if (Math.abs(n) < 0.000001) return n.toExponential(6);
  if (Math.abs(n) >= 1e15) return n.toExponential(6);
  const s = n.toPrecision(12);
  return parseFloat(s).toString();
}

export default function ByteConverter() {
  const { dict } = useLang();
  const t = dict.tools['byte-converter'];

  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState<UnitKey>('megabyte');
  const [mode, setMode] = useState<'binary' | 'decimal'>('binary');

  const toBytes = useCallback((value: number, unit: UnitKey, m: 'binary' | 'decimal'): number => {
    const def = UNITS.find(u => u.key === unit)!;
    return value * (m === 'binary' ? def.binaryFactor : def.decimalFactor);
  }, []);

  const fromBytes = useCallback((bytes: number, unit: UnitKey, m: 'binary' | 'decimal'): number => {
    const def = UNITS.find(u => u.key === unit)!;
    return bytes / (m === 'binary' ? def.binaryFactor : def.decimalFactor);
  }, []);

  const conversions = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || inputValue.trim() === '') return null;
    const bytes = toBytes(val, inputUnit, mode);
    return UNITS.map(u => ({
      key: u.key,
      symbol: u.symbol,
      value: formatNumber(fromBytes(bytes, u.key, mode)),
    }));
  }, [inputValue, inputUnit, mode, toBytes, fromBytes]);

  const commonRows = useMemo(() => {
    return COMMON_SIZES.map(s => ({
      name: s.name,
      kb: formatNumber(s.bytes / (mode === 'binary' ? 1024 : 1000)),
      mb: formatNumber(s.bytes / (mode === 'binary' ? 1024 ** 2 : 1000 ** 2)),
      gb: formatNumber(s.bytes / (mode === 'binary' ? 1024 ** 3 : 1000 ** 3)),
    }));
  }, [mode]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: 16, fontFamily: 'monospace',
    backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)',
    borderRadius: 6, color: 'var(--text-primary)', boxSizing: 'border-box' as const, outline: 'none',
  };
  const selectStyle: React.CSSProperties = {
    ...inputStyle, fontSize: 14, cursor: 'pointer', width: 'auto', minWidth: 140,
  };
  const sectionStyle: React.CSSProperties = {
    padding: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: 8, marginBottom: 16,
  };
  const cellStyle: React.CSSProperties = {
    padding: '8px 12px', borderBottom: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-primary)',
  };
  const thStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)', textAlign: 'left' as const,
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="byte-converter">
      {/* Mode Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{t.mode}:</label>
        <div style={{
          display: 'flex', background: 'var(--bg-input)', borderRadius: 8,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <button
            onClick={() => setMode('binary')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'binary' ? 'var(--accent)' : 'transparent',
              color: mode === 'binary' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
            }}
          >
            {t.binary}
          </button>
          <button
            onClick={() => setMode('decimal')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'decimal' ? 'var(--accent)' : 'transparent',
              color: mode === 'decimal' ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
            }}
          >
            {t.decimal}
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div style={sectionStyle}>
        <label style={labelStyle}>{t.inputValue}</label>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={t.valuePlaceholder}
            style={{ ...inputStyle, flex: 1, minWidth: 200 }}
          />
          <select
            value={inputUnit}
            onChange={e => setInputUnit(e.target.value as UnitKey)}
            style={selectStyle}
          >
            {UNITS.map(u => (
              <option key={u.key} value={u.key}>{(t as Record<string, string>)[u.key] || u.symbol}</option>
            ))}
          </select>
        </div>
        {inputValue.trim() !== '' && isNaN(parseFloat(inputValue)) && (
          <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{t.invalidValue}</p>
        )}
      </div>

      {/* Conversion Results */}
      {conversions && (
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.results}</label>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-input)' }}>
                  <th style={thStyle}>Unit</th>
                  <th style={thStyle}>Value</th>
                  <th style={{ ...thStyle, textAlign: 'right' as const, width: 60 }}>Copy</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map(c => (
                  <tr key={c.key}>
                    <td style={{ ...cellStyle, fontWeight: 600, color: 'var(--accent)' }}>{(t as Record<string, string>)[c.key] || c.symbol}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 14 }}>{c.value} {c.symbol}</td>
                    <td style={{ ...cellStyle, textAlign: 'right' as const }}>
                      <CopyButton text={`${c.value} ${c.symbol}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Common File Sizes */}
      <div style={sectionStyle}>
        <label style={labelStyle}>{t.commonSizes}</label>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={thStyle}>Storage</th>
                <th style={thStyle}>KB</th>
                <th style={thStyle}>MB</th>
                <th style={thStyle}>GB</th>
              </tr>
            </thead>
            <tbody>
              {commonRows.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{r.name}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.kb}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.mb}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{r.gb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
