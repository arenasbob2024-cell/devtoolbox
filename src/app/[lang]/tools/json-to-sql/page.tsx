'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type Dialect = 'mysql' | 'postgresql' | 'sqlite';

export default function JsonToSQL() {
  const { dict } = useLang();
  const t = dict.tools['json-to-sql'] as Record<string, unknown>;
  const common = dict.common;
  const [jsonInput, setJsonInput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [dialect, setDialect] = useState<Dialect>('mysql');
  const [includeCreateTable, setIncludeCreateTable] = useState(true);
  const [batchInsert, setBatchInsert] = useState(true);
  const [sqlOutput, setSqlOutput] = useState('');
  const [error, setError] = useState('');

  const escapeString = (value: string): string => {
    return "'" + value.replace(/'/g, "''") + "'";
  };

  const sqlValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'NULL';
    if (typeof value === 'string') return escapeString(value);
    if (typeof value === 'boolean') return value ? '1' : '0';
    if (typeof value === 'number') return String(value);
    return escapeString(JSON.stringify(value));
  };

  const inferColumnType = (value: unknown): string => {
    if (value === null) return 'TEXT';
    if (typeof value === 'boolean') return 'BOOLEAN';
    if (typeof value === 'number') {
      if (Number.isInteger(value)) return 'INT';
      return 'DECIMAL(10,2)';
    }
    if (typeof value === 'string') {
      if (value.match(/^\d{4}-\d{2}-\d{2}/)) return 'DATE';
      return 'VARCHAR(255)';
    }
    return 'TEXT';
  };

  const convert = () => {
    setError('');
    setSqlOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      let records: Record<string, unknown>[] = [];

      if (Array.isArray(parsed)) {
        records = parsed.filter(item => typeof item === 'object' && item !== null) as Record<string, unknown>[];
      } else if (typeof parsed === 'object' && parsed !== null) {
        records = [parsed];
      } else {
        setError('JSON must be an object or array of objects');
        return;
      }

      if (records.length === 0) {
        setError('No valid records found in JSON');
        return;
      }

      const sql: string[] = [];
      const columns = Object.keys(records[0] || {});

      if (includeCreateTable) {
        const columnDefs = columns.map(col => {
          const sampleValue = records[0][col];
          const type = inferColumnType(sampleValue);
          const isId = col.toLowerCase() === 'id';
          if (dialect === 'mysql' && isId) return `${col} INT PRIMARY KEY AUTO_INCREMENT`;
          if (dialect === 'postgresql' && isId) return `${col} SERIAL PRIMARY KEY`;
          if (dialect === 'sqlite' && isId) return `${col} INTEGER PRIMARY KEY AUTOINCREMENT`;
          return `${col} ${type}`;
        });

        const createSql = `CREATE TABLE ${tableName} (\n  ${columnDefs.join(',\n  ')}\n);`;
        sql.push(createSql);
        sql.push('');
      }

      if (batchInsert) {
        const columnList = columns.join(', ');
        const values = records.map(record => {
          const vals = columns.map(col => sqlValue(record[col])).join(', ');
          return `(${vals})`;
        }).join(',\n  ');

        const insertSql = `INSERT INTO ${tableName} (${columnList}) VALUES\n  ${values};`;
        sql.push(insertSql);
      } else {
        const columnList = columns.join(', ');
        for (const record of records) {
          const vals = columns.map(col => sqlValue(record[col])).join(', ');
          sql.push(`INSERT INTO ${tableName} (${columnList}) VALUES (${vals});`);
        }
      }

      setSqlOutput(sql.join('\n'));
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setError(`Invalid JSON: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
    ];
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="json-to-sql"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setSqlOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Table Name</label>
          <input
            type="text"
            value={tableName}
            onChange={e => setTableName(e.target.value)}
            placeholder="users"
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>SQL Dialect</label>
          <select
            value={dialect}
            onChange={e => setDialect(e.target.value as Dialect)}
            style={{ width: '100%' }}
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={includeCreateTable}
            onChange={e => setIncludeCreateTable(e.target.checked)}
          />
          Include CREATE TABLE
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={batchInsert}
            onChange={e => setBatchInsert(e.target.checked)}
          />
          Batch INSERT
        </label>
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
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{common.input} JSON</label>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder='[{"id": 1, "name": "John", "email": "john@example.com"}]'
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>SQL Statements</label>
          <textarea
            value={sqlOutput}
            readOnly
            placeholder="SQL will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {sqlOutput && <CopyButton text={sqlOutput} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
