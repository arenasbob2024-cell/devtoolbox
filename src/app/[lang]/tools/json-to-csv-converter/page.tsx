'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to CSV Converter',
    description: 'Convert JSON data to CSV format online. Supports arrays of objects, nested JSON flattening, and custom delimiters.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON array here, e.g.:\n[\n  {"name": "Alice", "age": 30, "city": "NYC"},\n  {"name": "Bob", "age": 25, "city": "LA"}\n]',
    outputLabel: 'CSV Output',
    convertBtn: 'Convert to CSV',
    clear: 'Clear',
    loadSample: 'Load Sample',
    download: 'Download CSV',
    delimiter: 'Delimiter',
    comma: 'Comma (,)',
    semicolon: 'Semicolon (;)',
    tab: 'Tab',
    pipe: 'Pipe (|)',
    includeHeader: 'Include header row',
    flattenNested: 'Flatten nested objects',
    rows: 'Rows',
    columns: 'Columns',
    error: 'Error',
    invalidJson: 'Invalid JSON. Please provide a valid JSON array of objects.',
    introTitle: 'Free Online JSON to CSV Converter',
    introText: 'Transform JSON data into CSV spreadsheet format instantly. This tool handles arrays of objects, automatically extracts column headers from JSON keys, flattens nested objects using dot notation (e.g., address.city), and supports custom delimiters for compatibility with different spreadsheet applications. Ideal for data analysis, importing JSON API responses into Excel or Google Sheets, and database migration tasks.',
    cheatTitle: 'Supported JSON Formats',
    ruleCol: 'Format', descCol: 'Description', exampleCol: 'Example',
    rule1: 'Array of objects', rule1Desc: 'Most common format', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Nested objects', rule2Desc: 'Flattened with dot notation', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Mixed types', rule3Desc: 'Null, boolean, number, string', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrays in values', rule4Desc: 'Joined with semicolons', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Single object', rule5Desc: 'Wrapped as single-row CSV', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What JSON formats can this tool convert?',
    faq1a: 'This tool supports JSON arrays of objects (the most common format for API responses), single objects (converted to a one-row CSV), and nested objects (flattened using dot notation). Arrays within values are joined with semicolons. The tool automatically detects all unique keys across all objects to create the CSV header row.',
    faq2q: 'How are nested JSON objects handled?',
    faq2a: 'When the "Flatten nested objects" option is enabled, nested objects are flattened using dot notation. For example, {"user": {"name": "Alice", "address": {"city": "NYC"}}} becomes columns user.name and user.address.city. This makes nested data accessible in flat CSV format.',
    faq3q: 'Can I use this CSV in Excel or Google Sheets?',
    faq3a: 'Yes. Download the CSV file and open it directly in Excel, Google Sheets, LibreOffice Calc, or any spreadsheet application. If your data contains special characters or non-English text, use the semicolon delimiter for better Excel compatibility in European locales.',
    faq4q: 'Is there a size limit for JSON input?',
    faq4a: 'The tool processes JSON entirely in your browser, so there is no server upload limit. However, extremely large JSON files (over 10MB) may cause slower performance depending on your device. For very large datasets, consider using command-line tools like jq.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 CSV 转换器',
    description: '在线将 JSON 数据转换为 CSV 格式。支持对象数组、嵌套 JSON 展平和自定义分隔符。',
    inputLabel: 'JSON 输入', inputPlaceholder: '在此粘贴 JSON 数组...',
    outputLabel: 'CSV 输出', convertBtn: '转换为 CSV', clear: '清除', loadSample: '加载示例', download: '下载 CSV',
    delimiter: '分隔符', comma: '逗号 (,)', semicolon: '分号 (;)', tab: '制表符', pipe: '管道符 (|)',
    includeHeader: '包含标题行', flattenNested: '展平嵌套对象',
    rows: '行数', columns: '列数', error: '错误',
    invalidJson: '无效的 JSON。请提供有效的 JSON 对象数组。',
    introTitle: '免费在线 JSON 转 CSV 转换器',
    introText: '即时将 JSON 数据转换为 CSV 电子表格格式。支持对象数组、自动提取列标题、嵌套对象展平和自定义分隔符。适用于数据分析和导入 Excel。',
    cheatTitle: '支持的 JSON 格式', ruleCol: '格式', descCol: '描述', exampleCol: '示例',
    rule1: '对象数组', rule1Desc: '最常见格式', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: '嵌套对象', rule2Desc: '使用点号展平', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: '混合类型', rule3Desc: 'Null、布尔、数字、字符串', rule3Ex: '{"active": true, "score": null}',
    rule4: '数组值', rule4Desc: '用分号连接', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: '单个对象', rule5Desc: '转换为单行 CSV', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: '常见问题',
    faq1q: '支持哪些 JSON 格式？', faq1a: '支持对象数组、单个对象和嵌套对象。数组值用分号连接，自动检测所有唯一键作为 CSV 标题行。',
    faq2q: '如何处理嵌套 JSON？', faq2a: '启用"展平嵌套对象"后，使用点号表示法展平嵌套对象。例如 user.address.city。',
    faq3q: '可以在 Excel 中使用吗？', faq3a: '可以，下载 CSV 文件后直接在 Excel、Google Sheets 或任何电子表格应用中打开。',
    faq4q: '有大小限制吗？', faq4a: '工具在浏览器中处理，没有服务器限制。超大文件可能导致性能下降。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur JSON vers CSV',
    description: 'Convertissez des donnees JSON en format CSV en ligne. Supporte les tableaux d\'objets et le JSON imbrique.',
    inputLabel: 'Entree JSON', inputPlaceholder: 'Collez votre tableau JSON ici...',
    outputLabel: 'Sortie CSV', convertBtn: 'Convertir en CSV', clear: 'Effacer', loadSample: 'Charger un exemple', download: 'Telecharger CSV',
    delimiter: 'Delimiteur', comma: 'Virgule (,)', semicolon: 'Point-virgule (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Inclure la ligne d\'en-tete', flattenNested: 'Aplatir les objets imbriques',
    rows: 'Lignes', columns: 'Colonnes', error: 'Erreur',
    invalidJson: 'JSON invalide. Fournissez un tableau d\'objets JSON valide.',
    introTitle: 'Convertisseur JSON vers CSV gratuit', introText: 'Transformez vos donnees JSON en format CSV instantanement. Supporte les objets imbriques et les delimiteurs personnalises.',
    cheatTitle: 'Formats JSON supportes', ruleCol: 'Format', descCol: 'Description', exampleCol: 'Exemple',
    rule1: 'Tableau d\'objets', rule1Desc: 'Format le plus courant', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Objets imbriques', rule2Desc: 'Aplatis avec notation pointee', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Types mixtes', rule3Desc: 'Null, booleen, nombre, texte', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Tableaux dans valeurs', rule4Desc: 'Joints avec point-virgule', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Objet unique', rule5Desc: 'CSV a une seule ligne', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quels formats JSON sont supportes ?', faq1a: 'Tableaux d\'objets, objets uniques et objets imbriques sont supportes.',
    faq2q: 'Comment les objets imbriques sont-ils traites ?', faq2a: 'Avec la notation pointee, ex: user.address.city.',
    faq3q: 'Puis-je utiliser le CSV dans Excel ?', faq3a: 'Oui, telechargez et ouvrez directement dans Excel ou Google Sheets.',
    faq4q: 'Y a-t-il une limite de taille ?', faq4a: 'Pas de limite serveur. Les fichiers tres volumineux peuvent etre lents.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON zu CSV Konverter',
    description: 'JSON-Daten online in CSV-Format konvertieren. Unterstuetzt Arrays, verschachteltes JSON und benutzerdefinierte Trennzeichen.',
    inputLabel: 'JSON-Eingabe', inputPlaceholder: 'JSON-Array hier einfuegen...',
    outputLabel: 'CSV-Ausgabe', convertBtn: 'In CSV konvertieren', clear: 'Loeschen', loadSample: 'Beispiel laden', download: 'CSV herunterladen',
    delimiter: 'Trennzeichen', comma: 'Komma (,)', semicolon: 'Semikolon (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Kopfzeile einschliessen', flattenNested: 'Verschachtelte Objekte abflachen',
    rows: 'Zeilen', columns: 'Spalten', error: 'Fehler',
    invalidJson: 'Ungueltiges JSON. Bitte gueltiges JSON-Array angeben.',
    introTitle: 'Kostenloser JSON zu CSV Konverter', introText: 'JSON-Daten sofort in CSV-Format umwandeln. Unterstuetzt verschachtelte Objekte und benutzerdefinierte Trennzeichen.',
    cheatTitle: 'Unterstuetzte JSON-Formate', ruleCol: 'Format', descCol: 'Beschreibung', exampleCol: 'Beispiel',
    rule1: 'Objekt-Array', rule1Desc: 'Haeufigstes Format', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Verschachtelt', rule2Desc: 'Mit Punktnotation abgeflacht', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Gemischte Typen', rule3Desc: 'Null, Boolean, Zahl, Text', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrays in Werten', rule4Desc: 'Mit Semikolon verbunden', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Einzelobjekt', rule5Desc: 'Als einzeilige CSV', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche JSON-Formate werden unterstuetzt?', faq1a: 'Objekt-Arrays, einzelne Objekte und verschachtelte Objekte.',
    faq2q: 'Wie werden verschachtelte Objekte behandelt?', faq2a: 'Mit Punktnotation abgeflacht, z.B. user.address.city.',
    faq3q: 'Kann ich die CSV in Excel verwenden?', faq3a: 'Ja, herunterladen und direkt in Excel oder Google Sheets oeffnen.',
    faq4q: 'Gibt es eine Groessenbeschraenkung?', faq4a: 'Keine Serverbeschraenkung. Sehr grosse Dateien koennen langsam sein.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor JSON a CSV',
    description: 'Convierta datos JSON a formato CSV en linea. Soporta arrays de objetos, JSON anidado y delimitadores personalizados.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Pegue su array JSON aqui...',
    outputLabel: 'Salida CSV', convertBtn: 'Convertir a CSV', clear: 'Limpiar', loadSample: 'Cargar ejemplo', download: 'Descargar CSV',
    delimiter: 'Delimitador', comma: 'Coma (,)', semicolon: 'Punto y coma (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Incluir fila de encabezado', flattenNested: 'Aplanar objetos anidados',
    rows: 'Filas', columns: 'Columnas', error: 'Error',
    invalidJson: 'JSON invalido. Proporcione un array de objetos JSON valido.',
    introTitle: 'Convertidor JSON a CSV gratuito', introText: 'Transforme datos JSON a formato CSV instantaneamente. Soporta objetos anidados y delimitadores personalizados.',
    cheatTitle: 'Formatos JSON soportados', ruleCol: 'Formato', descCol: 'Descripcion', exampleCol: 'Ejemplo',
    rule1: 'Array de objetos', rule1Desc: 'Formato mas comun', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Objetos anidados', rule2Desc: 'Aplanados con notacion de punto', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Tipos mixtos', rule3Desc: 'Null, boolean, numero, texto', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrays en valores', rule4Desc: 'Unidos con punto y coma', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Objeto unico', rule5Desc: 'CSV de una fila', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que formatos JSON se soportan?', faq1a: 'Arrays de objetos, objetos unicos y objetos anidados.',
    faq2q: 'Como se manejan los objetos anidados?', faq2a: 'Se aplanan con notacion de punto, ej: user.address.city.',
    faq3q: 'Puedo usar el CSV en Excel?', faq3a: 'Si, descargue y abra directamente en Excel o Google Sheets.',
    faq4q: 'Hay limite de tamano?', faq4a: 'Sin limite del servidor. Archivos muy grandes pueden ser lentos.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSON から CSV コンバーター',
    description: 'JSON データをオンラインで CSV 形式に変換。オブジェクト配列、ネスト JSON、カスタム区切り文字をサポート。',
    inputLabel: 'JSON 入力', inputPlaceholder: 'JSON 配列をここに貼り付け...',
    outputLabel: 'CSV 出力', convertBtn: 'CSV に変換', clear: 'クリア', loadSample: 'サンプル読込', download: 'CSV ダウンロード',
    delimiter: '区切り文字', comma: 'カンマ (,)', semicolon: 'セミコロン (;)', tab: 'タブ', pipe: 'パイプ (|)',
    includeHeader: 'ヘッダー行を含む', flattenNested: 'ネストオブジェクトを展開',
    rows: '行', columns: '列', error: 'エラー',
    invalidJson: '無効な JSON です。有効な JSON オブジェクト配列を入力してください。',
    introTitle: '無料 JSON から CSV コンバーター', introText: 'JSON データを即座に CSV 形式に変換。ネストオブジェクトやカスタム区切り文字をサポート。',
    cheatTitle: 'サポートされる JSON 形式', ruleCol: '形式', descCol: '説明', exampleCol: '例',
    rule1: 'オブジェクト配列', rule1Desc: '最も一般的な形式', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'ネストオブジェクト', rule2Desc: 'ドット記法で展開', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: '混合型', rule3Desc: 'Null、ブール、数値、文字列', rule3Ex: '{"active": true, "score": null}',
    rule4: '配列値', rule4Desc: 'セミコロンで結合', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: '単一オブジェクト', rule5Desc: '1行の CSV', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'よくある質問',
    faq1q: 'どの JSON 形式に対応していますか？', faq1a: 'オブジェクト配列、単一オブジェクト、ネストオブジェクトに対応しています。',
    faq2q: 'ネストオブジェクトはどう処理されますか？', faq2a: 'ドット記法で展開されます（例：user.address.city）。',
    faq3q: 'Excel で使えますか？', faq3a: 'はい、ダウンロードして Excel や Google Sheets で直接開けます。',
    faq4q: 'サイズ制限はありますか？', faq4a: 'サーバー制限はありません。非常に大きなファイルは遅くなる場合があります。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON to CSV 변환기',
    description: 'JSON 데이터를 온라인에서 CSV 형식으로 변환. 객체 배열, 중첩 JSON, 사용자 정의 구분자 지원.',
    inputLabel: 'JSON 입력', inputPlaceholder: 'JSON 배열을 여기에 붙여넣기...',
    outputLabel: 'CSV 출력', convertBtn: 'CSV로 변환', clear: '지우기', loadSample: '샘플 로드', download: 'CSV 다운로드',
    delimiter: '구분자', comma: '쉼표 (,)', semicolon: '세미콜론 (;)', tab: '탭', pipe: '파이프 (|)',
    includeHeader: '헤더 행 포함', flattenNested: '중첩 객체 펼치기',
    rows: '행', columns: '열', error: '오류',
    invalidJson: '유효하지 않은 JSON입니다. 유효한 JSON 객체 배열을 입력하세요.',
    introTitle: '무료 JSON to CSV 변환기', introText: 'JSON 데이터를 즉시 CSV 형식으로 변환. 중첩 객체와 사용자 정의 구분자를 지원합니다.',
    cheatTitle: '지원되는 JSON 형식', ruleCol: '형식', descCol: '설명', exampleCol: '예시',
    rule1: '객체 배열', rule1Desc: '가장 일반적인 형식', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: '중첩 객체', rule2Desc: '점 표기법으로 펼침', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: '혼합 타입', rule3Desc: 'Null, boolean, 숫자, 문자열', rule3Ex: '{"active": true, "score": null}',
    rule4: '배열 값', rule4Desc: '세미콜론으로 결합', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: '단일 객체', rule5Desc: '1행 CSV', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: '자주 묻는 질문',
    faq1q: '어떤 JSON 형식을 지원하나요?', faq1a: '객체 배열, 단일 객체, 중첩 객체를 지원합니다.',
    faq2q: '중첩 객체는 어떻게 처리되나요?', faq2a: '점 표기법으로 펼쳐집니다 (예: user.address.city).',
    faq3q: 'Excel에서 사용할 수 있나요?', faq3a: '네, 다운로드하여 Excel이나 Google Sheets에서 직접 열 수 있습니다.',
    faq4q: '크기 제한이 있나요?', faq4a: '서버 제한은 없습니다. 매우 큰 파일은 느려질 수 있습니다.',
    relatedTitle: '관련 도구',
  },
  pt: {
    title: 'Conversor JSON para CSV',
    description: 'Converta dados JSON para formato CSV online. Suporta arrays, JSON aninhado e delimitadores personalizados.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Cole seu array JSON aqui...',
    outputLabel: 'Saida CSV', convertBtn: 'Converter para CSV', clear: 'Limpar', loadSample: 'Carregar exemplo', download: 'Baixar CSV',
    delimiter: 'Delimitador', comma: 'Virgula (,)', semicolon: 'Ponto e virgula (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Incluir linha de cabecalho', flattenNested: 'Achatar objetos aninhados',
    rows: 'Linhas', columns: 'Colunas', error: 'Erro',
    invalidJson: 'JSON invalido. Forneca um array de objetos JSON valido.',
    introTitle: 'Conversor JSON para CSV gratis', introText: 'Transforme dados JSON em formato CSV instantaneamente. Suporta objetos aninhados e delimitadores personalizados.',
    cheatTitle: 'Formatos JSON suportados', ruleCol: 'Formato', descCol: 'Descricao', exampleCol: 'Exemplo',
    rule1: 'Array de objetos', rule1Desc: 'Formato mais comum', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Objetos aninhados', rule2Desc: 'Achatados com notacao de ponto', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Tipos mistos', rule3Desc: 'Null, booleano, numero, texto', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrays em valores', rule4Desc: 'Juntos com ponto e virgula', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Objeto unico', rule5Desc: 'CSV de uma linha', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Quais formatos JSON sao suportados?', faq1a: 'Arrays de objetos, objetos unicos e objetos aninhados.',
    faq2q: 'Como objetos aninhados sao tratados?', faq2a: 'Achatados com notacao de ponto, ex: user.address.city.',
    faq3q: 'Posso usar o CSV no Excel?', faq3a: 'Sim, baixe e abra diretamente no Excel ou Google Sheets.',
    faq4q: 'Ha limite de tamanho?', faq4a: 'Sem limite do servidor. Arquivos muito grandes podem ser lentos.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'JSON naar CSV Converter',
    description: 'Converteer JSON naar CSV online. Ondersteunt arrays, genest JSON en aangepaste scheidingstekens.',
    inputLabel: 'JSON Invoer', inputPlaceholder: 'Plak uw JSON array hier...',
    outputLabel: 'CSV Uitvoer', convertBtn: 'Naar CSV', clear: 'Wissen', loadSample: 'Voorbeeld laden', download: 'CSV downloaden',
    delimiter: 'Scheidingsteken', comma: 'Komma (,)', semicolon: 'Puntkomma (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Koprij opnemen', flattenNested: 'Geneste objecten afvlakken',
    rows: 'Rijen', columns: 'Kolommen', error: 'Fout',
    invalidJson: 'Ongeldig JSON. Geef een geldig JSON-array op.',
    introTitle: 'Gratis JSON naar CSV Converter', introText: 'JSON-gegevens direct omzetten naar CSV. Ondersteunt geneste objecten en aangepaste scheidingstekens.',
    cheatTitle: 'Ondersteunde JSON-formaten', ruleCol: 'Formaat', descCol: 'Beschrijving', exampleCol: 'Voorbeeld',
    rule1: 'Array van objecten', rule1Desc: 'Meest voorkomend', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Geneste objecten', rule2Desc: 'Afgevlakt met puntnotatie', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Gemengde typen', rule3Desc: 'Null, boolean, nummer, tekst', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrays in waarden', rule4Desc: 'Verbonden met puntkomma', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Enkel object', rule5Desc: 'CSV met een rij', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Welke JSON-formaten worden ondersteund?', faq1a: 'Arrays van objecten, enkele objecten en geneste objecten.',
    faq2q: 'Hoe worden geneste objecten verwerkt?', faq2a: 'Afgevlakt met puntnotatie, bijv. user.address.city.',
    faq3q: 'Kan ik het CSV in Excel gebruiken?', faq3a: 'Ja, download en open direct in Excel of Google Sheets.',
    faq4q: 'Is er een limiet?', faq4a: 'Geen serverlimiet. Zeer grote bestanden kunnen traag zijn.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter JSON do CSV',
    description: 'Konwertuj dane JSON na format CSV online. Obsluguje tablice obiektow, zagniezdzone JSON i niestandardowe separatory.',
    inputLabel: 'Wejscie JSON', inputPlaceholder: 'Wklej tablice JSON tutaj...',
    outputLabel: 'Wyjscie CSV', convertBtn: 'Konwertuj do CSV', clear: 'Wyczysc', loadSample: 'Zaladuj przyklad', download: 'Pobierz CSV',
    delimiter: 'Separator', comma: 'Przecinek (,)', semicolon: 'Srednik (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Dolacz wiersz naglowka', flattenNested: 'Splaszcz zagniezdzone obiekty',
    rows: 'Wiersze', columns: 'Kolumny', error: 'Blad',
    invalidJson: 'Nieprawidlowy JSON. Podaj prawidlowa tablice obiektow JSON.',
    introTitle: 'Darmowy konwerter JSON do CSV', introText: 'Konwertuj dane JSON na format CSV natychmiast. Obsluguje obiekty zagniezdzone i niestandardowe separatory.',
    cheatTitle: 'Obslugiwane formaty JSON', ruleCol: 'Format', descCol: 'Opis', exampleCol: 'Przyklad',
    rule1: 'Tablica obiektow', rule1Desc: 'Najczestszy format', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Zagniezdzone', rule2Desc: 'Splaszczone z notacja kropkowa', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Mieszane typy', rule3Desc: 'Null, boolean, liczba, tekst', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Tablice w wartosciach', rule4Desc: 'Polaczone srednikiem', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Pojedynczy obiekt', rule5Desc: 'CSV z jednym wierszem', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jakie formaty JSON sa obslugiwane?', faq1a: 'Tablice obiektow, pojedyncze obiekty i zagniezdzone obiekty.',
    faq2q: 'Jak obslugiwane sa zagniezdzone obiekty?', faq2a: 'Splaszczane z notacja kropkowa, np. user.address.city.',
    faq3q: 'Czy moge uzyc CSV w Excelu?', faq3a: 'Tak, pobierz i otworz bezposrednio w Excelu lub Google Sheets.',
    faq4q: 'Czy jest limit rozmiaru?', faq4a: 'Brak limitu serwera. Bardzo duze pliki moga byc wolne.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'JSON till CSV Konverterare',
    description: 'Konvertera JSON till CSV online. Stoeder arrayer, naestlad JSON och anpassade avgransare.',
    inputLabel: 'JSON Indata', inputPlaceholder: 'Klistra in din JSON-array haer...',
    outputLabel: 'CSV Utdata', convertBtn: 'Konvertera till CSV', clear: 'Rensa', loadSample: 'Ladda exempel', download: 'Ladda ner CSV',
    delimiter: 'Avgransare', comma: 'Komma (,)', semicolon: 'Semikolon (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Inkludera rubrikrad', flattenNested: 'Plaetta ut naestlade objekt',
    rows: 'Rader', columns: 'Kolumner', error: 'Fel',
    invalidJson: 'Ogiltig JSON. Ange en giltig JSON-array.',
    introTitle: 'Gratis JSON till CSV Konverterare', introText: 'Konvertera JSON-data till CSV direkt. Stoeder naestlade objekt och anpassade avgransare.',
    cheatTitle: 'JSON-format som stoeds', ruleCol: 'Format', descCol: 'Beskrivning', exampleCol: 'Exempel',
    rule1: 'Objektarray', rule1Desc: 'Vanligaste formatet', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Naestlade objekt', rule2Desc: 'Plaettade med punktnotation', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Blandade typer', rule3Desc: 'Null, boolean, nummer, text', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrayer i vaerden', rule4Desc: 'Foerenade med semikolon', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Enskilt objekt', rule5Desc: 'CSV med en rad', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vilka JSON-format stoeds?', faq1a: 'Objektarrayer, enskilda objekt och naestlade objekt.',
    faq2q: 'Hur hanteras naestlade objekt?', faq2a: 'Plaettas med punktnotation, t.ex. user.address.city.',
    faq3q: 'Kan jag anvaenda CSV i Excel?', faq3a: 'Ja, ladda ner och oeppna direkt i Excel eller Google Sheets.',
    faq4q: 'Finns det en storleksbegransning?', faq4a: 'Ingen serverbegransning. Mycket stora filer kan vara laangsamma.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'JSON til CSV Konverterer',
    description: 'Konverter JSON til CSV online. Stoetter arrayer, nestet JSON og tilpassede skilletegn.',
    inputLabel: 'JSON Inndata', inputPlaceholder: 'Lim inn din JSON-array her...',
    outputLabel: 'CSV Utdata', convertBtn: 'Konverter til CSV', clear: 'Toemme', loadSample: 'Last eksempel', download: 'Last ned CSV',
    delimiter: 'Skilletegn', comma: 'Komma (,)', semicolon: 'Semikolon (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Inkluder overskriftsrad', flattenNested: 'Flat ut nestede objekter',
    rows: 'Rader', columns: 'Kolonner', error: 'Feil',
    invalidJson: 'Ugyldig JSON. Oppgi en gyldig JSON-array.',
    introTitle: 'Gratis JSON til CSV Konverterer', introText: 'Konverter JSON-data til CSV umiddelbart. Stoetter nestede objekter og tilpassede skilletegn.',
    cheatTitle: 'Stoettede JSON-formater', ruleCol: 'Format', descCol: 'Beskrivelse', exampleCol: 'Eksempel',
    rule1: 'Objektarray', rule1Desc: 'Vanligste formatet', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Nestede objekter', rule2Desc: 'Flatet ut med punktnotasjon', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Blandede typer', rule3Desc: 'Null, boolean, tall, tekst', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Arrayer i verdier', rule4Desc: 'Sammenfoyd med semikolon', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Enkelt objekt', rule5Desc: 'CSV med en rad', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Vanlige spoersmaal',
    faq1q: 'Hvilke JSON-formater stoettes?', faq1a: 'Objektarrayer, enkle objekter og nestede objekter.',
    faq2q: 'Hvordan haandteres nestede objekter?', faq2a: 'Flatet ut med punktnotasjon, f.eks. user.address.city.',
    faq3q: 'Kan jeg bruke CSV i Excel?', faq3a: 'Ja, last ned og aapne direkt i Excel eller Google Sheets.',
    faq4q: 'Er det en stoerrelsesgrense?', faq4a: 'Ingen servergrense. Svart store filer kan vaere trege.',
    relatedTitle: 'Relaterte verktoy',
  },
  id: {
    title: 'Konverter JSON ke CSV',
    description: 'Konversi data JSON ke format CSV online. Mendukung array objek, JSON bersarang, dan delimiter kustom.',
    inputLabel: 'Input JSON', inputPlaceholder: 'Tempel array JSON Anda di sini...',
    outputLabel: 'Output CSV', convertBtn: 'Konversi ke CSV', clear: 'Hapus', loadSample: 'Muat Contoh', download: 'Unduh CSV',
    delimiter: 'Delimiter', comma: 'Koma (,)', semicolon: 'Titik koma (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Sertakan baris header', flattenNested: 'Ratakan objek bersarang',
    rows: 'Baris', columns: 'Kolom', error: 'Kesalahan',
    invalidJson: 'JSON tidak valid. Berikan array objek JSON yang valid.',
    introTitle: 'Konverter JSON ke CSV Gratis', introText: 'Ubah data JSON menjadi format CSV secara instan. Mendukung objek bersarang dan delimiter kustom.',
    cheatTitle: 'Format JSON yang Didukung', ruleCol: 'Format', descCol: 'Deskripsi', exampleCol: 'Contoh',
    rule1: 'Array objek', rule1Desc: 'Format paling umum', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Objek bersarang', rule2Desc: 'Diratakan dengan notasi titik', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Tipe campuran', rule3Desc: 'Null, boolean, angka, teks', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Array dalam nilai', rule4Desc: 'Digabung dengan titik koma', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Objek tunggal', rule5Desc: 'CSV satu baris', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faq1q: 'Format JSON apa yang didukung?', faq1a: 'Array objek, objek tunggal, dan objek bersarang.',
    faq2q: 'Bagaimana objek bersarang ditangani?', faq2a: 'Diratakan dengan notasi titik, mis. user.address.city.',
    faq3q: 'Bisa digunakan di Excel?', faq3a: 'Ya, unduh dan buka langsung di Excel atau Google Sheets.',
    faq4q: 'Ada batasan ukuran?', faq4a: 'Tidak ada batasan server. File sangat besar mungkin lambat.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'แปลง JSON เป็น CSV',
    description: 'แปลงข้อมูล JSON เป็น CSV ออนไลน์ รองรับ array ของ object, JSON ซ้อน และตัวคั่นที่กำหนดเอง',
    inputLabel: 'JSON นำเข้า', inputPlaceholder: 'วาง JSON array ที่นี่...',
    outputLabel: 'CSV ผลลัพธ์', convertBtn: 'แปลงเป็น CSV', clear: 'ล้าง', loadSample: 'โหลดตัวอย่าง', download: 'ดาวน์โหลด CSV',
    delimiter: 'ตัวคั่น', comma: 'จุลภาค (,)', semicolon: 'อัฒภาค (;)', tab: 'แท็บ', pipe: 'ไปป์ (|)',
    includeHeader: 'รวมแถวหัวข้อ', flattenNested: 'แผ่ object ที่ซ้อนกัน',
    rows: 'แถว', columns: 'คอลัมน์', error: 'ข้อผิดพลาด',
    invalidJson: 'JSON ไม่ถูกต้อง กรุณาใส่ JSON array ที่ถูกต้อง',
    introTitle: 'แปลง JSON เป็น CSV ฟรี', introText: 'แปลงข้อมูล JSON เป็น CSV ทันที รองรับ object ที่ซ้อนกันและตัวคั่นที่กำหนดเอง',
    cheatTitle: 'รูปแบบ JSON ที่รองรับ', ruleCol: 'รูปแบบ', descCol: 'คำอธิบาย', exampleCol: 'ตัวอย่าง',
    rule1: 'Array ของ object', rule1Desc: 'รูปแบบที่พบบ่อยที่สุด', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Object ซ้อน', rule2Desc: 'แผ่ด้วยเครื่องหมายจุด', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'ประเภทผสม', rule3Desc: 'Null, boolean, ตัวเลข, ข้อความ', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Array ในค่า', rule4Desc: 'รวมด้วยอัฒภาค', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Object เดี่ยว', rule5Desc: 'CSV หนึ่งแถว', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'รองรับรูปแบบ JSON อะไรบ้าง?', faq1a: 'Array ของ object, object เดี่ยว และ object ที่ซ้อนกัน',
    faq2q: 'Object ที่ซ้อนกันจัดการอย่างไร?', faq2a: 'แผ่ด้วยเครื่องหมายจุด เช่น user.address.city',
    faq3q: 'ใช้ใน Excel ได้ไหม?', faq3a: 'ได้ ดาวน์โหลดและเปิดใน Excel หรือ Google Sheets ได้โดยตรง',
    faq4q: 'มีข้อจำกัดขนาดไหม?', faq4a: 'ไม่มีข้อจำกัดฝั่งเซิร์ฟเวอร์ ไฟล์ขนาดใหญ่มากอาจช้า',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
  it: {
    title: 'Convertitore JSON in CSV',
    description: 'Converti dati JSON in formato CSV online. Supporta array di oggetti, JSON annidato e delimitatori personalizzati.',
    inputLabel: 'Input JSON', inputPlaceholder: 'Incolla il tuo array JSON qui...',
    outputLabel: 'Output CSV', convertBtn: 'Converti in CSV', clear: 'Cancella', loadSample: 'Carica esempio', download: 'Scarica CSV',
    delimiter: 'Delimitatore', comma: 'Virgola (,)', semicolon: 'Punto e virgola (;)', tab: 'Tab', pipe: 'Pipe (|)',
    includeHeader: 'Includi riga intestazione', flattenNested: 'Appiattisci oggetti annidati',
    rows: 'Righe', columns: 'Colonne', error: 'Errore',
    invalidJson: 'JSON non valido. Fornire un array di oggetti JSON valido.',
    introTitle: 'Convertitore JSON in CSV gratuito', introText: 'Trasforma dati JSON in formato CSV istantaneamente. Supporta oggetti annidati e delimitatori personalizzati.',
    cheatTitle: 'Formati JSON supportati', ruleCol: 'Formato', descCol: 'Descrizione', exampleCol: 'Esempio',
    rule1: 'Array di oggetti', rule1Desc: 'Formato piu comune', rule1Ex: '[{"a":1}, {"a":2}]',
    rule2: 'Oggetti annidati', rule2Desc: 'Appiattiti con notazione punto', rule2Ex: '{"user": {"name": "Alice"}}',
    rule3: 'Tipi misti', rule3Desc: 'Null, boolean, numero, testo', rule3Ex: '{"active": true, "score": null}',
    rule4: 'Array nei valori', rule4Desc: 'Uniti con punto e virgola', rule4Ex: '{"tags": ["js", "ts"]}',
    rule5: 'Oggetto singolo', rule5Desc: 'CSV a una riga', rule5Ex: '{"name": "Alice", "age": 30}',
    faqTitle: 'Domande frequenti',
    faq1q: 'Quali formati JSON sono supportati?', faq1a: 'Array di oggetti, oggetti singoli e oggetti annidati.',
    faq2q: 'Come vengono gestiti gli oggetti annidati?', faq2a: 'Appiattiti con notazione punto, es. user.address.city.',
    faq3q: 'Posso usare il CSV in Excel?', faq3a: 'Si, scarica e apri direttamente in Excel o Google Sheets.',
    faq4q: 'C\'e un limite di dimensione?', faq4a: 'Nessun limite server. File molto grandi possono essere lenti.',
    relatedTitle: 'Strumenti correlati',
  },
};

const SAMPLE_JSON = `[
  {"name": "Alice Johnson", "age": 30, "city": "New York", "role": "Engineer", "active": true},
  {"name": "Bob Smith", "age": 25, "city": "Los Angeles", "role": "Designer", "active": true},
  {"name": "Carol White", "age": 35, "city": "Chicago", "role": "Manager", "active": false},
  {"name": "David Lee", "age": 28, "city": "Houston", "role": "Developer", "active": true}
]`;

function flattenObject(obj: Record<string, unknown>, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey));
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}

function escapeCSV(value: unknown, delimiter: string): string {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return escapeCSV(value.join('; '), delimiter);
  const str = String(value);
  if (str.includes(delimiter) || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export default function JsonToCsvConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeader, setIncludeHeader] = useState(true);
  const [flattenNested, setFlattenNested] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [colCount, setColCount] = useState(0);

  const convert = useCallback(() => {
    setError('');
    if (!input.trim()) { setOutput(''); setRowCount(0); setColCount(0); return; }
    try {
      let data = JSON.parse(input);
      if (!Array.isArray(data)) {
        if (typeof data === 'object' && data !== null) {
          data = [data];
        } else {
          setError(t.invalidJson);
          return;
        }
      }
      if (data.length === 0) { setOutput(''); setRowCount(0); setColCount(0); return; }

      // Flatten if needed
      const rows: Record<string, unknown>[] = data.map((item: unknown) => {
        if (typeof item !== 'object' || item === null) return { value: item };
        return flattenNested ? flattenObject(item as Record<string, unknown>) : item as Record<string, unknown>;
      });

      // Collect all unique headers
      const headerSet = new Set<string>();
      rows.forEach(row => Object.keys(row).forEach(k => headerSet.add(k)));
      const headers = Array.from(headerSet);

      const lines: string[] = [];
      if (includeHeader) {
        lines.push(headers.map(h => escapeCSV(h, delimiter)).join(delimiter));
      }
      rows.forEach(row => {
        lines.push(headers.map(h => escapeCSV(row[h], delimiter)).join(delimiter));
      });

      setOutput(lines.join('\n'));
      setRowCount(rows.length);
      setColCount(headers.length);
    } catch {
      setError(t.invalidJson);
      setOutput('');
      setRowCount(0);
      setColCount(0);
    }
  }, [input, delimiter, includeHeader, flattenNested, t.invalidJson]);

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-csv-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>{t.delimiter}:</label>
        <select value={delimiter} onChange={e => setDelimiter(e.target.value)} style={{ padding: '4px 8px', fontSize: 13, borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
          <option value=",">{t.comma}</option>
          <option value=";">{t.semicolon}</option>
          <option value="&#9;">{t.tab}</option>
          <option value="|">{t.pipe}</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={includeHeader} onChange={e => setIncludeHeader(e.target.checked)} />
          {t.includeHeader}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={flattenNested} onChange={e => setFlattenNested(e.target.checked)} />
          {t.flattenNested}
        </label>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setRowCount(0); setColCount(0); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={() => { setInput(SAMPLE_JSON); setOutput(''); setError(''); }} className="btn btn-secondary">{t.loadSample}</button>
        {output && <button onClick={handleDownload} className="btn btn-secondary">{t.download}</button>}
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {t.error}: {error}
        </div>
      )}

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 160, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* Stats */}
      {output && (
        <div style={{ display: 'flex', gap: 20, padding: '10px 16px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.rows}: </span><strong>{rowCount}</strong></div>
          <div><span style={{ color: 'var(--text-secondary)' }}>{t.columns}: </span><strong>{colCount}</strong></div>
        </div>
      )}

      {/* Output */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
          {output && <CopyButton text={output} />}
        </div>
        <textarea value={output} readOnly style={{ minHeight: 160, fontFamily: 'monospace', fontSize: 13 }} />
      </div>

      {/* SEO Content */}
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
            { href: `/${lang}/tools/csv-json`, label: 'CSV to JSON' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
            { href: `/${lang}/tools/json-to-yaml`, label: 'JSON to YAML' },
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
