'use client';

import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'Color converters let you instantly translate color values between HEX, RGB, HSL, HSV, and CMYK. HEX is compact RGB notation for CSS. HSL separates hue from brightness, making it the best model for design systems. CMYK is subtractive and used exclusively for print. WCAG 2.1 requires 4.5:1 contrast ratio for normal text. Modern CSS supports oklch(), color-mix(), and Display P3 for wide-gamut colors.',
    key_title: 'Key Takeaways',
    key1: 'HEX, RGB, and HSL all describe the same sRGB color space and convert between each other losslessly.',
    key2: 'HSL is the most intuitive model: adjust Lightness for shades, Saturation for vibrancy, Hue to shift the color.',
    key3: 'CMYK is subtractive (ink on paper) and converting from RGB to CMYK is lossy due to gamut differences.',
    key4: 'WCAG 2.1 Level AA requires a minimum 4.5:1 contrast ratio for normal text and 3:1 for large text.',
    key5: 'CSS Color Level 4 introduces oklch(), lab(), and color(display-p3) for perceptually uniform wide-gamut colors.',
    key6: 'JavaScript and Python both have straightforward color conversion formulas with no dependencies required.',
    linkTool: 'Try our free online Color Converter — instantly convert HEX, RGB, HSL, HSV, and CMYK.',

    h2_intro: 'Why Color Conversion Matters for Developers and Designers',
    introP1: 'Every modern workflow touches multiple color formats. A designer exports a HEX code from Figma. The CSS developer needs HSL to build a dynamic theming system. The print shop demands CMYK values. The accessibility auditor checks RGB luminance against WCAG contrast ratios. Understanding how these formats relate — and how to convert between them accurately — is foundational knowledge.',
    introP2: 'This guide covers every major color model in depth, explains the mathematical formulas behind each conversion, provides working code in JavaScript and Python, and explores modern CSS color functions including <code>oklch()</code>. Whether you are building a design system, auditing a UI for accessibility, or just need a quick color lookup, this is your complete reference.',

    h2_models: 'Color Models: HEX, RGB, HSL, HSV, and CMYK',
    h3_hex: 'HEX Color Codes',
    hexP1: '<strong>HEX color codes</strong> are the most common format in CSS and web design. A hex code is a 6-character string prefixed with <code>#</code>, where each pair of characters represents a color channel (red, green, blue) as a base-16 number from <code>00</code> to <code>FF</code>.',
    hexP2: 'For example, <code>#3B82F6</code> decodes to: R = 0x3B = 59, G = 0x82 = 130, B = 0xF6 = 246. CSS also supports 3-character shorthand where <code>#F00</code> expands to <code>#FF0000</code>, and 8-character hex including an alpha channel: <code>#3B82F680</code> means 50% opacity.',
    hexWhen: '<strong>Use HEX when:</strong> writing CSS stylesheets, working with design tools like Figma or Sketch, or communicating colors in design specs. HEX is concise and universally understood.',

    h3_rgb: 'RGB (Red, Green, Blue)',
    rgbP1: '<strong>RGB</strong> is the native color model for screens. It defines colors using three decimal values from 0 to 255 for the red, green, and blue light channels. It is an <em>additive</em> model: combining R=255, G=255, B=255 produces white (all light channels at maximum), while R=0, G=0, B=0 is black (no light emitted).',
    rgbP2: 'In CSS you can write <code>rgb(59, 130, 246)</code> or use the modern space-separated syntax <code>rgb(59 130 246)</code>. For transparency, use <code>rgba(59, 130, 246, 0.5)</code> or the modern <code>rgb(59 130 246 / 0.5)</code>. RGB is the fundamental format for Canvas API operations, WebGL, and image processing.',
    rgbWhen: '<strong>Use RGB when:</strong> doing programmatic color manipulation, working with the Canvas API or WebGL, or when you need precise channel-level control.',

    h3_hsl: 'HSL (Hue, Saturation, Lightness)',
    hslP1: '<strong>HSL</strong> represents color using three human-intuitive dimensions instead of raw light intensities. <strong>Hue</strong> is a degree on the color wheel from 0 to 360 (0 = red, 60 = yellow, 120 = green, 180 = cyan, 240 = blue, 300 = magenta, 360 = red again). <strong>Saturation</strong> ranges from 0% (completely gray) to 100% (fully vivid). <strong>Lightness</strong> ranges from 0% (black) through 50% (the pure color) to 100% (white).',
    hslP2: 'HSL makes color operations that are difficult in RGB feel natural. To create a lighter shade: increase Lightness. To mute a color: decrease Saturation. To shift from blue to purple: increase Hue. This is why design systems and theming libraries default to HSL. In CSS: <code>hsl(217, 91%, 60%)</code>.',
    hslWhen: '<strong>Use HSL when:</strong> building design systems with shade scales, creating dark mode themes, or generating harmonious color palettes programmatically.',

    h3_hsv: 'HSV / HSB (Hue, Saturation, Value)',
    hsvP1: '<strong>HSV</strong> (also called HSB — Hue, Saturation, Brightness) shares the same Hue wheel as HSL but uses Value (Brightness) instead of Lightness. In HSV: Value=100% means the color is at its brightest, while Value=0% is always black. Saturation=0% gives you the pure hue at maximum brightness (white in HSL, the pure hue in HSV).',
    hsvP2: 'The key difference: in HSL, Lightness=50% gives the pure color regardless of saturation. In HSV, Value=100% at Saturation=100% gives the pure color. HSV maps directly to the square color picker found in Photoshop, Figma, and most native OS color dialogs. CSS does not support HSV natively, but understanding it prevents confusion when translating values from design tools.',

    h3_cmyk: 'CMYK (Cyan, Magenta, Yellow, Key/Black)',
    cmykP1: '<strong>CMYK</strong> is a <em>subtractive</em> color model used in printing. Unlike RGB which adds light, CMYK subtracts it using inks layered on white paper. Cyan absorbs red light, Magenta absorbs green, Yellow absorbs blue, and Key (Black) adds depth and sharpness. Each channel ranges from 0% (no ink) to 100% (full ink coverage).',
    cmykP2: 'The critical limitation: the CMYK color gamut is significantly smaller than sRGB. Many vivid screen colors — especially bright greens and blues — cannot be reproduced in CMYK ink. Converting from RGB to CMYK is therefore <em>lossy</em>. Professional print workflows use ICC color profiles to manage this gamut mismatch accurately.',
    cmykWhen: '<strong>Use CMYK when:</strong> preparing files for offset printing, generating PDFs for print, or working with print design tools like InDesign or Illustrator.',

    h2_why_convert: 'When and Why You Need to Convert Colors',
    whyTable: 'Different tools, environments, and workflows each have a preferred color format. Here is a practical mapping:',
    whyRow1: 'CSS stylesheets use HEX or HSL by convention',
    whyRow2: 'Figma and Sketch export HEX; their color pickers show HSV',
    whyRow3: 'JavaScript Canvas API uses RGB (integer or float)',
    whyRow4: 'WCAG contrast calculations require RGB luminance values',
    whyRow5: 'Offset printing and PDFs require CMYK values',
    whyRow6: 'Design tokens often store colors as HSL for easy manipulation',
    whyRow7: 'Three.js and WebGL shaders use float RGB (0.0 - 1.0)',
    whyRow8: 'CSS animations interpolate better in oklch() than rgb()',

    h2_formulas: 'Color Conversion Formulas',
    h3_hex_rgb: 'HEX to RGB',
    hexRgbDesc: 'Converting HEX to RGB is straightforward: parse each 2-character hex pair as a base-16 integer.',
    h3_rgb_hex: 'RGB to HEX',
    rgbHexDesc: 'Converting RGB to HEX: convert each decimal channel to a 2-digit hex string, zero-padded if needed.',
    h3_rgb_hsl: 'RGB to HSL',
    rgbHslDesc: 'Converting RGB to HSL requires normalizing to 0-1 range, finding the min/max channels, then computing each HSL component:',
    h3_hsl_rgb: 'HSL to RGB',
    hslRgbDesc: 'The HSL to RGB conversion uses a helper function to map hue sectors to channel intensities:',
    h3_rgb_cmyk: 'RGB to CMYK',
    rgbCmykDesc: 'Converting RGB to CMYK: normalize to 0-1, compute the Key (black) channel, then derive Cyan, Magenta, Yellow:',

    h2_hsl_theory: 'HSL Color Theory: Intuitive Color Selection',
    hslTheoryP1: 'HSL is the most useful color model for developers because it separates the <em>type</em> of color (Hue) from <em>how vivid it is</em> (Saturation) and <em>how light it is</em> (Lightness). This separation enables powerful color operations.',
    hslTheoryP2: '<strong>Creating a shade scale:</strong> Start with your brand color at HSL(H, S, 50%). Create lighter shades by increasing Lightness (60%, 70%, 80%, 90%) and darker shades by decreasing it (40%, 30%, 20%, 10%). This gives you a consistent 10-shade scale from the same Hue.',
    hslTheoryP3: '<strong>Dark mode color shifting:</strong> In light mode, a surface might be <code>hsl(220, 14%, 96%)</code>. In dark mode, invert the lightness to <code>hsl(220, 14%, 14%)</code>. This preserves the color character while dramatically changing the apparent brightness.',
    hslTheoryP4: '<strong>Muted vs. vivid variants:</strong> Same Hue, different Saturation. A brand blue of <code>hsl(217, 91%, 60%)</code> produces a muted variant at <code>hsl(217, 30%, 60%)</code> and a vivid accent at <code>hsl(217, 100%, 55%)</code>.',
    hslTheoryP5: '<strong>Complementary colors:</strong> Add 180 degrees to the Hue for the complementary color. If your brand is <code>hsl(217, 91%, 60%)</code> (blue), the complement is <code>hsl(37, 91%, 60%)</code> (orange). Analogous colors are 30-60 degrees apart on the wheel.',

    h2_cmyk_print: 'CMYK for Print: How It Differs from Screen Colors',
    cmykPrintP1: 'The fundamental difference between screen and print color is the light model. Screens <em>emit</em> light (additive), paper <em>reflects</em> it (subtractive). On a screen, mixing all colors at maximum gives white. With ink, mixing all colors gives a muddy dark brown — which is why CMYK adds a separate Key (Black) channel for true blacks.',
    cmykPrintP2: '<strong>The gamut problem:</strong> Standard sRGB can represent many colors that CMYK inks physically cannot reproduce. Vivid neon greens (<code>rgb(0, 255, 0)</code>), bright cyans, and electric blues all fall outside the CMYK gamut. When you convert these out-of-gamut colors to CMYK, they are clipped to the nearest reproducible color.',
    cmykPrintP3: '<strong>ICC profiles:</strong> Professional print workflows use ICC color profiles (such as FOGRA39 for European offset printing or SWOP for US publications) to accurately model the specific gamut of a printing process. A formula-based RGB-to-CMYK conversion ignores profiles and produces only an approximation.',
    cmykPrintP4: '<strong>Practical advice:</strong> If you are preparing files for professional printing, always work with your print provider\'s recommended ICC profile in software that supports it (Photoshop, Illustrator, InDesign). For web-to-print workflows, use a library like <code>colorimetry</code> or <code>color</code> in Node.js that supports profile-based conversion.',

    h2_accessibility: 'Color Accessibility: Contrast Ratio and WCAG',
    a11yP1: 'Color accessibility ensures that text and UI elements are visible to all users, including the approximately 8% of men and 0.5% of women with some form of color vision deficiency. The Web Content Accessibility Guidelines (WCAG) define minimum contrast ratios between foreground text and background colors.',
    a11yLevels: '<strong>WCAG 2.1 Contrast Requirements:</strong>',
    a11yAA: '<strong>Level AA (minimum standard):</strong> 4.5:1 for normal text (under 18pt or 24px bold), 3:1 for large text (18pt bold or 24px regular), 3:1 for UI components and graphical objects.',
    a11yAAA: '<strong>Level AAA (enhanced standard):</strong> 7:1 for normal text, 4.5:1 for large text.',
    a11yFormula: 'The contrast ratio formula: <code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>, where L1 is the relative luminance of the lighter color and L2 of the darker. Relative luminance linearizes sRGB values: values below 0.04045 divide by 12.92; others use <code>((c + 0.055) / 1.055) ^ 2.4</code>. Then: <code>L = 0.2126 * R + 0.7152 * G + 0.0722 * B</code>.',
    a11yTips: '<strong>Practical tips for accessible color design:</strong>',
    a11yTip1: 'Never use color as the only means of conveying information. Pair color with icons, labels, or patterns.',
    a11yTip2: 'Test with color blindness simulators (deuteranopia, protanopia, tritanopia) before shipping.',
    a11yTip3: 'Use HSL for building accessible palettes: keep Saturation consistent and adjust Lightness for contrast.',
    a11yTip4: 'Test your palette in forced colors mode (Windows High Contrast) to ensure usability.',
    a11yTip5: 'The <code>prefers-contrast: more</code> media query lets you serve high-contrast variants to users who request them.',

    h2_css_functions: 'CSS Color Functions: rgb(), hsl(), oklch()',
    cssP1: 'Modern CSS supports far more than basic <code>#hex</code> values. Here is a complete reference of color formats supported in contemporary CSS:',
    cssFormats: '<strong>Classic formats:</strong> <code>rgb(255, 87, 51)</code>, <code>rgba(255, 87, 51, 0.5)</code>, <code>hsl(14, 100%, 60%)</code>, <code>hsla(14, 100%, 60%, 0.5)</code>, <code>#FF5733</code>.',
    cssModern: '<strong>Modern space-separated syntax (CSS Color Level 4):</strong> <code>rgb(255 87 51)</code>, <code>rgb(255 87 51 / 0.5)</code>, <code>hsl(14 100% 60%)</code>, <code>hsl(14 100% 60% / 0.5)</code>.',
    cssOklch: '<strong>oklch():</strong> A perceptually uniform color space. <code>oklch(0.7 0.15 250)</code> takes Lightness (0-1), Chroma (0-0.4), and Hue (0-360). OKLCH ensures that two colors with the same Lightness value truly appear equally bright to the human eye — unlike HSL where yellow at hsl(60, 100%, 50%) appears much brighter than blue at hsl(240, 100%, 50%).',
    cssLab: '<strong>lab() and lch():</strong> CIE Lab separates lightness from color information. <code>lab(60 -20 50)</code>. LCH is its cylindrical form: <code>lch(60 40 120)</code>.',
    cssP3: '<strong>color(display-p3):</strong> Accesses the Display P3 wide-gamut color space, used by modern Apple displays and HDR screens: <code>color(display-p3 1 0.5 0)</code>. P3 can represent colors beyond sRGB gamut.',
    cssColorMix: '<strong>color-mix():</strong> Blends two colors in any color space: <code>color-mix(in oklch, #3b82f6 60%, #ef4444)</code>.',
    cssFallback: 'Always provide sRGB fallbacks for modern color spaces:',

    h2_palettes: 'Color Palettes: Generating Harmonious Colors',
    paletteP1: 'A well-designed color palette starts from a single brand color and systematically derives all the shades, tints, and semantic colors needed. Here are the main approaches:',
    paletteShades: '<strong>Shade scale (the Tailwind approach):</strong> For each hue, create 11 shades from 50 (lightest) to 950 (darkest). In HSL, hold Hue constant, reduce Saturation slightly for extreme shades, and vary Lightness from ~97% (shade 50) to ~10% (shade 950). OKLCH produces more perceptually even shade scales.',
    paletteComplementary: '<strong>Complementary palette:</strong> The complement of any hue is found by adding 180 degrees. Red (0) complements Cyan (180). Blue (240) complements Orange (60). Use the primary color for main actions and the complement for accents or warnings.',
    paletteSplit: '<strong>Split-complementary:</strong> Instead of the exact complement, use two colors 150 and 210 degrees from the base. This creates a vibrant but less harsh contrast than a direct complement.',
    paletteTriadic: '<strong>Triadic palette:</strong> Three colors equally spaced at 0, 120, and 240 degrees on the wheel. Triadic palettes are rich and balanced but require care to prevent visual chaos — use one as dominant and the others as accents.',
    paletteAnalogous: '<strong>Analogous palette:</strong> Colors within 30-60 degrees of the base hue. Analogous palettes feel harmonious and natural — perfect for backgrounds, surfaces, and UI where you want a cohesive feel without high contrast between color areas.',

    h2_js_code: 'JavaScript Code Examples for Color Conversion',
    jsDesc: 'These are complete, production-ready JavaScript functions. No external dependencies required.',
    h2_py_code: 'Python Code Examples',
    pyDesc: "Python's standard library includes the <code>colorsys</code> module for HSL and HSV conversions. Here are complete implementations including CMYK:",
    h2_named: 'Named CSS Colors and Their Values',
    namedDesc: 'CSS defines 148 named colors. Here are the most commonly used ones grouped by color family, with their HEX and RGB values:',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best color format for CSS?',
    faq1_a: 'For most projects, HEX is the most common choice due to its compact syntax and universal support in design tools. Use HSL when you need to programmatically create shade scales or adjust colors dynamically. Use oklch() for new design systems where perceptual uniformity and wide-gamut colors matter. Always provide an sRGB fallback for oklch() until browser support is universal.',
    faq2_q: 'How do I convert HEX to RGB?',
    faq2_a: 'Remove the # prefix, split the 6 characters into three 2-character pairs (RR, GG, BB), and convert each pair from hexadecimal to decimal. For example, #3B82F6: R = parseInt("3B", 16) = 59, G = parseInt("82", 16) = 130, B = parseInt("F6", 16) = 246. In JavaScript: const r = parseInt(hex.slice(1, 3), 16). Our free tool performs this conversion instantly.',
    faq3_q: 'What is the difference between HSL and HSV?',
    faq3_a: 'Both models use the same Hue wheel (0-360 degrees). The difference is in how they handle brightness. HSL uses Lightness where 0% = black, 50% = pure color, and 100% = white. HSV uses Value where 0% = black and 100% = the brightest possible expression of the color. HSL is used in CSS. HSV is used in design tool color pickers (Photoshop, Figma) because its square picker is more intuitive for color selection.',
    faq4_q: 'Why do my screen colors look different when printed?',
    faq4_a: 'Screens emit light (additive RGB model) while printers absorb it using inks (subtractive CMYK model). The CMYK gamut is smaller than sRGB, meaning many vivid screen colors — particularly bright greens, cyans, and blues — cannot be physically reproduced with standard printing inks. Additionally, paper white and ink behavior vary by stock. Professional printing uses ICC profiles and soft-proofing to predict the final printed result.',
    faq5_q: 'What WCAG contrast ratio do I need for accessibility?',
    faq5_a: 'WCAG 2.1 Level AA requires a minimum contrast ratio of 4.5:1 for normal text (under 18pt or 24px bold) and 3:1 for large text. Level AAA requires 7:1 for normal text and 4.5:1 for large text. Non-text UI elements (buttons, form controls, icons) need at least 3:1. The contrast ratio is calculated from the relative luminance of the two colors using the formula (L1 + 0.05) / (L2 + 0.05).',
    faq6_q: 'What is OKLCH and why should I use it?',
    faq6_a: 'OKLCH is a perceptually uniform color space introduced in CSS Color Level 4. Unlike HSL where the same Lightness value looks very different across hues (yellow at L=50% appears much brighter than blue at L=50%), OKLCH ensures that colors with the same Lightness value truly appear equally bright. This makes OKLCH ideal for generating harmonious shade scales, accessible palettes, and smooth color interpolation in animations. Browser support: Chrome 111+, Safari 15.4+, Firefox 113+.',
    faq7_q: 'How do I create a dark mode color palette?',
    faq7_a: 'The recommended approach is to use HSL or OKLCH and systematically adjust the Lightness dimension. For light mode, use high lightness values for backgrounds (95-98%) and low values for text (5-15%). For dark mode, invert this: dark backgrounds at 10-20% lightness and light text at 85-95%. Define all colors as CSS custom properties so dark mode is just a different set of variable values. Avoid simply inverting colors — design dark mode as a deliberate, separate palette.',
    faq8_q: 'How does the RGB to HSL formula work?',
    faq8_a: 'To convert RGB to HSL: (1) Normalize R, G, B to 0-1 range by dividing by 255. (2) Find Cmax (the largest channel) and Cmin (the smallest). (3) Lightness = (Cmax + Cmin) / 2. (4) If Cmax equals Cmin, Saturation = 0 (achromatic). Otherwise, Saturation = delta / (1 - |2L - 1|) where delta = Cmax - Cmin. (5) Hue: if Cmax is R, H = 60 * ((G-B)/delta mod 6). If Cmax is G, H = 60 * ((B-R)/delta + 2). If Cmax is B, H = 60 * ((R-G)/delta + 4).',

    conclusion: 'Color conversion is a foundational skill connecting design tools, CSS authoring, print production, and accessibility compliance. Whether you need a quick HEX to RGB lookup, want to build a programmatic shade scale in HSL, or are preparing for CMYK print output, mastering these conversions makes your work more precise and professional. Use our free online Color Converter tool for instant results and keep this guide as your reference.',
    linkToolBottom: 'Convert colors instantly between HEX, RGB, HSL, HSV, and CMYK with our free tool.',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: '颜色转换器能让你在 HEX、RGB、HSL、HSV 和 CMYK 之间即时转换颜色值。HEX 是 CSS 中 RGB 的紧凑表示。HSL 将色相与亮度分离，是设计系统的最佳模型。CMYK 是减色模型，专用于印刷。WCAG 2.1 要求正常文本的最低对比度为 4.5:1。现代 CSS 支持 oklch()、color-mix() 和 Display P3 宽色域颜色。',
    key_title: '关键要点',
    key1: 'HEX、RGB 和 HSL 都描述相同的 sRGB 色彩空间，相互转换无损。',
    key2: 'HSL 是最直观的模型：调节亮度来获取深浅变体，调节饱和度控制鲜艳程度，调节色相来改变颜色类型。',
    key3: 'CMYK 是减色模型（油墨）。RGB 转 CMYK 因色域差异而有损。',
    key4: 'WCAG 2.1 AA 级要求正常文本最低 4.5:1 对比度，大文本 3:1。',
    key5: 'CSS Color Level 4 引入 oklch()、lab() 和 color(display-p3)，用于感知均匀的宽色域颜色。',
    key6: 'JavaScript 和 Python 都有简单的颜色转换公式，无需任何依赖库。',
    linkTool: '试用我们的免费在线颜色转换工具 — 即时转换 HEX、RGB、HSL、HSV 和 CMYK。',

    h2_intro: '为什么颜色转换对开发者和设计师很重要',
    introP1: '每个现代工作流都涉及多种颜色格式。设计师从 Figma 导出 HEX 代码。CSS 开发者需要 HSL 来构建动态主题系统。印刷厂要求 CMYK 值。无障碍审计员根据 WCAG 对比度标准检查 RGB 亮度值。理解这些格式的关系以及如何准确转换是基础知识。',
    introP2: '本指南深度涵盖所有主要颜色模型，解释每种转换背后的数学公式，提供 JavaScript 和 Python 代码示例，并探讨现代 CSS 颜色函数（包括 oklch()）。无论你是在构建设计系统、做无障碍审计还是只需要快速查询颜色，这都是你的完整参考指南。',

    h2_models: '颜色模型：HEX、RGB、HSL、HSV 和 CMYK',
    h3_hex: 'HEX 颜色代码',
    hexP1: '<strong>HEX 颜色代码</strong>是 CSS 和网页设计中最常见的格式。十六进制代码是以 <code>#</code> 开头的 6 位字符串，每对字符代表一个颜色通道（红、绿、蓝），值从 <code>00</code> 到 <code>FF</code>（十六进制）。',
    hexP2: '例如，<code>#3B82F6</code> 解码为：R = 0x3B = 59，G = 0x82 = 130，B = 0xF6 = 246。CSS 还支持 3 位简写，如 <code>#F00</code> 展开为 <code>#FF0000</code>，以及包含透明通道的 8 位 HEX：<code>#3B82F680</code> 表示 50% 透明度。',
    hexWhen: '<strong>何时使用 HEX：</strong>编写 CSS 样式表、使用 Figma 或 Sketch 等设计工具，或在设计规范中传达颜色时。HEX 简洁且被普遍理解。',

    h3_rgb: 'RGB（红、绿、蓝）',
    rgbP1: '<strong>RGB</strong> 是屏幕的原生颜色模型。它使用 0 到 255 的三个十进制值来定义红、绿、蓝光通道的颜色。它是一种<em>加色</em>模型：R=255、G=255、B=255 的组合产生白色（所有光通道最大），而 R=0、G=0、B=0 是黑色（不发光）。',
    rgbP2: '在 CSS 中可以写 <code>rgb(59, 130, 246)</code> 或使用现代空格分隔语法 <code>rgb(59 130 246)</code>。对于透明度，使用 <code>rgba(59, 130, 246, 0.5)</code> 或现代的 <code>rgb(59 130 246 / 0.5)</code>。RGB 是 Canvas API 操作、WebGL 和图像处理的基本格式。',
    rgbWhen: '<strong>何时使用 RGB：</strong>进行程序化颜色操作、使用 Canvas API 或 WebGL，或需要精确的通道级控制时。',

    h3_hsl: 'HSL（色相、饱和度、亮度）',
    hslP1: '<strong>HSL</strong> 使用三个人类直观的维度来表示颜色，而不是原始光强度。<strong>色相</strong>是色轮上从 0 到 360 度的度数（0=红，60=黄，120=绿，180=青，240=蓝，300=品红）。<strong>饱和度</strong>从 0%（完全灰色）到 100%（完全鲜艳）。<strong>亮度</strong>从 0%（黑色）到 50%（纯色）再到 100%（白色）。',
    hslP2: 'HSL 使 RGB 中困难的颜色操作变得自然。要创建更亮的色调：增加亮度。要柔化颜色：降低饱和度。要从蓝色转为紫色：增加色相值。这就是设计系统和主题库默认使用 HSL 的原因。在 CSS 中：<code>hsl(217, 91%, 60%)</code>。',
    hslWhen: '<strong>何时使用 HSL：</strong>构建带色阶的设计系统、创建暗色模式主题，或程序化生成和谐调色板时。',

    h3_hsv: 'HSV/HSB（色相、饱和度、明度）',
    hsvP1: '<strong>HSV</strong>（也称 HSB——色相、饱和度、亮度）与 HSL 共享相同的色相轮，但使用明度（Brightness）代替亮度（Lightness）。在 HSV 中：明度=100% 表示颜色处于最亮状态，明度=0% 始终是黑色。',
    hsvP2: '关键区别：在 HSL 中，亮度=50% 无论饱和度如何都能给出纯色。在 HSV 中，明度=100% 且饱和度=100% 时才是纯色。HSV 直接对应 Photoshop、Figma 和大多数原生 OS 颜色对话框中的方形颜色选择器。CSS 不原生支持 HSV，但理解它可以避免从设计工具转换值时产生混淆。',

    h3_cmyk: 'CMYK（青、品红、黄、黑）',
    cmykP1: '<strong>CMYK</strong> 是印刷中使用的<em>减色</em>模型。与 RGB 添加光不同，CMYK 通过白纸上的油墨层减去光。青色吸收红光，品红色吸收绿光，黄色吸收蓝光，而黑色（Key）增加深度和清晰度。每个通道从 0%（无墨水）到 100%（全覆盖）。',
    cmykP2: '关键限制：CMYK 色域明显小于 sRGB。许多鲜艳的屏幕颜色——特别是明亮的绿色和蓝色——无法用 CMYK 油墨再现。因此，从 RGB 转换到 CMYK 是<em>有损的</em>。专业印刷工作流使用 ICC 颜色配置文件来准确管理这种色域不匹配。',
    cmykWhen: '<strong>何时使用 CMYK：</strong>准备胶印文件、生成用于打印的 PDF，或使用 InDesign 或 Illustrator 等平面设计工具时。',

    h2_why_convert: '何时以及为何需要转换颜色',
    whyTable: '不同的工具、环境和工作流各有首选的颜色格式。以下是实用映射：',
    whyRow1: 'CSS 样式表按惯例使用 HEX 或 HSL',
    whyRow2: 'Figma 和 Sketch 导出 HEX；颜色选择器显示 HSV',
    whyRow3: 'JavaScript Canvas API 使用 RGB（整数或浮点）',
    whyRow4: 'WCAG 对比度计算需要 RGB 亮度值',
    whyRow5: '胶印和 PDF 需要 CMYK 值',
    whyRow6: '设计令牌通常以 HSL 存储颜色，便于操作',
    whyRow7: 'Three.js 和 WebGL 着色器使用浮点 RGB（0.0-1.0）',
    whyRow8: 'CSS 动画在 oklch() 中的插值比 rgb() 更流畅',

    h2_formulas: '颜色转换公式',
    h3_hex_rgb: 'HEX 转 RGB',
    hexRgbDesc: 'HEX 转 RGB 很简单：将每对 2 位十六进制字符解析为 16 进制整数。',
    h3_rgb_hex: 'RGB 转 HEX',
    rgbHexDesc: 'RGB 转 HEX：将每个十进制通道转换为 2 位十六进制字符串，必要时补零。',
    h3_rgb_hsl: 'RGB 转 HSL',
    rgbHslDesc: 'RGB 转 HSL 需要先归一化到 0-1 范围，找到最大/最小通道，然后计算每个 HSL 分量：',
    h3_hsl_rgb: 'HSL 转 RGB',
    hslRgbDesc: 'HSL 转 RGB 使用辅助函数将色相扇区映射回通道强度：',
    h3_rgb_cmyk: 'RGB 转 CMYK',
    rgbCmykDesc: 'RGB 转 CMYK：归一化到 0-1，计算黑色（Key）通道，然后推导青色、品红、黄色：',

    h2_hsl_theory: 'HSL 颜色理论：直观的颜色选择',
    hslTheoryP1: 'HSL 是开发者最有用的颜色模型，因为它将颜色<em>类型</em>（色相）与<em>鲜艳程度</em>（饱和度）和<em>明暗程度</em>（亮度）分离。这种分离支持强大的颜色操作。',
    hslTheoryP2: '<strong>创建色阶：</strong>从你的品牌颜色开始，HSL(H, S, 50%)。通过增加亮度创建更浅的色调（60%、70%、80%、90%），通过降低亮度创建更深的色调（40%、30%、20%、10%）。这从相同色相生成了一个一致的 10 级色阶。',
    hslTheoryP3: '<strong>暗色模式颜色转换：</strong>在浅色模式中，表面可能是 <code>hsl(220, 14%, 96%)</code>。在暗色模式中，将亮度反转为 <code>hsl(220, 14%, 14%)</code>。这在显著改变明暗感的同时保持了颜色特征。',
    hslTheoryP4: '<strong>柔和与鲜艳变体：</strong>相同色相，不同饱和度。<code>hsl(217, 91%, 60%)</code> 的品牌蓝在 <code>hsl(217, 30%, 60%)</code> 时产生柔和变体，在 <code>hsl(217, 100%, 55%)</code> 时产生鲜艳强调色。',
    hslTheoryP5: '<strong>互补色：</strong>将色相加 180 度得到互补色。如果你的品牌是 <code>hsl(217, 91%, 60%)</code>（蓝色），互补色为 <code>hsl(37, 91%, 60%)</code>（橙色）。类似色相差 30-60 度。',

    h2_cmyk_print: 'CMYK 印刷：与屏幕颜色的区别',
    cmykPrintP1: '屏幕和印刷颜色的根本区别在于光模型。屏幕<em>发射</em>光（加色），纸张<em>反射</em>光（减色）。屏幕上，所有颜色最大值混合得到白色。油墨混合所有颜色得到深褐色——这就是为什么 CMYK 添加了单独的黑色（Key）通道用于真正的黑色。',
    cmykPrintP2: '<strong>色域问题：</strong>标准 sRGB 可以表示许多 CMYK 油墨物理上无法再现的颜色。鲜艳的霓虹绿（<code>rgb(0, 255, 0)</code>）、明亮的青色和电蓝色都超出了 CMYK 色域。将这些超色域颜色转换为 CMYK 时，它们会被裁剪到最近的可再现颜色。',
    cmykPrintP3: '<strong>ICC 配置文件：</strong>专业印刷工作流使用 ICC 颜色配置文件（如欧洲胶印的 FOGRA39 或美国出版物的 SWOP）来准确建模特定印刷过程的色域。基于公式的 RGB 到 CMYK 转换忽略配置文件，只产生近似结果。',
    cmykPrintP4: '<strong>实用建议：</strong>如果你为专业印刷准备文件，请始终在支持 ICC 配置文件的软件（Photoshop、Illustrator、InDesign）中使用印刷提供商推荐的配置文件。',

    h2_accessibility: '颜色无障碍：对比度和 WCAG',
    a11yP1: '颜色无障碍确保文本和 UI 元素对所有用户可见，包括大约 8% 的男性和 0.5% 的女性存在某种形式的色觉障碍。WCAG 定义了前景文本与背景颜色之间的最低对比度比率。',
    a11yLevels: '<strong>WCAG 2.1 对比度要求：</strong>',
    a11yAA: '<strong>AA 级（最低标准）：</strong>正常文本（18pt 或 24px 粗体以下）4.5:1，大文本（18pt 粗体或 24px 常规）3:1，UI 组件和图形对象 3:1。',
    a11yAAA: '<strong>AAA 级（增强标准）：</strong>正常文本 7:1，大文本 4.5:1。',
    a11yFormula: '对比度公式：<code>ratio = (L1 + 0.05) / (L2 + 0.05)</code>，L1 是较亮颜色的相对亮度，L2 是较暗颜色的。相对亮度将 sRGB 值线性化：小于 0.04045 的值除以 12.92；其他使用 <code>((c + 0.055) / 1.055) ^ 2.4</code>。然后：<code>L = 0.2126 * R + 0.7152 * G + 0.0722 * B</code>。',
    a11yTips: '<strong>无障碍颜色设计实用技巧：</strong>',
    a11yTip1: '永远不要仅用颜色传达信息。同时配合图标、标签或图案。',
    a11yTip2: '在发布前用色盲模拟器（红绿色盲、蓝黄色盲）测试。',
    a11yTip3: '使用 HSL 构建无障碍调色板：保持饱和度一致，调节亮度来实现对比度。',
    a11yTip4: '在强制颜色模式（Windows 高对比度）下测试调色板。',
    a11yTip5: '<code>prefers-contrast: more</code> 媒体查询允许你为需要高对比度的用户提供高对比度变体。',

    h2_css_functions: 'CSS 颜色函数：rgb()、hsl()、oklch()',
    cssP1: '现代 CSS 支持的不仅仅是基本的 <code>#hex</code> 值。以下是当代 CSS 支持的完整颜色格式参考：',
    cssFormats: '<strong>经典格式：</strong> <code>rgb(255, 87, 51)</code>、<code>rgba(255, 87, 51, 0.5)</code>、<code>hsl(14, 100%, 60%)</code>、<code>hsla(14, 100%, 60%, 0.5)</code>、<code>#FF5733</code>。',
    cssModern: '<strong>现代空格分隔语法（CSS Color Level 4）：</strong> <code>rgb(255 87 51)</code>、<code>rgb(255 87 51 / 0.5)</code>、<code>hsl(14 100% 60%)</code>、<code>hsl(14 100% 60% / 0.5)</code>。',
    cssOklch: '<strong>oklch()：</strong>感知均匀的颜色空间。<code>oklch(0.7 0.15 250)</code> 接受亮度（0-1）、色度（0-0.4）和色相（0-360）。OKLCH 确保具有相同亮度值的两种颜色对人眼看起来真正一样亮——不像 HSL 中 hsl(60, 100%, 50%) 的黄色看起来比 hsl(240, 100%, 50%) 的蓝色亮得多。',
    cssLab: '<strong>lab() 和 lch()：</strong>CIE Lab 将亮度与颜色信息分离。<code>lab(60 -20 50)</code>。LCH 是其柱形形式：<code>lch(60 40 120)</code>。',
    cssP3: '<strong>color(display-p3)：</strong>访问 Display P3 宽色域，用于现代 Apple 显示器和 HDR 屏幕：<code>color(display-p3 1 0.5 0)</code>。P3 可以表示超出 sRGB 色域的颜色。',
    cssColorMix: '<strong>color-mix()：</strong>在任何颜色空间中混合两种颜色：<code>color-mix(in oklch, #3b82f6 60%, #ef4444)</code>。',
    cssFallback: '始终为现代颜色空间提供 sRGB 降级方案：',

    h2_palettes: '调色板：生成和谐颜色',
    paletteP1: '精心设计的调色板从单一品牌颜色开始，系统地推导出所有所需的深浅、色调和语义颜色。以下是主要方法：',
    paletteShades: '<strong>色阶（Tailwind 方式）：</strong>对于每个色相，从 50（最亮）到 950（最暗）创建 11 个色阶。在 HSL 中，保持色相不变，对极端色阶稍微降低饱和度，亮度从约 97%（50 级）变化到 10%（950 级）。OKLCH 产生更感知均匀的色阶。',
    paletteComplementary: '<strong>互补调色板：</strong>任何色相的互补色通过加 180 度找到。红（0）与青（180）互补。蓝（240）与橙（60）互补。使用主色作为主要操作，互补色作为强调色或警告色。',
    paletteSplit: '<strong>分裂互补：</strong>不使用精确的互补色，而是使用距基色 150 度和 210 度的两种颜色。这比直接互补创造了更生动但不那么刺眼的对比。',
    paletteTriadic: '<strong>三色调色板：</strong>三种颜色等距分布在色轮的 0、120 和 240 度处。三色调色板丰富均衡，但需要谨慎——使用一种作为主导，其他作为强调色。',
    paletteAnalogous: '<strong>类似色调色板：</strong>距基色相 30-60 度内的颜色。类似色调色板感觉和谐自然——非常适合背景、表面和希望颜色区域间不高对比的 UI。',

    h2_js_code: 'JavaScript 颜色转换代码示例',
    jsDesc: '这些是完整的、可用于生产的 JavaScript 函数，不需要任何外部依赖。',
    h2_py_code: 'Python 代码示例',
    pyDesc: 'Python 标准库包含用于 HSL 和 HSV 转换的 <code>colorsys</code> 模块。以下是包含 CMYK 的完整实现：',
    h2_named: 'CSS 命名颜色及其值',
    namedDesc: 'CSS 定义了 148 种命名颜色。以下是按颜色系列分组的最常用颜色及其 HEX 和 RGB 值：',

    h2_faq: '常见问题',
    faq1_q: 'CSS 最佳颜色格式是什么？',
    faq1_a: '对于大多数项目，HEX 是最常见的选择，因为其语法紧凑且设计工具普遍支持。当你需要程序化创建色阶或动态调整颜色时，使用 HSL。对于关注感知均匀性和宽色域颜色的新设计系统，使用 oklch()。在 oklch() 获得普遍支持之前，始终提供 sRGB 降级方案。',
    faq2_q: '如何将 HEX 转换为 RGB？',
    faq2_a: '去掉 # 前缀，将 6 位字符分成三对 2 字符（RR、GG、BB），将每对从十六进制转换为十进制。例如，#3B82F6：R = parseInt("3B", 16) = 59，G = parseInt("82", 16) = 130，B = parseInt("F6", 16) = 246。在 JavaScript 中：const r = parseInt(hex.slice(1, 3), 16)。我们的免费工具可以即时完成此转换。',
    faq3_q: 'HSL 和 HSV 的区别是什么？',
    faq3_a: '两种模型都使用相同的色相轮（0-360 度）。区别在于处理亮度的方式。HSL 使用亮度，其中 0% = 黑色，50% = 纯色，100% = 白色。HSV 使用明度，其中 0% = 黑色，100% = 颜色最亮的表达。HSL 在 CSS 中使用。HSV 在设计工具颜色选择器（Photoshop、Figma）中使用，因为其方形选择器对颜色选择更直观。',
    faq4_q: '为什么我的屏幕颜色打印出来看起来不一样？',
    faq4_a: '屏幕发射光（加色 RGB 模型），而打印机使用油墨吸收光（减色 CMYK 模型）。CMYK 色域小于 sRGB，意味着许多鲜艳的屏幕颜色——特别是明亮的绿色、青色和蓝色——无法用标准印刷油墨物理再现。此外，纸张白色和油墨特性因纸张类型而异。专业印刷使用 ICC 配置文件和软打样来预测最终印刷结果。',
    faq5_q: '无障碍需要什么 WCAG 对比度比率？',
    faq5_a: 'WCAG 2.1 AA 级要求正常文本（18pt 或 24px 粗体以下）最低对比度 4.5:1，大文本 3:1。AAA 级要求正常文本 7:1，大文本 4.5:1。非文本 UI 元素（按钮、表单控件、图标）需要至少 3:1 的对比度。对比度使用公式 (L1 + 0.05) / (L2 + 0.05) 从两种颜色的相对亮度计算。',
    faq6_q: 'OKLCH 是什么，为什么要使用它？',
    faq6_a: 'OKLCH 是 CSS Color Level 4 中引入的感知均匀颜色空间。与 HSL（相同亮度值在不同色相下看起来非常不同——黄色在 L=50% 时比蓝色在 L=50% 时看起来亮得多）不同，OKLCH 确保具有相同亮度值的颜色看起来真正一样亮。这使 OKLCH 非常适合生成和谐的色阶、无障碍调色板和动画中的平滑颜色插值。浏览器支持：Chrome 111+、Safari 15.4+、Firefox 113+。',
    faq7_q: '如何创建暗色模式调色板？',
    faq7_a: '推荐方法是使用 HSL 或 OKLCH 系统地调整亮度维度。对于浅色模式，背景使用高亮度值（95-98%），文本使用低亮度值（5-15%）。对于暗色模式，反转这一点：深色背景亮度 10-20%，浅色文本亮度 85-95%。将所有颜色定义为 CSS 自定义属性，这样暗色模式就只是一组不同的变量值。避免简单地反转颜色——将暗色模式设计为一个有意的独立调色板。',
    faq8_q: 'RGB 转 HSL 公式是如何工作的？',
    faq8_a: '将 RGB 转换为 HSL：(1) 通过除以 255 将 R、G、B 归一化到 0-1 范围。(2) 找到 Cmax（最大通道）和 Cmin（最小通道）。(3) 亮度 = (Cmax + Cmin) / 2。(4) 如果 Cmax 等于 Cmin，饱和度 = 0（无色差）。否则，饱和度 = delta / (1 - |2L - 1|)，其中 delta = Cmax - Cmin。(5) 色相：如果 Cmax 是 R，H = 60 * ((G-B)/delta mod 6)。如果 Cmax 是 G，H = 60 * ((B-R)/delta + 2)。如果 Cmax 是 B，H = 60 * ((R-G)/delta + 4)。',

    conclusion: '颜色转换是连接设计工具、CSS 开发、印刷生产和无障碍合规性的基础技能。无论你需要快速查询 HEX 到 RGB，想用 HSL 构建程序化色阶，还是准备 CMYK 印刷输出，掌握这些转换都会使你的工作更精确、更专业。使用我们的免费在线颜色转换工具获取即时结果，并将本指南作为参考。',
    linkToolBottom: '使用我们的免费工具即时转换 HEX、RGB、HSL、HSV 和 CMYK。',
  },
};

export default function ColorConverterOnlineGuideV2({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: translations['en'].faq1_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq1_a } },
      { '@type': 'Question', name: translations['en'].faq2_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq2_a } },
      { '@type': 'Question', name: translations['en'].faq3_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq3_a } },
      { '@type': 'Question', name: translations['en'].faq4_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq4_a } },
      { '@type': 'Question', name: translations['en'].faq5_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq5_a } },
      { '@type': 'Question', name: translations['en'].faq6_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq6_a } },
      { '@type': 'Question', name: translations['en'].faq7_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq7_a } },
      { '@type': 'Question', name: translations['en'].faq8_q, acceptedAnswer: { '@type': 'Answer', text: translations['en'].faq8_a } },
    ],
  };

  const sectionStyle: React.CSSProperties = { marginBottom: 40 };
  const h2Style: React.CSSProperties = { fontSize: 26, fontWeight: 700, marginBottom: 16, marginTop: 0, color: 'var(--text-primary, #1e293b)' };
  const h3Style: React.CSSProperties = { fontSize: 20, fontWeight: 600, marginBottom: 12, marginTop: 24, color: 'var(--text-primary, #1e293b)' };
  const pStyle: React.CSSProperties = { fontSize: 16, lineHeight: 1.7, marginBottom: 14, color: 'var(--text-secondary, #475569)' };
  const codeBlockStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    borderRadius: 8,
    padding: '20px 24px',
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontSize: 14,
    lineHeight: 1.65,
    overflowX: 'auto',
    marginBottom: 24,
    whiteSpace: 'pre',
    display: 'block',
  };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: 24, fontSize: 15 };
  const thStyle: React.CSSProperties = { background: '#f1f5f9', padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e2e8f0', color: '#1e293b' };
  const tdStyle: React.CSSProperties = { padding: '10px 14px', borderBottom: '1px solid #f1f5f9', color: '#475569', verticalAlign: 'top' };
  const ulStyle: React.CSSProperties = { paddingLeft: 24, marginBottom: 16 };
  const liStyle: React.CSSProperties = { marginBottom: 8, lineHeight: 1.6, color: 'var(--text-secondary, #475569)', fontSize: 16 };
  const tagStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#dbeafe',
    color: '#1d4ed8',
    borderRadius: 4,
    padding: '2px 8px',
    fontSize: 13,
    fontWeight: 600,
    marginRight: 6,
  };

  const jsHexToRgb = `// HEX to RGB
function hexToRgb(hex) {
  // Remove # prefix and expand shorthand (#FFF -> #FFFFFF)
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

console.log(hexToRgb('#3B82F6'));
// { r: 59, g: 130, b: 246 }`;

  const jsRgbToHex = `// RGB to HEX
function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map(v => Math.round(v).toString(16).padStart(2, '0'))
    .join('');
}

console.log(rgbToHex(59, 130, 246));
// '#3b82f6'`;

  const jsRgbToHsl = `// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / delta + 6) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

console.log(rgbToHsl(59, 130, 246));
// { h: 217, s: 91, l: 60 }`;

  const jsHslToRgb = `// HSL to RGB
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (h < 60)        { r = c; g = x; b = 0; }
  else if (h < 120)  { r = x; g = c; b = 0; }
  else if (h < 180)  { r = 0; g = c; b = x; }
  else if (h < 240)  { r = 0; g = x; b = c; }
  else if (h < 300)  { r = x; g = 0; b = c; }
  else               { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

console.log(hslToRgb(217, 91, 60));
// { r: 59, g: 130, b: 246 }`;

  const jsRgbToCmyk = `// RGB to CMYK
function rgbToCmyk(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

console.log(rgbToCmyk(59, 130, 246));
// { c: 76, m: 47, y: 0, k: 4 }`;

  const jsContrastRatio = `// WCAG Contrast Ratio Calculator
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(r1, g1, b1, r2, g2, b2) {
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

// White text (#FFFFFF) on Tailwind blue-500 (#3B82F6)
console.log(contrastRatio(255, 255, 255, 59, 130, 246));
// '3.14' (fails AA for normal text — use blue-700 instead)

console.log(contrastRatio(255, 255, 255, 29, 78, 216));
// '5.95' (passes AA for normal text)`;

  const pyCode = `import colorsys

# RGB to HSL
def rgb_to_hsl(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    # colorsys uses HLS order, not HSL
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    return {
        'h': round(h * 360),
        's': round(s * 100),
        'l': round(l * 100),
    }

# HSL to RGB
def hsl_to_rgb(h, s, l):
    h, s, l = h / 360.0, s / 100.0, l / 100.0
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return {
        'r': round(r * 255),
        'g': round(g * 255),
        'b': round(b * 255),
    }

# RGB to HEX
def rgb_to_hex(r, g, b):
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

# HEX to RGB
def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    if len(hex_str) == 3:
        hex_str = ''.join(c*2 for c in hex_str)
    return {
        'r': int(hex_str[0:2], 16),
        'g': int(hex_str[2:4], 16),
        'b': int(hex_str[4:6], 16),
    }

# RGB to CMYK
def rgb_to_cmyk(r, g, b):
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    k = 1 - max(r, g, b)
    if k == 1:
        return {'c': 0, 'm': 0, 'y': 0, 'k': 100}
    c = (1 - r - k) / (1 - k)
    m = (1 - g - k) / (1 - k)
    y = (1 - b - k) / (1 - k)
    return {
        'c': round(c * 100),
        'm': round(m * 100),
        'y': round(y * 100),
        'k': round(k * 100),
    }

# Examples
print(rgb_to_hsl(59, 130, 246))   # {'h': 217, 's': 91, 'l': 60}
print(rgb_to_hex(59, 130, 246))   # '#3b82f6'
print(hex_to_rgb('#3B82F6'))      # {'r': 59, 'g': 130, 'b': 246}
print(rgb_to_cmyk(59, 130, 246))  # {'c': 76, 'm': 47, 'y': 0, 'k': 4}`;

  const cssFallbackCode = `/* Always provide sRGB fallback for oklch() */
.button-primary {
  /* Fallback for older browsers */
  background-color: #3b82f6;
  /* Modern: perceptually uniform, wide-gamut capable */
  background-color: oklch(0.6 0.2 250);
}

/* color-mix() blending */
.card-hover {
  background-color: color-mix(in oklch, #3b82f6 80%, #ef4444 20%);
}

/* HSL shade scale example */
:root {
  --blue-50:  hsl(214, 100%, 97%);
  --blue-100: hsl(214, 95%, 93%);
  --blue-200: hsl(213, 97%, 87%);
  --blue-300: hsl(212, 96%, 78%);
  --blue-400: hsl(213, 94%, 68%);
  --blue-500: hsl(217, 91%, 60%);
  --blue-600: hsl(221, 83%, 53%);
  --blue-700: hsl(224, 76%, 48%);
  --blue-800: hsl(226, 71%, 40%);
  --blue-900: hsl(224, 64%, 33%);
  --blue-950: hsl(226, 55%, 21%);
}

/* WCAG-safe dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary:   hsl(220, 14%, 12%);
    --bg-surface:   hsl(220, 14%, 18%);
    --text-primary: hsl(220, 14%, 94%);
    --text-muted:   hsl(220, 14%, 65%);
    --border:       hsl(220, 14%, 28%);
  }
}`;

  const whyRows = [
    [t.whyRow1, 'HEX / HSL', 'CSS, HTML'],
    [t.whyRow2, 'HEX (export), HSV (picker)', 'Figma, Sketch'],
    [t.whyRow3, 'RGB (0-255)', 'Canvas API, WebGL'],
    [t.whyRow4, 'RGB (normalized 0-1)', 'WCAG tools'],
    [t.whyRow5, 'CMYK', 'InDesign, PDF'],
    [t.whyRow6, 'HSL', 'Design tokens'],
    [t.whyRow7, 'RGB (0.0 - 1.0)', 'Three.js, GLSL'],
    [t.whyRow8, 'oklch()', 'CSS animations'],
  ];

  const namedColors = [
    { name: 'red', hex: '#FF0000', rgb: 'rgb(255, 0, 0)' },
    { name: 'crimson', hex: '#DC143C', rgb: 'rgb(220, 20, 60)' },
    { name: 'orange', hex: '#FFA500', rgb: 'rgb(255, 165, 0)' },
    { name: 'gold', hex: '#FFD700', rgb: 'rgb(255, 215, 0)' },
    { name: 'yellow', hex: '#FFFF00', rgb: 'rgb(255, 255, 0)' },
    { name: 'lime', hex: '#00FF00', rgb: 'rgb(0, 255, 0)' },
    { name: 'green', hex: '#008000', rgb: 'rgb(0, 128, 0)' },
    { name: 'teal', hex: '#008080', rgb: 'rgb(0, 128, 128)' },
    { name: 'cyan', hex: '#00FFFF', rgb: 'rgb(0, 255, 255)' },
    { name: 'dodgerblue', hex: '#1E90FF', rgb: 'rgb(30, 144, 255)' },
    { name: 'blue', hex: '#0000FF', rgb: 'rgb(0, 0, 255)' },
    { name: 'navy', hex: '#000080', rgb: 'rgb(0, 0, 128)' },
    { name: 'purple', hex: '#800080', rgb: 'rgb(128, 0, 128)' },
    { name: 'violet', hex: '#EE82EE', rgb: 'rgb(238, 130, 238)' },
    { name: 'magenta', hex: '#FF00FF', rgb: 'rgb(255, 0, 255)' },
    { name: 'pink', hex: '#FFC0CB', rgb: 'rgb(255, 192, 203)' },
    { name: 'white', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' },
    { name: 'silver', hex: '#C0C0C0', rgb: 'rgb(192, 192, 192)' },
    { name: 'gray', hex: '#808080', rgb: 'rgb(128, 128, 128)' },
    { name: 'black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'brown', hex: '#A52A2A', rgb: 'rgb(165, 42, 42)' },
    { name: 'chocolate', hex: '#D2691E', rgb: 'rgb(210, 105, 30)' },
    { name: 'coral', hex: '#FF7F50', rgb: 'rgb(255, 127, 80)' },
    { name: 'salmon', hex: '#FA8072', rgb: 'rgb(250, 128, 114)' },
    { name: 'tomato', hex: '#FF6347', rgb: 'rgb(255, 99, 71)' },
    { name: 'slategray', hex: '#708090', rgb: 'rgb(112, 128, 144)' },
    { name: 'darkgreen', hex: '#006400', rgb: 'rgb(0, 100, 0)' },
    { name: 'forestgreen', hex: '#228B22', rgb: 'rgb(34, 139, 34)' },
    { name: 'olive', hex: '#808000', rgb: 'rgb(128, 128, 0)' },
    { name: 'indigo', hex: '#4B0082', rgb: 'rgb(75, 0, 130)' },
  ];

  return (
    <article style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: 'var(--text-primary, #1e293b)', maxWidth: '100%' }}>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: 10,
        padding: '20px 24px',
        marginBottom: 32,
      }}>
        <p style={{ fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284c7', margin: '0 0 8px' }}>
          {t.tldr_title}
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#0c4a6e' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', borderRadius: 10, padding: '20px 24px', marginBottom: 36, border: '1px solid #e2e8f0' }}>
        <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px', color: '#1e293b' }}>{t.key_title}</p>
        <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
          {[t.key1, t.key2, t.key3, t.key4, t.key5, t.key6].map((k, i) => (
            <li key={i} style={{ marginBottom: 8, lineHeight: 1.6, color: '#475569', fontSize: 15 }}>{k}</li>
          ))}
        </ul>
      </div>

      {/* Tool Link */}
      <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: 10, padding: '18px 24px', marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ margin: 0, color: '#fff', fontWeight: 600, fontSize: 15 }}>{t.linkTool}</p>
        <Link href={`/${lang}/tools/color-converter`} style={{ background: '#fff', color: '#2563eb', fontWeight: 700, padding: '8px 20px', borderRadius: 6, textDecoration: 'none', fontSize: 14, whiteSpace: 'nowrap' }}>
          {lang === 'zh' ? '使用工具' : 'Use the Tool'}
        </Link>
      </div>

      {/* Section: Why Color Conversion Matters */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_intro}</h2>
        <p style={pStyle}>{t.introP1}</p>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.introP2 }} />
      </section>

      {/* Section: Color Models */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_models}</h2>

        <h3 style={h3Style}>{t.h3_hex}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hexP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hexP2 }} />
        <div style={{ background: '#f8fafc', borderRadius: 6, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #3b82f6' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#475569' }} dangerouslySetInnerHTML={{ __html: t.hexWhen }} />
        </div>

        <h3 style={h3Style}>{t.h3_rgb}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.rgbP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.rgbP2 }} />
        <div style={{ background: '#f8fafc', borderRadius: 6, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #3b82f6' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#475569' }} dangerouslySetInnerHTML={{ __html: t.rgbWhen }} />
        </div>

        <h3 style={h3Style}>{t.h3_hsl}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslP2 }} />
        <div style={{ background: '#f8fafc', borderRadius: 6, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #3b82f6' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#475569' }} dangerouslySetInnerHTML={{ __html: t.hslWhen }} />
        </div>

        <h3 style={h3Style}>{t.h3_hsv}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hsvP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hsvP2 }} />

        <h3 style={h3Style}>{t.h3_cmyk}</h3>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykP2 }} />
        <div style={{ background: '#f8fafc', borderRadius: 6, padding: '12px 16px', marginBottom: 16, borderLeft: '3px solid #f59e0b' }}>
          <p style={{ margin: 0, fontSize: 14, color: '#475569' }} dangerouslySetInnerHTML={{ __html: t.cmykWhen }} />
        </div>
      </section>

      {/* Section: Why Convert */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_why_convert}</h2>
        <p style={pStyle}>{t.whyTable}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{lang === 'zh' ? '场景' : 'Use Case'}</th>
                <th style={thStyle}>{lang === 'zh' ? '首选格式' : 'Preferred Format'}</th>
                <th style={thStyle}>{lang === 'zh' ? '工具/环境' : 'Tool / Environment'}</th>
              </tr>
            </thead>
            <tbody>
              {whyRows.map(([scenario, format, env], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  <td style={tdStyle}>{scenario}</td>
                  <td style={{ ...tdStyle }}>
                    <span style={tagStyle}>{format}</span>
                  </td>
                  <td style={tdStyle}>{env}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: Formulas */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_formulas}</h2>

        <h3 style={h3Style}>{t.h3_hex_rgb}</h3>
        <p style={pStyle}>{t.hexRgbDesc}</p>
        <code style={codeBlockStyle}>{jsHexToRgb}</code>

        <h3 style={h3Style}>{t.h3_rgb_hex}</h3>
        <p style={pStyle}>{t.rgbHexDesc}</p>
        <code style={codeBlockStyle}>{jsRgbToHex}</code>

        <h3 style={h3Style}>{t.h3_rgb_hsl}</h3>
        <p style={pStyle}>{t.rgbHslDesc}</p>
        <code style={codeBlockStyle}>{jsRgbToHsl}</code>

        <h3 style={h3Style}>{t.h3_hsl_rgb}</h3>
        <p style={pStyle}>{t.hslRgbDesc}</p>
        <code style={codeBlockStyle}>{jsHslToRgb}</code>

        <h3 style={h3Style}>{t.h3_rgb_cmyk}</h3>
        <p style={pStyle}>{t.rgbCmykDesc}</p>
        <code style={codeBlockStyle}>{jsRgbToCmyk}</code>
      </section>

      {/* Section: HSL Theory */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_hsl_theory}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslTheoryP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslTheoryP2 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslTheoryP3 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslTheoryP4 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.hslTheoryP5 }} />
      </section>

      {/* Section: CMYK for Print */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_cmyk_print}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykPrintP1 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykPrintP2 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykPrintP3 }} />
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.cmykPrintP4 }} />
      </section>

      {/* Section: Accessibility */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_accessibility}</h2>
        <p style={pStyle}>{t.a11yP1}</p>
        <p style={{ ...pStyle, fontWeight: 600, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: t.a11yLevels }} />
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.a11yAA }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.a11yAAA }} />
        </ul>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.a11yFormula }} />
        <code style={codeBlockStyle}>{jsContrastRatio}</code>
        <p style={{ ...pStyle, fontWeight: 600, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: t.a11yTips }} />
        <ul style={ulStyle}>
          {[t.a11yTip1, t.a11yTip2, t.a11yTip3, t.a11yTip4, t.a11yTip5].map((tip, i) => (
            <li key={i} style={liStyle} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
      </section>

      {/* Section: CSS Color Functions */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_css_functions}</h2>
        <p style={pStyle}>{t.cssP1}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssFormats }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssModern }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssOklch }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssLab }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssP3 }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.cssColorMix }} />
        </ul>
        <p style={pStyle}>{t.cssFallback}</p>
        <code style={codeBlockStyle}>{cssFallbackCode}</code>
      </section>

      {/* Section: Color Palettes */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_palettes}</h2>
        <p style={pStyle}>{t.paletteP1}</p>
        <ul style={ulStyle}>
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.paletteShades }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.paletteComplementary }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.paletteSplit }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.paletteTriadic }} />
          <li style={liStyle} dangerouslySetInnerHTML={{ __html: t.paletteAnalogous }} />
        </ul>
      </section>

      {/* Section: JavaScript Code */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_js_code}</h2>
        <p style={pStyle}>{t.jsDesc}</p>
        <p style={{ ...pStyle, fontWeight: 600 }}>
          {lang === 'zh' ? '完整工具集（所有转换 + WCAG 对比度）：' : 'Complete toolkit (all conversions + WCAG contrast):'}
        </p>
        <code style={codeBlockStyle}>{`// Color Conversion Toolkit (no dependencies)
${jsHexToRgb}

${jsRgbToHex}

${jsRgbToHsl}

${jsHslToRgb}

${jsRgbToCmyk}

// RGB to HSV
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta + 6) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
  }

  return { h: h < 0 ? h + 360 : h, s: Math.round(s * 100), v: Math.round(v * 100) };
}`}</code>
      </section>

      {/* Section: Python Code */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_py_code}</h2>
        <p style={pStyle} dangerouslySetInnerHTML={{ __html: t.pyDesc }} />
        <code style={codeBlockStyle}>{pyCode}</code>
      </section>

      {/* Section: Named CSS Colors */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_named}</h2>
        <p style={pStyle}>{t.namedDesc}</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 40 }}>{lang === 'zh' ? '颜色' : 'Color'}</th>
                <th style={thStyle}>{lang === 'zh' ? '名称' : 'Name'}</th>
                <th style={thStyle}>HEX</th>
                <th style={thStyle}>RGB</th>
              </tr>
            </thead>
            <tbody>
              {namedColors.map((c, i) => (
                <tr key={c.name} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  <td style={{ ...tdStyle, padding: '8px 14px' }}>
                    <span style={{ display: 'inline-block', width: 28, height: 28, borderRadius: 4, background: c.hex, border: '1px solid rgba(0,0,0,0.1)', verticalAlign: 'middle' }} />
                  </td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, color: '#1e293b' }}>{c.name}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{c.hex}</td>
                  <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 13 }}>{c.rgb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section: FAQ */}
      <section style={sectionStyle}>
        <h2 style={h2Style}>{t.h2_faq}</h2>
        {[
          [t.faq1_q, t.faq1_a],
          [t.faq2_q, t.faq2_a],
          [t.faq3_q, t.faq3_a],
          [t.faq4_q, t.faq4_a],
          [t.faq5_q, t.faq5_a],
          [t.faq6_q, t.faq6_a],
          [t.faq7_q, t.faq7_a],
          [t.faq8_q, t.faq8_a],
        ].map(([q, a], i) => (
          <details key={i} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 16, marginBottom: 16 }}>
            <summary style={{ fontWeight: 600, fontSize: 16, cursor: 'pointer', color: '#1e293b', lineHeight: 1.5, listStyle: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#3b82f6', fontWeight: 700 }}>Q:</span> {q}
            </summary>
            <p style={{ margin: '12px 0 0 24px', fontSize: 15, lineHeight: 1.7, color: '#475569' }}>{a}</p>
          </details>
        ))}
      </section>

      {/* Conclusion */}
      <section style={{ ...sectionStyle, background: '#f8fafc', borderRadius: 10, padding: '24px 28px', border: '1px solid #e2e8f0' }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#475569' }}>{t.conclusion}</p>
      </section>

      {/* Bottom Tool Link */}
      <div style={{ marginTop: 32, padding: '18px 24px', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: 10, border: '1px solid #bae6fd' }}>
        <p style={{ margin: '0 0 10px', fontWeight: 600, color: '#0284c7', fontSize: 15 }}>{t.linkToolBottom}</p>
        <Link
          href={`/${lang}/tools/color-converter`}
          style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', fontWeight: 700, padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontSize: 15 }}
        >
          {lang === 'zh' ? '立即使用颜色转换工具' : 'Open Color Converter Tool'}
        </Link>
      </div>
    </article>
  );
}
