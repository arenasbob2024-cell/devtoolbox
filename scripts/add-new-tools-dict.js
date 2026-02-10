const fs = require('fs');
const path = require('path');

const DICT_DIR = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');
const locales = ['en', 'fr', 'de', 'it', 'es', 'pt', 'nl', 'pl', 'sv', 'no', 'zh', 'ja', 'ko', 'id', 'th'];

const cssCategory = {
  en: "CSS Tools", fr: "Outils CSS", de: "CSS-Werkzeuge", it: "Strumenti CSS",
  es: "Herramientas CSS", pt: "Ferramentas CSS", nl: "CSS-tools", pl: "Narzędzia CSS",
  sv: "CSS-verktyg", no: "CSS-verktøy", zh: "CSS 工具", ja: "CSSツール",
  ko: "CSS 도구", id: "Alat CSS", th: "เครื่องมือ CSS"
};

// English tool entries - used as fallback for all languages
const newToolsEN = {
  "css-gradient": {
    name: "CSS Gradient Generator",
    description: "Create beautiful CSS gradients with a visual editor",
    pageTitle: "CSS Gradient Generator",
    pageDescription: "Create beautiful CSS linear, radial, and conic gradients with a visual editor. Copy CSS code instantly.",
    seoTitle: "What is CSS Gradient Generator?",
    seoContent: "CSS gradients let you display smooth transitions between two or more colors. This visual generator helps you create linear-gradient, radial-gradient, and conic-gradient CSS code with an interactive editor.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Select gradient type (linear, radial, or conic)", "Adjust the angle or direction", "Add or modify color stops", "Preview the gradient in real-time", "Copy the CSS code"],
    useCasesTitle: "Use Cases",
    useCases: ["Website backgrounds and hero sections", "Button hover effects", "Text gradient effects", "Card and UI element styling"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What CSS gradient types are supported?", a: "This tool supports linear-gradient, radial-gradient, and conic-gradient." },
      { q: "Can I use the generated CSS in any browser?", a: "Yes, CSS gradients are supported in all modern browsers." },
      { q: "How many color stops can I add?", a: "You can add multiple color stops. Most designs use 2-4 colors." }
    ]
  },
  "box-shadow": {
    name: "Box Shadow Generator",
    description: "Design CSS box shadows visually with real-time preview",
    pageTitle: "CSS Box Shadow Generator",
    pageDescription: "Design CSS box shadows visually with controls for offset, blur, spread, color, and inset. Copy CSS code instantly.",
    seoTitle: "What is CSS Box Shadow Generator?",
    seoContent: "The CSS box-shadow property adds shadow effects around elements. This visual generator lets you adjust offset, blur, spread, color, and inset with real-time preview.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Adjust shadow offset", "Set blur and spread radius", "Choose shadow color", "Toggle inset for inner shadows", "Copy the CSS code"],
    useCasesTitle: "Use Cases",
    useCases: ["Card elevation effects", "Button hover states", "Modal shadows", "Navigation bar shadows"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is CSS box-shadow?", a: "box-shadow adds shadow effects around an element's frame with offset, blur, spread, and color values." },
      { q: "Can I add multiple shadows?", a: "Yes, CSS supports multiple box shadows. This tool lets you add up to 4 layers." },
      { q: "What is inset shadow?", a: "An inset shadow appears inside the element, creating a pressed effect." }
    ]
  },
  "meta-tag-generator": {
    name: "Meta Tag Generator",
    description: "Generate HTML meta tags, Open Graph, and Twitter Card tags for SEO",
    pageTitle: "Meta Tag Generator",
    pageDescription: "Generate HTML meta tags, Open Graph tags, and Twitter Card tags for better SEO and social media sharing.",
    seoTitle: "What is Meta Tag Generator?",
    seoContent: "Meta tags help search engines understand your content and control how your page appears in search results and social media.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Enter page title and description", "Fill in Open Graph fields", "Configure Twitter Card", "Preview appearance", "Copy the HTML meta tags"],
    useCasesTitle: "Use Cases",
    useCases: ["SEO optimization", "Social media sharing", "Content publishing", "Website launches"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What are meta tags?", a: "Meta tags are HTML elements in the <head> section that provide metadata about the page." },
      { q: "What is Open Graph?", a: "Open Graph controls how your page appears when shared on social media." },
      { q: "What is the ideal description length?", a: "Google displays 150-160 characters of a meta description." }
    ]
  },
  "schema-generator": {
    name: "Schema Markup Generator",
    description: "Generate JSON-LD structured data for rich snippets in search results",
    pageTitle: "Schema Markup Generator (JSON-LD)",
    pageDescription: "Generate JSON-LD structured data for Article, FAQ, HowTo, Product, and more. Boost SEO with rich snippets.",
    seoTitle: "What is Schema Markup?",
    seoContent: "Schema markup helps search engines understand your content and display rich results like FAQ dropdowns and product ratings.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Select schema type", "Fill in required fields", "Preview JSON-LD code", "Validate the output", "Copy into your HTML"],
    useCasesTitle: "Use Cases",
    useCases: ["FAQ rich snippets", "Article markup", "Product listings", "Local business info"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is JSON-LD?", a: "JSON-LD is Google's recommended format for encoding structured data on web pages." },
      { q: "Does schema improve SEO?", a: "Schema enables rich snippets that increase click-through rates in search results." },
      { q: "Where to place JSON-LD?", a: "Add the script tag in the <head> section or before </body>." }
    ]
  },
  "robots-generator": {
    name: "Robots.txt Generator",
    description: "Generate robots.txt files with crawler rules and sitemap directives",
    pageTitle: "Robots.txt Generator",
    pageDescription: "Generate robots.txt files with user-agent rules, allow/disallow paths, and sitemap directives.",
    seoTitle: "What is Robots.txt?",
    seoContent: "The robots.txt file tells search engine crawlers which pages they can or cannot access on your site.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Select user-agent", "Add Allow/Disallow rules", "Enter sitemap URL", "Use presets for quick setup", "Copy or download"],
    useCasesTitle: "Use Cases",
    useCases: ["Control crawling", "Block private pages", "Set crawl limits", "Reference sitemaps"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is robots.txt?", a: "A text file at your website root that instructs crawlers which URLs they can access." },
      { q: "Does it block indexing?", a: "No, robots.txt controls crawling, not indexing. Use noindex for that." },
      { q: "Where to place it?", a: "At your domain root: https://example.com/robots.txt" }
    ]
  },
  "json-viewer": {
    name: "JSON Viewer / Tree",
    description: "View JSON data as an interactive collapsible tree",
    pageTitle: "JSON Viewer & Tree Visualizer",
    pageDescription: "View and explore JSON data as an interactive collapsible tree with search and JSONPath display.",
    seoTitle: "What is JSON Viewer?",
    seoContent: "JSON Viewer displays JSON data in a visual tree structure for easy exploration of complex nested data.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Paste JSON data", "Click Parse", "Expand/collapse nodes", "Search keys or values", "Click values to see JSONPath"],
    useCasesTitle: "Use Cases",
    useCases: ["Exploring API responses", "Debugging JSON", "Navigating nested configs", "Understanding data schemas"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is a JSON tree viewer?", a: "It displays JSON in a hierarchical tree for easier navigation of complex data." },
      { q: "What is JSONPath?", a: "A query language for JSON using dot notation like $.users[0].name." },
      { q: "Can I view large files?", a: "Yes, the tree handles large files by only rendering expanded nodes." }
    ]
  },
  "favicon-generator": {
    name: "Favicon Generator",
    description: "Create favicons from text or emoji with custom colors and sizes",
    pageTitle: "Favicon Generator",
    pageDescription: "Create favicons from text or emoji with custom colors, sizes, and border radius. Download as PNG.",
    seoTitle: "What is Favicon Generator?",
    seoContent: "A favicon is the small icon in browser tabs. This tool generates favicons from text or emoji with customizable colors and sizes.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Enter text or emoji", "Choose colors", "Adjust size and radius", "Preview in real-time", "Download desired size"],
    useCasesTitle: "Use Cases",
    useCases: ["Quick website favicons", "Brand icons", "App icons", "Development placeholders"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What favicon sizes do I need?", a: "Common: 16x16 (tab), 32x32 (taskbar), 48x48 (Windows), 180x180 (Apple Touch)." },
      { q: "What format for favicons?", a: "PNG is widely supported. ICO can contain multiple sizes." },
      { q: "Can I use emoji?", a: "Yes! Modern browsers support emoji favicons with custom backgrounds." }
    ]
  },
  "ascii-art": {
    name: "ASCII Art Generator",
    description: "Convert text to ASCII art with multiple font styles",
    pageTitle: "ASCII Art Generator",
    pageDescription: "Convert text to ASCII art with multiple font styles for terminals, comments, and README files.",
    seoTitle: "What is ASCII Art?",
    seoContent: "ASCII art uses printable characters to create visual designs and text banners for terminals, code comments, and README headers.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Type your text", "Select a font style", "Preview the output", "Copy to clipboard"],
    useCasesTitle: "Use Cases",
    useCases: ["Terminal banners", "Code comment headers", "README decorations", "Fun text art"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is ASCII art?", a: "A graphic design technique using printable characters to create visual art and text banners." },
      { q: "Where to use it?", a: "Terminal banners, code comments, README files, email signatures." },
      { q: "What characters are supported?", a: "Uppercase A-Z, numbers 0-9, and space." }
    ]
  },
  "svg-optimizer": {
    name: "SVG Optimizer",
    description: "Optimize and minify SVG files to reduce file size",
    pageTitle: "SVG Optimizer & Minifier",
    pageDescription: "Optimize and minify SVG files online. Remove metadata, comments, and unnecessary attributes.",
    seoTitle: "What is SVG Optimizer?",
    seoContent: "SVG files often contain unnecessary metadata and attributes. This optimizer cleans SVG files, typically reducing size by 20-60%.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Paste or upload SVG", "Select optimization options", "Click Optimize", "Compare sizes", "Copy or download"],
    useCasesTitle: "Use Cases",
    useCases: ["Reducing icon file sizes", "Optimizing web illustrations", "Cleaning design tool exports", "Preparing inline SVGs"],
    faqTitle: "FAQ",
    faqs: [
      { q: "Is optimization safe?", a: "Yes, it only removes unnecessary metadata. Visual output stays identical." },
      { q: "How much size reduction?", a: "Typically 20-60% depending on the source." },
      { q: "Works with animated SVGs?", a: "Basic optimization works, but be cautious with animation attributes." }
    ]
  },
  "placeholder-image": {
    name: "Placeholder Image Generator",
    description: "Generate placeholder images with custom dimensions, colors, and text",
    pageTitle: "Placeholder Image Generator",
    pageDescription: "Generate placeholder images with custom dimensions, colors, and text. Download as PNG or Data URI.",
    seoTitle: "What is Placeholder Image?",
    seoContent: "Placeholder images are used during development to represent future content. Generate custom images with specified dimensions and colors.",
    howToUseTitle: "How to Use",
    howToUseSteps: ["Set width and height", "Choose colors", "Customize text", "Preview the image", "Download or copy Data URI"],
    useCasesTitle: "Use Cases",
    useCases: ["UI mockups", "Frontend development", "Design prototyping", "Email templates"],
    faqTitle: "FAQ",
    faqs: [
      { q: "What is a placeholder image?", a: "A temporary image used during development where real content will eventually appear." },
      { q: "What is a Data URI?", a: "An image embedded directly in HTML/CSS as a base64 string." },
      { q: "What sizes available?", a: "Any custom size. Presets for social media, avatar, HD, etc." }
    ]
  }
};

// Translations for tool names/descriptions (lightweight — just name + description + pageTitle + pageDescription)
const translations = {
  fr: {
    "css-gradient": { name: "Générateur de Dégradé CSS", description: "Créez de beaux dégradés CSS avec un éditeur visuel", pageTitle: "Générateur de Dégradé CSS", pageDescription: "Créez des dégradés CSS linéaires, radiaux et coniques avec un éditeur visuel." },
    "box-shadow": { name: "Générateur Box Shadow", description: "Concevez des ombres CSS visuellement avec aperçu en temps réel", pageTitle: "Générateur CSS Box Shadow", pageDescription: "Concevez des ombres CSS visuellement avec contrôles d'offset, flou, étendue et couleur." },
    "meta-tag-generator": { name: "Générateur de Balises Meta", description: "Générez des balises meta HTML, Open Graph et Twitter Card pour le SEO", pageTitle: "Générateur de Balises Meta", pageDescription: "Générez des balises meta HTML, Open Graph et Twitter Card pour un meilleur SEO." },
    "schema-generator": { name: "Générateur de Schema Markup", description: "Générez des données structurées JSON-LD pour les résultats enrichis", pageTitle: "Générateur Schema Markup (JSON-LD)", pageDescription: "Générez des données structurées JSON-LD pour Article, FAQ, HowTo et plus." },
    "robots-generator": { name: "Générateur Robots.txt", description: "Générez des fichiers robots.txt avec des règles de crawl", pageTitle: "Générateur Robots.txt", pageDescription: "Générez des fichiers robots.txt avec des règles user-agent et des directives sitemap." },
    "json-viewer": { name: "Visualiseur JSON / Arbre", description: "Visualisez les données JSON sous forme d'arbre interactif", pageTitle: "Visualiseur JSON & Arbre", pageDescription: "Visualisez et explorez les données JSON sous forme d'arbre interactif avec recherche." },
    "favicon-generator": { name: "Générateur de Favicon", description: "Créez des favicons à partir de texte ou d'emoji", pageTitle: "Générateur de Favicon", pageDescription: "Créez des favicons à partir de texte ou d'emoji avec des couleurs personnalisées." },
    "ascii-art": { name: "Générateur d'Art ASCII", description: "Convertissez du texte en art ASCII avec plusieurs styles", pageTitle: "Générateur d'Art ASCII", pageDescription: "Convertissez du texte en art ASCII avec plusieurs styles de police." },
    "svg-optimizer": { name: "Optimiseur SVG", description: "Optimisez et minifiez les fichiers SVG", pageTitle: "Optimiseur & Minificateur SVG", pageDescription: "Optimisez et minifiez les fichiers SVG en ligne." },
    "placeholder-image": { name: "Générateur d'Image Placeholder", description: "Générez des images placeholder avec dimensions personnalisées", pageTitle: "Générateur d'Image Placeholder", pageDescription: "Générez des images placeholder avec dimensions, couleurs et texte personnalisés." }
  },
  zh: {
    "css-gradient": { name: "CSS 渐变生成器", description: "使用可视化编辑器创建 CSS 渐变", pageTitle: "CSS 渐变生成器", pageDescription: "使用可视化编辑器创建 CSS 线性渐变、径向渐变和锥形渐变，一键复制代码。" },
    "box-shadow": { name: "Box Shadow 生成器", description: "可视化设计 CSS 阴影效果", pageTitle: "CSS Box Shadow 生成器", pageDescription: "可视化设计 CSS 盒子阴影，支持偏移、模糊、扩展、颜色和内阴影控制。" },
    "meta-tag-generator": { name: "Meta 标签生成器", description: "生成 HTML Meta 标签、Open Graph 和 Twitter Card 标签", pageTitle: "Meta 标签生成器", pageDescription: "生成 HTML Meta 标签、Open Graph 和 Twitter Card 标签，优化 SEO 和社交分享。" },
    "schema-generator": { name: "Schema 结构化数据生成器", description: "生成 JSON-LD 结构化数据", pageTitle: "Schema Markup 生成器 (JSON-LD)", pageDescription: "生成 JSON-LD 结构化数据，支持 Article、FAQ、HowTo、Product 等类型。" },
    "robots-generator": { name: "Robots.txt 生成器", description: "生成 robots.txt 文件", pageTitle: "Robots.txt 生成器", pageDescription: "生成 robots.txt 文件，包含 user-agent 规则和 sitemap 指令。" },
    "json-viewer": { name: "JSON 查看器 / 树形图", description: "以交互式可折叠树形结构查看 JSON 数据", pageTitle: "JSON 查看器 & 树形可视化", pageDescription: "以交互式可折叠树形结构查看和探索 JSON 数据，支持搜索和 JSONPath 显示。" },
    "favicon-generator": { name: "Favicon 生成器", description: "从文字或 Emoji 创建 Favicon", pageTitle: "Favicon 生成器", pageDescription: "从文字或 Emoji 创建自定义颜色和尺寸的 Favicon，下载 PNG 格式。" },
    "ascii-art": { name: "ASCII 艺术生成器", description: "将文字转换为 ASCII 艺术字", pageTitle: "ASCII 艺术生成器", pageDescription: "将文字转换为多种字体风格的 ASCII 艺术字。" },
    "svg-optimizer": { name: "SVG 优化器", description: "优化和压缩 SVG 文件", pageTitle: "SVG 优化器 & 压缩器", pageDescription: "在线优化和压缩 SVG 文件，移除元数据和不必要的属性。" },
    "placeholder-image": { name: "占位图生成器", description: "生成自定义尺寸、颜色和文字的占位图", pageTitle: "占位图生成器", pageDescription: "生成自定义尺寸、颜色和文字的占位图，下载 PNG 或复制 Data URI。" }
  },
  de: {
    "css-gradient": { name: "CSS Gradient Generator", description: "CSS-Farbverläufe visuell erstellen", pageTitle: "CSS Gradient Generator", pageDescription: "CSS-Farbverläufe visuell erstellen mit linearen, radialen und konischen Optionen." },
    "box-shadow": { name: "Box Shadow Generator", description: "CSS-Box-Schatten visuell gestalten", pageTitle: "CSS Box Shadow Generator", pageDescription: "CSS-Box-Schatten visuell mit Offset, Blur, Spread und Farbe gestalten." },
    "meta-tag-generator": { name: "Meta-Tag-Generator", description: "HTML-Meta-Tags für SEO generieren", pageTitle: "Meta-Tag-Generator", pageDescription: "HTML-Meta-Tags, Open Graph und Twitter Card Tags generieren." },
    "schema-generator": { name: "Schema Markup Generator", description: "JSON-LD strukturierte Daten generieren", pageTitle: "Schema Markup Generator (JSON-LD)", pageDescription: "JSON-LD strukturierte Daten für Article, FAQ, HowTo und mehr generieren." },
    "robots-generator": { name: "Robots.txt Generator", description: "Robots.txt-Dateien generieren", pageTitle: "Robots.txt Generator", pageDescription: "Robots.txt-Dateien mit User-Agent-Regeln und Sitemap-Direktiven generieren." },
    "json-viewer": { name: "JSON Viewer / Baum", description: "JSON-Daten als interaktiven Baum anzeigen", pageTitle: "JSON Viewer & Baum-Visualisierung", pageDescription: "JSON-Daten als interaktiven, aufklappbaren Baum mit Suche anzeigen." },
    "favicon-generator": { name: "Favicon Generator", description: "Favicons aus Text oder Emoji erstellen", pageTitle: "Favicon Generator", pageDescription: "Favicons aus Text oder Emoji mit benutzerdefinierten Farben erstellen." },
    "ascii-art": { name: "ASCII Art Generator", description: "Text in ASCII-Kunst umwandeln", pageTitle: "ASCII Art Generator", pageDescription: "Text in ASCII-Kunst mit verschiedenen Schriftarten umwandeln." },
    "svg-optimizer": { name: "SVG Optimierer", description: "SVG-Dateien optimieren und komprimieren", pageTitle: "SVG Optimierer & Minifier", pageDescription: "SVG-Dateien online optimieren und komprimieren." },
    "placeholder-image": { name: "Platzhalter-Bild-Generator", description: "Platzhalterbilder generieren", pageTitle: "Platzhalter-Bild-Generator", pageDescription: "Platzhalterbilder mit benutzerdefinierten Abmessungen und Farben generieren." }
  },
  ja: {
    "css-gradient": { name: "CSSグラデーション生成", description: "ビジュアルエディタでCSSグラデーションを作成", pageTitle: "CSSグラデーション生成ツール", pageDescription: "ビジュアルエディタでCSS線形・放射・円錐グラデーションを作成。" },
    "box-shadow": { name: "Box Shadow生成", description: "CSSボックスシャドウをビジュアルでデザイン", pageTitle: "CSS Box Shadow生成ツール", pageDescription: "CSSボックスシャドウをビジュアルでデザインし、コードをコピー。" },
    "meta-tag-generator": { name: "Metaタグ生成", description: "HTMLメタタグ、OG、Twitterカードを生成", pageTitle: "Metaタグ生成ツール", pageDescription: "HTMLメタタグ、Open Graph、Twitterカードタグを生成。" },
    "schema-generator": { name: "Schema Markup生成", description: "JSON-LD構造化データを生成", pageTitle: "Schema Markup生成ツール", pageDescription: "Article、FAQ、HowTo等のJSON-LD構造化データを生成。" },
    "robots-generator": { name: "Robots.txt生成", description: "robots.txtファイルを生成", pageTitle: "Robots.txt生成ツール", pageDescription: "ユーザーエージェントルールとサイトマップ指令付きrobots.txtを生成。" },
    "json-viewer": { name: "JSONビューア / ツリー", description: "JSONデータをインタラクティブなツリーで表示", pageTitle: "JSONビューア＆ツリー", pageDescription: "JSONデータを折りたたみ可能なツリーで表示・検索。" },
    "favicon-generator": { name: "Favicon生成", description: "テキストや絵文字からFaviconを作成", pageTitle: "Favicon生成ツール", pageDescription: "テキストや絵文字からカスタムFaviconを作成。" },
    "ascii-art": { name: "ASCIIアート生成", description: "テキストをASCIIアートに変換", pageTitle: "ASCIIアート生成ツール", pageDescription: "テキストを複数のフォントスタイルでASCIIアートに変換。" },
    "svg-optimizer": { name: "SVG最適化", description: "SVGファイルを最適化・圧縮", pageTitle: "SVG最適化＆圧縮ツール", pageDescription: "SVGファイルをオンラインで最適化・圧縮。" },
    "placeholder-image": { name: "プレースホルダー画像生成", description: "カスタムサイズのプレースホルダー画像を生成", pageTitle: "プレースホルダー画像生成ツール", pageDescription: "カスタムサイズ・色・テキストのプレースホルダー画像を生成。" }
  },
  ko: {
    "css-gradient": { name: "CSS 그라디언트 생성기", description: "비주얼 에디터로 CSS 그라디언트 생성", pageTitle: "CSS 그라디언트 생성기", pageDescription: "비주얼 에디터로 CSS 선형, 방사형, 원뿔형 그라디언트를 생성하세요." },
    "box-shadow": { name: "Box Shadow 생성기", description: "CSS 박스 그림자를 시각적으로 디자인", pageTitle: "CSS Box Shadow 생성기", pageDescription: "CSS 박스 그림자를 시각적으로 디자인하고 코드를 복사하세요." },
    "meta-tag-generator": { name: "메타 태그 생성기", description: "HTML 메타 태그, OG, Twitter Card 생성", pageTitle: "메타 태그 생성기", pageDescription: "SEO를 위한 HTML 메타 태그, Open Graph, Twitter Card 태그를 생성하세요." },
    "schema-generator": { name: "Schema Markup 생성기", description: "JSON-LD 구조화 데이터 생성", pageTitle: "Schema Markup 생성기", pageDescription: "Article, FAQ, HowTo 등의 JSON-LD 구조화 데이터를 생성하세요." },
    "robots-generator": { name: "Robots.txt 생성기", description: "robots.txt 파일 생성", pageTitle: "Robots.txt 생성기", pageDescription: "사용자 에이전트 규칙과 사이트맵 지시문이 포함된 robots.txt를 생성하세요." },
    "json-viewer": { name: "JSON 뷰어 / 트리", description: "JSON 데이터를 인터랙티브 트리로 표시", pageTitle: "JSON 뷰어 & 트리", pageDescription: "JSON 데이터를 접을 수 있는 인터랙티브 트리로 탐색하세요." },
    "favicon-generator": { name: "Favicon 생성기", description: "텍스트나 이모지로 Favicon 생성", pageTitle: "Favicon 생성기", pageDescription: "텍스트나 이모지로 커스텀 Favicon을 생성하세요." },
    "ascii-art": { name: "ASCII 아트 생성기", description: "텍스트를 ASCII 아트로 변환", pageTitle: "ASCII 아트 생성기", pageDescription: "여러 폰트 스타일로 텍스트를 ASCII 아트로 변환하세요." },
    "svg-optimizer": { name: "SVG 최적화기", description: "SVG 파일 최적화 및 압축", pageTitle: "SVG 최적화 & 압축기", pageDescription: "SVG 파일을 온라인으로 최적화하고 압축하세요." },
    "placeholder-image": { name: "플레이스홀더 이미지 생성기", description: "커스텀 플레이스홀더 이미지 생성", pageTitle: "플레이스홀더 이미지 생성기", pageDescription: "커스텀 크기, 색상, 텍스트의 플레이스홀더 이미지를 생성하세요." }
  },
  es: {
    "css-gradient": { name: "Generador de Degradados CSS", description: "Crea degradados CSS con un editor visual", pageTitle: "Generador de Degradados CSS", pageDescription: "Crea degradados CSS lineales, radiales y cónicos con un editor visual." },
    "box-shadow": { name: "Generador Box Shadow", description: "Diseña sombras CSS visualmente", pageTitle: "Generador CSS Box Shadow", pageDescription: "Diseña sombras CSS visualmente con controles de offset, blur, spread y color." },
    "meta-tag-generator": { name: "Generador de Meta Tags", description: "Genera meta tags HTML para SEO", pageTitle: "Generador de Meta Tags", pageDescription: "Genera meta tags HTML, Open Graph y Twitter Card para mejor SEO." },
    "schema-generator": { name: "Generador Schema Markup", description: "Genera datos estructurados JSON-LD", pageTitle: "Generador Schema Markup", pageDescription: "Genera datos estructurados JSON-LD para Article, FAQ, HowTo y más." },
    "robots-generator": { name: "Generador Robots.txt", description: "Genera archivos robots.txt", pageTitle: "Generador Robots.txt", pageDescription: "Genera archivos robots.txt con reglas de user-agent y directivas sitemap." },
    "json-viewer": { name: "Visor JSON / Árbol", description: "Visualiza datos JSON como árbol interactivo", pageTitle: "Visor JSON & Árbol", pageDescription: "Visualiza y explora datos JSON como árbol interactivo plegable." },
    "favicon-generator": { name: "Generador de Favicon", description: "Crea favicons desde texto o emoji", pageTitle: "Generador de Favicon", pageDescription: "Crea favicons desde texto o emoji con colores personalizados." },
    "ascii-art": { name: "Generador de Arte ASCII", description: "Convierte texto en arte ASCII", pageTitle: "Generador de Arte ASCII", pageDescription: "Convierte texto en arte ASCII con múltiples estilos de fuente." },
    "svg-optimizer": { name: "Optimizador SVG", description: "Optimiza y minifica archivos SVG", pageTitle: "Optimizador SVG", pageDescription: "Optimiza y minifica archivos SVG en línea." },
    "placeholder-image": { name: "Generador de Imagen Placeholder", description: "Genera imágenes placeholder personalizadas", pageTitle: "Generador de Imagen Placeholder", pageDescription: "Genera imágenes placeholder con dimensiones y colores personalizados." }
  }
};

// For remaining languages, use English as fallback
const fallbackLangs = ['it', 'pt', 'nl', 'pl', 'sv', 'no', 'id', 'th'];

for (const locale of locales) {
  const filePath = path.join(DICT_DIR, `${locale}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Add CSS category
  if (!dict.categories.css) {
    dict.categories.css = cssCategory[locale] || cssCategory.en;
  }

  // Add new tools
  for (const [toolId, enData] of Object.entries(newToolsEN)) {
    if (!dict.tools[toolId]) {
      // Start with English data as base
      const toolData = { ...enData };

      // Override with translations if available
      if (translations[locale] && translations[locale][toolId]) {
        Object.assign(toolData, translations[locale][toolId]);
      }

      dict.tools[toolId] = toolData;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf-8');
  console.log(`Updated ${locale}.json`);
}

console.log('Done! All 15 language files updated.');
