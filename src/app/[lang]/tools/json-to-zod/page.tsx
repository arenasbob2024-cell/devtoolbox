'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToZod(json: string, rootName: string): string {
  const parsed = JSON.parse(json);

  function indent(level: number): string {
    return '  '.repeat(level);
  }

  function getZodType(value: unknown, level: number): string {
    if (value === null) return 'z.null()';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'z.array(z.unknown())';
      const itemType = getZodType(value[0], level);
      return `z.array(${itemType})`;
    }
    switch (typeof value) {
      case 'string': return 'z.string()';
      case 'number': return Number.isInteger(value) ? 'z.number().int()' : 'z.number()';
      case 'boolean': return 'z.boolean()';
      case 'object': {
        const obj = value as Record<string, unknown>;
        const entries = Object.entries(obj);
        if (entries.length === 0) return 'z.object({})';
        const fields = entries.map(([key, val]) => {
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          return `${indent(level + 1)}${safeKey}: ${getZodType(val, level + 1)},`;
        });
        return `z.object({\n${fields.join('\n')}\n${indent(level)}})`;
      }
      default: return 'z.unknown()';
    }
  }

  let schema: string;
  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      schema = `const ${rootName} = ${getZodType(parsed[0], 0)};\n\nconst ${rootName}Array = z.array(${rootName});`;
    } else {
      schema = `const ${rootName} = ${getZodType(parsed, 0)};`;
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    schema = `const ${rootName} = ${getZodType(parsed, 0)};`;
  } else {
    schema = `const ${rootName} = ${getZodType(parsed, 0)};`;
  }

  return `import { z } from "zod";\n\n${schema}`;
}

export default function JsonToZod() {
  const { dict } = useLang();
  const t = dict.tools['json-to-zod'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('schema');

  const convert = () => {
    try {
      setOutput(jsonToZod(input, rootName));
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
      title={(t.pageTitle as string) || 'JSON to Zod Schema Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Zod validation schemas'}
      toolId="json-to-zod"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Name:</label>
            <input value={rootName} onChange={e => setRootName(e.target.value || 'schema')} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>Zod Schema</label>
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
