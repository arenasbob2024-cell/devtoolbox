'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function jsonToJava(json: string, rootClassName: string, packageName: string, useLombok: boolean, useJackson: boolean, generateGettersSetters: boolean): string {
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

    // Package
    if (packageName) {
      lines.push(`package ${packageName};`);
      lines.push('');
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
  const [packageName, setPackageName] = useState('com.example');
  const [useLombok, setUseLombok] = useState(false);
  const [useJackson, setUseJackson] = useState(true);
  const [generateGettersSetters, setGenerateGettersSetters] = useState(true);

  const convert = () => {
    try {
      const result = jsonToJava(input, rootName, packageName, useLombok, useJackson, generateGettersSetters);
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
      title={(t.pageTitle as string) || 'JSON to Java Class Converter'}
      description={(t.pageDescription as string) || 'Convert JSON data to Java POJO classes'}
      toolId="json-to-java"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Class Name</label>
          <input value={rootName} onChange={e => setRootName(e.target.value || 'Root')} placeholder="Root" style={{ padding: '8px 10px', fontSize: 13, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Package Name</label>
          <input value={packageName} onChange={e => setPackageName(e.target.value)} placeholder="com.example" style={{ padding: '8px 10px', fontSize: 13, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={useLombok} onChange={e => setUseLombok(e.target.checked)} style={{ cursor: 'pointer' }} />
          Use Lombok @Data
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={useJackson} onChange={e => setUseJackson(e.target.checked)} style={{ cursor: 'pointer' }} />
          Add Jackson Annotations
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', opacity: useLombok ? 0.5 : 1 }}>
          <input type="checkbox" checked={generateGettersSetters} onChange={e => setGenerateGettersSetters(e.target.checked)} disabled={useLombok} style={{ cursor: useLombok ? 'not-allowed' : 'pointer' }} />
          Generate Getters/Setters
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value", "nested": {"key2": "value2"}}' style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Java Code</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 400, fontFamily: 'JetBrains Mono, monospace', padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, color: 'var(--text-primary)', opacity: output ? 1 : 0.5, resize: 'vertical' }} />
        </div>
      </div>

      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>

          {typeof t.faqTitle === 'string' && Array.isArray(t.faqs) && (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{t.faqTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(t.faqs as Array<{ q: string; a: string }>).map((faq, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '12px 14px', borderRadius: 6, borderLeft: '3px solid var(--accent-color)' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{faq.q}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}
