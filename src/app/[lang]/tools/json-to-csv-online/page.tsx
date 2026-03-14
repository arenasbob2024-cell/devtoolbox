'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToCsvOnline() {
  const { dict } = useLang();
  const t = dict.tools['json-to-csv-online'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const flattenObject = (obj: unknown, prefix: string = ''): Record<string, unknown> => {
    const flat: Record<string, unknown> = {};

    if (obj === null || typeof obj !== 'object') {
      return { [prefix || 'value']: obj };
    }

    if (Array.isArray(obj)) {
      return { [prefix || 'array']: JSON.stringify(obj) };
    }

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value === null || typeof value !== 'object') {
        flat[newKey] = value;
      } else if (Array.isArray(value)) {
        flat[newKey] = JSON.stringify(value);
      } else {
        Object.assign(flat, flattenObject(value, newKey));
      }
    }

    return flat;
  };

  const escapeValue = (value: unknown): string => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      let rows: Record<string, unknown>[] = [];

      if (Array.isArray(parsed)) {
        rows = parsed.map((item) => (typeof item === 'object' && item !== null ? flattenObject(item) : { value: item }));
      } else if (typeof parsed === 'object') {
        rows = [flattenObject(parsed)];
      } else {
        setError(t.invalidInput);
        return;
      }

      if (rows.length === 0) {
        setError(t.emptyArray);
        return;
      }

      const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
      const csvLines: string[] = [];

      if (includeHeaders) {
        csvLines.push(headers.map(escapeValue).join(delimiter));
      }

      for (const row of rows) {
        const values = headers.map((header) => escapeValue(row[header]));
        csvLines.push(values.join(delimiter));
      }

      setOutput(csvLines.join('\n'));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : t.conversionError);
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = [
      {
        id: 1,
        name: 'DevToolBox',
        version: '1.0.0',
        active: true,
      },
      {
        id: 2,
        name: 'JSON Converter',
        version: '2.1.0',
        active: true,
      },
    ];
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="json-to-csv-online">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">
          {t.convertBtn}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.delimiterLabel}:</label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              style={{ padding: '4px 8px', fontSize: 12 }}
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
              <option value="\t">Tab</option>
            </select>
          </div>
          <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            {t.headerLabel}
          </label>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--accent-rose)',
          }}
        >
          ✕ {dict.common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <button
              onClick={() => {
                setInput('');
                setOutput('');
                setError('');
              }}
              className="btn btn-secondary"
              style={{ fontSize: 11, padding: '4px 10px' }}
            >
              {dict.common.clear}
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 350 }}
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
            style={{ minHeight: 350, opacity: output ? 1 : 0.5, fontFamily: 'monospace' }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
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
