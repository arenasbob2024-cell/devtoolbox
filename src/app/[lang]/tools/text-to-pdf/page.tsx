'use client';

import { useState, useRef, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

type PageSize = 'a4' | 'letter';
type PageOrientation = 'portrait' | 'landscape';
type MarginSize = 'small' | 'medium' | 'large';
type InputMode = 'text' | 'markdown';

interface PdfOptions {
  pageSize: PageSize;
  orientation: PageOrientation;
  margin: MarginSize;
  mode: InputMode;
  fontSize: number;
  lineHeight: number;
}

const marginValues: Record<MarginSize, string> = {
  small: '10mm',
  medium: '20mm',
  large: '30mm',
};

const pageDimensions: Record<PageSize, { width: string; height: string }> = {
  a4: { width: '210mm', height: '297mm' },
  letter: { width: '216mm', height: '279mm' },
};

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks (``` ... ```) - must be handled before inline code
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-family: monospace; font-size: 0.9em;"><code${langAttr}>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;').trimEnd()}</code></pre>`;
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
      result.push('<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">');
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      const level = headerMatch[1].length;
      const fontSize = 2.5 - (level - 1) * 0.3;
      result.push(`<h${level} style="font-size: ${fontSize}em; font-weight: bold; margin: 20px 0 10px 0;">${processInline(headerMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    const bqMatch = line.match(/^>\s?(.*)$/);
    if (bqMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      if (!inBlockquote) { result.push('<blockquote style="border-left: 4px solid #ddd; padding-left: 16px; margin: 10px 0; color: #666;">'); inBlockquote = true; }
      result.push(`<p style="margin: 5px 0;">${processInline(bqMatch[1])}</p>`);
      continue;
    } else if (inBlockquote) {
      result.push('</blockquote>');
      inBlockquote = false;
    }

    // Unordered list
    const ulMatch = line.match(/^[\s]*[-*+]\s+(.+)$/);
    if (ulMatch) {
      if (inList && listType !== 'ul') { result.push('</ol>'); inList = false; }
      if (!inList) { result.push('<ul style="margin: 10px 0; padding-left: 30px;">'); inList = true; listType = 'ul'; }
      result.push(`<li style="margin: 5px 0;">${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
    if (olMatch) {
      if (inList && listType !== 'ol') { result.push('</ul>'); inList = false; }
      if (!inList) { result.push('<ol style="margin: 10px 0; padding-left: 30px;">'); inList = true; listType = 'ol'; }
      result.push(`<li style="margin: 5px 0;">${processInline(olMatch[1])}</li>`);
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
    result.push(`<p style="margin: 10px 0; line-height: 1.6;">${processInline(line)}</p>`);
  }

  // Close any open elements
  if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>');
  if (inBlockquote) result.push('</blockquote>');

  return result.join('\n');
}

function processInline(text: string): string {
  // Images (before links to avoid conflict)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;">');
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #0066cc; text-decoration: underline;">$1</a>');
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code style="background: #f5f5f5; padding: 2px 6px; border-radius: 3px; font-family: monospace; font-size: 0.9em;">$1</code>');
  return text;
}

export default function TextToPdf() {
  const { dict } = useLang();
  const t = dict.tools['text-to-pdf'] as Record<string, unknown>;
  const common = dict.common;
  
  const [text, setText] = useState('');
  const [options, setOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'portrait',
    margin: 'medium',
    mode: 'text',
    fontSize: 14,
    lineHeight: 1.6,
  });
  
  const printRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    if (!text.trim()) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download PDF');
      return;
    }

    const { width, height } = pageDimensions[options.pageSize];
    const pageWidth = options.orientation === 'portrait' ? width : height;
    const pageHeight = options.orientation === 'portrait' ? height : width;
    const margin = marginValues[options.margin];

    const content = options.mode === 'markdown' ? markdownToHtml(text) : text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    @page {
      size: ${options.pageSize} ${options.orientation};
      margin: ${margin};
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: ${options.fontSize}px;
      line-height: ${options.lineHeight};
      color: #333;
      margin: 0;
      padding: 0;
    }
    .page {
      width: calc(${pageWidth} - ${margin} * 2);
      min-height: calc(${pageHeight} - ${margin} * 2);
      padding: ${margin};
      box-sizing: border-box;
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: auto;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    ${options.mode === 'text' ? `
    .content {
      white-space: pre-wrap;
      word-wrap: break-word;
    }` : ''}
  </style>
</head>
<body>
  <div class="page">
    <div class="content">${content}</div>
  </div>
  <script>
    window.onload = function() {
      window.print();
      window.close();
    };
  </script>
</body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const loadSample = () => {
    if (options.mode === 'markdown') {
      setText(`# Sample Document

This is a **sample** document to demonstrate the *Text to PDF* converter.

## Features

- Support for Markdown syntax
- Configurable page size and orientation
- Customizable margins
- Real-time preview

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, PDF!");
}
\`\`\`

> This is a blockquote. It can span multiple lines and contain **formatted** text.

---

Visit [DevToolBox](https://viadreams.cc) for more tools.`);
    } else {
      setText(`Sample Text Document

This is a sample text document to demonstrate the Text to PDF converter.

Features:
- Simple plain text conversion
- Configurable page settings
- Easy to use interface
- Instant PDF generation

You can customize:
1. Page size (A4 or Letter)
2. Page orientation (Portrait or Landscape)
3. Margin size (Small, Medium, or Large)
4. Font size and line spacing

Enjoy using DevToolBox!`);
    }
  };

  // Update preview when text or options change
  useEffect(() => {
    if (previewRef.current) {
      const { width, height } = pageDimensions[options.pageSize];
      const pageWidth = options.orientation === 'portrait' ? width : height;
      const pageHeight = options.orientation === 'portrait' ? height : width;
      const margin = marginValues[options.margin];
      
      previewRef.current.style.width = pageWidth;
      previewRef.current.style.minHeight = pageHeight;
      previewRef.current.style.padding = margin;
      previewRef.current.style.fontSize = `${options.fontSize}px`;
      previewRef.current.style.lineHeight = `${options.lineHeight}`;
    }
  }, [options]);

  const renderPreview = () => {
    if (!text) {
      return <div style={{ color: '#999', fontStyle: 'italic' }}>{t.previewPlaceholder as string || 'Preview will appear here...'}</div>;
    }
    
    if (options.mode === 'markdown') {
      return <div dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }} />;
    }
    
    return <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{text}</div>;
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'Text to PDF Converter'}
      description={(t.pageDescription as string) || 'Convert plain text and Markdown to PDF documents with custom formatting options'}
      toolId="text-to-pdf"
    >
      {/* Options Panel */}
      <div style={{ 
        background: 'var(--card-bg)', 
        border: '1px solid var(--border-color)', 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 16 
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 16 
        }}>
          {/* Input Mode */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.inputMode as string || 'Input Mode'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setOptions({ ...options, mode: 'text' })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: options.mode === 'text' ? 'var(--accent-rose)' : 'transparent',
                  color: options.mode === 'text' ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {t.plainText as string || 'Plain Text'}
              </button>
              <button
                onClick={() => setOptions({ ...options, mode: 'markdown' })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: options.mode === 'markdown' ? 'var(--accent-rose)' : 'transparent',
                  color: options.mode === 'markdown' ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Markdown
              </button>
            </div>
          </div>

          {/* Page Size */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.pageSize as string || 'Page Size'}
            </label>
            <select
              value={options.pageSize}
              onChange={(e) => setOptions({ ...options, pageSize: e.target.value as PageSize })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: 13,
              }}
            >
              <option value="a4">A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>

          {/* Orientation */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.orientation as string || 'Orientation'}
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setOptions({ ...options, orientation: 'portrait' })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: options.orientation === 'portrait' ? 'var(--accent-rose)' : 'transparent',
                  color: options.orientation === 'portrait' ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {t.portrait as string || 'Portrait'}
              </button>
              <button
                onClick={() => setOptions({ ...options, orientation: 'landscape' })}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--border-color)',
                  background: options.orientation === 'landscape' ? 'var(--accent-rose)' : 'transparent',
                  color: options.orientation === 'landscape' ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {t.landscape as string || 'Landscape'}
              </button>
            </div>
          </div>

          {/* Margin */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.margin as string || 'Margin'}
            </label>
            <select
              value={options.margin}
              onChange={(e) => setOptions({ ...options, margin: e.target.value as MarginSize })}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 6,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: 13,
              }}
            >
              <option value="small">{t.small as string || 'Small (10mm)'}</option>
              <option value="medium">{t.medium as string || 'Medium (20mm)'}</option>
              <option value="large">{t.large as string || 'Large (30mm)'}</option>
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.fontSize as string || 'Font Size'}: {options.fontSize}px
            </label>
            <input
              type="range"
              min={10}
              max={24}
              step={1}
              value={options.fontSize}
              onChange={(e) => setOptions({ ...options, fontSize: parseInt(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Line Height */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
              {t.lineHeight as string || 'Line Height'}: {options.lineHeight}
            </label>
            <input
              type="range"
              min={1}
              max={2.5}
              step={0.1}
              value={options.lineHeight}
              onChange={(e) => setOptions({ ...options, lineHeight: parseFloat(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button 
          onClick={handleDownloadPdf} 
          className="btn btn-primary"
          disabled={!text.trim()}
          style={{ opacity: text.trim() ? 1 : 0.5 }}
        >
          {common.download} PDF
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {common.loadSample}
        </button>
        <button 
          onClick={() => setText('')} 
          className="btn btn-secondary"
        >
          {common.clear}
        </button>
      </div>

      {/* Editor and Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Editor */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {options.mode === 'markdown' ? 'Markdown' : common.input}
            </label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {text.length} {common.characters}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={options.mode === 'markdown' ? (t.markdownPlaceholder as string || '# Enter your markdown here...') : (t.textPlaceholder as string || 'Enter your text here...')}
            style={{ 
              minHeight: 500, 
              fontFamily: options.mode === 'markdown' ? 'JetBrains Mono, monospace' : 'inherit',
            }}
          />
        </div>

        {/* Preview */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.preview as string || 'Preview'}</label>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {options.pageSize.toUpperCase()} · {(options.orientation === 'portrait' ? t.portrait : t.landscape) as string}
            </span>
          </div>
          <div
            ref={previewRef}
            style={{
              minHeight: 500,
              background: '#fff',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              color: '#333',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              overflow: 'auto',
              maxHeight: 600,
            }}
          >
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
