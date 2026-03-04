'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Snyk vs Dependabot vs Renovate: Dependency Security Scanner Comparison',
    intro: 'Snyk, Dependabot, and Renovate are three leading tools for automated dependency management and security scanning. While all help keep dependencies up-to-date and secure, they differ in features, pricing, and integration approaches. This comparison examines their capabilities to help you choose the right tool for your workflow.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Snyk offers the most comprehensive security features with SCA, SAST, and container scanning. Dependabot is free and deeply integrated with GitHub. Renovate provides the most flexible configuration and supports the most platforms. Choose Snyk for enterprise security, Dependabot for GitHub simplicity, and Renovate for customization and multi-platform support.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Snyk has the most comprehensive security database and vulnerability detection',
    takeaway2: 'Dependabot is free and native to GitHub with zero configuration needed',
    takeaway3: 'Renovate supports 50+ platforms and offers extensive customization',
    takeaway4: 'Snyk provides security beyond dependencies (code, containers, IaC)',
    takeaway5: 'Dependabot has the best GitHub integration but limited platform support',
    takeaway6: 'Renovate is open-source with self-hosted and managed options',
    
    whatIsSnykTitle: 'What is Snyk?',
    whatIsSnykContent: 'Snyk is a developer security platform founded in 2015. It offers Software Composition Analysis (SCA), Static Application Security Testing (SAST), container security, and Infrastructure as Code (IaC) scanning. Snyk maintains its own vulnerability database and provides real-time monitoring. It integrates with CI/CD pipelines, IDEs, and cloud platforms.',
    
    whatIsDependabotTitle: 'What is Dependabot?',
    whatIsDependotContent: 'Dependabot is GitHub native dependency management tool, acquired by GitHub in 2019. It automatically creates pull requests to update dependencies and security alerts for vulnerable packages. Dependabot is free for all GitHub repositories and requires minimal configuration. It supports major package managers and provides automated security fixes.',
    
    whatIsRenovateTitle: 'What is Renovate?',
    whatIsRenovateContent: 'Renovate is an open-source dependency update tool created in 2017. It supports over 50 platforms including GitHub, GitLab, Bitbucket, and Azure DevOps. Renovate offers extensive customization through configuration files, supports monorepos, and can be self-hosted or used as a managed service (Mend Renovate). It creates automated PRs for dependency updates.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'How to configure each tool:',
    
    snykExampleTitle: 'Snyk Configuration',
    dependabotExampleTitle: 'Dependabot Configuration',
    renovateExampleTitle: 'Renovate Configuration',
    
    securityTitle: 'Security Features',
    securityIntro: 'Security scanning capabilities:',
    
    useCasesTitle: 'Best Use Cases',
    snykBestFor: 'Snyk is Best For:',
    dependabotBestFor: 'Dependabot is Best For:',
    renovateBestFor: 'Renovate is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Each tool serves different needs: Snyk for comprehensive security across the SDLC, Dependabot for effortless GitHub integration, and Renovate for flexible, multi-platform dependency management. Many organizations use multiple tools: Snyk for security scanning, Renovate for dependency updates, and Dependabot for GitHub-native projects. Your choice depends on platform, security requirements, and customization needs.',
    
    faq1q: 'Which tool has the best free tier?',
    faq1a: 'Dependabot is completely free for GitHub repositories. Renovate is open-source and free when self-hosted. Snyk has a limited free tier (200 tests/month) that is good for small projects. For open-source projects, Snyk offers unlimited free usage.',
    
    faq2q: 'Which supports the most package managers?',
    faq2a: 'Renovate supports the most package managers (50+) including npm, pip, Maven, Docker, Helm, Terraform, and many more. Snyk supports major ecosystems with good coverage. Dependabot supports popular package managers but fewer than Renovate.',
    
    faq3q: 'Can I use multiple tools together?',
    faq3a: 'Yes, many organizations use Snyk for security scanning while using Dependabot or Renovate for dependency updates. This provides comprehensive coverage. You can also use Dependabot for GitHub repos and Renovate for GitLab/Bitbucket in the same organization.',
    
    faq4q: 'Which has the best CI/CD integration?',
    faq4a: 'Snyk has excellent CI/CD integration with plugins for Jenkins, GitHub Actions, GitLab CI, CircleCI, and more. Renovate can run in CI/CD pipelines. Dependabot runs on GitHub infrastructure and does not require CI/CD setup but integrates well with GitHub Actions.',
    
    faq5q: 'What about private package registries?',
    faq5a: 'All three support private registries. Snyk Enterprise supports extensive private registry configuration. Renovate has flexible private registry support through configuration. Dependabot supports private registries with GitHub secrets configuration.',
    
    faq6q: 'Which is best for monorepos?',
    faq6a: 'Renovate has the best monorepo support with workspace detection, grouped updates, and configurable strategies. Snyk supports monorepos in enterprise plans. Dependabot has basic monorepo support but is less flexible than Renovate.',
    
    faq7q: 'How accurate is vulnerability detection?',
    faq7a: 'Snyk has the most comprehensive vulnerability database with dedicated security research team. It may have more false positives due to broader coverage. Dependabot uses GitHub Security Advisory database. Renovate focuses on updates rather than security scanning.',
    
    faq8q: 'What about container and IaC scanning?',
    faq8a: 'Snyk offers comprehensive container image scanning and IaC (Terraform, CloudFormation, Kubernetes) security. Renovate can update Docker base images and IaC dependencies. Dependabot updates Docker base images in GitHub but has limited IaC support.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Snyk vs Dependabot vs Renovate：依赖安全扫描器对比',
    intro: 'Snyk、Dependabot 和 Renovate 是三个领先的自动化依赖管理和安全扫描工具。虽然它们都帮助保持依赖项更新和安全，但在功能、定价和集成方法上有所不同。本比较将考察它们的能力，帮助你为工作流程选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Snyk 提供最全面的安全功能，包括 SCA、SAST 和容器扫描。Dependabot 免费且与 GitHub 深度集成。Renovate 提供最灵活的配置并支持最多的平台。为企业安全选择 Snyk，为 GitHub 简单性选择 Dependabot，为定制和多平台支持选择 Renovate。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Snyk 拥有最全面的安全数据库和漏洞检测',
    takeaway2: 'Dependabot 免费且原生集成 GitHub，无需配置',
    takeaway3: 'Renovate 支持 50+ 平台并提供广泛定制',
    takeaway4: 'Snyk 提供超越依赖的安全功能（代码、容器、IaC）',
    takeaway5: 'Dependabot 有最好的 GitHub 集成但平台支持有限',
    takeaway6: 'Renovate 是开源的，提供自托管和托管选项',
    
    whatIsSnykTitle: '什么是 Snyk？',
    whatIsSnykContent: 'Snyk 是一个开发者安全平台，成立于 2015 年。它提供软件组成分析（SCA）、静态应用安全测试（SAST）、容器安全和基础设施即代码（IaC）扫描。Snyk 维护自己的漏洞数据库并提供实时监控。它与 CI/CD 管道、IDE 和云平台集成。',
    
    whatIsDependabotTitle: '什么是 Dependabot？',
    whatIsDependotContent: 'Dependabot 是 GitHub 原生依赖管理工具，于 2019 年被 GitHub 收购。它自动创建拉取请求以更新依赖项，并为易受攻击的包提供安全警报。Dependabot 对所有 GitHub 仓库免费，需要最少的配置。它支持主要的包管理器并提供自动安全修复。',
    
    whatIsRenovateTitle: '什么是 Renovate？',
    whatIsRenovateContent: 'Renovate 是一个开源依赖更新工具，创建于 2017 年。它支持超过 50 个平台，包括 GitHub、GitLab、Bitbucket 和 Azure DevOps。Renovate 通过配置文件提供广泛定制，支持 monorepo，可以自托管或作为托管服务（Mend Renovate）使用。它为依赖更新创建自动化 PR。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '如何配置每个工具：',
    
    snykExampleTitle: 'Snyk 配置',
    dependabotExampleTitle: 'Dependabot 配置',
    renovateExampleTitle: 'Renovate 配置',
    
    securityTitle: '安全功能',
    securityIntro: '安全扫描能力：',
    
    useCasesTitle: '最佳用例',
    snykBestFor: 'Snyk 最适合：',
    dependabotBestFor: 'Dependabot 最适合：',
    renovateBestFor: 'Renovate 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: '每个工具服务于不同需求：Snyk 用于跨 SDLC 的全面安全，Dependabot 用于轻松的 GitHub 集成，Renovate 用于灵活的多平台依赖管理。许多组织使用多种工具：Snyk 用于安全扫描，Renovate 用于依赖更新，Dependabot 用于 GitHub 原生项目。选择取决于平台、安全要求和定制需求。',
    
    faq1q: '哪个工具有最好的免费层？',
    faq1a: 'Dependabot 对 GitHub 仓库完全免费。Renovate 是开源的，自托管时免费。Snyk 有有限的免费层（200 次测试/月），适合小项目。对于开源项目，Snyk 提供无限免费使用。',
    
    faq2q: '哪个支持最多的包管理器？',
    faq2a: 'Renovate 支持最多的包管理器（50+），包括 npm、pip、Maven、Docker、Helm、Terraform 等。Snyk 支持主要生态系统，覆盖良好。Dependabot 支持流行的包管理器但少于 Renovate。',
    
    faq3q: '我可以同时使用多个工具吗？',
    faq3a: '是的，许多组织使用 Snyk 进行安全扫描，同时使用 Dependabot 或 Renovate 进行依赖更新。这提供了全面的覆盖。你还可以在同一组织中为 GitHub 仓库使用 Dependabot，为 GitLab/Bitbucket 使用 Renovate。',
    
    faq4q: '哪个有最好的 CI/CD 集成？',
    faq4a: 'Snyk 有出色的 CI/CD 集成，提供 Jenkins、GitHub Actions、GitLab CI、CircleCI 等插件。Renovate 可以在 CI/CD 管道中运行。Dependabot 在 GitHub 基础设施上运行，不需要 CI/CD 设置，但与 GitHub Actions 集成良好。',
    
    faq5q: '私有包注册表怎么样？',
    faq5a: '三者都支持私有注册表。Snyk Enterprise 支持广泛的私有注册表配置。Renovate 通过配置具有灵活的私有注册表支持。Dependabot 通过 GitHub secrets 配置支持私有注册表。',
    
    faq6q: '哪个最适合 monorepo？',
    faq6a: 'Renovate 有最好的 monorepo 支持，具有工作区检测、分组更新和可配置策略。Snyk 在企业计划中支持 monorepo。Dependabot 有基本的 monorepo 支持但不如 Renovate 灵活。',
    
    faq7q: '漏洞检测有多准确？',
    faq7a: 'Snyk 拥有最全面的漏洞数据库，有专门的安全研究团队。由于覆盖范围更广，可能有更多误报。Dependabot 使用 GitHub Security Advisory 数据库。Renovate 专注于更新而不是安全扫描。',
    
    faq8q: '容器和 IaC 扫描怎么样？',
    faq8a: 'Snyk 提供全面的容器镜像扫描和 IaC（Terraform、CloudFormation、Kubernetes）安全。Renovate 可以更新 Docker 基础镜像和 IaC 依赖。Dependabot 在 GitHub 中更新 Docker 基础镜像但 IaC 支持有限。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SnykVsDependabotVsRenovate({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSnykTitle}</h3>
      <p style={pStyle}>{ct.whatIsSnykContent}</p>

      <h3 style={h3Style}>{ct.whatIsDependabotTitle}</h3>
      <p style={pStyle}>{ct.whatIsDependotContent}</p>

      <h3 style={h3Style}>{ct.whatIsRenovateTitle}</h3>
      <p style={pStyle}>{ct.whatIsRenovateContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Snyk</th>
              <th style={thStyle}>Dependabot</th>
              <th style={thStyle}>Renovate</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开源' : 'Open Source', isZh ? '有限' : 'Limited', '✅', '✅'],
              [isZh ? '免费层' : 'Free Tier', '200 测试/月', isZh ? '完全免费' : 'Fully free', isZh ? '自托管免费' : 'Free self-hosted'],
              [isZh ? '平台支持' : 'Platform Support', isZh ? '主要平台' : 'Major platforms', 'GitHub only', '50+ 平台'],
              [isZh ? '安全数据库' : 'Security DB', isZh ? '专有数据库' : 'Proprietary DB', 'GitHub Advisory', isZh ? '使用多个源' : 'Uses multiple sources'],
              [isZh ? '配置复杂度' : 'Config Complexity', isZh ? '中等' : 'Medium', isZh ? '低' : 'Low', isZh ? '高' : 'High'],
              [isZh ? 'CI/CD 集成' : 'CI/CD Integration', isZh ? '优秀' : 'Excellent', isZh ? 'GitHub 原生' : 'GitHub native', isZh ? '灵活' : 'Flexible'],
              [isZh ? 'Monorepo 支持' : 'Monorepo Support', isZh ? '企业版' : 'Enterprise', isZh ? '基础' : 'Basic', isZh ? '优秀' : 'Excellent'],
            ].map(([feature, snyk, dependabot, renovate], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{snyk}</td>
                <td style={tdStyle}>{dependabot}</td>
                <td style={tdStyle}>{renovate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#7c3aed' }}>{ct.snykExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
snyk test

# Monitor and get alerts
snyk monitor

# Snyk configuration file (.snyk)
{
  "patch": {
    "npm:lodash:20180130": true
  },
  "ignore": {
    "npm:express:20180129": {
      "reason": "No fix available",
      "expires": "2024-12-31T00:00:00.000Z"
    }
  }
}

# Snyk in GitHub Actions
name: Snyk Security
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: $\\u0060{{ secrets.SNYK_TOKEN }}\\u0060
        with:
          args: --severity-threshold=high

# Snyk Docker scanning
snyk container test node:18-alpine

# Snyk IaC scanning
snyk iac test terraform/`}</code></pre>

      <h3 style={{ ...h3Style, color: '#0366d6' }}>{ct.dependabotExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Dependabot configuration (.github/dependabot.yml)
version: 2
updates:
  # Enable version updates for npm
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "your-team"
    labels:
      - "dependencies"
      - "automated"
    commit-message:
      prefix: "chore"
      include: "scope"
    
  # Enable for Docker
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
    
  # Enable for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    
  # Monorepo configuration
  - package-ecosystem: "npm"
    directory: "/packages/frontend"
    schedule:
      interval: "weekly"
  - package-ecosystem: "npm"
    directory: "/packages/backend"
    schedule:
      interval: "weekly"

# Dependabot security updates are enabled by default
# when vulnerability alerts are enabled in repo settings

# Dependabot automerge (using GitHub Actions)
name: Dependabot Auto-Merge
on: pull_request
permissions:
  contents: write
  pull-requests: write
jobs:
  automerge:
    if: github.actor == 'dependabot[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: Dependabot metadata
        id: metadata
        uses: dependabot/fetch-metadata@v1
      - name: Enable auto-merge
        if: steps.metadata.outputs.update-type == 'version-update:semver-patch'
        run: gh pr merge --auto --merge "$\\u0060{{ github.event.pull_request.html_url }}\\u0060"
        env:
          GH_TOKEN: $\\u0060{{ secrets.GITHUB_TOKEN }}\\u0060`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00a4ef' }}>{ct.renovateExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Renovate configuration (renovate.json)
{
  "extends": [
    "config:base"
  ],
  "schedule": ["every monday"],
  "timezone": "America/New_York",
  "labels": ["dependencies"],
  "reviewers": ["your-team"],
  "prConcurrentLimit": 10,
  "prHourlyLimit": 0,
  
  // Group all non-major updates
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "minor"],
      "groupName": "non-major dependencies",
      "groupSlug": "all-minor-patch"
    },
    {
      "matchPackagePatterns": ["eslint", "prettier"],
      "groupName": "linting"
    },
    {
      "matchPackagePatterns": ["^@types/"],
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": true
    }
  ],
  
  // Automerge patch updates
  "automerge": false,
  "automergeType": "pr",
  "automergeStrategy": "merge-commit",
  
  // Docker configuration
  "docker": {
    "enabled": true,
    "pinDigests": true
  },
  
  // Monorepo support
  "workarounds": {
    "workspaces": {
      "enabled": true
    }
  }
}

// Self-hosted Renovate (config.js)
module.exports = {
  platform: 'github',
  token: process.env.RENOVATE_TOKEN,
  automerge: true,
  repositories: ['org/repo1', 'org/repo2'],
  onboarding: false,
  requireConfig: true
};

// Renovate in GitLab CI
renovate:
  image: renovate/renovate:latest
  script:
    - renovate --platform gitlab --token $RENOVATE_TOKEN
  only:
    - schedules`}</code></pre>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Snyk</th>
              <th style={thStyle}>Dependabot</th>
              <th style={thStyle}>Renovate</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '依赖扫描' : 'Dependency Scanning', '✅', '✅', isZh ? '更新为主' : 'Update-focused'],
              [isZh ? '代码扫描' : 'Code Scanning', '✅', '❌', '❌'],
              [isZh ? '容器扫描' : 'Container Scanning', '✅', isZh ? '基础镜像' : 'Base images', isZh ? '基础镜像' : 'Base images'],
              [isZh ? 'IaC 扫描' : 'IaC Scanning', '✅', isZh ? '有限' : 'Limited', '❌'],
              [isZh ? '实时监控' : 'Real-time Monitoring', '✅', '❌', '❌'],
              [isZh ? '修复建议' : 'Fix Suggestions', '✅', '✅', '✅'],
            ].map(([cap, snyk, dependabot, renovate], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{snyk}</td>
                <td style={tdStyle}>{dependabot}</td>
                <td style={tdStyle}>{renovate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #7c3aed' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#7c3aed' }}>{ct.snykBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级安全' : 'Enterprise security'}</li>
            <li>{isZh ? '全面安全扫描' : 'Comprehensive scanning'}</li>
            <li>{isZh ? '容器安全' : 'Container security'}</li>
            <li>{isZh ? '合规要求' : 'Compliance requirements'}</li>
            <li>{isZh ? '安全团队' : 'Security teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #0366d6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#0366d6' }}>{ct.dependabotBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'GitHub 项目' : 'GitHub projects'}</li>
            <li>{isZh ? '开源项目' : 'Open-source projects'}</li>
            <li>{isZh ? '快速设置' : 'Quick setup'}</li>
            <li>{isZh ? '小团队' : 'Small teams'}</li>
            <li>{isZh ? '零配置需求' : 'Zero-config needed'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00a4ef' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00a4ef' }}>{ct.renovateBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多平台环境' : 'Multi-platform environments'}</li>
            <li>{isZh ? '需要定制化' : 'Customization needed'}</li>
            <li>{isZh ? 'Monorepo 项目' : 'Monorepo projects'}</li>
            <li>{isZh ? '自托管需求' : 'Self-hosting required'}</li>
            <li>{isZh ? '复杂依赖策略' : 'Complex dependency strategies'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a>
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
