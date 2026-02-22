'use client';

import { useState, useCallback, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

const ui = {
  pageTitle: 'Image to Base64 Converter',
  pageDescription: 'Convert images to Base64 strings and data URIs. Drag and drop or select image files to encode them as Base64.',
  dropLabel: 'Drag & drop an image here, or click to select',
  supportedFormats: 'Supports PNG, JPG, GIF, SVG, WebP, BMP, ICO',
  maxSize: 'Max file size: 5 MB',
  fileName: 'File Name',
  fileType: 'Type',
  fileSize: 'Size',
  dimensions: 'Dimensions',
  base64String: 'Base64 String',
  dataUri: 'Data URI',
  cssBackground: 'CSS Background',
  htmlImg: 'HTML <img> Tag',
  preview: 'Preview',
  clear: 'Clear',
  copyBase64: 'Copy Base64',
  copyDataUri: 'Copy Data URI',
  copyCss: 'Copy CSS',
  copyHtml: 'Copy HTML',
  seoTitle: 'What Is Image to Base64?',
  seoContent: 'Image to Base64 conversion encodes image binary data as a text string using Base64 encoding. This produces a data URI that can be embedded directly in HTML, CSS, or JavaScript without requiring a separate image file. This is useful for small icons, thumbnails, email templates, and reducing HTTP requests. Larger images should generally still be loaded as separate files for better performance.',
};

interface ImageResult {
  fileName: string;
  fileType: string;
  fileSize: number;
  width: number;
  height: number;
  base64: string;
  dataUri: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageToBase64Page() {
  const [result, setResult] = useState<ImageResult | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5 MB limit');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUri = e.target?.result as string;
      const base64 = dataUri.split(',')[1];

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        setResult({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          width: img.width,
          height: img.height,
          base64,
          dataUri,
        });
      };
      img.onerror = () => {
        setResult({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          width: 0,
          height: 0,
          base64,
          dataUri,
        });
      };
      img.src = dataUri;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const cssBackground = result ? `background-image: url('${result.dataUri}');` : '';
  const htmlImg = result ? `<img src="${result.dataUri}" alt="${result.fileName}" width="${result.width}" height="${result.height}" />` : '';

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="image-to-base64"
    >
      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          borderRadius: 12,
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
          transition: 'all 0.2s',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>&#128247;</div>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{ui.dropLabel}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ui.supportedFormats}</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{ui.maxSize}</div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      {result && (
        <>
          {/* File info */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10,
            marginBottom: 20,
          }}>
            {[
              { label: ui.fileName, value: result.fileName },
              { label: ui.fileType, value: result.fileType },
              { label: ui.fileSize, value: formatBytes(result.fileSize) },
              { label: ui.dimensions, value: result.width > 0 ? `${result.width} x ${result.height}` : 'N/A' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '10px 14px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 13, wordBreak: 'break-all' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{ui.preview}</h3>
            <div style={{
              background: 'repeating-conic-gradient(#f0f0f0 0% 25%, #fff 0% 50%) 50% / 16px 16px',
              borderRadius: 8, border: '1px solid var(--border-color)', padding: 16,
              display: 'flex', justifyContent: 'center', maxHeight: 300, overflow: 'auto',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.dataUri} alt={result.fileName} style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain' }} />
            </div>
          </div>

          {/* Output sections */}
          {[
            { label: ui.base64String, value: result.base64, copyLabel: ui.copyBase64 },
            { label: ui.dataUri, value: result.dataUri, copyLabel: ui.copyDataUri },
            { label: ui.cssBackground, value: cssBackground, copyLabel: ui.copyCss },
            { label: ui.htmlImg, value: htmlImg, copyLabel: ui.copyHtml },
          ].map(({ label, value, copyLabel }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{label}</span>
                <CopyButton text={value} label={copyLabel} />
              </div>
              <textarea
                value={value}
                readOnly
                style={{ minHeight: 60, fontFamily: 'monospace', fontSize: 11, background: 'var(--bg-input)' }}
              />
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <button onClick={() => { setResult(null); setError(''); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="btn btn-secondary">{ui.clear}</button>
          </div>
        </>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
