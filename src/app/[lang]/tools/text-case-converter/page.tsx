'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

function toWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_./\\]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

const converters: { id: string; label: string; example: string; fn: (s: string) => string }[] = [
  {
    id: 'camelCase',
    label: 'camelCase',
    example: 'myVariableName',
    fn: s => {
      const w = toWords(s);
      return w.map((v, i) => i === 0 ? v.toLowerCase() : v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join('');
    },
  },
  {
    id: 'PascalCase',
    label: 'PascalCase',
    example: 'MyVariableName',
    fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(''),
  },
  {
    id: 'snake_case',
    label: 'snake_case',
    example: 'my_variable_name',
    fn: s => toWords(s).map(w => w.toLowerCase()).join('_'),
  },
  {
    id: 'CONSTANT_CASE',
    label: 'CONSTANT_CASE',
    example: 'MY_VARIABLE_NAME',
    fn: s => toWords(s).map(w => w.toUpperCase()).join('_'),
  },
  {
    id: 'kebab-case',
    label: 'kebab-case',
    example: 'my-variable-name',
    fn: s => toWords(s).map(w => w.toLowerCase()).join('-'),
  },
  {
    id: 'TRAIN-CASE',
    label: 'TRAIN-CASE',
    example: 'MY-VARIABLE-NAME',
    fn: s => toWords(s).map(w => w.toUpperCase()).join('-'),
  },
  {
    id: 'Title Case',
    label: 'Title Case',
    example: 'My Variable Name',
    fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
  },
  {
    id: 'Sentence case',
    label: 'Sentence case',
    example: 'My variable name',
    fn: s => {
      const w = toWords(s);
      return w.map((v, i) => i === 0 ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()).join(' ');
    },
  },
  {
    id: 'lowercase',
    label: 'lowercase',
    example: 'my variable name',
    fn: s => s.toLowerCase(),
  },
  {
    id: 'UPPERCASE',
    label: 'UPPERCASE',
    example: 'MY VARIABLE NAME',
    fn: s => s.toUpperCase(),
  },
  {
    id: 'dot.case',
    label: 'dot.case',
    example: 'my.variable.name',
    fn: s => toWords(s).map(w => w.toLowerCase()).join('.'),
  },
  {
    id: 'path/case',
    label: 'path/case',
    example: 'my/variable/name',
    fn: s => toWords(s).map(w => w.toLowerCase()).join('/'),
  },
  {
    id: 'no case',
    label: 'no case',
    example: 'my variable name',
    fn: s => toWords(s).map(w => w.toLowerCase()).join(' '),
  },
  {
    id: 'sWAP cASE',
    label: 'sWAP cASE',
    example: 'mY vARIABLE nAME',
    fn: s => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
  },
];

const ui = {
  pageTitle: 'Text Case Converter',
  pageDescription: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, UPPERCASE, lowercase, Title Case, dot.case and 14 more formats instantly.',
  inputLabel: 'Enter your text',
  inputPlaceholder: 'Type or paste text here...\n\ne.g. Hello World Example',
  copyAll: 'Copy All Results',
  clear: 'Clear',
  loadSample: 'Load Sample',
  seoTitle: 'What Is Text Case Conversion?',
  seoContent: 'Text case conversion transforms text between different casing and naming conventions. Developers use camelCase in JavaScript, snake_case in Python and Ruby, kebab-case in CSS and URLs, PascalCase for class names, and CONSTANT_CASE for constants. This converter supports 14 formats simultaneously, saving time when switching between languages, frameworks, or style guides. All processing happens in your browser -- your data never leaves your device.',
};

const sampleTexts = [
  'hello world example',
  'my-variable-name',
  'firstName',
  'SOME_CONSTANT_VALUE',
  'The Quick Brown Fox',
];

export default function TextCaseConverterPage() {
  const [input, setInput] = useState('');

  const results = useMemo(() => {
    if (!input.trim()) return [];
    return converters.map(c => ({ ...c, result: c.fn(input) }));
  }, [input]);

  const allText = results.map(r => `${r.label}: ${r.result}`).join('\n');

  return (
    <ToolLayout
      title={ui.pageTitle}
      description={ui.pageDescription}
      toolId="text-case-converter"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{ui.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={ui.inputPlaceholder}
          style={{ minHeight: 80 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={() => setInput(sampleTexts[Math.floor(Math.random() * sampleTexts.length)])} className="btn btn-secondary">{ui.loadSample}</button>
        <button onClick={() => setInput('')} className="btn btn-secondary">{ui.clear}</button>
        {results.length > 0 && <CopyButton text={allText} label={ui.copyAll} />}
      </div>

      {results.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 10 }}>
          {results.map(({ id, label, result }) => (
            <div key={id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--bg-input)', borderRadius: 8, padding: '10px 14px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 2 }}>{label}</div>
                <code style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', wordBreak: 'break-all', color: 'var(--text-primary)' }}>
                  {result}
                </code>
              </div>
              <CopyButton text={result} />
            </div>
          ))}
        </div>
      )}

      {!input.trim() && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Supported Formats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 8 }}>
            {converters.map(c => (
              <div key={c.id} style={{
                background: 'var(--bg-input)', borderRadius: 6, padding: '8px 12px',
                border: '1px solid var(--border-color)', fontSize: 13,
              }}>
                <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{c.label}</span>
                <span style={{ color: 'var(--text-secondary)', marginLeft: 8 }}>{c.example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
