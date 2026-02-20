import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>CSV to JSON</strong> conversion is one of the most common data transformation tasks developers face daily. Whether you are migrating data between systems, building APIs, or processing spreadsheets, knowing how to <strong>convert CSV to JSON</strong> efficiently is essential. CSV (Comma-Separated Values) and JSON (JavaScript Object Notation) are the two most widely used data interchange formats, yet they serve different purposes and have distinct strengths. This comprehensive guide covers everything you need to know about <strong>CSV to JSON converter</strong> tools, parsing algorithms, code examples in JavaScript, Python, and Bash, plus best practices for handling edge cases. If you need a quick <strong>CSV to JSON online</strong> conversion, try our free tool below.',
    linkTool: 'Try our free online CSV to JSON Converter tool instantly.',
    h2_whatCsv: 'What Is CSV (Comma-Separated Values)?',
    whatCsvDesc1: '<strong>CSV</strong> stands for Comma-Separated Values, a plain-text file format defined by RFC 4180 for storing tabular data. Each line in a CSV file represents a row, and each value within a row is separated by a comma (or another delimiter such as a semicolon or tab). The first row typically serves as the header, defining column names for the data that follows. CSV files use the <code>.csv</code> extension and the MIME type <code>text/csv</code>.',
    whatCsvDesc2: 'The CSV format has been in use since the early days of computing and remains popular due to its simplicity. Any text editor, spreadsheet application (Excel, Google Sheets, LibreOffice Calc), database tool, or programming language can read and write CSV. A typical CSV file looks like this: <code>name,age,city\\nAlice,30,New York\\nBob,25,London</code>. Despite its simplicity, the <strong>CSV parser</strong> must handle several tricky cases: quoted fields containing commas, escaped double quotes, multiline values within quotes, and varying delimiters across regions.',
    whatCsvDesc3: '<strong>When to use CSV vs JSON</strong>: CSV excels at flat, tabular data such as spreadsheet exports, database dumps, log files, and bulk data imports. JSON is better for hierarchical or nested data structures, API responses, configuration files, and data that includes mixed types (strings, numbers, booleans, arrays, objects). Understanding when to use each format and how to <strong>convert CSV to JSON</strong> (and vice versa) is a fundamental skill for data engineers and web developers.',
    h2_comparison: 'CSV vs JSON: A Detailed Comparison',
    comparisonDesc: 'Understanding the differences between CSV and JSON helps you choose the right format for your use case and understand what happens during <strong>CSV to JSON</strong> conversion:',
    comparisonTable: '<table><thead><tr><th>Feature</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Structure</strong></td><td>Flat, tabular (rows and columns)</td><td>Hierarchical (nested objects and arrays)</td></tr><tr><td><strong>Readability</strong></td><td>Easy for simple data; hard with many columns</td><td>Readable with proper formatting/indentation</td></tr><tr><td><strong>Nesting</strong></td><td>Not supported natively</td><td>Fully supported (objects within objects)</td></tr><tr><td><strong>Data Types</strong></td><td>Everything is a string</td><td>Strings, numbers, booleans, null, arrays, objects</td></tr><tr><td><strong>File Size</strong></td><td>Generally smaller (no key repetition)</td><td>Larger (keys repeated for every record)</td></tr><tr><td><strong>Parsing Speed</strong></td><td>Very fast (simple split operations)</td><td>Moderate (recursive descent parser needed)</td></tr><tr><td><strong>Schema</strong></td><td>Implicit (header row defines columns)</td><td>Self-describing (keys in every object)</td></tr><tr><td><strong>Streaming</strong></td><td>Easy line-by-line processing</td><td>Harder (need SAX-like parser for large files)</td></tr><tr><td><strong>Use Cases</strong></td><td>Spreadsheets, database exports, data science</td><td>APIs, config files, NoSQL databases, web apps</td></tr></tbody></table>',
    h2_howWorks: 'How CSV to JSON Conversion Works',
    howWorksDesc1: 'The <strong>CSV to JSON converter</strong> process involves several steps. Understanding the algorithm helps you handle edge cases and build more robust conversion pipelines:',
    howWorksSteps: '<ol><li><strong>Read the header row</strong>: The first line of the CSV is parsed to extract column names. These become the keys in each JSON object. For example, <code>name,age,city</code> yields three keys.</li><li><strong>Parse each data row</strong>: Subsequent lines are split by the delimiter (comma by default). Each value is paired with its corresponding header to form a key-value pair.</li><li><strong>Handle quoted fields</strong>: Values enclosed in double quotes (<code>"..."</code>) are treated as a single field, even if they contain commas, newlines, or other special characters. Escaped quotes within a field use <code>""</code> (two double quotes).</li><li><strong>Detect data types</strong>: Smart converters attempt to detect types automatically: numbers (<code>"42"</code> becomes <code>42</code>), booleans (<code>"true"</code> becomes <code>true</code>), null values (<code>""</code> or <code>"null"</code> becomes <code>null</code>), and dates. Others keep everything as strings for safety.</li><li><strong>Build the JSON array</strong>: Each row becomes a JSON object, and all objects are collected into a JSON array. The final output is <code>[{...}, {...}, ...]</code>.</li></ol>',
    howWorksDesc2: '<strong>Example conversion</strong>: Given the CSV input <code>name,age,active\\nAlice,30,true\\nBob,25,false</code>, the <strong>CSV to JSON</strong> output would be: <code>[{"name":"Alice","age":30,"active":true},{"name":"Bob","age":25,"active":false}]</code>. Notice how the converter detected <code>30</code> and <code>25</code> as numbers and <code>true</code>/<code>false</code> as booleans.',
    h2_codeExamples: 'CSV to JSON Code Examples',
    codeJsTitle: 'JavaScript: CSV to JSON Conversion',
    codeJsDesc: 'There are multiple ways to implement <strong>CSV to JSON JavaScript</strong> conversion. Here we cover the native approach, the popular Papa Parse library for browsers, and the csv-parser module for Node.js:',
    codePyTitle: 'Python: CSV to JSON Conversion',
    codePyDesc: '<strong>CSV to JSON Python</strong> conversion can be done with the built-in <code>csv</code> module, the powerful <code>pandas</code> library, or simple <code>json.dumps</code>. Here are all three approaches:',
    codeBashTitle: 'Bash / Command Line: CSV to JSON',
    codeBashDesc: 'For command-line <strong>CSV to JSON</strong> conversion, tools like <code>csvkit</code>, <code>miller</code>, <code>jq</code>, and even <code>awk</code> can transform CSV data into JSON without writing a full script:',
    codeCLITitle: 'Dedicated CLI Tools: csvjson and miller',
    codeCLIDesc: '<strong>csvjson</strong> (part of csvkit) and <strong>miller</strong> (mlr) are purpose-built command-line tools for data format conversion. They handle edge cases, encodings, and large files gracefully:',
    h2_jsonToCsv: 'JSON to CSV Conversion (Reverse Process)',
    jsonToCsvDesc1: 'The reverse process, <strong>JSON to CSV converter</strong>, involves flattening hierarchical JSON data into a flat tabular structure. This is more challenging than CSV to JSON because JSON supports nesting, arrays, and mixed types that have no direct CSV equivalent.',
    jsonToCsvDesc2: '<strong>Flattening nested objects</strong>: When a JSON object contains nested objects like <code>{"user":{"name":"Alice","address":{"city":"NYC"}}}</code>, the <strong>JSON to CSV converter</strong> must flatten them using dot notation or underscore-separated keys: <code>user.name</code>, <code>user.address.city</code>. Arrays can be handled by creating multiple rows (one per array element), joining values with a separator (e.g., pipe <code>|</code>), or creating indexed columns (<code>tags.0</code>, <code>tags.1</code>).',
    jsonToCsvDesc3: 'Here is an example of <strong>JSON to CSV</strong> conversion in JavaScript and Python:',
    h2_edgeCases: 'Handling Edge Cases in CSV Parsing',
    edgeCasesDesc: 'A robust <strong>CSV parser</strong> must handle numerous edge cases that simple string splitting cannot manage:',
    edgeCase1: '<strong>UTF-8 BOM (Byte Order Mark)</strong>: Some applications (especially Excel on Windows) prepend a BOM (<code>\\uFEFF</code>) to UTF-8 CSV files. Your parser should strip this invisible character from the beginning of the file, or the first column header will be corrupted. In JavaScript: <code>csv = csv.replace(/^\\uFEFF/, "")</code>.',
    edgeCase2: '<strong>Delimiter variations</strong>: While commas are the standard delimiter, many European locales use semicolons (<code>;</code>) because commas are used as decimal separators. Tab-separated values (TSV) use <code>\\t</code>. Some files use pipes (<code>|</code>) or other characters. A good <strong>CSV parser</strong> should either auto-detect the delimiter or accept it as a parameter.',
    edgeCase3: '<strong>Missing values and empty fields</strong>: CSV rows may have trailing commas (<code>Alice,30,</code>) indicating empty fields, or missing values in the middle (<code>Alice,,NYC</code>). Your parser should preserve these as empty strings or null values rather than shifting columns.',
    edgeCase4: '<strong>Multiline fields</strong>: RFC 4180 allows field values to span multiple lines when enclosed in double quotes: <code>"Line 1\\nLine 2"</code>. A naive line-by-line parser will break on these. The parser must track whether it is inside a quoted field and continue reading lines until the closing quote is found.',
    edgeCase5: '<strong>Special characters and escaping</strong>: Double quotes within a quoted field must be escaped by doubling them: <code>"She said ""hello"""</code> represents the value <code>She said "hello"</code>. Backslash escaping (<code>\\"</code>) is not standard CSV but some tools produce it. Your converter should handle both styles.',
    edgeCase6: '<strong>Inconsistent row lengths</strong>: Some CSV files have rows with more or fewer columns than the header. A resilient parser should either pad short rows with empty values, truncate long rows, or report an error rather than crashing.',
    h2_bestPractices: 'CSV Best Practices',
    bestPracticesDesc: 'Follow these best practices when creating, parsing, or converting CSV files to ensure maximum compatibility and data integrity:',
    bestPractice1: '<strong>Always use UTF-8 encoding</strong>: UTF-8 is the universal standard for text encoding. Avoid ASCII, Latin-1, or Windows-1252 unless absolutely required. When writing CSV, include a UTF-8 BOM only if the target application requires it (e.g., Excel). When reading, always try UTF-8 first and fall back to other encodings if needed.',
    bestPractice2: '<strong>Quote fields consistently</strong>: The safest approach is to quote all fields, not just those containing special characters. This prevents parsing errors when values unexpectedly contain commas, quotes, or newlines. At minimum, always quote fields that contain the delimiter, double quotes, or line breaks.',
    bestPractice3: '<strong>Include a header row</strong>: Always include a header row as the first line. Headers should be descriptive, use consistent naming conventions (camelCase, snake_case, or kebab-case), and avoid special characters. Headers define the JSON keys when converting <strong>CSV to JSON</strong>.',
    bestPractice4: '<strong>Use consistent delimiters</strong>: Stick to one delimiter throughout the file. If you use commas, do not mix in semicolons or tabs. Document the delimiter in your data specification. For international data, consider using tab as the delimiter since it rarely appears in field values.',
    bestPractice5: '<strong>Stream large files</strong>: For CSV files larger than available memory, use streaming parsers that process one row at a time rather than loading the entire file. In Node.js, use <code>csv-parser</code> with readable streams. In Python, use <code>csv.reader()</code> which is already an iterator. This is critical for <strong>CSV to JSON API</strong> endpoints handling large uploads.',
    bestPractice6: '<strong>Validate data after conversion</strong>: After converting <strong>CSV to JSON</strong>, validate the output: check that the number of records matches the expected row count, verify that data types were detected correctly, ensure no data was lost during conversion, and spot-check a few records against the source.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert CSV to JSON?',
    faq1_a: 'To convert CSV to JSON, parse the CSV header row to get column names (keys), then parse each subsequent row and map values to their corresponding keys to create JSON objects. Collect all objects into a JSON array. You can do this manually with string splitting, use libraries like Papa Parse (JavaScript) or pandas (Python), or use our free online CSV to JSON converter tool. The basic algorithm is: (1) read headers, (2) split each row by delimiter, (3) create key-value pairs, (4) optionally detect data types, (5) output as JSON array.',
    faq2_q: 'What is the difference between CSV and JSON?',
    faq2_a: 'CSV (Comma-Separated Values) is a flat, tabular format where data is organized in rows and columns with all values stored as strings. JSON (JavaScript Object Notation) is a hierarchical format that supports nested objects, arrays, and multiple data types (strings, numbers, booleans, null). CSV is typically smaller in file size and faster to parse, making it ideal for spreadsheets and bulk data. JSON is more expressive and self-describing, making it the standard for APIs, configuration files, and web applications. CSV cannot represent nested data natively, while JSON handles complex hierarchies easily.',
    faq3_q: 'Can CSV handle nested data?',
    faq3_a: 'No, CSV cannot natively represent nested or hierarchical data structures. CSV is a flat format with rows and columns. To store nested data in CSV, you must flatten it using techniques like dot notation for keys (e.g., "address.city"), JSON-encoding nested values as strings within CSV fields, creating separate CSV files for related data (like relational database tables), or using column naming conventions to imply hierarchy. When converting nested JSON to CSV, a JSON to CSV converter will flatten the structure automatically using one of these approaches.',
    conclusion: '<strong>CSV to JSON</strong> conversion is a fundamental data transformation skill for developers, data engineers, and analysts. Whether you use JavaScript libraries like Papa Parse, Python with pandas, command-line tools like csvkit and miller, or a quick <strong>CSV to JSON online</strong> converter, understanding the underlying parsing rules, edge cases, and best practices ensures your data conversions are accurate and reliable. Bookmark this guide for reference, and try our free tool for instant conversions.',
    linkToolBottom: 'Convert CSV to JSON and JSON to CSV instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>CSV 转 JSON</strong> 是开发者日常面临的最常见数据转换任务之一。无论你是在系统之间迁移数据、构建 API，还是处理电子表格，高效地进行 <strong>CSV 转 JSON</strong> 转换都是必备技能。CSV（逗号分隔值）和 JSON（JavaScript 对象表示法）是两种最广泛使用的数据交换格式，但它们服务于不同目的且各有优势。本综合指南涵盖了 <strong>CSV to JSON 转换器</strong>工具、解析算法、JavaScript、Python 和 Bash 代码示例，以及处理边缘情况的最佳实践。如果你需要快速进行在线 CSV 转 JSON 转换，请试用我们的免费工具。',
    linkTool: '立即试用我们的免费在线 CSV 转 JSON 转换工具。',
    h2_whatCsv: '什么是 CSV（逗号分隔值）？',
    whatCsvDesc1: '<strong>CSV</strong> 即 Comma-Separated Values（逗号分隔值），是一种由 RFC 4180 定义的纯文本文件格式，用于存储表格数据。CSV 文件中的每一行代表一条记录，行中的每个值由逗号（或分号、制表符等其他分隔符）分隔。第一行通常作为表头，定义后续数据的列名。CSV 文件使用 <code>.csv</code> 扩展名和 <code>text/csv</code> MIME 类型。',
    whatCsvDesc2: 'CSV 格式从计算机早期就开始使用，因其简单性而一直流行。任何文本编辑器、电子表格应用（Excel、Google Sheets、LibreOffice Calc）、数据库工具或编程语言都能读写 CSV。一个典型的 CSV 文件如下：<code>name,age,city\\nAlice,30,New York\\nBob,25,London</code>。尽管简单，<strong>CSV 解析器</strong>必须处理几种棘手情况：包含逗号的引号字段、转义双引号、引号内的多行值，以及不同地区的分隔符差异。',
    whatCsvDesc3: '<strong>何时使用 CSV 或 JSON</strong>：CSV 擅长处理扁平的表格数据，如电子表格导出、数据库转储、日志文件和批量数据导入。JSON 更适合层级或嵌套数据结构、API 响应、配置文件和包含混合类型的数据。理解何时使用每种格式以及如何相互转换是数据工程师和 Web 开发者的基础技能。',
    h2_comparison: 'CSV 与 JSON：详细对比',
    comparisonDesc: '了解 CSV 和 JSON 的区别有助于你选择正确的格式，并理解 <strong>CSV 转 JSON</strong> 转换过程中发生了什么：',
    comparisonTable: '<table><thead><tr><th>特性</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>结构</strong></td><td>扁平、表格式（行和列）</td><td>层级式（嵌套对象和数组）</td></tr><tr><td><strong>可读性</strong></td><td>简单数据易读；列多时较难</td><td>格式化/缩进后可读性好</td></tr><tr><td><strong>嵌套</strong></td><td>原生不支持</td><td>完全支持（对象中嵌套对象）</td></tr><tr><td><strong>数据类型</strong></td><td>一切都是字符串</td><td>字符串、数字、布尔值、null、数组、对象</td></tr><tr><td><strong>文件大小</strong></td><td>通常更小（无键重复）</td><td>更大（每条记录都重复键名）</td></tr><tr><td><strong>解析速度</strong></td><td>非常快（简单分割操作）</td><td>中等（需要递归下降解析器）</td></tr><tr><td><strong>模式</strong></td><td>隐式（表头行定义列）</td><td>自描述（每个对象都有键名）</td></tr><tr><td><strong>流处理</strong></td><td>容易逐行处理</td><td>较难（大文件需类 SAX 解析器）</td></tr><tr><td><strong>使用场景</strong></td><td>电子表格、数据库导出、数据科学</td><td>API、配置文件、NoSQL 数据库、Web 应用</td></tr></tbody></table>',
    h2_howWorks: 'CSV 转 JSON 的工作原理',
    howWorksDesc1: '<strong>CSV to JSON 转换器</strong>的处理过程包含以下步骤。理解算法有助于你处理边缘情况并构建更健壮的转换管道：',
    howWorksSteps: '<ol><li><strong>读取表头行</strong>：解析 CSV 的第一行以提取列名，这些列名将成为每个 JSON 对象的键。例如 <code>name,age,city</code> 产生三个键。</li><li><strong>解析每个数据行</strong>：后续行按分隔符（默认逗号）分割，每个值与对应的表头配对形成键值对。</li><li><strong>处理引号字段</strong>：用双引号（<code>"..."</code>）括起来的值被视为单个字段，即使包含逗号、换行符或其他特殊字符。字段内的转义引号使用 <code>""</code>（两个双引号）。</li><li><strong>检测数据类型</strong>：智能转换器会自动检测类型：数字、布尔值、null 值和日期。其他转换器为安全起见将所有值保持为字符串。</li><li><strong>构建 JSON 数组</strong>：每行成为一个 JSON 对象，所有对象收集到 JSON 数组中，最终输出为 <code>[{...}, {...}, ...]</code>。</li></ol>',
    howWorksDesc2: '<strong>转换示例</strong>：给定 CSV 输入 <code>name,age,active\\nAlice,30,true\\nBob,25,false</code>，CSV 转 JSON 的输出为：<code>[{"name":"Alice","age":30,"active":true},{"name":"Bob","age":25,"active":false}]</code>。注意转换器将 <code>30</code> 和 <code>25</code> 检测为数字，将 <code>true</code>/<code>false</code> 检测为布尔值。',
    h2_codeExamples: 'CSV 转 JSON 代码示例',
    codeJsTitle: 'JavaScript：CSV 转 JSON',
    codeJsDesc: '实现 <strong>CSV to JSON JavaScript</strong> 转换有多种方式。这里介绍原生方法、流行的 Papa Parse 浏览器库和 Node.js 的 csv-parser 模块：',
    codePyTitle: 'Python：CSV 转 JSON',
    codePyDesc: '<strong>CSV to JSON Python</strong> 转换可以使用内置 <code>csv</code> 模块、强大的 <code>pandas</code> 库或简单的 <code>json.dumps</code>。以下是三种方法：',
    codeBashTitle: 'Bash / 命令行：CSV 转 JSON',
    codeBashDesc: '命令行 CSV 转 JSON 转换可使用 <code>csvkit</code>、<code>miller</code>、<code>jq</code> 甚至 <code>awk</code> 等工具，无需编写完整脚本：',
    codeCLITitle: '专用 CLI 工具：csvjson 和 miller',
    codeCLIDesc: '<strong>csvjson</strong>（csvkit 的一部分）和 <strong>miller</strong>（mlr）是专为数据格式转换构建的命令行工具，可优雅地处理边缘情况、编码和大文件：',
    h2_jsonToCsv: 'JSON 转 CSV（反向过程）',
    jsonToCsvDesc1: '反向过程 <strong>JSON 转 CSV</strong> 涉及将层级 JSON 数据扁平化为平面表格结构。这比 CSV 转 JSON 更具挑战性，因为 JSON 支持嵌套、数组和混合类型，这些在 CSV 中没有直接对应。',
    jsonToCsvDesc2: '<strong>扁平化嵌套对象</strong>：当 JSON 对象包含嵌套对象如 <code>{"user":{"name":"Alice","address":{"city":"NYC"}}}</code> 时，JSON 转 CSV 转换器必须使用点号或下划线分隔键名进行扁平化：<code>user.name</code>、<code>user.address.city</code>。数组可通过创建多行、用分隔符连接值或创建索引列来处理。',
    jsonToCsvDesc3: '以下是 JavaScript 和 Python 中 JSON 转 CSV 的示例：',
    h2_edgeCases: 'CSV 解析的边缘情况处理',
    edgeCasesDesc: '一个健壮的 <strong>CSV 解析器</strong>必须处理简单字符串分割无法管理的众多边缘情况：',
    edgeCase1: '<strong>UTF-8 BOM（字节顺序标记）</strong>：某些应用（特别是 Windows 上的 Excel）会在 UTF-8 CSV 文件开头添加 BOM（<code>\\uFEFF</code>）。解析器应剥离这个不可见字符，否则第一个列标题会被损坏。',
    edgeCase2: '<strong>分隔符变化</strong>：虽然逗号是标准分隔符，但许多欧洲地区使用分号，因为逗号用作小数分隔符。制表符分隔值（TSV）使用 <code>\\t</code>。好的 CSV 解析器应自动检测分隔符或接受参数配置。',
    edgeCase3: '<strong>缺失值和空字段</strong>：CSV 行可能有尾部逗号表示空字段，或中间有缺失值。解析器应将这些保留为空字符串或 null 值，而非移位列。',
    edgeCase4: '<strong>多行字段</strong>：RFC 4180 允许用双引号括起的字段值跨多行。逐行解析器会在这些情况下出错，解析器必须跟踪是否在引号字段内并继续读取直到找到结束引号。',
    edgeCase5: '<strong>特殊字符和转义</strong>：引号字段内的双引号必须通过加倍来转义：<code>"She said ""hello"""</code> 表示值 <code>She said "hello"</code>。反斜杠转义不是标准 CSV，但某些工具会生成它。',
    edgeCase6: '<strong>不一致的行长度</strong>：某些 CSV 文件的行可能比表头有更多或更少的列。弹性解析器应用空值填充短行、截断长行或报告错误。',
    h2_bestPractices: 'CSV 最佳实践',
    bestPracticesDesc: '创建、解析或转换 CSV 文件时遵循以下最佳实践，以确保最大兼容性和数据完整性：',
    bestPractice1: '<strong>始终使用 UTF-8 编码</strong>：UTF-8 是文本编码的通用标准。除非绝对必要，否则避免 ASCII、Latin-1 或 Windows-1252。',
    bestPractice2: '<strong>一致地引用字段</strong>：最安全的方法是引用所有字段，不仅仅是包含特殊字符的字段。这可以防止值意外包含逗号、引号或换行符时的解析错误。',
    bestPractice3: '<strong>包含表头行</strong>：始终将表头作为第一行。表头应具有描述性，使用一致的命名约定，避免特殊字符。表头在转换时定义 JSON 键名。',
    bestPractice4: '<strong>使用一致的分隔符</strong>：整个文件坚持使用一个分隔符。对于国际数据，考虑使用制表符，因为它很少出现在字段值中。',
    bestPractice5: '<strong>流式处理大文件</strong>：对于大于可用内存的 CSV 文件，使用流式解析器逐行处理而非加载整个文件。在 Node.js 中使用 <code>csv-parser</code>，Python 中使用 <code>csv.reader()</code>。',
    bestPractice6: '<strong>转换后验证数据</strong>：CSV 转 JSON 后验证输出：检查记录数、验证数据类型检测是否正确、确保没有数据丢失，并抽查几条记录与源数据对比。',
    h2_faq: '常见问题',
    faq1_q: '如何将 CSV 转换为 JSON？',
    faq1_a: '要将 CSV 转换为 JSON，首先解析 CSV 表头行获取列名（键），然后解析每一行数据并将值映射到对应的键以创建 JSON 对象，将所有对象收集到 JSON 数组中。你可以手动使用字符串分割，使用 Papa Parse（JavaScript）或 pandas（Python）等库，或使用我们的免费在线 CSV to JSON 转换工具。',
    faq2_q: 'CSV 和 JSON 有什么区别？',
    faq2_a: 'CSV 是扁平的表格格式，数据以行和列组织，所有值存储为字符串。JSON 是层级格式，支持嵌套对象、数组和多种数据类型。CSV 文件通常更小且解析更快，适合电子表格和批量数据。JSON 更具表达力和自描述性，是 API、配置文件和 Web 应用的标准。',
    faq3_q: 'CSV 可以处理嵌套数据吗？',
    faq3_a: '不能，CSV 原生不支持嵌套或层级数据结构。CSV 是扁平格式，只有行和列。要在 CSV 中存储嵌套数据，必须使用扁平化技术，如键的点号表示法、将嵌套值 JSON 编码为字符串、为相关数据创建单独的 CSV 文件，或使用列命名约定来暗示层级关系。',
    conclusion: '<strong>CSV 转 JSON</strong> 是开发者、数据工程师和分析师的基础数据转换技能。无论你使用 Papa Parse 等 JavaScript 库、Python 的 pandas、csvkit 和 miller 等命令行工具，还是快速的在线转换器，理解底层的解析规则、边缘情况和最佳实践可确保数据转换准确可靠。收藏本指南以备参考，并使用我们的免费工具进行即时转换。',
    linkToolBottom: '使用我们的免费在线工具即时转换 CSV 和 JSON。',
  },
  fr: {
    intro: '<strong>La conversion CSV vers JSON</strong> est l\'une des taches de transformation de donnees les plus courantes. Que vous migriez des donnees entre systemes, construisiez des API ou traitiez des feuilles de calcul, savoir <strong>convertir CSV en JSON</strong> efficacement est essentiel. Ce guide complet couvre les outils de conversion, les algorithmes d\'analyse, les exemples de code en JavaScript, Python et Bash, ainsi que les bonnes pratiques.',
    linkTool: 'Essayez notre outil gratuit de conversion CSV vers JSON en ligne.',
    h2_whatCsv: 'Qu\'est-ce que le CSV ?',
    whatCsvDesc1: '<strong>CSV</strong> signifie Comma-Separated Values (valeurs separees par des virgules), un format texte defini par RFC 4180 pour stocker des donnees tabulaires. Chaque ligne represente un enregistrement, les valeurs sont separees par des virgules ou d\'autres delimiteurs. La premiere ligne sert generalement d\'en-tete.',
    whatCsvDesc2: 'Le format CSV est utilise depuis les debuts de l\'informatique et reste populaire grace a sa simplicite. Tout editeur de texte, tableur ou langage de programmation peut lire et ecrire du CSV. Malgre sa simplicite, l\'<strong>analyseur CSV</strong> doit gerer plusieurs cas delicats : champs entre guillemets, guillemets echappes, valeurs multilignes et delimiteurs variables.',
    whatCsvDesc3: '<strong>Quand utiliser CSV ou JSON</strong> : CSV excelle pour les donnees tabulaires plates comme les exports de tableurs et les dumps de bases de donnees. JSON est preferable pour les structures hierarchiques, les reponses API et les fichiers de configuration.',
    h2_comparison: 'CSV vs JSON : Comparaison detaillee',
    comparisonDesc: 'Comprendre les differences entre CSV et JSON aide a choisir le bon format et a comprendre le processus de conversion :',
    comparisonTable: '<table><thead><tr><th>Caracteristique</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Structure</strong></td><td>Plate, tabulaire</td><td>Hierarchique (objets et tableaux imbriques)</td></tr><tr><td><strong>Lisibilite</strong></td><td>Facile pour donnees simples</td><td>Lisible avec indentation</td></tr><tr><td><strong>Imbrication</strong></td><td>Non supportee nativement</td><td>Entierement supportee</td></tr><tr><td><strong>Types de donnees</strong></td><td>Tout est chaine</td><td>Chaines, nombres, booleens, null, tableaux, objets</td></tr><tr><td><strong>Taille</strong></td><td>Generalement plus petit</td><td>Plus grand (cles repetees)</td></tr><tr><td><strong>Cas d\'usage</strong></td><td>Tableurs, exports BDD, data science</td><td>API, config, NoSQL, apps web</td></tr></tbody></table>',
    h2_howWorks: 'Comment fonctionne la conversion CSV vers JSON',
    howWorksDesc1: 'Le processus de <strong>conversion CSV vers JSON</strong> comprend plusieurs etapes :',
    howWorksSteps: '<ol><li><strong>Lire la ligne d\'en-tete</strong> : extraire les noms de colonnes qui deviennent les cles JSON.</li><li><strong>Analyser chaque ligne</strong> : diviser par le delimiteur et associer chaque valeur a son en-tete.</li><li><strong>Gerer les champs entre guillemets</strong> : les valeurs entre guillemets doubles sont un seul champ, meme avec des virgules ou retours a la ligne.</li><li><strong>Detecter les types</strong> : convertir les nombres, booleens et valeurs nulles automatiquement.</li><li><strong>Construire le tableau JSON</strong> : chaque ligne devient un objet, tous collectes dans un tableau.</li></ol>',
    howWorksDesc2: '<strong>Exemple</strong> : Le CSV <code>name,age,active\\nAlice,30,true</code> produit <code>[{"name":"Alice","age":30,"active":true}]</code>.',
    h2_codeExamples: 'Exemples de code CSV vers JSON',
    codeJsTitle: 'JavaScript : Conversion CSV vers JSON',
    codeJsDesc: 'Plusieurs approches pour la conversion <strong>CSV vers JSON en JavaScript</strong> : methode native, Papa Parse pour le navigateur, et csv-parser pour Node.js :',
    codePyTitle: 'Python : Conversion CSV vers JSON',
    codePyDesc: 'La conversion <strong>CSV vers JSON en Python</strong> avec le module <code>csv</code>, <code>pandas</code>, ou <code>json.dumps</code> :',
    codeBashTitle: 'Bash / Ligne de commande : CSV vers JSON',
    codeBashDesc: 'Conversion en ligne de commande avec <code>csvkit</code>, <code>miller</code>, <code>jq</code> et <code>awk</code> :',
    codeCLITitle: 'Outils CLI dedies : csvjson et miller',
    codeCLIDesc: '<strong>csvjson</strong> (csvkit) et <strong>miller</strong> (mlr) sont des outils specialises pour la conversion de formats de donnees :',
    h2_jsonToCsv: 'Conversion JSON vers CSV (processus inverse)',
    jsonToCsvDesc1: 'Le processus inverse, <strong>JSON vers CSV</strong>, implique l\'aplatissement de donnees JSON hierarchiques en structure tabulaire plate.',
    jsonToCsvDesc2: '<strong>Aplatissement des objets imbriques</strong> : Les objets imbriques sont aplatis avec une notation par points ou des tirets bas : <code>user.name</code>, <code>user.address.city</code>.',
    jsonToCsvDesc3: 'Exemples de conversion JSON vers CSV en JavaScript et Python :',
    h2_edgeCases: 'Gestion des cas limites dans l\'analyse CSV',
    edgeCasesDesc: 'Un <strong>analyseur CSV</strong> robuste doit gerer de nombreux cas limites :',
    edgeCase1: '<strong>BOM UTF-8</strong> : Certaines applications ajoutent un BOM invisible au debut du fichier. Votre analyseur doit le supprimer.',
    edgeCase2: '<strong>Variations de delimiteurs</strong> : Point-virgule en Europe, tabulation pour TSV. Un bon analyseur detecte automatiquement le delimiteur.',
    edgeCase3: '<strong>Valeurs manquantes</strong> : Virgules en fin de ligne ou champs vides au milieu. Le parseur doit les preserver comme chaines vides ou null.',
    edgeCase4: '<strong>Champs multilignes</strong> : RFC 4180 autorise les valeurs sur plusieurs lignes entre guillemets doubles.',
    edgeCase5: '<strong>Caracteres speciaux</strong> : Les guillemets doubles dans un champ cite sont echappes par doublement : <code>"Il a dit ""bonjour"""</code>.',
    edgeCase6: '<strong>Longueurs de lignes inconsistantes</strong> : Un analyseur resilient doit combler les lignes courtes ou tronquer les longues.',
    h2_bestPractices: 'Bonnes pratiques CSV',
    bestPracticesDesc: 'Suivez ces bonnes pratiques pour une compatibilite maximale :',
    bestPractice1: '<strong>Toujours utiliser l\'encodage UTF-8</strong> : standard universel pour l\'encodage de texte.',
    bestPractice2: '<strong>Citer les champs de maniere coherente</strong> : l\'approche la plus sure est de citer tous les champs.',
    bestPractice3: '<strong>Inclure une ligne d\'en-tete</strong> : toujours avec des noms descriptifs et des conventions de nommage coherentes.',
    bestPractice4: '<strong>Utiliser des delimiteurs coherents</strong> : un seul delimiteur dans tout le fichier.',
    bestPractice5: '<strong>Traiter les gros fichiers en streaming</strong> : utiliser des analyseurs en flux pour les fichiers depassant la memoire.',
    bestPractice6: '<strong>Valider les donnees apres conversion</strong> : verifier le nombre d\'enregistrements, les types et l\'integrite.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir CSV en JSON ?',
    faq1_a: 'Analysez la ligne d\'en-tete pour obtenir les noms de colonnes, puis mappez chaque ligne a ses cles correspondantes. Utilisez des bibliotheques comme Papa Parse (JavaScript) ou pandas (Python), ou notre outil en ligne gratuit.',
    faq2_q: 'Quelle est la difference entre CSV et JSON ?',
    faq2_a: 'CSV est un format tabulaire plat ou toutes les valeurs sont des chaines. JSON est hierarchique avec support des objets imbriques, tableaux et types multiples. CSV est plus compact, JSON plus expressif.',
    faq3_q: 'Le CSV peut-il gerer des donnees imbriquees ?',
    faq3_a: 'Non, CSV ne supporte pas nativement les structures imbriquees. Il faut aplatir les donnees avec des techniques comme la notation par points ou l\'encodage JSON dans les champs CSV.',
    conclusion: 'La conversion <strong>CSV vers JSON</strong> est une competence fondamentale pour les developpeurs et analystes de donnees. Utilisez notre outil gratuit pour des conversions instantanees.',
    linkToolBottom: 'Convertissez CSV en JSON et JSON en CSV instantanement avec notre outil gratuit.',
  },
  de: {
    intro: '<strong>CSV zu JSON</strong> Konvertierung ist eine der haufigsten Datentransformationsaufgaben fur Entwickler. Ob Sie Daten zwischen Systemen migrieren, APIs erstellen oder Tabellen verarbeiten, die effiziente <strong>Konvertierung von CSV zu JSON</strong> ist unerlasslich. Dieser umfassende Leitfaden behandelt Konvertierungswerkzeuge, Parsing-Algorithmen, Codebeispiele in JavaScript, Python und Bash sowie Best Practices.',
    linkTool: 'Testen Sie unser kostenloses Online CSV zu JSON Konvertierungstool.',
    h2_whatCsv: 'Was ist CSV?',
    whatCsvDesc1: '<strong>CSV</strong> steht fur Comma-Separated Values, ein durch RFC 4180 definiertes Klartextformat zur Speicherung tabellarischer Daten. Jede Zeile reprasentiert einen Datensatz, Werte werden durch Kommas oder andere Trennzeichen getrennt. Die erste Zeile dient typischerweise als Kopfzeile.',
    whatCsvDesc2: 'Das CSV-Format wird seit den Anfangen der Informatik verwendet und bleibt wegen seiner Einfachheit beliebt. Jeder Texteditor, jede Tabellenanwendung oder Programmiersprache kann CSV lesen und schreiben. Trotz der Einfachheit muss ein <strong>CSV-Parser</strong> mehrere knifflige Falle behandeln.',
    whatCsvDesc3: '<strong>Wann CSV oder JSON verwenden</strong>: CSV eignet sich fur flache Tabellendaten wie Tabellenexporte und Datenbankdumps. JSON ist besser fur hierarchische Datenstrukturen, API-Antworten und Konfigurationsdateien.',
    h2_comparison: 'CSV vs JSON: Detaillierter Vergleich',
    comparisonDesc: 'Die Unterschiede zwischen CSV und JSON zu verstehen hilft bei der Formatwahl und beim Verstandnis des Konvertierungsprozesses:',
    comparisonTable: '<table><thead><tr><th>Merkmal</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Struktur</strong></td><td>Flach, tabellarisch</td><td>Hierarchisch (verschachtelte Objekte)</td></tr><tr><td><strong>Lesbarkeit</strong></td><td>Einfach fur simple Daten</td><td>Lesbar mit Formatierung</td></tr><tr><td><strong>Verschachtelung</strong></td><td>Nicht nativ unterstutzt</td><td>Vollstandig unterstutzt</td></tr><tr><td><strong>Datentypen</strong></td><td>Alles ist String</td><td>Strings, Zahlen, Booleans, null, Arrays, Objekte</td></tr><tr><td><strong>Dateigrosse</strong></td><td>Generell kleiner</td><td>Grosser (Schlussel wiederholt)</td></tr><tr><td><strong>Anwendungsfalle</strong></td><td>Tabellen, DB-Exporte, Data Science</td><td>APIs, Config, NoSQL, Web-Apps</td></tr></tbody></table>',
    h2_howWorks: 'Wie die CSV zu JSON Konvertierung funktioniert',
    howWorksDesc1: 'Der <strong>CSV zu JSON Konverter</strong> Prozess umfasst mehrere Schritte:',
    howWorksSteps: '<ol><li><strong>Kopfzeile lesen</strong>: Spaltennamen extrahieren, die zu JSON-Schlusseln werden.</li><li><strong>Jede Datenzeile parsen</strong>: Nach Trennzeichen aufteilen und Werte den Kopfzeilen zuordnen.</li><li><strong>Zitierte Felder behandeln</strong>: In Anfuhrungszeichen eingeschlossene Werte bilden ein Feld.</li><li><strong>Datentypen erkennen</strong>: Zahlen, Booleans und Null-Werte automatisch konvertieren.</li><li><strong>JSON-Array erstellen</strong>: Jede Zeile wird ein Objekt, alle in einem Array gesammelt.</li></ol>',
    howWorksDesc2: '<strong>Beispiel</strong>: CSV <code>name,age,active\\nAlice,30,true</code> ergibt <code>[{"name":"Alice","age":30,"active":true}]</code>.',
    h2_codeExamples: 'CSV zu JSON Codebeispiele',
    codeJsTitle: 'JavaScript: CSV zu JSON',
    codeJsDesc: 'Mehrere Ansatze fur <strong>CSV zu JSON JavaScript</strong> Konvertierung: nativ, Papa Parse und csv-parser fur Node.js:',
    codePyTitle: 'Python: CSV zu JSON',
    codePyDesc: '<strong>CSV zu JSON Python</strong> mit dem <code>csv</code>-Modul, <code>pandas</code> oder <code>json.dumps</code>:',
    codeBashTitle: 'Bash / Kommandozeile: CSV zu JSON',
    codeBashDesc: 'Kommandozeilen-Konvertierung mit <code>csvkit</code>, <code>miller</code>, <code>jq</code> und <code>awk</code>:',
    codeCLITitle: 'Dedizierte CLI-Tools: csvjson und miller',
    codeCLIDesc: '<strong>csvjson</strong> (csvkit) und <strong>miller</strong> (mlr) sind spezialisierte Kommandozeilentools fur Datenformatkonvertierung:',
    h2_jsonToCsv: 'JSON zu CSV Konvertierung (Umkehrprozess)',
    jsonToCsvDesc1: 'Der umgekehrte Prozess, <strong>JSON zu CSV</strong>, beinhaltet das Flachmachen hierarchischer JSON-Daten in eine tabellarische Struktur.',
    jsonToCsvDesc2: '<strong>Verschachtelte Objekte flachmachen</strong>: Verschachtelte Objekte werden mit Punkt-Notation oder Unterstrichen flachgemacht: <code>user.name</code>, <code>user.address.city</code>.',
    jsonToCsvDesc3: 'Beispiele fur JSON zu CSV Konvertierung in JavaScript und Python:',
    h2_edgeCases: 'Behandlung von Randfallen beim CSV-Parsing',
    edgeCasesDesc: 'Ein robuster <strong>CSV-Parser</strong> muss zahlreiche Randfalle behandeln:',
    edgeCase1: '<strong>UTF-8 BOM</strong>: Manche Anwendungen stellen ein unsichtbares BOM-Zeichen voran. Ihr Parser sollte es entfernen.',
    edgeCase2: '<strong>Trennzeichen-Variationen</strong>: Semikolon in Europa, Tab fur TSV. Ein guter Parser erkennt das Trennzeichen automatisch.',
    edgeCase3: '<strong>Fehlende Werte</strong>: Nachgestellte Kommas oder leere Felder in der Mitte. Der Parser sollte sie als leere Strings oder null beibehalten.',
    edgeCase4: '<strong>Mehrzeilige Felder</strong>: RFC 4180 erlaubt Werte uber mehrere Zeilen in Anfuhrungszeichen.',
    edgeCase5: '<strong>Sonderzeichen und Escaping</strong>: Anfuhrungszeichen in zitierten Feldern werden durch Verdoppelung escaped.',
    edgeCase6: '<strong>Inkonsistente Zeilenlangen</strong>: Ein robuster Parser sollte kurze Zeilen auffüllen oder lange abschneiden.',
    h2_bestPractices: 'CSV Best Practices',
    bestPracticesDesc: 'Befolgen Sie diese Best Practices fur maximale Kompatibilitat:',
    bestPractice1: '<strong>Immer UTF-8 verwenden</strong>: Der universelle Standard fur Textcodierung.',
    bestPractice2: '<strong>Felder konsistent zitieren</strong>: Am sichersten ist es, alle Felder zu zitieren.',
    bestPractice3: '<strong>Kopfzeile einschliessen</strong>: Immer mit beschreibenden Namen und konsistenten Namenskonventionen.',
    bestPractice4: '<strong>Konsistente Trennzeichen verwenden</strong>: Ein Trennzeichen fur die gesamte Datei.',
    bestPractice5: '<strong>Grosse Dateien streamen</strong>: Streaming-Parser fur Dateien grosser als der verfugbare Speicher.',
    bestPractice6: '<strong>Daten nach Konvertierung validieren</strong>: Datensatzanzahl, Datentypen und Integritat prufen.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie konvertiert man CSV zu JSON?',
    faq1_a: 'Parsen Sie die Kopfzeile fur Spaltennamen, dann mappen Sie jede Zeile auf die entsprechenden Schlussel. Verwenden Sie Bibliotheken wie Papa Parse (JavaScript) oder pandas (Python), oder unser kostenloses Online-Tool.',
    faq2_q: 'Was ist der Unterschied zwischen CSV und JSON?',
    faq2_a: 'CSV ist ein flaches Tabellenformat, alle Werte sind Strings. JSON ist hierarchisch mit Unterstutzung fur verschachtelte Objekte, Arrays und mehrere Datentypen. CSV ist kompakter, JSON ausdrucksstarker.',
    faq3_q: 'Kann CSV verschachtelte Daten verarbeiten?',
    faq3_a: 'Nein, CSV unterstutzt nativ keine verschachtelten Strukturen. Man muss Daten flachmachen mit Punkt-Notation, JSON-Codierung in CSV-Feldern oder separaten CSV-Dateien.',
    conclusion: 'Die <strong>CSV zu JSON</strong> Konvertierung ist eine grundlegende Fahigkeit fur Entwickler und Datenanalysten. Nutzen Sie unser kostenloses Tool fur sofortige Konvertierungen.',
    linkToolBottom: 'CSV und JSON sofort konvertieren mit unserem kostenlosen Online-Tool.',
  },
  es: {
    intro: '<strong>La conversion de CSV a JSON</strong> es una de las tareas de transformacion de datos mas comunes. Ya sea migrando datos entre sistemas, construyendo APIs o procesando hojas de calculo, <strong>convertir CSV a JSON</strong> eficientemente es esencial. Esta guia completa cubre herramientas de conversion, algoritmos de analisis, ejemplos de codigo en JavaScript, Python y Bash, y mejores practicas.',
    linkTool: 'Prueba nuestra herramienta gratuita de conversion CSV a JSON en linea.',
    h2_whatCsv: 'Que es CSV?',
    whatCsvDesc1: '<strong>CSV</strong> significa Comma-Separated Values (valores separados por comas), un formato de texto plano definido por RFC 4180 para almacenar datos tabulares. Cada linea representa un registro, los valores se separan por comas u otros delimitadores. La primera fila sirve como encabezado.',
    whatCsvDesc2: 'El formato CSV se usa desde los inicios de la informatica y sigue siendo popular por su simplicidad. Cualquier editor de texto, hoja de calculo o lenguaje de programacion puede leer y escribir CSV. A pesar de su simplicidad, el <strong>analizador CSV</strong> debe manejar varios casos complicados.',
    whatCsvDesc3: '<strong>Cuando usar CSV o JSON</strong>: CSV es ideal para datos tabulares planos como exportaciones de hojas de calculo. JSON es mejor para estructuras jerarquicas, respuestas de API y archivos de configuracion.',
    h2_comparison: 'CSV vs JSON: Comparacion detallada',
    comparisonDesc: 'Entender las diferencias ayuda a elegir el formato correcto y comprender el proceso de conversion:',
    comparisonTable: '<table><thead><tr><th>Caracteristica</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>Estructura</strong></td><td>Plana, tabular</td><td>Jerarquica (objetos anidados)</td></tr><tr><td><strong>Legibilidad</strong></td><td>Facil para datos simples</td><td>Legible con formato</td></tr><tr><td><strong>Anidacion</strong></td><td>No soportada nativamente</td><td>Completamente soportada</td></tr><tr><td><strong>Tipos de datos</strong></td><td>Todo es cadena</td><td>Cadenas, numeros, booleanos, null, arrays, objetos</td></tr><tr><td><strong>Tamano</strong></td><td>Generalmente menor</td><td>Mayor (claves repetidas)</td></tr><tr><td><strong>Casos de uso</strong></td><td>Hojas de calculo, exportaciones BD</td><td>APIs, config, NoSQL, apps web</td></tr></tbody></table>',
    h2_howWorks: 'Como funciona la conversion CSV a JSON',
    howWorksDesc1: 'El proceso del <strong>convertidor CSV a JSON</strong> incluye varios pasos:',
    howWorksSteps: '<ol><li><strong>Leer la fila de encabezado</strong>: extraer nombres de columnas que se convierten en claves JSON.</li><li><strong>Analizar cada fila</strong>: dividir por delimitador y asociar valores con encabezados.</li><li><strong>Manejar campos entrecomillados</strong>: valores entre comillas dobles son un solo campo.</li><li><strong>Detectar tipos de datos</strong>: convertir numeros, booleanos y valores nulos automaticamente.</li><li><strong>Construir el array JSON</strong>: cada fila se convierte en un objeto, todos en un array.</li></ol>',
    howWorksDesc2: '<strong>Ejemplo</strong>: CSV <code>name,age,active\\nAlice,30,true</code> produce <code>[{"name":"Alice","age":30,"active":true}]</code>.',
    h2_codeExamples: 'Ejemplos de codigo CSV a JSON',
    codeJsTitle: 'JavaScript: Conversion CSV a JSON',
    codeJsDesc: 'Varios enfoques para la conversion <strong>CSV a JSON en JavaScript</strong>: metodo nativo, Papa Parse y csv-parser para Node.js:',
    codePyTitle: 'Python: Conversion CSV a JSON',
    codePyDesc: '<strong>CSV a JSON en Python</strong> con el modulo <code>csv</code>, <code>pandas</code> o <code>json.dumps</code>:',
    codeBashTitle: 'Bash / Linea de comandos: CSV a JSON',
    codeBashDesc: 'Conversion en linea de comandos con <code>csvkit</code>, <code>miller</code>, <code>jq</code> y <code>awk</code>:',
    codeCLITitle: 'Herramientas CLI dedicadas: csvjson y miller',
    codeCLIDesc: '<strong>csvjson</strong> (csvkit) y <strong>miller</strong> (mlr) son herramientas especializadas para conversion de formatos:',
    h2_jsonToCsv: 'Conversion JSON a CSV (proceso inverso)',
    jsonToCsvDesc1: 'El proceso inverso, <strong>JSON a CSV</strong>, implica aplanar datos JSON jerarquicos en una estructura tabular plana.',
    jsonToCsvDesc2: '<strong>Aplanar objetos anidados</strong>: Los objetos anidados se aplanan con notacion de puntos o guiones bajos: <code>user.name</code>, <code>user.address.city</code>.',
    jsonToCsvDesc3: 'Ejemplos de conversion JSON a CSV en JavaScript y Python:',
    h2_edgeCases: 'Manejo de casos limite en el analisis CSV',
    edgeCasesDesc: 'Un <strong>analizador CSV</strong> robusto debe manejar numerosos casos limite:',
    edgeCase1: '<strong>BOM UTF-8</strong>: Algunas aplicaciones agregan un BOM invisible al inicio. Su analizador debe eliminarlo.',
    edgeCase2: '<strong>Variaciones de delimitadores</strong>: Punto y coma en Europa, tabulacion para TSV. Un buen analizador detecta automaticamente.',
    edgeCase3: '<strong>Valores faltantes</strong>: Comas al final o campos vacios. El parser debe preservarlos como cadenas vacias o null.',
    edgeCase4: '<strong>Campos multilinea</strong>: RFC 4180 permite valores en multiples lineas entre comillas dobles.',
    edgeCase5: '<strong>Caracteres especiales</strong>: Comillas dobles en campos citados se escapan duplicandolas.',
    edgeCase6: '<strong>Longitudes de fila inconsistentes</strong>: Un analizador resiliente debe rellenar filas cortas o truncar largas.',
    h2_bestPractices: 'Mejores practicas CSV',
    bestPracticesDesc: 'Siga estas mejores practicas para maxima compatibilidad:',
    bestPractice1: '<strong>Siempre usar codificacion UTF-8</strong>: estandar universal para codificacion de texto.',
    bestPractice2: '<strong>Citar campos consistentemente</strong>: lo mas seguro es citar todos los campos.',
    bestPractice3: '<strong>Incluir fila de encabezado</strong>: siempre con nombres descriptivos y convenciones consistentes.',
    bestPractice4: '<strong>Usar delimitadores consistentes</strong>: un solo delimitador en todo el archivo.',
    bestPractice5: '<strong>Procesar archivos grandes en streaming</strong>: parsers en flujo para archivos que excedan la memoria.',
    bestPractice6: '<strong>Validar datos despues de la conversion</strong>: verificar cantidad de registros, tipos e integridad.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como convierto CSV a JSON?',
    faq1_a: 'Analice la fila de encabezado para obtener nombres de columnas, luego mapee cada fila a las claves correspondientes. Use bibliotecas como Papa Parse (JavaScript) o pandas (Python), o nuestra herramienta en linea gratuita.',
    faq2_q: 'Cual es la diferencia entre CSV y JSON?',
    faq2_a: 'CSV es un formato tabular plano donde todos los valores son cadenas. JSON es jerarquico con soporte para objetos anidados, arrays y multiples tipos. CSV es mas compacto, JSON mas expresivo.',
    faq3_q: 'Puede CSV manejar datos anidados?',
    faq3_a: 'No, CSV no soporta nativamente estructuras anidadas. Debe aplanar los datos con notacion de puntos, codificacion JSON en campos CSV o archivos CSV separados.',
    conclusion: 'La conversion <strong>CSV a JSON</strong> es una habilidad fundamental para desarrolladores y analistas de datos. Use nuestra herramienta gratuita para conversiones instantaneas.',
    linkToolBottom: 'Convierte CSV a JSON y JSON a CSV instantaneamente con nuestra herramienta gratuita.',
  },
  ja: {
    intro: '<strong>CSVからJSON</strong>への変換は、開発者が日常的に直面する最も一般的なデータ変換タスクの一つです。システム間のデータ移行、API構築、スプレッドシート処理など、<strong>CSVをJSONに変換</strong>する方法を効率的に知ることは不可欠です。この包括的なガイドでは、変換ツール、解析アルゴリズム、JavaScript、Python、Bashのコード例、エッジケースのベストプラクティスをカバーします。',
    linkTool: '無料オンラインCSV to JSON変換ツールをお試しください。',
    h2_whatCsv: 'CSVとは？',
    whatCsvDesc1: '<strong>CSV</strong>はComma-Separated Values（カンマ区切り値）の略で、RFC 4180で定義された表形式データを格納するプレーンテキストファイル形式です。各行はレコードを表し、値はカンマや他の区切り文字で区切られます。最初の行は通常ヘッダーとして機能します。',
    whatCsvDesc2: 'CSV形式はコンピューティングの初期から使用されており、そのシンプルさから今も人気があります。あらゆるテキストエディタ、スプレッドシート、プログラミング言語でCSVを読み書きできます。シンプルですが、<strong>CSVパーサー</strong>は引用フィールド、エスケープされた引用符、複数行の値など、いくつかの厄介なケースを処理する必要があります。',
    whatCsvDesc3: '<strong>CSVとJSONの使い分け</strong>：CSVはスプレッドシートのエクスポートやデータベースダンプなどのフラットな表形式データに適しています。JSONは階層的なデータ構造、APIレスポンス、設定ファイルに適しています。',
    h2_comparison: 'CSV vs JSON：詳細比較',
    comparisonDesc: 'CSVとJSONの違いを理解することは、フォーマット選択と変換プロセスの理解に役立ちます：',
    comparisonTable: '<table><thead><tr><th>特徴</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>構造</strong></td><td>フラット、表形式</td><td>階層的（ネストされたオブジェクト）</td></tr><tr><td><strong>可読性</strong></td><td>シンプルなデータでは簡単</td><td>フォーマットすると読みやすい</td></tr><tr><td><strong>ネスト</strong></td><td>ネイティブ非対応</td><td>完全対応</td></tr><tr><td><strong>データ型</strong></td><td>すべて文字列</td><td>文字列、数値、ブール、null、配列、オブジェクト</td></tr><tr><td><strong>ファイルサイズ</strong></td><td>一般的に小さい</td><td>大きい（キーの繰り返し）</td></tr><tr><td><strong>用途</strong></td><td>スプレッドシート、DBエクスポート</td><td>API、設定、NoSQL、Webアプリ</td></tr></tbody></table>',
    h2_howWorks: 'CSVからJSON変換の仕組み',
    howWorksDesc1: '<strong>CSV to JSONコンバーター</strong>のプロセスには以下のステップがあります：',
    howWorksSteps: '<ol><li><strong>ヘッダー行を読む</strong>：列名を抽出し、JSONキーにする。</li><li><strong>各データ行を解析</strong>：区切り文字で分割し、値をヘッダーに対応付ける。</li><li><strong>引用フィールドを処理</strong>：二重引用符で囲まれた値はカンマや改行を含んでも1つのフィールド。</li><li><strong>データ型を検出</strong>：数値、ブール値、null値を自動変換。</li><li><strong>JSON配列を構築</strong>：各行がオブジェクトになり、すべて配列に集められる。</li></ol>',
    howWorksDesc2: '<strong>例</strong>：CSV <code>name,age,active\\nAlice,30,true</code> は <code>[{"name":"Alice","age":30,"active":true}]</code> になります。',
    h2_codeExamples: 'CSV to JSONコード例',
    codeJsTitle: 'JavaScript：CSV to JSON変換',
    codeJsDesc: '<strong>CSV to JSON JavaScript</strong>変換の複数のアプローチ：ネイティブ、Papa Parse、Node.jsのcsv-parser：',
    codePyTitle: 'Python：CSV to JSON変換',
    codePyDesc: '<strong>CSV to JSON Python</strong>変換を<code>csv</code>モジュール、<code>pandas</code>、<code>json.dumps</code>で：',
    codeBashTitle: 'Bash / コマンドライン：CSV to JSON',
    codeBashDesc: 'コマンドラインでの変換：<code>csvkit</code>、<code>miller</code>、<code>jq</code>、<code>awk</code>：',
    codeCLITitle: '専用CLIツール：csvjsonとmiller',
    codeCLIDesc: '<strong>csvjson</strong>（csvkit）と<strong>miller</strong>（mlr）はデータ形式変換専用のコマンドラインツールです：',
    h2_jsonToCsv: 'JSON to CSV変換（逆プロセス）',
    jsonToCsvDesc1: '逆プロセスの<strong>JSON to CSV</strong>は、階層的なJSONデータをフラットな表形式に変換します。',
    jsonToCsvDesc2: '<strong>ネストされたオブジェクトのフラット化</strong>：ドット記法やアンダースコアで展開：<code>user.name</code>、<code>user.address.city</code>。',
    jsonToCsvDesc3: 'JavaScriptとPythonでのJSON to CSV変換例：',
    h2_edgeCases: 'CSV解析のエッジケース処理',
    edgeCasesDesc: '堅牢な<strong>CSVパーサー</strong>は多数のエッジケースを処理する必要があります：',
    edgeCase1: '<strong>UTF-8 BOM</strong>：一部のアプリケーションがファイル先頭に不可視のBOMを付加します。パーサーはこれを除去すべきです。',
    edgeCase2: '<strong>区切り文字のバリエーション</strong>：ヨーロッパではセミコロン、TSVではタブ。良いパーサーは自動検出します。',
    edgeCase3: '<strong>欠損値と空フィールド</strong>：末尾のカンマや中間の空フィールド。空文字列またはnullとして保持すべきです。',
    edgeCase4: '<strong>複数行フィールド</strong>：RFC 4180は二重引用符内の複数行値を許可しています。',
    edgeCase5: '<strong>特殊文字とエスケープ</strong>：引用フィールド内の二重引用符は二重化でエスケープします。',
    edgeCase6: '<strong>不整合な行の長さ</strong>：堅牢なパーサーは短い行を空値で埋めるか、長い行を切り詰めるべきです。',
    h2_bestPractices: 'CSVベストプラクティス',
    bestPracticesDesc: '最大の互換性とデータ整合性のためにこれらのベストプラクティスに従ってください：',
    bestPractice1: '<strong>常にUTF-8エンコーディングを使用</strong>：テキストエンコーディングのユニバーサル標準。',
    bestPractice2: '<strong>フィールドを一貫して引用</strong>：最も安全なのは全フィールドを引用すること。',
    bestPractice3: '<strong>ヘッダー行を含める</strong>：記述的な名前と一貫した命名規則で。',
    bestPractice4: '<strong>一貫した区切り文字を使用</strong>：ファイル全体で1つの区切り文字。',
    bestPractice5: '<strong>大きなファイルはストリーム処理</strong>：メモリを超えるファイルにはストリーミングパーサーを使用。',
    bestPractice6: '<strong>変換後にデータを検証</strong>：レコード数、データ型、整合性を確認。',
    h2_faq: 'よくある質問',
    faq1_q: 'CSVをJSONに変換するには？',
    faq1_a: 'ヘッダー行を解析して列名を取得し、各行を対応するキーにマッピングします。Papa Parse（JavaScript）やpandas（Python）などのライブラリ、または無料オンラインツールを使用できます。',
    faq2_q: 'CSVとJSONの違いは？',
    faq2_a: 'CSVはフラットな表形式で全値が文字列。JSONは階層的でネストオブジェクト、配列、複数のデータ型をサポート。CSVはよりコンパクト、JSONはより表現力豊か。',
    faq3_q: 'CSVはネストされたデータを扱えますか？',
    faq3_a: 'いいえ、CSVはネイティブではネスト構造をサポートしません。ドット記法、CSV内のJSON文字列エンコード、別々のCSVファイルなどでデータをフラット化する必要があります。',
    conclusion: '<strong>CSV to JSON</strong>変換は開発者とデータアナリストの基本的なスキルです。無料ツールで即座に変換できます。',
    linkToolBottom: '無料オンラインツールでCSVとJSONを即座に変換。',
  },
  ko: {
    intro: '<strong>CSV에서 JSON</strong>으로의 변환은 개발자가 매일 직면하는 가장 일반적인 데이터 변환 작업 중 하나입니다. 시스템 간 데이터 마이그레이션, API 구축, 스프레드시트 처리 등 <strong>CSV를 JSON으로 변환</strong>하는 방법을 효율적으로 아는 것은 필수적입니다. 이 종합 가이드에서는 변환 도구, 파싱 알고리즘, JavaScript, Python, Bash 코드 예제 및 엣지 케이스 처리 모범 사례를 다룹니다.',
    linkTool: '무료 온라인 CSV to JSON 변환 도구를 사용해 보세요.',
    h2_whatCsv: 'CSV란 무엇인가?',
    whatCsvDesc1: '<strong>CSV</strong>는 Comma-Separated Values(쉼표로 구분된 값)의 약자로, RFC 4180에서 정의한 테이블 형식 데이터를 저장하는 일반 텍스트 파일 형식입니다. 각 행은 레코드를 나타내며, 값은 쉼표나 다른 구분자로 구분됩니다. 첫 번째 행은 일반적으로 헤더 역할을 합니다.',
    whatCsvDesc2: 'CSV 형식은 컴퓨팅 초기부터 사용되어 왔으며 단순함 때문에 여전히 인기가 있습니다. 모든 텍스트 편집기, 스프레드시트, 프로그래밍 언어에서 CSV를 읽고 쓸 수 있습니다. 단순하지만 <strong>CSV 파서</strong>는 인용 필드, 이스케이프된 따옴표, 여러 줄 값 등 까다로운 경우를 처리해야 합니다.',
    whatCsvDesc3: '<strong>CSV와 JSON 사용 시기</strong>: CSV는 스프레드시트 내보내기, 데이터베이스 덤프 등 플랫 테이블 데이터에 적합합니다. JSON은 계층적 데이터 구조, API 응답, 설정 파일에 더 좋습니다.',
    h2_comparison: 'CSV vs JSON: 상세 비교',
    comparisonDesc: 'CSV와 JSON의 차이를 이해하면 올바른 형식 선택과 변환 프로세스 이해에 도움이 됩니다:',
    comparisonTable: '<table><thead><tr><th>특징</th><th>CSV</th><th>JSON</th></tr></thead><tbody><tr><td><strong>구조</strong></td><td>플랫, 테이블 형식</td><td>계층적 (중첩 객체)</td></tr><tr><td><strong>가독성</strong></td><td>간단한 데이터는 쉬움</td><td>포맷팅하면 읽기 쉬움</td></tr><tr><td><strong>중첩</strong></td><td>네이티브 미지원</td><td>완전 지원</td></tr><tr><td><strong>데이터 타입</strong></td><td>모두 문자열</td><td>문자열, 숫자, 불리언, null, 배열, 객체</td></tr><tr><td><strong>파일 크기</strong></td><td>일반적으로 작음</td><td>더 큼 (키 반복)</td></tr><tr><td><strong>사용 사례</strong></td><td>스프레드시트, DB 내보내기</td><td>API, 설정, NoSQL, 웹앱</td></tr></tbody></table>',
    h2_howWorks: 'CSV에서 JSON 변환 작동 원리',
    howWorksDesc1: '<strong>CSV to JSON 변환기</strong> 프로세스는 여러 단계를 포함합니다:',
    howWorksSteps: '<ol><li><strong>헤더 행 읽기</strong>: 열 이름을 추출하여 JSON 키로 사용.</li><li><strong>각 데이터 행 파싱</strong>: 구분자로 분할하고 값을 헤더에 매핑.</li><li><strong>인용 필드 처리</strong>: 큰따옴표로 둘러싼 값은 쉼표나 줄바꿈이 있어도 하나의 필드.</li><li><strong>데이터 타입 감지</strong>: 숫자, 불리언, null 값 자동 변환.</li><li><strong>JSON 배열 구축</strong>: 각 행이 객체가 되고 모두 배열에 수집.</li></ol>',
    howWorksDesc2: '<strong>예시</strong>: CSV <code>name,age,active\\nAlice,30,true</code>는 <code>[{"name":"Alice","age":30,"active":true}]</code>가 됩니다.',
    h2_codeExamples: 'CSV to JSON 코드 예제',
    codeJsTitle: 'JavaScript: CSV to JSON 변환',
    codeJsDesc: '<strong>CSV to JSON JavaScript</strong> 변환의 여러 접근법: 네이티브, Papa Parse, Node.js csv-parser:',
    codePyTitle: 'Python: CSV to JSON 변환',
    codePyDesc: '<strong>CSV to JSON Python</strong> 변환: <code>csv</code> 모듈, <code>pandas</code>, <code>json.dumps</code>:',
    codeBashTitle: 'Bash / 커맨드 라인: CSV to JSON',
    codeBashDesc: '커맨드 라인에서 <code>csvkit</code>, <code>miller</code>, <code>jq</code>, <code>awk</code>로 변환:',
    codeCLITitle: '전용 CLI 도구: csvjson과 miller',
    codeCLIDesc: '<strong>csvjson</strong>(csvkit)과 <strong>miller</strong>(mlr)는 데이터 형식 변환 전용 커맨드 라인 도구입니다:',
    h2_jsonToCsv: 'JSON to CSV 변환 (역방향 프로세스)',
    jsonToCsvDesc1: '역방향 프로세스인 <strong>JSON to CSV</strong>는 계층적 JSON 데이터를 플랫 테이블 구조로 변환합니다.',
    jsonToCsvDesc2: '<strong>중첩 객체 플랫화</strong>: 점 표기법이나 밑줄로 펼침: <code>user.name</code>, <code>user.address.city</code>.',
    jsonToCsvDesc3: 'JavaScript와 Python에서의 JSON to CSV 변환 예제:',
    h2_edgeCases: 'CSV 파싱 엣지 케이스 처리',
    edgeCasesDesc: '견고한 <strong>CSV 파서</strong>는 수많은 엣지 케이스를 처리해야 합니다:',
    edgeCase1: '<strong>UTF-8 BOM</strong>: 일부 애플리케이션이 파일 시작에 보이지 않는 BOM을 추가합니다. 파서가 이를 제거해야 합니다.',
    edgeCase2: '<strong>구분자 변형</strong>: 유럽에서는 세미콜론, TSV에서는 탭. 좋은 파서는 자동 감지합니다.',
    edgeCase3: '<strong>누락된 값과 빈 필드</strong>: 후행 쉼표나 중간의 빈 필드. 빈 문자열이나 null로 유지해야 합니다.',
    edgeCase4: '<strong>여러 줄 필드</strong>: RFC 4180은 큰따옴표 안의 여러 줄 값을 허용합니다.',
    edgeCase5: '<strong>특수 문자와 이스케이프</strong>: 인용 필드 내 큰따옴표는 두 번 써서 이스케이프합니다.',
    edgeCase6: '<strong>불일치하는 행 길이</strong>: 견고한 파서는 짧은 행을 빈 값으로 채우거나 긴 행을 자릅니다.',
    h2_bestPractices: 'CSV 모범 사례',
    bestPracticesDesc: '최대 호환성과 데이터 무결성을 위해 다음 모범 사례를 따르세요:',
    bestPractice1: '<strong>항상 UTF-8 인코딩 사용</strong>: 텍스트 인코딩의 유니버설 표준.',
    bestPractice2: '<strong>필드를 일관되게 인용</strong>: 가장 안전한 것은 모든 필드를 인용하는 것.',
    bestPractice3: '<strong>헤더 행 포함</strong>: 설명적인 이름과 일관된 명명 규칙으로.',
    bestPractice4: '<strong>일관된 구분자 사용</strong>: 파일 전체에 하나의 구분자.',
    bestPractice5: '<strong>큰 파일은 스트림 처리</strong>: 메모리를 초과하는 파일에 스트리밍 파서 사용.',
    bestPractice6: '<strong>변환 후 데이터 검증</strong>: 레코드 수, 데이터 타입, 무결성 확인.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'CSV를 JSON으로 변환하려면?',
    faq1_a: '헤더 행을 파싱하여 열 이름을 얻고, 각 행을 해당 키에 매핑합니다. Papa Parse(JavaScript)나 pandas(Python) 등의 라이브러리 또는 무료 온라인 도구를 사용할 수 있습니다.',
    faq2_q: 'CSV와 JSON의 차이점은?',
    faq2_a: 'CSV는 모든 값이 문자열인 플랫 테이블 형식입니다. JSON은 중첩 객체, 배열, 다양한 데이터 타입을 지원하는 계층적 형식입니다. CSV는 더 컴팩트하고, JSON은 더 표현력이 풍부합니다.',
    faq3_q: 'CSV는 중첩된 데이터를 처리할 수 있나요?',
    faq3_a: '아닙니다. CSV는 네이티브로 중첩 구조를 지원하지 않습니다. 점 표기법, CSV 필드 내 JSON 인코딩, 별도의 CSV 파일 등으로 데이터를 플랫화해야 합니다.',
    conclusion: '<strong>CSV to JSON</strong> 변환은 개발자와 데이터 분석가의 기본 기술입니다. 무료 도구로 즉시 변환하세요.',
    linkToolBottom: '무료 온라인 도구로 CSV와 JSON을 즉시 변환하세요.',
  },
};

export default function CsvToJsonConverterGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/csv-json`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is CSV? */}
      <h2>{s.h2_whatCsv}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatCsvDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatCsvDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatCsvDesc3 }} />

      {/* Section 2: CSV vs JSON Comparison */}
      <h2>{s.h2_comparison}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.comparisonDesc }} />
      <div dangerouslySetInnerHTML={{ __html: s.comparisonTable }} />

      {/* Section 3: How CSV to JSON Conversion Works */}
      <h2>{s.h2_howWorks}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.howWorksSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.howWorksDesc2 }} />

      {/* Section 4: Code Examples */}
      <h2>{s.h2_codeExamples}</h2>

      <h3>{s.codeJsTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeJsDesc }} />
      <pre><code>{`// ===== Native JavaScript: CSV to JSON =====

function csvToJson(csv) {
  const lines = csv.trim().split('\\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    headers.forEach((header, index) => {
      let val = values[index]?.trim() || '';
      // Auto-detect types
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      else if (val === 'null' || val === '') val = null;
      else if (!isNaN(val) && val !== '') val = Number(val);
      obj[header] = val;
    });
    result.push(obj);
  }
  return result;
}

const csv = \`name,age,city,active
Alice,30,New York,true
Bob,25,London,false
Charlie,35,Tokyo,true\`;

console.log(JSON.stringify(csvToJson(csv), null, 2));
// [
//   { "name": "Alice", "age": 30, "city": "New York", "active": true },
//   { "name": "Bob", "age": 25, "city": "London", "active": false },
//   { "name": "Charlie", "age": 35, "city": "Tokyo", "active": true }
// ]

// ===== Papa Parse (Browser & Node.js) =====
// npm install papaparse

import Papa from 'papaparse';

// Parse CSV string
const result = Papa.parse(csvString, {
  header: true,         // Use first row as keys
  dynamicTyping: true,  // Auto-detect numbers and booleans
  skipEmptyLines: true, // Ignore blank lines
});

console.log(result.data);   // Array of JSON objects
console.log(result.errors); // Any parsing errors
console.log(result.meta);   // Metadata (delimiter, fields, etc.)

// Parse CSV file (browser)
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  Papa.parse(e.target.files[0], {
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      console.log(results.data); // JSON array
    },
  });
});

// ===== Node.js: csv-parser (streaming) =====
// npm install csv-parser

const csvParser = require('csv-parser');
const fs = require('fs');

const results = [];
fs.createReadStream('data.csv')
  .pipe(csvParser())
  .on('data', (row) => results.push(row))
  .on('end', () => {
    console.log(JSON.stringify(results, null, 2));
  });`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`# ===== Python csv module =====
import csv
import json

# CSV string to JSON
csv_string = """name,age,city,active
Alice,30,New York,true
Bob,25,London,false"""

reader = csv.DictReader(csv_string.strip().splitlines())
data = list(reader)
json_output = json.dumps(data, indent=2)
print(json_output)

# CSV file to JSON file
with open('input.csv', 'r', encoding='utf-8') as csv_file:
    reader = csv.DictReader(csv_file)
    data = list(reader)

with open('output.json', 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2, ensure_ascii=False)

# ===== pandas (recommended for large datasets) =====
import pandas as pd

# CSV to JSON with pandas
df = pd.read_csv('data.csv')

# Different JSON orientations
print(df.to_json(orient='records', indent=2))  # Array of objects
print(df.to_json(orient='columns', indent=2))  # Object of arrays
print(df.to_json(orient='index', indent=2))     # Object keyed by index

# With type conversion
df['age'] = pd.to_numeric(df['age'], errors='coerce')
df['active'] = df['active'].map({'true': True, 'false': False})

# Save to file
df.to_json('output.json', orient='records', indent=2, force_ascii=False)

# ===== Streaming large CSV files =====
import csv
import json

def csv_to_json_stream(csv_path, json_path, chunk_size=1000):
    """Convert large CSV to JSON using streaming."""
    with open(json_path, 'w') as out:
        out.write('[\\n')
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            first = True
            for row in reader:
                if not first:
                    out.write(',\\n')
                json.dump(row, out, ensure_ascii=False)
                first = False
        out.write('\\n]')

csv_to_json_stream('large_file.csv', 'output.json')`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== csvkit: csvjson command =====
# pip install csvkit

# Basic CSV to JSON conversion
csvjson data.csv > output.json

# Indent output for readability
csvjson --indent 2 data.csv > output.json

# Specify a key column (creates object instead of array)
csvjson --key id data.csv > output.json

# ===== miller (mlr): powerful data processing =====
# brew install miller (macOS) or apt install miller (Linux)

# CSV to JSON
mlr --icsv --ojson cat data.csv > output.json

# CSV to JSON with filtering
mlr --icsv --ojson filter '$age > 25' data.csv

# CSV to JSON with field selection
mlr --icsv --ojson cut -f name,city data.csv

# ===== jq + awk: lightweight approach =====
# Convert simple CSV to JSON with awk
awk -F',' 'NR==1{split($0,h);next}
{printf "{";for(i=1;i<=NF;i++)
printf "%s\\"%s\\":\\"%s\\"",
(i>1?",":""),h[i],$i;print "}"}' data.csv | jq -s '.'

# ===== Using sed + jq for quick conversion =====
# Convert CSV to JSON (simple, no quoted fields)
head -1 data.csv | tr ',' '\\n' > /tmp/headers.txt
tail -n +2 data.csv | while IFS=',' read -r col1 col2 col3; do
  jq -n --arg a "$col1" --arg b "$col2" --arg c "$col3" \\
    '{name:$a, age:($b|tonumber), city:$c}'
done | jq -s '.'`}</code></pre>

      <h3>{s.codeCLITitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeCLIDesc }} />
      <pre><code>{`# ===== csvkit: full suite of CSV tools =====
# pip install csvkit

# View CSV statistics
csvstat data.csv

# Convert CSV to JSON
csvjson data.csv

# Convert Excel to CSV first, then to JSON
in2csv data.xlsx | csvjson > output.json

# Query CSV with SQL syntax, output as JSON
csvsql --query "SELECT name, age FROM data WHERE age > 25" data.csv | csvjson

# ===== miller (mlr): Swiss Army knife for data =====

# CSV to JSON (pretty-printed)
mlr --icsv --ojson --jflatsep '.' cat data.csv

# CSV to JSON with data transformation
mlr --icsv --ojson put '$full_name = $first . " " . $last' data.csv

# CSV to NDJSON (newline-delimited JSON, one object per line)
mlr --icsv --ojsonl cat data.csv

# Convert between any formats
mlr --icsv --ojson cat data.csv       # CSV -> JSON
mlr --ijson --ocsv cat data.json      # JSON -> CSV
mlr --icsv --otsv cat data.csv        # CSV -> TSV
mlr --itsv --ojson cat data.tsv       # TSV -> JSON`}</code></pre>

      {/* Section 5: JSON to CSV Conversion */}
      <h2>{s.h2_jsonToCsv}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsonToCsvDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToCsvDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsonToCsvDesc3 }} />
      <pre><code>{`// ===== JavaScript: JSON to CSV =====

function jsonToCsv(jsonArray) {
  if (!jsonArray.length) return '';

  // Flatten nested objects
  function flatten(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
      const fullKey = prefix ? prefix + '.' + key : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flatten(obj[key], fullKey));
      } else if (Array.isArray(obj[key])) {
        acc[fullKey] = obj[key].join('|'); // Join arrays with pipe
      } else {
        acc[fullKey] = obj[key];
      }
      return acc;
    }, {});
  }

  const flatData = jsonArray.map(item => flatten(item));
  const headers = [...new Set(flatData.flatMap(Object.keys))];

  const csvRows = [headers.join(',')];
  for (const row of flatData) {
    const values = headers.map(h => {
      const val = row[h] ?? '';
      // Quote values containing commas, quotes, or newlines
      const str = String(val);
      return str.includes(',') || str.includes('"') || str.includes('\\n')
        ? '"' + str.replace(/"/g, '""') + '"'
        : str;
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('\\n');
}

// Example with nested JSON
const data = [
  { name: "Alice", address: { city: "NYC", zip: "10001" }, tags: ["dev", "admin"] },
  { name: "Bob", address: { city: "London", zip: "EC1A" }, tags: ["user"] },
];
console.log(jsonToCsv(data));
// name,address.city,address.zip,tags
// Alice,NYC,10001,dev|admin
// Bob,London,EC1A,user`}</code></pre>

      <pre><code>{`# ===== Python: JSON to CSV =====
import json
import csv
import pandas as pd

# Method 1: pandas (easiest)
with open('data.json') as f:
    data = json.load(f)

df = pd.json_normalize(data, sep='.')  # Flatten nested objects
df.to_csv('output.csv', index=False)

# Method 2: csv module (manual control)
def json_to_csv(json_data, csv_path):
    """Convert JSON array to CSV, handling nested objects."""
    flat_data = [flatten_dict(item) for item in json_data]
    fieldnames = list(dict.fromkeys(
        key for item in flat_data for key in item.keys()
    ))

    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(flat_data)

def flatten_dict(d, parent_key='', sep='.'):
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep).items())
        elif isinstance(v, list):
            items.append((new_key, '|'.join(str(i) for i in v)))
        else:
            items.append((new_key, v))
    return dict(items)`}</code></pre>

      {/* Section 6: Handling Edge Cases */}
      <h2>{s.h2_edgeCases}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.edgeCasesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.edgeCase6 }} />

      <pre><code>{`// Robust CSV parser handling all edge cases
function parseCSV(text, delimiter = ',') {
  // Strip UTF-8 BOM if present
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"'; // Escaped quote
        i++;          // Skip next quote
      } else if (char === '"') {
        inQuotes = false; // End of quoted field
      } else {
        field += char; // Regular char inside quotes
      }
    } else {
      if (char === '"') {
        inQuotes = true; // Start quoted field
      } else if (char === delimiter) {
        row.push(field);
        field = '';
      } else if (char === '\\n' || (char === '\\r' && next === '\\n')) {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
        if (char === '\\r') i++; // Skip \\n in \\r\\n
      } else {
        field += char;
      }
    }
  }

  // Push last field and row
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}`}</code></pre>

      {/* Section 7: CSV Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice6 }} />

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/csv-json`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
