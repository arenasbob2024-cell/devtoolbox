'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToCsv() {
  const { dict } = useLang();
  const t = dict.tools['json-to-csv'];

  const [jsonInput, setJsonInput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flattenNested, setFlattenNested] = useState(false);
  const [csvOutput, setCsvOutput] = useState('');
  const [error, setError] = useState('');

  const flatten = (obj: any, prefix = ''): any => {
    const flattened: any = {};
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}_${key}` : key;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(flattened, flatten(value, newKey));
      } else {
        flattened[newKey] = value;
      }
    }
    return flattened;
  };

  const convertToCSV = () => {
    setError('');
    setCsvOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      let data = JSON.parse(jsonInput);
      
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects');
        return;
      }

      if (data.length === 0) {
        setError('Array cannot be empty');
        return;
      }

      if (flattenNested) {
        data = data.map(item => flatten(item));
      }

      const headers = Object.keys(data[0]);
      const rows: string[] = [];

      if (includeHeaders) {
        rows.push(headers.map(h => `"${h}"`).join(delimiter));
      }

      for (const row of data) {
        const values = headers.map(header => {
          let value = row[header] ?? '';
          if (typeof value === 'object') {
            value = JSON.stringify(value);
          }
          value = String(value).replace(/"/g, '""');
          return `"${value}"`;
        });
        rows.push(values.join(delimiter));
      }

      setCsvOutput(rows.join('\n'));
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      setError(`JSON Parse Error: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 },
      { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 35 },
    ];
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  const downloadCSV = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvOutput));
    element.setAttribute('download', 'export.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-csv"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convertToCSV} className="btn btn-primary">Convert to CSV</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setCsvOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
        {csvOutput && <button onClick={downloadCSV} className="btn btn-secondary">Download CSV</button>}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Delimiter:</label>
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ fontSize: 13 }}>
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab</option>
            <option value="|">Pipe (|)</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={includeHeaders} onChange={e => setIncludeHeaders(e.target.checked)} />
          <label style={{ fontSize: 13 }}>Include Headers</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={flattenNested} onChange={e => setFlattenNested(e.target.checked)} />
          <label style={{ fontSize: 13 }}>Flatten Nested Objects</label>
        </div>
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
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>JSON Input (Array of Objects)</label>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder="[{&quot;name&quot;: &quot;Alice&quot;, &quot;age&quot;: 30}]"
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>CSV Output</label>
          <textarea
            value={csvOutput}
            readOnly
            placeholder="CSV output will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {csvOutput && <CopyButton text={csvOutput} />}
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
