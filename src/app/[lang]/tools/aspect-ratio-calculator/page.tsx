'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }

export default function AspectRatioCalculator() {
  const { dict } = useLang();
  const t = (dict.tools as any)['aspect-ratio-calculator'];
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [w2, setW2] = useState('');
  const [h2, setH2] = useState('');

  const g = gcd(w1, h1);
  const ratioW = w1 / g;
  const ratioH = h1 / g;

  const calcMissing = (type: 'w' | 'h') => {
    const ratio = w1 / h1;
    if (type === 'w' && h2) setW2(String(Math.round(Number(h2) * ratio)));
    if (type === 'h' && w2) setH2(String(Math.round(Number(w2) / ratio)));
  };

  const presets = [
    { label: '16:9 (HD)', w: 1920, h: 1080 },
    { label: '4:3 (Standard)', w: 1024, h: 768 },
    { label: '1:1 (Square)', w: 1080, h: 1080 },
    { label: '21:9 (Ultrawide)', w: 2560, h: 1080 },
    { label: '9:16 (Mobile)', w: 1080, h: 1920 },
    { label: '3:2 (Photo)', w: 1500, h: 1000 },
  ];

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="aspect-ratio-calculator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Original Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Width</label>
              <input type="number" value={w1} onChange={e => setW1(Number(e.target.value) || 1)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Height</label>
              <input type="number" value={h1} onChange={e => setH1(Number(e.target.value) || 1)} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div style={{ padding: 12, background: 'rgba(59,130,246,0.1)', borderRadius: 8, textAlign: 'center', fontSize: 20, fontWeight: 700, color: 'var(--accent-blue)' }}>
            {ratioW}:{ratioH}
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Aspect Ratio</div>

          <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Calculate New Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>New Width</label>
              <input type="number" value={w2} onChange={e => setW2(e.target.value)} placeholder="?" style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
            <div style={{ display: 'flex', gap: 4, paddingBottom: 4 }}>
              <button onClick={() => calcMissing('w')} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 8px' }}>W←</button>
              <button onClick={() => calcMissing('h')} className="btn btn-secondary" style={{ fontSize: 11, padding: '6px 8px' }}>→H</button>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>New Height</label>
              <input type="number" value={h2} onChange={e => setH2(e.target.value)} placeholder="?" style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Common Presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {presets.map(p => (
              <button key={p.label} onClick={() => { setW1(p.w); setH1(p.h); }} style={{ padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{p.w} × {p.h}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 20, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Visual Preview</div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 150 }}>
            <div style={{
              width: Math.min(200, 200 * (w1 / Math.max(w1, h1))),
              height: Math.min(200, 200 * (h1 / Math.max(w1, h1))),
              border: '2px solid var(--accent-blue)',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(59,130,246,0.05)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>{ratioW}:{ratioH}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
