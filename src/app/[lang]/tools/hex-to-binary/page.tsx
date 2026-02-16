'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ConversionResult {
  hex: string;
  binary: string;
  grouped: string;
  decimal: string;
  octal: string;
  error: string;
}

const EMPTY_RESULT: ConversionResult = { hex: '', binary: '', grouped: '', decimal: '', octal: '', error: '' };

const COMMON_VALUES = [
  { hex: '0', bin: '0000' },
  { hex: '1', bin: '0001' },
  { hex: '2', bin: '0010' },
  { hex: '3', bin: '0011' },
  { hex: '4', bin: '0100' },
  { hex: '5', bin: '0101' },
  { hex: '6', bin: '0110' },
  { hex: '7', bin: '0111' },
  { hex: '8', bin: '1000' },
  { hex: '9', bin: '1001' },
  { hex: 'A', bin: '1010' },
  { hex: 'B', bin: '1011' },
  { hex: 'C', bin: '1100' },
  { hex: 'D', bin: '1101' },
  { hex: 'E', bin: '1110' },
  { hex: 'F', bin: '1111' },
  { hex: 'FF', bin: '1111 1111' },
  { hex: '100', bin: '0001 0000 0000' },
  { hex: 'FFFF', bin: '1111 1111 1111 1111' },
];

function groupBinary(bin: string): string {
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, '0');
  const groups: string[] = [];
  for (let i = 0; i < padded.length; i += 4) {
    groups.push(padded.slice(i, i + 4));
  }
  return groups.join(' ');
}

export default function HexToBinary() {
  const { dict } = useLang();
  const t = dict.tools['hex-to-binary'];

  const [hexInput, setHexInput] = useState('');
  const [binaryInput, setBinaryInput] = useState('');
  const [hexResult, setHexResult] = useState<ConversionResult>(EMPTY_RESULT);
  const [binResult, setBinResult] = useState<ConversionResult>(EMPTY_RESULT);

  const convertHex = useCallback((value: string) => {
    setHexInput(value);
    const cleaned = value.trim().replace(/^0x/i, '').replace(/\s/g, '');
    if (!cleaned) { setHexResult(EMPTY_RESULT); return; }
    if (!/^[0-9A-Fa-f]+$/.test(cleaned)) {
      setHexResult({ ...EMPTY_RESULT, error: t.invalidHex });
      return;
    }
    try {
      const num = BigInt('0x' + cleaned);
      const binary = num.toString(2);
      setHexResult({
        hex: cleaned.toUpperCase(),
        binary,
        grouped: groupBinary(binary),
        decimal: num.toString(10),
        octal: num.toString(8),
        error: '',
      });
    } catch {
      setHexResult({ ...EMPTY_RESULT, error: t.invalidHex });
    }
  }, [t]);

  const convertBinary = useCallback((value: string) => {
    setBinaryInput(value);
    const cleaned = value.trim().replace(/[\s_]/g, '');
    if (!cleaned) { setBinResult(EMPTY_RESULT); return; }
    if (!/^[01]+$/.test(cleaned)) {
      setBinResult({ ...EMPTY_RESULT, error: t.invalidBinary });
      return;
    }
    try {
      const num = BigInt('0b' + cleaned);
      const hex = num.toString(16).toUpperCase();
      setHexResult(EMPTY_RESULT); // don't conflict
      setBinResult({
        hex,
        binary: cleaned,
        grouped: groupBinary(cleaned),
        decimal: num.toString(10),
        octal: num.toString(8),
        error: '',
      });
    } catch {
      setBinResult({ ...EMPTY_RESULT, error: t.invalidBinary });
    }
  }, [t]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const inputFieldStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: 14, fontFamily: 'monospace',
    backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)',
    borderRadius: 6, color: 'var(--text-primary)', boxSizing: 'border-box' as const, outline: 'none',
  };
  const sectionStyle: React.CSSProperties = {
    padding: 20, backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)',
    borderRadius: 8, marginBottom: 16,
  };
  const resultBoxStyle: React.CSSProperties = {
    padding: '10px 14px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)',
    borderRadius: 6, fontSize: 14, fontFamily: 'monospace', color: 'var(--text-primary)',
    wordBreak: 'break-all' as const, minHeight: 40, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 8,
  };
  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 13, marginTop: 8 };
  const cellStyle: React.CSSProperties = {
    padding: '6px 12px', borderBottom: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-primary)',
  };
  const thStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)', textAlign: 'left' as const, borderBottom: '2px solid var(--border-color)',
  };

  const renderResults = (result: ConversionResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.hex) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.hexValue}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>0x{result.hex}</span>
            <CopyButton text={'0x' + result.hex} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.binaryValue}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.binary}</span>
            <CopyButton text={result.binary} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.grouped}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.grouped}</span>
            <CopyButton text={result.grouped} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.decimalValue}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.decimal}</span>
            <CopyButton text={result.decimal} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.octalValue}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.octal}</span>
            <CopyButton text={result.octal} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="hex-to-binary">
      {/* Two panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Hex to Binary */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.hexToBinary}</label>
          <input
            type="text"
            value={hexInput}
            onChange={e => convertHex(e.target.value)}
            placeholder={t.hexPlaceholder}
            style={inputFieldStyle}
          />
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            0x prefix is automatically stripped
          </p>
          {renderResults(hexResult)}
        </div>

        {/* Binary to Hex */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.binaryToHex}</label>
          <input
            type="text"
            value={binaryInput}
            onChange={e => convertBinary(e.target.value)}
            placeholder={t.binaryPlaceholder}
            style={inputFieldStyle}
          />
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            Spaces and underscores are ignored
          </p>
          {renderResults(binResult)}
        </div>
      </div>

      {/* Common Hex-Binary Values Reference Table */}
      <div style={sectionStyle}>
        <label style={labelStyle}>{t.commonValues}</label>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={thStyle}>{t.hexValue}</th>
                <th style={thStyle}>{t.binaryValue}</th>
                <th style={thStyle}>{t.decimalValue}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_VALUES.map(v => {
                const dec = parseInt(v.hex, 16);
                return (
                  <tr key={v.hex} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ ...cellStyle, fontWeight: 600, color: 'var(--accent)' }}>0x{v.hex}</td>
                    <td style={cellStyle}>{v.bin}</td>
                    <td style={{ ...cellStyle, color: 'var(--text-secondary)' }}>{dec}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
