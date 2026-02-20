import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Whether you are building a design system, debugging CSS, or translating a mockup into code, a reliable <strong>color converter</strong> is one of the most-used tools in a developer\'s toolkit. Converting between <strong>hex to rgb</strong>, <strong>rgb to hex</strong>, <strong>hsl to hex</strong>, and other formats is an everyday task that touches front-end styling, data visualization, accessibility auditing, and even back-end image processing. This comprehensive guide explains every major color model, walks through the math behind each conversion, provides copy-paste code snippets in JavaScript, Python, and Bash, and covers modern CSS color features like <code>oklch()</code> and <code>color-mix()</code>. If you need a quick <strong>color code converter</strong>, try our free online tool.',
    linkTool: 'Try our free online Color Converter tool instantly.',
    h2_models: 'Understanding Color Models: RGB, HEX, HSL, HSV, and CMYK',
    modelsDesc1: '<strong>RGB (Red, Green, Blue)</strong> is the foundational <strong>rgb color code</strong> model for screens. Every pixel on your monitor blends red, green, and blue light at intensities from 0 to 255. The notation <code>rgb(255, 87, 51)</code> means full red, moderate green, and low blue, producing a vivid orange. Because monitors emit light, RGB is an <em>additive</em> color model: mixing all three channels at maximum yields white. RGB is the native language of displays, the HTML Canvas API, WebGL shaders, and most image-processing libraries. Use RGB when you need precise channel-level control or when working directly with pixel data.',
    modelsDesc2: '<strong>HEX (Hexadecimal)</strong> is the most common <strong>hex color code</strong> notation on the web. It is simply a compact representation of RGB values encoded in base-16. The color <code>#FF5733</code> breaks down as <code>FF</code> = 255 red, <code>57</code> = 87 green, <code>33</code> = 51 blue, exactly the same orange as <code>rgb(255, 87, 51)</code>. HEX codes can be 3-digit shorthand (<code>#F53</code>), 6-digit standard (<code>#FF5733</code>), or 8-digit with alpha (<code>#FF573380</code>). Because HEX values are compact and unambiguous, they are the default format in CSS stylesheets, Figma, Sketch, and design tokens. Knowing how to convert <strong>hex to rgb</strong> and back is essential for every front-end developer.',
    modelsDesc3: '<strong>HSL (Hue, Saturation, Lightness)</strong> was designed to be more intuitive for humans. Hue is a degree on the color wheel (0-360), saturation is a percentage of color intensity (0-100%), and lightness is a percentage from black (0%) through the pure color (50%) to white (100%). The notation <code>hsl(14, 100%, 60%)</code> describes our orange. HSL makes it trivial to create lighter or darker variants by adjusting the L channel, or to desaturate a color by lowering S. This is why <strong>rgb to hsl</strong> conversion is so popular in theming systems and design tools. CSS natively supports <code>hsl()</code>, making it a first-class citizen in stylesheets.',
    modelsDesc4: '<strong>HSV / HSB (Hue, Saturation, Value / Brightness)</strong> is the model used by most <strong>color picker</strong> interfaces, including those in Photoshop, Figma, and the native OS pickers. It shares the hue wheel with HSL but replaces lightness with value (brightness). In HSV, S=0 gives you a gray and V=0 is always black, which maps naturally to the square picker where you drag horizontally for saturation and vertically for brightness. While CSS does not support HSV directly, understanding the difference between HSL and HSV avoids confusion when translating designs to code.',
    modelsDesc5: '<strong>CMYK (Cyan, Magenta, Yellow, Key/Black)</strong> is a <em>subtractive</em> color model for print. Inks absorb light rather than emitting it, so mixing all inks at full intensity yields black (in theory). The Key channel adds pure black for deeper shadows and crisper text. CMYK is irrelevant for CSS but essential when generating PDFs, prepping files for offset printing, or working with libraries like ReportLab or wkhtmltopdf. Converting between RGB and CMYK requires an ICC color profile for accurate results; naive formula-based conversions are only approximations.',
    h2_table: 'Color Model Comparison Table',
    tableDesc: 'The following table summarizes the key properties of each color model to help you choose the right format for your use case:',
    h2_conversion: 'How Color Conversion Works: The Math Behind HEX, RGB, HSL, and HSV',
    convDesc1: 'Every <strong>color code converter</strong> implements a set of well-known mathematical formulas. Understanding these formulas helps you debug edge cases, write your own converter, or verify that a library produces correct output. Below we walk through each conversion with concrete numbers.',
    convHexRgb: '<strong>HEX to RGB</strong>: A <strong>hex color code</strong> like <code>#FF5733</code> is simply three pairs of hexadecimal digits. To convert <strong>hex to rgb</strong>, parse each pair independently: <code>parseInt("FF", 16)</code> = 255, <code>parseInt("57", 16)</code> = 87, <code>parseInt("33", 16)</code> = 51. The result is <code>rgb(255, 87, 51)</code>. For 3-digit shorthand like <code>#F53</code>, double each digit first: <code>FF</code>, <code>55</code>, <code>33</code>. For 8-digit hex with alpha, the fourth pair (e.g., <code>80</code>) converts to an alpha value between 0 and 1: <code>parseInt("80", 16) / 255 ≈ 0.502</code>.',
    convRgbHex: '<strong>RGB to HEX</strong>: To convert <strong>rgb to hex</strong>, take each channel value (0-255), convert it to a two-digit hexadecimal string, and concatenate them with a leading <code>#</code>. For example, <code>rgb(255, 87, 51)</code> becomes <code>#</code> + <code>ff</code> + <code>57</code> + <code>33</code> = <code>#ff5733</code>. In JavaScript: <code>(255).toString(16).padStart(2, "0")</code> returns <code>"ff"</code>. The <code>padStart</code> ensures values below 16 (like 0-15) get a leading zero.',
    convRgbHsl: '<strong>RGB to HSL</strong>: Converting <strong>rgb to hsl</strong> involves several steps. First, normalize R, G, B to the 0-1 range by dividing each by 255. Find the maximum (Cmax) and minimum (Cmin) of the three channels, and compute the delta (Cmax - Cmin). Lightness = (Cmax + Cmin) / 2. Saturation depends on lightness: if delta is 0, saturation is 0; otherwise S = delta / (1 - |2L - 1|). Hue depends on which channel is maximum: if R is max, H = 60 * ((G-B)/delta mod 6); if G is max, H = 60 * ((B-R)/delta + 2); if B is max, H = 60 * ((R-G)/delta + 4). For our orange <code>rgb(255, 87, 51)</code>, this yields approximately <code>hsl(11, 100%, 60%)</code>.',
    convHslHex: '<strong>HSL to HEX</strong>: To convert <strong>hsl to hex</strong>, first convert HSL to RGB using the reverse formula, then convert each RGB channel to hex. The HSL-to-RGB algorithm computes a chroma value C = (1 - |2L - 1|) * S, an intermediate value X = C * (1 - |(H/60) mod 2 - 1|), and a match value m = L - C/2. Based on which 60-degree sector of the hue wheel H falls in, you assign (R1, G1, B1) from combinations of C, X, and 0, then add m to each channel and scale to 0-255.',
    convRgbHsv: '<strong>RGB to HSV</strong>: The hue calculation is identical to RGB-to-HSL. Value = Cmax. Saturation = delta / Cmax (or 0 if Cmax is 0). HSV is simpler than HSL because it does not involve the lightness averaging step. For <code>rgb(255, 87, 51)</code>: V = 1.0 (255/255), S = (255-51)/255 ≈ 0.8, H ≈ 11 degrees.',
    convHslHsv: '<strong>HSL to HSV and vice versa</strong>: While both share the hue component, converting between saturation and lightness/value requires some algebra. The formulas are: V = L + S * min(L, 1-L); Sv = (V > 0) ? 2 * (1 - L/V) : 0. The reverse: L = V * (1 - Sv/2); Sl = (L > 0 and L < 1) ? (V - L) / min(L, 1-L) : 0. These formulas explain why the same numeric saturation value means different things in HSL and HSV.',
    h2_code: 'Color Conversion Code Examples',
    codeJsTitle: 'JavaScript / CSS Color Conversion',
    codeJsDesc: 'JavaScript provides no built-in <strong>color converter</strong>, but CSS color functions and simple parsing make conversions straightforward. Below are reusable functions for <strong>hex to rgb</strong>, <strong>rgb to hex</strong>, and <strong>rgb to hsl</strong> conversions:',
    codePyTitle: 'Python Color Conversion',
    codePyDesc: 'Python\'s standard library includes <code>colorsys</code> for HSL/HSV conversions, and third-party libraries like <code>Pillow</code> and <code>matplotlib</code> offer extended color handling:',
    codeBashTitle: 'Bash / CLI Color Conversion',
    codeBashDesc: 'Command-line tools like <code>printf</code> and ImageMagick\'s <code>convert</code> can handle basic color conversions directly in the terminal:',
    codeCssTitle: 'Modern CSS Color Features',
    codeCssDesc: 'CSS has evolved far beyond basic <code>rgb()</code> and <code>hsl()</code>. Modern CSS supports perceptually uniform color spaces, wide-gamut colors, and powerful color manipulation functions:',
    h2_cssFunctions: 'CSS Color Functions Deep Dive',
    cssFuncDesc1: 'Modern CSS offers a rich set of color functions that every front-end developer should know. The classic <code>rgb()</code> function now accepts the modern space-separated syntax: <code>rgb(255 87 51)</code> or with alpha <code>rgb(255 87 51 / 0.5)</code>. Similarly, <code>hsl()</code> uses <code>hsl(14 100% 60%)</code> without commas. The <code>hwb()</code> function (Hue, Whiteness, Blackness) is a more intuitive alternative: <code>hwb(14 0% 0%)</code> produces a saturated color while <code>hwb(14 30% 20%)</code> mixes in white and black.',
    cssFuncDesc2: 'The <code>oklch()</code> function represents a breakthrough for web color. Based on the Oklab perceptual color space, <code>oklch(lightness chroma hue)</code> ensures that colors with the same lightness value actually <em>look</em> equally bright to the human eye, unlike HSL where <code>hsl(60, 100%, 50%)</code> (yellow) appears far brighter than <code>hsl(240, 100%, 50%)</code> (blue). OKLCH also unlocks the P3 wide-gamut color space, producing more vivid colors on modern displays: <code>oklch(0.7 0.25 29)</code> is a vibrant red-orange that cannot be expressed in sRGB.',
    cssFuncDesc3: 'The <code>color-mix()</code> function blends two colors in any color space: <code>color-mix(in oklch, red 70%, blue)</code> mixes 70% red with 30% blue in the perceptually uniform OKLCH space. The <code>color()</code> function accesses named color spaces directly: <code>color(display-p3 1 0.5 0)</code> specifies an exact P3 color. Relative color syntax lets you derive new colors from existing ones: <code>hsl(from var(--brand) h s calc(l + 20%))</code> creates a lighter variant of your brand color.',
    cssFuncDesc4: 'Other useful CSS color values include <code>currentColor</code> (inherits the current text color, great for SVG icons), <code>transparent</code> (fully transparent black), and CSS custom properties for theming: <code>--color-primary: oklch(0.6 0.2 250)</code>. The <code>light-dark()</code> function automatically selects between two colors based on the user\'s color scheme preference: <code>light-dark(#333, #eee)</code>.',
    h2_accessibility: 'Color Accessibility and Contrast',
    a11yDesc1: '<strong>WCAG contrast ratios</strong> are the foundation of accessible color design. The Web Content Accessibility Guidelines define two conformance levels: <strong>AA</strong> requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18px bold or 24px regular). <strong>AAA</strong> requires 7:1 for normal text and 4.5:1 for large text. The contrast ratio is calculated using the relative luminance of each color: ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter color. Relative luminance uses linearized sRGB values with the formula L = 0.2126*R + 0.7152*G + 0.0722*B.',
    a11yDesc2: '<strong>Color blindness considerations</strong>: Approximately 8% of men and 0.5% of women have some form of color vision deficiency. The most common type is deuteranopia (red-green), followed by protanopia (red-green) and tritanopia (blue-yellow). Never rely on color alone to convey information; always pair color with text labels, icons, or patterns. Avoid problematic combinations like red/green, green/brown, blue/purple, and green/gray. Use a <strong>color picker</strong> with built-in color blindness simulation to test your palette.',
    a11yDesc3: '<strong>Building accessible color palettes</strong>: Start with your brand color and generate shades that meet WCAG AA on both white and dark backgrounds. Use OKLCH or CIELAB for perceptually uniform shade generation rather than simple HSL lightness adjustments. Test every foreground/background combination with a contrast checker. Consider using CSS <code>forced-colors</code> media query for Windows High Contrast mode. The <code>prefers-contrast</code> media query lets you serve higher-contrast variants to users who request them.',
    h2_bestPractices: 'Color Best Practices for Developers',
    bpDesc1: '<strong>Design tokens and CSS custom properties</strong>: Define your color palette as design tokens and map them to CSS custom properties. Use semantic naming like <code>--color-text-primary</code>, <code>--color-surface-elevated</code>, and <code>--color-border-subtle</code> rather than literal names like <code>--blue-500</code>. This decouples your design decisions from implementation, making theme changes trivial: a dark mode is just a new set of token values. Store tokens in a single source of truth (JSON, YAML, or a Figma plugin) and generate CSS, Tailwind config, iOS, and Android values from it.',
    bpDesc2: '<strong>Dark mode strategies</strong>: Simply inverting lightness is a common mistake that produces washed-out or garish results. Instead, design dark mode as a separate theme with its own carefully chosen palette. In OKLCH, you can systematically lower lightness and reduce chroma for dark backgrounds while increasing lightness for text. Use CSS <code>prefers-color-scheme</code> to detect the user\'s preference and <code>color-scheme: light dark</code> on the root to opt in to browser-level dark mode support for form controls and scrollbars.',
    bpDesc3: '<strong>Consistent color naming and usage</strong>: Adopt a naming convention for your color scale (e.g., 50, 100, 200 ... 900, 950) where lower numbers are lighter. Map these to semantic roles: <code>--surface-default</code> might be <code>--gray-50</code> in light mode and <code>--gray-900</code> in dark mode. Never use raw <strong>hex color code</strong> values or <strong>rgb color code</strong> values directly in component styles; always reference tokens. This discipline pays off when rebranding, supporting multiple themes, or scaling a design system across products.',
    bpDesc4: '<strong>Performance considerations</strong>: CSS custom properties are resolved at runtime, which is usually fine but can cause jank if hundreds of properties animate simultaneously. For animations, prefer <code>oklch()</code> interpolation over <code>rgb()</code> for smoother perceptual transitions. Precompute gradient stops rather than relying on <code>color-mix()</code> in tight animation loops. When converting colors server-side for image processing, use C/Rust libraries for hot paths rather than JavaScript/Python.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert HEX to RGB and RGB to HEX?',
    faq1_a: 'To convert HEX to RGB, split the hex code into three pairs (e.g., #FF5733 becomes FF, 57, 33) and parse each pair as a base-16 integer: parseInt("FF", 16) = 255, parseInt("57", 16) = 87, parseInt("33", 16) = 51, giving rgb(255, 87, 51). To convert RGB to HEX, do the reverse: convert each channel to a 2-digit hex string with toString(16).padStart(2, "0") and concatenate them with a # prefix. For example, 255 = ff, 87 = 57, 51 = 33, so the result is #ff5733. Our online color converter tool performs these conversions instantly.',
    faq2_q: 'What is the best color format for web development?',
    faq2_a: 'For most web projects, HEX codes are the default because they are compact, widely supported, and used by design tools like Figma and Sketch. However, HSL is better for theming because you can easily adjust lightness and saturation to create variants. For modern browsers (2024+), oklch() is the best choice because it provides perceptually uniform colors and access to the wider P3 gamut. Use design tokens to store your canonical color values and generate whatever format each platform needs.',
    faq3_q: 'What are the WCAG color contrast requirements for accessibility?',
    faq3_a: 'WCAG 2.1 defines two levels: Level AA requires a contrast ratio of at least 4.5:1 for normal text (under 18px bold or 24px regular) and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text. The contrast ratio is calculated from the relative luminance of the foreground and background colors. Non-text elements like icons and UI controls require at least 3:1 contrast against adjacent colors. Always test with an automated contrast checker and manual screen reader testing.',
    conclusion: 'Color conversion is a foundational skill that connects design tools, CSS authoring, accessibility, and back-end processing. Whether you need a quick <strong>hex to rgb</strong> lookup, a reliable <strong>color code converter</strong> for your build pipeline, or guidance on accessible palettes, this guide provides everything in one place. Bookmark it for reference and try our free tool for instant conversions.',
    linkToolBottom: 'Convert colors between HEX, RGB, HSL, and more with our free online Color Converter.',
    relatedPost: 'Related: Read our in-depth guide on HEX to RGB conversion for additional conversion tips and examples.',
  },
  zh: {
    intro: '无论你是在构建设计系统、调试 CSS，还是将设计稿转换为代码，一个可靠的<strong>颜色转换器</strong>都是开发者工具箱中最常用的工具之一。在 <strong>HEX 转 RGB</strong>、<strong>RGB 转 HEX</strong>、<strong>HSL 转 HEX</strong> 等格式之间转换是日常任务，涉及前端样式、数据可视化、无障碍审计甚至后端图像处理。本综合指南涵盖所有主要颜色模型、转换背后的数学原理、JavaScript/Python/Bash 代码示例以及现代 CSS 颜色特性。如果你需要一个快速的颜色代码转换器，请试用我们的免费在线工具。',
    linkTool: '立即试用我们的免费在线颜色转换工具。',
    h2_models: '理解颜色模型：RGB、HEX、HSL、HSV 和 CMYK',
    modelsDesc1: '<strong>RGB（红、绿、蓝）</strong>是屏幕显示的基础颜色模型。显示器上的每个像素以 0-255 的强度混合红、绿、蓝光。<code>rgb(255, 87, 51)</code> 表示全红、中等绿、低蓝，产生鲜艳的橙色。RGB 是<em>加色</em>模型：三个通道最大值混合产生白色。RGB 是显示器、Canvas API、WebGL 着色器和大多数图像处理库的原生语言。',
    modelsDesc2: '<strong>HEX（十六进制）</strong>是网页上最常见的颜色表示法，是 RGB 值的十六进制紧凑表示。<code>#FF5733</code> 分解为 <code>FF</code>=255红、<code>57</code>=87绿、<code>33</code>=51蓝。HEX 代码支持 3 位简写（<code>#F53</code>）、6 位标准（<code>#FF5733</code>）和 8 位含透明度（<code>#FF573380</code>）格式。由于 HEX 值紧凑且明确，是 CSS、Figma、Sketch 的默认格式。',
    modelsDesc3: '<strong>HSL（色相、饱和度、亮度）</strong>旨在更直观。色相是色轮上的度数（0-360），饱和度是颜色强度百分比（0-100%），亮度从黑色（0%）到纯色（50%）再到白色（100%）。<code>hsl(14, 100%, 60%)</code> 描述我们的橙色。HSL 使创建明暗变体变得简单，只需调整 L 通道。CSS 原生支持 <code>hsl()</code>。',
    modelsDesc4: '<strong>HSV/HSB（色相、饱和度、明度）</strong>是大多数颜色选择器使用的模型，包括 Photoshop、Figma 和系统原生选择器。它与 HSL 共享色相轮，但用明度替换亮度。CSS 不直接支持 HSV，但理解 HSL 和 HSV 的区别有助于将设计准确转换为代码。',
    modelsDesc5: '<strong>CMYK（青、品红、黄、黑）</strong>是印刷用的<em>减色</em>模型。油墨吸收光而非发光，混合所有油墨产生黑色。CMYK 与 CSS 无关，但在生成 PDF 和印刷文件时必不可少。RGB 和 CMYK 之间的准确转换需要 ICC 颜色配置文件。',
    h2_table: '颜色模型对比表',
    tableDesc: '以下表格总结了每种颜色模型的关键属性，帮助你选择适合的格式：',
    h2_conversion: '颜色转换原理：HEX、RGB、HSL 和 HSV 背后的数学',
    convDesc1: '每个颜色代码转换器都实现了一套公知的数学公式。理解这些公式有助于调试边界情况、编写自己的转换器或验证库的输出结果。',
    convHexRgb: '<strong>HEX 转 RGB</strong>：十六进制颜色代码如 <code>#FF5733</code> 由三对十六进制数字组成。将每对独立解析：<code>parseInt("FF", 16)</code> = 255、<code>parseInt("57", 16)</code> = 87、<code>parseInt("33", 16)</code> = 51，结果为 <code>rgb(255, 87, 51)</code>。3 位简写如 <code>#F53</code> 先将每位翻倍。',
    convRgbHex: '<strong>RGB 转 HEX</strong>：将每个通道值（0-255）转换为两位十六进制字符串，用 <code>#</code> 前缀连接。例如 <code>rgb(255, 87, 51)</code> 变为 <code>#ff5733</code>。',
    convRgbHsl: '<strong>RGB 转 HSL</strong>：首先将 R、G、B 归一化到 0-1 范围。找到三个通道的最大值（Cmax）和最小值（Cmin），计算差值 delta。亮度 = (Cmax + Cmin) / 2。饱和度取决于亮度：若 delta 为 0 则饱和度为 0；否则 S = delta / (1 - |2L - 1|)。色相取决于哪个通道最大。',
    convHslHex: '<strong>HSL 转 HEX</strong>：先将 HSL 转为 RGB，再将每个 RGB 通道转为十六进制。HSL 转 RGB 算法计算色度值 C、中间值 X 和匹配值 m，根据色相所在的 60 度扇区分配通道值。',
    convRgbHsv: '<strong>RGB 转 HSV</strong>：色相计算与 RGB 转 HSL 相同。明度 = Cmax。饱和度 = delta / Cmax（Cmax 为 0 时为 0）。HSV 比 HSL 更简单，因为不涉及亮度平均步骤。',
    convHslHsv: '<strong>HSL 与 HSV 互转</strong>：虽然两者共享色相分量，但饱和度和亮度/明度之间的转换需要特定公式。V = L + S * min(L, 1-L)；Sv = (V > 0) ? 2 * (1 - L/V) : 0。',
    h2_code: '颜色转换代码示例',
    codeJsTitle: 'JavaScript / CSS 颜色转换',
    codeJsDesc: 'JavaScript 没有内置颜色转换器，但 CSS 颜色函数和简单解析使转换变得直接。以下是 HEX 转 RGB、RGB 转 HEX 和 RGB 转 HSL 的可复用函数：',
    codePyTitle: 'Python 颜色转换',
    codePyDesc: 'Python 标准库包含用于 HSL/HSV 转换的 <code>colorsys</code>，第三方库如 <code>Pillow</code> 和 <code>matplotlib</code> 提供扩展颜色处理：',
    codeBashTitle: 'Bash / CLI 颜色转换',
    codeBashDesc: '命令行工具如 <code>printf</code> 和 ImageMagick 的 <code>convert</code> 可以在终端直接处理基本颜色转换：',
    codeCssTitle: '现代 CSS 颜色特性',
    codeCssDesc: 'CSS 已远超基本的 <code>rgb()</code> 和 <code>hsl()</code>。现代 CSS 支持感知均匀色彩空间、广色域颜色和强大的颜色操作函数：',
    h2_cssFunctions: 'CSS 颜色函数深度解析',
    cssFuncDesc1: '现代 CSS 提供丰富的颜色函数。经典 <code>rgb()</code> 函数现在接受空格分隔语法：<code>rgb(255 87 51)</code>。<code>hsl()</code> 使用 <code>hsl(14 100% 60%)</code> 无需逗号。<code>hwb()</code> 函数（色相、白度、黑度）是更直观的替代方案。',
    cssFuncDesc2: '<code>oklch()</code> 函数代表了网页颜色的突破。基于 Oklab 感知颜色空间，<code>oklch(亮度 色度 色相)</code> 确保相同亮度值的颜色看起来确实同样明亮。OKLCH 还解锁 P3 广色域，在现代显示器上产生更鲜艳的颜色。',
    cssFuncDesc3: '<code>color-mix()</code> 函数在任何颜色空间中混合两种颜色。<code>color()</code> 函数直接访问命名颜色空间。相对颜色语法可以从现有颜色派生新颜色。',
    cssFuncDesc4: '其他有用的 CSS 颜色值包括 <code>currentColor</code>（继承当前文本颜色）、<code>transparent</code>（完全透明黑色）和用于主题的 CSS 自定义属性。<code>light-dark()</code> 函数根据用户颜色方案偏好自动选择颜色。',
    h2_accessibility: '颜色无障碍与对比度',
    a11yDesc1: '<strong>WCAG 对比度</strong>是无障碍颜色设计的基础。AA 级要求普通文本最低 4.5:1 对比度，大文本 3:1。AAA 级要求普通文本 7:1，大文本 4.5:1。对比度使用相对亮度计算。',
    a11yDesc2: '<strong>色盲考虑</strong>：约 8% 的男性有某种形式的色觉缺陷。切勿仅依靠颜色传达信息；始终配合文本标签、图标或图案。避免红/绿、绿/棕、蓝/紫等问题组合。',
    a11yDesc3: '<strong>构建无障碍调色板</strong>：从品牌颜色开始，生成在白色和深色背景上都符合 WCAG AA 的色阶。使用 OKLCH 进行感知均匀的色阶生成。测试每种前景/背景组合的对比度。',
    h2_bestPractices: '开发者颜色最佳实践',
    bpDesc1: '<strong>设计令牌和 CSS 自定义属性</strong>：将颜色定义为设计令牌并映射到 CSS 自定义属性。使用语义命名如 <code>--color-text-primary</code> 而非 <code>--blue-500</code>。将令牌存储在单一数据源中，从中生成各平台所需格式。',
    bpDesc2: '<strong>暗色模式策略</strong>：简单反转亮度是常见错误。应将暗色模式设计为独立主题。在 OKLCH 中，可以系统性降低暗背景的亮度和色度。使用 CSS <code>prefers-color-scheme</code> 检测用户偏好。',
    bpDesc3: '<strong>一致的颜色命名</strong>：采用颜色阶梯命名约定（如 50、100、200...900）。映射到语义角色。永远不要在组件样式中直接使用原始 HEX 或 RGB 值，始终引用令牌。',
    bpDesc4: '<strong>性能考虑</strong>：CSS 自定义属性在运行时解析。动画中优先使用 <code>oklch()</code> 插值以获得更平滑的感知过渡。服务端颜色转换在热路径中使用 C/Rust 库。',
    h2_faq: '常见问题',
    faq1_q: '如何在 HEX 和 RGB 之间转换？',
    faq1_a: 'HEX 转 RGB：将十六进制代码拆分为三对（如 #FF5733 变为 FF、57、33），将每对解析为十六进制整数。RGB 转 HEX：将每个通道转换为 2 位十六进制字符串并连接。我们的在线颜色转换工具可以即时完成这些转换。',
    faq2_q: 'Web 开发中最佳的颜色格式是什么？',
    faq2_a: '对于大多数项目，HEX 是默认选择；HSL 更适合主题系统；现代浏览器中 oklch() 是最佳选择，因为它提供感知均匀的颜色和更宽的色域。使用设计令牌存储颜色值并生成各平台所需格式。',
    faq3_q: 'WCAG 颜色对比度的无障碍要求是什么？',
    faq3_a: 'WCAG 2.1 定义两个级别：AA 级要求普通文本至少 4.5:1 对比度，大文本 3:1。AAA 级要求普通文本 7:1，大文本 4.5:1。非文本元素如图标需要至少 3:1 对比度。始终使用自动化对比度检查器测试。',
    conclusion: '颜色转换是连接设计工具、CSS 编写、无障碍和后端处理的基础技能。无论你需要快速的 HEX 转 RGB 查询还是可靠的颜色代码转换器，本指南都提供了全面的参考。',
    linkToolBottom: '使用我们的免费在线颜色转换器在 HEX、RGB、HSL 等格式之间转换颜色。',
    relatedPost: '相关阅读：查看我们的 HEX 转 RGB 转换深度指南，获取更多转换技巧和示例。',
  },
  fr: {
    intro: 'Que vous construisiez un systeme de design, debogniez du CSS ou convertissiez une maquette en code, un <strong>convertisseur de couleurs</strong> fiable est l\'un des outils les plus utilises. Ce guide complet explique chaque modele de couleur majeur, les formules mathematiques, des exemples de code en JavaScript, Python et Bash, ainsi que les fonctionnalites CSS modernes comme <code>oklch()</code> et <code>color-mix()</code>.',
    linkTool: 'Essayez notre convertisseur de couleurs gratuit en ligne.',
    h2_models: 'Comprendre les modeles de couleur : RGB, HEX, HSL, HSV et CMYK',
    modelsDesc1: '<strong>RGB (Rouge, Vert, Bleu)</strong> est le modele de couleur fondamental pour les ecrans. Chaque pixel melange la lumiere rouge, verte et bleue a des intensites de 0 a 255. RGB est un modele de couleur <em>additif</em> : le melange des trois canaux au maximum produit du blanc.',
    modelsDesc2: '<strong>HEX (Hexadecimal)</strong> est la notation de couleur la plus courante sur le web. C\'est une representation compacte des valeurs RGB en base 16. <code>#FF5733</code> correspond a <code>rgb(255, 87, 51)</code>. Les codes HEX peuvent etre en 3, 6 ou 8 chiffres.',
    modelsDesc3: '<strong>HSL (Teinte, Saturation, Luminosite)</strong> est concu pour etre plus intuitif. La teinte est un degre (0-360), la saturation et la luminosite sont des pourcentages. HSL facilite la creation de variantes plus claires ou plus sombres.',
    modelsDesc4: '<strong>HSV/HSB (Teinte, Saturation, Valeur)</strong> est le modele utilise par la plupart des selecteurs de couleurs, y compris Photoshop et Figma. Il partage la roue de teinte avec HSL mais remplace la luminosite par la valeur.',
    modelsDesc5: '<strong>CMYK (Cyan, Magenta, Jaune, Noir)</strong> est un modele <em>soustractif</em> pour l\'impression. Les encres absorbent la lumiere. CMYK est essentiel pour la generation de PDF et la preparation de fichiers d\'impression.',
    h2_table: 'Tableau comparatif des modeles de couleur',
    tableDesc: 'Le tableau suivant resume les proprietes cles de chaque modele :',
    h2_conversion: 'Comment fonctionne la conversion de couleurs',
    convDesc1: 'Chaque convertisseur de couleurs implemente des formules mathematiques bien connues. Comprendre ces formules aide a deboguer les cas limites.',
    convHexRgb: '<strong>HEX vers RGB</strong> : Un code hex comme <code>#FF5733</code> est compose de trois paires hexadecimales. Parsez chaque paire independamment pour obtenir les valeurs RGB.',
    convRgbHex: '<strong>RGB vers HEX</strong> : Convertissez chaque valeur de canal (0-255) en chaine hexadecimale a deux chiffres et concatenez avec un prefixe <code>#</code>.',
    convRgbHsl: '<strong>RGB vers HSL</strong> : Normalisez R, G, B dans la plage 0-1, trouvez Cmax et Cmin, calculez le delta, la luminosite, la saturation et la teinte.',
    convHslHex: '<strong>HSL vers HEX</strong> : Convertissez d\'abord HSL en RGB, puis chaque canal RGB en hexadecimal.',
    convRgbHsv: '<strong>RGB vers HSV</strong> : Le calcul de la teinte est identique a RGB vers HSL. Valeur = Cmax. Saturation = delta / Cmax.',
    convHslHsv: '<strong>HSL vers HSV et vice versa</strong> : Les deux partagent la teinte mais la conversion entre saturation et luminosite/valeur necessite des formules specifiques.',
    h2_code: 'Exemples de code de conversion de couleurs',
    codeJsTitle: 'JavaScript / CSS conversion de couleurs',
    codeJsDesc: 'JavaScript ne fournit pas de convertisseur integre, mais les fonctions de couleur CSS et le parsing simple rendent les conversions directes :',
    codePyTitle: 'Python conversion de couleurs',
    codePyDesc: 'Python inclut <code>colorsys</code> pour les conversions HSL/HSV, et des bibliotheques comme <code>Pillow</code> et <code>matplotlib</code> :',
    codeBashTitle: 'Bash / CLI conversion de couleurs',
    codeBashDesc: 'Les outils en ligne de commande comme <code>printf</code> et ImageMagick peuvent gerer les conversions de couleurs basiques :',
    codeCssTitle: 'Fonctionnalites CSS modernes de couleur',
    codeCssDesc: 'Le CSS moderne prend en charge les espaces de couleur perceptuellement uniformes, les couleurs a gamut etendu et les fonctions de manipulation de couleurs :',
    h2_cssFunctions: 'Fonctions CSS de couleur en profondeur',
    cssFuncDesc1: 'Le CSS moderne offre un riche ensemble de fonctions de couleur. <code>rgb()</code> accepte la syntaxe separee par des espaces. <code>hwb()</code> (Teinte, Blancheur, Noirceur) est une alternative plus intuitive.',
    cssFuncDesc2: '<code>oklch()</code> represente une avancee pour les couleurs web. Base sur l\'espace Oklab, il garantit que les couleurs de meme luminosite apparaissent vraiment egalement lumineuses. OKLCH debloque aussi le gamut P3.',
    cssFuncDesc3: '<code>color-mix()</code> melange deux couleurs dans n\'importe quel espace. La syntaxe de couleur relative derive de nouvelles couleurs a partir de couleurs existantes.',
    cssFuncDesc4: 'Autres valeurs utiles : <code>currentColor</code>, <code>transparent</code>, les proprietes personnalisees CSS pour le theming, et <code>light-dark()</code> pour la selection automatique selon le schema de couleurs.',
    h2_accessibility: 'Accessibilite des couleurs et contraste',
    a11yDesc1: 'Les ratios de contraste WCAG sont la base du design accessible. AA exige un ratio de 4.5:1 pour le texte normal et 3:1 pour le grand texte. AAA exige 7:1 et 4.5:1 respectivement.',
    a11yDesc2: 'Environ 8% des hommes ont une forme de deficience de la vision des couleurs. Ne comptez jamais sur la couleur seule pour transmettre des informations. Evitez les combinaisons rouge/vert et bleu/violet.',
    a11yDesc3: 'Construisez des palettes accessibles en utilisant OKLCH pour une generation de teintes perceptuellement uniforme. Testez chaque combinaison premier plan/arriere-plan.',
    h2_bestPractices: 'Meilleures pratiques de couleur pour les developpeurs',
    bpDesc1: 'Definissez votre palette comme des jetons de design mappes a des proprietes CSS personnalisees. Utilisez des noms semantiques comme <code>--color-text-primary</code>.',
    bpDesc2: 'Le mode sombre ne devrait pas etre une simple inversion de luminosite. Concevez-le comme un theme separe avec sa propre palette.',
    bpDesc3: 'Adoptez une convention de nommage pour votre echelle de couleurs et mappez-la a des roles semantiques. Ne jamais utiliser de valeurs HEX brutes dans les styles de composants.',
    bpDesc4: 'Pour les animations, preferez l\'interpolation <code>oklch()</code> pour des transitions perceptuelles plus fluides.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir HEX en RGB et RGB en HEX ?',
    faq1_a: 'Pour HEX vers RGB, divisez le code en trois paires et parsez chacune en entier base-16. Pour RGB vers HEX, convertissez chaque canal en chaine hexadecimale a 2 chiffres et concatenez. Notre outil en ligne effectue ces conversions instantanement.',
    faq2_q: 'Quel est le meilleur format de couleur pour le web ?',
    faq2_a: 'HEX est le format par defaut pour la plupart des projets. HSL est meilleur pour le theming. oklch() est le meilleur choix pour les navigateurs modernes avec des couleurs perceptuellement uniformes et le gamut P3.',
    faq3_q: 'Quelles sont les exigences WCAG de contraste ?',
    faq3_a: 'AA exige un ratio de 4.5:1 pour le texte normal et 3:1 pour le grand texte. AAA exige 7:1 et 4.5:1. Les elements non textuels necessitent au moins 3:1. Testez toujours avec un verificateur de contraste.',
    conclusion: 'La conversion de couleurs est une competence fondamentale reliant les outils de design, le CSS, l\'accessibilite et le traitement back-end. Utilisez notre outil gratuit pour des conversions instantanees.',
    linkToolBottom: 'Convertissez les couleurs entre HEX, RGB, HSL et plus avec notre convertisseur gratuit.',
    relatedPost: 'Lire aussi : notre guide approfondi sur la conversion HEX vers RGB pour plus de conseils.',
  },
  de: {
    intro: 'Ob Sie ein Design-System aufbauen, CSS debuggen oder ein Mockup in Code umsetzen: Ein zuverlassiger <strong>Farbkonverter</strong> gehort zu den meistgenutzten Werkzeugen. Dieser umfassende Leitfaden erklart jedes Farbmodell, die mathematischen Formeln, Code-Beispiele in JavaScript, Python und Bash sowie moderne CSS-Farbfunktionen wie <code>oklch()</code> und <code>color-mix()</code>.',
    linkTool: 'Testen Sie unseren kostenlosen Online-Farbkonverter.',
    h2_models: 'Farbmodelle verstehen: RGB, HEX, HSL, HSV und CMYK',
    modelsDesc1: '<strong>RGB (Rot, Grun, Blau)</strong> ist das grundlegende Farbmodell fur Bildschirme. Jeder Pixel mischt rotes, grunes und blaues Licht mit Intensitaten von 0-255. RGB ist ein <em>additives</em> Farbmodell: alle Kanale auf Maximum ergeben Weiss.',
    modelsDesc2: '<strong>HEX (Hexadezimal)</strong> ist die verbreitetste Farbnotation im Web. Es ist eine kompakte Darstellung von RGB-Werten in Basis 16. <code>#FF5733</code> entspricht <code>rgb(255, 87, 51)</code>. HEX-Codes gibt es in 3-, 6- und 8-stelligen Formaten.',
    modelsDesc3: '<strong>HSL (Farbton, Sattigung, Helligkeit)</strong> ist intuitiver gestaltet. Der Farbton ist ein Grad (0-360), Sattigung und Helligkeit sind Prozentsatze. HSL erleichtert das Erstellen hellerer oder dunklerer Varianten.',
    modelsDesc4: '<strong>HSV/HSB (Farbton, Sattigung, Wert)</strong> ist das Modell der meisten Farbwahler, einschliesslich Photoshop und Figma. CSS unterstutzt HSV nicht direkt.',
    modelsDesc5: '<strong>CMYK (Cyan, Magenta, Gelb, Schwarz)</strong> ist ein <em>subtraktives</em> Farbmodell fur den Druck. CMYK ist fur CSS irrelevant, aber fur PDF-Erzeugung und Druckdateien unverzichtbar.',
    h2_table: 'Farbmodell-Vergleichstabelle',
    tableDesc: 'Die folgende Tabelle fasst die Eigenschaften jedes Farbmodells zusammen:',
    h2_conversion: 'Wie Farbkonvertierung funktioniert',
    convDesc1: 'Jeder Farbkonverter implementiert bekannte mathematische Formeln. Das Verstandnis hilft beim Debuggen von Grenzfallen.',
    convHexRgb: '<strong>HEX zu RGB</strong>: Ein Hex-Code wie <code>#FF5733</code> besteht aus drei hexadezimalen Paaren. Jedes Paar wird unabhangig als Basis-16-Ganzzahl geparst.',
    convRgbHex: '<strong>RGB zu HEX</strong>: Konvertieren Sie jeden Kanalwert (0-255) in eine zweistellige Hexadezimalzeichenkette und verketten Sie sie mit <code>#</code>-Prafix.',
    convRgbHsl: '<strong>RGB zu HSL</strong>: Normalisieren Sie R, G, B auf 0-1, finden Sie Cmax und Cmin, berechnen Sie Delta, Helligkeit, Sattigung und Farbton.',
    convHslHex: '<strong>HSL zu HEX</strong>: Konvertieren Sie zuerst HSL zu RGB, dann jeden RGB-Kanal zu Hexadezimal.',
    convRgbHsv: '<strong>RGB zu HSV</strong>: Die Farbtonberechnung ist identisch mit RGB-zu-HSL. Wert = Cmax. Sattigung = Delta / Cmax.',
    convHslHsv: '<strong>HSL zu HSV und umgekehrt</strong>: Beide teilen den Farbton, aber die Konvertierung zwischen Sattigung und Helligkeit/Wert erfordert spezifische Formeln.',
    h2_code: 'Code-Beispiele zur Farbkonvertierung',
    codeJsTitle: 'JavaScript / CSS Farbkonvertierung',
    codeJsDesc: 'JavaScript bietet keinen eingebauten Farbkonverter, aber CSS-Farbfunktionen machen Konvertierungen unkompliziert:',
    codePyTitle: 'Python Farbkonvertierung',
    codePyDesc: 'Python enthalt <code>colorsys</code> fur HSL/HSV-Konvertierungen und Bibliotheken wie <code>Pillow</code> und <code>matplotlib</code>:',
    codeBashTitle: 'Bash / CLI Farbkonvertierung',
    codeBashDesc: 'Kommandozeilenwerkzeuge wie <code>printf</code> und ImageMagick konnen grundlegende Farbkonvertierungen durchfuhren:',
    codeCssTitle: 'Moderne CSS-Farbfunktionen',
    codeCssDesc: 'Modernes CSS unterstutzt wahrnehmungsgleichmassige Farbraume, Wide-Gamut-Farben und leistungsstarke Farbmanipulationsfunktionen:',
    h2_cssFunctions: 'CSS-Farbfunktionen im Detail',
    cssFuncDesc1: 'Modernes CSS bietet eine reiche Palette an Farbfunktionen. <code>rgb()</code> akzeptiert die leerzeichengetrennte Syntax. <code>hwb()</code> (Farbton, Weissheit, Schwarze) ist eine intuitivere Alternative.',
    cssFuncDesc2: '<code>oklch()</code> ist ein Durchbruch fur Webfarben. Basierend auf dem Oklab-Farbraum stellt es sicher, dass Farben gleicher Helligkeit tatsachlich gleich hell wirken. OKLCH erschliesst auch den P3-Farbraum.',
    cssFuncDesc3: '<code>color-mix()</code> mischt zwei Farben in jedem Farbraum. Relative Farbsyntax leitet neue Farben von bestehenden ab.',
    cssFuncDesc4: 'Weitere nutzliche Werte: <code>currentColor</code>, <code>transparent</code>, CSS Custom Properties fur Theming und <code>light-dark()</code> fur automatische Farbschema-Auswahl.',
    h2_accessibility: 'Farb-Barrierefreiheit und Kontrast',
    a11yDesc1: 'WCAG-Kontrastverhaltnisse sind die Grundlage barrierefreien Farbdesigns. AA erfordert 4.5:1 fur normalen Text und 3:1 fur grossen Text. AAA erfordert 7:1 bzw. 4.5:1.',
    a11yDesc2: 'Etwa 8% der Manner haben eine Form von Farbsehschwache. Verlassen Sie sich nie allein auf Farbe zur Informationsvermittlung. Vermeiden Sie Rot/Grun- und Blau/Lila-Kombinationen.',
    a11yDesc3: 'Erstellen Sie barrierefreie Paletten mit OKLCH fur wahrnehmungsgleichmassige Abstufungen. Testen Sie jede Vordergrund-/Hintergrund-Kombination.',
    h2_bestPractices: 'Farb-Best-Practices fur Entwickler',
    bpDesc1: 'Definieren Sie Ihre Palette als Design Tokens und mappen Sie sie auf CSS Custom Properties. Verwenden Sie semantische Namen wie <code>--color-text-primary</code>.',
    bpDesc2: 'Dark Mode sollte nicht einfach die Helligkeit umkehren. Gestalten Sie ihn als separates Theme mit eigener Palette.',
    bpDesc3: 'Verwenden Sie nie rohe HEX- oder RGB-Werte direkt in Komponentenstilen. Referenzieren Sie immer Tokens.',
    bpDesc4: 'Bevorzugen Sie fur Animationen <code>oklch()</code>-Interpolation fur flussigere wahrnehmbare Ubergange.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie konvertiert man HEX zu RGB und umgekehrt?',
    faq1_a: 'Fur HEX zu RGB teilen Sie den Code in drei Paare und parsen jedes als Basis-16-Ganzzahl. Fur RGB zu HEX konvertieren Sie jeden Kanal in eine 2-stellige Hex-Zeichenkette. Unser Online-Tool fuhrt diese Konvertierungen sofort durch.',
    faq2_q: 'Welches ist das beste Farbformat fur Webentwicklung?',
    faq2_a: 'HEX ist Standard fur die meisten Projekte. HSL ist besser fur Theming. oklch() ist die beste Wahl fur moderne Browser mit wahrnehmungsgleichmassigen Farben und P3-Gamut.',
    faq3_q: 'Was sind die WCAG-Kontrastanforderungen?',
    faq3_a: 'AA erfordert 4.5:1 fur normalen Text und 3:1 fur grossen Text. AAA erfordert 7:1 und 4.5:1. Nicht-Text-Elemente benotigen mindestens 3:1. Testen Sie immer mit einem Kontrastprufer.',
    conclusion: 'Farbkonvertierung ist eine grundlegende Fahigkeit, die Designtools, CSS, Barrierefreiheit und Backend-Verarbeitung verbindet. Nutzen Sie unser kostenloses Tool fur sofortige Konvertierungen.',
    linkToolBottom: 'Konvertieren Sie Farben zwischen HEX, RGB, HSL und mehr mit unserem kostenlosen Farbkonverter.',
    relatedPost: 'Lesen Sie auch: unseren ausfuhrlichen Leitfaden zur HEX-zu-RGB-Konvertierung fur weitere Tipps.',
  },
  es: {
    intro: 'Ya sea que estes construyendo un sistema de diseno, depurando CSS o convirtiendo un mockup en codigo, un <strong>convertidor de colores</strong> confiable es una de las herramientas mas utilizadas. Esta guia completa explica cada modelo de color, las formulas matematicas, ejemplos de codigo en JavaScript, Python y Bash, y las funciones CSS modernas como <code>oklch()</code> y <code>color-mix()</code>.',
    linkTool: 'Prueba nuestro convertidor de colores gratuito en linea.',
    h2_models: 'Entendiendo los modelos de color: RGB, HEX, HSL, HSV y CMYK',
    modelsDesc1: '<strong>RGB (Rojo, Verde, Azul)</strong> es el modelo de color fundamental para pantallas. Cada pixel mezcla luz roja, verde y azul con intensidades de 0 a 255. RGB es un modelo <em>aditivo</em>: mezclar los tres canales al maximo produce blanco.',
    modelsDesc2: '<strong>HEX (Hexadecimal)</strong> es la notacion de color mas comun en la web. Es una representacion compacta de valores RGB en base 16. <code>#FF5733</code> equivale a <code>rgb(255, 87, 51)</code>. Los codigos HEX pueden ser de 3, 6 u 8 digitos.',
    modelsDesc3: '<strong>HSL (Tono, Saturacion, Luminosidad)</strong> esta disenado para ser mas intuitivo. El tono es un grado (0-360), la saturacion y luminosidad son porcentajes. HSL facilita crear variantes mas claras u oscuras.',
    modelsDesc4: '<strong>HSV/HSB (Tono, Saturacion, Valor)</strong> es el modelo usado por la mayoria de selectores de color, incluyendo Photoshop y Figma. CSS no soporta HSV directamente.',
    modelsDesc5: '<strong>CMYK (Cian, Magenta, Amarillo, Negro)</strong> es un modelo <em>sustractivo</em> para impresion. Es esencial para generar PDFs y preparar archivos de impresion.',
    h2_table: 'Tabla comparativa de modelos de color',
    tableDesc: 'La siguiente tabla resume las propiedades clave de cada modelo:',
    h2_conversion: 'Como funciona la conversion de colores',
    convDesc1: 'Cada convertidor de colores implementa formulas matematicas conocidas. Entender estas formulas ayuda a depurar casos limite.',
    convHexRgb: '<strong>HEX a RGB</strong>: Un codigo hex como <code>#FF5733</code> se compone de tres pares hexadecimales. Analiza cada par independientemente para obtener los valores RGB.',
    convRgbHex: '<strong>RGB a HEX</strong>: Convierte cada valor de canal (0-255) a una cadena hexadecimal de dos digitos y concatena con prefijo <code>#</code>.',
    convRgbHsl: '<strong>RGB a HSL</strong>: Normaliza R, G, B al rango 0-1, encuentra Cmax y Cmin, calcula delta, luminosidad, saturacion y tono.',
    convHslHex: '<strong>HSL a HEX</strong>: Primero convierte HSL a RGB, luego cada canal RGB a hexadecimal.',
    convRgbHsv: '<strong>RGB a HSV</strong>: El calculo del tono es identico a RGB a HSL. Valor = Cmax. Saturacion = delta / Cmax.',
    convHslHsv: '<strong>HSL a HSV y viceversa</strong>: Ambos comparten el tono pero la conversion entre saturacion y luminosidad/valor requiere formulas especificas.',
    h2_code: 'Ejemplos de codigo de conversion de colores',
    codeJsTitle: 'JavaScript / CSS conversion de colores',
    codeJsDesc: 'JavaScript no tiene convertidor integrado, pero las funciones de color CSS hacen las conversiones directas:',
    codePyTitle: 'Python conversion de colores',
    codePyDesc: 'Python incluye <code>colorsys</code> para conversiones HSL/HSV y bibliotecas como <code>Pillow</code> y <code>matplotlib</code>:',
    codeBashTitle: 'Bash / CLI conversion de colores',
    codeBashDesc: 'Herramientas de linea de comandos como <code>printf</code> e ImageMagick manejan conversiones basicas:',
    codeCssTitle: 'Funciones CSS modernas de color',
    codeCssDesc: 'El CSS moderno soporta espacios de color perceptualmente uniformes, colores de amplio gamut y funciones de manipulacion de color:',
    h2_cssFunctions: 'Funciones CSS de color en profundidad',
    cssFuncDesc1: 'El CSS moderno ofrece funciones de color ricas. <code>rgb()</code> acepta sintaxis separada por espacios. <code>hwb()</code> (Tono, Blancura, Negrura) es una alternativa intuitiva.',
    cssFuncDesc2: '<code>oklch()</code> representa un avance para los colores web. Basado en el espacio Oklab, garantiza que colores de igual luminosidad realmente parezcan igual de brillantes. OKLCH tambien desbloquea el gamut P3.',
    cssFuncDesc3: '<code>color-mix()</code> mezcla dos colores en cualquier espacio. La sintaxis de color relativa deriva nuevos colores de los existentes.',
    cssFuncDesc4: 'Otros valores utiles: <code>currentColor</code>, <code>transparent</code>, propiedades personalizadas CSS para temas y <code>light-dark()</code> para seleccion automatica de esquema.',
    h2_accessibility: 'Accesibilidad del color y contraste',
    a11yDesc1: 'Los ratios de contraste WCAG son la base del diseno accesible. AA requiere 4.5:1 para texto normal y 3:1 para texto grande. AAA requiere 7:1 y 4.5:1 respectivamente.',
    a11yDesc2: 'Aproximadamente el 8% de los hombres tiene alguna deficiencia de vision del color. Nunca confies solo en el color para transmitir informacion. Evita combinaciones rojo/verde y azul/purpura.',
    a11yDesc3: 'Construye paletas accesibles usando OKLCH para generacion de tonos perceptualmente uniforme. Prueba cada combinacion primer plano/fondo.',
    h2_bestPractices: 'Mejores practicas de color para desarrolladores',
    bpDesc1: 'Define tu paleta como tokens de diseno mapeados a propiedades CSS personalizadas. Usa nombres semanticos como <code>--color-text-primary</code>.',
    bpDesc2: 'El modo oscuro no deberia ser una simple inversion de luminosidad. Disenalo como un tema separado con su propia paleta.',
    bpDesc3: 'Nunca uses valores HEX o RGB crudos directamente en estilos de componentes. Siempre referencia tokens.',
    bpDesc4: 'Para animaciones, prefiere interpolacion <code>oklch()</code> para transiciones perceptuales mas suaves.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como convertir HEX a RGB y RGB a HEX?',
    faq1_a: 'Para HEX a RGB, divide el codigo en tres pares y analiza cada uno como entero base-16. Para RGB a HEX, convierte cada canal a cadena hex de 2 digitos y concatena. Nuestra herramienta en linea realiza estas conversiones instantaneamente.',
    faq2_q: 'Cual es el mejor formato de color para desarrollo web?',
    faq2_a: 'HEX es el formato predeterminado. HSL es mejor para temas. oklch() es la mejor opcion para navegadores modernos con colores perceptualmente uniformes y gamut P3.',
    faq3_q: 'Cuales son los requisitos de contraste WCAG?',
    faq3_a: 'AA requiere 4.5:1 para texto normal y 3:1 para texto grande. AAA requiere 7:1 y 4.5:1. Elementos no textuales necesitan al menos 3:1. Siempre prueba con un verificador de contraste.',
    conclusion: 'La conversion de colores es una habilidad fundamental que conecta herramientas de diseno, CSS, accesibilidad y procesamiento backend. Usa nuestra herramienta gratuita para conversiones instantaneas.',
    linkToolBottom: 'Convierte colores entre HEX, RGB, HSL y mas con nuestro convertidor gratuito.',
    relatedPost: 'Relacionado: lee nuestra guia sobre conversion HEX a RGB para mas consejos.',
  },
  ja: {
    intro: 'デザインシステムの構築、CSSのデバッグ、モックアップのコード変換など、信頼性の高い<strong>カラーコンバーター</strong>は開発者ツールキットで最も使用されるツールの一つです。本ガイドでは主要なカラーモデル、変換の数学的原理、JavaScript/Python/Bashのコード例、<code>oklch()</code>や<code>color-mix()</code>などの最新CSS機能を網羅します。',
    linkTool: '無料オンラインカラーコンバーターツールをお試しください。',
    h2_models: 'カラーモデルの理解：RGB、HEX、HSL、HSV、CMYK',
    modelsDesc1: '<strong>RGB（赤、緑、青）</strong>はスクリーン表示の基本カラーモデルです。各ピクセルは0-255の強度で赤、緑、青の光を混合します。RGBは<em>加法混色</em>モデルで、3チャネル最大値で白になります。',
    modelsDesc2: '<strong>HEX（16進数）</strong>はWebで最も一般的なカラー表記です。RGB値を16進数で表現したもので、<code>#FF5733</code>は<code>rgb(255, 87, 51)</code>と同じです。3桁、6桁、8桁形式があります。',
    modelsDesc3: '<strong>HSL（色相、彩度、明度）</strong>はより直感的に設計されています。色相は色相環上の角度（0-360）、彩度と明度はパーセンテージです。HSLは明暗バリエーションの作成を簡単にします。',
    modelsDesc4: '<strong>HSV/HSB（色相、彩度、明度値）</strong>はPhotoshopやFigmaなど多くのカラーピッカーで使用されるモデルです。CSSはHSVを直接サポートしていません。',
    modelsDesc5: '<strong>CMYK（シアン、マゼンタ、イエロー、ブラック）</strong>は印刷用の<em>減法混色</em>モデルです。PDF生成や印刷ファイル準備に不可欠です。',
    h2_table: 'カラーモデル比較表',
    tableDesc: '以下の表は各カラーモデルの主要な特性をまとめています：',
    h2_conversion: 'カラー変換の仕組み',
    convDesc1: 'すべてのカラーコンバーターは既知の数学的公式を実装しています。これらの公式を理解することでエッジケースのデバッグに役立ちます。',
    convHexRgb: '<strong>HEX→RGB</strong>：<code>#FF5733</code>のような16進カラーコードは3つの16進ペアで構成されます。各ペアを独立して解析しRGB値を取得します。',
    convRgbHex: '<strong>RGB→HEX</strong>：各チャネル値（0-255）を2桁の16進文字列に変換し、<code>#</code>プレフィックスで連結します。',
    convRgbHsl: '<strong>RGB→HSL</strong>：R、G、Bを0-1に正規化し、Cmax、Cminを求め、デルタ、明度、彩度、色相を計算します。',
    convHslHex: '<strong>HSL→HEX</strong>：まずHSLをRGBに変換し、各RGBチャネルを16進数に変換します。',
    convRgbHsv: '<strong>RGB→HSV</strong>：色相計算はRGB→HSLと同じです。V = Cmax、S = delta / Cmax。',
    convHslHsv: '<strong>HSL⇔HSV</strong>：両方とも色相を共有しますが、彩度と明度/値の変換には特定の公式が必要です。',
    h2_code: 'カラー変換コード例',
    codeJsTitle: 'JavaScript / CSS カラー変換',
    codeJsDesc: 'JavaScriptには組み込みカラーコンバーターがありませんが、CSSカラー関数で変換は簡単です：',
    codePyTitle: 'Python カラー変換',
    codePyDesc: 'Pythonは<code>colorsys</code>モジュールでHSL/HSV変換を提供し、<code>Pillow</code>や<code>matplotlib</code>も利用できます：',
    codeBashTitle: 'Bash / CLI カラー変換',
    codeBashDesc: '<code>printf</code>やImageMagickなどのコマンドラインツールで基本的なカラー変換が可能です：',
    codeCssTitle: 'モダンCSSカラー機能',
    codeCssDesc: 'モダンCSSは知覚的に均一な色空間、広色域カラー、強力な色操作関数をサポートしています：',
    h2_cssFunctions: 'CSSカラー関数の詳細',
    cssFuncDesc1: 'モダンCSSは豊富なカラー関数を提供します。<code>rgb()</code>はスペース区切り構文を受け入れます。<code>hwb()</code>（色相、白度、黒度）はより直感的な代替手段です。',
    cssFuncDesc2: '<code>oklch()</code>はWebカラーのブレークスルーです。Oklab色空間に基づき、同じ明度の色が実際に同じ明るさに見えることを保証します。P3広色域も利用可能になります。',
    cssFuncDesc3: '<code>color-mix()</code>は任意の色空間で2色を混合します。相対カラー構文で既存の色から新しい色を導出できます。',
    cssFuncDesc4: 'その他の便利な値：<code>currentColor</code>、<code>transparent</code>、テーマ用CSSカスタムプロパティ、<code>light-dark()</code>による自動カラースキーム選択。',
    h2_accessibility: 'カラーアクセシビリティとコントラスト',
    a11yDesc1: 'WCAGコントラスト比はアクセシブルなカラーデザインの基盤です。AAは通常テスト4.5:1、大きなテキスト3:1を要求。AAAは7:1と4.5:1を要求します。',
    a11yDesc2: '男性の約8%に何らかの色覚異常があります。情報伝達を色だけに頼らないでください。赤/緑、青/紫の組み合わせを避けましょう。',
    a11yDesc3: 'OKLCHを使用して知覚的に均一な色調生成でアクセシブルなパレットを構築します。すべての前景/背景の組み合わせをテストしましょう。',
    h2_bestPractices: '開発者のためのカラーベストプラクティス',
    bpDesc1: 'パレットをデザイントークンとして定義し、CSSカスタムプロパティにマッピングします。<code>--color-text-primary</code>のようなセマンティック名を使用しましょう。',
    bpDesc2: 'ダークモードは単純な明度反転ではなく、独自のパレットを持つ別テーマとして設計します。',
    bpDesc3: 'コンポーネントスタイルで生のHEXやRGB値を直接使用しないでください。常にトークンを参照します。',
    bpDesc4: 'アニメーションでは<code>oklch()</code>補間を使用してよりスムーズな知覚的遷移を実現します。',
    h2_faq: 'よくある質問',
    faq1_q: 'HEXとRGBの相互変換方法は？',
    faq1_a: 'HEX→RGB：コードを3ペアに分割し、各ペアを16進整数として解析します。RGB→HEX：各チャネルを2桁のHEX文字列に変換し連結します。オンラインツールで即座に変換できます。',
    faq2_q: 'Web開発に最適なカラー形式は？',
    faq2_a: 'HEXがほとんどのプロジェクトでデフォルトです。HSLはテーマ設定に適しています。最新ブラウザではoklch()が知覚的に均一な色とP3色域で最良の選択です。',
    faq3_q: 'WCAGのカラーコントラスト要件は？',
    faq3_a: 'AAは通常テキスト4.5:1、大きなテキスト3:1を要求。AAAは7:1と4.5:1。非テキスト要素は最低3:1が必要です。常にコントラストチェッカーでテストしましょう。',
    conclusion: 'カラー変換はデザインツール、CSS、アクセシビリティ、バックエンド処理をつなぐ基本スキルです。無料ツールで即座に変換できます。',
    linkToolBottom: '無料オンラインカラーコンバーターでHEX、RGB、HSLなどの間で色を変換。',
    relatedPost: '関連記事：HEX→RGB変換の詳細ガイドで追加のヒントと例をご覧ください。',
  },
  ko: {
    intro: '디자인 시스템 구축, CSS 디버깅, 목업을 코드로 변환하는 작업에서 신뢰할 수 있는 <strong>색상 변환기</strong>는 가장 많이 사용되는 도구 중 하나입니다. 이 종합 가이드는 모든 주요 색상 모델, 변환의 수학적 원리, JavaScript/Python/Bash 코드 예제, <code>oklch()</code> 및 <code>color-mix()</code> 같은 최신 CSS 기능을 다룹니다.',
    linkTool: '무료 온라인 색상 변환 도구를 사용해 보세요.',
    h2_models: '색상 모델 이해: RGB, HEX, HSL, HSV, CMYK',
    modelsDesc1: '<strong>RGB (빨강, 초록, 파랑)</strong>는 화면 표시의 기본 색상 모델입니다. 각 픽셀은 0-255 강도로 빨강, 초록, 파랑 빛을 혼합합니다. RGB는 <em>가산</em> 색상 모델로 세 채널 최대값 혼합 시 흰색이 됩니다.',
    modelsDesc2: '<strong>HEX (16진수)</strong>는 웹에서 가장 일반적인 색상 표기법입니다. RGB 값의 16진수 표현으로 <code>#FF5733</code>은 <code>rgb(255, 87, 51)</code>과 같습니다. 3자리, 6자리, 8자리 형식이 있습니다.',
    modelsDesc3: '<strong>HSL (색상, 채도, 명도)</strong>는 더 직관적으로 설계되었습니다. 색상은 색상환의 각도(0-360), 채도와 명도는 백분율입니다. HSL은 밝고 어두운 변형 만들기를 쉽게 합니다.',
    modelsDesc4: '<strong>HSV/HSB (색상, 채도, 밝기)</strong>는 Photoshop, Figma 등 대부분의 색상 피커에서 사용하는 모델입니다. CSS는 HSV를 직접 지원하지 않습니다.',
    modelsDesc5: '<strong>CMYK (시안, 마젠타, 노랑, 검정)</strong>는 인쇄용 <em>감산</em> 색상 모델입니다. PDF 생성과 인쇄 파일 준비에 필수적입니다.',
    h2_table: '색상 모델 비교 표',
    tableDesc: '다음 표는 각 색상 모델의 주요 속성을 요약합니다:',
    h2_conversion: '색상 변환의 작동 원리',
    convDesc1: '모든 색상 변환기는 잘 알려진 수학 공식을 구현합니다. 이 공식을 이해하면 엣지 케이스 디버깅에 도움이 됩니다.',
    convHexRgb: '<strong>HEX→RGB</strong>: <code>#FF5733</code> 같은 헥스 코드는 세 개의 16진수 쌍으로 구성됩니다. 각 쌍을 독립적으로 파싱하여 RGB 값을 얻습니다.',
    convRgbHex: '<strong>RGB→HEX</strong>: 각 채널 값(0-255)을 2자리 16진수 문자열로 변환하고 <code>#</code> 접두사로 연결합니다.',
    convRgbHsl: '<strong>RGB→HSL</strong>: R, G, B를 0-1로 정규화하고 Cmax, Cmin을 찾아 델타, 명도, 채도, 색상을 계산합니다.',
    convHslHex: '<strong>HSL→HEX</strong>: 먼저 HSL을 RGB로 변환한 후 각 RGB 채널을 16진수로 변환합니다.',
    convRgbHsv: '<strong>RGB→HSV</strong>: 색상 계산은 RGB→HSL과 동일합니다. V = Cmax, S = delta / Cmax.',
    convHslHsv: '<strong>HSL⇔HSV</strong>: 둘 다 색상을 공유하지만 채도와 명도/밝기 간 변환에는 특정 공식이 필요합니다.',
    h2_code: '색상 변환 코드 예제',
    codeJsTitle: 'JavaScript / CSS 색상 변환',
    codeJsDesc: 'JavaScript에는 내장 색상 변환기가 없지만 CSS 색상 함수로 변환이 간단합니다:',
    codePyTitle: 'Python 색상 변환',
    codePyDesc: 'Python은 HSL/HSV 변환을 위한 <code>colorsys</code>와 <code>Pillow</code>, <code>matplotlib</code> 라이브러리를 제공합니다:',
    codeBashTitle: 'Bash / CLI 색상 변환',
    codeBashDesc: '<code>printf</code>와 ImageMagick 같은 명령줄 도구로 기본 색상 변환이 가능합니다:',
    codeCssTitle: '최신 CSS 색상 기능',
    codeCssDesc: '최신 CSS는 지각적으로 균일한 색 공간, 와이드 가뭇 색상, 강력한 색상 조작 함수를 지원합니다:',
    h2_cssFunctions: 'CSS 색상 함수 심층 분석',
    cssFuncDesc1: '최신 CSS는 풍부한 색상 함수를 제공합니다. <code>rgb()</code>는 공백 구분 구문을 지원합니다. <code>hwb()</code>(색상, 백색도, 흑색도)는 더 직관적인 대안입니다.',
    cssFuncDesc2: '<code>oklch()</code>는 웹 색상의 획기적 발전입니다. Oklab 색 공간 기반으로 같은 밝기의 색이 실제로 동일하게 밝아 보입니다. P3 와이드 가뭇도 사용 가능합니다.',
    cssFuncDesc3: '<code>color-mix()</code>는 모든 색 공간에서 두 색을 혼합합니다. 상대 색상 구문으로 기존 색에서 새 색을 파생할 수 있습니다.',
    cssFuncDesc4: '기타 유용한 값: <code>currentColor</code>, <code>transparent</code>, 테마용 CSS 커스텀 프로퍼티, <code>light-dark()</code> 자동 색 구성 선택.',
    h2_accessibility: '색상 접근성과 대비',
    a11yDesc1: 'WCAG 대비 비율은 접근 가능한 색상 디자인의 기초입니다. AA는 일반 텍스트 4.5:1, 큰 텍스트 3:1을 요구합니다. AAA는 7:1과 4.5:1을 요구합니다.',
    a11yDesc2: '남성의 약 8%가 색각 이상을 가지고 있습니다. 정보 전달을 색상에만 의존하지 마세요. 빨강/초록, 파랑/보라 조합을 피하세요.',
    a11yDesc3: 'OKLCH를 사용하여 지각적으로 균일한 색조 생성으로 접근 가능한 팔레트를 구축하세요. 모든 전경/배경 조합을 테스트하세요.',
    h2_bestPractices: '개발자를 위한 색상 모범 사례',
    bpDesc1: '팔레트를 디자인 토큰으로 정의하고 CSS 커스텀 프로퍼티에 매핑하세요. <code>--color-text-primary</code> 같은 시맨틱 이름을 사용하세요.',
    bpDesc2: '다크 모드는 단순한 밝기 반전이 아닌 별도 테마로 설계하세요.',
    bpDesc3: '컴포넌트 스타일에서 원시 HEX나 RGB 값을 직접 사용하지 마세요. 항상 토큰을 참조하세요.',
    bpDesc4: '애니메이션에는 <code>oklch()</code> 보간을 사용하여 더 부드러운 지각적 전환을 구현하세요.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'HEX와 RGB 간 변환 방법은?',
    faq1_a: 'HEX→RGB: 코드를 세 쌍으로 나누고 각각을 16진 정수로 파싱합니다. RGB→HEX: 각 채널을 2자리 HEX 문자열로 변환하여 연결합니다. 온라인 도구로 즉시 변환할 수 있습니다.',
    faq2_q: '웹 개발에 가장 좋은 색상 형식은?',
    faq2_a: 'HEX가 대부분의 프로젝트에서 기본입니다. HSL은 테마 설정에 더 적합합니다. 최신 브라우저에서는 oklch()가 지각적으로 균일한 색상과 P3 가뭇으로 최선의 선택입니다.',
    faq3_q: 'WCAG 색상 대비 요구사항은?',
    faq3_a: 'AA는 일반 텍스트 4.5:1, 큰 텍스트 3:1을 요구합니다. AAA는 7:1과 4.5:1. 비텍스트 요소는 최소 3:1이 필요합니다. 항상 대비 검사기로 테스트하세요.',
    conclusion: '색상 변환은 디자인 도구, CSS, 접근성, 백엔드 처리를 연결하는 기본 기술입니다. 무료 도구로 즉시 변환하세요.',
    linkToolBottom: '무료 온라인 색상 변환기로 HEX, RGB, HSL 등 간에 색상을 변환하세요.',
    relatedPost: '관련 글: HEX→RGB 변환 심층 가이드에서 추가 팁과 예제를 확인하세요.',
  },
};

export default function ColorConverterRgbHexHslGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/color-converter`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: Understanding Color Models */}
      <h2>{s.h2_models}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.modelsDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.modelsDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.modelsDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.modelsDesc4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.modelsDesc5 }} />

      {/* Section 2: Color Model Comparison Table */}
      <h2>{s.h2_table}</h2>
      <p>{s.tableDesc}</p>
      <table>
        <thead>
          <tr>
            <th>Model</th><th>Format</th><th>Range</th><th>Use Case</th><th>CSS Support</th><th>Human-Readable</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>RGB</td><td><code>rgb(R, G, B)</code></td><td>0-255 per channel</td><td>Screen display, Canvas, WebGL</td><td>Yes</td><td>Low</td></tr>
          <tr><td>HEX</td><td><code>#RRGGBB</code></td><td>00-FF per channel</td><td>CSS, design tools, tokens</td><td>Yes</td><td>Low</td></tr>
          <tr><td>HSL</td><td><code>hsl(H, S%, L%)</code></td><td>H: 0-360, S/L: 0-100%</td><td>Theming, shade generation</td><td>Yes</td><td>High</td></tr>
          <tr><td>HSV/HSB</td><td><code>hsv(H, S%, V%)</code></td><td>H: 0-360, S/V: 0-100%</td><td>Color pickers (Photoshop, Figma)</td><td>No</td><td>High</td></tr>
          <tr><td>CMYK</td><td><code>cmyk(C%, M%, Y%, K%)</code></td><td>0-100% per channel</td><td>Print, PDF generation</td><td>No</td><td>Medium</td></tr>
          <tr><td>OKLCH</td><td><code>oklch(L C H)</code></td><td>L: 0-1, C: 0-0.4, H: 0-360</td><td>Modern CSS, wide gamut</td><td>Yes</td><td>High</td></tr>
        </tbody>
      </table>

      {/* Section 3: How Color Conversion Works */}
      <h2>{s.h2_conversion}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.convDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.convHexRgb }} />
      <p dangerouslySetInnerHTML={{ __html: s.convRgbHex }} />
      <p dangerouslySetInnerHTML={{ __html: s.convRgbHsl }} />
      <p dangerouslySetInnerHTML={{ __html: s.convHslHex }} />
      <p dangerouslySetInnerHTML={{ __html: s.convRgbHsv }} />
      <p dangerouslySetInnerHTML={{ __html: s.convHslHsv }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_code}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== HEX to RGB =====
function hexToRgb(hex) {
  const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
hexToRgb('#FF5733'); // { r: 255, g: 87, b: 51 }

// ===== RGB to HEX =====
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}
rgbToHex(255, 87, 51); // "#ff5733"

// ===== RGB to HSL =====
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    case b: h = ((r - g) / d + 4) / 6; break;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
rgbToHsl(255, 87, 51); // { h: 11, s: 100, l: 60 }

// ===== HSL to RGB =====
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)       { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}
hslToRgb(11, 100, 60); // { r: 255, g: 87, b: 51 }

// ===== CSS native color parsing (modern browsers) =====
// Use CSS.supports() and getComputedStyle for runtime conversion
const el = document.createElement('div');
el.style.color = 'hsl(14 100% 60%)';
document.body.appendChild(el);
const rgb = getComputedStyle(el).color;
// "rgb(255, 87, 51)" - browser converts any format to RGB
document.body.removeChild(el);`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import colorsys

# ===== RGB to HSL (colorsys uses HLS order) =====
r, g, b = 255, 87, 51
r_norm, g_norm, b_norm = r / 255, g / 255, b / 255
h, l, s = colorsys.rgb_to_hls(r_norm, g_norm, b_norm)
print(f"HSL: ({h*360:.0f}, {s*100:.0f}%, {l*100:.0f}%)")
# HSL: (11, 100%, 60%)

# ===== HSL to RGB =====
r2, g2, b2 = colorsys.hls_to_rgb(h, l, s)
print(f"RGB: ({r2*255:.0f}, {g2*255:.0f}, {b2*255:.0f})")
# RGB: (255, 87, 51)

# ===== RGB to HSV =====
h_hsv, s_hsv, v_hsv = colorsys.rgb_to_hsv(r_norm, g_norm, b_norm)
print(f"HSV: ({h_hsv*360:.0f}, {s_hsv*100:.0f}%, {v_hsv*100:.0f}%)")
# HSV: (11, 80%, 100%)

# ===== HEX to RGB =====
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

print(hex_to_rgb("#FF5733"))  # (255, 87, 51)

# ===== RGB to HEX =====
def rgb_to_hex(r, g, b):
    return f"#{r:02x}{g:02x}{b:02x}"

print(rgb_to_hex(255, 87, 51))  # #ff5733

# ===== Using matplotlib colors =====
import matplotlib.colors as mcolors
rgb_tuple = mcolors.to_rgb('#FF5733')     # (1.0, 0.341, 0.2)
hex_value = mcolors.to_hex((1.0, 0.341, 0.2))  # '#ff5733'
rgba = mcolors.to_rgba('steelblue', alpha=0.5)

# ===== Using Pillow/PIL for image colors =====
from PIL import Image
img = Image.new('RGB', (1, 1), (255, 87, 51))
pixel = img.getpixel((0, 0))  # (255, 87, 51)
img_hsv = img.convert('HSV')   # Convert to HSV color space`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== HEX to RGB using printf =====
hex="FF5733"
printf "RGB: %d, %d, %d\\n" 0x\${hex:0:2} 0x\${hex:2:2} 0x\${hex:4:2}
# RGB: 255, 87, 51

# ===== RGB to HEX using printf =====
r=255 g=87 b=51
printf "#%02x%02x%02x\\n" $r $g $b
# #ff5733

# ===== ImageMagick color conversion =====
# Convert HEX to RGB
magick convert xc:"#FF5733" -format "%[fx:int(255*r)],%[fx:int(255*g)],%[fx:int(255*b)]" info:
# 255,87,51

# Get color info in multiple formats
magick convert xc:"#FF5733" -colorspace HSL -format "HSL: %[fx:r*360],%[fx:g*100]%%,%[fx:b*100]%%" info:

# ===== Convert named color to HEX =====
magick convert xc:"tomato" -format "#%02[hex:r]%02[hex:g]%02[hex:b]" info:
# #FF6347

# ===== Batch convert colors from file =====
# colors.txt: one hex color per line
while IFS= read -r color; do
  printf "%s -> RGB: %d, %d, %d\\n" "$color" \\
    0x\${color:1:2} 0x\${color:3:2} 0x\${color:5:2}
done < colors.txt`}</code></pre>

      <h3>{s.codeCssTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCssDesc }} />
      <pre><code>{`/* ===== Modern CSS color syntax (no commas) ===== */
.element {
  /* RGB - modern space-separated */
  color: rgb(255 87 51);
  color: rgb(255 87 51 / 0.5);  /* with alpha */

  /* HSL - modern space-separated */
  background: hsl(14 100% 60%);
  background: hsl(14 100% 60% / 0.8);

  /* HWB - Hue, Whiteness, Blackness */
  border-color: hwb(14 0% 0%);        /* pure orange */
  border-color: hwb(14 20% 10%);      /* muted orange */
}

/* ===== OKLCH - perceptually uniform ===== */
.brand {
  --brand-primary: oklch(0.65 0.25 29);       /* vivid red-orange */
  --brand-light:   oklch(0.85 0.12 29);       /* light variant */
  --brand-dark:    oklch(0.45 0.20 29);       /* dark variant */
  /* Same hue, predictable lightness changes */
}

/* ===== color-mix() - blend colors ===== */
.mixed {
  background: color-mix(in oklch, #FF5733 70%, #3366FF);
  border: 1px solid color-mix(in srgb, currentColor 40%, transparent);
}

/* ===== Relative color syntax ===== */
.derived {
  --base: #FF5733;
  /* Lighten by increasing L in oklch */
  color: oklch(from var(--base) calc(l + 0.2) c h);
  /* Desaturate by reducing chroma */
  background: oklch(from var(--base) l calc(c * 0.5) h);
  /* Shift hue by 180 degrees (complementary) */
  border-color: hsl(from var(--base) calc(h + 180) s l);
}

/* ===== Wide gamut P3 colors ===== */
@supports (color: color(display-p3 1 0 0)) {
  .vivid {
    color: color(display-p3 1 0.3 0.1); /* more vivid than sRGB */
  }
}

/* ===== Dark mode with light-dark() ===== */
:root {
  color-scheme: light dark;
  --text: light-dark(#1a1a1a, #e5e5e5);
  --surface: light-dark(#ffffff, #121212);
}

/* ===== CSS custom properties for theming ===== */
:root {
  --color-primary-h: 14;
  --color-primary-s: 100%;
  --color-primary-l: 60%;
  --color-primary: hsl(
    var(--color-primary-h)
    var(--color-primary-s)
    var(--color-primary-l)
  );
  --color-primary-hover: hsl(
    var(--color-primary-h)
    var(--color-primary-s)
    calc(var(--color-primary-l) - 10%)
  );
}`}</code></pre>

      {/* Section 5: CSS Color Functions Deep Dive */}
      <h2>{s.h2_cssFunctions}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.cssFuncDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cssFuncDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cssFuncDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cssFuncDesc4 }} />

      {/* Section 6: Color Accessibility & Contrast */}
      <h2>{s.h2_accessibility}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.a11yDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.a11yDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.a11yDesc3 }} />

      {/* Section 7: Color Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bpDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bpDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bpDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bpDesc4 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/blog/hex-to-rgb-converter-color-guide`} style={{ fontWeight: 500 }}>{s.relatedPost}</Link></p>
      <p><Link href={`/${lang}/tools/color-converter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
