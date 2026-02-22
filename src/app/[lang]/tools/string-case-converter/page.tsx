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

const converters: { id: string; label: string; fn: (s: string) => string }[] = [
  { id: 'camelCase', label: 'camelCase', fn: s => { const w = toWords(s); return w.map((v, i) => i === 0 ? v.toLowerCase() : v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(''); } },
  { id: 'PascalCase', label: 'PascalCase', fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('') },
  { id: 'snake_case', label: 'snake_case', fn: s => toWords(s).map(w => w.toLowerCase()).join('_') },
  { id: 'CONSTANT_CASE', label: 'CONSTANT_CASE', fn: s => toWords(s).map(w => w.toUpperCase()).join('_') },
  { id: 'kebab-case', label: 'kebab-case', fn: s => toWords(s).map(w => w.toLowerCase()).join('-') },
  { id: 'TRAIN-CASE', label: 'TRAIN-CASE', fn: s => toWords(s).map(w => w.toUpperCase()).join('-') },
  { id: 'Title Case', label: 'Title Case', fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') },
  { id: 'Sentence case', label: 'Sentence case', fn: s => { const w = toWords(s); return w.map((v, i) => i === 0 ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() : v.toLowerCase()).join(' '); } },
  { id: 'lowercase', label: 'lowercase', fn: s => s.toLowerCase() },
  { id: 'UPPERCASE', label: 'UPPERCASE', fn: s => s.toUpperCase() },
  { id: 'dot.case', label: 'dot.case', fn: s => toWords(s).map(w => w.toLowerCase()).join('.') },
  { id: 'path/case', label: 'path/case', fn: s => toWords(s).map(w => w.toLowerCase()).join('/') },
  { id: 'no case', label: 'no case', fn: s => toWords(s).map(w => w.toLowerCase()).join(' ') },
  { id: 'sWAP cASE', label: 'sWAP cASE', fn: s => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
];

const ui = {
  pageTitle: 'String Case Converter',
  pageDescription: 'Convert text between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Title Case, lowercase, UPPERCASE, and more.',
  inputLabel: 'Enter your text',
  inputPlaceholder: 'Type or paste text here...\n\ne.g. my variable name',
  copyAll: 'Copy All Results',
  clear: 'Clear',
  seoTitle: 'What Is String Case Conversion?',
  seoContent: 'String case conversion transforms text between different naming conventions used in programming. camelCase is standard in JavaScript, snake_case in Python, kebab-case in CSS/URLs, PascalCase for class names, and CONSTANT_CASE for constants. This tool converts text to 14 formats simultaneously, making it easy to switch naming styles across languages and frameworks.',
};

export default function StringCaseConverterPage() {
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
      toolId="string-case-converter"
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

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
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
                <code style={{ fontSize: 13, fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--text-primary)' }}>
                  {result}
                </code>
              </div>
              <CopyButton text={result} />
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{ui.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{ui.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
