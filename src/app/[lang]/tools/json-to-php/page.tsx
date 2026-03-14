'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type OutputMode = 'array' | 'class' | 'object';

export default function JsonToPhp() {
  const { dict } = useLang();
  const t = dict.tools['json-to-php'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<OutputMode>('array');
  const [rootClassName, setRootClassName] = useState('Root');
  const [phpVersion, setPhpVersion] = useState('7.4');

  const sanitizeClassName = (name: string): string => {
    return name.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^[0-9]/, '_$&') || 'Root';
  };

  const escapePhpString = (value: string): string => {
    return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  };

  const getPhpType = (value: unknown): string => {
    if (value === null) return 'mixed';
    if (typeof value === 'boolean') return 'bool';
    if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'float';
    if (typeof value === 'string') return 'string';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object') return 'array';
    return 'mixed';
  };

  const formatValue = (value: unknown, indent: number = 0): string => {
    const spaces = ' '.repeat(indent);
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') return `'${escapePhpString(value)}'`;
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = value.map((v) => `${spaces}  ${formatValue(v, indent + 2)}`).join(',\n');
      return `[\n${items}\n${spaces}]`;
    }
    if (typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      const keys = Object.keys(obj);
      if (keys.length === 0) return '[]';
      const items = keys.map((k) => `${spaces}  '${escapePhpString(k)}' => ${formatValue(obj[k], indent + 2)}`).join(',\n');
      return `[\n${items}\n${spaces}]`;
    }
    return String(value);
  };

  const generatePhpArray = (obj: unknown): string => {
    return `$data = ${formatValue(obj, 0)};\n`;
  };

  const generatePhpClass = (obj: unknown, className: string): string => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      return generatePhpArray(obj);
    }

    const data = obj as Record<string, unknown>;
    const hasTypedProperties = phpVersion !== '5.6' && phpVersion !== '7.0' && phpVersion !== '7.1';
    const properties: string[] = [];
    const constructorParams: string[] = [];
    const constructorAssignments: string[] = [];
    const getters: string[] = [];

    for (const [key, value] of Object.entries(data)) {
      const phpKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
      const phpType = getPhpType(value);
      const camelKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/[-_]([a-z])/g, (_, c) => c.toUpperCase());

      if (hasTypedProperties) {
        properties.push(`    public ${phpType} $${phpKey};`);
        constructorParams.push(`${phpType} $${phpKey}`);
        constructorAssignments.push(`        $this->${phpKey} = $${phpKey};`);
        getters.push(`    public function get${camelKey}(): ${phpType} {\n        return $this->${phpKey};\n    }`);
      } else {
        properties.push(`    public $${phpKey};`);
        constructorParams.push(`$${phpKey}`);
        constructorAssignments.push(`        $this->${phpKey} = $${phpKey};`);
        getters.push(`    public function get${camelKey}() {\n        return $this->${phpKey};\n    }`);
      }
    }

    let code = `class ${className} {\n`;
    if (properties.length > 0) {
      code += properties.join('\n') + '\n\n';
    }

    if (constructorParams.length > 0) {
      code += `    public function __construct(${constructorParams.join(', ')}) {\n`;
      code += constructorAssignments.join('\n') + '\n    }\n\n';
    }

    code += getters.join('\n\n');
    code += '\n}\n';

    return code;
  };

  const generatePhpObject = (obj: unknown): string => {
    return `$data = (object) ${formatValue(obj, 0)};\n`;
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      setError('');

      let result = '';
      if (mode === 'array') {
        result = generatePhpArray(parsed);
      } else if (mode === 'class') {
        result = generatePhpClass(parsed, sanitizeClassName(rootClassName));
      } else {
        result = generatePhpObject(parsed);
      }

      setOutput(result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 28,
      isActive: true,
      skills: ['PHP', 'JavaScript', 'Python'],
      address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="json-to-php"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.outputMode as string}:</label>
            <select
              value={mode}
              onChange={e => setMode(e.target.value as OutputMode)}
              style={{ padding: '4px 8px', fontSize: 12 }}
            >
              <option value="array">PHP Array</option>
              <option value="class">PHP Class</option>
              <option value="object">PHP Object</option>
            </select>
          </div>

          {mode === 'class' && (
            <>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.rootClassName as string}:</label>
                <input
                  type="text"
                  value={rootClassName}
                  onChange={e => setRootClassName(e.target.value)}
                  placeholder="Root"
                  style={{ width: 120, padding: '4px 8px', fontSize: 12 }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.phpVersion as string}:</label>
                <select
                  value={phpVersion}
                  onChange={e => setPhpVersion(e.target.value)}
                  style={{ padding: '4px 8px', fontSize: 12 }}
                >
                  <option value="5.6">PHP 5.6</option>
                  <option value="7.0">PHP 7.0</option>
                  <option value="7.1">PHP 7.1</option>
                  <option value="7.4">PHP 7.4+</option>
                  <option value="8.0">PHP 8.0+</option>
                </select>
              </div>
            </>
          )}
        </div>
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
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON {t.inputLabel as string}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder as string}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>PHP {t.outputLabel as string}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder as string}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
