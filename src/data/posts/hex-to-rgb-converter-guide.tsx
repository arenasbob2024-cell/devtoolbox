import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Colors are the building blocks of every user interface, and developers constantly switch between <strong>hex color codes</strong> and <strong>RGB values</strong>. Whether you are styling a website with CSS, building a mobile app, or writing a data visualization script in Python, understanding how to convert between hex and RGB is essential. This complete guide explains the conversion algorithm, provides code examples in multiple languages, and covers advanced topics like alpha transparency.',
    linkTool: 'Try our free online Hex to RGB Converter tool instantly.',
    h2_what: 'What Are Hex Color Codes and RGB Values?',
    whatHexDesc: '<strong>Hex color codes</strong> (also called hexadecimal colors) represent colors using a six-character string prefixed with <code>#</code>. Each pair of characters encodes one color channel: red, green, and blue. The format is <code>#RRGGBB</code>, where each pair is a hexadecimal number from <code>00</code> to <code>FF</code> (0 to 255 in decimal). For example, <code>#FF5733</code> means red=255, green=87, blue=51. CSS also supports a three-character shorthand like <code>#F00</code> which expands to <code>#FF0000</code>.',
    whatRgbDesc: '<strong>RGB values</strong> define colors using three decimal numbers representing red, green, and blue intensity, each ranging from 0 to 255. In CSS, you write <code>rgb(255, 87, 51)</code>. RGB is widely used in CSS, JavaScript canvas APIs, image processing libraries, and display technologies. Both hex and RGB describe the same color space (sRGB), so conversion between them is lossless.',
    h2_algorithm: 'How Hex-to-RGB Conversion Works',
    algorithmDesc: 'The conversion from <strong>hex to RGB</strong> is straightforward because each hex pair directly maps to one RGB channel. Here is the step-by-step algorithm:',
    algorithmSteps: '<ol><li><strong>Remove the # prefix</strong> if present.</li><li><strong>Handle shorthand</strong>: if the string has 3 characters (e.g. <code>F0A</code>), expand each character by doubling it (<code>FF00AA</code>).</li><li><strong>Split into pairs</strong>: take characters 1-2 as Red, 3-4 as Green, 5-6 as Blue.</li><li><strong>Convert each pair from hexadecimal to decimal</strong>: use <code>parseInt(pair, 16)</code> in JavaScript or <code>int(pair, 16)</code> in Python.</li></ol>',
    algorithmExample: 'For example, converting <code>#1A2B3C</code>: Red = <code>1A</code> = 1*16+10 = <strong>26</strong>, Green = <code>2B</code> = 2*16+11 = <strong>43</strong>, Blue = <code>3C</code> = 3*16+12 = <strong>60</strong>. The result is <code>rgb(26, 43, 60)</code>.',
    algorithmReverse: 'The reverse conversion (<strong>RGB to hex</strong>) works by converting each decimal channel value to a two-digit hexadecimal string and concatenating them: <code>#</code> + red.toString(16) + green.toString(16) + blue.toString(16), padding each with a leading zero if needed.',
    h2_table: 'Common Hex Color Codes and Their RGB Values',
    tableDesc: 'Here is a quick reference table of commonly used colors with their hex and RGB equivalents:',
    h2_when: 'When to Use Hex vs RGB vs HSL',
    whenDesc: 'All three formats describe the same sRGB color space, but each has strengths for different workflows:',
    whenHex: '<strong>Hex (#RRGGBB)</strong> is the most compact format and the default choice in most CSS codebases. Design tools like Figma, Sketch, and Adobe XD copy colors as hex by default. Hex is ideal for static color definitions, style guides, and brand color documentation. Shorthand (<code>#FFF</code>) saves characters in stylesheets.',
    whenRgb: '<strong>RGB / RGBA</strong> is the best choice when you need to manipulate individual color channels programmatically or when you need alpha transparency. Functions like <code>rgba(0, 0, 0, 0.5)</code> are the standard way to add opacity in CSS. RGB is also the native format for the HTML Canvas API, WebGL, and most image processing libraries.',
    whenHsl: '<strong>HSL / HSLA</strong> (Hue, Saturation, Lightness) is the most human-readable format. It is excellent for creating color palettes, generating shades and tints (by adjusting lightness), and implementing dark mode themes. CSS custom properties with HSL make it easy to adjust colors dynamically: <code>hsl(220, 90%, 56%)</code> clearly communicates the color intent.',
    whenSummary: 'In practice, most developers use <strong>hex for static colors</strong>, <strong>rgba() for transparency</strong>, and <strong>hsl() for dynamic color systems</strong>. Modern CSS also supports the <code>color()</code> function and wide-gamut color spaces like Display P3, but hex and RGB remain the most widely supported.',
    h2_code: 'Hex to RGB Conversion in JavaScript, CSS, and Python',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: 'Here is a robust hex-to-RGB function that handles 3-character shorthand, 6-character, and 8-character (with alpha) hex codes:',
    codeCssTitle: 'CSS: Hex vs RGB in Practice',
    codeCssDesc: 'In CSS, both hex and RGB are interchangeable. Modern browsers support both formats equally:',
    codePyTitle: 'Python',
    codePyDesc: 'Python makes hex-to-RGB conversion simple with built-in <code>int()</code> base conversion:',
    codeRgbToHexTitle: 'RGB to Hex (JavaScript)',
    codeRgbToHexDesc: 'The reverse conversion from RGB to hex is equally useful:',
    h2_alpha: 'Alpha Channel: Hex with Transparency (#RRGGBBAA) and RGBA',
    alphaDesc: 'Both hex and RGB support an alpha (opacity) channel. The alpha value controls transparency: 1.0 (or <code>FF</code>) means fully opaque and 0.0 (or <code>00</code>) means fully transparent.',
    alphaHex: '<strong>8-digit hex (#RRGGBBAA)</strong> appends a two-character alpha value after the color channels. For example, <code>#FF000080</code> is red at 50% opacity (<code>80</code> in hex = 128 in decimal, which is 128/255 = ~50%). Modern CSS supports this format in all major browsers (Chrome 62+, Firefox 49+, Safari 10+, Edge 79+). There is also a 4-character shorthand: <code>#F008</code> expands to <code>#FF000088</code>.',
    alphaRgba: '<strong>rgba()</strong> is the more widely recognized syntax for transparent colors: <code>rgba(255, 0, 0, 0.5)</code>. The fourth parameter is a decimal between 0 and 1. In modern CSS, you can also write <code>rgb(255 0 0 / 0.5)</code> using the space-separated syntax with a slash for alpha.',
    alphaConversion: 'To convert the alpha channel between formats: <strong>hex to decimal</strong>: divide the hex value by 255 (e.g., <code>0x80 / 255 = 0.502</code>). <strong>Decimal to hex</strong>: multiply by 255, round, and convert to hex (e.g., <code>Math.round(0.5 * 255).toString(16) = "80"</code>).',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert hex to RGB?',
    faq1_a: 'To convert a hex color code to RGB: (1) Remove the # prefix. (2) Split the 6-character string into three pairs of 2 characters each. (3) Convert each pair from hexadecimal to decimal using base-16 arithmetic. For example, #3B82F6 becomes R=59, G=130, B=246, which is rgb(59, 130, 246). For 3-character shorthand like #F0A, double each character first to get #FF00AA, then convert.',
    faq2_q: 'What is the difference between hex and RGB color codes?',
    faq2_a: 'Hex and RGB represent the same colors in the sRGB color space using different number systems. Hex uses base-16 (hexadecimal) notation in a compact 6-character string (#RRGGBB), while RGB uses three decimal numbers from 0-255. They are functionally identical: #FF0000 and rgb(255, 0, 0) are both pure red. Hex is more common in CSS and design tools, while RGB is preferred in programming contexts and when alpha transparency is needed (rgba).',
    conclusion: 'Understanding hex and RGB color formats is a fundamental skill for web developers and designers. Whether you are hand-coding colors in CSS, manipulating pixel values in a canvas, or building a design system, the conversion between these formats is straightforward once you understand the hexadecimal number system. Bookmark this guide for reference, and use our tool for instant conversions.',
    linkToolBottom: 'Convert colors instantly with our free Hex to RGB Converter.',
  },
  zh: {
    intro: '颜色是每个用户界面的基础，开发者经常需要在<strong>十六进制颜色代码</strong>和<strong>RGB 值</strong>之间切换。无论你是用 CSS 设计网站、开发移动应用，还是用 Python 编写数据可视化脚本，理解 hex 和 RGB 之间的转换都至关重要。本完整指南讲解转换算法，提供多语言代码示例，并涵盖 alpha 透明度等高级主题。',
    linkTool: '立即试用我们的免费在线 Hex 转 RGB 转换器工具。',
    h2_what: '什么是十六进制颜色代码和 RGB 值？',
    whatHexDesc: '<strong>十六进制颜色代码</strong>（也称 hex 颜色）使用以 <code>#</code> 开头的六字符字符串表示颜色。每对字符编码一个颜色通道：红、绿、蓝。格式为 <code>#RRGGBB</code>，每对是从 <code>00</code> 到 <code>FF</code>（十进制 0 到 255）的十六进制数。例如 <code>#FF5733</code> 表示红=255，绿=87，蓝=51。CSS 还支持三字符简写如 <code>#F00</code>，展开为 <code>#FF0000</code>。',
    whatRgbDesc: '<strong>RGB 值</strong>使用三个十进制数定义颜色，分别代表红、绿、蓝强度，范围均为 0 到 255。在 CSS 中写作 <code>rgb(255, 87, 51)</code>。RGB 广泛用于 CSS、JavaScript Canvas API、图像处理库和显示技术。十六进制和 RGB 描述相同的色彩空间（sRGB），因此它们之间的转换是无损的。',
    h2_algorithm: 'Hex 转 RGB 转换算法',
    algorithmDesc: '<strong>hex 转 RGB</strong> 的转换非常直接，因为每对十六进制字符直接对应一个 RGB 通道。以下是逐步算法：',
    algorithmSteps: '<ol><li><strong>移除 # 前缀</strong>（如果有）。</li><li><strong>处理简写</strong>：如果字符串有 3 个字符（如 <code>F0A</code>），将每个字符加倍（<code>FF00AA</code>）。</li><li><strong>分成对</strong>：取第 1-2 位为红，第 3-4 位为绿，第 5-6 位为蓝。</li><li><strong>将每对从十六进制转换为十进制</strong>：在 JavaScript 中用 <code>parseInt(pair, 16)</code>，在 Python 中用 <code>int(pair, 16)</code>。</li></ol>',
    algorithmExample: '例如，转换 <code>#1A2B3C</code>：红 = <code>1A</code> = 1*16+10 = <strong>26</strong>，绿 = <code>2B</code> = 2*16+11 = <strong>43</strong>，蓝 = <code>3C</code> = 3*16+12 = <strong>60</strong>。结果为 <code>rgb(26, 43, 60)</code>。',
    algorithmReverse: '反向转换（<strong>RGB 转 hex</strong>）将每个十进制通道值转换为两位十六进制字符串并连接：<code>#</code> + red.toString(16) + green.toString(16) + blue.toString(16)，必要时补前导零。',
    h2_table: '常用十六进制颜色代码及其 RGB 值',
    tableDesc: '以下是常用颜色的 hex 和 RGB 对照表：',
    h2_when: '何时使用 Hex、RGB 和 HSL',
    whenDesc: '这三种格式都描述相同的 sRGB 色彩空间，但各有优势：',
    whenHex: '<strong>Hex (#RRGGBB)</strong> 是最紧凑的格式，也是大多数 CSS 代码库的默认选择。Figma、Sketch 和 Adobe XD 等设计工具默认以 hex 格式复制颜色。Hex 非常适合静态颜色定义、样式指南和品牌色文档。简写（<code>#FFF</code>）可节省样式表字符数。',
    whenRgb: '<strong>RGB / RGBA</strong> 是需要编程操作单个颜色通道或需要 alpha 透明度时的最佳选择。<code>rgba(0, 0, 0, 0.5)</code> 是 CSS 中添加透明度的标准方式。RGB 也是 HTML Canvas API、WebGL 和大多数图像处理库的原生格式。',
    whenHsl: '<strong>HSL / HSLA</strong>（色相、饱和度、亮度）是最易读的格式。它非常适合创建调色板、生成明暗变体（通过调整亮度）和实现暗色主题。使用 HSL 的 CSS 自定义属性可轻松动态调整颜色。',
    whenSummary: '实际开发中，大多数开发者使用 <strong>hex 定义静态颜色</strong>、<strong>rgba() 处理透明度</strong>、<strong>hsl() 构建动态颜色系统</strong>。',
    h2_code: 'JavaScript、CSS 和 Python 中的 Hex 转 RGB',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: '以下是一个健壮的 hex 转 RGB 函数，支持 3 字符简写、6 字符和 8 字符（含 alpha）hex 代码：',
    codeCssTitle: 'CSS 中的 Hex 与 RGB',
    codeCssDesc: '在 CSS 中，hex 和 RGB 可以互换使用。现代浏览器对两种格式的支持完全相同：',
    codePyTitle: 'Python',
    codePyDesc: 'Python 使用内置的 <code>int()</code> 进制转换使 hex 转 RGB 变得简单：',
    codeRgbToHexTitle: 'RGB 转 Hex（JavaScript）',
    codeRgbToHexDesc: '反向从 RGB 转换为 hex 同样实用：',
    h2_alpha: 'Alpha 通道：带透明度的 Hex (#RRGGBBAA) 和 RGBA',
    alphaDesc: 'hex 和 RGB 都支持 alpha（不透明度）通道。alpha 值控制透明度：1.0（或 <code>FF</code>）表示完全不透明，0.0（或 <code>00</code>）表示完全透明。',
    alphaHex: '<strong>8 位 hex (#RRGGBBAA)</strong> 在颜色通道后追加两个字符的 alpha 值。例如 <code>#FF000080</code> 是 50% 透明度的红色（<code>80</code> hex = 128 十进制，128/255 = ~50%）。所有主流浏览器均支持此格式。4 字符简写：<code>#F008</code> 展开为 <code>#FF000088</code>。',
    alphaRgba: '<strong>rgba()</strong> 是透明颜色更广泛认可的语法：<code>rgba(255, 0, 0, 0.5)</code>。第四个参数是 0 到 1 之间的小数。在现代 CSS 中，也可使用空格分隔语法：<code>rgb(255 0 0 / 0.5)</code>。',
    alphaConversion: 'alpha 通道格式转换：<strong>hex 转十进制</strong>：hex 值除以 255（如 <code>0x80 / 255 = 0.502</code>）。<strong>十进制转 hex</strong>：乘以 255，四舍五入并转为 hex（如 <code>Math.round(0.5 * 255).toString(16) = "80"</code>）。',
    h2_faq: '常见问题',
    faq1_q: '如何将 hex 转换为 RGB？',
    faq1_a: '将十六进制颜色代码转换为 RGB：(1) 移除 # 前缀。(2) 将 6 字符字符串分成三对，每对 2 个字符。(3) 将每对从十六进制转为十进制。例如 #3B82F6 转换为 R=59, G=130, B=246，即 rgb(59, 130, 246)。对于 3 字符简写如 #F0A，先将每个字符加倍得到 #FF00AA，再转换。',
    faq2_q: '十六进制颜色代码和 RGB 有什么区别？',
    faq2_a: 'Hex 和 RGB 使用不同的数字系统表示 sRGB 色彩空间中的相同颜色。Hex 使用十六进制表示法的紧凑 6 字符字符串 (#RRGGBB)，而 RGB 使用三个 0-255 的十进制数。它们功能完全相同：#FF0000 和 rgb(255, 0, 0) 都是纯红色。Hex 在 CSS 和设计工具中更常见，而 RGB 在编程环境和需要 alpha 透明度时更受青睐。',
    conclusion: '理解 hex 和 RGB 颜色格式是 Web 开发者和设计师的基础技能。无论你是手写 CSS 颜色、操作 canvas 像素值，还是构建设计系统，一旦理解十六进制数制，这些格式之间的转换就非常简单。收藏本指南以备参考，并使用我们的工具进行即时转换。',
    linkToolBottom: '使用我们的免费 Hex 转 RGB 转换器即时转换颜色。',
  },
  fr: {
    intro: 'Les couleurs sont les fondements de toute interface utilisateur, et les developpeurs passent constamment entre <strong>codes couleur hexadecimaux</strong> et <strong>valeurs RGB</strong>. Que vous stylisiez un site web en CSS, construisiez une application mobile ou ecriviez un script de visualisation en Python, comprendre la conversion entre hex et RGB est essentiel. Ce guide complet explique l\'algorithme de conversion, fournit des exemples de code et couvre la transparence alpha.',
    linkTool: 'Essayez notre outil gratuit de conversion Hex vers RGB en ligne.',
    h2_what: 'Que sont les codes couleur Hex et les valeurs RGB ?',
    whatHexDesc: '<strong>Les codes couleur hexadecimaux</strong> representent les couleurs avec une chaine de 6 caracteres prefixee par <code>#</code>. Chaque paire encode un canal : rouge, vert, bleu. Le format est <code>#RRGGBB</code>, chaque paire etant un nombre hexadecimal de <code>00</code> a <code>FF</code>. CSS supporte aussi le raccourci a 3 caracteres comme <code>#F00</code> qui s\'etend en <code>#FF0000</code>.',
    whatRgbDesc: '<strong>Les valeurs RGB</strong> definissent les couleurs avec trois nombres decimaux (0-255) pour le rouge, le vert et le bleu. En CSS : <code>rgb(255, 87, 51)</code>. Hex et RGB decrivent le meme espace colorimetrique (sRGB), donc la conversion est sans perte.',
    h2_algorithm: 'Comment fonctionne la conversion Hex vers RGB',
    algorithmDesc: 'La conversion <strong>hex vers RGB</strong> est simple car chaque paire hex correspond directement a un canal RGB :',
    algorithmSteps: '<ol><li><strong>Supprimez le prefixe #</strong>.</li><li><strong>Gerez le raccourci</strong> : si 3 caracteres, doublez chacun.</li><li><strong>Divisez en paires</strong> : 1-2 = Rouge, 3-4 = Vert, 5-6 = Bleu.</li><li><strong>Convertissez chaque paire en decimal</strong>.</li></ol>',
    algorithmExample: 'Exemple : <code>#1A2B3C</code> donne R=<strong>26</strong>, G=<strong>43</strong>, B=<strong>60</strong>, soit <code>rgb(26, 43, 60)</code>.',
    algorithmReverse: 'La conversion inverse (<strong>RGB vers hex</strong>) convertit chaque valeur decimale en chaine hexadecimale a deux chiffres et les concatene.',
    h2_table: 'Codes couleur Hex courants et leurs valeurs RGB',
    tableDesc: 'Tableau de reference des couleurs courantes avec leurs equivalents hex et RGB :',
    h2_when: 'Quand utiliser Hex, RGB ou HSL',
    whenDesc: 'Les trois formats decrivent le meme espace sRGB, mais chacun a ses avantages :',
    whenHex: '<strong>Hex (#RRGGBB)</strong> est le format le plus compact, choix par defaut en CSS. Les outils de design copient les couleurs en hex par defaut.',
    whenRgb: '<strong>RGB / RGBA</strong> est ideal pour manipuler les canaux individuellement ou ajouter de la transparence avec <code>rgba()</code>.',
    whenHsl: '<strong>HSL / HSLA</strong> est le format le plus lisible, excellent pour creer des palettes et gerer les themes.',
    whenSummary: 'En pratique : <strong>hex pour les couleurs statiques</strong>, <strong>rgba() pour la transparence</strong>, <strong>hsl() pour les systemes de couleurs dynamiques</strong>.',
    h2_code: 'Conversion Hex vers RGB en JavaScript, CSS et Python',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: 'Fonction robuste hex-vers-RGB gerant le raccourci 3 caracteres, 6 caracteres et 8 caracteres (avec alpha) :',
    codeCssTitle: 'CSS : Hex vs RGB en pratique',
    codeCssDesc: 'En CSS, hex et RGB sont interchangeables. Les navigateurs modernes supportent les deux :',
    codePyTitle: 'Python',
    codePyDesc: 'Python simplifie la conversion avec <code>int()</code> :',
    codeRgbToHexTitle: 'RGB vers Hex (JavaScript)',
    codeRgbToHexDesc: 'La conversion inverse de RGB vers hex :',
    h2_alpha: 'Canal Alpha : Hex avec transparence (#RRGGBBAA) et RGBA',
    alphaDesc: 'Hex et RGB supportent un canal alpha. 1.0 (ou <code>FF</code>) = opaque, 0.0 (ou <code>00</code>) = transparent.',
    alphaHex: '<strong>Hex 8 chiffres (#RRGGBBAA)</strong> ajoute deux caracteres alpha. Exemple : <code>#FF000080</code> = rouge a 50% d\'opacite.',
    alphaRgba: '<strong>rgba()</strong> est la syntaxe la plus reconnue : <code>rgba(255, 0, 0, 0.5)</code>. Syntaxe moderne : <code>rgb(255 0 0 / 0.5)</code>.',
    alphaConversion: 'Conversion alpha : <strong>hex vers decimal</strong> : diviser par 255. <strong>Decimal vers hex</strong> : multiplier par 255 et convertir.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir hex en RGB ?',
    faq1_a: 'Supprimez le #, divisez en 3 paires de 2 caracteres, convertissez chaque paire de l\'hexadecimal au decimal. #3B82F6 donne rgb(59, 130, 246).',
    faq2_q: 'Quelle est la difference entre hex et RGB ?',
    faq2_a: 'Hex et RGB representent les memes couleurs sRGB avec des systemes numeriques differents. Hex utilise la notation hexadecimale compacte, RGB utilise trois nombres decimaux 0-255. #FF0000 et rgb(255, 0, 0) sont identiques.',
    conclusion: 'Comprendre les formats hex et RGB est une competence fondamentale. Utilisez notre outil pour des conversions instantanees.',
    linkToolBottom: 'Convertissez vos couleurs avec notre outil gratuit Hex vers RGB.',
  },
  de: {
    intro: 'Farben sind die Bausteine jeder Benutzeroberflache, und Entwickler wechseln standig zwischen <strong>Hex-Farbcodes</strong> und <strong>RGB-Werten</strong>. Ob Sie eine Website mit CSS gestalten, eine mobile App entwickeln oder ein Visualisierungsskript in Python schreiben - die Konvertierung zwischen Hex und RGB zu verstehen ist essenziell. Dieser Guide erklart den Algorithmus, liefert Code-Beispiele und behandelt Alpha-Transparenz.',
    linkTool: 'Testen Sie unseren kostenlosen Online Hex-zu-RGB-Konverter.',
    h2_what: 'Was sind Hex-Farbcodes und RGB-Werte?',
    whatHexDesc: '<strong>Hex-Farbcodes</strong> stellen Farben als 6-Zeichen-String mit <code>#</code>-Prafix dar. Jedes Zeichenpaar kodiert einen Farbkanal: Rot, Grun, Blau. Format: <code>#RRGGBB</code>, jedes Paar von <code>00</code> bis <code>FF</code>. CSS unterstutzt auch die 3-Zeichen-Kurzform wie <code>#F00</code> = <code>#FF0000</code>.',
    whatRgbDesc: '<strong>RGB-Werte</strong> definieren Farben mit drei Dezimalzahlen (0-255) fur Rot, Grun und Blau. In CSS: <code>rgb(255, 87, 51)</code>. Hex und RGB beschreiben denselben Farbraum (sRGB), die Konvertierung ist verlustfrei.',
    h2_algorithm: 'Wie die Hex-zu-RGB-Konvertierung funktioniert',
    algorithmDesc: 'Die Konvertierung von <strong>Hex zu RGB</strong> ist einfach, da jedes Hex-Paar direkt einem RGB-Kanal entspricht:',
    algorithmSteps: '<ol><li><strong># entfernen</strong>.</li><li><strong>Kurzform behandeln</strong>: bei 3 Zeichen jedes verdoppeln.</li><li><strong>In Paare teilen</strong>: 1-2 = Rot, 3-4 = Grun, 5-6 = Blau.</li><li><strong>Jedes Paar von Hex in Dezimal umrechnen</strong>.</li></ol>',
    algorithmExample: 'Beispiel: <code>#1A2B3C</code> ergibt R=<strong>26</strong>, G=<strong>43</strong>, B=<strong>60</strong> = <code>rgb(26, 43, 60)</code>.',
    algorithmReverse: 'Die Umkehrung (<strong>RGB zu Hex</strong>) konvertiert jeden Dezimalwert in einen zweistelligen Hex-String und verkettet sie.',
    h2_table: 'Gangige Hex-Farbcodes und ihre RGB-Werte',
    tableDesc: 'Referenztabelle gangiger Farben mit Hex- und RGB-Aquivalenten:',
    h2_when: 'Wann Hex, RGB oder HSL verwenden',
    whenDesc: 'Alle drei Formate beschreiben denselben sRGB-Farbraum:',
    whenHex: '<strong>Hex (#RRGGBB)</strong> ist das kompakteste Format und Standard in den meisten CSS-Codebasen. Design-Tools kopieren Farben standardmasig als Hex.',
    whenRgb: '<strong>RGB / RGBA</strong> ist ideal fur die programmatische Manipulation einzelner Kanale und Alpha-Transparenz.',
    whenHsl: '<strong>HSL / HSLA</strong> ist das am besten lesbare Format, ideal fur Farbpaletten und Themes.',
    whenSummary: 'In der Praxis: <strong>Hex fur statische Farben</strong>, <strong>rgba() fur Transparenz</strong>, <strong>hsl() fur dynamische Farbsysteme</strong>.',
    h2_code: 'Hex-zu-RGB-Konvertierung in JavaScript, CSS und Python',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: 'Robuste Hex-zu-RGB-Funktion fur 3-, 6- und 8-Zeichen-Hex-Codes:',
    codeCssTitle: 'CSS: Hex vs RGB in der Praxis',
    codeCssDesc: 'In CSS sind Hex und RGB austauschbar:',
    codePyTitle: 'Python',
    codePyDesc: 'Python macht die Konvertierung mit <code>int()</code> einfach:',
    codeRgbToHexTitle: 'RGB zu Hex (JavaScript)',
    codeRgbToHexDesc: 'Die Umkehrung von RGB zu Hex:',
    h2_alpha: 'Alpha-Kanal: Hex mit Transparenz (#RRGGBBAA) und RGBA',
    alphaDesc: 'Hex und RGB unterstutzen einen Alpha-Kanal. 1.0 (oder <code>FF</code>) = deckend, 0.0 (oder <code>00</code>) = transparent.',
    alphaHex: '<strong>8-stelliges Hex (#RRGGBBAA)</strong> fugt zwei Alpha-Zeichen hinzu. Beispiel: <code>#FF000080</code> = Rot mit 50% Deckkraft.',
    alphaRgba: '<strong>rgba()</strong> ist die gebrauchlichere Syntax: <code>rgba(255, 0, 0, 0.5)</code>. Moderne Syntax: <code>rgb(255 0 0 / 0.5)</code>.',
    alphaConversion: 'Alpha-Konvertierung: <strong>Hex zu Dezimal</strong>: durch 255 teilen. <strong>Dezimal zu Hex</strong>: mit 255 multiplizieren und konvertieren.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie konvertiert man Hex zu RGB?',
    faq1_a: '# entfernen, in 3 Paare teilen, jedes Paar von Hex in Dezimal umrechnen. #3B82F6 ergibt rgb(59, 130, 246).',
    faq2_q: 'Was ist der Unterschied zwischen Hex und RGB?',
    faq2_a: 'Hex und RGB stellen dieselben sRGB-Farben mit verschiedenen Zahlensystemen dar. Hex nutzt hexadezimale Notation, RGB drei Dezimalzahlen 0-255. #FF0000 und rgb(255, 0, 0) sind identisch.',
    conclusion: 'Hex- und RGB-Farbformate zu verstehen ist eine Grundkompetenz. Nutzen Sie unser Tool fur sofortige Konvertierungen.',
    linkToolBottom: 'Konvertieren Sie Farben sofort mit unserem kostenlosen Hex-zu-RGB-Konverter.',
  },
  es: {
    intro: 'Los colores son los bloques de construccion de toda interfaz de usuario, y los desarrolladores cambian constantemente entre <strong>codigos de color hexadecimales</strong> y <strong>valores RGB</strong>. Ya sea que estes diseando un sitio web con CSS, construyendo una app movil o escribiendo un script de visualizacion en Python, entender la conversion entre hex y RGB es esencial. Esta guia completa explica el algoritmo, proporciona ejemplos de codigo y cubre la transparencia alfa.',
    linkTool: 'Prueba nuestro convertidor gratuito de Hex a RGB en linea.',
    h2_what: 'Que son los codigos de color Hex y los valores RGB?',
    whatHexDesc: '<strong>Los codigos de color hexadecimales</strong> representan colores con una cadena de 6 caracteres precedida por <code>#</code>. Cada par codifica un canal: rojo, verde, azul. Formato: <code>#RRGGBB</code>, cada par de <code>00</code> a <code>FF</code>. CSS tambien soporta la forma abreviada de 3 caracteres como <code>#F00</code> = <code>#FF0000</code>.',
    whatRgbDesc: '<strong>Los valores RGB</strong> definen colores con tres numeros decimales (0-255) para rojo, verde y azul. En CSS: <code>rgb(255, 87, 51)</code>. Hex y RGB describen el mismo espacio de color (sRGB), la conversion es sin perdida.',
    h2_algorithm: 'Como funciona la conversion Hex a RGB',
    algorithmDesc: 'La conversion de <strong>hex a RGB</strong> es directa ya que cada par hex mapea a un canal RGB:',
    algorithmSteps: '<ol><li><strong>Elimina el prefijo #</strong>.</li><li><strong>Maneja la abreviatura</strong>: si tiene 3 caracteres, duplica cada uno.</li><li><strong>Divide en pares</strong>: 1-2 = Rojo, 3-4 = Verde, 5-6 = Azul.</li><li><strong>Convierte cada par de hexadecimal a decimal</strong>.</li></ol>',
    algorithmExample: 'Ejemplo: <code>#1A2B3C</code> da R=<strong>26</strong>, G=<strong>43</strong>, B=<strong>60</strong> = <code>rgb(26, 43, 60)</code>.',
    algorithmReverse: 'La conversion inversa (<strong>RGB a hex</strong>) convierte cada valor decimal a una cadena hex de dos digitos y las concatena.',
    h2_table: 'Codigos de color Hex comunes y sus valores RGB',
    tableDesc: 'Tabla de referencia de colores comunes con sus equivalentes hex y RGB:',
    h2_when: 'Cuando usar Hex, RGB o HSL',
    whenDesc: 'Los tres formatos describen el mismo espacio sRGB:',
    whenHex: '<strong>Hex (#RRGGBB)</strong> es el formato mas compacto y la opcion predeterminada en CSS. Las herramientas de diseno copian colores en hex por defecto.',
    whenRgb: '<strong>RGB / RGBA</strong> es ideal para manipular canales individualmente y para transparencia alfa.',
    whenHsl: '<strong>HSL / HSLA</strong> es el formato mas legible, excelente para paletas de colores y temas.',
    whenSummary: 'En la practica: <strong>hex para colores estaticos</strong>, <strong>rgba() para transparencia</strong>, <strong>hsl() para sistemas de color dinamicos</strong>.',
    h2_code: 'Conversion Hex a RGB en JavaScript, CSS y Python',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: 'Funcion robusta hex-a-RGB que maneja 3, 6 y 8 caracteres:',
    codeCssTitle: 'CSS: Hex vs RGB en la practica',
    codeCssDesc: 'En CSS, hex y RGB son intercambiables:',
    codePyTitle: 'Python',
    codePyDesc: 'Python simplifica la conversion con <code>int()</code>:',
    codeRgbToHexTitle: 'RGB a Hex (JavaScript)',
    codeRgbToHexDesc: 'La conversion inversa de RGB a hex:',
    h2_alpha: 'Canal Alfa: Hex con transparencia (#RRGGBBAA) y RGBA',
    alphaDesc: 'Hex y RGB soportan canal alfa. 1.0 (o <code>FF</code>) = opaco, 0.0 (o <code>00</code>) = transparente.',
    alphaHex: '<strong>Hex de 8 digitos (#RRGGBBAA)</strong> agrega dos caracteres alfa. Ejemplo: <code>#FF000080</code> = rojo al 50% de opacidad.',
    alphaRgba: '<strong>rgba()</strong> es la sintaxis mas reconocida: <code>rgba(255, 0, 0, 0.5)</code>. Sintaxis moderna: <code>rgb(255 0 0 / 0.5)</code>.',
    alphaConversion: 'Conversion alfa: <strong>hex a decimal</strong>: dividir entre 255. <strong>Decimal a hex</strong>: multiplicar por 255 y convertir.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como convertir hex a RGB?',
    faq1_a: 'Elimina el #, divide en 3 pares de 2 caracteres, convierte cada par de hexadecimal a decimal. #3B82F6 da rgb(59, 130, 246).',
    faq2_q: 'Cual es la diferencia entre hex y RGB?',
    faq2_a: 'Hex y RGB representan los mismos colores sRGB con diferentes sistemas numericos. Hex usa notacion hexadecimal compacta, RGB usa tres numeros decimales 0-255. #FF0000 y rgb(255, 0, 0) son identicos.',
    conclusion: 'Entender los formatos hex y RGB es una habilidad fundamental. Usa nuestra herramienta para conversiones instantaneas.',
    linkToolBottom: 'Convierte colores al instante con nuestro convertidor gratuito Hex a RGB.',
  },
  ja: {
    intro: '色はすべてのユーザーインターフェースの基本要素であり、開発者は<strong>16進カラーコード</strong>と<strong>RGB値</strong>を頻繁に切り替えます。CSSでWebサイトをスタイリングする場合でも、モバイルアプリを構築する場合でも、Pythonでデータ可視化スクリプトを書く場合でも、hexとRGBの相互変換を理解することは不可欠です。この完全ガイドでは、変換アルゴリズムの説明、複数言語でのコード例、アルファ透明度などの高度なトピックを扱います。',
    linkTool: '無料オンラインHex to RGB変換ツールをお試しください。',
    h2_what: '16進カラーコードとRGB値とは？',
    whatHexDesc: '<strong>16進カラーコード</strong>は、<code>#</code>接頭辞付きの6文字の文字列で色を表します。各文字ペアが1つのカラーチャンネル（赤・緑・青）をエンコードします。形式は<code>#RRGGBB</code>で、各ペアは<code>00</code>から<code>FF</code>の16進数です。CSSは<code>#F00</code>のような3文字の省略形もサポートし、<code>#FF0000</code>に展開されます。',
    whatRgbDesc: '<strong>RGB値</strong>は、赤・緑・青の強度を0から255の3つの10進数で定義します。CSSでは<code>rgb(255, 87, 51)</code>と記述します。hexとRGBは同じ色空間（sRGB）を記述するため、変換は無損失です。',
    h2_algorithm: 'Hex to RGB変換の仕組み',
    algorithmDesc: '<strong>hexからRGB</strong>への変換は、各hexペアが直接1つのRGBチャンネルに対応するため簡単です：',
    algorithmSteps: '<ol><li><strong>#接頭辞を削除</strong>。</li><li><strong>省略形の処理</strong>：3文字の場合、各文字を2倍にする。</li><li><strong>ペアに分割</strong>：1-2=赤、3-4=緑、5-6=青。</li><li><strong>各ペアを16進数から10進数に変換</strong>。</li></ol>',
    algorithmExample: '例：<code>#1A2B3C</code>は R=<strong>26</strong>、G=<strong>43</strong>、B=<strong>60</strong> = <code>rgb(26, 43, 60)</code>。',
    algorithmReverse: '逆変換（<strong>RGBからhex</strong>）は、各10進チャンネル値を2桁の16進文字列に変換して連結します。',
    h2_table: '一般的な16進カラーコードとRGB値',
    tableDesc: '一般的な色のhexとRGBの対照表：',
    h2_when: 'Hex・RGB・HSLの使い分け',
    whenDesc: '3つの形式はすべて同じsRGB色空間を記述します：',
    whenHex: '<strong>Hex (#RRGGBB)</strong>は最もコンパクトな形式で、CSSのデフォルト選択です。デザインツールはデフォルトでhex形式でコピーします。',
    whenRgb: '<strong>RGB / RGBA</strong>は個別チャンネルの操作やアルファ透明度が必要な場合に最適です。',
    whenHsl: '<strong>HSL / HSLA</strong>は最も人間が読みやすい形式で、カラーパレットやテーマに最適です。',
    whenSummary: '実践では：<strong>静的な色にはhex</strong>、<strong>透明度にはrgba()</strong>、<strong>動的カラーシステムにはhsl()</strong>。',
    h2_code: 'JavaScript・CSS・PythonでのHex to RGB変換',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: '3文字省略形、6文字、8文字（アルファ付き）に対応するhex-to-RGB関数：',
    codeCssTitle: 'CSS：HexとRGBの実践',
    codeCssDesc: 'CSSではhexとRGBは互換性があります：',
    codePyTitle: 'Python',
    codePyDesc: 'Pythonでは組み込みの<code>int()</code>で簡単に変換できます：',
    codeRgbToHexTitle: 'RGB to Hex（JavaScript）',
    codeRgbToHexDesc: 'RGBからhexへの逆変換：',
    h2_alpha: 'アルファチャンネル：透明度付きHex (#RRGGBBAA) とRGBA',
    alphaDesc: 'hexとRGBの両方がアルファチャンネルをサポートします。1.0（または<code>FF</code>）=不透明、0.0（または<code>00</code>）=完全透明。',
    alphaHex: '<strong>8桁hex (#RRGGBBAA)</strong>はカラーチャンネルの後に2文字のアルファ値を追加します。例：<code>#FF000080</code>=50%不透明の赤。',
    alphaRgba: '<strong>rgba()</strong>はより一般的な構文です：<code>rgba(255, 0, 0, 0.5)</code>。モダンCSS構文：<code>rgb(255 0 0 / 0.5)</code>。',
    alphaConversion: 'アルファ変換：<strong>hexから10進</strong>：255で割る。<strong>10進からhex</strong>：255を掛けて変換。',
    h2_faq: 'よくある質問',
    faq1_q: 'hexをRGBに変換するには？',
    faq1_a: '#を削除し、3つの2文字ペアに分割し、各ペアを16進数から10進数に変換します。#3B82F6はrgb(59, 130, 246)になります。',
    faq2_q: 'hexとRGBの違いは？',
    faq2_a: 'hexとRGBは異なる数値システムで同じsRGB色を表します。hexはコンパクトな16進表記、RGBは0-255の3つの10進数を使います。#FF0000とrgb(255, 0, 0)は同一です。',
    conclusion: 'hexとRGBカラー形式を理解することはWeb開発者の基本スキルです。即座に変換するには当ツールをご利用ください。',
    linkToolBottom: '無料のHex to RGB変換ツールで即座に色を変換。',
  },
  ko: {
    intro: '색상은 모든 사용자 인터페이스의 기본 요소이며, 개발자는 <strong>16진수 색상 코드</strong>와 <strong>RGB 값</strong>을 자주 전환합니다. CSS로 웹사이트를 스타일링하든, 모바일 앱을 개발하든, Python으로 데이터 시각화 스크립트를 작성하든, hex와 RGB 간의 변환을 이해하는 것은 필수입니다. 이 완전한 가이드에서는 변환 알고리즘, 다중 언어 코드 예제, 알파 투명도 등 고급 주제를 다룹니다.',
    linkTool: '무료 온라인 Hex to RGB 변환기 도구를 사용해 보세요.',
    h2_what: '16진수 색상 코드와 RGB 값이란?',
    whatHexDesc: '<strong>16진수 색상 코드</strong>는 <code>#</code> 접두사가 붙은 6자리 문자열로 색상을 표현합니다. 각 문자 쌍은 빨강, 초록, 파랑 채널을 인코딩합니다. 형식은 <code>#RRGGBB</code>이며, 각 쌍은 <code>00</code>에서 <code>FF</code>까지의 16진수입니다. CSS는 <code>#F00</code>과 같은 3자리 약어도 지원하며, <code>#FF0000</code>으로 확장됩니다.',
    whatRgbDesc: '<strong>RGB 값</strong>은 빨강, 초록, 파랑 강도를 0~255의 세 개의 10진수로 정의합니다. CSS에서는 <code>rgb(255, 87, 51)</code>로 작성합니다. hex와 RGB는 같은 색 공간(sRGB)을 기술하므로 변환은 손실이 없습니다.',
    h2_algorithm: 'Hex to RGB 변환 알고리즘',
    algorithmDesc: '<strong>hex에서 RGB</strong>로의 변환은 각 hex 쌍이 하나의 RGB 채널에 직접 대응하므로 간단합니다:',
    algorithmSteps: '<ol><li><strong># 접두사 제거</strong>.</li><li><strong>약어 처리</strong>: 3자리인 경우 각 문자를 두 배로.</li><li><strong>쌍으로 분할</strong>: 1-2=빨강, 3-4=초록, 5-6=파랑.</li><li><strong>각 쌍을 16진수에서 10진수로 변환</strong>.</li></ol>',
    algorithmExample: '예: <code>#1A2B3C</code>는 R=<strong>26</strong>, G=<strong>43</strong>, B=<strong>60</strong> = <code>rgb(26, 43, 60)</code>.',
    algorithmReverse: '역변환(<strong>RGB에서 hex</strong>)은 각 10진수 채널 값을 2자리 16진수 문자열로 변환하여 연결합니다.',
    h2_table: '일반적인 16진수 색상 코드와 RGB 값',
    tableDesc: '일반적인 색상의 hex와 RGB 대조표:',
    h2_when: 'Hex, RGB, HSL 사용 시기',
    whenDesc: '세 가지 형식 모두 같은 sRGB 색 공간을 기술합니다:',
    whenHex: '<strong>Hex (#RRGGBB)</strong>는 가장 간결한 형식이며 대부분의 CSS 코드베이스에서 기본 선택입니다. 디자인 도구는 기본적으로 hex로 색상을 복사합니다.',
    whenRgb: '<strong>RGB / RGBA</strong>는 개별 채널 조작이나 알파 투명도가 필요할 때 최적입니다.',
    whenHsl: '<strong>HSL / HSLA</strong>는 가장 읽기 쉬운 형식으로, 색상 팔레트와 테마에 적합합니다.',
    whenSummary: '실제로: <strong>정적 색상에는 hex</strong>, <strong>투명도에는 rgba()</strong>, <strong>동적 색상 시스템에는 hsl()</strong>.',
    h2_code: 'JavaScript, CSS, Python에서의 Hex to RGB 변환',
    codeJsTitle: 'JavaScript / TypeScript',
    codeJsDesc: '3자리 약어, 6자리, 8자리(알파 포함) hex 코드를 지원하는 함수:',
    codeCssTitle: 'CSS: Hex vs RGB 실전',
    codeCssDesc: 'CSS에서 hex와 RGB는 호환됩니다:',
    codePyTitle: 'Python',
    codePyDesc: 'Python은 내장 <code>int()</code>로 간단하게 변환합니다:',
    codeRgbToHexTitle: 'RGB to Hex (JavaScript)',
    codeRgbToHexDesc: 'RGB에서 hex로의 역변환:',
    h2_alpha: '알파 채널: 투명도가 있는 Hex (#RRGGBBAA)와 RGBA',
    alphaDesc: 'hex와 RGB 모두 알파 채널을 지원합니다. 1.0(또는 <code>FF</code>)=불투명, 0.0(또는 <code>00</code>)=완전 투명.',
    alphaHex: '<strong>8자리 hex (#RRGGBBAA)</strong>는 색상 채널 뒤에 2자리 알파 값을 추가합니다. 예: <code>#FF000080</code>=50% 불투명도의 빨강.',
    alphaRgba: '<strong>rgba()</strong>는 더 널리 알려진 구문입니다: <code>rgba(255, 0, 0, 0.5)</code>. 모던 CSS 구문: <code>rgb(255 0 0 / 0.5)</code>.',
    alphaConversion: '알파 변환: <strong>hex에서 10진수</strong>: 255로 나누기. <strong>10진수에서 hex</strong>: 255를 곱하고 변환.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'hex를 RGB로 변환하는 방법은?',
    faq1_a: '#을 제거하고 3개의 2자리 쌍으로 분할한 후 각 쌍을 16진수에서 10진수로 변환합니다. #3B82F6은 rgb(59, 130, 246)이 됩니다.',
    faq2_q: 'hex와 RGB의 차이점은?',
    faq2_a: 'hex와 RGB는 다른 숫자 체계로 같은 sRGB 색상을 표현합니다. hex는 간결한 16진수 표기법, RGB는 0-255의 세 10진수를 사용합니다. #FF0000과 rgb(255, 0, 0)은 동일합니다.',
    conclusion: 'hex와 RGB 색상 형식을 이해하는 것은 웹 개발자의 기본 기술입니다. 즉시 변환하려면 저희 도구를 사용하세요.',
    linkToolBottom: '무료 Hex to RGB 변환기로 즉시 색상을 변환하세요.',
  },
};

export default function HexToRgbGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/hex-to-rgb`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What are Hex and RGB */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatHexDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatRgbDesc }} />

      {/* Section 2: How the conversion works */}
      <h2>{s.h2_algorithm}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.algorithmDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.algorithmSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.algorithmExample }} />
      <p dangerouslySetInnerHTML={{ __html: s.algorithmReverse }} />

      {/* Section 3: Common colors table */}
      <h2>{s.h2_table}</h2>
      <p>{s.tableDesc}</p>
      <table>
        <thead>
          <tr>
            <th>Color</th>
            <th>Hex</th>
            <th>RGB</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Red</td><td><code>#FF0000</code></td><td><code>rgb(255, 0, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF0000', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Green</td><td><code>#00FF00</code></td><td><code>rgb(0, 255, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#00FF00', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Blue</td><td><code>#0000FF</code></td><td><code>rgb(0, 0, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#0000FF', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>White</td><td><code>#FFFFFF</code></td><td><code>rgb(255, 255, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FFFFFF', borderRadius: 4, verticalAlign: 'middle', border: '1px solid #ccc' }} /></td></tr>
          <tr><td>Black</td><td><code>#000000</code></td><td><code>rgb(0, 0, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#000000', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Yellow</td><td><code>#FFFF00</code></td><td><code>rgb(255, 255, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FFFF00', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Cyan</td><td><code>#00FFFF</code></td><td><code>rgb(0, 255, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#00FFFF', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Magenta</td><td><code>#FF00FF</code></td><td><code>rgb(255, 0, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF00FF', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Orange</td><td><code>#FF8000</code></td><td><code>rgb(255, 128, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF8000', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Purple</td><td><code>#800080</code></td><td><code>rgb(128, 0, 128)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#800080', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Coral</td><td><code>#FF7F50</code></td><td><code>rgb(255, 127, 80)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF7F50', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Teal</td><td><code>#008080</code></td><td><code>rgb(0, 128, 128)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#008080', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Navy</td><td><code>#000080</code></td><td><code>rgb(0, 0, 128)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#000080', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Gray</td><td><code>#808080</code></td><td><code>rgb(128, 128, 128)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#808080', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>Tailwind Blue 500</td><td><code>#3B82F6</code></td><td><code>rgb(59, 130, 246)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#3B82F6', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
        </tbody>
      </table>

      {/* Section 4: When to use hex vs RGB vs HSL */}
      <h2>{s.h2_when}</h2>
      <p>{s.whenDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.whenHex }} />
      <p dangerouslySetInnerHTML={{ __html: s.whenRgb }} />
      <p dangerouslySetInnerHTML={{ __html: s.whenHsl }} />
      <p dangerouslySetInnerHTML={{ __html: s.whenSummary }} />

      {/* Section 5: Code examples */}
      <h2>{s.h2_code}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle 3-character shorthand (#F0A -> FF00AA)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  // Handle 4-character shorthand (#F0A8 -> FF00AA88)
  if (hex.length === 4) {
    hex = hex.split('').map(c => c + c).join('');
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Handle 8-character hex with alpha (#RRGGBBAA)
  if (hex.length === 8) {
    const a = parseInt(hex.substring(6, 8), 16) / 255;
    return { r, g, b, a: Math.round(a * 100) / 100 };
  }

  return { r, g, b };
}

// Examples
hexToRgb('#FF5733');    // { r: 255, g: 87, b: 51 }
hexToRgb('#3B82F6');    // { r: 59, g: 130, b: 246 }
hexToRgb('#F00');       // { r: 255, g: 0, b: 0 }
hexToRgb('#FF000080');  // { r: 255, g: 0, b: 0, a: 0.5 }`}</code></pre>

      <h3>{s.codeCssTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCssDesc }} />
      <pre><code>{`/* These produce the exact same color */
.element-hex   { color: #3B82F6; }
.element-rgb   { color: rgb(59, 130, 246); }

/* Transparency — both are equivalent */
.overlay-hex   { background: #3B82F680; }      /* 50% opacity */
.overlay-rgba  { background: rgba(59, 130, 246, 0.5); }

/* Modern CSS space-separated syntax */
.modern        { color: rgb(59 130 246); }
.modern-alpha  { color: rgb(59 130 246 / 0.5); }

/* CSS custom properties work with any format */
:root {
  --primary: #3B82F6;
  --primary-rgb: 59, 130, 246;
}
.card {
  background: rgba(var(--primary-rgb), 0.1);
  border: 1px solid var(--primary);
}`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert hex color string to RGB tuple."""
    hex_color = hex_color.lstrip('#')

    # Handle 3-character shorthand
    if len(hex_color) == 3:
        hex_color = ''.join(c * 2 for c in hex_color)

    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)

    return (r, g, b)


def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB values to hex color string."""
    return f'#{r:02x}{g:02x}{b:02x}'


# Examples
print(hex_to_rgb('#FF5733'))   # (255, 87, 51)
print(hex_to_rgb('#3B82F6'))   # (59, 130, 246)
print(hex_to_rgb('#F00'))      # (255, 0, 0)

print(rgb_to_hex(59, 130, 246))  # #3b82f6
print(rgb_to_hex(255, 87, 51))   # #ff5733`}</code></pre>

      <h3>{s.codeRgbToHexTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeRgbToHexDesc }} />
      <pre><code>{`function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => {
      const hex = v.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');
}

// With alpha support
function rgbaToHex(r, g, b, a = 1) {
  const hex = rgbToHex(r, g, b);
  if (a === 1) return hex;
  const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
  return hex + alphaHex;
}

// Examples
rgbToHex(255, 87, 51);        // '#ff5733'
rgbToHex(59, 130, 246);       // '#3b82f6'
rgbaToHex(255, 0, 0, 0.5);   // '#ff000080'`}</code></pre>

      {/* Section 6: Alpha channel */}
      <h2>{s.h2_alpha}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.alphaDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.alphaHex }} />
      <p dangerouslySetInnerHTML={{ __html: s.alphaRgba }} />
      <p dangerouslySetInnerHTML={{ __html: s.alphaConversion }} />

      <pre><code>{`/* Common alpha values: hex ↔ decimal */
100% opacity:  FF = 1.0    →  #FF0000FF  =  rgba(255, 0, 0, 1.0)
 90% opacity:  E6 = 0.9    →  #FF0000E6  =  rgba(255, 0, 0, 0.9)
 80% opacity:  CC = 0.8    →  #FF0000CC  =  rgba(255, 0, 0, 0.8)
 70% opacity:  B3 = 0.7    →  #FF0000B3  =  rgba(255, 0, 0, 0.7)
 60% opacity:  99 = 0.6    →  #FF000099  =  rgba(255, 0, 0, 0.6)
 50% opacity:  80 = 0.5    →  #FF000080  =  rgba(255, 0, 0, 0.5)
 40% opacity:  66 = 0.4    →  #FF000066  =  rgba(255, 0, 0, 0.4)
 30% opacity:  4D = 0.3    →  #FF00004D  =  rgba(255, 0, 0, 0.3)
 20% opacity:  33 = 0.2    →  #FF000033  =  rgba(255, 0, 0, 0.2)
 10% opacity:  1A = 0.1    →  #FF00001A  =  rgba(255, 0, 0, 0.1)
  0% opacity:  00 = 0.0    →  #FF000000  =  rgba(255, 0, 0, 0.0)`}</code></pre>

      {/* Section 7: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/hex-to-rgb`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
