'use client';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'JSON and YAML are the two dominant data serialization formats in modern development. JSON excels for APIs and machine-to-machine communication, while YAML shines for configuration files edited by humans. YAML is a superset of JSON with support for comments, anchors, multi-line strings, and cleaner syntax. Watch out for YAML gotchas like the Norway problem (NO becomes false), boolean coercion, and indentation errors. Use our free online tool to convert between JSON and YAML instantly.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'JSON uses braces and brackets with strict quoting; YAML uses indentation with minimal punctuation, making it more readable for humans.',
    takeaway2: 'YAML supports comments (#), anchors/aliases (&/\\*), and multi-line strings (| and >) that JSON lacks entirely.',
    takeaway3: 'The "Norway problem": unquoted NO, YES, on, off become booleans in YAML 1.1. Always quote ambiguous strings.',
    takeaway4: 'In Python, always use yaml.safe_load() instead of yaml.load() to prevent arbitrary code execution from untrusted YAML.',
    takeaway5: 'Kubernetes, Docker Compose, GitHub Actions, and most CI/CD systems use YAML as their primary configuration format.',
    takeaway6: 'Use js-yaml (JavaScript), PyYAML/ruamel.yaml (Python), or yq (CLI) for programmatic JSON-YAML conversion.',
    link_tool: 'Try our free JSON to YAML / YAML to JSON converter',

    h2_syntax: 'JSON vs YAML: Syntax Comparison',
    syntax_p1: 'JSON (JavaScript Object Notation) and YAML (YAML Ain\'t Markup Language) represent the same data structures but with very different syntax philosophies. JSON prioritizes machine parsing with strict, unambiguous syntax. YAML prioritizes human readability with indentation-based nesting and minimal punctuation.',
    syntax_p2: 'Here is the same configuration data expressed in both formats side by side:',
    syntax_json_title: 'JSON Format',
    syntax_yaml_title: 'YAML Format',
    syntax_p3: 'The differences are immediately visible: YAML eliminates braces, brackets, and most quotation marks. It uses indentation (2 spaces by convention) to express nesting, dashes for array items, and colons for key-value pairs. Comments are supported with <code>#</code>. JSON requires every string to be double-quoted, every object wrapped in <code>{}</code>, and every array in <code>[]</code>.',

    h2_when: 'When to Use JSON vs YAML',
    when_p1: 'The choice between JSON and YAML depends on who or what will read and write the file:',
    when_json_title: 'Use JSON when:',
    when_json1: 'Building REST APIs and GraphQL responses (universal parser support)',
    when_json2: 'Exchanging data between microservices (fast parsing, no ambiguity)',
    when_json3: 'Storing data in databases like MongoDB (native BSON)',
    when_json4: 'Working with JavaScript/TypeScript (native JSON.parse/stringify)',
    when_json5: 'Package manifests like package.json, tsconfig.json, composer.json',
    when_yaml_title: 'Use YAML when:',
    when_yaml1: 'Writing Kubernetes manifests (Deployments, Services, ConfigMaps)',
    when_yaml2: 'Configuring Docker Compose files (docker-compose.yml)',
    when_yaml3: 'Setting up CI/CD pipelines (GitHub Actions, GitLab CI, CircleCI)',
    when_yaml4: 'Managing Ansible playbooks and infrastructure-as-code',
    when_yaml5: 'Any config file that humans edit frequently and needs comments',

    h2_anchors: 'YAML Anchors, Aliases, and Multi-line Strings',
    anchors_p1: 'YAML provides several powerful features that have no JSON equivalent. These features are why many configuration-heavy ecosystems chose YAML as their format.',
    h3_anchors: 'Anchors and Aliases',
    anchors_p2: 'YAML anchors (<code>&amp;</code>) define a reusable block of data, and aliases (<code>*</code>) reference it. This eliminates duplication in configuration files. The merge key (<code>&lt;&lt;</code>) lets you inherit and override mapping values:',
    h3_multiline: 'Multi-line Strings',
    multiline_p1: 'YAML offers two block scalar styles for multi-line text that are far more readable than JSON\'s <code>\\n</code> escape sequences:',
    multiline_p2: '<strong>Literal block (<code>|</code>)</strong>: preserves newlines exactly as written. Use for scripts, SQL, or any text where line breaks matter.',
    multiline_p3: '<strong>Folded block (<code>&gt;</code>)</strong>: joins lines with spaces (like HTML). Use for long descriptions or paragraphs.',
    multiline_p4: 'Chomping indicators control trailing newlines: <code>|+</code> keeps all trailing newlines, <code>|-</code> strips all trailing newlines, <code>|</code> (default) keeps exactly one.',

    h2_js: 'Converting JSON to YAML in JavaScript (js-yaml)',
    js_p1: 'The <code>js-yaml</code> library is the most widely used YAML parser for JavaScript and Node.js. It provides <code>yaml.load()</code> to parse YAML into JavaScript objects and <code>yaml.dump()</code> to serialize objects back to YAML:',
    js_p2: 'For TypeScript projects, <code>js-yaml</code> ships with built-in type definitions. You can also use the newer <code>yaml</code> package (npm: yaml) which provides a modern API with document preservation and CST support for round-trip editing that preserves comments.',

    h2_python: 'Converting JSON to YAML in Python (PyYAML, ruamel.yaml)',
    python_p1: 'Python has two major YAML libraries. <code>PyYAML</code> is the established standard, while <code>ruamel.yaml</code> is the modern alternative that preserves comments during round-trip conversion:',
    h3_pyyaml: 'PyYAML (Standard Library Alternative)',
    h3_ruamel: 'ruamel.yaml (Comment-Preserving)',
    ruamel_p1: 'Unlike PyYAML, <code>ruamel.yaml</code> can load a YAML file with comments, modify values, and write it back with comments intact. This makes it ideal for tools that programmatically update configuration files:',

    h2_cli: 'Converting via Command Line (yq, jq)',
    cli_p1: 'Command-line tools are ideal for quick conversions, shell scripts, and CI/CD pipelines. The two most important tools are <code>yq</code> (a YAML processor) and <code>jq</code> (a JSON processor):',
    h3_yq: 'yq: The YAML Swiss Army Knife',
    yq_p1: '<code>yq</code> (by Mike Farah) is a lightweight, portable command-line YAML processor that can read, filter, update, and convert YAML files. It uses jq-like syntax:',
    h3_jq: 'jq for JSON Processing',
    jq_p1: 'While <code>jq</code> does not handle YAML natively, you can combine it with <code>yq</code> or Python one-liners for powerful JSON-YAML workflows:',
    h3_oneliners: 'Quick One-liners',

    h2_k8s: 'Kubernetes Manifests: A YAML-Heavy Ecosystem',
    k8s_p1: 'Kubernetes has made YAML the lingua franca of cloud-native infrastructure. Every Kubernetes resource (Pods, Deployments, Services, ConfigMaps, Secrets, Ingresses) is defined in YAML. Understanding YAML is essential for any Kubernetes engineer.',
    k8s_p2: 'Here is a typical Kubernetes Deployment manifest showcasing common YAML patterns:',
    k8s_p3: 'Key YAML patterns used in Kubernetes: nested mappings for spec definitions, dash-prefixed sequences for containers and ports, multi-line strings for embedded configs, and labels/annotations for metadata. The <code>---</code> separator allows multiple resources in a single file.',

    h2_docker: 'Docker Compose and CI/CD Configuration',
    docker_p1: 'Docker Compose and CI/CD platforms like GitHub Actions are another major YAML ecosystem. These files demonstrate YAML\'s strength for defining complex workflows and service architectures:',
    h3_compose: 'Docker Compose (docker-compose.yml)',
    h3_gha: 'GitHub Actions Workflow',
    gha_p1: 'GitHub Actions workflows use YAML with specific patterns like <code>on:</code> triggers, matrix strategies, and step definitions:',

    h2_gotchas: 'YAML Gotchas: Common Pitfalls to Avoid',
    gotchas_p1: 'YAML\'s flexibility comes with several notorious pitfalls that have bitten developers for decades. Understanding these gotchas will save you hours of debugging.',
    h3_norway: 'The Norway Problem (Boolean Coercion)',
    norway_p1: 'This is YAML\'s most infamous gotcha. In YAML 1.1 (used by PyYAML and many other parsers), a surprisingly large set of unquoted values are interpreted as booleans:',
    norway_p2: 'The country code <code>NO</code> (Norway) becomes <code>false</code>. Toggle values like <code>on</code>/<code>off</code> become <code>true</code>/<code>false</code>. Even <code>y</code> and <code>n</code> are affected. YAML 1.2 restricts booleans to only <code>true</code>/<code>false</code>, but most parsers still default to 1.1 behavior. The fix: always quote strings that could be misinterpreted.',
    h3_indent: 'Indentation Errors',
    indent_p1: 'YAML uses spaces only (never tabs) for indentation. A single tab character causes a parse error. Mixed indentation levels within a file create subtle bugs. Always configure your editor to use 2 spaces for YAML files and enable visible whitespace. Add a <code>.editorconfig</code> rule:',
    h3_booleans: 'Unexpected Boolean Values',
    booleans_p1: 'Beyond the Norway problem, YAML 1.1 treats these as booleans: <code>TRUE</code>, <code>True</code>, <code>true</code>, <code>YES</code>, <code>Yes</code>, <code>yes</code>, <code>ON</code>, <code>On</code>, <code>on</code>, <code>Y</code>, <code>y</code> (all become <code>true</code>), and their false counterparts. Version numbers like <code>1.0</code> become floats, and dates like <code>2024-01-15</code> may become date objects. Quote everything that is not obviously a string:',

    h2_security: 'YAML Security: Avoiding Code Execution',
    security_p1: 'YAML parsers can be dangerously powerful. The YAML specification includes tags that allow parsers to instantiate arbitrary objects, which can lead to remote code execution (RCE) vulnerabilities.',
    security_p2: '<strong>The dangerous pattern (Python)</strong>: <code>yaml.load(data, Loader=yaml.FullLoader)</code> or the older <code>yaml.load(data)</code> allows constructing arbitrary Python objects from YAML tags like <code>!!python/object/apply:os.system</code>.',
    security_p3: '<strong>The safe pattern</strong>: Always use <code>yaml.safe_load()</code> (PyYAML) or <code>YAML(typ="safe")</code> (ruamel.yaml). These restrict parsing to basic data types (strings, numbers, lists, dicts) and reject any object construction tags.',
    security_p4: 'In JavaScript, <code>js-yaml</code> defaults to safe loading since v4. In older versions, avoid <code>yaml.load()</code> with <code>FULL_SCHEMA</code>. In Go, the standard <code>gopkg.in/yaml.v3</code> is safe by default.',
    security_p5: '<strong>Additional security considerations</strong>: limit input size to prevent denial-of-service via deeply nested structures or anchor bombs (billion laughs attack). Validate YAML against a schema after parsing to catch unexpected fields. Never deserialize YAML from untrusted sources without safe loading.',

    h2_comparison: 'Feature Comparison Table',
    comparison_p1: 'Here is a comprehensive comparison of JSON and YAML features to help you choose the right format:',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between JSON and YAML?',
    faq1_a: 'JSON uses braces, brackets, and double-quoted strings with strict syntax. YAML uses indentation-based nesting with minimal punctuation. YAML supports comments (#), multi-line strings (| and >), and anchors/aliases for data reuse. JSON is universally supported in programming languages and faster to parse. YAML is more human-readable and preferred for configuration files. Technically, YAML is a superset of JSON, meaning every valid JSON document is also valid YAML.',
    faq2_q: 'How do I convert JSON to YAML online?',
    faq2_a: 'Paste your JSON into an online JSON to YAML converter tool. The tool parses the JSON, converts the data structures, and outputs YAML with proper indentation. Our free DevToolBox converter handles nested objects, arrays, special characters, and large files. You can also convert YAML back to JSON with a single click.',
    faq3_q: 'Is YAML better than JSON for configuration files?',
    faq3_a: 'Yes, YAML is generally better for configuration files that humans edit frequently. It supports comments for documentation, multi-line strings for readability, and cleaner syntax without braces and quotes. However, JSON is better for machine-generated configs or when you need strict, unambiguous parsing. Kubernetes, Docker Compose, and CI/CD platforms chose YAML specifically for its human-friendliness.',
    faq4_q: 'What is the Norway problem in YAML?',
    faq4_a: 'The Norway problem refers to YAML 1.1 interpreting the country code NO (for Norway) as the boolean value false. This happens because YAML 1.1 treats yes, no, on, off, y, and n (case-insensitive) as boolean values. The fix is to quote strings that could be misinterpreted: use "NO" instead of NO. YAML 1.2 restricts booleans to only true and false, but many parsers (including PyYAML) still default to 1.1 behavior.',
    faq5_q: 'Why should I use yaml.safe_load() instead of yaml.load() in Python?',
    faq5_a: 'yaml.load() with FullLoader or the older default Loader can instantiate arbitrary Python objects from YAML tags like !!python/object/apply:os.system, enabling remote code execution. yaml.safe_load() restricts parsing to basic data types (strings, numbers, lists, dicts) and rejects dangerous tags. Always use safe_load() when parsing YAML from any untrusted or external source.',
    faq6_q: 'Can I preserve YAML comments when converting to JSON and back?',
    faq6_a: 'No, standard conversion loses all YAML comments because JSON has no comment syntax. If you convert YAML to JSON and back to YAML, comments are permanently lost. To preserve comments during programmatic YAML editing, use ruamel.yaml in Python or the yaml CST parser in JavaScript. These libraries maintain the original document structure including comments during round-trip operations.',
    faq7_q: 'How do I convert YAML to JSON from the command line?',
    faq7_a: 'The easiest method is using yq: run "yq -o=json file.yaml" to convert YAML to JSON. For JSON to YAML: "yq -o=yaml file.json". You can also use Python one-liners: "python3 -c \'import sys,yaml,json; json.dump(yaml.safe_load(sys.stdin),sys.stdout,indent=2)\' < file.yaml". Install yq via brew install yq (macOS), snap install yq (Linux), or download from GitHub.',
    faq8_q: 'What YAML features are lost when converting to JSON?',
    faq8_a: 'Several YAML features have no JSON equivalent and are lost or transformed during conversion: comments (# ...) are discarded, anchors and aliases are fully expanded (dereferenced), multi-line block scalars (| and >) become single strings with \\n, multiple documents (--- separator) must become a JSON array, and YAML-specific types like dates and binary data are converted to strings or numbers.',

    conclusion: 'Understanding the relationship between JSON and YAML is essential for modern software development. JSON dominates API communication and data exchange, while YAML rules the configuration world across Kubernetes, Docker, CI/CD, and infrastructure-as-code. By mastering the conversion between these formats, avoiding common pitfalls like the Norway problem, and following security best practices with safe loading, you can work confidently in both ecosystems.',
    link_tool_bottom: 'Convert between JSON and YAML instantly with our free online tool.',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: 'JSON 和 YAML 是现代开发中两种主流数据序列化格式。JSON 擅长 API 和机器间通信，YAML 则在人工编辑的配置文件中表现出色。YAML 是 JSON 的超集，支持注释、锚点、多行字符串和更简洁的语法。注意 YAML 的陷阱：挪威问题（NO 变成 false）、布尔值强制转换和缩进错误。使用我们的免费在线工具即时转换 JSON 和 YAML。',
    takeaways_title: '核心要点',
    takeaway1: 'JSON 使用大括号和方括号，严格引用；YAML 使用缩进，标点符号最少，对人类更友好。',
    takeaway2: 'YAML 支持注释(#)、锚点/别名(&/*)、多行字符串(| 和 >)，这些 JSON 完全没有。',
    takeaway3: '"挪威问题"：未引用的 NO、YES、on、off 在 YAML 1.1 中会变成布尔值。务必引用模糊字符串。',
    takeaway4: '在 Python 中，始终使用 yaml.safe_load() 而非 yaml.load()，以防止不受信任的 YAML 执行任意代码。',
    takeaway5: 'Kubernetes、Docker Compose、GitHub Actions 和大多数 CI/CD 系统都使用 YAML 作为主要配置格式。',
    takeaway6: '使用 js-yaml(JavaScript)、PyYAML/ruamel.yaml(Python)或 yq(CLI)进行编程式 JSON-YAML 转换。',
    link_tool: '试用我们的免费 JSON 转 YAML / YAML 转 JSON 工具',
    h2_syntax: 'JSON 与 YAML：语法对比',
    syntax_p1: 'JSON 和 YAML 表示相同的数据结构，但语法哲学完全不同。JSON 优先考虑机器解析，YAML 优先考虑人类可读性。',
    syntax_p2: '以下是相同的配置数据在两种格式中的并排对比：',
    syntax_json_title: 'JSON 格式',
    syntax_yaml_title: 'YAML 格式',
    syntax_p3: 'YAML 消除了大括号、方括号和大部分引号。它使用缩进表示嵌套，短横线表示数组项，冒号表示键值对。支持用 <code>#</code> 添加注释。',
    h2_when: '何时使用 JSON，何时使用 YAML',
    when_p1: 'JSON 和 YAML 的选择取决于谁或什么来读写文件：',
    when_json_title: '使用 JSON 的场景：',
    when_json1: '构建 REST API 和 GraphQL 响应',
    when_json2: '微服务间数据交换',
    when_json3: 'MongoDB 等数据库存储',
    when_json4: 'JavaScript/TypeScript 项目',
    when_json5: 'package.json、tsconfig.json 等包清单',
    when_yaml_title: '使用 YAML 的场景：',
    when_yaml1: 'Kubernetes 清单文件',
    when_yaml2: 'Docker Compose 配置',
    when_yaml3: 'CI/CD 管道配置',
    when_yaml4: 'Ansible playbook 和基础设施即代码',
    when_yaml5: '任何需要人工频繁编辑和注释的配置文件',
    h2_anchors: 'YAML 锚点、别名与多行字符串',
    anchors_p1: 'YAML 提供了几个 JSON 完全没有的强大功能。',
    h3_anchors: '锚点与别名',
    anchors_p2: 'YAML 锚点(<code>&amp;</code>)定义可重用数据块，别名(<code>*</code>)引用它。合并键(<code>&lt;&lt;</code>)允许继承和覆盖：',
    h3_multiline: '多行字符串',
    multiline_p1: 'YAML 提供两种块标量样式来处理多行文本：',
    multiline_p2: '<strong>字面块(<code>|</code>)</strong>：保持换行原样。适用于脚本、SQL 等。',
    multiline_p3: '<strong>折叠块(<code>&gt;</code>)</strong>：用空格连接行（类似 HTML）。适用于长描述。',
    multiline_p4: '截断指示符控制尾部换行：<code>|+</code> 保留所有，<code>|-</code> 去除所有，<code>|</code>（默认）保留一个。',
    h2_js: '在 JavaScript 中转换（js-yaml）',
    js_p1: '<code>js-yaml</code> 是最广泛使用的 JavaScript YAML 解析器：',
    js_p2: 'TypeScript 项目可直接使用内置类型定义。也可以使用更新的 <code>yaml</code> 包，支持保留注释的往返编辑。',
    h2_python: '在 Python 中转换（PyYAML、ruamel.yaml）',
    python_p1: 'Python 有两个主要 YAML 库：<code>PyYAML</code> 是标准选择，<code>ruamel.yaml</code> 是支持保留注释的现代替代方案。',
    h3_pyyaml: 'PyYAML',
    h3_ruamel: 'ruamel.yaml（保留注释）',
    ruamel_p1: '<code>ruamel.yaml</code> 可以在修改值后保留注释完整写回：',
    h2_cli: '命令行转换（yq、jq）',
    cli_p1: '命令行工具适合快速转换、shell 脚本和 CI/CD 管道：',
    h3_yq: 'yq：YAML 瑞士军刀',
    yq_p1: '<code>yq</code> 是轻量级便携的 YAML 命令行处理器：',
    h3_jq: 'jq 处理 JSON',
    jq_p1: '<code>jq</code> 不直接处理 YAML，但可与 <code>yq</code> 或 Python 结合使用：',
    h3_oneliners: '快速单行命令',
    h2_k8s: 'Kubernetes 清单：YAML 密集型生态',
    k8s_p1: 'Kubernetes 使 YAML 成为云原生基础设施的通用语言。每个 Kubernetes 资源都在 YAML 中定义。',
    k8s_p2: '以下是典型的 Kubernetes Deployment 清单：',
    k8s_p3: 'Kubernetes 中的 YAML 模式：嵌套映射、短横线序列、多行字符串、标签/注解，以及 <code>---</code> 分隔符。',
    h2_docker: 'Docker Compose 与 CI/CD 配置',
    docker_p1: 'Docker Compose 和 GitHub Actions 等 CI/CD 平台是 YAML 的另一个主要生态：',
    h3_compose: 'Docker Compose',
    h3_gha: 'GitHub Actions 工作流',
    gha_p1: 'GitHub Actions 使用特定的 YAML 模式如 <code>on:</code> 触发器和矩阵策略：',
    h2_gotchas: 'YAML 陷阱：常见错误',
    gotchas_p1: 'YAML 的灵活性带来了几个臭名昭著的陷阱：',
    h3_norway: '挪威问题（布尔值强制转换）',
    norway_p1: 'YAML 最臭名昭著的陷阱。YAML 1.1 中大量未引用值被解释为布尔值：',
    norway_p2: '国家代码 <code>NO</code>（挪威）变成 <code>false</code>。解决方法：始终引用可能被误解的字符串。',
    h3_indent: '缩进错误',
    indent_p1: 'YAML 只使用空格（不允许制表符）。务必配置编辑器使用 2 空格：',
    h3_booleans: '意外的布尔值',
    booleans_p1: '版本号 <code>1.0</code> 变成浮点数，日期 <code>2024-01-15</code> 可能变成日期对象。引用所有非明显字符串：',
    h2_security: 'YAML 安全：避免代码执行',
    security_p1: 'YAML 解析器可能非常危险。YAML 规范包含允许实例化任意对象的标签。',
    security_p2: '<strong>危险模式（Python）</strong>：<code>yaml.load(data)</code> 允许从 YAML 标签构造任意 Python 对象。',
    security_p3: '<strong>安全模式</strong>：始终使用 <code>yaml.safe_load()</code>。',
    security_p4: 'JavaScript 中，<code>js-yaml</code> v4 默认安全加载。Go 的标准库默认安全。',
    security_p5: '<strong>其他安全考虑</strong>：限制输入大小防止 DoS，解析后验证 schema，不要反序列化不受信任的 YAML。',
    h2_comparison: '功能对比表',
    comparison_p1: '以下是 JSON 和 YAML 功能的全面对比：',
    h2_faq: '常见问题',
    faq1_q: 'JSON 和 YAML 有什么区别？',
    faq1_a: 'JSON 使用大括号和双引号字符串；YAML 使用缩进。YAML 支持注释、多行字符串和锚点。JSON 解析更快且通用支持更好。YAML 更易读，适合配置文件。YAML 是 JSON 的超集。',
    faq2_q: '如何在线将 JSON 转换为 YAML？',
    faq2_a: '将 JSON 粘贴到在线转换工具中，工具会解析 JSON 并输出带适当缩进的 YAML。我们的免费工具支持嵌套对象、数组和大文件。',
    faq3_q: 'YAML 比 JSON 更适合配置文件吗？',
    faq3_a: '是的，YAML 通常更适合人工频繁编辑的配置文件，因为它支持注释、多行字符串和更简洁的语法。',
    faq4_q: '什么是 YAML 中的挪威问题？',
    faq4_a: '挪威问题指 YAML 1.1 将国家代码 NO 解释为布尔值 false。解决方法是用引号包裹。',
    faq5_q: '为什么要用 yaml.safe_load()？',
    faq5_a: 'yaml.load() 可以实例化任意 Python 对象，导致远程代码执行。safe_load() 限制为基本数据类型。',
    faq6_q: '转换为 JSON 再转回能保留 YAML 注释吗？',
    faq6_a: '不能。JSON 没有注释语法。要保留注释，使用 ruamel.yaml 或 yaml CST 解析器。',
    faq7_q: '如何在命令行中转换？',
    faq7_a: '使用 yq：运行 "yq -o=json file.yaml"。也可用 Python 单行命令。',
    faq8_q: '转换为 JSON 时会丢失哪些 YAML 功能？',
    faq8_a: '注释被丢弃，锚点被展开，多行块标量变为带 \\n 的字符串，多文档变为数组，日期和二进制类型被转换。',
    conclusion: '理解 JSON 和 YAML 之间的关系对现代软件开发至关重要。JSON 主导 API 通信，YAML 统治配置世界。掌握两者之间的转换、避免常见陷阱，遵循安全最佳实践，你就能在两个生态中自如工作。',
    link_tool_bottom: '使用我们的免费在线工具即时转换 JSON 和 YAML。',
  },
  ja: {
    tldr_title: 'TL;DR',
    tldr: 'JSON と YAML は現代の開発における2大データシリアライゼーション形式です。JSON は API とマシン間通信に優れ、YAML は人が編集する設定ファイルに最適です。YAML は JSON のスーパーセットで、コメント、アンカー、複数行文字列をサポートします。YAML の落とし穴（ノルウェー問題、ブール値変換、インデントエラー）に注意してください。',
    takeaways_title: '重要ポイント',
    takeaway1: 'JSON は波括弧と厳密な引用を使用。YAML はインデントで最小限の記号。',
    takeaway2: 'YAML はコメント(#)、アンカー/エイリアス(&/*)、複数行文字列(|と>)をサポート。',
    takeaway3: '「ノルウェー問題」：引用なしの NO、YES、on、off は YAML 1.1 でブール値になる。',
    takeaway4: 'Python では yaml.load() の代わりに常に yaml.safe_load() を使用。',
    takeaway5: 'Kubernetes、Docker Compose、GitHub Actions は YAML を主要設定形式として使用。',
    takeaway6: 'js-yaml(JavaScript)、PyYAML(Python)、yq(CLI)で変換。',
    link_tool: '無料 JSON-YAML 変換ツールを試す',
    h2_syntax: 'JSON vs YAML：構文比較', syntax_p1: 'JSON と YAML は同じデータ構造を異なる構文で表現します。', syntax_p2: '同じデータを両形式で並べて比較：', syntax_json_title: 'JSON 形式', syntax_yaml_title: 'YAML 形式', syntax_p3: 'YAML は波括弧、角括弧、引用符のほとんどを排除し、インデントでネストを表現します。<code>#</code> でコメントをサポート。',
    h2_when: 'JSON と YAML の使い分け', when_p1: '選択はファイルを読み書きする主体によります：', when_json_title: 'JSON を使う場面：', when_json1: 'REST API と GraphQL レスポンス', when_json2: 'マイクロサービス間データ交換', when_json3: 'MongoDB データベース', when_json4: 'JavaScript/TypeScript プロジェクト', when_json5: 'package.json 等のマニフェスト', when_yaml_title: 'YAML を使う場面：', when_yaml1: 'Kubernetes マニフェスト', when_yaml2: 'Docker Compose 設定', when_yaml3: 'CI/CD パイプライン', when_yaml4: 'Ansible プレイブック', when_yaml5: '人が頻繁に編集する設定ファイル',
    h2_anchors: 'YAML アンカー、エイリアス、複数行文字列', anchors_p1: 'JSON にない YAML の強力な機能。', h3_anchors: 'アンカーとエイリアス', anchors_p2: 'アンカー(<code>&amp;</code>)で再利用ブロックを定義、エイリアス(<code>*</code>)で参照：', h3_multiline: '複数行文字列', multiline_p1: 'YAML は2種類のブロックスカラーを提供：', multiline_p2: '<strong>リテラルブロック(<code>|</code>)</strong>：改行をそのまま保持。', multiline_p3: '<strong>折りたたみブロック(<code>&gt;</code>)</strong>：改行をスペースに置換。', multiline_p4: 'チョンピング指示子：<code>|+</code> 全末尾改行保持、<code>|-</code> 全削除、<code>|</code> 1つ保持。',
    h2_js: 'JavaScript での変換（js-yaml）', js_p1: '<code>js-yaml</code> は最も広く使われる JavaScript YAML パーサー：', js_p2: 'TypeScript プロジェクトでは組み込み型定義を使用可能。',
    h2_python: 'Python での変換（PyYAML、ruamel.yaml）', python_p1: 'Python には2つの主要 YAML ライブラリがあります。', h3_pyyaml: 'PyYAML', h3_ruamel: 'ruamel.yaml（コメント保持）', ruamel_p1: '<code>ruamel.yaml</code> はコメントを保持したまま編集可能：',
    h2_cli: 'コマンドラインでの変換（yq、jq）', cli_p1: 'CLI ツールは素早い変換に最適：', h3_yq: 'yq：YAML のスイスアーミーナイフ', yq_p1: '<code>yq</code> は軽量なコマンドライン YAML プロセッサ：', h3_jq: 'jq', jq_p1: '<code>jq</code> は YAML を直接扱えませんが、<code>yq</code> と組み合わせ可能：', h3_oneliners: 'ワンライナー',
    h2_k8s: 'Kubernetes マニフェスト', k8s_p1: 'Kubernetes は YAML をクラウドネイティブの共通言語にしました。', k8s_p2: '典型的な Deployment マニフェスト：', k8s_p3: 'Kubernetes の YAML パターン：ネスト、シーケンス、複数行文字列、ラベル。',
    h2_docker: 'Docker Compose と CI/CD', docker_p1: 'Docker Compose と GitHub Actions も主要な YAML エコシステム：', h3_compose: 'Docker Compose', h3_gha: 'GitHub Actions', gha_p1: 'GitHub Actions は特定の YAML パターンを使用：',
    h2_gotchas: 'YAML の落とし穴', gotchas_p1: 'YAML の柔軟性には落とし穴が伴います：', h3_norway: 'ノルウェー問題', norway_p1: 'YAML 最大の落とし穴：', norway_p2: '国コード <code>NO</code> が <code>false</code> になる。解決策：引用。', h3_indent: 'インデントエラー', indent_p1: 'YAML はスペースのみ（タブ不可）。エディタを2スペースに設定：', h3_booleans: '予期しないブール値', booleans_p1: 'バージョン番号 <code>1.0</code> は浮動小数点になる：',
    h2_security: 'YAML セキュリティ', security_p1: 'YAML パーサーは危険な場合があります。', security_p2: '<strong>危険パターン</strong>：<code>yaml.load(data)</code> は任意のオブジェクトを生成可能。', security_p3: '<strong>安全パターン</strong>：<code>yaml.safe_load()</code> を使用。', security_p4: 'JavaScript の <code>js-yaml</code> v4 はデフォルトで安全。', security_p5: '入力サイズ制限、スキーマ検証、信頼できないソースからの安全な読み込みを徹底。',
    h2_comparison: '機能比較表', comparison_p1: 'JSON と YAML の包括的な比較：',
    h2_faq: 'よくある質問', faq1_q: 'JSON と YAML の違いは？', faq1_a: 'JSON は波括弧と厳密な構文。YAML はインデントベースでコメント、複数行文字列をサポート。', faq2_q: 'オンラインで JSON を YAML に変換するには？', faq2_a: 'オンラインツールに JSON を貼り付けると YAML に変換されます。', faq3_q: '設定ファイルに YAML は JSON より良い？', faq3_a: 'はい、人が編集するファイルには YAML が適しています。', faq4_q: 'YAML のノルウェー問題とは？', faq4_a: 'YAML 1.1 が NO を false に解釈する問題。引用で解決。', faq5_q: 'なぜ yaml.safe_load() を使う？', faq5_a: 'yaml.load() は任意コード実行の危険性がある。', faq6_q: 'JSON 変換後に YAML コメントは保持される？', faq6_a: 'いいえ。ruamel.yaml を使用してください。', faq7_q: 'CLI で変換するには？', faq7_a: 'yq -o=json file.yaml を使用。', faq8_q: 'JSON 変換で失われる YAML 機能は？', faq8_a: 'コメント、アンカー、複数行ブロック、複数ドキュメント、日付型。',
    conclusion: 'JSON と YAML の関係を理解することは現代のソフトウェア開発に不可欠です。',
    link_tool_bottom: '無料オンラインツールで JSON と YAML を即座に変換。',
  },
  ko: {
    tldr_title: 'TL;DR',
    tldr: 'JSON과 YAML은 현대 개발의 2대 데이터 직렬화 형식입니다. JSON은 API와 머신간 통신에, YAML은 사람이 편집하는 설정 파일에 적합합니다. YAML은 JSON의 상위 집합으로 주석, 앵커, 다중행 문자열을 지원합니다.',
    takeaways_title: '핵심 요점',
    takeaway1: 'JSON은 중괄호와 엄격한 인용을 사용; YAML은 들여쓰기와 최소한의 구두점 사용.',
    takeaway2: 'YAML은 주석(#), 앵커/별칭(&/*), 다중행 문자열(|과 >)을 지원.',
    takeaway3: '"노르웨이 문제": 따옴표 없는 NO, YES, on, off가 YAML 1.1에서 불리언이 됨.',
    takeaway4: 'Python에서 yaml.load() 대신 항상 yaml.safe_load()를 사용.',
    takeaway5: 'Kubernetes, Docker Compose, GitHub Actions가 YAML을 주요 설정 형식으로 사용.',
    takeaway6: 'js-yaml(JavaScript), PyYAML(Python), yq(CLI)로 변환.',
    link_tool: '무료 JSON-YAML 변환 도구 사용해보기',
    h2_syntax: 'JSON vs YAML: 구문 비교', syntax_p1: 'JSON과 YAML은 같은 데이터를 다른 구문으로 표현합니다.', syntax_p2: '동일 데이터의 형식별 비교:', syntax_json_title: 'JSON 형식', syntax_yaml_title: 'YAML 형식', syntax_p3: 'YAML은 중괄호, 대괄호, 따옴표를 제거하고 들여쓰기로 중첩을 표현합니다.',
    h2_when: 'JSON과 YAML 사용 시기', when_p1: '선택은 파일을 읽고 쓰는 주체에 따라 달라집니다:', when_json_title: 'JSON 사용 시:', when_json1: 'REST API 및 GraphQL 응답', when_json2: '마이크로서비스 간 데이터 교환', when_json3: 'MongoDB 데이터베이스', when_json4: 'JavaScript/TypeScript 프로젝트', when_json5: 'package.json 등 매니페스트', when_yaml_title: 'YAML 사용 시:', when_yaml1: 'Kubernetes 매니페스트', when_yaml2: 'Docker Compose 설정', when_yaml3: 'CI/CD 파이프라인', when_yaml4: 'Ansible 플레이북', when_yaml5: '사람이 자주 편집하는 설정 파일',
    h2_anchors: 'YAML 앵커, 별칭, 다중행 문자열', anchors_p1: 'JSON에 없는 YAML의 강력한 기능들.', h3_anchors: '앵커와 별칭', anchors_p2: '앵커(<code>&amp;</code>)로 재사용 블록 정의, 별칭(<code>*</code>)으로 참조:', h3_multiline: '다중행 문자열', multiline_p1: 'YAML은 두 가지 블록 스칼라 스타일을 제공:', multiline_p2: '<strong>리터럴 블록(<code>|</code>)</strong>: 줄바꿈 그대로 유지.', multiline_p3: '<strong>접힘 블록(<code>&gt;</code>)</strong>: 줄바꿈을 공백으로 대체.', multiline_p4: '촘핑 지시자: <code>|+</code> 모든 후행 줄바꿈 유지, <code>|-</code> 모두 제거.',
    h2_js: 'JavaScript 변환(js-yaml)', js_p1: '<code>js-yaml</code>은 가장 널리 사용되는 JavaScript YAML 파서:', js_p2: 'TypeScript에서 내장 타입 정의 사용 가능.',
    h2_python: 'Python 변환(PyYAML, ruamel.yaml)', python_p1: 'Python에는 두 가지 주요 YAML 라이브러리가 있습니다.', h3_pyyaml: 'PyYAML', h3_ruamel: 'ruamel.yaml(주석 보존)', ruamel_p1: '<code>ruamel.yaml</code>은 주석을 보존하며 편집 가능:',
    h2_cli: 'CLI 변환(yq, jq)', cli_p1: 'CLI 도구는 빠른 변환에 이상적:', h3_yq: 'yq: YAML 만능 도구', yq_p1: '<code>yq</code>는 경량 YAML 처리기:', h3_jq: 'jq', jq_p1: '<code>jq</code>는 YAML을 직접 처리하지 않지만 <code>yq</code>와 결합 가능:', h3_oneliners: '원라이너',
    h2_k8s: 'Kubernetes 매니페스트', k8s_p1: 'Kubernetes는 YAML을 클라우드 네이티브의 공용어로 만들었습니다.', k8s_p2: '전형적인 Deployment 매니페스트:', k8s_p3: 'Kubernetes YAML 패턴: 중첩, 시퀀스, 다중행 문자열, 레이블.',
    h2_docker: 'Docker Compose와 CI/CD', docker_p1: 'Docker Compose와 GitHub Actions도 주요 YAML 생태계:', h3_compose: 'Docker Compose', h3_gha: 'GitHub Actions', gha_p1: 'GitHub Actions는 특정 YAML 패턴을 사용:',
    h2_gotchas: 'YAML 함정', gotchas_p1: 'YAML의 유연성에는 함정이 따릅니다:', h3_norway: '노르웨이 문제', norway_p1: 'YAML의 가장 유명한 함정:', norway_p2: '국가 코드 <code>NO</code>가 <code>false</code>가 됨. 해결: 따옴표 사용.', h3_indent: '들여쓰기 오류', indent_p1: 'YAML은 공백만 사용(탭 불가). 에디터를 2칸 공백으로 설정:', h3_booleans: '예상치 못한 불리언', booleans_p1: '버전 번호 <code>1.0</code>이 부동소수점이 됨:',
    h2_security: 'YAML 보안', security_p1: 'YAML 파서는 위험할 수 있습니다.', security_p2: '<strong>위험 패턴</strong>: <code>yaml.load(data)</code>는 임의 객체 생성 가능.', security_p3: '<strong>안전 패턴</strong>: <code>yaml.safe_load()</code> 사용.', security_p4: 'JavaScript <code>js-yaml</code> v4는 기본 안전.', security_p5: '입력 크기 제한, 스키마 검증, 신뢰할 수 없는 소스의 안전한 로딩 필수.',
    h2_comparison: '기능 비교표', comparison_p1: 'JSON과 YAML의 종합 비교:',
    h2_faq: '자주 묻는 질문', faq1_q: 'JSON과 YAML의 차이점은?', faq1_a: 'JSON은 중괄호와 엄격한 구문. YAML은 들여쓰기 기반으로 주석과 다중행 문자열 지원.', faq2_q: '온라인에서 JSON을 YAML로 변환하려면?', faq2_a: '온라인 도구에 JSON을 붙여넣으면 YAML로 변환됩니다.', faq3_q: '설정 파일에 YAML이 JSON보다 나은가요?', faq3_a: '네, 사람이 편집하는 파일에는 YAML이 적합합니다.', faq4_q: 'YAML의 노르웨이 문제란?', faq4_a: 'YAML 1.1이 NO를 false로 해석하는 문제. 따옴표로 해결.', faq5_q: 'yaml.safe_load()를 사용해야 하는 이유?', faq5_a: 'yaml.load()는 임의 코드 실행 위험. safe_load()는 기본 타입만 허용.', faq6_q: 'JSON 변환 후 YAML 주석이 보존되나요?', faq6_a: '아니요. ruamel.yaml을 사용하세요.', faq7_q: 'CLI에서 변환하려면?', faq7_a: 'yq -o=json file.yaml 사용.', faq8_q: 'JSON 변환 시 손실되는 YAML 기능은?', faq8_a: '주석, 앵커, 다중행 블록, 다중 문서, 날짜 타입.',
    conclusion: 'JSON과 YAML의 관계를 이해하는 것은 현대 소프트웨어 개발에 필수적입니다.',
    link_tool_bottom: '무료 온라인 도구로 JSON과 YAML을 즉시 변환하세요.',
  },
  fr: {
    tldr_title: 'TL;DR',
    tldr: 'JSON et YAML sont les deux formats de serialisation de donnees dominants. JSON excelle pour les API, YAML pour les fichiers de configuration. YAML est un surensemble de JSON avec commentaires, ancres et chaines multi-lignes. Attention aux pieges YAML comme le probleme de la Norvege (NO devient false).',
    takeaways_title: 'Points cles',
    takeaway1: 'JSON utilise des accolades et des guillemets stricts; YAML utilise l\'indentation avec un minimum de ponctuation.',
    takeaway2: 'YAML supporte les commentaires (#), les ancres/alias (&/*) et les chaines multi-lignes (| et >).',
    takeaway3: 'Le "probleme de la Norvege": NO, YES, on, off non cites deviennent des booleens en YAML 1.1.',
    takeaway4: 'En Python, utilisez toujours yaml.safe_load() au lieu de yaml.load().',
    takeaway5: 'Kubernetes, Docker Compose, GitHub Actions utilisent YAML comme format principal.',
    takeaway6: 'Utilisez js-yaml (JavaScript), PyYAML (Python) ou yq (CLI) pour la conversion.',
    link_tool: 'Essayez notre convertisseur JSON-YAML gratuit',
    h2_syntax: 'JSON vs YAML : Comparaison de syntaxe', syntax_p1: 'JSON et YAML representent les memes structures avec des philosophies differentes.', syntax_p2: 'Les memes donnees dans les deux formats :', syntax_json_title: 'Format JSON', syntax_yaml_title: 'Format YAML', syntax_p3: 'YAML elimine les accolades et la plupart des guillemets, utilisant l\'indentation pour le nesting.',
    h2_when: 'Quand utiliser JSON ou YAML', when_p1: 'Le choix depend de qui lit et ecrit le fichier :', when_json_title: 'Utilisez JSON pour :', when_json1: 'API REST et reponses GraphQL', when_json2: 'Echange de donnees entre microservices', when_json3: 'Bases de donnees MongoDB', when_json4: 'Projets JavaScript/TypeScript', when_json5: 'Manifestes comme package.json', when_yaml_title: 'Utilisez YAML pour :', when_yaml1: 'Manifestes Kubernetes', when_yaml2: 'Configuration Docker Compose', when_yaml3: 'Pipelines CI/CD', when_yaml4: 'Playbooks Ansible', when_yaml5: 'Fichiers de configuration edites frequemment',
    h2_anchors: 'Ancres, alias et chaines multi-lignes YAML', anchors_p1: 'Fonctionnalites YAML sans equivalent JSON.', h3_anchors: 'Ancres et alias', anchors_p2: 'Les ancres (<code>&amp;</code>) definissent des blocs reutilisables, les alias (<code>*</code>) les referencent :', h3_multiline: 'Chaines multi-lignes', multiline_p1: 'YAML offre deux styles de blocs scalaires :', multiline_p2: '<strong>Bloc litteral (<code>|</code>)</strong> : preserve les retours a la ligne.', multiline_p3: '<strong>Bloc replie (<code>&gt;</code>)</strong> : joint les lignes avec des espaces.', multiline_p4: 'Indicateurs de chomping : <code>|+</code> garde tous, <code>|-</code> supprime tous.',
    h2_js: 'Conversion en JavaScript (js-yaml)', js_p1: '<code>js-yaml</code> est le parseur YAML le plus utilise pour JavaScript :', js_p2: 'Pour TypeScript, les definitions de types sont incluses.',
    h2_python: 'Conversion en Python (PyYAML, ruamel.yaml)', python_p1: 'Python a deux bibliotheques YAML majeures.', h3_pyyaml: 'PyYAML', h3_ruamel: 'ruamel.yaml (preservation des commentaires)', ruamel_p1: '<code>ruamel.yaml</code> preserve les commentaires lors de l\'edition :',
    h2_cli: 'Conversion en ligne de commande (yq, jq)', cli_p1: 'Les outils CLI sont ideaux pour les conversions rapides :', h3_yq: 'yq : Le couteau suisse YAML', yq_p1: '<code>yq</code> est un processeur YAML leger :', h3_jq: 'jq', jq_p1: '<code>jq</code> ne gere pas YAML nativement mais se combine avec <code>yq</code> :', h3_oneliners: 'Commandes rapides',
    h2_k8s: 'Manifestes Kubernetes', k8s_p1: 'Kubernetes a fait de YAML la lingua franca de l\'infrastructure cloud-native.', k8s_p2: 'Un manifeste Deployment typique :', k8s_p3: 'Patterns YAML Kubernetes : mappings imbriques, sequences, chaines multi-lignes.',
    h2_docker: 'Docker Compose et CI/CD', docker_p1: 'Docker Compose et GitHub Actions sont un autre ecosysteme YAML majeur :', h3_compose: 'Docker Compose', h3_gha: 'GitHub Actions', gha_p1: 'Les workflows GitHub Actions utilisent des patterns YAML specifiques :',
    h2_gotchas: 'Pieges YAML', gotchas_p1: 'La flexibilite de YAML comporte des pieges notoires :', h3_norway: 'Le probleme de la Norvege', norway_p1: 'Le piege le plus infame de YAML :', norway_p2: 'Le code pays <code>NO</code> devient <code>false</code>. Solution : citer les chaines ambigues.', h3_indent: 'Erreurs d\'indentation', indent_p1: 'YAML utilise uniquement des espaces (jamais de tabulations) :', h3_booleans: 'Valeurs booleennes inattendues', booleans_p1: 'Les numeros de version <code>1.0</code> deviennent des flottants :',
    h2_security: 'Securite YAML', security_p1: 'Les parseurs YAML peuvent etre dangereux.', security_p2: '<strong>Pattern dangereux</strong> : <code>yaml.load(data)</code> peut instancier des objets arbitraires.', security_p3: '<strong>Pattern sur</strong> : utilisez <code>yaml.safe_load()</code>.', security_p4: '<code>js-yaml</code> v4 est securise par defaut.', security_p5: 'Limitez la taille des entrees, validez le schema, chargement securise obligatoire.',
    h2_comparison: 'Tableau comparatif', comparison_p1: 'Comparaison complete JSON vs YAML :',
    h2_faq: 'Questions frequentes', faq1_q: 'Quelle est la difference entre JSON et YAML ?', faq1_a: 'JSON utilise des accolades, YAML l\'indentation. YAML supporte les commentaires et les chaines multi-lignes.', faq2_q: 'Comment convertir JSON en YAML en ligne ?', faq2_a: 'Collez votre JSON dans un outil de conversion en ligne.', faq3_q: 'YAML est-il meilleur que JSON pour la configuration ?', faq3_a: 'Oui, pour les fichiers edites frequemment par des humains.', faq4_q: 'Qu\'est-ce que le probleme de la Norvege ?', faq4_a: 'YAML 1.1 interprete NO comme false. Solution : utiliser des guillemets.', faq5_q: 'Pourquoi utiliser yaml.safe_load() ?', faq5_a: 'yaml.load() peut executer du code arbitraire.', faq6_q: 'Les commentaires YAML sont-ils preserves ?', faq6_a: 'Non. Utilisez ruamel.yaml pour les preserver.', faq7_q: 'Comment convertir en ligne de commande ?', faq7_a: 'Utilisez yq -o=json file.yaml.', faq8_q: 'Quelles fonctionnalites YAML sont perdues ?', faq8_a: 'Commentaires, ancres, blocs multi-lignes, documents multiples, types date.',
    conclusion: 'Comprendre la relation entre JSON et YAML est essentiel pour le developpement moderne.',
    link_tool_bottom: 'Convertissez JSON et YAML instantanement avec notre outil gratuit.',
  },
  de: {
    tldr_title: 'TL;DR',
    tldr: 'JSON und YAML sind die beiden dominierenden Datenserialisierungsformate. JSON eignet sich fur APIs, YAML fur Konfigurationsdateien. YAML ist ein Superset von JSON mit Kommentaren, Ankern und mehrzeiligen Strings. Achten Sie auf YAML-Fallstricke wie das Norwegen-Problem.',
    takeaways_title: 'Kernpunkte',
    takeaway1: 'JSON verwendet Klammern und strenge Anfuhrungszeichen; YAML verwendet Einruckung mit minimaler Interpunktion.',
    takeaway2: 'YAML unterstutzt Kommentare (#), Anker/Aliase (&/*) und mehrzeilige Strings (| und >).',
    takeaway3: 'Das "Norwegen-Problem": unzitiertes NO, YES, on, off werden in YAML 1.1 zu Booleans.',
    takeaway4: 'In Python immer yaml.safe_load() statt yaml.load() verwenden.',
    takeaway5: 'Kubernetes, Docker Compose, GitHub Actions verwenden YAML als Hauptformat.',
    takeaway6: 'Verwenden Sie js-yaml (JavaScript), PyYAML (Python) oder yq (CLI) fur die Konvertierung.',
    link_tool: 'Testen Sie unseren kostenlosen JSON-YAML Konverter',
    h2_syntax: 'JSON vs YAML: Syntaxvergleich', syntax_p1: 'JSON und YAML stellen die gleichen Datenstrukturen mit unterschiedlicher Syntax dar.', syntax_p2: 'Die gleichen Daten in beiden Formaten:', syntax_json_title: 'JSON-Format', syntax_yaml_title: 'YAML-Format', syntax_p3: 'YAML eliminiert Klammern und verwendet Einruckung fur die Verschachtelung.',
    h2_when: 'Wann JSON oder YAML verwenden', when_p1: 'Die Wahl hangt davon ab, wer die Datei liest und schreibt:', when_json_title: 'JSON verwenden fur:', when_json1: 'REST-APIs und GraphQL-Antworten', when_json2: 'Datenaustausch zwischen Microservices', when_json3: 'MongoDB-Datenbanken', when_json4: 'JavaScript/TypeScript-Projekte', when_json5: 'Package-Manifeste', when_yaml_title: 'YAML verwenden fur:', when_yaml1: 'Kubernetes-Manifeste', when_yaml2: 'Docker-Compose-Konfiguration', when_yaml3: 'CI/CD-Pipelines', when_yaml4: 'Ansible-Playbooks', when_yaml5: 'Haufig bearbeitete Konfigurationsdateien',
    h2_anchors: 'YAML-Anker, Aliase und mehrzeilige Strings', anchors_p1: 'YAML-Funktionen ohne JSON-Aquivalent.', h3_anchors: 'Anker und Aliase', anchors_p2: 'Anker (<code>&amp;</code>) definieren wiederverwendbare Blocke, Aliase (<code>*</code>) referenzieren sie:', h3_multiline: 'Mehrzeilige Strings', multiline_p1: 'YAML bietet zwei Block-Skalar-Stile:', multiline_p2: '<strong>Literalblock (<code>|</code>)</strong>: Bewahrt Zeilenumbruche.', multiline_p3: '<strong>Faltblock (<code>&gt;</code>)</strong>: Verbindet Zeilen mit Leerzeichen.', multiline_p4: 'Chomping-Indikatoren: <code>|+</code> alle behalten, <code>|-</code> alle entfernen.',
    h2_js: 'Konvertierung in JavaScript (js-yaml)', js_p1: '<code>js-yaml</code> ist der am weitesten verbreitete YAML-Parser fur JavaScript:', js_p2: 'Fur TypeScript sind Typdefinitionen integriert.',
    h2_python: 'Konvertierung in Python (PyYAML, ruamel.yaml)', python_p1: 'Python hat zwei Haupt-YAML-Bibliotheken.', h3_pyyaml: 'PyYAML', h3_ruamel: 'ruamel.yaml (Kommentare erhalten)', ruamel_p1: '<code>ruamel.yaml</code> erhalt Kommentare beim Bearbeiten:',
    h2_cli: 'Konvertierung per CLI (yq, jq)', cli_p1: 'CLI-Tools sind ideal fur schnelle Konvertierungen:', h3_yq: 'yq: Das YAML-Schweizer-Taschenmesser', yq_p1: '<code>yq</code> ist ein leichter YAML-Prozessor:', h3_jq: 'jq', jq_p1: '<code>jq</code> verarbeitet YAML nicht direkt, kombinierbar mit <code>yq</code>:', h3_oneliners: 'Schnelle Einzeiler',
    h2_k8s: 'Kubernetes-Manifeste', k8s_p1: 'Kubernetes hat YAML zur Standardsprache der Cloud-Infrastruktur gemacht.', k8s_p2: 'Ein typisches Deployment-Manifest:', k8s_p3: 'Kubernetes-YAML-Muster: verschachtelte Mappings, Sequenzen, mehrzeilige Strings.',
    h2_docker: 'Docker Compose und CI/CD', docker_p1: 'Docker Compose und GitHub Actions sind ein weiteres YAML-Okosystem:', h3_compose: 'Docker Compose', h3_gha: 'GitHub Actions', gha_p1: 'GitHub-Actions-Workflows verwenden spezifische YAML-Muster:',
    h2_gotchas: 'YAML-Fallstricke', gotchas_p1: 'YAMLs Flexibilitat bringt Fallstricke mit sich:', h3_norway: 'Das Norwegen-Problem', norway_p1: 'YAMLs beruhmtester Fallstrick:', norway_p2: 'Landercode <code>NO</code> wird zu <code>false</code>. Losung: Strings zitieren.', h3_indent: 'Einruckungsfehler', indent_p1: 'YAML verwendet nur Leerzeichen (keine Tabs). Editor auf 2 Leerzeichen einstellen:', h3_booleans: 'Unerwartete Booleans', booleans_p1: 'Versionsnummern <code>1.0</code> werden zu Fliesskommazahlen:',
    h2_security: 'YAML-Sicherheit', security_p1: 'YAML-Parser konnen gefahrlich sein.', security_p2: '<strong>Gefahrlich</strong>: <code>yaml.load(data)</code> kann beliebige Objekte instanziieren.', security_p3: '<strong>Sicher</strong>: <code>yaml.safe_load()</code> verwenden.', security_p4: '<code>js-yaml</code> v4 ist standardmassig sicher.', security_p5: 'Eingabegrosse begrenzen, Schema validieren, sicheres Laden erzwingen.',
    h2_comparison: 'Vergleichstabelle', comparison_p1: 'Umfassender Vergleich von JSON und YAML:',
    h2_faq: 'Haufig gestellte Fragen', faq1_q: 'Was ist der Unterschied zwischen JSON und YAML?', faq1_a: 'JSON verwendet Klammern, YAML Einruckung. YAML unterstutzt Kommentare und mehrzeilige Strings.', faq2_q: 'Wie konvertiere ich JSON online zu YAML?', faq2_a: 'JSON in ein Online-Tool einfugen fur automatische Konvertierung.', faq3_q: 'Ist YAML besser als JSON fur Konfiguration?', faq3_a: 'Ja, fur menschlich bearbeitete Dateien.', faq4_q: 'Was ist das Norwegen-Problem?', faq4_a: 'YAML 1.1 interpretiert NO als false. Losung: Anfuhrungszeichen.', faq5_q: 'Warum yaml.safe_load() verwenden?', faq5_a: 'yaml.load() kann beliebigen Code ausfuhren.', faq6_q: 'Werden YAML-Kommentare erhalten?', faq6_a: 'Nein. Verwenden Sie ruamel.yaml.', faq7_q: 'Wie konvertiere ich per CLI?', faq7_a: 'yq -o=json file.yaml verwenden.', faq8_q: 'Welche YAML-Funktionen gehen verloren?', faq8_a: 'Kommentare, Anker, mehrzeilige Blocke, Mehrfachdokumente, Datumstypen.',
    conclusion: 'Das Verstandnis der Beziehung zwischen JSON und YAML ist fur moderne Softwareentwicklung unerlasslich.',
    link_tool_bottom: 'Konvertieren Sie JSON und YAML sofort mit unserem kostenlosen Tool.',
  },
  es: {
    tldr_title: 'TL;DR',
    tldr: 'JSON y YAML son los dos formatos dominantes de serializacion de datos. JSON sobresale para APIs, YAML para archivos de configuracion. YAML es un superconjunto de JSON con comentarios, anclas y cadenas multilínea. Cuidado con las trampas YAML como el problema de Noruega.',
    takeaways_title: 'Puntos clave',
    takeaway1: 'JSON usa llaves y comillas estrictas; YAML usa indentacion con puntuacion minima.',
    takeaway2: 'YAML soporta comentarios (#), anclas/alias (&/*) y cadenas multilinea (| y >).',
    takeaway3: 'El "problema de Noruega": NO, YES, on, off sin comillas se convierten en booleanos en YAML 1.1.',
    takeaway4: 'En Python, siempre usar yaml.safe_load() en lugar de yaml.load().',
    takeaway5: 'Kubernetes, Docker Compose, GitHub Actions usan YAML como formato principal.',
    takeaway6: 'Use js-yaml (JavaScript), PyYAML (Python) o yq (CLI) para la conversion.',
    link_tool: 'Prueba nuestro convertidor JSON-YAML gratuito',
    h2_syntax: 'JSON vs YAML: Comparacion de sintaxis', syntax_p1: 'JSON y YAML representan las mismas estructuras con filosofias diferentes.', syntax_p2: 'Los mismos datos en ambos formatos:', syntax_json_title: 'Formato JSON', syntax_yaml_title: 'Formato YAML', syntax_p3: 'YAML elimina llaves y la mayoria de comillas, usando indentacion para el anidamiento.',
    h2_when: 'Cuando usar JSON vs YAML', when_p1: 'La eleccion depende de quien lee y escribe el archivo:', when_json_title: 'Usar JSON para:', when_json1: 'APIs REST y respuestas GraphQL', when_json2: 'Intercambio de datos entre microservicios', when_json3: 'Bases de datos MongoDB', when_json4: 'Proyectos JavaScript/TypeScript', when_json5: 'Manifiestos como package.json', when_yaml_title: 'Usar YAML para:', when_yaml1: 'Manifiestos Kubernetes', when_yaml2: 'Configuracion Docker Compose', when_yaml3: 'Pipelines CI/CD', when_yaml4: 'Playbooks Ansible', when_yaml5: 'Archivos de configuracion editados frecuentemente',
    h2_anchors: 'Anclas, alias y cadenas multilinea YAML', anchors_p1: 'Funcionalidades YAML sin equivalente en JSON.', h3_anchors: 'Anclas y alias', anchors_p2: 'Las anclas (<code>&amp;</code>) definen bloques reutilizables, los alias (<code>*</code>) los referencian:', h3_multiline: 'Cadenas multilinea', multiline_p1: 'YAML ofrece dos estilos de bloques escalares:', multiline_p2: '<strong>Bloque literal (<code>|</code>)</strong>: preserva saltos de linea.', multiline_p3: '<strong>Bloque plegado (<code>&gt;</code>)</strong>: une lineas con espacios.', multiline_p4: 'Indicadores de chomping: <code>|+</code> mantiene todos, <code>|-</code> elimina todos.',
    h2_js: 'Conversion en JavaScript (js-yaml)', js_p1: '<code>js-yaml</code> es el parser YAML mas usado para JavaScript:', js_p2: 'Para TypeScript, las definiciones de tipo estan incluidas.',
    h2_python: 'Conversion en Python (PyYAML, ruamel.yaml)', python_p1: 'Python tiene dos bibliotecas YAML principales.', h3_pyyaml: 'PyYAML', h3_ruamel: 'ruamel.yaml (preserva comentarios)', ruamel_p1: '<code>ruamel.yaml</code> preserva comentarios al editar:',
    h2_cli: 'Conversion por CLI (yq, jq)', cli_p1: 'Las herramientas CLI son ideales para conversiones rapidas:', h3_yq: 'yq: La navaja suiza YAML', yq_p1: '<code>yq</code> es un procesador YAML ligero:', h3_jq: 'jq', jq_p1: '<code>jq</code> no maneja YAML nativamente pero se combina con <code>yq</code>:', h3_oneliners: 'Comandos rapidos',
    h2_k8s: 'Manifiestos Kubernetes', k8s_p1: 'Kubernetes hizo de YAML la lengua franca de la infraestructura cloud-native.', k8s_p2: 'Un manifiesto Deployment tipico:', k8s_p3: 'Patrones YAML de Kubernetes: mappings anidados, secuencias, cadenas multilinea.',
    h2_docker: 'Docker Compose y CI/CD', docker_p1: 'Docker Compose y GitHub Actions son otro ecosistema YAML importante:', h3_compose: 'Docker Compose', h3_gha: 'GitHub Actions', gha_p1: 'Los workflows de GitHub Actions usan patrones YAML especificos:',
    h2_gotchas: 'Trampas YAML', gotchas_p1: 'La flexibilidad de YAML conlleva trampas:', h3_norway: 'El problema de Noruega', norway_p1: 'La trampa mas famosa de YAML:', norway_p2: 'El codigo de pais <code>NO</code> se convierte en <code>false</code>. Solucion: usar comillas.', h3_indent: 'Errores de indentacion', indent_p1: 'YAML solo usa espacios (nunca tabulaciones). Configurar editor a 2 espacios:', h3_booleans: 'Booleanos inesperados', booleans_p1: 'Numeros de version <code>1.0</code> se convierten en flotantes:',
    h2_security: 'Seguridad YAML', security_p1: 'Los parsers YAML pueden ser peligrosos.', security_p2: '<strong>Patron peligroso</strong>: <code>yaml.load(data)</code> puede instanciar objetos arbitrarios.', security_p3: '<strong>Patron seguro</strong>: usar <code>yaml.safe_load()</code>.', security_p4: '<code>js-yaml</code> v4 es seguro por defecto.', security_p5: 'Limitar tamano de entrada, validar schema, carga segura obligatoria.',
    h2_comparison: 'Tabla comparativa', comparison_p1: 'Comparacion completa de JSON y YAML:',
    h2_faq: 'Preguntas frecuentes', faq1_q: 'Cual es la diferencia entre JSON y YAML?', faq1_a: 'JSON usa llaves, YAML indentacion. YAML soporta comentarios y cadenas multilinea.', faq2_q: 'Como convertir JSON a YAML online?', faq2_a: 'Pegue su JSON en una herramienta de conversion online.', faq3_q: 'Es YAML mejor que JSON para configuracion?', faq3_a: 'Si, para archivos editados frecuentemente por humanos.', faq4_q: 'Que es el problema de Noruega?', faq4_a: 'YAML 1.1 interpreta NO como false. Solucion: comillas.', faq5_q: 'Por que usar yaml.safe_load()?', faq5_a: 'yaml.load() puede ejecutar codigo arbitrario.', faq6_q: 'Se preservan los comentarios YAML?', faq6_a: 'No. Use ruamel.yaml para preservarlos.', faq7_q: 'Como convertir por CLI?', faq7_a: 'Use yq -o=json file.yaml.', faq8_q: 'Que funcionalidades YAML se pierden?', faq8_a: 'Comentarios, anclas, bloques multilinea, multiples documentos, tipos fecha.',
    conclusion: 'Comprender la relacion entre JSON y YAML es esencial para el desarrollo moderno.',
    link_tool_bottom: 'Convierta JSON y YAML al instante con nuestra herramienta gratuita.',
  },
};

export default function JsonYamlConverterOnlineGuide({ lang }: { lang: string }) {
  const s = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
      { '@type': 'Question', name: s.faq6_q, acceptedAnswer: { '@type': 'Answer', text: s.faq6_a } },
      { '@type': 'Question', name: s.faq7_q, acceptedAnswer: { '@type': 'Answer', text: s.faq7_a } },
      { '@type': 'Question', name: s.faq8_q, acceptedAnswer: { '@type': 'Answer', text: s.faq8_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.tldr_title}</strong>
        <p style={{ margin: '8px 0 0 0', lineHeight: 1.7 }}>{s.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 24 }}>
        <strong style={{ fontSize: 16 }}>{s.takeaways_title}</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
          <li>{s.takeaway1}</li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4}</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
        </ul>
      </div>

      <p><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 1: JSON vs YAML Syntax Comparison */}
      <h2>{s.h2_syntax}</h2>
      <p>{s.syntax_p1}</p>
      <p>{s.syntax_p2}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <strong>{s.syntax_json_title}</strong>
          <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`{
  "server": {
    "host": "localhost",
    "port": 8080,
    "ssl": true
  },
  "database": {
    "name": "myapp",
    "replicas": [
      "db1.example.com",
      "db2.example.com"
    ]
  },
  "features": [
    "authentication",
    "logging",
    "rate-limiting"
  ]
}`}</code></pre>
        </div>
        <div>
          <strong>{s.syntax_yaml_title}</strong>
          <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Server configuration
server:
  host: localhost
  port: 8080
  ssl: true

# Database settings
database:
  name: myapp
  replicas:
    - db1.example.com
    - db2.example.com

features:
  - authentication
  - logging
  - rate-limiting`}</code></pre>
        </div>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.syntax_p3 }} />

      {/* Section 2: When to Use JSON vs YAML */}
      <h2>{s.h2_when}</h2>
      <p>{s.when_p1}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: '#f0fdf4', borderRadius: 8, padding: '16px 20px' }}>
          <strong style={{ color: '#166534' }}>{s.when_json_title}</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>{s.when_json1}</li>
            <li>{s.when_json2}</li>
            <li>{s.when_json3}</li>
            <li>{s.when_json4}</li>
            <li>{s.when_json5}</li>
          </ul>
        </div>
        <div style={{ background: '#eff6ff', borderRadius: 8, padding: '16px 20px' }}>
          <strong style={{ color: '#1e40af' }}>{s.when_yaml_title}</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
            <li>{s.when_yaml1}</li>
            <li>{s.when_yaml2}</li>
            <li>{s.when_yaml3}</li>
            <li>{s.when_yaml4}</li>
            <li>{s.when_yaml5}</li>
          </ul>
        </div>
      </div>

      {/* Section 3: YAML Anchors, Aliases, Multi-line Strings */}
      <h2>{s.h2_anchors}</h2>
      <p>{s.anchors_p1}</p>

      <h3>{s.h3_anchors}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.anchors_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Define reusable defaults with an anchor
defaults: &default_db
  adapter: postgres
  host: localhost
  port: 5432
  pool_size: 10

# Reference with alias and override specific fields
development:
  database:
    <<: *default_db          # Merge all defaults
    database: myapp_dev
    pool_size: 5             # Override pool_size

staging:
  database:
    <<: *default_db
    database: myapp_staging
    host: staging-db.internal

production:
  database:
    <<: *default_db
    database: myapp_prod
    host: prod-db.internal
    pool_size: 25

# After JSON conversion (anchors fully expanded):
# {
#   "defaults": { "adapter": "postgres", "host": "localhost", "port": 5432, "pool_size": 10 },
#   "development": {
#     "database": { "adapter": "postgres", "host": "localhost", "port": 5432, "pool_size": 5, "database": "myapp_dev" }
#   },
#   ...
# }`}</code></pre>

      <h3>{s.h3_multiline}</h3>
      <p>{s.multiline_p1}</p>
      <p dangerouslySetInnerHTML={{ __html: s.multiline_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.multiline_p3 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Literal block (|) - preserves newlines exactly
script: |
  #!/bin/bash
  echo "Starting deployment..."
  docker compose pull
  docker compose up -d
  echo "Done!"

# Folded block (>) - joins lines with spaces
description: >
  This is a long description
  that spans multiple lines.
  Each newline becomes a space
  in the resulting string.

# Strip trailing newline with |-
sql_query: |-
  SELECT users.name, orders.total
  FROM users
  JOIN orders ON users.id = orders.user_id
  WHERE orders.created_at > '2024-01-01'

# Keep all trailing newlines with |+
message: |+
  Line 1
  Line 2

  (trailing newlines preserved)


# JSON equivalents:
# "script": "#!/bin/bash\\necho \\"Starting...\\n..."
# "description": "This is a long description that spans..."
# "sql_query": "SELECT users.name..."  (no trailing \\n)`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.multiline_p4 }} />

      {/* Section 4: JavaScript conversion */}
      <h2>{s.h2_js}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.js_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// npm install js-yaml
const yaml = require('js-yaml');
const fs = require('fs');

// ===== JSON to YAML =====
const jsonData = {
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: { name: 'web-app', labels: { app: 'web' } },
  spec: {
    replicas: 3,
    selector: { matchLabels: { app: 'web' } },
    template: {
      spec: {
        containers: [{
          name: 'app',
          image: 'nginx:1.25',
          ports: [{ containerPort: 80 }]
        }]
      }
    }
  }
};

const yamlOutput = yaml.dump(jsonData, {
  indent: 2,
  lineWidth: 120,
  noRefs: true,       // Don't use YAML anchors
  sortKeys: false,     // Preserve key order
  quotingType: '"',    // Use double quotes
});
console.log(yamlOutput);

// ===== YAML to JSON =====
const yamlString = fs.readFileSync('config.yaml', 'utf8');
const parsed = yaml.load(yamlString);
const jsonString = JSON.stringify(parsed, null, 2);
fs.writeFileSync('config.json', jsonString);

// ===== Handle multi-document YAML =====
const multiDoc = \`
---
name: service-a
port: 3000
---
name: service-b
port: 3001
\`;
const docs = [];
yaml.loadAll(multiDoc, (doc) => docs.push(doc));
console.log(JSON.stringify(docs, null, 2));
// [{ "name": "service-a", "port": 3000 }, { "name": "service-b", "port": 3001 }]`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.js_p2 }} />

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 5: Python conversion */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.python_p1 }} />

      <h3>{s.h3_pyyaml}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# pip install pyyaml
import yaml
import json

# ===== YAML to JSON =====
yaml_text = """
server:
  host: localhost
  port: 8080
  features:
    - auth
    - logging
  database:
    name: myapp
    ssl: true
"""

# ALWAYS use safe_load (never yaml.load with untrusted input)
data = yaml.safe_load(yaml_text)
json_output = json.dumps(data, indent=2, ensure_ascii=False)
print(json_output)

# ===== JSON to YAML =====
json_text = '{"name": "app", "version": "2.0", "debug": false}'
data = json.loads(json_text)
yaml_output = yaml.dump(data, default_flow_style=False, allow_unicode=True, sort_keys=False)
print(yaml_output)

# ===== File conversion =====
with open('config.yaml', 'r') as yf:
    config = yaml.safe_load(yf)

with open('config.json', 'w') as jf:
    json.dump(config, jf, indent=2, ensure_ascii=False)

# ===== Multi-document YAML =====
multi_yaml = """
---
name: doc1
value: 100
---
name: doc2
value: 200
"""
docs = list(yaml.safe_load_all(multi_yaml))
print(json.dumps(docs, indent=2))`}</code></pre>

      <h3>{s.h3_ruamel}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.ruamel_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# pip install ruamel.yaml
from ruamel.yaml import YAML
from io import StringIO
import json

yaml_handler = YAML()
yaml_handler.preserve_quotes = True

# Load YAML with comments preserved
yaml_text = """
# Application configuration
app:
  name: my-service    # Service name
  port: 3000          # Listen port
  debug: false
"""

data = yaml_handler.load(yaml_text)

# Modify a value
data['app']['port'] = 8080

# Write back - comments are preserved!
output = StringIO()
yaml_handler.dump(data, output)
print(output.getvalue())
# Output still has "# Application configuration" and inline comments

# Convert to JSON (comments lost in JSON, but preserved in YAML round-trip)
json_output = json.dumps(dict(data), indent=2, default=str)
print(json_output)`}</code></pre>

      {/* Section 6: Command Line */}
      <h2>{s.h2_cli}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.cli_p1 }} />

      <h3>{s.h3_yq}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.yq_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Install yq (Mike Farah version)
# macOS: brew install yq
# Linux: snap install yq  OR  wget from GitHub releases
# Windows: choco install yq

# ===== YAML to JSON =====
yq -o=json config.yaml
yq -o=json '.' config.yaml > config.json

# ===== JSON to YAML =====
yq -o=yaml config.json
yq -o=yaml -P '.' config.json > config.yaml  # -P for pretty print

# ===== Query and filter =====
yq '.server.port' config.yaml              # Extract a value
yq '.spec.containers[0].image' deploy.yaml # Array access
yq '.metadata.labels' deploy.yaml          # Get nested object

# ===== Modify in-place =====
yq -i '.server.port = 9090' config.yaml
yq -i '.spec.replicas = 5' deploy.yaml

# ===== Merge multiple files =====
yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1)' base.yaml override.yaml

# ===== Convert multi-document YAML to JSON array =====
yq -o=json -s '.' multi-doc.yaml`}</code></pre>

      <h3>{s.h3_jq}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jq_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Pipe yq output through jq for advanced JSON processing
yq -o=json config.yaml | jq '.server'
yq -o=json deploy.yaml | jq '.spec.template.spec.containers[] | .name'

# Use jq to transform JSON, then convert to YAML
cat data.json | jq '{filtered: .items | map(select(.active))}' | yq -o=yaml -P`}</code></pre>

      <h3>{s.h3_oneliners}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Python one-liner: YAML to JSON
python3 -c 'import sys,yaml,json; json.dump(yaml.safe_load(sys.stdin),sys.stdout,indent=2)' < config.yaml

# Python one-liner: JSON to YAML
python3 -c 'import sys,yaml,json; print(yaml.dump(json.load(sys.stdin),default_flow_style=False))' < config.json

# Ruby one-liner: YAML to JSON
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.safe_load(STDIN.read))' < config.yaml`}</code></pre>

      {/* Section 7: Kubernetes Manifests */}
      <h2>{s.h2_k8s}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.k8s_p1 }} />
      <p>{s.k8s_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-application
  namespace: production
  labels:
    app: web
    version: "2.0"         # Quoted to prevent float interpretation
    environment: production
  annotations:
    description: >-        # Folded block, strip trailing newline
      Production web application deployment
      with auto-scaling and health checks
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: myregistry/web-app:2.0.1
          ports:
            - containerPort: 8080
              protocol: TCP
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: db-credentials
                  key: url
            - name: LOG_LEVEL
              value: "info"        # Quoted to ensure string
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
---
# Multiple resources in one file
apiVersion: v1
kind: Service
metadata:
  name: web-service
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP`}</code></pre>
      <p>{s.k8s_p3}</p>

      {/* Section 8: Docker Compose and CI/CD */}
      <h2>{s.h2_docker}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.docker_p1 }} />

      <h3>{s.h3_compose}</h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# docker-compose.yml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./uploads:/app/uploads
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

volumes:
  postgres_data:`}</code></pre>

      <h3>{s.h3_gha}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.gha_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
        run: |
          echo "Deploying to production..."
          ./scripts/deploy.sh`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 9: YAML Gotchas */}
      <h2>{s.h2_gotchas}</h2>
      <p>{s.gotchas_p1}</p>

      <h3>{s.h3_norway}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.norway_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# YAML 1.1 boolean coercion (PyYAML, many other parsers)
# These ALL become booleans when unquoted:

countries:
  - US       # String "US" (ok)
  - GB       # String "GB" (ok)
  - NO       # BECOMES: false  (Norway disappears!)
  - FR       # String "FR" (ok)

settings:
  verbose: yes    # BECOMES: true  (not the string "yes")
  debug: no       # BECOMES: false
  feature: on     # BECOMES: true
  legacy: off     # BECOMES: false
  confirm: y      # BECOMES: true
  cancel: n       # BECOMES: false

# FIX: Always quote ambiguous values
countries:
  - "US"
  - "GB"
  - "NO"     # Now correctly a string
  - "FR"

settings:
  verbose: "yes"  # String "yes"
  debug: "no"     # String "no"`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.norway_p2 }} />

      <h3>{s.h3_indent}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.indent_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# .editorconfig - enforce consistent YAML formatting
[*.{yml,yaml}]
indent_style = space
indent_size = 2
tab_width = 2
insert_final_newline = true
trim_trailing_whitespace = true

# .yamllint.yml - lint configuration
---
extends: default
rules:
  indentation:
    spaces: 2
    indent-sequences: true
  truthy:
    check-keys: true
    allowed-values: ["true", "false"]
  line-length:
    max: 120`}</code></pre>

      <h3>{s.h3_booleans}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.booleans_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# More unexpected type coercions in YAML:

version: 1.0        # BECOMES: float 1.0 (not string "1.0")
version: "1.0"      # String "1.0" (correct)

octal: 0o17         # BECOMES: integer 15
hex: 0xFF           # BECOMES: integer 255

date: 2024-01-15    # BECOMES: date object (in some parsers)
date: "2024-01-15"  # String "2024-01-15" (correct)

null_trap: null      # BECOMES: null (not string "null")
null_trap: ~         # ALSO BECOMES: null
null_trap: ""        # Empty string (if you want empty, not null)

# Special float values
infinity: .inf       # BECOMES: Infinity
not_a_number: .nan   # BECOMES: NaN

# Rule of thumb: if it's not obviously a string, quote it`}</code></pre>

      {/* Section 10: YAML Security */}
      <h2>{s.h2_security}</h2>
      <p>{s.security_p1}</p>
      <p dangerouslySetInnerHTML={{ __html: s.security_p2 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# DANGEROUS - Never do this with untrusted YAML input!
import yaml

# This YAML payload can execute arbitrary commands:
malicious_yaml = """
!!python/object/apply:os.system
  args: ['echo HACKED > /tmp/pwned']
"""

# BAD: yaml.load() with FullLoader allows object construction
# data = yaml.load(malicious_yaml, Loader=yaml.FullLoader)  # DANGER!

# GOOD: safe_load() only allows basic types
data = yaml.safe_load(malicious_yaml)  # Raises ConstructorError

# ALSO GOOD: ruamel.yaml with safe type
from ruamel.yaml import YAML
safe_yaml = YAML(typ='safe')
data = safe_yaml.load(malicious_yaml)  # Raises error`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.security_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.security_p4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.security_p5 }} />

      {/* Section 11: Feature Comparison Table */}
      <h2>{s.h2_comparison}</h2>
      <p>{s.comparison_p1}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>JSON</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>YAML</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Syntax', 'Braces {} and brackets []', 'Indentation-based'],
              ['Comments', 'Not supported', 'Supported with #'],
              ['String Quoting', 'Required (double quotes)', 'Optional for most strings'],
              ['Multi-line Strings', 'Escape with \\n', 'Block scalars: | and >'],
              ['Anchors / Aliases', 'Not supported', 'Supported with & and *'],
              ['Multiple Documents', 'One per file', 'Yes, separated by ---'],
              ['Data Types', 'String, Number, Boolean, null, Array, Object', 'All JSON types + dates, binary, custom tags'],
              ['Parsing Speed', 'Fast (simple grammar)', 'Slower (indentation-sensitive)'],
              ['File Size', 'Larger (quotes, braces)', 'Smaller (minimal punctuation)'],
              ['Tooling', 'Universal (every language)', 'Good (PyYAML, js-yaml, yq)'],
              ['Primary Use', 'APIs, data exchange', 'Configuration files'],
              ['Superset Relation', 'Base format', 'Superset of JSON'],
            ].map(([feature, jsonVal, yamlVal], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{feature}</td>
                <td style={{ padding: '8px 12px' }}>{jsonVal}</td>
                <td style={{ padding: '8px 12px' }}>{yamlVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 12: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>
      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>
      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>
      <h3>{s.faq6_q}</h3>
      <p>{s.faq6_a}</p>
      <h3>{s.faq7_q}</h3>
      <p>{s.faq7_a}</p>
      <h3>{s.faq8_q}</h3>
      <p>{s.faq8_a}</p>

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/json-yaml`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool_bottom} &rarr;</Link></p>
    </>
  );
}
