'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export default function CssShadowGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-shadow-generator'];
  const [shadows, setShadows] = useState<Shadow[]>([
    { offsetX: 0, offsetY: 4, blur: 6, spread: 0, color: '#000000', inset: false },
  ]);
  const [shadowType, setShadowType] = useState<'box-shadow' | 'text-shadow'>('box-shadow');

  const presets = {
    'box-shadow': [
      { name: 'Subtle', shadows: [{ offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#00000020', inset: false }] },
      { name: 'Medium', shadows: [{ offsetX: 0, offsetY: 4, blur: 12, spread: 0, color: '#0000001a', inset: false }] },
      { name: 'Large', shadows: [{ offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: '#0000001a', inset: false }] },
      {
        name: 'Layered',
        shadows: [
          { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#0000001a', inset: false },
          { offsetX: 0, offsetY: 8, blur: 16, spread: 0, color: '#0000000d', inset: false },
        ],
      },
    ],
    'text-shadow': [
      { name: 'Subtle', shadows: [{ offsetX: 1, offsetY: 1, blur: 2, spread: 0, color: '#00000040', inset: false }] },
      { name: 'Bold', shadows: [{ offsetX: 2, offsetY: 2, blur: 4, spread: 0, color: '#000000', inset: false }] },
      { name: 'Glow', shadows: [{ offsetX: 0, offsetY: 0, blur: 10, spread: 0, color: '#ff6b6b', inset: false }] },
    ],
  };

  const updateShadow = (index: number, field: keyof Shadow, value: any) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], [field]: value };
    setShadows(newShadows);
  };

  const addShadow = () => {
    setShadows([
      ...shadows,
      { offsetX: 0, offsetY: 4, blur: 6, spread: 0, color: '#000000', inset: false },
    ]);
  };

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index));
    }
  };

  const generateShadowString = (): string => {
    return shadows
      .map((s) => {
        const parts = [
          `${s.offsetX}px`,
          `${s.offsetY}px`,
          `${s.blur}px`,
          shadowType === 'box-shadow' ? `${s.spread}px` : '',
          s.color,
          s.inset ? 'inset' : '',
        ];
        return parts.filter((p) => p !== '').join(' ');
      })
      .join(', ');
  };

  const shadowString = generateShadowString();

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-shadow-generator"
    >
      {/* Type Selector */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>Shadow Type:</label>
        <select
          value={shadowType}
          onChange={(e) => {
            setShadowType(e.target.value as 'box-shadow' | 'text-shadow');
            setShadows([
              { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#000000', inset: false },
            ]);
          }}
          style={{
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 13,
          }}
        >
          <option value="box-shadow">box-shadow</option>
          <option value="text-shadow">text-shadow</option>
        </select>
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Presets:</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {presets[shadowType].map((preset) => (
            <button
              key={preset.name}
              onClick={() => setShadows(preset.shadows)}
              className="btn btn-secondary"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shadow Controls */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 20 }}>
        {shadows.map((shadow, i) => (
          <div key={i} style={{ marginBottom: i < shadows.length - 1 ? 16 : 0, paddingBottom: i < shadows.length - 1 ? 16 : 0, borderBottom: i < shadows.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Shadow {i + 1}</span>
              {shadows.length > 1 && (
                <button
                  onClick={() => removeShadow(i)}
                  style={{
                    padding: '4px 8px',
                    fontSize: 12,
                    background: 'rgba(244, 63, 94, 0.1)',
                    color: 'var(--accent-rose)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>X Offset</label>
                <input
                  type="number"
                  value={shadow.offsetX}
                  onChange={(e) => updateShadow(i, 'offsetX', Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>Y Offset</label>
                <input
                  type="number"
                  value={shadow.offsetY}
                  onChange={(e) => updateShadow(i, 'offsetY', Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>Blur</label>
                <input
                  type="number"
                  value={shadow.blur}
                  onChange={(e) => updateShadow(i, 'blur', Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {shadowType === 'box-shadow' && (
                <div>
                  <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>Spread</label>
                  <input
                    type="number"
                    value={shadow.spread}
                    onChange={(e) => updateShadow(i, 'spread', Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      borderRadius: 4,
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: 12, marginBottom: 4, display: 'block' }}>Color</label>
                <input
                  type="color"
                  value={shadow.color}
                  onChange={(e) => updateShadow(i, 'color', e.target.value)}
                  style={{
                    width: '100%',
                    height: 36,
                    borderRadius: 4,
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {shadowType === 'box-shadow' && (
                <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="checkbox"
                    checked={shadow.inset}
                    onChange={(e) => updateShadow(i, 'inset', e.target.checked)}
                  />
                  Inset
                </label>
              )}
            </div>
          </div>
        ))}

        <button
          onClick={addShadow}
          className="btn btn-secondary"
          style={{ marginTop: 16 }}
        >
          + Add Shadow
        </button>
      </div>

      {/* Preview and Code */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Preview */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Preview</label>
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              padding: 40,
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {shadowType === 'box-shadow' ? (
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: 8,
                  boxShadow: shadowString,
                }}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    textShadow: shadowString,
                    color: 'var(--text-primary)',
                  }}
                >
                  Text Shadow
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CSS Code */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Code</label>
            <CopyButton text={`${shadowType}: ${shadowString};`} />
          </div>
          <textarea
            value={`${shadowType}: ${shadowString};`}
            readOnly
            style={{
              minHeight: 200,
              background: 'var(--bg-secondary)',
              borderRadius: 8,
              padding: 12,
              fontFamily: 'monospace',
              fontSize: 12,
              border: '1px solid var(--border-color)',
            }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About CSS Shadow Generator</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Create beautiful CSS box-shadow and text-shadow effects with our interactive generator. Customize multiple shadow layers with offset, blur, spread, and color controls.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Generate both box-shadow and text-shadow effects</li>
          <li>Support multiple shadow layers for complex effects</li>
          <li>Real-time preview with live updates</li>
          <li>8 professional preset shadow styles</li>
          <li>Full control over X/Y offset, blur, spread, and color</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
