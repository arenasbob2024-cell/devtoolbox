'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function ImageBase64() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['image-base64'];
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [mimeType, setMimeType] = useState('');
  const [preview, setPreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [decodeInput, setDecodeInput] = useState('');
  const [decodedPreview, setDecodedPreview] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    setFileSize(file.size);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      // Extract pure base64 after comma
      const b64 = result.split(',')[1] || '';
      setBase64(b64);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDecode = () => {
    let input = decodeInput.trim();
    // Auto-detect if it's a data URI or raw base64
    if (input.startsWith('data:image')) {
      setDecodedPreview(input);
    } else {
      // Try to make it a valid data URI
      setDecodedPreview(`data:image/png;base64,${input}`);
    }
  };

  const dataUri = preview;
  const cssSnippet = preview ? `background-image: url('${preview}');` : '';
  const htmlSnippet = preview ? `<img src="${preview}" alt="${fileName}" />` : '';

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="image-base64"
    >
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['encode', 'decode'] as const).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '6px 18px',
              borderRadius: 6,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === m ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {m === 'encode' ? (t.encodeTab || 'Image → Base64') : (t.decodeTab || 'Base64 → Image')}
          </button>
        ))}
      </div>

      {mode === 'encode' ? (
        <>
          {/* Drop zone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
              borderRadius: 12,
              padding: 40,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
              marginBottom: 20,
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f); }}
              style={{ display: 'none' }}
            />
            <div style={{ fontSize: 40, marginBottom: 12 }}>🖼️</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              {t.dropText || 'Drop an image here or click to select'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {t.supportedFormats || 'Supports PNG, JPG, GIF, SVG, WebP, ICO'}
            </p>
          </div>

          {/* Preview and results */}
          {preview && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20, marginBottom: 20 }}>
                {/* Image preview */}
                <div style={{
                  background: 'var(--bg-input)',
                  borderRadius: 8,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt={fileName} style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 4 }} />
                </div>
                {/* File info */}
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 2 }}>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.fileNameLabel || 'File'}:</strong> {fileName}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.fileSizeLabel || 'Size'}:</strong> {(fileSize / 1024).toFixed(1)} KB</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>{t.typeLabel || 'Type'}:</strong> {mimeType}</div>
                  <div><strong style={{ color: 'var(--text-primary)' }}>Base64 {t.lengthLabel || 'length'}:</strong> {base64.length.toLocaleString()} chars ({(base64.length * 0.75 / 1024).toFixed(1)} KB)</div>
                </div>
              </div>

              {/* Base64 output */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Base64 String</label>
                  <CopyButton text={base64} />
                </div>
                <textarea value={base64} readOnly style={{ minHeight: 120, fontSize: 11 }} />
              </div>

              {/* Data URI */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Data URI</label>
                  <CopyButton text={dataUri} />
                </div>
                <textarea value={dataUri} readOnly style={{ minHeight: 80, fontSize: 11 }} />
              </div>

              {/* HTML snippet */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.htmlSnippet || 'HTML <img> Tag'}</label>
                  <CopyButton text={htmlSnippet} />
                </div>
                <textarea value={htmlSnippet} readOnly style={{ minHeight: 60, fontSize: 12 }} />
              </div>

              {/* CSS snippet */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>{t.cssSnippet || 'CSS Background'}</label>
                  <CopyButton text={cssSnippet} />
                </div>
                <textarea value={cssSnippet} readOnly style={{ minHeight: 60, fontSize: 12 }} />
              </div>
            </>
          )}
        </>
      ) : (
        /* Decode mode */
        <>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.base64Input || 'Paste Base64 or Data URI'}
            </label>
            <textarea
              value={decodeInput}
              onChange={e => setDecodeInput(e.target.value)}
              placeholder={t.decodePlaceholder || 'Paste a Base64 string or data:image/png;base64,... URI here'}
              style={{ minHeight: 180 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <button onClick={handleDecode} className="btn btn-primary">{t.decodeBtn || 'Decode to Image'}</button>
            <button onClick={() => { setDecodeInput(''); setDecodedPreview(''); }} className="btn btn-secondary">{dict.common.clear}</button>
          </div>
          {decodedPreview && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 12,
              padding: 24,
              textAlign: 'center',
              border: '1px solid var(--border-color)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={decodedPreview}
                alt="Decoded"
                style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
                onError={() => setDecodedPreview('')}
              />
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
