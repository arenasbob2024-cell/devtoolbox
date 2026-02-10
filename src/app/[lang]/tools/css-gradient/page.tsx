'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ColorStop {
  color: string;
  id: number;
}

const PRESETS: { name: string; angle: number; colors: string[] }[] = [
  { name: 'Sunset', angle: 135, colors: ['#f97316', '#ec4899'] },
  { name: 'Ocean', angle: 135, colors: ['#06b6d4', '#3b82f6'] },
  { name: 'Forest', angle: 135, colors: ['#22c55e', '#14b8a6'] },
  { name: 'Purple Haze', angle: 135, colors: ['#8b5cf6', '#ec4899'] },
  { name: 'Night Sky', angle: 135, colors: ['#1e3a5f', '#0f172a', '#312e81'] },
  { name: 'Peach', angle: 90, colors: ['#fbbf24', '#f97316', '#ef4444'] },
];

let nextId = 3;

export default function CssGradientGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-gradient'];

  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#3b82f6', id: 1 },
    { color: '#8b5cf6', id: 2 },
  ]);

  const gradientCSS = useMemo(() => {
    const colors = colorStops.map(s => s.color).join(', ');
    return `linear-gradient(${angle}deg, ${colors})`;
  }, [angle, colorStops]);

  const fullCSS = `background: ${gradientCSS};`;

  const updateColor = (id: number, color: string) => {
    setColorStops(prev => prev.map(s => s.id === id ? { ...s, color } : s));
  };

  const removeColor = (id: number) => {
    if (colorStops.length <= 2) return;
    setColorStops(prev => prev.filter(s => s.id !== id));
  };

  const addColor = () => {
    if (colorStops.length >= 4) return;
    setColorStops(prev => [...prev, { color: '#10b981', id: nextId++ }]);
  };

  const loadPreset = (preset: typeof PRESETS[number]) => {
    setAngle(preset.angle);
    setColorStops(preset.colors.map(color => ({ color, id: nextId++ })));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-gradient"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Angle Control */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Angle</label>
              <span style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 700 }}>{angle}deg</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
            />
          </div>

          {/* Color Stops */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
              Color Stops
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {colorStops.map((stop, index) => (
                <div key={stop.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'var(--bg-input)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  border: '1px solid var(--border-color)',
                }}>
                  <input
                    type="color"
                    value={stop.color}
                    onChange={e => updateColor(stop.id, e.target.value)}
                    style={{
                      width: 36,
                      height: 36,
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: 6,
                      padding: 0,
                      background: 'none',
                    }}
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={e => updateColor(stop.id, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '6px 10px',
                      fontSize: 13,
                      fontFamily: 'monospace',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 6,
                      color: 'var(--text-primary)',
                    }}
                  />
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', minWidth: 16 }}>#{index + 1}</span>
                  {colorStops.length > 2 && (
                    <button
                      onClick={() => removeColor(stop.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 18,
                        color: 'var(--text-secondary)',
                        padding: '0 4px',
                        lineHeight: 1,
                      }}
                      title="Remove color"
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
            </div>
            {colorStops.length < 4 && (
              <button
                onClick={addColor}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: 8, fontSize: 13 }}
              >
                + Add Color Stop
              </button>
            )}
          </div>

          {/* Presets */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
              Presets
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
            }}>
              {PRESETS.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => loadPreset(preset)}
                  style={{
                    padding: 0,
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    background: 'none',
                  }}
                >
                  <div style={{
                    height: 32,
                    background: `linear-gradient(${preset.angle}deg, ${preset.colors.join(', ')})`,
                    borderRadius: '7px 7px 0 0',
                  }} />
                  <div style={{
                    padding: '4px 6px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-input)',
                    textAlign: 'center',
                  }}>
                    {preset.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview & Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Preview */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
              Preview
            </label>
            <div style={{
              width: '100%',
              height: 220,
              borderRadius: 12,
              background: gradientCSS,
              border: '1px solid var(--border-color)',
            }} />
          </div>

          {/* CSS Output */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>CSS Code</label>
              <CopyButton text={fullCSS} label="Copy CSS" />
            </div>
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '14px 16px',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              wordBreak: 'break-all',
            }}>
              <code>{fullCSS}</code>
            </div>
          </div>

          {/* Full snippet with vendor prefix */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Full Snippet</label>
              <CopyButton
                text={`background: ${gradientCSS};\n-webkit-background: ${gradientCSS};\n-moz-background: ${gradientCSS};`}
                label="Copy All"
              />
            </div>
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '14px 16px',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: 12,
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-wrap',
            }}>
              {`background: ${gradientCSS};\n-webkit-background: ${gradientCSS};\n-moz-background: ${gradientCSS};`}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
