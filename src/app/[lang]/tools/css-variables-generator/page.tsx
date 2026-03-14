'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface CSSVariables {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  spacing: string;
  borderRadius: string;
  shadowColor: string;
}

const PRESETS = {
  light: {
    primaryColor: '#3b82f6',
    secondaryColor: '#6b7280',
    accentColor: '#f59e0b',
    bgColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    fontSize: '16px',
    spacing: '8px',
    borderRadius: '8px',
    shadowColor: '0 1px 3px rgba(0,0,0,0.1)',
  },
  dark: {
    primaryColor: '#60a5fa',
    secondaryColor: '#9ca3af',
    accentColor: '#fbbf24',
    bgColor: '#1f2937',
    textColor: '#f3f4f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    fontSize: '16px',
    spacing: '8px',
    borderRadius: '8px',
    shadowColor: '0 1px 3px rgba(0,0,0,0.3)',
  },
  modern: {
    primaryColor: '#7c3aed',
    secondaryColor: '#ec4899',
    accentColor: '#06b6d4',
    bgColor: '#f8fafc',
    textColor: '#0f172a',
    fontFamily: '"Inter", "Helvetica Neue", sans-serif',
    fontSize: '15px',
    spacing: '12px',
    borderRadius: '12px',
    shadowColor: '0 4px 6px rgba(0,0,0,0.07)',
  },
  minimal: {
    primaryColor: '#000000',
    secondaryColor: '#666666',
    accentColor: '#cccccc',
    bgColor: '#ffffff',
    textColor: '#333333',
    fontFamily: '"Georgia", serif',
    fontSize: '17px',
    spacing: '10px',
    borderRadius: '4px',
    shadowColor: '0 2px 4px rgba(0,0,0,0.05)',
  },
};

export default function CSSVariablesGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-variables-generator'] as Record<string, unknown>;
  const common = dict.common;
  const [vars, setVars] = useState<CSSVariables>(PRESETS.light);

  const generateCSS = (): string => {
    const lines = [':root {'];
    lines.push(`  --primary-color: ${vars.primaryColor};`);
    lines.push(`  --secondary-color: ${vars.secondaryColor};`);
    lines.push(`  --accent-color: ${vars.accentColor};`);
    lines.push(`  --bg-color: ${vars.bgColor};`);
    lines.push(`  --text-color: ${vars.textColor};`);
    lines.push(`  --font-family: ${vars.fontFamily};`);
    lines.push(`  --font-size: ${vars.fontSize};`);
    lines.push(`  --spacing: ${vars.spacing};`);
    lines.push(`  --border-radius: ${vars.borderRadius};`);
    lines.push(`  --shadow: ${vars.shadowColor};`);
    lines.push('}');
    return lines.join('\n');
  };

  const cssOutput = generateCSS();

  const applyPreset = (preset: keyof typeof PRESETS) => {
    setVars(PRESETS[preset]);
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="css-variables-generator"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => applyPreset('light')} className="btn btn-secondary">Light</button>
        <button onClick={() => applyPreset('dark')} className="btn btn-secondary">Dark</button>
        <button onClick={() => applyPreset('modern')} className="btn btn-secondary">Modern</button>
        <button onClick={() => applyPreset('minimal')} className="btn btn-secondary">Minimal</button>
        <button onClick={() => { setVars(PRESETS.light); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Colors</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13, flex: 1 }}>Primary</label>
              <input
                type="color"
                value={vars.primaryColor}
                onChange={e => setVars({ ...vars, primaryColor: e.target.value })}
                style={{ width: 50, height: 40, cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13, flex: 1 }}>Secondary</label>
              <input
                type="color"
                value={vars.secondaryColor}
                onChange={e => setVars({ ...vars, secondaryColor: e.target.value })}
                style={{ width: 50, height: 40, cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13, flex: 1 }}>Accent</label>
              <input
                type="color"
                value={vars.accentColor}
                onChange={e => setVars({ ...vars, accentColor: e.target.value })}
                style={{ width: 50, height: 40, cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13, flex: 1 }}>Background</label>
              <input
                type="color"
                value={vars.bgColor}
                onChange={e => setVars({ ...vars, bgColor: e.target.value })}
                style={{ width: 50, height: 40, cursor: 'pointer' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <label style={{ fontSize: 13, flex: 1 }}>Text</label>
              <input
                type="color"
                value={vars.textColor}
                onChange={e => setVars({ ...vars, textColor: e.target.value })}
                style={{ width: 50, height: 40, cursor: 'pointer' }}
              />
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, marginTop: 20 }}>Typography</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Font Family</label>
              <input
                type="text"
                value={vars.fontFamily}
                onChange={e => setVars({ ...vars, fontFamily: e.target.value })}
                placeholder="Font family"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Font Size</label>
              <input
                type="text"
                value={vars.fontSize}
                onChange={e => setVars({ ...vars, fontSize: e.target.value })}
                placeholder="16px"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, marginTop: 20 }}>Spacing & Border</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Spacing</label>
              <input
                type="text"
                value={vars.spacing}
                onChange={e => setVars({ ...vars, spacing: e.target.value })}
                placeholder="8px"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Border Radius</label>
              <input
                type="text"
                value={vars.borderRadius}
                onChange={e => setVars({ ...vars, borderRadius: e.target.value })}
                placeholder="8px"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Shadow</label>
              <input
                type="text"
                value={vars.shadowColor}
                onChange={e => setVars({ ...vars, shadowColor: e.target.value })}
                placeholder="0 1px 3px rgba(0,0,0,0.1)"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>CSS Output</h3>
          <textarea
            value={cssOutput}
            readOnly
            style={{ minHeight: 350, background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: 13 }}
          />
          <CopyButton text={cssOutput} />

          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, marginTop: 20 }}>Preview</h3>
          <div style={{
            padding: 16,
            borderRadius: vars.borderRadius,
            background: vars.bgColor,
            color: vars.textColor,
            boxShadow: vars.shadowColor,
            border: `1px solid ${vars.secondaryColor}33`,
          }}>
            <p style={{ fontSize: 14, fontFamily: vars.fontFamily, marginBottom: 8 }}>
              Sample text with primary <span style={{ color: vars.primaryColor, fontWeight: 600 }}>color</span>, secondary <span style={{ color: vars.secondaryColor }}>accent</span>, and <span style={{ color: vars.accentColor }}>highlight</span>.
            </p>
            <button style={{
              background: vars.primaryColor,
              color: vars.bgColor,
              padding: '8px 16px',
              borderRadius: vars.borderRadius,
              border: 'none',
              cursor: 'pointer',
              fontFamily: vars.fontFamily,
              fontSize: vars.fontSize,
            }}>
              Sample Button
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
