'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'pnpm Workspaces vs Turborepo: Monorepo Build Tools',
    intro: "Managing large-scale JavaScript projects with multiple packages requires robust tooling. pnpm Workspaces and Turborepo represent two different approaches to monorepo management. This comparison examines their strengths, trade-offs, and helps you choose the right solution for your project.",
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: "pnpm Workspaces is a native package manager solution with efficient disk usage and strict dependency management. Turborepo is a build system optimizer that works with any package manager. For most teams, using both together provides the best experience: pnpm for dependency management and Turborepo for build optimization.",
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: "pnpm uses content-addressable storage, saving 50-70% disk space",
    takeaway2: "Turborepo's remote caching can reduce CI time by 40-60%",
    takeaway3: "pnpm enforces strict dependency declarations, preventing phantom dependencies",
    takeaway4: "Turborepo's smart task scheduling parallelizes builds efficiently",
    takeaway5: "Both tools are production-ready and used by major companies",
    takeaway6: "They complement each other rather than compete directly",
    
    whatIsPnpmTitle: 'What is pnpm Workspaces?',
    whatIsPnpmContent: "pnpm Workspaces is pnpm's built-in monorepo support. pnpm itself is a fast, disk-space efficient package manager that uses a content-addressable store. When you install packages, pnpm stores them in a global store and creates hard links in your node_modules, eliminating duplicate files across projects.",
    
    whatIsTurboTitle: 'What is Turborepo?',
    whatIsTurboContent: "Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. Created by Vercel, it focuses on optimizing build times through intelligent caching, parallel execution, and task orchestration. It works as a layer on top of your existing package manager.",
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks from real-world monorepo projects:',
    
    installTitle: 'Package Installation Speed',
    installIntro: 'Fresh install of a monorepo with 50 packages:',
    
    buildTitle: 'Build Performance',
    buildIntro: 'Building all packages in a monorepo:',
    
    diskTitle: 'Disk Usage',
    diskIntro: 'Storage efficiency comparison:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core capabilities of each tool:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Configuration and usage patterns:',
    
    pnpmExampleTitle: 'pnpm Workspaces Setup',
    turboExampleTitle: 'Turborepo Setup',
    
    cachingTitle: 'Caching Mechanisms',
    cachingIntro: 'How each tool handles caching:',
    
    ciTitle: 'CI/CD Integration',
    ciIntro: 'Continuous integration optimization:',
    
    whenToUseTitle: 'When to Use Each Tool',
    pnpmBestFor: 'Use pnpm Workspaces When:',
    turboBestFor: 'Use Turborepo When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: "pnpm Workspaces and Turborepo solve different problems and work excellently together. pnpm provides efficient dependency management and strict module resolution, while Turborepo optimizes your build pipeline with intelligent caching and parallelization. For new monorepos in 2025, we recommend using both: pnpm as your package manager and Turborepo as your build system. This combination gives you the best of both worlds.",
    
    faq1q: 'Can I use Turborepo without pnpm?',
    faq1a: "Yes, Turborepo works with npm, yarn, and pnpm. However, combining Turborepo with pnpm provides the most efficient monorepo experience due to pnpm's disk efficiency and strict dependency management.",
    
    faq2q: 'Is pnpm compatible with all npm packages?',
    faq2a: "99% of npm packages work with pnpm. Some packages with unusual dependency assumptions may have issues, but these are rare. pnpm's strict mode actually helps identify and fix dependency problems.",
    
    faq3q: 'How does Turborepo remote caching work?',
    faq3a: "Turborepo hashes your source files and configuration. When you build, it checks if a matching build exists in the remote cache (Vercel's or self-hosted). If found, it downloads the output instead of rebuilding, saving significant CI time.",
    
    faq4q: 'What is the learning curve for these tools?',
    faq4a: "pnpm requires learning a few new concepts like content-addressable storage and strict peer dependencies. Turborepo is relatively simple if you understand task pipelines. Both have excellent documentation and can be adopted incrementally.",
    
    faq5q: 'Can I migrate from yarn/npm workspaces to pnpm?',
    faq5a: "Yes, migration is straightforward. Convert your package-lock.json or yarn.lock using pnpm import, then update your workspace configuration. Most projects can migrate in a few hours.",
    
    faq6q: 'Does Turborepo support incremental builds?',
    faq6a: "Yes, Turborepo's entire design is built around incremental builds. It only rebuilds packages that have changed and their dependents, using both local and remote caching.",
    
    faq7q: 'What about Nx vs Turborepo?',
    faq7a: "Nx is more opinionated with built-in generators and code analysis. Turborepo is simpler and focuses purely on build optimization. Choose Nx for comprehensive tooling, Turborepo for a lightweight build accelerator.",
    
    faq8q: 'How do these tools handle large monorepos?',
    faq8a: "Both scale well to hundreds of packages. pnpm's disk efficiency becomes more valuable as monorepo size grows. Turborepo's caching and parallelization provide linear scaling for builds regardless of repo size.",
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'pnpm Workspaces vs Turborepo：Monorepo 构建工具对比',
    intro: '管理包含多个包的大型 JavaScript 项目需要强大的工具支持。pnpm Workspaces 和 Turborepo 代表了两种不同的 monorepo 管理方式。本文对比它们的优缺点，帮助你为项目选择合适的解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'pnpm Workspaces 是原生的包管理器解决方案，具有高效的磁盘使用和严格的依赖管理。Turborepo 是一个构建系统优化器，可与任何包管理器配合使用。对于大多数团队，同时使用两者可以获得最佳体验：pnpm 负责依赖管理，Turborepo 负责构建优化。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'pnpm 使用内容寻址存储，节省 50-70% 磁盘空间',
    takeaway2: 'Turborepo 的远程缓存可减少 40-60% CI 时间',
    takeaway3: 'pnpm 强制严格声明依赖，防止幽灵依赖',
    takeaway4: 'Turborepo 的智能任务调度高效并行化构建',
    takeaway5: '两个工具都已生产就绪，被大公司使用',
    takeaway6: '它们互补而非直接竞争',
    
    whatIsPnpmTitle: '什么是 pnpm Workspaces？',
    whatIsPnpmContent: 'pnpm Workspaces 是 pnpm 内置的 monorepo 支持。pnpm 本身是一个快速、节省磁盘空间的包管理器，使用内容寻址存储。安装包时，pnpm 将它们存储在全局存储中，并在你的 node_modules 中创建硬链接，消除项目间的重复文件。',
    
    whatIsTurboTitle: '什么是 Turborepo？',
    whatIsTurboContent: 'Turborepo 是一个高性能的 JavaScript 和 TypeScript monorepo 构建系统。由 Vercel 创建，专注于通过智能缓存、并行执行和任务编排来优化构建时间。它在现有包管理器之上作为一层工作。',
    
    performanceTitle: '性能对比',
    performanceIntro: '真实世界 monorepo 项目的基准测试：',
    
    installTitle: '包安装速度',
    installIntro: '全新安装包含 50 个包的 monorepo：',
    
    buildTitle: '构建性能',
    buildIntro: '构建 monorepo 中的所有包：',
    
    diskTitle: '磁盘使用',
    diskIntro: '存储效率对比：',
    
    featuresTitle: '功能对比',
    featuresIntro: '每个工具的核心能力：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '配置和使用模式：',
    
    pnpmExampleTitle: 'pnpm Workspaces 配置',
    turboExampleTitle: 'Turborepo 配置',
    
    cachingTitle: '缓存机制',
    cachingIntro: '每个工具如何处理缓存：',
    
    ciTitle: 'CI/CD 集成',
    ciIntro: '持续集成优化：',
    
    whenToUseTitle: '何时使用每个工具',
    pnpmBestFor: '使用 pnpm Workspaces 的场景：',
    turboBestFor: '使用 Turborepo 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'pnpm Workspaces 和 Turborepo 解决不同的问题，可以完美配合使用。pnpm 提供高效的依赖管理和严格的模块解析，而 Turborepo 通过智能缓存和并行化优化构建流水线。对于 2025 年的新 monorepo，我们建议同时使用两者：pnpm 作为包管理器，Turborepo 作为构建系统。这种组合为你提供两全其美的体验。',
    
    faq1q: '可以不用 pnpm 只用 Turborepo 吗？',
    faq1a: '可以，Turborepo 支持 npm、yarn 和 pnpm。但是，将 Turborepo 与 pnpm 结合使用可以提供最高效的 monorepo 体验，因为 pnpm 的磁盘效率和严格依赖管理。',
    
    faq2q: 'pnpm 兼容所有 npm 包吗？',
    faq2a: '99% 的 npm 包与 pnpm 兼容。一些具有异常依赖假设的包可能有问题，但这很少见。pnpm 的严格模式实际上有助于识别和修复依赖问题。',
    
    faq3q: 'Turborepo 远程缓存如何工作？',
    faq3a: 'Turborepo 对源文件和配置进行哈希。构建时，它检查远程缓存（Vercel 或自托管）中是否存在匹配的构建。如果找到，它会下载输出而不是重新构建，节省大量 CI 时间。',
    
    faq4q: '这些工具的学习曲线如何？',
    faq4a: 'pnpm 需要学习一些新概念，如内容寻址存储和严格的 peer 依赖。如果你了解任务流水线，Turborepo 相对简单。两者都有出色的文档，可以逐步采用。',
    
    faq5q: '可以从 yarn/npm workspaces 迁移到 pnpm 吗？',
    faq5a: '可以，迁移很简单。使用 pnpm import 转换你的 package-lock.json 或 yarn.lock，然后更新工作区配置。大多数项目可以在几小时内完成迁移。',
    
    faq6q: 'Turborepo 支持增量构建吗？',
    faq6a: '是的，Turborepo 的整个设计都围绕增量构建。它只重建已更改的包及其依赖项，使用本地和远程缓存。',
    
    faq7q: 'Nx vs Turborepo 如何选择？',
    faq7a: 'Nx 更有主见，具有内置生成器和代码分析。Turborepo 更简单，纯粹专注于构建优化。选择 Nx 获得全面工具，选择 Turborepo 获得轻量级构建加速器。',
    
    faq8q: '这些工具如何处理大型 monorepo？',
    faq8a: '两者都可以扩展到数百个包。随着 monorepo 规模增长，pnpm 的磁盘效率变得更有价值。Turborepo 的缓存和并行化无论仓库大小都能提供线性扩展的构建。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PnpmWorkspacesVsTurborepo({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsPnpmTitle}</h3>
      <p style={pStyle}>{ct.whatIsPnpmContent}</p>

      <h3 style={h3Style}>{ct.whatIsTurboTitle}</h3>
      <p style={pStyle}>{ct.whatIsTurboContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>pnpm Workspaces</th>
              <th style={thStyle}>Turborepo</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '主要用途' : 'Primary Use', isZh ? '包管理' : 'Package Management', isZh ? '构建优化' : 'Build Optimization'],
              [isZh ? '存储机制' : 'Storage', isZh ? '内容寻址存储' : 'Content-addressable', isZh ? '哈希缓存' : 'Hash-based Cache'],
              [isZh ? '依赖管理' : 'Dependency Mgmt', isZh ? '严格模式' : 'Strict Mode', isZh ? '继承自包管理器' : 'Inherits from PM'],
              [isZh ? '包管理器' : 'Package Manager', 'pnpm', isZh ? '任意 (npm/yarn/pnpm)' : 'Any (npm/yarn/pnpm)'],
              [isZh ? '远程缓存' : 'Remote Cache', isZh ? '无内置' : 'No built-in', isZh ? '内置支持' : 'Built-in'],
              [isZh ? '任务编排' : 'Task Orchestration', isZh ? '基础' : 'Basic', isZh ? '高级并行化' : 'Advanced Parallel'],
            ].map(([feature, pnpm, turbo], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{turbo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.installTitle}</h3>
      <p style={pStyle}>{ct.installIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>npm</th>
              <th style={thStyle}>yarn</th>
              <th style={thStyle}>pnpm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动安装' : 'Cold Install', '45s', '32s', '18s'],
              [isZh ? '缓存后安装' : 'Cached Install', '12s', '8s', '2s'],
              [isZh ? '添加新依赖' : 'Add Dependency', '8s', '5s', '1.5s'],
            ].map(([scenario, npm, yarn, pnpm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{npm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{pnpm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.buildTitle}</h3>
      <p style={pStyle}>{ct.buildIntro}</p>

      <pre style={codeStyle}><code>{`# Without Turborepo - sequential builds
npm run build --workspace=packages/ui      # 30s
npm run build --workspace=packages/utils   # 15s
npm run build --workspace=packages/core    # 45s
npm run build --workspace=apps/web         # 60s
# Total: 150s (2.5 minutes)

# With Turborepo - parallel + cached
turbo run build
# First run: 90s (parallel execution)
# Second run (no changes): 2s (all cached)
# After changing one package: 25s (cached + rebuild)`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>{isZh ? '无优化' : 'No Optimization'}</th>
              <th style={thStyle}>{isZh ? 'Turborepo 本地' : 'Turborepo Local'}</th>
              <th style={thStyle}>{isZh ? 'Turborepo 远程' : 'Turborepo Remote'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次构建' : 'First Build', '150s', '90s', '90s'],
              [isZh ? '二次构建 (无更改)' : 'Rebuild (no changes)', '150s', '2s', '2s'],
              [isZh ? 'CI 构建 (PR)' : 'CI Build (PR)', '150s', '90s', '25s'],
              [isZh ? '单包更改' : 'Single Package Change', '150s', '45s', '15s'],
            ].map(([metric, noopt, local, remote], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{noopt}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{local}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{remote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.diskTitle}</h3>
      <p style={pStyle}>{ct.diskIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目规模' : 'Project Size'}</th>
              <th style={thStyle}>npm</th>
              <th style={thStyle}>yarn</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>{isZh ? '节省' : 'Savings'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '10个包' : '10 packages', '850MB', '720MB', '280MB', '67%'],
              [isZh ? '50个包' : '50 packages', '4.2GB', '3.8GB', '1.1GB', '74%'],
              [isZh ? '100个包' : '100 packages', '9.5GB', '8.2GB', '2.1GB', '78%'],
            ].map(([size, npm, yarn, pnpm, savings], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{size}</td>
                <td style={tdStyle}>{npm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{savings}</td>
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
              <th style={thStyle}>pnpm Workspaces</th>
              <th style={thStyle}>Turborepo</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '工作区管理' : 'Workspace Mgmt', '✓', isZh ? '继承自 PM' : 'Inherits from PM'],
              [isZh ? '依赖安装' : 'Dependency Install', '✓', '-'],
              [isZh ? '硬链接存储' : 'Hard Links', '✓', '-'],
              [isZh ? '严格依赖' : 'Strict Deps', '✓', '-'],
              [isZh ? '本地缓存' : 'Local Cache', isZh ? '包缓存' : 'Package Cache', '✓'],
              [isZh ? '远程缓存' : 'Remote Cache', '-', '✓'],
              [isZh ? '任务并行' : 'Task Parallelization', isZh ? '基础' : 'Basic', '✓'],
              [isZh ? '增量构建' : 'Incremental Builds', '-', '✓'],
              [isZh ? '依赖图分析' : 'Dep Graph Analysis', '-', '✓'],
              [isZh ? 'CI 优化' : 'CI Optimization', isZh ? '间接' : 'Indirect', '✓'],
            ].map(([feature, pnpm, turbo], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{turbo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.pnpmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'

# package.json (root)
{
  "name": "my-monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter './apps/*' dev",
    "build": "turbo run build",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=18"
  }
}

# packages/ui/package.json
{
  "name": "@my-org/ui",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs",
    "dev": "tsup src/index.ts --watch"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  }
}

# packages/core/package.json
{
  "name": "@my-org/core",
  "version": "1.0.0",
  "dependencies": {
    "@my-org/utils": "workspace:*"
  }
}

# Install dependencies
pnpm install

# Add dependency to specific package
pnpm add lodash --filter @my-org/core

# Run script in specific workspace
pnpm --filter @my-org/ui build`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.turboExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "clean": {
      "cache": false
    }
  }
}

# Run all builds with parallelization
turbo run build

# Run multiple tasks
turbo run build lint test

# Run with filter
turbo run build --filter=@my-org/ui
turbo run build --filter='./packages/*'
turbo run test --filter='...[origin/main]'

# CI Configuration (GitHub Actions)
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - run: pnpm install --frozen-lockfile
      
      - name: Cache Turbo
        uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-\${{ runner.os }}-\${{ hashFiles('**/pnpm-lock.yaml') }}-\${{ github.sha }}
          restore-keys: |
            turbo-\${{ runner.os }}-\${{ hashFiles('**/pnpm-lock.yaml') }}-
      
      - run: pnpm turbo run build lint test --cache-dir=.turbo

# Enable remote caching
npx turbo login
npx turbo link`}</code></pre>

      {/* Caching */}
      <h2 style={h2Style}>{ct.cachingTitle}</h2>
      <p style={pStyle}>{ct.cachingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>pnpm</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'pnpm 使用全局存储缓存所有下载的包。当多个项目使用相同版本时，它们共享相同的硬链接。这节省磁盘空间但不缓存构建输出。' : 'pnpm caches all downloaded packages in a global store. When multiple projects use the same version, they share the same hard links. This saves disk space but does not cache build outputs.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Turborepo</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Turborepo 缓存构建输出和测试结果。它使用输入文件和配置的哈希来确定何时可以使用缓存。远程缓存允许在团队成员和 CI 之间共享构建结果。' : 'Turborepo caches build outputs and test results. It uses hashes of input files and configuration to determine when cache can be used. Remote caching allows sharing build results across team members and CI.'}
          </p>
        </div>
      </div>

      {/* CI/CD */}
      <h2 style={h2Style}>{ct.ciTitle}</h2>
      <p style={pStyle}>{ct.ciIntro}</p>

      <pre style={codeStyle}><code>{`# Optimized CI with pnpm + Turborepo

# 1. Cache pnpm store
- name: Cache pnpm
  uses: actions/cache@v4
  with:
    path: ~/.local/share/pnpm/store
    key: pnpm-\${{ runner.os }}-\${{ hashFiles('**/pnpm-lock.yaml') }}

# 2. Cache Turborepo
- name: Cache Turbo
  uses: actions/cache@v4
  with:
    path: .turbo
    key: turbo-\${{ runner.os }}-\${{ github.sha }}
    restore-keys: turbo-\${{ runner.os }}-

# 3. Use remote caching for even better performance
- run: pnpm turbo run build lint test
  env:
    TURBO_TOKEN: \${{ secrets.TURBO_TOKEN }}
    TURBO_TEAM: my-team

# Results:
# - First PR: ~3 minutes
# - Subsequent PRs with remote cache: ~30 seconds
# - Same PR with local cache: ~45 seconds`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.pnpmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '磁盘空间紧张' : 'Limited disk space'}</li>
            <li>{isZh ? '需要严格依赖管理' : 'Strict dependency management'}</li>
            <li>{isZh ? '多项目共享依赖' : 'Multiple projects sharing deps'}</li>
            <li>{isZh ? '防止幽灵依赖' : 'Prevent phantom dependencies'}</li>
            <li>{isZh ? '快速依赖安装' : 'Fast dependency installs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.turboBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '构建时间过长' : 'Long build times'}</li>
            <li>{isZh ? 'CI 瓶颈' : 'CI bottlenecks'}</li>
            <li>{isZh ? '需要远程缓存' : 'Need remote caching'}</li>
            <li>{isZh ? '复杂任务依赖' : 'Complex task dependencies'}</li>
            <li>{isZh ? '团队协作优化' : 'Team collaboration optimization'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/npm-package-downloads'} style={{ color: '#3b82f6', textDecoration: 'none' }}>NPM Downloads</a>
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
