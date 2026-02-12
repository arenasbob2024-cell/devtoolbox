'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JSON Parse Error: Unexpected Token — How to Find & Fix It',
    intro: 'If you have ever seen <code>SyntaxError: Unexpected token</code> when parsing JSON, you are not alone. This is the single most common JSON error across JavaScript, Python, Go, and every other language. The good news: JSON syntax is simple, and the fix is almost always one of ten common mistakes. This guide shows you every error pattern, the exact fix, and the best debugging tools to prevent it from happening again.',

    h2_what: '1. What "Unexpected Token" Means in JSON',
    what_desc1: 'When a JSON parser encounters a character that violates the JSON specification, it throws an error with the position and the offending character. The error message varies by runtime:',
    what_js: '<strong>JavaScript (Browser/Node.js):</strong>',
    what_js_msg: 'SyntaxError: Unexpected token \' in JSON at position 1',
    what_py: '<strong>Python:</strong>',
    what_py_msg: 'json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)',
    what_go: '<strong>Go:</strong>',
    what_go_msg: 'invalid character \'\\\'\' looking for beginning of value',
    what_java: '<strong>Java (Jackson):</strong>',
    what_java_msg: 'com.fasterxml.jackson.core.JsonParseException: Unexpected character (\'\\\'\' (code 39)): was expecting double-quote to start field name',
    what_desc2: 'All of these messages mean the same thing: <strong>your JSON is not valid</strong>. The parser found a character that is not allowed at that position according to the JSON specification (RFC 8259).',
    what_desc3: 'JSON is stricter than JavaScript object literals. It requires double quotes for keys and strings, does not allow trailing commas, does not support comments, and only accepts a small set of value types: string, number, boolean (<code>true</code>/<code>false</code>), <code>null</code>, object, and array.',

    h2_top10: '2. Top 10 JSON Syntax Errors (With Before/After Fixes)',
    err1_title: 'Error 1: Trailing Commas',
    err1_desc: 'JSON does not allow a comma after the last item in an object or array. JavaScript does, which is why this mistake is so common.',
    err1_wrong: 'WRONG:',
    err1_right: 'FIXED:',
    err1_msg: 'Error: Unexpected token } in JSON at position 28',

    err2_title: 'Error 2: Single Quotes Instead of Double Quotes',
    err2_desc: 'JSON requires double quotes (<code>"</code>) for all strings and keys. Single quotes (<code>\'</code>) are not valid JSON.',
    err2_wrong: 'WRONG:',
    err2_right: 'FIXED:',
    err2_msg: 'Error: Unexpected token \' in JSON at position 1',

    err3_title: 'Error 3: Unquoted Keys',
    err3_desc: 'In JavaScript, object keys do not need quotes. In JSON, every key must be a double-quoted string.',
    err3_wrong: 'WRONG:',
    err3_right: 'FIXED:',
    err3_msg: 'Error: Expected property name or \'}\' in JSON at position 2',

    err4_title: 'Error 4: Comments in JSON',
    err4_desc: 'The JSON specification does not allow comments. No <code>//</code>, no <code>/* */</code>, no <code>#</code>. If you need comments, use JSONC or JSON5 (see Section 6).',
    err4_wrong: 'WRONG:',
    err4_right: 'FIXED (remove comments):',
    err4_msg: 'Error: Unexpected token / in JSON at position 2',

    err5_title: 'Error 5: undefined, NaN, Infinity',
    err5_desc: 'JSON only supports <code>null</code> as a special value. <code>undefined</code>, <code>NaN</code>, and <code>Infinity</code> are JavaScript-specific and not valid JSON.',
    err5_wrong: 'WRONG:',
    err5_right: 'FIXED:',
    err5_msg: 'Error: Unexpected token u in JSON at position 12',

    err6_title: 'Error 6: Extra/Missing Commas Between Items',
    err6_desc: 'Missing a comma between items or having a double comma both cause parse errors.',
    err6_wrong1: 'WRONG (missing comma):',
    err6_wrong2: 'WRONG (double comma):',
    err6_right: 'FIXED:',
    err6_msg: 'Error: Expected \',\' or \'}\' in JSON at position 18',

    err7_title: 'Error 7: Wrong Brackets (Mixing {} and [])',
    err7_desc: 'Using square brackets where curly braces are needed (or vice versa) is a common copy-paste error.',
    err7_wrong: 'WRONG:',
    err7_right: 'FIXED:',
    err7_msg: 'Error: Expected property name or \'}\' in JSON at position 1',

    err8_title: 'Error 8: BOM (Byte Order Mark) Character',
    err8_desc: 'Some text editors (especially on Windows) prepend an invisible UTF-8 BOM character (<code>\\uFEFF</code>) to the beginning of files. This invisible character causes JSON parsing to fail.',
    err8_wrong: 'WRONG (invisible BOM at start):',
    err8_right: 'FIXED (strip BOM before parsing):',
    err8_msg: 'Error: Unexpected token \\uFEFF in JSON at position 0',

    err9_title: 'Error 9: Incorrectly Escaped Quotes',
    err9_desc: 'Double quotes inside a JSON string must be escaped with a backslash. A bare double quote inside a string value breaks the parser.',
    err9_wrong: 'WRONG:',
    err9_right: 'FIXED:',
    err9_msg: 'Error: Unexpected token s in JSON at position 18',

    err10_title: 'Error 10: Special Characters and Control Characters',
    err10_desc: 'Newlines, tabs, and other control characters must be escaped inside JSON strings. Raw newlines within a string value are not valid.',
    err10_wrong: 'WRONG (raw newline in string):',
    err10_right: 'FIXED (use \\n escape):',
    err10_msg: 'Error: Unexpected token \\n in JSON at position 22',

    h2_debug: '3. How to Debug JSON Parse Errors',
    debug_intro: 'When you encounter a JSON parse error, these tools and techniques will help you find the exact problem.',
    h3_browser: 'Browser Console (Chrome/Firefox/Edge)',
    browser_desc: 'Paste your JSON into the browser console to get the exact error position:',
    browser_tip: 'Tip: Chrome DevTools shows the exact position number. Count characters from the beginning to find the bad character.',
    h3_nodejs: 'Node.js',
    nodejs_desc: 'Use a try/catch block to get detailed error information:',
    h3_python: 'Python (json.loads)',
    python_desc: 'Python provides the most helpful error messages, including line and column numbers:',
    h3_jq: 'jq (Command-Line)',
    jq_desc: '<code>jq</code> is a powerful command-line JSON processor. Feed it invalid JSON and it will tell you exactly where the problem is:',
    jq_tip: 'Tip: If your JSON is in a variable or comes from an API, pipe it directly to jq:',

    h2_validators: '4. JSON Validators: Tools to Catch Errors Before They Hit Production',
    validators_intro: 'Prevention is better than debugging. Use these validators in your workflow.',
    h3_online: 'Online Validators',
    online_desc: 'Paste your JSON and get instant feedback with highlighted errors:',
    online_tool1: '<strong>DevToolBox JSON Formatter</strong> — Our built-in tool validates, formats, and highlights JSON errors in real time.',
    online_tool2: '<strong>JSONLint.com</strong> — The classic online JSON validator.',
    online_tool3: '<strong>JSON Editor Online</strong> — Tree view with error highlighting.',
    h3_vscode: 'VS Code Built-in Validation',
    vscode_desc: 'VS Code automatically validates <code>.json</code> files and shows errors with red squiggly lines. No extension needed. For files that use JSON with comments (like <code>tsconfig.json</code>), VS Code uses the JSONC parser automatically.',
    vscode_tip: 'Tip: Use the "Format Document" command (<code>Shift+Alt+F</code>) to auto-format JSON. If formatting fails, your JSON has a syntax error.',
    h3_cli: 'Command-Line Validators',
    cli_desc: 'Validate JSON in your terminal or CI pipeline:',
    cli_jq: '<strong>jq .</strong> — Validates and pretty-prints. Exit code 0 means valid.',
    cli_python: '<strong>python -m json.tool</strong> — Built into Python, no installation needed.',
    cli_node: '<strong>node -e</strong> — Quick validation using Node.js.',

    h2_api: '5. Fixing JSON from APIs: Handling Edge Cases',
    api_intro: 'APIs sometimes return data that is not valid JSON. Here are common scenarios and fixes.',
    h3_html_resp: 'API Returns HTML Instead of JSON',
    html_desc: 'If the server returns an HTML error page (404, 500) instead of JSON, <code>JSON.parse()</code> fails on the first <code>&lt;</code> character.',
    html_fix: 'Fix: Check the Content-Type header and response status before parsing:',
    h3_jsonp: 'JSONP Wrapped Response',
    jsonp_desc: 'Some legacy APIs wrap JSON in a function call (<code>callback({...})</code>). Strip the wrapper before parsing:',
    h3_concat: 'Concatenated JSON / NDJSON',
    concat_desc: 'Some APIs stream multiple JSON objects separated by newlines (NDJSON / JSON Lines). Parse each line separately:',
    h3_truncated: 'Truncated JSON Response',
    truncated_desc: 'Network timeouts or response size limits can truncate JSON mid-stream, resulting in invalid JSON. Always validate before parsing:',

    h2_json5: '6. JSON5 and JSONC: When to Use Relaxed Formats',
    json5_intro: 'Sometimes strict JSON is too painful for configuration files. Two popular alternatives exist:',
    h3_jsonc: 'JSONC (JSON with Comments)',
    jsonc_desc: 'JSONC allows <code>//</code> and <code>/* */</code> comments in JSON. It is used by VS Code settings, <code>tsconfig.json</code>, and other developer tools.',
    jsonc_example_title: 'JSONC Example:',
    jsonc_parse: 'Parsing JSONC in Node.js:',
    h3_json5: 'JSON5',
    json5_desc: 'JSON5 is a superset of JSON that allows: single quotes, unquoted keys, trailing commas, comments, multiline strings, hexadecimal numbers, and more.',
    json5_example_title: 'JSON5 Example:',
    json5_parse: 'Parsing JSON5 in Node.js:',
    h3_when_use: 'When to Use Each Format',
    when_col1: 'Format',
    when_col2: 'Use When',
    when_col3: 'Do NOT Use When',
    when_json: 'JSON',
    when_json_use: 'API communication, data exchange, any machine-to-machine format',
    when_json_not: 'Config files that humans edit frequently',
    when_jsonc: 'JSONC',
    when_jsonc_use: 'Config files (tsconfig.json, VS Code settings)',
    when_jsonc_not: 'API responses or data interchange',
    when_json5: 'JSON5',
    when_json5_use: 'Human-written config files where DX matters most',
    when_json5_not: 'API responses or when standard JSON parsers are required',

    h2_faq: '7. Frequently Asked Questions',
    faq1_q: 'Why does JSON.parse() fail on valid JavaScript objects?',
    faq1_a: 'Because JSON is NOT JavaScript. JSON requires double-quoted keys and strings, does not allow trailing commas, does not support comments, undefined, functions, or any JavaScript-specific syntax. Use <code>JSON.stringify(obj)</code> to convert a JavaScript object to valid JSON.',
    faq2_q: 'How do I find the exact position of a JSON error?',
    faq2_a: 'Most parsers include the character position in the error message (e.g., "at position 42"). In VS Code, use <code>Ctrl+G</code> to jump to a line number, and count characters on that line. Online validators like JSONLint highlight the exact error location visually. Python\'s json module gives you both line and column numbers.',
    faq3_q: 'Can I use single quotes in JSON?',
    faq3_a: 'No. The JSON specification (RFC 8259) requires double quotes for all strings and property names. Single quotes are not valid JSON. If you need single-quote support, use JSON5 which allows both single and double quotes.',
    faq4_q: 'Why does my JSON file work in VS Code but fail in my application?',
    faq4_a: 'VS Code uses a JSONC parser (JSON with Comments) for many file types like <code>tsconfig.json</code> and <code>.vscode/settings.json</code>. Your application likely uses a strict JSON parser. Remove all comments and trailing commas to make it strict-JSON-compatible, or use a JSONC/JSON5 parser in your application.',
    faq5_q: 'How do I handle JSON with a BOM character?',
    faq5_a: 'Strip the BOM before parsing. In JavaScript: <code>jsonString.replace(/^\\uFEFF/, \'\')</code>. In Node.js, read the file with UTF-8 encoding and strip the BOM: <code>fs.readFileSync(path, \'utf8\').replace(/^\\uFEFF/, \'\')</code>. Most modern editors can be configured to save files without BOM.',
  },
  zh: {
    title: 'JSON 解析错误：Unexpected Token — 如何定位和修复',
    intro: '如果你曾经在解析 JSON 时看到 <code>SyntaxError: Unexpected token</code>，你并不孤单。这是 JavaScript、Python、Go 及所有其他语言中最常见的 JSON 错误。好消息是：JSON 语法很简单，修复方法几乎总是以下十种常见错误之一。本指南展示了每种错误模式、准确的修复方法，以及防止再次发生的最佳调试工具。',

    h2_what: '1. "Unexpected Token" 在 JSON 中意味着什么',
    what_desc1: '当 JSON 解析器遇到违反 JSON 规范的字符时，它会抛出一个错误，包含位置和有问题的字符。不同运行环境的错误消息略有不同：',
    what_js: '<strong>JavaScript（浏览器/Node.js）：</strong>',
    what_js_msg: 'SyntaxError: Unexpected token \' in JSON at position 1',
    what_py: '<strong>Python：</strong>',
    what_py_msg: 'json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)',
    what_go: '<strong>Go：</strong>',
    what_go_msg: 'invalid character \'\\\'\' looking for beginning of value',
    what_java: '<strong>Java (Jackson)：</strong>',
    what_java_msg: 'com.fasterxml.jackson.core.JsonParseException: Unexpected character (\'\\\'\' (code 39)): was expecting double-quote to start field name',
    what_desc2: '所有这些消息都意味着同一件事：<strong>你的 JSON 不是合法的</strong>。解析器在该位置发现了一个根据 JSON 规范（RFC 8259）不允许出现的字符。',
    what_desc3: 'JSON 比 JavaScript 对象字面量更严格。它要求键和字符串使用双引号，不允许尾随逗号，不支持注释，且只接受有限的值类型：字符串、数字、布尔值（<code>true</code>/<code>false</code>）、<code>null</code>、对象和数组。',

    h2_top10: '2. 十大 JSON 语法错误（附修复前后对比）',
    err1_title: '错误 1：尾随逗号',
    err1_desc: 'JSON 不允许在对象或数组的最后一项之后有逗号。JavaScript 允许，这就是为什么这个错误如此常见。',
    err1_wrong: '错误写法：',
    err1_right: '正确写法：',
    err1_msg: '错误信息：Unexpected token } in JSON at position 28',

    err2_title: '错误 2：使用单引号代替双引号',
    err2_desc: 'JSON 要求所有字符串和键使用双引号（<code>"</code>）。单引号（<code>\'</code>）不是合法的 JSON。',
    err2_wrong: '错误写法：',
    err2_right: '正确写法：',
    err2_msg: '错误信息：Unexpected token \' in JSON at position 1',

    err3_title: '错误 3：未加引号的键',
    err3_desc: '在 JavaScript 中，对象键不需要引号。在 JSON 中，每个键都必须是双引号字符串。',
    err3_wrong: '错误写法：',
    err3_right: '正确写法：',
    err3_msg: '错误信息：Expected property name or \'}\' in JSON at position 2',

    err4_title: '错误 4：JSON 中的注释',
    err4_desc: 'JSON 规范不允许注释。不支持 <code>//</code>、<code>/* */</code> 或 <code>#</code>。如果需要注释，请使用 JSONC 或 JSON5（见第 6 节）。',
    err4_wrong: '错误写法：',
    err4_right: '正确写法（删除注释）：',
    err4_msg: '错误信息：Unexpected token / in JSON at position 2',

    err5_title: '错误 5：undefined、NaN、Infinity',
    err5_desc: 'JSON 只支持 <code>null</code> 作为特殊值。<code>undefined</code>、<code>NaN</code> 和 <code>Infinity</code> 是 JavaScript 特有的，不是合法的 JSON。',
    err5_wrong: '错误写法：',
    err5_right: '正确写法：',
    err5_msg: '错误信息：Unexpected token u in JSON at position 12',

    err6_title: '错误 6：多余或缺失的逗号',
    err6_desc: '项目之间缺少逗号或有双逗号都会导致解析错误。',
    err6_wrong1: '错误写法（缺少逗号）：',
    err6_wrong2: '错误写法（双逗号）：',
    err6_right: '正确写法：',
    err6_msg: '错误信息：Expected \',\' or \'}\' in JSON at position 18',

    err7_title: '错误 7：括号类型错误（混淆 {} 和 []）',
    err7_desc: '在需要花括号的地方使用了方括号（或反之）是常见的复制粘贴错误。',
    err7_wrong: '错误写法：',
    err7_right: '正确写法：',
    err7_msg: '错误信息：Expected property name or \'}\' in JSON at position 1',

    err8_title: '错误 8：BOM（字节顺序标记）字符',
    err8_desc: '某些文本编辑器（特别是 Windows 上的）会在文件开头添加不可见的 UTF-8 BOM 字符（<code>\\uFEFF</code>）。这个不可见字符会导致 JSON 解析失败。',
    err8_wrong: '错误示例（开头有不可见的 BOM）：',
    err8_right: '修复方法（解析前去除 BOM）：',
    err8_msg: '错误信息：Unexpected token \\uFEFF in JSON at position 0',

    err9_title: '错误 9：引号转义不正确',
    err9_desc: 'JSON 字符串内的双引号必须用反斜杠转义。字符串值中未转义的双引号会中断解析器。',
    err9_wrong: '错误写法：',
    err9_right: '正确写法：',
    err9_msg: '错误信息：Unexpected token s in JSON at position 18',

    err10_title: '错误 10：特殊字符和控制字符',
    err10_desc: '换行符、制表符和其他控制字符必须在 JSON 字符串中进行转义。字符串值中的原始换行符不是合法的。',
    err10_wrong: '错误写法（字符串中有原始换行符）：',
    err10_right: '正确写法（使用 \\n 转义）：',
    err10_msg: '错误信息：Unexpected token \\n in JSON at position 22',

    h2_debug: '3. 如何调试 JSON 解析错误',
    debug_intro: '当你遇到 JSON 解析错误时，以下工具和技巧将帮助你找到确切的问题。',
    h3_browser: '浏览器控制台（Chrome/Firefox/Edge）',
    browser_desc: '将你的 JSON 粘贴到浏览器控制台中以获取确切的错误位置：',
    browser_tip: '提示：Chrome DevTools 显示确切的位置编号。从开头数字符以找到有问题的字符。',
    h3_nodejs: 'Node.js',
    nodejs_desc: '使用 try/catch 代码块获取详细的错误信息：',
    h3_python: 'Python（json.loads）',
    python_desc: 'Python 提供最有用的错误消息，包括行号和列号：',
    h3_jq: 'jq（命令行工具）',
    jq_desc: '<code>jq</code> 是一个强大的命令行 JSON 处理器。将无效 JSON 传递给它，它会准确告诉你问题在哪里：',
    jq_tip: '提示：如果你的 JSON 在变量中或来自 API，可以直接通过管道传递给 jq：',

    h2_validators: '4. JSON 验证器：在错误进入生产环境之前捕获它们',
    validators_intro: '预防胜于调试。在你的工作流中使用这些验证器。',
    h3_online: '在线验证器',
    online_desc: '粘贴你的 JSON，立即获得带有错误高亮的反馈：',
    online_tool1: '<strong>DevToolBox JSON Formatter</strong> — 我们的内置工具可以实时验证、格式化和高亮 JSON 错误。',
    online_tool2: '<strong>JSONLint.com</strong> — 经典的在线 JSON 验证器。',
    online_tool3: '<strong>JSON Editor Online</strong> — 带有错误高亮的树形视图。',
    h3_vscode: 'VS Code 内置验证',
    vscode_desc: 'VS Code 自动验证 <code>.json</code> 文件并用红色波浪线显示错误。无需安装扩展。对于使用带注释的 JSON 的文件（如 <code>tsconfig.json</code>），VS Code 会自动使用 JSONC 解析器。',
    vscode_tip: '提示：使用"格式化文档"命令（<code>Shift+Alt+F</code>）自动格式化 JSON。如果格式化失败，说明你的 JSON 有语法错误。',
    h3_cli: '命令行验证器',
    cli_desc: '在终端或 CI 管道中验证 JSON：',
    cli_jq: '<strong>jq .</strong> — 验证并美化打印。退出码 0 表示有效。',
    cli_python: '<strong>python -m json.tool</strong> — Python 内置，无需安装。',
    cli_node: '<strong>node -e</strong> — 使用 Node.js 快速验证。',

    h2_api: '5. 修复来自 API 的 JSON：处理边界情况',
    api_intro: 'API 有时会返回不是合法 JSON 的数据。以下是常见的场景和修复方法。',
    h3_html_resp: 'API 返回 HTML 而不是 JSON',
    html_desc: '如果服务器返回 HTML 错误页面（404、500）而不是 JSON，<code>JSON.parse()</code> 会在遇到第一个 <code>&lt;</code> 字符时失败。',
    html_fix: '修复方法：在解析之前检查 Content-Type 头和响应状态：',
    h3_jsonp: 'JSONP 包装的响应',
    jsonp_desc: '一些旧式 API 将 JSON 包装在函数调用中（<code>callback({...})</code>）。在解析前去除包装：',
    h3_concat: '拼接的 JSON / NDJSON',
    concat_desc: '一些 API 流式传输多个以换行符分隔的 JSON 对象（NDJSON / JSON Lines）。需要逐行解析：',
    h3_truncated: '被截断的 JSON 响应',
    truncated_desc: '网络超时或响应大小限制可能会在传输途中截断 JSON，导致无效的 JSON。在解析之前始终进行验证：',

    h2_json5: '6. JSON5 和 JSONC：何时使用宽松格式',
    json5_intro: '有时严格的 JSON 对配置文件来说太痛苦了。有两种流行的替代方案：',
    h3_jsonc: 'JSONC（带注释的 JSON）',
    jsonc_desc: 'JSONC 允许在 JSON 中使用 <code>//</code> 和 <code>/* */</code> 注释。它被 VS Code 设置、<code>tsconfig.json</code> 和其他开发者工具使用。',
    jsonc_example_title: 'JSONC 示例：',
    jsonc_parse: '在 Node.js 中解析 JSONC：',
    h3_json5: 'JSON5',
    json5_desc: 'JSON5 是 JSON 的超集，允许：单引号、不带引号的键、尾随逗号、注释、多行字符串、十六进制数字等。',
    json5_example_title: 'JSON5 示例：',
    json5_parse: '在 Node.js 中解析 JSON5：',
    h3_when_use: '何时使用各种格式',
    when_col1: '格式',
    when_col2: '适用场景',
    when_col3: '不适用场景',
    when_json: 'JSON',
    when_json_use: 'API 通信、数据交换、任何机器对机器格式',
    when_json_not: '需要人工频繁编辑的配置文件',
    when_jsonc: 'JSONC',
    when_jsonc_use: '配置文件（tsconfig.json、VS Code 设置）',
    when_jsonc_not: 'API 响应或数据交换',
    when_json5: 'JSON5',
    when_json5_use: '以开发者体验为优先的人工编写配置文件',
    when_json5_not: 'API 响应或需要标准 JSON 解析器的场景',

    h2_faq: '7. 常见问题',
    faq1_q: '为什么 JSON.parse() 对有效的 JavaScript 对象解析失败？',
    faq1_a: '因为 JSON 不是 JavaScript。JSON 要求双引号的键和字符串，不允许尾随逗号，不支持注释、undefined、函数或任何 JavaScript 特有的语法。使用 <code>JSON.stringify(obj)</code> 将 JavaScript 对象转换为有效的 JSON。',
    faq2_q: '如何找到 JSON 错误的准确位置？',
    faq2_a: '大多数解析器在错误消息中包含字符位置（例如"at position 42"）。在 VS Code 中，使用 <code>Ctrl+G</code> 跳转到行号，然后在该行上数字符。像 JSONLint 这样的在线验证器会直观地高亮显示确切的错误位置。Python 的 json 模块同时提供行号和列号。',
    faq3_q: '可以在 JSON 中使用单引号吗？',
    faq3_a: '不可以。JSON 规范（RFC 8259）要求所有字符串和属性名使用双引号。单引号不是合法的 JSON。如果你需要单引号支持，可以使用 JSON5，它同时允许单引号和双引号。',
    faq4_q: '为什么我的 JSON 文件在 VS Code 中可以用，但在应用中失败？',
    faq4_a: 'VS Code 对许多文件类型使用 JSONC 解析器（带注释的 JSON），如 <code>tsconfig.json</code> 和 <code>.vscode/settings.json</code>。你的应用程序可能使用的是严格的 JSON 解析器。删除所有注释和尾随逗号使其兼容严格 JSON，或者在你的应用中使用 JSONC/JSON5 解析器。',
    faq5_q: '如何处理带有 BOM 字符的 JSON？',
    faq5_a: '在解析之前去除 BOM。在 JavaScript 中：<code>jsonString.replace(/^\\uFEFF/, \'\')</code>。在 Node.js 中，使用 UTF-8 编码读取文件并去除 BOM：<code>fs.readFileSync(path, \'utf8\').replace(/^\\uFEFF/, \'\')</code>。大多数现代编辑器都可以配置为保存不带 BOM 的文件。',
  },
};

export default function JsonParseError({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1_q, acceptedAnswer: { '@type': 'Answer', text: t.faq1_a } },
      { '@type': 'Question', name: t.faq2_q, acceptedAnswer: { '@type': 'Answer', text: t.faq2_a } },
      { '@type': 'Question', name: t.faq3_q, acceptedAnswer: { '@type': 'Answer', text: t.faq3_a } },
      { '@type': 'Question', name: t.faq4_q, acceptedAnswer: { '@type': 'Answer', text: t.faq4_a } },
      { '@type': 'Question', name: t.faq5_q, acceptedAnswer: { '@type': 'Answer', text: t.faq5_a } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* Section 1: What Unexpected Token Means */}
      <h2>{t.h2_what}</h2>
      <p>{t.what_desc1}</p>

      <p dangerouslySetInnerHTML={{ __html: t.what_js }} />
      <pre><code>{t.what_js_msg}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.what_py }} />
      <pre><code>{t.what_py_msg}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.what_go }} />
      <pre><code>{t.what_go_msg}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.what_java }} />
      <pre><code>{t.what_java_msg}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: t.what_desc2 }} />
      <p dangerouslySetInnerHTML={{ __html: t.what_desc3 }} />

      {/* Section 2: Top 10 JSON Syntax Errors */}
      <h2>{t.h2_top10}</h2>

      {/* Error 1: Trailing Commas */}
      <h3>{t.err1_title}</h3>
      <p>{t.err1_desc}</p>
      <p><strong>{t.err1_wrong}</strong></p>
      <pre><code>{`{
  "name": "Alice",
  "age": 30,
}`}</code></pre>
      <p><em>{t.err1_msg}</em></p>
      <p><strong>{t.err1_right}</strong></p>
      <pre><code>{`{
  "name": "Alice",
  "age": 30
}`}</code></pre>

      {/* Error 2: Single Quotes */}
      <h3>{t.err2_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.err2_desc }} />
      <p><strong>{t.err2_wrong}</strong></p>
      <pre><code>{`{'name': 'Alice', 'age': 30}`}</code></pre>
      <p><em>{t.err2_msg}</em></p>
      <p><strong>{t.err2_right}</strong></p>
      <pre><code>{`{"name": "Alice", "age": 30}`}</code></pre>

      {/* Error 3: Unquoted Keys */}
      <h3>{t.err3_title}</h3>
      <p>{t.err3_desc}</p>
      <p><strong>{t.err3_wrong}</strong></p>
      <pre><code>{`{name: "Alice", age: 30}`}</code></pre>
      <p><em>{t.err3_msg}</em></p>
      <p><strong>{t.err3_right}</strong></p>
      <pre><code>{`{"name": "Alice", "age": 30}`}</code></pre>

      {/* Error 4: Comments */}
      <h3>{t.err4_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.err4_desc }} />
      <p><strong>{t.err4_wrong}</strong></p>
      <pre><code>{`{
  // This is a comment
  "name": "Alice",
  /* multi-line
     comment */
  "age": 30
}`}</code></pre>
      <p><em>{t.err4_msg}</em></p>
      <p><strong>{t.err4_right}</strong></p>
      <pre><code>{`{
  "name": "Alice",
  "age": 30
}`}</code></pre>

      {/* Error 5: undefined, NaN, Infinity */}
      <h3>{t.err5_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.err5_desc }} />
      <p><strong>{t.err5_wrong}</strong></p>
      <pre><code>{`{
  "value": undefined,
  "score": NaN,
  "limit": Infinity
}`}</code></pre>
      <p><em>{t.err5_msg}</em></p>
      <p><strong>{t.err5_right}</strong></p>
      <pre><code>{`{
  "value": null,
  "score": 0,
  "limit": 9999999
}`}</code></pre>

      {/* Error 6: Extra/Missing Commas */}
      <h3>{t.err6_title}</h3>
      <p>{t.err6_desc}</p>
      <p><strong>{t.err6_wrong1}</strong></p>
      <pre><code>{`{
  "name": "Alice"
  "age": 30
}`}</code></pre>
      <p><strong>{t.err6_wrong2}</strong></p>
      <pre><code>{`{
  "name": "Alice",,
  "age": 30
}`}</code></pre>
      <p><em>{t.err6_msg}</em></p>
      <p><strong>{t.err6_right}</strong></p>
      <pre><code>{`{
  "name": "Alice",
  "age": 30
}`}</code></pre>

      {/* Error 7: Wrong Brackets */}
      <h3>{t.err7_title}</h3>
      <p>{t.err7_desc}</p>
      <p><strong>{t.err7_wrong}</strong></p>
      <pre><code>{`["name": "Alice", "age": 30]`}</code></pre>
      <p><em>{t.err7_msg}</em></p>
      <p><strong>{t.err7_right}</strong></p>
      <pre><code>{`{"name": "Alice", "age": 30}`}</code></pre>

      {/* Error 8: BOM Character */}
      <h3>{t.err8_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.err8_desc }} />
      <p><strong>{t.err8_wrong}</strong></p>
      <pre><code>{`\\uFEFF{"name": "Alice"}   ← invisible BOM character before {`}</code></pre>
      <p><em>{t.err8_msg}</em></p>
      <p><strong>{t.err8_right}</strong></p>
      <pre><code>{`// JavaScript: strip BOM before parsing
const clean = jsonString.replace(/^\\uFEFF/, '');
const data = JSON.parse(clean);

// Node.js: read file and strip BOM
const fs = require('fs');
const raw = fs.readFileSync('data.json', 'utf8');
const data = JSON.parse(raw.replace(/^\\uFEFF/, ''));`}</code></pre>

      {/* Error 9: Escaped Quotes */}
      <h3>{t.err9_title}</h3>
      <p>{t.err9_desc}</p>
      <p><strong>{t.err9_wrong}</strong></p>
      <pre><code>{`{"message": "She said "hello" to me"}`}</code></pre>
      <p><em>{t.err9_msg}</em></p>
      <p><strong>{t.err9_right}</strong></p>
      <pre><code>{`{"message": "She said \\"hello\\" to me"}`}</code></pre>

      {/* Error 10: Special Characters */}
      <h3>{t.err10_title}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.err10_desc }} />
      <p><strong>{t.err10_wrong}</strong></p>
      <pre><code>{`{"message": "line one
line two"}`}</code></pre>
      <p><em>{t.err10_msg}</em></p>
      <p><strong>{t.err10_right}</strong></p>
      <pre><code>{`{"message": "line one\\nline two"}`}</code></pre>

      {/* Section 3: How to Debug */}
      <h2>{t.h2_debug}</h2>
      <p>{t.debug_intro}</p>

      <h3>{t.h3_browser}</h3>
      <p>{t.browser_desc}</p>
      <pre><code>{`// Paste this in your browser console:
try {
  JSON.parse('{"name": "Alice",}');
} catch (e) {
  console.error(e.message);
  // → "Expected double-quoted property name in JSON at position 17"
}`}</code></pre>
      <p><em>{t.browser_tip}</em></p>

      <h3>{t.h3_nodejs}</h3>
      <p>{t.nodejs_desc}</p>
      <pre><code>{`const fs = require('fs');

try {
  const raw = fs.readFileSync('config.json', 'utf8');
  const data = JSON.parse(raw);
} catch (err) {
  console.error('JSON parse failed:', err.message);
  // Shows: "Unexpected token , in JSON at position 42"

  // Extract the position and show surrounding context
  const pos = err.message.match(/position (\\d+)/);
  if (pos) {
    const p = parseInt(pos[1]);
    const raw = fs.readFileSync('config.json', 'utf8');
    console.error('Context:', raw.substring(p - 20, p + 20));
    console.error('         ' + ' '.repeat(20) + '^');
  }
}`}</code></pre>

      <h3>{t.h3_python}</h3>
      <p>{t.python_desc}</p>
      <pre><code>{`import json

raw = """{"name": "Alice", "age": 30,}"""

try:
    data = json.loads(raw)
except json.JSONDecodeError as e:
    print(f"Error: {e.msg}")
    print(f"Line: {e.lineno}, Column: {e.colno}")
    print(f"Character position: {e.pos}")
    # Output:
    # Error: Expecting property name enclosed in double quotes
    # Line: 1, Column: 29
    # Character position: 28`}</code></pre>

      <h3>{t.h3_jq}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.jq_desc }} />
      <pre><code>{`# Validate a JSON file
$ jq . config.json
# If valid: pretty-printed output
# If invalid: parse error at line X, column Y

# Validate inline JSON
$ echo '{"name": "Alice",}' | jq .
# parse error (Invalid numeric literal) at line 1, column 19`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.jq_tip }} />
      <pre><code>{`# Validate JSON from an API response
$ curl -s https://api.example.com/data | jq .

# Validate JSON from a shell variable
$ echo "$MY_JSON_VAR" | jq .`}</code></pre>

      {/* Section 4: JSON Validators */}
      <h2>{t.h2_validators}</h2>
      <p>{t.validators_intro}</p>

      <h3>{t.h3_online}</h3>
      <p>{t.online_desc}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t.online_tool1 }} />
        <li dangerouslySetInnerHTML={{ __html: t.online_tool2 }} />
        <li dangerouslySetInnerHTML={{ __html: t.online_tool3 }} />
      </ul>

      <h3>{t.h3_vscode}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.vscode_desc }} />
      <p dangerouslySetInnerHTML={{ __html: t.vscode_tip }} />

      <h3>{t.h3_cli}</h3>
      <p>{t.cli_desc}</p>
      <pre><code>{`# jq — validate and pretty-print
$ jq . data.json

# Python built-in
$ python -m json.tool data.json

# Node.js one-liner
$ node -e "JSON.parse(require('fs').readFileSync('data.json','utf8'))"

# Validate multiple files in a directory
$ for f in *.json; do echo -n "$f: "; jq . "$f" > /dev/null 2>&1 && echo "OK" || echo "INVALID"; done`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: t.cli_jq }} />
      <p dangerouslySetInnerHTML={{ __html: t.cli_python }} />
      <p dangerouslySetInnerHTML={{ __html: t.cli_node }} />

      {/* Section 5: Fixing JSON from APIs */}
      <h2>{t.h2_api}</h2>
      <p>{t.api_intro}</p>

      <h3>{t.h3_html_resp}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.html_desc }} />
      <p>{t.html_fix}</p>
      <pre><code>{`async function fetchJSON(url) {
  const response = await fetch(url);

  // Check status first
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
  }

  // Check Content-Type header
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(
      \`Expected JSON but got \${contentType}: \${text.substring(0, 100)}...\`
    );
  }

  return response.json();
}`}</code></pre>

      <h3>{t.h3_jsonp}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.jsonp_desc }} />
      <pre><code>{`// JSONP response: callback({"name": "Alice", "age": 30})
function parseJSONP(jsonpString) {
  // Strip the function wrapper
  const match = jsonpString.match(/^[a-zA-Z_][a-zA-Z0-9_]*\\((.*)\\);?$/s);
  if (match) {
    return JSON.parse(match[1]);
  }
  // If no wrapper found, try parsing as regular JSON
  return JSON.parse(jsonpString);
}`}</code></pre>

      <h3>{t.h3_concat}</h3>
      <p>{t.concat_desc}</p>
      <pre><code>{`// NDJSON: one JSON object per line
const ndjson = \`{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}
{"id":3,"name":"Charlie"}\`;

const objects = ndjson
  .split('\\n')
  .filter(line => line.trim())
  .map(line => JSON.parse(line));

console.log(objects);
// [{id:1,name:"Alice"}, {id:2,name:"Bob"}, {id:3,name:"Charlie"}]`}</code></pre>

      <h3>{t.h3_truncated}</h3>
      <p>{t.truncated_desc}</p>
      <pre><code>{`function safeJSONParse(text) {
  try {
    return { data: JSON.parse(text), error: null };
  } catch (err) {
    return {
      data: null,
      error: {
        message: err.message,
        position: err.message.match(/position (\\d+)/)?.[1],
        preview: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      }
    };
  }
}

// Usage
const result = safeJSONParse(apiResponse);
if (result.error) {
  console.error('Invalid JSON:', result.error.message);
  console.error('First 200 chars:', result.error.preview);
}`}</code></pre>

      {/* Section 6: JSON5 and JSONC */}
      <h2>{t.h2_json5}</h2>
      <p>{t.json5_intro}</p>

      <h3>{t.h3_jsonc}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.jsonc_desc }} />
      <p><strong>{t.jsonc_example_title}</strong></p>
      <pre><code>{`{
  // Database configuration
  "host": "localhost",
  "port": 5432,

  /* Credentials — loaded from env in production */
  "username": "dev_user",
  "password": "dev_pass",

  // Enable query logging in development
  "logging": true
}`}</code></pre>
      <p><strong>{t.jsonc_parse}</strong></p>
      <pre><code>{`// Using the 'jsonc-parser' package (used by VS Code internally)
const { parse } = require('jsonc-parser');

const jsoncString = fs.readFileSync('config.jsonc', 'utf8');
const config = parse(jsoncString);

// Or strip comments manually with a regex (simplified, not production-ready)
function stripJsonComments(str) {
  return str
    .replace(/\\/\\/.*$/gm, '')          // Remove single-line comments
    .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '');  // Remove multi-line comments
}`}</code></pre>

      <h3>{t.h3_json5}</h3>
      <p>{t.json5_desc}</p>
      <p><strong>{t.json5_example_title}</strong></p>
      <pre><code>{`{
  // JSON5 allows all of this:
  unquotedKey: 'single quotes are fine',
  trailingComma: true,
  hexValue: 0xFF,
  leadingDot: .5,
  multiline: 'line one \\
line two',
  infinity: Infinity,
  nan: NaN,
}`}</code></pre>
      <p><strong>{t.json5_parse}</strong></p>
      <pre><code>{`// npm install json5
const JSON5 = require('json5');

const config = JSON5.parse(fs.readFileSync('config.json5', 'utf8'));

// JSON5 can also stringify
const str = JSON5.stringify(config, null, 2);`}</code></pre>

      <h3>{t.h3_when_use}</h3>
      <table>
        <thead>
          <tr>
            <th>{t.when_col1}</th>
            <th>{t.when_col2}</th>
            <th>{t.when_col3}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t.when_json}</strong></td>
            <td>{t.when_json_use}</td>
            <td>{t.when_json_not}</td>
          </tr>
          <tr>
            <td><strong>{t.when_jsonc}</strong></td>
            <td>{t.when_jsonc_use}</td>
            <td>{t.when_jsonc_not}</td>
          </tr>
          <tr>
            <td><strong>{t.when_json5}</strong></td>
            <td>{t.when_json5_use}</td>
            <td>{t.when_json5_not}</td>
          </tr>
        </tbody>
      </table>

      {/* Section 7: FAQ */}
      <h2>{t.h2_faq}</h2>

      <h3>{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />

      <h3>{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />

      <h3>{t.faq3_q}</h3>
      <p>{t.faq3_a}</p>

      <h3>{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />

      <h3>{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />
    </>
  );
}
