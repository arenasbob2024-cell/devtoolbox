'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function SvgToPng() {
  const { dict } = useLang();
  const t = dict.tools['svg-to-png'] as unknown as Record<string, string>;

  const [svgInput, setSvgInput] = useState('');
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [lockAspect, setLockAspect] = useState(true);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [transparent, setTransparent] = useState(true);
  const [scale, setScale] = useState(1);
  const [previewUrl, setPreviewUrl] = useState('');
  const [pngUrl, setPngUrl] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [naturalWidth, setNaturalWidth] = useState(512);
  const [naturalHeight, setNaturalHeight] = useState(512);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse SVG dimensions
  const parseSvgDimensions = useCallback((svg: string): { w: number; h: number } | null => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');
      if (!svgEl) return null;

      const viewBox = svgEl.getAttribute('viewBox');
      const wAttr = svgEl.getAttribute('width');
      const hAttr = svgEl.getAttribute('height');

      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(Number);
        if (parts.length === 4 && !isNaN(parts[2]) && !isNaN(parts[3])) {
          return { w: parts[2], h: parts[3] };
        }
      }

      if (wAttr && hAttr) {
        const w = parseFloat(wAttr);
        const h = parseFloat(hAttr);
        if (!isNaN(w) && !isNaN(h)) return { w, h };
      }

      return { w: 512, h: 512 };
    } catch {
      return null;
    }
  }, []);

  // Generate preview when SVG input changes
  useEffect(() => {
    if (!svgInput.trim()) {
      setPreviewUrl('');
      return;
    }
    try {
      const blob = new Blob([svgInput], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setError('');

      const dims = parseSvgDimensions(svgInput);
      if (dims) {
        setNaturalWidth(dims.w);
        setNaturalHeight(dims.h);
        setWidth(Math.round(dims.w));
        setHeight(Math.round(dims.h));
      }

      return () => URL.revokeObjectURL(url);
    } catch {
      setError(t.invalidSvg || 'Invalid SVG input');
    }
  }, [svgInput, parseSvgDimensions, t]);

  // Handle width change with aspect ratio lock
  const handleWidthChange = (newW: number) => {
    setWidth(newW);
    if (lockAspect && naturalWidth > 0) {
      setHeight(Math.round((newW / naturalWidth) * naturalHeight));
    }
  };

  // Handle height change with aspect ratio lock
  const handleHeightChange = (newH: number) => {
    setHeight(newH);
    if (lockAspect && naturalHeight > 0) {
      setWidth(Math.round((newH / naturalHeight) * naturalWidth));
    }
  };

  // Convert SVG to PNG
  const convertToPng = useCallback(() => {
    if (!svgInput.trim()) return;
    setError('');
    setPngUrl('');

    const canvas = canvasRef.current;
    if (!canvas) return;

    const finalW = Math.round(width * scale);
    const finalH = Math.round(height * scale);
    canvas.width = finalW;
    canvas.height = finalH;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    if (!transparent) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, finalW, finalH);
    } else {
      ctx.clearRect(0, 0, finalW, finalH);
    }

    const img = new Image();
    const blob = new Blob([svgInput], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, finalW, finalH);
      URL.revokeObjectURL(url);

      try {
        const dataUrl = canvas.toDataURL('image/png');
        setPngUrl(dataUrl);
      } catch (e) {
        setError(t.conversionError || 'Conversion failed. SVG may contain external resources.');
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError(t.invalidSvg || 'Failed to load SVG');
    };

    img.src = url;
  }, [svgInput, width, height, scale, transparent, bgColor, t]);

  // Download PNG
  const downloadPng = () => {
    if (!pngUrl) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `converted-${width * scale}x${height * scale}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // File upload handler
  const handleFileRead = useCallback((file: File) => {
    if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
      setError(t.onlySvg || 'Only SVG files are accepted');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setSvgInput(text);
      setPngUrl('');
      setError('');
    };
    reader.readAsText(file);
  }, [t]);

  // Drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileRead(file);
  }, [handleFileRead]);

  // Paste SVG from clipboard
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text/plain');
    if (text && text.trim().startsWith('<')) {
      setSvgInput(text);
      setPngUrl('');
      setError('');
    }
  }, []);

  const loadSample = () => {
    const sample = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect rx="20" ry="20" width="200" height="200" fill="url(#grad)" />
  <text x="100" y="105" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">SVG</text>
  <circle cx="100" cy="150" r="20" fill="rgba(255,255,255,0.3)" />
  <path d="M90 145 L100 160 L115 140" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
    setSvgInput(sample);
    setPngUrl('');
    setError('');
  };

  const clearAll = () => {
    setSvgInput('');
    setPngUrl('');
    setPreviewUrl('');
    setError('');
    setWidth(512);
    setHeight(512);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    display: 'block',
    marginBottom: 6,
    color: 'var(--text-secondary)',
  };

  return (
    <ToolLayout
      title={t.pageTitle || 'SVG to PNG Converter'}
      description={t.pageDescription || 'Convert SVG to PNG online'}
      toolId="svg-to-png"
    >
      {/* File upload drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          borderRadius: 12,
          padding: 24,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
          marginBottom: 16,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg,image/svg+xml"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFileRead(f); }}
          style={{ display: 'none' }}
        />
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          {t.dropZoneTitle || 'Drop an SVG file here or click to upload'}
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0 }}>
          {t.dropZoneSubtitle || 'Or paste SVG code in the textarea below'}
        </p>
      </div>

      {/* SVG Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{t.svgInput || 'SVG Code'}</label>
        <textarea
          value={svgInput}
          onChange={e => { setSvgInput(e.target.value); setPngUrl(''); }}
          onPaste={handlePaste}
          placeholder={t.svgPlaceholder || 'Paste your SVG code here...'}
          style={{
            ...inputStyle,
            minHeight: 180,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            resize: 'vertical',
          }}
        />
      </div>

      {/* Settings */}
      <div style={{
        background: 'var(--bg-input)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
          {t.outputSettings || 'Output Settings'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr 1fr', gap: 12, alignItems: 'end', marginBottom: 12 }}>
          <div>
            <label style={labelStyle}>{t.widthLabel || 'Width (px)'}</label>
            <input
              type="number"
              value={width}
              min={1}
              max={8192}
              onChange={e => handleWidthChange(parseInt(e.target.value) || 1)}
              style={{ ...inputStyle, padding: '8px 10px', fontSize: 13 }}
            />
          </div>

          <div style={{ paddingBottom: 8 }}>
            <button
              onClick={() => setLockAspect(!lockAspect)}
              title={lockAspect ? (t.unlockAspect || 'Unlock aspect ratio') : (t.lockAspect || 'Lock aspect ratio')}
              style={{
                padding: '6px 10px',
                borderRadius: 6,
                border: `1px solid ${lockAspect ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                background: lockAspect ? 'rgba(59,130,246,0.1)' : 'transparent',
                color: lockAspect ? 'var(--accent-blue)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {lockAspect ? '\uD83D\uDD12' : '\uD83D\uDD13'}
            </button>
          </div>

          <div>
            <label style={labelStyle}>{t.heightLabel || 'Height (px)'}</label>
            <input
              type="number"
              value={height}
              min={1}
              max={8192}
              onChange={e => handleHeightChange(parseInt(e.target.value) || 1)}
              style={{ ...inputStyle, padding: '8px 10px', fontSize: 13 }}
            />
          </div>

          <div>
            <label style={labelStyle}>{t.scaleLabel || 'Scale'}</label>
            <select
              value={scale}
              onChange={e => setScale(Number(e.target.value))}
              style={{ ...inputStyle, padding: '8px 10px', fontSize: 13, cursor: 'pointer' }}
            >
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={transparent}
              onChange={e => setTransparent(e.target.checked)}
              style={{ accentColor: 'var(--accent-blue)' }}
            />
            {t.transparentBg || 'Transparent background'}
          </label>

          {!transparent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {t.bgColorLabel || 'Background color:'}
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{ width: 32, height: 24, border: '1px solid var(--border-color)', borderRadius: 4, cursor: 'pointer', padding: 0 }}
              />
              <code style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{bgColor}</code>
            </div>
          )}

          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 'auto' }}>
            {t.finalSize || 'Final size'}: <strong>{Math.round(width * scale)} x {Math.round(height * scale)} px</strong>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToPng} className="btn btn-primary" disabled={!svgInput.trim()}>
          {t.convertBtn || 'Convert to PNG'}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {t.loadSample || 'Load Sample'}
        </button>
        <button onClick={clearAll} className="btn btn-secondary">
          {t.clearBtn || 'Clear'}
        </button>
        {pngUrl && (
          <button onClick={downloadPng} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            {t.downloadPng || 'Download PNG'}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          {error}
        </div>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Preview Area */}
      <div style={{ display: 'grid', gridTemplateColumns: previewUrl && pngUrl ? '1fr 1fr' : '1fr', gap: 16, marginBottom: 24 }}>
        {/* SVG Preview */}
        {previewUrl && (
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.svgPreview || 'SVG Preview'}
            </label>
            <div style={{
              background: 'repeating-conic-gradient(#f3f4f6 0% 25%, #fff 0% 50%) 0 0 / 16px 16px',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              overflow: 'hidden',
            }}>
              <img
                src={previewUrl}
                alt="SVG Preview"
                style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        {/* PNG Preview */}
        {pngUrl && (
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.pngPreview || 'PNG Output'}
              <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 8, color: 'var(--text-secondary)' }}>
                {Math.round(width * scale)} x {Math.round(height * scale)} px
              </span>
            </label>
            <div style={{
              background: 'repeating-conic-gradient(#f3f4f6 0% 25%, #fff 0% 50%) 0 0 / 16px 16px',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
              overflow: 'hidden',
            }}>
              <img
                src={pngUrl}
                alt="PNG Output"
                style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Preset sizes */}
      <div style={{
        background: 'var(--bg-input)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
        border: '1px solid var(--border-color)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>
          {t.presetSizes || 'Quick Preset Sizes'}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { label: 'Favicon 16x16', w: 16, h: 16 },
            { label: 'Favicon 32x32', w: 32, h: 32 },
            { label: 'Icon 64x64', w: 64, h: 64 },
            { label: 'Icon 128x128', w: 128, h: 128 },
            { label: 'Icon 256x256', w: 256, h: 256 },
            { label: '512x512', w: 512, h: 512 },
            { label: '1024x1024', w: 1024, h: 1024 },
            { label: 'HD 1920x1080', w: 1920, h: 1080 },
            { label: '4K 3840x2160', w: 3840, h: 2160 },
          ].map(p => (
            <button
              key={p.label}
              onClick={() => { setWidth(p.w); setHeight(p.h); setLockAspect(false); }}
              style={{
                padding: '5px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                fontSize: 11,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Content */}
      {t.seoTitle && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {t.seoContent}
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
