'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const pageSizes = {
  a4: { name: 'A4', width: 210, height: 297 },
  letter: { name: 'Letter', width: 215.9, height: 279.4 },
  legal: { name: 'Legal', width: 215.9, height: 355.6 },
};

const margins = {
  normal: { top: 20, right: 20, bottom: 20, left: 20 },
  narrow: { top: 10, right: 10, bottom: 10, left: 10 },
  wide: { top: 30, right: 30, bottom: 30, left: 30 },
};

const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24];
const lineSpacings = [1.0, 1.15, 1.5, 2.0];

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function countStats(text: string): { characters: number; charactersNoSpaces: number; words: number; lines: number } {
  const trimmed = text.trim();
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  const lines = trimmed === '' ? 0 : trimmed.split('\n').length;
  return { characters, charactersNoSpaces, words, lines };
}

export default function TextToPdf() {
  const { dict } = useLang();
  const t = dict.tools['text-to-pdf'];

  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'legal'>('a4');
  const [margin, setMargin] = useState<'normal' | 'narrow' | 'wide'>('normal');
  const [lineSpacing, setLineSpacing] = useState(1.5);

  const stats = countStats(text);

  const handleConvert = useCallback(() => {
    const size = pageSizes[pageSize];
    const marginData = margins[margin];

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text to PDF</title>
  <style>
    @page {
      size: ${size.width}mm ${size.height}mm;
      margin: ${marginData.top}mm ${marginData.right}mm ${marginData.bottom}mm ${marginData.left}mm;
    }
    body {
      font-family: 'Courier New', 'Courier', monospace;
      font-size: ${fontSize}pt;
      line-height: ${lineSpacing};
      white-space: pre-wrap;
      word-wrap: break-word;
      color: #000;
      background: #fff;
      margin: 0;
      padding: 0;
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
    }
  </style>
</head>
<body>${escapeHtml(text)}</body>
</html>`;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
  }, [text, fontSize, pageSize, margin, lineSpacing]);

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="text-to-pdf"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        {/* Options Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Font Size */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
              {t.fontSize}
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size} pt
                </option>
              ))}
            </select>
          </div>

          {/* Page Size */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
              {t.pageSize}
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter' | 'legal')}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <option value="a4">{t.a4}</option>
              <option value="letter">{t.letter}</option>
              <option value="legal">{t.legal}</option>
            </select>
          </div>

          {/* Margins */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
              {t.margins}
            </label>
            <select
              value={margin}
              onChange={(e) => setMargin(e.target.value as 'normal' | 'narrow' | 'wide')}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              <option value="normal">{t.normal}</option>
              <option value="narrow">{t.narrow}</option>
              <option value="wide">{t.wide}</option>
            </select>
          </div>

          {/* Line Spacing */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
              {t.lineSpacing}
            </label>
            <select
              value={lineSpacing}
              onChange={(e) => setLineSpacing(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              {lineSpacings.map((spacing) => (
                <option key={spacing} value={spacing}>
                  {spacing}x
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div
            style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: 12,
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ fontSize: 12, marginBottom: 8 }}>
              <div style={{ marginBottom: 4, color: 'var(--text-secondary)' }}>
                <strong>{t.characters}:</strong> {stats.characters}
              </div>
              <div style={{ marginBottom: 4, color: 'var(--text-secondary)' }}>
                <strong>{t.words}:</strong> {stats.words}
              </div>
              <div style={{ marginBottom: 4, color: 'var(--text-secondary)' }}>
                <strong>{t.lines}:</strong> {stats.lines}
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={!text.trim()}
            className="btn btn-primary"
            style={{
              width: '100%',
              opacity: !text.trim() ? 0.5 : 1,
              cursor: !text.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {t.convertToPdf}
          </button>
        </div>

        {/* Text Input */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t.placeholder}
            style={{
              width: '100%',
              minHeight: 600,
              padding: 16,
              fontSize: 14,
              fontFamily: 'monospace',
              border: '1px solid var(--border-color)',
              borderRadius: 8,
              background: 'var(--bg-input)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* SEO Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
