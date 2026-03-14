'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function CssUnitsConverter() {
  const { dict } = useLang();
  const t = dict.tools['css-units-converter'];

  const [value, setValue] = useState('16');
  const [fromUnit, setFromUnit] = useState('px');
  const [toUnit, setToUnit] = useState('rem');
  const [baseFontSize, setBaseFontSize] = useState('16');
  const [result, setResult] = useState('');

  const units = ['px', 'rem', 'em', 'vw', 'vh', '%', 'pt'];

  const convert = () => {
    if (!value || isNaN(Number(value))) {
      setResult('Invalid value');
      return;
    }

    const v = Number(value);
    const base = Number(baseFontSize) || 16;
    let pxValue: number;

    // Convert input to pixels
    switch (fromUnit) {
      case 'px':
        pxValue = v;
        break;
      case 'rem':
        pxValue = v * base;
        break;
      case 'em':
        pxValue = v * base;
        break;
      case 'pt':
        pxValue = v * (96 / 72);
        break;
      case 'vw':
        pxValue = (v / 100) * 1920;
        break;
      case 'vh':
        pxValue = (v / 100) * 1080;
        break;
      case '%':
        pxValue = (v / 100) * base;
        break;
      default:
        pxValue = v;
    }

    // Convert from pixels to target unit
    let converted: number;
    switch (toUnit) {
      case 'px':
        converted = pxValue;
        break;
      case 'rem':
        converted = pxValue / base;
        break;
      case 'em':
        converted = pxValue / base;
        break;
      case 'pt':
        converted = pxValue * (72 / 96);
        break;
      case 'vw':
        converted = (pxValue / 1920) * 100;
        break;
      case 'vh':
        converted = (pxValue / 1080) * 100;
        break;
      case '%':
        converted = (pxValue / base) * 100;
        break;
      default:
        converted = pxValue;
    }

    setResult(converted.toFixed(4));
  };

  const conversionTable = () => {
    if (!value || isNaN(Number(value))) return [];

    const v = Number(value);
    const base = Number(baseFontSize) || 16;
    let pxValue: number;

    switch (fromUnit) {
      case 'px':
        pxValue = v;
        break;
      case 'rem':
        pxValue = v * base;
        break;
      case 'em':
        pxValue = v * base;
        break;
      case 'pt':
        pxValue = v * (96 / 72);
        break;
      case 'vw':
        pxValue = (v / 100) * 1920;
        break;
      case 'vh':
        pxValue = (v / 100) * 1080;
        break;
      case '%':
        pxValue = (v / 100) * base;
        break;
      default:
        pxValue = v;
    }

    const conversions: { [key: string]: number } = {
      'px': pxValue,
      'rem': pxValue / base,
      'em': pxValue / base,
      'pt': pxValue * (72 / 96),
      'vw': (pxValue / 1920) * 100,
      'vh': (pxValue / 1080) * 100,
      '%': (pxValue / base) * 100,
    };

    return Object.entries(conversions).map(([unit, val]) => ({
      unit,
      value: val.toFixed(4),
    }));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-units-converter"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">Convert</button>
        <button onClick={() => { setValue('16'); setFromUnit('px'); setToUnit('rem'); setResult(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ marginBottom: 20, padding: 16, background: 'var(--bg-secondary)', borderRadius: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Value</label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Enter value"
              step="0.1"
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>From Unit</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>To Unit</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)}>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Base Font Size (for rem/em)</label>
          <input
            type="number"
            value={baseFontSize}
            onChange={e => setBaseFontSize(e.target.value)}
            placeholder="16"
            step="1"
          />
        </div>
      </div>

      {result && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: 8,
          padding: 14,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, marginBottom: 8 }}>{value} {fromUnit} = <strong style={{ fontSize: 16, color: 'var(--accent-color)' }}>{result} {toUnit}</strong></div>
          <CopyButton text={`${result} ${toUnit}`} />
        </div>
      )}

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Conversion Table</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ textAlign: 'left', padding: '8px 4px', fontWeight: 600 }}>Unit</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', fontWeight: 600 }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {conversionTable().map(row => (
                <tr key={row.unit} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 4px' }}>{row.unit}</td>
                  <td style={{ textAlign: 'right', padding: '8px 4px', fontFamily: 'monospace' }}>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
