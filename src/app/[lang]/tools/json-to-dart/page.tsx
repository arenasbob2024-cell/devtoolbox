'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsonToDart() {
  const { dict } = useLang();
  const t = dict.tools['json-to-dart'];
  const [jsonInput, setJsonInput] = useState('');
  const [dartOutput, setDartOutput] = useState('');
  const [error, setError] = useState('');
  const [className, setClassName] = useState('User');
  const [includeNullSafety, setIncludeNullSafety] = useState(true);
  const [includeFromJson, setIncludeFromJson] = useState(true);
  const [includeToJson, setIncludeToJson] = useState(true);

  const generateDartClass = () => {
    setError('');
    setDartOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const classCode = generateClassFromJson(
        parsed,
        className || 'User',
        includeNullSafety,
        includeFromJson,
        includeToJson
      );
      setDartOutput(classCode);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Parse error';
      setError(`JSON Parse Error: ${errorMsg}`);
    }
  };

  const generateClassFromJson = (
    obj: any,
    className: string,
    nullSafety: boolean,
    withFromJson: boolean,
    withToJson: boolean
  ): string => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      throw new Error('Root JSON must be an object');
    }

    const fields = Object.entries(obj).map(([key, value]) => {
      const dartType = getTypeName(value, key, nullSafety);
      const nullable = nullSafety && isNullableValue(value) ? '?' : '';
      return { name: key, type: dartType, nullable };
    });

    let code = `class ${className} {\n`;

    // Constructor
    code += `  ${className}({\n`;
    fields.forEach((field) => {
      code += `    required this.${field.name},\n`;
    });
    code += `  });\n\n`;

    // Fields
    fields.forEach((field) => {
      code += `  final ${field.type}${field.nullable} ${field.name};\n`;
    });

    // fromJson
    if (withFromJson) {
      code += `\n  factory ${className}.fromJson(Map<String, dynamic> json) => ${className}(\n`;
      fields.forEach((field) => {
        code += `    ${field.name}: json['${field.name}'],\n`;
      });
      code += `  );\n`;
    }

    // toJson
    if (withToJson) {
      code += `\n  Map<String, dynamic> toJson() => {\n`;
      fields.forEach((field) => {
        code += `    '${field.name}': ${field.name},\n`;
      });
      code += `  };\n`;
    }

    code += `}\n`;

    return code;
  };

  const getTypeName = (value: any, key: string, nullSafety: boolean): string => {
    if (value === null) return nullSafety ? 'dynamic' : 'dynamic';
    if (typeof value === 'string') return 'String';
    if (typeof value === 'number') return Number.isInteger(value) ? 'int' : 'double';
    if (typeof value === 'boolean') return 'bool';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'List<dynamic>';
      const elementType = getTypeName(value[0], key, nullSafety);
      return `List<${elementType}>`;
    }
    if (typeof value === 'object') {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      return capitalizedKey;
    }
    return 'dynamic';
  };

  const isNullableValue = (value: any): boolean => {
    return value === null || value === undefined;
  };

  const loadSample = () => {
    const sample = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      isActive: true,
      score: 95.5,
      tags: ['developer', 'flutter'],
      metadata: {
        joinDate: '2024-01-15',
        verified: true,
      },
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="json-to-dart">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Class name (e.g., User)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          style={{ flex: 1, minWidth: 150, padding: '8px 12px', fontSize: 14 }}
        />
        <button onClick={generateDartClass} className="btn btn-primary">
          Generate
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <button
          onClick={() => {
            setJsonInput('');
            setDartOutput('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          {dict.common.clear}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={includeNullSafety}
            onChange={(e) => setIncludeNullSafety(e.target.checked)}
          />
          Null Safety (?)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={includeFromJson}
            onChange={(e) => setIncludeFromJson(e.target.checked)}
          />
          Include fromJson
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input
            type="checkbox"
            checked={includeToJson}
            onChange={(e) => setIncludeToJson(e.target.checked)}
          />
          Include toJson
        </label>
      </div>

      {error && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: 'var(--accent-rose)',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            JSON Input
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste JSON here..."
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            Dart Class Output
          </label>
          <textarea
            value={dartOutput}
            readOnly
            style={{ minHeight: 350, background: 'var(--bg-secondary)' }}
          />
          {dartOutput && <CopyButton text={dartOutput} />}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
          {t.seoTitle || 'Convert JSON to Dart Classes'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent ||
            'Convert JSON data into type-safe Dart class definitions. This tool automatically generates constructors, fromJson, and toJson methods for Flutter and Dart projects, supporting null safety and nested objects.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          Features
        </h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Automatic type detection (String, int, double, bool, List, Map)</li>
          <li>Null safety support with ? notation</li>
          <li>Generated fromJson factory constructor</li>
          <li>Generated toJson method for serialization</li>
          <li>Support for nested objects and arrays</li>
          <li>Customizable class name</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
