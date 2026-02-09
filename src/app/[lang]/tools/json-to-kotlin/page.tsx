'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToKotlin(json: string, rootClassName: string, nullable: boolean): string {
  const parsed = JSON.parse(json);
  const dataClasses: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toClassName(key: string): string {
    return capitalize(key.replace(/[^a-zA-Z0-9]/g, ''));
  }

  function toFieldName(key: string): string {
    return key.replace(/[^a-zA-Z0-9]/g, '');
  }

  function getKotlinType(value: unknown, name: string): string {
    if (value === null) return 'String?';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'List<Any>';
      return `List<${getKotlinType(value[0], name + 'Item')}>`;
    }
    switch (typeof value) {
      case 'string': return nullable ? 'String?' : 'String';
      case 'number': {
        const base = Number.isInteger(value) ? 'Int' : 'Double';
        return nullable ? `${base}?` : base;
      }
      case 'boolean': return nullable ? 'Boolean?' : 'Boolean';
      case 'object': {
        const className = toClassName(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)! + (nullable ? '?' : '');
        seen.set(key, className);
        generateDataClass(value as Record<string, unknown>, className);
        return nullable ? `${className}?` : className;
      }
      default: return 'Any';
    }
  }

  function generateDataClass(obj: Record<string, unknown>, name: string): void {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const type = getKotlinType(value, key);
      const fieldName = toFieldName(key);
      const defaultVal = value === null ? ' = null' : '';
      fields.push(`    val ${fieldName}: ${type}${defaultVal}`);
    }
    dataClasses.push(`data class ${name}(\n${fields.join(',\n')}\n)`);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateDataClass(parsed[0] as Record<string, unknown>, rootClassName);
      return dataClasses.reverse().join('\n\n') + `\n\n// Usage: List<${rootClassName}>`;
    }
    const itemType = getKotlinType(parsed[0], rootClassName);
    return `// Type alias\ntypealias ${rootClassName}List = List<${itemType}>`;
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateDataClass(parsed as Record<string, unknown>, rootClassName);
    return dataClasses.reverse().join('\n\n');
  }
  return `// Primitive type\ntypealias ${rootClassName} = ${getKotlinType(parsed, rootClassName)}`;
}

export default function JsonToKotlin() {
  const { dict } = useLang();
  const t = dict.tools['json-to-kotlin'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [nullable, setNullable] = useState(false);

  const convert = () => {
    try {
      const result = jsonToKotlin(input, rootName, nullable);
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
      tags: ["developer", "kotlin"], scores: [95, 87, 92], metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Kotlin Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Kotlin data classes'}
      toolId="json-to-kotlin"
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
            <input type="checkbox" checked={nullable} onChange={e => setNullable(e.target.checked)} /> Nullable
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>Kotlin</label>
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
