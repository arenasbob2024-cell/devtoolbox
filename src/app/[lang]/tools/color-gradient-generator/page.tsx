'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ColorStop {
  color: string;
  position: number;
}

interface GradientSettings {
  type: 'linear' | 'radial' | 'conic';
  angle: number;
  shape: 'circle' | 'ellipse';
  stops: ColorStop[];
}

function generateGradientCSS(settings: GradientSettings): string {
  const stops = settings.stops
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(', ');

  if (settings.type === 'linear') {
    return `background: linear-gradient(${settings.angle}deg, ${stops});`;
  } else if (settings.type === 'radial') {
    return `background: radial-gradient(${settings.shape}, ${stops});`;
  } else {
    return `background: conic-gradient(from ${settings.angle}deg, ${stops});`;
  }
}

export default function ColorGradientGenerator() {
  const { dict } = useLang();
  const t = dict.tools['color-gradient-generator'];

  const [settings, setSettings] = useState<GradientSettings>({
    type: 'linear',
    angle: 45,
    shape: 'circle',
    stops: [
      { color: '#ff6b6b', position: 0 },
      { color: '#4ecdc4', position: 100 },
    ],
  });

  const presets = [
    {
      name: 'Sunset',
      settings: {
        type: 'linear' as const,
        angle: 135,
        shape: 'circle' as const,
        stops: [
          { color: '#ff6b6b', position: 0 },
          { color: '#ffd93d', position: 50 },
          { color: '#6bcf7f', position: 100 },
        ],
      },
    },
    {
      name: 'Ocean',
      settings: {
        type: 'linear' as const,
        angle: 90,
        shape: 'circle' as const,
        stops: [
          { color: '#001f3f', position: 0 },
          { color: '#0074d9', position: 50 },
          { color: '#7fdbca', position: 100 },
        ],
      },
    },
    {
      name: 'Purple Haze',
      settings: {
        type: 'radial' as const,
        angle: 0,
        shape: 'circle' as const,
        stops: [
          { color: '#ff00ff', position: 0 },
          { color: '#4b0082', position: 100 },
        ],
      },
    },
    {
      name: 'Forest',
      settings: {
        type: 'linear' as const,
        angle: 180,
        shape: 'circle' as const,
        stops: [
          { color: '#2d5016', position: 0 },
          { color: '#6fa86f', position: 50 },
          { color: '#a4d65e', position: 100 },
        ],
      },
    },
  ];

  const addStop = () => {
    const newPosition = settings.stops.length > 0
      ? Math.min(100, Math.max(0, settings.stops[settings.stops.length - 1].position + 50))
      : 50;
    setSettings({
      ...settings,
      stops: [...settings.stops, { color: '#ffffff', position: newPosition }],
    });
  };

  const removeStop = (idx: number) => {
    if (settings.stops.length > 2) {
      setSettings({
        ...settings,
        stops: settings.stops.filter((_, i) => i !== idx),
      });
    }
  };

  const updateStop = (idx: number, color: string, position: number) => {
    const newStops = [...settings.stops];
    newStops[idx] = { color, position };
    setSettings({
      ...settings,
      stops: newStops,
    });
  };

  const css = generateGradientCSS(settings);
  const gradientValue = `linear-gradient(${settings.type === 'linear' ? settings.angle + 'deg, ' : ''}${settings.stops.map((s) => s.color + ' ' + s.position + '%').join(', ')})`;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="color-gradient-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Gradient Type</label>
          <select
            value={settings.type}
            onChange={(e) => setSettings({ ...settings, type: e.target.value as 'linear' | 'radial' | 'conic' })}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>

          {settings.type === 'linear' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Angle: {settings.angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={settings.angle}
                onChange={(e) => setSettings({ ...settings, angle: parseInt(e.target.value) })}
                style={{ width: '100%' }}
              />
            </div>
          )}

          {settings.type === 'radial' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Shape</label>
              <select
                value={settings.shape}
                onChange={(e) => setSettings({ ...settings, shape: e.target.value as 'circle' | 'ellipse' })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <option value="circle">Circle</option>
                <option value="ellipse">Ellipse</option>
              </select>
            </div>
          )}

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Color Stops</label>
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '12px' }}>
            {settings.stops.map((stop, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(idx, e.target.value, stop.position)}
                  style={{
                    width: '100%',
                    height: '40px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stop.position}
                    onChange={(e) => updateStop(idx, stop.color, parseInt(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ minWidth: '35px', fontSize: '12px', fontWeight: '500' }}>{stop.position}%</span>
                </div>
                <button
                  onClick={() => removeStop(idx)}
                  disabled={settings.stops.length <= 2}
                  className="btn btn-secondary"
                  style={{ fontSize: '12px', padding: '4px 8px', opacity: settings.stops.length <= 2 ? 0.5 : 1 }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button onClick={addStop} className="btn btn-primary" style={{ marginBottom: '16px', width: '100%' }}>
            Add Stop
          </button>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Presets</label>
          <div style={{ display: 'grid', gap: '8px' }}>
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSettings(preset.settings)}
                className="btn btn-secondary"
                style={{ textAlign: 'left' }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Preview</label>
          <div
            style={{
              width: '100%',
              height: '300px',
              borderRadius: '8px',
              marginBottom: '16px',
              border: '1px solid #ddd',
              background: gradientValue,
            }}
          />

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>CSS Code</label>
          <textarea
            value={css}
            readOnly
            style={{
              width: '100%',
              height: '100px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
              marginBottom: '12px',
            }}
          />
          <CopyButton text={css} label="Copy CSS" />
        </div>
      </div>

      <div style={{ marginTop: '32px', color: '#666', lineHeight: '1.6' }}>
        <h3>{t.featuresTitle || 'Features'}</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Multiple gradient types: linear, radial, conic</li>
          <li>Visual color picker for each stop</li>
          <li>Adjustable gradient angle and shape</li>
          <li>Add/remove color stops dynamically</li>
          <li>Live gradient preview</li>
          <li>CSS output with vendor prefixes</li>
          <li>Preset gradients for quick inspiration</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
