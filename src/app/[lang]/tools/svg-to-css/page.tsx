'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function SvgToCss() {
  const { dict } = useLang();
  const t = dict.tools['svg-to-css'];
  const [svgInput, setSvgInput] = useState(
    `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" />
</svg>`
  );
  const [encodingType, setEncodingType] = useState<'url-encoded' | 'base64'>('url-encoded');
  const [cssFormat, setCssFormat] = useState<'background-image' | 'background' | 'mask-image'>('background-image');
  const [optimization, setOptimization] = useState(true);
  const [cssProperty, setCssProperty] = useState<'background-image' | 'background' | 'mask-image'>('background-image');

  const optimizeSvg = (svg: string): string => {
    if (!optimization) return svg;
    return svg
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const urlEncodeSvg = (svg: string): string => {
    return svg
      .replace(/"/g, "'") // Replace double quotes with single quotes
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const base64EncodeSvg = (svg: string): string => {
    return btoa(unescape(encodeURIComponent(svg)));
  };

  const generateCssCode = (): string => {
    const optimized = optimizeSvg(svgInput);
    let dataUri = '';

    if (encodingType === 'url-encoded') {
      dataUri = `url("data:image/svg+xml,${urlEncodeSvg(optimized)}")`;
    } else {
      const encoded = base64EncodeSvg(optimized);
      dataUri = `url("data:image/svg+xml;base64,${encoded}")`;
    }

    if (cssProperty === 'background') {
      return `background: ${dataUri} center/contain no-repeat;`;
    } else if (cssProperty === 'mask-image') {
      return `mask-image: ${dataUri};
mask-size: contain;
mask-repeat: no-repeat;
mask-position: center;`;
    } else {
      return `background-image: ${dataUri};`;
    }
  };

  const cssOutput = generateCssCode();

  const handleLoadSample = () => {
    setSvgInput(
      `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#1e40af" stroke-width="2" />
  <text x="50" y="55" text-anchor="middle" fill="white" font-size="24" font-weight="bold">●</text>
</svg>`
    );
  };

  const handleClear = () => {
    setSvgInput('');
  };

  // Generate optimized SVG for preview
  const optimizedSvg = optimizeSvg(svgInput);

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="svg-to-css"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left panel - Input and options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* SVG Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>{t.svgInputLabel || 'SVG Code'}</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={handleLoadSample}
                  className="btn btn-secondary"
                  style={{ fontSize: 12, padding: '4px 10px' }}
                >
                  {dict.common.loadSample}
                </button>
                <button
                  onClick={handleClear}
                  className="btn btn-secondary"
                  style={{ fontSize: 12, padding: '4px 10px' }}
                >
                  {dict.common.clear}
                </button>
              </div>
            </div>
            <textarea
              value={svgInput}
              onChange={e => setSvgInput(e.target.value)}
              placeholder={t.svgInputPlaceholder || 'Paste your SVG code here...'}
              style={{
                width: '100%',
                height: 250,
                padding: 12,
                fontFamily: 'monospace',
                fontSize: 12,
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Options */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
          }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.encodingLabel || 'Encoding Type'}
            </label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={encodingType === 'url-encoded'}
                  onChange={() => setEncodingType('url-encoded')}
                />
                {t.urlEncodedOption || 'URL Encoded'}
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={encodingType === 'base64'}
                  onChange={() => setEncodingType('base64')}
                />
                Base64
              </label>
            </div>

            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.cssPropertyLabel || 'CSS Property'}
            </label>
            <select
              value={cssProperty}
              onChange={e => setCssProperty(e.target.value as 'background-image' | 'background' | 'mask-image')}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontSize: 13,
                marginBottom: 12,
              }}
            >
              <option value="background-image">background-image</option>
              <option value="background">background (shorthand)</option>
              <option value="mask-image">mask-image</option>
            </select>

            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={optimization}
                onChange={() => setOptimization(!optimization)}
              />
              {t.optimizeLabel || 'Optimize SVG (remove comments & whitespace)'}
            </label>
          </div>
        </div>

        {/* Right panel - Preview and CSS Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Preview */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            padding: 16,
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 150,
          }}>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
              {t.previewLabel || 'SVG Preview'}
            </label>
            {svgInput.trim() ? (
              <div
                dangerouslySetInnerHTML={{ __html: optimizedSvg }}
                style={{
                  width: '100%',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'auto',
                }}
              />
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                {t.previewPlaceholder || 'SVG preview will appear here'}
              </p>
            )}
          </div>

          {/* CSS Output */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>CSS Output</label>
              <CopyButton text={cssOutput} />
            </div>
            <pre
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              {cssOutput}
            </pre>
          </div>

          {/* Data URI Display */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Data URI</label>
              <CopyButton text={cssOutput.match(/url\("([^"]+)"\)/)?.[1] || ''} />
            </div>
            <pre
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                margin: 0,
                color: 'var(--text-secondary)',
                maxHeight: 100,
                overflow: 'auto',
              }}
            >
              {cssOutput.match(/url\("([^"]+)"\)/)?.[1] || ''}
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
