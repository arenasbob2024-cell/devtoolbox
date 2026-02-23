'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Query Formatter',
    description: 'Format and beautify SQL queries. Auto-indent keywords, normalize whitespace, and minify.',
    inputLabel: 'Input SQL',
    outputLabel: 'Formatted SQL',
    formatBtn: 'Format SQL',
    minifyBtn: 'Minify SQL',
    clearBtn: 'Clear',
    loadSampleBtn: 'Load Sample',
    placeholder: 'Paste your SQL query here...\n\nSELECT * FROM users WHERE id=1',
    dialectLabel: 'Dialect',
    indentLabel: 'Indent',
    uppercaseLabel: 'Uppercase Keywords',
    statsLabel: 'Stats',
    lines: 'lines',
    chars: 'chars',
  },
  fr: { title: 'Formateur de Requêtes SQL', description: 'Formatez et embellissez les requêtes SQL.', inputLabel: 'SQL en entrée', outputLabel: 'SQL formaté', formatBtn: 'Formater SQL', minifyBtn: 'Minifier SQL', clearBtn: 'Effacer', loadSampleBtn: 'Exemple', placeholder: 'Collez votre requête SQL ici...', dialectLabel: 'Dialecte', indentLabel: 'Indentation', uppercaseLabel: 'Mots-clés en majuscules', statsLabel: 'Stats', lines: 'lignes', chars: 'caractères' },
  de: { title: 'SQL Abfrage-Formatierer', description: 'SQL-Abfragen formatieren und verschönern.', inputLabel: 'SQL Eingabe', outputLabel: 'Formatiertes SQL', formatBtn: 'SQL Formatieren', minifyBtn: 'SQL Minifizieren', clearBtn: 'Löschen', loadSampleBtn: 'Beispiel laden', placeholder: 'SQL hier einfügen...', dialectLabel: 'Dialekt', indentLabel: 'Einrückung', uppercaseLabel: 'Schlüsselwörter großschreiben', statsLabel: 'Statistik', lines: 'Zeilen', chars: 'Zeichen' },
  it: { title: 'Formattatore SQL', description: 'Formatta e abbellisci le query SQL.', inputLabel: 'SQL input', outputLabel: 'SQL formattato', formatBtn: 'Formatta SQL', minifyBtn: 'Minifica SQL', clearBtn: 'Cancella', loadSampleBtn: 'Esempio', placeholder: 'Incolla qui la query SQL...', dialectLabel: 'Dialetto', indentLabel: 'Rientro', uppercaseLabel: 'Parole chiave maiuscole', statsLabel: 'Statistiche', lines: 'righe', chars: 'caratteri' },
  es: { title: 'Formateador de Consultas SQL', description: 'Formatea y embellece consultas SQL.', inputLabel: 'SQL de entrada', outputLabel: 'SQL formateado', formatBtn: 'Formatear SQL', minifyBtn: 'Minificar SQL', clearBtn: 'Limpiar', loadSampleBtn: 'Ejemplo', placeholder: 'Pega tu consulta SQL aquí...', dialectLabel: 'Dialecto', indentLabel: 'Sangría', uppercaseLabel: 'Palabras clave en mayúsculas', statsLabel: 'Estadísticas', lines: 'líneas', chars: 'caracteres' },
  pt: { title: 'Formatador de Consultas SQL', description: 'Formate e embeleze consultas SQL.', inputLabel: 'SQL entrada', outputLabel: 'SQL formatado', formatBtn: 'Formatar SQL', minifyBtn: 'Minificar SQL', clearBtn: 'Limpar', loadSampleBtn: 'Exemplo', placeholder: 'Cole sua consulta SQL aqui...', dialectLabel: 'Dialeto', indentLabel: 'Indentação', uppercaseLabel: 'Palavras-chave em maiúsculas', statsLabel: 'Estatísticas', lines: 'linhas', chars: 'caracteres' },
  nl: { title: 'SQL Query Formatter', description: 'Formatteer en verfraai SQL-query\'s.', inputLabel: 'SQL invoer', outputLabel: 'Geformatteerde SQL', formatBtn: 'SQL formatteren', minifyBtn: 'SQL minifiëren', clearBtn: 'Wissen', loadSampleBtn: 'Voorbeeld', placeholder: 'Plak hier de SQL-query...', dialectLabel: 'Dialect', indentLabel: 'Inspringing', uppercaseLabel: 'Sleutelwoorden hoofdletters', statsLabel: 'Stats', lines: 'regels', chars: 'tekens' },
  pl: { title: 'Formatowanie Zapytań SQL', description: 'Formatuj i upiększaj zapytania SQL.', inputLabel: 'Wejście SQL', outputLabel: 'Sformatowane SQL', formatBtn: 'Formatuj SQL', minifyBtn: 'Minifikuj SQL', clearBtn: 'Wyczyść', loadSampleBtn: 'Przykład', placeholder: 'Wklej zapytanie SQL tutaj...', dialectLabel: 'Dialekt', indentLabel: 'Wcięcie', uppercaseLabel: 'Słowa kluczowe wielkie litery', statsLabel: 'Statystyki', lines: 'linie', chars: 'znaki' },
  sv: { title: 'SQL Query Formatter', description: 'Formatera och förbättra SQL-frågor.', inputLabel: 'SQL indata', outputLabel: 'Formaterad SQL', formatBtn: 'Formatera SQL', minifyBtn: 'Minifiera SQL', clearBtn: 'Rensa', loadSampleBtn: 'Exempel', placeholder: 'Klistra in SQL-frågan här...', dialectLabel: 'Dialekt', indentLabel: 'Indrag', uppercaseLabel: 'Nyckelord versaler', statsLabel: 'Stats', lines: 'rader', chars: 'tecken' },
  no: { title: 'SQL Query Formatter', description: 'Formater og forbedre SQL-spørringer.', inputLabel: 'SQL inndata', outputLabel: 'Formatert SQL', formatBtn: 'Formater SQL', minifyBtn: 'Minifiser SQL', clearBtn: 'Tøm', loadSampleBtn: 'Eksempel', placeholder: 'Lim inn SQL-spørringen her...', dialectLabel: 'Dialekt', indentLabel: 'Innrykk', uppercaseLabel: 'Nøkkelord store bokstaver', statsLabel: 'Stats', lines: 'linjer', chars: 'tegn' },
  zh: { title: 'SQL 查询格式化工具', description: '格式化和美化 SQL 查询语句。', inputLabel: 'SQL 输入', outputLabel: '格式化后的 SQL', formatBtn: '格式化 SQL', minifyBtn: '压缩 SQL', clearBtn: '清除', loadSampleBtn: '加载示例', placeholder: '在此粘贴 SQL 查询...', dialectLabel: '方言', indentLabel: '缩进', uppercaseLabel: '关键字大写', statsLabel: '统计', lines: '行', chars: '字符' },
  ja: { title: 'SQL クエリ フォーマッター', description: 'SQLクエリをフォーマット・整形します。', inputLabel: 'SQL 入力', outputLabel: 'フォーマット済み SQL', formatBtn: 'SQL 整形', minifyBtn: 'SQL 圧縮', clearBtn: 'クリア', loadSampleBtn: 'サンプル', placeholder: 'SQLをここに貼り付け...', dialectLabel: 'ダイアレクト', indentLabel: 'インデント', uppercaseLabel: 'キーワード大文字', statsLabel: '統計', lines: '行', chars: '文字' },
  ko: { title: 'SQL 쿼리 포맷터', description: 'SQL 쿼리를 포맷하고 정리합니다.', inputLabel: 'SQL 입력', outputLabel: '포맷된 SQL', formatBtn: 'SQL 정리', minifyBtn: 'SQL 압축', clearBtn: '지우기', loadSampleBtn: '샘플', placeholder: 'SQL 쿼리를 여기에 붙여넣기...', dialectLabel: '방언', indentLabel: '들여쓰기', uppercaseLabel: '키워드 대문자', statsLabel: '통계', lines: '줄', chars: '문자' },
  id: { title: 'Formatter SQL Query', description: 'Format dan percantik query SQL.', inputLabel: 'SQL Input', outputLabel: 'SQL Terformat', formatBtn: 'Format SQL', minifyBtn: 'Minifikasi SQL', clearBtn: 'Hapus', loadSampleBtn: 'Contoh', placeholder: 'Tempel query SQL di sini...', dialectLabel: 'Dialek', indentLabel: 'Indentasi', uppercaseLabel: 'Kata kunci huruf besar', statsLabel: 'Statistik', lines: 'baris', chars: 'karakter' },
  th: { title: 'SQL Query Formatter', description: 'จัดรูปแบบและปรับปรุง SQL query', inputLabel: 'SQL นำเข้า', outputLabel: 'SQL ที่จัดรูปแบบแล้ว', formatBtn: 'จัดรูปแบบ SQL', minifyBtn: 'บีบอัด SQL', clearBtn: 'ล้าง', loadSampleBtn: 'ตัวอย่าง', placeholder: 'วาง SQL query ที่นี่...', dialectLabel: 'ภาษาถิ่น', indentLabel: 'การเยื้อง', uppercaseLabel: 'คีย์เวิร์ดตัวพิมพ์ใหญ่', statsLabel: 'สถิติ', lines: 'บรรทัด', chars: 'อักขระ' },
};

const SAMPLE_SQL = `SELECT u.id, u.name, u.email, COUNT(o.id) AS order_count, SUM(o.total) AS total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2024-01-01' AND u.status = 'active' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 0 ORDER BY total_spent DESC LIMIT 50;`;

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN', 'CROSS JOIN',
  'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
  'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'UNIQUE', 'NOT NULL', 'DEFAULT', 'CHECK',
  'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'AS', 'DISTINCT', 'TOP', 'WITH', 'OVER', 'PARTITION BY',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'CONVERT',
];

// Newline-before keywords in formatted output
const NEWLINE_BEFORE = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
];

function formatSQL(sql: string, indent: string, uppercase: boolean): string {
  if (!sql.trim()) return '';

  // Normalize whitespace
  let s = sql.replace(/\s+/g, ' ').trim();

  // Apply uppercase to keywords if requested
  if (uppercase) {
    SQL_KEYWORDS.forEach(kw => {
      const re = new RegExp(`\\b${kw}\\b`, 'gi');
      s = s.replace(re, kw);
    });
  }

  // Insert newlines before major clauses
  NEWLINE_BEFORE.forEach(kw => {
    const re = new RegExp(`\\b${kw}\\b`, 'gi');
    s = s.replace(re, (m) => '\n' + (uppercase ? m.toUpperCase() : m));
  });

  // Split on commas at the top level (not inside parens)
  const indentStr = indent === 'tab' ? '\t' : indent === '4' ? '    ' : '  ';
  const lines = s.split('\n').filter(l => l.trim());
  const result = lines.map((line, idx) => {
    const trimmed = line.trim();
    // Indent sub-clauses
    const isMain = NEWLINE_BEFORE.some(kw => new RegExp(`^${kw}\\b`, 'i').test(trimmed));
    if (idx === 0) return trimmed;
    if (isMain) return trimmed;
    return indentStr + trimmed;
  });

  return result.join('\n');
}

function minifySQL(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}

export default function SqlQueryFormatter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState('2');
  const [uppercase, setUppercase] = useState(true);

  const handleFormat = () => {
    if (!input.trim()) return;
    setOutput(formatSQL(input, indent, uppercase));
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setOutput(minifySQL(input));
  };

  const inputLines = input.split('\n').length;
  const outputLines = output.split('\n').length;

  return (
    <ToolLayout title={t.title} description={t.description} toolId="sql-query-formatter">
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.indentLabel}:</label>
          {[{ key: '2', label: '2' }, { key: '4', label: '4' }, { key: 'tab', label: 'Tab' }].map(opt => (
            <button key={opt.key} onClick={() => setIndent(opt.key)}
              className={indent === opt.key ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 12, padding: '5px 10px' }}>
              {opt.label}
            </button>
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          {t.uppercaseLabel}
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleFormat} className="btn btn-primary">{t.formatBtn}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{t.minifyBtn}</button>
        <button onClick={() => setInput(SAMPLE_SQL)} className="btn btn-secondary">{t.loadSampleBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clearBtn}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12 }}
          />
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            {inputLines} {t.lines} · {input.length} {t.chars}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12 }}
          />
          {output && (
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
              {outputLines} {t.lines} · {output.length} {t.chars}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
