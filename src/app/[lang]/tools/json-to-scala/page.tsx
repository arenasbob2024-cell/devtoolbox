'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function toPascalCase(str: string): string {
  return str
    .split(/[\s_-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function getScalaType(value: any): string {
  if (value === null) return 'Option[Any]';
  if (typeof value === 'boolean') return 'Boolean';
  if (typeof value === 'number') return Number.isInteger(value) ? 'Int' : 'Double';
  if (typeof value === 'string') return 'String';
  if (Array.isArray(value)) {
    if (value.length === 0) return 'List[Any]';
    const elementType = getScalaType(value[0]);
    return `List[${elementType}]`;
  }
  if (typeof value === 'object') return toPascalCase(Object.keys(value)[0] || 'Item');
  return 'Any';
}

function generateScalaCaseClass(obj: any, className: string, indent: number = 0): string {
  const spaces = ' '.repeat(indent);
  const innerSpaces = ' '.repeat(indent + 2);
  let result = `${spaces}case class ${className}(\n`;

  const keys = Object.keys(obj);
  keys.forEach((key, index) => {
    const fieldName = toCamelCase(key);
    const fieldType = getScalaType(obj[key]);
    const isLast = index === keys.length - 1;
    result += `${innerSpaces}${fieldName}: ${fieldType}${isLast ? '' : ','}\n`;
  });

  result += `${spaces})\n`;
  return result;
}

function jsonToScala(json: string, packageName: string, includeCompanion: boolean): string {
  const obj = JSON.parse(json);
  let result = '';

  if (packageName.trim()) {
    result += `package ${packageName}\n\n`;
  }

  const className = toPascalCase(Object.keys(obj)[0] || 'Data');
  result += generateScalaCaseClass(obj, className);

  if (includeCompanion) {
    result += `\nobject ${className} {\n`;
    result += `  def empty(): ${className} = ${className}(\n`;
    const keys = Object.keys(obj);
    keys.forEach((key, index) => {
      const fieldName = toCamelCase(key);
      const isLast = index === keys.length - 1;
      result += `    ${fieldName} = null${isLast ? '' : ','}\n`;
    });
    result += `  )\n`;
    result += `}\n`;
  }

  return result;
}

export default function JsonToScala() {
  const { dict } = useLang();
  const t = dict.tools['json-to-scala'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [packageName, setPackageName] = useState('com.example');
  const [includeCompanion, setIncludeCompanion] = useState(false);

  const convert = () => {
    try {
      const result = jsonToScala(input, packageName, includeCompanion);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      active: true,
      tags: ['scala', 'developer'],
      metadata: {
        created: '2026-03-14',
        verified: true
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-scala"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.packageName}:</label>
          <input
            type="text"
            value={packageName}
            onChange={e => setPackageName(e.target.value)}
            placeholder="com.example"
            style={{ padding: '4px 8px', fontSize: 12, minWidth: 150 }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={includeCompanion}
            onChange={e => setIncludeCompanion(e.target.checked)}
          />
          {t.companionObject}
        </label>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {dict.common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
