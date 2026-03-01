'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Turborepo vs Nx: Choosing the Right Monorepo Tool',
    intro: 'Monorepos have become the standard for large-scale JavaScript and TypeScript projects. Turborepo and Nx are the two leading build systems, each with distinct approaches to caching, task orchestration, and developer experience. This guide compares both tools to help you choose the right solution for your monorepo.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Turborepo offers a lightweight, incremental approach with excellent remote caching and minimal configuration. Nx provides a comprehensive platform with integrated tooling, generators, and advanced dependency graph analysis. Choose Turborepo for flexibility and simplicity; choose Nx for comprehensive tooling and enterprise features.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Turborepo is simpler to adopt and works with any project structure',
    takeaway2: 'Nx provides more comprehensive tooling including generators and dependency analysis',
    takeaway3: 'Both offer excellent caching, with Turborepo having faster cache restoration',
    takeaway4: 'Nx has better IDE integration and visual tools',
    takeaway5: 'Turborepo is now owned by Vercel and integrates well with their platform',
    takeaway6: 'Nx is better for large enterprises with complex dependency graphs',
    
    whatIsTurboTitle: 'What is Turborepo?',
    whatIsTurboContent: 'Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. Created by Jared Palmer in 2021 and acquired by Vercel, it focuses on incremental builds, intelligent caching, and task orchestration. Turborepo is designed to be incrementally adoptable and works with existing package managers.',
    
    whatIsNxTitle: 'What is Nx?',
    whatIsNxContent: 'Nx is a smart, fast, and extensible build system developed by Nrwl. First released in 2017, Nx provides a complete monorepo platform with code generators, dependency graph visualization, advanced caching, and integrated tooling for testing, linting, and building. Nx supports multiple frontend frameworks and backend technologies.',
    
    philosophyTitle: 'Design Philosophy',
    philosophyIntro: 'Understanding the core approach of each tool:',
    
    turboPhilosophyTitle: 'Turborepo: Incremental Adoption',
    turboPhilosophyContent: 'Turborepo believes you should be able to add a build system to your existing monorepo without changing your project structure. It focuses on doing one thing extremely well: running tasks as fast as possible through intelligent caching and parallelization.',
    
    nxPhilosophyTitle: 'Nx: Complete Platform',
    nxPhilosophyContent: 'Nx provides a comprehensive solution for monorepo management, including code generators, dependency analysis, and integrated tooling. It aims to be the complete toolkit for managing large-scale applications with complex interdependencies.',
    
    gettingStartedTitle: 'Getting Started Comparison',
    gettingStartedIntro: 'How each tool approaches initial setup:',
    
    configurationTitle: 'Configuration',
    configurationIntro: 'Comparing configuration approaches:',
    
    cachingTitle: 'Caching Strategies',
    cachingIntro: 'Both tools offer sophisticated caching, but with different approaches:',
    
    remoteCachingTitle: 'Remote Caching',
    remoteCachingIntro: 'Share cache across team members and CI/CD:',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world build performance on a mid-size monorepo (50 packages):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across key areas:',
    
    generatorsTitle: 'Code Generators',
    generatorsIntro: 'Nx has built-in generators; Turborepo relies on external tools:',
    
    useCasesTitle: 'When to Use Each Tool',
    turboBestFor: 'Turborepo is Best For:',
    nxBestFor: 'Nx is Best For:',
    
    migrationTitle: 'Migration Paths',
    migrationIntro: 'How to migrate to either tool:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Turborepo and Nx are excellent monorepo tools that can dramatically improve build performance and developer experience. Turborepo\'s strength lies in its simplicity and incremental adoptability, making it perfect for teams that want to improve build speeds without changing their workflow. Nx shines as a comprehensive platform for large organizations that need integrated tooling, advanced dependency analysis, and enterprise features. Many organizations successfully start with Turborepo and migrate to Nx as their needs grow more complex.',
    
    faq1q: 'Can I use both Turborepo and Nx together?',
    faq1a: 'While possible, it\'s generally not recommended to use both in the same repository. They solve similar problems and would conflict. Choose one based on your needs. However, you can migrate from one to the other if your requirements change.',
    
    faq2q: 'Does Turborepo require pnpm or yarn workspaces?',
    faq2a: 'Turborepo works with npm, yarn, and pnpm workspaces. It doesn\'t force a specific package manager. The only requirement is a package manager that supports workspaces for dependency management.',
    
    faq3q: 'Is Nx free for commercial use?',
    faq3a: 'Yes, Nx is open-source and free to use. Nx Cloud (remote caching and distributed task execution) has a generous free tier. For larger teams, there are paid tiers with additional features and support.',
    
    faq4q: 'Can Turborepo generate code like Nx?',
    faq4a: 'Turborepo itself doesn\'t include code generators. However, you can use tools like Plop, Hygen, or custom scripts alongside Turborepo. Nx has more sophisticated built-in generators for scaffolding applications and libraries.',
    
    faq5q: 'Which tool has better TypeScript support?',
    faq5a: 'Both have excellent TypeScript support. Nx provides more TypeScript-specific tooling and generators. Turborepo works seamlessly with TypeScript but takes a more agnostic approach to your project\'s specific technologies.',
    
    faq6q: 'How does remote caching work with these tools?',
    faq6a: 'Turborepo uses Vercel\'s remote cache service or self-hosted options. Nx uses Nx Cloud. Both cache task outputs (build artifacts, test results) and share them across machines, dramatically speeding up CI/CD and local development for teams.',
    
    faq7q: 'Can I migrate from Lerna to these tools?',
    faq7a: 'Yes, both tools have migration paths from Lerna. Turborepo acquired Lerna and maintains it as a legacy option, making migration straightforward. Nx also provides migration guides. Lerna users are encouraged to migrate to Turborepo for task running while keeping Lerna for versioning if needed.',
    
    faq8q: 'Which is better for a small startup?',
    faq8a: 'For small startups, Turborepo is often the better choice due to its simplicity and faster onboarding. It provides immediate build performance improvements without requiring significant workflow changes. As the team and codebase grow, you can evaluate Nx for its additional features.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Turborepo vs Nx：选择正确的Monorepo工具',
    intro: 'Monorepo已成为大规模JavaScript和TypeScript项目的标准。Turborepo和Nx是两个领先的构建系统，各自在缓存、任务编排和开发者体验方面有独特的方法。本指南比较这两个工具，帮助你为monorepo选择正确的解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Turborepo提供轻量级、渐进式的方法，具有出色的远程缓存和最小化配置。Nx提供全面的平台，包含集成工具、生成器和高级依赖图分析。选择Turborepo以获得灵活性和简单性；选择Nx以获得全面的工具和企业功能。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Turborepo更容易采用，适用于任何项目结构',
    takeaway2: 'Nx提供更全面的工具，包括生成器和依赖分析',
    takeaway3: '两者都提供出色的缓存，Turborepo的缓存恢复更快',
    takeaway4: 'Nx有更好的IDE集成和可视化工具',
    takeaway5: 'Turborepo现由Vercel拥有，与其平台集成良好',
    takeaway6: 'Nx更适合具有复杂依赖图的大型企业',
    
    whatIsTurboTitle: '什么是Turborepo？',
    whatIsTurboContent: 'Turborepo是一个用于JavaScript和TypeScript monorepo的高性能构建系统。由Jared Palmer于2021年创建并被Vercel收购，它专注于增量构建、智能缓存和任务编排。Turborepo设计为可渐进采用，并与现有的包管理器配合使用。',
    
    whatIsNxTitle: '什么是Nx？',
    whatIsNxContent: 'Nx是由Nrwl开发的智能、快速、可扩展的构建系统。于2017年首次发布，Nx提供完整的monorepo平台，包含代码生成器、依赖图可视化、高级缓存以及用于测试、linting和构建的集成工具。Nx支持多种前端框架和后端技术。',
    
    philosophyTitle: '设计理念',
    philosophyIntro: '了解每个工具的核心方法：',
    
    turboPhilosophyTitle: 'Turborepo：渐进采用',
    turboPhilosophyContent: 'Turborepo相信你应该能够在不改变项目结构的情况下将构建系统添加到现有的monorepo中。它专注于把一件事做到极致：通过智能缓存和并行化尽可能快地运行任务。',
    
    nxPhilosophyTitle: 'Nx：完整平台',
    nxPhilosophyContent: 'Nx为monorepo管理提供全面的解决方案，包括代码生成器、依赖分析和集成工具。它旨在成为管理具有复杂相互依赖关系的大规模应用的完整工具包。',
    
    gettingStartedTitle: '入门对比',
    gettingStartedIntro: '每个工具如何处理初始设置：',
    
    configurationTitle: '配置',
    configurationIntro: '比较配置方法：',
    
    cachingTitle: '缓存策略',
    cachingIntro: '两个工具都提供复杂的缓存，但方法不同：',
    
    remoteCachingTitle: '远程缓存',
    remoteCachingIntro: '在团队成员和CI/CD之间共享缓存：',
    
    performanceTitle: '性能对比',
    performanceIntro: '中型monorepo（50个包）的真实构建性能：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较关键领域的能力：',
    
    generatorsTitle: '代码生成器',
    generatorsIntro: 'Nx有内置生成器；Turborepo依赖外部工具：',
    
    useCasesTitle: '何时使用每个工具',
    turboBestFor: 'Turborepo 最适合：',
    nxBestFor: 'Nx 最适合：',
    
    migrationTitle: '迁移路径',
    migrationIntro: '如何迁移到任一工具：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Turborepo和Nx都是出色的monorepo工具，可以显著提高构建性能和开发者体验。Turborepo的优势在于其简单性和渐进可采纳性，使其非常适合希望在不改变工作流程的情况下提高构建速度的团队。Nx作为综合平台，在为需要集成工具、高级依赖分析和企业功能的大型组织服务时表现出色。许多组织成功地从Turborepo开始，随着需求变得更复杂，再迁移到Nx。',
    
    faq1q: '我可以同时使用Turborepo和Nx吗？',
    faq1a: '虽然可能，但通常不建议在同一个仓库中同时使用两者。它们解决类似的问题，会产生冲突。根据你的需要选择一个。然而，如果需求发生变化，你可以从一个迁移到另一个。',
    
    faq2q: 'Turborepo需要pnpm或yarn workspaces吗？',
    faq2a: 'Turborepo可与npm、yarn和pnpm workspaces配合使用。它不强制使用特定的包管理器。唯一的要求是支持workspaces进行依赖管理的包管理器。',
    
    faq3q: 'Nx可以免费商业使用吗？',
    faq3a: '是的，Nx是开源的，免费使用。Nx Cloud（远程缓存和分布式任务执行）有慷慨的免费层。对于较大的团队，有付费层提供额外的功能和支持。',
    
    faq4q: 'Turborepo可以像Nx一样生成代码吗？',
    faq4a: 'Turborepo本身不包含代码生成器。然而，你可以使用Plop、Hygen或自定义脚本与Turborepo一起使用。Nx有更复杂的内置生成器用于搭建应用和库。',
    
    faq5q: '哪个工具对TypeScript支持更好？',
    faq5a: '两者都有出色的TypeScript支持。Nx提供更多特定于TypeScript的工具和生成器。Turborepo与TypeScript无缝配合，但对项目的特定技术采取更不可知的方法。',
    
    faq6q: '这些工具如何与远程缓存配合工作？',
    faq6a: 'Turborepo使用Vercel的远程缓存服务或自托管选项。Nx使用Nx Cloud。两者都缓存任务输出（构建产物、测试结果）并在机器之间共享，显著加速CI/CD和团队本地开发。',
    
    faq7q: '我可以从Lerna迁移到这些工具吗？',
    faq7a: '是的，两个工具都有从Lerna迁移的路径。Turborepo收购了Lerna并将其作为遗留选项维护，使迁移变得简单直接。Nx也提供迁移指南。Lerna用户被鼓励迁移到Turborepo进行任务运行，如果需要，可以保留Lerna进行版本管理。',
    
    faq8q: '哪个更适合小型初创公司？',
    faq8a: '对于小型初创公司，由于其简单性和更快的上手速度，Turborepo通常是更好的选择。它在不需要显著工作流程更改的情况下提供即时的构建性能改进。随着团队和代码库的增长，你可以评估Nx的额外功能。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function TurborepoVsNxMonorepo({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '工具概述' : 'Tool Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.whatIsTurboTitle}</h3>
      <p style={pStyle}>{ct.whatIsTurboContent}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsNxTitle}</h3>
      <p style={pStyle}>{ct.whatIsNxContent}</p>

      {/* Philosophy */}
      <h2 style={h2Style}>{ct.philosophyTitle}</h2>
      <p style={pStyle}>{ct.philosophyIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>{ct.turboPhilosophyTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.turboPhilosophyContent}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>{ct.nxPhilosophyTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.nxPhilosophyContent}</p>
        </div>
      </div>

      {/* Configuration */}
      <h2 style={h2Style}>{ct.configurationTitle}</h2>
      <p style={pStyle}>{ct.configurationIntro}</p>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>Turborepo Configuration</h3>
      <pre style={codeStyle}><code>{`// turbo.json - Turborepo configuration
{
  "\$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}

// package.json - Root configuration
{
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "dev": "turbo run dev"
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>Nx Configuration</h3>
      <pre style={codeStyle}><code>{`// nx.json - Nx workspace configuration
{
  "extends": "nx/presets/npm.json",
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist"],
      "cache": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["{projectRoot}/coverage"],
      "cache": true
    },
    "lint": {
      "cache": true
    }
  },
  "affected": {
    "defaultBase": "main"
  },
  "generators": {
    "@nx/react": {
      "application": {
        "style": "css",
        "linter": "eslint"
      }
    }
  }
}

// project.json - Per-project configuration
{
  "name": "my-app",
  "targets": {
    "build": {
      "executor": "@nx/vite:build",
      "options": {
        "outputPath": "dist/apps/my-app"
      }
    }
  }
}`}</code></pre>

      {/* Features Comparison */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '任务编排' : 'Task Orchestration', isZh ? '依赖图 + 并行' : 'Dependency graph + parallel', isZh ? '依赖图 + 并行' : 'Dependency graph + parallel'],
              [isZh ? '本地缓存' : 'Local Caching', isZh ? '是 (fs)' : 'Yes (fs)', isZh ? '是 (fs)' : 'Yes (fs)'],
              [isZh ? '远程缓存' : 'Remote Caching', 'Vercel Remote Cache', 'Nx Cloud'],
              [isZh ? '分布式任务执行' : 'Distributed Task Execution', isZh ? '否' : 'No', isZh ? '是 (Nx Cloud)' : 'Yes (Nx Cloud)'],
              [isZh ? '代码生成' : 'Code Generation', isZh ? '否 (使用外部工具)' : 'No (use external tools)', isZh ? '是 (丰富)' : 'Yes (rich)'],
              [isZh ? '依赖图可视化' : 'Dependency Graph Viz', isZh ? '是 (基本)' : 'Yes (basic)', isZh ? '是 (交互式)' : 'Yes (interactive)'],
              [isZh ? 'IDE插件' : 'IDE Plugins', isZh ? '有限' : 'Limited', 'VS Code, WebStorm'],
              [isZh ? ' affected命令' : 'Affected Commands', isZh ? '是' : 'Yes', isZh ? '是 (更强大)' : 'Yes (more powerful)'],
              [isZh ? '包管理器支持' : 'Package Manager Support', 'npm, yarn, pnpm', 'npm, yarn, pnpm'],
              [isZh ? '框架预设' : 'Framework Presets', isZh ? '通用' : 'Generic', 'React, Angular, Node, etc.'],
            ].map(([feature, turbo, nx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{turbo}</td>
                <td style={tdStyle}>{nx}</td>
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
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Turborepo</th>
              <th style={thStyle}>Nx</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷构建 (无缓存)' : 'Cold build (no cache)', '4m 30s', '4m 15s'],
              [isZh ? '热构建 (缓存命中)' : 'Warm build (cache hit)', '15s', '20s'],
              [isZh ? '增量构建 (1包变更)' : 'Incremental build (1 pkg)', '45s', '50s'],
              [isZh ? '缓存恢复时间' : 'Cache restoration', '~500ms', '~800ms'],
              [isZh ? '任务调度开销' : 'Task scheduling overhead', '~50ms', '~100ms'],
            ].map(([scenario, turbo, nx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{turbo}</td>
                <td style={tdStyle}>{nx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.turboBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '渐进采用现有仓库' : 'Incremental adoption in existing repos'}</li>
            <li>{isZh ? '最小化配置' : 'Minimal configuration'}</li>
            <li>{isZh ? 'Vercel部署' : 'Vercel deployments'}</li>
            <li>{isZh ? '快速缓存恢复' : 'Fast cache restoration'}</li>
            <li>{isZh ? '灵活性优先' : 'Flexibility over conventions'}</li>
            <li>{isZh ? '小型到中型团队' : 'Small to medium teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.nxBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业组织' : 'Large enterprise organizations'}</li>
            <li>{isZh ? '需要代码生成' : 'Need code generation'}</li>
            <li>{isZh ? '复杂依赖图' : 'Complex dependency graphs'}</li>
            <li>{isZh ? '分布式构建' : 'Distributed builds'}</li>
            <li>{isZh ? 'Angular/React工作流' : 'Angular/React workflows'}</li>
            <li>{isZh ? '高级IDE集成' : 'Advanced IDE integration'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(239,68,68,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#ef4444', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/timestamp-converter`} style={{ color: '#ef4444', textDecoration: 'none' }}>Timestamp Converter</a>
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
