'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

// Simple HTML beautifier
function beautifyHtml(html: string, indentSize: number, indentChar: string): string {
  if (!html.trim()) return '';
  const tab = indentChar === 'tab' ? '\t' : ' '.repeat(indentSize);
  let result = '';
  let indent = 0;

  // Normalize and split by tags
  const formatted = html.replace(/>\s*</g, '>\n<').trim();
  const lines = formatted.split('\n');

  const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if it's a closing tag
    const isClosing = /^<\//.test(trimmed);
    // Check if it's a self-closing tag
    const isSelfClosing = /\/>$/.test(trimmed);
    // Check if it's a void element
    const tagMatch = trimmed.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
    const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
    const isVoid = voidElements.has(tagName);
    // Check if it's a comment or doctype
    const isComment = /^<!--/.test(trimmed) || /^<!DOCTYPE/i.test(trimmed);

    if (isClosing) {
      indent = Math.max(0, indent - 1);
    }

    result += tab.repeat(indent) + trimmed + '\n';

    if (!isClosing && !isSelfClosing && !isVoid && !isComment && /^<[a-zA-Z]/.test(trimmed)) {
      indent++;
    }
  }

  return result.trimEnd();
}

function minifyHtml(html: string): string {
  return html
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTML Beautifier & Formatter',
    description: 'Format, beautify, and clean up messy HTML code with customizable indentation. Paste your HTML and get perfectly indented output.',
    inputLabel: 'HTML Input',
    inputPlaceholder: 'Paste your HTML code here to beautify...',
    outputLabel: 'Beautified HTML',
    outputPlaceholder: 'Formatted HTML will appear here...',
    beautify: 'Beautify',
    minify: 'Minify',
    clear: 'Clear',
    loadSample: 'Load Sample',
    indent: 'Indent',
    spaces: 'spaces',
    tab: 'Tab',
    lines: 'lines',
    chars: 'chars',
    introTitle: 'Free Online HTML Beautifier & Formatter',
    introText: 'This HTML beautifier and formatter transforms messy, minified, or poorly indented HTML into clean, readable code. It properly indents nested tags, handles self-closing and void elements, preserves comments, and supports both space and tab indentation. Perfect for cleaning up HTML from email templates, CMS output, or minified production code.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is an HTML beautifier?',
    faq1a: 'An HTML beautifier (also called HTML formatter or HTML pretty printer) is a tool that takes HTML code and reformats it with consistent indentation and line breaks. It transforms minified or poorly formatted HTML into clean, readable code by properly nesting tags, adding indentation for child elements, and placing closing tags on appropriate lines.',
    faq2q: 'What is the difference between beautify and minify?',
    faq2a: 'Beautifying HTML adds whitespace (indentation and line breaks) to make the code human-readable. Minifying does the opposite: it removes all unnecessary whitespace to reduce file size for production. Beautified HTML is easier to read and debug, while minified HTML loads faster in browsers.',
    faq3q: 'Does beautifying HTML change its behavior?',
    faq3a: 'In most cases, beautifying HTML does not change how it renders in browsers. However, in some edge cases involving inline elements or preformatted text (<pre>), added whitespace could affect layout. For production use, always test beautified HTML to ensure it renders correctly.',
    faq4q: 'Should I use 2 spaces, 4 spaces, or tabs for HTML indentation?',
    faq4a: '2 spaces is the most common convention for HTML and is used by popular style guides like Google HTML/CSS Style Guide. 4 spaces is also popular and may be preferred if you find 2 spaces too compact. Tabs are flexible since editors can display them at different widths. Choose whichever your team prefers and stay consistent.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTML 美化格式化工具',
    description: '格式化、美化和清理混乱的 HTML 代码，支持自定义缩进。粘贴 HTML 即可获得完美缩进的输出。',
    inputLabel: 'HTML 输入',
    inputPlaceholder: '在此粘贴要美化的 HTML 代码...',
    outputLabel: '美化后的 HTML',
    outputPlaceholder: '格式化后的 HTML 将显示在此...',
    beautify: '美化',
    minify: '压缩',
    clear: '清除',
    loadSample: '加载示例',
    indent: '缩进',
    spaces: '空格',
    tab: '制表符',
    lines: '行',
    chars: '字符',
    introTitle: '免费在线 HTML 美化格式化工具',
    introText: '这个 HTML 美化工具可以将混乱的、压缩的或缩进不当的 HTML 转换为整洁、可读的代码。支持自定义缩进大小和空格/制表符切换。',
    faqTitle: '常见问题',
    faq1q: '什么是 HTML 美化器？',
    faq1a: 'HTML 美化器是一个将 HTML 代码重新格式化为一致缩进和换行的工具，使代码更易读和调试。',
    faq2q: '美化和压缩有什么区别？',
    faq2a: '美化添加空白使代码可读，压缩删除所有不必要的空白以减小文件大小。',
    faq3q: '美化 HTML 会改变其行为吗？',
    faq3a: '通常不会改变浏览器渲染效果。但对于内联元素或预格式化文本，添加的空白可能会影响布局。',
    faq4q: 'HTML 缩进应该用 2 空格、4 空格还是制表符？',
    faq4a: '2 空格是最常见的约定。选择团队偏好的方式并保持一致即可。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Embellisseur & Formateur HTML',
    description: 'Formatez et embellissez le code HTML avec indentation personnalisable. Collez votre HTML et obtenez un code propre.',
    inputLabel: 'Entree HTML', inputPlaceholder: 'Collez votre code HTML ici...', outputLabel: 'HTML embelli',
    outputPlaceholder: 'Le HTML formate apparaitra ici...', beautify: 'Embellir', minify: 'Minifier', clear: 'Effacer',
    loadSample: 'Charger un exemple', indent: 'Indentation', spaces: 'espaces', tab: 'Tab', lines: 'lignes', chars: 'caracteres',
    introTitle: 'Embellisseur HTML gratuit', introText: 'Cet embellisseur HTML transforme le code mal formate en code propre et lisible avec indentation personnalisable.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Qu\'est-ce qu\'un embellisseur HTML ?', faq1a: 'Un outil qui reformate le HTML avec une indentation et des sauts de ligne coherents.',
    faq2q: 'Difference entre embellir et minifier ?', faq2a: 'Embellir ajoute des espaces pour la lisibilite. Minifier supprime les espaces pour reduire la taille.',
    faq3q: 'L\'embellissement change-t-il le comportement ?', faq3a: 'Generalement non, sauf pour les elements inline ou preformates.',
    faq4q: 'Quelle indentation pour le HTML ?', faq4a: '2 espaces est la convention la plus courante. Choisissez selon les preferences de l\'equipe.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HTML Beautifier & Formatierer',
    description: 'HTML-Code formatieren und verschoenern mit anpassbarer Einrueckung.',
    inputLabel: 'HTML-Eingabe', inputPlaceholder: 'HTML-Code hier einfuegen...', outputLabel: 'Verschoenertes HTML',
    outputPlaceholder: 'Formatiertes HTML erscheint hier...', beautify: 'Verschoenern', minify: 'Minifizieren', clear: 'Loeschen',
    loadSample: 'Beispiel laden', indent: 'Einrueckung', spaces: 'Leerzeichen', tab: 'Tab', lines: 'Zeilen', chars: 'Zeichen',
    introTitle: 'Kostenloser HTML Beautifier', introText: 'Dieser HTML Beautifier wandelt unordentlichen Code in sauberen, lesbaren Code mit anpassbarer Einrueckung um.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Was ist ein HTML Beautifier?', faq1a: 'Ein Werkzeug das HTML mit konsistenter Einrueckung und Zeilenumbruechen neu formatiert.',
    faq2q: 'Unterschied zwischen Verschoenern und Minifizieren?', faq2a: 'Verschoenern fuegt Leerzeichen fuer Lesbarkeit hinzu. Minifizieren entfernt Leerzeichen fuer kleinere Dateien.',
    faq3q: 'Aendert Verschoenern das Verhalten?', faq3a: 'Normalerweise nicht, ausser bei Inline-Elementen oder vorformatiertem Text.',
    faq4q: 'Welche Einrueckung fuer HTML?', faq4a: '2 Leerzeichen ist die gaengigste Konvention.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Embellecedor y Formateador HTML',
    description: 'Formatea y embellece codigo HTML con indentacion personalizable.',
    inputLabel: 'Entrada HTML', inputPlaceholder: 'Pega tu codigo HTML aqui...', outputLabel: 'HTML embellecido',
    outputPlaceholder: 'El HTML formateado aparecera aqui...', beautify: 'Embellecer', minify: 'Minificar', clear: 'Limpiar',
    loadSample: 'Cargar ejemplo', indent: 'Indentacion', spaces: 'espacios', tab: 'Tab', lines: 'lineas', chars: 'caracteres',
    introTitle: 'Embellecedor HTML gratuito', introText: 'Este embellecedor HTML transforma codigo desordenado en codigo limpio y legible con indentacion personalizable.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que es un embellecedor HTML?', faq1a: 'Una herramienta que reformatea HTML con indentacion y saltos de linea consistentes.',
    faq2q: 'Diferencia entre embellecer y minificar?', faq2a: 'Embellecer agrega espacios para legibilidad. Minificar elimina espacios para reducir tamano.',
    faq3q: 'El embellecimiento cambia el comportamiento?', faq3a: 'Generalmente no, excepto para elementos inline o texto preformateado.',
    faq4q: 'Que indentacion para HTML?', faq4a: '2 espacios es la convencion mas comun.',
    relatedTitle: 'Herramientas relacionadas',
  },
  ja: {
    title: 'HTML ビューティファイア＆フォーマッター',
    description: 'カスタマイズ可能なインデントで HTML コードを整形・美化。',
    inputLabel: 'HTML 入力', inputPlaceholder: 'HTML コードをここに貼り付け...', outputLabel: '美化された HTML',
    outputPlaceholder: 'フォーマットされた HTML がここに表示...', beautify: '美化', minify: '圧縮', clear: 'クリア',
    loadSample: 'サンプル読込', indent: 'インデント', spaces: 'スペース', tab: 'タブ', lines: '行', chars: '文字',
    introTitle: '無料オンライン HTML ビューティファイア', introText: 'この HTML ビューティファイアは乱雑なコードをカスタマイズ可能なインデントで整理されたコードに変換します。',
    faqTitle: 'よくある質問',
    faq1q: 'HTML ビューティファイアとは？', faq1a: 'HTML を一貫したインデントと改行で再フォーマットするツールです。',
    faq2q: '美化と圧縮の違いは？', faq2a: '美化は可読性のためにスペースを追加。圧縮はサイズ削減のためにスペースを削除。',
    faq3q: '美化で動作が変わる？', faq3a: '通常は変わりません。インライン要素や整形済みテキストでは例外あり。',
    faq4q: 'HTML のインデントは？', faq4a: '2スペースが最も一般的です。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTML 뷰티파이어 & 포맷터',
    description: '사용자 지정 들여쓰기로 HTML 코드를 포맷하고 아름답게.',
    inputLabel: 'HTML 입력', inputPlaceholder: 'HTML 코드를 여기에 붙여넣기...', outputLabel: '아름답게 정리된 HTML',
    outputPlaceholder: '포맷된 HTML이 여기에 표시됩니다...', beautify: '아름답게', minify: '압축', clear: '지우기',
    loadSample: '샘플 로드', indent: '들여쓰기', spaces: '스페이스', tab: '탭', lines: '줄', chars: '문자',
    introTitle: '무료 온라인 HTML 뷰티파이어', introText: '이 HTML 뷰티파이어는 지저분한 코드를 사용자 지정 들여쓰기로 깨끗하고 읽기 쉬운 코드로 변환합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: 'HTML 뷰티파이어란?', faq1a: '일관된 들여쓰기와 줄 바꿈으로 HTML을 다시 포맷하는 도구입니다.',
    faq2q: '뷰티파이와 미니파이의 차이점은?', faq2a: '뷰티파이는 가독성을 위해 공백을 추가. 미니파이는 크기 줄이기 위해 공백 제거.',
    faq3q: '뷰티파이로 동작이 변하나요?', faq3a: '일반적으로 변하지 않습니다. 인라인 요소나 사전 포맷된 텍스트에서는 예외가 있을 수 있습니다.',
    faq4q: 'HTML 들여쓰기는?', faq4a: '2 스페이스가 가장 일반적인 규칙입니다.',
    relatedTitle: '관련 도구',
  },
};

export default function HtmlBeautifier() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<string>('2');

  const handleBeautify = () => {
    if (!input.trim()) return;
    const indentChar = indent === 'tab' ? 'tab' : 'space';
    const indentSize = indent === 'tab' ? 1 : Number(indent);
    setOutput(beautifyHtml(input, indentSize, indentChar));
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setOutput(minifyHtml(input));
  };

  const loadSample = () => {
    setInput('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>My Page</title><link rel="stylesheet" href="style.css"></head><body><header><nav><ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul></nav></header><main><section class="hero"><h1>Welcome to My Website</h1><p>This is a sample HTML page for testing the beautifier.</p><img src="hero.jpg" alt="Hero Image"></section><section class="content"><h2>Features</h2><ul><li>Fast and free</li><li>Customizable indentation</li><li>Handles void elements</li></ul></section></main><footer><p>Copyright 2026 DevToolBox</p></footer></body></html>');
    setOutput('');
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
    <ToolLayout title={t.title} description={t.description} toolId="html-beautifier">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={handleBeautify} className="btn btn-primary">{t.beautify}</button>
        <button onClick={handleMinify} className="btn btn-secondary">{t.minify}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
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

      {/* Output stats */}
      {output && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '8px 14px', marginBottom: 16, fontSize: 13, color: '#22c55e' }}>
          {outputLines} {t.lines} / {outputChars.toLocaleString()} {t.chars}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 400, fontFamily: 'monospace', fontSize: 12 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={t.outputPlaceholder} style={{ minHeight: 400, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

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
            { href: `/${lang}/tools/js-html-formatter`, label: 'JS/HTML Formatter' },
            { href: `/${lang}/tools/css-minifier`, label: 'CSS Minifier' },
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
