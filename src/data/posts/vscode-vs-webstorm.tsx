'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'VS Code vs WebStorm: IDE Comparison for Developers',
    intro: 'Visual Studio Code and WebStorm are two leading development environments for web and software development. VS Code from Microsoft is a free, extensible editor, while WebStorm from JetBrains is a commercial IDE with built-in features. This comparison examines their capabilities, performance, and value for different developer needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose VS Code for free, lightweight editing with massive extension ecosystem. Choose WebStorm for out-of-the-box powerful features, superior JavaScript/TypeScript support, and integrated tools. VS Code requires setup; WebStorm works great immediately but costs money.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'VS Code is free and open-source',
    takeaway2: 'WebStorm costs $169/year for individuals',
    takeaway3: 'WebStorm has better out-of-the-box JavaScript/TypeScript support',
    takeaway4: 'VS Code has larger extension marketplace',
    takeaway5: 'Both support debugging, Git, and terminals',
    takeaway6: 'WebStorm includes database tools and more built-in features',
    
    whatIsVSCodeTitle: 'What is VS Code?',
    whatIsVSCodeContent: 'Visual Studio Code is a free, open-source code editor from Microsoft, released in 2015. Built on Electron, it combines the simplicity of a code editor with powerful IDE features through extensions. VS Code supports debugging, Git, syntax highlighting, and has become the most popular editor among developers.',
    
    whatIsWebStormTitle: 'What is WebStorm?',
    whatIsWebStormContent: 'WebStorm is a commercial IDE from JetBrains, specialized for JavaScript and web development. Released in 2010, it provides intelligent coding assistance for JavaScript, TypeScript, React, Vue, Angular, Node.js, and includes built-in tools for debugging, testing, and version control.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core development capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'How to configure each IDE:',
    
    vscodeExampleTitle: 'VS Code Settings',
    webstormExampleTitle: 'WebStorm Configuration',
    
    dataSourceTitle: 'Language Support',
    dataSourceIntro: 'Programming language support and features:',
    
    alertingTitle: 'Performance and Resources',
    alertingIntro: 'Performance characteristics and system requirements:',
    
    useCasesTitle: 'Best Use Cases',
    vscodeBestFor: 'VS Code is Best For:',
    webstormBestFor: 'WebStorm is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'VS Code and WebStorm serve different developer preferences. VS Code excels with its free, lightweight, and extensible approach, ideal for developers who want to customize their environment and work across many languages. WebStorm provides a polished, integrated experience out of the box, particularly strong for JavaScript/TypeScript development. If budget allows and you focus on web development, WebStorm offers superior productivity. For maximum flexibility and zero cost, VS Code is unbeatable.',
    
    faq1q: 'Is WebStorm worth the money?',
    faq1a: 'For professional JavaScript/TypeScript developers, WebStorm often pays for itself in productivity gains. Superior refactoring, navigation, and built-in tools save time. However, VS Code can match many features with extensions. Consider the trial and your workflow needs.',
    
    faq2q: 'Can VS Code do everything WebStorm does?',
    faq2a: 'Mostly yes, with extensions. WebStorm\'s features are built-in and integrated. VS Code can replicate functionality but requires finding and configuring extensions. WebStorm tends to have more polished implementations of advanced features like refactoring.',
    
    faq3q: 'Which is faster and lighter?',
    faq3a: 'VS Code generally uses less memory and starts faster, though this varies with extensions. WebStorm has more features loaded by default, using more RAM. Both perform well on modern hardware; the difference matters most on older machines.',
    
    faq4q: 'How is WebStorm for React/Vue/Angular?',
    faq4a: 'WebStorm provides excellent support for all major frameworks out of the box. It understands component structures, provides smart completion for props, and has built-in templates. VS Code matches this with extensions but requires more setup.',
    
    faq5q: 'Can I use WebStorm for Python or other languages?',
    faq5a: 'WebStorm is focused on JavaScript and web technologies. For Python, use PyCharm (also from JetBrains). For multiple languages, IntelliJ IDEA Ultimate supports all. VS Code handles many languages with extensions, making it more versatile.',
    
    faq6q: 'Which has better Git integration?',
    faq6a: 'Both have excellent Git support. WebStorm\'s is more feature-rich with visual merge conflict resolution and powerful history. VS Code\'s Git features are more basic but sufficient for most. GitHub integration is better in VS Code with official extension.',
    
    faq7q: 'What about debugging capabilities?',
    faq7a: 'Both support debugging well. WebStorm has more advanced JavaScript/Node.js debugging with better variable inspection and conditional breakpoints. VS Code debugging is excellent for most cases and highly configurable. Both support browser and Node.js debugging.',
    
    faq8q: 'How is the extension/plugin ecosystem?',
    faq8a: 'VS Code has a much larger extension marketplace with 30,000+ extensions. WebStorm has plugins but a smaller ecosystem. VS Code extensions cover more ground, but WebStorm\'s built-in features reduce the need for plugins. Both support themes and keymaps.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'VS Code vs WebStorm：开发者 IDE 对比',
    intro: 'Visual Studio Code 和 WebStorm 是两个领先的 Web 和软件开发环境。来自 Microsoft 的 VS Code 是一个免费、可扩展的编辑器，而来自 JetBrains 的 WebStorm 是一个具有内置功能的商业 IDE。本比较考察它们的能力、性能和对不同开发人员需求的价值。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '选择 VS Code 用于免费、轻量级编辑和庞大的扩展生态系统。选择 WebStorm 用于开箱即用的强大功能、卓越的 JavaScript/TypeScript 支持和集成工具。VS Code 需要设置；WebStorm 立即可用但需要付费。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'VS Code 是免费和开源的',
    takeaway2: 'WebStorm 个人版每年 169 美元',
    takeaway3: 'WebStorm 有更好的开箱即用 JavaScript/TypeScript 支持',
    takeaway4: 'VS Code 有更大的扩展市场',
    takeaway5: '两者都支持调试、Git 和终端',
    takeaway6: 'WebStorm 包括数据库工具和更多内置功能',
    
    whatIsVSCodeTitle: '什么是 VS Code？',
    whatIsVSCodeContent: 'Visual Studio Code 是 Microsoft 的免费、开源代码编辑器，于 2015 年发布。基于 Electron 构建，它结合了代码编辑器的简洁性和通过扩展的强大 IDE 功能。VS Code 支持调试、Git、语法高亮，已成为开发人员中最受欢迎的编辑器。',
    
    whatIsWebStormTitle: '什么是 WebStorm？',
    whatIsWebStormContent: 'WebStorm 是 JetBrains 的商业 IDE，专门用于 JavaScript 和 Web 开发。2010 年发布，它为 JavaScript、TypeScript、React、Vue、Angular、Node.js 提供智能编码辅助，并包括用于调试、测试和版本控制的内置工具。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心开发能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '如何配置每个 IDE：',
    
    vscodeExampleTitle: 'VS Code 设置',
    webstormExampleTitle: 'WebStorm 配置',
    
    dataSourceTitle: '语言支持',
    dataSourceIntro: '编程语言支持和功能：',
    
    alertingTitle: '性能和资源',
    alertingIntro: '性能特征和系统要求：',
    
    useCasesTitle: '最佳用例',
    vscodeBestFor: 'VS Code 最适合：',
    webstormBestFor: 'WebStorm 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'VS Code 和 WebStorm 满足不同的开发人员偏好。VS Code 以其免费、轻量级和可扩展的方法脱颖而出，非常适合希望自定义环境并跨多种语言工作的开发人员。WebStorm 提供开箱即用的精致、集成体验，在 JavaScript/TypeScript 开发方面特别强大。如果预算允许且你专注于 Web 开发，WebStorm 提供卓越的生产力。对于最大的灵活性和零成本，VS Code 是无与伦比的。',
    
    faq1q: 'WebStorm 值得花钱吗？',
    faq1a: '对于专业的 JavaScript/TypeScript 开发人员，WebStorm 通常在生产力提升方面物有所值。卓越的重构、导航和内置工具节省时间。然而，VS Code 可以通过扩展匹配许多功能。考虑试用和你的工作流程需求。',
    
    faq2q: 'VS Code 能做 WebStorm 能做的一切吗？',
    faq2a: '大部分可以，通过扩展。WebStorm 的功能是内置和集成的。VS Code 可以复制功能但需要查找和配置扩展。WebStorm 往往有更精致的高级功能实现，如重构。',
    
    faq3q: '哪个更快更轻量？',
    faq3a: 'VS Code 通常使用更少的内存并启动更快，尽管这因扩展而异。WebStorm 默认加载更多功能，使用更多 RAM。两者在现代硬件上表现良好；差异在较旧的机器上最重要。',
    
    faq4q: 'WebStorm 对 React/Vue/Angular 怎么样？',
    faq4a: 'WebStorm 开箱即用为所有主要框架提供出色的支持。它理解组件结构，为 props 提供智能补全，并具有内置模板。VS Code 通过扩展匹配这一点，但需要更多设置。',
    
    faq5q: '我可以用 WebStorm 做 Python 或其他语言吗？',
    faq5a: 'WebStorm 专注于 JavaScript 和 Web 技术。对于 Python，使用 PyCharm（也来自 JetBrains）。对于多种语言，IntelliJ IDEA Ultimate 支持所有语言。VS Code 通过扩展处理多种语言，使其更加通用。',
    
    faq6q: '哪个有更好的 Git 集成？',
    faq6a: '两者都有出色的 Git 支持。WebStorm 更功能丰富，具有可视化合并冲突解决和强大的历史记录。VS Code 的 Git 功能更基础，但对大多数情况足够。GitHub 集成在 VS Code 中更好，有官方扩展。',
    
    faq7q: '调试能力怎么样？',
    faq7a: '两者都很好地支持调试。WebStorm 有更高级的 JavaScript/Node.js 调试，具有更好的变量检查和条件断点。VS Code 调试对大多数情况都很好，并且高度可配置。两者都支持浏览器和 Node.js 调试。',
    
    faq8q: '扩展/插件生态系统怎么样？',
    faq8a: 'VS Code 有更大的扩展市场，有 30,000 多个扩展。WebStorm 有插件但生态系统较小。VS Code 扩展覆盖更多领域，但 WebStorm 的内置功能减少了对插件的需求。两者都支持主题和键映射。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function VSCodeVsWebStorm({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsVSCodeTitle}</h3>
      <p style={pStyle}>{ct.whatIsVSCodeContent}</p>

      <h3 style={h3Style}>{ct.whatIsWebStormTitle}</h3>
      <p style={pStyle}>{ct.whatIsWebStormContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '价格' : 'Price', isZh ? '免费' : 'Free', '$169/年（个人）'],
              [isZh ? '开箱即用' : 'Out of the Box', isZh ? '基础功能' : 'Basic features', isZh ? '功能丰富' : 'Feature-rich'],
              [isZh ? '扩展系统' : 'Extension System', '30,000+ 扩展', isZh ? '插件（较少）' : 'Plugins (fewer)'],
              [isZh ? '智能补全' : 'IntelliSense', isZh ? '扩展增强' : 'Extension-enhanced', isZh ? '内置强大' : 'Built-in powerful'],
              [isZh ? '重构工具' : 'Refactoring', isZh ? '基础 + 扩展' : 'Basic + extensions', isZh ? '高级内置' : 'Advanced built-in'],
              [isZh ? '调试器' : 'Debugger', isZh ? '强大' : 'Powerful', isZh ? '高级' : 'Advanced'],
              [isZh ? '数据库工具' : 'Database Tools', isZh ? '扩展' : 'Extension', isZh ? '内置 DataGrip' : 'Built-in DataGrip'],
              [isZh ? '启动时间' : 'Startup Time', isZh ? '快' : 'Fast', isZh ? '较慢' : 'Slower'],
            ].map(([feature, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={tdStyle}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '终端集成' : 'Terminal Integration', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Git 支持' : 'Git Support', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '实时协作' : 'Live Share', isZh ? '内置 Live Share' : 'Built-in Live Share', isZh ? 'Code With Me' : 'Code With Me'],
              [isZh ? '代码分析' : 'Code Analysis', isZh ? '扩展（ESLint）' : 'Extension (ESLint)', isZh ? '内置检查' : 'Built-in inspections'],
              [isZh ? '测试运行器' : 'Test Runner', isZh ? '扩展' : 'Extension', isZh ? '内置' : 'Built-in'],
              [isZh ? 'HTTP 客户端' : 'HTTP Client', isZh ? 'REST Client 扩展' : 'REST Client extension', isZh ? '内置' : 'Built-in'],
              [isZh ? '代码格式化' : 'Code Formatting', isZh ? 'Prettier 扩展' : 'Prettier extension', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SSH 远程' : 'SSH Remote', isZh ? 'Remote SSH 扩展' : 'Remote SSH extension', isZh ? '内置' : 'Built-in'],
            ].map(([cap, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={tdStyle}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#007acc' }}>{ct.vscodeExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// VS Code settings.json\n{\n  // Editor Settings\n  "editor.fontSize": 14,\n  "editor.tabSize": 2,\n  "editor.formatOnSave": true,\n  "editor.codeActionsOnSave": {\n    "source.fixAll.eslint": "explicit",\n    "source.organizeImports": "explicit"\n  },\n  \n  // TypeScript Settings\n  "typescript.preferences.importModuleSpecifier": "relative",\n  "typescript.suggest.autoImports": true,\n  "typescript.updateImportsOnFileMove.enabled": "always",\n  \n  // ESLint Extension\n  "eslint.validate": [\n    "javascript",\n    "javascriptreact",\n    "typescript",\n    "typescriptreact"\n  ],\n  \n  // Prettier Extension\n  "prettier.singleQuote": true,\n  "prettier.trailingComma": "es5",\n  "prettier.printWidth": 80,\n  \n  // File Associations\n  "files.associations": {\n    "*.jsx": "javascriptreact",\n    "*.tsx": "typescriptreact"\n  },\n  \n  // Emmet\n  "emmet.includeLanguages": {\n    "typescript": "html",\n    "typescriptreact": "html"\n  },\n  \n  // Git Settings\n  "git.autofetch": true,\n  "git.confirmSync": false,\n  \n  // Terminal\n  "terminal.integrated.fontSize": 13,\n  "terminal.integrated.shell.osx": "zsh"\n}\n\n// VS Code launch.json for debugging\n{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "type": "node",\n      "request": "launch",\n      "name": "Debug Node.js",\n      "program": "${workspaceFolder}/src/index.ts",\n      "preLaunchTask": "npm: build",\n      "outFiles": ["${workspaceFolder}/dist/**/*.js"],\n      "console": "integratedTerminal"\n    },\n    {\n      "type": "chrome",\n      "request": "launch",\n      "name": "Debug React App",\n      "url": "http://localhost:3000",\n      "webRoot": "${workspaceFolder}/src",\n      "sourceMaps": true\n    }\n  ]\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#00d8ff' }}>{ct.webstormExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// WebStorm Configuration\n// Settings configured via UI or .idea folder\n\n// Key WebStorm Settings (Preferences > Editor)\n\n// Code Style > JavaScript/TypeScript\n{\n  "indent_size": 2,\n  "indent_style": "space",\n  "quote_type": "single",\n  "trailing_comma": "es5",\n  "max_line_length": 80\n}\n\n// Inspections (Built-in)\n// JavaScript & TypeScript:\n// - Unused variables\n// - Missing return statements\n// - Type mismatches\n// - Deprecated APIs\n// - Code quality metrics\n\n// Live Templates (Preferences > Editor > Live Templates)\n// React Component:\nconst $COMPONENT$ = () => {\n  return (\n    <div>\n      $END$\n    </div>\n  );\n};\n\nexport default $COMPONENT$;\n\n// Run Configuration (Run > Edit Configurations)\n{\n  "name": "Debug Server",\n  "type": "NodeJS",\n  "configuration": {\n    "javaScriptFile": "src/index.ts",\n    "nodeParameters": "--inspect",\n    "workingDirectory": "$ProjectFileDir$",\n    "environmentVariables": {\n      "NODE_ENV": "development"\n    }\n  }\n}\n\n// Database Tool Configuration\n// Built-in DataGrip features:\n// - Connect to MySQL, PostgreSQL, MongoDB, Redis\n// - Query console with auto-completion\n// - Schema visualization\n// - Data import/export\n\n// HTTP Client (Tools > HTTP Client)\n### Get Users\nGET https://api.example.com/users\nAuthorization: Bearer {{token}}\nContent-Type: application/json\n\n### Create User\nPOST https://api.example.com/users\nContent-Type: application/json\n\n{\n  "name": "John Doe",\n  "email": "john@example.com"\n}\n\n// Version Control Settings\n// Built-in Git features:\n// - Visual merge conflict resolution\n// - Git log with graph\n// - Branch management\n// - GitHub/GitLab integration\n// - Commit history search'}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #007acc' }}>
          <strong style={{ color: '#007acc' }}>VS Code Language Support</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持几乎所有编程语言通过扩展。JavaScript、TypeScript、Python、Go、Rust、C++、Java、PHP、Ruby 等都有优秀的扩展。语言服务器协议（LSP）实现智能功能。' : 'Supports virtually all programming languages via extensions. JavaScript, TypeScript, Python, Go, Rust, C++, Java, PHP, Ruby all have excellent extensions. Language Server Protocol (LSP) enables smart features.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00d8ff' }}>
          <strong style={{ color: '#00d8ff' }}>WebStorm Language Support</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '专注于 Web 技术：JavaScript、TypeScript、HTML、CSS、React、Vue、Angular、Node.js。内置对这些技术的优秀支持。其他语言支持有限，考虑 IntelliJ IDEA。' : 'Focused on web technologies: JavaScript, TypeScript, HTML, CSS, React, Vue, Angular, Node.js. Built-in excellent support for these. Limited support for other languages, consider IntelliJ IDEA.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '性能指标' : 'Performance Metric'}</th>
              <th style={thStyle}>VS Code</th>
              <th style={thStyle}>WebStorm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动时间' : 'Startup Time', '2-5 seconds', '10-20 seconds'],
              [isZh ? '内存使用' : 'Memory Usage', '200-500 MB', '500-1000 MB'],
              [isZh ? 'CPU 使用（空闲）' : 'CPU Usage (idle)', '低', '中等'],
              [isZh ? '大文件性能' : 'Large File Performance', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '索引速度' : 'Indexing Speed', isZh ? '快' : 'Fast', isZh ? '较慢但全面' : 'Slower but comprehensive'],
              [isZh ? '扩展影响' : 'Extension Impact', isZh ? '显著（每个扩展）' : 'Significant (per extension)', isZh ? '较小（内置功能）' : 'Less (built-in features)'],
            ].map(([cat, vscode, webstorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{vscode}</td>
                <td style={tdStyle}>{webstorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #007acc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#007acc' }}>{ct.vscodeBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '预算有限的开发者' : 'Budget-conscious developers'}</li>
            <li>{isZh ? '需要多语言支持' : 'Need multi-language support'}</li>
            <li>{isZh ? '喜欢轻量级工具' : 'Prefer lightweight tools'}</li>
            <li>{isZh ? '开源项目贡献者' : 'Open source contributors'}</li>
            <li>{isZh ? '学生和新手' : 'Students and beginners'}</li>
            <li>{isZh ? '自定义环境爱好者' : 'Customization enthusiasts'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00d8ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00d8ff' }}>{ct.webstormBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '专业 JavaScript 开发' : 'Professional JavaScript development'}</li>
            <li>{isZh ? '大型企业项目' : 'Large enterprise projects'}</li>
            <li>{isZh ? '需要开箱即用' : 'Need out-of-the-box experience'}</li>
            <li>{isZh ? '重型重构需求' : 'Heavy refactoring needs'}</li>
            <li>{isZh ? '全栈 JavaScript 开发' : 'Full-stack JavaScript development'}</li>
            <li>{isZh ? '团队标准化工具' : 'Team standardized tooling'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
