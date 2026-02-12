'use client';

import React from 'react';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'TOML (Tom\'s Obvious Minimal Language) is a configuration file format designed to be <strong>easy to read</strong> thanks to its obvious semantics. Created by Tom Preston-Werner (GitHub co-founder) in 2013, TOML maps unambiguously to a hash table and is now the standard config format for Rust, Python, and many other tools. This comprehensive <strong>TOML syntax</strong> guide covers every feature with practical examples.',
    linkTomlYaml: 'Convert between TOML and YAML instantly with our free tool \u2192',
    linkJsonYaml: 'Convert between JSON and YAML with our free tool \u2192',

    h2WhatIsToml: '1. What Is TOML?',
    whatIsTomlDesc: 'TOML stands for <strong>Tom\'s Obvious Minimal Language</strong>. It was created to be a minimal configuration file format that is easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table and should be easy to parse into data structures in a wide variety of languages.',
    whatIsTomlGoals: 'TOML\'s design goals are:',
    whatIsTomlGoalsList: '<ul><li><strong>Minimal</strong> \u2014 the spec is intentionally small and stable</li><li><strong>Obvious</strong> \u2014 semantics are clear; no implicit type coercion like YAML</li><li><strong>Unambiguous</strong> \u2014 every valid TOML document has exactly one meaning</li><li><strong>Hash-table friendly</strong> \u2014 maps directly to dictionaries/objects/maps</li></ul>',
    whatIsTomlVs: 'Compared to JSON, TOML supports comments, native date/time types, and multiline strings. Compared to YAML, TOML avoids the pitfalls of implicit type coercion (the infamous "Norway problem" where <code>NO</code> becomes <code>false</code>) and indentation-sensitivity. TOML reached <strong>v1.0.0</strong> in January 2021, making it a stable specification.',

    h2BasicTypes: '2. Basic Data Types',
    basicTypesDesc: 'TOML supports seven data types natively. Each value must be one of these types:',

    h3Strings: 'Strings',
    stringsDesc: 'TOML has four kinds of strings: basic, multi-line basic, literal, and multi-line literal.',

    h3Integers: 'Integers',
    integersDesc: 'Integers are whole numbers. Underscores can be used for readability. Hexadecimal, octal, and binary representations are also supported.',

    h3Floats: 'Floats',
    floatsDesc: 'Floating-point numbers follow IEEE 754. Special values <code>inf</code>, <code>+inf</code>, <code>-inf</code>, and <code>nan</code> are supported.',

    h3Booleans: 'Booleans',
    booleansDesc: 'Booleans are just what you expect \u2014 lowercase <code>true</code> and <code>false</code>. Unlike YAML, TOML does NOT accept <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> as booleans.',

    h3Dates: 'Date & Time',
    datesDesc: 'TOML has first-class date/time support with four types: offset datetime, local datetime, local date, and local time. All follow RFC 3339.',

    h2Tables: '3. Tables',
    tablesDesc: 'Tables (also known as hash tables or dictionaries) are collections of key/value pairs. They appear in square brackets on a line by themselves. All key/value pairs after a table header belong to that table until the next table header.',
    tablesInlineDesc: '<strong>Inline tables</strong> provide a compact syntax for simple tables. They must appear on a single line:',
    tablesDottedDesc: '<strong>Dotted keys</strong> allow defining nested tables without explicit headers:',

    h2Arrays: '4. Arrays',
    arraysDesc: 'Arrays are ordered lists of values enclosed in square brackets. Arrays can contain values of the same type or mixed types (as of TOML v1.0).',
    arraysOfTablesDesc: '<strong>Array of tables</strong> are defined using double brackets <code>[[array]]</code>. Each use of the double bracket adds an element to the array:',

    h2StringTypes: '5. String Types in Detail',
    stringTypesDesc: 'TOML provides four types of strings to handle every use case:',
    stringBasic: '<strong>Basic strings</strong> are surrounded by double quotes (<code>"</code>). Escape sequences like <code>\\n</code>, <code>\\t</code>, <code>\\\\</code>, <code>\\u0041</code> are supported.',
    stringLiteral: '<strong>Literal strings</strong> are surrounded by single quotes (<code>\'</code>). No escaping is performed \u2014 what you see is what you get. Perfect for Windows paths and regex.',
    stringMultiBasic: '<strong>Multi-line basic strings</strong> are surrounded by three double quotes (<code>"""</code>). Newlines are preserved. A backslash at the end of a line trims the newline and subsequent whitespace.',
    stringMultiLiteral: '<strong>Multi-line literal strings</strong> are surrounded by three single quotes (<code>\'\'\'</code>). No escaping, newlines preserved.',

    h2DateTime: '6. Date & Time Types',
    dateTimeDesc: 'TOML has native support for four date/time formats, all based on RFC 3339:',
    dateOffset: '<strong>Offset Date-Time</strong> \u2014 a full timestamp with timezone offset:',
    dateLocal: '<strong>Local Date-Time</strong> \u2014 no timezone information:',
    dateOnly: '<strong>Local Date</strong> \u2014 just the date:',
    timeOnly: '<strong>Local Time</strong> \u2014 just the time:',

    h2Comments: '7. Comments',
    commentsDesc: 'TOML supports single-line comments using the hash symbol (<code>#</code>). Comments run from the <code>#</code> character to the end of the line. TOML does <strong>not</strong> support multi-line comments \u2014 each line must start with its own <code>#</code>.',
    commentsNote: 'Comments can appear at the end of a line after a value, or on their own line. They cannot appear inside strings.',

    h2Cargo: '8. Cargo.toml \u2014 Rust Package Management',
    cargoDesc: '<code>Cargo.toml</code> is the manifest file for Rust projects. It defines the package metadata, dependencies, features, and build configuration. Understanding TOML syntax is essential for every Rust developer.',
    cargoSections: 'Key sections in Cargo.toml:',
    cargoSectionsList: '<ul><li><code>[package]</code> \u2014 name, version, edition, description, license</li><li><code>[dependencies]</code> \u2014 external crate dependencies</li><li><code>[dev-dependencies]</code> \u2014 dependencies for tests and examples only</li><li><code>[build-dependencies]</code> \u2014 dependencies for build scripts</li><li><code>[features]</code> \u2014 conditional compilation flags</li><li><code>[workspace]</code> \u2014 multi-package project configuration</li><li><code>[[bin]]</code> \u2014 binary targets (array of tables)</li></ul>',

    h2Pyproject: '9. pyproject.toml \u2014 Python Project Configuration',
    pyprojectDesc: '<code>pyproject.toml</code> is the standard configuration file for Python projects, defined in PEP 518 and PEP 621. It unifies build system configuration and tool settings into a single file, replacing <code>setup.py</code>, <code>setup.cfg</code>, and individual tool config files.',
    pyprojectSections: 'Common sections:',
    pyprojectSectionsList: '<ul><li><code>[build-system]</code> \u2014 build backend specification (setuptools, hatch, poetry, etc.)</li><li><code>[project]</code> \u2014 project metadata (name, version, dependencies, Python version)</li><li><code>[tool.ruff]</code> \u2014 Ruff linter configuration</li><li><code>[tool.black]</code> \u2014 Black formatter configuration</li><li><code>[tool.pytest.ini_options]</code> \u2014 pytest settings</li><li><code>[tool.mypy]</code> \u2014 mypy type checker settings</li><li><code>[tool.poetry]</code> \u2014 Poetry-specific package management</li></ul>',

    h2OtherConfigs: '10. Other Notable TOML Configurations',
    otherConfigsDesc: 'TOML is used by many tools and platforms beyond Rust and Python:',
    otherHugo: '<strong>Hugo</strong> \u2014 the popular static site generator uses <code>hugo.toml</code> (formerly <code>config.toml</code>) as its primary configuration format. Hugo supports TOML, YAML, and JSON, but TOML is the default and most common choice.',
    otherDeno: '<strong>Deno</strong> \u2014 the modern JavaScript/TypeScript runtime supports <code>deno.toml</code> alongside <code>deno.json</code> for project configuration. The TOML variant offers comments support, which JSON lacks.',
    otherTaplo: '<strong>Taplo</strong> \u2014 a TOML toolkit that includes a formatter, validator, and language server. It provides IDE support for TOML files in VS Code and other editors via <code>taplo.toml</code> configuration.',
    otherGitCliff: '<strong>git-cliff</strong> \u2014 a changelog generator configured via <code>cliff.toml</code>.',
    otherStarship: '<strong>Starship</strong> \u2014 the cross-shell prompt uses <code>starship.toml</code> for customization.',
    otherAlacritty: '<strong>Alacritty</strong> \u2014 the GPU-accelerated terminal emulator uses <code>alacritty.toml</code> for its configuration (migrated from YAML in 2023).',

    h2Comparison: '11. TOML vs YAML vs JSON',
    comparisonDesc: 'Here is a side-by-side comparison to help you decide which format to use:',
    compFeature: 'Feature',
    compToml: 'TOML',
    compYaml: 'YAML',
    compJson: 'JSON',
    compComments: 'Comments',
    compCommentsToml: 'Yes (#)',
    compCommentsYaml: 'Yes (#)',
    compCommentsJson: 'No',
    compTypes: 'Native Date/Time',
    compTypesToml: 'Yes (RFC 3339)',
    compTypesYaml: 'Yes (implicit)',
    compTypesJson: 'No (string only)',
    compNesting: 'Deep Nesting',
    compNestingToml: 'Verbose (table headers)',
    compNestingYaml: 'Elegant (indentation)',
    compNestingJson: 'Good (braces)',
    compAmbiguity: 'Ambiguity',
    compAmbiguityToml: 'None',
    compAmbiguityYaml: 'High (implicit coercion)',
    compAmbiguityJson: 'None',
    compMultiline: 'Multiline Strings',
    compMultilineToml: 'Yes (""" and \'\'\')',
    compMultilineYaml: 'Yes (| and >)',
    compMultilineJson: 'No (\\n only)',
    compEcosystem: 'Primary Ecosystem',
    compEcosystemToml: 'Rust, Python, Go',
    compEcosystemYaml: 'DevOps, K8s, Ansible',
    compEcosystemJson: 'Web APIs, Node.js',
    compSpec: 'Spec Size',
    compSpecToml: 'Small (~3k words)',
    compSpecYaml: 'Large (~80 pages)',
    compSpecJson: 'Tiny (~600 words)',

    h2Faq: '12. Frequently Asked Questions',
    faq1Q: 'What is the difference between TOML and INI files?',
    faq1A: 'While TOML looks similar to INI files with its [section] headers, TOML is a well-defined specification with strict typing, nested tables, arrays, date/time support, and Unicode handling. INI files have no formal specification, leading to inconsistent parsing across implementations. TOML can be thought of as a modern, standardized evolution of the INI format.',
    faq2Q: 'Does TOML support null values?',
    faq2A: 'No, TOML intentionally does not support null/nil/None values. If a key is absent, it means the value is not set. This is a deliberate design choice to keep the format simple and unambiguous. If you need to represent "no value," simply omit the key entirely or use an empty string or a sentinel value in your application logic.',
    faq3Q: 'Can TOML files include or reference other TOML files?',
    faq3A: 'No, the TOML specification does not support file includes, imports, or references. Each TOML file is self-contained. If you need to split configuration across files, that logic must be implemented in your application. Some tools like Hugo support config directories where multiple TOML files are merged automatically.',
    faq4Q: 'What file extension should I use for TOML files?',
    faq4A: 'The standard file extension for TOML files is .toml. Well-known TOML files like Cargo.toml and pyproject.toml use this extension. Some tools use specific names without the .toml extension for historical reasons, but .toml is always recommended for new configurations.',
    faq5Q: 'How do I validate a TOML file?',
    faq5A: 'You can validate TOML files using several methods: (1) Use Taplo, a TOML toolkit with a CLI validator and VS Code extension; (2) Use online validators like toml-lint; (3) Use language-specific libraries like toml (Python), toml-rs (Rust), or @iarna/toml (Node.js) to parse and catch errors; (4) Use our online TOML to YAML converter which will report parse errors.',
  },
  zh: {
    intro: 'TOML（Tom 的明显最小化语言）是一种配置文件格式，因其语义明显而<strong>易于阅读</strong>。TOML 由 Tom Preston-Werner（GitHub 联合创始人）于 2013 年创建，能明确映射到哈希表，现已成为 Rust、Python 和许多其他工具的标准配置格式。本综合 <strong>TOML 语法</strong>指南通过实际示例涵盖了所有特性。',
    linkTomlYaml: '使用我们的免费工具在 TOML 和 YAML 之间即时转换 \u2192',
    linkJsonYaml: '使用我们的免费工具在 JSON 和 YAML 之间即时转换 \u2192',

    h2WhatIsToml: '1. 什么是 TOML？',
    whatIsTomlDesc: 'TOML 全称 <strong>Tom\'s Obvious Minimal Language</strong>（Tom 的明显最小化语言）。它被设计为一种最小化的配置文件格式，因语义明显而易于阅读。TOML 旨在能明确映射到哈希表，并且在各种编程语言中都易于解析为数据结构。',
    whatIsTomlGoals: 'TOML 的设计目标：',
    whatIsTomlGoalsList: '<ul><li><strong>最小化</strong> \u2014 规范刻意保持精简和稳定</li><li><strong>明显</strong> \u2014 语义清晰，不像 YAML 那样有隐式类型转换</li><li><strong>无歧义</strong> \u2014 每个有效的 TOML 文档都只有一种含义</li><li><strong>哈希表友好</strong> \u2014 能直接映射到字典/对象/映射</li></ul>',
    whatIsTomlVs: '与 JSON 相比，TOML 支持注释、原生日期/时间类型和多行字符串。与 YAML 相比，TOML 避免了隐式类型转换的陷阱（著名的"挪威问题"，即 <code>NO</code> 变成 <code>false</code>）和缩进敏感性。TOML 于 2021 年 1 月达到 <strong>v1.0.0</strong>，成为稳定的规范。',

    h2BasicTypes: '2. 基本数据类型',
    basicTypesDesc: 'TOML 原生支持七种数据类型。每个值必须是以下类型之一：',

    h3Strings: '字符串',
    stringsDesc: 'TOML 有四种字符串：基本字符串、多行基本字符串、字面量字符串和多行字面量字符串。',

    h3Integers: '整数',
    integersDesc: '整数是整数值。可以使用下划线提高可读性。也支持十六进制、八进制和二进制表示。',

    h3Floats: '浮点数',
    floatsDesc: '浮点数遵循 IEEE 754。支持特殊值 <code>inf</code>、<code>+inf</code>、<code>-inf</code> 和 <code>nan</code>。',

    h3Booleans: '布尔值',
    booleansDesc: '布尔值只有小写的 <code>true</code> 和 <code>false</code>。与 YAML 不同，TOML 不接受 <code>yes</code>、<code>no</code>、<code>on</code>、<code>off</code> 作为布尔值。',

    h3Dates: '日期和时间',
    datesDesc: 'TOML 对日期/时间有一等支持，包含四种类型：带偏移的日期时间、本地日期时间、本地日期和本地时间。全部遵循 RFC 3339。',

    h2Tables: '3. 表（Tables）',
    tablesDesc: '表（也称为哈希表或字典）是键/值对的集合。它们以方括号的形式单独出现在一行中。表头之后的所有键/值对都属于该表，直到下一个表头出现。',
    tablesInlineDesc: '<strong>内联表</strong>为简单表提供了紧凑的语法。它们必须出现在同一行中：',
    tablesDottedDesc: '<strong>点号键</strong>允许在不使用显式表头的情况下定义嵌套表：',

    h2Arrays: '4. 数组',
    arraysDesc: '数组是包含在方括号中的有序值列表。数组可以包含相同类型或混合类型的值（自 TOML v1.0 起）。',
    arraysOfTablesDesc: '<strong>表数组</strong>使用双括号 <code>[[array]]</code> 定义。每次使用双括号都会向数组添加一个元素：',

    h2StringTypes: '5. 字符串类型详解',
    stringTypesDesc: 'TOML 提供了四种字符串类型来处理各种场景：',
    stringBasic: '<strong>基本字符串</strong>用双引号（<code>"</code>）包围。支持转义序列如 <code>\\n</code>、<code>\\t</code>、<code>\\\\</code>、<code>\\u0041</code>。',
    stringLiteral: '<strong>字面量字符串</strong>用单引号（<code>\'</code>）包围。不进行任何转义 \u2014 所见即所得。非常适合 Windows 路径和正则表达式。',
    stringMultiBasic: '<strong>多行基本字符串</strong>用三个双引号（<code>"""</code>）包围。换行符被保留。行尾的反斜杠会裁剪换行符和后续空白。',
    stringMultiLiteral: '<strong>多行字面量字符串</strong>用三个单引号（<code>\'\'\'</code>）包围。不转义，换行符被保留。',

    h2DateTime: '6. 日期和时间类型',
    dateTimeDesc: 'TOML 原生支持四种日期/时间格式，全部基于 RFC 3339：',
    dateOffset: '<strong>带偏移的日期时间</strong> \u2014 完整的带时区偏移的时间戳：',
    dateLocal: '<strong>本地日期时间</strong> \u2014 不包含时区信息：',
    dateOnly: '<strong>本地日期</strong> \u2014 仅日期：',
    timeOnly: '<strong>本地时间</strong> \u2014 仅时间：',

    h2Comments: '7. 注释',
    commentsDesc: 'TOML 使用井号（<code>#</code>）支持单行注释。注释从 <code>#</code> 字符开始到行尾结束。TOML <strong>不支持</strong>多行注释 \u2014 每一行都需要自己的 <code>#</code>。',
    commentsNote: '注释可以出现在值后面的行尾，也可以独占一行。不能出现在字符串内部。',

    h2Cargo: '8. Cargo.toml \u2014 Rust 包管理',
    cargoDesc: '<code>Cargo.toml</code> 是 Rust 项目的清单文件。它定义了包的元数据、依赖项、特性和构建配置。理解 TOML 语法对每个 Rust 开发者来说都是必不可少的。',
    cargoSections: 'Cargo.toml 的关键段落：',
    cargoSectionsList: '<ul><li><code>[package]</code> \u2014 名称、版本、版次、描述、许可证</li><li><code>[dependencies]</code> \u2014 外部 crate 依赖</li><li><code>[dev-dependencies]</code> \u2014 仅用于测试和示例的依赖</li><li><code>[build-dependencies]</code> \u2014 构建脚本的依赖</li><li><code>[features]</code> \u2014 条件编译标志</li><li><code>[workspace]</code> \u2014 多包项目配置</li><li><code>[[bin]]</code> \u2014 二进制目标（表数组）</li></ul>',

    h2Pyproject: '9. pyproject.toml \u2014 Python 项目配置',
    pyprojectDesc: '<code>pyproject.toml</code> 是 Python 项目的标准配置文件，定义在 PEP 518 和 PEP 621 中。它将构建系统配置和工具设置统一到一个文件中，取代了 <code>setup.py</code>、<code>setup.cfg</code> 和各个工具的独立配置文件。',
    pyprojectSections: '常见段落：',
    pyprojectSectionsList: '<ul><li><code>[build-system]</code> \u2014 构建后端规范（setuptools、hatch、poetry 等）</li><li><code>[project]</code> \u2014 项目元数据（名称、版本、依赖、Python 版本）</li><li><code>[tool.ruff]</code> \u2014 Ruff 代码检查器配置</li><li><code>[tool.black]</code> \u2014 Black 格式化器配置</li><li><code>[tool.pytest.ini_options]</code> \u2014 pytest 设置</li><li><code>[tool.mypy]</code> \u2014 mypy 类型检查器设置</li><li><code>[tool.poetry]</code> \u2014 Poetry 特定的包管理</li></ul>',

    h2OtherConfigs: '10. 其他值得注意的 TOML 配置',
    otherConfigsDesc: 'TOML 被 Rust 和 Python 之外的许多工具和平台使用：',
    otherHugo: '<strong>Hugo</strong> \u2014 流行的静态网站生成器使用 <code>hugo.toml</code>（原 <code>config.toml</code>）作为主要配置格式。Hugo 支持 TOML、YAML 和 JSON，但 TOML 是默认且最常用的选择。',
    otherDeno: '<strong>Deno</strong> \u2014 现代 JavaScript/TypeScript 运行时支持 <code>deno.toml</code> 和 <code>deno.json</code> 用于项目配置。TOML 变体支持注释，而 JSON 不支持。',
    otherTaplo: '<strong>Taplo</strong> \u2014 一个 TOML 工具包，包含格式化器、验证器和语言服务器。它通过 <code>taplo.toml</code> 配置为 VS Code 和其他编辑器中的 TOML 文件提供 IDE 支持。',
    otherGitCliff: '<strong>git-cliff</strong> \u2014 通过 <code>cliff.toml</code> 配置的变更日志生成器。',
    otherStarship: '<strong>Starship</strong> \u2014 跨 Shell 提示符使用 <code>starship.toml</code> 进行自定义。',
    otherAlacritty: '<strong>Alacritty</strong> \u2014 GPU 加速终端模拟器使用 <code>alacritty.toml</code> 作为配置文件（2023 年从 YAML 迁移）。',

    h2Comparison: '11. TOML vs YAML vs JSON',
    comparisonDesc: '以下是并排对比，帮助你决定使用哪种格式：',
    compFeature: '特性',
    compToml: 'TOML',
    compYaml: 'YAML',
    compJson: 'JSON',
    compComments: '注释',
    compCommentsToml: '支持（#）',
    compCommentsYaml: '支持（#）',
    compCommentsJson: '不支持',
    compTypes: '原生日期/时间',
    compTypesToml: '支持（RFC 3339）',
    compTypesYaml: '支持（隐式）',
    compTypesJson: '不支持（仅字符串）',
    compNesting: '深层嵌套',
    compNestingToml: '较冗长（表头）',
    compNestingYaml: '优雅（缩进）',
    compNestingJson: '良好（大括号）',
    compAmbiguity: '歧义性',
    compAmbiguityToml: '无',
    compAmbiguityYaml: '高（隐式转换）',
    compAmbiguityJson: '无',
    compMultiline: '多行字符串',
    compMultilineToml: '支持（""" 和 \'\'\'）',
    compMultilineYaml: '支持（| 和 >）',
    compMultilineJson: '不支持（仅 \\n）',
    compEcosystem: '主要生态',
    compEcosystemToml: 'Rust、Python、Go',
    compEcosystemYaml: 'DevOps、K8s、Ansible',
    compEcosystemJson: 'Web API、Node.js',
    compSpec: '规范大小',
    compSpecToml: '小（约 3000 词）',
    compSpecYaml: '大（约 80 页）',
    compSpecJson: '极小（约 600 词）',

    h2Faq: '12. 常见问题',
    faq1Q: 'TOML 和 INI 文件有什么区别？',
    faq1A: '虽然 TOML 的 [section] 头部看起来类似于 INI 文件，但 TOML 是一个定义良好的规范，具有严格的类型系统、嵌套表、数组、日期/时间支持和 Unicode 处理。INI 文件没有正式规范，导致不同实现之间的解析不一致。TOML 可以被认为是 INI 格式的现代标准化演进。',
    faq2Q: 'TOML 支持 null 值吗？',
    faq2A: '不支持，TOML 有意不支持 null/nil/None 值。如果一个键不存在，就意味着该值未设置。这是一个刻意的设计选择，旨在保持格式的简单和无歧义。如果需要表示"无值"，只需完全省略该键，或在应用逻辑中使用空字符串或哨兵值。',
    faq3Q: 'TOML 文件可以引用或包含其他 TOML 文件吗？',
    faq3A: '不可以，TOML 规范不支持文件包含、导入或引用。每个 TOML 文件都是自包含的。如果需要将配置分散到多个文件中，该逻辑必须在应用程序中实现。一些工具如 Hugo 支持配置目录，可以自动合并多个 TOML 文件。',
    faq4Q: 'TOML 文件应该使用什么扩展名？',
    faq4A: 'TOML 文件的标准扩展名是 .toml。知名的 TOML 文件如 Cargo.toml 和 pyproject.toml 都使用此扩展名。由于历史原因，某些工具使用不带 .toml 扩展名的特定名称，但 .toml 始终是新配置的推荐选择。',
    faq5Q: '如何验证 TOML 文件？',
    faq5A: '可以使用多种方法验证 TOML 文件：(1) 使用 Taplo，一个带有 CLI 验证器和 VS Code 扩展的 TOML 工具包；(2) 使用在线验证器如 toml-lint；(3) 使用特定语言的库如 toml（Python）、toml-rs（Rust）或 @iarna/toml（Node.js）进行解析并捕获错误；(4) 使用我们的在线 TOML 转 YAML 转换器，它会报告解析错误。',
  },
};

export default function TomlSyntaxConfigGuide({ lang }: { lang: string }) {
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1A } },
      { '@type': 'Question', name: ct.faq2Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2A } },
      { '@type': 'Question', name: ct.faq3Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3A } },
      { '@type': 'Question', name: ct.faq4Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4A } },
      { '@type': 'Question', name: ct.faq5Q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5A } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: ct.intro }} />
      <p>
        <Link href={`/${lang}/tools/toml-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkTomlYaml}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkJsonYaml}
        </Link>
      </p>

      {/* ===== Section 1: What Is TOML ===== */}
      <h2>{ct.h2WhatIsToml}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.whatIsTomlDesc }} />
      <p>{ct.whatIsTomlGoals}</p>
      <div dangerouslySetInnerHTML={{ __html: ct.whatIsTomlGoalsList }} />
      <p dangerouslySetInnerHTML={{ __html: ct.whatIsTomlVs }} />

      <pre><code>{`# example.toml — a simple TOML configuration
title = "My Application"

[owner]
name = "Tom Preston-Werner"
dob = 1979-05-27T07:32:00-08:00

[database]
enabled = true
ports = [8001, 8001, 8002]
data = [["delta", "phi"], [3.14]]
temp_targets = { cpu = 79.5, case = 72.0 }`}</code></pre>

      {/* ===== Section 2: Basic Data Types ===== */}
      <h2>{ct.h2BasicTypes}</h2>
      <p>{ct.basicTypesDesc}</p>

      <h3>{ct.h3Strings}</h3>
      <p>{ct.stringsDesc}</p>
      <pre><code>{`# Basic string — supports escape sequences
name = "Tom Preston-Werner"
escaped = "Line 1\\nLine 2\\tTabbed"
unicode = "\\u03B1 is alpha"

# Literal string — no escaping
winpath = 'C:\\Users\\Tom\\config'
regex = '<\\i\\c*\\s*>'

# Multi-line basic string
bio = """
Roses are red,
Violets are blue.\\
  This line is joined."""

# Multi-line literal string
regex2 = '''
I [dw]on't need \\d{2} escapes
'''`}</code></pre>

      <h3>{ct.h3Integers}</h3>
      <p>{ct.integersDesc}</p>
      <pre><code>{`# Integers
int1 = +99
int2 = 42
int3 = 0
int4 = -17

# Underscores for readability
big_number = 1_000_000
hex_color = 0xDEADBEEF

# Different bases
hex = 0xDEADBEEF    # hexadecimal
oct = 0o755          # octal (Unix permissions)
bin = 0b11010110     # binary`}</code></pre>

      <h3>{ct.h3Floats}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.floatsDesc }} />
      <pre><code>{`# Floats
flt1 = +1.0
flt2 = 3.1415
flt3 = -0.01
flt4 = 5e+22
flt5 = 1e06
flt6 = -2E-2

# Underscores
flt7 = 224_617.445_991_228

# Special float values
sf1 = inf      # positive infinity
sf2 = +inf     # positive infinity
sf3 = -inf     # negative infinity
sf4 = nan      # not a number`}</code></pre>

      <h3>{ct.h3Booleans}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.booleansDesc }} />
      <pre><code>{`# Booleans — only true and false (lowercase)
bool1 = true
bool2 = false

# INVALID in TOML (unlike YAML):
# bool3 = yes     # ERROR
# bool4 = no      # ERROR
# bool5 = on      # ERROR
# bool6 = off     # ERROR
# bool7 = True    # ERROR — must be lowercase`}</code></pre>

      <h3>{ct.h3Dates}</h3>
      <p>{ct.datesDesc}</p>
      <pre><code>{`# Offset Date-Time (with timezone)
odt1 = 1979-05-27T07:32:00Z
odt2 = 1979-05-27T00:32:00-07:00
odt3 = 1979-05-27T00:32:00.999999-07:00

# Local Date-Time (no timezone)
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27T00:32:00.999999

# Local Date
ld1 = 1979-05-27

# Local Time
lt1 = 07:32:00
lt2 = 00:32:00.999999`}</code></pre>

      {/* ===== Section 3: Tables ===== */}
      <h2>{ct.h2Tables}</h2>
      <p>{ct.tablesDesc}</p>

      <pre><code>{`# Standard table
[server]
host = "localhost"
port = 8080

[server.tls]
enabled = true
cert = "/path/to/cert.pem"
key = "/path/to/key.pem"

# Empty table
[empty_table]`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.tablesInlineDesc }} />
      <pre><code>{`# Inline tables — must fit on one line
point = { x = 1, y = 2 }
animal = { type.name = "pug" }
name = { first = "Tom", last = "Preston-Werner" }

# Equivalent standard table form:
# [name]
# first = "Tom"
# last = "Preston-Werner"`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.tablesDottedDesc }} />
      <pre><code>{`# Dotted keys create nested tables implicitly
fruit.apple.color = "red"
fruit.apple.taste.sweet = true

# Equivalent to:
# [fruit.apple]
# color = "red"
#
# [fruit.apple.taste]
# sweet = true`}</code></pre>

      {/* ===== Section 4: Arrays ===== */}
      <h2>{ct.h2Arrays}</h2>
      <p>{ct.arraysDesc}</p>

      <pre><code>{`# Basic arrays
integers = [1, 2, 3]
colors = ["red", "yellow", "green"]
nested_arrays = [[1, 2], [3, 4, 5]]

# Multi-line arrays (trailing comma OK)
hosts = [
  "alpha",
  "omega",
  "beta",    # trailing comma is allowed!
]

# Mixed-type arrays (TOML v1.0+)
mixed = [1, "two", 3.0, true, 1979-05-27]`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.arraysOfTablesDesc }} />
      <pre><code>{`# Array of tables — each [[products]] adds an entry
[[products]]
name = "Hammer"
sku = 738594937

[[products]]    # empty table in the array

[[products]]
name = "Nail"
sku = 284758393
color = "gray"

# This is equivalent to the JSON:
# {
#   "products": [
#     { "name": "Hammer", "sku": 738594937 },
#     {},
#     { "name": "Nail", "sku": 284758393, "color": "gray" }
#   ]
# }

# Nested array of tables
[[fruits]]
name = "apple"

  [[fruits.varieties]]
  name = "red delicious"

  [[fruits.varieties]]
  name = "granny smith"

[[fruits]]
name = "banana"

  [[fruits.varieties]]
  name = "plantain"`}</code></pre>

      {/* ===== Section 5: String Types in Detail ===== */}
      <h2>{ct.h2StringTypes}</h2>
      <p>{ct.stringTypesDesc}</p>

      <p dangerouslySetInnerHTML={{ __html: ct.stringBasic }} />
      <pre><code>{`# Basic string escape sequences
str1 = "I'm a string.\\n"         # newline
str2 = "Tabs\\there."              # tab
str3 = "Backslash: \\\\"           # literal backslash
str4 = "Quote: \\""               # literal double quote
str5 = "Unicode: \\u0041"         # 'A'
str6 = "Unicode: \\U0001F600"     # emoji`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.stringLiteral }} />
      <pre><code>{`# Literal strings — no escape processing
winpath = 'C:\\Users\\nodejs\\templates'
regex = '\\d{2} files? found\\?'`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.stringMultiBasic }} />
      <pre><code>{`# Multi-line basic string
str1 = """
Roses are red
Violets are blue"""

# Line-ending backslash trims newline + whitespace
str2 = """\\
  The quick brown \\
  fox jumps over \\
  the lazy dog."""
# Result: "The quick brown fox jumps over the lazy dog."`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.stringMultiLiteral }} />
      <pre><code>{`# Multi-line literal string — no escaping at all
regex_example = '''
I [dw]on't need \\d{2} escapes
'''

raw_html = '''
<div>
  <p>Hello, world!</p>
</div>
'''`}</code></pre>

      {/* ===== Section 6: Date & Time Types ===== */}
      <h2>{ct.h2DateTime}</h2>
      <p>{ct.dateTimeDesc}</p>

      <p dangerouslySetInnerHTML={{ __html: ct.dateOffset }} />
      <pre><code>{`# Offset date-time — includes timezone
odt1 = 1979-05-27T07:32:00Z           # UTC
odt2 = 1979-05-27T00:32:00-07:00      # UTC-7
odt3 = 1979-05-27 07:32:00Z           # space instead of T is OK`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.dateLocal }} />
      <pre><code>{`# Local date-time — no timezone
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27T00:32:00.999999`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.dateOnly }} />
      <pre><code>{`# Local date
ld1 = 1979-05-27
ld2 = 2024-01-15`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.timeOnly }} />
      <pre><code>{`# Local time
lt1 = 07:32:00
lt2 = 00:32:00.999999
lt3 = 23:59:59`}</code></pre>

      {/* ===== Section 7: Comments ===== */}
      <h2>{ct.h2Comments}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.commentsDesc }} />
      <p>{ct.commentsNote}</p>

      <pre><code>{`# This is a full-line comment
key = "value"  # This is an end-of-line comment

# Comments can explain configuration choices
[database]
# Use port 5432 for production PostgreSQL
port = 5432

# TOML does NOT support multi-line comments
# Each line needs its own # symbol
# Like these three lines

# You CANNOT put comments inside strings:
str = "has a # character"  # this is a comment, but the # in the string is literal`}</code></pre>

      {/* ===== Section 8: Cargo.toml ===== */}
      <h2>{ct.h2Cargo}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.cargoDesc }} />
      <p>{ct.cargoSections}</p>
      <div dangerouslySetInnerHTML={{ __html: ct.cargoSectionsList }} />

      <pre><code>{`# Cargo.toml — Complete Rust project example
[package]
name = "my-web-server"
version = "0.1.0"
edition = "2021"
authors = ["Alice <alice@example.com>"]
description = "A fast web server"
license = "MIT"
repository = "https://github.com/alice/my-web-server"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
axum = "0.7"
tracing = "0.1"

[dev-dependencies]
reqwest = { version = "0.12", features = ["json"] }
tokio-test = "0.4"

[features]
default = ["json"]
json = ["serde/derive"]
full = ["json", "tracing"]

# Workspace configuration for monorepos
[workspace]
members = [
  "crates/core",
  "crates/api",
  "crates/cli",
]

# Binary targets
[[bin]]
name = "server"
path = "src/main.rs"

[[bin]]
name = "cli"
path = "src/cli.rs"

# Build profile optimization
[profile.release]
opt-level = 3
lto = true
codegen-units = 1`}</code></pre>

      {/* ===== Section 9: pyproject.toml ===== */}
      <h2>{ct.h2Pyproject}</h2>
      <p dangerouslySetInnerHTML={{ __html: ct.pyprojectDesc }} />
      <p>{ct.pyprojectSections}</p>
      <div dangerouslySetInnerHTML={{ __html: ct.pyprojectSectionsList }} />

      <pre><code>{`# pyproject.toml — Complete Python project example
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-package"
version = "1.0.0"
description = "A useful Python package"
readme = "README.md"
license = "MIT"
requires-python = ">=3.9"
authors = [
  { name = "Alice", email = "alice@example.com" },
]
dependencies = [
  "requests>=2.28",
  "pydantic>=2.0",
  "click>=8.0",
]

[project.optional-dependencies]
dev = [
  "pytest>=7.0",
  "ruff>=0.1",
  "mypy>=1.0",
]

[project.scripts]
my-cli = "my_package.cli:main"

# Ruff linter configuration
[tool.ruff]
line-length = 88
target-version = "py39"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]
ignore = ["E501"]

[tool.ruff.lint.isort]
known-first-party = ["my_package"]

# Black formatter
[tool.black]
line-length = 88
target-version = ["py39", "py310", "py311"]

# Pytest configuration
[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-ra -q --strict-markers"
markers = [
  "slow: marks tests as slow",
  "integration: integration tests",
]

# Mypy type checking
[tool.mypy]
python_version = "3.9"
strict = true
warn_return_any = true`}</code></pre>

      {/* ===== Section 10: Other TOML Configs ===== */}
      <h2>{ct.h2OtherConfigs}</h2>
      <p>{ct.otherConfigsDesc}</p>

      <p dangerouslySetInnerHTML={{ __html: ct.otherHugo }} />
      <pre><code>{`# hugo.toml — Hugo static site generator
baseURL = "https://example.com/"
languageCode = "en-us"
title = "My Hugo Site"
theme = "ananke"

[params]
author = "Alice"
description = "A blog about technology"
showReadingTime = true

[menu]
[[menu.main]]
name = "Home"
url = "/"
weight = 1

[[menu.main]]
name = "Posts"
url = "/posts/"
weight = 2

[[menu.main]]
name = "About"
url = "/about/"
weight = 3`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.otherDeno }} />
      <pre><code>{`# deno.toml — Deno runtime configuration
# Comments are supported (unlike deno.json)

[tasks]
dev = "deno run --watch main.ts"
test = "deno test --allow-read"
lint = "deno lint"

[fmt]
indentWidth = 2
lineWidth = 100
singleQuote = true

[lint.rules]
tags = ["recommended"]

[compilerOptions]
lib = ["deno.window"]`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: ct.otherTaplo }} />
      <p dangerouslySetInnerHTML={{ __html: ct.otherGitCliff }} />
      <p dangerouslySetInnerHTML={{ __html: ct.otherStarship }} />
      <p dangerouslySetInnerHTML={{ __html: ct.otherAlacritty }} />

      <pre><code>{`# starship.toml — cross-shell prompt
[character]
success_symbol = "[\u276f](bold green)"
error_symbol = "[\u276f](bold red)"

[git_branch]
symbol = "\ud83c\udf3f "
style = "bold purple"

[nodejs]
symbol = "\u2b22 "
detect_files = ["package.json", ".node-version"]

# alacritty.toml — terminal emulator
[font]
size = 14.0

[font.normal]
family = "JetBrains Mono"
style = "Regular"

[colors.primary]
background = "#1d1f21"
foreground = "#c5c8c6"`}</code></pre>

      {/* ===== Section 11: Comparison ===== */}
      <h2>{ct.h2Comparison}</h2>
      <p>{ct.comparisonDesc}</p>

      <table>
        <thead>
          <tr>
            <th>{ct.compFeature}</th>
            <th>{ct.compToml}</th>
            <th>{ct.compYaml}</th>
            <th>{ct.compJson}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ct.compComments}</td>
            <td>{ct.compCommentsToml}</td>
            <td>{ct.compCommentsYaml}</td>
            <td>{ct.compCommentsJson}</td>
          </tr>
          <tr>
            <td>{ct.compTypes}</td>
            <td>{ct.compTypesToml}</td>
            <td>{ct.compTypesYaml}</td>
            <td>{ct.compTypesJson}</td>
          </tr>
          <tr>
            <td>{ct.compNesting}</td>
            <td>{ct.compNestingToml}</td>
            <td>{ct.compNestingYaml}</td>
            <td>{ct.compNestingJson}</td>
          </tr>
          <tr>
            <td>{ct.compAmbiguity}</td>
            <td>{ct.compAmbiguityToml}</td>
            <td>{ct.compAmbiguityYaml}</td>
            <td>{ct.compAmbiguityJson}</td>
          </tr>
          <tr>
            <td>{ct.compMultiline}</td>
            <td>{ct.compMultilineToml}</td>
            <td>{ct.compMultilineYaml}</td>
            <td>{ct.compMultilineJson}</td>
          </tr>
          <tr>
            <td>{ct.compEcosystem}</td>
            <td>{ct.compEcosystemToml}</td>
            <td>{ct.compEcosystemYaml}</td>
            <td>{ct.compEcosystemJson}</td>
          </tr>
          <tr>
            <td>{ct.compSpec}</td>
            <td>{ct.compSpecToml}</td>
            <td>{ct.compSpecYaml}</td>
            <td>{ct.compSpecJson}</td>
          </tr>
        </tbody>
      </table>

      {/* ===== Section 12: FAQ ===== */}
      <div className="faq-section">
        <h2>{ct.h2Faq}</h2>
        <h3>{ct.faq1Q}</h3>
        <p>{ct.faq1A}</p>
        <h3>{ct.faq2Q}</h3>
        <p>{ct.faq2A}</p>
        <h3>{ct.faq3Q}</h3>
        <p>{ct.faq3A}</p>
        <h3>{ct.faq4Q}</h3>
        <p>{ct.faq4A}</p>
        <h3>{ct.faq5Q}</h3>
        <p>{ct.faq5A}</p>
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link href={`/${lang}/tools/toml-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkTomlYaml}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkJsonYaml}
        </Link>
      </p>
    </>
  );
}
