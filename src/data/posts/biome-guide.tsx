'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Biome Guide 2026: The Fast Rust-Based Formatter and Linter for JavaScript and TypeScript',
    intro: 'Biome (formerly Rome) is a high-performance toolchain for JavaScript, TypeScript, JSX, TSX, JSON, and CSS. Written in Rust, it combines formatting, linting, and import sorting into a single binary that runs up to 35x faster than ESLint and Prettier combined. Biome provides 97% Prettier compatibility for formatting, over 280 lint rules including many from ESLint and TypeScript-ESLint, and requires zero configuration to get started. If you want one fast tool to replace your entire code quality pipeline, Biome is the leading choice in 2026.',
    tldr: 'Biome is a Rust-based all-in-one toolchain that replaces ESLint, Prettier, and import sorting tools with a single fast binary. It offers 97% Prettier-compatible formatting, 280+ lint rules, built-in import sorting, first-class TypeScript support, and zero-config defaults. Configuration lives in biome.json. Biome is 35x faster than ESLint+Prettier, supports CI/CD integration out of the box, and provides easy migration paths from existing ESLint and Prettier setups.',
    keyTakeaway1: 'Biome is written in Rust and runs 25-35x faster than ESLint + Prettier for formatting and linting combined.',
    keyTakeaway2: 'A single biome.json file configures formatting rules, lint rules, and import sorting with sensible defaults.',
    keyTakeaway3: 'Biome provides 97% Prettier compatibility so you can migrate without reformatting your entire codebase.',
    keyTakeaway4: 'Over 280 lint rules are available including rules ported from ESLint, typescript-eslint, and framework-specific plugins.',
    keyTakeaway5: 'Built-in import sorting replaces eslint-plugin-import and trivial-import-sort with zero extra configuration.',
    keyTakeaway6: 'The biome migrate command automates migration from ESLint and Prettier configs to biome.json.',

    h2WhatIs: 'What Is Biome?',
    whatIsDesc: 'Biome is an open-source toolchain for web development that provides a formatter, linter, and import organizer for JavaScript, TypeScript, JSX, TSX, JSON, CSS, and GraphQL. It was created as a continuation of the Rome project and released its first stable version (1.0) in August 2023. The project is maintained by the Biome core team and a growing community of contributors.',
    whatIsDesc2: 'Unlike the traditional JavaScript tooling stack where you need ESLint for linting, Prettier for formatting, and eslint-plugin-import or trivial-import-sort for organizing imports, Biome handles all three in a single binary. This eliminates dependency conflicts, simplifies configuration, and dramatically reduces execution time. Biome parses your code once and runs all checks in a single pass.',

    h2WhyFast: 'Why Is Biome So Fast?',
    whyFastDesc: 'Biome is written in Rust, a systems programming language known for memory safety and zero-cost abstractions. Rust allows Biome to achieve performance that is impossible in JavaScript-based tools. The key technical reasons for its speed are:',
    whyFast1: 'Rust compiled binary: Biome compiles to native machine code. There is no JavaScript runtime overhead, no V8 JIT warm-up, and no garbage collection pauses during execution.',
    whyFast2: 'Single-pass architecture: Biome parses each file once into a concrete syntax tree (CST) and runs formatting, linting, and import sorting on that same tree. ESLint + Prettier parse the file twice with separate ASTs.',
    whyFast3: 'Parallel processing: Biome processes multiple files simultaneously using Rust threads. JavaScript tools are limited by the single-threaded nature of Node.js unless they spawn worker processes.',
    whyFast4: 'Zero-copy parsing: The Biome parser operates on string slices without copying data, reducing memory allocations and cache misses compared to JavaScript object-based ASTs.',
    whyFast5: 'No plugin overhead: Unlike ESLint where each plugin adds visitor traversals and rule evaluations, Biome rules are compiled into the binary and execute without dynamic dispatch.',

    h2Install: 'Installation and Getting Started',
    installDesc: 'Biome can be installed as a project dependency or used standalone. The recommended approach is to install it as a dev dependency so that every team member uses the same version.',

    h2BiomeJson: 'biome.json Configuration',
    biomeJsonDesc: 'The biome.json file is the single configuration file for all Biome features. It controls formatter settings, linter rules, import sorting behavior, and file handling. Biome works with zero configuration, but biome.json lets you customize every aspect.',
    biomeJsonDesc2: 'You can generate a starter biome.json by running biome init. The file supports JSON with comments for documentation purposes. Configuration is organized into top-level sections: formatter, linter, organizeImports, javascript, typescript, json, and css.',

    h2Formatting: 'Formatting Rules and Options',
    formattingDesc: 'The Biome formatter is 97% compatible with Prettier output. It supports all the formatting options that Prettier provides, including indent style, indent width, line width, quote style, semicolons, and trailing commas. The formatter works on JavaScript, TypeScript, JSX, TSX, JSON, and CSS files.',
    formattingDesc2: 'Unlike Prettier, Biome does not require a separate .prettierrc file. All formatting options live in biome.json under the formatter and language-specific sections. If you are migrating from Prettier, Biome can read your .prettierrc and convert it automatically.',

    h2Linting: 'Linting Rules',
    lintingDesc: 'Biome provides over 280 lint rules organized into groups. Each group focuses on a specific category of code quality. Rules can be enabled, disabled, or set to warn level. Many rules include safe automatic fixes that can be applied with the --write flag.',
    lintGroup1: 'recommended: A curated set of rules enabled by default that catch common bugs and enforce best practices. This is the default when no rules are explicitly configured.',
    lintGroup2: 'suspicious: Rules that detect code patterns that are likely bugs, such as duplicate object keys, comparisons with NaN, or confusing void expressions.',
    lintGroup3: 'correctness: Rules that catch definitely incorrect code, such as unreachable code, invalid constructors, or void type returns in non-void functions.',
    lintGroup4: 'style: Rules that enforce consistent code style, such as using const over let, template literals over string concatenation, and optional chaining.',
    lintGroup5: 'complexity: Rules that flag overly complex code patterns like excessive nesting, long parameter lists, and unnecessary type assertions.',
    lintGroup6: 'performance: Rules that catch potential performance issues like accumulating spread in loops, forcing layout reflows, and unnecessary re-renders.',
    lintGroup7: 'a11y: Accessibility rules for JSX that check for missing alt attributes, invalid ARIA roles, missing form labels, and other WCAG violations.',
    lintGroup8: 'security: Rules that detect security issues like dangerouslySetInnerHTML usage without sanitization and open redirect vulnerabilities.',

    h2ImportSorting: 'Import Sorting',
    importSortingDesc: 'Biome includes built-in import sorting that replaces eslint-plugin-import-sort, trivial-import-sort, and similar tools. When enabled, Biome automatically groups and sorts import statements according to a consistent convention. It separates external dependencies from internal modules and sorts alphabetically within each group.',
    importSortingDesc2: 'Import sorting is enabled by default when you run biome check --write or biome format --write. You can configure it in biome.json under the organizeImports section. The sorting respects side-effect imports (bare imports like "import ./polyfills") and keeps them in their original position.',

    h2Migration: 'Migrating from ESLint and Prettier',
    migrationDesc: 'Biome provides a dedicated migrate command that reads your existing ESLint and Prettier configuration files and converts them into biome.json equivalents. This automates the most tedious part of the migration process.',
    migrationDesc2: 'The migration tool handles .eslintrc (JSON, YAML, JS), eslint.config.js (flat config), .prettierrc, and prettier.config.js files. It maps ESLint rules to their Biome equivalents where they exist and warns about rules that have no Biome counterpart.',
    migrationDesc3: 'After migration, you can remove eslint, prettier, and their plugin dependencies from your package.json. This typically removes 10-30 packages from your dependency tree, simplifying maintenance and reducing install times.',

    h2CICD: 'CI/CD Integration',
    cicdDesc: 'Biome integrates seamlessly into CI/CD pipelines. The biome ci command is specifically designed for continuous integration environments. It runs the formatter in check mode (reporting errors without modifying files), runs all enabled lint rules, and verifies import sorting. The command exits with a non-zero code if any check fails.',
    cicdDesc2: 'Biome also provides a GitHub Action (biomejs/setup-biome) that installs and caches the Biome binary for fast CI runs. The action supports version pinning and works with all GitHub-hosted runners.',

    h2Editor: 'Editor Integration',
    editorDesc: 'Biome provides official extensions for VS Code, IntelliJ-based IDEs, and Neovim. The VS Code extension is the most feature-complete, offering real-time linting diagnostics, format-on-save, quick-fix code actions, and import sorting.',
    editorVSCode: 'Install the Biome extension from the VS Code marketplace. Then add these settings to your .vscode/settings.json to enable format-on-save and make Biome the default formatter for supported languages.',
    editorNeovim: 'For Neovim, Biome supports the Language Server Protocol (LSP). You can configure it with nvim-lspconfig or any LSP client. The LSP provides diagnostics, formatting, code actions, and import sorting.',

    h2Comparison: 'Biome vs ESLint + Prettier',
    comparisonDesc: 'Understanding the trade-offs between Biome and the traditional ESLint + Prettier stack helps you decide which tool is right for your project.',
    compCol1: 'Feature',
    compCol2: 'Biome',
    compCol3: 'ESLint + Prettier',
    compRow1: 'Speed',
    compRow1V2: '25-35x faster',
    compRow1V3: 'Baseline',
    compRow2: 'Configuration',
    compRow2V2: 'Single biome.json',
    compRow2V3: 'eslint.config.js + .prettierrc',
    compRow3: 'Dependencies',
    compRow3V2: '1 package',
    compRow3V3: '10-30 packages',
    compRow4: 'Lint rules',
    compRow4V2: '280+ built-in',
    compRow4V3: 'Thousands via plugins',
    compRow5: 'Custom rules',
    compRow5V2: 'Not supported (plugins planned)',
    compRow5V3: 'Full custom rule API',
    compRow6: 'Framework plugins',
    compRow6V2: 'React/JSX a11y built-in',
    compRow6V3: 'React, Vue, Angular, Svelte, etc.',
    compRow7: 'Import sorting',
    compRow7V2: 'Built-in',
    compRow7V3: 'Via plugins',
    compRow8: 'CSS/JSON linting',
    compRow8V2: 'Built-in',
    compRow8V3: 'Via separate tools',
    compRow9: 'Prettier compat',
    compRow9V2: '97% compatible',
    compRow9V3: '100% (is Prettier)',
    compRow10: 'TypeScript',
    compRow10V2: 'Built-in parser',
    compRow10V3: 'Via typescript-eslint',
    comparisonSummary: 'Choose Biome if speed, simplicity, and minimal configuration are priorities and you do not need custom ESLint rules or framework-specific plugins beyond React. Choose ESLint + Prettier if you need Vue/Angular/Svelte plugins, custom rules, or the full ESLint ecosystem. Many teams use Biome for new projects and ESLint for existing projects with complex plugin dependencies.',

    h2Advanced: 'Advanced Configuration',
    advancedDesc: 'Biome supports advanced configuration patterns for monorepos, per-directory overrides, and language-specific settings. The overrides section in biome.json lets you apply different rules to different file patterns, similar to ESLint flat config.',

    h2Monorepo: 'Monorepo Setup',
    monorepoDesc: 'In a monorepo, you can place a biome.json at the root for shared settings and use the extends property in package-specific biome.json files to inherit and override rules. Biome automatically discovers the nearest biome.json when processing a file.',

    h2Performance: 'Performance Benchmarks',
    perfDesc: 'Biome consistently outperforms ESLint and Prettier in benchmarks across projects of all sizes. On a typical React project with 1,000 TypeScript files, Biome completes formatting and linting in under 500ms while ESLint + Prettier takes 10-15 seconds. The speed advantage grows with project size.',
    perfDesc2: 'In CI environments, Biome reduces code quality check times from minutes to seconds. Teams report 90-95% reduction in lint/format CI step duration after migrating to Biome. This directly translates to faster feedback loops and shorter PR review cycles.',

    h2BestPractices: 'Best Practices',
    bp1: 'Start with the recommended rule preset and customize from there. The defaults are well-chosen and catch the most important issues without being overly strict.',
    bp2: 'Enable import sorting from the start. It eliminates merge conflicts in import blocks and keeps your codebase consistent.',
    bp3: 'Use biome check --write in your pre-commit hook to auto-format, auto-fix, and sort imports before every commit.',
    bp4: 'Pin the Biome version in your package.json to avoid formatting differences between team members using different versions.',
    bp5: 'Use the biome ci command in your CI pipeline. It is optimized for non-interactive environments and provides clear error output.',
    bp6: 'Configure your editor extension to format on save. This catches issues immediately and prevents CI failures.',
    bp7: 'Review Biome release notes with each update. New rules and formatter improvements are added regularly.',
    bp8: 'Use the overrides section for test files that need relaxed rules, such as allowing magic numbers or console statements.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Biome and how does it relate to Rome?',
    faq1A: 'Biome is the community-driven continuation of the Rome project. When the Rome company dissolved, the core contributors forked the project as Biome under open governance. Biome inherits all of Rome\'s technology and continues active development with regular releases.',
    faq2Q: 'Is Biome a drop-in replacement for ESLint and Prettier?',
    faq2A: 'For many projects, yes. Biome provides 97% Prettier-compatible formatting and over 280 lint rules that cover most ESLint core and TypeScript-ESLint rules. However, if you rely on ESLint plugins for Vue, Angular, Svelte, or custom rules, you will still need ESLint for those specific checks.',
    faq3Q: 'How fast is Biome compared to ESLint?',
    faq3A: 'Biome is typically 25-35x faster than ESLint + Prettier combined. On a 1,000-file TypeScript project, Biome completes in under 500ms while ESLint + Prettier takes 10-15 seconds. The speed comes from Rust compilation, single-pass architecture, and parallel file processing.',
    faq4Q: 'How do I migrate from ESLint and Prettier to Biome?',
    faq4A: 'Run biome migrate eslint to convert your ESLint config and biome migrate prettier to convert your Prettier config. Review the generated biome.json, run biome check to verify no regressions, then remove ESLint and Prettier dependencies from your project.',
    faq5Q: 'Does Biome support custom lint rules?',
    faq5A: 'Biome does not currently support custom lint rules or a plugin API. A plugin system is planned on the roadmap. If you need custom rules, you can run Biome alongside ESLint with only your custom rules enabled in ESLint.',
    faq6Q: 'What languages does Biome support?',
    faq6A: 'Biome supports JavaScript, TypeScript, JSX, TSX, JSON, JSONC, CSS, and GraphQL for formatting. Linting is available for JavaScript, TypeScript, JSX, TSX, CSS, and GraphQL. Support for HTML, Markdown, and YAML is planned.',
    faq7Q: 'How do I configure Biome for a monorepo?',
    faq7A: 'Place a biome.json at the repository root with shared settings. Each workspace package can have its own biome.json with an extends property that inherits from the root config. Biome automatically discovers the nearest config file when processing each file.',
    faq8Q: 'Can I use Biome alongside ESLint?',
    faq8A: 'Yes. A common migration strategy is to use Biome for formatting and import sorting while keeping ESLint for framework-specific lint rules (Vue, Angular, Svelte plugins). Disable the formatting and import-related rules in ESLint and let Biome handle those.',
  },
  zh: {
    title: 'Biome 指南 2026：基于 Rust 的高速 JavaScript 和 TypeScript 格式化器与代码检查工具',
    intro: 'Biome（前身为 Rome）是一个用于 JavaScript、TypeScript、JSX、TSX、JSON 和 CSS 的高性能工具链。它使用 Rust 编写，将格式化、代码检查和导入排序合并到一个二进制文件中，运行速度比 ESLint 和 Prettier 组合快 35 倍。Biome 的格式化与 Prettier 97% 兼容，提供超过 280 条 Lint 规则，并且开箱即用无需配置。如果你想用一个快速工具替换整个代码质量管道，Biome 是 2026 年的首选。',
    tldr: 'Biome 是基于 Rust 的一体化工具链，用单个快速二进制文件替代 ESLint、Prettier 和导入排序工具。它提供 97% Prettier 兼容的格式化、280+ 条 Lint 规则、内置导入排序、一流的 TypeScript 支持和零配置默认值。配置存放在 biome.json 中。Biome 比 ESLint+Prettier 快 35 倍，开箱支持 CI/CD 集成，并提供从 ESLint 和 Prettier 的简便迁移路径。',
    keyTakeaway1: 'Biome 使用 Rust 编写，格式化和代码检查的速度比 ESLint + Prettier 快 25-35 倍。',
    keyTakeaway2: '单个 biome.json 文件配置格式化规则、Lint 规则和导入排序，具有合理的默认值。',
    keyTakeaway3: 'Biome 提供 97% Prettier 兼容性，迁移时无需重新格式化整个代码库。',
    keyTakeaway4: '提供超过 280 条 Lint 规则，包括从 ESLint、typescript-eslint 和框架特定插件移植的规则。',
    keyTakeaway5: '内置导入排序替代 eslint-plugin-import 和 trivial-import-sort，无需额外配置。',
    keyTakeaway6: 'biome migrate 命令自动将 ESLint 和 Prettier 配置迁移到 biome.json。',

    h2WhatIs: '什么是 Biome？',
    whatIsDesc: 'Biome 是一个面向 Web 开发的开源工具链，为 JavaScript、TypeScript、JSX、TSX、JSON、CSS 和 GraphQL 提供格式化器、代码检查器和导入组织器。它作为 Rome 项目的延续创建，于 2023 年 8 月发布首个稳定版本（1.0）。该项目由 Biome 核心团队和不断增长的贡献者社区维护。',
    whatIsDesc2: '与传统的 JavaScript 工具栈不同（需要 ESLint 进行代码检查、Prettier 进行格式化、eslint-plugin-import 进行导入排序），Biome 用单个二进制文件处理所有三项工作。这消除了依赖冲突，简化了配置，并大幅减少了执行时间。Biome 只解析一次代码，在单次遍历中运行所有检查。',

    h2WhyFast: '为什么 Biome 如此快速？',
    whyFastDesc: 'Biome 使用 Rust 编写，Rust 是一种以内存安全和零开销抽象著称的系统编程语言。Rust 让 Biome 实现了基于 JavaScript 的工具无法达到的性能。其速度的关键技术原因是：',
    whyFast1: 'Rust 编译二进制：Biome 编译为原生机器码。没有 JavaScript 运行时开销，没有 V8 JIT 预热，执行期间没有垃圾回收暂停。',
    whyFast2: '单次遍历架构：Biome 将每个文件解析一次为具体语法树（CST），在同一棵树上运行格式化、代码检查和导入排序。ESLint + Prettier 使用不同的 AST 解析文件两次。',
    whyFast3: '并行处理：Biome 使用 Rust 线程同时处理多个文件。JavaScript 工具受限于 Node.js 的单线程特性。',
    whyFast4: '零拷贝解析：Biome 解析器在字符串切片上操作而不复制数据，减少了内存分配和缓存未命中。',
    whyFast5: '无插件开销：与 ESLint 每个插件增加访问遍历不同，Biome 规则被编译到二进制文件中，无需动态分发即可执行。',

    h2Install: '安装和入门',
    installDesc: 'Biome 可以作为项目依赖安装或独立使用。推荐方法是作为开发依赖安装，以确保每个团队成员使用相同版本。',

    h2BiomeJson: 'biome.json 配置',
    biomeJsonDesc: 'biome.json 文件是所有 Biome 功能的单一配置文件。它控制格式化设置、Lint 规则、导入排序行为和文件处理。Biome 无需配置即可工作，但 biome.json 让你可以自定义每个方面。',
    biomeJsonDesc2: '运行 biome init 可以生成初始 biome.json。该文件支持带注释的 JSON。配置组织为顶级部分：formatter、linter、organizeImports、javascript、typescript、json 和 css。',

    h2Formatting: '格式化规则和选项',
    formattingDesc: 'Biome 格式化器与 Prettier 输出 97% 兼容。它支持 Prettier 提供的所有格式化选项，包括缩进样式、缩进宽度、行宽、引号样式、分号和尾逗号。格式化器适用于 JavaScript、TypeScript、JSX、TSX、JSON 和 CSS 文件。',
    formattingDesc2: '与 Prettier 不同，Biome 不需要单独的 .prettierrc 文件。所有格式化选项都在 biome.json 的 formatter 和语言特定部分中。如果你要从 Prettier 迁移，Biome 可以自动读取并转换你的 .prettierrc。',

    h2Linting: '代码检查规则',
    lintingDesc: 'Biome 提供超过 280 条 Lint 规则，按组分类。每组专注于特定的代码质量类别。规则可以启用、禁用或设置为警告级别。许多规则包含安全的自动修复。',
    lintGroup1: 'recommended：默认启用的精选规则集，捕获常见 Bug 并强制执行最佳实践。',
    lintGroup2: 'suspicious：检测可能是 Bug 的代码模式，如重复的对象键、与 NaN 的比较或令人困惑的 void 表达式。',
    lintGroup3: 'correctness：捕获确定不正确的代码，如不可达代码、无效的构造函数或非 void 函数中的 void 类型返回。',
    lintGroup4: 'style：强制一致的代码风格，如使用 const 代替 let、模板字面量代替字符串拼接。',
    lintGroup5: 'complexity：标记过于复杂的代码模式，如过度嵌套、过长的参数列表。',
    lintGroup6: 'performance：捕获潜在的性能问题，如循环中的展开累积、强制布局回流。',
    lintGroup7: 'a11y：JSX 的可访问性规则，检查缺失的 alt 属性、无效的 ARIA 角色等 WCAG 违规。',
    lintGroup8: 'security：检测安全问题，如未经清理的 dangerouslySetInnerHTML 使用和开放重定向漏洞。',

    h2ImportSorting: '导入排序',
    importSortingDesc: 'Biome 包含内置的导入排序，替代 eslint-plugin-import-sort 和 trivial-import-sort 等工具。启用后，Biome 自动按照一致的约定分组和排序导入语句。它将外部依赖与内部模块分开，并在每组内按字母排序。',
    importSortingDesc2: '运行 biome check --write 或 biome format --write 时默认启用导入排序。副作用导入（如 "import ./polyfills"）保持在原始位置。',

    h2Migration: '从 ESLint 和 Prettier 迁移',
    migrationDesc: 'Biome 提供专门的 migrate 命令，读取现有的 ESLint 和 Prettier 配置文件并转换为 biome.json 等效配置。这自动化了迁移过程中最繁琐的部分。',
    migrationDesc2: '迁移工具处理 .eslintrc、eslint.config.js（扁平配置）、.prettierrc 和 prettier.config.js 文件。它将 ESLint 规则映射到对应的 Biome 规则，并对没有对应项的规则发出警告。',
    migrationDesc3: '迁移后，你可以从 package.json 中移除 eslint、prettier 及其插件依赖。这通常从依赖树中移除 10-30 个包，简化维护并减少安装时间。',

    h2CICD: 'CI/CD 集成',
    cicdDesc: 'Biome 无缝集成到 CI/CD 管道中。biome ci 命令专为持续集成环境设计。它以检查模式运行格式化器、运行所有启用的 Lint 规则并验证导入排序。任何检查失败时命令以非零退出码退出。',
    cicdDesc2: 'Biome 还提供 GitHub Action（biomejs/setup-biome），为快速 CI 运行安装和缓存 Biome 二进制文件。该 Action 支持版本固定。',

    h2Editor: '编辑器集成',
    editorDesc: 'Biome 为 VS Code、基于 IntelliJ 的 IDE 和 Neovim 提供官方扩展。VS Code 扩展功能最完整，提供实时 Lint 诊断、保存时格式化、快速修复代码操作和导入排序。',
    editorVSCode: '从 VS Code 扩展市场安装 Biome 扩展。然后将以下设置添加到 .vscode/settings.json 中启用保存时格式化。',
    editorNeovim: '对于 Neovim，Biome 支持语言服务协议（LSP）。你可以使用 nvim-lspconfig 或任何 LSP 客户端配置它。',

    h2Comparison: 'Biome 与 ESLint + Prettier 对比',
    comparisonDesc: '了解 Biome 和传统 ESLint + Prettier 之间的权衡有助于你为项目选择正确的工具。',
    compCol1: '功能',
    compCol2: 'Biome',
    compCol3: 'ESLint + Prettier',
    compRow1: '速度',
    compRow1V2: '快 25-35 倍',
    compRow1V3: '基线',
    compRow2: '配置',
    compRow2V2: '单个 biome.json',
    compRow2V3: 'eslint.config.js + .prettierrc',
    compRow3: '依赖',
    compRow3V2: '1 个包',
    compRow3V3: '10-30 个包',
    compRow4: 'Lint 规则',
    compRow4V2: '280+ 内置',
    compRow4V3: '通过插件数千条',
    compRow5: '自定义规则',
    compRow5V2: '不支持（计划中）',
    compRow5V3: '完整的自定义规则 API',
    compRow6: '框架插件',
    compRow6V2: 'React/JSX a11y 内置',
    compRow6V3: 'React、Vue、Angular、Svelte 等',
    compRow7: '导入排序',
    compRow7V2: '内置',
    compRow7V3: '通过插件',
    compRow8: 'CSS/JSON 检查',
    compRow8V2: '内置',
    compRow8V3: '通过单独工具',
    compRow9: 'Prettier 兼容',
    compRow9V2: '97% 兼容',
    compRow9V3: '100%（就是 Prettier）',
    compRow10: 'TypeScript',
    compRow10V2: '内置解析器',
    compRow10V3: '通过 typescript-eslint',
    comparisonSummary: '如果速度、简洁和最少配置是优先事项，且不需要 React 以外的框架插件或自定义规则，选择 Biome。如果需要 Vue/Angular/Svelte 插件、自定义规则或完整的 ESLint 生态，选择 ESLint + Prettier。许多团队在新项目中使用 Biome，在有复杂插件依赖的现有项目中使用 ESLint。',

    h2Advanced: '高级配置',
    advancedDesc: 'Biome 支持 Monorepo、按目录覆盖和语言特定设置的高级配置模式。biome.json 中的 overrides 部分让你可以对不同的文件模式应用不同的规则。',

    h2Monorepo: 'Monorepo 设置',
    monorepoDesc: '在 Monorepo 中，你可以在根目录放置 biome.json 用于共享设置，在包特定的 biome.json 文件中使用 extends 属性继承和覆盖规则。Biome 在处理文件时自动发现最近的 biome.json。',

    h2Performance: '性能基准测试',
    perfDesc: 'Biome 在各种规模的项目基准测试中始终优于 ESLint 和 Prettier。在一个典型的包含 1,000 个 TypeScript 文件的 React 项目中，Biome 在 500ms 内完成格式化和代码检查，而 ESLint + Prettier 需要 10-15 秒。速度优势随项目规模增长而增大。',
    perfDesc2: '在 CI 环境中，Biome 将代码质量检查时间从分钟级缩短到秒级。团队报告迁移到 Biome 后 Lint/格式化 CI 步骤持续时间减少 90-95%。',

    h2BestPractices: '最佳实践',
    bp1: '从推荐规则预设开始定制。默认值经过精心选择，能捕获最重要的问题而不会过于严格。',
    bp2: '从一开始就启用导入排序。它消除导入块中的合并冲突并保持代码库一致。',
    bp3: '在 pre-commit hook 中使用 biome check --write，在每次提交前自动格式化、修复和排序导入。',
    bp4: '在 package.json 中固定 Biome 版本，避免团队成员间的格式化差异。',
    bp5: '在 CI 管道中使用 biome ci 命令。它针对非交互式环境优化。',
    bp6: '配置编辑器扩展保存时格式化，立即捕获问题。',
    bp7: '每次更新时查看 Biome 发布说明。新规则和格式化器改进定期添加。',
    bp8: '使用 overrides 部分为需要宽松规则的测试文件配置，如允许魔法数字或 console 语句。',

    h2Faq: '常见问题',
    faq1Q: '什么是 Biome？它与 Rome 有什么关系？',
    faq1A: 'Biome 是 Rome 项目的社区驱动延续。当 Rome 公司解散时，核心贡献者将项目分叉为 Biome 并实行开放治理。Biome 继承了 Rome 的所有技术并持续积极开发。',
    faq2Q: 'Biome 是 ESLint 和 Prettier 的直接替代品吗？',
    faq2A: '对于许多项目来说，是的。Biome 提供 97% Prettier 兼容的格式化和 280 多条 Lint 规则。但如果你依赖 Vue、Angular、Svelte 的 ESLint 插件或自定义规则，你仍需 ESLint 处理这些特定检查。',
    faq3Q: 'Biome 比 ESLint 快多少？',
    faq3A: 'Biome 通常比 ESLint + Prettier 组合快 25-35 倍。在 1,000 个 TypeScript 文件的项目中，Biome 在 500ms 内完成，而 ESLint + Prettier 需要 10-15 秒。',
    faq4Q: '如何从 ESLint 和 Prettier 迁移到 Biome？',
    faq4A: '运行 biome migrate eslint 转换 ESLint 配置，biome migrate prettier 转换 Prettier 配置。检查生成的 biome.json，运行 biome check 验证，然后移除 ESLint 和 Prettier 依赖。',
    faq5Q: 'Biome 支持自定义 Lint 规则吗？',
    faq5A: 'Biome 目前不支持自定义 Lint 规则或插件 API。插件系统已列入路线图。如需自定义规则，可以在 ESLint 中只启用自定义规则与 Biome 并行使用。',
    faq6Q: 'Biome 支持哪些语言？',
    faq6A: 'Biome 支持 JavaScript、TypeScript、JSX、TSX、JSON、JSONC、CSS 和 GraphQL 的格式化。Lint 可用于 JavaScript、TypeScript、JSX、TSX、CSS 和 GraphQL。HTML、Markdown 和 YAML 支持已列入计划。',
    faq7Q: '如何为 Monorepo 配置 Biome？',
    faq7A: '在仓库根目录放置 biome.json 用于共享设置。每个工作区包可以有自己的 biome.json 并使用 extends 属性继承根配置。Biome 在处理文件时自动发现最近的配置文件。',
    faq8Q: '可以同时使用 Biome 和 ESLint 吗？',
    faq8A: '可以。常见的迁移策略是使用 Biome 处理格式化和导入排序，同时保留 ESLint 处理框架特定的 Lint 规则。在 ESLint 中禁用格式化和导入相关规则，让 Biome 处理这些。',
  },
};

export default function BiomeGuide({ lang }: { lang: string }) {
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
  const cellStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0', textAlign: 'left' };
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, background: '#f1f5f9' };

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

      {/* What Is Biome */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>

      {/* Why Is Biome Fast */}
      <h2 style={sectionTitle}>{t.h2WhyFast}</h2>
      <p style={para}>{t.whyFastDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>Rust compiled binary:</strong> {t.whyFast1.split(': ')[1]}</li>
        <li style={listItem}><strong>Single-pass architecture:</strong> {t.whyFast2.split(': ')[1]}</li>
        <li style={listItem}><strong>Parallel processing:</strong> {t.whyFast3.split(': ')[1]}</li>
        <li style={listItem}><strong>Zero-copy parsing:</strong> {t.whyFast4.split(': ')[1]}</li>
        <li style={listItem}><strong>No plugin overhead:</strong> {t.whyFast5.split(': ')[1]}</li>
      </ul>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Install}</h2>
      <p style={para}>{t.installDesc}</p>
      <pre style={codeBlock}><code>{'# Install as a dev dependency (recommended)\n'
        + 'npm install --save-dev --save-exact @biomejs/biome\n'
        + '\n'
        + '# Or with other package managers\n'
        + 'pnpm add --save-dev --save-exact @biomejs/biome\n'
        + 'yarn add --dev --exact @biomejs/biome\n'
        + 'bun add --dev --exact @biomejs/biome\n'
        + '\n'
        + '# Initialize biome.json\n'
        + 'npx @biomejs/biome init\n'
        + '\n'
        + '# Run formatter\n'
        + 'npx @biomejs/biome format --write ./src\n'
        + '\n'
        + '# Run linter\n'
        + 'npx @biomejs/biome lint ./src\n'
        + '\n'
        + '# Run everything (format + lint + import sorting)\n'
        + 'npx @biomejs/biome check --write ./src'}</code></pre>

      {/* biome.json Configuration */}
      <h2 style={sectionTitle}>{t.h2BiomeJson}</h2>
      <p style={para}>{t.biomeJsonDesc}</p>
      <p style={para}>{t.biomeJsonDesc2}</p>
      <pre style={codeBlock}><code>{'// biome.json - Complete configuration example\n'
        + '{\n'
        + '  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",\n'
        + '\n'
        + '  // Formatter settings\n'
        + '  "formatter": {\n'
        + '    "enabled": true,\n'
        + '    "indentStyle": "space",\n'
        + '    "indentWidth": 2,\n'
        + '    "lineWidth": 100,\n'
        + '    "lineEnding": "lf"\n'
        + '  },\n'
        + '\n'
        + '  // Linter settings\n'
        + '  "linter": {\n'
        + '    "enabled": true,\n'
        + '    "rules": {\n'
        + '      "recommended": true,\n'
        + '      "suspicious": {\n'
        + '        "noExplicitAny": "warn",\n'
        + '        "noDoubleEquals": "error"\n'
        + '      },\n'
        + '      "style": {\n'
        + '        "useConst": "error",\n'
        + '        "noVar": "error",\n'
        + '        "useTemplate": "error"\n'
        + '      },\n'
        + '      "complexity": {\n'
        + '        "noForEach": "warn"\n'
        + '      }\n'
        + '    }\n'
        + '  },\n'
        + '\n'
        + '  // Import sorting\n'
        + '  "organizeImports": {\n'
        + '    "enabled": true\n'
        + '  },\n'
        + '\n'
        + '  // JavaScript-specific options\n'
        + '  "javascript": {\n'
        + '    "formatter": {\n'
        + '      "quoteStyle": "single",\n'
        + '      "trailingCommas": "all",\n'
        + '      "semicolons": "always",\n'
        + '      "arrowParentheses": "always"\n'
        + '    }\n'
        + '  },\n'
        + '\n'
        + '  // Files configuration\n'
        + '  "files": {\n'
        + '    "ignore": [\n'
        + '      "dist/",\n'
        + '      "build/",\n'
        + '      "node_modules/",\n'
        + '      "*.min.js",\n'
        + '      "coverage/"\n'
        + '    ],\n'
        + '    "maxSize": 1048576\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Formatting */}
      <h2 style={sectionTitle}>{t.h2Formatting}</h2>
      <p style={para}>{t.formattingDesc}</p>
      <p style={para}>{t.formattingDesc2}</p>
      <pre style={codeBlock}><code>{'// Formatting options in biome.json\n'
        + '{\n'
        + '  "formatter": {\n'
        + '    "indentStyle": "space",     // "space" | "tab"\n'
        + '    "indentWidth": 2,           // 1-24 (default: 2)\n'
        + '    "lineWidth": 80,            // 1-320 (default: 80)\n'
        + '    "lineEnding": "lf"          // "lf" | "crlf" | "cr"\n'
        + '  },\n'
        + '  "javascript": {\n'
        + '    "formatter": {\n'
        + '      "quoteStyle": "double",   // "double" | "single"\n'
        + '      "jsxQuoteStyle": "double",// "double" | "single"\n'
        + '      "semicolons": "always",   // "always" | "asNeeded"\n'
        + '      "trailingCommas": "all",  // "all" | "es5" | "none"\n'
        + '      "arrowParentheses": "always", // "always" | "asNeeded"\n'
        + '      "bracketSpacing": true,   // true | false\n'
        + '      "bracketSameLine": false  // true | false\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Run formatter in check mode (no writes)\n'
        + '// npx @biomejs/biome format ./src\n'
        + '\n'
        + '// Run formatter and apply changes\n'
        + '// npx @biomejs/biome format --write ./src'}</code></pre>

      {/* Linting */}
      <h2 style={sectionTitle}>{t.h2Linting}</h2>
      <p style={para}>{t.lintingDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>recommended:</strong> {t.lintGroup1.split(': ')[1]}</li>
        <li style={listItem}><strong>suspicious:</strong> {t.lintGroup2.split(': ')[1]}</li>
        <li style={listItem}><strong>correctness:</strong> {t.lintGroup3.split(': ')[1]}</li>
        <li style={listItem}><strong>style:</strong> {t.lintGroup4.split(': ')[1]}</li>
        <li style={listItem}><strong>complexity:</strong> {t.lintGroup5.split(': ')[1]}</li>
        <li style={listItem}><strong>performance:</strong> {t.lintGroup6.split(': ')[1]}</li>
        <li style={listItem}><strong>a11y:</strong> {t.lintGroup7.split(': ')[1]}</li>
        <li style={listItem}><strong>security:</strong> {t.lintGroup8.split(': ')[1]}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Linter configuration examples in biome.json\n'
        + '{\n'
        + '  "linter": {\n'
        + '    "enabled": true,\n'
        + '    "rules": {\n'
        + '      // Enable all recommended rules\n'
        + '      "recommended": true,\n'
        + '\n'
        + '      // Customize individual groups\n'
        + '      "suspicious": {\n'
        + '        "noExplicitAny": "warn",\n'
        + '        "noDoubleEquals": "error",\n'
        + '        "noShadowRestrictedNames": "error",\n'
        + '        "noImplicitAnyLet": "error"\n'
        + '      },\n'
        + '      "correctness": {\n'
        + '        "noUnusedVariables": "error",\n'
        + '        "noUnusedImports": "error",\n'
        + '        "useExhaustiveDependencies": "warn"\n'
        + '      },\n'
        + '      "style": {\n'
        + '        "useConst": "error",\n'
        + '        "noVar": "error",\n'
        + '        "useTemplate": "error",\n'
        + '        "useOptionalChain": "error",\n'
        + '        "useNullishCoalescing": "error"\n'
        + '      },\n'
        + '      "performance": {\n'
        + '        "noAccumulatingSpread": "error",\n'
        + '        "noDelete": "warn"\n'
        + '      },\n'
        + '      "a11y": {\n'
        + '        "useAltText": "error",\n'
        + '        "useAriaPropsForRole": "error",\n'
        + '        "noBlankTarget": "error"\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Run linter\n'
        + '// npx @biomejs/biome lint ./src\n'
        + '\n'
        + '// Run linter and apply safe fixes\n'
        + '// npx @biomejs/biome lint --write ./src\n'
        + '\n'
        + '// Run linter with unsafe fixes (may change semantics)\n'
        + '// npx @biomejs/biome lint --write --unsafe ./src'}</code></pre>

      {/* Import Sorting */}
      <h2 style={sectionTitle}>{t.h2ImportSorting}</h2>
      <p style={para}>{t.importSortingDesc}</p>
      <p style={para}>{t.importSortingDesc2}</p>
      <pre style={codeBlock}><code>{'// Before: unsorted imports\n'
        + 'import { useState, useEffect } from "react";\n'
        + 'import "./styles.css";\n'
        + 'import { Button } from "@/components/Button";\n'
        + 'import axios from "axios";\n'
        + 'import { z } from "zod";\n'
        + 'import { formatDate } from "@/utils/date";\n'
        + 'import React from "react";\n'
        + '\n'
        + '// After: Biome-sorted imports\n'
        + 'import React, { useEffect, useState } from "react";\n'
        + 'import axios from "axios";\n'
        + 'import { z } from "zod";\n'
        + '\n'
        + 'import { Button } from "@/components/Button";\n'
        + 'import { formatDate } from "@/utils/date";\n'
        + '\n'
        + 'import "./styles.css";\n'
        + '\n'
        + '// biome.json import sorting config\n'
        + '// {\n'
        + '//   "organizeImports": {\n'
        + '//     "enabled": true\n'
        + '//   }\n'
        + '// }'}</code></pre>

      {/* Migration from ESLint/Prettier */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <p style={para}>{t.migrationDesc2}</p>
      <p style={para}>{t.migrationDesc3}</p>
      <pre style={codeBlock}><code>{'# Step 1: Install Biome\n'
        + 'npm install --save-dev --save-exact @biomejs/biome\n'
        + '\n'
        + '# Step 2: Migrate ESLint config to biome.json\n'
        + 'npx @biomejs/biome migrate eslint\n'
        + '# Reads .eslintrc.json / eslint.config.js and updates biome.json\n'
        + '\n'
        + '# Step 3: Migrate Prettier config to biome.json\n'
        + 'npx @biomejs/biome migrate prettier\n'
        + '# Reads .prettierrc and updates biome.json formatter section\n'
        + '\n'
        + '# Step 4: Verify no regressions\n'
        + 'npx @biomejs/biome check ./src\n'
        + '\n'
        + '# Step 5: Apply formatting with Biome\n'
        + 'npx @biomejs/biome check --write ./src\n'
        + '\n'
        + '# Step 6: Remove old dependencies\n'
        + 'npm uninstall eslint prettier eslint-config-prettier \\\n'
        + '  eslint-plugin-react eslint-plugin-react-hooks \\\n'
        + '  @typescript-eslint/parser @typescript-eslint/eslint-plugin \\\n'
        + '  eslint-plugin-import\n'
        + '\n'
        + '# Step 7: Update package.json scripts\n'
        + '# Replace:\n'
        + '#   "lint": "eslint . && prettier --check ."\n'
        + '# With:\n'
        + '#   "lint": "biome check ./src",\n'
        + '#   "lint:fix": "biome check --write ./src"\n'
        + '\n'
        + '# Step 8: Delete old config files\n'
        + '# rm .eslintrc.json .prettierrc .eslintignore .prettierignore'}</code></pre>

      {/* CI/CD Integration */}
      <h2 style={sectionTitle}>{t.h2CICD}</h2>
      <p style={para}>{t.cicdDesc}</p>
      <p style={para}>{t.cicdDesc2}</p>
      <pre style={codeBlock}><code>{'# GitHub Actions workflow (.github/workflows/ci.yml)\n'
        + 'name: CI\n'
        + 'on: [push, pull_request]\n'
        + '\n'
        + 'jobs:\n'
        + '  biome:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '\n'
        + '      - name: Setup Biome\n'
        + '        uses: biomejs/setup-biome@v2\n'
        + '        with:\n'
        + '          version: latest\n'
        + '\n'
        + '      - name: Run Biome checks\n'
        + '        run: biome ci ./src\n'
        + '\n'
        + '# Or using npm in your CI pipeline:\n'
        + '# npx @biomejs/biome ci ./src\n'
        + '#\n'
        + '# biome ci exits with code 1 if any check fails:\n'
        + '#   - Formatting violations\n'
        + '#   - Lint errors\n'
        + '#   - Unsorted imports'}</code></pre>

      <h3 style={subTitle}>Pre-commit Hook</h3>
      <pre style={codeBlock}><code>{'# Using Husky + lint-staged for pre-commit\n'
        + '# package.json\n'
        + '{\n'
        + '  "lint-staged": {\n'
        + '    "*.{js,ts,jsx,tsx,json,css}": [\n'
        + '      "biome check --write --no-errors-on-unmatched"\n'
        + '    ]\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '# Or using lefthook (lefthook.yml)\n'
        + 'pre-commit:\n'
        + '  commands:\n'
        + '    biome:\n'
        + '      glob: "*.{js,ts,jsx,tsx,json,css}"\n'
        + '      run: npx @biomejs/biome check --write --no-errors-on-unmatched --staged {staged_files}'}</code></pre>

      {/* Editor Integration */}
      <h2 style={sectionTitle}>{t.h2Editor}</h2>
      <p style={para}>{t.editorDesc}</p>

      <h3 style={subTitle}>VS Code</h3>
      <p style={para}>{t.editorVSCode}</p>
      <pre style={codeBlock}><code>{'// .vscode/settings.json\n'
        + '{\n'
        + '  // Set Biome as default formatter\n'
        + '  "editor.defaultFormatter": "biomejs.biome",\n'
        + '\n'
        + '  // Format on save\n'
        + '  "editor.formatOnSave": true,\n'
        + '\n'
        + '  // Enable code actions on save\n'
        + '  "editor.codeActionsOnSave": {\n'
        + '    "quickfix.biome": "explicit",\n'
        + '    "source.organizeImports.biome": "explicit"\n'
        + '  },\n'
        + '\n'
        + '  // Language-specific overrides\n'
        + '  "[javascript]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  },\n'
        + '  "[typescript]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  },\n'
        + '  "[typescriptreact]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  },\n'
        + '  "[json]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  },\n'
        + '  "[jsonc]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  },\n'
        + '  "[css]": {\n'
        + '    "editor.defaultFormatter": "biomejs.biome"\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>Neovim</h3>
      <p style={para}>{t.editorNeovim}</p>
      <pre style={codeBlock}><code>{'-- Neovim LSP config for Biome (nvim-lspconfig)\n'
        + 'require("lspconfig").biome.setup({\n'
        + '  cmd = { "npx", "@biomejs/biome", "lsp-proxy" },\n'
        + '  root_dir = require("lspconfig.util").root_pattern("biome.json"),\n'
        + '  single_file_support = false,\n'
        + '})\n'
        + '\n'
        + '-- Format on save with Biome\n'
        + 'vim.api.nvim_create_autocmd("BufWritePre", {\n'
        + '  pattern = { "*.js", "*.ts", "*.jsx", "*.tsx", "*.json", "*.css" },\n'
        + '  callback = function()\n'
        + '    vim.lsp.buf.format({ async = false })\n'
        + '  end,\n'
        + '})'}</code></pre>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compCol1}</th>
              <th style={headerCell}>{t.compCol2}</th>
              <th style={headerCell}>{t.compCol3}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compRow1, t.compRow1V2, t.compRow1V3],
              [t.compRow2, t.compRow2V2, t.compRow2V3],
              [t.compRow3, t.compRow3V2, t.compRow3V3],
              [t.compRow4, t.compRow4V2, t.compRow4V3],
              [t.compRow5, t.compRow5V2, t.compRow5V3],
              [t.compRow6, t.compRow6V2, t.compRow6V3],
              [t.compRow7, t.compRow7V2, t.compRow7V3],
              [t.compRow8, t.compRow8V2, t.compRow8V3],
              [t.compRow9, t.compRow9V2, t.compRow9V3],
              [t.compRow10, t.compRow10V2, t.compRow10V3],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={cellStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={para}>{t.comparisonSummary}</p>

      {/* Advanced Configuration */}
      <h2 style={sectionTitle}>{t.h2Advanced}</h2>
      <p style={para}>{t.advancedDesc}</p>
      <pre style={codeBlock}><code>{'// biome.json - Advanced overrides\n'
        + '{\n'
        + '  "linter": {\n'
        + '    "rules": {\n'
        + '      "recommended": true\n'
        + '    }\n'
        + '  },\n'
        + '\n'
        + '  "overrides": [\n'
        + '    {\n'
        + '      // Relax rules for test files\n'
        + '      "include": ["**/*.test.ts", "**/*.spec.ts", "**/*.test.tsx"],\n'
        + '      "linter": {\n'
        + '        "rules": {\n'
        + '          "suspicious": {\n'
        + '            "noExplicitAny": "off"\n'
        + '          },\n'
        + '          "complexity": {\n'
        + '            "noForEach": "off"\n'
        + '          }\n'
        + '        }\n'
        + '      }\n'
        + '    },\n'
        + '    {\n'
        + '      // Different formatting for JSON config files\n'
        + '      "include": ["*.json"],\n'
        + '      "formatter": {\n'
        + '        "indentWidth": 4\n'
        + '      }\n'
        + '    },\n'
        + '    {\n'
        + '      // Disable formatting for generated files\n'
        + '      "include": ["src/generated/**"],\n'
        + '      "formatter": { "enabled": false },\n'
        + '      "linter": { "enabled": false }\n'
        + '    }\n'
        + '  ]\n'
        + '}'}</code></pre>

      {/* Monorepo */}
      <h2 style={sectionTitle}>{t.h2Monorepo}</h2>
      <p style={para}>{t.monorepoDesc}</p>
      <pre style={codeBlock}><code>{'// Root biome.json (shared settings)\n'
        + '{\n'
        + '  "formatter": {\n'
        + '    "indentStyle": "space",\n'
        + '    "indentWidth": 2,\n'
        + '    "lineWidth": 100\n'
        + '  },\n'
        + '  "linter": {\n'
        + '    "rules": {\n'
        + '      "recommended": true\n'
        + '    }\n'
        + '  },\n'
        + '  "organizeImports": { "enabled": true }\n'
        + '}\n'
        + '\n'
        + '// packages/frontend/biome.json\n'
        + '{\n'
        + '  "extends": ["../../biome.json"],\n'
        + '  "linter": {\n'
        + '    "rules": {\n'
        + '      "a11y": {\n'
        + '        "useAltText": "error",\n'
        + '        "useAriaPropsForRole": "error"\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// packages/api/biome.json\n'
        + '{\n'
        + '  "extends": ["../../biome.json"],\n'
        + '  "linter": {\n'
        + '    "rules": {\n'
        + '      "a11y": {\n'
        + '        "recommended": false\n'
        + '      }\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
      <p style={para}>{t.perfDesc2}</p>
      <pre style={codeBlock}><code>{'# Benchmark: 1,000 TypeScript files (React project)\n'
        + '#\n'
        + '# Tool                    Time         Files/sec\n'
        + '# ----                    ----         ---------\n'
        + '# Biome (format+lint)     0.45s        2,222\n'
        + '# Prettier (format)       4.2s         238\n'
        + '# ESLint (lint)           8.7s         115\n'
        + '# ESLint+Prettier         12.9s        78\n'
        + '#\n'
        + '# Speedup: Biome is ~29x faster than ESLint+Prettier\n'
        + '#\n'
        + '# CI impact (real-world monorepo, 5,000 files):\n'
        + '#   Before (ESLint+Prettier): 47s\n'
        + '#   After (Biome):            1.8s\n'
        + '#   Reduction:                96%'}</code></pre>

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
      </ul>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A],
        [t.faq2Q, t.faq2A],
        [t.faq3Q, t.faq3A],
        [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A],
        [t.faq6Q, t.faq6A],
        [t.faq7Q, t.faq7A],
        [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={subTitle}>{q}</h3>
          <p style={para}>{a}</p>
        </div>
      ))}
    </article>
  );
}
