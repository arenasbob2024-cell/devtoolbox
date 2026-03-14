'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToTypeScript(json: string, rootName: string, useExport: boolean, useReadonly: boolean): string {
  const parsed = JSON.parse(json);
  const interfaces: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toInterfaceName(key: string): string {
    return capitalize(key.replace(/[^a-zA-Z0-9]/g, ''));
  }

  function getType(value: unknown, name: string): string {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'unknown[]';
      const types = new Set(value.map((item) => getType(item, name + 'Item')));
      if (types.size === 1) return `${[...types][0]}[]`;
      return `(${[...types].join(' | ')})[]`;
    }
    switch (typeof value) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      case 'object': {
        const interfaceName = toInterfaceName(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)!;
        seen.set(key, interfaceName);
        generateInterface(value as Record<string, unknown>, interfaceName);
        return interfaceName;
      }
      default: return 'unknown';
    }
  }

  function generateInterface(obj: Record<string, unknown>, name: string): void {
    const prefix = useExport ? 'export ' : '';
    const ro = useReadonly ? 'readonly ' : '';
    const lines: string[] = [];
    lines.push(`${prefix}interface ${name} {`);
    for (const [key, value] of Object.entries(obj)) {
      const type = getType(value, key);
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      lines.push(`  ${ro}${safeKey}: ${type};`);
    }
    lines.push('}');
    interfaces.push(lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateInterface(parsed[0] as Record<string, unknown>, rootName);
      return interfaces.reverse().join('\n\n') + `\n\ntype ${rootName}Array = ${rootName}[];`;
    }
    return `type ${rootName} = ${getType(parsed, rootName)};`;
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateInterface(parsed as Record<string, unknown>, rootName);
    return interfaces.reverse().join('\n\n');
  }
  return `type ${rootName} = ${typeof parsed};`;
}

export default function JsonToTypeScript() {
  const { dict, lang } = useLang();
  const t = dict.tools['json-to-typescript'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [useExport, setUseExport] = useState(true);
  const [useReadonly, setUseReadonly] = useState(false);

  const convert = () => {
    try {
      const result = jsonToTypeScript(input, rootName, useExport, useReadonly);
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
      tags: ["developer", "typescript"], scores: [95, 87, 92], metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to TypeScript Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to TypeScript interfaces and types instantly'}
      toolId="json-to-typescript"
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
            <input type="checkbox" checked={useExport} onChange={e => setUseExport(e.target.checked)} /> export
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useReadonly} onChange={e => setUseReadonly(e.target.checked)} /> readonly
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

      {/* FAQ Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Why convert JSON to TypeScript?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>Converting JSON to TypeScript interfaces provides type safety, IDE autocompletion, and compile-time error checking. Instead of treating data as <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>any</code>, TypeScript ensures you use the correct properties and types, preventing runtime errors and improving code quality.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>When should I use interface vs type?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>This tool generates <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>interfaces</code> by default. Use interfaces for object shapes (they're better for OOP patterns and declaration merging). Use <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>type</code> for unions, primitives, and more functional approaches. For JSON conversion, interfaces are preferred.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>How do nested objects get converted?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>This tool generates separate interfaces for each nested object. For example, if your JSON has a <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>user: {'{'} name, email {'}'}</code>, it creates a <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>User</code> interface and a <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>Root</code> interface that uses it. This keeps types clean and reusable.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>How are optional properties handled?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>This tool marks all properties as required by default. If you need optional properties (marked with <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>{'?'}</code>), you should manually add them or use the <code style={{ background: '#1e1e2e', padding: '2px 6px', borderRadius: 4 }}>readonly</code> checkbox to add that modifier. See <a href={`/${lang}/tools/json-formatter`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>JSON Formatter</a> to validate your JSON structure first.</div>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Why convert JSON to TypeScript?", "acceptedAnswer": { "@type": "Answer", "text": "Converting provides type safety, IDE autocompletion, and compile-time error checking. TypeScript ensures you use correct properties and types, preventing runtime errors." } },
            { "@type": "Question", "name": "When should I use interface vs type?", "acceptedAnswer": { "@type": "Answer", "text": "This tool generates interfaces, which are better for OOP patterns and object shapes. Use type for unions, primitives, and functional approaches. For JSON conversion, interfaces are preferred." } },
            { "@type": "Question", "name": "How do nested objects get converted?", "acceptedAnswer": { "@type": "Answer", "text": "This tool generates separate interfaces for each nested object. For example, a user object creates a User interface and a Root interface that uses it, keeping types clean and reusable." } },
            { "@type": "Question", "name": "How are optional properties handled?", "acceptedAnswer": { "@type": "Answer", "text": "This tool marks all properties as required by default. For optional properties, manually add the ? modifier. Use the readonly checkbox to add that modifier." } }
          ]
        }) }} />
      </div>
    </ToolLayout>
  );
}
