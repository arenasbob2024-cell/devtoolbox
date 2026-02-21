import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'Converting <strong>JSON to CSV</strong> is one of the most common data transformation tasks developers and analysts face. Whether you need to import API data into a spreadsheet, prepare a dataset for a legacy system, or generate a report that non-technical stakeholders can open in Excel, knowing how to <strong>convert JSON to CSV</strong> reliably is essential. This guide covers five proven methods: online converter tools, Python with pandas, JavaScript/Node.js, the jq command-line tool, and Excel Power Query. Each approach has different strengths, so choose the one that fits your workflow. If you need a quick conversion right now, try our free online tool.',
    linkTool: 'Convert JSON to CSV instantly with our free online CSV-JSON Converter.',
    h2_why: 'Why Convert JSON to CSV?',
    whyDesc1: 'JSON (JavaScript Object Notation) is the standard data format for web APIs, NoSQL databases, and modern applications. CSV (Comma-Separated Values) is the universal tabular format supported by spreadsheets, databases, data analysis tools, and legacy systems. Converting between them bridges these two worlds.',
    whyDesc2: 'Common scenarios for <strong>JSON to CSV</strong> conversion include: exporting API response data for analysis in Excel or Google Sheets, preparing data imports for SQL databases or CRM systems, generating human-readable reports from application data, migrating data between systems with different format requirements, and feeding data into visualization tools like Tableau or Power BI that prefer CSV input.',
    whyDesc3: 'The main challenge in JSON to CSV conversion is <strong>flattening nested structures</strong>. JSON supports arbitrarily nested objects and arrays, while CSV is strictly two-dimensional (rows and columns). Different tools handle this flattening differently, which is why understanding multiple methods is valuable.',
    h2_online: 'Method 1: Convert JSON to CSV Online (Fastest)',
    onlineDesc1: 'Online converter tools are the fastest way to transform JSON to CSV without writing any code. Our <strong>CSV-JSON Converter</strong> tool handles the conversion instantly in your browser:',
    onlineLink: 'Try our free JSON to CSV / CSV to JSON Converter.',
    onlineSteps: '<ol><li>Navigate to the <strong>CSV-JSON Converter</strong> tool.</li><li>Select the <strong>JSON to CSV</strong> direction.</li><li>Paste your JSON data or upload a <code>.json</code> file.</li><li>Click <strong>Convert</strong>. The tool automatically flattens nested objects using dot notation (e.g., <code>address.city</code> becomes a column header).</li><li>Copy the CSV output or download it as a <code>.csv</code> file.</li></ol>',
    onlineDesc2: 'Online tools are ideal for one-off conversions, quick data checks, and situations where you cannot install software. They run entirely in your browser, so your data never leaves your machine. For automated or batch conversions, use one of the programmatic methods below.',
    h2_python: 'Method 2: Convert JSON to CSV with Python (pandas)',
    pythonDesc1: '<strong>Python with pandas</strong> is the most popular method for converting JSON to CSV in data science and backend workflows. The pandas library provides powerful tools for reading JSON, normalizing nested structures, and exporting to CSV with full control over formatting:',
    pythonDesc2: 'The <code>pd.json_normalize()</code> function is the key to handling nested JSON. It recursively flattens nested objects into columns with dot-separated names. For arrays within objects, you may need to use the <code>record_path</code> and <code>meta</code> parameters to specify how to expand them. For simple flat JSON arrays, <code>pd.read_json()</code> works directly without normalization.',
    pythonCsvModule: 'If you prefer the standard library without installing pandas, Python\'s built-in <code>csv</code> and <code>json</code> modules work together:',
    pythonCsvDesc: 'The standard library approach is lightweight and works without any external dependencies. It is best for simple, flat JSON arrays where each object has the same keys. For nested JSON with varying structures, pandas <code>json_normalize()</code> is significantly more powerful.',
    h2_javascript: 'Method 3: Convert JSON to CSV with JavaScript / Node.js',
    jsDesc1: 'JavaScript and Node.js are natural choices for JSON to CSV conversion since JSON is a native JavaScript format. Here are approaches for both browser and server environments:',
    jsDesc2: 'For production use, consider the <code>json2csv</code> npm package which handles edge cases like quoted fields, nested objects, and custom delimiters. Install with <code>npm install json2csv</code> and use the <code>parse()</code> function with options for field selection and flattening.',
    jsNodeDesc: 'The Node.js approach above reads a JSON file, extracts headers from the first object, and writes each row as comma-separated values. For large files, use a streaming approach with <code>fs.createReadStream()</code> and a JSON streaming parser like <code>JSONStream</code> to avoid loading the entire file into memory.',
    h2_jq: 'Method 4: Convert JSON to CSV with jq (Command Line)',
    jqDesc1: '<strong>jq</strong> is a lightweight command-line JSON processor that can transform JSON to CSV with a single command. It is perfect for shell scripts, CI/CD pipelines, and quick terminal conversions:',
    jqDesc2: 'The jq approach works best with flat or consistently structured JSON arrays. For deeply nested JSON, you may need more complex jq filters to flatten the structure before conversion. The <code>@csv</code> filter handles proper CSV escaping including quoting fields that contain commas or newlines.',
    jqAdvanced: 'For more complex transformations, jq supports variables, conditionals, and recursive descent. You can flatten nested objects with <code>[.key1, .nested.key2, (.array | join(";"))]</code> to handle arrays by joining their elements with a delimiter.',
    h2_excel: 'Method 5: Convert JSON to CSV with Excel / Power Query',
    excelDesc1: '<strong>Excel Power Query</strong> provides a visual, no-code approach to importing and transforming JSON data. This method is ideal for business users and analysts who work primarily in Excel:',
    excelSteps: '<ol><li>Open Excel and go to <strong>Data &gt; Get Data &gt; From File &gt; From JSON</strong>.</li><li>Select your <code>.json</code> file. The Power Query Editor opens with a preview of the data.</li><li>Click <strong>To Table</strong> to convert the JSON structure to a tabular format.</li><li>Expand nested columns by clicking the expand icon (two arrows) next to column headers. Select which nested fields to include.</li><li>Remove or rename columns as needed using the Transform tab.</li><li>Click <strong>Close &amp; Load</strong> to import the data into an Excel worksheet.</li><li>Save the file as CSV using <strong>File &gt; Save As &gt; CSV (Comma delimited)</strong>.</li></ol>',
    excelDesc2: 'Power Query remembers your transformation steps, so if the source JSON file is updated, you can refresh the query to re-import the data with the same transformations applied. Google Sheets also supports JSON import via the <code>=IMPORTDATA()</code> function for CSV URLs or through Google Apps Script for direct JSON parsing.',
    h2_nested: 'Handling Nested JSON: Flattening Strategies',
    nestedDesc1: 'The biggest challenge in JSON to CSV conversion is handling nested objects and arrays. CSV is a flat, two-dimensional format, so all nested structures must be flattened. Here are the common strategies:',
    nestedStrategy1: '<strong>Dot notation flattening</strong>: Nested keys are joined with dots. For example, <code>{"user": {"name": "Alice", "address": {"city": "NYC"}}}</code> becomes columns <code>user.name</code> and <code>user.address.city</code>. This is the default behavior in pandas <code>json_normalize()</code> and most online tools.',
    nestedStrategy2: '<strong>Array handling</strong>: Arrays can be handled by joining elements with a delimiter (e.g., <code>tags: ["a","b"]</code> becomes <code>a;b</code>), by creating separate rows for each array element (one-to-many expansion), or by creating numbered columns (<code>tags.0</code>, <code>tags.1</code>). The best approach depends on your downstream use case.',
    nestedStrategy3: '<strong>Selective extraction</strong>: For deeply nested JSON, you may want to extract only specific fields rather than flattening everything. This produces cleaner CSV with only the columns you need. Tools like jq and pandas let you select specific paths.',
    h2_comparison: 'Method Comparison: Which Should You Choose?',
    comparisonTable: '<table><thead><tr><th>Method</th><th>Best For</th><th>Handles Nesting</th><th>Setup Required</th></tr></thead><tbody><tr><td>Online Tool</td><td>Quick one-off conversions</td><td>Auto-flattening</td><td>None</td></tr><tr><td>Python / pandas</td><td>Data science, automation, large files</td><td>Excellent (json_normalize)</td><td>pip install pandas</td></tr><tr><td>JavaScript / Node.js</td><td>Web apps, API integrations</td><td>Good (with json2csv)</td><td>npm install json2csv</td></tr><tr><td>jq</td><td>Shell scripts, CI/CD, terminal</td><td>Manual (filters)</td><td>brew/apt install jq</td></tr><tr><td>Excel Power Query</td><td>Business users, ad-hoc analysis</td><td>Visual expand</td><td>Excel installed</td></tr></tbody></table>',
    h2_tips: 'Tips for Clean JSON to CSV Conversion',
    tipsDesc: 'Follow these best practices to avoid common pitfalls when converting JSON to CSV:',
    tip1: '<strong>Inspect your JSON structure first</strong>: Before converting, understand whether your JSON is a flat array of objects, contains nested objects, or includes arrays within objects. Use our JSON Viewer tool to explore the structure visually.',
    tip2: '<strong>Handle missing fields gracefully</strong>: Not all JSON objects may have the same keys. Ensure your conversion method handles missing fields by inserting empty values rather than shifting columns. pandas and json2csv handle this automatically.',
    tip3: '<strong>Watch for special characters</strong>: CSV fields containing commas, quotes, or newlines must be properly escaped with double quotes. Most libraries handle this automatically, but verify the output if you are writing custom conversion code.',
    tip4: '<strong>Choose the right delimiter</strong>: While comma is the standard CSV delimiter, some locales use semicolons (especially in Europe where commas are decimal separators). Most tools let you specify the delimiter. Use TSV (tab-separated) if your data contains many commas.',
    tip5: '<strong>Preserve data types</strong>: CSV is a text format, so numbers, booleans, and dates lose their type information. If type preservation matters, consider keeping the data in JSON format or adding a header row that documents the expected types.',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How to convert JSON to CSV online?',
    faq1_a: 'Use an online JSON to CSV converter like the DevToolBox CSV-JSON Converter at viadreams.cc/en/tools/csv-json. Paste your JSON data, select JSON to CSV direction, and click Convert. The tool automatically flattens nested objects and generates downloadable CSV output. No installation or signup required, and the conversion runs entirely in your browser for privacy.',
    faq2_q: 'Can Excel open JSON files?',
    faq2_a: 'Yes, Excel can open JSON files using Power Query. Go to Data > Get Data > From File > From JSON, select your file, and use the Power Query Editor to expand nested structures into columns. You can then save the result as CSV. Alternatively, convert the JSON to CSV first using an online tool or Python script, then open the CSV directly in Excel.',
    faq3_q: 'How to convert nested JSON to CSV?',
    faq3_a: 'Nested JSON requires flattening before CSV conversion. Use Python pandas with pd.json_normalize() for automatic dot-notation flattening, jq with custom filters to select and flatten specific fields, or an online tool that handles nesting automatically. The key decision is how to handle arrays: join elements with a delimiter, create separate rows, or create numbered columns.',
    faq4_q: 'What is the best Python library for JSON to CSV conversion?',
    faq4_a: 'pandas is the best Python library for JSON to CSV conversion. Use pd.json_normalize() for nested JSON and pd.read_json() for flat JSON arrays. Both produce a DataFrame that can be exported to CSV with df.to_csv(). For simple cases without dependencies, Python built-in json and csv modules work well together.',
    faq5_q: 'Can I convert large JSON files (1GB+) to CSV?',
    faq5_a: 'Yes, but you need streaming approaches to avoid memory issues. In Python, use ijson for streaming JSON parsing combined with csv.writer for output. In Node.js, use JSONStream with a writable CSV stream. With jq, the --stream flag enables incremental processing. Online tools typically have size limits and are not suitable for files over 50-100MB.',
    conclusion: 'Converting <strong>JSON to CSV</strong> is a fundamental data transformation skill. For quick conversions, use our online CSV-JSON converter. For automated workflows, Python with pandas offers the most powerful and flexible approach. Command-line users will appreciate jq for its speed and scriptability. Excel Power Query serves business users who prefer a visual interface. Whichever method you choose, the key is understanding your JSON structure and choosing the right flattening strategy for nested data.',
    linkToolBottom: 'Convert JSON to CSV instantly with our free online tool.',
  },
  zh: {
    intro: '将 <strong>JSON 转换为 CSV</strong> 是开发者和分析师最常见的数据转换任务之一。无论是将 API 数据导入电子表格、为传统系统准备数据集，还是生成非技术人员可在 Excel 中打开的报告，掌握 JSON 转 CSV 的方法都很重要。本指南涵盖五种方法：在线工具、Python pandas、JavaScript/Node.js、jq 命令行和 Excel Power Query。',
    linkTool: '使用我们的免费在线 CSV-JSON 转换器即时将 JSON 转换为 CSV。',
    h2_why: '为什么要将 JSON 转换为 CSV？',
    whyDesc1: 'JSON 是 Web API、NoSQL 数据库和现代应用的标准数据格式。CSV 是电子表格、数据库和数据分析工具支持的通用表格格式。',
    whyDesc2: '常见场景包括：导出 API 数据到 Excel 分析、准备 SQL 数据库导入、生成可读报告、系统间数据迁移、为 Tableau 等可视化工具准备数据。',
    whyDesc3: 'JSON 转 CSV 的主要挑战是<strong>扁平化嵌套结构</strong>。JSON 支持任意嵌套，而 CSV 严格是二维的。',
    h2_online: '方法一：在线转换 JSON 为 CSV（最快）',
    onlineDesc1: '在线转换工具是无需编写代码即可将 JSON 转换为 CSV 的最快方式：',
    onlineLink: '试用我们的免费 JSON 转 CSV / CSV 转 JSON 转换器。',
    onlineSteps: '<ol><li>打开 CSV-JSON 转换器工具。</li><li>选择 JSON 转 CSV 方向。</li><li>粘贴 JSON 数据或上传文件。</li><li>点击转换，工具自动扁平化嵌套对象。</li><li>复制 CSV 或下载文件。</li></ol>',
    onlineDesc2: '在线工具适合一次性转换和快速数据检查。数据在浏览器中处理，不会离开您的机器。',
    h2_python: '方法二：用 Python pandas 转换',
    pythonDesc1: 'Python pandas 是数据科学和后端工作流中最常用的 JSON 转 CSV 方法：',
    pythonDesc2: '<code>pd.json_normalize()</code> 是处理嵌套 JSON 的关键，它递归扁平化嵌套对象为点分列名。',
    pythonCsvModule: '不安装 pandas 时，可使用 Python 内置的 csv 和 json 模块：',
    pythonCsvDesc: '标准库方法轻量级，适合简单的扁平 JSON 数组。嵌套 JSON 推荐使用 pandas。',
    h2_javascript: '方法三：用 JavaScript / Node.js 转换',
    jsDesc1: 'JavaScript 是 JSON 转 CSV 的自然选择，因为 JSON 是原生 JavaScript 格式：',
    jsDesc2: '生产环境建议使用 <code>json2csv</code> npm 包处理引号、嵌套和自定义分隔符。',
    jsNodeDesc: 'Node.js 方法读取 JSON 文件，提取表头，写入 CSV。大文件使用流式处理。',
    h2_jq: '方法四：用 jq 命令行转换',
    jqDesc1: 'jq 是轻量级命令行 JSON 处理器，可用一条命令完成 JSON 转 CSV：',
    jqDesc2: 'jq 方法适合扁平或结构一致的 JSON 数组。<code>@csv</code> 过滤器处理正确的 CSV 转义。',
    jqAdvanced: '复杂转换可使用 jq 的变量、条件和递归下降功能来扁平化嵌套对象。',
    h2_excel: '方法五：用 Excel Power Query 转换',
    excelDesc1: 'Excel Power Query 提供可视化、无代码的 JSON 数据导入和转换方式：',
    excelSteps: '<ol><li>打开 Excel，数据 > 获取数据 > 从文件 > 从 JSON。</li><li>选择文件，Power Query 编辑器打开。</li><li>点击"转到表"转换为表格格式。</li><li>展开嵌套列。</li><li>关闭并加载到工作表。</li><li>另存为 CSV。</li></ol>',
    excelDesc2: 'Power Query 记住转换步骤，源文件更新后可刷新查询。Google Sheets 也支持 JSON 导入。',
    h2_nested: '处理嵌套 JSON：扁平化策略',
    nestedDesc1: 'JSON 转 CSV 最大的挑战是处理嵌套对象和数组：',
    nestedStrategy1: '<strong>点标记扁平化</strong>：嵌套键用点连接，如 <code>user.address.city</code>。',
    nestedStrategy2: '<strong>数组处理</strong>：可用分隔符连接元素、为每个元素创建行、或创建编号列。',
    nestedStrategy3: '<strong>选择性提取</strong>：只提取需要的字段而非扁平化所有内容。',
    h2_comparison: '方法对比：如何选择？',
    comparisonTable: '<table><thead><tr><th>方法</th><th>最适合</th><th>嵌套处理</th><th>安装要求</th></tr></thead><tbody><tr><td>在线工具</td><td>快速一次性转换</td><td>自动扁平化</td><td>无</td></tr><tr><td>Python pandas</td><td>数据科学、自动化</td><td>优秀</td><td>pip install pandas</td></tr><tr><td>JavaScript</td><td>Web 应用</td><td>良好</td><td>npm install json2csv</td></tr><tr><td>jq</td><td>Shell 脚本</td><td>手动</td><td>brew install jq</td></tr><tr><td>Excel</td><td>业务用户</td><td>可视化展开</td><td>Excel</td></tr></tbody></table>',
    h2_tips: 'JSON 转 CSV 的技巧',
    tipsDesc: '避免常见问题的最佳实践：',
    tip1: '<strong>先检查 JSON 结构</strong>：使用 JSON Viewer 工具可视化探索结构。',
    tip2: '<strong>优雅处理缺失字段</strong>：确保转换方法插入空值而非移位列。',
    tip3: '<strong>注意特殊字符</strong>：包含逗号、引号或换行的字段需正确转义。',
    tip4: '<strong>选择合适的分隔符</strong>：某些地区使用分号。数据包含很多逗号时考虑 TSV。',
    tip5: '<strong>保留数据类型</strong>：CSV 是文本格式，数字和布尔值会丢失类型信息。',
    h2_faq: '常见问题',
    faq1_q: '如何在线将 JSON 转换为 CSV？',
    faq1_a: '使用 DevToolBox CSV-JSON 转换器（viadreams.cc/zh/tools/csv-json），粘贴 JSON 数据，选择 JSON 转 CSV 方向，点击转换。工具自动扁平化嵌套对象并生成可下载的 CSV。',
    faq2_q: 'Excel 可以打开 JSON 文件吗？',
    faq2_a: '可以。在 Excel 中使用 Power Query：数据 > 获取数据 > 从文件 > 从 JSON。也可以先将 JSON 转换为 CSV 再用 Excel 打开。',
    faq3_q: '如何将嵌套 JSON 转换为 CSV？',
    faq3_a: '嵌套 JSON 需要先扁平化。使用 Python pandas 的 pd.json_normalize() 自动点标记扁平化，jq 自定义过滤器，或自动处理嵌套的在线工具。',
    faq4_q: 'JSON 转 CSV 最好的 Python 库是什么？',
    faq4_a: 'pandas 是最佳选择。使用 pd.json_normalize() 处理嵌套 JSON，pd.read_json() 处理扁平 JSON。简单场景可使用内置 json 和 csv 模块。',
    faq5_q: '可以转换大型 JSON 文件（1GB+）为 CSV 吗？',
    faq5_a: '可以，但需要流式处理。Python 中使用 ijson + csv.writer，Node.js 中使用 JSONStream，jq 使用 --stream 标志。在线工具通常有大小限制。',
    conclusion: '将 JSON 转换为 CSV 是基础数据转换技能。快速转换使用在线工具，自动化工作流使用 Python pandas，命令行使用 jq，Excel 用户使用 Power Query。',
    linkToolBottom: '使用我们的免费在线工具即时将 JSON 转换为 CSV。',
  },
  fr: {
    intro: 'Convertir <strong>JSON en CSV</strong> est l\'une des transformations de donnees les plus courantes. Ce guide couvre cinq methodes : outils en ligne, Python pandas, JavaScript/Node.js, jq et Excel Power Query.',
    linkTool: 'Convertissez JSON en CSV avec notre outil gratuit.',
    h2_why: 'Pourquoi convertir JSON en CSV ?',
    whyDesc1: 'JSON est le format standard pour les API web, tandis que CSV est le format tabulaire universel pour les tableurs et les bases de donnees.',
    whyDesc2: 'Scenarios courants : export de donnees API, preparation d\'imports SQL, generation de rapports, migration de donnees entre systemes.',
    whyDesc3: 'Le principal defi est l\'aplatissement des structures imbriquees.',
    h2_online: 'Methode 1 : Convertir en ligne',
    onlineDesc1: 'Les outils en ligne sont la solution la plus rapide :',
    onlineLink: 'Essayez notre convertisseur JSON-CSV gratuit.',
    onlineSteps: '<ol><li>Selectionnez JSON vers CSV.</li><li>Collez vos donnees JSON.</li><li>Cliquez sur Convertir.</li><li>Telelechargez le CSV.</li></ol>',
    onlineDesc2: 'Ideal pour les conversions ponctuelles. Les donnees restent dans votre navigateur.',
    h2_python: 'Methode 2 : Python pandas',
    pythonDesc1: 'Python avec pandas est la methode la plus populaire :',
    pythonDesc2: '<code>pd.json_normalize()</code> aplatit automatiquement les objets imbriques.',
    pythonCsvModule: 'Sans pandas, utilisez les modules csv et json de Python :',
    pythonCsvDesc: 'L\'approche standard est legere et fonctionne pour les JSON plats.',
    h2_javascript: 'Methode 3 : JavaScript / Node.js',
    jsDesc1: 'JavaScript est un choix naturel pour le JSON :',
    jsDesc2: 'Pour la production, utilisez le package npm json2csv.',
    jsNodeDesc: 'L\'approche Node.js lit le JSON, extrait les en-tetes et ecrit le CSV.',
    h2_jq: 'Methode 4 : jq (ligne de commande)',
    jqDesc1: 'jq est un processeur JSON en ligne de commande :',
    jqDesc2: 'Le filtre @csv gere l\'echappement CSV correct.',
    jqAdvanced: 'Pour des transformations complexes, jq supporte variables et conditions.',
    h2_excel: 'Methode 5 : Excel Power Query',
    excelDesc1: 'Power Query offre une approche visuelle sans code :',
    excelSteps: '<ol><li>Donnees > Obtenir des donnees > A partir de JSON.</li><li>Expandre les colonnes imbriquees.</li><li>Enregistrer en CSV.</li></ol>',
    excelDesc2: 'Power Query memorise les etapes de transformation.',
    h2_nested: 'Gestion du JSON imbrique',
    nestedDesc1: 'Le plus grand defi est l\'aplatissement des structures imbriquees :',
    nestedStrategy1: '<strong>Notation par points</strong> : Les cles imbriquees sont jointes avec des points.',
    nestedStrategy2: '<strong>Gestion des tableaux</strong> : Joindre les elements, creer des lignes separees ou des colonnes numerotees.',
    nestedStrategy3: '<strong>Extraction selective</strong> : Extraire uniquement les champs necessaires.',
    h2_comparison: 'Comparaison des methodes',
    comparisonTable: '<table><thead><tr><th>Methode</th><th>Ideal pour</th><th>Imbrication</th><th>Installation</th></tr></thead><tbody><tr><td>En ligne</td><td>Conversions rapides</td><td>Auto</td><td>Aucune</td></tr><tr><td>Python</td><td>Data science</td><td>Excellent</td><td>pip install pandas</td></tr><tr><td>JavaScript</td><td>Apps web</td><td>Bon</td><td>npm install json2csv</td></tr><tr><td>jq</td><td>Scripts shell</td><td>Manuel</td><td>brew install jq</td></tr><tr><td>Excel</td><td>Utilisateurs business</td><td>Visuel</td><td>Excel</td></tr></tbody></table>',
    h2_tips: 'Conseils pour une conversion propre',
    tipsDesc: 'Bonnes pratiques :',
    tip1: '<strong>Inspectez la structure JSON d\'abord</strong>.',
    tip2: '<strong>Gerez les champs manquants</strong>.',
    tip3: '<strong>Attention aux caracteres speciaux</strong>.',
    tip4: '<strong>Choisissez le bon delimiteur</strong>.',
    tip5: '<strong>Preservez les types de donnees</strong>.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir JSON en CSV en ligne ?',
    faq1_a: 'Utilisez le convertisseur CSV-JSON de DevToolBox. Collez vos donnees JSON, cliquez sur Convertir et telechargez le CSV.',
    faq2_q: 'Excel peut-il ouvrir des fichiers JSON ?',
    faq2_a: 'Oui, avec Power Query : Donnees > Obtenir des donnees > A partir de JSON.',
    faq3_q: 'Comment convertir du JSON imbrique en CSV ?',
    faq3_a: 'Utilisez pandas json_normalize(), jq avec des filtres, ou un outil en ligne avec aplatissement automatique.',
    faq4_q: 'Quelle est la meilleure bibliotheque Python ?',
    faq4_a: 'pandas avec json_normalize() et read_json().',
    faq5_q: 'Peut-on convertir de gros fichiers JSON (1 Go+) ?',
    faq5_a: 'Oui, avec des approches streaming : ijson en Python, JSONStream en Node.js, jq --stream.',
    conclusion: 'Convertir JSON en CSV est une competence fondamentale. Utilisez l\'outil en ligne pour des conversions rapides, Python pour l\'automatisation, jq pour le terminal.',
    linkToolBottom: 'Convertissez JSON en CSV avec notre outil gratuit.',
  },
};

export default function JsonToCsvConversionGuide({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/csv-json`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Why Convert JSON to CSV? */}
      <h2>{s.h2_why}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whyDesc3 }} />

      {/* Method 1: Online */}
      <h2>{s.h2_online}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.onlineDesc1 }} />
      <p><Link href={`/${lang}/tools/csv-json`} style={{ fontWeight: 600 }}>{s.onlineLink}</Link></p>
      <div dangerouslySetInnerHTML={{ __html: s.onlineSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.onlineDesc2 }} />

      {/* Method 2: Python */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc1 }} />

      <pre><code>{`import pandas as pd
import json

# === Method 1: Flat JSON array ===
# Read JSON file directly into a DataFrame
df = pd.read_json('data.json')
df.to_csv('output.csv', index=False)

# === Method 2: Nested JSON with json_normalize ===
with open('data.json', 'r') as f:
    data = json.load(f)

# Flatten nested objects (e.g., user.address.city)
df = pd.json_normalize(data)
df.to_csv('output_flat.csv', index=False)

# === Method 3: Nested JSON with specific record_path ===
# For JSON like: {"results": [{"name": "A", "scores": [1,2]}]}
df = pd.json_normalize(
    data,
    record_path='items',           # path to the array
    meta=['id', 'name'],           # fields from parent
    meta_prefix='parent_',
    sep='.'                        # separator for nested keys
)
df.to_csv('output_nested.csv', index=False)

# === Method 4: Handle missing fields ===
df = pd.json_normalize(data)
df.fillna('', inplace=True)        # replace NaN with empty string
df.to_csv('output_clean.csv', index=False, encoding='utf-8-sig')`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.pythonCsvModule }} />

      <pre><code>{`import json
import csv

# Read JSON
with open('data.json', 'r') as f:
    data = json.load(f)

# Write CSV using built-in modules
if isinstance(data, list) and len(data) > 0:
    keys = data[0].keys()  # column headers from first object

    with open('output.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)

    print(f"Converted {len(data)} rows to CSV")`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.pythonCsvDesc }} />

      {/* Method 3: JavaScript */}
      <h2>{s.h2_javascript}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jsDesc1 }} />

      <pre><code>{`// === Browser: Convert JSON array to CSV string ===
function jsonToCsv(jsonData) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) return '';

  const headers = Object.keys(jsonData[0]);
  const csvRows = [
    headers.join(','),  // header row
    ...jsonData.map(row =>
      headers.map(header => {
        const value = row[header] ?? '';
        // Escape quotes and wrap in quotes if needed
        const str = String(value);
        return str.includes(',') || str.includes('"') || str.includes('\\n')
          ? \`"\${str.replace(/"/g, '""')}"\`
          : str;
      }).join(',')
    )
  ];
  return csvRows.join('\\n');
}

// Usage
const data = [
  { name: "Alice", age: 30, city: "NYC" },
  { name: "Bob", age: 25, city: "London" }
];
const csv = jsonToCsv(data);
console.log(csv);

// === Node.js: Read JSON file, write CSV file ===
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const csv = jsonToCsv(data);
fs.writeFileSync('output.csv', csv, 'utf-8');

// === Using json2csv package (recommended for production) ===
// npm install json2csv
const { parse } = require('json2csv');
const opts = {
  fields: ['name', 'age', 'address.city'],  // dot notation for nested
  flatten: true,
  defaultValue: ''
};
const csvOutput = parse(data, opts);
fs.writeFileSync('output.csv', csvOutput);`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.jsDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jsNodeDesc }} />

      {/* Method 4: jq */}
      <h2>{s.h2_jq}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.jqDesc1 }} />

      <pre><code>{`# === Basic: Flat JSON array to CSV ===
# Input: [{"name":"Alice","age":30},{"name":"Bob","age":25}]
jq -r '(.[0] | keys_unsorted) as $keys |
  ($keys | @csv),
  (.[] | [.[$keys[]]] | @csv)' data.json > output.csv

# === Select specific fields ===
jq -r '["name","age","city"],
  (.[] | [.name, .age, .city]) | @csv' data.json

# === Handle nested objects with dot notation ===
jq -r '["name","street","city"],
  (.[] | [.name, .address.street, .address.city]) | @csv' data.json

# === Handle arrays by joining elements ===
jq -r '["name","tags"],
  (.[] | [.name, (.tags | join(";"))]) | @csv' data.json

# === Pipe from curl (API response to CSV) ===
curl -s "https://api.example.com/users" | \\
  jq -r '(.[0] | keys_unsorted) as $k |
  ($k | @csv), (.[] | [.[$k[]]] | @csv)' > users.csv`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.jqDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.jqAdvanced }} />

      {/* Method 5: Excel */}
      <h2>{s.h2_excel}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.excelDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.excelSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.excelDesc2 }} />

      {/* Handling Nested JSON */}
      <h2>{s.h2_nested}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nestedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedStrategy1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedStrategy2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.nestedStrategy3 }} />

      {/* Comparison Table */}
      <h2>{s.h2_comparison}</h2>
      <div dangerouslySetInnerHTML={{ __html: s.comparisonTable }} />

      {/* Tips */}
      <h2>{s.h2_tips}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.tipsDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.tip1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tip2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tip3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tip4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.tip5 }} />

      {/* FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq1_a }} />
      <h3>{s.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq2_a }} />
      <h3>{s.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq3_a }} />
      <h3>{s.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq4_a }} />
      <h3>{s.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.faq5_a }} />

      <p style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/csv-json`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/csv-json`}>CSV-JSON Converter</Link> - Convert between CSV and JSON formats instantly</li>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and beautify JSON data with syntax highlighting</li>
        <li><Link href={`/${lang}/tools/json-viewer`}>JSON Viewer</Link> - Interactive tree-view JSON explorer</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-excel`}>JSON to Excel</Link> - Convert JSON data to Excel spreadsheets</li>
        <li><Link href={`/${lang}/tools/xml-json`}>XML to JSON</Link> - Convert XML to JSON format</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML</Link> - Convert between JSON and YAML</li>
        <li><Link href={`/${lang}/tools/json-validator`}>JSON Validator</Link> - Validate JSON syntax and find errors</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go</Link> - Create Go structs from JSON data</li>
      </ul>
    </>
  );
}
