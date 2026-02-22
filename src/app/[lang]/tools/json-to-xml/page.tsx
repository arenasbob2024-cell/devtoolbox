'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON to XML Converter Online',
    description: 'Convert JSON to XML online. Paste JSON data and get well-formatted XML output with customizable indentation options.',
    inputLabel: 'JSON Input',
    inputPlaceholder: 'Paste your JSON here...',
    outputLabel: 'XML Output',
    outputPlaceholder: 'XML output will appear here...',
    convertBtn: 'Convert to XML',
    clear: 'Clear',
    loadSample: 'Load Sample',
    rootTag: 'Root Tag',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    xmlDecl: 'XML Declaration',
    error: 'Error',
    introTitle: 'Free Online JSON to XML Converter',
    introText: 'Transform JSON data into well-formatted XML with this free online converter. Supports nested objects, arrays, custom root element names, and configurable indentation. Ideal for API integration, data migration between systems, and converting REST API responses to SOAP format.',
    cheatTitle: 'JSON to XML Conversion Rules',
    ruleCol: 'JSON Type', descCol: 'XML Output', exampleCol: 'Example',
    rule1: 'Object', rule1Desc: 'Each key becomes an XML element', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: 'Array', rule2Desc: 'Each item wrapped in <item> tags', rule2Ex: '[1,2] -> <item>1</item><item>2</item>',
    rule3: 'String', rule3Desc: 'Text content inside element', rule3Ex: '"hello" -> hello',
    rule4: 'Number/Boolean', rule4Desc: 'Value as text content', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: 'Self-closing empty element', rule5Ex: 'null -> <key/>',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does JSON to XML conversion work?',
    faq1a: 'JSON objects are converted to XML elements where each key becomes an element name and its value becomes the content. Arrays are wrapped in repeating elements. Nested structures are preserved through nested XML elements.',
    faq2q: 'What happens to JSON arrays in XML?',
    faq2a: 'JSON arrays are converted to repeating XML elements. Each array item is wrapped in an <item> element by default. Nested arrays create nested repeating elements in the XML output.',
    faq3q: 'Can I customize the root element name?',
    faq3a: 'Yes, you can specify a custom root element name using the Root Tag option. The default root element is "root". This is useful when you need specific XML schema compliance.',
    faq4q: 'Is the XML output valid and well-formed?',
    faq4a: 'Yes, the converter produces well-formed XML with proper nesting, escaping of special characters (like &, <, >), and optional XML declaration. The output conforms to XML 1.0 specification.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'JSON 转 XML 在线转换器',
    description: '在线将 JSON 数据转换为 XML。粘贴 JSON 数据，获取格式良好的 XML 输出。',
    inputLabel: 'JSON 输入',
    inputPlaceholder: '在此粘贴 JSON...',
    outputLabel: 'XML 输出',
    outputPlaceholder: 'XML 输出将显示在此...',
    convertBtn: '转换为 XML',
    clear: '清除',
    loadSample: '加载示例',
    rootTag: '根标签',
    indent: '缩进',
    spaces: '空格',
    tab: '制表符',
    xmlDecl: 'XML 声明',
    error: '错误',
    introTitle: '免费在线 JSON 转 XML 转换器',
    introText: '使用此免费在线转换器将 JSON 数据转换为格式良好的 XML。支持嵌套对象、数组、自定义根元素名称和可配置缩进。',
    cheatTitle: 'JSON 转 XML 转换规则',
    ruleCol: 'JSON 类型', descCol: 'XML 输出', exampleCol: '示例',
    rule1: '对象', rule1Desc: '每个键变为 XML 元素', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: '数组', rule2Desc: '每项包装在 <item> 标签中', rule2Ex: '[1,2] -> <item>1</item><item>2</item>',
    rule3: '字符串', rule3Desc: '元素内的文本内容', rule3Ex: '"hello" -> hello',
    rule4: '数字/布尔', rule4Desc: '值作为文本内容', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: '自闭合空元素', rule5Ex: 'null -> <key/>',
    faqTitle: '常见问题',
    faq1q: 'JSON 转 XML 转换如何工作？',
    faq1a: 'JSON 对象被转换为 XML 元素，每个键成为元素名称，其值成为内容。数组被包装在重复元素中。嵌套结构通过嵌套 XML 元素保留。',
    faq2q: 'JSON 数组在 XML 中会怎样？',
    faq2a: 'JSON 数组被转换为重复的 XML 元素。默认情况下，每个数组项包装在 <item> 元素中。',
    faq3q: '可以自定义根元素名称吗？',
    faq3a: '是的，您可以使用根标签选项指定自定义根元素名称。默认根元素为 "root"。',
    faq4q: 'XML 输出是否有效且格式良好？',
    faq4a: '是的，转换器生成格式良好的 XML，包括正确的嵌套、特殊字符转义和可选的 XML 声明。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur JSON vers XML en Ligne',
    description: 'Convertissez JSON en XML en ligne. Collez vos donnees JSON et obtenez un XML bien formate.',
    inputLabel: 'Entree JSON', inputPlaceholder: 'Collez votre JSON ici...',
    outputLabel: 'Sortie XML', outputPlaceholder: 'Le XML apparaitra ici...',
    convertBtn: 'Convertir en XML', clear: 'Effacer', loadSample: 'Charger un exemple',
    rootTag: 'Balise racine', indent: 'Indentation', spaces: 'espaces', tab: 'Tab', xmlDecl: 'Declaration XML', error: 'Erreur',
    introTitle: 'Convertisseur JSON vers XML gratuit', introText: 'Transformez les donnees JSON en XML bien formate. Supporte les objets imbriques, tableaux et indentation configurable.',
    cheatTitle: 'Regles de conversion', ruleCol: 'Type JSON', descCol: 'Sortie XML', exampleCol: 'Exemple',
    rule1: 'Objet', rule1Desc: 'Chaque cle devient un element XML', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: 'Tableau', rule2Desc: 'Chaque element dans des balises <item>', rule2Ex: '[1,2] -> <item>1</item>',
    rule3: 'Chaine', rule3Desc: 'Contenu texte dans l\'element', rule3Ex: '"hello" -> hello',
    rule4: 'Nombre/Booleen', rule4Desc: 'Valeur comme contenu texte', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: 'Element vide auto-fermant', rule5Ex: 'null -> <key/>',
    faqTitle: 'Questions frequentes',
    faq1q: 'Comment fonctionne la conversion JSON vers XML ?', faq1a: 'Les objets JSON sont convertis en elements XML ou chaque cle devient un nom d\'element.',
    faq2q: 'Que deviennent les tableaux JSON en XML ?', faq2a: 'Les tableaux JSON sont convertis en elements XML repetitifs enveloppes dans des balises <item>.',
    faq3q: 'Peut-on personnaliser le nom de l\'element racine ?', faq3a: 'Oui, utilisez l\'option Balise racine pour specifier un nom personnalise.',
    faq4q: 'Le XML genere est-il valide ?', faq4a: 'Oui, le convertisseur produit du XML bien forme avec un echappement correct des caracteres speciaux.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'JSON zu XML Konverter Online',
    description: 'JSON-Daten online in XML umwandeln. JSON einfuegen und gut formatiertes XML erhalten.',
    inputLabel: 'JSON-Eingabe', inputPlaceholder: 'JSON hier einfuegen...',
    outputLabel: 'XML-Ausgabe', outputPlaceholder: 'XML-Ausgabe erscheint hier...',
    convertBtn: 'In XML umwandeln', clear: 'Loeschen', loadSample: 'Beispiel laden',
    rootTag: 'Wurzel-Tag', indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', xmlDecl: 'XML-Deklaration', error: 'Fehler',
    introTitle: 'Kostenloser JSON zu XML Konverter', introText: 'JSON-Daten in gut formatiertes XML umwandeln. Unterstuetzt verschachtelte Objekte, Arrays und konfigurierbare Einrueckung.',
    cheatTitle: 'Konvertierungsregeln', ruleCol: 'JSON-Typ', descCol: 'XML-Ausgabe', exampleCol: 'Beispiel',
    rule1: 'Objekt', rule1Desc: 'Jeder Schluessel wird ein XML-Element', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: 'Array', rule2Desc: 'Jedes Element in <item>-Tags', rule2Ex: '[1,2] -> <item>1</item>',
    rule3: 'String', rule3Desc: 'Textinhalt im Element', rule3Ex: '"hello" -> hello',
    rule4: 'Zahl/Boolean', rule4Desc: 'Wert als Textinhalt', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: 'Selbstschliessendes leeres Element', rule5Ex: 'null -> <key/>',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Wie funktioniert die JSON-zu-XML-Konvertierung?', faq1a: 'JSON-Objekte werden in XML-Elemente umgewandelt, wobei jeder Schluessel zu einem Elementnamen wird.',
    faq2q: 'Was passiert mit JSON-Arrays in XML?', faq2a: 'JSON-Arrays werden in wiederholende XML-Elemente mit <item>-Tags umgewandelt.',
    faq3q: 'Kann man den Wurzelelementnamen anpassen?', faq3a: 'Ja, verwenden Sie die Wurzel-Tag-Option fuer einen benutzerdefinierten Namen.',
    faq4q: 'Ist die XML-Ausgabe gueltig?', faq4a: 'Ja, der Konverter erzeugt wohlgeformtes XML mit korrektem Escaping.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor JSON a XML en Linea',
    description: 'Convierta JSON a XML en linea. Pegue datos JSON y obtenga XML bien formateado.',
    inputLabel: 'Entrada JSON', inputPlaceholder: 'Pegue su JSON aqui...',
    outputLabel: 'Salida XML', outputPlaceholder: 'El XML aparecera aqui...',
    convertBtn: 'Convertir a XML', clear: 'Limpiar', loadSample: 'Cargar ejemplo',
    rootTag: 'Etiqueta raiz', indent: 'Indentacion', spaces: 'espacios', tab: 'Tab', xmlDecl: 'Declaracion XML', error: 'Error',
    introTitle: 'Convertidor JSON a XML gratuito', introText: 'Transforme datos JSON en XML bien formateado. Soporta objetos anidados, arrays e indentacion configurable.',
    cheatTitle: 'Reglas de conversion', ruleCol: 'Tipo JSON', descCol: 'Salida XML', exampleCol: 'Ejemplo',
    rule1: 'Objeto', rule1Desc: 'Cada clave se convierte en elemento XML', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: 'Array', rule2Desc: 'Cada elemento en etiquetas <item>', rule2Ex: '[1,2] -> <item>1</item>',
    rule3: 'Cadena', rule3Desc: 'Contenido de texto dentro del elemento', rule3Ex: '"hello" -> hello',
    rule4: 'Numero/Booleano', rule4Desc: 'Valor como contenido de texto', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: 'Elemento vacio auto-cerrado', rule5Ex: 'null -> <key/>',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Como funciona la conversion JSON a XML?', faq1a: 'Los objetos JSON se convierten en elementos XML donde cada clave se convierte en nombre de elemento.',
    faq2q: 'Que sucede con los arrays JSON en XML?', faq2a: 'Los arrays JSON se convierten en elementos XML repetitivos envueltos en etiquetas <item>.',
    faq3q: 'Se puede personalizar el nombre del elemento raiz?', faq3a: 'Si, use la opcion Etiqueta raiz para especificar un nombre personalizado.',
    faq4q: 'Es valido el XML generado?', faq4a: 'Si, el convertidor produce XML bien formado con escapado correcto de caracteres especiales.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'JSON から XML コンバーター オンライン',
    description: 'JSON データを XML にオンラインで変換。JSON データを貼り付けて、整形された XML を取得。',
    inputLabel: 'JSON 入力', inputPlaceholder: 'JSON を貼り付け...',
    outputLabel: 'XML 出力', outputPlaceholder: 'XML 出力がここに表示...',
    convertBtn: 'XML に変換', clear: 'クリア', loadSample: 'サンプル読込',
    rootTag: 'ルートタグ', indent: 'インデント', spaces: 'スペース', tab: 'タブ', xmlDecl: 'XML 宣言', error: 'エラー',
    introTitle: '無料オンライン JSON から XML コンバーター', introText: 'JSON データを整形された XML に変換します。ネストされたオブジェクト、配列、カスタムルート要素名をサポート。',
    cheatTitle: '変換ルール', ruleCol: 'JSON 型', descCol: 'XML 出力', exampleCol: '例',
    rule1: 'オブジェクト', rule1Desc: '各キーが XML 要素になる', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: '配列', rule2Desc: '各項目を <item> タグで囲む', rule2Ex: '[1,2] -> <item>1</item>',
    rule3: '文字列', rule3Desc: '要素内のテキストコンテンツ', rule3Ex: '"hello" -> hello',
    rule4: '数値/ブール', rule4Desc: '値をテキストコンテンツとして', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: '自己閉じ空要素', rule5Ex: 'null -> <key/>',
    faqTitle: 'よくある質問',
    faq1q: 'JSON から XML への変換はどのように機能しますか？', faq1a: 'JSON オブジェクトは XML 要素に変換され、各キーが要素名になります。',
    faq2q: 'JSON 配列は XML でどうなりますか？', faq2a: 'JSON 配列は <item> タグで囲まれた繰り返し XML 要素に変換されます。',
    faq3q: 'ルート要素名をカスタマイズできますか？', faq3a: 'はい、ルートタグオプションでカスタム名を指定できます。',
    faq4q: 'XML 出力は有効ですか？', faq4a: 'はい、特殊文字の適切なエスケープを含む整形された XML を生成します。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'JSON to XML 변환기 온라인',
    description: 'JSON 데이터를 XML로 온라인에서 변환. JSON을 붙여넣고 잘 포맷된 XML을 받으세요.',
    inputLabel: 'JSON 입력', inputPlaceholder: 'JSON을 여기에 붙여넣기...',
    outputLabel: 'XML 출력', outputPlaceholder: 'XML 출력이 여기에 표시...',
    convertBtn: 'XML로 변환', clear: '지우기', loadSample: '샘플 로드',
    rootTag: '루트 태그', indent: '들여쓰기', spaces: '스페이스', tab: '탭', xmlDecl: 'XML 선언', error: '오류',
    introTitle: '무료 온라인 JSON to XML 변환기', introText: 'JSON 데이터를 잘 포맷된 XML로 변환합니다. 중첩 객체, 배열, 사용자 정의 루트 요소 이름을 지원합니다.',
    cheatTitle: '변환 규칙', ruleCol: 'JSON 타입', descCol: 'XML 출력', exampleCol: '예시',
    rule1: '객체', rule1Desc: '각 키가 XML 요소가 됨', rule1Ex: '{"name":"John"} -> <name>John</name>',
    rule2: '배열', rule2Desc: '각 항목을 <item> 태그로 감싸기', rule2Ex: '[1,2] -> <item>1</item>',
    rule3: '문자열', rule3Desc: '요소 내 텍스트 콘텐츠', rule3Ex: '"hello" -> hello',
    rule4: '숫자/부울', rule4Desc: '값을 텍스트 콘텐츠로', rule4Ex: 'true -> true',
    rule5: 'Null', rule5Desc: '자체 닫힘 빈 요소', rule5Ex: 'null -> <key/>',
    faqTitle: '자주 묻는 질문',
    faq1q: 'JSON에서 XML 변환은 어떻게 작동하나요?', faq1a: 'JSON 객체는 XML 요소로 변환되며 각 키가 요소 이름이 됩니다.',
    faq2q: 'JSON 배열은 XML에서 어떻게 되나요?', faq2a: 'JSON 배열은 <item> 태그로 감싸진 반복 XML 요소로 변환됩니다.',
    faq3q: '루트 요소 이름을 커스터마이즈할 수 있나요?', faq3a: '네, 루트 태그 옵션으로 사용자 정의 이름을 지정할 수 있습니다.',
    faq4q: 'XML 출력이 유효한가요?', faq4a: '네, 특수 문자의 적절한 이스케이프를 포함한 잘 형성된 XML을 생성합니다.',
    relatedTitle: '관련 도구',
  },
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function jsonToXml(obj: unknown, indent: string, level: number, tagName: string): string {
  const pad = indent.repeat(level);
  const pad1 = indent.repeat(level + 1);

  if (obj === null || obj === undefined) {
    return `${pad}<${tagName}/>\n`;
  }

  if (typeof obj === 'string') {
    return `${pad}<${tagName}>${escapeXml(obj)}</${tagName}>\n`;
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return `${pad}<${tagName}>${String(obj)}</${tagName}>\n`;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return `${pad}<${tagName}/>\n`;
    return obj.map(item => jsonToXml(item, indent, level, 'item')).join('');
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return `${pad}<${tagName}/>\n`;
    let xml = `${pad}<${tagName}>\n`;
    for (const [key, val] of entries) {
      const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
      if (Array.isArray(val)) {
        xml += `${pad1}<${safeKey}>\n`;
        for (const item of val) {
          xml += jsonToXml(item, indent, level + 2, 'item');
        }
        xml += `${pad1}</${safeKey}>\n`;
      } else {
        xml += jsonToXml(val, indent, level + 1, safeKey);
      }
    }
    xml += `${pad}</${tagName}>\n`;
    return xml;
  }

  return '';
}

export default function JsonToXml() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootTag, setRootTag] = useState('root');
  const [indentSize, setIndentSize] = useState('2');
  const [xmlDecl, setXmlDecl] = useState(true);

  const convert = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const indent = indentSize === 'tab' ? '\t' : ' '.repeat(Number(indentSize));
      let xml = xmlDecl ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '';
      xml += jsonToXml(parsed, indent, 0, rootTag);
      setOutput(xml.trimEnd());
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      employees: [
        { name: "Alice", role: "Engineer", skills: ["JavaScript", "TypeScript"] },
        { name: "Bob", role: "Designer", skills: ["Figma", "CSS"] }
      ],
      company: { name: "DevToolBox", founded: 2024, active: true },
      metadata: null
    }, null, 2));
    setOutput(''); setError('');
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
    <ToolLayout title={t.title} description={t.description} toolId="json-to-xml">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <input type="checkbox" checked={xmlDecl} onChange={e => setXmlDecl(e.target.checked)} />
            {t.xmlDecl}
          </label>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.rootTag}:</label>
          <input value={rootTag} onChange={e => setRootTag(e.target.value)} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indent}:</label>
          <select value={indentSize} onChange={e => setIndentSize(e.target.value)} style={{ width: 100, padding: '4px 8px', fontSize: 12 }}>
            <option value="2">2 {t.spaces}</option>
            <option value="4">4 {t.spaces}</option>
            <option value="tab">{t.tab}</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          {t.error}: {error}
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
            { href: `/${lang}/tools/xml-to-json`, label: 'XML to JSON' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
            { href: `/${lang}/tools/xml-formatter`, label: 'XML Formatter' },
            { href: `/${lang}/tools/json-yaml`, label: 'JSON to YAML' },
            { href: `/${lang}/tools/json-to-csv`, label: 'JSON to CSV' },
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
