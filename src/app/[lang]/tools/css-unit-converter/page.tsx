'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type CSSUnit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%' | 'pt' | 'cm' | 'mm' | 'in';

export default function CssUnitConverter() {
  const { dict } = useLang();
  const t = dict.tools['css-unit-converter'];

  const [inputValue, setInputValue] = useState(16);
  const [inputUnit, setInputUnit] = useState<CSSUnit>('px');
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [viewportHeight, setViewportHeight] = useState(768);

  const units: CSSUnit[] = ['px', 'rem', 'em', 'vw', 'vh', '%', 'pt', 'cm', 'mm', 'in'];

  // Conversion factors to pixels
  const toPx = (value: number, unit: CSSUnit, fontSize: number = baseFontSize): number => {
    switch (unit) {
      case 'px': return value;
      case 'rem': return value * baseFontSize;
      case 'em': return value * fontSize;
      case 'vw': return (value * viewportWidth) / 100;
      case 'vh': return (value * viewportHeight) / 100;
      case '%': return (value * baseFontSize) / 100; // Simplified: % of font-size
      case 'pt': return value * 1.333333; // 1pt = 4/3 px
      case 'cm': return value * 37.7952755906; // 1cm = 37.79px
      case 'mm': return value * 3.77952755906; // 1mm = 3.78px
      case 'in': return value * 96; // 1in = 96px
      default: return value;
    }
  };

  const fromPx = (px: number, unit: CSSUnit, fontSize: number = baseFontSize): number => {
    switch (unit) {
      case 'px': return px;
      case 'rem': return px / baseFontSize;
      case 'em': return px / fontSize;
      case 'vw': return (px * 100) / viewportWidth;
      case 'vh': return (px * 100) / viewportHeight;
      case '%': return (px * 100) / baseFontSize;
      case 'pt': return px / 1.333333;
      case 'cm': return px / 37.7952755906;
      case 'mm': return px / 3.77952755906;
      case 'in': return px / 96;
      default: return px;
    }
  };

  // Convert input to px, then to all other units
  const pxValue = toPx(inputValue, inputUnit, baseFontSize);
  const conversions = units.map(unit => ({
    unit,
    value: fromPx(pxValue, unit, baseFontSize),
  }));

  // Common preset conversions
  const presets = [
    { name: 'Extra Small (8px)', value: 8, unit: 'px' as CSSUnit },
    { name: 'Small (12px)', value: 12, unit: 'px' as CSSUnit },
    { name: 'Base (16px)', value: 16, unit: 'px' as CSSUnit },
    { name: 'Large (20px)', value: 20, unit: 'px' as CSSUnit },
    { name: 'XL (24px)', value: 24, unit: 'px' as CSSUnit },
    { name: '1rem', value: 1, unit: 'rem' as CSSUnit },
    { name: '1.5rem', value: 1.5, unit: 'rem' as CSSUnit },
    { name: '100%', value: 100, unit: '%' as CSSUnit },
    { name: '50vw', value: 50, unit: 'vw' as CSSUnit },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setInputValue(preset.value);
    setInputUnit(preset.unit);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-unit-converter"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Controls Section */}
        <div>
          {/* Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.inputLabel || 'Input Value'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                value={inputValue}
                onChange={e => setInputValue(parseFloat(e.target.value) || 0)}
                style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', fontSize: 14 }}
                placeholder="Enter value"
              />
              <select
                value={inputUnit}
                onChange={e => setInputUnit(e.target.value as CSSUnit)}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border-color)', fontSize: 14, minWidth: 80 }}
              >
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Base Font Size */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>
              {t.baseFontSizeLabel || 'Base Font Size'}: {baseFontSize}px
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={baseFontSize}
              onChange={e => setBaseFontSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {t.baseFontSizeHelp || 'Used for rem, em, and % calculations'}
            </p>
          </div>

          {/* Viewport Dimensions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.viewportWidthLabel || 'Viewport Width'}: {viewportWidth}px
              </label>
              <input
                type="range"
                min="320"
                max="1920"
                value={viewportWidth}
                onChange={e => setViewportWidth(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.viewportHeightLabel || 'Viewport Height'}: {viewportHeight}px
              </label>
              <input
                type="range"
                min="480"
                max="1440"
                value={viewportHeight}
                onChange={e => setViewportHeight(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.presetsLabel || 'Quick Presets'}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {presets.map(preset => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="btn btn-secondary"
                  style={{ fontSize: 11, padding: '6px 10px', textAlign: 'center' }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conversions Table */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>
            {t.conversionsLabel || 'Conversions'}
          </label>
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <th style={{ padding: 12, textAlign: 'left', fontSize: 12, fontWeight: 600 }}>{t.unitLabel || 'Unit'}</th>
                  <th style={{ padding: 12, textAlign: 'right', fontSize: 12, fontWeight: 600 }}>{t.valueLabel || 'Value'}</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map(({ unit, value }) => (
                  <tr key={unit} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 12, fontSize: 13, fontWeight: 500 }}>{unit}</td>
                    <td style={{ padding: 12, textAlign: 'right', fontSize: 13, fontFamily: 'monospace' }}>
                      {value.toFixed(4).replace(/\.?0+$/, '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Copy All Button */}
          <div style={{ marginTop: 12 }}>
            <CopyButton
              text={conversions.map(c => `${c.unit}: ${c.value.toFixed(4).replace(/\.?0+$/, '')}`).join('\n')}
              label={t.copyAllLabel || 'Copy All Conversions'}
            />
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.referenceTableTitle || 'Common CSS Unit Conversions'}</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{t.unitLabel || 'Unit'}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{t.descriptionLabel || 'Description'}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{t.exampleLabel || 'Example'}</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>px</td>
                <td style={{ padding: '8px 12px' }}>Pixels (absolute)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>16px</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>rem</td>
                <td style={{ padding: '8px 12px' }}>Root em (relative to html font-size)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>1rem = 16px (default)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>em</td>
                <td style={{ padding: '8px 12px' }}>Relative to parent element font-size</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>1em = parent font-size</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>vw</td>
                <td style={{ padding: '8px 12px' }}>Viewport width (1vw = 1% of viewport width)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>50vw = half screen width</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>vh</td>
                <td style={{ padding: '8px 12px' }}>Viewport height (1vh = 1% of viewport height)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>100vh = full screen height</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>%</td>
                <td style={{ padding: '8px 12px' }}>Relative to parent element</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>50% = half parent width</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>pt</td>
                <td style={{ padding: '8px 12px' }}>Points (typography, 1pt = 1.333px)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>12pt</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 500 }}>cm/mm/in</td>
                <td style={{ padding: '8px 12px' }}>Physical units (rarely used in web)</td>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12 }}>2.54cm = 1in = 96px</td>
              </tr>
            </tbody>
          </table>
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
