'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

function formatSql(sql: string): string {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'INNER JOIN', 'OUTER JOIN', 'ON', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE',
    'DROP TABLE', 'UNION', 'UNION ALL', 'AS', 'DISTINCT', 'IN', 'NOT', 'NULL', 'IS',
    'BETWEEN', 'LIKE', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'WITH'];

  let formatted = sql.trim();

  // Uppercase keywords
  keywords.forEach(kw => {
    const regex = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi');
    formatted = formatted.replace(regex, kw);
  });

  // Add newlines before major clauses
  const majorClauses = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN',
    'INNER JOIN', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'UNION', 'INSERT INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];

  majorClauses.forEach(clause => {
    const regex = new RegExp(`\\b(${clause})\\b`, 'g');
    formatted = formatted.replace(regex, '\n$1');
  });

  // Indent sub-clauses
  const lines = formatted.split('\n').map(l => l.trim()).filter(Boolean);
  const indentedLines = lines.map(line => {
    if (/^(AND|OR|ON|SET)\b/.test(line)) return '  ' + line;
    return line;
  });

  return indentedLines.join('\n');
}

function minifySql(sql: string): string {
  return sql.replace(/--.*$/gm, '').replace(/\s+/g, ' ').trim();
}

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const sampleSql = `select u.id, u.name, u.email, count(o.id) as order_count, sum(o.total) as total_spent from users u left join orders o on u.id = o.user_id where u.status = 'active' and u.created_at > '2024-01-01' group by u.id, u.name, u.email having count(o.id) > 5 order by total_spent desc limit 100`;

  return (
    <ToolLayout
      title="SQL Formatter"
      description="Format and beautify SQL queries for better readability. Supports common SQL dialects."
      toolId="sql-formatter"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(formatSql(input))} className="btn btn-primary">Format SQL</button>
        <button onClick={() => setOutput(minifySql(input))} className="btn btn-secondary">Minify</button>
        <button onClick={() => setInput(sampleSql)} className="btn btn-secondary">Load Sample</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">Clear</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Input SQL</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="Paste your SQL query here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Formatted Output</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Formatted SQL..."
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About SQL Formatting</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Well-formatted SQL queries are easier to read, debug, and maintain. This tool automatically adds indentation, capitalizes keywords, and places clauses on separate lines. Supports SELECT, INSERT, UPDATE, DELETE, and JOIN statements.
        </p>
      </div>
    </ToolLayout>
  );
}
