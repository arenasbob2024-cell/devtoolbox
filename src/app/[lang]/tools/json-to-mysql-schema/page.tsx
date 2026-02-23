'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to MySQL Schema',
    description: 'Convert JSON objects to MySQL CREATE TABLE statements automatically. Smart data type detection for strings, numbers, booleans, dates, and more.',
    inputLabel: 'JSON Input',
    inputPlaceholder: '{\n  "id": 1,\n  "name": "Alice",\n  "email": "alice@example.com",\n  "age": 30,\n  "active": true,\n  "createdAt": "2024-01-15T10:30:00Z"\n}',
    tableName: 'Table Name',
    convertBtn: 'Generate Schema',
    clear: 'Clear',
    loadSample: 'Load Sample',
    outputLabel: 'MySQL CREATE TABLE',
    options: 'Options',
    addTimestamps: 'Add created_at / updated_at',
    addPrimaryKey: 'Add auto-increment id',
    nullableByDefault: 'Nullable by default',
    introTitle: 'Free JSON to MySQL Schema Converter',
    introText: 'This tool converts JSON objects to MySQL CREATE TABLE statements by analyzing the structure and data types of your JSON. It automatically maps JSON types to appropriate MySQL column types: strings become VARCHAR or TEXT, numbers become INT or DECIMAL, booleans become TINYINT(1), and ISO date strings become DATETIME.',
    tipTitle: 'MySQL Schema Tips',
    tip1: 'Use VARCHAR for short strings (up to 255 chars) and TEXT for longer content',
    tip2: 'BIGINT is recommended for IDs to support large datasets',
    tip3: 'Use TINYINT(1) for boolean values in MySQL (0=false, 1=true)',
    tip4: 'Always add indexes on columns used in WHERE clauses for performance',
    tip5: 'DATETIME stores both date and time, DATE stores only the date',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does JSON to MySQL conversion work?',
    faq1a: 'The tool analyzes each key in your JSON object and determines the most appropriate MySQL data type based on the value type and format. String values become VARCHAR(255) or TEXT. Integer numbers become INT. Float numbers become DECIMAL. Boolean values become TINYINT(1). ISO date strings become DATETIME.',
    faq2q: 'What MySQL data types are supported?',
    faq2a: 'The converter detects and uses: VARCHAR(255) for short strings, TEXT for long strings, INT for integer numbers, DECIMAL(10,2) for floating point numbers, TINYINT(1) for booleans, DATETIME for date strings, and JSON for nested objects and arrays.',
    faq3q: 'Can I convert nested JSON objects?',
    faq3a: 'Nested objects and arrays are mapped to JSON column type in MySQL, which allows you to store complex nested data. For relational databases, you would typically normalize these into separate tables with foreign key relationships.',
    faq4q: 'How do I add the schema to my MySQL database?',
    faq4a: 'Copy the generated CREATE TABLE statement and execute it in your MySQL client (MySQL Workbench, phpMyAdmin, command line, or your database management tool). You can run it directly with: mysql -u username -p database_name < schema.sql',
    faq5q: 'What are NULL and NOT NULL in MySQL?',
    faq5a: 'NOT NULL means a column must always have a value — it cannot be empty. NULL means the column can store no value (unknown or missing data). It is generally best practice to use NOT NULL with a DEFAULT value where possible, as NULL values can complicate queries and indexes.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 MySQL Schema',
    description: '自动将 JSON 对象转换为 MySQL CREATE TABLE 建表语句，智能推断数据类型。',
    inputLabel: 'JSON 输入', inputPlaceholder: '{\n  "id": 1,\n  "name": "张三",\n  "email": "zhangsan@example.com"\n}',
    tableName: '表名', convertBtn: '生成 Schema', clear: '清除', loadSample: '加载示例',
    outputLabel: 'MySQL CREATE TABLE', options: '选项',
    addTimestamps: '添加 created_at / updated_at', addPrimaryKey: '添加自增 id', nullableByDefault: '默认可为空',
    introTitle: '免费 JSON 转 MySQL Schema 转换器',
    introText: '此工具通过分析 JSON 的结构和数据类型，将 JSON 对象转换为 MySQL CREATE TABLE 语句。字符串变为 VARCHAR 或 TEXT，数字变为 INT 或 DECIMAL，布尔值变为 TINYINT(1)，日期字符串变为 DATETIME。',
    tipTitle: 'MySQL Schema 提示',
    tip1: '短字符串使用 VARCHAR（最多255字符），长内容使用 TEXT', tip2: 'ID 推荐使用 BIGINT 以支持大型数据集',
    tip3: 'MySQL 中布尔值使用 TINYINT(1)（0=false，1=true）', tip4: '在 WHERE 子句中使用的列上添加索引以提高性能',
    tip5: 'DATETIME 存储日期和时间，DATE 仅存储日期',
    faqTitle: '常见问题',
    faq1q: 'JSON 转 MySQL 转换如何工作？', faq1a: '工具分析 JSON 中的每个键，根据值的类型和格式确定最合适的 MySQL 数据类型。',
    faq2q: '支持哪些 MySQL 数据类型？', faq2a: 'VARCHAR(255)用于短字符串，TEXT用于长字符串，INT用于整数，DECIMAL(10,2)用于浮点数，TINYINT(1)用于布尔值，DATETIME用于日期字符串，JSON用于嵌套对象。',
    faq3q: '可以转换嵌套 JSON 对象吗？', faq3a: '嵌套对象和数组映射为 MySQL 中的 JSON 列类型。对于关系型数据库，通常需要规范化为具有外键关系的单独表。',
    faq4q: '如何将 Schema 添加到 MySQL 数据库？', faq4a: '复制生成的 CREATE TABLE 语句并在 MySQL 客户端中执行。',
    faq5q: 'MySQL 中 NULL 和 NOT NULL 是什么？', faq5a: 'NOT NULL 表示列必须始终有值。NULL 表示列可以存储空值。通常最佳实践是在可能的情况下使用 NOT NULL 和 DEFAULT 值。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'JSONからMySQLスキーマへ',
    description: 'JSONオブジェクトをMySQL CREATE TABLE文に自動変換。スマートなデータ型検出。',
    inputLabel: 'JSON入力', inputPlaceholder: '{\n  "id": 1,\n  "name": "太郎",\n  "email": "taro@example.com"\n}',
    tableName: 'テーブル名', convertBtn: 'スキーマ生成', clear: 'クリア', loadSample: 'サンプル',
    outputLabel: 'MySQL CREATE TABLE', options: 'オプション',
    addTimestamps: 'created_at / updated_at を追加', addPrimaryKey: '自動増分 id を追加', nullableByDefault: 'デフォルトでNULL許可',
    introTitle: '無料 JSON から MySQL スキーマへのコンバーター',
    introText: 'JSONの構造とデータ型を分析して MySQL CREATE TABLE 文を生成します。',
    tipTitle: 'ヒント', tip1: '短い文字列にはVARCHAR（最大255文字）、長い内容にはTEXT', tip2: 'IDにはBIGINTを推奨',
    tip3: 'MySQLのブール値にはTINYINT(1)を使用', tip4: 'WHERE句で使用する列にインデックスを追加', tip5: 'DATETIMEは日時、DATEは日付のみ',
    faqTitle: 'よくある質問',
    faq1q: 'JSONからMySQLへの変換はどう機能しますか？', faq1a: 'JSONの各キーを分析し、値のタイプと形式に基づいて最適なMySQLデータ型を決定します。',
    faq2q: 'どのMySQLデータ型がサポートされていますか？', faq2a: 'VARCHAR(255)、TEXT、INT、DECIMAL(10,2)、TINYINT(1)、DATETIME、JSONがサポートされています。',
    faq3q: 'ネストしたJSONを変換できますか？', faq3a: 'ネストしたオブジェクトと配列はMySQLのJSON型にマッピングされます。',
    faq4q: 'スキーマをMySQLデータベースに追加するには？', faq4a: '生成されたCREATE TABLE文をコピーしてMySQLクライアントで実行します。',
    faq5q: 'MySQLのNULLとNOT NULLとは？', faq5a: 'NOT NULLは列に常に値が必要。NULLは空値を格納可能。通常はNOT NULLとDEFAULT値を使用するのがベストプラクティス。',
    relatedTitle: '関連ツール',
  },
};

const SAMPLE_JSON = `{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "age": 28,
  "balance": 1250.50,
  "isActive": true,
  "role": "admin",
  "bio": "Software developer with 5 years of experience in web development",
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLogin": "2024-03-20T08:00:00Z",
  "preferences": { "theme": "dark", "language": "en" }
}`;

function inferMySQLType(value: unknown, key: string): string {
  if (value === null || value === undefined) return 'VARCHAR(255)';
  if (typeof value === 'boolean') return 'TINYINT(1)';
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'INT' : 'DECIMAL(10,2)';
  }
  if (typeof value === 'string') {
    if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/.test(value)) return 'DATETIME';
    if (value.length > 255) return 'TEXT';
    return 'VARCHAR(255)';
  }
  if (typeof value === 'object') return 'JSON';
  return 'VARCHAR(255)';
}

function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

function generateSchema(jsonStr: string, tableName: string, addTimestamps: boolean, addPK: boolean, nullable: boolean): string {
  let obj: Record<string, unknown>;
  try {
    const parsed = JSON.parse(jsonStr);
    obj = Array.isArray(parsed) ? parsed[0] : parsed;
  } catch {
    throw new Error('Invalid JSON');
  }

  const lines: string[] = [];
  const null_str = nullable ? 'DEFAULT NULL' : 'NOT NULL';

  if (addPK && !('id' in obj)) {
    lines.push('  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
  }

  for (const [key, value] of Object.entries(obj)) {
    const col = toSnakeCase(key);
    const type = inferMySQLType(value, key);
    if (col === 'id' && addPK) {
      lines.push(`  \`${col}\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT`);
    } else {
      const defaultVal = value === null ? ' DEFAULT NULL' : (nullable ? ' DEFAULT NULL' : '');
      lines.push(`  \`${col}\` ${type} ${null_str}${defaultVal}`.trimEnd());
    }
  }

  if (addTimestamps) {
    lines.push('  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP');
    lines.push('  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
  }

  const pkLine = (addPK || 'id' in obj) ? ',\n  PRIMARY KEY (`id`)' : '';

  return `CREATE TABLE \`${tableName}\` (\n${lines.join(',\n')}${pkLine}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
}

export default function JsonToMysqlSchema() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [jsonInput, setJsonInput] = useState('');
  const [tableName, setTableName] = useState('my_table');
  const [addTimestamps, setAddTimestamps] = useState(true);
  const [addPK, setAddPK] = useState(true);
  const [nullable, setNullable] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = () => {
    try {
      const schema = generateSchema(jsonInput, tableName || 'my_table', addTimestamps, addPK, nullable);
      setOutput(schema);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-mysql-schema">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4 }}>{t.tableName}</label>
          <input type="text" value={tableName} onChange={e => setTableName(e.target.value)}
            style={{ padding: '8px 12px', fontSize: 13, fontFamily: 'monospace', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', width: 160 }} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: t.addPrimaryKey, val: addPK, set: setAddPK },
            { label: t.addTimestamps, val: addTimestamps, set: setAddTimestamps },
            { label: t.nullableByDefault, val: nullable, set: setNullable },
          ].map(({ label, val, set }) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleConvert} className="btn btn-primary">{t.convertBtn}</button>
          <button onClick={() => { setJsonInput(SAMPLE_JSON); setOutput(''); setError(''); }} className="btn btn-secondary">{t.loadSample}</button>
          <button onClick={() => { setJsonInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        </div>
      </div>

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.inputLabel}</label>
          <textarea value={jsonInput} onChange={e => setJsonInput(e.target.value)} placeholder={t.inputPlaceholder}
            style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 12, resize: 'vertical' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          {error && <div style={{ padding: '10px 14px', background: '#ef444415', border: '1px solid #ef444440', borderRadius: 6, color: '#ef4444', fontSize: 13 }}>{error}</div>}
          <pre style={{ minHeight: 300, background: '#0a0a0a', color: '#22c55e', padding: 14, borderRadius: 8, fontSize: 11, fontFamily: 'monospace', overflow: 'auto', border: '1px solid var(--border-color)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {output || '-- Output will appear here...'}
          </pre>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.tipTitle}</h3>
        <ul style={{ paddingLeft: 20, marginBottom: 24, fontSize: 13, lineHeight: 2, color: 'var(--text-secondary)' }}>
          <li>{t.tip1}</li><li>{t.tip2}</li><li>{t.tip3}</li><li>{t.tip4}</li><li>{t.tip5}</li>
        </ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }, { q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-yaml`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON' },
            { href: `/${lang}/tools/json-to-typescript`, label: 'JSON to TypeScript' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
