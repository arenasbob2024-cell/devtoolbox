'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface StructField {
  name: string;
  type: string;
  optional: boolean;
}

export default function JsonToRustSerde() {
  const { dict } = useLang();
  const t = dict.tools['json-to-rust-serde'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [deriveClone, setDeriveClone] = useState(true);
  const [deriveDebug, setDeriveDebug] = useState(true);
  const [renameAllCase, setRenameAllCase] = useState('none');

  const convertToRustType = (value: any): string => {
    if (value === null) return 'Option<String>';
    if (typeof value === 'string') return 'String';
    if (typeof value === 'number') {
      if (Number.isInteger(value)) return 'i32';
      return 'f64';
    }
    if (typeof value === 'boolean') return 'bool';
    if (Array.isArray(value)) {
      const itemType = value.length > 0 ? convertToRustType(value[0]) : 'String';
      return `Vec<${itemType}>`;
    }
    if (typeof value === 'object') return 'Object';
    return 'String';
  };

  const toPascalCase = (str: string): string => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/_/g, '');
  };

  const applyRenameCase = (field: string, caseType: string): string => {
    if (caseType === 'snake') {
      return field.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
    if (caseType === 'camel') {
      return field.charAt(0).toLowerCase() + field.slice(1);
    }
    return field;
  };

  const generateRustStruct = (json: any, structName: string = 'Data'): string => {
    const derives: string[] = ['Serialize', 'Deserialize'];
    if (deriveClone) derives.push('Clone');
    if (deriveDebug) derives.push('Debug');

    let output = `#[derive(${derives.join(', ')})]\npub struct ${toPascalCase(structName)} {\n`;

    if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
      const fields = Object.keys(json).map((key) => {
        const value = json[key];
        const rustType = convertToRustType(value);
        const optional = value === null ? '?' : '';
        const fieldType = optional && rustType === 'Option<String>' ? 'Option<String>' : rustType;

        let fieldLine = `    pub ${key}: ${fieldType}`;
        if (renameAllCase !== 'none') {
          const renamedKey = applyRenameCase(key, renameAllCase);
          if (renamedKey !== key) {
            fieldLine = `    #[serde(rename = "${renamedKey}")]\n    pub ${key}: ${fieldType}`;
          }
        }
        return fieldLine;
      });

      output += fields.join(',\n') + ',\n';
    }

    output += '}\n';
    return output;
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const rust = generateRustStruct(parsed, 'ResponseData');
      setOutput(rust);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = {
      id: 123,
      username: 'john_doe',
      email: 'john@example.com',
      is_active: true,
      score: 98.5,
      tags: ['rust', 'coding'],
      profile: {
        bio: 'Software developer',
        followers: 1000
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-rust-serde"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn || 'Convert'}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <select
          value={renameAllCase}
          onChange={e => setRenameAllCase(e.target.value)}
          style={{ padding: '6px 10px', fontSize: 13 }}
        >
          <option value="none">No rename</option>
          <option value="snake">rename_all snake_case</option>
          <option value="camel">rename_all camelCase</option>
        </select>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={deriveClone}
            onChange={e => setDeriveClone(e.target.checked)}
          />
          {t.deriveClone || 'Derive Clone'}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <input
            type="checkbox"
            checked={deriveDebug}
            onChange={e => setDeriveDebug(e.target.checked)}
          />
          {t.deriveDebug || 'Derive Debug'}
        </label>
      </div>

      {/* Error */}
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

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel || 'JSON Input'}</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste JSON here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel || 'Rust Struct'}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder || 'Generated Rust struct...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'How to Convert JSON to Rust Serde Struct'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Automatically convert JSON data into Rust struct definitions with serde derive macros. Perfect for Rust developers working with JSON APIs.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Automatic type inference from JSON values'}</li>
          <li>{t.seoFeature2 || 'Support for Option types and nested structures'}</li>
          <li>{t.seoFeature3 || 'Configurable serde derive attributes'}</li>
          <li>{t.seoFeature4 || 'Clone and Debug trait derivation options'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
