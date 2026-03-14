'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function SqlToJson() {
  const { dict } = useLang();
  const t = dict.tools['sql-to-json'];
  const [sqlInput, setSqlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const parseSqlToJson = (sql: string) => {
    try {
      setError('');
      const schema: any = {
        tableName: '',
        columns: [],
        constraints: {
          primaryKey: [],
          uniqueKeys: [],
          foreignKeys: [],
        },
      };

      // Extract table name
      const tableMatch = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?\s*\(/i);
      if (!tableMatch) {
        throw new Error('Could not find CREATE TABLE statement');
      }
      schema.tableName = tableMatch[1];

      // Extract column definitions
      const contentMatch = sql.match(/\(([\s\S]*)\)/);
      if (!contentMatch) {
        throw new Error('Invalid SQL syntax');
      }

      const content = contentMatch[1];
      const lines = content.split(',').map(l => l.trim());

      for (const line of lines) {
        if (!line) continue;

        // Check for constraints
        if (line.toUpperCase().startsWith('PRIMARY KEY')) {
          const pkMatch = line.match(/PRIMARY\s+KEY\s*\((.*?)\)/i);
          if (pkMatch) {
            schema.constraints.primaryKey = pkMatch[1].split(',').map((c: string) => c.trim().replace(/[`"]/g, ''));
          }
        } else if (line.toUpperCase().startsWith('UNIQUE')) {
          const ukMatch = line.match(/UNIQUE\s*(?:\(\s*(.*?)\s*\))?/i);
          if (ukMatch && ukMatch[1]) {
            schema.constraints.uniqueKeys.push(ukMatch[1].split(',').map(c => c.trim().replace(/[`"]/g, '')));
          }
        } else if (line.toUpperCase().startsWith('FOREIGN KEY')) {
          const fkMatch = line.match(/FOREIGN\s+KEY\s*\((.*?)\)\s*REFERENCES\s+(\w+)\s*\((.*?)\)/i);
          if (fkMatch) {
            schema.constraints.foreignKeys.push({
              columns: fkMatch[1].split(',').map(c => c.trim().replace(/[`"]/g, '')),
              referencedTable: fkMatch[2],
              referencedColumns: fkMatch[3].split(',').map(c => c.trim().replace(/[`"]/g, '')),
            });
          }
        } else {
          // Parse column definition
          const colMatch = line.match(/[`"]?(\w+)[`"]?\s+(\w+)(?:\s*\((.*?)\))?\s*(.*)/i);
          if (colMatch) {
            const [, colName, colType, size, constraints] = colMatch;
            const column: any = {
              name: colName,
              type: colType.toUpperCase(),
            };

            if (size) {
              column.size = size;
            }

            if (constraints) {
              const constraintStr = constraints.toUpperCase();
              if (constraintStr.includes('NOT NULL')) column.notNull = true;
              if (constraintStr.includes('UNIQUE')) column.unique = true;
              if (constraintStr.includes('PRIMARY KEY')) column.primaryKey = true;
              if (constraintStr.includes('AUTO_INCREMENT')) column.autoIncrement = true;
              if (constraintStr.includes('DEFAULT')) {
                const defaultMatch = constraints.match(/DEFAULT\s+([^\s]+)/i);
                if (defaultMatch) {
                  column.default = defaultMatch[1].replace(/['"]/g, '');
                }
              }
            }

            schema.columns.push(column);
          }
        }
      }

      setJsonOutput(JSON.stringify(schema, null, 2));
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      setError(`Error: ${errorMsg}`);
      setJsonOutput('');
    }
  };

  const loadSample = () => {
    const sample = `CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;
    setSqlInput(sample);
    parseSqlToJson(sample);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="sql-to-json"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => parseSqlToJson(sqlInput)} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setSqlInput(''); setJsonOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
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
          ✕ {error}
        </div>
      )}

      {/* Input/Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.sqlInputLabel}</label>
          <textarea
            value={sqlInput}
            onChange={e => setSqlInput(e.target.value)}
            placeholder={t.sqlInputPlaceholder}
            style={{ minHeight: 400 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.jsonOutputLabel}</label>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder={t.jsonOutputPlaceholder}
            style={{ minHeight: 400, background: 'var(--bg-secondary)' }}
          />
          {jsonOutput && <CopyButton text={jsonOutput} />}
        </div>
      </div>

      {/* SEO Content */}
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
