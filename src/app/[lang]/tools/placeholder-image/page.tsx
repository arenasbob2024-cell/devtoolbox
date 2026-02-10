'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Preset {
  name: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { name: 'Social Media', width: 1200, height: 630 },
  { name: 'Avatar', width: 200, height: 200 },
  { name: 'Thumbnail', width: 300, height: 200 },
  { name: 'Banner', width: 728, height: 90 },
  { name: 'HD', width: 1920, height: 1080 },
  { name: 'Mobile', width: 375, height: 667 },
];

export default function PlaceholderImageGenerator() {
  const { dict } = useLang();
  const t = dict.tools['placeholder-image'] as Record<string, unknown>;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [textColor, setTextColor] = useState('#666666');
  const [customText, setCustomText] = useState('');
  const [autoFontSize, setAutoFontSize] = useState(true);
  const [fontSize, setFontSize] = useState(48);
  const [dataUri, setDataUri] = useState('');

  const displayText = customText || `${width}x${height}`;

  const calcAutoFontSize = useCallback((w: number, h: number, text: string): number => {
    const maxWidth = w * 0.8;
    const maxHeight = h * 0.3;
    let size = Math.min(maxWidth / (text.length * 0.6), maxHeight);
    size = Math.max(12, Math.min(size, 200));
    return Math.round(size);
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw text
    const text = customText || `${width}x${height}`;
    const size = autoFontSize ? calcAutoFontSize(width, height, text) : fontSize;

    ctx.fillStyle = textColor;
    ctx.font = `bold ${size}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    // Generate data URI
    const uri = canvas.toDataURL('image/png');
    setDataUri(uri);
  }, [width, height, bgColor, textColor, customText, autoFontSize, fontSize, calcAutoFontSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    if (!dataUri) return;
    const a = document.createElement('a');
    a.href = dataUri;
    a.download = `placeholder-${width}x${height}.png`;
    a.click();
  };

  const applyPreset = (preset: Preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const imgTag = dataUri
    ? `<img src="${dataUri}" width="${width}" height="${height}" alt="Placeholder ${width}x${height}" />`
    : '';

  const effectiveFontSize = autoFontSize ? calcAutoFontSize(width, height, displayText) : fontSize;

  // Calculate preview dimensions to fit container
  const maxPreviewWidth = 500;
  const maxPreviewHeight = 350;
  const scale = Math.min(maxPreviewWidth / width, maxPreviewHeight / height, 1);
  const previewWidth = Math.round(width * scale);
  const previewHeight = Math.round(height * scale);

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
    display: 'block',
    marginBottom: 6,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
  };

  const colorRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="placeholder-image"
    >
      {/* Quick Presets */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 8,
        }}>
          Quick Presets
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              {preset.name} ({preset.width}x{preset.height})
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Dimensions */}
          <div>
            <label style={labelStyle}>Dimensions</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(Math.max(1, Math.min(4096, Number(e.target.value) || 1)))}
                min={1}
                max={4096}
                style={{ ...inputStyle, width: 'auto', flex: 1, textAlign: 'center' }}
              />
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 700 }}>x</span>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(Math.max(1, Math.min(4096, Number(e.target.value) || 1)))}
                min={1}
                max={4096}
                style={{ ...inputStyle, width: 'auto', flex: 1, textAlign: 'center' }}
              />
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>px</span>
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label style={labelStyle}>Background Color</label>
            <div style={colorRowStyle}>
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{
                  width: 40,
                  height: 36,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 6,
                  padding: 0,
                  background: 'none',
                }}
              />
              <input
                type="text"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{
                  ...inputStyle,
                  flex: 1,
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label style={labelStyle}>Text Color</label>
            <div style={colorRowStyle}>
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                style={{
                  width: 40,
                  height: 36,
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 6,
                  padding: 0,
                  background: 'none',
                }}
              />
              <input
                type="text"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                style={{
                  ...inputStyle,
                  flex: 1,
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>

          {/* Custom Text */}
          <div>
            <label style={labelStyle}>Custom Text</label>
            <input
              type="text"
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder={`${width}x${height}`}
              style={inputStyle}
            />
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
              Leave empty to show dimensions
            </div>
          </div>

          {/* Font Size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Font Size</label>
              <span style={{ fontSize: 13, color: 'var(--accent-blue)', fontWeight: 700 }}>{effectiveFontSize}px</span>
            </div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              marginBottom: 8,
            }}>
              <input
                type="checkbox"
                checked={autoFontSize}
                onChange={e => setAutoFontSize(e.target.checked)}
                style={{ accentColor: 'var(--accent-blue)' }}
              />
              Auto-calculate font size
            </label>
            {!autoFontSize && (
              <input
                type="range"
                min={8}
                max={200}
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-blue)' }}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={handleDownload}
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px 16px', fontSize: 13, fontWeight: 700 }}
            >
              Download PNG
            </button>
            <CopyButton text={dataUri} label="Copy Data URI" />
          </div>
        </div>

        {/* Preview & Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Preview */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Preview</label>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{width} x {height}px</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-input)',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              padding: 20,
              minHeight: 200,
            }}>
              {dataUri ? (
                <img
                  src={dataUri}
                  alt={`Placeholder ${width}x${height}`}
                  width={previewWidth}
                  height={previewHeight}
                  style={{ borderRadius: 4, border: '1px solid var(--border-color)' }}
                />
              ) : (
                <div style={{
                  width: previewWidth,
                  height: previewHeight,
                  borderRadius: 8,
                  border: '2px dashed var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: 14,
                }}>
                  Preview
                </div>
              )}
            </div>
          </div>

          {/* HTML img Tag */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>HTML img Tag</label>
              <CopyButton text={imgTag} label="Copy HTML" />
            </div>
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '14px 16px',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: 11,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              wordBreak: 'break-all',
              maxHeight: 120,
              overflowY: 'auto',
            }}>
              <code>{imgTag}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
      </div>
    </ToolLayout>
  );
}
