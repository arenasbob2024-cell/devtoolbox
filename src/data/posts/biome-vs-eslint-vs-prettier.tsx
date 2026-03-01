'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Biome vs ESLint + Prettier: The Ultimate Linting & Formatting Battle (2025)',
    intro: 'For years, ESLint and Prettier have been the standard for JavaScript linting and formatting. Now Biome (formerly Rome) promises to replace both with a single, blazing-fast Rust-based tool. This comprehensive comparison examines performance, features, configuration, and real-world migration to help you choose the right toolchain for 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Biome is 100x faster than ESLint and 35x faster than Prettier, combining linting and formatting in one tool. However, ESLint + Prettier still wins on ecosystem size, rule coverage, and language support. For new projects prioritizing speed, Biome is excellent. For maximum compatibility and rule coverage, stick with ESLint + Prettier.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Biome is 100x faster than ESLint for linting and 35x faster than Prettier for formatting',
    takeaway2: 'Biome combines linting + formatting in one tool, eliminating coordination issues',
    takeaway3: 'ESLint has 10,000+ rules via plugins; Biome has ~200 built-in rules',
    takeaway4: 'Prettier supports 20+ languages; Biome supports JavaScript, TypeScript, JSON, CSS, GraphQL',
    takeaway5: 'Biome requires minimal configuration; ESLint + Prettier often need extensive setup',
    takeaway6: 'Migration from ESLint + Prettier to Biome is straightforward for most projects',
    
    whatIsBiomeTitle: 'What is Biome?',
    whatIsBiomeContent: 'Biome (formerly Rome) is a modern toolchain for web projects, written in Rust. It combines linting, formatting, and more into a single fast tool. Created by the original Babel team, Biome aims to replace ESLint, Prettier, and other development tools with a unified, performance-first solution. The project was renamed from Rome to Biome in 2023.',
    
    whatIsESLintTitle: 'What is ESLint?',
    whatIsESLintContent: 'ESLint, created in 2013 by Nicholas C. Zakas, is the most popular JavaScript linter. Its plugin architecture has spawned thousands of community rules for every framework and use case. With over 25 million weekly downloads, ESLint remains the industry standard for JavaScript code quality.',
    
    whatIsPrettierTitle: 'What is Prettier?',
    whatIsPrettierContent: 'Prettier, created in 2017 by James Long, is an opinionated code formatter that supports over 20 languages. It enforces consistent style by parsing code and reprinting it with its own rules. Prettier has become the de facto standard for code formatting in JavaScript projects.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks on a medium-sized codebase (1,000 files, 100,000 lines):',
    
    lintSpeedTitle: 'Linting Speed',
    lintSpeedIntro: 'Time to lint the entire codebase:',
    
    formatSpeedTitle: 'Formatting Speed',
    formatSpeedIntro: 'Time to format the entire codebase:',
    
    combinedSpeedTitle: 'Combined Lint + Format',
    combinedSpeedIntro: 'Total time for both linting and formatting:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across tools:',
    
    rulesTitle: 'Rules & Coverage',
    rulesIntro: 'Rule coverage and customization options:',
    
    configTitle: 'Configuration Experience',
    configIntro: 'Setup and configuration comparison:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'How to migrate from ESLint + Prettier to Biome:',
    
    whenToUseTitle: 'When to Use Each Tool',
    biomeBestFor: 'Use Biome When:',
    eslintPrettierBestFor: 'Use ESLint + Prettier When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Biome represents a paradigm shift in JavaScript tooling. Its Rust-based architecture delivers unprecedented speed, and the unified toolchain simplifies development. For new projects and teams prioritizing developer experience, Biome is an excellent choice. However, ESLint + Prettier remain essential for projects requiring maximum rule coverage, specific framework plugins, or support for languages Biome doesn\'t handle. The best approach may be hybrid: use Biome for core JavaScript/TypeScript and ESLint for specialized rules.',
    
    faq1q: 'Is Biome production-ready?',
    faq1a: 'Yes, Biome is production-ready and used by companies like Dropbox, Mozilla, and others. It has reached version 1.x with stable APIs and is actively maintained with regular updates. The tool is considered stable for most JavaScript and TypeScript projects.',
    
    faq2q: 'Can Biome completely replace ESLint?',
    faq2a: 'For many projects, yes. Biome covers most common linting rules. However, if you rely on specific ESLint plugins (like react-hooks, next.js, or specialized framework rules), you may need to keep ESLint alongside Biome or wait for Biome to add equivalent rules.',
    
    faq3q: 'Does Biome support all Prettier formatters?',
    faq3a: 'Not yet. Biome supports JavaScript, TypeScript, JSX, JSON, CSS, and GraphQL. Prettier supports additional languages like Markdown, HTML, Vue, Svelte, and more. For polyglot projects, you might need both tools.',
    
    faq4q: 'How do I migrate from ESLint + Prettier to Biome?',
    faq4a: 'Run `npx @biomejs/biome migrate --write` to automatically convert your ESLint and Prettier configs to Biome. The tool handles most common configurations. Review the output and adjust as needed. You can also use Biome alongside ESLint for a gradual migration.',
    
    faq5q: 'Is Biome faster than Ruff (Python)?',
    faq5a: 'They serve different ecosystems but share similar design principles. Both are Rust-based tools offering 100x+ speedups over their predecessors. Biome targets JavaScript/TypeScript, while Ruff targets Python. The performance gains are comparable.',
    
    faq6q: 'Can I use Biome in CI/CD pipelines?',
    faq6a: 'Absolutely. Biome is designed for CI environments. Its speed makes it ideal for pipelines where every second counts. Use `biome ci` command for CI-optimized output with machine-readable formats.',
    
    faq7q: 'Does Biome work with VS Code?',
    faq7a: 'Yes, Biome has an official VS Code extension that provides real-time linting and formatting. It can replace both ESLint and Prettier extensions for supported file types, reducing extension overhead.',
    
    faq8q: 'What about import sorting?',
    faq8a: 'Biome has built-in import sorting, replacing tools like import-sort or @trivago/prettier-plugin-sort-imports. The sorting is configurable and integrated into the formatter, so imports are organized automatically.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Biome vs ESLint + Prettier：代码检查与格式化的终极对决 (2025)',
    intro: '多年来，ESLint 和 Prettier 一直是 JavaScript 代码检查和格式化的标准。现在 Biome（前身为 Rome）承诺用单一的 Rust 超快工具取代两者。本全面比较考察性能、功能、配置和实际迁移，帮助你为 2025 年选择合适的工具链。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Biome 比 ESLint 快 100 倍，比 Prettier 快 35 倍，将代码检查和格式化合二为一。但 ESLint + Prettier 在生态系统规模、规则覆盖率和语言支持方面仍然领先。对于追求速度的新项目，Biome 是绝佳选择。对于最大兼容性和规则覆盖，继续使用 ESLint + Prettier。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Biome 代码检查比 ESLint 快 100 倍，格式化比 Prettier 快 35 倍',
    takeaway2: 'Biome 将代码检查和格式化合为一体，消除协调问题',
    takeaway3: 'ESLint 通过插件拥有 10,000+ 规则；Biome 有约 200 条内置规则',
    takeaway4: 'Prettier 支持 20+ 种语言；Biome 支持 JavaScript、TypeScript、JSON、CSS、GraphQL',
    takeaway5: 'Biome 几乎零配置；ESLint + Prettier 通常需要大量设置',
    takeaway6: '从 ESLint + Prettier 迁移到 Biome 对大多数项目来说很简单',
    
    whatIsBiomeTitle: '什么是 Biome？',
    whatIsBiomeContent: 'Biome（前身为 Rome）是一个用 Rust 编写的现代 Web 项目工具链。它将代码检查、格式化等功能整合到一个快速工具中。由原 Babel 团队创建，Biome 旨在用统一的、性能优先的解决方案取代 ESLint、Prettier 和其他开发工具。该项目于 2023 年从 Rome 更名为 Biome。',
    
    whatIsESLintTitle: '什么是 ESLint？',
    whatIsESLintContent: 'ESLint 由 Nicholas C. Zakas 于 2013 年创建，是最流行的 JavaScript 代码检查工具。其插件架构催生了数千条社区规则，涵盖每个框架和用例。每周下载量超过 2500 万次，ESLint 仍然是 JavaScript 代码质量的行业标准。',
    
    whatIsPrettierTitle: '什么是 Prettier？',
    whatIsPrettierContent: 'Prettier 由 James Long 于 2017 年创建，是一个支持 20 多种语言的固执己见的代码格式化工具。它通过解析代码并按自己的规则重新打印来强制执行一致的风格。Prettier 已成为 JavaScript 项目中代码格式化的事实标准。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在中等规模代码库（1,000 个文件，100,000 行）上的性能基准测试：',
    
    lintSpeedTitle: '代码检查速度',
    lintSpeedIntro: '检查整个代码库的时间：',
    
    formatSpeedTitle: '格式化速度',
    formatSpeedIntro: '格式化整个代码库的时间：',
    
    combinedSpeedTitle: '检查 + 格式化总计',
    combinedSpeedIntro: '代码检查和格式化的总时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较各工具的功能：',
    
    rulesTitle: '规则与覆盖',
    rulesIntro: '规则覆盖和自定义选项：',
    
    configTitle: '配置体验',
    configIntro: '设置和配置对比：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '如何从 ESLint + Prettier 迁移到 Biome：',
    
    whenToUseTitle: '何时使用每个工具',
    biomeBestFor: '使用 Biome 的场景：',
    eslintPrettierBestFor: '使用 ESLint + Prettier 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，Biome 代表了 JavaScript 工具的范式转变。其基于 Rust 的架构提供了前所未有的速度，统一的工具链简化了开发。对于新项目和优先考虑开发者体验的团队，Biome 是绝佳选择。然而，对于需要最大规则覆盖、特定框架插件或 Biome 不支持的语言的项目，ESLint + Prettier 仍然必不可少。最佳方法可能是混合使用：核心 JavaScript/TypeScript 使用 Biome，专业规则使用 ESLint。',
    
    faq1q: 'Biome 已经可以用于生产了吗？',
    faq1a: '是的，Biome 已经可以用于生产，被 Dropbox、Mozilla 等公司使用。它已达到 1.x 版本，API 稳定，并积极维护，定期更新。该工具对大多数 JavaScript 和 TypeScript 项目被认为是稳定的。',
    
    faq2q: 'Biome 可以完全取代 ESLint 吗？',
    faq2a: '对于许多项目来说，可以。Biome 涵盖了大多数常见的代码检查规则。但是，如果你依赖特定的 ESLint 插件（如 react-hooks、next.js 或专门的框架规则），你可能需要保留 ESLint 或等待 Biome 添加等效规则。',
    
    faq3q: 'Biome 支持所有 Prettier 格式化器吗？',
    faq3a: '还不完全支持。Biome 支持 JavaScript、TypeScript、JSX、JSON、CSS 和 GraphQL。Prettier 支持更多语言如 Markdown、HTML、Vue、Svelte 等。对于多语言项目，你可能需要两个工具。',
    
    faq4q: '如何从 ESLint + Prettier 迁移到 Biome？',
    faq4a: '运行 `npx @biomejs/biome migrate --write` 自动将你的 ESLint 和 Prettier 配置转换为 Biome。该工具处理大多数常见配置。检查输出并根据需要调整。你也可以在渐进迁移过程中同时使用 Biome 和 ESLint。',
    
    faq5q: 'Biome 比 Ruff (Python) 快吗？',
    faq5a: '它们服务于不同的生态系统，但共享类似的设计原则。两者都是基于 Rust 的工具，比它们的前任提供 100 倍以上的速度提升。Biome 针对 JavaScript/TypeScript，而 Ruff 针对 Python。性能提升相当。',
    
    faq6q: '我可以在 CI/CD 流水线中使用 Biome 吗？',
    faq6a: '当然可以。Biome 专为 CI 环境设计。其速度使其非常适合每一秒都很重要的流水线。使用 `biome ci` 命令获得 CI 优化的输出和机器可读格式。',
    
    faq7q: 'Biome 可以在 VS Code 中使用吗？',
    faq7a: '可以，Biome 有官方的 VS Code 扩展，提供实时代码检查和格式化。它可以取代支持的文件类型的 ESLint 和 Prettier 扩展，减少扩展开销。',
    
    faq8q: '导入排序呢？',
    faq8a: 'Biome 内置导入排序功能，取代 import-sort 或 @trivago/prettier-plugin-sort-imports 等工具。排序可配置并集成到格式化器中，因此导入会自动组织。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function BiomeVsEslintVsPrettier({ lang }: { lang: string }) {
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
      <div style={{ ...boxStyle, borderLeft: '4px solid #6366f1', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.tldrTitle}</h3>
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

      {/* Tool Introductions */}
      <h2 style={h2Style}>{isZh ? '工具简介' : 'Tool Introductions'}</h2>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.whatIsBiomeTitle}</h3>
      <p style={pStyle}>{ct.whatIsBiomeContent}</p>

      <h3 style={{ ...h3Style, color: '#4b5563' }}>{ct.whatIsESLintTitle}</h3>
      <p style={pStyle}>{ct.whatIsESLintContent}</p>

      <h3 style={{ ...h3Style, color: '#c026d3' }}>{ct.whatIsPrettierTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrettierContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Biome</th>
              <th style={thStyle}>ESLint</th>
              <th style={thStyle}>Prettier</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '编写语言' : 'Written In', 'Rust', 'JavaScript', 'JavaScript'],
              [isZh ? '首次发布' : 'First Release', '2023 (Rome 2020)', '2013', '2017'],
              [isZh ? '主要功能' : 'Primary Function', 'Lint + Format', 'Lint only', 'Format only'],
              [isZh ? '包大小' : 'Package Size', '~15MB', '~2MB + plugins', '~3MB + plugins'],
              [isZh ? '依赖数量' : 'Dependencies', '0', '10+', '5+'],
              [isZh ? '配置文件' : 'Config Files', 'biome.json', '.eslintrc.*', '.prettierrc.*'],
              [isZh ? 'VS Code 支持' : 'VS Code Support', 'Official', 'Official', 'Official'],
            ].map(([feature, biome, eslint, prettier], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#6366f1', fontWeight: 600 }}>{biome}</td>
                <td style={tdStyle}>{eslint}</td>
                <td style={tdStyle}>{prettier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.lintSpeedTitle}</h3>
      <p style={pStyle}>{ct.lintSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具' : 'Tool'}</th>
              <th style={thStyle}>{isZh ? '时间' : 'Time'}</th>
              <th style={thStyle}>{isZh ? '文件/秒' : 'Files/sec'}</th>
              <th style={thStyle}>{isZh ? '相对速度' : 'Relative Speed'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Biome', '~0.5s', '~2,000', '100x'],
              ['ESLint', '~50s', '~20', '1x (baseline)'],
              ['ESLint (cache)', '~5s', '~200', '10x'],
            ].map(([tool, time, files, speed], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, color: tool === 'Biome' ? '#6366f1' : 'inherit' }}>{tool}</td>
                <td style={tdStyle}>{time}</td>
                <td style={tdStyle}>{files}</td>
                <td style={{ ...tdStyle, color: tool === 'Biome' ? '#22c55e' : 'inherit', fontWeight: 700 }}>{speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.formatSpeedTitle}</h3>
      <p style={pStyle}>{ct.formatSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具' : 'Tool'}</th>
              <th style={thStyle}>{isZh ? '时间' : 'Time'}</th>
              <th style={thStyle}>{isZh ? '文件/秒' : 'Files/sec'}</th>
              <th style={thStyle}>{isZh ? '相对速度' : 'Relative Speed'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Biome', '~0.3s', '~3,300', '35x'],
              ['Prettier', '~10s', '~100', '1x (baseline)'],
              ['dprint', '~0.4s', '~2,500', '25x'],
            ].map(([tool, time, files, speed], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, color: tool === 'Biome' ? '#6366f1' : 'inherit' }}>{tool}</td>
                <td style={tdStyle}>{time}</td>
                <td style={tdStyle}>{files}</td>
                <td style={{ ...tdStyle, color: tool === 'Biome' ? '#22c55e' : 'inherit', fontWeight: 700 }}>{speed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.combinedSpeedTitle}</h3>
      <p style={pStyle}>{ct.combinedSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具组合' : 'Toolchain'}</th>
              <th style={thStyle}>{isZh ? '总时间' : 'Total Time'}</th>
              <th style={thStyle}>{isZh ? '工具数量' : 'Tools'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Biome (lint + format)', '~0.8s', '1'],
              ['ESLint + Prettier', '~60s', '2'],
              ['ESLint (cache) + Prettier', '~15s', '2'],
            ].map(([tool, time, tools], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600, color: tool.includes('Biome') ? '#6366f1' : 'inherit' }}>{tool}</td>
                <td style={{ ...tdStyle, color: tool.includes('Biome') ? '#22c55e' : 'inherit', fontWeight: 700 }}>{time}</td>
                <td style={tdStyle}>{tools}</td>
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
              <th style={thStyle}>Biome</th>
              <th style={thStyle}>ESLint + Prettier</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '代码检查' : 'Linting', '✓ Built-in', '✓ ESLint'],
              [isZh ? '代码格式化' : 'Formatting', '✓ Built-in', '✓ Prettier'],
              [isZh ? '自动修复' : 'Auto-fix', '✓ Yes', '✓ Yes'],
              [isZh ? '导入排序' : 'Import Sorting', '✓ Built-in', 'Plugin needed'],
              [isZh ? 'CSS 支持' : 'CSS Support', '✓ Yes', 'stylelint + prettier'],
              [isZh ? 'JSON 支持' : 'JSON Support', '✓ Yes', 'Plugin needed'],
              [isZh ? 'GraphQL 支持' : 'GraphQL Support', '✓ Yes', 'Plugin needed'],
              [isZh ? 'Markdown 支持' : 'Markdown Support', '✗ No', '✓ Prettier'],
              [isZh ? 'Vue/Svelte 支持' : 'Vue/Svelte Support', '✗ No', '✓ Plugins'],
              [isZh ? '自定义规则' : 'Custom Rules', 'Limited', 'Full support'],
              [isZh ? 'IDE 集成' : 'IDE Integration', '✓ Official', '✓ Official'],
            ].map(([feature, biome, eslint], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: biome.startsWith('✓') ? '#22c55e' : '#ef4444' }}>{biome}</td>
                <td style={tdStyle}>{eslint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rules Comparison */}
      <h2 style={h2Style}>{ct.rulesTitle}</h2>
      <p style={pStyle}>{ct.rulesIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '规则类别' : 'Rule Category'}</th>
              <th style={thStyle}>Biome</th>
              <th style={thStyle}>ESLint</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '内置规则' : 'Built-in Rules', '~200', '~250'],
              [isZh ? '可用插件规则' : 'Plugin Rules Available', '0', '10,000+'],
              [isZh ? 'React 规则' : 'React Rules', '~30', '~200+'],
              [isZh ? 'TypeScript 规则' : 'TypeScript Rules', '~50', '~150+'],
              [isZh ? '可访问性规则' : 'Accessibility Rules', '~20', '~80+'],
              [isZh ? '性能规则' : 'Performance Rules', '~15', '~50+'],
              [isZh ? '自动修复率' : 'Auto-fix Rate', '~70%', '~60%'],
            ].map(([category, biome, eslint], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{category}</td>
                <td style={tdStyle}>{biome}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{eslint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Configuration */}
      <h2 style={h2Style}>{ct.configTitle}</h2>
      <p style={pStyle}>{ct.configIntro}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>Biome</h3>
      <pre style={codeStyle}><code>{`// biome.json - Simple, single file configuration
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "error"
      },
      "style": {
        "useConst": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#4b5563' }}>ESLint + Prettier</h3>
      <pre style={codeStyle}><code>{`// .eslintrc.json - ESLint configuration
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2024,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "error"
  },
  "settings": {
    "react": { "version": "detect" }
  }
}

// .prettierrc - Prettier configuration
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}

// package.json dependencies
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.0"
  }
}`}</code></pre>

      {/* Migration Guide */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Step 1: Install Biome
npm install --save-dev @biomejs/biome

# Step 2: Initialize Biome configuration
npx @biomejs/biome init

# Step 3: Migrate from ESLint and Prettier configs
npx @biomejs/biome migrate --write

# Step 4: Remove old dependencies (optional)
npm uninstall eslint prettier \\
  @typescript-eslint/eslint-plugin \\
  @typescript-eslint/parser \\
  eslint-plugin-react \\
  eslint-config-prettier \\
  prettier

# Step 5: Update package.json scripts
# Before:
# "lint": "eslint src/",
# "format": "prettier --write src/"
# After:
# "lint": "biome lint src/",
# "format": "biome format --write src/",
# "check": "biome check --write src/"

# Step 6: Update VS Code settings
# Install Biome extension and update settings.json:
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}

# Step 7: Run the check
npx @biomejs/biome check --write src/`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.biomeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? '追求极致性能' : 'Maximum performance priority'}</li>
            <li>{isZh ? '简化工具有望' : 'Simplified toolchain'}</li>
            <li>{isZh ? '纯 JS/TS 项目' : 'Pure JavaScript/TypeScript projects'}</li>
            <li>{isZh ? 'CI/CD 优化' : 'CI/CD optimization'}</li>
            <li>{isZh ? '单体仓库' : 'Monorepo setups'}</li>
            <li>{isZh ? '快速反馈循环' : 'Fast feedback loops'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4b5563' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4b5563' }}>{ct.eslintPrettierBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型遗留代码库' : 'Large legacy codebases'}</li>
            <li>{isZh ? '依赖特定插件' : 'Dependencies on specific plugins'}</li>
            <li>{isZh ? '多语言项目' : 'Multi-language projects'}</li>
            <li>{isZh ? '需要自定义规则' : 'Custom rules required'}</li>
            <li>{isZh ? 'Vue/Svelte 项目' : 'Vue/Svelte projects'}</li>
            <li>{isZh ? '框架特定规则' : 'Framework-specific rules'}</li>
            <li>{isZh ? '团队熟悉现有工具' : 'Team familiar with existing tools'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))', borderRadius: 12, border: '1px solid rgba(99,102,241,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#6366f1', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/javascript-minifier`} style={{ color: '#6366f1', textDecoration: 'none' }}>JS Minifier</a> • {' '}
        <a href={`/${lang}/tools/regex-tester`} style={{ color: '#6366f1', textDecoration: 'none' }}>Regex Tester</a>
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
