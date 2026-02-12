'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'The SVG <code>viewBox</code> attribute is one of the most powerful — and most misunderstood — features of SVG. It controls the internal coordinate system, enables responsive scaling, and determines how your graphics zoom, pan, and fit within their container. This guide explains <strong>everything you need to know</strong> about viewBox, width, height, and responsive SVG patterns.',
    h2_1: '1. viewBox Syntax: min-x min-y width height',
    p1_1: 'The <code>viewBox</code> attribute takes four numbers separated by spaces or commas: <code>viewBox="min-x min-y width height"</code>. These define the rectangle of the SVG coordinate system that should be visible.',
    p1_2: '<strong>min-x, min-y</strong>: The top-left corner of the visible area in SVG coordinates. Usually <code>0 0</code>, but changing these values lets you pan the view.',
    p1_3: '<strong>width, height</strong>: The size of the visible area in SVG coordinates. This does NOT set the pixel size of the SVG element — it defines how many coordinate units are visible.',
    p1_4: 'Think of viewBox as a camera looking at your SVG canvas. The four values define where the camera is pointed and how wide its field of view is.',
    h2_2: '2. viewBox vs width/height: The Coordinate System',
    p2_1: 'There are two separate sizing concepts in SVG that are often confused:',
    p2_2: '<strong>width and height attributes</strong>: Set the actual rendered size of the SVG element in the page (in pixels, ems, percentages, etc.). These are like the size of the TV screen.',
    p2_3: '<strong>viewBox</strong>: Defines the internal coordinate system — the "world" that the SVG content lives in. This is like the scene being filmed by the camera.',
    p2_4: 'When both are set, the browser maps the viewBox coordinates onto the width/height area. If the aspect ratios differ, <code>preserveAspectRatio</code> controls how the content is fitted.',
    p2_5: 'When only viewBox is set (no width/height), the SVG becomes responsive and fills its container while maintaining aspect ratio.',
    h2_3: '3. Visual Examples: Zooming In/Out, Panning',
    p3_1: '<strong>Default view</strong> — The viewBox matches the content area. All elements are visible at their natural size.',
    p3_2: '<strong>Zooming in</strong> — A smaller viewBox crops the view, making elements appear larger. Reducing viewBox width/height "zooms in" because fewer coordinate units fill the same screen space.',
    p3_3: '<strong>Zooming out</strong> — A larger viewBox shows more of the coordinate space, making elements appear smaller.',
    p3_4: '<strong>Panning</strong> — Changing min-x and min-y shifts which part of the coordinate space is visible, like sliding a camera.',
    h2_4: '4. preserveAspectRatio: meet vs slice, xMidYMid',
    p4_1: 'When the viewBox aspect ratio does not match the SVG element\'s aspect ratio, <code>preserveAspectRatio</code> controls how the content is fitted. The syntax is: <code>preserveAspectRatio="&lt;align&gt; &lt;meetOrSlice&gt;"</code>.',
    p4_2: '<strong>Alignment values</strong> control where the viewBox is positioned within the viewport. The format is <code>xMinYMin</code>, <code>xMidYMid</code>, <code>xMaxYMax</code>, etc. — combining horizontal (xMin, xMid, xMax) and vertical (YMin, YMid, YMax) alignment.',
    p4_3: '<strong>meet</strong> (default): Scale the viewBox to fit entirely inside the viewport. Similar to CSS <code>background-size: contain</code>. The entire content is visible, but there may be empty space.',
    p4_4: '<strong>slice</strong>: Scale the viewBox to cover the entire viewport. Similar to CSS <code>background-size: cover</code>. The viewport is completely filled, but some content may be cropped.',
    p4_5: '<strong>none</strong>: No uniform scaling. The viewBox stretches to fill the viewport exactly. Content may appear distorted.',
    p4_table_value: 'Value',
    p4_table_behavior: 'Behavior',
    p4_table_css: 'CSS Equivalent',
    h2_5: '5. Making SVGs Responsive: viewBox Without width/height',
    p5_1: 'The simplest way to create a responsive SVG is to set a <code>viewBox</code> but omit fixed <code>width</code> and <code>height</code> attributes. The SVG will then scale to fill its container while maintaining aspect ratio.',
    p5_2: 'To control the rendered size, use CSS on the SVG element or its wrapper. This gives you full responsive control.',
    p5_3: '<strong>Key principle</strong>: An SVG with only a viewBox and no width/height behaves like an image with an intrinsic aspect ratio. It expands to fill available width and calculates height automatically.',
    p5_4: 'If you need a specific aspect ratio container, use the CSS aspect-ratio property or the padding-bottom trick on a wrapper element.',
    h2_6: '6. Common Patterns: Icon Sizing, Full-Width Banners, Aspect Ratio Boxes',
    p6_1: '<strong>Icon sizing</strong>: For icons, set explicit width and height (e.g., 24x24) and a matching viewBox. This ensures crisp rendering at the intended size.',
    p6_2: '<strong>Full-width banners</strong>: Use viewBox without width/height, and set <code>width: 100%</code> in CSS. The SVG stretches to fill the container width, and height adjusts automatically based on the viewBox aspect ratio.',
    p6_3: '<strong>Aspect ratio boxes</strong>: Use <code>preserveAspectRatio="none"</code> combined with CSS width/height to stretch an SVG to any dimensions. Useful for decorative backgrounds and dividers.',
    p6_4: '<strong>Responsive icons</strong>: Set viewBox on the SVG, omit width/height, and use CSS to control size. The icon scales without losing quality at any size.',
    h2_7: '7. React/JSX: viewBox in Components, Dynamic Sizing',
    p7_1: 'In React/JSX, the <code>viewBox</code> attribute works the same as in HTML. The main difference is that JSX uses camelCase for most SVG attributes, but <strong>viewBox stays as viewBox</strong> (it is already camelCase).',
    p7_2: 'A well-structured React SVG icon component should forward viewBox and sizing props:',
    p7_3: 'For dynamic viewBox values, you can compute them from props or state:',
    p7_4: '<strong>Common JSX mistake</strong>: Writing <code>viewbox</code> (all lowercase) instead of <code>viewBox</code>. React and the browser require the capital B.',
    h2_8: '8. CSS Control: width, height, max-width on SVG',
    p8_1: 'CSS properties applied to SVG elements interact with viewBox in specific ways:',
    p8_2: '<strong>width/height in CSS</strong> override the SVG width/height attributes. If the SVG has a viewBox, the content scales to fit the CSS-defined dimensions.',
    p8_3: '<strong>max-width: 100%</strong> prevents SVGs from overflowing their container. Essential for responsive designs. Add <code>height: auto</code> to maintain aspect ratio.',
    p8_4: '<strong>display: block</strong> removes the extra whitespace below inline SVGs (SVGs are inline by default, which creates a small gap below them due to line-height).',
    p8_5: 'The recommended responsive SVG CSS pattern:',
    h2_9: '9. Debugging: Chrome DevTools SVG Inspector',
    p9_1: 'When SVGs render incorrectly, Chrome DevTools offers several inspection techniques:',
    p9_2: '<strong>Elements panel</strong>: Inspect the SVG element to see its computed width, height, and viewBox. Check for missing or incorrect attributes.',
    p9_3: '<strong>Computed styles</strong>: Look at the "Computed" tab to see final CSS dimensions. The SVG\'s rendered size may differ from its attributes due to CSS overrides.',
    p9_4: '<strong>Box model</strong>: The box model diagram shows the SVG\'s actual layout size, including padding and borders. Compare this to the viewBox dimensions.',
    p9_5: '<strong>Console testing</strong>: Use <code>document.querySelector("svg").getBBox()</code> to get the bounding box of all SVG content. This tells you the actual coordinate range used by your paths and shapes. Use <code>getBoundingClientRect()</code> to get the rendered pixel dimensions.',
    p9_6: '<strong>Outline trick</strong>: Add <code>outline: 1px solid red</code> to the SVG element to see its exact rendered boundaries. This helps identify viewBox/sizing mismatches.',
    h2_10: '10. Common Mistakes: Missing viewBox, Wrong Aspect Ratio, Blurry SVGs',
    p10_1: '<strong>Missing viewBox</strong>: Without a viewBox, an SVG with width="100" height="100" is fixed at 100x100 pixels. It cannot scale. Always include viewBox for scalability.',
    p10_2: '<strong>Wrong aspect ratio</strong>: If your viewBox is 0 0 100 50 (2:1) but the SVG element is 200x200 (1:1), the content will be letterboxed or cropped depending on preserveAspectRatio. Match aspect ratios or use preserveAspectRatio intentionally.',
    p10_3: '<strong>Blurry SVGs</strong>: SVGs should never be blurry since they are vector-based. If your SVG looks blurry, check for: (1) SVG being rasterized via <code>&lt;img&gt;</code> at a very small size, (2) CSS <code>image-rendering</code> set incorrectly, (3) Sub-pixel positioning — paths at fractional coordinates look fuzzy. Snap paths to whole pixels in your viewBox.',
    p10_4: '<strong>viewBox="0 0 0 0"</strong>: A zero-dimension viewBox makes the SVG invisible. Always use positive width and height values.',
    p10_5: '<strong>Redundant xmlns</strong>: When using inline SVG in HTML5, the <code>xmlns</code> attribute is optional. It is only required when the SVG is in a standalone .svg file.',
    p10_6: '<strong>Using px units in viewBox</strong>: viewBox values are unitless coordinate numbers, not pixels. Writing <code>viewBox="0 0 100px 100px"</code> is invalid.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What happens if I set viewBox but no width or height?',
    faq1_a: 'The SVG becomes responsive and expands to fill its container width while maintaining the aspect ratio defined by the viewBox. This is the recommended approach for responsive SVGs. You can then control the size with CSS.',
    faq2_q: 'Can I animate the viewBox attribute?',
    faq2_a: 'Yes, you can animate viewBox using JavaScript (e.g., requestAnimationFrame) or SMIL animations. This creates smooth zoom and pan effects. In React, you can drive viewBox changes through state. CSS cannot animate viewBox directly, but JavaScript-driven transitions work well.',
    faq3_q: 'What is the difference between viewBox and viewport?',
    faq3_a: 'The viewport is the visible area of the SVG element on the page, defined by its width and height (from attributes or CSS). The viewBox defines the coordinate system mapped onto that viewport. Think of the viewport as the TV screen size and viewBox as the camera\'s field of view.',
    faq4_q: 'Why does my SVG have extra whitespace around it?',
    faq4_a: 'This usually happens because (1) the viewBox is larger than the actual content — use <code>getBBox()</code> in DevTools to find the tight bounding box, or (2) the SVG is an inline element, which adds line-height space below it — fix with <code>display: block</code>, or (3) preserveAspectRatio is adding letterbox space — check aspect ratio matching.',
    faq5_q: 'How do I make an SVG fill its container and ignore aspect ratio?',
    faq5_a: 'Set <code>preserveAspectRatio="none"</code> on the SVG element. This stretches the viewBox content to fill the viewport exactly, without maintaining aspect ratio. Set width and height to 100% via CSS. This is useful for decorative backgrounds and shape dividers.',
  },
  zh: {
    intro: 'SVG 的 <code>viewBox</code> 属性是 SVG 中最强大、也最容易被误解的特性之一。它控制内部坐标系统，实现响应式缩放，并决定图形如何在容器中缩放、平移和适配。本指南将详细解释 <strong>viewBox、width、height 以及响应式 SVG 模式</strong>的一切。',
    h2_1: '1. viewBox 语法：min-x min-y width height',
    p1_1: '<code>viewBox</code> 属性接受四个数字，用空格或逗号分隔：<code>viewBox="min-x min-y width height"</code>。它们定义了 SVG 坐标系统中可见的矩形区域。',
    p1_2: '<strong>min-x, min-y</strong>：可见区域在 SVG 坐标中的左上角。通常为 <code>0 0</code>，改变这些值可以平移视图。',
    p1_3: '<strong>width, height</strong>：可见区域在 SVG 坐标中的大小。这不是设置 SVG 元素的像素大小，而是定义有多少坐标单位可见。',
    p1_4: '可以把 viewBox 想象成一个对准 SVG 画布的摄像头。四个值定义了摄像头的指向位置和视野宽度。',
    h2_2: '2. viewBox 与 width/height：坐标系统',
    p2_1: 'SVG 中有两个经常被混淆的尺寸概念：',
    p2_2: '<strong>width 和 height 属性</strong>：设置 SVG 元素在页面中实际渲染的大小（像素、em、百分比等）。就像电视屏幕的尺寸。',
    p2_3: '<strong>viewBox</strong>：定义内部坐标系统 — SVG 内容所在的"世界"。就像摄像头拍摄的场景。',
    p2_4: '当两者都设置时，浏览器将 viewBox 坐标映射到 width/height 区域。如果宽高比不同，<code>preserveAspectRatio</code> 控制内容的适配方式。',
    p2_5: '当只设置 viewBox 而没有 width/height 时，SVG 变为响应式，填充其容器并保持宽高比。',
    h2_3: '3. 视觉示例：缩放与平移',
    p3_1: '<strong>默认视图</strong> — viewBox 与内容区域匹配。所有元素以自然大小可见。',
    p3_2: '<strong>放大</strong> — 较小的 viewBox 裁剪视图，使元素看起来更大。减小 viewBox 的宽高就是"放大"，因为更少的坐标单位填充相同的屏幕空间。',
    p3_3: '<strong>缩小</strong> — 较大的 viewBox 显示更多的坐标空间，使元素看起来更小。',
    p3_4: '<strong>平移</strong> — 改变 min-x 和 min-y 可以移动可见的坐标空间部分，就像滑动摄像头。',
    h2_4: '4. preserveAspectRatio：meet 与 slice，xMidYMid',
    p4_1: '当 viewBox 宽高比与 SVG 元素的宽高比不匹配时，<code>preserveAspectRatio</code> 控制内容的适配方式。语法为：<code>preserveAspectRatio="&lt;align&gt; &lt;meetOrSlice&gt;"</code>。',
    p4_2: '<strong>对齐值</strong>控制 viewBox 在视口中的位置。格式为 <code>xMinYMin</code>、<code>xMidYMid</code>、<code>xMaxYMax</code> 等，组合水平（xMin, xMid, xMax）和垂直（YMin, YMid, YMax）对齐。',
    p4_3: '<strong>meet</strong>（默认）：缩放 viewBox 使其完全适合视口内。类似 CSS 的 <code>background-size: contain</code>。所有内容可见，但可能有空白区域。',
    p4_4: '<strong>slice</strong>：缩放 viewBox 使其覆盖整个视口。类似 CSS 的 <code>background-size: cover</code>。视口完全被填充，但部分内容可能被裁剪。',
    p4_5: '<strong>none</strong>：不进行等比缩放。viewBox 拉伸以精确填充视口。内容可能出现变形。',
    p4_table_value: '值',
    p4_table_behavior: '行为',
    p4_table_css: 'CSS 等效',
    h2_5: '5. 让 SVG 响应式：viewBox 不设 width/height',
    p5_1: '创建响应式 SVG 最简单的方法是设置 <code>viewBox</code> 但不设置固定的 <code>width</code> 和 <code>height</code> 属性。SVG 会自动缩放以填充容器，同时保持宽高比。',
    p5_2: '使用 CSS 控制 SVG 元素或其包装元素的渲染大小，即可实现完全的响应式控制。',
    p5_3: '<strong>关键原则</strong>：只有 viewBox 而没有 width/height 的 SVG 就像一个具有固有宽高比的图片。它会扩展以填充可用宽度，并自动计算高度。',
    p5_4: '如果需要特定的宽高比容器，可以使用 CSS 的 aspect-ratio 属性或在包装元素上使用 padding-bottom 技巧。',
    h2_6: '6. 常见模式：图标尺寸、全宽横幅、宽高比盒子',
    p6_1: '<strong>图标尺寸</strong>：对于图标，设置明确的 width 和 height（如 24x24）以及匹配的 viewBox。这确保在预期尺寸下清晰渲染。',
    p6_2: '<strong>全宽横幅</strong>：使用不带 width/height 的 viewBox，在 CSS 中设置 <code>width: 100%</code>。SVG 会拉伸以填充容器宽度，高度根据 viewBox 宽高比自动调整。',
    p6_3: '<strong>宽高比盒子</strong>：结合 <code>preserveAspectRatio="none"</code> 和 CSS width/height 可以将 SVG 拉伸到任意尺寸。适用于装饰性背景和分隔线。',
    p6_4: '<strong>响应式图标</strong>：在 SVG 上设置 viewBox，不设 width/height，用 CSS 控制大小。图标在任何尺寸下都能无损缩放。',
    h2_7: '7. React/JSX：组件中的 viewBox 与动态尺寸',
    p7_1: '在 React/JSX 中，<code>viewBox</code> 属性的用法与 HTML 中相同。主要区别是 JSX 对大多数 SVG 属性使用驼峰命名，但 <strong>viewBox 保持为 viewBox</strong>（它本身就是驼峰命名）。',
    p7_2: '一个结构良好的 React SVG 图标组件应该转发 viewBox 和尺寸属性：',
    p7_3: '对于动态 viewBox 值，可以通过 props 或 state 计算：',
    p7_4: '<strong>常见 JSX 错误</strong>：写成 <code>viewbox</code>（全小写）而不是 <code>viewBox</code>。React 和浏览器要求大写的 B。',
    h2_8: '8. CSS 控制：SVG 上的 width、height、max-width',
    p8_1: '应用于 SVG 元素的 CSS 属性与 viewBox 有特定的交互方式：',
    p8_2: '<strong>CSS 中的 width/height</strong> 会覆盖 SVG 的 width/height 属性。如果 SVG 有 viewBox，内容会缩放以适应 CSS 定义的尺寸。',
    p8_3: '<strong>max-width: 100%</strong> 防止 SVG 溢出容器。对于响应式设计必不可少。添加 <code>height: auto</code> 以保持宽高比。',
    p8_4: '<strong>display: block</strong> 移除内联 SVG 下方的额外空白（SVG 默认为内联元素，由于行高会在下方产生小间隙）。',
    p8_5: '推荐的响应式 SVG CSS 模式：',
    h2_9: '9. 调试：Chrome DevTools SVG 检查器',
    p9_1: '当 SVG 渲染不正确时，Chrome DevTools 提供了几种检查技术：',
    p9_2: '<strong>Elements 面板</strong>：检查 SVG 元素以查看其计算的 width、height 和 viewBox。检查是否有缺失或不正确的属性。',
    p9_3: '<strong>Computed 样式</strong>：查看 "Computed" 选项卡以了解最终的 CSS 尺寸。由于 CSS 覆盖，SVG 的渲染大小可能与其属性不同。',
    p9_4: '<strong>盒模型</strong>：盒模型图表显示 SVG 的实际布局大小，包括内边距和边框。将其与 viewBox 尺寸进行比较。',
    p9_5: '<strong>控制台测试</strong>：使用 <code>document.querySelector("svg").getBBox()</code> 获取所有 SVG 内容的边界框。这能告诉你路径和形状使用的实际坐标范围。使用 <code>getBoundingClientRect()</code> 获取渲染的像素尺寸。',
    p9_6: '<strong>轮廓技巧</strong>：为 SVG 元素添加 <code>outline: 1px solid red</code> 以查看其精确的渲染边界。这有助于识别 viewBox/尺寸不匹配问题。',
    h2_10: '10. 常见错误：缺少 viewBox、宽高比错误、SVG 模糊',
    p10_1: '<strong>缺少 viewBox</strong>：没有 viewBox 时，设置了 width="100" height="100" 的 SVG 固定为 100x100 像素，无法缩放。始终包含 viewBox 以确保可缩放性。',
    p10_2: '<strong>宽高比错误</strong>：如果 viewBox 是 0 0 100 50（2:1）但 SVG 元素是 200x200（1:1），内容会根据 preserveAspectRatio 被加黑边或裁剪。匹配宽高比或有意使用 preserveAspectRatio。',
    p10_3: '<strong>SVG 模糊</strong>：SVG 本不应该模糊，因为它是矢量的。如果你的 SVG 看起来模糊，检查：(1) SVG 通过 <code>&lt;img&gt;</code> 以很小的尺寸被栅格化，(2) CSS <code>image-rendering</code> 设置不正确，(3) 亚像素定位 — 路径在分数坐标处看起来模糊。在 viewBox 中将路径对齐到整像素。',
    p10_4: '<strong>viewBox="0 0 0 0"</strong>：零维 viewBox 使 SVG 不可见。始终使用正的宽度和高度值。',
    p10_5: '<strong>多余的 xmlns</strong>：在 HTML5 中使用内联 SVG 时，<code>xmlns</code> 属性是可选的。只有在独立的 .svg 文件中才需要。',
    p10_6: '<strong>在 viewBox 中使用 px 单位</strong>：viewBox 的值是无单位的坐标数字，不是像素。写 <code>viewBox="0 0 100px 100px"</code> 是无效的。',
    h2_faq: '常见问题',
    faq1_q: '如果设置了 viewBox 但没有 width 和 height 会怎样？',
    faq1_a: 'SVG 变为响应式，扩展以填充容器宽度，同时保持 viewBox 定义的宽高比。这是响应式 SVG 的推荐方法。然后可以用 CSS 控制大小。',
    faq2_q: '可以为 viewBox 属性添加动画吗？',
    faq2_a: '可以，你可以使用 JavaScript（如 requestAnimationFrame）或 SMIL 动画为 viewBox 添加动画。这能创建平滑的缩放和平移效果。在 React 中，可以通过 state 驱动 viewBox 变化。CSS 无法直接动画化 viewBox，但 JavaScript 驱动的过渡效果很好。',
    faq3_q: 'viewBox 和 viewport 有什么区别？',
    faq3_a: 'viewport 是 SVG 元素在页面上的可见区域，由其 width 和 height（属性或 CSS）定义。viewBox 定义映射到该 viewport 上的坐标系统。可以把 viewport 想象成电视屏幕大小，viewBox 想象成摄像头的视野范围。',
    faq4_q: '为什么我的 SVG 周围有多余的空白？',
    faq4_a: '这通常因为：(1) viewBox 大于实际内容 — 在 DevTools 中使用 <code>getBBox()</code> 找到精确边界框；(2) SVG 是内联元素，行高会在下方添加空白 — 用 <code>display: block</code> 修复；(3) preserveAspectRatio 添加了黑边空间 — 检查宽高比匹配。',
    faq5_q: '如何让 SVG 填充容器并忽略宽高比？',
    faq5_a: '在 SVG 元素上设置 <code>preserveAspectRatio="none"</code>。这会拉伸 viewBox 内容以精确填充 viewport，不保持宽高比。通过 CSS 将 width 和 height 设为 100%。这对装饰性背景和形状分隔线很有用。',
  },
};

export default function SvgViewboxExplained({ lang }: { lang: string }) {
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

      {/* 1. viewBox Syntax */}
      <h2>{t.h2_1}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p1_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p1_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p1_3 }} />
      <pre><code>{`<!-- viewBox syntax -->
<svg viewBox="0 0 200 100" width="400" height="200">
  <!-- min-x=0  min-y=0  width=200  height=100 -->
  <!-- The SVG coordinate system goes from (0,0) to (200,100) -->
  <rect x="10" y="10" width="80" height="80" fill="#3b82f6" />
  <circle cx="150" cy="50" r="40" fill="#ef4444" />
</svg>`}</code></pre>
      <p>{t.p1_4}</p>

      {/* 2. viewBox vs width/height */}
      <h2>{t.h2_2}</h2>
      <p>{t.p2_1}</p>
      <p dangerouslySetInnerHTML={{ __html: t.p2_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p2_3 }} />
      <pre><code>{`<!-- width/height = rendered size, viewBox = coordinate system -->

<!-- 200x200 pixel SVG, but internal coords go from 0-100 -->
<svg width="200" height="200" viewBox="0 0 100 100">
  <!-- x=50 means the horizontal center of the coordinate space -->
  <!-- Rendered at 100px from the left (50 * 200/100) -->
  <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
</svg>

<!-- Same viewBox, but rendered at 400x400 pixels -->
<svg width="400" height="400" viewBox="0 0 100 100">
  <!-- Same circle, but now rendered twice as large -->
  <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
</svg>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p2_4 }} />
      <p>{t.p2_5}</p>

      {/* 3. Visual Examples */}
      <h2>{t.h2_3}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p3_1 }} />
      <pre><code>{`<!-- Default: viewBox matches content -->
<svg width="200" height="200" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#3b82f6" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p3_2 }} />
      <pre><code>{`<!-- Zoom in: smaller viewBox = magnified view -->
<svg width="200" height="200" viewBox="50 50 100 100">
  <!-- Only the center 100x100 area is visible -->
  <!-- The circle appears twice as large -->
  <circle cx="100" cy="100" r="80" fill="#3b82f6" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p3_3 }} />
      <pre><code>{`<!-- Zoom out: larger viewBox = wider view -->
<svg width="200" height="200" viewBox="-100 -100 400 400">
  <!-- 400x400 coordinate units squeezed into 200x200 pixels -->
  <!-- The circle appears half its default size -->
  <circle cx="100" cy="100" r="80" fill="#3b82f6" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p3_4 }} />
      <pre><code>{`<!-- Pan: shift min-x and min-y -->
<svg width="200" height="200" viewBox="80 80 200 200">
  <!-- View shifted 80 units right and 80 units down -->
  <!-- The circle appears in the top-left corner -->
  <circle cx="100" cy="100" r="80" fill="#3b82f6" />
</svg>`}</code></pre>

      {/* 4. preserveAspectRatio */}
      <h2>{t.h2_4}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p4_1 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p4_2 }} />

      <table>
        <thead>
          <tr><th>{t.p4_table_value}</th><th>{t.p4_table_behavior}</th><th>{t.p4_table_css}</th></tr>
        </thead>
        <tbody>
          <tr><td><code>xMidYMid meet</code></td><td>{lang === 'zh' ? '居中适配，完全可见（默认）' : 'Centered, fully visible (default)'}</td><td><code>object-fit: contain</code></td></tr>
          <tr><td><code>xMidYMid slice</code></td><td>{lang === 'zh' ? '居中裁剪，完全覆盖' : 'Centered, fully covered'}</td><td><code>object-fit: cover</code></td></tr>
          <tr><td><code>xMinYMin meet</code></td><td>{lang === 'zh' ? '左上角对齐适配' : 'Top-left aligned, contained'}</td><td><code>object-fit: contain; object-position: top left</code></td></tr>
          <tr><td><code>xMaxYMax meet</code></td><td>{lang === 'zh' ? '右下角对齐适配' : 'Bottom-right aligned, contained'}</td><td><code>object-fit: contain; object-position: bottom right</code></td></tr>
          <tr><td><code>none</code></td><td>{lang === 'zh' ? '拉伸填充，可能变形' : 'Stretch to fill, may distort'}</td><td><code>object-fit: fill</code></td></tr>
        </tbody>
      </table>

      <p dangerouslySetInnerHTML={{ __html: t.p4_3 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p4_4 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p4_5 }} />

      <pre><code>{`<!-- meet: contain the content (default) -->
<svg width="400" height="200" viewBox="0 0 100 100"
     preserveAspectRatio="xMidYMid meet">
  <circle cx="50" cy="50" r="45" fill="#3b82f6" />
</svg>

<!-- slice: cover the viewport, crop overflow -->
<svg width="400" height="200" viewBox="0 0 100 100"
     preserveAspectRatio="xMidYMid slice">
  <circle cx="50" cy="50" r="45" fill="#ef4444" />
</svg>

<!-- none: stretch to fill exactly -->
<svg width="400" height="200" viewBox="0 0 100 100"
     preserveAspectRatio="none">
  <circle cx="50" cy="50" r="45" fill="#22c55e" />
</svg>`}</code></pre>

      {/* 5. Responsive SVGs */}
      <h2>{t.h2_5}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p5_1 }} />
      <pre><code>{`<!-- Responsive SVG: viewBox only, no width/height -->
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="400" fill="#f0f9ff" rx="8" />
  <text x="400" y="200" text-anchor="middle" font-size="48"
        fill="#1e40af">Responsive SVG</text>
</svg>

<!-- CSS controls the rendered size -->
<style>
  svg {
    width: 100%;    /* Fill container width */
    height: auto;   /* Maintain aspect ratio */
  }
</style>`}</code></pre>
      <p>{t.p5_2}</p>
      <p dangerouslySetInnerHTML={{ __html: t.p5_3 }} />

      <pre><code>{`<!-- Aspect ratio container with CSS -->
<div style="max-width: 600px; margin: 0 auto;">
  <svg viewBox="0 0 16 9" style="width: 100%; height: auto;">
    <!-- 16:9 aspect ratio SVG -->
    <rect width="16" height="9" fill="#e2e8f0" rx="0.5" />
  </svg>
</div>

<!-- Modern approach: CSS aspect-ratio -->
<svg viewBox="0 0 100 100" style="width: 100%; aspect-ratio: 1 / 1;">
  <circle cx="50" cy="50" r="45" fill="#8b5cf6" />
</svg>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p5_4 }} />

      {/* 6. Common Patterns */}
      <h2>{t.h2_6}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p6_1 }} />
      <pre><code>{`<!-- Icon: explicit size + matching viewBox -->
<svg width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2L2 7l10 5 10-5-10-5z" />
  <path d="M2 17l10 5 10-5" />
  <path d="M2 12l10 5 10-5" />
</svg>

<!-- 32px variant: same viewBox, larger width/height -->
<svg width="32" height="32" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2L2 7l10 5 10-5-10-5z" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p6_2 }} />
      <pre><code>{`<!-- Full-width banner SVG -->
<svg viewBox="0 0 1440 320" style="width: 100%; height: auto; display: block;">
  <path fill="#3b82f6"
    d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,
       144C672,139,768,181,864,197.3C960,213,1056,203,1152,176
       C1248,149,1344,107,1392,85.3L1440,64L1440,320L0,320Z" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p6_3 }} />
      <pre><code>{`<!-- Stretched decorative background -->
<svg viewBox="0 0 100 100" preserveAspectRatio="none"
     style="width: 100%; height: 200px; display: block;">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#8b5cf6" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" fill="url(#grad)" />
</svg>`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p6_4 }} />

      {/* 7. React/JSX */}
      <h2>{t.h2_7}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p7_1 }} />
      <p>{t.p7_2}</p>
      <pre><code>{`// React SVG Icon component with viewBox
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

// Usage
<Icon size={16}>
  <path d="M20 6L9 17l-5-5" />
</Icon>

<Icon size={48} className="text-blue-500">
  <path d="M20 6L9 17l-5-5" />
</Icon>`}</code></pre>

      <p>{t.p7_3}</p>
      <pre><code>{`// Dynamic viewBox for zoom/pan
function ZoomableSvg({ zoom = 1, panX = 0, panY = 0 }) {
  const size = 100 / zoom;
  const viewBox = \`\${panX} \${panY} \${size} \${size}\`;

  return (
    <svg
      width="400"
      height="400"
      viewBox={viewBox}
      style={{ border: '1px solid #e2e8f0' }}
    >
      <circle cx="50" cy="50" r="40" fill="#3b82f6" />
      <rect x="10" y="10" width="30" height="30" fill="#ef4444" />
    </svg>
  );
}

// zoom=1 → viewBox="0 0 100 100" (default)
// zoom=2 → viewBox="0 0 50 50"   (zoomed in 2x)
// zoom=0.5 → viewBox="0 0 200 200" (zoomed out)`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p7_4 }} />

      {/* 8. CSS Control */}
      <h2>{t.h2_8}</h2>
      <p>{t.p8_1}</p>
      <p dangerouslySetInnerHTML={{ __html: t.p8_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p8_3 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p8_4 }} />
      <p>{t.p8_5}</p>
      <pre><code>{`/* Recommended responsive SVG CSS */
svg {
  display: block;       /* Remove inline whitespace gap */
  max-width: 100%;      /* Never overflow container */
  height: auto;         /* Maintain aspect ratio */
}

/* Fixed-size icon SVG */
svg.icon {
  width: 1.5em;         /* Scale with font size */
  height: 1.5em;
  vertical-align: middle;
  fill: currentColor;   /* Inherit text color */
}

/* Full-width hero SVG */
svg.hero {
  width: 100%;
  height: auto;
  display: block;
}

/* Absolute-positioned background SVG */
svg.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none; /* Don't block clicks */
}

/* Override SVG attributes with CSS */
svg[width="500"] {
  /* CSS wins over the HTML attribute */
  width: 100%;
  height: auto;
}`}</code></pre>

      {/* 9. Debugging */}
      <h2>{t.h2_9}</h2>
      <p>{t.p9_1}</p>
      <p dangerouslySetInnerHTML={{ __html: t.p9_2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p9_3 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p9_4 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p9_5 }} />
      <pre><code>{`// DevTools Console: inspect SVG dimensions

// Get the bounding box of all SVG content
const svg = document.querySelector('svg');
const bbox = svg.getBBox();
console.log('Content bounds:', bbox);
// { x: 10, y: 10, width: 180, height: 180 }

// Get the rendered pixel size
const rect = svg.getBoundingClientRect();
console.log('Rendered size:', rect.width, 'x', rect.height);

// Get the viewBox values
const viewBox = svg.viewBox.baseVal;
console.log('viewBox:', viewBox.x, viewBox.y, viewBox.width, viewBox.height);

// Tight-fit the viewBox to content
const tight = \`\${bbox.x} \${bbox.y} \${bbox.width} \${bbox.height}\`;
svg.setAttribute('viewBox', tight);
console.log('Tight viewBox:', tight);`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.p9_6 }} />

      {/* 10. Common Mistakes */}
      <h2>{t.h2_10}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.p10_1 }} />
      <pre><code>{`<!-- BAD: No viewBox, fixed size, cannot scale -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#ef4444" />
</svg>

<!-- GOOD: viewBox enables scaling -->
<svg viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#22c55e" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p10_2 }} />
      <pre><code>{`<!-- Aspect ratio mismatch: viewBox is 2:1, element is 1:1 -->
<svg width="200" height="200" viewBox="0 0 100 50">
  <!-- Content is letterboxed by default (meet) -->
  <rect width="100" height="50" fill="#3b82f6" />
</svg>

<!-- Fix: match the aspect ratio -->
<svg width="200" height="100" viewBox="0 0 100 50">
  <rect width="100" height="50" fill="#3b82f6" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p10_3 }} />
      <pre><code>{`<!-- Blurry SVG fix: align paths to pixel grid -->
<!-- BAD: sub-pixel coordinates cause fuzzy edges -->
<svg viewBox="0 0 24 24">
  <rect x="3.5" y="3.5" width="17" height="17"
        stroke="#333" stroke-width="1" fill="none" />
</svg>

<!-- GOOD: whole-pixel coordinates for crisp 1px lines -->
<svg viewBox="0 0 24 24">
  <rect x="4" y="4" width="16" height="16"
        stroke="#333" stroke-width="1" fill="none" />
</svg>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.p10_4 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p10_5 }} />
      <p dangerouslySetInnerHTML={{ __html: t.p10_6 }} />

      {/* FAQ */}
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
    </>
  );
}
