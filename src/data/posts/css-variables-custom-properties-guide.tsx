'use client';
import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'CSS Variables, officially known as <strong>CSS Custom Properties</strong>, have fundamentally changed how we write and maintain stylesheets. They bring the power of variables — previously only available through preprocessors like Sass — directly into the browser, with the added benefits of cascade, inheritance, and runtime manipulation via JavaScript. This <strong>complete CSS custom properties guide</strong> covers everything from basic syntax and scoping rules to dynamic theming, color systems, animation with <code>@property</code>, and real-world component patterns.',
    linkTool: 'Explore colors visually with our Color Converter tool \u2192',

    h2_syntax: '1. Syntax: Declaring and Using CSS Variables',
    syntaxDesc: 'CSS custom properties follow a simple two-part syntax: you declare them with a double-hyphen prefix (<code>--</code>) and consume them with the <code>var()</code> function. The <code>var()</code> function also supports an optional fallback value that is used when the property is not defined.',
    h3_declaring: 'Declaring Custom Properties',
    h3_using: 'Using var() with Fallbacks',
    h3_multiple_fallback: 'Nested Fallbacks and Composition',

    h2_scope: '2. Scope & Cascade',
    scopeDesc: 'Unlike Sass variables that are resolved at compile time, CSS custom properties participate in the cascade. They are inherited by default, can be scoped to any selector, and can be overridden at any level of the DOM tree.',
    h3_global: 'Global Variables with :root',
    h3_component: 'Component-Level Scope',
    h3_inheritance: 'Inheritance and Override',
    inheritanceDesc: 'Custom properties inherit down the DOM tree just like <code>color</code> or <code>font-size</code>. A child element can read a variable set on any ancestor, and any element can override a variable for its subtree.',

    h2_theming: '3. Dynamic Theming',
    themingDesc: 'One of the most powerful applications of CSS variables is dynamic theming. By changing a few variable values, you can transform the entire look of your site — no class toggling on individual elements needed.',
    h3_dark_toggle: 'Dark Mode Toggle with CSS Variables',
    h3_prefers: 'prefers-color-scheme Media Query',
    h3_theme_switching: 'Multi-Theme Switching',

    h2_colors: '4. Color Systems with CSS Variables',
    colorsDesc: 'CSS variables excel at building systematic color palettes. The HSL color model is particularly powerful because you can manipulate hue, saturation, and lightness independently.',
    h3_hsl: 'HSL Approach for Color Palettes',
    h3_semantic: 'Semantic Color Tokens',
    h3_opacity: 'Alpha / Opacity Variations',

    h2_spacing: '5. Spacing & Typography Systems',
    spacingDesc: 'A consistent spacing scale and a fluid typography system are the backbone of any well-designed interface. CSS variables make both easy to define, maintain, and override.',
    h3_spacing_scale: 'Spacing Scale',
    h3_fluid_type: 'Fluid Typography with clamp()',
    h3_type_scale: 'Type Scale System',

    h2_vs_sass: '6. CSS Variables vs Sass Variables',
    vsSassDesc: 'Both CSS custom properties and Sass variables serve the purpose of reducing repetition, but they work in fundamentally different ways. The choice is not either/or — many projects use both.',
    h3_comparison: 'Comparison Table',
    th_feature: 'Feature',
    th_css_vars: 'CSS Custom Properties',
    th_sass_vars: 'Sass Variables',
    td_resolved: 'Resolution',
    td_css_runtime: 'Runtime (browser)',
    td_sass_compile: 'Compile-time (build)',
    td_cascade_feat: 'Cascade',
    td_css_yes: 'Yes \u2014 inherits, overridable',
    td_sass_no_cascade: 'No \u2014 flat scope',
    td_js_access: 'JS Access',
    td_css_js_yes: 'Yes \u2014 read/write from JS',
    td_sass_js_no: 'No \u2014 compiled away',
    td_media_q: 'Media Queries',
    td_css_media_yes: 'Yes \u2014 change in @media',
    td_sass_media_no: 'Compile-time only',
    td_functions: 'Functions',
    td_css_fn_limited: 'calc() only',
    td_sass_fn_rich: 'Rich functions, loops, mixins',
    td_browser: 'Browser Support',
    td_css_browser: '97%+ (all modern)',
    td_sass_browser: 'Compiled to CSS \u2014 universal',
    td_performance: 'Performance',
    td_css_perf: 'Tiny runtime cost',
    td_sass_perf: 'Zero runtime cost',
    h3_when_use: 'When to Use Which',
    whenUseDesc: '<strong>Use CSS variables</strong> for anything that changes at runtime: theming, responsive adjustments, user preferences, component API surfaces. <strong>Use Sass variables</strong> for static design tokens, complex calculations during build, conditional compilation, and generating utility classes. <strong>Best practice:</strong> Define design tokens as Sass variables, then expose them as CSS custom properties for runtime flexibility.',

    h2_js: '7. JavaScript Interaction',
    jsDesc: 'CSS custom properties can be read and written from JavaScript, making them a powerful bridge between CSS and JS. This enables dynamic styling without managing inline styles on every element.',
    h3_reading: 'Reading CSS Variables from JS',
    h3_writing: 'Writing CSS Variables from JS',
    h3_reactive: 'Reactive Patterns',

    h2_animation: '8. Animating with CSS Variables',
    animationDesc: 'By default, CSS custom properties cannot be animated because the browser does not know what type of value they hold. The <code>@property</code> rule solves this by registering a property with a specific syntax.',
    h3_problem: 'The Problem: Why Variables Don\'t Animate',
    h3_solution: 'The Solution: @property Registration',
    h3_gradient_anim: 'Animated Gradient Background',

    h2_property: '9. The @property Rule',
    propertyDesc: 'The <code>@property</code> at-rule is part of the CSS Houdini specification. It lets you formally register a custom property with a type, initial value, and inheritance behavior. This unlocks animation and validation.',
    h3_syntax_prop: 'Full Syntax',
    h3_types: 'Supported Types',
    h3_typed_examples: 'Practical Typed Properties',

    h2_components: '10. Component Patterns',
    componentsDesc: 'CSS variables create a clean API for components. Instead of overriding internal selectors, consumers set variables from the outside. This pattern works with any framework or plain HTML.',
    h3_button: 'Button Component',
    h3_card: 'Card Component',
    h3_input: 'Form Input Component',

    h2_support: '11. Browser Support & Fallbacks',
    supportDesc: 'CSS custom properties are supported in all modern browsers. However, if you need to support legacy browsers, there are several fallback strategies.',
    h3_support_table: 'Current Browser Support',
    supportTableDesc: 'CSS custom properties have <strong>97%+ global support</strong> as of 2025. They work in Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+, and all Chromium-based browsers. The <code>@property</code> rule has more limited support (Chrome 85+, Safari 15.4+, Firefox 128+).',
    h3_fallback_strat: 'Fallback Strategies',
    h3_supports: 'Using @supports',

    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'What is the difference between CSS variables and CSS custom properties?',
    faq1_a: 'They are the same thing. "CSS Custom Properties" is the official W3C specification name, while "CSS Variables" is the commonly used informal name. The formal specification is called "CSS Custom Properties for Cascading Variables." When people say "CSS variables," they mean properties declared with the -- prefix and accessed via the var() function.',
    faq2_q: 'Can CSS custom properties be animated or transitioned?',
    faq2_a: 'By default, no. CSS custom properties are treated as strings, so the browser cannot interpolate between values. However, using the @property rule (part of CSS Houdini), you can register a property with a specific syntax like <length>, <color>, or <number>. Once registered, the browser knows the type and can smoothly animate or transition between values. This works in Chrome, Edge, Safari 15.4+, and Firefox 128+.',
    faq3_q: 'Do CSS variables affect performance?',
    faq3_a: 'The performance impact of CSS variables is negligible for typical use cases. The browser resolves variable references during style computation, which adds a tiny overhead compared to hard-coded values. However, deeply nested variable references (var(--a) referencing var(--b) referencing var(--c)...) can increase computation time. In practice, even complex design systems with hundreds of variables perform well. The runtime flexibility they provide far outweighs the minimal performance cost.',
    faq4_q: 'Can I use CSS variables inside media queries or selectors?',
    faq4_a: 'You can change the value of a CSS variable inside a media query (e.g., @media (max-width: 768px) { :root { --font-size: 14px; } }), and it will automatically update everywhere that variable is used. However, you cannot use var() in the media query condition itself (e.g., @media (max-width: var(--breakpoint)) does NOT work). You also cannot use var() in selector strings. Variables work only in property values.',
    faq5_q: 'How do CSS variables work with the Shadow DOM in Web Components?',
    faq5_a: 'CSS custom properties are one of the few styling mechanisms that penetrate the Shadow DOM boundary. While regular CSS selectors cannot reach inside a shadow root, inherited custom properties flow through naturally. This makes CSS variables the recommended API for theming Web Components: the host page sets variables (--button-bg, --button-color), and the component\'s internal styles use var(--button-bg, defaultValue) to read them. This provides a clean, explicit styling API without breaking encapsulation.',

    conclusion: 'CSS custom properties have transformed how we approach styling on the web. They bring variables, theming, and dynamic styling capabilities natively to the browser. Combined with @property for type-safe animations and JavaScript interoperability, they are an essential tool for every modern web developer.',
    linkToolBottom: 'Build your color palette with our Color Palette Generator \u2192',
  },
  zh: {
    intro: 'CSS 变量，正式名称为 <strong>CSS 自定义属性</strong>（CSS Custom Properties），从根本上改变了我们编写和维护样式表的方式。它们将变量的能力——以前只能通过 Sass 等预处理器使用——直接带入浏览器，并附带级联、继承和通过 JavaScript 运行时操作的额外优势。本<strong>完整 CSS 自定义属性指南</strong>涵盖从基本语法和作用域规则到动态主题、颜色系统、使用 <code>@property</code> 制作动画以及实际组件模式的所有内容。',
    linkTool: '使用我们的颜色转换器工具可视化探索颜色 \u2192',

    h2_syntax: '1. 语法：声明和使用 CSS 变量',
    syntaxDesc: 'CSS 自定义属性遵循简单的两部分语法：使用双连字符前缀（<code>--</code>）声明，使用 <code>var()</code> 函数消费。<code>var()</code> 函数还支持可选的回退值，当属性未定义时使用。',
    h3_declaring: '声明自定义属性',
    h3_using: '使用 var() 和回退值',
    h3_multiple_fallback: '嵌套回退和组合',

    h2_scope: '2. 作用域与级联',
    scopeDesc: '与 Sass 变量在编译时解析不同，CSS 自定义属性参与级联。它们默认继承，可以作用域限定到任何选择器，并且可以在 DOM 树的任何级别被覆盖。',
    h3_global: '使用 :root 的全局变量',
    h3_component: '组件级作用域',
    h3_inheritance: '继承与覆盖',
    inheritanceDesc: '自定义属性像 <code>color</code> 或 <code>font-size</code> 一样沿 DOM 树向下继承。子元素可以读取任何祖先设置的变量，任何元素都可以为其子树覆盖变量。',

    h2_theming: '3. 动态主题',
    themingDesc: 'CSS 变量最强大的应用之一是动态主题。通过更改几个变量值，你可以完全改变网站的外观——无需在各个元素上切换类名。',
    h3_dark_toggle: '使用 CSS 变量切换深色模式',
    h3_prefers: 'prefers-color-scheme 媒体查询',
    h3_theme_switching: '多主题切换',

    h2_colors: '4. 使用 CSS 变量构建颜色系统',
    colorsDesc: 'CSS 变量非常擅长构建系统化的调色板。HSL 颜色模型特别强大，因为你可以独立操作色相、饱和度和明度。',
    h3_hsl: 'HSL 方法构建调色板',
    h3_semantic: '语义化颜色令牌',
    h3_opacity: 'Alpha / 透明度变化',

    h2_spacing: '5. 间距与排版系统',
    spacingDesc: '一致的间距比例和流体排版系统是任何设计良好界面的基础。CSS 变量使两者都易于定义、维护和覆盖。',
    h3_spacing_scale: '间距比例',
    h3_fluid_type: '使用 clamp() 的流体排版',
    h3_type_scale: '字体比例系统',

    h2_vs_sass: '6. CSS 变量 vs Sass 变量',
    vsSassDesc: 'CSS 自定义属性和 Sass 变量都用于减少重复，但它们的工作方式根本不同。选择并非非此即彼——许多项目同时使用两者。',
    h3_comparison: '对比表',
    th_feature: '特性',
    th_css_vars: 'CSS 自定义属性',
    th_sass_vars: 'Sass 变量',
    td_resolved: '解析时机',
    td_css_runtime: '运行时（浏览器）',
    td_sass_compile: '编译时（构建）',
    td_cascade_feat: '级联',
    td_css_yes: '是 \u2014 继承、可覆盖',
    td_sass_no_cascade: '否 \u2014 扁平作用域',
    td_js_access: 'JS 访问',
    td_css_js_yes: '是 \u2014 可从 JS 读写',
    td_sass_js_no: '否 \u2014 编译后消失',
    td_media_q: '媒体查询',
    td_css_media_yes: '是 \u2014 可在 @media 中更改',
    td_sass_media_no: '仅编译时',
    td_functions: '函数',
    td_css_fn_limited: '仅 calc()',
    td_sass_fn_rich: '丰富的函数、循环、混入',
    td_browser: '浏览器支持',
    td_css_browser: '97%+（所有现代浏览器）',
    td_sass_browser: '编译为 CSS \u2014 通用',
    td_performance: '性能',
    td_css_perf: '微小的运行时开销',
    td_sass_perf: '零运行时开销',
    h3_when_use: '何时使用哪个',
    whenUseDesc: '<strong>使用 CSS 变量</strong>处理运行时变化的内容：主题、响应式调整、用户偏好、组件 API 接口。<strong>使用 Sass 变量</strong>处理静态设计令牌、构建期间的复杂计算、条件编译和生成实用工具类。<strong>最佳实践：</strong>将设计令牌定义为 Sass 变量，然后将它们暴露为 CSS 自定义属性以获得运行时灵活性。',

    h2_js: '7. JavaScript 交互',
    jsDesc: 'CSS 自定义属性可以从 JavaScript 读取和写入，使其成为 CSS 和 JS 之间的强大桥梁。这使得动态样式设置无需在每个元素上管理内联样式。',
    h3_reading: '从 JS 读取 CSS 变量',
    h3_writing: '从 JS 写入 CSS 变量',
    h3_reactive: '响应式模式',

    h2_animation: '8. 使用 CSS 变量制作动画',
    animationDesc: '默认情况下，CSS 自定义属性无法制作动画，因为浏览器不知道它们持有什么类型的值。<code>@property</code> 规则通过注册具有特定语法的属性来解决这个问题。',
    h3_problem: '问题：为什么变量无法动画化',
    h3_solution: '解决方案：@property 注册',
    h3_gradient_anim: '动画渐变背景',

    h2_property: '9. @property 规则',
    propertyDesc: '<code>@property</code> 规则是 CSS Houdini 规范的一部分。它允许你正式注册一个自定义属性，包含类型、初始值和继承行为。这解锁了动画和验证功能。',
    h3_syntax_prop: '完整语法',
    h3_types: '支持的类型',
    h3_typed_examples: '实用的类型化属性',

    h2_components: '10. 组件模式',
    componentsDesc: 'CSS 变量为组件创建了清晰的 API。消费者从外部设置变量，而不是覆盖内部选择器。此模式适用于任何框架或纯 HTML。',
    h3_button: '按钮组件',
    h3_card: '卡片组件',
    h3_input: '表单输入组件',

    h2_support: '11. 浏览器支持与回退',
    supportDesc: 'CSS 自定义属性在所有现代浏览器中都受支持。但如果你需要支持旧版浏览器，有几种回退策略。',
    h3_support_table: '当前浏览器支持',
    supportTableDesc: '截至 2025 年，CSS 自定义属性拥有<strong>超过 97% 的全球支持率</strong>。它们在 Chrome 49+、Firefox 31+、Safari 9.1+、Edge 15+ 和所有基于 Chromium 的浏览器中工作。<code>@property</code> 规则支持范围更有限（Chrome 85+、Safari 15.4+、Firefox 128+）。',
    h3_fallback_strat: '回退策略',
    h3_supports: '使用 @supports',

    h2_faq: '12. 常见问题',
    faq1_q: 'CSS 变量和 CSS 自定义属性有什么区别？',
    faq1_a: '它们是同一个东西。"CSS 自定义属性"（CSS Custom Properties）是官方 W3C 规范名称，而 "CSS 变量"是常用的非正式名称。正式规范称为"用于级联变量的 CSS 自定义属性"。当人们说"CSS 变量"时，他们指的是用 -- 前缀声明并通过 var() 函数访问的属性。',
    faq2_q: 'CSS 自定义属性可以做动画或过渡吗？',
    faq2_a: '默认不可以。CSS 自定义属性被视为字符串，因此浏览器无法在值之间插值。但是，使用 @property 规则（CSS Houdini 的一部分），你可以注册具有特定语法（如 <length>、<color> 或 <number>）的属性。注册后，浏览器知道类型并可以平滑地在值之间做动画或过渡。这在 Chrome、Edge、Safari 15.4+ 和 Firefox 128+ 中有效。',
    faq3_q: 'CSS 变量会影响性能吗？',
    faq3_a: '对于典型用例，CSS 变量的性能影响可以忽略不计。浏览器在样式计算期间解析变量引用，与硬编码值相比增加了微小的开销。但是，深度嵌套的变量引用（var(--a) 引用 var(--b) 引用 var(--c)...）可能会增加计算时间。实际上，即使是拥有数百个变量的复杂设计系统也能表现良好。它们提供的运行时灵活性远远超过了最小的性能成本。',
    faq4_q: '我可以在媒体查询或选择器中使用 CSS 变量吗？',
    faq4_a: '你可以在媒体查询内部更改 CSS 变量的值（例如 @media (max-width: 768px) { :root { --font-size: 14px; } }），它会自动更新使用该变量的所有地方。但是，你不能在媒体查询条件本身中使用 var()（例如 @media (max-width: var(--breakpoint)) 不起作用）。你也不能在选择器字符串中使用 var()。变量只能在属性值中使用。',
    faq5_q: 'CSS 变量如何与 Web Components 的 Shadow DOM 配合工作？',
    faq5_a: 'CSS 自定义属性是少数几种能穿透 Shadow DOM 边界的样式机制之一。虽然常规 CSS 选择器无法到达 shadow root 内部，但继承的自定义属性会自然地流入。这使得 CSS 变量成为 Web Components 主题化的推荐 API：宿主页面设置变量（--button-bg、--button-color），组件内部样式使用 var(--button-bg, defaultValue) 来读取它们。这提供了清晰、明确的样式 API，而不会破坏封装性。',

    conclusion: 'CSS 自定义属性已经改变了我们在 Web 上处理样式的方式。它们将变量、主题和动态样式功能原生地带入浏览器。结合 @property 实现类型安全的动画和 JavaScript 互操作性，它们是每个现代 Web 开发者的必备工具。',
    linkToolBottom: '使用我们的调色板生成器构建你的颜色系统 \u2192',
  },
};

export default function CssVariablesCustomPropertiesGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/color-converter`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: Syntax */}
      <h2>{s.h2_syntax}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.syntaxDesc }} />

      <h3>{s.h3_declaring}</h3>
      <pre><code>{`/* Declaring CSS custom properties */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-size-base: 16px;
  --spacing-unit: 8px;
  --border-radius: 8px;
  --font-family: 'Inter', system-ui, sans-serif;
  --transition-speed: 200ms;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Using them in rules */
.button {
  background-color: var(--color-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  font-family: var(--font-family);
  transition: background-color var(--transition-speed) ease;
  box-shadow: var(--shadow-sm);
}`}</code></pre>

      <h3>{s.h3_using}</h3>
      <pre><code>{`/* var() with fallback value */
.element {
  /* If --accent is not defined, use #e11d48 */
  color: var(--accent, #e11d48);

  /* Fallback can be another variable */
  background: var(--bg-card, var(--bg-primary, #ffffff));

  /* Fallback with full value including commas */
  font-family: var(--font-stack, 'Helvetica Neue', Arial, sans-serif);
}

/* Common pattern: fallback to a default theme */
.card {
  background: var(--card-bg, var(--surface-color, #1e293b));
  color: var(--card-text, var(--text-primary, #f8fafc));
  padding: var(--card-padding, 24px);
}`}</code></pre>

      <h3>{s.h3_multiple_fallback}</h3>
      <pre><code>{`/* Composing variables with calc() */
:root {
  --base: 8px;
  --scale: 1.5;
}

.component {
  /* Math with variables */
  padding: calc(var(--base) * 2);           /* 16px */
  margin-bottom: calc(var(--base) * 3);     /* 24px */
  gap: calc(var(--base) * var(--scale));     /* 12px */
}

/* String-like composition (for building values) */
:root {
  --h: 220;
  --s: 90%;
  --l: 56%;
}

.element {
  /* Build a full HSL color from parts */
  color: hsl(var(--h), var(--s), var(--l));
  /* Darken by adjusting lightness */
  border-color: hsl(var(--h), var(--s), calc(var(--l) - 10%));
}`}</code></pre>

      {/* Section 2: Scope & Cascade */}
      <h2>{s.h2_scope}</h2>
      <p>{s.scopeDesc}</p>

      <h3>{s.h3_global}</h3>
      <pre><code>{`/* :root = <html> element — highest specificity for globals */
:root {
  --color-brand: #3b82f6;
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;

  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;

  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: #1e293b;
}

/* Every element in the page can now use these */
body {
  color: var(--text-primary);
  background: var(--bg-primary);
}`}</code></pre>

      <h3>{s.h3_component}</h3>
      <pre><code>{`/* Variables scoped to a component */
.alert {
  --alert-bg: #1e293b;
  --alert-border: #334155;
  --alert-text: #e2e8f0;
  --alert-icon-size: 20px;

  background: var(--alert-bg);
  border: 1px solid var(--alert-border);
  color: var(--alert-text);
  padding: 16px;
  border-radius: 8px;
}

/* Variants override the component-scoped variables */
.alert--danger {
  --alert-bg: #450a0a;
  --alert-border: #ef4444;
  --alert-text: #fecaca;
}

.alert--success {
  --alert-bg: #052e16;
  --alert-border: #22c55e;
  --alert-text: #bbf7d0;
}

.alert--warning {
  --alert-bg: #451a03;
  --alert-border: #f59e0b;
  --alert-text: #fef3c7;
}`}</code></pre>

      <h3>{s.h3_inheritance}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.inheritanceDesc }} />
      <pre><code>{`/* Parent sets the variable */
.sidebar {
  --link-color: #60a5fa;
}

/* Child inherits it */
.sidebar a {
  color: var(--link-color);  /* #60a5fa */
}

/* Grandchild can override */
.sidebar .promo-section {
  --link-color: #f59e0b;     /* override for this subtree */
}

.sidebar .promo-section a {
  color: var(--link-color);  /* #f59e0b */
}

/* Variables NOT inherited by siblings or parents */
.main-content a {
  /* This will NOT be #60a5fa — falls back to default */
  color: var(--link-color, #3b82f6);
}`}</code></pre>

      {/* Section 3: Dynamic Theming */}
      <h2>{s.h2_theming}</h2>
      <p>{s.themingDesc}</p>

      <h3>{s.h3_dark_toggle}</h3>
      <pre><code>{`/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f1f5f9;
  --bg-card: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Dark theme — toggled via class on <html> or <body> */
:root.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-card: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* All components use the variables — theme changes automatically */
body { background: var(--bg-primary); color: var(--text-primary); }
.card { background: var(--bg-card); border: 1px solid var(--border-color); box-shadow: var(--shadow); }
.text-muted { color: var(--text-secondary); }`}</code></pre>

      <pre><code>{`// Toggle dark mode with JavaScript
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  // Persist preference
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Apply saved preference on load
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}`}</code></pre>

      <h3>{s.h3_prefers}</h3>
      <pre><code>{`/* Auto-detect OS/browser dark mode preference */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;
    --border-color: #334155;
  }
}

/* Combine with manual override */
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --bg-primary: #0f172a;
    --text-primary: #f8fafc;
    /* ... dark values */
  }
}

@media (prefers-color-scheme: light) {
  :root:not(.dark) {
    --bg-primary: #ffffff;
    --text-primary: #0f172a;
    /* ... light values */
  }
}`}</code></pre>

      <h3>{s.h3_theme_switching}</h3>
      <pre><code>{`/* Define multiple themes using data attributes */
:root,
[data-theme="default"] {
  --brand: #3b82f6;
  --brand-light: #93c5fd;
  --accent: #8b5cf6;
}

[data-theme="sunset"] {
  --brand: #f97316;
  --brand-light: #fdba74;
  --accent: #ef4444;
}

[data-theme="forest"] {
  --brand: #22c55e;
  --brand-light: #86efac;
  --accent: #14b8a6;
}

[data-theme="ocean"] {
  --brand: #0ea5e9;
  --brand-light: #7dd3fc;
  --accent: #6366f1;
}`}</code></pre>

      <pre><code>{`// Switch themes from JavaScript
function setTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
}

// Usage
setTheme('sunset');
setTheme('forest');
setTheme('default');`}</code></pre>

      {/* Section 4: Color Systems */}
      <h2>{s.h2_colors}</h2>
      <p>{s.colorsDesc}</p>

      <h3>{s.h3_hsl}</h3>
      <pre><code>{`/* HSL-based color palette — change one hue to update entire palette */
:root {
  /* Primary color — change --primary-h to shift the whole palette */
  --primary-h: 220;
  --primary-s: 90%;

  --primary-50:  hsl(var(--primary-h), var(--primary-s), 97%);
  --primary-100: hsl(var(--primary-h), var(--primary-s), 93%);
  --primary-200: hsl(var(--primary-h), var(--primary-s), 83%);
  --primary-300: hsl(var(--primary-h), var(--primary-s), 73%);
  --primary-400: hsl(var(--primary-h), var(--primary-s), 63%);
  --primary-500: hsl(var(--primary-h), var(--primary-s), 53%);  /* base */
  --primary-600: hsl(var(--primary-h), var(--primary-s), 43%);
  --primary-700: hsl(var(--primary-h), var(--primary-s), 33%);
  --primary-800: hsl(var(--primary-h), var(--primary-s), 23%);
  --primary-900: hsl(var(--primary-h), var(--primary-s), 13%);

  /* Secondary — just change hue */
  --secondary-h: 270;
  --secondary-s: 80%;
  --secondary-500: hsl(var(--secondary-h), var(--secondary-s), 53%);
}

/* To create a completely different color scheme, change one value: */
:root.warm {
  --primary-h: 15;  /* orange */
}`}</code></pre>

      <h3>{s.h3_semantic}</h3>
      <pre><code>{`/* Map raw colors to semantic tokens */
:root {
  /* Raw palette (primitive tokens) */
  --blue-500: #3b82f6;
  --blue-600: #2563eb;
  --red-500: #ef4444;
  --green-500: #22c55e;
  --gray-100: #f1f5f9;
  --gray-800: #1e293b;
  --gray-900: #0f172a;

  /* Semantic tokens (reference tokens) */
  --color-action: var(--blue-500);
  --color-action-hover: var(--blue-600);
  --color-error: var(--red-500);
  --color-success: var(--green-500);
  --color-bg: var(--gray-900);
  --color-surface: var(--gray-800);
  --color-text: var(--gray-100);
}

/* Components use semantic tokens, never raw colors */
.btn-primary {
  background: var(--color-action);
}
.btn-primary:hover {
  background: var(--color-action-hover);
}
.error-message {
  color: var(--color-error);
}`}</code></pre>

      <h3>{s.h3_opacity}</h3>
      <pre><code>{`/* Modern approach: store components, compose in usage */
:root {
  --brand-rgb: 59, 130, 246;
  --danger-rgb: 239, 68, 68;
}

.overlay {
  background: rgba(var(--brand-rgb), 0.1);   /* 10% opacity */
}
.overlay-hover:hover {
  background: rgba(var(--brand-rgb), 0.2);   /* 20% opacity */
}
.border-subtle {
  border: 1px solid rgba(var(--brand-rgb), 0.3);
}

/* Modern CSS: using color-mix() (no RGB splitting needed) */
:root {
  --brand: #3b82f6;
}

.element {
  /* 20% brand color mixed with transparent */
  background: color-mix(in srgb, var(--brand) 20%, transparent);
  /* 50% brand color */
  border-color: color-mix(in srgb, var(--brand) 50%, transparent);
}`}</code></pre>

      {/* Section 5: Spacing & Typography */}
      <h2>{s.h2_spacing}</h2>
      <p>{s.spacingDesc}</p>

      <h3>{s.h3_spacing_scale}</h3>
      <pre><code>{`/* 8px-based spacing scale */
:root {
  --space-1:  4px;    /* 0.25rem */
  --space-2:  8px;    /* 0.5rem  */
  --space-3:  12px;   /* 0.75rem */
  --space-4:  16px;   /* 1rem    */
  --space-5:  20px;   /* 1.25rem */
  --space-6:  24px;   /* 1.5rem  */
  --space-8:  32px;   /* 2rem    */
  --space-10: 40px;   /* 2.5rem  */
  --space-12: 48px;   /* 3rem    */
  --space-16: 64px;   /* 4rem    */
  --space-20: 80px;   /* 5rem    */
}

/* Usage: consistent spacing everywhere */
.card {
  padding: var(--space-6);
  gap: var(--space-4);
}

.section {
  padding-block: var(--space-16);
}

.stack > * + * {
  margin-top: var(--space-4);
}`}</code></pre>

      <h3>{s.h3_fluid_type}</h3>
      <pre><code>{`/* Fluid typography: scales between viewport widths */
:root {
  /* clamp(min, preferred, max) */
  --text-sm:  clamp(0.8rem,  0.17vw + 0.76rem,  0.89rem);
  --text-base: clamp(1rem,    0.34vw + 0.91rem,  1.19rem);
  --text-lg:  clamp(1.25rem, 0.61vw + 1.1rem,   1.58rem);
  --text-xl:  clamp(1.56rem, 1vw + 1.31rem,     2.11rem);
  --text-2xl: clamp(1.95rem, 1.56vw + 1.56rem,  2.81rem);
  --text-3xl: clamp(2.44rem, 2.38vw + 1.85rem,  3.75rem);
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
p  { font-size: var(--text-base); }
small { font-size: var(--text-sm); }`}</code></pre>

      <h3>{s.h3_type_scale}</h3>
      <pre><code>{`/* Modular type scale using calc() */
:root {
  --type-base: 1rem;
  --type-ratio: 1.25;  /* Major third scale */

  --type-sm:  calc(var(--type-base) / var(--type-ratio));
  --type-md:  var(--type-base);
  --type-lg:  calc(var(--type-base) * var(--type-ratio));
  --type-xl:  calc(var(--type-base) * var(--type-ratio) * var(--type-ratio));
  --type-2xl: calc(var(--type-base) * var(--type-ratio) * var(--type-ratio) * var(--type-ratio));

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

/* Responsive: change base and ratio, everything scales */
@media (min-width: 1024px) {
  :root {
    --type-base: 1.125rem;
    --type-ratio: 1.333;  /* Perfect fourth on large screens */
  }
}`}</code></pre>

      {/* Section 6: CSS Variables vs Sass Variables */}
      <h2>{s.h2_vs_sass}</h2>
      <p>{s.vsSassDesc}</p>

      <h3>{s.h3_comparison}</h3>
      <table>
        <thead>
          <tr>
            <th>{s.th_feature}</th>
            <th>{s.th_css_vars}</th>
            <th>{s.th_sass_vars}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>{s.td_resolved}</td><td>{s.td_css_runtime}</td><td>{s.td_sass_compile}</td></tr>
          <tr><td>{s.td_cascade_feat}</td><td>{s.td_css_yes}</td><td>{s.td_sass_no_cascade}</td></tr>
          <tr><td>{s.td_js_access}</td><td>{s.td_css_js_yes}</td><td>{s.td_sass_js_no}</td></tr>
          <tr><td>{s.td_media_q}</td><td>{s.td_css_media_yes}</td><td>{s.td_sass_media_no}</td></tr>
          <tr><td>{s.td_functions}</td><td>{s.td_css_fn_limited}</td><td>{s.td_sass_fn_rich}</td></tr>
          <tr><td>{s.td_browser}</td><td>{s.td_css_browser}</td><td>{s.td_sass_browser}</td></tr>
          <tr><td>{s.td_performance}</td><td>{s.td_css_perf}</td><td>{s.td_sass_perf}</td></tr>
        </tbody>
      </table>

      <h3>{s.h3_when_use}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.whenUseDesc }} />
      <pre><code>{`/* Best practice: Sass variables → CSS custom properties */

/* _tokens.scss (Sass source) */
$color-primary: #3b82f6;
$color-secondary: #8b5cf6;
$spacing-base: 8px;
$font-stack: 'Inter', system-ui, sans-serif;
$breakpoint-md: 768px;

/* Expose as CSS custom properties */
:root {
  --color-primary: #{$color-primary};
  --color-secondary: #{$color-secondary};
  --spacing-base: #{$spacing-base};
  --font-stack: #{$font-stack};
}

/* Use Sass for build-time logic */
@for $i from 1 through 8 {
  .space-#{$i} {
    --space: calc(var(--spacing-base) * #{$i});
    margin: var(--space);
  }
}

/* Use CSS variables for runtime values */
.component {
  color: var(--color-primary);
  font-family: var(--font-stack);
}`}</code></pre>

      {/* Section 7: JavaScript Interaction */}
      <h2>{s.h2_js}</h2>
      <p>{s.jsDesc}</p>

      <h3>{s.h3_reading}</h3>
      <pre><code>{`// Read a CSS variable from :root
const root = document.documentElement;
const styles = getComputedStyle(root);

const primaryColor = styles.getPropertyValue('--color-primary').trim();
console.log(primaryColor); // "#3b82f6"

// Read from a specific element
const card = document.querySelector('.card');
const cardBg = getComputedStyle(card).getPropertyValue('--card-bg').trim();

// Read all CSS variables on an element
function getCSSVariables(element) {
  const styles = getComputedStyle(element);
  const vars = {};
  for (const prop of styles) {
    if (prop.startsWith('--')) {
      vars[prop] = styles.getPropertyValue(prop).trim();
    }
  }
  return vars;
}`}</code></pre>

      <h3>{s.h3_writing}</h3>
      <pre><code>{`// Set a CSS variable on :root (affects entire page)
document.documentElement.style.setProperty('--color-primary', '#e11d48');

// Set on a specific element (affects element + descendants)
const sidebar = document.querySelector('.sidebar');
sidebar.style.setProperty('--sidebar-width', '300px');

// Remove a custom property (revert to inherited/default)
document.documentElement.style.removeProperty('--color-primary');

// Dynamic theming based on user input
const colorPicker = document.getElementById('brand-color');
colorPicker.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--brand', e.target.value);
});

// Set multiple variables at once
function applyTheme(theme) {
  const root = document.documentElement.style;
  Object.entries(theme).forEach(([key, value]) => {
    root.setProperty(key, value);
  });
}

applyTheme({
  '--bg-primary': '#0f172a',
  '--text-primary': '#f8fafc',
  '--brand': '#3b82f6',
});`}</code></pre>

      <h3>{s.h3_reactive}</h3>
      <pre><code>{`// React: CSS variables as component API
function Card({ accentColor, padding, children }) {
  return (
    <div
      className="card"
      style={{
        '--card-accent': accentColor,
        '--card-padding': padding,
      }}
    >
      {children}
    </div>
  );
}

// Vue 3: v-bind in <style>
// <style scoped>
// .element {
//   color: v-bind('themeColor');  /* compiles to CSS variable */
// }
// </style>

// Vanilla JS: Respond to scroll position
window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--scroll', scrollPercent);
});

// CSS uses the variable
// .progress-bar { transform: scaleX(var(--scroll)); }
// .parallax     { transform: translateY(calc(var(--scroll) * -50px)); }`}</code></pre>

      {/* Section 8: Animation with CSS Variables */}
      <h2>{s.h2_animation}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.animationDesc }} />

      <h3>{s.h3_problem}</h3>
      <pre><code>{`/* This does NOT work — browser treats variables as strings */
:root {
  --box-width: 100px;
}

.box {
  width: var(--box-width);
  transition: width 0.3s ease;  /* ← will NOT animate */
}

.box:hover {
  --box-width: 300px;  /* Jumps instantly, no transition */
}

/* Why? The browser sees: transition on 'width', but the value
   change happens to '--box-width' (a string). The browser
   doesn't know --box-width contains a <length>. */`}</code></pre>

      <h3>{s.h3_solution}</h3>
      <pre><code>{`/* Register the property with @property — now it animates! */
@property --box-width {
  syntax: '<length>';
  initial-value: 100px;
  inherits: false;
}

.box {
  width: var(--box-width);
  transition: --box-width 0.3s ease;  /* transition the PROPERTY itself */
}

.box:hover {
  --box-width: 300px;  /* Now smoothly animates! */
}

/* Animated color shift */
@property --glow-color {
  syntax: '<color>';
  initial-value: #3b82f6;
  inherits: false;
}

.glow-button {
  box-shadow: 0 0 20px var(--glow-color);
  transition: --glow-color 0.5s ease;
}

.glow-button:hover {
  --glow-color: #ec4899;  /* Smooth color transition in shadow */
}`}</code></pre>

      <h3>{s.h3_gradient_anim}</h3>
      <pre><code>{`/* Animate gradient positions with @property */
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@property --color-1 {
  syntax: '<color>';
  initial-value: #3b82f6;
  inherits: false;
}

@property --color-2 {
  syntax: '<color>';
  initial-value: #8b5cf6;
  inherits: false;
}

.animated-gradient {
  background: linear-gradient(
    var(--gradient-angle),
    var(--color-1),
    var(--color-2)
  );
  animation: gradient-rotate 4s linear infinite;
}

@keyframes gradient-rotate {
  0%   { --gradient-angle: 0deg;   --color-1: #3b82f6; --color-2: #8b5cf6; }
  33%  { --gradient-angle: 120deg; --color-1: #ec4899; --color-2: #f59e0b; }
  66%  { --gradient-angle: 240deg; --color-1: #22c55e; --color-2: #06b6d4; }
  100% { --gradient-angle: 360deg; --color-1: #3b82f6; --color-2: #8b5cf6; }
}`}</code></pre>

      {/* Section 9: @property Rule */}
      <h2>{s.h2_property}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.propertyDesc }} />

      <h3>{s.h3_syntax_prop}</h3>
      <pre><code>{`@property --property-name {
  syntax: '<type>';        /* Required: what type of value this holds */
  initial-value: value;    /* Required (if inherits: false): default value */
  inherits: true | false;  /* Required: does it inherit down the DOM? */
}

/* Examples */
@property --my-color {
  syntax: '<color>';
  initial-value: #3b82f6;
  inherits: true;
}

@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

@property --columns {
  syntax: '<integer>';
  initial-value: 3;
  inherits: false;
}`}</code></pre>

      <h3>{s.h3_types}</h3>
      <pre><code>{`/* All supported syntax types for @property */

'<length>'           /* 10px, 2rem, 50vh */
'<number>'           /* 1.5, 42, 0.8 */
'<percentage>'       /* 50%, 100% */
'<length-percentage>'/* 10px or 50% */
'<color>'            /* #fff, rgb(), hsl(), named colors */
'<image>'            /* url(), gradient functions */
'<url>'              /* url(...) */
'<integer>'          /* 1, 2, 3 (whole numbers) */
'<angle>'            /* 45deg, 0.5turn, 100grad */
'<time>'             /* 200ms, 1.5s */
'<resolution>'       /* 96dpi, 2dppx */
'<transform-function>'  /* rotate(), scale(), translate() */
'<transform-list>'   /* multiple transforms */
'<custom-ident>'     /* any identifier */
'*'                  /* any value (universal) */

/* Combining types */
'<length> | <percentage>'  /* either type */
'<color>+'                 /* space-separated list of colors */
'<length>#'                /* comma-separated list of lengths */`}</code></pre>

      <h3>{s.h3_typed_examples}</h3>
      <pre><code>{`/* Circular progress indicator */
@property --progress {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.circular-progress {
  --progress: 0%;
  background: conic-gradient(
    var(--color-primary) var(--progress),
    var(--bg-secondary) var(--progress)
  );
  border-radius: 50%;
  width: 100px;
  height: 100px;
  transition: --progress 1s ease-out;
}

.circular-progress.loaded {
  --progress: 75%;
}

/* Counting animation */
@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.counter {
  animation: count-up 2s ease-out forwards;
  counter-reset: num var(--num);
}

.counter::after {
  content: counter(num);
}

@keyframes count-up {
  to { --num: 1000; }
}`}</code></pre>

      {/* Section 10: Component Patterns */}
      <h2>{s.h2_components}</h2>
      <p>{s.componentsDesc}</p>

      <h3>{s.h3_button}</h3>
      <pre><code>{`/* Button with CSS variable API */
.btn {
  /* Internal defaults — consumers override these */
  --btn-bg: #3b82f6;
  --btn-color: #ffffff;
  --btn-border: transparent;
  --btn-radius: 8px;
  --btn-padding-x: 20px;
  --btn-padding-y: 10px;
  --btn-font-size: 0.875rem;
  --btn-hover-bg: color-mix(in srgb, var(--btn-bg), black 15%);

  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: var(--btn-padding-y) var(--btn-padding-x);
  background: var(--btn-bg);
  color: var(--btn-color);
  border: 2px solid var(--btn-border);
  border-radius: var(--btn-radius);
  font-size: var(--btn-font-size);
  cursor: pointer;
  transition: background 200ms ease;
}

.btn:hover {
  background: var(--btn-hover-bg);
}

/* Variants just override variables */
.btn-secondary {
  --btn-bg: transparent;
  --btn-color: #3b82f6;
  --btn-border: #3b82f6;
  --btn-hover-bg: rgba(59, 130, 246, 0.1);
}

.btn-danger {
  --btn-bg: #ef4444;
  --btn-hover-bg: #dc2626;
}

.btn-lg {
  --btn-padding-x: 32px;
  --btn-padding-y: 14px;
  --btn-font-size: 1rem;
}`}</code></pre>

      <h3>{s.h3_card}</h3>
      <pre><code>{`/* Card component with variable API */
.card {
  --card-bg: var(--bg-card, #1e293b);
  --card-border: var(--border-color, #334155);
  --card-radius: 12px;
  --card-padding: 24px;
  --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --card-hover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);

  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding: var(--card-padding);
  box-shadow: var(--card-shadow);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-2px);
}

.card-compact {
  --card-padding: 16px;
  --card-radius: 8px;
}

.card-featured {
  --card-border: var(--color-primary, #3b82f6);
  --card-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.15);
  --card-hover-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.25);
}`}</code></pre>

      <h3>{s.h3_input}</h3>
      <pre><code>{`/* Form input with variable API */
.input {
  --input-bg: var(--bg-secondary, #1e293b);
  --input-border: var(--border-color, #334155);
  --input-text: var(--text-primary, #f8fafc);
  --input-placeholder: var(--text-secondary, #64748b);
  --input-focus-border: var(--color-primary, #3b82f6);
  --input-radius: 8px;
  --input-padding: 10px 14px;
  --input-font-size: 0.875rem;

  width: 100%;
  padding: var(--input-padding);
  background: var(--input-bg);
  border: 2px solid var(--input-border);
  border-radius: var(--input-radius);
  color: var(--input-text);
  font-size: var(--input-font-size);
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.input::placeholder {
  color: var(--input-placeholder);
}

.input:focus {
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

/* Error state */
.input-error {
  --input-border: var(--color-error, #ef4444);
  --input-focus-border: var(--color-error, #ef4444);
}

/* Success state */
.input-success {
  --input-border: var(--color-success, #22c55e);
  --input-focus-border: var(--color-success, #22c55e);
}`}</code></pre>

      {/* Section 11: Browser Support & Fallbacks */}
      <h2>{s.h2_support}</h2>
      <p>{s.supportDesc}</p>

      <h3>{s.h3_support_table}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.supportTableDesc }} />

      <h3>{s.h3_fallback_strat}</h3>
      <pre><code>{`/* Strategy 1: Declare fallback value before the variable usage */
.element {
  /* Old browsers use this */
  color: #3b82f6;
  /* Modern browsers override with the variable */
  color: var(--color-primary, #3b82f6);
}

/* Strategy 2: Cascade fallback */
.card {
  background: #1e293b;                  /* fallback for IE */
  background: var(--bg-card, #1e293b);  /* modern browsers */
  border: 1px solid #334155;
  border: 1px solid var(--border-color, #334155);
}

/* Strategy 3: PostCSS plugin (build-time) */
/* postcss-custom-properties compiles var() to static values */
/* Input: */  .box { color: var(--brand); }
/* Output: */ .box { color: #3b82f6; color: var(--brand); }`}</code></pre>

      <h3>{s.h3_supports}</h3>
      <pre><code>{`/* Feature detection with @supports */
@supports (--css: variables) {
  /* CSS variables are supported */
  :root {
    --color-primary: #3b82f6;
  }

  .element {
    color: var(--color-primary);
  }
}

@supports not (--css: variables) {
  /* Fallback for browsers without CSS variable support */
  .element {
    color: #3b82f6;
  }
}

/* JavaScript feature detection */
// if (window.CSS && window.CSS.supports &&
//     window.CSS.supports('--test', '0')) {
//   // CSS variables supported
// }

/* @property feature detection */
@supports (syntax: '<color>') {
  @property --animated-color {
    syntax: '<color>';
    initial-value: #3b82f6;
    inherits: false;
  }
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

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/color-palette`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      <p style={{ marginTop: 16 }}>
        <Link href={`/${lang}/tools/color-converter`}>Color Converter</Link>
        {' | '}
        <Link href={`/${lang}/tools/color-palette`}>Color Palette Generator</Link>
        {' | '}
        <Link href={`/${lang}/tools/tailwind-colors`}>Tailwind Colors</Link>
      </p>
    </>
  );
}
