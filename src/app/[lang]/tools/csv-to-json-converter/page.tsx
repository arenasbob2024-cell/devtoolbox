'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'CSV to JSON Converter',
    description: 'Convert CSV data to JSON array online. Supports custom delimiters, header row detection, and clean JSON output.',
    inputLabel: 'CSV Input',
    inputPlaceholder: 'Paste your CSV data here...',
    outputLabel: 'JSON Output',
    outputPlaceholder: 'JSON output will appear here...',
    convertBtn: 'Convert to JSON',
    clear: 'Clear',
    loadSample: 'Load Sample',
    delimiter: 'Delimiter',
    comma: 'Comma (,)',
    semicolon: 'Semicolon (;)',
    tab: 'Tab',
    pipe: 'Pipe (|)',
    hasHeader: 'First row is header',
    trimSpaces: 'Trim whitespace',
    rows: 'rows',
    fields: 'fields',
    introTitle: 'Free Online CSV to JSON Converter',
    introText: 'Convert CSV (Comma-Separated Values) data to JSON format instantly. This tool auto-detects headers, supports multiple delimiters including comma, semicolon, tab, and pipe, and generates clean JSON arrays. Perfect for importing spreadsheet data into APIs, databases, and web applications.',
    cheatTitle: 'CSV Format Tips',
    ruleCol: 'Feature', descCol: 'Description', exampleCol: 'Example',
    rule1: 'Header row', rule1Desc: 'First row defines JSON keys', rule1Ex: 'name,age -> {"name":"...","age":"..."}',
    rule2: 'Quoted fields', rule2Desc: 'Fields with commas wrapped in quotes', rule2Ex: '"New York, NY",10001',
    rule3: 'Custom delimiter', rule3Desc: 'Semicolons, tabs, or pipes as separators', rule3Ex: 'name;age;city',
    rule4: 'Empty values', rule4Desc: 'Empty fields become empty strings', rule4Ex: 'Alice,,30 -> {"name":"Alice","city":""}',
    rule5: 'Number detection', rule5Desc: 'Numeric strings converted to numbers', rule5Ex: '"42" -> 42 in JSON',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does CSV to JSON conversion work?',
    faq1a: 'The converter reads your CSV data line by line. If a header row is detected, the first row values become JSON object keys. Each subsequent row becomes a JSON object with values mapped to those keys. The result is a JSON array of objects.',
    faq2q: 'What delimiters are supported?',
    faq2a: 'The tool supports comma (,), semicolon (;), tab, and pipe (|) as delimiters. You can select the delimiter that matches your CSV format from the dropdown menu.',
    faq3q: 'How are numbers handled in conversion?',
    faq3a: 'The converter automatically detects numeric values and converts them to JSON numbers instead of strings. Values like "42" and "3.14" become the numbers 42 and 3.14 in the JSON output.',
    faq4q: 'Can I convert CSV without headers?',
    faq4a: 'Yes, uncheck the "First row is header" option. Without headers, the converter generates JSON arrays of arrays instead of arrays of objects, preserving all data rows.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'CSV 转 JSON 转换器',
    description: '在线将 CSV 数据转换为 JSON 数组。支持自定义分隔符、表头检测和干净的 JSON 输出。',
    inputLabel: 'CSV 输入', inputPlaceholder: '在此粘贴 CSV 数据...',
    outputLabel: 'JSON 输出', outputPlaceholder: 'JSON 输出将显示在此...',
    convertBtn: '转换为 JSON', clear: '清除', loadSample: '加载示例',
    delimiter: '分隔符', comma: '逗号 (,)', semicolon: '分号 (;)', tab: '制表符', pipe: '管道符 (|)',
    hasHeader: '首行为表头', trimSpaces: '去除空白', rows: '行', fields: '字段',
    introTitle: '免费在线 CSV 转 JSON 转换器',
    introText: '即时将 CSV 数据转换为 JSON 格式。支持自动检测表头、多种分隔符，生成干净的 JSON 数组。',
    cheatTitle: 'CSV 格式技巧', ruleCol: '功能', descCol: '说明', exampleCol: '示例',
    rule1: '表头行', rule1Desc: '第一行定义 JSON 键', rule1Ex: 'name,age -> {"name":"...","age":"..."}',
    rule2: '引号字段', rule2Desc: '含逗号的字段用引号包裹', rule2Ex: '"New York, NY",10001',
    rule3: '自定义分隔符', rule3Desc: '分号、制表符或管道符作为分隔', rule3Ex: 'name;age;city',
    rule4: '空值', rule4Desc: '空字段变为空字符串', rule4Ex: 'Alice,,30 -> {"name":"Alice","city":""}',
    rule5: '数字检测', rule5Desc: '数字字符串转换为数字', rule5Ex: '"42" -> JSON 中的 42',
    faqTitle: '常见问题',
    faq1q: 'CSV 转 JSON 如何工作？', faq1a: '转换器逐行读取 CSV 数据。如果检测到表头行，第一行的值成为 JSON 对象键。每个后续行成为映射到这些键的 JSON 对象。',
    faq2q: '支持哪些分隔符？', faq2a: '工具支持逗号、分号、制表符和管道符作为分隔符。',
    faq3q: '数字是如何处理的？', faq3a: '转换器自动检测数值并将其转换为 JSON 数字而非字符串。',
    faq4q: '可以不使用表头转换 CSV 吗？', faq4a: '可以，取消勾选"首行为表头"选项。没有表头时，转换器生成数组的数组。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur CSV vers JSON',
    description: 'Convertissez CSV en JSON en ligne. Supporte les delimiteurs personnalises et la detection des en-tetes.',
    inputLabel: 'Entree CSV', inputPlaceholder: 'Collez vos donnees CSV ici...',
    outputLabel: 'Sortie JSON', outputPlaceholder: 'Le JSON apparaitra ici...',
    convertBtn: 'Convertir en JSON', clear: 'Effacer', loadSample: 'Charger un exemple',
    delimiter: 'Delimiteur', comma: 'Virgule (,)', semicolon: 'Point-virgule (;)', tab: 'Tab', pipe: 'Pipe (|)',
    hasHeader: 'Premiere ligne = en-tete', trimSpaces: 'Supprimer espaces', rows: 'lignes', fields: 'champs',
    introTitle: 'Convertisseur CSV vers JSON gratuit', introText: 'Convertissez CSV en JSON instantanement. Supporte la detection automatique des en-tetes et plusieurs delimiteurs.',
    cheatTitle: 'Conseils CSV', ruleCol: 'Fonctionnalite', descCol: 'Description', exampleCol: 'Exemple',
    rule1: 'En-tete', rule1Desc: 'Premiere ligne definit les cles JSON', rule1Ex: 'name,age -> {"name":"..."}',
    rule2: 'Champs entre guillemets', rule2Desc: 'Champs avec virgules entre guillemets', rule2Ex: '"Paris, FR",75001',
    rule3: 'Delimiteur personnalise', rule3Desc: 'Points-virgules, tabs ou pipes', rule3Ex: 'nom;age;ville',
    rule4: 'Valeurs vides', rule4Desc: 'Champs vides = chaines vides', rule4Ex: 'Alice,,30',
    rule5: 'Detection numerique', rule5Desc: 'Chaines numeriques converties en nombres', rule5Ex: '"42" -> 42',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne la conversion CSV vers JSON ?', faq1a: 'Le convertisseur lit le CSV ligne par ligne. La premiere ligne definit les cles des objets JSON.',
    faq2q: 'Quels delimiteurs sont supportes ?', faq2a: 'Virgule, point-virgule, tabulation et pipe sont supportes.',
    faq3q: 'Comment les nombres sont-ils traites ?', faq3a: 'Les valeurs numeriques sont automatiquement converties en nombres JSON.',
    faq4q: 'Peut-on convertir du CSV sans en-tetes ?', faq4a: 'Oui, decochez l\'option en-tete. Le resultat sera un tableau de tableaux.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'CSV zu JSON Konverter',
    description: 'CSV-Daten online in JSON umwandeln. Unterstuetzt benutzerdefinierte Trennzeichen und Header-Erkennung.',
    inputLabel: 'CSV-Eingabe', inputPlaceholder: 'CSV-Daten hier einfuegen...',
    outputLabel: 'JSON-Ausgabe', outputPlaceholder: 'JSON-Ausgabe erscheint hier...',
    convertBtn: 'In JSON umwandeln', clear: 'Loeschen', loadSample: 'Beispiel laden',
    delimiter: 'Trennzeichen', comma: 'Komma (,)', semicolon: 'Semikolon (;)', tab: 'Tab', pipe: 'Pipe (|)',
    hasHeader: 'Erste Zeile ist Header', trimSpaces: 'Leerzeichen entfernen', rows: 'Zeilen', fields: 'Felder',
    introTitle: 'Kostenloser CSV zu JSON Konverter', introText: 'CSV-Daten sofort in JSON umwandeln. Unterstuetzt automatische Header-Erkennung und mehrere Trennzeichen.',
    cheatTitle: 'CSV-Tipps', ruleCol: 'Funktion', descCol: 'Beschreibung', exampleCol: 'Beispiel',
    rule1: 'Header-Zeile', rule1Desc: 'Erste Zeile definiert JSON-Schluessel', rule1Ex: 'name,age -> {"name":"..."}',
    rule2: 'Zitierte Felder', rule2Desc: 'Felder mit Kommas in Anfuehrungszeichen', rule2Ex: '"Berlin, DE",10001',
    rule3: 'Benutzerdefiniertes Trennzeichen', rule3Desc: 'Semikolons, Tabs oder Pipes', rule3Ex: 'name;alter;stadt',
    rule4: 'Leere Werte', rule4Desc: 'Leere Felder werden leere Strings', rule4Ex: 'Alice,,30',
    rule5: 'Zahlenerkennung', rule5Desc: 'Numerische Strings werden zu Zahlen', rule5Ex: '"42" -> 42',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert die CSV-zu-JSON-Konvertierung?', faq1a: 'Der Konverter liest CSV zeilenweise. Die erste Zeile definiert die JSON-Objektschluessel.',
    faq2q: 'Welche Trennzeichen werden unterstuetzt?', faq2a: 'Komma, Semikolon, Tab und Pipe werden unterstuetzt.',
    faq3q: 'Wie werden Zahlen behandelt?', faq3a: 'Numerische Werte werden automatisch in JSON-Zahlen umgewandelt.',
    faq4q: 'Kann man CSV ohne Header konvertieren?', faq4a: 'Ja, deaktivieren Sie die Header-Option. Das Ergebnis ist ein Array von Arrays.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor CSV a JSON',
    description: 'Convierta CSV a JSON en linea. Soporta delimitadores personalizados y deteccion de encabezados.',
    inputLabel: 'Entrada CSV', inputPlaceholder: 'Pegue sus datos CSV aqui...',
    outputLabel: 'Salida JSON', outputPlaceholder: 'El JSON aparecera aqui...',
    convertBtn: 'Convertir a JSON', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    delimiter: 'Delimitador', comma: 'Coma (,)', semicolon: 'Punto y coma (;)', tab: 'Tab', pipe: 'Pipe (|)',
    hasHeader: 'Primera fila es encabezado', trimSpaces: 'Quitar espacios', rows: 'filas', fields: 'campos',
    introTitle: 'Convertidor CSV a JSON gratuito', introText: 'Convierta CSV a JSON al instante. Soporta deteccion automatica de encabezados y multiples delimitadores.',
    cheatTitle: 'Consejos CSV', ruleCol: 'Caracteristica', descCol: 'Descripcion', exampleCol: 'Ejemplo',
    rule1: 'Encabezado', rule1Desc: 'Primera fila define claves JSON', rule1Ex: 'name,age -> {"name":"..."}',
    rule2: 'Campos entre comillas', rule2Desc: 'Campos con comas entre comillas', rule2Ex: '"Madrid, ES",28001',
    rule3: 'Delimitador personalizado', rule3Desc: 'Punto y coma, tabs o pipes', rule3Ex: 'nombre;edad;ciudad',
    rule4: 'Valores vacios', rule4Desc: 'Campos vacios = cadenas vacias', rule4Ex: 'Alice,,30',
    rule5: 'Deteccion numerica', rule5Desc: 'Cadenas numericas convertidas a numeros', rule5Ex: '"42" -> 42',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona la conversion CSV a JSON?', faq1a: 'El convertidor lee el CSV linea por linea. La primera fila define las claves de los objetos JSON.',
    faq2q: 'Que delimitadores son soportados?', faq2a: 'Coma, punto y coma, tabulacion y pipe son soportados.',
    faq3q: 'Como se manejan los numeros?', faq3a: 'Los valores numericos se convierten automaticamente en numeros JSON.',
    faq4q: 'Se puede convertir CSV sin encabezados?', faq4a: 'Si, desmarque la opcion de encabezado. El resultado sera un array de arrays.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'CSV から JSON コンバーター',
    description: 'CSV データを JSON にオンラインで変換。カスタム区切り文字とヘッダー検出をサポート。',
    inputLabel: 'CSV 入力', inputPlaceholder: 'CSV データを貼り付け...',
    outputLabel: 'JSON 出力', outputPlaceholder: 'JSON 出力がここに表示...',
    convertBtn: 'JSON に変換', clear: 'クリア', loadSample: 'サンプル読込',
    delimiter: '区切り文字', comma: 'カンマ (,)', semicolon: 'セミコロン (;)', tab: 'タブ', pipe: 'パイプ (|)',
    hasHeader: '1行目はヘッダー', trimSpaces: '空白を除去', rows: '行', fields: 'フィールド',
    introTitle: '無料オンライン CSV から JSON コンバーター', introText: 'CSV データを JSON 形式に即座に変換。ヘッダー自動検出と複数の区切り文字をサポート。',
    cheatTitle: 'CSV フォーマットのコツ', ruleCol: '機能', descCol: '説明', exampleCol: '例',
    rule1: 'ヘッダー行', rule1Desc: '1行目が JSON キーを定義', rule1Ex: 'name,age -> {"name":"..."}',
    rule2: '引用フィールド', rule2Desc: 'カンマを含むフィールドを引用符で囲む', rule2Ex: '"Tokyo, JP",100',
    rule3: 'カスタム区切り文字', rule3Desc: 'セミコロン、タブ、パイプ', rule3Ex: 'name;age;city',
    rule4: '空の値', rule4Desc: '空フィールドは空文字列に', rule4Ex: 'Alice,,30',
    rule5: '数値検出', rule5Desc: '数値文字列を数値に変換', rule5Ex: '"42" -> 42',
    faqTitle: 'よくある質問',
    faq1q: 'CSV から JSON への変換はどのように機能しますか？', faq1a: 'コンバーターは CSV を1行ずつ読み取ります。最初の行が JSON オブジェクトのキーを定義します。',
    faq2q: 'どの区切り文字がサポートされていますか？', faq2a: 'カンマ、セミコロン、タブ、パイプがサポートされています。',
    faq3q: '数値はどのように処理されますか？', faq3a: '数値は自動的に JSON の数値に変換されます。',
    faq4q: 'ヘッダーなしで CSV を変換できますか？', faq4a: 'はい、ヘッダーオプションのチェックを外してください。結果は配列の配列になります。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'CSV to JSON 변환기',
    description: 'CSV 데이터를 온라인에서 JSON으로 변환. 사용자 정의 구분자와 헤더 감지를 지원합니다.',
    inputLabel: 'CSV 입력', inputPlaceholder: 'CSV 데이터를 여기에 붙여넣기...',
    outputLabel: 'JSON 출력', outputPlaceholder: 'JSON 출력이 여기에 표시...',
    convertBtn: 'JSON으로 변환', clear: '지우기', loadSample: '샘플 로드',
    delimiter: '구분자', comma: '쉼표 (,)', semicolon: '세미콜론 (;)', tab: '탭', pipe: '파이프 (|)',
    hasHeader: '첫 번째 행이 헤더', trimSpaces: '공백 제거', rows: '행', fields: '필드',
    introTitle: '무료 온라인 CSV to JSON 변환기', introText: 'CSV 데이터를 JSON 형식으로 즉시 변환. 헤더 자동 감지와 여러 구분자를 지원합니다.',
    cheatTitle: 'CSV 형식 팁', ruleCol: '기능', descCol: '설명', exampleCol: '예시',
    rule1: '헤더 행', rule1Desc: '첫 행이 JSON 키 정의', rule1Ex: 'name,age -> {"name":"..."}',
    rule2: '인용 필드', rule2Desc: '쉼표가 있는 필드를 따옴표로 감싸기', rule2Ex: '"Seoul, KR",100',
    rule3: '사용자 정의 구분자', rule3Desc: '세미콜론, 탭, 파이프', rule3Ex: 'name;age;city',
    rule4: '빈 값', rule4Desc: '빈 필드는 빈 문자열로', rule4Ex: 'Alice,,30',
    rule5: '숫자 감지', rule5Desc: '숫자 문자열을 숫자로 변환', rule5Ex: '"42" -> 42',
    faqTitle: '자주 묻는 질문',
    faq1q: 'CSV에서 JSON 변환은 어떻게 작동하나요?', faq1a: '변환기가 CSV를 한 줄씩 읽습니다. 첫 번째 행이 JSON 객체의 키를 정의합니다.',
    faq2q: '어떤 구분자가 지원되나요?', faq2a: '쉼표, 세미콜론, 탭, 파이프가 지원됩니다.',
    faq3q: '숫자는 어떻게 처리되나요?', faq3a: '숫자 값은 자동으로 JSON 숫자로 변환됩니다.',
    faq4q: '헤더 없이 CSV를 변환할 수 있나요?', faq4a: '네, 헤더 옵션을 해제하세요. 결과는 배열의 배열이 됩니다.',
    relatedTitle: '관련 도구',
  },
};

function parseCSV(csv: string, delimiter: string, trim: boolean): string[][] {
  const rows: string[][] = [];
  let current = '';
  let inQuote = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    const next = csv[i + 1];

    if (inQuote) {
      if (ch === '"' && next === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuote = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuote = true;
      } else if (ch === delimiter) {
        row.push(trim ? current.trim() : current);
        current = '';
      } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        row.push(trim ? current.trim() : current);
        current = '';
        if (row.some(c => c !== '')) rows.push(row);
        row = [];
        if (ch === '\r') i++;
      } else {
        current += ch;
      }
    }
  }
  row.push(trim ? current.trim() : current);
  if (row.some(c => c !== '')) rows.push(row);

  return rows;
}

function inferType(val: string): string | number | boolean | null {
  if (val === '') return '';
  if (val === 'null') return null;
  if (val === 'true') return true;
  if (val === 'false') return false;
  const num = Number(val);
  if (!isNaN(num) && val.trim() !== '') return num;
  return val;
}

export default function CsvToJsonConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);
  const [trimSpaces, setTrimSpaces] = useState(true);

  const convert = () => {
    if (!input.trim()) return;
    try {
      const rows = parseCSV(input, delimiter, trimSpaces);
      if (rows.length === 0) { setError('No data found'); setOutput(''); return; }

      let result: unknown;
      if (hasHeader && rows.length > 1) {
        const headers = rows[0];
        result = rows.slice(1).map(row => {
          const obj: Record<string, unknown> = {};
          headers.forEach((h, i) => { obj[h || `col${i}`] = inferType(row[i] || ''); });
          return obj;
        });
      } else {
        result = rows.map(row => row.map(inferType));
      }

      setOutput(JSON.stringify(result, null, 2));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Parse error');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput('name,age,city,active\nAlice,30,"New York, NY",true\nBob,25,London,false\nCharlie,35,Tokyo,true\nDiana,28,"San Francisco, CA",true');
    setOutput(''); setError('');
  };

  const rowCount = output ? (JSON.parse(output) as unknown[]).length : 0;
  const fieldCount = output && rowCount > 0 ? Object.keys((JSON.parse(output) as Record<string, unknown>[])[0] || {}).length : 0;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="csv-to-json-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
            {t.hasHeader}
          </label>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={trimSpaces} onChange={e => setTrimSpaces(e.target.checked)} />
            {t.trimSpaces}
          </label>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.delimiter}:</label>
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ width: 130, padding: '4px 8px', fontSize: 12 }}>
            <option value=",">{t.comma}</option>
            <option value=";">{t.semicolon}</option>
            <option value="\t">{t.tab}</option>
            <option value="|">{t.pipe}</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      {output && !error && (
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#22c55e' }}>
          {rowCount} {t.rows} / {fieldCount} {t.fields}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {error}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder} style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* SEO */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.ruleCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.descCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.exampleCol}</th>
              </tr>
            </thead>
            <tbody>
              {[[t.rule1, t.rule1Desc, t.rule1Ex], [t.rule2, t.rule2Desc, t.rule2Ex], [t.rule3, t.rule3Desc, t.rule3Ex], [t.rule4, t.rule4Desc, t.rule4Ex], [t.rule5, t.rule5Desc, t.rule5Ex]].map(([r, d, e], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{r}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{d}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{e}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }, { q: t.faq4q, a: t.faq4a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/csv-json`, label: 'CSV / JSON Converter' },
            { href: `/${lang}/tools/json-to-csv`, label: 'JSON to CSV' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-to-xml`, label: 'JSON to XML' },
          ].map((link) => (
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
