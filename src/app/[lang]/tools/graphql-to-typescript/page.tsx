'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface GraphQLField {
  name: string;
  type: string;
  nullable: boolean;
  isList: boolean;
  listNullable: boolean;
}

function parseGraphQLType(raw: string): { tsType: string; nullable: boolean } {
  let type = raw.trim();
  let nullable = true;
  if (type.endsWith('!')) {
    nullable = false;
    type = type.slice(0, -1);
  }
  if (type.startsWith('[') && type.endsWith(']')) {
    let inner = type.slice(1, -1);
    let innerNullable = true;
    if (inner.endsWith('!')) {
      innerNullable = false;
      inner = inner.slice(0, -1);
    }
    const mapped = mapScalar(inner);
    const itemType = innerNullable ? `(${mapped} | null)` : mapped;
    return { tsType: `${itemType}[]`, nullable };
  }
  if (type.startsWith('[')) {
    let inner = type.slice(1).replace(/\]!?$/, '');
    let listNonNull = raw.trim().endsWith('!');
    let innerNonNull = false;
    if (inner.endsWith('!')) {
      innerNonNull = true;
      inner = inner.slice(0, -1);
    }
    const mapped = mapScalar(inner);
    const itemType = innerNonNull ? mapped : `(${mapped} | null)`;
    return { tsType: `${itemType}[]`, nullable: !listNonNull };
  }
  return { tsType: mapScalar(type), nullable };
}

function mapScalar(type: string): string {
  switch (type) {
    case 'String': return 'string';
    case 'Int': return 'number';
    case 'Float': return 'number';
    case 'Boolean': return 'boolean';
    case 'ID': return 'string';
    default: return type;
  }
}

function graphqlToTypeScript(sdl: string, useExport: boolean): string {
  const output: string[] = [];
  const lines = sdl.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip comments and empty lines
    if (line === '' || line.startsWith('#')) {
      i++;
      continue;
    }

    // Enum
    const enumMatch = line.match(/^enum\s+(\w+)\s*\{?\s*$/);
    if (enumMatch) {
      const name = enumMatch[1];
      const values: string[] = [];
      i++;
      while (i < lines.length) {
        const eline = lines[i].trim();
        if (eline === '}') { i++; break; }
        if (eline && !eline.startsWith('#')) {
          const val = eline.replace(/,?\s*#.*$/, '').trim();
          if (val) values.push(val);
        }
        i++;
      }
      const prefix = useExport ? 'export ' : '';
      output.push(`${prefix}enum ${name} {\n${values.map(v => `  ${v} = "${v}",`).join('\n')}\n}`);
      continue;
    }

    // Type, Input, Interface
    const typeMatch = line.match(/^(type|input|interface)\s+(\w+)(?:\s+implements\s+\w+(?:\s*&\s*\w+)*)?\s*\{?\s*$/);
    if (typeMatch) {
      const keyword = typeMatch[1];
      const name = typeMatch[2];
      const fields: string[] = [];
      i++;
      while (i < lines.length) {
        const fline = lines[i].trim();
        if (fline === '}') { i++; break; }
        if (fline && !fline.startsWith('#')) {
          // Parse field: name(args): Type or name: Type
          const fieldMatch = fline.match(/^(\w+)(?:\([^)]*\))?\s*:\s*(.+?)(?:\s*#.*)?$/);
          if (fieldMatch) {
            const fieldName = fieldMatch[1];
            const rawType = fieldMatch[2].trim();
            const { tsType, nullable } = parseGraphQLType(rawType);
            const optional = nullable ? '?' : '';
            fields.push(`  ${fieldName}${optional}: ${tsType};`);
          }
        }
        i++;
      }
      const prefix = useExport ? 'export ' : '';
      const tsKeyword = keyword === 'enum' ? 'enum' : 'interface';
      output.push(`${prefix}${tsKeyword} ${name} {\n${fields.join('\n')}\n}`);
      continue;
    }

    // Scalar
    const scalarMatch = line.match(/^scalar\s+(\w+)/);
    if (scalarMatch) {
      const prefix = useExport ? 'export ' : '';
      output.push(`${prefix}type ${scalarMatch[1]} = string;`);
      i++;
      continue;
    }

    // Union
    const unionMatch = line.match(/^union\s+(\w+)\s*=\s*(.+)$/);
    if (unionMatch) {
      const name = unionMatch[1];
      const types = unionMatch[2].split('|').map(t => t.trim()).filter(Boolean);
      const prefix = useExport ? 'export ' : '';
      output.push(`${prefix}type ${name} = ${types.join(' | ')};`);
      i++;
      continue;
    }

    i++;
  }

  return output.join('\n\n');
}

export default function GraphqlToTypeScript() {
  const { dict } = useLang();
  const t = dict.tools['graphql-to-typescript'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [useExport, setUseExport] = useState(true);

  const convert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter GraphQL SDL');
        setOutput('');
        return;
      }
      const result = graphqlToTypeScript(input, useExport);
      if (!result.trim()) {
        setError('No types found in input. Please enter valid GraphQL type definitions.');
        setOutput('');
        return;
      }
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid GraphQL SDL');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(`scalar DateTime

enum Role {
  ADMIN
  USER
  MODERATOR
}

type Address {
  street: String!
  city: String!
  zipCode: String!
  country: String!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  score: Float
  isActive: Boolean!
  role: Role!
  address: Address
  tags: [String!]!
  friends: [User]
  createdAt: DateTime!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
  role: Role!
  tags: [String!]
}

union SearchResult = User | Address`);
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'GraphQL to TypeScript Converter'}
      description={(t.pageDescription as string) || 'Convert GraphQL SDL to TypeScript types and interfaces'}
      toolId="graphql-to-typescript"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useExport} onChange={e => setUseExport(e.target.checked)} /> export
          </label>
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>GraphQL SDL</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={'type User {\n  id: ID!\n  name: String!\n  email: String\n}'} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>TypeScript</label>
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
