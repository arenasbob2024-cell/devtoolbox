'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Changesets vs Semantic Release: Version Management Tools Comparison',
    intro: 'Changesets and Semantic Release are two popular tools for automating version management and package publishing in JavaScript/TypeScript projects. Both follow semantic versioning but take different approaches to determining versions and generating changelogs. This comparison examines their workflows, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Changesets for monorepos, manual version control, and multi-package workflows. Choose Semantic Release for fully automated releases, CI/CD integration, and single-package projects. Changesets offers more control over versioning decisions, while Semantic Release emphasizes complete automation.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Changesets provides manual control over version bumps and changelog',
    takeaway2: 'Semantic Release offers fully automated versioning from commits',
    takeaway3: 'Changesets excels in monorepo and multi-package scenarios',
    takeaway4: 'Semantic Release requires conventional commit discipline',
    takeaway5: 'Changesets has better GitHub integration with status checks',
    takeaway6: 'Semantic Release has extensive plugin ecosystem',
    
    whatIsChangesetsTitle: 'What is Changesets?',
    whatIsChangesetsContent: 'Changesets is a tool for managing versions and changelogs with a focus on multi-package repositories. Developed by the Changesets team (formerly Atlassian), it uses a workflow where contributors add "changeset" files describing their changes. These are consumed during release to determine version bumps and generate changelogs.',
    
    whatIsSemanticReleaseTitle: 'What is Semantic Release?',
    whatIsSemanticReleaseContent: 'Semantic Release is a tool that automates the whole package release workflow including determining the next version number, generating the release notes, and publishing the package. It uses commit messages to determine the type of changes and automatically bumps versions following the Semantic Versioning specification.',
    
    workflowTitle: 'Workflow Comparison',
    workflowIntro: 'How each tool approaches version management:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Setup and configuration:',
    
    changesetsExampleTitle: 'Changesets Config',
    semanticReleaseExampleTitle: 'Semantic Release Config',
    
    ciCdTitle: 'CI/CD Integration',
    ciCdIntro: 'Continuous integration capabilities:',
    
    monorepoTitle: 'Monorepo Support',
    monorepoIntro: 'Multi-package repository support:',
    
    useCasesTitle: 'Best Use Cases',
    changesetsBestFor: 'Changesets is Best For:',
    semanticReleaseBestFor: 'Semantic Release is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Changesets and Semantic Release serve different philosophies in version management. Changesets provides a human-in-the-loop approach ideal for monorepos and teams wanting control over releases. Semantic Release offers complete automation for teams committed to conventional commits. Choose Changesets for multi-package repos and controlled releases; choose Semantic Release for automated single-package workflows.',
    
    faq1q: 'Can I use Changesets for a single package?',
    faq1a: 'Yes, Changesets works well for single packages too. While it excels in monorepos, the changeset workflow of documenting changes and controlled releases is beneficial for any project size.',
    
    faq2q: 'Does Semantic Release work with monorepos?',
    faq2a: 'Semantic Release can work with monorepos but requires additional configuration and plugins. Changesets is designed specifically for monorepos and handles multi-package versioning more naturally.',
    
    faq3q: 'Which tool requires more setup?',
    faq3a: 'Semantic Release typically requires more initial setup with plugins, CI configuration, and commit conventions. Changesets has simpler setup but requires ongoing changeset management from contributors.',
    
    faq4q: 'What about conventional commits?',
    faq4a: 'Semantic Release relies entirely on conventional commits for version determination. Changesets is agnostic to commit format since versioning is determined by changeset files. Both can work with conventional commits.',
    
    faq5q: 'How do they handle changelogs?',
    faq5a: 'Both generate changelogs. Semantic Release generates them from commit messages. Changesets generates them from the summary field in changeset files, often resulting in more user-friendly release notes.',
    
    faq6q: 'Can I preview releases before publishing?',
    faq6a: 'Changesets has a "version" command that shows what will change before publishing. Semantic Release is more automated but has a dry-run mode. Changesets provides more control over the release moment.',
    
    faq7q: 'What CI platforms are supported?',
    faq7a: 'Both work with any CI platform. Semantic Release has dedicated plugins for GitHub Actions, GitLab CI, CircleCI, etc. Changesets has a GitHub Action and works with any CI that can run npm scripts.',
    
    faq8q: 'Which is better for open source?',
    faq8a: 'Both work well for open source. Changesets makes it easy for external contributors to document their changes via changeset files. Semantic Release requires contributors to follow commit conventions but automates everything once configured.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Changesets vs Semantic Release：版本管理工具对比',
    intro: 'Changesets和Semantic Release是两个流行的JavaScript/TypeScript项目版本管理和包发布自动化工具。两者都遵循语义版本控制，但采用不同的方法确定版本和生成变更日志。本比较考察它们的工作流、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为monorepo、手动版本控制和多包工作流选择Changesets。为完全自动化发布、CI/CD集成和单包项目选择Semantic Release。Changesets提供更多版本决策控制，而Semantic Release强调完全自动化。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Changesets提供手动控制版本升级和变更日志',
    takeaway2: 'Semantic Release从提交提供完全自动化版本管理',
    takeaway3: 'Changesets在monorepo和多包场景中出色',
    takeaway4: 'Semantic Release需要约定式提交纪律',
    takeaway5: 'Changesets有更好的GitHub集成和状态检查',
    takeaway6: 'Semantic Release有丰富的插件生态系统',
    
    whatIsChangesetsTitle: '什么是Changesets？',
    whatIsChangesetsContent: 'Changesets是一个专注于多包存储库的版本和变更日志管理工具。由Changesets团队（前Atlassian）开发，它使用一种工作流，贡献者添加描述其更改的"changeset"文件。这些文件在发布时被消费以确定版本升级和生成变更日志。',
    
    whatIsSemanticReleaseTitle: '什么是Semantic Release？',
    whatIsSemanticReleaseContent: 'Semantic Release是一个自动化整个包发布工作流的工具，包括确定下一个版本号、生成发布说明和发布包。它使用提交消息确定更改类型，并按照语义版本规范自动升级版本。',
    
    workflowTitle: '工作流对比',
    workflowIntro: '每个工具如何处理版本管理：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '设置和配置：',
    
    changesetsExampleTitle: 'Changesets配置',
    semanticReleaseExampleTitle: 'Semantic Release配置',
    
    ciCdTitle: 'CI/CD集成',
    ciCdIntro: '持续集成能力：',
    
    monorepoTitle: 'Monorepo支持',
    monorepoIntro: '多包存储库支持：',
    
    useCasesTitle: '最佳用例',
    changesetsBestFor: 'Changesets最适合：',
    semanticReleaseBestFor: 'Semantic Release最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Changesets和Semantic Release在版本管理中服务于不同的理念。Changesets提供人在循环中的方法，非常适合monorepo和想要控制发布的团队。Semantic Release为致力于约定式提交的团队提供完全自动化。为多包存储库和受控发布选择Changesets；为自动化单包工作流选择Semantic Release。',
    
    faq1q: '我可以为单个包使用Changesets吗？',
    faq1a: '是的，Changesets也适用于单个包。虽然它在monorepo中表现出色，但记录更改和受控发布的changeset工作流对任何项目规模都有益。',
    
    faq2q: 'Semantic Release能与monorepo一起工作吗？',
    faq2a: 'Semantic Release可以与monorepo一起工作，但需要额外的配置和插件。Changesets专为monorepo设计，更自然地处理多包版本管理。',
    
    faq3q: '哪个工具需要更多设置？',
    faq3a: 'Semantic Release通常需要更多初始设置，包括插件、CI配置和提交约定。Changesets设置更简单，但需要贡献者持续管理changeset。',
    
    faq4q: '约定式提交怎么样？',
    faq4a: 'Semantic Release完全依赖约定式提交确定版本。Changesets对提交格式无关，因为版本由changeset文件确定。两者都可以与约定式提交一起工作。',
    
    faq5q: '它们如何处理变更日志？',
    faq5a: '两者都生成变更日志。Semantic Release从提交消息生成。Changesets从changeset文件中的摘要字段生成，通常产生更用户友好的发布说明。',
    
    faq6q: '我可以在发布前预览发布吗？',
    faq6a: 'Changesets有一个"version"命令，在发布前显示将更改的内容。Semantic Release更自动化，但有干运行模式。Changesets提供更多发布时刻的控制。',
    
    faq7q: '支持哪些CI平台？',
    faq7a: '两者都适用于任何CI平台。Semantic Release有GitHub Actions、GitLab CI、CircleCI等的专用插件。Changesets有GitHub Action，适用于任何可以运行npm脚本的CI。',
    
    faq8q: '哪个更适合开源？',
    faq8a: '两者都适合开源。Changesets使外部贡献者可以通过changeset文件轻松记录他们的更改。Semantic Release需要贡献者遵循提交约定，但一旦配置就自动化一切。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ChangesetsVsSemanticRelease({ lang }: { lang: string }) {
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

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsChangesetsTitle}</h3>
      <p style={pStyle}>{ct.whatIsChangesetsContent}</p>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.whatIsSemanticReleaseTitle}</h3>
      <p style={pStyle}>{ct.whatIsSemanticReleaseContent}</p>

      <h2 style={h2Style}>{ct.workflowTitle}</h2>
      <p style={pStyle}>{ct.workflowIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Changesets Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '1. 开发者添加changeset文件 → 2. PR合并时changeset保留 → 3. 运行version命令 → 4. 审核变更 → 5. 运行publish发布' : '1. Developer adds changeset file → 2. Changeset kept on merge → 3. Run version command → 4. Review changes → 5. Run publish'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>Semantic Release Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '1. 开发者使用约定式提交 → 2. 推送到主分支 → 3. CI自动分析提交 → 4. 自动确定版本 → 5. 自动发布' : '1. Developer uses conventional commits → 2. Push to main → 3. CI analyzes commits → 4. Auto determine version → 5. Auto publish'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Changesets</th>
              <th style={thStyle}>Semantic Release</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '版本策略' : 'Version Strategy', isZh ? '手动+自动化' : 'Manual + Automated', isZh ? '完全自动化' : 'Fully Automated'],
              [isZh ? 'Monorepo支持' : 'Monorepo Support', isZh ? '原生支持' : 'Native', isZh ? '需要插件' : 'Via plugins'],
              [isZh ? '变更日志' : 'Changelog', isZh ? '从changeset生成' : 'From changesets', isZh ? '从提交生成' : 'From commits'],
              [isZh ? '发布控制' : 'Release Control', isZh ? '高' : 'High', isZh ? '低' : 'Low'],
              [isZh ? 'CI/CD集成' : 'CI/CD Integration', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '有限' : 'Limited', isZh ? '丰富' : 'Extensive'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '中' : 'Medium', isZh ? '高' : 'High'],
              [isZh ? 'GitHub集成' : 'GitHub Integration', isZh ? '状态检查' : 'Status checks', isZh ? '发布注释' : 'Release notes'],
            ].map(([feature, changesets, semantic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{changesets}</td>
                <td style={tdStyle}>{semantic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.changesetsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH": {
    "updatePeerDependencies": true
  }
}

// Example changeset file (.changeset/cool-feature.md)
---
"my-package": minor
---

Add cool new feature that does amazing things

// package.json scripts
{
  "scripts": {
    "changeset": "changeset",
    "version": "changeset version",
    "release": "changeset publish"
  }
}

// GitHub Actions workflow
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run release
        env:
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#10b981' }}>{ct.semanticReleaseExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// .releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}

// package.json
{
  "scripts": {
    "semantic-release": "semantic-release"
  },
  "devDependencies": {
    "semantic-release": "^22.0.0",
    "@semantic-release/changelog": "^6.0.0",
    "@semantic-release/git": "^10.0.0"
  }
}

// GitHub Actions workflow
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}

// Conventional commit examples
// feat: add new feature        -> minor bump
// fix: resolve bug             -> patch bump
// feat!: breaking change       -> major bump
// fix(scope): bug in scope     -> patch bump`}</code></pre>

      <h2 style={h2Style}>{ct.ciCdTitle}</h2>
      <p style={pStyle}>{ct.ciCdIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Changesets</th>
              <th style={thStyle}>Semantic Release</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['GitHub Actions', isZh ? '官方Action' : 'Official Action', isZh ? '原生支持' : 'Native support'],
              ['GitLab CI', '\u2713', '\u2713'],
              ['CircleCI', '\u2713', '\u2713'],
              ['Travis CI', '\u2713', '\u2713'],
              ['Jenkins', '\u2713', '\u2713'],
            ].map(([platform, changesets, semantic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{changesets}</td>
                <td style={tdStyle}>{semantic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.monorepoTitle}</h2>
      <p style={pStyle}>{ct.monorepoIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Changesets Monorepo</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '原生支持多包版本管理，独立或同步版本，自动处理包间依赖，与Turborepo/Lerna集成良好。' : 'Native multi-package versioning, independent or synchronized versions, automatic inter-package dependency handling, integrates well with Turborepo/Lerna.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #10b981' }}>
          <strong style={{ color: '#10b981' }}>Semantic Release Monorepo</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要额外配置和插件，每个包需要单独配置，可以用多个配置文件或插件支持，设置更复杂但可以实现。' : 'Requires extra configuration and plugins, each package needs separate config, can use multiple config files or plugin support, more complex but achievable.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.changesetsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Monorepo项目' : 'Monorepo projects'}</li>
            <li>{isZh ? '多包发布' : 'Multi-package publishing'}</li>
            <li>{isZh ? '需要发布控制' : 'Need release control'}</li>
            <li>{isZh ? '外部贡献者' : 'External contributors'}</li>
            <li>{isZh ? 'UI组件库' : 'UI component libraries'}</li>
            <li>{isZh ? '灵活的版本策略' : 'Flexible versioning'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #10b981' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#10b981' }}>{ct.semanticReleaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '单包项目' : 'Single package projects'}</li>
            <li>{isZh ? '完全自动化' : 'Full automation'}</li>
            <li>{isZh ? '约定式提交团队' : 'Conventional commit teams'}</li>
            <li>{isZh ? '持续部署' : 'Continuous deployment'}</li>
            <li>{isZh ? '内部工具' : 'Internal tools'}</li>
            <li>{isZh ? '快速迭代' : 'Rapid iteration'}</li>
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
