'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ROMAN_VALUES: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const ROMAN_MAP: Record<string, number> = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

function toRoman(num: number): string {
  if (num < 1 || num > 3999) return '';
  let result = '';
  for (const [value, symbol] of ROMAN_VALUES) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

function fromRoman(str: string): number {
  const s = str.toUpperCase().trim();
  if (!s || !/^[MDCLXVI]+$/.test(s)) return -1;
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const current = ROMAN_MAP[s[i]];
    const next = i + 1 < s.length ? ROMAN_MAP[s[i + 1]] : 0;
    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }
  // Validate by converting back
  if (total < 1 || total > 3999 || toRoman(total) !== s) return -1;
  return total;
}

const REFERENCE_DATA = [
  ...Array.from({ length: 20 }, (_, i) => ({ num: i + 1, roman: toRoman(i + 1) })),
  { num: 50, roman: 'L' },
  { num: 100, roman: 'C' },
  { num: 500, roman: 'D' },
  { num: 1000, roman: 'M' },
];

export default function RomanNumeralConverter() {
  const { dict } = useLang();
  const t = dict.tools['roman-numeral-converter'];

  const [numberInput, setNumberInput] = useState('');
  const [romanInput, setRomanInput] = useState('');
  const [numberResult, setNumberResult] = useState('');
  const [romanResult, setRomanResult] = useState('');
  const [numberError, setNumberError] = useState('');
  const [romanError, setRomanError] = useState('');

  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');

  const handleNumberChange = useCallback((val: string) => {
    setNumberInput(val);
    setNumberError('');
    setNumberResult('');
    if (!val.trim()) return;
    const num = parseInt(val, 10);
    if (isNaN(num) || num < 1 || num > 3999) {
      setNumberError(t?.invalidNumber || 'Enter a number between 1 and 3999');
      return;
    }
    setNumberResult(toRoman(num));
  }, [t]);

  const handleRomanChange = useCallback((val: string) => {
    setRomanInput(val);
    setRomanError('');
    setRomanResult('');
    if (!val.trim()) return;
    const num = fromRoman(val);
    if (num === -1) {
      setRomanError(t?.invalidRoman || 'Invalid Roman numeral');
      return;
    }
    setRomanResult(String(num));
  }, [t]);

  const getDateRoman = () => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);
    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 1 || y > 3999) return '';
    return `${toRoman(m)}.${toRoman(d)}.${toRoman(y)}`;
  };

  const dateRoman = getDateRoman();

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: 12,
    border: '1px solid var(--border-color)',
    padding: 24,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: 8,
    display: 'block',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: 15,
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const resultBoxStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    padding: '16px 20px',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  };

  const resultTextStyle: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'serif',
    letterSpacing: 2,
  };

  const errorStyle: React.CSSProperties = {
    background: 'rgba(244, 63, 94, 0.1)',
    border: '1px solid rgba(244, 63, 94, 0.3)',
    borderRadius: 8,
    padding: '8px 12px',
    marginTop: 8,
    fontSize: 13,
    color: 'var(--accent-rose)',
  };

  return (
    <ToolLayout
      title={t?.pageTitle || 'Roman Numeral Converter'}
      description={t?.pageDescription || 'Convert between numbers and Roman numerals'}
      toolId="roman-numeral-converter"
    >
      {/* Two converter sections side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Number to Roman */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
            {t?.numberToRoman || 'Number \u2192 Roman Numeral'}
          </h3>
          <label style={labelStyle}>{t?.numberInput || 'Number Input'}</label>
          <input
            type="number"
            min={1}
            max={3999}
            value={numberInput}
            onChange={e => handleNumberChange(e.target.value)}
            placeholder={t?.numberPlaceholder || 'Enter a number (1-3999)'}
            style={inputStyle}
          />
          {numberError && <div style={errorStyle}>{numberError}</div>}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>{t?.result || 'Result'}</label>
            <div style={resultBoxStyle}>
              <span style={resultTextStyle}>{numberResult || '\u2014'}</span>
              {numberResult && <CopyButton text={numberResult} />}
            </div>
          </div>
        </div>

        {/* Roman to Number */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
            {t?.romanToNumber || 'Roman Numeral \u2192 Number'}
          </h3>
          <label style={labelStyle}>{t?.romanInput || 'Roman Numeral Input'}</label>
          <input
            type="text"
            value={romanInput}
            onChange={e => handleRomanChange(e.target.value)}
            placeholder={t?.romanPlaceholder || 'Enter Roman numeral (e.g., MCMXCIX)'}
            style={{ ...inputStyle, textTransform: 'uppercase' }}
          />
          {romanError && <div style={errorStyle}>{romanError}</div>}
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>{t?.result || 'Result'}</label>
            <div style={resultBoxStyle}>
              <span style={resultTextStyle}>{romanResult || '\u2014'}</span>
              {romanResult && <CopyButton text={romanResult} />}
            </div>
          </div>
        </div>
      </div>

      {/* Date Converter */}
      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
          {t?.dateConverter || 'Date to Roman Numerals'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t?.month || 'Month'}</label>
            <input
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={e => setMonth(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>{t?.day || 'Day'}</label>
            <input
              type="number"
              min={1}
              max={31}
              value={day}
              onChange={e => setDay(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>{t?.year || 'Year'}</label>
            <input
              type="number"
              min={1}
              max={3999}
              value={year}
              onChange={e => setYear(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={labelStyle}>{t?.dateResult || 'Date in Roman Numerals'}</label>
          <div style={resultBoxStyle}>
            <span style={resultTextStyle}>{dateRoman || '\u2014'}</span>
            {dateRoman && <CopyButton text={dateRoman} />}
          </div>
        </div>
      </div>

      {/* Reference Table */}
      <div style={{ ...cardStyle, marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text-primary)' }}>
          {t?.referenceTable || 'Reference Table'}
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 8,
        }}>
          {REFERENCE_DATA.map(({ num, roman }) => (
            <div
              key={num}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: 6,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                fontSize: 14,
              }}
            >
              <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{num}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'serif' }}>{roman}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t?.seoTitle || 'Roman Numeral Converter'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t?.seoContent || 'Convert numbers to Roman numerals and Roman numerals to numbers instantly. Supports values from 1 to 3999 with date conversion.'}
        </p>
      </div>
    </ToolLayout>
  );
}
