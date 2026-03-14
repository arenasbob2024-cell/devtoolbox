'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const BASE32HEX_ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUV';

const base32Encode = (str: string, useHex: boolean = false): string => {
  const alphabet = useHex ? BASE32HEX_ALPHABET : BASE32_ALPHABET;
  const bytes = new TextEncoder().encode(str);
  let bits = '';

  for (const byte of bytes) {
    bits += byte.toString(2).padStart(8, '0');
  }

  bits = bits.padEnd(Math.ceil(bits.length / 5) * 5, '0');

  let result = '';
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5);
    const index = parseInt(chunk, 2);
    result += alphabet[index];
  }

  const padding = (8 - (result.length % 8)) % 8;
  result += '='.repeat(padding);

  return result;
};

const base32Decode = (str: string, useHex: boolean = false): string => {
  const alphabet = useHex ? BASE32HEX_ALPHABET : BASE32_ALPHABET;
  str = str.replace(/=/g, '');

  let bits = '';
  for (const char of str) {
    const index = alphabet.indexOf(char.toUpperCase());
    if (index === -1) throw new Error(`Invalid character: ${char}`);
    bits += index.toString(2).padStart(5, '0');
  }

  bits = bits.slice(0, Math.floor(bits.length / 8) * 8);

  let result = '';
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
  }

  return result;
};

const isBase32 = (str: string, useHex: boolean = false): boolean => {
  const alphabet = useHex ? BASE32HEX_ALPHABET : BASE32_ALPHABET;
  const cleanStr = str.replace(/=/g, '');
  for (const char of cleanStr) {
    if (!alphabet.includes(char.toUpperCase())) {
      return false;
    }
  }
  return true;
};

export default function Base32Encoder() {
  const { dict } = useLang();
  const t = dict.tools['base32-encoder'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [useHex, setUseHex] = useState(false);
  const [error, setError] = useState('');
  const [usePadding, setUsePadding] = useState(true);

  const handleConvert = () => {
    setError('');
    setOutput('');

    if (!input.trim()) {
      setError('Input is required');
      return;
    }

    try {
      let result: string;
      if (mode === 'encode') {
        result = base32Encode(input, useHex);
        if (!usePadding) {
          result = result.replace(/=/g, '');
        }
      } else {
        if (!isBase32(input, useHex)) {
          setError('Invalid Base32 input');
          return;
        }
        result = base32Decode(input, useHex);
      }
      setOutput(result);
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setError(errorMsg);
    }
  };

  const autoDetectMode = (text: string) => {
    const cleanText = text.trim().replace(/=/g, '');
    if (cleanText && isBase32(cleanText, useHex)) {
      setMode('decode');
    } else {
      setMode('encode');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    autoDetectMode(value);
  };

  const inputCharCount = new TextEncoder().encode(input).length;
  const outputCharCount = new TextEncoder().encode(output).length;

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="base32-encoder"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary">{mode === 'encode' ? common.encode : common.decode}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="radio"
            checked={mode === 'encode'}
            onChange={() => setMode('encode')}
          />
          {common.encode}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="radio"
            checked={mode === 'decode'}
            onChange={() => setMode('decode')}
          />
          {common.decode}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={useHex}
            onChange={e => setUseHex(e.target.checked)}
          />
          Hex Variant
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={usePadding}
            onChange={e => setUsePadding(e.target.checked)}
          />
          Padding
        </label>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{common.input}</label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{inputCharCount} {common.characters}</span>
          </div>
          <textarea
            value={input}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base32 to decode...'}
            style={{ minHeight: 120 }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{common.output}</label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{outputCharCount} {common.characters}</span>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            style={{ minHeight: 120, background: 'var(--bg-secondary)' }}
          />
          {output && <CopyButton text={output} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
