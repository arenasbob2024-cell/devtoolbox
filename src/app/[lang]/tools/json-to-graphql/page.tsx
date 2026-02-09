'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToGraphQL(json: string, rootName: string): string {
  const parsed = JSON.parse(json);
  const types: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toTypeName(key: string): string {
    return capitalize(key.replace(/[^a-zA-Z0-9]/g, ''));
  }

  function getGraphQLType(value: unknown, name: string): string {
    if (value === null) return 'String';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[String]';
      return `[${getGraphQLType(value[0], name + 'Item')}]`;
    }
    switch (typeof value) {
      case 'string': return 'String';
      case 'number': return Number.isInteger(value) ? 'Int' : 'Float';
      case 'boolean': return 'Boolean';
      case 'object': {
        const typeName = toTypeName(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)!;
        seen.set(key, typeName);
        generateType(value as Record<string, unknown>, typeName);
        return typeName;
      }
      default: return 'String';
    }
  }

  function generateType(obj: Record<string, unknown>, name: string): void {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const type = getGraphQLType(value, key);
      fields.push(`  ${key}: ${type}`);
    }
    types.push(`type ${name} {\n${fields.join('\n')}\n}`);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateType(parsed[0] as Record<string, unknown>, rootName);
      const allTypes = types.reverse().join('\n\n');
      return allTypes + `\n\ntype Query {\n  items: [${rootName}]\n}`;
    }
    const itemType = getGraphQLType(parsed[0], rootName);
    return `type Query {\n  items: [${itemType}]\n}`;
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateType(parsed as Record<string, unknown>, rootName);
    const allTypes = types.reverse().join('\n\n');
    return allTypes + `\n\ntype Query {\n  ${rootName.charAt(0).toLowerCase() + rootName.slice(1)}: ${rootName}\n}`;
  }
  return `type Query {\n  value: ${getGraphQLType(parsed, rootName)}\n}`;
}

export default function JsonToGraphQL() {
  const { dict } = useLang();
  const t = dict.tools['json-to-graphql'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');

  const convert = () => {
    try {
      const result = jsonToGraphQL(input, rootName);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      id: 1, name: "John Doe", email: "john@example.com", isActive: true,
      address: { street: "123 Main St", city: "Springfield", zipCode: "62701", country: "US" },
      tags: ["developer", "graphql"], scores: [95, 87, 92], metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to GraphQL Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to GraphQL type definitions'}
      toolId="json-to-graphql"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Root:</label>
            <input value={rootName} onChange={e => setRootName(e.target.value || 'Root')} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>GraphQL</label>
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
