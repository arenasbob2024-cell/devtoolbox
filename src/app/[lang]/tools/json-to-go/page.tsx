'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface TypeInfo {
  goType: string;
  isArray: boolean;
  elementType?: string;
}

function jsonToGo(json: string, rootName: string, omitempty: boolean, usePointers: boolean): string {
  const parsed = JSON.parse(json);
  const structs: Map<string, string> = new Map();
  const processedTypes = new Set<string>();

  function capitalize(s: string): string {
    return s.replace(/(^|[_-])([a-z])/g, (_, __, c) => c.toUpperCase());
  }

  function goFieldName(key: string): string {
    const name = capitalize(key);
    // Handle common abbreviations
    return name
      .replace(/Id(?=[A-Z]|$)/g, 'ID')
      .replace(/Url(?=[A-Z]|$)/g, 'URL')
      .replace(/Http(?=[A-Z]|$)/g, 'HTTP')
      .replace(/Https(?=[A-Z]|$)/g, 'HTTPS')
      .replace(/Json(?=[A-Z]|$)/g, 'JSON')
      .replace(/Xml(?=[A-Z]|$)/g, 'XML')
      .replace(/Api(?=[A-Z]|$)/g, 'API')
      .replace(/Sql(?=[A-Z]|$)/g, 'SQL')
      .replace(/Db(?=[A-Z]|$)/g, 'DB')
      .replace(/Uuid(?=[A-Z]|$)/g, 'UUID')
      .replace(/Uid(?=[A-Z]|$)/g, 'UID');
  }

  function detectArrayElementType(arr: unknown[]): TypeInfo {
    if (arr.length === 0) {
      return { goType: '[]interface{}', isArray: true };
    }

    // Check if all elements are the same primitive type
    const types = new Set<string>();
    let firstObj: Record<string, unknown> | null = null;

    for (const item of arr) {
      if (item === null) {
        types.add('null');
      } else if (Array.isArray(item)) {
        types.add('array');
      } else if (typeof item === 'object') {
        types.add('object');
        if (!firstObj) {
          firstObj = item as Record<string, unknown>;
        }
      } else {
        types.add(typeof item);
      }
    }

    // If mixed types, use interface{}
    if (types.size > 1) {
      return { goType: '[]interface{}', isArray: true };
    }

    const baseType = Array.from(types)[0];
    if (baseType === 'string') {
      return { goType: '[]string', isArray: true, elementType: 'string' };
    } else if (baseType === 'number') {
      return { goType: '[]float64', isArray: true, elementType: 'float64' };
    } else if (baseType === 'boolean') {
      return { goType: '[]bool', isArray: true, elementType: 'bool' };
    } else if (baseType === 'object' && firstObj) {
      return { goType: '[]interface{}', isArray: true, elementType: 'object' };
    }

    return { goType: '[]interface{}', isArray: true };
  }

  function getGoType(value: unknown, key: string): string {
    if (value === null) return 'interface{}';
    if (Array.isArray(value)) {
      const info = detectArrayElementType(value);
      if (info.elementType === 'object' && value.length > 0) {
        const structName = goFieldName(key);
        generateStruct(value[0] as Record<string, unknown>, structName);
        return '[]' + structName;
      }
      return info.goType;
    }
    switch (typeof value) {
      case 'string': return 'string';
      case 'number': {
        // More sophisticated number detection
        const numVal = value as number;
        if (Number.isInteger(numVal) && numVal >= -2147483648 && numVal <= 2147483647) {
          return 'int';
        } else if (Number.isInteger(numVal)) {
          return 'int64';
        }
        return 'float64';
      }
      case 'boolean': return 'bool';
      case 'object': {
        if (value !== null) {
          const structName = goFieldName(key);
          generateStruct(value as Record<string, unknown>, structName);
          return usePointers ? '*' + structName : structName;
        }
        return 'interface{}';
      }
      default: return 'interface{}';
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string): void {
    if (processedTypes.has(name)) return;
    processedTypes.add(name);

    const fields = Object.entries(obj)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => {
        const fieldName = goFieldName(key);
        const fieldType = getGoType(value, key);
        const jsonTag = omitempty ? ` \`json:"${key},omitempty"\`` : ` \`json:"${key}"\``;
        return `\t${fieldName} ${fieldType}${jsonTag}`;
      });

    const structDef = fields.length > 0
      ? `type ${name} struct {\n${fields.join('\n')}\n}`
      : `type ${name} struct {}`;

    structs.set(name, structDef);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateStruct(parsed[0] as Record<string, unknown>, rootName);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateStruct(parsed as Record<string, unknown>, rootName);
  }

  // Return structs in dependency order (reverse insertion order)
  const result = Array.from(structs.values()).reverse().join('\n\n');
  return result;
}

export default function JsonToGo() {
  const { dict } = useLang();
  const t = dict.tools['json-to-go'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('AutoGenerated');
  const [omitempty, setOmitempty] = useState(false);
  const [usePointers, setUsePointers] = useState(false);
  const [jsonTags, setJsonTags] = useState(true);

  const convert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter valid JSON');
        setOutput('');
        return;
      }
      setOutput(jsonToGo(input, rootName || 'AutoGenerated', omitempty && jsonTags, usePointers));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      address: {
        street: '123 Main St',
        city: 'Springfield',
        zip: '62701',
      },
      tags: ['developer', 'golang'],
      isActive: true,
      score: 95.5,
    };
    setInput(JSON.stringify(sample, null, 2));
    setError('');
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Go Struct Converter'}
      description={(t.pageDescription as string) || 'Convert JSON to Go struct definitions'}
      toolId="json-to-go"
    >
      <div style={{ marginBottom: 20, padding: 14, background: 'var(--bg-secondary)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6, color: 'var(--text-secondary)' }}>Root Struct Name</label>
            <input
              type="text"
              value={rootName}
              onChange={(e) => setRootName(e.target.value || 'AutoGenerated')}
              placeholder="AutoGenerated"
              style={{
                width: '100%',
                padding: '8px 10px',
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={jsonTags} onChange={(e) => setJsonTags(e.target.checked)} style={{ cursor: 'pointer' }} />
            JSON Tags
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={omitempty} onChange={(e) => setOmitempty(e.target.checked)} disabled={!jsonTags} style={{ cursor: jsonTags ? 'pointer' : 'not-allowed', opacity: jsonTags ? 1 : 0.5 }} />
            omitempty Tags
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <input type="checkbox" checked={usePointers} onChange={(e) => setUsePointers(e.target.checked)} style={{ cursor: 'pointer' }} />
            Use Pointers
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">
          {common.convert}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {common.loadSample}
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          {common.clear}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--accent-rose)',
          }}
        >
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block', color: 'var(--text-primary)' }}>JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            style={{
              width: '100%',
              minHeight: 350,
              padding: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Go Struct Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Go struct definitions will appear here..."
            style={{
              width: '100%',
              minHeight: 350,
              padding: '12px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              background: 'var(--bg-primary)',
              color: output ? 'var(--text-primary)' : 'var(--text-secondary)',
              opacity: output ? 1 : 0.7,
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>{t.seoContent as string}</p>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, marginTop: 20, color: 'var(--text-primary)' }}>Features & Options</h3>
          <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16, paddingLeft: 20 }}>
            <li>
              <strong>JSON Tags:</strong> Automatically adds `json:"fieldName"` struct tags for JSON marshaling/unmarshaling
            </li>
            <li>
              <strong>omitempty Tags:</strong> Include the omitempty directive for optional fields (requires JSON Tags enabled)
            </li>
            <li>
              <strong>Use Pointers:</strong> Generate pointer types for nested structs (useful for optional nested objects)
            </li>
            <li>
              <strong>PascalCase Conversion:</strong> Field names are automatically converted from snake_case or camelCase to Go-idiomatic PascalCase
            </li>
            <li>
              <strong>Smart Type Detection:</strong> Handles strings, integers, floats, booleans, arrays, nested objects, and null values
            </li>
            <li>
              <strong>Abbreviation Handling:</strong> Common abbreviations like ID, URL, API, JSON, XML, etc. are properly capitalized
            </li>
            <li>
              <strong>Arrays of Objects:</strong> Generates separate structs for array elements
            </li>
          </ul>

          {typeof (t as Record<string, unknown>).faqTitle === 'string' && (
            <>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, marginTop: 20, color: 'var(--text-primary)' }}>
                {(t as Record<string, unknown>).faqTitle}
              </h3>
              <div style={{ display: 'grid', gap: 12 }}>
                {Array.isArray((t as Record<string, unknown>).faqs) &&
                  ((t as Record<string, unknown>).faqs as Array<{ q: string; a: string }>).map((faq, idx) => (
                    <div key={idx} style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 6, border: '1px solid var(--border-color)' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{faq.q}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
