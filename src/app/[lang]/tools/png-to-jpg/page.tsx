'use client';

import { useState, useRef, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

interface ImageData {
  url: string;
  width: number;
  height: number;
  size: number;
}

export default function PngToJpg() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['png-to-jpg'];

  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [convertedImage, setConvertedImage] = useState<ImageData | null>(null);
  const [outputFormat, setOutputFormat] = useState<'jpg' | 'png'>('jpg');
  const [quality, setQuality] = useState(0.9);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileSize = (str: string): number => {
    const len = str.length;
    const bytes = new TextEncoder().encode(str).length;
    return bytes;
  };

  const handleFileSelect = useCallback((file: File) => {
    try {
      setError('');
      if (!file.type.match(/image\/(png|jpeg|jpg)/)) {
        setError('Please select a PNG or JPG image');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const img = new Image();
          img.onload = () => {
            const sizeKb = Math.round(file.size / 1024 * 100) / 100;
            setOriginalImage({
              url: img.src,
              width: img.width,
              height: img.height,
              size: sizeKb,
            });
            setConvertedImage(null);
          };
          img.onerror = () => {
            setError('Failed to load image');
          };
          img.src = e.target?.result as string;
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Image processing failed');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'File selection failed');
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'var(--accent-blue)';
    e.currentTarget.style.opacity = '0.1';
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'transparent';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const convertImage = useCallback(() => {
    if (!originalImage) return;

    try {
      setError('');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        setError('Canvas context not available');
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (outputFormat === 'jpg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : 'image/png';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        const sizeKb = Math.round(getFileSize(dataUrl) / 1024 * 100) / 100;
        setConvertedImage({
          url: dataUrl,
          width: img.width,
          height: img.height,
          size: sizeKb,
        });
      };
      img.onerror = () => {
        setError('Failed to convert image');
      };
      img.src = originalImage.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  }, [originalImage, outputFormat, quality]);

  const handleDownload = useCallback(() => {
    if (!convertedImage) return;

    const link = document.createElement('a');
    const ext = outputFormat === 'jpg' ? 'jpg' : 'png';
    link.href = convertedImage.url;
    link.download = `image.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [convertedImage, outputFormat]);

  const dropZoneStyle: React.CSSProperties = {
    border: '2px dashed var(--border-color)',
    borderRadius: 10,
    padding: 40,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: 'var(--bg-input)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: 'var(--accent-blue)',
    color: 'white',
    transition: 'opacity 0.2s',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="png-to-jpg">
      <div
        ref={fileInputRef as any}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={dropZoneStyle}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileSelect(e.target.files[0]);
            }
          }}
          style={{ display: 'none' }}
        />
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
          Drag & drop your image here
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          or click to select (PNG or JPG)
        </div>
      </div>

      {error && (
        <div style={{
          padding: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          borderRadius: 6,
          color: 'rgb(239, 68, 68)',
          fontSize: 12,
          marginTop: 16,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      {originalImage && (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
              Original Image
            </div>
            <img
              src={originalImage.url}
              alt="Original"
              style={{
                maxWidth: '100%',
                maxHeight: 300,
                borderRadius: 6,
                marginBottom: 12,
                display: 'block',
              }}
            />
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <div>Size: {originalImage.size} KB</div>
              <div>Dimensions: {originalImage.width}x{originalImage.height}px</div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-primary)' }}>
              Conversion Options
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Output Format
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button
                  onClick={() => setOutputFormat('jpg')}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 6,
                    border: `2px solid ${outputFormat === 'jpg' ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    background: outputFormat === 'jpg' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  JPG
                </button>
                <button
                  onClick={() => setOutputFormat('png')}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 6,
                    border: `2px solid ${outputFormat === 'png' ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    background: outputFormat === 'png' ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  PNG
                </button>
              </div>
            </div>

            {outputFormat === 'jpg' && (
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                  Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            )}

            <button onClick={convertImage} style={buttonStyle}>
              Convert Image
            </button>
          </div>

          {convertedImage && (
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 10,
              padding: 16,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
                Converted Image
              </div>
              <img
                src={convertedImage.url}
                alt="Converted"
                style={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  borderRadius: 6,
                  marginBottom: 12,
                  display: 'block',
                }}
              />
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                <div>Size: {convertedImage.size} KB</div>
                <div>Dimensions: {convertedImage.width}x{convertedImage.height}px</div>
                <div>Saved: {Math.round((1 - convertedImage.size / originalImage.size) * 100)}%</div>
              </div>
              <button onClick={handleDownload} style={buttonStyle}>
                Download {outputFormat.toUpperCase()}
              </button>
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
