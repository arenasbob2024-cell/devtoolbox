'use client';

import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function Base64ImageEncoder() {
  const { dict } = useLang();
  const t = dict.tools['base64-image-encoder'];
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [preview, setPreview] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [fileInfo, setFileInfo] = useState<{ name?: string; size?: number; width?: number; height?: number; mimeType?: string }>({});
  const [base64Input, setBase64Input] = useState('');
  const [decodeError, setDecodeError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Handle file selection for encoding
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setBase64Output(base64);
      setFileInfo({ name: file.name, size: file.size, mimeType: file.type });

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setPreview(base64);
        setFileInfo(prev => ({ ...prev, width: img.width, height: img.height }));
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.background = 'var(--bg-hover)';
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.background = 'var(--bg-secondary)';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropZoneRef.current) {
      dropZoneRef.current.style.background = 'var(--bg-secondary)';
    }
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Decode Base64 to image
  const handleDecode = () => {
    setDecodeError('');
    try {
      if (!base64Input.trim()) {
        setDecodeError('Please paste Base64 string');
        return;
      }

      // Try to decode
      let dataUrl = base64Input.trim();
      if (!dataUrl.startsWith('data:')) {
        // Add data URL prefix if missing
        dataUrl = `data:image/png;base64,${dataUrl}`;
      }

      const img = new Image();
      img.onload = () => {
        setPreview(dataUrl);
        // Try to extract MIME type from data URL
        const match = dataUrl.match(/data:([^;]+)/);
        const mimeType = match ? match[1] : 'unknown';
        setFileInfo({ mimeType, width: img.width, height: img.height });
      };
      img.onerror = () => {
        setDecodeError('Invalid Base64 image data');
      };
      img.src = dataUrl;
    } catch (e) {
      setDecodeError('Error decoding Base64');
    }
  };

  // Generate code snippets
  const getHtmlSnippet = () => {
    if (!base64Output) return '';
    return `<img src="${base64Output}" alt="image" width="${fileInfo.width}" height="${fileInfo.height}" />`;
  };

  const getCssSnippet = () => {
    if (!base64Output) return '';
    return `.background {\n  background-image: url('${base64Output}');\n  background-size: cover;\n}`;
  };

  const getMarkdownSnippet = () => {
    if (!base64Output) return '';
    return `![image](${base64Output})`;
  };

  const clearAll = () => {
    setPreview('');
    setBase64Output('');
    setBase64Input('');
    setFileInfo({});
    setDecodeError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadImage = () => {
    if (!preview) return;
    const a = document.createElement('a');
    a.href = preview;
    a.download = fileInfo.name || 'image.png';
    a.click();
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="base64-image-encoder"
    >
      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => { setMode('encode'); clearAll(); }}
          className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
        >
          {t.modeEncode}
        </button>
        <button
          onClick={() => { setMode('decode'); clearAll(); }}
          className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
        >
          {t.modeDecode}
        </button>
      </div>

      {/* Encode Mode */}
      {mode === 'encode' && (
        <div>
          {/* File Drop Zone */}
          <div
            ref={dropZoneRef}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              background: 'var(--bg-secondary)',
              border: '2px dashed var(--border-color)',
              borderRadius: 8,
              padding: '40px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: 20,
              transition: 'background 0.2s',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>📁</div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              {t.dragDropText}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {t.supportedFormats}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* File Info */}
          {fileInfo.size && (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 20,
              fontSize: 13,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                {fileInfo.name && <div><strong>{t.fileName}:</strong> {fileInfo.name}</div>}
                {fileInfo.size && <div><strong>{t.fileSize}:</strong> {(fileInfo.size / 1024).toFixed(2)} KB</div>}
                {fileInfo.width && fileInfo.height && (
                  <div><strong>{t.dimensions}:</strong> {fileInfo.width}×{fileInfo.height} px</div>
                )}
                {fileInfo.mimeType && <div><strong>{t.mimeType}:</strong> {fileInfo.mimeType}</div>}
              </div>
            </div>
          )}

          {/* Preview */}
          {preview && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                {t.preview}
              </label>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: 12,
                maxHeight: 300,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 4 }}
                />
              </div>
            </div>
          )}

          {/* Base64 Output */}
          {base64Output && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>{t.base64Output}</label>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {(base64Output.length / 1024).toFixed(2)} KB
                </span>
              </div>
              <textarea
                value={base64Output}
                readOnly
                style={{
                  width: '100%',
                  minHeight: 200,
                  padding: '10px',
                  fontSize: 12,
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                }}
              />
              <CopyButton text={base64Output} />
            </div>
          )}

          {/* Code Snippets */}
          {base64Output && (
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{t.codeSnippets}</h3>

              {/* HTML */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>
                  HTML
                </label>
                <textarea
                  value={getHtmlSnippet()}
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: 80,
                    padding: '8px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                  }}
                />
                <CopyButton text={getHtmlSnippet()} />
              </div>

              {/* CSS */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>
                  CSS Background
                </label>
                <textarea
                  value={getCssSnippet()}
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: 80,
                    padding: '8px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                  }}
                />
                <CopyButton text={getCssSnippet()} />
              </div>

              {/* Markdown */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>
                  Markdown
                </label>
                <textarea
                  value={getMarkdownSnippet()}
                  readOnly
                  style={{
                    width: '100%',
                    minHeight: 60,
                    padding: '8px',
                    fontSize: 11,
                    fontFamily: 'monospace',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                  }}
                />
                <CopyButton text={getMarkdownSnippet()} />
              </div>
            </div>
          )}

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8 }}>
            {base64Output && (
              <button onClick={downloadImage} className="btn btn-primary">
                {t.downloadImage}
              </button>
            )}
            {(preview || base64Output) && (
              <button onClick={clearAll} className="btn btn-secondary">
                {dict.common.clear}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Decode Mode */}
      {mode === 'decode' && (
        <div>
          {/* Base64 Input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.base64Input}
            </label>
            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder={t.base64InputPlaceholder}
              style={{
                width: '100%',
                minHeight: 200,
                padding: '10px',
                fontSize: 12,
                fontFamily: 'monospace',
                wordBreak: 'break-all',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Error */}
          {decodeError && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 8,
              padding: '10px 14px',
              marginBottom: 16,
              fontSize: 13,
              color: 'var(--accent-rose)',
            }}>
              ✕ {decodeError}
            </div>
          )}

          {/* Decode Button */}
          <button onClick={handleDecode} className="btn btn-primary" style={{ marginBottom: 20 }}>
            {t.decodeBtn}
          </button>

          {/* Preview */}
          {preview && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                {t.preview}
              </label>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                padding: 12,
                maxHeight: 300,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={preview}
                  alt="preview"
                  style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 4 }}
                />
              </div>
            </div>
          )}

          {/* File Info */}
          {fileInfo.width && (
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '12px 14px',
              marginBottom: 20,
              fontSize: 13,
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
                {fileInfo.width && fileInfo.height && (
                  <div><strong>{t.dimensions}:</strong> {fileInfo.width}×{fileInfo.height} px</div>
                )}
                {fileInfo.mimeType && <div><strong>{t.mimeType}:</strong> {fileInfo.mimeType}</div>}
              </div>
            </div>
          )}

          {/* Controls */}
          {preview && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={downloadImage} className="btn btn-primary">
                {t.downloadImage}
              </button>
              <button onClick={clearAll} className="btn btn-secondary">
                {dict.common.clear}
              </button>
            </div>
          )}
        </div>
      )}

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
