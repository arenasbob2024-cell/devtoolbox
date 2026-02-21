'use client';

import { useState, useMemo, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface FlatRow {
  [key: string]: string | number | boolean | null;
}

function flattenObject(obj: unknown, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return result;
  }
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      // For arrays of primitives, join as string; for arrays of objects, stringify
      const allPrimitive = value.every(v => v === null || typeof v !== 'object');
      if (allPrimitive) {
        result[newKey] = value.join(', ');
      } else {
        result[newKey] = JSON.stringify(value);
      }
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function jsonToRows(data: unknown): { columns: string[]; rows: FlatRow[] } {
  let items: unknown[];

  if (Array.isArray(data)) {
    items = data;
  } else if (typeof data === 'object' && data !== null) {
    items = [data];
  } else {
    return { columns: [], rows: [] };
  }

  const columnSet = new Set<string>();
  const flatRows: FlatRow[] = [];

  for (const item of items) {
    if (typeof item !== 'object' || item === null) {
      flatRows.push({ value: item as string | number | boolean | null });
      columnSet.add('value');
      continue;
    }
    const flat = flattenObject(item);
    const row: FlatRow = {};
    for (const [k, v] of Object.entries(flat)) {
      columnSet.add(k);
      row[k] = v === null || v === undefined ? null : (typeof v === 'object' ? JSON.stringify(v) : v as string | number | boolean);
    }
    flatRows.push(row);
  }

  return { columns: Array.from(columnSet), rows: flatRows };
}

function rowsToCsv(columns: string[], rows: FlatRow[]): string {
  const escape = (val: unknown): string => {
    const s = val === null || val === undefined ? '' : String(val);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  const header = columns.map(escape).join(',');
  const body = rows.map(row => columns.map(col => escape(row[col])).join(',')).join('\n');
  return `${header}\n${body}`;
}

type SortDirection = 'asc' | 'desc' | null;

export default function JsonToTable() {
  const { dict } = useLang();
  const t = dict.tools['json-to-table'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [search, setSearch] = useState('');

  const { columns, rows } = useMemo(() => {
    if (!input.trim()) return { columns: [] as string[], rows: [] as FlatRow[] };
    try {
      const parsed = JSON.parse(input);
      setError('');
      return jsonToRows(parsed);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      return { columns: [] as string[], rows: [] as FlatRow[] };
    }
  }, [input]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(row =>
      columns.some(col => {
        const val = row[col];
        return val !== null && val !== undefined && String(val).toLowerCase().includes(q);
      })
    );
  }, [rows, columns, search]);

  const sortedRows = useMemo(() => {
    if (!sortCol || !sortDir) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const va = a[sortCol];
      const vb = b[sortCol];
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return sortDir === 'asc' ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sortDir === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  }, [filteredRows, sortCol, sortDir]);

  const handleSort = useCallback((col: string) => {
    if (sortCol === col) {
      if (sortDir === 'asc') setSortDir('desc');
      else if (sortDir === 'desc') { setSortCol(null); setSortDir(null); }
      else setSortDir('asc');
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  }, [sortCol, sortDir]);

  const loadSample = () => {
    setInput(JSON.stringify([
      { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28, role: "Engineer", address: { city: "San Francisco", state: "CA" } },
      { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34, role: "Designer", address: { city: "New York", state: "NY" } },
      { id: 3, name: "Carol White", email: "carol@example.com", age: 31, role: "Manager", address: { city: "Chicago", state: "IL" } },
      { id: 4, name: "David Brown", email: "david@example.com", age: 25, role: "Intern", address: { city: "Austin", state: "TX" } },
      { id: 5, name: "Eva Green", email: "eva@example.com", age: 29, role: "Engineer", address: { city: "Seattle", state: "WA" } }
    ], null, 2));
    setSearch('');
    setSortCol(null);
    setSortDir(null);
  };

  const handleClear = () => {
    setInput('');
    setError('');
    setSearch('');
    setSortCol(null);
    setSortDir(null);
  };

  const downloadCsv = () => {
    if (columns.length === 0 || sortedRows.length === 0) return;
    const csv = rowsToCsv(columns, sortedRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const csvText = columns.length > 0 && sortedRows.length > 0 ? rowsToCsv(columns, sortedRows) : '';

  const sortIcon = (col: string) => {
    if (sortCol !== col) return ' \u2195';
    return sortDir === 'asc' ? ' \u2191' : ' \u2193';
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'JSON to Table Converter'} description={(t.pageDescription as string) || 'Convert JSON data to an interactive sortable table'} toolId="json-to-table">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={handleClear} className="btn btn-secondary">{common.clear}</button>
        {columns.length > 0 && sortedRows.length > 0 && (
          <>
            <button onClick={downloadCsv} className="btn btn-primary">{common.download} CSV</button>
            <CopyButton text={csvText} label="Copy CSV" />
          </>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {common.error}: {error}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>JSON Input</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='[{"name": "Alice", "age": 28}, {"name": "Bob", "age": 34}]'
          style={{ minHeight: 180, fontFamily: 'JetBrains Mono, monospace', width: '100%' }}
        />
      </div>

      {columns.length > 0 && rows.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {sortedRows.length} {sortedRows.length === 1 ? 'row' : 'rows'} {columns.length} {columns.length === 1 ? 'column' : 'columns'}
              {search && filteredRows.length !== rows.length && ` (filtered from ${rows.length})`}
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search / filter rows..."
              style={{ padding: '6px 12px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', minWidth: 200 }}
            />
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{
                    padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12,
                    background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)',
                    color: 'var(--text-secondary)', whiteSpace: 'nowrap', position: 'sticky', top: 0
                  }}>#</th>
                  {columns.map(col => (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      style={{
                        padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontSize: 12,
                        background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)',
                        color: sortCol === col ? 'var(--accent-blue)' : 'var(--text-secondary)',
                        cursor: 'pointer', whiteSpace: 'nowrap', position: 'sticky', top: 0,
                        userSelect: 'none'
                      }}
                    >
                      {col}{sortIcon(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '8px 12px', color: 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap' }}>{i + 1}</td>
                    {columns.map(col => {
                      const val = row[col];
                      const display = val === null || val === undefined ? '' : String(val);
                      const isNum = typeof val === 'number';
                      const isBool = typeof val === 'boolean';
                      return (
                        <td key={col} style={{
                          padding: '8px 12px', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          fontFamily: isNum || isBool ? 'JetBrains Mono, monospace' : 'inherit',
                          color: val === null || val === undefined ? 'var(--text-secondary)' : isBool ? 'var(--accent-blue)' : isNum ? 'var(--accent-rose)' : 'var(--text-primary)'
                        }}
                          title={display}
                        >
                          {val === null || val === undefined ? 'null' : display}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
