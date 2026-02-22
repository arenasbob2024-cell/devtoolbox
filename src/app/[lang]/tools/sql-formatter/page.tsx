'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Formatter',
    description: 'Format, beautify, and minify SQL queries online. Supports SELECT, INSERT, UPDATE, DELETE, JOIN, subqueries, and more with configurable indentation.',
    inputLabel: 'SQL Input',
    outputLabel: 'Formatted Output',
    formatBtn: 'Format SQL',
    minifyBtn: 'Minify',
    clearBtn: 'Clear',
    sampleBtn: 'Load Sample',
    placeholder: 'Paste your SQL query here...',
    outputPlaceholder: 'Formatted SQL will appear here...',
    indent: 'Indentation',
    spaces2: '2 Spaces',
    spaces4: '4 Spaces',
    tabs: 'Tabs',
    uppercase: 'Uppercase Keywords',
    charCount: 'characters',
    lineCount: 'lines',
    emptyState: 'Paste SQL and click Format to beautify your query',
    introTitle: 'Free Online SQL Formatter & Beautifier',
    introText: 'Format and beautify messy SQL queries into clean, readable code. This tool supports all major SQL statements including SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER, JOIN, WHERE, GROUP BY, ORDER BY, HAVING, UNION, and subqueries. Configurable indentation (2 spaces, 4 spaces, or tabs) and automatic keyword uppercasing make your SQL consistent and professional.',
    howTitle: 'How to Format SQL',
    step1: 'Paste your SQL query into the input area',
    step2: 'Choose your indentation style (2 spaces, 4 spaces, or tabs)',
    step3: 'Click Format SQL to beautify, or Minify to compress',
    step4: 'Copy the formatted output with one click',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What SQL dialects are supported?',
    faq1a: 'This formatter supports standard SQL syntax compatible with MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and most other relational databases. It handles SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE, DROP, JOIN, UNION, and subqueries.',
    faq2q: 'Does formatting change the query behavior?',
    faq2a: 'No. SQL formatting only adds whitespace, line breaks, and changes keyword casing. The query logic and execution results remain completely identical.',
    faq3q: 'What does the Minify button do?',
    faq3a: 'Minify removes all unnecessary whitespace, comments, and line breaks, compressing the SQL into a single line. This is useful for reducing payload size in API requests or configuration files.',
    faq4q: 'Can I format SQL with subqueries?',
    faq4a: 'Yes. The formatter handles nested subqueries, CTEs (WITH clauses), and complex JOIN conditions. Subqueries are properly indented for readability.',
    faq5q: 'Is my SQL data safe?',
    faq5a: 'Absolutely. All formatting happens entirely in your browser using JavaScript. No SQL data is sent to any server. Your queries remain completely private.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'SQL 格式化工具',
    description: '在线格式化、美化和压缩 SQL 查询。支持 SELECT、INSERT、UPDATE、DELETE、JOIN、子查询等。',
    inputLabel: 'SQL 输入', outputLabel: '格式化输出',
    formatBtn: '格式化 SQL', minifyBtn: '压缩', clearBtn: '清除', sampleBtn: '加载示例',
    placeholder: '在此粘贴 SQL 查询...', outputPlaceholder: '格式化的 SQL 将显示在此...',
    indent: '缩进', spaces2: '2 空格', spaces4: '4 空格', tabs: 'Tab', uppercase: '关键字大写',
    charCount: '字符', lineCount: '行',
    emptyState: '粘贴 SQL 并点击格式化以美化查询',
    introTitle: '免费在线 SQL 格式化工具',
    introText: '将杂乱的 SQL 查询格式化为清晰可读的代码。支持所有主要 SQL 语句，可配置缩进和关键字大写。',
    howTitle: '如何格式化 SQL', step1: '粘贴 SQL 查询', step2: '选择缩进样式', step3: '点击格式化或压缩', step4: '一键复制输出',
    faqTitle: '常见问题',
    faq1q: '支持哪些 SQL 方言？', faq1a: '支持 MySQL、PostgreSQL、SQLite、SQL Server、Oracle 等标准 SQL 语法。',
    faq2q: '格式化会改变查询行为吗？', faq2a: '不会。SQL 格式化仅添加空白和换行，查询逻辑完全不变。',
    faq3q: '压缩按钮有什么用？', faq3a: '移除所有不必要的空白和换行，将 SQL 压缩成一行。',
    faq4q: '能格式化子查询吗？', faq4a: '可以。支持嵌套子查询、CTE（WITH 子句）和复杂 JOIN 条件。',
    faq5q: '我的 SQL 数据安全吗？', faq5a: '完全安全。所有格式化在浏览器中完成，数据不会发送到任何服务器。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Formateur SQL',
    description: 'Formatez et embellissez vos requetes SQL en ligne.',
    inputLabel: 'SQL', outputLabel: 'Sortie formatee',
    formatBtn: 'Formater', minifyBtn: 'Minifier', clearBtn: 'Effacer', sampleBtn: 'Exemple',
    placeholder: 'Collez votre requete SQL ici...', outputPlaceholder: 'SQL formate...',
    indent: 'Indentation', spaces2: '2 Espaces', spaces4: '4 Espaces', tabs: 'Tabs', uppercase: 'Mots-cles en majuscules',
    charCount: 'caracteres', lineCount: 'lignes',
    emptyState: 'Collez du SQL et cliquez Formater',
    introTitle: 'Formateur SQL gratuit', introText: 'Formatez vos requetes SQL pour plus de lisibilite.',
    howTitle: 'Comment formater', step1: 'Collez votre requete SQL', step2: 'Choisissez l\'indentation', step3: 'Cliquez Formater ou Minifier', step4: 'Copiez le resultat',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quels dialectes SQL ?', faq1a: 'Compatible MySQL, PostgreSQL, SQLite, SQL Server et Oracle.',
    faq2q: 'Le formatage change-t-il le comportement ?', faq2a: 'Non. Seuls les espaces et sauts de ligne sont modifies.',
    faq3q: 'Que fait Minifier ?', faq3a: 'Supprime les espaces inutiles et compresse en une ligne.',
    faq4q: 'Sous-requetes supportees ?', faq4a: 'Oui, avec indentation correcte.',
    faq5q: 'Mes donnees sont-elles securisees ?', faq5a: 'Oui, tout se passe dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'SQL-Formatierer',
    description: 'Formatieren und verschoenern Sie SQL-Abfragen online.',
    inputLabel: 'SQL', outputLabel: 'Formatierte Ausgabe',
    formatBtn: 'Formatieren', minifyBtn: 'Minimieren', clearBtn: 'Loeschen', sampleBtn: 'Beispiel',
    placeholder: 'SQL-Abfrage hier einfuegen...', outputPlaceholder: 'Formatiertes SQL...',
    indent: 'Einrueckung', spaces2: '2 Leerzeichen', spaces4: '4 Leerzeichen', tabs: 'Tabs', uppercase: 'Schluesselwoerter gross',
    charCount: 'Zeichen', lineCount: 'Zeilen',
    emptyState: 'SQL einfuegen und Formatieren klicken',
    introTitle: 'Kostenloser SQL-Formatierer', introText: 'Formatieren Sie SQL-Abfragen fuer bessere Lesbarkeit.',
    howTitle: 'So formatieren Sie SQL', step1: 'SQL einfuegen', step2: 'Einrueckung waehlen', step3: 'Formatieren klicken', step4: 'Ergebnis kopieren',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche SQL-Dialekte?', faq1a: 'MySQL, PostgreSQL, SQLite, SQL Server und Oracle.',
    faq2q: 'Aendert Formatierung das Verhalten?', faq2a: 'Nein, nur Leerzeichen und Umbrueche werden geaendert.',
    faq3q: 'Was macht Minimieren?', faq3a: 'Entfernt ueberfluessige Leerzeichen und komprimiert auf eine Zeile.',
    faq4q: 'Unterabfragen unterstuetzt?', faq4a: 'Ja, mit korrekter Einrueckung.',
    faq5q: 'Sind meine Daten sicher?', faq5a: 'Ja, alles laeuft im Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Formateador SQL',
    description: 'Formatea y embellece consultas SQL en linea.',
    inputLabel: 'SQL', outputLabel: 'Salida formateada',
    formatBtn: 'Formatear', minifyBtn: 'Minificar', clearBtn: 'Borrar', sampleBtn: 'Ejemplo',
    placeholder: 'Pega tu consulta SQL aqui...', outputPlaceholder: 'SQL formateado...',
    indent: 'Indentacion', spaces2: '2 Espacios', spaces4: '4 Espacios', tabs: 'Tabs', uppercase: 'Mayusculas',
    charCount: 'caracteres', lineCount: 'lineas',
    emptyState: 'Pega SQL y haz clic en Formatear',
    introTitle: 'Formateador SQL gratuito', introText: 'Formatea tus consultas SQL para mejor legibilidad.',
    howTitle: 'Como formatear', step1: 'Pega tu consulta SQL', step2: 'Elige la indentacion', step3: 'Clic en Formatear o Minificar', step4: 'Copia el resultado',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que dialectos SQL?', faq1a: 'MySQL, PostgreSQL, SQLite, SQL Server y Oracle.',
    faq2q: 'El formateo cambia el comportamiento?', faq2a: 'No, solo se modifican espacios y saltos de linea.',
    faq3q: 'Que hace Minificar?', faq3a: 'Elimina espacios innecesarios y comprime en una linea.',
    faq4q: 'Soporta subconsultas?', faq4a: 'Si, con indentacion correcta.',
    faq5q: 'Mis datos estan seguros?', faq5a: 'Si, todo se procesa en tu navegador.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'SQLフォーマッター',
    description: 'SQLクエリをオンラインでフォーマット・整形します。',
    inputLabel: 'SQL入力', outputLabel: 'フォーマット出力',
    formatBtn: 'フォーマット', minifyBtn: '圧縮', clearBtn: 'クリア', sampleBtn: 'サンプル',
    placeholder: 'SQLクエリを貼り付け...', outputPlaceholder: 'フォーマットされたSQL...',
    indent: 'インデント', spaces2: '2スペース', spaces4: '4スペース', tabs: 'タブ', uppercase: 'キーワード大文字',
    charCount: '文字', lineCount: '行',
    emptyState: 'SQLを貼り付けてフォーマットをクリック',
    introTitle: '無料SQLフォーマッター', introText: 'SQLクエリを読みやすく整形します。',
    howTitle: 'フォーマット方法', step1: 'SQLクエリを貼り付け', step2: 'インデントを選択', step3: 'フォーマットをクリック', step4: '結果をコピー',
    faqTitle: 'よくある質問',
    faq1q: '対応SQLは？', faq1a: 'MySQL、PostgreSQL、SQLite、SQL Server、Oracleに対応。',
    faq2q: 'フォーマットで動作は変わる？', faq2a: 'いいえ。空白と改行のみが変更されます。',
    faq3q: '圧縮とは？', faq3a: '不要な空白を削除し1行に圧縮します。',
    faq4q: 'サブクエリは対応？', faq4a: 'はい。適切にインデントされます。',
    faq5q: 'データは安全？', faq5a: 'はい。すべてブラウザ内で処理されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'SQL 포맷터',
    description: 'SQL 쿼리를 온라인으로 포맷하고 정리합니다.',
    inputLabel: 'SQL 입력', outputLabel: '포맷된 출력',
    formatBtn: '포맷', minifyBtn: '압축', clearBtn: '지우기', sampleBtn: '샘플',
    placeholder: 'SQL 쿼리를 붙여넣기...', outputPlaceholder: '포맷된 SQL...',
    indent: '들여쓰기', spaces2: '2 스페이스', spaces4: '4 스페이스', tabs: '탭', uppercase: '키워드 대문자',
    charCount: '문자', lineCount: '줄',
    emptyState: 'SQL을 붙여넣고 포맷을 클릭하세요',
    introTitle: '무료 SQL 포맷터', introText: 'SQL 쿼리를 읽기 쉽게 정리합니다.',
    howTitle: '포맷 방법', step1: 'SQL 쿼리 붙여넣기', step2: '들여쓰기 선택', step3: '포맷 클릭', step4: '결과 복사',
    faqTitle: '자주 묻는 질문',
    faq1q: '지원 SQL은?', faq1a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle을 지원합니다.',
    faq2q: '포맷이 동작을 바꾸나요?', faq2a: '아니요. 공백과 줄바꿈만 변경됩니다.',
    faq3q: '압축이란?', faq3a: '불필요한 공백을 제거하고 한 줄로 압축합니다.',
    faq4q: '서브쿼리 지원?', faq4a: '네. 적절히 들여쓰기됩니다.',
    faq5q: '데이터가 안전한가요?', faq5a: '네. 모든 처리가 브라우저에서 이루어집니다.',
    relatedTitle: '관련 도구',
  },
};

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL',
  'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN', 'CROSS JOIN',
  'ON', 'USING', 'AS',
  'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'FETCH',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
  'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE TABLE',
  'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'DROP VIEW',
  'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
  'DISTINCT', 'ALL', 'TOP', 'BETWEEN', 'LIKE', 'EXISTS',
  'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'WITH', 'RECURSIVE', 'IF', 'BEGIN', 'COMMIT', 'ROLLBACK',
  'ASC', 'DESC', 'CASCADE', 'CONSTRAINT', 'PRIMARY KEY', 'FOREIGN KEY',
  'REFERENCES', 'DEFAULT', 'CHECK', 'UNIQUE', 'INDEX',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'CAST',
  'INTO', 'TABLE',
];

function formatSql(sql: string, indentStr: string, uppercaseKw: boolean): string {
  let formatted = sql.trim();
  if (!formatted) return '';

  // Remove SQL comments
  formatted = formatted.replace(/--.*$/gm, '');
  formatted = formatted.replace(/\/\*[\s\S]*?\*\//g, '');

  // Normalize whitespace
  formatted = formatted.replace(/\s+/g, ' ').trim();

  // Uppercase keywords (sorted by length desc to replace longer phrases first)
  if (uppercaseKw) {
    const sortedKw = [...SQL_KEYWORDS].sort((a, b) => b.length - a.length);
    sortedKw.forEach(kw => {
      const regex = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi');
      formatted = formatted.replace(regex, kw);
    });
  }

  // Newline-before clauses (major clauses get their own line)
  const newlineBefore = [
    'SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET', 'FETCH',
    'UNION ALL', 'UNION', 'INTERSECT', 'EXCEPT',
    'INSERT INTO', 'UPDATE', 'DELETE FROM', 'SET',
    'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
    'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN',
    'VALUES', 'WITH',
  ];
  // Sort by length descending so "LEFT JOIN" matches before "JOIN"
  const sortedClauses = [...newlineBefore].sort((a, b) => b.length - a.length);

  sortedClauses.forEach(clause => {
    const regex = new RegExp(`\\b(${clause.replace(/ /g, '\\s+')})\\b`, 'gi');
    formatted = formatted.replace(regex, (match) => {
      const upper = uppercaseKw ? clause : match;
      return '\n' + upper;
    });
  });

  // Indent sub-clauses
  const lines = formatted.split('\n').map(l => l.trim()).filter(Boolean);
  const indentClauses = ['AND', 'OR', 'ON', 'USING', 'SET', 'WHEN', 'THEN', 'ELSE', 'END'];

  const result: string[] = [];
  let depth = 0;

  for (const line of lines) {
    const upper = line.toUpperCase();
    // Decrease depth for closing paren lines
    if (upper.startsWith(')')) {
      depth = Math.max(0, depth - 1);
    }

    const isSubClause = indentClauses.some(c => upper.startsWith(c + ' ') || upper === c);
    const lineIndent = isSubClause ? indentStr.repeat(depth + 1) : indentStr.repeat(depth);
    result.push(lineIndent + line);

    // Track parentheses depth
    const opens = (line.match(/\(/g) || []).length;
    const closes = (line.match(/\)/g) || []).length;
    depth += opens - closes;
    if (depth < 0) depth = 0;
  }

  return result.join('\n');
}

function minifySql(sql: string): string {
  return sql
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const SAMPLE = `select u.id, u.name, u.email, count(o.id) as order_count, sum(o.total) as total_spent from users u left join orders o on u.id = o.user_id where u.status = 'active' and u.created_at > '2024-01-01' group by u.id, u.name, u.email having count(o.id) > 5 order by total_spent desc limit 100`;

export default function SqlFormatter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indentType, setIndentType] = useState<'2' | '4' | 'tab'>('2');
  const [uppercase, setUppercase] = useState(true);

  const indentStr = indentType === 'tab' ? '\t' : indentType === '4' ? '    ' : '  ';

  const handleFormat = useCallback(() => {
    setOutput(formatSql(input, indentStr, uppercase));
  }, [input, indentStr, uppercase]);

  const handleMinify = useCallback(() => {
    setOutput(minifySql(input));
  }, [input]);

  const handleClear = () => { setInput(''); setOutput(''); };
  const handleSample = () => { setInput(SAMPLE); setOutput(formatSql(SAMPLE, indentStr, uppercase)); };

  const inputStats = `${input.length} ${t.charCount}`;
  const outputStats = output ? `${output.length} ${t.charCount} | ${output.split('\n').length} ${t.lineCount}` : '';

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="sql-formatter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleFormat} className="btn btn-primary">{t.formatBtn}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{t.minifyBtn}</button>
        <button onClick={handleSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <button onClick={handleClear} className="btn btn-secondary">{t.clearBtn}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 }}>{t.indent}:</span>
          {([['2', t.spaces2], ['4', t.spaces4], ['tab', t.tabs]] as const).map(([v, label]) => (
            <button key={v} onClick={() => setIndentType(v as '2' | '4' | 'tab')}
              className={indentType === v ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ fontSize: 11, padding: '4px 10px' }}>
              {label}
            </button>
          ))}
          <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
            {t.uppercase}
          </label>
        </div>
      </div>

      {/* Editor panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{inputStats}</span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 360, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
            <label style={{ fontSize: 12, fontWeight: 600 }}>{t.outputLabel}</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{outputStats}</span>
              {output && <CopyButton text={output} />}
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 360, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li><li>{t.step4}</li>
        </ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, i) => (
            <details key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/sql-to-prisma`, label: 'SQL to Prisma' },
            { href: `/${lang}/tools/xml-formatter`, label: 'XML Formatter' },
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
