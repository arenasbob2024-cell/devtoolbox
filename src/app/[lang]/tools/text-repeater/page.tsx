'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type SeparatorType = 'none' | 'newline' | 'space' | 'comma' | 'custom';

export default function TextRepeater() {
  const { dict } = useLang();
  const t = dict.tools['text-repeater'];

  const [text, setText] = useState('');
  const [count, setCount] = useState(10);
  const [separatorType, setSeparatorType] = useState<SeparatorType>('newline');
  const [customSeparator, setCustomSeparator] = useState('-');

  const getSeparator = useCallback((): string => {
    switch (separatorType) {
      case 'none': return '';
      case 'newline': return '\n';
      case 'space': return ' ';
      case 'comma': return ', ';
      case 'custom': return customSeparator;
      default: return '';
    }
  }, [separatorType, customSeparator]);

  const result = useMemo(() => {
    if (!text || count < 1) return '';
    const clampedCount = Math.min(count, 10000);
    const sep = getSeparator();
    return Array(clampedCount).fill(text).join(sep);
  }, [text, count, getSeparator]);

  const charCount = result.length;
  const lineCount = result ? result.split('\n').length : 0;

  const handlePreset = (n: number) => {
    setCount(n);
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8,
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

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="text-repeater">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left: Input */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{t.inputText}</label>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={t.inputPlaceholder}
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>{t.repeatCount}</label>
              <input
                type="number"
                value={count}
                onChange={e => setCount(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
                min={1}
                max={10000}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{t.separator}</label>
              <select
                value={separatorType}
                onChange={e => setSeparatorType(e.target.value as SeparatorType)}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option value="none">{t.separatorOptions.none}</option>
                <option value="newline">{t.separatorOptions.newline}</option>
                <option value="space">{t.separatorOptions.space}</option>
                <option value="comma">{t.separatorOptions.comma}</option>
                <option value="custom">{t.separatorOptions.custom}</option>
              </select>
            </div>
          </div>

          {separatorType === 'custom' && (
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{t.customSeparator}</label>
              <input
                type="text"
                value={customSeparator}
                onChange={e => setCustomSeparator(e.target.value)}
                placeholder={t.customPlaceholder}
                style={inputStyle}
              />
            </div>
          )}

          {/* Presets */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{t.presets}</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[10, 50, 100, 500, 1000].map(n => (
                <button
                  key={n}
                  onClick={() => handlePreset(n)}
                  className="btn btn-secondary"
                  style={{
                    fontSize: 12,
                    padding: '6px 14px',
                    fontWeight: count === n ? 700 : 500,
                    background: count === n ? 'var(--accent)' : undefined,
                    color: count === n ? '#fff' : undefined,
                  }}
                >
                  {n}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={labelStyle}>{t.result}</label>
            <CopyButton text={result} />
          </div>

          <textarea
            value={result}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{
              ...inputStyle,
              minHeight: 250,
              resize: 'vertical',
              opacity: result ? 1 : 0.5,
              fontFamily: 'monospace',
              fontSize: 13,
            }}
          />

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 16,
            marginTop: 12,
            padding: '10px 14px',
            background: 'var(--bg-input)',
            borderRadius: 8,
            border: '1px solid var(--border-color)',
          }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.charCount}: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>
                {charCount.toLocaleString()}
              </span>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.lineCount}: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>
                {lineCount.toLocaleString()}
              </span>
            </div>
          </div>
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
