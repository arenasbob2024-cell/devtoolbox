'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function ImageResizer() {
  const { dict } = useLang();
  const t = (dict.tools as any)['image-resizer'];
  const [image, setImage] = useState<{ url: string; w: number; h: number; size: number } | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resized, setResized] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const ratio = useRef(1);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height, size: Math.round(file.size / 1024) });
        setWidth(img.width);
        setHeight(img.height);
        ratio.current = img.width / img.height;
        setResized(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const updateWidth = (v: number) => {
    setWidth(v);
    if (keepRatio) setHeight(Math.round(v / ratio.current));
  };
  const updateHeight = (v: number) => {
    setHeight(v);
    if (keepRatio) setWidth(Math.round(v * ratio.current));
  };

  const resize = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      setResized(canvas.toDataURL('image/png'));
    };
    img.src = image.url;
  };

  const download = () => {
    if (!resized) return;
    const a = document.createElement('a');
    a.href = resized;
    a.download = `resized-${width}x${height}.png`;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="image-resizer">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>PNG, JPG, WebP, GIF supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.w} × {image.h}px ({image.size} KB)</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Resize Options</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Width (px)</label>
                <input type="number" value={width} onChange={e => updateWidth(Number(e.target.value))} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Height (px)</label>
                <input type="number" value={height} onChange={e => updateHeight(Number(e.target.value))} style={{ width: '100%', padding: 8, fontSize: 13, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
              </div>
            </div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              <input type="checkbox" checked={keepRatio} onChange={e => setKeepRatio(e.target.checked)} /> Keep aspect ratio
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setWidth(Math.round(image.w / 2)); if (keepRatio) setHeight(Math.round(image.h / 2)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>50%</button>
              <button onClick={() => { setWidth(Math.round(image.w / 4)); if (keepRatio) setHeight(Math.round(image.h / 4)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>25%</button>
              <button onClick={() => { setWidth(1920); if (keepRatio) setHeight(Math.round(1920 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>1920px</button>
              <button onClick={() => { setWidth(1280); if (keepRatio) setHeight(Math.round(1280 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>1280px</button>
              <button onClick={() => { setWidth(640); if (keepRatio) setHeight(Math.round(640 / ratio.current)); }} className="btn btn-secondary" style={{ fontSize: 11 }}>640px</button>
            </div>
          </div>

          <button onClick={resize} className="btn btn-primary" style={{ marginBottom: 16 }}>Resize Image</button>

          {resized && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Resized: {width} × {height}px</div>
              <img src={resized} alt="Resized" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download Resized Image</button>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
