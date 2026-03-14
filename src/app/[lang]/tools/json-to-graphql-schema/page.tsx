'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToGraphQLSchema() {
  const { dict } = useLang();
  const t = dict.tools['json-to-graphql-schema'] as Record<string, unknown>;
  const common = dict.common;
  const [jsonInput, setJsonInput] = useState('');
  const [graphqlOutput, setGraphqlOutput] = useState('');
  const [rootTypeName, setRootTypeName] = useState('Query');
  const [error, setError] = useState('');

  const detectType = (value: unknown): string => {
    if (value === null) return 'String';
    if (typeof value === 'string') return 'String';
    if (typeof value === 'number') {
      if (Number.isInteger(value)) return 'Int';
      return 'Float';
    }
    if (typeof value === 'boolean') return 'Boolean';
    if (Array.isArray(value)) return 'Object';
    if (typeof value === 'object') return 'Object';
    return 'String';
  };

  const jsonToGraphQL = (obj: unknown, typeName: string = rootTypeName, visited = new Set<string>()): string => {
    if (visited.has(typeName)) return '';
    visited.add(typeName);

    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return '';

    const fields: string[] = [];
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const type = detectType(value);
      let fieldType = type;

      if (type === 'Object') {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const nestedTypeName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([_-])/g, (match) => '');
          fieldType = nestedTypeName;
        }
      }

      fields.push(`  ${key}: ${fieldType}`);
    }

    let schema = `type ${typeName} {\n${fields.join('\n')}\n}\n`;

    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedTypeName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([_-])/g, (match) => '');
        schema += jsonToGraphQL(value, nestedTypeName, visited);
      }
    }

    return schema;
  };

  const convert = () => {
    setError('');
    setGraphqlOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        setError('JSON must be an object');
        return;
      }

      const result = jsonToGraphQL(parsed, rootTypeName);
      setGraphqlOutput(result);
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setError(`Invalid JSON: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      active: true,
      address: {
        street: '123 Main St',
        city: 'Springfield',
        zipCode: '12345',
      },
      tags: ['developer', 'javascript'],
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="json-to-graphql-schema"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setJsonInput(''); setGraphqlOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <label style={{ fontSize: 13, fontWeight: 600 }}>Root Type Name:</label>
        <input
          type="text"
          value={rootTypeName}
          onChange={e => setRootTypeName(e.target.value || 'Query')}
          placeholder="Query"
          style={{ flex: 1, maxWidth: 200 }}
        />
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{common.input} JSON</label>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>GraphQL SDL</label>
          <textarea
            value={graphqlOutput}
            readOnly
            placeholder="GraphQL schema will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {graphqlOutput && <CopyButton text={graphqlOutput} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
