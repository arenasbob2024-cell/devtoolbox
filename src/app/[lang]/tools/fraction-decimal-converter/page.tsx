'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function simplifyFraction(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num: 0, den: 0 };
  const sign = (num < 0) !== (den < 0) ? -1 : 1;
  num = Math.abs(Math.round(num));
  den = Math.abs(Math.round(den));
  const g = gcd(num, den);
  return { num: sign * (num / g), den: den / g };
}

function decimalToFraction(decimal: number): { num: number; den: number } {
  if (Number.isInteger(decimal)) return { num: decimal, den: 1 };
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  const str = decimal.toString();
  const decimalPart = str.split('.')[1] || '';
  const precision = decimalPart.length;
  const den = Math.pow(10, precision);
  const num = Math.round(decimal * den);
  const g = gcd(num, den);
  return { num: sign * (num / g), den: den / g };
}

interface FractionResult {
  original: string;
  simplified: string;
  decimal: string;
  percentage: string;
  error: string;
}

const EMPTY_RESULT: FractionResult = { original: '', simplified: '', decimal: '', percentage: '', error: '' };

const COMMON_FRACTIONS = [
  { frac: '1/2', dec: '0.5', pct: '50%' },
  { frac: '1/3', dec: '0.333...', pct: '33.33%' },
  { frac: '2/3', dec: '0.666...', pct: '66.67%' },
  { frac: '1/4', dec: '0.25', pct: '25%' },
  { frac: '3/4', dec: '0.75', pct: '75%' },
  { frac: '1/5', dec: '0.2', pct: '20%' },
  { frac: '2/5', dec: '0.4', pct: '40%' },
  { frac: '3/5', dec: '0.6', pct: '60%' },
  { frac: '4/5', dec: '0.8', pct: '80%' },
  { frac: '1/6', dec: '0.166...', pct: '16.67%' },
  { frac: '5/6', dec: '0.833...', pct: '83.33%' },
  { frac: '1/8', dec: '0.125', pct: '12.5%' },
  { frac: '3/8', dec: '0.375', pct: '37.5%' },
  { frac: '5/8', dec: '0.625', pct: '62.5%' },
  { frac: '7/8', dec: '0.875', pct: '87.5%' },
  { frac: '1/10', dec: '0.1', pct: '10%' },
  { frac: '1/16', dec: '0.0625', pct: '6.25%' },
  { frac: '1/32', dec: '0.03125', pct: '3.125%' },
  { frac: '1/100', dec: '0.01', pct: '1%' },
];

export default function FractionDecimalConverter() {
  const { dict } = useLang();
  const t = dict.tools['fraction-decimal-converter'];

  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [decimalInput, setDecimalInput] = useState('');
  const [fracResult, setFracResult] = useState<FractionResult>(EMPTY_RESULT);
  const [decResult, setDecResult] = useState<FractionResult>(EMPTY_RESULT);

  const convertFraction = useCallback(() => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    if (isNaN(num) || isNaN(den)) {
      setFracResult(EMPTY_RESULT);
      return;
    }
    if (den === 0) {
      setFracResult({ ...EMPTY_RESULT, error: t.invalidFraction });
      return;
    }
    const s = simplifyFraction(num, den);
    const dec = num / den;
    setFracResult({
      original: `${Math.round(num)}/${Math.round(den)}`,
      simplified: `${s.num}/${s.den}`,
      decimal: parseFloat(dec.toFixed(10)).toString(),
      percentage: parseFloat((dec * 100).toFixed(6)).toString() + '%',
      error: '',
    });
  }, [numerator, denominator, t]);

  const convertDecimal = useCallback(() => {
    const val = parseFloat(decimalInput);
    if (isNaN(val) || decimalInput.trim() === '') {
      setDecResult(EMPTY_RESULT);
      return;
    }
    const { num, den } = decimalToFraction(val);
    setDecResult({
      original: val.toString(),
      simplified: `${num}/${den}`,
      decimal: val.toString(),
      percentage: parseFloat((val * 100).toFixed(6)).toString() + '%',
      error: '',
    });
  }, [decimalInput]);

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, color: 'var(--text-primary)' };
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', fontSize: 16, fontFamily: 'monospace',
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
    minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
  };
  const errorStyle: React.CSSProperties = { color: '#ef4444', fontSize: 13, marginTop: 8 };
  const cellStyle: React.CSSProperties = {
    padding: '6px 12px', borderBottom: '1px solid var(--border-color)', fontSize: 13, color: 'var(--text-primary)',
  };
  const thStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, fontSize: 12, textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)', textAlign: 'left' as const, borderBottom: '2px solid var(--border-color)',
  };

  const renderResultPanel = (result: FractionResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.simplified) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.simplified}</label>
          <div style={resultBoxStyle}>
            <span style={{ fontSize: 20, fontWeight: 700 }}>{result.simplified}</span>
            <CopyButton text={result.simplified} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.decimal}</label>
          <div style={resultBoxStyle}>
            <span>{result.decimal}</span>
            <CopyButton text={result.decimal} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.percentage}</label>
          <div style={resultBoxStyle}>
            <span>{result.percentage}</span>
            <CopyButton text={result.percentage} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="fraction-decimal-converter">
      {/* Two panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Fraction to Decimal */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.fractionToDecimal}</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.numerator}</label>
              <input
                type="number"
                value={numerator}
                onChange={e => setNumerator(e.target.value)}
                onKeyUp={convertFraction}
                placeholder={t.numeratorPlaceholder}
                style={inputStyle}
              />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 16 }}>/</span>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.denominator}</label>
              <input
                type="number"
                value={denominator}
                onChange={e => setDenominator(e.target.value)}
                onKeyUp={convertFraction}
                placeholder={t.denominatorPlaceholder}
                style={inputStyle}
              />
            </div>
          </div>
          <button
            onClick={convertFraction}
            style={{
              marginTop: 12, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {dict.common.convert}
          </button>
          {renderResultPanel(fracResult)}
        </div>

        {/* Decimal to Fraction */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.decimalToFraction}</label>
          <div>
            <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>{t.decimalInput}</label>
            <input
              type="text"
              value={decimalInput}
              onChange={e => setDecimalInput(e.target.value)}
              onKeyUp={e => { if (e.key === 'Enter') convertDecimal(); }}
              placeholder={t.decimalPlaceholder}
              style={inputStyle}
            />
          </div>
          <button
            onClick={convertDecimal}
            style={{
              marginTop: 12, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {dict.common.convert}
          </button>
          {renderResultPanel(decResult)}
        </div>
      </div>

      {/* Common Fractions Reference Table */}
      <div style={sectionStyle}>
        <label style={labelStyle}>{t.commonFractions}</label>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={thStyle}>{t.fraction}</th>
                <th style={thStyle}>{t.decimal}</th>
                <th style={thStyle}>{t.percentage}</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_FRACTIONS.map(f => (
                <tr key={f.frac} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ ...cellStyle, fontWeight: 600, color: 'var(--accent)', fontSize: 15 }}>{f.frac}</td>
                  <td style={cellStyle}>{f.dec}</td>
                  <td style={{ ...cellStyle, color: 'var(--text-secondary)' }}>{f.pct}</td>
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
