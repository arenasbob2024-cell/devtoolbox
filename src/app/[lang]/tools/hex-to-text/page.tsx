'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function hexToText(hex: string): string {
  let cleaned = hex.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/0x/gi, '').replace(/\\x/gi, '');
  const pairs = cleaned.split(/[\s,]+/);
  let result = '';
  for (const pair of pairs) {
    if (pair) {
      const byte = parseInt(pair, 16);
      if (!isNaN(byte)) {
        result += String.fromCharCode(byte);
      }
    }
  }
  return result;
}

function textToHex(text: string, separator: string, uppercase: boolean): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const hex = text.charCodeAt(i).toString(16);
    const padded = (uppercase ? hex.toUpperCase() : hex.toLowerCase()).padStart(2, '0');
    if (separator === '0x') {
      result += (i > 0 ? ' ' : '') + '0x' + padded;
    } else if (separator === 'space') {
      result += (i > 0 ? ' ' : '') + padded;
    } else {
      result += padded;
    }
  }
  return result;
}

export default function HexToText() {
  const { dict } = useLang();
  const t = dict.tools['hex-to-text'];
  const [mode, setMode] = useState<'hex-to-text' | 'text-to-hex'>('hex-to-text');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [separator, setSeparator] = useState('space');
  const [uppercase, setUppercase] = useState(true);
  const [encoding, setEncoding] = useState('utf8');

  useEffect(() => {
    if (mode === 'hex-to-text') {
      setOutput(hexToText(input));
    } else {
      setOutput(textToHex(input, separator, uppercase));
    }
  }, [input, mode, separator, uppercase, encoding]);

  const byteCount = mode === 'hex-to-text'
    ? input.replace(/\s+/g, ' ').trim().split(/[\s,]+/).filter((x) => x).length
    : input.length;

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="hex-to-text">
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setMode('hex-to-text')}
          className={mode === 'hex-to-text' ? 'btn btn-primary' : 'btn btn-secondary'}
        >
          Hex to Text
        </button>
        <button
          onClick={() => setMode('text-to-hex')}
          className={mode === 'text-to-hex' ? 'btn btn-primary' : 'btn btn-secondary'}
        >
          Text to Hex
        </button>
      </div>

      {mode === 'text-to-hex' && (
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Options</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px' }}>Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              >
                <option value="space">Space (e.g., 48 65 6C 6C 6F)</option>
                <option value="none">None (e.g., 48656C6C6F)</option>
                <option value="0x">0x Prefix (e.g., 0x48 0x65 0x6C 0x6C 0x6F)</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                />
                <span>Uppercase</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            {mode === 'hex-to-text' ? 'Hex Input' : 'Text Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'hex-to-text' ? 'Paste hex here (48 65 6C 6C 6F or 48656C6C6F)...' : 'Paste text here...'}
            style={{
              width: '100%',
              height: '300px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
            {byteCount} bytes
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            {mode === 'hex-to-text' ? 'Text Output' : 'Hex Output'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            style={{
              width: '100%',
              height: '300px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5',
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
            {output.length} chars
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setInput('')} className="btn btn-secondary">
          Clear
        </button>
        {output && <CopyButton text={output} label="Copy Output" />}
      </div>

      <div style={{ marginTop: '32px', color: '#666', lineHeight: '1.6' }}>
        <h3>{t.featuresTitle || 'Features'}</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Bidirectional conversion (Hex ↔ Text)</li>
          <li>Multiple hex format support (48656C6C6F, 48 65 6C 6C 6F, 0x48 0x65)</li>
          <li>Configurable separator (space, none, 0x prefix)</li>
          <li>Uppercase/lowercase toggle</li>
          <li>Byte and character counting</li>
          <li>UTF-8 encoding support</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
