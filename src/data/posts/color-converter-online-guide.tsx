'use client';

import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Color converters transform color values between formats like HEX, RGB, HSL, HSV, and CMYK. HEX (#3B82F6) is shorthand for RGB. HSL separates hue from brightness, making it ideal for design systems. CMYK is for print. For accessibility, WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal text. Use our free tool below for instant conversions.',
    key_title: 'Key Takeaways',
    key1: 'HEX, RGB, and HSL all describe the same sRGB color space and are lossless to convert between.',
    key2: 'HSL is the most intuitive model for creating consistent color palettes and dark mode themes.',
    key3: 'CMYK is a subtractive model used exclusively for print; converting from RGB to CMYK is lossy.',
    key4: 'WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.',
    key5: 'CSS now supports modern color spaces like OKLCH, Display P3, and Lab via the color() function.',
    key6: 'Tailwind CSS uses a 50-950 shade scale mapped to specific HSL/RGB values for every color.',
    linkTool: 'Try our free online Color Converter tool -- convert HEX, RGB, HSL, HSV, and CMYK instantly.',
    h2_models: 'Color Models Explained: HEX, RGB, HSL, HSV, CMYK',
    h3_hex: 'HEX Color Codes',
    hexDesc: '<strong>HEX color codes</strong> are the most common format in CSS. A hex code is a 6-character string prefixed with <code>#</code>, where each pair represents a red, green, or blue channel as a hexadecimal value from 00 to FF. For example, <code>#3B82F6</code> means R=59, G=130, B=246. CSS supports 3-character shorthand (<code>#F00</code> expands to <code>#FF0000</code>) and 8-character hex with alpha (<code>#3B82F680</code> for 50% opacity). HEX is simply a compact notation for RGB values.',
    h3_rgb: 'RGB (Red, Green, Blue)',
    rgbDesc: '<strong>RGB</strong> defines colors using three decimal values (0-255) for red, green, and blue light intensity. It is an additive color model: mixing all three at maximum (255, 255, 255) produces white, while (0, 0, 0) is black. RGB is the native format for screens, monitors, Canvas API, WebGL, and most image processing libraries. In CSS: <code>rgb(59, 130, 246)</code> or the modern space-separated syntax <code>rgb(59 130 246)</code>.',
    h3_hsl: 'HSL (Hue, Saturation, Lightness)',
    hslDesc: '<strong>HSL</strong> represents colors using three intuitive dimensions: <strong>Hue</strong> (0-360 degrees on the color wheel), <strong>Saturation</strong> (0%-100%, gray to vivid), and <strong>Lightness</strong> (0%-100%, black to white). HSL is the most designer-friendly model because you can create shades by adjusting lightness, change vibrancy via saturation, and shift colors by rotating hue. In CSS: <code>hsl(217, 91%, 60%)</code>.',
    h3_hsv: 'HSV / HSB (Hue, Saturation, Value/Brightness)',
    hsvDesc: '<strong>HSV</strong> (also called HSB) shares the same Hue axis as HSL but replaces Lightness with Value (Brightness). In HSV, 100% Value means the color is at its brightest, while 0% is black. HSV is commonly used in color pickers in design tools like Photoshop, Figma, and GIMP because its brightness axis maps intuitively to how users perceive color intensity. HSV and HSL are related but not interchangeable: the same hue and saturation values produce different colors in each model.',
    h3_cmyk: 'CMYK (Cyan, Magenta, Yellow, Key/Black)',
    cmykDesc: '<strong>CMYK</strong> is a subtractive color model used in printing. Instead of adding light (like RGB), CMYK works by subtracting light from white paper using four ink layers. Cyan absorbs red, Magenta absorbs green, Yellow absorbs blue, and Key (Black) adds depth. CMYK values range from 0% to 100% for each channel. Because the CMYK gamut is smaller than sRGB, converting from RGB to CMYK is lossy -- some screen colors cannot be exactly reproduced in print.',
    h2_formulas: 'Color Conversion Formulas',
    h3_hex_to_rgb: 'HEX to RGB',
    hexToRgbDesc: 'HEX to RGB is a straightforward base conversion. Each hex pair maps directly to an RGB channel:',
    h3_rgb_to_hex: 'RGB to HEX',
    rgbToHexDesc: 'RGB to HEX reverses the process by converting each decimal channel to a 2-digit hex string:',
    h3_rgb_to_hsl: 'RGB to HSL',
    rgbToHslDesc: 'The RGB to HSL conversion normalizes channel values to 0-1, finds the min/max, then calculates hue, saturation, and lightness:',
    h3_hsl_to_rgb: 'HSL to RGB',
    hslToRgbDesc: 'The HSL to RGB conversion uses a helper function to map hue sectors back to channel intensities:',
    h3_rgb_to_cmyk: 'RGB to CMYK',
    rgbToCmykDesc: 'The RGB to CMYK conversion first normalizes RGB to 0-1, calculates the Key (black) channel, then derives CMY:',
    h2_css: 'CSS Color Formats: Complete Reference',
    cssDesc: 'CSS supports many color formats. Here is a comprehensive overview of all the formats you can use in modern CSS:',
    h2_named: 'CSS Named Colors',
    namedDesc: 'CSS defines 148 named colors that you can use directly in stylesheets. Here are some of the most commonly used ones, grouped by family:',
    h2_accessibility: 'Color Accessibility and WCAG Contrast Ratios',
    a11yDesc: 'Color accessibility ensures that text and UI elements are visible to all users, including those with color vision deficiencies (affecting approximately 8% of males and 0.5% of females worldwide). The Web Content Accessibility Guidelines (WCAG) 2.1 define minimum contrast ratios between foreground text and background colors.',
    a11yLevels: '<strong>WCAG Contrast Levels:</strong>',
    a11yAA: '<strong>Level AA (minimum)</strong>: 4.5:1 contrast ratio for normal text (below 18pt / 24px), 3:1 for large text (18pt bold or 24px regular).',
    a11yAAA: '<strong>Level AAA (enhanced)</strong>: 7:1 for normal text, 4.5:1 for large text.',
    a11yUI: '<strong>Non-text contrast</strong>: 3:1 for UI components and graphical objects (buttons, icons, form borders).',
    a11yFormula: 'The contrast ratio formula uses relative luminance: <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code> where L1 is the lighter color luminance and L2 is the darker. Relative luminance is calculated by linearizing sRGB values and applying the BT.709 coefficients: <code>L = 0.2126 * R + 0.7152 * G + 0.0722 * B</code>.',
    a11yTips: '<strong>Practical tips for accessible color design:</strong>',
    a11yTip1: 'Never rely on color alone to convey information. Use icons, patterns, or labels alongside color.',
    a11yTip2: 'Test your color combinations with tools that simulate deuteranopia, protanopia, and tritanopia.',
    a11yTip3: 'Use high-contrast mode testing to ensure your UI remains usable.',
    a11yTip4: 'Prefer HSL for building accessible palettes: keep saturation consistent and adjust lightness for contrast.',
    h2_design: 'Color in Design Systems',
    designDesc: 'Design systems use structured color palettes to ensure consistency across products. A well-designed color system typically includes:',
    designPrimary: '<strong>Primary colors</strong>: Brand colors used for CTAs, links, and key UI elements (usually 1-3 hues).',
    designNeutral: '<strong>Neutral colors</strong>: Grays for text, backgrounds, borders, and surfaces (typically 8-12 shades).',
    designSemantic: '<strong>Semantic colors</strong>: Success (green), Warning (yellow/amber), Error (red), Info (blue) for status communication.',
    designShade: '<strong>Shade scales</strong>: Each color has a range from light to dark (e.g., blue-50 to blue-950), with 50 being the lightest tint and 950 being the darkest shade.',
    designToken: 'Modern design systems define colors as <strong>design tokens</strong> -- named variables that abstract raw color values. For example, <code>--color-primary</code> might map to <code>#3B82F6</code> in light mode and <code>#60A5FA</code> in dark mode.',
    h2_tailwind: 'Tailwind CSS Colors',
    tailwindDesc: 'Tailwind CSS provides a comprehensive, hand-tuned color palette with 22 color families, each spanning 11 shades (50, 100, 200, ..., 900, 950). These colors are designed for accessibility and visual harmony. Here are some key examples:',
    tailwindUsage: 'Tailwind color usage in CSS classes follows a simple pattern: <code>bg-blue-500</code> for background, <code>text-blue-500</code> for text, <code>border-blue-500</code> for borders. You can customize the palette in <code>tailwind.config.js</code> by extending or replacing the default colors.',
    h2_code_js: 'Color Conversion in JavaScript',
    codeJsDesc: 'Here are complete, production-ready color conversion functions in JavaScript:',
    h2_code_py: 'Color Conversion in Python',
    codePyDesc: 'Python provides the built-in <code>colorsys</code> module for color conversions, plus you can write manual converters:',
    h2_code_css: 'Color Conversion in CSS',
    codeCssDesc: 'CSS natively supports multiple color formats. You can use any format interchangeably, and the browser handles conversion:',
    h2_modern: 'Modern CSS Color Spaces',
    modernDesc: 'CSS Color Level 4 introduces new color spaces that go beyond sRGB, enabling wider gamut and perceptually uniform colors:',
    modernOklch: '<strong>OKLCH</strong>: A perceptually uniform color space with Lightness, Chroma, and Hue axes. Colors with the same L value appear equally bright. Ideal for generating harmonious palettes: <code>oklch(0.7 0.15 250)</code>.',
    modernLab: '<strong>Lab / LCH</strong>: CIE Lab separates lightness from color information. LCH is the cylindrical form. Both aim for perceptual uniformity: <code>lab(60 -20 50)</code>, <code>lch(60 40 120)</code>.',
    modernP3: '<strong>Display P3</strong>: A wider gamut color space used by modern Apple displays and HDR screens. Access via <code>color(display-p3 0.23 0.51 0.96)</code>. P3 can represent colors that sRGB cannot, particularly vivid reds, greens, and blues.',
    modernFallback: 'Always provide sRGB fallbacks for modern color spaces, as not all browsers or displays support them:',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best color format for CSS?',
    faq1_a: 'For most CSS work, HEX is the most common choice due to its compact syntax. Use HSL when you need to create dynamic color systems or programmatically adjust lightness and saturation. Use RGBA when you need transparency. For cutting-edge design, OKLCH provides perceptual uniformity.',
    faq2_q: 'How do I convert HEX to RGB?',
    faq2_a: 'Remove the # prefix, split the 6 characters into three pairs (RR, GG, BB), and convert each pair from hexadecimal to decimal. For example, #3B82F6 becomes R=59 (3B in hex), G=130 (82 in hex), B=246 (F6 in hex), which is rgb(59, 130, 246).',
    faq3_q: 'What is the difference between HSL and HSV?',
    faq3_a: 'Both HSL and HSV use Hue on a 0-360 degree wheel, but they differ in how they handle brightness. HSL uses Lightness (0% = black, 50% = pure color, 100% = white), while HSV uses Value (0% = black, 100% = full brightness). HSL is used in CSS, while HSV is common in color pickers in design tools like Photoshop and Figma.',
    faq4_q: 'Why do my screen colors look different when printed?',
    faq4_a: 'Screens use the additive RGB model (light emission), while printers use the subtractive CMYK model (ink absorption). The CMYK color gamut is smaller than sRGB, meaning some vivid screen colors cannot be reproduced in print. This is why designers use ICC color profiles and proof their designs before printing.',
    faq5_q: 'What WCAG contrast ratio do I need for accessibility?',
    faq5_a: 'WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 for normal text (below 18pt/24px) and 3:1 for large text (18pt bold or 24px regular). Level AAA requires 7:1 and 4.5:1 respectively. UI components and graphical objects need at least 3:1 contrast.',
    faq6_q: 'What is OKLCH and should I use it?',
    faq6_a: 'OKLCH is a perceptually uniform color space introduced in CSS Color Level 4. It ensures that colors with the same lightness value appear equally bright to the human eye, making it ideal for generating harmonious palettes. Browser support is strong in Chrome 111+, Safari 15.4+, and Firefox 113+. Use it with sRGB fallbacks for broad compatibility.',
    faq7_q: 'How do I create a dark mode color palette?',
    faq7_a: 'The most effective approach is to use HSL or OKLCH and adjust the lightness dimension. For light mode, use higher lightness values for backgrounds and lower for text. Invert this for dark mode. Define colors as CSS custom properties so you can swap entire palettes by changing a few variables. Typically, dark mode backgrounds use lightness values of 10-20%, while text uses 85-95%.',
    conclusion: 'Understanding color models and conversion between them is essential for every developer and designer. Whether you are building a design system, optimizing for accessibility, or working across screen and print media, mastering HEX, RGB, HSL, HSV, and CMYK will make your work more precise and consistent. Bookmark this guide and use our free tool for instant conversions.',
    linkToolBottom: 'Convert colors instantly with our free Color Converter tool.',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: '颜色转换器在 HEX、RGB、HSL、HSV 和 CMYK 等格式之间转换颜色值。HEX (#3B82F6) 是 RGB 的简写。HSL 将色相与亮度分离，非常适合设计系统。CMYK 用于印刷。在无障碍方面，WCAG 2.1 要求正常文本的最低对比度为 4.5:1。使用我们的免费工具即时转换。',
    key_title: '关键要点',
    key1: 'HEX、RGB 和 HSL 都描述相同的 sRGB 色彩空间，相互转换无损。',
    key2: 'HSL 是创建一致调色板和暗色主题最直观的模型。',
    key3: 'CMYK 是专门用于印刷的减色模型；从 RGB 转 CMYK 有损。',
    key4: 'WCAG 2.1 要求正常文本对比度至少 4.5:1，大文本至少 3:1。',
    key5: 'CSS 现在通过 color() 函数支持 OKLCH、Display P3 和 Lab 等现代色彩空间。',
    key6: 'Tailwind CSS 使用 50-950 色阶，映射到每种颜色的特定 HSL/RGB 值。',
    linkTool: '试用我们的免费在线颜色转换器工具 -- 即时转换 HEX、RGB、HSL、HSV 和 CMYK。',
    h2_models: '颜色模型详解：HEX、RGB、HSL、HSV、CMYK',
    h3_hex: 'HEX 颜色代码',
    hexDesc: '<strong>HEX 颜色代码</strong>是 CSS 中最常见的格式。十六进制代码是以 <code>#</code> 开头的 6 字符字符串，每对字符表示红、绿、蓝通道的十六进制值（00 到 FF）。例如 <code>#3B82F6</code> 表示 R=59, G=130, B=246。CSS 支持 3 字符简写和 8 字符带透明度的 hex。HEX 本质上是 RGB 值的紧凑表示。',
    h3_rgb: 'RGB（红、绿、蓝）',
    rgbDesc: '<strong>RGB</strong> 使用三个十进制值（0-255）定义红、绿、蓝光强度。这是加色模型：三色最大值混合产生白色，全零产生黑色。RGB 是屏幕、Canvas API、WebGL 和图像处理库的原生格式。在 CSS 中：<code>rgb(59, 130, 246)</code>。',
    h3_hsl: 'HSL（色相、饱和度、亮度）',
    hslDesc: '<strong>HSL</strong> 使用三个直观维度表示颜色：<strong>色相</strong>（0-360度色轮）、<strong>饱和度</strong>（0%-100%）和<strong>亮度</strong>（0%-100%）。HSL 是最适合设计师的模型，可以通过调整亮度创建色阶、通过饱和度改变鲜艳度、通过旋转色相切换颜色。',
    h3_hsv: 'HSV / HSB（色相、饱和度、明度）',
    hsvDesc: '<strong>HSV</strong>（也称 HSB）与 HSL 共享色相轴，但用明度（Value）替代亮度。HSV 常用于 Photoshop、Figma 等设计工具的取色器中。HSV 和 HSL 相关但不可互换。',
    h3_cmyk: 'CMYK（青、品红、黄、黑）',
    cmykDesc: '<strong>CMYK</strong> 是用于印刷的减色模型。CMYK 通过在白纸上叠加墨水吸收光线来工作。由于 CMYK 色域小于 sRGB，从 RGB 转 CMYK 是有损的。',
    h2_formulas: '颜色转换公式',
    h3_hex_to_rgb: 'HEX 转 RGB',
    hexToRgbDesc: 'HEX 转 RGB 是简单的进制转换，每对十六进制字符直接映射到一个 RGB 通道：',
    h3_rgb_to_hex: 'RGB 转 HEX',
    rgbToHexDesc: 'RGB 转 HEX 反向操作，将每个十进制通道转换为 2 位十六进制字符串：',
    h3_rgb_to_hsl: 'RGB 转 HSL',
    rgbToHslDesc: 'RGB 转 HSL 先将通道值归一化到 0-1，找最大最小值，然后计算色相、饱和度和亮度：',
    h3_hsl_to_rgb: 'HSL 转 RGB',
    hslToRgbDesc: 'HSL 转 RGB 使用辅助函数将色相扇区映射回通道强度：',
    h3_rgb_to_cmyk: 'RGB 转 CMYK',
    rgbToCmykDesc: 'RGB 转 CMYK 先将 RGB 归一化到 0-1，计算黑色通道（Key），然后推导 CMY：',
    h2_css: 'CSS 颜色格式：完整参考',
    cssDesc: 'CSS 支持多种颜色格式。以下是现代 CSS 中所有可用格式的概述：',
    h2_named: 'CSS 命名颜色',
    namedDesc: 'CSS 定义了 148 种命名颜色，可直接在样式表中使用。以下按色系分组列出常用颜色：',
    h2_accessibility: '颜色无障碍与 WCAG 对比度要求',
    a11yDesc: '颜色无障碍确保所有用户（包括色觉缺陷者）都能看到文本和 UI 元素。WCAG 2.1 定义了前景文本和背景之间的最低对比度要求。',
    a11yLevels: '<strong>WCAG 对比度级别：</strong>',
    a11yAA: '<strong>AA 级（最低要求）</strong>：正常文本 4.5:1，大文本 3:1。',
    a11yAAA: '<strong>AAA 级（增强）</strong>：正常文本 7:1，大文本 4.5:1。',
    a11yUI: '<strong>非文本对比度</strong>：UI 组件和图形对象至少 3:1。',
    a11yFormula: '对比度公式使用相对亮度：<code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>，L1 为较亮颜色，L2 为较暗颜色。',
    a11yTips: '<strong>无障碍颜色设计实用建议：</strong>',
    a11yTip1: '不要仅依赖颜色传递信息，同时使用图标、图案或标签。',
    a11yTip2: '使用工具测试色觉缺陷模拟（绿色盲、红色盲、蓝色盲）。',
    a11yTip3: '使用高对比度模式测试，确保 UI 可用。',
    a11yTip4: '使用 HSL 构建无障碍调色板：保持饱和度一致，调整亮度确保对比度。',
    h2_design: '设计系统中的颜色',
    designDesc: '设计系统使用结构化调色板确保产品一致性。完善的颜色系统通常包括：',
    designPrimary: '<strong>主色</strong>：用于 CTA、链接和关键 UI 元素的品牌色。',
    designNeutral: '<strong>中性色</strong>：用于文本、背景、边框的灰色系列。',
    designSemantic: '<strong>语义色</strong>：成功（绿）、警告（黄/琥珀）、错误（红）、信息（蓝）。',
    designShade: '<strong>色阶</strong>：每种颜色从浅到深的范围（如 blue-50 到 blue-950）。',
    designToken: '现代设计系统将颜色定义为<strong>设计令牌</strong>——抽象原始颜色值的命名变量。',
    h2_tailwind: 'Tailwind CSS 颜色',
    tailwindDesc: 'Tailwind CSS 提供 22 个颜色系列，每个有 11 个色阶（50-950）。以下是关键示例：',
    tailwindUsage: 'Tailwind 颜色使用模式：<code>bg-blue-500</code>（背景）、<code>text-blue-500</code>（文本）、<code>border-blue-500</code>（边框）。',
    h2_code_js: 'JavaScript 颜色转换',
    codeJsDesc: '以下是完整的生产就绪 JavaScript 颜色转换函数：',
    h2_code_py: 'Python 颜色转换',
    codePyDesc: 'Python 提供内置 <code>colorsys</code> 模块，也可手写转换器：',
    h2_code_css: 'CSS 颜色转换',
    codeCssDesc: 'CSS 原生支持多种颜色格式，浏览器自动处理转换：',
    h2_modern: '现代 CSS 色彩空间',
    modernDesc: 'CSS Color Level 4 引入了超越 sRGB 的新色彩空间：',
    modernOklch: '<strong>OKLCH</strong>：感知均匀色彩空间。相同 L 值的颜色看起来一样亮。适合生成和谐调色板。',
    modernLab: '<strong>Lab / LCH</strong>：CIE Lab 分离亮度和色彩信息。旨在感知均匀。',
    modernP3: '<strong>Display P3</strong>：现代 Apple 显示器和 HDR 屏幕使用的广色域空间。',
    modernFallback: '始终为现代色彩空间提供 sRGB 降级方案：',
    h2_faq: '常见问题',
    faq1_q: 'CSS 最佳颜色格式是什么？',
    faq1_a: '对于大多数 CSS 工作，HEX 因其紧凑语法最为常用。需要动态颜色系统时使用 HSL。需要透明度时使用 RGBA。追求前沿设计可使用 OKLCH。',
    faq2_q: '如何将 HEX 转换为 RGB？',
    faq2_a: '移除 # 前缀，将 6 个字符分成三对（RR、GG、BB），将每对从十六进制转换为十进制。例如 #3B82F6 变为 R=59, G=130, B=246。',
    faq3_q: 'HSL 和 HSV 有什么区别？',
    faq3_a: 'HSL 和 HSV 都使用 0-360 度色轮，但处理亮度的方式不同。HSL 使用亮度（0%=黑，50%=纯色，100%=白），HSV 使用明度（0%=黑，100%=最亮）。HSL 用于 CSS，HSV 常见于设计工具的取色器。',
    faq4_q: '为什么屏幕颜色和打印颜色不同？',
    faq4_a: '屏幕使用加色 RGB 模型（发光），打印机使用减色 CMYK 模型（墨水吸收）。CMYK 色域小于 sRGB，某些鲜艳的屏幕颜色无法在印刷中精确再现。',
    faq5_q: '无障碍需要什么对比度？',
    faq5_a: 'WCAG 2.1 AA 级要求正常文本最低对比度 4.5:1，大文本 3:1。AAA 级分别要求 7:1 和 4.5:1。UI 组件至少需要 3:1。',
    faq6_q: 'OKLCH 是什么，应该使用它吗？',
    faq6_a: 'OKLCH 是 CSS Color Level 4 引入的感知均匀色彩空间。Chrome 111+、Safari 15.4+、Firefox 113+ 支持。建议配合 sRGB 降级使用。',
    faq7_q: '如何创建暗色模式调色板？',
    faq7_a: '使用 HSL 或 OKLCH 调整亮度维度。亮色模式背景用高亮度，文本用低亮度。暗色模式反转。将颜色定义为 CSS 自定义属性，通过改变几个变量即可切换整个调色板。',
    conclusion: '理解颜色模型及其转换对每个开发者和设计师都至关重要。无论是构建设计系统、优化无障碍性，还是跨屏幕和印刷媒体工作，掌握 HEX、RGB、HSL、HSV 和 CMYK 将使你的工作更精确和一致。',
    linkToolBottom: '使用我们的免费颜色转换器即时转换颜色。',
  },
  ja: {
    tldr_title: 'TL;DR',
    tldr: 'カラーコンバーターは HEX、RGB、HSL、HSV、CMYK 間で色値を変換します。HEX は RGB の略記法です。HSL は色相と明るさを分離し、デザインシステムに最適です。CMYK は印刷用です。WCAG 2.1 は通常テキストに最低 4.5:1 のコントラスト比を要求します。',
    key_title: '主なポイント',
    key1: 'HEX、RGB、HSL はすべて同じ sRGB 色空間を記述し、相互変換は無損失です。',
    key2: 'HSL は一貫したカラーパレットとダークモードテーマの作成に最も直感的なモデルです。',
    key3: 'CMYK は印刷専用の減法混色モデルで、RGB から CMYK への変換は非可逆です。',
    key4: 'WCAG 2.1 は通常テキストに 4.5:1、大きなテキストに 3:1 の最低コントラスト比を要求します。',
    key5: 'CSS は color() 関数を通じて OKLCH、Display P3、Lab などの最新色空間をサポートしています。',
    key6: 'Tailwind CSS は各色に 50-950 のシェードスケールを使用しています。',
    linkTool: '無料オンラインカラーコンバーターツールをお試しください。',
    h2_models: 'カラーモデル解説：HEX、RGB、HSL、HSV、CMYK',
    h3_hex: 'HEX カラーコード', hexDesc: '<strong>HEX カラーコード</strong>は CSS で最も一般的な形式です。各ペアが RGB チャンネルの 16 進数値を表します。',
    h3_rgb: 'RGB（赤、緑、青）', rgbDesc: '<strong>RGB</strong> は 3 つの 10 進数値（0-255）で色を定義する加法混色モデルです。',
    h3_hsl: 'HSL（色相、彩度、明度）', hslDesc: '<strong>HSL</strong> は色相（0-360度）、彩度（0%-100%）、明度（0%-100%）の 3 つの直感的な次元で色を表現します。',
    h3_hsv: 'HSV / HSB', hsvDesc: '<strong>HSV</strong> は HSL と色相軸を共有しますが、明度を Value（輝度）に置き換えます。デザインツールのカラーピッカーで一般的です。',
    h3_cmyk: 'CMYK', cmykDesc: '<strong>CMYK</strong> は印刷で使用される減法混色モデルです。RGB からの変換は非可逆です。',
    h2_formulas: '色変換公式', h3_hex_to_rgb: 'HEX から RGB', hexToRgbDesc: 'HEX から RGB は基数変換です：',
    h3_rgb_to_hex: 'RGB から HEX', rgbToHexDesc: '各 10 進チャンネルを 2 桁の 16 進文字列に変換：',
    h3_rgb_to_hsl: 'RGB から HSL', rgbToHslDesc: 'チャンネル値を 0-1 に正規化し、色相・彩度・明度を計算：',
    h3_hsl_to_rgb: 'HSL から RGB', hslToRgbDesc: 'ヘルパー関数で色相セクターをチャンネル強度にマッピング：',
    h3_rgb_to_cmyk: 'RGB から CMYK', rgbToCmykDesc: 'RGB を 0-1 に正規化し、Key チャンネルを計算、CMY を導出：',
    h2_css: 'CSS カラーフォーマット：完全リファレンス', cssDesc: 'CSS は多くのカラーフォーマットをサポートしています：',
    h2_named: 'CSS 名前付きカラー', namedDesc: 'CSS は 148 の名前付きカラーを定義しています：',
    h2_accessibility: 'カラーアクセシビリティと WCAG コントラスト比', a11yDesc: 'WCAG 2.1 は前景テキストと背景色の最低コントラスト比を定義しています。',
    a11yLevels: '<strong>WCAG コントラストレベル：</strong>',
    a11yAA: '<strong>レベル AA</strong>：通常テキスト 4.5:1、大きなテキスト 3:1。',
    a11yAAA: '<strong>レベル AAA</strong>：通常テキスト 7:1、大きなテキスト 4.5:1。',
    a11yUI: '<strong>非テキストコントラスト</strong>：UI コンポーネントに 3:1。',
    a11yFormula: 'コントラスト比の計算式：<code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>',
    a11yTips: '<strong>アクセシブルなカラーデザインのヒント：</strong>',
    a11yTip1: '色だけで情報を伝えない。アイコンやラベルも併用する。',
    a11yTip2: '色覚シミュレーションツールでテストする。',
    a11yTip3: 'ハイコントラストモードでテストする。',
    a11yTip4: 'HSL でアクセシブルなパレットを構築する。',
    h2_design: 'デザインシステムにおける色', designDesc: 'デザインシステムは構造化されたカラーパレットを使用します：',
    designPrimary: '<strong>プライマリカラー</strong>：CTA やリンクに使用するブランドカラー。',
    designNeutral: '<strong>ニュートラルカラー</strong>：テキスト、背景、ボーダー用のグレー。',
    designSemantic: '<strong>セマンティックカラー</strong>：成功（緑）、警告（黄）、エラー（赤）、情報（青）。',
    designShade: '<strong>シェードスケール</strong>：各色の明暗範囲（例：blue-50 から blue-950）。',
    designToken: 'モダンなデザインシステムは色を<strong>デザイントークン</strong>として定義します。',
    h2_tailwind: 'Tailwind CSS カラー', tailwindDesc: 'Tailwind CSS は 22 色、各 11 シェードのパレットを提供します：',
    tailwindUsage: 'Tailwind のカラー使用パターン：<code>bg-blue-500</code>、<code>text-blue-500</code>、<code>border-blue-500</code>。',
    h2_code_js: 'JavaScript での色変換', codeJsDesc: '本番環境対応の JavaScript 色変換関数：',
    h2_code_py: 'Python での色変換', codePyDesc: 'Python の <code>colorsys</code> モジュールと手動変換：',
    h2_code_css: 'CSS での色変換', codeCssDesc: 'CSS はネイティブで複数の色形式をサポートします：',
    h2_modern: 'モダン CSS カラースペース', modernDesc: 'CSS Color Level 4 は sRGB を超える新しい色空間を導入：',
    modernOklch: '<strong>OKLCH</strong>：知覚的に均一な色空間。', modernLab: '<strong>Lab / LCH</strong>：CIE Lab 色空間。',
    modernP3: '<strong>Display P3</strong>：広色域カラースペース。', modernFallback: 'sRGB フォールバックを常に提供：',
    h2_faq: 'よくある質問',
    faq1_q: 'CSS に最適な色形式は？', faq1_a: 'HEX が最も一般的。動的な色システムには HSL、透明度には RGBA、最新デザインには OKLCH を使用。',
    faq2_q: 'HEX を RGB に変換するには？', faq2_a: '# を除去し 3 ペアに分割、各ペアを 16 進から 10 進に変換。#3B82F6 は rgb(59, 130, 246)。',
    faq3_q: 'HSL と HSV の違いは？', faq3_a: 'HSL は明度（Lightness）、HSV は輝度（Value）を使用。HSL は CSS で、HSV はデザインツールのカラーピッカーで使用。',
    faq4_q: '画面と印刷で色が違うのはなぜ？', faq4_a: '画面は加法混色 RGB、印刷は減法混色 CMYK。CMYK 色域は sRGB より小さいため。',
    faq5_q: 'アクセシビリティに必要なコントラスト比は？', faq5_a: 'WCAG AA：通常テキスト 4.5:1、大テキスト 3:1。AAA：7:1 と 4.5:1。',
    faq6_q: 'OKLCH とは？', faq6_a: '知覚的に均一な CSS Color Level 4 の色空間。Chrome 111+、Safari 15.4+、Firefox 113+ でサポート。',
    faq7_q: 'ダークモードのカラーパレットの作り方は？', faq7_a: 'HSL または OKLCH で明度を調整。CSS カスタムプロパティで色を定義し、変数切替でパレットを切替。',
    conclusion: 'カラーモデルとその変換を理解することは全ての開発者とデザイナーに不可欠です。',
    linkToolBottom: '無料カラーコンバーターで即座に色を変換。',
  },
  ko: {
    tldr_title: 'TL;DR',
    tldr: '색상 변환기는 HEX, RGB, HSL, HSV, CMYK 간에 색상 값을 변환합니다. HEX는 RGB의 축약 표기법입니다. HSL은 색조와 밝기를 분리하여 디자인 시스템에 적합합니다. CMYK는 인쇄용입니다. WCAG 2.1은 일반 텍스트에 최소 4.5:1 대비율을 요구합니다.',
    key_title: '핵심 요점',
    key1: 'HEX, RGB, HSL 모두 동일한 sRGB 색 공간을 기술하며 상호 변환은 무손실입니다.',
    key2: 'HSL은 일관된 색상 팔레트와 다크 모드 테마 생성에 가장 직관적인 모델입니다.',
    key3: 'CMYK는 인쇄 전용 감산 혼합 모델이며 RGB에서 CMYK 변환은 손실이 있습니다.',
    key4: 'WCAG 2.1은 일반 텍스트에 4.5:1, 큰 텍스트에 3:1 최소 대비율을 요구합니다.',
    key5: 'CSS는 color() 함수를 통해 OKLCH, Display P3, Lab 등 최신 색 공간을 지원합니다.',
    key6: 'Tailwind CSS는 각 색상에 50-950 음영 스케일을 사용합니다.',
    linkTool: '무료 온라인 색상 변환기 도구를 사용해 보세요.',
    h2_models: '색상 모델 해설: HEX, RGB, HSL, HSV, CMYK',
    h3_hex: 'HEX 색상 코드', hexDesc: '<strong>HEX 색상 코드</strong>는 CSS에서 가장 일반적인 형식입니다.',
    h3_rgb: 'RGB (빨강, 초록, 파랑)', rgbDesc: '<strong>RGB</strong>는 0-255의 세 값으로 색상을 정의하는 가산 혼합 모델입니다.',
    h3_hsl: 'HSL (색조, 채도, 밝기)', hslDesc: '<strong>HSL</strong>은 색조(0-360도), 채도(0%-100%), 밝기(0%-100%)로 색상을 표현합니다.',
    h3_hsv: 'HSV / HSB', hsvDesc: '<strong>HSV</strong>는 HSL과 색조 축을 공유하지만 밝기를 Value로 대체합니다.',
    h3_cmyk: 'CMYK', cmykDesc: '<strong>CMYK</strong>는 인쇄용 감산 혼합 모델입니다.',
    h2_formulas: '색상 변환 공식', h3_hex_to_rgb: 'HEX에서 RGB', hexToRgbDesc: 'HEX에서 RGB는 진법 변환입니다:',
    h3_rgb_to_hex: 'RGB에서 HEX', rgbToHexDesc: '각 10진수 채널을 2자리 16진수 문자열로 변환:',
    h3_rgb_to_hsl: 'RGB에서 HSL', rgbToHslDesc: '채널 값을 0-1로 정규화하여 색조, 채도, 밝기를 계산:',
    h3_hsl_to_rgb: 'HSL에서 RGB', hslToRgbDesc: '헬퍼 함수로 색조 섹터를 채널 강도에 매핑:',
    h3_rgb_to_cmyk: 'RGB에서 CMYK', rgbToCmykDesc: 'RGB를 0-1로 정규화하고 Key 채널을 계산:',
    h2_css: 'CSS 색상 형식: 완전 참조', cssDesc: 'CSS는 다양한 색상 형식을 지원합니다:',
    h2_named: 'CSS 이름 있는 색상', namedDesc: 'CSS는 148개의 이름 있는 색상을 정의합니다:',
    h2_accessibility: '색상 접근성과 WCAG 대비율', a11yDesc: 'WCAG 2.1은 전경 텍스트와 배경색 사이의 최소 대비율을 정의합니다.',
    a11yLevels: '<strong>WCAG 대비 수준:</strong>',
    a11yAA: '<strong>레벨 AA</strong>: 일반 텍스트 4.5:1, 큰 텍스트 3:1.',
    a11yAAA: '<strong>레벨 AAA</strong>: 일반 텍스트 7:1, 큰 텍스트 4.5:1.',
    a11yUI: '<strong>비텍스트 대비</strong>: UI 컴포넌트에 3:1.',
    a11yFormula: '대비율 공식: <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>',
    a11yTips: '<strong>접근 가능한 색상 디자인 팁:</strong>',
    a11yTip1: '색상만으로 정보를 전달하지 마세요.',
    a11yTip2: '색각 시뮬레이션 도구로 테스트하세요.',
    a11yTip3: '고대비 모드에서 테스트하세요.',
    a11yTip4: 'HSL로 접근 가능한 팔레트를 구축하세요.',
    h2_design: '디자인 시스템의 색상', designDesc: '디자인 시스템은 구조화된 색상 팔레트를 사용합니다:',
    designPrimary: '<strong>주요 색상</strong>: CTA와 링크에 사용하는 브랜드 색상.',
    designNeutral: '<strong>중립 색상</strong>: 텍스트, 배경, 테두리용 회색.',
    designSemantic: '<strong>시맨틱 색상</strong>: 성공(녹색), 경고(노랑), 오류(빨강), 정보(파랑).',
    designShade: '<strong>음영 스케일</strong>: 각 색상의 밝기 범위.',
    designToken: '현대 디자인 시스템은 색상을 <strong>디자인 토큰</strong>으로 정의합니다.',
    h2_tailwind: 'Tailwind CSS 색상', tailwindDesc: 'Tailwind CSS는 22개 색상 계열, 각 11단계 음영 팔레트를 제공합니다:',
    tailwindUsage: 'Tailwind 색상 사용 패턴: <code>bg-blue-500</code>, <code>text-blue-500</code>, <code>border-blue-500</code>.',
    h2_code_js: 'JavaScript 색상 변환', codeJsDesc: '프로덕션 수준 JavaScript 색상 변환 함수:',
    h2_code_py: 'Python 색상 변환', codePyDesc: 'Python <code>colorsys</code> 모듈과 수동 변환기:',
    h2_code_css: 'CSS 색상 변환', codeCssDesc: 'CSS는 여러 색상 형식을 네이티브로 지원합니다:',
    h2_modern: '최신 CSS 색 공간', modernDesc: 'CSS Color Level 4는 sRGB를 넘는 새로운 색 공간을 도입:',
    modernOklch: '<strong>OKLCH</strong>: 지각적으로 균일한 색 공간.',
    modernLab: '<strong>Lab / LCH</strong>: CIE Lab 색 공간.',
    modernP3: '<strong>Display P3</strong>: 광색역 색 공간.',
    modernFallback: 'sRGB 폴백을 항상 제공하세요:',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'CSS에 가장 좋은 색상 형식은?', faq1_a: 'HEX가 가장 일반적. 동적 색상 시스템에는 HSL, 투명도에는 RGBA, 최신 디자인에는 OKLCH.',
    faq2_q: 'HEX를 RGB로 변환하는 방법은?', faq2_a: '#을 제거하고 3쌍으로 분할, 각 쌍을 16진수에서 10진수로 변환. #3B82F6은 rgb(59, 130, 246).',
    faq3_q: 'HSL과 HSV의 차이는?', faq3_a: 'HSL은 Lightness, HSV는 Value를 사용. HSL은 CSS에서, HSV는 디자인 도구에서 사용.',
    faq4_q: '화면과 인쇄 색상이 다른 이유는?', faq4_a: '화면은 가산 혼합 RGB, 인쇄는 감산 혼합 CMYK. CMYK 색역이 sRGB보다 작기 때문.',
    faq5_q: '접근성에 필요한 대비율은?', faq5_a: 'WCAG AA: 일반 텍스트 4.5:1, 큰 텍스트 3:1. AAA: 7:1과 4.5:1.',
    faq6_q: 'OKLCH란?', faq6_a: '지각적으로 균일한 CSS Color Level 4 색 공간. Chrome 111+, Safari 15.4+, Firefox 113+ 지원.',
    faq7_q: '다크 모드 색상 팔레트 만드는 방법은?', faq7_a: 'HSL 또는 OKLCH로 밝기 조절. CSS 커스텀 속성으로 색상 정의, 변수 전환으로 팔레트 전환.',
    conclusion: '색상 모델과 변환을 이해하는 것은 모든 개발자와 디자이너에게 필수입니다.',
    linkToolBottom: '무료 색상 변환기로 즉시 색상을 변환하세요.',
  },
  fr: {
    tldr_title: 'TL;DR',
    tldr: 'Un convertisseur de couleurs transforme les valeurs entre HEX, RGB, HSL, HSV et CMYK. HEX est un raccourci pour RGB. HSL separe la teinte de la luminosite, ideal pour les systemes de design. CMYK est pour l\'impression. Le WCAG 2.1 exige un ratio de contraste minimum de 4.5:1 pour le texte normal.',
    key_title: 'Points Cles', key1: 'HEX, RGB et HSL decrivent le meme espace sRGB. La conversion est sans perte.', key2: 'HSL est le modele le plus intuitif pour creer des palettes coherentes.', key3: 'CMYK est un modele soustractif pour l\'impression ; la conversion depuis RGB est avec perte.', key4: 'Le WCAG 2.1 exige 4.5:1 pour le texte normal et 3:1 pour le grand texte.', key5: 'CSS supporte OKLCH, Display P3 et Lab via la fonction color().', key6: 'Tailwind CSS utilise une echelle de nuances 50-950 pour chaque couleur.',
    linkTool: 'Essayez notre convertisseur de couleurs gratuit en ligne.', h2_models: 'Modeles de couleurs : HEX, RGB, HSL, HSV, CMYK',
    h3_hex: 'Codes couleur HEX', hexDesc: '<strong>Les codes HEX</strong> sont le format le plus courant en CSS.', h3_rgb: 'RGB', rgbDesc: '<strong>RGB</strong> definit les couleurs avec trois valeurs decimales 0-255.', h3_hsl: 'HSL', hslDesc: '<strong>HSL</strong> utilise teinte, saturation et luminosite.', h3_hsv: 'HSV / HSB', hsvDesc: '<strong>HSV</strong> utilise Value au lieu de Lightness. Courant dans les selecteurs de couleurs.', h3_cmyk: 'CMYK', cmykDesc: '<strong>CMYK</strong> est le modele soustractif pour l\'impression.',
    h2_formulas: 'Formules de conversion', h3_hex_to_rgb: 'HEX vers RGB', hexToRgbDesc: 'Conversion de base directe :', h3_rgb_to_hex: 'RGB vers HEX', rgbToHexDesc: 'Conversion inverse :', h3_rgb_to_hsl: 'RGB vers HSL', rgbToHslDesc: 'Normalisation et calcul :', h3_hsl_to_rgb: 'HSL vers RGB', hslToRgbDesc: 'Fonction auxiliaire pour mapper les secteurs :', h3_rgb_to_cmyk: 'RGB vers CMYK', rgbToCmykDesc: 'Normalisation et calcul du canal Key :',
    h2_css: 'Formats de couleur CSS', cssDesc: 'CSS supporte de nombreux formats :', h2_named: 'Couleurs nommees CSS', namedDesc: 'CSS definit 148 couleurs nommees :',
    h2_accessibility: 'Accessibilite des couleurs et ratios WCAG', a11yDesc: 'Le WCAG 2.1 definit les ratios de contraste minimum.', a11yLevels: '<strong>Niveaux WCAG :</strong>', a11yAA: '<strong>Niveau AA</strong> : 4.5:1 texte normal, 3:1 grand texte.', a11yAAA: '<strong>Niveau AAA</strong> : 7:1 texte normal, 4.5:1 grand texte.', a11yUI: '<strong>Contraste non-texte</strong> : 3:1 pour les composants UI.', a11yFormula: 'Formule : <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>', a11yTips: '<strong>Conseils :</strong>', a11yTip1: 'Ne jamais utiliser la couleur seule pour transmettre l\'information.', a11yTip2: 'Tester avec des simulateurs de deficience visuelle.', a11yTip3: 'Tester en mode contraste eleve.', a11yTip4: 'Utiliser HSL pour des palettes accessibles.',
    h2_design: 'Couleur dans les systemes de design', designDesc: 'Les systemes de design utilisent des palettes structurees :', designPrimary: '<strong>Couleurs primaires</strong> : couleurs de marque.', designNeutral: '<strong>Couleurs neutres</strong> : gris pour texte et fonds.', designSemantic: '<strong>Couleurs semantiques</strong> : succes, avertissement, erreur, info.', designShade: '<strong>Echelles de nuances</strong> : du clair au fonce.', designToken: 'Les systemes modernes utilisent des <strong>tokens de design</strong>.',
    h2_tailwind: 'Couleurs Tailwind CSS', tailwindDesc: 'Tailwind offre 22 familles de couleurs avec 11 nuances chacune :', tailwindUsage: 'Utilisation : <code>bg-blue-500</code>, <code>text-blue-500</code>.',
    h2_code_js: 'Conversion en JavaScript', codeJsDesc: 'Fonctions de conversion completes :', h2_code_py: 'Conversion en Python', codePyDesc: 'Module <code>colorsys</code> et conversions manuelles :', h2_code_css: 'Conversion en CSS', codeCssDesc: 'CSS supporte nativement plusieurs formats :',
    h2_modern: 'Espaces de couleur CSS modernes', modernDesc: 'CSS Color Level 4 introduit de nouveaux espaces :', modernOklch: '<strong>OKLCH</strong> : espace perceptuellement uniforme.', modernLab: '<strong>Lab / LCH</strong> : espace CIE Lab.', modernP3: '<strong>Display P3</strong> : gamut elargi.', modernFallback: 'Toujours fournir un fallback sRGB :',
    h2_faq: 'Questions frequentes', faq1_q: 'Quel format de couleur CSS choisir ?', faq1_a: 'HEX pour la compacite, HSL pour les systemes dynamiques, RGBA pour la transparence, OKLCH pour le design avance.', faq2_q: 'Comment convertir HEX en RGB ?', faq2_a: 'Supprimer #, diviser en 3 paires, convertir chaque paire en decimal.', faq3_q: 'Difference entre HSL et HSV ?', faq3_a: 'HSL utilise Lightness, HSV utilise Value. HSL pour CSS, HSV pour les outils de design.', faq4_q: 'Pourquoi les couleurs different a l\'ecran et a l\'impression ?', faq4_a: 'Ecran = RGB additif, impression = CMYK soustractif. Le gamut CMYK est plus petit.', faq5_q: 'Quel ratio de contraste pour l\'accessibilite ?', faq5_a: 'AA : 4.5:1 texte normal, 3:1 grand texte. AAA : 7:1 et 4.5:1.', faq6_q: 'Qu\'est-ce que OKLCH ?', faq6_a: 'Espace perceptuellement uniforme. Chrome 111+, Safari 15.4+, Firefox 113+.', faq7_q: 'Comment creer une palette mode sombre ?', faq7_a: 'Ajuster la luminosite HSL/OKLCH. Definir des proprietes CSS personnalisees.',
    conclusion: 'Comprendre les modeles de couleurs est essentiel pour tout developpeur et designer.',
    linkToolBottom: 'Convertissez vos couleurs avec notre outil gratuit.',
  },
  de: {
    tldr_title: 'TL;DR',
    tldr: 'Farbkonverter wandeln Werte zwischen HEX, RGB, HSL, HSV und CMYK um. HEX ist eine Kurzform von RGB. HSL trennt Farbton von Helligkeit - ideal fur Designsysteme. CMYK ist fur Druck. WCAG 2.1 erfordert mindestens 4.5:1 Kontrast fur normalen Text.',
    key_title: 'Kernpunkte', key1: 'HEX, RGB und HSL beschreiben denselben sRGB-Farbraum. Konvertierung ist verlustfrei.', key2: 'HSL ist das intuitivste Modell fur konsistente Farbpaletten.', key3: 'CMYK ist ein subtraktives Druckmodell; RGB-zu-CMYK-Konvertierung ist verlustbehaftet.', key4: 'WCAG 2.1 erfordert 4.5:1 fur normalen Text und 3:1 fur grossen Text.', key5: 'CSS unterstutzt OKLCH, Display P3 und Lab uber die color()-Funktion.', key6: 'Tailwind CSS verwendet eine 50-950 Abstufungsskala fur jede Farbe.',
    linkTool: 'Testen Sie unseren kostenlosen Online-Farbkonverter.', h2_models: 'Farbmodelle: HEX, RGB, HSL, HSV, CMYK',
    h3_hex: 'HEX-Farbcodes', hexDesc: '<strong>HEX-Codes</strong> sind das gangigste Format in CSS.', h3_rgb: 'RGB', rgbDesc: '<strong>RGB</strong> definiert Farben mit drei Dezimalwerten 0-255.', h3_hsl: 'HSL', hslDesc: '<strong>HSL</strong> verwendet Farbton, Sattigung und Helligkeit.', h3_hsv: 'HSV / HSB', hsvDesc: '<strong>HSV</strong> verwendet Value statt Lightness.', h3_cmyk: 'CMYK', cmykDesc: '<strong>CMYK</strong> ist das subtraktive Druckmodell.',
    h2_formulas: 'Konvertierungsformeln', h3_hex_to_rgb: 'HEX zu RGB', hexToRgbDesc: 'Direkte Basiskonvertierung:', h3_rgb_to_hex: 'RGB zu HEX', rgbToHexDesc: 'Umkehrung:', h3_rgb_to_hsl: 'RGB zu HSL', rgbToHslDesc: 'Normalisierung und Berechnung:', h3_hsl_to_rgb: 'HSL zu RGB', hslToRgbDesc: 'Hilfsfunktion fur Sektoren:', h3_rgb_to_cmyk: 'RGB zu CMYK', rgbToCmykDesc: 'Normalisierung und Key-Berechnung:',
    h2_css: 'CSS-Farbformate', cssDesc: 'CSS unterstutzt viele Formate:', h2_named: 'CSS-benannte Farben', namedDesc: 'CSS definiert 148 benannte Farben:',
    h2_accessibility: 'Farbzuganglichkeit und WCAG-Kontrast', a11yDesc: 'WCAG 2.1 definiert minimale Kontrastverhältnisse.', a11yLevels: '<strong>WCAG-Kontraststufen:</strong>', a11yAA: '<strong>Stufe AA</strong>: 4.5:1 normaler Text, 3:1 grosser Text.', a11yAAA: '<strong>Stufe AAA</strong>: 7:1 normaler Text, 4.5:1 grosser Text.', a11yUI: '<strong>Nicht-Text-Kontrast</strong>: 3:1 fur UI-Komponenten.', a11yFormula: 'Formel: <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>', a11yTips: '<strong>Tipps:</strong>', a11yTip1: 'Farbe nie allein fur Informationen verwenden.', a11yTip2: 'Mit Farbblindheitssimulation testen.', a11yTip3: 'Im Hochkontrastmodus testen.', a11yTip4: 'HSL fur barrierefreie Paletten verwenden.',
    h2_design: 'Farbe in Designsystemen', designDesc: 'Designsysteme nutzen strukturierte Farbpaletten:', designPrimary: '<strong>Primarfarben</strong>: Markenfarben.', designNeutral: '<strong>Neutralfarben</strong>: Grautone.', designSemantic: '<strong>Semantische Farben</strong>: Erfolg, Warnung, Fehler, Info.', designShade: '<strong>Abstufungen</strong>: Hell bis Dunkel.', designToken: 'Moderne Systeme nutzen <strong>Design-Tokens</strong>.',
    h2_tailwind: 'Tailwind CSS Farben', tailwindDesc: 'Tailwind bietet 22 Farbfamilien mit je 11 Abstufungen:', tailwindUsage: 'Verwendung: <code>bg-blue-500</code>, <code>text-blue-500</code>.',
    h2_code_js: 'Farbkonvertierung in JavaScript', codeJsDesc: 'Produktionsreife Konvertierungsfunktionen:', h2_code_py: 'Farbkonvertierung in Python', codePyDesc: '<code>colorsys</code>-Modul und manuelle Konverter:', h2_code_css: 'Farbkonvertierung in CSS', codeCssDesc: 'CSS unterstutzt nativ mehrere Formate:',
    h2_modern: 'Moderne CSS-Farbraume', modernDesc: 'CSS Color Level 4 fuhrt neue Farbraume ein:', modernOklch: '<strong>OKLCH</strong>: Wahrnehmungsgleichmassiger Farbraum.', modernLab: '<strong>Lab / LCH</strong>: CIE Lab Farbraum.', modernP3: '<strong>Display P3</strong>: Erweiterter Farbraum.', modernFallback: 'Immer sRGB-Fallback bereitstellen:',
    h2_faq: 'Haufig gestellte Fragen', faq1_q: 'Bestes Farbformat fur CSS?', faq1_a: 'HEX fur Kompaktheit, HSL fur dynamische Systeme, RGBA fur Transparenz, OKLCH fur modernes Design.', faq2_q: 'HEX zu RGB konvertieren?', faq2_a: '# entfernen, in 3 Paare teilen, von Hex in Dezimal umrechnen.', faq3_q: 'Unterschied HSL und HSV?', faq3_a: 'HSL nutzt Lightness, HSV nutzt Value. HSL fur CSS, HSV fur Design-Tools.', faq4_q: 'Warum sehen Druckfarben anders aus?', faq4_a: 'Bildschirm = additives RGB, Druck = subtraktives CMYK mit kleinerem Gamut.', faq5_q: 'Welcher Kontrast fur Barrierefreiheit?', faq5_a: 'AA: 4.5:1 normal, 3:1 gross. AAA: 7:1 und 4.5:1.', faq6_q: 'Was ist OKLCH?', faq6_a: 'Wahrnehmungsgleichmassiger Farbraum in CSS Color Level 4.', faq7_q: 'Dark-Mode-Palette erstellen?', faq7_a: 'HSL/OKLCH-Helligkeit anpassen. CSS Custom Properties fur Palette-Wechsel.',
    conclusion: 'Das Verstandnis von Farbmodellen ist fur jeden Entwickler und Designer essenziell.',
    linkToolBottom: 'Farben sofort umwandeln mit unserem kostenlosen Konverter.',
  },
  es: {
    tldr_title: 'TL;DR',
    tldr: 'Un convertidor de colores transforma valores entre HEX, RGB, HSL, HSV y CMYK. HEX es la abreviatura de RGB. HSL separa el tono de la luminosidad, ideal para sistemas de diseno. CMYK es para impresion. WCAG 2.1 requiere un ratio de contraste minimo de 4.5:1 para texto normal.',
    key_title: 'Puntos Clave', key1: 'HEX, RGB y HSL describen el mismo espacio sRGB. La conversion es sin perdida.', key2: 'HSL es el modelo mas intuitivo para crear paletas consistentes.', key3: 'CMYK es un modelo sustractivo para impresion; la conversion desde RGB tiene perdidas.', key4: 'WCAG 2.1 requiere 4.5:1 para texto normal y 3:1 para texto grande.', key5: 'CSS soporta OKLCH, Display P3 y Lab via la funcion color().', key6: 'Tailwind CSS usa una escala de sombras 50-950 para cada color.',
    linkTool: 'Prueba nuestro convertidor de colores gratuito en linea.', h2_models: 'Modelos de Color: HEX, RGB, HSL, HSV, CMYK',
    h3_hex: 'Codigos de color HEX', hexDesc: '<strong>Los codigos HEX</strong> son el formato mas comun en CSS.', h3_rgb: 'RGB', rgbDesc: '<strong>RGB</strong> define colores con tres valores decimales 0-255.', h3_hsl: 'HSL', hslDesc: '<strong>HSL</strong> usa tono, saturacion y luminosidad.', h3_hsv: 'HSV / HSB', hsvDesc: '<strong>HSV</strong> usa Value en lugar de Lightness.', h3_cmyk: 'CMYK', cmykDesc: '<strong>CMYK</strong> es el modelo sustractivo para impresion.',
    h2_formulas: 'Formulas de conversion', h3_hex_to_rgb: 'HEX a RGB', hexToRgbDesc: 'Conversion directa:', h3_rgb_to_hex: 'RGB a HEX', rgbToHexDesc: 'Conversion inversa:', h3_rgb_to_hsl: 'RGB a HSL', rgbToHslDesc: 'Normalizacion y calculo:', h3_hsl_to_rgb: 'HSL a RGB', hslToRgbDesc: 'Funcion auxiliar:', h3_rgb_to_cmyk: 'RGB a CMYK', rgbToCmykDesc: 'Normalizacion y canal Key:',
    h2_css: 'Formatos de color CSS', cssDesc: 'CSS soporta muchos formatos:', h2_named: 'Colores con nombre CSS', namedDesc: 'CSS define 148 colores con nombre:',
    h2_accessibility: 'Accesibilidad del color y ratios WCAG', a11yDesc: 'WCAG 2.1 define ratios de contraste minimos.', a11yLevels: '<strong>Niveles WCAG:</strong>', a11yAA: '<strong>Nivel AA</strong>: 4.5:1 texto normal, 3:1 texto grande.', a11yAAA: '<strong>Nivel AAA</strong>: 7:1 texto normal, 4.5:1 texto grande.', a11yUI: '<strong>Contraste no textual</strong>: 3:1 para componentes UI.', a11yFormula: 'Formula: <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>', a11yTips: '<strong>Consejos:</strong>', a11yTip1: 'Nunca usar solo el color para transmitir informacion.', a11yTip2: 'Probar con simuladores de daltonismo.', a11yTip3: 'Probar en modo alto contraste.', a11yTip4: 'Usar HSL para paletas accesibles.',
    h2_design: 'Color en sistemas de diseno', designDesc: 'Los sistemas de diseno usan paletas estructuradas:', designPrimary: '<strong>Colores primarios</strong>: colores de marca.', designNeutral: '<strong>Colores neutros</strong>: grises.', designSemantic: '<strong>Colores semanticos</strong>: exito, advertencia, error, info.', designShade: '<strong>Escalas de sombra</strong>: de claro a oscuro.', designToken: 'Los sistemas modernos usan <strong>tokens de diseno</strong>.',
    h2_tailwind: 'Colores Tailwind CSS', tailwindDesc: 'Tailwind ofrece 22 familias con 11 tonos cada una:', tailwindUsage: 'Uso: <code>bg-blue-500</code>, <code>text-blue-500</code>.',
    h2_code_js: 'Conversion en JavaScript', codeJsDesc: 'Funciones de conversion completas:', h2_code_py: 'Conversion en Python', codePyDesc: 'Modulo <code>colorsys</code> y conversores manuales:', h2_code_css: 'Conversion en CSS', codeCssDesc: 'CSS soporta nativamente multiples formatos:',
    h2_modern: 'Espacios de color CSS modernos', modernDesc: 'CSS Color Level 4 introduce nuevos espacios:', modernOklch: '<strong>OKLCH</strong>: espacio perceptualmente uniforme.', modernLab: '<strong>Lab / LCH</strong>: espacio CIE Lab.', modernP3: '<strong>Display P3</strong>: gamut amplio.', modernFallback: 'Siempre proveer fallback sRGB:',
    h2_faq: 'Preguntas frecuentes', faq1_q: 'Mejor formato de color para CSS?', faq1_a: 'HEX para compacidad, HSL para sistemas dinamicos, RGBA para transparencia, OKLCH para diseno avanzado.', faq2_q: 'Como convertir HEX a RGB?', faq2_a: 'Eliminar #, dividir en 3 pares, convertir cada par a decimal.', faq3_q: 'Diferencia entre HSL y HSV?', faq3_a: 'HSL usa Lightness, HSV usa Value. HSL para CSS, HSV para herramientas de diseno.', faq4_q: 'Por que los colores impresos se ven diferentes?', faq4_a: 'Pantalla = RGB aditivo, impresion = CMYK sustractivo con gamut mas pequeno.', faq5_q: 'Que ratio de contraste para accesibilidad?', faq5_a: 'AA: 4.5:1 normal, 3:1 grande. AAA: 7:1 y 4.5:1.', faq6_q: 'Que es OKLCH?', faq6_a: 'Espacio perceptualmente uniforme en CSS Color Level 4.', faq7_q: 'Como crear paleta modo oscuro?', faq7_a: 'Ajustar luminosidad HSL/OKLCH. Usar propiedades CSS personalizadas.',
    conclusion: 'Entender los modelos de color es esencial para todo desarrollador y disenador.',
    linkToolBottom: 'Convierte colores al instante con nuestro convertidor gratuito.',
  },
};

export default function ColorConverterOnlineGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong>{s.tldr_title}:</strong> {s.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong>{s.key_title}:</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20 }}>
          <li>{s.key1}</li>
          <li>{s.key2}</li>
          <li>{s.key3}</li>
          <li>{s.key4}</li>
          <li>{s.key5}</li>
          <li>{s.key6}</li>
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/color-converter`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: Color Models */}
      <h2>{s.h2_models}</h2>

      <h3>{s.h3_hex}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.hexDesc }} />

      <h3>{s.h3_rgb}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.rgbDesc }} />

      <h3>{s.h3_hsl}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.hslDesc }} />

      <h3>{s.h3_hsv}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.hsvDesc }} />

      <h3>{s.h3_cmyk}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.cmykDesc }} />

      {/* Color Models Visual Comparison Table */}
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Channels</th>
            <th>Range</th>
            <th>Primary Use</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>HEX</td><td>#RRGGBB</td><td>00-FF per channel</td><td>CSS, web design</td></tr>
          <tr><td>RGB</td><td>R, G, B</td><td>0-255 per channel</td><td>Screens, Canvas, WebGL</td></tr>
          <tr><td>HSL</td><td>H, S, L</td><td>0-360, 0-100%, 0-100%</td><td>CSS, design systems</td></tr>
          <tr><td>HSV/HSB</td><td>H, S, V</td><td>0-360, 0-100%, 0-100%</td><td>Color pickers, Photoshop</td></tr>
          <tr><td>CMYK</td><td>C, M, Y, K</td><td>0-100% per channel</td><td>Print, pre-press</td></tr>
        </tbody>
      </table>

      {/* Section 2: Conversion Formulas */}
      <h2>{s.h2_formulas}</h2>

      <h3>{s.h3_hex_to_rgb}</h3>
      <p>{s.hexToRgbDesc}</p>
      <pre><code>{`// HEX to RGB
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

// Example: hexToRgb('#3B82F6')
// => { r: 59, g: 130, b: 246 }`}</code></pre>

      <h3>{s.h3_rgb_to_hex}</h3>
      <p>{s.rgbToHexDesc}</p>
      <pre><code>{`// RGB to HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('');
}

// Example: rgbToHex(59, 130, 246)
// => '#3b82f6'`}</code></pre>

      <h3>{s.h3_rgb_to_hsl}</h3>
      <p>{s.rgbToHslDesc}</p>
      <pre><code>{`// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Example: rgbToHsl(59, 130, 246)
// => { h: 217, s: 91, l: 60 }`}</code></pre>

      <h3>{s.h3_hsl_to_rgb}</h3>
      <p>{s.hslToRgbDesc}</p>
      <pre><code>{`// HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

// Example: hslToRgb(217, 91, 60)
// => { r: 59, g: 131, b: 246 }`}</code></pre>

      <h3>{s.h3_rgb_to_cmyk}</h3>
      <p>{s.rgbToCmykDesc}</p>
      <pre><code>{`// RGB to CMYK
function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

// Example: rgbToCmyk(59, 130, 246)
// => { c: 76, m: 47, y: 0, k: 4 }`}</code></pre>

      {/* Section 3: CSS Color Formats */}
      <h2>{s.h2_css}</h2>
      <p>{s.cssDesc}</p>
      <pre><code>{`/* CSS Color Formats Reference */

/* 1. HEX - most common */
color: #3B82F6;           /* 6-digit */
color: #38F;              /* 3-digit shorthand */
color: #3B82F680;         /* 8-digit with alpha */

/* 2. RGB / RGBA */
color: rgb(59, 130, 246);         /* comma syntax */
color: rgb(59 130 246);           /* space syntax (modern) */
color: rgba(59, 130, 246, 0.5);   /* with alpha */
color: rgb(59 130 246 / 0.5);     /* modern alpha syntax */

/* 3. HSL / HSLA */
color: hsl(217, 91%, 60%);        /* comma syntax */
color: hsl(217 91% 60%);          /* space syntax (modern) */
color: hsla(217, 91%, 60%, 0.5);  /* with alpha */
color: hsl(217 91% 60% / 0.5);    /* modern alpha syntax */

/* 4. Named Colors (148 total) */
color: red;
color: cornflowerblue;
color: rebeccapurple;

/* 5. currentColor keyword */
color: blue;
border: 1px solid currentColor;   /* inherits blue */

/* 6. CSS Color Level 4 */
color: oklch(0.7 0.15 250);
color: lab(60 -20 50);
color: lch(60 40 120);
color: color(display-p3 0.23 0.51 0.96);
color: color(srgb 0.23 0.51 0.96);`}</code></pre>

      {/* Section 4: CSS Named Colors */}
      <h2>{s.h2_named}</h2>
      <p>{s.namedDesc}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>red</td><td><code>#FF0000</code></td><td><code>rgb(255, 0, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF0000', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>tomato</td><td><code>#FF6347</code></td><td><code>rgb(255, 99, 71)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF6347', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>coral</td><td><code>#FF7F50</code></td><td><code>rgb(255, 127, 80)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FF7F50', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>dodgerblue</td><td><code>#1E90FF</code></td><td><code>rgb(30, 144, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#1E90FF', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>cornflowerblue</td><td><code>#6495ED</code></td><td><code>rgb(100, 149, 237)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#6495ED', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>rebeccapurple</td><td><code>#663399</code></td><td><code>rgb(102, 51, 153)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#663399', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>mediumseagreen</td><td><code>#3CB371</code></td><td><code>rgb(60, 179, 113)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#3CB371', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>gold</td><td><code>#FFD700</code></td><td><code>rgb(255, 215, 0)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#FFD700', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>slategray</td><td><code>#708090</code></td><td><code>rgb(112, 128, 144)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#708090', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>whitesmoke</td><td><code>#F5F5F5</code></td><td><code>rgb(245, 245, 245)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#F5F5F5', borderRadius: 4, verticalAlign: 'middle', border: '1px solid #ccc' }} /></td></tr>
        </tbody>
      </table>

      {/* Section 5: Accessibility */}
      <h2>{s.h2_accessibility}</h2>
      <p>{s.a11yDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.a11yLevels }} />
      <ul>
        <li dangerouslySetInnerHTML={{ __html: s.a11yAA }} />
        <li dangerouslySetInnerHTML={{ __html: s.a11yAAA }} />
        <li dangerouslySetInnerHTML={{ __html: s.a11yUI }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: s.a11yFormula }} />

      {/* Contrast ratio examples */}
      <table>
        <thead>
          <tr>
            <th>Foreground</th>
            <th>Background</th>
            <th>Ratio</th>
            <th>WCAG AA</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>#000000</td><td>#FFFFFF</td><td>21:1</td><td>Pass</td><td><span style={{ display: 'inline-block', padding: '2px 8px', background: '#FFFFFF', color: '#000000', borderRadius: 4, border: '1px solid #ccc', fontSize: 12 }}>Text</span></td></tr>
          <tr><td>#1E40AF</td><td>#FFFFFF</td><td>8.9:1</td><td>Pass</td><td><span style={{ display: 'inline-block', padding: '2px 8px', background: '#FFFFFF', color: '#1E40AF', borderRadius: 4, border: '1px solid #ccc', fontSize: 12 }}>Text</span></td></tr>
          <tr><td>#3B82F6</td><td>#FFFFFF</td><td>3.6:1</td><td>Fail (normal)</td><td><span style={{ display: 'inline-block', padding: '2px 8px', background: '#FFFFFF', color: '#3B82F6', borderRadius: 4, border: '1px solid #ccc', fontSize: 12 }}>Text</span></td></tr>
          <tr><td>#FFFFFF</td><td>#1E3A5F</td><td>10.5:1</td><td>Pass</td><td><span style={{ display: 'inline-block', padding: '2px 8px', background: '#1E3A5F', color: '#FFFFFF', borderRadius: 4, fontSize: 12 }}>Text</span></td></tr>
          <tr><td>#9CA3AF</td><td>#FFFFFF</td><td>2.9:1</td><td>Fail</td><td><span style={{ display: 'inline-block', padding: '2px 8px', background: '#FFFFFF', color: '#9CA3AF', borderRadius: 4, border: '1px solid #ccc', fontSize: 12 }}>Text</span></td></tr>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: s.a11yTips }} />
      <ul>
        <li>{s.a11yTip1}</li>
        <li>{s.a11yTip2}</li>
        <li>{s.a11yTip3}</li>
        <li>{s.a11yTip4}</li>
      </ul>

      <pre><code>{`// JavaScript: Calculate WCAG contrast ratio
function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const l1 = getRelativeLuminance(...rgb1);
  const l2 = getRelativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Example
const ratio = getContrastRatio([0, 0, 0], [255, 255, 255]);
console.log(ratio.toFixed(1)); // "21.0"

// Check WCAG compliance
function meetsWCAG(ratio, level = 'AA', isLargeText = false) {
  if (level === 'AAA') return isLargeText ? ratio >= 4.5 : ratio >= 7;
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}`}</code></pre>

      {/* Section 6: Design Systems */}
      <h2>{s.h2_design}</h2>
      <p>{s.designDesc}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: s.designPrimary }} />
        <li dangerouslySetInnerHTML={{ __html: s.designNeutral }} />
        <li dangerouslySetInnerHTML={{ __html: s.designSemantic }} />
        <li dangerouslySetInnerHTML={{ __html: s.designShade }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: s.designToken }} />

      <pre><code>{`/* Design token example with CSS custom properties */
:root {
  /* Primary - Blue */
  --color-primary-50:  #EFF6FF;
  --color-primary-100: #DBEAFE;
  --color-primary-200: #BFDBFE;
  --color-primary-300: #93C5FD;
  --color-primary-400: #60A5FA;
  --color-primary-500: #3B82F6;
  --color-primary-600: #2563EB;
  --color-primary-700: #1D4ED8;
  --color-primary-800: #1E40AF;
  --color-primary-900: #1E3A8A;
  --color-primary-950: #172554;

  /* Semantic */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error:   #EF4444;
  --color-info:    #3B82F6;
}

/* Dark mode override */
[data-theme="dark"] {
  --color-primary-50:  #172554;
  --color-primary-100: #1E3A8A;
  --color-primary-500: #60A5FA;
  --color-primary-900: #DBEAFE;
  --color-primary-950: #EFF6FF;
}`}</code></pre>

      {/* Section 7: Tailwind CSS Colors */}
      <h2>{s.h2_tailwind}</h2>
      <p>{s.tailwindDesc}</p>

      <table>
        <thead>
          <tr>
            <th>Tailwind Class</th>
            <th>HEX</th>
            <th>RGB</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>blue-50</td><td><code>#EFF6FF</code></td><td><code>rgb(239, 246, 255)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#EFF6FF', borderRadius: 4, verticalAlign: 'middle', border: '1px solid #ccc' }} /></td></tr>
          <tr><td>blue-200</td><td><code>#BFDBFE</code></td><td><code>rgb(191, 219, 254)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#BFDBFE', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>blue-500</td><td><code>#3B82F6</code></td><td><code>rgb(59, 130, 246)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#3B82F6', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>blue-700</td><td><code>#1D4ED8</code></td><td><code>rgb(29, 78, 216)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#1D4ED8', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>blue-950</td><td><code>#172554</code></td><td><code>rgb(23, 37, 84)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#172554', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>red-500</td><td><code>#EF4444</code></td><td><code>rgb(239, 68, 68)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#EF4444', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>green-500</td><td><code>#22C55E</code></td><td><code>rgb(34, 197, 94)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#22C55E', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>yellow-500</td><td><code>#EAB308</code></td><td><code>rgb(234, 179, 8)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#EAB308', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>purple-500</td><td><code>#A855F7</code></td><td><code>rgb(168, 85, 247)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#A855F7', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
          <tr><td>slate-500</td><td><code>#64748B</code></td><td><code>rgb(100, 116, 139)</code></td><td><span style={{ display: 'inline-block', width: 24, height: 24, background: '#64748B', borderRadius: 4, verticalAlign: 'middle' }} /></td></tr>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: s.tailwindUsage }} />

      <pre><code>{`/* Tailwind CSS color usage */
<div class="bg-blue-500 text-white p-4">
  Primary button
</div>

<div class="bg-blue-50 text-blue-900 border border-blue-200 p-4">
  Info card
</div>

/* Customizing in tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dbe4ff',
          500: '#4c6ef5',
          600: '#3b5bdb',
          700: '#364fc7',
          900: '#1c2d5a',
        },
      },
    },
  },
};`}</code></pre>

      {/* Section 8: JavaScript Code Examples */}
      <h2>{s.h2_code_js}</h2>
      <p>{s.codeJsDesc}</p>

      <pre><code>{`// Complete Color Conversion Library (JavaScript/TypeScript)

// HEX to RGB (handles 3, 6, 8 character hex)
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length === 4) hex = hex.split('').map(c => c + c).join('');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (hex.length === 8) {
    const a = Math.round((parseInt(hex.substring(6, 8), 16) / 255) * 100) / 100;
    return { r, g, b, a };
  }
  return { r, g, b };
}

// RGB to HEX
function rgbToHex(r, g, b, a) {
  const hex = '#' + [r, g, b]
    .map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
    .join('');
  if (a !== undefined && a < 1) {
    return hex + Math.round(a * 255).toString(16).padStart(2, '0');
  }
  return hex;
}

// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

// RGB to HSV
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

// RGB to CMYK
function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}`}</code></pre>

      {/* Section 9: Python Code Examples */}
      <h2>{s.h2_code_py}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />

      <pre><code>{`# Python Color Conversion Functions
import colorsys

def hex_to_rgb(hex_color: str) -> tuple[int, int, int]:
    """Convert hex color string to RGB tuple."""
    hex_color = hex_color.lstrip('#')
    if len(hex_color) == 3:
        hex_color = ''.join(c * 2 for c in hex_color)
    return (
        int(hex_color[0:2], 16),
        int(hex_color[2:4], 16),
        int(hex_color[4:6], 16),
    )

def rgb_to_hex(r: int, g: int, b: int) -> str:
    """Convert RGB values to hex string."""
    return f'#{r:02x}{g:02x}{b:02x}'

def rgb_to_hsl(r: int, g: int, b: int) -> tuple[int, int, int]:
    """Convert RGB to HSL (H: 0-360, S: 0-100, L: 0-100)."""
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    return (round(h * 360), round(s * 100), round(l * 100))

def hsl_to_rgb(h: int, s: int, l: int) -> tuple[int, int, int]:
    """Convert HSL to RGB."""
    r, g, b = colorsys.hls_to_rgb(h / 360, l / 100, s / 100)
    return (round(r * 255), round(g * 255), round(b * 255))

def rgb_to_cmyk(r: int, g: int, b: int) -> tuple[int, int, int, int]:
    """Convert RGB to CMYK (each 0-100)."""
    if r == 0 and g == 0 and b == 0:
        return (0, 0, 0, 100)
    rn, gn, bn = r / 255, g / 255, b / 255
    k = 1 - max(rn, gn, bn)
    c = round(((1 - rn - k) / (1 - k)) * 100)
    m = round(((1 - gn - k) / (1 - k)) * 100)
    y = round(((1 - bn - k) / (1 - k)) * 100)
    return (c, m, y, round(k * 100))

# Examples
print(hex_to_rgb('#3B82F6'))     # (59, 130, 246)
print(rgb_to_hex(59, 130, 246))  # #3b82f6
print(rgb_to_hsl(59, 130, 246))  # (217, 91, 60)
print(hsl_to_rgb(217, 91, 60))   # (59, 131, 246)
print(rgb_to_cmyk(59, 130, 246)) # (76, 47, 0, 4)`}</code></pre>

      {/* Section 10: CSS Examples */}
      <h2>{s.h2_code_css}</h2>
      <p>{s.codeCssDesc}</p>

      <pre><code>{`/* All of these produce the same blue color */
.hex-color   { color: #3B82F6; }
.rgb-color   { color: rgb(59, 130, 246); }
.hsl-color   { color: hsl(217, 91%, 60%); }

/* Modern CSS space-separated syntax */
.modern-rgb  { color: rgb(59 130 246); }
.modern-hsl  { color: hsl(217 91% 60%); }

/* With alpha transparency */
.hex-alpha   { color: #3B82F680; }
.rgba-color  { color: rgba(59, 130, 246, 0.5); }
.hsla-color  { color: hsla(217, 91%, 60%, 0.5); }
.modern-alpha { color: rgb(59 130 246 / 0.5); }

/* CSS custom properties for dynamic theming */
:root {
  --hue: 217;
  --saturation: 91%;
  --lightness: 60%;
  --primary: hsl(var(--hue) var(--saturation) var(--lightness));
  --primary-light: hsl(var(--hue) var(--saturation) 90%);
  --primary-dark: hsl(var(--hue) var(--saturation) 30%);
}

/* Switch entire theme by changing one variable */
.theme-green { --hue: 142; }
.theme-red   { --hue: 0; }
.theme-purple { --hue: 270; }`}</code></pre>

      {/* Section 11: Modern CSS Color Spaces */}
      <h2>{s.h2_modern}</h2>
      <p>{s.modernDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.modernOklch }} />
      <p dangerouslySetInnerHTML={{ __html: s.modernLab }} />
      <p dangerouslySetInnerHTML={{ __html: s.modernP3 }} />
      <p>{s.modernFallback}</p>

      <pre><code>{`/* OKLCH - perceptually uniform */
.button {
  background: oklch(0.7 0.15 250);
  color: oklch(0.98 0.01 250);
}

/* Display P3 - wider gamut vivid colors */
.vivid-red {
  color: red;                            /* sRGB fallback */
  color: color(display-p3 1 0.1 0.1);   /* P3 vivid red */
}

/* Using @supports for progressive enhancement */
@supports (color: oklch(0 0 0)) {
  :root {
    --primary: oklch(0.6 0.2 250);
    --primary-light: oklch(0.9 0.05 250);
    --primary-dark: oklch(0.3 0.15 250);
  }
}

/* Fallback pattern */
.element {
  color: #3B82F6;                       /* sRGB fallback */
  color: oklch(0.637 0.179 255.1);      /* OKLCH version */
}`}</code></pre>

      {/* Section 12: FAQ */}
      <h2>{s.h2_faq}</h2>

      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>

      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>

      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>

      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>

      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>

      <h3>{s.faq6_q}</h3>
      <p>{s.faq6_a}</p>

      <h3>{s.faq7_q}</h3>
      <p>{s.faq7_a}</p>

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/color-converter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
