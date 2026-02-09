'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function parseValue(value: string): string | number {
  const trimmed = value.trim();
  // Pure numeric px values become numbers (e.g., "16px" -> 16)
  if (/^-?\d+(\.\d+)?px$/.test(trimmed)) {
    return parseFloat(trimmed);
  }
  // Pure numbers stay as numbers
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return parseFloat(trimmed);
  }
  return trimmed;
}

function formatJsValue(value: string | number): string {
  if (typeof value === 'number') return String(value);
  return `"${value.replace(/"/g, '\\"')}"`;
}

function cssToJs(css: string): string {
  const results: string[] = [];
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2].trim();
    const name = selectorToName(selector);
    const props = parseDeclarations(declarations);
    if (props.length > 0) {
      results.push(`const ${name} = {\n${props.map(([k, v]) => `  ${k}: ${formatJsValue(v)},`).join('\n')}\n};`);
    }
  }

  // If no selectors found, treat as raw declarations
  if (results.length === 0) {
    const props = parseDeclarations(css);
    if (props.length > 0) {
      results.push(`const styles = {\n${props.map(([k, v]) => `  ${k}: ${formatJsValue(v)},`).join('\n')}\n};`);
    }
  }

  return results.join('\n\n');
}

function selectorToName(selector: string): string {
  // Convert CSS selector to a valid JS variable name
  let name = selector
    .replace(/^[.#]/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^[^a-zA-Z_$]/, '_');
  if (!name) name = 'styles';
  return name;
}

function parseDeclarations(declarations: string): [string, string | number][] {
  const props: [string, string | number][] = [];
  declarations.split(';').filter(Boolean).forEach(decl => {
    const colonIdx = decl.indexOf(':');
    if (colonIdx === -1) return;
    const prop = decl.substring(0, colonIdx).trim();
    const value = decl.substring(colonIdx + 1).trim();
    if (!prop || !value) return;
    const camelProp = kebabToCamel(prop);
    const jsValue = parseValue(value);
    props.push([camelProp, jsValue]);
  });
  return props;
}

export default function CssToJs() {
  const { dict } = useLang();
  const t = dict.tools['css-to-js'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      const result = cssToJs(input);
      setOutput(result || 'No valid CSS declarations found');
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid CSS');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(`.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  line-height: 1.5;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button {
  padding: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: #3b82f6;
}`);
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'CSS to JS Style Object Converter'}
      description={(t.pageDescription as string) || 'Convert CSS declarations to JavaScript style objects'}
      toolId="css-to-js"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>CSS</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder=".class { font-size: 16px; }" style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JavaScript</label>
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
