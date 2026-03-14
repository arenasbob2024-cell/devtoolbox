'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function ColorContrastCheckerPage() {
  const { dict } = useLang();
  const t = dict.tools['color-contrast-checker'];
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [contrast, setContrast] = useState(21);
  const [passAANormal, setPassAANormal] = useState(true);
  const [passAALarge, setPassAALarge] = useState(true);
  const [passAAA, setPassAAA] = useState(true);
  const [passAAALarge, setPassAAALarge] = useState(true);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(x => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const checkContrast = useCallback(() => {
    const fgRgb = hexToRgb(fgColor);
    const bgRgb = hexToRgb(bgColor);
    
    const fgLum = getLuminance(fgRgb);
    const bgLum = getLuminance(bgRgb);
    
    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);
    
    const ratio = (lighter + 0.05) / (darker + 0.05);
    
    setContrast(parseFloat(ratio.toFixed(2)));
    setPassAANormal(ratio >= 4.5);
    setPassAALarge(ratio >= 3);
    setPassAAA(ratio >= 7);
    setPassAAALarge(ratio >= 4.5);
  }, [fgColor, bgColor]);

  const swapColors = useCallback(() => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  }, [fgColor, bgColor]);

  const loadSample = useCallback(() => {
    setFgColor('#FFFFFF');
    setBgColor('#0066CC');
    setTimeout(checkContrast, 0);
  }, [checkContrast]);

  return (
    <ToolLayout toolId="color-contrast-checker">
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              {t.fgColor || 'Foreground Color'}
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{
                  width: '60px',
                  height: '50px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              />
              <input
                type="text"
                value={fgColor.toUpperCase()}
                onChange={(e) => setFgColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.25rem',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              {t.bgColor || 'Background Color'}
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  width: '60px',
                  height: '50px',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              />
              <input
                type="text"
                value={bgColor.toUpperCase()}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.25rem',
                }}
              />
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: bgColor,
              color: fgColor,
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              border: '2px solid var(--border-color)',
            }}
          >
            {t.preview || 'Preview'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            onClick={checkContrast}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {t.checkBtn || 'Check Contrast'}
          </button>
          <button
            onClick={swapColors}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-purple)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.swap}
          </button>
          <button
            onClick={loadSample}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--accent-orange)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            {dict.common.loadSample}
          </button>
        </div>

        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '0.5rem',
          border: '1px solid var(--border-color)',
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>
              {contrast}:1
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              {t.contrastRatio || 'Contrast Ratio'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem',
              backgroundColor: passAANormal ? 'var(--success-bg)' : 'var(--error-bg)',
              color: passAANormal ? 'var(--success)' : 'var(--error)',
              borderRadius: '0.25rem'
            }}>
              <div style={{ fontWeight: '500' }}>{t.wcagAA || 'WCAG AA'}</div>
              <div style={{ fontSize: '0.9rem' }}>{t.normal || 'Normal text'}</div>
              <div style={{ marginTop: '0.25rem' }}>{passAANormal ? '✓ Pass (4.5:1)' : '✗ Fail'}</div>
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: passAALarge ? 'var(--success-bg)' : 'var(--error-bg)',
              color: passAALarge ? 'var(--success)' : 'var(--error)',
              borderRadius: '0.25rem'
            }}>
              <div style={{ fontWeight: '500' }}>{t.wcagAA || 'WCAG AA'}</div>
              <div style={{ fontSize: '0.9rem' }}>{t.largeText || 'Large text'}</div>
              <div style={{ marginTop: '0.25rem' }}>{passAALarge ? '✓ Pass (3:1)' : '✗ Fail'}</div>
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: passAAA ? 'var(--success-bg)' : 'var(--error-bg)',
              color: passAAA ? 'var(--success)' : 'var(--error)',
              borderRadius: '0.25rem'
            }}>
              <div style={{ fontWeight: '500' }}>{t.wcagAAA || 'WCAG AAA'}</div>
              <div style={{ fontSize: '0.9rem' }}>{t.normal || 'Normal text'}</div>
              <div style={{ marginTop: '0.25rem' }}>{passAAA ? '✓ Pass (7:1)' : '✗ Fail'}</div>
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: passAAALarge ? 'var(--success-bg)' : 'var(--error-bg)',
              color: passAAALarge ? 'var(--success)' : 'var(--error)',
              borderRadius: '0.25rem'
            }}>
              <div style={{ fontWeight: '500' }}>{t.wcagAAA || 'WCAG AAA'}</div>
              <div style={{ fontSize: '0.9rem' }}>{t.largeText || 'Large text'}</div>
              <div style={{ marginTop: '0.25rem' }}>{passAAALarge ? '✓ Pass (4.5:1)' : '✗ Fail'}</div>
            </div>
          </div>
        </div>
      </div>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoTitle || 'What is Color Contrast Checker?'}
        </h2>
        <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {t.seoContent || 'Check the color contrast ratio between foreground and background colors to ensure WCAG accessibility compliance. This tool calculates the luminance ratio and determines if your colors meet WCAG AA and AAA standards for both normal and large text.'}
        </p>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {t.seoFeaturesTitle || 'Features'}
        </h3>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
          <li>{t.seoFeature1 || 'Calculate contrast ratio between two colors'}</li>
          <li>{t.seoFeature2 || 'Check WCAG AA and AAA compliance'}</li>
          <li>{t.seoFeature3 || 'Real-time preview of color combinations'}</li>
          <li>{t.seoFeature4 || '100% client-side processing — your data never leaves your browser'}</li>
        </ul>
      </section>
    </ToolLayout>
  );
}
