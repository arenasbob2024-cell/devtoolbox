'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToJsonSchema(json: string, title: string): string {
  const parsed = JSON.parse(json);

  function getSchema(value: unknown): Record<string, unknown> {
    if (value === null) return { type: 'null' };
    if (Array.isArray(value)) {
      if (value.length === 0) return { type: 'array', items: {} };
      const itemSchema = getSchema(value[0]);
      return { type: 'array', items: itemSchema };
    }
    switch (typeof value) {
      case 'string': return { type: 'string' };
      case 'number': return Number.isInteger(value) ? { type: 'integer' } : { type: 'number' };
      case 'boolean': return { type: 'boolean' };
      case 'object': {
        const obj = value as Record<string, unknown>;
        const properties: Record<string, unknown> = {};
        const required: string[] = [];
        for (const [key, val] of Object.entries(obj)) {
          properties[key] = getSchema(val);
          required.push(key);
        }
        return {
          type: 'object',
          properties,
          required,
        };
      }
      default: return {};
    }
  }

  const schema = getSchema(parsed);
  const result = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title,
    ...schema,
  };

  return JSON.stringify(result, null, 2);
}

export default function JsonToJsonSchema() {
  const { dict } = useLang();
  const t = dict.tools['json-to-json-schema'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('Root');

  const convert = () => {
    try {
      setOutput(jsonToJsonSchema(input, title));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      id: 1, name: "John Doe", email: "john@example.com", isActive: true,
      address: { street: "123 Main St", city: "Springfield", zipCode: "62701" },
      tags: ["developer", "typescript"], scores: [95, 87, 92], metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to JSON Schema Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to JSON Schema (draft-07)'}
      toolId="json-to-json-schema"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Title:</label>
            <input value={title} onChange={e => setTitle(e.target.value || 'Root')} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          </div>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON {common.input}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value", ...}' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON Schema</label>
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
