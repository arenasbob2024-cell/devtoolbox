'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function binaryToText(binary: string): string {
  const cleaned = binary.replace(/\s/g, '');
  if (!/^[01]+$/.test(cleaned)) throw new Error('Invalid binary');
  if (cleaned.length % 8 !== 0) throw new Error('Binary must be multiple of 8');

  return cleaned
    .match(/.{1,8}/g)
    ?.map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('') || '';
}

function textToBinary(text: string, separator: string): string {
  return Array.from(text)
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(separator);
}

function detectMode(input: string): 'binary' | 'text' {
  const cleaned = input.trim().replace(/\s/g, '');
  if (/^[01]+$/.test(cleaned) && cleaned.length % 8 === 0) return 'binary';
  return 'text';
}

export default function BinaryToText() {
  const { dict } = useLang();
  const t = dict.tools['binary-to-text'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [separator, setSeparator] = useState('space');
  const [mode, setMode] = useState<'binary' | 'text' | 'auto'>('auto');

  const convert = () => {
    try {
      const detectMode_val = mode === 'auto' ? detectMode(input) : mode;
      if (detectMode_val === 'binary') {
        setOutput(binaryToText(input));
      } else {
        const sep = separator === 'space' ? ' ' : separator === 'none' ? '' : separator;
        setOutput(textToBinary(input, sep));
      }
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    try {
      const detectMode_val = mode === 'auto' ? detectMode(value) : mode;
      if (detectMode_val === 'binary') {
        setOutput(binaryToText(value));
      } else {
        const sep = separator === 'space' ? ' ' : separator === 'none' ? '' : separator;
        setOutput(textToBinary(value, sep));
      }
      setError('');
    } catch {
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput('Hello');
    const sep = separator === 'space' ? ' ' : separator === 'none' ? '' : separator;
    setOutput(textToBinary('Hello', sep));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="binary-to-text"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={mode}
          onChange={e => setMode(e.target.value as 'binary' | 'text' | 'auto')}
          style={{ padding: '6px 10px', fontSize: 13 }}
        >
          <option value="auto">{t.autoDetect}</option>
          <option value="binary">{t.binaryToText}</option>
          <option value="text">{t.textToBinary}</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>

        {mode !== 'binary' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.separator}:</label>
            <select
              value={separator}
              onChange={e => setSeparator(e.target.value)}
              style={{ padding: '4px 8px', fontSize: 12 }}
            >
              <option value="space">{t.space}</option>
              <option value="none">{t.none}</option>
            </select>
          </div>
        )}
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
          ✕ {dict.common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={t.inputPlaceholder}
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
