'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Changesets vs Lerna: Versioning and Publishing Tools',
    intro: "Managing versions and publishing packages in a monorepo requires specialized tooling. Changesets and Lerna are the two most popular solutions for this challenge. This comparison examines their approaches to versioning, changelog generation, and package publishing.",
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: "Changesets offers a more flexible, CI-friendly approach with explicit change documentation during development. Lerna provides a simpler, more opinionated workflow with fixed or independent versioning. For new projects in 2025, Changesets is the recommended choice due to its better CI integration and multi-package coordination.",
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: "Changesets documents changes during PR review, not at release time",
    takeaway2: "Lerna has built-in publishing, Changesets uses npm directly",
    takeaway3: "Changesets generates better changelogs with change documentation",
    takeaway4: "Lerna supports fixed or independent versioning modes",
    takeaway5: "Changesets is better for CI/CD automation",
    takeaway6: "Both handle inter-package dependencies correctly",
    
    whatIsChangesetsTitle: 'What is Changesets?',
    whatIsChangesetsContent: "Changesets is a tool to manage versioning and changelogs for monorepos. Developed by the team at Atlassian and now maintained by the Changesets community, it focuses on capturing change information during development rather than at release time. Each change is documented in a changeset file that describes the change type and affected packages.",
    
    whatIsLernaTitle: 'What is Lerna?',
    whatIsLernaContent: "Lerna is the original monorepo management tool for JavaScript. Created in 2015, it pioneered many patterns now common in monorepo tooling. Lerna handles versioning, publishing, and dependency management between packages. After a period of reduced maintenance, it's now actively maintained again under Nrwl.",
    
    workflowTitle: 'Workflow Comparison',
    workflowIntro: 'How each tool handles the release process:',
    
    versioningTitle: 'Versioning Strategies',
    versioningIntro: 'Different approaches to version management:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core capabilities comparison:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Configuration and usage patterns:',
    
    changesetsExampleTitle: 'Changesets Workflow',
    lernaExampleTitle: 'Lerna Workflow',
    
    ciTitle: 'CI/CD Integration',
    ciIntro: 'Automation capabilities:',
    
    whenToUseTitle: 'When to Use Each Tool',
    changesetsBestFor: 'Use Changesets When:',
    lernaBestFor: 'Use Lerna When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: "Changesets and Lerna represent different philosophies in release management. Changesets excels at capturing change context during development and integrating with modern CI/CD pipelines. Lerna offers a simpler, all-in-one solution that works well for smaller teams. For most monorepos in 2025, Changesets provides the more maintainable and automated workflow, especially when combined with pnpm and Turborepo.",
    
    faq1q: 'Can I migrate from Lerna to Changesets?',
    faq1a: "Yes, migration is possible. You will need to convert your lerna.json configuration, adjust your CI scripts, and potentially update your versioning strategy. The Changesets docs include a migration guide for Lerna users.",
    
    faq2q: 'Does Changesets support private packages?',
    faq2a: "Yes, Changesets works with both public and private packages. You can configure which packages to publish and which to keep private in the changeset config.",
    
    faq3q: 'What about Lerna versioning modes?',
    faq3a: "Lerna supports Fixed mode (all packages share one version) and Independent mode (each package has its own version). Fixed is simpler for closely coupled packages, Independent is better for standalone libraries.",
    
    faq4q: 'How does Changesets handle breaking changes?',
    faq4a: "Changesets uses semver notation (major/minor/patch). When you mark a change as 'major', it will bump the major version. You can also add custom bump types and configure how they affect versioning.",
    
    faq5q: 'Can I use both tools together?',
    faq5a: "While technically possible, it is not recommended. Both tools manage versions and publishing, which could cause conflicts. Choose one based on your workflow preferences.",
    
    faq6q: 'How do they handle changelog generation?',
    faq6a: "Changesets generates changelogs from the markdown descriptions in each changeset file. Lerna generates changelogs from git commit messages. Changesets typically produces more readable, user-focused changelogs.",
    
    faq7q: 'Which tool is faster for publishing?',
    faq7a: "Both are similar in speed for small monorepos. For large monorepos, Changesets can be faster because it only publishes packages that actually changed, while Lerna may need to check all packages.",
    
    faq8q: 'Do they work with any package manager?',
    faq8a: "Changesets works with npm, yarn, and pnpm. Lerna traditionally worked best with npm/yarn but recent versions have improved pnpm support. Both integrate well with modern monorepo setups.",
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Changesets vs Lerna：版本管理和发布工具对比',
    intro: '在 monorepo 中管理版本和发布包需要专门的工具。Changesets 和 Lerna 是解决这一挑战的两种最流行的方案。本文对比它们在版本管理、变更日志生成和包发布方面的方法。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Changesets 提供更灵活、更友好的 CI 方式，在开发过程中明确记录变更。Lerna 提供更简单、更有主见的工作流，支持固定或独立版本控制。对于 2025 年的新项目，推荐使用 Changesets，因为它有更好的 CI 集成和多包协调能力。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Changesets 在 PR 审查期间记录变更，而非发布时',
    takeaway2: 'Lerna 有内置发布功能，Changesets 直接使用 npm',
    takeaway3: 'Changesets 通过变更文档生成更好的变更日志',
    takeaway4: 'Lerna 支持固定或独立版本控制模式',
    takeaway5: 'Changesets 更适合 CI/CD 自动化',
    takeaway6: '两者都能正确处理包间依赖',
    
    whatIsChangesetsTitle: '什么是 Changesets？',
    whatIsChangesetsContent: 'Changesets 是一个管理 monorepo 版本和变更日志的工具。由 Atlassian 团队开发，现由 Changesets 社区维护，它专注于在开发过程中而非发布时捕获变更信息。每个变更都记录在一个 changeset 文件中，描述变更类型和受影响的包。',
    
    whatIsLernaTitle: '什么是 Lerna？',
    whatIsLernaContent: 'Lerna 是 JavaScript 的原始 monorepo 管理工具。创建于 2015 年，它开创了许多现在在 monorepo 工具中常见的模式。Lerna 处理版本管理、发布和包之间的依赖管理。经过一段时间的维护减少后，现在由 Nrwl 再次积极维护。',
    
    workflowTitle: '工作流对比',
    workflowIntro: '每个工具如何处理发布流程：',
    
    versioningTitle: '版本控制策略',
    versioningIntro: '不同的版本管理方法：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心能力对比：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '配置和使用模式：',
    
    changesetsExampleTitle: 'Changesets 工作流',
    lernaExampleTitle: 'Lerna 工作流',
    
    ciTitle: 'CI/CD 集成',
    ciIntro: '自动化能力：',
    
    whenToUseTitle: '何时使用每个工具',
    changesetsBestFor: '使用 Changesets 的场景：',
    lernaBestFor: '使用 Lerna 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Changesets 和 Lerna 代表了发布管理中的不同理念。Changesets 擅长在开发过程中捕获变更上下文并与现代 CI/CD 流水线集成。Lerna 提供更简单的一体化解决方案，适合较小的团队。对于 2025 年的大多数 monorepo，Changesets 提供了更可维护和自动化的工作流，尤其是与 pnpm 和 Turborepo 结合使用时。',
    
    faq1q: '可以从 Lerna 迁移到 Changesets 吗？',
    faq1a: '可以，迁移是可能的。你需要转换 lerna.json 配置，调整 CI 脚本，并可能更新版本控制策略。Changesets 文档包含针对 Lerna 用户的迁移指南。',
    
    faq2q: 'Changesets 支持私有包吗？',
    faq2a: '是的，Changesets 同时支持公共和私有包。你可以在 changeset 配置中配置哪些包发布，哪些保持私有。',
    
    faq3q: 'Lerna 的版本控制模式是怎样的？',
    faq3a: 'Lerna 支持固定模式（所有包共享一个版本）和独立模式（每个包有自己的版本）。固定模式对紧密耦合的包更简单，独立模式对独立库更好。',
    
    faq4q: 'Changesets 如何处理破坏性变更？',
    faq4a: 'Changesets 使用语义化版本标记（major/minor/patch）。当你将变更标记为 major 时，它会升级主版本号。你还可以添加自定义升级类型并配置它们如何影响版本控制。',
    
    faq5q: '可以同时使用两个工具吗？',
    faq5a: '虽然技术上可行，但不推荐。两个工具都管理版本和发布，可能会导致冲突。根据你的工作流偏好选择一个。',
    
    faq6q: '它们如何处理变更日志生成？',
    faq6a: 'Changesets 从每个 changeset 文件中的 markdown 描述生成变更日志。Lerna 从 git 提交消息生成变更日志。Changesets 通常生成更易读、更面向用户的变更日志。',
    
    faq7q: '哪个工具发布更快？',
    faq7a: '对于小型 monorepo，两者速度相似。对于大型 monorepo，Changesets 可能更快，因为它只发布实际更改的包，而 Lerna 可能需要检查所有包。',
    
    faq8q: '它们支持任何包管理器吗？',
    faq8a: 'Changesets 支持 npm、yarn 和 pnpm。Lerna 传统上与 npm/yarn 配合最好，但最新版本已改进 pnpm 支持。两者都与现代 monorepo 设置良好集成。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ChangesetsVsLerna({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsChangesetsTitle}</h3>
      <p style={pStyle}>{ct.whatIsChangesetsContent}</p>

      <h3 style={h3Style}>{ct.whatIsLernaTitle}</h3>
      <p style={pStyle}>{ct.whatIsLernaContent}</p>

      {/* Workflow Comparison */}
      <h2 style={h2Style}>{ct.workflowTitle}</h2>
      <p style={pStyle}>{ct.workflowIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Changesets {isZh ? '工作流' : 'Workflow'}</strong>
          <ol style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
            <li>{isZh ? '开发者添加 changeset 文件描述变更' : 'Developer adds changeset file describing the change'}</li>
            <li>{isZh ? 'Changeset 在 PR 中审查' : 'Changeset is reviewed in PR'}</li>
            <li>{isZh ? '合并后，changeset 收集版本信息' : 'After merge, changeset collects version info'}</li>
            <li>{isZh ? '运行 version 命令更新包版本和 changelog' : 'Run version command to update package versions and changelogs'}</li>
            <li>{isZh ? '运行 publish 命令发布到 npm' : 'Run publish command to publish to npm'}</li>
          </ol>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Lerna {isZh ? '工作流' : 'Workflow'}</strong>
          <ol style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 2, paddingLeft: 20 }}>
            <li>{isZh ? '开发者正常提交代码' : 'Developer commits code normally'}</li>
            <li>{isZh ? '准备发布时运行 version 命令' : 'When ready to release, run version command'}</li>
            <li>{isZh ? 'Lerna 分析提交并确定版本升级' : 'Lerna analyzes commits and determines version bumps'}</li>
            <li>{isZh ? '手动或自动生成 changelog' : 'Changelogs generated manually or automatically'}</li>
            <li>{isZh ? '运行 publish 发布所有变更的包' : 'Run publish to release all changed packages'}</li>
          </ol>
        </div>
      </div>

      {/* Versioning Strategies */}
      <h2 style={h2Style}>{ct.versioningTitle}</h2>
      <p style={pStyle}>{ct.versioningIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '策略' : 'Strategy'}</th>
              <th style={thStyle}>Changesets</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '固定版本' : 'Fixed Versioning', isZh ? '支持（可配置）' : 'Supported (configurable)', '✓ Default'],
              [isZh ? '独立版本' : 'Independent Versioning', '✓', '✓'],
              [isZh ? '自动依赖更新' : 'Auto Dep Updates', '✓', '✓'],
              [isZh ? '版本协调' : 'Version Coordination', isZh ? '基于 changeset' : 'Changeset-based', isZh ? '基于 git 提交' : 'Git commit-based'],
              [isZh ? '预发布支持' : 'Prerelease Support', '✓', '✓'],
            ].map(([feature, changesets, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{changesets}</td>
                <td style={tdStyle}>{lerna}</td>
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
              <th style={thStyle}>Changesets</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '变更文档' : 'Change Documentation', isZh ? 'changeset 文件' : 'Changeset files', isZh ? '提交消息' : 'Commit messages'],
              [isZh ? '版本管理' : 'Versioning', '✓', '✓'],
              [isZh ? '包发布' : 'Publishing', isZh ? '通过 npm' : 'Via npm', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Changelog 生成' : 'Changelog Generation', '✓ Markdown', '✓ Conventional'],
              [isZh ? 'CI 集成' : 'CI Integration', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '依赖图处理' : 'Dep Graph Handling', '✓', '✓'],
              [isZh ? 'Git 标签' : 'Git Tags', '✓', '✓'],
              [isZh ? '发布分支' : 'Release Branches', '✓', '✓'],
              [isZh ? '多包协调' : 'Multi-package Coordination', '✓', '✓'],
              [isZh ? '可扩展性' : 'Extensibility', isZh ? '高' : 'High', isZh ? '中等' : 'Medium'],
            ].map(([feature, changesets, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{changesets}</td>
                <td style={tdStyle}>{lerna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.changesetsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Install Changesets
pnpm add -D @changesets/cli
pnpm changeset init

# .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}

# During development - create a changeset
pnpm changeset
# This prompts:
# - Which packages changed?
# - What type of change? (major/minor/patch)
# - Describe the change for changelog

# Example generated changeset file:
# .changeset/cool-feature-abc123.md
---
"@my-org/ui": minor
"@my-org/core": patch
---

Add new Button component with variants

# After PR merge, version packages
pnpm changeset version

# This updates:
# - Package versions in package.json
# - CHANGELOG.md files
# - Internal dependencies

# Publish to npm
pnpm changeset publish

# CI Automation (GitHub Actions)
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'
      
      - run: pnpm install --frozen-lockfile
      
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
          version: pnpm changeset version
          commit: "chore: update versions"
          title: "chore: update versions"
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.lernaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Install Lerna
pnpm add -D lerna
pnpm lerna init

# lerna.json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "1.0.0",
  "packages": ["packages/*"],
  "npmClient": "pnpm",
  "command": {
    "version": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    },
    "publish": {
      "registry": "https://registry.npmjs.org"
    }
  }
}

# Fixed mode - all packages same version
# lerna.json: "version": "1.0.0"

# Independent mode - each package own version
# lerna.json: "version": "independent"

# Version packages (based on commits)
npx lerna version

# This prompts for:
# - Select version bump type
# - Confirm changes
# Then updates:
# - Package versions
# - CHANGELOG.md (if conventional commits)
# - Git tags

# Publish to npm
npx lerna publish from-package

# Or version + publish in one command
npx lerna publish

# CI Automation (GitHub Actions)
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'
      
      - run: pnpm install --frozen-lockfile
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - run: npx lerna version --yes
      - run: npx lerna publish from-package --yes
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`}</code></pre>

      {/* CI/CD */}
      <h2 style={h2Style}>{ct.ciTitle}</h2>
      <p style={pStyle}>{ct.ciIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>Changesets</th>
              <th style={thStyle}>Lerna</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动 PR 创建' : 'Auto PR Creation', '✓', '-'],
              [isZh ? '版本 PR' : 'Version PR', '✓', '-'],
              [isZh ? '自动发布' : 'Auto Publish', '✓', '✓'],
              [isZh ? 'Git 集成' : 'Git Integration', '✓', '✓'],
              [isZh ? 'GitHub Release' : 'GitHub Release', '✓', '✓'],
              [isZh ? '变更可见性' : 'Change Visibility', isZh ? 'PR 中可见' : 'Visible in PR', isZh ? '发布时可见' : 'Visible at release'],
            ].map(([feature, changesets, lerna], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{changesets}</td>
                <td style={tdStyle}>{lerna}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.changesetsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要详细变更文档' : 'Need detailed change documentation'}</li>
            <li>{isZh ? 'CI/CD 自动化优先' : 'CI/CD automation priority'}</li>
            <li>{isZh ? '多包协调发布' : 'Multi-package coordinated releases'}</li>
            <li>{isZh ? '团队协作审查变更' : 'Team reviews changes together'}</li>
            <li>{isZh ? '需要版本 PR' : 'Need version PRs'}</li>
            <li>{isZh ? '现代 monorepo 栈' : 'Modern monorepo stack'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.lernaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '简单发布工作流' : 'Simple release workflow'}</li>
            <li>{isZh ? '已有 Lerna 项目' : 'Existing Lerna projects'}</li>
            <li>{isZh ? '固定版本需求' : 'Fixed versioning needs'}</li>
            <li>{isZh ? '小型团队' : 'Small teams'}</li>
            <li>{isZh ? '一体化解决方案' : 'All-in-one solution'}</li>
            <li>{isZh ? '快速上手' : 'Quick setup'}</li>
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
