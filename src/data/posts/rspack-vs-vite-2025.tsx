'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Rspack vs Vite 2025: The Ultimate Build Tool Comparison',
    intro: 'Vite revolutionized frontend development with its lightning-fast dev server, but Rspack is challenging its dominance with Rust-powered performance. This comprehensive comparison examines build speed, HMR, ecosystem compatibility, and real-world performance to help you choose the right build tool for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Rspack offers superior cold start and production build performance thanks to Rust, with full Webpack compatibility. Vite provides a better developer experience with instant HMR and a mature ecosystem. For Webpack migrations and large monorepos, choose Rspack. For new projects prioritizing DX, Vite remains excellent.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Rspack cold starts 10x faster than Webpack and 2-3x faster than Vite for large projects',
    takeaway2: 'Vite HMR remains faster for small-medium projects due to native ESM',
    takeaway3: 'Rspack offers near-100% Webpack compatibility, making migration painless',
    takeaway4: 'Vite has a larger plugin ecosystem (5000+ vs 200+ for Rspack)',
    takeaway5: 'Both tools support React, Vue, Svelte, and other major frameworks',
    takeaway6: 'Rspack production builds are 5-10x faster than Vite for large codebases',
    
    whatIsRspackTitle: 'What is Rspack?',
    whatIsRspackContent: 'Rspack is a Rust-based web bundler created by the ByteDance team in 2023. It combines the performance benefits of Rust with a Webpack-compatible API, making it an ideal migration target for existing Webpack projects. Rspack leverages parallel processing and incremental compilation to achieve remarkable build speeds.',
    
    whatIsViteTitle: 'What is Vite?',
    whatIsViteContent: 'Vite, created by Evan You in 2020, is a next-generation frontend build tool that leverages native ES modules for development and Rollup for production builds. Its dev server starts instantly regardless of project size, and HMR updates reflect in milliseconds. Vite has become the default choice for new React, Vue, and Svelte projects.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world benchmarks from a large-scale React project (10,000+ modules):',
    
    coldStartTitle: 'Cold Start Performance',
    coldStartIntro: 'Time to first meaningful render (development server):',
    
    hmrTitle: 'Hot Module Replacement (HMR)',
    hmrIntro: 'Time to reflect code changes in the browser:',
    
    buildTitle: 'Production Build',
    buildIntro: 'Time to complete production build:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities and developer experience:',
    
    configExampleTitle: 'Configuration Examples',
    configExampleIntro: 'Both tools use similar configuration patterns:',
    
    rspackExampleTitle: 'Rspack',
    viteExampleTitle: 'Vite',
    
    ecosystemTitle: 'Ecosystem & Plugin Support',
    ecosystemIntro: 'Plugin availability and community support:',
    
    rspackPluginsTitle: 'Rspack Plugin Ecosystem',
    vitePluginsTitle: 'Vite Plugin Ecosystem',
    
    typescriptTitle: 'TypeScript & Framework Support',
    typescriptIntro: 'First-class support for modern development:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Migrating between build tools:',
    
    whenToUseTitle: 'When to Use Each Tool',
    rspackBestFor: 'Use Rspack When:',
    viteBestFor: 'Use Vite When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Rspack and Vite are excellent choices with different strengths. Rspack excels at performance-critical scenarios, large monorepos, and Webpack migrations with its Rust foundation and compatibility layer. Vite continues to offer the best developer experience for most projects with instant server start, mature ecosystem, and excellent framework integration. For new projects, Vite remains the safe default. For existing Webpack projects seeking performance gains, Rspack is the clear winner.',
    
    faq1q: 'Is Rspack production-ready?',
    faq1a: 'Yes, Rspack is production-ready and used by major companies including ByteDance, Alibaba, and others handling millions of users. It reached version 1.0 in 2024 with stable APIs and is actively maintained with regular updates.',
    
    faq2q: 'Can I use Webpack plugins with Rspack?',
    faq2a: 'Many Webpack plugins work with Rspack out of the box or with minimal changes. Rspack implements a compatibility layer for loaders and plugins. However, some plugins that rely on internal Webpack APIs may need adaptation.',
    
    faq3q: 'Why is Rspack faster than Vite for production builds?',
    faq3a: 'Rspack uses Rust with parallel processing for both development and production, while Vite uses Rollup (JavaScript-based) for production builds. For large codebases, Rust\'s performance advantage becomes significant during bundling and minification.',
    
    faq4q: 'Does Rspack support Module Federation?',
    faq4a: 'Yes, Rspack has built-in support for Module Federation 2.0, making it excellent for micro-frontend architectures. This is one of its key advantages for enterprise applications.',
    
    faq5q: 'Can I migrate from Vite to Rspack?',
    faq5a: 'Yes, but it requires converting your Vite config to Rspack format. The APIs differ significantly. Tools like rsbuild can help bridge the gap. Migration is easier than Webpack to Vite due to Rspack\'s modern design.',
    
    faq6q: 'Which tool is better for React Server Components?',
    faq6a: 'Both support RSC through framework integrations. Next.js uses Turbopack (Rust-based, similar to Rspack), while Vite works with RSC through the vite-plugin-rsc. For Next.js specifically, the built-in bundler is recommended.',
    
    faq7q: 'How does Rspack handle tree-shaking compared to Vite?',
    faq7a: 'Both tools implement effective tree-shaking. Rspack uses SWC for AST transformations while Vite relies on Rollup. In practice, both produce similarly optimized bundles, with minor differences in edge cases.',
    
    faq8q: 'What about Rsbuild vs Rspack?',
    faq8a: 'Rsbuild is a higher-level build tool built on top of Rspack, similar to how Vite uses Rollup. Rsbuild provides more out-of-the-box features and presets, while Rspack is the core bundler. Use Rsbuild for easier setup, Rspack for more control.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Rspack vs Vite 2025：终极构建工具对比',
    intro: 'Vite以其极速开发服务器革新了前端开发，但Rspack正凭借Rust驱动的性能挑战其地位。本全面比较考察构建速度、HMR、生态兼容性和实际性能，帮助你为下一个项目选择合适的构建工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Rspack得益于Rust提供卓越的冷启动和生产构建性能，并完全兼容Webpack。Vite提供更好的开发体验，具有即时HMR和成熟的生态系统。对于Webpack迁移和大型monorepo，选择Rspack。对于优先考虑DX的新项目，Vite仍然是优秀选择。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Rspack冷启动比Webpack快10倍，比Vite快2-3倍（大型项目）',
    takeaway2: '对于中小型项目，Vite HMR由于原生ESM仍然更快',
    takeaway3: 'Rspack提供近乎100%的Webpack兼容性，使迁移无痛',
    takeaway4: 'Vite拥有更大的插件生态系统（5000+ vs Rspack 200+）',
    takeaway5: '两个工具都支持React、Vue、Svelte和其他主要框架',
    takeaway6: '对于大型代码库，Rspack生产构建比Vite快5-10倍',
    
    whatIsRspackTitle: '什么是Rspack？',
    whatIsRspackContent: 'Rspack是由字节跳动团队于2023年创建的基于Rust的Web打包器。它将Rust的性能优势与Webpack兼容的API相结合，使其成为现有Webpack项目的理想迁移目标。Rspack利用并行处理和增量编译实现卓越的构建速度。',
    
    whatIsViteTitle: '什么是Vite？',
    whatIsViteContent: 'Vite由尤雨溪于2020年创建，是下一代前端构建工具，在开发中使用原生ES模块，在生产中使用Rollup进行构建。其开发服务器无论项目大小都能即时启动，HMR更新在毫秒内反映。Vite已成为新React、Vue和Svelte项目的默认选择。',
    
    performanceTitle: '性能对比',
    performanceIntro: '来自大型React项目（10,000+模块）的真实基准测试：',
    
    coldStartTitle: '冷启动性能',
    coldStartIntro: '首次有意义渲染的时间（开发服务器）：',
    
    hmrTitle: '热模块替换（HMR）',
    hmrIntro: '代码变更在浏览器中反映的时间：',
    
    buildTitle: '生产构建',
    buildIntro: '完成生产构建的时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心能力和开发体验：',
    
    configExampleTitle: '配置示例',
    configExampleIntro: '两个工具使用类似的配置模式：',
    
    rspackExampleTitle: 'Rspack',
    viteExampleTitle: 'Vite',
    
    ecosystemTitle: '生态系统与插件支持',
    ecosystemIntro: '插件可用性和社区支持：',
    
    rspackPluginsTitle: 'Rspack插件生态',
    vitePluginsTitle: 'Vite插件生态',
    
    typescriptTitle: 'TypeScript与框架支持',
    typescriptIntro: '对现代开发的一流支持：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '在构建工具之间迁移：',
    
    whenToUseTitle: '何时使用每个工具',
    rspackBestFor: '使用Rspack的场景：',
    viteBestFor: '使用Vite的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Rspack和Vite都是具有不同优势的优秀选择。Rspack凭借Rust基础和兼容层在性能关键场景、大型monorepo和Webpack迁移中表现出色。Vite继续为大多数项目提供最佳开发体验，具有即时服务器启动、成熟生态系统和出色的框架集成。对于新项目，Vite仍然是安全的默认选择。对于寻求性能提升的现有Webpack项目，Rspack是明确的赢家。',
    
    faq1q: 'Rspack已经可以用于生产了吗？',
    faq1a: '是的，Rspack已经可以用于生产，被字节跳动、阿里巴巴等大公司用于服务数百万用户。它在2024年达到1.0版本，API稳定，并积极维护，定期更新。',
    
    faq2q: '我可以在Rspack中使用Webpack插件吗？',
    faq2a: '许多Webpack插件可以直接在Rspack中使用，或只需最小改动。Rspack为loader和插件实现了兼容层。但是，一些依赖Webpack内部API的插件可能需要适配。',
    
    faq3q: '为什么Rspack生产构建比Vite快？',
    faq3a: 'Rspack在开发和生产中都使用Rust进行并行处理，而Vite在生产构建中使用Rollup（基于JavaScript）。对于大型代码库，Rust的性能优势在打包和压缩期间变得显著。',
    
    faq4q: 'Rspack支持模块联邦吗？',
    faq4a: '是的，Rspack内置支持模块联邦2.0，使其非常适合微前端架构。这是其对企业应用的关键优势之一。',
    
    faq5q: '我可以从Vite迁移到Rspack吗？',
    faq5a: '可以，但需要将Vite配置转换为Rspack格式。API有显著差异。像Rsbuild这样的工具可以帮助弥合差距。由于Rspack的现代设计，迁移比Webpack到Vite更容易。',
    
    faq6q: '哪个工具更适合React服务器组件？',
    faq6a: '两者都通过框架集成支持RSC。Next.js使用Turbopack（基于Rust，类似Rspack），而Vite通过vite-plugin-rsc支持RSC。对于Next.js，推荐使用内置打包器。',
    
    faq7q: 'Rspack的tree-shaking与Vite相比如何？',
    faq7a: '两个工具都实现了有效的tree-shaking。Rspack使用SWC进行AST转换，而Vite依赖Rollup。在实践中，两者产生类似优化的包，在边缘情况下有细微差异。',
    
    faq8q: 'Rsbuild和Rspack有什么区别？',
    faq8a: 'Rsbuild是构建在Rspack之上的更高级构建工具，类似于Vite使用Rollup的方式。Rsbuild提供更多开箱即用的功能和预设，而Rspack是核心打包器。需要更简单设置时使用Rsbuild，需要更多控制时使用Rspack。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function RspackVsVite2025({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '构建工具简介' : 'Build Tool Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsRspackTitle}</h3>
      <p style={pStyle}>{ct.whatIsRspackContent}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.whatIsViteTitle}</h3>
      <p style={pStyle}>{ct.whatIsViteContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Rspack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2023', '2020'],
              [isZh ? '核心语言' : 'Core Language', 'Rust', 'TypeScript'],
              [isZh ? '开发服务器' : 'Dev Server', 'Rust bundler', 'Native ESM + esbuild'],
              [isZh ? '生产打包' : 'Production Build', 'Rust bundler', 'Rollup'],
              [isZh ? 'Webpack兼容' : 'Webpack Compatible', isZh ? '完全兼容' : 'Full compatible', isZh ? '部分兼容' : 'Partial'],
              [isZh ? '配置格式' : 'Config Format', 'Webpack-like', 'Vite config'],
              [isZh ? '转译器' : 'Transpiler', 'SWC', 'esbuild / SWC'],
            ].map(([feature, rspack, vite], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{rspack}</td>
                <td style={tdStyle}>{vite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.coldStartTitle}</h3>
      <p style={pStyle}>{ct.coldStartIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目规模' : 'Project Size'}</th>
              <th style={thStyle}>Webpack</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Rspack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '小型 (500模块)' : 'Small (500 modules)', '8.2s', '0.3s', '0.2s'],
              [isZh ? '中型 (3000模块)' : 'Medium (3000 modules)', '32s', '0.8s', '0.4s'],
              [isZh ? '大型 (10000模块)' : 'Large (10000 modules)', '78s', '2.1s', '0.9s'],
              [isZh ? '超大 (30000模块)' : 'XLarge (30000 modules)', '180s+', '5.2s', '1.8s'],
            ].map(([size, webpack, vite, rspack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{size}</td>
                <td style={tdStyle}>{webpack}</td>
                <td style={{ ...tdStyle, color: '#6366f1' }}>{vite}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{rspack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.hmrTitle}</h3>
      <p style={pStyle}>{ct.hmrIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Rspack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CSS更新' : 'CSS Update', '~50ms', '~80ms'],
              [isZh ? 'React组件更新' : 'React Component', '~100ms', '~120ms'],
              [isZh ? '大型文件更新' : 'Large File Update', '~200ms', '~150ms'],
              [isZh ? '依赖变更' : 'Dependency Change', '~300ms', '~250ms'],
            ].map(([scenario, vite, rspack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: vite.includes('50') || vite.includes('100') ? '#22c55e' : 'inherit' }}>{vite}</td>
                <td style={{ ...tdStyle, color: rspack.includes('150') || rspack.includes('250') ? '#22c55e' : 'inherit' }}>{rspack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.buildTitle}</h3>
      <p style={pStyle}>{ct.buildIntro}</p>

      <pre style={codeStyle}><code>{`# Build commands
# Rspack
rspack build --mode production

# Vite
vite build --mode production`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Vite (Rollup)</th>
              <th style={thStyle}>Rspack</th>
              <th style={thStyle}>{isZh ? '提升' : 'Speedup'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '小型项目' : 'Small project', '12s', '3s', '4x'],
              [isZh ? '中型项目' : 'Medium project', '45s', '8s', '5.6x'],
              [isZh ? '大型项目' : 'Large project', '180s', '22s', '8.2x'],
              [isZh ? '超大项目' : 'XLarge project', '420s', '45s', '9.3x'],
            ].map(([metric, vite, rspack, speedup], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{vite}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rspack}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{speedup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Rspack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '模块联邦' : 'Module Federation', isZh ? '原生支持 2.0' : 'Native 2.0', '@originjs/vite-plugin-federation'],
              [isZh ? '代码分割' : 'Code Splitting', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Tree Shaking' : 'Tree Shaking', isZh ? 'SWC优化' : 'SWC optimized', isZh ? 'Rollup优化' : 'Rollup optimized'],
              [isZh ? 'CSS处理' : 'CSS Processing', 'CSS/SASS/LESS', 'CSS/SASS/LESS/Stylus'],
              [isZh ? '图片资源' : 'Asset Handling', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '环境变量' : 'Environment Variables', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SSR支持' : 'SSR Support', isZh ? '支持' : 'Yes', isZh ? '优秀' : 'Excellent'],
              [isZh ? '懒加载' : 'Lazy Loading', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Source Map' : 'Source Maps', isZh ? '完整支持' : 'Full support', isZh ? '完整支持' : 'Full support'],
              [isZh ? '缓存' : 'Caching', isZh ? '持久化缓存' : 'Persistent cache', isZh ? '依赖预构建' : 'Dependency pre-bundle'],
            ].map(([feature, rspack, vite], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{rspack}</td>
                <td style={{ ...tdStyle, color: '#6366f1' }}>{vite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Config Examples */}
      <h2 style={h2Style}>{ct.configExampleTitle}</h2>
      <p style={pStyle}>{ct.configExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.rspackExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// rspack.config.js
const rspack = require('@rspack/core');
const refreshPlugin = require('@rspack/plugin-react-refresh');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: true,
                  refresh: true,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\\.css$/,
        use: [{ loader: 'postcss-loader' }],
        type: 'css',
      },
    ],
  },
  plugins: [
    new rspack.HtmlWebpackPlugin({
      template: './index.html',
    }),
    new refreshPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.viteExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});`}</code></pre>

      {/* Ecosystem */}
      <h2 style={h2Style}>{ct.ecosystemTitle}</h2>
      <p style={pStyle}>{ct.ecosystemIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>{ct.rspackPluginsTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '200+ 插件，快速增长中。支持大部分Webpack loader和插件。官方提供React、Vue、Svelte预设。核心插件：@rspack/plugin-react-refresh、@rspack/core、Rsbuild框架。' : '200+ plugins, growing rapidly. Supports most Webpack loaders and plugins. Official presets for React, Vue, Svelte. Core plugins: @rspack/plugin-react-refresh, @rspack/core, Rsbuild framework.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #6366f1' }}>
          <strong style={{ color: '#6366f1' }}>{ct.vitePluginsTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '5000+ 插件，成熟生态系统。框架集成完善：@vitejs/plugin-react、@vitejs/plugin-vue、@sveltejs/vite-plugin-svelte。丰富社区插件覆盖所有需求。' : '5000+ plugins, mature ecosystem. Excellent framework integration: @vitejs/plugin-react, @vitejs/plugin-vue, @sveltejs/vite-plugin-svelte. Rich community plugins cover all needs.'}
          </p>
        </div>
      </div>

      {/* TypeScript & Framework Support */}
      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '框架/技术' : 'Framework/Tech'}</th>
              <th style={thStyle}>Rspack</th>
              <th style={thStyle}>Vite</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['React 18/19', isZh ? '优秀 (SWC)' : 'Excellent (SWC)', isZh ? '优秀 (esbuild/SWC)' : 'Excellent (esbuild/SWC)'],
              ['Vue 3', isZh ? '优秀' : 'Excellent', isZh ? '原生支持' : 'Native support'],
              ['Svelte', isZh ? '良好' : 'Good', isZh ? '原生支持' : 'Native support'],
              ['Solid.js', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              ['TypeScript', isZh ? 'SWC转译' : 'SWC transpile', isZh ? 'esbuild转译' : 'esbuild transpile'],
              ['Next.js', isZh ? '实验性' : 'Experimental', isZh ? '通过插件' : 'Via plugin'],
              ['Nuxt', isZh ? '不支持' : 'Not supported', isZh ? '原生支持' : 'Native support'],
              ['SSR', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
            ].map(([framework, rspack, vite], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{framework}</td>
                <td style={tdStyle}>{rspack}</td>
                <td style={tdStyle}>{vite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Webpack to Rspack Migration

# 1. Install Rspack
npm install @rspack/core @rspack/cli @rspack/plugin-react-refresh

# 2. Rename config
mv webpack.config.js rspack.config.js

# 3. Update imports in config
// Before:
const webpack = require('webpack');
// After:
const rspack = require('@rspack/core');

# 4. Replace webpack-dev-server
// Before:
devServer: { ... }
// After:
Use Rsbuild or Rspack CLI dev command

# 5. Update package.json scripts
"scripts": {
  "dev": "rspack serve",
  "build": "rspack build"
}

# Vite to Rspack Migration

# 1. Install Rspack
npm install @rspack/core @rspack/cli

# 2. Convert vite.config.ts to rspack.config.js
# Note: Config format is different, requires manual conversion

# 3. Replace Vite-specific plugins
# @vitejs/plugin-react -> @rspack/plugin-react-refresh

# 4. Update imports
# import.meta.env -> process.env (with DefinePlugin)`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.rspackBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Webpack项目迁移' : 'Webpack project migration'}</li>
            <li>{isZh ? '大型monorepo' : 'Large monorepos'}</li>
            <li>{isZh ? '模块联邦需求' : 'Module Federation needs'}</li>
            <li>{isZh ? 'CI/CD构建优化' : 'CI/CD build optimization'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要Webpack兼容性' : 'Webpack compatibility required'}</li>
            <li>{isZh ? '字节跳动生态' : 'ByteDance ecosystem'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.viteBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? 'Vue/Nuxt项目' : 'Vue/Nuxt projects'}</li>
            <li>{isZh ? '最佳开发体验' : 'Best developer experience'}</li>
            <li>{isZh ? '需要丰富插件' : 'Rich plugin ecosystem needed'}</li>
            <li>{isZh ? 'SSR应用' : 'SSR applications'}</li>
            <li>{isZh ? '中小型项目' : 'Small-medium projects'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
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
        <a href={`/${lang}/tools/base64-encoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={`/${lang}/tools/code-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Code Formatter</a>
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
