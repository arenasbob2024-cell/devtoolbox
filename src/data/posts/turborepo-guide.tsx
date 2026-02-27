'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Turborepo Guide 2026: Monorepo Build System, Remote Caching, and Task Pipelines',
    intro: 'Turborepo is a high-performance build system for JavaScript and TypeScript monorepos. Created by Jared Palmer and now maintained by Vercel, Turborepo uses intelligent caching and task scheduling to dramatically speed up builds, tests, and linting across multi-package repositories. Whether you manage a handful of shared libraries or dozens of applications in a single codebase, Turborepo eliminates redundant work by understanding the dependency graph between your packages and only rebuilding what has changed.',
    tldr: 'Turborepo is a monorepo build system that uses content-aware hashing, remote caching (Vercel Remote Cache), and parallel task execution to speed up builds by 65-85%. It works with npm, pnpm, and yarn workspaces, requires minimal configuration via turbo.json, and integrates with any CI/CD platform. Turborepo understands your task dependency graph, skips work that has already been done, and shares cached artifacts across your entire team.',
    keyTakeaway1: 'Turborepo uses content-aware hashing to skip tasks whose inputs have not changed, often reducing CI times by 65-85%.',
    keyTakeaway2: 'Remote caching shares build artifacts across your entire team and CI, so one developer\'s build result benefits everyone.',
    keyTakeaway3: 'The task pipeline system in turbo.json defines dependencies between tasks, enabling maximum parallel execution.',
    keyTakeaway4: 'Turborepo works with npm, pnpm, and yarn workspaces without requiring you to change your existing package manager.',
    keyTakeaway5: 'The turbo prune command generates a sparse monorepo subset for efficient Docker image builds.',
    keyTakeaway6: 'Turborepo requires near-zero configuration compared to alternatives like Nx, making adoption straightforward for existing monorepos.',

    h2WhatIs: 'What Is Turborepo and Why Monorepos?',
    whatIsDesc: 'A monorepo is a single repository that holds multiple projects, packages, or applications. Companies like Google, Meta, and Microsoft have used monorepos for years because they simplify code sharing, enforce consistent tooling, and make cross-project changes atomic. However, as monorepos grow, build times can explode because every CI run rebuilds everything from scratch.',
    whatIsDesc2: 'Turborepo solves this by acting as an intelligent task runner that sits on top of your package manager workspaces. It analyzes the dependency graph between your packages, determines which packages are affected by a change, and runs tasks in the optimal order with maximum parallelism. When a task has been run before with the same inputs, Turborepo replays the cached output in milliseconds instead of re-executing the task.',

    h2Comparison: 'Turborepo vs Nx vs Lerna: Comparison',
    comparisonDesc: 'Turborepo, Nx, and Lerna are the three most popular monorepo tools in the JavaScript ecosystem. Each has different strengths depending on your team size and project complexity.',
    compFeature: 'Feature',
    compTurborepo: 'Turborepo',
    compNx: 'Nx',
    compLerna: 'Lerna',
    compSetup: 'Setup complexity',
    compSetupTurbo: 'Minimal (one turbo.json)',
    compSetupNx: 'Moderate (nx.json + project.json)',
    compSetupLerna: 'Minimal (lerna.json)',
    compCache: 'Local caching',
    compCacheTurbo: 'Built-in, content-aware',
    compCacheNx: 'Built-in, computation caching',
    compCacheLerna: 'Via Nx addon',
    compRemote: 'Remote caching',
    compRemoteTurbo: 'Vercel Remote Cache (free tier)',
    compRemoteNx: 'Nx Cloud (free tier)',
    compRemoteLerna: 'Via Nx Cloud',
    compTaskGraph: 'Task graph',
    compTaskGraphTurbo: 'turbo.json pipelines',
    compTaskGraphNx: 'project.json targets + nx.json',
    compTaskGraphLerna: 'Basic topological sort',
    compCodeGen: 'Code generation',
    compCodeGenTurbo: 'turbo gen (basic)',
    compCodeGenNx: 'Extensive generators + plugins',
    compCodeGenLerna: 'None built-in',
    compDocker: 'Docker pruning',
    compDockerTurbo: 'turbo prune (built-in)',
    compDockerNx: 'Manual or community plugin',
    compDockerLerna: 'Manual',
    compPlugins: 'Plugin ecosystem',
    compPluginsTurbo: 'Minimal (focused tool)',
    compPluginsNx: 'Extensive (React, Angular, Node, etc.)',
    compPluginsLerna: 'Minimal',
    compBestFor: 'Best for',
    compBestForTurbo: 'Speed-focused teams wanting minimal config',
    compBestForNx: 'Enterprise teams needing full-featured monorepo platform',
    compBestForLerna: 'Simple monorepos or legacy projects',

    h2TurboJson: 'turbo.json Configuration',
    turboJsonDesc: 'The turbo.json file at the root of your repository is the single configuration file for Turborepo. It defines your task pipelines, caching behavior, and global dependencies. Here is a comprehensive configuration example covering the most common settings.',

    h2Pipelines: 'Pipelines and the Task Graph',
    pipelinesDesc: 'Turborepo pipelines define the relationships between tasks across your monorepo. When you run turbo run build, Turborepo reads the pipeline configuration to understand which tasks depend on which other tasks, then executes them in the optimal order with maximum parallelism.',
    pipelinesDesc2: 'The key insight is the dependsOn field. When a task lists "^build" as a dependency, the caret (^) means it depends on the build task of its package dependencies, not on the build task in the same package. This ensures that shared libraries are built before the applications that consume them.',

    h2RemoteCache: 'Remote Caching with Vercel Remote Cache',
    remoteCacheDesc: 'Remote caching is the most impactful feature of Turborepo. Without it, each developer and each CI run maintains its own local cache. With remote caching enabled, build artifacts are shared across your entire team and CI infrastructure. When Developer A builds a package locally, Developer B and your CI pipeline can reuse that exact artifact instead of rebuilding.',
    remoteCacheDesc2: 'Vercel provides a free remote cache tier for Turborepo. You can also self-host a remote cache server using open-source implementations if you need to keep artifacts within your own infrastructure.',

    h2Workspaces: 'Workspace Setup: npm, pnpm, and yarn',
    workspacesDesc: 'Turborepo works on top of your package manager workspaces. It does not replace npm, pnpm, or yarn. Instead, it enhances them with caching and task orchestration. Here is the recommended monorepo structure for each package manager.',

    h2SharedPackages: 'Shared Packages and Internal Packages',
    sharedPkgDesc: 'Internal packages are the building blocks of a well-organized monorepo. They allow you to share code (UI components, utility functions, TypeScript configurations, ESLint configs) across applications without publishing to npm. Turborepo treats internal packages as first-class citizens and resolves them through workspace protocols.',
    sharedPkgDesc2: 'The workspace protocol (workspace:*) tells your package manager to resolve the dependency from the local workspace instead of the npm registry. This means changes to shared packages are immediately reflected in consuming applications during development.',

    h2TypeScript: 'TypeScript Configuration in a Monorepo',
    tsDesc: 'Managing TypeScript across a monorepo requires a layered configuration strategy. Create a shared base tsconfig in an internal package, then extend it in each application and package. This ensures consistent compiler options while allowing per-project overrides.',

    h2CICD: 'CI/CD Integration with GitHub Actions',
    cicdDesc: 'Turborepo integrates seamlessly with GitHub Actions and other CI platforms. The key optimization is enabling remote caching so that CI runs benefit from cached artifacts produced by other runs and local development.',

    h2Incremental: 'Incremental Builds and Content Hashing',
    incrementalDesc: 'Turborepo determines whether to rerun a task by computing a content-aware hash of the task inputs. These inputs include the source files in the package, the turbo.json pipeline configuration, environment variables listed in the env key, and the hashes of dependency packages. If the hash matches a previous run, Turborepo replays the cached output files and terminal output.',
    incrementalDesc2: 'This approach is more reliable than timestamp-based invalidation because it catches cases where files are restored from git or copied from another machine. Two developers with identical source code will always produce identical hashes, making remote cache sharing effective.',

    h2DockerPrune: 'Pruning for Docker Builds',
    dockerDesc: 'Building Docker images for monorepo applications is tricky because Docker COPY copies the entire repository, including packages your app does not depend on. This invalidates the Docker cache on every change to any package. Turborepo solves this with the turbo prune command, which generates a sparse subset of your monorepo containing only the files needed for a specific application.',

    h2Generators: 'Generators: Scaffolding New Packages',
    generatorsDesc: 'Turborepo includes a code generation feature (turbo gen) that helps you scaffold new packages and applications in your monorepo. Generators use Plop templates under the hood, allowing you to define custom templates with Handlebars syntax.',

    h2EnvVars: 'Environment Variables Handling',
    envVarsDesc: 'Environment variables are a critical part of the caching equation. If a build depends on an environment variable like API_URL, Turborepo needs to know about it so the cache is invalidated when the variable changes. You declare environment variables in turbo.json using the env and globalEnv keys.',
    envVarsDesc2: 'The env key is per-task and only affects the hash for that specific task. The globalEnv key applies to all tasks in the pipeline. Variables listed in globalEnv will invalidate the cache for every task when they change.',

    h2Migration: 'Migration Guide: Adding Turborepo to an Existing Monorepo',
    migrationDesc: 'Adopting Turborepo in an existing monorepo is straightforward because Turborepo works with your existing package manager and scripts. You do not need to restructure your repository or change your build tools.',
    migrationStep1: 'Step 1: Install Turborepo as a dev dependency at the root of your monorepo.',
    migrationStep2: 'Step 2: Create a turbo.json file at the repository root defining your task pipelines.',
    migrationStep3: 'Step 3: Update your root package.json scripts to use turbo run instead of calling package manager workspace commands directly.',
    migrationStep4: 'Step 4: Enable remote caching by running turbo login and turbo link.',
    migrationStep5: 'Step 5: Update CI pipelines to use turbo run with the --filter flag for affected packages.',

    h2BestPractices: 'Best Practices',
    bp1: 'Keep turbo.json as the single source of truth for task dependencies. Avoid duplicating pipeline logic in package.json scripts.',
    bp2: 'Always declare environment variables that affect build output in turbo.json env or globalEnv to prevent stale cache hits.',
    bp3: 'Use the workspace:* protocol for internal package dependencies to ensure local resolution during development.',
    bp4: 'Enable remote caching from day one, even for solo developers, to benefit from cached CI artifacts locally.',
    bp5: 'Use turbo prune for Docker builds to minimize image size and maximize layer caching.',
    bp6: 'Structure shared code into focused internal packages (ui, utils, config-typescript, config-eslint) rather than one monolithic shared package.',
    bp7: 'Use --filter to run tasks for specific packages during development instead of running everything.',
    bp8: 'Pin your Turborepo version across the team using packageManager in package.json or a .turbo/config.json.',
    bp9: 'Set up watch mode with turbo run dev for development to leverage persistent tasks and automatic restart on changes.',
    bp10: 'Profile task execution with --summarize to identify bottlenecks and optimize your pipeline dependencies.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Turborepo used for?',
    faq1A: 'Turborepo is a build system and task runner designed for JavaScript and TypeScript monorepos. It speeds up builds, tests, and linting by caching task results and only re-executing tasks whose inputs have changed. Turborepo works with npm, pnpm, and yarn workspaces and is commonly used by teams managing multiple applications and shared packages in a single repository.',
    faq2Q: 'How does Turborepo caching work?',
    faq2A: 'Turborepo computes a content-aware hash for each task based on the source files, environment variables, and dependency hashes. If the hash matches a previous run, Turborepo replays the cached output files and terminal logs instead of re-executing the task. With remote caching enabled, these cached artifacts are shared across all team members and CI runs.',
    faq3Q: 'Is Turborepo better than Nx?',
    faq3A: 'Turborepo and Nx serve different needs. Turborepo is a focused build system with minimal configuration that excels at caching and task scheduling. Nx is a full-featured monorepo platform with extensive code generators, plugins for specific frameworks, and a built-in dependency graph visualizer. Choose Turborepo for simplicity and speed, Nx for comprehensive monorepo management with batteries included.',
    faq4Q: 'Does Turborepo work with pnpm?',
    faq4A: 'Yes. Turborepo supports pnpm workspaces natively. In fact, pnpm is the recommended package manager for Turborepo monorepos because of its strict dependency isolation and disk-efficient storage. Configure workspaces in pnpm-workspace.yaml and Turborepo will automatically detect your package structure.',
    faq5Q: 'What is Turborepo remote caching?',
    faq5A: 'Remote caching stores build artifacts in a shared cache (Vercel Remote Cache by default) so that team members and CI pipelines can reuse cached results instead of rebuilding from scratch. When Developer A builds a package, Developer B can skip that build entirely by downloading the cached artifact. This typically reduces CI times by 65-85%.',
    faq6Q: 'How do I set up a Turborepo monorepo from scratch?',
    faq6A: 'Run npx create-turbo@latest to scaffold a new Turborepo monorepo. This creates a starter repository with an apps directory for applications, a packages directory for shared libraries, a turbo.json configuration, and workspace configuration for your chosen package manager. You can also add Turborepo to an existing monorepo by installing turbo as a dev dependency and creating a turbo.json file.',
    faq7Q: 'Can I use Turborepo with Docker?',
    faq7A: 'Yes. Turborepo provides the turbo prune command specifically for Docker builds. It generates a sparse subset of your monorepo containing only the package files and dependencies needed for a specific application. This results in smaller Docker images and better layer caching because unrelated package changes no longer invalidate your Docker build cache.',
    faq8Q: 'Is Turborepo free to use?',
    faq8A: 'Yes, Turborepo is open source and free to use under the MIT license. Vercel offers a free tier for remote caching that includes generous usage limits for small teams. For larger teams or enterprises, Vercel offers paid plans with increased cache storage and additional features. You can also self-host a remote cache server using open-source implementations.',
  },
  zh: {
    title: 'Turborepo 指南 2026：Monorepo 构建系统、远程缓存与任务管道',
    intro: 'Turborepo 是一个面向 JavaScript 和 TypeScript monorepo 的高性能构建系统。由 Jared Palmer 创建，现由 Vercel 维护，Turborepo 通过智能缓存和任务调度大幅加速多包仓库的构建、测试和代码检查。无论你管理少量共享库还是数十个应用，Turborepo 通过理解包之间的依赖关系图来消除冗余工作，只重新构建发生变化的部分。',
    tldr: 'Turborepo 是一个 monorepo 构建系统，使用内容感知哈希、远程缓存（Vercel Remote Cache）和并行任务执行来将构建速度提升 65-85%。它支持 npm、pnpm 和 yarn 工作区，通过 turbo.json 进行最少配置，并集成任何 CI/CD 平台。Turborepo 理解任务依赖关系图，跳过已完成的工作，并在整个团队间共享缓存产物。',
    keyTakeaway1: 'Turborepo 使用内容感知哈希跳过输入未改变的任务，通常可减少 65-85% 的 CI 时间。',
    keyTakeaway2: '远程缓存在整个团队和 CI 间共享构建产物，一个开发者的构建结果惠及所有人。',
    keyTakeaway3: 'turbo.json 中的任务管道系统定义任务间的依赖关系，实现最大并行执行。',
    keyTakeaway4: 'Turborepo 支持 npm、pnpm 和 yarn 工作区，无需更换现有的包管理器。',
    keyTakeaway5: 'turbo prune 命令生成精简的 monorepo 子集，用于高效的 Docker 镜像构建。',
    keyTakeaway6: '相比 Nx 等替代方案，Turborepo 几乎零配置，使现有 monorepo 的采用变得简单。',

    h2WhatIs: '什么是 Turborepo？为什么选择 Monorepo？',
    whatIsDesc: 'Monorepo 是一个包含多个项目、包或应用的单一仓库。Google、Meta 和 Microsoft 等公司多年来一直使用 monorepo，因为它简化了代码共享、统一了工具链，并使跨项目变更成为原子操作。然而，随着 monorepo 增长，构建时间会爆炸式增长。',
    whatIsDesc2: 'Turborepo 作为一个智能任务运行器运行在包管理器工作区之上。它分析包之间的依赖图，确定哪些包受到更改影响，并以最优顺序、最大并行度执行任务。当任务以相同输入运行过时，Turborepo 在毫秒内重放缓存输出。',

    h2Comparison: 'Turborepo vs Nx vs Lerna 对比',
    comparisonDesc: 'Turborepo、Nx 和 Lerna 是 JavaScript 生态中最流行的三个 monorepo 工具，各有不同优势。',
    compFeature: '功能',
    compTurborepo: 'Turborepo',
    compNx: 'Nx',
    compLerna: 'Lerna',
    compSetup: '设置复杂度',
    compSetupTurbo: '极简（一个 turbo.json）',
    compSetupNx: '中等（nx.json + project.json）',
    compSetupLerna: '极简（lerna.json）',
    compCache: '本地缓存',
    compCacheTurbo: '内置，内容感知',
    compCacheNx: '内置，计算缓存',
    compCacheLerna: '通过 Nx 插件',
    compRemote: '远程缓存',
    compRemoteTurbo: 'Vercel Remote Cache（免费层）',
    compRemoteNx: 'Nx Cloud（免费层）',
    compRemoteLerna: '通过 Nx Cloud',
    compTaskGraph: '任务图',
    compTaskGraphTurbo: 'turbo.json 管道',
    compTaskGraphNx: 'project.json targets + nx.json',
    compTaskGraphLerna: '基本拓扑排序',
    compCodeGen: '代码生成',
    compCodeGenTurbo: 'turbo gen（基础）',
    compCodeGenNx: '丰富的生成器 + 插件',
    compCodeGenLerna: '无内置功能',
    compDocker: 'Docker 裁剪',
    compDockerTurbo: 'turbo prune（内置）',
    compDockerNx: '手动或社区插件',
    compDockerLerna: '手动',
    compPlugins: '插件生态',
    compPluginsTurbo: '极简（专注工具）',
    compPluginsNx: '丰富（React、Angular、Node 等）',
    compPluginsLerna: '极简',
    compBestFor: '最适合',
    compBestForTurbo: '追求速度和最少配置的团队',
    compBestForNx: '需要全功能 monorepo 平台的企业团队',
    compBestForLerna: '简单 monorepo 或遗留项目',

    h2TurboJson: 'turbo.json 配置',
    turboJsonDesc: '仓库根目录的 turbo.json 文件是 Turborepo 的唯一配置文件，定义任务管道、缓存行为和全局依赖。',

    h2Pipelines: '管道与任务图',
    pipelinesDesc: 'Turborepo 管道定义 monorepo 中任务间的关系。运行 turbo run build 时，Turborepo 读取管道配置理解任务依赖，然后以最优顺序、最大并行度执行。',
    pipelinesDesc2: '关键是 dependsOn 字段。当任务列出 "^build" 作为依赖时，^ 表示依赖包依赖项的 build 任务，而非同一包中的 build 任务。这确保共享库在消费它们的应用之前构建。',

    h2RemoteCache: '使用 Vercel Remote Cache 的远程缓存',
    remoteCacheDesc: '远程缓存是 Turborepo 最具影响力的功能。启用后，构建产物在整个团队和 CI 基础设施间共享。开发者 A 本地构建的包，开发者 B 和 CI 管道可以直接复用。',
    remoteCacheDesc2: 'Vercel 为 Turborepo 提供免费的远程缓存层。你也可以使用开源实现自托管远程缓存服务器。',

    h2Workspaces: '工作区设置：npm、pnpm 和 yarn',
    workspacesDesc: 'Turborepo 运行在包管理器工作区之上，不替代 npm、pnpm 或 yarn，而是用缓存和任务编排增强它们。',

    h2SharedPackages: '共享包与内部包',
    sharedPkgDesc: '内部包是组织良好的 monorepo 的基石，允许在应用间共享代码（UI 组件、工具函数、TypeScript 配置、ESLint 配置）而无需发布到 npm。',
    sharedPkgDesc2: '工作区协议（workspace:*）告诉包管理器从本地工作区解析依赖而非 npm 注册表，开发时共享包的更改立即反映在消费应用中。',

    h2TypeScript: 'Monorepo 中的 TypeScript 配置',
    tsDesc: '在 monorepo 中管理 TypeScript 需要分层配置策略。在内部包中创建共享基础 tsconfig，然后在每个应用和包中继承它。',

    h2CICD: 'GitHub Actions CI/CD 集成',
    cicdDesc: 'Turborepo 与 GitHub Actions 等 CI 平台无缝集成。关键优化是启用远程缓存，使 CI 运行受益于其他运行和本地开发产生的缓存产物。',

    h2Incremental: '增量构建与内容哈希',
    incrementalDesc: 'Turborepo 通过计算任务输入的内容感知哈希来决定是否重新运行。输入包括包中的源文件、turbo.json 管道配置、env 中的环境变量以及依赖包的哈希值。',
    incrementalDesc2: '这种方法比基于时间戳的失效更可靠，因为它能捕获从 git 恢复或从其他机器复制文件的情况。',

    h2DockerPrune: 'Docker 构建裁剪',
    dockerDesc: '为 monorepo 应用构建 Docker 镜像很棘手，因为 Docker COPY 会复制整个仓库。turbo prune 命令生成仅包含特定应用所需文件的精简子集。',

    h2Generators: '生成器：脚手架新包',
    generatorsDesc: 'Turborepo 包含代码生成功能（turbo gen），帮助你在 monorepo 中创建新包和应用。生成器底层使用 Plop 模板。',

    h2EnvVars: '环境变量处理',
    envVarsDesc: '环境变量是缓存等式的关键部分。如果构建依赖于 API_URL 等环境变量，需要在 turbo.json 中声明以便变量更改时使缓存失效。',
    envVarsDesc2: 'env 键是每个任务的，只影响该任务的哈希。globalEnv 键应用于管道中的所有任务。',

    h2Migration: '迁移指南：将 Turborepo 添加到现有 Monorepo',
    migrationDesc: '在现有 monorepo 中采用 Turborepo 很简单，因为它与现有的包管理器和脚本配合工作，无需重构仓库。',
    migrationStep1: '步骤 1：在 monorepo 根目录安装 Turborepo 作为开发依赖。',
    migrationStep2: '步骤 2：在仓库根目录创建 turbo.json 文件定义任务管道。',
    migrationStep3: '步骤 3：更新根 package.json 脚本使用 turbo run 替代包管理器工作区命令。',
    migrationStep4: '步骤 4：运行 turbo login 和 turbo link 启用远程缓存。',
    migrationStep5: '步骤 5：更新 CI 管道使用 turbo run 配合 --filter 标志。',

    h2BestPractices: '最佳实践',
    bp1: '将 turbo.json 作为任务依赖的唯一真实来源，避免在 package.json 脚本中重复管道逻辑。',
    bp2: '始终在 turbo.json 的 env 或 globalEnv 中声明影响构建输出的环境变量。',
    bp3: '内部包依赖使用 workspace:* 协议确保开发时本地解析。',
    bp4: '从第一天起启用远程缓存，即使是个人开发者也能受益于 CI 缓存产物。',
    bp5: 'Docker 构建使用 turbo prune 最小化镜像大小并最大化层缓存。',
    bp6: '将共享代码结构化为专注的内部包（ui、utils、config-typescript、config-eslint）。',
    bp7: '开发时使用 --filter 为特定包运行任务，而非运行所有内容。',
    bp8: '使用 package.json 中的 packageManager 或 .turbo/config.json 固定团队的 Turborepo 版本。',
    bp9: '使用 turbo run dev 设置监视模式，利用持久任务和变更自动重启。',
    bp10: '使用 --summarize 分析任务执行以识别瓶颈和优化管道依赖。',

    h2Faq: '常见问题',
    faq1Q: 'Turborepo 用来做什么？',
    faq1A: 'Turborepo 是面向 JavaScript 和 TypeScript monorepo 的构建系统和任务运行器。它通过缓存任务结果和仅重新执行输入已更改的任务来加速构建、测试和代码检查。',
    faq2Q: 'Turborepo 缓存如何工作？',
    faq2A: 'Turborepo 基于源文件、环境变量和依赖哈希为每个任务计算内容感知哈希。如果哈希匹配之前的运行，Turborepo 重放缓存的输出文件和终端日志。',
    faq3Q: 'Turborepo 比 Nx 好吗？',
    faq3A: 'Turborepo 是专注的构建系统，配置最少，擅长缓存和任务调度。Nx 是全功能 monorepo 平台，有丰富的代码生成器和框架插件。简单选 Turborepo，全面管理选 Nx。',
    faq4Q: 'Turborepo 支持 pnpm 吗？',
    faq4A: '支持。Turborepo 原生支持 pnpm 工作区，pnpm 因其严格的依赖隔离和高效的磁盘存储而成为推荐的包管理器。',
    faq5Q: '什么是 Turborepo 远程缓存？',
    faq5A: '远程缓存将构建产物存储在共享缓存中（默认 Vercel Remote Cache），团队成员和 CI 可以复用缓存结果而非从头构建。通常减少 65-85% 的 CI 时间。',
    faq6Q: '如何从零开始创建 Turborepo monorepo？',
    faq6A: '运行 npx create-turbo@latest 创建新的 Turborepo monorepo，包括 apps 目录、packages 目录、turbo.json 配置和工作区配置。也可以在现有 monorepo 中安装 turbo 并创建 turbo.json。',
    faq7Q: 'Turborepo 能配合 Docker 使用吗？',
    faq7A: '可以。turbo prune 命令专为 Docker 构建设计，生成仅包含特定应用所需文件和依赖的精简子集，产生更小的镜像和更好的层缓存。',
    faq8Q: 'Turborepo 免费吗？',
    faq8A: 'Turborepo 是 MIT 许可的开源项目，免费使用。Vercel 提供免费的远程缓存层。大型团队可选择 Vercel 付费计划或使用开源实现自托管远程缓存。',
  },
};

export default function TurborepoGuide({ lang }: { lang: string }) {
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

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };
  const thStyle: React.CSSProperties = { padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600, fontSize: '0.875rem' };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.875rem', lineHeight: '1.5' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* What Is Turborepo */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'# Create a new Turborepo monorepo\n'
        + 'npx create-turbo@latest my-monorepo\n'
        + '\n'
        + '# Choose your package manager\n'
        + '? Which package manager do you want to use?\n'
        + '  > pnpm (recommended)\n'
        + '    npm\n'
        + '    yarn\n'
        + '\n'
        + '# Resulting structure:\n'
        + 'my-monorepo/\n'
        + '  apps/\n'
        + '    web/          # Next.js application\n'
        + '    docs/         # Documentation site\n'
        + '  packages/\n'
        + '    ui/           # Shared React component library\n'
        + '    config-ts/    # Shared TypeScript configuration\n'
        + '    config-eslint/ # Shared ESLint configuration\n'
        + '  turbo.json      # Turborepo configuration\n'
        + '  package.json    # Root workspace configuration\n'
        + '  pnpm-workspace.yaml  # pnpm workspace definition'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e2e8f0' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={thStyle}>{t.compFeature}</th>
              <th style={thStyle}>{t.compTurborepo}</th>
              <th style={thStyle}>{t.compNx}</th>
              <th style={thStyle}>{t.compLerna}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compSetup, t.compSetupTurbo, t.compSetupNx, t.compSetupLerna],
              [t.compCache, t.compCacheTurbo, t.compCacheNx, t.compCacheLerna],
              [t.compRemote, t.compRemoteTurbo, t.compRemoteNx, t.compRemoteLerna],
              [t.compTaskGraph, t.compTaskGraphTurbo, t.compTaskGraphNx, t.compTaskGraphLerna],
              [t.compCodeGen, t.compCodeGenTurbo, t.compCodeGenNx, t.compCodeGenLerna],
              [t.compDocker, t.compDockerTurbo, t.compDockerNx, t.compDockerLerna],
              [t.compPlugins, t.compPluginsTurbo, t.compPluginsNx, t.compPluginsLerna],
              [t.compBestFor, t.compBestForTurbo, t.compBestForNx, t.compBestForLerna],
            ].map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                <td style={tdStyle}>{row[1]}</td>
                <td style={tdStyle}>{row[2]}</td>
                <td style={tdStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* turbo.json Configuration */}
      <h2 style={sectionTitle}>{t.h2TurboJson}</h2>
      <p style={para}>{t.turboJsonDesc}</p>
      <pre style={codeBlock}><code>{'// turbo.json\n'
        + '{\n'
        + '  "\$schema": "https://turbo.build/schema.json",\n'
        + '  "globalDependencies": [\n'
        + '    "**/.env.*local",\n'
        + '    ".env"\n'
        + '  ],\n'
        + '  "globalEnv": ["CI", "NODE_ENV"],\n'
        + '  "tasks": {\n'
        + '    "build": {\n'
        + '      "dependsOn": ["^build"],\n'
        + '      "inputs": ["src/**", "tsconfig.json", "package.json"],\n'
        + '      "outputs": ["dist/**", ".next/**", "!.next/cache/**"],\n'
        + '      "env": ["NEXT_PUBLIC_API_URL", "DATABASE_URL"]\n'
        + '    },\n'
        + '    "test": {\n'
        + '      "dependsOn": ["build"],\n'
        + '      "inputs": ["src/**", "test/**", "vitest.config.*"],\n'
        + '      "outputs": ["coverage/**"],\n'
        + '      "env": ["TEST_DATABASE_URL"]\n'
        + '    },\n'
        + '    "lint": {\n'
        + '      "dependsOn": ["^build"],\n'
        + '      "inputs": ["src/**", ".eslintrc.*", "eslint.config.*"]\n'
        + '    },\n'
        + '    "typecheck": {\n'
        + '      "dependsOn": ["^build"],\n'
        + '      "inputs": ["src/**", "tsconfig.json"]\n'
        + '    },\n'
        + '    "dev": {\n'
        + '      "cache": false,\n'
        + '      "persistent": true\n'
        + '    },\n'
        + '    "clean": {\n'
        + '      "cache": false\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Pipelines and Task Graph */}
      <h2 style={sectionTitle}>{t.h2Pipelines}</h2>
      <p style={para}>{t.pipelinesDesc}</p>
      <p style={para}>{t.pipelinesDesc2}</p>
      <pre style={codeBlock}><code>{'# Run build for all packages (respects dependency graph)\n'
        + 'turbo run build\n'
        + '\n'
        + '# Run multiple tasks in the correct order\n'
        + 'turbo run build test lint\n'
        + '\n'
        + '# Run build only for the web app and its dependencies\n'
        + 'turbo run build --filter=web\n'
        + '\n'
        + '# Run build for packages affected by changes since main\n'
        + 'turbo run build --filter=...[main...HEAD]\n'
        + '\n'
        + '# Run tests only for packages that changed\n'
        + 'turbo run test --filter=[HEAD^1]\n'
        + '\n'
        + '# Visualize the task graph (opens in browser)\n'
        + 'turbo run build --graph\n'
        + '\n'
        + '# Dry run: show what would execute without running\n'
        + 'turbo run build --dry=json'}</code></pre>

      {/* Remote Caching */}
      <h2 style={sectionTitle}>{t.h2RemoteCache}</h2>
      <p style={para}>{t.remoteCacheDesc}</p>
      <p style={para}>{t.remoteCacheDesc2}</p>
      <pre style={codeBlock}><code>{'# Step 1: Login to Vercel\n'
        + 'turbo login\n'
        + '\n'
        + '# Step 2: Link your repo to a Vercel project\n'
        + 'turbo link\n'
        + '\n'
        + '# Now all turbo commands use remote caching automatically\n'
        + 'turbo run build\n'
        + '# >>> FULL TURBO (cache hit from remote)\n'
        + '\n'
        + '# For CI: use a Vercel token instead of interactive login\n'
        + '# Set TURBO_TOKEN and TURBO_TEAM environment variables\n'
        + 'TURBO_TOKEN=your_vercel_token \\\n'
        + 'TURBO_TEAM=your_team_slug \\\n'
        + 'turbo run build\n'
        + '\n'
        + '# Disable remote caching temporarily\n'
        + 'turbo run build --remote-only=false\n'
        + '\n'
        + '# View cache status for a run\n'
        + 'turbo run build --summarize'}</code></pre>

      {/* Workspace Setup */}
      <h2 style={sectionTitle}>{t.h2Workspaces}</h2>
      <p style={para}>{t.workspacesDesc}</p>
      <h3 style={subTitle}>pnpm (Recommended)</h3>
      <pre style={codeBlock}><code>{'# pnpm-workspace.yaml\n'
        + 'packages:\n'
        + '  - "apps/*"\n'
        + '  - "packages/*"\n'
        + '\n'
        + '# Root package.json\n'
        + '{\n'
        + '  "name": "my-monorepo",\n'
        + '  "private": true,\n'
        + '  "packageManager": "pnpm@9.15.0",\n'
        + '  "scripts": {\n'
        + '    "build": "turbo run build",\n'
        + '    "dev": "turbo run dev",\n'
        + '    "lint": "turbo run lint",\n'
        + '    "test": "turbo run test"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "turbo": "^2.4.0"\n'
        + '  }\n'
        + '}'}</code></pre>
      <h3 style={subTitle}>npm Workspaces</h3>
      <pre style={codeBlock}><code>{'// Root package.json for npm workspaces\n'
        + '{\n'
        + '  "name": "my-monorepo",\n'
        + '  "private": true,\n'
        + '  "workspaces": [\n'
        + '    "apps/*",\n'
        + '    "packages/*"\n'
        + '  ],\n'
        + '  "scripts": {\n'
        + '    "build": "turbo run build",\n'
        + '    "dev": "turbo run dev"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "turbo": "^2.4.0"\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Shared Packages */}
      <h2 style={sectionTitle}>{t.h2SharedPackages}</h2>
      <p style={para}>{t.sharedPkgDesc}</p>
      <p style={para}>{t.sharedPkgDesc2}</p>
      <pre style={codeBlock}><code>{'// packages/ui/package.json\n'
        + '{\n'
        + '  "name": "@repo/ui",\n'
        + '  "version": "0.0.0",\n'
        + '  "private": true,\n'
        + '  "main": "./src/index.ts",\n'
        + '  "types": "./src/index.ts",\n'
        + '  "exports": {\n'
        + '    ".": "./src/index.ts",\n'
        + '    "./button": "./src/button.tsx",\n'
        + '    "./card": "./src/card.tsx"\n'
        + '  },\n'
        + '  "dependencies": {\n'
        + '    "react": "^19.0.0"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "@repo/config-typescript": "workspace:*",\n'
        + '    "typescript": "^5.7.0"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// apps/web/package.json (consuming the shared package)\n'
        + '{\n'
        + '  "name": "web",\n'
        + '  "dependencies": {\n'
        + '    "@repo/ui": "workspace:*",\n'
        + '    "next": "^15.0.0",\n'
        + '    "react": "^19.0.0"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Usage in apps/web/src/app/page.tsx\n'
        + 'import { Button } from "@repo/ui/button";\n'
        + 'import { Card } from "@repo/ui/card";\n'
        + '\n'
        + 'export default function Home() {\n'
        + '  return (\n'
        + '    <Card>\n'
        + '      <Button onClick={() => alert("clicked")}>\n'
        + '        Get Started\n'
        + '      </Button>\n'
        + '    </Card>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* TypeScript Configuration */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.tsDesc}</p>
      <pre style={codeBlock}><code>{'// packages/config-typescript/base.json\n'
        + '{\n'
        + '  "compilerOptions": {\n'
        + '    "strict": true,\n'
        + '    "esModuleInterop": true,\n'
        + '    "skipLibCheck": true,\n'
        + '    "forceConsistentCasingInFileNames": true,\n'
        + '    "resolveJsonModule": true,\n'
        + '    "isolatedModules": true,\n'
        + '    "moduleDetection": "force",\n'
        + '    "declaration": true,\n'
        + '    "declarationMap": true,\n'
        + '    "sourceMap": true\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// packages/config-typescript/nextjs.json\n'
        + '{\n'
        + '  "extends": "./base.json",\n'
        + '  "compilerOptions": {\n'
        + '    "target": "ES2017",\n'
        + '    "lib": ["dom", "dom.iterable", "esnext"],\n'
        + '    "module": "esnext",\n'
        + '    "moduleResolution": "bundler",\n'
        + '    "jsx": "preserve",\n'
        + '    "noEmit": true,\n'
        + '    "incremental": true,\n'
        + '    "plugins": [{ "name": "next" }]\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// apps/web/tsconfig.json\n'
        + '{\n'
        + '  "extends": "@repo/config-typescript/nextjs.json",\n'
        + '  "compilerOptions": {\n'
        + '    "paths": {\n'
        + '      "@/*": ["./src/*"]\n'
        + '    }\n'
        + '  },\n'
        + '  "include": ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],\n'
        + '  "exclude": ["node_modules"]\n'
        + '}'}</code></pre>

      {/* CI/CD */}
      <h2 style={sectionTitle}>{t.h2CICD}</h2>
      <p style={para}>{t.cicdDesc}</p>
      <pre style={codeBlock}><code>{'# .github/workflows/ci.yml\n'
        + 'name: CI\n'
        + 'on:\n'
        + '  push:\n'
        + '    branches: [main]\n'
        + '  pull_request:\n'
        + '    branches: [main]\n'
        + '\n'
        + 'env:\n'
        + '  TURBO_TOKEN: \\${{ secrets.TURBO_TOKEN }}\n'
        + '  TURBO_TEAM: \\${{ vars.TURBO_TEAM }}\n'
        + '\n'
        + 'jobs:\n'
        + '  build:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '        with:\n'
        + '          fetch-depth: 2\n'
        + '\n'
        + '      - uses: pnpm/action-setup@v4\n'
        + '        with:\n'
        + '          version: 9\n'
        + '\n'
        + '      - uses: actions/setup-node@v4\n'
        + '        with:\n'
        + '          node-version: 20\n'
        + '          cache: pnpm\n'
        + '\n'
        + '      - run: pnpm install --frozen-lockfile\n'
        + '\n'
        + '      - name: Build, lint, and test\n'
        + '        run: turbo run build lint test\n'
        + '\n'
        + '      - name: Build only affected packages (PRs)\n'
        + '        if: github.event_name == \'pull_request\'\n'
        + '        run: turbo run build --filter=...[origin/main...HEAD]'}</code></pre>

      {/* Incremental Builds */}
      <h2 style={sectionTitle}>{t.h2Incremental}</h2>
      <p style={para}>{t.incrementalDesc}</p>
      <p style={para}>{t.incrementalDesc2}</p>
      <pre style={codeBlock}><code>{'# View the hash inputs for a task\n'
        + 'turbo run build --dry=json\n'
        + '\n'
        + '# Output includes hash details:\n'
        + '# {\n'
        + '#   "taskId": "web#build",\n'
        + '#   "hash": "a1b2c3d4e5f6",\n'
        + '#   "inputs": {\n'
        + '#     "src/app/page.tsx": "sha256:...",\n'
        + '#     "package.json": "sha256:...",\n'
        + '#     "tsconfig.json": "sha256:..."\n'
        + '#   },\n'
        + '#   "hashOfExternalDependencies": "sha256:...",\n'
        + '#   "environmentVariables": {\n'
        + '#     "NEXT_PUBLIC_API_URL": "sha256:..."\n'
        + '#   },\n'
        + '#   "cache": {\n'
        + '#     "status": "HIT",\n'
        + '#     "source": "REMOTE"\n'
        + '#   }\n'
        + '# }\n'
        + '\n'
        + '# Force re-execution (ignore cache)\n'
        + 'turbo run build --force\n'
        + '\n'
        + '# Generate a summary of cache performance\n'
        + 'turbo run build --summarize'}</code></pre>

      {/* Docker Pruning */}
      <h2 style={sectionTitle}>{t.h2DockerPrune}</h2>
      <p style={para}>{t.dockerDesc}</p>
      <pre style={codeBlock}><code>{'# Dockerfile for a monorepo app using turbo prune\n'
        + 'FROM node:20-alpine AS base\n'
        + 'RUN apk add --no-cache libc6-compat\n'
        + 'RUN corepack enable && corepack prepare pnpm@9 --activate\n'
        + '\n'
        + '# Stage 1: Prune the monorepo for the target app\n'
        + 'FROM base AS pruner\n'
        + 'WORKDIR /app\n'
        + 'COPY . .\n'
        + 'RUN npx turbo prune web --docker\n'
        + '\n'
        + '# Stage 2: Install dependencies\n'
        + 'FROM base AS installer\n'
        + 'WORKDIR /app\n'
        + 'COPY --from=pruner /app/out/json/ .\n'
        + 'COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml\n'
        + 'RUN pnpm install --frozen-lockfile\n'
        + '\n'
        + '# Stage 3: Build the application\n'
        + 'COPY --from=pruner /app/out/full/ .\n'
        + 'RUN pnpm turbo run build --filter=web\n'
        + '\n'
        + '# Stage 4: Production image\n'
        + 'FROM base AS runner\n'
        + 'WORKDIR /app\n'
        + 'RUN addgroup --system --gid 1001 nodejs\n'
        + 'RUN adduser --system --uid 1001 nextjs\n'
        + 'USER nextjs\n'
        + 'COPY --from=installer /app/apps/web/.next/standalone ./\n'
        + 'COPY --from=installer /app/apps/web/.next/static ./apps/web/.next/static\n'
        + 'COPY --from=installer /app/apps/web/public ./apps/web/public\n'
        + 'CMD ["node", "apps/web/server.js"]'}</code></pre>

      {/* Generators */}
      <h2 style={sectionTitle}>{t.h2Generators}</h2>
      <p style={para}>{t.generatorsDesc}</p>
      <pre style={codeBlock}><code>{'# Generate a new package interactively\n'
        + 'turbo gen workspace\n'
        + '\n'
        + '# Create a custom generator\n'
        + '# turbo/generators/config.ts\n'
        + 'import type { PlopTypes } from "@turbo/gen";\n'
        + '\n'
        + 'export default function generator(plop: PlopTypes.NodePlopAPI) {\n'
        + '  plop.setGenerator("react-package", {\n'
        + '    description: "Create a new React package",\n'
        + '    prompts: [\n'
        + '      {\n'
        + '        type: "input",\n'
        + '        name: "name",\n'
        + '        message: "Package name (e.g., button):",\n'
        + '      },\n'
        + '    ],\n'
        + '    actions: [\n'
        + '      {\n'
        + '        type: "add",\n'
        + '        path: "packages/{{ name }}/package.json",\n'
        + '        templateFile: "templates/package.json.hbs",\n'
        + '      },\n'
        + '      {\n'
        + '        type: "add",\n'
        + '        path: "packages/{{ name }}/src/index.ts",\n'
        + '        template: \'export * from "./{{ name }}";\',\n'
        + '      },\n'
        + '      {\n'
        + '        type: "add",\n'
        + '        path: "packages/{{ name }}/tsconfig.json",\n'
        + '        templateFile: "templates/tsconfig.json.hbs",\n'
        + '      },\n'
        + '    ],\n'
        + '  });\n'
        + '}\n'
        + '\n'
        + '# Run the custom generator\n'
        + 'turbo gen react-package'}</code></pre>

      {/* Environment Variables */}
      <h2 style={sectionTitle}>{t.h2EnvVars}</h2>
      <p style={para}>{t.envVarsDesc}</p>
      <p style={para}>{t.envVarsDesc2}</p>
      <pre style={codeBlock}><code>{'// turbo.json - Environment variable configuration\n'
        + '{\n'
        + '  "globalEnv": [\n'
        + '    "CI",\n'
        + '    "NODE_ENV",\n'
        + '    "VERCEL_URL"\n'
        + '  ],\n'
        + '  "globalDependencies": [\n'
        + '    ".env",\n'
        + '    ".env.local"\n'
        + '  ],\n'
        + '  "tasks": {\n'
        + '    "build": {\n'
        + '      "dependsOn": ["^build"],\n'
        + '      "env": [\n'
        + '        "NEXT_PUBLIC_API_URL",\n'
        + '        "NEXT_PUBLIC_GA_ID",\n'
        + '        "DATABASE_URL"\n'
        + '      ]\n'
        + '    },\n'
        + '    "test": {\n'
        + '      "env": [\n'
        + '        "TEST_DATABASE_URL",\n'
        + '        "MOCK_API"\n'
        + '      ]\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '# Use environment variable passthrough for wildcards\n'
        + '# turbo.json supports prefix matching:\n'
        + '# "env": ["NEXT_PUBLIC_*"] matches all NEXT_PUBLIC_ variables'}</code></pre>

      {/* Migration Guide */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>{t.migrationStep1}</strong></li>
        <li style={listItem}><strong>{t.migrationStep2}</strong></li>
        <li style={listItem}><strong>{t.migrationStep3}</strong></li>
        <li style={listItem}><strong>{t.migrationStep4}</strong></li>
        <li style={listItem}><strong>{t.migrationStep5}</strong></li>
      </ol>
      <pre style={codeBlock}><code>{'# Step 1: Install Turborepo\n'
        + 'pnpm add -Dw turbo\n'
        + '\n'
        + '# Step 2: Create turbo.json (see configuration section above)\n'
        + '\n'
        + '# Step 3: Update root package.json scripts\n'
        + '# Before:\n'
        + '#   "build": "pnpm -r run build"\n'
        + '#   "test": "pnpm -r run test"\n'
        + '# After:\n'
        + '#   "build": "turbo run build"\n'
        + '#   "test": "turbo run test"\n'
        + '\n'
        + '# Step 4: Enable remote caching\n'
        + 'turbo login\n'
        + 'turbo link\n'
        + '\n'
        + '# Step 5: Run your first cached build\n'
        + 'turbo run build\n'
        + '# First run: executes everything normally\n'
        + '# Second run: >>> FULL TURBO (all cache hits)'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
        <li style={listItem}>{t.bp9}</li>
        <li style={listItem}>{t.bp10}</li>
      </ul>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
