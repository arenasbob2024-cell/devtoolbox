'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS v4 Migration Guide: New Features, Breaking Changes, and Tips',
    intro: 'Tailwind CSS v4 is a ground-up rewrite that delivers significantly faster builds, a simplified configuration experience, and a modern CSS-first approach. Moving from v3 to v4 requires understanding the new architecture, updated configuration patterns, and breaking changes. This comprehensive guide walks you through the migration process with practical examples and best practices.',
    h2WhatsNew: 'What Is New in Tailwind CSS v4',
    whatsNewDesc: 'Tailwind CSS v4 is not just an incremental update. It is a complete rewrite with a new engine called Oxide, built on Rust for dramatically faster performance. The most visible change is the shift from JavaScript configuration (tailwind.config.js) to CSS-first configuration using @theme directives.',
    h3Performance: 'Performance Improvements',
    performanceDesc: 'The new Oxide engine delivers up to 10x faster full builds and 100x faster incremental builds compared to v3. Hot module replacement (HMR) is nearly instantaneous, even in large projects with thousands of utility classes.',
    h3CSSFirst: 'CSS-First Configuration',
    cssFirstDesc: 'Tailwind v4 moves configuration into your CSS file using @theme, @variant, and @utility directives. This eliminates the need for tailwind.config.js in most projects and makes the configuration more discoverable and maintainable.',
    h3ModernCSS: 'Modern CSS Features',
    modernCSSDesc: 'Tailwind v4 leverages modern CSS features including cascade layers (@layer), container queries, anchor positioning, color-mix(), and wide-gamut colors (oklch, oklab). No PostCSS plugin is required for the default setup.',
    h2Migration: 'Migration Steps',
    migrationDesc: 'Follow these steps to migrate your project from Tailwind CSS v3 to v4.',
    h3Step1: 'Step 1: Update Dependencies',
    step1Desc: 'Install the latest Tailwind CSS v4 package and remove the PostCSS plugin if you are using Vite.',
    h3Step2: 'Step 2: Update Your CSS Entry Point',
    step2Desc: 'Replace the @tailwind directives with the new @import syntax. In v4, you import Tailwind as a CSS module.',
    h3Step3: 'Step 3: Migrate tailwind.config.js to CSS',
    step3Desc: 'Move your theme customizations from tailwind.config.js into your CSS file using @theme. Most configuration options have direct CSS equivalents.',
    h3Step4: 'Step 4: Update Class Names',
    step4Desc: 'Some utility class names have changed in v4. Review your templates for deprecated or renamed classes.',
    h3Step5: 'Step 5: Update Plugins',
    step5Desc: 'Tailwind v4 uses a new plugin format. First-party plugins like @tailwindcss/typography and @tailwindcss/forms have been updated for v4 compatibility.',
    h2Breaking: 'Breaking Changes',
    breakingDesc: 'Tailwind v4 includes several breaking changes that you need to address during migration.',
    h3RemovedUtils: 'Removed and Renamed Utilities',
    removedUtilsDesc: 'Several utility classes have been renamed or removed in v4 to align with modern CSS terminology and reduce confusion.',
    h3ConfigChanges: 'Configuration Changes',
    configChangesDesc: 'The JavaScript configuration file is no longer the primary configuration method. While still supported for complex cases, most configuration should be done in CSS.',
    h3PluginAPI: 'Plugin API Changes',
    pluginAPIDesc: 'The plugin API has been significantly updated. Plugins now use a CSS-based approach for defining utilities and variants.',
    h2NewFeatures: 'New Features in v4',
    h3ContainerQueries: 'Container Queries',
    containerQueriesDesc: 'Tailwind v4 includes built-in support for CSS container queries, allowing you to style elements based on their parent container size rather than the viewport.',
    h3ColorMix: 'Color Mixing',
    colorMixDesc: 'New color mixing utilities let you blend colors using CSS color-mix(). This is useful for creating tints, shades, and custom color variations without defining them in your theme.',
    h3Anchoring: 'Anchor Positioning',
    anchoringDesc: 'CSS anchor positioning is supported through new utilities, enabling you to position elements relative to other elements without JavaScript.',
    h3DarkMode: 'Dark Mode Improvements',
    darkModeDesc: 'Dark mode in v4 uses the CSS prefers-color-scheme media query by default and can be customized using the @variant directive for class-based toggling.',
    h2BestPractices: 'Migration Best Practices',
    bp1: 'Run the automated migration tool first: npx @tailwindcss/upgrade',
    bp2: 'Migrate one component at a time rather than the entire project at once',
    bp3: 'Use the browser DevTools to compare rendered styles before and after migration',
    bp4: 'Check for custom plugins and update them to the new API before upgrading',
    bp5: 'Test responsive breakpoints thoroughly as the default breakpoint values may differ',
    bp6: 'Review color usage since v4 uses oklch color space by default',
    bp7: 'Update IDE extensions to the latest versions for v4 autocomplete support',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is tailwind.config.js still supported in v4?',
    faq1A: 'Yes, but it is no longer the recommended approach. Tailwind v4 supports a JavaScript config file for advanced use cases, but the CSS-first approach using @theme is preferred. The automated migration tool can convert your config.js to CSS.',
    faq2Q: 'Do I need PostCSS with Tailwind v4?',
    faq2A: 'Not necessarily. Tailwind v4 includes its own build system that works with Vite out of the box. If you use other PostCSS plugins, you can still use the PostCSS integration, but the default Vite plugin handles everything automatically.',
    faq3Q: 'Will my v3 plugins work with v4?',
    faq3A: 'Most v3 plugins will need updates for v4 compatibility. The plugin API has changed significantly. First-party plugins like @tailwindcss/typography, @tailwindcss/forms, and @tailwindcss/container-queries have been updated. Check each plugin for v4-compatible versions.',
    faq4Q: 'How much faster is v4 compared to v3?',
    faq4A: 'Tailwind v4 is up to 10x faster for full builds and 100x faster for incremental builds. In practice, this means sub-second full builds for most projects and near-instant HMR updates. The Oxide engine (written in Rust) is responsible for these improvements.',
    faq5Q: 'Should I migrate an existing project to v4?',
    faq5A: 'For active projects, yes. The performance improvements and new features are significant. Use the automated migration tool (npx @tailwindcss/upgrade) to handle most of the work automatically. For stable projects that are not actively developed, migration is optional but recommended before v3 reaches end of life.',
  },
  zh: {
    title: 'Tailwind CSS v4 迁移指南：新特性、破坏性变更和技巧',
    intro: 'Tailwind CSS v4 是一次从头开始的重写，带来了显著更快的构建、简化的配置体验和现代 CSS 优先的方法。从 v3 迁移到 v4 需要理解新架构、更新的配置模式和破坏性变更。',
    h2WhatsNew: 'Tailwind CSS v4 的新特性',
    whatsNewDesc: 'Tailwind CSS v4 不仅仅是增量更新，而是使用名为 Oxide 的新引擎完全重写，基于 Rust 构建，性能大幅提升。最明显的变化是从 JavaScript 配置转向 CSS 优先配置。',
    h3Performance: '性能改进',
    performanceDesc: '新的 Oxide 引擎比 v3 提供高达 10 倍的完整构建速度和 100 倍的增量构建速度。热模块替换几乎是即时的。',
    h3CSSFirst: 'CSS 优先配置',
    cssFirstDesc: 'Tailwind v4 使用 @theme、@variant 和 @utility 指令将配置移入 CSS 文件中，消除了大多数项目对 tailwind.config.js 的需求。',
    h3ModernCSS: '现代 CSS 特性',
    modernCSSDesc: 'Tailwind v4 利用现代 CSS 特性，包括级联层、容器查询、锚点定位、color-mix() 和广色域颜色。',
    h2Migration: '迁移步骤',
    migrationDesc: '按照以下步骤将项目从 Tailwind CSS v3 迁移到 v4。',
    h3Step1: '步骤 1：更新依赖',
    step1Desc: '安装最新的 Tailwind CSS v4 包，如果使用 Vite 则移除 PostCSS 插件。',
    h3Step2: '步骤 2：更新 CSS 入口文件',
    step2Desc: '将 @tailwind 指令替换为新的 @import 语法。在 v4 中，你将 Tailwind 作为 CSS 模块导入。',
    h3Step3: '步骤 3：将 tailwind.config.js 迁移到 CSS',
    step3Desc: '使用 @theme 将主题自定义从 tailwind.config.js 移到 CSS 文件中。',
    h3Step4: '步骤 4：更新类名',
    step4Desc: '一些工具类名在 v4 中已更改。检查模板中已弃用或重命名的类。',
    h3Step5: '步骤 5：更新插件',
    step5Desc: 'Tailwind v4 使用新的插件格式。第一方插件已为 v4 兼容性进行更新。',
    h2Breaking: '破坏性变更',
    breakingDesc: 'Tailwind v4 包含几个需要在迁移期间解决的破坏性变更。',
    h3RemovedUtils: '移除和重命名的工具类',
    removedUtilsDesc: '一些工具类在 v4 中已重命名或移除，以与现代 CSS 术语保持一致。',
    h3ConfigChanges: '配置变更',
    configChangesDesc: 'JavaScript 配置文件不再是主要配置方法。大多数配置应在 CSS 中完成。',
    h3PluginAPI: '插件 API 变更',
    pluginAPIDesc: '插件 API 已大幅更新。插件现在使用基于 CSS 的方法定义工具类和变体。',
    h2NewFeatures: 'v4 新特性',
    h3ContainerQueries: '容器查询',
    containerQueriesDesc: 'Tailwind v4 内置了 CSS 容器查询支持，允许根据父容器大小而非视口来设置元素样式。',
    h3ColorMix: '颜色混合',
    colorMixDesc: '新的颜色混合工具类使用 CSS color-mix() 混合颜色，无需在主题中定义即可创建色调变化。',
    h3Anchoring: '锚点定位',
    anchoringDesc: '通过新的工具类支持 CSS 锚点定位，无需 JavaScript 即可相对于其他元素定位。',
    h3DarkMode: '深色模式改进',
    darkModeDesc: 'v4 中的深色模式默认使用 prefers-color-scheme 媒体查询，可通过 @variant 指令自定义。',
    h2BestPractices: '迁移最佳实践',
    bp1: '首先运行自动迁移工具：npx @tailwindcss/upgrade',
    bp2: '一次迁移一个组件，而非整个项目',
    bp3: '使用浏览器开发工具比较迁移前后的渲染样式',
    bp4: '在升级前检查并更新自定义插件到新 API',
    bp5: '彻底测试响应式断点',
    bp6: '检查颜色使用，因为 v4 默认使用 oklch 色彩空间',
    bp7: '将 IDE 扩展更新到最新版本以获得 v4 自动补全支持',
    h2Faq: '常见问题',
    faq1Q: 'v4 还支持 tailwind.config.js 吗？',
    faq1A: '支持，但不再是推荐方法。v4 支持用于高级用例的 JavaScript 配置文件，但首选使用 @theme 的 CSS 优先方法。',
    faq2Q: 'Tailwind v4 需要 PostCSS 吗？',
    faq2A: '不一定。Tailwind v4 包含自己的构建系统，开箱即用支持 Vite。',
    faq3Q: 'v3 插件能在 v4 中工作吗？',
    faq3A: '大多数 v3 插件需要更新以兼容 v4。第一方插件已更新，请检查每个插件的 v4 兼容版本。',
    faq4Q: 'v4 比 v3 快多少？',
    faq4A: 'v4 完整构建快 10 倍，增量构建快 100 倍。基于 Rust 的 Oxide 引擎带来了这些改进。',
    faq5Q: '应该将现有项目迁移到 v4 吗？',
    faq5A: '对于活跃项目，建议迁移。使用自动迁移工具（npx @tailwindcss/upgrade）处理大部分工作。',
  },
};

export default function TailwindV4Migration({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What's New */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatsNew}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whatsNewDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Performance}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.performanceDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3CSSFirst}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.cssFirstDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Tailwind v4: CSS-first configuration */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.6 0.2 250);
  --color-secondary: oklch(0.7 0.15 180);
  --font-display: "Inter", sans-serif;
  --font-body: "Source Sans 3", sans-serif;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --radius-lg: 12px;
  --spacing-18: 4.5rem;
}

/* Custom utilities */
@utility text-balance {
  text-wrap: balance;
}

/* Custom variants */
@variant hocus (&:hover, &:focus);
@variant theme-dark (.dark &);`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ModernCSS}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.modernCSSDesc}</p>

      {/* Migration Steps */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Migration}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.migrationDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step1}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step1Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Run the automated upgrade tool (recommended)
npx @tailwindcss/upgrade

# Or manually update dependencies
npm install tailwindcss@latest

# For Vite projects, install the Vite plugin
npm install @tailwindcss/vite

# Remove the PostCSS plugin (if using Vite)
npm uninstall @tailwindcss/postcss autoprefixer

# vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step2}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step2Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* v3 (old) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4 (new) */
@import "tailwindcss";

/* That single import replaces all three directives */
/* Tailwind automatically detects your source files */`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step3}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step3Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* v3: tailwind.config.js */
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         brand: '#3b82f6',
//         accent: '#f59e0b',
//       },
//       fontFamily: {
//         display: ['Inter', 'sans-serif'],
//       },
//       spacing: {
//         '18': '4.5rem',
//       },
//     },
//   },
// }

/* v4: CSS configuration */
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
  --color-accent: #f59e0b;
  --font-display: "Inter", sans-serif;
  --spacing-18: 4.5rem;
}

/* Use in templates: bg-brand, text-accent, font-display, mt-18 */`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step4}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step4Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Renamed utilities in v4 -->

<!-- Shadow color: shadow-[color] -> shadow-[color]/opacity -->
<!-- v3 --> <div class="shadow-lg shadow-blue-500/50">
<!-- v4 --> <div class="shadow-lg shadow-blue-500/50">  <!-- same -->

<!-- Ring offset: ring-offset-2 ring-offset-blue-500 -->
<!-- Now uses outline utilities in some cases -->

<!-- Blur: backdrop-blur-sm -> backdrop-blur-sm  (unchanged) -->

<!-- Gradient stops are the same but color syntax may differ -->
<!-- v3 --> <div class="bg-gradient-to-r from-blue-500 to-purple-500">
<!-- v4 --> <div class="bg-linear-to-r from-blue-500 to-purple-500">

<!-- Content classes renamed -->
<!-- v3 --> <div class="content-center">
<!-- v4 --> <div class="place-content-center">

<!-- Decoration renamed -->
<!-- v3 --> <div class="decoration-2">
<!-- v4 --> <div class="decoration-2">  <!-- unchanged -->`}</code></pre>

      {/* Breaking Changes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Breaking}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.breakingDesc}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>v3</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>v4</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['tailwind.config.js', '@theme in CSS', 'JS config still supported'],
              ['@tailwind directives', '@import "tailwindcss"', 'Single import'],
              ['content: ["./src/**"]', 'Auto-detection', 'No content config needed'],
              ['bg-opacity-50', 'bg-black/50', 'Opacity modifier syntax'],
              ['text-opacity-75', 'text-white/75', 'Opacity modifier syntax'],
              ['bg-gradient-to-r', 'bg-linear-to-r', 'Renamed for clarity'],
              ['decoration-clone', 'box-decoration-clone', 'Prefix added'],
              ['PostCSS plugin required', 'Vite plugin (or CLI)', 'Simpler setup'],
            ].map(([v3, v4, notes], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{v3}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{v4}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Features */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2NewFeatures}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ContainerQueries}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.containerQueriesDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Container queries in Tailwind v4 -->
<div class="@container">
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3">
    <div class="@sm:p-4 @md:p-6">
      Responds to container width, not viewport
    </div>
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <div class="@md/sidebar:flex-row">
    Content adapts to sidebar width
  </div>
</div>`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ColorMix}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.colorMixDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`<!-- Color mixing in v4 -->
<div class="bg-blue-500/50">50% opacity blue</div>
<div class="bg-mix-blue-500-white-30">30% white mixed into blue</div>

/* oklch colors in theme */
@theme {
  --color-brand-50: oklch(0.97 0.02 250);
  --color-brand-100: oklch(0.93 0.04 250);
  --color-brand-500: oklch(0.6 0.2 250);
  --color-brand-900: oklch(0.3 0.15 250);
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3DarkMode}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.darkModeDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Dark mode with system preference (default in v4) */
<div class="bg-white dark:bg-gray-900">
  Automatic dark mode based on OS preference
</div>

/* Class-based dark mode */
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

/* Now use: <html class="dark"> to toggle */`}</code></pre>

      {/* Custom Utilities */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Custom Utilities in v4</h3>
      <p style={{ marginBottom: '1rem' }}>Tailwind v4 makes creating custom utilities simpler with the @utility directive. You can define utilities directly in CSS without writing a JavaScript plugin.</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`/* Custom utilities in v4 */
@utility text-balance {
  text-wrap: balance;
}

@utility content-auto {
  content-visibility: auto;
}

@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* Custom utility with variants */
@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Usage in templates */
/* <div class="text-balance glass scrollbar-hidden"> */
/* <div class="hover:glass dark:glass"> */`}</code></pre>

      {/* v3 to v4 Quick Reference */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Quick Reference: v3 to v4 Changes</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Configuration changes summary
// v3: tailwind.config.js    -> v4: @theme in CSS
// v3: @tailwind base         -> v4: @import "tailwindcss"
// v3: content: [...]         -> v4: auto-detection
// v3: plugins: [...]         -> v4: @plugin "..." or @utility

// PostCSS setup
// v3: postcss.config.js with @tailwindcss/postcss
// v4: Vite plugin (recommended) or @tailwindcss/postcss

// Source detection
// v4 automatically scans:
// - All .html, .jsx, .tsx, .vue, .svelte files
// - Ignores node_modules, .git, dist
// - Configure with @source directive if needed:
// @source "../other-project/src/**/*.tsx";`}</code></pre>

      {/* Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7].map((bp, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
