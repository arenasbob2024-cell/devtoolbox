'use client'

import React from 'react'

const translations = {
  en: {
    title: 'CI/CD Guide: GitHub Actions, GitLab CI, Docker, and Deployment Pipelines',
    description:
      'A comprehensive guide to CI/CD pipelines covering GitHub Actions, GitLab CI, Docker multi-stage builds, deployment strategies, secrets management, and pipeline optimization for modern DevOps teams.',
    content: `CI/CD (Continuous Integration and Continuous Delivery/Deployment) has become the backbone of modern software engineering. Teams that ship fast, ship reliably, and recover quickly from failures all share one thing in common: well-designed automated pipelines. This guide walks through everything you need to build production-grade CI/CD workflows using GitHub Actions, GitLab CI, Docker, and proven deployment patterns.`
  },
  zh: {
    title: 'CI/CD 完整指南：GitHub Actions、GitLab CI、Docker 与部署流水线',
    description:
      '全面介绍 CI/CD 流水线的完整指南，涵盖 GitHub Actions、GitLab CI、Docker 多阶段构建、部署策略、密钥管理以及面向现代 DevOps 团队的流水线优化。',
    content: `CI/CD（持续集成与持续交付/部署）已成为现代软件工程的核心支柱。那些发布快速、可靠且能从故障中快速恢复的团队都有一个共同点：设计良好的自动化流水线。本指南将带你全面了解如何使用 GitHub Actions、GitLab CI、Docker 和经过验证的部署模式构建生产级 CI/CD 工作流。`
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between CI, CD (Delivery), and CD (Deployment)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Continuous Integration (CI) automatically builds and tests code on every commit. Continuous Delivery (CD) extends CI by automatically preparing a release artifact that is ready to deploy but requires manual approval to go live. Continuous Deployment goes one step further and automatically deploys every passing build to production without human intervention.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I securely pass secrets in GitHub Actions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Store sensitive values in Settings > Secrets and variables > Actions in your repository. Reference them in workflows using the ${{ secrets.YOUR_SECRET_NAME }} syntax. Never hard-code secrets in workflow files or print them in logs. For advanced cases, use GitHub OIDC to assume cloud roles without storing long-lived credentials at all.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a matrix strategy in GitHub Actions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A matrix strategy allows a single job definition to run across multiple combinations of variables (e.g., Node.js versions, operating systems). GitHub Actions fans out the job automatically, running all combinations in parallel. This is useful for cross-platform testing or multi-version compatibility checks without duplicating job definitions.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does Docker layer caching speed up CI builds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Docker caches each layer of an image. If a layer and all preceding layers are unchanged, Docker reuses the cached result instead of rebuilding. In CI you can use --cache-from to pull a previously built image and use its layers as cache. Structuring your Dockerfile so dependency installation (slow, rarely changes) comes before source code copying (fast, changes frequently) maximizes cache hits.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a blue-green deployment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Blue-green deployment maintains two identical production environments called "blue" and "green". At any time, one environment serves live traffic. When deploying a new version, you deploy to the idle environment, run smoke tests, then switch the load balancer to route traffic to it. If problems occur, you instantly roll back by switching the load balancer back. This achieves zero-downtime deployments with a simple rollback path.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I trigger a GitLab CI pipeline only for changed files in a monorepo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the changes keyword under rules in your .gitlab-ci.yml. For example: rules: [{ if: "$CI_PIPELINE_SOURCE == \"push\"", changes: ["packages/api/**/*"] }]. This tells GitLab to only run that job when files under packages/api/ are modified. Combine with needs to build a dependency graph between jobs so downstream jobs only run if their upstream counterparts ran.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is a canary deployment and when should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A canary deployment routes a small percentage of real production traffic (e.g., 5%) to a new version while the rest continues to run the stable version. You monitor error rates, latency, and business metrics. If metrics look healthy you gradually increase the canary percentage until 100% of traffic runs the new version. Use canary deployments for high-traffic services where even a short outage is costly and you want to validate behavior under real load before full rollout.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I optimize slow CI pipelines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The main levers are: (1) Parallelism — split test suites across multiple runners. (2) Caching — cache dependency directories (node_modules, .gradle, ~/.cargo) between runs. (3) Path filtering — skip jobs for unrelated changes. (4) Fail-fast — cancel remaining matrix jobs when one fails. (5) Incremental builds — use tools like Nx, Turborepo, or Bazel to only rebuild affected packages. (6) Use faster runners — GitHub larger runners or self-hosted runners with SSDs can dramatically cut I/O-bound steps.'
      }
    }
  ]
}

export default function CICDGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en
  const isZh = lang === 'zh'

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.7 }}>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: '8px', padding: '1.25rem 1.5rem', margin: '1.5rem 0' }}>
        <strong style={{ color: '#0369a1', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</strong>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#0c4a6e' }}>
          <li>CI builds and tests every commit; CD automates deployment to staging or production</li>
          <li>GitHub Actions uses YAML workflows triggered by events; GitLab CI uses <code>.gitlab-ci.yml</code> with stages</li>
          <li>Docker multi-stage builds produce small, secure images; layer caching keeps CI fast</li>
          <li>Blue-green and canary deployments enable zero-downtime releases with safe rollback</li>
          <li>Store secrets outside code using GitHub Secrets, HashiCorp Vault, or cloud secret managers</li>
          <li>Speed up pipelines with parallelism, dependency caching, and path-based filtering</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem 1.5rem', margin: '1.5rem 0' }}>
        <strong style={{ color: '#475569', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Takeaways</strong>
        <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#334155' }}>
          <li>A failing pipeline is not a problem — it is a fast feedback loop that prevents broken code from reaching users</li>
          <li>Treat your pipeline configuration as production code: review it, test it, version it</li>
          <li>Start simple (push → test → deploy to staging) and add complexity only when the pain justifies it</li>
          <li>Invest in caching early; it is the single highest-ROI pipeline optimization</li>
          <li>OIDC-based authentication to cloud providers eliminates the need for long-lived credentials in CI</li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '1.5rem' }}>{t.content}</p>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'CI/CD 核心概念' : 'CI/CD Core Concepts'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '持续集成（CI）' : 'Continuous Integration (CI)'}
      </h3>
      <p>
        {isZh
          ? '持续集成是指每次开发者将代码推送到共享仓库时，自动触发构建和测试流程。目标是尽早发现集成问题，避免"集成地狱"——即多个开发者的代码长期独立开发后合并时产生的大量冲突。'
          : 'Continuous Integration means automatically triggering a build and test process every time a developer pushes code to a shared repository. The goal is to catch integration problems early and avoid "integration hell" — the mass of conflicts that emerge when multiple developers work in isolation for long periods before merging.'}
      </p>
      <p>
        {isZh
          ? 'CI 的最佳实践：每天提交多次、保持构建时间在 10 分钟以内（避免慢反馈循环）、当主干构建失败时立即修复，以及对所有分支都运行 CI。'
          : 'CI best practices: commit multiple times per day, keep builds under 10 minutes (slow builds breed slow feedback loops), fix a broken main branch immediately, and run CI on all branches.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '持续交付（CD – Delivery）' : 'Continuous Delivery (CD – Delivery)'}
      </h3>
      <p>
        {isZh
          ? '持续交付在 CI 的基础上，将每次通过测试的构建自动打包成可部署的制品（Docker 镜像、JAR 包、zip 包等），并将其部署到预发布环境。部署到生产仍需人工审批。'
          : 'Continuous Delivery extends CI by automatically packaging every passing build into a deployable artifact (Docker image, JAR, zip) and deploying it to a staging environment. Deployment to production still requires human approval.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '持续部署（CD – Deployment）' : 'Continuous Deployment (CD – Deployment)'}
      </h3>
      <p>
        {isZh
          ? '持续部署更进一步，每次通过所有测试和检查的提交都会自动部署到生产环境，无需人工干预。这是成熟度最高的 CI/CD 模式，要求有完善的自动化测试套件、特性开关（Feature Flag）和强健的监控体系。'
          : 'Continuous Deployment goes one step further: every commit that passes all tests and checks is automatically deployed to production without human intervention. This is the most mature CI/CD pattern and requires a comprehensive automated test suite, feature flags, and robust monitoring.'}
      </p>

      {/* Comparison table: CI vs CD Delivery vs CD Deployment */}
      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Aspect</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>CI</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Continuous Delivery</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Continuous Deployment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Trigger</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Every push</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Every passing build</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Every passing build</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Production deploy</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Manual</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Manual approval</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Automatic</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Human gate</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Yes (deploy)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Yes (prod deploy)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>None</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Test suite required</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Basic</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Comprehensive</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Very comprehensive</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'GitHub Actions 深度解析' : 'GitHub Actions Deep Dive'}
      </h2>

      <p>
        {isZh
          ? 'GitHub Actions 是 GitHub 原生的 CI/CD 平台，于 2018 年推出，现已成为开源项目和许多企业项目的首选。它基于事件驱动，支持数千种社区维护的 Action，与 GitHub 的 Issues、PRs、Packages、Releases 深度集成。'
          : 'GitHub Actions is GitHub\'s native CI/CD platform, launched in 2018 and now the default choice for open-source and many enterprise projects. It is event-driven, has thousands of community-maintained Actions, and integrates deeply with GitHub Issues, PRs, Packages, and Releases.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '工作流语法基础' : 'Workflow Syntax Fundamentals'}
      </h3>
      <p>
        {isZh
          ? '工作流文件存放在 <code>.github/workflows/</code> 目录下，使用 YAML 格式，结构如下：'
          : 'Workflow files live in <code>.github/workflows/</code> and use YAML. Here is a complete annotated example:'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# .github/workflows/ci.yml\n' +
'name: CI Pipeline\n' +
'\n' +
'# Triggers\n' +
'on:\n' +
'  push:\n' +
'    branches: [main, develop]\n' +
'  pull_request:\n' +
'    branches: [main]\n' +
'  workflow_dispatch:  # manual trigger\n' +
'\n' +
'# Environment variables available to all jobs\n' +
'env:\n' +
'  NODE_VERSION: "20"\n' +
'\n' +
'jobs:\n' +
'  test:\n' +
'    name: Run Tests\n' +
'    runs-on: ubuntu-latest\n' +
'    \n' +
'    steps:\n' +
'      - name: Checkout code\n' +
'        uses: actions/checkout@v4\n' +
'\n' +
'      - name: Setup Node.js\n' +
'        uses: actions/setup-node@v4\n' +
'        with:\n' +
'          node-version: ${{ env.NODE_VERSION }}\n' +
'          cache: "npm"\n' +
'\n' +
'      - name: Install dependencies\n' +
'        run: npm ci\n' +
'\n' +
'      - name: Run linter\n' +
'        run: npm run lint\n' +
'\n' +
'      - name: Run unit tests\n' +
'        run: npm test -- --coverage\n' +
'\n' +
'      - name: Upload coverage\n' +
'        uses: codecov/codecov-action@v4\n' +
'        with:\n' +
'          token: ${{ secrets.CODECOV_TOKEN }}'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '矩阵策略（Matrix Strategy）' : 'Matrix Strategy'}
      </h3>
      <p>
        {isZh
          ? '矩阵策略允许用一个 Job 定义跑多个参数组合，GitHub Actions 会自动并行执行所有组合：'
          : 'The matrix strategy fans out a single job definition across multiple parameter combinations, all running in parallel:'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'jobs:\n' +
'  test-matrix:\n' +
'    runs-on: ${{ matrix.os }}\n' +
'    strategy:\n' +
'      fail-fast: false  # continue other combos if one fails\n' +
'      matrix:\n' +
'        os: [ubuntu-latest, windows-latest, macos-latest]\n' +
'        node: [18, 20, 22]\n' +
'        exclude:\n' +
'          - os: windows-latest\n' +
'            node: 18  # skip this specific combo\n' +
'        include:\n' +
'          - os: ubuntu-latest\n' +
'            node: 20\n' +
'            experimental: true  # add extra property\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with:\n' +
'          node-version: ${{ matrix.node }}\n' +
'      - run: npm ci && npm test'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? 'Job 依赖与条件执行' : 'Job Dependencies and Conditional Execution'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'jobs:\n' +
'  build:\n' +
'    runs-on: ubuntu-latest\n' +
'    outputs:\n' +
'      image-tag: ${{ steps.meta.outputs.tags }}\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - id: meta\n' +
'        run: echo "tags=myapp:${{ github.sha }}" >> $GITHUB_OUTPUT\n' +
'      - run: docker build -t myapp:${{ github.sha }} .\n' +
'\n' +
'  deploy-staging:\n' +
'    needs: build\n' +
'    if: github.ref == "refs/heads/main"\n' +
'    environment: staging\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - run: echo "Deploying ${{ needs.build.outputs.image-tag }} to staging"\n' +
'\n' +
'  deploy-prod:\n' +
'    needs: deploy-staging\n' +
'    if: github.event_name == "push" && github.ref == "refs/heads/main"\n' +
'    environment:\n' +
'      name: production\n' +
'      url: https://myapp.com\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - run: echo "Deploying to production"'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '密钥与 OIDC 认证' : 'Secrets and OIDC Authentication'}
      </h3>
      <p>
        {isZh
          ? '避免在工作流中存储长期凭证。使用 GitHub OIDC 直接向 AWS、GCP 或 Azure 申请临时凭证：'
          : 'Avoid storing long-lived credentials. Use GitHub OIDC to request short-lived credentials from AWS, GCP, or Azure directly:'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'jobs:\n' +
'  deploy:\n' +
'    runs-on: ubuntu-latest\n' +
'    permissions:\n' +
'      id-token: write  # required for OIDC\n' +
'      contents: read\n' +
'    steps:\n' +
'      - name: Configure AWS credentials via OIDC\n' +
'        uses: aws-actions/configure-aws-credentials@v4\n' +
'        with:\n' +
'          role-to-assume: arn:aws:iam::123456789012:role/GitHubActionsRole\n' +
'          aws-region: us-east-1\n' +
'          # No ACCESS_KEY_ID or SECRET_ACCESS_KEY needed!\n' +
'\n' +
'      - name: Deploy to ECS\n' +
'        run: |\n' +
'          aws ecs update-service \\\n' +
'            --cluster prod-cluster \\\n' +
'            --service myapp \\\n' +
'            --force-new-deployment'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'GitLab CI/CD 完全指南' : 'GitLab CI/CD Complete Guide'}
      </h2>

      <p>
        {isZh
          ? 'GitLab CI 将流水线配置集中在仓库根目录的 <code>.gitlab-ci.yml</code> 文件中。它以"Stage（阶段）"为组织单位，同一 Stage 内的 Job 并行运行，Stage 之间顺序执行。'
          : 'GitLab CI centralizes pipeline configuration in <code>.gitlab-ci.yml</code> at the repository root. It organizes work into stages — jobs within a stage run in parallel, stages run sequentially.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '完整的 .gitlab-ci.yml 示例' : 'Complete .gitlab-ci.yml Example'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# .gitlab-ci.yml\n' +
'image: node:20-alpine\n' +
'\n' +
'stages:\n' +
'  - install\n' +
'  - test\n' +
'  - build\n' +
'  - deploy\n' +
'\n' +
'variables:\n' +
'  npm_config_cache: "$CI_PROJECT_DIR/.npm"\n' +
'\n' +
'# Reusable cache configuration\n' +
'.node-cache: &node-cache\n' +
'  cache:\n' +
'    key:\n' +
'      files:\n' +
'        - package-lock.json\n' +
'    paths:\n' +
'      - .npm/\n' +
'      - node_modules/\n' +
'\n' +
'install-deps:\n' +
'  stage: install\n' +
'  <<: *node-cache\n' +
'  script:\n' +
'    - npm ci\n' +
'  artifacts:\n' +
'    paths:\n' +
'      - node_modules/\n' +
'    expire_in: 1 hour\n' +
'\n' +
'unit-tests:\n' +
'  stage: test\n' +
'  <<: *node-cache\n' +
'  script:\n' +
'    - npm test -- --coverage --ci\n' +
'  coverage: /All files[^|]*\|[^|]*\s+([\d\.]+)/\n' +
'  artifacts:\n' +
'    reports:\n' +
'      coverage_report:\n' +
'        coverage_format: cobertura\n' +
'        path: coverage/cobertura-coverage.xml\n' +
'    paths:\n' +
'      - coverage/\n' +
'\n' +
'build-app:\n' +
'  stage: build\n' +
'  script:\n' +
'    - npm run build\n' +
'  artifacts:\n' +
'    paths:\n' +
'      - dist/\n' +
'    expire_in: 1 week\n' +
'  only:\n' +
'    - main\n' +
'    - merge_requests\n' +
'\n' +
'deploy-staging:\n' +
'  stage: deploy\n' +
'  environment:\n' +
'    name: staging\n' +
'    url: https://staging.myapp.com\n' +
'  script:\n' +
'    - echo "Deploying to staging..."\n' +
'    - ./scripts/deploy.sh staging\n' +
'  only:\n' +
'    - main\n' +
'\n' +
'deploy-production:\n' +
'  stage: deploy\n' +
'  environment:\n' +
'    name: production\n' +
'    url: https://myapp.com\n' +
'  script:\n' +
'    - ./scripts/deploy.sh production\n' +
'  when: manual  # requires human approval\n' +
'  only:\n' +
'    - main'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? 'Rules 与路径过滤' : 'Rules and Path Filtering'}
      </h3>
      <p>
        {isZh
          ? '使用 <code>rules</code> 关键字可以精确控制 Job 的触发条件，在 Monorepo 中尤为有用：'
          : 'The <code>rules</code> keyword gives fine-grained control over when jobs run — especially valuable in monorepos:'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'build-api:\n' +
'  stage: build\n' +
'  script:\n' +
'    - cd packages/api && npm run build\n' +
'  rules:\n' +
'    # Run on merge request if api files changed\n' +
'    - if: $CI_PIPELINE_SOURCE == "merge_request_event"\n' +
'      changes:\n' +
'        - packages/api/**/*\n' +
'        - packages/shared/**/*\n' +
'    # Always run on main branch pushes\n' +
'    - if: $CI_COMMIT_BRANCH == "main"\n' +
'\n' +
'build-frontend:\n' +
'  stage: build\n' +
'  script:\n' +
'    - cd packages/frontend && npm run build\n' +
'  rules:\n' +
'    - if: $CI_PIPELINE_SOURCE == "merge_request_event"\n' +
'      changes:\n' +
'        - packages/frontend/**/*\n' +
'        - packages/shared/**/*\n' +
'    - if: $CI_COMMIT_BRANCH == "main"'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? 'GitLab Runner 类型' : 'GitLab Runner Types'}
      </h3>
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Runner Type</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Use Case</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Isolation</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Shell</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Legacy / simple jobs</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>None</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Runs directly on host</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Docker</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Most workloads</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Container</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Clean env each run</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Kubernetes</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Scale-out / cloud-native</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Pod</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Auto-scales runner pods</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Instance (SaaS)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>gitlab.com users</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>VM</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Free tier: 400 min/month</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'Docker 在 CI/CD 中的应用' : 'Docker in CI/CD Pipelines'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '多阶段构建' : 'Multi-Stage Builds'}
      </h3>
      <p>
        {isZh
          ? '多阶段构建是生产环境 Dockerfile 的标准模式。它将"构建环境"（包含编译器、测试工具等）和"运行环境"（只有运行时依赖）分离，生成体积更小、攻击面更小的镜像。'
          : 'Multi-stage builds are the standard pattern for production Dockerfiles. They separate the build environment (compilers, test tools) from the runtime image (only runtime dependencies), producing smaller and more secure images.'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Dockerfile\n' +
'\n' +
'# Stage 1: Install dependencies\n' +
'FROM node:20-alpine AS deps\n' +
'WORKDIR /app\n' +
'COPY package*.json ./\n' +
'RUN npm ci --only=production\n' +
'\n' +
'# Stage 2: Build\n' +
'FROM node:20-alpine AS builder\n' +
'WORKDIR /app\n' +
'COPY package*.json ./\n' +
'RUN npm ci\n' +
'COPY . .\n' +
'RUN npm run build\n' +
'\n' +
'# Stage 3: Runtime (smallest possible image)\n' +
'FROM node:20-alpine AS runner\n' +
'WORKDIR /app\n' +
'ENV NODE_ENV=production\n' +
'\n' +
'# Copy only what is needed at runtime\n' +
'COPY --from=deps /app/node_modules ./node_modules\n' +
'COPY --from=builder /app/dist ./dist\n' +
'COPY --from=builder /app/package.json ./\n' +
'\n' +
'# Run as non-root user\n' +
'RUN addgroup -S appgroup && adduser -S appuser -G appgroup\n' +
'USER appuser\n' +
'\n' +
'EXPOSE 3000\n' +
'CMD ["node", "dist/server.js"]'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '在 GitHub Actions 中构建并推送镜像' : 'Building and Pushing Images in GitHub Actions'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'jobs:\n' +
'  build-push:\n' +
'    runs-on: ubuntu-latest\n' +
'    permissions:\n' +
'      contents: read\n' +
'      packages: write  # for GHCR\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'\n' +
'      - name: Set up Docker Buildx\n' +
'        uses: docker/setup-buildx-action@v3\n' +
'\n' +
'      - name: Login to GitHub Container Registry\n' +
'        uses: docker/login-action@v3\n' +
'        with:\n' +
'          registry: ghcr.io\n' +
'          username: ${{ github.actor }}\n' +
'          password: ${{ secrets.GITHUB_TOKEN }}\n' +
'\n' +
'      - name: Extract Docker metadata\n' +
'        id: meta\n' +
'        uses: docker/metadata-action@v5\n' +
'        with:\n' +
'          images: ghcr.io/${{ github.repository }}\n' +
'          tags: |\n' +
'            type=sha\n' +
'            type=ref,event=branch\n' +
'            type=semver,pattern={{version}}\n' +
'\n' +
'      - name: Build and push\n' +
'        uses: docker/build-push-action@v5\n' +
'        with:\n' +
'          context: .\n' +
'          push: true\n' +
'          tags: ${{ steps.meta.outputs.tags }}\n' +
'          labels: ${{ steps.meta.outputs.labels }}\n' +
'          cache-from: type=gha        # GitHub Actions cache\n' +
'          cache-to: type=gha,mode=max'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? 'Docker 层缓存最优实践' : 'Docker Layer Caching Best Practices'}
      </h3>
      <p>
        {isZh
          ? 'Docker 按层从上到下缓存。一旦某层失效，其后的所有层都需要重建。因此 Dockerfile 的层顺序至关重要：'
          : 'Docker caches layers top-to-bottom. Once a layer is invalidated, all subsequent layers must rebuild. Layer order in your Dockerfile is critical:'}
      </p>
      <ul style={{ paddingLeft: '1.5rem', color: '#334155' }}>
        <li>Copy <code>package.json</code> and lock files FIRST, then run <code>npm ci</code> — this layer only invalidates when dependencies change</li>
        <li>Copy source code AFTER installing dependencies — source changes are frequent but fast to copy</li>
        <li>Use <code>.dockerignore</code> to exclude <code>node_modules</code>, <code>.git</code>, test files, and docs from the build context</li>
        <li>Use <code>--mount=type=cache</code> in BuildKit for package manager caches that persist across builds</li>
      </ul>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '部署策略详解' : 'Deployment Strategies Explained'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '滚动更新（Rolling Deployment）' : 'Rolling Deployment'}
      </h3>
      <p>
        {isZh
          ? '滚动更新逐步将实例替换为新版本。例如，有 10 个实例时，每次替换 2 个，直到所有实例更新完毕。Kubernetes Deployment 默认使用此策略。优点是资源消耗低；缺点是更新过程中新旧版本共存，需要确保 API 向后兼容。'
          : 'Rolling deployment gradually replaces instances of the old version with the new one. With 10 instances, you might replace 2 at a time until all are updated. Kubernetes Deployments use this strategy by default. Pros: low resource overhead. Cons: old and new versions coexist during rollout, requiring backward-compatible APIs.'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# kubernetes-deployment.yaml\n' +
'apiVersion: apps/v1\n' +
'kind: Deployment\n' +
'metadata:\n' +
'  name: myapp\n' +
'spec:\n' +
'  replicas: 10\n' +
'  strategy:\n' +
'    type: RollingUpdate\n' +
'    rollingUpdate:\n' +
'      maxSurge: 2       # max extra pods during rollout\n' +
'      maxUnavailable: 0 # never reduce below desired count\n' +
'  template:\n' +
'    spec:\n' +
'      containers:\n' +
'        - name: myapp\n' +
'          image: ghcr.io/myorg/myapp:v2.1.0\n' +
'          readinessProbe:\n' +
'            httpGet:\n' +
'              path: /health\n' +
'              port: 3000\n' +
'            initialDelaySeconds: 5\n' +
'            periodSeconds: 5'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '蓝绿部署（Blue-Green Deployment）' : 'Blue-Green Deployment'}
      </h3>
      <p>
        {isZh
          ? '蓝绿部署维护两套完全相同的生产环境（蓝色和绿色），任何时候只有一套在线上服务流量。部署新版本时，将其部署到空闲的环境，运行冒烟测试，然后切换负载均衡器。出现问题时可立即回滚，切换负载均衡器即可恢复。'
          : 'Blue-green maintains two identical production environments. Traffic is always routed to one of them. To deploy, you update the idle environment, run smoke tests, then switch the load balancer. Rollback is instantaneous — just switch the load balancer back.'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# blue-green deploy script\n' +
'#!/bin/bash\n' +
'set -euo pipefail\n' +
'\n' +
'CURRENT=$(aws elbv2 describe-target-groups \\\n' +
'  --names myapp-blue myapp-green \\\n' +
'  --query "TargetGroups[?Tags[?Key==\'active\' && Value==\'true\']].TargetGroupName" \\\n' +
'  --output text)\n' +
'\n' +
'if [ "$CURRENT" = "myapp-blue" ]; then\n' +
'  NEW_TG="myapp-green"\n' +
'  OLD_TG="myapp-blue"\n' +
'else\n' +
'  NEW_TG="myapp-blue"\n' +
'  OLD_TG="myapp-green"\n' +
'fi\n' +
'\n' +
'echo "Deploying to $NEW_TG"\n' +
'\n' +
'# Update the idle target group\n' +
'aws ecs update-service --cluster prod --service "myapp-${NEW_TG}" \\\n' +
'  --task-definition "myapp:$NEW_TASK_DEF_REVISION" \\\n' +
'  --force-new-deployment\n' +
'\n' +
'# Wait for stability\n' +
'aws ecs wait services-stable --cluster prod --services "myapp-${NEW_TG}"\n' +
'\n' +
'# Run smoke tests\n' +
'./scripts/smoke-test.sh "https://staging.myapp.com"\n' +
'\n' +
'# Switch traffic\n' +
'aws elbv2 modify-listener \\\n' +
'  --listener-arn $LISTENER_ARN \\\n' +
'  --default-actions "Type=forward,TargetGroupArn=$(aws elbv2 describe-target-groups --names $NEW_TG --query TargetGroups[0].TargetGroupArn --output text)"\n' +
'\n' +
'echo "Successfully switched traffic to $NEW_TG"'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '金丝雀发布（Canary Deployment）' : 'Canary Deployment'}
      </h3>
      <p>
        {isZh
          ? '金丝雀发布将少量（如 5%）的真实生产流量路由到新版本，同时监控错误率、延迟和业务指标。如果指标正常，逐步扩大流量比例，直到 100%。如果出现异常，立即将所有流量切回稳定版本。'
          : 'Canary deployments route a small percentage of real production traffic to the new version while monitoring metrics. If metrics are healthy, the percentage is gradually increased. If not, traffic is instantly shifted back.'}
      </p>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '流水线中的测试策略' : 'Testing Strategies in Pipelines'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '测试金字塔' : 'The Test Pyramid'}
      </h3>
      <p>
        {isZh
          ? '有效的 CI 测试套件遵循测试金字塔原则：大量快速的单元测试（毫秒级）、中等数量的集成测试（秒级）、少量端到端测试（分钟级）。越靠近底层，运行越快、维护成本越低、反馈越及时。'
          : 'An effective CI test suite follows the test pyramid: many fast unit tests (milliseconds), fewer integration tests (seconds), and few end-to-end tests (minutes). Lower layers run faster, cost less to maintain, and give faster feedback.'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Full test pipeline with coverage gate\n' +
'jobs:\n' +
'  unit-tests:\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with: { node-version: "20", cache: "npm" }\n' +
'      - run: npm ci\n' +
'      - run: npm run test:unit -- --coverage\n' +
'      - name: Check coverage threshold\n' +
'        run: |\n' +
'          COVERAGE=$(cat coverage/coverage-summary.json | \\\n' +
'            jq ".total.lines.pct")\n' +
'          echo "Coverage: $COVERAGE%"\n' +
'          if (( $(echo "$COVERAGE < 80" | bc -l) )); then\n' +
'            echo "Coverage $COVERAGE% is below 80% threshold"\n' +
'            exit 1\n' +
'          fi\n' +
'\n' +
'  integration-tests:\n' +
'    runs-on: ubuntu-latest\n' +
'    needs: unit-tests\n' +
'    services:\n' +
'      postgres:\n' +
'        image: postgres:16\n' +
'        env:\n' +
'          POSTGRES_DB: testdb\n' +
'          POSTGRES_USER: testuser\n' +
'          POSTGRES_PASSWORD: testpass\n' +
'        options: >-\n' +
'          --health-cmd pg_isready\n' +
'          --health-interval 10s\n' +
'          --health-timeout 5s\n' +
'          --health-retries 5\n' +
'      redis:\n' +
'        image: redis:7-alpine\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with: { node-version: "20", cache: "npm" }\n' +
'      - run: npm ci\n' +
'      - run: npm run test:integration\n' +
'        env:\n' +
'          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb\n' +
'          REDIS_URL: redis://localhost:6379'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '环境管理' : 'Environment Management'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '典型的多环境架构' : 'Typical Multi-Environment Architecture'}
      </h3>
      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Environment</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Trigger</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Approval</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem', textAlign: 'left' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Preview</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Every PR</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>None</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>PR review, feature demo</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Staging</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Merge to main</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>None (auto)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>QA, integration, UAT</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Production</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Tag / release</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Required</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 1rem' }}>Live user traffic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '环境变量与密钥管理' : 'Environment Variables and Secrets Management'}
      </h3>
      <p>
        {isZh
          ? '不同环境需要不同的配置。按照以下原则管理：非敏感配置（如功能开关、API 端点）放在 CI 的环境变量中；敏感数据（如数据库密码、API 密钥）使用专用密钥管理系统。'
          : 'Different environments require different configurations. Non-sensitive config (feature flags, API endpoints) goes in CI environment variables. Sensitive data (DB passwords, API keys) belongs in a dedicated secrets manager.'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Using HashiCorp Vault in GitHub Actions\n' +
'jobs:\n' +
'  deploy:\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'\n' +
'      - name: Import Secrets from Vault\n' +
'        uses: hashicorp/vault-action@v3\n' +
'        with:\n' +
'          url: https://vault.mycompany.com\n' +
'          method: jwt\n' +
'          role: github-actions\n' +
'          secrets: |\n' +
'            secret/data/myapp/prod database_url | DATABASE_URL ;\n' +
'            secret/data/myapp/prod redis_url | REDIS_URL ;\n' +
'            secret/data/myapp/prod stripe_key | STRIPE_SECRET_KEY\n' +
'\n' +
'      - name: Deploy\n' +
'        run: ./scripts/deploy.sh\n' +
'        env:\n' +
'          DATABASE_URL: ${{ env.DATABASE_URL }}\n' +
'          REDIS_URL: ${{ env.REDIS_URL }}'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'Monorepo CI/CD' : 'Monorepo CI/CD'}
      </h2>

      <p>
        {isZh
          ? 'Monorepo（单仓库包含多个服务/包）对 CI/CD 带来了独特挑战：如何避免每次提交都触发所有服务的完整构建？答案是路径过滤和增量构建工具。'
          : 'Monorepos containing multiple services or packages present a unique CI challenge: how do you avoid rebuilding everything on every commit? The answer is path filtering combined with incremental build tools.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '使用 Turborepo 的 Monorepo 流水线' : 'Monorepo Pipeline with Turborepo'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# .github/workflows/monorepo-ci.yml\n' +
'name: Monorepo CI\n' +
'\n' +
'on:\n' +
'  push:\n' +
'    branches: [main]\n' +
'  pull_request:\n' +
'\n' +
'jobs:\n' +
'  changes:\n' +
'    runs-on: ubuntu-latest\n' +
'    outputs:\n' +
'      api: ${{ steps.filter.outputs.api }}\n' +
'      frontend: ${{ steps.filter.outputs.frontend }}\n' +
'      shared: ${{ steps.filter.outputs.shared }}\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: dorny/paths-filter@v3\n' +
'        id: filter\n' +
'        with:\n' +
'          filters: |\n' +
'            api:\n' +
'              - "packages/api/**"\n' +
'              - "packages/shared/**"\n' +
'            frontend:\n' +
'              - "packages/frontend/**"\n' +
'              - "packages/shared/**"\n' +
'            shared:\n' +
'              - "packages/shared/**"\n' +
'\n' +
'  test-api:\n' +
'    needs: changes\n' +
'    if: needs.changes.outputs.api == "true"\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with: { node-version: "20", cache: "npm" }\n' +
'      - run: npm ci\n' +
'      - run: npx turbo run test --filter=@myapp/api...\n' +
'\n' +
'  test-frontend:\n' +
'    needs: changes\n' +
'    if: needs.changes.outputs.frontend == "true"\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with: { node-version: "20", cache: "npm" }\n' +
'      - run: npm ci\n' +
'      - run: npx turbo run test --filter=@myapp/frontend...'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '流水线性能优化' : 'Pipeline Performance Optimization'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '依赖缓存' : 'Dependency Caching'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Cache node_modules across runs\n' +
'- name: Cache node modules\n' +
'  uses: actions/cache@v4\n' +
'  with:\n' +
'    path: |\n' +
'      ~/.npm\n' +
'      node_modules\n' +
'    key: ${{ runner.os }}-node-${{ hashFiles("**/package-lock.json") }}\n' +
'    restore-keys: |\n' +
'      ${{ runner.os }}-node-\n' +
'\n' +
'# For Python projects\n' +
'- uses: actions/setup-python@v5\n' +
'  with:\n' +
'    python-version: "3.12"\n' +
'    cache: "pip"\n' +
'\n' +
'# For Rust projects\n' +
'- uses: Swatinem/rust-cache@v2\n' +
'  with:\n' +
'    workspaces: ". -> target"\n' +
'\n' +
'# For Gradle (Android / Java)\n' +
'- name: Cache Gradle\n' +
'  uses: actions/cache@v4\n' +
'  with:\n' +
'    path: |\n' +
'      ~/.gradle/caches\n' +
'      ~/.gradle/wrapper\n' +
'    key: ${{ runner.os }}-gradle-${{ hashFiles("**/*.gradle*", "**/gradle-wrapper.properties") }}'
      }</pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? '并行化测试' : 'Test Parallelism'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Split test suite across 4 parallel jobs\n' +
'jobs:\n' +
'  test:\n' +
'    runs-on: ubuntu-latest\n' +
'    strategy:\n' +
'      matrix:\n' +
'        shard: [1, 2, 3, 4]\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with: { node-version: "20", cache: "npm" }\n' +
'      - run: npm ci\n' +
'      - name: Run test shard\n' +
'        run: |\n' +
'          npx jest \\\n' +
'            --shard=${{ matrix.shard }}/4 \\\n' +
'            --coverage \\\n' +
'            --ci'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '通知与状态检查' : 'Notifications and Status Checks'}
      </h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.75rem' }}>
        {isZh ? 'Slack 通知集成' : 'Slack Notification Integration'}
      </h3>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# Notify Slack on deployment success or failure\n' +
'- name: Notify Slack on success\n' +
'  if: success()\n' +
'  uses: slackapi/slack-github-action@v1\n' +
'  with:\n' +
'    channel-id: "deployments"\n' +
'    payload: |\n' +
'      {\n' +
'        "text": ":white_check_mark: Deployed to production",\n' +
'        "attachments": [{\n' +
'          "color": "good",\n' +
'          "fields": [\n' +
'            { "title": "Version", "value": "${{ github.sha }}", "short": true },\n' +
'            { "title": "Author", "value": "${{ github.actor }}", "short": true }\n' +
'          ]\n' +
'        }]\n' +
'      }\n' +
'  env:\n' +
'    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}\n' +
'\n' +
'- name: Notify Slack on failure\n' +
'  if: failure()\n' +
'  uses: slackapi/slack-github-action@v1\n' +
'  with:\n' +
'    channel-id: "deployments"\n' +
'    payload: |\n' +
'      {\n' +
'        "text": ":x: Production deployment FAILED",\n' +
'        "attachments": [{\n' +
'          "color": "danger",\n' +
'          "fields": [\n' +
'            { "title": "Run URL", "value": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}", "short": false }\n' +
'          ]\n' +
'        }]\n' +
'      }\n' +
'  env:\n' +
'    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? 'GitHub Actions vs GitLab CI vs CircleCI 对比' : 'GitHub Actions vs GitLab CI vs CircleCI Comparison'}
      </h2>

      <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', textAlign: 'left' }}>GitHub Actions</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', textAlign: 'left' }}>GitLab CI</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', textAlign: 'left' }}>CircleCI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Config file</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>.github/workflows/*.yml</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>.gitlab-ci.yml</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>.circleci/config.yml</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Free tier</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>2,000 min/month</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>400 min/month</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>6,000 min/month</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Marketplace</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>20,000+ actions</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Component catalog</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Orbs registry</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Self-hosted</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Self-hosted runners</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>GitLab Runner</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Self-hosted runners</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Docker support</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Services containers</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Services + DinD</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Native Docker layer</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Caching</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>actions/cache</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>cache: keyword</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>restore_cache step</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>OIDC cloud auth</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Yes (AWS/GCP/Azure)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Yes (ID tokens)</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Yes (OIDC contexts)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Best for</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>GitHub-hosted repos</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Self-hosted GitLab</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Speed-focused teams</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem', fontWeight: 600 }}>Parallelism</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Matrix + jobs</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Parallel + needs</td>
              <td style={{ border: '1px solid #e2e8f0', padding: '0.6rem 0.75rem' }}>Native parallel jobs</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '完整的生产级工作流示例' : 'Complete Production-Grade Workflow Example'}
      </h2>

      <p>
        {isZh
          ? '以下是一个真实的 Node.js 应用完整 CI/CD 工作流，覆盖从代码提交到生产部署的全流程：'
          : 'Here is a complete real-world CI/CD workflow for a Node.js application, from commit to production:'}
      </p>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '8px', padding: '1.25rem', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>{
'# .github/workflows/production.yml\n' +
'name: Production Pipeline\n' +
'\n' +
'on:\n' +
'  push:\n' +
'    branches: [main]\n' +
'  pull_request:\n' +
'    branches: [main]\n' +
'\n' +
'concurrency:\n' +
'  group: ${{ github.workflow }}-${{ github.ref }}\n' +
'  cancel-in-progress: true  # cancel stale PR runs\n' +
'\n' +
'env:\n' +
'  REGISTRY: ghcr.io\n' +
'  IMAGE_NAME: ${{ github.repository }}\n' +
'\n' +
'jobs:\n' +
'  quality:\n' +
'    name: Code Quality\n' +
'    runs-on: ubuntu-latest\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with:\n' +
'          node-version: "20"\n' +
'          cache: "npm"\n' +
'      - run: npm ci\n' +
'      - run: npm run lint\n' +
'      - run: npm run typecheck\n' +
'\n' +
'  test:\n' +
'    name: Tests\n' +
'    runs-on: ubuntu-latest\n' +
'    needs: quality\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: actions/setup-node@v4\n' +
'        with:\n' +
'          node-version: "20"\n' +
'          cache: "npm"\n' +
'      - run: npm ci\n' +
'      - run: npm test -- --coverage\n' +
'      - uses: codecov/codecov-action@v4\n' +
'\n' +
'  build-image:\n' +
'    name: Build Docker Image\n' +
'    runs-on: ubuntu-latest\n' +
'    needs: test\n' +
'    if: github.event_name == "push"\n' +
'    permissions:\n' +
'      contents: read\n' +
'      packages: write\n' +
'      id-token: write\n' +
'    outputs:\n' +
'      digest: ${{ steps.build.outputs.digest }}\n' +
'      image: ${{ steps.meta.outputs.tags }}\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: docker/setup-buildx-action@v3\n' +
'      - uses: docker/login-action@v3\n' +
'        with:\n' +
'          registry: ${{ env.REGISTRY }}\n' +
'          username: ${{ github.actor }}\n' +
'          password: ${{ secrets.GITHUB_TOKEN }}\n' +
'      - id: meta\n' +
'        uses: docker/metadata-action@v5\n' +
'        with:\n' +
'          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}\n' +
'      - id: build\n' +
'        uses: docker/build-push-action@v5\n' +
'        with:\n' +
'          push: true\n' +
'          tags: ${{ steps.meta.outputs.tags }}\n' +
'          cache-from: type=gha\n' +
'          cache-to: type=gha,mode=max\n' +
'\n' +
'  deploy-staging:\n' +
'    name: Deploy to Staging\n' +
'    runs-on: ubuntu-latest\n' +
'    needs: build-image\n' +
'    environment: staging\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - name: Configure AWS\n' +
'        uses: aws-actions/configure-aws-credentials@v4\n' +
'        with:\n' +
'          role-to-assume: ${{ secrets.AWS_STAGING_ROLE }}\n' +
'          aws-region: us-east-1\n' +
'      - run: |\n' +
'          aws ecs update-service \\\n' +
'            --cluster staging \\\n' +
'            --service myapp \\\n' +
'            --image-override ${{ needs.build-image.outputs.image }} \\\n' +
'            --force-new-deployment\n' +
'      - run: aws ecs wait services-stable --cluster staging --services myapp\n' +
'      - run: ./scripts/smoke-test.sh https://staging.myapp.com\n' +
'\n' +
'  deploy-production:\n' +
'    name: Deploy to Production\n' +
'    runs-on: ubuntu-latest\n' +
'    needs: deploy-staging\n' +
'    environment:\n' +
'      name: production\n' +
'      url: https://myapp.com\n' +
'    steps:\n' +
'      - uses: actions/checkout@v4\n' +
'      - uses: aws-actions/configure-aws-credentials@v4\n' +
'        with:\n' +
'          role-to-assume: ${{ secrets.AWS_PROD_ROLE }}\n' +
'          aws-region: us-east-1\n' +
'      - run: |\n' +
'          aws ecs update-service \\\n' +
'            --cluster production \\\n' +
'            --service myapp \\\n' +
'            --image-override ${{ needs.build-image.outputs.image }} \\\n' +
'            --force-new-deployment\n' +
'      - run: aws ecs wait services-stable --cluster production --services myapp\n' +
'      - name: Notify Slack\n' +
'        if: always()\n' +
'        uses: slackapi/slack-github-action@v1\n' +
'        with:\n' +
'          channel-id: deployments\n' +
'          payload: |\n' +
'            {\n' +
'              "text": "${{ job.status == \'success\' && \':white_check_mark: Production deploy succeeded\' || \':x: Production deploy FAILED\' }}"\n' +
'            }\n' +
'        env:\n' +
'          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}'
      }</pre>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '常见问题（FAQ）' : 'Frequently Asked Questions (FAQ)'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', margin: '1rem 0' }}>
        {faqSchema.mainEntity.map((faq, index) => (
          <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', margin: '0 0 0.5rem' }}>
              Q: {faq.name}
            </h3>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: '2.5rem' }}>
        {isZh ? '总结与推荐路径' : 'Summary and Recommended Path Forward'}
      </h2>

      <p>
        {isZh
          ? '构建 CI/CD 流水线的最佳策略是从简单开始，随着痛点出现逐步增加复杂度。对于大多数团队，推荐路径是：'
          : 'The best strategy for building CI/CD pipelines is to start simple and add complexity only as pain points emerge. For most teams, the recommended path is:'}
      </p>
      <ol style={{ paddingLeft: '1.5rem', color: '#334155', lineHeight: 2 }}>
        <li><strong>Week 1:</strong> {isZh ? '设置基本 CI（推送 → 测试），确保主干分支始终处于可部署状态' : 'Set up basic CI (push → test). Keep main always deployable.'}</li>
        <li><strong>Week 2:</strong> {isZh ? '添加 Docker 构建和推送到镜像仓库，添加自动部署到预发布环境' : 'Add Docker build and push to a registry. Add auto-deploy to staging.'}</li>
        <li><strong>Week 3:</strong> {isZh ? '添加依赖缓存和矩阵测试，优化构建速度' : 'Add caching and matrix tests. Optimize for build speed.'}</li>
        <li><strong>Week 4:</strong> {isZh ? '迁移到 OIDC 认证，消除长期凭证。添加通知和生产审批门' : 'Migrate to OIDC auth. Add notifications and production approval gates.'}</li>
        <li><strong>Beyond:</strong> {isZh ? '根据需要探索蓝绿/金丝雀部署、Monorepo 路径过滤和高级安全扫描' : 'Explore blue-green/canary deployments, monorepo path filtering, and advanced security scanning as needed.'}</li>
      </ol>

      <p style={{ color: '#475569', marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '6px', borderLeft: '4px solid #6366f1' }}>
        <strong>{isZh ? '核心原则：' : 'Core principle: '}</strong>
        {isZh
          ? '流水线失败不是问题——它是一个快速反馈机制，阻止了有问题的代码进入生产。一个从不失败的流水线要么不测试任何有意义的东西，要么没有保护任何东西。投资于让失败快速、明显且易于修复，而不是试图让流水线从不失败。'
          : 'A failing pipeline is not a problem — it is a fast feedback mechanism that stopped broken code from reaching users. A pipeline that never fails is either not testing anything meaningful or not protecting anything. Invest in making failures fast, obvious, and easy to fix rather than trying to make pipelines never fail.'}
      </p>
    </article>
  )
}
