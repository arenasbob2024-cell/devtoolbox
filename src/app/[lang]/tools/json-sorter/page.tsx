'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type SortOrder = 'asc' | 'desc';

function sortKeys(obj: any, order: SortOrder, deep: boolean): any {
  if (Array.isArray(obj)) return deep ? obj.map(item => sortKeys(item, order, deep)) : obj;
  if (obj !== null && typeof obj === 'object') {
    const sorted: any = {};
    const keys = Object.keys(obj).sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a));
    for (const key of keys) {
      sorted[key] = deep ? sortKeys(obj[key], order, deep) : obj[key];
    }
    return sorted;
  }
  return obj;
}

export default function JsonSorter() {
  const { dict } = useLang();
  const t = (dict.tools as any)['json-sorter'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState<SortOrder>('asc');
  const [deep, setDeep] = useState(true);
  const [indent, setIndent] = useState(2);

  const sort = () => {
    try {
      const parsed = JSON.parse(input);
      const sorted = sortKeys(parsed, order, deep);
      setOutput(JSON.stringify(sorted, null, indent));
      setError('');
    } catch (e: any) {
      setError(e.message || 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      zebra: "striped",
      apple: { color: "red", taste: "sweet", origin: { country: "USA", state: "Washington" } },
      mango: [1, 2, 3],
      banana: { yellow: true, appeal: "high" },
      cherry: "red"
    }, null, 2));
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="json-sorter">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={sort} className="btn btn-primary">Sort Keys</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <select value={order} onChange={e => setOrder(e.target.value as SortOrder)} style={{ padding: '6px 10px', fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={deep} onChange={e => setDeep(e.target.checked)} /> Deep sort
        </label>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Indent:</label>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} style={{ width: 50, padding: '4px 6px', fontSize: 12, background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }}>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </div>
      </div>

      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>✕ {error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Input JSON</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your JSON here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Sorted JSON</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Sorted JSON will appear here..." style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
