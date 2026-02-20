import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>YAML to JSON</strong> conversion is one of the most common data format tasks developers face daily. Whether you are managing Kubernetes manifests, Docker Compose files, CI/CD pipelines, or application configuration, you frequently need to <strong>convert YAML to JSON</strong> and back. YAML (YAML Ain\'t Markup Language) is prized for its human-readable, indentation-based syntax, while JSON (JavaScript Object Notation) dominates APIs and programmatic data exchange. This comprehensive guide covers everything you need to know about <strong>yaml to json converter</strong> tools, the parsing process, code examples in four languages, common pitfalls, and best practices. If you need a quick <strong>yaml to json online</strong> conversion, try our free tool below.',
    linkTool: 'Try our free online YAML to JSON / JSON to YAML converter instantly.',
    h2_whatYaml: 'What Is YAML?',
    whatYamlDesc1: '<strong>YAML</strong> (YAML Ain\'t Markup Language) is a human-friendly data serialization language used extensively for configuration files and data exchange. Originally standing for "Yet Another Markup Language," the recursive acronym was later changed to emphasize that YAML is about data, not document markup. A <strong>yaml parser</strong> reads the indentation-based structure and converts it into native data structures like dictionaries, lists, and scalars.',
    whatYamlDesc2: 'YAML uses whitespace indentation (spaces only, never tabs) to denote structure, making it visually clean and easy to read. It supports scalar types (strings, integers, floats, booleans, null), sequences (arrays/lists), and mappings (dictionaries/objects). Advanced features include anchors and aliases for reusing data, multi-line strings with block scalars (<code>|</code> for literal, <code>&gt;</code> for folded), and multiple documents in a single file separated by <code>---</code>. The <strong>yaml syntax</strong> is designed to be a superset of JSON, meaning every valid JSON document is also valid YAML.',
    whatYamlDesc3: 'YAML is the preferred format for Kubernetes manifests, Ansible playbooks, Docker Compose files, GitHub Actions workflows, Swagger/OpenAPI specifications, Spring Boot configuration, and many other DevOps and cloud-native tools. Its readability advantage over JSON makes it the go-to choice for files that humans edit frequently, while JSON remains preferred for machine-to-machine communication and APIs.',
    h2_differences: 'YAML vs JSON: Key Differences',
    differencesDesc: 'Understanding the differences between YAML and JSON helps you choose the right format and avoid conversion pitfalls. Here is a detailed comparison:',
    diffTable: '<table><thead><tr><th>Feature</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Syntax</strong></td><td>Indentation-based, no brackets or braces required</td><td>Bracket and brace delimited (<code>{}</code>, <code>[]</code>)</td></tr><tr><td><strong>Comments</strong></td><td>Supports comments with <code>#</code></td><td>No comment support</td></tr><tr><td><strong>Data types</strong></td><td>Strings, ints, floats, bools, null, dates, binary</td><td>Strings, numbers, booleans, null, arrays, objects</td></tr><tr><td><strong>Multi-line strings</strong></td><td>Block scalars: <code>|</code> (literal) and <code>&gt;</code> (folded)</td><td>Must use <code>\\n</code> escape sequences</td></tr><tr><td><strong>Anchors &amp; aliases</strong></td><td>Supported with <code>&amp;</code> and <code>*</code> for data reuse</td><td>Not supported</td></tr><tr><td><strong>Multiple documents</strong></td><td>Yes, separated by <code>---</code></td><td>No (one value per file)</td></tr><tr><td><strong>Readability</strong></td><td>Highly readable, minimal punctuation</td><td>More verbose with quotes and braces</td></tr><tr><td><strong>File size</strong></td><td>Generally smaller (no quotes or braces)</td><td>Slightly larger due to syntax characters</td></tr><tr><td><strong>Parsing speed</strong></td><td>Slower (indentation-sensitive parsing)</td><td>Faster (simpler grammar)</td></tr><tr><td><strong>Tooling</strong></td><td>Good support; yamllint, yq, PyYAML</td><td>Universal support; native in all languages</td></tr></tbody></table>',
    h2_howWorks: 'How YAML to JSON Conversion Works',
    howWorksDesc1: 'When you use a <strong>yaml to json converter</strong>, the tool performs a multi-step parsing and serialization process. Understanding these steps helps you debug conversion issues and handle edge cases correctly.',
    howWorksDesc2: '<strong>Step 1: Lexical Analysis (Tokenization)</strong> &mdash; The <strong>yaml parser</strong> scans the raw YAML text character by character, identifying tokens such as indentation levels, key-value separators (<code>:</code>), sequence indicators (<code>-</code>), block scalar indicators (<code>|</code>, <code>&gt;</code>), anchors (<code>&amp;</code>), aliases (<code>*</code>), tags, and scalar values. Unlike JSON parsing, YAML tokenization must track indentation depth to determine nesting.',
    howWorksDesc3: '<strong>Step 2: Parsing (AST Construction)</strong> &mdash; Tokens are assembled into an Abstract Syntax Tree (AST) that represents the hierarchical structure. Mappings become object nodes, sequences become array nodes, and scalars become leaf nodes. Anchors are stored for later resolution when aliases reference them.',
    howWorksDesc4: '<strong>Step 3: Composing (Native Data Structures)</strong> &mdash; The AST is converted into the programming language\'s native data structures: YAML mappings become JSON objects (or language dictionaries/maps), YAML sequences become JSON arrays (or language lists), and YAML scalars are type-resolved. This is where implicit type conversion occurs: <code>true</code>/<code>false</code>/<code>yes</code>/<code>no</code> become booleans, unquoted numbers become integers or floats, <code>null</code>/<code>~</code> become null, and dates like <code>2024-01-15</code> may become date objects.',
    howWorksDesc5: '<strong>Step 4: JSON Serialization</strong> &mdash; Finally, the native data structures are serialized into JSON text using <code>JSON.stringify()</code>, <code>json.dumps()</code>, or equivalent. Multi-document YAML files (separated by <code>---</code>) are typically converted into a JSON array where each element represents one document. YAML comments are discarded since JSON has no comment syntax. Anchors and aliases are fully resolved (dereferenced) into their expanded form.',
    h2_codeExamples: 'YAML to JSON Code Examples',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: 'The <code>js-yaml</code> library is the most popular <strong>yaml parser</strong> for JavaScript and Node.js. It provides <code>yaml.load()</code> to parse YAML into JavaScript objects and <code>yaml.dump()</code> for the reverse. Combined with the native <code>JSON.stringify()</code>, you get a complete <strong>yaml to json converter</strong>:',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: 'Python\'s <code>PyYAML</code> library is the standard <strong>yaml parser</strong> for Python. Always use <code>yaml.safe_load()</code> instead of <code>yaml.load()</code> to prevent arbitrary code execution from untrusted YAML. Combined with <code>json.dumps()</code>, you can <strong>convert yaml to json</strong> in just two lines:',
    codeBashTitle: 'Bash / CLI (yq, python one-liner)',
    codeBashDesc: 'For command-line <strong>yaml to json</strong> conversion, <code>yq</code> (a YAML processor similar to <code>jq</code>) is the most efficient tool. You can also use Python or Ruby one-liners for quick conversions without installing extra tools:',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'In Go, the <code>gopkg.in/yaml.v3</code> package provides robust YAML parsing. Go\'s strong typing makes the <strong>yaml to json</strong> conversion explicit. You unmarshal YAML into an <code>interface{}</code> and then marshal it back as JSON:',
    h2_jsonToYaml: 'JSON to YAML Conversion',
    jsonToYamlDesc1: 'The reverse direction &mdash; <strong>json to yaml converter</strong> &mdash; is equally important. When you receive JSON from an API and need to store it in a YAML configuration file, or when you want to make a JSON document more human-readable, converting JSON to YAML is the solution. Every major YAML library supports this direction natively.',
    jsonToYamlDesc2: '<strong>Key consideration: comments are lost</strong>. If you convert a commented YAML file to JSON and back to YAML, all comments will be permanently lost because JSON has no comment syntax. This is the most common complaint about round-trip conversion. To preserve comments, use specialized tools like <code>ruamel.yaml</code> in Python or <code>yaml</code> CST (Concrete Syntax Tree) parsers that maintain the original formatting.',
    jsonToYamlDesc3: '<strong>Best practices for JSON to YAML conversion</strong>: (1) Use 2-space indentation for consistency with Kubernetes and Docker conventions. (2) Avoid flow style (<code>{}</code> and <code>[]</code>) in output for maximum readability. (3) Quote strings that could be misinterpreted as other types (e.g., <code>"yes"</code>, <code>"3.14"</code>, <code>"null"</code>). (4) Validate the output with a <strong>yaml validator</strong> to catch indentation or syntax errors.',
    h2_pitfalls: 'Common YAML Pitfalls and Edge Cases',
    pitfallsDesc: 'YAML\'s flexibility introduces several gotchas that catch even experienced developers. Understanding these pitfalls helps you write correct YAML and avoid bugs when using a <strong>yaml to json converter</strong>:',
    pitfall1: '<strong>Tabs vs. Spaces</strong> &mdash; YAML forbids tabs for indentation. Using tabs will cause a parse error. Always configure your editor to insert spaces (typically 2) when pressing Tab in YAML files. A <strong>yaml validator</strong> will immediately catch tab characters.',
    pitfall2: '<strong>The Boolean Trap</strong> &mdash; YAML 1.1 (used by many parsers including PyYAML) interprets a surprisingly large set of values as booleans: <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code>, <code>true</code>, <code>false</code>, <code>y</code>, <code>n</code> (case-insensitive). This means a country code like <code>NO</code> (Norway) or a value like <code>on</code> becomes a boolean <code>true</code> or <code>false</code> in JSON. Always quote strings that could be misread: <code>"NO"</code>, <code>"yes"</code>, <code>"on"</code>. YAML 1.2 restricts booleans to only <code>true</code> and <code>false</code>, but many parsers still default to 1.1 behavior.',
    pitfall3: '<strong>Multiline Strings</strong> &mdash; YAML offers multiple ways to write multiline strings, each with subtle differences. The literal block scalar <code>|</code> preserves newlines exactly as written. The folded block scalar <code>&gt;</code> replaces single newlines with spaces (like HTML). Chomping indicators control trailing newlines: <code>|+</code> keeps all trailing newlines, <code>|-</code> strips all trailing newlines, and <code>|</code> (default) keeps one trailing newline. Misunderstanding these produces unexpected whitespace in your JSON output.',
    pitfall4: '<strong>Special Characters in Keys and Values</strong> &mdash; Colons, hashes, brackets, and braces in YAML values must be quoted to avoid parsing errors. For example, <code>url: https://example.com</code> works, but <code>message: Hello: World</code> fails because the parser sees a second key. Use quotes: <code>message: "Hello: World"</code>. Similarly, values starting with <code>{</code>, <code>[</code>, <code>*</code>, <code>&amp;</code>, <code>!</code>, <code>%</code>, or <code>@</code> need quoting.',
    pitfall5: '<strong>Anchors and Aliases</strong> &mdash; YAML anchors (<code>&amp;name</code>) and aliases (<code>*name</code>) let you reuse data, reducing duplication. However, they are fully expanded during JSON conversion, potentially increasing file size. Deeply nested or circular aliases can cause infinite loops in naive parsers. Merge keys (<code>&lt;&lt;: *base</code>) allow inheriting mappings but are not part of the official YAML 1.2 spec and may not be supported by all parsers. Always test anchor-heavy YAML with your specific <strong>yaml parser</strong>.',
    pitfall6: '<strong>Number and Date Interpretation</strong> &mdash; Unquoted values like <code>3.14</code> become floats, <code>42</code> becomes an integer, <code>0o17</code> becomes an octal number (15), <code>0x1F</code> becomes hex (31), and <code>2024-01-15</code> may become a date object. If you intend these as strings, quote them. Version numbers like <code>1.0</code> are particularly problematic as they become the float <code>1</code> instead of the string <code>"1.0"</code>.',
    h2_bestPractices: 'YAML Best Practices',
    bestPracticesDesc: 'Follow these best practices to write clean, maintainable YAML that converts to JSON without surprises:',
    bp1: '<strong>Consistent indentation</strong> &mdash; Use 2 spaces for indentation throughout your YAML files. This matches the conventions used by Kubernetes, Docker Compose, and most cloud-native tools. Never mix different indentation levels in the same file. Configure your editor\'s <code>.editorconfig</code> or formatting settings to enforce this automatically.',
    bp2: '<strong>Quote strings defensively</strong> &mdash; When in doubt, quote your strings. Always use quotes for values that look like booleans (<code>"yes"</code>, <code>"no"</code>, <code>"on"</code>, <code>"off"</code>), numbers (<code>"1.0"</code>, <code>"3.14"</code>), null (<code>"null"</code>, <code>"~"</code>), and date-like strings (<code>"2024-01-15"</code>). Prefer double quotes (<code>"</code>) for consistency, as they support escape sequences.',
    bp3: '<strong>Avoid the boolean trap</strong> &mdash; Be especially careful with country codes (NO, YES), toggle values (on, off), and short answers (y, n). In a <strong>yaml to json converter</strong>, these silently become <code>true</code> or <code>false</code> unless quoted. Use a linter to catch these issues automatically.',
    bp4: '<strong>Schema validation</strong> &mdash; Validate your YAML against a JSON Schema to catch structural errors early. Tools like <code>ajv</code> (JavaScript), <code>jsonschema</code> (Python), and <code>kubeval</code> (Kubernetes) can validate the data after conversion to JSON. For YAML-specific validation, use a <strong>yaml validator</strong> that checks both syntax and schema compliance.',
    bp5: '<strong>Lint with yamllint</strong> &mdash; Install <code>yamllint</code> and run it in your CI/CD pipeline. It checks for common issues: trailing whitespace, inconsistent indentation, missing document start markers, truthy values, and line length. A <code>.yamllint.yml</code> configuration file lets you customize rules for your project. Example: <code>yamllint -d "{extends: default, rules: {line-length: {max: 120}}}" .</code>',
    bp6: '<strong>Use comments wisely</strong> &mdash; One of YAML\'s biggest advantages over JSON is comment support. Document non-obvious configuration choices, include links to documentation, and explain magic numbers. Remember that comments are lost during <strong>yaml to json</strong> conversion, so critical information should also be in external documentation.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between YAML and JSON?',
    faq1_a: 'YAML and JSON are both data serialization formats, but they differ in several key ways. YAML uses indentation-based syntax with no brackets or braces, supports comments with #, and offers advanced features like anchors, aliases, and multi-line strings. JSON uses bracket/brace delimiters, has no comment support, and is limited to strings, numbers, booleans, null, arrays, and objects. YAML is more human-readable and preferred for configuration files, while JSON is more widely supported in APIs and programming languages. YAML is technically a superset of JSON, meaning every valid JSON document is also valid YAML.',
    faq2_q: 'How do I convert YAML to JSON?',
    faq2_a: 'You can convert YAML to JSON using online tools, command-line utilities, or programming libraries. Online: use a yaml to json online converter tool. CLI: install yq and run "yq -o=json file.yaml" or use a Python one-liner "python3 -c \'import sys,yaml,json; json.dump(yaml.safe_load(sys.stdin),sys.stdout,indent=2)\' < file.yaml". Programmatically: in JavaScript use js-yaml with JSON.stringify, in Python use PyYAML with json.dumps, in Go use gopkg.in/yaml.v3 with encoding/json. All methods parse the YAML into native data structures and then serialize to JSON.',
    faq3_q: 'When should I use YAML vs JSON?',
    faq3_a: 'Use YAML for configuration files that humans edit frequently (Kubernetes manifests, Docker Compose, CI/CD pipelines, Ansible playbooks) because its clean syntax, comment support, and multiline strings improve readability. Use JSON for API responses, data exchange between services, browser-based applications, and any context where parsing speed matters or where the data is primarily machine-generated and machine-consumed. Many projects use both: YAML for configuration and JSON for API communication. If you need to switch between formats, a yaml to json converter makes it seamless.',
    conclusion: 'Mastering <strong>yaml to json</strong> conversion and understanding <strong>YAML syntax</strong> is essential for modern DevOps and software development. From Kubernetes manifests to CI/CD pipelines, YAML is everywhere in the cloud-native ecosystem. By understanding how the <strong>yaml parser</strong> works, avoiding common pitfalls like the boolean trap and tab characters, and following best practices for quoting and validation, you can write robust YAML configurations that convert cleanly to JSON every time. Use our free <strong>yaml to json online</strong> tool and <strong>yaml validator</strong> to streamline your workflow.',
    linkToolBottom: 'Convert YAML to JSON and JSON to YAML instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>YAML 到 JSON</strong> 的转换是开发者日常面对的最常见数据格式任务之一。无论你管理 Kubernetes 清单、Docker Compose 文件、CI/CD 管道还是应用配置，都经常需要在 YAML 和 JSON 之间转换。YAML 以其可读性强、基于缩进的语法著称，而 JSON 则主导 API 和程序化数据交换。本综合指南涵盖了 YAML 到 JSON 转换器工具、解析过程、四种语言的代码示例、常见陷阱和最佳实践。如果你需要快速进行 YAML 到 JSON 的在线转换，请试用我们下方的免费工具。',
    linkTool: '立即试用我们的免费在线 YAML 到 JSON / JSON 到 YAML 转换工具。',
    h2_whatYaml: '什么是 YAML？',
    whatYamlDesc1: '<strong>YAML</strong>（YAML Ain\'t Markup Language）是一种人类友好的数据序列化语言，广泛用于配置文件和数据交换。YAML 解析器读取基于缩进的结构，将其转换为字典、列表和标量等原生数据结构。',
    whatYamlDesc2: 'YAML 使用空白缩进（仅限空格，不允许制表符）来表示结构，使其视觉上整洁易读。它支持标量类型（字符串、整数、浮点数、布尔值、null）、序列（数组/列表）和映射（字典/对象）。高级功能包括锚点和别名用于数据重用、多行字符串的块标量（<code>|</code> 保持原样，<code>&gt;</code> 折叠），以及用 <code>---</code> 分隔的多文档文件。YAML 语法被设计为 JSON 的超集，即每个有效的 JSON 文档也是有效的 YAML。',
    whatYamlDesc3: 'YAML 是 Kubernetes 清单、Ansible playbook、Docker Compose 文件、GitHub Actions 工作流、Swagger/OpenAPI 规范、Spring Boot 配置等众多 DevOps 和云原生工具的首选格式。其相比 JSON 的可读性优势使其成为人类频繁编辑的文件的首选，而 JSON 仍是机器间通信和 API 的首选。',
    h2_differences: 'YAML 与 JSON：关键区别',
    differencesDesc: '了解 YAML 和 JSON 之间的区别有助于选择正确的格式并避免转换陷阱。以下是详细对比：',
    diffTable: '<table><thead><tr><th>特性</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>语法</strong></td><td>基于缩进，无需括号或大括号</td><td>由括号和大括号分隔</td></tr><tr><td><strong>注释</strong></td><td>支持 <code>#</code> 注释</td><td>不支持注释</td></tr><tr><td><strong>数据类型</strong></td><td>字符串、整数、浮点、布尔、null、日期、二进制</td><td>字符串、数字、布尔、null、数组、对象</td></tr><tr><td><strong>多行字符串</strong></td><td>块标量：<code>|</code>（保持原样）和 <code>&gt;</code>（折叠）</td><td>必须使用 <code>\\n</code> 转义</td></tr><tr><td><strong>锚点和别名</strong></td><td>支持 <code>&amp;</code> 和 <code>*</code> 数据重用</td><td>不支持</td></tr><tr><td><strong>可读性</strong></td><td>高度可读，标点符号少</td><td>引号和括号较多</td></tr><tr><td><strong>解析速度</strong></td><td>较慢（缩进敏感）</td><td>较快（语法简单）</td></tr></tbody></table>',
    h2_howWorks: 'YAML 到 JSON 转换的工作原理',
    howWorksDesc1: '使用 YAML 到 JSON 转换器时，工具会执行多步解析和序列化过程。',
    howWorksDesc2: '<strong>第 1 步：词法分析（分词）</strong> &mdash; YAML 解析器逐字符扫描原始 YAML 文本，识别缩进级别、键值分隔符（<code>:</code>）、序列指示符（<code>-</code>）、块标量指示符（<code>|</code>、<code>&gt;</code>）、锚点（<code>&amp;</code>）、别名（<code>*</code>）和标量值等标记。',
    howWorksDesc3: '<strong>第 2 步：解析（AST 构建）</strong> &mdash; 标记被组装成代表层次结构的抽象语法树（AST）。映射成为对象节点，序列成为数组节点，标量成为叶节点。',
    howWorksDesc4: '<strong>第 3 步：组合（原生数据结构）</strong> &mdash; AST 被转换为编程语言的原生数据结构。此时发生隐式类型转换：<code>true</code>/<code>false</code>/<code>yes</code>/<code>no</code> 变为布尔值，未引用的数字变为整数或浮点数。',
    howWorksDesc5: '<strong>第 4 步：JSON 序列化</strong> &mdash; 原生数据结构被序列化为 JSON 文本。YAML 注释被丢弃，锚点和别名被完全展开。',
    h2_codeExamples: 'YAML 到 JSON 代码示例',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: '<code>js-yaml</code> 是最流行的 JavaScript YAML 解析器。使用 <code>yaml.load()</code> 解析 YAML，结合 <code>JSON.stringify()</code> 实现完整的 YAML 到 JSON 转换：',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: 'Python 的 <code>PyYAML</code> 是标准的 YAML 解析器。始终使用 <code>yaml.safe_load()</code> 以防止不受信任的 YAML 执行任意代码：',
    codeBashTitle: 'Bash / CLI (yq, python 单行命令)',
    codeBashDesc: '命令行 YAML 到 JSON 转换中，<code>yq</code> 是最高效的工具。也可以用 Python 或 Ruby 单行命令快速转换：',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'Go 语言中，<code>gopkg.in/yaml.v3</code> 包提供强大的 YAML 解析支持：',
    h2_jsonToYaml: 'JSON 到 YAML 转换',
    jsonToYamlDesc1: '反方向的 JSON 到 YAML 转换同样重要。当你从 API 接收 JSON 需要存储为 YAML 配置时，或想让 JSON 更具可读性时，这是最佳方案。',
    jsonToYamlDesc2: '<strong>注意：注释会丢失</strong>。将带注释的 YAML 转为 JSON 再转回 YAML，所有注释将永久丢失。要保留注释，请使用 <code>ruamel.yaml</code> 等专用工具。',
    jsonToYamlDesc3: '<strong>最佳实践</strong>：(1) 使用 2 空格缩进。(2) 避免流式风格。(3) 引用可能被误解的字符串。(4) 用 YAML 验证器验证输出。',
    h2_pitfalls: '常见 YAML 陷阱与边缘情况',
    pitfallsDesc: 'YAML 的灵活性引入了一些坑点。了解这些陷阱有助于编写正确的 YAML：',
    pitfall1: '<strong>制表符与空格</strong> &mdash; YAML 禁止使用制表符缩进。始终配置编辑器在 YAML 文件中插入空格。',
    pitfall2: '<strong>布尔值陷阱</strong> &mdash; YAML 1.1 将 <code>yes</code>、<code>no</code>、<code>on</code>、<code>off</code> 等解释为布尔值。国家代码 <code>NO</code>（挪威）会变成 <code>false</code>。务必给可能被误读的字符串加引号。',
    pitfall3: '<strong>多行字符串</strong> &mdash; <code>|</code> 保持换行，<code>&gt;</code> 将换行替换为空格。截断指示符控制尾部换行。',
    pitfall4: '<strong>特殊字符</strong> &mdash; 值中的冒号、井号、括号和大括号必须加引号以避免解析错误。',
    pitfall5: '<strong>锚点和别名</strong> &mdash; JSON 转换时完全展开，可能增加文件大小。循环别名可能导致无限循环。',
    pitfall6: '<strong>数字和日期解释</strong> &mdash; <code>1.0</code> 变成浮点数 <code>1</code> 而非字符串 <code>"1.0"</code>。如需字符串，请加引号。',
    h2_bestPractices: 'YAML 最佳实践',
    bestPracticesDesc: '遵循以下最佳实践，编写干净、可维护的 YAML：',
    bp1: '<strong>一致的缩进</strong> &mdash; 全文使用 2 个空格缩进，与 Kubernetes 和 Docker Compose 的惯例一致。',
    bp2: '<strong>防御性引用字符串</strong> &mdash; 有疑问时就加引号。布尔值、数字、null 和日期格式的值都应该引用。',
    bp3: '<strong>避免布尔值陷阱</strong> &mdash; 特别注意国家代码、开关值和简短回答。使用 linter 自动检查。',
    bp4: '<strong>Schema 验证</strong> &mdash; 使用 JSON Schema 验证 YAML 结构。',
    bp5: '<strong>使用 yamllint</strong> &mdash; 在 CI/CD 管道中集成 <code>yamllint</code> 检查常见问题。',
    bp6: '<strong>明智地使用注释</strong> &mdash; 记住注释在转为 JSON 时会丢失，关键信息也应保存在外部文档中。',
    h2_faq: '常见问题',
    faq1_q: 'YAML 和 JSON 有什么区别？',
    faq1_a: 'YAML 和 JSON 都是数据序列化格式，但有几个关键区别。YAML 使用基于缩进的语法，支持注释和高级功能（锚点、别名、多行字符串）。JSON 使用括号分隔，不支持注释，数据类型更有限。YAML 更适合人工编辑的配置文件，JSON 更适合 API 和机器通信。YAML 是 JSON 的超集。',
    faq2_q: '如何将 YAML 转换为 JSON？',
    faq2_a: '可通过在线工具、命令行或编程库转换。CLI：安装 yq 执行 "yq -o=json file.yaml"。Python：使用 PyYAML 的 yaml.safe_load 加 json.dumps。JavaScript：使用 js-yaml 加 JSON.stringify。所有方法都是先解析 YAML 为原生数据结构，再序列化为 JSON。',
    faq3_q: '何时使用 YAML，何时使用 JSON？',
    faq3_a: '用 YAML 处理人类频繁编辑的配置文件（Kubernetes、Docker Compose、CI/CD），因其语法清晰、支持注释。用 JSON 处理 API 响应、服务间数据交换和浏览器应用。许多项目同时使用两者：YAML 用于配置，JSON 用于 API 通信。',
    conclusion: '掌握 YAML 到 JSON 的转换和 YAML 语法对现代 DevOps 和软件开发至关重要。通过理解 YAML 解析器的工作原理、避免布尔值陷阱等常见坑点，并遵循引用和验证的最佳实践，你可以编写出每次都能干净转换为 JSON 的健壮 YAML 配置。',
    linkToolBottom: '使用我们的免费在线工具即时转换 YAML 与 JSON。',
  },
  fr: {
    intro: 'La conversion <strong>YAML vers JSON</strong> est l\'une des taches de format de donnees les plus courantes pour les developpeurs. Que vous geriez des manifestes Kubernetes, des fichiers Docker Compose ou des pipelines CI/CD, vous devez frequemment convertir entre YAML et JSON. Ce guide complet couvre les outils de conversion, le processus d\'analyse, les exemples de code et les bonnes pratiques.',
    linkTool: 'Essayez notre convertisseur YAML vers JSON / JSON vers YAML gratuit en ligne.',
    h2_whatYaml: 'Qu\'est-ce que YAML ?',
    whatYamlDesc1: '<strong>YAML</strong> (YAML Ain\'t Markup Language) est un langage de serialisation de donnees convivial, largement utilise pour les fichiers de configuration. Un analyseur YAML lit la structure basee sur l\'indentation et la convertit en structures de donnees natives.',
    whatYamlDesc2: 'YAML utilise l\'indentation par espaces (jamais de tabulations) pour denoter la structure. Il prend en charge les types scalaires, les sequences (tableaux) et les mappings (dictionnaires). Les fonctionnalites avancees incluent les ancres et alias, les chaines multi-lignes et les documents multiples separes par <code>---</code>. La syntaxe YAML est un surensemble de JSON.',
    whatYamlDesc3: 'YAML est le format prefere pour Kubernetes, Ansible, Docker Compose, GitHub Actions, OpenAPI et de nombreux outils cloud-natifs. Sa lisibilite superieure a JSON en fait le choix ideal pour les fichiers edites par des humains.',
    h2_differences: 'YAML vs JSON : Differences cles',
    differencesDesc: 'Comprendre les differences entre YAML et JSON aide a choisir le bon format :',
    diffTable: '<table><thead><tr><th>Caracteristique</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Syntaxe</strong></td><td>Basee sur l\'indentation</td><td>Delimitee par des accolades</td></tr><tr><td><strong>Commentaires</strong></td><td>Oui avec <code>#</code></td><td>Non</td></tr><tr><td><strong>Types</strong></td><td>Chaines, entiers, flottants, booleens, null, dates</td><td>Chaines, nombres, booleens, null, tableaux, objets</td></tr><tr><td><strong>Lisibilite</strong></td><td>Tres lisible</td><td>Plus verbeux</td></tr><tr><td><strong>Vitesse</strong></td><td>Plus lent</td><td>Plus rapide</td></tr></tbody></table>',
    h2_howWorks: 'Comment fonctionne la conversion YAML vers JSON',
    howWorksDesc1: 'Un convertisseur YAML vers JSON effectue un processus d\'analyse et de serialisation en plusieurs etapes.',
    howWorksDesc2: '<strong>Etape 1 : Analyse lexicale</strong> &mdash; L\'analyseur YAML identifie les tokens : niveaux d\'indentation, separateurs, indicateurs de blocs, ancres et alias.',
    howWorksDesc3: '<strong>Etape 2 : Construction de l\'AST</strong> &mdash; Les tokens sont assembles en un arbre syntaxique abstrait representant la structure hierarchique.',
    howWorksDesc4: '<strong>Etape 3 : Structures de donnees natives</strong> &mdash; L\'AST est converti en structures natives du langage avec resolution de types.',
    howWorksDesc5: '<strong>Etape 4 : Serialisation JSON</strong> &mdash; Les structures sont serialisees en JSON. Les commentaires YAML sont supprimes.',
    h2_codeExamples: 'Exemples de code YAML vers JSON',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: 'La bibliotheque <code>js-yaml</code> est l\'analyseur YAML le plus populaire pour JavaScript :',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: 'Utilisez toujours <code>yaml.safe_load()</code> pour eviter l\'execution de code arbitraire :',
    codeBashTitle: 'Bash / CLI (yq)',
    codeBashDesc: 'Pour la conversion en ligne de commande, <code>yq</code> est l\'outil le plus efficace :',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'En Go, <code>gopkg.in/yaml.v3</code> fournit une analyse YAML robuste :',
    h2_jsonToYaml: 'Conversion JSON vers YAML',
    jsonToYamlDesc1: 'La direction inverse est tout aussi importante pour stocker des donnees API en configuration YAML.',
    jsonToYamlDesc2: '<strong>Les commentaires sont perdus</strong> lors de la conversion aller-retour YAML-JSON-YAML. Utilisez <code>ruamel.yaml</code> pour les preserver.',
    jsonToYamlDesc3: '<strong>Bonnes pratiques</strong> : indentation de 2 espaces, eviter le style flow, citer les chaines ambigues, valider la sortie.',
    h2_pitfalls: 'Pieges YAML courants',
    pitfallsDesc: 'La flexibilite de YAML introduit plusieurs pieges :',
    pitfall1: '<strong>Tabulations vs espaces</strong> &mdash; YAML interdit les tabulations pour l\'indentation.',
    pitfall2: '<strong>Piege des booleens</strong> &mdash; <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> sont interpretes comme des booleens. Citez ces valeurs.',
    pitfall3: '<strong>Chaines multi-lignes</strong> &mdash; <code>|</code> preserve les retours a la ligne, <code>&gt;</code> les remplace par des espaces.',
    pitfall4: '<strong>Caracteres speciaux</strong> &mdash; Les deux-points et crochets dans les valeurs doivent etre cites.',
    pitfall5: '<strong>Ancres et alias</strong> &mdash; Completement developpes lors de la conversion JSON.',
    pitfall6: '<strong>Nombres et dates</strong> &mdash; <code>1.0</code> devient un flottant, pas la chaine <code>"1.0"</code>.',
    h2_bestPractices: 'Bonnes pratiques YAML',
    bestPracticesDesc: 'Suivez ces pratiques pour un YAML propre et maintenable :',
    bp1: '<strong>Indentation coherente</strong> &mdash; 2 espaces, conformement aux conventions Kubernetes.',
    bp2: '<strong>Citer les chaines</strong> &mdash; En cas de doute, utilisez des guillemets.',
    bp3: '<strong>Eviter le piege des booleens</strong> &mdash; Faites attention aux codes pays et valeurs de bascule.',
    bp4: '<strong>Validation par schema</strong> &mdash; Validez avec JSON Schema.',
    bp5: '<strong>Utiliser yamllint</strong> &mdash; Integrez-le dans votre pipeline CI/CD.',
    bp6: '<strong>Commentaires judicieux</strong> &mdash; N\'oubliez pas qu\'ils sont perdus lors de la conversion en JSON.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Quelle est la difference entre YAML et JSON ?',
    faq1_a: 'YAML utilise l\'indentation, supporte les commentaires et offre des fonctionnalites avancees. JSON utilise des delimiteurs, ne supporte pas les commentaires et a des types plus limites. YAML est prefere pour la configuration, JSON pour les API.',
    faq2_q: 'Comment convertir YAML en JSON ?',
    faq2_a: 'Utilisez des outils en ligne, yq en CLI, ou des bibliotheques : js-yaml en JavaScript, PyYAML en Python, gopkg.in/yaml.v3 en Go. Toutes les methodes analysent le YAML puis serialisent en JSON.',
    faq3_q: 'Quand utiliser YAML ou JSON ?',
    faq3_a: 'YAML pour les fichiers de configuration edites par des humains. JSON pour les API et l\'echange de donnees entre services.',
    conclusion: 'Maitriser la conversion YAML vers JSON est essentiel pour le DevOps moderne. Utilisez notre outil gratuit et validateur YAML pour optimiser votre flux de travail.',
    linkToolBottom: 'Convertissez YAML en JSON et JSON en YAML instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die <strong>YAML-zu-JSON</strong>-Konvertierung ist eine der haufigsten Datenformataufgaben fur Entwickler. Ob Sie Kubernetes-Manifeste, Docker-Compose-Dateien oder CI/CD-Pipelines verwalten &ndash; Sie mussen haufig zwischen YAML und JSON konvertieren. Dieser umfassende Leitfaden behandelt Konvertierungstools, den Parsing-Prozess, Codebeispiele und Best Practices.',
    linkTool: 'Testen Sie unseren kostenlosen Online YAML-zu-JSON / JSON-zu-YAML-Konverter.',
    h2_whatYaml: 'Was ist YAML?',
    whatYamlDesc1: '<strong>YAML</strong> (YAML Ain\'t Markup Language) ist eine menschenfreundliche Datenserialisierungssprache, die haufig fur Konfigurationsdateien verwendet wird. Ein YAML-Parser liest die einruckungsbasierte Struktur und konvertiert sie in native Datenstrukturen.',
    whatYamlDesc2: 'YAML verwendet Leerzeichen-Einruckung (niemals Tabs) zur Strukturierung. Es unterstutzt skalare Typen, Sequenzen (Arrays) und Mappings (Dictionaries). Erweiterte Funktionen umfassen Anker und Aliase, mehrzeilige Strings und Mehrfachdokumente getrennt durch <code>---</code>. YAML ist ein Superset von JSON.',
    whatYamlDesc3: 'YAML ist das bevorzugte Format fur Kubernetes, Ansible, Docker Compose, GitHub Actions und viele andere Cloud-native Tools. Seine Lesbarkeit macht es ideal fur von Menschen bearbeitete Dateien.',
    h2_differences: 'YAML vs JSON: Wesentliche Unterschiede',
    differencesDesc: 'Das Verstandnis der Unterschiede hilft bei der Formatwahl:',
    diffTable: '<table><thead><tr><th>Merkmal</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Syntax</strong></td><td>Einruckungsbasiert</td><td>Klammer-basiert</td></tr><tr><td><strong>Kommentare</strong></td><td>Ja mit <code>#</code></td><td>Nein</td></tr><tr><td><strong>Datentypen</strong></td><td>Strings, Zahlen, Booleans, null, Datum</td><td>Strings, Zahlen, Booleans, null, Arrays, Objekte</td></tr><tr><td><strong>Lesbarkeit</strong></td><td>Sehr gut lesbar</td><td>Ausfuhrlicher</td></tr><tr><td><strong>Geschwindigkeit</strong></td><td>Langsamer</td><td>Schneller</td></tr></tbody></table>',
    h2_howWorks: 'Wie YAML-zu-JSON-Konvertierung funktioniert',
    howWorksDesc1: 'Ein YAML-zu-JSON-Konverter fuhrt einen mehrstufigen Parsing- und Serialisierungsprozess durch.',
    howWorksDesc2: '<strong>Schritt 1: Lexikalische Analyse</strong> &mdash; Der YAML-Parser identifiziert Token: Einruckungsebenen, Trennzeichen, Blockindikatoren.',
    howWorksDesc3: '<strong>Schritt 2: AST-Konstruktion</strong> &mdash; Token werden zu einem abstrakten Syntaxbaum zusammengesetzt.',
    howWorksDesc4: '<strong>Schritt 3: Native Datenstrukturen</strong> &mdash; Der AST wird in native Sprachstrukturen mit Typauflosung konvertiert.',
    howWorksDesc5: '<strong>Schritt 4: JSON-Serialisierung</strong> &mdash; Die Strukturen werden als JSON serialisiert. YAML-Kommentare werden verworfen.',
    h2_codeExamples: 'YAML-zu-JSON Codebeispiele',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: 'Die <code>js-yaml</code>-Bibliothek ist der beliebteste YAML-Parser fur JavaScript:',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: 'Verwenden Sie immer <code>yaml.safe_load()</code> um beliebige Codeausfuhrung zu verhindern:',
    codeBashTitle: 'Bash / CLI (yq)',
    codeBashDesc: 'Fur die Kommandozeilen-Konvertierung ist <code>yq</code> am effizientesten:',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'In Go bietet <code>gopkg.in/yaml.v3</code> robustes YAML-Parsing:',
    h2_jsonToYaml: 'JSON-zu-YAML Konvertierung',
    jsonToYamlDesc1: 'Die Umkehrrichtung ist ebenso wichtig, wenn API-JSON als YAML-Konfiguration gespeichert werden soll.',
    jsonToYamlDesc2: '<strong>Kommentare gehen verloren</strong> bei der Hin-und-Zuruck-Konvertierung. Verwenden Sie <code>ruamel.yaml</code> zum Erhalt.',
    jsonToYamlDesc3: '<strong>Best Practices</strong>: 2 Leerzeichen Einruckung, Flow-Style vermeiden, zweideutige Strings zitieren, Ausgabe validieren.',
    h2_pitfalls: 'Haufige YAML-Fallstricke',
    pitfallsDesc: 'YAMLs Flexibilitat bringt einige Stolperfallen mit sich:',
    pitfall1: '<strong>Tabs vs. Leerzeichen</strong> &mdash; YAML verbietet Tabs fur die Einruckung.',
    pitfall2: '<strong>Boolean-Falle</strong> &mdash; <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> werden als Booleans interpretiert.',
    pitfall3: '<strong>Mehrzeilige Strings</strong> &mdash; <code>|</code> behalt Zeilenumbruche, <code>&gt;</code> ersetzt sie durch Leerzeichen.',
    pitfall4: '<strong>Sonderzeichen</strong> &mdash; Doppelpunkte und Klammern in Werten mussen zitiert werden.',
    pitfall5: '<strong>Anker und Aliase</strong> &mdash; Werden bei JSON-Konvertierung vollstandig aufgelost.',
    pitfall6: '<strong>Zahlen und Daten</strong> &mdash; <code>1.0</code> wird zum Float, nicht zum String <code>"1.0"</code>.',
    h2_bestPractices: 'YAML Best Practices',
    bestPracticesDesc: 'Befolgen Sie diese Praktiken fur sauberes YAML:',
    bp1: '<strong>Konsistente Einruckung</strong> &mdash; 2 Leerzeichen, passend zu Kubernetes-Konventionen.',
    bp2: '<strong>Strings defensiv zitieren</strong> &mdash; Im Zweifel Anfuhrungszeichen verwenden.',
    bp3: '<strong>Boolean-Falle vermeiden</strong> &mdash; Auf Landercodes und Umschaltwerte achten.',
    bp4: '<strong>Schema-Validierung</strong> &mdash; Mit JSON Schema validieren.',
    bp5: '<strong>yamllint verwenden</strong> &mdash; In die CI/CD-Pipeline integrieren.',
    bp6: '<strong>Kommentare klug einsetzen</strong> &mdash; Sie gehen bei JSON-Konvertierung verloren.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Was ist der Unterschied zwischen YAML und JSON?',
    faq1_a: 'YAML verwendet Einruckung, unterstutzt Kommentare und bietet erweiterte Funktionen. JSON verwendet Klammern, hat keine Kommentare und begrenztere Typen. YAML ist fur Konfiguration bevorzugt, JSON fur APIs.',
    faq2_q: 'Wie konvertiere ich YAML zu JSON?',
    faq2_a: 'Nutzen Sie Online-Tools, yq in der CLI oder Bibliotheken: js-yaml in JavaScript, PyYAML in Python, gopkg.in/yaml.v3 in Go.',
    faq3_q: 'Wann YAML und wann JSON verwenden?',
    faq3_a: 'YAML fur menschlich bearbeitete Konfigurationsdateien. JSON fur APIs und Datenaustausch zwischen Services.',
    conclusion: 'Die Beherrschung der YAML-zu-JSON-Konvertierung ist fur modernes DevOps unerlasslich. Nutzen Sie unser kostenloses Tool und den YAML-Validator.',
    linkToolBottom: 'Konvertieren Sie YAML zu JSON und JSON zu YAML sofort mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'La conversion <strong>YAML a JSON</strong> es una de las tareas de formato de datos mas comunes para los desarrolladores. Ya sea gestionando manifiestos de Kubernetes, archivos Docker Compose o pipelines CI/CD, frecuentemente necesitas convertir entre YAML y JSON. Esta guia completa cubre herramientas de conversion, el proceso de analisis, ejemplos de codigo y mejores practicas.',
    linkTool: 'Prueba nuestro convertidor gratuito YAML a JSON / JSON a YAML en linea.',
    h2_whatYaml: 'Que es YAML?',
    whatYamlDesc1: '<strong>YAML</strong> (YAML Ain\'t Markup Language) es un lenguaje de serializacion de datos amigable para humanos, ampliamente utilizado para archivos de configuracion. Un analizador YAML lee la estructura basada en indentacion y la convierte en estructuras de datos nativas.',
    whatYamlDesc2: 'YAML usa indentacion con espacios (nunca tabulaciones) para denotar estructura. Soporta tipos escalares, secuencias (arrays) y mappings (diccionarios). Las caracteristicas avanzadas incluyen anclas y alias, cadenas multi-linea y multiples documentos separados por <code>---</code>. YAML es un superconjunto de JSON.',
    whatYamlDesc3: 'YAML es el formato preferido para Kubernetes, Ansible, Docker Compose, GitHub Actions y muchas herramientas cloud-native. Su legibilidad superior a JSON lo hace ideal para archivos editados frecuentemente por humanos.',
    h2_differences: 'YAML vs JSON: Diferencias clave',
    differencesDesc: 'Comprender las diferencias ayuda a elegir el formato correcto:',
    diffTable: '<table><thead><tr><th>Caracteristica</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Sintaxis</strong></td><td>Basada en indentacion</td><td>Delimitada por llaves</td></tr><tr><td><strong>Comentarios</strong></td><td>Si con <code>#</code></td><td>No</td></tr><tr><td><strong>Tipos</strong></td><td>Cadenas, enteros, flotantes, booleanos, null, fechas</td><td>Cadenas, numeros, booleanos, null, arrays, objetos</td></tr><tr><td><strong>Legibilidad</strong></td><td>Muy legible</td><td>Mas verboso</td></tr><tr><td><strong>Velocidad</strong></td><td>Mas lento</td><td>Mas rapido</td></tr></tbody></table>',
    h2_howWorks: 'Como funciona la conversion YAML a JSON',
    howWorksDesc1: 'Un convertidor YAML a JSON realiza un proceso de analisis y serializacion en multiples pasos.',
    howWorksDesc2: '<strong>Paso 1: Analisis lexico</strong> &mdash; El analizador YAML identifica tokens: niveles de indentacion, separadores e indicadores de bloque.',
    howWorksDesc3: '<strong>Paso 2: Construccion del AST</strong> &mdash; Los tokens se ensamblan en un arbol de sintaxis abstracta.',
    howWorksDesc4: '<strong>Paso 3: Estructuras de datos nativas</strong> &mdash; El AST se convierte en estructuras nativas con resolucion de tipos.',
    howWorksDesc5: '<strong>Paso 4: Serializacion JSON</strong> &mdash; Las estructuras se serializan como JSON. Los comentarios YAML se descartan.',
    h2_codeExamples: 'Ejemplos de codigo YAML a JSON',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: 'La biblioteca <code>js-yaml</code> es el analizador YAML mas popular para JavaScript:',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: 'Use siempre <code>yaml.safe_load()</code> para prevenir ejecucion de codigo arbitrario:',
    codeBashTitle: 'Bash / CLI (yq)',
    codeBashDesc: 'Para conversion en linea de comandos, <code>yq</code> es la herramienta mas eficiente:',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'En Go, <code>gopkg.in/yaml.v3</code> proporciona analisis YAML robusto:',
    h2_jsonToYaml: 'Conversion JSON a YAML',
    jsonToYamlDesc1: 'La direccion inversa es igualmente importante para almacenar datos de API como configuracion YAML.',
    jsonToYamlDesc2: '<strong>Los comentarios se pierden</strong> en la conversion ida y vuelta. Use <code>ruamel.yaml</code> para preservarlos.',
    jsonToYamlDesc3: '<strong>Mejores practicas</strong>: indentacion de 2 espacios, evitar estilo flow, citar cadenas ambiguas, validar la salida.',
    h2_pitfalls: 'Trampas comunes de YAML',
    pitfallsDesc: 'La flexibilidad de YAML introduce varias trampas:',
    pitfall1: '<strong>Tabulaciones vs espacios</strong> &mdash; YAML prohibe tabulaciones para indentacion.',
    pitfall2: '<strong>Trampa de booleanos</strong> &mdash; <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> se interpretan como booleanos.',
    pitfall3: '<strong>Cadenas multi-linea</strong> &mdash; <code>|</code> preserva saltos de linea, <code>&gt;</code> los reemplaza por espacios.',
    pitfall4: '<strong>Caracteres especiales</strong> &mdash; Dos puntos y corchetes en valores deben citarse.',
    pitfall5: '<strong>Anclas y alias</strong> &mdash; Se expanden completamente en la conversion a JSON.',
    pitfall6: '<strong>Numeros y fechas</strong> &mdash; <code>1.0</code> se convierte en flotante, no en cadena <code>"1.0"</code>.',
    h2_bestPractices: 'Mejores practicas YAML',
    bestPracticesDesc: 'Siga estas practicas para YAML limpio y mantenible:',
    bp1: '<strong>Indentacion consistente</strong> &mdash; 2 espacios, siguiendo convenciones de Kubernetes.',
    bp2: '<strong>Citar cadenas defensivamente</strong> &mdash; En caso de duda, use comillas.',
    bp3: '<strong>Evitar la trampa de booleanos</strong> &mdash; Cuidado con codigos de pais y valores de conmutacion.',
    bp4: '<strong>Validacion por esquema</strong> &mdash; Validar con JSON Schema.',
    bp5: '<strong>Usar yamllint</strong> &mdash; Integrarlo en el pipeline CI/CD.',
    bp6: '<strong>Comentarios inteligentes</strong> &mdash; Se pierden al convertir a JSON.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Cual es la diferencia entre YAML y JSON?',
    faq1_a: 'YAML usa indentacion, soporta comentarios y ofrece funciones avanzadas. JSON usa delimitadores, no soporta comentarios y tiene tipos mas limitados. YAML es preferido para configuracion, JSON para APIs.',
    faq2_q: 'Como convierto YAML a JSON?',
    faq2_a: 'Use herramientas en linea, yq en CLI o bibliotecas: js-yaml en JavaScript, PyYAML en Python, gopkg.in/yaml.v3 en Go.',
    faq3_q: 'Cuando usar YAML o JSON?',
    faq3_a: 'YAML para archivos de configuracion editados por humanos. JSON para APIs e intercambio de datos entre servicios.',
    conclusion: 'Dominar la conversion YAML a JSON es esencial para el DevOps moderno. Use nuestra herramienta gratuita y validador YAML para optimizar su flujo de trabajo.',
    linkToolBottom: 'Convierte YAML a JSON y JSON a YAML al instante con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>YAMLからJSON</strong>への変換は、開発者が日常的に直面する最も一般的なデータ形式タスクの一つです。Kubernetesマニフェスト、Docker Composeファイル、CI/CDパイプラインの管理において、YAMLとJSON間の変換は頻繁に必要になります。この包括的なガイドでは、変換ツール、パースプロセス、コード例、ベストプラクティスを解説します。',
    linkTool: '無料オンラインYAML to JSON / JSON to YAML変換ツールをお試しください。',
    h2_whatYaml: 'YAMLとは？',
    whatYamlDesc1: '<strong>YAML</strong>（YAML Ain\'t Markup Language）は、設定ファイルやデータ交換に広く使用される人間に優しいデータシリアライゼーション言語です。YAMLパーサーはインデントベースの構造を読み取り、ネイティブデータ構造に変換します。',
    whatYamlDesc2: 'YAMLは空白インデント（タブは禁止）で構造を表現します。スカラー型、シーケンス（配列）、マッピング（辞書）をサポートし、アンカーとエイリアス、複数行文字列、<code>---</code>で区切られた複数ドキュメントなどの高度な機能を備えています。YAML構文はJSONのスーパーセットです。',
    whatYamlDesc3: 'YAMLはKubernetes、Ansible、Docker Compose、GitHub Actions、OpenAPIなど多くのクラウドネイティブツールの推奨形式です。',
    h2_differences: 'YAML vs JSON：主な違い',
    differencesDesc: 'YAMLとJSONの違いを理解することで、適切な形式を選択できます：',
    diffTable: '<table><thead><tr><th>特徴</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>構文</strong></td><td>インデントベース</td><td>ブラケット・ブレース区切り</td></tr><tr><td><strong>コメント</strong></td><td><code>#</code>でサポート</td><td>非サポート</td></tr><tr><td><strong>データ型</strong></td><td>文字列、整数、浮動小数、ブール、null、日付</td><td>文字列、数値、ブール、null、配列、オブジェクト</td></tr><tr><td><strong>可読性</strong></td><td>非常に読みやすい</td><td>より冗長</td></tr><tr><td><strong>速度</strong></td><td>遅い</td><td>速い</td></tr></tbody></table>',
    h2_howWorks: 'YAMLからJSON変換の仕組み',
    howWorksDesc1: 'YAML to JSONコンバーターは、多段階のパースとシリアライゼーションプロセスを実行します。',
    howWorksDesc2: '<strong>ステップ1：字句解析</strong> &mdash; YAMLパーサーがトークンを識別します。',
    howWorksDesc3: '<strong>ステップ2：AST構築</strong> &mdash; トークンが階層構造を表す抽象構文木に組み立てられます。',
    howWorksDesc4: '<strong>ステップ3：ネイティブデータ構造</strong> &mdash; ASTが型解決付きでネイティブ構造に変換されます。',
    howWorksDesc5: '<strong>ステップ4：JSONシリアライゼーション</strong> &mdash; 構造がJSONとしてシリアライズされます。YAMLコメントは破棄されます。',
    h2_codeExamples: 'YAML to JSON コード例',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: '<code>js-yaml</code>はJavaScript用の最も人気のあるYAMLパーサーです：',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: '任意コード実行を防ぐため、常に<code>yaml.safe_load()</code>を使用してください：',
    codeBashTitle: 'Bash / CLI (yq)',
    codeBashDesc: 'コマンドライン変換では<code>yq</code>が最も効率的です：',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'Goでは<code>gopkg.in/yaml.v3</code>が堅牢なYAMLパースを提供します：',
    h2_jsonToYaml: 'JSONからYAMLへの変換',
    jsonToYamlDesc1: '逆方向の変換も、APIのJSONデータをYAML設定として保存する際に重要です。',
    jsonToYamlDesc2: '<strong>コメントは失われます</strong>。往復変換でコメントを保持するには<code>ruamel.yaml</code>を使用してください。',
    jsonToYamlDesc3: '<strong>ベストプラクティス</strong>：2スペースインデント、フロースタイル回避、曖昧な文字列の引用、出力の検証。',
    h2_pitfalls: 'よくあるYAMLの落とし穴',
    pitfallsDesc: 'YAMLの柔軟性はいくつかの落とし穴を生みます：',
    pitfall1: '<strong>タブvsスペース</strong> &mdash; YAMLはインデントにタブを禁止しています。',
    pitfall2: '<strong>ブーリアンの罠</strong> &mdash; <code>yes</code>、<code>no</code>、<code>on</code>、<code>off</code>はブーリアンとして解釈されます。',
    pitfall3: '<strong>複数行文字列</strong> &mdash; <code>|</code>は改行を保持、<code>&gt;</code>はスペースに置換します。',
    pitfall4: '<strong>特殊文字</strong> &mdash; 値中のコロンや括弧は引用が必要です。',
    pitfall5: '<strong>アンカーとエイリアス</strong> &mdash; JSON変換時に完全展開されます。',
    pitfall6: '<strong>数値と日付の解釈</strong> &mdash; <code>1.0</code>は文字列ではなく浮動小数点になります。',
    h2_bestPractices: 'YAMLベストプラクティス',
    bestPracticesDesc: 'クリーンで保守性の高いYAMLのためのプラクティス：',
    bp1: '<strong>一貫したインデント</strong> &mdash; Kubernetes慣例に合わせて2スペース。',
    bp2: '<strong>防御的な文字列引用</strong> &mdash; 迷ったら引用符を使用。',
    bp3: '<strong>ブーリアンの罠を回避</strong> &mdash; 国コードやトグル値に注意。',
    bp4: '<strong>スキーマ検証</strong> &mdash; JSON Schemaで検証。',
    bp5: '<strong>yamllintを使用</strong> &mdash; CI/CDパイプラインに統合。',
    bp6: '<strong>賢いコメント使用</strong> &mdash; JSON変換で失われることを忘れずに。',
    h2_faq: 'よくある質問',
    faq1_q: 'YAMLとJSONの違いは何ですか？',
    faq1_a: 'YAMLはインデントベースでコメントサポートと高度な機能を備えています。JSONはブラケット区切りでコメント非対応、型が限定的です。YAMLは設定ファイル向き、JSONはAPI向きです。',
    faq2_q: 'YAMLをJSONに変換するには？',
    faq2_a: 'オンラインツール、CLIのyq、またはライブラリ（JavaScript: js-yaml、Python: PyYAML、Go: gopkg.in/yaml.v3）を使用します。',
    faq3_q: 'YAMLとJSONはいつ使い分けますか？',
    faq3_a: 'YAMLは人間が頻繁に編集する設定ファイル向け。JSONはAPIやサービス間データ交換向けです。',
    conclusion: 'YAMLからJSONへの変換をマスターすることは、現代のDevOpsに不可欠です。無料ツールとYAMLバリデータでワークフローを最適化しましょう。',
    linkToolBottom: '無料オンラインツールでYAMLとJSONを即座に変換。',
  },
  ko: {
    intro: '<strong>YAML에서 JSON</strong>으로의 변환은 개발자가 매일 직면하는 가장 일반적인 데이터 형식 작업 중 하나입니다. Kubernetes 매니페스트, Docker Compose 파일, CI/CD 파이프라인을 관리할 때 YAML과 JSON 간의 변환이 자주 필요합니다. 이 종합 가이드에서는 변환 도구, 파싱 프로세스, 코드 예제, 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 YAML to JSON / JSON to YAML 변환 도구를 사용해 보세요.',
    h2_whatYaml: 'YAML이란?',
    whatYamlDesc1: '<strong>YAML</strong>(YAML Ain\'t Markup Language)은 구성 파일과 데이터 교환에 널리 사용되는 인간 친화적 데이터 직렬화 언어입니다. YAML 파서는 들여쓰기 기반 구조를 읽어 네이티브 데이터 구조로 변환합니다.',
    whatYamlDesc2: 'YAML은 공백 들여쓰기(탭 금지)로 구조를 나타냅니다. 스칼라 타입, 시퀀스(배열), 매핑(딕셔너리)을 지원하며, 앵커와 별칭, 여러 줄 문자열, <code>---</code>로 구분된 다중 문서 등 고급 기능을 제공합니다. YAML 구문은 JSON의 상위 집합입니다.',
    whatYamlDesc3: 'YAML은 Kubernetes, Ansible, Docker Compose, GitHub Actions 등 많은 클라우드 네이티브 도구의 선호 형식입니다.',
    h2_differences: 'YAML vs JSON: 주요 차이점',
    differencesDesc: '차이점을 이해하면 올바른 형식을 선택하는 데 도움이 됩니다:',
    diffTable: '<table><thead><tr><th>특징</th><th>YAML</th><th>JSON</th></tr></thead><tbody><tr><td><strong>구문</strong></td><td>들여쓰기 기반</td><td>괄호/중괄호 구분</td></tr><tr><td><strong>주석</strong></td><td><code>#</code>으로 지원</td><td>미지원</td></tr><tr><td><strong>데이터 타입</strong></td><td>문자열, 정수, 실수, 불리언, null, 날짜</td><td>문자열, 숫자, 불리언, null, 배열, 객체</td></tr><tr><td><strong>가독성</strong></td><td>매우 읽기 쉬움</td><td>더 장황함</td></tr><tr><td><strong>속도</strong></td><td>느림</td><td>빠름</td></tr></tbody></table>',
    h2_howWorks: 'YAML에서 JSON 변환 작동 원리',
    howWorksDesc1: 'YAML to JSON 변환기는 다단계 파싱 및 직렬화 프로세스를 수행합니다.',
    howWorksDesc2: '<strong>1단계: 어휘 분석</strong> &mdash; YAML 파서가 토큰을 식별합니다.',
    howWorksDesc3: '<strong>2단계: AST 구축</strong> &mdash; 토큰이 추상 구문 트리로 조립됩니다.',
    howWorksDesc4: '<strong>3단계: 네이티브 데이터 구조</strong> &mdash; AST가 타입 해석과 함께 네이티브 구조로 변환됩니다.',
    howWorksDesc5: '<strong>4단계: JSON 직렬화</strong> &mdash; 구조가 JSON으로 직렬화됩니다. YAML 주석은 제거됩니다.',
    h2_codeExamples: 'YAML to JSON 코드 예제',
    codeJsTitle: 'JavaScript / Node.js (js-yaml)',
    codeJsDesc: '<code>js-yaml</code>은 JavaScript용 가장 인기 있는 YAML 파서입니다:',
    codePyTitle: 'Python (PyYAML)',
    codePyDesc: '임의 코드 실행 방지를 위해 항상 <code>yaml.safe_load()</code>를 사용하세요:',
    codeBashTitle: 'Bash / CLI (yq)',
    codeBashDesc: '명령줄 변환에서 <code>yq</code>가 가장 효율적입니다:',
    codeGoTitle: 'Go (gopkg.in/yaml.v3)',
    codeGoDesc: 'Go에서 <code>gopkg.in/yaml.v3</code>는 강력한 YAML 파싱을 제공합니다:',
    h2_jsonToYaml: 'JSON에서 YAML로 변환',
    jsonToYamlDesc1: '역방향 변환도 API JSON 데이터를 YAML 구성으로 저장할 때 중요합니다.',
    jsonToYamlDesc2: '<strong>주석이 손실됩니다</strong>. 주석을 보존하려면 <code>ruamel.yaml</code>을 사용하세요.',
    jsonToYamlDesc3: '<strong>모범 사례</strong>: 2칸 들여쓰기, 플로우 스타일 회피, 모호한 문자열 인용, 출력 검증.',
    h2_pitfalls: '일반적인 YAML 함정',
    pitfallsDesc: 'YAML의 유연성은 여러 함정을 만듭니다:',
    pitfall1: '<strong>탭 vs 스페이스</strong> &mdash; YAML은 들여쓰기에 탭을 금지합니다.',
    pitfall2: '<strong>불리언 함정</strong> &mdash; <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code>는 불리언으로 해석됩니다.',
    pitfall3: '<strong>여러 줄 문자열</strong> &mdash; <code>|</code>는 줄바꿈 유지, <code>&gt;</code>는 공백으로 대체합니다.',
    pitfall4: '<strong>특수 문자</strong> &mdash; 값의 콜론과 괄호는 인용이 필요합니다.',
    pitfall5: '<strong>앵커와 별칭</strong> &mdash; JSON 변환 시 완전히 확장됩니다.',
    pitfall6: '<strong>숫자와 날짜 해석</strong> &mdash; <code>1.0</code>은 문자열이 아닌 부동소수점이 됩니다.',
    h2_bestPractices: 'YAML 모범 사례',
    bestPracticesDesc: '깔끔하고 유지보수 가능한 YAML을 위한 모범 사례:',
    bp1: '<strong>일관된 들여쓰기</strong> &mdash; Kubernetes 규칙에 맞춰 2칸 스페이스.',
    bp2: '<strong>방어적 문자열 인용</strong> &mdash; 의심스러우면 따옴표 사용.',
    bp3: '<strong>불리언 함정 회피</strong> &mdash; 국가 코드와 토글 값에 주의.',
    bp4: '<strong>스키마 검증</strong> &mdash; JSON Schema로 검증.',
    bp5: '<strong>yamllint 사용</strong> &mdash; CI/CD 파이프라인에 통합.',
    bp6: '<strong>현명한 주석 사용</strong> &mdash; JSON 변환 시 손실됨을 기억.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'YAML과 JSON의 차이점은 무엇인가요?',
    faq1_a: 'YAML은 들여쓰기 기반이며 주석과 고급 기능을 지원합니다. JSON은 괄호 구분이며 주석 미지원, 제한된 타입을 가집니다. YAML은 구성 파일에, JSON은 API에 선호됩니다.',
    faq2_q: 'YAML을 JSON으로 변환하려면?',
    faq2_a: '온라인 도구, CLI의 yq, 또는 라이브러리(JavaScript: js-yaml, Python: PyYAML, Go: gopkg.in/yaml.v3)를 사용합니다.',
    faq3_q: 'YAML과 JSON은 언제 사용하나요?',
    faq3_a: 'YAML은 사람이 자주 편집하는 구성 파일에. JSON은 API와 서비스 간 데이터 교환에 사용합니다.',
    conclusion: 'YAML에서 JSON으로의 변환을 마스터하는 것은 현대 DevOps에 필수적입니다. 무료 도구와 YAML 검증기로 워크플로를 최적화하세요.',
    linkToolBottom: '무료 온라인 도구로 YAML과 JSON을 즉시 변환하세요.',
  },
};

export default function YamlToJsonConverterGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is YAML? */}
      <h2>{s.h2_whatYaml}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatYamlDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatYamlDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatYamlDesc3 }} />

      {/* Section 2: YAML vs JSON Key Differences */}
      <h2>{s.h2_differences}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.differencesDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.diffTable }} />

      {/* Section 3: How YAML to JSON Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc5 }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== YAML to JSON (Node.js) =====
const yaml = require('js-yaml');
const fs = require('fs');

// Parse YAML string to JavaScript object
const yamlString = \`
server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  replicas:
    - host: db1.example.com
      port: 5432
    - host: db2.example.com
      port: 5432
  # Connection pool settings
  pool:
    min: 5
    max: 20
\`;

const data = yaml.load(yamlString);
const json = JSON.stringify(data, null, 2);
console.log(json);
// {
//   "server": {
//     "host": "localhost",
//     "port": 8080,
//     "ssl": true
//   },
//   "database": {
//     "name": "myapp",
//     "replicas": [
//       { "host": "db1.example.com", "port": 5432 },
//       { "host": "db2.example.com", "port": 5432 }
//     ],
//     "pool": { "min": 5, "max": 20 }
//   }
// }

// ===== JSON to YAML =====
const jsonData = { name: 'app', version: '2.0', features: ['auth', 'logging'] };
const yamlOutput = yaml.dump(jsonData, { indent: 2 });
console.log(yamlOutput);
// name: app
// version: '2.0'
// features:
//   - auth
//   - logging

// ===== Read YAML file and convert to JSON =====
const fileContent = fs.readFileSync('config.yaml', 'utf8');
const config = yaml.load(fileContent);
fs.writeFileSync('config.json', JSON.stringify(config, null, 2));

// ===== Handle multi-document YAML =====
const multiDoc = \`
---
name: doc1
---
name: doc2
\`;
const docs = yaml.loadAll(multiDoc);
console.log(JSON.stringify(docs, null, 2));
// [{ "name": "doc1" }, { "name": "doc2" }]`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import yaml
import json

# ===== YAML to JSON =====
yaml_string = """
server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  replicas:
    - host: db1.example.com
      port: 5432
    - host: db2.example.com
      port: 5432
  pool:
    min: 5
    max: 20
"""

# Always use safe_load (prevents arbitrary code execution)
data = yaml.safe_load(yaml_string)
json_output = json.dumps(data, indent=2, ensure_ascii=False)
print(json_output)

# ===== JSON to YAML =====
json_string = '{"name": "app", "version": "2.0", "features": ["auth", "logging"]}'
json_data = json.loads(json_string)
yaml_output = yaml.dump(json_data, default_flow_style=False, allow_unicode=True)
print(yaml_output)

# ===== File conversion =====
# YAML file to JSON file
with open('config.yaml', 'r') as yf:
    config = yaml.safe_load(yf)
with open('config.json', 'w') as jf:
    json.dump(config, jf, indent=2)

# JSON file to YAML file
with open('data.json', 'r') as jf:
    data = json.load(jf)
with open('data.yaml', 'w') as yf:
    yaml.dump(data, yf, default_flow_style=False)

# ===== Handle multi-document YAML =====
multi_yaml = """
---
name: doc1
type: config
---
name: doc2
type: data
"""
docs = list(yaml.safe_load_all(multi_yaml))
print(json.dumps(docs, indent=2))

# ===== Preserve key order (Python 3.7+) =====
# dict maintains insertion order by default
ordered = yaml.safe_load(yaml_string)
print(json.dumps(ordered, indent=2))  # keys stay in YAML order`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== yq: YAML processor (like jq for YAML) =====

# Convert YAML file to JSON
yq -o=json config.yaml

# Convert YAML to JSON and save to file
yq -o=json config.yaml > config.json

# Convert JSON to YAML
yq -P config.json

# Convert JSON to YAML and save
yq -P config.json > config.yaml

# Extract a specific field from YAML as JSON
yq -o=json '.server.port' config.yaml

# ===== Python one-liner =====

# YAML to JSON (stdin)
cat config.yaml | python3 -c \\
  'import sys,yaml,json; json.dump(yaml.safe_load(sys.stdin),sys.stdout,indent=2)'

# YAML to JSON (file)
python3 -c \\
  'import yaml,json; print(json.dumps(yaml.safe_load(open("config.yaml")),indent=2))'

# JSON to YAML
cat data.json | python3 -c \\
  'import sys,yaml,json; print(yaml.dump(json.load(sys.stdin),default_flow_style=False))'

# ===== Ruby one-liner =====
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load($stdin.read))' < config.yaml

# ===== Pipe YAML from curl to JSON =====
curl -s https://raw.githubusercontent.com/example/repo/main/config.yaml | \\
  yq -o=json

# ===== Validate YAML before converting =====
yamllint config.yaml && yq -o=json config.yaml`}</code></pre>

      <h3>{s.codeGoTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeGoDesc }} />
      <pre><code>{`package main

import (
    "encoding/json"
    "fmt"
    "log"

    "gopkg.in/yaml.v3"
)

func main() {
    // YAML input string
    yamlData := []byte(\`
server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  replicas:
    - host: db1.example.com
      port: 5432
    - host: db2.example.com
      port: 5432
\`)

    // Parse YAML into interface{}
    var data interface{}
    err := yaml.Unmarshal(yamlData, &data)
    if err != nil {
        log.Fatalf("YAML parse error: %v", err)
    }

    // Convert map[string]interface{} keys for JSON compatibility
    data = convertMapKeys(data)

    // Marshal to JSON
    jsonData, err := json.MarshalIndent(data, "", "  ")
    if err != nil {
        log.Fatalf("JSON marshal error: %v", err)
    }
    fmt.Println(string(jsonData))
}

// convertMapKeys recursively converts map[interface{}]interface{}
// to map[string]interface{} for JSON compatibility
func convertMapKeys(v interface{}) interface{} {
    switch v := v.(type) {
    case map[string]interface{}:
        result := make(map[string]interface{})
        for key, val := range v {
            result[key] = convertMapKeys(val)
        }
        return result
    case []interface{}:
        for i, val := range v {
            v[i] = convertMapKeys(val)
        }
        return v
    default:
        return v
    }
}`}</code></pre>

      {/* Section 5: JSON to YAML Conversion */}
      <h2>{s.h2_jsonToYaml}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsonToYamlDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToYamlDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToYamlDesc3 }} />

      {/* Section 6: Common YAML Pitfalls */}
      <h2>{s.h2_pitfalls}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pitfallsDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.pitfall1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.pitfall2 }} />
      <pre><code>{`# The YAML boolean trap - these all become true or false in JSON!

# YAML 1.1 boolean values (case-insensitive):
is_active: yes        # → true
is_active: no         # → false
is_active: on         # → true
is_active: off        # → false
is_active: y          # → true
is_active: n          # → false
is_active: true       # → true
is_active: false      # → false

# Real-world problems:
countries:
  - US                # string "US" ✓
  - GB                # string "GB" ✓
  - NO                # boolean false ✗ (Norway disappears!)
  - FR                # string "FR" ✓

# Fix: always quote ambiguous values
countries:
  - "US"
  - "GB"
  - "NO"              # string "NO" ✓
  - "FR"

# Version numbers are also problematic:
version: 1.0          # → float 1 (not string "1.0")
version: "1.0"        # → string "1.0" ✓`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.pitfall3 }} />
      <pre><code>{`# YAML multiline string variants

# Literal block scalar (|) - preserves newlines
description: |
  This is line one.
  This is line two.
  This is line three.
# JSON: "This is line one.\\nThis is line two.\\nThis is line three.\\n"

# Folded block scalar (>) - replaces newlines with spaces
description: >
  This is a long
  paragraph that will
  be folded into one line.
# JSON: "This is a long paragraph that will be folded into one line.\\n"

# Chomping indicators:
keep_trailing: |+     # Keep ALL trailing newlines
  text

strip_trailing: |-    # Strip ALL trailing newlines
  text

clip_trailing: |      # Keep exactly ONE trailing newline (default)
  text`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.pitfall4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.pitfall5 }} />
      <pre><code>{`# YAML anchors and aliases

# Define an anchor with &
defaults: &default_settings
  adapter: postgres
  host: localhost
  port: 5432

# Reuse with alias *
development:
  database:
    <<: *default_settings     # Merge key: inherits all defaults
    database: myapp_dev

production:
  database:
    <<: *default_settings     # Same defaults
    database: myapp_prod
    host: db.production.com   # Override specific values

# After JSON conversion (anchors fully expanded):
# {
#   "defaults": { "adapter": "postgres", "host": "localhost", "port": 5432 },
#   "development": {
#     "database": {
#       "adapter": "postgres", "host": "localhost",
#       "port": 5432, "database": "myapp_dev"
#     }
#   },
#   "production": {
#     "database": {
#       "adapter": "postgres", "host": "db.production.com",
#       "port": 5432, "database": "myapp_prod"
#     }
#   }
# }`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.pitfall6 }} />

      {/* Section 7: YAML Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bp5 }} />
      <pre><code>{`# .yamllint.yml configuration example
---
extends: default

rules:
  line-length:
    max: 120
    allow-non-breakable-words: true
  indentation:
    spaces: 2
    indent-sequences: true
  comments:
    min-spaces-from-content: 1
  truthy:
    check-keys: true
    allowed-values: ['true', 'false']
  document-start:
    present: true
  trailing-spaces: enable
  new-line-at-end-of-file: enable

# Run yamllint:
# yamllint .
# yamllint config.yaml
# yamllint -d "{extends: default}" config.yaml`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.bp6 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
