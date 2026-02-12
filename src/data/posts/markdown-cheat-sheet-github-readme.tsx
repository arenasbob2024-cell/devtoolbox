'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'Markdown is the universal language of developer documentation. Whether you are writing a <strong>GitHub README</strong>, project wiki, or pull request description, mastering Markdown syntax lets you create professional, readable documentation in minutes. This cheat sheet covers <strong>every Markdown feature GitHub supports</strong> -- from basic formatting to Mermaid diagrams, math equations, and collapsible sections.',
    h2_basic: '1. Basic Syntax: Headings, Bold, Italic, Links, Images',
    p_basic: 'These are the foundational Markdown elements you will use in every document. They work identically across GitHub, GitLab, Bitbucket, and most Markdown renderers.',
    h2_gfm: '2. GitHub Flavored Markdown (GFM)',
    p_gfm: 'GitHub extends standard Markdown with additional features called GitHub Flavored Markdown. These include task lists, strikethrough text, autolinks, and more.',
    h2_tables: '3. Tables: Syntax, Alignment, Multi-Line Cells',
    p_tables: 'Markdown tables are essential for documenting APIs, configuration options, and comparison matrices. GitHub supports column alignment and complex table structures.',
    h2_code: '4. Code Blocks: Language Hints & Diff Syntax Highlighting',
    p_code: 'Code blocks are arguably the most important feature for developer documentation. GitHub supports syntax highlighting for hundreds of languages and a special diff format for showing changes.',
    h2_badges: '5. Badges: shields.io Syntax & Common Badges',
    p_badges: 'Badges provide at-a-glance project status information. They are powered by shields.io and are a staple of professional README files.',
    h2_collapsible: '6. Collapsible Sections: details/summary HTML',
    p_collapsible: 'Collapsible sections keep your README clean by hiding verbose content behind a clickable toggle. GitHub renders the HTML &lt;details&gt; and &lt;summary&gt; elements natively.',
    h2_alerts: '7. Alerts / Callouts: [!NOTE], [!TIP], [!WARNING], [!CAUTION]',
    p_alerts: 'GitHub supports special blockquote-based alerts that render with colored icons. These are perfect for highlighting important information, tips, warnings, and breaking changes.',
    h2_mermaid: '8. Mermaid Diagrams: Flowchart, Sequence, Gantt',
    p_mermaid: 'GitHub natively renders Mermaid diagrams inside fenced code blocks. You can create flowcharts, sequence diagrams, Gantt charts, and more without any external tools.',
    h2_math: '9. Math Equations: $inline$ and $$block$$',
    p_math: 'GitHub supports LaTeX math expressions using dollar-sign delimiters. Use single dollars for inline math and double dollars for block equations.',
    h2_emoji: '10. Emoji: :emoji_name: Shortcodes',
    p_emoji: 'GitHub supports emoji shortcodes that render as emoji in Markdown files, issues, and pull requests. They add visual flair to your documentation.',
    h2_template: '11. README Template',
    p_template: 'A well-structured README is the front door to your project. Here is a complete template you can copy and customize for any repository.',
    h2_faq: '12. Frequently Asked Questions',
    faq1_q: 'What is the difference between Markdown and GitHub Flavored Markdown (GFM)?',
    faq1_a: 'Standard Markdown (CommonMark) defines core syntax like headings, bold, italic, links, and images. GitHub Flavored Markdown extends this with task lists, tables, strikethrough, autolinks, alerts, Mermaid diagrams, and math equations. GFM is a superset -- all standard Markdown works in GFM, but GFM features may not render on other platforms.',
    faq2_q: 'How do I add a table of contents to my GitHub README?',
    faq2_a: 'GitHub automatically generates a table of contents icon in the top-left corner of any Markdown file with multiple headings. For a manual TOC, create a list of links using anchor syntax: [Section Name](#section-name). GitHub auto-generates anchors from heading text by lowercasing and replacing spaces with hyphens.',
    faq3_q: 'Can I use HTML in GitHub Markdown?',
    faq3_a: 'Yes, GitHub supports a subset of HTML in Markdown files. Commonly used elements include &lt;details&gt;/&lt;summary&gt; for collapsible sections, &lt;img&gt; with width/height attributes for sized images, &lt;br&gt; for line breaks, &lt;kbd&gt; for keyboard keys, and &lt;sub&gt;/&lt;sup&gt; for subscript/superscript. However, &lt;script&gt;, &lt;style&gt;, and most event handler attributes are stripped for security.',
    faq4_q: 'How do I display images side by side in a README?',
    faq4_a: 'Use an HTML table with no borders: &lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;img src="img1.png" width="300"&gt;&lt;/td&gt;&lt;td&gt;&lt;img src="img2.png" width="300"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;. Alternatively, use the HTML &lt;p align="center"&gt; wrapper with multiple &lt;img&gt; tags. Standard Markdown does not support side-by-side images natively.',
    faq5_q: 'Why are my Markdown line breaks not showing on GitHub?',
    faq5_a: 'In Markdown, a single newline between lines is treated as a space, not a line break. To create a line break (soft return), end the line with two spaces before pressing Enter, or use an HTML &lt;br&gt; tag. To create a new paragraph, leave a blank line between text blocks. This is one of the most common Markdown gotchas for beginners.',
    p_conclusion: 'Bookmark this cheat sheet and refer back to it whenever you are writing GitHub documentation. With these techniques, your README files will be clear, professional, and informative.',
    source: 'Source',
    renders_as: 'Renders as',
    syntax: 'Syntax',
    result: 'Result',
    badge: 'Badge',
    code: 'Code',
  },
  zh: {
    intro: 'Markdown 是开发者文档的通用语言。无论你在编写 <strong>GitHub README</strong>、项目 Wiki 还是 Pull Request 描述，掌握 Markdown 语法都能让你在几分钟内创建专业、可读的文档。本速查表涵盖了 <strong>GitHub 支持的每一个 Markdown 功能</strong>——从基本格式到 Mermaid 图表、数学公式和可折叠区域。',
    h2_basic: '1. 基础语法：标题、粗体、斜体、链接、图片',
    p_basic: '这些是你在每个文档中都会用到的基础 Markdown 元素。它们在 GitHub、GitLab、Bitbucket 和大多数 Markdown 渲染器中的表现完全一致。',
    h2_gfm: '2. GitHub 风格 Markdown（GFM）',
    p_gfm: 'GitHub 通过称为 GitHub Flavored Markdown 的附加功能扩展了标准 Markdown。包括任务列表、删除线文本、自动链接等。',
    h2_tables: '3. 表格：语法、对齐、多行单元格',
    p_tables: 'Markdown 表格对于文档化 API、配置选项和比较矩阵至关重要。GitHub 支持列对齐和复杂的表格结构。',
    h2_code: '4. 代码块：语言提示和 Diff 语法高亮',
    p_code: '代码块可以说是开发者文档中最重要的功能。GitHub 支持数百种语言的语法高亮，以及用于显示更改的特殊 diff 格式。',
    h2_badges: '5. 徽章：shields.io 语法和常用徽章',
    p_badges: '徽章提供一目了然的项目状态信息。它们由 shields.io 驱动，是专业 README 文件的标配。',
    h2_collapsible: '6. 可折叠区域：details/summary HTML',
    p_collapsible: '可折叠区域通过将冗长内容隐藏在可点击的切换按钮后面来保持 README 整洁。GitHub 原生渲染 &lt;details&gt; 和 &lt;summary&gt; HTML 元素。',
    h2_alerts: '7. 警告提示：[!NOTE]、[!TIP]、[!WARNING]、[!CAUTION]',
    p_alerts: 'GitHub 支持基于引用块的特殊警告提示，会以彩色图标渲染。非常适合突出显示重要信息、提示、警告和破坏性更改。',
    h2_mermaid: '8. Mermaid 图表：流程图、时序图、甘特图',
    p_mermaid: 'GitHub 原生在围栏代码块中渲染 Mermaid 图表。你可以创建流程图、时序图、甘特图等，无需任何外部工具。',
    h2_math: '9. 数学公式：$行内$ 和 $$块级$$',
    p_math: 'GitHub 支持使用美元符号分隔符的 LaTeX 数学表达式。单个美元符号用于行内数学，双美元符号用于块级公式。',
    h2_emoji: '10. 表情符号：:emoji_name: 短代码',
    p_emoji: 'GitHub 支持表情短代码，在 Markdown 文件、Issue 和 Pull Request 中渲染为表情符号，为文档增添视觉趣味。',
    h2_template: '11. README 模板',
    p_template: '一个结构良好的 README 是你项目的门面。这里有一个完整的模板，你可以复制并为任何仓库自定义。',
    h2_faq: '12. 常见问题',
    faq1_q: 'Markdown 和 GitHub Flavored Markdown（GFM）有什么区别？',
    faq1_a: '标准 Markdown（CommonMark）定义了标题、粗体、斜体、链接和图片等核心语法。GitHub Flavored Markdown 在此基础上扩展了任务列表、表格、删除线、自动链接、警告提示、Mermaid 图表和数学公式。GFM 是一个超集——所有标准 Markdown 在 GFM 中都能工作，但 GFM 功能在其他平台上可能无法渲染。',
    faq2_q: '如何在 GitHub README 中添加目录？',
    faq2_a: 'GitHub 会自动在任何包含多个标题的 Markdown 文件左上角生成目录图标。要手动创建目录，使用锚点语法创建链接列表：[章节名称](#section-name)。GitHub 通过将标题文本转为小写并用连字符替换空格来自动生成锚点。',
    faq3_q: '可以在 GitHub Markdown 中使用 HTML 吗？',
    faq3_a: '可以，GitHub 在 Markdown 文件中支持 HTML 的一个子集。常用元素包括用于可折叠区域的 &lt;details&gt;/&lt;summary&gt;、带 width/height 属性的 &lt;img&gt;、用于换行的 &lt;br&gt;、用于键盘按键的 &lt;kbd&gt;、用于上下标的 &lt;sub&gt;/&lt;sup&gt;。但出于安全考虑，&lt;script&gt;、&lt;style&gt; 和大多数事件处理属性会被过滤。',
    faq4_q: '如何在 README 中并排显示图片？',
    faq4_a: '使用无边框的 HTML 表格：&lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;img src="img1.png" width="300"&gt;&lt;/td&gt;&lt;td&gt;&lt;img src="img2.png" width="300"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;。也可以使用 HTML &lt;p align="center"&gt; 包装器配合多个 &lt;img&gt; 标签。标准 Markdown 本身不支持并排图片。',
    faq5_q: '为什么我的 Markdown 换行在 GitHub 上不显示？',
    faq5_a: '在 Markdown 中，行与行之间的单个换行符被视为空格而非换行。要创建换行（软回车），在按 Enter 前在行尾添加两个空格，或使用 HTML &lt;br&gt; 标签。要创建新段落，在文本块之间留一个空行。这是初学者最常遇到的 Markdown 陷阱之一。',
    p_conclusion: '收藏这份速查表，在编写 GitHub 文档时随时查阅。掌握这些技巧，你的 README 文件将清晰、专业且信息丰富。',
    source: '源码',
    renders_as: '渲染效果',
    syntax: '语法',
    result: '结果',
    badge: '徽章',
    code: '代码',
  },
};

export default function MarkdownCheatSheetGithub({ lang }: { lang: string }) {
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
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* ============================================================ */}
      {/* 1. BASIC SYNTAX */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_basic}</h2>
      <p>{t.p_basic}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Headings</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}</code></pre>
      <p>{t.renders_as}: Six levels of headings, from largest (H1) to smallest (H6). Use only one H1 per document (typically your project name).</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Bold & Italic</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`**bold text**
__also bold__

*italic text*
_also italic_

***bold and italic***
___also bold and italic___

~~strikethrough~~`}</code></pre>
      <p>{t.renders_as}: <strong>bold text</strong>, <em>italic text</em>, <strong><em>bold and italic</em></strong>, and <s>strikethrough</s>.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Links</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`[Link text](https://example.com)
[Link with title](https://example.com "Hover title text")
[Relative link](./docs/guide.md)
[Reference-style link][ref-id]
[Section anchor link](#section-name)

<!-- Reference definition (placed anywhere in the doc) -->
[ref-id]: https://example.com "Optional title"`}</code></pre>
      <p>{t.renders_as}: Clickable hyperlinks. Reference-style links let you define URLs once and reuse them. Anchor links jump to headings within the same page.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Images</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`![Alt text](https://example.com/image.png)
![Alt text](./assets/screenshot.png "Optional title")

<!-- Sized image using HTML -->
<img src="https://example.com/logo.png" alt="Logo" width="200">

<!-- Centered image -->
<p align="center">
  <img src="./banner.png" alt="Banner" width="600">
</p>

<!-- Image as a link -->
[![Alt text](image.png)](https://example.com)`}</code></pre>
      <p>{t.renders_as}: Inline images. Use HTML &lt;img&gt; when you need to control width, height, or alignment. Wrap an image in a link to make it clickable.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Lists</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Unordered list -->
- Item one
- Item two
  - Nested item
  - Another nested
- Item three

<!-- Ordered list -->
1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B

<!-- Mixed -->
1. Main item
   - Detail A
   - Detail B
2. Next item`}</code></pre>
      <p>{t.renders_as}: Bulleted and numbered lists. Indent with 2-4 spaces to create nested levels. You can mix ordered and unordered lists.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Blockquotes</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes work too.`}</code></pre>
      <p>{t.renders_as}: Indented text blocks with a left border, commonly used for quoting text or adding contextual notes.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Horizontal Rules</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`---
***
___`}</code></pre>
      <p>{t.renders_as}: A horizontal divider line. All three syntaxes produce identical output. Use them to separate major sections.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Inline Code</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`Use \`npm install\` to install dependencies.

To escape backticks inside inline code, use double backticks:
\`\`Use \`code\` here\`\``}</code></pre>
      <p>{t.renders_as}: Monospaced text like <code>npm install</code>. Perfect for referencing commands, variables, filenames, and short code snippets within paragraphs.</p>

      {/* ============================================================ */}
      {/* 2. GITHUB FLAVORED MARKDOWN */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_gfm}</h2>
      <p>{t.p_gfm}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Task Lists (Checkboxes)</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`- [x] Design the database schema
- [x] Implement REST API endpoints
- [ ] Write unit tests
- [ ] Deploy to production
- [ ] Update documentation`}</code></pre>
      <p>{t.renders_as}: Interactive checkboxes. Checked items show a filled checkbox, unchecked items show an empty one. In GitHub Issues and PRs, these are clickable to toggle state.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Strikethrough</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`~~This text is struck through~~
~~Deprecated: Use newFunction() instead~~`}</code></pre>
      <p>{t.renders_as}: <s>This text is struck through</s>. Useful for marking deprecated information or crossed-out items.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Autolinks</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`https://github.com
user@example.com
#123          (links to issue/PR #123)
@username     (mentions a GitHub user)
SHA: a1b2c3d  (links to a commit if valid)`}</code></pre>
      <p>{t.renders_as}: GitHub automatically converts URLs, email addresses, issue numbers, @mentions, and commit SHAs into clickable links. No special syntax needed.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Footnotes</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`This claim needs a source[^1]. Another reference here[^note].

[^1]: Source: https://example.com/research
[^note]: This is a longer footnote with multiple paragraphs.

    Indent subsequent paragraphs with 4 spaces.`}</code></pre>
      <p>{t.renders_as}: Superscript numbers that link to footnote definitions at the bottom of the page. Great for citations and additional context without cluttering the main text.</p>

      {/* ============================================================ */}
      {/* 3. TABLES */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_tables}</h2>
      <p>{t.p_tables}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Basic Table</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`| Feature       | Free Plan | Pro Plan | Enterprise |
|---------------|-----------|----------|------------|
| Users         | 5         | 50       | Unlimited  |
| Storage       | 1 GB      | 100 GB   | 1 TB       |
| Support       | Community | Email    | 24/7 Phone |
| Custom domain | No        | Yes      | Yes        |`}</code></pre>
      <p>{t.renders_as}: A formatted table with a header row and data rows. Columns are separated by pipes (|) and the header is separated from data by a row of dashes.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Column Alignment</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|--------------:|
| Left         |    Center      |         Right |
| Text         |    Text        |          Text |
| Data         |    Data        |          Data |`}</code></pre>
      <p>{t.renders_as}: Columns aligned left (default), center, or right. Add colons to the separator row: <code>:---</code> for left, <code>:---:</code> for center, <code>---:</code> for right.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Tables with Formatting</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`| Method   | Endpoint          | Description              |
|----------|-------------------|--------------------------|
| \`GET\`    | \`/api/users\`      | **List** all users       |
| \`POST\`   | \`/api/users\`      | **Create** a new user    |
| \`GET\`    | \`/api/users/:id\`  | Get user by *ID*         |
| \`PUT\`    | \`/api/users/:id\`  | **Update** user          |
| \`DELETE\` | \`/api/users/:id\`  | ~~Remove~~ **Delete** user |`}</code></pre>
      <p>{t.renders_as}: Tables support inline formatting inside cells -- bold, italic, code, strikethrough, and links all work inside table cells.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Multi-Line Cells (HTML)</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<table>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
<tr>
<td>

\`\`\`bash
npm install
\`\`\`

</td>
<td>

Install all dependencies from **package.json**.
Runs \`preinstall\` and \`postinstall\` scripts.

</td>
</tr>
<tr>
<td>

\`\`\`bash
npm run build
\`\`\`

</td>
<td>

Build the project for production.
Output goes to the \`dist/\` directory.

</td>
</tr>
</table>`}</code></pre>
      <p>{t.renders_as}: HTML tables allow multi-line content, code blocks, and complex formatting inside cells that pure Markdown tables cannot handle.</p>

      {/* ============================================================ */}
      {/* 4. CODE BLOCKS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_code}</h2>
      <p>{t.p_code}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Fenced Code Blocks with Language</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

\`\`\`bash
#!/bin/bash
echo "Installing dependencies..."
npm install
npm run build
\`\`\``}</code></pre>
      <p>{t.renders_as}: Syntax-highlighted code blocks. Add the language identifier after the opening triple backticks. GitHub supports 200+ languages including javascript, python, bash, typescript, go, rust, java, c, cpp, csharp, ruby, php, swift, kotlin, sql, yaml, json, html, css, and more.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Diff Syntax Highlighting</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`diff
- const API_URL = 'http://localhost:3000';
+ const API_URL = process.env.API_URL || 'https://api.example.com';

  function fetchData() {
-   return fetch(API_URL + '/data');
+   return fetch(API_URL + '/v2/data', {
+     headers: { 'Authorization': 'Bearer ' + token }
+   });
  }
\`\`\``}</code></pre>
      <p>{t.renders_as}: Lines starting with <code>-</code> are highlighted in red (removed), lines starting with <code>+</code> are highlighted in green (added), and unchanged lines have no highlight. Perfect for showing code changes in documentation.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Code Block with Filename</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`> **\`src/config.ts\`**

\`\`\`typescript
export const config = {
  port: parseInt(process.env.PORT || '3000'),
  database: process.env.DATABASE_URL,
  redis: process.env.REDIS_URL,
};
\`\`\``}</code></pre>
      <p>{t.renders_as}: While Markdown does not natively support filenames on code blocks, you can use a bold inline code heading right above the block to simulate this common pattern.</p>

      {/* ============================================================ */}
      {/* 5. BADGES */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_badges}</h2>
      <p>{t.p_badges}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">shields.io Basic Syntax</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Static badge -->
![Static Badge](https://img.shields.io/badge/label-message-color)

<!-- Examples -->
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-stable-brightgreen)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

<!-- Badge with logo -->
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)`}</code></pre>
      <p>{t.renders_as}: Colored badges with labels, messages, and optional logos. The format is <code>https://img.shields.io/badge/LABEL-MESSAGE-COLOR</code>. Common colors: brightgreen, green, yellow, orange, red, blue, lightgrey.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Common Dynamic Badges</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- npm version -->
![npm](https://img.shields.io/npm/v/package-name)

<!-- npm downloads -->
![Downloads](https://img.shields.io/npm/dm/package-name)

<!-- GitHub stars -->
![Stars](https://img.shields.io/github/stars/owner/repo)

<!-- GitHub issues -->
![Issues](https://img.shields.io/github/issues/owner/repo)

<!-- GitHub license -->
![License](https://img.shields.io/github/license/owner/repo)

<!-- Build status (GitHub Actions) -->
![Build](https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml)

<!-- Code coverage -->
![Coverage](https://img.shields.io/codecov/c/github/owner/repo)

<!-- Bundle size -->
![Bundle Size](https://img.shields.io/bundlephobia/minzip/package-name)`}</code></pre>
      <p>{t.renders_as}: Dynamic badges that automatically update based on live data from npm, GitHub, Codecov, and other services. Replace <code>owner/repo</code> and <code>package-name</code> with your actual values.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Badge Layout in README</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Badges on same line -->
![npm](https://img.shields.io/npm/v/my-lib) ![License](https://img.shields.io/github/license/me/my-lib) ![Build](https://img.shields.io/github/actions/workflow/status/me/my-lib/ci.yml)

<!-- Centered badges -->
<p align="center">
  <a href="https://npmjs.com/package/my-lib"><img src="https://img.shields.io/npm/v/my-lib" alt="npm version"></a>
  <a href="https://github.com/me/my-lib/blob/main/LICENSE"><img src="https://img.shields.io/github/license/me/my-lib" alt="license"></a>
  <a href="https://github.com/me/my-lib/actions"><img src="https://img.shields.io/github/actions/workflow/status/me/my-lib/ci.yml" alt="build status"></a>
</p>`}</code></pre>
      <p>{t.renders_as}: Badges arranged horizontally. Use HTML for centered badges or to make badges clickable links. Place badges right below your project title for maximum visibility.</p>

      {/* ============================================================ */}
      {/* 6. COLLAPSIBLE SECTIONS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_collapsible}</h2>
      <p>{t.p_collapsible}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Basic Collapsible</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<details>
<summary>Click to expand</summary>

This content is hidden by default.
You can put **any Markdown** here:

- Lists
- Code blocks
- Tables
- Images

\`\`\`javascript
console.log('Hidden code example');
\`\`\`

</details>`}</code></pre>
      <p>{t.renders_as}: A clickable triangle/arrow with the summary text. Clicking it reveals the hidden content. The content supports full Markdown formatting.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Open by Default</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<details open>
<summary>Expanded by default</summary>

This content is visible when the page loads.
Users can click to collapse it.

</details>`}</code></pre>
      <p>{t.renders_as}: Same as above, but the section starts expanded. Add the <code>open</code> attribute to the &lt;details&gt; tag.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Nested Collapsibles & Practical Examples</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<details>
<summary><strong>Environment Variables</strong></summary>

| Variable        | Required | Default     | Description           |
|-----------------|----------|-------------|-----------------------|
| \`DATABASE_URL\`  | Yes      | -           | PostgreSQL connection |
| \`REDIS_URL\`     | No       | localhost   | Redis connection      |
| \`PORT\`          | No       | 3000        | Server port           |
| \`NODE_ENV\`      | No       | development | Environment mode      |

</details>

<details>
<summary><strong>Full Changelog</strong></summary>

### v2.0.0 (2025-01-15)
- Breaking: Renamed \`config.js\` to \`config.ts\`
- Added TypeScript support
- Removed deprecated \`legacyMode\` option

### v1.5.0 (2024-12-01)
- Added Redis caching
- Fixed memory leak in WebSocket handler
- Updated dependencies

</details>`}</code></pre>
      <p>{t.renders_as}: Collapsible sections with rich content like tables and changelogs. Use bold text in the summary for emphasis. This pattern is ideal for environment variable docs, changelogs, and verbose configuration details.</p>

      {/* ============================================================ */}
      {/* 7. ALERTS / CALLOUTS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_alerts}</h2>
      <p>{t.p_alerts}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">All Alert Types</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`> [!NOTE]
> Useful information that users should know,
> even when skimming content.

> [!TIP]
> Helpful advice for doing things better
> or more easily.

> [!IMPORTANT]
> Key information users need to know to
> achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user
> attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes
> of certain actions.`}</code></pre>
      <p>{t.renders_as}: Five styled callout boxes with distinct colors and icons. NOTE is blue, TIP is green, IMPORTANT is purple, WARNING is yellow, and CAUTION is red. These only work on GitHub (not all Markdown renderers).</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Alerts with Rich Content</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`> [!WARNING]
> **Breaking Change in v3.0**
>
> The \`config.legacy\` option has been removed.
> Migrate to the new format:
>
> \`\`\`diff
> - legacy: true
> + mode: 'modern'
> \`\`\`
>
> See the [Migration Guide](./MIGRATION.md) for details.`}</code></pre>
      <p>{t.renders_as}: Alerts can contain bold text, code blocks, links, and other Markdown formatting. They are ideal for migration notices and deprecation warnings in README files.</p>

      {/* ============================================================ */}
      {/* 8. MERMAID DIAGRAMS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_mermaid}</h2>
      <p>{t.p_mermaid}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Flowchart</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is authenticated?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login Page]
    D --> E[Enter Credentials]
    E --> F{Valid?}
    F -->|Yes| C
    F -->|No| G[Show Error]
    G --> D
    C --> H[End]
\`\`\``}</code></pre>
      <p>{t.renders_as}: A visual flowchart with boxes, diamonds (decision points), and arrows. <code>TD</code> means top-down direction. Use <code>LR</code> for left-to-right. Node shapes: <code>[rectangular]</code>, <code>&#123;diamond&#125;</code>, <code>(rounded)</code>, <code>([stadium])</code>.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Sequence Diagram</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB

    Client->>API: POST /login {email, password}
    API->>Auth: Validate credentials
    Auth->>DB: Query user
    DB-->>Auth: User record
    Auth-->>API: JWT token
    API-->>Client: 200 OK {token}

    Client->>API: GET /data (Bearer token)
    API->>Auth: Verify token
    Auth-->>API: Valid
    API->>DB: SELECT * FROM data
    DB-->>API: Results
    API-->>Client: 200 OK {data}
\`\`\``}</code></pre>
      <p>{t.renders_as}: A sequence diagram showing interactions between participants over time. Solid arrows (<code>-&gt;&gt;</code>) represent requests, dashed arrows (<code>--&gt;&gt;</code>) represent responses. Perfect for documenting API flows and authentication sequences.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Gantt Chart</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`mermaid
gantt
    title Project Roadmap Q1 2025
    dateFormat YYYY-MM-DD
    section Backend
        API Design           :a1, 2025-01-01, 14d
        Implementation       :a2, after a1, 21d
        Testing              :a3, after a2, 7d
    section Frontend
        UI Mockups           :b1, 2025-01-01, 7d
        Component Development:b2, after b1, 28d
        Integration          :b3, after a2, 14d
    section DevOps
        CI/CD Pipeline       :c1, 2025-01-15, 7d
        Staging Deploy       :c2, after a3, 3d
        Production Deploy    :milestone, after b3, 0d
\`\`\``}</code></pre>
      <p>{t.renders_as}: A Gantt chart with tasks, durations, dependencies, and milestones. Sections group related tasks. Use <code>after taskId</code> to define dependencies between tasks.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Other Mermaid Diagrams</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Class Diagram -->
\`\`\`mermaid
classDiagram
    class User {
        +String name
        +String email
        +login()
        +logout()
    }
    class Admin {
        +deleteUser()
        +banUser()
    }
    User <|-- Admin
\`\`\`

<!-- Pie Chart -->
\`\`\`mermaid
pie title Language Distribution
    "TypeScript" : 45
    "Python" : 25
    "Go" : 15
    "Rust" : 10
    "Other" : 5
\`\`\``}</code></pre>
      <p>{t.renders_as}: Mermaid also supports class diagrams, pie charts, entity-relationship diagrams, state diagrams, and more. Check the Mermaid documentation for the full list of supported diagram types.</p>

      {/* ============================================================ */}
      {/* 9. MATH EQUATIONS */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_math}</h2>
      <p>{t.p_math}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Inline Math</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ where $a \\neq 0$.

Einstein's famous equation: $E = mc^2$

The time complexity is $O(n \\log n)$ in the average case.`}</code></pre>
      <p>{t.renders_as}: Mathematical expressions rendered inline within a paragraph of text. Single dollar signs delimit inline math. The expressions render as properly formatted mathematical notation with fractions, square roots, superscripts, and symbols.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Block Math</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

$$
\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
\\times
\\begin{bmatrix}
e \\\\
f
\\end{bmatrix}
=
\\begin{bmatrix}
ae + bf \\\\
ce + df
\\end{bmatrix}
$$`}</code></pre>
      <p>{t.renders_as}: Centered, display-mode math equations. Double dollar signs create block-level equations. Supports summation notation, integrals, matrices, and virtually any LaTeX math expression. Equations appear on their own line and are centered.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Math in Code Blocks (Alternative)</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`\`\`\`math
\\left( \\sum_{k=1}^n a_k b_k \\right)^2
\\leq
\\left( \\sum_{k=1}^n a_k^2 \\right)
\\left( \\sum_{k=1}^n b_k^2 \\right)
\`\`\``}</code></pre>
      <p>{t.renders_as}: An alternative syntax using a fenced code block with the <code>math</code> language identifier. This is useful when dollar-sign delimiters conflict with currency symbols in your document.</p>

      {/* ============================================================ */}
      {/* 10. EMOJI */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_emoji}</h2>
      <p>{t.p_emoji}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Common Emoji Shortcodes</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<!-- Status & Feedback -->
:white_check_mark:  :x:  :warning:  :bulb:  :memo:

<!-- Reactions -->
:+1:  :-1:  :heart:  :star:  :fire:  :rocket:

<!-- Development -->
:bug:  :wrench:  :hammer:  :gear:  :package:  :lock:

<!-- People & Gestures -->
:wave:  :clap:  :muscle:  :eyes:  :tada:

<!-- Arrows & Symbols -->
:arrow_right:  :arrow_left:  :arrow_up:  :arrow_down:
:heavy_check_mark:  :heavy_multiplication_x:
:information_source:  :link:`}</code></pre>
      <p>{t.renders_as}: Emoji icons corresponding to each shortcode. For example, <code>:rocket:</code> renders as a rocket icon, <code>:bug:</code> renders as a bug icon. GitHub supports hundreds of emoji shortcodes. You can also paste Unicode emoji directly.</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">Emoji in Context</h3>
      <p>{t.source}:</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`## :rocket: Quick Start

### :package: Installation
\`\`\`bash
npm install my-awesome-lib
\`\`\`

### :gear: Configuration
See [config docs](./CONFIG.md).

### :bug: Known Issues
- :warning: Memory leak in v2.1 (fixed in v2.2)
- :white_check_mark: All tests passing

### :heart: Contributing
PRs welcome! :tada:`}</code></pre>
      <p>{t.renders_as}: Emoji used as section icons in headings and inline markers for status. This is a popular pattern in open-source README files to make sections visually scannable.</p>

      {/* ============================================================ */}
      {/* 11. README TEMPLATE */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_template}</h2>
      <p>{t.p_template}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`<p align="center">
  <img src="./assets/logo.png" alt="Project Logo" width="120">
</p>

<h1 align="center">Project Name</h1>

<p align="center">
  <strong>One-line description of what your project does.</strong>
</p>

<p align="center">
  <a href="https://npmjs.com/package/your-pkg"><img src="https://img.shields.io/npm/v/your-pkg" alt="npm"></a>
  <a href="https://github.com/you/repo/actions"><img src="https://img.shields.io/github/actions/workflow/status/you/repo/ci.yml" alt="build"></a>
  <a href="https://github.com/you/repo/blob/main/LICENSE"><img src="https://img.shields.io/github/license/you/repo" alt="license"></a>
</p>

---

## :sparkles: Features

- **Feature 1** -- Brief description
- **Feature 2** -- Brief description
- **Feature 3** -- Brief description

## :package: Installation

\`\`\`bash
# npm
npm install project-name

# yarn
yarn add project-name

# pnpm
pnpm add project-name
\`\`\`

## :rocket: Quick Start

\`\`\`typescript
import { something } from 'project-name';

const result = something({
  option1: 'value',
  option2: true,
});

console.log(result);
\`\`\`

## :book: API Reference

### \`something(options)\`

| Parameter | Type      | Default | Description           |
|-----------|-----------|---------|-----------------------|
| option1   | \`string\`  | \`-\`     | Required. Main input  |
| option2   | \`boolean\` | \`false\` | Enable advanced mode  |
| option3   | \`number\`  | \`10\`    | Max retry count       |

**Returns:** \`Promise<Result>\`

<details>
<summary><strong>Full Options Reference</strong></summary>

| Parameter | Type     | Default      | Description              |
|-----------|----------|--------------|--------------------------|
| timeout   | \`number\` | \`5000\`       | Request timeout (ms)     |
| retries   | \`number\` | \`3\`          | Number of retry attempts |
| baseURL   | \`string\` | \`'/api'\`     | API base URL             |
| headers   | \`object\` | \`{}\`         | Custom request headers   |

</details>

## :wrench: Configuration

<details>
<summary><strong>Environment Variables</strong></summary>

| Variable      | Required | Default     | Description          |
|---------------|----------|-------------|----------------------|
| \`API_KEY\`     | Yes      | -           | Your API key         |
| \`DEBUG\`       | No       | \`false\`     | Enable debug logging |
| \`PORT\`        | No       | \`3000\`      | Server port          |

</details>

## :test_tube: Running Tests

\`\`\`bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "feature"
\`\`\`

## :handshake: Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## :scroll: License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with :heart: by <a href="https://github.com/yourname">Your Name</a>
</p>`}</code></pre>
      <p>{t.renders_as}: A complete, professional README with logo, badges, features, installation instructions, API reference, configuration, test commands, contributing guide, and license section. Copy this template and replace the placeholder values with your project details.</p>

      {/* ============================================================ */}
      {/* 12. FAQ */}
      {/* ============================================================ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2_faq}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq1_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq1_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq2_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq2_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq3_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq3_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq4_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq4_a }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.faq5_q}</h3>
      <p dangerouslySetInnerHTML={{ __html: t.faq5_a }} />

      {/* ============================================================ */}
      {/* CONCLUSION */}
      {/* ============================================================ */}
      <p className="mt-8">{t.p_conclusion}</p>
    </article>
  );
}
