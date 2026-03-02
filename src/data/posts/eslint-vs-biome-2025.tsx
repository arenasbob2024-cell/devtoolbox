'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'ESLint vs Biome: Linting Tool Performance Comparison 2025',
    intro: 'ESLint has been the standard JavaScript linter for over a decade, but Biome (formerly Rome) is challenging it with Rust-based performance. This comparison examines speed, configuration, rule coverage, and migration paths to help you choose the right linter for 2025.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Biome is 10-100x faster than ESLint with zero configuration needed for most projects. ESLint has the largest ecosystem with thousands of plugins. For new projects in 2025, Biome is recommended for speed and simplicity. Keep ESLint for projects requiring specific plugins or complex custom rules.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Biome is 10-100x faster than ESLint, written in Rust',
    takeaway2: 'ESLint has 1000+ plugins, Biome has built-in rules only',
    takeaway3: 'Biome includes formatting, ESLint needs Prettier integration',
    takeaway4: 'Biome requires zero config for standard React/TypeScript projects',
    takeaway5: 'ESLint allows custom rules, Biome configuration is more limited',
    takeaway6: 'Both tools support auto-fixing and IDE integration',
    
    whatIsEslintTitle: 'What is ESLint?',
    whatIsEslintContent: 'ESLint, created in 2013, is the most widely used JavaScript linter. Its pluggable architecture allows developers to create and share custom rules. With thousands of plugins covering frameworks, libraries, and coding standards, ESLint remains the de facto standard for JavaScript linting.',
    
    whatIsBiomeTitle: 'What is Biome?',
    whatIsBiomeContent: 'Biome (formerly Rome) is a modern JavaScript toolchain written in Rust. It combines linting, formatting, and more into a single fast tool. Created by the former Rome team, Biome aims to provide a zero-configuration experience with excellent performance out of the box.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks on a medium-sized React project with 500+ files:',
    
    lintSpeedTitle: 'Linting Speed',
    lintSpeedIntro: 'Time to lint the entire project:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and ecosystem:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'How to configure each tool:',
    
    eslintConfigTitle: 'ESLint Configuration',
    biomeConfigTitle: 'Biome Configuration',
    
    rulesTitle: 'Rule Coverage',
    rulesIntro: 'Built-in rules and plugin support:',
    
    ideTitle: 'IDE Integration',
    ideIntro: 'Editor support and real-time linting:',
    
    migrationTitle: 'Migration from ESLint to Biome',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Tool',
    biomeBestFor: 'Use Biome When:',
    eslintBestFor: 'Use ESLint When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Biome represents the future of JavaScript linting with its Rust-based performance and zero-configuration approach. For most new projects, Biome offers everything you need out of the box. ESLint remains essential for projects requiring specific plugins or complex custom rules. Many teams now use both: Biome for fast local development and ESLint in CI for comprehensive checks.',
    
    faq1q: 'Can Biome replace ESLint completely?',
    faq1a: 'For many projects, yes. Biome covers most common linting needs including React, TypeScript, and accessibility rules. However, projects using specific ESLint plugins (like eslint-plugin-import, eslint-plugin-jsx-a11y advanced rules) may need to keep ESLint for now.',
    
    faq2q: 'Does Biome support all ESLint rules?',
    faq2a: 'No, Biome implements the most common and useful rules but not all ESLint rules. Biome focuses on rules that provide real value without false positives. Check the Biome documentation for the full list of supported rules and their ESLint equivalents.',
    
    faq3q: 'Can I use Biome with Prettier?',
    faq3a: 'You can, but it defeats the purpose. Biome includes a formatter that is faster than Prettier and produces similar output. Using Biome for both linting and formatting provides the best experience and eliminates tool conflicts.',
    
    faq4q: 'How do I migrate from ESLint to Biome?',
    faq4a: 'Biome provides a migration command: "npx @biomejs/biome migrate --write". This converts your ESLint config to Biome format. Not all rules migrate perfectly, so review the output. You may need to adjust some rules manually.',
    
    faq5q: 'Is Biome production-ready?',
    faq5a: 'Yes, Biome is production-ready. It is used by major companies and has stable releases. The tool is actively maintained with regular updates. However, always test thoroughly when switching linters in production codebases.',
    
    faq6q: 'Does Biome work with TypeScript?',
    faq6a: 'Yes, Biome has first-class TypeScript support. It can lint TypeScript files without additional configuration. Many rules are specifically designed for TypeScript patterns and best practices.',
    
    faq7q: 'What about VS Code integration?',
    faq7a: 'Biome has an official VS Code extension that provides real-time linting and formatting. The extension is fast and provides the same experience as ESLint. Installation is straightforward from the VS Code marketplace.',
    
    faq8q: 'Can I write custom rules for Biome?',
    faq8a: 'Currently, Biome does not support custom rules like ESLint. This is a deliberate design choice for simplicity and performance. If you need custom rules, you would need to keep ESLint for those specific cases.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'ESLint vs Biome：Lint工具性能对比 2025',
    intro: 'ESLint十多年来一直是标准JavaScript linter，但Biome（前身为Rome）正以其基于Rust的性能挑战它。本比较考察速度、配置、规则覆盖和迁移路径，帮助你在2025年选择合适的linter。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Biome比ESLint快10-100倍，大多数项目零配置即可。ESLint拥有最大生态系统和数千个插件。对于2025年的新项目，推荐使用Biome获得速度和简单性。保留ESLint用于需要特定插件或复杂自定义规则的项目。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Biome比ESLint快10-100倍，用Rust编写',
    takeaway2: 'ESLint有1000+插件，Biome只有内置规则',
    takeaway3: 'Biome包含格式化，ESLint需要Prettier集成',
    takeaway4: 'Biome对标准React/TypeScript项目零配置',
    takeaway5: 'ESLint允许自定义规则，Biome配置较有限',
    takeaway6: '两个工具都支持自动修复和IDE集成',
    
    whatIsEslintTitle: '什么是ESLint？',
    whatIsEslintContent: 'ESLint创建于2013年，是最广泛使用的JavaScript linter。其可插拔架构允许开发者创建和共享自定义规则。拥有数千个覆盖框架、库和编码标准的插件，ESLint仍然是JavaScript linting的事实标准。',
    
    whatIsBiomeTitle: '什么是Biome？',
    whatIsBiomeContent: 'Biome（前身为Rome）是一个用Rust编写的现代JavaScript工具链。它将linting、格式化等功能组合成一个快速工具。由前Rome团队创建，Biome旨在提供零配置体验和开箱即用的出色性能。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在一个中型React项目（500+文件）上的基准测试：',
    
    lintSpeedTitle: 'Linting速度',
    lintSpeedIntro: 'lint整个项目的时间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和生态系统：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '如何配置每个工具：',
    
    eslintConfigTitle: 'ESLint 配置',
    biomeConfigTitle: 'Biome 配置',
    
    rulesTitle: '规则覆盖',
    rulesIntro: '内置规则和插件支持：',
    
    ideTitle: 'IDE集成',
    ideIntro: '编辑器支持和实时linting：',
    
    migrationTitle: '从ESLint迁移到Biome',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个工具',
    biomeBestFor: '使用Biome的场景：',
    eslintBestFor: '使用ESLint的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '2025年，Biome代表着JavaScript linting的未来，其基于Rust的性能和零配置方法。对于大多数新项目，Biome开箱即用提供你所需的一切。ESLint对于需要特定插件或复杂自定义规则的项目仍然必不可少。许多团队现在两者都用：Biome用于快速本地开发，ESLint在CI中进行全面检查。',
    
    faq1q: 'Biome可以完全替代ESLint吗？',
    faq1a: '对于许多项目，可以。Biome覆盖大多数常见linting需求，包括React、TypeScript和可访问性规则。但是，使用特定ESLint插件（如eslint-plugin-import、eslint-plugin-jsx-a11y高级规则）的项目可能暂时需要保留ESLint。',
    
    faq2q: 'Biome支持所有ESLint规则吗？',
    faq2a: '不，Biome实现了最常见和有用的规则，但不是所有ESLint规则。Biome专注于提供真正价值且无误报的规则。查看Biome文档了解支持的规则完整列表及其ESLint等效规则。',
    
    faq3q: '我可以将Biome与Prettier一起使用吗？',
    faq3a: '可以，但这违背了初衷。Biome包含一个比Prettier更快并产生类似输出的格式化器。同时使用Biome进行linting和格式化提供最佳体验并消除工具冲突。',
    
    faq4q: '如何从ESLint迁移到Biome？',
    faq4a: 'Biome提供迁移命令："npx @biomejs/biome migrate --write"。这会将你的ESLint配置转换为Biome格式。并非所有规则都能完美迁移，所以请检查输出。你可能需要手动调整一些规则。',
    
    faq5q: 'Biome准备好用于生产了吗？',
    faq5a: '是的，Biome已经可以用于生产。它被大公司使用并有稳定版本。该工具积极维护并定期更新。但是，在生产代码库中切换linter时请务必彻底测试。',
    
    faq6q: 'Biome支持TypeScript吗？',
    faq6a: '是的，Biome有一流的TypeScript支持。它可以无需额外配置即可lint TypeScript文件。许多规则专为TypeScript模式和最佳实践设计。',
    
    faq7q: 'VS Code集成怎么样？',
    faq7a: 'Biome有官方VS Code扩展，提供实时linting和格式化。该扩展速度快，提供与ESLint相同的体验。从VS Code市场安装很简单。',
    
    faq8q: '我可以为Biome编写自定义规则吗？',
    faq8a: '目前，Biome不支持像ESLint那样的自定义规则。这是为了简单和性能的刻意设计选择。如果你需要自定义规则，需要在特定情况下保留ESLint。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function EslintVsBiome2025({ lang }: { lang: string }) {
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
      
      <h3 style={{ ...h3Style, color: '#4b5563' }}>{ct.whatIsEslintTitle}</h3>
      <p style={pStyle}>{ct.whatIsEslintContent}</p>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.whatIsBiomeTitle}</h3>
      <p style={pStyle}>{ct.whatIsBiomeContent}</p>

      <h2 style={h2Style}>{isZh ? '核心对比' : 'Core Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>ESLint</th>
              <th style={thStyle}>Biome</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2013', '2023 (Rome fork)'],
              [isZh ? '编程语言' : 'Written In', 'JavaScript', 'Rust'],
              [isZh ? '内置格式化' : 'Built-in Formatter', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '丰富' : 'Rich', isZh ? '无（内置规则）' : 'None (built-in)'],
              [isZh ? '配置复杂度' : 'Config Complexity', isZh ? '高' : 'High', isZh ? '低/零配置' : 'Low/Zero'],
              [isZh ? '自定义规则' : 'Custom Rules', isZh ? '支持' : 'Supported', isZh ? '不支持' : 'Not supported'],
              [isZh ? '二进制大小' : 'Binary Size', '~5MB', '~40MB'],
            ].map(([feature, eslint, biome], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#4b5563' }}>{eslint}</td>
                <td style={{ ...tdStyle, color: '#6366f1' }}>{biome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.lintSpeedTitle}</h3>
      <p style={pStyle}>{ct.lintSpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目规模' : 'Project Size'}</th>
              <th style={thStyle}>ESLint</th>
              <th style={thStyle}>Biome</th>
              <th style={thStyle}>{isZh ? '提升' : 'Speedup'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '小型（50文件）' : 'Small (50 files)', '1.2s', '0.05s', '24x'],
              [isZh ? '中型（500文件）' : 'Medium (500 files)', '12s', '0.4s', '30x'],
              [isZh ? '大型（5000文件）' : 'Large (5000 files)', '95s', '2.5s', '38x'],
            ].map(([size, eslint, biome, speedup], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{size}</td>
                <td style={tdStyle}>{eslint}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{biome}</td>
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
              <th style={thStyle}>ESLint</th>
              <th style={thStyle}>Biome</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动内存' : 'Startup Memory', '~150MB', '~30MB'],
              [isZh ? '峰值内存' : 'Peak Memory', '~400MB', '~80MB'],
              [isZh ? 'CPU使用' : 'CPU Usage', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
            ].map(([metric, eslint, biome], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{eslint}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{biome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#4b5563' }}>{ct.eslintConfigTitle}</h3>
      <pre style={codeStyle}><code>{`// ESLint - eslint.config.js (flat config)
import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "jsx-a11y/alt-text": "error",
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal"],
        "newlines-between": "always"
      }],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_"
      }],
      "@typescript-eslint/explicit-function-return-type": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: ["dist/", "node_modules/", "*.config.js"],
  },
];`}</code></pre>

      <h3 style={{ ...h3Style, color: '#6366f1' }}>{ct.biomeConfigTitle}</h3>
      <pre style={codeStyle}><code>{`// Biome - biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.5.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "complexity": {
        "noExtraBooleanCast": "error",
        "noMultipleSpacesInRegularExpressionLiterals": "error",
        "noUselessCatch": "error",
        "noUselessThisAlias": "error",
        "noUselessTypeConstraint": "error",
        "noWith": "error"
      },
      "correctness": {
        "noConstAssign": "error",
        "noConstantCondition": "warn",
        "noEmptyCharacterClassInRegex": "error",
        "noEmptyPattern": "error",
        "noGlobalObjectCalls": "error",
        "noInvalidConstructorSuper": "error",
        "noInvalidNewBuiltin": "error",
        "noNewSymbol": "error",
        "noNonoctalDecimalEscape": "error",
        "noPrecisionLoss": "error",
        "noSelfAssign": "error",
        "noSetterReturn": "error",
        "noSwitchDeclarations": "error",
        "noUndeclaredVariables": "error",
        "noUnreachable": "error",
        "noUnreachableSuper": "error",
        "noUnsafeFinally": "error",
        "noUnsafeOptionalChaining": "error",
        "noUnusedLabels": "error",
        "noUnusedVariables": "error",
        "useIsNan": "error",
        "useValidForDirection": "error",
        "useYield": "error"
      },
      "suspicious": {
        "noAsyncPromiseExecutor": "error",
        "noCatchAssign": "error",
        "noClassAssign": "error",
        "noCompareNegZero": "error",
        "noControlCharactersInRegex": "error",
        "noDebugger": "error",
        "noDuplicateCase": "error",
        "noDuplicateClassMembers": "error",
        "noDuplicateObjectKeys": "error",
        "noDuplicateParameters": "error",
        "noEmptyBlockStatements": "warn",
        "noExplicitAny": "warn",
        "noFallthroughSwitchClause": "error",
        "noFunctionAssign": "error",
        "noGlobalAssign": "error",
        "noImportAssign": "error",
        "noMisleadingCharacterClass": "error",
        "noPrototypeBuiltins": "error",
        "noRedeclare": "error",
        "noShadowRestrictedNames": "error",
        "noUnsafeDeclarationMerging": "error",
        "noUnsafeNegation": "error",
        "useGetterReturn": "error",
        "useValidTypeof": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingComma": "es5",
      "semicolons": "always",
      "arrowParentheses": "always"
    }
  }
}`}</code></pre>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>ESLint</th>
              <th style={thStyle}>Biome</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Linting' : 'Linting', isZh ? '核心功能' : 'Core', isZh ? '核心功能' : 'Core'],
              [isZh ? '格式化' : 'Formatting', isZh ? '需Prettier' : 'Needs Prettier', isZh ? '内置' : 'Built-in'],
              [isZh ? '自动修复' : 'Auto-fix', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '导入排序' : 'Import Sorting', isZh ? '需插件' : 'Plugin needed', isZh ? '内置' : 'Built-in'],
              [isZh ? 'React规则' : 'React Rules', isZh ? '需插件' : 'Plugin needed', isZh ? '内置' : 'Built-in'],
              [isZh ? 'TypeScript规则' : 'TypeScript Rules', isZh ? '需插件' : 'Plugin needed', isZh ? '内置' : 'Built-in'],
              [isZh ? '可访问性规则' : 'A11y Rules', isZh ? '需插件' : 'Plugin needed', isZh ? '内置' : 'Built-in'],
              [isZh ? '自定义规则' : 'Custom Rules', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? '社区插件' : 'Community Plugins', '1000+', isZh ? '无' : 'None'],
            ].map(([feature, eslint, biome], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#4b5563' }}>{eslint}</td>
                <td style={{ ...tdStyle, color: '#6366f1' }}>{biome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`# Migration from ESLint to Biome

# 1. Install Biome
npm install --save-dev @biomejs/biome

# 2. Initialize Biome config
npx @biomejs/biome init

# 3. Auto-migrate from ESLint config
npx @biomejs/biome migrate --write

# 4. Remove ESLint packages
npm uninstall eslint @eslint/js typescript-eslint
npm uninstall eslint-plugin-react eslint-plugin-react-hooks
npm uninstall eslint-plugin-jsx-a11y eslint-plugin-import
npm uninstall prettier eslint-config-prettier

# 5. Update package.json scripts
# Before:
"lint": "eslint . --ext .js,.jsx,.ts,.tsx"
"format": "prettier --write ."

# After:
"lint": "biome check ."
"format": "biome format --write ."
"lint:fix": "biome check --apply ."

# 6. Update VS Code settings
# Install Biome extension
# Update settings.json:
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit"
  }
}

# 7. Run initial check
npx @biomejs/biome check --apply .`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #6366f1' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>{ct.biomeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目' : 'New projects'}</li>
            <li>{isZh ? '追求极致速度' : 'Maximum speed needed'}</li>
            <li>{isZh ? '简单配置需求' : 'Simple configuration'}</li>
            <li>{isZh ? '标准React/TS项目' : 'Standard React/TS projects'}</li>
            <li>{isZh ? '减少工具数量' : 'Reduce tool count'}</li>
            <li>{isZh ? '大型代码库' : 'Large codebases'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #4b5563' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#4b5563' }}>{ct.eslintBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要特定插件' : 'Specific plugins needed'}</li>
            <li>{isZh ? '自定义规则' : 'Custom rules required'}</li>
            <li>{isZh ? '遗留项目' : 'Legacy projects'}</li>
            <li>{isZh ? '企业规则集' : 'Enterprise rule sets'}</li>
            <li>{isZh ? '特殊框架支持' : 'Special framework support'}</li>
            <li>{isZh ? '团队已熟悉ESLint' : 'Team familiar with ESLint'}</li>
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
