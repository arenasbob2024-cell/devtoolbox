'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function csvToRows(csv: string): string[][] {
  const lines = csv.trim().split('\n');
  return lines.map(l => l.split(',').map(c => c.trim().replace(/^"|"$/g, '')));
}

function jsonToRows(jsonStr: string): string[][] {
  const data = JSON.parse(jsonStr);
  const arr = Array.isArray(data) ? data : [data];
  if (arr.length === 0) return [];
  const headers = Object.keys(arr[0] as object);
  const rows = [headers];
  for (const row of arr) {
    rows.push(headers.map(h => String((row as Record<string, unknown>)[h] ?? '')));
  }
  return rows;
}

function rowsToHtml(rows: string[][]): string {
  if (rows.length === 0) return '';
  const header = rows[0];
  let html = '<table>\n<thead>\n<tr>';
  for (const h of header) html += `<th>${h.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</th>`;
  html += '</tr>\n</thead>\n<tbody>\n';
  for (let i = 1; i < rows.length; i++) {
    html += '<tr>';
    for (const c of rows[i]) html += `<td>${String(c).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>`;
    html += '</tr>\n';
  }
  html += '</tbody>\n</table>';
  return html;
}

export default function HtmlTable() {
  const { dict } = useLang();
  const t = dict.tools['html-table'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'csv' | 'json'>('csv');

  const convert = () => {
    setError('');
    try {
      let rows: string[][];
      if (mode === 'csv') rows = csvToRows(input);
      else rows = jsonToRows(input);
      setOutput(rowsToHtml(rows));
    } catch (e) {
      setError(e instanceof Error ? e.message : dict.common.error);
      setOutput('');
    }
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="html-table">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)} style={{ padding: '8px 12px', fontSize: 13 }}>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{dict.common.convert}</button>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'csv' ? 'name,age\nAlice,30\nBob,25' : '[{"name":"Alice","age":30},{"name":"Bob","age":25}]'} style={{ minHeight: 200 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>HTML</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 200, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
    </ToolLayout>
  );
}
