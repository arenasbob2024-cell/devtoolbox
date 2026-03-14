'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssNeumorphismGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-neumorphism-generator'];
  const [bgColor, setBgColor] = useState('#e0e5ec');
  const [size, setSize] = useState(10);
  const [intensity, setIntensity] = useState(0.15);
  const [borderRadius, setBorderRadius] = useState(20);
  const [shape, setShape] = useState<'flat' | 'concave' | 'convex' | 'pressed'>('flat');

  const adjustColor = (hex: string, amount: number) => {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  };

  const lightShadow = adjustColor(bgColor, Math.round(intensity * 255));
  const darkShadow = adjustColor(bgColor, -Math.round(intensity * 255));

  const getBackground = () => {
    if (shape === 'concave') return `linear-gradient(145deg, ${darkShadow}, ${lightShadow})`;
    if (shape === 'convex') return `linear-gradient(145deg, ${lightShadow}, ${darkShadow})`;
    return bgColor;
  };

  const getShadow = () => {
    if (shape === 'pressed') return `inset ${size}px ${size}px ${size * 2}px ${darkShadow}, inset -${size}px -${size}px ${size * 2}px ${lightShadow}`;
    return `${size}px ${size}px ${size * 2}px ${darkShadow}, -${size}px -${size}px ${size * 2}px ${lightShadow}`;
  };

  const cssCode = `/* Neumorphism Effect */
background: ${getBackground()};
border-radius: ${borderRadius}px;
box-shadow: ${getShadow()};`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-neumorphism-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Background Color</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bgColor}</span>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Shape</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {(['flat', 'concave', 'convex', 'pressed'] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} style={{ padding: '6px 12px', borderRadius: 6, border: `2px solid ${shape === s ? 'var(--accent-blue)' : 'var(--border-color)'}`, background: shape === s ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>{s}</button>
              ))}
            </div>
          </div>
          {[
            { label: `Size: ${size}px`, value: size, set: setSize, min: 2, max: 30, step: 1 },
            { label: `Intensity: ${Math.round(intensity * 100)}%`, value: intensity, set: setIntensity, min: 0.05, max: 0.4, step: 0.05 },
            { label: `Border Radius: ${borderRadius}px`, value: borderRadius, set: setBorderRadius, min: 0, max: 50, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <div style={{ background: bgColor, borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{
            background: getBackground(),
            borderRadius: borderRadius,
            boxShadow: getShadow(),
            width: 180,
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: adjustColor(bgColor, -80) }}>Neumorphism</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Code</label>
          <CopyButton text={cssCode} />
        </div>
        <pre style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, fontSize: 12, color: 'var(--text-primary)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>{cssCode}</pre>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
