'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prettier vs dprint: Code Formatter Comparison 2025',
    intro: 'Prettier has been the go-to JavaScript formatter for years, but dprint is emerging as a Rust-based alternative with impressive performance. This comparison examines formatting quality, speed, configuration options, and ecosystem to help you choose the right formatter.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'dprint is 30-100x faster than Prettier with similar output quality. Prettier has wider language support and plugin ecosystem. For most new projects in 2025, dprint is the recommended choice for speed. Keep Prettier for projects requiring specific plugins or maximum language coverage.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'dprint is 30-100x faster than Prettier, written in Rust',
    takeaway2: 'Prettier supports 20+ languages, dprint supports 10+ core languages',
    takeaway3: 'Both produce similar formatting for JavaScript/TypeScript',
    takeaway4: 'dprint uses Wasm plugins, Prettier uses JS plugins',
    takeaway5: 'Prettier has larger community and more integrations',
    takeaway6: 'dprint includes built-in formatting for JSON, Markdown, TOML',
    
    whatIsPrettierTitle: 'What is Prettier?',
    whatIsPrettierContent: 'Prettier is an opinionated code formatter created in 2017. It parses code and reprints it with consistent styling, eliminating style debates in teams. With support for JavaScript, TypeScript, CSS, HTML, Markdown, and more, Prettier has become the standard formatter for JavaScript projects.',
    
    whatIsDprintTitle: 'What is dprint?',
    whatIsDprintContent: 'dprint is a pluggable formatting platform written in Rust and created by David Sherret. It uses WebAssembly plugins for different languages, providing extremely fast formatting. While newer than Prettier, dprint covers all major languages and offers impressive performance.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks on a large TypeScript project with 1000+ files:',
    
    formatSpeedTitle: 'Formatting Speed',
    formatSpeedIntro: 'Time to format the entire project:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and language support:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'How to configure each formatter:',
    
    prettierConfigTitle: 'Prettier Configuration',
    dprintConfigTitle: 'dprint Configuration',
    
    languageSupportTitle: 'Language Support',
    languageSupportIntro: 'Supported languages and file types:',
    
    outputComparisonTitle: 'Output Comparison',
    outputComparisonIntro: 'Formatting differences for common patterns:',
    
    migrationTitle: 'Migration from Prettier to dprint',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Tool',
    dprintBestFor: 'Use dprint When:',
    prettierBestFor: 'Use Prettier When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, dprint represents a compelling alternative to Prettier with its Rust-based performance. For most projects, dprint offers faster formatting with similar output quality. Prettier remains the safe choice for maximum language coverage and plugin ecosystem. Consider dprint for new projects, especially large codebases where formatting speed matters.',
    
    faq1q: 'Is dprint formatting compatible with Prettier?',
    faq1a: 'dprint aims for Prettier-compatible output for JavaScript/TypeScript, but there may be minor differences. Most teams can switch without issues, but review the output for edge cases. dprint provides a "check-compatibility" command to identify differences.',
    
    faq2q: 'Does dprint support all Prettier plugins?',
    faq2a: 'No, dprint uses its own Wasm plugin system. Most core languages covered by Prettier are supported by dprint plugins, but community plugins may not have equivalents. Check the dprint plugin registry for available formatters.',
    
    faq3q: 'Can I use dprint in CI/CD pipelines?',
    faq3a: 'Yes, dprint works well in CI/CD. Its speed makes it ideal for pipelines. Install via npm or download the binary directly. The "dprint check" command exits with error code if files need formatting.',
    
    faq4q: 'How do I configure dprint for a monorepo?',
    faq4a: 'dprint supports monorepos with a single config file at root. Use the "includes" pattern to target specific directories. You can also have per-package configs that inherit from root settings.',
    
    faq5q: 'Does dprint work with ESLint/Biome?',
    faq5a: 'Yes, dprint focuses solely on formatting and works alongside linters. For maximum simplicity, consider Biome which combines linting and formatting. Using dprint alone is great if you only need formatting.',
    
    faq6q: 'What about IDE integration?',
    faq6a: 'dprint has editor extensions for VS Code, IntelliJ, and other editors. The VS Code extension provides real-time formatting. Most editors that support Prettier can be configured to use dprint instead.',
    
    faq7q: 'Is dprint production-ready?',
    faq7a: 'Yes, dprint is production-ready and used by major projects. It has stable releases and active maintenance. The core TypeScript/JavaScript formatter is well-tested and reliable.',
    
    faq8q: 'How does dprint handle large files?',
    faq8a: 'dprint handles large files better than Prettier due to its Rust implementation. It uses less memory and processes files faster. Very large files that might timeout with Prettier format quickly with dprint.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Prettier vs dprint：代码格式化工具对比 2025',
    intro: 'Prettier多年来一直是首选JavaScript格式化工具，但dprint作为基于Rust的替代品正以其出色性能崛起。本比较考察格式化质量、速度、配置选项和生态系统，帮助你选择合适的格式化工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'dprint比Prettier快30-100倍，输出质量相似。Prettier有更广泛的语言支持和插件生态系统。对于2025年的大多数新项目，dprint因速度而成为推荐选择。保留Prettier用于需要特定插件或最大语言覆盖的项目。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'dprint比Prettier快30-100倍，用Rust编写',
    takeaway2: 'Prettier支持20+语言，dprint支持10+核心语言',
    takeaway3: '两者对JavaScript/TypeScript产生相似格式化',
    takeaway4: 'dprint使用Wasm插件，Prettier使用JS插件',
    takeaway5: 'Prettier有更大的社区和更多集成',
    takeaway6: 'dprint包含JSON、Markdown、TOML的内置格式化',
    
    whatIsPrettierTitle: '什么是Prettier？',
    whatIsPrettierContent: 'Prettier是一个固执己见的代码格式化工具，创建于2017年。它解析代码并以一致的风格重新打印，消除团队中的风格争论。支持JavaScript、TypeScript、CSS、HTML、Markdown等，Prettier已成为JavaScript项目的标准格式化工具。',
    
    whatIsDprintTitle: '什么是dprint？',
    whatIsDprintContent: 'dprint是一个用Rust编写的可插拔格式化平台，由David Sherret创建。它使用WebAssembly插件处理不同语言，提供极快的格式化。虽然比Prettier新，但dprint覆盖所有主要语言并提供出色的性能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在一个大型TypeScript项目（1000+文件）上的基准测试：',
    
    formatSpeedTitle: '格式化速度',
    formatSpeedIntro: '格式化整个项目的时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和语言支持：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '如何配置每个格式化工具：',
    
    prettierConfigTitle: 'Prettier 配置',
    dprintConfigTitle: 'dprint 配置',
    
    languageSupportTitle: '语言支持',
    languageSupportIntro: '支持的语言和文件类型：',
    
    outputComparisonTitle: '输出对比',
    outputComparisonIntro: '常见模式的格式化差异：',
    
    migrationTitle: '从Prettier迁移到dprint',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个工具',
    dprintBestFor: '使用dprint的场景：',
    prettierBestFor: '使用Prettier的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '2025年，dprint以其基于Rust的性能成为Prettier的有力替代品。对于大多数项目，dprint提供更快的格式化和相似的输出质量。Prettier仍然是最大语言覆盖和插件生态系统的安全选择。对于新项目考虑dprint，特别是格式化速度很重要的大型代码库。',
    
    faq1q: 'dprint格式化与Prettier兼容吗？',
    faq1a: 'dprint旨在为JavaScript/TypeScript提供与Prettier兼容的输出，但可能有细微差异。大多数团队可以无问题切换，但请检查边缘情况的输出。dprint提供"check-compatibility"命令来识别差异。',
    
    faq2q: 'dprint支持所有Prettier插件吗？',
    faq2a: '不，dprint使用自己的Wasm插件系统。Prettier覆盖的大多数核心语言都有dprint插件支持，但社区插件可能没有等效版本。查看dprint插件注册表了解可用的格式化工具。',
    
    faq3q: '我可以在CI/CD管道中使用dprint吗？',
    faq3a: '可以，dprint在CI/CD中运行良好。其速度使其成为管道的理想选择。通过npm安装或直接下载二进制文件。"dprint check"命令如果文件需要格式化则以错误代码退出。',
    
    faq4q: '如何为monorepo配置dprint？',
    faq4a: 'dprint支持带有根目录单个配置文件的monorepo。使用"includes"模式定位特定目录。你也可以拥有从根设置继承的每包配置。',
    
    faq5q: 'dprint与ESLint/Biome一起工作吗？',
    faq5a: '是的，dprint专注于格式化，可与linter一起工作。为了最大简单性，考虑结合linting和格式化的Biome。如果你只需要格式化，单独使用dprint很好。',
    
    faq6q: 'IDE集成怎么样？',
    faq6a: 'dprint有VS Code、IntelliJ和其他编辑器的扩展。VS Code扩展提供实时格式化。大多数支持Prettier的编辑器可以配置为使用dprint替代。',
    
    faq7q: 'dprint准备好用于生产了吗？',
    faq7a: '是的，dprint已经可以用于生产并被主要项目使用。它有稳定版本和积极维护。核心TypeScript/JavaScript格式化工具经过充分测试且可靠。',
    
    faq8q: 'dprint如何处理大文件？',
    faq8a: 'dprint由于其Rust实现，比Prettier更好地处理大文件。它使用更少内存并更快处理文件。可能在Prettier中超时的非常大的文件可以用dprint快速格式化。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PrettierVsDprint({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
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

      <h2 style={h2Style}>{isZh ? '工具概述' : 'Tool Overview'}</h2>
      
      <h3 style={{ ...h3Style, color: '#c026d3' }}>{ct.whatIsPrettierTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrettierContent}</p>

      <h3 style={{ ...h3Style, color: '#0891b2' }}>{ct.whatIsDprintTitle}</h3>
      <p style={pStyle}>{ct.whatIsDprintContent}</p>

      <h2 style={h2Style}>{isZh ? '核心对比' : 'Core Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Prettier</th>
              <th style={thStyle}>dprint</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2017', '2020'],
              [isZh ? '编程语言' : 'Written In', 'JavaScript', 'Rust'],
              [isZh ? '插件系统' : 'Plugin System', 'JavaScript', 'WebAssembly'],
              [isZh ? '配置方式' : 'Configuration', '.prettierrc', 'dprint.json'],
              [isZh ? '二进制大小' : 'Binary Size', '~10MB', '~15MB'],
              [isZh ? '安装方式' : 'Installation', 'npm', 'npm/binary'],
              [isZh ? '编辑器支持' : 'Editor Support', isZh ? '广泛' : 'Wide', isZh ? '增长中' : 'Growing'],
            ].map(([feature, prettier, dprint], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#c026d3' }}>{prettier}</td>
                <td style={{ ...tdStyle, color: '#0891b2' }}>{dprint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.formatSpeedTitle}</h3>
      <p style={pStyle}>{ct.formatSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目规模' : 'Project Size'}</th>
              <th style={thStyle}>Prettier</th>
              <th style={thStyle}>dprint</th>
              <th style={thStyle}>{isZh ? '提升' : 'Speedup'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '小型（100文件）' : 'Small (100 files)', '2.5s', '0.08s', '31x'],
              [isZh ? '中型（1000文件）' : 'Medium (1000 files)', '25s', '0.5s', '50x'],
              [isZh ? '大型（5000文件）' : 'Large (5000 files)', '120s', '1.8s', '67x'],
            ].map(([size, prettier, dprint, speedup], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{size}</td>
                <td style={tdStyle}>{prettier}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{dprint}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{speedup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{isZh ? '内存使用' : 'Memory Usage'}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Prettier</th>
              <th style={thStyle}>dprint</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动内存' : 'Startup Memory', '~80MB', '~15MB'],
              [isZh ? '峰值内存' : 'Peak Memory', '~250MB', '~50MB'],
              [isZh ? '并行处理' : 'Parallel Processing', isZh ? '有限' : 'Limited', isZh ? '原生支持' : 'Native'],
            ].map(([metric, prettier, dprint], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{prettier}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{dprint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#c026d3' }}>{ct.prettierConfigTitle}</h3>
      <pre style={codeStyle}><code>{`// Prettier - .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "jsxSingleQuote": false,
  "bracketSameLine": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "vueIndentScriptAndStyle": false,
  "embeddedLanguageFormatting": "auto"
}

// package.json scripts
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}

// .prettierignore
node_modules
dist
build
*.min.js
package-lock.json`}</code></pre>

      <h3 style={{ ...h3Style, color: '#0891b2' }}>{ct.dprintConfigTitle}</h3>
      <pre style={codeStyle}><code>{`// dprint - dprint.json
{
  "incremental": true,
  "useTabs": false,
  "lineWidth": 80,
  "indentWidth": 2,
  "newLineKind": "lf",
  "plugins": [
    "https://plugins.dprint.dev/typescript-0.88.0.wasm",
    "https://plugins.dprint.dev/json-0.19.0.wasm",
    "https://plugins.dprint.dev/markdown-0.16.0.wasm",
    "https://plugins.dprint.dev/toml-0.5.4.wasm",
    "https://plugins.dprint.dev/dockerfile-0.3.0.wasm"
  ],
  "typescript": {
    "semiColons": "asi",
    "singleQuote": true,
    "trailingCommas": "es5",
    "arrowFunction.useParentheses": "force",
    "bracePosition": "collapse",
    "operatorPosition": "nextLine",
    "jsx.quoteStyle": "double",
    "jsx.bracketPosition": "nextLine",
    "importSorting.enabled": true
  },
  "json": {
    "indentWidth": 2,
    "trailingCommas": "none"
  },
  "markdown": {
    "lineWidth": 80,
    "textWrap": "always"
  },
  "includes": [
    "**/*.{ts,tsx,js,jsx,json,md,toml}",
    "!**/node_modules",
    "!**/dist"
  ],
  "excludes": [
    "node_modules",
    "dist",
    "build",
    "*.min.js"
  ]
}

// package.json scripts
{
  "scripts": {
    "format": "dprint fmt",
    "format:check": "dprint check"
  }
}`}</code></pre>

      <h2 style={h2Style}>{ct.languageSupportTitle}</h2>
      <p style={pStyle}>{ct.languageSupportIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '语言' : 'Language'}</th>
              <th style={thStyle}>Prettier</th>
              <th style={thStyle}>dprint</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['JavaScript', isZh ? '内置' : 'Built-in', isZh ? '插件' : 'Plugin'],
              ['TypeScript', isZh ? '内置' : 'Built-in', isZh ? '插件' : 'Plugin'],
              ['JSX/TSX', isZh ? '内置' : 'Built-in', isZh ? '插件' : 'Plugin'],
              ['JSON', isZh ? '内置' : 'Built-in', isZh ? '插件' : 'Plugin'],
              ['CSS/SCSS', isZh ? '内置' : 'Built-in', isZh ? '社区插件' : 'Community'],
              ['HTML', isZh ? '内置' : 'Built-in', isZh ? '社区插件' : 'Community'],
              ['Markdown', isZh ? '内置' : 'Built-in', isZh ? '插件' : 'Plugin'],
              ['Vue', isZh ? '内置' : 'Built-in', isZh ? '无' : 'None'],
              ['GraphQL', isZh ? '内置' : 'Built-in', isZh ? '社区插件' : 'Community'],
              ['YAML', isZh ? '内置' : 'Built-in', isZh ? '社区插件' : 'Community'],
              ['TOML', isZh ? '无' : 'None', isZh ? '插件' : 'Plugin'],
              ['Dockerfile', isZh ? '无' : 'None', isZh ? '插件' : 'Plugin'],
            ].map(([lang, prettier, dprint], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{lang}</td>
                <td style={{ ...tdStyle, color: '#c026d3' }}>{prettier}</td>
                <td style={{ ...tdStyle, color: '#0891b2' }}>{dprint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.outputComparisonTitle}</h2>
      <p style={pStyle}>{ct.outputComparisonIntro}</p>

      <pre style={codeStyle}><code>{`// Input Code
const data={name:"John",age:30,address:{city:"NYC",country:"USA"}}
function greet(name:string,greeting:string="Hello"){return greeting+" "+name}

// Prettier Output
const data = {
  name: "John",
  age: 30,
  address: { city: "NYC", country: "USA" },
};
function greet(name: string, greeting: string = "Hello") {
  return greeting + " " + name;
}

// dprint Output (very similar)
const data = {
  name: "John",
  age: 30,
  address: { city: "NYC", country: "USA" },
};
function greet(name: string, greeting: string = "Hello") {
  return greeting + " " + name;
}

// Minor differences may occur in:
// - Method chain formatting
// - Complex type annotations
// - JSX attribute wrapping`}</code></pre>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Migration from Prettier to dprint

# 1. Install dprint
npm install --save-dev dprint

# 2. Initialize config
npx dprint init

# 3. Select plugins (TypeScript, JSON, Markdown, etc.)
# Or manually add to dprint.json

# 4. Check compatibility
npx dprint check --plugins dprint-plugin-typescript

# 5. Format all files
npx dprint fmt

# 6. Update package.json scripts
# Before:
"format": "prettier --write ."

# After:
"format": "dprint fmt"
"format:check": "dprint check"

# 7. Update VS Code settings
# Install dprint extension
# settings.json:
{
  "editor.defaultFormatter": "dprint.dprint",
  "editor.formatOnSave": true
}

# 8. Remove Prettier
npm uninstall prettier prettier-plugin-*
rm .prettierrc .prettierignore

# 9. Update CI/CD
# Replace prettier --check with dprint check`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0891b2' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0891b2' }}>{ct.dprintBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型代码库' : 'Large codebases'}</li>
            <li>{isZh ? '追求格式化速度' : 'Maximum formatting speed'}</li>
            <li>{isZh ? 'CI/CD优化' : 'CI/CD optimization'}</li>
            <li>{isZh ? '标准TS/JS项目' : 'Standard TS/JS projects'}</li>
            <li>{isZh ? '需要TOML支持' : 'TOML support needed'}</li>
            <li>{isZh ? 'Monorepo' : 'Monorepos'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #c026d3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#c026d3' }}>{ct.prettierBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要Vue/GraphQL支持' : 'Vue/GraphQL support'}</li>
            <li>{isZh ? '团队已熟悉Prettier' : 'Team familiar with Prettier'}</li>
            <li>{isZh ? '特殊插件需求' : 'Special plugin needs'}</li>
            <li>{isZh ? '最大语言覆盖' : 'Maximum language coverage'}</li>
            <li>{isZh ? '遗留项目' : 'Legacy projects'}</li>
            <li>{isZh ? '丰富编辑器集成' : 'Rich editor integrations'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/uuid-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
