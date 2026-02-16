'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type CssUnit = 'px' | 'em' | 'rem' | 'pt' | '%' | 'vw';

const UNITS: { id: CssUnit; label: string }[] = [
  { id: 'px', label: 'Pixels (px)' },
  { id: 'em', label: 'Em' },
  { id: 'rem', label: 'Rem' },
  { id: 'pt', label: 'Points (pt)' },
  { id: '%', label: 'Percent (%)' },
  { id: 'vw', label: 'Viewport Width (vw)' },
];

const REFERENCE_TABLE = [
  { unit: 'px', relativeTo: 'Absolute', useCase: 'Fixed layouts, borders, precise sizing' },
  { unit: 'em', relativeTo: 'Parent element font-size', useCase: 'Component-relative sizing, padding, margins' },
  { unit: 'rem', relativeTo: 'Root element (html) font-size', useCase: 'Consistent spacing, responsive typography' },
  { unit: 'pt', relativeTo: 'Absolute (1pt = 1/72 inch)', useCase: 'Print stylesheets, PDF generation' },
  { unit: '%', relativeTo: 'Parent element dimension', useCase: 'Fluid layouts, responsive widths' },
  { unit: 'vw', relativeTo: 'Viewport width (1vw = 1%)', useCase: 'Full-width elements, responsive text' },
];

function toPx(value: number, unit: CssUnit, baseFontSize: number, viewportWidth: number): number {
  switch (unit) {
    case 'px': return value;
    case 'em': return value * baseFontSize;
    case 'rem': return value * baseFontSize;
    case 'pt': return value / 0.75;
    case '%': return (value / 100) * baseFontSize;
    case 'vw': return (value / 100) * viewportWidth;
  }
}

function fromPx(px: number, unit: CssUnit, baseFontSize: number, viewportWidth: number): number {
  switch (unit) {
    case 'px': return px;
    case 'em': return px / baseFontSize;
    case 'rem': return px / baseFontSize;
    case 'pt': return px * 0.75;
    case '%': return (px / baseFontSize) * 100;
    case 'vw': return (px / viewportWidth) * 100;
  }
}

function fmt(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return '--';
  const rounded = Math.round(n * 10000) / 10000;
  return String(rounded);
}

export default function EmPxConverter() {
  const { dict } = useLang();
  const t = dict.tools['em-px-converter'];

  const [inputValue, setInputValue] = useState('16');
  const [inputUnit, setInputUnit] = useState<CssUnit>('px');
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(1920);

  const conversions = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return UNITS.map(u => ({ unit: u.id, label: u.label, value: '--' }));
    const px = toPx(val, inputUnit, baseFontSize, viewportWidth);
    return UNITS.map(u => ({
      unit: u.id,
      label: u.label,
      value: fmt(fromPx(px, u.id, baseFontSize, viewportWidth)),
    }));
  }, [inputValue, inputUnit, baseFontSize, viewportWidth]);

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
    display: 'block', marginBottom: 6,
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

  const cellStyle: React.CSSProperties = {
    padding: '10px 14px',
    borderBottom: '1px solid var(--border-color)',
    fontSize: 13,
    color: 'var(--text-primary)',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="em-px-converter">
      {/* Input Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Value & Unit */}
        <div>
          <label style={labelStyle}>{t.inputValue}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              style={{ ...inputStyle, flex: 1, fontSize: 18, padding: '10px 14px' }}
            />
            <select
              value={inputUnit}
              onChange={e => setInputUnit(e.target.value as CssUnit)}
              style={{
                ...inputStyle,
                width: 100,
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {UNITS.map(u => <option key={u.id} value={u.id}>{u.id}</option>)}
            </select>
          </div>
        </div>

        {/* Settings */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 8, padding: 14,
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Settings
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>{t.baseSize}</label>
              <input
                type="number"
                value={baseFontSize}
                onChange={e => setBaseFontSize(Number(e.target.value) || 16)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Viewport Width (px)</label>
              <input
                type="number"
                value={viewportWidth}
                onChange={e => setViewportWidth(Number(e.target.value) || 1920)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Results */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.results}</h2>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Unit</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Value</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'right', width: 80 }}>Copy</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map(({ unit, label, value }) => {
                const display = value === '--' ? '--' : `${value}${unit}`;
                const isActive = unit === inputUnit;
                return (
                  <tr
                    key={unit}
                    onClick={() => {
                      if (value !== '--') {
                        setInputValue(value);
                        setInputUnit(unit);
                      }
                    }}
                    style={{
                      cursor: value === '--' ? 'default' : 'pointer',
                      transition: 'background 0.15s',
                      background: isActive ? 'var(--bg-input)' : 'transparent',
                    }}
                    onMouseEnter={e => { if (value !== '--' && !isActive) e.currentTarget.style.background = 'var(--bg-input)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ ...cellStyle, fontWeight: 700, color: isActive ? 'var(--accent)' : 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {label}
                    </td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 15, fontWeight: isActive ? 700 : 400 }}>{display}</td>
                    <td style={{ ...cellStyle, textAlign: 'right' }}>
                      {value !== '--' && <CopyButton text={display} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
          Click any row to use that value as the new input.
        </p>
      </div>

      {/* Reference Table */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.reference}</h2>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.unitName}</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.relativeTo}</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.useCase}</th>
              </tr>
            </thead>
            <tbody>
              {REFERENCE_TABLE.map(row => (
                <tr key={row.unit}>
                  <td style={{ ...cellStyle, fontWeight: 700, fontFamily: 'monospace', color: 'var(--accent)' }}>{row.unit}</td>
                  <td style={{ ...cellStyle, fontSize: 12 }}>{row.relativeTo}</td>
                  <td style={{ ...cellStyle, fontSize: 12, color: 'var(--text-secondary)' }}>{row.useCase}</td>
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
