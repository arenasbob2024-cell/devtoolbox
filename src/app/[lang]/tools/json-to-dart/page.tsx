'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface DartOptions {
  nullSafety: boolean;
  jsonKey: boolean;
  copyWith: boolean;
  toStringOverride: boolean;
}

function jsonToDart(json: string, rootClassName: string, options: DartOptions): string {
  const parsed = JSON.parse(json);
  const dartClasses: string[] = [];
  const seen = new Map<string, string>();

  function toPascalCase(s: string): string {
    return s
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .replace(/(^|_)([a-z])/g, (_, __, c) => c.toUpperCase())
      .replace(/_/g, '');
  }

  function toCamelCase(s: string): string {
    const pascal = toPascalCase(s);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  function getDartType(value: unknown, keyName: string): string {
    if (value === null) return 'dynamic';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'List<dynamic>';
      const itemType = getDartType(value[0], keyName + 'Item');
      return `List<${itemType}>`;
    }
    switch (typeof value) {
      case 'string': return 'String';
      case 'number': return Number.isInteger(value) ? 'int' : 'double';
      case 'boolean': return 'bool';
      case 'object': {
        const className = toPascalCase(keyName);
        const sortedKeys = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(sortedKeys)) return seen.get(sortedKeys)!;
        seen.set(sortedKeys, className);
        generateClass(value as Record<string, unknown>, className);
        return className;
      }
      default: return 'dynamic';
    }
  }

  function isNullable(value: unknown): boolean {
    return value === null;
  }

  function getFromJsonExpression(fieldName: string, dartType: string, value: unknown, key: string): string {
    const jsonAccess = `json['${key}']`;
    if (value === null) return jsonAccess;
    if (Array.isArray(value)) {
      if (value.length === 0) return `List<dynamic>.from(${jsonAccess} ?? [])`;
      const itemValue = value[0];
      if (typeof itemValue === 'object' && itemValue !== null && !Array.isArray(itemValue)) {
        const itemClassName = toPascalCase(key + 'Item');
        const seenKeys = JSON.stringify(Object.keys(itemValue as Record<string, unknown>).sort());
        const resolvedName = seen.get(seenKeys) || itemClassName;
        return `(${jsonAccess} as List<dynamic>?)?.map((e) => ${resolvedName}.fromJson(e as Map<String, dynamic>)).toList() ?? []`;
      }
      if (typeof itemValue === 'number') {
        const numType = Number.isInteger(itemValue) ? 'int' : 'double';
        return `List<${numType}>.from(${jsonAccess} ?? [])`;
      }
      if (typeof itemValue === 'string') {
        return `List<String>.from(${jsonAccess} ?? [])`;
      }
      if (typeof itemValue === 'boolean') {
        return `List<bool>.from(${jsonAccess} ?? [])`;
      }
      return `List<dynamic>.from(${jsonAccess} ?? [])`;
    }
    if (typeof value === 'object' && value !== null) {
      const className = getDartTypeForExisting(value, key);
      const nullable = options.nullSafety ? '?' : '';
      return `${jsonAccess} != null ? ${className}.fromJson(${jsonAccess} as Map<String, dynamic>) : null`;
    }
    return jsonAccess;
  }

  function getDartTypeForExisting(value: unknown, keyName: string): string {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const sortedKeys = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
      if (seen.has(sortedKeys)) return seen.get(sortedKeys)!;
    }
    return toPascalCase(keyName);
  }

  function getToJsonExpression(fieldName: string, value: unknown, key: string): string {
    if (value === null) return fieldName;
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null && !Array.isArray(value[0])) {
        const q = options.nullSafety ? '?' : '';
        return `${fieldName}${q}.map((e) => e.toJson()).toList()`;
      }
      return fieldName;
    }
    if (typeof value === 'object' && value !== null) {
      const q = options.nullSafety ? '?' : '';
      return `${fieldName}${q}.toJson()`;
    }
    return fieldName;
  }

  function generateClass(obj: Record<string, unknown>, className: string): void {
    const lines: string[] = [];
    const fields: { dartName: string; dartType: string; jsonKey: string; value: unknown; nullable: boolean }[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const dartName = toCamelCase(key);
      const baseType = getDartType(value, key);
      const isNull = isNullable(value);
      const nullable = isNull && options.nullSafety;
      const dartType = nullable && baseType !== 'dynamic' ? `${baseType}?` : baseType;
      fields.push({ dartName, dartType, jsonKey: key, value, nullable: nullable || baseType === 'dynamic' });
    }

    // Import annotation if needed
    if (options.jsonKey) {
      lines.push(`@JsonSerializable()`);
    }

    lines.push(`class ${className} {`);

    // Fields
    for (const f of fields) {
      if (options.jsonKey && f.dartName !== f.jsonKey) {
        lines.push(`  @JsonKey(name: '${f.jsonKey}')`);
      }
      const q = f.nullable && options.nullSafety ? '' : '';
      lines.push(`  final ${f.dartType} ${f.dartName};`);
    }

    lines.push('');

    // Constructor
    lines.push(`  ${className}({`);
    for (const f of fields) {
      const required = !f.nullable && options.nullSafety ? 'required ' : '';
      lines.push(`    ${required}this.${f.dartName},`);
    }
    lines.push('  });');

    lines.push('');

    // fromJson factory
    lines.push(`  factory ${className}.fromJson(Map<String, dynamic> json) {`);
    lines.push(`    return ${className}(`);
    for (const f of fields) {
      const expr = getFromJsonExpression(f.dartName, f.dartType, f.value, f.jsonKey);
      lines.push(`      ${f.dartName}: ${expr},`);
    }
    lines.push('    );');
    lines.push('  }');

    lines.push('');

    // toJson
    lines.push('  Map<String, dynamic> toJson() {');
    lines.push('    return {');
    for (const f of fields) {
      const expr = getToJsonExpression(f.dartName, f.value, f.jsonKey);
      lines.push(`      '${f.jsonKey}': ${expr},`);
    }
    lines.push('    };');
    lines.push('  }');

    // copyWith
    if (options.copyWith) {
      lines.push('');
      lines.push(`  ${className} copyWith({`);
      for (const f of fields) {
        const baseType = f.dartType.endsWith('?') ? f.dartType : `${f.dartType}?`;
        lines.push(`    ${baseType} ${f.dartName},`);
      }
      lines.push('  }) {');
      lines.push(`    return ${className}(`);
      for (const f of fields) {
        lines.push(`      ${f.dartName}: ${f.dartName} ?? this.${f.dartName},`);
      }
      lines.push('    );');
      lines.push('  }');
    }

    // toString
    if (options.toStringOverride) {
      lines.push('');
      lines.push('  @override');
      const fieldStr = fields.map(f => `${f.dartName}: $${f.dartName}`).join(', ');
      lines.push(`  String toString() => '${className}(${fieldStr})';`);
    }

    lines.push('}');
    dartClasses.push(lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateClass(parsed[0] as Record<string, unknown>, rootClassName);
      const importLine = options.jsonKey ? "import 'package:json_annotation/json_annotation.dart';\n\n" : '';
      return importLine + dartClasses.reverse().join('\n\n') + `\n\n// Usage: List<${rootClassName}>`;
    }
    const itemType = getDartType(parsed[0], rootClassName);
    return `// Type alias\ntypedef ${rootClassName}List = List<${itemType}>;`;
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateClass(parsed as Record<string, unknown>, rootClassName);
    const importLine = options.jsonKey ? "import 'package:json_annotation/json_annotation.dart';\n\n" : '';
    return importLine + dartClasses.reverse().join('\n\n');
  }
  return `// Primitive type: ${getDartType(parsed, rootClassName)}`;
}

export default function JsonToDart() {
  const { dict } = useLang();
  const t = dict.tools['json-to-dart'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('MyModel');
  const [nullSafety, setNullSafety] = useState(true);
  const [jsonKey, setJsonKey] = useState(false);
  const [copyWith, setCopyWith] = useState(false);
  const [toStringOverride, setToStringOverride] = useState(false);

  const convert = () => {
    try {
      const result = jsonToDart(input, rootName, { nullSafety, jsonKey, copyWith, toStringOverride });
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(JSON.stringify({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      isActive: true,
      salary: 75000.50,
      address: {
        street: "123 Main St",
        city: "Springfield",
        zipCode: "62701",
        country: "US"
      },
      hobbies: ["reading", "coding", "gaming"],
      scores: [95, 87, 92],
      metadata: null
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Dart Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Dart classes with fromJson/toJson'}
      toolId="json-to-dart"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Root:</label>
            <input
              value={rootName}
              onChange={e => setRootName(e.target.value || 'MyModel')}
              style={{
                width: 100,
                padding: '4px 8px',
                fontSize: 12,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                color: 'var(--text-primary)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Options row */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginBottom: 16,
        flexWrap: 'wrap',
        padding: '10px 14px',
        background: 'var(--bg-input)',
        borderRadius: 8,
        border: '1px solid var(--border-color)',
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={nullSafety} onChange={e => setNullSafety(e.target.checked)} />
          Null Safety
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={jsonKey} onChange={e => setJsonKey(e.target.checked)} />
          @JsonKey annotations
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={copyWith} onChange={e => setCopyWith(e.target.checked)} />
          copyWith()
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <input type="checkbox" checked={toStringOverride} onChange={e => setToStringOverride(e.target.checked)} />
          toString()
        </label>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON {common.input}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='{"key": "value", ...}'
            style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Dart</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={common.resultPlaceholder}
            style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }}
          />
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
