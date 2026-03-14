'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function ImageCropper() {
  const { dict } = useLang();
  const t = (dict.tools as any)['image-cropper'];
  const [image, setImage] = useState<{ url: string; w: number; h: number } | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);
  const [cropped, setCropped] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height });
        setCropX(0); setCropY(0);
        setCropW(img.width); setCropH(img.height);
        setCropped(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const setPresetRatio = (rw: number, rh: number) => {
    if (!image) return;
    const maxW = image.w;
    const maxH = image.h;
    const targetRatio = rw / rh;
    let w = maxW, h = Math.round(maxW / targetRatio);
    if (h > maxH) { h = maxH; w = Math.round(maxH * targetRatio); }
    setCropX(Math.round((maxW - w) / 2));
    setCropY(Math.round((maxH - h) / 2));
    setCropW(w); setCropH(h);
  };

  const crop = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
      setCropped(canvas.toDataURL('image/png'));
    };
    img.src = image.url;
  };

  const download = () => {
    if (!cropped) return;
    const a = document.createElement('a');
    a.href = cropped;
    a.download = `cropped-${cropW}x${cropH}.png`;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="image-cropper">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>PNG, JPG, WebP supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.w} × {image.h}px</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Crop Settings</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setPresetRatio(1, 1)} className="btn btn-secondary" style={{ fontSize: 11 }}>1:1</button>
              <button onClick={() => setPresetRatio(16, 9)} className="btn btn-secondary" style={{ fontSize: 11 }}>16:9</button>
              <button onClick={() => setPresetRatio(4, 3)} className="btn btn-secondary" style={{ fontSize: 11 }}>4:3</button>
              <button onClick={() => setPresetRatio(3, 2)} className="btn btn-secondary" style={{ fontSize: 11 }}>3:2</button>
              <button onClick={() => setPresetRatio(9, 16)} className="btn btn-secondary" style={{ fontSize: 11 }}>9:16</button>
              <button onClick={() => { setCropX(0); setCropY(0); setCropW(image.w); setCropH(image.h); }} className="btn btn-secondary" style={{ fontSize: 11 }}>Free</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[['X', cropX, setCropX], ['Y', cropY, setCropY], ['Width', cropW, setCropW], ['Height', cropH, setCropH]].map(([label, val, setter]: any) => (
                <div key={label}>
                  <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{label}</label>
                  <input type="number" value={val} onChange={e => setter(Number(e.target.value))} style={{ width: '100%', padding: 6, fontSize: 12, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
                </div>
              ))}
            </div>
            <button onClick={crop} className="btn btn-primary">Crop Image</button>
          </div>

          {cropped && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Cropped: {cropW} × {cropH}px</div>
              <img src={cropped} alt="Cropped" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download Cropped Image</button>
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
