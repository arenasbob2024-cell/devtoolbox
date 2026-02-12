'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'CSS Text Gradient: How to Create Gradient Text with Pure CSS',
    intro: 'Gradient text is one of the most eye-catching visual effects in modern web design. From hero headings to logo text, gradient text adds depth and personality without requiring any images. This <strong>complete CSS text gradient guide</strong> covers every technique — from the basic three-property trick to animated rainbow text, Tailwind CSS shortcuts, React integration, and 10 beautiful copy-paste examples.',

    h2_basic: '1. The Basic Technique: background + background-clip + text-fill-color',
    basicDesc: 'The foundation of every CSS text gradient is a three-property combination. The idea is simple: apply a gradient as the background of the text element, clip the background to the shape of the text, and then make the text itself transparent so the gradient shows through.',
    basicExplain: 'Here is the essential CSS pattern that every text gradient uses:',
    basicHow: '<strong>How it works:</strong> <code>background</code> applies the gradient to the entire element. <code>background-clip: text</code> clips the background so it only shows through the text glyphs. <code>-webkit-text-fill-color: transparent</code> (or <code>color: transparent</code>) makes the actual text color invisible, revealing the gradient underneath. The <code>-webkit-</code> prefix is still needed for <code>background-clip: text</code> in many browsers, including Chrome and Safari.',
    basicFallback: 'Always include a solid <code>color</code> value before the gradient declarations as a fallback for browsers or contexts that do not support <code>background-clip: text</code>.',

    h2_linear: '2. Linear Gradient Text: Horizontal, Vertical, Diagonal',
    linearDesc: 'Linear gradients are the most common choice for text gradients. You can control the direction of the color flow using angles or direction keywords.',
    linearHorizontal: 'Horizontal (Left to Right)',
    linearVertical: 'Vertical (Top to Bottom)',
    linearDiagonal: 'Diagonal (45 degrees)',
    linearCustomAngle: 'Custom Angle with Multiple Stops',
    linearTip: '<strong>Tip:</strong> Horizontal gradients (<code>to right</code> or <code>90deg</code>) tend to look best on single-line text. For multi-line text, vertical gradients (<code>to bottom</code>) often produce more consistent results because each line gets a different shade.',

    h2_radial: '3. Radial Gradient Text',
    radialDesc: 'Radial gradients create a spotlight or glow effect on text. The gradient radiates outward from a center point, producing a more organic, dimensional look.',
    radialPositioned: 'Positioned Radial Gradient',
    radialTip: '<strong>Tip:</strong> Radial gradients on text work best for shorter headings or single words. On long paragraphs, the center bright spot becomes too distant from edge text.',

    h2_conic: '4. Conic Gradient Text',
    conicDesc: 'Conic gradients sweep colors around a center point like a color wheel. Applied to text, they create unique holographic or prismatic effects.',
    conicTip: '<strong>Tip:</strong> Conic gradients produce their most dramatic effects on larger text. On small font sizes, the color transitions can appear muddy.',

    h2_animated: '5. Animated Gradient Text (with @keyframes)',
    animatedDesc: 'Animated gradient text draws attention to headings and call-to-action elements. There are two primary approaches: animating <code>background-position</code> on an oversized gradient, and using <code>@property</code> to animate custom properties.',
    animatedMethod1: 'Method 1: background-position Animation',
    animatedMethod1Desc: 'This method creates a gradient much larger than the element, then shifts its position over time. It works in all modern browsers:',
    animatedMethod2: 'Method 2: @property Animation (Chrome, Edge, Safari)',
    animatedMethod2Desc: 'The <code>@property</code> method lets you animate individual color stops smoothly. It produces higher-quality animations but requires browser support for CSS <code>@property</code>:',
    animatedMethod3: 'Method 3: Hue Rotation Filter',
    animatedMethod3Desc: 'The simplest approach uses the <code>hue-rotate</code> filter to cycle through colors. It is less customizable but works everywhere:',

    h2_rainbow: '6. Multi-Color Rainbow Text',
    rainbowDesc: 'Rainbow text uses the full spectrum of colors. Here are several approaches from simple to advanced:',
    rainbowBasic: 'Full Spectrum Rainbow',
    rainbowNeon: 'Neon Rainbow (Vivid Saturated Colors)',
    rainbowAnimated: 'Animated Rainbow',
    rainbowPerChar: 'Per-Character Rainbow (CSS-only with spans)',
    rainbowPerCharDesc: 'For per-character color control, wrap each letter in a <code>&lt;span&gt;</code> and use <code>animation-delay</code>:',

    h2_browser: '7. Browser Support & Fallbacks',
    browserDesc: 'The text gradient technique has excellent browser support in 2026, but there are important nuances:',
    browserTable: '<table><thead><tr><th>Feature</th><th>Chrome</th><th>Firefox</th><th>Safari</th><th>Edge</th></tr></thead><tbody><tr><td><code>-webkit-background-clip: text</code></td><td>Yes (v3+)</td><td>Yes (v49+)</td><td>Yes (v4+)</td><td>Yes (v15+)</td></tr><tr><td><code>background-clip: text</code> (unprefixed)</td><td>Yes (v120+)</td><td>Yes (v49+)</td><td>Yes (v14+)</td><td>Yes (v120+)</td></tr><tr><td><code>conic-gradient</code></td><td>Yes (v69+)</td><td>Yes (v83+)</td><td>Yes (v12.1+)</td><td>Yes (v79+)</td></tr><tr><td><code>@property</code></td><td>Yes (v85+)</td><td>Yes (v128+)</td><td>Yes (v15.4+)</td><td>Yes (v85+)</td></tr></tbody></table>',
    browserFallback: 'Recommended Fallback Pattern',
    browserFallbackDesc: 'Always structure your CSS so that older browsers see a solid color:',
    browserSafety: '<strong>Key point:</strong> The <code>color</code> declaration provides the fallback. If <code>background-clip: text</code> is not supported, the solid color is visible. The <code>@supports</code> block applies the gradient only when the browser supports the feature.',

    h2_tailwind: '8. Tailwind CSS: bg-gradient-to-r, bg-clip-text',
    tailwindDesc: 'Tailwind CSS provides utility classes that make gradient text trivial to implement without writing custom CSS:',
    tailwindBasic: 'Basic Tailwind Gradient Text',
    tailwindCustom: 'Custom Colors with Tailwind',
    tailwindAnimated: 'Animated Gradient Text in Tailwind (with custom CSS)',
    tailwindAnimatedDesc: 'Tailwind does not have built-in animation utilities for gradients, but you can combine utility classes with a small custom animation:',
    tailwindV4: 'Tailwind v4 Syntax',
    tailwindV4Desc: 'In Tailwind v4, the gradient utilities have been updated:',

    h2_react: '9. React / Next.js: Inline Styles vs CSS Modules',
    reactDesc: 'In React and Next.js projects, you have several options for implementing gradient text:',
    reactInline: 'Method 1: Inline Styles',
    reactInlineDesc: 'Inline styles work but require the <code>WebkitBackgroundClip</code> and <code>WebkitTextFillColor</code> camelCase properties:',
    reactModule: 'Method 2: CSS Modules',
    reactModuleDesc: 'CSS Modules provide clean separation and full CSS feature support:',
    reactComponent: 'Method 3: Reusable React Component',
    reactComponentDesc: 'Create a flexible, reusable gradient text component:',
    reactNextjs: 'Next.js Tip',
    reactNextjsDesc: 'In Next.js App Router, CSS Modules work out of the box. If you use inline styles in a Server Component, the gradient renders on the server with zero client-side JavaScript. For animated gradients, you will need a Client Component (<code>\'use client\'</code>).',

    h2_examples: '10. 10 Beautiful Gradient Text Examples',
    examplesDesc: 'Here are 10 production-ready gradient text styles you can copy and paste directly into your projects:',
    example1: 'Ocean Blue',
    example2: 'Sunset Orange',
    example3: 'Aurora Green',
    example4: 'Royal Purple',
    example5: 'Fire Red',
    example6: 'Cotton Candy',
    example7: 'Gold Luxury',
    example8: 'Neon Cyberpunk',
    example9: 'Forest Earth',
    example10: 'Holographic Silver',

    h2_pitfalls: '11. Common Pitfalls: Selection Color, Accessibility, Print',
    pitfallsDesc: 'Gradient text looks great but comes with several gotchas that can hurt usability:',
    pitfall1Title: 'Text Selection Color',
    pitfall1Desc: 'When users select gradient text, the selection highlight can clash with the gradient or become invisible. Fix this with <code>::selection</code>:',
    pitfall2Title: 'Accessibility & Contrast',
    pitfall2Desc: 'Gradient text can fail WCAG contrast requirements because the contrast ratio varies across the text. Some letters may have sufficient contrast while others do not. Guidelines:',
    pitfall2List: '<ul><li>Ensure <strong>every color in the gradient</strong> meets the minimum 4.5:1 contrast ratio against the background (or 3:1 for large text, 24px+ or bold 18.66px+).</li><li>Test both endpoints and the midpoint of the gradient separately.</li><li>Avoid using light gradient colors on light backgrounds or dark gradient colors on dark backgrounds.</li><li>Consider using gradient text only for decorative or non-essential text (headings), not body copy.</li><li>Use the <code>color</code> fallback as an accessible alternative.</li></ul>',
    pitfall3Title: 'Print Stylesheets',
    pitfall3Desc: 'Gradient text does not print. In print stylesheets, the text becomes invisible because <code>-webkit-text-fill-color: transparent</code> persists but the gradient background is stripped. Always add print overrides:',
    pitfall4Title: 'Copy-Paste Behavior',
    pitfall4Desc: 'Gradient text copies normally to the clipboard because the underlying text content is unchanged. However, if you use <code>user-select: none</code> on a gradient text container, users cannot copy it. Avoid this unless the text is purely decorative.',
    pitfall5Title: 'Performance on Long Text',
    pitfall5Desc: 'Applying gradient backgrounds to very large blocks of text (entire paragraphs or pages) can cause minor rendering overhead. Keep gradient text effects limited to headings and short phrases for best performance.',

    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'Does gradient text work on all browsers?',
    faq1_a: 'Yes. The <code>-webkit-background-clip: text</code> technique works in all modern browsers including Chrome, Firefox, Safari, and Edge. The <code>-webkit-</code> prefix is still recommended for maximum compatibility. Unprefixed <code>background-clip: text</code> is supported in Firefox since version 49 and in Chrome/Edge since version 120.',
    faq2_q: 'Can I animate CSS gradient text?',
    faq2_a: 'Yes, using three approaches: (1) Animate <code>background-position</code> on an oversized gradient using <code>@keyframes</code> — works everywhere. (2) Use CSS <code>@property</code> to register custom properties and animate individual color stops — smoother but requires Chrome 85+, Safari 15.4+, or Firefox 128+. (3) Apply <code>filter: hue-rotate()</code> animation for a simple color-cycling effect.',
    faq3_q: 'How do I make gradient text accessible?',
    faq3_a: 'Ensure every color in the gradient meets WCAG 2.1 minimum contrast ratios (4.5:1 for normal text, 3:1 for large text) against the background. Test the lightest color in the gradient, not just the darkest. Provide a solid <code>color</code> fallback. Limit gradient text to headings and decorative elements rather than body copy. Use <code>::selection</code> styles for readable text selection.',
    faq4_q: 'Why is my gradient text invisible when I print the page?',
    faq4_a: 'Browsers strip background images (including gradients) when printing. Since gradient text relies on <code>background-clip: text</code> with transparent text color, the text disappears on print. Add a <code>@media print</code> rule that resets <code>-webkit-text-fill-color</code> to a solid color and removes the background.',
    faq5_q: 'Can I use gradient text with Tailwind CSS?',
    faq5_a: 'Yes. Tailwind provides utilities for gradient text: apply <code>bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent</code> to any text element. In Tailwind v4, the syntax uses <code>bg-linear-to-r</code> instead. For animated gradients, add a custom keyframe animation in your Tailwind config.',

    conclusion: 'CSS text gradients are a powerful, performant way to add visual impact to your web designs. With the three-property technique as a foundation, you can create everything from subtle brand-colored headings to animated rainbow effects. Remember to always include fallbacks, test accessibility, and keep gradient effects on short, impactful text.',
  },
  zh: {
    title: 'CSS 文字渐变：如何用纯 CSS 创建渐变文字效果',
    intro: '渐变文字是现代网页设计中最引人注目的视觉效果之一。从首屏大标题到 Logo 文字，渐变文字无需图片即可增添深度和个性。本<strong>完整 CSS 文字渐变指南</strong>涵盖所有技术 —— 从基础三属性技巧到动画彩虹文字、Tailwind CSS 快捷方式、React 集成以及 10 个精美的即拷即用示例。',

    h2_basic: '1. 基础技术：background + background-clip + text-fill-color',
    basicDesc: '所有 CSS 文字渐变的基础都是三个属性的组合。原理很简单：将渐变作为文本元素的背景，将背景裁剪为文字形状，然后将文字本身设为透明以显示下方的渐变。',
    basicExplain: '以下是每个文字渐变都使用的核心 CSS 模式：',
    basicHow: '<strong>工作原理：</strong><code>background</code> 将渐变应用到整个元素。<code>background-clip: text</code> 将背景裁剪为仅在文字字形中显示。<code>-webkit-text-fill-color: transparent</code>（或 <code>color: transparent</code>）使文字颜色不可见，露出下方的渐变。在许多浏览器（包括 Chrome 和 Safari）中，<code>background-clip: text</code> 仍需要 <code>-webkit-</code> 前缀。',
    basicFallback: '始终在渐变声明之前包含一个纯色 <code>color</code> 值，作为不支持 <code>background-clip: text</code> 的浏览器或上下文的后备方案。',

    h2_linear: '2. 线性渐变文字：水平、垂直、对角线',
    linearDesc: '线性渐变是文字渐变最常见的选择。你可以使用角度或方向关键字来控制颜色流动方向。',
    linearHorizontal: '水平方向（从左到右）',
    linearVertical: '垂直方向（从上到下）',
    linearDiagonal: '对角线方向（45 度）',
    linearCustomAngle: '自定义角度与多色停点',
    linearTip: '<strong>提示：</strong>水平渐变（<code>to right</code> 或 <code>90deg</code>）在单行文字上效果最好。对于多行文字，垂直渐变（<code>to bottom</code>）通常效果更一致，因为每行文字会呈现不同的色调。',

    h2_radial: '3. 径向渐变文字',
    radialDesc: '径向渐变在文字上创建聚光灯或发光效果。渐变从中心点向外辐射，产生更自然、更有层次感的外观。',
    radialPositioned: '定位径向渐变',
    radialTip: '<strong>提示：</strong>径向渐变在较短的标题或单个词上效果最好。在长段落中，中心亮点会离边缘文字太远。',

    h2_conic: '4. 锥形渐变文字',
    conicDesc: '锥形渐变像色轮一样围绕中心点扫过颜色。应用于文字时，可以创建独特的全息或棱镜效果。',
    conicTip: '<strong>提示：</strong>锥形渐变在较大字体上效果最显著。在小字号下，颜色过渡可能显得混浊。',

    h2_animated: '5. 动画渐变文字（使用 @keyframes）',
    animatedDesc: '动画渐变文字可以吸引用户注意标题和行动号召元素。有两种主要方法：在超大渐变上动画 <code>background-position</code>，以及使用 <code>@property</code> 动画自定义属性。',
    animatedMethod1: '方法一：background-position 动画',
    animatedMethod1Desc: '此方法创建一个比元素大得多的渐变，然后随时间移动其位置。在所有现代浏览器中均有效：',
    animatedMethod2: '方法二：@property 动画（Chrome、Edge、Safari）',
    animatedMethod2Desc: '<code>@property</code> 方法可以平滑地动画各个色停点。动画质量更高，但需要浏览器支持 CSS <code>@property</code>：',
    animatedMethod3: '方法三：色相旋转滤镜',
    animatedMethod3Desc: '最简单的方法是使用 <code>hue-rotate</code> 滤镜循环切换颜色。定制性较低但全面兼容：',

    h2_rainbow: '6. 多色彩虹文字',
    rainbowDesc: '彩虹文字使用完整的色谱。以下是从简单到高级的几种方法：',
    rainbowBasic: '全色谱彩虹',
    rainbowNeon: '霓虹彩虹（高饱和鲜艳色彩）',
    rainbowAnimated: '动画彩虹',
    rainbowPerChar: '逐字符彩虹（纯 CSS + span）',
    rainbowPerCharDesc: '要实现逐字符颜色控制，将每个字母包裹在 <code>&lt;span&gt;</code> 中并使用 <code>animation-delay</code>：',

    h2_browser: '7. 浏览器支持与后备方案',
    browserDesc: '文字渐变技术在 2026 年拥有出色的浏览器支持，但有一些重要细节：',
    browserTable: '<table><thead><tr><th>特性</th><th>Chrome</th><th>Firefox</th><th>Safari</th><th>Edge</th></tr></thead><tbody><tr><td><code>-webkit-background-clip: text</code></td><td>支持 (v3+)</td><td>支持 (v49+)</td><td>支持 (v4+)</td><td>支持 (v15+)</td></tr><tr><td><code>background-clip: text</code>（无前缀）</td><td>支持 (v120+)</td><td>支持 (v49+)</td><td>支持 (v14+)</td><td>支持 (v120+)</td></tr><tr><td><code>conic-gradient</code></td><td>支持 (v69+)</td><td>支持 (v83+)</td><td>支持 (v12.1+)</td><td>支持 (v79+)</td></tr><tr><td><code>@property</code></td><td>支持 (v85+)</td><td>支持 (v128+)</td><td>支持 (v15.4+)</td><td>支持 (v85+)</td></tr></tbody></table>',
    browserFallback: '推荐后备方案模式',
    browserFallbackDesc: '始终确保旧浏览器能看到纯色文字：',
    browserSafety: '<strong>关键点：</strong><code>color</code> 声明提供后备方案。如果不支持 <code>background-clip: text</code>，则显示纯色。<code>@supports</code> 块仅在浏览器支持该特性时应用渐变。',

    h2_tailwind: '8. Tailwind CSS：bg-gradient-to-r、bg-clip-text',
    tailwindDesc: 'Tailwind CSS 提供了工具类，使实现渐变文字变得非常简单，无需编写自定义 CSS：',
    tailwindBasic: '基础 Tailwind 渐变文字',
    tailwindCustom: '使用 Tailwind 自定义颜色',
    tailwindAnimated: 'Tailwind 中的动画渐变文字（配合自定义 CSS）',
    tailwindAnimatedDesc: 'Tailwind 没有内置的渐变动画工具类，但可以将工具类与少量自定义动画结合使用：',
    tailwindV4: 'Tailwind v4 语法',
    tailwindV4Desc: '在 Tailwind v4 中，渐变工具类已更新：',

    h2_react: '9. React / Next.js：内联样式 vs CSS Modules',
    reactDesc: '在 React 和 Next.js 项目中，你有多种实现渐变文字的方式：',
    reactInline: '方法一：内联样式',
    reactInlineDesc: '内联样式可行，但需要使用 <code>WebkitBackgroundClip</code> 和 <code>WebkitTextFillColor</code> 驼峰命名属性：',
    reactModule: '方法二：CSS Modules',
    reactModuleDesc: 'CSS Modules 提供清晰的分离和完整的 CSS 特性支持：',
    reactComponent: '方法三：可复用 React 组件',
    reactComponentDesc: '创建一个灵活的可复用渐变文字组件：',
    reactNextjs: 'Next.js 提示',
    reactNextjsDesc: '在 Next.js App Router 中，CSS Modules 开箱即用。如果在 Server Component 中使用内联样式，渐变在服务端渲染，零客户端 JavaScript。对于动画渐变，需要 Client Component（<code>\'use client\'</code>）。',

    h2_examples: '10. 10 个精美渐变文字示例',
    examplesDesc: '以下是 10 个可直接复制粘贴到项目中的生产级渐变文字样式：',
    example1: '海洋蓝',
    example2: '日落橙',
    example3: '极光绿',
    example4: '皇家紫',
    example5: '火焰红',
    example6: '棉花糖粉',
    example7: '奢华金',
    example8: '霓虹赛博朋克',
    example9: '森林大地',
    example10: '全息银',

    h2_pitfalls: '11. 常见陷阱：选中颜色、无障碍性、打印',
    pitfallsDesc: '渐变文字效果虽好，但存在一些影响可用性的问题：',
    pitfall1Title: '文字选中颜色',
    pitfall1Desc: '当用户选中渐变文字时，选中高亮可能与渐变冲突或变得不可见。使用 <code>::selection</code> 修复：',
    pitfall2Title: '无障碍性与对比度',
    pitfall2Desc: '渐变文字可能无法通过 WCAG 对比度要求，因为对比度比值在文字中是变化的。某些字母可能有足够的对比度，而另一些则没有。建议：',
    pitfall2List: '<ul><li>确保渐变中的<strong>每种颜色</strong>都满足与背景的最小 4.5:1 对比度要求（大文字 3:1，即 24px+ 或粗体 18.66px+）。</li><li>分别测试渐变的两个端点和中间点。</li><li>避免在浅色背景上使用浅色渐变，或在深色背景上使用深色渐变。</li><li>考虑仅将渐变文字用于装饰性或非关键文字（如标题），而非正文。</li><li>使用纯色 <code>color</code> 后备作为无障碍替代方案。</li></ul>',
    pitfall3Title: '打印样式表',
    pitfall3Desc: '渐变文字无法打印。在打印样式中，文字会变得不可见，因为 <code>-webkit-text-fill-color: transparent</code> 仍然生效但渐变背景被移除。始终添加打印覆盖：',
    pitfall4Title: '复制粘贴行为',
    pitfall4Desc: '渐变文字可以正常复制到剪贴板，因为底层文字内容没有改变。但如果在渐变文字容器上使用了 <code>user-select: none</code>，用户将无法复制。除非文字纯粹是装饰性的，否则避免使用。',
    pitfall5Title: '长文本性能',
    pitfall5Desc: '将渐变背景应用于大段文字（整段或整页）可能造成轻微的渲染开销。为获得最佳性能，请将渐变文字效果限制在标题和短语上。',

    h2_faq: '12. 常见问题',
    faq1_q: '渐变文字在所有浏览器上都能工作吗？',
    faq1_a: '是的。<code>-webkit-background-clip: text</code> 技术在所有现代浏览器中均可使用，包括 Chrome、Firefox、Safari 和 Edge。仍然建议使用 <code>-webkit-</code> 前缀以获得最大兼容性。无前缀的 <code>background-clip: text</code> 从 Firefox 49、Chrome/Edge 120 开始支持。',
    faq2_q: 'CSS 渐变文字可以做动画吗？',
    faq2_a: '可以，有三种方法：(1) 使用 <code>@keyframes</code> 在超大渐变上动画 <code>background-position</code> —— 全平台兼容。(2) 使用 CSS <code>@property</code> 注册自定义属性并动画各个色停点 —— 更平滑但需要 Chrome 85+、Safari 15.4+ 或 Firefox 128+。(3) 应用 <code>filter: hue-rotate()</code> 动画实现简单的颜色循环效果。',
    faq3_q: '如何确保渐变文字的无障碍性？',
    faq3_a: '确保渐变中的每种颜色都满足 WCAG 2.1 最小对比度要求（普通文字 4.5:1，大文字 3:1）。测试渐变中最浅的颜色，而非只测最深的。提供纯色 <code>color</code> 后备方案。将渐变文字限制在标题和装饰元素上，而非正文。使用 <code>::selection</code> 样式确保可读的文字选中效果。',
    faq4_q: '为什么打印页面时渐变文字消失了？',
    faq4_a: '浏览器在打印时会移除背景图片（包括渐变）。由于渐变文字依赖 <code>background-clip: text</code> 和透明文字颜色，文字在打印时会消失。添加 <code>@media print</code> 规则，将 <code>-webkit-text-fill-color</code> 重置为纯色并移除背景。',
    faq5_q: 'Tailwind CSS 可以实现渐变文字吗？',
    faq5_a: '可以。Tailwind 提供了渐变文字工具类：在任何文本元素上应用 <code>bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent</code>。在 Tailwind v4 中，语法改为 <code>bg-linear-to-r</code>。对于动画渐变，在 Tailwind 配置中添加自定义关键帧动画。',

    conclusion: 'CSS 文字渐变是为网页设计增添视觉冲击力的强大且高性能的方式。以三属性技术为基础，你可以创建从细腻的品牌色标题到动画彩虹效果的一切。请记住始终包含后备方案、测试无障碍性，并将渐变效果限制在简短且有影响力的文字上。',
  },
};

export default function CssTextGradient({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* Section 1: Basic Technique */}
      <h2>{t.h2_basic}</h2>
      <p>{t.basicDesc}</p>
      <p>{t.basicExplain}</p>
      <pre><code>{`.gradient-text {
  /* Fallback solid color for unsupported browsers */
  color: #3b82f6;

  /* Step 1: Apply a gradient as the background */
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);

  /* Step 2: Clip the background to the text shape */
  -webkit-background-clip: text;
  background-clip: text;

  /* Step 3: Make the text transparent to reveal the gradient */
  -webkit-text-fill-color: transparent;
}

/* HTML usage */
<h1 class="gradient-text">Hello Gradient World</h1>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.basicHow }} />
      <p dangerouslySetInnerHTML={{ __html: t.basicFallback }} />

      {/* Section 2: Linear Gradient Text */}
      <h2>{t.h2_linear}</h2>
      <p>{t.linearDesc}</p>

      <h3>{t.linearHorizontal}</h3>
      <pre><code>{`.gradient-horizontal {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  /* equivalent: linear-gradient(90deg, #3b82f6, #8b5cf6) */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>{t.linearVertical}</h3>
      <pre><code>{`.gradient-vertical {
  background: linear-gradient(to bottom, #f59e0b, #ef4444);
  /* equivalent: linear-gradient(180deg, #f59e0b, #ef4444) */
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>{t.linearDiagonal}</h3>
      <pre><code>{`.gradient-diagonal {
  background: linear-gradient(45deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>{t.linearCustomAngle}</h3>
      <pre><code>{`.gradient-custom {
  background: linear-gradient(
    120deg,
    #ff6b6b 0%,
    #feca57 25%,
    #48dbfb 50%,
    #ff9ff3 75%,
    #54a0ff 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.linearTip }} />

      {/* Section 3: Radial Gradient Text */}
      <h2>{t.h2_radial}</h2>
      <p>{t.radialDesc}</p>
      <pre><code>{`/* Basic radial gradient text */
.gradient-radial {
  background: radial-gradient(circle, #f59e0b, #ef4444, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Spotlight glow effect */
.gradient-spotlight {
  background: radial-gradient(
    ellipse at 50% 50%,
    #fbbf24 0%,
    #f59e0b 30%,
    #b45309 70%,
    #78350f 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>{t.radialPositioned}</h3>
      <pre><code>{`/* Radial gradient positioned at top-left */
.gradient-radial-tl {
  background: radial-gradient(
    circle at top left,
    #22d3ee, #6366f1, #a855f7
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Radial gradient positioned at custom coordinates */
.gradient-radial-custom {
  background: radial-gradient(
    circle at 30% 40%,
    #34d399, #059669, #064e3b
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.radialTip }} />

      {/* Section 4: Conic Gradient Text */}
      <h2>{t.h2_conic}</h2>
      <p>{t.conicDesc}</p>
      <pre><code>{`/* Basic conic gradient text */
.gradient-conic {
  background: conic-gradient(
    from 0deg,
    #ef4444, #f59e0b, #22c55e, #3b82f6, #8b5cf6, #ef4444
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Conic gradient with starting angle and position */
.gradient-conic-offset {
  background: conic-gradient(
    from 45deg at 50% 50%,
    #06b6d4, #8b5cf6, #ec4899, #06b6d4
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Metallic / holographic effect */
.gradient-holographic {
  background: conic-gradient(
    from 0deg,
    #c0c0c0, #f0f0f0, #a0a0a0, #d0d0d0,
    #e0e0e0, #b0b0b0, #f0f0f0, #c0c0c0
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.conicTip }} />

      {/* Section 5: Animated Gradient Text */}
      <h2>{t.h2_animated}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.animatedDesc }} />

      <h3>{t.animatedMethod1}</h3>
      <p>{t.animatedMethod1Desc}</p>
      <pre><code>{`.animated-gradient-text {
  background: linear-gradient(
    270deg,
    #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #ff6b6b
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`}</code></pre>

      <h3>{t.animatedMethod2}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.animatedMethod2Desc }} />
      <pre><code>{`@property --color-1 {
  syntax: '<color>';
  initial-value: #3b82f6;
  inherits: false;
}

@property --color-2 {
  syntax: '<color>';
  initial-value: #8b5cf6;
  inherits: false;
}

@property --color-3 {
  syntax: '<color>';
  initial-value: #ec4899;
  inherits: false;
}

.animated-property-text {
  background: linear-gradient(135deg, var(--color-1), var(--color-2), var(--color-3));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: color-cycle 3s ease-in-out infinite;
}

@keyframes color-cycle {
  0%   { --color-1: #3b82f6; --color-2: #8b5cf6; --color-3: #ec4899; }
  33%  { --color-1: #ec4899; --color-2: #3b82f6; --color-3: #8b5cf6; }
  66%  { --color-1: #8b5cf6; --color-2: #ec4899; --color-3: #3b82f6; }
  100% { --color-1: #3b82f6; --color-2: #8b5cf6; --color-3: #ec4899; }
}`}</code></pre>

      <h3>{t.animatedMethod3}</h3>
      <p>{t.animatedMethod3Desc}</p>
      <pre><code>{`.hue-rotate-text {
  background: linear-gradient(90deg, #3b82f6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue-shift 3s linear infinite;
}

@keyframes hue-shift {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}`}</code></pre>

      {/* Section 6: Rainbow Text */}
      <h2>{t.h2_rainbow}</h2>
      <p>{t.rainbowDesc}</p>

      <h3>{t.rainbowBasic}</h3>
      <pre><code>{`.rainbow-text {
  background: linear-gradient(
    90deg,
    #ff0000, #ff8000, #ffff00, #00ff00,
    #00ffff, #0000ff, #8000ff, #ff0080
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>{t.rainbowNeon}</h3>
      <pre><code>{`.neon-rainbow {
  background: linear-gradient(
    90deg,
    #ff1744, #ff9100, #ffea00, #00e676,
    #00e5ff, #2979ff, #d500f9, #ff1744
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  text-shadow: none; /* text-shadow does not work with gradient text */
}`}</code></pre>

      <h3>{t.rainbowAnimated}</h3>
      <pre><code>{`.animated-rainbow {
  background: linear-gradient(
    90deg,
    #ff0000, #ff8000, #ffff00, #00ff00,
    #00ffff, #0000ff, #8000ff, #ff0080, #ff0000
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-move 3s linear infinite;
}

@keyframes rainbow-move {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}`}</code></pre>

      <h3>{t.rainbowPerChar}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.rainbowPerCharDesc }} />
      <pre><code>{`/* HTML: <span class="char" style="--i:0">R</span>
         <span class="char" style="--i:1">A</span>
         <span class="char" style="--i:2">I</span> ... */

.char {
  display: inline-block;
  animation: char-rainbow 2s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes char-rainbow {
  0%, 100% { color: #ff0000; }
  14%  { color: #ff8000; }
  28%  { color: #ffff00; }
  42%  { color: #00ff00; }
  57%  { color: #00ffff; }
  71%  { color: #0000ff; }
  85%  { color: #8000ff; }
}`}</code></pre>

      {/* Section 7: Browser Support */}
      <h2>{t.h2_browser}</h2>
      <p>{t.browserDesc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.browserTable }} />

      <h3>{t.browserFallback}</h3>
      <p>{t.browserFallbackDesc}</p>
      <pre><code>{`/* Fallback-first approach */
.gradient-text {
  /* 1. Solid color fallback */
  color: #3b82f6;
}

/* 2. Apply gradient only if supported */
@supports (-webkit-background-clip: text) or (background-clip: text) {
  .gradient-text {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.browserSafety }} />

      {/* Section 8: Tailwind CSS */}
      <h2>{t.h2_tailwind}</h2>
      <p>{t.tailwindDesc}</p>

      <h3>{t.tailwindBasic}</h3>
      <pre><code>{`<!-- Tailwind v3 gradient text -->
<h1 class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
           bg-clip-text text-transparent text-5xl font-bold">
  Gradient Heading
</h1>

<!-- Breakdown of classes: -->
<!-- bg-gradient-to-r  → background: linear-gradient(to right, ...) -->
<!-- from-blue-500     → starting color: #3b82f6 -->
<!-- via-purple-500    → middle color: #a855f7 -->
<!-- to-pink-500       → ending color: #ec4899 -->
<!-- bg-clip-text      → background-clip: text -->
<!-- text-transparent  → color: transparent -->`}</code></pre>

      <h3>{t.tailwindCustom}</h3>
      <pre><code>{`<!-- Using arbitrary values for custom gradient colors -->
<h1 class="bg-gradient-to-r from-[#667eea] to-[#764ba2]
           bg-clip-text text-transparent text-4xl font-bold">
  Custom Gradient
</h1>

<!-- Diagonal gradient with arbitrary angle -->
<h1 class="bg-[linear-gradient(135deg,#f093fb,#f5576c)]
           bg-clip-text text-transparent text-4xl font-bold">
  Diagonal Custom
</h1>`}</code></pre>

      <h3>{t.tailwindAnimated}</h3>
      <p>{t.tailwindAnimatedDesc}</p>
      <pre><code>{`<!-- tailwind.config.js -->
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
}

<!-- HTML with animation class -->
<h1 class="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500
           bg-[length:200%_100%] bg-clip-text text-transparent
           animate-gradient-x text-5xl font-bold">
  Animated Gradient
</h1>`}</code></pre>

      <h3>{t.tailwindV4}</h3>
      <p>{t.tailwindV4Desc}</p>
      <pre><code>{`<!-- Tailwind v4 uses bg-linear-* instead of bg-gradient-* -->
<h1 class="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500
           bg-clip-text text-transparent text-5xl font-bold">
  Tailwind v4 Gradient
</h1>

<!-- Tailwind v4 also supports arbitrary gradient directions -->
<h1 class="bg-linear-[135deg] from-cyan-400 to-blue-600
           bg-clip-text text-transparent text-5xl font-bold">
  135 Degree Gradient
</h1>`}</code></pre>

      {/* Section 9: React / Next.js */}
      <h2>{t.h2_react}</h2>
      <p>{t.reactDesc}</p>

      <h3>{t.reactInline}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.reactInlineDesc }} />
      <pre><code>{`// React component with inline styles
function GradientHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent', // fallback
        fontSize: '3rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </h1>
  );
}

// Usage
<GradientHeading>Hello Gradient</GradientHeading>`}</code></pre>

      <h3>{t.reactModule}</h3>
      <p>{t.reactModuleDesc}</p>
      <pre><code>{`/* GradientText.module.css */
.gradientText {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #3b82f6; /* fallback */
}

.gradientText.animated {
  background-size: 300% 100%;
  animation: shift 4s ease infinite;
}

@keyframes shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`}</code></pre>
      <pre><code>{`// GradientText.tsx
import styles from './GradientText.module.css';

interface Props {
  children: React.ReactNode;
  animated?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export function GradientText({ children, animated, as: Tag = 'h1' }: Props) {
  const className = [
    styles.gradientText,
    animated && styles.animated,
  ].filter(Boolean).join(' ');

  return <Tag className={className}>{children}</Tag>;
}

// Usage
<GradientText animated as="h1">Animated Heading</GradientText>`}</code></pre>

      <h3>{t.reactComponent}</h3>
      <p>{t.reactComponentDesc}</p>
      <pre><code>{`// Flexible reusable component
interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  via?: string;
  to?: string;
  direction?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function GradientText({
  children,
  from = '#3b82f6',
  via,
  to = '#ec4899',
  direction = '135deg',
  as: Tag = 'span',
  className = '',
}: GradientTextProps) {
  const colors = via ? \`\${from}, \${via}, \${to}\` : \`\${from}, \${to}\`;
  const gradient = \`linear-gradient(\${direction}, \${colors})\`;

  return (
    <Tag
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: from, // fallback
      }}
    >
      {children}
    </Tag>
  );
}

// Usage examples
<GradientText as="h1" from="#f59e0b" to="#ef4444">
  Sunset Title
</GradientText>

<GradientText as="h2" from="#06b6d4" via="#8b5cf6" to="#ec4899" direction="90deg">
  Three-Color Heading
</GradientText>`}</code></pre>

      <h3>{t.reactNextjs}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.reactNextjsDesc }} />

      {/* Section 10: 10 Beautiful Examples */}
      <h2>{t.h2_examples}</h2>
      <p>{t.examplesDesc}</p>

      <h3>1. {t.example1}</h3>
      <pre><code>{`.ocean-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>2. {t.example2}</h3>
      <pre><code>{`.sunset-orange {
  background: linear-gradient(to right, #f12711, #f5af19);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>3. {t.example3}</h3>
      <pre><code>{`.aurora-green {
  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>4. {t.example4}</h3>
      <pre><code>{`.royal-purple {
  background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>5. {t.example5}</h3>
      <pre><code>{`.fire-red {
  background: linear-gradient(to right, #f83600 0%, #f9d423 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>6. {t.example6}</h3>
      <pre><code>{`.cotton-candy {
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>7. {t.example7}</h3>
      <pre><code>{`.gold-luxury {
  background: linear-gradient(
    135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>8. {t.example8}</h3>
      <pre><code>{`.neon-cyberpunk {
  background: linear-gradient(
    90deg, #f72585, #b5179e, #7209b7, #560bad, #480ca8, #3a0ca3, #3f37c9, #4361ee, #4895ef, #4cc9f0
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>9. {t.example9}</h3>
      <pre><code>{`.forest-earth {
  background: linear-gradient(to right, #134e5e, #71b280);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}`}</code></pre>

      <h3>10. {t.example10}</h3>
      <pre><code>{`.holographic-silver {
  background: linear-gradient(
    135deg,
    #d4d4d8 0%, #a1a1aa 15%, #e4e4e7 30%,
    #71717a 45%, #f4f4f5 60%, #a1a1aa 75%,
    #d4d4d8 90%, #e4e4e7 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: holographic 5s ease infinite;
}

@keyframes holographic {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`}</code></pre>

      {/* Section 11: Common Pitfalls */}
      <h2>{t.h2_pitfalls}</h2>
      <p>{t.pitfallsDesc}</p>

      <h3>{t.pitfall1Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pitfall1Desc }} />
      <pre><code>{`/* Fix text selection color for gradient text */
.gradient-text::selection {
  -webkit-text-fill-color: #ffffff;
  background: #3b82f6;
}

.gradient-text::-moz-selection {
  color: #ffffff;
  background: #3b82f6;
}`}</code></pre>

      <h3>{t.pitfall2Title}</h3>
      <p>{t.pitfall2Desc}</p>
      <div dangerouslySetInnerHTML={{ __html: t.pitfall2List }} />

      <h3>{t.pitfall3Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pitfall3Desc }} />
      <pre><code>{`/* Print stylesheet override */
@media print {
  .gradient-text {
    background: none !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
    -webkit-text-fill-color: #1a1a2e !important;
    color: #1a1a2e !important;
  }
}`}</code></pre>

      <h3>{t.pitfall4Title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pitfall4Desc }} />

      <h3>{t.pitfall5Title}</h3>
      <p>{t.pitfall5Desc}</p>

      {/* Section 12: FAQ */}
      <h2>{t.h2_faq}</h2>
      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />
      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />
      <h3>{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />
      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />
      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      <p style={{ marginTop: 32 }}>{t.conclusion}</p>
    </>
  );
}
