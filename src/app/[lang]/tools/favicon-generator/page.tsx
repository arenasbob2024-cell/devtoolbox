'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface FaviconSize {
  label: string;
  size: number;
  dataUrl: string;
}

export default function FaviconGenerator() {
  const { dict } = useLang();
  const t = dict.tools['favicon-generator'];

  const [text, setText] = useState('D');
  const [bgColor, setBgColor] = useState('#3b82f6');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(56);
  const [borderRadius, setBorderRadius] = useState(20);
  const [previewDataUrl, setPreviewDataUrl] = useState('');
  const [sizes, setSizes] = useState<FaviconSize[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawFavicon = useCallback((targetSize: number): string => {
    const canvas = canvasRef.current;
    if (!canvas) return '';

    canvas.width = targetSize;
    canvas.height = targetSize;

    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Clear
    ctx.clearRect(0, 0, targetSize, targetSize);

    // Draw rounded rectangle background
    const radiusPx = (borderRadius / 100) * (targetSize / 2);
    ctx.beginPath();
    ctx.moveTo(radiusPx, 0);
    ctx.lineTo(targetSize - radiusPx, 0);
    ctx.quadraticCurveTo(targetSize, 0, targetSize, radiusPx);
    ctx.lineTo(targetSize, targetSize - radiusPx);
    ctx.quadraticCurveTo(targetSize, targetSize, targetSize - radiusPx, targetSize);
    ctx.lineTo(radiusPx, targetSize);
    ctx.quadraticCurveTo(0, targetSize, 0, targetSize - radiusPx);
    ctx.lineTo(0, radiusPx);
    ctx.quadraticCurveTo(0, 0, radiusPx, 0);
    ctx.closePath();
    ctx.fillStyle = bgColor;
    ctx.fill();

    // Draw text/emoji centered
    const scaledFontSize = Math.round((fontSize / 128) * targetSize);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${scaledFontSize}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, targetSize / 2, targetSize / 2 + scaledFontSize * 0.05);

    return canvas.toDataURL('image/png');
  }, [text, bgColor, textColor, fontSize, borderRadius]);

  const generateAll = useCallback(() => {
    // Generate preview at 128x128
    const preview = drawFavicon(128);
    setPreviewDataUrl(preview);

    // Generate all sizes
    const targetSizes = [
      { label: '16x16 (favicon)', size: 16 },
      { label: '32x32 (favicon)', size: 32 },
      { label: '48x48 (favicon)', size: 48 },
      { label: '180x180 (Apple Touch Icon)', size: 180 },
    ];

    const generated: FaviconSize[] = targetSizes.map(s => ({
      label: s.label,
      size: s.size,
      dataUrl: drawFavicon(s.size),
    }));

    setSizes(generated);
  }, [drawFavicon]);

  // Auto-generate on any setting change
  useEffect(() => {
    generateAll();
  }, [generateAll]);

  const downloadFavicon = (dataUrl: string, size: number) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  };

  const linkTags = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: 'var(--accent-blue)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
    color: 'var(--text-secondary)',
  };

  const controlGroupStyle: React.CSSProperties = {
    marginBottom: 14,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="favicon-generator"
    >
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
        {/* Controls Panel */}
        <div>
          {/* Text Input */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Text / Emoji</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{text.length}/2</span>
            </div>
            <input
              type="text"
              value={text}
              onChange={e => {
                const val = e.target.value;
                // Allow up to 2 characters or 1 emoji (which can be multi-codepoint)
                if ([...val].length <= 2) {
                  setText(val);
                }
              }}
              placeholder="D"
              maxLength={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 20,
                fontWeight: 700,
                textAlign: 'center',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Background Color */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Background Color</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{ width: 40, height: 32, border: 'none', cursor: 'pointer', borderRadius: 4, padding: 0 }}
              />
              <input
                type="text"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          {/* Text Color */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Text Color</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                style={{ width: 40, height: 32, border: 'none', cursor: 'pointer', borderRadius: 4, padding: 0 }}
              />
              <input
                type="text"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          {/* Font Size */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Font Size</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{fontSize}px</span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Border Radius */}
          <div style={controlGroupStyle}>
            <div style={labelStyle}>
              <span>Border Radius</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{borderRadius}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={borderRadius}
              onChange={e => setBorderRadius(Number(e.target.value))}
              style={sliderStyle}
            />
          </div>

          {/* Quick Radius Presets */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[
              { label: 'Square', value: 0 },
              { label: 'Rounded', value: 20 },
              { label: 'Circle', value: 50 },
            ].map(preset => (
              <button
                key={preset.label}
                onClick={() => setBorderRadius(preset.value)}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 6,
                  border: '1px solid',
                  borderColor: borderRadius === preset.value ? 'var(--accent-blue)' : 'var(--border-color)',
                  background: borderRadius === preset.value ? 'var(--accent-blue)' : 'var(--bg-input)',
                  color: borderRadius === preset.value ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview & Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Preview */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-input)',
            borderRadius: 12,
            border: '1px solid var(--border-color)',
            padding: 40,
            minHeight: 220,
          }}>
            {previewDataUrl ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                  Preview (128x128)
                </div>
                <img
                  src={previewDataUrl}
                  alt="Favicon preview"
                  width={128}
                  height={128}
                  style={{
                    imageRendering: 'pixelated',
                    border: '1px solid var(--border-color)',
                    borderRadius: 4,
                  }}
                />
              </div>
            ) : (
              <div style={{
                width: 128, height: 128, borderRadius: 12,
                border: '2px dashed var(--border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', fontSize: 14,
              }}>
                Preview
              </div>
            )}
          </div>

          {/* Generated Sizes */}
          {sizes.length > 0 && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              padding: 16,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                Generated Sizes
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {sizes.map(item => (
                  <div
                    key={item.size}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      background: 'var(--bg-card)',
                      borderRadius: 8,
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <img
                      src={item.dataUrl}
                      alt={`${item.size}x${item.size}`}
                      width={item.size > 48 ? 48 : item.size}
                      height={item.size > 48 ? 48 : item.size}
                      style={{
                        imageRendering: item.size <= 32 ? 'pixelated' : 'auto',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.label}
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFavicon(item.dataUrl, item.size)}
                      style={{
                        padding: '5px 10px',
                        fontSize: 11,
                        fontWeight: 700,
                        borderRadius: 5,
                        border: '1px solid var(--accent-blue)',
                        background: 'transparent',
                        color: 'var(--accent-blue)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--accent-blue)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--accent-blue)';
                      }}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HTML Link Tags */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
            padding: 16,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
                HTML Link Tags
              </span>
              <CopyButton text={linkTags} label="Copy HTML" />
            </div>
            <pre style={{
              margin: 0,
              padding: 12,
              background: 'var(--bg-card)',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              fontSize: 12,
              fontFamily: 'monospace',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              lineHeight: 1.7,
              overflowX: 'auto',
            }}>
              {linkTags}
            </pre>
          </div>
        </div>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
