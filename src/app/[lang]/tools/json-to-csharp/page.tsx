'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToCSharp(json: string, rootClassName: string, namespace: string): string {
  const parsed = JSON.parse(json);
  const classes: string[] = [];
  const seen = new Map<string, string>();
  let needsList = false;

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  }

  function toClassName(key: string): string {
    return capitalize(key);
  }

  function getCSharpType(value: unknown, key: string): string {
    if (value === null) return 'string?';
    if (Array.isArray(value)) {
      needsList = true;
      if (value.length === 0) return 'List<object>';
      const itemType = getCSharpType(value[0], key + 'Item');
      return `List<${itemType}>`;
    }
    switch (typeof value) {
      case 'string': return 'string';
      case 'number': return Number.isInteger(value) ? 'int' : 'double';
      case 'boolean': return 'bool';
      case 'object': {
        const className = toClassName(key);
        const sortedKeys = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(sortedKeys)) return seen.get(sortedKeys)!;
        seen.set(sortedKeys, className);
        generateClass(value as Record<string, unknown>, className);
        return className;
      }
      default: return 'object';
    }
  }

  function generateClass(obj: Record<string, unknown>, name: string): void {
    const lines: string[] = [];
    lines.push(`    public class ${name}`);
    lines.push('    {');
    for (const [key, value] of Object.entries(obj)) {
      const type = getCSharpType(value, key);
      const propName = capitalize(key);
      lines.push(`        public ${type} ${propName} { get; set; }`);
    }
    lines.push('    }');
    classes.push(lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateClass(parsed[0] as Record<string, unknown>, rootClassName);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateClass(parsed as Record<string, unknown>, rootClassName);
  }

  const usings: string[] = [];
  if (needsList) usings.push('using System.Collections.Generic;');

  const result: string[] = [];
  if (usings.length > 0) {
    result.push(usings.join('\n'));
    result.push('');
  }
  if (namespace) {
    result.push(`namespace ${namespace}`);
    result.push('{');
    result.push(classes.reverse().join('\n\n'));
    result.push('}');
  } else {
    // Without namespace, remove the 4-space indent
    result.push(classes.reverse().map(c =>
      c.split('\n').map(line => line.startsWith('    ') ? line.slice(4) : line).join('\n')
    ).join('\n\n'));
  }

  return result.join('\n');
}

export default function JsonToCSharp() {
  const { dict } = useLang();
  const t = dict.tools['json-to-csharp'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootClassName, setRootClassName] = useState('Root');
  const [namespace, setNamespace] = useState('');

  const convert = () => {
    try {
      const result = jsonToCSharp(input, rootClassName, namespace);
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
      name: "John Doe",
      email: "john@example.com",
      isActive: true,
      salary: 75000.50,
      address: {
        street: "123 Main St",
        city: "Springfield",
        zipCode: "62701",
        country: "US"
      },
      tags: ["developer", "csharp"],
      scores: [95, 87, 92],
      metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to C# Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to C# class definitions'}
      toolId="json-to-csharp"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Root Class:</label>
            <input value={rootClassName} onChange={e => setRootClassName(e.target.value || 'Root')} style={{ width: 80, padding: '4px 8px', fontSize: 12 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Namespace:</label>
            <input value={namespace} onChange={e => setNamespace(e.target.value)} placeholder="(optional)" style={{ width: 120, padding: '4px 8px', fontSize: 12 }} />
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
            <label style={{ fontSize: 13, fontWeight: 600 }}>C# Classes</label>
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
