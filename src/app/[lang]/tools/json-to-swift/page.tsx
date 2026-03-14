'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToSwift(
  json: string,
  rootName: string,
  useCodingKeys: boolean,
  makeOptional: boolean,
  useVar: boolean
): string {
  const parsed = JSON.parse(json);
  const structs: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toPascalCase(s: string): string {
    return s
      .split(/[_\-\s]+/)
      .map((word) => capitalize(word))
      .join('')
      .replace(/[^a-zA-Z0-9]/g, '');
  }

  function toCamelCase(s: string): string {
    const pascal = toPascalCase(s);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  function getSwiftType(value: unknown, name: string): string {
    if (value === null) return 'Any?';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[Any]';
      const types = new Set(value.map((item) => getSwiftType(item, name + 'Item')));
      if (types.size === 1) {
        const baseType = [...types][0];
        return baseType.endsWith('?') ? `[${baseType}]` : `[${baseType}]`;
      }
      return '[Any]';
    }
    switch (typeof value) {
      case 'string': return 'String';
      case 'number': return Number.isInteger(value) ? 'Int' : 'Double';
      case 'boolean': return 'Bool';
      case 'object': {
        const structName = toPascalCase(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)!;
        seen.set(key, structName);
        generateStruct(value as Record<string, unknown>, structName);
        return structName;
      }
      default: return 'Any';
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string): void {
    const varKeyword = useVar ? 'var' : 'let';
    const lines: string[] = [];
    lines.push(`struct ${name}: Codable {`);

    const codingKeys: string[] = [];
    let hasCodingKeys = false;

    for (const [key, value] of Object.entries(obj)) {
      const swiftProperty = toCamelCase(key);
      const type = getSwiftType(value, key);
      const optionalType = makeOptional && value !== null ? `${type}?` : type;

      if (useCodingKeys && key !== swiftProperty) {
        hasCodingKeys = true;
        codingKeys.push(`case ${swiftProperty} = "${key}"`);
      }

      lines.push(`  ${varKeyword} ${swiftProperty}: ${optionalType}`);
    }

    if (hasCodingKeys && useCodingKeys) {
      lines.push('');
      lines.push('  enum CodingKeys: String, CodingKey {');
      for (const key of codingKeys) {
        lines.push(`    ${key}`);
      }
      lines.push('  }');
    }

    lines.push('}');
    structs.push(lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateStruct(parsed[0] as Record<string, unknown>, rootName);
      return structs.reverse().join('\n\n') + `\n\ntype ${rootName}Array = [${rootName}]`;
    }
    return `type ${rootName} = ${getSwiftType(parsed, rootName)}`;
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateStruct(parsed as Record<string, unknown>, rootName);
    return structs.reverse().join('\n\n');
  }

  return `type ${rootName} = ${typeof parsed}`;
}

export default function JsonToSwift() {
  const { dict } = useLang();
  const t = dict.tools['json-to-swift'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [useCodingKeys, setUseCodingKeys] = useState(true);
  const [makeOptional, setMakeOptional] = useState(false);
  const [useVar, setUseVar] = useState(false);

  const convert = () => {
    try {
      const result = jsonToSwift(input, rootName, useCodingKeys, makeOptional, useVar);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      isActive: true,
      address: { street: '123 Main St', city: 'Springfield', zipCode: '62701', country: 'US' },
      tags: ['developer', 'swift'],
      scores: [95, 87, 92],
      metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Swift Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Swift Codable structs instantly'}
      toolId="json-to-swift"
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
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useCodingKeys} onChange={e => setUseCodingKeys(e.target.checked)} /> CodingKeys
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={makeOptional} onChange={e => setMakeOptional(e.target.checked)} /> Optional
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useVar} onChange={e => setUseVar(e.target.checked)} /> var
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON {common.input}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value", ...}' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Swift</label>
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
