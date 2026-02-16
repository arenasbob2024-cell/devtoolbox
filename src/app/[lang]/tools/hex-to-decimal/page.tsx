'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ConversionResult {
  decimal: string;
  hex: string;
  binary: string;
  octal: string;
  error: string;
}

const COMMON_HEX_VALUES = [
  { hex: '0', dec: '0' },
  { hex: '1', dec: '1' },
  { hex: 'A', dec: '10' },
  { hex: 'F', dec: '15' },
  { hex: '10', dec: '16' },
  { hex: 'FF', dec: '255' },
  { hex: '100', dec: '256' },
  { hex: '3E8', dec: '1000' },
  { hex: 'FFF', dec: '4095' },
  { hex: 'FFFF', dec: '65535' },
  { hex: '7FFFFFFF', dec: '2147483647' },
  { hex: 'FFFFFFFF', dec: '4294967295' },
];

function isValidHexColor(hex: string): boolean {
  return /^[0-9A-Fa-f]{6}$/.test(hex);
}

export default function HexToDecimal() {
  const { dict } = useLang();
  const t = dict.tools['hex-to-decimal'];

  const [hexInput, setHexInput] = useState('');
  const [decInput, setDecInput] = useState('');
  const [hexResult, setHexResult] = useState<ConversionResult>({ decimal: '', hex: '', binary: '', octal: '', error: '' });
  const [decResult, setDecResult] = useState<ConversionResult>({ decimal: '', hex: '', binary: '', octal: '', error: '' });

  const convertHex = useCallback((value: string) => {
    setHexInput(value);
    const cleaned = value.trim().replace(/^0x/i, '');
    if (!cleaned) {
      setHexResult({ decimal: '', hex: '', binary: '', octal: '', error: '' });
      return;
    }
    if (!/^[0-9A-Fa-f]+$/.test(cleaned)) {
      setHexResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidHex || 'Invalid hexadecimal value' });
      return;
    }
    try {
      const num = BigInt('0x' + cleaned);
      setHexResult({
        decimal: num.toString(10),
        hex: cleaned.toUpperCase(),
        binary: num.toString(2),
        octal: num.toString(8),
        error: '',
      });
    } catch {
      setHexResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidHex || 'Invalid hexadecimal value' });
    }
  }, [t]);

  const convertDec = useCallback((value: string) => {
    setDecInput(value);
    const cleaned = value.trim();
    if (!cleaned) {
      setDecResult({ decimal: '', hex: '', binary: '', octal: '', error: '' });
      return;
    }
    if (!/^[0-9]+$/.test(cleaned)) {
      setDecResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidDecimal || 'Invalid decimal value' });
      return;
    }
    try {
      const num = BigInt(cleaned);
      setDecResult({
        decimal: num.toString(10),
        hex: num.toString(16).toUpperCase(),
        binary: num.toString(2),
        octal: num.toString(8),
        error: '',
      });
    } catch {
      setDecResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidDecimal || 'Invalid decimal value' });
    }
  }, [t]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const resultBoxStyle: React.CSSProperties = {
    padding: '10px 14px',
    backgroundColor: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    fontSize: 14,
    fontFamily: 'monospace',
    color: 'var(--text-primary)',
    wordBreak: 'break-all',
    minHeight: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  };
  const sectionStyle: React.CSSProperties = {
    padding: 20,
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    marginBottom: 16,
  };
  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 13, marginTop: 6 };

  const renderResults = (result: ConversionResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.decimal && !result.hex) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.hexValue || 'Hex'}</label>
          <div style={resultBoxStyle}>
            <span>{result.hex}</span>
            <CopyButton text={result.hex} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.decimalValue || 'Decimal'}</label>
          <div style={resultBoxStyle}>
            <span>{result.decimal}</span>
            <CopyButton text={result.decimal} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.binaryValue || 'Binary'}</label>
          <div style={resultBoxStyle}>
            <span>{result.binary}</span>
            <CopyButton text={result.binary} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.octalValue || 'Octal'}</label>
          <div style={resultBoxStyle}>
            <span>{result.octal}</span>
            <CopyButton text={result.octal} />
          </div>
        </div>
      </div>
    );
  };

  const hexClean = hexInput.trim().replace(/^0x/i, '');
  const showColor = isValidHexColor(hexClean);

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="hex-to-decimal">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Hex to Decimal */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.hexToDecimal || 'Hex to Decimal'}</label>
          <input
            type="text"
            value={hexInput}
            onChange={e => convertHex(e.target.value)}
            placeholder={t.hexPlaceholder || 'Enter hex value (e.g., FF, 1A3F)'}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: 'monospace',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: 'var(--text-primary)',
              boxSizing: 'border-box',
            }}
          />
          {showColor && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.colorPreview || 'Color Preview'}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 6,
                  backgroundColor: '#' + hexClean,
                  border: '1px solid var(--border-color)',
                  flexShrink: 0,
                }} />
                <span style={{ fontFamily: 'monospace', fontSize: 14, color: 'var(--text-secondary)' }}>#{hexClean.toUpperCase()}</span>
              </div>
            </div>
          )}
          {renderResults(hexResult)}
        </div>

        {/* Decimal to Hex */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.decimalToHex || 'Decimal to Hex'}</label>
          <input
            type="text"
            value={decInput}
            onChange={e => convertDec(e.target.value)}
            placeholder={t.decimalPlaceholder || 'Enter decimal value (e.g., 255, 6719)'}
            style={{
              width: '100%',
              padding: '10px 14px',
              fontSize: 14,
              fontFamily: 'monospace',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: 'var(--text-primary)',
              boxSizing: 'border-box',
            }}
          />
          {renderResults(decResult)}
        </div>
      </div>

      {/* Common Hex Values Reference Table */}
      <div style={{ ...sectionStyle, marginTop: 8 }}>
        <label style={labelStyle}>{t.commonValues || 'Common Hex Values'}</label>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'monospace' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.hexValue || 'Hex'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.decimalValue || 'Decimal'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.binaryValue || 'Binary'}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_HEX_VALUES.map(v => (
                <tr key={v.hex} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{v.hex}</td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{v.dec}</td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{BigInt(v.dec).toString(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
