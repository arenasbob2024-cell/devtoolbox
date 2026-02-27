'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Tailwind CSS Advanced Guide: v4 Features, Design Systems, Custom Plugins, and Production Optimization',
    description: 'Master advanced Tailwind CSS: v4 CSS-first config with @theme and Lightning CSS, design system tokens and typography scales, custom plugins with addUtilities and matchUtilities, responsive design with container queries, dark mode strategies, animations and transitions, component patterns with CVA and tailwind-merge, React integration with clsx, performance optimization, arbitrary values and group modifiers, grid and flexbox layouts, typography plugin, and v3 to v4 migration guide.',
    tldr: 'Tailwind v4 introduces CSS-first configuration with @theme directives and Lightning CSS for faster builds. Build scalable design systems using design tokens, custom plugins, and component patterns like CVA. Use container queries for component-level responsive design, class-based dark mode for maximum control, and tailwind-merge to handle class conflicts. Optimize production bundles with proper content configuration and tree-shaking. The v3 to v4 migration requires switching from tailwind.config.js to CSS-based configuration.',
    tldrZh: 'Tailwind v4 引入了基于 CSS 的配置方式，使用 @theme 指令和 Lightning CSS 实现更快的构建速度。通过设计令牌、自定义插件和 CVA 等组件模式构建可扩展的设计系统。使用容器查询实现组件级响应式设计，基于 class 的暗色模式获得最大控制力，tailwind-merge 处理类名冲突。通过合理的 content 配置和 tree-shaking 优化生产包体积。从 v3 迁移到 v4 需要从 tailwind.config.js 切换到基于 CSS 的配置。',
  },
  zh: {
    title: 'Tailwind CSS 高级指南：v4 新特性、设计系统、自定义插件与生产优化',
    description: '全面掌握 Tailwind CSS 高级用法：v4 CSS-first 配置与 @theme 和 Lightning CSS、设计系统令牌与排版比例、addUtilities 和 matchUtilities 自定义插件、容器查询响应式设计、暗色模式策略、动画与过渡、CVA 和 tailwind-merge 组件模式、React 集成与 clsx、性能优化、任意值与 group 修饰符、Grid 与 Flexbox 布局、排版插件、v3 到 v4 迁移指南。',
    tldr: 'Tailwind v4 引入了基于 CSS 的配置方式，使用 @theme 指令和 Lightning CSS 实现更快的构建速度。通过设计令牌、自定义插件和 CVA 等组件模式构建可扩展的设计系统。使用容器查询实现组件级响应式设计，基于 class 的暗色模式获得最大控制力，tailwind-merge 处理类名冲突。通过合理的 content 配置和 tree-shaking 优化生产包体积。从 v3 迁移到 v4 需要从 tailwind.config.js 切换到基于 CSS 的配置。',
    tldrZh: 'Tailwind v4 引入了基于 CSS 的配置方式，使用 @theme 指令和 Lightning CSS 实现更快的构建速度。通过设计令牌、自定义插件和 CVA 等组件模式构建可扩展的设计系统。使用容器查询实现组件级响应式设计，基于 class 的暗色模式获得最大控制力，tailwind-merge 处理类名冲突。通过合理的 content 配置和 tree-shaking 优化生产包体积。从 v3 迁移到 v4 需要从 tailwind.config.js 切换到基于 CSS 的配置。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is new in Tailwind CSS v4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tailwind v4 introduces CSS-first configuration using @theme directives instead of tailwind.config.js, Lightning CSS as the default engine for faster builds, automatic content detection without manual config, built-in container queries, wide-gamut P3 color support, and a composable variant system. The new @theme directive lets you define design tokens directly in CSS files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create a design system with Tailwind CSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Build a design system by defining design tokens in your @theme block (colors, spacing, typography scales, border radii). Use CSS custom properties for runtime theming. Create a token hierarchy with semantic names (--color-primary, --color-surface) that map to raw values. Pair with component patterns like CVA for variant-based component APIs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write custom Tailwind CSS plugins?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the plugin API with addUtilities for static utilities, addComponents for component classes, matchUtilities for dynamic value-based utilities, and addVariant for custom variants. Plugins receive a helper object with theme(), config(), and e() (escape) functions. Register plugins in your CSS with @plugin directive in v4.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best dark mode strategy in Tailwind CSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The class strategy (darkMode: "class" or "selector" in v4) provides maximum control by toggling a .dark class on the html or body element. This works with user preferences stored in localStorage and system preference detection via prefers-color-scheme. For multiple themes beyond light/dark, use CSS custom properties with data attributes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is CVA (class-variance-authority) and how does it work with Tailwind?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CVA (class-variance-authority) is a library for creating type-safe component variants with Tailwind. Define a cva() function with base classes, variant definitions (size, color, etc.), compound variants for combinations, and default variants. It generates the correct class string based on props. Pair with tailwind-merge to resolve conflicting classes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I optimize Tailwind CSS for production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tailwind v4 automatically detects content sources and tree-shakes unused utilities. For further optimization: avoid dynamic class construction (use complete class names), leverage the JIT engine for on-demand generation, use @layer to organize custom CSS, minimize arbitrary values in favor of design tokens, and enable CSS minification in your build pipeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do container queries work in Tailwind CSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tailwind v4 has built-in container query support. Mark an element as a container with @container class, then use @sm:, @md:, @lg: prefixes on children to apply styles based on the container width (not viewport). Named containers are supported with @container/sidebar syntax. This enables truly component-level responsive design.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I migrate from Tailwind v3 to v4?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key migration steps: replace tailwind.config.js with CSS-based @theme configuration, switch from @tailwind directives to @import "tailwindcss", update darkMode config to use the selector strategy, replace addVariant plugins with CSS @variant, update PostCSS config (v4 uses its own built-in engine), and run the official npx @tailwindcss/upgrade codemod to automate most changes.',
      },
    },
  ],
};

export default function TailwindAdvancedGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const strongStyle: React.CSSProperties = {
    color: '#0f172a',
  };

  const tipBoxStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '14px 18px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#713f12',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginBottom: '0' }}>
          <li>{isZh ? 'v4 使用 CSS-first 配置和 @theme 指令替代 JS 配置文件' : 'v4 uses CSS-first config with @theme directives replacing JS config files'}</li>
          <li>{isZh ? 'Lightning CSS 引擎提供显著更快的构建速度' : 'Lightning CSS engine provides significantly faster build times'}</li>
          <li>{isZh ? '容器查询实现真正的组件级响应式设计' : 'Container queries enable true component-level responsive design'}</li>
          <li>{isZh ? 'CVA + tailwind-merge 是类型安全组件变体的最佳方案' : 'CVA + tailwind-merge is the best approach for type-safe component variants'}</li>
          <li>{isZh ? '自定义插件通过 addUtilities 和 matchUtilities 扩展框架' : 'Custom plugins extend the framework via addUtilities and matchUtilities'}</li>
          <li>{isZh ? '合理的 content 配置和避免动态类名是性能优化的关键' : 'Proper content config and avoiding dynamic class names are key to performance'}</li>
          <li>{isZh ? '官方 codemod 工具可自动化大部分 v3 到 v4 的迁移' : 'The official codemod tool automates most of the v3 to v4 migration'}</li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={pStyle}>
        {isZh
          ? 'Tailwind CSS 已成为现代前端开发中最流行的实用工具优先 CSS 框架。本指南覆盖 13 个高级主题，从 v4 的全新特性到生产环境优化，帮助你构建可扩展的设计系统和高性能的组件库。每个部分都包含实用代码示例和最佳实践。'
          : 'Tailwind CSS has become the most popular utility-first CSS framework in modern frontend development. This guide covers 13 advanced topics, from v4 new features to production optimization, helping you build scalable design systems and high-performance component libraries. Each section includes practical code examples and best practices.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '无论你是刚接触 Tailwind 的进阶用户，还是正在从 v3 迁移到 v4 的资深开发者，本指南都将提供清晰的代码示例和可操作的建议。我们将深入探讨 CSS-first 配置、自定义插件开发、响应式设计策略、组件变体管理等核心主题。'
          : 'Whether you are an intermediate user new to advanced Tailwind patterns or a veteran developer migrating from v3 to v4, this guide provides clear code examples and actionable advice. We will dive deep into CSS-first configuration, custom plugin development, responsive design strategies, component variant management, and more.'}
      </p>

      {/* Section 1: Tailwind v4 New Features */}
      <h2 style={h2Style}>{isZh ? '1. Tailwind v4 新特性' : '1. Tailwind v4 New Features'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind v4 是一次重大重写。配置从 JavaScript 迁移到 CSS，构建引擎换成了 Lightning CSS，自动内容检测取代了手动配置。@theme 指令让你直接在 CSS 中定义设计令牌。'
          : 'Tailwind v4 is a major rewrite. Configuration moves from JavaScript to CSS, the build engine switches to Lightning CSS, and automatic content detection replaces manual configuration. The @theme directive lets you define design tokens directly in CSS.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'CSS-First 配置与 @theme' : 'CSS-First Config and @theme'}</h3>
      <p style={pStyle}>
        {isZh
          ? '不再需要 tailwind.config.js 文件。所有自定义内容都通过 @theme 指令在 CSS 文件中定义，包括颜色、字体、断点、缓动函数和自定义动画。这意味着你的编辑器可以直接提供 CSS 智能提示，不再需要额外的 JS 配置文件。'
          : 'No more tailwind.config.js file. All customizations are defined via the @theme directive in CSS files, including colors, fonts, breakpoints, easing functions, and custom animations. This means your editor can provide CSS intellisense directly, with no extra JS config file needed.'}
      </p>
      <pre style={preStyle}><code>{'/* tailwind v4 — CSS-first configuration */\n' +
        '@import "tailwindcss";\n\n' +
        '@theme {\n' +
        '  --color-primary: #3b82f6;\n' +
        '  --color-secondary: #8b5cf6;\n' +
        '  --font-display: "Inter", sans-serif;\n' +
        '  --breakpoint-3xl: 1920px;\n' +
        '  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);\n' +
        '}\n\n' +
        '/* Use in HTML: class="text-primary font-display" */\n' +
        '/* Container queries built-in: @container, @sm, @md */'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? 'Lightning CSS 比 PostCSS 快 100 倍以上，支持浏览器目标自动降级、CSS 嵌套和颜色函数，无需额外插件。'
          : 'Lightning CSS is 100x+ faster than PostCSS, supports automatic browser target downleveling, CSS nesting, and color functions without extra plugins.'}
      </div>

      {/* Section 1 additional info */}
      <h3 style={h3Style}>{isZh ? 'v4 核心变化一览' : 'v4 Core Changes at a Glance'}</h3>
      <ul style={ulStyle}>
        <li><strong style={strongStyle}>{isZh ? '构建引擎' : 'Build Engine'}</strong> {isZh ? '— 从 PostCSS 切换到 Lightning CSS，构建速度提升 100 倍以上' : '-- switched from PostCSS to Lightning CSS, 100x+ build speed improvement'}</li>
        <li><strong style={strongStyle}>{isZh ? '配置方式' : 'Configuration'}</strong> {isZh ? '— 从 tailwind.config.js 迁移到 CSS @theme 指令' : '-- migrated from tailwind.config.js to CSS @theme directives'}</li>
        <li><strong style={strongStyle}>{isZh ? '内容检测' : 'Content Detection'}</strong> {isZh ? '— 自动发现和扫描项目文件，无需手动配置 content 数组' : '-- automatic file discovery and scanning, no manual content array needed'}</li>
        <li><strong style={strongStyle}>{isZh ? '容器查询' : 'Container Queries'}</strong> {isZh ? '— 内置支持 @container 和 @sm/@md/@lg 等前缀' : '-- built-in support for @container and @sm/@md/@lg prefixes'}</li>
        <li><strong style={strongStyle}>{isZh ? 'P3 色域' : 'P3 Color Gamut'}</strong> {isZh ? '— 支持宽色域 P3 颜色，在现代显示器上呈现更鲜艳的色彩' : '-- wide-gamut P3 color support for more vibrant colors on modern displays'}</li>
        <li><strong style={strongStyle}>{isZh ? '变体组合' : 'Composable Variants'}</strong> {isZh ? '— 可组合的变体系统，支持 group-hover:focus: 等链式修饰符' : '-- composable variant system supporting chained modifiers like group-hover:focus:'}</li>
      </ul>

      {/* Section 2: Design System with Tailwind */}
      <h2 style={h2Style}>{isZh ? '2. 使用 Tailwind 构建设计系统' : '2. Design System with Tailwind'}</h2>
      <p style={pStyle}>
        {isZh
          ? '设计系统的核心是设计令牌 — 颜色、间距、排版比例和圆角等可复用的值。Tailwind 的 @theme 让你定义语义化令牌，映射到具体值，实现主题切换和一致性。'
          : 'The core of a design system is design tokens -- reusable values for colors, spacing, typography scales, and border radii. Tailwind\'s @theme lets you define semantic tokens that map to concrete values, enabling theme switching and consistency.'}
      </p>
      <h3 style={h3Style}>{isZh ? '令牌层级结构' : 'Token Hierarchy'}</h3>
      <p style={pStyle}>
        {isZh
          ? '建议使用三层令牌结构：原始值（raw colors）、语义令牌（primary、surface）和组件令牌（button-bg、card-border）。这种分层让主题切换只需修改语义层。'
          : 'Use a three-layer token structure: raw values (raw colors), semantic tokens (primary, surface), and component tokens (button-bg, card-border). This layering means theme switching only requires changing the semantic layer.'}
      </p>
      <pre style={preStyle}><code>{'@theme {\n' +
        '  /* Spacing scale (4px base) */\n' +
        '  --spacing-xs: 0.25rem;  /* 4px */\n' +
        '  --spacing-sm: 0.5rem;   /* 8px */\n' +
        '  --spacing-md: 1rem;     /* 16px */\n' +
        '  --spacing-lg: 1.5rem;   /* 24px */\n' +
        '  --spacing-xl: 2rem;     /* 32px */\n\n' +
        '  /* Typography scale */\n' +
        '  --text-xs: 0.75rem;  --text-sm: 0.875rem;\n' +
        '  --text-base: 1rem;   --text-lg: 1.125rem;\n' +
        '  --text-xl: 1.25rem;  --text-2xl: 1.5rem;\n' +
        '  --text-3xl: 1.875rem;\n\n' +
        '  /* Semantic colors */\n' +
        '  --color-surface: #ffffff;\n' +
        '  --color-on-surface: #1e293b;\n' +
        '}'}</code></pre>

      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '避免在设计系统中使用太多任意值。坚持使用预定义的令牌可以保持视觉一致性，并让设计审计更加容易。'
          : 'Avoid using too many arbitrary values in your design system. Sticking to predefined tokens maintains visual consistency and makes design audits easier.'}
      </div>

      {/* Section 3: Custom Plugins */}
      <h2 style={h2Style}>{isZh ? '3. 自定义插件' : '3. Custom Plugins'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind 的插件系统提供了 addUtilities、addComponents 和 matchUtilities 三个核心 API。addUtilities 添加静态工具类，addComponents 添加组件类，matchUtilities 创建支持动态值的工具类。'
          : 'Tailwind\'s plugin system provides three core APIs: addUtilities for static utilities, addComponents for component classes, and matchUtilities for dynamic value-based utilities. In v4, register plugins with the @plugin directive.'}
      </p>
      <h3 style={h3Style}>{isZh ? '插件 API 详解' : 'Plugin API Details'}</h3>
      <ul style={ulStyle}>
        <li><strong style={strongStyle}>addUtilities</strong> {isZh ? '— 注册静态工具类，如 .text-shadow-sm' : '-- register static utilities like .text-shadow-sm'}</li>
        <li><strong style={strongStyle}>addComponents</strong> {isZh ? '— 注册组件级样式，如 .btn、.card' : '-- register component-level styles like .btn, .card'}</li>
        <li><strong style={strongStyle}>matchUtilities</strong> {isZh ? '— 创建接受动态值的工具类，如 .grid-cols-fill-[200px]' : '-- create utilities that accept dynamic values, like .grid-cols-fill-[200px]'}</li>
        <li><strong style={strongStyle}>addVariant</strong> {isZh ? '— 注册自定义变体修饰符' : '-- register custom variant modifiers'}</li>
      </ul>
      <pre style={preStyle}><code>{'// my-plugin.js\n' +
        'const plugin = require("tailwindcss/plugin");\n\n' +
        'module.exports = plugin(function({\n' +
        '  addUtilities, addComponents, matchUtilities, theme\n' +
        '}) {\n' +
        '  // Static utility: .text-shadow-sm\n' +
        '  addUtilities({\n' +
        '    ".text-shadow-sm": {\n' +
        '      textShadow: "0 1px 2px rgb(0 0 0 / 0.1)"\n' +
        '    }\n' +
        '  });\n' +
        '  // Dynamic utility: .grid-cols-fill-[200px]\n' +
        '  matchUtilities(\n' +
        '    { "grid-cols-fill": (v) => ({\n' +
        '        gridTemplateColumns: `repeat(auto-fill, minmax(\\${v}, 1fr))`\n' +
        '    })},\n' +
        '    { values: theme("spacing") }\n' +
        '  );\n' +
        '});'}</code></pre>

      {/* Section 3 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '在 v4 中，使用 @plugin "./my-plugin.js" 在 CSS 文件中注册插件，取代了 v3 中 tailwind.config.js 的 plugins 数组。'
          : 'In v4, use @plugin "./my-plugin.js" in your CSS file to register plugins, replacing the plugins array in tailwind.config.js from v3.'}
      </div>

      {/* Section 4: Responsive Design */}
      <h2 style={h2Style}>{isZh ? '4. 响应式设计' : '4. Responsive Design'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind 的响应式设计采用移动优先策略。v4 内置了容器查询支持和流体排版，让你能够在组件级别而非视口级别实现响应式布局。'
          : 'Tailwind\'s responsive design uses a mobile-first approach. v4 has built-in container query support and fluid typography, enabling responsive layouts at the component level rather than the viewport level.'}
      </p>
      <h3 style={h3Style}>{isZh ? '容器查询 vs 视口断点' : 'Container Queries vs Viewport Breakpoints'}</h3>
      <p style={pStyle}>
        {isZh
          ? '视口断点（sm:、md:、lg:）基于浏览器窗口宽度。容器查询（@sm:、@md:、@lg:）基于父容器宽度，让组件在不同布局位置自动适配，无论视口大小。'
          : 'Viewport breakpoints (sm:, md:, lg:) are based on browser window width. Container queries (@sm:, @md:, @lg:) are based on parent container width, letting components auto-adapt in different layout positions regardless of viewport size.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Viewport breakpoints (mobile-first) -->\n' +
        '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3\n' +
        '            gap-4 md:gap-6 lg:gap-8">\n' +
        '  <!-- items -->\n' +
        '</div>\n\n' +
        '<!-- Container queries (v4 built-in) -->\n' +
        '<div class="@container">\n' +
        '  <div class="flex flex-col @md:flex-row @lg:grid\n' +
        '              @lg:grid-cols-3">\n' +
        '    <!-- Responds to container width, not viewport -->\n' +
        '  </div>\n' +
        '</div>\n\n' +
        '<!-- Fluid typography with clamp -->\n' +
        '<h1 class="text-[clamp(1.5rem,4vw,3rem)]">Title</h1>'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用命名容器 @container/sidebar 可以让子元素针对特定祖先容器做响应式调整，而非最近的容器。'
          : 'Use named containers @container/sidebar to let child elements respond to a specific ancestor container, not just the nearest one.'}
      </div>

      {/* Section 5: Dark Mode */}
      <h2 style={h2Style}>{isZh ? '5. 暗色模式' : '5. Dark Mode'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'class 策略（v4 中使用 selector 策略）提供最大控制力。结合 localStorage 存储用户偏好和 prefers-color-scheme 检测系统设置，可以实现三态切换（亮色/暗色/跟随系统）。'
          : 'The class strategy (selector strategy in v4) provides maximum control. Combining localStorage for user preference and prefers-color-scheme for system detection, you can implement a tri-state toggle (light/dark/system).'}
      </p>
      <h3 style={h3Style}>{isZh ? '多主题支持' : 'Multi-Theme Support'}</h3>
      <p style={pStyle}>
        {isZh
          ? '超越简单的亮/暗切换，使用 CSS 自定义属性配合 data 属性实现任意数量的主题。每个主题定义自己的颜色变量集，切换主题只需更改 data-theme 属性值。'
          : 'Go beyond simple light/dark switching by using CSS custom properties with data attributes to support any number of themes. Each theme defines its own set of color variables, and switching themes only requires changing the data-theme attribute value.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Dark mode with class strategy -->\n' +
        '<html class="dark">\n' +
        '  <body class="bg-white dark:bg-gray-950\n' +
        '               text-gray-900 dark:text-gray-100">\n' +
        '    <div class="border border-gray-200\n' +
        '                dark:border-gray-800\n' +
        '                shadow-sm dark:shadow-gray-900/50">\n' +
        '      <h2 class="text-gray-800 dark:text-gray-200">\n' +
        '        Adaptive Card\n' +
        '      </h2>\n' +
        '    </div>\n' +
        '  </body>\n' +
        '</html>\n\n' +
        '/* Custom themes via data attributes */\n' +
        '[data-theme="ocean"] { --color-primary: #0ea5e9; }\n' +
        '[data-theme="forest"] { --color-primary: #22c55e; }'}</code></pre>

      {/* Section 5 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 JavaScript 在页面加载时检测系统偏好：window.matchMedia("(prefers-color-scheme: dark)").matches，然后结合 localStorage 中的用户选择来决定初始主题。'
          : 'Use JavaScript to detect system preference on page load: window.matchMedia("(prefers-color-scheme: dark)").matches, then combine with the user\'s choice in localStorage to determine the initial theme.'}
      </div>

      {/* Section 6: Animation & Transitions */}
      <h2 style={h2Style}>{isZh ? '6. 动画与过渡' : '6. Animation & Transitions'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind 提供了丰富的过渡和动画工具类。通过 @theme 定义自定义关键帧动画，使用 motion-safe 和 motion-reduce 响应用户的减少动画偏好设置。'
          : 'Tailwind provides rich transition and animation utilities. Define custom keyframe animations via @theme, and use motion-safe and motion-reduce to respect the user\'s reduced motion preferences.'}
      </p>
      <h3 style={h3Style}>{isZh ? '过渡工具类' : 'Transition Utilities'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind 提供了细粒度的过渡控制：transition 监听常见属性，transition-colors 仅监听颜色变化，transition-transform 仅监听变换。配合 duration-*、ease-*  和 delay-* 工具类精确控制过渡行为。'
          : 'Tailwind provides fine-grained transition control: transition watches common properties, transition-colors watches only color changes, transition-transform watches only transforms. Combine with duration-*, ease-*, and delay-* utilities for precise transition behavior control.'}
      </p>
      <h3 style={h3Style}>{isZh ? '无障碍动画' : 'Accessible Animations'}</h3>
      <p style={pStyle}>
        {isZh
          ? '始终使用 motion-safe: 前缀包裹动画类，确保偏好减少动画的用户不会看到不必要的动画效果。这是 Web 可访问性的重要实践。'
          : 'Always wrap animation classes with the motion-safe: prefix to ensure users who prefer reduced motion do not see unnecessary animation effects. This is an important web accessibility practice.'}
      </p>
      <pre style={preStyle}><code>{'@theme {\n' +
        '  --animate-fade-in: fade-in 0.5s ease-out;\n' +
        '  --animate-slide-up: slide-up 0.3s ease-out;\n' +
        '}\n\n' +
        '@keyframes fade-in {\n' +
        '  from { opacity: 0; }\n' +
        '  to { opacity: 1; }\n' +
        '}\n' +
        '@keyframes slide-up {\n' +
        '  from { transform: translateY(10px); opacity: 0; }\n' +
        '  to { transform: translateY(0); opacity: 1; }\n' +
        '}\n\n' +
        '<!-- Usage with motion-safe -->\n' +
        '<div class="motion-safe:animate-fade-in\n' +
        '            transition-all duration-300 ease-out\n' +
        '            hover:scale-105 hover:shadow-lg">\n' +
        '</div>'}</code></pre>

      {/* Section 6 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? 'transition-all 会监听所有 CSS 属性的变化，可能影响性能。如果只需要过渡特定属性（如颜色和 transform），使用 transition-colors 或 transition-transform 替代。'
          : 'transition-all watches for changes in all CSS properties, which can impact performance. If you only need to transition specific properties (like colors and transform), use transition-colors or transition-transform instead.'}
      </div>

      {/* Section 7: Component Patterns */}
      <h2 style={h2Style}>{isZh ? '7. 组件模式' : '7. Component Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'CVA（class-variance-authority）让你用类型安全的方式定义组件变体。结合 tailwind-merge 自动解决类名冲突，构建健壮的组件 API。'
          : 'CVA (class-variance-authority) lets you define component variants in a type-safe way. Combined with tailwind-merge to automatically resolve class conflicts, you build robust component APIs.'}
      </p>
      <h3 style={h3Style}>{isZh ? '为什么需要 CVA' : 'Why Use CVA'}</h3>
      <p style={pStyle}>
        {isZh
          ? '随着项目规模增长，手动管理组件变体（大小、颜色、状态）的类名组合变得不可维护。CVA 将变体定义集中管理，提供类型安全的 API，并与 TypeScript 完美集成，自动推断变体类型。'
          : 'As projects grow, manually managing class name combinations for component variants (size, color, state) becomes unmaintainable. CVA centralizes variant definitions, provides a type-safe API, and integrates perfectly with TypeScript to automatically infer variant types.'}
      </p>
      <h3 style={h3Style}>{isZh ? '复合变体' : 'Compound Variants'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'CVA 的 compoundVariants 让你为特定变体组合定义额外样式。例如当 intent 为 primary 且 size 为 lg 时添加额外的 padding 或字体粗细。'
          : 'CVA\'s compoundVariants lets you define additional styles for specific variant combinations. For example, adding extra padding or font weight when intent is primary and size is lg.'}
      </p>
      <pre style={preStyle}><code>{'import { cva } from "class-variance-authority";\n' +
        'import { twMerge } from "tailwind-merge";\n\n' +
        'const button = cva(\n' +
        '  "inline-flex items-center rounded-lg font-medium",\n' +
        '  {\n' +
        '    variants: {\n' +
        '      intent: {\n' +
        '        primary: "bg-blue-600 text-white hover:bg-blue-700",\n' +
        '        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",\n' +
        '        danger: "bg-red-600 text-white hover:bg-red-700",\n' +
        '      },\n' +
        '      size: {\n' +
        '        sm: "px-3 py-1.5 text-sm",\n' +
        '        md: "px-4 py-2 text-base",\n' +
        '        lg: "px-6 py-3 text-lg",\n' +
        '      },\n' +
        '    },\n' +
        '    defaultVariants: { intent: "primary", size: "md" },\n' +
        '  }\n' +
        ');\n' +
        '// Usage: button({ intent: "danger", size: "lg" })'}</code></pre>

      {/* Section 7 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? 'tailwind-merge 会智能地解决类名冲突（如同时存在 p-2 和 p-4 时只保留后者），这在组件接受外部 className 覆盖时至关重要。'
          : 'tailwind-merge intelligently resolves class conflicts (e.g., when both p-2 and p-4 are present, it keeps only the latter), which is critical when components accept external className overrides.'}
      </div>

      {/* Section 8: Tailwind with React */}
      <h2 style={h2Style}>{isZh ? '8. Tailwind 与 React 集成' : '8. Tailwind with React'}</h2>
      <p style={pStyle}>
        {isZh
          ? '在 React 中使用 Tailwind 时，clsx 和 cn 工具函数是处理条件类名的最佳实践。cn 函数结合 clsx 和 tailwind-merge，既处理条件逻辑又解决类名冲突。'
          : 'When using Tailwind with React, clsx and the cn utility function are best practices for conditional class names. The cn function combines clsx with tailwind-merge, handling both conditional logic and class conflict resolution.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'cn 工具函数' : 'The cn Utility Function'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'cn 函数已成为 React + Tailwind 项目的标准模式，被 shadcn/ui 等流行组件库广泛采用。它先通过 clsx 处理条件逻辑，再通过 tailwind-merge 解决冲突。'
          : 'The cn function has become the standard pattern in React + Tailwind projects, widely adopted by popular component libraries like shadcn/ui. It first processes conditional logic via clsx, then resolves conflicts via tailwind-merge.'}
      </p>
      <pre style={preStyle}><code>{'import { clsx } from "clsx";\n' +
        'import { twMerge } from "tailwind-merge";\n\n' +
        '// The cn utility — used everywhere in modern React\n' +
        'function cn(...inputs: (string | undefined | boolean)[]) {\n' +
        '  return twMerge(clsx(inputs));\n' +
        '}\n\n' +
        '// Conditional classes in a React component\n' +
        'function Badge({ variant, children }) {\n' +
        '  return (\n' +
        '    <span className={cn(\n' +
        '      "inline-flex rounded-full px-2 py-0.5 text-xs",\n' +
        '      variant === "success" && "bg-green-100 text-green-700",\n' +
        '      variant === "error" && "bg-red-100 text-red-700",\n' +
        '      variant === "info" && "bg-blue-100 text-blue-700"\n' +
        '    )}>\n' +
        '      {children}\n' +
        '    </span>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Section 8 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? 'shadcn/ui 使用 cn 函数作为其核心工具。安装 shadcn/ui 组件时，它会自动在 lib/utils.ts 中创建 cn 函数，你可以在整个项目中复用。'
          : 'shadcn/ui uses the cn function as its core utility. When installing shadcn/ui components, it automatically creates the cn function in lib/utils.ts, which you can reuse throughout your project.'}
      </div>

      {/* Section 9: Performance */}
      <h2 style={h2Style}>{isZh ? '9. 性能优化' : '9. Performance Optimization'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind v4 自动检测内容源并进行 tree-shaking。避免动态类名构造是最重要的优化原则 — 始终使用完整的类名字符串，让编译器能正确识别和保留需要的工具类。'
          : 'Tailwind v4 automatically detects content sources and tree-shakes unused utilities. Avoiding dynamic class name construction is the most important optimization principle -- always use complete class name strings so the compiler can correctly identify and retain needed utilities.'}
      </p>
      <h3 style={h3Style}>{isZh ? '优化清单' : 'Optimization Checklist'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '使用完整的类名字符串，不要用字符串拼接' : 'Use complete class name strings, never string concatenation'}</li>
        <li>{isZh ? '用 @source not 排除不需要扫描的目录' : 'Use @source not to exclude directories that do not need scanning'}</li>
        <li>{isZh ? '用 @source inline() 保留动态引用的类名' : 'Use @source inline() to safelist dynamically referenced class names'}</li>
        <li>{isZh ? '在构建管道中启用 CSS 压缩' : 'Enable CSS minification in your build pipeline'}</li>
        <li>{isZh ? '优先使用设计令牌，减少任意值的使用' : 'Prefer design tokens over arbitrary values'}</li>
      </ul>
      <pre style={preStyle}><code>{'/* v4 automatic content detection — no config needed */\n' +
        '@import "tailwindcss";\n\n' +
        '/* Exclude files from scanning if needed */\n' +
        '@source not "./src/legacy/**";\n\n' +
        '/* DO: Use complete class names */\n' +
        'const color = isError ? "text-red-500" : "text-green-500";\n\n' +
        '/* DON\'T: Dynamic class construction breaks purging */\n' +
        '/* const color = `text-\\${err ? "red" : "green"}-500`; */\n\n' +
        '/* Safelist classes that are only used dynamically */\n' +
        '@source inline("text-red-500 text-green-500\n' +
        '  bg-blue-100 bg-blue-200 bg-blue-300");\n\n' +
        '/* Analyze bundle size */\n' +
        '/* npx tailwindcss --output dist/tw.css --minify */'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '在 v4 中，@source inline() 取代了 v3 的 safelist 配置。将动态引用的类名放在 @source inline() 中确保它们不会被 tree-shaking 移除。'
          : 'In v4, @source inline() replaces the v3 safelist config. Place dynamically referenced class names in @source inline() to ensure they are not removed by tree-shaking.'}
      </div>

      {/* Section 10: Arbitrary Values & Groups */}
      <h2 style={h2Style}>{isZh ? '10. 任意值与组修饰符' : '10. Arbitrary Values & Groups'}</h2>
      <p style={pStyle}>
        {isZh
          ? '任意值允许你使用方括号语法注入自定义 CSS 值。group 和 peer 修饰符让你基于父元素或兄弟元素的状态来设置样式，无需 JavaScript。'
          : 'Arbitrary values allow you to inject custom CSS values using bracket syntax. The group and peer modifiers let you style elements based on parent or sibling state without JavaScript.'}
      </p>
      <h3 style={h3Style}>{isZh ? '命名 group 与 peer' : 'Named Groups and Peers'}</h3>
      <p style={pStyle}>
        {isZh
          ? '当存在嵌套的 group 或多个 peer 元素时，使用命名 group（group/name）和命名 peer（peer/name）来精确指定目标元素，避免歧义。'
          : 'When there are nested groups or multiple peer elements, use named groups (group/name) and named peers (peer/name) to precisely target elements and avoid ambiguity.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '任意值方括号语法支持几乎所有 CSS 属性值。使用下划线替代空格（如 grid-cols-[1fr_2fr_1fr]），使用任意属性语法 [property:value] 访问没有工具类的 CSS 属性。'
          : 'The arbitrary value bracket syntax supports almost all CSS property values. Use underscores to replace spaces (e.g., grid-cols-[1fr_2fr_1fr]), and use the arbitrary property syntax [property:value] to access CSS properties without utility classes.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Arbitrary values -->\n' +
        '<div class="top-[117px] bg-[#1da1f2]\n' +
        '            grid-cols-[1fr_2fr_1fr]\n' +
        '            [mask-type:luminance]">\n' +
        '</div>\n\n' +
        '<!-- Group hover — parent controls child -->\n' +
        '<a class="group block rounded-lg p-6 hover:bg-gray-50">\n' +
        '  <h3 class="group-hover:text-blue-600">Title</h3>\n' +
        '  <p class="group-hover:text-gray-600">Desc</p>\n' +
        '</a>\n\n' +
        '<!-- Peer — sibling controls sibling -->\n' +
        '<input class="peer" type="email" />\n' +
        '<p class="hidden peer-invalid:block text-red-500">\n' +
        '  Invalid email address\n' +
        '</p>'}</code></pre>

      {/* Section 10 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '任意属性语法 [property:value] 让你可以使用 Tailwind 尚未提供工具类的 CSS 属性，如 [mask-type:luminance] 或 [writing-mode:vertical-rl]。'
          : 'The arbitrary property syntax [property:value] lets you use CSS properties that Tailwind does not yet have utilities for, like [mask-type:luminance] or [writing-mode:vertical-rl].'}
      </div>

      {/* Section 11: Grid & Flexbox */}
      <h2 style={h2Style}>{isZh ? '11. Grid 与 Flexbox 布局' : '11. Grid & Flexbox Layouts'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind 提供了完整的 Grid 和 Flexbox 工具类。auto-fill 和 auto-fit 实现自适应网格，subgrid 让嵌套网格对齐父网格轨道。'
          : 'Tailwind provides complete Grid and Flexbox utilities. auto-fill and auto-fit create adaptive grids, and subgrid lets nested grids align to parent grid tracks.'}
      </p>
      <h3 style={h3Style}>{isZh ? '自适应网格模式' : 'Adaptive Grid Patterns'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'auto-fill 会创建尽可能多的列来填充空间，而 auto-fit 会在项目不足时拉伸现有列。两者都不需要媒体查询，实现真正的自适应布局。'
          : 'auto-fill creates as many columns as possible to fill space, while auto-fit stretches existing columns when there are not enough items. Neither requires media queries, enabling truly adaptive layouts.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'subgrid 是 CSS Grid 的强大扩展，让嵌套网格继承父网格的轨道定义。这对于需要跨列对齐的复杂卡片布局非常有用，例如卡片标题、内容和按钮在不同卡片间保持一致的垂直对齐。'
          : 'Subgrid is a powerful CSS Grid extension that lets nested grids inherit their parent grid\'s track definitions. This is very useful for complex card layouts that require cross-column alignment, such as keeping card titles, content, and buttons vertically aligned across different cards.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Auto-fill responsive grid (no breakpoints needed) -->\n' +
        '<div class="grid grid-cols-[repeat(auto-fill,\n' +
        '            minmax(280px,1fr))] gap-6">\n' +
        '  <div>Card 1</div>\n' +
        '  <div>Card 2</div>\n' +
        '  <div>Card 3</div>\n' +
        '</div>\n\n' +
        '<!-- Complex flexbox layout -->\n' +
        '<div class="flex flex-wrap items-start gap-4">\n' +
        '  <aside class="w-64 shrink-0">Sidebar</aside>\n' +
        '  <main class="min-w-0 flex-1">Content</main>\n' +
        '</div>\n\n' +
        '<!-- Subgrid for aligned children -->\n' +
        '<div class="grid grid-cols-4 gap-4">\n' +
        '  <div class="col-span-2 grid grid-cols-subgrid">\n' +
        '    <div>Aligned to parent track</div>\n' +
        '  </div>\n' +
        '</div>'}</code></pre>

      {/* Section 11 additional info */}
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 min-w-0 在 flex 子元素上防止内容溢出。默认情况下，flex 子元素的最小宽度为 auto（内容宽度），这可能导致布局溢出。'
          : 'Use min-w-0 on flex children to prevent content overflow. By default, flex children have a minimum width of auto (content width), which can cause layout overflow.'}
      </div>

      {/* Section 12: Typography Plugin */}
      <h2 style={h2Style}>{isZh ? '12. 排版插件' : '12. Typography Plugin'}</h2>
      <p style={pStyle}>
        {isZh
          ? '@tailwindcss/typography 插件提供 prose 类，为 Markdown 或 CMS 渲染的 HTML 内容自动添加优美的排版样式。支持深度自定义和暗色模式。'
          : 'The @tailwindcss/typography plugin provides the prose class that automatically adds beautiful typographic styles to Markdown or CMS-rendered HTML content. It supports deep customization and dark mode.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'prose 修饰符' : 'Prose Modifiers'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 prose-sm、prose-lg、prose-xl 控制排版大小，prose-blue、prose-green 修改链接颜色，prose-invert 适配暗色模式。max-w-none 取消默认的最大宽度限制。'
          : 'Use prose-sm, prose-lg, prose-xl to control typography size, prose-blue, prose-green to modify link colors, prose-invert for dark mode adaptation. max-w-none removes the default max-width constraint.'}
      </p>
      <pre style={preStyle}><code>{'<!-- Basic prose usage -->\n' +
        '<article class="prose prose-lg prose-blue\n' +
        '                dark:prose-invert max-w-none">\n' +
        '  <h1>Article Title</h1>\n' +
        '  <p>Content with <a href="#">links</a> and\n' +
        '     <code>inline code</code>.</p>\n' +
        '  <pre><code>code blocks styled</code></pre>\n' +
        '</article>\n\n' +
        '/* Customize typography in CSS (v4) */\n' +
        '@theme {\n' +
        '  --prose-body: #374151;\n' +
        '  --prose-headings: #111827;\n' +
        '  --prose-links: #2563eb;\n' +
        '  --prose-code: #dc2626;\n' +
        '  --prose-pre-bg: #1e293b;\n' +
        '}'}</code></pre>

      {/* Section 12 additional info */}
      <h3 style={h3Style}>{isZh ? '常用 prose 类参考' : 'Common Prose Classes Reference'}</h3>
      <ul style={ulStyle}>
        <li><code style={inlineCodeStyle}>prose</code> {isZh ? '— 基础排版样式' : '-- base typography styles'}</li>
        <li><code style={inlineCodeStyle}>prose-sm / prose-lg / prose-xl</code> {isZh ? '— 调整排版大小' : '-- adjust typography size'}</li>
        <li><code style={inlineCodeStyle}>prose-blue / prose-green</code> {isZh ? '— 修改链接颜色主题' : '-- modify link color theme'}</li>
        <li><code style={inlineCodeStyle}>prose-invert</code> {isZh ? '— 暗色模式适配' : '-- dark mode adaptation'}</li>
        <li><code style={inlineCodeStyle}>max-w-none</code> {isZh ? '— 移除默认最大宽度限制' : '-- remove default max-width constraint'}</li>
        <li><code style={inlineCodeStyle}>not-prose</code> {isZh ? '— 在 prose 容器内退出排版样式' : '-- opt out of typography styles inside prose container'}</li>
      </ul>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 not-prose 类可以让 prose 容器内的特定元素退出排版样式。例如在博客文章中嵌入自定义组件时很有用。'
          : 'Use the not-prose class to opt specific elements out of typography styles within a prose container. Useful for embedding custom components inside blog posts.'}
      </div>

      {/* Section 13: Migration Guide */}
      <h2 style={h2Style}>{isZh ? '13. 从 v3 迁移到 v4' : '13. Migration Guide: v3 to v4'}</h2>
      <p style={pStyle}>
        {isZh
          ? '从 v3 迁移到 v4 的核心变化是配置方式从 JavaScript 切换到 CSS。官方提供了 codemod 工具自动化大部分迁移工作。以下是关键的迁移步骤和破坏性变更。'
          : 'The core change migrating from v3 to v4 is the configuration shift from JavaScript to CSS. The official codemod tool automates most migration work. Below are the key migration steps and breaking changes.'}
      </p>
      <h3 style={h3Style}>{isZh ? '迁移步骤概述' : 'Migration Steps Overview'}</h3>
      <p style={pStyle}>
        {isZh
          ? '迁移分为四个主要步骤：运行官方升级工具、替换 @tailwind 指令、将配置移入 CSS @theme、更新 PostCSS 配置。官方 codemod 会自动处理大部分简单变更，但复杂的自定义插件和配置可能需要手动调整。'
          : 'Migration consists of four main steps: run the official upgrade tool, replace @tailwind directives, move configuration into CSS @theme, and update PostCSS config. The official codemod handles most simple changes automatically, but complex custom plugins and configurations may require manual adjustment.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '建议在迁移前创建一个完整的视觉回归测试套件（使用 Chromatic 或 Percy 等工具）。这样可以在迁移过程中快速发现样式差异，确保所有组件的视觉表现保持一致。'
          : 'It is recommended to create a comprehensive visual regression test suite (using tools like Chromatic or Percy) before migrating. This allows you to quickly spot style differences during migration and ensure all components maintain consistent visual appearance.'}
      </p>
      <h3 style={h3Style}>{isZh ? '破坏性变更清单' : 'Breaking Changes Checklist'}</h3>
      <ul style={ulStyle}>
        <li><code style={inlineCodeStyle}>bg-opacity-*</code> {isZh ? '被移除，改用 bg-black/50 斜杠语法' : 'removed, use bg-black/50 slash syntax instead'}</li>
        <li><code style={inlineCodeStyle}>text-opacity-*</code> {isZh ? '被移除，改用 text-black/75 斜杠语法' : 'removed, use text-black/75 slash syntax instead'}</li>
        <li><code style={inlineCodeStyle}>darkMode</code> {isZh ? '配置被移除，selector 策略成为默认' : 'config removed, selector strategy is now default'}</li>
        <li><code style={inlineCodeStyle}>@tailwind</code> {isZh ? '指令被替换为 @import "tailwindcss"' : 'directives replaced with @import "tailwindcss"'}</li>
        <li><code style={inlineCodeStyle}>tailwind.config.js</code> {isZh ? '被 CSS @theme 替代' : 'replaced by CSS @theme'}</li>
        <li>{isZh ? 'PostCSS 插件从 tailwindcss 改为 @tailwindcss/postcss' : 'PostCSS plugin changes from tailwindcss to @tailwindcss/postcss'}</li>
      </ul>
      <pre style={preStyle}><code>{'/* Step 1: Run the official upgrade tool */\n' +
        '/* npx @tailwindcss/upgrade */\n\n' +
        '/* Step 2: Replace tailwind directives */\n' +
        '/* Before (v3): */\n' +
        '/* @tailwind base; @tailwind components; @tailwind utilities; */\n' +
        '/* After (v4): */\n' +
        '@import "tailwindcss";\n\n' +
        '/* Step 3: Move config to CSS @theme */\n' +
        '@theme {\n' +
        '  --color-brand: #3b82f6;\n' +
        '  --font-sans: "Inter", sans-serif;\n' +
        '}\n\n' +
        '/* Step 4: Update PostCSS config */\n' +
        '/* v4 uses @tailwindcss/postcss instead of tailwindcss */\n' +
        '/* module.exports = { plugins: ["@tailwindcss/postcss"] } */\n\n' +
        '/* Breaking: bg-opacity-X → bg-black/50 syntax */\n' +
        '/* Breaking: darkMode config → selector strategy default */'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '在迁移前先运行 npx @tailwindcss/upgrade --dry-run 预览变更。建议在一个新分支上进行迁移，逐步验证每个组件的样式是否正确。'
          : 'Run npx @tailwindcss/upgrade --dry-run before migrating to preview changes. It is recommended to perform the migration on a new branch and verify each component\'s styling incrementally.'}
      </div>

      {/* Summary */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Summary'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Tailwind CSS v4 代表了框架的重大演进。CSS-first 配置简化了设置流程，Lightning CSS 大幅提升了构建速度，内置容器查询让组件级响应式设计成为现实。结合 CVA、tailwind-merge 和 clsx 等工具，你可以构建类型安全、高性能且易于维护的组件系统。'
          : 'Tailwind CSS v4 represents a major evolution of the framework. CSS-first configuration simplifies setup, Lightning CSS dramatically improves build speeds, and built-in container queries make component-level responsive design a reality. Combined with tools like CVA, tailwind-merge, and clsx, you can build type-safe, high-performance, and maintainable component systems.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '从自定义插件到 @theme 设计令牌，从暗色模式到排版插件，掌握这些高级特性将帮助你充分发挥 Tailwind 的潜力，构建专业级的前端项目。无论你是从零开始还是从 v3 迁移，本指南提供的模式和最佳实践都能帮助你事半功倍。'
          : 'From custom plugins to @theme design tokens, from dark mode to the typography plugin, mastering these advanced features will help you unlock the full potential of Tailwind and build professional-grade frontend projects. Whether starting from scratch or migrating from v3, the patterns and best practices in this guide will help you work more efficiently.'}
      </p>
      <h3 style={h3Style}>{isZh ? '推荐学习路径' : 'Recommended Learning Path'}</h3>
      <ul style={ulStyle}>
        <li><strong style={strongStyle}>{isZh ? '第一步' : 'Step 1'}</strong> {isZh ? '— 熟悉 @theme 配置和 CSS-first 工作流' : '-- familiarize yourself with @theme config and CSS-first workflow'}</li>
        <li><strong style={strongStyle}>{isZh ? '第二步' : 'Step 2'}</strong> {isZh ? '— 学习 cn 工具函数和条件类名模式' : '-- learn the cn utility function and conditional class name patterns'}</li>
        <li><strong style={strongStyle}>{isZh ? '第三步' : 'Step 3'}</strong> {isZh ? '— 掌握容器查询和响应式设计进阶技巧' : '-- master container queries and advanced responsive design techniques'}</li>
        <li><strong style={strongStyle}>{isZh ? '第四步' : 'Step 4'}</strong> {isZh ? '— 使用 CVA 构建类型安全的组件变体系统' : '-- build type-safe component variant systems with CVA'}</li>
        <li><strong style={strongStyle}>{isZh ? '第五步' : 'Step 5'}</strong> {isZh ? '— 深入自定义插件开发和设计系统架构' : '-- dive into custom plugin development and design system architecture'}</li>
      </ul>
      <p style={pStyle}>
        {isZh
          ? '建议从最常用的几个特性开始学习，然后逐步深入自定义插件和高级动画等进阶主题。保持实践，在实际项目中应用这些模式是掌握它们的最佳方式。'
          : 'Start by learning the most commonly used features, then gradually dive into advanced topics like custom plugins and advanced animations. Keep practicing -- applying these patterns in real projects is the best way to master them.'}
      </p>
    </>
  );
}
