'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToJava(json: string, rootClassName: string, useLombok: boolean, useJackson: boolean, generateGettersSetters: boolean): string {
  const parsed = JSON.parse(json);
  const classes: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toCamelCase(s: string): string {
    return s
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map((word, i) => (i === 0 ? word.toLowerCase() : capitalize(word)))
      .join('')
      .replace(/^\d+/, '');
  }

  function toClassName(key: string): string {
    return capitalize(toCamelCase(key));
  }

  function toFieldName(key: string): string {
    return toCamelCase(key);
  }

  function getJavaType(value: unknown, name: string): string {
    if (value === null) return 'Object';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'List<Object>';
      return `List<${getJavaBoxedType(value[0], name + 'Item')}>`;
    }
    switch (typeof value) {
      case 'string': return 'String';
      case 'number': return Number.isInteger(value) ? 'long' : 'double';
      case 'boolean': return 'boolean';
      case 'object': {
        const className = toClassName(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)!;
        seen.set(key, className);
        generateClass(value as Record<string, unknown>, className);
        return className;
      }
      default: return 'Object';
    }
  }

  function getJavaBoxedType(value: unknown, name: string): string {
    const type = getJavaType(value, name);
    switch (type) {
      case 'long': return 'Long';
      case 'double': return 'Double';
      case 'boolean': return 'Boolean';
      default: return type;
    }
  }

  function generateClass(obj: Record<string, unknown>, name: string): void {
    const lines: string[] = [];
    const fields: { type: string; fieldName: string; key: string }[] = [];
    let needsList = false;
    let needsJsonProperty = useJackson;

    for (const [key, value] of Object.entries(obj)) {
      const type = getJavaType(value, key);
      const fieldName = toFieldName(key);
      fields.push({ type, fieldName, key });
      if (type.startsWith('List<')) needsList = true;
    }

    // Imports
    const imports: string[] = [];
    if (needsList) imports.push('import java.util.List;');
    if (useJackson) imports.push('import com.fasterxml.jackson.annotation.JsonProperty;');
    if (useLombok) {
      imports.push('import lombok.AllArgsConstructor;');
      imports.push('import lombok.Data;');
      imports.push('import lombok.NoArgsConstructor;');
    }

    if (imports.length > 0) {
      lines.push(...imports);
      lines.push('');
    }

    // Annotations
    if (useLombok) {
      lines.push('@Data');
      lines.push('@NoArgsConstructor');
      lines.push('@AllArgsConstructor');
    }
    lines.push(`public class ${name} {`);

    // Fields
    for (const { type, fieldName, key } of fields) {
      if (useJackson && fieldName !== key) {
        lines.push(`    @JsonProperty("${key}")`);
      }
      lines.push(`    private ${type} ${fieldName};`);
      lines.push('');
    }

    if (!useLombok && generateGettersSetters) {
      lines.pop(); // Remove last empty line
      lines.push('');
      // Constructor
      lines.push(`    public ${name}() {}`);
      lines.push('');

      // Getters and setters
      for (const { type, fieldName } of fields) {
        const capField = capitalize(fieldName);
        lines.push(`    public ${type} get${capField}() {`);
        lines.push(`        return ${fieldName};`);
        lines.push('    }');
        lines.push('');
        lines.push(`    public void set${capField}(${type} ${fieldName}) {`);
        lines.push(`        this.${fieldName} = ${fieldName};`);
        lines.push('    }');
        lines.push('');
      }
      lines.pop(); // Remove last empty line
    }

    lines.push('}');
    classes.push(lines.join('\n'));
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateClass(parsed[0] as Record<string, unknown>, rootClassName);
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateClass(parsed as Record<string, unknown>, rootClassName);
  }

  return classes.reverse().join('\n\n// ===================================\n\n');
}

export default function JsonToJava() {
  const { dict } = useLang();
  const t = dict.tools['json-to-java'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [rootName, setRootName] = useState('Root');
  const [useLombok, setUseLombok] = useState(false);
  const [useJackson, setUseJackson] = useState(true);
  const [generateGettersSetters, setGenerateGettersSetters] = useState(true);

  const convert = () => {
    try {
      const result = jsonToJava(input, rootName, useLombok, useJackson, generateGettersSetters);
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
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zipCode: "62701"
      },
      phoneNumbers: [
        {
          type: "home",
          number: "555-1234"
        }
      ],
      isActive: true,
      score: 95.5
    }, null, 2));
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Java Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Java POJO classes'}
      toolId="json-to-java"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Root Class:</label>
            <input value={rootName} onChange={e => setRootName(e.target.value || 'Root')} style={{ width: 100, padding: '4px 8px', fontSize: 12 }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useLombok} onChange={e => setUseLombok(e.target.checked)} /> Lombok
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input type="checkbox" checked={useJackson} onChange={e => setUseJackson(e.target.checked)} /> Jackson
          </label>
          {!useLombok && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input type="checkbox" checked={generateGettersSetters} onChange={e => setGenerateGettersSetters(e.target.checked)} /> Getters/Setters
            </label>
          )}
        </div>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value", ...}' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Java</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
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
