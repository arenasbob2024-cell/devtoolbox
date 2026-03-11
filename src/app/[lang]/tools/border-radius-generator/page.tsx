'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function BorderRadiusGenerator() {
  const { dict } = useLang();
  const t = dict.tools['border-radius-generator'];
  const [topLeft, setTopLeft] = useState(20);
  const [topRight, setTopRight] = useState(20);
  const [bottomRight, setBottomRight] = useState(20);
  const [bottomLeft, setBottomLeft] = useState(20);
  const [linked, setLinked] = useState(true);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [bgColor, setBgColor] = useState('#3b82f6');
  const [borderColor, setBorderColor] = useState('#1e40af');
  const [borderWidth, setBorderWidth] = useState(2);
  const [boxSize, setBoxSize] = useState(200);

  const updateRadius = (corner: string, value: number) => {
    if (linked) {
      setTopLeft(value);
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    } else {
      switch (corner) {
        case 'tl': setTopLeft(value); break;
        case 'tr': setTopRight(value); break;
        case 'br': setBottomRight(value); break;
        case 'bl': setBottomLeft(value); break;
      }
    }
  };

  const borderRadius = `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
  const cssCode = `border-radius: ${borderRadius};`;
  const fullCss = `border-radius: ${borderRadius};\nborder: ${borderWidth}px solid ${borderColor};\nbackground-color: ${bgColor};`;

  const presets = [
    { name: 'Rounded', values: [8, 8, 8, 8] },
    { name: 'Pill', values: [50, 50, 50, 50], unit: '%' as const },
    { name: 'Circle', values: [50, 50, 50, 50], unit: '%' as const },
    { name: 'Leaf', values: [0, 50, 0, 50], unit: '%' as const },
    { name: 'Drop', values: [50, 50, 50, 0], unit: '%' as const },
    { name: 'Ticket', values: [20, 20, 0, 0] },
    { name: 'Dialog', values: [16, 16, 16, 4] },
    { name: 'Blob', values: [30, 70, 70, 30], unit: '%' as const },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setTopLeft(preset.values[0]);
    setTopRight(preset.values[1]);
    setBottomRight(preset.values[2]);
    setBottomLeft(preset.values[3]);
    if (preset.unit) setUnit(preset.unit);
    else setUnit('px');
    setLinked(false);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="border-radius-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Controls */}
        <div>
          {/* Link toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <button
              onClick={() => setLinked(!linked)}
              className={`btn ${linked ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: 12 }}
            >
              {linked ? '🔗 Linked' : '🔓 Independent'}
            </button>
            <select value={unit} onChange={e => setUnit(e.target.value as 'px' | '%')} style={{ width: 60 }}>
              <option value="px">px</option>
              <option value="%">%</option>
            </select>
          </div>

          {/* Sliders */}
          {[
            { label: t.topLeftLabel || 'Top Left', value: topLeft, corner: 'tl', setter: setTopLeft },
            { label: t.topRightLabel || 'Top Right', value: topRight, corner: 'tr', setter: setTopRight },
            { label: t.bottomRightLabel || 'Bottom Right', value: bottomRight, corner: 'br', setter: setBottomRight },
            { label: t.bottomLeftLabel || 'Bottom Left', value: bottomLeft, corner: 'bl', setter: setBottomLeft },
          ].map(({ label, value, corner }) => (
            <div key={corner} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <label style={{ fontWeight: 600 }}>{label}</label>
                <span>{value}{unit}</span>
              </div>
              <input
                type="range"
                min="0"
                max={unit === '%' ? 50 : 100}
                value={value}
                onChange={e => updateRadius(corner, parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          ))}

          {/* Colors & Border */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.bgColorLabel || 'Background'}</label>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
                <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ flex: 1, fontSize: 12 }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.borderColorLabel || 'Border'}</label>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} />
                <input type="text" value={borderColor} onChange={e => setBorderColor(e.target.value)} style={{ flex: 1, fontSize: 12 }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Border Width: {borderWidth}px</label>
            <input type="range" min="0" max="10" value={borderWidth} onChange={e => setBorderWidth(parseInt(e.target.value))} style={{ width: '100%' }} />
          </div>

          {/* Presets */}
          <div style={{ marginTop: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.presetsLabel || 'Presets'}</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {presets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="btn btn-secondary"
                  style={{ fontSize: 11, padding: '4px 10px' }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: boxSize,
              height: boxSize,
              borderRadius: borderRadius,
              backgroundColor: bgColor,
              border: `${borderWidth}px solid ${borderColor}`,
              transition: 'all 0.2s ease',
            }}
          />
          <div style={{
            marginTop: 16,
            background: 'var(--bg-input)',
            borderRadius: 8,
            padding: 12,
            width: '100%',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>CSS</label>
              <CopyButton text={fullCss} />
            </div>
            <pre style={{ fontSize: 12, fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }}>
              {fullCss}
            </pre>
          </div>
        </div>
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
