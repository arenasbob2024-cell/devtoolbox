'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'csv-viewer';

export default function CsvViewerPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'CSV Viewer', description: 'View and explore CSV data in an interactive table' };
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    setError('');
    setOutput('');
    setIsValid(null);
    if (!input.trim()) { setError('Please enter content to validate'); return; }
    try {
      // Parse CSV and display as formatted table
      const rows = [];
      let current = '';
      let inQuotes = false;
      const chars = input.split('');

      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (c === '"') { inQuotes = !inQuotes; continue; }
        if (c === '\n' && !inQuotes) {
          if (current.trim()) rows.push(current.split(',').map(s => s.trim()));
          current = '';
          continue;
        }
        current += c;
      }
      if (current.trim()) rows.push(current.split(',').map(s => s.trim()));

      if (rows.length === 0) { setError('No data found'); return; }

      const headers = rows[0];
      const data = rows.slice(1);
      const colWidths = headers.map((h, i) => Math.max(h.length, ...data.map(r => (r[i] || '').length)));

      const sep = '+' + colWidths.map(w => '-'.repeat(w + 2)).join('+') + '+';
      const headerRow = '| ' + headers.map((h, i) => h.padEnd(colWidths[i])).join(' | ') + ' |';
      const dataRows = data.map(r => '| ' + headers.map((_, i) => (r[i] || '').padEnd(colWidths[i])).join(' | ') + ' |');

      setOutput(sep + '\n' + headerRow + '\n' + sep + '\n' + dataRows.join('\n') + '\n' + sep + '\n\n' + `Rows: ${data.length}, Columns: ${headers.length}`);
      setIsValid(true);
    } catch (e: any) {
      setError(e.message || 'Validation failed');
      setIsValid(false);
    }
  };

  return (
    <ToolLayout title={t.name || 'CSV Viewer'} description={t.description || 'View and explore CSV data in an interactive table'} toolId={TOOL_ID}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleValidate} style={{ padding: '8px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
          Validate
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setIsValid(null); }} style={{ padding: '8px 20px', background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      {error && <div style={{ padding: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', marginBottom: 16, fontSize: 14 }}>{error}</div>}
      {isValid !== null && (
        <div style={{ padding: 12, background: isValid ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isValid ? '#bbf7d0' : '#fecaca'}`, borderRadius: 8, color: isValid ? '#16a34a' : '#dc2626', marginBottom: 16, fontSize: 14, fontWeight: 600 }}>
          {isValid ? '✅ Valid!' : '❌ Invalid'}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`name,age,email,city\nAlice,30,alice@example.com,New York\nBob,25,bob@example.com,London\nCharlie,35,charlie@example.com,Paris`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Validation results will appear here..." style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>
      </div>
    </ToolLayout>
  );
}
