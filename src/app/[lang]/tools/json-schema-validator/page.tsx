'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonSchemaValidator() {
  const { dict } = useLang();
  const t = dict.tools['json-schema-validator'];
  const [jsonData, setJsonData] = useState('');
  const [schema, setSchema] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [validationError, setValidationError] = useState('');

  // Simple JSON Schema validation function
  const validateAgainstSchema = (data: any, schema: any): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Check type
    if (schema.type) {
      const actualType = Array.isArray(data) ? 'array' : typeof data;
      if (actualType !== schema.type && !(schema.type === 'number' && typeof data === 'number')) {
        errors.push(`Type mismatch: expected ${schema.type}, got ${actualType}`);
      }
    }

    // Check required properties
    if (schema.required && typeof data === 'object' && data !== null && !Array.isArray(data)) {
      for (const req of schema.required) {
        if (!(req in data)) {
          errors.push(`Missing required property: ${req}`);
        }
      }
    }

    // Check properties
    if (schema.properties && typeof data === 'object' && data !== null && !Array.isArray(data)) {
      for (const key in schema.properties) {
        if (key in data) {
          const propSchema = schema.properties[key];
          const propResult = validateAgainstSchema(data[key], propSchema);
          if (!propResult.valid) {
            errors.push(`Property '${key}': ${propResult.errors.join(', ')}`);
          }
        }
      }
    }

    // Check minimum
    if (schema.minimum !== undefined && typeof data === 'number') {
      if (data < schema.minimum) {
        errors.push(`Value ${data} is less than minimum ${schema.minimum}`);
      }
    }

    // Check maximum
    if (schema.maximum !== undefined && typeof data === 'number') {
      if (data > schema.maximum) {
        errors.push(`Value ${data} is greater than maximum ${schema.maximum}`);
      }
    }

    // Check minLength
    if (schema.minLength !== undefined && typeof data === 'string') {
      if (data.length < schema.minLength) {
        errors.push(`String length ${data.length} is less than minimum ${schema.minLength}`);
      }
    }

    // Check maxLength
    if (schema.maxLength !== undefined && typeof data === 'string') {
      if (data.length > schema.maxLength) {
        errors.push(`String length ${data.length} is greater than maximum ${schema.maxLength}`);
      }
    }

    // Check pattern
    if (schema.pattern && typeof data === 'string') {
      try {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(data)) {
          errors.push(`String does not match pattern ${schema.pattern}`);
        }
      } catch (e) {
        errors.push(`Invalid pattern in schema: ${schema.pattern}`);
      }
    }

    // Check array items
    if (schema.items && Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const itemResult = validateAgainstSchema(data[i], schema.items);
        if (!itemResult.valid) {
          errors.push(`Array[${i}]: ${itemResult.errors.join(', ')}`);
        }
      }
    }

    // Check enum
    if (schema.enum && !schema.enum.includes(data)) {
      errors.push(`Value must be one of: ${schema.enum.join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const validate = () => {
    setValidationResult('');
    setValidationError('');

    if (!jsonData.trim() || !schema.trim()) {
      setValidationError('Both JSON data and schema are required');
      return;
    }

    try {
      const parsedData = JSON.parse(jsonData);
      const parsedSchema = JSON.parse(schema);

      const result = validateAgainstSchema(parsedData, parsedSchema);

      if (result.valid) {
        setValidationResult('✓ Valid - JSON matches schema perfectly!');
      } else {
        setValidationResult(`✕ Invalid - Found ${result.errors.length} error(s):\n\n${result.errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}`);
      }
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      if (jsonData.trim() && !schema.trim()) {
        setValidationError('Invalid schema JSON');
      } else if (!jsonData.trim() && schema.trim()) {
        setValidationError('Invalid JSON data');
      } else {
        setValidationError(`JSON Parse Error: ${errorMsg}`);
      }
    }
  };

  const loadSampleData = () => {
    const sample = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      active: true,
    };
    setJsonData(JSON.stringify(sample, null, 2));
  };

  const loadSampleSchema = () => {
    const sample = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      required: ['name', 'email', 'age'],
      properties: {
        name: {
          type: 'string',
          minLength: 1,
        },
        email: {
          type: 'string',
          pattern: '^[^@]+@[^@]+\\.[^@]+$',
        },
        age: {
          type: 'number',
          minimum: 0,
          maximum: 150,
        },
        active: {
          type: 'boolean',
        },
      },
    };
    setSchema(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-schema-validator"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={validate} className="btn btn-primary">{t.validateBtn}</button>
        <button onClick={loadSampleData} className="btn btn-secondary">{dict.common.loadSample} (Data)</button>
        <button onClick={loadSampleSchema} className="btn btn-secondary">{dict.common.loadSample} (Schema)</button>
        <button onClick={() => { setJsonData(''); setSchema(''); setValidationResult(''); setValidationError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
      {validationError && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {dict.common.error}: {validationError}
        </div>
      )}

      {/* Result */}
      {validationResult && (
        <div style={{
          background: validationResult.startsWith('✓') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
          border: validationResult.startsWith('✓') ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: validationResult.startsWith('✓') ? 'var(--accent-green)' : 'var(--accent-rose)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          wordBreak: 'break-word',
        }}>
          {validationResult}
          <CopyButton text={validationResult} />
        </div>
      )}

      {/* Input Areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jsonDataLabel}</label>
          </div>
          <textarea
            value={jsonData}
            onChange={e => setJsonData(e.target.value)}
            placeholder={t.jsonDataPlaceholder}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.schemaLabel}</label>
          </div>
          <textarea
            value={schema}
            onChange={e => setSchema(e.target.value)}
            placeholder={t.schemaPlaceholder}
            style={{ minHeight: 350 }}
          />
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
