'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface IpResult {
  ip: string;
  binaryFull: string;
  binaryDotted: string;
  hex: string;
  decimal: number;
  octets: { decimal: number; binary: string; hex: string }[];
}

function parseIp(ip: string): IpResult | null {
  const trimmed = ip.trim();
  const parts = trimmed.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(p => parseInt(p, 10));
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null;

  const octets = nums.map(n => ({
    decimal: n,
    binary: n.toString(2).padStart(8, '0'),
    hex: n.toString(16).padStart(2, '0').toUpperCase(),
  }));

  const binaryFull = octets.map(o => o.binary).join('');
  const binaryDotted = octets.map(o => o.binary).join('.');
  const hex = '0x' + octets.map(o => o.hex).join('');
  const decimal = nums.reduce((acc, n, i) => acc + n * Math.pow(256, 3 - i), 0);

  return { ip: trimmed, binaryFull, binaryDotted, hex, decimal, octets };
}

function binaryToIp(binary: string): IpResult | null {
  const cleaned = binary.replace(/[\s.]/g, '');
  if (!/^[01]{32}$/.test(cleaned)) return null;

  const octets: { decimal: number; binary: string; hex: string }[] = [];
  for (let i = 0; i < 32; i += 8) {
    const bin = cleaned.substring(i, i + 8);
    const dec = parseInt(bin, 2);
    octets.push({
      decimal: dec,
      binary: bin,
      hex: dec.toString(16).padStart(2, '0').toUpperCase(),
    });
  }

  const ip = octets.map(o => o.decimal).join('.');
  const binaryFull = cleaned;
  const binaryDotted = octets.map(o => o.binary).join('.');
  const hex = '0x' + octets.map(o => o.hex).join('');
  const decimal = octets.reduce((acc, o, i) => acc + o.decimal * Math.pow(256, 3 - i), 0);

  return { ip, binaryFull, binaryDotted, hex, decimal, octets };
}

const COMMON_IPS = [
  { name: 'Localhost', ip: '127.0.0.1' },
  { name: 'Private (Class A)', ip: '10.0.0.1' },
  { name: 'Private (Class B)', ip: '172.16.0.1' },
  { name: 'Private (Class C)', ip: '192.168.1.1' },
  { name: 'Default Gateway', ip: '192.168.0.1' },
  { name: 'Google DNS', ip: '8.8.8.8' },
  { name: 'Cloudflare DNS', ip: '1.1.1.1' },
  { name: 'Broadcast', ip: '255.255.255.255' },
];

const SUBNET_MASKS = [
  { mask: '255.0.0.0', cidr: '/8', binary: '11111111.00000000.00000000.00000000' },
  { mask: '255.128.0.0', cidr: '/9', binary: '11111111.10000000.00000000.00000000' },
  { mask: '255.192.0.0', cidr: '/10', binary: '11111111.11000000.00000000.00000000' },
  { mask: '255.224.0.0', cidr: '/11', binary: '11111111.11100000.00000000.00000000' },
  { mask: '255.240.0.0', cidr: '/12', binary: '11111111.11110000.00000000.00000000' },
  { mask: '255.248.0.0', cidr: '/13', binary: '11111111.11111000.00000000.00000000' },
  { mask: '255.252.0.0', cidr: '/14', binary: '11111111.11111100.00000000.00000000' },
  { mask: '255.254.0.0', cidr: '/15', binary: '11111111.11111110.00000000.00000000' },
  { mask: '255.255.0.0', cidr: '/16', binary: '11111111.11111111.00000000.00000000' },
  { mask: '255.255.128.0', cidr: '/17', binary: '11111111.11111111.10000000.00000000' },
  { mask: '255.255.192.0', cidr: '/18', binary: '11111111.11111111.11000000.00000000' },
  { mask: '255.255.224.0', cidr: '/19', binary: '11111111.11111111.11100000.00000000' },
  { mask: '255.255.240.0', cidr: '/20', binary: '11111111.11111111.11110000.00000000' },
  { mask: '255.255.248.0', cidr: '/21', binary: '11111111.11111111.11111000.00000000' },
  { mask: '255.255.252.0', cidr: '/22', binary: '11111111.11111111.11111100.00000000' },
  { mask: '255.255.254.0', cidr: '/23', binary: '11111111.11111111.11111110.00000000' },
  { mask: '255.255.255.0', cidr: '/24', binary: '11111111.11111111.11111111.00000000' },
  { mask: '255.255.255.128', cidr: '/25', binary: '11111111.11111111.11111111.10000000' },
  { mask: '255.255.255.192', cidr: '/26', binary: '11111111.11111111.11111111.11000000' },
  { mask: '255.255.255.224', cidr: '/27', binary: '11111111.11111111.11111111.11100000' },
  { mask: '255.255.255.240', cidr: '/28', binary: '11111111.11111111.11111111.11110000' },
  { mask: '255.255.255.248', cidr: '/29', binary: '11111111.11111111.11111111.11111000' },
  { mask: '255.255.255.252', cidr: '/30', binary: '11111111.11111111.11111111.11111100' },
  { mask: '255.255.255.254', cidr: '/31', binary: '11111111.11111111.11111111.11111110' },
  { mask: '255.255.255.255', cidr: '/32', binary: '11111111.11111111.11111111.11111111' },
];

export default function IpToBinary() {
  const { dict } = useLang();
  const t = dict.tools['ip-to-binary'];

  const [mode, setMode] = useState<'ip2bin' | 'bin2ip'>('ip2bin');
  const [ipInput, setIpInput] = useState('');
  const [binInput, setBinInput] = useState('');
  const [result, setResult] = useState<IpResult | null>(null);
  const [error, setError] = useState('');

  const handleIpConvert = () => {
    setError('');
    setResult(null);
    const res = parseIp(ipInput);
    if (!res) {
      setError(t.invalidIp);
      return;
    }
    setResult(res);
  };

  const handleBinConvert = () => {
    setError('');
    setResult(null);
    const res = binaryToIp(binInput);
    if (!res) {
      setError(t.invalidBinary);
      return;
    }
    setResult(res);
  };

  const handleCommonIp = (ip: string) => {
    setIpInput(ip);
    setMode('ip2bin');
    const res = parseIp(ip);
    if (res) {
      setError('');
      setResult(res);
    }
  };

  const cellStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid var(--border-color)',
    fontSize: 13,
    color: 'var(--text-primary)',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 14,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const resultRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'var(--bg-input)',
    borderRadius: 6,
    padding: '8px 12px',
    border: '1px solid var(--border-color)',
    marginBottom: 8,
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ip-to-binary">
      {/* Mode Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => { setMode('ip2bin'); setResult(null); setError(''); }}
          className={mode === 'ip2bin' ? 'btn btn-primary' : 'btn btn-secondary'}
          style={{ fontSize: 13 }}
        >
          {t.ipToBinary}
        </button>
        <button
          onClick={() => { setMode('bin2ip'); setResult(null); setError(''); }}
          className={mode === 'bin2ip' ? 'btn btn-primary' : 'btn btn-secondary'}
          style={{ fontSize: 13 }}
        >
          {t.binaryToIp}
        </button>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 20 }}>
        {mode === 'ip2bin' ? (
          <>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.ipInput}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={ipInput}
                onChange={e => setIpInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleIpConvert()}
                placeholder={t.ipPlaceholder}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button onClick={handleIpConvert} className="btn btn-primary" style={{ flexShrink: 0 }}>
                {dict.common.convert}
              </button>
            </div>
          </>
        ) : (
          <>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.binaryInput}</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={binInput}
                onChange={e => setBinInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleBinConvert()}
                placeholder={t.binaryPlaceholder}
                style={{ ...inputStyle, flex: 1, fontFamily: 'monospace' }}
              />
              <button onClick={handleBinConvert} className="btn btn-primary" style={{ flexShrink: 0 }}>
                {dict.common.convert}
              </button>
            </div>
          </>
        )}
        {error && (
          <div style={{ marginTop: 8, color: '#ef4444', fontSize: 13 }}>{error}</div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.result}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { label: t.ipAddress, value: result.ip },
              { label: t.binaryFull, value: result.binaryFull },
              { label: t.binaryDotted, value: result.binaryDotted },
              { label: t.hexAddress, value: result.hex },
              { label: t.decimalValue, value: String(result.decimal) },
            ].map(({ label, value }) => (
              <div key={label} style={resultRowStyle}>
                <div>
                  <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700 }}>{label}: </span>
                  <code style={{ fontSize: 13, fontFamily: 'monospace' }}>{value}</code>
                </div>
                <CopyButton text={value} />
              </div>
            ))}
          </div>

          {/* Octet Breakdown */}
          <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 20, marginBottom: 10 }}>{t.octetBreakdown}</h3>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-input)' }}>
                  {[t.octet, t.decValue, t.binValue, t.hexValue].map(h => (
                    <th key={h} style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.octets.map((o, i) => (
                  <tr key={i}>
                    <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--accent)' }}>Octet {i + 1}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{o.decimal}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{o.binary}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>0x{o.hex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Common IP Addresses */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.commonAddresses}</h3>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>Name</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.ipAddress}</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.binary}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_IPS.map(item => {
                const parsed = parseIp(item.ip);
                return (
                  <tr
                    key={item.name}
                    onClick={() => handleCommonIp(item.ip)}
                    style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-input)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ ...cellStyle, fontWeight: 600 }}>{item.name}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{item.ip}</td>
                    <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 11 }}>{parsed?.binaryDotted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subnet Masks */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{t.subnetMasks}</h3>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', maxHeight: 400, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)', position: 'sticky', top: 0 }}>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.cidr}</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.mask}</th>
                <th style={{ ...cellStyle, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', color: 'var(--text-secondary)', textAlign: 'left' }}>{t.binary}</th>
              </tr>
            </thead>
            <tbody>
              {SUBNET_MASKS.map(m => (
                <tr key={m.cidr}>
                  <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>{m.cidr}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{m.mask}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace', fontSize: 11 }}>{m.binary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
