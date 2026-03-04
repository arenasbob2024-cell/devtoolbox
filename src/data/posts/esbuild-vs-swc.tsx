'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'esbuild vs SWC: JavaScript/TypeScript Compiler Comparison',
    intro: 'esbuild and SWC are two next-generation JavaScript/TypeScript compilers that dramatically outperform traditional tools like Babel. esbuild, written in Go, focuses on extreme speed and bundling capabilities. SWC, written in Rust, emphasizes correctness and ecosystem integration. Both are revolutionizing the frontend toolchain landscape in 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose esbuild for pure speed and bundling needs. Choose SWC for better TypeScript/JavaScript correctness, Next.js integration, and when you need a drop-in Babel replacement. Both are orders of magnitude faster than Babel, but SWC has better spec compliance.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'esbuild is 10-100x faster than Babel; SWC is 20x faster',
    takeaway2: 'SWC has better TypeScript and JavaScript spec compliance',
    takeaway3: 'esbuild includes bundler; SWC is primarily a compiler',
    takeaway4: 'SWC powers Next.js, Deno, and Parcel',
    takeaway5: 'esbuild has simpler API and faster cold starts',
    takeaway6: 'Both support JSX, TypeScript, and modern JS features',
    
    whatIsEsbuildTitle: 'What is esbuild?',
    whatIsEsbuildContent: 'esbuild is an extremely fast JavaScript bundler and minifier written in Go by Evan Wallace. Released in 2020, it achieves its speed through parallelism, minimal AST passes, and efficient memory usage. esbuild can bundle, minify, and transpile JavaScript and TypeScript, making it a complete build tool.',
    
    whatIsSwcTitle: 'What is SWC?',
    whatIsSwcContent: 'SWC (Speedy Web Compiler) is a Rust-based JavaScript/TypeScript compiler created by Vercel engineer DongYoon Kang. It serves as a drop-in replacement for Babel with 20x faster performance. SWC powers major frameworks like Next.js, Deno, and Parcel, focusing on correctness and spec compliance while maintaining high performance.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results and speed metrics:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Basic setup and usage:',
    
    esbuildExampleTitle: 'esbuild Configuration',
    swcExampleTitle: 'SWC Configuration',
    
    integrationTitle: 'Framework Integration',
    integrationIntro: 'Integration with popular frameworks:',
    
    useCasesTitle: 'Best Use Cases',
    esbuildBestFor: 'esbuild is Best For:',
    swcBestFor: 'SWC is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'esbuild and SWC represent the new generation of JavaScript tooling, both offering dramatic performance improvements over traditional compilers. esbuild excels at pure speed and bundling, making it ideal for Vite and projects prioritizing build performance. SWC offers better spec compliance and seamless Babel replacement, making it the choice for Next.js projects and teams requiring accurate TypeScript transpilation. Many modern build systems use both: esbuild for minification and SWC for transpilation.',
    
    faq1q: 'Can I use esbuild and SWC together?',
    faq1a: 'Yes, many tools combine them. Vite uses esbuild for TypeScript transpilation during development and minification. Next.js uses SWC for compilation and can use esbuild for minification. Using both leverages their respective strengths.',
    
    faq2q: 'Which is more accurate for TypeScript?',
    faq2a: 'SWC has better TypeScript spec compliance and handles edge cases more accurately. esbuild\'s TypeScript support is fast but doesn\'t perform full type checking. For critical TypeScript projects, SWC or tsc for type checking with either compiler is recommended.',
    
    faq3q: 'What about minification performance?',
    faq3a: 'Both offer excellent minification. esbuild is generally faster at minification. SWC\'s minifier is improving rapidly and produces comparable output sizes. For most projects, minification performance differences are negligible.',
    
    faq4q: 'Which has better plugin support?',
    faq4a: 'esbuild has a simpler plugin API written in JavaScript. SWC offers Wasm-based plugins and native Rust plugins. esbuild\'s plugin system is easier to use, while SWC\'s enables more complex transformations.',
    
    faq5q: 'How do they compare with Babel?',
    faq5a: 'Both are dramatically faster than Babel (10-100x for esbuild, 20x for SWC). SWC is designed as a drop-in Babel replacement with similar plugin architecture. esbuild offers less transformation flexibility but unmatched speed. Both lack Babel\'s extensive plugin ecosystem.',
    
    faq6q: 'Which is better for large monorepos?',
    faq6a: 'Both handle large codebases well. esbuild\'s speed advantage is more noticeable in large monorepos. SWC\'s integration with Turborepo and Nx makes it a natural choice for monorepo toolchains. Performance differences are minimal for incremental builds.',
    
    faq7q: 'What about source map support?',
    faq7a: 'Both generate accurate source maps. esbuild produces source maps quickly with lower overhead. SWC also supports source maps with high fidelity. Both integrate well with debugging tools and error reporting.',
    
    faq8q: 'Which should I choose for Next.js?',
    faq8a: 'SWC is the default compiler for Next.js since version 12. It provides seamless integration, faster builds, and supports Next.js-specific transformations. While you can configure Next.js to use other tools, SWC is the recommended choice.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'esbuild vs SWC：JavaScript/TypeScript 编译器对比',
    intro: 'esbuild和SWC是两个下一代JavaScript/TypeScript编译器，性能远超Babel等传统工具。esbuild用Go编写，专注于极致速度和打包能力。SWC用Rust编写，强调正确性和生态系统集成。两者都在2025年革命性地改变着前端工具链领域。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为纯速度和打包需求选择esbuild。为更好的TypeScript/JavaScript正确性、Next.js集成和需要Babel替代品时选择SWC。两者都比Babel快几个数量级，但SWC有更好的规范合规性。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'esbuild比Babel快10-100倍；SWC快20倍',
    takeaway2: 'SWC有更好的TypeScript和JavaScript规范合规性',
    takeaway3: 'esbuild包含打包器；SWC主要是编译器',
    takeaway4: 'SWC驱动Next.js、Deno和Parcel',
    takeaway5: 'esbuild有更简单的API和更快的冷启动',
    takeaway6: '两者都支持JSX、TypeScript和现代JS特性',
    
    whatIsEsbuildTitle: '什么是esbuild？',
    whatIsEsbuildContent: 'esbuild是由Evan Wallace用Go编写的极快JavaScript打包器和压缩器。2020年发布，它通过并行性、最小化AST遍历和高效的内存使用实现其速度。esbuild可以打包、压缩和转译JavaScript和TypeScript，使其成为完整的构建工具。',
    
    whatIsSwcTitle: '什么是SWC？',
    whatIsSwcContent: 'SWC（Speedy Web Compiler）是Vercel工程师DongYoon Kang创建的基于Rust的JavaScript/TypeScript编译器。它作为Babel的即插即用替代品，性能快20倍。SWC驱动Next.js、Deno和Parcel等主要框架，专注于正确性和规范合规性，同时保持高性能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试结果和速度指标：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '功能并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '基本设置和使用：',
    
    esbuildExampleTitle: 'esbuild配置',
    swcExampleTitle: 'SWC配置',
    
    integrationTitle: '框架集成',
    integrationIntro: '与流行框架的集成：',
    
    useCasesTitle: '最佳用例',
    esbuildBestFor: 'esbuild最适合：',
    swcBestFor: 'SWC最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'esbuild和SWC代表了JavaScript工具的新一代，都提供比传统编译器显著的性能改进。esbuild在纯速度和打包方面表现出色，使其成为Vite和优先考虑构建性能的项目的理想选择。SWC提供更好的规范合规性和无缝的Babel替换，使其成为Next.js项目和需要准确TypeScript转译的团队的选择。许多现代构建系统同时使用两者：esbuild用于压缩，SWC用于转译。',
    
    faq1q: '我可以同时使用esbuild和SWC吗？',
    faq1a: '是的，许多工具将它们结合使用。Vite在开发期间使用esbuild进行TypeScript转译和压缩。Next.js使用SWC进行编译，可以使用esbuild进行压缩。同时使用两者可以发挥它们各自的优势。',
    
    faq2q: '哪个对TypeScript更准确？',
    faq2a: 'SWC有更好的TypeScript规范合规性，更准确地处理边缘情况。esbuild的TypeScript支持很快，但不执行完整的类型检查。对于关键的TypeScript项目，建议使用SWC或用tsc进行类型检查配合任一编译器。',
    
    faq3q: '压缩性能如何？',
    faq3a: '两者都提供出色的压缩。esbuild通常在压缩方面更快。SWC的压缩器正在快速改进，产生可比的输出大小。对于大多数项目，压缩性能差异可以忽略不计。',
    
    faq4q: '哪个有更好的插件支持？',
    faq4a: 'esbuild有更简单的用JavaScript编写的插件API。SWC提供基于Wasm的插件和原生Rust插件。esbuild的插件系统更易使用，而SWC的可以进行更复杂的转换。',
    
    faq5q: '它们与Babel相比如何？',
    faq5a: '两者都比Babel快得多（esbuild快10-100倍，SWC快20倍）。SWC设计为Babel的即插即用替代品，有类似的插件架构。esbuild提供较少的转换灵活性但无与伦比的速度。两者都缺乏Babel广泛的插件生态系统。',
    
    faq6q: '哪个更适合大型monorepo？',
    faq6a: '两者都能很好地处理大型代码库。esbuild的速度优势在大型monorepo中更明显。SWC与Turborepo和Nx的集成使其成为monorepo工具链的自然选择。对于增量构建，性能差异很小。',
    
    faq7q: 'source map支持如何？',
    faq7a: '两者都生成准确的source map。esbuild快速生成source map，开销较低。SWC也高保真地支持source map。两者都能很好地集成调试工具和错误报告。',
    
    faq8q: 'Next.js应该选择哪个？',
    faq8a: 'SWC自版本12以来是Next.js的默认编译器。它提供无缝集成、更快的构建，并支持Next.js特定的转换。虽然你可以配置Next.js使用其他工具，但SWC是推荐的选择。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function EsbuildVsSwc({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsEsbuildTitle}</h3>
      <p style={pStyle}>{ct.whatIsEsbuildContent}</p>

      <h3 style={h3Style}>{ct.whatIsSwcTitle}</h3>
      <p style={pStyle}>{ct.whatIsSwcContent}</p>

      {/* Performance Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>esbuild</th>
              <th style={thStyle}>SWC</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '相对Babel速度' : 'Speed vs Babel', '10-100x', '20x'],
              [isZh ? '语言' : 'Language', 'Go', 'Rust'],
              [isZh ? '冷启动' : 'Cold Start', isZh ? '极快' : 'Very Fast', isZh ? '快' : 'Fast'],
              [isZh ? '内存效率' : 'Memory Efficiency', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '并行处理' : 'Parallelization', isZh ? '完全并行' : 'Fully Parallel', isZh ? '并行' : 'Parallel'],
            ].map(([metric, esbuild, swc], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{esbuild}</td>
                <td style={tdStyle}>{swc}</td>
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
              <th style={thStyle}>esbuild</th>
              <th style={thStyle}>SWC</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '打包' : 'Bundling', isZh ? '内置' : 'Built-in', isZh ? '通过spack' : 'Via spack'],
              [isZh ? '压缩' : 'Minification', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? 'TypeScript支持' : 'TypeScript Support', isZh ? '快速转译' : 'Fast Transpile', isZh ? '完整支持' : 'Full Support'],
              [isZh ? 'JSX支持' : 'JSX Support', isZh ? '完整' : 'Full', isZh ? '完整' : 'Full'],
              [isZh ? 'Source Maps' : 'Source Maps', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? 'Tree Shaking' : 'Tree Shaking', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '插件API' : 'Plugin API', isZh ? 'JavaScript' : 'JavaScript', isZh ? 'Wasm + Rust' : 'Wasm + Rust'],
              [isZh ? '规范合规性' : 'Spec Compliance', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
            ].map(([feature, esbuild, swc], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{esbuild}</td>
                <td style={tdStyle}>{swc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ffcf00' }}>{ct.esbuildExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// esbuild build script
const esbuild = require('esbuild');

// Build configuration
esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  target: 'es2020',
  outfile: 'dist/bundle.js',
  loader: {
    '.tsx': 'tsx',
    '.css': 'css',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
}).then(() => {
  console.log('Build complete!');
});

// Development server with watch mode
esbuild.context({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  sourcemap: true,
}).then(ctx => {
  ctx.watch();
  ctx.serve({
    port: 3000,
    servedir: 'public',
  });
});

// Using esbuild API programmatically
const result = await esbuild.transform(code, {
  loader: 'tsx',
  target: 'es2020',
  minify: true,
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#e57373' }}>{ct.swcExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .swcrc - SWC Configuration
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": true,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "development": false,
        "refresh": true
      },
      "legacyDecorator": true,
      "decoratorMetadata": true
    },
    "target": "es2020",
    "loose": false,
    "externalHelpers": true
  },
  "module": {
    "type": "es6",
    "strictMode": true,
    "noInterop": false
  },
  "minify": true,
  "sourceMaps": true
}

// Using SWC programmatically
const swc = require('@swc/core');

const result = await swc.transform(code, {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    target: 'es2020',
  },
  module: {
    type: 'commonjs',
  },
});

// Next.js automatically uses SWC
// next.config.js
module.exports = {
  swcMinify: true,
  experimental: {
    swcPlugins: [
      ['next-superjson-plugin', {}],
    ],
  },
};`}</code></pre>

      {/* Framework Integration */}
      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ffcf00' }}>
          <strong style={{ color: '#ffcf00' }}>esbuild Integrations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Vite（核心构建工具）、Snowpack、tsup、Remix（可选）、WordPress脚本、多个CDN工具。' : 'Vite (core build tool), Snowpack, tsup, Remix (optional), WordPress scripts, multiple CDN tools.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #e57373' }}>
          <strong style={{ color: '#e57373' }}>SWC Integrations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Next.js（默认编译器）、Deno（内置）、Parcel 2、Turbopack、Create React App（可选）、Turborepo。' : 'Next.js (default compiler), Deno (built-in), Parcel 2, Turbopack, Create React App (optional), Turborepo.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ffcf00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ffcf00' }}>{ct.esbuildBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Vite项目' : 'Vite projects'}</li>
            <li>{isZh ? '极致构建速度需求' : 'Maximum build speed needs'}</li>
            <li>{isZh ? '库打包' : 'Library bundling'}</li>
            <li>{isZh ? '简单项目结构' : 'Simple project structures'}</li>
            <li>{isZh ? '开发服务器' : 'Development servers'}</li>
            <li>{isZh ? '快速原型' : 'Rapid prototyping'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #e57373' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#e57373' }}>{ct.swcBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js项目' : 'Next.js projects'}</li>
            <li>{isZh ? 'Babel替换' : 'Babel replacement'}</li>
            <li>{isZh ? 'Deno项目' : 'Deno projects'}</li>
            <li>{isZh ? '严格的TS合规' : 'Strict TS compliance'}</li>
            <li>{isZh ? '复杂转换' : 'Complex transformations'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
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
        <a href={"/" + lang + "/tools/javascript-minifier"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JavaScript Minifier</a> • {' '}
        <a href={"/" + lang + "/tools/typescript-playground"} style={{ color: '#3b82f6', textDecoration: 'none' }}>TypeScript Playground</a>
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
