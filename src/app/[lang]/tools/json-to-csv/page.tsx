'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
    } else {
      result[newKey] = value === null ? '' : String(value);
    }
  }
  return result;
}

function escapeCSV(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function jsonToCSV(jsonStr: string, delimiter: string): { csv: string; rowCount: number; colCount: number } {
  const parsed = JSON.parse(jsonStr);
  const arr: Record<string, unknown>[] = Array.isArray(parsed) ? parsed : [parsed];

  // Flatten nested objects
  const flatArr = arr.map(item => flattenObject(item as Record<string, unknown>));

  // Collect all unique headers
  const headersSet = new Set<string>();
  flatArr.forEach(row => Object.keys(row).forEach(k => headersSet.add(k)));
  const headers = Array.from(headersSet);

  // Build CSV
  const lines: string[] = [];
  lines.push(headers.map(h => escapeCSV(h)).join(delimiter));
  for (const row of flatArr) {
    const vals = headers.map(h => escapeCSV(row[h] ?? ''));
    lines.push(vals.join(delimiter));
  }

  return { csv: lines.join('\n'), rowCount: flatArr.length, colCount: headers.length };
}

const ui = {
  pageTitle: 'JSON to CSV Converter',
  pageDescription: 'Convert JSON arrays to CSV format online. Handles nested objects, custom delimiters, and CSV download.',
  inputLabel: 'JSON Input',
  inputPlaceholder: 'Paste JSON array here...\n\n[\n  { "name": "Alice", "age": 30 },\n  { "name": "Bob", "age": 25 }\n]',
  outputLabel: 'CSV Output',
  convert: 'Convert to CSV',
  clear: 'Clear',
  download: 'Download CSV',
  delimiter: 'Delimiter',
  comma: 'Comma (,)',
  semicolon: 'Semicolon (;)',
  tab: 'Tab',
  pipe: 'Pipe (|)',
  rows: 'rows',
  columns: 'columns',
  loadSample: 'Load Sample',
  seoTitle: 'What Is JSON to CSV Conversion?',
  seoContent: 'JSON to CSV conversion transforms structured JSON data into comma-separated values (CSV) format, which is widely used in spreadsheets, databases, and data analysis tools. This tool handles nested JSON objects by flattening them with dot notation, supports custom delimiters, and allows you to download the result as a .csv file.',
};

const sampleJson = `[
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "age": 30, "address": { "city": "New York", "state": "NY" } },
  { "id": 2, "name": "Bob Smith", "email": "bob@example.com", "age": 25, "address": { "city": "San Francisco", "state": "CA" } },
  { "id": 3, "name": "Charlie Brown", "email": "charlie@example.com", "age": 35, "address": { "city": "Chicago", "state": "IL" } }
]`;

export default function JsonToCsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [stats, setStats] = useState<{ rows: number; cols: number } | null>(null);

  const convert = useCallback(() => {
    if (!input.trim()) return;
    setError('');
    try {
      const { csv, rowCount, colCount } = jsonToCSV(input, delimiter);
      setOutput(csv);
      setStats({ rows: rowCount, cols: colCount });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
      setStats(null);
    }
  }, [input, delimiter]);

  const downloadCSV = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="json-to-csv"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{ui.delimiter}:</label>
        {[
          { label: ui.comma, value: ',' },
          { label: ui.semicolon, value: ';' },
          { label: ui.tab, value: '\t' },
          { label: ui.pipe, value: '|' },
        ].map(d => (
          <button
            key={d.value}
            onClick={() => setDelimiter(d.value)}
            className={`btn ${delimiter === d.value ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 12px', fontSize: 12 }}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={ui.inputPlaceholder}
            style={{ minHeight: 240, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {ui.outputLabel}
              {stats && (
                <span style={{ fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 8 }}>
                  ({stats.rows} {ui.rows}, {stats.cols} {ui.columns})
                </span>
              )}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 240, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }}
          />
        </div>
      </div>

      {error && (
        <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 6 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{ui.convert}</button>
        <button onClick={() => setInput(sampleJson)} className="btn btn-secondary">{ui.loadSample}</button>
        {output && <button onClick={downloadCSV} className="btn btn-secondary">{ui.download}</button>}
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setStats(null); }} className="btn btn-secondary">{ui.clear}</button>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
