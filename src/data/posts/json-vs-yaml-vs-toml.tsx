import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'JSON, YAML, and TOML are the three most popular configuration formats in software development. Each has distinct strengths and trade-offs. This guide provides a <strong>comprehensive comparison</strong> to help you choose the right format for your project.',
    linkJsonYaml: 'Convert between JSON and YAML instantly with our free tool \u2192',
    linkTomlYaml: 'Convert between TOML and YAML with our free tool \u2192',
    h2Overview: 'Overview of Each Format',
    h3Json: 'JSON (JavaScript Object Notation)',
    jsonDesc: 'JSON was introduced in the early 2000s by Douglas Crockford as a lightweight data-interchange format derived from JavaScript object literal syntax. Its design goal was simplicity: a minimal set of rules that any programming language could parse easily. Today it is the <strong>de facto standard</strong> for web APIs, configuration files like <code>package.json</code> and <code>tsconfig.json</code>, and data storage.',
    h3Yaml: 'YAML (YAML Ain\'t Markup Language)',
    yamlDesc: 'YAML was first proposed in 2001 by Clark Evans, Ingy d\u00f6t Net, and Oren Ben-Kiki. Originally meaning "Yet Another Markup Language," it was later renamed to reflect its data-oriented (not document-oriented) nature. YAML was designed for <strong>human readability</strong> and is widely used in DevOps tools like Docker Compose, Kubernetes manifests, Ansible playbooks, and CI/CD configurations (GitHub Actions, GitLab CI).',
    h3Toml: 'TOML (Tom\'s Obvious Minimal Language)',
    tomlDesc: 'TOML was created in 2013 by Tom Preston-Werner (co-founder of GitHub) specifically to be a <strong>minimal and unambiguous</strong> configuration format. It aims to be easy to read due to obvious semantics, mapping cleanly to a hash table. TOML is the standard config format for Rust (<code>Cargo.toml</code>), Python (<code>pyproject.toml</code>), and Hugo static sites.',
    h2Syntax: 'Syntax Comparison',
    syntaxDesc: 'Here is the same configuration expressed in all three formats:',
    h2Features: 'Feature Comparison',
    featComments: 'Comments',
    featDataTypes: 'Data Types',
    featReadability: 'Readability',
    featStrictness: 'Strictness',
    featTooling: 'Tooling Support',
    featMultiline: 'Multi-line Strings',
    featFeature: 'Feature',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: 'No',
    commentsYaml: 'Yes (#)',
    commentsToml: 'Yes (#)',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + custom tags',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: 'Medium \u2014 braces and quotes add noise',
    readYaml: 'High \u2014 clean indentation-based syntax',
    readToml: 'High \u2014 INI-like, explicit sections',
    strictJson: 'Very strict \u2014 no trailing commas, no comments',
    strictYaml: 'Loose \u2014 implicit typing causes surprises',
    strictToml: 'Strict \u2014 explicit types, minimal ambiguity',
    toolJson: 'Excellent \u2014 universal parser support',
    toolYaml: 'Good \u2014 parsers in all major languages',
    toolToml: 'Good \u2014 growing, strong in Rust/Python/Go',
    multiJson: 'No (use \\n escape sequences)',
    multiYaml: 'Yes (| for literal, > for folded)',
    multiToml: 'Yes (triple-quoted strings)',
    h2When: 'When to Use Each Format',
    h3WhenJson: 'Use JSON When...',
    whenJsonList: '<ul><li>Building or consuming <strong>REST APIs</strong> \u2014 JSON is the universal API payload format</li><li>Working with <strong>package.json</strong>, <strong>tsconfig.json</strong>, or <strong>composer.json</strong></li><li>Storing data that machines read more than humans (logs, exports)</li><li>You need the widest possible tooling and parser support</li><li>Data interchange between different programming languages</li></ul>',
    h3WhenYaml: 'Use YAML When...',
    whenYamlList: '<ul><li>Writing <strong>Docker Compose</strong> files or <strong>Kubernetes</strong> manifests</li><li>Configuring CI/CD pipelines (<strong>GitHub Actions</strong>, <strong>GitLab CI</strong>, <strong>CircleCI</strong>)</li><li>Using <strong>Ansible</strong> playbooks or <strong>Helm</strong> charts</li><li>You need comments in your configuration</li><li>Human readability is the top priority and indentation discipline is maintained</li></ul>',
    h3WhenToml: 'Use TOML When...',
    whenTomlList: '<ul><li>Configuring Rust projects (<strong>Cargo.toml</strong>)</li><li>Setting up Python projects (<strong>pyproject.toml</strong>, <strong>Poetry</strong>, <strong>Black</strong>, <strong>Ruff</strong>)</li><li>Configuring <strong>Hugo</strong> static site generator</li><li>You want an unambiguous format with no implicit type coercion</li><li>Your config has clear sections/groups (TOML tables map well to this)</li></ul>',
    h2Pitfalls: 'Common Pitfalls',
    h3YamlIndent: 'YAML: Indentation Issues',
    yamlIndentDesc: 'YAML uses indentation to define structure. Mixing tabs and spaces, or using inconsistent indent levels, is the most common source of YAML errors.',
    h3YamlNorway: 'YAML: The "Norway Problem"',
    yamlNorwayDesc: 'In YAML 1.1, unquoted values like <code>NO</code>, <code>yes</code>, <code>on</code>, <code>off</code> are interpreted as booleans. The country code "NO" (Norway) becomes <code>false</code>. This has caused real-world bugs. YAML 1.2 fixed this, but many parsers still default to 1.1 behavior.',
    h3JsonComma: 'JSON: Trailing Commas',
    jsonCommaDesc: 'JSON does not allow trailing commas. Adding a comma after the last element in an array or object causes a parse error. This is a frequent mistake when manually editing JSON files.',
    h3TomlNested: 'TOML: Nested Table Syntax',
    tomlNestedDesc: 'Deeply nested structures in TOML can become verbose. Each level requires its own <code>[section.subsection]</code> header, which can be less intuitive than JSON or YAML nesting for complex hierarchies.',
    h2Convert: 'Conversion Tools',
    convertDesc: 'Need to switch between formats? Use our free online converters:',
    convertJsonYaml: 'JSON \u2194 YAML Converter \u2014 bidirectional conversion with formatting options',
    convertTomlYaml: 'TOML \u2194 YAML Converter \u2014 convert between TOML and YAML instantly',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Which is faster to parse: JSON, YAML, or TOML?',
    faq1A: 'JSON is generally the fastest to parse because of its simple, strict grammar. Most JSON parsers are highly optimized and available as native implementations. TOML is also fast due to its unambiguous syntax. YAML is typically the slowest to parse because of its complex specification with features like anchors, custom tags, and implicit typing.',
    faq2Q: 'Can I use comments in JSON?',
    faq2A: 'Standard JSON (RFC 8259) does not support comments. Some tools like JSON5 and JSONC (used in VS Code settings) extend JSON with comment support, but these are non-standard. If you need comments, consider YAML or TOML instead, or use a JSON preprocessor that strips comments before parsing.',
    faq3Q: 'Why does YAML treat "NO" as false?',
    faq3A: 'In YAML 1.1, the values yes/no, on/off, and true/false are all recognized as boolean values (case-insensitive). So the country code "NO" is interpreted as boolean false. This is known as the "Norway problem." To avoid it, always quote string values that could be misinterpreted: use "NO" instead of NO. YAML 1.2 restricts booleans to only true/false, but many parsers still use YAML 1.1 rules by default.',
    faq4Q: 'Is TOML better than YAML for configuration files?',
    faq4A: 'TOML is often considered better for simple, flat configuration files because it has no implicit type coercion and is less error-prone than YAML. However, YAML handles deeply nested and complex structures more gracefully. For Rust and Python ecosystems, TOML is the standard choice. For DevOps and Kubernetes, YAML remains dominant.',
    faq5Q: 'Can I convert between JSON, YAML, and TOML without data loss?',
    faq5A: 'For most common data structures (strings, numbers, booleans, arrays, objects), conversion between all three formats is lossless. However, some features are format-specific: YAML anchors and custom tags have no equivalent in JSON or TOML; TOML datetime types may lose precision in JSON; and JSON does not support comments, so converting from YAML/TOML to JSON will lose all comments.',
  },
  zh: {
    intro: 'JSON、YAML 和 TOML 是软件开发中最流行的三种配置格式。每种格式都有各自的优势和取舍。本指南提供<strong>全面的对比分析</strong>，帮助你为项目选择合适的格式。',
    linkJsonYaml: '使用我们的免费工具在 JSON 和 YAML 之间即时转换 \u2192',
    linkTomlYaml: '使用我们的免费工具在 TOML 和 YAML 之间即时转换 \u2192',
    h2Overview: '各格式概述',
    h3Json: 'JSON（JavaScript 对象表示法）',
    jsonDesc: 'JSON 由 Douglas Crockford 在 2000 年代初期提出，是一种源自 JavaScript 对象字面量语法的轻量级数据交换格式。其设计目标是简洁：用最少的规则使任何编程语言都能轻松解析。如今它是 Web API、配置文件（如 <code>package.json</code> 和 <code>tsconfig.json</code>）以及数据存储的<strong>事实标准</strong>。',
    h3Yaml: 'YAML（YAML Ain\'t Markup Language）',
    yamlDesc: 'YAML 于 2001 年由 Clark Evans、Ingy d\u00f6t Net 和 Oren Ben-Kiki 首次提出。最初名为"Yet Another Markup Language"，后更名以体现其面向数据（而非文档）的本质。YAML 为<strong>人类可读性</strong>而设计，广泛用于 DevOps 工具，如 Docker Compose、Kubernetes 清单、Ansible Playbook 以及 CI/CD 配置（GitHub Actions、GitLab CI）。',
    h3Toml: 'TOML（Tom 的明显最小化语言）',
    tomlDesc: 'TOML 由 Tom Preston-Werner（GitHub 联合创始人）于 2013 年创建，专门作为一种<strong>最小化且无歧义</strong>的配置格式。其目标是语义明显、易于阅读，能清晰地映射到哈希表。TOML 是 Rust（<code>Cargo.toml</code>）、Python（<code>pyproject.toml</code>）和 Hugo 静态网站的标准配置格式。',
    h2Syntax: '语法对比',
    syntaxDesc: '下面用三种格式表达相同的配置：',
    h2Features: '功能对比',
    featComments: '注释',
    featDataTypes: '数据类型',
    featReadability: '可读性',
    featStrictness: '严格性',
    featTooling: '工具支持',
    featMultiline: '多行字符串',
    featFeature: '特性',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: '不支持',
    commentsYaml: '支持（#）',
    commentsToml: '支持（#）',
    typesJson: '字符串、数字、布尔值、null、数组、对象',
    typesYaml: '字符串、整数、浮点数、布尔值、null、日期、数组、映射 + 自定义标签',
    typesToml: '字符串、整数、浮点数、布尔值、日期时间、数组、表',
    readJson: '中等——大括号和引号增加视觉噪音',
    readYaml: '高——基于缩进的简洁语法',
    readToml: '高——类 INI 格式，段落分明',
    strictJson: '非常严格——不允许尾随逗号和注释',
    strictYaml: '宽松——隐式类型推断可能产生意外',
    strictToml: '严格——显式类型，极少歧义',
    toolJson: '出色——所有语言都有原生解析器',
    toolYaml: '良好——所有主流语言都有解析器',
    toolToml: '良好——在 Rust/Python/Go 中支持良好',
    multiJson: '不支持（使用 \\n 转义序列）',
    multiYaml: '支持（| 保留换行，> 折叠换行）',
    multiToml: '支持（三引号字符串）',
    h2When: '何时使用各格式',
    h3WhenJson: '使用 JSON 的场景',
    whenJsonList: '<ul><li>构建或使用 <strong>REST API</strong>——JSON 是通用的 API 载荷格式</li><li>使用 <strong>package.json</strong>、<strong>tsconfig.json</strong> 或 <strong>composer.json</strong></li><li>存储机器读取多于人类读取的数据（日志、导出）</li><li>需要最广泛的工具和解析器支持</li><li>不同编程语言之间的数据交换</li></ul>',
    h3WhenYaml: '使用 YAML 的场景',
    whenYamlList: '<ul><li>编写 <strong>Docker Compose</strong> 文件或 <strong>Kubernetes</strong> 清单</li><li>配置 CI/CD 流水线（<strong>GitHub Actions</strong>、<strong>GitLab CI</strong>、<strong>CircleCI</strong>）</li><li>使用 <strong>Ansible</strong> Playbook 或 <strong>Helm</strong> Charts</li><li>需要在配置中添加注释</li><li>人类可读性是首要考虑且能保持缩进规范</li></ul>',
    h3WhenToml: '使用 TOML 的场景',
    whenTomlList: '<ul><li>配置 Rust 项目（<strong>Cargo.toml</strong>）</li><li>配置 Python 项目（<strong>pyproject.toml</strong>、<strong>Poetry</strong>、<strong>Black</strong>、<strong>Ruff</strong>）</li><li>配置 <strong>Hugo</strong> 静态网站生成器</li><li>需要无隐式类型转换的明确格式</li><li>配置有清晰的分组结构（TOML 的表很适合这种情况）</li></ul>',
    h2Pitfalls: '常见陷阱',
    h3YamlIndent: 'YAML：缩进问题',
    yamlIndentDesc: 'YAML 使用缩进定义结构。混用制表符和空格，或缩进层级不一致，是 YAML 最常见的错误来源。',
    h3YamlNorway: 'YAML："挪威问题"',
    yamlNorwayDesc: '在 YAML 1.1 中，未加引号的 <code>NO</code>、<code>yes</code>、<code>on</code>、<code>off</code> 会被解释为布尔值。国家代码"NO"（挪威）会变成 <code>false</code>。这已导致了实际的 Bug。YAML 1.2 修复了这一问题，但很多解析器仍默认使用 1.1 的行为。',
    h3JsonComma: 'JSON：尾随逗号',
    jsonCommaDesc: 'JSON 不允许尾随逗号。在数组或对象的最后一个元素后加逗号会导致解析错误。这是手动编辑 JSON 文件时最常见的错误之一。',
    h3TomlNested: 'TOML：嵌套表语法',
    tomlNestedDesc: 'TOML 中的深层嵌套结构可能变得冗长。每一层都需要自己的 <code>[section.subsection]</code> 头部，对于复杂层级关系来说不如 JSON 或 YAML 的嵌套直观。',
    h2Convert: '转换工具',
    convertDesc: '需要在格式之间切换？使用我们的免费在线转换器：',
    convertJsonYaml: 'JSON \u2194 YAML 转换器——支持双向转换和格式化选项',
    convertTomlYaml: 'TOML \u2194 YAML 转换器——在 TOML 和 YAML 之间即时转换',
    h2Faq: '常见问题',
    faq1Q: 'JSON、YAML 和 TOML 哪个解析最快？',
    faq1A: 'JSON 通常解析最快，因为其语法简单严格。大多数 JSON 解析器已高度优化且有原生实现。TOML 由于语法无歧义也很快。YAML 通常最慢，因为其规范复杂，包含锚点、自定义标签和隐式类型推断等特性。',
    faq2Q: 'JSON 能使用注释吗？',
    faq2A: '标准 JSON（RFC 8259）不支持注释。JSON5 和 JSONC（VS Code 设置使用的格式）等工具扩展了 JSON 以支持注释，但这些是非标准的。如果需要注释，可以考虑使用 YAML 或 TOML，或使用在解析前去除注释的 JSON 预处理器。',
    faq3Q: '为什么 YAML 把 "NO" 当作 false？',
    faq3A: '在 YAML 1.1 中，yes/no、on/off 和 true/false 都被识别为布尔值（不区分大小写）。因此国家代码"NO"会被解释为布尔值 false。这被称为"挪威问题"。为避免此问题，对可能被误解的字符串值始终加引号：使用 "NO" 而不是 NO。YAML 1.2 将布尔值限制为仅 true/false，但许多解析器仍默认使用 YAML 1.1 规则。',
    faq4Q: 'TOML 比 YAML 更适合配置文件吗？',
    faq4A: 'TOML 通常被认为更适合简单、扁平的配置文件，因为它没有隐式类型转换，比 YAML 更不容易出错。但 YAML 处理深层嵌套和复杂结构更优雅。在 Rust 和 Python 生态中，TOML 是标准选择；在 DevOps 和 Kubernetes 领域，YAML 仍占主导地位。',
    faq5Q: '在 JSON、YAML 和 TOML 之间转换会丢失数据吗？',
    faq5A: '对于大多数常见数据结构（字符串、数字、布尔值、数组、对象），三种格式之间的转换是无损的。但某些特性是格式特有的：YAML 的锚点和自定义标签在 JSON 或 TOML 中没有等价物；TOML 的日期时间类型在 JSON 中可能丢失精度；JSON 不支持注释，因此从 YAML/TOML 转换到 JSON 会丢失所有注释。',
  },
  fr: {
    intro: 'JSON, YAML et TOML sont les trois formats de configuration les plus populaires en d\u00e9veloppement logiciel. Chacun a ses forces et ses compromis. Ce guide fournit une <strong>comparaison compl\u00e8te</strong> pour vous aider \u00e0 choisir le bon format.',
    linkJsonYaml: 'Convertissez entre JSON et YAML instantan\u00e9ment \u2192',
    linkTomlYaml: 'Convertissez entre TOML et YAML avec notre outil gratuit \u2192',
    h2Overview: 'Aper\u00e7u de chaque format',
    h3Json: 'JSON (JavaScript Object Notation)',
    jsonDesc: 'JSON a \u00e9t\u00e9 introduit au d\u00e9but des ann\u00e9es 2000 par Douglas Crockford. Con\u00e7u pour la simplicit\u00e9, c\'est aujourd\'hui le <strong>standard de facto</strong> pour les API web, les fichiers comme <code>package.json</code> et l\'\u00e9change de donn\u00e9es.',
    h3Yaml: 'YAML (YAML Ain\'t Markup Language)',
    yamlDesc: 'YAML a \u00e9t\u00e9 propos\u00e9 en 2001, con\u00e7u pour la <strong>lisibilit\u00e9 humaine</strong>. Il est utilis\u00e9 dans Docker Compose, Kubernetes, Ansible et les pipelines CI/CD (GitHub Actions, GitLab CI).',
    h3Toml: 'TOML (Tom\'s Obvious Minimal Language)',
    tomlDesc: 'TOML a \u00e9t\u00e9 cr\u00e9\u00e9 en 2013 par Tom Preston-Werner pour \u00eatre un format <strong>minimal et non ambigu</strong>. C\'est le standard pour Rust (<code>Cargo.toml</code>), Python (<code>pyproject.toml</code>) et Hugo.',
    h2Syntax: 'Comparaison de syntaxe',
    syntaxDesc: 'Voici la m\u00eame configuration dans les trois formats :',
    h2Features: 'Comparaison des fonctionnalit\u00e9s',
    featComments: 'Commentaires',
    featDataTypes: 'Types de donn\u00e9es',
    featReadability: 'Lisibilit\u00e9',
    featStrictness: 'Rigueur',
    featTooling: 'Outillage',
    featMultiline: 'Cha\u00eenes multi-lignes',
    featFeature: 'Fonctionnalit\u00e9',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: 'Non',
    commentsYaml: 'Oui (#)',
    commentsToml: 'Oui (#)',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + tags',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: 'Moyen \u2014 accolades et guillemets ajoutent du bruit',
    readYaml: '\u00c9lev\u00e9 \u2014 syntaxe propre bas\u00e9e sur l\'indentation',
    readToml: '\u00c9lev\u00e9 \u2014 style INI, sections explicites',
    strictJson: 'Tr\u00e8s strict \u2014 pas de virgule finale ni commentaires',
    strictYaml: 'Souple \u2014 typage implicite causant des surprises',
    strictToml: 'Strict \u2014 types explicites, ambigu\u00eft\u00e9 minimale',
    toolJson: 'Excellent \u2014 support universel',
    toolYaml: 'Bon \u2014 parseurs dans tous les langages',
    toolToml: 'Bon \u2014 en croissance, fort en Rust/Python/Go',
    multiJson: 'Non (utiliser \\n)',
    multiYaml: 'Oui (| litt\u00e9ral, > repli\u00e9)',
    multiToml: 'Oui (triple guillemets)',
    h2When: 'Quand utiliser chaque format',
    h3WhenJson: 'Utilisez JSON quand...',
    whenJsonList: '<ul><li>Vous construisez ou consommez des <strong>API REST</strong></li><li>Vous travaillez avec <strong>package.json</strong> ou <strong>tsconfig.json</strong></li><li>Vous stockez des donn\u00e9es lues par des machines</li><li>Vous avez besoin du support d\'outils le plus large</li><li>\u00c9change de donn\u00e9es entre langages diff\u00e9rents</li></ul>',
    h3WhenYaml: 'Utilisez YAML quand...',
    whenYamlList: '<ul><li>Vous \u00e9crivez des fichiers <strong>Docker Compose</strong> ou <strong>Kubernetes</strong></li><li>Vous configurez des pipelines CI/CD</li><li>Vous utilisez <strong>Ansible</strong> ou <strong>Helm</strong></li><li>Vous avez besoin de commentaires</li><li>La lisibilit\u00e9 humaine est prioritaire</li></ul>',
    h3WhenToml: 'Utilisez TOML quand...',
    whenTomlList: '<ul><li>Vous configurez des projets Rust (<strong>Cargo.toml</strong>)</li><li>Vous configurez des projets Python (<strong>pyproject.toml</strong>)</li><li>Vous utilisez <strong>Hugo</strong></li><li>Vous voulez un format sans co\u00ebrcion de type implicite</li><li>Votre config a des sections claires</li></ul>',
    h2Pitfalls: 'Pi\u00e8ges courants',
    h3YamlIndent: 'YAML : Probl\u00e8mes d\'indentation',
    yamlIndentDesc: 'YAML utilise l\'indentation pour d\u00e9finir la structure. M\u00e9langer tabs et espaces cause des erreurs fr\u00e9quentes.',
    h3YamlNorway: 'YAML : Le "probl\u00e8me de la Norv\u00e8ge"',
    yamlNorwayDesc: 'En YAML 1.1, <code>NO</code>, <code>yes</code>, <code>on</code>, <code>off</code> non quot\u00e9s sont interpr\u00e9t\u00e9s comme bool\u00e9ens. Le code pays "NO" (Norv\u00e8ge) devient <code>false</code>.',
    h3JsonComma: 'JSON : Virgules finales',
    jsonCommaDesc: 'JSON n\'autorise pas les virgules finales. Ajouter une virgule apr\u00e8s le dernier \u00e9l\u00e9ment cause une erreur de parse.',
    h3TomlNested: 'TOML : Syntaxe des tables imbriqu\u00e9es',
    tomlNestedDesc: 'Les structures profond\u00e9ment imbriqu\u00e9es en TOML peuvent devenir verbeuses. Chaque niveau n\u00e9cessite son propre en-t\u00eate <code>[section.subsection]</code>.',
    h2Convert: 'Outils de conversion',
    convertDesc: 'Besoin de passer d\'un format \u00e0 l\'autre ? Utilisez nos convertisseurs gratuits :',
    convertJsonYaml: 'Convertisseur JSON \u2194 YAML \u2014 conversion bidirectionnelle',
    convertTomlYaml: 'Convertisseur TOML \u2194 YAML \u2014 conversion instantan\u00e9e',
    h2Faq: 'Questions fr\u00e9quemment pos\u00e9es',
    faq1Q: 'Quel format est le plus rapide \u00e0 parser ?',
    faq1A: 'JSON est g\u00e9n\u00e9ralement le plus rapide gr\u00e2ce \u00e0 sa grammaire simple et stricte. TOML est aussi rapide gr\u00e2ce \u00e0 sa syntaxe non ambigu\u00eb. YAML est le plus lent \u00e0 cause de sa sp\u00e9cification complexe.',
    faq2Q: 'Peut-on utiliser des commentaires en JSON ?',
    faq2A: 'Le JSON standard (RFC 8259) ne supporte pas les commentaires. JSON5 et JSONC \u00e9tendent JSON avec des commentaires, mais ce sont des extensions non standard.',
    faq3Q: 'Pourquoi YAML traite-t-il "NO" comme false ?',
    faq3A: 'En YAML 1.1, yes/no, on/off et true/false sont reconnus comme bool\u00e9ens. Le code "NO" (Norv\u00e8ge) devient false. Quotez toujours ces valeurs.',
    faq4Q: 'TOML est-il meilleur que YAML pour la configuration ?',
    faq4A: 'TOML est souvent pr\u00e9f\u00e9r\u00e9 pour les configs simples et plates. YAML g\u00e8re mieux les structures profond\u00e9ment imbriqu\u00e9es. Le choix d\u00e9pend de l\'\u00e9cosyst\u00e8me.',
    faq5Q: 'La conversion entre formats cause-t-elle des pertes ?',
    faq5A: 'Pour les structures courantes, la conversion est sans perte. Certaines fonctionnalit\u00e9s sp\u00e9cifiques (ancres YAML, commentaires) sont perdues lors de la conversion vers JSON.',
  },
  de: {
    intro: 'JSON, YAML und TOML sind die drei beliebtesten Konfigurationsformate in der Softwareentwicklung. Jedes hat eigene St\u00e4rken und Kompromisse. Dieser Leitfaden bietet einen <strong>umfassenden Vergleich</strong>, um das richtige Format f\u00fcr Ihr Projekt zu w\u00e4hlen.',
    linkJsonYaml: 'Konvertieren Sie sofort zwischen JSON und YAML \u2192',
    linkTomlYaml: 'Konvertieren Sie zwischen TOML und YAML mit unserem Tool \u2192',
    h2Overview: '\u00dcbersicht der Formate',
    h3Json: 'JSON (JavaScript Object Notation)',
    jsonDesc: 'JSON wurde Anfang der 2000er von Douglas Crockford eingef\u00fchrt. Es ist der <strong>De-facto-Standard</strong> f\u00fcr Web-APIs, <code>package.json</code>, <code>tsconfig.json</code> und Datenaustausch.',
    h3Yaml: 'YAML (YAML Ain\'t Markup Language)',
    yamlDesc: 'YAML wurde 2001 vorgeschlagen und f\u00fcr <strong>menschliche Lesbarkeit</strong> entworfen. Es wird in Docker Compose, Kubernetes, Ansible und CI/CD-Pipelines verwendet.',
    h3Toml: 'TOML (Tom\'s Obvious Minimal Language)',
    tomlDesc: 'TOML wurde 2013 von Tom Preston-Werner als <strong>minimales und eindeutiges</strong> Konfigurationsformat erstellt. Standard f\u00fcr Rust (<code>Cargo.toml</code>), Python (<code>pyproject.toml</code>) und Hugo.',
    h2Syntax: 'Syntaxvergleich',
    syntaxDesc: 'Hier ist die gleiche Konfiguration in allen drei Formaten:',
    h2Features: 'Funktionsvergleich',
    featComments: 'Kommentare',
    featDataTypes: 'Datentypen',
    featReadability: 'Lesbarkeit',
    featStrictness: 'Strenge',
    featTooling: 'Tool-Unterst\u00fctzung',
    featMultiline: 'Mehrzeilige Strings',
    featFeature: 'Eigenschaft',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: 'Nein',
    commentsYaml: 'Ja (#)',
    commentsToml: 'Ja (#)',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + Tags',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: 'Mittel \u2014 Klammern und Anf\u00fchrungszeichen erh\u00f6hen das Rauschen',
    readYaml: 'Hoch \u2014 saubere einr\u00fcckungsbasierte Syntax',
    readToml: 'Hoch \u2014 INI-\u00e4hnlich, explizite Abschnitte',
    strictJson: 'Sehr streng \u2014 keine abschlie\u00dfenden Kommas oder Kommentare',
    strictYaml: 'Locker \u2014 implizite Typisierung verursacht \u00dcberraschungen',
    strictToml: 'Streng \u2014 explizite Typen, minimale Mehrdeutigkeit',
    toolJson: 'Hervorragend \u2014 universelle Parser-Unterst\u00fctzung',
    toolYaml: 'Gut \u2014 Parser in allen Hauptsprachen',
    toolToml: 'Gut \u2014 wachsend, stark in Rust/Python/Go',
    multiJson: 'Nein (\\n verwenden)',
    multiYaml: 'Ja (| literal, > gefaltet)',
    multiToml: 'Ja (dreifache Anf\u00fchrungszeichen)',
    h2When: 'Wann welches Format verwenden',
    h3WhenJson: 'JSON verwenden, wenn...',
    whenJsonList: '<ul><li>Sie <strong>REST-APIs</strong> bauen oder konsumieren</li><li>Sie mit <strong>package.json</strong> oder <strong>tsconfig.json</strong> arbeiten</li><li>Daten haupts\u00e4chlich von Maschinen gelesen werden</li><li>Sie die breiteste Tool-Unterst\u00fctzung ben\u00f6tigen</li><li>Datenaustausch zwischen verschiedenen Programmiersprachen</li></ul>',
    h3WhenYaml: 'YAML verwenden, wenn...',
    whenYamlList: '<ul><li>Sie <strong>Docker Compose</strong>- oder <strong>Kubernetes</strong>-Dateien schreiben</li><li>Sie CI/CD-Pipelines konfigurieren</li><li>Sie <strong>Ansible</strong> oder <strong>Helm</strong> verwenden</li><li>Sie Kommentare in der Konfiguration ben\u00f6tigen</li><li>Menschliche Lesbarkeit Priorit\u00e4t hat</li></ul>',
    h3WhenToml: 'TOML verwenden, wenn...',
    whenTomlList: '<ul><li>Sie Rust-Projekte konfigurieren (<strong>Cargo.toml</strong>)</li><li>Sie Python-Projekte einrichten (<strong>pyproject.toml</strong>)</li><li>Sie <strong>Hugo</strong> verwenden</li><li>Sie ein Format ohne implizite Typkonvertierung wollen</li><li>Ihre Konfiguration klare Abschnitte hat</li></ul>',
    h2Pitfalls: 'H\u00e4ufige Fallstricke',
    h3YamlIndent: 'YAML: Einr\u00fcckungsprobleme',
    yamlIndentDesc: 'YAML verwendet Einr\u00fcckung zur Strukturdefinition. Das Mischen von Tabs und Leerzeichen verursacht h\u00e4ufige Fehler.',
    h3YamlNorway: 'YAML: Das "Norwegen-Problem"',
    yamlNorwayDesc: 'In YAML 1.1 werden unquotierte Werte wie <code>NO</code>, <code>yes</code>, <code>on</code>, <code>off</code> als Booleans interpretiert. Der L\u00e4ndercode "NO" (Norwegen) wird zu <code>false</code>.',
    h3JsonComma: 'JSON: Abschlie\u00dfende Kommas',
    jsonCommaDesc: 'JSON erlaubt keine abschlie\u00dfenden Kommas. Ein Komma nach dem letzten Element verursacht einen Parse-Fehler.',
    h3TomlNested: 'TOML: Verschachtelte Tabellensyntax',
    tomlNestedDesc: 'Tief verschachtelte Strukturen in TOML k\u00f6nnen umst\u00e4ndlich werden. Jede Ebene ben\u00f6tigt einen eigenen <code>[section.subsection]</code>-Header.',
    h2Convert: 'Konvertierungstools',
    convertDesc: 'M\u00fcssen Sie zwischen Formaten wechseln? Nutzen Sie unsere kostenlosen Konverter:',
    convertJsonYaml: 'JSON \u2194 YAML Konverter \u2014 bidirektionale Konvertierung',
    convertTomlYaml: 'TOML \u2194 YAML Konverter \u2014 sofortige Konvertierung',
    h2Faq: 'H\u00e4ufig gestellte Fragen',
    faq1Q: 'Welches Format wird am schnellsten geparst?',
    faq1A: 'JSON wird generell am schnellsten geparst wegen seiner einfachen, strikten Grammatik. TOML ist ebenfalls schnell. YAML ist am langsamsten wegen seiner komplexen Spezifikation.',
    faq2Q: 'Kann man Kommentare in JSON verwenden?',
    faq2A: 'Standard-JSON (RFC 8259) unterst\u00fctzt keine Kommentare. JSON5 und JSONC erweitern JSON um Kommentare, sind aber nicht standardisiert.',
    faq3Q: 'Warum behandelt YAML "NO" als false?',
    faq3A: 'In YAML 1.1 werden yes/no, on/off und true/false als Booleans erkannt. Der Code "NO" (Norwegen) wird false. Quotieren Sie diese Werte immer.',
    faq4Q: 'Ist TOML besser als YAML f\u00fcr Konfigurationsdateien?',
    faq4A: 'TOML wird oft f\u00fcr einfache, flache Konfigurationen bevorzugt. YAML eignet sich besser f\u00fcr tief verschachtelte Strukturen. Die Wahl h\u00e4ngt vom \u00d6kosystem ab.',
    faq5Q: 'Gehen bei der Konvertierung zwischen Formaten Daten verloren?',
    faq5A: 'F\u00fcr \u00fcbliche Strukturen ist die Konvertierung verlustfrei. Formatspezifische Features (YAML-Anker, Kommentare) gehen bei der JSON-Konvertierung verloren.',
  },
  es: {
    intro: 'JSON, YAML y TOML son los tres formatos de configuraci\u00f3n m\u00e1s populares en desarrollo de software. Cada uno tiene fortalezas y compromisos distintos. Esta gu\u00eda ofrece una <strong>comparaci\u00f3n completa</strong> para ayudarte a elegir el formato adecuado.',
    linkJsonYaml: 'Convierte entre JSON y YAML instant\u00e1neamente \u2192',
    linkTomlYaml: 'Convierte entre TOML y YAML con nuestra herramienta gratuita \u2192',
    h2Overview: 'Descripci\u00f3n de cada formato',
    h3Json: 'JSON (JavaScript Object Notation)',
    jsonDesc: 'JSON fue introducido a principios de los 2000 por Douglas Crockford. Es el <strong>est\u00e1ndar de facto</strong> para APIs web, archivos como <code>package.json</code> y el intercambio de datos.',
    h3Yaml: 'YAML (YAML Ain\'t Markup Language)',
    yamlDesc: 'YAML fue propuesto en 2001, dise\u00f1ado para la <strong>legibilidad humana</strong>. Se usa en Docker Compose, Kubernetes, Ansible y pipelines CI/CD.',
    h3Toml: 'TOML (Tom\'s Obvious Minimal Language)',
    tomlDesc: 'TOML fue creado en 2013 por Tom Preston-Werner como formato <strong>m\u00ednimo y sin ambig\u00fcedad</strong>. Es el est\u00e1ndar para Rust (<code>Cargo.toml</code>), Python (<code>pyproject.toml</code>) y Hugo.',
    h2Syntax: 'Comparaci\u00f3n de sintaxis',
    syntaxDesc: 'Aqu\u00ed est\u00e1 la misma configuraci\u00f3n en los tres formatos:',
    h2Features: 'Comparaci\u00f3n de caracter\u00edsticas',
    featComments: 'Comentarios',
    featDataTypes: 'Tipos de datos',
    featReadability: 'Legibilidad',
    featStrictness: 'Rigurosidad',
    featTooling: 'Soporte de herramientas',
    featMultiline: 'Cadenas multi-l\u00ednea',
    featFeature: 'Caracter\u00edstica',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: 'No',
    commentsYaml: 'S\u00ed (#)',
    commentsToml: 'S\u00ed (#)',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + tags',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: 'Medio \u2014 llaves y comillas a\u00f1aden ruido visual',
    readYaml: 'Alto \u2014 sintaxis limpia basada en indentaci\u00f3n',
    readToml: 'Alto \u2014 estilo INI, secciones expl\u00edcitas',
    strictJson: 'Muy estricto \u2014 sin comas finales ni comentarios',
    strictYaml: 'Flexible \u2014 tipado impl\u00edcito causa sorpresas',
    strictToml: 'Estricto \u2014 tipos expl\u00edcitos, ambig\u00fcedad m\u00ednima',
    toolJson: 'Excelente \u2014 soporte universal',
    toolYaml: 'Bueno \u2014 parsers en todos los lenguajes principales',
    toolToml: 'Bueno \u2014 creciendo, fuerte en Rust/Python/Go',
    multiJson: 'No (usar \\n)',
    multiYaml: 'S\u00ed (| literal, > plegado)',
    multiToml: 'S\u00ed (comillas triples)',
    h2When: 'Cu\u00e1ndo usar cada formato',
    h3WhenJson: 'Usa JSON cuando...',
    whenJsonList: '<ul><li>Construyes o consumes <strong>APIs REST</strong></li><li>Trabajas con <strong>package.json</strong> o <strong>tsconfig.json</strong></li><li>Almacenas datos le\u00eddos m\u00e1s por m\u00e1quinas que por humanos</li><li>Necesitas el soporte de herramientas m\u00e1s amplio</li><li>Intercambio de datos entre lenguajes diferentes</li></ul>',
    h3WhenYaml: 'Usa YAML cuando...',
    whenYamlList: '<ul><li>Escribes archivos <strong>Docker Compose</strong> o <strong>Kubernetes</strong></li><li>Configuras pipelines CI/CD</li><li>Usas <strong>Ansible</strong> o <strong>Helm</strong></li><li>Necesitas comentarios en la configuraci\u00f3n</li><li>La legibilidad humana es la prioridad</li></ul>',
    h3WhenToml: 'Usa TOML cuando...',
    whenTomlList: '<ul><li>Configuras proyectos Rust (<strong>Cargo.toml</strong>)</li><li>Configuras proyectos Python (<strong>pyproject.toml</strong>)</li><li>Usas <strong>Hugo</strong></li><li>Quieres un formato sin coerci\u00f3n de tipos impl\u00edcita</li><li>Tu config tiene secciones claras</li></ul>',
    h2Pitfalls: 'Trampas comunes',
    h3YamlIndent: 'YAML: Problemas de indentaci\u00f3n',
    yamlIndentDesc: 'YAML usa indentaci\u00f3n para definir estructura. Mezclar tabs y espacios causa errores frecuentes.',
    h3YamlNorway: 'YAML: El "problema de Noruega"',
    yamlNorwayDesc: 'En YAML 1.1, valores como <code>NO</code>, <code>yes</code>, <code>on</code>, <code>off</code> sin comillas se interpretan como booleanos. El c\u00f3digo "NO" (Noruega) se convierte en <code>false</code>.',
    h3JsonComma: 'JSON: Comas finales',
    jsonCommaDesc: 'JSON no permite comas finales. A\u00f1adir una coma despu\u00e9s del \u00faltimo elemento causa un error de parseo.',
    h3TomlNested: 'TOML: Sintaxis de tablas anidadas',
    tomlNestedDesc: 'Las estructuras profundamente anidadas en TOML pueden ser verbosas. Cada nivel necesita su propio encabezado <code>[section.subsection]</code>.',
    h2Convert: 'Herramientas de conversi\u00f3n',
    convertDesc: '\u00bfNecesitas cambiar entre formatos? Usa nuestros conversores gratuitos:',
    convertJsonYaml: 'Conversor JSON \u2194 YAML \u2014 conversi\u00f3n bidireccional',
    convertTomlYaml: 'Conversor TOML \u2194 YAML \u2014 conversi\u00f3n instant\u00e1nea',
    h2Faq: 'Preguntas frecuentes',
    faq1Q: '\u00bfCu\u00e1l formato se parsea m\u00e1s r\u00e1pido?',
    faq1A: 'JSON generalmente se parsea m\u00e1s r\u00e1pido por su gram\u00e1tica simple y estricta. TOML tambi\u00e9n es r\u00e1pido. YAML es el m\u00e1s lento por su especificaci\u00f3n compleja.',
    faq2Q: '\u00bfSe pueden usar comentarios en JSON?',
    faq2A: 'El JSON est\u00e1ndar (RFC 8259) no soporta comentarios. JSON5 y JSONC extienden JSON con comentarios, pero no son est\u00e1ndar.',
    faq3Q: '\u00bfPor qu\u00e9 YAML trata "NO" como false?',
    faq3A: 'En YAML 1.1, yes/no, on/off y true/false se reconocen como booleanos. El c\u00f3digo "NO" (Noruega) se interpreta como false. Siempre pon comillas a estos valores.',
    faq4Q: '\u00bfEs TOML mejor que YAML para configuraci\u00f3n?',
    faq4A: 'TOML suele preferirse para configs simples y planas. YAML maneja mejor las estructuras profundamente anidadas. Depende del ecosistema.',
    faq5Q: '\u00bfSe pierden datos al convertir entre formatos?',
    faq5A: 'Para estructuras comunes la conversi\u00f3n es sin p\u00e9rdida. Caracter\u00edsticas espec\u00edficas (anclas YAML, comentarios) se pierden al convertir a JSON.',
  },
  ja: {
    intro: 'JSON\u3001YAML\u3001TOML\u306f\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u958b\u767a\u3067\u6700\u3082\u4eba\u6c17\u306e\u3042\u308b3\u3064\u306e\u8a2d\u5b9a\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3067\u3059\u3002\u305d\u308c\u305e\u308c\u306b\u7570\u306a\u308b\u5f37\u307f\u3068\u30c8\u30ec\u30fc\u30c9\u30aa\u30d5\u304c\u3042\u308a\u307e\u3059\u3002\u3053\u306e\u30ac\u30a4\u30c9\u3067\u306f\u3001\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306b\u6700\u9069\u306a\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3092\u9078\u3076\u305f\u3081\u306e<strong>\u5305\u62ec\u7684\u306a\u6bd4\u8f03</strong>\u3092\u63d0\u4f9b\u3057\u307e\u3059\u3002',
    linkJsonYaml: '\u7121\u6599\u30c4\u30fc\u30eb\u3067 JSON \u3068 YAML \u3092\u5373\u5ea7\u306b\u5909\u63db \u2192',
    linkTomlYaml: '\u7121\u6599\u30c4\u30fc\u30eb\u3067 TOML \u3068 YAML \u3092\u5909\u63db \u2192',
    h2Overview: '\u5404\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u6982\u8981',
    h3Json: 'JSON\uff08JavaScript Object Notation\uff09',
    jsonDesc: 'JSON\u306f2000\u5e74\u4ee3\u521d\u982d\u306bDouglas Crockford\u306b\u3088\u3063\u3066\u5c0e\u5165\u3055\u308c\u307e\u3057\u305f\u3002Web API\u3001<code>package.json</code>\u3001<code>tsconfig.json</code>\u306a\u3069\u306e<strong>\u30c7\u30d5\u30a1\u30af\u30c8\u30b9\u30bf\u30f3\u30c0\u30fc\u30c9</strong>\u3067\u3059\u3002',
    h3Yaml: 'YAML\uff08YAML Ain\'t Markup Language\uff09',
    yamlDesc: 'YAML\u306f2001\u5e74\u306b\u63d0\u6848\u3055\u308c\u3001<strong>\u4eba\u9593\u304c\u8aad\u307f\u3084\u3059\u3044</strong>\u3053\u3068\u3092\u76ee\u6307\u3057\u3066\u8a2d\u8a08\u3055\u308c\u307e\u3057\u305f\u3002Docker Compose\u3001Kubernetes\u3001Ansible\u3001CI/CD\u30d1\u30a4\u30d7\u30e9\u30a4\u30f3\u3067\u5e83\u304f\u4f7f\u308f\u308c\u3066\u3044\u307e\u3059\u3002',
    h3Toml: 'TOML\uff08Tom\'s Obvious Minimal Language\uff09',
    tomlDesc: 'TOML\u306f2013\u5e74\u306bTom Preston-Werner\u306b\u3088\u3063\u3066\u4f5c\u3089\u308c\u305f<strong>\u6700\u5c0f\u9650\u3067\u66d6\u6627\u3055\u306e\u306a\u3044</strong>\u8a2d\u5b9a\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3067\u3059\u3002Rust\uff08<code>Cargo.toml</code>\uff09\u3001Python\uff08<code>pyproject.toml</code>\uff09\u3001Hugo\u306e\u6a19\u6e96\u3067\u3059\u3002',
    h2Syntax: '\u69cb\u6587\u306e\u6bd4\u8f03',
    syntaxDesc: '\u540c\u3058\u8a2d\u5b9a\u30923\u3064\u306e\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u3067\u8868\u73fe\u3057\u307e\u3059\uff1a',
    h2Features: '\u6a5f\u80fd\u6bd4\u8f03',
    featComments: '\u30b3\u30e1\u30f3\u30c8',
    featDataTypes: '\u30c7\u30fc\u30bf\u578b',
    featReadability: '\u53ef\u8aad\u6027',
    featStrictness: '\u53b3\u5bc6\u3055',
    featTooling: '\u30c4\u30fc\u30eb\u30b5\u30dd\u30fc\u30c8',
    featMultiline: '\u8907\u6570\u884c\u6587\u5b57\u5217',
    featFeature: '\u6a5f\u80fd',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: '\u306a\u3057',
    commentsYaml: '\u3042\u308a\uff08#\uff09',
    commentsToml: '\u3042\u308a\uff08#\uff09',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + \u30ab\u30b9\u30bf\u30e0\u30bf\u30b0',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: '\u4e2d\u7a0b\u5ea6\u2014\u2014\u6ce2\u62ec\u5f27\u3068\u5f15\u7528\u7b26\u304c\u30ce\u30a4\u30ba\u306b\u306a\u308b',
    readYaml: '\u9ad8\u3044\u2014\u2014\u30a4\u30f3\u30c7\u30f3\u30c8\u30d9\u30fc\u30b9\u306e\u304d\u308c\u3044\u306a\u69cb\u6587',
    readToml: '\u9ad8\u3044\u2014\u2014INI\u30e9\u30a4\u30af\u3067\u30bb\u30af\u30b7\u30e7\u30f3\u304c\u660e\u78ba',
    strictJson: '\u975e\u5e38\u306b\u53b3\u5bc6\u2014\u2014\u672b\u5c3e\u30ab\u30f3\u30de\u3084\u30b3\u30e1\u30f3\u30c8\u4e0d\u53ef',
    strictYaml: '\u7de9\u3044\u2014\u2014\u6697\u9ed9\u7684\u306a\u578b\u63a8\u8ad6\u304c\u4e88\u60f3\u5916\u306e\u52d5\u4f5c\u3092\u5f15\u304d\u8d77\u3053\u3059',
    strictToml: '\u53b3\u5bc6\u2014\u2014\u660e\u793a\u7684\u306a\u578b\u3001\u66d6\u6627\u3055\u6700\u5c0f\u9650',
    toolJson: '\u512a\u79c0\u2014\u2014\u5168\u8a00\u8a9e\u3067\u30cd\u30a4\u30c6\u30a3\u30d6\u30d1\u30fc\u30b5\u30fc\u5bfe\u5fdc',
    toolYaml: '\u826f\u597d\u2014\u2014\u4e3b\u8981\u8a00\u8a9e\u3059\u3079\u3066\u306b\u30d1\u30fc\u30b5\u30fc\u3042\u308a',
    toolToml: '\u826f\u597d\u2014\u2014\u6210\u9577\u4e2d\u3001Rust/Python/Go\u3067\u5f37\u3044',
    multiJson: '\u306a\u3057\uff08\\n \u30a8\u30b9\u30b1\u30fc\u30d7\u30b7\u30fc\u30b1\u30f3\u30b9\u3092\u4f7f\u7528\uff09',
    multiYaml: '\u3042\u308a\uff08| \u30ea\u30c6\u30e9\u30eb\u3001> \u30d5\u30a9\u30fc\u30eb\u30c9\uff09',
    multiToml: '\u3042\u308a\uff08\u30c8\u30ea\u30d7\u30eb\u30af\u30a9\u30fc\u30c8\u6587\u5b57\u5217\uff09',
    h2When: '\u5404\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u306e\u4f7f\u3044\u3069\u3053\u308d',
    h3WhenJson: 'JSON \u3092\u4f7f\u3046\u5834\u5408...',
    whenJsonList: '<ul><li><strong>REST API</strong>\u306e\u69cb\u7bc9\u307e\u305f\u306f\u5229\u7528</li><li><strong>package.json</strong>\u3084<strong>tsconfig.json</strong>\u3067\u306e\u4f5c\u696d</li><li>\u6a5f\u68b0\u304c\u4e3b\u306b\u8aad\u3080\u30c7\u30fc\u30bf\u306e\u4fdd\u5b58</li><li>\u6700\u3082\u5e45\u5e83\u3044\u30c4\u30fc\u30eb\u30b5\u30dd\u30fc\u30c8\u304c\u5fc5\u8981\u306a\u5834\u5408</li><li>\u7570\u306a\u308b\u30d7\u30ed\u30b0\u30e9\u30df\u30f3\u30b0\u8a00\u8a9e\u9593\u306e\u30c7\u30fc\u30bf\u4ea4\u63db</li></ul>',
    h3WhenYaml: 'YAML \u3092\u4f7f\u3046\u5834\u5408...',
    whenYamlList: '<ul><li><strong>Docker Compose</strong>\u3084<strong>Kubernetes</strong>\u30de\u30cb\u30d5\u30a7\u30b9\u30c8\u306e\u4f5c\u6210</li><li>CI/CD\u30d1\u30a4\u30d7\u30e9\u30a4\u30f3\u306e\u8a2d\u5b9a</li><li><strong>Ansible</strong>\u3084<strong>Helm</strong>\u306e\u4f7f\u7528</li><li>\u8a2d\u5b9a\u306b\u30b3\u30e1\u30f3\u30c8\u304c\u5fc5\u8981\u306a\u5834\u5408</li><li>\u4eba\u9593\u306e\u53ef\u8aad\u6027\u304c\u6700\u512a\u5148</li></ul>',
    h3WhenToml: 'TOML \u3092\u4f7f\u3046\u5834\u5408...',
    whenTomlList: '<ul><li>Rust\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u8a2d\u5b9a\uff08<strong>Cargo.toml</strong>\uff09</li><li>Python\u30d7\u30ed\u30b8\u30a7\u30af\u30c8\u306e\u8a2d\u5b9a\uff08<strong>pyproject.toml</strong>\uff09</li><li><strong>Hugo</strong>\u306e\u4f7f\u7528</li><li>\u6697\u9ed9\u7684\u306a\u578b\u5909\u63db\u306e\u306a\u3044\u660e\u78ba\u306a\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u304c\u5fc5\u8981\u306a\u5834\u5408</li><li>\u8a2d\u5b9a\u306b\u660e\u78ba\u306a\u30bb\u30af\u30b7\u30e7\u30f3/\u30b0\u30eb\u30fc\u30d7\u304c\u3042\u308b\u5834\u5408</li></ul>',
    h2Pitfalls: '\u3088\u304f\u3042\u308b\u843d\u3068\u3057\u7a74',
    h3YamlIndent: 'YAML\uff1a\u30a4\u30f3\u30c7\u30f3\u30c8\u306e\u554f\u984c',
    yamlIndentDesc: 'YAML\u306f\u30a4\u30f3\u30c7\u30f3\u30c8\u3067\u69cb\u9020\u3092\u5b9a\u7fa9\u3057\u307e\u3059\u3002\u30bf\u30d6\u3068\u30b9\u30da\u30fc\u30b9\u306e\u6df7\u5728\u3084\u30a4\u30f3\u30c7\u30f3\u30c8\u30ec\u30d9\u30eb\u306e\u4e0d\u4e00\u81f4\u306f\u3001\u6700\u3082\u4e00\u822c\u7684\u306a\u30a8\u30e9\u30fc\u306e\u539f\u56e0\u3067\u3059\u3002',
    h3YamlNorway: 'YAML\uff1a\u300c\u30ce\u30eb\u30a6\u30a7\u30fc\u554f\u984c\u300d',
    yamlNorwayDesc: 'YAML 1.1\u3067\u306f\u3001\u5f15\u7528\u7b26\u306a\u3057\u306e<code>NO</code>\u3001<code>yes</code>\u3001<code>on</code>\u3001<code>off</code>\u306f\u30d6\u30fc\u30eb\u5024\u3068\u3057\u3066\u89e3\u91c8\u3055\u308c\u307e\u3059\u3002\u56fd\u30b3\u30fc\u30c9\u300cNO\u300d\uff08\u30ce\u30eb\u30a6\u30a7\u30fc\uff09\u306f<code>false</code>\u306b\u306a\u308a\u307e\u3059\u3002',
    h3JsonComma: 'JSON\uff1a\u672b\u5c3e\u30ab\u30f3\u30de',
    jsonCommaDesc: 'JSON\u306f\u672b\u5c3e\u30ab\u30f3\u30de\u3092\u8a31\u53ef\u3057\u307e\u305b\u3093\u3002\u6700\u5f8c\u306e\u8981\u7d20\u306e\u5f8c\u306b\u30ab\u30f3\u30de\u3092\u8ffd\u52a0\u3059\u308b\u3068\u30d1\u30fc\u30b9\u30a8\u30e9\u30fc\u306b\u306a\u308a\u307e\u3059\u3002',
    h3TomlNested: 'TOML\uff1a\u30cd\u30b9\u30c8\u3055\u308c\u305f\u30c6\u30fc\u30d6\u30eb\u69cb\u6587',
    tomlNestedDesc: 'TOML\u3067\u306e\u6df1\u3044\u30cd\u30b9\u30c8\u69cb\u9020\u306f\u5197\u9577\u306b\u306a\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002\u5404\u30ec\u30d9\u30eb\u306b\u72ec\u81ea\u306e<code>[section.subsection]</code>\u30d8\u30c3\u30c0\u30fc\u304c\u5fc5\u8981\u3067\u3059\u3002',
    h2Convert: '\u5909\u63db\u30c4\u30fc\u30eb',
    convertDesc: '\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u9593\u306e\u5207\u308a\u66ff\u3048\u304c\u5fc5\u8981\u3067\u3059\u304b\uff1f\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3\u30b3\u30f3\u30d0\u30fc\u30bf\u30fc\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\uff1a',
    convertJsonYaml: 'JSON \u2194 YAML \u30b3\u30f3\u30d0\u30fc\u30bf\u30fc\u2014\u2014\u53cc\u65b9\u5411\u5909\u63db\u5bfe\u5fdc',
    convertTomlYaml: 'TOML \u2194 YAML \u30b3\u30f3\u30d0\u30fc\u30bf\u30fc\u2014\u2014\u5373\u5ea7\u306b\u5909\u63db',
    h2Faq: '\u3088\u304f\u3042\u308b\u8cea\u554f',
    faq1Q: 'JSON\u3001YAML\u3001TOML\u306e\u3046\u3061\u30d1\u30fc\u30b9\u304c\u6700\u3082\u901f\u3044\u306e\u306f\uff1f',
    faq1A: 'JSON\u306f\u4e00\u822c\u7684\u306b\u6700\u3082\u9ad8\u901f\u3067\u3059\u3002\u30b7\u30f3\u30d7\u30eb\u3067\u53b3\u5bc6\u306a\u6587\u6cd5\u306e\u305f\u3081\u3001\u30d1\u30fc\u30b5\u30fc\u304c\u9ad8\u5ea6\u306b\u6700\u9069\u5316\u3055\u308c\u3066\u3044\u307e\u3059\u3002TOML\u3082\u660e\u78ba\u306a\u69cb\u6587\u306e\u305f\u3081\u9ad8\u901f\u3067\u3059\u3002YAML\u306f\u8907\u96d1\u306a\u4ed5\u69d8\u306e\u305f\u3081\u6700\u3082\u9045\u3044\u3067\u3059\u3002',
    faq2Q: 'JSON\u3067\u30b3\u30e1\u30f3\u30c8\u306f\u4f7f\u3048\u307e\u3059\u304b\uff1f',
    faq2A: '\u6a19\u6e96JSON\uff08RFC 8259\uff09\u306f\u30b3\u30e1\u30f3\u30c8\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093\u3002JSON5\u3084JSONC\u304c\u62e1\u5f35\u3068\u3057\u3066\u30b3\u30e1\u30f3\u30c8\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u307e\u3059\u304c\u3001\u975e\u6a19\u6e96\u3067\u3059\u3002',
    faq3Q: '\u306a\u305cYAML\u306f\u300cNO\u300d\u3092false\u3068\u3057\u3066\u6271\u3046\u306e\u3067\u3059\u304b\uff1f',
    faq3A: 'YAML 1.1\u3067\u306fyes/no\u3001on/off\u3001true/false\u304c\u30d6\u30fc\u30eb\u5024\u3068\u3057\u3066\u8a8d\u8b58\u3055\u308c\u307e\u3059\u3002\u300cNO\u300d\uff08\u30ce\u30eb\u30a6\u30a7\u30fc\uff09\u306ffalse\u306b\u306a\u308a\u307e\u3059\u3002\u5e38\u306b\u5f15\u7528\u7b26\u3067\u56f2\u3093\u3067\u304f\u3060\u3055\u3044\u3002',
    faq4Q: 'TOML\u306fYAML\u3088\u308a\u8a2d\u5b9a\u30d5\u30a1\u30a4\u30eb\u306b\u9069\u3057\u3066\u3044\u307e\u3059\u304b\uff1f',
    faq4A: 'TOML\u306f\u30b7\u30f3\u30d7\u30eb\u306a\u8a2d\u5b9a\u306b\u9069\u3057\u3066\u3044\u307e\u3059\u3002YAML\u306f\u6df1\u3044\u30cd\u30b9\u30c8\u69cb\u9020\u306b\u512a\u308c\u3066\u3044\u307e\u3059\u3002\u30a8\u30b3\u30b7\u30b9\u30c6\u30e0\u306b\u3088\u308a\u307e\u3059\u3002',
    faq5Q: '\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u9593\u306e\u5909\u63db\u3067\u30c7\u30fc\u30bf\u306f\u5931\u308f\u308c\u307e\u3059\u304b\uff1f',
    faq5A: '\u4e00\u822c\u7684\u306a\u30c7\u30fc\u30bf\u69cb\u9020\u3067\u306f\u5909\u63db\u306f\u7121\u640d\u5931\u3067\u3059\u3002YAML\u30a2\u30f3\u30ab\u30fc\u3084\u30b3\u30e1\u30f3\u30c8\u306a\u3069\u306e\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u56fa\u6709\u306e\u6a5f\u80fd\u306fJSON\u3078\u306e\u5909\u63db\u6642\u306b\u5931\u308f\u308c\u307e\u3059\u3002',
  },
  ko: {
    intro: 'JSON, YAML, TOML\uc740 \uc18c\ud504\ud2b8\uc6e8\uc5b4 \uac1c\ubc1c\uc5d0\uc11c \uac00\uc7a5 \ub110\ub9ac \uc0ac\uc6a9\ub418\ub294 3\uac00\uc9c0 \uc124\uc815 \ud615\uc2dd\uc785\ub2c8\ub2e4. \uac01\uac01 \ub2e4\ub978 \uac15\uc810\uacfc \ud2b8\ub808\uc774\ub4dc\uc624\ud504\uac00 \uc788\uc2b5\ub2c8\ub2e4. \uc774 \uac00\uc774\ub4dc\ub294 \ud504\ub85c\uc81d\ud2b8\uc5d0 \uc801\ud569\ud55c \ud615\uc2dd\uc744 \uc120\ud0dd\ud558\ub294 \ub370 \ub3c4\uc6c0\uc774 \ub418\ub294 <strong>\ud3ec\uad04\uc801\uc778 \ube44\uad50</strong>\ub97c \uc81c\uacf5\ud569\ub2c8\ub2e4.',
    linkJsonYaml: '\ubb34\ub8cc \ub3c4\uad6c\ub85c JSON\uacfc YAML\uc744 \uc989\uc2dc \ubcc0\ud658 \u2192',
    linkTomlYaml: '\ubb34\ub8cc \ub3c4\uad6c\ub85c TOML\uacfc YAML\uc744 \ubcc0\ud658 \u2192',
    h2Overview: '\uac01 \ud615\uc2dd \uac1c\uc694',
    h3Json: 'JSON (JavaScript Object Notation)',
    jsonDesc: 'JSON\uc740 2000\ub144\ub300 \ucd08\ubc18 Douglas Crockford\uc5d0 \uc758\ud574 \ub3c4\uc785\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uc6f9 API, <code>package.json</code>, <code>tsconfig.json</code> \ub4f1\uc758 <strong>\uc0ac\uc2e4\uc0c1 \ud45c\uc900</strong>\uc785\ub2c8\ub2e4.',
    h3Yaml: 'YAML (YAML Ain\'t Markup Language)',
    yamlDesc: 'YAML\uc740 2001\ub144\uc5d0 \uc81c\uc548\ub418\uc5c8\uc73c\uba70 <strong>\uc778\uac04 \uac00\ub3c5\uc131</strong>\uc744 \uc704\ud574 \uc124\uacc4\ub418\uc5c8\uc2b5\ub2c8\ub2e4. Docker Compose, Kubernetes, Ansible, CI/CD \ud30c\uc774\ud504\ub77c\uc778\uc5d0\uc11c \ub110\ub9ac \uc0ac\uc6a9\ub429\ub2c8\ub2e4.',
    h3Toml: 'TOML (Tom\'s Obvious Minimal Language)',
    tomlDesc: 'TOML\uc740 2013\ub144 Tom Preston-Werner\uac00 \ub9cc\ub4e0 <strong>\ucd5c\uc18c\ud55c\uc774\uba70 \ubaa8\ud638\ud558\uc9c0 \uc54a\uc740</strong> \uc124\uc815 \ud615\uc2dd\uc785\ub2c8\ub2e4. Rust(<code>Cargo.toml</code>), Python(<code>pyproject.toml</code>), Hugo\uc758 \ud45c\uc900\uc785\ub2c8\ub2e4.',
    h2Syntax: '\uad6c\ubb38 \ube44\uad50',
    syntaxDesc: '\ub3d9\uc77c\ud55c \uc124\uc815\uc744 3\uac00\uc9c0 \ud615\uc2dd\uc73c\ub85c \ud45c\ud604\ud569\ub2c8\ub2e4:',
    h2Features: '\uae30\ub2a5 \ube44\uad50',
    featComments: '\uc8fc\uc11d',
    featDataTypes: '\ub370\uc774\ud130 \ud0c0\uc785',
    featReadability: '\uac00\ub3c5\uc131',
    featStrictness: '\uc5c4\uaca9\uc131',
    featTooling: '\ub3c4\uad6c \uc9c0\uc6d0',
    featMultiline: '\uc5ec\ub7ec \uc904 \ubb38\uc790\uc5f4',
    featFeature: '\uae30\ub2a5',
    featJson: 'JSON',
    featYaml: 'YAML',
    featToml: 'TOML',
    commentsJson: '\uc5c6\uc74c',
    commentsYaml: '\uc788\uc74c (#)',
    commentsToml: '\uc788\uc74c (#)',
    typesJson: 'string, number, boolean, null, array, object',
    typesYaml: 'string, int, float, bool, null, date, array, map + \ucee4\uc2a4\ud140 \ud0dc\uadf8',
    typesToml: 'string, integer, float, boolean, datetime, array, table',
    readJson: '\uc911\uac04\u2014\uc911\uad04\ud638\uc640 \ub530\uc634\ud45c\uac00 \ub178\uc774\uc988\ub97c \ucd94\uac00',
    readYaml: '\ub192\uc74c\u2014\ub4e4\uc5ec\uc4f0\uae30 \uae30\ubc18\uc758 \uae54\ub054\ud55c \uad6c\ubb38',
    readToml: '\ub192\uc74c\u2014INI \uc2a4\ud0c0\uc77c, \uba85\ud655\ud55c \uc139\uc158',
    strictJson: '\ub9e4\uc6b0 \uc5c4\uaca9\u2014\ud6c4\ud589 \ucf64\ub9c8\ub098 \uc8fc\uc11d \ubd88\uac00',
    strictYaml: '\ub290\uc2a8\u2014\uc554\ubb35\uc801 \ud0c0\uc774\ud551\uc774 \uc608\uc0c1\uce58 \ubabb\ud55c \ub3d9\uc791 \uc720\ubc1c',
    strictToml: '\uc5c4\uaca9\u2014\uba85\uc2dc\uc801 \ud0c0\uc785, \ucd5c\uc18c\ud55c\uc758 \ubaa8\ud638\uc131',
    toolJson: '\uc6b0\uc218\u2014\ubaa8\ub4e0 \uc5b8\uc5b4\uc5d0\uc11c \ub124\uc774\ud2f0\ube0c \ud30c\uc11c \uc9c0\uc6d0',
    toolYaml: '\uc591\ud638\u2014\uc8fc\uc694 \uc5b8\uc5b4 \ubaa8\ub450\uc5d0 \ud30c\uc11c \uc788\uc74c',
    toolToml: '\uc591\ud638\u2014\uc131\uc7a5 \uc911, Rust/Python/Go\uc5d0\uc11c \uac15\ub825',
    multiJson: '\uc5c6\uc74c (\\n \uc774\uc2a4\ucf00\uc774\ud504 \uc2dc\ud000\uc2a4 \uc0ac\uc6a9)',
    multiYaml: '\uc788\uc74c (| \ub9ac\ud130\ub7f4, > \ud3f4\ub4dc)',
    multiToml: '\uc788\uc74c (\ud2b8\ub9ac\ud50c \ucffc\ud2b8 \ubb38\uc790\uc5f4)',
    h2When: '\uac01 \ud615\uc2dd\uc758 \uc0ac\uc6a9 \uc2dc\uae30',
    h3WhenJson: 'JSON\uc744 \uc0ac\uc6a9\ud560 \ub54c...',
    whenJsonList: '<ul><li><strong>REST API</strong> \uad6c\ucd95 \ub610\ub294 \uc0ac\uc6a9</li><li><strong>package.json</strong>\uc774\ub098 <strong>tsconfig.json</strong> \uc791\uc5c5</li><li>\uae30\uacc4\uac00 \uc8fc\ub85c \uc77d\ub294 \ub370\uc774\ud130 \uc800\uc7a5</li><li>\uac00\uc7a5 \ub113\uc740 \ub3c4\uad6c \uc9c0\uc6d0\uc774 \ud544\uc694\ud55c \uacbd\uc6b0</li><li>\ub2e4\ub978 \ud504\ub85c\uadf8\ub798\ubc0d \uc5b8\uc5b4 \uac04 \ub370\uc774\ud130 \uad50\ud658</li></ul>',
    h3WhenYaml: 'YAML\uc744 \uc0ac\uc6a9\ud560 \ub54c...',
    whenYamlList: '<ul><li><strong>Docker Compose</strong>\ub098 <strong>Kubernetes</strong> \ub9e4\ub2c8\ud398\uc2a4\ud2b8 \uc791\uc131</li><li>CI/CD \ud30c\uc774\ud504\ub77c\uc778 \uc124\uc815</li><li><strong>Ansible</strong>\uc774\ub098 <strong>Helm</strong> \uc0ac\uc6a9</li><li>\uc124\uc815\uc5d0 \uc8fc\uc11d\uc774 \ud544\uc694\ud55c \uacbd\uc6b0</li><li>\uc778\uac04 \uac00\ub3c5\uc131\uc774 \ucd5c\uc6b0\uc120</li></ul>',
    h3WhenToml: 'TOML\uc744 \uc0ac\uc6a9\ud560 \ub54c...',
    whenTomlList: '<ul><li>Rust \ud504\ub85c\uc81d\ud2b8 \uc124\uc815 (<strong>Cargo.toml</strong>)</li><li>Python \ud504\ub85c\uc81d\ud2b8 \uc124\uc815 (<strong>pyproject.toml</strong>)</li><li><strong>Hugo</strong> \uc0ac\uc6a9</li><li>\uc554\ubb35\uc801 \ud0c0\uc785 \ubcc0\ud658\uc774 \uc5c6\ub294 \uba85\ud655\ud55c \ud615\uc2dd\uc774 \ud544\uc694\ud55c \uacbd\uc6b0</li><li>\uc124\uc815\uc5d0 \uba85\ud655\ud55c \uc139\uc158/\uadf8\ub8f9\uc774 \uc788\ub294 \uacbd\uc6b0</li></ul>',
    h2Pitfalls: '\ud754\ud55c \ud568\uc815',
    h3YamlIndent: 'YAML: \ub4e4\uc5ec\uc4f0\uae30 \ubb38\uc81c',
    yamlIndentDesc: 'YAML\uc740 \ub4e4\uc5ec\uc4f0\uae30\ub85c \uad6c\uc870\ub97c \uc815\uc758\ud569\ub2c8\ub2e4. \ud0ed\uacfc \uc2a4\ud398\uc774\uc2a4\ub97c \ud63c\uc6a9\ud558\uac70\ub098 \ub4e4\uc5ec\uc4f0\uae30 \ub808\ubca8\uc774 \uc77c\uad00\ub418\uc9c0 \uc54a\uc73c\uba74 \uc624\ub958\uac00 \ubc1c\uc0dd\ud569\ub2c8\ub2e4.',
    h3YamlNorway: 'YAML: "\ub178\ub974\uc6e8\uc774 \ubb38\uc81c"',
    yamlNorwayDesc: 'YAML 1.1\uc5d0\uc11c \ub530\uc634\ud45c \uc5c6\ub294 <code>NO</code>, <code>yes</code>, <code>on</code>, <code>off</code>\ub294 \ubd88\ub9ac\uc5b8 \uac12\uc73c\ub85c \ud574\uc11d\ub429\ub2c8\ub2e4. \uad6d\uac00 \ucf54\ub4dc "NO"(\ub178\ub974\uc6e8\uc774)\ub294 <code>false</code>\uac00 \ub429\ub2c8\ub2e4.',
    h3JsonComma: 'JSON: \ud6c4\ud589 \ucf64\ub9c8',
    jsonCommaDesc: 'JSON\uc740 \ud6c4\ud589 \ucf64\ub9c8\ub97c \ud5c8\uc6a9\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \ub9c8\uc9c0\ub9c9 \uc694\uc18c \ub4a4\uc5d0 \ucf64\ub9c8\ub97c \ucd94\uac00\ud558\uba74 \ud30c\uc2f1 \uc624\ub958\uac00 \ubc1c\uc0dd\ud569\ub2c8\ub2e4.',
    h3TomlNested: 'TOML: \uc911\ucca9 \ud14c\uc774\ube14 \uad6c\ubb38',
    tomlNestedDesc: 'TOML\uc5d0\uc11c \uae4a\uc740 \uc911\ucca9 \uad6c\uc870\ub294 \uc7a5\ud669\ud574\uc9c8 \uc218 \uc788\uc2b5\ub2c8\ub2e4. \uac01 \ub808\ubca8\uc5d0 \uc790\uccb4 <code>[section.subsection]</code> \ud5e4\ub354\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.',
    h2Convert: '\ubcc0\ud658 \ub3c4\uad6c',
    convertDesc: '\ud615\uc2dd \uac04 \uc804\ud658\uc774 \ud544\uc694\ud558\uc2e0\uac00\uc694? \ubb34\ub8cc \uc628\ub77c\uc778 \ubcc0\ud658\uae30\ub97c \uc0ac\uc6a9\ud558\uc138\uc694:',
    convertJsonYaml: 'JSON \u2194 YAML \ubcc0\ud658\uae30\u2014\uc591\ubc29\ud5a5 \ubcc0\ud658 \uc9c0\uc6d0',
    convertTomlYaml: 'TOML \u2194 YAML \ubcc0\ud658\uae30\u2014\uc989\uc2dc \ubcc0\ud658',
    h2Faq: '\uc790\uc8fc \ubb3b\ub294 \uc9c8\ubb38',
    faq1Q: 'JSON, YAML, TOML \uc911 \ud30c\uc2f1\uc774 \uac00\uc7a5 \ube60\ub978 \uac83\uc740?',
    faq1A: 'JSON\uc774 \uc77c\ubc18\uc801\uc73c\ub85c \uac00\uc7a5 \ube60\ub985\ub2c8\ub2e4. \ub2e8\uc21c\ud558\uace0 \uc5c4\uaca9\ud55c \ubb38\ubc95 \ub355\ubd84\uc5d0 \ud30c\uc11c\uac00 \uace0\ub3c4\ub85c \ucd5c\uc801\ud654\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4. TOML\ub3c4 \uba85\ud655\ud55c \uad6c\ubb38\uc73c\ub85c \ube60\ub985\ub2c8\ub2e4. YAML\uc740 \ubcf5\uc7a1\ud55c \uc0ac\uc591\uc73c\ub85c \uac00\uc7a5 \ub290\ub9bd\ub2c8\ub2e4.',
    faq2Q: 'JSON\uc5d0\uc11c \uc8fc\uc11d\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub098\uc694?',
    faq2A: '\ud45c\uc900 JSON(RFC 8259)\uc740 \uc8fc\uc11d\uc744 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. JSON5\uc640 JSONC\uac00 \ud655\uc7a5\uc73c\ub85c \uc8fc\uc11d\uc744 \uc9c0\uc6d0\ud558\uc9c0\ub9cc \ube44\ud45c\uc900\uc785\ub2c8\ub2e4.',
    faq3Q: '\uc65c YAML\uc740 "NO"\ub97c false\ub85c \ucde8\uae09\ud558\ub098\uc694?',
    faq3A: 'YAML 1.1\uc5d0\uc11c yes/no, on/off, true/false\ub294 \ubd88\ub9ac\uc5b8 \uac12\uc73c\ub85c \uc778\uc2dd\ub429\ub2c8\ub2e4. "NO"(\ub178\ub974\uc6e8\uc774)\ub294 false\uac00 \ub429\ub2c8\ub2e4. \ud56d\uc0c1 \ub530\uc634\ud45c\ub85c \uac10\uc2f8\uc138\uc694.',
    faq4Q: 'TOML\uc774 YAML\ubcf4\ub2e4 \uc124\uc815 \ud30c\uc77c\uc5d0 \ub354 \uc801\ud569\ud55c\uac00\uc694?',
    faq4A: 'TOML\uc740 \ub2e8\uc21c\ud55c \uc124\uc815\uc5d0 \uc801\ud569\ud569\ub2c8\ub2e4. YAML\uc740 \uae4a\uc740 \uc911\ucca9 \uad6c\uc870\uc5d0 \uc801\ud569\ud569\ub2c8\ub2e4. \uc5d0\ucf54\uc2dc\uc2a4\ud15c\uc5d0 \ub530\ub77c \ub2e4\ub985\ub2c8\ub2e4.',
    faq5Q: '\ud615\uc2dd \uac04 \ubcc0\ud658 \uc2dc \ub370\uc774\ud130\uac00 \uc190\uc2e4\ub418\ub098\uc694?',
    faq5A: '\uc77c\ubc18\uc801\uc778 \ub370\uc774\ud130 \uad6c\uc870\uc5d0\uc11c\ub294 \ubcc0\ud658\uc774 \ubb34\uc190\uc2e4\uc785\ub2c8\ub2e4. YAML \uc575\ucee4\ub098 \uc8fc\uc11d \ub4f1 \ud615\uc2dd \uace0\uc720 \uae30\ub2a5\uc740 JSON\uc73c\ub85c \ubcc0\ud658 \uc2dc \uc190\uc2e4\ub429\ub2c8\ub2e4.',
  },
};

export default function JsonVsYamlVsToml({ lang }: { lang: string }) {
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
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkJsonYaml}
        </Link>
      </p>

      {/* ===== Section 1: Overview ===== */}
      <h2>{ct.h2Overview}</h2>

      <h3>{ct.h3Json}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.jsonDesc }} />

      <h3>{ct.h3Yaml}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.yamlDesc }} />

      <h3>{ct.h3Toml}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.tomlDesc }} />

      {/* ===== Section 2: Syntax Comparison ===== */}
      <h2>{ct.h2Syntax}</h2>
      <p>{ct.syntaxDesc}</p>

      <h3>JSON</h3>
      <pre><code>{`{
  "server": {
    "host": "localhost",
    "port": 8080,
    "debug": true
  },
  "database": {
    "host": "db.example.com",
    "port": 5432,
    "name": "myapp",
    "credentials": {
      "username": "admin",
      "password": "secret"
    }
  },
  "features": ["auth", "logging", "cache"],
  "max_connections": 100
}`}</code></pre>

      <h3>YAML</h3>
      <pre><code>{`# Server configuration
server:
  host: localhost
  port: 8080
  debug: true

# Database settings
database:
  host: db.example.com
  port: 5432
  name: myapp
  credentials:
    username: admin
    password: secret

features:
  - auth
  - logging
  - cache

max_connections: 100`}</code></pre>

      <h3>TOML</h3>
      <pre><code>{`# Server configuration
max_connections = 100
features = ["auth", "logging", "cache"]

[server]
host = "localhost"
port = 8080
debug = true

[database]
host = "db.example.com"
port = 5432
name = "myapp"

[database.credentials]
username = "admin"
password = "secret"`}</code></pre>

      {/* ===== Section 3: Feature Comparison Table ===== */}
      <h2>{ct.h2Features}</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featFeature}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featJson}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featYaml}</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 700 }}>{ct.featToml}</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featComments}</td>
              <td style={{ padding: '10px 16px', color: '#e53e3e' }}>{ct.commentsJson}</td>
              <td style={{ padding: '10px 16px', color: '#38a169' }}>{ct.commentsYaml}</td>
              <td style={{ padding: '10px 16px', color: '#38a169' }}>{ct.commentsToml}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featDataTypes}</td>
              <td style={{ padding: '10px 16px' }}>{ct.typesJson}</td>
              <td style={{ padding: '10px 16px' }}>{ct.typesYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.typesToml}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featReadability}</td>
              <td style={{ padding: '10px 16px' }}>{ct.readJson}</td>
              <td style={{ padding: '10px 16px' }}>{ct.readYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.readToml}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featStrictness}</td>
              <td style={{ padding: '10px 16px' }}>{ct.strictJson}</td>
              <td style={{ padding: '10px 16px' }}>{ct.strictYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.strictToml}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featTooling}</td>
              <td style={{ padding: '10px 16px' }}>{ct.toolJson}</td>
              <td style={{ padding: '10px 16px' }}>{ct.toolYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.toolToml}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{ct.featMultiline}</td>
              <td style={{ padding: '10px 16px' }}>{ct.multiJson}</td>
              <td style={{ padding: '10px 16px' }}>{ct.multiYaml}</td>
              <td style={{ padding: '10px 16px' }}>{ct.multiToml}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== Section 4: When to Use Each Format ===== */}
      <h2>{ct.h2When}</h2>

      <h3>{ct.h3WhenJson}</h3>
      <div dangerouslySetInnerHTML={{ __html: ct.whenJsonList }} />

      <pre><code>{`// Typical JSON use cases
// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true
  }
}`}</code></pre>

      <h3>{ct.h3WhenYaml}</h3>
      <div dangerouslySetInnerHTML={{ __html: ct.whenYamlList }} />

      <pre><code>{`# Docker Compose
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html

# GitHub Actions
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test`}</code></pre>

      <h3>{ct.h3WhenToml}</h3>
      <div dangerouslySetInnerHTML={{ __html: ct.whenTomlList }} />

      <pre><code>{`# Cargo.toml (Rust)
[package]
name = "my-app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

# pyproject.toml (Python)
[project]
name = "my-package"
version = "1.0.0"
requires-python = ">=3.9"

[tool.ruff]
line-length = 88
target-version = "py39"`}</code></pre>

      {/* ===== Section 5: Common Pitfalls ===== */}
      <h2>{ct.h2Pitfalls}</h2>

      <h3>{ct.h3YamlIndent}</h3>
      <p>{ct.yamlIndentDesc}</p>

      <pre><code>{`# BAD: mixing tabs and spaces (invisible but breaks YAML)
services:
\tweb:          # tab character - YAML error!
    image: nginx

# BAD: inconsistent indentation
services:
  web:
      image: nginx   # 4 spaces here
    ports:            # 2 spaces here - error!
      - "80:80"

# GOOD: consistent 2-space indentation
services:
  web:
    image: nginx
    ports:
      - "80:80"`}</code></pre>

      <h3>{ct.h3YamlNorway}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.yamlNorwayDesc }} />

      <pre><code>{`# The "Norway Problem" - YAML 1.1
countries:
  - name: Norway
    code: NO          # Parsed as boolean false!
  - name: Sweden
    code: SE          # Parsed as string "SE"
  - name: Finland
    code: FI          # Parsed as string "FI"

# Other surprising boolean values in YAML 1.1:
truthy:  yes          # boolean true
falsy:   no           # boolean false
enabled: on           # boolean true
disabled: off         # boolean false
positive: TRUE        # boolean true
negative: False       # boolean false

# FIX: Always quote values that could be misinterpreted
countries:
  - name: Norway
    code: "NO"        # Now correctly a string
  - name: Sweden
    code: "SE"
settings:
  enabled: "yes"      # Now correctly a string`}</code></pre>

      <h3>{ct.h3JsonComma}</h3>
      <p>{ct.jsonCommaDesc}</p>

      <pre><code>{`// BAD: trailing comma after last element
{
  "name": "my-app",
  "version": "1.0.0",
  "private": true,    // <-- trailing comma = PARSE ERROR
}

// BAD: trailing comma in array
{
  "colors": [
    "red",
    "green",
    "blue",            // <-- trailing comma = PARSE ERROR
  ]
}

// GOOD: no trailing commas
{
  "name": "my-app",
  "version": "1.0.0",
  "private": true
}`}</code></pre>

      <h3>{ct.h3TomlNested}</h3>
      <p dangerouslySetInnerHTML={{ __html: ct.tomlNestedDesc }} />

      <pre><code>{`# TOML: deeply nested config can be verbose
[server]
host = "localhost"

[server.ssl]
enabled = true

[server.ssl.certificates]
cert = "/path/to/cert.pem"
key = "/path/to/key.pem"

[server.ssl.certificates.ca]
bundle = "/path/to/ca-bundle.pem"

# The same in YAML is more compact:
# server:
#   host: localhost
#   ssl:
#     enabled: true
#     certificates:
#       cert: /path/to/cert.pem
#       key: /path/to/key.pem
#       ca:
#         bundle: /path/to/ca-bundle.pem

# TOML inline tables can help for shallow nesting:
[server]
host = "localhost"
ssl = { enabled = true, cert = "/path/to/cert.pem" }`}</code></pre>

      {/* ===== Section 6: Conversion Tools ===== */}
      <h2>{ct.h2Convert}</h2>
      <p>{ct.convertDesc}</p>

      <p>
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          {ct.convertJsonYaml}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/toml-yaml`} style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          {ct.convertTomlYaml}
        </Link>
      </p>

      {/* ===== Section 7: FAQ ===== */}
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
        <Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkJsonYaml}
        </Link>
      </p>
      <p>
        <Link href={`/${lang}/tools/toml-yaml`} style={{ fontWeight: 600 }}>
          {ct.linkTomlYaml}
        </Link>
      </p>
    </>
  );
}
