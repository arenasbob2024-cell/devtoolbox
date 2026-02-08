'use client';

import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';

export default function QrcodeGenerator() {
  const [text, setText] = useState('https://devtoolbox.dev');
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = async () => {
    if (!text.trim()) return;
    try {
      const QRCode = (await import('qrcode')).default;
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(dataUrl);
    } catch {
      setQrDataUrl('');
    }
  };

  const download = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes from text, URLs, or any data. Download as PNG image."
      toolId="qrcode-generator"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Content</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text, URL, or any data..."
            style={{ minHeight: 150 }}
          />

          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Size:</label>
            <select value={size} onChange={e => setSize(Number(e.target.value))}
              style={{ width: 'auto', padding: '6px 10px', fontSize: 12 }}>
              <option value={128}>128px</option>
              <option value={256}>256px</option>
              <option value={512}>512px</option>
              <option value={1024}>1024px</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={generate} className="btn btn-primary" style={{ flex: 1 }}>Generate QR Code</button>
            {qrDataUrl && (
              <button onClick={download} className="btn btn-success">Download PNG</button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '100%', borderRadius: 8, background: 'white', padding: 12 }} />
          ) : (
            <div style={{
              width: 256, height: 256, borderRadius: 12,
              border: '2px dashed var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', fontSize: 14,
            }}>
              QR Code Preview
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About QR Codes</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          QR (Quick Response) codes are two-dimensional barcodes that can store URLs, text, contact info, and more. They can be scanned by any smartphone camera. This tool generates QR codes with error correction for reliable scanning.
        </p>
      </div>
    </ToolLayout>
  );
}
