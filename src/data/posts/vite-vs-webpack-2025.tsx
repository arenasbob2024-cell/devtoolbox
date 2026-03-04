'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Vite vs Webpack 2025: Build Tool Comparison',
    intro: 'Vite and Webpack are two leading build tools in the JavaScript ecosystem. Vite, released in 2020, has quickly gained popularity with its lightning-fast dev server and simplified configuration. Webpack, established in 2012, remains the battle-tested industry standard with unmatched flexibility. This comparison examines their performance, features, and ideal use cases in 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Vite for new projects, fast development experience, and simplicity. Choose Webpack for complex enterprise applications, advanced module federation, and when you need mature ecosystem support. Vite excels in dev speed while Webpack offers more production optimization options.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Vite dev server starts 10-100x faster than Webpack',
    takeaway2: 'Webpack has more mature ecosystem and plugin support',
    takeaway3: 'Vite uses native ES modules; Webpack uses bundling',
    takeaway4: 'Webpack Module Federation is more battle-tested',
    takeaway5: 'Vite configuration is simpler and more intuitive',
    takeaway6: 'Both produce optimized production builds',
    
    whatIsViteTitle: 'What is Vite?',
    whatIsViteContent: 'Vite is a next-generation frontend build tool created by Evan You (Vue.js creator). It leverages native ES modules for development, providing instant server start and lightning-fast hot module replacement. Vite uses Rollup for production builds, ensuring optimized output. Its philosophy emphasizes speed and developer experience.',
    
    whatIsWebpackTitle: 'What is Webpack?',
    whatIsWebpackContent: 'Webpack is a powerful module bundler that has been the industry standard since 2012. It processes your application as a dependency graph, bundling JavaScript, CSS, and assets into optimized packages. Webpack offers extensive configuration options, a mature plugin ecosystem, and advanced features like Module Federation for micro-frontends.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Comparing build and development performance:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Basic setup for each tool:',
    
    viteExampleTitle: 'Vite Configuration',
    webpackExampleTitle: 'Webpack Configuration',
    
    devExperienceTitle: 'Developer Experience',
    devExperienceIntro: 'Development workflow and tooling:',
    
    productionTitle: 'Production Optimization',
    productionIntro: 'Build optimization capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    viteBestFor: 'Vite is Best For:',
    webpackBestFor: 'Webpack is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Vite and Webpack serve different needs in the modern JavaScript ecosystem. Vite is the clear winner for developer experience and development speed, making it ideal for new projects and teams prioritizing fast iteration. Webpack remains the choice for complex enterprise applications, micro-frontends with Module Federation, and projects requiring extensive customization. In 2025, many teams choose Vite for new projects while maintaining Webpack for legacy codebases that require its advanced features.',
    
    faq1q: 'Can I migrate from Webpack to Vite?',
    faq1a: 'Yes, migration is possible and many teams have successfully moved from Webpack to Vite. Vite provides a Webpack compatibility plugin, and most common use cases can be migrated with minimal effort. However, complex Webpack configurations using advanced plugins may require more work.',
    
    faq2q: 'Which is better for large-scale applications?',
    faq2a: 'Webpack has been proven in large-scale enterprise applications for years. However, Vite has matured significantly and now handles large codebases well. For micro-frontends and complex module federation, Webpack currently has more mature solutions.',
    
    faq3q: 'How do they compare for React projects?',
    faq3a: 'Both work excellently with React. Vite\'s official React template provides fast HMR and excellent DX. Webpack is used by Create React App and offers more optimization options. In 2025, many React teams prefer Vite for its speed.',
    
    faq4q: 'What about production build size?',
    faq4a: 'Both produce similarly optimized production builds. Vite uses Rollup under the hood, which provides excellent tree-shaking. Webpack has more granular control over optimization but requires more configuration. Production build sizes are typically comparable.',
    
    faq5q: 'Which has better TypeScript support?',
    faq5a: 'Both have excellent TypeScript support out of the box. Vite uses esbuild for TypeScript transpilation, making it faster. Webpack requires ts-loader or babel-loader. For most projects, TypeScript support is equally good in both.',
    
    faq6q: 'Can I use both in a monorepo?',
    faq6a: 'Yes, you can use both Vite and Webpack in a monorepo setup. Some teams use Vite for newer packages while maintaining Webpack for legacy ones. Tools like Nx and Turborepo support both build systems.',
    
    faq7q: 'What about library development?',
    faq7a: 'Vite has a library mode that makes it easy to build and publish packages. Webpack can also build libraries but requires more configuration. Many library authors now prefer Vite for its simplicity.',
    
    faq8q: 'Which is more future-proof?',
    faq8a: 'Vite aligns with modern web standards like native ES modules and is designed for the future of web development. Webpack continues to evolve and adapt. Both are actively maintained and will remain relevant, but Vite\'s architecture is more aligned with browser evolution.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Vite vs Webpack 2025：构建工具对比',
    intro: 'Vite和Webpack是JavaScript生态系统中两个领先的构建工具。Vite于2020年发布，以其闪电般的开发服务器和简化的配置迅速获得人气。Webpack成立于2012年，仍然是久经考验的行业标准，具有无与伦比的灵活性。本比较考察它们在2025年的性能、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为新项目、快速开发体验和简单性选择Vite。为复杂的企业应用、高级模块联邦和需要成熟生态系统支持的场景选择Webpack。Vite在开发速度方面表现出色，而Webpack提供更多生产优化选项。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Vite开发服务器启动速度比Webpack快10-100倍',
    takeaway2: 'Webpack拥有更成熟的生态系统和插件支持',
    takeaway3: 'Vite使用原生ES模块；Webpack使用打包',
    takeaway4: 'Webpack模块联邦更成熟可靠',
    takeaway5: 'Vite配置更简单直观',
    takeaway6: '两者都能生成优化的生产构建',
    
    whatIsViteTitle: '什么是Vite？',
    whatIsViteContent: 'Vite是由Evan You（Vue.js创建者）创建的下一代前端构建工具。它在开发中利用原生ES模块，提供即时服务器启动和闪电般的热模块替换。Vite在生产构建中使用Rollup，确保优化的输出。其理念强调速度和开发者体验。',
    
    whatIsWebpackTitle: '什么是Webpack？',
    whatIsWebpackContent: 'Webpack是一个强大的模块打包器，自2012年以来一直是行业标准。它将你的应用程序作为依赖图处理，将JavaScript、CSS和资源打包成优化的包。Webpack提供广泛的配置选项、成熟的插件生态系统和模块联邦等高级功能用于微前端。',
    
    performanceTitle: '性能对比',
    performanceIntro: '比较构建和开发性能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '每个工具的基本设置：',
    
    viteExampleTitle: 'Vite配置',
    webpackExampleTitle: 'Webpack配置',
    
    devExperienceTitle: '开发者体验',
    devExperienceIntro: '开发工作流程和工具：',
    
    productionTitle: '生产优化',
    productionIntro: '构建优化能力：',
    
    useCasesTitle: '最佳用例',
    viteBestFor: 'Vite最适合：',
    webpackBestFor: 'Webpack最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Vite和Webpack在现代JavaScript生态系统中服务于不同的需求。Vite在开发者体验和开发速度方面是明显的赢家，使其成为新项目和优先考虑快速迭代的团队的理想选择。Webpack仍然是复杂企业应用、使用模块联邦的微前端以及需要大量定制的项目的选择。在2025年，许多团队为新项目选择Vite，同时为需要其高级功能的遗留代码库维护Webpack。',
    
    faq1q: '我可以从Webpack迁移到Vite吗？',
    faq1a: '是的，迁移是可能的，许多团队已成功从Webpack迁移到Vite。Vite提供Webpack兼容插件，大多数常见用例可以以最小的工作量迁移。但是，使用高级插件的复杂Webpack配置可能需要更多工作。',
    
    faq2q: '哪个更适合大规模应用？',
    faq2a: 'Webpack在大规模企业应用中已证明多年。但是，Vite已显著成熟，现在能很好地处理大型代码库。对于微前端和复杂的模块联邦，Webpack目前有更成熟的解决方案。',
    
    faq3q: '它们在React项目中如何比较？',
    faq3a: '两者都与React配合得很好。Vite的官方React模板提供快速的HMR和出色的DX。Webpack被Create React App使用并提供更多优化选项。在2025年，许多React团队因Vite的速度而偏爱它。',
    
    faq4q: '生产构建大小如何？',
    faq4a: '两者都生成类似优化的生产构建。Vite在底层使用Rollup，提供出色的tree-shaking。Webpack对优化有更细粒度的控制，但需要更多配置。生产构建大小通常相当。',
    
    faq5q: '哪个TypeScript支持更好？',
    faq5a: '两者都有开箱即用的优秀TypeScript支持。Vite使用esbuild进行TypeScript转译，使其更快。Webpack需要ts-loader或babel-loader。对于大多数项目，两者的TypeScript支持同样好。',
    
    faq6q: '我可以在monorepo中同时使用两者吗？',
    faq6a: '是的，你可以在monorepo设置中同时使用Vite和Webpack。一些团队为较新的包使用Vite，同时为遗留包维护Webpack。Nx和Turborepo等工具支持两种构建系统。',
    
    faq7q: '库开发怎么样？',
    faq7a: 'Vite有库模式，可以轻松构建和发布包。Webpack也可以构建库但需要更多配置。许多库作者现在因Vite的简单性而偏爱它。',
    
    faq8q: '哪个更面向未来？',
    faq8a: 'Vite与现代Web标准（如原生ES模块）保持一致，专为Web开发的未来而设计。Webpack继续发展和适应。两者都得到积极维护并将保持相关性，但Vite的架构更符合浏览器的演进。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ViteVsWebpack({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsViteTitle}</h3>
      <p style={pStyle}>{ct.whatIsViteContent}</p>

      <h3 style={h3Style}>{ct.whatIsWebpackTitle}</h3>
      <p style={pStyle}>{ct.whatIsWebpackContent}</p>

      {/* Performance Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Webpack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发服务器启动' : 'Dev Server Start', isZh ? '即时（<1秒）' : 'Instant (<1s)', isZh ? '慢（10-30秒）' : 'Slow (10-30s)'],
              [isZh ? '热更新速度' : 'HMR Speed', isZh ? '极快（<100ms）' : 'Very Fast (<100ms)', isZh ? '中等（200-500ms）' : 'Medium (200-500ms)'],
              [isZh ? '生产构建' : 'Production Build', isZh ? '快（Rollup）' : 'Fast (Rollup)', isZh ? '可配置' : 'Configurable'],
              [isZh ? '大型项目性能' : 'Large Project Perf', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '内存使用' : 'Memory Usage', isZh ? '低' : 'Low', isZh ? '较高' : 'Higher'],
            ].map(([metric, vite, webpack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{vite}</td>
                <td style={tdStyle}>{webpack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features Table */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Webpack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '模块系统' : 'Module System', isZh ? '原生ES模块' : 'Native ES Modules', isZh ? '打包' : 'Bundling'],
              [isZh ? '配置复杂度' : 'Config Complexity', isZh ? '简单' : 'Simple', isZh ? '复杂但强大' : 'Complex but Powerful'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', isZh ? '快速增长' : 'Growing Fast', isZh ? '成熟' : 'Mature'],
              [isZh ? '模块联邦' : 'Module Federation', isZh ? '实验性' : 'Experimental', isZh ? '成熟稳定' : 'Mature & Stable'],
              [isZh ? 'CSS处理' : 'CSS Handling', isZh ? '内置支持' : 'Built-in', isZh ? '需要loader' : 'Requires loaders'],
              [isZh ? 'TypeScript' : 'TypeScript', isZh ? '内置（esbuild）' : 'Built-in (esbuild)', isZh ? '需要loader' : 'Requires loader'],
              [isZh ? 'SSR支持' : 'SSR Support', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '代码分割' : 'Code Splitting', isZh ? '自动+手动' : 'Auto + Manual', isZh ? '高级控制' : 'Advanced Control'],
            ].map(([feature, vite, webpack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{vite}</td>
                <td style={tdStyle}>{webpack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#646cff' }}>{ct.viteExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'axios'],
        },
      },
    },
  },
});

// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8dd6f9' }}>{ct.webpackExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

// package.json scripts
{
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}`}</code></pre>

      {/* Developer Experience */}
      <h2 style={h2Style}>{ct.devExperienceTitle}</h2>
      <p style={pStyle}>{ct.devExperienceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #646cff' }}>
          <strong style={{ color: '#646cff' }}>Vite Developer Experience</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '即时服务器启动，无需等待打包。极快的热模块替换（HMR）。零配置TypeScript和JSX支持。内置CSS预处理器支持。直观的配置文件。' : 'Instant server start with no bundling required. Extremely fast Hot Module Replacement (HMR). Zero-config TypeScript and JSX support. Built-in CSS preprocessor support. Intuitive configuration file.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8dd6f9' }}>
          <strong style={{ color: '#8dd6f9' }}>Webpack Developer Experience</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '强大的webpack-dev-server。完善的错误提示和警告。丰富的loader和插件生态。详细的构建分析工具。大型社区支持。' : 'Powerful webpack-dev-server. Comprehensive error messages and warnings. Rich ecosystem of loaders and plugins. Detailed build analysis tools. Large community support.'}
          </p>
        </div>
      </div>

      {/* Production Optimization */}
      <h2 style={h2Style}>{ct.productionTitle}</h2>
      <p style={pStyle}>{ct.productionIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '优化' : 'Optimization'}</th>
              <th style={thStyle}>Vite</th>
              <th style={thStyle}>Webpack</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Tree Shaking' : 'Tree Shaking', isZh ? 'Rollup原生' : 'Rollup native', isZh ? '高级' : 'Advanced'],
              [isZh ? '代码压缩' : 'Minification', 'Terser/esbuild', 'Terser'],
              [isZh ? 'CSS优化' : 'CSS Optimization', isZh ? '内置' : 'Built-in', isZh ? '插件支持' : 'Plugin support'],
              [isZh ? '懒加载' : 'Lazy Loading', isZh ? '动态导入' : 'Dynamic imports', isZh ? '高级控制' : 'Advanced control'],
              [isZh ? '预加载' : 'Preloading', isZh ? '自动' : 'Automatic', isZh ? '手动配置' : 'Manual config'],
              [isZh ? '资源优化' : 'Asset Optimization', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
            ].map(([opt, vite, webpack], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{opt}</td>
                <td style={tdStyle}>{vite}</td>
                <td style={tdStyle}>{webpack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #646cff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#646cff' }}>{ct.viteBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目' : 'New projects'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? 'Vue/React/Svelte应用' : 'Vue/React/Svelte apps'}</li>
            <li>{isZh ? '库开发' : 'Library development'}</li>
            <li>{isZh ? '小型到中型项目' : 'Small to medium projects'}</li>
            <li>{isZh ? '追求开发速度的团队' : 'Teams prioritizing dev speed'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8dd6f9' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8dd6f9' }}>{ct.webpackBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '微前端架构' : 'Micro-frontend architecture'}</li>
            <li>{isZh ? '复杂构建需求' : 'Complex build requirements'}</li>
            <li>{isZh ? '遗留项目维护' : 'Legacy project maintenance'}</li>
            <li>{isZh ? '需要高级优化' : 'Advanced optimization needs'}</li>
            <li>{isZh ? '大型团队协作' : 'Large team collaboration'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
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
