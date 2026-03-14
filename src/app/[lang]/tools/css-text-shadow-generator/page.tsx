'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Shadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  enabled: boolean;
}

export default function CssTextShadowGenerator() {
  const { dict } = useLang();
  const t = dict.tools['css-text-shadow-generator'];
  const [shadows, setShadows] = useState<Shadow[]>([
    { offsetX: 2, offsetY: 2, blur: 4, color: '#000000', enabled: true },
  ]);
  const [previewText, setPreviewText] = useState('Sample Text');
  const [previewSize, setPreviewSize] = useState(48);
  const [previewColor, setPreviewColor] = useState('#ffffff');

  const updateShadow = (index: number, field: keyof Shadow, value: any) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], [field]: value };
    setShadows(newShadows);
  };

  const addShadow = () => {
    setShadows([...shadows, { offsetX: 2, offsetY: 2, blur: 4, color: '#000000', enabled: true }]);
  };

  const removeShadow = (index: number) => {
    if (shadows.length > 1) {
      setShadows(shadows.filter((_, i) => i !== index));
    }
  };

  const generateCss = (): string => {
    return shadows
      .filter(s => s.enabled)
      .map(s => `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.color}`)
      .join(', ');
  };

  const cssValue = generateCss();

  const previewStyle = {
    fontSize: `${previewSize}px`,
    color: previewColor,
    textShadow: cssValue,
    fontWeight: 'bold',
    padding: '20px',
    textAlign: 'center' as const,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-text-shadow-generator"
    >
      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Controls */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.shadowsLabel || 'Shadow Layers'}</h3>

          {shadows.map((shadow, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={shadow.enabled}
                    onChange={e => updateShadow(idx, 'enabled', e.target.checked)}
                  />
                  {t.shadowLayer || 'Layer'} {idx + 1}
                </label>
                {shadows.length > 1 && (
                  <button onClick={() => removeShadow(idx)} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 8px' }}>
                    {dict.common.remove || 'Remove'}
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div>
                  <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                    {t.offsetX || 'Offset X'}
                  </label>
                  <input
                    type="number"
                    value={shadow.offsetX}
                    onChange={e => updateShadow(idx, 'offsetX', Number(e.target.value))}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                    {t.offsetY || 'Offset Y'}
                  </label>
                  <input
                    type="number"
                    value={shadow.offsetY}
                    onChange={e => updateShadow(idx, 'offsetY', Number(e.target.value))}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                    {t.blur || 'Blur (px)'}
                  </label>
                  <input
                    type="number"
                    value={shadow.blur}
                    onChange={e => updateShadow(idx, 'blur', Number(e.target.value))}
                    style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                    {t.color || 'Color'}
                  </label>
                  <input
                    type="color"
                    value={shadow.color}
                    onChange={e => updateShadow(idx, 'color', e.target.value)}
                    style={{ width: '100%', height: 32, cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: 4 }}
                  />
                </div>
              </div>
            </div>
          ))}

          <button onClick={addShadow} className="btn btn-primary" style={{ width: '100%', marginBottom: 12 }}>
            {t.addShadow || '+ Add Shadow Layer'}
          </button>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{t.previewOptions || 'Preview Options'}</h3>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                {t.previewText || 'Text'}
              </label>
              <input
                type="text"
                value={previewText}
                onChange={e => setPreviewText(e.target.value)}
                style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                  {t.fontSize || 'Font Size (px)'}
                </label>
                <input
                  type="number"
                  value={previewSize}
                  onChange={e => setPreviewSize(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
                  {t.textColor || 'Text Color'}
                </label>
                <input
                  type="color"
                  value={previewColor}
                  onChange={e => setPreviewColor(e.target.value)}
                  style={{ width: '100%', height: 32, cursor: 'pointer', border: '1px solid var(--border-color)', borderRadius: 4 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Code */}
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.preview || 'Preview'}</h3>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: 20,
            marginBottom: 16,
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={previewStyle}>
              {previewText}
            </div>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{t.cssCode || 'CSS Code'}</h3>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 8,
            padding: 12,
            fontFamily: 'monospace',
            fontSize: 12,
            wordBreak: 'break-all',
            marginBottom: 8,
            position: 'relative',
          }}>
            <code>
              text-shadow: {cssValue || 'none'};
            </code>
            <div style={{ position: 'absolute', top: 8, right: 8 }}>
              <CopyButton text={`text-shadow: ${cssValue || 'none'};`} />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'Create Custom CSS Text Shadows'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Design stunning text shadow effects visually and get the ready-to-use CSS code instantly. Perfect for headings, logos, and text-based designs.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Multiple shadow layers with individual controls'}</li>
          <li>{t.seoFeature2 || 'Real-time preview of text shadow effects'}</li>
          <li>{t.seoFeature3 || 'Customizable text, size, and color for preview'}</li>
          <li>{t.seoFeature4 || 'Copy CSS code with a single click'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
