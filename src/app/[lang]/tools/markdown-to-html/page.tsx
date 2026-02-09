'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (``` ... ```) - must be handled before inline code
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langAttr}>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trimEnd()}</code></pre>`;
  });

  // Split into lines for block-level processing
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let listType = '';
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip lines inside pre blocks
    if (line.includes('<pre>') || line.includes('</pre>')) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      result.push(line);
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(line.trim())) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      result.push('<hr>');
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      const level = headerMatch[1].length;
      result.push(`<h${level}>${processInline(headerMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    const bqMatch = line.match(/^>\s?(.*)$/);
    if (bqMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (!inBlockquote) { result.push('<blockquote>'); inBlockquote = true; }
      result.push(processInline(bqMatch[1]));
      continue;
    } else if (inBlockquote) {
      result.push('</blockquote>');
      inBlockquote = false;
    }

    // Unordered list
    const ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (inList && listType !== 'ul') { result.push('</ol>'); inList = false; }
      if (!inList) { result.push('<ul>'); inList = true; listType = 'ul'; }
      result.push(`<li>${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
    if (olMatch) {
      if (inList && listType !== 'ol') { result.push('</ul>'); inList = false; }
      if (!inList) { result.push('<ol>'); inList = true; listType = 'ol'; }
      result.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    // Close list if no longer in list items
    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
    }

    // Empty line
    if (line.trim() === '') {
      result.push('');
      continue;
    }

    // Paragraph
    result.push(`<p>${processInline(line)}</p>`);
  }

  // Close any open elements
  if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
  if (inBlockquote) result.push('</blockquote>');

  return result.join('\n');
}

function processInline(text: string): string {
  // Images (before links to avoid conflict)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  return text;
}

export default function MarkdownToHtml() {
  const { dict } = useLang();
  const t = dict.tools['markdown-to-html'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      const result = markdownToHtml(input);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(`# Hello World

This is a **bold** and *italic* text example.

## Features

- Item one
- Item two
- Item three

### Ordered List

1. First step
2. Second step
3. Third step

> This is a blockquote
> with multiple lines

Here is some \`inline code\` and a [link](https://example.com).

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

![Alt text](https://example.com/image.png)

---

That's all folks!`);
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'Markdown to HTML Converter'}
      description={(t.pageDescription as string) || 'Convert Markdown to HTML with pure regex-based conversion'}
      toolId="markdown-to-html"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Markdown {common.input}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="# Enter your markdown here..." style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>HTML</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
