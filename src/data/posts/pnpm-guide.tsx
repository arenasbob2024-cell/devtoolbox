'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'pnpm Guide 2026: Fast, Disk-Efficient Package Manager for Node.js',
    intro: 'pnpm is a fast, disk space efficient package manager for Node.js that uses a content-addressable store and hard links to save disk space and speed up installations. Unlike npm and Yarn, pnpm creates a non-flat node_modules structure that enforces strict dependency resolution, preventing phantom dependencies and ensuring your project only accesses packages it explicitly declares. With built-in monorepo support through workspaces, patching capabilities, and excellent CI/CD integration, pnpm has become the package manager of choice for many production teams and open source projects.',
    tldr: 'pnpm is a Node.js package manager that uses a global content-addressable store with hard links, saving up to 70% disk space compared to npm. It creates a strict non-flat node_modules layout that prevents phantom dependencies, supports monorepos via pnpm-workspace.yaml, offers up to 2x faster installs than npm, and provides features like package patching, overrides, and side-by-side protocol for linking local packages.',
    keyTakeaway1: 'pnpm uses a content-addressable store where every version of every package is stored only once on disk, saving massive amounts of space across projects.',
    keyTakeaway2: 'The strict non-flat node_modules structure prevents phantom dependencies, meaning your code cannot accidentally import packages not declared in package.json.',
    keyTakeaway3: 'pnpm workspaces provide first-class monorepo support with pnpm-workspace.yaml, workspace protocol, and catalogs for shared dependency versions.',
    keyTakeaway4: 'Installation speeds are up to 2x faster than npm and comparable to Yarn, especially on CI with warm caches.',
    keyTakeaway5: 'The pnpm patch command lets you apply patches to third-party packages without forking, tracked in your repository via patchedDependencies.',
    keyTakeaway6: 'pnpm is fully compatible with npm registries and can be activated via Corepack, the built-in Node.js package manager manager.',

    h2WhatIs: 'What Is pnpm and Content-Addressable Storage?',
    whatIsDesc: 'pnpm stands for performant npm. It was created in 2017 by Zoltan Kochan to solve two fundamental problems with npm: wasted disk space from duplicated packages across projects and the flat node_modules structure that allows phantom dependencies. pnpm introduces a fundamentally different approach to package management by using a global content-addressable store combined with hard links and symlinks.',
    whatIsDesc2: 'When you install a package with pnpm, the package files are stored in a single global store (typically at ~/.local/share/pnpm/store or ~/.pnpm-store). Each file is stored by its content hash, so identical files across different package versions are stored only once. Your project node_modules directory contains hard links to the store rather than copies of the actual files. This means if you have 10 projects using React 19, the React files exist only once on disk.',
    whatIsDesc3: 'The node_modules layout created by pnpm is non-flat. Instead of hoisting all dependencies to the root level like npm, pnpm uses a nested structure with symlinks. Only the packages listed in your package.json are directly accessible. Transitive dependencies are stored in a hidden .pnpm directory and linked from there. This strict isolation prevents your code from importing packages it does not explicitly depend on.',

    h2Comparison: 'pnpm vs npm vs Yarn vs Bun',
    comparisonDesc: 'Each Node.js package manager has different trade-offs in speed, disk usage, strictness, and ecosystem support. Here is how pnpm compares to the alternatives across key dimensions:',
    compColFeature: 'Feature',
    compColPnpm: 'pnpm',
    compColNpm: 'npm',
    compColYarn: 'Yarn (Berry)',
    compColBun: 'Bun',
    compRow1: 'Disk usage',
    compRow1Pnpm: 'Minimal (content-addressable store + hard links)',
    compRow1Npm: 'High (full copies per project)',
    compRow1Yarn: 'Low with PnP (no node_modules)',
    compRow1Bun: 'High (full copies per project)',
    compRow2: 'Install speed',
    compRow2Pnpm: 'Fast (2x npm on average)',
    compRow2Npm: 'Baseline',
    compRow2Yarn: 'Fast with PnP, moderate with node_modules',
    compRow2Bun: 'Very fast (native runtime)',
    compRow3: 'Strictness',
    compRow3Pnpm: 'Strict (no phantom deps)',
    compRow3Npm: 'Loose (flat hoisting)',
    compRow3Yarn: 'Strict with PnP, loose with node_modules',
    compRow3Bun: 'Loose (flat hoisting)',
    compRow4: 'Monorepo support',
    compRow4Pnpm: 'Built-in workspaces + catalogs',
    compRow4Npm: 'Basic workspaces',
    compRow4Yarn: 'Built-in workspaces + constraints',
    compRow4Bun: 'Basic workspaces',
    compRow5: 'Lockfile',
    compRow5Pnpm: 'pnpm-lock.yaml (YAML)',
    compRow5Npm: 'package-lock.json (JSON)',
    compRow5Yarn: 'yarn.lock (custom format)',
    compRow5Bun: 'bun.lock (binary)',
    compRow6: 'Patching',
    compRow6Pnpm: 'Built-in pnpm patch',
    compRow6Npm: 'Requires patch-package',
    compRow6Yarn: 'Built-in yarn patch',
    compRow6Bun: 'Built-in bun patch',

    h2Installation: 'Installation and Setup with Corepack',
    installDesc: 'The recommended way to install pnpm is through Corepack, a tool included with Node.js 16.13+ that manages package manager versions. Corepack ensures every developer on your team uses the exact same pnpm version without manual installation.',
    installDesc2: 'You can also install pnpm standalone using npm, Homebrew, or a direct install script. Once installed, pnpm uses the same npm registry and respects .npmrc configuration files.',

    h2Commands: 'Essential pnpm Commands',
    commandsDesc: 'pnpm commands closely mirror npm commands, making the transition straightforward. The key difference is that pnpm enforces stricter behavior by default and provides additional commands for monorepo management.',
    h3Install: 'Installing Dependencies',
    installCmdDesc: 'The pnpm install command reads package.json and installs all dependencies. It creates or updates pnpm-lock.yaml and sets up the content-addressable node_modules structure.',
    h3AddRemove: 'Adding and Removing Packages',
    addRemoveDesc: 'Use pnpm add to add new packages and pnpm remove to uninstall them. pnpm add supports the same flags as npm install for dev, peer, and optional dependencies.',
    h3Update: 'Updating Packages',
    updateDesc: 'pnpm update checks for newer versions of installed packages. Use the --latest flag to ignore semver ranges and update to the absolute latest version.',
    h3Run: 'Running Scripts',
    runDesc: 'pnpm run executes scripts defined in package.json. Unlike npm, pnpm does not automatically add node_modules/.bin to the PATH for lifecycle scripts, enforcing explicit script declarations.',

    h2Workspace: 'Monorepo Workspaces with pnpm-workspace.yaml',
    workspaceDesc: 'pnpm has first-class monorepo support through its workspace feature. You define your workspace packages in a pnpm-workspace.yaml file at the repository root, and pnpm handles dependency linking, cross-package builds, and shared dependencies automatically.',
    workspaceDesc2: 'The workspace protocol (workspace:*) lets you reference other packages in your monorepo. pnpm resolves these to the local versions during development and replaces them with actual version ranges when publishing. You can run commands across all workspaces or filter to specific packages using the --filter flag.',

    h2Npmrc: '.npmrc Configuration',
    npmrcDesc: 'pnpm reads configuration from .npmrc files at the project, user, and global levels. Several pnpm-specific settings control how dependencies are resolved and how the store behaves. Place a .npmrc file in your project root to ensure consistent settings across your team.',

    h2Strict: 'Strict Dependency Resolution',
    strictDesc: 'One of pnpm most important features is its strict dependency resolution. In the npm flat node_modules layout, any package in your dependency tree is importable from your application code, even if you did not explicitly declare it as a dependency. This leads to phantom dependencies: packages that work by accident because a transitive dependency happens to be hoisted.',
    strictDesc2: 'pnpm solves this by creating a node_modules structure where only your direct dependencies are visible at the top level. Each package gets its own isolated set of dependencies through symlinks into the .pnpm directory. If you try to import a package not listed in your package.json, Node.js will throw a MODULE_NOT_FOUND error. This catches real bugs before they reach production.',

    h2Patching: 'Patching Third-Party Packages',
    patchingDesc: 'Sometimes you need to fix a bug in a dependency without waiting for an upstream release. pnpm provides a built-in patching mechanism that lets you modify package source code and track the changes in your repository.',
    patchingDesc2: 'The pnpm patch command extracts the package to a temporary directory where you can make changes. After editing, pnpm patch-commit creates a diff file and adds a patchedDependencies entry to your package.json. The patch is automatically applied on every subsequent install.',

    h2Overrides: 'Overrides and Hooks',
    overridesDesc: 'pnpm supports overrides for forcing specific versions of transitive dependencies. This is useful for security patches, deduplication, or fixing compatibility issues. Overrides are declared in the pnpm.overrides field of your root package.json.',
    overridesDesc2: 'For more advanced customization, pnpm supports a .pnpmfile.cjs hook file that lets you modify package metadata during resolution. You can use hooks to rewrite dependency versions, add missing peer dependencies, or transform package.json fields programmatically.',

    h2Lockfile: 'Understanding pnpm-lock.yaml',
    lockfileDesc: 'The pnpm-lock.yaml file records the exact versions, integrity hashes, and dependency relationships of every installed package. It is the source of truth for reproducible installations. Unlike package-lock.json, the YAML format is more readable and produces smaller diffs in version control.',
    lockfileDesc2: 'The lockfile contains a packages section that maps package identifiers to their resolved versions and integrity checksums. It also records which dependencies each package requires, ensuring the entire dependency graph can be reconstructed deterministically.',

    h2CI: 'CI/CD Usage',
    ciDesc: 'pnpm is well-suited for CI/CD pipelines where fast, reproducible installations are critical. The pnpm install --frozen-lockfile flag (equivalent to npm ci) ensures the lockfile is not modified during install, failing the build if there are any mismatches. Combined with caching the pnpm store, CI builds can achieve near-instant dependency installation.',
    ciDesc2: 'Most CI providers support pnpm natively or through simple setup steps. GitHub Actions has an official pnpm/action-setup action, and other platforms support Corepack activation.',

    h2Docker: 'Docker Integration',
    dockerDesc: 'When using pnpm in Docker containers, you can leverage the content-addressable store for efficient layer caching. The recommended approach is to copy only the lockfile and workspace configuration first, install dependencies, then copy the source code. This ensures dependency layers are cached unless the lockfile changes.',

    h2Migration: 'Migrating from npm or Yarn',
    migrationDesc: 'Migrating to pnpm from npm or Yarn is straightforward. pnpm can import existing lockfiles from both package managers, preserving your resolved dependency versions. The main challenge is fixing phantom dependencies that your code may unknowingly rely on.',
    migrationStep1: '1. Install pnpm and remove the old lockfile (package-lock.json or yarn.lock).',
    migrationStep2: '2. Run pnpm import to convert the old lockfile to pnpm-lock.yaml (optional, for preserving resolutions).',
    migrationStep3: '3. Run pnpm install to create the strict node_modules structure.',
    migrationStep4: '4. Fix any MODULE_NOT_FOUND errors by explicitly adding missing dependencies to package.json.',
    migrationStep5: '5. Update CI/CD scripts to use pnpm commands instead of npm or yarn.',
    migrationStep6: '6. Add a packageManager field to package.json for Corepack.',

    h2Performance: 'Performance Benchmarks',
    perfDesc: 'pnpm consistently outperforms npm in installation speed benchmarks, especially in scenarios with warm caches or shared stores. In a typical project with 500+ dependencies, pnpm install is 2-3x faster than npm install on a warm cache and 20-40% faster on a cold cache. The disk savings become more significant as the number of projects grows.',
    perfDesc2: 'The content-addressable store means the second project using the same dependency version incurs zero download and near-zero disk cost. For organizations with many microservices or monorepos, this can save gigabytes of disk space and minutes of CI time per build.',

    h2SideBySide: 'Side-by-Side Protocol and Catalogs',
    sideBySideDesc: 'The workspace protocol (workspace:*) ensures local packages are always resolved from the workspace during development. When publishing, pnpm automatically replaces workspace: references with the actual version numbers. You can also use workspace:^ and workspace:~ for range-based references.',
    catalogsDesc: 'Catalogs are a pnpm workspace feature that lets you define shared dependency versions in a central location. Instead of duplicating version ranges across dozens of workspace packages, you declare a catalog of versions in pnpm-workspace.yaml and reference them with catalog: protocol. This ensures all packages in your monorepo use consistent dependency versions.',

    h2BestPractices: 'Best Practices',
    bp1: 'Always commit pnpm-lock.yaml to version control. It ensures reproducible builds and prevents dependency drift between environments.',
    bp2: 'Use Corepack and the packageManager field in package.json to pin your pnpm version. This guarantees every developer and CI environment uses the exact same version.',
    bp3: 'Set strict-peer-dependencies=true in .npmrc to catch peer dependency conflicts early during development instead of discovering them in production.',
    bp4: 'Use pnpm --filter to scope commands to specific workspace packages in monorepos, avoiding unnecessary work across the entire repository.',
    bp5: 'Cache the pnpm store directory in CI to dramatically speed up subsequent builds. The store path can be found with pnpm store path.',
    bp6: 'Run pnpm dedupe periodically to reduce duplicate package versions in your lockfile, shrinking node_modules and improving install times.',
    bp7: 'Use shamefully-hoist=false (the default) to maintain strict dependency isolation. Only enable hoisting when absolutely required for compatibility.',
    bp8: 'Prefer pnpm patch over forking dependencies for small fixes. Patches are tracked in version control and automatically applied on install.',
    bp9: 'Use catalogs in monorepos to centralize shared dependency versions, reducing maintenance burden and preventing version mismatches.',
    bp10: 'Run pnpm audit regularly and use overrides to force-upgrade vulnerable transitive dependencies.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is pnpm and how is it different from npm?',
    faq1A: 'pnpm is a Node.js package manager that uses a content-addressable store with hard links instead of copying package files into each project. This saves significant disk space and speeds up installations. Unlike npm, pnpm creates a strict non-flat node_modules structure that prevents phantom dependencies, meaning your code cannot accidentally import packages not listed in your package.json.',
    faq2Q: 'How does pnpm save disk space?',
    faq2A: 'pnpm stores every package file in a global content-addressable store, identified by its content hash. When a project needs a package, pnpm creates hard links from node_modules to the store instead of copying files. If 10 projects use the same version of React, the files exist only once on disk. Different versions of a package share files that have identical content, further reducing storage.',
    faq3Q: 'Can I use pnpm with existing npm projects?',
    faq3A: 'Yes. pnpm is fully compatible with the npm registry and npm package.json format. You can migrate by running pnpm import to convert your package-lock.json, then pnpm install to create the new node_modules structure. The main adjustment is fixing any phantom dependency imports that worked with npm flat hoisting but fail under pnpm strict resolution.',
    faq4Q: 'What are phantom dependencies and why does pnpm prevent them?',
    faq4A: 'Phantom dependencies are packages that your code imports but are not listed in your package.json. They work in npm because npm hoists all transitive dependencies to a flat node_modules root. If a transitive dependency is removed or updated by another package, your code breaks unexpectedly. pnpm prevents this by only exposing packages you explicitly declare, catching these issues during development.',
    faq5Q: 'How do pnpm workspaces compare to npm workspaces?',
    faq5A: 'pnpm workspaces provide more features than npm workspaces, including the workspace: protocol for local package references, the --filter flag for targeting specific packages, catalogs for shared dependency versions, and the ability to run commands recursively with pnpm -r. pnpm also handles workspace dependency linking more efficiently through its symlink-based node_modules structure.',
    faq6Q: 'How do I set up pnpm with Corepack?',
    faq6A: 'Enable Corepack with corepack enable, then add a packageManager field to your package.json specifying the exact pnpm version, such as pnpm@10.5.0. When anyone runs pnpm in the project directory, Corepack automatically downloads and uses that exact version. This ensures consistent tooling across your entire team without manual installation steps.',
    faq7Q: 'Is pnpm compatible with all npm packages?',
    faq7A: 'pnpm is compatible with the vast majority of npm packages. Rare compatibility issues arise when packages rely on the flat node_modules layout to access undeclared dependencies. In such cases, you can use the shamefully-hoist or public-hoist-pattern settings in .npmrc to selectively hoist problematic packages. Most modern packages work correctly with pnpm out of the box.',
    faq8Q: 'How fast is pnpm compared to npm and Yarn?',
    faq8A: 'In benchmarks, pnpm install is typically 2-3x faster than npm install with a warm cache and 20-40% faster on a cold cache. Compared to Yarn with node_modules, pnpm is comparable in speed. Yarn PnP can be faster for initial installs since it avoids creating node_modules entirely. Bun is the fastest overall due to its native runtime, but pnpm offers the best balance of speed, strictness, and disk efficiency.',
  },
  zh: {
    title: 'pnpm 指南 2026：快速、磁盘高效的 Node.js 包管理器',
    intro: 'pnpm 是一个快速、磁盘空间高效的 Node.js 包管理器，使用内容寻址存储和硬链接来节省磁盘空间并加速安装。与 npm 和 Yarn 不同，pnpm 创建非扁平的 node_modules 结构，强制执行严格的依赖解析，防止幻影依赖，确保项目只能访问显式声明的包。凭借内置的 monorepo 工作区支持、补丁功能和出色的 CI/CD 集成，pnpm 已成为许多生产团队和开源项目的首选包管理器。',
    tldr: 'pnpm 是一个 Node.js 包管理器，使用全局内容寻址存储和硬链接，与 npm 相比可节省高达 70% 的磁盘空间。它创建严格的非扁平 node_modules 布局以防止幻影依赖，通过 pnpm-workspace.yaml 支持 monorepo，安装速度比 npm 快 2 倍，并提供包补丁、覆盖和 side-by-side 协议等功能。',
    keyTakeaway1: 'pnpm 使用内容寻址存储，每个包的每个版本在磁盘上只存储一次，跨项目节省大量空间。',
    keyTakeaway2: '严格的非扁平 node_modules 结构防止幻影依赖，代码不能意外导入未在 package.json 中声明的包。',
    keyTakeaway3: 'pnpm 工作区通过 pnpm-workspace.yaml、workspace 协议和 catalogs 提供一流的 monorepo 支持。',
    keyTakeaway4: '安装速度比 npm 快 2 倍，特别是在有缓存的 CI 环境中。',
    keyTakeaway5: 'pnpm patch 命令允许你在不 fork 的情况下对第三方包应用补丁，通过 patchedDependencies 在仓库中跟踪。',
    keyTakeaway6: 'pnpm 完全兼容 npm 注册表，可通过 Corepack（Node.js 内置的包管理器管理工具）激活。',

    h2WhatIs: '什么是 pnpm 和内容寻址存储？',
    whatIsDesc: 'pnpm 全称 performant npm，由 Zoltan Kochan 于 2017 年创建，旨在解决 npm 的两个根本问题：跨项目重复包导致的磁盘空间浪费和允许幻影依赖的扁平 node_modules 结构。pnpm 通过使用全局内容寻址存储结合硬链接和符号链接，引入了一种根本不同的包管理方法。',
    whatIsDesc2: '使用 pnpm 安装包时，包文件存储在单个全局存储中（通常在 ~/.local/share/pnpm/store）。每个文件按内容哈希存储，不同包版本中的相同文件只存储一次。项目的 node_modules 目录包含指向存储的硬链接而非实际文件的副本。',
    whatIsDesc3: 'pnpm 创建的 node_modules 布局是非扁平的。只有 package.json 中列出的包可以直接访问。传递依赖存储在隐藏的 .pnpm 目录中。这种严格隔离防止代码导入未显式依赖的包。',

    h2Comparison: 'pnpm vs npm vs Yarn vs Bun',
    comparisonDesc: '每个 Node.js 包管理器在速度、磁盘使用、严格性和生态支持方面有不同的权衡：',
    compColFeature: '特性',
    compColPnpm: 'pnpm',
    compColNpm: 'npm',
    compColYarn: 'Yarn (Berry)',
    compColBun: 'Bun',
    compRow1: '磁盘使用',
    compRow1Pnpm: '最小（内容寻址 + 硬链接）',
    compRow1Npm: '高（每个项目完整拷贝）',
    compRow1Yarn: 'PnP 模式低（无 node_modules）',
    compRow1Bun: '高（每个项目完整拷贝）',
    compRow2: '安装速度',
    compRow2Pnpm: '快（平均 npm 的 2 倍）',
    compRow2Npm: '基准',
    compRow2Yarn: 'PnP 快，node_modules 中等',
    compRow2Bun: '非常快（原生运行时）',
    compRow3: '严格性',
    compRow3Pnpm: '严格（无幻影依赖）',
    compRow3Npm: '宽松（扁平提升）',
    compRow3Yarn: 'PnP 严格，node_modules 宽松',
    compRow3Bun: '宽松（扁平提升）',
    compRow4: 'Monorepo 支持',
    compRow4Pnpm: '内置工作区 + catalogs',
    compRow4Npm: '基本工作区',
    compRow4Yarn: '内置工作区 + constraints',
    compRow4Bun: '基本工作区',
    compRow5: '锁文件',
    compRow5Pnpm: 'pnpm-lock.yaml (YAML)',
    compRow5Npm: 'package-lock.json (JSON)',
    compRow5Yarn: 'yarn.lock（自定义格式）',
    compRow5Bun: 'bun.lock（二进制）',
    compRow6: '补丁',
    compRow6Pnpm: '内置 pnpm patch',
    compRow6Npm: '需要 patch-package',
    compRow6Yarn: '内置 yarn patch',
    compRow6Bun: '内置 bun patch',

    h2Installation: '安装和 Corepack 设置',
    installDesc: '推荐通过 Corepack 安装 pnpm，Corepack 是 Node.js 16.13+ 内置的包管理器版本管理工具。Corepack 确保团队中每个开发者使用完全相同的 pnpm 版本。',
    installDesc2: '也可以通过 npm、Homebrew 或直接安装脚本独立安装 pnpm。安装后，pnpm 使用相同的 npm 注册表并遵循 .npmrc 配置。',

    h2Commands: '核心 pnpm 命令',
    commandsDesc: 'pnpm 命令与 npm 命令非常相似，迁移很简单。关键区别在于 pnpm 默认执行更严格的行为，并提供额外的 monorepo 管理命令。',
    h3Install: '安装依赖',
    installCmdDesc: 'pnpm install 命令读取 package.json 并安装所有依赖。它创建或更新 pnpm-lock.yaml 并设置内容寻址的 node_modules 结构。',
    h3AddRemove: '添加和移除包',
    addRemoveDesc: '使用 pnpm add 添加新包，pnpm remove 卸载包。pnpm add 支持与 npm install 相同的标志。',
    h3Update: '更新包',
    updateDesc: 'pnpm update 检查已安装包的新版本。使用 --latest 标志忽略 semver 范围并更新到最新版本。',
    h3Run: '运行脚本',
    runDesc: 'pnpm run 执行 package.json 中定义的脚本。与 npm 不同，pnpm 对生命周期脚本更严格。',

    h2Workspace: '使用 pnpm-workspace.yaml 的 Monorepo 工作区',
    workspaceDesc: 'pnpm 通过工作区功能提供一流的 monorepo 支持。在仓库根目录的 pnpm-workspace.yaml 文件中定义工作区包。',
    workspaceDesc2: 'workspace 协议（workspace:*）让你引用 monorepo 中的其他包。pnpm 在开发时解析为本地版本，发布时替换为实际版本范围。',

    h2Npmrc: '.npmrc 配置',
    npmrcDesc: 'pnpm 从项目、用户和全局级别的 .npmrc 文件读取配置。多个 pnpm 特定设置控制依赖解析和存储行为。',

    h2Strict: '严格依赖解析',
    strictDesc: 'pnpm 最重要的特性之一是严格的依赖解析。在 npm 扁平布局中，依赖树中的任何包都可从应用代码导入，即使你没有显式声明。这导致幻影依赖。',
    strictDesc2: 'pnpm 通过创建只有直接依赖在顶层可见的 node_modules 结构来解决这个问题。如果尝试导入未列在 package.json 中的包，Node.js 会抛出 MODULE_NOT_FOUND 错误。',

    h2Patching: '补丁第三方包',
    patchingDesc: '有时你需要修复依赖中的 bug 而不等待上游发布。pnpm 提供内置的补丁机制。',
    patchingDesc2: 'pnpm patch 命令将包提取到临时目录进行修改。编辑后，pnpm patch-commit 创建 diff 文件并添加 patchedDependencies 条目。',

    h2Overrides: '覆盖和钩子',
    overridesDesc: 'pnpm 支持覆盖来强制指定传递依赖的版本。覆盖在 pnpm.overrides 字段中声明。',
    overridesDesc2: 'pnpm 支持 .pnpmfile.cjs 钩子文件，允许在解析期间修改包元数据。',

    h2Lockfile: '理解 pnpm-lock.yaml',
    lockfileDesc: 'pnpm-lock.yaml 记录每个已安装包的确切版本、完整性哈希和依赖关系。YAML 格式比 JSON 更可读，产生更小的版本控制差异。',
    lockfileDesc2: '锁文件包含将包标识符映射到解析版本和完整性校验的 packages 部分，确保整个依赖图可确定性重建。',

    h2CI: 'CI/CD 使用',
    ciDesc: 'pnpm 非常适合 CI/CD 管道。pnpm install --frozen-lockfile 确保锁文件不被修改。结合缓存 pnpm 存储，CI 构建可实现近乎即时的依赖安装。',
    ciDesc2: '大多数 CI 提供商原生支持 pnpm 或通过简单设置步骤支持。GitHub Actions 有官方的 pnpm/action-setup。',

    h2Docker: 'Docker 集成',
    dockerDesc: '在 Docker 容器中使用 pnpm 时，可以利用内容寻址存储实现高效的层缓存。推荐先只复制锁文件和工作区配置，安装依赖，然后复制源代码。',

    h2Migration: '从 npm 或 Yarn 迁移',
    migrationDesc: '从 npm 或 Yarn 迁移到 pnpm 很简单。pnpm 可以导入两个包管理器的现有锁文件。主要挑战是修复幻影依赖。',
    migrationStep1: '1. 安装 pnpm 并删除旧锁文件。',
    migrationStep2: '2. 运行 pnpm import 转换旧锁文件（可选）。',
    migrationStep3: '3. 运行 pnpm install 创建严格的 node_modules 结构。',
    migrationStep4: '4. 修复 MODULE_NOT_FOUND 错误，显式添加缺失依赖。',
    migrationStep5: '5. 更新 CI/CD 脚本使用 pnpm 命令。',
    migrationStep6: '6. 在 package.json 中添加 packageManager 字段。',

    h2Performance: '性能基准',
    perfDesc: 'pnpm 在安装速度基准测试中始终优于 npm，尤其是有缓存的场景。典型的 500+ 依赖项目中，有缓存时 pnpm 比 npm 快 2-3 倍，冷缓存快 20-40%。',
    perfDesc2: '内容寻址存储意味着使用相同依赖版本的第二个项目零下载和接近零的磁盘开销。',

    h2SideBySide: 'Side-by-Side 协议和 Catalogs',
    sideBySideDesc: 'workspace 协议（workspace:*）确保本地包始终从工作区解析。发布时 pnpm 自动替换为实际版本号。',
    catalogsDesc: 'Catalogs 是 pnpm 工作区功能，允许在中心位置定义共享依赖版本，通过 catalog: 协议引用。',

    h2BestPractices: '最佳实践',
    bp1: '始终将 pnpm-lock.yaml 提交到版本控制，确保可重复构建。',
    bp2: '使用 Corepack 和 packageManager 字段固定 pnpm 版本。',
    bp3: '在 .npmrc 中设置 strict-peer-dependencies=true 以尽早发现对等依赖冲突。',
    bp4: '使用 pnpm --filter 在 monorepo 中限定命令范围。',
    bp5: '在 CI 中缓存 pnpm 存储目录以加速后续构建。',
    bp6: '定期运行 pnpm dedupe 减少重复包版本。',
    bp7: '保持 shamefully-hoist=false（默认值）以维持严格依赖隔离。',
    bp8: '对于小修复优先使用 pnpm patch 而非 fork 依赖。',
    bp9: '在 monorepo 中使用 catalogs 集中管理共享依赖版本。',
    bp10: '定期运行 pnpm audit 并使用 overrides 强制升级有漏洞的传递依赖。',

    h2Faq: '常见问题',
    faq1Q: '什么是 pnpm，它和 npm 有什么不同？',
    faq1A: 'pnpm 是一个 Node.js 包管理器，使用内容寻址存储和硬链接而非将文件复制到每个项目中。这节省了大量磁盘空间并加速安装。与 npm 不同，pnpm 创建严格的非扁平 node_modules 结构，防止幻影依赖。',
    faq2Q: 'pnpm 如何节省磁盘空间？',
    faq2A: 'pnpm 将所有包文件存储在全局内容寻址存储中，按内容哈希标识。需要包时创建硬链接而非复制文件。10 个项目使用同一版本的 React 时，文件只在磁盘上存在一份。',
    faq3Q: '可以在现有 npm 项目中使用 pnpm 吗？',
    faq3A: '可以。pnpm 完全兼容 npm 注册表和 package.json 格式。可以运行 pnpm import 转换 package-lock.json，然后运行 pnpm install。',
    faq4Q: '什么是幻影依赖，为什么 pnpm 要防止它？',
    faq4A: '幻影依赖是代码导入但未列在 package.json 中的包。它们在 npm 中工作是因为扁平提升。pnpm 只暴露显式声明的包，在开发时就捕获这些问题。',
    faq5Q: 'pnpm 工作区和 npm 工作区有什么区别？',
    faq5A: 'pnpm 工作区提供更多功能，包括 workspace: 协议、--filter 标志、catalogs 共享版本和 pnpm -r 递归命令。',
    faq6Q: '如何用 Corepack 设置 pnpm？',
    faq6A: '运行 corepack enable，然后在 package.json 中添加 packageManager 字段指定 pnpm 版本。Corepack 会自动下载和使用该版本。',
    faq7Q: 'pnpm 兼容所有 npm 包吗？',
    faq7A: 'pnpm 兼容绝大多数 npm 包。少数兼容性问题出现在依赖扁平布局的包上，可以使用 shamefully-hoist 或 public-hoist-pattern 设置解决。',
    faq8Q: 'pnpm 和 npm、Yarn 相比有多快？',
    faq8A: '有缓存时 pnpm 比 npm 快 2-3 倍，冷缓存快 20-40%。与 Yarn node_modules 模式速度相当。Bun 最快但 pnpm 在速度、严格性和磁盘效率之间提供最佳平衡。',
  },
};

export default function PnpmGuide({ lang }: { lang: string }) {
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
  const cellStyle: React.CSSProperties = { border: '1px solid #e2e8f0', padding: '0.75rem', fontSize: '0.875rem', lineHeight: '1.5' };
  const headerCell: React.CSSProperties = { ...cellStyle, background: '#f8fafc', fontWeight: 600 };

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

      {/* What Is pnpm */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <p style={para}>{t.whatIsDesc3}</p>
      <pre style={codeBlock}><code>{'# How pnpm node_modules structure works\n'
        + '#\n'
        + '# node_modules/\n'
        + '#   .pnpm/\n'
        + '#     react@19.0.0/\n'
        + '#       node_modules/\n'
        + '#         react/        -> hard links to store\n'
        + '#     lodash@4.17.21/\n'
        + '#       node_modules/\n'
        + '#         lodash/       -> hard links to store\n'
        + '#   react/              -> symlink to .pnpm/react@19.0.0/node_modules/react\n'
        + '#   lodash/             -> symlink to .pnpm/lodash@4.17.21/node_modules/lodash\n'
        + '#\n'
        + '# Only react and lodash are visible at the top level\n'
        + '# because they are in your package.json.\n'
        + '# Transitive dependencies are isolated inside .pnpm/'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compColFeature}</th>
              <th style={headerCell}>{t.compColPnpm}</th>
              <th style={headerCell}>{t.compColNpm}</th>
              <th style={headerCell}>{t.compColYarn}</th>
              <th style={headerCell}>{t.compColBun}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compRow1, t.compRow1Pnpm, t.compRow1Npm, t.compRow1Yarn, t.compRow1Bun],
              [t.compRow2, t.compRow2Pnpm, t.compRow2Npm, t.compRow2Yarn, t.compRow2Bun],
              [t.compRow3, t.compRow3Pnpm, t.compRow3Npm, t.compRow3Yarn, t.compRow3Bun],
              [t.compRow4, t.compRow4Pnpm, t.compRow4Npm, t.compRow4Yarn, t.compRow4Bun],
              [t.compRow5, t.compRow5Pnpm, t.compRow5Npm, t.compRow5Yarn, t.compRow5Bun],
              [t.compRow6, t.compRow6Pnpm, t.compRow6Npm, t.compRow6Yarn, t.compRow6Bun],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={j === 0 ? { ...cellStyle, fontWeight: 600 } : cellStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Installation}</h2>
      <p style={para}>{t.installDesc}</p>
      <p style={para}>{t.installDesc2}</p>
      <pre style={codeBlock}><code>{'# Method 1: Corepack (recommended)\n'
        + 'corepack enable\n'
        + 'corepack prepare pnpm@latest --activate\n'
        + '\n'
        + '# Add to package.json for team-wide version pinning\n'
        + '# "packageManager": "pnpm@10.5.0"\n'
        + '\n'
        + '# Method 2: npm\n'
        + 'npm install -g pnpm\n'
        + '\n'
        + '# Method 3: Homebrew (macOS)\n'
        + 'brew install pnpm\n'
        + '\n'
        + '# Method 4: Standalone script\n'
        + 'curl -fsSL https://get.pnpm.io/install.sh | sh -\n'
        + '\n'
        + '# Verify installation\n'
        + 'pnpm --version\n'
        + 'pnpm store path'}</code></pre>

      {/* Essential Commands */}
      <h2 style={sectionTitle}>{t.h2Commands}</h2>
      <p style={para}>{t.commandsDesc}</p>

      <h3 style={subTitle}>{t.h3Install}</h3>
      <p style={para}>{t.installCmdDesc}</p>
      <pre style={codeBlock}><code>{'# Install all dependencies from package.json\n'
        + 'pnpm install\n'
        + '\n'
        + '# Install with frozen lockfile (CI mode)\n'
        + 'pnpm install --frozen-lockfile\n'
        + '\n'
        + '# Install production dependencies only\n'
        + 'pnpm install --prod'}</code></pre>

      <h3 style={subTitle}>{t.h3AddRemove}</h3>
      <p style={para}>{t.addRemoveDesc}</p>
      <pre style={codeBlock}><code>{'# Add a production dependency\n'
        + 'pnpm add react react-dom\n'
        + '\n'
        + '# Add a dev dependency\n'
        + 'pnpm add -D typescript @types/react\n'
        + '\n'
        + '# Add a peer dependency\n'
        + 'pnpm add --save-peer react\n'
        + '\n'
        + '# Add an optional dependency\n'
        + 'pnpm add -O fsevents\n'
        + '\n'
        + '# Add a specific version\n'
        + 'pnpm add lodash@4.17.21\n'
        + '\n'
        + '# Remove a package\n'
        + 'pnpm remove lodash\n'
        + '\n'
        + '# Remove from a specific workspace package\n'
        + 'pnpm --filter @myorg/web remove lodash'}</code></pre>

      <h3 style={subTitle}>{t.h3Update}</h3>
      <p style={para}>{t.updateDesc}</p>
      <pre style={codeBlock}><code>{'# Update all packages within semver ranges\n'
        + 'pnpm update\n'
        + '\n'
        + '# Update to latest versions (ignore semver)\n'
        + 'pnpm update --latest\n'
        + '\n'
        + '# Update a specific package\n'
        + 'pnpm update react\n'
        + '\n'
        + '# Interactive update (select which to update)\n'
        + 'pnpm update --interactive\n'
        + '\n'
        + '# Update recursively in all workspaces\n'
        + 'pnpm -r update'}</code></pre>

      <h3 style={subTitle}>{t.h3Run}</h3>
      <p style={para}>{t.runDesc}</p>
      <pre style={codeBlock}><code>{'# Run a script\n'
        + 'pnpm run build\n'
        + 'pnpm run dev\n'
        + 'pnpm run test\n'
        + '\n'
        + '# Shorthand (no "run" needed for common scripts)\n'
        + 'pnpm build\n'
        + 'pnpm dev\n'
        + 'pnpm test\n'
        + '\n'
        + '# Run in all workspace packages\n'
        + 'pnpm -r run build\n'
        + '\n'
        + '# Run in a specific workspace package\n'
        + 'pnpm --filter @myorg/api run build\n'
        + '\n'
        + '# Run a binary from node_modules/.bin\n'
        + 'pnpm exec tsc --version\n'
        + 'pnpm dlx create-next-app@latest  # like npx'}</code></pre>

      {/* Workspaces */}
      <h2 style={sectionTitle}>{t.h2Workspace}</h2>
      <p style={para}>{t.workspaceDesc}</p>
      <p style={para}>{t.workspaceDesc2}</p>
      <pre style={codeBlock}><code>{'# pnpm-workspace.yaml\n'
        + 'packages:\n'
        + '  - "packages/*"\n'
        + '  - "apps/*"\n'
        + '  - "tools/*"\n'
        + '\n'
        + '# With catalogs for shared versions\n'
        + 'catalog:\n'
        + '  react: ^19.0.0\n'
        + '  react-dom: ^19.0.0\n'
        + '  typescript: ^5.7.0\n'
        + '  vitest: ^3.0.0'}</code></pre>

      <pre style={codeBlock}><code>{'// apps/web/package.json\n'
        + '{\n'
        + '  "name": "@myorg/web",\n'
        + '  "dependencies": {\n'
        + '    "@myorg/ui": "workspace:*",\n'
        + '    "@myorg/utils": "workspace:^",\n'
        + '    "react": "catalog:",\n'
        + '    "react-dom": "catalog:"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "typescript": "catalog:",\n'
        + '    "vitest": "catalog:"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// workspace:* -> resolves to local package during dev\n'
        + '// workspace:^ -> replaced with ^1.2.3 when publishing\n'
        + '// catalog:    -> resolves to version from pnpm-workspace.yaml'}</code></pre>

      <pre style={codeBlock}><code>{'# Workspace filtering commands\n'
        + '\n'
        + '# Run build in a specific package\n'
        + 'pnpm --filter @myorg/web build\n'
        + '\n'
        + '# Run build in package and all its dependencies\n'
        + 'pnpm --filter @myorg/web... build\n'
        + '\n'
        + '# Run tests in all packages that depend on @myorg/ui\n'
        + 'pnpm --filter ...@myorg/ui test\n'
        + '\n'
        + '# Run in all packages matching a pattern\n'
        + 'pnpm --filter "@myorg/*" build\n'
        + '\n'
        + '# Run in packages changed since main branch\n'
        + 'pnpm --filter "...[origin/main]" build\n'
        + '\n'
        + '# Add a dependency to a specific workspace\n'
        + 'pnpm --filter @myorg/api add express'}</code></pre>

      {/* .npmrc */}
      <h2 style={sectionTitle}>{t.h2Npmrc}</h2>
      <p style={para}>{t.npmrcDesc}</p>
      <pre style={codeBlock}><code>{'# .npmrc - pnpm configuration\n'
        + '\n'
        + '# Strict mode (recommended)\n'
        + 'strict-peer-dependencies=true\n'
        + 'auto-install-peers=true\n'
        + '\n'
        + '# Do not hoist (default, keeps strict isolation)\n'
        + 'shamefully-hoist=false\n'
        + '\n'
        + '# Hoist specific packages that need flat access\n'
        + 'public-hoist-pattern[]=*eslint*\n'
        + 'public-hoist-pattern[]=*prettier*\n'
        + '\n'
        + '# Store location (default: ~/.local/share/pnpm/store)\n'
        + '# store-dir=~/.pnpm-store\n'
        + '\n'
        + '# Use lockfile v9 format\n'
        + 'lockfile-format=v9\n'
        + '\n'
        + '# Registry (default: https://registry.npmjs.org/)\n'
        + '# registry=https://registry.npmmirror.com/\n'
        + '\n'
        + '# Node.js version for pnpm env\n'
        + 'use-node-version=22.14.0'}</code></pre>

      {/* Strict Dependency Resolution */}
      <h2 style={sectionTitle}>{t.h2Strict}</h2>
      <p style={para}>{t.strictDesc}</p>
      <p style={para}>{t.strictDesc2}</p>
      <pre style={codeBlock}><code>{'// Example: Phantom dependency problem\n'
        + '// package.json only declares "express"\n'
        + '// But code imports "debug" (a transitive dep of express)\n'
        + '\n'
        + '// With npm (works by accident):\n'
        + 'const debug = require("debug"); // OK - hoisted to root\n'
        + '\n'
        + '// With pnpm (fails correctly):\n'
        + '// Error: Cannot find module \'debug\'\n'
        + '// MODULE_NOT_FOUND\n'
        + '\n'
        + '// Fix: explicitly add the dependency\n'
        + '// pnpm add debug\n'
        + '\n'
        + '// Now it works correctly with pnpm:\n'
        + 'const debug = require("debug"); // OK - declared in package.json'}</code></pre>

      {/* Patching */}
      <h2 style={sectionTitle}>{t.h2Patching}</h2>
      <p style={para}>{t.patchingDesc}</p>
      <p style={para}>{t.patchingDesc2}</p>
      <pre style={codeBlock}><code>{'# Step 1: Start patching a package\n'
        + 'pnpm patch lodash@4.17.21\n'
        + '# Output: You can now edit the package at:\n'
        + '# /tmp/xxxx/node_modules/lodash\n'
        + '\n'
        + '# Step 2: Make your changes in the temp directory\n'
        + '# Edit the files you need to fix\n'
        + '\n'
        + '# Step 3: Commit the patch\n'
        + 'pnpm patch-commit /tmp/xxxx/node_modules/lodash\n'
        + '\n'
        + '# This creates patches/lodash@4.17.21.patch\n'
        + '# and adds to package.json:\n'
        + '# "pnpm": {\n'
        + '#   "patchedDependencies": {\n'
        + '#     "lodash@4.17.21": "patches/lodash@4.17.21.patch"\n'
        + '#   }\n'
        + '# }\n'
        + '\n'
        + '# Remove a patch\n'
        + 'pnpm patch-remove lodash@4.17.21'}</code></pre>

      {/* Overrides */}
      <h2 style={sectionTitle}>{t.h2Overrides}</h2>
      <p style={para}>{t.overridesDesc}</p>
      <p style={para}>{t.overridesDesc2}</p>
      <pre style={codeBlock}><code>{'// package.json - overrides\n'
        + '{\n'
        + '  "pnpm": {\n'
        + '    "overrides": {\n'
        + '      "lodash": "^4.17.21",\n'
        + '      "got@<11.8.5": ">=11.8.5",\n'
        + '      "express>debug": "~4.3.0",\n'
        + '      "node-fetch": "npm:undici"\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'// .pnpmfile.cjs - hooks for advanced customization\n'
        + 'function readPackage(pkg, context) {\n'
        + '  // Fix missing peer dependency\n'
        + '  if (pkg.name === "some-broken-package") {\n'
        + '    pkg.dependencies = {\n'
        + '      ...pkg.dependencies,\n'
        + '      "missing-peer": "^2.0.0"\n'
        + '    };\n'
        + '    context.log("Fixed missing peer dep for " + pkg.name);\n'
        + '  }\n'
        + '\n'
        + '  // Force a specific version of a transitive dependency\n'
        + '  if (pkg.dependencies && pkg.dependencies["old-package"]) {\n'
        + '    pkg.dependencies["old-package"] = "^3.0.0";\n'
        + '  }\n'
        + '\n'
        + '  return pkg;\n'
        + '}\n'
        + '\n'
        + 'module.exports = {\n'
        + '  hooks: {\n'
        + '    readPackage\n'
        + '  }\n'
        + '};'}</code></pre>

      {/* Lockfile */}
      <h2 style={sectionTitle}>{t.h2Lockfile}</h2>
      <p style={para}>{t.lockfileDesc}</p>
      <p style={para}>{t.lockfileDesc2}</p>
      <pre style={codeBlock}><code>{'# pnpm-lock.yaml structure (simplified)\n'
        + 'lockfileVersion: "9.0"\n'
        + '\n'
        + 'settings:\n'
        + '  autoInstallPeers: true\n'
        + '  excludeLinksFromLockfile: false\n'
        + '\n'
        + 'importers:\n'
        + '  .:\n'
        + '    dependencies:\n'
        + '      react:\n'
        + '        specifier: ^19.0.0\n'
        + '        version: 19.0.0\n'
        + '    devDependencies:\n'
        + '      typescript:\n'
        + '        specifier: ^5.7.0\n'
        + '        version: 5.7.3\n'
        + '\n'
        + 'packages:\n'
        + '  react@19.0.0:\n'
        + '    resolution:\n'
        + '      integrity: sha512-abc123...\n'
        + '    engines:\n'
        + '      node: ">=18"\n'
        + '\n'
        + '# Useful commands:\n'
        + '# pnpm install --frozen-lockfile  (CI - fail if lockfile outdated)\n'
        + '# pnpm install --lockfile-only    (update lockfile without installing)\n'
        + '# pnpm dedupe                     (reduce duplicate versions)'}</code></pre>

      {/* CI/CD */}
      <h2 style={sectionTitle}>{t.h2CI}</h2>
      <p style={para}>{t.ciDesc}</p>
      <p style={para}>{t.ciDesc2}</p>
      <pre style={codeBlock}><code>{'# .github/workflows/ci.yml\n'
        + 'name: CI\n'
        + 'on: [push, pull_request]\n'
        + '\n'
        + 'jobs:\n'
        + '  build:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '\n'
        + '      - uses: pnpm/action-setup@v4\n'
        + '        with:\n'
        + '          version: 10\n'
        + '\n'
        + '      - uses: actions/setup-node@v4\n'
        + '        with:\n'
        + '          node-version: 22\n'
        + '          cache: "pnpm"\n'
        + '\n'
        + '      - run: pnpm install --frozen-lockfile\n'
        + '      - run: pnpm run lint\n'
        + '      - run: pnpm run test\n'
        + '      - run: pnpm run build'}</code></pre>

      {/* Docker */}
      <h2 style={sectionTitle}>{t.h2Docker}</h2>
      <p style={para}>{t.dockerDesc}</p>
      <pre style={codeBlock}><code>{'# Dockerfile with pnpm\n'
        + 'FROM node:22-slim AS base\n'
        + 'ENV PNPM_HOME="/pnpm"\n'
        + 'ENV PATH="\\$PNPM_HOME:\\$PATH"\n'
        + 'RUN corepack enable\n'
        + '\n'
        + 'FROM base AS deps\n'
        + 'WORKDIR /app\n'
        + '# Copy only files needed for install (better caching)\n'
        + 'COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./\n'
        + 'RUN --mount=type=cache,id=pnpm,target=/pnpm/store \\\\\n'
        + '    pnpm install --frozen-lockfile\n'
        + '\n'
        + 'FROM base AS build\n'
        + 'WORKDIR /app\n'
        + 'COPY --from=deps /app/node_modules ./node_modules\n'
        + 'COPY . .\n'
        + 'RUN pnpm run build\n'
        + '\n'
        + 'FROM base AS runtime\n'
        + 'WORKDIR /app\n'
        + 'COPY --from=build /app/dist ./dist\n'
        + 'COPY --from=deps /app/node_modules ./node_modules\n'
        + 'EXPOSE 3000\n'
        + 'CMD ["node", "dist/index.js"]'}</code></pre>

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.migrationStep1}</li>
        <li style={listItem}>{t.migrationStep2}</li>
        <li style={listItem}>{t.migrationStep3}</li>
        <li style={listItem}>{t.migrationStep4}</li>
        <li style={listItem}>{t.migrationStep5}</li>
        <li style={listItem}>{t.migrationStep6}</li>
      </ul>
      <pre style={codeBlock}><code>{'# Migration from npm\n'
        + 'corepack enable\n'
        + 'pnpm import              # converts package-lock.json\n'
        + 'rm package-lock.json\n'
        + 'pnpm install             # creates node_modules + pnpm-lock.yaml\n'
        + '\n'
        + '# Migration from yarn\n'
        + 'corepack enable\n'
        + 'pnpm import              # converts yarn.lock\n'
        + 'rm yarn.lock\n'
        + 'pnpm install\n'
        + '\n'
        + '# Add packageManager field\n'
        + '# package.json:\n'
        + '# "packageManager": "pnpm@10.5.0"\n'
        + '\n'
        + '# Update scripts in package.json\n'
        + '# "scripts": {\n'
        + '#   "preinstall": "npx only-allow pnpm"\n'
        + '# }'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <p style={para}>{t.perfDesc2}</p>
      <pre style={codeBlock}><code>{'# Benchmark: 500-dependency project (approximate times)\n'
        + '#\n'
        + '# Cold cache (first install):\n'
        + '#   npm install     ~45s\n'
        + '#   yarn install    ~38s\n'
        + '#   pnpm install    ~30s\n'
        + '#   bun install     ~12s\n'
        + '#\n'
        + '# Warm cache (store populated):\n'
        + '#   npm install     ~20s\n'
        + '#   yarn install    ~12s\n'
        + '#   pnpm install    ~8s\n'
        + '#   bun install     ~4s\n'
        + '#\n'
        + '# Disk usage (10 identical projects):\n'
        + '#   npm:  ~1.5 GB (10 copies)\n'
        + '#   pnpm: ~150 MB (1 copy + hard links)\n'
        + '#\n'
        + '# Run your own benchmark:\n'
        + '# hyperfine "pnpm install" "npm install" --prepare "rm -rf node_modules"'}</code></pre>

      {/* Side-by-Side and Catalogs */}
      <h2 style={sectionTitle}>{t.h2SideBySide}</h2>
      <p style={para}>{t.sideBySideDesc}</p>
      <p style={para}>{t.catalogsDesc}</p>
      <pre style={codeBlock}><code>{'# pnpm-workspace.yaml with named catalogs\n'
        + 'packages:\n'
        + '  - "packages/*"\n'
        + '  - "apps/*"\n'
        + '\n'
        + '# Default catalog\n'
        + 'catalog:\n'
        + '  react: ^19.0.0\n'
        + '  react-dom: ^19.0.0\n'
        + '  typescript: ^5.7.0\n'
        + '\n'
        + '# Named catalogs for different groups\n'
        + 'catalogs:\n'
        + '  testing:\n'
        + '    vitest: ^3.0.0\n'
        + '    "@testing-library/react": ^16.0.0\n'
        + '  linting:\n'
        + '    eslint: ^9.0.0\n'
        + '    prettier: ^3.4.0'}</code></pre>

      <pre style={codeBlock}><code>{'// packages/ui/package.json\n'
        + '{\n'
        + '  "name": "@myorg/ui",\n'
        + '  "dependencies": {\n'
        + '    "react": "catalog:",\n'
        + '    "react-dom": "catalog:"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "typescript": "catalog:",\n'
        + '    "vitest": "catalog:testing",\n'
        + '    "eslint": "catalog:linting"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Workspace protocol variants:\n'
        + '// "workspace:*"  -> exact local version\n'
        + '// "workspace:^"  -> ^major.minor.patch when published\n'
        + '// "workspace:~"  -> ~major.minor.patch when published'}</code></pre>

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
