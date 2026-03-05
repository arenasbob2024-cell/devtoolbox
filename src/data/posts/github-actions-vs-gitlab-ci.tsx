'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GitHub Actions vs GitLab CI: CI/CD Platform Comparison',
    intro: 'GitHub Actions and GitLab CI are two leading CI/CD platforms integrated into popular version control systems. GitHub Actions provides native CI/CD within GitHub, while GitLab CI offers comprehensive DevOps capabilities. This comparison examines their features, workflows, and ideal use cases for modern software development.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose GitHub Actions for seamless GitHub integration, marketplace ecosystem, and simple YAML-based workflows. Choose GitLab CI for built-in DevOps platform, advanced features like auto DevOps, and self-hosted options. Both support Docker, matrix builds, and extensive integrations, but GitLab CI offers more built-in features while GitHub Actions excels in marketplace extensibility.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'GitHub Actions integrates natively with GitHub; GitLab CI with GitLab',
    takeaway2: 'Both use YAML configuration with similar syntax',
    takeaway3: 'GitLab CI has more built-in features; GitHub Actions has larger marketplace',
    takeaway4: 'GitHub Actions offers better third-party integrations via marketplace',
    takeaway5: 'GitLab CI includes auto DevOps and built-in security scanning',
    takeaway6: 'Both support self-hosted runners for on-premise execution',
    
    whatIsGitHubActionsTitle: 'What is GitHub Actions?',
    whatIsGitHubActionsContent: 'GitHub Actions is a CI/CD service integrated directly into GitHub. Released in 2018, it automates software workflows directly from GitHub repositories. Actions uses YAML files to define workflows and provides a marketplace with thousands of pre-built actions. It supports matrix builds, multi-environment deployments, and integrates seamlessly with the GitHub ecosystem.',
    
    whatIsGitLabCITitle: 'What is GitLab CI?',
    whatIsGitLabCITitle: 'GitLab CI is a continuous integration and delivery tool built into GitLab. Launched in 2015, it provides a complete DevOps lifecycle including planning, creation, verification, packaging, release, configuration, and monitoring. GitLab CI uses YAML configuration and includes features like Auto DevOps, built-in container registry, and security scanning.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core CI/CD capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Pipeline and workflow configuration:',
    
    githubActionsExampleTitle: 'GitHub Actions Workflow',
    gitLabCIExampleTitle: 'GitLab CI Pipeline',
    
    dataSourceTitle: 'Integration & Ecosystem',
    dataSourceIntro: 'Supported platforms and integrations:',
    
    alertingTitle: 'Advanced Features',
    alertingIntro: 'Advanced capabilities and features:',
    
    useCasesTitle: 'Best Use Cases',
    githubActionsBestFor: 'GitHub Actions is Best For:',
    gitLabCIBestFor: 'GitLab CI is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'GitHub Actions and GitLab CI represent different philosophies in CI/CD. GitHub Actions excels in simplicity, marketplace ecosystem, and seamless GitHub integration, making it ideal for teams deeply invested in GitHub. GitLab CI offers a complete DevOps platform with built-in features, making it suitable for organizations wanting an all-in-one solution. The choice often depends on your existing toolchain: if GitHub is central to your workflow, Actions provides excellent native integration; if you need comprehensive DevOps features in one platform, GitLab CI delivers more out-of-the-box capabilities.',
    
    faq1q: 'Can I use GitHub Actions with GitLab repositories?',
    faq1a: 'No, GitHub Actions only works with GitHub repositories. For GitLab repositories, use GitLab CI or integrate with external CI/CD tools. However, you can use self-hosted runners in both platforms for more flexibility.',
    
    faq2q: 'Which is more cost-effective?',
    faq2a: 'GitHub Actions offers 2,000 free minutes per month for public repositories and 3,000 minutes for private repos on the free tier. GitLab CI provides 400 CI minutes per month on the free tier and 2,000 minutes on the bronze tier. For heavy CI/CD usage, pricing comparison depends on your specific usage patterns and team size.',
    
    faq3q: 'How do they handle secrets management?',
    faq3a: 'Both platforms provide encrypted secrets management. GitHub Actions stores secrets at repository or organization level with automatic masking in logs. GitLab CI offers variable protection, environment-specific variables, and integrates with HashiCorp Vault for enterprise secrets management.',
    
    faq4q: 'Can I run builds on my own infrastructure?',
    faq4a: 'Yes, both support self-hosted runners. GitHub Actions allows self-hosted runners at repository, organization, or enterprise level. GitLab CI supports self-managed runners with various executors including shell, Docker, Kubernetes, and SSH.',
    
    faq5q: 'Which has better Docker and container support?',
    faq5a: 'Both have excellent container support. GitLab CI includes a built-in container registry and Docker-in-Docker support. GitHub Actions supports container workflows and integrates with external registries. GitLab has more built-in container features, while GitHub Actions offers more marketplace integrations.',
    
    faq6q: 'How do they compare for large enterprises?',
    faq6a: 'GitLab CI offers more enterprise features out-of-the-box including self-hosted options, advanced security, and compliance. GitHub Actions Enterprise provides enhanced security, self-hosted runners, and policy management. GitLab is often preferred for complete on-premise solutions, while GitHub Actions Enterprise suits organizations invested in GitHub.',
    
    faq7q: 'What about security scanning features?',
    faq7a: 'GitLab CI includes built-in SAST, DAST, dependency scanning, and container scanning in its Ultimate tier. GitHub Actions requires integration with security tools via marketplace actions or GitHub Advanced Security. GitLab provides more comprehensive native security features.',
    
    faq8q: 'Which is easier for beginners?',
    faq8a: 'GitHub Actions may be easier for teams already familiar with GitHub, with intuitive UI and extensive documentation. GitLab CI has more features to learn but offers Auto DevOps for zero-configuration CI/CD. Both have extensive learning resources and community support.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'GitHub Actions vs GitLab CI：CI/CD平台对比',
    intro: 'GitHub Actions和GitLab CI是两个领先的CI/CD平台，集成在流行的版本控制系统中。GitHub Actions在GitHub内提供原生CI/CD，而GitLab CI提供全面的DevOps能力。本比较考察它们在现代软件开发中的功能、工作流程和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为无缝GitHub集成、市场生态系统和简单的基于YAML的工作流程选择GitHub Actions。为内置DevOps平台、Auto DevOps等高级功能和自托管选项选择GitLab CI。两者都支持Docker、矩阵构建和广泛的集成，但GitLab CI提供更多内置功能，而GitHub Actions在市场扩展性方面表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'GitHub Actions与GitHub原生集成；GitLab CI与GitLab集成',
    takeaway2: '两者都使用类似语法的YAML配置',
    takeaway3: 'GitLab CI有更多内置功能；GitHub Actions有更大的市场',
    takeaway4: 'GitHub Actions通过市场提供更好的第三方集成',
    takeaway5: 'GitLab CI包含Auto DevOps和内置安全扫描',
    takeaway6: '两者都支持自托管运行器用于本地执行',
    
    whatIsGitHubActionsTitle: '什么是GitHub Actions？',
    whatIsGitHubActionsContent: 'GitHub Actions是直接集成到GitHub中的CI/CD服务。2018年发布，它直接从GitHub仓库自动化软件工作流程。Actions使用YAML文件定义工作流程，并提供包含数千个预构建操作的市场。它支持矩阵构建、多环境部署，并与GitHub生态系统无缝集成。',
    
    whatIsGitLabCITitle: '什么是GitLab CI？',
    whatIsGitLabCIContent: 'GitLab CI是构建在GitLab中的持续集成和交付工具。2015年推出，它提供完整的DevOps生命周期，包括规划、创建、验证、打包、发布、配置和监控。GitLab CI使用YAML配置，包含Auto DevOps、内置容器注册表和安全扫描等功能。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心CI/CD能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '流水线和工作流程配置：',
    
    githubActionsExampleTitle: 'GitHub Actions工作流程',
    gitLabCIExampleTitle: 'GitLab CI流水线',
    
    dataSourceTitle: '集成与生态系统',
    dataSourceIntro: '支持的平台和集成：',
    
    alertingTitle: '高级功能',
    alertingIntro: '高级能力和特性：',
    
    useCasesTitle: '最佳用例',
    githubActionsBestFor: 'GitHub Actions最适合：',
    gitLabCIBestFor: 'GitLab CI最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'GitHub Actions和GitLab CI代表了CI/CD中的不同理念。GitHub Actions在简洁性、市场生态系统和无缝GitHub集成方面表现出色，使其成为深度投资于GitHub的团队的理想选择。GitLab CI提供了一个完整的DevOps平台，内置功能丰富，适合想要一体化解决方案的组织。选择通常取决于你现有的工具链：如果GitHub是你工作流程的核心，Actions提供出色的原生集成；如果你需要一个平台上的全面DevOps功能，GitLab CI开箱即用提供更多能力。',
    
    faq1q: '我可以在GitLab仓库中使用GitHub Actions吗？',
    faq1a: '不可以，GitHub Actions只适用于GitHub仓库。对于GitLab仓库，使用GitLab CI或与外部CI/CD工具集成。但是，你可以在两个平台中使用自托管运行器获得更多灵活性。',
    
    faq2q: '哪个更具成本效益？',
    faq2a: 'GitHub Actions为公共仓库每月提供2,000免费分钟，免费层私有仓库提供3,000分钟。GitLab CI免费层每月提供400 CI分钟，青铜层提供2,000分钟。对于重度CI/CD使用，定价比较取决于你的具体使用模式和团队规模。',
    
    faq3q: '它们如何处理密钥管理？',
    faq3a: '两个平台都提供加密的密钥管理。GitHub Actions在仓库或组织级别存储密钥，并在日志中自动屏蔽。GitLab CI提供变量保护、环境特定变量，并与HashiCorp Vault集成用于企业密钥管理。',
    
    faq4q: '我可以在自己的基础设施上运行构建吗？',
    faq4a: '是的，两者都支持自托管运行器。GitHub Actions允许在仓库、组织或企业级别设置自托管运行器。GitLab CI支持自管理运行器，包括shell、Docker、Kubernetes和SSH等多种执行器。',
    
    faq5q: '哪个有更好的Docker和容器支持？',
    faq5a: '两者都有出色的容器支持。GitLab CI包含内置容器注册表和Docker-in-Docker支持。GitHub Actions支持容器工作流程并与外部注册表集成。GitLab有更多内置容器功能，而GitHub Actions提供更多市场集成。',
    
    faq6q: '它们在大型企业中如何比较？',
    faq6a: 'GitLab CI开箱即用提供更多企业功能，包括自托管选项、高级安全和合规性。GitHub Actions Enterprise提供增强的安全性、自托管运行器和策略管理。GitLab通常更适合完整的本地解决方案，而GitHub Actions Enterprise适合投资于GitHub的组织。',
    
    faq7q: '安全扫描功能怎么样？',
    faq7a: 'GitLab CI在Ultimate层中包含内置SAST、DAST、依赖扫描和容器扫描。GitHub Actions需要通过市场操作或GitHub Advanced Security与安全工具集成。GitLab提供更全面的原生安全功能。',
    
    faq8q: '对初学者来说哪个更容易？',
    faq8a: '对于已经熟悉GitHub的团队，GitHub Actions可能更容易，具有直观的UI和广泛的文档。GitLab CI有更多功能需要学习，但为零配置CI/CD提供Auto DevOps。两者都有广泛的学习资源和社区支持。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function GitHubActionsVsGitLabCI({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsGitHubActionsTitle}</h3>
      <p style={pStyle}>{ct.whatIsGitHubActionsContent}</p>

      <h3 style={h3Style}>{ct.whatIsGitLabCITitle}</h3>
      <p style={pStyle}>{ct.whatIsGitLabCIContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>GitHub Actions</th>
              <th style={thStyle}>GitLab CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? 'GitHub集成' : 'GitHub integration', isZh ? '完整DevOps平台' : 'Complete DevOps platform'],
              [isZh ? '配置格式' : 'Configuration', 'YAML', 'YAML'],
              [isZh ? '市场生态' : 'Marketplace', '10000+ actions', isZh ? '有限' : 'Limited'],
              [isZh ? '内置功能' : 'Built-in Features', isZh ? '基础' : 'Basic', isZh ? '全面' : 'Comprehensive'],
              [isZh ? '容器注册表' : 'Container Registry', isZh ? '外部集成' : 'External integration', isZh ? '内置' : 'Built-in'],
              [isZh ? '安全扫描' : 'Security Scanning', isZh ? '需Advanced Security' : 'Requires Advanced Security', isZh ? '内置(Ultimate)' : 'Built-in (Ultimate)'],
              [isZh ? '自托管' : 'Self-hosted', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '学习曲线' : 'Learning Curve', isZh ? '简单' : 'Easy', isZh ? '中等' : 'Moderate'],
            ].map(([feature, github, gitlab], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{github}</td>
                <td style={tdStyle}>{gitlab}</td>
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
              <th style={thStyle}>GitHub Actions</th>
              <th style={thStyle}>GitLab CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '矩阵构建' : 'Matrix Builds', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '环境部署' : 'Environment Deploy', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '密钥管理' : 'Secrets Management', isZh ? '仓库/组织级别' : 'Repo/Org level', isZh ? '环境变量保护' : 'Protected variables'],
              [isZh ? '缓存' : 'Caching', isZh ? 'actions/cache' : 'actions/cache', isZh ? '内置缓存' : 'Built-in cache'],
              [isZh ? '产物存储' : 'Artifacts', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '页面部署' : 'Pages Deploy', 'GitHub Pages', 'GitLab Pages'],
              [isZh ? '自动DevOps' : 'Auto DevOps', isZh ? '无' : 'No', isZh ? '内置' : 'Built-in'],
              [isZh ? '合并请求集成' : 'MR/PR Integration', isZh ? '原生' : 'Native', isZh ? '原生' : 'Native'],
            ].map(([cap, github, gitlab], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{github}</td>
                <td style={tdStyle}>{gitlab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#2088ff' }}>{ct.githubActionsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# GitHub Actions Workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          docker tag myapp:\${{ github.sha }} myapp:latest
      
      - name: Push to Registry
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:\${{ github.sha }}
          docker push myapp:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # Add deployment commands here`}</code></pre>

      <h3 style={{ ...h3Style, color: '#fc6d26' }}>{ct.gitLabCIExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# GitLab CI Pipeline
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_IMAGE: myapp
  DOCKER_REGISTRY: registry.gitlab.com

.test_template: &test_template
  stage: test
  image: node:latest
  before_script:
    - npm ci
  cache:
    paths:
      - node_modules/

test:node16:
  <<: *test_template
  image: node:16
  script:
    - npm test -- --coverage
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

test:node18:
  <<: *test_template
  image: node:18
  script:
    - npm test

test:node20:
  <<: *test_template
  image: node:20
  script:
    - npm test

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  dependencies:
    - test:node16
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$CI_COMMIT_SHA .
    - docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$CI_COMMIT_SHA
    - |
      if [ $CI_COMMIT_BRANCH == "main" ]; then
        docker tag $DOCKER_REGISTRY/$DOCKER_IMAGE:$CI_COMMIT_SHA $DOCKER_REGISTRY/$DOCKER_IMAGE:latest
        docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest
      fi
  only:
    - main
    - develop

deploy_production:
  stage: deploy
  image: alpine:latest
  script:
    - echo "Deploying to production..."
    - apk add --no-cache curl
    # Add deployment commands here
  environment:
    name: production
    url: https://myapp.example.com
  only:
    - main
  when: manual`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>GitHub Actions</th>
              <th style={thStyle}>GitLab CI</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '版本控制' : 'Version Control', 'GitHub only', 'GitLab only'],
              [isZh ? '容器注册表' : 'Container Registry', 'External (Docker Hub, GCR, ECR)', 'Built-in GitLab Registry'],
              [isZh ? '云平台' : 'Cloud Platforms', 'AWS, Azure, GCP via marketplace', 'AWS, Azure, GCP integrations'],
              [isZh ? '包管理器' : 'Package Managers', 'npm, PyPI, Maven via actions', 'Built-in package registry'],
              [isZh ? '监控工具' : 'Monitoring', 'Datadog, New Relic, Prometheus', 'Built-in monitoring + integrations'],
            ].map(([cat, github, gitlab], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{github}</td>
                <td style={tdStyle}>{gitlab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #2088ff' }}>
          <strong style={{ color: '#2088ff' }}>GitHub Actions Advanced Features</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '大型动作市场、矩阵构建、环境保护和审查、并发控制、可重用工作流程、复合动作、自托管运行器、GitHub包注册表集成。' : 'Large marketplace ecosystem, matrix builds, environment protection and reviews, concurrency control, reusable workflows, composite actions, self-hosted runners, GitHub Packages integration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fc6d26' }}>
          <strong style={{ color: '#fc6d26' }}>GitLab CI Advanced Features</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Auto DevOps、内置容器注册表、安全扫描（SAST/DAST/依赖扫描）、代码质量检查、性能测试、Review Apps、内置监控、合并请求集成。' : 'Auto DevOps, built-in container registry, security scanning (SAST/DAST/dependency scanning), code quality checks, performance testing, Review Apps, built-in monitoring, merge request integration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2088ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2088ff' }}>{ct.githubActionsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '深度GitHub用户' : 'GitHub-centric teams'}</li>
            <li>{isZh ? '需要丰富第三方集成' : 'Rich third-party integrations'}</li>
            <li>{isZh ? '开源项目' : 'Open source projects'}</li>
            <li>{isZh ? '简单CI/CD需求' : 'Simple CI/CD needs'}</li>
            <li>{isZh ? '小型到中型团队' : 'Small to medium teams'}</li>
            <li>{isZh ? '云原生工作流程' : 'Cloud-native workflows'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fc6d26' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fc6d26' }}>{ct.gitLabCIBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '需要完整DevOps平台' : 'Complete DevOps platform needs'}</li>
            <li>{isZh ? '企业级合规要求' : 'Enterprise compliance requirements'}</li>
            <li>{isZh ? '自托管需求' : 'Self-hosted requirements'}</li>
            <li>{isZh ? '内置安全和扫描' : 'Built-in security and scanning'}</li>
            <li>{isZh ? '大型团队和组织' : 'Large teams and organizations'}</li>
            <li>{isZh ? '端到端软件生命周期' : 'End-to-end software lifecycle'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/yaml-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
