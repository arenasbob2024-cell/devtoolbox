'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Turborepo vs Nx vs Lerna: Monorepo Tools Comparison 2025',
    intro: 'Turborepo, Nx, and Lerna are the three leading monorepo management tools for JavaScript and TypeScript projects. Each offers different approaches to managing multiple packages, optimizing builds, and handling dependencies. This comprehensive comparison helps you choose the right tool for your monorepo needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Turborepo for simplicity and fast remote caching in small to medium monorepos. Choose Nx for advanced features, code generation, and large enterprise monorepos. Choose Lerna for independent versioning and publishing workflows, though its build features are now powered by Turborepo.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Turborepo excels at build caching and task orchestration',
    takeaway2: 'Nx offers the most comprehensive feature set including code generation',
    takeaway3: 'Lerna specializes in package versioning and publishing',
    takeaway4: 'Turborepo and Lerna now work together (Lerna uses Turbo for builds)',
    takeaway5: 'Nx has the steepest learning curve but most powerful tooling',
    takeaway6: 'All three support both npm and pnpm package managers',
    
    whatIsTurboTitle: 'What is Turborepo?',
    whatIsTurboContent: 'Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. Developed by Vercel, it focuses on speed through intelligent caching, parallel task execution, and remote caching. Turborepo is known for its zero-configuration approach and excellent developer experience.',
    
    whatIsNxTitle: 'What is Nx?',
    whatIsNxContent: 'Nx is a smart build system developed by Nx (formerly Nrwl). It provides comprehensive monorepo tooling including code generation, dependency graphs, affected project detection, and distributed task execution. Nx supports multiple frameworks and languages beyond JavaScript.',
    
    whatIsLernaTitle: 'What is Lerna?',
    whatIsLernaContent: 'Lerna is the original monorepo tool for JavaScript, focused on package management, versioning, and publishing. Originally developed for Babel, it excels at managing independent versioning and publishing to npm. Since version 6, Lerna delegates build tasks to Turborepo.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Monorepo configuration for each tool:',
    
    turboExampleTitle: 'Turborepo Config',
    nxExampleTitle: 'Nx Config',
    lernaExampleTitle: 'Lerna Config',
    
    cachingTitle: 'Build Caching',
    cachingIntro: 'Caching capabilities and strategies:',
    
    publishingTitle: 'Publishing Workflows',
    publishingIntro: 'Package versioning and publishing features:',
    
    useCasesTitle: 'Best Use Cases',
    turboBestFor: 'Turborepo is Best For:',
    nxBestFor: 'Nx is Best For:',
    lernaBestFor: 'Lerna is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Turborepo, Nx, and Lerna serve different needs in the monorepo ecosystem. Turborepo is ideal for teams wanting fast builds with minimal setup. Nx provides enterprise-grade features for large codebases with complex dependency graphs. Lerna remains the go-to for independent versioning and npm publishing workflows. Many teams combine them: Lerna for publishing, Turborepo for builds, or use Nx for everything. Your choice depends on team size, complexity, and specific workflow requirements.',
    
    faq1q: 'Can I use Turborepo with Lerna?',
    faq1a: 'Yes, since Lerna 6, you can use Turborepo for build tasks while Lerna handles versioning and publishing. This gives you the best of both worlds: Turborepo\'s caching and Lerna\'s publishing features.',
    
    faq2q: 'Which tool is fastest for builds?',
    faq2a: 'Turborepo and Nx are both extremely fast with caching. Turborepo has simpler setup and excellent remote caching. Nx offers distributed task execution across multiple machines for even larger speedups on big monorepos.',
    
    faq3q: 'Does Nx support non-JavaScript projects?',
    faq3a: 'Yes, Nx supports multiple languages including Python, Go, Java, and .NET through plugins. Turborepo and Lerna are primarily focused on JavaScript and TypeScript projects.',
    
    faq4q: 'What about pnpm workspace support?',
    faq4a: 'All three tools support pnpm workspaces. Turborepo has native integration, Nx supports it fully, and Lerna works with pnpm through configuration. Many monorepos use pnpm for its efficient disk usage.',
    
    faq5q: 'How do remote caches work?',
    faq5a: 'Turborepo offers remote caching through Vercel (free for teams) or self-hosted. Nx has Nx Cloud with distributed execution and caching. Both significantly speed up CI/CD by sharing build artifacts across team members.',
    
    faq6q: 'Which is best for small projects?',
    faq6a: 'Turborepo is often the best choice for small to medium monorepos due to its simplicity and zero-config approach. Nx can be overkill for smaller projects, while Lerna alone lacks modern build optimization.',
    
    faq7q: 'What about learning curve?',
    faq7a: 'Turborepo has the gentlest learning curve with minimal configuration. Lerna is straightforward for publishing workflows. Nx has the steepest learning curve but provides powerful code generation and visualization tools.',
    
    faq8q: 'Can I migrate between these tools?',
    faq8a: 'Yes, migration is possible. Nx provides import tools for existing projects. You can add Turborepo to existing Lerna monorepos. Many projects evolve their tooling as they grow, starting with Turborepo and adding Nx or Lerna features as needed.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Turborepo vs Nx vs Lerna：Monorepo 工具对比 2025',
    intro: 'Turborepo、Nx 和 Lerna 是 JavaScript 和 TypeScript 项目中三个领先的 monorepo 管理工具。每个工具都提供了不同的方法来管理多个包、优化构建和处理依赖关系。这个全面的对比帮助你选择适合你 monorepo 需求的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为中小型 monorepo 的简单性和快速远程缓存选择 Turborepo。为大型企业 monorepo 的高级功能和代码生成选择 Nx。为独立版本控制和发布工作流选择 Lerna，尽管它的构建功能现在由 Turborepo 提供支持。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Turborepo 在构建缓存和任务编排方面表现出色',
    takeaway2: 'Nx 提供最全面的功能集，包括代码生成',
    takeaway3: 'Lerna 专注于包版本控制和发布',
    takeaway4: 'Turborepo 和 Lerna 现在可以协同工作（Lerna 使用 Turbo 进行构建）',
    takeaway5: 'Nx 学习曲线最陡但工具最强大',
    takeaway6: '这三个工具都支持 npm 和 pnpm 包管理器',
    
    whatIsTurboTitle: '什么是 Turborepo？',
    whatIsTurboContent: 'Turborepo 是一个用于 JavaScript 和 TypeScript monorepo 的高性能构建系统。由 Vercel 开发，它通过智能缓存、并行任务执行和远程缓存专注于速度。Turborepo 以其零配置方法和出色的开发者体验而闻名。',
    
    whatIsNxTitle: '什么是 Nx？',
    whatIsNxContent: 'Nx 是由 Nx（前身为 Nrwl）开发的智能构建系统。它提供全面的 monorepo 工具，包括代码生成、依赖图、受影响项目检测和分布式任务执行。Nx 支持除 JavaScript 之外的多种框架和语言。',
    
    whatIsLernaTitle: '什么是 Lerna？',
    whatIsLernaContent: 'Lerna 是 JavaScript 的原始 monorepo 工具，专注于包管理、版本控制和发布。最初为 Babel 开发，它在管理独立版本控制和发布到 npm 方面表现出色。自版本 6 起，Lerna 将构建任务委托给 Turborepo。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '每个工具的 monorepo 配置：',
    
    turboExampleTitle: 'Turborepo 配置',
    nxExampleTitle: 'Nx 配置',
    lernaExampleTitle: 'Lerna 配置',
    
    cachingTitle: '构建缓存',
    cachingIntro: '缓存能力和策略：',
    
    publishingTitle: '发布工作流',
    publishingIntro: '包版本控制和发布功能：',
    
    useCasesTitle: '最佳用例',
    turboBestFor: 'Turborepo 最适合：',
    nxBestFor: 'Nx 最适合：',
    lernaBestFor: 'Lerna 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Turborepo、Nx 和 Lerna 在 monorepo 生态系统中服务于不同的需求。Turborepo 适合希望快速构建且配置最少的团队。Nx 为具有复杂依赖图的大型代码库提供企业级功能。Lerna 仍然是独立版本控制和 npm 发布工作流的首选。许多团队将它们结合起来：Lerna 用于发布，Turborepo 用于构建，或使用 Nx 完成所有工作。你的选择取决于团队规模、复杂性和特定的工作流要求。',
    
    faq1q: '我可以同时使用 Turborepo 和 Lerna 吗？',
    faq1a: '是的，从 Lerna 6 开始，你可以使用 Turborepo 进行构建任务，而 Lerna 处理版本控制和发布。这让你同时拥有两者的优势：Turborepo 的缓存和 Lerna 的发布功能。',
    
    faq2q: '哪个工具构建最快？',
    faq2a: 'Turborepo 和 Nx 在缓存方面都非常快。Turborepo 设置更简单，远程缓存出色。Nx 为大型 monorepo 提供跨多台机器的分布式任务执行以获得更大的加速。',
    
    faq3q: 'Nx 支持非 JavaScript 项目吗？',
    faq3a: '是的，Nx 通过插件支持多种语言，包括 Python、Go、Java 和 .NET。Turborepo 和 Lerna 主要专注于 JavaScript 和 TypeScript 项目。',
    
    faq4q: 'pnpm workspace 支持怎么样？',
    faq4a: '这三个工具都支持 pnpm workspaces。Turborepo 有原生集成，Nx 完全支持它，Lerna 通过配置与 pnpm 配合工作。许多 monorepo 使用 pnpm 以提高磁盘使用效率。',
    
    faq5q: '远程缓存如何工作？',
    faq5a: 'Turborepo 通过 Vercel（团队免费）或自托管提供远程缓存。Nx 有 Nx Cloud，具有分布式执行和缓存。两者都通过在团队成员之间共享构建产物显著加快 CI/CD。',
    
    faq6q: '哪个最适合小型项目？',
    faq6a: '由于简单性和零配置方法，Turborepo 通常是中小型 monorepo 的最佳选择。Nx 对较小的项目可能过于复杂，而单独使用 Lerna 缺乏现代构建优化。',
    
    faq7q: '学习曲线怎么样？',
    faq7a: 'Turborepo 学习曲线最平缓，配置最少。Lerna 对发布工作流很直接。Nx 学习曲线最陡，但提供强大的代码生成和可视化工具。',
    
    faq8q: '我可以在这些工具之间迁移吗？',
    faq8a: '是的，迁移是可能的。Nx 为现有项目提供导入工具。你可以将 Turborepo 添加到现有的 Lerna monorepos。许多项目随着增长演变其工具，从 Turborepo 开始，根据需要添加 Nx 或 Lerna 功能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TurboVsNxVsLerna({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsTurboTitle}</h3>
      <p style={pStyle}>{ct.whatIsTurboContent}</p>

      <h3 style={h3Style}>{ct.whatIsNxTitle}</h3>
      <p style={pStyle}>{ct.whatIsNxContent}</p>

      <h3 style={h3Style}>{ct.whatIsLernaTitle}</h3>
      <p style={pStyle}>{ct.whatIsLernaContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '构建缓存' : 'Build Caching', isZh ? '全功能工具' : 'Full Tooling', isZh ? '版本发布' : 'Versioning'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '简单' : 'Easy', isZh ? '中等' : 'Moderate', isZh ? '简单' : 'Easy'],
              [isZh ? '代码生成' : 'Code Generation', isZh ? '无' : 'No', isZh ? '强大' : 'Powerful', isZh ? '无' : 'No'],
              [isZh ? '远程缓存' : 'Remote Cache', isZh ? '内置' : 'Built-in', 'Nx Cloud', isZh ? '使用Turbo' : 'Uses Turbo'],
              [isZh ? '独立版本' : 'Independent Versions', isZh ? '有限' : 'Limited', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
              [isZh ? '依赖图' : 'Dependency Graph', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced', isZh ? '基础' : 'Basic'],
              [isZh ? '分布式执行' : 'Distributed Exec', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '无' : 'No'],
              [isZh ? '多语言支持' : 'Multi-language', isZh ? '仅JS/TS' : 'JS/TS Only', isZh ? '多种语言' : 'Multiple', isZh ? '仅JS/TS' : 'JS/TS Only'],
            ].map(([feature, turbo, nx, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{turbo}</td>
                <td style={tdStyle}>{nx}</td>
                <td style={tdStyle}>{lerna}</td>
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
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '任务并行' : 'Task Parallelization', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent', isZh ? '使用Turbo' : 'Uses Turbo'],
              [isZh ? '增量构建' : 'Incremental Builds', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent', isZh ? '使用Turbo' : 'Uses Turbo'],
              [isZh ? '受影响项目' : 'Affected Projects', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced', isZh ? '基础' : 'Basic'],
              [isZh ? '插件生态' : 'Plugin Ecosystem', isZh ? '有限' : 'Limited', isZh ? '丰富' : 'Rich', isZh ? '有限' : 'Limited'],
              [isZh ? 'npm发布' : 'npm Publishing', isZh ? '手动' : 'Manual', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
              [isZh ? '可视化工具' : 'Visualization', isZh ? '基础' : 'Basic', isZh ? '强大' : 'Powerful', isZh ? '无' : 'None'],
            ].map(([cap, turbo, nx, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{turbo}</td>
                <td style={tdStyle}>{nx}</td>
                <td style={tdStyle}>{lerna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.turboExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

// Package scripts
{
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev"
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#14305c' }}>{ct.nxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test", "e2e"]
      }
    }
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist", "{projectRoot}/.next"]
    }
  },
  "affected": {
    "defaultBase": "main"
  }
}

// project.json
{
  "name": "my-app",
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/my-app"
      }
    }
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#9333ea' }}>{ct.lernaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// lerna.json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "independent",
  "npmClient": "pnpm",
  "command": {
    "version": {
      "allowBranch": "main",
      "conventionalCommits": true,
      "message": "chore(release): publish"
    },
    "publish": {
      "registry": "https://registry.npmjs.org/"
    }
  },
  "packages": ["packages/*"]
}

// With Turborepo integration
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "independent",
  "useNx": false,
  "useWorkspaces": true
}`}</code></pre>

      <h2 style={h2Style}>{ct.cachingTitle}</h2>
      <p style={pStyle}>{ct.cachingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Turborepo Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '本地和远程缓存，哈希输入跟踪，自动缓存失效，通过 Vercel 的团队共享，自托管选项可用。' : 'Local and remote caching, hash-based input tracking, automatic cache invalidation, team sharing via Vercel, self-hosted options available.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #14305c' }}>
          <strong style={{ color: '#14305c' }}>Nx Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Nx Cloud 远程缓存，分布式任务执行，AI 辅助重构，代码生成和迁移工具，强大的依赖图可视化。' : 'Nx Cloud remote caching, distributed task execution, AI-assisted refactoring, code generation and migration tools, powerful dependency graph visualization.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #9333ea' }}>
          <strong style={{ color: '#9333ea' }}>Lerna Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自版本 6 起使用 Turborepo 进行构建缓存，专注于版本控制和发布工作流，支持固定和独立版本控制。' : 'Uses Turborepo for build caching since v6, focuses on versioning and publishing workflows, supports fixed and independent versioning.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.publishingTitle}</h2>
      <p style={pStyle}>{ct.publishingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '发布功能' : 'Publishing Feature'}</th>
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '独立版本控制' : 'Independent Versioning', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '优秀' : 'Excellent'],
              [isZh ? '固定版本控制' : 'Fixed Versioning', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '优秀' : 'Excellent'],
              [isZh ? 'Conventional Commits' : 'Conventional Commits', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '优秀' : 'Excellent'],
              [isZh ? '变更日志生成' : 'Changelog Generation', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '优秀' : 'Excellent'],
              [isZh ? 'npm 发布' : 'npm Publishing', isZh ? '手动' : 'Manual', isZh ? '支持' : 'Yes', isZh ? '自动化' : 'Automated'],
            ].map(([feature, turbo, nx, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{turbo}</td>
                <td style={tdStyle}>{nx}</td>
                <td style={tdStyle}>{lerna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.turboBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '小型到中型 monorepo' : 'Small to medium monorepos'}</li>
            <li>{isZh ? '需要快速 CI/CD 的团队' : 'Teams needing fast CI/CD'}</li>
            <li>{isZh ? '简单项目结构' : 'Simple project structures'}</li>
            <li>{isZh ? 'Vercel 部署' : 'Vercel deployments'}</li>
            <li>{isZh ? '零配置优先' : 'Zero-config priority'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #14305c' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#14305c' }}>{ct.nxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业 monorepo' : 'Large enterprise monorepos'}</li>
            <li>{isZh ? '复杂依赖关系' : 'Complex dependencies'}</li>
            <li>{isZh ? '需要代码生成' : 'Code generation needed'}</li>
            <li>{isZh ? '多框架项目' : 'Multi-framework projects'}</li>
            <li>{isZh ? '分布式团队' : 'Distributed teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #9333ea' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#9333ea' }}>{ct.lernaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '库发布到 npm' : 'Publishing libraries to npm'}</li>
            <li>{isZh ? '独立版本控制需求' : 'Independent versioning needs'}</li>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '现有 Lerna 迁移' : 'Existing Lerna migrations'}</li>
            <li>{isZh ? '配合 Turbo 使用' : 'Combined with Turbo'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/npm-package-downloads'} style={{ color: '#3b82f6', textDecoration: 'none' }}>NPM Downloads</a>
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
