'use client';

import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS media queries are the backbone of responsive web design, allowing you to apply styles based on device characteristics like viewport width, orientation, and user preferences. In 2025, <strong>CSS media queries and breakpoints</strong> have evolved significantly with new range syntax, container queries, and preference-based features. This comprehensive guide covers everything you need to build truly responsive websites.',
    linkTool1: 'Convert CSS units with our CSS Unit Converter →',
    linkTool2: 'Build responsive layouts visually with our Flexbox Generator →',

    h2_syntax: 'Media Query Syntax',
    syntaxDesc: 'A media query consists of a media type and one or more expressions that check for conditions. When the conditions are true, the styles inside the query are applied.',
    syntaxLogical: 'You can combine conditions using logical operators: <code>and</code> requires all conditions to be true, <code>or</code> (comma-separated) requires at least one, and <code>not</code> negates the entire query.',

    h2_breakpoints: 'Recommended Breakpoints for 2025',
    breakpointsDesc: 'The device landscape has shifted in 2025. These breakpoints cover the most common screen sizes based on current usage data. The key is to design for content first, then add breakpoints where your layout breaks — but these values are an excellent starting point.',

    h2_mobile_first: 'Mobile-First vs Desktop-First',
    mobileFirstDesc: 'There are two main approaches to writing responsive CSS: mobile-first (using <code>min-width</code>) and desktop-first (using <code>max-width</code>). Mobile-first is the industry standard and recommended approach for 2025.',
    mobileFirstWhy: '<strong>Why mobile-first?</strong> Mobile traffic accounts for over 60% of global web traffic. Starting with mobile styles means your base CSS is simpler, loads faster on low-powered devices, and you progressively enhance for larger screens.',

    h2_width: 'Width Queries: Classic and New Range Syntax',
    widthDesc: 'Width-based media queries are the most commonly used. In 2025, all modern browsers support the new range syntax introduced in Media Queries Level 4, which is more readable and less error-prone.',
    widthRange: 'The new range syntax uses mathematical comparison operators (<code>&gt;=</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&lt;</code>) and is supported in Chrome 104+, Firefox 63+, Safari 16.4+, and Edge 104+.',

    h2_features: 'Other Media Features',
    featuresDesc: 'Beyond width, CSS media queries can detect many device characteristics and user preferences. These features are essential for building accessible, user-friendly interfaces.',
    h3_orientation: 'orientation',
    orientationDesc: 'Detects whether the viewport is in portrait (height > width) or landscape (width > height) mode.',
    h3_hover: 'hover and pointer',
    hoverDesc: 'Detects the primary input mechanism\'s capabilities. Essential for distinguishing touch devices from mouse-based devices.',
    h3_color_scheme: 'prefers-color-scheme',
    colorSchemeDesc: 'Detects the user\'s preferred color scheme (light or dark). This is critical for implementing dark mode.',
    h3_motion: 'prefers-reduced-motion',
    motionDesc: 'Detects if the user has requested reduced motion in their system preferences. Important for accessibility — always respect this preference.',
    h3_aspect: 'aspect-ratio',
    aspectDesc: 'Targets viewports with a specific aspect ratio. Useful for ultra-wide monitors or specific device form factors.',

    h2_container: 'Container Queries',
    containerDesc: 'Container queries are one of the biggest CSS additions in recent years. Instead of querying the viewport size, they let you style elements based on the size of their parent container. This makes components truly reusable across different layout contexts.',
    containerType: '<code>container-type: inline-size</code> enables width-based container queries. <code>container-type: size</code> enables both width and height queries but is more expensive for the browser to calculate. Use <code>inline-size</code> in most cases.',

    h2_frameworks: 'Popular Framework Breakpoints Comparison',
    frameworksDesc: 'Here is how popular CSS frameworks define their breakpoints in 2025. Understanding these helps when migrating between frameworks or choosing one for your project.',

    h2_typography: 'Responsive Typography',
    typographyDesc: 'Responsive typography ensures text is readable across all screen sizes. In 2025, the <code>clamp()</code> function is the gold standard for fluid typography, eliminating the need for multiple media query breakpoints.',
    typographyClamp: 'The <code>clamp(min, preferred, max)</code> function takes three values: a minimum size, a preferred (fluid) size, and a maximum size. The preferred value typically uses viewport units to scale with screen size.',

    h2_images: 'Image Responsiveness',
    imagesDesc: 'Responsive images are crucial for performance and user experience. The <code>srcset</code> attribute, <code>sizes</code> attribute, and <code>&lt;picture&gt;</code> element work together to serve the right image for each device.',
    imagesSrcset: '<code>srcset</code> provides the browser with a list of image sources and their sizes, allowing it to choose the best one.',
    imagesPicture: 'The <code>&lt;picture&gt;</code> element provides art direction — serving entirely different images based on media conditions.',

    h2_testing: 'Testing Responsive Designs',
    testingDesc: 'Testing your responsive layouts across devices is essential. Here are the most effective tools and techniques for 2025.',
    testingChrome: '<strong>Chrome DevTools Device Toolbar:</strong> Press <code>Ctrl+Shift+M</code> (Windows/Linux) or <code>Cmd+Shift+M</code> (Mac) to toggle the device toolbar. You can select preset devices, set custom dimensions, throttle network speed, and simulate touch events.',
    testingFirefox: '<strong>Firefox Responsive Design Mode:</strong> Press <code>Ctrl+Shift+M</code> to enter responsive design mode. Firefox offers DPR simulation and touch simulation.',
    testingTips: 'Test at your actual breakpoints, not just at preset device sizes. Slowly resize the browser window and watch for layout breaks.',

    h2_patterns: 'Common Responsive Patterns',
    patternsDesc: 'Here are the most frequently used responsive design patterns that you will need in real projects.',
    h3_hide: 'Show/Hide on Mobile',
    hideDesc: 'Toggle element visibility based on screen size. Use with caution — hidden content should not be essential for mobile users.',
    h3_stack: 'Stack Columns on Mobile',
    stackDesc: 'Convert a multi-column layout to a single stacked column on smaller screens.',
    h3_nav: 'Responsive Navigation',
    navDesc: 'Transform a horizontal navigation into a hamburger menu on mobile devices.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What are the best CSS breakpoints for 2025?',
    faq1_a: 'The recommended breakpoints for 2025 are: 480px (mobile landscape), 768px (tablet), 1024px (laptop), 1280px (desktop), and 1536px (large desktop/4K). However, the best practice is to set breakpoints where your content actually breaks rather than targeting specific devices. Use these values as a starting point and adjust based on your design.',
    faq2_q: 'Should I use min-width or max-width for media queries?',
    faq2_a: 'Use min-width (mobile-first approach) in most cases. This is the industry standard because it starts with the simplest styles for mobile devices and progressively enhances for larger screens. Mobile-first CSS tends to be cleaner and more performant. The only exception is when retrofitting responsive styles onto an existing desktop-only site, where max-width (desktop-first) may be more practical.',
    faq3_q: 'What is the difference between media queries and container queries?',
    faq3_a: 'Media queries respond to the viewport (browser window) size, while container queries respond to a parent element\'s size. Container queries make components truly reusable because a card component can adapt based on where it is placed (sidebar vs main content) rather than only the viewport size. Use media queries for page-level layouts and container queries for component-level responsiveness.',
    faq4_q: 'How do I implement dark mode with CSS media queries?',
    faq4_a: 'Use the prefers-color-scheme media feature: @media (prefers-color-scheme: dark) { /* dark styles */ }. Define CSS custom properties (variables) for your color tokens and swap them in the dark mode query. Also provide a manual toggle using a CSS class or data attribute that overrides the system preference, giving users full control.',
    faq5_q: 'Is the new media query range syntax safe to use in production?',
    faq5_a: 'Yes, the new range syntax (e.g., @media (width >= 768px)) is supported in all modern browsers: Chrome 104+, Firefox 63+, Safari 16.4+, and Edge 104+. As of 2025, this covers over 95% of global users. If you need to support older browsers, use the traditional min-width/max-width syntax as a fallback or use a PostCSS plugin to transpile the range syntax automatically.',

    conclusion: 'CSS media queries and breakpoints are essential tools for building responsive websites in 2025. With new range syntax, container queries, and preference-based features, you have more power than ever to create adaptive layouts. Use a mobile-first approach, test thoroughly, and always respect user preferences for the best experience.',
    linkToolBottom1: 'Convert between CSS units with our CSS Unit Converter →',
    linkToolBottom2: 'Build responsive layouts visually with our Flexbox Generator →',
  },
  zh: {
    intro: 'CSS 媒体查询是响应式网页设计的基石，允许你根据设备特性（如视口宽度、方向和用户偏好）应用样式。在 2025 年，<strong>CSS 媒体查询和断点</strong>已经有了重大进化，包括新的范围语法、容器查询和基于偏好的特性。本综合指南涵盖了构建真正响应式网站所需的一切。',
    linkTool1: '使用我们的 CSS 单位转换器转换 CSS 单位 →',
    linkTool2: '使用我们的 Flexbox 生成器可视化构建响应式布局 →',

    h2_syntax: '媒体查询语法',
    syntaxDesc: '媒体查询由媒体类型和一个或多个检查条件的表达式组成。当条件为真时，查询内的样式会被应用。',
    syntaxLogical: '你可以使用逻辑运算符组合条件：<code>and</code> 要求所有条件为真，<code>or</code>（逗号分隔）要求至少一个为真，<code>not</code> 否定整个查询。',

    h2_breakpoints: '2025 年推荐断点',
    breakpointsDesc: '2025 年的设备格局已经发生了变化。这些断点基于当前使用数据覆盖了最常见的屏幕尺寸。关键是先为内容设计，然后在布局出现问题的地方添加断点——但这些值是很好的起点。',

    h2_mobile_first: '移动优先 vs 桌面优先',
    mobileFirstDesc: '编写响应式 CSS 有两种主要方法：移动优先（使用 <code>min-width</code>）和桌面优先（使用 <code>max-width</code>）。移动优先是行业标准，也是 2025 年推荐的方法。',
    mobileFirstWhy: '<strong>为什么选择移动优先？</strong>移动流量占全球网络流量的 60% 以上。从移动样式开始意味着你的基础 CSS 更简洁，在低功耗设备上加载更快，并且你可以逐步增强以适应更大的屏幕。',

    h2_width: '宽度查询：经典语法和新范围语法',
    widthDesc: '基于宽度的媒体查询是最常用的。在 2025 年，所有现代浏览器都支持 Media Queries Level 4 中引入的新范围语法，它更具可读性且不容易出错。',
    widthRange: '新的范围语法使用数学比较运算符（<code>&gt;=</code>、<code>&lt;=</code>、<code>&gt;</code>、<code>&lt;</code>），在 Chrome 104+、Firefox 63+、Safari 16.4+ 和 Edge 104+ 中受支持。',

    h2_features: '其他媒体特性',
    featuresDesc: '除了宽度之外，CSS 媒体查询可以检测许多设备特性和用户偏好。这些特性对于构建无障碍、用户友好的界面至关重要。',
    h3_orientation: 'orientation（方向）',
    orientationDesc: '检测视口是纵向（高度 > 宽度）还是横向（宽度 > 高度）模式。',
    h3_hover: 'hover 和 pointer',
    hoverDesc: '检测主要输入机制的能力。对于区分触摸设备和鼠标设备至关重要。',
    h3_color_scheme: 'prefers-color-scheme（偏好配色方案）',
    colorSchemeDesc: '检测用户偏好的配色方案（浅色或深色）。这对于实现暗色模式至关重要。',
    h3_motion: 'prefers-reduced-motion（偏好减少动画）',
    motionDesc: '检测用户是否在系统设置中请求减少动画。这对于无障碍访问很重要——务必尊重此偏好。',
    h3_aspect: 'aspect-ratio（宽高比）',
    aspectDesc: '针对具有特定宽高比的视口。适用于超宽显示器或特定的设备形态。',

    h2_container: '容器查询',
    containerDesc: '容器查询是近年来最大的 CSS 新增功能之一。它不是查询视口大小，而是让你根据父容器的大小来设置元素样式。这使得组件在不同的布局上下文中真正可复用。',
    containerType: '<code>container-type: inline-size</code> 启用基于宽度的容器查询。<code>container-type: size</code> 同时启用宽度和高度查询，但浏览器计算成本更高。大多数情况下使用 <code>inline-size</code>。',

    h2_frameworks: '热门框架断点对比',
    frameworksDesc: '以下是 2025 年流行的 CSS 框架如何定义它们的断点。了解这些有助于在框架之间迁移或为项目选择框架。',

    h2_typography: '响应式排版',
    typographyDesc: '响应式排版确保文本在所有屏幕尺寸上都清晰可读。在 2025 年，<code>clamp()</code> 函数是流体排版的黄金标准，无需多个媒体查询断点。',
    typographyClamp: '<code>clamp(最小值, 首选值, 最大值)</code> 函数接受三个值：最小尺寸、首选（流体）尺寸和最大尺寸。首选值通常使用视口单位来随屏幕尺寸缩放。',

    h2_images: '图片响应式',
    imagesDesc: '响应式图片对性能和用户体验至关重要。<code>srcset</code> 属性、<code>sizes</code> 属性和 <code>&lt;picture&gt;</code> 元素协同工作，为每个设备提供合适的图片。',
    imagesSrcset: '<code>srcset</code> 向浏览器提供图片源列表及其尺寸，让浏览器选择最佳的一个。',
    imagesPicture: '<code>&lt;picture&gt;</code> 元素提供艺术指导——根据媒体条件提供完全不同的图片。',

    h2_testing: '测试响应式设计',
    testingDesc: '在各种设备上测试响应式布局至关重要。以下是 2025 年最有效的工具和技巧。',
    testingChrome: '<strong>Chrome DevTools 设备工具栏：</strong>按 <code>Ctrl+Shift+M</code>（Windows/Linux）或 <code>Cmd+Shift+M</code>（Mac）切换设备工具栏。你可以选择预设设备、设置自定义尺寸、限制网络速度和模拟触摸事件。',
    testingFirefox: '<strong>Firefox 响应式设计模式：</strong>按 <code>Ctrl+Shift+M</code> 进入响应式设计模式。Firefox 提供 DPR 模拟和触摸模拟。',
    testingTips: '在实际断点处测试，而不仅仅是预设设备尺寸。缓慢调整浏览器窗口大小，观察布局断裂点。',

    h2_patterns: '常见响应式模式',
    patternsDesc: '以下是实际项目中最常用的响应式设计模式。',
    h3_hide: '在移动端显示/隐藏',
    hideDesc: '根据屏幕尺寸切换元素的可见性。谨慎使用——隐藏的内容不应该是移动用户的必要内容。',
    h3_stack: '移动端堆叠列',
    stackDesc: '在较小屏幕上将多列布局转换为单列堆叠布局。',
    h3_nav: '响应式导航',
    navDesc: '在移动设备上将水平导航转换为汉堡菜单。',

    h2_faq: '常见问题',
    faq1_q: '2025 年最佳的 CSS 断点是什么？',
    faq1_a: '2025 年推荐的断点是：480px（手机横屏）、768px（平板）、1024px（笔记本）、1280px（桌面显示器）和 1536px（大屏/4K）。不过，最佳实践是在内容实际出现断裂的地方设置断点，而不是针对特定设备。将这些值作为起点，根据你的设计进行调整。',
    faq2_q: '媒体查询应该用 min-width 还是 max-width？',
    faq2_a: '大多数情况下使用 min-width（移动优先方法）。这是行业标准，因为它从最简单的移动设备样式开始，逐步增强以适应更大的屏幕。移动优先的 CSS 通常更简洁、性能更好。唯一的例外是在现有的纯桌面网站上添加响应式样式时，max-width（桌面优先）可能更实用。',
    faq3_q: '媒体查询和容器查询有什么区别？',
    faq3_a: '媒体查询响应视口（浏览器窗口）大小，而容器查询响应父元素的大小。容器查询使组件真正可复用，因为卡片组件可以根据其放置位置（侧边栏 vs 主内容区）来适应，而不仅仅是视口大小。页面级布局使用媒体查询，组件级响应使用容器查询。',
    faq4_q: '如何用 CSS 媒体查询实现暗色模式？',
    faq4_a: '使用 prefers-color-scheme 媒体特性：@media (prefers-color-scheme: dark) { /* 暗色样式 */ }。为颜色令牌定义 CSS 自定义属性（变量），并在暗色模式查询中切换它们。同时提供一个使用 CSS 类或 data 属性的手动切换，覆盖系统偏好，给用户完全控制权。',
    faq5_q: '新的媒体查询范围语法可以在生产环境使用吗？',
    faq5_a: '可以，新的范围语法（例如 @media (width >= 768px)）在所有现代浏览器中均受支持：Chrome 104+、Firefox 63+、Safari 16.4+ 和 Edge 104+。截至 2025 年，这涵盖了全球 95% 以上的用户。如果需要支持旧浏览器，可以使用传统的 min-width/max-width 语法作为后备，或使用 PostCSS 插件自动转译范围语法。',

    conclusion: 'CSS 媒体查询和断点是 2025 年构建响应式网站的必备工具。借助新的范围语法、容器查询和基于偏好的特性，你拥有比以往更强大的能力来创建自适应布局。使用移动优先方法，彻底测试，并始终尊重用户偏好以获得最佳体验。',
    linkToolBottom1: '使用我们的 CSS 单位转换器转换 CSS 单位 →',
    linkToolBottom2: '使用我们的 Flexbox 生成器可视化构建响应式布局 →',
  },
};

export default function CssMediaQueriesBreakpoints2025({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkTool1}</Link></p>
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkTool2}</Link></p>

      {/* ==================== MEDIA QUERY SYNTAX ==================== */}
      <h2>{s.h2_syntax}</h2>
      <p>{s.syntaxDesc}</p>

      <pre><code>{`/* Basic media query syntax */
@media media-type and (media-feature) {
  /* CSS rules here */
}

/* Examples */
@media screen and (min-width: 768px) {
  .container { max-width: 720px; }
}

@media print {
  .no-print { display: none; }
}

/* Without media type (applies to all) */
@media (min-width: 768px) {
  .sidebar { display: block; }
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.syntaxLogical }} />

      <pre><code>{`/* AND — all conditions must be true */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* tablet only */
}

/* OR — comma-separated, at least one must be true */
@media (max-width: 480px), (orientation: portrait) {
  /* mobile OR portrait */
}

/* NOT — negates the entire query */
@media not print {
  /* everything except print */
}

/* ONLY — prevents older browsers from applying styles */
@media only screen and (min-width: 768px) {
  /* modern browsers only */
}`}</code></pre>

      {/* ==================== BREAKPOINTS TABLE ==================== */}
      <h2>{s.h2_breakpoints}</h2>
      <p>{s.breakpointsDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Device</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Breakpoint</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>CSS (Mobile-First)</th>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Common Devices</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Mobile (portrait)</td>
              <td style={{ padding: '8px 12px' }}><code>0 – 479px</code></td>
              <td style={{ padding: '8px 12px' }}>Default styles (no query)</td>
              <td style={{ padding: '8px 12px' }}>iPhone SE, Galaxy S series</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Mobile (landscape)</td>
              <td style={{ padding: '8px 12px' }}><code>480px</code></td>
              <td style={{ padding: '8px 12px' }}><code>@media (min-width: 480px)</code></td>
              <td style={{ padding: '8px 12px' }}>Phones in landscape</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Tablet</td>
              <td style={{ padding: '8px 12px' }}><code>768px</code></td>
              <td style={{ padding: '8px 12px' }}><code>@media (min-width: 768px)</code></td>
              <td style={{ padding: '8px 12px' }}>iPad Mini, iPad Air, Galaxy Tab</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Laptop</td>
              <td style={{ padding: '8px 12px' }}><code>1024px</code></td>
              <td style={{ padding: '8px 12px' }}><code>@media (min-width: 1024px)</code></td>
              <td style={{ padding: '8px 12px' }}>iPad Pro, small laptops</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Desktop</td>
              <td style={{ padding: '8px 12px' }}><code>1280px</code></td>
              <td style={{ padding: '8px 12px' }}><code>@media (min-width: 1280px)</code></td>
              <td style={{ padding: '8px 12px' }}>Standard desktop monitors</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Large Desktop / 4K</td>
              <td style={{ padding: '8px 12px' }}><code>1536px</code></td>
              <td style={{ padding: '8px 12px' }}><code>@media (min-width: 1536px)</code></td>
              <td style={{ padding: '8px 12px' }}>Large monitors, 4K displays</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`/* Complete mobile-first breakpoint system */
/* Base: Mobile portrait (0–479px) */
.container { padding: 0 16px; }

/* 480px: Mobile landscape */
@media (min-width: 480px) {
  .container { max-width: 460px; margin: 0 auto; }
}

/* 768px: Tablet */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* 1024px: Laptop */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
}

/* 1280px: Desktop */
@media (min-width: 1280px) {
  .container { max-width: 1200px; }
}

/* 1536px: Large desktop / 4K */
@media (min-width: 1536px) {
  .container { max-width: 1400px; }
}`}</code></pre>

      {/* ==================== MOBILE-FIRST VS DESKTOP-FIRST ==================== */}
      <h2>{s.h2_mobile_first}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.mobileFirstDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.mobileFirstWhy }} />

      <pre><code>{`/* ========== MOBILE-FIRST (Recommended) ========== */
/* Base styles: mobile */
.grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grid-item {
  width: 100%;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .grid-item {
    width: calc(50% - 8px);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid-item {
    width: calc(33.333% - 11px);
  }
}


/* ========== DESKTOP-FIRST (Less common) ========== */
/* Base styles: desktop */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.grid-item {
  width: calc(33.333% - 11px);
}

/* Tablet: 2 columns */
@media (max-width: 1023px) {
  .grid-item {
    width: calc(50% - 8px);
  }
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .grid {
    flex-direction: column;
  }
  .grid-item {
    width: 100%;
  }
}`}</code></pre>

      {/* ==================== WIDTH QUERIES ==================== */}
      <h2>{s.h2_width}</h2>
      <p>{s.widthDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.widthRange }} />

      <pre><code>{`/* ===== Traditional syntax (widely supported) ===== */
@media (min-width: 768px) { /* 768px and up */ }
@media (max-width: 767px) { /* below 768px */ }
@media (min-width: 768px) and (max-width: 1023px) { /* 768–1023px */ }

/* ===== New range syntax (2025 — all modern browsers) ===== */
@media (width >= 768px) { /* 768px and up */ }
@media (width < 768px)  { /* below 768px */ }
@media (768px <= width < 1024px) { /* 768–1023px */ }

/* More examples of range syntax */
@media (width >= 480px) {
  /* mobile landscape and up */
}

@media (width >= 768px) and (width < 1024px) {
  /* tablet only */
}

@media (height >= 800px) {
  /* tall viewports */
}

/* Range syntax is more intuitive for ranges */
/* Old: min and max are confusing with "and" */
@media (min-width: 768px) and (max-width: 1279px) { ... }

/* New: reads naturally as a mathematical range */
@media (768px <= width <= 1279px) { ... }`}</code></pre>

      {/* ==================== OTHER FEATURES ==================== */}
      <h2>{s.h2_features}</h2>
      <p>{s.featuresDesc}</p>

      {/* orientation */}
      <h3>{s.h3_orientation}</h3>
      <p>{s.orientationDesc}</p>
      <pre><code>{`/* Portrait mode */
@media (orientation: portrait) {
  .gallery {
    grid-template-columns: 1fr;
  }
}

/* Landscape mode */
@media (orientation: landscape) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Combine with width */
@media (orientation: landscape) and (max-height: 500px) {
  /* landscape on a phone — reduce vertical padding */
  .hero { padding: 20px 0; }
}`}</code></pre>

      {/* hover and pointer */}
      <h3>{s.h3_hover}</h3>
      <p>{s.hoverDesc}</p>
      <pre><code>{`/* Device has hover capability (mouse/trackpad) */
@media (hover: hover) {
  .button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
  }
}

/* Device does NOT have hover (touchscreen) */
@media (hover: none) {
  .button {
    /* larger touch target */
    padding: 16px 24px;
    font-size: 18px;
  }
}

/* Fine pointer (mouse) */
@media (pointer: fine) {
  .input { height: 32px; }
}

/* Coarse pointer (touch/finger) */
@media (pointer: coarse) {
  .input { height: 48px; }  /* larger touch target */
}

/* Combine for precise detection */
@media (hover: hover) and (pointer: fine) {
  /* desktop with mouse — show tooltips on hover */
  .tooltip:hover .tooltip-text { display: block; }
}`}</code></pre>

      {/* prefers-color-scheme */}
      <h3>{s.h3_color_scheme}</h3>
      <p>{s.colorSchemeDesc}</p>
      <pre><code>{`/* Define color tokens with CSS custom properties */
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
  --card-bg: #f8fafc;
  --border: #e2e8f0;
  --primary: #2563eb;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f1f5f9;
    --card-bg: #1e293b;
    --border: #334155;
    --primary: #60a5fa;
  }
}

/* Use the tokens everywhere */
body {
  background-color: var(--bg);
  color: var(--text);
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
}

/* Manual toggle override with data attribute */
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --card-bg: #1e293b;
  --border: #334155;
  --primary: #60a5fa;
}`}</code></pre>

      {/* prefers-reduced-motion */}
      <h3>{s.h3_motion}</h3>
      <p>{s.motionDesc}</p>
      <pre><code>{`/* Default: add animations */
.element {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.element:hover {
  transform: scale(1.05);
}

@keyframes slide-in {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

.animated {
  animation: slide-in 0.5s ease-out;
}

/* Reduce or remove motion when user prefers it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Alternative: opt-in approach (safer) */
@media (prefers-reduced-motion: no-preference) {
  .element {
    transition: transform 0.3s ease;
  }
}`}</code></pre>

      {/* aspect-ratio */}
      <h3>{s.h3_aspect}</h3>
      <p>{s.aspectDesc}</p>
      <pre><code>{`/* Ultra-wide monitors (21:9 or wider) */
@media (min-aspect-ratio: 21/9) {
  .hero {
    max-width: 1600px;
    margin: 0 auto;
  }
}

/* Standard widescreen (16:9) */
@media (aspect-ratio: 16/9) {
  .video-container { padding: 0; }
}

/* Tall/narrow viewports (phones) */
@media (max-aspect-ratio: 3/4) {
  .sidebar { display: none; }
}`}</code></pre>

      {/* ==================== CONTAINER QUERIES ==================== */}
      <h2>{s.h2_container}</h2>
      <p>{s.containerDesc}</p>
      <p dangerouslySetInnerHTML={{ __html: s.containerType }} />

      <pre><code>{`/* Step 1: Define a container */
.card-wrapper {
  container-type: inline-size;  /* enable width-based queries */
  container-name: card;         /* optional: name for targeting */
}

/* Shorthand */
.card-wrapper {
  container: card / inline-size;
}

/* Step 2: Query the container */
@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
  .card-image {
    width: 40%;
  }
  .card-content {
    width: 60%;
  }
}

@container card (min-width: 600px) {
  .card {
    gap: 24px;
  }
  .card-title {
    font-size: 1.5rem;
  }
}

/* Container query with range syntax */
@container (width >= 300px) {
  .component { padding: 24px; }
}

/* Container query units */
.card-title {
  /* cqw = 1% of container width */
  font-size: clamp(1rem, 3cqw, 1.5rem);
}

/* Practical example: sidebar vs main content */
.sidebar .card-wrapper {
  /* Container is narrow → card stacks vertically */
  container-type: inline-size;
}
.main .card-wrapper {
  /* Container is wide → card goes horizontal */
  container-type: inline-size;
}
/* Same @container rules work in both contexts! */`}</code></pre>

      {/* ==================== FRAMEWORK BREAKPOINTS ==================== */}
      <h2>{s.h2_frameworks}</h2>
      <p>{s.frameworksDesc}</p>

      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #334155' }}>
              <th style={{ padding: '8px 12px', textAlign: 'left' }}>Breakpoint</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Tailwind CSS</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Bootstrap 5</th>
              <th style={{ padding: '8px 12px', textAlign: 'center' }}>Material UI</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Extra Small</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>—</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>&lt;576px</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>0px (xs)</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Small</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>640px (sm)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>576px (sm)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>600px (sm)</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Medium</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>768px (md)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>768px (md)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>900px (md)</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Large</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1024px (lg)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>992px (lg)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1200px (lg)</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>Extra Large</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1280px (xl)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1200px (xl)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1536px (xl)</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #334155' }}>
              <td style={{ padding: '8px 12px' }}>2X Large</td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1536px (2xl)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}><code>1400px (xxl)</code></td>
              <td style={{ padding: '8px 12px', textAlign: 'center' }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <pre><code>{`/* Tailwind CSS — using classes directly */
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <!-- responsive grid -->
</div>

/* Bootstrap 5 — using column classes */
<div class="row">
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <!-- responsive column -->
  </div>
</div>

/* Custom: matching Tailwind breakpoints in plain CSS */
/* sm */ @media (min-width: 640px)  { ... }
/* md */ @media (min-width: 768px)  { ... }
/* lg */ @media (min-width: 1024px) { ... }
/* xl */ @media (min-width: 1280px) { ... }
/* 2xl */ @media (min-width: 1536px) { ... }`}</code></pre>

      {/* ==================== RESPONSIVE TYPOGRAPHY ==================== */}
      <h2>{s.h2_typography}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.typographyDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.typographyClamp }} />

      <pre><code>{`/* ===== clamp() — fluid typography (recommended) ===== */
h1 {
  /* min: 2rem, preferred: 5vw, max: 3.5rem */
  font-size: clamp(2rem, 5vw, 3.5rem);
}

h2 {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
}

p {
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  line-height: 1.6;
}

/* ===== Complete fluid type scale ===== */
:root {
  --text-xs:  clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm:  clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg:  clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-xl:  clamp(1.25rem, 1rem + 1.2vw, 1.75rem);
  --text-2xl: clamp(1.5rem, 1rem + 2.5vw, 2.5rem);
  --text-3xl: clamp(2rem, 1.2rem + 4vw, 3.5rem);
}

/* ===== Traditional breakpoint approach ===== */
h1 { font-size: 1.75rem; }

@media (min-width: 768px) {
  h1 { font-size: 2.25rem; }
}

@media (min-width: 1024px) {
  h1 { font-size: 3rem; }
}

/* ===== Viewport units (use with caution) ===== */
h1 {
  /* Never use vw alone — inaccessible (ignores zoom) */
  font-size: 5vw;  /* BAD */

  /* Combine with calc or clamp for accessibility */
  font-size: calc(1rem + 2vw);  /* OK */
  font-size: clamp(1.5rem, 4vw, 3rem);  /* BEST */
}`}</code></pre>

      {/* ==================== IMAGE RESPONSIVENESS ==================== */}
      <h2>{s.h2_images}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.imagesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.imagesSrcset }} />

      <pre><code>{`<!-- srcset with width descriptors -->
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg  400w,
    image-800.jpg  800w,
    image-1200.jpg 1200w,
    image-1600.jpg 1600w
  "
  sizes="
    (min-width: 1280px) 1200px,
    (min-width: 768px) 90vw,
    100vw
  "
  alt="Responsive image example"
  loading="lazy"
/>

<!-- srcset with pixel density descriptors -->
<img
  src="logo.png"
  srcset="
    logo.png    1x,
    logo@2x.png 2x,
    logo@3x.png 3x
  "
  alt="Company logo"
/>`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.imagesPicture }} />

      <pre><code>{`<!-- Art direction with <picture> -->
<picture>
  <!-- Wide screens: panoramic hero -->
  <source
    media="(min-width: 1024px)"
    srcset="hero-wide.jpg"
  />
  <!-- Tablet: cropped version -->
  <source
    media="(min-width: 768px)"
    srcset="hero-medium.jpg"
  />
  <!-- Mobile: square crop -->
  <source
    media="(max-width: 767px)"
    srcset="hero-mobile.jpg"
  />
  <!-- Fallback -->
  <img src="hero-medium.jpg" alt="Hero image" />
</picture>

<!-- Format switching with <picture> -->
<picture>
  <source type="image/avif" srcset="image.avif" />
  <source type="image/webp" srcset="image.webp" />
  <img src="image.jpg" alt="Modern format with fallback" />
</picture>

/* CSS: responsive images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Object-fit for fixed-aspect containers */
.thumbnail {
  width: 300px;
  height: 200px;
  object-fit: cover;       /* crop to fill */
  object-position: center; /* crop from center */
}`}</code></pre>

      {/* ==================== TESTING ==================== */}
      <h2>{s.h2_testing}</h2>
      <p>{s.testingDesc}</p>

      <p dangerouslySetInnerHTML={{ __html: s.testingChrome }} />
      <p dangerouslySetInnerHTML={{ __html: s.testingFirefox }} />
      <p>{s.testingTips}</p>

      <pre><code>{`/* Debug helper: show current breakpoint */
body::after {
  content: 'MOBILE';
  position: fixed;
  bottom: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  z-index: 9999;
}

@media (min-width: 480px) {
  body::after { content: 'MOBILE-L'; background: #f97316; }
}
@media (min-width: 768px) {
  body::after { content: 'TABLET'; background: #eab308; }
}
@media (min-width: 1024px) {
  body::after { content: 'LAPTOP'; background: #22c55e; }
}
@media (min-width: 1280px) {
  body::after { content: 'DESKTOP'; background: #3b82f6; }
}
@media (min-width: 1536px) {
  body::after { content: 'LARGE'; background: #8b5cf6; }
}

/* Remove in production! */
@media print {
  body::after { display: none; }
}`}</code></pre>

      {/* ==================== COMMON PATTERNS ==================== */}
      <h2>{s.h2_patterns}</h2>
      <p>{s.patternsDesc}</p>

      {/* Show/Hide */}
      <h3>{s.h3_hide}</h3>
      <p>{s.hideDesc}</p>
      <pre><code>{`/* Hide on mobile, show on desktop */
.desktop-only {
  display: none;
}
@media (min-width: 768px) {
  .desktop-only {
    display: block;  /* or flex, grid, etc. */
  }
}

/* Show on mobile, hide on desktop */
.mobile-only {
  display: block;
}
@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}`}</code></pre>

      {/* Stack Columns */}
      <h3>{s.h3_stack}</h3>
      <p>{s.stackDesc}</p>
      <pre><code>{`/* Stacked on mobile, side-by-side on tablet+ */
.two-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 768px) {
  .two-column {
    flex-direction: row;
  }
  .two-column > .main-content {
    flex: 2;
  }
  .two-column > .sidebar {
    flex: 1;
  }
}

/* Three columns with container queries */
.card-grid {
  container-type: inline-size;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@container (min-width: 500px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container (min-width: 800px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`}</code></pre>

      {/* Responsive Navigation */}
      <h3>{s.h3_nav}</h3>
      <p>{s.navDesc}</p>
      <pre><code>{`/* Mobile: hamburger menu */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.nav-links {
  display: none;          /* hidden by default on mobile */
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--bg);
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.nav-links.active {
  display: flex;          /* toggled by JavaScript */
}

.hamburger {
  display: block;
  cursor: pointer;
}

/* Desktop: horizontal nav, no hamburger */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    flex-direction: row;
    position: static;
    background: none;
    box-shadow: none;
    gap: 24px;
    padding: 0;
  }

  .hamburger {
    display: none;
  }
}

/* Responsive font sizes in nav */
.nav-link {
  font-size: 1rem;
  padding: 12px 0;
}

@media (min-width: 768px) {
  .nav-link {
    font-size: 0.875rem;
    padding: 8px 12px;
  }
}`}</code></pre>

      {/* ==================== FAQ ==================== */}
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

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/css-unit-converter`} style={{ fontWeight: 600 }}>{s.linkToolBottom1}</Link></p>
      <p><Link href={`/${lang}/tools/flexbox-generator`} style={{ fontWeight: 600 }}>{s.linkToolBottom2}</Link></p>
    </>
  );
}
