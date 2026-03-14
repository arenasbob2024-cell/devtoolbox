'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToSql() {
  const { dict } = useLang();
  const t = dict.tools['json-to-sql'];
  const [jsonInput, setJsonInput] = useState('');
  const [sqlOutput, setSqlOutput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [dbType, setDbType] = useState<'mysql' | 'postgresql' | 'sqlite'>('mysql');
  const [useBatchInsert, setUseBatchInsert] = useState(true);
  const [error, setError] = useState('');

  const escapeSqlString = (str: string, db: string): string => {
    if (db === 'postgresql') {
      return `'${str.replace(/'/g, "''")}'`;
    }
    return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  };

  const getValueSql = (val: any, db: string): string => {
    if (val === null) return 'NULL';
    if (typeof val === 'string') return escapeSqlString(val, db);
    if (typeof val === 'boolean') return val ? '1' : '0';
    if (typeof val === 'number') return String(val);
    return escapeSqlString(JSON.stringify(val), db);
  };

  const convertToSql = () => {
    setError('');
    setSqlOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is empty');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      let data = Array.isArray(parsed) ? parsed : [parsed];

      if (data.length === 0) {
        setError('Array is empty');
        return;
      }

      let sql = '';

      if (useBatchInsert && data.length > 1) {
        // Batch INSERT
        const keys = Object.keys(data[0]);
        const columnList = keys.map(k => (dbType === 'postgresql' ? `"${k}"` : `\`${k}\``)).join(', ');

        const valueGroups = data.map(row => {
          const vals = keys.map(k => getValueSql(row[k], dbType));
          return `(${vals.join(', ')})`;
        });

        sql = `INSERT INTO ${dbType === 'postgresql' ? `"${tableName}"` : `\`${tableName}\``} (${columnList})\nVALUES ${valueGroups.join(',\n       ')};`;
      } else {
        // Individual INSERT statements
        for (const row of data) {
          const keys = Object.keys(row);
          const columnList = keys.map(k => (dbType === 'postgresql' ? `"${k}"` : `\`${k}\``)).join(', ');
          const values = keys.map(k => getValueSql(row[k], dbType)).join(', ');

          sql += `INSERT INTO ${dbType === 'postgresql' ? `"${tableName}"` : `\`${tableName}\``} (${columnList}) VALUES (${values});\n`;
        }
      }

      setSqlOutput(sql);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
    }
  };

  const loadSampleJson = () => {
    const sample = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        age: 28,
        active: true,
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        age: 32,
        active: true,
      },
    ];
    setJsonInput(JSON.stringify(sample, null, 2));
    setSqlOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-sql"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Table:</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 13,
              minWidth: 120,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>DB:</label>
          <select
            value={dbType}
            onChange={(e) => setDbType(e.target.value as 'mysql' | 'postgresql' | 'sqlite')}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 13,
            }}
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>

        <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="checkbox"
            checked={useBatchInsert}
            onChange={(e) => setUseBatchInsert(e.target.checked)}
          />
          Batch Insert
        </label>

        <button onClick={convertToSql} className="btn btn-primary">Convert</button>
        <button onClick={loadSampleJson} className="btn btn-secondary">Load Sample</button>
        <button
          onClick={() => {
            setJsonInput('');
            setSqlOutput('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      {/* Input/Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON Input</label>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste JSON array or object..."
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>SQL Output</label>
            {sqlOutput && <CopyButton text={sqlOutput} />}
          </div>
          <textarea
            value={sqlOutput}
            readOnly
            placeholder="SQL INSERT statements will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)', cursor: 'default', fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About JSON to SQL Converter</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Convert JSON data to SQL INSERT statements instantly. Our tool supports multiple database types including MySQL, PostgreSQL, and SQLite with proper escaping and syntax.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Support for MySQL, PostgreSQL, and SQLite dialects</li>
          <li>Batch INSERT statements for multiple rows</li>
          <li>Automatic string escaping for security</li>
          <li>Custom table name configuration</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
