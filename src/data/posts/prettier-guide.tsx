'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prettier Code Formatter Guide 2026: Configuration, ESLint Integration, Pre-commit Hooks, and CI/CD',
    intro: 'Prettier is the most widely adopted opinionated code formatter for JavaScript, TypeScript, HTML, CSS, JSON, Markdown, and many other languages. It enforces a consistent code style by parsing your code and reprinting it with its own rules, eliminating debates about formatting in code reviews. With over 50 million weekly npm downloads, Prettier has become an essential part of the modern development toolchain. This guide covers everything from basic setup and configuration to advanced topics like ESLint integration, editor plugins, pre-commit hooks, CI/CD enforcement, custom plugins, and the philosophy behind opinionated formatting.',
    tldr: 'Prettier is an opinionated code formatter that supports 20+ languages including JavaScript, TypeScript, CSS, HTML, JSON, and Markdown. Configure it via .prettierrc with options like printWidth, tabWidth, singleQuote, and trailingComma. Integrate with ESLint using eslint-config-prettier, set up pre-commit hooks with lint-staged and husky, and enforce formatting in CI/CD. Prettier deliberately limits configuration options to end style debates and keep teams focused on writing code.',
    keyTakeaway1: 'Prettier formats code by parsing it into an AST and reprinting it, guaranteeing consistent output regardless of the original formatting.',
    keyTakeaway2: 'The .prettierrc file supports JSON, YAML, TOML, JS, and TS formats with options like printWidth (80), tabWidth (2), singleQuote, and trailingComma.',
    keyTakeaway3: 'Use eslint-config-prettier to disable ESLint formatting rules that conflict with Prettier, keeping ESLint for code quality only.',
    keyTakeaway4: 'Pre-commit hooks with husky and lint-staged ensure every commit is formatted before it reaches the repository.',
    keyTakeaway5: 'CI/CD pipelines should run prettier --check to catch unformatted code without modifying files.',
    keyTakeaway6: 'Prettier plugins extend language support to Tailwind CSS class sorting, SQL, PHP, Java, XML, TOML, and more.',

    h2WhatIs: 'What Is Prettier and Why Use It?',
    whatIsDesc: 'Prettier is an opinionated code formatter that removes all original styling and ensures that all outputted code conforms to a consistent style. Unlike linters that report problems for you to fix, Prettier takes your code, parses it into an abstract syntax tree (AST), and reprints it from scratch according to its formatting rules. The result is deterministic: the same code always produces the same output regardless of the original formatting.',
    whatIsDesc2: 'The key insight behind Prettier is that arguing about code formatting is a waste of time. By adopting an opinionated formatter with minimal configuration options, teams eliminate style debates in code reviews and free up mental energy for logic, architecture, and design decisions. Prettier supports JavaScript, TypeScript, JSX, TSX, CSS, Less, SCSS, HTML, JSON, GraphQL, Markdown, YAML, and more through its plugin system.',
    whatIsDesc3: 'Prettier differs from traditional formatters because it considers the entire program structure when making formatting decisions. It understands line length budgets and will break long lines into multiple lines, respecting language-specific syntax rules. A simple property access that fits on one line stays on one line, but the same expression with a longer chain will be broken across multiple lines automatically.',

    h2Install: 'Installing and Setting Up Prettier',
    installDesc: 'Prettier can be installed as a project dependency or used globally. The recommended approach is to install it as a devDependency in each project so that all team members use the same version.',
    installDesc2: 'After installation, you can run Prettier from the command line. The most common commands are formatting files in place, checking if files are formatted, and formatting specific file types.',

    h2Config: 'Configuration with .prettierrc',
    configDesc: 'Prettier is designed to work with minimal configuration. However, it does provide a set of options that you can customize to match your team preferences. Configuration can be specified in several file formats: .prettierrc (JSON or YAML), .prettierrc.json, .prettierrc.yml, .prettierrc.toml, .prettierrc.js, .prettierrc.cjs, .prettierrc.mjs, or a prettier key in package.json.',
    configDesc2: 'Here are the most commonly used Prettier options and their default values. Most teams only need to change 3 to 5 of these options.',

    h2Options: 'Complete Options Reference',
    optCol1: 'Option',
    optCol2: 'Default',
    optCol3: 'Description',
    optRow1: 'printWidth',
    optRow1V2: '80',
    optRow1V3: 'Line length that the printer will try to wrap at. Not a hard limit.',
    optRow2: 'tabWidth',
    optRow2V2: '2',
    optRow2V3: 'Number of spaces per indentation level.',
    optRow3: 'useTabs',
    optRow3V2: 'false',
    optRow3V3: 'Use tabs instead of spaces for indentation.',
    optRow4: 'semi',
    optRow4V2: 'true',
    optRow4V3: 'Add semicolons at the end of statements.',
    optRow5: 'singleQuote',
    optRow5V2: 'false',
    optRow5V3: 'Use single quotes instead of double quotes.',
    optRow6: 'trailingComma',
    optRow6V2: '"all"',
    optRow6V3: 'Trailing commas where valid in ES5+ (objects, arrays, etc.).',
    optRow7: 'bracketSpacing',
    optRow7V2: 'true',
    optRow7V3: 'Spaces between brackets in object literals: { foo: bar }.',
    optRow8: 'arrowParens',
    optRow8V2: '"always"',
    optRow8V3: 'Parentheses around a sole arrow function parameter: (x) => x.',
    optRow9: 'endOfLine',
    optRow9V2: '"lf"',
    optRow9V3: 'Line ending style: lf, crlf, cr, or auto.',
    optRow10: 'jsxSingleQuote',
    optRow10V2: 'false',
    optRow10V3: 'Use single quotes in JSX attributes.',
    optRow11: 'bracketSameLine',
    optRow11V2: 'false',
    optRow11V3: 'Put the closing > of a multi-line JSX element on the last line.',
    optRow12: 'proseWrap',
    optRow12V2: '"preserve"',
    optRow12V3: 'How to wrap Markdown text: always, never, or preserve.',

    h2Ignore: 'Ignoring Files with .prettierignore',
    ignoreDesc: 'The .prettierignore file works exactly like .gitignore and uses the same syntax. It tells Prettier which files and directories to skip. By default, Prettier ignores files in node_modules and common version control directories. You should also ignore build output, generated files, and any files managed by other tools.',
    ignoreDesc2: 'You can also ignore specific lines or blocks within a file using special comments. This is useful for code that must maintain a specific format, such as ASCII art tables, alignment-dependent code, or generated content.',

    h2ESLint: 'Integration with ESLint',
    eslintDesc: 'Prettier and ESLint serve different purposes. ESLint catches code quality issues (unused variables, missing error handling, incorrect types) while Prettier handles formatting (indentation, line breaks, quotes, semicolons). The challenge is that ESLint also has formatting rules that can conflict with Prettier. The solution is eslint-config-prettier, which disables all ESLint rules that are unnecessary or might conflict with Prettier.',
    eslintDesc2: 'The recommended setup in 2026 uses ESLint flat config with eslint-config-prettier. This ensures ESLint handles code quality while Prettier handles formatting, with no conflicts between them.',
    eslintDesc3: 'Some teams previously used eslint-plugin-prettier which ran Prettier as an ESLint rule. This approach is now discouraged because it is slower (Prettier runs inside ESLint), produces noisy ESLint output for formatting issues, and creates confusing error messages. The recommended approach is to run ESLint and Prettier as separate tools.',

    h2Editor: 'Editor Integration',
    editorDesc: 'Prettier integrates with all major code editors. Format-on-save is the most productive workflow: every time you save a file, Prettier automatically formats it. This eliminates the need to think about formatting while coding and ensures every saved file is properly formatted.',
    h3VSCode: 'VS Code',
    vscodeDesc: 'The Prettier VS Code extension is the most popular Prettier editor integration with over 40 million installs. Install it from the VS Code marketplace and configure format-on-save in your settings.',
    h3JetBrains: 'JetBrains IDEs (WebStorm, IntelliJ)',
    jetbrainsDesc: 'JetBrains IDEs have built-in Prettier support. Enable it in Settings > Languages & Frameworks > JavaScript > Prettier. Check the boxes for On Save and On Reformat Code to automatically format with Prettier.',
    h3Vim: 'Vim / Neovim',
    vimDesc: 'For Vim and Neovim, use the neoformat plugin or the built-in formatprg option. With neoformat, you can configure format-on-save in your configuration file.',

    h2PreCommit: 'Pre-commit Hooks with Husky and lint-staged',
    preCommitDesc: 'Editor integration catches most formatting issues during development, but pre-commit hooks provide a safety net. They ensure that every commit in the repository is properly formatted, regardless of which editor or IDE each developer uses. The standard approach uses husky for Git hooks and lint-staged to run Prettier only on staged files.',
    preCommitDesc2: 'This setup runs Prettier on every staged file that matches the specified patterns. If Prettier changes a file, lint-staged automatically adds the change to the commit. This means developers never see formatting diffs in their pull requests because files are always formatted before they enter the repository.',

    h2CICD: 'CI/CD Pipeline Integration',
    cicdDesc: 'While pre-commit hooks catch most formatting issues locally, CI/CD provides the final enforcement layer. The prettier --check command verifies that all files are formatted without modifying them. If any file is not formatted, the command exits with a non-zero code, failing the CI pipeline.',
    cicdDesc2: 'Running Prettier in CI ensures that even if a developer bypasses pre-commit hooks (with git commit --no-verify), the formatting requirement is still enforced before code is merged.',

    h2Plugins: 'Prettier Plugins',
    pluginsDesc: 'Prettier has a plugin system that extends its language support and capabilities. Plugins can add new languages, modify existing formatting behavior, or add entirely new features. Some of the most popular community plugins include Tailwind CSS class sorting, SQL formatting, PHP formatting, and XML formatting.',
    pluginsDesc2: 'Plugins are installed as npm packages and can be configured in your .prettierrc file using the plugins array. Prettier automatically loads plugins listed in this array.',

    h2Philosophy: 'The Opinionated Formatting Philosophy',
    philDesc: 'Prettier deliberately provides very few configuration options compared to other formatters. This is not a limitation but a core design decision. The Prettier team has observed that more options lead to more debates, more inconsistency, and more time spent on configuration instead of writing code.',
    philDesc2: 'When a team adopts Prettier, they agree to accept its decisions. The initial adjustment period is brief: most developers stop noticing the formatting after a few days. The benefit is permanent: no more bike-shedding about whether to use tabs or spaces, where to put brackets, or how to align object properties.',
    philList1: 'Fewer options means less time configuring and more time coding.',
    philList2: 'Consistent formatting across all files in a project, regardless of who wrote them.',
    philList3: 'No formatting discussions in code reviews, allowing focus on logic and architecture.',
    philList4: 'New team members can start coding immediately without learning a style guide.',
    philList5: 'Cross-project consistency when multiple projects use the same minimal Prettier config.',

    h2Overrides: 'Per-File and Per-Language Overrides',
    overridesDesc: 'Prettier allows you to apply different configuration options to specific files or file types using the overrides field in .prettierrc. This is useful when different parts of your project need different formatting rules, such as wider print widths for HTML files or different quote styles for JSON.',

    h2Comparison: 'Prettier vs Other Formatters',
    comparisonDesc: 'Understanding how Prettier compares to other formatting tools helps you choose the right tool for your project.',
    compCol1: 'Feature',
    compCol2: 'Prettier',
    compCol3: 'Biome',
    compCol4: 'dprint',
    compRow1: 'Speed',
    compRow1V2: 'Fast (JavaScript)',
    compRow1V3: 'Very fast (Rust)',
    compRow1V4: 'Very fast (Rust)',
    compRow2: 'Language support',
    compRow2V2: '20+ (with plugins)',
    compRow2V3: 'JS/TS/JSON/CSS',
    compRow2V4: 'JS/TS/JSON/Markdown',
    compRow3: 'Plugin ecosystem',
    compRow3V2: 'Large',
    compRow3V3: 'None',
    compRow3V4: 'Small',
    compRow4: 'Configuration',
    compRow4V2: 'Minimal (opinionated)',
    compRow4V3: 'More options',
    compRow4V4: 'More options',
    compRow5: 'Editor support',
    compRow5V2: 'Excellent',
    compRow5V3: 'Good',
    compRow5V4: 'Good',
    compRow6: 'Adoption',
    compRow6V2: 'Industry standard',
    compRow6V3: 'Growing rapidly',
    compRow6V4: 'Niche',
    comparisonSummary: 'Prettier remains the industry standard in 2026 due to its broad language support, plugin ecosystem, and universal editor integration. Biome is a compelling alternative for teams that only need JavaScript and TypeScript formatting and want maximum speed. dprint is another Rust-based option with configurable formatting rules.',

    h2Migration: 'Migrating a Project to Prettier',
    migrationDesc: 'Adopting Prettier in an existing project requires a one-time formatting commit that touches many files. The recommended approach is to format the entire codebase in a single commit, then configure pre-commit hooks and CI/CD to maintain formatting going forward.',
    migrationDesc2: 'To make the migration commit less disruptive in git blame, configure git to ignore the formatting commit using a .git-blame-ignore-revs file. GitHub and many other Git hosts support this file format natively.',

    h2BestPractices: 'Best Practices',
    bestPracticesDesc: 'Follow these recommendations to get the most value from Prettier in your project.',
    bp1: 'Install Prettier as a devDependency in every project rather than relying on global installations to ensure version consistency.',
    bp2: 'Keep your .prettierrc minimal. The fewer options you customize, the closer you stay to the community standard.',
    bp3: 'Use format-on-save in your editor. This is the single most impactful workflow improvement Prettier offers.',
    bp4: 'Set up pre-commit hooks with husky and lint-staged as a safety net for commits from any environment.',
    bp5: 'Add prettier --check to your CI/CD pipeline as the final formatting enforcement layer.',
    bp6: 'Use .prettierignore to skip generated files, build output, and third-party code that should not be reformatted.',
    bp7: 'When migrating an existing project, format everything in one commit and add it to .git-blame-ignore-revs.',
    bp8: 'Run Prettier and ESLint as separate tools. Do not use eslint-plugin-prettier to run Prettier inside ESLint.',
    bp9: 'Pin your Prettier version in package.json to avoid unexpected formatting changes when a new version is released.',
    bp10: 'Use the overrides field in .prettierrc for files that need different formatting rules instead of disabling Prettier entirely.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Prettier and what does it do?',
    faq1A: 'Prettier is an opinionated code formatter that supports JavaScript, TypeScript, CSS, HTML, JSON, Markdown, and many other languages through plugins. It parses your code into an AST and reprints it with consistent formatting, eliminating style debates in code reviews and ensuring uniform code style across your entire project.',
    faq2Q: 'How do I configure Prettier?',
    faq2A: 'Create a .prettierrc file in your project root with JSON or YAML configuration. Common options include printWidth (default 80), tabWidth (default 2), singleQuote (default false), semi (default true), and trailingComma (default "all"). Most teams only need to change 3 to 5 options from the defaults.',
    faq3Q: 'How do I use Prettier with ESLint?',
    faq3A: 'Install eslint-config-prettier and add it as the last item in your ESLint config to disable all formatting rules that conflict with Prettier. Run ESLint for code quality rules and Prettier for formatting as separate tools. Do not use eslint-plugin-prettier as it is slower and produces noisy output.',
    faq4Q: 'How do I set up Prettier pre-commit hooks?',
    faq4A: 'Install husky and lint-staged as devDependencies. Run npx husky init to create the .husky directory. Add a pre-commit hook that runs npx lint-staged. Configure lint-staged in package.json to run prettier --write on staged files matching your file patterns.',
    faq5Q: 'How do I run Prettier in CI/CD?',
    faq5A: 'Add npx prettier --check . to your CI/CD pipeline. The --check flag verifies formatting without modifying files and exits with a non-zero code if any file is not formatted. This fails the pipeline and prevents unformatted code from being merged.',
    faq6Q: 'What files should I ignore with Prettier?',
    faq6A: 'Create a .prettierignore file with patterns for build output (dist/, build/, .next/), dependencies (node_modules/), generated files (*.min.js, *.generated.*), lock files (package-lock.json, yarn.lock, pnpm-lock.yaml), and any third-party code that should not be reformatted.',
    faq7Q: 'What is the difference between Prettier and Biome?',
    faq7A: 'Prettier is a JavaScript-based formatter with broad language support (20+ languages via plugins) and is the industry standard. Biome is a Rust-based toolchain that combines formatting and linting in one faster binary but supports fewer languages (JS, TS, JSON, CSS). Choose Prettier for broad language support and plugin ecosystem, Biome for maximum speed in JavaScript and TypeScript projects.',
    faq8Q: 'How do I format only changed files with Prettier?',
    faq8A: 'Use lint-staged with pre-commit hooks to format only staged files. For manual formatting of changed files, you can pipe git diff output to Prettier: git diff --name-only --diff-filter=ACMR | xargs npx prettier --write. In CI, use prettier --check with the list of changed files from your pull request.',
  },
  zh: {
    title: 'Prettier 代码格式化工具指南 2026：配置、ESLint 集成、预提交钩子和 CI/CD',
    intro: 'Prettier 是 JavaScript、TypeScript、HTML、CSS、JSON、Markdown 等语言中使用最广泛的固执己见的代码格式化工具。它通过解析代码并按自己的规则重新输出来强制一致的代码风格，消除了代码审查中关于格式的争论。Prettier 每周 npm 下载量超过 5000 万次，已成为现代开发工具链的重要组成部分。本指南涵盖从基本设置和配置到 ESLint 集成、编辑器插件、预提交钩子、CI/CD 强制执行、自定义插件等高级主题。',
    tldr: 'Prettier 是一个支持 20 多种语言的固执己见的代码格式化工具。通过 .prettierrc 配置 printWidth、tabWidth、singleQuote 和 trailingComma 等选项。使用 eslint-config-prettier 与 ESLint 集成，使用 lint-staged 和 husky 设置预提交钩子，并在 CI/CD 中强制格式化。Prettier 故意限制配置选项以结束风格争论。',
    keyTakeaway1: 'Prettier 通过将代码解析为 AST 并重新输出来格式化代码，无论原始格式如何，都能保证一致的输出。',
    keyTakeaway2: '.prettierrc 文件支持 JSON、YAML、TOML、JS 和 TS 格式，提供 printWidth（80）、tabWidth（2）、singleQuote 和 trailingComma 等选项。',
    keyTakeaway3: '使用 eslint-config-prettier 禁用与 Prettier 冲突的 ESLint 格式化规则，让 ESLint 只处理代码质量。',
    keyTakeaway4: '使用 husky 和 lint-staged 的预提交钩子确保每次提交在进入仓库前都已格式化。',
    keyTakeaway5: 'CI/CD 管道应运行 prettier --check 来捕获未格式化的代码，而不修改文件。',
    keyTakeaway6: 'Prettier 插件扩展了语言支持，包括 Tailwind CSS 类排序、SQL、PHP、Java、XML、TOML 等。',

    h2WhatIs: '什么是 Prettier，为什么要使用它？',
    whatIsDesc: 'Prettier 是一个固执己见的代码格式化工具，它移除所有原始样式并确保所有输出代码符合一致的风格。与报告问题让你修复的 Linter 不同，Prettier 接收你的代码，将其解析为抽象语法树（AST），然后根据其格式化规则从头重新输出。',
    whatIsDesc2: 'Prettier 的关键洞察是：争论代码格式是浪费时间。通过采用配置选项最少的固执己见的格式化工具，团队消除了代码审查中的风格争论，将精力集中在逻辑、架构和设计决策上。',
    whatIsDesc3: 'Prettier 不同于传统格式化工具，因为它在做格式化决策时考虑整个程序结构。它理解行长度预算，会将长行拆分为多行，同时尊重语言特定的语法规则。',

    h2Install: '安装和设置 Prettier',
    installDesc: 'Prettier 可以作为项目依赖安装或全局使用。推荐做法是在每个项目中作为 devDependency 安装，以确保所有团队成员使用相同版本。',
    installDesc2: '安装后，你可以从命令行运行 Prettier。最常用的命令是就地格式化文件、检查文件是否已格式化，以及格式化特定文件类型。',

    h2Config: '使用 .prettierrc 配置',
    configDesc: 'Prettier 设计为以最少的配置工作。不过它提供了一组可自定义的选项来匹配团队偏好。配置可以在多种文件格式中指定：.prettierrc（JSON 或 YAML）、.prettierrc.json、.prettierrc.yml、.prettierrc.toml、.prettierrc.js 或 package.json 中的 prettier 键。',
    configDesc2: '以下是最常用的 Prettier 选项及其默认值。大多数团队只需要更改其中 3 到 5 个选项。',

    h2Options: '完整选项参考',
    optCol1: '选项',
    optCol2: '默认值',
    optCol3: '描述',
    optRow1: 'printWidth',
    optRow1V2: '80',
    optRow1V3: '打印器尝试换行的行长度。不是硬限制。',
    optRow2: 'tabWidth',
    optRow2V2: '2',
    optRow2V3: '每个缩进级别的空格数。',
    optRow3: 'useTabs',
    optRow3V2: 'false',
    optRow3V3: '使用制表符而非空格缩进。',
    optRow4: 'semi',
    optRow4V2: 'true',
    optRow4V3: '在语句末尾添加分号。',
    optRow5: 'singleQuote',
    optRow5V2: 'false',
    optRow5V3: '使用单引号代替双引号。',
    optRow6: 'trailingComma',
    optRow6V2: '"all"',
    optRow6V3: '在 ES5+ 有效的地方添加尾逗号。',
    optRow7: 'bracketSpacing',
    optRow7V2: 'true',
    optRow7V3: '对象字面量括号之间的空格：{ foo: bar }。',
    optRow8: 'arrowParens',
    optRow8V2: '"always"',
    optRow8V3: '箭头函数单个参数的括号：(x) => x。',
    optRow9: 'endOfLine',
    optRow9V2: '"lf"',
    optRow9V3: '行尾风格：lf、crlf、cr 或 auto。',
    optRow10: 'jsxSingleQuote',
    optRow10V2: 'false',
    optRow10V3: '在 JSX 属性中使用单引号。',
    optRow11: 'bracketSameLine',
    optRow11V2: 'false',
    optRow11V3: '将多行 JSX 元素的 > 放在最后一行。',
    optRow12: 'proseWrap',
    optRow12V2: '"preserve"',
    optRow12V3: '如何换行 Markdown 文本：always、never 或 preserve。',

    h2Ignore: '使用 .prettierignore 忽略文件',
    ignoreDesc: '.prettierignore 文件与 .gitignore 工作方式完全相同。它告诉 Prettier 跳过哪些文件和目录。默认情况下，Prettier 忽略 node_modules 中的文件。你还应该忽略构建输出、生成的文件和其他工具管理的文件。',
    ignoreDesc2: '你也可以使用特殊注释忽略文件内的特定行或块。这对于必须保持特定格式的代码很有用。',

    h2ESLint: '与 ESLint 集成',
    eslintDesc: 'Prettier 和 ESLint 服务于不同目的。ESLint 捕获代码质量问题，而 Prettier 处理格式化。挑战在于 ESLint 也有格式化规则可能与 Prettier 冲突。解决方案是 eslint-config-prettier，它禁用所有与 Prettier 冲突的 ESLint 规则。',
    eslintDesc2: '2026 年推荐的设置使用 ESLint 扁平配置配合 eslint-config-prettier，确保 ESLint 处理代码质量而 Prettier 处理格式化。',
    eslintDesc3: '以前有些团队使用 eslint-plugin-prettier 将 Prettier 作为 ESLint 规则运行。现在不推荐这种方式，因为它更慢且产生嘈杂的输出。推荐将 ESLint 和 Prettier 作为独立工具运行。',

    h2Editor: '编辑器集成',
    editorDesc: 'Prettier 与所有主流代码编辑器集成。保存时格式化是最高效的工作流程：每次保存文件时，Prettier 自动格式化它。',
    h3VSCode: 'VS Code',
    vscodeDesc: 'Prettier VS Code 扩展拥有超过 4000 万次安装。从 VS Code 扩展市场安装并配置保存时格式化。',
    h3JetBrains: 'JetBrains IDE（WebStorm、IntelliJ）',
    jetbrainsDesc: 'JetBrains IDE 内置 Prettier 支持。在设置 > 语言和框架 > JavaScript > Prettier 中启用，勾选保存时和重新格式化时复选框。',
    h3Vim: 'Vim / Neovim',
    vimDesc: '使用 neoformat 插件或内置 formatprg 选项来集成 Prettier。',

    h2PreCommit: '使用 Husky 和 lint-staged 的预提交钩子',
    preCommitDesc: '编辑器集成在开发过程中捕获大多数格式问题，但预提交钩子提供安全网。它们确保仓库中的每次提交都正确格式化。标准方式使用 husky 处理 Git 钩子，lint-staged 仅在暂存文件上运行 Prettier。',
    preCommitDesc2: '此设置在每个匹配模式的暂存文件上运行 Prettier。如果 Prettier 更改了文件，lint-staged 自动将更改添加到提交中。',

    h2CICD: 'CI/CD 管道集成',
    cicdDesc: '虽然预提交钩子在本地捕获大多数格式问题，CI/CD 提供最终的强制层。prettier --check 命令验证所有文件是否已格式化，而不修改它们。',
    cicdDesc2: '在 CI 中运行 Prettier 确保即使开发者跳过预提交钩子（使用 git commit --no-verify），格式化要求仍在代码合并前强制执行。',

    h2Plugins: 'Prettier 插件',
    pluginsDesc: 'Prettier 的插件系统扩展了语言支持和功能。插件可以添加新语言、修改现有格式化行为或添加全新功能。最受欢迎的社区插件包括 Tailwind CSS 类排序、SQL 格式化和 PHP 格式化。',
    pluginsDesc2: '插件作为 npm 包安装，在 .prettierrc 文件中使用 plugins 数组配置。',

    h2Philosophy: '固执己见的格式化哲学',
    philDesc: 'Prettier 故意提供极少的配置选项。这不是限制，而是核心设计决策。Prettier 团队观察到更多选项导致更多争论、更多不一致，以及更多时间花在配置而非编写代码上。',
    philDesc2: '当团队采用 Prettier 时，他们同意接受其决策。初始适应期很短：大多数开发者几天后就不再注意格式化。好处是永久的：不再讨论制表符还是空格、括号放在哪里。',
    philList1: '更少的选项意味着更少的配置时间和更多的编码时间。',
    philList2: '项目中所有文件的一致格式化，无论谁编写。',
    philList3: '代码审查中没有格式讨论，可以专注于逻辑和架构。',
    philList4: '新团队成员可以立即开始编码，无需学习风格指南。',
    philList5: '多个项目使用相同的最小 Prettier 配置时的跨项目一致性。',

    h2Overrides: '按文件和按语言覆盖',
    overridesDesc: 'Prettier 允许使用 .prettierrc 中的 overrides 字段为特定文件或文件类型应用不同的配置选项。这在项目不同部分需要不同格式化规则时很有用。',

    h2Comparison: 'Prettier 与其他格式化工具对比',
    comparisonDesc: '了解 Prettier 与其他格式化工具的对比有助于为项目选择合适的工具。',
    compCol1: '功能',
    compCol2: 'Prettier',
    compCol3: 'Biome',
    compCol4: 'dprint',
    compRow1: '速度',
    compRow1V2: '快（JavaScript）',
    compRow1V3: '非常快（Rust）',
    compRow1V4: '非常快（Rust）',
    compRow2: '语言支持',
    compRow2V2: '20+（含插件）',
    compRow2V3: 'JS/TS/JSON/CSS',
    compRow2V4: 'JS/TS/JSON/Markdown',
    compRow3: '插件生态',
    compRow3V2: '丰富',
    compRow3V3: '无',
    compRow3V4: '较少',
    compRow4: '配置',
    compRow4V2: '最少（固执己见）',
    compRow4V3: '更多选项',
    compRow4V4: '更多选项',
    compRow5: '编辑器支持',
    compRow5V2: '优秀',
    compRow5V3: '良好',
    compRow5V4: '良好',
    compRow6: '采用度',
    compRow6V2: '行业标准',
    compRow6V3: '快速增长',
    compRow6V4: '小众',
    comparisonSummary: 'Prettier 在 2026 年仍是行业标准，因为其广泛的语言支持、插件生态和通用编辑器集成。Biome 对于只需 JS/TS 格式化且追求速度的团队是一个强有力的替代方案。',

    h2Migration: '将项目迁移到 Prettier',
    migrationDesc: '在现有项目中采用 Prettier 需要一次性格式化提交，会涉及很多文件。推荐方式是在一次提交中格式化整个代码库，然后配置预提交钩子和 CI/CD。',
    migrationDesc2: '为了减少迁移提交对 git blame 的影响，使用 .git-blame-ignore-revs 文件配置 git 忽略格式化提交。',

    h2BestPractices: '最佳实践',
    bestPracticesDesc: '遵循以下建议从 Prettier 中获得最大价值。',
    bp1: '在每个项目中将 Prettier 作为 devDependency 安装，而非依赖全局安装。',
    bp2: '保持 .prettierrc 最小化。自定义的选项越少，越接近社区标准。',
    bp3: '在编辑器中使用保存时格式化，这是 Prettier 提供的最具影响力的工作流改进。',
    bp4: '使用 husky 和 lint-staged 设置预提交钩子作为安全网。',
    bp5: '在 CI/CD 管道中添加 prettier --check 作为最终的格式化强制层。',
    bp6: '使用 .prettierignore 跳过生成的文件、构建输出和第三方代码。',
    bp7: '迁移现有项目时，在一次提交中格式化所有内容并添加到 .git-blame-ignore-revs。',
    bp8: '将 Prettier 和 ESLint 作为独立工具运行，不要使用 eslint-plugin-prettier。',
    bp9: '在 package.json 中固定 Prettier 版本以避免意外的格式变更。',
    bp10: '使用 .prettierrc 中的 overrides 字段为需要不同格式规则的文件配置，而不是完全禁用 Prettier。',

    h2Faq: '常见问题',
    faq1Q: '什么是 Prettier，它做什么？',
    faq1A: 'Prettier 是一个支持 JavaScript、TypeScript、CSS、HTML、JSON、Markdown 等语言的固执己见的代码格式化工具。它将代码解析为 AST 并以一致的格式重新输出，消除代码审查中的风格争论。',
    faq2Q: '如何配置 Prettier？',
    faq2A: '在项目根目录创建 .prettierrc 文件。常用选项包括 printWidth（默认 80）、tabWidth（默认 2）、singleQuote（默认 false）、semi（默认 true）和 trailingComma（默认 "all"）。',
    faq3Q: '如何将 Prettier 与 ESLint 一起使用？',
    faq3A: '安装 eslint-config-prettier 并将其添加到 ESLint 配置的最后，以禁用所有冲突的格式规则。将 ESLint 和 Prettier 作为独立工具运行。',
    faq4Q: '如何设置 Prettier 预提交钩子？',
    faq4A: '安装 husky 和 lint-staged。运行 npx husky init 创建 .husky 目录。添加运行 npx lint-staged 的预提交钩子。在 package.json 中配置 lint-staged。',
    faq5Q: '如何在 CI/CD 中运行 Prettier？',
    faq5A: '在管道中添加 npx prettier --check . 命令。--check 标志验证格式而不修改文件，如果有文件未格式化则以非零退出码退出。',
    faq6Q: '应该用 Prettier 忽略哪些文件？',
    faq6A: '创建 .prettierignore 文件，包含构建输出、依赖、生成文件、锁文件和第三方代码的模式。',
    faq7Q: 'Prettier 和 Biome 有什么区别？',
    faq7A: 'Prettier 是基于 JavaScript 的格式化工具，支持 20+ 语言，是行业标准。Biome 是基于 Rust 的工具链，更快但支持的语言更少。',
    faq8Q: '如何只格式化更改的文件？',
    faq8A: '使用 lint-staged 配合预提交钩子仅格式化暂存文件。手动格式化时可将 git diff 输出传递给 Prettier。',
  },
};

export default function PrettierGuide({ lang }: { lang: string }) {
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

      {/* What Is Prettier */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>
      <p style={para}>{t.whatIsDesc3}</p>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Install}</h2>
      <p style={para}>{t.installDesc}</p>
      <pre style={codeBlock}><code>{'# Install Prettier as a dev dependency\n'
        + 'npm install --save-dev prettier\n'
        + '\n'
        + '# Or with yarn\n'
        + 'yarn add --dev prettier\n'
        + '\n'
        + '# Or with pnpm\n'
        + 'pnpm add --save-dev prettier\n'
        + '\n'
        + '# Or with bun\n'
        + 'bun add --dev prettier'}</code></pre>
      <p style={para}>{t.installDesc2}</p>
      <pre style={codeBlock}><code>{'# Format all files in the current directory\n'
        + 'npx prettier --write .\n'
        + '\n'
        + '# Check if files are formatted (no changes made)\n'
        + 'npx prettier --check .\n'
        + '\n'
        + '# Format specific file types\n'
        + 'npx prettier --write "src/**/*.{ts,tsx,js,jsx}"\n'
        + 'npx prettier --write "**/*.{css,scss,less}"\n'
        + 'npx prettier --write "**/*.{json,md,yaml,yml}"\n'
        + '\n'
        + '# Format a single file\n'
        + 'npx prettier --write src/app.tsx\n'
        + '\n'
        + '# Output formatted code to stdout (no file changes)\n'
        + 'npx prettier src/app.tsx'}</code></pre>

      {/* Configuration */}
      <h2 style={sectionTitle}>{t.h2Config}</h2>
      <p style={para}>{t.configDesc}</p>
      <p style={para}>{t.configDesc2}</p>
      <pre style={codeBlock}><code>{'// .prettierrc (JSON format - most common)\n'
        + '{\n'
        + '  "printWidth": 100,\n'
        + '  "tabWidth": 2,\n'
        + '  "useTabs": false,\n'
        + '  "semi": true,\n'
        + '  "singleQuote": true,\n'
        + '  "trailingComma": "all",\n'
        + '  "bracketSpacing": true,\n'
        + '  "arrowParens": "always",\n'
        + '  "endOfLine": "lf"\n'
        + '}'}</code></pre>
      <pre style={codeBlock}><code>{'# .prettierrc (YAML format)\n'
        + 'printWidth: 100\n'
        + 'tabWidth: 2\n'
        + 'useTabs: false\n'
        + 'semi: true\n'
        + 'singleQuote: true\n'
        + 'trailingComma: all\n'
        + 'bracketSpacing: true\n'
        + 'arrowParens: always\n'
        + 'endOfLine: lf'}</code></pre>
      <pre style={codeBlock}><code>{'// prettier.config.mjs (ES module format)\n'
        + '/** @type {import("prettier").Config} */\n'
        + 'const config = {\n'
        + '  printWidth: 100,\n'
        + '  tabWidth: 2,\n'
        + '  singleQuote: true,\n'
        + '  trailingComma: "all",\n'
        + '  arrowParens: "always",\n'
        + '  plugins: ["prettier-plugin-tailwindcss"],\n'
        + '};\n'
        + '\n'
        + 'export default config;'}</code></pre>

      {/* Options Table */}
      <h2 style={sectionTitle}>{t.h2Options}</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.optCol1}</th>
              <th style={headerCell}>{t.optCol2}</th>
              <th style={headerCell}>{t.optCol3}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.optRow1, t.optRow1V2, t.optRow1V3],
              [t.optRow2, t.optRow2V2, t.optRow2V3],
              [t.optRow3, t.optRow3V2, t.optRow3V3],
              [t.optRow4, t.optRow4V2, t.optRow4V3],
              [t.optRow5, t.optRow5V2, t.optRow5V3],
              [t.optRow6, t.optRow6V2, t.optRow6V3],
              [t.optRow7, t.optRow7V2, t.optRow7V3],
              [t.optRow8, t.optRow8V2, t.optRow8V3],
              [t.optRow9, t.optRow9V2, t.optRow9V3],
              [t.optRow10, t.optRow10V2, t.optRow10V3],
              [t.optRow11, t.optRow11V2, t.optRow11V3],
              [t.optRow12, t.optRow12V2, t.optRow12V3],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ ...cellStyle, fontFamily: j === 0 ? 'monospace' : 'inherit' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ignoring Files */}
      <h2 style={sectionTitle}>{t.h2Ignore}</h2>
      <p style={para}>{t.ignoreDesc}</p>
      <pre style={codeBlock}><code>{'# .prettierignore\n'
        + '\n'
        + '# Build output\n'
        + 'dist/\n'
        + 'build/\n'
        + '.next/\n'
        + 'out/\n'
        + '\n'
        + '# Dependencies\n'
        + 'node_modules/\n'
        + '\n'
        + '# Lock files\n'
        + 'package-lock.json\n'
        + 'yarn.lock\n'
        + 'pnpm-lock.yaml\n'
        + '\n'
        + '# Generated files\n'
        + '*.min.js\n'
        + '*.min.css\n'
        + '*.generated.*\n'
        + 'coverage/\n'
        + '\n'
        + '# Environment files\n'
        + '.env\n'
        + '.env.*\n'
        + '\n'
        + '# Public assets\n'
        + 'public/\n'
        + 'static/'}</code></pre>
      <p style={para}>{t.ignoreDesc2}</p>
      <pre style={codeBlock}><code>{'// prettier-ignore - ignores the next node\n'
        + 'const matrix = [\n'
        + '  // prettier-ignore\n'
        + '  [1, 0, 0,\n'
        + '   0, 1, 0,\n'
        + '   0, 0, 1],\n'
        + '];\n'
        + '\n'
        + '/* In HTML: */\n'
        + '<!-- prettier-ignore -->\n'
        + '<div   class="custom-alignment"   data-value="keep"  >\n'
        + '  Content here\n'
        + '</div>\n'
        + '\n'
        + '/* In CSS: */\n'
        + '/* prettier-ignore */\n'
        + '.my-class    { color:   red; }\n'
        + '\n'
        + '/* In Markdown: */\n'
        + '<!-- prettier-ignore-start -->\n'
        + '| Column 1    | Column 2    | Column 3    |\n'
        + '| ----------- | ----------- | ----------- |\n'
        + '| Aligned     | Content     | Here        |\n'
        + '<!-- prettier-ignore-end -->'}</code></pre>

      {/* ESLint Integration */}
      <h2 style={sectionTitle}>{t.h2ESLint}</h2>
      <p style={para}>{t.eslintDesc}</p>
      <p style={para}>{t.eslintDesc2}</p>
      <pre style={codeBlock}><code>{'# Install eslint-config-prettier\n'
        + 'npm install --save-dev eslint-config-prettier'}</code></pre>
      <pre style={codeBlock}><code>{'// eslint.config.js - ESLint + Prettier (flat config)\n'
        + 'import js from "@eslint/js";\n'
        + 'import tseslint from "typescript-eslint";\n'
        + 'import prettierConfig from "eslint-config-prettier";\n'
        + '\n'
        + 'export default [\n'
        + '  js.configs.recommended,\n'
        + '  ...tseslint.configs.recommended,\n'
        + '\n'
        + '  // Custom code quality rules\n'
        + '  {\n'
        + '    rules: {\n'
        + '      "no-unused-vars": "warn",\n'
        + '      "prefer-const": "error",\n'
        + '      "no-console": ["error", { allow: ["warn", "error"] }],\n'
        + '    },\n'
        + '  },\n'
        + '\n'
        + '  // MUST be last: disables formatting rules that conflict with Prettier\n'
        + '  prettierConfig,\n'
        + '];'}</code></pre>
      <p style={para}>{t.eslintDesc3}</p>
      <pre style={codeBlock}><code>{'// package.json - Run ESLint and Prettier as separate scripts\n'
        + '{\n'
        + '  "scripts": {\n'
        + '    "lint": "eslint src/",\n'
        + '    "lint:fix": "eslint --fix src/",\n'
        + '    "format": "prettier --write .",\n'
        + '    "format:check": "prettier --check .",\n'
        + '    "check": "npm run lint && npm run format:check"\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Editor Integration */}
      <h2 style={sectionTitle}>{t.h2Editor}</h2>
      <p style={para}>{t.editorDesc}</p>

      <h3 style={subTitle}>{t.h3VSCode}</h3>
      <p style={para}>{t.vscodeDesc}</p>
      <pre style={codeBlock}><code>{'// .vscode/settings.json\n'
        + '{\n'
        + '  // Set Prettier as the default formatter\n'
        + '  "editor.defaultFormatter": "esbenp.prettier-vscode",\n'
        + '\n'
        + '  // Format on save\n'
        + '  "editor.formatOnSave": true,\n'
        + '\n'
        + '  // Per-language formatter overrides\n'
        + '  "[javascript]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[typescript]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[typescriptreact]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[json]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[css]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[html]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  },\n'
        + '  "[markdown]": {\n'
        + '    "editor.defaultFormatter": "esbenp.prettier-vscode"\n'
        + '  }\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3JetBrains}</h3>
      <p style={para}>{t.jetbrainsDesc}</p>
      <pre style={codeBlock}><code>{'// JetBrains Prettier settings path:\n'
        + '// Settings > Languages & Frameworks > JavaScript > Prettier\n'
        + '//\n'
        + '// Configuration:\n'
        + '// - Prettier package: ~/project/node_modules/prettier\n'
        + '// - Run for files: **/*.{js,ts,jsx,tsx,css,scss,json,md,yaml,yml,html}\n'
        + '// - [x] On Save\n'
        + '// - [x] On Reformat Code (Ctrl+Alt+L / Cmd+Opt+L)'}</code></pre>

      <h3 style={subTitle}>{t.h3Vim}</h3>
      <p style={para}>{t.vimDesc}</p>
      <pre style={codeBlock}><code>{'-- Neovim with conform.nvim (recommended)\n'
        + '-- ~/.config/nvim/lua/plugins/formatting.lua\n'
        + 'return {\n'
        + '  "stevearc/conform.nvim",\n'
        + '  opts = {\n'
        + '    formatters_by_ft = {\n'
        + '      javascript = { "prettier" },\n'
        + '      typescript = { "prettier" },\n'
        + '      typescriptreact = { "prettier" },\n'
        + '      css = { "prettier" },\n'
        + '      html = { "prettier" },\n'
        + '      json = { "prettier" },\n'
        + '      yaml = { "prettier" },\n'
        + '      markdown = { "prettier" },\n'
        + '    },\n'
        + '    format_on_save = {\n'
        + '      timeout_ms = 3000,\n'
        + '      lsp_fallback = true,\n'
        + '    },\n'
        + '  },\n'
        + '}'}</code></pre>

      {/* Pre-commit Hooks */}
      <h2 style={sectionTitle}>{t.h2PreCommit}</h2>
      <p style={para}>{t.preCommitDesc}</p>
      <pre style={codeBlock}><code>{'# Step 1: Install husky and lint-staged\n'
        + 'npm install --save-dev husky lint-staged\n'
        + '\n'
        + '# Step 2: Initialize husky\n'
        + 'npx husky init\n'
        + '\n'
        + '# Step 3: Update the pre-commit hook\n'
        + 'echo "npx lint-staged" > .husky/pre-commit'}</code></pre>
      <pre style={codeBlock}><code>{'// package.json - lint-staged configuration\n'
        + '{\n'
        + '  "lint-staged": {\n'
        + '    "*.{js,jsx,ts,tsx}": [\n'
        + '      "prettier --write",\n'
        + '      "eslint --fix"\n'
        + '    ],\n'
        + '    "*.{css,scss,less}": [\n'
        + '      "prettier --write"\n'
        + '    ],\n'
        + '    "*.{json,md,yaml,yml,html}": [\n'
        + '      "prettier --write"\n'
        + '    ]\n'
        + '  }\n'
        + '}'}</code></pre>
      <p style={para}>{t.preCommitDesc2}</p>

      {/* CI/CD Integration */}
      <h2 style={sectionTitle}>{t.h2CICD}</h2>
      <p style={para}>{t.cicdDesc}</p>
      <pre style={codeBlock}><code>{'# .github/workflows/format-check.yml\n'
        + 'name: Format Check\n'
        + '\n'
        + 'on:\n'
        + '  push:\n'
        + '    branches: [main]\n'
        + '  pull_request:\n'
        + '    branches: [main]\n'
        + '\n'
        + 'jobs:\n'
        + '  format:\n'
        + '    runs-on: ubuntu-latest\n'
        + '    steps:\n'
        + '      - uses: actions/checkout@v4\n'
        + '\n'
        + '      - uses: actions/setup-node@v4\n'
        + '        with:\n'
        + '          node-version: 22\n'
        + '          cache: npm\n'
        + '\n'
        + '      - run: npm ci\n'
        + '\n'
        + '      - name: Check formatting\n'
        + '        run: npx prettier --check .\n'
        + '\n'
        + '      - name: Run ESLint\n'
        + '        run: npx eslint src/'}</code></pre>
      <p style={para}>{t.cicdDesc2}</p>
      <pre style={codeBlock}><code>{'# GitLab CI - .gitlab-ci.yml\n'
        + 'format-check:\n'
        + '  stage: test\n'
        + '  image: node:22\n'
        + '  cache:\n'
        + '    paths:\n'
        + '      - node_modules/\n'
        + '  script:\n'
        + '    - npm ci\n'
        + '    - npx prettier --check .\n'
        + '    - npx eslint src/'}</code></pre>

      {/* Plugins */}
      <h2 style={sectionTitle}>{t.h2Plugins}</h2>
      <p style={para}>{t.pluginsDesc}</p>
      <pre style={codeBlock}><code>{'# Install popular Prettier plugins\n'
        + '\n'
        + '# Tailwind CSS - sorts Tailwind classes automatically\n'
        + 'npm install --save-dev prettier-plugin-tailwindcss\n'
        + '\n'
        + '# Sort imports\n'
        + 'npm install --save-dev @trivago/prettier-plugin-sort-imports\n'
        + '\n'
        + '# PHP formatting\n'
        + 'npm install --save-dev @prettier/plugin-php\n'
        + '\n'
        + '# XML formatting\n'
        + 'npm install --save-dev @prettier/plugin-xml\n'
        + '\n'
        + '# SQL formatting\n'
        + 'npm install --save-dev prettier-plugin-sql'}</code></pre>
      <p style={para}>{t.pluginsDesc2}</p>
      <pre style={codeBlock}><code>{'// .prettierrc - with plugins configured\n'
        + '{\n'
        + '  "printWidth": 100,\n'
        + '  "singleQuote": true,\n'
        + '  "trailingComma": "all",\n'
        + '  "plugins": [\n'
        + '    "prettier-plugin-tailwindcss",\n'
        + '    "@trivago/prettier-plugin-sort-imports"\n'
        + '  ],\n'
        + '  "importOrder": [\n'
        + '    "^react",\n'
        + '    "^next",\n'
        + '    "<THIRD_PARTY_MODULES>",\n'
        + '    "^@/(.*)$",\n'
        + '    "^[./]"\n'
        + '  ],\n'
        + '  "importOrderSeparation": true,\n'
        + '  "importOrderSortSpecifiers": true\n'
        + '}'}</code></pre>

      {/* Opinionated Philosophy */}
      <h2 style={sectionTitle}>{t.h2Philosophy}</h2>
      <p style={para}>{t.philDesc}</p>
      <p style={para}>{t.philDesc2}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.philList1}</li>
        <li style={listItem}>{t.philList2}</li>
        <li style={listItem}>{t.philList3}</li>
        <li style={listItem}>{t.philList4}</li>
        <li style={listItem}>{t.philList5}</li>
      </ul>

      {/* Per-File Overrides */}
      <h2 style={sectionTitle}>{t.h2Overrides}</h2>
      <p style={para}>{t.overridesDesc}</p>
      <pre style={codeBlock}><code>{'// .prettierrc - with per-file overrides\n'
        + '{\n'
        + '  "printWidth": 80,\n'
        + '  "singleQuote": true,\n'
        + '  "trailingComma": "all",\n'
        + '  "overrides": [\n'
        + '    {\n'
        + '      "files": "*.html",\n'
        + '      "options": {\n'
        + '        "printWidth": 120\n'
        + '      }\n'
        + '    },\n'
        + '    {\n'
        + '      "files": "*.md",\n'
        + '      "options": {\n'
        + '        "proseWrap": "always",\n'
        + '        "printWidth": 80\n'
        + '      }\n'
        + '    },\n'
        + '    {\n'
        + '      "files": ["*.json", "*.jsonc"],\n'
        + '      "options": {\n'
        + '        "tabWidth": 4\n'
        + '      }\n'
        + '    },\n'
        + '    {\n'
        + '      "files": "*.css",\n'
        + '      "options": {\n'
        + '        "singleQuote": false\n'
        + '      }\n'
        + '    }\n'
        + '  ]\n'
        + '}'}</code></pre>

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

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <pre style={codeBlock}><code>{'# Step 1: Install Prettier\n'
        + 'npm install --save-dev prettier\n'
        + '\n'
        + '# Step 2: Create minimal config\n'
        + 'echo \'{ "singleQuote": true, "trailingComma": "all" }\' > .prettierrc\n'
        + '\n'
        + '# Step 3: Create .prettierignore\n'
        + 'echo "dist/\\nbuild/\\nnode_modules/\\npackage-lock.json" > .prettierignore\n'
        + '\n'
        + '# Step 4: Format entire codebase\n'
        + 'npx prettier --write .\n'
        + '\n'
        + '# Step 5: Commit the formatting change\n'
        + 'git add -A\n'
        + 'git commit -m "style: format codebase with Prettier"'}</code></pre>
      <p style={para}>{t.migrationDesc2}</p>
      <pre style={codeBlock}><code>{'# .git-blame-ignore-revs\n'
        + '# Prettier initial formatting\n'
        + 'abc123def456789...\n'
        + '\n'
        + '# Tell git to use this file\n'
        + 'git config blame.ignoreRevsFile .git-blame-ignore-revs\n'
        + '\n'
        + '# GitHub automatically reads .git-blame-ignore-revs\n'
        + '# so the formatting commit is hidden in blame views'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <p style={para}>{t.bestPracticesDesc}</p>
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
