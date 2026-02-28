'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr: 'Conventional Commits is a specification for writing standardized commit messages that follows the format type(scope): description. It enables automated versioning with Semantic Versioning (SemVer), automatic CHANGELOG generation, and streamlined CI/CD pipelines. With tools like Commitlint, Commitizen, Semantic Release, and Release Please, teams can fully automate their release workflow. In 2026, Conventional Commits has become the de facto standard adopted by Angular, Vue, Babel, Electron, and thousands of open-source projects and enterprises.',
    takeaway1: 'Conventional Commits follows the format type(scope): description with optional body and footer sections',
    takeaway2: 'Commit types like feat and fix directly map to SemVer MINOR and PATCH version bumps',
    takeaway3: 'Breaking changes (BREAKING CHANGE footer or ! after type) trigger a MAJOR version bump',
    takeaway4: 'Commitlint + Husky enforces the convention locally; GitHub Actions enforces it in CI',
    takeaway5: 'Semantic Release and Release Please fully automate versioning, changelogs, and npm publishing',
    takeaway6: 'Monorepo tools like Changesets, Lerna, and Turborepo integrate natively with Conventional Commits',

    intro: 'Conventional Commits is a lightweight specification layered on top of commit messages that provides a structured format for communicating the nature of changes in a codebase. By following a simple convention, teams unlock automated versioning, changelog generation, and release management. This guide covers everything from the specification itself to full CI/CD automation with real configuration files you can copy into your projects today.',

    h2What: 'What Are Conventional Commits and Why They Matter',
    whatP1: 'Conventional Commits is a specification that defines a standard format for commit messages. The format is simple: each commit message consists of a type, an optional scope, and a description. The commit body and footer provide additional context. This structure makes commits machine-readable, enabling tools to automate versioning and changelog generation.',
    whatP2: 'Without a commit convention, changelogs must be written manually, version bumps are guesswork, and the commit history becomes an unreadable stream of messages like "fix stuff", "wip", and "final update". Conventional Commits solves all of this by giving every commit a clear semantic meaning.',
    whatP3: 'The specification was inspired by the Angular commit guidelines and has since become its own independent standard. In 2026, it is adopted by thousands of projects including Vue.js, Babel, Electron, Yargs, Lerna, and many enterprise codebases.',

    h2Format: 'The Specification Format',
    formatP1: 'Every conventional commit message follows this structure. The type and description are required. The scope, body, and footer are optional. The header (first line) should not exceed 72 characters.',

    h2Types: 'Commit Types Reference',
    typesP1: 'The specification defines two required types (feat and fix) and recommends several others. Here is the complete list of commonly used commit types and their purpose:',
    typesFeat: 'feat — A new feature for the user. Triggers a MINOR version bump.',
    typesFix: 'fix — A bug fix for the user. Triggers a PATCH version bump.',
    typesDocs: 'docs — Documentation-only changes (README, JSDoc, inline comments).',
    typesStyle: 'style — Code style changes that do not affect logic (whitespace, formatting, semicolons).',
    typesRefactor: 'refactor — Code restructuring that neither fixes a bug nor adds a feature.',
    typesPerf: 'perf — Performance improvements. Often triggers a PATCH version bump.',
    typesTest: 'test — Adding or correcting tests. No version bump.',
    typesBuild: 'build — Changes to the build system or external dependencies (webpack, npm, Gradle).',
    typesCi: 'ci — Changes to CI configuration files and scripts (GitHub Actions, CircleCI, Jenkins).',
    typesChore: 'chore — Routine tasks that do not modify src or test files (release scripts, configs).',
    typesRevert: 'revert — Reverts a previous commit. Should reference the reverted commit hash in the body.',

    h2Scope: 'Scope Conventions and Best Practices',
    scopeP1: 'The scope provides additional context about what part of the codebase is affected. It is enclosed in parentheses after the type. Scopes should be consistent across the project and documented in your contributing guide.',
    scopeP2: 'Common scope strategies include using module names (auth, api, ui), layer names (controller, service, model), or feature areas (checkout, onboarding, dashboard). In monorepos, the package name is typically used as the scope.',

    h2Breaking: 'Breaking Changes',
    breakingP1: 'Breaking changes are the most important thing to communicate in a commit message because they trigger a MAJOR version bump. There are two ways to indicate a breaking change:',
    breakingP2: 'The first method uses the BREAKING CHANGE footer (must be uppercase) in the commit footer. The second method appends an exclamation mark (!) after the type or scope. Both methods can be combined for maximum clarity.',

    h2Examples: 'Real-World Commit Message Examples',
    examplesP1: 'Here are examples of good and bad commit messages. Good messages follow the convention and provide clear context. Bad messages are vague, inconsistent, or missing the type prefix.',

    h2Semver: 'Semantic Versioning Integration',
    semverP1: 'Conventional Commits maps directly to Semantic Versioning (SemVer). This mapping is what makes automated version bumps possible. Understanding this relationship is crucial for setting up automation.',
    semverP2: 'When a release is generated, the tool scans all commits since the last release. If any commit has a BREAKING CHANGE, the major version is bumped. Otherwise, if any commit has type feat, the minor version is bumped. Otherwise, fix and perf commits cause a patch bump. Types like docs, style, refactor, test, build, ci, and chore do not trigger any release by default.',

    h2Commitlint: 'Commitlint Setup',
    commitlintP1: 'Commitlint is a linter for commit messages. It checks that every commit message follows the Conventional Commits specification. Combined with Husky, it runs automatically on every commit, preventing non-conforming messages from entering the repository.',
    commitlintP2: 'Install commitlint and the conventional config, then create a configuration file and set up a Husky commit-msg hook:',

    h2Commitizen: 'Commitizen (cz-cli) for Interactive Commits',
    commitizenP1: 'Commitizen provides an interactive prompt for writing conventional commit messages. Developers answer questions about type, scope, and description instead of typing the format manually. This eliminates formatting errors and makes onboarding new team members easier.',

    h2StandardVersion: 'Standard Version and Release Please',
    svP1: 'Standard Version is a utility for versioning that follows SemVer and the Conventional Commits specification. It reads your commit history, determines the version bump, updates package.json, generates or updates CHANGELOG.md, and creates a git tag. Note: Standard Version is now deprecated in favor of Release Please.',
    svP2: 'Release Please is the Google-maintained successor to Standard Version. It creates release pull requests that include version bumps and changelog updates. When the PR is merged, the release is published.',

    h2SemanticRelease: 'Semantic Release: Fully Automated Publishing',
    srP1: 'Semantic Release takes automation to the maximum. It analyzes commits, determines the version bump, generates release notes, publishes to npm (or other registries), creates GitHub releases, and updates changelogs. It is the gold standard for fully automated publishing in 2026.',
    srP2: 'Here is a complete Semantic Release configuration for a typical Node.js project:',

    h2GithubActions: 'GitHub Actions for Commit Linting in CI',
    gaP1: 'Even with local hooks, CI-level enforcement is essential because hooks can be bypassed. A GitHub Actions workflow that lints commit messages ensures no non-conforming commits reach the main branch.',

    h2Monorepo: 'Monorepo Conventions',
    monorepoP1: 'Monorepos present unique challenges for Conventional Commits because a single repository contains multiple packages. The scope field becomes essential for identifying which package a commit affects. Here are the major approaches:',
    monorepoP2: 'Changesets is a popular tool for monorepo versioning. It uses a separate changeset file instead of relying solely on commit messages. Each PR adds a changeset file that describes the change and its impact. During release, Changesets reads all pending changesets, bumps versions, and generates changelogs for each affected package.',

    h2Comparison: 'Angular vs Conventional Commits vs Gitmoji',
    compP1: 'Three commit conventions are widely used in 2026. Angular Commit Convention is the original inspiration for Conventional Commits and uses the same type(scope): description format. Conventional Commits is a standalone specification that is lighter and more flexible. Gitmoji uses emoji prefixes instead of text types. Here is how they compare:',
    thConvention: 'Aspect',
    thAngular: 'Angular',
    thConventional: 'Conventional Commits',
    thGitmoji: 'Gitmoji',
    compFormat: 'Format',
    compTools: 'Tooling',
    compSemver: 'SemVer mapping',
    compAdoption: 'Adoption',
    compReadability: 'Readability',
    compFlexibility: 'Flexibility',
    valAngularFmt: 'type(scope): subject',
    valConvFmt: 'type(scope): description',
    valGitmojiFmt: ':emoji: description',
    valAngularTools: 'Commitlint, ng-commit',
    valConvTools: 'Commitlint, Commitizen, SR',
    valGitmojiTools: 'gitmoji-cli, gitmoji-changelog',
    valAngularSemver: 'Yes (strict)',
    valConvSemver: 'Yes (built-in)',
    valGitmojiSemver: 'Partial',
    valAngularAdopt: 'Angular ecosystem',
    valConvAdopt: 'Universal (most popular)',
    valGitmojiAdopt: 'Growing niche',
    valAngularRead: 'Good',
    valConvRead: 'Good',
    valGitmojiRead: 'Visual (emoji-dependent)',
    valAngularFlex: 'Strict',
    valConvFlex: 'Extensible',
    valGitmojiFlex: 'Flexible',

    h2Changelog: 'Auto-Generating CHANGELOG.md',
    changelogP1: 'Conventional Commits enables fully automatic changelog generation. Tools read the commit history, group changes by type, and produce a well-formatted markdown file. Here is what the tools generate:',

    h2PrTitle: 'PR Title Conventions',
    prP1: 'Many teams enforce Conventional Commits format on pull request titles as well. When using squash merging, the PR title becomes the merge commit message, making PR title linting just as important as commit message linting. GitHub Actions can enforce this:',

    h2TeamAdoption: 'Team Adoption Guide',
    teamP1: 'Adopting Conventional Commits across a team requires a gradual rollout. Forcing a new convention overnight leads to frustration and resistance. Here is a proven four-phase adoption strategy:',
    teamPhase1: 'Phase 1 (Week 1-2): Introduce the specification in a team meeting. Share this guide. Add a CONTRIBUTING.md section explaining the convention. No enforcement yet — just awareness.',
    teamPhase2: 'Phase 2 (Week 3-4): Add Commitizen so developers can use the interactive prompt. Set up Commitlint with a warning-only mode. Create a shared .gitmessage template. Developers can opt in gradually.',
    teamPhase3: 'Phase 3 (Month 2): Enable Commitlint enforcement locally with Husky. Add CI linting as a required check. All new commits must follow the convention. Old history is not retroactively changed.',
    teamPhase4: 'Phase 4 (Month 3+): Automate releases with Semantic Release or Release Please. Generate changelogs automatically. The convention now pays dividends through full automation.',

    h2IDE: 'IDE Integrations',
    ideP1: 'VS Code and JetBrains IDEs offer extensions that make writing conventional commits easier. These integrations provide autocomplete for types, scope suggestions, and inline validation.',
    ideVscode: 'VS Code: Install the Conventional Commits extension (vivaxy.vscode-conventional-commits). It adds a source control panel widget that guides you through writing a commit message with type selection, optional scope, description, body, and breaking change fields. The extension also supports custom types and scopes via .vscode/settings.json.',
    ideJetbrains: 'JetBrains (IntelliJ, WebStorm, PyCharm): Install the Conventional Commit plugin from the marketplace. It provides a popup dialog when committing that ensures the message follows the convention. It supports custom scopes from your commitlint configuration.',

    h2CustomTypes: 'Custom Commit Types and Extending the Spec',
    customP1: 'The Conventional Commits specification is intentionally minimal — it only mandates feat and fix. Teams are free to add custom types for their specific workflows. This is done by extending the commitlint configuration:',
    customP2: 'Some popular custom types include deps (dependency updates), release (release commits), wip (work in progress — usually rejected in CI), security (security-related changes), and i18n (internationalization changes).',

    h2Template: 'Commit Message Templates (.gitmessage)',
    templateP1: 'A git commit message template helps developers remember the format without memorizing the specification. Create a .gitmessage file in your project root and configure git to use it:',

    h2Husky: 'Pre-Commit Hooks with Husky + lint-staged',
    huskyP1: 'Husky manages git hooks, and lint-staged runs linters on staged files. Together with Commitlint, they create a robust local enforcement pipeline. Here is the complete setup:',

    h2Mistakes: 'Common Mistakes and How to Fix Them',
    mistakesP1: 'Even experienced developers make mistakes with Conventional Commits. Here are the most common errors and their solutions:',
    mistake1: 'Using uppercase types — Type must be lowercase: feat, not Feat or FEAT. Fix: commitlint enforces this by default.',
    mistake2: 'Missing colon after type — The format is type: description not type description. The colon and space after the type (or scope) are required.',
    mistake3: 'Writing too-long headers — Keep the first line under 72 characters. Move details to the commit body. Commitlint has a header-max-length rule (default 100).',
    mistake4: 'Using wrong types — Using fix when the change is actually a refactor, or feat when it is docs. Each type has specific semantics tied to SemVer. Misusing them causes incorrect version bumps.',
    mistake5: 'Forgetting BREAKING CHANGE footer — Adding ! after the type is not enough for some tools. Always include the BREAKING CHANGE: footer with a description of what breaks and the migration path.',
    mistake6: 'Inconsistent scopes — Using auth in one commit and authentication in another. Document your allowed scopes in commitlint config and enforce them.',
    mistake7: 'Giant commits with multiple changes — One commit should represent one logical change. If you need "feat(auth): add login and fix(ui): fix button" in one commit, it should be two separate commits.',

    h2Granularity: 'Best Practices for Commit Granularity',
    granularityP1: 'Each commit should represent a single, atomic, logical change. A good test: can you describe the commit in one sentence without using "and"? If not, it should probably be multiple commits.',
    granularityP2: 'For features, break the work into small commits: one for the data model, one for the API endpoint, one for the UI component, and one for the tests. This makes code review easier, bisecting simpler, and reverting safer.',
    granularityP3: 'Never mix formatting changes with logic changes. If you need to reformat a file and fix a bug, do them in separate commits: style(utils): format helper functions followed by fix(utils): correct null check in parseConfig. This way, the formatting commit can be safely ignored during code review.',

    h2FAQ: 'Frequently Asked Questions',
    faq1Q: 'What is the Conventional Commits specification?',
    faq1A: 'Conventional Commits is a convention for writing standardized commit messages. Each message follows the format type(scope): description, where type indicates the nature of the change (feat, fix, docs, etc.), scope optionally identifies the affected area, and description summarizes the change. The convention enables automated versioning, changelog generation, and CI/CD automation.',
    faq2Q: 'How do Conventional Commits relate to Semantic Versioning?',
    faq2A: 'Conventional Commits maps directly to SemVer. A feat commit triggers a MINOR version bump (1.0.0 to 1.1.0). A fix commit triggers a PATCH bump (1.0.0 to 1.0.1). A commit with BREAKING CHANGE triggers a MAJOR bump (1.0.0 to 2.0.0). Other types like docs, style, and refactor do not trigger any version change by default.',
    faq3Q: 'How do I set up Commitlint with Husky?',
    faq3A: 'Install @commitlint/cli and @commitlint/config-conventional with npm. Create a commitlint.config.js file that extends the conventional config. Then install Husky, run npx husky init, and create a .husky/commit-msg hook that runs npx commitlint --edit. Every commit message will now be validated against the Conventional Commits specification.',
    faq4Q: 'What is the difference between Semantic Release and Release Please?',
    faq4A: 'Semantic Release is a fully automated tool that determines versions, generates changelogs, publishes to npm, and creates GitHub releases on every CI run. Release Please (by Google) creates a release pull request that accumulates changes; the release only happens when you merge the PR. Release Please gives you a review step before publishing.',
    faq5Q: 'Can I use Conventional Commits in a monorepo?',
    faq5A: 'Yes. Use the scope field to identify which package is affected (e.g., feat(api): add endpoint). Tools like Changesets, Lerna, and Release Please have built-in monorepo support. They can independently version each package based on its scoped commits and generate per-package changelogs.',
    faq6Q: 'What happens if I make a mistake in a commit message?',
    faq6A: 'If you have not pushed yet, use git commit --amend to rewrite the last commit message. For older commits, use git rebase -i to edit specific commit messages. If the commit is already pushed and merged, it is best to leave it and ensure future commits follow the convention. Commitlint with Husky prevents these mistakes proactively.',
    faq7Q: 'Should I use Conventional Commits for PR titles too?',
    faq7A: 'Yes, especially if your team uses squash merging. When PRs are squash-merged, the PR title becomes the merge commit message. Tools like action-semantic-pull-request can lint PR titles in CI. This ensures the final commit on the main branch follows the convention even if individual commits in the PR branch do not.',
    faq8Q: 'How do I handle revert commits with Conventional Commits?',
    faq8A: 'Use the revert type followed by the original commit description: revert: feat(auth): add OAuth login. In the commit body, include the hash of the reverted commit: This reverts commit abc1234. Some tools like Semantic Release will detect the revert and adjust the version accordingly, potentially removing a feature from the next release.',

    relatedTitle: 'Related Tools and Guides',
  },
  zh: {
    tldr: 'Conventional Commits 是一个用于编写标准化提交消息的规范，遵循 type(scope): description 格式。它支持使用语义化版本（SemVer）自动版本管理、自动 CHANGELOG 生成和流水线化的 CI/CD 管道。借助 Commitlint、Commitizen、Semantic Release 和 Release Please 等工具，团队可以完全自动化发布流程。在 2026 年，Conventional Commits 已成为 Angular、Vue、Babel、Electron 和数千个开源项目和企业采用的事实标准。',
    takeaway1: 'Conventional Commits 遵循 type(scope): description 格式，附带可选的 body 和 footer 部分',
    takeaway2: 'feat 和 fix 等提交类型直接对应 SemVer 的 MINOR 和 PATCH 版本升级',
    takeaway3: '破坏性变更（BREAKING CHANGE footer 或类型后的 !）触发 MAJOR 版本升级',
    takeaway4: 'Commitlint + Husky 在本地强制执行规范；GitHub Actions 在 CI 中强制执行',
    takeaway5: 'Semantic Release 和 Release Please 完全自动化版本管理、变更日志和 npm 发布',
    takeaway6: 'Changesets、Lerna 和 Turborepo 等 Monorepo 工具原生集成 Conventional Commits',

    intro: 'Conventional Commits 是一个叠加在提交消息之上的轻量级规范，提供了一种结构化格式来传达代码库变更的性质。通过遵循一个简单的约定，团队可以实现自动化版本管理、变更日志生成和发布管理。本指南涵盖了从规范本身到完整 CI/CD 自动化的所有内容，包括可以直接复制到项目中的真实配置文件。',

    h2What: '什么是 Conventional Commits 以及为什么重要',
    whatP1: 'Conventional Commits 是一个定义提交消息标准格式的规范。格式简单：每条提交消息由类型、可选的范围和描述组成。提交正文和脚注提供额外上下文。这种结构使提交对机器可读，使工具能够自动化版本管理和变更日志生成。',
    whatP2: '没有提交规范，变更日志必须手动编写，版本升级靠猜测，提交历史变成一堆不可读的消息，如"修了点东西"、"wip"和"最终更新"。Conventional Commits 通过给每次提交赋予清晰的语义含义来解决所有这些问题。',
    whatP3: '该规范受 Angular 提交指南启发，后来发展为独立标准。在 2026 年，它被数千个项目采用，包括 Vue.js、Babel、Electron、Yargs、Lerna 和许多企业代码库。',

    h2Format: '规范格式',
    formatP1: '每条 conventional commit 消息遵循以下结构。type 和 description 是必需的。scope、body 和 footer 是可选的。头部（第一行）不应超过 72 个字符。',

    h2Types: '提交类型参考',
    typesP1: '规范定义了两个必需类型（feat 和 fix）并推荐了其他几个。以下是常用提交类型及其用途的完整列表：',
    typesFeat: 'feat — 面向用户的新功能。触发 MINOR 版本升级。',
    typesFix: 'fix — 面向用户的 bug 修复。触发 PATCH 版本升级。',
    typesDocs: 'docs — 仅文档变更（README、JSDoc、行内注释）。',
    typesStyle: 'style — 不影响逻辑的代码风格变更（空格、格式、分号）。',
    typesRefactor: 'refactor — 既不修复 bug 也不添加功能的代码重构。',
    typesPerf: 'perf — 性能优化。通常触发 PATCH 版本升级。',
    typesTest: 'test — 添加或修正测试。不触发版本升级。',
    typesBuild: 'build — 构建系统或外部依赖变更（webpack、npm、Gradle）。',
    typesCi: 'ci — CI 配置文件和脚本变更（GitHub Actions、CircleCI、Jenkins）。',
    typesChore: 'chore — 不修改 src 或 test 文件的日常任务（发布脚本、配置）。',
    typesRevert: 'revert — 撤销之前的提交。应在正文中引用被撤销的提交哈希。',

    h2Scope: '范围约定和最佳实践',
    scopeP1: 'scope 提供关于代码库哪个部分受影响的额外上下文。它放在类型后面的括号中。scope 应该在项目中保持一致，并在贡献指南中记录。',
    scopeP2: '常见的 scope 策略包括使用模块名（auth、api、ui）、层名（controller、service、model）或功能区域（checkout、onboarding、dashboard）。在 monorepo 中，包名通常用作 scope。',

    h2Breaking: '破坏性变更',
    breakingP1: '破坏性变更是提交消息中最重要的信息，因为它们触发 MAJOR 版本升级。有两种方式表示破坏性变更：',
    breakingP2: '第一种方法在提交脚注中使用 BREAKING CHANGE footer（必须大写）。第二种方法在类型或 scope 后追加感叹号（!）。两种方法可以组合使用以获得最大清晰度。',

    h2Examples: '实际提交消息示例',
    examplesP1: '以下是好的和不好的提交消息示例。好的消息遵循规范并提供清晰的上下文。不好的消息模糊、不一致或缺少类型前缀。',

    h2Semver: '语义化版本集成',
    semverP1: 'Conventional Commits 直接映射到语义化版本（SemVer）。这种映射使自动版本升级成为可能。理解这种关系对于设置自动化至关重要。',
    semverP2: '当生成发布时，工具扫描自上次发布以来的所有提交。如果任何提交有 BREAKING CHANGE，则升级主版本。否则，如果任何提交类型为 feat，则升级次版本。否则，fix 和 perf 提交导致修订版本升级。docs、style、refactor、test、build、ci 和 chore 等类型默认不触发任何发布。',

    h2Commitlint: 'Commitlint 设置',
    commitlintP1: 'Commitlint 是提交消息的 linter。它检查每条提交消息是否遵循 Conventional Commits 规范。结合 Husky，它在每次提交时自动运行，防止不符合规范的消息进入仓库。',
    commitlintP2: '安装 commitlint 和 conventional 配置，然后创建配置文件并设置 Husky commit-msg 钩子：',

    h2Commitizen: 'Commitizen (cz-cli) 交互式提交',
    commitizenP1: 'Commitizen 提供编写 conventional commit 消息的交互式提示。开发者回答关于类型、范围和描述的问题，而不是手动输入格式。这消除了格式错误，让新团队成员更容易上手。',

    h2StandardVersion: 'Standard Version 和 Release Please',
    svP1: 'Standard Version 是一个遵循 SemVer 和 Conventional Commits 规范的版本管理工具。它读取提交历史，确定版本升级，更新 package.json，生成或更新 CHANGELOG.md，并创建 git 标签。注意：Standard Version 现已弃用，推荐使用 Release Please。',
    svP2: 'Release Please 是 Google 维护的 Standard Version 继任者。它创建包含版本升级和变更日志更新的发布拉取请求。当 PR 被合并时，发布即完成。',

    h2SemanticRelease: 'Semantic Release：完全自动化发布',
    srP1: 'Semantic Release 将自动化推到极致。它分析提交，确定版本升级，生成发布说明，发布到 npm（或其他注册表），创建 GitHub Release，并更新变更日志。它是 2026 年完全自动化发布的黄金标准。',
    srP2: '以下是典型 Node.js 项目的完整 Semantic Release 配置：',

    h2GithubActions: 'GitHub Actions 中的提交消息检查',
    gaP1: '即使有本地钩子，CI 级别的强制执行也是必不可少的，因为钩子可以被绕过。一个检查提交消息的 GitHub Actions 工作流确保没有不符合规范的提交到达主分支。',

    h2Monorepo: 'Monorepo 约定',
    monorepoP1: 'Monorepo 对 Conventional Commits 提出了独特的挑战，因为单个仓库包含多个包。scope 字段变得至关重要，用于识别提交影响哪个包。以下是主要方法：',
    monorepoP2: 'Changesets 是一个流行的 monorepo 版本管理工具。它使用单独的变更集文件而不是仅依赖提交消息。每个 PR 添加一个描述变更及其影响的变更集文件。发布时，Changesets 读取所有待处理的变更集，升级版本，并为每个受影响的包生成变更日志。',

    h2Comparison: 'Angular vs Conventional Commits vs Gitmoji',
    compP1: '2026 年广泛使用三种提交约定。Angular Commit Convention 是 Conventional Commits 的原始灵感来源，使用相同的 type(scope): description 格式。Conventional Commits 是一个独立规范，更轻量更灵活。Gitmoji 使用 emoji 前缀而非文本类型。以下是它们的比较：',
    thConvention: '方面',
    thAngular: 'Angular',
    thConventional: 'Conventional Commits',
    thGitmoji: 'Gitmoji',
    compFormat: '格式',
    compTools: '工具',
    compSemver: 'SemVer 映射',
    compAdoption: '采用度',
    compReadability: '可读性',
    compFlexibility: '灵活性',
    valAngularFmt: 'type(scope): subject',
    valConvFmt: 'type(scope): description',
    valGitmojiFmt: ':emoji: description',
    valAngularTools: 'Commitlint, ng-commit',
    valConvTools: 'Commitlint, Commitizen, SR',
    valGitmojiTools: 'gitmoji-cli, gitmoji-changelog',
    valAngularSemver: '是（严格）',
    valConvSemver: '是（内置）',
    valGitmojiSemver: '部分支持',
    valAngularAdopt: 'Angular 生态',
    valConvAdopt: '通用（最流行）',
    valGitmojiAdopt: '增长中的小众',
    valAngularRead: '良好',
    valConvRead: '良好',
    valGitmojiRead: '视觉化（依赖 emoji）',
    valAngularFlex: '严格',
    valConvFlex: '可扩展',
    valGitmojiFlex: '灵活',

    h2Changelog: '自动生成 CHANGELOG.md',
    changelogP1: 'Conventional Commits 使完全自动化的变更日志生成成为可能。工具读取提交历史，按类型分组变更，并生成格式良好的 markdown 文件。以下是工具生成的内容：',

    h2PrTitle: 'PR 标题约定',
    prP1: '许多团队也在拉取请求标题上强制执行 Conventional Commits 格式。使用 squash 合并时，PR 标题成为合并提交消息，使 PR 标题检查与提交消息检查同样重要。GitHub Actions 可以强制执行：',

    h2TeamAdoption: '团队采用指南',
    teamP1: '在团队中采用 Conventional Commits 需要渐进式推出。一夜之间强制执行新约定会导致挫败和抵触。以下是经过验证的四阶段采用策略：',
    teamPhase1: '阶段 1（第 1-2 周）：在团队会议中介绍规范。分享本指南。在 CONTRIBUTING.md 中添加解释约定的部分。暂时不强制执行——只是建立意识。',
    teamPhase2: '阶段 2（第 3-4 周）：添加 Commitizen 以便开发者使用交互式提示。以仅警告模式设置 Commitlint。创建共享的 .gitmessage 模板。开发者可以逐步加入。',
    teamPhase3: '阶段 3（第 2 个月）：通过 Husky 在本地启用 Commitlint 强制执行。添加 CI 检查作为必需检查。所有新提交必须遵循约定。旧历史不追溯更改。',
    teamPhase4: '阶段 4（第 3 个月以后）：使用 Semantic Release 或 Release Please 自动化发布。自动生成变更日志。约定现在通过完全自动化带来回报。',

    h2IDE: 'IDE 集成',
    ideP1: 'VS Code 和 JetBrains IDE 提供了使编写 conventional commits 更容易的扩展。这些集成提供类型自动完成、scope 建议和内联验证。',
    ideVscode: 'VS Code：安装 Conventional Commits 扩展（vivaxy.vscode-conventional-commits）。它添加了一个源代码控制面板小部件，引导你完成编写提交消息的过程，包括类型选择、可选 scope、描述、正文和破坏性变更字段。扩展还支持通过 .vscode/settings.json 自定义类型和 scope。',
    ideJetbrains: 'JetBrains（IntelliJ、WebStorm、PyCharm）：从市场安装 Conventional Commit 插件。它在提交时提供弹出对话框，确保消息遵循约定。它支持从 commitlint 配置读取自定义 scope。',

    h2CustomTypes: '自定义提交类型和扩展规范',
    customP1: 'Conventional Commits 规范有意保持最小化——它只强制要求 feat 和 fix。团队可以根据特定工作流自由添加自定义类型。这通过扩展 commitlint 配置来实现：',
    customP2: '一些流行的自定义类型包括 deps（依赖更新）、release（发布提交）、wip（进行中的工作——通常在 CI 中被拒绝）、security（安全相关变更）和 i18n（国际化变更）。',

    h2Template: '提交消息模板（.gitmessage）',
    templateP1: 'git 提交消息模板帮助开发者记住格式而无需记忆规范。在项目根目录创建 .gitmessage 文件并配置 git 使用它：',

    h2Husky: 'Husky + lint-staged 预提交钩子',
    huskyP1: 'Husky 管理 git 钩子，lint-staged 在暂存文件上运行 linter。结合 Commitlint，它们创建了强大的本地强制执行管道。以下是完整设置：',

    h2Mistakes: '常见错误及修复方法',
    mistakesP1: '即使经验丰富的开发者也会犯 Conventional Commits 错误。以下是最常见的错误及其解决方案：',
    mistake1: '使用大写类型——类型必须小写：feat，不是 Feat 或 FEAT。修复：commitlint 默认强制执行。',
    mistake2: '类型后缺少冒号——格式是 type: description 而不是 type description。类型（或 scope）后的冒号和空格是必需的。',
    mistake3: '写太长的头部——保持第一行在 72 个字符以内。将细节放入提交正文。Commitlint 有 header-max-length 规则（默认 100）。',
    mistake4: '使用错误的类型——当变更实际上是重构时使用 fix，或当它是文档时使用 feat。每种类型都有与 SemVer 绑定的特定语义。误用会导致不正确的版本升级。',
    mistake5: '忘记 BREAKING CHANGE footer——仅在类型后添加 ! 对某些工具来说不够。始终包含 BREAKING CHANGE: footer，描述什么会中断以及迁移路径。',
    mistake6: '不一致的 scope——在一次提交中使用 auth，在另一次中使用 authentication。在 commitlint 配置中记录允许的 scope 并强制执行。',
    mistake7: '包含多个变更的巨大提交——一次提交应该代表一个逻辑变更。如果需要在一次提交中写 "feat(auth): add login and fix(ui): fix button"，应该分成两次单独的提交。',

    h2Granularity: '提交粒度最佳实践',
    granularityP1: '每次提交应该代表一个单一的、原子的、逻辑的变更。一个好的测试：你能否在不使用"和"的情况下用一句话描述提交？如果不能，它可能应该是多次提交。',
    granularityP2: '对于功能开发，将工作分成小的提交：一个用于数据模型，一个用于 API 端点，一个用于 UI 组件，一个用于测试。这使代码审查更容易，二分查找更简单，回退更安全。',
    granularityP3: '永远不要将格式变更与逻辑变更混合。如果需要重新格式化文件并修复 bug，在单独的提交中进行：style(utils): format helper functions 后跟 fix(utils): correct null check in parseConfig。这样，格式变更提交在代码审查时可以安全跳过。',

    h2FAQ: '常见问题',
    faq1Q: '什么是 Conventional Commits 规范？',
    faq1A: 'Conventional Commits 是一个用于编写标准化提交消息的约定。每条消息遵循 type(scope): description 格式，其中 type 表示变更性质（feat、fix、docs 等），scope 可选地标识受影响的区域，description 概述变更。该约定支持自动化版本管理、变更日志生成和 CI/CD 自动化。',
    faq2Q: 'Conventional Commits 与语义化版本有什么关系？',
    faq2A: 'Conventional Commits 直接映射到 SemVer。feat 提交触发 MINOR 版本升级（1.0.0 到 1.1.0）。fix 提交触发 PATCH 升级（1.0.0 到 1.0.1）。带有 BREAKING CHANGE 的提交触发 MAJOR 升级（1.0.0 到 2.0.0）。docs、style、refactor 等类型默认不触发版本变更。',
    faq3Q: '如何使用 Husky 设置 Commitlint？',
    faq3A: '使用 npm 安装 @commitlint/cli 和 @commitlint/config-conventional。创建 commitlint.config.js 文件并扩展 conventional 配置。然后安装 Husky，运行 npx husky init，并创建运行 npx commitlint --edit 的 .husky/commit-msg 钩子。每条提交消息现在都会根据 Conventional Commits 规范进行验证。',
    faq4Q: 'Semantic Release 和 Release Please 有什么区别？',
    faq4A: 'Semantic Release 是一个完全自动化的工具，在每次 CI 运行时确定版本、生成变更日志、发布到 npm 并创建 GitHub Release。Release Please（由 Google 维护）创建一个累积变更的发布拉取请求；发布只在你合并 PR 时发生。Release Please 在发布前给你一个审查步骤。',
    faq5Q: '可以在 monorepo 中使用 Conventional Commits 吗？',
    faq5A: '可以。使用 scope 字段标识受影响的包（例如 feat(api): add endpoint）。Changesets、Lerna 和 Release Please 等工具有内置的 monorepo 支持。它们可以根据带 scope 的提交独立管理每个包的版本，并生成每个包的变更日志。',
    faq6Q: '如果提交消息写错了怎么办？',
    faq6A: '如果还没推送，使用 git commit --amend 重写最后一条提交消息。对于更早的提交，使用 git rebase -i 编辑特定提交消息。如果提交已推送和合并，最好保持不变并确保未来的提交遵循约定。Commitlint + Husky 能主动防止这些错误。',
    faq7Q: 'PR 标题也应该使用 Conventional Commits 吗？',
    faq7A: '是的，特别是如果你的团队使用 squash 合并。当 PR 被 squash 合并时，PR 标题成为合并提交消息。action-semantic-pull-request 等工具可以在 CI 中检查 PR 标题。这确保主分支上的最终提交遵循约定，即使 PR 分支中的单独提交没有遵循。',
    faq8Q: '如何处理 revert 提交？',
    faq8A: '使用 revert 类型后跟原始提交描述：revert: feat(auth): add OAuth login。在提交正文中包含被撤销提交的哈希：This reverts commit abc1234。一些工具如 Semantic Release 会检测到 revert 并相应调整版本，可能从下一个发布中移除某个功能。',

    relatedTitle: '相关工具和指南',
  },
};

export default function ConventionalCommitsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', marginBottom: '1.5rem' };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };
  const thStyle = { padding: '0.75rem', textAlign: 'left' as const, borderBottom: '2px solid #374151', fontWeight: 600 };
  const tdStyle = { padding: '0.75rem', borderBottom: '1px solid #374151' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0c4a6e', fontSize: '1.1rem' }}>TL;DR</p>
        <p style={{ color: '#0c4a6e', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Intro */}
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Are Conventional Commits */}
      <h2 style={h2Style}>{t.h2What}</h2>
      <p style={pStyle}>{t.whatP1}</p>
      <p style={pStyle}>{t.whatP2}</p>
      <p style={pStyle}>{t.whatP3}</p>

      {/* The Specification Format */}
      <h2 style={h2Style}>{t.h2Format}</h2>
      <p style={pStyle}>{t.formatP1}</p>
      <pre style={codeStyle}><code>{'<type>[optional scope]: <description>\n' +
        '\n' +
        '[optional body]\n' +
        '\n' +
        '[optional footer(s)]\n' +
        '\n' +
        '# Examples:\n' +
        'feat: add user registration endpoint\n' +
        'fix(auth): resolve token expiration bug\n' +
        'docs(readme): update installation instructions\n' +
        'feat(api)!: change response format for /users\n' +
        '\n' +
        'BREAKING CHANGE: The /users endpoint now returns\n' +
        'an object instead of an array.'}</code></pre>

      {/* Commit Types */}
      <h2 style={h2Style}>{t.h2Types}</h2>
      <p style={pStyle}>{t.typesP1}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>SemVer</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['feat', 'A new feature for the user', 'MINOR'],
              ['fix', 'A bug fix for the user', 'PATCH'],
              ['docs', 'Documentation only changes', 'None'],
              ['style', 'Code style (formatting, semicolons)', 'None'],
              ['refactor', 'Code change (no bug fix, no feature)', 'None'],
              ['perf', 'Performance improvement', 'PATCH'],
              ['test', 'Adding or correcting tests', 'None'],
              ['build', 'Build system or dependencies', 'None'],
              ['ci', 'CI configuration and scripts', 'None'],
              ['chore', 'Routine tasks (no src/test change)', 'None'],
              ['revert', 'Reverts a previous commit', 'Varies'],
            ].map(([type, desc, ver], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{desc}</td>
                <td style={tdStyle}>{ver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scope Conventions */}
      <h2 style={h2Style}>{t.h2Scope}</h2>
      <p style={pStyle}>{t.scopeP1}</p>
      <p style={pStyle}>{t.scopeP2}</p>
      <pre style={codeStyle}><code>{'# Module-based scopes\n' +
        'feat(auth): add two-factor authentication\n' +
        'fix(payments): correct tax calculation\n' +
        'refactor(database): optimize query builder\n' +
        '\n' +
        '# Layer-based scopes\n' +
        'fix(controller): validate request params\n' +
        'refactor(service): extract email service\n' +
        'test(repository): add integration tests\n' +
        '\n' +
        '# Monorepo package scopes\n' +
        'feat(@myorg/ui): add DatePicker component\n' +
        'fix(@myorg/api): handle timeout errors\n' +
        'build(@myorg/shared): update tsconfig'}</code></pre>

      {/* Breaking Changes */}
      <h2 style={h2Style}>{t.h2Breaking}</h2>
      <p style={pStyle}>{t.breakingP1}</p>
      <p style={pStyle}>{t.breakingP2}</p>
      <pre style={codeStyle}><code>{'# Method 1: BREAKING CHANGE footer\n' +
        'feat(api): change user response format\n' +
        '\n' +
        'The /api/users endpoint now returns paginated results\n' +
        'instead of a flat array.\n' +
        '\n' +
        'BREAKING CHANGE: The response shape changed from\n' +
        'User[] to { data: User[], meta: { page, total } }.\n' +
        'All API consumers must update their parsing logic.\n' +
        '\n' +
        '# Method 2: ! after type/scope\n' +
        'feat(api)!: change user response format\n' +
        '\n' +
        '# Method 3: Both combined (recommended)\n' +
        'feat(api)!: change user response format\n' +
        '\n' +
        'BREAKING CHANGE: Response changed from User[] to\n' +
        '{ data: User[], meta: { page, total } }.'}</code></pre>

      {/* Real-World Examples */}
      <h2 style={h2Style}>{t.h2Examples}</h2>
      <p style={pStyle}>{t.examplesP1}</p>
      <h3 style={h3Style}>Good vs Bad Commit Messages</h3>
      <pre style={codeStyle}><code>{'# GOOD — follows the convention\n' +
        'feat(auth): add OAuth 2.0 login with Google\n' +
        'fix(cart): prevent negative quantity on update\n' +
        'docs(api): add OpenAPI spec for /orders endpoint\n' +
        'perf(search): add database index for full-text queries\n' +
        'build(deps): upgrade React from 18 to 19\n' +
        'revert: feat(auth): add OAuth 2.0 login with Google\n' +
        '\n' +
        '# BAD — avoid these patterns\n' +
        'added new feature          # missing type prefix\n' +
        'fix: fix stuff             # too vague\n' +
        'fix: add dark mode toggle  # wrong type (should be feat)\n' +
        'feat: add login and fix header  # multiple changes\n' +
        'FEAT: add search feature   # uppercase type'}</code></pre>

      {/* Semantic Versioning Integration */}
      <h2 style={h2Style}>{t.h2Semver}</h2>
      <p style={pStyle}>{t.semverP1}</p>
      <p style={pStyle}>{t.semverP2}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th style={thStyle}>Commit</th>
              <th style={thStyle}>Version Bump</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['fix(...): ...', 'PATCH (1.0.0 -> 1.0.1)', 'Bug fixes, patches'],
              ['feat(...): ...', 'MINOR (1.0.0 -> 1.1.0)', 'New features'],
              ['feat(...)!: ... or BREAKING CHANGE', 'MAJOR (1.0.0 -> 2.0.0)', 'Breaking API changes'],
              ['docs, style, refactor, test, ci', 'No release', 'Internal changes'],
              ['perf(...): ...', 'PATCH (1.0.0 -> 1.0.1)', 'Performance improvements'],
            ].map(([commit, bump, example], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.85rem' }}>{commit}</td>
                <td style={tdStyle}>{bump}</td>
                <td style={tdStyle}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Commitlint Setup */}
      <h2 style={h2Style}>{t.h2Commitlint}</h2>
      <p style={pStyle}>{t.commitlintP1}</p>
      <p style={pStyle}>{t.commitlintP2}</p>
      <h3 style={h3Style}>Installation</h3>
      <pre style={codeStyle}><code>{'npm install --save-dev @commitlint/cli @commitlint/config-conventional\n' +
        '\n' +
        '# Or with pnpm\n' +
        'pnpm add -D @commitlint/cli @commitlint/config-conventional'}</code></pre>
      <h3 style={h3Style}>commitlint.config.js</h3>
      <pre style={codeStyle}><code>{'// commitlint.config.js\n' +
        'export default {\n' +
        '  extends: [\'@commitlint/config-conventional\'],\n' +
        '  rules: {\n' +
        '    // Type must be one of these\n' +
        '    \'type-enum\': [\n' +
        '      2,\n' +
        '      \'always\',\n' +
        '      [\n' +
        '        \'feat\', \'fix\', \'docs\', \'style\', \'refactor\',\n' +
        '        \'perf\', \'test\', \'build\', \'ci\', \'chore\', \'revert\',\n' +
        '      ],\n' +
        '    ],\n' +
        '    // Scope must be lowercase\n' +
        '    \'scope-case\': [2, \'always\', \'lower-case\'],\n' +
        '    // Header max length 100 characters\n' +
        '    \'header-max-length\': [2, \'always\', 100],\n' +
        '    // Description must not be empty\n' +
        '    \'subject-empty\': [2, \'never\'],\n' +
        '    // Type must not be empty\n' +
        '    \'type-empty\': [2, \'never\'],\n' +
        '  },\n' +
        '};'}</code></pre>
      <h3 style={h3Style}>Husky commit-msg Hook</h3>
      <pre style={codeStyle}><code>{'# Install Husky\n' +
        'npm install --save-dev husky\n' +
        'npx husky init\n' +
        '\n' +
        '# Create the commit-msg hook\n' +
        'echo "npx --no -- commitlint --edit \\$1" > .husky/commit-msg\n' +
        'chmod +x .husky/commit-msg'}</code></pre>

      {/* Commitizen */}
      <h2 style={h2Style}>{t.h2Commitizen}</h2>
      <p style={pStyle}>{t.commitizenP1}</p>
      <pre style={codeStyle}><code>{'# Install Commitizen globally\n' +
        'npm install -g commitizen\n' +
        '\n' +
        '# Initialize with conventional changelog adapter\n' +
        'commitizen init cz-conventional-changelog --save-dev --save-exact\n' +
        '\n' +
        '# Or configure manually in package.json:\n' +
        '# "config": {\n' +
        '#   "commitizen": {\n' +
        '#     "path": "cz-conventional-changelog"\n' +
        '#   }\n' +
        '# }\n' +
        '\n' +
        '# Now use "cz" or "git cz" instead of "git commit"\n' +
        '# The interactive prompt guides you through:\n' +
        '# type -> scope -> description -> body -> breaking changes -> issues'}</code></pre>
      <h3 style={h3Style}>.czrc Configuration</h3>
      <pre style={codeStyle}><code>{'{\n' +
        '  "path": "cz-conventional-changelog",\n' +
        '  "maxHeaderWidth": 100,\n' +
        '  "maxLineWidth": 100,\n' +
        '  "defaultType": "feat",\n' +
        '  "defaultScope": ""\n' +
        '}'}</code></pre>

      {/* Standard Version / Release Please */}
      <h2 style={h2Style}>{t.h2StandardVersion}</h2>
      <p style={pStyle}>{t.svP1}</p>
      <p style={pStyle}>{t.svP2}</p>
      <h3 style={h3Style}>Release Please GitHub Action</h3>
      <pre style={codeStyle}><code>{'# .github/workflows/release-please.yml\n' +
        'name: Release Please\n' +
        '\n' +
        'on:\n' +
        '  push:\n' +
        '    branches: [main]\n' +
        '\n' +
        'permissions:\n' +
        '  contents: write\n' +
        '  pull-requests: write\n' +
        '\n' +
        'jobs:\n' +
        '  release-please:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: googleapis/release-please-action@v4\n' +
        '        with:\n' +
        '          release-type: node\n' +
        '          token: \\${{ secrets.GITHUB_TOKEN }}'}</code></pre>

      {/* Semantic Release */}
      <h2 style={h2Style}>{t.h2SemanticRelease}</h2>
      <p style={pStyle}>{t.srP1}</p>
      <p style={pStyle}>{t.srP2}</p>
      <pre style={codeStyle}><code>{'# Install Semantic Release and plugins\n' +
        'npm install --save-dev semantic-release @semantic-release/commit-analyzer \\\n' +
        '  @semantic-release/release-notes-generator @semantic-release/changelog \\\n' +
        '  @semantic-release/npm @semantic-release/github @semantic-release/git'}</code></pre>
      <h3 style={h3Style}>release.config.js</h3>
      <pre style={codeStyle}><code>{'// release.config.js\n' +
        'export default {\n' +
        '  branches: [\'main\'],\n' +
        '  plugins: [\n' +
        '    // Analyze commits to determine version bump\n' +
        '    \'@semantic-release/commit-analyzer\',\n' +
        '    // Generate release notes from commits\n' +
        '    \'@semantic-release/release-notes-generator\',\n' +
        '    // Update CHANGELOG.md\n' +
        '    [\'@semantic-release/changelog\', {\n' +
        '      changelogFile: \'CHANGELOG.md\',\n' +
        '    }],\n' +
        '    // Publish to npm\n' +
        '    \'@semantic-release/npm\',\n' +
        '    // Create GitHub release with notes\n' +
        '    \'@semantic-release/github\',\n' +
        '    // Commit CHANGELOG.md and package.json back\n' +
        '    [\'@semantic-release/git\', {\n' +
        '      assets: [\'CHANGELOG.md\', \'package.json\'],\n' +
        '      message: \'chore(release): \\${nextRelease.version} [skip ci]\',\n' +
        '    }],\n' +
        '  ],\n' +
        '};'}</code></pre>
      <h3 style={h3Style}>Semantic Release GitHub Action</h3>
      <pre style={codeStyle}><code>{'# .github/workflows/semantic-release.yml\n' +
        'name: Semantic Release\n' +
        'on:\n' +
        '  push:\n' +
        '    branches: [main]\n' +
        'permissions:\n' +
        '  contents: write\n' +
        '  issues: write\n' +
        '  pull-requests: write\n' +
        'jobs:\n' +
        '  release:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '        with: { fetch-depth: 0 }\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with: { node-version: 22, cache: npm }\n' +
        '      - run: npm ci\n' +
        '      - run: npx semantic-release\n' +
        '        env:\n' +
        '          GITHUB_TOKEN: \\${{ secrets.GITHUB_TOKEN }}\n' +
        '          NPM_TOKEN: \\${{ secrets.NPM_TOKEN }}'}</code></pre>

      {/* GitHub Actions for Commit Linting */}
      <h2 style={h2Style}>{t.h2GithubActions}</h2>
      <p style={pStyle}>{t.gaP1}</p>
      <pre style={codeStyle}><code>{'# .github/workflows/commitlint.yml\n' +
        'name: Commitlint\n' +
        'on:\n' +
        '  push: { branches: [main] }\n' +
        '  pull_request: { branches: [main] }\n' +
        'jobs:\n' +
        '  commitlint:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '        with: { fetch-depth: 0 }\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with: { node-version: 22 }\n' +
        '      - run: npm install @commitlint/cli @commitlint/config-conventional\n' +
        '      - run: npx commitlint --from \\${{ github.event.pull_request.base.sha || \'HEAD~1\' }} --to HEAD --verbose'}</code></pre>

      {/* Monorepo Conventions */}
      <h2 style={h2Style}>{t.h2Monorepo}</h2>
      <p style={pStyle}>{t.monorepoP1}</p>
      <p style={pStyle}>{t.monorepoP2}</p>
      <h3 style={h3Style}>Monorepo Commit Examples</h3>
      <pre style={codeStyle}><code>{'# Lerna / Nx monorepo with package scopes\n' +
        'feat(web): add dashboard page\n' +
        'fix(api): handle rate limiting correctly\n' +
        'build(shared): upgrade TypeScript to 5.7\n' +
        'test(mobile): add login screen snapshot tests\n' +
        '\n' +
        '# Turborepo with app/package scopes\n' +
        'feat(apps/web): integrate Stripe payments\n' +
        'fix(packages/ui): correct Button hover state\n' +
        'ci(turbo): add remote caching to pipeline\n' +
        '\n' +
        '# Changesets workflow\n' +
        'npx changeset           # create changeset file\n' +
        'git add .changeset/ && git commit -m "feat(api): add rate limiting"\n' +
        'npx changeset version   # bump versions when ready\n' +
        'npx changeset publish   # publish to npm'}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.compP1}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th style={thStyle}>{t.thConvention}</th>
              <th style={thStyle}>{t.thAngular}</th>
              <th style={thStyle}>{t.thConventional}</th>
              <th style={thStyle}>{t.thGitmoji}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compFormat, t.valAngularFmt, t.valConvFmt, t.valGitmojiFmt],
              [t.compTools, t.valAngularTools, t.valConvTools, t.valGitmojiTools],
              [t.compSemver, t.valAngularSemver, t.valConvSemver, t.valGitmojiSemver],
              [t.compAdoption, t.valAngularAdopt, t.valConvAdopt, t.valGitmojiAdopt],
              [t.compReadability, t.valAngularRead, t.valConvRead, t.valGitmojiRead],
              [t.compFlexibility, t.valAngularFlex, t.valConvFlex, t.valGitmojiFlex],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                <td style={tdStyle}>{row[1]}</td>
                <td style={tdStyle}>{row[2]}</td>
                <td style={tdStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Auto-generating CHANGELOG */}
      <h2 style={h2Style}>{t.h2Changelog}</h2>
      <p style={pStyle}>{t.changelogP1}</p>
      <pre style={codeStyle}><code>{'# Auto-generated CHANGELOG.md example:\n' +
        '\n' +
        '## [2.3.0](https://github.com/org/repo/compare/v2.2.0...v2.3.0) (2026-02-28)\n' +
        '\n' +
        '### Features\n' +
        '\n' +
        '* **auth:** add two-factor authentication ([#142](https://github.com/org/repo/issues/142))\n' +
        '* **search:** implement full-text search with Elasticsearch ([abc1234](https://github.com/org/repo/commit/abc1234))\n' +
        '\n' +
        '### Bug Fixes\n' +
        '\n' +
        '* **payments:** correct tax calculation for EU ([#156](https://github.com/org/repo/issues/156))\n' +
        '* **ui:** fix modal z-index on Safari ([def5678](https://github.com/org/repo/commit/def5678))\n' +
        '\n' +
        '### Performance Improvements\n' +
        '\n' +
        '* **database:** add composite index for user queries ([ghi9012](https://github.com/org/repo/commit/ghi9012))'}</code></pre>

      {/* PR Title Conventions */}
      <h2 style={h2Style}>{t.h2PrTitle}</h2>
      <p style={pStyle}>{t.prP1}</p>
      <pre style={codeStyle}><code>{'# .github/workflows/pr-title.yml\n' +
        'name: PR Title Lint\n' +
        'on:\n' +
        '  pull_request:\n' +
        '    types: [opened, edited, synchronize]\n' +
        'jobs:\n' +
        '  lint-pr-title:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: amannn/action-semantic-pull-request@v5\n' +
        '        env:\n' +
        '          GITHUB_TOKEN: \\${{ secrets.GITHUB_TOKEN }}\n' +
        '        with:\n' +
        '          types: |\n' +
        '            feat\n' +
        '            fix\n' +
        '            docs\n' +
        '            style\n' +
        '            refactor\n' +
        '            perf\n' +
        '            test\n' +
        '            build\n' +
        '            ci\n' +
        '            chore\n' +
        '            revert\n' +
        '          requireScope: false'}</code></pre>

      {/* Team Adoption Guide */}
      <h2 style={h2Style}>{t.h2TeamAdoption}</h2>
      <p style={pStyle}>{t.teamP1}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.teamPhase1, t.teamPhase2, t.teamPhase3, t.teamPhase4].map((phase, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}>{phase}</li>
        ))}
      </ul>

      {/* IDE Integrations */}
      <h2 style={h2Style}>{t.h2IDE}</h2>
      <p style={pStyle}>{t.ideP1}</p>
      <p style={pStyle}>{t.ideVscode}</p>
      <p style={pStyle}>{t.ideJetbrains}</p>
      <pre style={codeStyle}><code>{'// .vscode/settings.json — custom scopes for VS Code extension\n' +
        '{\n' +
        '  "conventionalCommits.scopes": [\n' +
        '    "auth",\n' +
        '    "api",\n' +
        '    "ui",\n' +
        '    "database",\n' +
        '    "payments",\n' +
        '    "search",\n' +
        '    "config"\n' +
        '  ],\n' +
        '  "conventionalCommits.showNewVersionNotes": false\n' +
        '}'}</code></pre>

      {/* Custom Commit Types */}
      <h2 style={h2Style}>{t.h2CustomTypes}</h2>
      <p style={pStyle}>{t.customP1}</p>
      <p style={pStyle}>{t.customP2}</p>
      <pre style={codeStyle}><code>{'// commitlint.config.js — extending with custom types\n' +
        'export default {\n' +
        '  extends: [\'@commitlint/config-conventional\'],\n' +
        '  rules: {\n' +
        '    \'type-enum\': [\n' +
        '      2,\n' +
        '      \'always\',\n' +
        '      [\n' +
        '        // Standard types\n' +
        '        \'feat\', \'fix\', \'docs\', \'style\', \'refactor\',\n' +
        '        \'perf\', \'test\', \'build\', \'ci\', \'chore\', \'revert\',\n' +
        '        // Custom types\n' +
        '        \'deps\',      // dependency updates\n' +
        '        \'security\',  // security patches\n' +
        '        \'i18n\',      // internationalization\n' +
        '        \'a11y\',      // accessibility\n' +
        '        \'release\',   // release commits\n' +
        '      ],\n' +
        '    ],\n' +
        '    // Enforce allowed scopes\n' +
        '    \'scope-enum\': [\n' +
        '      2,\n' +
        '      \'always\',\n' +
        '      [\'auth\', \'api\', \'ui\', \'db\', \'payments\', \'search\', \'config\', \'deps\'],\n' +
        '    ],\n' +
        '  },\n' +
        '};'}</code></pre>

      {/* Commit Message Template */}
      <h2 style={h2Style}>{t.h2Template}</h2>
      <p style={pStyle}>{t.templateP1}</p>
      <h3 style={h3Style}>.gitmessage Template</h3>
      <pre style={codeStyle}><code>{'# .gitmessage\n' +
        '# <type>(<scope>): <description>\n' +
        '# [optional body]\n' +
        '# [optional footer(s)]\n' +
        '#\n' +
        '# Types: feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert\n' +
        '# Rules: header <= 72 chars, imperative mood, no capital, no period\n' +
        '# Breaking: add BREAKING CHANGE: footer or ! after type\n' +
        '# Example: feat(auth): add two-factor authentication'}</code></pre>
      <h3 style={h3Style}>Configure Git to Use the Template</h3>
      <pre style={codeStyle}><code>{'# Set the template for this repository\n' +
        'git config commit.template .gitmessage\n' +
        '\n' +
        '# Or set it globally\n' +
        'git config --global commit.template ~/.gitmessage'}</code></pre>

      {/* Husky + lint-staged */}
      <h2 style={h2Style}>{t.h2Husky}</h2>
      <p style={pStyle}>{t.huskyP1}</p>
      <pre style={codeStyle}><code>{'# Install dependencies\n' +
        'npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional\n' +
        '\n' +
        'npx husky init\n' +
        'echo "npx --no -- commitlint --edit \\$1" > .husky/commit-msg\n' +
        'echo "npx lint-staged" > .husky/pre-commit'}</code></pre>
      <h3 style={h3Style}>package.json Configuration</h3>
      <pre style={codeStyle}><code>{'{\n' +
        '  "scripts": { "prepare": "husky", "commit": "cz" },\n' +
        '  "lint-staged": {\n' +
        '    "*.{js,ts,tsx}": ["eslint --fix", "prettier --write"],\n' +
        '    "*.{css,scss,json,md}": ["prettier --write"]\n' +
        '  }\n' +
        '}'}</code></pre>

      {/* Common Mistakes */}
      <h2 style={h2Style}>{t.h2Mistakes}</h2>
      <p style={pStyle}>{t.mistakesP1}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.mistake1, t.mistake2, t.mistake3, t.mistake4, t.mistake5, t.mistake6, t.mistake7].map((m, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.7' }}>{m}</li>
        ))}
      </ul>

      {/* Commit Granularity */}
      <h2 style={h2Style}>{t.h2Granularity}</h2>
      <p style={pStyle}>{t.granularityP1}</p>
      <p style={pStyle}>{t.granularityP2}</p>
      <p style={pStyle}>{t.granularityP3}</p>
      <pre style={codeStyle}><code>{'# Good: atomic commits with clear purpose\n' +
        'feat(auth): add User model with password hashing\n' +
        'feat(auth): add POST /api/auth/register endpoint\n' +
        'feat(auth): add registration form component\n' +
        'test(auth): add unit tests for registration flow\n' +
        'docs(auth): add registration API documentation\n' +
        '\n' +
        '# Bad: one giant commit\n' +
        'feat(auth): add complete user registration system\n' +
        '# (includes model, endpoint, UI, tests, docs all in one)'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2FAQ}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
