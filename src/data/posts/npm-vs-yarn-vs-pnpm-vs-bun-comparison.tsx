'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'npm vs Yarn vs pnpm vs Bun: Complete Package Manager Comparison (2025)',
    intro: 'Choosing the right JavaScript package manager can significantly impact your development workflow, CI/CD pipeline speed, and disk usage. The four major contenders in 2025 are <strong>npm</strong>, <strong>Yarn</strong>, <strong>pnpm</strong>, and <strong>Bun</strong>. Each has a different philosophy and set of trade-offs. This comprehensive guide compares all four across every dimension that matters: speed, disk efficiency, monorepo support, security, and developer experience.',

    // Section: Overview
    h2_overview: 'What Is a JavaScript Package Manager?',
    overview_p1: 'A package manager automates the process of installing, updating, configuring, and removing third-party libraries (packages) in your project. It resolves dependency trees, manages versions via a lockfile, and provides scripts for building and testing your code.',
    overview_p2: 'Every modern JavaScript project depends on one. The differences between them may seem small at first, but they compound across large codebases, monorepos, and CI pipelines. Let us look at each one in depth.',

    // Section: npm
    h2_npm: 'npm: The Default Standard',
    h3_npm_history: 'History and Background',
    npm_history_p: 'npm (Node Package Manager) was created by Isaac Z. Schlueter in 2010 and has been bundled with Node.js since version 0.6.3. It is the <strong>default</strong> package manager that every Node.js developer gets out of the box. The npm registry hosts over 2 million packages, making it the largest software registry in the world.',
    h3_npm_features: 'Key Features',
    npm_features_list: '<ul><li><strong>Bundled with Node.js</strong> — zero setup required, available everywhere Node.js is installed</li><li><strong>npm workspaces</strong> — built-in monorepo support since npm 7</li><li><strong>npm ci</strong> — deterministic, fast installs for CI environments (deletes node_modules and installs from lockfile)</li><li><strong>npm audit</strong> — built-in security vulnerability scanning</li><li><strong>npx</strong> — execute packages without installing them globally</li><li><strong>Overrides</strong> — force specific dependency versions to resolve conflicts</li><li><strong>Provenance</strong> — npm now supports package provenance attestations for supply-chain security</li></ul>',
    h3_npm_pros: 'Pros',
    npm_pros_list: '<ul><li>Zero installation — comes with Node.js</li><li>Largest ecosystem and community</li><li>Excellent documentation</li><li>Stable and battle-tested</li><li>workspaces support for monorepos</li><li>npm audit for security scanning</li></ul>',
    h3_npm_cons: 'Cons',
    npm_cons_list: '<ul><li>Slowest install speed among all four managers</li><li>Higher disk usage — each project gets its own copy of every dependency</li><li>Historically had security issues (though much improved)</li><li>node_modules can grow extremely large (the "heaviest objects in the universe" meme)</li></ul>',
    npm_install_example: '# Install dependencies\nnpm install\n\n# Add a package\nnpm install express\n\n# Install dev dependency\nnpm install --save-dev typescript\n\n# CI-optimized install\nnpm ci\n\n# Run a script\nnpm run build\n\n# Execute a package without installing\nnpx create-react-app my-app',

    // Section: Yarn
    h2_yarn: 'Yarn: The Pioneer of Innovation',
    h3_yarn_history: 'History and Background',
    yarn_history_p: 'Yarn was created by Facebook (now Meta) in 2016 to address npm\'s shortcomings at the time: non-deterministic installs, no lockfile by default, and slow performance. Yarn introduced the <code>yarn.lock</code> file and parallel downloads, which dramatically improved install speeds. Today, Yarn exists in two versions: <strong>Yarn Classic (1.x)</strong> and <strong>Yarn Berry (2.x+)</strong>, which are fundamentally different tools.',
    h3_yarn_classic: 'Yarn Classic (1.x)',
    yarn_classic_p: 'Yarn Classic works similarly to npm but with better performance and a more reliable lockfile. It uses a flat <code>node_modules</code> directory structure and supports workspaces for monorepos. While still widely used, Yarn Classic is in maintenance mode — the team recommends migrating to Yarn Berry.',
    h3_yarn_berry: 'Yarn Berry (2.x+) and Plug\'n\'Play',
    yarn_berry_p: 'Yarn Berry is a complete rewrite that introduces <strong>Plug\'n\'Play (PnP)</strong>, a radical approach that eliminates the <code>node_modules</code> directory entirely. Instead, it generates a <code>.pnp.cjs</code> file that maps package names to their locations in a compressed <code>.yarn/cache</code> folder. This results in:',
    yarn_pnp_benefits: '<ul><li><strong>Near-instant installs</strong> — no need to copy thousands of files into node_modules</li><li><strong>Strict dependency resolution</strong> — prevents phantom dependencies (accessing packages you did not declare)</li><li><strong>Zero-installs</strong> — commit the cache to git and skip npm install entirely in CI</li><li><strong>Dramatically reduced disk usage</strong></li></ul>',
    h3_yarn_features: 'Key Features',
    yarn_features_list: '<ul><li><strong>Plug\'n\'Play (PnP)</strong> — eliminates node_modules, maps dependencies via .pnp.cjs</li><li><strong>Zero-installs</strong> — commit cache to repo, skip install in CI</li><li><strong>Workspaces</strong> — first-class monorepo support (pioneered this concept)</li><li><strong>Constraints</strong> — enforce rules across workspaces (e.g., all packages must use the same React version)</li><li><strong>Plugins</strong> — extensible architecture via plugin system</li><li><strong>Offline mode</strong> — install packages without network access using cached archives</li></ul>',
    h3_yarn_pros: 'Pros',
    yarn_pros_list: '<ul><li>PnP provides fastest installs and smallest disk footprint</li><li>Zero-installs eliminates CI install step entirely</li><li>Excellent monorepo support with workspaces and constraints</li><li>Strict dependency resolution catches phantom dependency bugs</li><li>Plugin system for extensibility</li></ul>',
    h3_yarn_cons: 'Cons',
    yarn_cons_list: '<ul><li>PnP has compatibility issues with some packages and tools</li><li>Steeper learning curve, especially when migrating from npm</li><li>Two very different versions (Classic vs Berry) cause confusion</li><li>Smaller community than npm</li><li>Some IDE integrations require additional configuration for PnP</li></ul>',
    yarn_install_example: '# Install dependencies\nyarn install\n\n# Add a package\nyarn add express\n\n# Add dev dependency\nyarn add --dev typescript\n\n# Run a script\nyarn build\n\n# Upgrade interactively\nyarn upgrade-interactive\n\n# Enable PnP (Yarn Berry)\nyarn set version berry\nyarn install',

    // Section: pnpm
    h2_pnpm: 'pnpm: The Disk Space Champion',
    h3_pnpm_history: 'History and Background',
    pnpm_history_p: 'pnpm (performant npm) was created by Zoltan Kochan in 2017 to solve the disk space problem inherent in npm and Yarn Classic. Its key innovation is a <strong>content-addressable storage</strong> system: every version of every package is stored exactly once on disk, and projects link to those shared copies. If 10 projects use <code>lodash@4.17.21</code>, there is only one copy on your machine.',
    h3_pnpm_storage: 'Content-Addressable Storage Explained',
    pnpm_storage_p: 'When you run <code>pnpm install</code>, pnpm does not copy packages into each project\'s <code>node_modules</code>. Instead, it creates a global store (usually at <code>~/.local/share/pnpm/store</code>) where every unique file is stored by its content hash. Your project\'s <code>node_modules</code> contains hard links (or symlinks on Windows) pointing back to this store. This means:',
    pnpm_storage_benefits: '<ul><li><strong>Massive disk savings</strong> — packages are stored only once globally, not per-project</li><li><strong>Faster installs</strong> — files are linked, not copied</li><li><strong>Strict node_modules structure</strong> — prevents phantom dependencies by default</li><li><strong>Integrity verification</strong> — content-addressed means files are verified by hash</li></ul>',
    h3_pnpm_features: 'Key Features',
    pnpm_features_list: '<ul><li><strong>Content-addressable storage</strong> — global store with hard links, massive disk savings</li><li><strong>Strict by default</strong> — only declared dependencies are accessible (no phantom deps)</li><li><strong>pnpm workspaces</strong> — excellent monorepo support with filtering and parallel execution</li><li><strong>Side-effects cache</strong> — caches postinstall script output for faster subsequent installs</li><li><strong>Patching</strong> — built-in <code>pnpm patch</code> command to patch dependencies without forking</li><li><strong>Catalogs</strong> — define shared dependency versions across workspace packages</li></ul>',
    h3_pnpm_pros: 'Pros',
    pnpm_pros_list: '<ul><li>Best disk space efficiency — saves gigabytes on machines with many projects</li><li>Fast installs (especially second time with warm store)</li><li>Strict dependency resolution by default</li><li>Excellent monorepo tooling with filtering commands</li><li>Drop-in replacement for npm (similar CLI commands)</li><li>Active development and growing community</li></ul>',
    h3_pnpm_cons: 'Cons',
    pnpm_cons_list: '<ul><li>Requires separate installation (not bundled with Node.js)</li><li>Hard links can confuse some tools and file watchers</li><li>Strict mode may break packages that rely on phantom dependencies</li><li>Smaller community and ecosystem than npm or Yarn</li><li>Some hosting platforms do not have built-in pnpm support</li></ul>',
    pnpm_install_example: '# Install pnpm\nnpm install -g pnpm\n# Or use corepack (recommended)\ncorepack enable\ncorepack prepare pnpm@latest --activate\n\n# Install dependencies\npnpm install\n\n# Add a package\npnpm add express\n\n# Add dev dependency\npnpm add -D typescript\n\n# Run a script\npnpm run build\n\n# Check disk usage savings\npnpm store status',

    // Section: Bun
    h2_bun: 'Bun: The All-in-One Runtime',
    h3_bun_history: 'History and Background',
    bun_history_p: 'Bun was created by Jarred Sumner and released its 1.0 version in September 2023. Unlike the other three, Bun is not just a package manager — it is an <strong>all-in-one JavaScript/TypeScript runtime</strong> that includes a package manager, bundler, test runner, and transpiler. Built from scratch in Zig (with JavaScriptCore instead of V8), Bun is designed for maximum performance.',
    h3_bun_features: 'Key Features',
    bun_features_list: '<ul><li><strong>Blazing fast installs</strong> — written in native code, typically 10-25x faster than npm</li><li><strong>All-in-one runtime</strong> — replaces Node.js, npm, webpack/esbuild, and Jest in one tool</li><li><strong>Native TypeScript support</strong> — run .ts files directly without compilation step</li><li><strong>npm-compatible</strong> — reads package.json, uses node_modules, compatible with npm registry</li><li><strong>Built-in bundler</strong> — bundle JavaScript/TypeScript for production</li><li><strong>Built-in test runner</strong> — Jest-compatible testing with bun test</li><li><strong>Hot reloading</strong> — built-in watch mode with --hot flag</li><li><strong>Node.js compatibility</strong> — implements most Node.js APIs for drop-in replacement</li></ul>',
    h3_bun_pros: 'Pros',
    bun_pros_list: '<ul><li>Fastest package installation speed by a significant margin</li><li>All-in-one tool reduces toolchain complexity</li><li>Native TypeScript execution without configuration</li><li>Drop-in Node.js replacement for most projects</li><li>Built-in bundler and test runner</li><li>Active development with rapid improvements</li></ul>',
    h3_bun_cons: 'Cons',
    bun_cons_list: '<ul><li>Relatively new — less battle-tested in production</li><li>Not 100% Node.js compatible (some edge cases and native modules may not work)</li><li>Smaller community and fewer Stack Overflow answers</li><li>Windows support was added later and may have rough edges</li><li>Monorepo support is less mature than pnpm or Yarn</li><li>Some npm packages with native addons may not compile with Bun</li></ul>',
    bun_install_example: '# Install Bun\ncurl -fsSL https://bun.sh/install | bash\n# Or on Windows\npowershell -c "irm bun.sh/install.ps1 | iex"\n\n# Install dependencies\nbun install\n\n# Add a package\nbun add express\n\n# Add dev dependency\nbun add --dev typescript\n\n# Run a script\nbun run build\n\n# Run a TypeScript file directly\nbun run server.ts\n\n# Run tests\nbun test',

    // Section: Comparison Table
    h2_comparison: 'Side-by-Side Comparison',
    th_feature: 'Feature',
    th_npm: 'npm',
    th_yarn: 'Yarn (Berry)',
    th_pnpm: 'pnpm',
    th_bun: 'Bun',
    feat_first_release: 'First Release',
    val_npm_release: '2010',
    val_yarn_release: '2016 (Berry: 2020)',
    val_pnpm_release: '2017',
    val_bun_release: '2023 (1.0)',
    feat_language: 'Written In',
    val_npm_lang: 'JavaScript',
    val_yarn_lang: 'JavaScript',
    val_pnpm_lang: 'JavaScript',
    val_bun_lang: 'Zig + C++',
    feat_install_speed: 'Install Speed (cold)',
    val_npm_speed: 'Slow',
    val_yarn_speed: 'Fast (PnP: Very Fast)',
    val_pnpm_speed: 'Fast',
    val_bun_speed: 'Very Fast',
    feat_disk_usage: 'Disk Usage',
    val_npm_disk: 'High (copies per project)',
    val_yarn_disk: 'Low (PnP) / High (Classic)',
    val_pnpm_disk: 'Very Low (shared store)',
    val_bun_disk: 'Medium (node_modules)',
    feat_lockfile: 'Lockfile',
    val_npm_lock: 'package-lock.json',
    val_yarn_lock: 'yarn.lock',
    val_pnpm_lock: 'pnpm-lock.yaml',
    val_bun_lock: 'bun.lockb (binary)',
    feat_monorepo: 'Monorepo Support',
    val_npm_mono: 'Workspaces (basic)',
    val_yarn_mono: 'Workspaces + Constraints',
    val_pnpm_mono: 'Workspaces + Filtering',
    val_bun_mono: 'Workspaces (basic)',
    feat_phantom_deps: 'Phantom Dep Prevention',
    val_npm_phantom: 'No',
    val_yarn_phantom: 'Yes (PnP)',
    val_pnpm_phantom: 'Yes (strict by default)',
    val_bun_phantom: 'No',
    feat_node_compat: 'Node.js Bundled',
    val_npm_node: 'Yes',
    val_yarn_node: 'No (use corepack)',
    val_pnpm_node: 'No (use corepack)',
    val_bun_node: 'No (is its own runtime)',
    feat_security: 'Security Audit',
    val_npm_security: 'npm audit (built-in)',
    val_yarn_security: 'yarn audit',
    val_pnpm_security: 'pnpm audit',
    val_bun_security: 'Not built-in',
    feat_offline: 'Offline Mode',
    val_npm_offline: 'Cache-based',
    val_yarn_offline: 'Zero-installs (excellent)',
    val_pnpm_offline: 'Store-based',
    val_bun_offline: 'Cache-based',
    feat_patch: 'Dependency Patching',
    val_npm_patch: 'Via overrides',
    val_yarn_patch: 'yarn patch',
    val_pnpm_patch: 'pnpm patch',
    val_bun_patch: 'patch-package',

    // Section: Benchmarks
    h2_benchmarks: 'Install Speed Benchmarks',
    benchmarks_intro: 'The following benchmarks are based on a typical medium-sized project (~500 dependencies) on a modern machine. Times are approximate and can vary based on network conditions, cache state, and hardware.',
    bench_note: '<strong>Note:</strong> Benchmarks are illustrative. Always test with your own project, as results vary significantly based on dependency tree shape, network speed, and operating system.',
    th_scenario: 'Scenario',
    bench_cold: 'Cold install (no cache)',
    bench_warm: 'Warm install (cached)',
    bench_ci: 'CI install (clean)',
    bench_add: 'Add single package',
    val_npm_cold: '~45s',
    val_yarn_cold: '~25s',
    val_pnpm_cold: '~20s',
    val_bun_cold: '~5s',
    val_npm_warm: '~20s',
    val_yarn_warm: '~1s (zero-install)',
    val_pnpm_warm: '~5s',
    val_bun_warm: '~2s',
    val_npm_ci: '~35s (npm ci)',
    val_yarn_ci: '~15s',
    val_pnpm_ci: '~12s',
    val_bun_ci: '~4s',
    val_npm_add: '~8s',
    val_yarn_add: '~4s',
    val_pnpm_add: '~3s',
    val_bun_add: '~1s',

    // Section: Migration
    h2_migration: 'Migration Guides',
    migration_intro: 'Switching between package managers is usually straightforward. Here are the key steps for each migration path.',
    h3_npm_to_pnpm: 'Migrating from npm to pnpm',
    npm_to_pnpm_steps: 'pnpm is designed as a drop-in replacement for npm, making migration simple:',
    h3_npm_to_yarn: 'Migrating from npm to Yarn Berry',
    npm_to_yarn_steps: 'Migrating to Yarn Berry requires a few more steps, especially if you want PnP:',
    h3_npm_to_bun: 'Migrating from npm to Bun',
    npm_to_bun_steps: 'Bun reads your existing package.json and can use npm\'s registry directly:',
    h3_migration_tips: 'General Migration Tips',
    migration_tips_list: '<ul><li><strong>Test thoroughly</strong> — run your full test suite after migrating</li><li><strong>Update CI/CD</strong> — update your pipeline configs to use the new package manager</li><li><strong>Lock files</strong> — delete the old lock file before generating the new one; never have two lock files</li><li><strong>Team alignment</strong> — ensure everyone on the team switches at the same time</li><li><strong>corepack</strong> — use <code>corepack enable</code> to manage package manager versions consistently across the team</li><li><strong>Engines field</strong> — add a <code>packageManager</code> field to package.json to enforce the correct package manager</li></ul>',

    // Section: Recommendations
    h2_recommendations: 'When to Use Which: Recommendations',
    h3_use_npm: 'Use npm When...',
    use_npm_list: '<ul><li>You want zero-setup — npm comes with Node.js, no extra installation needed</li><li>You are working on small to medium projects where install speed is not critical</li><li>You are a beginner and want the largest community for troubleshooting</li><li>Your team does not want to learn a new tool</li><li>You need the widest compatibility with tutorials, guides, and Stack Overflow answers</li></ul>',
    h3_use_yarn: 'Use Yarn Berry When...',
    use_yarn_list: '<ul><li>You want the fastest possible CI pipelines with zero-installs</li><li>You run a large monorepo and need constraints to enforce consistency</li><li>You want strict dependency resolution to catch phantom dependency bugs</li><li>Your team is willing to invest time in learning PnP and resolving compatibility issues</li><li>Offline development capability is important to your workflow</li></ul>',
    h3_use_pnpm: 'Use pnpm When...',
    use_pnpm_list: '<ul><li>Disk space is a concern — you have many projects on one machine</li><li>You want a <strong>drop-in npm replacement</strong> that is faster and more efficient</li><li>You run monorepos and want powerful filtering and parallel execution</li><li>You want strict dependency resolution without the learning curve of PnP</li><li>You are building for production and want a proven, stable tool</li></ul>',
    h3_use_bun: 'Use Bun When...',
    use_bun_list: '<ul><li>Raw speed is your top priority</li><li>You want an all-in-one tool (runtime + package manager + bundler + test runner)</li><li>You are starting a new project and can tolerate some compatibility edge cases</li><li>You are building TypeScript projects and want native TS execution</li><li>You are willing to be an early adopter and help shape the ecosystem</li></ul>',
    recommendation_summary: 'For most teams in 2025, <strong>pnpm</strong> offers the best balance of speed, disk efficiency, and compatibility. If you are starting fresh and want cutting-edge performance, <strong>Bun</strong> is worth evaluating. If you already use npm and things work fine, there is no urgent need to switch — npm has improved significantly in recent versions.',

    // Section: Corepack
    h2_corepack: 'Using Corepack to Manage Package Managers',
    corepack_intro: 'Corepack is a tool bundled with Node.js (since v16.9.0) that lets you manage Yarn and pnpm versions without installing them globally. It ensures everyone on your team uses the exact same version of the package manager.',
    corepack_example_desc: 'Here is how to use Corepack:',
    corepack_packagejson: 'Add the <code>packageManager</code> field to your package.json to enforce a specific version:',

    // Section: FAQ
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'Is pnpm faster than npm?',
    faq1_a: 'Yes, pnpm is significantly faster than npm in most scenarios. On cold installs, pnpm is typically 2-3x faster than npm. On warm installs (when the global store already has the packages), pnpm can be 4-5x faster because it only needs to create hard links rather than copy files. The speed advantage is even more pronounced on machines with many projects sharing the same dependencies.',
    faq2_q: 'Can I use Bun as a drop-in replacement for Node.js?',
    faq2_a: 'For most applications, yes. Bun implements the majority of Node.js APIs including fs, path, http, crypto, and others. However, some native Node.js modules (using node-gyp/N-API) may not work, and there are edge cases in the Node.js API surface that Bun has not yet implemented. Always test thoroughly before switching a production application from Node.js to Bun.',
    faq3_q: 'What is a phantom dependency and why does it matter?',
    faq3_a: 'A phantom dependency is a package your code imports that is not listed in your package.json but happens to exist in node_modules because it is a dependency of one of your declared dependencies. This works by accident with npm\'s flat node_modules structure. It becomes a problem when the indirect dependency is updated or removed, breaking your code unexpectedly. pnpm and Yarn PnP prevent phantom dependencies by default, making your dependency tree explicit and reliable.',
    faq4_q: 'Should I commit the lockfile to git?',
    faq4_a: 'Absolutely yes. The lockfile (package-lock.json, yarn.lock, pnpm-lock.yaml, or bun.lockb) ensures that every developer and CI server installs exactly the same dependency versions. Without it, you may get "works on my machine" bugs caused by different dependency resolutions. Always commit your lockfile and never add it to .gitignore.',
    faq5_q: 'Can I use pnpm or Yarn in a project that was set up with npm?',
    faq5_a: 'Yes. Both pnpm and Yarn can read your existing package.json. To migrate, delete node_modules and the old lockfile (package-lock.json), then run the install command for your new package manager (pnpm install or yarn install). The new tool will generate its own lockfile. Test your application thoroughly after migrating to ensure everything works correctly.',
    faq6_q: 'Why is Bun\'s lockfile binary instead of text?',
    faq6_a: 'Bun uses a binary lockfile (bun.lockb) for performance — binary files are faster to read and write than text-based formats like JSON or YAML. The trade-off is that you cannot easily read or diff it in pull requests. You can generate a human-readable version with <code>bun install --yarn</code> to output a yarn.lock-style text file, or use <code>bun.lockb --hash</code> to verify integrity. As of Bun 1.1+, you can also use <code>bun install --save-text-lockfile</code> to generate a text-based bun.lock file.',
  },
  zh: {
    title: 'npm vs Yarn vs pnpm vs Bun：完整包管理器对比（2025）',
    intro: '选择正确的 JavaScript 包管理器可以显著影响你的开发工作流、CI/CD 流水线速度和磁盘使用量。2025 年的四大主要竞争者是 <strong>npm</strong>、<strong>Yarn</strong>、<strong>pnpm</strong> 和 <strong>Bun</strong>。每个都有不同的理念和权衡取舍。本综合指南从所有重要维度对比这四个工具：速度、磁盘效率、monorepo 支持、安全性和开发者体验。',

    // Section: Overview
    h2_overview: '什么是 JavaScript 包管理器？',
    overview_p1: '包管理器自动化了在项目中安装、更新、配置和删除第三方库（包）的过程。它解析依赖树，通过锁文件管理版本，并提供构建和测试代码的脚本。',
    overview_p2: '每个现代 JavaScript 项目都依赖于一个包管理器。它们之间的差异初看可能很小，但在大型代码库、monorepo 和 CI 流水线中会逐渐累积。让我们深入了解每一个。',

    // Section: npm
    h2_npm: 'npm：默认标准',
    h3_npm_history: '历史和背景',
    npm_history_p: 'npm（Node Package Manager）由 Isaac Z. Schlueter 于 2010 年创建，自 Node.js 0.6.3 版本起与 Node.js 捆绑发布。它是每个 Node.js 开发者开箱即用的<strong>默认</strong>包管理器。npm 注册表托管了超过 200 万个包，是世界上最大的软件注册表。',
    h3_npm_features: '核心特性',
    npm_features_list: '<ul><li><strong>与 Node.js 捆绑</strong>——零配置，安装了 Node.js 就可用</li><li><strong>npm workspaces</strong>——从 npm 7 开始内置 monorepo 支持</li><li><strong>npm ci</strong>——为 CI 环境提供确定性的快速安装（删除 node_modules 并从锁文件安装）</li><li><strong>npm audit</strong>——内置安全漏洞扫描</li><li><strong>npx</strong>——无需全局安装即可执行包</li><li><strong>Overrides</strong>——强制指定依赖版本以解决冲突</li><li><strong>Provenance</strong>——npm 现在支持包来源证明，增强供应链安全</li></ul>',
    h3_npm_pros: '优点',
    npm_pros_list: '<ul><li>零安装——随 Node.js 一起提供</li><li>最大的生态系统和社区</li><li>优秀的文档</li><li>稳定且经过实战检验</li><li>workspaces 支持 monorepo</li><li>npm audit 安全扫描</li></ul>',
    h3_npm_cons: '缺点',
    npm_cons_list: '<ul><li>四个管理器中安装速度最慢</li><li>较高的磁盘使用量——每个项目都会复制一份所有依赖</li><li>历史上存在安全问题（虽然已大幅改善）</li><li>node_modules 可能变得极其庞大（"宇宙中最重的物体"梗）</li></ul>',
    npm_install_example: '# 安装依赖\nnpm install\n\n# 添加包\nnpm install express\n\n# 安装开发依赖\nnpm install --save-dev typescript\n\n# CI 优化安装\nnpm ci\n\n# 运行脚本\nnpm run build\n\n# 不安装直接执行包\nnpx create-react-app my-app',

    // Section: Yarn
    h2_yarn: 'Yarn：创新的先驱',
    h3_yarn_history: '历史和背景',
    yarn_history_p: 'Yarn 由 Facebook（现 Meta）于 2016 年创建，旨在解决当时 npm 的不足：非确定性安装、默认无锁文件、性能缓慢。Yarn 引入了 <code>yarn.lock</code> 文件和并行下载，大幅提升了安装速度。如今，Yarn 存在两个版本：<strong>Yarn Classic (1.x)</strong> 和 <strong>Yarn Berry (2.x+)</strong>，它们本质上是不同的工具。',
    h3_yarn_classic: 'Yarn Classic (1.x)',
    yarn_classic_p: 'Yarn Classic 的工作方式类似于 npm，但性能更好，锁文件更可靠。它使用扁平的 <code>node_modules</code> 目录结构并支持 workspaces 用于 monorepo。虽然仍被广泛使用，但 Yarn Classic 已进入维护模式——团队建议迁移到 Yarn Berry。',
    h3_yarn_berry: 'Yarn Berry (2.x+) 和 Plug\'n\'Play',
    yarn_berry_p: 'Yarn Berry 是一次完全重写，引入了 <strong>Plug\'n\'Play (PnP)</strong>，一种彻底消除 <code>node_modules</code> 目录的激进方法。它生成一个 <code>.pnp.cjs</code> 文件，将包名映射到压缩的 <code>.yarn/cache</code> 文件夹中的位置。这带来了：',
    yarn_pnp_benefits: '<ul><li><strong>近乎即时的安装</strong>——无需将数千个文件复制到 node_modules</li><li><strong>严格的依赖解析</strong>——防止幻影依赖（访问你未声明的包）</li><li><strong>零安装</strong>——将缓存提交到 git，在 CI 中完全跳过 npm install</li><li><strong>大幅减少磁盘使用</strong></li></ul>',
    h3_yarn_features: '核心特性',
    yarn_features_list: '<ul><li><strong>Plug\'n\'Play (PnP)</strong>——消除 node_modules，通过 .pnp.cjs 映射依赖</li><li><strong>零安装</strong>——将缓存提交到仓库，在 CI 中跳过安装</li><li><strong>Workspaces</strong>——一流的 monorepo 支持（首创此概念）</li><li><strong>Constraints</strong>——在工作区间强制执行规则（例如所有包必须使用相同的 React 版本）</li><li><strong>插件</strong>——通过插件系统扩展架构</li><li><strong>离线模式</strong>——使用缓存的存档在无网络环境下安装包</li></ul>',
    h3_yarn_pros: '优点',
    yarn_pros_list: '<ul><li>PnP 提供最快的安装速度和最小的磁盘占用</li><li>零安装完全消除 CI 安装步骤</li><li>出色的 monorepo 支持，包含 workspaces 和 constraints</li><li>严格的依赖解析能捕获幻影依赖问题</li><li>插件系统提供扩展性</li></ul>',
    h3_yarn_cons: '缺点',
    yarn_cons_list: '<ul><li>PnP 与某些包和工具存在兼容性问题</li><li>学习曲线较陡，特别是从 npm 迁移时</li><li>两个差异很大的版本（Classic vs Berry）容易混淆</li><li>社区比 npm 小</li><li>某些 IDE 集成需要额外配置才能支持 PnP</li></ul>',
    yarn_install_example: '# 安装依赖\nyarn install\n\n# 添加包\nyarn add express\n\n# 添加开发依赖\nyarn add --dev typescript\n\n# 运行脚本\nyarn build\n\n# 交互式升级\nyarn upgrade-interactive\n\n# 启用 PnP（Yarn Berry）\nyarn set version berry\nyarn install',

    // Section: pnpm
    h2_pnpm: 'pnpm：磁盘空间冠军',
    h3_pnpm_history: '历史和背景',
    pnpm_history_p: 'pnpm（performant npm）由 Zoltan Kochan 于 2017 年创建，旨在解决 npm 和 Yarn Classic 固有的磁盘空间问题。它的核心创新是<strong>内容寻址存储</strong>系统：每个包的每个版本在磁盘上只存储一次，项目通过链接指向这些共享副本。如果 10 个项目使用 <code>lodash@4.17.21</code>，你的机器上只有一份副本。',
    h3_pnpm_storage: '内容寻址存储详解',
    pnpm_storage_p: '当你运行 <code>pnpm install</code> 时，pnpm 不会将包复制到每个项目的 <code>node_modules</code> 中。相反，它创建一个全局存储（通常在 <code>~/.local/share/pnpm/store</code>），每个唯一文件按其内容哈希存储。你项目的 <code>node_modules</code> 包含指向此存储的硬链接（或 Windows 上的符号链接）。这意味着：',
    pnpm_storage_benefits: '<ul><li><strong>大量磁盘节省</strong>——包只全局存储一次，而非每个项目一份</li><li><strong>更快的安装</strong>——文件是链接的，不是复制的</li><li><strong>严格的 node_modules 结构</strong>——默认防止幻影依赖</li><li><strong>完整性验证</strong>——内容寻址意味着文件通过哈希验证</li></ul>',
    h3_pnpm_features: '核心特性',
    pnpm_features_list: '<ul><li><strong>内容寻址存储</strong>——全局存储加硬链接，大幅节省磁盘</li><li><strong>默认严格模式</strong>——只有声明的依赖才可访问（无幻影依赖）</li><li><strong>pnpm workspaces</strong>——出色的 monorepo 支持，包含过滤和并行执行</li><li><strong>副作用缓存</strong>——缓存 postinstall 脚本输出以加速后续安装</li><li><strong>补丁</strong>——内置 <code>pnpm patch</code> 命令，无需 fork 即可修补依赖</li><li><strong>Catalogs</strong>——在工作区包之间定义共享依赖版本</li></ul>',
    h3_pnpm_pros: '优点',
    pnpm_pros_list: '<ul><li>最佳磁盘空间效率——在多项目机器上节省数 GB 空间</li><li>快速安装（特别是有热存储的第二次安装）</li><li>默认严格依赖解析</li><li>出色的 monorepo 工具，支持过滤命令</li><li>npm 的直接替代品（类似的 CLI 命令）</li><li>积极开发和不断增长的社区</li></ul>',
    h3_pnpm_cons: '缺点',
    pnpm_cons_list: '<ul><li>需要单独安装（未与 Node.js 捆绑）</li><li>硬链接可能使某些工具和文件监视器混淆</li><li>严格模式可能破坏依赖幻影依赖的包</li><li>社区和生态系统比 npm 或 Yarn 小</li><li>某些托管平台没有内置 pnpm 支持</li></ul>',
    pnpm_install_example: '# 安装 pnpm\nnpm install -g pnpm\n# 或使用 corepack（推荐）\ncorepack enable\ncorepack prepare pnpm@latest --activate\n\n# 安装依赖\npnpm install\n\n# 添加包\npnpm add express\n\n# 添加开发依赖\npnpm add -D typescript\n\n# 运行脚本\npnpm run build\n\n# 检查磁盘使用节省\npnpm store status',

    // Section: Bun
    h2_bun: 'Bun：全能运行时',
    h3_bun_history: '历史和背景',
    bun_history_p: 'Bun 由 Jarred Sumner 创建，于 2023 年 9 月发布 1.0 版本。与其他三个不同，Bun 不仅仅是包管理器——它是一个<strong>全能 JavaScript/TypeScript 运行时</strong>，包含包管理器、打包器、测试运行器和转译器。使用 Zig 从头构建（使用 JavaScriptCore 而非 V8），Bun 专为最大性能而设计。',
    h3_bun_features: '核心特性',
    bun_features_list: '<ul><li><strong>极速安装</strong>——用原生代码编写，通常比 npm 快 10-25 倍</li><li><strong>全能运行时</strong>——一个工具替代 Node.js、npm、webpack/esbuild 和 Jest</li><li><strong>原生 TypeScript 支持</strong>——直接运行 .ts 文件，无需编译步骤</li><li><strong>npm 兼容</strong>——读取 package.json，使用 node_modules，兼容 npm 注册表</li><li><strong>内置打包器</strong>——为生产环境打包 JavaScript/TypeScript</li><li><strong>内置测试运行器</strong>——使用 bun test 进行 Jest 兼容的测试</li><li><strong>热重载</strong>——使用 --hot 标志的内置监视模式</li><li><strong>Node.js 兼容</strong>——实现大多数 Node.js API 以进行直接替换</li></ul>',
    h3_bun_pros: '优点',
    bun_pros_list: '<ul><li>包安装速度最快，优势显著</li><li>全能工具减少工具链复杂性</li><li>原生 TypeScript 执行，无需配置</li><li>大多数项目可直接替换 Node.js</li><li>内置打包器和测试运行器</li><li>积极开发，快速改进</li></ul>',
    h3_bun_cons: '缺点',
    bun_cons_list: '<ul><li>相对较新——在生产环境中的实战检验较少</li><li>不是 100% Node.js 兼容（某些边缘情况和原生模块可能不工作）</li><li>社区较小，Stack Overflow 答案较少</li><li>Windows 支持是后来添加的，可能存在一些粗糙之处</li><li>Monorepo 支持不如 pnpm 或 Yarn 成熟</li><li>某些带有原生插件的 npm 包可能无法用 Bun 编译</li></ul>',
    bun_install_example: '# 安装 Bun\ncurl -fsSL https://bun.sh/install | bash\n# 或在 Windows 上\npowershell -c "irm bun.sh/install.ps1 | iex"\n\n# 安装依赖\nbun install\n\n# 添加包\nbun add express\n\n# 添加开发依赖\nbun add --dev typescript\n\n# 运行脚本\nbun run build\n\n# 直接运行 TypeScript 文件\nbun run server.ts\n\n# 运行测试\nbun test',

    // Section: Comparison Table
    h2_comparison: '并排对比',
    th_feature: '特性',
    th_npm: 'npm',
    th_yarn: 'Yarn (Berry)',
    th_pnpm: 'pnpm',
    th_bun: 'Bun',
    feat_first_release: '首次发布',
    val_npm_release: '2010',
    val_yarn_release: '2016（Berry：2020）',
    val_pnpm_release: '2017',
    val_bun_release: '2023（1.0）',
    feat_language: '编写语言',
    val_npm_lang: 'JavaScript',
    val_yarn_lang: 'JavaScript',
    val_pnpm_lang: 'JavaScript',
    val_bun_lang: 'Zig + C++',
    feat_install_speed: '安装速度（冷启动）',
    val_npm_speed: '慢',
    val_yarn_speed: '快（PnP：非常快）',
    val_pnpm_speed: '快',
    val_bun_speed: '非常快',
    feat_disk_usage: '磁盘使用',
    val_npm_disk: '高（每项目复制）',
    val_yarn_disk: '低（PnP）/ 高（Classic）',
    val_pnpm_disk: '非常低（共享存储）',
    val_bun_disk: '中等（node_modules）',
    feat_lockfile: '锁文件',
    val_npm_lock: 'package-lock.json',
    val_yarn_lock: 'yarn.lock',
    val_pnpm_lock: 'pnpm-lock.yaml',
    val_bun_lock: 'bun.lockb（二进制）',
    feat_monorepo: 'Monorepo 支持',
    val_npm_mono: 'Workspaces（基础）',
    val_yarn_mono: 'Workspaces + Constraints',
    val_pnpm_mono: 'Workspaces + 过滤',
    val_bun_mono: 'Workspaces（基础）',
    feat_phantom_deps: '幻影依赖防护',
    val_npm_phantom: '否',
    val_yarn_phantom: '是（PnP）',
    val_pnpm_phantom: '是（默认严格）',
    val_bun_phantom: '否',
    feat_node_compat: 'Node.js 捆绑',
    val_npm_node: '是',
    val_yarn_node: '否（使用 corepack）',
    val_pnpm_node: '否（使用 corepack）',
    val_bun_node: '否（自身是运行时）',
    feat_security: '安全审计',
    val_npm_security: 'npm audit（内置）',
    val_yarn_security: 'yarn audit',
    val_pnpm_security: 'pnpm audit',
    val_bun_security: '未内置',
    feat_offline: '离线模式',
    val_npm_offline: '基于缓存',
    val_yarn_offline: '零安装（优秀）',
    val_pnpm_offline: '基于存储',
    val_bun_offline: '基于缓存',
    feat_patch: '依赖补丁',
    val_npm_patch: '通过 overrides',
    val_yarn_patch: 'yarn patch',
    val_pnpm_patch: 'pnpm patch',
    val_bun_patch: 'patch-package',

    // Section: Benchmarks
    h2_benchmarks: '安装速度基准测试',
    benchmarks_intro: '以下基准测试基于典型的中型项目（约 500 个依赖），在现代机器上运行。时间为近似值，会因网络条件、缓存状态和硬件而异。',
    bench_note: '<strong>注意：</strong>基准测试仅供参考。请务必用你自己的项目进行测试，因为结果会因依赖树形状、网络速度和操作系统而有显著差异。',
    th_scenario: '场景',
    bench_cold: '冷安装（无缓存）',
    bench_warm: '热安装（有缓存）',
    bench_ci: 'CI 安装（干净环境）',
    bench_add: '添加单个包',
    val_npm_cold: '~45s',
    val_yarn_cold: '~25s',
    val_pnpm_cold: '~20s',
    val_bun_cold: '~5s',
    val_npm_warm: '~20s',
    val_yarn_warm: '~1s（零安装）',
    val_pnpm_warm: '~5s',
    val_bun_warm: '~2s',
    val_npm_ci: '~35s（npm ci）',
    val_yarn_ci: '~15s',
    val_pnpm_ci: '~12s',
    val_bun_ci: '~4s',
    val_npm_add: '~8s',
    val_yarn_add: '~4s',
    val_pnpm_add: '~3s',
    val_bun_add: '~1s',

    // Section: Migration
    h2_migration: '迁移指南',
    migration_intro: '在包管理器之间切换通常很简单。以下是每条迁移路径的关键步骤。',
    h3_npm_to_pnpm: '从 npm 迁移到 pnpm',
    npm_to_pnpm_steps: 'pnpm 被设计为 npm 的直接替代品，迁移很简单：',
    h3_npm_to_yarn: '从 npm 迁移到 Yarn Berry',
    npm_to_yarn_steps: '迁移到 Yarn Berry 需要更多步骤，特别是如果你想使用 PnP：',
    h3_npm_to_bun: '从 npm 迁移到 Bun',
    npm_to_bun_steps: 'Bun 读取你现有的 package.json，可以直接使用 npm 的注册表：',
    h3_migration_tips: '通用迁移建议',
    migration_tips_list: '<ul><li><strong>充分测试</strong>——迁移后运行完整的测试套件</li><li><strong>更新 CI/CD</strong>——更新流水线配置以使用新的包管理器</li><li><strong>锁文件</strong>——在生成新锁文件之前删除旧锁文件；永远不要有两个锁文件</li><li><strong>团队对齐</strong>——确保团队中的每个人同时切换</li><li><strong>corepack</strong>——使用 <code>corepack enable</code> 在团队中一致管理包管理器版本</li><li><strong>Engines 字段</strong>——在 package.json 中添加 <code>packageManager</code> 字段以强制使用正确的包管理器</li></ul>',

    // Section: Recommendations
    h2_recommendations: '何时使用哪个：建议',
    h3_use_npm: '使用 npm 当...',
    use_npm_list: '<ul><li>你想要零配置——npm 随 Node.js 提供，无需额外安装</li><li>你在处理中小型项目，安装速度不是关键</li><li>你是初学者，想要最大的社区来解决问题</li><li>你的团队不想学习新工具</li><li>你需要与教程、指南和 Stack Overflow 答案的最广泛兼容性</li></ul>',
    h3_use_yarn: '使用 Yarn Berry 当...',
    use_yarn_list: '<ul><li>你想要最快的 CI 流水线，使用零安装</li><li>你运行大型 monorepo，需要 constraints 来强制一致性</li><li>你想要严格的依赖解析来捕获幻影依赖问题</li><li>你的团队愿意投入时间学习 PnP 并解决兼容性问题</li><li>离线开发能力对你的工作流很重要</li></ul>',
    h3_use_pnpm: '使用 pnpm 当...',
    use_pnpm_list: '<ul><li>磁盘空间是一个考虑因素——你在一台机器上有很多项目</li><li>你想要一个比 npm 更快更高效的<strong>直接替代品</strong></li><li>你运行 monorepo，想要强大的过滤和并行执行</li><li>你想要严格的依赖解析，但不想要 PnP 的学习曲线</li><li>你正在为生产构建，想要一个经过验证的稳定工具</li></ul>',
    h3_use_bun: '使用 Bun 当...',
    use_bun_list: '<ul><li>原始速度是你的首要优先级</li><li>你想要一个全能工具（运行时 + 包管理器 + 打包器 + 测试运行器）</li><li>你正在启动一个新项目，可以容忍一些兼容性边缘情况</li><li>你正在构建 TypeScript 项目，想要原生 TS 执行</li><li>你愿意成为早期采用者，帮助塑造生态系统</li></ul>',
    recommendation_summary: '对于 2025 年的大多数团队，<strong>pnpm</strong> 在速度、磁盘效率和兼容性方面提供了最佳平衡。如果你从头开始并想要最前沿的性能，<strong>Bun</strong> 值得评估。如果你已经使用 npm 且一切正常，没有紧迫的切换需要——npm 在最近的版本中已经显著改善。',

    // Section: Corepack
    h2_corepack: '使用 Corepack 管理包管理器',
    corepack_intro: 'Corepack 是从 Node.js v16.9.0 起捆绑的工具，让你无需全局安装即可管理 Yarn 和 pnpm 版本。它确保团队中的每个人都使用完全相同版本的包管理器。',
    corepack_example_desc: '以下是使用 Corepack 的方法：',
    corepack_packagejson: '在 package.json 中添加 <code>packageManager</code> 字段以强制使用特定版本：',

    // Section: FAQ
    h2_faq: '常见问题',
    faq1_q: 'pnpm 比 npm 快吗？',
    faq1_a: '是的，pnpm 在大多数场景下比 npm 快得多。冷安装时，pnpm 通常比 npm 快 2-3 倍。热安装时（当全局存储已有包时），pnpm 可以快 4-5 倍，因为它只需要创建硬链接而不是复制文件。在共享相同依赖的多项目机器上，速度优势更加明显。',
    faq2_q: 'Bun 可以作为 Node.js 的直接替代品吗？',
    faq2_a: '对于大多数应用，是的。Bun 实现了大部分 Node.js API，包括 fs、path、http、crypto 等。但是，一些原生 Node.js 模块（使用 node-gyp/N-API）可能不工作，Node.js API 中还有一些 Bun 尚未实现的边缘情况。在将生产应用从 Node.js 切换到 Bun 之前，务必充分测试。',
    faq3_q: '什么是幻影依赖，为什么它很重要？',
    faq3_a: '幻影依赖是你的代码导入但未在 package.json 中列出的包，它恰好存在于 node_modules 中，因为它是你某个已声明依赖的依赖。这在 npm 的扁平 node_modules 结构中碰巧可以工作。当间接依赖被更新或删除时就会出问题，意外地破坏你的代码。pnpm 和 Yarn PnP 默认防止幻影依赖，使你的依赖树显式且可靠。',
    faq4_q: '应该将锁文件提交到 git 吗？',
    faq4_a: '绝对应该。锁文件（package-lock.json、yarn.lock、pnpm-lock.yaml 或 bun.lockb）确保每个开发者和 CI 服务器安装完全相同的依赖版本。没有它，你可能会遇到由不同依赖解析导致的"在我机器上可以工作"的 bug。始终提交你的锁文件，永远不要将其添加到 .gitignore。',
    faq5_q: '可以在用 npm 设置的项目中使用 pnpm 或 Yarn 吗？',
    faq5_a: '可以。pnpm 和 Yarn 都可以读取你现有的 package.json。要迁移，删除 node_modules 和旧锁文件（package-lock.json），然后运行新包管理器的安装命令（pnpm install 或 yarn install）。新工具会生成自己的锁文件。迁移后充分测试你的应用以确保一切正常。',
    faq6_q: '为什么 Bun 的锁文件是二进制而不是文本？',
    faq6_a: 'Bun 使用二进制锁文件（bun.lockb）是为了性能——二进制文件比基于文本的格式（如 JSON 或 YAML）读写更快。代价是你不能在 PR 中轻松查看或对比它。你可以使用 <code>bun install --yarn</code> 生成 yarn.lock 风格的可读文本文件，或使用 <code>bun.lockb --hash</code> 验证完整性。从 Bun 1.1+ 开始，你还可以使用 <code>bun install --save-text-lockfile</code> 生成基于文本的 bun.lock 文件。',
  },
};

export default function NpmVsYarnVsPnpmVsBun({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ========== OVERVIEW ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_overview}</h2>
      <p>{t.overview_p1}</p>
      <p>{t.overview_p2}</p>

      {/* ========== NPM ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_npm}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_history}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.npm_history_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.npm_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.npm_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.npm_cons_list }} />

      <pre><code>{t.npm_install_example}</code></pre>

      {/* ========== YARN ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_yarn}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_history}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.yarn_history_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_classic}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.yarn_classic_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_berry}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.yarn_berry_p }} />
      <div dangerouslySetInnerHTML={{ __html: t.yarn_pnp_benefits }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.yarn_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.yarn_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_yarn_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.yarn_cons_list }} />

      <pre><code>{t.yarn_install_example}</code></pre>

      {/* ========== PNPM ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_pnpm}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_pnpm_history}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pnpm_history_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_pnpm_storage}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.pnpm_storage_p }} />
      <div dangerouslySetInnerHTML={{ __html: t.pnpm_storage_benefits }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_pnpm_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.pnpm_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_pnpm_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.pnpm_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_pnpm_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.pnpm_cons_list }} />

      <pre><code>{t.pnpm_install_example}</code></pre>

      {/* ========== BUN ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_bun}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_bun_history}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.bun_history_p }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_bun_features}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.bun_features_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_bun_pros}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.bun_pros_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_bun_cons}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.bun_cons_list }} />

      <pre><code>{t.bun_install_example}</code></pre>

      {/* ========== COMPARISON TABLE ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_comparison}</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_feature}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_npm}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_yarn}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_pnpm}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_bun}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_first_release}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_release}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_release}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_release}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_release}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_language}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_lang}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_lang}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_lang}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_lang}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_install_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_speed}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_speed}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_disk_usage}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_disk}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_disk}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_disk}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_disk}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_lockfile}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">{t.val_npm_lock}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">{t.val_yarn_lock}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">{t.val_pnpm_lock}</td>
              <td className="border border-gray-700 px-4 py-2 font-mono text-sm">{t.val_bun_lock}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_monorepo}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_mono}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_mono}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_phantom_deps}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_phantom}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_phantom}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_phantom}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_phantom}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_node_compat}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_node}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_node}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_node}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_node}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_security}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_security}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_security}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_security}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_security}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_offline}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_offline}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_offline}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_offline}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_offline}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.feat_patch}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_patch}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_patch}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_patch}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_patch}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ========== BENCHMARKS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_benchmarks}</h2>
      <p>{t.benchmarks_intro}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_scenario}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_npm}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_yarn}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_pnpm}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.th_bun}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.bench_cold}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_cold}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_cold}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_cold}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_bun_cold}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.bench_warm}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_warm}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_yarn_warm}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_warm}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_bun_warm}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.bench_ci}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_ci}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_ci}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_ci}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_bun_ci}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{t.bench_add}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_npm_add}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_yarn_add}</td>
              <td className="border border-gray-700 px-4 py-2">{t.val_pnpm_add}</td>
              <td className="border border-gray-700 px-4 py-2 text-green-400 font-semibold">{t.val_bun_add}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <blockquote dangerouslySetInnerHTML={{ __html: t.bench_note }} />

      {/* ========== MIGRATION GUIDES ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_migration}</h2>
      <p>{t.migration_intro}</p>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_to_pnpm}</h3>
      <p>{t.npm_to_pnpm_steps}</p>
      <pre><code>{`# Step 1: Install pnpm
corepack enable
corepack prepare pnpm@latest --activate

# Step 2: Remove npm artifacts
rm -rf node_modules package-lock.json

# Step 3: Install with pnpm
pnpm install

# Step 4: Update scripts in package.json
# Replace "npm run" with "pnpm run" in CI configs

# Step 5: Add packageManager field
# "packageManager": "pnpm@9.x.x"`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_to_yarn}</h3>
      <p>{t.npm_to_yarn_steps}</p>
      <pre><code>{`# Step 1: Enable Yarn via corepack
corepack enable
yarn set version berry

# Step 2: Remove npm artifacts
rm -rf node_modules package-lock.json

# Step 3: Install with Yarn
yarn install

# Step 4: Configure PnP (optional but recommended)
# Add to .yarnrc.yml:
# nodeLinker: pnp

# Step 5: Add SDK for your editor
yarn dlx @yarnpkg/sdks vscode

# Step 6: Add to .gitignore
# .yarn/*
# !.yarn/cache
# !.yarn/patches
# !.yarn/plugins
# !.yarn/releases
# !.yarn/sdks
# !.yarn/versions`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_npm_to_bun}</h3>
      <p>{t.npm_to_bun_steps}</p>
      <pre><code>{`# Step 1: Install Bun
curl -fsSL https://bun.sh/install | bash
# Windows: powershell -c "irm bun.sh/install.ps1 | iex"

# Step 2: Remove npm artifacts
rm -rf node_modules package-lock.json

# Step 3: Install with Bun
bun install

# Step 4: Update scripts
# Replace "node" with "bun" in scripts
# Replace "npm run" with "bun run"
# Replace "npx" with "bunx"

# Step 5: Test everything
bun test
bun run build`}</code></pre>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_migration_tips}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.migration_tips_list }} />

      {/* ========== RECOMMENDATIONS ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_recommendations}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_use_npm}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.use_npm_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_use_yarn}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.use_yarn_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_use_pnpm}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.use_pnpm_list }} />

      <h3 className="text-xl font-semibold mt-6 mb-3">{t.h3_use_bun}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.use_bun_list }} />

      <p dangerouslySetInnerHTML={{ __html: t.recommendation_summary }} />

      {/* ========== COREPACK ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_corepack}</h2>
      <p>{t.corepack_intro}</p>
      <p>{t.corepack_example_desc}</p>

      <pre><code>{`# Enable corepack (bundled with Node.js 16.9+)
corepack enable

# Use a specific Yarn version
corepack prepare yarn@4.1.0 --activate

# Use a specific pnpm version
corepack prepare pnpm@9.0.0 --activate

# Verify the active version
yarn --version
pnpm --version`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.corepack_packagejson }} />

      <pre><code>{`{
  "name": "my-project",
  "version": "1.0.0",
  "packageManager": "pnpm@9.1.0",
  "engines": {
    "node": ">=18.0.0"
  }
}`}</code></pre>

      {/* ========== FAQ ========== */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq1_q}</h3>
      <p>{t.faq1_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq2_q}</h3>
      <p>{t.faq2_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq4_q}</h3>
      <p>{t.faq4_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq5_q}</h3>
      <p>{t.faq5_a}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">{t.faq6_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq6_a }} />
    </article>
  );
}
