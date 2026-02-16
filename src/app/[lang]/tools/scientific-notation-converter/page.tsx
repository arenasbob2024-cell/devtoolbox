'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface NotationResult {
  standardForm: string;
  scientific: string;
  eNotation: string;
  engineering: string;
  coefficient: string;
  exponent: string;
  error: string;
}

const EMPTY_RESULT: NotationResult = {
  standardForm: '', scientific: '', eNotation: '', engineering: '',
  coefficient: '', exponent: '', error: '',
};

function toEngineering(num: number): { coeff: number; exp: number } {
  if (num === 0) return { coeff: 0, exp: 0 };
  const absNum = Math.abs(num);
  const sign = num < 0 ? -1 : 1;
  let exp = Math.floor(Math.log10(absNum));
  // Round down to nearest multiple of 3
  exp = exp - ((exp % 3) + 3) % 3;
  const coeff = sign * absNum / Math.pow(10, exp);
  return { coeff: parseFloat(coeff.toPrecision(12)), exp };
}

function formatStandard(num: number): string {
  if (num === 0) return '0';
  if (!Number.isFinite(num)) return 'Infinity';
  // For very large/small numbers, use toPrecision
  if (Math.abs(num) >= 1e21 || (Math.abs(num) < 1e-7 && num !== 0)) {
    // Format using string manipulation to avoid e notation
    const str = num.toFixed(0);
    if (!str.includes('e') && !str.includes('E')) return str;
    // fallback: use BigInt-like expansion
    const [c, e] = num.toExponential().split('e');
    const exp = parseInt(e);
    const [integer, decimal = ''] = c.split('.');
    const sign = integer.startsWith('-') ? '-' : '';
    const digits = (sign ? integer.slice(1) : integer) + decimal;
    if (exp >= 0) {
      const totalDigits = digits.length;
      if (exp + 1 >= totalDigits) {
        return sign + digits + '0'.repeat(exp + 1 - totalDigits);
      } else {
        return sign + digits.slice(0, exp + 1) + '.' + digits.slice(exp + 1);
      }
    } else {
      const absExp = Math.abs(exp);
      return sign + '0.' + '0'.repeat(absExp - 1) + digits;
    }
  }
  return parseFloat(num.toPrecision(15)).toString();
}

function parseScientificInput(input: string): number | null {
  const cleaned = input.trim().replace(/\s/g, '');
  // Try standard parseFloat first (handles e notation like 1.23e8)
  if (/^-?[\d.]+[eE][+-]?\d+$/.test(cleaned)) {
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
  }
  // Try pattern like "1.23 x 10^8" or "1.23*10^8" or "1.23x10^8"
  const match = cleaned.match(/^(-?[\d.]+)\s*[x*×]\s*10\^(-?\d+)$/i);
  if (match) {
    const coeff = parseFloat(match[1]);
    const exp = parseInt(match[2]);
    if (isNaN(coeff) || isNaN(exp)) return null;
    return coeff * Math.pow(10, exp);
  }
  // Try just a number
  const n = parseFloat(cleaned);
  return isNaN(n) ? null : n;
}

const EXAMPLE_VALUES = [
  { name: 'Speed of light', value: 299792458, sci: '2.99792458 x 10^8', unit: 'm/s' },
  { name: 'Avogadro number', value: 6.022e23, sci: '6.022 x 10^23', unit: 'mol^-1' },
  { name: 'Planck constant', value: 6.626e-34, sci: '6.626 x 10^-34', unit: 'J*s' },
  { name: 'Earth mass', value: 5.972e24, sci: '5.972 x 10^24', unit: 'kg' },
  { name: 'Electron mass', value: 9.109e-31, sci: '9.109 x 10^-31', unit: 'kg' },
  { name: 'Boltzmann constant', value: 1.381e-23, sci: '1.381 x 10^-23', unit: 'J/K' },
  { name: 'One million', value: 1000000, sci: '1 x 10^6', unit: '' },
  { name: 'One billion', value: 1000000000, sci: '1 x 10^9', unit: '' },
  { name: 'One trillion', value: 1e12, sci: '1 x 10^12', unit: '' },
  { name: 'Nanosecond', value: 1e-9, sci: '1 x 10^-9', unit: 's' },
  { name: 'Micrometer', value: 1e-6, sci: '1 x 10^-6', unit: 'm' },
];

export default function ScientificNotationConverter() {
  const { dict } = useLang();
  const t = dict.tools['scientific-notation-converter'];

  const [numberInput, setNumberInput] = useState('');
  const [scientificInput, setScientificInput] = useState('');
  const [numResult, setNumResult] = useState<NotationResult>(EMPTY_RESULT);
  const [sciResult, setSciResult] = useState<NotationResult>(EMPTY_RESULT);

  const convertNumber = useCallback((value: string) => {
    setNumberInput(value);
    const cleaned = value.trim();
    if (!cleaned) { setNumResult(EMPTY_RESULT); return; }
    const num = parseFloat(cleaned);
    if (isNaN(num)) {
      setNumResult({ ...EMPTY_RESULT, error: t.invalidNumber });
      return;
    }
    if (num === 0) {
      setNumResult({
        standardForm: '0',
        scientific: '0 x 10^0',
        eNotation: '0e0',
        engineering: '0 x 10^0',
        coefficient: '0',
        exponent: '0',
        error: '',
      });
      return;
    }
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const coeff = num / Math.pow(10, exp);
    const eng = toEngineering(num);
    const coeffStr = parseFloat(coeff.toPrecision(12)).toString();
    setNumResult({
      standardForm: formatStandard(num),
      scientific: `${coeffStr} x 10^${exp}`,
      eNotation: `${coeffStr}e${exp}`,
      engineering: `${parseFloat(eng.coeff.toPrecision(12))} x 10^${eng.exp}`,
      coefficient: coeffStr,
      exponent: exp.toString(),
      error: '',
    });
  }, [t]);

  const convertScientific = useCallback((value: string) => {
    setScientificInput(value);
    const cleaned = value.trim();
    if (!cleaned) { setSciResult(EMPTY_RESULT); return; }
    const num = parseScientificInput(cleaned);
    if (num === null) {
      setSciResult({ ...EMPTY_RESULT, error: t.invalidScientific });
      return;
    }
    if (num === 0) {
      setSciResult({
        standardForm: '0',
        scientific: '0 x 10^0',
        eNotation: '0e0',
        engineering: '0 x 10^0',
        coefficient: '0',
        exponent: '0',
        error: '',
      });
      return;
    }
    const exp = Math.floor(Math.log10(Math.abs(num)));
    const coeff = num / Math.pow(10, exp);
    const eng = toEngineering(num);
    const coeffStr = parseFloat(coeff.toPrecision(12)).toString();
    setSciResult({
      standardForm: formatStandard(num),
      scientific: `${coeffStr} x 10^${exp}`,
      eNotation: `${coeffStr}e${exp}`,
      engineering: `${parseFloat(eng.coeff.toPrecision(12))} x 10^${eng.exp}`,
      coefficient: coeffStr,
      exponent: exp.toString(),
      error: '',
    });
  }, [t]);

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

  const renderResults = (result: NotationResult) => {
    if (result.error) return <p style={errorStyle}>{result.error}</p>;
    if (!result.scientific) return null;
    return (
      <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.scientificNotation}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{result.scientific}</span>
            <CopyButton text={result.scientific} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.eNotation}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.eNotation}</span>
            <CopyButton text={result.eNotation} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.engineeringNotation}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.engineering}</span>
            <CopyButton text={result.engineering} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.standardForm}</label>
          <div style={resultBoxStyle}>
            <span style={{ flex: 1 }}>{result.standardForm}</span>
            <CopyButton text={result.standardForm} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.coefficient}</label>
            <div style={{ ...resultBoxStyle, fontSize: 13 }}>
              <span>{result.coefficient}</span>
              <CopyButton text={result.coefficient} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }}>{t.exponent}</label>
            <div style={{ ...resultBoxStyle, fontSize: 13 }}>
              <span>{result.exponent}</span>
              <CopyButton text={result.exponent} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="scientific-notation-converter">
      {/* Two panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Number to Scientific */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.toScientific}</label>
          <input
            type="text"
            value={numberInput}
            onChange={e => convertNumber(e.target.value)}
            placeholder={t.numberPlaceholder}
            style={inputStyle}
          />
          {renderResults(numResult)}
        </div>

        {/* Scientific to Number */}
        <div style={sectionStyle}>
          <label style={labelStyle}>{t.toStandard}</label>
          <input
            type="text"
            value={scientificInput}
            onChange={e => convertScientific(e.target.value)}
            placeholder={t.scientificPlaceholder}
            style={inputStyle}
          />
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            Supports: 1.23e8, 1.23x10^8, 1.23*10^8
          </p>
          {renderResults(sciResult)}
        </div>
      </div>

      {/* Example Values Table */}
      <div style={sectionStyle}>
        <label style={labelStyle}>{t.examples}</label>
        <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-input)' }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>{t.scientificNotation}</th>
                <th style={thStyle}>{t.eNotation}</th>
                <th style={thStyle}>Unit</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_VALUES.map(v => (
                <tr key={v.name}
                  style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-input)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  onClick={() => convertNumber(v.value.toString())}
                >
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{v.name}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace', color: 'var(--accent)' }}>{v.sci}</td>
                  <td style={{ ...cellStyle, fontFamily: 'monospace' }}>{v.value.toExponential()}</td>
                  <td style={{ ...cellStyle, color: 'var(--text-secondary)' }}>{v.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
          Click any row to load the value.
        </p>
      </div>

      {/* SEO */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
