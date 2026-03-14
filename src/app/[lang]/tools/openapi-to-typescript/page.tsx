'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function OpenAPIToTypeScript() {
  const { dict } = useLang();
  const t = dict.tools['openapi-to-typescript'] as Record<string, unknown>;
  const common = dict.common;
  const [openApiInput, setOpenApiInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [error, setError] = useState('');

  const mapOpenAPIType = (schema: Record<string, unknown> | unknown): string => {
    if (typeof schema !== 'object' || schema === null) return 'any';
    const s = schema as Record<string, unknown>;

    if (s.type === 'string') return 'string';
    if (s.type === 'integer') return 'number';
    if (s.type === 'number') return 'number';
    if (s.type === 'boolean') return 'boolean';
    if (s.type === 'array') {
      const items = mapOpenAPIType(s.items);
      return `${items}[]`;
    }
    if (s.type === 'object') {
      if (s.properties) {
        const props = s.properties as Record<string, unknown>;
        const fields = Object.entries(props).map(([key, value]) => {
          const optional = !(Array.isArray(s.required) && (s.required as string[]).includes(key)) ? '?' : '';
          const type = mapOpenAPIType(value);
          return `  ${key}${optional}: ${type};`;
        });
        return `{ ${fields.join(' ')} }`;
      }
      return 'Record<string, any>';
    }
    return 'any';
  };

  const generateTypeScriptFromSchema = (spec: Record<string, unknown>): string => {
    const lines: string[] = [];
    const schemas = (spec.components as Record<string, unknown> || {}).schemas as Record<string, unknown> || {};

    const processedRefs = new Set<string>();

    const processSchema = (name: string, schema: Record<string, unknown>, depth = 0): void => {
      if (processedRefs.has(name) || depth > 10) return;
      processedRefs.add(name);

      const indent = '  '.repeat(depth);

      if (schema.type === 'object') {
        lines.push(`export interface ${name} {`);
        const props = schema.properties as Record<string, unknown> || {};
        const required = (schema.required as string[]) || [];

        Object.entries(props).forEach(([propName, propSchema]) => {
          const optional = !required.includes(propName) ? '?' : '';
          const propSchemaObj = propSchema as Record<string, unknown>;

          if (propSchemaObj.$ref) {
            const refType = (propSchemaObj.$ref as string).split('/').pop() || 'any';
            lines.push(`  ${propName}${optional}: ${refType};`);
          } else if (propSchemaObj.oneOf || propSchemaObj.anyOf) {
            const options = ((propSchemaObj.oneOf || propSchemaObj.anyOf) as Record<string, unknown>[]) || [];
            const types = options.map(opt => {
              if (typeof opt === 'object' && opt !== null && '$ref' in opt) {
                return ((opt as Record<string, unknown>).$ref as string).split('/').pop();
              }
              return 'any';
            }).join(' | ');
            lines.push(`  ${propName}${optional}: ${types};`);
          } else {
            const type = mapOpenAPIType(propSchema);
            lines.push(`  ${propName}${optional}: ${type};`);
          }
        });

        lines.push(`}\n`);
      }
    };

    Object.entries(schemas).forEach(([name, schema]) => {
      if (typeof schema === 'object' && schema !== null) {
        processSchema(name, schema as Record<string, unknown>);
      }
    });

    return lines.join('\n');
  };

  const convert = () => {
    setError('');
    setTsOutput('');

    if (!openApiInput.trim()) {
      setError('OpenAPI specification is required');
      return;
    }

    try {
      const parsed = JSON.parse(openApiInput) as Record<string, unknown>;

      if (!parsed.components || !(parsed.components as Record<string, unknown>).schemas) {
        setError('OpenAPI spec must contain components.schemas');
        return;
      }

      const result = generateTypeScriptFromSchema(parsed);
      setTsOutput(result || 'No schemas found in components.schemas');
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setError(`Invalid JSON: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = {
      openapi: '3.0.0',
      info: { title: 'Sample API', version: '1.0.0' },
      components: {
        schemas: {
          User: {
            type: 'object',
            required: ['id', 'name', 'email'],
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              age: { type: 'integer' },
              active: { type: 'boolean' },
            },
          },
          Product: {
            type: 'object',
            required: ['id', 'title'],
            properties: {
              id: { type: 'string' },
              title: { type: 'string' },
              price: { type: 'number' },
              description: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } },
            },
          },
        },
      },
    };
    setOpenApiInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="openapi-to-typescript"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setOpenApiInput(''); setTsOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
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
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>OpenAPI Specification</label>
          <textarea
            value={openApiInput}
            onChange={e => setOpenApiInput(e.target.value)}
            placeholder='{"openapi": "3.0.0", "components": {"schemas": {...}}}'
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>TypeScript Interfaces</label>
          <textarea
            value={tsOutput}
            readOnly
            placeholder="TypeScript interfaces will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {tsOutput && <CopyButton text={tsOutput} />}
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
