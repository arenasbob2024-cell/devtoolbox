'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '')
    .toLowerCase()
    .replace(/_+/g, '_');
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toStructName(key: string): string {
  return key
    .split(/[-_\s]+/)
    .map(capitalize)
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '');
}

function jsonToRust(
  json: string,
  rootName: string,
  derives: string[],
  pubFields: boolean
): string {
  const parsed = JSON.parse(json);
  const structs: string[] = [];
  const seen = new Map<string, string>();
  const useStatements: string[] = [];

  const hasSerdeDerive = derives.some(d => d === 'Serialize' || d === 'Deserialize');
  if (hasSerdeDerive) {
    useStatements.push('use serde::{Serialize, Deserialize};');
  }

  function getRustType(value: unknown, key: string): string {
    if (value === null) return 'Option<String>';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'Vec<serde_json::Value>';
      const itemType = getRustType(value[0], key + '_item');
      return `Vec<${itemType}>`;
    }
    switch (typeof value) {
      case 'string': return 'String';
      case 'number': return Number.isInteger(value) ? 'i64' : 'f64';
      case 'boolean': return 'bool';
      case 'object': {
        const structName = toStructName(key);
        const sortedKeys = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(sortedKeys)) return seen.get(sortedKeys)!;
        seen.set(sortedKeys, structName);
        generateStruct(value as Record<string, unknown>, structName);
        return structName;
      }
      default: return 'String';
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string): void {
    const deriveStr = derives.length > 0 ? `#[derive(${derives.join(', ')})]\n` : '';
    const vis = pubFields ? 'pub ' : '';
    const fields: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = toSnakeCase(key);
      const rustType = getRustType(value, key);
      const needsRename = snakeKey !== key;
      if (needsRename && hasSerdeDerive) {
        fields.push(`    #[serde(rename = "${key}")]\n    ${vis}${snakeKey}: ${rustType},`);
      } else {
        fields.push(`    ${vis}${snakeKey}: ${rustType},`);
      }
    }

    structs.push(`${deriveStr}pub struct ${name} {\n${fields.join('\n')}\n}`);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateStruct(parsed[0] as Record<string, unknown>, rootName);
    } else {
      const itemType = parsed.length > 0 ? getRustType(parsed[0], 'item') : 'serde_json::Value';
      structs.push(`pub type ${rootName} = Vec<${itemType}>;`);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateStruct(parsed as Record<string, unknown>, rootName);
  } else {
    structs.push(`pub type ${rootName} = ${getRustType(parsed, rootName)};`);
  }

  const parts: string[] = [];
  if (useStatements.length > 0) {
    parts.push(useStatements.join('\n'));
    parts.push('');
  }
  parts.push(structs.reverse().join('\n\n'));

  return parts.join('\n');
}

export default function JsonToRust() {
  const { dict } = useLang();
  const t = dict.tools['json-to-rust'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [useDebug, setUseDebug] = useState(true);
  const [useClone, setUseClone] = useState(true);
  const [useSerialize, setUseSerialize] = useState(true);
  const [useDeserialize, setUseDeserialize] = useState(true);
  const [pubFields, setPubFields] = useState(true);

  const convert = () => {
    try {
      const derives: string[] = [];
      if (useDebug) derives.push('Debug');
      if (useClone) derives.push('Clone');
      if (useSerialize) derives.push('Serialize');
      if (useDeserialize) derives.push('Deserialize');
      const result = jsonToRust(input, rootName, derives, pubFields);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      userId: 1,
      userName: "John Doe",
      email: "john@example.com",
      isActive: true,
      score: 95.5,
      address: {
        streetName: "123 Main St",
        cityName: "Springfield",
        zipCode: "62701"
      },
      tags: ["developer", "rust"],
      metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Rust Struct Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Rust struct definitions with serde support'}
      toolId="json-to-rust"
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
            <input type="checkbox" checked={pubFields} onChange={e => setPubFields(e.target.checked)} /> pub
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useDebug} onChange={e => setUseDebug(e.target.checked)} /> Debug
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useClone} onChange={e => setUseClone(e.target.checked)} /> Clone
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useSerialize} onChange={e => setUseSerialize(e.target.checked)} /> Serialize
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useDeserialize} onChange={e => setUseDeserialize(e.target.checked)} /> Deserialize
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>Rust Struct</label>
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
