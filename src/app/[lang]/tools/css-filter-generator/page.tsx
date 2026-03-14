'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface FilterState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

const presets: Record<string, FilterState> = {
  original: { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0 },
  grayscale: { blur: 0, brightness: 100, contrast: 100, grayscale: 100, hueRotate: 0, invert: 0, opacity: 100, saturate: 0, sepia: 0 },
  vintage: { blur: 0, brightness: 110, contrast: 90, grayscale: 30, hueRotate: -15, invert: 0, opacity: 100, saturate: 70, sepia: 30 },
  darkened: { blur: 0, brightness: 70, contrast: 110, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 100, sepia: 0 },
  inverted: { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, invert: 100, opacity: 100, saturate: 100, sepia: 0 },
  vivid: { blur: 0, brightness: 110, contrast: 130, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 150, sepia: 0 },
  cool: { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: -30, invert: 0, opacity: 100, saturate: 80, sepia: 0 },
  warm: { blur: 0, brightness: 105, contrast: 100, grayscale: 0, hueRotate: 15, invert: 0, opacity: 100, saturate: 120, sepia: 20 },
};

export default function CssFilterGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-filter-generator'];
  const [filters, setFilters] = useState<FilterState>(presets.original);

  const updateFilter = (key: keyof FilterState, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getFilterCSS = (): string => {
    const parts = [
      `blur(${filters.blur}px)`,
      `brightness(${filters.brightness}%)`,
      `contrast(${filters.contrast}%)`,
      `grayscale(${filters.grayscale}%)`,
      `hue-rotate(${filters.hueRotate}deg)`,
      `invert(${filters.invert}%)`,
      `opacity(${filters.opacity}%)`,
      `saturate(${filters.saturate}%)`,
      `sepia(${filters.sepia}%)`,
    ];
    return parts.join(' ');
  };

  const cssCode = `filter: ${getFilterCSS()};`;
  const sampleImageUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2366c2ff" width="400" height="300"/%3E%3Ccircle cx="100" cy="100" r="50" fill="%23ff6b6b"/%3E%3Crect x="200" y="50" width="100" height="100" fill="%2351cf66"/%3E%3Cpolygon points="200,250 300,200 300,300" fill="%23ffa500"/%3E%3C/svg%3E';

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-filter-generator"
    >
      {/* Preset Buttons */}
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{t.presetsLabel || 'Presets'}</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.keys(presets).map(preset => (
            <button
              key={preset}
              onClick={() => setFilters(presets[preset])}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            >
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Controls */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{t.controlsLabel || 'Filter Controls'}</h3>
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {value}{key === 'blur' ? 'px' : key === 'hueRotate' ? 'deg' : '%'}
                </span>
              </div>
              <input
                type="range"
                min={key === 'blur' ? 0 : key === 'hueRotate' ? -360 : 0}
                max={key === 'blur' ? 50 : key === 'hueRotate' ? 360 : 200}
                value={value}
                onChange={e => updateFilter(key as keyof FilterState, parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          ))}

          {/* Reset Button */}
          <button
            onClick={() => setFilters(presets.original)}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: 16,
              borderRadius: 6,
              border: 'none',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {dict.common.reset || 'Reset'}
          </button>
        </div>

        {/* Preview */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{t.previewLabel || 'Live Preview'}</h3>
          <img
            src={sampleImageUrl}
            alt="Preview"
            style={{
              width: '100%',
              borderRadius: 8,
              filter: getFilterCSS(),
              marginBottom: 16,
            }}
          />
          <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 6, fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all', color: 'var(--text-secondary)' }}>
            {cssCode}
            <CopyButton text={cssCode} />
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'CSS Filter Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Create stunning visual effects with CSS filters. Adjust blur, brightness, contrast, saturation, and more with live preview. Perfect for web designers and developers.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || '9 CSS filter properties with interactive sliders'}</li>
          <li>{t.seoFeature2 || 'Pre-defined filter presets (grayscale, vintage, vivid, etc.)'}</li>
          <li>{t.seoFeature3 || 'Live preview of your changes'}</li>
          <li>{t.seoFeature4 || 'Copy CSS code with one click'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
