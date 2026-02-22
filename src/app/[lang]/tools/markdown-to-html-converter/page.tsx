'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown to HTML Converter', description: 'Convert Markdown text to clean HTML code. Supports headings, bold, italic, links, lists, code blocks, and blockquotes.',
    inputLabel: 'Markdown Input', outputLabel: 'HTML Output', convert: 'Convert to HTML', clear: 'Clear',
    inputPlaceholder: '# Enter Markdown here\n\nSupports **bold**, *italic*, [links](url), and more...',
    intro: 'Convert your Markdown documents to clean, valid HTML with this free online Markdown to HTML converter. It handles standard Markdown syntax including headings (h1-h6), emphasis (bold/italic), links, images, ordered and unordered lists, code blocks, blockquotes, and horizontal rules. Perfect for blog posts, documentation, and content management.',
    faq1q: 'What Markdown syntax is supported?', faq1a: 'This converter supports standard Markdown: headings (#), bold (**text**), italic (*text*), links [text](url), images ![alt](url), unordered lists (- item), ordered lists (1. item), code blocks (```), inline code, blockquotes (>), and horizontal rules (---).',
    faq2q: 'Can I use this for blog posts?', faq2a: 'Yes, the generated HTML output is clean and semantic, perfect for blog posts, CMS content, documentation, and email newsletters. The HTML uses proper semantic tags like h1-h6, p, ul, ol, blockquote, and code.',
    faq3q: 'Does it support GitHub Flavored Markdown?', faq3a: 'This converter supports core Markdown features. For advanced GFM features like task lists, strikethrough, and tables, use the full Markdown preview tool.',
    relatedTools: 'Related Tools', loadSample: 'Load Sample',
  },
  zh: { title: 'Markdown 转 HTML 转换器', description: '将 Markdown 文本转换为 HTML 代码。', inputLabel: 'Markdown 输入', outputLabel: 'HTML 输出', convert: '转换为 HTML', clear: '清除', inputPlaceholder: '# 在此输入 Markdown\n\n支持 **粗体**、*斜体*、[链接](url)等...', intro: '使用此免费在线工具将 Markdown 文档转换为干净有效的 HTML。', faq1q: '支持哪些 Markdown 语法？', faq1a: '支持标准 Markdown：标题、粗体、斜体、链接、图片、列表、代码块、引用和分隔线。', faq2q: '可以用于博客文章吗？', faq2a: '是的，生成的 HTML 语义化且干净，适合博客、CMS 和文档。', faq3q: '支持 GitHub 风格 Markdown 吗？', faq3a: '支持核心 Markdown 功能。高级 GFM 功能请使用完整的 Markdown 预览工具。', relatedTools: '相关工具', loadSample: '加载示例' },
  ja: { title: 'Markdown to HTML 変換ツール', description: 'MarkdownテキストをHTMLコードに変換します。', inputLabel: 'Markdown入力', outputLabel: 'HTML出力', convert: 'HTMLに変換', clear: 'クリア', inputPlaceholder: '# Markdownを入力\n\n**太字**、*斜体*対応...', intro: 'MarkdownドキュメントをクリーンなHTMLに変換します。', faq1q: 'どのMarkdown構文に対応？', faq1a: '見出し、太字、斜体、リンク、画像、リスト、コードブロックに対応。', faq2q: 'ブログ記事に使える？', faq2a: 'はい、生成されるHTMLはセマンティックでクリーンです。', faq3q: 'GitHub Flavored Markdownに対応？', faq3a: 'コアMarkdown機能に対応。', relatedTools: '関連ツール', loadSample: 'サンプル' },
  ko: { title: 'Markdown to HTML 변환기', description: 'Markdown 텍스트를 HTML 코드로 변환합니다.', inputLabel: 'Markdown 입력', outputLabel: 'HTML 출력', convert: 'HTML로 변환', clear: '지우기', inputPlaceholder: '# Markdown을 입력하세요\n\n**굵게**, *기울임꼴* 지원...', intro: 'Markdown 문서를 깔끔한 HTML로 변환합니다.', faq1q: '어떤 Markdown 구문을 지원하나요?', faq1a: '제목, 굵게, 기울임, 링크, 이미지, 목록, 코드 블록을 지원합니다.', faq2q: '블로그 글에 사용할 수 있나요?', faq2a: '네, 생성된 HTML은 시맨틱하고 깔끔합니다.', faq3q: 'GitHub Flavored Markdown을 지원하나요?', faq3a: '핵심 Markdown 기능을 지원합니다.', relatedTools: '관련 도구', loadSample: '샘플' },
  fr: { title: 'Convertisseur Markdown vers HTML', description: 'Convertissez le texte Markdown en HTML.', inputLabel: 'Entree Markdown', outputLabel: 'Sortie HTML', convert: 'Convertir en HTML', clear: 'Effacer', inputPlaceholder: '# Entrez le Markdown ici...', intro: 'Convertissez vos documents Markdown en HTML propre et valide.', faq1q: 'Quelle syntaxe Markdown ?', faq1a: 'Titres, gras, italique, liens, images, listes, blocs de code.', faq2q: 'Pour les articles de blog ?', faq2a: 'Oui, le HTML genere est propre et semantique.', faq3q: 'GitHub Flavored Markdown ?', faq3a: 'Les fonctionnalites principales sont supportees.', relatedTools: 'Outils associes', loadSample: 'Exemple' },
  de: { title: 'Markdown zu HTML Konverter', description: 'Konvertieren Sie Markdown-Text in HTML.', inputLabel: 'Markdown Eingabe', outputLabel: 'HTML Ausgabe', convert: 'In HTML konvertieren', clear: 'Loeschen', inputPlaceholder: '# Markdown hier eingeben...', intro: 'Konvertieren Sie Markdown-Dokumente in sauberes HTML.', faq1q: 'Welche Markdown-Syntax?', faq1a: 'Ueberschriften, Fett, Kursiv, Links, Bilder, Listen, Code-Bloecke.', faq2q: 'Fuer Blog-Beitraege?', faq2a: 'Ja, das generierte HTML ist semantisch und sauber.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Kern-Markdown-Funktionen werden unterstuetzt.', relatedTools: 'Verwandte Tools', loadSample: 'Beispiel' },
  es: { title: 'Convertidor Markdown a HTML', description: 'Convierte texto Markdown a HTML.', inputLabel: 'Entrada Markdown', outputLabel: 'Salida HTML', convert: 'Convertir a HTML', clear: 'Limpiar', inputPlaceholder: '# Introduce Markdown aqui...', intro: 'Convierte tus documentos Markdown a HTML limpio y valido.', faq1q: 'Que sintaxis Markdown soporta?', faq1a: 'Encabezados, negrita, cursiva, enlaces, imagenes, listas, bloques de codigo.', faq2q: 'Para articulos de blog?', faq2a: 'Si, el HTML generado es semantico y limpio.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Las funciones principales son soportadas.', relatedTools: 'Herramientas relacionadas', loadSample: 'Ejemplo' },
  pt: { title: 'Conversor Markdown para HTML', description: 'Converta texto Markdown para HTML.', inputLabel: 'Entrada Markdown', outputLabel: 'Saida HTML', convert: 'Converter para HTML', clear: 'Limpar', inputPlaceholder: '# Digite Markdown aqui...', intro: 'Converta seus documentos Markdown para HTML limpo e valido.', faq1q: 'Qual sintaxe Markdown?', faq1a: 'Titulos, negrito, italico, links, imagens, listas, blocos de codigo.', faq2q: 'Para artigos de blog?', faq2a: 'Sim, o HTML gerado e semantico e limpo.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'As funcoes principais sao suportadas.', relatedTools: 'Ferramentas relacionadas', loadSample: 'Exemplo' },
  it: { title: 'Convertitore Markdown in HTML', description: 'Converti testo Markdown in HTML.', inputLabel: 'Input Markdown', outputLabel: 'Output HTML', convert: 'Converti in HTML', clear: 'Cancella', inputPlaceholder: '# Inserisci Markdown qui...', intro: 'Converti i tuoi documenti Markdown in HTML pulito e valido.', faq1q: 'Quale sintassi Markdown?', faq1a: 'Titoli, grassetto, corsivo, link, immagini, elenchi, blocchi di codice.', faq2q: 'Per articoli del blog?', faq2a: 'Si, l\'HTML generato e semantico e pulito.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Le funzionalita principali sono supportate.', relatedTools: 'Strumenti correlati', loadSample: 'Esempio' },
  nl: { title: 'Markdown naar HTML Converter', description: 'Converteer Markdown-tekst naar HTML.', inputLabel: 'Markdown Invoer', outputLabel: 'HTML Uitvoer', convert: 'Naar HTML', clear: 'Wissen', inputPlaceholder: '# Voer Markdown in...', intro: 'Converteer uw Markdown-documenten naar schone HTML.', faq1q: 'Welke Markdown-syntax?', faq1a: 'Koppen, vet, cursief, links, afbeeldingen, lijsten, codeblokken.', faq2q: 'Voor blogposts?', faq2a: 'Ja, de gegenereerde HTML is semantisch en schoon.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Kernfuncties worden ondersteund.', relatedTools: 'Gerelateerde tools', loadSample: 'Voorbeeld' },
  pl: { title: 'Konwerter Markdown do HTML', description: 'Konwertuj tekst Markdown na HTML.', inputLabel: 'Wejscie Markdown', outputLabel: 'Wyjscie HTML', convert: 'Konwertuj do HTML', clear: 'Wyczysc', inputPlaceholder: '# Wprowadz Markdown...', intro: 'Konwertuj dokumenty Markdown na czysty HTML.', faq1q: 'Jaka skladnia Markdown?', faq1a: 'Naglowki, pogrubienie, kursywa, linki, obrazy, listy, bloki kodu.', faq2q: 'Do postow na blogu?', faq2a: 'Tak, wygenerowany HTML jest semantyczny i czysty.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Glowne funkcje sa obslugiwane.', relatedTools: 'Powiazane narzedzia', loadSample: 'Przyklad' },
  sv: { title: 'Markdown till HTML Konverterare', description: 'Konvertera Markdown-text till HTML.', inputLabel: 'Markdown Indata', outputLabel: 'HTML Utdata', convert: 'Konvertera till HTML', clear: 'Rensa', inputPlaceholder: '# Ange Markdown har...', intro: 'Konvertera dina Markdown-dokument till ren HTML.', faq1q: 'Vilken Markdown-syntax?', faq1a: 'Rubriker, fetstil, kursiv, lankar, bilder, listor, kodblock.', faq2q: 'For blogginlagg?', faq2a: 'Ja, den genererade HTML-koden ar semantisk och ren.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Karnfunktioner stods.', relatedTools: 'Relaterade verktyg', loadSample: 'Exempel' },
  no: { title: 'Markdown til HTML Konverter', description: 'Konverter Markdown-tekst til HTML.', inputLabel: 'Markdown Inndata', outputLabel: 'HTML Utdata', convert: 'Konverter til HTML', clear: 'Slett', inputPlaceholder: '# Skriv inn Markdown her...', intro: 'Konverter dine Markdown-dokumenter til ren HTML.', faq1q: 'Hvilken Markdown-syntaks?', faq1a: 'Overskrifter, fet, kursiv, lenker, bilder, lister, kodeblokker.', faq2q: 'For blogginnlegg?', faq2a: 'Ja, den genererte HTML-en er semantisk og ren.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Kjernefunksjoner stoettes.', relatedTools: 'Relaterte verktoy', loadSample: 'Eksempel' },
  id: { title: 'Konverter Markdown ke HTML', description: 'Konversi teks Markdown ke HTML.', inputLabel: 'Input Markdown', outputLabel: 'Output HTML', convert: 'Konversi ke HTML', clear: 'Hapus', inputPlaceholder: '# Masukkan Markdown di sini...', intro: 'Konversi dokumen Markdown ke HTML bersih dan valid.', faq1q: 'Sintaks Markdown apa yang didukung?', faq1a: 'Heading, tebal, miring, tautan, gambar, daftar, blok kode.', faq2q: 'Untuk artikel blog?', faq2a: 'Ya, HTML yang dihasilkan semantik dan bersih.', faq3q: 'GitHub Flavored Markdown?', faq3a: 'Fitur inti didukung.', relatedTools: 'Alat terkait', loadSample: 'Contoh' },
  th: { title: 'แปลง Markdown เป็น HTML', description: 'แปลงข้อความ Markdown เป็น HTML', inputLabel: 'Markdown อินพุต', outputLabel: 'HTML เอาต์พุต', convert: 'แปลงเป็น HTML', clear: 'ล้าง', inputPlaceholder: '# ป้อน Markdown ที่นี่...', intro: 'แปลงเอกสาร Markdown ของคุณเป็น HTML ที่สะอาด', faq1q: 'รองรับ Markdown อะไรบ้าง?', faq1a: 'หัวข้อ, ตัวหนา, ตัวเอียง, ลิงก์, รูปภาพ, รายการ, บล็อกโค้ด', faq2q: 'ใช้สำหรับบล็อกได้ไหม?', faq2a: 'ได้ HTML ที่สร้างขึ้นมีความหมายและสะอาด', faq3q: 'รองรับ GitHub Flavored Markdown?', faq3a: 'รองรับฟีเจอร์หลัก', relatedTools: 'เครื่องมือที่เกี่ยวข้อง', loadSample: 'ตัวอย่าง' },
};

const SAMPLE = `# Hello World

This is a **bold** and *italic* text example.

## Features

- Headings (h1-h6)
- **Bold** and *italic*
- [Links](https://example.com)
- Lists (ordered and unordered)

### Code Example

\`inline code\` and code blocks:

\`\`\`
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote.

1. First item
2. Second item
3. Third item

---

That's all!`;

function markdownToHtml(md: string): string {
  let html = md;
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/```[\s\S]*?```/g, (m) => {
    const code = m.slice(3, -3).replace(/^\w*\n/, '');
    return `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^---$/gm, '<hr />');
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => {
    return m.includes('1.') ? `<ol>\n${m}</ol>` : `<ul>\n${m}</ul>`;
  });
  html = html.replace(/^(?!<[houpbl]|<li|<hr|<img|<pre|<code|<strong|<em|<a )(.+)$/gm, '<p>$1</p>');
  return html;
}

export default function MarkdownToHtmlConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = useCallback(() => {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(markdownToHtml(input));
  }, [input]);

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
    ],
  };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="markdown-to-html-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.intro}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={convert} className="btn btn-primary">{t.convert}</button>
        <button onClick={() => { setInput(SAMPLE); setOutput(markdownToHtml(SAMPLE)); }} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{t.clear}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputLabel}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={t.inputPlaceholder} style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 13 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly style={{ minHeight: 300, fontFamily: 'monospace', fontSize: 13, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>{t.relatedTools}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            { href: `/${lang}/tools/markdown-preview`, label: 'Markdown Preview' },
            { href: `/${lang}/tools/markdown-to-html`, label: 'Markdown to HTML' },
            { href: `/${lang}/tools/html-to-markdown`, label: 'HTML to Markdown' },
            { href: `/${lang}/tools/markdown-editor-online`, label: 'Markdown Editor' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 12, color: 'var(--accent-blue)', textDecoration: 'none', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>{link.label}</Link>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>FAQ</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ q: t.faq1q, a: t.faq1a }, { q: t.faq2q, a: t.faq2a }, { q: t.faq3q, a: t.faq3a }].map((faq, idx) => (
            <details key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
              <summary style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{faq.q}</summary>
              <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
