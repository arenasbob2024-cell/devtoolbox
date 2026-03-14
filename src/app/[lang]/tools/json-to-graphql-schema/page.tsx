'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToGraphqlSchema() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['json-to-graphql-schema'];

  const [input, setInput] = useState('');
  const [typeName, setTypeName] = useState('Query');
  const [error, setError] = useState('');

  const getTypeFromValue = (value: unknown): string => {
    if (value === null) return 'String';
    if (typeof value === 'boolean') return 'Boolean';
    if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Float';
    if (typeof value === 'string') return 'String';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[String]';
      return `[${getTypeFromValue(value[0])}]`;
    }
    if (typeof value === 'object') return 'Object';
    return 'String';
  };

  const generateSchema = (obj: Record<string, unknown>, name: string): string => {
    const lines: string[] = [];

    lines.push(`type ${name} {`);

    for (const [key, value] of Object.entries(obj)) {
      const fieldType = getTypeFromValue(value);
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      lines.push(`  ${sanitizedKey}: ${fieldType}`);
    }

    lines.push('}');
    return lines.join('\n');
  };

  const output = useMemo(() => {
    if (!input.trim()) {
      setError('');
      return '';
    }

    try {
      const json = JSON.parse(input);

      if (typeof json !== 'object' || json === null || Array.isArray(json)) {
        setError('Input must be a JSON object');
        return '';
      }

      setError('');
      return generateSchema(json, typeName);
    } catch {
      setError('Invalid JSON syntax');
      return '';
    }
  }, [input, typeName]);

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
      toolId="json-to-graphql-schema"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--text-secondary)',
          display: 'block',
          marginBottom: 6,
        }}>
          Type Name
        </label>
        <input
          type="text"
          value={typeName}
          onChange={e => setTypeName(e.target.value || 'Query')}
          placeholder="e.g., User, Product, Post"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: 13,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
      </div>

      <div style={containerStyle}>
        <div style={panelStyle}>
          <div style={headerStyle}>Input JSON</div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'{\n  "name": "John",\n  "age": 30,\n  "active": true,\n  "tags": ["dev", "designer"]\n}'}
            style={textareaStyle}
          />
        </div>

        <div style={panelStyle}>
          <div style={{ ...headerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>GraphQL Schema</span>
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
