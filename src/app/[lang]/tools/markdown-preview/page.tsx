'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// Simple markdown parser (no external dependencies)
function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre style="background:#1e1e2e;border-radius:8px;padding:12px;overflow-x:auto;font-size:13px;border:1px solid #2a2a4a"><code>$2</code></pre>');

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4 style="font-size:16px;font-weight:700;margin:16px 0 8px">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 style="font-size:18px;font-weight:700;margin:16px 0 8px">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 style="font-size:22px;font-weight:700;margin:20px 0 10px">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;margin:24px 0 12px">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background:#1e1e2e;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#3b82f6" target="_blank">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:8px" />');

  // Unordered lists
  html = html.replace(/^[*-] (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$1</li>');

  // Blockquote
  html = html.replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #3b82f6;padding-left:16px;margin:12px 0;color:#94a3b8;font-style:italic">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #2a2a4a;margin:20px 0" />');

  // Line breaks (double newline = paragraph)
  html = html.replace(/\n\n/g, '</p><p style="margin:8px 0;line-height:1.7">');
  html = '<p style="margin:8px 0;line-height:1.7">' + html + '</p>';

  return html;
}

const sampleMd = `# Hello World

This is a **Markdown Preview** tool by *DevToolBox*.

## Features

- Real-time preview
- **Bold**, *italic*, and ***bold italic*** text
- Code blocks with syntax highlighting
- Links, images, and more

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Markdown is a lightweight markup language for creating formatted text.

Visit [DevToolBox](https://devtoolbox.dev) for more tools!

---

**Enjoy writing Markdown!**
`;

export default function MarkdownPreview() {
  const { dict } = useLang();
  const t = dict.tools['markdown-preview'];

  const [input, setInput] = useState(sampleMd);
  const html = useMemo(() => parseMarkdown(input), [input]);

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="markdown-preview"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setInput(sampleMd)} className="btn btn-secondary" style={{ fontSize: 12 }}>{dict.common.loadSample}</button>
        <button onClick={() => setInput('')} className="btn btn-secondary" style={{ fontSize: 12 }}>{dict.common.clear}</button>
        <div style={{ marginLeft: 'auto' }}>
          <CopyButton text={html} label={t.copyHtml} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, minHeight: 400 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>{t.markdown}</label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder}
            style={{ minHeight: 400, height: '100%' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6, color: 'var(--text-secondary)' }}>{t.preview}</label>
          <div
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: '16px 20px',
              minHeight: 400,
              fontSize: 14,
              lineHeight: 1.7,
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
