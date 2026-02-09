'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToGo(json: string, rootName: string, omitempty: boolean): string {
  const parsed = JSON.parse(json);
  const structs: string[] = [];

  function capitalize(s: string): string {
    return s.replace(/(^|[_-])([a-z])/g, (_, __, c) => c.toUpperCase());
  }

  function goFieldName(key: string): string {
    const name = capitalize(key);
    return name.replace(/Id$/, 'ID').replace(/Url$/, 'URL').replace(/Http/, 'HTTP').replace(/Json/, 'JSON').replace(/Xml/, 'XML').replace(/Api/, 'API');
  }

  function getGoType(value: unknown, key: string): string {
    if (value === null) return 'interface{}';
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]interface{}';
      return '[]' + getGoType(value[0], key);
    }
    switch (typeof value) {
      case 'string': return 'string';
      case 'number': return Number.isInteger(value) ? 'int' : 'float64';
      case 'boolean': return 'bool';
      case 'object': {
        const structName = goFieldName(key);
        generateStruct(value as Record<string, unknown>, structName);
        return structName;
      }
      default: return 'interface{}';
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string): void {
    const fields = Object.entries(obj).map(([key, value]) => {
      const tag = omitempty ? `\`json:"${key},omitempty"\`` : `\`json:"${key}"\``;
      return `\t${goFieldName(key)} ${getGoType(value, key)} ${tag}`;
    });
    structs.push(`type ${name} struct {\n${fields.join('\n')}\n}`);
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateStruct(parsed[0] as Record<string, unknown>, rootName);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateStruct(parsed as Record<string, unknown>, rootName);
  }

  return structs.reverse().join('\n\n');
}

export default function JsonToGo() {
  const { dict } = useLang();
  const t = dict.tools['json-to-go'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [omitempty, setOmitempty] = useState(false);

  const convert = () => {
    try { setOutput(jsonToGo(input, rootName, omitempty)); setError(''); }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Invalid JSON'); setOutput(''); }
  };

  const loadSample = () => {
    setInput(JSON.stringify({ id: 1, name: "John Doe", email: "john@example.com", is_active: true, address: { street: "123 Main St", city: "Springfield", zip_code: "62701" }, tags: ["developer", "golang"], score: 95.5 }, null, 2));
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'JSON to Go Struct Converter'} description={(t.pageDescription as string) || 'Convert JSON to Go struct definitions'} toolId="json-to-go">
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
            <input type="checkbox" checked={omitempty} onChange={e => setOmitempty(e.target.checked)} /> omitempty
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
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>JSON</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Go Struct</label>
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
