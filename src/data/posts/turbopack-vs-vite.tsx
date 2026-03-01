'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Turbopack vs Vite: Next-Gen Bundlers Compared in 2025',
    intro: 'Turbopack (Vercel\'s Rust-based bundler) and Vite (the current standard) represent two approaches to modern JavaScript bundling. Turbopack promises 700x faster updates, while Vite has a mature ecosystem. This comparison examines performance, features, and when to migrate.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Turbopack offers 10-100x faster cold starts and updates using Rust and incremental compilation. Vite has better ecosystem, plugins, and stability. Turbopack is production-ready for Next.js 15+; Vite remains the choice for other frameworks and complex build requirements.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Turbopack is written in Rust - 10-700x faster than Webpack-based tools',
    takeaway2: 'Vite has unmatched plugin ecosystem and framework support',
    takeaway3: 'Turbopack currently only works with Next.js (beta for other frameworks)',
    takeaway4: 'Vite\'s dev server uses native ES modules - fast but not Turbopack-fast',
    takeaway5: 'Turbopack uses incremental computation with persistent caching',
    takeaway6: 'Vite is stable and battle-tested; Turbopack is newer but rapidly maturing',
    
    whatIsTurbopackTitle: 'What is Turbopack?',
    whatIsTurbopackContent: 'Turbopack is Vercel\'s next-generation bundler written in Rust, created by Tobias Koppers (Webpack founder) in 2022. It uses incremental computation and memoization to achieve unprecedented build speeds. Turbopack is the successor to Webpack and is now the default bundler for Next.js 15+ in development.',
    
    whatIsViteTitle: 'What is Vite?',
    whatIsViteContent: 'Vite, created by Evan You (Vue.js founder) in 2020, is a next-generation frontend build tool. It leverages native ES modules for lightning-fast development and Rollup for production builds. Vite has become the standard for modern web development with excellent framework support.',
    
    performanceTitle: 'Performance Benchmarks',
    performanceIntro: 'Real-world performance comparison on large Next.js apps:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comprehensive feature comparison:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'See how configuration differs:',
    
    turbopackExample: 'Turbopack',
    viteExample: 'Vite',
    
    ecosystemTitle: 'Plugin & Ecosystem',
    ecosystemIntro: 'Available plugins and integrations:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Moving between bundlers:',
    
    whenToUseTitle: 'When to Use Each',
    turbopackBestFor: 'Use Turbopack When:',
    viteBestFor: 'Use Vite When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Turbopack and Vite serve different stages of the adoption curve. Turbopack is the future of bundling with its Rust-based architecture and incredible performance, making it ideal for Next.js projects ready to adopt bleeding-edge tooling. Vite remains the pragmatic choice for most projects with its mature ecosystem, excellent framework support, and battle-tested reliability. Both represent the best of modern build tooling.',
    
    faq1q: 'Can I use Turbopack with React, Vue, or Svelte directly?',
    faq1a: 'Turbopack currently only supports Next.js in stable release. Experimental support exists for other frameworks, but it\'s not production-ready. For standalone React/Vue/Svelte apps, Vite remains the recommended choice.',
    
    faq2q: 'Is Turbopack production-ready?',
    faq2a: 'Yes for Next.js! Turbopack is stable for development in Next.js 15+. Production bundling with Turbopack is available in Next.js 15 canary. For critical production apps, test thoroughly before switching from Webpack.',
    
    faq3q: 'How much faster is Turbopack really?',
    faq3a: 'On large Next.js apps (3000+ modules): Cold start is 10-20x faster than Webpack, 3-5x faster than Vite. Hot updates are 50-700x faster than Webpack, 5-10x faster than Vite. Benefits increase with project size.',
    
    faq4q: 'Can I use Vite plugins with Turbopack?',
    faq4a: 'Not directly. Turbopack has a different plugin system. Many popular Vite/Rollup plugins have Turbopack equivalents, but the ecosystem is smaller. Check turbopack-ecmascript-plugins for available options.',
    
    faq5q: 'Does Turbopack support all Next.js features?',
    faq5a: 'Most Next.js features are supported including App Router, Server Components, and API routes. Some advanced Webpack-specific features may require Webpack mode. Check Next.js docs for current compatibility.',
    
    faq6q: 'Should I migrate my Vite project to Turbopack?',
    faq6a: 'If using Next.js: Yes, try it! Migration is simple (just add --turbo flag). For other frameworks: Wait until Turbopack supports your framework. The migration benefits don\'t outweigh the current limitations.',
    
    faq7q: 'What about production builds?',
    faq7a: 'Turbopack can now build for production in Next.js 15+ (stable in dev, experimental in prod). Vite uses Rollup for production builds, which is highly optimized. Both produce excellent production bundles.',
    
    faq8q: 'Which has better TypeScript support?',
    faq8a: 'Both have excellent TypeScript support. Vite uses esbuild for transpilation (very fast). Turbopack has native Rust-based TypeScript handling. Both provide instant type checking with IDE integration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Turbopack vs Vite：2025年下一代打包工具对比',
    intro: 'Turbopack（Vercel基于Rust的打包工具）和Vite（当前标准）代表了现代JavaScript打包的两种方法。Turbopack承诺700倍更快的更新，而Vite拥有成熟的生态系统。本比较考察性能、功能以及何时迁移。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Turbopack使用Rust和增量编译提供10-100倍更快的冷启动和更新。Vite有更好的生态系统、插件和稳定性。Turbopack对Next.js 15+生产可用；Vite仍然是其他框架和复杂构建需求的选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Turbopack用Rust编写 - 比基于Webpack的工具快10-700倍',
    takeaway2: 'Vite拥有无与伦比的插件生态系统和框架支持',
    takeaway3: 'Turbopack目前仅适用于Next.js（其他框架为beta）',
    takeaway4: 'Vite的开发服务器使用原生ES模块 - 快但不如Turbopack快',
    takeaway5: 'Turbopack使用增量计算和持久缓存',
    takeaway6: 'Vite稳定且经过实战检验；Turbopack较新但快速成熟',
    
    whatIsTurbopackTitle: '什么是Turbopack？',
    whatIsTurbopackContent: 'Turbopack是Vercel的下一代打包工具，用Rust编写，由Tobias Koppers（Webpack创始人）于2022年创建。它使用增量计算和记忆化实现前所未有的构建速度。Turbopack是Webpack的继任者，现在是Next.js 15+开发的默认打包工具。',
    
    whatIsViteTitle: '什么是Vite？',
    whatIsViteContent: 'Vite由Evan You（Vue.js创始人）于2020年创建，是下一代前端构建工具。它利用原生ES模块实现闪电般快速的开发，使用Rollup进行生产构建。Vite已成为现代Web开发的标准，具有出色的框架支持。',
    
    performanceTitle: '性能基准测试',
    performanceIntro: '大型Next.js应用的真实性能对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '全面的功能比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '看看配置有何不同：',
    
    turbopackExample: 'Turbopack',
    viteExample: 'Vite',
    
    ecosystemTitle: '插件与生态系统',
    ecosystemIntro: '可用的插件和集成：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '在打包工具之间移动：',
    
    whenToUseTitle: '何时使用每种方案',
    turbopackBestFor: '使用Turbopack的场景：',
    viteBestFor: '使用Vite的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Turbopack和Vite服务于采用曲线的不同阶段。Turbopack是打包的未来，其基于Rust的架构和令人难以置信的性能使其成为准备采用尖端工具的Next.js项目的理想选择。Vite仍然是大多数项目的务实选择，拥有成熟的生态系统、出色的框架支持和经过实战检验的可靠性。两者都代表了现代构建工具的最佳实践。',
    
    faq1q: '我可以直接将Turbopack与React、Vue或Svelte一起使用吗？',
    faq1a: 'Turbopack目前仅在稳定版本中支持Next.js。其他框架存在实验性支持，但尚未生产可用。对于独立的React/Vue/Svelte应用，Vite仍然是推荐选择。',
    
    faq2q: 'Turbopack已经可以用于生产了吗？',
    faq2a: 'Next.js可以！Turbopack对Next.js 15+的开发稳定。Next.js 15 canary中提供使用Turbopack的生产打包。对于关键生产应用，在从Webpack切换前要彻底测试。',
    
    faq3q: 'Turbopack到底快多少？',
    faq3a: '在大型Next.js应用（3000+模块）上：冷启动比Webpack快10-20倍，比Vite快3-5倍。热更新比Webpack快50-700倍，比Vite快5-10倍。好处随项目规模增加。',
    
    faq4q: '我可以在Turbopack中使用Vite插件吗？',
    faq4a: '不能直接使用。Turbopack有不同的插件系统。许多流行的Vite/Rollup插件有Turbopack等效物，但生态系统较小。查看turbopack-ecmascript-plugins了解可用选项。',
    
    faq5q: 'Turbopack支持所有Next.js功能吗？',
    faq5a: '支持大多数Next.js功能，包括App Router、Server Components和API路由。一些高级Webpack特定功能可能需要Webpack模式。查看Next.js文档了解当前兼容性。',
    
    faq6q: '我应该将我的Vite项目迁移到Turbopack吗？',
    faq6a: '如果使用Next.js：是的，试试！迁移很简单（只需添加--turbo标志）。对于其他框架：等到Turbopack支持你的框架。迁移好处不超过当前限制。',
    
    faq7q: '生产构建呢？',
    faq7a: 'Turbopack现在可以在Next.js 15+中为生产构建（开发稳定，生产实验）。Vite使用Rollup进行生产构建，高度优化。两者都产生优秀的生产包。',
    
    faq8q: '哪个TypeScript支持更好？',
    faq8a: '两者都有出色的TypeScript支持。Vite使用esbuild进行转译（非常快）。Turbopack有原生基于Rust的TypeScript处理。两者都通过IDE集成提供即时类型检查。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TurbopackVSVite({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsTurbopackTitle}</h3>
      <p style={pStyle}>{ct.whatIsTurbopackContent}</p>

      <h3 style={h3Style}>{ct.whatIsViteTitle}</h3>
      <p style={pStyle}>{ct.whatIsViteContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Turbopack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2022', '2020'],
              [isZh ? '编写语言' : 'Written In', 'Rust', 'TypeScript'],
              [isZh ? '开发服务器' : 'Dev Server', 'Rust native', 'Native ESM'],
              [isZh ? '生产构建' : 'Production Build', 'Rust (Turbo)', 'Rollup'],
              [isZh ? '框架支持' : 'Framework Support', 'Next.js primarily', 'Universal'],
              [isZh ? '缓存策略' : 'Caching Strategy', 'Incremental + Persistent', 'In-memory'],
              [isZh ? '插件系统' : 'Plugin System', 'Wasm/Rust plugins', 'Rollup/Vite plugins'],
              [isZh ? 'HMR引擎' : 'HMR Engine', 'Native Rust', 'Native ESM'],
            ].map(([feature, turbopack, vite], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{turbopack}</td>
                <td style={tdStyle}>{vite}</td>
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
              <th style={thStyle}>Turbopack</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Webpack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动 (3000模块)' : 'Cold Start (3000 modules)', '0.8s', '2.5s', '15s'],
              [isZh ? '热更新 (单文件)' : 'HMR (single file)', '5ms', '50ms', '350ms'],
              [isZh ? '热更新 (大规模)' : 'HMR (large change)', '10ms', '150ms', '1200ms'],
              [isZh ? '内存使用' : 'Memory Usage', '~500MB', '~300MB', '~1.5GB'],
              [isZh ? '生产构建' : 'Production Build', '~5s', '~8s', '~30s'],
              [isZh ? '首次构建后启动' : 'Start after build', '0.1s', '2s', 'N/A'],
            ].map(([metric, turbopack, vite, webpack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{turbopack}</td>
                <td style={tdStyle}>{vite}</td>
                <td style={{ ...tdStyle, color: '#ef4444' }}>{webpack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.turbopackExample}</h3>
      <pre style={codeStyle}><code>{`// Turbopack - Next.js Configuration
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for development
  experimental: {
    turbo: {
      // Turbopack-specific options
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

module.exports = nextConfig;

// Run with Turbopack
// next dev --turbo

// Package.json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start"
  }
}

// No configuration needed for most projects!
// Turbopack works out of the box with:
// - TypeScript
// - JSX/TSX
// - CSS Modules
// - JSON imports
// - Environment variables

// Advanced: Custom Turbopack config
// next.config.js
const nextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      // Add custom loaders if needed
    },
  },
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#646cff' }}>{ct.viteExample}</h3>
      <pre style={codeStyle}><code>{`// Vite Configuration
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Many plugins available
    // visualizer(),
    // svgr(),
    // etc.
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    host: true,
    // Proxy configuration
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Rollup options
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  
  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "src/styles/variables.scss";\`,
      },
    },
  },
  
  // Environment variables prefix
  envPrefix: 'VITE_',
});

// Package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Turbopack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '热模块替换' : 'Hot Module Replacement', '✓', '✓'],
              [isZh ? 'TypeScript' : 'TypeScript', '✓ Native', '✓ esbuild'],
              [isZh ? 'CSS Modules' : 'CSS Modules', '✓', '✓'],
              [isZh ? '代码分割' : 'Code Splitting', '✓', '✓'],
              [isZh ? 'Tree Shaking' : 'Tree Shaking', '✓', '✓'],
              [isZh ? '持久缓存' : 'Persistent Caching', '✓ Automatic', '✗ Manual'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', 'Growing', 'Mature (1000+)'],
              [isZh ? '框架支持' : 'Framework Support', 'Next.js', 'Universal'],
              [isZh ? 'SSR支持' : 'SSR Support', '✓ Next.js', '✓ Via plugins'],
              [isZh ? '环境变量' : 'Environment Variables', '✓', '✓'],
              [isZh ? '源码映射' : 'Source Maps', '✓', '✓'],
              [isZh ? 'Monorepo支持' : 'Monorepo Support', '✓', '✓'],
            ].map(([feature, turbopack, vite], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{turbopack}</td>
                <td style={tdStyle}>{vite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.turbopackBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js 15+项目' : 'Next.js 15+ projects'}</li>
            <li>{isZh ? '大型应用(3000+模块)' : 'Large apps (3000+ modules)'}</li>
            <li>{isZh ? '需要极速开发体验' : 'Need fastest dev experience'}</li>
            <li>{isZh ? '新项目可以采用尖端工具' : 'New projects can adopt bleeding-edge'}</li>
            <li>{isZh ? 'Vercel部署' : 'Vercel deployment'}</li>
            <li>{isZh ? '团队可以接受实验性工具' : 'Team okay with experimental'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #646cff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#646cff' }}>{ct.viteBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '非Next.js框架' : 'Non-Next.js frameworks'}</li>
            <li>{isZh ? '需要丰富插件' : 'Need rich plugins'}</li>
            <li>{isZh ? '稳定性和可靠性优先' : 'Stability and reliability priority'}</li>
            <li>{isZh ? 'React/Vue/Svelte独立应用' : 'React/Vue/Svelte standalone apps'}</li>
            <li>{isZh ? '自定义构建需求' : 'Custom build requirements'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '库开发' : 'Library development'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
