'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function csvToJson(csv: string): string {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return '[]';
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const row: Record<string, string> = {};
    headers.forEach((h, j) => { row[h] = vals[j] ?? ''; });
    rows.push(row);
  }
  return JSON.stringify(rows, null, 2);
}

function jsonToCsv(jsonStr: string): string {
  try {
    const data = JSON.parse(jsonStr);
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return '';
    const headers = Object.keys(arr[0] as object);
    const lines = [headers.join(',')];
    for (const row of arr) {
      const vals = headers.map(h => `"${String((row as Record<string, unknown>)[h] ?? '').replace(/"/g, '""')}"`);
      lines.push(vals.join(','));
    }
    return lines.join('\n');
  } catch {
    return '';
  }
}

export default function CsvJson() {
  const { dict } = useLang();
  const t = dict.tools['csv-json'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'csv2json' | 'json2csv'>('csv2json');

  const convert = () => {
    setError('');
    try {
      if (mode === 'csv2json') {
        setOutput(csvToJson(input));
      } else {
        const r = jsonToCsv(input);
        if (!r) throw new Error('Invalid JSON');
        setOutput(r);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : dict.common.error);
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => m === 'csv2json' ? 'json2csv' : 'csv2json');
    setInput(output);
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="csv-json">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)} style={{ padding: '8px 12px', fontSize: 13 }}>
          <option value="csv2json">CSV → JSON</option>
          <option value="json2csv">JSON → CSV</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={swap} className="btn btn-secondary">{dict.common.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clearAll}</button>
      </div>
      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {dict.common.error}: {error}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{dict.common.input}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'csv2json' ? 'name,age,city\nAlice,30,NYC\nBob,25,LA' : '{"name":"Alice","age":30}\n{"name":"Bob","age":25}'} style={{ minHeight: 300 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 300, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
    </ToolLayout>
  );
}
