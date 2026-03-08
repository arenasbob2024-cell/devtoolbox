'use client';

import { useState, useRef, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';
import QRCode from 'qrcode';

type Encryption = 'WPA' | 'WEP' | 'nopass';

export default function WifiQrGeneratorTool() {
  const { dict } = useLang();
  const t = dict.tools['wifi-qr-generator'];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<Encryption>('WPA');
  const [hidden, setHidden] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  const generateQR = async () => {
    setError('');
    if (!ssid.trim()) {
      setError(t.ssidRequired || 'SSID (Network Name) is required');
      return;
    }
    // Build WIFI string: WIFI:T:<type>;S:<ssid>;P:<password>;H:<hidden>;;
    const escapeSpecial = (s: string) => s.replace(/[\\;,:]/g, (c) => '\\' + c);
    const wifiString = `WIFI:T:${encryption};S:${escapeSpecial(ssid)};P:${escapeSpecial(password)};H:${hidden ? 'true' : 'false'};;`;

    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, wifiString, {
          width: 300,
          margin: 2,
          color: { dark: '#000000', light: '#ffffff' },
          errorCorrectionLevel: 'M',
        });
        setGenerated(true);
      }
    } catch (e: unknown) {
      setError(t.generationError || `QR generation error: ${e instanceof Error ? e.message : 'Unknown'}`);
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `wifi-${ssid || 'network'}-qr.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="wifi-qr-generator">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left: Form */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.ssidLabel || 'Network Name (SSID)'}
            </label>
            <input
              type="text"
              value={ssid}
              onChange={e => setSsid(e.target.value)}
              placeholder={t.ssidPlaceholder || 'Enter WiFi network name'}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 8,
                border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                fontSize: 14, color: 'var(--text-primary)',
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.passwordLabel || 'Password'}
            </label>
            <input
              type="text"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={encryption === 'nopass' ? (t.noPasswordNeeded || 'No password needed') : (t.passwordPlaceholder || 'Enter WiFi password')}
              disabled={encryption === 'nopass'}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 8,
                border: '1px solid var(--border-color)', background: 'var(--bg-input)',
                fontSize: 14, color: 'var(--text-primary)',
                opacity: encryption === 'nopass' ? 0.5 : 1,
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.encryptionLabel || 'Encryption Type'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['WPA', 'WEP', 'nopass'] as Encryption[]).map(enc => (
                <button
                  key={enc}
                  onClick={() => { setEncryption(enc); if (enc === 'nopass') setPassword(''); }}
                  style={{
                    padding: '8px 20px', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    background: encryption === enc ? 'var(--accent-blue)' : 'var(--bg-input)',
                    color: encryption === enc ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${encryption === enc ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {enc === 'nopass' ? (t.noEncryption || 'None') : enc}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hidden}
                onChange={e => setHidden(e.target.checked)}
                style={{ width: 16, height: 16 }}
              />
              {t.hiddenNetwork || 'Hidden Network'}
            </label>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={generateQR} className="btn btn-primary" style={{ flex: 1 }}>
              {t.generateBtn || 'Generate QR Code'}
            </button>
            {generated && (
              <button onClick={downloadQR} className="btn btn-secondary">
                {t.downloadBtn || 'Download PNG'}
              </button>
            )}
          </div>

          {error && (
            <div style={{
              background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: 8, padding: '10px 14px', marginTop: 12, fontSize: 13, color: 'var(--accent-rose)',
            }}>
              ✕ {error}
            </div>
          )}
        </div>

        {/* Right: QR Preview */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)',
          minHeight: 380, padding: 24,
        }}>
          <canvas ref={canvasRef} style={{ display: generated ? 'block' : 'none', borderRadius: 8, background: 'white', padding: 16 }} />
          {!generated && (
            <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 14 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📶</div>
              <p>{t.previewPlaceholder || 'Fill in your WiFi details and click Generate to create a QR code'}</p>
            </div>
          )}
          {generated && ssid && (
            <p style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
              {ssid} ({encryption})
            </p>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About WiFi QR Code Generator'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Generate QR codes for WiFi networks that allow anyone to connect instantly by scanning with their phone camera. Supports WPA/WPA2, WEP, and open networks. The QR code contains the SSID, password, and encryption type in a standard format recognized by iOS and Android devices.'}
        </p>
      </div>
    </ToolLayout>
  );
}
