'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// --- Color math utilities (HSL-based) ---

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface ColorInfo {
  hex: string;
  rgb: [number, number, number];
  hsl: [number, number, number];
}

function makeColor(h: number, s: number, l: number): ColorInfo {
  const rgb = hslToRgb(h, s, l);
  return { hex: rgbToHex(...rgb), rgb, hsl: [Math.round(((h % 360) + 360) % 360), Math.round(s * 100), Math.round(l * 100)] };
}

function generatePalettes(hex: string) {
  const rgb = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(...rgb);

  const complementary: ColorInfo[] = [
    makeColor(h, s, l),
    makeColor(h + 30, s, Math.min(l + 0.1, 0.85)),
    makeColor(h + 180, s, l),
    makeColor(h + 180, s, Math.min(l + 0.15, 0.85)),
    makeColor(h + 210, s, Math.max(l - 0.1, 0.15)),
  ];

  const analogous: ColorInfo[] = [
    makeColor(h - 30, s, l),
    makeColor(h - 15, s, Math.min(l + 0.08, 0.85)),
    makeColor(h, s, l),
    makeColor(h + 15, s, Math.min(l + 0.08, 0.85)),
    makeColor(h + 30, s, l),
  ];

  const triadic: ColorInfo[] = [
    makeColor(h, s, l),
    makeColor(h, s * 0.7, Math.min(l + 0.15, 0.85)),
    makeColor(h + 120, s, l),
    makeColor(h + 120, s * 0.7, Math.min(l + 0.15, 0.85)),
    makeColor(h + 240, s, l),
  ];

  const tetradic: ColorInfo[] = [
    makeColor(h, s, l),
    makeColor(h + 90, s, l),
    makeColor(h + 180, s, l),
    makeColor(h + 270, s, l),
    makeColor(h + 45, s * 0.6, Math.min(l + 0.12, 0.85)),
  ];

  const splitComp: ColorInfo[] = [
    makeColor(h, s, l),
    makeColor(h, s, Math.min(l + 0.15, 0.85)),
    makeColor(h + 150, s, l),
    makeColor(h + 210, s, l),
    makeColor(h + 180, s * 0.5, Math.min(l + 0.2, 0.9)),
  ];

  return { Complementary: complementary, Analogous: analogous, Triadic: triadic, Tetradic: tetradic, 'Split-Complementary': splitComp };
}

const PRESETS = [
  { label: 'Ocean Blue', hex: '#2563eb' },
  { label: 'Sunset Orange', hex: '#ea580c' },
  { label: 'Forest Green', hex: '#16a34a' },
  { label: 'Royal Purple', hex: '#7c3aed' },
  { label: 'Cherry Red', hex: '#dc2626' },
  { label: 'Golden Yellow', hex: '#ca8a04' },
];

export default function ColorPaletteGenerator() {
  const { dict } = useLang();
  const t = dict.tools['color-palette'];
  const [baseColor, setBaseColor] = useState('#2563eb');
  const [exportMode, setExportMode] = useState<'json' | 'css'>('json');

  const palettes = useMemo(() => generatePalettes(baseColor), [baseColor]);

  const exportText = useMemo(() => {
    const all: Record<string, string[]> = {};
    for (const [name, colors] of Object.entries(palettes)) {
      all[name] = colors.map(c => c.hex);
    }
    if (exportMode === 'json') return JSON.stringify(all, null, 2);
    let css = ':root {\n';
    for (const [name, colors] of Object.entries(palettes)) {
      const prefix = name.toLowerCase().replace(/[^a-z]+/g, '-');
      colors.forEach((c, i) => { css += `  --${prefix}-${i + 1}: ${c.hex};\n`; });
    }
    css += '}';
    return css;
  }, [palettes, exportMode]);

  const formatHsl = (hsl: [number, number, number]) => `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  const formatRgb = (rgb: [number, number, number]) => `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="color-palette">
      {/* Base color controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Base Color:</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="color"
            value={baseColor}
            onChange={e => setBaseColor(e.target.value)}
            style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0, background: 'none' }}
          />
          <input
            type="text"
            value={baseColor}
            onChange={e => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{6}$/.test(v)) setBaseColor(v);
              else if (v.length <= 7) setBaseColor(v);
            }}
            maxLength={7}
            style={{ width: 90, padding: '8px 10px', fontSize: 14, fontFamily: 'monospace', background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 8 }}
          />
        </div>
        <div style={{ height: 20, width: 1, background: 'var(--border-color)' }} />
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Presets:</span>
        {PRESETS.map(p => (
          <button
            key={p.hex}
            onClick={() => setBaseColor(p.hex)}
            title={p.label}
            style={{
              width: 28, height: 28, borderRadius: '50%', border: baseColor === p.hex ? '2px solid var(--accent-blue)' : '2px solid var(--border-color)',
              background: p.hex, cursor: 'pointer', transition: 'transform 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>

      {/* Palettes */}
      {Object.entries(palettes).map(([name, colors]) => (
        <div key={name} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>{name}</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {colors.map((color, i) => {
              const textColor = relativeLuminance(...color.rgb) > 0.4 ? '#1a1a2e' : '#f1f5f9';
              const nextColor = colors[i + 1];
              const cr = nextColor ? contrastRatio(color.rgb, nextColor.rgb) : null;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: 140, borderRadius: 10, overflow: 'hidden',
                    border: '1px solid var(--border-color)', background: 'var(--bg-card)',
                  }}>
                    <div style={{
                      background: color.hex, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, fontFamily: 'monospace', color: textColor,
                    }}>
                      {color.hex.toUpperCase()}
                    </div>
                    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{formatRgb(color.rgb)}</span>
                        <CopyButton text={formatRgb(color.rgb)} label="" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{formatHsl(color.hsl)}</span>
                        <CopyButton text={formatHsl(color.hsl)} label="" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <CopyButton text={color.hex.toUpperCase()} label="Copy HEX" />
                      </div>
                    </div>
                  </div>
                  {cr !== null && (
                    <div style={{
                      fontSize: 10, color: cr >= 4.5 ? '#22c55e' : cr >= 3 ? '#eab308' : '#ef4444',
                      fontWeight: 700, fontFamily: 'monospace', writingMode: 'vertical-rl', textOrientation: 'mixed',
                      padding: '2px 0', lineHeight: 1,
                    }}>
                      {cr.toFixed(1)}:1
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Export section */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20, marginTop: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>Export</h3>
            <button
              onClick={() => setExportMode('json')}
              className={exportMode === 'json' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '4px 12px' }}
            >JSON</button>
            <button
              onClick={() => setExportMode('css')}
              className={exportMode === 'css' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '4px 12px' }}
            >CSS Variables</button>
          </div>
          <CopyButton text={exportText} />
        </div>
        <textarea
          value={exportText}
          readOnly
          style={{
            width: '100%', minHeight: 160, fontFamily: 'monospace', fontSize: 12,
            background: 'var(--bg-input)', color: 'var(--text-primary)',
            border: '1px solid var(--border-color)', borderRadius: 8, padding: 14,
            resize: 'vertical', opacity: 0.9,
          }}
        />
      </div>
    </ToolLayout>
  );
}
