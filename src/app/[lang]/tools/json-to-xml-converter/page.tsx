'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToXmlConverter() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['json-to-xml-converter'];

  const [input, setInput] = useState('');
  const [rootElement, setRootElement] = useState('root');
  const [indentation, setIndentation] = useState('2');
  const [useAttributes, setUseAttributes] = useState(false);
  const [error, setError] = useState('');

  const jsonToXml = (obj: unknown, root: string, indent: number, asAttrs: boolean): string => {
    const indentStr = ' '.repeat(indent);
    const nextIndent = ' '.repeat(indent + 2);

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return `${indentStr}<${root}>${String(obj)}</${root}>`;
    }

    if (obj === null) {
      return `${indentStr}<${root}/>`;
    }

    if (Array.isArray(obj)) {
      const items = (obj as unknown[]).map((item, idx) => jsonToXml(item, 'item', indent + 2, asAttrs)).join('\n');
      return `${indentStr}<${root}>\n${items}\n${indentStr}</${root}>`;
    }

    if (typeof obj === 'object') {
      const entries = Object.entries(obj as Record<string, unknown>);
      if (entries.length === 0) {
        return `${indentStr}<${root}/>`;
      }

      if (asAttrs && entries.length <= 3 && entries.every(([_, v]) => typeof v === 'string' || typeof v === 'number')) {
        const attrs = entries.map(([k, v]) => `${k}="${String(v)}"`).join(' ');
        return `${indentStr}<${root} ${attrs}/>`;
      }

      const children = entries.map(([key, value]) => {
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
        return jsonToXml(value, sanitizedKey, indent + 2, asAttrs);
      }).join('\n');

      return `${indentStr}<${root}>\n${children}\n${indentStr}</${root}>`;
    }

    return '';
  };

  const output = useMemo(() => {
    if (!input.trim()) {
      setError('');
      return '';
    }

    try {
      const json = JSON.parse(input);
      const indentNum = Math.max(0, parseInt(indentation) || 2);
      const xml = jsonToXml(json, rootElement || 'root', 0, useAttributes);
      setError('');
      return xml;
    } catch {
      setError('Invalid JSON syntax');
      return '';
    }
  }, [input, rootElement, indentation, useAttributes]);

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

  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: 4,
  };

  const inputStyle: React.CSSProperties = {
    padding: '6px 8px',
    fontSize: 12,
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 4,
    color: 'var(--text-primary)',
    outline: 'none',
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-xml-converter"
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr auto',
        gap: 12,
        marginBottom: 16,
        alignItems: 'flex-end',
      }}>
        <div>
          <label style={labelStyle}>Root Element</label>
          <input
            type="text"
            value={rootElement}
            onChange={e => setRootElement(e.target.value || 'root')}
            style={{ ...inputStyle, width: '100%' }}
          />
        </div>
        <div>
          <label style={labelStyle}>Indentation (spaces)</label>
          <input
            type="number"
            value={indentation}
            onChange={e => setIndentation(e.target.value)}
            min="0"
            max="8"
            style={{ ...inputStyle, width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="checkbox"
            id="useAttributes"
            checked={useAttributes}
            onChange={e => setUseAttributes(e.target.checked)}
          />
          <label htmlFor="useAttributes" style={{ fontSize: 12, cursor: 'pointer', margin: 0 }}>
            Use attributes
          </label>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={panelStyle}>
          <div style={headerStyle}>Input JSON</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'{\n  "user": {\n    "name": "John",\n    "age": 30,\n    "email": "john@example.com"\n  }\n}'}
            style={textareaStyle}
          />
        </div>

        <div style={panelStyle}>
          <div style={{ ...headerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Output XML</span>
            {output && <CopyButton text={output} label={dict.common.copy} />}
          </div>
          <pre style={{
            flex: 1,
            padding: 12,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: 'var(--bg-primary)',
            color: 'var(--accent-emerald)',
            border: 'none',
            margin: 0,
            overflow: 'auto',
            minHeight: 400,
          }}>
            {output || (dict.common.resultPlaceholder || 'Result will appear here...')}
          </pre>
        </div>
      </div>

      {error && (
        <div style={{
          padding: 12,
          borderRadius: 6,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          color: 'rgb(239, 68, 68)',
          fontSize: 13,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
