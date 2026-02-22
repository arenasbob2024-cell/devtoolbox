'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Git Workflow Strategies: Gitflow, GitHub Flow, and Trunk-Based',
    intro: 'Your Git branching strategy directly impacts how fast your team ships code, how often deployments break, and how painful merge conflicts become. The three dominant strategies in 2026 are Gitflow, GitHub Flow, and Trunk-Based Development. Each makes different trade-offs between release control, development speed, and operational complexity. This guide explains each strategy in depth, with practical examples and a decision framework to help you choose.',

    gitflowTitle: 'Gitflow: Structured Release Management',
    gitflowDesc1: 'Gitflow, introduced by Vincent Driessen in 2010, uses multiple long-lived branches to manage releases. It is the most structured of the three strategies, with dedicated branches for features, releases, and hotfixes. Gitflow is designed for projects with scheduled releases, where each release goes through a formal testing and stabilization phase.',
    gitflowDesc2: 'The model uses five branch types: main (production code), develop (integration branch), feature branches (new work), release branches (release stabilization), and hotfix branches (urgent production fixes). Code flows from feature branches into develop, from develop into release branches, and finally into main.',
    gitflowBranches: 'Gitflow Branch Structure',
    gitflowCode: `# Gitflow in practice

# 1. Start a new feature
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# Work on the feature...
git add .
git commit -m "feat: add JWT authentication middleware"
git commit -m "feat: add login/logout endpoints"
git commit -m "test: add auth integration tests"

# 2. Finish feature — merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff feature/user-authentication
git push origin develop
git branch -d feature/user-authentication

# 3. Create a release branch when ready
git checkout develop
git checkout -b release/2.1.0

# Stabilize: only bug fixes allowed on release branch
git commit -m "fix: correct session timeout handling"
git commit -m "docs: update API documentation for v2.1"

# 4. Finish release — merge to main AND develop
git checkout main
git merge --no-ff release/2.1.0
git tag -a v2.1.0 -m "Release 2.1.0"
git push origin main --tags

git checkout develop
git merge --no-ff release/2.1.0
git push origin develop
git branch -d release/2.1.0

# 5. Hotfix for production issue
git checkout main
git checkout -b hotfix/2.1.1

git commit -m "fix: patch critical XSS vulnerability"

git checkout main
git merge --no-ff hotfix/2.1.1
git tag -a v2.1.1 -m "Hotfix 2.1.1"
git push origin main --tags

git checkout develop
git merge --no-ff hotfix/2.1.1
git push origin develop
git branch -d hotfix/2.1.1`,
    gitflowPros: 'Pros: Clear separation between development and production code. Well-suited for scheduled releases (e.g., bi-weekly or monthly). Release branches allow stabilization without blocking ongoing development. Easy to manage multiple versions in production.',
    gitflowCons: 'Cons: High complexity with five branch types. Merge conflicts are common, especially when release branches diverge from develop. Slow release cycle discourages continuous delivery. Overhead is excessive for small teams or projects with frequent deployments.',

    githubFlowTitle: 'GitHub Flow: Simple and Continuous',
    githubFlowDesc1: 'GitHub Flow is a lightweight branching strategy built around a single principle: anything in the main branch is deployable. Developers create short-lived feature branches from main, open pull requests for code review, and merge directly back to main. The main branch is always in a deployable state.',
    githubFlowDesc2: 'GitHub Flow is designed for continuous delivery. Every merged pull request can be (and often is) deployed immediately. There are no release branches, no develop branch, and no hotfix branches. The simplicity of this model makes it extremely popular among teams practicing continuous deployment.',
    githubFlowCode: `# GitHub Flow in practice

# 1. Create a feature branch from main
git checkout main
git pull origin main
git checkout -b add-search-functionality

# 2. Make commits with clear messages
git add .
git commit -m "feat: add search index builder"
git commit -m "feat: implement fuzzy search with Fuse.js"
git commit -m "test: add search result ranking tests"
git commit -m "feat: add search UI with keyboard shortcuts"

# 3. Push and open a Pull Request
git push -u origin add-search-functionality
# Open PR on GitHub for code review

# 4. Address review feedback
git commit -m "refactor: extract search scoring logic"
git push

# 5. Merge to main (squash or merge commit)
# After CI passes and review is approved:
# Click "Squash and merge" on GitHub
# Or from command line:
git checkout main
git pull origin main
git merge --squash add-search-functionality
git commit -m "feat: add fuzzy search with keyboard shortcuts (#142)"
git push origin main
git branch -d add-search-functionality

# 6. Deploy main to production
# This typically happens automatically via CI/CD
# e.g., Vercel auto-deploys on push to main`,
    githubFlowPros: 'Pros: Extremely simple — only main and feature branches. Low cognitive overhead for developers. Encourages small, frequent deployments. Pull requests naturally enforce code review. Works perfectly with CI/CD automation.',
    githubFlowCons: 'Cons: No built-in support for managing multiple versions or staged releases. Requires strong CI/CD and test coverage to keep main deployable. Feature flags needed for incomplete features. Not ideal for projects that need long stabilization phases.',

    trunkTitle: 'Trunk-Based Development: Maximum Velocity',
    trunkDesc1: 'Trunk-Based Development (TBD) takes simplicity to the extreme: all developers commit directly to a single branch (trunk/main), or use very short-lived branches (lasting hours, not days). The trunk is always in a releasable state because every commit is small, tested, and self-contained.',
    trunkDesc2: 'TBD requires a fundamentally different mindset. Instead of building complete features on branches and merging them, developers break features into tiny, independently deployable increments. Unfinished features are hidden behind feature flags. The key discipline is: every commit to trunk must be safe to deploy.',
    trunkCode: `# Trunk-Based Development in practice

# Option A: Direct commits to trunk
git checkout main
git pull origin main

# Make a small, self-contained change
git add .
git commit -m "feat: add search input component (hidden behind flag)"
git push origin main  # Triggers CI/CD

# Next small change
git commit -m "feat: add search API endpoint"
git push origin main

# Next increment
git commit -m "feat: wire search input to API"
git push origin main

# Enable the feature
git commit -m "feat: enable search feature flag for beta users"
git push origin main

# Option B: Short-lived branches (hours, not days)
git checkout main
git pull origin main
git checkout -b add-search-input  # Lives for 2-4 hours max

git add .
git commit -m "feat: add search input with debounced API call"

# Push and create a quick PR
git push -u origin add-search-input
# PR is reviewed quickly (< 1 hour), then merged

# Feature flags example
// featureFlags.ts
const flags = {
  SEARCH_ENABLED: process.env.SEARCH_ENABLED === 'true',
  NEW_CHECKOUT: process.env.NEW_CHECKOUT === 'true',
};

// Usage in component
function Header() {
  return (
    <nav>
      <Logo />
      {flags.SEARCH_ENABLED && <SearchBar />}
      <UserMenu />
    </nav>
  );
}

// Gradually roll out
// 1. Enable for internal team
// 2. Enable for 5% of users
// 3. Enable for 50% of users
// 4. Enable for 100% — remove flag`,
    trunkPros: 'Pros: Eliminates merge conflicts almost entirely (merges happen within hours). Maximum deployment velocity (multiple deploys per day). Forces small, reviewable commits. Keeps the codebase always releasable. Used by Google, Facebook, and other engineering organizations.',
    trunkCons: 'Cons: Requires mature CI/CD with fast, reliable test suites. Feature flags add complexity and technical debt if not managed properly. Demands high developer discipline — every commit must be safe to deploy. Not suitable for teams without strong automated testing.',

    comparisonTitle: 'Strategy Comparison',
    comparisonDesc: 'Compare the three strategies across key dimensions to find the best fit for your team:',

    cicdTitle: 'CI/CD Integration',
    cicdDesc: 'Each strategy integrates differently with CI/CD pipelines. The complexity of your pipeline should match your branching strategy.',
    cicdCode: `# GitHub Actions — CI/CD for GitHub Flow
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --coverage
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy to production
        run: npx vercel --prod --yes
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}

# Gitflow CI/CD would have additional workflows for:
# - develop branch (deploy to staging)
# - release/* branches (deploy to pre-production)
# - main branch (deploy to production)
# - hotfix/* branches (fast-track to production)`,

    branchNamingTitle: 'Branch Naming Conventions',
    branchNamingDesc: 'Consistent branch naming improves traceability, enables CI/CD automation, and makes the git log readable:',

    prTitle: 'Pull Request Best Practices',
    pr1: 'Keep PRs small: aim for under 400 lines of changes. Large PRs get rubber-stamped, not reviewed. Break big features into a series of small, mergeable PRs.',
    pr2: 'Write descriptive PR titles and descriptions. Include what changed, why it changed, and how to test it. Link to the relevant issue or ticket.',
    pr3: 'Use PR templates to standardize the information reviewers need. Include sections for description, testing steps, screenshots (if UI changes), and a checklist.',
    pr4: 'Require at least one approval before merging. For critical paths (auth, payments, data migrations), require two reviewers.',
    pr5: 'Run all CI checks before allowing merge. Block PRs with failing tests, lint errors, or type errors from being merged.',
    pr6: 'Prefer squash merges for feature branches to keep the main branch history clean and linear. Each squash commit represents one complete feature or fix.',

    commitTitle: 'Commit Message Conventions',
    commitDesc: 'Conventional Commits provide a structured format that enables automated changelogs, semantic versioning, and better git history:',
    commitCode: `# Conventional Commits format
# <type>(<scope>): <description>
#
# Types:
# feat:     New feature (minor version bump)
# fix:      Bug fix (patch version bump)
# docs:     Documentation only
# style:    Formatting, no code change
# refactor: Code change, no feature or fix
# perf:     Performance improvement
# test:     Adding/fixing tests
# chore:    Build process, dependencies
# ci:       CI/CD configuration

# Examples:
git commit -m "feat(auth): add OAuth 2.0 Google login"
git commit -m "fix(api): handle null response from payment gateway"
git commit -m "docs(readme): add deployment instructions"
git commit -m "refactor(db): migrate from raw SQL to Prisma ORM"
git commit -m "perf(images): add WebP conversion with lazy loading"
git commit -m "test(auth): add integration tests for JWT refresh"
git commit -m "chore(deps): upgrade Next.js to v16.1"

# Breaking changes (major version bump):
git commit -m "feat(api)!: change authentication from API key to OAuth"
# Or with body:
git commit -m "feat(api): migrate to v2 endpoint format

BREAKING CHANGE: All API endpoints now require /v2/ prefix.
Old endpoints will return 301 redirects for 90 days."`,

    decisionTitle: 'Decision Framework',
    decisionDesc: 'Use this framework to choose the right strategy based on your team and project characteristics:',

    faq1q: 'Can I switch between branching strategies?',
    faq1a: 'Yes, but the transition requires planning. Moving from Gitflow to GitHub Flow is relatively easy: stop creating release branches and deploy directly from main. Moving to Trunk-Based Development is harder because it requires investing in CI/CD automation, feature flags, and building the discipline of small commits. Start by shortening the lifespan of your feature branches before going full trunk-based.',
    faq2q: 'Which strategy does Google use?',
    faq2a: 'Google uses trunk-based development with a monorepo containing billions of lines of code. All 25,000+ engineers commit to a single trunk. They use extensive automated testing, code review on every change, and feature flags for gradual rollouts. However, Google built custom tooling over 20+ years to support this workflow.',
    faq3q: 'Do I need feature flags for trunk-based development?',
    faq3a: 'Feature flags are strongly recommended but not strictly required. Without them, every commit must be a complete, releasable change, which severely limits how you can break down large features. Feature flags let you merge incomplete features safely, test them in production with a subset of users, and roll back instantly without a code deployment. Tools like LaunchDarkly, Unleash, and Flagsmith make feature flag management straightforward.',
    faq4q: 'How do I handle database migrations with these strategies?',
    faq4a: 'Database migrations should be backward-compatible regardless of your branching strategy. Use the expand-contract pattern: first expand the schema (add new columns/tables), deploy code that writes to both old and new schemas, migrate data, then contract (remove old columns). This allows safe rollbacks at any point. With trunk-based development, each step is a separate commit and deployment.',
    faq5q: 'Is Gitflow dead in 2026?',
    faq5a: 'Gitflow is not dead, but its usage has declined significantly. It remains valuable for projects with formal release cycles (enterprise software, mobile apps with app store reviews, embedded systems). However, for web applications and SaaS products that deploy continuously, GitHub Flow or Trunk-Based Development are better fits. Even the creator of Gitflow has acknowledged that simpler models are preferable for continuous delivery.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'Git 工作流策略：Gitflow、GitHub Flow 和主干开发',
    intro: '你的 Git 分支策略直接影响团队发布代码的速度、部署出错的频率以及合并冲突的痛苦程度。2026 年三种主流策略是 Gitflow、GitHub Flow 和主干开发（Trunk-Based Development）。每种策略在发布控制、开发速度和运维复杂度之间做出不同的权衡。本指南深入讲解每种策略，提供实际示例和决策框架帮助你做出选择。',

    gitflowTitle: 'Gitflow：结构化发布管理',
    gitflowDesc1: 'Gitflow 由 Vincent Driessen 于 2010 年提出，使用多个长期分支来管理发布。它是三种策略中最结构化的，拥有专门的功能分支、发布分支和热修复分支。Gitflow 专为有计划发布周期的项目设计，每次发布都经过正式的测试和稳定阶段。',
    gitflowDesc2: '该模型使用五种分支类型：main（生产代码）、develop（集成分支）、功能分支（新功能开发）、发布分支（发布稳定化）和热修复分支（紧急生产修复）。代码从功能分支流入 develop，从 develop 流入发布分支，最终流入 main。',
    gitflowBranches: 'Gitflow 分支结构',
    gitflowCode: `# Gitflow 实践

# 1. 开始新功能
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# 开发功能...
git add .
git commit -m "feat: 添加 JWT 认证中间件"
git commit -m "feat: 添加登录/登出端点"

# 2. 完成功能 — 合并回 develop
git checkout develop
git merge --no-ff feature/user-authentication
git push origin develop

# 3. 创建发布分支
git checkout -b release/2.1.0
git commit -m "fix: 修正会话超时处理"

# 4. 完成发布 — 合并到 main 和 develop
git checkout main
git merge --no-ff release/2.1.0
git tag -a v2.1.0 -m "Release 2.1.0"

# 5. 生产热修复
git checkout main
git checkout -b hotfix/2.1.1
git commit -m "fix: 修补关键 XSS 漏洞"
git checkout main
git merge --no-ff hotfix/2.1.1
git tag -a v2.1.1 -m "Hotfix 2.1.1"`,
    gitflowPros: '优点：开发和生产代码清晰分离。适合有计划的发布周期。发布分支允许在不阻塞持续开发的情况下进行稳定化。易于管理生产中的多个版本。',
    gitflowCons: '缺点：五种分支类型带来高复杂度。合并冲突常见，尤其是发布分支与 develop 分支偏离时。缓慢的发布周期不利于持续交付。对小团队或频繁部署的项目来说开销过大。',

    githubFlowTitle: 'GitHub Flow：简单持续',
    githubFlowDesc1: 'GitHub Flow 是围绕单一原则构建的轻量级分支策略：main 分支中的所有代码都是可部署的。开发者从 main 创建短期功能分支，通过 Pull Request 进行代码审查，然后直接合并回 main。main 分支始终处于可部署状态。',
    githubFlowDesc2: 'GitHub Flow 专为持续交付设计。每个合并的 Pull Request 都可以（且经常是）立即部署。没有发布分支、没有 develop 分支、没有热修复分支。这种模型的简洁性使其在实践持续部署的团队中极为流行。',
    githubFlowCode: `# GitHub Flow 实践

# 1. 从 main 创建功能分支
git checkout main
git pull origin main
git checkout -b add-search-functionality

# 2. 清晰的提交信息
git commit -m "feat: 添加搜索索引构建器"
git commit -m "feat: 实现 Fuse.js 模糊搜索"
git commit -m "test: 添加搜索结果排序测试"

# 3. 推送并创建 Pull Request
git push -u origin add-search-functionality

# 4. 审查通过后合并到 main
git checkout main
git merge --squash add-search-functionality
git commit -m "feat: 添加带键盘快捷键的模糊搜索 (#142)"
git push origin main

# 5. 自动部署到生产环境`,
    githubFlowPros: '优点：极其简单 — 只有 main 和功能分支。开发者认知负担低。鼓励小型、频繁的部署。Pull Request 自然地强制代码审查。与 CI/CD 自动化完美配合。',
    githubFlowCons: '缺点：没有内置的多版本或分阶段发布支持。需要强大的 CI/CD 和测试覆盖率来保持 main 可部署。不完整的功能需要功能标志。不适合需要长期稳定阶段的项目。',

    trunkTitle: '主干开发：最大速度',
    trunkDesc1: '主干开发（TBD）将简单性发挥到极致：所有开发者直接提交到单一分支（trunk/main），或使用非常短期的分支（持续数小时而非数天）。主干始终处于可发布状态，因为每次提交都是小型的、经过测试的、自包含的。',
    trunkDesc2: 'TBD 需要根本不同的思维方式。开发者不是在分支上构建完整功能然后合并，而是将功能拆分为微小的、可独立部署的增量。未完成的功能隐藏在功能标志后面。核心纪律是：每次提交到主干的代码必须安全可部署。',
    trunkCode: `# 主干开发实践

# 选项 A：直接提交到主干
git checkout main
git pull origin main

# 小型、自包含的变更
git commit -m "feat: 添加搜索输入组件（功能标志隐藏）"
git push origin main  # 触发 CI/CD

# 下一个小变更
git commit -m "feat: 添加搜索 API 端点"
git push origin main

# 功能标志示例
const flags = {
  SEARCH_ENABLED: process.env.SEARCH_ENABLED === 'true',
};

// 渐进式推出
// 1. 内部团队启用
// 2. 5% 用户启用
// 3. 50% 用户启用
// 4. 100% — 移除标志`,
    trunkPros: '优点：几乎完全消除合并冲突（合并在数小时内发生）。最大部署速度（每天多次部署）。强制小型、可审查的提交。代码库始终可发布。被 Google、Facebook 等工程组织使用。',
    trunkCons: '缺点：需要成熟的 CI/CD 和快速、可靠的测试套件。功能标志如管理不当会增加复杂度和技术债务。要求高开发者纪律 — 每次提交必须安全可部署。不适合没有强自动化测试的团队。',

    comparisonTitle: '策略对比',
    comparisonDesc: '从关键维度比较三种策略，找到最适合你团队的方案：',

    cicdTitle: 'CI/CD 集成',
    cicdDesc: '每种策略与 CI/CD 流水线的集成方式不同。流水线的复杂度应与分支策略匹配。',
    cicdCode: `# GitHub Actions — GitHub Flow 的 CI/CD
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: npx vercel --prod --yes`,

    branchNamingTitle: '分支命名约定',
    branchNamingDesc: '一致的分支命名提高可追溯性，支持 CI/CD 自动化，并使 git 日志更可读：',

    prTitle: 'Pull Request 最佳实践',
    pr1: '保持 PR 小型化：目标控制在 400 行以内。大型 PR 会被草草审核而非认真审查。将大功能拆分为一系列小的、可合并的 PR。',
    pr2: '编写描述性的 PR 标题和说明。包含改了什么、为什么改、如何测试。链接相关的 Issue 或 Ticket。',
    pr3: '使用 PR 模板标准化审查者需要的信息。包含描述、测试步骤、截图（如有 UI 变更）和检查清单。',
    pr4: '合并前至少需要一个批准。对关键路径（认证、支付、数据迁移）要求两位审查者。',
    pr5: '合并前运行所有 CI 检查。阻止测试失败、lint 错误或类型错误的 PR 合并。',
    pr6: '功能分支优先使用压缩合并（squash merge），保持 main 分支历史干净线性。每个压缩提交代表一个完整的功能或修复。',

    commitTitle: '提交信息约定',
    commitDesc: '约定式提交（Conventional Commits）提供结构化格式，支持自动化更新日志、语义化版本和更好的 git 历史：',
    commitCode: `# 约定式提交格式
# <类型>(<范围>): <描述>
#
# 类型:
# feat:     新功能（次版本号递增）
# fix:      Bug 修复（补丁版本号递增）
# docs:     仅文档变更
# refactor: 代码重构
# test:     添加/修复测试
# chore:    构建流程、依赖

# 示例:
git commit -m "feat(auth): 添加 OAuth 2.0 Google 登录"
git commit -m "fix(api): 处理支付网关的空响应"
git commit -m "refactor(db): 从原生 SQL 迁移到 Prisma ORM"

# 破坏性变更（主版本号递增）:
git commit -m "feat(api)!: 将认证从 API Key 改为 OAuth"`,

    decisionTitle: '决策框架',
    decisionDesc: '根据你的团队和项目特征，使用此框架选择正确的策略：',

    faq1q: '可以在分支策略之间切换吗？',
    faq1a: '可以，但过渡需要规划。从 Gitflow 迁移到 GitHub Flow 相对容易：停止创建发布分支，直接从 main 部署。迁移到主干开发更困难，因为需要投资 CI/CD 自动化、功能标志，并建立小提交的纪律。建议先缩短功能分支的生命周期，再逐步过渡到完全的主干开发。',
    faq2q: 'Google 使用哪种策略？',
    faq2a: 'Google 使用主干开发，单一代码仓库包含数十亿行代码。所有 25,000+ 工程师提交到同一个主干。他们使用广泛的自动化测试、每次变更都有代码审查、功能标志进行渐进式推出。但 Google 花了 20+ 年构建自定义工具来支持这种工作流。',
    faq3q: '主干开发必须使用功能标志吗？',
    faq3a: '强烈推荐但不是必需的。没有功能标志，每次提交都必须是完整的、可发布的变更，这严重限制了如何拆分大功能。功能标志让你安全合并未完成的功能、在生产中对部分用户测试、无需代码部署即可即时回滚。LaunchDarkly、Unleash 和 Flagsmith 等工具让功能标志管理变得简单。',
    faq4q: '这些策略下如何处理数据库迁移？',
    faq4a: '无论使用哪种分支策略，数据库迁移都应向后兼容。使用扩展-收缩模式：先扩展 schema（添加新列/表），部署同时写入新旧 schema 的代码，迁移数据，然后收缩（移除旧列）。这允许在任何时点安全回滚。在主干开发中，每一步都是独立的提交和部署。',
    faq5q: 'Gitflow 在 2026 年过时了吗？',
    faq5a: 'Gitflow 没有过时，但使用率已显著下降。对于有正式发布周期的项目（企业软件、需要应用商店审核的移动应用、嵌入式系统），它仍然很有价值。但对于持续部署的 Web 应用和 SaaS 产品，GitHub Flow 或主干开发更合适。即使是 Gitflow 的创建者也承认，对于持续交付来说更简单的模型更好。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function GitWorkflowStrategies({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Gitflow */}
      <h2 style={h2Style}>{ct.gitflowTitle}</h2>
      <p style={pStyle}>{ct.gitflowDesc1}</p>
      <p style={pStyle}>{ct.gitflowDesc2}</p>
      <h3 style={h3Style}>{ct.gitflowBranches}</h3>
      <pre style={codeStyle}><code>{ct.gitflowCode}</code></pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.gitflowPros}</div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.gitflowCons}</div>
      </div>

      {/* GitHub Flow */}
      <h2 style={h2Style}>{ct.githubFlowTitle}</h2>
      <p style={pStyle}>{ct.githubFlowDesc1}</p>
      <p style={pStyle}>{ct.githubFlowDesc2}</p>
      <pre style={codeStyle}><code>{ct.githubFlowCode}</code></pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.githubFlowPros}</div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.githubFlowCons}</div>
      </div>

      {/* Trunk-Based */}
      <h2 style={h2Style}>{ct.trunkTitle}</h2>
      <p style={pStyle}>{ct.trunkDesc1}</p>
      <p style={pStyle}>{ct.trunkDesc2}</p>
      <pre style={codeStyle}><code>{ct.trunkCode}</code></pre>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.trunkPros}</div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.trunkCons}</div>
      </div>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Dimension</th>
              <th style={thStyle}>Gitflow</th>
              <th style={thStyle}>GitHub Flow</th>
              <th style={thStyle}>Trunk-Based</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Complexity', 'High (5 branch types)', 'Low (2 branch types)', 'Minimal (1 branch)'],
              ['Release Cadence', 'Scheduled (weekly/monthly)', 'Continuous', 'Continuous (multiple/day)'],
              ['Merge Conflicts', 'Frequent', 'Occasional', 'Rare'],
              ['CI/CD Required', 'Helpful', 'Required', 'Critical'],
              ['Feature Flags', 'Not needed', 'Helpful', 'Essential'],
              ['Team Size', 'Large teams', 'Any size', 'Disciplined teams'],
              ['Code Review', 'Pre-merge to develop', 'PR to main', 'Pre-commit or quick PR'],
              ['Rollback', 'Revert release', 'Revert commit', 'Feature flag toggle'],
              ['Best For', 'Versioned releases', 'Web apps, SaaS', 'High-velocity teams'],
            ].map(([dim, gitflow, github, trunk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{dim}</td>
                <td style={tdStyle}>{gitflow}</td>
                <td style={tdStyle}>{github}</td>
                <td style={tdStyle}>{trunk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CI/CD */}
      <h2 style={h2Style}>{ct.cicdTitle}</h2>
      <p style={pStyle}>{ct.cicdDesc}</p>
      <pre style={codeStyle}><code>{ct.cicdCode}</code></pre>

      {/* Branch Naming */}
      <h2 style={h2Style}>{ct.branchNamingTitle}</h2>
      <p style={pStyle}>{ct.branchNamingDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Pattern</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Feature', 'feature/<description>', 'feature/add-search-bar'],
              ['Bug Fix', 'fix/<description>', 'fix/login-timeout-error'],
              ['Hotfix', 'hotfix/<version>', 'hotfix/2.1.1'],
              ['Release', 'release/<version>', 'release/3.0.0'],
              ['Chore', 'chore/<description>', 'chore/upgrade-dependencies'],
              ['Docs', 'docs/<description>', 'docs/api-authentication-guide'],
            ].map(([type, pattern, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}><code>{pattern}</code></td>
                <td style={tdStyle}><code>{example}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PR Best Practices */}
      <h2 style={h2Style}>{ct.prTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.pr1}</li><li>{ct.pr2}</li><li>{ct.pr3}</li><li>{ct.pr4}</li><li>{ct.pr5}</li><li>{ct.pr6}</li>
      </ul>

      {/* Commit Conventions */}
      <h2 style={h2Style}>{ct.commitTitle}</h2>
      <p style={pStyle}>{ct.commitDesc}</p>
      <pre style={codeStyle}><code>{ct.commitCode}</code></pre>

      {/* Decision Framework */}
      <h2 style={h2Style}>{ct.decisionTitle}</h2>
      <p style={pStyle}>{ct.decisionDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Scenario</th>
              <th style={thStyle}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Mobile app with app store releases', 'Gitflow'],
              ['Enterprise software with versioned releases', 'Gitflow'],
              ['SaaS web application', 'GitHub Flow or Trunk-Based'],
              ['Small team (1-5 devs)', 'GitHub Flow'],
              ['Open source project', 'GitHub Flow'],
              ['Large engineering org (50+ devs)', 'Trunk-Based'],
              ['Startup moving fast', 'GitHub Flow or Trunk-Based'],
              ['Embedded systems / firmware', 'Gitflow'],
              ['Microservices architecture', 'GitHub Flow or Trunk-Based'],
              ['Monorepo with multiple teams', 'Trunk-Based'],
            ].map(([scenario, rec], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
