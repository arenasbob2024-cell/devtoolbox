'use client';

import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type OutputFormat = 'decimal' | 'hex' | 'binary' | 'octal';

// Full ASCII table data (0-127)
const ASCII_TABLE: { code: number; char: string; desc: string }[] = [];
const CONTROL_DESCS: Record<number, string> = {
  0: 'NUL (Null)', 1: 'SOH (Start of Heading)', 2: 'STX (Start of Text)', 3: 'ETX (End of Text)',
  4: 'EOT (End of Transmission)', 5: 'ENQ (Enquiry)', 6: 'ACK (Acknowledge)', 7: 'BEL (Bell)',
  8: 'BS (Backspace)', 9: 'HT (Horizontal Tab)', 10: 'LF (Line Feed)', 11: 'VT (Vertical Tab)',
  12: 'FF (Form Feed)', 13: 'CR (Carriage Return)', 14: 'SO (Shift Out)', 15: 'SI (Shift In)',
  16: 'DLE (Data Link Escape)', 17: 'DC1 (Device Control 1)', 18: 'DC2 (Device Control 2)',
  19: 'DC3 (Device Control 3)', 20: 'DC4 (Device Control 4)', 21: 'NAK (Negative Acknowledge)',
  22: 'SYN (Synchronous Idle)', 23: 'ETB (End of Trans. Block)', 24: 'CAN (Cancel)',
  25: 'EM (End of Medium)', 26: 'SUB (Substitute)', 27: 'ESC (Escape)',
  28: 'FS (File Separator)', 29: 'GS (Group Separator)', 30: 'RS (Record Separator)',
  31: 'US (Unit Separator)', 32: 'Space', 127: 'DEL (Delete)',
};
for (let i = 0; i <= 127; i++) {
  const isControl = i < 32 || i === 127;
  ASCII_TABLE.push({
    code: i,
    char: isControl ? (i === 32 ? '(space)' : '') : String.fromCharCode(i),
    desc: CONTROL_DESCS[i] || (isControl ? `Control char ${i}` : String.fromCharCode(i)),
  });
}

function toFormat(code: number, fmt: OutputFormat): string {
  switch (fmt) {
    case 'decimal': return code.toString();
    case 'hex': return '0x' + code.toString(16).toUpperCase().padStart(2, '0');
    case 'binary': return code.toString(2).padStart(8, '0');
    case 'octal': return '0o' + code.toString(8).padStart(3, '0');
  }
}

export default function AsciiTextConverter() {
  const { dict } = useLang();
  const t = dict.tools['ascii-text-converter'];

  const [textInput, setTextInput] = useState('');
  const [asciiInput, setAsciiInput] = useState('');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('decimal');
  const [textResult, setTextResult] = useState('');
  const [asciiResult, setAsciiResult] = useState('');
  const [textError, setTextError] = useState('');
  const [asciiError, setAsciiError] = useState('');
  const [tableFilter, setTableFilter] = useState('');
  const [showControl, setShowControl] = useState(true);
  const [showPrintable, setShowPrintable] = useState(true);

  const convertTextToAscii = useCallback((text: string, fmt: OutputFormat) => {
    setTextInput(text);
    setTextError('');
    if (!text) { setTextResult(''); return; }
    const codes: string[] = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code > 127) {
        codes.push(`[${code}]`);
      } else {
        codes.push(toFormat(code, fmt));
      }
    }
    setTextResult(codes.join(' '));
  }, []);

  const convertAsciiToText = useCallback((input: string) => {
    setAsciiInput(input);
    setAsciiError('');
    if (!input.trim()) { setAsciiResult(''); return; }
    try {
      const parts = input.trim().split(/[\s,]+/);
      const chars: string[] = [];
      for (const part of parts) {
        if (!part) continue;
        let num: number;
        const p = part.toLowerCase();
        if (p.startsWith('0x')) {
          num = parseInt(p, 16);
        } else if (p.startsWith('0b')) {
          num = parseInt(p.slice(2), 2);
        } else if (p.startsWith('0o')) {
          num = parseInt(p.slice(2), 8);
        } else if (/^[01]{4,}$/.test(p)) {
          num = parseInt(p, 2);
        } else {
          num = parseInt(p, 10);
        }
        if (isNaN(num) || num < 0 || num > 127) {
          setAsciiError(t.invalidAscii + `: "${part}"`);
          setAsciiResult('');
          return;
        }
        chars.push(String.fromCharCode(num));
      }
      setAsciiResult(chars.join(''));
    } catch {
      setAsciiError(t.invalidAscii);
      setAsciiResult('');
    }
  }, [t]);

  const filteredTable = useMemo(() => {
    let entries = ASCII_TABLE;
    if (!showControl) entries = entries.filter(e => e.code >= 32 && e.code !== 127);
    if (!showPrintable) entries = entries.filter(e => e.code < 32 || e.code === 127);
    if (tableFilter) {
      const q = tableFilter.toLowerCase();
      entries = entries.filter(e =>
        e.char.toLowerCase().includes(q) ||
        e.desc.toLowerCase().includes(q) ||
        e.code.toString().includes(q) ||
        e.code.toString(16).includes(q)
      );
    }
    return entries;
  }, [tableFilter, showControl, showPrintable]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const inputStyle: React.CSSProperties = {
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
  const cellStyle: React.CSSProperties = {
    padding: '6px 12px', borderBottom: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-primary)',
  };
  const thStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)', textAlign: 'left' as const, borderBottom: '2px solid var(--border-color)',
  };
  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 13, marginTop: 8 };
  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
    borderRadius: 6, background: active ? 'var(--accent)' : 'var(--bg-input)',
    color: active ? 'white' : 'var(--text-secondary)', transition: 'all 0.2s',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border-color)'}`,
  });

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="ascii-text-converter">
      {/* Two conversion panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Text to ASCII */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.textToAscii}</label>
          <textarea
            value={textInput}
            onChange={e => convertTextToAscii(e.target.value, outputFormat)}
            placeholder={t.textPlaceholder}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' as const }}
          />
          <div style={{ marginTop: 10 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'block' }}>{t.outputFormat}</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['decimal', 'hex', 'binary', 'octal'] as OutputFormat[]).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => { setOutputFormat(fmt); convertTextToAscii(textInput, fmt); }}
                  style={toggleBtnStyle(outputFormat === fmt)}
                >
                  {(t as Record<string, string>)[fmt] || fmt}
                </button>
              ))}
            </div>
          </div>
          {textResult && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.result}</label>
              <div style={resultBoxStyle}>
                <span style={{ flex: 1 }}>{textResult}</span>
                <CopyButton text={textResult} />
              </div>
            </div>
          )}
          {textError && <p style={errorStyle}>{textError}</p>}
        </div>

        {/* ASCII to Text */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.asciiToText}</label>
          <textarea
            value={asciiInput}
            onChange={e => convertAsciiToText(e.target.value)}
            placeholder={t.asciiPlaceholder}
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' as const }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            Supports decimal, hex (0x..), binary (0b.. or 8+ bits), octal (0o..)
          </p>
          {asciiResult && (
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.result}</label>
              <div style={resultBoxStyle}>
                <span style={{ flex: 1 }}>{asciiResult}</span>
                <CopyButton text={asciiResult} />
              </div>
            </div>
          )}
          {asciiError && <p style={errorStyle}>{asciiError}</p>}
        </div>
      </div>

      {/* ASCII Reference Table */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <label style={{ ...labelStyle, marginBottom: 0 }}>{t.asciiTable}</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={tableFilter}
              onChange={e => setTableFilter(e.target.value)}
              placeholder="Filter..."
              style={{ ...inputStyle, width: 150, fontSize: 12, padding: '6px 10px' }}
            />
            <button onClick={() => setShowControl(!showControl)} style={toggleBtnStyle(showControl)}>
              {t.control}
            </button>
            <button onClick={() => setShowPrintable(!showPrintable)} style={toggleBtnStyle(showPrintable)}>
              {t.printable}
            </button>
          </div>
        </div>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', maxHeight: 500, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-input)', zIndex: 1 }}>
              <tr>
                <th style={thStyle}>{t.decValue}</th>
                <th style={thStyle}>{t.hexValue}</th>
                <th style={thStyle}>{t.binValue}</th>
                <th style={thStyle}>{t.character}</th>
                <th style={{ ...thStyle, fontFamily: 'inherit' }}>{t.description2}</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map(entry => (
                <tr key={entry.code} style={{ transition: 'background 0.1s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-input)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <td style={cellStyle}>{entry.code}</td>
                  <td style={cellStyle}>{entry.code.toString(16).toUpperCase().padStart(2, '0')}</td>
                  <td style={cellStyle}>{entry.code.toString(2).padStart(8, '0')}</td>
                  <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--accent)', fontSize: 15, textAlign: 'center' as const }}>
                    {entry.code >= 33 && entry.code <= 126 ? String.fromCharCode(entry.code) : ''}
                  </td>
                  <td style={{ ...cellStyle, fontFamily: 'inherit', color: 'var(--text-secondary)' }}>{entry.desc}</td>
                </tr>
              ))}
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
