'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTML to Markdown Converter',
    description: 'Convert HTML markup to clean Markdown syntax. Supports headers, links, images, lists, tables, code blocks, and more.',
    inputLabel: 'HTML Input',
    outputLabel: 'Markdown Output',
    convertBtn: 'Convert',
    loadSample: 'Load Sample',
    clear: 'Clear',
    inputPlaceholder: '<h1>Paste your HTML here...</h1>',
    introTitle: 'Free Online HTML to Markdown Converter',
    introText: 'This tool converts HTML markup to clean Markdown syntax. It handles common HTML elements including headings (h1-h6), bold, italic, links, images, ordered and unordered lists, blockquotes, inline code, code blocks, tables, and horizontal rules. All processing happens in your browser — your data never leaves your device.',
    howTitle: 'How to Convert HTML to Markdown',
    step1: 'Paste your HTML markup into the left input panel',
    step2: 'Click the Convert button to generate Markdown',
    step3: 'Review and copy the Markdown output from the right panel',
    step4: 'Use the Load Sample button to see an example conversion',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What HTML tags are supported?',
    faq1a: 'The converter supports h1-h6 headings, strong/b (bold), em/i (italic), a (links), img (images), ul/ol/li (lists), blockquote, pre/code (code blocks), table/thead/tbody/tr/th/td, hr (horizontal rules), p (paragraphs), and br (line breaks).',
    faq2q: 'Does it handle nested HTML elements?',
    faq2a: 'Yes. The converter processes nested elements like bold text inside links, lists with bold or italic items, and code blocks within preformatted sections. Complex nesting is handled through sequential regex-based transformations.',
    faq3q: 'Can I convert a full web page to Markdown?',
    faq3a: 'You can paste any HTML snippet including full page body content. The tool handles most common HTML patterns found in articles, documentation, and web pages. For best results, paste the main content area rather than the entire page with navigation and footers.',
    faq4q: 'Does it preserve HTML entities?',
    faq4a: 'Yes. Common HTML entities like &amp;, &lt;, &gt;, &quot;, &#39;, and &nbsp; are decoded to their plain text equivalents in the Markdown output.',
    faq5q: 'Is my data safe?',
    faq5a: 'Absolutely. All HTML-to-Markdown conversion happens entirely in your browser using JavaScript. No data is sent to any server. Your HTML content remains private on your device.',
    relatedTitle: 'Related Tools',
    chars: 'characters',
  },
  zh: {
    title: 'HTML 转 Markdown 转换器',
    description: '将 HTML 标记转换为干净的 Markdown 语法。支持标题、链接、图片、列表、表格、代码块等。',
    inputLabel: 'HTML 输入',
    outputLabel: 'Markdown 输出',
    convertBtn: '转换',
    loadSample: '加载示例',
    clear: '清除',
    inputPlaceholder: '<h1>在此粘贴 HTML...</h1>',
    introTitle: '免费在线 HTML 转 Markdown 工具',
    introText: '此工具将 HTML 标记转换为干净的 Markdown 语法。支持标题(h1-h6)、粗体、斜体、链接、图片、有序和无序列表、引用、行内代码、代码块、表格和水平线。所有处理在浏览器中完成，数据不会离开您的设备。',
    howTitle: '如何将 HTML 转换为 Markdown',
    step1: '将 HTML 标记粘贴到左侧输入面板',
    step2: '点击转换按钮生成 Markdown',
    step3: '从右侧面板查看并复制 Markdown 输出',
    step4: '使用加载示例按钮查看示例转换',
    faqTitle: '常见问题',
    faq1q: '支持哪些 HTML 标签？',
    faq1a: '支持 h1-h6 标题、strong/b(粗体)、em/i(斜体)、a(链接)、img(图片)、ul/ol/li(列表)、blockquote、pre/code(代码块)、table、hr、p 和 br 标签。',
    faq2q: '支持嵌套 HTML 元素吗？',
    faq2a: '是的。转换器处理嵌套元素，如链接中的粗体文本、带粗体或斜体的列表项，以及预格式化部分中的代码块。',
    faq3q: '可以转换整个网页吗？',
    faq3a: '可以粘贴任何 HTML 片段。建议粘贴主要内容区域而非包含导航和页脚的整个页面。',
    faq4q: '会保留 HTML 实体吗？',
    faq4a: '会的。常见 HTML 实体如 &amp;、&lt;、&gt; 等会被解码为纯文本。',
    faq5q: '数据安全吗？',
    faq5a: '完全安全。所有转换在浏览器中使用 JavaScript 完成，不会向任何服务器发送数据。',
    relatedTitle: '相关工具',
    chars: '字符',
  },
  fr: {
    title: 'Convertisseur HTML vers Markdown',
    description: 'Convertissez le HTML en syntaxe Markdown. Prend en charge les titres, liens, images, listes, tableaux et blocs de code.',
    inputLabel: 'Entree HTML',
    outputLabel: 'Sortie Markdown',
    convertBtn: 'Convertir',
    loadSample: 'Charger exemple',
    clear: 'Effacer',
    inputPlaceholder: '<h1>Collez votre HTML ici...</h1>',
    introTitle: 'Convertisseur HTML vers Markdown gratuit',
    introText: 'Cet outil convertit le balisage HTML en syntaxe Markdown propre. Tout le traitement se fait dans votre navigateur.',
    howTitle: 'Comment convertir HTML en Markdown',
    step1: 'Collez votre balisage HTML dans le panneau gauche',
    step2: 'Cliquez sur Convertir pour generer le Markdown',
    step3: 'Copiez la sortie Markdown depuis le panneau droit',
    step4: 'Utilisez le bouton Charger exemple pour voir un exemple',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quelles balises HTML sont supportees ?',
    faq1a: 'Le convertisseur prend en charge h1-h6, strong/b, em/i, a, img, ul/ol/li, blockquote, pre/code, table, hr, p et br.',
    faq2q: 'Gere-t-il les elements imbriques ?',
    faq2a: 'Oui, le convertisseur traite les elements imbriques comme le texte en gras dans les liens.',
    faq3q: 'Puis-je convertir une page web complete ?',
    faq3a: 'Vous pouvez coller n\'importe quel extrait HTML. Pour de meilleurs resultats, collez la zone de contenu principale.',
    faq4q: 'Les entites HTML sont-elles preservees ?',
    faq4a: 'Oui, les entites HTML courantes sont decodees en texte brut dans la sortie Markdown.',
    faq5q: 'Mes donnees sont-elles en securite ?',
    faq5a: 'Absolument. Toute la conversion se fait dans votre navigateur. Aucune donnee n\'est envoyee a un serveur.',
    relatedTitle: 'Outils connexes',
    chars: 'caracteres',
  },
  de: {
    title: 'HTML zu Markdown Konverter',
    description: 'Konvertieren Sie HTML-Markup in saubere Markdown-Syntax. Unterstuetzt Ueberschriften, Links, Bilder, Listen, Tabellen und Codebloecke.',
    inputLabel: 'HTML Eingabe',
    outputLabel: 'Markdown Ausgabe',
    convertBtn: 'Konvertieren',
    loadSample: 'Beispiel laden',
    clear: 'Loeschen',
    inputPlaceholder: '<h1>HTML hier einfuegen...</h1>',
    introTitle: 'Kostenloser Online HTML zu Markdown Konverter',
    introText: 'Dieses Tool konvertiert HTML-Markup in saubere Markdown-Syntax. Alle Verarbeitung erfolgt in Ihrem Browser.',
    howTitle: 'Wie man HTML zu Markdown konvertiert',
    step1: 'Fuegen Sie Ihr HTML-Markup in das linke Panel ein',
    step2: 'Klicken Sie auf Konvertieren um Markdown zu erzeugen',
    step3: 'Kopieren Sie die Markdown-Ausgabe aus dem rechten Panel',
    step4: 'Verwenden Sie die Beispiel-Schaltflaeche fuer eine Demonstration',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche HTML-Tags werden unterstuetzt?',
    faq1a: 'Der Konverter unterstuetzt h1-h6, strong/b, em/i, a, img, ul/ol/li, blockquote, pre/code, table, hr, p und br.',
    faq2q: 'Werden verschachtelte Elemente behandelt?',
    faq2a: 'Ja, der Konverter verarbeitet verschachtelte Elemente wie fetten Text in Links.',
    faq3q: 'Kann ich eine ganze Webseite konvertieren?',
    faq3a: 'Sie koennen jeden HTML-Ausschnitt einfuegen. Fuer beste Ergebnisse fuegen Sie den Hauptinhalt ein.',
    faq4q: 'Werden HTML-Entitaeten beibehalten?',
    faq4a: 'Ja, gaengige HTML-Entitaeten werden in Klartext dekodiert.',
    faq5q: 'Sind meine Daten sicher?',
    faq5a: 'Absolut. Die gesamte Konvertierung erfolgt in Ihrem Browser. Keine Daten werden an einen Server gesendet.',
    relatedTitle: 'Verwandte Tools',
    chars: 'Zeichen',
  },
  es: {
    title: 'Convertidor de HTML a Markdown',
    description: 'Convierte HTML a sintaxis Markdown limpia. Soporta encabezados, enlaces, imagenes, listas, tablas y bloques de codigo.',
    inputLabel: 'Entrada HTML',
    outputLabel: 'Salida Markdown',
    convertBtn: 'Convertir',
    loadSample: 'Cargar ejemplo',
    clear: 'Limpiar',
    inputPlaceholder: '<h1>Pega tu HTML aqui...</h1>',
    introTitle: 'Convertidor gratuito de HTML a Markdown',
    introText: 'Esta herramienta convierte marcado HTML a sintaxis Markdown limpia. Todo el procesamiento ocurre en tu navegador.',
    howTitle: 'Como convertir HTML a Markdown',
    step1: 'Pega tu marcado HTML en el panel izquierdo',
    step2: 'Haz clic en Convertir para generar Markdown',
    step3: 'Copia la salida Markdown del panel derecho',
    step4: 'Usa el boton Cargar ejemplo para ver una demostracion',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que etiquetas HTML se soportan?',
    faq1a: 'El convertidor soporta h1-h6, strong/b, em/i, a, img, ul/ol/li, blockquote, pre/code, table, hr, p y br.',
    faq2q: 'Maneja elementos anidados?',
    faq2a: 'Si, el convertidor procesa elementos anidados como texto en negrita dentro de enlaces.',
    faq3q: 'Puedo convertir una pagina web completa?',
    faq3a: 'Puedes pegar cualquier fragmento HTML. Para mejores resultados, pega el area de contenido principal.',
    faq4q: 'Se preservan las entidades HTML?',
    faq4a: 'Si, las entidades HTML comunes se decodifican a texto plano.',
    faq5q: 'Son seguros mis datos?',
    faq5a: 'Absolutamente. Toda la conversion ocurre en tu navegador. No se envia datos a ningun servidor.',
    relatedTitle: 'Herramientas relacionadas',
    chars: 'caracteres',
  },
  ja: {
    title: 'HTML から Markdown 変換ツール',
    description: 'HTMLマークアップをクリーンなMarkdown構文に変換。見出し、リンク、画像、リスト、テーブル、コードブロックに対応。',
    inputLabel: 'HTML 入力',
    outputLabel: 'Markdown 出力',
    convertBtn: '変換',
    loadSample: 'サンプル読込',
    clear: 'クリア',
    inputPlaceholder: '<h1>HTMLをここに貼り付け...</h1>',
    introTitle: '無料オンライン HTML→Markdown 変換ツール',
    introText: 'このツールはHTMLマークアップをクリーンなMarkdown構文に変換します。すべての処理はブラウザ内で行われます。',
    howTitle: 'HTML を Markdown に変換する方法',
    step1: 'HTMLマークアップを左パネルに貼り付け',
    step2: '変換ボタンをクリックしてMarkdownを生成',
    step3: '右パネルからMarkdown出力をコピー',
    step4: 'サンプル読込ボタンで例を確認',
    faqTitle: 'よくある質問',
    faq1q: '対応するHTMLタグは？',
    faq1a: 'h1-h6、strong/b、em/i、a、img、ul/ol/li、blockquote、pre/code、table、hr、p、brに対応しています。',
    faq2q: 'ネストされた要素に対応？',
    faq2a: 'はい。リンク内の太字テキストなどネストされた要素を処理します。',
    faq3q: 'ウェブページ全体を変換できる？',
    faq3a: 'HTMLスニペットを貼り付けできます。最良の結果を得るにはメインコンテンツ領域を貼り付けてください。',
    faq4q: 'HTMLエンティティは保持される？',
    faq4a: 'はい。一般的なHTMLエンティティはプレーンテキストにデコードされます。',
    faq5q: 'データは安全？',
    faq5a: '完全に安全です。すべての変換はブラウザ内で行われ、サーバーにデータは送信されません。',
    relatedTitle: '関連ツール',
    chars: '文字',
  },
  ko: {
    title: 'HTML을 Markdown으로 변환기',
    description: 'HTML 마크업을 깨끗한 Markdown 구문으로 변환합니다. 제목, 링크, 이미지, 목록, 테이블, 코드 블록을 지원합니다.',
    inputLabel: 'HTML 입력',
    outputLabel: 'Markdown 출력',
    convertBtn: '변환',
    loadSample: '샘플 로드',
    clear: '지우기',
    inputPlaceholder: '<h1>여기에 HTML을 붙여넣으세요...</h1>',
    introTitle: '무료 온라인 HTML-Markdown 변환기',
    introText: '이 도구는 HTML 마크업을 깨끗한 Markdown 구문으로 변환합니다. 모든 처리는 브라우저에서 이루어집니다.',
    howTitle: 'HTML을 Markdown으로 변환하는 방법',
    step1: '왼쪽 패널에 HTML 마크업을 붙여넣기',
    step2: '변환 버튼을 클릭하여 Markdown 생성',
    step3: '오른쪽 패널에서 Markdown 출력 복사',
    step4: '샘플 로드 버튼으로 예제 확인',
    faqTitle: '자주 묻는 질문',
    faq1q: '지원되는 HTML 태그는?',
    faq1a: 'h1-h6, strong/b, em/i, a, img, ul/ol/li, blockquote, pre/code, table, hr, p, br을 지원합니다.',
    faq2q: '중첩된 요소를 처리하나요?',
    faq2a: '네, 링크 안의 볼드 텍스트 등 중첩된 요소를 처리합니다.',
    faq3q: '전체 웹 페이지를 변환할 수 있나요?',
    faq3a: '모든 HTML 스니펫을 붙여넣을 수 있습니다. 최상의 결과를 위해 메인 콘텐츠 영역을 붙여넣으세요.',
    faq4q: 'HTML 엔티티가 보존되나요?',
    faq4a: '네, 일반적인 HTML 엔티티는 일반 텍스트로 디코딩됩니다.',
    faq5q: '데이터가 안전한가요?',
    faq5a: '완전히 안전합니다. 모든 변환은 브라우저에서 이루어지며 서버로 데이터가 전송되지 않습니다.',
    relatedTitle: '관련 도구',
    chars: '문자',
  },
};

function htmlToMarkdown(html: string): string {
  let md = html;

  // Pre/code blocks first
  md = md.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (_match, code) => {
    const decoded = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    return '\n```\n' + decoded.trim() + '\n```\n';
  });

  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_match, tableContent) => {
    const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    if (rows.length === 0) return '';
    const result: string[] = [];
    rows.forEach((row: string, rowIdx: number) => {
      const cells = row.match(/<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      const cellTexts = cells.map((c: string) => c.replace(/<\/?(?:th|td)[^>]*>/gi, '').trim());
      result.push('| ' + cellTexts.join(' | ') + ' |');
      if (rowIdx === 0) {
        result.push('| ' + cellTexts.map(() => '---').join(' | ') + ' |');
      }
    });
    return '\n' + result.join('\n') + '\n';
  });

  // Headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n##### $1\n');
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n###### $1\n');

  // Bold
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');

  // Italic
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)');
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, '![$1]($2)');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)');

  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, '\n---\n');

  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_match, content) => {
    const lines = content.trim().split('\n');
    return '\n' + lines.map((line: string) => '> ' + line.trim()).join('\n') + '\n';
  });

  // Unordered lists
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_match, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n' + items.map((item: string) => '- ' + item.replace(/<\/?li[^>]*>/gi, '').trim()).join('\n') + '\n';
  });

  // Ordered lists
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match, content) => {
    const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n' + items.map((item: string, idx: number) => `${idx + 1}. ` + item.replace(/<\/?li[^>]*>/gi, '').trim()).join('\n') + '\n';
  });

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n');

  // Line breaks
  md = md.replace(/<br[^>]*\/?>/gi, '\n');

  // Strip remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  md = md.replace(/&nbsp;/g, ' ');

  // Clean up multiple blank lines
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

const sampleHtml = `<h1>Hello World</h1>

<p>This is a <strong>bold</strong> and <em>italic</em> text example.</p>

<h2>Features</h2>

<ul>
  <li>Item one</li>
  <li>Item two</li>
  <li>Item three</li>
</ul>

<h3>Ordered List</h3>

<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>

<blockquote>This is a blockquote</blockquote>

<p>Here is some <code>inline code</code> and a <a href="https://example.com">link</a>.</p>

<table>
  <tr><th>Name</th><th>Role</th></tr>
  <tr><td>Alice</td><td>Developer</td></tr>
  <tr><td>Bob</td><td>Designer</td></tr>
</table>

<pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>

<img src="https://example.com/image.png" alt="Example image">

<hr>

<p>That's all folks!</p>`;

export default function HtmlToMarkdown() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    const result = htmlToMarkdown(input);
    setOutput(result);
  };

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

  return (
    <ToolLayout title={t.title} description={t.description} toolId="html-to-markdown">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => setInput(sampleHtml)} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{input.length} {t.chars}</span>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder}
            style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly
            style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.howTitle}</h3>
        <ol style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 24 }}>
          <li>{t.step1}</li>
          <li>{t.step2}</li>
          <li>{t.step3}</li>
          <li>{t.step4}</li>
        </ol>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.faqTitle}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {[
            { q: t.faq1q, a: t.faq1a },
            { q: t.faq2q, a: t.faq2a },
            { q: t.faq3q, a: t.faq3a },
            { q: t.faq4q, a: t.faq4a },
            { q: t.faq5q, a: t.faq5a },
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
            { href: `/${lang}/tools/markdown-to-html`, label: 'Markdown to HTML' },
            { href: `/${lang}/tools/markdown-preview`, label: 'Markdown Preview' },
            { href: `/${lang}/tools/html-to-jsx`, label: 'HTML to JSX' },
            { href: `/${lang}/tools/html-entity`, label: 'HTML Entity Encoder' },
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
