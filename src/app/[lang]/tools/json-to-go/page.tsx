'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToGo() {
  const { dict } = useLang();
  const t = dict.tools['json-to-go'];
  const [jsonInput, setJsonInput] = useState('');
  const [goOutput, setGoOutput] = useState('');
  const [error, setError] = useState('');
  const [structName, setStructName] = useState('Data');
  const [omitEmpty, setOmitEmpty] = useState(true);
  const [inlineTypes, setInlineTypes] = useState(false);

  // JSON to Go conversion logic
  const jsonToGoStruct = (jsonStr: string, rootName: string, useOmitEmpty: boolean, useInlineTypes: boolean): string => {
    try {
      const data = JSON.parse(jsonStr);
      const structDefs: string[] = [];
      const seenStructs = new Set<string>();

      const getGoType = (value: any, fieldName: string): string => {
        if (value === null) {
          return 'interface{}';
        }

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]interface{}';
          }
          const itemType = getGoType(value[0], fieldName);
          return `[]${itemType}`;
        }

        if (typeof value === 'object') {
          const structName = capitalizeFirst(fieldName);
          if (!seenStructs.has(structName)) {
            seenStructs.add(structName);
            structDefs.push(generateStruct(value, structName, useOmitEmpty, useInlineTypes));
          }
          return structName;
        }

        if (typeof value === 'boolean') {
          return 'bool';
        }

        if (typeof value === 'number') {
          if (Number.isInteger(value)) {
            return 'int';
          }
          return 'float64';
        }

        if (typeof value === 'string') {
          return 'string';
        }

        return 'interface{}';
      };

      const generateStruct = (obj: any, name: string, useOmitEmpty: boolean, useInlineTypes: boolean): string => {
        let struct = `type ${name} struct {\n`;

        for (const [key, value] of Object.entries(obj)) {
          if (value === undefined) continue;

          const goFieldName = capitalizeFirst(key);
          const goType = getGoType(value, key);
          const jsonTag = useOmitEmpty ? `json:"${key},omitempty"` : `json:"${key}"`;
          const tagStr = useInlineTypes ? ` \`${jsonTag}\`` : ` \`${jsonTag}\``;

          struct += `  ${goFieldName} ${goType}${tagStr}\n`;
        }

        struct += '}';
        return struct;
      };

      // Generate the main struct
      const mainStruct = generateStruct(data, rootName, useOmitEmpty, useInlineTypes);

      // Combine all structs
      let result = '';
      if (structDefs.length > 0) {
        result = structDefs.join('\n\n') + '\n\n';
      }
      result += mainStruct;

      return result;
    } catch (e) {
      throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  };

  const capitalizeFirst = (str: string): string => {
    // Remove special characters and handle camelCase
    const cleaned = str.replace(/[^a-zA-Z0-9]/g, '_');
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
  };

  const convert = () => {
    setError('');
    setGoOutput('');

    if (!jsonInput.trim()) {
      setError('Please enter valid JSON data');
      return;
    }

    if (!structName.trim()) {
      setError('Please enter a struct name');
      return;
    }

    try {
      const result = jsonToGoStruct(jsonInput, structName, omitEmpty, inlineTypes);
      setGoOutput(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion error');
    }
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      active: true,
      tags: ['developer', 'golang'],
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        country: 'USA',
      },
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  const clear = () => {
    setJsonInput('');
    setGoOutput('');
    setError('');
    setStructName('Data');
  };

  return (
    <ToolLayout toolId="json-to-go">
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={clear} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Options */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 8,
        padding: '12px 14px',
        marginBottom: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
      }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t.structNameLabel}</label>
          <input
            type="text"
            value={structName}
            onChange={e => setStructName(e.target.value)}
            placeholder="Data"
            style={{
              width: '100%',
              padding: '6px 8px',
              fontSize: 13,
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 4,
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={omitEmpty}
              onChange={e => setOmitEmpty(e.target.checked)}
            />
            <span>{t.omitEmptyLabel}</span>
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={inlineTypes}
              onChange={e => setInlineTypes(e.target.checked)}
            />
            <span>{t.inlineTypesLabel}</span>
          </label>
        </div>
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

      {/* Input/Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jsonInputLabel}</label>
          </div>
          <textarea
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder={t.jsonInputPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.goOutputLabel}</label>
          </div>
          <textarea
            value={goOutput}
            readOnly
            placeholder={t.goOutputPlaceholder}
            style={{ minHeight: 350, backgroundColor: 'var(--bg-secondary)', cursor: 'text' }}
          />
          {goOutput && <CopyButton text={goOutput} />}
        </div>
      </div>

      {/* SEO Content */}
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
