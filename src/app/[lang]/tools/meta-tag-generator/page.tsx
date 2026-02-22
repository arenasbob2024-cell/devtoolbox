'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ui: Record<string, Record<string, string>> = {
  en: {
    title: 'Meta Tag Generator', description: 'Generate complete HTML meta tags for SEO, Open Graph, and Twitter Cards instantly.',
    basic: 'Basic SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Preview', output: 'Generated HTML',
    pageTitle: 'Page Title', titleCount: 'characters (recommended: 50-60)',
    pageDesc: 'Page Description', descCount: 'characters (recommended: 150-160)',
    keywords: 'Keywords', keywordsHint: 'Comma-separated keywords',
    author: 'Author', robots: 'Robots', canonical: 'Canonical URL',
    ogType: 'OG Type', ogImage: 'OG Image URL', ogTitle: 'OG Title', ogDesc: 'OG Description', ogSiteName: 'Site Name', ogUrl: 'Page URL',
    twCard: 'Card Type', twSite: 'Twitter @site', twCreator: 'Twitter @creator', twImage: 'Twitter Image URL',
    generate: 'Generate Meta Tags', loadSample: 'Load Sample', clear: 'Clear',
    article: 'article', website: 'website', product: 'product',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: 'Free HTML Meta Tag Generator for SEO',
    introText: 'Generate all the essential HTML meta tags for your web pages with this free tool. Meta tags help search engines understand your content, control how your pages appear in search results, and define how they look when shared on social media. This generator creates tags for basic SEO, Open Graph (Facebook, LinkedIn), and Twitter Card protocols.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Why are meta tags important for SEO?', faq1a: 'Meta tags provide search engines with information about your page. The title tag is one of the most important SEO factors and appears in search results. The meta description, while not a ranking factor, significantly affects click-through rates from search results. Structured meta tags also enable rich snippets and social media previews.',
    faq2q: 'What is the ideal meta title length?', faq2a: 'Google typically displays 50-60 characters of a page title. Longer titles get cut off with an ellipsis. For best results, place important keywords near the beginning of the title and keep it under 60 characters. Some SEO tools measure pixel width rather than character count (around 600px maximum).',
    faq3q: 'What is the ideal meta description length?', faq3a: 'Google displays meta descriptions up to about 155-160 characters (though this varies). Longer descriptions are truncated. The ideal length is 120-160 characters. Note that Google may rewrite your meta description if it thinks another snippet from the page is more relevant to the search query.',
    faq4q: 'What are Open Graph meta tags?', faq4a: 'Open Graph (OG) meta tags were introduced by Facebook to control how URLs are displayed when shared on social media. They define the title, description, image, and type of your content for social sharing. Other platforms like LinkedIn, Slack, and Twitter also use OG tags as a fallback.',
    faq5q: 'What are Twitter Card meta tags?', faq5a: 'Twitter Card meta tags define how your content appears when shared on Twitter. They override Open Graph tags for Twitter-specific display. The "summary_large_image" card type shows a large image with title and description, making it the most popular choice for blog posts and articles.',
  },
  fr: {
    title: 'Generateur de Balises Meta', description: 'Generez des balises meta HTML completes pour le SEO, Open Graph et Twitter Cards.',
    basic: 'SEO Basique', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Apercu', output: 'HTML Genere',
    pageTitle: 'Titre de Page', titleCount: 'caracteres (recommande: 50-60)',
    pageDesc: 'Description de Page', descCount: 'caracteres (recommande: 150-160)',
    keywords: 'Mots-cles', keywordsHint: 'Mots-cles separes par des virgules',
    author: 'Auteur', robots: 'Robots', canonical: 'URL Canonique',
    ogType: 'Type OG', ogImage: 'URL Image OG', ogTitle: 'Titre OG', ogDesc: 'Description OG', ogSiteName: 'Nom du Site', ogUrl: 'URL de Page',
    twCard: 'Type de Carte', twSite: 'Twitter @site', twCreator: 'Twitter @createur', twImage: 'URL Image Twitter',
    generate: 'Generer les Balises', loadSample: 'Exemple', clear: 'Effacer',
    article: 'article', website: 'site web', product: 'produit',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: 'Generateur de Balises Meta HTML Gratuites',
    introText: 'Generez toutes les balises meta HTML essentielles pour vos pages web.',
    faqTitle: 'Questions Frequemment Posees',
    faq1q: 'Pourquoi les balises meta sont-elles importantes?', faq1a: 'Les balises meta informent les moteurs de recherche sur votre page et affectent les taux de clics.',
    faq2q: 'Longueur ideale du titre meta?', faq2a: 'Google affiche generalement 50-60 caracteres. Restez sous 60 caracteres.',
    faq3q: 'Longueur ideale de la description meta?', faq3a: 'Google affiche environ 155-160 caracteres. Idealement 120-160 caracteres.',
    faq4q: 'Que sont les balises Open Graph?', faq4a: 'Les balises OG controlent comment les URL apparaissent sur les reseaux sociaux.',
    faq5q: 'Que sont les balises Twitter Card?', faq5a: 'Les balises Twitter Card definissent l\'apparence de votre contenu sur Twitter.',
  },
  de: {
    title: 'Meta-Tag Generator', description: 'Generieren Sie vollstandige HTML-Meta-Tags fuer SEO, Open Graph und Twitter Cards.',
    basic: 'Basis SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Vorschau', output: 'Generierter HTML',
    pageTitle: 'Seitentitel', titleCount: 'Zeichen (empfohlen: 50-60)',
    pageDesc: 'Seitenbeschreibung', descCount: 'Zeichen (empfohlen: 150-160)',
    keywords: 'Schlagworter', keywordsHint: 'Durch Kommas getrennte Schlagworter',
    author: 'Autor', robots: 'Robots', canonical: 'Kanonische URL',
    ogType: 'OG Typ', ogImage: 'OG Bild URL', ogTitle: 'OG Titel', ogDesc: 'OG Beschreibung', ogSiteName: 'Seitenname', ogUrl: 'Seiten URL',
    twCard: 'Kartentyp', twSite: 'Twitter @seite', twCreator: 'Twitter @ersteller', twImage: 'Twitter Bild URL',
    generate: 'Meta-Tags Generieren', loadSample: 'Beispiel', clear: 'Loeschen',
    article: 'artikel', website: 'webseite', product: 'produkt',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: 'Kostenloser HTML Meta-Tag Generator fuer SEO',
    introText: 'Generieren Sie alle wesentlichen HTML-Meta-Tags fuer Ihre Webseiten.',
    faqTitle: 'Haeufig gestellte Fragen',
    faq1q: 'Warum sind Meta-Tags wichtig?', faq1a: 'Meta-Tags informieren Suchmaschinen ueber Ihre Seite und beeinflussen Klickraten.',
    faq2q: 'Ideale Meta-Titellaenge?', faq2a: 'Google zeigt in der Regel 50-60 Zeichen an. Unter 60 Zeichen bleiben.',
    faq3q: 'Ideale Meta-Beschreibungslaenge?', faq3a: 'Google zeigt etwa 155-160 Zeichen an. Ideal sind 120-160 Zeichen.',
    faq4q: 'Was sind Open-Graph-Tags?', faq4a: 'OG-Tags kontrollieren die Darstellung von URLs in sozialen Netzwerken.',
    faq5q: 'Was sind Twitter Card Tags?', faq5a: 'Twitter Card Tags definieren die Darstellung Ihrer Inhalte auf Twitter.',
  },
  it: { title: 'Generatore Meta Tag', description: 'Genera meta tag HTML completi per SEO, Open Graph e Twitter Cards.', basic: 'SEO Base', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Anteprima', output: 'HTML Generato', pageTitle: 'Titolo Pagina', titleCount: 'caratteri (consigliato: 50-60)', pageDesc: 'Descrizione Pagina', descCount: 'caratteri (consigliato: 150-160)', keywords: 'Parole Chiave', keywordsHint: 'Parole chiave separate da virgola', author: 'Autore', robots: 'Robots', canonical: 'URL Canonico', ogType: 'Tipo OG', ogImage: 'URL Immagine OG', ogTitle: 'Titolo OG', ogDesc: 'Descrizione OG', ogSiteName: 'Nome Sito', ogUrl: 'URL Pagina', twCard: 'Tipo Card', twSite: 'Twitter @sito', twCreator: 'Twitter @autore', twImage: 'URL Immagine Twitter', generate: 'Genera Meta Tag', loadSample: 'Esempio', clear: 'Cancella', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Generatore Meta Tag HTML Gratuito per SEO', introText: 'Genera tutti i meta tag HTML essenziali per le tue pagine web.', faqTitle: 'Domande Frequenti', faq1q: 'Perche i meta tag sono importanti?', faq1a: 'I meta tag informano i motori di ricerca sulla tua pagina e influenzano i tassi di clic.', faq2q: 'Lunghezza ideale del titolo meta?', faq2a: 'Google mostra in genere 50-60 caratteri. Mantieni sotto i 60 caratteri.', faq3q: 'Lunghezza ideale della descrizione meta?', faq3a: 'Google mostra circa 155-160 caratteri. Ideale 120-160 caratteri.', faq4q: 'Cosa sono i tag Open Graph?', faq4a: 'I tag OG controllano come gli URL appaiono sui social media.', faq5q: 'Cosa sono i tag Twitter Card?', faq5a: 'I tag Twitter Card definiscono come appare il tuo contenuto su Twitter.' },
  es: { title: 'Generador de Meta Tags', description: 'Genera meta tags HTML completos para SEO, Open Graph y Twitter Cards.', basic: 'SEO Basico', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Vista Previa', output: 'HTML Generado', pageTitle: 'Titulo de Pagina', titleCount: 'caracteres (recomendado: 50-60)', pageDesc: 'Descripcion de Pagina', descCount: 'caracteres (recomendado: 150-160)', keywords: 'Palabras Clave', keywordsHint: 'Palabras clave separadas por comas', author: 'Autor', robots: 'Robots', canonical: 'URL Canonico', ogType: 'Tipo OG', ogImage: 'URL Imagen OG', ogTitle: 'Titulo OG', ogDesc: 'Descripcion OG', ogSiteName: 'Nombre del Sitio', ogUrl: 'URL de Pagina', twCard: 'Tipo de Tarjeta', twSite: 'Twitter @sitio', twCreator: 'Twitter @creador', twImage: 'URL Imagen Twitter', generate: 'Generar Meta Tags', loadSample: 'Ejemplo', clear: 'Limpiar', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Generador de Meta Tags HTML Gratuito para SEO', introText: 'Genera todos los meta tags HTML esenciales para tus paginas web.', faqTitle: 'Preguntas Frecuentes', faq1q: '¿Por que son importantes los meta tags?', faq1a: 'Los meta tags informan a los motores de busqueda sobre tu pagina y afectan las tasas de clics.', faq2q: '¿Longitud ideal del titulo meta?', faq2a: 'Google muestra tipicamente 50-60 caracteres. Mantenerlo bajo 60 caracteres.', faq3q: '¿Longitud ideal de la descripcion meta?', faq3a: 'Google muestra aproximadamente 155-160 caracteres. Ideal 120-160 caracteres.', faq4q: '¿Que son los Open Graph tags?', faq4a: 'Los tags OG controlan como las URLs aparecen en redes sociales.', faq5q: '¿Que son los Twitter Card tags?', faq5a: 'Los Twitter Card tags definen como aparece tu contenido en Twitter.' },
  pt: { title: 'Gerador de Meta Tags', description: 'Gere meta tags HTML completas para SEO, Open Graph e Twitter Cards.', basic: 'SEO Basico', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Visualizacao', output: 'HTML Gerado', pageTitle: 'Titulo da Pagina', titleCount: 'caracteres (recomendado: 50-60)', pageDesc: 'Descricao da Pagina', descCount: 'caracteres (recomendado: 150-160)', keywords: 'Palavras-chave', keywordsHint: 'Palavras-chave separadas por virgula', author: 'Autor', robots: 'Robots', canonical: 'URL Canonico', ogType: 'Tipo OG', ogImage: 'URL Imagem OG', ogTitle: 'Titulo OG', ogDesc: 'Descricao OG', ogSiteName: 'Nome do Site', ogUrl: 'URL da Pagina', twCard: 'Tipo de Cartao', twSite: 'Twitter @site', twCreator: 'Twitter @criador', twImage: 'URL Imagem Twitter', generate: 'Gerar Meta Tags', loadSample: 'Exemplo', clear: 'Limpar', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Gerador de Meta Tags HTML Gratuito para SEO', introText: 'Gere todos os meta tags HTML essenciais para suas paginas web.', faqTitle: 'Perguntas Frequentes', faq1q: 'Por que os meta tags sao importantes?', faq1a: 'Os meta tags informam os mecanismos de busca sobre sua pagina e afetam as taxas de cliques.', faq2q: 'Comprimento ideal do titulo meta?', faq2a: 'O Google exibe tipicamente 50-60 caracteres. Manter abaixo de 60 caracteres.', faq3q: 'Comprimento ideal da descricao meta?', faq3a: 'O Google exibe cerca de 155-160 caracteres. Ideal 120-160 caracteres.', faq4q: 'O que sao Open Graph tags?', faq4a: 'Os tags OG controlam como as URLs aparecem nas redes sociais.', faq5q: 'O que sao Twitter Card tags?', faq5a: 'Os Twitter Card tags definem como seu conteudo aparece no Twitter.' },
  nl: { title: 'Meta Tag Generator', description: 'Genereer complete HTML meta tags voor SEO, Open Graph en Twitter Cards.', basic: 'Basis SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Voorbeeld', output: 'Gegenereerde HTML', pageTitle: 'Paginatitel', titleCount: 'tekens (aanbevolen: 50-60)', pageDesc: 'Paginabeschrijving', descCount: 'tekens (aanbevolen: 150-160)', keywords: 'Trefwoorden', keywordsHint: 'Door kommas gescheiden trefwoorden', author: 'Auteur', robots: 'Robots', canonical: 'Canonieke URL', ogType: 'OG Type', ogImage: 'OG Afbeelding URL', ogTitle: 'OG Titel', ogDesc: 'OG Beschrijving', ogSiteName: 'Sitenaam', ogUrl: 'Pagina URL', twCard: 'Kaarttype', twSite: 'Twitter @site', twCreator: 'Twitter @maker', twImage: 'Twitter Afbeelding URL', generate: 'Meta Tags Genereren', loadSample: 'Voorbeeld', clear: 'Wissen', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Gratis HTML Meta Tag Generator voor SEO', introText: 'Genereer alle essentiële HTML meta tags voor uw webpaginas.', faqTitle: 'Veelgestelde Vragen', faq1q: 'Waarom zijn meta tags belangrijk?', faq1a: 'Meta tags informeren zoekmachines over uw pagina en beïnvloeden doorklikratio\'s.', faq2q: 'Ideale meta titellengte?', faq2a: 'Google toont doorgaans 50-60 tekens. Onder de 60 tekens houden.', faq3q: 'Ideale meta beschrijvingslengte?', faq3a: 'Google toont ongeveer 155-160 tekens. Ideaal 120-160 tekens.', faq4q: 'Wat zijn Open Graph tags?', faq4a: 'OG tags controleren hoe URLs worden weergegeven op sociale media.', faq5q: 'Wat zijn Twitter Card tags?', faq5a: 'Twitter Card tags bepalen hoe uw inhoud op Twitter verschijnt.' },
  pl: { title: 'Generator Meta Tagow', description: 'Generuj kompletne tagi meta HTML dla SEO, Open Graph i Twitter Cards.', basic: 'Podstawowe SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Podglad', output: 'Wygenerowany HTML', pageTitle: 'Tytul Strony', titleCount: 'znakow (zalecane: 50-60)', pageDesc: 'Opis Strony', descCount: 'znakow (zalecane: 150-160)', keywords: 'Slowa Kluczowe', keywordsHint: 'Slowa kluczowe oddzielone przecinkami', author: 'Autor', robots: 'Robots', canonical: 'Kanoniczny URL', ogType: 'Typ OG', ogImage: 'URL Obrazu OG', ogTitle: 'Tytul OG', ogDesc: 'Opis OG', ogSiteName: 'Nazwa Strony', ogUrl: 'URL Strony', twCard: 'Typ Karty', twSite: 'Twitter @strona', twCreator: 'Twitter @tworca', twImage: 'URL Obrazu Twitter', generate: 'Generuj Meta Tagi', loadSample: 'Przyklad', clear: 'Wyczysc', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Darmowy Generator Meta Tagow HTML dla SEO', introText: 'Generuj wszystkie niezbedne tagi meta HTML dla swoich stron.', faqTitle: 'FAQ', faq1q: 'Dlaczego meta tagi sa wazne?', faq1a: 'Tagi meta informuja wyszukiwarki o stronie i wplywaja na wskazniki klikniecia.', faq2q: 'Idealna dlugosc tytulu?', faq2a: 'Google wyswietla zazwyczaj 50-60 znakow. Utrzymaj ponizej 60 znakow.', faq3q: 'Idealna dlugosc opisu?', faq3a: 'Google wyswietla okolo 155-160 znakow. Idealnie 120-160 znakow.', faq4q: 'Czym sa tagi Open Graph?', faq4a: 'Tagi OG kontroluja sposob wyswietlania URL w mediach spolecznosciowych.', faq5q: 'Czym sa tagi Twitter Card?', faq5a: 'Tagi Twitter Card definiuja wyglad tresci na Twitterze.' },
  sv: { title: 'Meta-Tag Generator', description: 'Generera kompletta HTML meta-taggar for SEO, Open Graph och Twitter Cards.', basic: 'Grundlaggande SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Foerhandsvisning', output: 'Genererad HTML', pageTitle: 'Sidrubrik', titleCount: 'tecken (rekommenderat: 50-60)', pageDesc: 'Sidbeskrivning', descCount: 'tecken (rekommenderat: 150-160)', keywords: 'Nyckelord', keywordsHint: 'Nyckelord separerade med kommatecken', author: 'Forfattare', robots: 'Robots', canonical: 'Kanonisk URL', ogType: 'OG Typ', ogImage: 'OG Bild URL', ogTitle: 'OG Rubrik', ogDesc: 'OG Beskrivning', ogSiteName: 'Webbplatsnamn', ogUrl: 'Sid URL', twCard: 'Korttyp', twSite: 'Twitter @webbplats', twCreator: 'Twitter @skapare', twImage: 'Twitter Bild URL', generate: 'Generera Meta-Taggar', loadSample: 'Exempel', clear: 'Rensa', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Gratis HTML Meta-Tag Generator for SEO', introText: 'Generera alla viktiga HTML meta-taggar for dina webbsidor.', faqTitle: 'Vanliga Fragor', faq1q: 'Varfor ar meta-taggar viktiga?', faq1a: 'Meta-taggar informerar sokmotorer om din sida och paverkar klickfrekvenser.', faq2q: 'Ideal langd pa meta-rubrik?', faq2a: 'Google visar vanligtvis 50-60 tecken. Hall dig under 60 tecken.', faq3q: 'Ideal langd pa meta-beskrivning?', faq3a: 'Google visar cirka 155-160 tecken. Idealt 120-160 tecken.', faq4q: 'Vad ar Open Graph taggar?', faq4a: 'OG taggar kontrollerar hur URL:er visas pa sociala medier.', faq5q: 'Vad ar Twitter Card taggar?', faq5a: 'Twitter Card taggar definierar hur ditt innehall visas pa Twitter.' },
  no: { title: 'Meta-Tag Generator', description: 'Generer komplette HTML meta-tagger for SEO, Open Graph og Twitter Cards.', basic: 'Grunnleggende SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Forhandsvisning', output: 'Generert HTML', pageTitle: 'Sidetittel', titleCount: 'tegn (anbefalt: 50-60)', pageDesc: 'Sidebeskrivelse', descCount: 'tegn (anbefalt: 150-160)', keywords: 'Nokkelord', keywordsHint: 'Nokkelord separert med komma', author: 'Forfatter', robots: 'Robots', canonical: 'Kanonisk URL', ogType: 'OG Type', ogImage: 'OG Bilde URL', ogTitle: 'OG Tittel', ogDesc: 'OG Beskrivelse', ogSiteName: 'Nettstedsnavn', ogUrl: 'Side URL', twCard: 'Korttype', twSite: 'Twitter @nettsted', twCreator: 'Twitter @skaper', twImage: 'Twitter Bilde URL', generate: 'Generer Meta-Tagger', loadSample: 'Eksempel', clear: 'Tom', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Gratis HTML Meta-Tag Generator for SEO', introText: 'Generer alle viktige HTML meta-tagger for nettsidene dine.', faqTitle: 'Vanlige Sporsmal', faq1q: 'Hvorfor er meta-tagger viktige?', faq1a: 'Meta-tagger informerer sokemotorer om siden din og pavirker klikkfrekvenser.', faq2q: 'Ideal lengde pa meta-tittel?', faq2a: 'Google viser vanligvis 50-60 tegn. Hold deg under 60 tegn.', faq3q: 'Ideal lengde pa meta-beskrivelse?', faq3a: 'Google viser rundt 155-160 tegn. Ideelt 120-160 tegn.', faq4q: 'Hva er Open Graph tags?', faq4a: 'OG tags kontrollerer hvordan URL-er vises pa sosiale medier.', faq5q: 'Hva er Twitter Card tags?', faq5a: 'Twitter Card tags definerer hvordan innholdet ditt vises pa Twitter.' },
  zh: {
    title: 'Meta 标签生成器', description: '即时生成完整的 SEO、Open Graph 和 Twitter Card HTML meta 标签。',
    basic: '基础 SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: '预览', output: '生成的 HTML',
    pageTitle: '页面标题', titleCount: '字符（推荐：50-60）',
    pageDesc: '页面描述', descCount: '字符（推荐：150-160）',
    keywords: '关键词', keywordsHint: '逗号分隔的关键词',
    author: '作者', robots: 'Robots', canonical: '规范 URL',
    ogType: 'OG 类型', ogImage: 'OG 图片 URL', ogTitle: 'OG 标题', ogDesc: 'OG 描述', ogSiteName: '网站名称', ogUrl: '页面 URL',
    twCard: '卡片类型', twSite: 'Twitter @网站', twCreator: 'Twitter @作者', twImage: 'Twitter 图片 URL',
    generate: '生成 Meta 标签', loadSample: '加载示例', clear: '清除',
    article: '文章', website: '网站', product: '产品',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: '免费 SEO HTML Meta 标签生成器',
    introText: '使用此工具即时生成网页所需的所有 HTML meta 标签。Meta 标签帮助搜索引擎理解您的内容，控制搜索结果的显示方式，并定义社交媒体分享时的外观。',
    faqTitle: '常见问题',
    faq1q: 'Meta 标签为什么对 SEO 重要？', faq1a: 'Meta 标签为搜索引擎提供页面信息。标题标签是最重要的 SEO 因素之一，出现在搜索结果中。',
    faq2q: 'Meta 标题的理想长度是多少？', faq2a: 'Google 通常显示 50-60 个字符的页面标题。建议保持在 60 个字符以内。',
    faq3q: 'Meta 描述的理想长度是多少？', faq3a: 'Google 显示约 155-160 个字符。建议 120-160 个字符。',
    faq4q: '什么是 Open Graph meta 标签？', faq4a: 'Open Graph 标签控制 URL 在社交媒体上分享时的显示方式，定义标题、描述和图片。',
    faq5q: '什么是 Twitter Card meta 标签？', faq5a: 'Twitter Card 标签定义内容在 Twitter 上分享时的显示方式，可覆盖 Open Graph 标签。',
  },
  ja: {
    title: 'メタタグジェネレーター', description: 'SEO、Open Graph、Twitter Card の HTML メタタグを即時生成します。',
    basic: '基本 SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'プレビュー', output: '生成された HTML',
    pageTitle: 'ページタイトル', titleCount: '文字（推奨: 50-60）',
    pageDesc: 'ページの説明', descCount: '文字（推奨: 150-160）',
    keywords: 'キーワード', keywordsHint: 'カンマ区切りのキーワード',
    author: '著者', robots: 'ロボット', canonical: '正規 URL',
    ogType: 'OG タイプ', ogImage: 'OG 画像 URL', ogTitle: 'OG タイトル', ogDesc: 'OG 説明', ogSiteName: 'サイト名', ogUrl: 'ページ URL',
    twCard: 'カードタイプ', twSite: 'Twitter @サイト', twCreator: 'Twitter @作成者', twImage: 'Twitter 画像 URL',
    generate: 'メタタグを生成', loadSample: 'サンプル', clear: 'クリア',
    article: '記事', website: 'ウェブサイト', product: '製品',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: '無料 SEO 用 HTML メタタグジェネレーター',
    introText: 'Web ページに必要な HTML メタタグをすべて生成します。メタタグは検索エンジンがコンテンツを理解し、ソーシャルメディアでの表示を制御するのに役立ちます。',
    faqTitle: 'よくある質問',
    faq1q: 'メタタグが SEO に重要なのはなぜですか？', faq1a: 'メタタグは検索エンジンにページの情報を提供します。タイトルタグは最も重要な SEO 要素の一つです。',
    faq2q: 'メタタイトルの理想的な長さは？', faq2a: 'Google は通常 50-60 文字を表示します。60 文字以内に抑えてください。',
    faq3q: 'メタ説明の理想的な長さは？', faq3a: 'Google は約 155-160 文字を表示します。120-160 文字が理想的です。',
    faq4q: 'Open Graph メタタグとは何ですか？', faq4a: 'OG タグは URL がソーシャルメディアで共有される際の表示を制御します。',
    faq5q: 'Twitter Card メタタグとは？', faq5a: 'Twitter Card タグは Twitter でのコンテンツの表示を定義します。',
  },
  ko: {
    title: '메타 태그 생성기', description: 'SEO, Open Graph, Twitter Card를 위한 완전한 HTML 메타 태그를 즉시 생성하세요.',
    basic: '기본 SEO', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: '미리보기', output: '생성된 HTML',
    pageTitle: '페이지 제목', titleCount: '자 (권장: 50-60)',
    pageDesc: '페이지 설명', descCount: '자 (권장: 150-160)',
    keywords: '키워드', keywordsHint: '쉼표로 구분된 키워드',
    author: '작성자', robots: '로봇', canonical: '표준 URL',
    ogType: 'OG 유형', ogImage: 'OG 이미지 URL', ogTitle: 'OG 제목', ogDesc: 'OG 설명', ogSiteName: '사이트 이름', ogUrl: '페이지 URL',
    twCard: '카드 유형', twSite: 'Twitter @사이트', twCreator: 'Twitter @작성자', twImage: 'Twitter 이미지 URL',
    generate: '메타 태그 생성', loadSample: '샘플', clear: '초기화',
    article: '기사', website: '웹사이트', product: '제품',
    summaryLarge: 'summary_large_image', summary: 'summary',
    introTitle: '무료 SEO HTML 메타 태그 생성기',
    introText: '웹 페이지에 필요한 모든 HTML 메타 태그를 생성하세요. 메타 태그는 검색 엔진이 콘텐츠를 이해하고 소셜 미디어 공유 시 표시를 제어하는 데 도움이 됩니다.',
    faqTitle: '자주 묻는 질문',
    faq1q: '메타 태그가 SEO에 왜 중요한가요?', faq1a: '메타 태그는 검색 엔진에 페이지에 대한 정보를 제공합니다. 제목 태그는 가장 중요한 SEO 요소 중 하나입니다.',
    faq2q: '메타 제목의 이상적인 길이는?', faq2a: 'Google은 일반적으로 50-60자를 표시합니다. 60자 이내로 유지하세요.',
    faq3q: '메타 설명의 이상적인 길이는?', faq3a: 'Google은 약 155-160자를 표시합니다. 120-160자가 이상적입니다.',
    faq4q: 'Open Graph 메타 태그란 무엇인가요?', faq4a: 'OG 태그는 URL이 소셜 미디어에서 공유될 때의 표시 방식을 제어합니다.',
    faq5q: 'Twitter Card 메타 태그란?', faq5a: 'Twitter Card 태그는 Twitter에서 콘텐츠가 표시되는 방식을 정의합니다.',
  },
  id: { title: 'Generator Meta Tag', description: 'Buat meta tag HTML lengkap untuk SEO, Open Graph, dan Twitter Cards.', basic: 'SEO Dasar', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'Pratinjau', output: 'HTML yang Dihasilkan', pageTitle: 'Judul Halaman', titleCount: 'karakter (disarankan: 50-60)', pageDesc: 'Deskripsi Halaman', descCount: 'karakter (disarankan: 150-160)', keywords: 'Kata Kunci', keywordsHint: 'Kata kunci yang dipisahkan koma', author: 'Penulis', robots: 'Robots', canonical: 'URL Kanonik', ogType: 'Jenis OG', ogImage: 'URL Gambar OG', ogTitle: 'Judul OG', ogDesc: 'Deskripsi OG', ogSiteName: 'Nama Situs', ogUrl: 'URL Halaman', twCard: 'Jenis Kartu', twSite: 'Twitter @situs', twCreator: 'Twitter @pembuat', twImage: 'URL Gambar Twitter', generate: 'Buat Meta Tag', loadSample: 'Contoh', clear: 'Bersihkan', article: 'article', website: 'website', product: 'product', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'Generator Meta Tag HTML Gratis untuk SEO', introText: 'Buat semua meta tag HTML penting untuk halaman web Anda.', faqTitle: 'FAQ', faq1q: 'Mengapa meta tag penting untuk SEO?', faq1a: 'Meta tag memberi tahu mesin pencari tentang halaman Anda dan memengaruhi tingkat klik.', faq2q: 'Panjang judul meta yang ideal?', faq2a: 'Google biasanya menampilkan 50-60 karakter. Pertahankan di bawah 60 karakter.', faq3q: 'Panjang deskripsi meta yang ideal?', faq3a: 'Google menampilkan sekitar 155-160 karakter. Ideal 120-160 karakter.', faq4q: 'Apa itu Open Graph tag?', faq4a: 'Tag OG mengontrol cara URL ditampilkan di media sosial.', faq5q: 'Apa itu Twitter Card tag?', faq5a: 'Tag Twitter Card mendefinisikan cara konten Anda muncul di Twitter.' },
  th: { title: 'ตัวสร้าง Meta Tag', description: 'สร้าง meta tag HTML สมบูรณ์สำหรับ SEO, Open Graph และ Twitter Cards', basic: 'SEO พื้นฐาน', openGraph: 'Open Graph', twitter: 'Twitter Card', preview: 'ตัวอย่าง', output: 'HTML ที่สร้าง', pageTitle: 'ชื่อหน้า', titleCount: 'ตัวอักษร (แนะนำ: 50-60)', pageDesc: 'คำอธิบายหน้า', descCount: 'ตัวอักษร (แนะนำ: 150-160)', keywords: 'คำสำคัญ', keywordsHint: 'คำสำคัญคั่นด้วยเครื่องหมายจุลภาค', author: 'ผู้แต่ง', robots: 'โรบอท', canonical: 'URL Canonical', ogType: 'ประเภท OG', ogImage: 'URL รูปภาพ OG', ogTitle: 'ชื่อ OG', ogDesc: 'คำอธิบาย OG', ogSiteName: 'ชื่อเว็บไซต์', ogUrl: 'URL หน้า', twCard: 'ประเภทการ์ด', twSite: 'Twitter @เว็บไซต์', twCreator: 'Twitter @ผู้สร้าง', twImage: 'URL รูปภาพ Twitter', generate: 'สร้าง Meta Tag', loadSample: 'ตัวอย่าง', clear: 'ล้าง', article: 'บทความ', website: 'เว็บไซต์', product: 'ผลิตภัณฑ์', summaryLarge: 'summary_large_image', summary: 'summary', introTitle: 'ตัวสร้าง Meta Tag HTML ฟรีสำหรับ SEO', introText: 'สร้าง meta tag HTML ที่จำเป็นทั้งหมดสำหรับหน้าเว็บของคุณ', faqTitle: 'คำถามที่พบบ่อย', faq1q: 'ทำไม meta tag ถึงสำคัญสำหรับ SEO?', faq1a: 'Meta tag ให้ข้อมูลเกี่ยวกับหน้าของคุณแก่เครื่องมือค้นหา', faq2q: 'ความยาวชื่อ meta ที่เหมาะสม?', faq2a: 'Google แสดงประมาณ 50-60 ตัวอักษร', faq3q: 'ความยาวคำอธิบาย meta ที่เหมาะสม?', faq3a: 'Google แสดงประมาณ 155-160 ตัวอักษร', faq4q: 'Open Graph tag คืออะไร?', faq4a: 'แท็ก OG ควบคุมวิธีที่ URL แสดงบนโซเชียลมีเดีย', faq5q: 'Twitter Card tag คืออะไร?', faq5a: 'แท็ก Twitter Card กำหนดวิธีที่เนื้อหาของคุณปรากฏบน Twitter' },
};

interface FormData {
  title: string; desc: string; keywords: string; author: string; robots: string; canonical: string;
  ogTitle: string; ogDesc: string; ogImage: string; ogType: string; ogSiteName: string; ogUrl: string;
  twCard: string; twSite: string; twCreator: string; twImage: string;
}

const SAMPLE: FormData = {
  title: 'DevToolBox - Free Developer Tools Online',
  desc: 'A collection of free developer tools including JSON formatter, Base64 encoder, UUID generator, and 200+ more utilities for developers.',
  keywords: 'developer tools, json formatter, base64 encoder, uuid generator, online tools',
  author: 'DevToolBox', robots: 'index, follow', canonical: 'https://viadreams.cc',
  ogTitle: 'DevToolBox - Free Developer Tools Online', ogDesc: 'Free online developer tools for formatting, encoding, converting, and debugging code.', ogImage: 'https://viadreams.cc/og-image.png', ogType: 'website', ogSiteName: 'DevToolBox', ogUrl: 'https://viadreams.cc',
  twCard: 'summary_large_image', twSite: '@devtoolbox', twCreator: '@devtoolbox', twImage: 'https://viadreams.cc/og-image.png',
};

function generateTags(f: FormData): string {
  const lines: string[] = ['<!-- Basic SEO -->'];
  if (f.title) lines.push(`<title>${f.title}</title>`);
  if (f.desc) lines.push(`<meta name="description" content="${f.desc}">`);
  if (f.keywords) lines.push(`<meta name="keywords" content="${f.keywords}">`);
  if (f.author) lines.push(`<meta name="author" content="${f.author}">`);
  if (f.robots) lines.push(`<meta name="robots" content="${f.robots}">`);
  if (f.canonical) lines.push(`<link rel="canonical" href="${f.canonical}">`);
  lines.push('\n<!-- Open Graph -->');
  if (f.ogTitle || f.title) lines.push(`<meta property="og:title" content="${f.ogTitle || f.title}">`);
  if (f.ogDesc || f.desc) lines.push(`<meta property="og:description" content="${f.ogDesc || f.desc}">`);
  if (f.ogType) lines.push(`<meta property="og:type" content="${f.ogType}">`);
  if (f.ogUrl || f.canonical) lines.push(`<meta property="og:url" content="${f.ogUrl || f.canonical}">`);
  if (f.ogImage) lines.push(`<meta property="og:image" content="${f.ogImage}">`);
  if (f.ogSiteName) lines.push(`<meta property="og:site_name" content="${f.ogSiteName}">`);
  lines.push('\n<!-- Twitter Card -->');
  if (f.twCard) lines.push(`<meta name="twitter:card" content="${f.twCard}">`);
  if (f.twSite) lines.push(`<meta name="twitter:site" content="${f.twSite}">`);
  if (f.twCreator) lines.push(`<meta name="twitter:creator" content="${f.twCreator}">`);
  if (f.ogTitle || f.title) lines.push(`<meta name="twitter:title" content="${f.ogTitle || f.title}">`);
  if (f.ogDesc || f.desc) lines.push(`<meta name="twitter:description" content="${f.ogDesc || f.desc}">`);
  if (f.twImage || f.ogImage) lines.push(`<meta name="twitter:image" content="${f.twImage || f.ogImage}">`);
  return lines.join('\n');
}

const EMPTY: FormData = { title: '', desc: '', keywords: '', author: '', robots: 'index, follow', canonical: '', ogTitle: '', ogDesc: '', ogImage: '', ogType: 'website', ogSiteName: '', ogUrl: '', twCard: 'summary_large_image', twSite: '', twCreator: '', twImage: '' };

export default function MetaTagGenerator() {
  const { lang } = useLang();
  const t = ui[lang] || ui.en;
  const [form, setForm] = useState<FormData>(SAMPLE);
  const [activeTab, setActiveTab] = useState<'basic' | 'og' | 'twitter'>('basic');

  const output = generateTags(form);
  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = { width: '100%', padding: '8px 10px', fontSize: 13, marginBottom: 12 };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 };

  return (
    <ToolLayout title={t.title} description={t.description} toolId="meta-tag-generator">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setForm(SAMPLE)} className="btn btn-secondary">{t.loadSample}</button>
        <button onClick={() => setForm(EMPTY)} className="btn btn-secondary">{t.clear}</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
        {([['basic', t.basic], ['og', t.openGraph], ['twitter', t.twitter]] as const).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '8px 20px', border: 'none', background: 'transparent',
            borderBottom: activeTab === tab ? '2px solid var(--accent-blue)' : '2px solid transparent',
            color: activeTab === tab ? 'var(--accent-blue)' : 'var(--text-secondary)',
            fontWeight: 600, cursor: 'pointer', fontSize: 13,
          }}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'basic' && (
        <div>
          <label style={labelStyle}>{t.pageTitle} — {form.title.length} {t.titleCount}</label>
          <input value={form.title} onChange={set('title')} style={inputStyle} placeholder="My Awesome Page | Brand Name" />
          <label style={labelStyle}>{t.pageDesc} — {form.desc.length} {t.descCount}</label>
          <textarea value={form.desc} onChange={set('desc')} style={{ ...inputStyle, minHeight: 70 }} placeholder="A brief description of this page..." />
          <label style={labelStyle}>{t.keywords}</label>
          <input value={form.keywords} onChange={set('keywords')} style={inputStyle} placeholder={t.keywordsHint} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>{t.author}</label>
              <input value={form.author} onChange={set('author')} style={inputStyle} placeholder="John Doe" />
            </div>
            <div>
              <label style={labelStyle}>{t.robots}</label>
              <input value={form.robots} onChange={set('robots')} style={inputStyle} placeholder="index, follow" />
            </div>
          </div>
          <label style={labelStyle}>{t.canonical}</label>
          <input value={form.canonical} onChange={set('canonical')} style={inputStyle} placeholder="https://example.com/page" />
        </div>
      )}

      {activeTab === 'og' && (
        <div>
          <label style={labelStyle}>{t.ogTitle}</label>
          <input value={form.ogTitle} onChange={set('ogTitle')} style={inputStyle} placeholder={form.title || 'OG Title'} />
          <label style={labelStyle}>{t.ogDesc}</label>
          <textarea value={form.ogDesc} onChange={set('ogDesc')} style={{ ...inputStyle, minHeight: 70 }} placeholder={form.desc || 'OG Description'} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>{t.ogType}</label>
              <select value={form.ogType} onChange={set('ogType')} style={inputStyle}>
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
                <option value="video.other">video</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>{t.ogSiteName}</label>
              <input value={form.ogSiteName} onChange={set('ogSiteName')} style={inputStyle} placeholder="My Site" />
            </div>
          </div>
          <label style={labelStyle}>{t.ogImage}</label>
          <input value={form.ogImage} onChange={set('ogImage')} style={inputStyle} placeholder="https://example.com/og-image.jpg" />
          <label style={labelStyle}>{t.ogUrl}</label>
          <input value={form.ogUrl} onChange={set('ogUrl')} style={inputStyle} placeholder="https://example.com/page" />
        </div>
      )}

      {activeTab === 'twitter' && (
        <div>
          <label style={labelStyle}>{t.twCard}</label>
          <select value={form.twCard} onChange={set('twCard')} style={inputStyle}>
            <option value="summary_large_image">summary_large_image</option>
            <option value="summary">summary</option>
            <option value="app">app</option>
            <option value="player">player</option>
          </select>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>{t.twSite}</label>
              <input value={form.twSite} onChange={set('twSite')} style={inputStyle} placeholder="@yourbrand" />
            </div>
            <div>
              <label style={labelStyle}>{t.twCreator}</label>
              <input value={form.twCreator} onChange={set('twCreator')} style={inputStyle} placeholder="@author" />
            </div>
          </div>
          <label style={labelStyle}>{t.twImage}</label>
          <input value={form.twImage} onChange={set('twImage')} style={inputStyle} placeholder="https://example.com/twitter-image.jpg" />
        </div>
      )}

      {/* Output */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.output}</label>
          <CopyButton text={output} />
        </div>
        <textarea value={output} readOnly style={{ minHeight: 220, fontFamily: 'monospace', fontSize: 11 }} />
      </div>

      <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.introTitle}</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.introText}</p>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h2>
        {[1, 2, 3, 4, 5].map(n => (
          <details key={n} style={{ border: '1px solid var(--border-color)', borderRadius: 8, marginBottom: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              {t[`faq${n}q` as keyof typeof t]}
            </summary>
            <div style={{ padding: '0 16px 12px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {t[`faq${n}a` as keyof typeof t]}
            </div>
          </details>
        ))}
      </div>
    </ToolLayout>
  );
}
