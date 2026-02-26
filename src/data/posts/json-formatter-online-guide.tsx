'use client';

import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    tldr: 'A JSON formatter transforms compact, single-line JSON into readable, indented text. Use JSON.stringify(obj, null, 2) in JavaScript, json.dumps(obj, indent=2) in Python, or jq on the command line. For instant formatting without installing anything, try our free JSON Formatter tool. This guide covers prettifying, minifying, validating, JSON5/JSONC, streaming large files, editor integrations, CI/CD linting, JSON Schema, and performance benchmarks.',
    takeaway1: 'JSON formatting (pretty-printing) adds indentation and line breaks without changing the data.',
    takeaway2: 'JSON.stringify(obj, null, 2) is the built-in way to format JSON in JavaScript and TypeScript.',
    takeaway3: 'Minification strips whitespace to reduce payload size by 10-30% for production APIs.',
    takeaway4: 'Online formatters provide zero-install formatting, validation, and error detection in the browser.',
    takeaway5: 'CLI tools like jq and python -m json.tool format JSON from pipes and files instantly.',
    takeaway6: 'JSON5 and JSONC allow comments and trailing commas, but standard JSON does not.',
    takeaway7: 'For files over 100 MB, use streaming parsers (jq --stream, Python ijson, Go json.Decoder) to avoid memory issues.',
    takeaway8: 'JSON Schema validation catches structural errors beyond syntax, enforcing types, required fields, and value constraints.',

    h2_what: 'What Is JSON Formatting and Why Does It Matter?',
    what_p1: 'JSON (JavaScript Object Notation) is the universal data interchange format for web APIs, configuration files, databases, and message queues. When a REST API returns a response, the JSON payload is typically minified: all whitespace is stripped to minimize bandwidth. A response like <code>{"{\"users\":[{\"id\":1,\"name\":\"Alice\",\"roles\":[\"admin\",\"dev\"],\"settings\":{\"theme\":\"dark\",\"notifications\":true}}]}"}</code> is perfectly valid but nearly impossible to read.',
    what_p2: '<strong>JSON formatting</strong> (also called JSON prettifying, beautifying, or pretty-printing) is the process of adding consistent indentation, line breaks, and spacing to raw JSON text. The semantic content stays identical; only the visual presentation changes. This makes it possible to quickly identify nesting levels, spot missing commas, find mismatched brackets, and verify that the data structure matches your expectations.',
    what_p3: 'Whether you call it a JSON formatter, JSON beautifier, JSON prettifier, or JSON pretty-printer, the operation is the same: parse the JSON string into a data structure, then serialize it back with whitespace and indentation.',

    h2_stringify: 'JSON.stringify with Indent Parameter',
    stringify_p1: 'JavaScript and TypeScript provide a built-in method for formatting JSON. The <code>JSON.stringify()</code> function accepts three arguments: the value to serialize, an optional replacer function (or array of keys to include), and the number of spaces for indentation.',
    stringify_p2: 'The third argument controls formatting. Pass <code>2</code> for two-space indentation (the most common convention), <code>4</code> for four spaces, or <code>"\\t"</code> for tab-based indentation. When the space argument is omitted or set to <code>0</code>, the output is minified.',
    stringify_p3: 'The replacer parameter (second argument) is powerful for filtering output. You can pass an array of property names to include only specific keys, or a function that transforms values during serialization. For example, you might redact sensitive fields like passwords or API keys before logging.',

    h2_minify: 'Minification vs Prettification Trade-offs',
    minify_p1: 'Minification and prettification are two sides of the same coin. Understanding when to use each is essential for building efficient systems.',
    minify_p2: '<strong>Prettified JSON</strong> is human-readable with indentation and line breaks. Use it during development, debugging, logging (when log volume is not critical), configuration files, documentation, and code reviews. The trade-off is increased byte size: a typical 2-space indented JSON file is 10-30% larger than its minified equivalent.',
    minify_p3: '<strong>Minified JSON</strong> strips all unnecessary whitespace. Use it in production API responses, database storage, message queues, network transfers, and anywhere bandwidth or storage costs matter. Modern HTTP compression (gzip, Brotli) reduces the difference significantly, but minification still saves parsing time on the client side because the parser has fewer characters to process.',
    minify_p4: 'In practice, most systems minify JSON for wire transfer and prettify it on demand for human consumption. Your API should return minified JSON, and your debugging tools should format it on the fly.',

    h2_online: 'Online JSON Formatters vs CLI Tools',
    online_p1: 'There are two main approaches to formatting JSON: browser-based online tools and command-line tools. Each has distinct advantages.',
    online_p2: '<strong>Online formatters</strong> require zero installation. Paste your JSON, get formatted output instantly. They typically include syntax validation, error highlighting with line numbers, customizable indentation (2 spaces, 4 spaces, tabs), one-click copy, and minification mode. All processing happens client-side in JavaScript, so your data never leaves the browser.',
    online_p3: '<strong>CLI tools</strong> integrate into your existing workflow. The two most popular are jq and Python:',
    online_p4: '<strong>jq</strong> is the Swiss Army knife for JSON on the command line. Run <code>jq . file.json</code> to pretty-print with color-coded syntax highlighting. Use <code>jq -c .</code> to minify. Extract specific fields with <code>jq \'.users[0].name\'</code>. Filter arrays with <code>jq \'.items[] | select(.price > 10)\'</code>. Install via <code>brew install jq</code>, <code>apt install jq</code>, or <code>choco install jq</code>.',
    online_p5: '<strong>python -m json.tool</strong> ships with every Python installation. Run <code>cat file.json | python3 -m json.tool</code> to format and validate in one step. It reports syntax errors with line numbers. No additional installation required.',
    online_p6: 'Other CLI tools worth mentioning: <strong>fx</strong> (interactive JSON browser, <code>npm install -g fx</code>), <strong>gron</strong> (makes JSON greppable), and <strong>jless</strong> (terminal JSON viewer with vim-like navigation).',

    h2_validation: 'JSON Validation: Syntax Errors, Trailing Commas, and Comments',
    validation_p1: 'Valid JSON must follow strict syntax rules defined in RFC 8259. Common errors that break JSON parsing include:',
    validation_list1: 'Trailing commas after the last element in an object or array: <code>{"{\"a\": 1, \"b\": 2,}"}</code>',
    validation_list2: "Single quotes instead of double quotes: <code>{\"{'a': 1}\"}</code> is not valid JSON",
    validation_list3: 'Unquoted keys: <code>{"{a: 1}"}</code> must be <code>{"{\"a\": 1}"}</code>',
    validation_list4: 'Comments: JSON does not support <code>//</code> or <code>/* */</code> comments',
    validation_list5: 'Trailing characters after the root value',
    validation_list6: 'NaN, Infinity, and undefined are not valid JSON values',
    validation_list7: 'Hexadecimal numbers: <code>0xFF</code> is not valid JSON',
    validation_p2: 'When you paste invalid JSON into a formatter, the tool should report the exact error location with a line number and column. Our JSON Formatter validates your input automatically and highlights errors inline.',

    h2_json5: 'JSON5 and JSONC (JSON with Comments)',
    json5_p1: 'The strict rules of standard JSON create friction for configuration files where human readability matters. Two extensions address this:',
    json5_p2: '<strong>JSONC</strong> (JSON with Comments) adds support for single-line (<code>//</code>) and multi-line (<code>/* */</code>) comments plus trailing commas. VS Code uses JSONC for its settings files (<code>settings.json</code>, <code>tsconfig.json</code>). TypeScript configuration files are JSONC by default.',
    json5_p3: '<strong>JSON5</strong> is a superset of JSON that adds: single-line and multi-line comments, trailing commas, single-quoted strings, unquoted object keys (if valid identifiers), hexadecimal numbers, leading and trailing decimal points (<code>.5</code>, <code>5.</code>), positive Infinity, negative Infinity, NaN, and multi-line strings with backslash line continuation.',
    json5_p4: 'While these formats are convenient for configuration, they are not interchangeable with standard JSON. API endpoints should always return strict JSON. Use JSON5 or JSONC only for local configuration files that will be parsed by tools that explicitly support them.',

    h2_large: 'Formatting Large JSON Files: Streaming and Memory',
    large_p1: 'Standard JSON parsers load the entire file into memory before processing. For files under 50 MB, this works fine. For files over 100 MB or multi-gigabyte datasets, you need streaming approaches:',
    large_p2: '<strong>jq --stream</strong>: Processes JSON as a stream of path-value pairs without loading the entire document. Ideal for extracting specific fields from huge files: <code>jq --stream \'select(.[0][-1] == "name") | .[1]\' huge.json</code>.',
    large_p3: '<strong>Python ijson</strong>: An iterative JSON parser that yields items one at a time. Install with <code>pip install ijson</code>. Process millions of records with constant memory usage.',
    large_p4: '<strong>Go encoding/json Decoder</strong>: Go standard library provides <code>json.NewDecoder(reader)</code> which reads from an <code>io.Reader</code> and can process tokens incrementally using <code>Token()</code> and <code>More()</code> methods.',
    large_p5: '<strong>Node.js streams</strong>: Libraries like <code>stream-json</code> and <code>JSONStream</code> process JSON as Node.js streams, enabling processing of files larger than available memory.',
    large_p6: 'As a rule of thumb, if the JSON file is larger than 25% of your available RAM, use a streaming parser.',

    h2_editors: 'JSON Formatting in VS Code, IntelliJ, and Vim',
    editors_p1: 'Every major code editor provides built-in or plugin-based JSON formatting.',
    editors_vscode: '<strong>VS Code</strong>: Open any <code>.json</code> file and press <code>Shift+Alt+F</code> (Windows/Linux) or <code>Shift+Option+F</code> (macOS) to format. VS Code auto-detects JSON and provides syntax highlighting, bracket matching, folding, and inline error detection. Install Prettier for consistent formatting across your team. For JSONC files (like tsconfig.json), VS Code uses its built-in formatter that supports comments.',
    editors_intellij: '<strong>IntelliJ IDEA / WebStorm</strong>: Press <code>Ctrl+Alt+L</code> (Windows/Linux) or <code>Cmd+Alt+L</code> (macOS) to reformat. IntelliJ supports JSON Schema mapping, allowing autocomplete and validation against schema definitions. Configure indentation in Settings > Editor > Code Style > JSON.',
    editors_vim: '<strong>Vim / Neovim</strong>: Format JSON with an external command: <code>:%!jq .</code> formats the entire buffer using jq. Or use <code>:%!python3 -m json.tool</code>. For a plugin-based approach, install <code>vim-json</code> for syntax highlighting or use the built-in LSP with a JSON language server for validation and formatting.',
    editors_sublime: '<strong>Sublime Text</strong>: Open Command Palette (<code>Ctrl+Shift+P</code>) and select "Pretty Print (JSON)". Sublime handles very large JSON files (hundreds of MB) better than most editors.',

    h2_cicd: 'JSON Linting in CI/CD Pipelines',
    cicd_p1: 'Automated JSON validation in your CI/CD pipeline catches configuration errors before they reach production. Here are practical approaches for different environments:',
    cicd_p2: '<strong>GitHub Actions</strong>: Use <code>jq</code> to validate JSON files in a workflow step. A non-zero exit code from jq indicates invalid JSON, which fails the build.',
    cicd_p3: '<strong>Pre-commit hooks</strong>: Use the <code>pre-commit</code> framework with the <code>check-json</code> hook to validate all JSON files on every commit. This catches errors at the earliest possible stage.',
    cicd_p4: '<strong>ESLint</strong>: The <code>eslint-plugin-json</code> package validates JSON files as part of your existing JavaScript/TypeScript linting setup. It catches syntax errors, enforces consistent formatting, and can auto-fix indentation.',
    cicd_p5: '<strong>Custom scripts</strong>: A simple Node.js one-liner validates JSON: <code>node -e "JSON.parse(require(\'fs\').readFileSync(\'config.json\',\'utf8\'))"</code>. If the file is invalid, the script throws and the CI step fails.',

    h2_schema: 'JSON Schema Validation',
    schema_p1: 'JSON Schema goes beyond syntax validation. It defines the expected structure of your JSON data: what properties should exist, what types they should have, which fields are required, value constraints (min, max, pattern, enum), and nested object and array structures.',
    schema_p2: 'A JSON Schema is itself a JSON document that describes the shape of other JSON documents. It uses keywords like <code>type</code>, <code>properties</code>, <code>required</code>, <code>items</code>, <code>minLength</code>, <code>maximum</code>, <code>pattern</code>, and <code>enum</code> to express constraints.',
    schema_p3: 'Popular validation libraries include <strong>Ajv</strong> (JavaScript, the fastest JSON Schema validator), <strong>jsonschema</strong> (Python), and <strong>gojsonschema</strong> (Go). VS Code supports JSON Schema out of the box: map a schema URL to a file pattern in settings, and you get autocomplete, inline validation, and hover documentation.',
    schema_p4: 'JSON Schema is widely adopted for API documentation (OpenAPI/Swagger uses JSON Schema for request/response definitions), form generation, configuration validation, and data pipeline contracts.',

    h2_performance: 'Performance Benchmarks for Large JSON Files',
    perf_p1: 'Performance varies dramatically across JSON parsers and languages. Here are approximate benchmarks for parsing a 100 MB JSON file on modern hardware (M2 MacBook Pro, 16 GB RAM):',
    perf_header_parser: 'Parser',
    perf_header_time: 'Parse Time',
    perf_header_memory: 'Peak Memory',
    perf_row1: 'simdjson (C++/Rust)',
    perf_row1_time: '~120 ms',
    perf_row1_mem: '~200 MB',
    perf_row2: 'Go encoding/json',
    perf_row2_time: '~800 ms',
    perf_row2_mem: '~350 MB',
    perf_row3: 'Python json (CPython)',
    perf_row3_time: '~3,500 ms',
    perf_row3_mem: '~600 MB',
    perf_row4: 'Node.js JSON.parse',
    perf_row4_time: '~400 ms',
    perf_row4_mem: '~400 MB',
    perf_row5: 'jq (streaming)',
    perf_row5_time: '~2,000 ms',
    perf_row5_mem: '~50 MB',
    perf_row6: 'Python ijson (streaming)',
    perf_row6_time: '~5,000 ms',
    perf_row6_mem: '~30 MB',
    perf_p2: 'Key insight: streaming parsers use dramatically less memory at the cost of higher total processing time. For one-shot parsing where you need the full data structure in memory, V8 (Node.js/Chrome) and simdjson are fastest. For memory-constrained environments processing huge files, streaming parsers are the only viable option.',
    perf_p3: 'The formatting step itself (serializing back to indented text) typically adds 20-40% to the parse time. For a round trip (parse + format), expect roughly 1.3x the parse time.',

    h2_code_js: 'Code Example: JavaScript / TypeScript',
    code_js_comment1: '// Format JSON with 2-space indentation',
    code_js_comment2: '// Custom replacer: redact sensitive fields',
    code_js_comment3: '// Minify JSON (no whitespace)',
    code_js_comment4: '// Parse and re-format a JSON string',
    code_js_comment5: '// Sort keys alphabetically',

    h2_code_python: 'Code Example: Python',
    code_python_comment1: '# Format JSON with 2-space indentation and sorted keys',
    code_python_comment2: '# Read, format, and write a JSON file',
    code_python_comment3: '# Validate JSON from stdin',
    code_python_comment4: '# Minify a JSON file',

    h2_code_go: 'Code Example: Go',
    code_go_comment1: '// Format JSON with indentation',
    code_go_comment2: '// Streaming decoder for large files',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between a JSON formatter and a JSON validator?',
    faq1_a: 'A JSON formatter adds indentation and line breaks to make JSON readable. A JSON validator checks whether the JSON conforms to correct syntax rules (RFC 8259). Most online tools combine both: they attempt to parse the input, report errors if invalid, and format the output if valid. Our JSON Formatter tool does both automatically.',
    faq2_q: 'Does formatting change the JSON data?',
    faq2_a: 'No. Formatting only adds or removes whitespace (spaces, tabs, newlines). The semantic content, including all keys, values, arrays, objects, strings, numbers, booleans, and null values, remains identical. A minified JSON and its prettified version parse to the exact same data structure.',
    faq3_q: 'What indent size should I use for JSON?',
    faq3_a: 'Two spaces is the most common convention and is used by default in most tools (Prettier, ESLint, jq). Four spaces is also popular and provides slightly better readability for deeply nested structures. Tabs are rare in JSON but supported by JSON.stringify. Choose one and be consistent across your project.',
    faq4_q: 'Can JSON have comments?',
    faq4_a: 'Standard JSON (RFC 8259) does not support comments. However, JSONC (JSON with Comments) allows // and /* */ comments and is used by VS Code for settings files and TypeScript for tsconfig.json. JSON5 also supports comments plus additional relaxed syntax. If you need comments in configuration, use JSONC or JSON5 with a parser that supports them.',
    faq5_q: 'How do I format a large JSON file without running out of memory?',
    faq5_a: 'Use a streaming parser. On the command line, jq --stream processes JSON without loading the entire file. In Python, the ijson library parses iteratively with constant memory. In Node.js, the stream-json package processes JSON as a Node stream. In Go, json.NewDecoder reads tokens incrementally from an io.Reader.',
    faq6_q: 'What is the fastest way to validate JSON in a CI pipeline?',
    faq6_a: 'The simplest approach is a one-liner: in Node.js use node -e "JSON.parse(require(\'fs\').readFileSync(\'file.json\',\'utf8\'))", in Python use python3 -m json.tool file.json > /dev/null, or use jq . file.json > /dev/null. For comprehensive validation against a schema, use Ajv (JavaScript) or jsonschema (Python) in a dedicated validation script.',
    faq7_q: 'Is JSON5 compatible with standard JSON?',
    faq7_a: 'JSON5 is a superset of JSON: every valid JSON document is also valid JSON5. However, JSON5 features like comments, trailing commas, and unquoted keys are not valid standard JSON. You cannot send JSON5 to an API that expects standard JSON. JSON5 is designed for configuration files parsed by tools that explicitly support it.',
    faq8_q: 'How do JSON formatters handle Unicode and special characters?',
    faq8_a: 'JSON requires UTF-8 encoding. JSON formatters preserve all Unicode characters as-is. Non-ASCII characters can optionally be escaped as \\uXXXX sequences, but this is not required. The ensure_ascii parameter in Python json.dumps controls this behavior. Most modern formatters preserve Unicode characters without escaping them.',

    conclusion: 'JSON formatting is a fundamental developer skill that improves readability, debugging speed, and collaboration. Whether you use an online tool for quick formatting, jq for command-line workflows, or JSON.stringify for programmatic formatting, the key is to keep JSON minified for machines and prettified for humans. Combine formatting with validation and JSON Schema to catch both syntax and structural errors before they reach production.',
    linkToolBottom: 'Format, validate, and minify your JSON with our free online JSON Formatter.',
  },
  zh: {
    tldr: 'JSON 格式化工具将紧凑的单行 JSON 转换为可读的缩进文本。在 JavaScript 中使用 JSON.stringify(obj, null, 2)，在 Python 中使用 json.dumps(obj, indent=2)，或在命令行中使用 jq。无需安装即可使用我们的免费 JSON 格式化工具进行即时格式化。本指南涵盖美化、压缩、验证、JSON5/JSONC、大文件流式处理、编辑器集成、CI/CD 检查、JSON Schema 和性能基准测试。',
    takeaway1: 'JSON 格式化（美化打印）添加缩进和换行，但不改变数据内容。',
    takeaway2: 'JSON.stringify(obj, null, 2) 是 JavaScript 和 TypeScript 中格式化 JSON 的内置方法。',
    takeaway3: '压缩（Minification）去除空白字符，可将生产 API 的负载大小减少 10-30%。',
    takeaway4: '在线格式化工具在浏览器中提供零安装的格式化、验证和错误检测。',
    takeaway5: '命令行工具如 jq 和 python -m json.tool 可即时格式化管道和文件中的 JSON。',
    takeaway6: 'JSON5 和 JSONC 允许注释和尾随逗号，但标准 JSON 不支持。',
    takeaway7: '对于超过 100 MB 的文件，使用流式解析器（jq --stream、Python ijson、Go json.Decoder）以避免内存问题。',
    takeaway8: 'JSON Schema 验证可捕获语法之外的结构性错误，强制执行类型、必填字段和值约束。',

    h2_what: '什么是 JSON 格式化？为什么它很重要？',
    what_p1: 'JSON（JavaScript Object Notation）是 Web API、配置文件、数据库和消息队列的通用数据交换格式。当 REST API 返回响应时，JSON 负载通常是压缩的：所有空白字符都被去除以最小化带宽。',
    what_p2: '<strong>JSON 格式化</strong>（也称为 JSON 美化或 JSON 美化打印）是向原始 JSON 文本添加一致的缩进、换行和间距的过程。语义内容保持不变，只有视觉呈现发生变化。',
    what_p3: '无论你称它为 JSON 格式化器、JSON 美化器还是 JSON 美化打印器，操作都是相同的：将 JSON 字符串解析为数据结构，然后使用空白和缩进重新序列化。',

    h2_stringify: 'JSON.stringify 的缩进参数',
    stringify_p1: 'JavaScript 和 TypeScript 提供了格式化 JSON 的内置方法。<code>JSON.stringify()</code> 函数接受三个参数：要序列化的值、可选的替换函数和缩进空格数。',
    stringify_p2: '第三个参数控制格式化。传递 <code>2</code> 表示两个空格缩进（最常见的约定），<code>4</code> 表示四个空格，或 <code>"\\t"</code> 表示制表符缩进。',
    stringify_p3: '替换器参数（第二个参数）可用于过滤输出。你可以传递属性名数组来仅包含特定键，或传递函数在序列化期间转换值。',

    h2_minify: '压缩与美化的权衡',
    minify_p1: '压缩和美化是同一枚硬币的两面。理解何时使用每种方式对构建高效系统至关重要。',
    minify_p2: '<strong>美化的 JSON</strong> 具有缩进和换行，便于人类阅读。适用于开发、调试、日志记录、配置文件和代码审查。代价是字节大小增加 10-30%。',
    minify_p3: '<strong>压缩的 JSON</strong> 去除所有不必要的空白。适用于生产 API 响应、数据库存储、消息队列和网络传输。',
    minify_p4: '在实践中，大多数系统在传输时压缩 JSON，按需为人类消费美化它。',

    h2_online: '在线 JSON 格式化工具 vs 命令行工具',
    online_p1: '格式化 JSON 有两种主要方法：基于浏览器的在线工具和命令行工具。',
    online_p2: '<strong>在线格式化工具</strong>无需安装。粘贴 JSON，即时获得格式化输出。通常包括语法验证、错误高亮、可自定义缩进和一键复制。',
    online_p3: '<strong>命令行工具</strong>集成到现有工作流中。最流行的两个是 jq 和 Python：',
    online_p4: '<strong>jq</strong> 是命令行上的 JSON 瑞士军刀。运行 <code>jq . file.json</code> 进行带语法高亮的美化打印。',
    online_p5: '<strong>python -m json.tool</strong> 随每个 Python 安装附带。运行 <code>cat file.json | python3 -m json.tool</code> 一步完成格式化和验证。',
    online_p6: '其他值得一提的工具：<strong>fx</strong>（交互式 JSON 浏览器）、<strong>gron</strong>（使 JSON 可 grep）和 <strong>jless</strong>（终端 JSON 查看器）。',

    h2_validation: 'JSON 验证：语法错误、尾随逗号和注释',
    validation_p1: '有效的 JSON 必须遵循 RFC 8259 定义的严格语法规则。破坏 JSON 解析的常见错误包括：',
    validation_list1: '对象或数组最后一个元素后的尾随逗号',
    validation_list2: '使用单引号而非双引号',
    validation_list3: '未加引号的键名',
    validation_list4: '注释：JSON 不支持 // 或 /* */ 注释',
    validation_list5: '根值后的尾随字符',
    validation_list6: 'NaN、Infinity 和 undefined 不是有效的 JSON 值',
    validation_list7: '十六进制数：<code>0xFF</code> 不是有效的 JSON',
    validation_p2: '当你将无效 JSON 粘贴到格式化工具中时，工具应报告确切的错误位置。我们的 JSON 格式化工具会自动验证并内联高亮错误。',

    h2_json5: 'JSON5 和 JSONC（带注释的 JSON）',
    json5_p1: '标准 JSON 的严格规则给需要人类可读性的配置文件带来了摩擦。两个扩展解决了这个问题：',
    json5_p2: '<strong>JSONC</strong>（带注释的 JSON）添加了对单行和多行注释以及尾随逗号的支持。VS Code 将 JSONC 用于其设置文件。',
    json5_p3: '<strong>JSON5</strong> 是 JSON 的超集，添加了注释、尾随逗号、单引号字符串、未加引号的对象键等功能。',
    json5_p4: '虽然这些格式便于配置，但它们不能与标准 JSON 互换。API 端点应始终返回严格的 JSON。',

    h2_large: '格式化大型 JSON 文件：流式处理和内存',
    large_p1: '标准 JSON 解析器在处理前将整个文件加载到内存中。对于超过 100 MB 的文件，你需要流式处理方法：',
    large_p2: '<strong>jq --stream</strong>：以路径-值对流的方式处理 JSON，无需加载整个文档。',
    large_p3: '<strong>Python ijson</strong>：一次产出一个项目的迭代式 JSON 解析器。使用恒定内存处理数百万条记录。',
    large_p4: '<strong>Go encoding/json Decoder</strong>：Go 标准库提供增量读取令牌的解码器。',
    large_p5: '<strong>Node.js 流</strong>：stream-json 和 JSONStream 等库以 Node.js 流的方式处理 JSON。',
    large_p6: '经验法则：如果 JSON 文件大于可用 RAM 的 25%，使用流式解析器。',

    h2_editors: '在 VS Code、IntelliJ 和 Vim 中格式化 JSON',
    editors_p1: '每个主流代码编辑器都提供内置或基于插件的 JSON 格式化。',
    editors_vscode: '<strong>VS Code</strong>：打开 .json 文件按 <code>Shift+Alt+F</code> 格式化。支持语法高亮、括号匹配、折叠和内联错误检测。',
    editors_intellij: '<strong>IntelliJ IDEA</strong>：按 <code>Ctrl+Alt+L</code> 重新格式化。支持 JSON Schema 映射和自动补全。',
    editors_vim: '<strong>Vim</strong>：使用 <code>:%!jq .</code> 通过 jq 格式化整个缓冲区，或使用 <code>:%!python3 -m json.tool</code>。',
    editors_sublime: '<strong>Sublime Text</strong>：命令面板中选择 "Pretty Print (JSON)"。处理大文件性能优异。',

    h2_cicd: 'CI/CD 流水线中的 JSON 检查',
    cicd_p1: '在 CI/CD 流水线中自动化 JSON 验证可在配置错误到达生产环境之前捕获它们。',
    cicd_p2: '<strong>GitHub Actions</strong>：在工作流步骤中使用 jq 验证 JSON 文件。',
    cicd_p3: '<strong>Pre-commit hooks</strong>：使用 check-json hook 在每次提交时验证所有 JSON 文件。',
    cicd_p4: '<strong>ESLint</strong>：eslint-plugin-json 将 JSON 验证集成到现有的 lint 设置中。',
    cicd_p5: '<strong>自定义脚本</strong>：简单的 Node.js 单行命令即可验证 JSON。',

    h2_schema: 'JSON Schema 验证',
    schema_p1: 'JSON Schema 超越语法验证。它定义了 JSON 数据的预期结构：属性、类型、必填字段、值约束和嵌套结构。',
    schema_p2: 'JSON Schema 本身是一个 JSON 文档，使用 type、properties、required、items 等关键字表达约束。',
    schema_p3: '流行的验证库包括 <strong>Ajv</strong>（JavaScript）、<strong>jsonschema</strong>（Python）和 <strong>gojsonschema</strong>（Go）。',
    schema_p4: 'JSON Schema 广泛用于 API 文档（OpenAPI/Swagger）、表单生成、配置验证和数据管道约定。',

    h2_performance: '大型 JSON 文件性能基准测试',
    perf_p1: '不同 JSON 解析器和语言的性能差异巨大。以下是在现代硬件上解析 100 MB JSON 文件的近似基准：',
    perf_header_parser: '解析器',
    perf_header_time: '解析时间',
    perf_header_memory: '峰值内存',
    perf_row1: 'simdjson (C++/Rust)',
    perf_row1_time: '~120 ms',
    perf_row1_mem: '~200 MB',
    perf_row2: 'Go encoding/json',
    perf_row2_time: '~800 ms',
    perf_row2_mem: '~350 MB',
    perf_row3: 'Python json (CPython)',
    perf_row3_time: '~3,500 ms',
    perf_row3_mem: '~600 MB',
    perf_row4: 'Node.js JSON.parse',
    perf_row4_time: '~400 ms',
    perf_row4_mem: '~400 MB',
    perf_row5: 'jq (streaming)',
    perf_row5_time: '~2,000 ms',
    perf_row5_mem: '~50 MB',
    perf_row6: 'Python ijson (streaming)',
    perf_row6_time: '~5,000 ms',
    perf_row6_mem: '~30 MB',
    perf_p2: '关键洞察：流式解析器以更高的总处理时间为代价，显著减少内存使用。',
    perf_p3: '格式化步骤（重新序列化为缩进文本）通常在解析时间的基础上增加 20-40%。',

    h2_code_js: '代码示例：JavaScript / TypeScript',
    code_js_comment1: '// 使用 2 空格缩进格式化 JSON',
    code_js_comment2: '// 自定义替换器：隐藏敏感字段',
    code_js_comment3: '// 压缩 JSON（无空白）',
    code_js_comment4: '// 解析并重新格式化 JSON 字符串',
    code_js_comment5: '// 按字母顺序排序键',

    h2_code_python: '代码示例：Python',
    code_python_comment1: '# 使用 2 空格缩进和排序键格式化 JSON',
    code_python_comment2: '# 读取、格式化并写入 JSON 文件',
    code_python_comment3: '# 从标准输入验证 JSON',
    code_python_comment4: '# 压缩 JSON 文件',

    h2_code_go: '代码示例：Go',
    code_go_comment1: '// 使用缩进格式化 JSON',
    code_go_comment2: '// 大文件流式解码器',

    h2_faq: '常见问题',
    faq1_q: 'JSON 格式化器和 JSON 验证器有什么区别？',
    faq1_a: 'JSON 格式化器添加缩进和换行使 JSON 可读。JSON 验证器检查 JSON 是否符合正确的语法规则。大多数在线工具两者兼备：尝试解析输入，报告无效错误，有效则格式化输出。',
    faq2_q: '格式化会改变 JSON 数据吗？',
    faq2_a: '不会。格式化只添加或删除空白字符。语义内容完全相同。压缩的 JSON 和美化后的版本解析为完全相同的数据结构。',
    faq3_q: 'JSON 应该使用什么缩进大小？',
    faq3_a: '两个空格是最常见的约定，大多数工具默认使用。四个空格也很流行。选择一种并在项目中保持一致。',
    faq4_q: 'JSON 可以有注释吗？',
    faq4_a: '标准 JSON（RFC 8259）不支持注释。但 JSONC 允许 // 和 /* */ 注释，VS Code 的设置文件和 TypeScript 的 tsconfig.json 使用 JSONC。JSON5 也支持注释。',
    faq5_q: '如何格式化大型 JSON 文件而不耗尽内存？',
    faq5_a: '使用流式解析器。命令行上 jq --stream 无需加载整个文件即可处理。Python 中 ijson 库使用恒定内存迭代解析。Node.js 中 stream-json 包以流方式处理。',
    faq6_q: '在 CI 流水线中验证 JSON 最快的方法是什么？',
    faq6_a: '最简单的方法是单行命令：Node.js 中使用 JSON.parse，Python 中使用 python3 -m json.tool，或使用 jq。对于基于 Schema 的验证，使用 Ajv 或 jsonschema。',
    faq7_q: 'JSON5 与标准 JSON 兼容吗？',
    faq7_a: 'JSON5 是 JSON 的超集：每个有效的 JSON 文档也是有效的 JSON5。但 JSON5 的注释、尾随逗号等特性不是有效的标准 JSON。JSON5 设计用于配置文件。',
    faq8_q: 'JSON 格式化工具如何处理 Unicode 和特殊字符？',
    faq8_a: 'JSON 需要 UTF-8 编码。格式化工具按原样保留所有 Unicode 字符。非 ASCII 字符可选择转义为 \\uXXXX 序列。大多数现代格式化工具保留 Unicode 字符不转义。',

    conclusion: 'JSON 格式化是一项基本的开发者技能，可以提高可读性、调试速度和协作效率。无论使用在线工具快速格式化、jq 进行命令行工作流，还是 JSON.stringify 进行编程格式化，关键是为机器保持 JSON 压缩，为人类保持美化。',
    linkToolBottom: '使用我们的免费在线 JSON 格式化工具格式化、验证和压缩您的 JSON。',
  },
};

export default function JsonFormatterOnlineGuide({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

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
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          {s.tldr} <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>JSON Formatter Tool</Link>
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li><strong>{s.takeaway1}</strong></li>
          <li>{s.takeaway2}</li>
          <li>{s.takeaway3}</li>
          <li>{s.takeaway4} &mdash; <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>Try it free</Link>.</li>
          <li>{s.takeaway5}</li>
          <li>{s.takeaway6}</li>
          <li>{s.takeaway7}</li>
          <li>{s.takeaway8}</li>
        </ul>
      </div>

      {/* Section 1: What is JSON Formatting */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p3 }} />

      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
          {lang === 'zh' ? '\u2192 \u7acb\u5373\u4f7f\u7528\u6211\u4eec\u7684\u514d\u8d39 JSON \u683c\u5f0f\u5316\u5de5\u5177' : '\u2192 Try our free JSON Formatter tool now'}
        </Link>
      </p>

      {/* Section 2: JSON.stringify */}
      <h2>{s.h2_stringify}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.stringify_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.stringify_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`${s.code_js_comment1}
const data = {
  name: "Alice",
  age: 30,
  roles: ["admin", "developer"],
  settings: { theme: "dark", notifications: true }
};

// 2-space indent (most common)
console.log(JSON.stringify(data, null, 2));

// 4-space indent
console.log(JSON.stringify(data, null, 4));

// Tab indent
console.log(JSON.stringify(data, null, "\\t"));

${s.code_js_comment2}
const safeStringify = JSON.stringify(data, (key, value) => {
  if (key === "password" || key === "apiKey") return "[REDACTED]";
  return value;
}, 2);`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.stringify_p3 }} />

      {/* Section 3: Minification vs Prettification */}
      <h2>{s.h2_minify}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.minify_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.minify_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.minify_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.minify_p4 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`${s.code_js_comment3}
const minified = JSON.stringify(data);
// {"name":"Alice","age":30,"roles":["admin","developer"],...}

${s.code_js_comment4}
const raw = '{"name":"Alice","age":30}';
const parsed = JSON.parse(raw);
const pretty = JSON.stringify(parsed, null, 2);
/*
{
  "name": "Alice",
  "age": 30
}
*/`}</code>
      </pre>

      {/* Section 4: Online vs CLI */}
      <h2>{s.h2_online}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.online_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.online_p2 }} />
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>
          {lang === 'zh' ? '\u2192 \u5728\u6d4f\u89c8\u5668\u4e2d\u683c\u5f0f\u5316 JSON' : '\u2192 Format JSON in your browser'}
        </Link>
      </p>
      <p dangerouslySetInnerHTML={{ __html: s.online_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.online_p4 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`# Pretty-print with jq (color-coded output)
jq . data.json

# Minify with jq
jq -c . data.json

# Extract a specific field
jq '.users[0].name' data.json

# Filter array elements
jq '.items[] | select(.price > 10)' data.json

# Pretty-print with Python (no install needed)
python3 -m json.tool data.json

# Pipe from curl to jq
curl -s https://api.example.com/users | jq .

# Validate JSON (exit code 0 = valid, non-zero = invalid)
jq empty config.json && echo "Valid" || echo "Invalid"`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.online_p5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.online_p6 }} />

      {/* Section 5: Validation */}
      <h2>{s.h2_validation}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.validation_p1 }} />
      <ul style={{ paddingLeft: '20px' }}>
        <li dangerouslySetInnerHTML={{ __html: s.validation_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list5 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list6 }} />
        <li dangerouslySetInnerHTML={{ __html: s.validation_list7 }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: s.validation_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`// Common JSON syntax errors and their fixes

// ERROR: Trailing comma
// { "a": 1, "b": 2, }   <-- trailing comma after 2
// FIX:
{ "a": 1, "b": 2 }

// ERROR: Single quotes
// { 'name': 'Alice' }
// FIX:
{ "name": "Alice" }

// ERROR: Unquoted keys
// { name: "Alice" }
// FIX:
{ "name": "Alice" }

// ERROR: Comments
// { "debug": true  // enable debug mode }
// FIX: Remove comments or use JSONC/JSON5
{ "debug": true }

// ERROR: JavaScript values
// { "value": undefined, "count": NaN, "max": Infinity }
// FIX:
{ "value": null, "count": 0, "max": 999999 }`}</code>
      </pre>

      {/* Section 6: JSON5 and JSONC */}
      <h2>{s.h2_json5}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.json5_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.json5_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.json5_p3 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`// JSONC example (VS Code settings, tsconfig.json)
{
  // This is a single-line comment
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true, // trailing comma allowed in JSONC
  },
  /* Multi-line comment
     explaining the configuration */
  "include": ["src/**/*"],
}

// JSON5 example (more relaxed syntax)
{
  name: 'DevToolBox',       // unquoted keys, single quotes
  version: 2,
  features: [
    'formatting',
    'validation',
    'minification',         // trailing comma
  ],
  config: {
    maxFileSize: 0xFF,      // hexadecimal numbers
    ratio: .5,              // leading decimal point
    debug: true,
  },
}`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.json5_p4 }} />

      {/* Section 7: Large Files */}
      <h2>{s.h2_large}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.large_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.large_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.large_p3 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`# jq streaming: extract names from a huge array
jq --stream 'select(.[0][-1] == "name") | .[1]' huge.json

# Python ijson: iterate over items with constant memory
import ijson

with open("huge.json", "rb") as f:
    for item in ijson.items(f, "users.item"):
        print(item["name"])

# Node.js stream-json: process large JSON files
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/streamers/StreamArray");
const fs = require("fs");

fs.createReadStream("huge.json")
  .pipe(parser())
  .pipe(streamArray())
  .on("data", ({ value }) => {
    console.log(value.name);
  });`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.large_p4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.large_p5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.large_p6 }} />

      {/* Section 8: Editors */}
      <h2>{s.h2_editors}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.editors_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.editors_vscode }} />
      <p dangerouslySetInnerHTML={{ __html: s.editors_intellij }} />
      <p dangerouslySetInnerHTML={{ __html: s.editors_vim }} />
      <p dangerouslySetInnerHTML={{ __html: s.editors_sublime }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`# VS Code keyboard shortcuts for JSON
# Format document:     Shift+Alt+F (Win/Linux) / Shift+Option+F (Mac)
# Fold all:            Ctrl+K Ctrl+0
# Unfold all:          Ctrl+K Ctrl+J
# Toggle word wrap:    Alt+Z

# Vim: format entire buffer with jq
:%!jq .

# Vim: format with Python
:%!python3 -m json.tool

# Vim: format selected lines with jq
:'<,'>!jq .`}</code>
      </pre>

      {/* Section 9: CI/CD */}
      <h2>{s.h2_cicd}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.cicd_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cicd_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`# GitHub Actions: validate all JSON files
name: Validate JSON
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate JSON files
        run: |
          find . -name "*.json" -not -path "./node_modules/*" | while read f; do
            jq empty "$f" || { echo "Invalid JSON: $f"; exit 1; }
          done

# Pre-commit hook (.pre-commit-config.yaml)
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: check-json
      - id: pretty-format-json
        args: [--autofix, --indent, "2"]

# Node.js one-liner validation
node -e "JSON.parse(require('fs').readFileSync('config.json','utf8'))"

# Python validation with error details
python3 -c "
import json, sys
try:
    json.load(open(sys.argv[1]))
    print('Valid JSON')
except json.JSONDecodeError as e:
    print(f'Invalid: {e}')
    sys.exit(1)
" config.json`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.cicd_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cicd_p4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.cicd_p5 }} />

      {/* Section 10: JSON Schema */}
      <h2>{s.h2_schema}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.schema_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.schema_p2 }} />

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`// JSON Schema example
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "roles": {
      "type": "array",
      "items": { "type": "string", "enum": ["admin", "user", "editor"] },
      "minItems": 1,
      "uniqueItems": true
    }
  },
  "additionalProperties": false
}

// JavaScript: validate with Ajv
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) {
  console.error(validate.errors);
}

# Python: validate with jsonschema
from jsonschema import validate, ValidationError

try:
    validate(instance=data, schema=schema)
    print("Valid")
except ValidationError as e:
    print(f"Invalid: {e.message}")`}</code>
      </pre>

      <p dangerouslySetInnerHTML={{ __html: s.schema_p3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.schema_p4 }} />

      {/* Section 11: Performance */}
      <h2>{s.h2_performance}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.perf_p1 }} />

      <p style={{ marginTop: 12, fontSize: 15 }}>{lang === 'zh' ? '另请参阅：' : 'See also: '}<Link href={`/${lang}/blog/json-viewer-online-guide`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>JSON Viewer</Link></p>
          <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{s.perf_header_parser}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{s.perf_header_time}</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 700 }}>{s.perf_header_memory}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row1}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row1_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row1_mem}</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row2}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row2_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row2_mem}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row3}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row3_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row3_mem}</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row4}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row4_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row4_mem}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row5}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row5_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row5_mem}</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row6}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row6_time}</td>
              <td style={{ padding: '8px 14px', borderBottom: '1px solid #e2e8f0' }}>{s.perf_row6_mem}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.perf_p2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.perf_p3 }} />

      {/* Section 12: JavaScript code examples */}
      <h2>{s.h2_code_js}</h2>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`${s.code_js_comment1}
const obj = { name: "Alice", age: 30, roles: ["admin", "dev"] };
const formatted = JSON.stringify(obj, null, 2);
console.log(formatted);

${s.code_js_comment5}
const sortedKeys = JSON.stringify(obj, Object.keys(obj).sort(), 2);

${s.code_js_comment2}
function safeStringify(data) {
  return JSON.stringify(data, (key, value) => {
    const sensitiveKeys = ["password", "secret", "apiKey", "token"];
    if (sensitiveKeys.includes(key)) return "[REDACTED]";
    return value;
  }, 2);
}

${s.code_js_comment3}
const minified = JSON.stringify(obj);

${s.code_js_comment4}
function formatJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return { success: true, result: JSON.stringify(parsed, null, 2) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Format JSON in Node.js from a file
const fs = require("fs");
const raw = fs.readFileSync("data.json", "utf8");
const pretty = JSON.stringify(JSON.parse(raw), null, 2);
fs.writeFileSync("data-formatted.json", pretty);`}</code>
      </pre>

      {/* Section 13: Python code examples */}
      <h2>{s.h2_code_python}</h2>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`import json

${s.code_python_comment1}
data = {"name": "Alice", "age": 30, "roles": ["admin", "dev"]}
formatted = json.dumps(data, indent=2, sort_keys=True, ensure_ascii=False)
print(formatted)

${s.code_python_comment2}
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("data-formatted.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

${s.code_python_comment3}
import sys

def validate_json(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            json.load(f)
        print(f"{filepath}: Valid JSON")
        return True
    except json.JSONDecodeError as e:
        print(f"{filepath}: Invalid JSON at line {e.lineno}, col {e.colno}")
        print(f"  Error: {e.msg}")
        return False

${s.code_python_comment4}
def minify_json(input_path, output_path):
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, separators=(",", ":"), ensure_ascii=False)

# Command-line usage:
# python3 -m json.tool input.json > formatted.json
# python3 -m json.tool --compact input.json > minified.json`}</code>
      </pre>

      {/* Section 14: Go code examples */}
      <h2>{s.h2_code_go}</h2>

      <pre style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '14px', lineHeight: '1.5' }}>
        <code>{`package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "os"
)

${s.code_go_comment1}
func formatJSON(input []byte) (string, error) {
    var buf bytes.Buffer
    err := json.Indent(&buf, input, "", "  ")
    if err != nil {
        return "", fmt.Errorf("invalid JSON: %w", err)
    }
    return buf.String(), nil
}

${s.code_go_comment2}
func streamLargeJSON(filename string) error {
    f, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer f.Close()

    decoder := json.NewDecoder(f)

    // Read opening bracket
    _, err = decoder.Token()
    if err != nil {
        return err
    }

    // Read array elements one by one
    for decoder.More() {
        var item map[string]interface{}
        if err := decoder.Decode(&item); err != nil {
            return err
        }
        fmt.Printf("Name: %s\\n", item["name"])
    }

    return nil
}

func main() {
    raw := []byte(\`{"name":"Alice","age":30,"roles":["admin","dev"]}\`)
    formatted, err := formatJSON(raw)
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error: %v\\n", err)
        os.Exit(1)
    }
    fmt.Println(formatted)
}`}</code>
      </pre>

      {/* FAQ Section */}
      <h2>{s.h2_faq}</h2>

      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq1_q}</h3>
        <p>{s.faq1_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq2_q}</h3>
        <p>{s.faq2_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq3_q}</h3>
        <p>{s.faq3_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq4_q}</h3>
        <p>{s.faq4_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq5_q}</h3>
        <p>{s.faq5_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq6_q}</h3>
        <p>{s.faq6_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq7_q}</h3>
        <p>{s.faq7_a}</p>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.1em', marginBottom: '8px' }}>{s.faq8_q}</h3>
        <p>{s.faq8_a}</p>
      </div>

      {/* Conclusion */}
      <h2>{lang === 'zh' ? '\u603b\u7ed3' : 'Conclusion'}</h2>
      <p>{s.conclusion}</p>
      <p>
        <Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link>
      </p>
    </>
  );
}
