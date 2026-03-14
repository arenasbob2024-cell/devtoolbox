'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssGradientText() {
  const { dict } = useLang();
  const t = (dict.tools as any)['css-gradient-text'];
  const [text, setText] = useState('Gradient Text');
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState(800);
  const [color1, setColor1] = useState('#667eea');
  const [color2, setColor2] = useState('#764ba2');
  const [color3, setColor3] = useState('');
  const [angle, setAngle] = useState(135);

  const colors = [color1, color2, color3].filter(Boolean).join(', ');
  const gradient = `linear-gradient(${angle}deg, ${colors})`;

  const cssCode = `.gradient-text {
  background: ${gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
}`;

  const presets = [
    { name: 'Sunset', c1: '#f093fb', c2: '#f5576c', c3: '' },
    { name: 'Ocean', c1: '#4facfe', c2: '#00f2fe', c3: '' },
    { name: 'Forest', c1: '#43e97b', c2: '#38f9d7', c3: '' },
    { name: 'Fire', c1: '#f7971e', c2: '#ffd200', c3: '' },
    { name: 'Night', c1: '#a18cd1', c2: '#fbc2eb', c3: '' },
    { name: 'Rainbow', c1: '#ff0844', c2: '#ffb199', c3: '#667eea' },
  ];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="css-gradient-text">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Settings</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Preview Text</label>
            <input type="text" value={text} onChange={e => setText(e.target.value)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 1</label>
              <input type="color" value={color1} onChange={e => setColor1(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 2</label>
              <input type="color" value={color2} onChange={e => setColor2(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Color 3 (optional)</label>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="color" value={color3 || '#000000'} onChange={e => setColor3(e.target.value)} style={{ width: '100%', height: 32, border: 'none', cursor: 'pointer' }} />
                {color3 && <button onClick={() => setColor3('')} style={{ fontSize: 10, background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}>✕</button>}
              </div>
            </div>
          </div>
          {[
            { label: `Angle: ${angle}°`, value: angle, set: setAngle, min: 0, max: 360, step: 5 },
            { label: `Font Size: ${fontSize}px`, value: fontSize, set: setFontSize, min: 16, max: 120, step: 2 },
            { label: `Font Weight: ${fontWeight}`, value: fontWeight, set: setFontWeight, min: 100, max: 900, step: 100 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          ))}

          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {presets.map(p => (
              <button key={p.name} onClick={() => { setColor1(p.c1); setColor2(p.c2); setColor3(p.c3); }} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: `linear-gradient(90deg, ${p.c1}, ${p.c2}${p.c3 ? ', ' + p.c3 : ''})`, color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{p.name}</button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <div style={{
            background: gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: fontSize,
            fontWeight: fontWeight,
            textAlign: 'center',
            wordBreak: 'break-word',
          }}>
            {text || 'Gradient Text'}
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
