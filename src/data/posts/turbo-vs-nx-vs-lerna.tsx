'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Turborepo vs Nx vs Lerna: Monorepo Tools Comparison',
    intro: 'Turborepo, Nx, and Lerna are three leading monorepo management tools for JavaScript/TypeScript projects. Each offers different approaches to managing multiple packages, optimizing builds, and coordinating development workflows. This comparison examines their capabilities, performance characteristics, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Turborepo for simplicity and fast incremental builds. Choose Nx for comprehensive tooling, code generation, and enterprise features. Choose Lerna for independent versioning and publishing workflows. Turborepo excels at build caching, Nx offers the most complete solution, and Lerna specializes in package publishing.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Turborepo offers the fastest build caching with minimal configuration',
    takeaway2: 'Nx provides comprehensive code generation and dependency graphs',
    takeaway3: 'Lerna excels at independent versioning and npm publishing',
    takeaway4: 'Turborepo and Nx can work together for combined benefits',
    takeaway5: 'Nx has the steepest learning curve but most features',
    takeaway6: 'Lerna is now maintained by the Nx team',
    
    whatIsTurboTitle: 'What is Turborepo?',
    whatIsTurboContent: 'Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. Developed by Vercel, it focuses on fast incremental builds through intelligent caching, remote caching, and parallel task execution. Turborepo is known for its zero-configuration approach and seamless integration with existing tools.',
    
    whatIsNxTitle: 'What is Nx?',
    whatIsNxContent: 'Nx is a smart build system developed by Nrwl that provides comprehensive monorepo tooling. It offers code generation, dependency graphs, affected command execution, and extensive plugin support. Nx is designed for enterprise-scale development with features like distributed task execution and code sharing.',
    
    whatIsLernaTitle: 'What is Lerna?',
    whatIsLernaContent: 'Lerna is a tool for managing JavaScript projects with multiple packages. Originally released in 2015, it optimizes the workflow around managing multi-package repositories with git and npm. Lerna specializes in versioning and publishing packages independently or together, and is now maintained by the Nx team.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Monorepo configuration and build setup:',
    
    turboExampleTitle: 'Turborepo Config',
    nxExampleTitle: 'Nx Config',
    lernaExampleTitle: 'Lerna Config',
    
    cachingTitle: 'Build Caching & Performance',
    cachingIntro: 'Caching and performance optimization:',
    
    publishingTitle: 'Publishing & Versioning',
    publishingIntro: 'Package publishing capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    turboBestFor: 'Turborepo is Best For:',
    nxBestFor: 'Nx is Best For:',
    lernaBestFor: 'Lerna is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Turborepo, Nx, and Lerna each serve different needs in the monorepo ecosystem. Turborepo is ideal for teams wanting fast builds with minimal setup. Nx provides the most comprehensive solution for large-scale development with code generation and advanced tooling. Lerna remains valuable for its publishing workflow expertise. Many teams combine Turborepo with Lerna, or use Nx for its all-in-one capabilities.',
    
    faq1q: 'Can I use Turborepo with Lerna?',
    faq1a: 'Yes, Turborepo and Lerna work well together. Use Turborepo for build optimization and caching, and Lerna for versioning and publishing. Many teams use this combination to get the best of both tools.',
    
    faq2q: 'Which tool is fastest for builds?',
    faq2a: 'Turborepo is typically the fastest for incremental builds due to its aggressive caching strategy and parallel execution. Nx also offers excellent performance with affected commands and distributed caching.',
    
    faq3q: 'Is Nx free to use?',
    faq3a: 'Nx is open-source and free for most use cases. Nx Cloud with distributed task execution and AI features requires a subscription. The open-source version includes most features teams need.',
    
    faq4q: 'Should I migrate from Lerna?',
    faq4a: 'If you only need Lerna for versioning and publishing, keep using it. If you need build optimization, consider adding Turborepo. For comprehensive tooling including code generation, consider Nx. Lerna is now maintained by Nx team and remains actively developed.',
    
    faq5q: 'Which has the best VS Code integration?',
    faq5a: 'Nx has the most comprehensive VS Code extension with project graph visualization, code generation, and run targets. Turborepo has basic IDE support. Lerna relies on standard npm/yarn workspaces tooling.',
    
    faq6q: 'How do they handle dependencies?',
    faq6a: 'All three support npm, yarn, and pnpm workspaces. Nx provides additional dependency graph visualization and affected commands. Turborepo optimizes task dependencies for parallel execution.',
    
    faq7q: 'What about remote caching?',
    faq7a: 'Turborepo offers remote caching through Vercel. Nx Cloud provides distributed caching and task execution. Both significantly improve CI performance for teams.',
    
    faq8q: 'Which is easiest to learn?',
    faq8a: 'Turborepo has the lowest learning curve with minimal configuration. Lerna is straightforward for publishing workflows. Nx has the steepest learning curve but offers the most capabilities once mastered.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Turborepo vs Nx vs Lerna：Monorepo工具对比',
    intro: 'Turborepo、Nx和Lerna是三个领先的JavaScript/TypeScript项目monorepo管理工具。每个工具都提供了不同的方法来管理多个包、优化构建和协调开发工作流。本比较考察它们的功能、性能特点和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为简单性和快速增量构建选择Turborepo。为全面工具、代码生成和企业功能选择Nx。为独立版本管理和发布工作流选择Lerna。Turborepo在构建缓存方面出色，Nx提供最完整的解决方案，Lerna专注于包发布。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Turborepo以最小配置提供最快的构建缓存',
    takeaway2: 'Nx提供全面的代码生成和依赖图',
    takeaway3: 'Lerna在独立版本管理和npm发布方面出色',
    takeaway4: 'Turborepo和Nx可以一起工作获得组合优势',
    takeaway5: 'Nx学习曲线最陡但功能最多',
    takeaway6: 'Lerna现在由Nx团队维护',
    
    whatIsTurboTitle: '什么是Turborepo？',
    whatIsTurboContent: 'Turborepo是一个用于JavaScript和TypeScript monorepo的高性能构建系统。由Vercel开发，它通过智能缓存、远程缓存和并行任务执行专注于快速增量构建。Turborepo以其零配置方法和与现有工具的无缝集成而闻名。',
    
    whatIsNxTitle: '什么是Nx？',
    whatIsNxContent: 'Nx是由Nrwl开发的智能构建系统，提供全面的monorepo工具。它提供代码生成、依赖图、受影响命令执行和广泛的插件支持。Nx专为企业级开发设计，具有分布式任务执行和代码共享等功能。',
    
    whatIsLernaTitle: '什么是Lerna？',
    whatIsLernaContent: 'Lerna是一个用于管理多包JavaScript项目的工具。最初于2015年发布，它优化了使用git和npm管理多包存储库的工作流。Lerna专注于独立或一起版本化和发布包，现在由Nx团队维护。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: 'Monorepo配置和构建设置：',
    
    turboExampleTitle: 'Turborepo配置',
    nxExampleTitle: 'Nx配置',
    lernaExampleTitle: 'Lerna配置',
    
    cachingTitle: '构建缓存与性能',
    cachingIntro: '缓存和性能优化：',
    
    publishingTitle: '发布与版本管理',
    publishingIntro: '包发布能力：',
    
    useCasesTitle: '最佳用例',
    turboBestFor: 'Turborepo最适合：',
    nxBestFor: 'Nx最适合：',
    lernaBestFor: 'Lerna最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Turborepo、Nx和Lerna在monorepo生态系统中各服务不同需求。Turborepo非常适合想要快速构建和最小设置的团队。Nx为大规模开发提供最全面的解决方案，包括代码生成和高级工具。Lerna在其发布工作流专业知识方面仍然有价值。许多团队将Turborepo与Lerna结合使用，或使用Nx获得其一体化能力。',
    
    faq1q: '我可以同时使用Turborepo和Lerna吗？',
    faq1a: '是的，Turborepo和Lerna可以很好地协同工作。使用Turborepo进行构建优化和缓存，使用Lerna进行版本管理和发布。许多团队使用这种组合来获得两个工具的优势。',
    
    faq2q: '哪个工具构建最快？',
    faq2a: 'Turborepo通常在增量构建方面最快，因为其激进的缓存策略和并行执行。Nx也通过受影响命令和分布式缓存提供出色的性能。',
    
    faq3q: 'Nx免费使用吗？',
    faq3a: 'Nx是开源的，大多数用例免费。具有分布式任务执行和AI功能的Nx Cloud需要订阅。开源版本包含大多数团队需要的功能。',
    
    faq4q: '我应该从Lerna迁移吗？',
    faq4a: '如果你只需要Lerna进行版本管理和发布，继续使用它。如果需要构建优化，考虑添加Turborepo。对于包括代码生成在内的全面工具，考虑Nx。Lerna现在由Nx团队维护并持续开发。',
    
    faq5q: '哪个有最好的VS Code集成？',
    faq5a: 'Nx有最全面的VS Code扩展，包括项目图可视化、代码生成和运行目标。Turborepo有基本的IDE支持。Lerna依赖标准npm/yarn workspaces工具。',
    
    faq6q: '它们如何处理依赖？',
    faq6a: '这三个都支持npm、yarn和pnpm workspaces。Nx提供额外的依赖图可视化和受影响命令。Turborepo优化任务依赖以进行并行执行。',
    
    faq7q: '远程缓存怎么样？',
    faq7a: 'Turborepo通过Vercel提供远程缓存。Nx Cloud提供分布式缓存和任务执行。两者都显著提高团队的CI性能。',
    
    faq8q: '哪个最容易学习？',
    faq8a: 'Turborepo学习曲线最低，配置最小。Lerna对于发布工作流很直观。Nx学习曲线最陡但一旦掌握提供最多功能。',
    
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

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.whatIsTurboTitle}</h3>
      <p style={pStyle}>{ct.whatIsTurboContent}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsNxTitle}</h3>
      <p style={pStyle}>{ct.whatIsNxContent}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.whatIsLernaTitle}</h3>
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
              [isZh ? '核心定位' : 'Core Focus', isZh ? '构建缓存' : 'Build caching', isZh ? '全栈工具' : 'Full-stack tooling', isZh ? '包发布' : 'Package publishing'],
              [isZh ? '构建缓存' : 'Build Caching', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent', isZh ? '无' : 'None'],
              [isZh ? '代码生成' : 'Code Generation', isZh ? '基础' : 'Basic', isZh ? '强大' : 'Powerful', isZh ? '无' : 'None'],
              [isZh ? '依赖图' : 'Dependency Graph', isZh ? '基础' : 'Basic', isZh ? '高级' : 'Advanced', isZh ? '无' : 'None'],
              [isZh ? '发布管理' : 'Publishing', isZh ? '无' : 'None', isZh ? '内置' : 'Built-in', isZh ? '专长' : 'Specialized'],
              [isZh ? '远程缓存' : 'Remote Cache', isZh ? 'Vercel' : 'Vercel', isZh ? 'Nx Cloud' : 'Nx Cloud', isZh ? '无' : 'None'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '低' : 'Low', isZh ? '高' : 'High', isZh ? '中' : 'Medium'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '基础' : 'Basic', isZh ? '丰富' : 'Rich', isZh ? '有限' : 'Limited'],
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
              [isZh ? '增量构建' : 'Incremental Build', '\u2713', '\u2713', '-'],
              [isZh ? '并行执行' : 'Parallel Execution', '\u2713', '\u2713', '-'],
              [isZh ? '受影响命令' : 'Affected Commands', isZh ? '基础' : 'Basic', '\u2713', '-'],
              [isZh ? '项目图可视化' : 'Project Graph', '-', '\u2713', '-'],
              [isZh ? '代码生成器' : 'Code Generators', isZh ? '有限' : 'Limited', '\u2713', '-'],
              [isZh ? '独立版本' : 'Independent Versioning', '-', '\u2713', '\u2713'],
              [isZh ? '变更集' : 'Changesets', '-', '\u2713', '\u2713'],
              [isZh ? '分布式执行' : 'Distributed Execution', '-', '\u2713', '-'],
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
      <pre style={codeStyle}><code>{`// turbo.json - Turborepo Configuration
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"],
      "cache": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

// package.json scripts
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test"
  }
}

// Run commands
// turbo run build --filter=web    # Build only web and deps
// turbo run test --parallel       # Run tests in parallel
// turbo run build --force         # Skip cache`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.nxExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// nx.json - Nx Configuration
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "lint", "test"],
        "parallel": 3
      }
    }
  },
  "affected": {
    "defaultBase": "main"
  }
}

// project.json for a library
{
  "name": "ui-components",
  "sourceRoot": "libs/ui-components/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{workspaceRoot}/dist/libs/ui-components"],
      "options": {
        "outputPath": "dist/libs/ui-components",
        "main": "libs/ui-components/src/index.ts"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "libs/ui-components/jest.config.ts"
      }
    }
  }
}

// Nx CLI Commands
// nx affected -t build             # Build affected projects
// nx g @nx/react:lib my-lib        # Generate new library
// nx graph                         # View project graph`}</code></pre>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.lernaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// lerna.json - Lerna Configuration
{
  "version": "independent",
  "npmClient": "pnpm",
  "useWorkspaces": true,
  "command": {
    "version": {
      "allowBranch": "main",
      "conventionalCommits": true,
      "message": "chore(release): publish",
      "push": true
    },
    "publish": {
      "registry": "https://registry.npmjs.org",
      "graphType": "all"
    }
  },
  "packages": ["packages/*"]
}

// Common Lerna Commands
// lerna changed                    # List changed packages
// lerna version                    # Bump versions
// lerna publish                    # Publish to npm
// lerna run build --stream         # Run build in all packages
// lerna exec -- npm view           # Execute in each package

// With Turborepo integration
// lerna run build --stream --npm-client turbo`}</code></pre>

      <h2 style={h2Style}>{ct.cachingTitle}</h2>
      <p style={pStyle}>{ct.cachingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Turborepo Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '本地和远程缓存，基于输入哈希，支持Vercel远程缓存，团队共享缓存显著提高CI速度。' : 'Local and remote caching, input-hash based, Vercel remote cache support, team shared cache significantly improves CI speed.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Nx Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '可配置的可缓存操作，Nx Cloud提供分布式任务执行，AI辅助的任务分配，企业级分布式构建。' : 'Configurable cacheable operations, Nx Cloud provides distributed task execution, AI-assisted task distribution, enterprise distributed builds.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>Lerna Caching</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Lerna本身不提供构建缓存，但可以与Turborepo或Nx集成获得缓存能力。专注于版本管理和发布工作流。' : 'Lerna does not provide build caching itself, but can integrate with Turborepo or Nx for caching. Focused on versioning and publishing workflows.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.publishingTitle}</h2>
      <p style={pStyle}>{ct.publishingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '独立版本' : 'Independent Versioning', '-', '\u2713', '\u2713'],
              [isZh ? '固定版本' : 'Fixed Versioning', '-', '\u2713', '\u2713'],
              [isZh ? 'Conventional Commits' : 'Conventional Commits', '-', '\u2713', '\u2713'],
              [isZh ? '变更日志' : 'Changelog Generation', '-', '\u2713', '\u2713'],
              [isZh ? 'npm发布' : 'npm Publishing', '-', '\u2713', '\u2713'],
              [isZh ? 'Git标签' : 'Git Tags', '-', '\u2713', '\u2713'],
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
            <li>{isZh ? '快速增量构建' : 'Fast incremental builds'}</li>
            <li>{isZh ? '简单配置需求' : 'Simple configuration needs'}</li>
            <li>{isZh ? 'CI优化' : 'CI optimization'}</li>
            <li>{isZh ? 'Vercel用户' : 'Vercel users'}</li>
            <li>{isZh ? '与Lerna配合' : 'Combined with Lerna'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.nxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级项目' : 'Enterprise projects'}</li>
            <li>{isZh ? '代码生成需求' : 'Code generation needs'}</li>
            <li>{isZh ? '复杂依赖管理' : 'Complex dependency management'}</li>
            <li>{isZh ? '全栈monorepo' : 'Full-stack monorepos'}</li>
            <li>{isZh ? '分布式团队' : 'Distributed teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.lernaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'npm包发布' : 'npm package publishing'}</li>
            <li>{isZh ? '独立版本管理' : 'Independent versioning'}</li>
            <li>{isZh ? '组件库' : 'Component libraries'}</li>
            <li>{isZh ? '现有Lerna项目' : 'Existing Lerna projects'}</li>
            <li>{isZh ? '简单monorepo' : 'Simple monorepos'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/npm-package-viewer"} style={{ color: '#3b82f6', textDecoration: 'none' }}>NPM Package Viewer</a>
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
