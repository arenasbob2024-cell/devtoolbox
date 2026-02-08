'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

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

function toCamelCase(str: string): string {
  const words = toWords(str);
  return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toPascalCase(str: string): string {
  return toWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

function toSnakeCase(str: string): string {
  return toWords(str).map(w => w.toLowerCase()).join('_');
}

function toKebabCase(str: string): string {
  return toWords(str).map(w => w.toLowerCase()).join('-');
}

function toConstantCase(str: string): string {
  return toWords(str).map(w => w.toUpperCase()).join('_');
}

function toTitleCase(str: string): string {
  return toWords(str).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function toSentenceCase(str: string): string {
  const words = toWords(str);
  return words.map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()).join(' ');
}

function toDotCase(str: string): string {
  return toWords(str).map(w => w.toLowerCase()).join('.');
}

function toPathCase(str: string): string {
  return toWords(str).map(w => w.toLowerCase()).join('/');
}

const conversions = [
  { id: 'camelCase', fn: toCamelCase, example: 'myVariableName' },
  { id: 'PascalCase', fn: toPascalCase, example: 'MyVariableName' },
  { id: 'snake_case', fn: toSnakeCase, example: 'my_variable_name' },
  { id: 'kebab-case', fn: toKebabCase, example: 'my-variable-name' },
  { id: 'CONSTANT_CASE', fn: toConstantCase, example: 'MY_VARIABLE_NAME' },
  { id: 'Title Case', fn: toTitleCase, example: 'My Variable Name' },
  { id: 'Sentence case', fn: toSentenceCase, example: 'My variable name' },
  { id: 'dot.case', fn: toDotCase, example: 'my.variable.name' },
  { id: 'path/case', fn: toPathCase, example: 'my/variable/name' },
];

export default function StringCaseConverter() {
  const { dict } = useLang();
  const t = dict.tools['string-case'];

  const [input, setInput] = useState('');

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="string-case"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, display: 'block' }}>{t.inputLabel}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 80 }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 10 }}>
        {conversions.map(({ id, fn }) => {
          const result = input ? fn(input) : '';
          return (
            <div key={id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--bg-input)', borderRadius: 8, padding: '10px 14px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--accent-blue)', fontWeight: 700, marginBottom: 2 }}>{id}</div>
                <code style={{ fontSize: 13, fontFamily: 'monospace', wordBreak: 'break-all', color: result ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {result || '...'}
                </code>
              </div>
              {result && <CopyButton text={result} />}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
