'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

/* ── SQL Formatter Engine ─────────────────────────────────────── */
const SQL_KEYWORDS_MAJOR = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
  'FULL OUTER JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN',
  'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
  'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT', 'INSERT INTO', 'VALUES',
  'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
  'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'IF', 'EXISTS', 'NOT EXISTS', 'IN', 'NOT IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL',
  'AS', 'DISTINCT', 'ALL', 'TOP', 'INTO', 'WITH', 'RETURNING',
];

const SQL_FUNCTIONS = [
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE', 'NULLIF', 'CAST', 'CONVERT',
  'UPPER', 'LOWER', 'TRIM', 'LTRIM', 'RTRIM', 'SUBSTRING', 'REPLACE', 'CONCAT',
  'LENGTH', 'CHAR_LENGTH', 'NOW', 'CURRENT_TIMESTAMP', 'DATE', 'YEAR', 'MONTH', 'DAY',
  'ROUND', 'FLOOR', 'CEIL', 'ABS', 'MOD', 'POWER', 'SQRT',
  'IF', 'IIF', 'IFNULL', 'NVL', 'ISNULL',
  'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'NTILE', 'LAG', 'LEAD',
  'FIRST_VALUE', 'LAST_VALUE', 'OVER', 'PARTITION BY',
];

function formatSQL(sql: string, indentStr: string, uppercase: boolean): string {
  if (!sql.trim()) return '';

  // Normalize whitespace but preserve strings
  const strings: string[] = [];
  let normalized = sql.replace(/'[^']*'/g, (match) => {
    strings.push(match);
    return `__STR${strings.length - 1}__`;
  });

  // Normalize whitespace
  normalized = normalized.replace(/\s+/g, ' ').trim();

  // Uppercase keywords if requested
  if (uppercase) {
    const allKeywords = [...SQL_KEYWORDS_MAJOR, ...SQL_FUNCTIONS];
    allKeywords.sort((a, b) => b.length - a.length);
    for (const kw of allKeywords) {
      const regex = new RegExp(`\\b${kw.replace(/\s+/g, '\\s+')}\\b`, 'gi');
      normalized = normalized.replace(regex, kw);
    }
  }

  // Major keywords that start a new line at indent level 0
  const newLineKeywords = [
    'SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'OFFSET',
    'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
    'CREATE INDEX', 'DROP INDEX', 'CREATE VIEW', 'WITH', 'RETURNING',
  ];

  // Keywords that start a new line with indent
  const indentedKeywords = [
    'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'NATURAL JOIN',
    'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN',
    'JOIN', 'ON',
  ];

  const subIndentKeywords = ['AND', 'OR'];

  let result = normalized;

  // Add newlines before major keywords
  for (const kw of newLineKeywords) {
    const regex = new RegExp(`\\s+${kw.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    result = result.replace(regex, `\n${uppercase ? kw : kw}`);
  }

  // Add newlines before join keywords with indent
  for (const kw of indentedKeywords) {
    const regex = new RegExp(`\\s+${kw.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    result = result.replace(regex, `\n${indentStr}${uppercase ? kw : kw}`);
  }

  // Add newlines before AND/OR with double indent
  for (const kw of subIndentKeywords) {
    const regex = new RegExp(`\\s+${kw}\\b`, 'gi');
    result = result.replace(regex, `\n${indentStr}${indentStr}${uppercase ? kw : kw}`);
  }

  // Handle CASE/WHEN/THEN/ELSE/END
  result = result.replace(/\bCASE\b/gi, `\n${indentStr}CASE`);
  result = result.replace(/\bWHEN\b/gi, `\n${indentStr}${indentStr}WHEN`);
  result = result.replace(/\bTHEN\b/gi, ' THEN');
  result = result.replace(/\bELSE\b/gi, `\n${indentStr}${indentStr}ELSE`);
  result = result.replace(/\bEND\b/gi, `\n${indentStr}END`);

  // Handle commas - put each field on its own line after SELECT
  const lines = result.split('\n');
  const formattedLines: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toUpperCase().startsWith('SELECT')) {
      const afterSelect = trimmed.substring(6).trim();
      if (afterSelect.includes(',')) {
        const fields = afterSelect.split(',').map(f => f.trim()).filter(Boolean);
        formattedLines.push('SELECT');
        fields.forEach((field, i) => {
          formattedLines.push(`${indentStr}${field}${i < fields.length - 1 ? ',' : ''}`);
        });
      } else {
        formattedLines.push(trimmed);
      }
    } else {
      formattedLines.push(trimmed);
    }
  }

  result = formattedLines.join('\n');

  // Restore strings
  for (let i = 0; i < strings.length; i++) {
    result = result.replace(`__STR${i}__`, strings[i]);
  }

  // Clean up extra blank lines
  result = result.replace(/\n{3,}/g, '\n\n');
  return result.trim();
}

function minifySQL(sql: string): string {
  const strings: string[] = [];
  let result = sql.replace(/'[^']*'/g, (match) => {
    strings.push(match);
    return `__STR${strings.length - 1}__`;
  });
  // Remove comments
  result = result.replace(/--[^\n]*/g, '');
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  result = result.replace(/\s+/g, ' ').trim();
  for (let i = 0; i < strings.length; i++) {
    result = result.replace(`__STR${i}__`, strings[i]);
  }
  return result;
}

/* ── Sample SQL ───────────────────────────────────────────────── */
const sampleSQL = `select u.id, u.username, u.email, p.name as plan_name, count(o.id) as order_count, sum(o.total_amount) as total_spent from users u inner join subscriptions s on u.id = s.user_id inner join plans p on s.plan_id = p.id left join orders o on u.id = o.user_id where u.created_at >= '2024-01-01' and u.status = 'active' and (p.tier = 'premium' or p.tier = 'enterprise') group by u.id, u.username, u.email, p.name having count(o.id) > 5 order by total_spent desc limit 100 offset 0`;

/* ── i18n ──────────────────────────────────────────────────────── */
const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'SQL Formatter Online',
    description: 'Format, beautify, and indent SQL queries instantly. Supports SELECT, INSERT, UPDATE, DELETE, and complex joins.',
    inputLabel: 'SQL Input',
    outputLabel: 'Formatted SQL',
    inputPlaceholder: 'Paste your SQL query here...',
    outputPlaceholder: 'Formatted SQL will appear here...',
    format: 'Format SQL',
    minify: 'Minify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    uppercase: 'Uppercase Keywords',
    success: 'SQL formatted successfully',
    error: 'Could not format SQL',
    introTitle: 'Free Online SQL Formatter & Beautifier',
    introText: 'This SQL formatter takes your messy, minified, or poorly indented SQL queries and transforms them into clean, readable code. It supports all major SQL statements including SELECT, INSERT INTO, UPDATE, DELETE, CREATE TABLE, and complex JOIN operations. The formatter handles subqueries, CASE expressions, window functions, CTEs (WITH clauses), and aggregate functions. Ideal for developers, DBAs, and data analysts who need to quickly understand or debug SQL queries.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does the SQL formatter work?',
    faq1a: 'The SQL formatter parses your query and applies consistent indentation and line breaks based on SQL syntax rules. Major clauses (SELECT, FROM, WHERE, etc.) start on new lines, JOIN clauses are indented, and conditions (AND, OR) are further indented for readability. It preserves string literals and handles nested queries.',
    faq2q: 'What SQL dialects are supported?',
    faq2a: 'The formatter supports standard SQL syntax that works across MySQL, PostgreSQL, SQLite, SQL Server, Oracle, and other databases. It handles common keywords, functions, and syntax patterns from all major SQL dialects.',
    faq3q: 'Can I minify SQL queries?',
    faq3a: 'Yes! Click the "Minify" button to compress your SQL into a single line by removing unnecessary whitespace, line breaks, and comments. This is useful for embedding SQL in code or reducing payload size.',
    faq4q: 'Does the formatter handle complex queries?',
    faq4a: 'Yes, the formatter handles complex SQL including multiple JOINs, subqueries, CASE/WHEN expressions, window functions (ROW_NUMBER, RANK, etc.), Common Table Expressions (WITH/CTE), UNION/INTERSECT/EXCEPT, and nested SELECT statements.',
    faq5q: 'Is my SQL data safe?',
    faq5a: 'Absolutely. All formatting is done entirely in your browser using client-side JavaScript. No SQL data is sent to any server. Your queries never leave your computer, making this tool safe for formatting queries containing sensitive data.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'SQL 格式化工具',
    description: '即时格式化、美化和缩进 SQL 查询。支持 SELECT、INSERT、UPDATE、DELETE 和复杂联接。',
    inputLabel: 'SQL 输入',
    outputLabel: '格式化后的 SQL',
    inputPlaceholder: '在此粘贴 SQL 查询...',
    outputPlaceholder: '格式化后的 SQL 将在此显示...',
    format: '格式化 SQL',
    minify: '压缩',
    clear: '清除',
    loadSample: '加载示例',
    indent: '缩进',
    spaces: '空格',
    tab: 'Tab',
    uppercase: '关键字大写',
    success: 'SQL 格式化成功',
    error: '无法格式化 SQL',
    introTitle: '免费在线 SQL 格式化和美化工具',
    introText: '此 SQL 格式化工具可将杂乱、压缩或缩进不当的 SQL 查询转换为整洁、可读的代码。支持所有主要 SQL 语句，适合开发者、DBA 和数据分析师使用。',
    faqTitle: '常见问题',
    faq1q: 'SQL 格式化工具如何工作？',
    faq1a: '格式化工具解析您的查询，根据 SQL 语法规则应用一致的缩进和换行。主要子句在新行开始，JOIN 子句缩进，条件进一步缩进以提高可读性。',
    faq2q: '支持哪些 SQL 方言？',
    faq2a: '格式化工具支持标准 SQL 语法，适用于 MySQL、PostgreSQL、SQLite、SQL Server、Oracle 等数据库。',
    faq3q: '可以压缩 SQL 查询吗？',
    faq3a: '可以！点击"压缩"按钮将 SQL 压缩为单行。',
    faq4q: '格式化工具能处理复杂查询吗？',
    faq4a: '可以，支持多重 JOIN、子查询、CASE 表达式、窗口函数、CTE 和嵌套 SELECT。',
    faq5q: '我的 SQL 数据安全吗？',
    faq5a: '完全安全。所有格式化都在浏览器中完成，不会发送到任何服务器。',
    relatedTitle: '相关工具',
  },
  ja: {
    title: 'SQL フォーマッター',
    description: 'SQL クエリを即座にフォーマット、整形、インデント。SELECT、INSERT、UPDATE、DELETE、複雑な JOIN に対応。',
    inputLabel: 'SQL 入力', outputLabel: 'フォーマット済み SQL',
    inputPlaceholder: 'SQL クエリを貼り付け...', outputPlaceholder: 'フォーマット済み SQL がここに表示...',
    format: 'SQL をフォーマット', minify: '圧縮', clear: 'クリア', loadSample: 'サンプルを読み込む',
    indent: 'インデント', spaces: 'スペース', tab: 'タブ', uppercase: 'キーワード大文字化',
    success: 'SQL フォーマット成功', error: 'SQL をフォーマットできません',
    introTitle: '無料オンライン SQL フォーマッター',
    introText: 'この SQL フォーマッターは乱雑な SQL クエリをきれいで読みやすいコードに変換します。',
    faqTitle: 'よくある質問',
    faq1q: 'SQL フォーマッターはどう動作しますか？', faq1a: 'SQL 構文ルールに基づいて一貫したインデントと改行を適用します。',
    faq2q: '対応する SQL 方言は？', faq2a: 'MySQL、PostgreSQL、SQLite、SQL Server、Oracle など主要な SQL 方言に対応。',
    faq3q: 'SQL を圧縮できますか？', faq3a: 'はい！「圧縮」ボタンで SQL を 1 行に圧縮できます。',
    faq4q: '複雑なクエリに対応していますか？', faq4a: 'はい、JOIN、サブクエリ、CASE 式、ウィンドウ関数、CTE に対応。',
    faq5q: 'SQL データは安全ですか？', faq5a: 'はい、すべてブラウザ内で処理され、サーバーには送信されません。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'SQL 포매터 온라인',
    description: 'SQL 쿼리를 즉시 포맷, 정리 및 들여쓰기. SELECT, INSERT, UPDATE, DELETE 및 복잡한 JOIN 지원.',
    inputLabel: 'SQL 입력', outputLabel: '포맷된 SQL',
    inputPlaceholder: 'SQL 쿼리를 붙여넣으세요...', outputPlaceholder: '포맷된 SQL이 여기에 표시됩니다...',
    format: 'SQL 포맷', minify: '압축', clear: '지우기', loadSample: '샘플 로드',
    indent: '들여쓰기', spaces: '칸', tab: '탭', uppercase: '키워드 대문자화',
    success: 'SQL 포맷 성공', error: 'SQL을 포맷할 수 없습니다',
    introTitle: '무료 온라인 SQL 포매터',
    introText: '이 SQL 포매터는 지저분한 SQL 쿼리를 깔끔하고 읽기 쉬운 코드로 변환합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'SQL 포매터는 어떻게 작동하나요?', faq1a: 'SQL 구문 규칙에 따라 일관된 들여쓰기와 줄 바꿈을 적용합니다.',
    faq2q: '어떤 SQL 방언을 지원하나요?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle 등 주요 데이터베이스를 지원합니다.',
    faq3q: 'SQL을 압축할 수 있나요?', faq3a: '네! "압축" 버튼으로 SQL을 한 줄로 압축할 수 있습니다.',
    faq4q: '복잡한 쿼리를 처리할 수 있나요?', faq4a: '네, JOIN, 서브쿼리, CASE, 윈도우 함수, CTE를 지원합니다.',
    faq5q: 'SQL 데이터는 안전한가요?', faq5a: '네, 모든 처리는 브라우저에서 이루어지며 서버로 전송되지 않습니다.',
    relatedTitle: '관련 도구',
  },
  fr: {
    title: 'Formateur SQL en Ligne',
    description: 'Formatez, embellissez et indentez les requetes SQL instantanement. Supporte SELECT, INSERT, UPDATE, DELETE et jointures.',
    inputLabel: 'Entree SQL', outputLabel: 'SQL Formate',
    inputPlaceholder: 'Collez votre requete SQL ici...', outputPlaceholder: 'Le SQL formate apparaitra ici...',
    format: 'Formater SQL', minify: 'Minifier', clear: 'Effacer', loadSample: 'Charger un exemple',
    indent: 'Indentation', spaces: 'espaces', tab: 'Tab', uppercase: 'Mots-cles en majuscules',
    success: 'SQL formate avec succes', error: 'Impossible de formater le SQL',
    introTitle: 'Formateur SQL en Ligne Gratuit',
    introText: 'Ce formateur SQL transforme vos requetes desordonnees en code propre et lisible.',
    faqTitle: 'Questions Frequentes',
    faq1q: 'Comment fonctionne le formateur SQL ?', faq1a: 'Il analyse votre requete et applique une indentation et des sauts de ligne coherents.',
    faq2q: 'Quels dialectes SQL sont supportes ?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle et autres.',
    faq3q: 'Peut-on minifier les requetes SQL ?', faq3a: 'Oui ! Cliquez sur "Minifier" pour compresser le SQL en une seule ligne.',
    faq4q: 'Le formateur gere-t-il les requetes complexes ?', faq4a: 'Oui, il gere les jointures multiples, sous-requetes, CASE, fonctions fenetre et CTE.',
    faq5q: 'Mes donnees SQL sont-elles en securite ?', faq5a: 'Oui, tout est traite dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.',
    relatedTitle: 'Outils associes',
  },
  de: {
    title: 'SQL Formatter Online',
    description: 'SQL-Abfragen sofort formatieren, verschoenern und einruecken. Unterstuetzt SELECT, INSERT, UPDATE, DELETE und JOINs.',
    inputLabel: 'SQL Eingabe', outputLabel: 'Formatiertes SQL',
    inputPlaceholder: 'SQL-Abfrage hier einfuegen...', outputPlaceholder: 'Formatiertes SQL erscheint hier...',
    format: 'SQL Formatieren', minify: 'Minifizieren', clear: 'Loeschen', loadSample: 'Beispiel laden',
    indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', uppercase: 'Schluesselwoerter gross',
    success: 'SQL erfolgreich formatiert', error: 'SQL konnte nicht formatiert werden',
    introTitle: 'Kostenloser Online SQL Formatter',
    introText: 'Dieser SQL Formatter wandelt Ihre unordentlichen SQL-Abfragen in sauberen, lesbaren Code um.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert der SQL Formatter?', faq1a: 'Er analysiert Ihre Abfrage und wendet konsistente Einrueckung und Zeilenumbrueche an.',
    faq2q: 'Welche SQL-Dialekte werden unterstuetzt?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle und weitere.',
    faq3q: 'Kann man SQL minifizieren?', faq3a: 'Ja! Klicken Sie auf "Minifizieren" um SQL in eine Zeile zu komprimieren.',
    faq4q: 'Werden komplexe Abfragen unterstuetzt?', faq4a: 'Ja, JOINs, Unterabfragen, CASE, Fensterfunktionen und CTEs werden unterstuetzt.',
    faq5q: 'Sind meine SQL-Daten sicher?', faq5a: 'Ja, alles wird im Browser verarbeitet. Keine Daten werden an einen Server gesendet.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Formateador SQL en Linea',
    description: 'Formatea, embellece e indenta consultas SQL al instante. Soporta SELECT, INSERT, UPDATE, DELETE y joins.',
    inputLabel: 'Entrada SQL', outputLabel: 'SQL Formateado',
    inputPlaceholder: 'Pega tu consulta SQL aqui...', outputPlaceholder: 'El SQL formateado aparecera aqui...',
    format: 'Formatear SQL', minify: 'Minificar', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    indent: 'Sangria', spaces: 'espacios', tab: 'Tab', uppercase: 'Palabras clave en mayusculas',
    success: 'SQL formateado exitosamente', error: 'No se pudo formatear el SQL',
    introTitle: 'Formateador SQL en Linea Gratis',
    introText: 'Este formateador SQL transforma consultas desordenadas en codigo limpio y legible.',
    faqTitle: 'Preguntas Frecuentes',
    faq1q: 'Como funciona el formateador SQL?', faq1a: 'Analiza tu consulta y aplica indentacion y saltos de linea consistentes.',
    faq2q: 'Que dialectos SQL se soportan?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle y otros.',
    faq3q: 'Se puede minificar SQL?', faq3a: 'Si! Haz clic en "Minificar" para comprimir SQL en una sola linea.',
    faq4q: 'Maneja consultas complejas?', faq4a: 'Si, soporta JOINs multiples, subconsultas, CASE, funciones ventana y CTEs.',
    faq5q: 'Mis datos SQL estan seguros?', faq5a: 'Si, todo se procesa en tu navegador. Ningun dato se envia a un servidor.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Formattatore SQL Online',
    description: 'Formatta, abbellisci e indenta query SQL istantaneamente. Supporta SELECT, INSERT, UPDATE, DELETE e join.',
    inputLabel: 'Input SQL', outputLabel: 'SQL Formattato',
    inputPlaceholder: 'Incolla la tua query SQL qui...', outputPlaceholder: 'SQL formattato apparira qui...',
    format: 'Formatta SQL', minify: 'Minimizza', clear: 'Cancella', loadSample: 'Carica esempio',
    indent: 'Indentazione', spaces: 'spazi', tab: 'Tab', uppercase: 'Parole chiave maiuscole',
    success: 'SQL formattato con successo', error: 'Impossibile formattare SQL',
    introTitle: 'Formattatore SQL Online Gratuito',
    introText: 'Questo formattatore SQL trasforma query disordinate in codice pulito e leggibile.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Come funziona il formattatore SQL?', faq1a: 'Analizza la query e applica indentazione e interruzioni di riga coerenti.',
    faq2q: 'Quali dialetti SQL sono supportati?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle e altri.',
    faq3q: 'Si puo minimizzare SQL?', faq3a: 'Si! Clicca "Minimizza" per comprimere SQL in una riga.',
    faq4q: 'Gestisce query complesse?', faq4a: 'Si, supporta JOIN multipli, sottoquery, CASE, funzioni finestra e CTE.',
    faq5q: 'I miei dati SQL sono sicuri?', faq5a: 'Si, tutto viene elaborato nel browser. Nessun dato viene inviato a un server.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Formatador SQL Online',
    description: 'Formate, embeleze e indente consultas SQL instantaneamente. Suporta SELECT, INSERT, UPDATE, DELETE e joins.',
    inputLabel: 'Entrada SQL', outputLabel: 'SQL Formatado',
    inputPlaceholder: 'Cole sua consulta SQL aqui...', outputPlaceholder: 'SQL formatado aparecera aqui...',
    format: 'Formatar SQL', minify: 'Minificar', clear: 'Limpar', loadSample: 'Carregar exemplo',
    indent: 'Recuo', spaces: 'espacos', tab: 'Tab', uppercase: 'Palavras-chave maiusculas',
    success: 'SQL formatado com sucesso', error: 'Nao foi possivel formatar SQL',
    introTitle: 'Formatador SQL Online Gratuito',
    introText: 'Este formatador SQL transforma consultas desordenadas em codigo limpo e legivel.',
    faqTitle: 'Perguntas Frequentes',
    faq1q: 'Como funciona o formatador SQL?', faq1a: 'Analisa sua consulta e aplica indentacao e quebras de linha consistentes.',
    faq2q: 'Quais dialetos SQL sao suportados?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle e outros.',
    faq3q: 'Posso minificar SQL?', faq3a: 'Sim! Clique em "Minificar" para comprimir SQL em uma linha.',
    faq4q: 'Lida com consultas complexas?', faq4a: 'Sim, suporta JOINs multiplos, subconsultas, CASE, funcoes de janela e CTEs.',
    faq5q: 'Meus dados SQL estao seguros?', faq5a: 'Sim, tudo e processado no navegador. Nenhum dado e enviado a um servidor.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'SQL Formatter Online',
    description: 'Formatteer, verfraai en inspringen SQL-query\'s direct. Ondersteunt SELECT, INSERT, UPDATE, DELETE en joins.',
    inputLabel: 'SQL Invoer', outputLabel: 'Geformateerde SQL',
    inputPlaceholder: 'Plak uw SQL-query hier...', outputPlaceholder: 'Geformateerde SQL verschijnt hier...',
    format: 'SQL Formatteren', minify: 'Minificeren', clear: 'Wissen', loadSample: 'Voorbeeld laden',
    indent: 'Inspringing', spaces: 'spaties', tab: 'Tab', uppercase: 'Trefwoorden hoofdletters',
    success: 'SQL succesvol geformateerd', error: 'Kon SQL niet formatteren',
    introTitle: 'Gratis Online SQL Formatter',
    introText: 'Deze SQL formatter transformeert rommelige SQL-query\'s naar schone, leesbare code.',
    faqTitle: 'Veelgestelde Vragen',
    faq1q: 'Hoe werkt de SQL formatter?', faq1a: 'Analyseert uw query en past consistente inspringing en regelafbrekingen toe.',
    faq2q: 'Welke SQL-dialecten worden ondersteund?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle en anderen.',
    faq3q: 'Kan ik SQL minificeren?', faq3a: 'Ja! Klik op "Minificeren" om SQL tot een regel te comprimeren.',
    faq4q: 'Verwerkt het complexe query\'s?', faq4a: 'Ja, ondersteunt meerdere JOINs, subquery\'s, CASE, vensterfuncties en CTEs.',
    faq5q: 'Zijn mijn SQL-gegevens veilig?', faq5a: 'Ja, alles wordt in uw browser verwerkt. Geen gegevens worden naar een server verzonden.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Formatter SQL Online',
    description: 'Formatuj, upiększaj i wcinaj zapytania SQL natychmiast. Obsluguje SELECT, INSERT, UPDATE, DELETE i zlaczenia.',
    inputLabel: 'Wejscie SQL', outputLabel: 'Sformatowany SQL',
    inputPlaceholder: 'Wklej zapytanie SQL tutaj...', outputPlaceholder: 'Sformatowany SQL pojawi sie tutaj...',
    format: 'Formatuj SQL', minify: 'Minifikuj', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad',
    indent: 'Wciecie', spaces: 'spacje', tab: 'Tab', uppercase: 'Slowa kluczowe wielkimi literami',
    success: 'SQL sformatowany pomyslnie', error: 'Nie mozna sformatowac SQL',
    introTitle: 'Darmowy Formatter SQL Online',
    introText: 'Ten formatter SQL przeksztalca brudne zapytania SQL w czysty, czytelny kod.',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jak dziala formatter SQL?', faq1a: 'Analizuje zapytanie i stosuje spojne wciecia i podzial na linie.',
    faq2q: 'Jakie dialekty SQL sa obslugiwane?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle i inne.',
    faq3q: 'Czy mozna minifikowac SQL?', faq3a: 'Tak! Kliknij "Minifikuj" aby skompresowac SQL do jednej linii.',
    faq4q: 'Obsluguje zlozone zapytania?', faq4a: 'Tak, obsluguje wiele JOINow, podzapytania, CASE, funkcje okna i CTE.',
    faq5q: 'Czy moje dane SQL sa bezpieczne?', faq5a: 'Tak, wszystko jest przetwarzane w przegladarce. Zadne dane nie sa wysylane na serwer.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'SQL Formatter Online',
    description: 'Formatera, forskoena och indentera SQL-fragor direkt. Stoder SELECT, INSERT, UPDATE, DELETE och joins.',
    inputLabel: 'SQL Indata', outputLabel: 'Formaterad SQL',
    inputPlaceholder: 'Klistra in din SQL-fraga har...', outputPlaceholder: 'Formaterad SQL visas har...',
    format: 'Formatera SQL', minify: 'Minifiera', clear: 'Rensa', loadSample: 'Ladda exempel',
    indent: 'Indrag', spaces: 'mellanslag', tab: 'Tab', uppercase: 'Nyckelord versaler',
    success: 'SQL formaterad framgangsrikt', error: 'Kunde inte formatera SQL',
    introTitle: 'Gratis Online SQL Formatter',
    introText: 'Denna SQL formatter omvandlar rostiga SQL-fragor till ren, lasbar kod.',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Hur fungerar SQL formatter?', faq1a: 'Analyserar din fraga och tillämpar konsekvent indrag och radbrytningar.',
    faq2q: 'Vilka SQL-dialekter stods?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle med flera.',
    faq3q: 'Kan man minifiera SQL?', faq3a: 'Ja! Klicka "Minifiera" for att komprimera SQL till en rad.',
    faq4q: 'Hanterar den komplexa fragor?', faq4a: 'Ja, stoder flera JOINs, underfragor, CASE, fonsterfunktioner och CTEs.',
    faq5q: 'Ar mina SQL-data sakra?', faq5a: 'Ja, allt bearbetas i din webblasare. Inga data skickas till nagon server.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'SQL Formatter Online',
    description: 'Formater, forskjonn og innrykk SQL-sporringer umiddelbart. Stoetter SELECT, INSERT, UPDATE, DELETE og joins.',
    inputLabel: 'SQL Inndata', outputLabel: 'Formatert SQL',
    inputPlaceholder: 'Lim inn SQL-sporringen din her...', outputPlaceholder: 'Formatert SQL vises her...',
    format: 'Formater SQL', minify: 'Minifiser', clear: 'Toemme', loadSample: 'Last eksempel',
    indent: 'Innrykk', spaces: 'mellomrom', tab: 'Tab', uppercase: 'Noekkelord store bokstaver',
    success: 'SQL formatert', error: 'Kunne ikke formatere SQL',
    introTitle: 'Gratis Online SQL Formatter',
    introText: 'Denne SQL formatteren gjor om rotete SQL-sporringer til ren, lesbar kode.',
    faqTitle: 'Vanlige sporrsmal',
    faq1q: 'Hvordan fungerer SQL formatter?', faq1a: 'Analyserer sporringen din og anvender konsistent innrykk og linjeskift.',
    faq2q: 'Hvilke SQL-dialekter stoettes?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle og andre.',
    faq3q: 'Kan man minifisere SQL?', faq3a: 'Ja! Klikk "Minifiser" for a komprimere SQL til en linje.',
    faq4q: 'Handterer den komplekse sporringer?', faq4a: 'Ja, stoetter flere JOINs, undersporringer, CASE, vindufunksjoner og CTEer.',
    faq5q: 'Er SQL-dataene mine trygge?', faq5a: 'Ja, alt behandles i nettleseren din. Ingen data sendes til noen server.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'SQL Formatter Online',
    description: 'Format, rapihkan, dan indentasi kueri SQL secara instan. Mendukung SELECT, INSERT, UPDATE, DELETE, dan join.',
    inputLabel: 'Input SQL', outputLabel: 'SQL Terformat',
    inputPlaceholder: 'Tempel kueri SQL Anda di sini...', outputPlaceholder: 'SQL terformat akan muncul di sini...',
    format: 'Format SQL', minify: 'Minifikasi', clear: 'Hapus', loadSample: 'Muat contoh',
    indent: 'Indentasi', spaces: 'spasi', tab: 'Tab', uppercase: 'Kata kunci huruf besar',
    success: 'SQL berhasil diformat', error: 'Tidak dapat memformat SQL',
    introTitle: 'SQL Formatter Online Gratis',
    introText: 'Formatter SQL ini mengubah kueri SQL berantakan menjadi kode bersih dan mudah dibaca.',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Bagaimana cara kerja SQL formatter?', faq1a: 'Menganalisis kueri dan menerapkan indentasi dan jeda baris yang konsisten.',
    faq2q: 'Dialek SQL apa saja yang didukung?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle, dan lainnya.',
    faq3q: 'Bisakah SQL diminifikasi?', faq3a: 'Ya! Klik "Minifikasi" untuk mengompres SQL menjadi satu baris.',
    faq4q: 'Apakah mendukung kueri kompleks?', faq4a: 'Ya, mendukung multiple JOIN, subkueri, CASE, fungsi jendela, dan CTE.',
    faq5q: 'Apakah data SQL saya aman?', faq5a: 'Ya, semua diproses di browser Anda. Tidak ada data yang dikirim ke server.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'SQL Formatter ออนไลน์',
    description: 'จัดรูปแบบ ตกแต่ง และเยื้องบรรทัด SQL queries ทันที รองรับ SELECT, INSERT, UPDATE, DELETE และ joins',
    inputLabel: 'อินพุต SQL', outputLabel: 'SQL ที่จัดรูปแบบแล้ว',
    inputPlaceholder: 'วาง SQL query ของคุณที่นี่...', outputPlaceholder: 'SQL ที่จัดรูปแบบแล้วจะปรากฏที่นี่...',
    format: 'จัดรูปแบบ SQL', minify: 'บีบอัด', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง',
    indent: 'การเยื้อง', spaces: 'ช่องว่าง', tab: 'แท็บ', uppercase: 'คีย์เวิร์ดตัวพิมพ์ใหญ่',
    success: 'จัดรูปแบบ SQL สำเร็จ', error: 'ไม่สามารถจัดรูปแบบ SQL ได้',
    introTitle: 'SQL Formatter ออนไลน์ฟรี',
    introText: 'SQL Formatter นี้แปลง SQL queries ที่ยุ่งเหยิงให้เป็นโค้ดที่สะอาดและอ่านง่าย',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'SQL formatter ทำงานอย่างไร?', faq1a: 'วิเคราะห์ query และใช้การเยื้องและการขึ้นบรรทัดใหม่ที่สม่ำเสมอ',
    faq2q: 'รองรับ SQL dialect อะไรบ้าง?', faq2a: 'MySQL, PostgreSQL, SQLite, SQL Server, Oracle และอื่นๆ',
    faq3q: 'สามารถบีบอัด SQL ได้ไหม?', faq3a: 'ได้! คลิก "บีบอัด" เพื่อบีบอัด SQL เป็นบรรทัดเดียว',
    faq4q: 'รองรับ query ที่ซับซ้อนหรือไม่?', faq4a: 'ใช่ รองรับ JOINs หลายตัว, subqueries, CASE, window functions และ CTEs',
    faq5q: 'ข้อมูล SQL ของฉันปลอดภัยหรือไม่?', faq5a: 'ใช่ ทุกอย่างประมวลผลในเบราว์เซอร์ ไม่มีข้อมูลถูกส่งไปยังเซิร์ฟเวอร์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

export default function SqlFormatterOnlinePage() {
  const { lang } = useLang();
  const t = ui[(lang as string) || 'en'] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState(2);
  const [uppercase, setUppercase] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleFormat = useCallback(() => {
    if (!input.trim()) { setStatus({ type: 'error', message: 'No SQL input provided' }); return; }
    try {
      const indentStr = indent === 0 ? '\t' : ' '.repeat(indent);
      const result = formatSQL(input, indentStr, uppercase);
      setOutput(result);
      setStatus({ type: 'success', message: t.success });
    } catch {
      setStatus({ type: 'error', message: t.error });
    }
  }, [input, indent, uppercase, t]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    setOutput(minifySQL(input));
    setStatus({ type: 'success', message: t.success });
  }, [input, t]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%', minHeight: 300, fontFamily: 'monospace', fontSize: 13, padding: 14,
    background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)',
    borderRadius: 8, resize: 'vertical', lineHeight: 1.5, outline: 'none',
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="sql-formatter-online">
      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <button className="btn btn-primary" onClick={handleFormat} style={{ fontWeight: 700 }}>{t.format}</button>
        <button className="btn btn-ghost" onClick={handleMinify}>{t.minify}</button>
        <button className="btn btn-ghost" onClick={() => { setInput(''); setOutput(''); setStatus(null); }}>{t.clear}</button>
        <button className="btn btn-ghost" onClick={() => { setInput(sampleSQL); setOutput(''); setStatus(null); }}>{t.loadSample}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select
            value={indent}
            onChange={e => setIndent(parseInt(e.target.value))}
            style={{ padding: '4px 8px', borderRadius: 6, background: 'var(--bg-input)', border: '1px solid var(--border-color)', fontSize: 12 }}
          >
            <option value={2}>2 {t.spaces}</option>
            <option value={4}>4 {t.spaces}</option>
            <option value={0}>{t.tab}</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
            {t.uppercase}
          </label>
        </div>
      </div>

      {/* Status */}
      {status && (
        <div style={{
          padding: '8px 14px', borderRadius: 8, marginBottom: 12, fontSize: 13, fontWeight: 600,
          background: status.type === 'success' ? 'var(--accent-emerald)15' : 'var(--accent-rose)15',
          color: status.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
          border: `1px solid ${status.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
        }}>
          {status.message}
        </div>
      )}

      {/* Editors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setStatus(null); }}
            placeholder={t.inputPlaceholder}
            style={textareaStyle}
            spellCheck={false}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>{t.outputLabel}</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ ...textareaStyle, background: 'var(--bg-card)' }}
          />
        </div>
      </div>

      {/* SQL Keyword Reference */}
      <div style={{ marginBottom: 24, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>SQL Keywords Reference</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ON',
            'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INSERT INTO',
            'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE TABLE', 'ALTER TABLE', 'WITH', 'CASE', 'WHEN'].map(kw => (
            <span key={kw} style={{
              padding: '3px 8px', fontSize: 11, fontFamily: 'monospace', fontWeight: 600,
              background: 'var(--accent-blue)15', color: 'var(--accent-blue)',
              borderRadius: 4, border: '1px solid var(--accent-blue)30',
            }}>{kw}</span>
          ))}
        </div>
      </div>

      {/* Intro */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{t.faqTitle}</h2>
        {[
          { q: t.faq1q, a: t.faq1a },
          { q: t.faq2q, a: t.faq2a },
          { q: t.faq3q, a: t.faq3a },
          { q: t.faq4q, a: t.faq4a },
          { q: t.faq5q, a: t.faq5a },
        ].map((faq, i) => (
          <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <summary style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{faq.q}</summary>
            <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ToolLayout>
  );
}
