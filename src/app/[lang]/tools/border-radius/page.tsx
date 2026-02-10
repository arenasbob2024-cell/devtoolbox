'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type OutputFormat = 'shorthand' | 'longhand' | 'individual';

const presets = [
  { label: 'Circle', values: [50, 50, 50, 50] as [number, number, number, number], unit: '%' as const },
  { label: 'Rounded', values: [20, 20, 20, 20] as [number, number, number, number], unit: 'px' as const },
  { label: 'Pill', values: [9999, 9999, 9999, 9999] as [number, number, number, number], unit: 'px' as const },
  { label: 'Blob', custom: '30% 70% 70% 30% / 30% 30% 70% 70%' },
];

export default function BorderRadiusGenerator() {
  const { dict } = useLang();
  const t = dict.tools['border-radius'];

  const [corners, setCorners] = useState<[number, number, number, number]>([12, 12, 12, 12]);
  const [linked, setLinked] = useState(true);
  const [unit, setUnit] = useState<'px' | '%' | 'em' | 'rem'>('px');
  const [format, setFormat] = useState<OutputFormat>('shorthand');
  const [bgColor, setBgColor] = useState('#3b82f6');
  const [customBlob, setCustomBlob] = useState<string | null>(null);

  const cornerLabels = ['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left'];

  const updateCorner = (index: number, value: number) => {
    if (customBlob) setCustomBlob(null);
    if (linked) {
      setCorners([value, value, value, value]);
    } else {
      const next = [...corners] as [number, number, number, number];
      next[index] = value;
      setCorners(next);
    }
  };

  const applyPreset = (preset: typeof presets[number]) => {
    if ('custom' in preset && preset.custom) {
      setCustomBlob(preset.custom);
    } else if ('values' in preset && preset.values) {
      setCustomBlob(null);
      setCorners(preset.values as [number, number, number, number]);
      setUnit(preset.unit as 'px' | 'rem' | 'em' | '%');
    }
  };

  const borderRadiusValue = customBlob
    ? customBlob
    : `${corners[0]}${unit} ${corners[1]}${unit} ${corners[2]}${unit} ${corners[3]}${unit}`;

  const generateCSS = (): string => {
    if (customBlob) {
      return `border-radius: ${customBlob};`;
    }
    const vals = corners.map(c => `${c}${unit}`);
    const allSame = corners.every(c => c === corners[0]);

    if (format === 'shorthand') {
      if (allSame) return `border-radius: ${vals[0]};`;
      if (corners[0] === corners[2] && corners[1] === corners[3])
        return `border-radius: ${vals[0]} ${vals[1]};`;
      return `border-radius: ${vals[0]} ${vals[1]} ${vals[2]} ${vals[3]};`;
    }
    if (format === 'longhand') {
      return [
        `border-top-left-radius: ${vals[0]};`,
        `border-top-right-radius: ${vals[1]};`,
        `border-bottom-right-radius: ${vals[2]};`,
        `border-bottom-left-radius: ${vals[3]};`,
      ].join('\n');
    }
    return [
      `border-top-left-radius: ${vals[0]};`,
      `border-top-right-radius: ${vals[1]};`,
      `border-bottom-right-radius: ${vals[2]};`,
      `border-bottom-left-radius: ${vals[3]};`,
    ].join('\n');
  };

  const cssOutput = generateCSS();
  const maxRange = unit === '%' ? 50 : unit === 'px' ? 100 : 10;

  const sliderTrackStyle = (value: number): React.CSSProperties => {
    const pct = (value / maxRange) * 100;
    return {
      width: '100%',
      height: 6,
      borderRadius: 3,
      appearance: 'none' as const,
      WebkitAppearance: 'none' as const,
      background: `linear-gradient(to right, var(--accent-blue) ${pct}%, var(--border-color) ${pct}%)`,
      outline: 'none',
      cursor: 'pointer',
    };
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="border-radius">
      {/* Presets */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="btn btn-secondary"
            style={{ fontSize: 12, padding: '6px 14px' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left: Controls */}
        <div>
          {/* Unit + Link Toggle */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>Unit:</label>
            <select
              value={unit}
              onChange={e => { setUnit(e.target.value as typeof unit); setCustomBlob(null); }}
              style={{
                padding: '4px 10px', fontSize: 12, background: 'var(--bg-input)',
                color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: 6,
              }}
            >
              {(['px', '%', 'em', 'rem'] as const).map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>

            <button
              onClick={() => setLinked(!linked)}
              style={{
                marginLeft: 'auto', padding: '5px 12px', fontSize: 12, borderRadius: 6,
                border: `1px solid ${linked ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                background: linked ? 'rgba(59,130,246,0.15)' : 'var(--bg-input)',
                color: linked ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
              }}
            >
              {linked ? 'Linked' : 'Unlinked'}
            </button>
          </div>

          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cornerLabels.map((label, i) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</label>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                    {customBlob ? '—' : `${corners[i]}${unit}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxRange}
                  value={customBlob ? 0 : corners[i]}
                  onChange={e => updateCorner(i, Number(e.target.value))}
                  disabled={!!customBlob}
                  style={sliderTrackStyle(customBlob ? 0 : corners[i])}
                />
              </div>
            ))}
          </div>

          {/* Output Format */}
          <div style={{ marginTop: 18 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: 8 }}>
              Copy Format:
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['shorthand', 'longhand', 'individual'] as OutputFormat[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  style={{
                    padding: '4px 12px', fontSize: 11, borderRadius: 6, cursor: 'pointer',
                    border: `1px solid ${format === f ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    background: format === f ? 'rgba(59,130,246,0.15)' : 'var(--bg-input)',
                    color: format === f ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontWeight: 600, textTransform: 'capitalize',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>Preview Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={e => setBgColor(e.target.value)}
              style={{
                width: 32, height: 32, border: '1px solid var(--border-color)',
                borderRadius: 6, cursor: 'pointer', padding: 2, background: 'var(--bg-input)',
              }}
            />
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{bgColor}</span>
          </div>
        </div>

        {/* Right: Preview + Code */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Preview */}
          <div style={{
            background: 'var(--bg-input)', border: '1px solid var(--border-color)',
            borderRadius: 10, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 260,
          }}>
            <div
              style={{
                width: 200, height: 200,
                borderRadius: customBlob ? customBlob : `${corners[0]}${unit} ${corners[1]}${unit} ${corners[2]}${unit} ${corners[3]}${unit}`,
                background: `linear-gradient(135deg, ${bgColor}, ${bgColor}88)`,
                border: '2px dashed var(--border-color)',
                transition: 'border-radius 0.3s ease',
              }}
            />
          </div>

          {/* CSS Output */}
          <div style={{
            background: 'var(--bg-input)', border: '1px solid var(--border-color)',
            borderRadius: 10, padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                CSS Output
              </span>
              <CopyButton text={cssOutput} />
            </div>
            <pre style={{
              margin: 0, padding: 12, background: 'var(--bg-card)', borderRadius: 8,
              fontSize: 13, fontFamily: 'monospace', color: 'var(--accent-blue)',
              lineHeight: 1.7, overflowX: 'auto', whiteSpace: 'pre-wrap',
            }}>
              {cssOutput}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
