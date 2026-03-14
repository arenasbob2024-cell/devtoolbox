'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssGlassmorphismGenerator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-glassmorphism-generator'];
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.18);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState(16);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const rgb = hexToRgb(bgColor);
  const cssCode = `/* Glassmorphism Effect */
background: rgba(${rgb}, ${opacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: ${borderRadius}px;
border: 1px solid rgba(${rgb}, ${borderOpacity});
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-glassmorphism-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Controls */}
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          {[
            { label: `Blur: ${blur}px`, value: blur, set: setBlur, min: 0, max: 40, step: 1 },
            { label: `Opacity: ${opacity}`, value: opacity, set: setOpacity, min: 0, max: 1, step: 0.05 },
            { label: `Border Opacity: ${borderOpacity}`, value: borderOpacity, set: setBorderOpacity, min: 0, max: 1, step: 0.05 },
            { label: `Border Radius: ${borderRadius}px`, value: borderRadius, set: setBorderRadius, min: 0, max: 50, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(parseFloat(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Background Color</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', cursor: 'pointer' }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 120, height: 120, borderRadius: '50%', background: '#ff6b6b' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 150, height: 150, borderRadius: '50%', background: '#ffd93d' }} />
          <div style={{ position: 'absolute', top: 40, right: 40, width: 80, height: 80, borderRadius: '50%', background: '#6bcb77' }} />
          <div style={{
            background: `rgba(${rgb}, ${opacity})`,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            borderRadius: borderRadius,
            border: `1px solid rgba(${rgb}, ${borderOpacity})`,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            padding: 30,
            width: '80%',
            textAlign: 'center',
            zIndex: 1,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Glass Card</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Glassmorphism effect preview</div>
          </div>
        </div>
      </div>

      {/* Code Output */}
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
