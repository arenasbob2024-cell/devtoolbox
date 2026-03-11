'use client';

import { useState, useRef, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function QrCodeGenerator() {
  const { dict } = useLang();
  const t = dict.tools['qr-code-generator'];
  const [text, setText] = useState('https://viadreams.cc');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');

  // QR Code generation using canvas (simple implementation)
  const generateQR = () => {
    if (!text.trim()) return;
    // Use Google Charts API for QR generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;
    setQrDataUrl(qrUrl);
  };

  useEffect(() => {
    generateQR();
  }, [text, size, fgColor, bgColor]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    link.target = '_blank';
    link.click();
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="qr-code-generator"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={generateQR} className="btn btn-primary">{t.generateBtn}</button>
        <button onClick={downloadQR} className="btn btn-secondary">{t.downloadBtn}</button>
        <button onClick={() => { setText(''); setQrDataUrl(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Input */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t.inputPlaceholder}
              style={{ minHeight: 120 }}
            />
          </div>

          {/* Size */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.sizeLabel}: {size}px
            </label>
            <input
              type="range"
              min="128"
              max="512"
              step="64"
              value={size}
              onChange={e => setSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          {/* Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.fgColorLabel}</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} style={{ width: 40, height: 32 }} />
                <input type="text" value={fgColor} onChange={e => setFgColor(e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.bgColorLabel}</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 40, height: 32 }} />
                <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ flex: 1 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: bgColor,
            padding: 20,
            borderRadius: 12,
            border: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code"
                width={size}
                height={size}
                style={{ imageRendering: 'pixelated' }}
              />
            ) : (
              <div style={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontSize: 14,
              }}>
                {t.previewPlaceholder}
              </div>
            )}
          </div>
          {qrDataUrl && (
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-secondary)' }}>
              {size}x{size}px
            </div>
          )}
        </div>
      </div>

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
