'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'pnpm vs Yarn vs npm: Package Manager Comparison 2025',
    intro: 'pnpm, Yarn, and npm are the three dominant package managers for JavaScript and Node.js projects. Each has distinct approaches to dependency management, installation speed, and disk space efficiency. This comparison helps you understand their differences and choose the right one for your project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose pnpm for fastest installs, disk space efficiency, and strict dependency management. Choose Yarn for Plug\'n\'Play, stable features, and enterprise tooling. Choose npm for widest compatibility, built-in Node.js support, and zero setup. All three are production-ready and actively maintained.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'pnpm uses content-addressable storage saving up to 70% disk space',
    takeaway2: 'Yarn offers Plug\'n\'Play mode eliminating node_modules',
    takeaway3: 'npm comes bundled with Node.js requiring no installation',
    takeaway4: 'pnpm has the strictest dependency resolution preventing phantom deps',
    takeaway5: 'All three support workspaces for monorepo management',
    takeaway6: 'Installation speed: pnpm > Yarn > npm in most benchmarks',
    
    whatIsPnpmTitle: 'What is pnpm?',
    whatIsPnpmContent: 'pnpm (performant npm) is a fast, disk space efficient package manager. It uses a content-addressable store to save disk space by storing all packages in a single location and hard-linking them to projects. pnpm creates a strict node_modules structure that prevents phantom dependencies.',
    
    whatIsYarnTitle: 'What is Yarn?',
    whatIsYarnContent: 'Yarn is a package manager developed by Facebook (Meta) to address npm\'s shortcomings. Yarn 1 introduced fast, deterministic installs. Yarn Berry (v2+) added Plug\'n\'Play mode, improved workspaces, and Zero-Install. Yarn focuses on stability and enterprise features.',
    
    whatIsNpmTitle: 'What is npm?',
    whatIsNpmContent: 'npm (Node Package Manager) is the default package manager bundled with Node.js. It has improved significantly with npm 7+, adding workspaces, faster installs, and better dependency resolution. npm has the largest ecosystem and widest compatibility with all Node.js projects.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks for common operations:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Configuration files for each package manager:',
    
    pnpmExampleTitle: 'pnpm Config',
    yarnExampleTitle: 'Yarn Config',
    npmExampleTitle: 'npm Config',
    
    workspaceTitle: 'Workspace Support',
    workspaceIntro: 'Monorepo capabilities:',
    
    lockfileTitle: 'Lockfile & Security',
    lockfileIntro: 'Dependency locking and security features:',
    
    useCasesTitle: 'Best Use Cases',
    pnpmBestFor: 'pnpm is Best For:',
    yarnBestFor: 'Yarn is Best For:',
    npmBestFor: 'npm is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'The choice between pnpm, Yarn, and npm depends on your priorities. pnpm excels in performance and disk efficiency, making it ideal for large monorepos and CI/CD. Yarn offers advanced features like Plug\'n\'Play and is favored in enterprise environments. npm provides zero-friction setup and maximum compatibility. Many teams choose pnpm for new projects while maintaining npm compatibility for open source contributions.',
    
    faq1q: 'Can I switch between package managers?',
    faq1a: 'Yes, but you need to remove existing lockfiles and node_modules. Each manager creates its own lockfile: pnpm-lock.yaml, yarn.lock, or package-lock.json. After switching, run fresh install. Keep in mind dependency resolution may differ slightly.',
    
    faq2q: 'Which is fastest for CI/CD?',
    faq2a: 'pnpm is typically fastest in CI environments due to efficient caching and parallel downloads. Yarn with Plug\'n\'Play can be very fast for subsequent builds. npm has improved but usually lags behind. Consider your CI\'s caching capabilities.',
    
    faq3q: 'What about workspace support?',
    faq3a: 'All three support workspaces for monorepos. pnpm workspaces have excellent integration with Turborepo. Yarn workspaces are mature and widely used. npm workspaces are simpler but less feature-rich than Yarn or pnpm.',
    
    faq4q: 'Is pnpm compatible with all packages?',
    faq4a: 'Most packages work fine with pnpm. Strict dependency resolution may expose packages that incorrectly access transitive dependencies. pnpm provides shamefully-hoist option for compatibility, but it\'s better to fix the underlying issue.',
    
    faq5q: 'What is Yarn Plug\'n\'Play?',
    faq5a: 'Plug\'n\'Play (PnP) eliminates node_modules by using a single .pnp.cjs file to map packages. It can significantly improve performance and reduce disk usage, but requires tools to support it. Many modern tools do, but some may have issues.',
    
    faq6q: 'Which has the best security?',
    faq6a: 'All three have audit commands and security features. npm audit is integrated directly. Yarn has yarn audit. pnpm has pnpm audit. All can integrate with security scanners. pnpm\'s strict dependencies may expose fewer vulnerabilities.',
    
    faq7q: 'How do they handle peer dependencies?',
    faq7a: 'pnpm is strictest about peer dependencies, requiring explicit declaration. Yarn and npm are more lenient, auto-installing peers. pnpm\'s approach is safer but may require configuration for compatibility.',
    
    faq8q: 'Which should I use for open source?',
    faq8a: 'npm is often preferred for maximum compatibility with contributors. If using pnpm or Yarn, provide clear documentation and consider keeping package-lock.json for compatibility. Many projects use pnpm internally but support npm for contributors.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'pnpm vs Yarn vs npm：包管理器对比 2025',
    intro: 'pnpm、Yarn 和 npm 是 JavaScript 和 Node.js 项目的三大主流包管理器。每个在依赖管理、安装速度和磁盘空间效率方面都有独特的方法。这个对比帮助你了解它们的差异并选择适合你项目的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为最快的安装速度、磁盘空间效率和严格的依赖管理选择 pnpm。为 Plug\'n\'Play、稳定功能和企业工具选择 Yarn。为最广泛的兼容性、内置 Node.js 支持和零配置选择 npm。这三个都是生产就绪并积极维护的。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'pnpm 使用内容寻址存储，节省高达 70% 磁盘空间',
    takeaway2: 'Yarn 提供 Plug\'n\'Play 模式消除 node_modules',
    takeaway3: 'npm 捆绑在 Node.js 中，无需安装',
    takeaway4: 'pnpm 有最严格的依赖解析，防止幽灵依赖',
    takeaway5: '这三个都支持 workspace 用于 monorepo 管理',
    takeaway6: '安装速度：pnpm > Yarn > npm 在大多数基准测试中',
    
    whatIsPnpmTitle: '什么是 pnpm？',
    whatIsPnpmContent: 'pnpm（performant npm）是一个快速、磁盘空间高效的包管理器。它使用内容寻址存储，通过将所有包存储在单个位置并硬链接到项目来节省磁盘空间。pnpm 创建严格的 node_modules 结构，防止幽灵依赖。',
    
    whatIsYarnTitle: '什么是 Yarn？',
    whatIsYarnContent: 'Yarn 是由 Facebook（Meta）开发的包管理器，旨在解决 npm 的不足。Yarn 1 引入了快速、确定性安装。Yarn Berry（v2+）添加了 Plug\'n\'Play 模式、改进的 workspace 和 Zero-Install。Yarn 专注于稳定性和企业功能。',
    
    whatIsNpmTitle: '什么是 npm？',
    whatIsNpmContent: 'npm（Node Package Manager）是随 Node.js 捆绑的默认包管理器。它在 npm 7+ 中显著改进，添加了 workspace、更快的安装和更好的依赖解析。npm 拥有最大的生态系统和与所有 Node.js 项目的最广泛兼容性。',
    
    performanceTitle: '性能对比',
    performanceIntro: '常见操作的基准测试：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '每个包管理器的配置文件：',
    
    pnpmExampleTitle: 'pnpm 配置',
    yarnExampleTitle: 'Yarn 配置',
    npmExampleTitle: 'npm 配置',
    
    workspaceTitle: 'Workspace 支持',
    workspaceIntro: 'Monorepo 能力：',
    
    lockfileTitle: '锁定文件和安全',
    lockfileIntro: '依赖锁定和安全功能：',
    
    useCasesTitle: '最佳用例',
    pnpmBestFor: 'pnpm 最适合：',
    yarnBestFor: 'Yarn 最适合：',
    npmBestFor: 'npm 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 pnpm、Yarn 和 npm 之间的选择取决于你的优先级。pnpm 在性能和磁盘效率方面表现出色，非常适合大型 monorepo 和 CI/CD。Yarn 提供高级功能如 Plug\'n\'Play，在企业环境中受欢迎。npm 提供零摩擦设置和最大兼容性。许多团队为新项目选择 pnpm，同时为开源贡献保持 npm 兼容性。',
    
    faq1q: '我可以在包管理器之间切换吗？',
    faq1a: '可以，但你需要删除现有的锁定文件和 node_modules。每个管理器创建自己的锁定文件：pnpm-lock.yaml、yarn.lock 或 package-lock.json。切换后运行全新安装。请注意依赖解析可能略有不同。',
    
    faq2q: '哪个对 CI/CD 最快？',
    faq2a: '由于高效的缓存和并行下载，pnpm 在 CI 环境中通常最快。带有 Plug\'n\'Play 的 Yarn 对后续构建可以非常快。npm 有改进但通常落后。考虑你的 CI 缓存能力。',
    
    faq3q: 'workspace 支持怎么样？',
    faq3a: '这三个都支持 monorepo 的 workspace。pnpm workspace 与 Turborepo 有出色的集成。Yarn workspace 成熟且广泛使用。npm workspace 更简单但功能不如 Yarn 或 pnpm 丰富。',
    
    faq4q: 'pnpm 与所有包兼容吗？',
    faq4a: '大多数包与 pnpm 工作良好。严格的依赖解析可能会暴露错误访问传递依赖的包。pnpm 提供 shamefully-hoist 选项以兼容，但最好修复底层问题。',
    
    faq5q: '什么是 Yarn Plug\'n\'Play？',
    faq5a: 'Plug\'n\'Play（PnP）通过使用单个 .pnp.cjs 文件映射包来消除 node_modules。它可以显著提高性能并减少磁盘使用，但需要工具支持它。许多现代工具支持，但有些可能有问题。',
    
    faq6q: '哪个安全性最好？',
    faq6a: '这三个都有审计命令和安全功能。npm audit 直接集成。Yarn 有 yarn audit。pnpm 有 pnpm audit。所有都可以与安全扫描器集成。pnpm 的严格依赖可能暴露更少的漏洞。',
    
    faq7q: '它们如何处理 peer dependencies？',
    faq7a: 'pnpm 对 peer dependencies 最严格，需要显式声明。Yarn 和 npm 更宽松，自动安装 peers。pnpm 的方法更安全，但可能需要配置以兼容。',
    
    faq8q: '开源项目应该用哪个？',
    faq8a: '通常首选 npm 以与贡献者最大兼容。如果使用 pnpm 或 Yarn，提供清晰的文档并考虑保留 package-lock.json 以兼容。许多项目内部使用 pnpm 但支持 npm 供贡献者使用。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PnpmVsYarnVsNpm({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsPnpmTitle}</h3>
      <p style={pStyle}>{ct.whatIsPnpmContent}</p>

      <h3 style={h3Style}>{ct.whatIsYarnTitle}</h3>
      <p style={pStyle}>{ct.whatIsYarnContent}</p>

      <h3 style={h3Style}>{ct.whatIsNpmTitle}</h3>
      <p style={pStyle}>{ct.whatIsNpmContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷安装' : 'Cold Install', '~3s', '~5s', '~8s'],
              [isZh ? '热安装（缓存）' : 'Warm Install', '~1s', '~2s', '~3s'],
              [isZh ? '添加包' : 'Add Package', isZh ? '快' : 'Fast', isZh ? '快' : 'Fast', isZh ? '中等' : 'Medium'],
              [isZh ? '磁盘空间' : 'Disk Space', '10-30%', '100%', '100%'],
              [isZh ? '并行下载' : 'Parallel Downloads', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '离线支持' : 'Offline Support', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
            ].map(([op, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
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
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '锁定文件' : 'Lockfile', 'pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'],
              ['Plug\'n\'Play', isZh ? '无' : 'No', isZh ? '支持' : 'Yes', isZh ? '无' : 'No'],
              [isZh ? 'Workspace' : 'Workspaces', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '内容寻址存储' : 'Content-addressable Store', isZh ? '是' : 'Yes', isZh ? '部分' : 'Partial', isZh ? '无' : 'No'],
              [isZh ? '严格依赖' : 'Strict Deps', isZh ? '是' : 'Yes', isZh ? '可选' : 'Optional', isZh ? '无' : 'No'],
              [isZh ? '内置 Node' : 'Bundled with Node', isZh ? '无' : 'No', isZh ? '无' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? 'Patch 支持' : 'Patch Support', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
            ].map(([feature, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f9ad00' }}>{ct.pnpmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .npmrc (pnpm config)
shamefully-hoist=false
strict-peer-dependencies=true
auto-install-peers=true

// pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'

// Commands
pnpm install          # Install dependencies
pnpm add lodash       # Add dependency
pnpm add -D typescript # Add dev dependency
pnpm -r build         # Run in all workspaces
pnpm update           # Update dependencies

// Disk usage comparison
// Traditional: node_modules = 500MB
// pnpm: .pnpm-store + links = ~150MB`}</code></pre>

      <h3 style={{ ...h3Style, color: '#2c8ebb' }}>{ct.yarnExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .yarnrc.yml (Yarn Berry)
yarnPath: .yarn/releases/yarn-4.1.0.cjs
nodeLinker: node-modules  # or pnp for Plug'n'Play

// package.json workspaces
{
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

// Commands
yarn install           # Install dependencies
yarn add lodash        # Add dependency
yarn add -D typescript # Add dev dependency
yarn workspaces foreach run build
yarn upgrade           # Update dependencies

// PnP mode eliminates node_modules
// Uses .pnp.cjs for module resolution`}</code></pre>

      <h3 style={{ ...h3Style, color: '#cb3837' }}>{ct.npmExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .npmrc
legacy-peer-deps=false
package-lock=true

// package.json workspaces
{
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

// Commands
npm install            # Install dependencies
npm install lodash     # Add dependency
npm install -D typescript # Add dev dependency
npm run build --ws     # Run in all workspaces
npm update             # Update dependencies

// package-lock.json ensures
// deterministic installs`}</code></pre>

      <h2 style={h2Style}>{ct.workspaceTitle}</h2>
      <p style={pStyle}>{ct.workspaceIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f9ad00' }}>
          <strong style={{ color: '#f9ad00' }}>pnpm Workspaces</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'pnpm-workspace.yaml 配置，优秀的过滤功能，与 Turborepo 无缝集成，支持 workspace 协议，高效的跨包依赖管理。' : 'pnpm-workspace.yaml configuration, excellent filtering, seamless Turborepo integration, workspace protocol support, efficient cross-package dependency management.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2c8ebb' }}>
          <strong style={{ color: '#2c8ebb' }}>Yarn Workspaces</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '成熟的 workspace 实现，foreach 命令批量操作，与 Nx 和 Lerna 良好集成，支持 workspace 协议，专注于稳定性和企业需求。' : 'Mature workspace implementation, foreach command for batch operations, good Nx and Lerna integration, workspace protocol support, focuses on stability and enterprise needs.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #cb3837' }}>
          <strong style={{ color: '#cb3837' }}>npm Workspaces</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'npm 7+ 原生支持，package.json 配置，简单易用，--ws 标志批量操作，与 npm 生态完全兼容，适合简单 monorepo。' : 'Native support in npm 7+, package.json configuration, simple and easy to use, --ws flag for batch operations, full npm ecosystem compatibility, good for simple monorepos.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.lockfileTitle}</h2>
      <p style={pStyle}>{ct.lockfileIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '安全功能' : 'Security Feature'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '审计命令' : 'Audit Command', 'pnpm audit', 'yarn audit', 'npm audit'],
              [isZh ? '锁定文件格式' : 'Lockfile Format', 'YAML', isZh ? '自定义' : 'Custom', 'JSON'],
              [isZh ? '完整性校验' : 'Integrity Check', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '脚本限制' : 'Script Restrictions', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '依赖漏洞检查' : 'Vuln Detection', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
            ].map(([feature, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f9ad00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f9ad00' }}>{ct.pnpmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型 monorepo' : 'Large monorepos'}</li>
            <li>{isZh ? 'CI/CD 优化' : 'CI/CD optimization'}</li>
            <li>{isZh ? '磁盘空间受限' : 'Limited disk space'}</li>
            <li>{isZh ? '严格依赖管理' : 'Strict dependency management'}</li>
            <li>{isZh ? 'Turborepo 项目' : 'Turborepo projects'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2c8ebb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2c8ebb' }}>{ct.yarnBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业环境' : 'Enterprise environments'}</li>
            <li>{isZh ? '需要 PnP' : 'PnP requirement'}</li>
            <li>{isZh ? '稳定功能优先' : 'Stable features priority'}</li>
            <li>{isZh ? '现有 Yarn 项目' : 'Existing Yarn projects'}</li>
            <li>{isZh ? 'Zero-Install' : 'Zero-Install'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #cb3837' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#cb3837' }}>{ct.npmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '简单项目' : 'Simple projects'}</li>
            <li>{isZh ? '最大兼容性' : 'Maximum compatibility'}</li>
            <li>{isZh ? '快速开始' : 'Quick start'}</li>
            <li>{isZh ? 'Node.js 内置' : 'Node.js bundled'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/npm-package-downloads'} style={{ color: '#3b82f6', textDecoration: 'none' }}>NPM Downloads</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a>
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
