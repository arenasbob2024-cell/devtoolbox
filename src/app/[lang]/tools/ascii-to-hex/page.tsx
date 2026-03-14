'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function textToHex(text: string, separator: string, prefix: string, uppercase: boolean): string {
  const hex = Array.from(text)
    .map(char => {
      const code = char.charCodeAt(0).toString(16).padStart(2, '0');
      return uppercase ? code.toUpperCase() : code;
    })
    .join(separator);

  if (prefix === 'none') return hex;
  if (prefix === '0x') return Array.from(text).map((char, i) => {
    const code = char.charCodeAt(0).toString(16).padStart(2, '0');
    return '0x' + (uppercase ? code.toUpperCase() : code);
  }).join(separator);
  if (prefix === '\\x') return Array.from(text).map((char) => {
    const code = char.charCodeAt(0).toString(16).padStart(2, '0');
    return '\\x' + (uppercase ? code.toUpperCase() : code);
  }).join('');
  return hex;
}

function hexToText(hex: string): string {
  const cleanHex = hex.replace(/0x|\\x|,|\s/g, '').match(/.{1,2}/g) || [];
  return cleanHex
    .map(byte => String.fromCharCode(parseInt(byte, 16)))
    .join('');
}

export default function AsciiToHex() {
  const { dict } = useLang();
  const t = dict.tools['ascii-to-hex'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'text-to-hex' | 'hex-to-text'>('text-to-hex');
  const [separator, setSeparator] = useState('space');
  const [prefix, setPrefix] = useState('none');
  const [uppercase, setUppercase] = useState(false);

  const convert = () => {
    try {
      if (mode === 'text-to-hex') {
        const sep = separator === 'space' ? ' ' : separator === 'comma' ? ',' : '';
        setOutput(textToHex(input, sep, prefix, uppercase));
      } else {
        setOutput(hexToText(input));
      }
    } catch (e: unknown) {
      setOutput('Error: Invalid input');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    try {
      if (mode === 'text-to-hex') {
        const sep = separator === 'space' ? ' ' : separator === 'comma' ? ',' : '';
        setOutput(textToHex(value, sep, prefix, uppercase));
      } else {
        setOutput(hexToText(value));
      }
    } catch {
      setOutput('');
    }
  };

  const byteCount = mode === 'text-to-hex' ? input.length : input.replace(/0x|\\x|,|\s/g, '').length / 2;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="ascii-to-hex"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={mode}
          onChange={e => setMode(e.target.value as 'text-to-hex' | 'hex-to-text')}
          style={{ padding: '6px 10px', fontSize: 13 }}
        >
          <option value="text-to-hex">{t.textToHex}</option>
          <option value="hex-to-text">{t.hexToText}</option>
        </select>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>

        {mode === 'text-to-hex' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.separator}:</label>
              <select
                value={separator}
                onChange={e => setSeparator(e.target.value)}
                style={{ padding: '4px 8px', fontSize: 12 }}
              >
                <option value="space">{t.space}</option>
                <option value="none">{t.none}</option>
                <option value="comma">{t.comma}</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.prefix}:</label>
              <select
                value={prefix}
                onChange={e => setPrefix(e.target.value)}
                style={{ padding: '4px 8px', fontSize: 12 }}
              >
                <option value="none">{t.none}</option>
                <option value="0x">0x</option>
                <option value="\\x">\\x</option>
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={e => setUppercase(e.target.checked)}
              />
              {t.uppercase}
            </label>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
        <span>{t.byteCount}: {Math.floor(byteCount)}</span>
        {mode === 'text-to-hex' && <span>{t.charCount}: {input.length}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={mode === 'text-to-hex' ? t.inputPlaceholder : t.hexPlaceholder}
            style={{ minHeight: 300 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 300, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

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
