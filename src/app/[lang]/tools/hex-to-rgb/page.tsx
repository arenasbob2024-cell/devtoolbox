'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const COMMON_COLORS = [
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255' },
  { name: 'Black', hex: '#000000', rgb: '0, 0, 0' },
  { name: 'Red', hex: '#FF0000', rgb: '255, 0, 0' },
  { name: 'Green', hex: '#00FF00', rgb: '0, 255, 0' },
  { name: 'Blue', hex: '#0000FF', rgb: '0, 0, 255' },
  { name: 'Yellow', hex: '#FFFF00', rgb: '255, 255, 0' },
  { name: 'Cyan', hex: '#00FFFF', rgb: '0, 255, 255' },
  { name: 'Magenta', hex: '#FF00FF', rgb: '255, 0, 255' },
  { name: 'Orange', hex: '#FFA500', rgb: '255, 165, 0' },
  { name: 'Purple', hex: '#800080', rgb: '128, 0, 128' },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace(/^#/, '');
  let fullHex = cleaned;
  if (cleaned.length === 3) {
    fullHex = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(fullHex)) return null;
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function isValidRgbValue(val: string): boolean {
  if (val === '') return true;
  const num = parseInt(val, 10);
  return !isNaN(num) && num >= 0 && num <= 255 && val === String(num);
}

export default function HexToRgb() {
  const { dict } = useLang();
  const t = dict.tools['hex-to-rgb'];

  const [hexInput, setHexInput] = useState('');
  const [rInput, setRInput] = useState('');
  const [gInput, setGInput] = useState('');
  const [bInput, setBInput] = useState('');

  const [hexError, setHexError] = useState('');
  const [rgbError, setRgbError] = useState('');

  // Hex to RGB conversion results
  const hexCleaned = hexInput.trim().replace(/^#/, '');
  const hexRgb = hexToRgb(hexCleaned);
  const hexHsl = hexRgb ? rgbToHsl(hexRgb.r, hexRgb.g, hexRgb.b) : null;

  const handleHexChange = useCallback((value: string) => {
    setHexInput(value);
    const cleaned = value.trim().replace(/^#/, '');
    if (!cleaned) {
      setHexError('');
      return;
    }
    if (cleaned.length === 3 || cleaned.length === 6) {
      if (!/^[0-9A-Fa-f]+$/.test(cleaned)) {
        setHexError(t.invalidHex || 'Invalid hex color');
      } else {
        setHexError('');
      }
    } else if (cleaned.length > 6) {
      setHexError(t.invalidHex || 'Invalid hex color');
    } else {
      if (!/^[0-9A-Fa-f]*$/.test(cleaned)) {
        setHexError(t.invalidHex || 'Invalid hex color');
      } else {
        setHexError('');
      }
    }
  }, [t]);

  // RGB to Hex conversion
  const rValid = isValidRgbValue(rInput);
  const gValid = isValidRgbValue(gInput);
  const bValid = isValidRgbValue(bInput);
  const rgbAllValid = rValid && gValid && bValid && rInput !== '' && gInput !== '' && bInput !== '';
  const rgbHex = rgbAllValid ? rgbToHex(parseInt(rInput), parseInt(gInput), parseInt(bInput)) : '';
  const rgbHsl = rgbAllValid ? rgbToHsl(parseInt(rInput), parseInt(gInput), parseInt(bInput)) : null;

  const handleRgbChange = useCallback((channel: 'r' | 'g' | 'b', value: string) => {
    // Allow empty or numbers only
    if (value !== '' && !/^\d+$/.test(value)) return;
    if (channel === 'r') setRInput(value);
    if (channel === 'g') setGInput(value);
    if (channel === 'b') setBInput(value);

    const num = parseInt(value, 10);
    if (value !== '' && (isNaN(num) || num < 0 || num > 255)) {
      setRgbError(t.invalidRgb || 'Invalid RGB value (0-255)');
    } else {
      setRgbError('');
    }
  }, [t]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const resultBoxStyle: React.CSSProperties = {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'monospace',
    color: 'var(--text-primary)',
    wordBreak: 'break-all',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  };
  const sectionStyle: React.CSSProperties = {
    padding: 20,
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    marginBottom: 16,
  };
  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 13, marginTop: 6 };
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    boxSizing: 'border-box',
  };
  const smallLabelStyle: React.CSSProperties = { fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="hex-to-rgb">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Hex to RGB */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.hexToRgb || 'Hex \u2192 RGB'}</label>
          <input
            type="text"
            value={hexInput}
            onChange={e => handleHexChange(e.target.value)}
            placeholder={t.hexPlaceholder || 'Enter hex color (e.g., #FF5733)'}
            style={inputStyle}
          />
          {hexError && <p style={errorStyle}>{hexError}</p>}

          {hexRgb && !hexError && (
            <>
              {/* Color Preview */}
              <div style={{ marginTop: 12 }}>
                <label style={smallLabelStyle}>{t.colorPreview || 'Color Preview'}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    backgroundColor: `rgb(${hexRgb.r}, ${hexRgb.g}, ${hexRgb.b})`,
                    border: '1px solid var(--border-color)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--text-secondary)' }}>
                    #{hexCleaned.length === 3
                      ? (hexCleaned[0] + hexCleaned[0] + hexCleaned[1] + hexCleaned[1] + hexCleaned[2] + hexCleaned[2]).toUpperCase()
                      : hexCleaned.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* RGB Values */}
              <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                <div>
                  <label style={smallLabelStyle}>{t.red || 'Red'} (R)</label>
                  <div style={resultBoxStyle}>
                    <span>{hexRgb.r}</span>
                    <CopyButton text={String(hexRgb.r)} />
                  </div>
                </div>
                <div>
                  <label style={smallLabelStyle}>{t.green || 'Green'} (G)</label>
                  <div style={resultBoxStyle}>
                    <span>{hexRgb.g}</span>
                    <CopyButton text={String(hexRgb.g)} />
                  </div>
                </div>
                <div>
                  <label style={smallLabelStyle}>{t.blue || 'Blue'} (B)</label>
                  <div style={resultBoxStyle}>
                    <span>{hexRgb.b}</span>
                    <CopyButton text={String(hexRgb.b)} />
                  </div>
                </div>
                <div>
                  <label style={smallLabelStyle}>{t.cssRgb || 'CSS RGB'}</label>
                  <div style={resultBoxStyle}>
                    <span>rgb({hexRgb.r}, {hexRgb.g}, {hexRgb.b})</span>
                    <CopyButton text={`rgb(${hexRgb.r}, ${hexRgb.g}, ${hexRgb.b})`} />
                  </div>
                </div>
                {hexHsl && (
                  <div>
                    <label style={smallLabelStyle}>{t.hslValue || 'HSL'}</label>
                    <div style={resultBoxStyle}>
                      <span>hsl({hexHsl.h}, {hexHsl.s}%, {hexHsl.l}%)</span>
                      <CopyButton text={`hsl(${hexHsl.h}, ${hexHsl.s}%, ${hexHsl.l}%)`} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* RGB to Hex */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.rgbToHex || 'RGB \u2192 Hex'}</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <label style={smallLabelStyle}>{t.red || 'Red'} (R)</label>
              <input
                type="text"
                value={rInput}
                onChange={e => handleRgbChange('r', e.target.value)}
                placeholder="0-255"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={smallLabelStyle}>{t.green || 'Green'} (G)</label>
              <input
                type="text"
                value={gInput}
                onChange={e => handleRgbChange('g', e.target.value)}
                placeholder="0-255"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={smallLabelStyle}>{t.blue || 'Blue'} (B)</label>
              <input
                type="text"
                value={bInput}
                onChange={e => handleRgbChange('b', e.target.value)}
                placeholder="0-255"
                style={inputStyle}
              />
            </div>
          </div>
          {rgbError && <p style={errorStyle}>{rgbError}</p>}

          {rgbAllValid && (
            <>
              {/* Color Preview */}
              <div style={{ marginTop: 12 }}>
                <label style={smallLabelStyle}>{t.colorPreview || 'Color Preview'}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    backgroundColor: `rgb(${rInput}, ${gInput}, ${bInput})`,
                    border: '1px solid var(--border-color)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--text-secondary)' }}>
                    {rgbHex}
                  </span>
                </div>
              </div>

              {/* Results */}
              <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
                <div>
                  <label style={smallLabelStyle}>{t.hexValue || 'Hex'}</label>
                  <div style={resultBoxStyle}>
                    <span>{rgbHex}</span>
                    <CopyButton text={rgbHex} />
                  </div>
                </div>
                <div>
                  <label style={smallLabelStyle}>{t.cssRgb || 'CSS RGB'}</label>
                  <div style={resultBoxStyle}>
                    <span>rgb({rInput}, {gInput}, {bInput})</span>
                    <CopyButton text={`rgb(${rInput}, ${gInput}, ${bInput})`} />
                  </div>
                </div>
                {rgbHsl && (
                  <div>
                    <label style={smallLabelStyle}>{t.hslValue || 'HSL'}</label>
                    <div style={resultBoxStyle}>
                      <span>hsl({rgbHsl.h}, {rgbHsl.s}%, {rgbHsl.l}%)</span>
                      <CopyButton text={`hsl(${rgbHsl.h}, ${rgbHsl.s}%, ${rgbHsl.l}%)`} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Common Colors Reference Table */}
      <div style={{ ...sectionStyle, marginTop: 8 }}>
        <label style={labelStyle}>{t.commonColors || 'Common Colors'}</label>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'monospace' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>Color</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.hexValue || 'Hex'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.rgbValue || 'RGB'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.hslValue || 'HSL'}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_COLORS.map(c => {
                const rgb = hexToRgb(c.hex)!;
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return (
                  <tr key={c.hex} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          backgroundColor: c.hex,
                          border: '1px solid var(--border-color)',
                          flexShrink: 0,
                        }} />
                        {c.name}
                      </div>
                    </td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{c.hex}</td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{c.rgb}</td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Section */}
      <div style={{ ...sectionStyle, marginTop: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>{t.seoTitle || 'Hex to RGB Color Converter Online'}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{t.seoContent || 'This hex to RGB color converter tool allows you to easily convert between hexadecimal color codes and RGB (Red, Green, Blue) values. Enter a hex color code to see its RGB breakdown, CSS rgb() string, and HSL values, or input individual R, G, B values to get the corresponding hex code. The tool supports both 3-digit and 6-digit hex codes and features a live color preview swatch. A reference table of common colors is included for quick lookup. All processing happens in your browser — your data never leaves your device.'}</p>
      </div>
    </ToolLayout>
  );
}
