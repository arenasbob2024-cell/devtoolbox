'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Tailwind CSS vs WindiCSS: Utility-First CSS Framework Comparison',
    intro: 'Tailwind CSS and WindiCSS are utility-first CSS frameworks that enable rapid UI development. Tailwind is the original and most popular, while WindiCSS offers faster builds and additional features. This comparison covers performance, features, developer experience, and the future of both frameworks.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Tailwind CSS is the industry standard with excellent ecosystem and JIT compiler. WindiCSS offers faster builds and extra utilities but has uncertain future. For production projects, Tailwind is the safer choice. For personal projects or when build speed is critical, WindiCSS may be worth considering.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'WindiCSS builds are 10-100x faster than Tailwind CSS',
    takeaway2: 'Tailwind has larger community, better documentation, and more resources',
    takeaway3: 'WindiCSS includes additional utilities like attributify mode',
    takeaway4: 'Tailwind JIT closed the performance gap significantly',
    takeaway5: 'WindiCSS development has slowed; consider UnoCSS as alternative',
    takeaway6: 'Both support on-demand CSS generation and tree-shaking',
    
    whatIsTailwindTitle: 'What is Tailwind CSS?',
    whatIsTailwindContent: 'Tailwind CSS is a utility-first CSS framework created by Adam Wathan in 2017. It provides low-level utility classes that let you build designs directly in your markup. With over 5 million weekly npm downloads, Tailwind has become the most popular utility-first CSS framework, used by companies like GitHub, Netflix, and NASA.',
    
    whatIsWindiCSSTitle: 'What is WindiCSS?',
    whatIsWindiCSSContent: 'WindiCSS is a next-generation utility-first CSS framework created in 2020 as a faster alternative to Tailwind. It uses a precompiled approach for faster builds and includes additional features like attributify mode and shortcuts. WindiCSS is designed to be a drop-in replacement for Tailwind CSS with enhanced performance.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Build and development performance benchmarks:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing framework capabilities:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Usage patterns compared:',
    
    tailwindExampleTitle: 'Tailwind CSS',
    windicssExampleTitle: 'WindiCSS',
    
    attributifyTitle: 'Attributify Mode',
    attributifyIntro: 'WindiCSS unique feature:',
    
    shortcutsTitle: 'Shortcuts and Aliases',
    shortcutsIntro: 'Creating reusable utility combinations:',
    
    pluginsTitle: 'Plugin Ecosystem',
    pluginsIntro: 'Extending functionality:',
    
    whenToUseTitle: 'When to Use Each Framework',
    tailwindBestFor: 'Use Tailwind CSS When:',
    windicssBestFor: 'Use WindiCSS When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Tailwind CSS remains the dominant utility-first CSS framework with unmatched ecosystem support. Its JIT compiler has closed most of the performance gap with WindiCSS. WindiCSS still offers unique features like attributify mode and faster cold starts, but its uncertain development status is concerning. For most projects, Tailwind CSS is the recommended choice. If you need WindiCSS-like features with active development, consider UnoCSS, which combines the best of both worlds with excellent performance.',
    
    faq1q: 'Is WindiCSS still maintained?',
    faq1a: 'WindiCSS development has significantly slowed since mid-2022. The core team has shifted focus to other projects. While it still works, new projects should consider UnoCSS or Tailwind CSS instead. Existing WindiCSS projects can migrate to UnoCSS with minimal changes.',
    
    faq2q: 'What is UnoCSS and how does it compare?',
    faq2a: 'UnoCSS is a modern atomic CSS engine created by Anthony Fu. It is faster than both Tailwind and WindiCSS, supports Tailwind/WindiCSS presets, and has active development. UnoCSS is often recommended as the successor to WindiCSS with better performance and features.',
    
    faq3q: 'Can I migrate from WindiCSS to Tailwind?',
    faq3a: 'Yes, migration is possible since WindiCSS was designed as a Tailwind alternative. Most utility classes are compatible. You will lose WindiCSS-specific features like attributify and shortcuts, which would need reimplementation using Tailwind plugins or custom CSS.',
    
    faq4q: 'Does Tailwind JIT match WindiCSS performance?',
    faq4a: 'Tailwind JIT significantly improved performance but WindiCSS is still faster for cold starts. In production builds and incremental development, the difference is negligible. Tailwind v3.4+ has closed most of the gap for typical projects.',
    
    faq5q: 'What about bundle size?',
    faq5a: 'Both frameworks generate only used CSS, so production bundle size is similar. The difference comes from unused utilities in development. Tailwind CLI is larger (~2MB) than WindiCSS (~500KB), but this does not affect production output.',
    
    faq6q: 'Which has better IDE support?',
    faq6a: 'Tailwind CSS IntelliSense is more mature with better autocomplete, linting, and hover previews. WindiCSS has its own VS Code extension with similar features. Both provide good DX, but Tailwind extension has broader adoption.',
    
    faq7q: 'Can I use both in the same project?',
    faq7a: 'Technically possible but not recommended. They would generate conflicting utility classes and increase complexity. Choose one framework per project. If transitioning, complete the migration before deploying.',
    
    faq8q: 'What about Tailwind CSS v4?',
    faq8a: 'Tailwind CSS v4 (in development) promises significant performance improvements with a new engine written in Rust. It aims to match or exceed WindiCSS/UnoCSS performance while maintaining the Tailwind ecosystem. This may eliminate the performance argument for alternatives.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Tailwind CSS vs WindiCSS：实用优先CSS框架对比',
    intro: 'Tailwind CSS和WindiCSS是实用优先的CSS框架，支持快速UI开发。Tailwind是原创且最受欢迎的，而WindiCSS提供更快的构建和额外功能。本比较涵盖性能、功能、开发者体验和两个框架的未来。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Tailwind CSS是行业标准，拥有优秀的生态系统和JIT编译器。WindiCSS提供更快的构建和额外实用程序，但未来不确定。对于生产项目，Tailwind是更安全的选择。对于个人项目或构建速度关键时，WindiCSS可能值得考虑。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'WindiCSS构建比Tailwind CSS快10-100倍',
    takeaway2: 'Tailwind有更大的社区、更好的文档和更多资源',
    takeaway3: 'WindiCSS包括额外功能如attributify模式',
    takeaway4: 'Tailwind JIT显著缩小了性能差距',
    takeaway5: 'WindiCSS开发已放缓；考虑UnoCSS作为替代',
    takeaway6: '两者都支持按需CSS生成和tree-shaking',
    
    whatIsTailwindTitle: '什么是Tailwind CSS？',
    whatIsTailwindContent: 'Tailwind CSS是由Adam Wathan于2017年创建的实用优先CSS框架。它提供低级实用类，让你直接在标记中构建设计。每周npm下载量超过500万次，Tailwind已成为最受欢迎的实用优先CSS框架，被GitHub、Netflix和NASA等公司使用。',
    
    whatIsWindiCSSTitle: '什么是WindiCSS？',
    whatIsWindiCSSContent: 'WindiCSS是2020年创建的下一代实用优先CSS框架，作为Tailwind的更快替代品。它使用预编译方法实现更快的构建，并包含attributify模式和shortcuts等额外功能。WindiCSS设计为Tailwind CSS的直接替代品，具有增强的性能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '构建和开发性能基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较框架功能：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '使用模式对比：',
    
    tailwindExampleTitle: 'Tailwind CSS',
    windicssExampleTitle: 'WindiCSS',
    
    attributifyTitle: 'Attributify模式',
    attributifyIntro: 'WindiCSS独特功能：',
    
    shortcutsTitle: 'Shortcuts和别名',
    shortcutsIntro: '创建可重用的实用组合：',
    
    pluginsTitle: '插件生态系统',
    pluginsIntro: '扩展功能：',
    
    whenToUseTitle: '何时使用每个框架',
    tailwindBestFor: '使用Tailwind CSS的场景：',
    windicssBestFor: '使用WindiCSS的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Tailwind CSS仍是主导的实用优先CSS框架，拥有无与伦比的生态系统支持。其JIT编译器已缩小了与WindiCSS的大部分性能差距。WindiCSS仍提供独特功能如attributify模式和更快的冷启动，但其不确定的开发状态令人担忧。对于大多数项目，推荐Tailwind CSS。如果需要类似WindiCSS的功能和活跃开发，考虑UnoCSS，它结合了两者的优点并具有出色的性能。',
    
    faq1q: 'WindiCSS还在维护吗？',
    faq1a: 'WindiCSS开发自2022年中期以来已显著放缓。核心团队已将重心转移到其他项目。虽然它仍然工作，但新项目应考虑UnoCSS或Tailwind CSS。现有WindiCSS项目可以以最小的更改迁移到UnoCSS。',
    
    faq2q: '什么是UnoCSS，它如何比较？',
    faq2a: 'UnoCSS是由Anthony Fu创建的现代原子CSS引擎。它比Tailwind和WindiCSS都快，支持Tailwind/WindiCSS预设，并具有活跃开发。UnoCSS通常被推荐为WindiCSS的继承者，具有更好的性能和功能。',
    
    faq3q: '我可以从WindiCSS迁移到Tailwind吗？',
    faq3a: '可以，迁移是可能的，因为WindiCSS设计为Tailwind替代品。大多数实用类是兼容的。你将失去WindiCSS特定功能如attributify和shortcuts，需要使用Tailwind插件或自定义CSS重新实现。',
    
    faq4q: 'Tailwind JIT能否匹配WindiCSS性能？',
    faq4a: 'Tailwind JIT显著改善了性能，但WindiCSS在冷启动方面仍然更快。在生产构建和增量开发中，差异可以忽略不计。Tailwind v3.4+已缩小了典型项目的大部分差距。',
    
    faq5q: '包大小呢？',
    faq5a: '两个框架都只生成使用的CSS，所以生产包大小相似。差异来自开发中未使用的实用程序。Tailwind CLI（~2MB）比WindiCSS（~500KB）大，但这不影响生产输出。',
    
    faq6q: '哪个IDE支持更好？',
    faq6a: 'Tailwind CSS IntelliSense更成熟，具有更好的自动补全、linting和悬停预览。WindiCSS有自己的VS Code扩展，具有类似功能。两者都提供良好的DX，但Tailwind扩展有更广泛的采用。',
    
    faq7q: '我可以在同一个项目中同时使用两者吗？',
    faq7a: '技术上可能但不推荐。它们会生成冲突的实用类并增加复杂性。每个项目选择一个框架。如果过渡，在部署前完成迁移。',
    
    faq8q: 'Tailwind CSS v4呢？',
    faq8a: 'Tailwind CSS v4（开发中）承诺通过用Rust编写的新引擎实现显著的性能改进。它旨在匹配或超过WindiCSS/UnoCSS性能，同时保持Tailwind生态系统。这可能会消除替代品的性能论点。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TailwindVsWindiCSS({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsTailwindTitle}</h3>
      <p style={pStyle}>{ct.whatIsTailwindContent}</p>

      <h3 style={h3Style}>{ct.whatIsWindiCSSTitle}</h3>
      <p style={pStyle}>{ct.whatIsWindiCSSContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? '对比概览' : 'Comparison Overview'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>WindiCSS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2017', '2020'],
              [isZh ? '编译方式' : 'Compilation', 'PostCSS / JIT', 'Precompiled / On-demand'],
              [isZh ? '冷启动速度' : 'Cold Start Speed', '~2-5s', '~50-200ms'],
              [isZh ? 'HMR速度' : 'HMR Speed', '~50-200ms', '~10-50ms'],
              [isZh ? 'CLI大小' : 'CLI Size', '~2MB', '~500KB'],
              [isZh ? '社区规模' : 'Community Size', 'Very Large', 'Small'],
              [isZh ? '开发状态' : 'Development Status', 'Active', 'Slowed'],
              [isZh ? '独特功能' : 'Unique Features', 'Large ecosystem', 'Attributify, Shortcuts'],
            ].map(([feature, tailwind, windicss], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{tailwind}</td>
                <td style={tdStyle}>{windicss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Tailwind CSS (JIT)</th>
              <th style={thStyle}>WindiCSS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '初始构建 (100个组件)' : 'Initial Build (100 components)', '2.5s', '180ms'],
              [isZh ? 'HMR更新' : 'HMR Update', '80ms', '25ms'],
              [isZh ? '生产构建' : 'Production Build', '3.2s', '400ms'],
              [isZh ? '生成的CSS (压缩)' : 'Generated CSS (minified)', '8KB', '7KB'],
              [isZh ? '内存使用 (开发)' : 'Memory Usage (dev)', '150MB', '80MB'],
            ].map(([metric, tailwind, windicss], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{tailwind}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{windicss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#38bdf8' }}>{ct.tailwindExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          dark: '#0fa9e6',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

// Component usage - Tailwind CSS
export default function Card() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Card Title
      </h2>
      <p className="text-gray-600 mb-4">
        Card description goes here with some content.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors">
        Click me
      </button>
    </div>
  );
}

// Responsive design
export default function ResponsiveLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-4 bg-gray-100">Item 1</div>
      <div className="p-4 bg-gray-100">Item 2</div>
      <div className="p-4 bg-gray-100">Item 3</div>
    </div>
  );
}

// Dark mode
export default function DarkModeExample() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <p className="text-base">This text adapts to dark mode</p>
    </div>
  );
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#4ade80' }}>{ct.windicssExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// windi.config.js
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#3fbaeb',
          dark: '#0fa9e6',
        },
      },
    },
  },
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-primary': 'btn bg-blue-500 text-white hover:bg-blue-600',
    'btn-secondary': 'btn bg-gray-200 text-gray-800 hover:bg-gray-300',
  },
  attributify: true,
});

// Component usage - WindiCSS (same as Tailwind)
export default function Card() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Card Title
      </h2>
      <p className="text-gray-600 mb-4">
        Card description goes here with some content.
      </p>
      <button className="btn-primary">
        Click me
      </button>
    </div>
  );
}

// Using shortcuts
export default function Buttons() {
  return (
    <div className="space-x-4">
      <button className="btn-primary">Primary</button>
      <button className="btn-secondary">Secondary</button>
    </div>
  );
}`}</code></pre>

      {/* Attributify Mode */}
      <h2 style={h2Style}>{ct.attributifyTitle}</h2>
      <p style={pStyle}>{ct.attributifyIntro}</p>

      <pre style={codeStyle}><code>{`// WindiCSS Attributify Mode
// Enable in config: attributify: true

// Traditional utility classes
<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Traditional Button
</button>

// Attributify mode - cleaner syntax
<button
  bg="blue-500 hover:blue-600"
  text="white"
  font="bold"
  p="y-2 x-4"
  rounded
>
  Attributify Button
</button>

// Another example - card component
// Traditional
<div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h2 class="text-xl font-bold text-gray-900 mb-4">Title</h2>
</div>

// Attributify
<div
  bg="white"
  rounded="lg"
  shadow="md"
  p="6"
  border="~ gray-200"
>
  <h2 text="xl gray-900" font="bold" m="b-4">Title</h2>
</div>

// Responsive with attributify
<div
  grid="~ cols-1 md:cols-2 lg:cols-3"
  gap="4"
>
  <div bg="gray-100" p="4">Item 1</div>
  <div bg="gray-100" p="4">Item 2</div>
  <div bg="gray-100" p="4">Item 3</div>
</div>

// Valueless attributify for boolean utilities
<button flex items-center justify-center rounded>
  <span text="gray-600">Icon Button</span>
</button>`}</code></pre>

      {/* Shortcuts */}
      <h2 style={h2Style}>{ct.shortcutsTitle}</h2>
      <p style={pStyle}>{ct.shortcutsIntro}</p>

      <pre style={codeStyle}><code>{`// WindiCSS Shortcuts - windi.config.js
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  shortcuts: {
    // Simple shortcuts
    'btn': 'py-2 px-4 font-semibold rounded-lg',
    'btn-primary': 'btn bg-blue-500 text-white hover:bg-blue-600',
    'btn-danger': 'btn bg-red-500 text-white hover:bg-red-600',
    
    // Card styles
    'card': 'bg-white rounded-lg shadow-md p-6',
    'card-hover': 'card hover:shadow-lg transition-shadow duration-300',
    
    // Input styles
    'input': 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    
    // Layout shortcuts
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    
    // Responsive shortcuts
    'container-padding': 'px-4 sm:px-6 lg:px-8',
    
    // Complex shortcuts with responsive
    'hero-title': 'text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900',
    
    // Animation shortcuts
    'animate-fade-in': 'animate-[fade-in_0.5s_ease-in-out]',
    'animate-slide-up': 'animate-[slide-up_0.3s_ease-out]',
  },
});

// Using shortcuts
export default function MyComponent() {
  return (
    <div className="container-padding">
      <h1 className="hero-title">Welcome</h1>
      
      <div className="flex-between mb-6">
        <span className="text-gray-600">Items</span>
        <button className="btn-primary">Add New</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-hover">
          <input className="input mb-4" placeholder="Type here..." />
          <button className="btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Tailwind CSS</th>
              <th style={thStyle}>WindiCSS</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'JIT编译' : 'JIT Compilation', '✓', '✓ (always on)'],
              [isZh ? '按需生成' : 'On-demand Generation', '✓', '✓'],
              [isZh ? '暗色模式' : 'Dark Mode', '✓ class/media', '✓ class/media'],
              [isZh ? '响应式设计' : 'Responsive Design', '✓', '✓'],
              [isZh ? '自定义主题' : 'Custom Theme', '✓', '✓'],
              [isZh ? 'Attributify模式' : 'Attributify Mode', '✗', '✓'],
              [isZh ? 'Shortcuts' : 'Shortcuts', '✗ (use @apply)', '✓ Built-in'],
              [isZh ? '插件系统' : 'Plugin System', '✓ Rich ecosystem', '✓ Limited'],
              [isZh ? 'IDE扩展' : 'IDE Extension', '✓ IntelliSense', '✓ WindiCSS Intellisense'],
              [isZh ? 'TypeScript支持' : 'TypeScript Support', '✓', '✓'],
              [isZh ? '框架集成' : 'Framework Integration', '✓ All major', '✓ Most major'],
              [isZh ? '文档' : 'Documentation', '✓ Excellent', '✓ Good'],
            ].map(([feature, tailwind, windicss], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{tailwind}</td>
                <td style={tdStyle}>{windicss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #38bdf8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#38bdf8' }}>{ct.tailwindBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '生产级项目' : 'Production-grade projects'}</li>
            <li>{isZh ? '需要长期支持' : 'Need long-term support'}</li>
            <li>{isZh ? '团队协作' : 'Team collaboration'}</li>
            <li>{isZh ? '需要丰富插件生态' : 'Need rich plugin ecosystem'}</li>
            <li>{isZh ? 'UI组件库开发' : 'UI component library development'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要优秀文档' : 'Need excellent documentation'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4ade80' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4ade80' }}>{ct.windicssBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '个人项目（考虑UnoCSS）' : 'Personal projects (consider UnoCSS)'}</li>
            <li>{isZh ? '需要attributify模式' : 'Need attributify mode'}</li>
            <li>{isZh ? '构建速度关键' : 'Build speed critical'}</li>
            <li>{isZh ? '喜欢shortcuts功能' : 'Prefer shortcuts feature'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '小型项目' : 'Small projects'}</li>
            <li>{isZh ? '从WindiCSS迁移到UnoCSS' : 'Migrating to UnoCSS later'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/css-minifier'} style={{ color: '#3b82f6', textDecoration: 'none' }}>CSS Minifier</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/url-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Encoder</a>
      </div>

      {/* FAQ */}
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
