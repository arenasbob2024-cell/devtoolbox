'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'pnpm vs Yarn vs npm 2025: Package Manager Showdown',
    intro: 'The JavaScript package manager landscape has evolved significantly. npm is built-in, Yarn introduced workspaces, and pnpm revolutionized disk space usage. This comprehensive 2025 comparison examines performance, disk efficiency, and which package manager to choose for your projects.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'pnpm offers best disk space efficiency (2-3x savings) and strict dependency management. Yarn Berry (v2+) has PnP mode for zero-install. npm is built-in and reliable. Choose pnpm for monorepos and disk efficiency, Yarn for advanced features, npm for simplicity and universal compatibility.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'pnpm uses content-addressable storage - saves 2-3x disk space',
    takeaway2: 'Yarn Berry\'s Plug\'n\'Play eliminates node_modules entirely',
    takeaway3: 'npm is pre-installed with Node.js - zero setup required',
    takeaway4: 'All three support workspaces/monorepos in 2025',
    takeaway5: 'pnpm is fastest for installs, Yarn for scripts, npm for compatibility',
    takeaway6: 'pnpm prevents phantom dependencies - stricter than others',
    
    whatIsPNPMTitle: 'What is pnpm?',
    whatIsPNPMContent: 'pnpm (performant npm) is a fast, disk space efficient package manager created by Zoltan Kochan in 2016. It uses a content-addressable store where all packages are stored in a single location on disk and hard-linked to projects. This approach saves significant disk space and enables faster installations.',
    
    whatIsYarnTitle: 'What is Yarn?',
    whatIsYarnContent: 'Yarn was created by Facebook (now Meta) in 2016 to address npm\'s performance and security issues. Yarn Berry (v2+) introduced Plug\'n\'Play (PnP), eliminating node_modules entirely. Yarn focuses on deterministic installs, security, and advanced features like zero-installs.',
    
    whatIsNPMTitle: 'What is npm?',
    whatIsNPMContent: 'npm (Node Package Manager) is the default package manager for Node.js, created in 2010. It\'s maintained by GitHub (Microsoft) and comes pre-installed with Node.js. npm has significantly improved in recent versions (v7+) with workspaces support, faster installs, and better dependency resolution.',
    
    performanceTitle: 'Performance Benchmarks',
    performanceIntro: 'Real-world performance comparison on different project sizes:',
    
    diskSpaceTitle: 'Disk Space Usage',
    diskSpaceIntro: 'How each package manager handles disk space:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comprehensive feature comparison:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'See how configuration differs:',
    
    monorepoTitle: 'Monorepo Support',
    monorepoIntro: 'Workspace and monorepo capabilities:',
    
    whenToUseTitle: 'When to Use Each',
    pnpmBestFor: 'Use pnpm When:',
    yarnBestFor: 'Use Yarn When:',
    npmBestFor: 'Use npm When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, pnpm emerges as the best choice for most projects due to its disk efficiency, speed, and strict dependency management. Yarn Berry excels for teams wanting zero-install workflows and advanced features. npm remains the safe, universal choice. For monorepos, pnpm and Yarn both offer excellent workspace support. The choice often comes down to team preference and specific feature needs.',
    
    faq1q: 'Can I switch between package managers?',
    faq1a: 'Yes, but you\'ll need to remove node_modules and lock files first. Most projects can switch, but Yarn PnP requires significant changes. pnpm\'s strict mode may expose phantom dependencies. Always test thoroughly after switching.',
    
    faq2q: 'Which is fastest for CI/CD?',
    faq2a: 'pnpm is typically fastest in CI due to efficient caching. Yarn with zero-install can be instant if dependencies are committed. npm has improved significantly but still lags behind pnpm and Yarn for large projects.',
    
    faq3q: 'Does pnpm work with all packages?',
    faq3a: 'Almost all packages work with pnpm. Some packages with incorrect dependency declarations may fail due to pnpm\'s strict mode. Use node-linker=hoisted for compatibility or shamefully-hoist for legacy projects.',
    
    faq4q: 'Is Yarn PnP production-ready?',
    faq4a: 'Yes, but requires team buy-in. Many major companies use PnP in production. IDE integration has improved but still needs setup. Not all tools support PnP. Consider your team\'s willingness to adapt.',
    
    faq5q: 'Which has best monorepo support?',
    faq5a: 'All three support workspaces. pnpm has excellent built-in monorepo features with shared workspace config. Yarn workspaces are mature and battle-tested. npm workspaces work well for simpler setups. For complex monorepos, consider Turborepo/Nx with any package manager.',
    
    faq6q: 'Should I commit lock files?',
    faq6a: 'Yes, always commit lock files (package-lock.json, yarn.lock, pnpm-lock.yaml). They ensure consistent installs across environments. Yarn zero-install also commits the .yarn/cache directory for offline installs.',
    
    faq7q: 'Which uses least disk space?',
    faq7a: 'pnpm uses 2-3x less disk space than npm/Yarn due to content-addressable storage. A 10-project setup using React might use 1GB with npm/Yarn but only 300MB with pnpm. The savings scale with number of projects.',
    
    faq8q: 'What about security?',
    faq8a: 'All three have security features: npm audit, yarn audit, pnpm audit. Yarn has strict evaluation policies for scripts. pnpm\'s strict dependencies prevent accessing undeclared packages. All support 2FA for publishing. Security is comparable across all three.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'pnpm vs Yarn vs npm 2025：包管理器大比拼',
    intro: 'JavaScript包管理器领域已经显著发展。npm是内置的，Yarn引入了工作区，pnpm彻底改变了磁盘空间使用。本全面的2025年比较考察性能、磁盘效率以及为项目选择哪个包管理器。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'pnpm提供最佳的磁盘空间效率（节省2-3倍）和严格的依赖管理。Yarn Berry（v2+）有PnP模式实现零安装。npm是内置且可靠的。monorepo和磁盘效率选择pnpm，高级功能选择Yarn，简单和通用兼容性选择npm。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'pnpm使用内容寻址存储 - 节省2-3倍磁盘空间',
    takeaway2: 'Yarn Berry的Plug\'n\'Play完全消除node_modules',
    takeaway3: 'npm随Node.js预装 - 无需设置',
    takeaway4: '2025年这三个都支持工作区/monorepo',
    takeaway5: 'pnpm安装最快，Yarn脚本最快，npm兼容性最好',
    takeaway6: 'pnpm防止幽灵依赖 - 比其他更严格',
    
    whatIsPNPMTitle: '什么是pnpm？',
    whatIsPNPMContent: 'pnpm（高性能npm）是由Zoltan Kochan于2016年创建的快速、磁盘空间高效的包管理器。它使用内容寻址存储，所有包存储在磁盘上的单个位置并硬链接到项目。这种方法节省了大量磁盘空间并实现更快的安装。',
    
    whatIsYarnTitle: '什么是Yarn？',
    whatIsYarnContent: 'Yarn由Facebook（现为Meta）于2016年创建，用于解决npm的性能和安全问题。Yarn Berry（v2+）引入了Plug\'n\'Play（PnP），完全消除node_modules。Yarn专注于确定性安装、安全和高级功能，如零安装。',
    
    whatIsNPMTitle: '什么是npm？',
    whatIsNPMContent: 'npm（Node包管理器）是Node.js的默认包管理器，于2010年创建。它由GitHub（Microsoft）维护，并随Node.js预装。npm在最近的版本（v7+）中显著改进，支持工作区、更快的安装和更好的依赖解析。',
    
    performanceTitle: '性能基准测试',
    performanceIntro: '不同项目规模的真实性能对比：',
    
    diskSpaceTitle: '磁盘空间使用',
    diskSpaceIntro: '每个包管理器如何处理磁盘空间：',
    
    featuresTitle: '功能对比',
    featuresIntro: '全面的功能比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '看看配置有何不同：',
    
    monorepoTitle: 'Monorepo支持',
    monorepoIntro: '工作区和monorepo能力：',
    
    whenToUseTitle: '何时使用每种方案',
    pnpmBestFor: '使用pnpm的场景：',
    yarnBestFor: '使用Yarn的场景：',
    npmBestFor: '使用npm的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，pnpm因其磁盘效率、速度和严格的依赖管理而成为大多数项目的最佳选择。Yarn Berry在希望零安装工作流和高级功能的团队中表现出色。npm仍然是安全、通用的选择。对于monorepo，pnpm和Yarn都提供出色的工作区支持。选择通常归结为团队偏好和特定功能需求。',
    
    faq1q: '我可以在包管理器之间切换吗？',
    faq1a: '可以，但你需要先删除node_modules和锁文件。大多数项目可以切换，但Yarn PnP需要重大更改。pnpm的严格模式可能会暴露幽灵依赖。切换后务必彻底测试。',
    
    faq2q: '哪个对CI/CD最快？',
    faq2a: '由于高效缓存，pnpm在CI中通常最快。如果提交依赖，带零安装的Yarn可以即时完成。npm已显著改进，但对于大型项目仍落后于pnpm和Yarn。',
    
    faq3q: 'pnpm适用于所有包吗？',
    faq3a: '几乎所有包都适用于pnpm。一些依赖声明不正确的包可能因pnpm的严格模式而失败。使用node-linker=hoisted以兼容，或使用shamefully-hoist用于遗留项目。',
    
    faq4q: 'Yarn PnP已经可以用于生产了吗？',
    faq4a: '可以，但需要团队认同。许多大公司在生产中使用PnP。IDE集成已改进但仍需设置。并非所有工具都支持PnP。考虑团队的适应意愿。',
    
    faq5q: '哪个monorepo支持最好？',
    faq5a: '这三个都支持工作区。pnpm有出色的内置monorepo功能和共享工作区配置。Yarn工作区成熟且经过实战检验。npm工作区适用于更简单的设置。对于复杂的monorepo，考虑Turborepo/Nx与任何包管理器。',
    
    faq6q: '我应该提交锁文件吗？',
    faq6a: '是的，始终提交锁文件（package-lock.json、yarn.lock、pnpm-lock.yaml）。它们确保跨环境的一致安装。Yarn零安装还提交.yarn/cache目录以进行离线安装。',
    
    faq7q: '哪个使用最少磁盘空间？',
    faq7a: '由于内容寻址存储，pnpm比npm/Yarn少使用2-3倍磁盘空间。使用React的10个项目设置可能用npm/Yarn需要1GB，但用pnpm只需300MB。节省随项目数量扩展。',
    
    faq8q: '安全呢？',
    faq8a: '这三个都有安全功能：npm audit、yarn audit、pnpm audit。Yarn对脚本有严格的评估策略。pnpm的严格依赖防止访问未声明的包。所有都支持发布时的2FA。安全性在所有三个中都相当。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PNPMvsYarnvsNPM({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsPNPMTitle}</h3>
      <p style={pStyle}>{ct.whatIsPNPMContent}</p>

      <h3 style={h3Style}>{ct.whatIsYarnTitle}</h3>
      <p style={pStyle}>{ct.whatIsYarnContent}</p>

      <h3 style={h3Style}>{ct.whatIsNPMTitle}</h3>
      <p style={pStyle}>{ct.whatIsNPMContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
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
              [isZh ? '首次发布' : 'First Release', '2016', '2016', '2010'],
              [isZh ? '存储方式' : 'Storage', 'Content-addressable', 'node_modules / PnP', 'node_modules'],
              [isZh ? '锁文件' : 'Lock File', 'pnpm-lock.yaml', 'yarn.lock', 'package-lock.json'],
              [isZh ? '工作区支持' : 'Workspaces', '✓ v2+', '✓ v1+', '✓ v7+'],
              [isZh ? '预装' : 'Pre-installed', '✗', '✗', '✓ (with Node.js)'],
              [isZh ? '严格依赖' : 'Strict Deps', '✓ Yes', 'Optional', '✗ No'],
              [isZh ? '零安装' : 'Zero-Install', '✗', '✓ (PnP)', '✗'],
              [isZh ? '插件系统' : 'Plugin System', '✓', '✓', '✗'],
            ].map(([feature, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f9ad00' }}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
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
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷安装 (小项目)' : 'Cold Install (small)', '2.1s', '2.5s', '3.2s'],
              [isZh ? '冷安装 (大项目)' : 'Cold Install (large)', '8.3s', '11.2s', '15.4s'],
              [isZh ? '热安装 (缓存)' : 'Warm Install (cached)', '0.8s', '1.2s', '2.1s'],
              [isZh ? '添加依赖' : 'Add Dependency', '1.5s', '1.8s', '2.3s'],
              [isZh ? '运行脚本' : 'Run Scripts', '0.3s', '0.2s', '0.4s'],
            ].map(([operation, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{operation}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disk Space */}
      <h2 style={h2Style}>{ct.diskSpaceTitle}</h2>
      <p style={pStyle}>{ct.diskSpaceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '单个React项目' : 'Single React Project', '120MB', '350MB', '350MB'],
              [isZh ? '10个React项目' : '10 React Projects', '180MB', '3.5GB', '3.5GB'],
              [isZh ? 'Monorepo (50包)' : 'Monorepo (50 packages)', '250MB', '800MB', '850MB'],
              [isZh ? '节省比例' : 'Savings', '2-3x', '1x', '1x'],
            ].map(([scenario, pnpm, yarn, npm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{pnpm}</td>
                <td style={tdStyle}>{yarn}</td>
                <td style={tdStyle}>{npm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f9ad00' }}>pnpm</h3>
      <pre style={codeStyle}><code>{`# pnpm Configuration
# Install pnpm
npm install -g pnpm

# Initialize project
pnpm init

# Install dependencies
pnpm install
pnpm add react react-dom
pnpm add -D typescript

# pnpm-workspace.yaml (for monorepo)
packages:
  - 'packages/*'
  - 'apps/*'

# .npmrc (pnpm-specific settings)
shamefully-hoist=true  # For compatibility
node-linker=hoisted    # Alternative to hoisting
strict-peer-dependencies=false

# Run scripts
pnpm dev
pnpm build
pnpm test

# Advantages:
# - Fast installations (hard links)
# - Saves disk space
# - Strict dependency resolution
# - Excellent monorepo support`}</code></pre>

      <h3 style={{ ...h3Style, color: '#2c8ebb' }}>Yarn</h3>
      <pre style={codeStyle}><code>{`# Yarn Configuration
# Install Yarn
npm install -g yarn

# Enable Yarn Berry (v2+)
yarn set version berry

# Initialize project
yarn init

# Install dependencies
yarn install
yarn add react react-dom
yarn add -D typescript

# .yarnrc.yml (Yarn Berry config)
yarnPath: .yarn/releases/yarn-4.0.0.cjs
nodeLinker: pnp  # or node-modules

# Zero-install setup
yarn install
git add .yarn/cache

# package.json (workspaces)
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

# Run scripts
yarn dev
yarn build
yarn test

# Advantages:
# - Plug'n'Play mode
# - Zero-install capability
# - Advanced features
# - Deterministic installs`}</code></pre>

      <h3 style={{ ...h3Style, color: '#cb3837' }}>npm</h3>
      <pre style={codeStyle}><code>{`# npm Configuration
# Pre-installed with Node.js!

# Initialize project
npm init

# Install dependencies
npm install
npm install react react-dom
npm install -D typescript

# package.json (workspaces)
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}

# .npmrc (npm config)
save-exact=true
engine-strict=true

# Run scripts
npm run dev
npm run build
npm test

# Advantages:
# - Pre-installed everywhere
# - Universal compatibility
# - Simple and reliable
# - Great documentation`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>pnpm</th>
              <th style={thStyle}>Yarn</th>
              <th style={thStyle}>npm</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '工作区' : 'Workspaces', '✓', '✓', '✓'],
              [isZh ? '离线模式' : 'Offline Mode', '✓', '✓', '✓'],
              [isZh ? '确定性安装' : 'Deterministic', '✓', '✓', '✓'],
              [isZh ? '插件系统' : 'Plugin System', '✓', '✓', '✗'],
              [isZh ? 'PnP模式' : 'PnP Mode', '✗', '✓', '✗'],
              [isZh ? '严格依赖' : 'Strict Deps', '✓', 'Optional', '✗'],
              [isZh ? '补丁支持' : 'Patching', '✓', '✓', '✓'],
              [isZh ? '审计命令' : 'Audit', '✓', '✓', '✓'],
              [isZh ? '脚本钩子' : 'Scripts Hooks', '✓', '✓', '✓'],
              [isZh ? '别名支持' : 'Aliases', '✓', '✓', '✓'],
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

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f9ad00' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f9ad00' }}>{ct.pnpmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Monorepo项目' : 'Monorepo projects'}</li>
            <li>{isZh ? '多个项目共享依赖' : 'Multiple projects sharing deps'}</li>
            <li>{isZh ? '磁盘空间受限' : 'Disk space constrained'}</li>
            <li>{isZh ? '需要严格依赖管理' : 'Need strict dependency mgmt'}</li>
            <li>{isZh ? '追求最快安装速度' : 'Want fastest installs'}</li>
            <li>{isZh ? 'CI/CD优化' : 'CI/CD optimization'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2c8ebb' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2c8ebb' }}>{ct.yarnBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '零安装工作流' : 'Zero-install workflow'}</li>
            <li>{isZh ? 'PnP模式需求' : 'PnP mode required'}</li>
            <li>{isZh ? '需要高级功能' : 'Need advanced features'}</li>
            <li>{isZh ? '大型团队协作' : 'Large team collaboration'}</li>
            <li>{isZh ? '自定义插件' : 'Custom plugins'}</li>
            <li>{isZh ? '遗留Yarn项目' : 'Legacy Yarn projects'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #cb3837' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#cb3837' }}>{ct.npmBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '简单项目' : 'Simple projects'}</li>
            <li>{isZh ? '通用兼容性' : 'Universal compatibility'}</li>
            <li>{isZh ? '团队熟悉npm' : 'Team familiar with npm'}</li>
            <li>{isZh ? '无需额外安装' : 'No extra installation'}</li>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? 'CI/CD环境标准化' : 'CI/CD environment standard'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
