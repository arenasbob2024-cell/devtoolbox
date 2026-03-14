'use client';

import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

export default function MarkdownToPdf() {
  const { dict } = useLang();
  const t = dict.tools['markdown-to-pdf'];
  const [markdown, setMarkdown] = useState('# Welcome\n\nThis is a **markdown** preview tool.');
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const previewRef = useRef<HTMLDivElement>(null);

  const parseMarkdown = (md: string): string => {
    let html = md;

    // Escape HTML
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Headers
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Lists
    html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><h/g, '<h');
    html = html.replace(/<\/h><p>/g, '</h>');
    html = html.replace(/<p><pre/g, '<pre');
    html = html.replace(/<\/pre><p>/g, '</pre>');
    html = html.replace(/<p><ul/g, '<ul');
    html = html.replace(/<\/ul><p>/g, '</ul>');

    return html;
  };

  const handlePrint = () => {
    if (previewRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
              h1 { font-size: 32px; font-weight: 700; margin-bottom: 20px; }
              h2 { font-size: 24px; font-weight: 700; margin-bottom: 16px; margin-top: 20px; }
              h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; margin-top: 16px; }
              p { font-size: ${fontSize}px; line-height: ${lineHeight}; margin-bottom: 12px; }
              strong { font-weight: 700; }
              em { font-style: italic; }
              code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
              pre { background: #f0f0f0; padding: 12px; border-radius: 6px; overflow-x: auto; }
              pre code { background: none; padding: 0; }
              a { color: #0066cc; text-decoration: underline; }
              ul { padding-left: 24px; }
              li { margin-bottom: 8px; }
            </style>
          </head>
          <body>
            ${previewRef.current.innerHTML}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const loadSample = () => {
    setMarkdown(`# Document Title

## Introduction

This is a **markdown to PDF converter**. You can use *italic* and __bold__ text, as well as ***bold italic***.

### Features

- Real-time preview
- Customizable formatting
- Print-ready output
- Support for headers, lists, and code

## Code Example

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Links

Visit [DevToolBox](https://viadreams.cc) for more tools.

---

### Additional Info

You can also use \`inline code\` in paragraphs.`);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="markdown-to-pdf"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handlePrint} className="btn btn-primary">{t.printBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => setMarkdown('')} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Formatting Controls */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Formatting</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Font Size: {fontSize}px</label>
            <input
              type="range"
              min="12"
              max="24"
              value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Line Height: {lineHeight.toFixed(1)}</label>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={lineHeight}
              onChange={e => setLineHeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Input/Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Input */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.markdownInputLabel}</label>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            placeholder={t.markdownInputPlaceholder}
            style={{ minHeight: 500, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>

        {/* Preview */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{t.previewLabel}</label>
          <div
            ref={previewRef}
            style={{
              minHeight: 500,
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              padding: 16,
              overflow: 'auto',
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
            }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
