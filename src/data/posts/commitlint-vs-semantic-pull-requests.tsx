'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Commitlint vs Semantic Pull Requests: Commit Convention Tools Comparison',
    intro: 'Commitlint and Semantic Pull Requests are two approaches to enforcing commit message conventions and semantic versioning in projects. Commitlint validates commit messages locally, while Semantic Pull Requests validates PR titles on GitHub. This comparison examines their workflows, integration options, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Commitlint for local validation, conventional commit enforcement, and integration with release automation. Choose Semantic Pull Requests for GitHub-based workflows, PR title validation, and changelog generation. Both can be used together for comprehensive coverage.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Commitlint validates commits locally before they are pushed',
    takeaway2: 'Semantic Pull Requests validates PR titles on GitHub',
    takeaway3: 'Commitlint works with Husky for pre-commit validation',
    takeaway4: 'Semantic Pull Requests is a GitHub App with zero config',
    takeaway5: 'Both support conventional commits specification',
    takeaway6: 'They can be combined for full coverage',
    
    whatIsCommitlintTitle: 'What is Commitlint?',
    whatIsCommitlintContent: 'Commitlint is a tool that checks if commit messages meet the conventional commit format. It runs locally as part of your development workflow, typically via Git hooks. Commitlint helps maintain consistent commit history and enables automated changelog generation and semantic versioning.',
    
    whatIsSemanticPullRequestsTitle: 'What is Semantic Pull Requests?',
    whatIsSemanticPullRequestsContent: 'Semantic Pull Requests is a GitHub App that validates PR titles against conventional commit standards. It checks PR titles before merging and can automatically generate release notes. It requires zero local configuration and works at the GitHub level.',
    
    workflowTitle: 'Workflow Comparison',
    workflowIntro: 'How each tool enforces conventions:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Setup and configuration:',
    
    commitlintExampleTitle: 'Commitlint Config',
    semanticPRExampleTitle: 'Semantic PR Config',
    
    integrationTitle: 'CI/CD Integration',
    integrationIntro: 'Integration capabilities:',
    
    rulesTitle: 'Rule Configuration',
    rulesIntro: 'Customization options:',
    
    useCasesTitle: 'Best Use Cases',
    commitlintBestFor: 'Commitlint is Best For:',
    semanticPRBestFor: 'Semantic Pull Requests is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Commitlint and Semantic Pull Requests serve complementary roles in commit convention enforcement. Commitlint provides local validation and deep customization, ideal for teams wanting control at the commit level. Semantic Pull Requests offers GitHub-native validation perfect for PR-based workflows. Using both together provides the most comprehensive coverage.',
    
    faq1q: 'Can I use both tools together?',
    faq1a: 'Yes, and this is often recommended. Use Commitlint for local commit validation during development, and Semantic Pull Requests to validate PR titles before merging. This provides coverage at both the commit and PR level.',
    
    faq2q: 'Which tool is easier to set up?',
    faq2a: 'Semantic Pull Requests is easier to set up as it requires only installing the GitHub App. Commitlint requires npm installation, configuration files, and Git hook setup. However, Commitlint offers more customization.',
    
    faq3q: 'Do they work with squash merges?',
    faq3a: 'Semantic Pull Requests works well with squash merges as it validates the PR title that becomes the squash commit message. Commitlint validates individual commits before they are pushed, so squash merge behavior depends on your workflow.',
    
    faq4q: 'What about other Git platforms?',
    faq4a: 'Commitlint works with any Git platform since it runs locally. Semantic Pull Requests is GitHub-specific. For GitLab or Bitbucket, Commitlint is the primary option, though similar tools exist for those platforms.',
    
    faq5q: 'Can I customize the commit format?',
    faq5a: 'Commitlint offers extensive customization through configuration files. You can define custom scopes, types, and rules. Semantic Pull Requests has limited customization, focusing on standard conventional commits.',
    
    faq6q: 'How do they handle auto-generated commits?',
    faq6a: 'Commitlint can be configured to skip validation for certain commit patterns or authors. Semantic Pull Requests can be configured to skip validation for certain branches or conditions via its settings.',
    
    faq7q: 'What about monorepos?',
    faq7a: 'Commitlint supports monorepos with scope-enum configuration and per-package rules. Semantic Pull Requests works at the repository level and does not have specific monorepo features but works fine in monorepo setups.',
    
    faq8q: 'Do they integrate with release tools?',
    faq8a: 'Both integrate well with semantic-release and Changesets. Commitlint ensures commit messages are parseable by release tools. Semantic Pull Requests PR titles feed into release notes when squash merging.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Commitlint vs Semantic Pull Requests：提交规范工具对比',
    intro: 'Commitlint和Semantic Pull Requests是两种在项目中强制执行提交消息约定和语义版本控制的方法。Commitlint在本地验证提交消息，而Semantic Pull Requests在GitHub上验证PR标题。本比较考察它们的工作流、集成选项和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为本地验证、约定式提交强制和发布自动化集成选择Commitlint。为基于GitHub的工作流、PR标题验证和变更日志生成选择Semantic Pull Requests。两者可以一起使用以获得全面覆盖。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Commitlint在推送前本地验证提交',
    takeaway2: 'Semantic Pull Requests在GitHub上验证PR标题',
    takeaway3: 'Commitlint与Husky配合进行预提交验证',
    takeaway4: 'Semantic Pull Requests是零配置的GitHub App',
    takeaway5: '两者都支持约定式提交规范',
    takeaway6: '它们可以组合使用获得完整覆盖',
    
    whatIsCommitlintTitle: '什么是Commitlint？',
    whatIsCommitlintContent: 'Commitlint是一个检查提交消息是否符合约定式提交格式的工具。它在本地作为开发工作流的一部分运行，通常通过Git hooks。Commitlint帮助维护一致的提交历史，并支持自动化变更日志生成和语义版本控制。',
    
    whatIsSemanticPullRequestsTitle: '什么是Semantic Pull Requests？',
    whatIsSemanticPullRequestsContent: 'Semantic Pull Requests是一个GitHub App，根据约定式提交标准验证PR标题。它在合并前检查PR标题，并可以自动生成发布说明。它需要零本地配置，在GitHub级别工作。',
    
    workflowTitle: '工作流对比',
    workflowIntro: '每个工具如何强制执行约定：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '设置和配置：',
    
    commitlintExampleTitle: 'Commitlint配置',
    semanticPRExampleTitle: 'Semantic PR配置',
    
    integrationTitle: 'CI/CD集成',
    integrationIntro: '集成能力：',
    
    rulesTitle: '规则配置',
    rulesIntro: '自定义选项：',
    
    useCasesTitle: '最佳用例',
    commitlintBestFor: 'Commitlint最适合：',
    semanticPRBestFor: 'Semantic Pull Requests最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Commitlint和Semantic Pull Requests在提交约定强制执行中扮演互补角色。Commitlint提供本地验证和深度自定义，非常适合想要在提交级别控制的团队。Semantic Pull Requests提供GitHub原生验证，完美适用于基于PR的工作流。同时使用两者提供最全面的覆盖。',
    
    faq1q: '我可以同时使用两个工具吗？',
    faq1a: '是的，这通常是推荐的。在开发期间使用Commitlint进行本地提交验证，在合并前使用Semantic Pull Requests验证PR标题。这在提交和PR级别都提供覆盖。',
    
    faq2q: '哪个工具更容易设置？',
    faq2a: 'Semantic Pull Requests更容易设置，因为它只需要安装GitHub App。Commitlint需要npm安装、配置文件和Git hook设置。然而，Commitlint提供更多自定义。',
    
    faq3q: '它们能与squash合并一起工作吗？',
    faq3a: 'Semantic Pull Requests与squash合并配合良好，因为它验证成为squash提交消息的PR标题。Commitlint在推送前验证单个提交，因此squash合并行为取决于你的工作流。',
    
    faq4q: '其他Git平台怎么样？',
    faq4a: 'Commitlint适用于任何Git平台，因为它在本地运行。Semantic Pull Requests是GitHub专用的。对于GitLab或Bitbucket，Commitlint是主要选项，尽管这些平台存在类似的工具。',
    
    faq5q: '我可以自定义提交格式吗？',
    faq5a: 'Commitlint通过配置文件提供广泛的自定义。你可以定义自定义范围、类型和规则。Semantic Pull Requests自定义有限，专注于标准约定式提交。',
    
    faq6q: '它们如何处理自动生成的提交？',
    faq6a: 'Commitlint可以配置为跳过某些提交模式或作者的验证。Semantic Pull Requests可以通过其设置配置为跳过某些分支或条件的验证。',
    
    faq7q: 'Monorepo怎么样？',
    faq7a: 'Commitlint通过scope-enum配置和每包规则支持monorepo。Semantic Pull Requests在存储库级别工作，没有特定的monorepo功能，但在monorepo设置中工作良好。',
    
    faq8q: '它们与发布工具集成吗？',
    faq8a: '两者都与semantic-release和Changesets良好集成。Commitlint确保提交消息可被发布工具解析。Semantic Pull Requests PR标题在squash合并时进入发布说明。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CommitlintVsSemanticPR({ lang }: { lang: string }) {
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

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.whatIsCommitlintTitle}</h3>
      <p style={pStyle}>{ct.whatIsCommitlintContent}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsSemanticPullRequestsTitle}</h3>
      <p style={pStyle}>{ct.whatIsSemanticPullRequestsContent}</p>

      <h2 style={h2Style}>{ct.workflowTitle}</h2>
      <p style={pStyle}>{ct.workflowIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Commitlint Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '1. 开发者编写提交 → 2. Git hook触发Commitlint → 3. 验证提交消息格式 → 4. 通过/拒绝提交 → 5. 推送到远程' : '1. Developer writes commit → 2. Git hook triggers Commitlint → 3. Validates message format → 4. Pass/reject commit → 5. Push to remote'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Semantic PR Workflow</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '1. 创建PR → 2. GitHub App检查PR标题 → 3. 显示验证状态 → 4. 合并前必须通过 → 5. 可选自动发布说明' : '1. Create PR → 2. GitHub App checks PR title → 3. Shows validation status → 4. Must pass before merge → 5. Optional auto release notes'}
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
              <th style={thStyle}>Commitlint</th>
              <th style={thStyle}>Semantic PR</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '验证位置' : 'Validation Location', isZh ? '本地' : 'Local', 'GitHub'],
              [isZh ? '配置方式' : 'Configuration', isZh ? '配置文件' : 'Config files', isZh ? 'GitHub设置' : 'GitHub settings'],
              [isZh ? 'Git平台' : 'Git Platform', isZh ? '所有' : 'All', 'GitHub only'],
              [isZh ? '自定义规则' : 'Custom Rules', isZh ? '广泛' : 'Extensive', isZh ? '有限' : 'Limited'],
              [isZh ? '本地开发' : 'Local Dev', '\u2713', '-'],
              [isZh ? 'PR验证' : 'PR Validation', '-', '\u2713'],
              [isZh ? '需要安装' : 'Installation Required', 'npm包', 'GitHub App'],
              [isZh ? '零配置' : 'Zero Config', '-', '\u2713'],
            ].map(([feature, commitlint, semantic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{commitlint}</td>
                <td style={tdStyle}>{semantic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.commitlintExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'scope-enum': [
      2,
      'always',
      ['core', 'ui', 'api', 'docs', 'cli']
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 100]
  }
};

// package.json
{
  "devDependencies": {
    "@commitlint/cli": "^18.0.0",
    "@commitlint/config-conventional": "^18.0.0"
  }
}

// .husky/commit-msg (with Husky)
npx --no -- commitlint --edit "$1"

// Valid commit examples
// feat(ui): add dark mode toggle
// fix(api): resolve timeout issue
// docs: update installation guide
// refactor(core)!: change API interface

// Invalid commit examples (will be rejected)
// Added new feature
// fix bug
// FEAT: something new`}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.semanticPRExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// No local config file needed!
// Install from GitHub Marketplace:
// https://github.com/apps/semantic-pull-requests

// Repository Settings (via GitHub UI)
// .github/semantic.yml (optional)
titleOnly: true
types:
  - feat
  - fix
  - docs
  - style
  - refactor
  - perf
  - test
  - build
  - ci
  - chore
  - revert
scopes:
  - core
  - ui
  - api
  - cli
requireScope: false

// Alternative minimal config
// .github/semantic.yml
enabled: true
titleOnly: true

// Valid PR titles
// feat: Add user authentication
// fix(ui): Resolve button alignment
// docs: Update API documentation
// refactor(core)!: Breaking API change

// The GitHub App will:
// - Check PR title on creation/update
// - Show status check (pass/fail)
// - Block merge if invalid (when configured)
// - Generate release notes (optional)

// Branch protection rule
// Configure in GitHub Settings > Branches
// Require status check: "semantic-pull-requests"`}</code></pre>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成' : 'Integration'}</th>
              <th style={thStyle}>Commitlint</th>
              <th style={thStyle}>Semantic PR</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Husky', '\u2713', 'N/A'],
              ['GitHub Actions', '\u2713', '\u2713'],
              ['GitLab CI', '\u2713', '-'],
              ['CircleCI', '\u2713', '-'],
              ['semantic-release', '\u2713', '\u2713'],
              ['Changesets', '\u2713', '\u2713'],
            ].map(([integration, commitlint, semantic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{integration}</td>
                <td style={tdStyle}>{commitlint}</td>
                <td style={tdStyle}>{semantic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.rulesTitle}</h2>
      <p style={pStyle}>{ct.rulesIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Commitlint Rules</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持所有Conventional Commits规则，可自定义类型、范围、主体大小写、标题长度、正文格式等。支持共享配置和插件扩展。' : 'Supports all Conventional Commits rules, customizable types, scopes, subject case, header length, body format, etc. Supports shared configs and plugin extensions.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Semantic PR Rules</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '基本配置选项：启用/禁用、自定义类型、自定义范围、是否需要范围、仅标题验证。配置通过YAML文件或GitHub设置。' : 'Basic options: enable/disable, custom types, custom scopes, require scope, title-only validation. Configuration via YAML file or GitHub settings.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.commitlintBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '本地开发验证' : 'Local dev validation'}</li>
            <li>{isZh ? '自定义规则需求' : 'Custom rules needs'}</li>
            <li>{isZh ? '非GitHub平台' : 'Non-GitHub platforms'}</li>
            <li>{isZh ? '详细规则控制' : 'Detailed rule control'}</li>
            <li>{isZh ? '与Husky集成' : 'Husky integration'}</li>
            <li>{isZh ? '企业级控制' : 'Enterprise control'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.semanticPRBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitHub工作流' : 'GitHub workflows'}</li>
            <li>{isZh ? '零配置需求' : 'Zero config needs'}</li>
            <li>{isZh ? 'PR驱动开发' : 'PR-driven development'}</li>
            <li>{isZh ? 'Squash合并' : 'Squash merging'}</li>
            <li>{isZh ? '快速设置' : 'Quick setup'}</li>
            <li>{isZh ? '团队一致性' : 'Team consistency'}</li>
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
