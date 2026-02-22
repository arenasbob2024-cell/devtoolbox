'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Formatter & Validator',
    description: 'Format, beautify, and validate JSON data online. Check JSON syntax, fix errors, and get clean indented output instantly.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON here to format and validate...',
    outputLabel: 'Formatted & Validated JSON',
    outputPlaceholder: 'Formatted JSON will appear here...',
    formatBtn: 'Format & Validate',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    valid: 'Valid JSON',
    invalid: 'Invalid JSON',
    lines: 'lines',
    chars: 'chars',
    introTitle: 'Free Online JSON Formatter & Validator',
    introText: 'This combined JSON formatter and validator tool lets you format messy JSON data and validate its syntax in one step. Whether you are debugging API responses, checking configuration files, or cleaning up JSON for documentation, this tool highlights syntax errors, auto-fixes common issues, and outputs perfectly indented JSON. Supports 2-space, 4-space, and tab indentation.',
    cheatTitle: 'Common JSON Syntax Errors',
    ruleCol: 'Error',
    descCol: 'Fix',
    exampleCol: 'Example',
    rule1: 'Trailing commas',
    rule1Desc: 'Remove comma after last item',
    rule1Ex: '{"a":1, "b":2} not {"a":1, "b":2,}',
    rule2: 'Single quotes',
    rule2Desc: 'Use double quotes for keys and strings',
    rule2Ex: '{"key": "value"} not {\'key\': \'value\'}',
    rule3: 'Missing quotes on keys',
    rule3Desc: 'All keys must be quoted',
    rule3Ex: '{"name":"John"} not {name:"John"}',
    rule4: 'Comments',
    rule4Desc: 'Remove // and /* */ comments',
    rule4Ex: 'Standard JSON does not allow comments',
    rule5: 'Undefined / NaN',
    rule5Desc: 'Use null instead',
    rule5Ex: '{"x": null} not {"x": undefined}',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSON validation?',
    faq1a: 'JSON validation checks whether a string conforms to the JSON specification (RFC 8259). A valid JSON document must have properly quoted keys, matching brackets, no trailing commas, no comments, and only allowed data types (string, number, boolean, null, array, object). Our validator pinpoints the exact location of syntax errors so you can fix them quickly.',
    faq2q: 'Can I format and validate JSON at the same time?',
    faq2a: 'Yes. This tool first validates the JSON syntax and, if valid, formats it with your chosen indentation. If the JSON is invalid, you will see a detailed error message showing exactly where the problem is, including the line and character position of the error.',
    faq3q: 'What is the difference between JSON lint and JSON validator?',
    faq3a: 'JSON lint and JSON validator are interchangeable terms. Both check JSON syntax for correctness. Some linters also flag style issues (like inconsistent indentation), while validators strictly check whether the JSON conforms to the specification. This tool does both: it validates syntax and formats the output.',
    faq4q: 'How do I validate JSON in JavaScript?',
    faq4a: 'In JavaScript, use a try-catch block: try { JSON.parse(jsonString); } catch (e) { console.error("Invalid JSON:", e.message); }. The JSON.parse() method throws a SyntaxError if the input is not valid JSON. For more detailed validation against a schema, use libraries like Ajv or Zod.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 格式化验证器',
    description: '在线格式化、美化和验证 JSON 数据。检查 JSON 语法，修复错误，即时获得整洁缩进的输出。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴要格式化和验证的 JSON...',
    outputLabel: '格式化并验证的 JSON',
    outputPlaceholder: '格式化后的 JSON 将显示在此...',
    formatBtn: '格式化并验证',
    clear: '清除',
    loadSample: '加载示例',
    indent: '缩进',
    spaces: '空格',
    tab: '制表符',
    valid: 'JSON 有效',
    invalid: 'JSON 无效',
    lines: '行',
    chars: '字符',
    introTitle: '免费在线 JSON 格式化验证器',
    introText: '这个组合式 JSON 格式化和验证工具可以一步完成 JSON 数据的格式化和语法验证。无论是调试 API 响应还是检查配置文件，都能高亮语法错误并输出完美缩进的 JSON。',
    cheatTitle: '常见 JSON 语法错误',
    ruleCol: '错误', descCol: '修复方法', exampleCol: '示例',
    rule1: '尾随逗号', rule1Desc: '删除最后一项后的逗号', rule1Ex: '{"a":1, "b":2}',
    rule2: '单引号', rule2Desc: '键和字符串使用双引号', rule2Ex: '{"key": "value"}',
    rule3: '键缺少引号', rule3Desc: '所有键必须加引号', rule3Ex: '{"name":"John"}',
    rule4: '注释', rule4Desc: '删除 // 和 /* */ 注释', rule4Ex: '标准 JSON 不允许注释',
    rule5: 'Undefined / NaN', rule5Desc: '使用 null 代替', rule5Ex: '{"x": null}',
    faqTitle: '常见问题',
    faq1q: '什么是 JSON 验证？',
    faq1a: 'JSON 验证检查字符串是否符合 JSON 规范 (RFC 8259)。有效的 JSON 文档必须有正确引用的键、匹配的括号、无尾随逗号、无注释。',
    faq2q: '可以同时格式化和验证 JSON 吗？',
    faq2a: '是的。此工具首先验证 JSON 语法，如果有效则按选择的缩进进行格式化。如果无效，会显示详细的错误消息。',
    faq3q: 'JSON lint 和 JSON validator 有什么区别？',
    faq3a: 'JSON lint 和 JSON validator 是可互换的术语。两者都检查 JSON 语法的正确性。此工具同时完成验证和格式化。',
    faq4q: '如何在 JavaScript 中验证 JSON？',
    faq4a: '使用 try-catch：try { JSON.parse(jsonString); } catch (e) { console.error("Invalid JSON:", e.message); }',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Formateur & Validateur JSON',
    description: 'Formatez, embellissez et validez les donnees JSON en ligne. Verifiez la syntaxe et obtenez une sortie indentee propre.',
    inputLabel: 'Entree JSON', inputPlaceholder: 'Collez votre JSON ici...', outputLabel: 'JSON formate et valide',
    outputPlaceholder: 'Le JSON formate apparaitra ici...', formatBtn: 'Formater et valider', clear: 'Effacer',
    loadSample: 'Charger un exemple', indent: 'Indentation', spaces: 'espaces', tab: 'Tab',
    valid: 'JSON valide', invalid: 'JSON invalide', lines: 'lignes', chars: 'caracteres',
    introTitle: 'Formateur et validateur JSON gratuit', introText: 'Cet outil formate et valide le JSON en une seule etape. Il met en evidence les erreurs de syntaxe et produit un JSON parfaitement indente.',
    cheatTitle: 'Erreurs de syntaxe JSON courantes', ruleCol: 'Erreur', descCol: 'Correction', exampleCol: 'Exemple',
    rule1: 'Virgule finale', rule1Desc: 'Supprimer la virgule apres le dernier element', rule1Ex: '{"a":1, "b":2}',
    rule2: 'Guillemets simples', rule2Desc: 'Utiliser des guillemets doubles', rule2Ex: '{"key": "value"}',
    rule3: 'Cles sans guillemets', rule3Desc: 'Toutes les cles doivent etre entre guillemets', rule3Ex: '{"name":"John"}',
    rule4: 'Commentaires', rule4Desc: 'Supprimer // et /* */', rule4Ex: 'JSON standard interdit les commentaires',
    rule5: 'Undefined / NaN', rule5Desc: 'Utiliser null', rule5Ex: '{"x": null}',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce que la validation JSON ?', faq1a: 'La validation JSON verifie si une chaine est conforme a la specification JSON (RFC 8259).',
    faq2q: 'Peut-on formater et valider en meme temps ?', faq2a: 'Oui, cet outil valide d\'abord la syntaxe puis formate le JSON avec l\'indentation choisie.',
    faq3q: 'Difference entre JSON lint et validateur ?', faq3a: 'Les deux termes sont interchangeables. Cet outil fait les deux : validation et formatage.',
    faq4q: 'Comment valider le JSON en JavaScript ?', faq4a: 'Utilisez try { JSON.parse(jsonString); } catch (e) { ... }',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON Formatierer & Validator',
    description: 'JSON-Daten online formatieren, verschoenern und validieren. Syntaxfehler finden und saubere Ausgabe erhalten.',
    inputLabel: 'JSON-Eingabe', inputPlaceholder: 'JSON hier einfuegen...', outputLabel: 'Formatiertes & validiertes JSON',
    outputPlaceholder: 'Formatiertes JSON erscheint hier...', formatBtn: 'Formatieren & Validieren', clear: 'Loeschen',
    loadSample: 'Beispiel laden', indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab',
    valid: 'Gueltiges JSON', invalid: 'Ungueltiges JSON', lines: 'Zeilen', chars: 'Zeichen',
    introTitle: 'Kostenloser JSON Formatierer & Validator', introText: 'Dieses Tool formatiert und validiert JSON in einem Schritt. Syntaxfehler werden hervorgehoben und perfekt eingeruecktes JSON ausgegeben.',
    cheatTitle: 'Haeufige JSON-Syntaxfehler', ruleCol: 'Fehler', descCol: 'Loesung', exampleCol: 'Beispiel',
    rule1: 'Abschliessendes Komma', rule1Desc: 'Komma nach letztem Element entfernen', rule1Ex: '{"a":1, "b":2}',
    rule2: 'Einfache Anfuehrungszeichen', rule2Desc: 'Doppelte Anfuehrungszeichen verwenden', rule2Ex: '{"key": "value"}',
    rule3: 'Schluessel ohne Anfuehrungszeichen', rule3Desc: 'Alle Schluessel muessen in Anfuehrungszeichen stehen', rule3Ex: '{"name":"John"}',
    rule4: 'Kommentare', rule4Desc: '// und /* */ entfernen', rule4Ex: 'Standard-JSON erlaubt keine Kommentare',
    rule5: 'Undefined / NaN', rule5Desc: 'Stattdessen null verwenden', rule5Ex: '{"x": null}',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist JSON-Validierung?', faq1a: 'JSON-Validierung prueft, ob ein String der JSON-Spezifikation (RFC 8259) entspricht.',
    faq2q: 'Kann man gleichzeitig formatieren und validieren?', faq2a: 'Ja, dieses Tool validiert zuerst die Syntax und formatiert dann mit der gewaehlten Einrueckung.',
    faq3q: 'Unterschied zwischen JSON Lint und Validator?', faq3a: 'Beide Begriffe sind austauschbar. Dieses Tool macht beides: Validierung und Formatierung.',
    faq4q: 'Wie validiert man JSON in JavaScript?', faq4a: 'Verwenden Sie try { JSON.parse(jsonString); } catch (e) { ... }',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Formateador y Validador JSON',
    description: 'Formatea, embellece y valida datos JSON en linea. Verifica la sintaxis y obtiene una salida indentada limpia.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Pega tu JSON aqui...', outputLabel: 'JSON formateado y validado',
    outputPlaceholder: 'El JSON formateado aparecera aqui...', formatBtn: 'Formatear y validar', clear: 'Limpiar',
    loadSample: 'Cargar ejemplo', indent: 'Indentacion', spaces: 'espacios', tab: 'Tab',
    valid: 'JSON valido', invalid: 'JSON invalido', lines: 'lineas', chars: 'caracteres',
    introTitle: 'Formateador y validador JSON gratuito', introText: 'Esta herramienta formatea y valida JSON en un solo paso. Resalta errores de sintaxis y produce JSON perfectamente indentado.',
    cheatTitle: 'Errores de sintaxis JSON comunes', ruleCol: 'Error', descCol: 'Solucion', exampleCol: 'Ejemplo',
    rule1: 'Coma final', rule1Desc: 'Eliminar coma tras el ultimo elemento', rule1Ex: '{"a":1, "b":2}',
    rule2: 'Comillas simples', rule2Desc: 'Usar comillas dobles', rule2Ex: '{"key": "value"}',
    rule3: 'Claves sin comillas', rule3Desc: 'Todas las claves deben estar entre comillas', rule3Ex: '{"name":"John"}',
    rule4: 'Comentarios', rule4Desc: 'Eliminar // y /* */', rule4Ex: 'JSON estandar no permite comentarios',
    rule5: 'Undefined / NaN', rule5Desc: 'Usar null en su lugar', rule5Ex: '{"x": null}',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es la validacion JSON?', faq1a: 'La validacion JSON comprueba si una cadena cumple la especificacion JSON (RFC 8259).',
    faq2q: 'Se puede formatear y validar al mismo tiempo?', faq2a: 'Si, esta herramienta primero valida la sintaxis y luego formatea con la indentacion elegida.',
    faq3q: 'Diferencia entre JSON lint y validador?', faq3a: 'Ambos terminos son intercambiables. Esta herramienta hace ambas cosas.',
    faq4q: 'Como validar JSON en JavaScript?', faq4a: 'Use try { JSON.parse(jsonString); } catch (e) { ... }',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSON フォーマッター＆バリデーター',
    description: 'JSON データをオンラインでフォーマット、美化、検証。構文エラーを検出し、整形された出力を即座に取得。',
    inputLabel: 'JSON 入力', inputPlaceholder: 'フォーマットと検証する JSON をここに貼り付け...', outputLabel: 'フォーマット済み＆検証済み JSON',
    outputPlaceholder: 'フォーマットされた JSON がここに表示されます...', formatBtn: 'フォーマット＆検証', clear: 'クリア',
    loadSample: 'サンプル読込', indent: 'インデント', spaces: 'スペース', tab: 'タブ',
    valid: '有効な JSON', invalid: '無効な JSON', lines: '行', chars: '文字',
    introTitle: '無料オンライン JSON フォーマッター＆バリデーター', introText: 'このツールは JSON のフォーマットと検証を一度に行います。構文エラーをハイライトし、完璧にインデントされた JSON を出力します。',
    cheatTitle: 'よくある JSON 構文エラー', ruleCol: 'エラー', descCol: '修正方法', exampleCol: '例',
    rule1: '末尾カンマ', rule1Desc: '最後の要素の後のカンマを削除', rule1Ex: '{"a":1, "b":2}',
    rule2: 'シングルクォート', rule2Desc: 'ダブルクォートを使用', rule2Ex: '{"key": "value"}',
    rule3: 'キーのクォート不足', rule3Desc: 'すべてのキーにクォート必要', rule3Ex: '{"name":"John"}',
    rule4: 'コメント', rule4Desc: '// と /* */ を削除', rule4Ex: '標準 JSON はコメント不可',
    rule5: 'Undefined / NaN', rule5Desc: 'null を使用', rule5Ex: '{"x": null}',
    faqTitle: 'よくある質問',
    faq1q: 'JSON 検証とは？', faq1a: 'JSON 検証は文字列が JSON 仕様 (RFC 8259) に準拠しているか確認します。',
    faq2q: 'フォーマットと検証を同時にできますか？', faq2a: 'はい、このツールはまず構文を検証し、有効であれば選択したインデントでフォーマットします。',
    faq3q: 'JSON lint と validator の違いは？', faq3a: '両方とも同義語です。このツールは両方を行います。',
    faq4q: 'JavaScript で JSON を検証するには？', faq4a: 'try { JSON.parse(jsonString); } catch (e) { ... } を使用',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON 포맷터 & 검증기',
    description: 'JSON 데이터를 온라인으로 포맷, 정리, 검증합니다. 구문 오류를 확인하고 깔끔한 들여쓰기 출력을 얻으세요.',
    inputLabel: 'JSON 입력', inputPlaceholder: '포맷하고 검증할 JSON을 여기에 붙여넣기...', outputLabel: '포맷 및 검증된 JSON',
    outputPlaceholder: '포맷된 JSON이 여기에 표시됩니다...', formatBtn: '포맷 & 검증', clear: '지우기',
    loadSample: '샘플 로드', indent: '들여쓰기', spaces: '스페이스', tab: '탭',
    valid: '유효한 JSON', invalid: '유효하지 않은 JSON', lines: '줄', chars: '문자',
    introTitle: '무료 온라인 JSON 포맷터 & 검증기', introText: '이 도구는 JSON 포맷팅과 검증을 한 번에 수행합니다. 구문 오류를 강조하고 완벽하게 들여쓰기된 JSON을 출력합니다.',
    cheatTitle: '일반적인 JSON 구문 오류', ruleCol: '오류', descCol: '수정', exampleCol: '예시',
    rule1: '후행 쉼표', rule1Desc: '마지막 항목 뒤 쉼표 제거', rule1Ex: '{"a":1, "b":2}',
    rule2: '작은따옴표', rule2Desc: '큰따옴표 사용', rule2Ex: '{"key": "value"}',
    rule3: '키에 따옴표 누락', rule3Desc: '모든 키에 따옴표 필요', rule3Ex: '{"name":"John"}',
    rule4: '주석', rule4Desc: '// 및 /* */ 제거', rule4Ex: '표준 JSON은 주석 불가',
    rule5: 'Undefined / NaN', rule5Desc: 'null 사용', rule5Ex: '{"x": null}',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON 검증이란?', faq1a: 'JSON 검증은 문자열이 JSON 사양(RFC 8259)을 준수하는지 확인합니다.',
    faq2q: '포맷과 검증을 동시에 할 수 있나요?', faq2a: '네, 이 도구는 먼저 구문을 검증하고 유효하면 선택한 들여쓰기로 포맷합니다.',
    faq3q: 'JSON lint와 validator의 차이점은?', faq3a: '둘 다 같은 의미입니다. 이 도구는 둘 다 수행합니다.',
    faq4q: 'JavaScript에서 JSON을 검증하는 방법은?', faq4a: 'try { JSON.parse(jsonString); } catch (e) { ... } 사용',
    relatedTitle: '관련 도구',
  },
};

export default function JsonFormatterValidator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState<string>('2');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const formatAndValidate = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const indentVal = indent === 'tab' ? '\t' : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setError('');
      setIsValid(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
      setIsValid(false);
    }
  };

  const loadSample = () => {
    setInput('{"name":"DevToolBox","version":"2.0","features":["JSON Formatter","JSON Validator","JSON Minifier"],"config":{"theme":"dark","language":"en","debug":false},"stats":{"users":15000,"tools":139},"active":true}');
    setOutput('');
    setError('');
    setIsValid(null);
  };

  const outputLines = output ? output.split('\n').length : 0;
  const outputChars = output.length;

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
    <ToolLayout title={t.title} description={t.description} toolId="json-formatter-validator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={formatAndValidate} className="btn btn-primary">{t.formatBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setIsValid(null); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select value={indent} onChange={e => setIndent(e.target.value)} style={{ width: 100, padding: '4px 8px', fontSize: 12 }}>
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
          </select>
        </div>
      </div>

      {/* Validation status */}
      {isValid !== null && (
        <div style={{
          background: isValid ? 'rgba(34,197,94,0.1)' : 'rgba(244,63,94,0.1)',
          border: `1px solid ${isValid ? 'rgba(34,197,94,0.3)' : 'rgba(244,63,94,0.3)'}`,
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13,
          color: isValid ? '#22c55e' : 'var(--accent-rose)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>{isValid ? `${t.valid}` : `${t.invalid}: ${error}`}</span>
          {isValid && <span style={{ fontSize: 12, opacity: 0.7 }}>{outputLines} {t.lines} / {outputChars.toLocaleString()} {t.chars}</span>}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
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
              {[
                [t.rule1, t.rule1Desc, t.rule1Ex],
                [t.rule2, t.rule2Desc, t.rule2Ex],
                [t.rule3, t.rule3Desc, t.rule3Ex],
                [t.rule4, t.rule4Desc, t.rule4Ex],
                [t.rule5, t.rule5Desc, t.rule5Ex],
              ].map(([rule, desc, ex], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>{rule}</td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{desc}</td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 12, color: 'var(--accent-blue)' }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
          ].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
            { href: `/${lang}/tools/json-beautifier`, label: 'JSON Beautifier' },
            { href: `/${lang}/tools/json-minifier`, label: 'JSON Minifier' },
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
