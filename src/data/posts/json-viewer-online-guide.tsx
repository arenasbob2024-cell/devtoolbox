'use client';
import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    tldr_title: 'TL;DR',
    tldr: 'A JSON viewer transforms raw JSON text into an interactive, navigable tree structure that lets you explore deeply nested data without losing context. Tree views with collapse/expand, search, and JSONPath querying are the fastest way to understand complex API responses, debug configuration files, and inspect large datasets. Use our free online JSON viewer tool for instant tree visualization, path copying, and node filtering -- no installation required.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'Tree view is the most effective way to explore nested JSON -- collapse nodes you do not need and expand the ones you do, maintaining context at every level.',
    takeaway2: 'JSONPath expressions ($.store.book[*].author) let you query specific values from large JSON documents without manual navigation.',
    takeaway3: 'Chrome and Firefox DevTools include built-in JSON viewers in the Network tab preview, but dedicated tools offer search, filtering, and path copying.',
    takeaway4: 'Command-line tools like jq, fx, and gron transform JSON exploration into scriptable workflows for automation and CI/CD pipelines.',
    takeaway5: 'For JSON files larger than 50 MB, use streaming parsers (ijson, JSONStream) or lazy-loading viewers to avoid browser memory issues.',
    takeaway6: 'Always sanitize JSON before sharing -- API responses often contain tokens, session IDs, and personally identifiable information.',
    link_tool: 'Try our free JSON Viewer / Tree tool',

    h2_what: 'What Is a JSON Viewer and Why You Need One',
    what_p1: 'A <strong>JSON viewer</strong> is a tool that parses raw JSON text and renders it as a structured, interactive display -- typically a collapsible tree. While JSON is human-readable by design, real-world JSON from APIs, databases, and configuration files is often deeply nested, minified into a single line, or spans thousands of lines. Reading such data in plain text is impractical.',
    what_p2: 'A JSON viewer solves this by providing <strong>visual hierarchy</strong> (color-coded types, indentation, and expand/collapse controls), <strong>search and filter</strong> capabilities to locate specific keys or values, and <strong>path display</strong> showing the exact JSONPath to any selected node. These features turn JSON from an opaque wall of text into an explorable data structure.',
    what_p3: 'Common scenarios where a JSON viewer is essential:',
    what_list1: '<strong>API debugging</strong>: Inspecting REST or GraphQL responses to verify the response structure matches your expectations.',
    what_list2: '<strong>Configuration files</strong>: Navigating complex configs for Kubernetes, Terraform, or application settings with hundreds of nested keys.',
    what_list3: '<strong>Data analysis</strong>: Exploring JSON datasets exported from databases, analytics platforms, or third-party APIs.',
    what_list4: '<strong>Troubleshooting</strong>: Finding a specific field buried deep in a large JSON payload during production debugging.',
    what_list5: '<strong>Learning and documentation</strong>: Understanding the structure of an unfamiliar API by visually exploring its response format.',

    h2_views: 'JSON Tree View vs Text View vs Table View',
    views_p1: 'JSON viewers typically offer multiple display modes, each suited to different tasks. Understanding when to use each mode makes you more productive.',
    h3_tree: 'Tree View (Hierarchical)',
    tree_p1: 'The <strong>tree view</strong> renders JSON as a collapsible hierarchy, similar to a file explorer. Objects and arrays become expandable nodes, while primitive values (strings, numbers, booleans, null) are leaf nodes. Tree view is the default and most popular mode because it preserves the natural structure of JSON while letting you focus on specific branches.',
    tree_p2: 'Best for: exploring unfamiliar data structures, navigating deeply nested objects, understanding parent-child relationships, and copying JSONPath expressions for use in code.',
    h3_text: 'Text View (Raw / Formatted)',
    text_p1: 'The <strong>text view</strong> shows JSON as formatted (pretty-printed) plain text with syntax highlighting. This is the classic view offered by every JSON formatter. Text view is best when you need to see the raw data, copy entire sections, or make manual edits. Most text views support line numbers, bracket matching, and search within the text.',
    text_p2: 'Best for: quick formatting of minified JSON, copying raw data, comparing small documents side by side, and editing JSON directly.',
    h3_table: 'Table View (Tabular)',
    table_p1: 'The <strong>table view</strong> renders JSON arrays of objects as rows and columns, similar to a spreadsheet. Each object becomes a row, and each unique key becomes a column header. This view is powerful when your JSON contains homogeneous data -- like a list of users, products, or log entries.',
    table_p2: 'Best for: analyzing arrays of similar objects, sorting and filtering by column values, exporting to CSV, and comparing records across rows.',
    views_comparison_title: 'Comparison of JSON View Modes',

    h2_navigate: 'Navigating Large JSON Files: Search, Filter, and Collapse',
    navigate_p1: 'When dealing with JSON files containing thousands or millions of nodes, efficient navigation is critical. Modern JSON viewers provide several features to help you find what you need quickly.',
    h3_search: 'Search by Key or Value',
    search_p1: 'The most basic navigation tool is full-text search. Enter a key name (like <code>email</code>) or a value (like <code>admin</code>) and the viewer highlights all matching nodes. Advanced viewers support regex search, case-sensitive matching, and filtering to show only matching nodes while hiding everything else.',
    search_p2: 'Search tips for large JSON files:',
    search_tip1: 'Search for key names first to understand the structure, then search for specific values.',
    search_tip2: 'Use regex patterns to match partial values: <code>user.*admin</code> finds keys or values containing "user" followed by "admin".',
    search_tip3: 'Filter mode (show only matches) is more useful than highlight mode for very large files.',
    h3_collapse: 'Collapse and Expand Controls',
    collapse_p1: 'Collapse and expand controls let you manage the visible depth of the tree. Common operations include:',
    collapse_list1: '<strong>Collapse all</strong>: Reduces the entire tree to its top-level keys, giving you an overview of the structure.',
    collapse_list2: '<strong>Expand to level N</strong>: Expands the tree to a specific depth (e.g., level 2 shows top-level objects and their immediate children).',
    collapse_list3: '<strong>Expand this branch</strong>: Expands only the selected node and its children, keeping the rest collapsed.',
    collapse_list4: '<strong>Toggle siblings</strong>: Expands or collapses all sibling nodes at the same level.',
    h3_path: 'Path Display and Copy',
    path_p1: 'When you click a node in the tree, the viewer displays the <strong>full JSONPath</strong> to that node. For example, clicking the "email" field of the second user in an array shows <code>$.users[1].email</code>. This path can be copied with a single click and used directly in code with JSONPath libraries or jq queries.',

    h2_jsonpath: 'JSONPath: Querying JSON Data',
    jsonpath_p1: 'JSONPath is a query language for JSON, analogous to XPath for XML. It lets you extract specific values from a JSON document using dot notation and bracket expressions. While JSON viewers help you navigate visually, JSONPath lets you query programmatically.',
    jsonpath_p2: 'Here are the most common JSONPath expressions:',
    jsonpath_p3: 'JSONPath is supported by libraries in every major language: <code>jsonpath-ng</code> (Python), <code>jsonpath-plus</code> (JavaScript/Node.js), <code>JsonPath</code> (Java by Jayway), and <code>GJson</code> (Go). Our JSON Viewer tool lets you test JSONPath expressions interactively and see the matched results.',

    h2_devtools: 'JSON Viewer in Browser DevTools',
    devtools_p1: 'Chrome, Firefox, Edge, and Safari all include built-in JSON viewers in their Developer Tools. These are often the fastest way to inspect JSON from API calls during development.',
    h3_chrome: 'Chrome DevTools',
    chrome_p1: 'In Chrome, open DevTools (F12 or Cmd+Option+I), go to the <strong>Network</strong> tab, click on an API request, and select the <strong>Preview</strong> subtab. Chrome renders JSON responses as a collapsible tree. You can also use the <strong>Console</strong> tab to format any JSON object:',
    chrome_p2: 'Chrome tips: right-click a node in the tree to copy the value, property name, or path. Use <code>copy()</code> in the Console to copy large objects to clipboard. You can also store a response as a global variable for further exploration.',
    h3_firefox: 'Firefox DevTools',
    firefox_p1: 'Firefox provides a dedicated <strong>JSON viewer</strong> that activates automatically when you navigate to a URL returning <code>application/json</code>. It offers tree view, raw data view, and a header panel. Firefox also includes a built-in JSONPath-like filter in the search bar of the JSON viewer.',
    firefox_p2: 'Firefox tip: navigate directly to an API endpoint URL and Firefox renders the JSON response with its built-in viewer, no extensions needed.',

    h2_extensions: 'JSON Viewer Extensions and Desktop Tools',
    extensions_p1: 'While browser DevTools cover basic viewing, dedicated tools offer advanced features like JSONPath querying, schema validation, diff comparison, and handling of very large files.',
    h3_jq: 'jq -- The Command-Line JSON Processor',
    jq_p1: '<code>jq</code> is the most widely used command-line tool for processing JSON. It can format, filter, transform, and query JSON data using a concise expression language. Install via <code>brew install jq</code> (macOS), <code>apt install jq</code> (Ubuntu), or <code>choco install jq</code> (Windows).',
    jq_p2: 'Common jq patterns for viewing JSON:',
    h3_fx: 'fx -- Interactive JSON Viewer for Terminal',
    fx_p1: '<code>fx</code> is an interactive JSON viewer for the terminal. Unlike jq, which outputs results and exits, fx provides a fully navigable tree in your terminal with expand/collapse, search, and JavaScript expression evaluation. Install via <code>npm install -g fx</code> or <code>brew install fx</code>.',
    h3_gron: 'gron -- Make JSON greppable',
    gron_p1: '<code>gron</code> transforms JSON into discrete assignments, one per line, making it trivially greppable with standard Unix tools. This is incredibly useful when you know what value you are looking for but not where it lives in the structure.',

    h2_api: 'Working with API Responses (REST and GraphQL)',
    api_p1: 'JSON viewers are indispensable when working with API responses. REST APIs return JSON by default, and GraphQL responses are always JSON. Here are practical workflows for inspecting API data.',
    h3_rest: 'Inspecting REST API Responses',
    rest_p1: 'The typical workflow is to make a request with curl or Postman, then pipe the response into a viewer. Our online JSON viewer accepts pasted JSON or fetched URLs:',
    rest_p2: 'When debugging REST APIs, pay attention to:',
    rest_list1: '<strong>Response structure</strong>: verify nested objects and arrays match your expected schema.',
    rest_list2: '<strong>Pagination metadata</strong>: check for <code>next</code>, <code>previous</code>, <code>total</code>, and <code>page</code> fields.',
    rest_list3: '<strong>Error responses</strong>: API errors often contain <code>code</code>, <code>message</code>, and <code>details</code> fields with debugging information.',
    rest_list4: '<strong>Null vs missing fields</strong>: null values and omitted keys have different semantics in most APIs.',
    h3_graphql: 'Inspecting GraphQL Responses',
    graphql_p1: 'GraphQL responses always follow the structure <code>{"data": {...}, "errors": [...]}</code>. The <code>data</code> field mirrors the query shape, making it predictable. Common inspection tasks include verifying that nested connections (edges/nodes) return the correct depth, checking for partial errors in the <code>errors</code> array, and validating that field aliases resolved correctly.',

    h2_schema: 'JSON Schema Validation While Viewing',
    schema_p1: 'JSON Schema defines the expected structure, types, and constraints of a JSON document. Combining a JSON viewer with schema validation lets you not only see the data but verify it conforms to your expectations.',
    schema_p2: 'A JSON Schema specifies which fields are required, what types they must be, allowed ranges for numbers, regex patterns for strings, and the structure of nested objects and arrays. When a viewer validates against a schema, it can highlight violations directly in the tree:',
    schema_list1: '<strong>Missing required fields</strong> are flagged with a warning icon or red highlight.',
    schema_list2: '<strong>Type mismatches</strong> (e.g., string where number expected) are underlined.',
    schema_list3: '<strong>Pattern violations</strong> (e.g., email not matching regex) show the expected pattern.',
    schema_list4: '<strong>Additional properties</strong> not defined in the schema can be highlighted as unexpected.',
    schema_p3: 'Popular JSON Schema validation libraries include <code>ajv</code> (JavaScript, the fastest), <code>jsonschema</code> (Python), and <code>json-schema-validator</code> (Java). Our JSON viewer integrates with JSON Schema to provide real-time validation feedback as you explore the data.',

    h2_large: 'Handling Large JSON Files',
    large_p1: 'Standard JSON viewers load the entire document into memory, which works fine for files up to a few megabytes. But modern applications often produce JSON files that are 50 MB, 500 MB, or even several gigabytes. Handling these files requires different strategies.',
    h3_streaming: 'Streaming Parsers',
    streaming_p1: 'Instead of loading the entire file into memory, streaming (SAX-style) parsers process the JSON token by token. This keeps memory usage constant regardless of file size. Key streaming libraries:',
    streaming_list1: '<strong>Python</strong>: <code>ijson</code> provides an iterator interface over JSON tokens. Use <code>ijson.items(file, "users.item")</code> to iterate over array elements without loading the full array.',
    streaming_list2: '<strong>Node.js</strong>: <code>JSONStream</code> provides a streaming parser that emits events for matched paths. Pipe a readable stream through <code>JSONStream.parse("users.*")</code> to process each user object individually.',
    streaming_list3: '<strong>Command line</strong>: <code>jq --stream</code> enables streaming mode, processing the file as a sequence of path-value pairs instead of loading it entirely.',
    h3_lazy: 'Lazy Loading in JSON Viewers',
    lazy_p1: 'Web-based JSON viewers can implement lazy loading by only rendering visible nodes and fetching deeper levels on demand. This technique, similar to virtual scrolling in long lists, keeps the browser responsive even with millions of nodes.',
    lazy_p2: 'When working with very large JSON in our online viewer: paste or upload the file, and the tree initially renders only the top-level nodes. Expanding a node fetches and renders only its immediate children, keeping DOM size manageable.',
    h3_tips: 'Performance Tips for Large JSON',
    tips_list1: '<strong>Use jq to pre-filter</strong>: extract only the section you need before loading into a viewer: <code>jq ".data.results[:100]" huge-file.json > subset.json</code>.',
    tips_list2: '<strong>Split large arrays</strong>: use <code>jq -c ".[]" large-array.json</code> to output one object per line (JSON Lines format) for processing with standard Unix tools.',
    tips_list3: '<strong>Use JSON Lines (JSONL)</strong>: for datasets, store one JSON object per line. This allows line-by-line processing without parsing the entire file.',
    tips_list4: '<strong>Avoid browser viewers for files over 100 MB</strong>: use command-line tools (jq, fx, gron) which handle large files more efficiently than web-based viewers.',

    h2_security: 'JSON Security: Sensitive Data and Tokens',
    security_p1: 'JSON data from APIs and logs often contains sensitive information that should never be shared, logged, or exposed publicly. Being aware of these risks is critical when using online JSON viewers or sharing formatted JSON with colleagues.',
    security_list1: '<strong>API tokens and keys</strong>: Authorization headers, API keys, and bearer tokens frequently appear in JSON responses or request logs. Never paste JSON containing tokens into public online tools.',
    security_list2: '<strong>Session and refresh tokens</strong>: OAuth tokens, JWTs, and session identifiers in JSON responses can be used to impersonate users.',
    security_list3: '<strong>Personally identifiable information (PII)</strong>: names, email addresses, phone numbers, IP addresses, and physical addresses in API responses must be handled carefully.',
    security_list4: '<strong>Database connection strings</strong>: configuration JSON files may contain database URLs with embedded credentials.',
    security_list5: '<strong>Internal URLs and endpoints</strong>: JSON from internal APIs may expose internal service URLs, port numbers, and infrastructure details.',
    security_p2: '<strong>Best practices for safe JSON viewing</strong>:',
    security_safe1: 'Use a local or offline JSON viewer for sensitive data -- our tool processes everything in your browser and never sends data to any server.',
    security_safe2: 'Redact sensitive fields before sharing: replace token values with placeholder text like <code>"[REDACTED]"</code>.',
    security_safe3: 'Use <code>jq</code> to strip sensitive fields before sharing: <code>jq "del(.auth, .tokens, .secrets)" response.json</code>.',
    security_safe4: 'Never commit raw API responses containing tokens to version control. Add <code>*.json</code> response dumps to your <code>.gitignore</code>.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best online JSON viewer?',
    faq1_a: 'The best online JSON viewer provides an interactive tree view with collapse/expand, full-text search, JSONPath support, path copying, and syntax highlighting. It should process data locally in the browser for security and support large files without freezing. Our free DevToolBox JSON Viewer checks all these boxes and works instantly without registration.',
    faq2_q: 'How do I view a large JSON file without crashing the browser?',
    faq2_a: 'For files under 50 MB, paste them into a JSON viewer with lazy loading that only renders visible nodes. For larger files, use command-line tools like jq (for querying and filtering), fx (for interactive terminal browsing), or gron (for grep-friendly output). Pre-filter the JSON with jq to extract only the section you need before loading into a browser-based viewer.',
    faq3_q: 'What is the difference between a JSON viewer and a JSON formatter?',
    faq3_a: 'A JSON formatter takes minified or badly formatted JSON and adds proper indentation and line breaks (pretty-printing). A JSON viewer goes further by rendering the data as an interactive tree with collapse/expand, search, path display, and sometimes schema validation. Most JSON viewers include formatting as a baseline feature.',
    faq4_q: 'How do I use JSONPath to query JSON data?',
    faq4_a: 'JSONPath uses dot notation and bracket expressions to navigate JSON structures. The root is represented by $. Use dot notation for object keys ($.store.book), bracket notation for array indices ($[0]), and wildcards for all elements ($.store.book[*].author). Libraries like jsonpath-ng (Python) and jsonpath-plus (JavaScript) implement the full JSONPath specification.',
    faq5_q: 'Can I view JSON in Chrome without any extension?',
    faq5_a: 'Yes. Chrome DevTools (F12) shows JSON responses in a collapsible tree in the Network tab Preview panel. You can also type JSON.stringify(yourObject, null, 2) in the Console to format any JavaScript object. However, navigating directly to a JSON URL in Chrome shows raw text by default. For automatic formatting of JSON URLs, you need a browser extension.',
    faq6_q: 'Is it safe to paste sensitive JSON into an online viewer?',
    faq6_a: 'It depends on the tool. Our DevToolBox JSON Viewer processes everything locally in your browser using JavaScript and never transmits your data to any server. However, many online tools send data to their servers for processing. For sensitive data containing API tokens, credentials, or PII, always use a local or client-side-only viewer, or use command-line tools like jq.',
    faq7_q: 'What is jq and how does it compare to an online JSON viewer?',
    faq7_a: 'jq is a command-line JSON processor that can format, filter, transform, and query JSON using a concise expression language. It excels at scripting, automation, and handling very large files. An online JSON viewer provides a visual, interactive experience with point-and-click navigation. Use jq for automation and large files, and an online viewer for quick visual exploration and debugging.',
    faq8_q: 'How do I convert JSON tree view to a flat structure?',
    faq8_a: 'To flatten nested JSON into a flat key-value structure, use gron (which outputs path=value assignments), jq with path expressions (jq "[path(..)|strings] as $p | getpath($p) as $v | {($p|join(\".\")): $v}"), or JavaScript libraries like flat (npm: flat). Flattening is useful for search, comparison, and importing into spreadsheet or database formats.',

    conclusion: 'A good JSON viewer transforms the experience of working with JSON data from frustrating text scrolling to intuitive visual exploration. Whether you use our online tool for quick debugging, Chrome DevTools for API development, or jq for command-line automation, mastering JSON viewing tools will save you significant time every day. Bookmark this guide and keep your JSON workflows efficient and secure.',
    link_tool_bottom: 'View, explore, and navigate JSON data instantly with our free online tool.',
  },
  zh: {
    tldr_title: 'TL;DR',
    tldr: 'JSON 查看器将原始 JSON 文本转换为交互式、可导航的树状结构，让你在不丢失上下文的情况下探索深层嵌套数据。带有折叠/展开、搜索和 JSONPath 查询功能的树视图是理解复杂 API 响应、调试配置文件和检查大型数据集的最快方式。使用我们的免费在线 JSON 查看器工具，即时实现树状可视化、路径复制和节点过滤，无需安装。',
    takeaways_title: '核心要点',
    takeaway1: '树视图是探索嵌套 JSON 最有效的方式 -- 折叠不需要的节点，展开需要的节点，在每个层级保持上下文。',
    takeaway2: 'JSONPath 表达式（$.store.book[*].author）让你无需手动导航即可从大型 JSON 文档中查询特定值。',
    takeaway3: 'Chrome 和 Firefox DevTools 在网络标签预览中内置了 JSON 查看器，但专用工具提供搜索、过滤和路径复制功能。',
    takeaway4: '命令行工具如 jq、fx 和 gron 将 JSON 探索转变为可脚本化的自动化工作流。',
    takeaway5: '对于超过 50 MB 的 JSON 文件，使用流式解析器（ijson、JSONStream）或延迟加载查看器以避免浏览器内存问题。',
    takeaway6: '分享前务必清理 JSON -- API 响应通常包含令牌、会话 ID 和个人身份信息。',
    link_tool: '试用我们的免费 JSON 查看器/树工具',
    h2_what: '什么是 JSON 查看器，为什么需要它',
    what_p1: '<strong>JSON 查看器</strong>是一种工具，它解析原始 JSON 文本并将其渲染为结构化的交互式显示（通常是可折叠的树）。虽然 JSON 设计上是人类可读的，但来自 API、数据库和配置文件的实际 JSON 通常嵌套很深、压缩成一行或跨越数千行。以纯文本方式阅读这样的数据是不切实际的。',
    what_p2: 'JSON 查看器通过提供<strong>视觉层次结构</strong>（颜色编码类型、缩进和展开/折叠控件）、<strong>搜索和过滤</strong>功能以及<strong>路径显示</strong>来解决这个问题，显示到任何选定节点的精确 JSONPath。',
    what_p3: 'JSON 查看器必不可少的常见场景：',
    what_list1: '<strong>API 调试</strong>：检查 REST 或 GraphQL 响应以验证响应结构是否符合预期。',
    what_list2: '<strong>配置文件</strong>：导航具有数百个嵌套键的 Kubernetes、Terraform 或应用程序设置的复杂配置。',
    what_list3: '<strong>数据分析</strong>：探索从数据库、分析平台或第三方 API 导出的 JSON 数据集。',
    what_list4: '<strong>故障排除</strong>：在生产调试期间查找深藏在大型 JSON 负载中的特定字段。',
    what_list5: '<strong>学习和文档</strong>：通过视觉探索不熟悉的 API 的响应格式来了解其结构。',
    h2_views: 'JSON 树视图 vs 文本视图 vs 表格视图',
    views_p1: 'JSON 查看器通常提供多种显示模式，每种适合不同的任务。',
    h3_tree: '树视图（层次结构）',
    tree_p1: '<strong>树视图</strong>将 JSON 渲染为可折叠的层次结构。对象和数组成为可展开的节点，原始值是叶节点。树视图是最流行的模式，因为它保留了 JSON 的自然结构。',
    tree_p2: '最适合：探索不熟悉的数据结构、导航深层嵌套对象、理解父子关系、复制 JSONPath 表达式。',
    h3_text: '文本视图（原始/格式化）',
    text_p1: '<strong>文本视图</strong>将 JSON 显示为带语法高亮的格式化纯文本。适合查看原始数据、复制整个部分或手动编辑。',
    text_p2: '最适合：快速格式化压缩的 JSON、复制原始数据、并排比较小文档、直接编辑 JSON。',
    h3_table: '表格视图（表格化）',
    table_p1: '<strong>表格视图</strong>将对象数组的 JSON 渲染为行和列，类似电子表格。当 JSON 包含同质数据时，这种视图非常强大。',
    table_p2: '最适合：分析相似对象的数组、按列值排序和过滤、导出为 CSV、跨行比较记录。',
    views_comparison_title: 'JSON 视图模式对比',
    h2_navigate: '导航大型 JSON 文件：搜索、过滤和折叠',
    navigate_p1: '处理包含数千或数百万节点的 JSON 文件时，高效导航至关重要。',
    h3_search: '按键或值搜索',
    search_p1: '最基本的导航工具是全文搜索。输入键名或值，查看器会高亮所有匹配的节点。高级查看器支持正则搜索和过滤模式。',
    search_p2: '大型 JSON 文件的搜索技巧：',
    search_tip1: '先搜索键名了解结构，再搜索特定值。',
    search_tip2: '使用正则模式匹配部分值：<code>user.*admin</code>。',
    search_tip3: '对于非常大的文件，过滤模式（仅显示匹配项）比高亮模式更有用。',
    h3_collapse: '折叠和展开控件',
    collapse_p1: '折叠和展开控件让你管理树的可见深度：',
    collapse_list1: '<strong>全部折叠</strong>：将整个树缩减为顶层键。',
    collapse_list2: '<strong>展开到第 N 层</strong>：将树展开到特定深度。',
    collapse_list3: '<strong>展开此分支</strong>：仅展开选定节点及其子节点。',
    collapse_list4: '<strong>切换兄弟节点</strong>：展开或折叠同一层级的所有兄弟节点。',
    h3_path: '路径显示和复制',
    path_p1: '点击树中的节点时，查看器显示该节点的完整 JSONPath。例如 <code>$.users[1].email</code>。此路径可一键复制，直接用于 JSONPath 库或 jq 查询。',
    h2_jsonpath: 'JSONPath：查询 JSON 数据',
    jsonpath_p1: 'JSONPath 是 JSON 的查询语言，类似于 XML 的 XPath。它使用点表示法和括号表达式从 JSON 文档中提取特定值。',
    jsonpath_p2: '最常用的 JSONPath 表达式：',
    jsonpath_p3: 'JSONPath 在各主要语言中都有库支持：jsonpath-ng（Python）、jsonpath-plus（JavaScript）、JsonPath（Java）和 GJson（Go）。',
    h2_devtools: '浏览器 DevTools 中的 JSON 查看器',
    devtools_p1: 'Chrome、Firefox、Edge 和 Safari 的开发者工具都内置了 JSON 查看器。这些通常是在开发过程中检查 API 调用中 JSON 的最快方式。',
    h3_chrome: 'Chrome DevTools',
    chrome_p1: '在 Chrome 中，打开 DevTools（F12），转到网络标签，点击 API 请求，选择预览子标签。Chrome 将 JSON 响应渲染为可折叠树。也可在控制台中使用：',
    chrome_p2: 'Chrome 技巧：右键点击树中的节点可复制值、属性名或路径。在控制台中使用 <code>copy()</code> 将大对象复制到剪贴板。',
    h3_firefox: 'Firefox DevTools',
    firefox_p1: 'Firefox 提供专用的 JSON 查看器，当你导航到返回 <code>application/json</code> 的 URL 时自动激活。',
    firefox_p2: 'Firefox 技巧：直接导航到 API 端点 URL，Firefox 会用内置查看器渲染 JSON 响应。',
    h2_extensions: 'JSON 查看器扩展和桌面工具',
    extensions_p1: '虽然浏览器 DevTools 涵盖基本查看，但专用工具提供高级功能如 JSONPath 查询、模式验证、差异比较和处理超大文件。',
    h3_jq: 'jq -- 命令行 JSON 处理器',
    jq_p1: '<code>jq</code> 是最广泛使用的命令行 JSON 处理工具。安装：<code>brew install jq</code>（macOS）、<code>apt install jq</code>（Ubuntu）或 <code>choco install jq</code>（Windows）。',
    jq_p2: '常用 jq 查看 JSON 的模式：',
    h3_fx: 'fx -- 终端交互式 JSON 查看器',
    fx_p1: '<code>fx</code> 是终端中的交互式 JSON 查看器。不同于 jq 输出结果后退出，fx 在终端中提供完全可导航的树。安装：<code>npm install -g fx</code>。',
    h3_gron: 'gron -- 让 JSON 可 grep',
    gron_p1: '<code>gron</code> 将 JSON 转换为离散赋值语句，每行一个，使其可用标准 Unix 工具 grep。当你知道要找的值但不知道它在结构中的位置时非常有用。',
    h2_api: '处理 API 响应（REST 和 GraphQL）',
    api_p1: '在处理 API 响应时 JSON 查看器不可或缺。REST API 默认返回 JSON，GraphQL 响应始终是 JSON。',
    h3_rest: '检查 REST API 响应',
    rest_p1: '典型工作流是用 curl 或 Postman 发起请求，然后将响应导入查看器。',
    rest_p2: '调试 REST API 时注意：',
    rest_list1: '<strong>响应结构</strong>：验证嵌套对象和数组是否符合预期的 schema。',
    rest_list2: '<strong>分页元数据</strong>：检查 next、previous、total 和 page 字段。',
    rest_list3: '<strong>错误响应</strong>：API 错误通常包含 code、message 和 details 字段。',
    rest_list4: '<strong>null vs 缺失字段</strong>：null 值和省略的键在大多数 API 中有不同语义。',
    h3_graphql: '检查 GraphQL 响应',
    graphql_p1: 'GraphQL 响应始终遵循 <code>{"data": {...}, "errors": [...]}</code> 结构。常见检查任务包括验证嵌套连接返回正确深度、检查 errors 数组中的部分错误、验证字段别名是否正确解析。',
    h2_schema: '查看时进行 JSON Schema 验证',
    schema_p1: 'JSON Schema 定义 JSON 文档的预期结构、类型和约束。将 JSON 查看器与 schema 验证结合，不仅可以查看数据，还可以验证其是否符合预期。',
    schema_p2: 'JSON Schema 指定哪些字段是必需的、类型、数字范围、字符串的正则模式以及嵌套结构。',
    schema_list1: '<strong>缺失必需字段</strong>以警告图标或红色高亮标记。',
    schema_list2: '<strong>类型不匹配</strong>（如预期数字却是字符串）以下划线标记。',
    schema_list3: '<strong>模式违规</strong>（如邮箱不匹配正则）显示预期模式。',
    schema_list4: '<strong>额外属性</strong>（schema 中未定义的）可高亮为意外属性。',
    schema_p3: '流行的 JSON Schema 验证库包括 ajv（JavaScript）、jsonschema（Python）和 json-schema-validator（Java）。',
    h2_large: '处理大型 JSON 文件',
    large_p1: '标准 JSON 查看器将整个文档加载到内存中，对几 MB 的文件没问题。但现代应用经常产生 50 MB、500 MB 甚至几 GB 的 JSON 文件。',
    h3_streaming: '流式解析器',
    streaming_p1: '流式解析器逐个令牌处理 JSON，内存使用保持恒定：',
    streaming_list1: '<strong>Python</strong>：<code>ijson</code> 提供迭代器接口。',
    streaming_list2: '<strong>Node.js</strong>：<code>JSONStream</code> 提供流式解析器。',
    streaming_list3: '<strong>命令行</strong>：<code>jq --stream</code> 启用流模式。',
    h3_lazy: 'JSON 查看器中的延迟加载',
    lazy_p1: '基于 Web 的 JSON 查看器可以通过仅渲染可见节点、按需获取更深层级来实现延迟加载。',
    lazy_p2: '在我们的在线查看器中处理超大 JSON 时：粘贴或上传文件，树最初只渲染顶层节点。展开节点时仅渲染其直接子节点。',
    h3_tips: '大型 JSON 性能技巧',
    tips_list1: '<strong>用 jq 预过滤</strong>：加载到查看器前只提取需要的部分。',
    tips_list2: '<strong>分割大数组</strong>：用 <code>jq -c ".[]"</code> 每行输出一个对象（JSON Lines 格式）。',
    tips_list3: '<strong>使用 JSON Lines (JSONL)</strong>：每行存储一个 JSON 对象，允许逐行处理。',
    tips_list4: '<strong>100 MB 以上的文件避免使用浏览器查看器</strong>：使用命令行工具（jq、fx、gron）。',
    h2_security: 'JSON 安全：敏感数据和令牌',
    security_p1: '来自 API 和日志的 JSON 数据经常包含不应共享、记录或公开暴露的敏感信息。',
    security_list1: '<strong>API 令牌和密钥</strong>：Authorization 头、API 密钥和 Bearer 令牌经常出现在 JSON 响应中。',
    security_list2: '<strong>会话和刷新令牌</strong>：OAuth 令牌、JWT 和会话标识符可被用于冒充用户。',
    security_list3: '<strong>个人身份信息（PII）</strong>：姓名、邮箱、电话号码、IP 地址。',
    security_list4: '<strong>数据库连接字符串</strong>：配置 JSON 可能包含带凭据的数据库 URL。',
    security_list5: '<strong>内部 URL 和端点</strong>：内部 API 的 JSON 可能暴露内部服务 URL 和端口。',
    security_p2: '<strong>安全查看 JSON 的最佳实践</strong>：',
    security_safe1: '敏感数据使用本地或离线 JSON 查看器 -- 我们的工具在浏览器中处理所有内容，不会将数据发送到任何服务器。',
    security_safe2: '分享前编辑敏感字段：用 <code>"[REDACTED]"</code> 替换令牌值。',
    security_safe3: '使用 jq 在分享前删除敏感字段：<code>jq "del(.auth, .tokens, .secrets)" response.json</code>。',
    security_safe4: '不要将包含令牌的原始 API 响应提交到版本控制。将 <code>*.json</code> 响应转储添加到 <code>.gitignore</code>。',
    h2_faq: '常见问题',
    faq1_q: '最好的在线 JSON 查看器是什么？',
    faq1_a: '最好的在线 JSON 查看器提供交互式树视图（折叠/展开）、全文搜索、JSONPath 支持、路径复制和语法高亮。它应在浏览器中本地处理数据以确保安全，并支持大文件。我们的免费 DevToolBox JSON 查看器满足所有这些要求。',
    faq2_q: '如何查看大型 JSON 文件而不导致浏览器崩溃？',
    faq2_a: '50 MB 以下的文件粘贴到带延迟加载的 JSON 查看器。更大的文件使用命令行工具如 jq、fx 或 gron。用 jq 预过滤只提取需要的部分。',
    faq3_q: 'JSON 查看器和 JSON 格式化工具有什么区别？',
    faq3_a: 'JSON 格式化工具将压缩的 JSON 添加缩进和换行。JSON 查看器更进一步，将数据渲染为交互式树，支持折叠/展开、搜索、路径显示，有时还有 schema 验证。',
    faq4_q: '如何使用 JSONPath 查询 JSON 数据？',
    faq4_a: 'JSONPath 使用点表示法和括号表达式导航 JSON 结构。根用 $ 表示，点表示法访问对象键（$.store.book），括号表示法访问数组索引（$[0]），通配符匹配所有元素（$.store.book[*].author）。',
    faq5_q: '不装扩展可以在 Chrome 中查看 JSON 吗？',
    faq5_a: '可以。Chrome DevTools（F12）在网络标签预览面板中以可折叠树显示 JSON 响应。也可在控制台中输入 JSON.stringify(yourObject, null, 2) 格式化任何对象。',
    faq6_q: '将敏感 JSON 粘贴到在线查看器安全吗？',
    faq6_a: '取决于工具。我们的 DevToolBox JSON 查看器在浏览器中使用 JavaScript 本地处理所有内容，不会将数据传输到任何服务器。对于包含 API 令牌或 PII 的敏感数据，始终使用本地或仅客户端的查看器。',
    faq7_q: 'jq 是什么？与在线 JSON 查看器相比如何？',
    faq7_a: 'jq 是命令行 JSON 处理器，擅长脚本编写、自动化和处理超大文件。在线 JSON 查看器提供可视化的交互体验。自动化和大文件用 jq，快速可视化探索用在线查看器。',
    faq8_q: '如何将 JSON 树视图转换为扁平结构？',
    faq8_a: '使用 gron（输出 path=value 赋值语句）、jq 的 path 表达式或 JavaScript 库 flat。扁平化对搜索、比较和导入电子表格格式很有用。',
    conclusion: '好的 JSON 查看器将处理 JSON 数据的体验从令人沮丧的文本滚动转变为直观的可视化探索。无论你使用我们的在线工具快速调试、Chrome DevTools 进行 API 开发，还是 jq 进行命令行自动化，掌握 JSON 查看工具将每天为你节省大量时间。',
    link_tool_bottom: '使用我们的免费在线工具即时查看、探索和导航 JSON 数据。',
  },
};

export default function JsonViewerOnlineGuide({ lang }: { lang: string }) {
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

      <p><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 1: What Is a JSON Viewer */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.what_p1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.what_p2 }} />
      <p>{s.what_p3}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.what_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.what_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.what_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.what_list4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.what_list5 }} />
      </ul>

      {/* Section 2: Tree View vs Text View vs Table View */}
      <h2>{s.h2_views}</h2>
      <p>{s.views_p1}</p>

      <h3>{s.h3_tree}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.tree_p1 }} />
      <p>{s.tree_p2}</p>

      <h3>{s.h3_text}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.text_p1 }} />
      <p>{s.text_p2}</p>

      <h3>{s.h3_table}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.table_p1 }} />
      <p>{s.table_p2}</p>

      {/* View Modes Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Tree View</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Text View</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Table View</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Navigation', 'Click to expand/collapse', 'Scroll through text', 'Sort columns, paginate'],
              ['Best Data Shape', 'Any JSON structure', 'Any JSON structure', 'Arrays of objects'],
              ['Nested Data', 'Excellent (native)', 'Good (with indentation)', 'Poor (flat only)'],
              ['Search', 'Filter by key/value', 'Ctrl+F text search', 'Column filtering'],
              ['Copy Path', 'Yes (JSONPath)', 'Manual selection', 'N/A'],
              ['Editing', 'Limited', 'Full text editing', 'Cell editing'],
              ['Large Files', 'Good (lazy loading)', 'Fair (virtual scroll)', 'Good (pagination)'],
            ].map(([feature, tree, text, table], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{feature}</td>
                <td style={{ padding: '8px 12px' }}>{tree}</td>
                <td style={{ padding: '8px 12px' }}>{text}</td>
                <td style={{ padding: '8px 12px' }}>{table}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Navigating Large JSON Files */}
      <h2>{s.h2_navigate}</h2>
      <p>{s.navigate_p1}</p>

      <h3>{s.h3_search}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.search_p1 }} />
      <p>{s.search_p2}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li>{s.search_tip1}</li>
        <li dangerouslySetInnerHTML={{ __html: s.search_tip2 }} />
        <li>{s.search_tip3}</li>
      </ul>

      <h3>{s.h3_collapse}</h3>
      <p>{s.collapse_p1}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.collapse_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.collapse_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.collapse_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.collapse_list4 }} />
      </ul>

      <h3>{s.h3_path}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.path_p1 }} />

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 4: JSONPath */}
      <h2>{s.h2_jsonpath}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsonpath_p1 }} />
      <p>{s.jsonpath_p2}</p>

      <p style={{ marginTop: 12, fontSize: 15 }}>{lang === 'zh' ? '另请参阅：' : 'See also: '}<Link href={`/${lang}/blog/json-formatter-online-guide`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>JSON Formatter</Link></p>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Expression</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Description</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['$', 'Root object', '$ (the entire document)'],
              ['$.key', 'Child property', '$.name (top-level "name" field)'],
              ['$.parent.child', 'Nested property', '$.address.city'],
              ['$[0]', 'Array index', '$.users[0] (first user)'],
              ['$[*]', 'All array elements', '$.users[*] (every user)'],
              ['$.users[*].name', 'Property of all elements', 'All user names'],
              ['$..key', 'Recursive descent', '$..email (all "email" fields at any depth)'],
              ['$[?(@.active)]', 'Filter expression', 'All elements where active is truthy'],
              ['$[0:5]', 'Array slice', 'First 5 elements'],
              ['$[?(@.price < 10)]', 'Comparison filter', 'Elements where price < 10'],
            ].map(([expr, desc, example], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: 13 }}>{expr}</td>
                <td style={{ padding: '8px 12px' }}>{desc}</td>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>{example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p dangerouslySetInnerHTML={{ __html: s.jsonpath_p3 }} />

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSONPath usage examples with sample JSON
// Given this JSON document:
{
  "store": {
    "book": [
      { "category": "fiction", "author": "Orwell", "title": "1984", "price": 8.99 },
      { "category": "fiction", "author": "Tolkien", "title": "The Hobbit", "price": 12.99 },
      { "category": "science", "author": "Hawking", "title": "A Brief History", "price": 9.99 }
    ],
    "bicycle": {
      "color": "red",
      "price": 199.95
    }
  }
}

// JSONPath queries:
$.store.book[*].author       // ["Orwell", "Tolkien", "Hawking"]
$.store.book[0].title        // "1984"
$.store.book[?(@.price<10)]  // [{...1984}, {...Brief History}]
$..price                     // [8.99, 12.99, 9.99, 199.95]
$.store.book[-1:]            // [{...Brief History}] (last book)`}</code></pre>

      {/* Section 5: Browser DevTools */}
      <h2>{s.h2_devtools}</h2>
      <p>{s.devtools_p1}</p>

      <h3>{s.h3_chrome}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.chrome_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Chrome DevTools Console - useful JSON commands

// Pretty print any JavaScript object
console.log(JSON.stringify(myObject, null, 2));

// Copy formatted JSON to clipboard
copy(JSON.stringify(myObject, null, 2));

// Store a network response as a global variable:
// 1. Network tab > right-click response > "Store as global variable"
// 2. This creates temp1, temp2, etc. in Console
// 3. Explore: temp1.data.users[0]

// Parse JSON string in console
const data = JSON.parse('{"name":"test","count":42}');

// Filter object keys
Object.keys(data).filter(k => k.startsWith('user'));

// Get all values at a path
data.items?.map(item => item.name);`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.chrome_p2 }} />

      <h3>{s.h3_firefox}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.firefox_p1 }} />
      <p>{s.firefox_p2}</p>

      {/* Section 6: Extensions and Desktop Tools */}
      <h2>{s.h2_extensions}</h2>
      <p>{s.extensions_p1}</p>

      <h3>{s.h3_jq}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.jq_p1 }} />
      <p>{s.jq_p2}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Pretty print JSON (most basic use)
cat response.json | jq '.'

# Extract a specific field
cat response.json | jq '.data.users[0].name'

# Get all names from an array
cat response.json | jq '.users[].name'

# Filter array elements
cat response.json | jq '.users[] | select(.role == "admin")'

# Format API response inline
curl -s https://api.example.com/users | jq '.'

# Extract and reshape data
curl -s https://api.example.com/users | jq '[.[] | {name: .name, email: .email}]'

# Count array elements
cat response.json | jq '.users | length'

# Get unique values
cat response.json | jq '[.users[].department] | unique'

# Flatten nested arrays
cat response.json | jq '[.departments[].employees[]]'`}</code></pre>

      <h3>{s.h3_fx}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.fx_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Interactive terminal JSON viewer
cat response.json | fx

# Apply JavaScript expression
cat response.json | fx '.users.map(u => u.name)'

# Pipe from curl
curl -s https://api.example.com/data | fx

# fx keybindings in interactive mode:
# Enter  - expand/collapse node
# e      - expand all
# E      - collapse all
# /      - search
# .      - show JSONPath of current node
# y      - copy current node to clipboard`}</code></pre>

      <h3>{s.h3_gron}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.gron_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Transform JSON to greppable format
$ echo '{"name":"Alice","roles":["admin","user"],"address":{"city":"NYC"}}' | gron
json = {};
json.address = {};
json.address.city = "NYC";
json.name = "Alice";
json.roles = [];
json.roles[0] = "admin";
json.roles[1] = "user";

# Now grep for what you need
$ cat huge-response.json | gron | grep "email"
json.users[0].email = "alice@example.com";
json.users[1].email = "bob@example.com";
json.users[2].contacts.email = "charlie@example.com";

# Reverse gron output back to JSON
$ cat huge-response.json | gron | grep "email" | gron --ungron
{
  "users": [
    { "email": "alice@example.com" },
    { "email": "bob@example.com" },
    { "contacts": { "email": "charlie@example.com" } }
  ]
}`}</code></pre>

      {/* Section 7: Working with API Responses */}
      <h2>{s.h2_api}</h2>
      <p>{s.api_p1}</p>

      <h3>{s.h3_rest}</h3>
      <p>{s.rest_p1}</p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Fetch and view API response
curl -s https://api.example.com/users?page=1&limit=10 | jq '.'

# Check response structure
curl -s https://api.example.com/users | jq 'keys'
# Output: ["data", "meta", "pagination"]

# Inspect pagination metadata
curl -s https://api.example.com/users | jq '.pagination'
# Output: {"page": 1, "per_page": 10, "total": 342, "total_pages": 35}

# Extract specific fields from all items
curl -s https://api.example.com/users | jq '.data[] | {id, name, email}'

# Check for error responses
curl -s https://api.example.com/invalid | jq '.error // "No error field"'

# Save formatted response to file
curl -s https://api.example.com/users | jq '.' > users-formatted.json`}</code></pre>
      <p>{s.rest_p2}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.rest_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.rest_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.rest_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.rest_list4 }} />
      </ul>

      <h3>{s.h3_graphql}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.graphql_p1 }} />
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// Typical GraphQL response structure
{
  "data": {
    "users": {
      "edges": [
        {
          "node": {
            "id": "usr_001",
            "name": "Alice",
            "posts": {
              "totalCount": 42,
              "edges": [
                { "node": { "title": "Getting Started with GraphQL" } }
              ]
            }
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "YXJyYXljb25uZWN0aW9uOjE="
      }
    }
  },
  "errors": null
}

// Use jq to extract from GraphQL responses:
// All user names:
jq '.data.users.edges[].node.name'
// Post counts:
jq '.data.users.edges[].node | {name, posts: .posts.totalCount}'`}</code></pre>

      <p style={{ marginTop: 16 }}><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool} &rarr;</Link></p>

      {/* Section 8: JSON Schema Validation */}
      <h2>{s.h2_schema}</h2>
      <p>{s.schema_p1}</p>
      <p dangerouslySetInnerHTML={{ __html: s.schema_p2 }} />
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.schema_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.schema_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.schema_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.schema_list4 }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`// JSON Schema example for a User object
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "role": {
      "type": "string",
      "enum": ["admin", "user", "viewer"]
    },
    "settings": {
      "type": "object",
      "properties": {
        "theme": { "type": "string", "enum": ["light", "dark"] },
        "notifications": { "type": "boolean" }
      }
    }
  },
  "additionalProperties": false
}

// Validate with ajv (JavaScript)
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) console.log(validate.errors);`}</code></pre>
      <p dangerouslySetInnerHTML={{ __html: s.schema_p3 }} />

      {/* Section 9: Handling Large JSON Files */}
      <h2>{s.h2_large}</h2>
      <p>{s.large_p1}</p>

      <h3>{s.h3_streaming}</h3>
      <p>{s.streaming_p1}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.streaming_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.streaming_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.streaming_list3 }} />
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Python: Stream large JSON with ijson
import ijson

with open('huge-dataset.json', 'rb') as f:
    # Iterate over items in the "users" array without loading all into memory
    for user in ijson.items(f, 'users.item'):
        if user.get('role') == 'admin':
            print(user['name'], user['email'])

# Node.js: Stream with JSONStream
const JSONStream = require('JSONStream');
const fs = require('fs');

fs.createReadStream('huge-dataset.json')
  .pipe(JSONStream.parse('users.*'))
  .on('data', (user) => {
    if (user.role === 'admin') {
      console.log(user.name, user.email);
    }
  });

# Command line: jq streaming mode
jq --stream 'select(.[0][-1] == "email") | .[1]' huge-dataset.json`}</code></pre>

      <h3>{s.h3_lazy}</h3>
      <p>{s.lazy_p1}</p>
      <p>{s.lazy_p2}</p>

      <h3>{s.h3_tips}</h3>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.tips_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.tips_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.tips_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.tips_list4 }} />
      </ul>

      {/* Section 10: JSON Security */}
      <h2>{s.h2_security}</h2>
      <p>{s.security_p1}</p>
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.security_list1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_list2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_list3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_list4 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_list5 }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: s.security_p2 }} />
      <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
        <li dangerouslySetInnerHTML={{ __html: s.security_safe1 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_safe2 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_safe3 }} />
        <li dangerouslySetInnerHTML={{ __html: s.security_safe4 }} />
      </ul>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflowX: 'auto', fontSize: 13, lineHeight: 1.5 }}><code>{`# Redact sensitive fields before sharing JSON

# Remove specific keys with jq
cat response.json | jq 'del(.auth, .token, .session_id, .api_key)'

# Replace values while keeping structure
cat response.json | jq '
  .token = "[REDACTED]" |
  .users[].email = "[REDACTED]" |
  .database.password = "[REDACTED]"
'

# Redact all string values matching a pattern
cat response.json | jq '
  walk(if type == "string" and test("Bearer |sk-|eyJ") then "[REDACTED]" else . end)
'

# Strip sensitive headers from API response logs
cat api-log.json | jq '.request.headers |= del(.Authorization, .Cookie, ."X-API-Key")'`}</code></pre>

      {/* Section 11: FAQ */}
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
      <p><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600, color: '#2563eb' }}>{s.link_tool_bottom} &rarr;</Link></p>
    </>
  );
}
