'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Beautifier',
    description: 'Beautify, pretty print, and format JSON data online. Paste your minified or messy JSON and get clean, readable, indented output instantly.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON here to beautify...',
    outputLabel: 'Beautified JSON',
    outputPlaceholder: 'Beautified JSON will appear here...',
    beautifyBtn: 'Beautify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    error: 'Error',
    introTitle: 'Online JSON Beautifier & Pretty Printer',
    introText: 'This free JSON beautifier tool lets you pretty print JSON data with customizable indentation. Whether you need to beautify minified API responses, format configuration files, or pretty print JSON for debugging, this tool converts compact JSON into a clean, human-readable format. Our JSON beautifier supports 2-space, 4-space, and tab indentation styles.',
    cheatTitle: 'JSON Formatting Rules',
    ruleCol: 'Rule',
    descCol: 'Description',
    exampleCol: 'Example',
    rule1: 'Indentation',
    rule1Desc: 'Use consistent spaces or tabs for nesting',
    rule1Ex: '2 spaces, 4 spaces, or 1 tab',
    rule2: 'Trailing Commas',
    rule2Desc: 'NOT allowed after last item in arrays/objects',
    rule2Ex: '{"a":1, "b":2} (no comma after 2)',
    rule3: 'Quotes',
    rule3Desc: 'Keys and strings must use double quotes',
    rule3Ex: '{"key": "value"} not {\'key\': \'value\'}',
    rule4: 'Comments',
    rule4Desc: 'NOT supported in standard JSON',
    rule4Ex: 'Use JSONC or JSON5 for comments',
    rule5: 'Data Types',
    rule5Desc: 'string, number, boolean, null, object, array',
    rule5Ex: '{"str":"hi","num":42,"ok":true,"x":null}',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is JSON beautifying?',
    faq1a: 'JSON beautifying (also called pretty printing) is the process of adding proper indentation, line breaks, and spacing to compact or minified JSON data. This makes the JSON structure easier to read, understand, and debug. Beautified JSON uses consistent indentation to show the hierarchy of nested objects and arrays clearly.',
    faq2q: 'What is the difference between JSON beautifier and JSON formatter?',
    faq2a: 'JSON beautifier and JSON formatter are essentially the same thing. Both take unformatted or minified JSON and add indentation and line breaks to make it readable. Some tools use "formatter" to include additional features like sorting keys or validating syntax, while "beautifier" specifically emphasizes making JSON visually appealing and easy to read.',
    faq3q: 'How to pretty print JSON in code?',
    faq3a: 'In JavaScript/Node.js, use JSON.stringify(data, null, 2) where 2 is the number of indent spaces. In Python, use json.dumps(data, indent=2). In Java, use new GsonBuilder().setPrettyPrinting().create().toJson(obj). In PHP, use json_encode($data, JSON_PRETTY_PRINT). Most languages have built-in or library support for JSON pretty printing.',
    relatedTitle: 'Related JSON Tools',
  },
  zh: {
    title: 'JSON 美化器',
    description: '在线美化、格式化和缩进 JSON 数据。粘贴您的压缩或混乱的 JSON，即时获得整洁、可读的输出。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴要美化的 JSON...',
    outputLabel: '美化后的 JSON',
    outputPlaceholder: '美化后的 JSON 将显示在此...',
    beautifyBtn: '美化',
    clear: '清除',
    loadSample: '加载示例',
    indent: '缩进',
    spaces: '空格',
    tab: '制表符',
    error: '错误',
    introTitle: '在线 JSON 美化器和格式化工具',
    introText: '这个免费的 JSON 美化工具可以自定义缩进来格式化 JSON 数据。无论是美化压缩的 API 响应、格式化配置文件还是调试时格式化 JSON，都能将紧凑的 JSON 转换为整洁可读的格式。支持 2 空格、4 空格和制表符缩进。',
    cheatTitle: 'JSON 格式化规则',
    ruleCol: '规则',
    descCol: '说明',
    exampleCol: '示例',
    rule1: '缩进',
    rule1Desc: '使用一致的空格或制表符进行嵌套',
    rule1Ex: '2 空格、4 空格或 1 个制表符',
    rule2: '尾随逗号',
    rule2Desc: '数组/对象最后一项后不允许',
    rule2Ex: '{"a":1, "b":2}（2 后面没有逗号）',
    rule3: '引号',
    rule3Desc: '键和字符串必须使用双引号',
    rule3Ex: '{"key": "value"} 而不是 {\'key\': \'value\'}',
    rule4: '注释',
    rule4Desc: '标准 JSON 不支持注释',
    rule4Ex: '使用 JSONC 或 JSON5 添加注释',
    rule5: '数据类型',
    rule5Desc: '字符串、数字、布尔值、null、对象、数组',
    rule5Ex: '{"str":"hi","num":42,"ok":true,"x":null}',
    faqTitle: '常见问题',
    faq1q: '什么是 JSON 美化？',
    faq1a: 'JSON 美化（也称为格式化打印）是将紧凑或压缩的 JSON 数据添加适当的缩进、换行和空格的过程。这使得 JSON 结构更容易阅读、理解和调试。',
    faq2q: 'JSON 美化器和 JSON 格式化器有什么区别？',
    faq2a: 'JSON 美化器和 JSON 格式化器本质上是相同的。两者都将未格式化的 JSON 添加缩进和换行使其可读。',
    faq3q: '如何在代码中格式化 JSON？',
    faq3a: '在 JavaScript/Node.js 中使用 JSON.stringify(data, null, 2)，Python 中使用 json.dumps(data, indent=2)，大多数语言都有内置的 JSON 格式化支持。',
    relatedTitle: '相关 JSON 工具',
  },
  fr: {
    title: 'Embellisseur JSON',
    description: 'Embellissez et formatez vos donnees JSON en ligne. Collez votre JSON minifie et obtenez une sortie lisible et indentee.',
    inputLabel: 'Entree JSON',
    inputPlaceholder: 'Collez votre JSON ici...',
    outputLabel: 'JSON embelli',
    outputPlaceholder: 'Le JSON embelli apparaitra ici...',
    beautifyBtn: 'Embellir',
    clear: 'Effacer',
    loadSample: 'Charger un exemple',
    indent: 'Indentation',
    spaces: 'espaces',
    tab: 'Tab',
    error: 'Erreur',
    introTitle: 'Embellisseur JSON en ligne',
    introText: 'Cet outil gratuit vous permet de formater le JSON avec une indentation personnalisable. Embellissez les reponses API, les fichiers de configuration ou tout JSON compact.',
    cheatTitle: 'Regles de formatage JSON',
    ruleCol: 'Regle', descCol: 'Description', exampleCol: 'Exemple',
    rule1: 'Indentation', rule1Desc: 'Espaces ou tabs coherents', rule1Ex: '2 ou 4 espaces, ou 1 tab',
    rule2: 'Virgule finale', rule2Desc: 'NON autorisee apres le dernier element', rule2Ex: '{"a":1, "b":2}',
    rule3: 'Guillemets', rule3Desc: 'Cles et chaines en guillemets doubles', rule3Ex: '{"key": "value"}',
    rule4: 'Commentaires', rule4Desc: 'NON supportes en JSON standard', rule4Ex: 'Utilisez JSONC ou JSON5',
    rule5: 'Types de donnees', rule5Desc: 'string, number, boolean, null, object, array', rule5Ex: '{"str":"hi","num":42}',
    faqTitle: 'Questions frequentes',
    faq1q: "Qu'est-ce que l'embellissement JSON ?", faq1a: "L'embellissement JSON ajoute une indentation et des sauts de ligne au JSON compact pour le rendre lisible et facile a comprendre.",
    faq2q: 'Quelle difference entre embellisseur et formateur JSON ?', faq2a: 'Les deux termes designent essentiellement la meme chose : rendre le JSON lisible avec une indentation appropriee.',
    faq3q: 'Comment formater le JSON dans le code ?', faq3a: 'En JavaScript : JSON.stringify(data, null, 2). En Python : json.dumps(data, indent=2).',
    relatedTitle: 'Outils JSON connexes',
  },
  de: {
    title: 'JSON Beautifier',
    description: 'JSON-Daten online verschoenern und formatieren. Fuegen Sie Ihr komprimiertes JSON ein und erhalten Sie eine lesbare, eingerueckte Ausgabe.',
    inputLabel: 'JSON-Eingabe',
    inputPlaceholder: 'JSON hier einfuegen...',
    outputLabel: 'Formatiertes JSON',
    outputPlaceholder: 'Formatiertes JSON erscheint hier...',
    beautifyBtn: 'Verschoenern',
    clear: 'Loeschen',
    loadSample: 'Beispiel laden',
    indent: 'Einrueckung',
    spaces: 'Leerzeichen',
    tab: 'Tab',
    error: 'Fehler',
    introTitle: 'Online JSON Beautifier',
    introText: 'Dieses kostenlose Tool formatiert JSON mit anpassbarer Einrueckung. Verschoenern Sie API-Antworten, Konfigurationsdateien oder kompaktes JSON.',
    cheatTitle: 'JSON-Formatierungsregeln',
    ruleCol: 'Regel', descCol: 'Beschreibung', exampleCol: 'Beispiel',
    rule1: 'Einrueckung', rule1Desc: 'Konsistente Leerzeichen oder Tabs', rule1Ex: '2 oder 4 Leerzeichen, oder 1 Tab',
    rule2: 'Abschliessendes Komma', rule2Desc: 'NICHT erlaubt nach letztem Element', rule2Ex: '{"a":1, "b":2}',
    rule3: 'Anfuehrungszeichen', rule3Desc: 'Schluessel und Strings in doppelten Anfuehrungszeichen', rule3Ex: '{"key": "value"}',
    rule4: 'Kommentare', rule4Desc: 'NICHT unterstuetzt in Standard-JSON', rule4Ex: 'JSONC oder JSON5 verwenden',
    rule5: 'Datentypen', rule5Desc: 'string, number, boolean, null, object, array', rule5Ex: '{"str":"hi","num":42}',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist JSON-Verschoenerung?', faq1a: 'JSON-Verschoenerung fuegt Einrueckungen und Zeilenumbrueche hinzu, um kompaktes JSON lesbar zu machen.',
    faq2q: 'Unterschied zwischen Beautifier und Formatter?', faq2a: 'Beide Begriffe bezeichnen im Wesentlichen dasselbe: JSON mit Einrueckung lesbar machen.',
    faq3q: 'Wie formatiert man JSON im Code?', faq3a: 'JavaScript: JSON.stringify(data, null, 2). Python: json.dumps(data, indent=2).',
    relatedTitle: 'Verwandte JSON-Tools',
  },
  es: {
    title: 'Embellecedor JSON',
    description: 'Embellece y formatea datos JSON en linea. Pega tu JSON minificado y obtiene una salida legible e indentada al instante.',
    inputLabel: 'Entrada JSON',
    inputPlaceholder: 'Pega tu JSON aqui...',
    outputLabel: 'JSON embellecido',
    outputPlaceholder: 'El JSON embellecido aparecera aqui...',
    beautifyBtn: 'Embellecer',
    clear: 'Limpiar',
    loadSample: 'Cargar ejemplo',
    indent: 'Indentacion',
    spaces: 'espacios',
    tab: 'Tab',
    error: 'Error',
    introTitle: 'Embellecedor JSON en linea',
    introText: 'Esta herramienta gratuita formatea JSON con indentacion personalizable. Embellece respuestas de API, archivos de configuracion o cualquier JSON compacto.',
    cheatTitle: 'Reglas de formato JSON',
    ruleCol: 'Regla', descCol: 'Descripcion', exampleCol: 'Ejemplo',
    rule1: 'Indentacion', rule1Desc: 'Espacios o tabulaciones consistentes', rule1Ex: '2 o 4 espacios, o 1 tab',
    rule2: 'Coma final', rule2Desc: 'NO permitida tras el ultimo elemento', rule2Ex: '{"a":1, "b":2}',
    rule3: 'Comillas', rule3Desc: 'Claves y cadenas en comillas dobles', rule3Ex: '{"key": "value"}',
    rule4: 'Comentarios', rule4Desc: 'NO soportados en JSON estandar', rule4Ex: 'Use JSONC o JSON5',
    rule5: 'Tipos de datos', rule5Desc: 'string, number, boolean, null, object, array', rule5Ex: '{"str":"hi","num":42}',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es el embellecimiento JSON?', faq1a: 'El embellecimiento JSON agrega indentacion y saltos de linea al JSON compacto para hacerlo legible.',
    faq2q: 'Diferencia entre embellecedor y formateador JSON?', faq2a: 'Ambos terminos se refieren esencialmente a lo mismo: hacer JSON legible con indentacion.',
    faq3q: 'Como formatear JSON en codigo?', faq3a: 'JavaScript: JSON.stringify(data, null, 2). Python: json.dumps(data, indent=2).',
    relatedTitle: 'Herramientas JSON relacionadas',
  },
  ja: {
    title: 'JSON 整形ツール',
    description: 'JSON データをオンラインで整形・フォーマット。圧縮された JSON を貼り付けて、読みやすいインデント付き出力を即座に取得。',
    inputLabel: 'JSON 入力',
    inputPlaceholder: '整形する JSON をここに貼り付け...',
    outputLabel: '整形された JSON',
    outputPlaceholder: '整形された JSON がここに表示されます...',
    beautifyBtn: '整形',
    clear: 'クリア',
    loadSample: 'サンプル読込',
    indent: 'インデント',
    spaces: 'スペース',
    tab: 'タブ',
    error: 'エラー',
    introTitle: 'オンライン JSON 整形ツール',
    introText: 'この無料ツールでカスタマイズ可能なインデントで JSON を整形できます。API レスポンス、設定ファイル、コンパクトな JSON を美しく整形します。',
    cheatTitle: 'JSON フォーマットルール',
    ruleCol: 'ルール', descCol: '説明', exampleCol: '例',
    rule1: 'インデント', rule1Desc: '一貫したスペースまたはタブ', rule1Ex: '2 または 4 スペース、または 1 タブ',
    rule2: '末尾カンマ', rule2Desc: '最後の要素の後は不可', rule2Ex: '{"a":1, "b":2}',
    rule3: '引用符', rule3Desc: 'キーと文字列はダブルクォート', rule3Ex: '{"key": "value"}',
    rule4: 'コメント', rule4Desc: '標準 JSON では非対応', rule4Ex: 'JSONC または JSON5 を使用',
    rule5: 'データ型', rule5Desc: 'string, number, boolean, null, object, array', rule5Ex: '{"str":"hi","num":42}',
    faqTitle: 'よくある質問',
    faq1q: 'JSON 整形とは？', faq1a: 'JSON 整形はコンパクトな JSON にインデントと改行を追加して読みやすくするプロセスです。',
    faq2q: 'JSON 整形ツールとフォーマッターの違いは？', faq2a: '両方とも本質的に同じで、JSON にインデントを追加して読みやすくします。',
    faq3q: 'コードで JSON を整形するには？', faq3a: 'JavaScript: JSON.stringify(data, null, 2)。Python: json.dumps(data, indent=2)。',
    relatedTitle: '関連 JSON ツール',
  },
  ko: {
    title: 'JSON 뷰티파이어',
    description: 'JSON 데이터를 온라인에서 정리하고 포맷하세요. 압축된 JSON을 붙여넣으면 읽기 쉬운 들여쓰기된 출력을 즉시 얻을 수 있습니다.',
    inputLabel: 'JSON 입력',
    inputPlaceholder: '정리할 JSON을 여기에 붙여넣기...',
    outputLabel: '정리된 JSON',
    outputPlaceholder: '정리된 JSON이 여기에 표시됩니다...',
    beautifyBtn: '정리',
    clear: '지우기',
    loadSample: '샘플 로드',
    indent: '들여쓰기',
    spaces: '스페이스',
    tab: '탭',
    error: '오류',
    introTitle: '온라인 JSON 뷰티파이어',
    introText: '이 무료 도구로 사용자 정의 들여쓰기로 JSON을 정리할 수 있습니다. API 응답, 설정 파일 또는 압축된 JSON을 보기 좋게 정리하세요.',
    cheatTitle: 'JSON 포맷 규칙',
    ruleCol: '규칙', descCol: '설명', exampleCol: '예시',
    rule1: '들여쓰기', rule1Desc: '일관된 스페이스 또는 탭', rule1Ex: '2 또는 4 스페이스, 또는 1 탭',
    rule2: '후행 쉼표', rule2Desc: '마지막 항목 뒤 불가', rule2Ex: '{"a":1, "b":2}',
    rule3: '따옴표', rule3Desc: '키와 문자열은 큰따옴표', rule3Ex: '{"key": "value"}',
    rule4: '주석', rule4Desc: '표준 JSON에서 미지원', rule4Ex: 'JSONC 또는 JSON5 사용',
    rule5: '데이터 타입', rule5Desc: 'string, number, boolean, null, object, array', rule5Ex: '{"str":"hi","num":42}',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON 뷰티파이란?', faq1a: 'JSON 뷰티파이는 압축된 JSON에 들여쓰기와 줄바꿈을 추가하여 읽기 쉽게 만드는 과정입니다.',
    faq2q: 'JSON 뷰티파이어와 포맷터의 차이점은?', faq2a: '둘 다 본질적으로 같은 것으로, JSON에 들여쓰기를 추가하여 읽기 쉽게 만듭니다.',
    faq3q: '코드에서 JSON을 정리하는 방법은?', faq3a: 'JavaScript: JSON.stringify(data, null, 2). Python: json.dumps(data, indent=2).',
    relatedTitle: '관련 JSON 도구',
  },
};

export default function JsonBeautifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState<string>('2');

  const beautify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const indentVal = indent === 'tab' ? '\t' : Number(indent);
      setOutput(JSON.stringify(parsed, null, indentVal));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput('{"name":"DevToolBox","version":"2.0","features":["JSON Beautifier","JSON Validator","JSON Minifier"],"config":{"theme":"dark","language":"en","debug":false},"stats":{"users":15000,"tools":106},"active":true}');
    setOutput('');
    setError('');
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
    <ToolLayout title={t.title} description={t.description} toolId="json-beautifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={beautify} className="btn btn-primary">{t.beautifyBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select
            value={indent}
            onChange={e => setIndent(e.target.value)}
            style={{ width: 100, padding: '4px 8px', fontSize: 12 }}
          >
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
          </select>
        </div>
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
          {t.error}: {error}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
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
            { href: `/${lang}/tools/json-validator`, label: 'JSON Validator' },
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
