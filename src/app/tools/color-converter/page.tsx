'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
  r: number; g: number; b: number;
  h: number; s: number; l: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export default function ColorConverter() {
  const [color, setColor] = useState<ColorValues | null>(null);
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbInput, setRgbInput] = useState('');
  const [hslInput, setHslInput] = useState('');

  const fromHex = (hex?: string) => {
    const h = hex || hexInput;
    const rgb = hexToRgb(h);
    if (!rgb) return;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setColor({
      hex: h.startsWith('#') ? h : '#' + h,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      ...rgb, ...hsl,
    });
    setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
  };

  const fromRgb = () => {
    const parts = rgbInput.replace(/rgb\(|\)/g, '').split(',').map(s => parseInt(s.trim()));
    if (parts.length !== 3 || parts.some(isNaN)) return;
    const [r, g, b] = parts;
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    fromHex(hex);
  };

  const randomColor = () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setHexInput(hex);
    fromHex(hex);
  };

  return (
    <ToolLayout
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats with live preview."
      toolId="color-converter"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>HEX</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={hexInput} onChange={e => setHexInput(e.target.value)} placeholder="#3b82f6" />
                <button onClick={() => fromHex()} className="btn btn-primary" style={{ flexShrink: 0 }}>Convert</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>RGB</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={rgbInput} onChange={e => setRgbInput(e.target.value)} placeholder="59, 130, 246" />
                <button onClick={fromRgb} className="btn btn-primary" style={{ flexShrink: 0 }}>Convert</button>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>HSL</label>
              <input type="text" value={hslInput} onChange={e => setHslInput(e.target.value)} placeholder="217, 91%, 60%" readOnly />
            </div>
            <button onClick={randomColor} className="btn btn-secondary" style={{ width: '100%' }}>🎲 Random Color</button>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>Color Picker</label>
              <input type="color" value={hexInput} onChange={e => { setHexInput(e.target.value); fromHex(e.target.value); }}
                style={{ width: '100%', height: 40, border: 'none', cursor: 'pointer', borderRadius: 8 }} />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          {color && (
            <>
              <div style={{
                width: '100%',
                height: 160,
                borderRadius: 12,
                background: color.hex,
                marginBottom: 16,
                border: '1px solid var(--border-color)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'HEX', value: color.hex },
                  { label: 'RGB', value: color.rgb },
                  { label: 'HSL', value: color.hsl },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px',
                    border: '1px solid var(--border-color)',
                  }}>
                    <div>
                      <span style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700 }}>{label}: </span>
                      <code style={{ fontSize: 13 }}>{value}</code>
                    </div>
                    <CopyButton text={value} />
                  </div>
                ))}
              </div>
            </>
          )}
          {!color && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>
              Enter a color value and click Convert
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Color Formats</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          HEX colors use hexadecimal notation (#RRGGBB). RGB uses red, green, and blue channels (0-255). HSL uses hue (0-360°), saturation (0-100%), and lightness (0-100%). Each format has its use cases in web design, CSS, and graphic design.
        </p>
      </div>
    </ToolLayout>
  );
}
