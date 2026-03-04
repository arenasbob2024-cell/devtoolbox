'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Husky vs simple-git-hooks: Git Hooks Tools Comparison',
    intro: 'Husky and simple-git-hooks are two popular tools for managing Git hooks in JavaScript/Node.js projects. Both allow you to run scripts at specific Git events like pre-commit, pre-push, and commit-msg. This comparison examines their features, performance, and ideal use cases to help you choose the right tool.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Husky for comprehensive features, active development, and ecosystem compatibility. Choose simple-git-hooks for minimal dependencies, fast installation, and simpler projects. Husky is the industry standard with more features, while simple-git-hooks focuses on simplicity and speed.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Husky is the most popular with extensive ecosystem support',
    takeaway2: 'simple-git-hooks has zero runtime dependencies',
    takeaway3: 'Husky v9+ uses a simplified configuration approach',
    takeaway4: 'simple-git-hooks offers faster CI/CD installation',
    takeaway5: 'Both support all standard Git hooks',
    takeaway6: 'Husky has better Windows support',
    
    whatIsHuskyTitle: 'What is Husky?',
    whatIsHuskyContent: 'Husky is a widely-used Git hooks manager for JavaScript projects. Originally released in 2016, it has evolved through several major versions. Husky v9 introduced a simplified architecture using Git core.hooksPath, removing the need for complex shell scripts. It is maintained by Typicode and has extensive adoption in the JavaScript ecosystem.',
    
    whatIsSimpleGitHooksTitle: 'What is simple-git-hooks?',
    whatIsSimpleGitHooksContent: 'simple-git-hooks is a lightweight alternative to Husky focused on minimalism and speed. It has zero runtime dependencies and uses a straightforward configuration approach. Developed by toplenboren, it is designed for projects that want Git hooks without the overhead of additional dependencies.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Setup and hook configuration:',
    
    huskyExampleTitle: 'Husky Config',
    simpleGitHooksExampleTitle: 'simple-git-hooks Config',
    
    installationTitle: 'Installation & Setup',
    installationIntro: 'Installation process comparison:',
    
    hooksTitle: 'Supported Hooks',
    hooksIntro: 'Git hooks support:',
    
    useCasesTitle: 'Best Use Cases',
    huskyBestFor: 'Husky is Best For:',
    simpleGitHooksBestFor: 'simple-git-hooks is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Husky and simple-git-hooks both solve Git hooks management effectively. Husky is the industry standard with better ecosystem integration and comprehensive features, making it ideal for most projects. simple-git-hooks is perfect for teams prioritizing minimal dependencies and fast CI/CD. Choose based on your project complexity and dependency philosophy.',
    
    faq1q: 'Can I migrate from Husky to simple-git-hooks?',
    faq1a: 'Yes, migration is straightforward. Remove Husky, install simple-git-hooks, and convert your hook scripts. The configuration format differs but the Git hooks themselves work identically.',
    
    faq2q: 'Which is faster in CI/CD?',
    faq2a: 'simple-git-hooks is faster in CI/CD because it has no dependencies to install. Husky requires additional packages. For CI environments where every second counts, simple-git-hooks has an advantage.',
    
    faq3q: 'Does simple-git-hooks work with lint-staged?',
    faq3a: 'Yes, simple-git-hooks works with lint-staged just like Husky. You can configure lint-staged in package.json and call it from your pre-commit hook.',
    
    faq4q: 'What about Windows support?',
    faq4a: 'Husky has better Windows support with more testing and fixes for Windows-specific issues. simple-git-hooks works on Windows but may have edge cases. For Windows-heavy teams, Husky is safer.',
    
    faq5q: 'Can I use shell scripts with both?',
    faq5a: 'Yes, both support shell scripts. Husky v9+ uses a .husky directory for scripts. simple-git-hooks can run scripts from any location you configure.',
    
    faq6q: 'How do they handle hook failures?',
    faq6a: 'Both properly exit with non-zero codes on failure, preventing the Git operation from completing. This is standard Git hooks behavior that both tools respect.',
    
    faq7q: 'Which has better documentation?',
    faq7a: 'Husky has more comprehensive documentation with examples and guides. simple-git-hooks has simpler documentation matching its simpler feature set. Both are adequate for their scope.',
    
    faq8q: 'Are there other alternatives?',
    faq8a: 'Yes, alternatives include Yorkie (GitHooks fork), pre-commit (Python-based), and overcommit (Ruby). Husky and simple-git-hooks are the most popular for JavaScript/Node.js projects.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Husky vs simple-git-hooks：Git Hooks工具对比',
    intro: 'Husky和simple-git-hooks是两个流行的JavaScript/Node.js项目Git hooks管理工具。两者都允许你在特定Git事件如pre-commit、pre-push和commit-msg时运行脚本。本比较考察它们的功能、性能和理想用例，帮助你选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为全面功能、积极开发和生态兼容性选择Husky。为最小依赖、快速安装和简单项目选择simple-git-hooks。Husky是行业标准，功能更多，而simple-git-hooks专注于简单和速度。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Husky最受欢迎，有广泛的生态系统支持',
    takeaway2: 'simple-git-hooks零运行时依赖',
    takeaway3: 'Husky v9+使用简化的配置方法',
    takeaway4: 'simple-git-hooks提供更快的CI/CD安装',
    takeaway5: '两者都支持所有标准Git hooks',
    takeaway6: 'Husky有更好的Windows支持',
    
    whatIsHuskyTitle: '什么是Husky？',
    whatIsHuskyContent: 'Husky是一个广泛使用的JavaScript项目Git hooks管理器。最初于2016年发布，它已经经历了几个主要版本。Husky v9引入了简化的架构，使用Git core.hooksPath，消除了对复杂shell脚本的需求。它由Typicode维护，在JavaScript生态系统中有广泛的采用。',
    
    whatIsSimpleGitHooksTitle: '什么是simple-git-hooks？',
    whatIsSimpleGitHooksContent: 'simple-git-hooks是Husky的轻量级替代品，专注于极简和速度。它零运行时依赖，使用直接的配置方法。由toplenboren开发，专为想要Git hooks而没有额外依赖开销的项目设计。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '设置和hook配置：',
    
    huskyExampleTitle: 'Husky配置',
    simpleGitHooksExampleTitle: 'simple-git-hooks配置',
    
    installationTitle: '安装与设置',
    installationIntro: '安装过程对比：',
    
    hooksTitle: '支持的Hooks',
    hooksIntro: 'Git hooks支持：',
    
    useCasesTitle: '最佳用例',
    huskyBestFor: 'Husky最适合：',
    simpleGitHooksBestFor: 'simple-git-hooks最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Husky和simple-git-hooks都有效地解决了Git hooks管理。Husky是行业标准，有更好的生态系统集成和全面功能，适合大多数项目。simple-git-hooks非常适合优先考虑最小依赖和快速CI/CD的团队。根据你的项目复杂性和依赖理念选择。',
    
    faq1q: '我可以从Husky迁移到simple-git-hooks吗？',
    faq1a: '是的，迁移很简单。移除Husky，安装simple-git-hooks，并转换你的hook脚本。配置格式不同但Git hooks本身工作方式相同。',
    
    faq2q: '哪个在CI/CD中更快？',
    faq2a: 'simple-git-hooks在CI/CD中更快，因为没有依赖需要安装。Husky需要额外的包。对于每秒都很重要的CI环境，simple-git-hooks有优势。',
    
    faq3q: 'simple-git-hooks能与lint-staged一起工作吗？',
    faq3a: '是的，simple-git-hooks与lint-staged一起工作，就像Husky一样。你可以在package.json中配置lint-staged并从pre-commit hook调用它。',
    
    faq4q: 'Windows支持怎么样？',
    faq4a: 'Husky有更好的Windows支持，有更多的测试和Windows特定问题的修复。simple-git-hooks在Windows上工作但可能有边缘情况。对于Windows重的团队，Husky更安全。',
    
    faq5q: '我可以在两者中使用shell脚本吗？',
    faq5a: '是的，两者都支持shell脚本。Husky v9+使用.husky目录存放脚本。simple-git-hooks可以从你配置的任何位置运行脚本。',
    
    faq6q: '它们如何处理hook失败？',
    faq6a: '两者都在失败时正确以非零代码退出，阻止Git操作完成。这是两者工具都遵守的标准Git hooks行为。',
    
    faq7q: '哪个有更好的文档？',
    faq7a: 'Husky有更全面的文档，包括示例和指南。simple-git-hooks有更简单的文档，匹配其更简单的功能集。两者对于其范围都足够。',
    
    faq8q: '有其他替代品吗？',
    faq8a: '是的，替代品包括Yorkie（GitHooks分支）、pre-commit（基于Python）和overcommit（Ruby）。Husky和simple-git-hooks是JavaScript/Node.js项目中最受欢迎的。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HuskyVsSimpleGitHooks({ lang }: { lang: string }) {
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

      <h3 style={{ ...h3Style, color: '#f97316' }}>{ct.whatIsHuskyTitle}</h3>
      <p style={pStyle}>{ct.whatIsHuskyContent}</p>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.whatIsSimpleGitHooksTitle}</h3>
      <p style={pStyle}>{ct.whatIsSimpleGitHooksContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Husky</th>
              <th style={thStyle}>simple-git-hooks</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '运行时依赖' : 'Runtime Dependencies', '1', '0'],
              [isZh ? '包大小' : 'Package Size', '~30KB', '~5KB'],
              [isZh ? '配置方式' : 'Configuration', '.husky目录', 'package.json'],
              [isZh ? '安装速度' : 'Install Speed', isZh ? '中' : 'Medium', isZh ? '快' : 'Fast'],
              [isZh ? 'Windows支持' : 'Windows Support', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '社区支持' : 'Community', isZh ? '大' : 'Large', isZh ? '小' : 'Small'],
              [isZh ? '维护状态' : 'Maintenance', isZh ? '活跃' : 'Active', isZh ? '活跃' : 'Active'],
              [isZh ? 'lint-staged兼容' : 'lint-staged Compatible', '\u2713', '\u2713'],
            ].map(([feature, husky, simple], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{husky}</td>
                <td style={tdStyle}>{simple}</td>
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
              <th style={thStyle}>Husky</th>
              <th style={thStyle}>simple-git-hooks</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '所有Git hooks' : 'All Git Hooks', '\u2713', '\u2713'],
              [isZh ? 'Shell脚本' : 'Shell Scripts', '\u2713', '\u2713'],
              [isZh ? '环境变量' : 'Environment Variables', '\u2713', '\u2713'],
              [isZh ? '条件执行' : 'Conditional Execution', '\u2713', isZh ? '手动' : 'Manual'],
              [isZh ? 'Hook跳过' : 'Skip Hooks', 'HUSKY=0', isZh ? '无内置' : 'No built-in'],
              [isZh ? '自动安装' : 'Auto Install', '\u2713', '\u2713'],
              [isZh ? 'Yarn支持' : 'Yarn Support', '\u2713', '\u2713'],
              [isZh ? 'pnpm支持' : 'pnpm Support', '\u2713', '\u2713'],
            ].map(([cap, husky, simple], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{husky}</td>
                <td style={tdStyle}>{simple}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f97316' }}>{ct.huskyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "devDependencies": {
    "husky": "^9.0.0"
  }
}

// Initialize Husky (run once)
npm run prepare

// .husky/pre-commit
npm run lint
npm run test

// .husky/commit-msg
npx --no -- commitlint --edit "$1"

// .husky/pre-push
npm run build
npm run test:coverage

// Skip hooks temporarily
// HUSKY=0 git commit -m "skip hooks"

// Add hook via CLI
npx husky add .husky/pre-commit "npm test"

// Using with lint-staged
// .husky/pre-commit
npx lint-staged

// package.json
{
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.simpleGitHooksExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// package.json
{
  "scripts": {
    "postinstall": "simple-git-hooks"
  },
  "simple-git-hooks": {
    "pre-commit": "npm run lint && npm test",
    "commit-msg": "npx --no -- commitlint --edit $1",
    "pre-push": "npm run build"
  },
  "devDependencies": {
    "simple-git-hooks": "^2.9.0"
  }
}

// Alternative: External config file
// .simple-git-hooks.json
{
  "pre-commit": "npx lint-staged",
  "commit-msg": "npx commitlint --edit $1",
  "pre-push": "npm run test:coverage"
}

// package.json with external config
{
  "simple-git-hooks": ".simple-git-hooks.json"
}

// Using with lint-staged
{
  "simple-git-hooks": {
    "pre-commit": "npx lint-staged"
  },
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"]
  }
}

// Manual installation (if postinstall skipped)
npx simple-git-hooks`}</code></pre>

      <h2 style={h2Style}>{ct.installationTitle}</h2>
      <p style={pStyle}>{ct.installationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f97316' }}>
          <strong style={{ color: '#f97316' }}>Husky Installation</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要prepare脚本或手动初始化，创建.husky目录，有1个依赖（run.sh），支持npm/yarn/pnpm，自动在install时设置。' : 'Requires prepare script or manual init, creates .husky directory, has 1 dependency (run.sh), supports npm/yarn/pnpm, auto-setup on install.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4' }}>
          <strong style={{ color: '#06b6d4' }}>simple-git-hooks Installation</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '零依赖，使用postinstall自动设置，配置在package.json中，更快的CI安装，更小的node_modules。' : 'Zero dependencies, uses postinstall for auto-setup, config in package.json, faster CI install, smaller node_modules.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.hooksTitle}</h2>
      <p style={pStyle}>{ct.hooksIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? 'Hook' : 'Hook'}</th>
              <th style={thStyle}>{isZh ? '用途' : 'Purpose'}</th>
              <th style={thStyle}>Husky</th>
              <th style={thStyle}>simple-git-hooks</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['pre-commit', isZh ? '提交前检查' : 'Before commit', '\u2713', '\u2713'],
              ['commit-msg', isZh ? '提交消息验证' : 'Commit message', '\u2713', '\u2713'],
              ['pre-push', isZh ? '推送前检查' : 'Before push', '\u2713', '\u2713'],
              ['post-merge', isZh ? '合并后操作' : 'After merge', '\u2713', '\u2713'],
              ['post-checkout', isZh ? '切换分支后' : 'After checkout', '\u2713', '\u2713'],
              ['pre-rebase', isZh ? '变基前' : 'Before rebase', '\u2713', '\u2713'],
            ].map(([hook, purpose, husky, simple], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{hook}</td>
                <td style={tdStyle}>{purpose}</td>
                <td style={tdStyle}>{husky}</td>
                <td style={tdStyle}>{simple}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f97316' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.huskyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型项目' : 'Large projects'}</li>
            <li>{isZh ? 'Windows团队' : 'Windows teams'}</li>
            <li>{isZh ? '需要生态兼容' : 'Need ecosystem compat'}</li>
            <li>{isZh ? '复杂hook需求' : 'Complex hook needs'}</li>
            <li>{isZh ? '企业项目' : 'Enterprise projects'}</li>
            <li>{isZh ? '现有Husky用户' : 'Existing Husky users'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #06b6d4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#06b6d4' }}>{ct.simpleGitHooksBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '小型项目' : 'Small projects'}</li>
            <li>{isZh ? 'CI/CD优化' : 'CI/CD optimization'}</li>
            <li>{isZh ? '最小依赖' : 'Minimal dependencies'}</li>
            <li>{isZh ? '快速安装需求' : 'Fast install needs'}</li>
            <li>{isZh ? '简单hook需求' : 'Simple hook needs'}</li>
            <li>{isZh ? 'Unix/Mac团队' : 'Unix/Mac teams'}</li>
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
