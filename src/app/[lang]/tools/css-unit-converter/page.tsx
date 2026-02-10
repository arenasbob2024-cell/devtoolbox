'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type CssUnit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | 'pt' | '%';

const UNITS: CssUnit[] = ['px', 'rem', 'em', 'vw', 'vh', 'pt', '%'];

const PRESETS = [
  { px: 8 }, { px: 10 }, { px: 12 }, { px: 14 }, { px: 16 },
  { px: 18 }, { px: 20 }, { px: 24 }, { px: 32 }, { px: 48 },
];

function toPx(value: number, unit: CssUnit, root: number, parent: number, vw: number, vh: number): number {
  switch (unit) {
    case 'px': return value;
    case 'rem': return value * root;
    case 'em': return value * parent;
    case 'vw': return (value / 100) * vw;
    case 'vh': return (value / 100) * vh;
    case 'pt': return value / 0.75;
    case '%': return (value / 100) * parent;
  }
}

function fromPx(px: number, unit: CssUnit, root: number, parent: number, vw: number, vh: number): number {
  switch (unit) {
    case 'px': return px;
    case 'rem': return px / root;
    case 'em': return px / parent;
    case 'vw': return (px / vw) * 100;
    case 'vh': return (px / vh) * 100;
    case 'pt': return px * 0.75;
    case '%': return (px / parent) * 100;
  }
}

function fmt(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return '—';
  const rounded = Math.round(n * 10000) / 10000;
  return String(rounded);
}

export default function CssUnitConverter() {
  const { dict } = useLang();
  const t = dict.tools['css-unit-converter'];

  const [inputValue, setInputValue] = useState('16');
  const [inputUnit, setInputUnit] = useState<CssUnit>('px');
  const [rootFontSize, setRootFontSize] = useState(16);
  const [parentFontSize, setParentFontSize] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [viewportHeight, setViewportHeight] = useState(1080);

  const conversions = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return UNITS.map(u => ({ unit: u, value: '—' }));
    const px = toPx(val, inputUnit, rootFontSize, parentFontSize, viewportWidth, viewportHeight);
    return UNITS.filter(u => u !== inputUnit).map(u => ({
      unit: u,
      value: fmt(fromPx(px, u, rootFontSize, parentFontSize, viewportWidth, viewportHeight)),
    }));
  }, [inputValue, inputUnit, rootFontSize, parentFontSize, viewportWidth, viewportHeight]);

  const presetRows = useMemo(() => {
    return PRESETS.map(p => {
      const px = p.px;
      return {
        px,
        rem: fmt(fromPx(px, 'rem', rootFontSize, parentFontSize, viewportWidth, viewportHeight)),
        em: fmt(fromPx(px, 'em', rootFontSize, parentFontSize, viewportWidth, viewportHeight)),
        pt: fmt(fromPx(px, 'pt', rootFontSize, parentFontSize, viewportWidth, viewportHeight)),
      };
    });
  }, [rootFontSize, parentFontSize, viewportWidth, viewportHeight]);

  const handleOutputClick = (unit: CssUnit, value: string) => {
    if (value === '—') return;
    setInputValue(value);
    setInputUnit(unit);
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
    display: 'block', marginBottom: 4,
  };

  const smallInputStyle: React.CSSProperties = {
    background: 'var(--bg-input)', border: '1px solid var(--border-color)',
    borderRadius: 6, padding: '6px 10px', fontSize: 13, color: 'var(--text-primary)',
    width: '100%', outline: 'none',
  };

  const cellStyle: React.CSSProperties = {
    padding: '10px 14px', borderBottom: '1px solid var(--border-color)',
    fontSize: 13, color: 'var(--text-primary)',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-unit-converter">
      {/* Input + Settings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Input */}
        <div>
          <label style={labelStyle}>Value</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              style={{ ...smallInputStyle, flex: 1, fontSize: 18, padding: '10px 14px' }}
            />
            <select
              value={inputUnit}
              onChange={e => setInputUnit(e.target.value as CssUnit)}
              style={{
                ...smallInputStyle, width: 80, cursor: 'pointer',
                fontSize: 15, fontWeight: 700, textAlign: 'center',
              }}
            >
              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* Settings */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 8, padding: 14,
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Settings
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div>
              <label style={labelStyle}>Root font-size (px)</label>
              <input type="number" value={rootFontSize} onChange={e => setRootFontSize(Number(e.target.value) || 16)} style={smallInputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Parent font-size (px)</label>
              <input type="number" value={parentFontSize} onChange={e => setParentFontSize(Number(e.target.value) || 16)} style={smallInputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Viewport width (px)</label>
              <input type="number" value={viewportWidth} onChange={e => setViewportWidth(Number(e.target.value) || 1920)} style={smallInputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Viewport height (px)</label>
              <input type="number" value={viewportHeight} onChange={e => setViewportHeight(Number(e.target.value) || 1080)} style={smallInputStyle} />
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Results */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Converted Values</h2>
        <div style={{
          borderRadius: 8, overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Unit</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Value</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'right', width: 80 }}>Copy</th>
              </tr>
            </thead>
            <tbody>
              {conversions.map(({ unit, value }) => {
                const display = value === '—' ? '—' : `${value}${unit}`;
                return (
                  <tr
                    key={unit}
                    onClick={() => handleOutputClick(unit, value)}
                    style={{ cursor: value === '—' ? 'default' : 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => { if (value !== '—') (e.currentTarget.style.background = 'var(--bg-input)'); }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--accent-blue)', fontFamily: 'monospace' }}>{unit}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 14 }}>{display}</td>
                    <td style={{ ...cellStyle, textAlign: 'right' }}>
                      {value !== '—' && <CopyButton text={display} />}
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

      {/* Common Presets */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Common Presets</h2>
        <div style={{
          borderRadius: 8, overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                {['px', 'rem', 'em', 'pt'].map(h => (
                  <th key={h} style={{ ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{h}</th>
                ))}
                <th style={{ ...cellStyle, width: 80 }} />
              </tr>
            </thead>
            <tbody>
              {presetRows.map(row => {
                const copyText = `${row.px}px = ${row.rem}rem`;
                return (
                  <tr key={row.px}>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontWeight: 600 }}>{row.px}px</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{row.rem}rem</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{row.em}em</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{row.pt}pt</td>
                    <td style={{ ...cellStyle, textAlign: 'right' }}>
                      <CopyButton text={copyText} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
