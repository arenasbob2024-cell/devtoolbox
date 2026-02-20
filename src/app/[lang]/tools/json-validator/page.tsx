'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

/* ── Helpers ─────────────────────────────────────────────────────── */
function getJsonDepth(value: unknown, current: number = 0): number {
  if (value === null || typeof value !== 'object') return current;
  if (Array.isArray(value)) {
    if (value.length === 0) return current + 1;
    return Math.max(...value.map(v => getJsonDepth(v, current + 1)));
  }
  const vals = Object.values(value as Record<string, unknown>);
  if (vals.length === 0) return current + 1;
  return Math.max(...vals.map(v => getJsonDepth(v, current + 1)));
}

function countKeys(value: unknown): number {
  if (value === null || typeof value !== 'object') return 0;
  if (Array.isArray(value)) return value.reduce((sum: number, v) => sum + countKeys(v), 0);
  const entries = Object.entries(value as Record<string, unknown>);
  return entries.length + entries.reduce((sum: number, [, v]) => sum + countKeys(v), 0);
}

function getJsonType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'Array';
  if (typeof value === 'object') return 'Object';
  return typeof value;
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Validator',
    description: 'Validate and check JSON syntax online. Paste your JSON to instantly detect syntax errors with line numbers and get a detailed structure analysis.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON here to validate...',
    validateBtn: 'Validate',
    clear: 'Clear',
    loadSample: 'Load Sample',
    loadInvalid: 'Load Invalid',
    error: 'Error',
    valid: 'Valid JSON',
    invalid: 'Invalid JSON',
    type: 'Type',
    keys: 'Total Keys',
    depth: 'Max Depth',
    size: 'Size',
    bytes: 'bytes',
    structureTitle: 'Structure Summary',
    introTitle: 'Online JSON Validator & Syntax Checker',
    introText: 'This free JSON validator and lint tool checks your JSON data for syntax errors instantly. Whether you are debugging API responses, validating configuration files, or checking JSON syntax before deployment, this JSON checker identifies issues and provides detailed error messages with position information. Use this JSON lint tool to ensure your data conforms to the JSON specification (RFC 8259).',
    cheatTitle: 'Common JSON Syntax Errors',
    errorCol: 'Error Type',
    wrongCol: 'Wrong',
    correctCol: 'Correct',
    err1: 'Missing comma',
    err1Wrong: '{"a": 1 "b": 2}',
    err1Right: '{"a": 1, "b": 2}',
    err2: 'Trailing comma',
    err2Wrong: '{"a": 1, "b": 2,}',
    err2Right: '{"a": 1, "b": 2}',
    err3: 'Single quotes',
    err3Wrong: "{\'a\': \'hello\'}",
    err3Right: '{"a": "hello"}',
    err4: 'Unquoted keys',
    err4Wrong: '{a: 1, b: 2}',
    err4Right: '{"a": 1, "b": 2}',
    err5: 'Comments',
    err5Wrong: '{"a": 1 /* comment */}',
    err5Right: '{"a": 1} (no comments)',
    err6: 'NaN / Infinity',
    err6Wrong: '{"val": NaN}',
    err6Right: '{"val": null} or {"val": 0}',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How to validate JSON?',
    faq1a: 'To validate JSON, paste your data into the input field and click "Validate". The tool will parse the JSON using the standard JSON.parse() method. If the JSON is valid, you will see a success message with structure details (type, key count, depth). If invalid, you will get a detailed error message showing what went wrong and where in the data the error occurs.',
    faq2q: 'What are the most common JSON errors?',
    faq2a: 'The most common JSON errors include: missing commas between key-value pairs, trailing commas after the last element, using single quotes instead of double quotes, unquoted property keys, including comments (not allowed in JSON), and using JavaScript values like undefined, NaN, or Infinity which are not valid JSON values.',
    faq3q: 'What is the difference between JSON and JavaScript objects?',
    faq3a: 'While JSON syntax is based on JavaScript object notation, there are important differences. JSON requires double quotes for all keys and string values, does not allow trailing commas, does not support comments, does not allow undefined or function values, and does not support single quotes. JavaScript objects are more flexible and allow all of these. JSON is a data interchange format, while JavaScript objects are a programming language construct.',
    relatedTitle: 'Related JSON Tools',
  },
  zh: {
    title: 'JSON 验证器',
    description: '在线验证和检查 JSON 语法。粘贴您的 JSON，即时检测语法错误并获取详细的结构分析。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴要验证的 JSON...',
    validateBtn: '验证',
    clear: '清除',
    loadSample: '加载示例',
    loadInvalid: '加载无效示例',
    error: '错误',
    valid: '有效的 JSON',
    invalid: '无效的 JSON',
    type: '类型',
    keys: '总键数',
    depth: '最大深度',
    size: '大小',
    bytes: '字节',
    structureTitle: '结构摘要',
    introTitle: '在线 JSON 验证器和语法检查器',
    introText: '这个免费的 JSON 验证和 lint 工具可以即时检查 JSON 数据的语法错误。无论是调试 API 响应、验证配置文件还是部署前检查 JSON 语法，都能识别问题并提供详细的错误信息和位置。',
    cheatTitle: '常见 JSON 语法错误',
    errorCol: '错误类型',
    wrongCol: '错误写法',
    correctCol: '正确写法',
    err1: '缺少逗号', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: '尾随逗号', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: '单引号', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: '未加引号的键', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: '注释', err5Wrong: '{"a": 1 /* 注释 */}', err5Right: '{"a": 1}（不支持注释）',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null} 或 {"val": 0}',
    faqTitle: '常见问题',
    faq1q: '如何验证 JSON？', faq1a: '将数据粘贴到输入框并点击"验证"。工具将使用标准的 JSON.parse() 方法解析 JSON。如果有效，将显示结构详情；如果无效，将显示详细的错误信息。',
    faq2q: '最常见的 JSON 错误有哪些？', faq2a: '最常见的 JSON 错误包括：键值对之间缺少逗号、最后一个元素后的尾随逗号、使用单引号而非双引号、未加引号的属性键、包含注释、使用 undefined、NaN 或 Infinity 等无效值。',
    faq3q: 'JSON 和 JavaScript 对象有什么区别？', faq3a: 'JSON 要求所有键和字符串值使用双引号，不允许尾随逗号、注释、undefined 或函数值。JavaScript 对象更灵活，允许所有这些。JSON 是数据交换格式，JavaScript 对象是编程语言构造。',
    relatedTitle: '相关 JSON 工具',
  },
  fr: {
    title: 'Validateur JSON',
    description: 'Validez et verifiez la syntaxe JSON en ligne. Collez votre JSON pour detecter les erreurs de syntaxe avec numeros de ligne et analyse de structure.',
    inputLabel: 'Entree JSON',
    inputPlaceholder: 'Collez votre JSON ici pour valider...',
    validateBtn: 'Valider',
    clear: 'Effacer',
    loadSample: 'Charger un exemple',
    loadInvalid: 'Charger invalide',
    error: 'Erreur',
    valid: 'JSON valide',
    invalid: 'JSON invalide',
    type: 'Type',
    keys: 'Cles totales',
    depth: 'Profondeur max',
    size: 'Taille',
    bytes: 'octets',
    structureTitle: 'Resume de la structure',
    introTitle: 'Validateur JSON en ligne',
    introText: 'Cet outil gratuit verifie la syntaxe JSON instantanement. Validez les reponses API, fichiers de configuration ou tout JSON avant deploiement.',
    cheatTitle: 'Erreurs de syntaxe JSON courantes',
    errorCol: 'Type d\'erreur', wrongCol: 'Incorrect', correctCol: 'Correct',
    err1: 'Virgule manquante', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: 'Virgule finale', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: 'Guillemets simples', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: 'Cles non citees', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: 'Commentaires', err5Wrong: '{"a": 1 /* commentaire */}', err5Right: '{"a": 1} (pas de commentaires)',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null}',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment valider du JSON ?', faq1a: 'Collez vos donnees et cliquez sur "Valider". L\'outil analyse le JSON et affiche les resultats de validation avec des details de structure.',
    faq2q: 'Quelles sont les erreurs JSON courantes ?', faq2a: 'Virgules manquantes, virgules finales, guillemets simples au lieu de doubles, cles sans guillemets, commentaires et valeurs JavaScript invalides.',
    faq3q: 'Difference entre JSON et objets JavaScript ?', faq3a: 'JSON exige des guillemets doubles, interdit les virgules finales et les commentaires. Les objets JavaScript sont plus flexibles.',
    relatedTitle: 'Outils JSON connexes',
  },
  de: {
    title: 'JSON Validator',
    description: 'JSON-Syntax online validieren und pruefen. JSON einfuegen um Syntaxfehler mit Zeilennummern und Strukturanalyse sofort zu erkennen.',
    inputLabel: 'JSON-Eingabe',
    inputPlaceholder: 'JSON hier einfuegen zum Validieren...',
    validateBtn: 'Validieren',
    clear: 'Loeschen',
    loadSample: 'Beispiel laden',
    loadInvalid: 'Ungueltig laden',
    error: 'Fehler',
    valid: 'Gueltiges JSON',
    invalid: 'Ungueltiges JSON',
    type: 'Typ',
    keys: 'Schluessel gesamt',
    depth: 'Max. Tiefe',
    size: 'Groesse',
    bytes: 'Bytes',
    structureTitle: 'Strukturuebersicht',
    introTitle: 'Online JSON Validator',
    introText: 'Dieses kostenlose Tool prueft JSON-Daten sofort auf Syntaxfehler. Validieren Sie API-Antworten, Konfigurationsdateien oder JSON vor dem Deployment.',
    cheatTitle: 'Haeufige JSON-Syntaxfehler',
    errorCol: 'Fehlertyp', wrongCol: 'Falsch', correctCol: 'Richtig',
    err1: 'Fehlendes Komma', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: 'Abschliessendes Komma', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: 'Einfache Anfuehrungszeichen', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: 'Schluessel ohne Anfuehrungszeichen', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: 'Kommentare', err5Wrong: '{"a": 1 /* Kommentar */}', err5Right: '{"a": 1} (keine Kommentare)',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null}',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie validiert man JSON?', faq1a: 'Daten einfuegen und auf "Validieren" klicken. Das Tool analysiert das JSON und zeigt Validierungsergebnisse mit Strukturdetails.',
    faq2q: 'Was sind haeufige JSON-Fehler?', faq2a: 'Fehlende Kommas, abschliessende Kommas, einfache statt doppelte Anfuehrungszeichen, Schluessel ohne Anfuehrungszeichen, Kommentare und ungueltige JavaScript-Werte.',
    faq3q: 'Unterschied zwischen JSON und JavaScript-Objekten?', faq3a: 'JSON erfordert doppelte Anfuehrungszeichen, verbietet abschliessende Kommas und Kommentare. JavaScript-Objekte sind flexibler.',
    relatedTitle: 'Verwandte JSON-Tools',
  },
  es: {
    title: 'Validador JSON',
    description: 'Valida y verifica la sintaxis JSON en linea. Pega tu JSON para detectar errores de sintaxis con numeros de linea y analisis de estructura.',
    inputLabel: 'Entrada JSON',
    inputPlaceholder: 'Pega tu JSON aqui para validar...',
    validateBtn: 'Validar',
    clear: 'Limpiar',
    loadSample: 'Cargar ejemplo',
    loadInvalid: 'Cargar invalido',
    error: 'Error',
    valid: 'JSON valido',
    invalid: 'JSON invalido',
    type: 'Tipo',
    keys: 'Claves totales',
    depth: 'Profundidad max',
    size: 'Tamano',
    bytes: 'bytes',
    structureTitle: 'Resumen de estructura',
    introTitle: 'Validador JSON en linea',
    introText: 'Esta herramienta gratuita verifica la sintaxis JSON instantaneamente. Valida respuestas API, archivos de configuracion o JSON antes del despliegue.',
    cheatTitle: 'Errores de sintaxis JSON comunes',
    errorCol: 'Tipo de error', wrongCol: 'Incorrecto', correctCol: 'Correcto',
    err1: 'Coma faltante', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: 'Coma final', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: 'Comillas simples', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: 'Claves sin comillas', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: 'Comentarios', err5Wrong: '{"a": 1 /* comentario */}', err5Right: '{"a": 1} (sin comentarios)',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null}',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como validar JSON?', faq1a: 'Pega tus datos y haz clic en "Validar". La herramienta analiza el JSON y muestra los resultados con detalles de estructura.',
    faq2q: 'Cuales son los errores JSON comunes?', faq2a: 'Comas faltantes, comas finales, comillas simples en vez de dobles, claves sin comillas, comentarios y valores JavaScript invalidos.',
    faq3q: 'Diferencia entre JSON y objetos JavaScript?', faq3a: 'JSON requiere comillas dobles, prohibe comas finales y comentarios. Los objetos JavaScript son mas flexibles.',
    relatedTitle: 'Herramientas JSON relacionadas',
  },
  ja: {
    title: 'JSON バリデーター',
    description: 'JSON 構文をオンラインで検証・チェック。JSON を貼り付けて構文エラーを即座に検出し、詳細な構造分析を取得。',
    inputLabel: 'JSON 入力',
    inputPlaceholder: '検証する JSON をここに貼り付け...',
    validateBtn: '検証',
    clear: 'クリア',
    loadSample: 'サンプル読込',
    loadInvalid: '無効サンプル',
    error: 'エラー',
    valid: '有効な JSON',
    invalid: '無効な JSON',
    type: '型',
    keys: '総キー数',
    depth: '最大深度',
    size: 'サイズ',
    bytes: 'バイト',
    structureTitle: '構造サマリー',
    introTitle: 'オンライン JSON バリデーター',
    introText: 'この無料ツールで JSON データの構文エラーを即座にチェック。API レスポンス、設定ファイル、デプロイ前の JSON を検証できます。',
    cheatTitle: '一般的な JSON 構文エラー',
    errorCol: 'エラー種別', wrongCol: '誤り', correctCol: '正しい',
    err1: 'カンマ不足', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: '末尾カンマ', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: 'シングルクォート', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: 'キー未引用', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: 'コメント', err5Wrong: '{"a": 1 /* コメント */}', err5Right: '{"a": 1}（コメント不可）',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null}',
    faqTitle: 'よくある質問',
    faq1q: 'JSON を検証するには？', faq1a: 'データを貼り付けて「検証」をクリック。ツールが JSON を解析し、構造の詳細を含む検証結果を表示します。',
    faq2q: '一般的な JSON エラーは？', faq2a: 'カンマ不足、末尾カンマ、シングルクォート、キー未引用、コメント、undefined/NaN/Infinity などの無効な値。',
    faq3q: 'JSON と JavaScript オブジェクトの違いは？', faq3a: 'JSON はダブルクォートが必須で、末尾カンマやコメントは不可。JavaScript オブジェクトはより柔軟です。',
    relatedTitle: '関連 JSON ツール',
  },
  ko: {
    title: 'JSON 유효성 검사기',
    description: 'JSON 구문을 온라인에서 검증하고 확인하세요. JSON을 붙여넣어 구문 오류를 즉시 감지하고 상세한 구조 분석을 받으세요.',
    inputLabel: 'JSON 입력',
    inputPlaceholder: '검증할 JSON을 여기에 붙여넣기...',
    validateBtn: '검증',
    clear: '지우기',
    loadSample: '샘플 로드',
    loadInvalid: '잘못된 샘플',
    error: '오류',
    valid: '유효한 JSON',
    invalid: '잘못된 JSON',
    type: '타입',
    keys: '총 키 수',
    depth: '최대 깊이',
    size: '크기',
    bytes: '바이트',
    structureTitle: '구조 요약',
    introTitle: '온라인 JSON 유효성 검사기',
    introText: '이 무료 도구로 JSON 데이터의 구문 오류를 즉시 확인하세요. API 응답, 설정 파일 또는 배포 전 JSON을 검증할 수 있습니다.',
    cheatTitle: '일반적인 JSON 구문 오류',
    errorCol: '오류 유형', wrongCol: '잘못된 예', correctCol: '올바른 예',
    err1: '쉼표 누락', err1Wrong: '{"a": 1 "b": 2}', err1Right: '{"a": 1, "b": 2}',
    err2: '후행 쉼표', err2Wrong: '{"a": 1, "b": 2,}', err2Right: '{"a": 1, "b": 2}',
    err3: '작은따옴표', err3Wrong: "{\'a\': \'hello\'}", err3Right: '{"a": "hello"}',
    err4: '따옴표 없는 키', err4Wrong: '{a: 1, b: 2}', err4Right: '{"a": 1, "b": 2}',
    err5: '주석', err5Wrong: '{"a": 1 /* 주석 */}', err5Right: '{"a": 1} (주석 불가)',
    err6: 'NaN / Infinity', err6Wrong: '{"val": NaN}', err6Right: '{"val": null}',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON을 검증하는 방법은?', faq1a: '데이터를 붙여넣고 "검증"을 클릭하세요. 도구가 JSON을 분석하고 구조 세부정보를 포함한 검증 결과를 표시합니다.',
    faq2q: '일반적인 JSON 오류는?', faq2a: '쉼표 누락, 후행 쉼표, 작은따옴표, 따옴표 없는 키, 주석, undefined/NaN/Infinity 등의 잘못된 값.',
    faq3q: 'JSON과 JavaScript 객체의 차이점은?', faq3a: 'JSON은 큰따옴표 필수, 후행 쉼표와 주석 불가. JavaScript 객체는 더 유연합니다.',
    relatedTitle: '관련 JSON 도구',
  },
};

export default function JsonValidator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{
    valid: boolean;
    error?: string;
    type?: string;
    keys?: number;
    depth?: number;
    size?: number;
  } | null>(null);

  const validate = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setResult({
        valid: true,
        type: getJsonType(parsed),
        keys: countKeys(parsed),
        depth: getJsonDepth(parsed),
        size: new Blob([input]).size,
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setResult({ valid: false, error: msg });
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      name: "DevToolBox",
      version: "2.0.0",
      features: ["JSON Validator", "Syntax Checker", "Structure Analysis"],
      config: { theme: "dark", language: "en", debug: false },
      stats: { users: 15000, tools: 106 },
      active: true
    }, null, 2));
    setResult(null);
  };

  const loadInvalid = () => {
    setInput(`{
  "name": "DevToolBox",
  "version": 2.0,
  "features": ["JSON Validator", "Syntax Checker",]
  "active": true
}`);
    setResult(null);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="json-validator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={validate} className="btn btn-primary">{t.validateBtn}</button>
        <button onClick={() => { setInput(''); setResult(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={loadInvalid} className="btn btn-secondary">{t.loadInvalid}</button>
      </div>

      {/* Result */}
      {result && (
        <div style={{
          background: result.valid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
          border: `1px solid ${result.valid ? 'rgba(34, 197, 94, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 15,
            fontWeight: 700,
            color: result.valid ? 'var(--accent-emerald)' : 'var(--accent-rose)',
            marginBottom: result.valid ? 12 : 0,
          }}>
            {result.valid ? `${t.valid}` : `${t.invalid}`}
          </div>
          {result.valid && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: 12,
            }}>
              {[
                { label: t.type, value: result.type },
                { label: t.keys, value: String(result.keys) },
                { label: t.depth, value: String(result.depth) },
                { label: t.size, value: `${result.size} ${t.bytes}` },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  border: '1px solid var(--border-color)',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
              ))}
            </div>
          )}
          {!result.valid && result.error && (
            <div style={{ fontSize: 13, color: 'var(--accent-rose)', marginTop: 6, fontFamily: 'monospace' }}>
              {result.error}
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 350 }}
        />
      </div>

      {/* Intro / SEO paragraph */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        {/* Cheat Sheet Table */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.cheatTitle}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.errorCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.wrongCol}</th>
                <th style={{ padding: '8px 12px', textAlign: 'left' }}>{t.correctCol}</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t.err1, t.err1Wrong, t.err1Right],
                [t.err2, t.err2Wrong, t.err2Right],
                [t.err3, t.err3Wrong, t.err3Right],
                [t.err4, t.err4Wrong, t.err4Right],
                [t.err5, t.err5Wrong, t.err5Right],
                [t.err6, t.err6Wrong, t.err6Right],
              ].map(([err, wrong, right], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{err}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-rose)' }}>{wrong}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-emerald)' }}>{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        {/* Related Tools */}
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-beautifier`, label: 'JSON Beautifier' },
            { href: `/${lang}/tools/json-minifier`, label: 'JSON Minifier' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid var(--border-color)',
                fontSize: 13,
                color: 'var(--accent-blue)',
                textDecoration: 'none',
                background: 'var(--bg-input)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
