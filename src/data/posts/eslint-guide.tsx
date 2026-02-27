'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'ESLint 9 Guide 2026: Flat Config, TypeScript, and Modern JavaScript Linting',
    intro: 'ESLint is the most widely used static analysis tool for JavaScript and TypeScript. It identifies problematic patterns, enforces coding conventions, and catches bugs before they reach production. With the release of ESLint 9 and the new flat config system, the tool has undergone its most significant architectural change since its creation. Whether you are building a small script or maintaining a large monorepo, ESLint helps your team write consistent, high-quality code across every file.',
    tldr: 'ESLint 9 introduces flat config (eslint.config.js) replacing the legacy .eslintrc format. It provides native TypeScript-ESLint support, framework-specific plugins for React/Vue/Angular, custom rule authoring, shareable configs, auto-fix capabilities, and deep IDE integration. Flat config uses JavaScript modules for full programmatic control, simplifies config merging, and eliminates the confusing extends/overrides cascade.',
    keyTakeaway1: 'ESLint 9 flat config (eslint.config.js) replaces .eslintrc with a simpler, more predictable JavaScript-based configuration system.',
    keyTakeaway2: 'TypeScript-ESLint provides type-aware linting rules that catch errors the TypeScript compiler alone cannot detect.',
    keyTakeaway3: 'ESLint auto-fix can automatically correct many issues including formatting, import sorting, and code style violations.',
    keyTakeaway4: 'Framework plugins (React, Vue, Angular) add component-specific rules for hooks, template syntax, and lifecycle patterns.',
    keyTakeaway5: 'Shareable configs like eslint-config-airbnb and @antfu/eslint-config let teams adopt battle-tested rule sets instantly.',
    keyTakeaway6: 'ESLint handles linting while Prettier handles formatting. Biome offers both in a single faster tool but with a smaller plugin ecosystem.',

    h2WhatIs: 'What Is ESLint 9 and Flat Config?',
    whatIsDesc: 'ESLint is a pluggable static analysis tool for JavaScript and TypeScript that parses your source code into an abstract syntax tree (AST) and runs a set of rules against it. Each rule can report warnings or errors when it detects code patterns you want to avoid. ESLint 9, released in 2024, is the current major version and introduces flat config as the default configuration format.',
    whatIsDesc2: 'Flat config replaces the legacy .eslintrc (JSON/YAML/JS) format with a single eslint.config.js (or .mjs/.cjs/.ts) file that exports an array of config objects. Each object specifies which files it applies to, which rules to enable, and which plugins to load. Config objects are merged in order from top to bottom, making the resolution logic transparent and predictable.',

    h2Comparison: 'ESLint vs Prettier vs Biome',
    comparisonDesc: 'Understanding how ESLint relates to Prettier and Biome helps you choose the right tool combination for your project. Here is a comparison of their core capabilities:',
    compCol1: 'Feature',
    compCol2: 'ESLint',
    compCol3: 'Prettier',
    compCol4: 'Biome',
    compRow1: 'Code quality rules',
    compRow1V2: 'Yes (hundreds)',
    compRow1V3: 'No',
    compRow1V4: 'Yes (growing)',
    compRow2: 'Code formatting',
    compRow2V2: 'Limited (via rules)',
    compRow2V3: 'Yes (opinionated)',
    compRow2V4: 'Yes (Prettier-compatible)',
    compRow3: 'TypeScript support',
    compRow3V2: 'Via typescript-eslint',
    compRow3V3: 'Built-in parsing',
    compRow3V4: 'Built-in',
    compRow4: 'Custom rules',
    compRow4V2: 'Yes (large ecosystem)',
    compRow4V3: 'No',
    compRow4V4: 'Limited',
    compRow5: 'Speed',
    compRow5V2: 'Moderate',
    compRow5V3: 'Fast',
    compRow5V4: 'Very fast (Rust)',
    compRow6: 'Plugin ecosystem',
    compRow6V2: 'Largest',
    compRow6V3: 'Minimal',
    compRow6V4: 'Small but growing',
    compRow7: 'Framework plugins',
    compRow7V2: 'React, Vue, Angular, Svelte',
    compRow7V3: 'N/A',
    compRow7V4: 'React (partial)',
    comparisonSummary: 'The most common setup in 2026 is ESLint for code quality plus Prettier for formatting. Biome is an excellent all-in-one alternative if your project does not rely on framework-specific ESLint plugins.',

    h2FlatConfig: 'Setting Up Flat Config (eslint.config.js)',
    flatConfigDesc: 'Flat config is the default and only supported format in ESLint 9. The configuration file exports an array of config objects. Each object can specify files (glob patterns to include), ignores (glob patterns to exclude), plugins, rules, languageOptions, and settings.',
    flatConfigDesc2: 'Unlike the legacy format, there is no extends keyword. You import configs as JavaScript modules and spread them into your array. This eliminates the confusing cascade of extends, overrides, and env that plagued .eslintrc.',

    h2Rules: 'Rules and Severity Levels',
    rulesDesc: 'Every ESLint rule has a severity level that determines how violations are reported. Understanding these levels is essential for configuring your project effectively.',
    ruleOff: '"off" (or 0) - Disables the rule entirely. The rule is not run during linting.',
    ruleWarn: '"warn" (or 1) - Reports violations as warnings. The lint process exits successfully. Use this for rules you are migrating toward.',
    ruleError: '"error" (or 2) - Reports violations as errors. The lint process exits with a non-zero code. Use this for rules that must be enforced.',
    rulesDesc2: 'Rules can also accept configuration options as an array. The first element is the severity and subsequent elements are rule-specific settings. For example, ["error", "always"] enables a rule at error level with the "always" option.',

    h2TypeScript: 'TypeScript-ESLint Integration',
    tsDesc: 'TypeScript-ESLint is the official tooling that enables ESLint to lint TypeScript files. It provides a TypeScript parser for ESLint, a set of TypeScript-specific rules, and type-aware rules that leverage the TypeScript compiler API for deeper analysis.',
    tsDesc2: 'Type-aware rules are the most powerful feature of TypeScript-ESLint. They use the full TypeScript type system to detect issues that neither the TypeScript compiler nor basic lint rules can catch, such as floating promises, unsafe any usage, and incorrect type assertions.',

    h2Frameworks: 'React, Vue, and Angular Plugins',
    frameworksDesc: 'ESLint has dedicated plugins for every major frontend framework. These plugins add rules that understand framework-specific patterns like React hooks, Vue template syntax, and Angular dependency injection.',
    h3React: 'React and JSX',
    reactDesc: 'The eslint-plugin-react and eslint-plugin-react-hooks packages provide rules for React components and hooks. The hooks plugin enforces the Rules of Hooks, which is critical for avoiding subtle bugs in function components.',
    h3Vue: 'Vue.js',
    vueDesc: 'The eslint-plugin-vue package provides rules for Vue single-file components. It parses the template, script, and style sections and enforces Vue-specific conventions.',
    h3Angular: 'Angular',
    angularDesc: 'The @angular-eslint packages replaced TSLint as the official linting solution for Angular projects. They provide rules for component decorators, dependency injection, template syntax, and lifecycle hooks.',

    h2CustomRules: 'Writing Custom Rules',
    customRulesDesc: 'ESLint rules are functions that receive an AST node and a context object. The context provides methods to report problems and access settings. Custom rules let you enforce project-specific conventions that no existing rule covers.',
    customRulesDesc2: 'Each rule exports a meta object (with type, docs, schema, messages) and a create function that returns an object mapping AST node types to handler functions. When ESLint traverses the AST and encounters a matching node type, it calls your handler.',

    h2ShareableConfigs: 'Shareable Configs',
    shareableDesc: 'Shareable configs are npm packages that export ESLint configuration arrays. They let teams adopt curated rule sets without manually configuring hundreds of rules. In flat config, you simply import and spread them into your config array.',
    shareableDesc2: 'Popular shareable configs in 2026 include @eslint/js (official recommended rules), typescript-eslint configs (strict, recommended, stylistic), @antfu/eslint-config (opinionated all-in-one), and eslint-config-airbnb (widely adopted style guide).',

    h2Ignoring: 'Ignoring Files and Directories',
    ignoringDesc: 'In flat config, you ignore files using the ignores property in a config object. A config object with only ignores acts as a global ignore pattern, similar to the old .eslintignore file. You can also combine ignores with files to exclude specific patterns from a config block.',

    h2CLI: 'CLI Usage and Common Commands',
    cliDesc: 'The ESLint CLI provides commands for linting, fixing, caching, and debugging configuration. Here are the most commonly used commands and flags for daily development workflows.',

    h2IDE: 'IDE Integration (VS Code)',
    ideDesc: 'The ESLint VS Code extension provides real-time linting feedback as you type. It shows errors and warnings inline, offers quick-fix actions, and can auto-fix on save. For flat config, the extension works automatically with no additional configuration.',
    ideDesc2: 'Add these settings to your VS Code settings.json for the best experience with ESLint auto-fix on save and format-on-save integration with Prettier.',

    h2AutoFix: 'Auto-Fix and Formatting',
    autoFixDesc: 'ESLint can automatically fix many rule violations using the --fix flag. Fixable rules include import sorting, unused disable directives, spacing issues, and code style patterns. Not all rules are fixable since some require human judgment to resolve.',
    autoFixDesc2: 'When using ESLint with Prettier, configure eslint-config-prettier to turn off ESLint rules that conflict with Prettier formatting. Then run Prettier for formatting and ESLint for code quality in your CI pipeline.',

    h2Migration: 'Migrating from .eslintrc to Flat Config',
    migrationDesc: 'ESLint provides a migration tool and compatibility utilities to help teams transition from the legacy .eslintrc format to flat config. The @eslint/eslintrc package provides a FlatCompat class that wraps legacy configs for use in flat config files.',
    migrationDesc2: 'For a clean migration, start by running the ESLint config migration tool, then gradually replace FlatCompat wrappers with native flat config equivalents as plugins release flat-config-compatible versions.',

    h2Monorepo: 'Monorepo Configuration',
    monorepoDesc: 'In a monorepo, you typically have a root eslint.config.js that defines shared rules, plus package-specific overrides. Flat config makes this straightforward because you can import and compose config arrays from different packages.',
    monorepoDesc2: 'Each workspace package can export its own config fragment that the root config imports and merges. This keeps framework-specific rules (React for the frontend, Node for the backend) in the packages that need them.',

    h2Performance: 'Performance Optimization',
    perfDesc: 'ESLint can be slow on large codebases, especially with type-aware TypeScript rules. Several techniques can dramatically reduce lint times.',
    bp1: 'Enable the --cache flag to skip re-linting unchanged files. The cache file stores lint results and file hashes.',
    bp2: 'Use project references with typescript-eslint to limit the type-checking scope for each package in a monorepo.',
    bp3: 'Exclude generated files, build output, and node_modules using global ignores in your config.',
    bp4: 'Disable type-aware rules for test files if the performance cost outweighs the benefit.',
    bp5: 'Use eslint-plugin-import with the resolver cache enabled to avoid redundant module resolution.',
    bp6: 'Run ESLint in parallel across workspaces using tools like turbo lint or nx lint.',
    bp7: 'Pin specific rule sets rather than using "all" configs that enable every available rule.',
    bp8: 'Profile slow rules with TIMING=1 npx eslint to identify and disable expensive rules in development.',

    h2BestPractices: 'Best Practices',
    bestPracticesDesc: 'Follow these recommendations to get the most value from ESLint in your project.',
    bestP1: 'Start with a recommended config (eslint/js recommended + typescript-eslint strict) and customize from there rather than building from scratch.',
    bestP2: 'Treat ESLint errors as CI blockers. Warnings should be temporary and tracked with a plan to promote them to errors.',
    bestP3: 'Use ESLint for code quality and Prettier for formatting. Do not use ESLint formatting rules when Prettier is configured.',
    bestP4: 'Keep your flat config file organized with comments separating base rules, TypeScript rules, framework rules, and test overrides.',
    bestP5: 'Pin your ESLint and plugin versions. Major version upgrades can change rule behavior and break CI.',
    bestP6: 'Use eslint-disable comments sparingly. Each one should include a reason explaining why the rule is disabled.',
    bestP7: 'Configure your editor to auto-fix on save. This catches issues immediately and reduces CI failures.',
    bestP8: 'Run ESLint in your CI pipeline with --max-warnings 0 to prevent warning accumulation.',
    bestP9: 'Review new ESLint rules with each major release and adopt rules that match your team conventions.',
    bestP10: 'Document any custom rules or non-obvious config choices in your project README or a dedicated linting guide.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is ESLint flat config?',
    faq1A: 'Flat config is the new configuration format introduced in ESLint 9. It uses a single eslint.config.js file that exports an array of config objects. Each object specifies files, plugins, rules, and language options. Configs are merged top-to-bottom, replacing the complex extends/overrides cascade of the legacy .eslintrc format.',
    faq2Q: 'How do I use ESLint with TypeScript?',
    faq2A: 'Install typescript-eslint and configure it in your eslint.config.js. The tseslint.config() helper provides recommended and strict rule presets. For type-aware rules, provide your tsconfig.json path in languageOptions.parserOptions.project. Type-aware rules use the TypeScript compiler API for deeper analysis.',
    faq3Q: 'Should I use ESLint or Prettier?',
    faq3A: 'Use both. ESLint handles code quality rules (no-unused-vars, no-implicit-coercion, prefer-const) while Prettier handles formatting (indentation, line length, quotes). Install eslint-config-prettier to disable ESLint formatting rules that conflict with Prettier.',
    faq4Q: 'How do I migrate from .eslintrc to flat config?',
    faq4A: 'Run npx @eslint/migrate-config .eslintrc.json to generate a flat config file. The tool wraps legacy plugins using the FlatCompat utility from @eslint/eslintrc. Gradually replace FlatCompat wrappers with native flat config imports as plugins add flat config support.',
    faq5Q: 'What is the difference between ESLint and Biome?',
    faq5A: 'ESLint is a JavaScript-based linter with the largest plugin ecosystem, supporting every major framework. Biome is a Rust-based toolchain that combines linting and formatting in one fast binary. Biome is significantly faster but has fewer rules and limited framework plugin support compared to ESLint.',
    faq6Q: 'How do I auto-fix ESLint errors?',
    faq6A: 'Run eslint --fix to automatically fix all fixable violations. In VS Code, enable "editor.codeActionsOnSave" with "source.fixAll.eslint" to auto-fix on every save. Not all rules are fixable. Rules that require human judgment report errors without providing an automatic fix.',
    faq7Q: 'How do I configure ESLint for a monorepo?',
    faq7A: 'Place a root eslint.config.js with shared rules and use the files property to apply package-specific overrides. Each config object can target specific directories like "packages/frontend/**/*.tsx" for React rules or "packages/api/**/*.ts" for Node rules. Tools like Turborepo and Nx can run ESLint in parallel across workspaces.',
    faq8Q: 'How do I improve ESLint performance?',
    faq8A: 'Enable caching with --cache to skip unchanged files. Exclude generated files and build output with global ignores. Limit type-aware rules to source files (not tests). Use TIMING=1 to profile slow rules. In monorepos, use project references to limit the TypeScript type-checking scope per package.',
  },
  zh: {
    title: 'ESLint 9 指南 2026：扁平配置、TypeScript 与现代 JavaScript 代码检查',
    intro: 'ESLint 是 JavaScript 和 TypeScript 领域最广泛使用的静态分析工具。它能识别有问题的代码模式、强制执行编码规范，并在代码进入生产环境之前发现 Bug。随着 ESLint 9 和全新扁平配置系统的发布，该工具经历了自创建以来最重大的架构变革。无论你是在编写小型脚本还是维护大型 Monorepo，ESLint 都能帮助团队在每个文件中编写一致、高质量的代码。',
    tldr: 'ESLint 9 引入了扁平配置（eslint.config.js）取代旧的 .eslintrc 格式。它提供原生 TypeScript-ESLint 支持、React/Vue/Angular 框架插件、自定义规则编写、可共享配置、自动修复功能和深度 IDE 集成。扁平配置使用 JavaScript 模块实现完全的编程控制，简化了配置合并，消除了令人困惑的 extends/overrides 级联。',
    keyTakeaway1: 'ESLint 9 扁平配置（eslint.config.js）用更简单、更可预测的基于 JavaScript 的配置系统取代了 .eslintrc。',
    keyTakeaway2: 'TypeScript-ESLint 提供类型感知的 Lint 规则，能捕获 TypeScript 编译器无法检测到的错误。',
    keyTakeaway3: 'ESLint 自动修复可以自动纠正许多问题，包括格式化、导入排序和代码风格违规。',
    keyTakeaway4: '框架插件（React、Vue、Angular）为 Hooks、模板语法和生命周期模式添加组件特定规则。',
    keyTakeaway5: '可共享配置让团队能够立即采用经过实战检验的规则集。',
    keyTakeaway6: 'ESLint 负责代码检查，Prettier 负责格式化。Biome 提供一体化方案但插件生态较小。',

    h2WhatIs: '什么是 ESLint 9 和扁平配置？',
    whatIsDesc: 'ESLint 是一个可插拔的 JavaScript 和 TypeScript 静态分析工具，它将源代码解析为抽象语法树（AST），然后运行一组规则进行检查。ESLint 9 是当前的主要版本，引入了扁平配置作为默认配置格式。',
    whatIsDesc2: '扁平配置用单个 eslint.config.js 文件取代了旧的 .eslintrc 格式，导出一个配置对象数组。每个对象指定适用的文件、启用的规则和加载的插件。配置对象从上到下合并，使解析逻辑透明且可预测。',

    h2Comparison: 'ESLint vs Prettier vs Biome',
    comparisonDesc: '了解 ESLint 与 Prettier 和 Biome 的关系有助于为项目选择正确的工具组合。以下是它们核心能力的对比：',
    compCol1: '功能',
    compCol2: 'ESLint',
    compCol3: 'Prettier',
    compCol4: 'Biome',
    compRow1: '代码质量规则',
    compRow1V2: '是（数百条）',
    compRow1V3: '否',
    compRow1V4: '是（不断增长）',
    compRow2: '代码格式化',
    compRow2V2: '有限（通过规则）',
    compRow2V3: '是（固执己见）',
    compRow2V4: '是（Prettier 兼容）',
    compRow3: 'TypeScript 支持',
    compRow3V2: '通过 typescript-eslint',
    compRow3V3: '内置解析',
    compRow3V4: '内置',
    compRow4: '自定义规则',
    compRow4V2: '是（庞大生态）',
    compRow4V3: '否',
    compRow4V4: '有限',
    compRow5: '速度',
    compRow5V2: '中等',
    compRow5V3: '快',
    compRow5V4: '非常快（Rust）',
    compRow6: '插件生态',
    compRow6V2: '最大',
    compRow6V3: '极少',
    compRow6V4: '小但在增长',
    compRow7: '框架插件',
    compRow7V2: 'React、Vue、Angular、Svelte',
    compRow7V3: '不适用',
    compRow7V4: 'React（部分）',
    comparisonSummary: '2026 年最常见的配置是 ESLint 负责代码质量加上 Prettier 负责格式化。如果项目不依赖框架特定的 ESLint 插件，Biome 是一个优秀的一体化替代方案。',

    h2FlatConfig: '设置扁平配置（eslint.config.js）',
    flatConfigDesc: '扁平配置是 ESLint 9 中唯一支持的格式。配置文件导出一个配置对象数组。每个对象可以指定 files、ignores、plugins、rules、languageOptions 和 settings。',
    flatConfigDesc2: '与旧格式不同，没有 extends 关键字。你将配置作为 JavaScript 模块导入并展开到数组中，消除了 .eslintrc 中令人困惑的 extends、overrides 和 env 级联。',

    h2Rules: '规则和严重性级别',
    rulesDesc: '每条 ESLint 规则都有一个严重性级别来决定如何报告违规。理解这些级别对于有效配置项目至关重要。',
    ruleOff: '"off"（或 0）- 完全禁用规则。Lint 过程中不运行该规则。',
    ruleWarn: '"warn"（或 1）- 将违规报告为警告。Lint 过程成功退出。用于正在迁移的规则。',
    ruleError: '"error"（或 2）- 将违规报告为错误。Lint 过程以非零代码退出。用于必须强制执行的规则。',
    rulesDesc2: '规则还可以接受配置选项数组。第一个元素是严重性，后续元素是规则特定设置。',

    h2TypeScript: 'TypeScript-ESLint 集成',
    tsDesc: 'TypeScript-ESLint 是使 ESLint 能够检查 TypeScript 文件的官方工具。它提供 TypeScript 解析器、TypeScript 特定规则集和利用 TypeScript 编译器 API 进行更深层分析的类型感知规则。',
    tsDesc2: '类型感知规则是 TypeScript-ESLint 最强大的功能。它们使用完整的 TypeScript 类型系统检测 TypeScript 编译器和基本 Lint 规则无法捕获的问题。',

    h2Frameworks: 'React、Vue 和 Angular 插件',
    frameworksDesc: 'ESLint 为每个主要前端框架都有专门的插件。这些插件添加了理解框架特定模式的规则。',
    h3React: 'React 和 JSX',
    reactDesc: 'eslint-plugin-react 和 eslint-plugin-react-hooks 包为 React 组件和 Hooks 提供规则。Hooks 插件强制执行 Hooks 规则，这对避免函数组件中的微妙 Bug 至关重要。',
    h3Vue: 'Vue.js',
    vueDesc: 'eslint-plugin-vue 包为 Vue 单文件组件提供规则。它解析 template、script 和 style 部分并强制执行 Vue 特定约定。',
    h3Angular: 'Angular',
    angularDesc: '@angular-eslint 包取代 TSLint 成为 Angular 项目的官方 Lint 解决方案。它们为组件装饰器、依赖注入、模板语法和生命周期钩子提供规则。',

    h2CustomRules: '编写自定义规则',
    customRulesDesc: 'ESLint 规则是接收 AST 节点和上下文对象的函数。上下文提供报告问题和访问设置的方法。自定义规则让你可以强制执行现有规则未涵盖的项目特定约定。',
    customRulesDesc2: '每条规则导出一个 meta 对象和一个 create 函数，create 返回一个将 AST 节点类型映射到处理函数的对象。',

    h2ShareableConfigs: '可共享配置',
    shareableDesc: '可共享配置是导出 ESLint 配置数组的 npm 包。它们让团队无需手动配置数百条规则就能采用精选的规则集。',
    shareableDesc2: '2026 年流行的可共享配置包括 @eslint/js、typescript-eslint 配置、@antfu/eslint-config 和 eslint-config-airbnb。',

    h2Ignoring: '忽略文件和目录',
    ignoringDesc: '在扁平配置中，使用配置对象的 ignores 属性来忽略文件。仅包含 ignores 的配置对象充当全局忽略模式，类似于旧的 .eslintignore 文件。',

    h2CLI: 'CLI 使用和常用命令',
    cliDesc: 'ESLint CLI 提供用于检查、修复、缓存和调试配置的命令。以下是日常开发中最常用的命令和标志。',

    h2IDE: 'IDE 集成（VS Code）',
    ideDesc: 'ESLint VS Code 扩展在你输入时提供实时 Lint 反馈。它内联显示错误和警告，提供快速修复操作，并可在保存时自动修复。',
    ideDesc2: '将以下设置添加到 VS Code settings.json 中，以获得 ESLint 保存时自动修复和 Prettier 格式化的最佳体验。',

    h2AutoFix: '自动修复和格式化',
    autoFixDesc: 'ESLint 可以使用 --fix 标志自动修复许多规则违规。可修复的规则包括导入排序、未使用的禁用指令、间距问题和代码风格模式。',
    autoFixDesc2: '将 ESLint 与 Prettier 配合使用时，配置 eslint-config-prettier 关闭与 Prettier 格式化冲突的 ESLint 规则。',

    h2Migration: '从 .eslintrc 迁移到扁平配置',
    migrationDesc: 'ESLint 提供迁移工具和兼容性工具帮助团队从旧的 .eslintrc 格式过渡到扁平配置。@eslint/eslintrc 包提供 FlatCompat 类来包装旧配置。',
    migrationDesc2: '要进行干净的迁移，先运行 ESLint 配置迁移工具，然后逐步将 FlatCompat 包装器替换为原生扁平配置。',

    h2Monorepo: 'Monorepo 配置',
    monorepoDesc: '在 Monorepo 中，通常有一个定义共享规则的根 eslint.config.js，加上包特定的覆盖。扁平配置使这变得简单，因为你可以从不同包导入和组合配置数组。',
    monorepoDesc2: '每个工作区包可以导出自己的配置片段，根配置导入并合并它们。',

    h2Performance: '性能优化',
    perfDesc: 'ESLint 在大型代码库上可能较慢，尤其是使用类型感知 TypeScript 规则时。以下技术可以显著减少 Lint 时间。',
    bp1: '启用 --cache 标志跳过未更改文件的重新检查。',
    bp2: '使用 typescript-eslint 的项目引用限制 Monorepo 中每个包的类型检查范围。',
    bp3: '使用全局 ignores 排除生成的文件、构建输出和 node_modules。',
    bp4: '如果性能成本大于收益，对测试文件禁用类型感知规则。',
    bp5: '使用 eslint-plugin-import 并启用解析器缓存。',
    bp6: '使用 turbo lint 或 nx lint 等工具跨工作区并行运行 ESLint。',
    bp7: '固定特定规则集而非使用启用所有规则的 "all" 配置。',
    bp8: '使用 TIMING=1 npx eslint 分析慢规则。',

    h2BestPractices: '最佳实践',
    bestPracticesDesc: '遵循以下建议从 ESLint 中获得最大价值。',
    bestP1: '从推荐配置开始定制，而不是从头构建。',
    bestP2: '将 ESLint 错误视为 CI 阻断器。警告应该是临时的。',
    bestP3: 'ESLint 负责代码质量，Prettier 负责格式化。配置 Prettier 时不要使用 ESLint 格式化规则。',
    bestP4: '用注释组织扁平配置文件，分隔基础规则、TypeScript 规则、框架规则和测试覆盖。',
    bestP5: '固定 ESLint 和插件版本。主版本升级可能改变规则行为。',
    bestP6: '谨慎使用 eslint-disable 注释。每条都应包含解释原因。',
    bestP7: '配置编辑器保存时自动修复，立即捕获问题。',
    bestP8: '在 CI 管道中使用 --max-warnings 0 防止警告积累。',
    bestP9: '每次主要版本发布时审查新规则。',
    bestP10: '在项目文档中记录自定义规则或非显而易见的配置选择。',

    h2Faq: '常见问题',
    faq1Q: '什么是 ESLint 扁平配置？',
    faq1A: '扁平配置是 ESLint 9 引入的新配置格式。它使用单个 eslint.config.js 文件导出配置对象数组。配置从上到下合并，取代了旧 .eslintrc 格式复杂的 extends/overrides 级联。',
    faq2Q: '如何将 ESLint 与 TypeScript 一起使用？',
    faq2A: '安装 typescript-eslint 并在 eslint.config.js 中配置。使用 tseslint.config() 辅助函数提供推荐和严格规则预设。类型感知规则使用 TypeScript 编译器 API 进行更深层分析。',
    faq3Q: '应该使用 ESLint 还是 Prettier？',
    faq3A: '两者都用。ESLint 处理代码质量规则，Prettier 处理格式化。安装 eslint-config-prettier 禁用冲突的规则。',
    faq4Q: '如何从 .eslintrc 迁移到扁平配置？',
    faq4A: '运行 npx @eslint/migrate-config .eslintrc.json 生成扁平配置文件。逐步将 FlatCompat 包装器替换为原生扁平配置导入。',
    faq5Q: 'ESLint 和 Biome 有什么区别？',
    faq5A: 'ESLint 是基于 JavaScript 的 Lint 工具，拥有最大的插件生态。Biome 是基于 Rust 的工具链，将 Lint 和格式化合二为一。Biome 更快但规则更少，框架插件支持有限。',
    faq6Q: '如何自动修复 ESLint 错误？',
    faq6A: '运行 eslint --fix 自动修复所有可修复的违规。在 VS Code 中启用保存时自动修复。并非所有规则都可自动修复。',
    faq7Q: '如何为 Monorepo 配置 ESLint？',
    faq7A: '在根目录放置 eslint.config.js 定义共享规则，使用 files 属性为特定包应用覆盖。Turborepo 和 Nx 可以跨工作区并行运行 ESLint。',
    faq8Q: '如何提升 ESLint 性能？',
    faq8A: '启用 --cache 缓存，排除生成文件，限制类型感知规则范围，使用 TIMING=1 分析慢规则。在 Monorepo 中使用项目引用限制类型检查范围。',
  },
};

export default function EslintGuide({ lang }: { lang: string }) {
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

      {/* What Is ESLint */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <pre style={codeBlock}><code>{'# Install ESLint 9\n'
        + 'npm init @eslint/config@latest\n'
        + '\n'
        + '# Or install manually\n'
        + 'npm install --save-dev eslint @eslint/js\n'
        + '\n'
        + '# This creates eslint.config.js (flat config)\n'
        + '# No more .eslintrc.json, .eslintrc.yml, or .eslintrc.js'}</code></pre>

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
              <th style={headerCell}>{t.compCol4}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compRow1, t.compRow1V2, t.compRow1V3, t.compRow1V4],
              [t.compRow2, t.compRow2V2, t.compRow2V3, t.compRow2V4],
              [t.compRow3, t.compRow3V2, t.compRow3V3, t.compRow3V4],
              [t.compRow4, t.compRow4V2, t.compRow4V3, t.compRow4V4],
              [t.compRow5, t.compRow5V2, t.compRow5V3, t.compRow5V4],
              [t.compRow6, t.compRow6V2, t.compRow6V3, t.compRow6V4],
              [t.compRow7, t.compRow7V2, t.compRow7V3, t.compRow7V4],
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

      {/* Flat Config Setup */}
      <h2 style={sectionTitle}>{t.h2FlatConfig}</h2>
      <p style={para}>{t.flatConfigDesc}</p>
      <p style={para}>{t.flatConfigDesc2}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Basic flat config\n'
        + 'import js from "@eslint/js";\n'
        + '\n'
        + 'export default [\n'
        + '  // Global ignores (like .eslintignore)\n'
        + '  {\n'
        + '    ignores: ["dist/", "build/", "node_modules/", "*.min.js"],\n'
        + '  },\n'
        + '\n'
        + '  // ESLint recommended rules for all JS files\n'
        + '  js.configs.recommended,\n'
        + '\n'
        + '  // Custom overrides\n'
        + '  {\n'
        + '    files: ["**/*.js", "**/*.mjs"],\n'
        + '    rules: {\n'
        + '      "no-unused-vars": "warn",\n'
        + '      "no-console": ["error", { allow: ["warn", "error"] }],\n'
        + '      "prefer-const": "error",\n'
        + '      "no-var": "error",\n'
        + '      eqeqeq: ["error", "always"],\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      {/* Rules and Severity */}
      <h2 style={sectionTitle}>{t.h2Rules}</h2>
      <p style={para}>{t.rulesDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>{t.ruleOff.split(' - ')[0]}</strong>{' - ' + t.ruleOff.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.ruleWarn.split(' - ')[0]}</strong>{' - ' + t.ruleWarn.split(' - ')[1]}</li>
        <li style={listItem}><strong>{t.ruleError.split(' - ')[0]}</strong>{' - ' + t.ruleError.split(' - ')[1]}</li>
      </ul>
      <p style={para}>{t.rulesDesc2}</p>
      <pre style={codeBlock}><code>{'// Rule configuration examples\n'
        + 'export default [\n'
        + '  {\n'
        + '    rules: {\n'
        + '      // Severity only\n'
        + '      "no-debugger": "error",\n'
        + '      "no-alert": "warn",\n'
        + '      "no-eval": "off",\n'
        + '\n'
        + '      // Severity + options\n'
        + '      "no-unused-vars": ["error", {\n'
        + '        argsIgnorePattern: "^_",\n'
        + '        varsIgnorePattern: "^_",\n'
        + '        caughtErrorsIgnorePattern: "^_",\n'
        + '      }],\n'
        + '\n'
        + '      // Numeric severity (0=off, 1=warn, 2=error)\n'
        + '      "no-console": [1, { allow: ["warn", "error", "info"] }],\n'
        + '\n'
        + '      // Complex options\n'
        + '      "no-restricted-imports": ["error", {\n'
        + '        patterns: [{\n'
        + '          group: ["lodash"],\n'
        + '          message: "Import from lodash-es instead for tree-shaking.",\n'
        + '        }],\n'
        + '      }],\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      {/* TypeScript-ESLint */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.tsDesc}</p>
      <p style={para}>{t.tsDesc2}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - TypeScript-ESLint setup\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + '\n'
        + 'export default tseslint.config(\n'
        + '  js.configs.recommended,\n'
        + '\n'
        + '  // Recommended type-checked rules\n'
        + '  ...tseslint.configs.recommendedTypeChecked,\n'
        + '\n'
        + '  // Stylistic type-checked rules (optional)\n'
        + '  ...tseslint.configs.stylisticTypeChecked,\n'
        + '\n'
        + '  {\n'
        + '    languageOptions: {\n'
        + '      parserOptions: {\n'
        + '        projectService: true,\n'
        + '        tsconfigRootDir: import.meta.dirname,\n'
        + '      },\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  // Custom TypeScript rules\n'
        + '  {\n'
        + '    files: ["**/*.ts", "**/*.tsx"],\n'
        + '    rules: {\n'
        + '      "@typescript-eslint/no-floating-promises": "error",\n'
        + '      "@typescript-eslint/no-misused-promises": "error",\n'
        + '      "@typescript-eslint/strict-boolean-expressions": "warn",\n'
        + '      "@typescript-eslint/no-unnecessary-condition": "error",\n'
        + '      "@typescript-eslint/prefer-nullish-coalescing": "error",\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  // Disable type-aware rules for JS files\n'
        + '  {\n'
        + '    files: ["**/*.js", "**/*.mjs"],\n'
        + '    ...tseslint.configs.disableTypeChecked,\n'
        + '  },\n'
        + ');'}</code></pre>

      {/* Framework Plugins */}
      <h2 style={sectionTitle}>{t.h2Frameworks}</h2>
      <p style={para}>{t.frameworksDesc}</p>

      <h3 style={subTitle}>{t.h3React}</h3>
      <p style={para}>{t.reactDesc}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - React + Hooks\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import react from "eslint-plugin-react";\n'
        + 'import reactHooks from "eslint-plugin-react-hooks";\n'
        + '\n'
        + 'export default [\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.recommended,\n'
        + '\n'
        + '  {\n'
        + '    files: ["**/*.tsx", "**/*.jsx"],\n'
        + '    plugins: {\n'
        + '      react,\n'
        + '      "react-hooks": reactHooks,\n'
        + '    },\n'
        + '    languageOptions: {\n'
        + '      parserOptions: {\n'
        + '        ecmaFeatures: { jsx: true },\n'
        + '      },\n'
        + '    },\n'
        + '    rules: {\n'
        + '      ...react.configs.recommended.rules,\n'
        + '      ...reactHooks.configs.recommended.rules,\n'
        + '      "react/react-in-jsx-scope": "off",\n'
        + '      "react/prop-types": "off",\n'
        + '      "react-hooks/exhaustive-deps": "warn",\n'
        + '    },\n'
        + '    settings: {\n'
        + '      react: { version: "detect" },\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      <h3 style={subTitle}>{t.h3Vue}</h3>
      <p style={para}>{t.vueDesc}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Vue 3\n'
        + 'import js from "@eslint/js";\n'
        + 'import vue from "eslint-plugin-vue";\n'
        + 'import vueParser from "vue-eslint-parser";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + '\n'
        + 'export default [\n'
        + '  js.configs.recommended,\n'
        + '  ...vue.configs["flat/recommended"],\n'
        + '\n'
        + '  {\n'
        + '    files: ["**/*.vue"],\n'
        + '    languageOptions: {\n'
        + '      parser: vueParser,\n'
        + '      parserOptions: {\n'
        + '        parser: tseslint.parser,\n'
        + '        sourceType: "module",\n'
        + '      },\n'
        + '    },\n'
        + '    rules: {\n'
        + '      "vue/multi-word-component-names": "warn",\n'
        + '      "vue/no-unused-vars": "error",\n'
        + '      "vue/require-default-prop": "error",\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      <h3 style={subTitle}>{t.h3Angular}</h3>
      <p style={para}>{t.angularDesc}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Angular\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import angular from "angular-eslint";\n'
        + '\n'
        + 'export default tseslint.config(\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.recommended,\n'
        + '  ...angular.configs.tsRecommended,\n'
        + '\n'
        + '  {\n'
        + '    files: ["**/*.ts"],\n'
        + '    rules: {\n'
        + '      "@angular-eslint/directive-selector": ["error", {\n'
        + '        type: "attribute",\n'
        + '        prefix: "app",\n'
        + '        style: "camelCase",\n'
        + '      }],\n'
        + '      "@angular-eslint/component-selector": ["error", {\n'
        + '        type: "element",\n'
        + '        prefix: "app",\n'
        + '        style: "kebab-case",\n'
        + '      }],\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  {\n'
        + '    files: ["**/*.html"],\n'
        + '    ...angular.configs.templateRecommended,\n'
        + '    ...angular.configs.templateAccessibility,\n'
        + '  },\n'
        + ');'}</code></pre>

      {/* Custom Rules */}
      <h2 style={sectionTitle}>{t.h2CustomRules}</h2>
      <p style={para}>{t.customRulesDesc}</p>
      <p style={para}>{t.customRulesDesc2}</p>
      <pre style={codeBlock}><code>{'// eslint-plugin-custom/no-hardcoded-colors.js\n'
        + 'export default {\n'
        + '  meta: {\n'
        + '    type: "suggestion",\n'
        + '    docs: {\n'
        + '      description: "Disallow hardcoded color hex values",\n'
        + '    },\n'
        + '    messages: {\n'
        + '      noHardcodedColor:\n'
        + '        "Avoid hardcoded color \'{{ value }}\'. Use a design token instead.",\n'
        + '    },\n'
        + '    schema: [],\n'
        + '  },\n'
        + '\n'
        + '  create(context) {\n'
        + '    const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\$/;\n'
        + '\n'
        + '    return {\n'
        + '      Literal(node) {\n'
        + '        if (\n'
        + '          typeof node.value === "string" &&\n'
        + '          HEX_PATTERN.test(node.value)\n'
        + '        ) {\n'
        + '          context.report({\n'
        + '            node,\n'
        + '            messageId: "noHardcodedColor",\n'
        + '            data: { value: node.value },\n'
        + '          });\n'
        + '        }\n'
        + '      },\n'
        + '    };\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Using the custom rule in eslint.config.js\n'
        + 'import noHardcodedColors from "./eslint-plugin-custom/no-hardcoded-colors.js";\n'
        + '\n'
        + 'export default [\n'
        + '  {\n'
        + '    plugins: {\n'
        + '      custom: { rules: { "no-hardcoded-colors": noHardcodedColors } },\n'
        + '    },\n'
        + '    rules: {\n'
        + '      "custom/no-hardcoded-colors": "warn",\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      {/* Shareable Configs */}
      <h2 style={sectionTitle}>{t.h2ShareableConfigs}</h2>
      <p style={para}>{t.shareableDesc}</p>
      <p style={para}>{t.shareableDesc2}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Using @antfu/eslint-config\n'
        + 'import antfu from "@antfu/eslint-config";\n'
        + '\n'
        + 'export default antfu({\n'
        + '  // Frameworks: auto-detected or manually enabled\n'
        + '  typescript: true,\n'
        + '  react: true,\n'
        + '  vue: false,\n'
        + '\n'
        + '  // Formatting with Prettier-compatible style\n'
        + '  stylistic: {\n'
        + '    indent: 2,\n'
        + '    quotes: "single",\n'
        + '    semi: false,\n'
        + '  },\n'
        + '\n'
        + '  // Override specific rules\n'
        + '  rules: {\n'
        + '    "no-console": "warn",\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// eslint.config.js - Composing multiple configs\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import prettierConfig from "eslint-config-prettier";\n'
        + '\n'
        + 'export default [\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.strict,\n'
        + '  prettierConfig,  // Must be last to override formatting rules\n'
        + '];'}</code></pre>

      {/* Ignoring Files */}
      <h2 style={sectionTitle}>{t.h2Ignoring}</h2>
      <p style={para}>{t.ignoringDesc}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Ignoring patterns\n'
        + 'export default [\n'
        + '  // Global ignores (standalone object = .eslintignore equivalent)\n'
        + '  {\n'
        + '    ignores: [\n'
        + '      "dist/",\n'
        + '      "build/",\n'
        + '      "coverage/",\n'
        + '      "node_modules/",\n'
        + '      "*.min.js",\n'
        + '      "**/*.generated.ts",\n'
        + '      ".next/",\n'
        + '      "public/",\n'
        + '    ],\n'
        + '  },\n'
        + '\n'
        + '  // Scoped ignores: exclude test fixtures from strict rules\n'
        + '  {\n'
        + '    files: ["**/*.ts"],\n'
        + '    ignores: ["**/__fixtures__/**", "**/__mocks__/**"],\n'
        + '    rules: {\n'
        + '      "@typescript-eslint/no-explicit-any": "error",\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      {/* CLI Usage */}
      <h2 style={sectionTitle}>{t.h2CLI}</h2>
      <p style={para}>{t.cliDesc}</p>
      <pre style={codeBlock}><code>{'# Lint all files in the project\n'
        + 'npx eslint .\n'
        + '\n'
        + '# Lint specific files or directories\n'
        + 'npx eslint src/ tests/\n'
        + 'npx eslint "src/**/*.{ts,tsx}"\n'
        + '\n'
        + '# Auto-fix all fixable issues\n'
        + 'npx eslint . --fix\n'
        + '\n'
        + '# Enable caching for faster re-runs\n'
        + 'npx eslint . --cache --cache-location .eslintcache\n'
        + '\n'
        + '# Fail on warnings (useful in CI)\n'
        + 'npx eslint . --max-warnings 0\n'
        + '\n'
        + '# Show which config applies to a file\n'
        + 'npx eslint --inspect-config\n'
        + '\n'
        + '# Print timing info for rules (find slow rules)\n'
        + 'TIMING=1 npx eslint .\n'
        + '\n'
        + '# Output results as JSON\n'
        + 'npx eslint . --format json --output-file report.json\n'
        + '\n'
        + '# Common package.json scripts\n'
        + '# "lint": "eslint ."\n'
        + '# "lint:fix": "eslint . --fix"\n'
        + '# "lint:ci": "eslint . --cache --max-warnings 0"'}</code></pre>

      {/* IDE Integration */}
      <h2 style={sectionTitle}>{t.h2IDE}</h2>
      <p style={para}>{t.ideDesc}</p>
      <p style={para}>{t.ideDesc2}</p>
      <pre style={codeBlock}><code>{'// .vscode/settings.json\n'
        + '{\n'
        + '  // Enable ESLint for these languages\n'
        + '  "eslint.validate": [\n'
        + '    "javascript",\n'
        + '    "javascriptreact",\n'
        + '    "typescript",\n'
        + '    "typescriptreact",\n'
        + '    "vue"\n'
        + '  ],\n'
        + '\n'
        + '  // Auto-fix ESLint issues on save\n'
        + '  "editor.codeActionsOnSave": {\n'
        + '    "source.fixAll.eslint": "explicit"\n'
        + '  },\n'
        + '\n'
        + '  // Use Prettier as the default formatter\n'
        + '  "editor.defaultFormatter": "esbenp.prettier-vscode",\n'
        + '  "editor.formatOnSave": true,\n'
        + '\n'
        + '  // ESLint uses flat config by default in v9\n'
        + '  // No additional setting needed for eslint.config.js\n'
        + '}'}</code></pre>

      {/* Auto-Fix and Formatting */}
      <h2 style={sectionTitle}>{t.h2AutoFix}</h2>
      <p style={para}>{t.autoFixDesc}</p>
      <p style={para}>{t.autoFixDesc2}</p>
      <pre style={codeBlock}><code>{'# Install Prettier + ESLint integration\n'
        + 'npm install --save-dev prettier eslint-config-prettier\n'
        + '\n'
        + '# eslint.config.js\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import prettierConfig from "eslint-config-prettier";\n'
        + '\n'
        + 'export default [\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.recommended,\n'
        + '\n'
        + '  // prettier must be LAST to turn off conflicting rules\n'
        + '  prettierConfig,\n'
        + '];\n'
        + '\n'
        + '# CI pipeline: run both\n'
        + '# Step 1: Check formatting\n'
        + '# npx prettier --check .\n'
        + '# Step 2: Check code quality\n'
        + '# npx eslint . --max-warnings 0'}</code></pre>

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <p style={para}>{t.migrationDesc2}</p>
      <pre style={codeBlock}><code>{'# Step 1: Run the migration tool\n'
        + 'npx @eslint/migrate-config .eslintrc.json\n'
        + '\n'
        + '# This generates eslint.config.mjs with FlatCompat wrappers\n'
        + '# for any legacy plugins that do not support flat config yet.\n'
        + '\n'
        + '# Step 2: Example generated config with FlatCompat\n'
        + '# import { FlatCompat } from "@eslint/eslintrc";\n'
        + '# import path from "node:path";\n'
        + '# import { fileURLToPath } from "node:url";\n'
        + '#\n'
        + '# const __filename = fileURLToPath(import.meta.url);\n'
        + '# const __dirname = path.dirname(__filename);\n'
        + '# const compat = new FlatCompat({ baseDirectory: __dirname });\n'
        + '#\n'
        + '# export default [\n'
        + '#   ...compat.extends("eslint-config-airbnb"),\n'
        + '#   { rules: { "no-console": "warn" } },\n'
        + '# ];\n'
        + '\n'
        + '# Step 3: Gradually replace FlatCompat with native imports\n'
        + '# as plugins release flat-config-compatible versions.\n'
        + '# Delete .eslintrc.json and .eslintignore when done.'}</code></pre>

      {/* Monorepo */}
      <h2 style={sectionTitle}>{t.h2Monorepo}</h2>
      <p style={para}>{t.monorepoDesc}</p>
      <p style={para}>{t.monorepoDesc2}</p>
      <pre style={codeBlock}><code>{'// eslint.config.js - Monorepo root config\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import react from "eslint-plugin-react";\n'
        + 'import reactHooks from "eslint-plugin-react-hooks";\n'
        + '\n'
        + 'export default [\n'
        + '  // Global ignores\n'
        + '  { ignores: ["**/dist/", "**/node_modules/", "**/.next/"] },\n'
        + '\n'
        + '  // Shared base rules for all packages\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.recommended,\n'
        + '\n'
        + '  // Frontend: React rules\n'
        + '  {\n'
        + '    files: ["packages/web/**/*.tsx", "packages/web/**/*.ts"],\n'
        + '    plugins: { react, "react-hooks": reactHooks },\n'
        + '    rules: {\n'
        + '      ...react.configs.recommended.rules,\n'
        + '      ...reactHooks.configs.recommended.rules,\n'
        + '      "react/react-in-jsx-scope": "off",\n'
        + '    },\n'
        + '    settings: { react: { version: "detect" } },\n'
        + '  },\n'
        + '\n'
        + '  // Backend: Node.js rules\n'
        + '  {\n'
        + '    files: ["packages/api/**/*.ts"],\n'
        + '    rules: {\n'
        + '      "no-console": "off",\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  // Tests: relaxed rules\n'
        + '  {\n'
        + '    files: ["**/*.test.ts", "**/*.spec.ts"],\n'
        + '    rules: {\n'
        + '      "@typescript-eslint/no-explicit-any": "off",\n'
        + '      "@typescript-eslint/no-non-null-assertion": "off",\n'
        + '    },\n'
        + '  },\n'
        + '];'}</code></pre>

      {/* Performance */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={para}>{t.perfDesc}</p>
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

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <p style={para}>{t.bestPracticesDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bestP1}</li>
        <li style={listItem}>{t.bestP2}</li>
        <li style={listItem}>{t.bestP3}</li>
        <li style={listItem}>{t.bestP4}</li>
        <li style={listItem}>{t.bestP5}</li>
        <li style={listItem}>{t.bestP6}</li>
        <li style={listItem}>{t.bestP7}</li>
        <li style={listItem}>{t.bestP8}</li>
        <li style={listItem}>{t.bestP9}</li>
        <li style={listItem}>{t.bestP10}</li>
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
