import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>JSON formatter</strong> and <strong>JSON validator</strong> tools are essential for every developer working with APIs, configuration files, and data interchange. Whether you need to <strong>format JSON</strong> for readability, <strong>validate JSON online</strong> to catch syntax errors, or <strong>pretty print JSON</strong> for debugging, this comprehensive guide covers everything you need to know. JSON (JavaScript Object Notation) has become the universal language of web data, and mastering how to format, validate, and debug it is a fundamental skill. Our free <strong>json formatter online</strong> tool handles formatting, validation, minification, and syntax error detection instantly in your browser.',
    linkTool: 'Try our free JSON Formatter & Validator tool instantly.',

    h2_whatIsJson: 'What Is JSON?',
    whatIsJsonDesc1: 'JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that is easy for humans to read and write, and easy for machines to parse and generate. Originally derived from JavaScript, JSON is now language-independent and supported by virtually every programming language. It has become the de facto standard for data exchange in web APIs, configuration files, and NoSQL databases.',
    whatIsJsonDesc2: 'A JSON document consists of two primary structures: <strong>objects</strong> (unordered collections of key-value pairs wrapped in curly braces <code>{}</code>) and <strong>arrays</strong> (ordered lists of values wrapped in square brackets <code>[]</code>). Values can be strings (in double quotes), numbers, booleans (<code>true</code>/<code>false</code>), <code>null</code>, objects, or arrays. This simplicity is what makes JSON so versatile and widely adopted.',
    whatIsJsonDesc3: 'JSON is defined by two standards: <strong>RFC 8259</strong> (the IETF specification) and <strong>ECMA-404</strong> (the ECMA International specification). The official media type is <code>application/json</code>, and the file extension is <code>.json</code>. Unlike XML, JSON has no built-in support for comments, namespaces, or attributes, which keeps the format minimal and parsing fast.',

    h2_whyNeedFormatter: 'Why You Need a JSON Formatter',
    whyNeedFormatterDesc1: '<strong>Readability</strong>: Raw JSON from APIs and databases is often a single long line with no whitespace. A <strong>JSON formatter</strong> (also called a <strong>JSON beautifier</strong> or <strong>pretty print JSON</strong> tool) adds proper indentation and line breaks so you can visually parse nested structures. This makes it dramatically easier to understand complex data responses from REST APIs.',
    whyNeedFormatterDesc2: '<strong>Debugging</strong>: When something goes wrong with an API response or a configuration file, the first step is often to <strong>format JSON</strong> and inspect the structure. A <strong>JSON validator</strong> identifies the exact location of syntax errors, helping you pinpoint missing commas, mismatched brackets, or invalid values in seconds rather than minutes of manual inspection.',
    whyNeedFormatterDesc3: '<strong>Validation</strong>: Before deploying configuration files, sending API payloads, or storing data, you should always <strong>validate JSON online</strong> to ensure it conforms to the specification. Invalid JSON can cause silent failures in applications, corrupt data pipelines, and trigger hard-to-debug production issues. A <strong>json lint</strong> tool catches these problems before they reach production.',
    whyNeedFormatterDesc4: '<strong>Minification</strong>: When transmitting JSON over the network, you want to <strong>minify JSON</strong> by removing all unnecessary whitespace. This reduces payload sizes, speeds up API responses, and decreases bandwidth costs. Our tool lets you switch between formatted and minified output with a single click.',

    h2_commonErrors: 'Common JSON Syntax Errors',
    commonErrorsDesc: 'A <strong>JSON syntax error</strong> can break your entire application. Here are the most frequent mistakes developers make and how to fix them:',
    commonError1: '<strong>Trailing commas</strong>: JSON does not allow a comma after the last item in an object or array. <code>{"a": 1, "b": 2,}</code> is invalid. Remove the trailing comma: <code>{"a": 1, "b": 2}</code>. This is the single most common <strong>json syntax error</strong> because many programming languages do allow trailing commas.',
    commonError2: '<strong>Single quotes instead of double quotes</strong>: JSON requires double quotes for all strings and keys. <code>{\'name\': \'John\'}</code> is invalid. Use double quotes: <code>{"name": "John"}</code>. This mistake is common when copying data from Python dictionaries or JavaScript objects.',
    commonError3: '<strong>Unquoted keys</strong>: Every key in a JSON object must be a double-quoted string. <code>{name: "John"}</code> is invalid. Correct form: <code>{"name": "John"}</code>. JavaScript allows unquoted keys, but JSON does not.',
    commonError4: '<strong>Comments in JSON</strong>: Standard JSON does not support comments. <code>{"name": "John" /* comment */}</code> is invalid. If you need comments, consider using JSONC (JSON with Comments) supported by VS Code, or move to YAML or TOML for configuration files.',
    commonError5: '<strong>Using undefined or NaN</strong>: JSON only supports <code>null</code>, not <code>undefined</code>, <code>NaN</code>, or <code>Infinity</code>. These JavaScript-specific values must be converted before serialization. Use <code>null</code> as a replacement for undefined values.',
    commonError6: '<strong>Missing or extra brackets/braces</strong>: Every opening <code>{</code> or <code>[</code> must have a matching closing <code>}</code> or <code>]</code>. Deeply nested structures make this error easy to introduce. A <strong>json validator</strong> highlights exactly which bracket is unmatched.',
    commonError7: '<strong>Invalid escape sequences</strong>: JSON strings support specific escape sequences: <code>\\\"</code>, <code>\\\\</code>, <code>\\/</code>, <code>\\b</code>, <code>\\f</code>, <code>\\n</code>, <code>\\r</code>, <code>\\t</code>, and <code>\\uXXXX</code>. Using other backslash sequences like <code>\\a</code> or <code>\\x41</code> is a <strong>json syntax error</strong>.',

    h2_howToFormat: 'How to Format JSON',
    howToFormatDesc: 'There are several ways to <strong>format JSON</strong> depending on your workflow. Here are the most popular methods:',
    howToFormatMethod1: '<strong>Online JSON formatter</strong>: The fastest way to <strong>format JSON online</strong> is to paste your data into our free <strong>JSON formatter</strong> tool. It instantly validates, formats, and highlights syntax errors with line numbers. No installation required, works entirely in your browser.',
    howToFormatMethod2: '<strong>Command line with jq</strong>: <code>jq</code> is the most powerful command-line JSON processor. Install it via <code>brew install jq</code> (macOS), <code>apt install jq</code> (Ubuntu), or <code>choco install jq</code> (Windows). Then use <code>echo \'{"a":1}\' | jq .</code> to <strong>pretty print JSON</strong> in the terminal.',
    howToFormatMethod3: '<strong>Python built-in module</strong>: Python ships with a JSON formatter: <code>python -m json.tool file.json</code>. You can also pipe data: <code>echo \'{"a":1}\' | python -m json.tool</code>. For more control, use <code>json.dumps(data, indent=2)</code> in your Python scripts.',
    howToFormatMethod4: '<strong>IDE extensions</strong>: VS Code has built-in JSON formatting (Shift+Alt+F / Shift+Option+F). JetBrains IDEs (IntelliJ, WebStorm) offer Code > Reformat Code (Ctrl+Alt+L). Vim users can use <code>:%!jq .</code> or <code>:%!python -m json.tool</code>.',
    howToFormatMethod5: '<strong>Browser DevTools</strong>: Chrome, Firefox, and Edge DevTools automatically format JSON responses in the Network tab preview. You can also type <code>JSON.stringify(obj, null, 2)</code> in the console to <strong>pretty print JSON</strong> any JavaScript object.',

    h2_validationRules: 'JSON Validation Rules',
    validationRulesDesc: 'To properly <strong>validate JSON</strong>, you need to understand the exact specification. Here are the rules defined by RFC 8259:',
    validationRule1: '<strong>Data types</strong>: JSON supports exactly six data types: <code>string</code> (double-quoted Unicode text), <code>number</code> (integer or floating point, no leading zeros, no hex/octal), <code>boolean</code> (<code>true</code> or <code>false</code>, lowercase only), <code>null</code> (lowercase only), <code>object</code> (unordered key-value pairs), and <code>array</code> (ordered list of values).',
    validationRule2: '<strong>Strings</strong>: Must be enclosed in double quotes. May contain any Unicode character except unescaped control characters (U+0000 through U+001F). Backslash escapes are: <code>\\\"</code> <code>\\\\</code> <code>\\/</code> <code>\\b</code> <code>\\f</code> <code>\\n</code> <code>\\r</code> <code>\\t</code> <code>\\uXXXX</code>.',
    validationRule3: '<strong>Numbers</strong>: May be integer or floating point. Scientific notation is allowed (<code>1.5e10</code>). Leading zeros are not allowed (<code>01</code> is invalid). <code>NaN</code>, <code>Infinity</code>, and <code>-Infinity</code> are not valid JSON numbers. Hex (<code>0xFF</code>) and octal (<code>0o77</code>) are also invalid.',
    validationRule4: '<strong>Objects</strong>: Keys must be unique strings (though parsers may handle duplicates differently). The order of key-value pairs is not guaranteed. Empty objects <code>{}</code> are valid.',
    validationRule5: '<strong>Arrays</strong>: Elements can be of mixed types. Empty arrays <code>[]</code> are valid. Arrays can be nested to arbitrary depth.',
    validationRule6: '<strong>Encoding</strong>: JSON text must be encoded in UTF-8, UTF-16, or UTF-32, with UTF-8 being the default and most widely used. A Byte Order Mark (BOM) should not be included but some parsers tolerate it.',
    validationRule7: '<strong>Top-level value</strong>: RFC 8259 allows any JSON value (string, number, boolean, null, object, or array) as the top-level element. Older RFC 4627 required only objects or arrays at the top level.',

    h2_codeExamples: 'Code Examples: Format and Validate JSON',
    codeJsTitle: 'JavaScript: Format and Validate JSON',
    codeJsDesc: 'JavaScript provides built-in <code>JSON.parse()</code> and <code>JSON.stringify()</code> methods for JSON validation and formatting. Use <code>JSON.stringify(data, null, 2)</code> to <strong>pretty print JSON</strong> with 2-space indentation:',
    codePyTitle: 'Python: Format and Validate JSON',
    codePyDesc: 'Python\'s built-in <code>json</code> module provides <code>json.dumps()</code> with an <code>indent</code> parameter for formatting, and <code>json.loads()</code> for validation. You can also use <code>python -m json.tool</code> from the command line:',
    codeCliTitle: 'Command Line: jq, python, and node',
    codeCliDesc: 'The command line offers several ways to <strong>format JSON</strong> and <strong>validate JSON</strong>. Here are the most common tools:',
    codeCurlTitle: 'curl + jq Pipeline',
    codeCurlDesc: 'A common workflow is fetching JSON from an API and formatting it instantly using curl piped to jq:',

    h2_bestPractices: 'JSON Best Practices',
    bestPracticesDesc: 'Follow these best practices to write clean, maintainable, and performant JSON:',
    bestPractice1: '<strong>Use camelCase for keys</strong>: Most JSON APIs and JavaScript conventions use camelCase (<code>firstName</code>, <code>lastName</code>, <code>phoneNumber</code>). Be consistent across your entire API. Some APIs use snake_case (<code>first_name</code>), which is common in Python and Ruby ecosystems. Whatever convention you choose, stick with it throughout your project.',
    bestPractice2: '<strong>Keep nesting shallow</strong>: Deeply nested JSON (more than 3-4 levels) becomes hard to read and parse. If your JSON structure is deeply nested, consider flattening it or splitting it into multiple endpoints. Deep nesting also increases memory usage during parsing and can cause stack overflows in recursive parsers.',
    bestPractice3: '<strong>Handle large files carefully</strong>: For JSON files larger than a few megabytes, avoid loading the entire file into memory. Use streaming parsers like <code>ijson</code> (Python), <code>JSONStream</code> (Node.js), or <code>jq --stream</code> (command line). When you need to <strong>minify JSON</strong> large files, streaming tools prevent out-of-memory errors.',
    bestPractice4: '<strong>Use JSON Schema for validation</strong>: For production applications, validate JSON payloads against a JSON Schema definition. Libraries like <code>ajv</code> (JavaScript), <code>jsonschema</code> (Python), and <code>json-schema-validator</code> (Java) provide robust schema validation with detailed error messages.',
    bestPractice5: '<strong>Avoid storing binary data</strong>: JSON is a text format. If you need to include binary data (images, files), either use Base64 encoding (which increases size by 33%) or store binary data separately and reference it with URLs in your JSON.',
    bestPractice6: '<strong>Use consistent null handling</strong>: Decide whether to omit keys with null values or include them explicitly. Both approaches are valid, but mixing them creates inconsistent APIs. Document your choice and apply it consistently.',

    h2_comparison: 'JSON vs Alternatives: YAML, TOML, XML',
    comparisonDesc: 'JSON is not the only data serialization format. Here is a quick comparison with the most popular alternatives:',
    comparisonNote: 'Choose JSON for APIs and data interchange where universal parser support is critical. Use YAML for human-edited configuration files where comments and readability matter. Use TOML for simple configuration files (like <code>pyproject.toml</code> or <code>Cargo.toml</code>). Use XML only when required by existing standards (SOAP, RSS, SVG).',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I format JSON online?',
    faq1_a: 'To format JSON online, paste your raw JSON into a JSON formatter tool like ours. The tool will automatically validate the syntax, add proper indentation and line breaks, and highlight any errors with line numbers. You can choose between 2-space or 4-space indentation, and switch between formatted (pretty-printed) and minified output. Our tool runs entirely in your browser, so your data never leaves your computer.',
    faq2_q: 'What are common JSON syntax errors?',
    faq2_a: 'The most common JSON syntax errors are: trailing commas after the last item in an object or array, using single quotes instead of double quotes, unquoted object keys, adding comments (JSON does not support comments), using undefined or NaN values, mismatched or missing brackets and braces, and invalid escape sequences in strings. A JSON validator tool will identify the exact line and character position of each error.',
    faq3_q: 'What is the difference between JSON and YAML?',
    faq3_a: 'JSON uses curly braces, square brackets, and double quotes for structure, while YAML uses indentation and minimal punctuation. YAML supports comments, multi-line strings, and anchors/aliases for data reuse; JSON does not. JSON is better for machine-to-machine data exchange (APIs, databases) because every parser produces identical output. YAML is better for human-edited configuration files because it is more readable. JSON is a strict subset of YAML, meaning every valid JSON document is also valid YAML.',

    conclusion: 'Mastering <strong>JSON formatting</strong> and <strong>JSON validation</strong> is an essential skill for modern developers. Whether you are debugging API responses, writing configuration files, or building data pipelines, understanding how to <strong>format JSON</strong>, <strong>validate JSON</strong>, and avoid common <strong>JSON syntax errors</strong> will save you countless hours. Bookmark this guide for quick reference, and use our free tool for instant formatting and validation.',
    linkToolBottom: 'Format, validate, and minify JSON instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>JSON 格式化工具</strong>和 <strong>JSON 验证器</strong>是每个处理 API、配置文件和数据交换的开发者的必备工具。无论你需要格式化 JSON 以提高可读性、在线验证 JSON 以捕获语法错误，还是美化打印 JSON 进行调试，本综合指南涵盖了你需要了解的一切。JSON（JavaScript 对象表示法）已成为 Web 数据的通用语言，掌握如何格式化、验证和调试 JSON 是一项基本技能。我们的免费在线 JSON 格式化工具可在浏览器中即时处理格式化、验证、压缩和语法错误检测。',
    linkTool: '立即试用我们的免费 JSON 格式化和验证工具。',

    h2_whatIsJson: '什么是 JSON？',
    whatIsJsonDesc1: 'JSON（JavaScript Object Notation）是一种轻量级、基于文本的数据交换格式，人类易于读写，机器易于解析和生成。JSON 最初源自 JavaScript，但现在是语言无关的，几乎每种编程语言都支持它。它已成为 Web API、配置文件和 NoSQL 数据库中数据交换的事实标准。',
    whatIsJsonDesc2: 'JSON 文档由两种主要结构组成：<strong>对象</strong>（用花括号 <code>{}</code> 包裹的无序键值对集合）和<strong>数组</strong>（用方括号 <code>[]</code> 包裹的有序值列表）。值可以是字符串（双引号）、数字、布尔值（<code>true</code>/<code>false</code>）、<code>null</code>、对象或数组。这种简洁性使 JSON 如此通用和广泛采用。',
    whatIsJsonDesc3: 'JSON 由两个标准定义：<strong>RFC 8259</strong>（IETF 规范）和 <strong>ECMA-404</strong>（ECMA International 规范）。官方媒体类型是 <code>application/json</code>，文件扩展名是 <code>.json</code>。与 XML 不同，JSON 不支持注释、命名空间或属性，这使格式保持最小化且解析快速。',

    h2_whyNeedFormatter: '为什么需要 JSON 格式化工具',
    whyNeedFormatterDesc1: '<strong>可读性</strong>：来自 API 和数据库的原始 JSON 通常是没有空格的一长行。JSON 格式化工具（也称为 JSON 美化器）添加适当的缩进和换行，让你可以直观地解析嵌套结构。',
    whyNeedFormatterDesc2: '<strong>调试</strong>：当 API 响应或配置文件出现问题时，第一步通常是格式化 JSON 并检查结构。JSON 验证器可以识别语法错误的确切位置，帮助你在几秒钟内定位问题。',
    whyNeedFormatterDesc3: '<strong>验证</strong>：在部署配置文件、发送 API 负载或存储数据之前，应始终验证 JSON 以确保符合规范。无效的 JSON 可能导致应用程序静默失败和难以调试的生产问题。',
    whyNeedFormatterDesc4: '<strong>压缩</strong>：通过网络传输 JSON 时，你需要压缩 JSON，移除所有不必要的空格。这可以减小负载大小、加快 API 响应速度并降低带宽成本。',

    h2_commonErrors: '常见 JSON 语法错误',
    commonErrorsDesc: 'JSON 语法错误可能破坏整个应用程序。以下是开发者最常犯的错误：',
    commonError1: '<strong>尾部逗号</strong>：JSON 不允许在对象或数组的最后一项后面有逗号。<code>{"a": 1, "b": 2,}</code> 是无效的。',
    commonError2: '<strong>使用单引号</strong>：JSON 要求所有字符串和键使用双引号。<code>{\'name\': \'John\'}</code> 是无效的。',
    commonError3: '<strong>未加引号的键</strong>：JSON 对象中的每个键必须是双引号字符串。<code>{name: "John"}</code> 是无效的。',
    commonError4: '<strong>JSON 中的注释</strong>：标准 JSON 不支持注释。如果需要注释，考虑使用 JSONC、YAML 或 TOML。',
    commonError5: '<strong>使用 undefined 或 NaN</strong>：JSON 只支持 <code>null</code>，不支持 <code>undefined</code>、<code>NaN</code> 或 <code>Infinity</code>。',
    commonError6: '<strong>括号不匹配</strong>：每个 <code>{</code> 或 <code>[</code> 都必须有对应的 <code>}</code> 或 <code>]</code>。JSON 验证器可以精确指出不匹配的括号。',
    commonError7: '<strong>无效转义序列</strong>：JSON 字符串支持特定转义序列：<code>\\\"</code>、<code>\\\\</code>、<code>\\/</code>、<code>\\b</code>、<code>\\f</code>、<code>\\n</code>、<code>\\r</code>、<code>\\t</code> 和 <code>\\uXXXX</code>。',

    h2_howToFormat: '如何格式化 JSON',
    howToFormatDesc: '根据你的工作流程，有多种方法可以格式化 JSON：',
    howToFormatMethod1: '<strong>在线 JSON 格式化</strong>：最快的方法是将数据粘贴到我们的免费 JSON 格式化工具中。它会即时验证、格式化并高亮显示语法错误。',
    howToFormatMethod2: '<strong>命令行 jq</strong>：<code>jq</code> 是最强大的命令行 JSON 处理器。使用 <code>echo \'{"a":1}\' | jq .</code> 在终端中美化打印 JSON。',
    howToFormatMethod3: '<strong>Python 内置模块</strong>：Python 自带 JSON 格式化工具：<code>python -m json.tool file.json</code>。',
    howToFormatMethod4: '<strong>IDE 扩展</strong>：VS Code 内置 JSON 格式化（Shift+Alt+F）。JetBrains IDE 提供代码重格式化（Ctrl+Alt+L）。',
    howToFormatMethod5: '<strong>浏览器开发工具</strong>：Chrome、Firefox 和 Edge 的开发工具自动格式化网络选项卡中的 JSON 响应。也可以在控制台中使用 <code>JSON.stringify(obj, null, 2)</code>。',

    h2_validationRules: 'JSON 验证规则',
    validationRulesDesc: '要正确验证 JSON，需要理解 RFC 8259 定义的确切规范：',
    validationRule1: '<strong>数据类型</strong>：JSON 支持六种数据类型：<code>string</code>（双引号 Unicode 文本）、<code>number</code>（整数或浮点数）、<code>boolean</code>（<code>true</code> 或 <code>false</code>）、<code>null</code>、<code>object</code> 和 <code>array</code>。',
    validationRule2: '<strong>字符串</strong>：必须用双引号括起来。可以包含除未转义控制字符外的任何 Unicode 字符。',
    validationRule3: '<strong>数字</strong>：可以是整数或浮点数。允许科学记数法。不允许前导零、NaN、Infinity、十六进制和八进制。',
    validationRule4: '<strong>对象</strong>：键必须是唯一字符串。键值对的顺序不保证。空对象 <code>{}</code> 有效。',
    validationRule5: '<strong>数组</strong>：元素可以是混合类型。空数组 <code>[]</code> 有效。数组可以嵌套到任意深度。',
    validationRule6: '<strong>编码</strong>：JSON 文本必须使用 UTF-8、UTF-16 或 UTF-32 编码，UTF-8 是默认且最广泛使用的。',
    validationRule7: '<strong>顶层值</strong>：RFC 8259 允许任何 JSON 值作为顶层元素。旧版 RFC 4627 只允许对象或数组。',

    h2_codeExamples: '代码示例：格式化和验证 JSON',
    codeJsTitle: 'JavaScript：格式化和验证 JSON',
    codeJsDesc: 'JavaScript 提供内置的 <code>JSON.parse()</code> 和 <code>JSON.stringify()</code> 方法。使用 <code>JSON.stringify(data, null, 2)</code> 进行 2 空格缩进的美化打印：',
    codePyTitle: 'Python：格式化和验证 JSON',
    codePyDesc: 'Python 内置 <code>json</code> 模块提供 <code>json.dumps()</code>（带 <code>indent</code> 参数）和 <code>json.loads()</code> 进行格式化和验证：',
    codeCliTitle: '命令行：jq、python 和 node',
    codeCliDesc: '命令行提供多种格式化和验证 JSON 的方式：',
    codeCurlTitle: 'curl + jq 管道',
    codeCurlDesc: '常见工作流是从 API 获取 JSON 并使用 curl 管道到 jq 进行即时格式化：',

    h2_bestPractices: 'JSON 最佳实践',
    bestPracticesDesc: '遵循这些最佳实践编写干净、可维护和高性能的 JSON：',
    bestPractice1: '<strong>键名使用 camelCase</strong>：大多数 JSON API 和 JavaScript 约定使用 camelCase。在整个 API 中保持一致。',
    bestPractice2: '<strong>保持嵌套浅层</strong>：深度嵌套的 JSON（超过 3-4 层）难以阅读和解析。考虑扁平化或拆分为多个端点。',
    bestPractice3: '<strong>谨慎处理大文件</strong>：对于大于几 MB 的 JSON 文件，使用流式解析器如 <code>ijson</code>（Python）、<code>JSONStream</code>（Node.js）。',
    bestPractice4: '<strong>使用 JSON Schema 验证</strong>：在生产环境中，使用 JSON Schema 定义验证 JSON 负载。<code>ajv</code>（JavaScript）和 <code>jsonschema</code>（Python）提供强大的验证。',
    bestPractice5: '<strong>避免存储二进制数据</strong>：JSON 是文本格式。如需包含二进制数据，使用 Base64 编码或单独存储并用 URL 引用。',
    bestPractice6: '<strong>统一 null 处理</strong>：决定是省略 null 值的键还是显式包含它们，并一致应用。',

    h2_comparison: 'JSON 与替代方案：YAML、TOML、XML',
    comparisonDesc: 'JSON 不是唯一的数据序列化格式。以下是与最流行替代方案的快速对比：',
    comparisonNote: 'API 和数据交换选择 JSON；需要注释和可读性的配置文件选择 YAML；简单配置选择 TOML；现有标准（SOAP、RSS、SVG）要求时选择 XML。',

    h2_faq: '常见问题',
    faq1_q: '如何在线格式化 JSON？',
    faq1_a: '将原始 JSON 粘贴到我们的 JSON 格式化工具中，工具会自动验证语法、添加缩进和换行、高亮显示错误。可选择 2 空格或 4 空格缩进，在格式化和压缩输出间切换。工具完全在浏览器中运行，数据不会离开你的电脑。',
    faq2_q: '常见的 JSON 语法错误有哪些？',
    faq2_a: '最常见的 JSON 语法错误包括：尾部逗号、使用单引号代替双引号、未加引号的对象键、添加注释、使用 undefined 或 NaN 值、括号不匹配、无效转义序列。JSON 验证工具会识别每个错误的精确行号和位置。',
    faq3_q: 'JSON 和 YAML 有什么区别？',
    faq3_a: 'JSON 使用花括号、方括号和双引号来构建结构，而 YAML 使用缩进和最少的标点符号。YAML 支持注释、多行字符串和锚点/别名；JSON 不支持。JSON 更适合机器间的数据交换（API、数据库），YAML 更适合人工编辑的配置文件。JSON 是 YAML 的严格子集。',

    conclusion: '掌握 JSON 格式化和验证是现代开发者的必备技能。无论是调试 API 响应、编写配置文件还是构建数据管道，理解如何格式化、验证 JSON 并避免常见语法错误将为你节省大量时间。收藏本指南以备参考，使用我们的免费工具进行即时格式化和验证。',
    linkToolBottom: '使用我们的免费在线工具即时格式化、验证和压缩 JSON。',
  },
  fr: {
    intro: 'Les outils de <strong>formatage JSON</strong> et de <strong>validation JSON</strong> sont essentiels pour tout developpeur travaillant avec des API, des fichiers de configuration et l\'echange de donnees. Que vous ayez besoin de formater du JSON pour la lisibilite, de valider du JSON en ligne pour detecter les erreurs de syntaxe ou de l\'embellir pour le debogage, ce guide complet couvre tout. Notre outil gratuit de formatage JSON en ligne gere le formatage, la validation, la minification et la detection des erreurs de syntaxe instantanement dans votre navigateur.',
    linkTool: 'Essayez notre outil gratuit de formatage et validation JSON.',

    h2_whatIsJson: 'Qu\'est-ce que JSON ?',
    whatIsJsonDesc1: 'JSON (JavaScript Object Notation) est un format d\'echange de donnees leger, base sur le texte, facile a lire et ecrire pour les humains, et facile a analyser et generer pour les machines. Devenu le standard de facto pour l\'echange de donnees dans les API web, les fichiers de configuration et les bases de donnees NoSQL.',
    whatIsJsonDesc2: 'Un document JSON se compose de deux structures : des <strong>objets</strong> (collections de paires cle-valeur entre accolades <code>{}</code>) et des <strong>tableaux</strong> (listes ordonnees de valeurs entre crochets <code>[]</code>). Les valeurs peuvent etre des chaines, des nombres, des booleens, <code>null</code>, des objets ou des tableaux.',
    whatIsJsonDesc3: 'JSON est defini par <strong>RFC 8259</strong> et <strong>ECMA-404</strong>. Le type media est <code>application/json</code> et l\'extension de fichier est <code>.json</code>. Contrairement a XML, JSON ne supporte pas les commentaires, les espaces de noms ou les attributs.',

    h2_whyNeedFormatter: 'Pourquoi utiliser un formateur JSON',
    whyNeedFormatterDesc1: '<strong>Lisibilite</strong> : Le JSON brut des API est souvent une longue ligne sans espaces. Un formateur JSON ajoute une indentation et des sauts de ligne pour faciliter la lecture des structures imbriquees.',
    whyNeedFormatterDesc2: '<strong>Debogage</strong> : Quand une reponse API pose probleme, la premiere etape est de formater le JSON et d\'inspecter la structure. Un validateur JSON identifie l\'emplacement exact des erreurs.',
    whyNeedFormatterDesc3: '<strong>Validation</strong> : Avant de deployer, validez toujours votre JSON pour s\'assurer qu\'il est conforme a la specification. Un JSON invalide peut causer des echecs silencieux.',
    whyNeedFormatterDesc4: '<strong>Minification</strong> : Pour reduire la taille des donnees transmises, la minification JSON supprime tous les espaces inutiles, accelerant les reponses API.',

    h2_commonErrors: 'Erreurs de syntaxe JSON courantes',
    commonErrorsDesc: 'Une erreur de syntaxe JSON peut casser toute votre application. Voici les erreurs les plus frequentes :',
    commonError1: '<strong>Virgules finales</strong> : JSON n\'autorise pas de virgule apres le dernier element. <code>{"a": 1, "b": 2,}</code> est invalide.',
    commonError2: '<strong>Guillemets simples</strong> : JSON exige des guillemets doubles. <code>{\'name\': \'John\'}</code> est invalide.',
    commonError3: '<strong>Cles sans guillemets</strong> : Chaque cle doit etre une chaine entre guillemets doubles. <code>{name: "John"}</code> est invalide.',
    commonError4: '<strong>Commentaires</strong> : Le JSON standard ne supporte pas les commentaires. Utilisez JSONC, YAML ou TOML si vous avez besoin de commentaires.',
    commonError5: '<strong>undefined ou NaN</strong> : JSON ne supporte que <code>null</code>, pas <code>undefined</code>, <code>NaN</code> ou <code>Infinity</code>.',
    commonError6: '<strong>Crochets/accolades manquants</strong> : Chaque <code>{</code> ou <code>[</code> doit avoir son equivalent fermant.',
    commonError7: '<strong>Sequences d\'echappement invalides</strong> : JSON supporte des sequences specifiques : <code>\\\"</code>, <code>\\\\</code>, <code>\\n</code>, <code>\\r</code>, <code>\\t</code>, <code>\\uXXXX</code>.',

    h2_howToFormat: 'Comment formater du JSON',
    howToFormatDesc: 'Plusieurs methodes pour formater du JSON selon votre flux de travail :',
    howToFormatMethod1: '<strong>Formateur JSON en ligne</strong> : Collez vos donnees dans notre outil gratuit pour un formatage et une validation instantanes.',
    howToFormatMethod2: '<strong>Ligne de commande avec jq</strong> : <code>jq</code> est le processeur JSON en ligne de commande le plus puissant.',
    howToFormatMethod3: '<strong>Module Python integre</strong> : <code>python -m json.tool fichier.json</code> formate directement depuis le terminal.',
    howToFormatMethod4: '<strong>Extensions IDE</strong> : VS Code a un formatage JSON integre (Shift+Alt+F). JetBrains propose Ctrl+Alt+L.',
    howToFormatMethod5: '<strong>DevTools du navigateur</strong> : Les DevTools formatent automatiquement les reponses JSON dans l\'onglet Reseau.',

    h2_validationRules: 'Regles de validation JSON',
    validationRulesDesc: 'Pour valider correctement du JSON, voici les regles definies par RFC 8259 :',
    validationRule1: '<strong>Types de donnees</strong> : JSON supporte six types : <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>object</code> et <code>array</code>.',
    validationRule2: '<strong>Chaines</strong> : Doivent etre entre guillemets doubles avec des sequences d\'echappement specifiques.',
    validationRule3: '<strong>Nombres</strong> : Entiers ou decimaux, notation scientifique autorisee, pas de zeros initiaux ni de NaN/Infinity.',
    validationRule4: '<strong>Objets</strong> : Les cles doivent etre des chaines uniques. Les objets vides <code>{}</code> sont valides.',
    validationRule5: '<strong>Tableaux</strong> : Elements de types mixtes autorises. Tableaux vides <code>[]</code> valides. Imbrication arbitraire.',
    validationRule6: '<strong>Encodage</strong> : UTF-8 est l\'encodage par defaut et le plus utilise.',
    validationRule7: '<strong>Valeur de niveau superieur</strong> : RFC 8259 autorise toute valeur JSON au niveau superieur.',

    h2_codeExamples: 'Exemples de code : formater et valider JSON',
    codeJsTitle: 'JavaScript : formater et valider JSON',
    codeJsDesc: 'JavaScript fournit <code>JSON.parse()</code> et <code>JSON.stringify()</code> pour la validation et le formatage :',
    codePyTitle: 'Python : formater et valider JSON',
    codePyDesc: 'Le module <code>json</code> de Python fournit <code>json.dumps()</code> avec le parametre <code>indent</code> :',
    codeCliTitle: 'Ligne de commande : jq, python et node',
    codeCliDesc: 'La ligne de commande offre plusieurs outils pour formater et valider du JSON :',
    codeCurlTitle: 'Pipeline curl + jq',
    codeCurlDesc: 'Un flux de travail courant : recuperer du JSON depuis une API et le formater avec curl pipe vers jq :',

    h2_bestPractices: 'Bonnes pratiques JSON',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour ecrire du JSON propre et performant :',
    bestPractice1: '<strong>camelCase pour les cles</strong> : La plupart des API JSON utilisent camelCase. Soyez coherent dans toute votre API.',
    bestPractice2: '<strong>Imbrication peu profonde</strong> : Un JSON profondement imbrique (plus de 3-4 niveaux) est difficile a lire. Envisagez l\'aplatissement.',
    bestPractice3: '<strong>Fichiers volumineux</strong> : Pour les fichiers JSON de plusieurs Mo, utilisez des parseurs en streaming comme <code>ijson</code> ou <code>JSONStream</code>.',
    bestPractice4: '<strong>JSON Schema</strong> : Validez les payloads JSON contre une definition JSON Schema avec <code>ajv</code> ou <code>jsonschema</code>.',
    bestPractice5: '<strong>Evitez les donnees binaires</strong> : JSON est un format texte. Utilisez Base64 ou des URLs pour les donnees binaires.',
    bestPractice6: '<strong>Gestion coherente de null</strong> : Decidez si vous omettez ou incluez explicitement les cles null.',

    h2_comparison: 'JSON vs Alternatives : YAML, TOML, XML',
    comparisonDesc: 'JSON n\'est pas le seul format de serialisation. Voici une comparaison rapide :',
    comparisonNote: 'Choisissez JSON pour les API, YAML pour les fichiers de configuration editables, TOML pour les configurations simples, XML pour les standards existants (SOAP, RSS).',

    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment formater du JSON en ligne ?',
    faq1_a: 'Collez votre JSON brut dans un outil de formatage comme le notre. L\'outil valide automatiquement la syntaxe, ajoute l\'indentation et met en surbrillance les erreurs. Vous pouvez choisir entre 2 ou 4 espaces d\'indentation. L\'outil fonctionne entierement dans votre navigateur.',
    faq2_q: 'Quelles sont les erreurs de syntaxe JSON courantes ?',
    faq2_a: 'Les erreurs les plus courantes sont : virgules finales, guillemets simples au lieu de doubles, cles sans guillemets, commentaires, valeurs undefined/NaN, crochets manquants et sequences d\'echappement invalides.',
    faq3_q: 'Quelle est la difference entre JSON et YAML ?',
    faq3_a: 'JSON utilise des accolades et des guillemets doubles, YAML utilise l\'indentation. YAML supporte les commentaires et les chaines multi-lignes. JSON est meilleur pour l\'echange machine-a-machine, YAML pour les fichiers de configuration. JSON est un sous-ensemble strict de YAML.',

    conclusion: 'Maitriser le formatage et la validation JSON est essentiel pour les developpeurs modernes. Utilisez notre outil gratuit pour un formatage et une validation instantanes.',
    linkToolBottom: 'Formatez, validez et minifiez JSON instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>JSON-Formatierer</strong> und <strong>JSON-Validator</strong> Tools sind fur jeden Entwickler unverzichtbar, der mit APIs, Konfigurationsdateien und Datenaustausch arbeitet. Ob Sie JSON fur die Lesbarkeit formatieren, JSON online validieren oder fur das Debugging verschonern mussen, dieser umfassende Leitfaden deckt alles ab. Unser kostenloses Online-JSON-Formatierungs-Tool behandelt Formatierung, Validierung, Minifizierung und Syntaxfehlererkennung sofort in Ihrem Browser.',
    linkTool: 'Testen Sie unser kostenloses JSON-Formatierungs- und Validierungstool.',

    h2_whatIsJson: 'Was ist JSON?',
    whatIsJsonDesc1: 'JSON (JavaScript Object Notation) ist ein leichtgewichtiges, textbasiertes Datenaustauschformat, das fur Menschen leicht zu lesen und zu schreiben ist und fur Maschinen leicht zu parsen und zu generieren. Es ist zum De-facto-Standard fur den Datenaustausch in Web-APIs, Konfigurationsdateien und NoSQL-Datenbanken geworden.',
    whatIsJsonDesc2: 'Ein JSON-Dokument besteht aus zwei Hauptstrukturen: <strong>Objekte</strong> (ungeordnete Sammlungen von Schlussel-Wert-Paaren in geschweiften Klammern <code>{}</code>) und <strong>Arrays</strong> (geordnete Listen von Werten in eckigen Klammern <code>[]</code>). Werte konnen Strings, Zahlen, Booleans, <code>null</code>, Objekte oder Arrays sein.',
    whatIsJsonDesc3: 'JSON ist durch <strong>RFC 8259</strong> und <strong>ECMA-404</strong> definiert. Der Medientyp ist <code>application/json</code> und die Dateierweiterung ist <code>.json</code>. Im Gegensatz zu XML unterstutzt JSON keine Kommentare, Namensraume oder Attribute.',

    h2_whyNeedFormatter: 'Warum Sie einen JSON-Formatierer brauchen',
    whyNeedFormatterDesc1: '<strong>Lesbarkeit</strong>: Rohes JSON von APIs ist oft eine einzige lange Zeile. Ein JSON-Formatierer fugt Einruckungen und Zeilenumbruche hinzu.',
    whyNeedFormatterDesc2: '<strong>Debugging</strong>: Bei API-Problemen hilft ein JSON-Validator, die genaue Position von Syntaxfehlern zu identifizieren.',
    whyNeedFormatterDesc3: '<strong>Validierung</strong>: Validieren Sie JSON immer vor dem Deployment, um stille Fehler und Produktionsprobleme zu vermeiden.',
    whyNeedFormatterDesc4: '<strong>Minifizierung</strong>: JSON minifizieren entfernt alle unnotigen Leerzeichen, reduziert Payload-Grossen und beschleunigt API-Antworten.',

    h2_commonErrors: 'Haufige JSON-Syntaxfehler',
    commonErrorsDesc: 'Ein JSON-Syntaxfehler kann Ihre gesamte Anwendung zum Absturz bringen. Hier sind die haufigsten Fehler:',
    commonError1: '<strong>Nachgestellte Kommas</strong>: JSON erlaubt kein Komma nach dem letzten Element. <code>{"a": 1, "b": 2,}</code> ist ungultig.',
    commonError2: '<strong>Einfache Anfuhrungszeichen</strong>: JSON erfordert doppelte Anfuhrungszeichen. <code>{\'name\': \'John\'}</code> ist ungultig.',
    commonError3: '<strong>Schlussel ohne Anfuhrungszeichen</strong>: Jeder Schlussel muss ein String in doppelten Anfuhrungszeichen sein.',
    commonError4: '<strong>Kommentare</strong>: Standard-JSON unterstutzt keine Kommentare. Verwenden Sie JSONC, YAML oder TOML.',
    commonError5: '<strong>undefined oder NaN</strong>: JSON unterstutzt nur <code>null</code>, nicht <code>undefined</code>, <code>NaN</code> oder <code>Infinity</code>.',
    commonError6: '<strong>Fehlende Klammern</strong>: Jede offnende Klammer muss eine entsprechende schliessende haben.',
    commonError7: '<strong>Ungultige Escape-Sequenzen</strong>: JSON unterstutzt spezifische Escape-Sequenzen: <code>\\\"</code>, <code>\\\\</code>, <code>\\n</code>, <code>\\r</code>, <code>\\t</code>, <code>\\uXXXX</code>.',

    h2_howToFormat: 'Wie man JSON formatiert',
    howToFormatDesc: 'Es gibt mehrere Methoden, JSON zu formatieren:',
    howToFormatMethod1: '<strong>Online-JSON-Formatierer</strong>: Fugen Sie Ihre Daten in unser kostenloses Tool ein fur sofortige Formatierung und Validierung.',
    howToFormatMethod2: '<strong>Kommandozeile mit jq</strong>: <code>jq</code> ist der leistungsstarkste JSON-Prozessor fur die Kommandozeile.',
    howToFormatMethod3: '<strong>Python-Modul</strong>: <code>python -m json.tool datei.json</code> formatiert direkt vom Terminal.',
    howToFormatMethod4: '<strong>IDE-Erweiterungen</strong>: VS Code hat eingebaute JSON-Formatierung (Shift+Alt+F). JetBrains bietet Ctrl+Alt+L.',
    howToFormatMethod5: '<strong>Browser-DevTools</strong>: DevTools formatieren automatisch JSON-Antworten im Netzwerk-Tab.',

    h2_validationRules: 'JSON-Validierungsregeln',
    validationRulesDesc: 'Um JSON korrekt zu validieren, hier die Regeln gemaess RFC 8259:',
    validationRule1: '<strong>Datentypen</strong>: JSON unterstutzt sechs Typen: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>object</code> und <code>array</code>.',
    validationRule2: '<strong>Strings</strong>: Mussen in doppelten Anfuhrungszeichen stehen mit spezifischen Escape-Sequenzen.',
    validationRule3: '<strong>Zahlen</strong>: Ganzzahlen oder Gleitkomma, wissenschaftliche Notation erlaubt, keine fuhrenden Nullen.',
    validationRule4: '<strong>Objekte</strong>: Schlussel mussen einzigartige Strings sein. Leere Objekte <code>{}</code> sind gultig.',
    validationRule5: '<strong>Arrays</strong>: Gemischte Typen erlaubt. Leere Arrays <code>[]</code> gultig. Beliebige Verschachtelung.',
    validationRule6: '<strong>Kodierung</strong>: UTF-8 ist Standard und am weitesten verbreitet.',
    validationRule7: '<strong>Top-Level-Wert</strong>: RFC 8259 erlaubt jeden JSON-Wert auf der obersten Ebene.',

    h2_codeExamples: 'Codebeispiele: JSON formatieren und validieren',
    codeJsTitle: 'JavaScript: JSON formatieren und validieren',
    codeJsDesc: 'JavaScript bietet <code>JSON.parse()</code> und <code>JSON.stringify()</code> fur Validierung und Formatierung:',
    codePyTitle: 'Python: JSON formatieren und validieren',
    codePyDesc: 'Pythons <code>json</code>-Modul bietet <code>json.dumps()</code> mit <code>indent</code>-Parameter:',
    codeCliTitle: 'Kommandozeile: jq, python und node',
    codeCliDesc: 'Die Kommandozeile bietet verschiedene Werkzeuge zum Formatieren und Validieren von JSON:',
    codeCurlTitle: 'curl + jq Pipeline',
    codeCurlDesc: 'Ein haufiger Workflow: JSON von einer API abrufen und sofort mit curl pipe zu jq formatieren:',

    h2_bestPractices: 'JSON Best Practices',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur sauberes und performantes JSON:',
    bestPractice1: '<strong>camelCase fur Schlussel</strong>: Die meisten JSON-APIs verwenden camelCase. Seien Sie konsistent.',
    bestPractice2: '<strong>Flache Verschachtelung</strong>: Tief verschachteltes JSON (mehr als 3-4 Ebenen) ist schwer lesbar.',
    bestPractice3: '<strong>Grosse Dateien</strong>: Fur JSON-Dateien uber einige MB verwenden Sie Streaming-Parser.',
    bestPractice4: '<strong>JSON Schema</strong>: Validieren Sie Payloads gegen JSON Schema mit <code>ajv</code> oder <code>jsonschema</code>.',
    bestPractice5: '<strong>Keine Binardaten</strong>: JSON ist ein Textformat. Verwenden Sie Base64 oder URLs fur Binardaten.',
    bestPractice6: '<strong>Konsistente null-Behandlung</strong>: Entscheiden Sie, ob null-Werte weggelassen oder explizit eingeschlossen werden.',

    h2_comparison: 'JSON vs Alternativen: YAML, TOML, XML',
    comparisonDesc: 'JSON ist nicht das einzige Serialisierungsformat. Hier ein schneller Vergleich:',
    comparisonNote: 'Wahlen Sie JSON fur APIs, YAML fur editierbare Konfigurationsdateien, TOML fur einfache Konfigurationen, XML fur bestehende Standards (SOAP, RSS).',

    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie formatiere ich JSON online?',
    faq1_a: 'Fugen Sie Ihr rohes JSON in ein Formatierungstool wie unseres ein. Das Tool validiert automatisch die Syntax, fugt Einruckungen hinzu und hebt Fehler hervor. Sie konnen zwischen 2- und 4-Leerzeichen-Einruckung wahlen. Das Tool lauft vollstandig in Ihrem Browser.',
    faq2_q: 'Was sind haufige JSON-Syntaxfehler?',
    faq2_a: 'Die haufigsten sind: nachgestellte Kommas, einfache statt doppelter Anfuhrungszeichen, Schlussel ohne Anfuhrungszeichen, Kommentare, undefined/NaN-Werte, fehlende Klammern und ungultige Escape-Sequenzen.',
    faq3_q: 'Was ist der Unterschied zwischen JSON und YAML?',
    faq3_a: 'JSON verwendet Klammern und doppelte Anfuhrungszeichen, YAML verwendet Einruckung. YAML unterstutzt Kommentare und mehrzeilige Strings. JSON eignet sich besser fur Maschine-zu-Maschine-Austausch, YAML fur Konfigurationsdateien. JSON ist eine strikte Untermenge von YAML.',

    conclusion: 'Die Beherrschung von JSON-Formatierung und -Validierung ist fur moderne Entwickler unverzichtbar. Nutzen Sie unser kostenloses Tool fur sofortige Formatierung und Validierung.',
    linkToolBottom: 'JSON sofort formatieren, validieren und minifizieren mit unserem kostenlosen Tool.',
  },
  es: {
    intro: 'Las herramientas de <strong>formateador JSON</strong> y <strong>validador JSON</strong> son esenciales para todo desarrollador que trabaje con APIs, archivos de configuracion e intercambio de datos. Ya sea que necesite formatear JSON para legibilidad, validar JSON en linea para detectar errores de sintaxis o embellecer JSON para depuracion, esta guia completa cubre todo. Nuestra herramienta gratuita de formateo JSON en linea maneja formateo, validacion, minificacion y deteccion de errores instantaneamente en su navegador.',
    linkTool: 'Prueba nuestra herramienta gratuita de formateo y validacion JSON.',

    h2_whatIsJson: 'Que es JSON?',
    whatIsJsonDesc1: 'JSON (JavaScript Object Notation) es un formato de intercambio de datos ligero, basado en texto, facil de leer y escribir para humanos, y facil de analizar y generar para maquinas. Se ha convertido en el estandar de facto para el intercambio de datos en APIs web, archivos de configuracion y bases de datos NoSQL.',
    whatIsJsonDesc2: 'Un documento JSON consta de dos estructuras: <strong>objetos</strong> (colecciones de pares clave-valor entre llaves <code>{}</code>) y <strong>arrays</strong> (listas ordenadas de valores entre corchetes <code>[]</code>). Los valores pueden ser cadenas, numeros, booleanos, <code>null</code>, objetos o arrays.',
    whatIsJsonDesc3: 'JSON esta definido por <strong>RFC 8259</strong> y <strong>ECMA-404</strong>. El tipo de medio es <code>application/json</code> y la extension de archivo es <code>.json</code>. A diferencia de XML, JSON no soporta comentarios, espacios de nombres ni atributos.',

    h2_whyNeedFormatter: 'Por que necesitas un formateador JSON',
    whyNeedFormatterDesc1: '<strong>Legibilidad</strong>: El JSON crudo de las APIs es a menudo una linea larga sin espacios. Un formateador JSON agrega indentacion y saltos de linea.',
    whyNeedFormatterDesc2: '<strong>Depuracion</strong>: Un validador JSON identifica la ubicacion exacta de los errores de sintaxis en segundos.',
    whyNeedFormatterDesc3: '<strong>Validacion</strong>: Siempre valide JSON antes de desplegar para evitar fallos silenciosos en produccion.',
    whyNeedFormatterDesc4: '<strong>Minificacion</strong>: Minificar JSON elimina espacios innecesarios, reduce el tamano y acelera las respuestas API.',

    h2_commonErrors: 'Errores de sintaxis JSON comunes',
    commonErrorsDesc: 'Un error de sintaxis JSON puede romper toda su aplicacion. Aqui estan los errores mas frecuentes:',
    commonError1: '<strong>Comas finales</strong>: JSON no permite comas despues del ultimo elemento. <code>{"a": 1, "b": 2,}</code> es invalido.',
    commonError2: '<strong>Comillas simples</strong>: JSON requiere comillas dobles. <code>{\'name\': \'John\'}</code> es invalido.',
    commonError3: '<strong>Claves sin comillas</strong>: Cada clave debe ser una cadena entre comillas dobles.',
    commonError4: '<strong>Comentarios</strong>: JSON estandar no soporta comentarios. Use JSONC, YAML o TOML.',
    commonError5: '<strong>undefined o NaN</strong>: JSON solo soporta <code>null</code>, no <code>undefined</code>, <code>NaN</code> o <code>Infinity</code>.',
    commonError6: '<strong>Corchetes faltantes</strong>: Cada <code>{</code> o <code>[</code> debe tener su cierre correspondiente.',
    commonError7: '<strong>Secuencias de escape invalidas</strong>: JSON soporta secuencias especificas: <code>\\\"</code>, <code>\\\\</code>, <code>\\n</code>, <code>\\r</code>, <code>\\t</code>, <code>\\uXXXX</code>.',

    h2_howToFormat: 'Como formatear JSON',
    howToFormatDesc: 'Varios metodos para formatear JSON segun su flujo de trabajo:',
    howToFormatMethod1: '<strong>Formateador JSON en linea</strong>: Pegue sus datos en nuestra herramienta gratuita para formateo y validacion instantaneos.',
    howToFormatMethod2: '<strong>Linea de comandos con jq</strong>: <code>jq</code> es el procesador JSON mas potente para la linea de comandos.',
    howToFormatMethod3: '<strong>Modulo Python integrado</strong>: <code>python -m json.tool archivo.json</code> formatea directamente desde el terminal.',
    howToFormatMethod4: '<strong>Extensiones IDE</strong>: VS Code tiene formateo JSON integrado (Shift+Alt+F). JetBrains ofrece Ctrl+Alt+L.',
    howToFormatMethod5: '<strong>DevTools del navegador</strong>: Las DevTools formatean automaticamente las respuestas JSON en la pestana Red.',

    h2_validationRules: 'Reglas de validacion JSON',
    validationRulesDesc: 'Para validar correctamente JSON, aqui estan las reglas de RFC 8259:',
    validationRule1: '<strong>Tipos de datos</strong>: JSON soporta seis tipos: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>object</code> y <code>array</code>.',
    validationRule2: '<strong>Cadenas</strong>: Deben estar entre comillas dobles con secuencias de escape especificas.',
    validationRule3: '<strong>Numeros</strong>: Enteros o decimales, notacion cientifica permitida, sin ceros iniciales ni NaN/Infinity.',
    validationRule4: '<strong>Objetos</strong>: Las claves deben ser cadenas unicas. Objetos vacios <code>{}</code> son validos.',
    validationRule5: '<strong>Arrays</strong>: Tipos mixtos permitidos. Arrays vacios <code>[]</code> validos. Anidacion arbitraria.',
    validationRule6: '<strong>Codificacion</strong>: UTF-8 es el estandar y mas utilizado.',
    validationRule7: '<strong>Valor de nivel superior</strong>: RFC 8259 permite cualquier valor JSON en el nivel superior.',

    h2_codeExamples: 'Ejemplos de codigo: formatear y validar JSON',
    codeJsTitle: 'JavaScript: formatear y validar JSON',
    codeJsDesc: 'JavaScript proporciona <code>JSON.parse()</code> y <code>JSON.stringify()</code> para validacion y formateo:',
    codePyTitle: 'Python: formatear y validar JSON',
    codePyDesc: 'El modulo <code>json</code> de Python proporciona <code>json.dumps()</code> con el parametro <code>indent</code>:',
    codeCliTitle: 'Linea de comandos: jq, python y node',
    codeCliDesc: 'La linea de comandos ofrece varias herramientas para formatear y validar JSON:',
    codeCurlTitle: 'Pipeline curl + jq',
    codeCurlDesc: 'Un flujo de trabajo comun: obtener JSON de una API y formatearlo con curl pipe a jq:',

    h2_bestPractices: 'Mejores practicas JSON',
    bestPracticesDesc: 'Siga estas mejores practicas para escribir JSON limpio y eficiente:',
    bestPractice1: '<strong>camelCase para claves</strong>: La mayoria de APIs JSON usan camelCase. Sea consistente.',
    bestPractice2: '<strong>Anidacion superficial</strong>: JSON profundamente anidado (mas de 3-4 niveles) es dificil de leer.',
    bestPractice3: '<strong>Archivos grandes</strong>: Para archivos JSON de varios MB, use parsers de streaming.',
    bestPractice4: '<strong>JSON Schema</strong>: Valide payloads contra JSON Schema con <code>ajv</code> o <code>jsonschema</code>.',
    bestPractice5: '<strong>Sin datos binarios</strong>: JSON es texto. Use Base64 o URLs para datos binarios.',
    bestPractice6: '<strong>Manejo consistente de null</strong>: Decida si omite o incluye explicitamente las claves null.',

    h2_comparison: 'JSON vs Alternativas: YAML, TOML, XML',
    comparisonDesc: 'JSON no es el unico formato de serializacion. Aqui una comparacion rapida:',
    comparisonNote: 'Elija JSON para APIs, YAML para archivos de configuracion editables, TOML para configuraciones simples, XML para estandares existentes (SOAP, RSS).',

    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como formateo JSON en linea?',
    faq1_a: 'Pegue su JSON crudo en una herramienta de formateo como la nuestra. La herramienta valida automaticamente la sintaxis, agrega indentacion y resalta errores. Puede elegir entre 2 o 4 espacios. La herramienta funciona completamente en su navegador.',
    faq2_q: 'Cuales son los errores de sintaxis JSON comunes?',
    faq2_a: 'Los mas comunes son: comas finales, comillas simples en vez de dobles, claves sin comillas, comentarios, valores undefined/NaN, corchetes faltantes y secuencias de escape invalidas.',
    faq3_q: 'Cual es la diferencia entre JSON y YAML?',
    faq3_a: 'JSON usa llaves y comillas dobles, YAML usa indentacion. YAML soporta comentarios y cadenas multilinea. JSON es mejor para intercambio maquina-a-maquina, YAML para configuracion. JSON es un subconjunto estricto de YAML.',

    conclusion: 'Dominar el formateo y la validacion JSON es esencial para desarrolladores modernos. Use nuestra herramienta gratuita para formateo y validacion instantaneos.',
    linkToolBottom: 'Formatee, valide y minifique JSON instantaneamente con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>JSONフォーマッター</strong>と<strong>JSONバリデーター</strong>ツールは、API、設定ファイル、データ交換を扱うすべての開発者に不可欠です。可読性のためのJSON整形、構文エラーを検出するためのオンラインJSON検証、デバッグのためのJSON美化印刷など、この包括的なガイドですべてをカバーします。無料のオンラインJSONフォーマッターツールは、ブラウザ内でフォーマット、検証、最小化、構文エラー検出を即座に処理します。',
    linkTool: '無料JSONフォーマット＆検証ツールをお試しください。',

    h2_whatIsJson: 'JSONとは？',
    whatIsJsonDesc1: 'JSON（JavaScript Object Notation）は、人間にとって読み書きしやすく、機械にとって解析・生成しやすい軽量のテキストベースデータ交換フォーマットです。Web API、設定ファイル、NoSQLデータベースにおけるデータ交換の事実上の標準となっています。',
    whatIsJsonDesc2: 'JSONドキュメントは2つの主要構造で構成されます：<strong>オブジェクト</strong>（波括弧<code>{}</code>で囲まれたキーと値のペアの集合）と<strong>配列</strong>（角括弧<code>[]</code>で囲まれた値の順序付きリスト）。値は文字列、数値、ブール値、<code>null</code>、オブジェクト、配列のいずれかです。',
    whatIsJsonDesc3: 'JSONは<strong>RFC 8259</strong>と<strong>ECMA-404</strong>で定義されています。メディアタイプは<code>application/json</code>、ファイル拡張子は<code>.json</code>です。XMLとは異なり、JSONはコメント、名前空間、属性をサポートしていません。',

    h2_whyNeedFormatter: 'JSONフォーマッターが必要な理由',
    whyNeedFormatterDesc1: '<strong>可読性</strong>：APIからの生JSONは空白のない一行であることが多いです。JSONフォーマッターはインデントと改行を追加します。',
    whyNeedFormatterDesc2: '<strong>デバッグ</strong>：JSONバリデーターは構文エラーの正確な位置を特定し、数秒で問題を発見できます。',
    whyNeedFormatterDesc3: '<strong>検証</strong>：デプロイ前に常にJSONを検証し、サイレント障害や本番問題を防ぎましょう。',
    whyNeedFormatterDesc4: '<strong>最小化</strong>：JSON最小化は不要な空白を除去し、ペイロードサイズを削減してAPIレスポンスを高速化します。',

    h2_commonErrors: '一般的なJSON構文エラー',
    commonErrorsDesc: 'JSON構文エラーはアプリケーション全体を壊す可能性があります。最も頻繁なミスは：',
    commonError1: '<strong>末尾のカンマ</strong>：JSONはオブジェクトや配列の最後の項目の後にカンマを許可しません。<code>{"a": 1, "b": 2,}</code>は無効です。',
    commonError2: '<strong>シングルクォート</strong>：JSONはすべての文字列とキーにダブルクォートを必要とします。<code>{\'name\': \'John\'}</code>は無効です。',
    commonError3: '<strong>引用符なしのキー</strong>：すべてのキーはダブルクォートで囲まれた文字列でなければなりません。',
    commonError4: '<strong>コメント</strong>：標準JSONはコメントをサポートしません。JSONC、YAML、TOMLを使用してください。',
    commonError5: '<strong>undefinedやNaN</strong>：JSONは<code>null</code>のみサポートし、<code>undefined</code>、<code>NaN</code>、<code>Infinity</code>はサポートしません。',
    commonError6: '<strong>括弧の不一致</strong>：すべての<code>{</code>や<code>[</code>には対応する閉じ括弧が必要です。',
    commonError7: '<strong>無効なエスケープシーケンス</strong>：JSONは特定のエスケープシーケンスをサポート：<code>\\\"</code>、<code>\\\\</code>、<code>\\n</code>、<code>\\r</code>、<code>\\t</code>、<code>\\uXXXX</code>。',

    h2_howToFormat: 'JSONのフォーマット方法',
    howToFormatDesc: 'ワークフローに応じてJSONをフォーマットする方法はいくつかあります：',
    howToFormatMethod1: '<strong>オンラインJSONフォーマッター</strong>：データを無料ツールに貼り付けて、即座にフォーマットと検証を行えます。',
    howToFormatMethod2: '<strong>コマンドラインjq</strong>：<code>jq</code>は最も強力なコマンドラインJSONプロセッサです。',
    howToFormatMethod3: '<strong>Python組み込みモジュール</strong>：<code>python -m json.tool file.json</code>でターミナルから直接フォーマット。',
    howToFormatMethod4: '<strong>IDE拡張機能</strong>：VS Codeは組み込みJSON整形（Shift+Alt+F）を提供。JetBrainsはCtrl+Alt+L。',
    howToFormatMethod5: '<strong>ブラウザDevTools</strong>：DevToolsはネットワークタブでJSON応答を自動的にフォーマットします。',

    h2_validationRules: 'JSON検証ルール',
    validationRulesDesc: 'JSONを正しく検証するためのRFC 8259で定義されたルール：',
    validationRule1: '<strong>データ型</strong>：JSONは6つの型をサポート：<code>string</code>、<code>number</code>、<code>boolean</code>、<code>null</code>、<code>object</code>、<code>array</code>。',
    validationRule2: '<strong>文字列</strong>：ダブルクォートで囲み、特定のエスケープシーケンスを使用。',
    validationRule3: '<strong>数値</strong>：整数または浮動小数点、科学的記数法可、先頭ゼロ・NaN・Infinity不可。',
    validationRule4: '<strong>オブジェクト</strong>：キーは一意の文字列。空オブジェクト<code>{}</code>は有効。',
    validationRule5: '<strong>配列</strong>：混合型の要素可。空配列<code>[]</code>有効。任意の深さのネスト。',
    validationRule6: '<strong>エンコーディング</strong>：UTF-8がデフォルトで最も広く使用。',
    validationRule7: '<strong>トップレベル値</strong>：RFC 8259はトップレベルに任意のJSON値を許可。',

    h2_codeExamples: 'コード例：JSONのフォーマットと検証',
    codeJsTitle: 'JavaScript：JSONのフォーマットと検証',
    codeJsDesc: 'JavaScriptは<code>JSON.parse()</code>と<code>JSON.stringify()</code>で検証とフォーマットを提供：',
    codePyTitle: 'Python：JSONのフォーマットと検証',
    codePyDesc: 'Pythonの<code>json</code>モジュールは<code>json.dumps()</code>の<code>indent</code>パラメータでフォーマット：',
    codeCliTitle: 'コマンドライン：jq、python、node',
    codeCliDesc: 'コマンドラインでJSONをフォーマット・検証する各種ツール：',
    codeCurlTitle: 'curl + jq パイプライン',
    codeCurlDesc: 'APIからJSONを取得してcurlからjqにパイプしてフォーマットする一般的なワークフロー：',

    h2_bestPractices: 'JSONベストプラクティス',
    bestPracticesDesc: 'クリーンで高パフォーマンスなJSONを書くためのベストプラクティス：',
    bestPractice1: '<strong>キーにcamelCaseを使用</strong>：ほとんどのJSON APIはcamelCaseを使用。API全体で一貫性を保ちましょう。',
    bestPractice2: '<strong>ネストを浅く保つ</strong>：深くネストされたJSON（3-4レベル以上）は読みにくいです。フラット化を検討してください。',
    bestPractice3: '<strong>大きなファイルに注意</strong>：数MB以上のJSONファイルにはストリーミングパーサーを使用。',
    bestPractice4: '<strong>JSON Schemaで検証</strong>：本番環境では<code>ajv</code>や<code>jsonschema</code>でJSON Schemaに対して検証。',
    bestPractice5: '<strong>バイナリデータを避ける</strong>：JSONはテキスト形式。バイナリデータにはBase64またはURLを使用。',
    bestPractice6: '<strong>一貫したnull処理</strong>：nullキーを省略するか明示的に含めるか決め、一貫して適用。',

    h2_comparison: 'JSON vs 代替フォーマット：YAML、TOML、XML',
    comparisonDesc: 'JSONは唯一のシリアライゼーション形式ではありません。主要な代替との比較：',
    comparisonNote: 'APIにはJSON、編集可能な設定ファイルにはYAML、シンプルな設定にはTOML、既存標準（SOAP、RSS）にはXMLを選択。',

    h2_faq: 'よくある質問',
    faq1_q: 'オンラインでJSONをフォーマットするには？',
    faq1_a: '生のJSONを当ツールのようなフォーマッターに貼り付けます。ツールが自動的に構文を検証し、インデントを追加し、エラーをハイライトします。2スペースまたは4スペースのインデントを選択可能。ツールはブラウザ内で完全に動作します。',
    faq2_q: '一般的なJSON構文エラーは？',
    faq2_a: '最も一般的なのは：末尾のカンマ、シングルクォート、引用符なしのキー、コメント、undefined/NaN値、括弧の不一致、無効なエスケープシーケンスです。',
    faq3_q: 'JSONとYAMLの違いは？',
    faq3_a: 'JSONは波括弧とダブルクォートを使用し、YAMLはインデントを使用します。YAMLはコメントと複数行文字列をサポート。JSONはマシン間のデータ交換に適し、YAMLは設定ファイルに適しています。JSONはYAMLの厳密なサブセットです。',

    conclusion: 'JSONフォーマットと検証のマスターは現代の開発者にとって不可欠です。無料ツールで即座にフォーマットと検証を行えます。',
    linkToolBottom: '無料オンラインツールでJSONを即座にフォーマット・検証・最小化。',
  },
  ko: {
    intro: '<strong>JSON 포맷터</strong>와 <strong>JSON 유효성 검사기</strong> 도구는 API, 설정 파일, 데이터 교환을 다루는 모든 개발자에게 필수적입니다. 가독성을 위한 JSON 포맷팅, 구문 오류를 잡기 위한 온라인 JSON 검증, 디버깅을 위한 JSON 미화 출력이 필요하든, 이 포괄적인 가이드가 모든 것을 다룹니다. 무료 온라인 JSON 포맷터 도구는 브라우저에서 포맷팅, 유효성 검사, 축소, 구문 오류 감지를 즉시 처리합니다.',
    linkTool: '무료 JSON 포맷팅 및 유효성 검사 도구를 사용해 보세요.',

    h2_whatIsJson: 'JSON이란?',
    whatIsJsonDesc1: 'JSON(JavaScript Object Notation)은 사람이 읽고 쓰기 쉽고 기계가 파싱하고 생성하기 쉬운 경량의 텍스트 기반 데이터 교환 형식입니다. 웹 API, 설정 파일, NoSQL 데이터베이스에서 데이터 교환의 사실상 표준이 되었습니다.',
    whatIsJsonDesc2: 'JSON 문서는 두 가지 주요 구조로 구성됩니다: <strong>객체</strong>(중괄호 <code>{}</code>로 감싸진 키-값 쌍의 컬렉션)와 <strong>배열</strong>(대괄호 <code>[]</code>로 감싸진 값의 순서 목록). 값은 문자열, 숫자, 불리언, <code>null</code>, 객체, 배열이 될 수 있습니다.',
    whatIsJsonDesc3: 'JSON은 <strong>RFC 8259</strong>와 <strong>ECMA-404</strong>로 정의됩니다. 미디어 타입은 <code>application/json</code>이고 파일 확장자는 <code>.json</code>입니다. XML과 달리 JSON은 주석, 네임스페이스, 속성을 지원하지 않습니다.',

    h2_whyNeedFormatter: 'JSON 포맷터가 필요한 이유',
    whyNeedFormatterDesc1: '<strong>가독성</strong>: API의 원시 JSON은 공백 없는 긴 한 줄인 경우가 많습니다. JSON 포맷터는 들여쓰기와 줄 바꿈을 추가합니다.',
    whyNeedFormatterDesc2: '<strong>디버깅</strong>: JSON 유효성 검사기는 구문 오류의 정확한 위치를 몇 초 만에 식별합니다.',
    whyNeedFormatterDesc3: '<strong>유효성 검사</strong>: 배포 전에 항상 JSON을 검증하여 사일런트 실패와 프로덕션 문제를 방지하세요.',
    whyNeedFormatterDesc4: '<strong>축소</strong>: JSON 축소는 불필요한 공백을 제거하여 페이로드 크기를 줄이고 API 응답을 가속화합니다.',

    h2_commonErrors: '일반적인 JSON 구문 오류',
    commonErrorsDesc: 'JSON 구문 오류는 전체 애플리케이션을 중단시킬 수 있습니다. 가장 흔한 실수들:',
    commonError1: '<strong>후행 쉼표</strong>: JSON은 마지막 항목 뒤에 쉼표를 허용하지 않습니다. <code>{"a": 1, "b": 2,}</code>는 유효하지 않습니다.',
    commonError2: '<strong>작은따옴표</strong>: JSON은 모든 문자열과 키에 큰따옴표를 요구합니다. <code>{\'name\': \'John\'}</code>은 유효하지 않습니다.',
    commonError3: '<strong>따옴표 없는 키</strong>: 모든 키는 큰따옴표로 감싸진 문자열이어야 합니다.',
    commonError4: '<strong>주석</strong>: 표준 JSON은 주석을 지원하지 않습니다. JSONC, YAML, TOML을 사용하세요.',
    commonError5: '<strong>undefined나 NaN</strong>: JSON은 <code>null</code>만 지원하며, <code>undefined</code>, <code>NaN</code>, <code>Infinity</code>는 지원하지 않습니다.',
    commonError6: '<strong>괄호 불일치</strong>: 모든 <code>{</code>나 <code>[</code>에는 대응하는 닫는 괄호가 필요합니다.',
    commonError7: '<strong>잘못된 이스케이프 시퀀스</strong>: JSON은 특정 이스케이프 시퀀스를 지원: <code>\\\"</code>, <code>\\\\</code>, <code>\\n</code>, <code>\\r</code>, <code>\\t</code>, <code>\\uXXXX</code>.',

    h2_howToFormat: 'JSON 포맷팅 방법',
    howToFormatDesc: '워크플로우에 따른 다양한 JSON 포맷팅 방법:',
    howToFormatMethod1: '<strong>온라인 JSON 포맷터</strong>: 무료 도구에 데이터를 붙여넣어 즉시 포맷팅과 유효성 검사를 수행합니다.',
    howToFormatMethod2: '<strong>커맨드라인 jq</strong>: <code>jq</code>는 가장 강력한 커맨드라인 JSON 프로세서입니다.',
    howToFormatMethod3: '<strong>Python 내장 모듈</strong>: <code>python -m json.tool file.json</code>으로 터미널에서 직접 포맷팅.',
    howToFormatMethod4: '<strong>IDE 확장</strong>: VS Code는 내장 JSON 포맷팅(Shift+Alt+F)을 제공. JetBrains는 Ctrl+Alt+L.',
    howToFormatMethod5: '<strong>브라우저 DevTools</strong>: DevTools는 네트워크 탭에서 JSON 응답을 자동 포맷팅합니다.',

    h2_validationRules: 'JSON 유효성 검사 규칙',
    validationRulesDesc: 'JSON을 올바르게 검증하기 위한 RFC 8259 규칙:',
    validationRule1: '<strong>데이터 타입</strong>: JSON은 6가지 타입 지원: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>object</code>, <code>array</code>.',
    validationRule2: '<strong>문자열</strong>: 큰따옴표로 감싸야 하며 특정 이스케이프 시퀀스 사용.',
    validationRule3: '<strong>숫자</strong>: 정수 또는 부동소수점, 과학적 표기법 허용, 선행 제로/NaN/Infinity 불가.',
    validationRule4: '<strong>객체</strong>: 키는 고유한 문자열. 빈 객체 <code>{}</code> 유효.',
    validationRule5: '<strong>배열</strong>: 혼합 타입 허용. 빈 배열 <code>[]</code> 유효. 임의 깊이 중첩.',
    validationRule6: '<strong>인코딩</strong>: UTF-8이 기본이며 가장 널리 사용.',
    validationRule7: '<strong>최상위 값</strong>: RFC 8259는 최상위에 모든 JSON 값을 허용.',

    h2_codeExamples: '코드 예제: JSON 포맷팅 및 유효성 검사',
    codeJsTitle: 'JavaScript: JSON 포맷팅 및 유효성 검사',
    codeJsDesc: 'JavaScript는 <code>JSON.parse()</code>와 <code>JSON.stringify()</code>로 유효성 검사와 포맷팅을 제공:',
    codePyTitle: 'Python: JSON 포맷팅 및 유효성 검사',
    codePyDesc: 'Python <code>json</code> 모듈은 <code>json.dumps()</code>의 <code>indent</code> 매개변수로 포맷팅:',
    codeCliTitle: '커맨드라인: jq, python, node',
    codeCliDesc: '커맨드라인에서 JSON을 포맷팅하고 유효성을 검사하는 다양한 도구:',
    codeCurlTitle: 'curl + jq 파이프라인',
    codeCurlDesc: 'API에서 JSON을 가져와 curl에서 jq로 파이프하여 포맷팅하는 일반적인 워크플로우:',

    h2_bestPractices: 'JSON 모범 사례',
    bestPracticesDesc: '깔끔하고 고성능 JSON을 작성하기 위한 모범 사례:',
    bestPractice1: '<strong>키에 camelCase 사용</strong>: 대부분의 JSON API는 camelCase를 사용합니다. 일관성을 유지하세요.',
    bestPractice2: '<strong>중첩을 얕게 유지</strong>: 깊은 중첩(3-4레벨 이상)은 읽기 어렵습니다. 플래트닝을 고려하세요.',
    bestPractice3: '<strong>큰 파일 주의</strong>: 수 MB 이상의 JSON 파일에는 스트리밍 파서를 사용하세요.',
    bestPractice4: '<strong>JSON Schema로 검증</strong>: 프로덕션에서는 <code>ajv</code>나 <code>jsonschema</code>로 JSON Schema 검증.',
    bestPractice5: '<strong>바이너리 데이터 피하기</strong>: JSON은 텍스트 형식. 바이너리에는 Base64나 URL을 사용.',
    bestPractice6: '<strong>일관된 null 처리</strong>: null 키를 생략할지 명시적으로 포함할지 결정하고 일관되게 적용.',

    h2_comparison: 'JSON vs 대안: YAML, TOML, XML',
    comparisonDesc: 'JSON만이 유일한 직렬화 형식은 아닙니다. 주요 대안과의 비교:',
    comparisonNote: 'API에는 JSON, 편집 가능한 설정에는 YAML, 간단한 설정에는 TOML, 기존 표준(SOAP, RSS)에는 XML을 선택.',

    h2_faq: '자주 묻는 질문',
    faq1_q: '온라인에서 JSON을 포맷팅하려면?',
    faq1_a: '원시 JSON을 당사 도구 같은 포맷터에 붙여넣으세요. 도구가 자동으로 구문을 검증하고 들여쓰기를 추가하며 오류를 하이라이트합니다. 2칸 또는 4칸 들여쓰기 선택 가능. 도구는 브라우저에서 완전히 실행됩니다.',
    faq2_q: '일반적인 JSON 구문 오류는?',
    faq2_a: '가장 흔한 것들: 후행 쉼표, 작은따옴표, 따옴표 없는 키, 주석, undefined/NaN 값, 괄호 불일치, 잘못된 이스케이프 시퀀스.',
    faq3_q: 'JSON과 YAML의 차이점은?',
    faq3_a: 'JSON은 중괄호와 큰따옴표를 사용하고, YAML은 들여쓰기를 사용합니다. YAML은 주석과 여러 줄 문자열을 지원합니다. JSON은 기계 간 데이터 교환에 적합하고, YAML은 설정 파일에 적합합니다. JSON은 YAML의 엄격한 하위 집합입니다.',

    conclusion: 'JSON 포맷팅과 유효성 검사 마스터는 현대 개발자에게 필수입니다. 무료 도구로 즉시 포맷팅과 유효성 검사를 수행하세요.',
    linkToolBottom: '무료 온라인 도구로 JSON을 즉시 포맷팅, 유효성 검사, 축소하세요.',
  },
};

export default function JsonFormatterValidatorGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is JSON? */}
      <h2>{s.h2_whatIsJson}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatIsJsonDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatIsJsonDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatIsJsonDesc3 }} />

      {/* Section 2: Why You Need a JSON Formatter */}
      <h2>{s.h2_whyNeedFormatter}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whyNeedFormatterDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyNeedFormatterDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyNeedFormatterDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyNeedFormatterDesc4 }} />

      {/* Section 3: Common JSON Syntax Errors */}
      <h2>{s.h2_commonErrors}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.commonErrorsDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.commonError1 }} />
      <pre><code>{`// INVALID: trailing comma
{
  "name": "John",
  "age": 30,
}

// VALID: no trailing comma
{
  "name": "John",
  "age": 30
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.commonError2 }} />
      <pre><code>{`// INVALID: single quotes
{'name': 'John', 'age': 30}

// VALID: double quotes
{"name": "John", "age": 30}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.commonError3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.commonError4 }} />
      <pre><code>{`// INVALID: comments not allowed in JSON
{
  "name": "John", // this is a comment
  "age": 30       /* block comment */
}

// VALID: no comments
{
  "name": "John",
  "age": 30
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.commonError5 }} />
      <pre><code>{`// INVALID in JSON (JavaScript-specific values)
{
  "value1": undefined,
  "value2": NaN,
  "value3": Infinity
}

// VALID: use null instead
{
  "value1": null,
  "value2": null,
  "value3": null
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.commonError6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.commonError7 }} />

      {/* Section 4: How to Format JSON */}
      <h2>{s.h2_howToFormat}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatMethod1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatMethod2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatMethod3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatMethod4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.howToFormatMethod5 }} />

      {/* Section 5: JSON Validation Rules */}
      <h2>{s.h2_validationRules}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.validationRulesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationRule1 }} />
      <pre><code>{`// All six JSON data types demonstrated:
{
  "string": "Hello World",
  "number": 42.5,
  "boolean": true,
  "nullValue": null,
  "object": {
    "nested": "value"
  },
  "array": [1, "two", false, null, {"key": "val"}, [1,2,3]]
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.validationRule2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationRule3 }} />
      <pre><code>{`// Valid JSON numbers:
42          // integer
-17         // negative integer
3.14        // floating point
2.5e10      // scientific notation
-1.23e-4    // negative scientific notation

// INVALID JSON numbers:
01          // leading zero not allowed
.5          // must have digit before decimal
+1          // leading plus not allowed
0xFF        // hex not allowed
0o77        // octal not allowed
NaN         // not a valid JSON value
Infinity    // not a valid JSON value`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.validationRule4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationRule5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationRule6 }} />
      <p dangerouslySetInnerHTML={{ __html: s.validationRule7 }} />

      {/* Section 6: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== JSON.parse(): Validate JSON =====

// Valid JSON string
const jsonString = '{"name": "Alice", "age": 30, "active": true}';
const data = JSON.parse(jsonString);
console.log(data.name); // "Alice"

// Validate JSON safely with try/catch
function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    console.error('JSON syntax error:', e.message);
    return false;
  }
}

isValidJSON('{"valid": true}');     // true
isValidJSON('{invalid: true}');     // false — "Unexpected token i"
isValidJSON('{"trailing": 1,}');    // false — "Unexpected token }"

// ===== JSON.stringify(): Format / Pretty Print JSON =====

const obj = {
  name: "Alice",
  age: 30,
  address: {
    city: "New York",
    zip: "10001"
  },
  hobbies: ["reading", "coding", "hiking"]
};

// Pretty print with 2-space indentation
const formatted = JSON.stringify(obj, null, 2);
console.log(formatted);
/*
{
  "name": "Alice",
  "age": 30,
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": [
    "reading",
    "coding",
    "hiking"
  ]
}
*/

// Pretty print with 4-space indentation
console.log(JSON.stringify(obj, null, 4));

// Pretty print with tab indentation
console.log(JSON.stringify(obj, null, "\\t"));

// Minify JSON (no whitespace)
const minified = JSON.stringify(obj);
// {"name":"Alice","age":30,"address":{"city":"New York","zip":"10001"},...}

// Custom replacer: filter specific keys
const filtered = JSON.stringify(obj, ["name", "age"], 2);
/*
{
  "name": "Alice",
  "age": 30
}
*/

// Reviver function: transform values during parsing
const parsed = JSON.parse('{"date": "2025-01-15T00:00:00Z"}', (key, value) => {
  if (key === 'date') return new Date(value);
  return value;
});
console.log(parsed.date instanceof Date); // true`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`import json

# ===== json.loads(): Validate JSON =====

json_string = '{"name": "Alice", "age": 30, "active": true}'
data = json.loads(json_string)
print(data["name"])  # "Alice"

# Validate JSON safely
def is_valid_json(s):
    try:
        json.loads(s)
        return True
    except json.JSONDecodeError as e:
        print(f"JSON syntax error at line {e.lineno}, col {e.colno}: {e.msg}")
        return False

is_valid_json('{"valid": true}')      # True
is_valid_json('{invalid: true}')      # False
is_valid_json('{"trailing": 1,}')     # False

# ===== json.dumps(): Format / Pretty Print JSON =====

data = {
    "name": "Alice",
    "age": 30,
    "address": {
        "city": "New York",
        "zip": "10001"
    },
    "hobbies": ["reading", "coding", "hiking"]
}

# Pretty print with 2-space indentation
formatted = json.dumps(data, indent=2)
print(formatted)

# Pretty print with sorted keys
formatted_sorted = json.dumps(data, indent=2, sort_keys=True)
print(formatted_sorted)

# Minify JSON (compact output)
minified = json.dumps(data, separators=(",", ":"))
print(minified)
# {"name":"Alice","age":30,"address":{"city":"New York","zip":"10001"},...}

# Handle non-ASCII characters (useful for i18n)
data_intl = {"city": "Tokyo", "greeting": "Hello"}
print(json.dumps(data_intl, ensure_ascii=False, indent=2))

# Read and format a JSON file
with open("data.json", "r") as f:
    data = json.load(f)

with open("data_formatted.json", "w") as f:
    json.dump(data, f, indent=2)

# Command line: python -m json.tool
# $ echo '{"a":1,"b":2}' | python -m json.tool
# {
#     "a": 1,
#     "b": 2
# }`}</code></pre>

      <h3>{s.codeCliTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCliDesc }} />
      <pre><code>{`# ===== jq: The Swiss Army knife for JSON =====

# Pretty print JSON
echo '{"name":"Alice","age":30}' | jq .
# {
#   "name": "Alice",
#   "age": 30
# }

# Minify JSON (compact output)
echo '{
  "name": "Alice",
  "age": 30
}' | jq -c .
# {"name":"Alice","age":30}

# Extract specific fields
echo '{"name":"Alice","age":30,"city":"NYC"}' | jq '{name, city}'
# {"name": "Alice", "city": "NYC"}

# Format a JSON file
jq . input.json > formatted.json

# Validate JSON (exit code 0 = valid, non-zero = invalid)
echo '{"valid": true}' | jq . > /dev/null 2>&1 && echo "Valid" || echo "Invalid"
echo '{invalid}' | jq . > /dev/null 2>&1 && echo "Valid" || echo "Invalid"

# Sort keys
echo '{"b":2,"a":1,"c":3}' | jq -S .
# {"a": 1, "b": 2, "c": 3}

# ===== python -m json.tool =====

# Format JSON from stdin
echo '{"a":1,"b":2}' | python3 -m json.tool

# Format a JSON file
python3 -m json.tool input.json output.json

# Sort keys
echo '{"b":2,"a":1}' | python3 -m json.tool --sort-keys

# ===== Node.js one-liner =====

# Pretty print JSON
echo '{"a":1,"b":2}' | node -e "process.stdin.resume();let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.stringify(JSON.parse(d),null,2)))"

# Simpler: use node -p
node -p "JSON.stringify({a:1,b:[2,3]}, null, 2)"`}</code></pre>

      <h3>{s.codeCurlTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCurlDesc }} />
      <pre><code>{`# Fetch and format JSON from a REST API
curl -s https://api.github.com/users/octocat | jq .

# Fetch, extract specific fields, and format
curl -s https://api.github.com/users/octocat | jq '{login, name, bio, public_repos}'

# Fetch and validate (check exit code)
curl -s https://api.example.com/data | jq . > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Response is valid JSON"
else
  echo "Response is NOT valid JSON"
fi

# POST JSON and format the response
curl -s -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice","age":30}' | jq .

# Save formatted JSON to file
curl -s https://api.github.com/users/octocat | jq . > user.json

# Minify before sending (reduce payload size)
DATA=$(jq -c . large-payload.json)
curl -s -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -d "$DATA" | jq .`}</code></pre>

      {/* Section 7: JSON Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice1 }} />
      <pre><code>{`// camelCase (recommended for most APIs)
{
  "firstName": "Alice",
  "lastName": "Smith",
  "phoneNumber": "+1-555-0123",
  "isActive": true
}

// snake_case (common in Python/Ruby ecosystems)
{
  "first_name": "Alice",
  "last_name": "Smith",
  "phone_number": "+1-555-0123",
  "is_active": true
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice2 }} />
      <pre><code>{`// BAD: deeply nested (hard to read and parse)
{
  "company": {
    "departments": {
      "engineering": {
        "teams": {
          "frontend": {
            "members": [{"name": "Alice"}]
          }
        }
      }
    }
  }
}

// BETTER: flattened structure
{
  "companyId": "acme",
  "departmentId": "engineering",
  "teamId": "frontend",
  "members": [{"name": "Alice"}]
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice4 }} />
      <pre><code>{`// JSON Schema example for validating user objects
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "age": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" },
    "roles": {
      "type": "array",
      "items": { "type": "string" },
      "minItems": 1
    }
  },
  "required": ["name", "email"]
}`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice6 }} />

      {/* Section 8: JSON vs Alternatives */}
      <h2>{s.h2_comparison}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.comparisonDesc }} />
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>JSON</th>
            <th>YAML</th>
            <th>TOML</th>
            <th>XML</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Readability</td><td>Good</td><td>Excellent</td><td>Excellent</td><td>Moderate</td></tr>
          <tr><td>Comments</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
          <tr><td>Data types</td><td>6 types</td><td>Rich (dates, etc.)</td><td>Rich (dates, etc.)</td><td>Text only</td></tr>
          <tr><td>Nesting</td><td>Unlimited</td><td>Unlimited</td><td>Limited</td><td>Unlimited</td></tr>
          <tr><td>Multi-line strings</td><td>No</td><td>Yes</td><td>Yes</td><td>Yes (CDATA)</td></tr>
          <tr><td>Parser support</td><td>Universal</td><td>Wide</td><td>Growing</td><td>Universal</td></tr>
          <tr><td>File size</td><td>Small</td><td>Smaller</td><td>Smallest</td><td>Large (verbose)</td></tr>
          <tr><td>Best for</td><td>APIs, data</td><td>Config files</td><td>Simple config</td><td>Documents, SOAP</td></tr>
        </tbody>
      </table>
      <p dangerouslySetInnerHTML={{ __html: s.comparisonNote }} />

      {/* Section 9: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
