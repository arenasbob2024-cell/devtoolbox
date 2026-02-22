'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: { title: 'HTML to React Component Converter', description: 'Convert HTML to React JSX components. Transforms class to className, for to htmlFor, style strings to objects, and more. Free, browser-based.', inputLabel: 'Input (HTML)', outputLabel: 'Output (React JSX)', placeholder: 'Paste HTML here...\n\nExample:\n<div class="container">\n  <label for="name">Name</label>\n  <input type="text" tabindex="1" />\n  <p style="color: red; font-size: 14px;">Hello</p>\n</div>', convert: 'Convert to React', clear: 'Clear', copyLabel: 'Copy', introTitle: 'Free HTML to React Component Converter', introText: 'Paste your HTML and instantly convert it to valid React JSX. Automatically handles class to className, for to htmlFor, inline style strings to style objects, and self-closing tags. Perfect for migrating templates to React components.', howTitle: 'How to Use', step1: 'Paste your HTML into the input area', step2: 'Click Convert to React to transform to JSX', step3: 'Copy the React component code into your project', featuresTitle: 'Features', feature1: 'Converts class to className and for to htmlFor', feature2: 'Transforms inline style strings to React style objects', feature3: 'Handles self-closing tags (img, br, hr, input)', feature4: 'Converts tabindex, readonly, maxlength to camelCase', feature5: 'Wraps output in a functional React component', faqTitle: 'FAQ', faq1q: 'What HTML attributes are converted?', faq1a: 'The tool converts class to className, for to htmlFor, tabindex to tabIndex, readonly to readOnly, maxlength to maxLength, cellpadding to cellPadding, cellspacing to cellSpacing, and more.', faq2q: 'How are inline styles handled?', faq2a: 'Inline style strings like style="color: red; font-size: 14px" are converted to React style objects like style={{ color: "red", fontSize: "14px" }}, with CSS properties converted to camelCase.', faq3q: 'Does it handle event handlers?', faq3a: 'The tool converts HTML event attribute names (onclick, onchange) to React conventions (onClick, onChange). However, inline JS event handler code is preserved as-is and may need manual adjustment.', faq4q: 'Is my HTML sent to a server?', faq4a: 'No. All conversion happens locally in your browser using JavaScript string transformations. Nothing is sent to any server.', faq5q: 'Will the output work directly in React?', faq5a: 'In most cases, yes. The output is a valid React functional component. Complex HTML with embedded scripts or non-standard attributes may need minor manual adjustments.', relatedTitle: 'Related Tools', errorEmpty: 'Please enter HTML to convert.' },
  zh: { title: 'HTML 转 React 组件', description: '将 HTML 转换为 React JSX。自动处理 class、style 等。', inputLabel: '输入 (HTML)', outputLabel: '输出 (React JSX)', placeholder: '粘贴 HTML...', convert: '转换', clear: '清除', copyLabel: '复制', introTitle: 'HTML 转 React 转换器', introText: '粘贴 HTML，自动转换为 React JSX 组件。', howTitle: '使用方法', step1: '粘贴 HTML', step2: '点击转换', step3: '复制 React 代码', featuresTitle: '功能', feature1: 'class 转 className', feature2: 'style 字符串转对象', feature3: '自闭合标签处理', feature4: '属性名驼峰化', feature5: '包装为函数组件', faqTitle: '常见问题', faq1q: '转换哪些属性？', faq1a: 'class、for、tabindex、readonly 等。', faq2q: '如何处理内联样式？', faq2a: '转换为 React style 对象和驼峰命名。', faq3q: '处理事件吗？', faq3a: '转换事件属性名为驼峰。', faq4q: '数据安全吗？', faq4a: '完全在浏览器内处理。', faq5q: '输出能直接用吗？', faq5a: '大多数情况可以直接使用。', relatedTitle: '相关工具', errorEmpty: '请输入 HTML。' },
  ja: { title: 'HTML to React 変換', description: 'HTML を React JSX に変換。無料。', inputLabel: '入力 (HTML)', outputLabel: '出力 (React)', placeholder: 'HTML を貼り付け...', convert: '変換', clear: 'クリア', copyLabel: 'コピー', introTitle: 'HTML to React 変換ツール', introText: 'HTML を貼り付けて React JSX に変換。', howTitle: '使い方', step1: 'HTML を貼り付け', step2: '変換をクリック', step3: 'React コードをコピー', featuresTitle: '機能', feature1: 'class を className に', feature2: 'style を対象に変換', feature3: '自己終了タグ', feature4: 'キャメルケース変換', feature5: '関数コンポーネント', faqTitle: 'FAQ', faq1q: 'どの属性が変換？', faq1a: 'class、for、tabindex など。', faq2q: 'インラインスタイルは？', faq2a: 'React style オブジェクトに変換。', faq3q: 'イベントは？', faq3a: 'キャメルケースに変換。', faq4q: 'データは安全？', faq4a: 'ブラウザ内処理。', faq5q: '出力はそのまま使える？', faq5a: 'ほとんどの場合使えます。', relatedTitle: '関連ツール', errorEmpty: 'HTML を入力。' },
  ko: { title: 'HTML to React 변환기', description: 'HTML을 React JSX로 변환. 무료.', inputLabel: '입력 (HTML)', outputLabel: '출력 (React)', placeholder: 'HTML 붙여넣기...', convert: '변환', clear: '지우기', copyLabel: '복사', introTitle: 'HTML to React 변환기', introText: 'HTML을 붙여넣어 React JSX로 변환.', howTitle: '사용법', step1: 'HTML 붙여넣기', step2: '변환 클릭', step3: 'React 코드 복사', featuresTitle: '기능', feature1: 'class를 className으로', feature2: 'style 객체 변환', feature3: '자체 닫기 태그', feature4: '카멜케이스 변환', feature5: '함수 컴포넌트', faqTitle: 'FAQ', faq1q: '어떤 속성이 변환?', faq1a: 'class, for, tabindex 등.', faq2q: '인라인 스타일은?', faq2a: 'React style 객체로 변환.', faq3q: '이벤트는?', faq3a: '카멜케이스로 변환.', faq4q: '데이터 안전?', faq4a: '브라우저 내 처리.', faq5q: '출력 바로 사용?', faq5a: '대부분 가능.', relatedTitle: '관련 도구', errorEmpty: 'HTML 입력.' },
  fr: { title: 'Convertisseur HTML vers React', description: 'Convertir HTML en composants React JSX. Gratuit.', inputLabel: 'Entree (HTML)', outputLabel: 'Sortie (React)', placeholder: 'Collez du HTML...', convert: 'Convertir', clear: 'Effacer', copyLabel: 'Copier', introTitle: 'Convertisseur HTML vers React', introText: 'Collez votre HTML et convertissez en React JSX.', howTitle: 'Comment utiliser', step1: 'Collez le HTML', step2: 'Cliquez Convertir', step3: 'Copiez le code React', featuresTitle: 'Fonctionnalites', feature1: 'class vers className', feature2: 'style en objets', feature3: 'Balises auto-fermantes', feature4: 'Conversion camelCase', feature5: 'Composant fonctionnel', faqTitle: 'FAQ', faq1q: 'Quels attributs sont convertis ?', faq1a: 'class, for, tabindex, etc.', faq2q: 'Styles en ligne ?', faq2a: 'Convertis en objets React style.', faq3q: 'Evenements ?', faq3a: 'Convertis en camelCase.', faq4q: 'Donnees securisees ?', faq4a: 'Tout dans le navigateur.', faq5q: 'Sortie utilisable ?', faq5a: 'Dans la plupart des cas.', relatedTitle: 'Outils connexes', errorEmpty: 'Entrez du HTML.' },
  de: { title: 'HTML zu React Konverter', description: 'HTML in React JSX umwandeln. Kostenlos.', inputLabel: 'Eingabe (HTML)', outputLabel: 'Ausgabe (React)', placeholder: 'HTML einfuegen...', convert: 'Konvertieren', clear: 'Leeren', copyLabel: 'Kopieren', introTitle: 'HTML zu React Konverter', introText: 'HTML einfuegen und in React JSX umwandeln.', howTitle: 'Anleitung', step1: 'HTML einfuegen', step2: 'Konvertieren klicken', step3: 'React-Code kopieren', featuresTitle: 'Funktionen', feature1: 'class zu className', feature2: 'style zu Objekten', feature3: 'Selbstschliessende Tags', feature4: 'CamelCase-Konvertierung', feature5: 'Funktionskomponente', faqTitle: 'FAQ', faq1q: 'Welche Attribute?', faq1a: 'class, for, tabindex usw.', faq2q: 'Inline-Styles?', faq2a: 'In React-Style-Objekte.', faq3q: 'Events?', faq3a: 'CamelCase-Konvertierung.', faq4q: 'Daten sicher?', faq4a: 'Im Browser.', faq5q: 'Ausgabe nutzbar?', faq5a: 'Meistens ja.', relatedTitle: 'Verwandte Tools', errorEmpty: 'HTML eingeben.' },
  es: { title: 'Convertidor HTML a React', description: 'Convertir HTML a componentes React JSX. Gratis.', inputLabel: 'Entrada (HTML)', outputLabel: 'Salida (React)', placeholder: 'Pega HTML...', convert: 'Convertir', clear: 'Limpiar', copyLabel: 'Copiar', introTitle: 'Convertidor HTML a React', introText: 'Pega tu HTML y conviertelo a React JSX.', howTitle: 'Como usar', step1: 'Pega el HTML', step2: 'Clic en Convertir', step3: 'Copia el codigo React', featuresTitle: 'Caracteristicas', feature1: 'class a className', feature2: 'style a objetos', feature3: 'Etiquetas auto-cerradas', feature4: 'Conversion camelCase', feature5: 'Componente funcional', faqTitle: 'FAQ', faq1q: 'Que atributos se convierten?', faq1a: 'class, for, tabindex, etc.', faq2q: 'Estilos en linea?', faq2a: 'Convertidos a objetos React style.', faq3q: 'Eventos?', faq3a: 'Convertidos a camelCase.', faq4q: 'Datos seguros?', faq4a: 'En el navegador.', faq5q: 'Salida utilizable?', faq5a: 'En la mayoria de casos.', relatedTitle: 'Herramientas relacionadas', errorEmpty: 'Ingresa HTML.' },
  pt: { title: 'Conversor HTML para React', description: 'Converter HTML em componentes React JSX. Gratis.', inputLabel: 'Entrada (HTML)', outputLabel: 'Saida (React)', placeholder: 'Cole HTML...', convert: 'Converter', clear: 'Limpar', copyLabel: 'Copiar', introTitle: 'Conversor HTML para React', introText: 'Cole seu HTML e converta para React JSX.', howTitle: 'Como usar', step1: 'Cole o HTML', step2: 'Clique Converter', step3: 'Copie o codigo React', featuresTitle: 'Recursos', feature1: 'class para className', feature2: 'style para objetos', feature3: 'Tags auto-fechantes', feature4: 'Conversao camelCase', feature5: 'Componente funcional', faqTitle: 'FAQ', faq1q: 'Quais atributos?', faq1a: 'class, for, tabindex, etc.', faq2q: 'Estilos inline?', faq2a: 'Convertidos para objetos React style.', faq3q: 'Eventos?', faq3a: 'Convertidos para camelCase.', faq4q: 'Dados seguros?', faq4a: 'No navegador.', faq5q: 'Saida utilizavel?', faq5a: 'Na maioria dos casos.', relatedTitle: 'Ferramentas relacionadas', errorEmpty: 'Insira HTML.' },
  it: { title: 'Convertitore HTML a React', description: 'Convertire HTML in componenti React JSX. Gratuito.', inputLabel: 'Input (HTML)', outputLabel: 'Output (React)', placeholder: 'Incolla HTML...', convert: 'Converti', clear: 'Cancella', copyLabel: 'Copia', introTitle: 'Convertitore HTML a React', introText: 'Incolla HTML e convertilo in React JSX.', howTitle: 'Come usare', step1: 'Incolla HTML', step2: 'Clicca Converti', step3: 'Copia il codice React', featuresTitle: 'Funzionalita', feature1: 'class a className', feature2: 'style a oggetti', feature3: 'Tag auto-chiudenti', feature4: 'Conversione camelCase', feature5: 'Componente funzionale', faqTitle: 'FAQ', faq1q: 'Quali attributi?', faq1a: 'class, for, tabindex, ecc.', faq2q: 'Stili inline?', faq2a: 'Convertiti in oggetti React style.', faq3q: 'Eventi?', faq3a: 'Convertiti in camelCase.', faq4q: 'Dati sicuri?', faq4a: 'Nel browser.', faq5q: 'Output utilizzabile?', faq5a: 'Nella maggior parte dei casi.', relatedTitle: 'Strumenti correlati', errorEmpty: 'Inserisci HTML.' },
  nl: { title: 'HTML naar React Converter', description: 'HTML omzetten naar React JSX. Gratis.', inputLabel: 'Invoer (HTML)', outputLabel: 'Uitvoer (React)', placeholder: 'Plak HTML...', convert: 'Converteren', clear: 'Wissen', copyLabel: 'Kopieren', introTitle: 'HTML naar React Converter', introText: 'Plak HTML en converteer naar React JSX.', howTitle: 'Hoe te gebruiken', step1: 'Plak HTML', step2: 'Klik Converteren', step3: 'Kopieer React code', featuresTitle: 'Functies', feature1: 'class naar className', feature2: 'style naar objecten', feature3: 'Zelfsluitende tags', feature4: 'CamelCase conversie', feature5: 'Functioneel component', faqTitle: 'FAQ', faq1q: 'Welke attributen?', faq1a: 'class, for, tabindex, enz.', faq2q: 'Inline styles?', faq2a: 'Omgezet naar React style objecten.', faq3q: 'Events?', faq3a: 'Omgezet naar camelCase.', faq4q: 'Data veilig?', faq4a: 'In de browser.', faq5q: 'Output bruikbaar?', faq5a: 'In de meeste gevallen.', relatedTitle: 'Gerelateerde tools', errorEmpty: 'Voer HTML in.' },
  pl: { title: 'Konwerter HTML do React', description: 'Konwertuj HTML na React JSX. Darmowy.', inputLabel: 'Wejscie (HTML)', outputLabel: 'Wyjscie (React)', placeholder: 'Wklej HTML...', convert: 'Konwertuj', clear: 'Wyczysc', copyLabel: 'Kopiuj', introTitle: 'Konwerter HTML do React', introText: 'Wklej HTML i konwertuj na React JSX.', howTitle: 'Jak uzywac', step1: 'Wklej HTML', step2: 'Kliknij Konwertuj', step3: 'Skopiuj kod React', featuresTitle: 'Funkcje', feature1: 'class na className', feature2: 'style na obiekty', feature3: 'Samozamykajace tagi', feature4: 'Konwersja camelCase', feature5: 'Komponent funkcyjny', faqTitle: 'FAQ', faq1q: 'Jakie atrybuty?', faq1a: 'class, for, tabindex itp.', faq2q: 'Style inline?', faq2a: 'Konwertowane na obiekty React style.', faq3q: 'Eventy?', faq3a: 'Konwertowane na camelCase.', faq4q: 'Dane bezpieczne?', faq4a: 'W przegladarce.', faq5q: 'Wyjscie uzyteczne?', faq5a: 'W wiekszosci przypadkow.', relatedTitle: 'Powiazane narzedzia', errorEmpty: 'Wprowadz HTML.' },
  sv: { title: 'HTML till React Konverterare', description: 'Konvertera HTML till React JSX. Gratis.', inputLabel: 'Indata (HTML)', outputLabel: 'Utdata (React)', placeholder: 'Klistra in HTML...', convert: 'Konvertera', clear: 'Rensa', copyLabel: 'Kopiera', introTitle: 'HTML till React Konverterare', introText: 'Klistra in HTML och konvertera till React JSX.', howTitle: 'Hur man anvaender', step1: 'Klistra in HTML', step2: 'Klicka Konvertera', step3: 'Kopiera React-koden', featuresTitle: 'Funktioner', feature1: 'class till className', feature2: 'style till objekt', feature3: 'Sjaelvstaengande taggar', feature4: 'CamelCase-konvertering', feature5: 'Funktionskomponent', faqTitle: 'FAQ', faq1q: 'Vilka attribut?', faq1a: 'class, for, tabindex osv.', faq2q: 'Inline-stilar?', faq2a: 'Konverteras till React style-objekt.', faq3q: 'Events?', faq3a: 'Konverteras till camelCase.', faq4q: 'Data saekert?', faq4a: 'I webblaesaren.', faq5q: 'Utdata anvaendbart?', faq5a: 'I de flesta fall.', relatedTitle: 'Relaterade verktyg', errorEmpty: 'Ange HTML.' },
  no: { title: 'HTML til React Konverterer', description: 'Konverter HTML til React JSX. Gratis.', inputLabel: 'Inndata (HTML)', outputLabel: 'Utdata (React)', placeholder: 'Lim inn HTML...', convert: 'Konverter', clear: 'Toom', copyLabel: 'Kopier', introTitle: 'HTML til React Konverterer', introText: 'Lim inn HTML og konverter til React JSX.', howTitle: 'Slik bruker du', step1: 'Lim inn HTML', step2: 'Klikk Konverter', step3: 'Kopier React-koden', featuresTitle: 'Funksjoner', feature1: 'class til className', feature2: 'style til objekter', feature3: 'Selvlukkende tagger', feature4: 'CamelCase-konvertering', feature5: 'Funksjonskomponent', faqTitle: 'FAQ', faq1q: 'Hvilke attributter?', faq1a: 'class, for, tabindex osv.', faq2q: 'Inline-stiler?', faq2a: 'Konverteres til React style-objekter.', faq3q: 'Events?', faq3a: 'Konverteres til camelCase.', faq4q: 'Data trygt?', faq4a: 'I nettleseren.', faq5q: 'Utdata brukbart?', faq5a: 'I de fleste tilfeller.', relatedTitle: 'Relaterte verktoy', errorEmpty: 'Skriv inn HTML.' },
  id: { title: 'Konverter HTML ke React', description: 'Konversi HTML ke komponen React JSX. Gratis.', inputLabel: 'Input (HTML)', outputLabel: 'Output (React)', placeholder: 'Tempel HTML...', convert: 'Konversi', clear: 'Hapus', copyLabel: 'Salin', introTitle: 'Konverter HTML ke React', introText: 'Tempel HTML dan konversi ke React JSX.', howTitle: 'Cara menggunakan', step1: 'Tempel HTML', step2: 'Klik Konversi', step3: 'Salin kode React', featuresTitle: 'Fitur', feature1: 'class ke className', feature2: 'style ke objek', feature3: 'Tag self-closing', feature4: 'Konversi camelCase', feature5: 'Komponen fungsional', faqTitle: 'FAQ', faq1q: 'Atribut apa yang dikonversi?', faq1a: 'class, for, tabindex, dll.', faq2q: 'Style inline?', faq2a: 'Dikonversi ke objek React style.', faq3q: 'Event?', faq3a: 'Dikonversi ke camelCase.', faq4q: 'Data aman?', faq4a: 'Di browser.', faq5q: 'Output bisa digunakan?', faq5a: 'Kebanyakan bisa.', relatedTitle: 'Alat terkait', errorEmpty: 'Masukkan HTML.' },
  th: { title: 'แปลง HTML เป็น React', description: 'แปลง HTML เป็นคอมโพเนนต์ React JSX ฟรี', inputLabel: 'อินพุต (HTML)', outputLabel: 'เอาต์พุต (React)', placeholder: 'วาง HTML...', convert: 'แปลง', clear: 'ล้าง', copyLabel: 'คัดลอก', introTitle: 'ตัวแปลง HTML เป็น React', introText: 'วาง HTML และแปลงเป็น React JSX', howTitle: 'วิธีใช้', step1: 'วาง HTML', step2: 'คลิกแปลง', step3: 'คัดลอกโค้ด React', featuresTitle: 'คุณสมบัติ', feature1: 'class เป็น className', feature2: 'style เป็นออบเจ็กต์', feature3: 'แท็กปิดตัวเอง', feature4: 'แปลงเป็น camelCase', feature5: 'คอมโพเนนต์ฟังก์ชัน', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'แปลงแอตทริบิวต์อะไรบ้าง?', faq1a: 'class, for, tabindex เป็นต้น', faq2q: 'สไตล์อินไลน์?', faq2a: 'แปลงเป็นออบเจ็กต์ React style', faq3q: 'อีเวนต์?', faq3a: 'แปลงเป็น camelCase', faq4q: 'ข้อมูลปลอดภัยไหม?', faq4a: 'ในเบราว์เซอร์', faq5q: 'ผลลัพธ์ใช้ได้เลยไหม?', faq5a: 'ส่วนใหญ่ใช้ได้', relatedTitle: 'เครื่องมือที่เกี่ยวข้อง', errorEmpty: 'กรุณาป้อน HTML' },
};

function convertStyleString(style: string): string {
  const parts = style.split(';').filter(s => s.trim());
  const props = parts.map(part => {
    const [prop, ...valParts] = part.split(':');
    if (!prop || valParts.length === 0) return '';
    const cssProp = prop.trim();
    const val = valParts.join(':').trim();
    const camelProp = cssProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (/^\d+px$/.test(val)) {
      return `${camelProp}: ${parseInt(val)}`;
    }
    return `${camelProp}: "${val}"`;
  }).filter(Boolean);
  return `{{ ${props.join(', ')} }}`;
}

function htmlToReact(html: string): string {
  let jsx = html;

  const selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  selfClosing.forEach(tag => {
    const re = new RegExp(`<${tag}([^>]*?)\\s*/?>`, 'gi');
    jsx = jsx.replace(re, `<${tag}$1 />`);
  });

  const attrMap: Record<string, string> = {
    'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex',
    'readonly': 'readOnly', 'maxlength': 'maxLength', 'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing', 'colspan': 'colSpan', 'rowspan': 'rowSpan',
    'enctype': 'encType', 'formaction': 'formAction', 'novalidate': 'noValidate',
    'crossorigin': 'crossOrigin', 'autocomplete': 'autoComplete', 'autofocus': 'autoFocus',
    'autoplay': 'autoPlay', 'formnovalidate': 'formNoValidate',
    'onclick': 'onClick', 'onchange': 'onChange', 'onsubmit': 'onSubmit',
    'onfocus': 'onFocus', 'onblur': 'onBlur', 'onkeydown': 'onKeyDown',
    'onkeyup': 'onKeyUp', 'onmouseover': 'onMouseOver', 'onmouseout': 'onMouseOut',
  };

  Object.entries(attrMap).forEach(([htmlAttr, reactAttr]) => {
    const re = new RegExp(`\\b${htmlAttr}=`, 'g');
    jsx = jsx.replace(re, `${reactAttr}=`);
  });

  jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr) => {
    return `style=${convertStyleString(styleStr)}`;
  });
  jsx = jsx.replace(/style='([^']*)'/g, (_, styleStr) => {
    return `style=${convertStyleString(styleStr)}`;
  });

  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

  const componentName = 'MyComponent';
  return `export default function ${componentName}() {\n  return (\n    <>\n${jsx.split('\n').map(line => '      ' + line).join('\n')}\n    </>\n  );\n}`;
}

export default function HtmlToReactConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleConvert = useCallback(() => {
    setError('');
    if (!input.trim()) { setError(t.errorEmpty); setOutput(''); return; }
    try { setOutput(htmlToReact(input)); } catch (e) { setError(String(e)); setOutput(''); }
  }, [input, t]);

  const handleClear = useCallback(() => { setInput(''); setOutput(''); setError(''); }, []);

  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
    { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
    { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
    { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
    { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
  ]};

  return (
    <ToolLayout title={t.title} description={t.description} toolId="html-to-react">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleConvert} className="btn btn-primary" style={{ fontSize: 13 }}>{t.convert}</button>
        <button onClick={handleClear} className="btn btn-secondary" style={{ fontSize: 13 }}>{t.clear}</button>
      </div>
      {error && <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose,#f43f5e)' }}>{'\u2715'} {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label></div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}><label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label><CopyButton text={output} label={t.copyLabel} /></div>
          <textarea value={output} readOnly spellCheck={false} style={{ flex: 1, minHeight: 300, fontFamily: 'JetBrains Mono, Fira Code, monospace', fontSize: 12, lineHeight: 1.6, background: 'var(--bg-card)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>{t.introText}</p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.step1}</li><li>{t.step2}</li><li>{t.step3}</li></ol>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 20, marginBottom: 24 }}><li>{t.feature1}</li><li>{t.feature2}</li><li>{t.feature3}</li><li>{t.feature4}</li><li>{t.feature5}</li></ul>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {[{ q: t.faq1q, a: t.faq1a },{ q: t.faq2q, a: t.faq2a },{ q: t.faq3q, a: t.faq3a },{ q: t.faq4q, a: t.faq4a },{ q: t.faq5q, a: t.faq5a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', userSelect: 'none' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{t.relatedTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[{ href: `/${lang}/tools/html-to-jsx`, label: 'HTML to JSX' },{ href: `/${lang}/tools/svg-to-jsx`, label: 'SVG to JSX' },{ href: `/${lang}/tools/svg-to-react`, label: 'SVG to React' }].map((link) => (
            <Link key={link.href} href={link.href} style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 13, color: 'var(--accent-blue)', textDecoration: 'none', background: 'var(--bg-input)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
