'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';

interface CompressedResult {
  blob: Blob;
  url: string;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  format: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const ui = {
  pageTitle: 'Image Compressor',
  pageDescription: 'Compress images online for free. Reduce file size with adjustable quality. Supports JPEG, PNG, and WebP output. All processing happens in your browser.',
  dropzoneLabel: 'Drag & drop an image here or click to select',
  dropzoneHint: 'Supports JPEG, PNG, GIF, BMP, SVG, WebP',
  quality: 'Quality',
  outputFormat: 'Output Format',
  maxWidth: 'Max Width (px)',
  maxHeight: 'Max Height (px)',
  compress: 'Compress',
  download: 'Download Compressed Image',
  reset: 'Reset',
  original: 'Original',
  compressed: 'Compressed',
  reduction: 'Reduction',
  dimensions: 'Dimensions',
  seoTitle: 'What Is Image Compression?',
  seoContent: 'Image compression reduces the file size of images while preserving acceptable visual quality. This tool uses browser-native Canvas API to re-encode images at your chosen quality level, with no server upload required. Lower quality values produce smaller files but may introduce visible artifacts. WebP generally offers the best compression ratio, while PNG is lossless and best for graphics with sharp edges or transparency.',
};

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const compress = useCallback(() => {
    if (!file || !preview) return;
    setCompressing(true);

    const img = new Image();
    img.onload = () => {
      let w = img.width;
      let h = img.height;

      // Apply max dimensions while preserving aspect ratio
      if (maxWidth > 0 && w > maxWidth) {
        h = Math.round(h * (maxWidth / w));
        w = maxWidth;
      }
      if (maxHeight > 0 && h > maxHeight) {
        w = Math.round(w * (maxHeight / h));
        h = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setCompressing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setCompressing(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          setResult({
            blob,
            url,
            width: w,
            height: h,
            originalSize: file.size,
            compressedSize: blob.size,
            format: outputFormat,
          });
          setCompressing(false);
        },
        outputFormat,
        outputFormat === 'image/png' ? undefined : quality
      );
    };
    img.src = preview;
  }, [file, preview, quality, outputFormat, maxWidth, maxHeight]);

  const downloadResult = useCallback(() => {
    if (!result) return;
    const ext = result.format === 'image/png' ? 'png' : result.format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `compressed.${ext}`;
    a.click();
  }, [result]);

  const reset = useCallback(() => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFile(null);
    setPreview(null);
    setResult(null);
    setQuality(0.7);
    setMaxWidth(0);
    setMaxHeight(0);
  }, [result]);

  const reduction = result ? Math.max(0, ((1 - result.compressedSize / result.originalSize) * 100)).toFixed(1) : null;

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="image-compressor"
    >
      {/* Drop zone */}
      {!file && (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? 'var(--accent-blue)' : 'var(--border-color)'}`,
            borderRadius: 12,
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? 'rgba(59,130,246,0.05)' : 'var(--bg-input)',
            transition: 'all 0.2s',
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>&#128444;&#65039;</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{ui.dropzoneLabel}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ui.dropzoneHint}</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      )}

      {/* Controls */}
      {file && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 20,
            padding: 16,
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
          }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                {ui.quality}: {Math.round(quality * 100)}%
              </label>
              <input
                type="range"
                min={0.01}
                max={1}
                step={0.01}
                value={quality}
                onChange={e => setQuality(Number(e.target.value))}
                style={{ width: '100%' }}
                disabled={outputFormat === 'image/png'}
              />
              {outputFormat === 'image/png' && (
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>PNG is lossless</div>
              )}
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{ui.outputFormat}</label>
              <select
                value={outputFormat}
                onChange={e => setOutputFormat(e.target.value as 'image/jpeg' | 'image/png' | 'image/webp')}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                }}
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{ui.maxWidth}</label>
              <input
                type="number"
                value={maxWidth || ''}
                onChange={e => setMaxWidth(Number(e.target.value) || 0)}
                placeholder="No limit"
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>{ui.maxHeight}</label>
              <input
                type="number"
                value={maxHeight || ''}
                onChange={e => setMaxHeight(Number(e.target.value) || 0)}
                placeholder="No limit"
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <button onClick={compress} className="btn btn-primary" disabled={compressing}>
              {compressing ? 'Compressing...' : ui.compress}
            </button>
            {result && (
              <button onClick={downloadResult} className="btn btn-primary">{ui.download}</button>
            )}
            <button onClick={reset} className="btn btn-secondary">{ui.reset}</button>
          </div>

          {/* Stats */}
          {result && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 20,
            }}>
              <div style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{ui.original}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{formatBytes(result.originalSize)}</div>
              </div>
              <div style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{ui.compressed}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{formatBytes(result.compressedSize)}</div>
              </div>
              <div style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{ui.reduction}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: Number(reduction) > 0 ? '#22c55e' : '#ef4444' }}>
                  {reduction}%
                </div>
              </div>
              <div style={{
                background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>{ui.dimensions}</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{result.width} x {result.height}</div>
              </div>
            </div>
          )}

          {/* Preview comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: 16 }}>
            {preview && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                  {ui.original} ({formatBytes(file.size)})
                </div>
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'var(--bg-input)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Original"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            )}
            {result && (
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                  {ui.compressed} ({formatBytes(result.compressedSize)})
                </div>
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'var(--bg-input)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={result.url}
                    alt="Compressed"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            )}
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
