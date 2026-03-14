'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ColorStop {
  color: string;
  position: number;
}

export default function ColorGradientGenerator() {
  const { dict } = useLang();
  const t = dict.tools['color-gradient-generator'];
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState(45);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#FF6B6B', position: 0 },
    { color: '#4ECDC4', position: 100 },
  ]);
  const [shape, setShape] = useState<'circle' | 'ellipse'>('circle');
  const [preset, setPreset] = useState('custom');

  const presets: Record<string, ColorStop[]> = {
    custom: colorStops,
    sunset: [
      { color: '#FF6B6B', position: 0 },
      { color: '#FFA06B', position: 50 },
      { color: '#FFD66B', position: 100 },
    ],
    ocean: [
      { color: '#0066CC', position: 0 },
      { color: '#00CCFF', position: 100 },
    ],
    forest: [
      { color: '#1A4D2E', position: 0 },
      { color: '#2D6A4F', position: 50 },
      { color: '#A7C957', position: 100 },
    ],
    purple: [
      { color: '#9D4EDD', position: 0 },
      { color: '#E0AAFF', position: 100 },
    ],
    fire: [
      { color: '#FF0000', position: 0 },
      { color: '#FF7F00', position: 50 },
      { color: '#FFFF00', position: 100 },
    ],
    cool: [
      { color: '#00D4FF', position: 0 },
      { color: '#0099FF', position: 100 },
    ],
    warm: [
      { color: '#FFB347', position: 0 },
      { color: '#FF8C00', position: 100 },
    ],
  };

  const applyPreset = (presetName: string) => {
    setPreset(presetName);
    if (presetName !== 'custom' && presets[presetName]) {
      setColorStops(presets[presetName]);
    }
  };

  const generateCss = (): string => {
    const colorString = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${colorString});`;
    } else if (gradientType === 'radial') {
      return `background: radial-gradient(${shape}, ${colorString});`;
    } else {
      return `background: conic-gradient(${colorString});`;
    }
  };

  const updateColorStop = (index: number, color: string, position: number) => {
    const newStops = [...colorStops];
    newStops[index] = { color, position };
    setColorStops(newStops);
    setPreset('custom');
  };

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 ? 50 : 0;
    setColorStops([...colorStops, { color: '#000000', position: newPosition }]);
    setPreset('custom');
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index));
      setPreset('custom');
    }
  };

  const gradientStyle = {
    width: '100%',
    height: 250,
    borderRadius: 8,
    background: generateCss().replace('background: ', ''),
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="color-gradient-generator"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setColorStops([{ color: '#FF6B6B', position: 0 }, { color: '#4ECDC4', position: 100 }])} className="btn btn-secondary">{dict.common.reset}</button>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Preview</label>
        <div style={gradientStyle} />
      </div>

      {/* Gradient Type */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        {(['linear', 'radial', 'conic'] as const).map(type => (
          <button
            key={type}
            onClick={() => setGradientType(type)}
            style={{
              padding: '8px 12px',
              border: `2px solid ${gradientType === type ? 'var(--accent-blue)' : 'var(--border-color)'}`,
              background: gradientType === type ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Gradient Options */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Options</h3>

        {gradientType === 'linear' && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: 'block' }}>Angle: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        )}

        {gradientType === 'radial' && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: 'block' }}>Shape</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['circle', 'ellipse'] as const).map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input
                    type="radio"
                    checked={shape === s}
                    onChange={() => setShape(s)}
                  />
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Presets */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>Presets</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {Object.keys(presets).map(presetName => (
            <button
              key={presetName}
              onClick={() => applyPreset(presetName)}
              style={{
                padding: '8px 12px',
                border: `2px solid ${preset === presetName ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                background: preset === presetName ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: 12,
                textTransform: 'capitalize',
              }}
            >
              {presetName}
            </button>
          ))}
        </div>
      </div>

      {/* Color Stops */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>Color Stops</h3>
          <button onClick={addColorStop} className="btn btn-sm">{dict.common.add}</button>
        </div>

        {colorStops.map((stop, index) => (
          <div key={index} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
            <input
              type="color"
              value={stop.color}
              onChange={e => updateColorStop(index, e.target.value, stop.position)}
              style={{ width: 60, height: 40, borderRadius: 6, border: 'none', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Position: {stop.position}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={stop.position}
                onChange={e => updateColorStop(index, stop.color, Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <input
              type="text"
              value={stop.color}
              onChange={e => updateColorStop(index, e.target.value, stop.position)}
              style={{ width: 100, fontSize: 12 }}
            />
            <button
              onClick={() => removeColorStop(index)}
              disabled={colorStops.length <= 2}
              className="btn btn-sm"
              style={{ opacity: colorStops.length <= 2 ? 0.5 : 1 }}
            >
              {dict.common.remove}
            </button>
          </div>
        ))}
      </div>

      {/* CSS Output */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>CSS Code</label>
        <textarea
          value={generateCss()}
          readOnly
          style={{ minHeight: 80, fontFamily: 'monospace', fontSize: 12 }}
        />
        <CopyButton text={generateCss()} />
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
