'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function WebpConverter() {
  const { dict } = useLang();
  const t = (dict.tools as any)['webp-converter'];
  const [image, setImage] = useState<{ url: string; w: number; h: number; size: number; name: string } | null>(null);
  const [outputFormat, setOutputFormat] = useState<'webp' | 'png' | 'jpeg'>('webp');
  const [quality, setQuality] = useState(0.85);
  const [converted, setConverted] = useState<{ url: string; size: number } | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setImage({ url: img.src, w: img.width, h: img.height, size: Math.round(file.size / 1024), name: file.name });
        setConverted(null);
        // Auto-detect: if input is webp, suggest png output
        if (file.type === 'image/webp') setOutputFormat('png');
        else setOutputFormat('webp');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const convert = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      if (outputFormat === 'jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0);
      const mime = outputFormat === 'webp' ? 'image/webp' : outputFormat === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mime, quality);
      const bytes = atob(dataUrl.split(',')[1]).length;
      setConverted({ url: dataUrl, size: Math.round(bytes / 1024) });
    };
    img.src = image.url;
  };

  const download = () => {
    if (!converted || !image) return;
    const ext = outputFormat;
    const a = document.createElement('a');
    a.href = converted.url;
    a.download = image.name.replace(/\.[^.]+$/, '') + '.' + ext;
    a.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="webp-converter">
      <div
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent-blue)'; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--border-color)'; if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        onClick={() => fileRef.current?.click()}
        style={{ border: '2px dashed var(--border-color)', borderRadius: 10, padding: 40, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-input)' }}
      >
        <input ref={fileRef} type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>Drag & drop image or click to select</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>WebP, PNG, JPG, GIF supported</div>
      </div>

      {error && <div style={{ padding: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgb(239,68,68)', borderRadius: 6, color: 'rgb(239,68,68)', fontSize: 12, marginTop: 16 }}>{error}</div>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Original: {image.name} — {image.w}×{image.h}px ({image.size} KB)</div>
            <img src={image.url} alt="Original" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 6 }} />
          </div>

          <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Output Format</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {(['webp', 'png', 'jpeg'] as const).map(fmt => (
                <button key={fmt} onClick={() => setOutputFormat(fmt)} style={{ padding: '8px 16px', borderRadius: 6, border: `2px solid ${outputFormat === fmt ? 'var(--accent-blue)' : 'var(--border-color)'}`, background: outputFormat === fmt ? 'rgba(59,130,246,0.1)' : 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>{fmt.toUpperCase()}</button>
              ))}
            </div>
            {outputFormat !== 'png' && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Quality: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} style={{ width: '100%' }} />
              </div>
            )}
            <button onClick={convert} className="btn btn-primary">Convert</button>
          </div>

          {converted && (
            <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Converted: {converted.size} KB ({image.size > converted.size ? `-${Math.round((1 - converted.size / image.size) * 100)}%` : `+${Math.round((converted.size / image.size - 1) * 100)}%`})</div>
              <img src={converted.url} alt="Converted" style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 6, marginBottom: 12 }} />
              <button onClick={download} className="btn btn-primary">Download {outputFormat.toUpperCase()}</button>
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
