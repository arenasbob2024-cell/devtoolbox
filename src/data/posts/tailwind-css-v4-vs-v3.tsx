'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS v4 vs v3: Complete Migration Guide 2025',
    intro: 'Tailwind CSS v4 represents the biggest evolution in the framework\'s history. Built on a new high-performance engine, it offers 10x faster builds, smaller bundle sizes, and simplified configuration. This comprehensive guide covers everything you need to know about migrating from v3 to v4.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Tailwind CSS v4 is 10x faster with a new Rust-based engine, requires zero configuration by default, uses CSS-first customization, and maintains backward compatibility with v3. Most projects can migrate in under an hour. The main breaking changes are in configuration syntax and some class name updates.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: '10x faster builds with Rust-based Oxide engine',
    takeaway2: 'Zero configuration required - works out of the box',
    takeaway3: 'CSS-first customization replaces JavaScript config',
    takeaway4: 'Smaller CSS output with better optimization',
    takeaway5: 'Improved content detection with automatic file scanning',
    takeaway6: 'Backward compatible with most v3 utilities',
    
    whatIsV4Title: 'What\'s New in Tailwind CSS v4?',
    whatIsV4Content: 'Tailwind CSS v4 is a complete rewrite featuring a new high-performance engine called Oxide, written in Rust. This delivers dramatically faster build times while maintaining the same utility-first approach. v4 also introduces CSS-first configuration, automatic content detection, and native CSS nesting support.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Build performance benchmarks comparing v3 and v4:',
    
    configurationTitle: 'Configuration Changes',
    configurationIntro: 'The biggest change in v4 is the move to CSS-first configuration:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities between versions:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Side-by-side comparison of v3 vs v4 syntax:',
    
    v3ExampleTitle: 'Tailwind CSS v3',
    v4ExampleTitle: 'Tailwind CSS v4',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Step-by-step migration from v3 to v4:',
    
    breakingChangesTitle: 'Breaking Changes',
    breakingChangesIntro: 'Key breaking changes to be aware of:',
    
    newFeaturesTitle: 'New Features in v4',
    newFeaturesIntro: 'Features exclusive to Tailwind CSS v4:',
    
    bestPracticesTitle: 'Best Practices for v4',
    bestPracticesIntro: 'Recommendations for optimal v4 usage:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Tailwind CSS v4 is a significant upgrade that delivers on performance and developer experience. The 10x faster builds alone make the migration worthwhile for most projects. While the CSS-first configuration requires a mindset shift, it provides better IDE support and more natural CSS integration. For new projects in 2025, v4 is the clear choice. For existing projects, the migration is straightforward and can be done incrementally.',
    
    faq1q: 'Is Tailwind CSS v4 backward compatible with v3?',
    faq1a: 'Yes, mostly. v4 maintains backward compatibility with v3 utility classes. The main breaking changes are in configuration syntax and a few renamed utilities. Most projects can migrate without changing their HTML templates.',
    
    faq2q: 'Do I need to learn new class names?',
    faq2a: 'No, the utility classes remain largely the same. Some obscure utilities have been renamed or removed, but core utilities like flex, grid, padding, margin, colors, etc., work identically.',
    
    faq3q: 'Can I still use tailwind.config.js?',
    faq3a: 'v4 uses CSS-first configuration via @theme directives in your CSS file. However, you can still use JavaScript config for complex scenarios. The new approach is more natural for CSS developers.',
    
    faq4q: 'How much faster are the builds?',
    faq4a: 'In benchmarks, v4 shows 5-20x faster full builds and 100x faster incremental builds. A project that took 10 seconds to build in v3 might take less than 1 second in v4.',
    
    faq5q: 'Does v4 work with existing frameworks?',
    faq5a: 'Yes, v4 works with Next.js, Nuxt, SvelteKit, Remix, Vite, and all major frameworks. The integration is even simpler than v3 due to automatic content detection.',
    
    faq6q: 'What about third-party plugins?',
    faq6a: 'Most popular plugins have been updated for v4. The plugin API has changed, so older plugins may need updates. Check with plugin maintainers for v4 compatibility.',
    
    faq7q: 'Is the CSS output smaller?',
    faq7a: 'Yes, v4 produces 20-50% smaller CSS output due to better optimization algorithms and smarter tree-shaking. The new engine removes more unused styles.',
    
    faq8q: 'Should I migrate existing projects?',
    faq8a: 'For projects in active development, yes - the performance gains are significant. For projects in maintenance mode, v3 continues to work well. The migration is low-risk and can be done incrementally.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Tailwind CSS v4 vs v3：2025年完整迁移指南',
    intro: 'Tailwind CSS v4代表了框架历史上最大的演进。基于全新的高性能引擎构建，它提供10倍更快的构建速度、更小的包体积和简化的配置。本全面指南涵盖从v3迁移到v4所需的一切知识。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Tailwind CSS v4凭借基于Rust的新引擎Oxide实现10倍加速，默认零配置，使用CSS优先定制，并保持与v3的向后兼容。大多数项目可以在一小时内完成迁移。主要破坏性变更在于配置语法和一些类名更新。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '基于Rust的Oxide引擎实现10倍更快构建',
    takeaway2: '零配置——开箱即用',
    takeaway3: 'CSS优先定制取代JavaScript配置',
    takeaway4: '更好的优化带来更小的CSS输出',
    takeaway5: '改进的内容检测，自动扫描文件',
    takeaway6: '与大多数v3工具类向后兼容',
    
    whatIsV4Title: 'Tailwind CSS v4有什么新特性？',
    whatIsV4Content: 'Tailwind CSS v4是一次完全重写，采用名为Oxide的新高性能引擎，用Rust编写。这带来了显著更快的构建时间，同时保持相同的实用优先方法。v4还引入了CSS优先配置、自动内容检测和原生CSS嵌套支持。',
    
    performanceTitle: '性能对比',
    performanceIntro: 'v3和v4的构建性能基准测试：',
    
    configurationTitle: '配置变更',
    configurationIntro: 'v4最大的变化是转向CSS优先配置：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较各版本的功能特性：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: 'v3和v4语法的并排比较：',
    
    v3ExampleTitle: 'Tailwind CSS v3',
    v4ExampleTitle: 'Tailwind CSS v4',
    
    migrationTitle: '迁移指南',
    migrationIntro: '从v3到v4的分步迁移：',
    
    breakingChangesTitle: '破坏性变更',
    breakingChangesIntro: '需要注意的主要破坏性变更：',
    
    newFeaturesTitle: 'v4新功能',
    newFeaturesIntro: 'Tailwind CSS v4独有的功能：',
    
    bestPracticesTitle: 'v4最佳实践',
    bestPracticesIntro: '优化使用v4的建议：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Tailwind CSS v4是一个重大升级，在性能和开发者体验方面都有显著提升。仅10倍更快的构建速度就使迁移对大多数项目来说是值得的。虽然CSS优先配置需要思维转变，但它提供更好的IDE支持和更自然的CSS集成。对于2025年的新项目，v4是明确的选择。对于现有项目，迁移很直接，可以渐进式完成。',
    
    faq1q: 'Tailwind CSS v4与v3向后兼容吗？',
    faq1a: '是的，大部分兼容。v4保持与v3工具类的向后兼容性。主要破坏性变更是配置语法和少数重命名的工具类。大多数项目可以不修改HTML模板就完成迁移。',
    
    faq2q: '我需要学习新的类名吗？',
    faq2a: '不需要，工具类基本保持不变。一些不常用的工具类被重命名或移除，但核心工具类如flex、grid、padding、margin、colors等，工作方式完全相同。',
    
    faq3q: '我还可以使用tailwind.config.js吗？',
    faq3a: 'v4通过CSS文件中的@theme指令使用CSS优先配置。然而，你仍然可以在复杂场景中使用JavaScript配置。新方法对CSS开发者来说更自然。',
    
    faq4q: '构建速度提升多少？',
    faq4a: '在基准测试中，v4显示5-20倍更快的完整构建和100倍更快的增量构建。在v3中需要10秒构建的项目在v4中可能不到1秒。',
    
    faq5q: 'v4可以与现有框架一起使用吗？',
    faq5a: '是的，v4支持Next.js、Nuxt、SvelteKit、Remix、Vite和所有主流框架。由于自动内容检测，集成比v3更简单。',
    
    faq6q: '第三方插件呢？',
    faq6a: '大多数流行插件已更新支持v4。插件API已更改，所以旧插件可能需要更新。请向插件维护者查询v4兼容性。',
    
    faq7q: 'CSS输出更小吗？',
    faq7a: '是的，由于更好的优化算法和更智能的tree-shaking，v4产生20-50%更小的CSS输出。新引擎移除了更多未使用的样式。',
    
    faq8q: '我应该迁移现有项目吗？',
    faq8a: '对于活跃开发中的项目，是的——性能提升显著。对于维护模式的项目，v3继续工作良好。迁移风险低，可以渐进式完成。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TailwindCssV4VsV3({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #38bdf8', background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#38bdf8' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h3 style={h3Style}>{ct.whatIsV4Title}</h3>
      <p style={pStyle}>{ct.whatIsV4Content}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Tailwind v3</th>
              <th style={thStyle}>Tailwind v4</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '完整构建（大型项目）' : 'Full Build (Large)', '12.5s', '0.8s', '15x'],
              [isZh ? '完整构建（中型项目）' : 'Full Build (Medium)', '3.2s', '0.3s', '10x'],
              [isZh ? '增量构建' : 'Incremental Build', '850ms', '8ms', '100x'],
              [isZh ? '开发服务器启动' : 'Dev Server Start', '2.1s', '0.15s', '14x'],
              [isZh ? 'CSS输出大小' : 'CSS Output Size', '45KB', '32KB', '30% smaller'],
              [isZh ? '内存使用' : 'Memory Usage', '~500MB', '~150MB', '3x less'],
            ].map(([metric, v3, v4, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{v3}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{v4}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.configurationTitle}</h2>
      <p style={pStyle}>{ct.configurationIntro}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.v3ExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// tailwind.config.js (v3)
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#38bdf8' }}>{ct.v4ExampleTitle}</h3>
      <pre style={codeStyle}><code>{`/* globals.css (v4 - CSS-first configuration) */
@import "tailwindcss";

/* Theme customization using @theme */
@theme {
  --color-brand-50: #f0f9ff;
  --color-brand-100: #e0f2fe;
  --color-brand-200: #bae6fd;
  --color-brand-300: #7dd3fc;
  --color-brand-400: #38bdf8;
  --color-brand-500: #0ea5e9;
  --color-brand-600: #0284c7;
  --color-brand-700: #0369a1;
  --color-brand-800: #075985;
  --color-brand-900: #0c4a6e;

  --font-family-sans: 'Inter var', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  --spacing-128: 32rem;
  --spacing-144: 36rem;

  --radius-4xl: 2rem;
}

/* Import plugins */
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";

/* Or use @config for JavaScript config */
/* @config "./tailwind.config.js"; */

/* Custom utilities in v4 */
@utility custom-gradient {
  background: linear-gradient(135deg, var(--tw-gradient-stops));
}

/* Native CSS nesting */
.card {
  &:hover {
    @apply shadow-lg;
  }
  
  &-title {
    @apply text-xl font-bold;
  }
}

/* That's it! No postcss.config.js needed in v4 */`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Tailwind v3</th>
              <th style={thStyle}>Tailwind v4</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '构建引擎' : 'Build Engine', 'Node.js', 'Rust (Oxide)'],
              [isZh ? '配置方式' : 'Configuration', 'JavaScript', 'CSS-first'],
              [isZh ? '内容检测' : 'Content Detection', isZh ? '手动配置' : 'Manual config', isZh ? '自动' : 'Automatic'],
              [isZh ? '零配置启动' : 'Zero Config Start', '✗', '✓'],
              [isZh ? '原生CSS嵌套' : 'Native CSS Nesting', '✗', '✓'],
              [isZh ? 'CSS变量支持' : 'CSS Variables', isZh ? '有限' : 'Limited', '✓ Full'],
              [isZh ? 'HMR速度' : 'HMR Speed', isZh ? '中等' : 'Moderate', isZh ? '即时' : 'Instant'],
              [isZh ? '容器查询' : 'Container Queries', '@tailwindcss/container-queries', '✓ Built-in'],
              [isZh ? '逻辑属性' : 'Logical Properties', isZh ? '实验性' : 'Experimental', '✓ Stable'],
              [isZh ? '动态工具类' : 'Dynamic Utilities', '✗', '✓'],
            ].map(([feature, v3, v4], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{v3}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{v4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{isZh ? 'HTML类名（保持不变）' : 'HTML Classes (Unchanged)'}</h3>
      <pre style={codeStyle}><code>{`<!-- Both v3 and v4 - HTML classes remain the same -->
<div class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
  <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
    Hello Tailwind!
  </h1>
  <button class="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors">
    Click me
  </button>
</div>

<!-- New v4 features -->
<div class="@container">
  <div class="@lg:grid-cols-2 @xl:grid-cols-3">
    <!-- Container query support built-in -->
  </div>
</div>

<!-- Dynamic spacing in v4 -->
<div class="p-[--custom-spacing]">
  <!-- Use any CSS variable as a value -->
</div>

<!-- Logical properties -->
<div class="ms-4 pe-8">
  <!-- Margin-start, Padding-end for RTL support -->
</div>`}</code></pre>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Step 1: Update dependencies
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@next @tailwindcss/postcss@next

# Step 2: Update PostCSS config (v4 uses new plugin)
// postcss.config.js (v4)
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // New plugin name
  },
};

# Step 3: Update CSS entry file
/* Replace old directives with single import */
/* OLD (v3): */
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

/* NEW (v4): */
@import "tailwindcss";

# Step 4: Convert configuration
/* Option A: Convert to CSS @theme */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-family-display: 'Cal Sans', sans-serif;
}

/* Option B: Keep using JS config */
@config "./tailwind.config.js";
@import "tailwindcss";

# Step 5: Update plugins
/* OLD: require('@tailwindcss/forms') */
/* NEW: @plugin "@tailwindcss/forms"; in CSS */

# Step 6: Handle breaking changes
/* - bg-opacity-* removed → use bg-color/opacity syntax */
/* - deprecated variants removed */
/* - some plugins updated */

# Step 7: Test and verify
npm run build
npm run dev`}</code></pre>

      <h2 style={h2Style}>{ct.breakingChangesTitle}</h2>
      <p style={pStyle}>{ct.breakingChangesIntro}</p>

      <pre style={codeStyle}><code>{`/* Breaking Changes from v3 to v4 */

/* 1. Background opacity syntax changed */
/* v3 */
.bg-blue-500.bg-opacity-50 { }

/* v4 */
.bg-blue-500/50 { }

/* 2. Ring utilities updated */
/* v3 */
.ring ring-blue-500 ring-offset-2

/* v4 */
.ring-2 ring-blue-500 ring-offset-2

/* 3. Container configuration moved */
/* v3 - tailwind.config.js */
container: {
  center: true,
  padding: '2rem',
}

/* v4 - CSS */
@theme {
  --container-center: true;
  --container-padding: 2rem;
}

/* 4. Removed deprecated variants */
/* These are no longer available: */
.first:rounded-t-lg    /* Use: [&:first-child]:rounded-t-lg */
.last:rounded-b-lg     /* Use: [&:last-child]:rounded-b-lg */
.even:bg-gray-50       /* Use: [&:nth-child(even)]:bg-gray-50 */

/* 5. Plugin API changed */
/* v3 plugin */
module.exports = function(addUtilities, addComponents, e) {
  addUtilities({
    ".scroll-snap-none": {
      "scroll-snap-type": "none",
    },
  })
}

/* v4 plugin */
@utility scroll-snap-none {
  scroll-snap-type: none;
}`}</code></pre>

      <h2 style={h2Style}>{ct.newFeaturesTitle}</h2>
      <p style={pStyle}>{ct.newFeaturesIntro}</p>

      <pre style={codeStyle}><code>{`/* New Features in Tailwind CSS v4 */

/* 1. @source for fine-grained content control */
@source "./src/**/*.php";
@source "../shared/**/*.tsx";

/* 2. @variant for custom variants */
@variant dark (&:where(.dark, .dark *));
@variant hocus (&:hover, &:focus);

/* 3. @utility for custom utilities */
@utility scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* 4. Dynamic values from CSS variables */
@theme {
  --spacing-dynamic: var(--some-js-variable);
}

/* 5. Container queries built-in */
.card {
  @container (min-width: 400px) {
    @apply flex-row;
  }
}

/* 6. Native CSS nesting */
.btn {
  @apply px-4 py-2 rounded;
  
  &:hover {
    @apply bg-blue-600;
  }
  
  &-primary {
    @apply bg-blue-500 text-white;
  }
  
  &-secondary {
    @apply bg-gray-200 text-gray-800;
  }
}

/* 7. Improved arbitrary values */
<div class="grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
<div class="p-[clamp(1rem,5vw,2rem)]">

/* 8. Better dark mode */
@variant dark (&:where(.dark *, .dark));
/* or use the built-in dark: variant with class strategy */`}</code></pre>

      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <p style={pStyle}>{ct.bestPracticesIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #38bdf8' }}>
          <strong style={{ color: '#38bdf8' }}>1. {isZh ? '使用CSS优先配置' : 'Use CSS-first Configuration'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '将主题定制移到CSS @theme块中，获得更好的IDE支持和CSS原生体验。' : 'Move theme customization to CSS @theme blocks for better IDE support and native CSS experience.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>2. {isZh ? '利用自动内容检测' : 'Leverage Automatic Content Detection'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'v4自动检测项目文件，无需手动配置content数组。只有在特殊情况下才需要@source。' : 'v4 automatically detects project files, no need to manually configure content array. Only use @source for special cases.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>3. {isZh ? '使用原生CSS嵌套' : 'Use Native CSS Nesting'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '在CSS文件中使用原生嵌套语法替代组件类，更易读且性能更好。' : 'Use native nesting syntax in CSS files instead of component classes for better readability and performance.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>4. {isZh ? '渐进式迁移' : 'Incremental Migration'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '大型项目可以渐进式迁移，先更新依赖和基础配置，再逐步转换主题定制。' : 'Large projects can migrate incrementally: update dependencies and base config first, then gradually convert theme customization.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(56,189,248,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(56,189,248,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/css-to-tailwind`} style={{ color: '#38bdf8', textDecoration: 'none' }}>CSS to Tailwind</a> • {' '}
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#38bdf8', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/base64-encoder`} style={{ color: '#38bdf8', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
