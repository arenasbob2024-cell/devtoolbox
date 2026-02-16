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

const COMMON_OCTAL_VALUES = [
  { octal: '0', dec: '0' },
  { octal: '7', dec: '7' },
  { octal: '10', dec: '8' },
  { octal: '17', dec: '15' },
  { octal: '77', dec: '63' },
  { octal: '100', dec: '64' },
  { octal: '177', dec: '127' },
  { octal: '377', dec: '255' },
  { octal: '777', dec: '511' },
  { octal: '1000', dec: '512' },
  { octal: '7777', dec: '4095' },
  { octal: '177777', dec: '65535' },
];

export default function OctalDecimalConverter() {
  const { dict } = useLang();
  const t = dict.tools['octal-decimal-converter'];

  const [octalInput, setOctalInput] = useState('');
  const [decInput, setDecInput] = useState('');
  const [octalResult, setOctalResult] = useState<ConversionResult>({ decimal: '', hex: '', binary: '', octal: '', error: '' });
  const [decResult, setDecResult] = useState<ConversionResult>({ decimal: '', hex: '', binary: '', octal: '', error: '' });

  const convertOctal = useCallback((value: string) => {
    setOctalInput(value);
    const cleaned = value.trim().replace(/^0o/i, '');
    if (!cleaned) {
      setOctalResult({ decimal: '', hex: '', binary: '', octal: '', error: '' });
      return;
    }
    if (!/^[0-7]+$/.test(cleaned)) {
      setOctalResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidOctal || 'Invalid octal value (digits 0-7 only)' });
      return;
    }
    try {
      const num = BigInt('0o' + cleaned);
      setOctalResult({
        decimal: num.toString(10),
        hex: num.toString(16).toUpperCase(),
        binary: num.toString(2),
        octal: cleaned,
        error: '',
      });
    } catch {
      setOctalResult({ decimal: '', hex: '', binary: '', octal: '', error: t.invalidOctal || 'Invalid octal value (digits 0-7 only)' });
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

  const renderOctalResults = (result: ConversionResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.decimal && !result.octal) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.decimalValue || 'Decimal'}</label>
          <div style={resultBoxStyle}>
            <span>{result.decimal}</span>
            <CopyButton text={result.decimal} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.hexValue || 'Hex'}</label>
          <div style={resultBoxStyle}>
            <span>{result.hex}</span>
            <CopyButton text={result.hex} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.binaryValue || 'Binary'}</label>
          <div style={resultBoxStyle}>
            <span>{result.binary}</span>
            <CopyButton text={result.binary} />
          </div>
        </div>
      </div>
    );
  };

  const renderDecResults = (result: ConversionResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.decimal && !result.octal) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.octalValue || 'Octal'}</label>
          <div style={resultBoxStyle}>
            <span>{result.octal}</span>
            <CopyButton text={result.octal} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.hexValue || 'Hex'}</label>
          <div style={resultBoxStyle}>
            <span>{result.hex}</span>
            <CopyButton text={result.hex} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.binaryValue || 'Binary'}</label>
          <div style={resultBoxStyle}>
            <span>{result.binary}</span>
            <CopyButton text={result.binary} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="octal-decimal-converter">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Octal to Decimal */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.octalToDecimal || 'Octal \u2192 Decimal'}</label>
          <input
            type="text"
            value={octalInput}
            onChange={e => convertOctal(e.target.value)}
            placeholder={t.octalPlaceholder || 'Enter octal value (e.g., 377, 1750)'}
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
          {renderOctalResults(octalResult)}
        </div>

        {/* Decimal to Octal */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.decimalToOctal || 'Decimal \u2192 Octal'}</label>
          <input
            type="text"
            value={decInput}
            onChange={e => convertDec(e.target.value)}
            placeholder={t.decimalPlaceholder || 'Enter decimal value (e.g., 255, 1000)'}
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
          {renderDecResults(decResult)}
        </div>
      </div>

      {/* Common Octal Values Reference Table */}
      <div style={{ ...sectionStyle, marginTop: 8 }}>
        <label style={labelStyle}>{t.commonValues || 'Common Octal Values'}</label>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'monospace' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.octalValue || 'Octal'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.decimalValue || 'Decimal'}</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 12 }}>{t.binaryValue || 'Binary'}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_OCTAL_VALUES.map(v => (
                <tr key={v.octal} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{v.octal}</td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-primary)' }}>{v.dec}</td>
                  <td style={{ padding: '6px 12px', color: 'var(--text-secondary)' }}>{BigInt(v.dec).toString(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ ...sectionStyle, marginTop: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, marginTop: 0 }}>{t.seoTitle || 'Octal Decimal Converter Online'}</h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>{t.seoContent || 'This octal decimal converter tool allows you to easily convert between octal (base-8) and decimal (base-10) number systems. Enter an octal value to see its decimal, hexadecimal, and binary equivalents instantly, or input a decimal number to get the octal representation. The tool supports arbitrarily large numbers using BigInt and includes a handy reference table of common octal values. Octal numbers are widely used in Unix/Linux file permissions (chmod), legacy computing systems, and low-level programming. All processing happens in your browser — your data never leaves your device.'}</p>
      </div>
    </ToolLayout>
  );
}
