import Link from 'next/link';

const t: Record<string, Record<string, string>> = {
  en: {
    intro: '<strong>Markdown to HTML</strong> conversion is one of the most essential workflows in modern web development. Every day, millions of developers, technical writers, and content creators use a <strong>markdown converter</strong> to transform lightweight plain-text formatting into structured HTML for websites, documentation, and applications. Whether you need to <strong>convert markdown to html</strong> for a blog post, render README files on GitHub, or build a documentation site with a <strong>markdown parser</strong>, understanding this conversion pipeline is critical. From simple inline formatting to complex tables and code blocks, <strong>markdown to html</strong> transformation powers the content layer of countless platforms. If you need a quick <strong>markdown to html online</strong> conversion, our free tool handles it instantly with live preview and syntax highlighting.',
    linkTool: 'Try our free online Markdown to HTML converter with live preview.',
    h2_what: 'What Is Markdown?',
    whatDesc1: '<strong>Markdown</strong> is a lightweight markup language created by John Gruber in 2004, with significant contributions from Aaron Swartz. The original goal was to create a plain-text formatting syntax that is easy to read and write, and that can be converted to structurally valid XHTML or HTML. Unlike HTML, which uses verbose angle-bracket tags, <strong>markdown syntax</strong> relies on intuitive punctuation characters like asterisks, hashes, and brackets to indicate formatting. The language was designed so that even the raw source text is readable without rendering.',
    whatDesc2: 'Since its creation, Markdown has become the de facto standard for writing content on the web. <strong>GitHub</strong> adopted it for README files, issues, and pull requests. <strong>Reddit</strong> uses a Markdown variant for comments and posts. <strong>Stack Overflow</strong> relies on Markdown for questions and answers. Documentation platforms like Read the Docs, GitBook, and Docusaurus all use Markdown as their primary authoring format. Static site generators such as Hugo, Jekyll, Gatsby, and Astro process Markdown files to generate HTML pages.',
    whatDesc3: 'The appeal of Markdown lies in its simplicity and portability. A <code>.md</code> file is just plain text, so it works with any text editor, version control system, or operating system. There is no vendor lock-in, no proprietary format, and no binary encoding. When you need to publish content on the web, a <strong>markdown to html converter</strong> transforms your plain-text source into semantic HTML that browsers can render. This separation of content (Markdown) from presentation (HTML/CSS) is a key architectural principle in modern content management.',

    h2_syntax: 'Markdown Syntax Reference',
    syntaxDesc: 'Understanding <strong>markdown syntax</strong> is the first step to effective Markdown-to-HTML conversion. Here is a comprehensive reference of the most commonly used formatting elements and their HTML equivalents:',
    syntaxHeadings: '<strong>Headings</strong>: Use <code>#</code> through <code>######</code> for heading levels 1 through 6. For example, <code># Title</code> becomes <code>&lt;h1&gt;Title&lt;/h1&gt;</code>, and <code>## Subtitle</code> becomes <code>&lt;h2&gt;Subtitle&lt;/h2&gt;</code>. Alternatively, you can use underlines: a line of <code>=</code> under text creates an H1, and a line of <code>-</code> creates an H2.',
    syntaxEmphasis: '<strong>Bold and Italic</strong>: Wrap text in single asterisks or underscores for <em>italic</em> (<code>*italic*</code> or <code>_italic_</code>), double for <strong>bold</strong> (<code>**bold**</code> or <code>__bold__</code>), and triple for <strong><em>bold italic</em></strong> (<code>***bold italic***</code>). The <strong>markdown renderer</strong> converts these to <code>&lt;em&gt;</code> and <code>&lt;strong&gt;</code> tags respectively.',
    syntaxLinks: '<strong>Links and Images</strong>: Create links with <code>[text](url)</code> and images with <code>![alt](url)</code>. You can add optional titles: <code>[text](url "title")</code>. Reference-style links use <code>[text][id]</code> with a separate definition <code>[id]: url</code>. These convert to <code>&lt;a href&gt;</code> and <code>&lt;img src&gt;</code> tags in HTML.',
    syntaxCode: '<strong>Code</strong>: Inline code uses single backticks: <code>`code`</code> becomes <code>&lt;code&gt;code&lt;/code&gt;</code>. Fenced code blocks use triple backticks with an optional language identifier for syntax highlighting. Indented code blocks (4 spaces or 1 tab) are also supported. The <strong>markdown to html javascript</strong> libraries typically support syntax highlighting through plugins.',
    syntaxLists: '<strong>Lists</strong>: Unordered lists use <code>-</code>, <code>*</code>, or <code>+</code> as markers. Ordered lists use numbers followed by periods (<code>1.</code>). Nested lists are created by indenting with 2 or 4 spaces. These convert to <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> with <code>&lt;li&gt;</code> elements.',
    syntaxBlockquotes: '<strong>Blockquotes</strong>: Prefix lines with <code>&gt;</code> to create blockquotes. They can be nested (<code>&gt;&gt;</code>) and can contain other Markdown elements. The <strong>md to html</strong> conversion wraps these in <code>&lt;blockquote&gt;</code> tags.',
    syntaxTables: '<strong>Tables</strong>: Create tables using pipes (<code>|</code>) and hyphens (<code>-</code>). The header row is separated from data rows by a divider line of hyphens. Colons in the divider control alignment: <code>:---</code> for left, <code>:---:</code> for center, <code>---:</code> for right. Tables are converted to full <code>&lt;table&gt;</code> structures with <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code>.',
    syntaxHr: '<strong>Horizontal Rules</strong>: Three or more hyphens (<code>---</code>), asterisks (<code>***</code>), or underscores (<code>___</code>) on a line create an <code>&lt;hr&gt;</code> element.',
    syntaxTaskList: '<strong>Task Lists</strong>: Use <code>- [ ]</code> for unchecked and <code>- [x]</code> for checked items. These render as interactive checkboxes in many <strong>markdown renderer</strong> implementations, using <code>&lt;input type="checkbox"&gt;</code> elements inside list items.',

    h2_howWorks: 'How Markdown to HTML Conversion Works',
    howWorksDesc1: 'A <strong>markdown parser</strong> transforms plain-text Markdown into HTML through a multi-stage pipeline. Understanding this process helps you choose the right library and troubleshoot conversion issues. The typical <strong>markdown to html</strong> conversion follows three main phases:',
    howWorksDesc2: '<strong>Phase 1 - Tokenization (Lexical Analysis)</strong>: The parser reads the raw Markdown string character by character and breaks it into a stream of tokens. Each token represents a meaningful element: a heading marker (<code>#</code>), a paragraph of text, a code fence (<code>```</code>), a list bullet, emphasis markers, etc. The tokenizer must handle context-sensitive rules, such as distinguishing between an asterisk used for emphasis versus an asterisk in a list item.',
    howWorksDesc3: '<strong>Phase 2 - AST Construction (Parsing)</strong>: The token stream is organized into an Abstract Syntax Tree (AST), a hierarchical data structure that represents the document structure. Each node in the AST corresponds to a Markdown element: the root contains block-level nodes (paragraphs, headings, lists, code blocks), and each block node may contain inline nodes (text, emphasis, links, code spans). The AST captures nesting relationships, such as a bold span inside a link inside a list item.',
    howWorksDesc4: '<strong>Phase 3 - HTML Rendering</strong>: The AST is traversed depth-first, and each node is converted to its corresponding HTML element. A heading node becomes <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>, a paragraph becomes <code>&lt;p&gt;</code>, emphasis becomes <code>&lt;em&gt;</code>, and so on. The renderer handles proper nesting, attribute generation, and HTML entity escaping. Many <strong>markdown to html javascript</strong> libraries allow you to customize the rendering step with plugins or custom renderer functions.',
    howWorksDesc5: 'The <strong>CommonMark specification</strong> (commonmark.org) provides a rigorous, unambiguous definition of Markdown syntax. Before CommonMark, different parsers would produce different HTML output for the same Markdown input due to ambiguities in the original specification. CommonMark resolves these ambiguities with over 600 examples and a detailed parsing algorithm. Most modern <strong>markdown converter</strong> libraries either implement CommonMark directly or use it as a baseline with extensions for features like tables and task lists.',

    h2_codeExamples: 'Code Examples: Convert Markdown to HTML',
    codeJsTitle: 'JavaScript / Node.js (marked, markdown-it, showdown, remark)',
    codeJsDesc: 'JavaScript offers the richest ecosystem for <strong>markdown to html javascript</strong> conversion. Here are the most popular libraries with usage examples. The <strong>marked</strong> library is fast and lightweight, <strong>markdown-it</strong> is highly extensible with a plugin architecture, <strong>showdown</strong> works in both browser and Node.js, and <strong>remark</strong> (part of the unified ecosystem) provides AST-based transformation:',
    codePyTitle: 'Python (markdown, mistune, markdown2)',
    codePyDesc: 'Python provides several excellent libraries to <strong>convert markdown to html</strong>. The built-in <strong>markdown</strong> library supports extensions, <strong>mistune</strong> is one of the fastest Markdown parsers in any language, and <strong>markdown2</strong> provides a simple API with many extras:',
    codeBashTitle: 'Bash / CLI (pandoc, cmark, grip)',
    codeBashDesc: 'Command-line tools let you <strong>convert markdown to html</strong> directly from the terminal. <strong>Pandoc</strong> is the universal document converter, <strong>cmark</strong> is the reference CommonMark implementation, and <strong>grip</strong> provides GitHub-flavored Markdown preview:',
    codeReactTitle: 'React / Next.js (react-markdown, MDX, rehype)',
    codeReactDesc: 'For React and Next.js applications, the <strong>markdown to html</strong> conversion happens at the component level. <strong>react-markdown</strong> renders Markdown as React components, <strong>MDX</strong> allows embedding JSX in Markdown, and <strong>rehype</strong> plugins handle post-processing like syntax highlighting with Prism or Shiki:',

    h2_gfm: 'GitHub Flavored Markdown (GFM)',
    gfmDesc1: '<strong>GitHub Flavored Markdown (GFM)</strong> is a superset of CommonMark developed by GitHub. It adds several features that are essential for software development workflows. GFM is formalized in the GFM specification (github.github.com/gfm/) and supported by most <strong>markdown converter</strong> libraries through extensions or built-in flags.',
    gfmDesc2: '<strong>Tables</strong>: GFM tables use the pipe-and-hyphen syntax described in the syntax reference above. They support column alignment with colons and are widely used in documentation and README files. Most <strong>markdown parser</strong> libraries convert GFM tables to proper HTML <code>&lt;table&gt;</code> elements with <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code>.',
    gfmDesc3: '<strong>Task Lists</strong>: GFM task lists (<code>- [ ]</code> and <code>- [x]</code>) render as checkboxes in GitHub issues, pull requests, and Markdown files. They are frequently used for tracking progress on features, bug fixes, and project milestones. A <strong>markdown renderer</strong> that supports GFM will convert these to list items containing checkbox inputs.',
    gfmDesc4: '<strong>Strikethrough</strong>: Wrapping text in double tildes (<code>~~deleted~~</code>) renders as struck-through text using <code>&lt;del&gt;</code> tags. This is useful for indicating removed or deprecated content in documentation and changelogs.',
    gfmDesc5: '<strong>Autolinks</strong>: GFM automatically converts URLs and email addresses into clickable links without requiring the explicit link syntax. A bare URL like <code>https://example.com</code> becomes an <code>&lt;a&gt;</code> tag automatically.',
    gfmDesc6: '<strong>Footnotes and Alerts</strong>: Extended GFM supports footnotes (<code>[^1]</code>) for academic-style references and alert blocks (<code>&gt; [!NOTE]</code>, <code>&gt; [!WARNING]</code>, etc.) for callout-style notices in documentation. These features are commonly available as <strong>markdown parser</strong> extensions.',

    h2_advanced: 'Advanced Markdown Features',
    advancedDesc1: 'Beyond basic and GFM syntax, the <strong>markdown to html</strong> ecosystem supports many advanced features through extensions and plugins:',
    advancedDesc2: '<strong>Custom Containers / Directives</strong>: Libraries like <strong>markdown-it-container</strong> and <strong>remark-directive</strong> allow you to define custom block elements using a colon-fence syntax (<code>::: warning</code>). These are useful for creating styled callouts, admonitions, and content blocks in documentation sites. The <strong>markdown converter</strong> transforms them into <code>&lt;div&gt;</code> elements with custom CSS classes.',
    advancedDesc3: '<strong>Mathematical Notation (KaTeX / MathJax)</strong>: Math rendering is essential for scientific and academic documentation. Inline math uses <code>$E = mc^2$</code> and display math uses <code>$$...$$</code>. Libraries like <strong>remark-math</strong> with <strong>rehype-katex</strong> or <strong>rehype-mathjax</strong> convert LaTeX math expressions into rendered formulas. This feature is widely used in Jupyter notebooks, academic papers, and technical documentation.',
    advancedDesc4: '<strong>Diagrams with Mermaid</strong>: Mermaid is a JavaScript-based diagramming tool that uses a Markdown-inspired text syntax to generate flowcharts, sequence diagrams, Gantt charts, class diagrams, and more. By embedding Mermaid code in fenced code blocks (<code>```mermaid</code>), the <strong>markdown renderer</strong> can generate SVG diagrams directly from text descriptions, eliminating the need for external diagramming tools.',
    advancedDesc5: '<strong>Front Matter</strong>: YAML front matter (delimited by <code>---</code>) at the top of Markdown files stores metadata such as title, date, author, tags, and custom properties. Static site generators and <strong>md to html</strong> build tools parse this metadata to generate page titles, URL slugs, and taxonomy pages. Libraries like <strong>gray-matter</strong> (JavaScript) and <strong>python-frontmatter</strong> handle front matter extraction.',
    advancedDesc6: '<strong>Table of Contents Generation</strong>: Many <strong>markdown parser</strong> plugins can automatically generate a table of contents (TOC) from heading structure. Plugins like <strong>remark-toc</strong>, <strong>markdown-it-toc-done-right</strong>, and Pandoc\'s <code>--toc</code> flag scan headings, generate anchor IDs, and insert a linked TOC at a designated location in the document.',

    h2_bestPractices: 'Markdown Best Practices',
    bestPracticesDesc: 'Following best practices ensures your Markdown files are consistent, accessible, and produce clean HTML output when processed by a <strong>markdown to html converter</strong>:',
    bestPractice1: '<strong>Consistent Heading Hierarchy</strong>: Always start with a single H1 (<code>#</code>) for the document title and use subsequent levels in order (H2, H3, etc.) without skipping levels. This creates a proper document outline that benefits both screen readers and SEO. Never use headings for visual styling; use CSS for that. Each heading level should represent a genuine structural subdivision of the content.',
    bestPractice2: '<strong>Descriptive Alt Text for Images</strong>: Always provide meaningful alt text in the <code>![alt](url)</code> syntax. Alt text should describe the content and purpose of the image for users who cannot see it. Avoid generic text like "image" or "screenshot." Good alt text improves accessibility (WCAG compliance) and provides context when images fail to load.',
    bestPractice3: '<strong>Semantic Line Breaks</strong>: Consider breaking lines at sentence boundaries or logical phrase boundaries rather than at a fixed column width. This practice, sometimes called "semantic line breaks" or "ventilated prose," makes diffs more readable in version control systems like Git, since each sentence or clause appears on its own line.',
    bestPractice4: '<strong>Linting with markdownlint</strong>: Use <strong>markdownlint</strong> (available as a CLI tool, VS Code extension, and GitHub Action) to enforce consistent style across your Markdown files. The linter catches issues like inconsistent heading styles, trailing whitespace, missing blank lines around headings and lists, and bare URLs. Configure rules in a <code>.markdownlint.json</code> file to match your team\'s conventions.',
    bestPractice5: '<strong>Accessibility Considerations</strong>: Beyond alt text, ensure your Markdown produces accessible HTML by using proper heading structure, providing descriptive link text (avoid "click here"), using tables only for tabular data (not layout), and including language identifiers on code blocks for screen reader compatibility. When your <strong>markdown to html</strong> output is consumed by assistive technologies, these practices make a significant difference.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'How do I convert Markdown to HTML?',
    faq1_a: 'You can convert Markdown to HTML using a variety of tools and libraries. In JavaScript, popular choices include marked.js, markdown-it, showdown, and the unified/remark ecosystem. In Python, use the markdown library, mistune, or markdown2. For command-line conversion, pandoc and cmark are the standard tools. For a quick no-install solution, use an online Markdown to HTML converter that provides live preview and instant conversion. The conversion process involves parsing the Markdown syntax into tokens, building an Abstract Syntax Tree (AST), and rendering the AST as HTML elements.',
    faq2_q: 'What is the best Markdown to HTML library?',
    faq2_a: 'The best library depends on your use case. For JavaScript, markdown-it is the most popular choice due to its speed, CommonMark compliance, and rich plugin ecosystem. marked.js is lighter and faster but less extensible. For React applications, react-markdown is the standard. In Python, mistune is the fastest parser, while the markdown library offers the most extensions. For the unified ecosystem (remark/rehype), you get maximum flexibility with AST-based transformations. If you need a universal command-line tool, pandoc supports conversion between dozens of formats including Markdown and HTML.',
    faq3_q: 'What is the difference between GFM and CommonMark?',
    faq3_a: 'CommonMark is a strict, unambiguous specification of the original Markdown syntax created by John Gruber. It defines the core syntax including headings, paragraphs, links, images, emphasis, code blocks, lists, and blockquotes. GitHub Flavored Markdown (GFM) is a superset of CommonMark that adds extensions commonly needed in software development: tables, task lists (checkboxes), strikethrough text, autolinks, and disallowed raw HTML tags for security. Most modern Markdown parsers support both CommonMark and GFM, often with a simple configuration flag to enable GFM extensions.',
    conclusion: 'Markdown to HTML conversion is a foundational skill for every web developer and technical writer. From understanding the parsing pipeline to choosing the right library for your stack, mastering the <strong>markdown to html</strong> workflow enables you to build documentation sites, blogs, and content-rich applications with clean, semantic HTML output. Whether you use a <strong>markdown to html javascript</strong> library in the browser or a command-line <strong>markdown converter</strong> in your build process, the principles remain the same. Bookmark this guide for quick reference, and use our free online tool for instant conversion.',
    linkToolBottom: 'Convert Markdown to HTML instantly with our free online tool.',
  },
  zh: {
    intro: '<strong>Markdown 转 HTML</strong> 是现代 Web 开发中最重要的工作流之一。每天有数百万开发者、技术作者和内容创作者使用 <strong>Markdown 转换器</strong>将轻量级纯文本格式转换为结构化 HTML。无论你需要为博客文章转换 Markdown、在 GitHub 上渲染 README 文件，还是使用 Markdown 解析器构建文档站点，理解这个转换管道至关重要。如果你需要快速在线将 Markdown 转换为 HTML，我们的免费工具可以即时完成，并提供实时预览和语法高亮。',
    linkTool: '立即试用我们的免费在线 Markdown 转 HTML 转换工具。',
    h2_what: '什么是 Markdown？',
    whatDesc1: '<strong>Markdown</strong> 是由 John Gruber 于 2004 年创建的轻量级标记语言，Aaron Swartz 也做出了重要贡献。其目标是创建一种易于阅读和编写的纯文本格式化语法，可以转换为结构化的 XHTML 或 HTML。与使用冗长尖括号标签的 HTML 不同，Markdown 语法使用直观的标点字符（如星号、井号和方括号）来表示格式。',
    whatDesc2: '自创建以来，Markdown 已成为 Web 内容编写的事实标准。GitHub 用于 README 文件、Issue 和 Pull Request；Reddit 用于评论和帖子；Stack Overflow 用于问答。Hugo、Jekyll、Gatsby 和 Astro 等静态站点生成器都使用 Markdown 文件生成 HTML 页面。',
    whatDesc3: 'Markdown 的吸引力在于其简洁性和可移植性。<code>.md</code> 文件只是纯文本，可以在任何文本编辑器、版本控制系统或操作系统中使用。没有供应商锁定、没有专有格式、没有二进制编码。当你需要发布内容时，Markdown 转 HTML 转换器将纯文本源转换为浏览器可以渲染的语义化 HTML。',
    h2_syntax: 'Markdown 语法参考',
    syntaxDesc: '理解 Markdown 语法是有效进行 Markdown 转 HTML 转换的第一步。以下是最常用格式化元素及其 HTML 等价物的全面参考：',
    syntaxHeadings: '<strong>标题</strong>：使用 <code>#</code> 到 <code>######</code> 表示 1 到 6 级标题。例如 <code># 标题</code> 变为 <code>&lt;h1&gt;</code>，<code>## 副标题</code> 变为 <code>&lt;h2&gt;</code>。',
    syntaxEmphasis: '<strong>粗体和斜体</strong>：单个星号或下划线表示<em>斜体</em>，双星号表示<strong>粗体</strong>，三星号表示<strong><em>粗斜体</em></strong>。Markdown 渲染器将其转换为 <code>&lt;em&gt;</code> 和 <code>&lt;strong&gt;</code> 标签。',
    syntaxLinks: '<strong>链接和图片</strong>：使用 <code>[文本](URL)</code> 创建链接，<code>![替代文本](URL)</code> 创建图片。这些在 HTML 中转换为 <code>&lt;a href&gt;</code> 和 <code>&lt;img src&gt;</code> 标签。',
    syntaxCode: '<strong>代码</strong>：行内代码使用反引号：<code>`code`</code> 变为 <code>&lt;code&gt;</code>。围栏代码块使用三个反引号，可选语言标识符用于语法高亮。',
    syntaxLists: '<strong>列表</strong>：无序列表使用 <code>-</code>、<code>*</code> 或 <code>+</code> 作为标记。有序列表使用数字加句点。嵌套列表通过缩进创建。',
    syntaxBlockquotes: '<strong>引用</strong>：在行首添加 <code>&gt;</code> 创建引用块。可以嵌套，可以包含其他 Markdown 元素。',
    syntaxTables: '<strong>表格</strong>：使用管道符（<code>|</code>）和连字符（<code>-</code>）创建表格。冒号控制对齐方式。',
    syntaxHr: '<strong>水平线</strong>：三个或更多连字符（<code>---</code>）、星号（<code>***</code>）或下划线（<code>___</code>）创建 <code>&lt;hr&gt;</code> 元素。',
    syntaxTaskList: '<strong>任务列表</strong>：使用 <code>- [ ]</code> 表示未完成，<code>- [x]</code> 表示已完成项目。',
    h2_howWorks: 'Markdown 转 HTML 的工作原理',
    howWorksDesc1: 'Markdown 解析器通过多阶段管道将纯文本 Markdown 转换为 HTML。典型的转换过程包含三个主要阶段：',
    howWorksDesc2: '<strong>阶段 1 - 词法分析（Tokenization）</strong>：解析器逐字符读取原始 Markdown 字符串，将其分解为令牌流。每个令牌代表一个有意义的元素：标题标记、段落文本、代码围栏、列表标记、强调标记等。',
    howWorksDesc3: '<strong>阶段 2 - AST 构建（解析）</strong>：令牌流被组织成抽象语法树（AST），这是一种表示文档结构的层次数据结构。AST 中的每个节点对应一个 Markdown 元素。',
    howWorksDesc4: '<strong>阶段 3 - HTML 渲染</strong>：深度优先遍历 AST，将每个节点转换为对应的 HTML 元素。标题节点变为 <code>&lt;h1&gt;</code>-<code>&lt;h6&gt;</code>，段落变为 <code>&lt;p&gt;</code>，强调变为 <code>&lt;em&gt;</code>。',
    howWorksDesc5: '<strong>CommonMark 规范</strong>提供了 Markdown 语法的严格、无歧义定义。在 CommonMark 之前，不同解析器对相同输入会产生不同输出。CommonMark 通过 600 多个示例解决了这些歧义。',
    h2_codeExamples: '代码示例：Markdown 转 HTML',
    codeJsTitle: 'JavaScript / Node.js（marked、markdown-it、showdown、remark）',
    codeJsDesc: 'JavaScript 拥有最丰富的 Markdown 转 HTML 生态系统。以下是最流行的库及其使用示例：',
    codePyTitle: 'Python（markdown、mistune、markdown2）',
    codePyDesc: 'Python 提供了多个优秀的 Markdown 转 HTML 库：',
    codeBashTitle: 'Bash / CLI（pandoc、cmark、grip）',
    codeBashDesc: '命令行工具让你可以直接从终端将 Markdown 转换为 HTML：',
    codeReactTitle: 'React / Next.js（react-markdown、MDX、rehype）',
    codeReactDesc: '在 React 和 Next.js 应用中，Markdown 转 HTML 转换在组件级别进行：',
    h2_gfm: 'GitHub 风格 Markdown（GFM）',
    gfmDesc1: '<strong>GitHub Flavored Markdown（GFM）</strong>是 GitHub 开发的 CommonMark 超集。它添加了软件开发工作流中必不可少的功能。',
    gfmDesc2: '<strong>表格</strong>：GFM 表格使用管道符和连字符语法。支持用冒号控制列对齐。大多数 Markdown 解析器库将 GFM 表格转换为完整的 HTML <code>&lt;table&gt;</code> 结构。',
    gfmDesc3: '<strong>任务列表</strong>：GFM 任务列表在 GitHub Issue 和 PR 中渲染为复选框，常用于跟踪功能、Bug 修复和项目里程碑的进度。',
    gfmDesc4: '<strong>删除线</strong>：用双波浪号包裹文本（<code>~~已删除~~</code>）渲染为删除线文本，使用 <code>&lt;del&gt;</code> 标签。',
    gfmDesc5: '<strong>自动链接</strong>：GFM 自动将 URL 和电子邮件地址转换为可点击的链接。',
    gfmDesc6: '<strong>脚注和提醒</strong>：扩展 GFM 支持脚注（<code>[^1]</code>）和提醒块（<code>&gt; [!NOTE]</code>、<code>&gt; [!WARNING]</code> 等）。',
    h2_advanced: '高级 Markdown 功能',
    advancedDesc1: '除了基本和 GFM 语法外，Markdown 转 HTML 生态系统通过扩展和插件支持许多高级功能：',
    advancedDesc2: '<strong>自定义容器/指令</strong>：markdown-it-container 和 remark-directive 等库允许使用冒号围栏语法定义自定义块元素，用于创建样式化的提示框和文档内容块。',
    advancedDesc3: '<strong>数学公式（KaTeX / MathJax）</strong>：行内数学使用 <code>$E = mc^2$</code>，块级数学使用 <code>$$...$$</code>。remark-math 配合 rehype-katex 可将 LaTeX 数学表达式渲染为公式。',
    advancedDesc4: '<strong>Mermaid 图表</strong>：Mermaid 使用类 Markdown 的文本语法生成流程图、序列图、甘特图等。通过在围栏代码块中嵌入 Mermaid 代码，可直接从文本生成 SVG 图表。',
    advancedDesc5: '<strong>Front Matter</strong>：Markdown 文件顶部的 YAML 前置元数据（<code>---</code> 分隔）存储标题、日期、作者、标签等。静态站点生成器解析这些元数据生成页面标题和 URL。',
    advancedDesc6: '<strong>目录生成</strong>：许多 Markdown 解析器插件可以从标题结构自动生成目录（TOC），如 remark-toc 和 markdown-it-toc-done-right。',
    h2_bestPractices: 'Markdown 最佳实践',
    bestPracticesDesc: '遵循最佳实践可确保你的 Markdown 文件一致、可访问，并在 Markdown 转 HTML 转换时产生干净的输出：',
    bestPractice1: '<strong>一致的标题层级</strong>：始终从单个 H1 开始，按顺序使用后续级别，不要跳级。这创建了有利于屏幕阅读器和 SEO 的文档大纲。',
    bestPractice2: '<strong>图片描述性替代文本</strong>：始终在 <code>![alt](url)</code> 语法中提供有意义的替代文本。良好的替代文本提高可访问性（WCAG 合规）。',
    bestPractice3: '<strong>语义换行</strong>：考虑在句子或逻辑短语边界处换行，而不是固定列宽。这使版本控制系统中的差异更易读。',
    bestPractice4: '<strong>使用 markdownlint 进行检查</strong>：使用 markdownlint（CLI 工具、VS Code 扩展或 GitHub Action）在 Markdown 文件中强制执行一致的样式。',
    bestPractice5: '<strong>可访问性考虑</strong>：确保正确的标题结构、描述性链接文本、仅对表格数据使用表格，以及在代码块中包含语言标识符。',
    h2_faq: '常见问题',
    faq1_q: '如何将 Markdown 转换为 HTML？',
    faq1_a: '你可以使用多种工具和库将 Markdown 转换为 HTML。JavaScript 中流行的选择包括 marked.js、markdown-it、showdown 和 unified/remark 生态系统。Python 中可使用 markdown 库、mistune 或 markdown2。命令行转换可使用 pandoc 和 cmark。转换过程涉及将 Markdown 语法解析为令牌、构建抽象语法树（AST）并将 AST 渲染为 HTML 元素。',
    faq2_q: '最好的 Markdown 转 HTML 库是什么？',
    faq2_a: '最佳库取决于你的使用场景。JavaScript 中 markdown-it 最受欢迎，因其速度快、符合 CommonMark 规范且有丰富的插件生态。React 应用中 react-markdown 是标准选择。Python 中 mistune 是最快的解析器。如需通用命令行工具，pandoc 支持数十种格式之间的转换。',
    faq3_q: 'GFM 和 CommonMark 有什么区别？',
    faq3_a: 'CommonMark 是原始 Markdown 语法的严格、无歧义规范。GFM 是 CommonMark 的超集，添加了软件开发中常用的扩展：表格、任务列表、删除线、自动链接等。大多数现代 Markdown 解析器同时支持 CommonMark 和 GFM，通常通过配置标志启用 GFM 扩展。',
    conclusion: 'Markdown 转 HTML 是每个 Web 开发者和技术作者的基础技能。从理解解析管道到为你的技术栈选择合适的库，掌握 Markdown 转 HTML 工作流使你能够构建文档站点、博客和内容丰富的应用。收藏本指南以备参考，并使用我们的免费在线工具进行即时转换。',
    linkToolBottom: '使用我们的免费在线工具即时将 Markdown 转换为 HTML。',
  },
  fr: {
    intro: 'La conversion <strong>Markdown vers HTML</strong> est l\'un des flux de travail les plus essentiels du developpement web moderne. Des millions de developpeurs utilisent un convertisseur Markdown pour transformer du texte brut en HTML structure. Que vous ayez besoin de convertir du Markdown pour un article de blog ou de construire un site de documentation, ce guide couvre tout. Notre outil gratuit en ligne offre une conversion instantanee avec apercu en direct.',
    linkTool: 'Essayez notre convertisseur gratuit Markdown vers HTML en ligne.',
    h2_what: 'Qu\'est-ce que Markdown ?',
    whatDesc1: '<strong>Markdown</strong> est un langage de balisage leger cree par John Gruber en 2004. Son objectif etait de creer une syntaxe de formatage en texte brut facile a lire et ecrire, convertible en HTML valide. Contrairement au HTML, Markdown utilise des caracteres de ponctuation intuitifs pour indiquer le formatage.',
    whatDesc2: 'Depuis sa creation, Markdown est devenu le standard pour l\'ecriture de contenu web. GitHub l\'utilise pour les fichiers README, Reddit pour les commentaires, Stack Overflow pour les questions et reponses. Les generateurs de sites statiques comme Hugo, Jekyll et Gatsby traitent les fichiers Markdown pour generer des pages HTML.',
    whatDesc3: 'L\'attrait de Markdown reside dans sa simplicite et sa portabilite. Un fichier <code>.md</code> est du texte brut compatible avec tout editeur, systeme de controle de version ou systeme d\'exploitation.',
    h2_syntax: 'Reference de la syntaxe Markdown',
    syntaxDesc: 'Comprendre la syntaxe Markdown est la premiere etape pour une conversion efficace vers HTML :',
    syntaxHeadings: '<strong>Titres</strong> : Utilisez <code>#</code> a <code>######</code> pour les niveaux 1 a 6.',
    syntaxEmphasis: '<strong>Gras et italique</strong> : Asterisques simples pour l\'italique, doubles pour le gras, triples pour le gras italique.',
    syntaxLinks: '<strong>Liens et images</strong> : <code>[texte](url)</code> pour les liens, <code>![alt](url)</code> pour les images.',
    syntaxCode: '<strong>Code</strong> : Backticks simples pour le code en ligne, triples backticks pour les blocs de code.',
    syntaxLists: '<strong>Listes</strong> : <code>-</code>, <code>*</code> ou <code>+</code> pour les listes non ordonnees, numeros pour les ordonnees.',
    syntaxBlockquotes: '<strong>Citations</strong> : Prefixez les lignes avec <code>&gt;</code> pour creer des blocs de citation.',
    syntaxTables: '<strong>Tableaux</strong> : Utilisez les pipes (<code>|</code>) et tirets (<code>-</code>) pour creer des tableaux.',
    syntaxHr: '<strong>Lignes horizontales</strong> : Trois tirets (<code>---</code>), asterisques (<code>***</code>) ou underscores (<code>___</code>).',
    syntaxTaskList: '<strong>Listes de taches</strong> : <code>- [ ]</code> pour non coche, <code>- [x]</code> pour coche.',
    h2_howWorks: 'Comment fonctionne la conversion Markdown vers HTML',
    howWorksDesc1: 'Un parseur Markdown transforme le texte brut en HTML via un pipeline multi-etapes comprenant trois phases principales :',
    howWorksDesc2: '<strong>Phase 1 - Tokenisation</strong> : Le parseur lit la chaine Markdown et la decompose en flux de jetons representant les elements.',
    howWorksDesc3: '<strong>Phase 2 - Construction de l\'AST</strong> : Le flux de jetons est organise en arbre syntaxique abstrait representant la structure du document.',
    howWorksDesc4: '<strong>Phase 3 - Rendu HTML</strong> : L\'AST est parcouru et chaque noeud est converti en element HTML correspondant.',
    howWorksDesc5: 'La specification <strong>CommonMark</strong> fournit une definition rigoureuse de la syntaxe Markdown avec plus de 600 exemples.',
    h2_codeExamples: 'Exemples de code : Markdown vers HTML',
    codeJsTitle: 'JavaScript / Node.js (marked, markdown-it, showdown, remark)',
    codeJsDesc: 'JavaScript offre l\'ecosysteme le plus riche pour la conversion Markdown vers HTML :',
    codePyTitle: 'Python (markdown, mistune, markdown2)',
    codePyDesc: 'Python propose plusieurs excellentes bibliotheques pour convertir Markdown en HTML :',
    codeBashTitle: 'Bash / CLI (pandoc, cmark, grip)',
    codeBashDesc: 'Les outils en ligne de commande permettent de convertir Markdown en HTML directement depuis le terminal :',
    codeReactTitle: 'React / Next.js (react-markdown, MDX, rehype)',
    codeReactDesc: 'Pour React et Next.js, la conversion se fait au niveau des composants :',
    h2_gfm: 'GitHub Flavored Markdown (GFM)',
    gfmDesc1: '<strong>GitHub Flavored Markdown (GFM)</strong> est un surensemble de CommonMark developpe par GitHub, ajoutant des fonctionnalites essentielles pour le developpement logiciel.',
    gfmDesc2: '<strong>Tableaux</strong> : Les tableaux GFM supportent l\'alignement des colonnes avec des deux-points.',
    gfmDesc3: '<strong>Listes de taches</strong> : Les cases a cocher sont rendues dans les issues et PR GitHub.',
    gfmDesc4: '<strong>Texte barre</strong> : Le double tilde (<code>~~supprime~~</code>) rend le texte barre avec <code>&lt;del&gt;</code>.',
    gfmDesc5: '<strong>Liens automatiques</strong> : GFM convertit automatiquement les URL en liens cliquables.',
    gfmDesc6: '<strong>Notes de bas de page et alertes</strong> : GFM etendu supporte les notes de bas de page et les blocs d\'alerte.',
    h2_advanced: 'Fonctionnalites Markdown avancees',
    advancedDesc1: 'L\'ecosysteme Markdown supporte de nombreuses fonctionnalites avancees via des extensions et plugins :',
    advancedDesc2: '<strong>Conteneurs personnalises</strong> : markdown-it-container et remark-directive permettent de definir des elements de blocs personnalises.',
    advancedDesc3: '<strong>Notation mathematique (KaTeX / MathJax)</strong> : Le rendu mathematique est essentiel pour la documentation scientifique.',
    advancedDesc4: '<strong>Diagrammes avec Mermaid</strong> : Mermaid genere des diagrammes a partir de syntaxe textuelle.',
    advancedDesc5: '<strong>Front Matter</strong> : Les metadonnees YAML en debut de fichier stockent titre, date, auteur et tags.',
    advancedDesc6: '<strong>Generation de table des matieres</strong> : De nombreux plugins generent automatiquement une table des matieres a partir des titres.',
    h2_bestPractices: 'Bonnes pratiques Markdown',
    bestPracticesDesc: 'Suivre les bonnes pratiques assure des fichiers Markdown coherents et accessibles :',
    bestPractice1: '<strong>Hierarchie de titres coherente</strong> : Commencez par un H1 unique et utilisez les niveaux suivants dans l\'ordre.',
    bestPractice2: '<strong>Texte alternatif descriptif</strong> : Fournissez toujours un texte alternatif significatif pour les images.',
    bestPractice3: '<strong>Sauts de ligne semantiques</strong> : Coupez les lignes aux limites de phrases pour des diffs plus lisibles.',
    bestPractice4: '<strong>Linting avec markdownlint</strong> : Utilisez markdownlint pour imposer un style coherent.',
    bestPractice5: '<strong>Accessibilite</strong> : Assurez une structure de titres correcte et des textes de liens descriptifs.',
    h2_faq: 'Questions frequemment posees',
    faq1_q: 'Comment convertir Markdown en HTML ?',
    faq1_a: 'Utilisez des bibliotheques comme marked.js, markdown-it ou showdown en JavaScript, markdown ou mistune en Python, ou pandoc en ligne de commande. Le processus implique la tokenisation, la construction d\'un AST et le rendu HTML.',
    faq2_q: 'Quelle est la meilleure bibliotheque Markdown vers HTML ?',
    faq2_a: 'markdown-it est le choix le plus populaire en JavaScript pour sa vitesse et son ecosysteme de plugins. react-markdown est le standard pour React. En Python, mistune est le plus rapide. pandoc est l\'outil universel en ligne de commande.',
    faq3_q: 'Quelle est la difference entre GFM et CommonMark ?',
    faq3_a: 'CommonMark est une specification stricte de la syntaxe Markdown originale. GFM est un surensemble ajoutant tableaux, listes de taches, texte barre et liens automatiques. La plupart des parseurs modernes supportent les deux.',
    conclusion: 'La conversion Markdown vers HTML est une competence fondamentale. Utilisez notre outil gratuit pour une conversion instantanee.',
    linkToolBottom: 'Convertissez Markdown en HTML instantanement avec notre outil gratuit.',
  },
  de: {
    intro: 'Die Konvertierung von <strong>Markdown zu HTML</strong> ist einer der wichtigsten Arbeitsablaufe in der modernen Webentwicklung. Millionen von Entwicklern verwenden einen Markdown-Konverter, um leichtgewichtigen Klartext in strukturiertes HTML umzuwandeln. Ob fur Blogbeitrage, README-Dateien oder Dokumentationsseiten, dieser Leitfaden deckt alles ab. Unser kostenloses Online-Tool bietet sofortige Konvertierung mit Live-Vorschau.',
    linkTool: 'Testen Sie unseren kostenlosen Online Markdown-zu-HTML-Konverter.',
    h2_what: 'Was ist Markdown?',
    whatDesc1: '<strong>Markdown</strong> ist eine leichtgewichtige Auszeichnungssprache, die 2004 von John Gruber erstellt wurde. Ziel war eine einfach zu lesende und zu schreibende Klartext-Formatierungssyntax, die in gultiges HTML konvertiert werden kann. Im Gegensatz zu HTML verwendet Markdown intuitive Satzzeichen zur Formatierung.',
    whatDesc2: 'Seit seiner Entstehung ist Markdown zum Standard fur Web-Inhalte geworden. GitHub verwendet es fur README-Dateien, Reddit fur Kommentare, Stack Overflow fur Fragen und Antworten. Statische Site-Generatoren wie Hugo, Jekyll und Gatsby verarbeiten Markdown-Dateien zu HTML-Seiten.',
    whatDesc3: 'Die Attraktivitat von Markdown liegt in seiner Einfachheit und Portabilitat. Eine <code>.md</code>-Datei ist reiner Text, kompatibel mit jedem Editor und Betriebssystem.',
    h2_syntax: 'Markdown-Syntaxreferenz',
    syntaxDesc: 'Das Verstandnis der Markdown-Syntax ist der erste Schritt zur effektiven Konvertierung:',
    syntaxHeadings: '<strong>Uberschriften</strong>: Verwenden Sie <code>#</code> bis <code>######</code> fur die Ebenen 1 bis 6.',
    syntaxEmphasis: '<strong>Fett und Kursiv</strong>: Einfache Sternchen fur Kursiv, doppelte fur Fett, dreifache fur Fett-Kursiv.',
    syntaxLinks: '<strong>Links und Bilder</strong>: <code>[Text](URL)</code> fur Links, <code>![Alt](URL)</code> fur Bilder.',
    syntaxCode: '<strong>Code</strong>: Einzelne Backticks fur Inline-Code, dreifache Backticks fur Codeblocke.',
    syntaxLists: '<strong>Listen</strong>: <code>-</code>, <code>*</code> oder <code>+</code> fur ungeordnete Listen, Nummern fur geordnete.',
    syntaxBlockquotes: '<strong>Zitate</strong>: Zeilen mit <code>&gt;</code> voranstellen fur Zitatblocke.',
    syntaxTables: '<strong>Tabellen</strong>: Pipes (<code>|</code>) und Bindestriche (<code>-</code>) fur Tabellen verwenden.',
    syntaxHr: '<strong>Horizontale Linien</strong>: Drei Bindestriche (<code>---</code>), Sternchen (<code>***</code>) oder Unterstriche (<code>___</code>).',
    syntaxTaskList: '<strong>Aufgabenlisten</strong>: <code>- [ ]</code> fur nicht angekreuzt, <code>- [x]</code> fur angekreuzt.',
    h2_howWorks: 'Wie die Markdown-zu-HTML-Konvertierung funktioniert',
    howWorksDesc1: 'Ein Markdown-Parser wandelt Klartext uber eine mehrstufige Pipeline in drei Hauptphasen in HTML um:',
    howWorksDesc2: '<strong>Phase 1 - Tokenisierung</strong>: Der Parser liest den Markdown-String und zerlegt ihn in einen Token-Strom.',
    howWorksDesc3: '<strong>Phase 2 - AST-Konstruktion</strong>: Der Token-Strom wird in einen abstrakten Syntaxbaum organisiert.',
    howWorksDesc4: '<strong>Phase 3 - HTML-Rendering</strong>: Der AST wird durchlaufen und jeder Knoten in das entsprechende HTML-Element konvertiert.',
    howWorksDesc5: 'Die <strong>CommonMark-Spezifikation</strong> bietet eine strenge Definition der Markdown-Syntax mit uber 600 Beispielen.',
    h2_codeExamples: 'Codebeispiele: Markdown zu HTML',
    codeJsTitle: 'JavaScript / Node.js (marked, markdown-it, showdown, remark)',
    codeJsDesc: 'JavaScript bietet das reichste Okosystem fur die Markdown-zu-HTML-Konvertierung:',
    codePyTitle: 'Python (markdown, mistune, markdown2)',
    codePyDesc: 'Python bietet mehrere ausgezeichnete Bibliotheken zur Markdown-zu-HTML-Konvertierung:',
    codeBashTitle: 'Bash / CLI (pandoc, cmark, grip)',
    codeBashDesc: 'Kommandozeilen-Tools ermoglichen die direkte Konvertierung von Markdown zu HTML im Terminal:',
    codeReactTitle: 'React / Next.js (react-markdown, MDX, rehype)',
    codeReactDesc: 'In React und Next.js erfolgt die Konvertierung auf Komponentenebene:',
    h2_gfm: 'GitHub Flavored Markdown (GFM)',
    gfmDesc1: '<strong>GitHub Flavored Markdown (GFM)</strong> ist eine Obermenge von CommonMark, entwickelt von GitHub mit zusatzlichen Funktionen fur die Softwareentwicklung.',
    gfmDesc2: '<strong>Tabellen</strong>: GFM-Tabellen unterstutzen Spaltenausrichtung mit Doppelpunkten.',
    gfmDesc3: '<strong>Aufgabenlisten</strong>: Kontrollkastchen werden in GitHub Issues und PRs gerendert.',
    gfmDesc4: '<strong>Durchgestrichen</strong>: Doppelte Tilden (<code>~~geloscht~~</code>) rendern durchgestrichenen Text.',
    gfmDesc5: '<strong>Automatische Links</strong>: GFM konvertiert URLs automatisch in klickbare Links.',
    gfmDesc6: '<strong>Fussnoten und Hinweise</strong>: Erweitertes GFM unterstutzt Fussnoten und Hinweisblocke.',
    h2_advanced: 'Erweiterte Markdown-Funktionen',
    advancedDesc1: 'Das Markdown-Okosystem unterstutzt uber Erweiterungen viele fortgeschrittene Funktionen:',
    advancedDesc2: '<strong>Benutzerdefinierte Container</strong>: markdown-it-container und remark-directive ermoglichen benutzerdefinierte Blockelemente.',
    advancedDesc3: '<strong>Mathematische Notation (KaTeX / MathJax)</strong>: Mathematik-Rendering fur wissenschaftliche Dokumentation.',
    advancedDesc4: '<strong>Diagramme mit Mermaid</strong>: Mermaid generiert Diagramme aus textueller Syntax.',
    advancedDesc5: '<strong>Front Matter</strong>: YAML-Metadaten am Dateianfang speichern Titel, Datum, Autor und Tags.',
    advancedDesc6: '<strong>Inhaltsverzeichnis-Generierung</strong>: Plugins generieren automatisch ein Inhaltsverzeichnis aus Uberschriften.',
    h2_bestPractices: 'Markdown Best Practices',
    bestPracticesDesc: 'Best Practices sorgen fur konsistente und zugangliche Markdown-Dateien:',
    bestPractice1: '<strong>Konsistente Uberschriften-Hierarchie</strong>: Beginnen Sie mit einem H1 und verwenden Sie nachfolgende Ebenen der Reihe nach.',
    bestPractice2: '<strong>Beschreibender Alt-Text</strong>: Geben Sie immer aussagekraftigen Alt-Text fur Bilder an.',
    bestPractice3: '<strong>Semantische Zeilenumbruche</strong>: Brechen Sie Zeilen an Satzgrenzen fur besser lesbare Diffs.',
    bestPractice4: '<strong>Linting mit markdownlint</strong>: Verwenden Sie markdownlint fur konsistenten Stil.',
    bestPractice5: '<strong>Barrierefreiheit</strong>: Sorgen Sie fur korrekte Uberschriftenstruktur und beschreibende Linktexte.',
    h2_faq: 'Haufig gestellte Fragen',
    faq1_q: 'Wie konvertiert man Markdown zu HTML?',
    faq1_a: 'Verwenden Sie Bibliotheken wie marked.js, markdown-it oder showdown in JavaScript, markdown oder mistune in Python, oder pandoc auf der Kommandozeile. Der Prozess umfasst Tokenisierung, AST-Aufbau und HTML-Rendering.',
    faq2_q: 'Welche ist die beste Markdown-zu-HTML-Bibliothek?',
    faq2_a: 'markdown-it ist die beliebteste Wahl in JavaScript wegen Geschwindigkeit und Plugin-Okosystem. react-markdown ist Standard fur React. In Python ist mistune am schnellsten. pandoc ist das universelle Kommandozeilen-Tool.',
    faq3_q: 'Was ist der Unterschied zwischen GFM und CommonMark?',
    faq3_a: 'CommonMark ist eine strenge Spezifikation der originalen Markdown-Syntax. GFM ist eine Obermenge mit Tabellen, Aufgabenlisten, Durchstreichen und automatischen Links. Die meisten modernen Parser unterstutzen beide.',
    conclusion: 'Markdown-zu-HTML-Konvertierung ist eine grundlegende Fahigkeit. Nutzen Sie unser kostenloses Tool fur sofortige Konvertierung.',
    linkToolBottom: 'Konvertieren Sie Markdown sofort zu HTML mit unserem kostenlosen Online-Tool.',
  },
  es: {
    intro: 'La conversion de <strong>Markdown a HTML</strong> es uno de los flujos de trabajo mas esenciales en el desarrollo web moderno. Millones de desarrolladores usan un convertidor de Markdown para transformar texto plano en HTML estructurado. Ya sea para articulos de blog, archivos README o sitios de documentacion, esta guia lo cubre todo. Nuestra herramienta gratuita en linea ofrece conversion instantanea con vista previa en vivo.',
    linkTool: 'Prueba nuestro convertidor gratuito de Markdown a HTML en linea.',
    h2_what: 'Que es Markdown?',
    whatDesc1: '<strong>Markdown</strong> es un lenguaje de marcado ligero creado por John Gruber en 2004. Su objetivo era crear una sintaxis de formato de texto plano facil de leer y escribir, convertible a HTML valido. A diferencia de HTML, Markdown usa caracteres de puntuacion intuitivos para indicar el formato.',
    whatDesc2: 'Desde su creacion, Markdown se ha convertido en el estandar para escribir contenido web. GitHub lo usa para archivos README, Reddit para comentarios, Stack Overflow para preguntas y respuestas. Generadores de sitios estaticos como Hugo, Jekyll y Gatsby procesan archivos Markdown para generar paginas HTML.',
    whatDesc3: 'El atractivo de Markdown reside en su simplicidad y portabilidad. Un archivo <code>.md</code> es texto plano, compatible con cualquier editor y sistema operativo.',
    h2_syntax: 'Referencia de sintaxis Markdown',
    syntaxDesc: 'Comprender la sintaxis de Markdown es el primer paso para una conversion efectiva:',
    syntaxHeadings: '<strong>Encabezados</strong>: Use <code>#</code> a <code>######</code> para los niveles 1 a 6.',
    syntaxEmphasis: '<strong>Negrita y cursiva</strong>: Asteriscos simples para cursiva, dobles para negrita, triples para negrita cursiva.',
    syntaxLinks: '<strong>Enlaces e imagenes</strong>: <code>[texto](url)</code> para enlaces, <code>![alt](url)</code> para imagenes.',
    syntaxCode: '<strong>Codigo</strong>: Backticks simples para codigo en linea, triples backticks para bloques de codigo.',
    syntaxLists: '<strong>Listas</strong>: <code>-</code>, <code>*</code> o <code>+</code> para listas no ordenadas, numeros para ordenadas.',
    syntaxBlockquotes: '<strong>Citas</strong>: Prefije las lineas con <code>&gt;</code> para crear bloques de cita.',
    syntaxTables: '<strong>Tablas</strong>: Use pipes (<code>|</code>) y guiones (<code>-</code>) para crear tablas.',
    syntaxHr: '<strong>Lineas horizontales</strong>: Tres guiones (<code>---</code>), asteriscos (<code>***</code>) o guiones bajos (<code>___</code>).',
    syntaxTaskList: '<strong>Listas de tareas</strong>: <code>- [ ]</code> para no marcado, <code>- [x]</code> para marcado.',
    h2_howWorks: 'Como funciona la conversion de Markdown a HTML',
    howWorksDesc1: 'Un parser de Markdown transforma texto plano en HTML mediante un pipeline de tres fases principales:',
    howWorksDesc2: '<strong>Fase 1 - Tokenizacion</strong>: El parser lee la cadena Markdown y la descompone en un flujo de tokens.',
    howWorksDesc3: '<strong>Fase 2 - Construccion del AST</strong>: El flujo de tokens se organiza en un arbol de sintaxis abstracta.',
    howWorksDesc4: '<strong>Fase 3 - Renderizado HTML</strong>: El AST se recorre y cada nodo se convierte al elemento HTML correspondiente.',
    howWorksDesc5: 'La especificacion <strong>CommonMark</strong> proporciona una definicion rigurosa de la sintaxis Markdown con mas de 600 ejemplos.',
    h2_codeExamples: 'Ejemplos de codigo: Markdown a HTML',
    codeJsTitle: 'JavaScript / Node.js (marked, markdown-it, showdown, remark)',
    codeJsDesc: 'JavaScript ofrece el ecosistema mas rico para la conversion de Markdown a HTML:',
    codePyTitle: 'Python (markdown, mistune, markdown2)',
    codePyDesc: 'Python ofrece varias excelentes bibliotecas para convertir Markdown a HTML:',
    codeBashTitle: 'Bash / CLI (pandoc, cmark, grip)',
    codeBashDesc: 'Las herramientas de linea de comandos permiten convertir Markdown a HTML directamente desde el terminal:',
    codeReactTitle: 'React / Next.js (react-markdown, MDX, rehype)',
    codeReactDesc: 'En React y Next.js, la conversion se realiza a nivel de componentes:',
    h2_gfm: 'GitHub Flavored Markdown (GFM)',
    gfmDesc1: '<strong>GitHub Flavored Markdown (GFM)</strong> es un superconjunto de CommonMark desarrollado por GitHub con funciones esenciales para el desarrollo de software.',
    gfmDesc2: '<strong>Tablas</strong>: Las tablas GFM soportan alineacion de columnas con dos puntos.',
    gfmDesc3: '<strong>Listas de tareas</strong>: Las casillas se renderizan en issues y PRs de GitHub.',
    gfmDesc4: '<strong>Tachado</strong>: Doble tilde (<code>~~eliminado~~</code>) renderiza texto tachado con <code>&lt;del&gt;</code>.',
    gfmDesc5: '<strong>Enlaces automaticos</strong>: GFM convierte automaticamente URLs en enlaces clicables.',
    gfmDesc6: '<strong>Notas al pie y alertas</strong>: GFM extendido soporta notas al pie y bloques de alerta.',
    h2_advanced: 'Funciones avanzadas de Markdown',
    advancedDesc1: 'El ecosistema Markdown soporta muchas funciones avanzadas a traves de extensiones y plugins:',
    advancedDesc2: '<strong>Contenedores personalizados</strong>: markdown-it-container y remark-directive permiten definir elementos de bloque personalizados.',
    advancedDesc3: '<strong>Notacion matematica (KaTeX / MathJax)</strong>: Renderizado matematico para documentacion cientifica.',
    advancedDesc4: '<strong>Diagramas con Mermaid</strong>: Mermaid genera diagramas a partir de sintaxis textual.',
    advancedDesc5: '<strong>Front Matter</strong>: Metadatos YAML al inicio del archivo almacenan titulo, fecha, autor y etiquetas.',
    advancedDesc6: '<strong>Generacion de tabla de contenidos</strong>: Plugins generan automaticamente una tabla de contenidos a partir de los encabezados.',
    h2_bestPractices: 'Mejores practicas de Markdown',
    bestPracticesDesc: 'Seguir las mejores practicas asegura archivos Markdown consistentes y accesibles:',
    bestPractice1: '<strong>Jerarquia de encabezados consistente</strong>: Comience con un H1 unico y use niveles sucesivos en orden.',
    bestPractice2: '<strong>Texto alternativo descriptivo</strong>: Proporcione siempre texto alternativo significativo para las imagenes.',
    bestPractice3: '<strong>Saltos de linea semanticos</strong>: Corte lineas en los limites de oraciones para diffs mas legibles.',
    bestPractice4: '<strong>Linting con markdownlint</strong>: Use markdownlint para imponer un estilo consistente.',
    bestPractice5: '<strong>Accesibilidad</strong>: Asegure una estructura de encabezados correcta y textos de enlace descriptivos.',
    h2_faq: 'Preguntas frecuentes',
    faq1_q: 'Como convertir Markdown a HTML?',
    faq1_a: 'Use bibliotecas como marked.js, markdown-it o showdown en JavaScript, markdown o mistune en Python, o pandoc en linea de comandos. El proceso implica tokenizacion, construccion de AST y renderizado HTML.',
    faq2_q: 'Cual es la mejor biblioteca de Markdown a HTML?',
    faq2_a: 'markdown-it es la opcion mas popular en JavaScript por su velocidad y ecosistema de plugins. react-markdown es el estandar para React. En Python, mistune es el mas rapido. pandoc es la herramienta universal de linea de comandos.',
    faq3_q: 'Cual es la diferencia entre GFM y CommonMark?',
    faq3_a: 'CommonMark es una especificacion estricta de la sintaxis Markdown original. GFM es un superconjunto que agrega tablas, listas de tareas, tachado y enlaces automaticos. La mayoria de los parsers modernos soportan ambos.',
    conclusion: 'La conversion de Markdown a HTML es una habilidad fundamental. Use nuestra herramienta gratuita para conversion instantanea.',
    linkToolBottom: 'Convierte Markdown a HTML instantaneamente con nuestra herramienta gratuita en linea.',
  },
  ja: {
    intro: '<strong>MarkdownからHTMLへの変換</strong>は、現代のWeb開発において最も重要なワークフローの一つです。何百万もの開発者がMarkdownコンバーターを使用して、軽量なプレーンテキストを構造化されたHTMLに変換しています。ブログ記事やREADMEファイル、ドキュメントサイトの構築まで、このガイドがすべてをカバーします。無料のオンラインツールで、ライブプレビュー付きの即時変換が可能です。',
    linkTool: 'ライブプレビュー付きの無料オンラインMarkdownからHTML変換ツールをお試しください。',
    h2_what: 'Markdownとは？',
    whatDesc1: '<strong>Markdown</strong>は、2004年にJohn Gruberによって作成された軽量マークアップ言語です。読みやすく書きやすいプレーンテキスト書式構文で、有効なHTMLに変換できます。HTMLの冗長な角括弧タグとは異なり、Markdownは直感的な句読点文字を使用します。',
    whatDesc2: 'Markdownは、Webコンテンツ作成のデファクトスタンダードとなりました。GitHubのREADMEファイル、Redditのコメント、Stack Overflowの質問と回答で使用されています。Hugo、Jekyll、Gatsby、AstroなどのSSGがMarkdownファイルからHTMLページを生成します。',
    whatDesc3: 'Markdownの魅力はそのシンプルさと移植性にあります。<code>.md</code>ファイルはプレーンテキストで、あらゆるエディタやOSで使用できます。',
    h2_syntax: 'Markdown構文リファレンス',
    syntaxDesc: 'Markdown構文の理解は、効果的な変換への第一歩です：',
    syntaxHeadings: '<strong>見出し</strong>：<code>#</code>から<code>######</code>でレベル1から6を表します。',
    syntaxEmphasis: '<strong>太字と斜体</strong>：アスタリスク1つで斜体、2つで太字、3つで太字斜体。',
    syntaxLinks: '<strong>リンクと画像</strong>：<code>[テキスト](URL)</code>でリンク、<code>![代替テキスト](URL)</code>で画像。',
    syntaxCode: '<strong>コード</strong>：バッククォート1つでインラインコード、3つでコードブロック。',
    syntaxLists: '<strong>リスト</strong>：<code>-</code>、<code>*</code>、<code>+</code>で順序なしリスト、番号で順序付きリスト。',
    syntaxBlockquotes: '<strong>引用</strong>：行頭に<code>&gt;</code>を付けて引用ブロックを作成。',
    syntaxTables: '<strong>テーブル</strong>：パイプ（<code>|</code>）とハイフン（<code>-</code>）でテーブルを作成。',
    syntaxHr: '<strong>水平線</strong>：ハイフン3つ（<code>---</code>）、アスタリスク（<code>***</code>）、アンダースコア（<code>___</code>）。',
    syntaxTaskList: '<strong>タスクリスト</strong>：<code>- [ ]</code>で未チェック、<code>- [x]</code>でチェック済み。',
    h2_howWorks: 'MarkdownからHTMLへの変換の仕組み',
    howWorksDesc1: 'Markdownパーサーは、3つの主要フェーズからなるマルチステージパイプラインでプレーンテキストをHTMLに変換します：',
    howWorksDesc2: '<strong>フェーズ1 - トークン化</strong>：パーサーがMarkdown文字列を読み取り、トークンストリームに分解します。',
    howWorksDesc3: '<strong>フェーズ2 - AST構築</strong>：トークンストリームが抽象構文木に組織化されます。',
    howWorksDesc4: '<strong>フェーズ3 - HTMLレンダリング</strong>：ASTを走査し、各ノードを対応するHTML要素に変換します。',
    howWorksDesc5: '<strong>CommonMark仕様</strong>は、600以上の例を含むMarkdown構文の厳密な定義を提供します。',
    h2_codeExamples: 'コード例：MarkdownからHTML',
    codeJsTitle: 'JavaScript / Node.js（marked、markdown-it、showdown、remark）',
    codeJsDesc: 'JavaScriptはMarkdownからHTMLへの変換で最も豊かなエコシステムを提供します：',
    codePyTitle: 'Python（markdown、mistune、markdown2）',
    codePyDesc: 'PythonにはMarkdownからHTMLへの変換用の優れたライブラリが複数あります：',
    codeBashTitle: 'Bash / CLI（pandoc、cmark、grip）',
    codeBashDesc: 'コマンドラインツールでターミナルから直接MarkdownをHTMLに変換できます：',
    codeReactTitle: 'React / Next.js（react-markdown、MDX、rehype）',
    codeReactDesc: 'ReactとNext.jsでは、変換はコンポーネントレベルで行われます：',
    h2_gfm: 'GitHub Flavored Markdown（GFM）',
    gfmDesc1: '<strong>GitHub Flavored Markdown（GFM）</strong>はGitHubが開発したCommonMarkのスーパーセットで、ソフトウェア開発に必要な機能を追加します。',
    gfmDesc2: '<strong>テーブル</strong>：GFMテーブルはコロンによる列の配置をサポートします。',
    gfmDesc3: '<strong>タスクリスト</strong>：GitHubのIssueやPRでチェックボックスとしてレンダリングされます。',
    gfmDesc4: '<strong>取り消し線</strong>：二重チルダ（<code>~~削除~~</code>）で<code>&lt;del&gt;</code>タグを使用。',
    gfmDesc5: '<strong>オートリンク</strong>：GFMはURLを自動的にクリック可能なリンクに変換します。',
    gfmDesc6: '<strong>脚注とアラート</strong>：拡張GFMは脚注とアラートブロックをサポートします。',
    h2_advanced: '高度なMarkdown機能',
    advancedDesc1: 'Markdownエコシステムは拡張とプラグインを通じて多くの高度な機能をサポートします：',
    advancedDesc2: '<strong>カスタムコンテナ</strong>：markdown-it-containerやremark-directiveでカスタムブロック要素を定義できます。',
    advancedDesc3: '<strong>数式表記（KaTeX / MathJax）</strong>：科学技術文書に不可欠な数式レンダリング。',
    advancedDesc4: '<strong>Mermaidによるダイアグラム</strong>：テキスト構文からダイアグラムを生成。',
    advancedDesc5: '<strong>フロントマター</strong>：YAMLメタデータでタイトル、日付、著者、タグを格納。',
    advancedDesc6: '<strong>目次生成</strong>：プラグインが見出しから自動的に目次を生成します。',
    h2_bestPractices: 'Markdownのベストプラクティス',
    bestPracticesDesc: 'ベストプラクティスに従うことで、一貫性がありアクセシブルなMarkdownファイルを確保します：',
    bestPractice1: '<strong>一貫した見出し階層</strong>：H1から始め、後続のレベルを順番に使用してください。',
    bestPractice2: '<strong>画像の説明的な代替テキスト</strong>：常に意味のある代替テキストを提供してください。',
    bestPractice3: '<strong>セマンティック改行</strong>：文の境界で改行し、差分を読みやすくします。',
    bestPractice4: '<strong>markdownlintによるリント</strong>：markdownlintで一貫したスタイルを強制します。',
    bestPractice5: '<strong>アクセシビリティ</strong>：正しい見出し構造と説明的なリンクテキストを確保してください。',
    h2_faq: 'よくある質問',
    faq1_q: 'MarkdownをHTMLに変換するには？',
    faq1_a: 'JavaScriptではmarked.js、markdown-it、showdown、Pythonではmarkdownやmistune、コマンドラインではpandocやcmarkを使用します。変換プロセスはトークン化、AST構築、HTMLレンダリングで構成されます。',
    faq2_q: '最良のMarkdownからHTMLへのライブラリは？',
    faq2_a: 'JavaScriptではmarkdown-itが速度とプラグインエコシステムで最も人気。Reactではreact-markdownが標準。Pythonではmistuneが最速。pandocは万能なコマンドラインツールです。',
    faq3_q: 'GFMとCommonMarkの違いは？',
    faq3_a: 'CommonMarkはオリジナルのMarkdown構文の厳密な仕様です。GFMはテーブル、タスクリスト、取り消し線、オートリンクを追加したスーパーセットです。ほとんどのモダンパーサーが両方をサポートしています。',
    conclusion: 'MarkdownからHTMLへの変換はすべてのWeb開発者にとって基本的なスキルです。無料オンラインツールで即座に変換できます。',
    linkToolBottom: '無料オンラインツールでMarkdownをHTMLに即座に変換。',
  },
  ko: {
    intro: '<strong>Markdown에서 HTML로의 변환</strong>은 현대 웹 개발에서 가장 중요한 워크플로우 중 하나입니다. 수백만 명의 개발자가 Markdown 변환기를 사용하여 경량 일반 텍스트를 구조화된 HTML로 변환합니다. 블로그 포스트, README 파일, 문서 사이트 구축까지 이 가이드가 모든 것을 다룹니다. 무료 온라인 도구로 라이브 미리보기와 함께 즉시 변환할 수 있습니다.',
    linkTool: '라이브 미리보기가 포함된 무료 온라인 Markdown에서 HTML 변환 도구를 사용해 보세요.',
    h2_what: 'Markdown이란?',
    whatDesc1: '<strong>Markdown</strong>은 2004년 John Gruber가 만든 경량 마크업 언어입니다. 읽고 쓰기 쉬운 일반 텍스트 서식 구문으로, 유효한 HTML로 변환할 수 있습니다. HTML의 장황한 꺾쇠 태그와 달리 Markdown은 직관적인 구두점 문자를 사용합니다.',
    whatDesc2: 'Markdown은 웹 콘텐츠 작성의 사실상 표준이 되었습니다. GitHub의 README 파일, Reddit의 댓글, Stack Overflow의 질문과 답변에서 사용됩니다. Hugo, Jekyll, Gatsby, Astro 같은 정적 사이트 생성기가 Markdown 파일로 HTML 페이지를 생성합니다.',
    whatDesc3: 'Markdown의 매력은 단순성과 이식성에 있습니다. <code>.md</code> 파일은 일반 텍스트로, 모든 에디터와 OS에서 사용할 수 있습니다.',
    h2_syntax: 'Markdown 구문 참조',
    syntaxDesc: 'Markdown 구문을 이해하는 것이 효과적인 변환의 첫 번째 단계입니다:',
    syntaxHeadings: '<strong>제목</strong>: <code>#</code>에서 <code>######</code>까지 레벨 1부터 6까지 나타냅니다.',
    syntaxEmphasis: '<strong>굵게와 기울임</strong>: 별표 1개로 기울임, 2개로 굵게, 3개로 굵은 기울임체.',
    syntaxLinks: '<strong>링크와 이미지</strong>: <code>[텍스트](URL)</code>로 링크, <code>![대체텍스트](URL)</code>로 이미지.',
    syntaxCode: '<strong>코드</strong>: 백틱 1개로 인라인 코드, 3개로 코드 블록.',
    syntaxLists: '<strong>목록</strong>: <code>-</code>, <code>*</code>, <code>+</code>로 순서 없는 목록, 숫자로 순서 있는 목록.',
    syntaxBlockquotes: '<strong>인용</strong>: 줄 앞에 <code>&gt;</code>를 붙여 인용 블록 생성.',
    syntaxTables: '<strong>테이블</strong>: 파이프(<code>|</code>)와 하이픈(<code>-</code>)으로 테이블 생성.',
    syntaxHr: '<strong>수평선</strong>: 하이픈 3개(<code>---</code>), 별표(<code>***</code>), 밑줄(<code>___</code>).',
    syntaxTaskList: '<strong>작업 목록</strong>: <code>- [ ]</code>로 미체크, <code>- [x]</code>로 체크.',
    h2_howWorks: 'Markdown에서 HTML로의 변환 원리',
    howWorksDesc1: 'Markdown 파서는 3가지 주요 단계의 파이프라인을 통해 일반 텍스트를 HTML로 변환합니다:',
    howWorksDesc2: '<strong>1단계 - 토큰화</strong>: 파서가 Markdown 문자열을 읽고 토큰 스트림으로 분해합니다.',
    howWorksDesc3: '<strong>2단계 - AST 구축</strong>: 토큰 스트림이 추상 구문 트리로 조직됩니다.',
    howWorksDesc4: '<strong>3단계 - HTML 렌더링</strong>: AST를 순회하며 각 노드를 해당 HTML 요소로 변환합니다.',
    howWorksDesc5: '<strong>CommonMark 사양</strong>은 600개 이상의 예제와 함께 Markdown 구문의 엄격한 정의를 제공합니다.',
    h2_codeExamples: '코드 예제: Markdown에서 HTML로',
    codeJsTitle: 'JavaScript / Node.js (marked, markdown-it, showdown, remark)',
    codeJsDesc: 'JavaScript는 Markdown에서 HTML로의 변환에 가장 풍부한 에코시스템을 제공합니다:',
    codePyTitle: 'Python (markdown, mistune, markdown2)',
    codePyDesc: 'Python에는 Markdown에서 HTML로 변환하기 위한 우수한 라이브러리가 여러 개 있습니다:',
    codeBashTitle: 'Bash / CLI (pandoc, cmark, grip)',
    codeBashDesc: '커맨드라인 도구로 터미널에서 직접 Markdown을 HTML로 변환할 수 있습니다:',
    codeReactTitle: 'React / Next.js (react-markdown, MDX, rehype)',
    codeReactDesc: 'React와 Next.js에서는 컴포넌트 레벨에서 변환이 이루어집니다:',
    h2_gfm: 'GitHub Flavored Markdown (GFM)',
    gfmDesc1: '<strong>GitHub Flavored Markdown (GFM)</strong>은 GitHub이 개발한 CommonMark의 상위 집합으로, 소프트웨어 개발에 필수적인 기능을 추가합니다.',
    gfmDesc2: '<strong>테이블</strong>: GFM 테이블은 콜론으로 열 정렬을 지원합니다.',
    gfmDesc3: '<strong>작업 목록</strong>: GitHub Issue와 PR에서 체크박스로 렌더링됩니다.',
    gfmDesc4: '<strong>취소선</strong>: 이중 물결표(<code>~~삭제~~</code>)로 <code>&lt;del&gt;</code> 태그를 사용한 취소선.',
    gfmDesc5: '<strong>자동 링크</strong>: GFM은 URL을 자동으로 클릭 가능한 링크로 변환합니다.',
    gfmDesc6: '<strong>각주와 알림</strong>: 확장 GFM은 각주와 알림 블록을 지원합니다.',
    h2_advanced: '고급 Markdown 기능',
    advancedDesc1: 'Markdown 에코시스템은 확장과 플러그인을 통해 많은 고급 기능을 지원합니다:',
    advancedDesc2: '<strong>사용자 정의 컨테이너</strong>: markdown-it-container와 remark-directive로 사용자 정의 블록 요소를 정의할 수 있습니다.',
    advancedDesc3: '<strong>수학 표기법 (KaTeX / MathJax)</strong>: 과학 기술 문서에 필수적인 수학 렌더링.',
    advancedDesc4: '<strong>Mermaid 다이어그램</strong>: 텍스트 구문에서 다이어그램을 생성합니다.',
    advancedDesc5: '<strong>프론트 매터</strong>: YAML 메타데이터로 제목, 날짜, 저자, 태그를 저장합니다.',
    advancedDesc6: '<strong>목차 생성</strong>: 플러그인이 제목에서 자동으로 목차를 생성합니다.',
    h2_bestPractices: 'Markdown 모범 사례',
    bestPracticesDesc: '모범 사례를 따르면 일관성 있고 접근 가능한 Markdown 파일을 보장합니다:',
    bestPractice1: '<strong>일관된 제목 계층</strong>: H1부터 시작하여 순서대로 사용하세요.',
    bestPractice2: '<strong>설명적인 대체 텍스트</strong>: 이미지에 항상 의미 있는 대체 텍스트를 제공하세요.',
    bestPractice3: '<strong>의미론적 줄바꿈</strong>: 문장 경계에서 줄바꿈하여 diff를 읽기 쉽게 만드세요.',
    bestPractice4: '<strong>markdownlint로 린트</strong>: markdownlint로 일관된 스타일을 강제하세요.',
    bestPractice5: '<strong>접근성</strong>: 올바른 제목 구조와 설명적인 링크 텍스트를 보장하세요.',
    h2_faq: '자주 묻는 질문',
    faq1_q: 'Markdown을 HTML로 변환하는 방법은?',
    faq1_a: 'JavaScript에서는 marked.js, markdown-it, showdown, Python에서는 markdown이나 mistune, 커맨드라인에서는 pandoc이나 cmark을 사용합니다. 변환 과정은 토큰화, AST 구축, HTML 렌더링으로 구성됩니다.',
    faq2_q: '가장 좋은 Markdown에서 HTML로의 라이브러리는?',
    faq2_a: 'JavaScript에서는 markdown-it이 속도와 플러그인 에코시스템으로 가장 인기. React에서는 react-markdown이 표준. Python에서는 mistune이 가장 빠름. pandoc은 만능 커맨드라인 도구입니다.',
    faq3_q: 'GFM과 CommonMark의 차이점은?',
    faq3_a: 'CommonMark은 원래 Markdown 구문의 엄격한 사양입니다. GFM은 테이블, 작업 목록, 취소선, 자동 링크를 추가한 상위 집합입니다. 대부분의 최신 파서가 둘 다 지원합니다.',
    conclusion: 'Markdown에서 HTML로의 변환은 모든 웹 개발자에게 필수적인 기술입니다. 무료 온라인 도구로 즉시 변환하세요.',
    linkToolBottom: '무료 온라인 도구로 Markdown을 HTML로 즉시 변환하세요.',
  },
};

export default function MarkdownToHtmlConverterGuide({ lang }: { lang: string }) {
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
      <p><Link href={`/${lang}/tools/markdown-to-html`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>

      {/* Section 1: What is Markdown? */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.whatDesc3 }} />

      {/* Section 2: Markdown Syntax Reference */}
      <h2>{s.h2_syntax}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.syntaxDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxHeadings }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxEmphasis }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxLinks }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxCode }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxLists }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxBlockquotes }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxTables }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxHr }} />
      <p dangerouslySetInnerHTML={{ __html: s.syntaxTaskList }} />

      {/* Section 3: How Markdown to HTML Conversion Works */}
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
      <pre><code>{`// ===== marked.js (fast, lightweight) =====
import { marked } from 'marked';

const markdown = '# Hello World\\n\\nThis is **bold** and *italic*.';
const html = marked(markdown);
// <h1>Hello World</h1>
// <p>This is <strong>bold</strong> and <em>italic</em>.</p>

// Configure marked options
marked.setOptions({
  gfm: true,          // GitHub Flavored Markdown
  breaks: true,       // Convert \\n to <br>
  pedantic: false,     // Conform to CommonMark
  sanitize: false,     // Use DOMPurify instead
});

// ===== markdown-it (extensible, plugin-based) =====
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItToc from 'markdown-it-toc-done-right';

const md = new MarkdownIt({
  html: true,          // Allow HTML tags in source
  linkify: true,       // Auto-convert URLs to links
  typographer: true,   // Smart quotes, dashes
})
  .use(markdownItAnchor)   // Add anchors to headings
  .use(markdownItToc);     // Generate table of contents

const result = md.render('# Hello\\n\\n\${toc}\\n\\n## Section 1\\n\\nContent here.');

// ===== showdown (browser + Node.js) =====
import showdown from 'showdown';

const converter = new showdown.Converter({
  tables: true,
  tasklists: true,
  strikethrough: true,
  ghCodeBlocks: true,
});
const htmlOutput = converter.makeHtml('## Hello\\n\\n- [x] Task done');

// ===== unified / remark ecosystem (AST-based) =====
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrism from 'rehype-prism-plus';

const file = await unified()
  .use(remarkParse)         // Parse Markdown to mdast
  .use(remarkGfm)           // Support GFM (tables, etc.)
  .use(remarkRehype)        // Transform mdast to hast
  .use(rehypePrism)         // Syntax highlighting
  .use(rehypeStringify)     // Serialize hast to HTML
  .process('# Hello **World**');

console.log(String(file));
// <h1>Hello <strong>World</strong></h1>`}</code></pre>

      <h3>{s.codePyTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codePyDesc }} />
      <pre><code>{`# ===== markdown library (standard, extensible) =====
import markdown

# Basic conversion
md_text = "# Hello World\\n\\nThis is **bold** text."
html = markdown.markdown(md_text)
# <h1>Hello World</h1>
# <p>This is <strong>bold</strong> text.</p>

# With extensions
html = markdown.markdown(md_text, extensions=[
    'tables',           # GFM-style tables
    'fenced_code',      # Fenced code blocks
    'codehilite',       # Syntax highlighting (requires Pygments)
    'toc',              # Table of contents
    'footnotes',        # Footnote support
    'attr_list',        # Attribute lists for styling
    'md_in_html',       # Markdown inside HTML blocks
])

# ===== mistune (fastest Python Markdown parser) =====
import mistune

# Basic usage
html = mistune.html(md_text)

# Custom renderer for advanced control
renderer = mistune.create_markdown(
    escape=False,
    plugins=['table', 'footnotes', 'strikethrough', 'task_lists']
)
html = renderer(md_text)

# ===== markdown2 (simple API, many extras) =====
import markdown2

html = markdown2.markdown(md_text, extras=[
    "fenced-code-blocks",
    "tables",
    "strike",
    "task_list",
    "code-friendly",
    "cuddled-lists",
    "header-ids",
    "metadata",
])

# Convert a file
with open("README.md", "r") as f:
    html = markdown2.markdown(f.read(), extras=["fenced-code-blocks"])

# Python-Markdown extension: convert file to HTML file
import markdown
md = markdown.Markdown(extensions=['meta', 'toc'])
md.convertFile(input='doc.md', output='doc.html')`}</code></pre>

      <h3>{s.codeBashTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeBashDesc }} />
      <pre><code>{`# ===== pandoc (universal document converter) =====
# Basic Markdown to HTML
pandoc README.md -o output.html

# With standalone HTML (includes <head>, <body>)
pandoc README.md -s -o output.html

# With table of contents and syntax highlighting
pandoc README.md -s --toc --highlight-style=tango -o output.html

# GFM input format
pandoc -f gfm -t html README.md -o output.html

# With custom CSS
pandoc README.md -s --css=style.css -o output.html

# Convert multiple files
pandoc ch1.md ch2.md ch3.md -s --toc -o book.html

# ===== cmark (reference CommonMark implementation) =====
# Basic conversion
cmark README.md > output.html

# With smart typography (quotes, dashes)
cmark --smart README.md > output.html

# GFM extensions (cmark-gfm)
cmark-gfm -e table -e strikethrough -e tasklist README.md

# ===== grip (GitHub-flavored preview) =====
# Preview README in browser (uses GitHub API)
grip README.md

# Export to HTML file
grip README.md --export output.html

# Preview on specific port
grip README.md 0.0.0.0:8080

# ===== Simple pipe conversion with Node.js =====
echo "# Hello **World**" | npx marked
# <h1>Hello <strong>World</strong></h1>

cat README.md | npx marked > output.html`}</code></pre>

      <h3>{s.codeReactTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: s.codeReactDesc }} />
      <pre><code>{`// ===== react-markdown (React component) =====
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

function MarkdownPreview({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Custom component overrides
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        a: ({ href, children }) => (
          <a href={href} className="text-blue-600 hover:underline"
             target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          return isInline
            ? <code className="bg-gray-100 px-1 rounded">{children}</code>
            : <code className={className} {...props}>{children}</code>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ===== MDX (Markdown + JSX) in Next.js =====
// next.config.js
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});

// app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPost({ params }) {
  const source = await getMarkdownContent(params.slug);
  return <MDXRemote source={source} />;
}

// ===== Syntax highlighting with Shiki =====
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

const html = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeShiki, { theme: 'github-dark' })
  .use(rehypeStringify)
  .process(markdownContent);`}</code></pre>

      {/* Section 5: GitHub Flavored Markdown */}
      <h2>{s.h2_gfm}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.gfmDesc6 }} />

      <pre><code>{`<!-- GFM Examples and their HTML output -->

<!-- Table with alignment -->
| Feature       | CommonMark | GFM   |
|:--------------|:----------:|------:|
| Tables        |     No     |  Yes  |
| Task Lists    |     No     |  Yes  |
| Strikethrough |     No     |  Yes  |
| Autolinks     |     No     |  Yes  |

<!-- Converts to: -->
<table>
  <thead>
    <tr>
      <th style="text-align:left">Feature</th>
      <th style="text-align:center">CommonMark</th>
      <th style="text-align:right">GFM</th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>

<!-- Task list -->
- [x] Write the documentation
- [x] Add code examples
- [ ] Publish the article

<!-- Strikethrough -->
~~This text is deleted~~

<!-- Autolink -->
Visit https://example.com for details.

<!-- Footnote -->
Here is a statement[^1] with a footnote.
[^1]: This is the footnote content.

<!-- Alert blocks (GitHub-specific) -->
> [!NOTE]
> This is a note callout.

> [!WARNING]
> This is a warning callout.`}</code></pre>

      {/* Section 6: Advanced Markdown Features */}
      <h2>{s.h2_advanced}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc5 }} />
      <p dangerouslySetInnerHTML={{ __html: s.advancedDesc6 }} />

      <pre><code>{`<!-- Custom container (markdown-it-container) -->
::: warning
This is a warning message. Be careful!
:::

<!-- Renders as: -->
<div class="warning">
  <p>This is a warning message. Be careful!</p>
</div>

<!-- Math with KaTeX -->
Inline math: $E = mc^2$
Display math:
$$
\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{2}
$$

<!-- Mermaid diagram -->
\`\`\`mermaid
graph TD
    A[Markdown Source] --> B[Tokenizer]
    B --> C[AST Builder]
    C --> D[HTML Renderer]
    D --> E[HTML Output]
\`\`\`

<!-- Front matter (YAML) -->
---
title: "My Blog Post"
date: 2024-01-15
author: "John Doe"
tags: [markdown, html, tutorial]
---

# My Blog Post
Content starts here...

<!-- Table of contents (remark-toc) -->
## Table of Contents

<!-- Auto-generated from headings -->
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Advanced Usage](#advanced-usage)`}</code></pre>

      {/* Section 7: Markdown Best Practices */}
      <h2>{s.h2_bestPractices}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.bestPracticesDesc }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice1 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice2 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice3 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice4 }} />
      <p dangerouslySetInnerHTML={{ __html: s.bestPractice5 }} />

      <p>
        {lang === 'en' && <>See also our <Link href={`/${lang}/tools/html-to-markdown`}>HTML to Markdown converter</Link> for the reverse conversion, and our <Link href={`/${lang}/tools/word-counter`}>Word Counter</Link> to check your content length.</>}
        {lang === 'zh' && <>另请参阅我们的 <Link href={`/${lang}/tools/html-to-markdown`}>HTML 转 Markdown 转换器</Link>进行反向转换，以及 <Link href={`/${lang}/tools/word-counter`}>字数统计工具</Link>检查内容长度。</>}
        {lang === 'fr' && <>Voir aussi notre <Link href={`/${lang}/tools/html-to-markdown`}>convertisseur HTML vers Markdown</Link> et notre <Link href={`/${lang}/tools/word-counter`}>compteur de mots</Link>.</>}
        {lang === 'de' && <>Siehe auch unseren <Link href={`/${lang}/tools/html-to-markdown`}>HTML-zu-Markdown-Konverter</Link> und unseren <Link href={`/${lang}/tools/word-counter`}>Wortzahler</Link>.</>}
        {lang === 'es' && <>Vea tambien nuestro <Link href={`/${lang}/tools/html-to-markdown`}>convertidor de HTML a Markdown</Link> y nuestro <Link href={`/${lang}/tools/word-counter`}>contador de palabras</Link>.</>}
        {lang === 'ja' && <>逆変換には<Link href={`/${lang}/tools/html-to-markdown`}>HTMLからMarkdownへの変換ツール</Link>、コンテンツの長さチェックには<Link href={`/${lang}/tools/word-counter`}>文字数カウンター</Link>もご覧ください。</>}
        {lang === 'ko' && <>역변환은 <Link href={`/${lang}/tools/html-to-markdown`}>HTML에서 Markdown으로 변환기</Link>, 콘텐츠 길이 확인은 <Link href={`/${lang}/tools/word-counter`}>단어 수 세기</Link>도 참조하세요.</>}
      </p>

      {/* Section 8: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>

      <h2>{lang === 'en' ? 'Conclusion' : lang === 'zh' ? '总结' : lang === 'fr' ? 'Conclusion' : lang === 'de' ? 'Fazit' : lang === 'es' ? 'Conclusion' : lang === 'ja' ? 'まとめ' : '결론'}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.conclusion }} />
      <p><Link href={`/${lang}/tools/markdown-to-html`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
    </>
  );
}
