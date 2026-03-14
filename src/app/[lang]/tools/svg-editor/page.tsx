'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function SvgEditor() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['svg-editor'];

  const [input, setInput] = useState('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="blue" />\n</svg>');
  const [error, setError] = useState('');

  const optimizeAndAnalyze = (svg: string): { optimized: string; dimensions: { width: number; height: number } | null; elementCount: number } => {
    try {
      const optimized = svg
        .replace(/<!--.*?-->/g, '')
        .replace(/>\s+</g, '><')
        .trim();

      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'text/xml');

      if (doc.getElementsByTagName('parsererror').length) {
        throw new Error('Invalid XML');
      }

      const svgElement = doc.documentElement;
      const width = svgElement.getAttribute('width');
      const height = svgElement.getAttribute('height');

      const dimensions = width && height ? { width: parseInt(width), height: parseInt(height) } : null;
      const elementCount = svgElement.getElementsByTagName('*').length;

      return { optimized, dimensions, elementCount };
    } catch {
      throw new Error('Invalid SVG');
    }
  };

  const { optimized, dimensions, elementCount, errorMsg } = useMemo(() => {
    if (!input.trim()) {
      return { optimized: '', dimensions: null, elementCount: 0, errorMsg: '' };
    }

    try {
      const result = optimizeAndAnalyze(input);
      setError('');
      return { ...result, errorMsg: '' };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      return { optimized: '', dimensions: null, elementCount: 0, errorMsg: msg };
    }
  }, [input]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    marginBottom: 16,
  };

  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 10,
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    padding: 12,
    borderBottom: '1px solid var(--border-color)',
    fontSize: 13,
    fontWeight: 700,
    color: 'var(--text-primary)',
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    padding: 12,
    fontSize: 13,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    background: 'var(--bg-primary)',
    border: 'none',
    color: 'var(--text-primary)',
    outline: 'none',
    resize: 'none',
    minHeight: 400,
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="svg-editor"
    >
      <div style={containerStyle}>
        <div style={panelStyle}>
          <div style={headerStyle}>SVG Code</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="blue" />\n</svg>'}
            style={textareaStyle}
          />
        </div>

        <div style={panelStyle}>
          <div style={headerStyle}>Preview & Info</div>
          <div style={{
            flex: 1,
            padding: 12,
            background: 'var(--bg-primary)',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {!error ? (
              <>
                <div style={{
                  flex: 1,
                  border: '1px solid var(--border-color)',
                  borderRadius: 6,
                  padding: 12,
                  background: 'white',
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 200,
                }}>
                  <div dangerouslySetInnerHTML={{ __html: input }} />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 8,
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}>
                  {dimensions && (
                    <>
                      <div>
                        <strong>Width:</strong> {dimensions.width}px
                      </div>
                      <div>
                        <strong>Height:</strong> {dimensions.height}px
                      </div>
                    </>
                  )}
                  <div>
                    <strong>Elements:</strong> {elementCount}
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                color: 'rgb(239, 68, 68)',
                fontSize: 13,
              }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {optimized && (
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          borderRadius: 10,
          padding: 12,
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>Optimized SVG</span>
            <CopyButton text={optimized} label={dict.common.copy} />
          </div>
          <pre style={{
            padding: 12,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            color: 'var(--accent-emerald)',
            overflow: 'auto',
            maxHeight: 200,
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}>
            {optimized}
          </pre>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
