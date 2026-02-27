'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Markdown Editor: Syntax Guide and Best Practices — Complete Guide',
    description: 'Master Markdown syntax and tooling. Complete guide covering headers, lists, tables, GFM task lists, marked.js, react-markdown, Python markdown, Pandoc, MDX, and SEO-optimized front matter.',
  },
  zh: {
    title: 'Markdown编辑器：语法指南和最佳实践完整指南',
    description: '掌握Markdown语法和工具链。完整指南涵盖标题、列表、表格、GFM任务列表、marked.js、react-markdown、Python markdown、Pandoc、MDX以及SEO优化的Front Matter。',
  },
};

export default function MarkdownEditorOnlineGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Markdown and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Markdown is a lightweight plain-text formatting syntax created by John Gruber in 2004. It converts to HTML while remaining human-readable as source. You should use it because it is portable (plain .md files work in any editor), version-control friendly (no binary formats), supported natively by GitHub, GitLab, Notion, Obsidian, VS Code, and most documentation platforms, and it keeps you focused on writing rather than formatting. It is the standard for README files, technical documentation, blog posts, and wikis.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between CommonMark, GFM, and standard Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Original Markdown (2004) had ambiguous edge cases and no formal specification. CommonMark (2014) is a rigorously defined specification that resolves those ambiguities — most modern parsers follow it. GitHub Flavored Markdown (GFM) is a superset of CommonMark that adds task lists (- [ ] syntax), strikethrough (~~text~~), tables with pipe syntax, auto-linking of URLs, and disallows certain raw HTML for security. When in doubt, use GFM-compatible syntax as it is supported by GitHub, GitLab, VS Code preview, and most Markdown libraries.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I create a table in Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use pipe | characters to separate columns and hyphens --- to create the header separator row. Example: | Name | Age | and then | --- | --- | and then | Alice | 30 |. Alignment is controlled by colons: |:---| for left, |:---:| for center, |---:| for right. Tables are a GFM extension — they are not part of original CommonMark but are supported by virtually all modern parsers. For complex tables (merged cells, nested content), fall back to raw HTML <table> tags inside your Markdown file.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add syntax highlighting to code blocks in Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use fenced code blocks with triple backticks and a language identifier immediately after the opening fence. For example: ```javascript followed by your code and then closing ```. Common language identifiers include: javascript, typescript, python, bash, sh, json, yaml, html, css, sql, rust, go, java, cpp, c, php, ruby, swift. The identifier tells the renderer which grammar to use for syntax highlighting. In GitHub, VS Code, and most Markdown previewers, this renders with full color syntax highlighting.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is marked.js and how do I use it in Node.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'marked.js is the most widely used JavaScript Markdown parser, with over 30 million weekly npm downloads. Install with npm install marked. Basic usage: import { marked } from "marked"; const html = marked.parse("# Hello World"); For security, always sanitize output with DOMPurify or use a sanitizer option. You can extend marked with custom renderers to change how specific Markdown elements are rendered — useful for adding CSS classes, custom link behavior, or component wrapping. It supports GFM by default.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is react-markdown and when should I use it instead of marked.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'react-markdown renders Markdown as React components instead of raw HTML strings, making it the correct choice for React applications. Unlike marked.js which returns an HTML string (requiring dangerouslySetInnerHTML), react-markdown returns a React element tree that is safe by default and supports component overrides. Use react-markdown when you need to replace Markdown elements with custom React components (e.g., replacing img with a Next.js Image, or adding CSS classes to headings). Install: npm install react-markdown remark-gfm.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is MDX and how does it differ from Markdown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MDX is Markdown extended with JSX — it lets you import and use React components directly inside .mdx files. A standard .md file is pure text with Markdown syntax. An .mdx file can contain import statements, JSX component usage, and JavaScript expressions inline. This makes it ideal for documentation sites, blog posts with interactive demos, and component libraries. Next.js supports MDX via @next/mdx or content management solutions like contentlayer and next-mdx-remote for dynamic MDX loading from a CMS.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert Markdown to PDF or Word document with Pandoc?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pandoc is a universal document converter. For PDF: pandoc input.md -o output.pdf (requires LaTeX or wkhtmltopdf). For Word DOCX: pandoc input.md -o output.docx. For HTML: pandoc input.md -o output.html. You can add YAML front matter at the top of your .md file to set metadata: title, author, date. Use --template to apply custom templates. For batch conversion: find . -name "*.md" -exec pandoc {} -o {}.html \;. Install pandoc from pandoc.org — it is available for macOS (brew install pandoc), Ubuntu (apt install pandoc), and Windows.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/markdown-editor-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Markdown</strong> is plain-text formatting that converts to HTML. Use <code>## headings</code>,{' '}
          <code>**bold**</code>, <code>- lists</code>, and fenced <code>```code blocks```</code> for basics.
          For tables, task lists, and strikethrough, use <strong>GFM (GitHub Flavored Markdown)</strong>.
          In JavaScript, choose <strong>marked.js</strong> for speed or <strong>react-markdown</strong> for React.
          For advanced conversions (PDF, DOCX), use <strong>Pandoc</strong>. For interactive docs, use <strong>MDX</strong>.
          Try our{' '}
          <Link href={`/${lang}/tools/markdown-to-html`} style={{ color: '#0284c7' }}>
            online Markdown to HTML converter
          </Link>{' '}
          to preview output instantly.
        </p>
      </div>

      {/* Section 1: Markdown Basics */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Markdown Basics — Headers, Emphasis, Lists, Links, Images, Blockquotes
      </h2>
      <p>
        Markdown was created by John Gruber and Aaron Swartz in 2004 with the goal that a Markdown-formatted
        document should be publishable as plain text, without looking like it has been marked up with tags or
        formatting instructions. The syntax maps closely to how people naturally format plain-text emails.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Headings
      </h3>
      <p>
        Headings are created with hash signs <code>#</code>. The number of hashes corresponds to the HTML heading
        level (<code>h1</code> through <code>h6</code>). Always put a space between the hash and the text, and
        leave a blank line before a heading for maximum parser compatibility.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# H1 — Page Title (use only once per page for SEO)
## H2 — Major Section
### H3 — Subsection
#### H4 — Sub-subsection
##### H5 — Rarely used
###### H6 — Rarely used

# Alternative H1 with underline syntax
Heading 1
=========

## Alternative H2 with underline syntax
Heading 2
---------`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Emphasis — Bold, Italic, Bold+Italic
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`**bold text**          → <strong>bold text</strong>
__also bold__          → <strong>also bold</strong>

*italic text*          → <em>italic text</em>
_also italic_          → <em>also italic</em>

***bold and italic***  → <strong><em>bold and italic</em></strong>
___bold and italic___  → <strong><em>bold and italic</em></strong>

~~strikethrough~~      → <del>strikethrough</del>  (GFM extension)

\`inline code\`          → <code>inline code</code>`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Lists — Unordered, Ordered, Nested
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Unordered lists — use -, *, or + (be consistent)
- Item one
- Item two
  - Nested item (indent with 2 spaces)
  - Another nested item
    - Deeply nested (4 spaces)
- Item three

# Ordered lists — numbers auto-correct
1. First item
2. Second item
   1. Nested ordered (indent 3 spaces)
   2. Another nested
3. Third item

# Starting ordered list at a specific number
4. Fourth item (continues from where you left off)
5. Fifth item

# Mixed nesting
1. Ordered parent
   - Unordered child
   - Another child
2. Second ordered parent`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Links, Images, and Blockquotes
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Inline links
[Link text](https://example.com)
[Link with title](https://example.com "Hover tooltip")

# Reference-style links (keeps prose readable)
[Link text][ref-id]
[Another link][ref-id]

[ref-id]: https://example.com "Optional title"

# Auto-links (GFM — bare URLs become clickable)
https://example.com
<email@example.com>

# Images (same as links but with leading !)
![Alt text](https://example.com/image.png)
![Alt text](./local-image.jpg "Image title")

# Blockquotes
> This is a blockquote paragraph.
> It can span multiple lines.
>
> A blank quoted line creates a new paragraph.
>
> > Nested blockquote (double >>)

# Horizontal rules — three or more hyphens, asterisks, or underscores
---
***
___`}</code></pre>

      {/* Section 2: Code Blocks & Syntax Highlighting */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Code Blocks and Syntax Highlighting — Fenced Blocks, Language Tags
      </h2>
      <p>
        Code is one of the most important elements in technical Markdown. There are two types: inline code
        (wrapped in single backticks) and block code (wrapped in triple backticks or indented with four spaces).
        Fenced blocks with a language identifier enable syntax highlighting in most renderers.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Fenced Code Blocks with Language Identifiers
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`\`\`\`javascript
// JavaScript example
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet('World'));
\`\`\`

\`\`\`typescript
// TypeScript with interfaces
interface User {
  id: number;
  name: string;
  email?: string;
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(r => r.json());
}
\`\`\`

\`\`\`python
# Python example
def fibonacci(n: int) -> list[int]:
    a, b = 0, 1
    result = []
    while a < n:
        result.append(a)
        a, b = b, a + b
    return result
\`\`\`

\`\`\`bash
# Shell / Bash commands
npm install react-markdown remark-gfm
export NODE_ENV=production
./deploy.sh --force
\`\`\``}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Common Language Tags Reference
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Language Tag</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Language</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Also Accepts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>javascript</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JavaScript</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>js</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>typescript</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>TypeScript</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>ts</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>python</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Python</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>py</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>bash</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Bash / Shell</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>sh</code>, <code>shell</code>, <code>zsh</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>json</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JSON</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>&mdash;</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>yaml</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>YAML</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>yml</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>html</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HTML</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>htm</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>css</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CSS</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>scss</code>, <code>sass</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>sql</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SQL</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>&mdash;</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>rust</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Rust</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>rs</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>go</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Go</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>golang</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>java</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Java</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>&mdash;</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>cpp</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>C++</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>c++</code>, <code>cxx</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>diff</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Git diff output</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>&mdash;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The <code>diff</code> language tag is particularly useful for documenting changes &mdash; lines prefixed with
        <code>+</code> render in green and lines prefixed with <code>-</code> render in red, matching what developers
        expect from git diff output.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`\`\`\`diff
- const API_URL = 'http://localhost:3000';
+ const API_URL = process.env.NEXT_PUBLIC_API_URL;

  function fetchUser(id) {
-   return axios.get(\`\${API_URL}/user/\${id}\`);
+   return fetch(\`\${API_URL}/api/users/\${id}\`).then(r => r.json());
  }
\`\`\``}</code></pre>

      {/* Section 3: Tables */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Tables in Markdown — Pipe Syntax, Alignment, Complex Tables
      </h2>
      <p>
        Tables are a GFM extension and are not part of the original CommonMark specification. They use pipe
        characters <code>|</code> to separate columns. The second row must be a separator row of hyphens that
        defines column alignment.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Basic Table Syntax and Alignment
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`| Column 1     | Column 2     | Column 3     |
| ------------ | ------------ | ------------ |
| Cell A       | Cell B       | Cell C       |
| Cell D       | Cell E       | Cell F       |

# Column alignment using colons in the separator row
| Left-aligned | Center-aligned | Right-aligned |
| :----------- | :------------: | ------------: |
| Text         | Text           | Text          |
| Apple        | Banana         | Cherry        |

# Pipes on the outside are optional but recommended for readability
Name | Score | Grade
---- | ----- | -----
Alice | 95 | A
Bob | 82 | B
Carol | 78 | C+

# You can include inline formatting inside table cells
| Feature      | Status           | Notes              |
| ------------ | ---------------- | ------------------ |
| **Auth**     | ✅ Complete       | JWT + refresh      |
| *Payments*   | 🚧 In progress    | Stripe integration |
| Search       | ~~Planned~~       | Deprioritized      |`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Complex Tables — HTML Fallback for Merged Cells
      </h3>
      <p>
        Markdown tables do not support rowspan or colspan. For complex tables requiring merged cells, fall back to
        raw HTML within your Markdown file. Most Markdown parsers allow inline HTML.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`<!-- HTML table with merged cells inside a .md file -->
<table>
  <thead>
    <tr>
      <th rowspan="2">Name</th>
      <th colspan="2">Scores</th>
    </tr>
    <tr>
      <th>Math</th>
      <th>Science</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>95</td>
      <td>88</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>72</td>
      <td>91</td>
    </tr>
  </tbody>
</table>

<!-- You can also mix Markdown and HTML in most parsers -->
Some **Markdown** text, then:

<details>
  <summary>Click to expand a complex table</summary>

  | A | B |
  |---|---|
  | 1 | 2 |

</details>`}</code></pre>

      {/* Section 4: Extended Markdown (GFM) */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Extended Markdown (GFM) — Task Lists, Strikethrough, Footnotes, Auto-links
      </h2>
      <p>
        GitHub Flavored Markdown (GFM) extends CommonMark with several highly useful features. These are now
        so widely adopted that they are supported by nearly every modern Markdown tool, not just GitHub.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Task Lists (Checkboxes)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Task list syntax — use [ ] for unchecked, [x] for checked
## Sprint Tasks

- [x] Design database schema
- [x] Implement user authentication
- [ ] Build dashboard UI
- [ ] Write unit tests
- [ ] Deploy to staging

### Sub-tasks work too
- [ ] Feature: User profile
  - [x] Profile view page
  - [ ] Edit profile form
  - [ ] Avatar upload
- [ ] Feature: Notifications
  - [ ] Email notifications
  - [ ] Push notifications`}</code></pre>
      <p>
        On GitHub, checked task list items in issue descriptions and pull request bodies render as interactive
        checkboxes. The completion percentage is shown in the issue list view. In README files and other Markdown
        files, they render as visual checkboxes but are not interactive.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Strikethrough, Footnotes, and Auto-links
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Strikethrough (GFM)
~~This text is crossed out~~ — renders as <del>This text is crossed out</del>

The old price was ~~$99~~ now $49!

# Footnotes (supported by GitHub, Pandoc, many parsers)
Here is a claim that needs a citation.[^1]
And another statement.[^note]

[^1]: This is the footnote text. It renders at the bottom of the document.
[^note]: Footnotes can have arbitrary labels, not just numbers.

# Auto-links (GFM automatically linkifies bare URLs)
Visit https://viadreams.cc for developer tools.
Contact us at support@example.com

# Without GFM, you need angle brackets for auto-links:
<https://viadreams.cc>
<support@example.com>

# Disabling auto-linking — wrap in backticks
\`https://this-wont-be-linked.com\`

# Mention and issue references (GitHub-specific extensions)
Closes #123
Fixed by @username
Related to #456 and PR #789`}</code></pre>

      {/* Section 5: marked.js */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript marked.js — npm install, parseInline, Custom Renderer, Sanitization
      </h2>
      <p>
        <strong>marked.js</strong> is the most widely used JavaScript Markdown parser with over 30 million weekly
        npm downloads. It is fast (designed to run in browser and Node.js), supports GFM by default, and offers
        a powerful renderer API for customization.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic Usage
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install marked and DOMPurify (for sanitization)
npm install marked dompurify
npm install --save-dev @types/marked @types/dompurify`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// Basic usage — parse full Markdown document
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const markdown = '# Hello World\n\nThis is **bold** text.';

// Always sanitize output before inserting into the DOM!
const rawHtml = marked.parse(markdown) as string;
const safeHtml = DOMPurify.sanitize(rawHtml);

document.getElementById('output')!.innerHTML = safeHtml;

// parseInline — parse only inline elements (no block wrapping)
// Useful when you want bold/italic/code but NOT wrapping <p> tags
const inline = marked.parseInline('This is **bold** and \`code\`') as string;
// Returns: 'This is <strong>bold</strong> and <code>code</code>'
// (no wrapping <p> tag, unlike marked.parse())

// Async mode (required in some environments)
const html = await marked.parse(markdown, { async: true });`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Custom Renderer — Add CSS Classes and Modify Output
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import { marked, Renderer } from 'marked';

// Create custom renderer
const renderer = new Renderer();

// Add CSS classes to headings
renderer.heading = ({ text, depth }) => {
  const id = text.toLowerCase().replace(/[^\\w]+/g, '-');
  return \`<h\${depth} id="\${id}" class="blog-heading blog-h\${depth}">\${text}</h\${depth}>\\n\`;
};

// Open external links in new tab, keep internal links normal
renderer.link = ({ href, title, text }) => {
  const isExternal = href && href.startsWith('http');
  const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? \` title="\${title}"\` : '';
  return \`<a href="\${href}"\${titleAttr}\${target}>\${text}</a>\`;
};

// Wrap tables in a scrollable container
renderer.table = ({ header, rows }) => {
  const tableContent = \`<table>\\n<thead>\\n\${header}</thead>\\n<tbody>\\n\${rows}</tbody>\\n</table>\\n\`;
  return \`<div class="table-wrapper" style="overflow-x:auto">\${tableContent}</div>\`;
};

// Add language class to code blocks for highlight.js
renderer.code = ({ text, lang }) => {
  const language = lang || 'plaintext';
  return \`<pre><code class="language-\${language}">\${text}</code></pre>\\n\`;
};

// Apply the custom renderer
marked.use({ renderer });

const html = marked.parse('# Hello\\n\\nSome [link](https://example.com) text.');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        marked.js Configuration Options
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import { marked } from 'marked';

// Global options
marked.setOptions({
  gfm: true,         // GitHub Flavored Markdown (default: true)
  breaks: false,     // Convert \\n to <br> (default: false, like GFM)
  pedantic: false,   // Use original Markdown spec (default: false)
});

// Per-call options (marked v5+)
const html = marked.parse(input, {
  gfm: true,
  breaks: true,      // Treat single newlines as <br> (useful for chat)
});

// Using marked with highlight.js for syntax highlighting
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

marked.use({
  renderer: {
    code({ text, lang }) {
      const language = hljs.getLanguage(lang || '') ? lang : 'plaintext';
      const highlighted = hljs.highlight(text, { language: language! }).value;
      return \`<pre><code class="hljs language-\${language}">\${highlighted}</code></pre>\\n\`;
    }
  }
});`}</code></pre>

      {/* Section 6: React Markdown */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        React Markdown — npm install, remark-gfm, rehype-highlight, rehype-sanitize
      </h2>
      <p>
        <strong>react-markdown</strong> renders Markdown as a React component tree rather than an HTML string,
        making it the safest and most idiomatic choice for React applications. It is built on the unified/remark/rehype
        ecosystem and is highly extensible via plugins.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic Usage
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install react-markdown
npm install remark-gfm                # GFM: tables, task lists, strikethrough
npm install rehype-highlight          # Syntax highlighting via highlight.js
npm install rehype-sanitize           # HTML sanitization
npm install rehype-slug               # Auto-generate heading IDs
npm install remark-toc                # Auto-generate table of contents`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// Basic react-markdown usage
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import 'highlight.js/styles/github-dark.css';

const markdown = \`
# Hello World

This has **bold**, *italic*, and \\\`inline code\\\`.

\\\`\\\`\\\`javascript
const x = 42;
\\\`\\\`\\\`

| Name | Age |
|------|-----|
| Alice | 30 |
\`;

export function BlogPost({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSanitize]}
    >
      {content}
    </ReactMarkdown>
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Custom Components — Replace Markdown Elements with React Components
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';

export function RichMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Replace <img> with Next.js Image for optimization
        img({ src, alt }) {
          return (
            <Image
              src={src || ''}
              alt={alt || ''}
              width={800}
              height={450}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          );
        },

        // Replace <a> with Next.js Link for internal links
        a({ href, children }) {
          const isInternal = href?.startsWith('/');
          if (isInternal) {
            return <Link href={href!}>{children}</Link>;
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },

        // Add Tailwind classes to headings (or inline styles)
        h1({ children }) {
          return (
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              {children}
            </h1>
          );
        },

        // Wrap code blocks in a container with a copy button
        pre({ children }) {
          return (
            <div style={{ position: 'relative' }}>
              <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
                {children}
              </pre>
            </div>
          );
        },

        // Style blockquotes
        blockquote({ children }) {
          return (
            <blockquote style={{ borderLeft: '4px solid #0ea5e9', paddingLeft: '1rem', color: '#64748b', fontStyle: 'italic', margin: '1rem 0' }}>
              {children}
            </blockquote>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}`}</code></pre>

      {/* Section 7: Python markdown library */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python markdown Library — markdown.convert(), Extensions (toc, codehilite, tables)
      </h2>
      <p>
        Python&apos;s <code>markdown</code> package is the standard Markdown processor for Python applications.
        It supports a rich extension ecosystem and is used by projects like MkDocs, Pelican, and Django-based CMS systems.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic Conversion
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`pip install markdown
pip install Pygments    # Required for codehilite syntax highlighting`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import markdown

# Basic conversion
md_text = """
# Hello World

This is **bold** and *italic*.

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`
"""

html = markdown.markdown(md_text)
print(html)
# <h1>Hello World</h1>
# <p>This is <strong>bold</strong> and <em>italic</em>.</p>

# Converting files
with open('README.md', 'r', encoding='utf-8') as f:
    text = f.read()

html_output = markdown.markdown(text, extensions=['extra', 'toc', 'codehilite'])

with open('output.html', 'w', encoding='utf-8') as f:
    f.write(html_output)

# Reusing the Markdown instance (more efficient for multiple conversions)
md = markdown.Markdown(extensions=['extra', 'toc', 'codehilite'])

for article in articles:
    md.reset()  # Must reset between conversions!
    html = md.convert(article.body)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python Markdown Extensions Reference
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import markdown

# 'extra' is a bundle that includes: tables, footnotes, attr_list,
# def_list, abbr, fenced_code — use it instead of listing individually
html = markdown.markdown(text, extensions=['extra'])

# Table of Contents
md = markdown.Markdown(extensions=['toc'])
html = md.convert(text)
toc_html = md.toc          # Access the generated TOC HTML separately
toc_tokens = md.toc_tokens # Access as a nested list of dicts

# Syntax highlighting with codehilite (uses Pygments)
html = markdown.markdown(text, extensions=['codehilite', 'fenced_code'], extension_configs={
    'codehilite': {
        'css_class': 'highlight',  # CSS class for the wrapper div
        'linenums': False,          # Don't show line numbers
        'guess_lang': False,        # Don't auto-detect language
    }
})

# To use the highlighted styles, also generate and link the CSS:
# python -m pygments -S default -f html > pygments.css

# Full configuration example
extensions = [
    'extra',           # tables, footnotes, attr_list, fenced_code, etc.
    'toc',             # [TOC] placeholder in Markdown
    'codehilite',      # syntax highlighting
    'meta',            # YAML-like metadata at top of document
    'nl2br',           # treat newlines as <br>
    'sane_lists',      # more predictable list handling
    'smarty',          # convert "quotes" to "smart" curly quotes
    'wikilinks',       # [[WikiLink]] syntax
    'admonition',      # !!! note "Title" blocks
]

md = markdown.Markdown(extensions=extensions)
html = md.convert(text)
meta = md.Meta  # dict of metadata if 'meta' extension is loaded`}</code></pre>

      {/* Section 8: Pandoc */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Pandoc Conversions — Markdown to HTML/PDF/DOCX, Custom Templates, YAML Front Matter
      </h2>
      <p>
        <strong>Pandoc</strong> is described as the &ldquo;universal document converter.&rdquo; It supports
        converting between over 40 file formats. For Markdown, it is the gold standard for producing
        publication-quality PDF, Word DOCX, EPUB, and HTML output.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installation and Basic CLI Conversions
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Install Pandoc
# macOS
brew install pandoc
brew install --cask basictex   # For PDF output (smaller LaTeX install)

# Ubuntu/Debian
sudo apt-get install pandoc texlive-latex-base

# Windows (via winget)
winget install JohnMacFarlane.Pandoc

# Basic conversions
pandoc input.md -o output.html          # Markdown → HTML fragment
pandoc input.md -s -o output.html       # -s for standalone (full HTML page)
pandoc input.md -o output.pdf           # Markdown → PDF (needs LaTeX)
pandoc input.md -o output.docx          # Markdown → Word DOCX
pandoc input.md -o output.epub          # Markdown → EPUB
pandoc input.md -o output.odt           # Markdown → LibreOffice ODT
pandoc input.md -o output.rst           # Markdown → reStructuredText

# HTML → Markdown (reverse conversion)
pandoc input.html -f html -t markdown -o output.md

# Specify Markdown flavor
pandoc input.md --from=gfm -o output.html        # GFM input
pandoc input.md --from=markdown+smart -o out.pdf # With smart quotes`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        YAML Front Matter for Metadata
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`---
title: "My Report: Q4 2025 Analysis"
author:
  - Alice Johnson
  - Bob Smith
date: 2025-12-15
abstract: |
  This report covers the key findings from Q4 2025,
  including revenue trends and user growth metrics.
keywords:
  - quarterly report
  - analytics
  - growth
lang: en
bibliography: references.bib   # For academic citations
csl: apa.csl                   # Citation Style Language
toc: true                      # Generate table of contents
toc-depth: 3                   # TOC depth
numbersections: true           # Number headings (1.1, 1.2, etc.)
geometry: "margin=1in"         # Page margins for PDF
fontsize: 12pt
---

# Introduction

The body of your document starts here...`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Custom Templates and Advanced Options
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Export the default HTML template to customize
pandoc -D html > my-template.html
# Edit my-template.html, then use it:
pandoc input.md --template=my-template.html -s -o output.html

# Adding a custom CSS file for HTML output
pandoc input.md -s --css=style.css -o output.html

# Generating a PDF with custom PDF engine
pandoc input.md -o output.pdf --pdf-engine=xelatex     # Better Unicode
pandoc input.md -o output.pdf --pdf-engine=wkhtmltopdf # HTML-based (no LaTeX)
pandoc input.md -o output.pdf --pdf-engine=weasyprint  # CSS Paged Media

# Batch conversion: all .md files in a directory to HTML
find . -name "*.md" -exec sh -c 'pandoc "$1" -s -o "\${1%.md}.html"' _ {} \\;

# Combine multiple Markdown files into one document
pandoc chapter1.md chapter2.md chapter3.md -o book.pdf

# Table of contents with custom depth
pandoc input.md --toc --toc-depth=2 -s -o output.html

# Include raw HTML pass-through
pandoc input.md --from=markdown+raw_html -o output.html`}</code></pre>

      {/* Section 9: MDX */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        MDX (Markdown + JSX) — Next.js @next/mdx, Custom Components, contentlayer
      </h2>
      <p>
        <strong>MDX</strong> lets you use JSX in your Markdown content. This means you can import React components
        and use them directly in your <code>.mdx</code> files — creating interactive documentation, blog posts with
        live demos, and data-driven content that would be impossible with plain Markdown.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Setting up MDX in Next.js with @next/mdx
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install --save-dev @types/mdx`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// src/app/[lang]/blog/my-post/page.mdx
import { CodeBlock } from '@/components/CodeBlock';
import { Chart } from '@/components/Chart';

export const metadata = {
  title: 'My Interactive Blog Post',
  description: 'A post with live demos',
};

# Interactive Demo Post

Here is a **Markdown** heading followed by a React component:

<CodeBlock language="javascript">
  {JSON.stringify({ hello: 'world' }, null, 2)}
</CodeBlock>

And here is a live chart with data:

<Chart
  data={[
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
  ]}
  type="bar"
/>

## Continuing in Markdown

After the component, you can continue writing in **Markdown** normally.`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        MDX with next-mdx-remote (Dynamic MDX from CMS/Database)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`npm install next-mdx-remote remark-gfm`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// Server component: fetch MDX from CMS, serialize on server
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/CodeBlock';
import { Alert } from '@/components/Alert';

// Components available inside your MDX content
const components = {
  CodeBlock,
  Alert,
  // Override default HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2rem' }} {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }} {...props} />
  ),
};

// In a Server Component (App Router)
export async function BlogPost({ slug }: { slug: string }) {
  const post = await fetchPostFromCMS(slug); // your data fetching

  return (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [],
        },
      }}
      components={components}
    />
  );
}`}</code></pre>

      {/* Section 10: SEO-optimized Markdown */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        SEO-Optimized Markdown — Front Matter, Meta Description, Canonical URL, Structured Data
      </h2>
      <p>
        When Markdown powers a blog or documentation site, front matter and proper HTML output structure are
        critical for search engine visibility. Here is a complete guide to SEO-optimized Markdown content.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Complete Front Matter Structure
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`---
# Core SEO metadata
title: "Markdown Editor Online: Complete Syntax Guide (2025)"
description: "Master Markdown syntax with our online editor. Complete guide covering headers, lists, tables, code blocks, GFM extensions, and best practices for technical writers."
slug: "markdown-editor-online-guide"
canonical: "https://viadreams.cc/en/blog/markdown-editor-online-guide"

# Content metadata
date: 2025-02-27
lastModified: 2025-02-27
author: "DevToolBox Team"
category: "Developer Tools"
tags:
  - markdown
  - documentation
  - technical-writing
  - github

# Social media
ogTitle: "Markdown Syntax Complete Guide — DevToolBox"
ogDescription: "Master every Markdown feature: headers, tables, code blocks, GFM, and more."
ogImage: "https://viadreams.cc/images/markdown-editor-og.png"
twitterCard: "summary_large_image"

# Content flags
draft: false
featured: true
readingTime: 12

# Structured data hints (consumed by your build tool)
schema:
  type: "TechArticle"
  mainEntity: "Markdown"
---`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Structured Data JSON-LD in Markdown-based Sites
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`// In Next.js: auto-generate Article schema from front matter
// src/app/[lang]/blog/[slug]/page.tsx

import { getPostBySlug } from '@/lib/posts';

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }) {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: post.frontmatter.canonical,
    },
    openGraph: {
      title: post.frontmatter.ogTitle || post.frontmatter.title,
      description: post.frontmatter.ogDescription || post.frontmatter.description,
      images: [post.frontmatter.ogImage],
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.lastModified,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: post.frontmatter.twitterCard,
    },
  };
}

// In page component, inject Article schema
function ArticleSchema({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.lastModified,
    author: {
      '@type': 'Organization',
      name: post.frontmatter.author,
      url: 'https://viadreams.cc',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevToolBox',
      url: 'https://viadreams.cc',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.frontmatter.canonical,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SEO Best Practices for Markdown Content
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# SEO Checklist for Markdown Documents

## Heading structure (critical for crawlers)
# H1 — One per page, contains primary keyword
## H2 — Major sections, contain secondary keywords
### H3 — Sub-topics, support H2 sections

## Image alt text (required for accessibility + SEO)
![Markdown editor showing live preview split view](./editor-screenshot.png)

## Internal linking (boosts PageRank flow)
Learn more about [JSON formatting](/en/tools/json-formatter) and
[Base64 encoding](/en/tools/base64-encoder-decoder).

## Keyword density — natural inclusion, not stuffing
- Primary keyword in H1, first paragraph, and at least one H2
- Secondary keywords in H3s and body paragraphs
- LSI keywords naturally throughout

## Content length guidelines
- Blog post: 1500-3000 words for comprehensive coverage
- Tutorial: 2000-5000 words with working code examples
- Reference guide: organized, scannable, 1000-2500 words

## URL slug best practices (from front matter)
slug: "markdown-editor-online-guide"  ✅ Descriptive, hyphenated
slug: "post-123"                       ❌ No keywords
slug: "markdown_editor_online_guide"  ❌ Underscores (use hyphens)

## Meta description rules
# ✅ Good: 140-160 characters, includes CTA, primary keyword
description: "Master Markdown syntax with our free online editor. Complete 2025 guide covering tables, code blocks, GFM, and MDX for developers."

# ❌ Bad: Too short, no keyword
description: "Learn Markdown."`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '1rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#15803d' }}>Try the Online Markdown Editor</p>
        <p style={{ margin: 0 }}>
          Convert Markdown to HTML instantly with our free online tool. Supports GFM, syntax highlighting preview,
          and live rendering — no installation required.{' '}
          <Link href="https://viadreams.cc/en/tools/markdown-to-html" style={{ color: '#16a34a', fontWeight: 600 }}>
            Open Markdown to HTML Converter
          </Link>
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Use GFM by default</strong>: GitHub Flavored Markdown adds tables, task lists, strikethrough, and auto-links. It is supported by all major tools.</li>
          <li><strong>Fenced code blocks beat indented blocks</strong>: Triple backticks with a language identifier enable syntax highlighting and are easier to read.</li>
          <li><strong>Choose the right parser for your stack</strong>: marked.js for speed/Node.js, react-markdown for React (safe by default), Python markdown for Django/Flask, Pandoc for document publishing.</li>
          <li><strong>Always sanitize marked.js output</strong>: Use DOMPurify before inserting HTML strings into the DOM to prevent XSS.</li>
          <li><strong>react-markdown is safe by default</strong>: It renders React components, not raw HTML strings, so <code>dangerouslySetInnerHTML</code> is never needed.</li>
          <li><strong>MDX unlocks interactive content</strong>: Use MDX with Next.js for documentation sites that need live component demos embedded in prose.</li>
          <li><strong>Pandoc is the conversion Swiss Army knife</strong>: For PDF, DOCX, EPUB output, nothing beats Pandoc. Add YAML front matter for metadata.</li>
          <li><strong>Front matter is critical for SEO</strong>: Title, description, canonical URL, og:image, and date fields feed the metadata that search engines and social platforms use.</li>
          <li><strong>One H1 per page</strong>: Use <code># Title</code> only once per Markdown file. Use <code>##</code> for main sections and <code>###</code> for sub-sections.</li>
          <li><strong>HTML fallback is always available</strong>: For complex tables (rowspan/colspan), iframes, or advanced layout, raw HTML inside Markdown is valid in most parsers.</li>
        </ul>
      </div>
    </article>
  );
}
