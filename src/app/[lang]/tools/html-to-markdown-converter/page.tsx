'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import Link from 'next/link';
import { useLang } from '@/i18n/LangContext';

function htmlToMarkdown(html: string): string {
  let md = html;
  // Remove scripts and styles
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Convert headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, c) => `# ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, c) => `## ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, c) => `### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, c) => `#### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, (_, c) => `##### ${stripTags(c).trim()}\n\n`);
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, (_, c) => `###### ${stripTags(c).trim()}\n\n`);
  // Bold and italic
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, c) => `**${c}**`);
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, c) => `*${c}*`);
  // Strikethrough
  md = md.replace(/<(del|s|strike)[^>]*>([\s\S]*?)<\/\1>/gi, (_, _t, c) => `~~${c}~~`);
  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, c) => `\n\`\`\`\n${decodeHtmlEntities(c).trim()}\n\`\`\`\n\n`);
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, c) => `\n\`\`\`\n${decodeHtmlEntities(stripTags(c)).trim()}\n\`\`\`\n\n`);
  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => `\`${decodeHtmlEntities(c)}\``);
  // Links
  md = md.replace(/<a[^>]+href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => `[${stripTags(text).trim()}](${href})`);
  // Images
  md = md.replace(/<img[^>]+src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, (_, src, alt) => `![${alt}](${src})`);
  md = md.replace(/<img[^>]+alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, (_, alt, src) => `![${alt}](${src})`);
  md = md.replace(/<img[^>]+src=["']([^"']*)["'][^>]*\/?>/gi, (_, src) => `![](${src})`);
  // Blockquote
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, c) => {
    const text = stripTags(c).trim().split('\n').map((l: string) => `> ${l.trim()}`).join('\n');
    return `\n${text}\n\n`;
  });
  // Horizontal rule
  md = md.replace(/<hr[^>]*\/?>/gi, '\n---\n\n');
  // Lists - unordered
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_, c) => {
    const items = c.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n' + items.map((item: string) => `- ${stripTags(item.replace(/<li[^>]*>/i, '').replace(/<\/li>/i, '')).trim()}`).join('\n') + '\n\n';
  });
  // Lists - ordered
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_, c) => {
    const items = c.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
    return '\n' + items.map((item: string, i: number) => `${i + 1}. ${stripTags(item.replace(/<li[^>]*>/i, '').replace(/<\/li>/i, '')).trim()}`).join('\n') + '\n\n';
  });
  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_, c) => `${c.trim()}\n\n`);
  // Line breaks
  md = md.replace(/<br[^>]*\/?>/gi, '  \n');
  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_, tableContent) => {
    const rows = tableContent.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    if (rows.length === 0) return '';
    const result: string[] = [];
    rows.forEach((row: string, rowIndex: number) => {
      const cells = row.match(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      const cellTexts = cells.map((cell: string) => stripTags(cell.replace(/<(td|th)[^>]*>/i, '').replace(/<\/(td|th)>/i, '')).trim());
      result.push('| ' + cellTexts.join(' | ') + ' |');
      if (rowIndex === 0) {
        result.push('| ' + cellTexts.map(() => '---').join(' | ') + ' |');
      }
    });
    return '\n' + result.join('\n') + '\n\n';
  });
  // Remove remaining tags
  md = md.replace(/<[^>]+>/g, '');
  // Decode entities
  md = decodeHtmlEntities(md);
  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'HTML to Markdown Converter',
    description: 'Convert HTML to Markdown online for free. Supports headings, links, images, lists, tables, code blocks, and more.',
    htmlLabel: 'HTML Input',
    htmlPlaceholder: '<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>',
    mdLabel: 'Markdown Output',
    convertBtn: 'Convert',
    clear: 'Clear',
    sampleBtn: 'Load Sample',
    autoConvert: 'Auto-convert as you type',
    previewLabel: 'Preview',
    supportedTitle: 'Supported HTML Elements',
    sup1: 'Headings (h1-h6)',
    sup2: 'Bold, italic, strikethrough',
    sup3: 'Links and images',
    sup4: 'Ordered and unordered lists',
    sup5: 'Code blocks and inline code',
    sup6: 'Tables',
    sup7: 'Blockquotes',
    sup8: 'Horizontal rules',
    introTitle: 'Free HTML to Markdown Converter',
    introText: 'Convert any HTML content to clean Markdown syntax. Perfect for migrating blog posts, documentation, or web content to Markdown-based platforms like GitHub, Jekyll, Hugo, Notion, or Obsidian. All processing happens in your browser -- your data never leaves your device.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What HTML elements are supported?',
    faq1a: 'This converter supports headings (h1-h6), paragraphs, bold/italic/strikethrough, links, images, ordered and unordered lists, code blocks, inline code, blockquotes, tables, and horizontal rules. Unsupported tags are stripped.',
    faq2q: 'Why convert HTML to Markdown?',
    faq2a: 'Markdown is simpler, more readable, and widely used in developer documentation, README files, blogs (Jekyll, Hugo), note-taking apps (Obsidian, Notion), and version control. Converting HTML to Markdown makes content portable and easier to maintain.',
    faq3q: 'Is the conversion accurate?',
    faq3a: 'The converter handles most common HTML patterns accurately. Complex nested structures or highly customized HTML may need minor manual adjustments after conversion.',
    faq4q: 'Is my data safe?',
    faq4a: 'Yes, all conversion happens locally in your browser using JavaScript. No data is sent to any server.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'HTML 转 Markdown 转换器',
    description: '免费在线将 HTML 转换为 Markdown。支持标题、链接、图片、列表、表格、代码块等。',
    htmlLabel: 'HTML 输入', htmlPlaceholder: '<h1>你好世界</h1>\n<p>这是 <strong>粗体</strong> 和 <em>斜体</em> 段落。</p>',
    mdLabel: 'Markdown 输出', convertBtn: '转换', clear: '清除', sampleBtn: '加载示例',
    autoConvert: '输入时自动转换', previewLabel: '预览',
    supportedTitle: '支持的 HTML 元素', sup1: '标题 (h1-h6)', sup2: '粗体、斜体、删除线', sup3: '链接和图片',
    sup4: '有序和无序列表', sup5: '代码块和行内代码', sup6: '表格', sup7: '引用', sup8: '水平线',
    introTitle: '免费 HTML 转 Markdown 转换器', introText: '将任何 HTML 内容转换为干净的 Markdown 语法。适合将博客文章、文档或网页内容迁移到基于 Markdown 的平台。',
    faqTitle: '常见问题',
    faq1q: '支持哪些 HTML 元素？', faq1a: '支持标题、段落、粗体/斜体/删除线、链接、图片、列表、代码块、引用、表格和水平线。',
    faq2q: '为什么要将 HTML 转换为 Markdown？', faq2a: 'Markdown 更简单、可读性更强，广泛用于开发者文档、README 文件和博客。',
    faq3q: '转换准确吗？', faq3a: '转换器能准确处理大多数常见 HTML 模式。复杂的嵌套结构可能需要手动调整。',
    faq4q: '数据安全吗？', faq4a: '是的，所有转换都在浏览器中本地进行。',
    relatedTitle: '相关工具',
  },
  fr: {
    title: 'Convertisseur HTML vers Markdown',
    description: 'Convertissez HTML en Markdown en ligne gratuitement.',
    htmlLabel: 'Entree HTML', htmlPlaceholder: '<h1>Bonjour</h1>\n<p>Texte <strong>gras</strong></p>',
    mdLabel: 'Sortie Markdown', convertBtn: 'Convertir', clear: 'Effacer', sampleBtn: 'Exemple',
    autoConvert: 'Convertir automatiquement', previewLabel: 'Apercu',
    supportedTitle: 'Elements supportes', sup1: 'Titres (h1-h6)', sup2: 'Gras, italique, barre', sup3: 'Liens et images',
    sup4: 'Listes', sup5: 'Code', sup6: 'Tableaux', sup7: 'Citations', sup8: 'Lignes horizontales',
    introTitle: 'Convertisseur HTML Markdown gratuit', introText: 'Convertissez tout contenu HTML en syntaxe Markdown propre.',
    faqTitle: 'Questions frequentes',
    faq1q: 'Quels elements HTML sont supportes ?', faq1a: 'Titres, paragraphes, gras/italique, liens, images, listes, code, citations, tableaux.',
    faq2q: 'Pourquoi convertir ?', faq2a: 'Markdown est plus simple et utilise partout dans la documentation developpeur.',
    faq3q: 'La conversion est-elle precise ?', faq3a: 'Oui, pour la plupart des structures HTML courantes.',
    faq4q: 'Mes donnees sont-elles securisees ?', faq4a: 'Oui, tout se fait dans votre navigateur.',
    relatedTitle: 'Outils connexes',
  },
  de: {
    title: 'HTML zu Markdown Konverter',
    description: 'Konvertieren Sie HTML online kostenlos in Markdown.',
    htmlLabel: 'HTML Eingabe', htmlPlaceholder: '<h1>Hallo Welt</h1>\n<p>Text <strong>fett</strong></p>',
    mdLabel: 'Markdown Ausgabe', convertBtn: 'Konvertieren', clear: 'Loeschen', sampleBtn: 'Beispiel',
    autoConvert: 'Automatisch konvertieren', previewLabel: 'Vorschau',
    supportedTitle: 'Unterstuetzte Elemente', sup1: 'Ueberschriften (h1-h6)', sup2: 'Fett, kursiv, durchgestrichen', sup3: 'Links und Bilder',
    sup4: 'Listen', sup5: 'Code', sup6: 'Tabellen', sup7: 'Zitate', sup8: 'Horizontale Linien',
    introTitle: 'Kostenloser HTML zu Markdown Konverter', introText: 'Konvertieren Sie beliebige HTML-Inhalte in Markdown-Syntax.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Welche HTML-Elemente werden unterstuetzt?', faq1a: 'Ueberschriften, Absaetze, Fett/Kursiv, Links, Bilder, Listen, Code, Zitate, Tabellen.',
    faq2q: 'Warum konvertieren?', faq2a: 'Markdown ist einfacher und weit verbreitet in der Entwicklerdokumentation.',
    faq3q: 'Ist die Konvertierung genau?', faq3a: 'Ja, fuer die meisten gaengigen HTML-Strukturen.',
    faq4q: 'Sind meine Daten sicher?', faq4a: 'Ja, alles laeuft in Ihrem Browser.',
    relatedTitle: 'Verwandte Tools',
  },
  es: {
    title: 'Convertidor HTML a Markdown',
    description: 'Convierta HTML a Markdown en linea gratis.',
    htmlLabel: 'Entrada HTML', htmlPlaceholder: '<h1>Hola Mundo</h1>\n<p>Texto <strong>negrita</strong></p>',
    mdLabel: 'Salida Markdown', convertBtn: 'Convertir', clear: 'Limpiar', sampleBtn: 'Ejemplo',
    autoConvert: 'Convertir automaticamente', previewLabel: 'Vista previa',
    supportedTitle: 'Elementos soportados', sup1: 'Encabezados (h1-h6)', sup2: 'Negrita, cursiva, tachado', sup3: 'Enlaces e imagenes',
    sup4: 'Listas', sup5: 'Codigo', sup6: 'Tablas', sup7: 'Citas', sup8: 'Lineas horizontales',
    introTitle: 'Convertidor HTML a Markdown gratuito', introText: 'Convierta cualquier contenido HTML a sintaxis Markdown limpia.',
    faqTitle: 'Preguntas frecuentes',
    faq1q: 'Que elementos HTML se soportan?', faq1a: 'Encabezados, parrafos, negrita/cursiva, enlaces, imagenes, listas, codigo, citas, tablas.',
    faq2q: 'Por que convertir?', faq2a: 'Markdown es mas simple y ampliamente utilizado en documentacion de desarrolladores.',
    faq3q: 'Es precisa la conversion?', faq3a: 'Si, para la mayoria de las estructuras HTML comunes.',
    faq4q: 'Mis datos estan seguros?', faq4a: 'Si, todo se procesa localmente.',
    relatedTitle: 'Herramientas relacionadas',
  },
  it: {
    title: 'Convertitore HTML a Markdown',
    description: 'Converti HTML in Markdown online gratis.',
    htmlLabel: 'Input HTML', htmlPlaceholder: '<h1>Ciao Mondo</h1>\n<p>Testo <strong>grassetto</strong></p>',
    mdLabel: 'Output Markdown', convertBtn: 'Converti', clear: 'Cancella', sampleBtn: 'Esempio',
    autoConvert: 'Converti automaticamente', previewLabel: 'Anteprima',
    supportedTitle: 'Elementi supportati', sup1: 'Intestazioni (h1-h6)', sup2: 'Grassetto, corsivo, barrato', sup3: 'Link e immagini',
    sup4: 'Liste', sup5: 'Codice', sup6: 'Tabelle', sup7: 'Citazioni', sup8: 'Linee orizzontali',
    introTitle: 'Convertitore HTML Markdown gratuito', introText: 'Converti qualsiasi contenuto HTML in sintassi Markdown pulita.',
    faqTitle: 'Domande frequenti',
    faq1q: 'Quali elementi HTML sono supportati?', faq1a: 'Intestazioni, paragrafi, grassetto/corsivo, link, immagini, liste, codice, citazioni, tabelle.',
    faq2q: 'Perche convertire?', faq2a: 'Markdown e piu semplice e ampiamente usato nella documentazione.',
    faq3q: 'La conversione e accurata?', faq3a: 'Si, per la maggior parte delle strutture HTML comuni.',
    faq4q: 'I miei dati sono sicuri?', faq4a: 'Si, tutto avviene nel tuo browser.',
    relatedTitle: 'Strumenti correlati',
  },
  pt: {
    title: 'Conversor HTML para Markdown', description: 'Converta HTML para Markdown online gratis.',
    htmlLabel: 'Entrada HTML', htmlPlaceholder: '<h1>Ola Mundo</h1>', mdLabel: 'Saida Markdown',
    convertBtn: 'Converter', clear: 'Limpar', sampleBtn: 'Exemplo', autoConvert: 'Converter automaticamente', previewLabel: 'Pre-visualizacao',
    supportedTitle: 'Elementos suportados', sup1: 'Titulos', sup2: 'Negrito, italico', sup3: 'Links e imagens',
    sup4: 'Listas', sup5: 'Codigo', sup6: 'Tabelas', sup7: 'Citacoes', sup8: 'Linhas horizontais',
    introTitle: 'Conversor HTML Markdown gratuito', introText: 'Converta qualquer conteudo HTML para Markdown.',
    faqTitle: 'Perguntas frequentes',
    faq1q: 'Que elementos sao suportados?', faq1a: 'Titulos, paragrafos, negrito/italico, links, imagens, listas, codigo, citacoes, tabelas.',
    faq2q: 'Por que converter?', faq2a: 'Markdown e mais simples e amplamente utilizado.',
    faq3q: 'A conversao e precisa?', faq3a: 'Sim, para a maioria das estruturas HTML.',
    faq4q: 'Os dados estao seguros?', faq4a: 'Sim, tudo e processado localmente.',
    relatedTitle: 'Ferramentas relacionadas',
  },
  nl: {
    title: 'HTML naar Markdown Converter', description: 'Converteer HTML naar Markdown online gratis.',
    htmlLabel: 'HTML Invoer', htmlPlaceholder: '<h1>Hallo Wereld</h1>', mdLabel: 'Markdown Uitvoer',
    convertBtn: 'Converteren', clear: 'Wissen', sampleBtn: 'Voorbeeld', autoConvert: 'Automatisch converteren', previewLabel: 'Voorbeeld',
    supportedTitle: 'Ondersteunde elementen', sup1: 'Koppen', sup2: 'Vet, cursief', sup3: 'Links en afbeeldingen',
    sup4: 'Lijsten', sup5: 'Code', sup6: 'Tabellen', sup7: 'Citaten', sup8: 'Horizontale lijnen',
    introTitle: 'Gratis HTML naar Markdown', introText: 'Converteer HTML-inhoud naar Markdown-syntaxis.',
    faqTitle: 'Veelgestelde vragen',
    faq1q: 'Welke elementen worden ondersteund?', faq1a: 'Koppen, alinea\'s, vet/cursief, links, afbeeldingen, lijsten, code, citaten, tabellen.',
    faq2q: 'Waarom converteren?', faq2a: 'Markdown is eenvoudiger en breed gebruikt.',
    faq3q: 'Is de conversie nauwkeurig?', faq3a: 'Ja, voor de meeste HTML-structuren.',
    faq4q: 'Zijn mijn gegevens veilig?', faq4a: 'Ja, alles draait in uw browser.',
    relatedTitle: 'Gerelateerde tools',
  },
  pl: {
    title: 'Konwerter HTML do Markdown', description: 'Konwertuj HTML na Markdown online za darmo.',
    htmlLabel: 'Wejscie HTML', htmlPlaceholder: '<h1>Witaj Swiecie</h1>', mdLabel: 'Wyjscie Markdown',
    convertBtn: 'Konwertuj', clear: 'Wyczysc', sampleBtn: 'Przyklad', autoConvert: 'Automatyczna konwersja', previewLabel: 'Podglad',
    supportedTitle: 'Obslugiwane elementy', sup1: 'Naglowki', sup2: 'Pogrubienie, kursywa', sup3: 'Linki i obrazy',
    sup4: 'Listy', sup5: 'Kod', sup6: 'Tabele', sup7: 'Cytaty', sup8: 'Linie poziome',
    introTitle: 'Darmowy konwerter HTML do Markdown', introText: 'Konwertuj dowolna zawartosc HTML na skladnie Markdown.',
    faqTitle: 'Czesto zadawane pytania',
    faq1q: 'Jakie elementy sa obslugiwane?', faq1a: 'Naglowki, akapity, pogrubienie/kursywa, linki, obrazy, listy, kod, cytaty, tabele.',
    faq2q: 'Dlaczego konwertowac?', faq2a: 'Markdown jest prostszy i szeroko uzywany.',
    faq3q: 'Czy konwersja jest dokladna?', faq3a: 'Tak, dla wiekszosci struktur HTML.',
    faq4q: 'Czy dane sa bezpieczne?', faq4a: 'Tak, wszystko dziala lokalnie.',
    relatedTitle: 'Powiazane narzedzia',
  },
  sv: {
    title: 'HTML till Markdown Konverterare', description: 'Konvertera HTML till Markdown online gratis.',
    htmlLabel: 'HTML Indata', htmlPlaceholder: '<h1>Hej Varlden</h1>', mdLabel: 'Markdown Utdata',
    convertBtn: 'Konvertera', clear: 'Rensa', sampleBtn: 'Exempel', autoConvert: 'Konvertera automatiskt', previewLabel: 'Forhandsvisning',
    supportedTitle: 'Stodda element', sup1: 'Rubriker', sup2: 'Fet, kursiv', sup3: 'Lankar och bilder',
    sup4: 'Listor', sup5: 'Kod', sup6: 'Tabeller', sup7: 'Citat', sup8: 'Horisontella linjer',
    introTitle: 'Gratis HTML till Markdown', introText: 'Konvertera HTML-innehall till Markdown-syntax.',
    faqTitle: 'Vanliga fragor',
    faq1q: 'Vilka element stods?', faq1a: 'Rubriker, stycken, fet/kursiv, lankar, bilder, listor, kod, citat, tabeller.',
    faq2q: 'Varfor konvertera?', faq2a: 'Markdown ar enklare och brett anvant.',
    faq3q: 'Ar konverteringen korrekt?', faq3a: 'Ja, for de flesta HTML-strukturer.',
    faq4q: 'Ar data sakra?', faq4a: 'Ja, allt kor i din webblasare.',
    relatedTitle: 'Relaterade verktyg',
  },
  no: {
    title: 'HTML til Markdown Konverterer', description: 'Konverter HTML til Markdown online gratis.',
    htmlLabel: 'HTML Inndata', htmlPlaceholder: '<h1>Hei Verden</h1>', mdLabel: 'Markdown Utdata',
    convertBtn: 'Konverter', clear: 'Toemm', sampleBtn: 'Eksempel', autoConvert: 'Konverter automatisk', previewLabel: 'Forhandsvisning',
    supportedTitle: 'Stottede elementer', sup1: 'Overskrifter', sup2: 'Fet, kursiv', sup3: 'Lenker og bilder',
    sup4: 'Lister', sup5: 'Kode', sup6: 'Tabeller', sup7: 'Sitater', sup8: 'Horisontale linjer',
    introTitle: 'Gratis HTML til Markdown', introText: 'Konverter HTML-innhold til Markdown-syntaks.',
    faqTitle: 'Ofte stilte sporsmal',
    faq1q: 'Hvilke elementer stottes?', faq1a: 'Overskrifter, avsnitt, fet/kursiv, lenker, bilder, lister, kode, sitater, tabeller.',
    faq2q: 'Hvorfor konvertere?', faq2a: 'Markdown er enklere og mye brukt.',
    faq3q: 'Er konverteringen noyaktig?', faq3a: 'Ja, for de fleste HTML-strukturer.',
    faq4q: 'Er dataene trygge?', faq4a: 'Ja, alt kjorer i nettleseren.',
    relatedTitle: 'Relaterte verktoy',
  },
  ja: {
    title: 'HTML から Markdown コンバーター', description: 'HTMLをMarkdownにオンラインで無料変換。',
    htmlLabel: 'HTML 入力', htmlPlaceholder: '<h1>こんにちは</h1>', mdLabel: 'Markdown 出力',
    convertBtn: '変換', clear: 'クリア', sampleBtn: 'サンプル', autoConvert: '自動変換', previewLabel: 'プレビュー',
    supportedTitle: '対応要素', sup1: '見出し', sup2: '太字、斜体', sup3: 'リンクと画像',
    sup4: 'リスト', sup5: 'コード', sup6: 'テーブル', sup7: '引用', sup8: '水平線',
    introTitle: '無料 HTML Markdown コンバーター', introText: 'HTMLコンテンツをMarkdown構文に変換します。',
    faqTitle: 'よくある質問',
    faq1q: 'どの要素に対応していますか？', faq1a: '見出し、段落、太字/斜体、リンク、画像、リスト、コード、引用、テーブル。',
    faq2q: 'なぜ変換するのですか？', faq2a: 'Markdownはシンプルで広く使われています。',
    faq3q: '変換は正確ですか？', faq3a: 'はい、一般的なHTML構造に対して正確です。',
    faq4q: 'データは安全ですか？', faq4a: 'はい、ブラウザでローカルに実行されます。',
    relatedTitle: '関連ツール',
  },
  ko: {
    title: 'HTML to Markdown 변환기', description: 'HTML을 Markdown으로 무료 온라인 변환.',
    htmlLabel: 'HTML 입력', htmlPlaceholder: '<h1>안녕하세요</h1>', mdLabel: 'Markdown 출력',
    convertBtn: '변환', clear: '지우기', sampleBtn: '예제', autoConvert: '자동 변환', previewLabel: '미리보기',
    supportedTitle: '지원 요소', sup1: '제목', sup2: '굵게, 기울임', sup3: '링크와 이미지',
    sup4: '목록', sup5: '코드', sup6: '표', sup7: '인용', sup8: '수평선',
    introTitle: '무료 HTML Markdown 변환기', introText: 'HTML 콘텐츠를 Markdown 구문으로 변환합니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: '어떤 요소가 지원되나요?', faq1a: '제목, 단락, 굵게/기울임, 링크, 이미지, 목록, 코드, 인용, 표.',
    faq2q: '왜 변환하나요?', faq2a: 'Markdown은 더 간단하고 널리 사용됩니다.',
    faq3q: '변환이 정확한가요?', faq3a: '네, 대부분의 HTML 구조에 대해 정확합니다.',
    faq4q: '데이터는 안전한가요?', faq4a: '네, 브라우저에서 로컬로 실행됩니다.',
    relatedTitle: '관련 도구',
  },
  id: {
    title: 'Konverter HTML ke Markdown', description: 'Konversi HTML ke Markdown online gratis.',
    htmlLabel: 'Input HTML', htmlPlaceholder: '<h1>Halo Dunia</h1>', mdLabel: 'Output Markdown',
    convertBtn: 'Konversi', clear: 'Hapus', sampleBtn: 'Contoh', autoConvert: 'Konversi otomatis', previewLabel: 'Pratinjau',
    supportedTitle: 'Elemen yang didukung', sup1: 'Judul', sup2: 'Tebal, miring', sup3: 'Tautan dan gambar',
    sup4: 'Daftar', sup5: 'Kode', sup6: 'Tabel', sup7: 'Kutipan', sup8: 'Garis horizontal',
    introTitle: 'Konverter HTML Markdown Gratis', introText: 'Konversi konten HTML ke sintaks Markdown.',
    faqTitle: 'Pertanyaan yang sering diajukan',
    faq1q: 'Elemen apa saja yang didukung?', faq1a: 'Judul, paragraf, tebal/miring, tautan, gambar, daftar, kode, kutipan, tabel.',
    faq2q: 'Mengapa mengkonversi?', faq2a: 'Markdown lebih sederhana dan banyak digunakan.',
    faq3q: 'Apakah konversi akurat?', faq3a: 'Ya, untuk sebagian besar struktur HTML.',
    faq4q: 'Apakah data aman?', faq4a: 'Ya, semua berjalan di browser Anda.',
    relatedTitle: 'Alat terkait',
  },
  th: {
    title: 'ตัวแปลง HTML เป็น Markdown', description: 'แปลง HTML เป็น Markdown ออนไลน์ฟรี',
    htmlLabel: 'อินพุต HTML', htmlPlaceholder: '<h1>สวัสดี</h1>', mdLabel: 'เอาต์พุต Markdown',
    convertBtn: 'แปลง', clear: 'ล้าง', sampleBtn: 'ตัวอย่าง', autoConvert: 'แปลงอัตโนมัติ', previewLabel: 'ตัวอย่าง',
    supportedTitle: 'องค์ประกอบที่รองรับ', sup1: 'หัวข้อ', sup2: 'ตัวหนา ตัวเอียง', sup3: 'ลิงก์และรูปภาพ',
    sup4: 'รายการ', sup5: 'โค้ด', sup6: 'ตาราง', sup7: 'อ้างอิง', sup8: 'เส้นแนวนอน',
    introTitle: 'ตัวแปลง HTML Markdown ฟรี', introText: 'แปลงเนื้อหา HTML เป็นไวยากรณ์ Markdown',
    faqTitle: 'คำถามที่พบบ่อย',
    faq1q: 'รองรับองค์ประกอบอะไรบ้าง?', faq1a: 'หัวข้อ ย่อหน้า ตัวหนา/เอียง ลิงก์ รูปภาพ รายการ โค้ด อ้างอิง ตาราง',
    faq2q: 'ทำไมต้องแปลง?', faq2a: 'Markdown ง่ายกว่าและใช้กันอย่างแพร่หลาย',
    faq3q: 'การแปลงถูกต้องหรือไม่?', faq3a: 'ใช่ สำหรับโครงสร้าง HTML ส่วนใหญ่',
    faq4q: 'ข้อมูลปลอดภัยหรือไม่?', faq4a: 'ใช่ ทุกอย่างทำงานในเบราว์เซอร์',
    relatedTitle: 'เครื่องมือที่เกี่ยวข้อง',
  },
};

const sampleHtml = `<h1>Welcome to My Blog</h1>
<p>This is a <strong>comprehensive</strong> guide to <em>web development</em>.</p>

<h2>Table of Contents</h2>
<ol>
  <li>Introduction</li>
  <li>Getting Started</li>
  <li>Advanced Topics</li>
</ol>

<h2>Code Example</h2>
<pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>

<p>Visit <a href="https://example.com">our website</a> for more info.</p>

<h2>Features</h2>
<ul>
  <li>Fast and lightweight</li>
  <li>Easy to use</li>
  <li>Open source</li>
</ul>

<blockquote>The best way to predict the future is to create it.</blockquote>

<h2>Comparison Table</h2>
<table>
  <tr><th>Feature</th><th>HTML</th><th>Markdown</th></tr>
  <tr><td>Readability</td><td>Moderate</td><td>High</td></tr>
  <tr><td>Complexity</td><td>High</td><td>Low</td></tr>
</table>

<hr>
<p>Thanks for reading! <img src="https://example.com/smile.png" alt="Smile"></p>`;

export default function HtmlToMarkdownConverter() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [htmlInput, setHtmlInput] = useState('');
  const [mdOutput, setMdOutput] = useState('');
  const [autoMode, setAutoMode] = useState(true);

  const convert = useCallback((input: string) => {
    if (!input.trim()) { setMdOutput(''); return; }
    setMdOutput(htmlToMarkdown(input));
  }, []);

  const handleInputChange = (val: string) => {
    setHtmlInput(val);
    if (autoMode) convert(val);
  };

  const loadSample = () => {
    setHtmlInput(sampleHtml);
    convert(sampleHtml);
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
    <ToolLayout title={t.title} description={t.description} toolId="html-to-markdown-converter">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={() => convert(htmlInput)} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={() => { setHtmlInput(''); setMdOutput(''); }} className="btn btn-secondary">{t.clear}</button>
        <button onClick={loadSample} className="btn btn-secondary">{t.sampleBtn}</button>
        <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, cursor: 'pointer' }}>
          <input type="checkbox" checked={autoMode} onChange={e => setAutoMode(e.target.checked)} />
          {t.autoConvert}
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.htmlLabel}</label>
          <textarea
            value={htmlInput}
            onChange={e => handleInputChange(e.target.value)}
            placeholder={t.htmlPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.mdLabel}</label>
            {mdOutput && <CopyButton text={mdOutput} />}
          </div>
          <textarea
            value={mdOutput}
            readOnly
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 13, background: 'var(--bg-input)' }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{t.introText}</p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{t.supportedTitle}</h3>
        <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24, paddingLeft: 20 }}>
          <li>{t.sup1}</li><li>{t.sup2}</li><li>{t.sup3}</li><li>{t.sup4}</li>
          <li>{t.sup5}</li><li>{t.sup6}</li><li>{t.sup7}</li><li>{t.sup8}</li>
        </ul>

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
            { href: `/${lang}/tools/markdown-to-html`, label: 'Markdown to HTML' },
            { href: `/${lang}/tools/html-beautifier`, label: 'HTML Beautifier' },
            { href: `/${lang}/tools/html-entity-encoder`, label: 'HTML Entity Encoder' },
            { href: `/${lang}/tools/json-formatter`, label: 'JSON Formatter' },
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
