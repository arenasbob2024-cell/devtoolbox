import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: 'If you have ever downloaded an API response, received a configuration file, or exported data from a web application, you have probably encountered a <strong>.json file</strong>. JSON (JavaScript Object Notation) is the most widely used data format on the web, but <strong>how to open a JSON file</strong> depends on what you want to do with it: simply view it, edit it, validate it, or parse it programmatically. This comprehensive guide covers every method available for opening and viewing JSON files, from code editors and command-line tools to online formatters and programming languages. Whether you are a beginner wondering <strong>what program opens JSON files</strong> or an experienced developer looking for the fastest workflow, you will find the right approach here.',
    linkTool: 'Open and format JSON files instantly with our free JSON Formatter.',
    h2_what: 'What Is a JSON File?',
    whatDesc1: 'A JSON file is a plain-text file that stores data in <strong>JavaScript Object Notation</strong> format. It uses key-value pairs and ordered lists to represent structured data. JSON files typically have the <code>.json</code> extension and are encoded in UTF-8. They are used everywhere in modern software: REST API responses, application configuration (like <code>package.json</code> or <code>tsconfig.json</code>), database exports, and data interchange between services.',
    whatDesc2: 'Because JSON is plain text, you can open it with any text editor. However, raw JSON is often minified (stripped of whitespace) or deeply nested, making it difficult to read without proper formatting. That is why developers use specialized tools to <strong>view JSON files</strong> with syntax highlighting, indentation, collapsible nodes, and validation.',
    h2_vscode: 'Method 1: Open JSON Files in VS Code',
    vscodeDesc1: 'Visual Studio Code is the most popular editor for working with JSON files. It provides built-in JSON support with syntax highlighting, auto-formatting, schema validation, and IntelliSense. To open a JSON file in VS Code:',
    vscodeSteps: '<ol><li>Launch VS Code and press <code>Ctrl+O</code> (Windows/Linux) or <code>Cmd+O</code> (macOS) to open the file dialog.</li><li>Navigate to your <code>.json</code> file and select it. VS Code automatically detects the JSON language mode.</li><li>To format the JSON, right-click in the editor and choose <strong>Format Document</strong>, or press <code>Shift+Alt+F</code> (Windows) / <code>Shift+Option+F</code> (macOS). This prettifies minified JSON instantly.</li><li>For large JSON files, use the <strong>Outline</strong> panel (View &gt; Outline) to navigate the structure, or install the <strong>JSON Viewer</strong> extension for a tree-view sidebar.</li></ol>',
    vscodeDesc2: 'VS Code also validates JSON automatically. If your file has syntax errors like trailing commas, missing quotes, or mismatched brackets, squiggly red underlines appear immediately. Hover over the error for a detailed description. For JSON files that follow a schema (like <code>package.json</code>), VS Code provides IntelliSense suggestions and type checking.',
    h2_browser: 'Method 2: Open JSON Files in a Web Browser',
    browserDesc1: 'Every modern web browser can display JSON files. Simply drag and drop a <code>.json</code> file onto an open browser window, or use <code>File &gt; Open File</code>. Firefox has the best built-in JSON viewer: it automatically formats the data with collapsible sections, a search bar, and the ability to switch between raw and formatted views.',
    browserDesc2: 'Chrome displays raw JSON by default, but you can install browser extensions like <strong>JSON Viewer</strong> or <strong>JSONVue</strong> from the Chrome Web Store to get formatted output with syntax highlighting and tree navigation. For a quick one-off viewing without installing anything, paste your JSON into our online tool:',
    browserLink: 'View and format JSON in your browser with our JSON Viewer tool.',
    h2_terminal: 'Method 3: Open JSON Files in the Terminal (cat, jq, python)',
    terminalDesc1: 'Command-line tools are the fastest way to inspect JSON files on any operating system. Here are the most common approaches:',
    terminalCat: '<strong>cat / less</strong>: The simplest method. Run <code>cat file.json</code> to dump the contents to your terminal, or <code>less file.json</code> for paginated output. This shows the raw text without formatting, which works for small files.',
    terminalJq: '<strong>jq</strong>: The Swiss Army knife for JSON on the command line. Run <code>jq . file.json</code> to pretty-print the entire file with color-coded syntax highlighting. You can also filter and transform data: <code>jq \'.users[0].name\' file.json</code> extracts a specific value. Install jq via <code>brew install jq</code> (macOS), <code>apt install jq</code> (Ubuntu), or <code>choco install jq</code> (Windows).',
    terminalPython: '<strong>python -m json.tool</strong>: Python ships with a built-in JSON formatter. Run <code>python3 -m json.tool file.json</code> to pretty-print any JSON file. This also validates the JSON and reports syntax errors with line numbers. No additional installation required if Python is already on your system.',
    terminalPowershell: '<strong>PowerShell (Windows)</strong>: Use <code>Get-Content file.json | ConvertFrom-Json | ConvertTo-Json -Depth 10</code> to read and re-format JSON. The <code>-Depth</code> parameter controls how many levels of nesting to preserve.',
    h2_notepad: 'Method 4: Open JSON Files in Notepad++ or Sublime Text',
    notepadDesc1: '<strong>Notepad++</strong> (Windows) recognizes JSON files and provides syntax highlighting out of the box. For pretty-printing, install the <strong>JSTool</strong> plugin via the Plugin Manager, then use <code>Plugins &gt; JSTool &gt; JSFormat</code> to indent and format the JSON. Notepad++ handles large files efficiently and supports find-and-replace with regex.',
    notepadDesc2: '<strong>Sublime Text</strong> (cross-platform) also has excellent JSON support. Open any <code>.json</code> file and use <code>Ctrl+Shift+P</code> &gt; <strong>Pretty Print (JSON)</strong> to format the document. Sublime Text is especially fast with large JSON files (hundreds of megabytes) compared to other editors.',
    h2_online: 'Method 5: Open JSON Files with Online Tools',
    onlineDesc1: 'Online JSON tools are the quickest option when you need to view, format, or validate JSON without installing any software. Our <strong>JSON Formatter</strong> tool lets you paste or upload a JSON file, then instantly see a formatted, syntax-highlighted, and validated result:',
    onlineLink: 'Try our free online JSON Formatter and Validator.',
    onlineDesc2: 'Online tools are especially useful for: sharing formatted JSON with colleagues via a link, validating JSON before sending it to an API, converting between minified and prettified formats, and checking for syntax errors in configuration files. Our toolset also includes a dedicated <strong>JSON Viewer</strong> with a tree-view interface for exploring deeply nested structures:',
    onlineViewerLink: 'Explore JSON structures with our interactive JSON Viewer.',
    h2_python: 'Method 6: Open JSON Files with Python',
    pythonDesc1: 'Python\'s built-in <code>json</code> module makes it trivial to read, parse, and display JSON files programmatically. This is the go-to approach when you need to process JSON data in scripts or applications:',
    pythonDesc2: 'The <code>json.load()</code> function reads a JSON file and returns a Python dictionary (or list). You can then access any value using standard Python dictionary syntax. The <code>json.dumps()</code> function with <code>indent=2</code> converts the data back to a pretty-printed JSON string for display or logging.',
    h2_node: 'Method 7: Open JSON Files with Node.js',
    nodeDesc1: 'Node.js provides multiple ways to read and parse JSON files. The simplest is using <code>require()</code> or the built-in <code>fs</code> module:',
    nodeDesc2: 'For modern ESM projects, use <code>import</code> with the <code>assert</code> syntax or read the file with <code>fs/promises</code>. Node.js automatically parses JSON when you use <code>JSON.parse()</code>, and you can format the output with <code>JSON.stringify(data, null, 2)</code> for pretty-printing.',
    h2_validate: 'How to Validate a JSON File',
    validateDesc1: 'Invalid JSON is a common source of bugs. A single trailing comma, unquoted key, or mismatched bracket can break an entire configuration. Here are reliable ways to validate JSON:',
    validateMethods: '<ol><li><strong>Online validator</strong>: Paste your JSON into our <strong>JSON Validator</strong> for instant error detection with line numbers and descriptive messages.</li><li><strong>VS Code</strong>: Red underlines appear automatically for JSON syntax errors.</li><li><strong>jq</strong>: Run <code>jq . file.json</code>. If the JSON is invalid, jq prints an error with the exact location.</li><li><strong>python</strong>: Run <code>python3 -m json.tool file.json</code>. Invalid JSON produces a <code>json.decoder.JSONDecodeError</code> with the line and column number.</li><li><strong>Node.js</strong>: <code>JSON.parse()</code> throws a <code>SyntaxError</code> with a position indicator if the JSON is malformed.</li></ol>',
    validateLink: 'Validate your JSON files instantly with our JSON Validator tool.',
    h2_largeFiles: 'Opening Large JSON Files (100MB+)',
    largeDesc1: 'Standard text editors struggle with very large JSON files. For files over 100MB, use these specialized approaches:',
    largeMethods: '<ol><li><strong>jq (streaming mode)</strong>: Use <code>jq --stream</code> to process large JSON files without loading the entire file into memory. This is ideal for extracting specific fields from multi-gigabyte files.</li><li><strong>fx</strong>: An interactive JSON viewer for the terminal. Install with <code>npm install -g fx</code> and run <code>fx file.json</code> to browse the structure interactively with search, filtering, and collapsing.</li><li><strong>Python ijson</strong>: The <code>ijson</code> library provides an iterative/streaming JSON parser for Python. Install with <code>pip install ijson</code> and use it to process JSON elements one at a time without loading the entire file.</li><li><strong>Sublime Text</strong>: Can handle files up to several hundred MB with reasonable performance, unlike VS Code which may become unresponsive.</li></ol>',
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What program opens JSON files?',
    faq1_a: 'Any text editor can open JSON files because JSON is plain text. The best options are VS Code (with built-in formatting and validation), Notepad++ (Windows), Sublime Text, or online tools like the DevToolBox JSON Formatter. For quick command-line viewing, use jq or python -m json.tool. Web browsers can also display JSON files directly, with Firefox providing the best built-in formatting.',
    faq2_q: 'How to view a JSON file?',
    faq2_a: 'To view a JSON file with proper formatting, open it in VS Code and press Shift+Alt+F to format, use jq on the command line with jq . file.json for color-coded output, drag it into Firefox for automatic tree-view formatting, or paste the contents into an online JSON formatter like the one at viadreams.cc/en/tools/json-formatter. For programmatic viewing, use Python json.load() or Node.js JSON.parse() to parse and display the data.',
    faq3_q: 'Can I open a JSON file in Excel?',
    faq3_a: 'Yes, Excel can import JSON files using Power Query. In Excel, go to Data > Get Data > From File > From JSON, then select your file. Excel will open the Power Query Editor where you can expand nested objects and arrays into columns and rows. This is useful for analyzing JSON data in a spreadsheet format. For simple flat JSON arrays, you can also convert JSON to CSV first using a tool like our CSV-JSON converter, then open the CSV in Excel.',
    faq4_q: 'How do I open a JSON file on my phone?',
    faq4_a: 'On Android, use a text editor app like QuickEdit or Acode. On iOS, use Textastic or Jayson (a dedicated JSON viewer). You can also open JSON files in your mobile browser by navigating to an online JSON formatter tool and pasting or uploading the file content. Cloud-based editors like VS Code for Web (vscode.dev) work in mobile browsers as well.',
    faq5_q: 'Why does my JSON file show as one long line?',
    faq5_a: 'Your JSON file is minified, meaning all whitespace has been removed to reduce file size. This is common for JSON served by APIs or included in production builds. To make it readable, format it using any of the methods described above: VS Code Format Document (Shift+Alt+F), jq . file.json on the command line, or paste it into an online JSON formatter. The data is identical; only the visual presentation changes.',
    conclusion: 'Opening and viewing JSON files is straightforward once you know the right tool for your situation. Use VS Code or Sublime Text for daily editing, jq for command-line workflows, your web browser for quick viewing, and online tools when you need a no-install solution. For programmatic access, Python and Node.js both provide excellent built-in JSON support. Whatever your use case, the key is choosing a tool that provides proper formatting, syntax highlighting, and validation so you can work with JSON data efficiently.',
    linkToolBottom: 'Format and validate your JSON files with our free online JSON Formatter.',
  },
  zh: {
    intro: '如果你下载过 API 响应、收到过配置文件或从 Web 应用导出过数据，你很可能遇到过 <strong>.json 文件</strong>。JSON（JavaScript Object Notation）是 Web 上最广泛使用的数据格式，但<strong>如何打开 JSON 文件</strong>取决于你想做什么：简单查看、编辑、验证还是编程解析。本指南涵盖了所有打开和查看 JSON 文件的方法。',
    linkTool: '使用我们的免费 JSON 格式化工具即时打开和格式化 JSON 文件。',
    h2_what: '什么是 JSON 文件？',
    whatDesc1: 'JSON 文件是以 JavaScript Object Notation 格式存储数据的纯文本文件。它使用键值对和有序列表来表示结构化数据。JSON 文件通常具有 <code>.json</code> 扩展名，使用 UTF-8 编码。',
    whatDesc2: '因为 JSON 是纯文本，所以可以用任何文本编辑器打开。但原始 JSON 通常是压缩的或深度嵌套的，没有适当格式化很难阅读。因此开发者使用专门的工具来查看 JSON 文件。',
    h2_vscode: '方法一：在 VS Code 中打开 JSON 文件',
    vscodeDesc1: 'VS Code 是处理 JSON 文件最流行的编辑器，提供内置的语法高亮、自动格式化、模式验证和智能提示。',
    vscodeSteps: '<ol><li>启动 VS Code，按 <code>Ctrl+O</code>（Windows/Linux）或 <code>Cmd+O</code>（macOS）打开文件。</li><li>选择 <code>.json</code> 文件，VS Code 自动检测语言模式。</li><li>右键选择"格式化文档"或按 <code>Shift+Alt+F</code> 格式化 JSON。</li><li>使用大纲面板导航结构，或安装 JSON Viewer 扩展。</li></ol>',
    vscodeDesc2: 'VS Code 会自动验证 JSON。语法错误（如尾随逗号、缺少引号）会显示红色波浪线。',
    h2_browser: '方法二：在浏览器中打开 JSON 文件',
    browserDesc1: '所有现代浏览器都能显示 JSON 文件。将 <code>.json</code> 文件拖放到浏览器窗口即可。Firefox 有最好的内置 JSON 查看器。',
    browserDesc2: 'Chrome 默认显示原始 JSON，可安装 JSON Viewer 扩展获得格式化输出。也可以使用我们的在线工具：',
    browserLink: '使用我们的 JSON 查看器在浏览器中查看和格式化 JSON。',
    h2_terminal: '方法三：在终端中打开 JSON 文件（cat、jq、python）',
    terminalDesc1: '命令行工具是检查 JSON 文件最快的方式：',
    terminalCat: '<strong>cat / less</strong>：最简单的方法。运行 <code>cat file.json</code> 输出内容。',
    terminalJq: '<strong>jq</strong>：JSON 命令行瑞士军刀。运行 <code>jq . file.json</code> 美化打印并带语法高亮。',
    terminalPython: '<strong>python -m json.tool</strong>：Python 内置 JSON 格式化器。运行 <code>python3 -m json.tool file.json</code> 美化打印。',
    terminalPowershell: '<strong>PowerShell</strong>：使用 <code>Get-Content file.json | ConvertFrom-Json | ConvertTo-Json -Depth 10</code>。',
    h2_notepad: '方法四：在 Notepad++ 或 Sublime Text 中打开',
    notepadDesc1: '<strong>Notepad++</strong>（Windows）自动识别 JSON 文件并提供语法高亮。安装 JSTool 插件后可格式化 JSON。',
    notepadDesc2: '<strong>Sublime Text</strong>（跨平台）也有出色的 JSON 支持，处理大文件特别快速。',
    h2_online: '方法五：使用在线工具打开 JSON 文件',
    onlineDesc1: '在线 JSON 工具是不安装软件就能查看、格式化或验证 JSON 的最快选择。我们的 JSON 格式化工具可即时显示格式化结果：',
    onlineLink: '试用我们的免费在线 JSON 格式化和验证工具。',
    onlineDesc2: '在线工具特别适合：分享格式化的 JSON、API 验证、格式转换和配置文件语法检查。',
    onlineViewerLink: '使用我们的交互式 JSON 查看器探索 JSON 结构。',
    h2_python: '方法六：用 Python 打开 JSON 文件',
    pythonDesc1: 'Python 内置的 <code>json</code> 模块可以轻松读取、解析和显示 JSON 文件：',
    pythonDesc2: '<code>json.load()</code> 读取 JSON 文件并返回 Python 字典。<code>json.dumps()</code> 配合 <code>indent=2</code> 可美化输出。',
    h2_node: '方法七：用 Node.js 打开 JSON 文件',
    nodeDesc1: 'Node.js 提供多种读取和解析 JSON 文件的方式，最简单的是使用 <code>require()</code> 或 <code>fs</code> 模块：',
    nodeDesc2: '使用 <code>JSON.parse()</code> 解析，<code>JSON.stringify(data, null, 2)</code> 美化输出。',
    h2_validate: '如何验证 JSON 文件',
    validateDesc1: '无效的 JSON 是常见的 bug 来源。以下是可靠的验证方法：',
    validateMethods: '<ol><li><strong>在线验证器</strong>：使用我们的 JSON 验证工具即时检测错误。</li><li><strong>VS Code</strong>：自动显示 JSON 语法错误。</li><li><strong>jq</strong>：运行 <code>jq . file.json</code>，无效 JSON 会报告错误位置。</li><li><strong>python</strong>：运行 <code>python3 -m json.tool file.json</code>。</li><li><strong>Node.js</strong>：<code>JSON.parse()</code> 对格式错误的 JSON 抛出 SyntaxError。</li></ol>',
    validateLink: '使用我们的 JSON 验证工具即时验证 JSON 文件。',
    h2_largeFiles: '打开大型 JSON 文件（100MB+）',
    largeDesc1: '标准文本编辑器处理大型 JSON 文件会很困难。对于超过 100MB 的文件：',
    largeMethods: '<ol><li><strong>jq 流模式</strong>：使用 <code>jq --stream</code> 处理大文件。</li><li><strong>fx</strong>：终端交互式 JSON 查看器。</li><li><strong>Python ijson</strong>：流式 JSON 解析器。</li><li><strong>Sublime Text</strong>：可处理数百 MB 的文件。</li></ol>',
    h2_faq: '常见问题',
    faq1_q: '什么程序可以打开 JSON 文件？',
    faq1_a: '任何文本编辑器都可以打开 JSON 文件。最佳选择是 VS Code、Notepad++、Sublime Text 或在线工具如 DevToolBox JSON 格式化器。命令行可使用 jq 或 python -m json.tool。',
    faq2_q: '如何查看 JSON 文件？',
    faq2_a: '在 VS Code 中打开并按 Shift+Alt+F 格式化，使用 jq 命令行工具，拖入 Firefox 浏览器，或粘贴到在线 JSON 格式化工具中查看。',
    faq3_q: '可以在 Excel 中打开 JSON 文件吗？',
    faq3_a: '可以。在 Excel 中使用 Power Query：数据 > 获取数据 > 从文件 > 从 JSON。也可以先将 JSON 转换为 CSV 再用 Excel 打开。',
    faq4_q: '如何在手机上打开 JSON 文件？',
    faq4_a: 'Android 上使用 QuickEdit 或 Acode，iOS 上使用 Textastic 或 Jayson。也可在移动浏览器中使用在线 JSON 格式化工具。',
    faq5_q: '为什么我的 JSON 文件显示为一长行？',
    faq5_a: '你的 JSON 文件是压缩的（minified），所有空白已被移除。使用 VS Code 格式化、jq 或在线工具即可使其可读。',
    conclusion: '掌握正确的工具后，打开和查看 JSON 文件非常简单。日常编辑使用 VS Code，命令行使用 jq，快速查看使用浏览器，免安装方案使用在线工具。',
    linkToolBottom: '使用我们的免费在线 JSON 格式化工具格式化和验证 JSON 文件。',
  },
  fr: {
    intro: 'Si vous avez deja telecharge une reponse d\'API ou recu un fichier de configuration, vous avez probablement rencontre un <strong>fichier .json</strong>. Ce guide complet couvre toutes les methodes pour ouvrir et visualiser des fichiers JSON.',
    linkTool: 'Ouvrez et formatez vos fichiers JSON avec notre outil gratuit.',
    h2_what: 'Qu\'est-ce qu\'un fichier JSON ?',
    whatDesc1: 'Un fichier JSON est un fichier texte brut qui stocke des donnees au format JavaScript Object Notation avec des paires cle-valeur.',
    whatDesc2: 'Comme JSON est du texte brut, vous pouvez l\'ouvrir avec n\'importe quel editeur de texte, mais un outil specialise offre la coloration syntaxique et la validation.',
    h2_vscode: 'Methode 1 : Ouvrir un fichier JSON dans VS Code',
    vscodeDesc1: 'VS Code est l\'editeur le plus populaire pour travailler avec les fichiers JSON, avec support integre.',
    vscodeSteps: '<ol><li>Ouvrez le fichier avec <code>Ctrl+O</code>.</li><li>Formatez avec <code>Shift+Alt+F</code>.</li><li>Utilisez le panneau Outline pour naviguer.</li></ol>',
    vscodeDesc2: 'VS Code valide automatiquement le JSON et signale les erreurs de syntaxe.',
    h2_browser: 'Methode 2 : Ouvrir dans un navigateur',
    browserDesc1: 'Glissez-deposez un fichier .json dans votre navigateur. Firefox offre le meilleur visualiseur JSON integre.',
    browserDesc2: 'Chrome necessite une extension comme JSON Viewer pour un affichage formate.',
    browserLink: 'Visualisez et formatez JSON dans votre navigateur avec notre outil.',
    h2_terminal: 'Methode 3 : Ouvrir dans le terminal',
    terminalDesc1: 'Les outils en ligne de commande sont les plus rapides pour inspecter les fichiers JSON :',
    terminalCat: '<strong>cat / less</strong> : Methode la plus simple.',
    terminalJq: '<strong>jq</strong> : Couteau suisse pour JSON en ligne de commande.',
    terminalPython: '<strong>python -m json.tool</strong> : Formateur JSON integre a Python.',
    terminalPowershell: '<strong>PowerShell</strong> : Utilisez ConvertFrom-Json.',
    h2_notepad: 'Methode 4 : Notepad++ ou Sublime Text',
    notepadDesc1: 'Notepad++ reconnait les fichiers JSON avec coloration syntaxique.',
    notepadDesc2: 'Sublime Text est rapide meme avec de gros fichiers JSON.',
    h2_online: 'Methode 5 : Outils en ligne',
    onlineDesc1: 'Les outils JSON en ligne sont la solution la plus rapide sans installation.',
    onlineLink: 'Essayez notre formateur JSON gratuit en ligne.',
    onlineDesc2: 'Ideaux pour partager, valider et convertir du JSON.',
    onlineViewerLink: 'Explorez les structures JSON avec notre visualiseur interactif.',
    h2_python: 'Methode 6 : Ouvrir avec Python',
    pythonDesc1: 'Le module <code>json</code> integre de Python permet de lire facilement les fichiers JSON.',
    pythonDesc2: '<code>json.load()</code> lit un fichier et retourne un dictionnaire Python.',
    h2_node: 'Methode 7 : Ouvrir avec Node.js',
    nodeDesc1: 'Node.js offre plusieurs facons de lire les fichiers JSON.',
    nodeDesc2: 'Utilisez <code>JSON.parse()</code> pour analyser et <code>JSON.stringify()</code> pour formater.',
    h2_validate: 'Comment valider un fichier JSON',
    validateDesc1: 'Le JSON invalide est une source courante de bugs :',
    validateMethods: '<ol><li>Validateur en ligne</li><li>VS Code</li><li>jq</li><li>python</li><li>Node.js</li></ol>',
    validateLink: 'Validez vos fichiers JSON avec notre outil.',
    h2_largeFiles: 'Ouvrir de gros fichiers JSON (100 Mo+)',
    largeDesc1: 'Pour les fichiers de plus de 100 Mo, utilisez des outils specialises comme jq en mode streaming.',
    largeMethods: '<ol><li>jq --stream</li><li>fx</li><li>Python ijson</li><li>Sublime Text</li></ol>',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Quel programme ouvre les fichiers JSON ?',
    faq1_a: 'N\'importe quel editeur de texte peut ouvrir des fichiers JSON. Les meilleurs choix sont VS Code, Notepad++, Sublime Text ou des outils en ligne.',
    faq2_q: 'Comment visualiser un fichier JSON ?',
    faq2_a: 'Ouvrez-le dans VS Code et formatez-le, utilisez jq en ligne de commande, ou collez-le dans un formateur JSON en ligne.',
    faq3_q: 'Peut-on ouvrir un fichier JSON dans Excel ?',
    faq3_a: 'Oui, utilisez Power Query dans Excel : Donnees > Obtenir des donnees > A partir d\'un fichier > A partir de JSON.',
    faq4_q: 'Comment ouvrir un fichier JSON sur telephone ?',
    faq4_a: 'Utilisez une application d\'editeur de texte ou un formateur JSON en ligne dans votre navigateur mobile.',
    faq5_q: 'Pourquoi mon fichier JSON s\'affiche en une seule ligne ?',
    faq5_a: 'Votre fichier JSON est minifie. Utilisez un outil de formatage pour le rendre lisible.',
    conclusion: 'Ouvrir des fichiers JSON est simple avec le bon outil. Utilisez VS Code, jq, votre navigateur ou des outils en ligne.',
    linkToolBottom: 'Formatez et validez vos fichiers JSON avec notre outil gratuit.',
  },
};

export default function HowToOpenJsonFile({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* What is a JSON file? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />

      {/* Method 1: VS Code */}
      <h2>{s.h2_vscode}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.vscodeDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.vscodeSteps }} />
      <p dangerouslySetInnerHTML={{ __html: s.vscodeDesc2 }} />

      {/* Method 2: Browser */}
      <h2>{s.h2_browser}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.browserDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.browserDesc2 }} />
      <p><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600 }}>{s.browserLink}</Link></p>

      {/* Method 3: Terminal */}
      <h2>{s.h2_terminal}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.terminalDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.terminalCat }} />

      <pre><code>{`# Pretty-print JSON with cat (raw) or less (paginated)
cat data.json
less data.json

# Pretty-print with jq (recommended)
jq . data.json

# Extract a specific field
jq '.users[0].name' data.json

# Pretty-print with Python
python3 -m json.tool data.json`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.terminalJq }} />
      <p dangerouslySetInnerHTML={{ __html: s.terminalPython }} />
      <p dangerouslySetInnerHTML={{ __html: s.terminalPowershell }} />

      {/* Method 4: Notepad++ */}
      <h2>{s.h2_notepad}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.notepadDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.notepadDesc2 }} />

      {/* Method 5: Online tools */}
      <h2>{s.h2_online}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.onlineDesc1 }} />
      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.onlineLink}</Link></p>
      <p dangerouslySetInnerHTML={{ __html: s.onlineDesc2 }} />
      <p><Link href={`/${lang}/tools/json-viewer`} style={{ fontWeight: 600 }}>{s.onlineViewerLink}</Link></p>

      {/* Method 6: Python */}
      <h2>{s.h2_python}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc1 }} />

      <pre><code>{`import json

# Read and parse a JSON file
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Access values
print(data['name'])
print(data['users'][0]['email'])

# Pretty-print the entire structure
print(json.dumps(data, indent=2, ensure_ascii=False))

# Validate JSON from a string
try:
    parsed = json.loads(json_string)
    print("Valid JSON")
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.pythonDesc2 }} />

      {/* Method 7: Node.js */}
      <h2>{s.h2_node}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.nodeDesc1 }} />

      <pre><code>{`// Method 1: require (CommonJS)
const data = require('./data.json');
console.log(data.name);

// Method 2: fs.readFileSync
const fs = require('fs');
const raw = fs.readFileSync('data.json', 'utf-8');
const parsed = JSON.parse(raw);

// Pretty-print
console.log(JSON.stringify(parsed, null, 2));

// Method 3: fs/promises (async, ESM)
import { readFile } from 'fs/promises';
const content = await readFile('data.json', 'utf-8');
const json = JSON.parse(content);

// Validate JSON
try {
  JSON.parse(rawString);
  console.log('Valid JSON');
} catch (e) {
  console.error('Invalid JSON:', e.message);
}`}</code></pre>

      <p dangerouslySetInnerHTML={{ __html: s.nodeDesc2 }} />

      {/* Validate */}
      <h2>{s.h2_validate}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.validateDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.validateMethods }} />
      <p><Link href={`/${lang}/tools/json-validator`} style={{ fontWeight: 600 }}>{s.validateLink}</Link></p>

      {/* Large files */}
      <h2>{s.h2_largeFiles}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.largeDesc1 }} />
      <div dangerouslySetInnerHTML={{ __html: s.largeMethods }} />

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
      <p><Link href={`/${lang}/tools/json-formatter`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>

      {/* Internal links for SEO */}
      <h2>Related Developer Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> - Format and beautify JSON data with syntax highlighting</li>
        <li><Link href={`/${lang}/tools/json-viewer`}>JSON Viewer</Link> - Interactive tree-view JSON explorer</li>
        <li><Link href={`/${lang}/tools/json-validator`}>JSON Validator</Link> - Validate JSON syntax and find errors</li>
        <li><Link href={`/${lang}/tools/json-yaml`}>JSON to YAML Converter</Link> - Convert between JSON and YAML formats</li>
        <li><Link href={`/${lang}/tools/csv-json`}>CSV to JSON Converter</Link> - Convert CSV data to JSON format</li>
        <li><Link href={`/${lang}/tools/json-to-typescript`}>JSON to TypeScript</Link> - Generate TypeScript interfaces from JSON</li>
        <li><Link href={`/${lang}/tools/json-to-go`}>JSON to Go</Link> - Create Go structs from JSON data</li>
        <li><Link href={`/${lang}/tools/xml-json`}>XML to JSON</Link> - Convert XML to JSON format</li>
        <li><Link href={`/${lang}/tools/json-to-kotlin`}>JSON to Kotlin</Link> - Generate Kotlin data classes from JSON</li>
      </ul>
    </>
  );
}
