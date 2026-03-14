'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type DeriveMacro = 'Serialize' | 'Deserialize' | 'Debug' | 'Clone' | 'Default';
type RenameAllStrategy = 'none' | 'camelCase' | 'snake_case' | 'PascalCase';

interface ConversionOptions {
  structName: string;
  derives: DeriveMacro[];
  renameAll: RenameAllStrategy;
  useOption: boolean;
}

function jsonToRustStruct(json: string, options: ConversionOptions): string {
  const parsed = JSON.parse(json);
  const structs: string[] = [];
  const seen = new Map<string, string>();

  function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function toStructName(key: string): string {
    return capitalize(key.replace(/[^a-zA-Z0-9]/g, ''));
  }

  function applyRenameAll(key: string, strategy: RenameAllStrategy): string {
    if (strategy === 'none') return key;
    if (strategy === 'camelCase') {
      return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }
    if (strategy === 'snake_case') {
      return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
    if (strategy === 'PascalCase') {
      return key.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/_/g, '');
    }
    return key;
  }

  function getRustType(value: unknown, name: string): string {
    if (value === null) return options.useOption ? 'Option<String>' : 'String';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'Vec<String>';
      const itemType = getRustType(value[0], name + 'Item');
      return `Vec<${itemType.replace(/^Option<(.*)>$/, '$1')}>`;
    }
    switch (typeof value) {
      case 'string':
        return 'String';
      case 'number':
        return Number.isInteger(value) ? 'i64' : 'f64';
      case 'boolean':
        return 'bool';
      case 'object': {
        const structName = toStructName(name);
        const key = JSON.stringify(Object.keys(value as Record<string, unknown>).sort());
        if (seen.has(key)) return seen.get(key)!;
        seen.set(key, structName);
        generateStruct(value as Record<string, unknown>, structName);
        return structName;
      }
      default:
        return 'String';
    }
  }

  function generateStruct(obj: Record<string, unknown>, name: string): void {
    const fields: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const rustType = getRustType(value, key);
      const fieldName = applyRenameAll(key, options.renameAll);
      const renameAttr = fieldName !== key ? `\n    #[serde(rename = "${key}")]` : '';
      fields.push(`${renameAttr}\n    pub ${fieldName}: ${rustType},`);
    }
    const derive = options.derives.join(', ');
    const renameAllAttr = options.renameAll !== 'none' ? `\n#[serde(rename_all = "${options.renameAll}")]` : '';
    structs.push(
      `#[derive(${derive})]${renameAllAttr}\npub struct ${name} {\n${fields.join('\n')}\n}`,
    );
  }

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateStruct(parsed[0] as Record<string, unknown>, options.structName);
    } else {
      structs.push(
        `#[derive(${options.derives.join(', ')})]\npub struct ${options.structName} {\n    pub items: Vec<${parsed.length > 0 ? getRustType(parsed[0], 'Item') : 'String'}>,\n}`,
      );
    }
  } else if (typeof parsed === 'object' && parsed !== null) {
    generateStruct(parsed as Record<string, unknown>, options.structName);
  } else {
    structs.push(
      `#[derive(${options.derives.join(', ')})]\npub struct ${options.structName} {\n    pub value: ${getRustType(parsed, 'Value')},\n}`,
    );
  }

  return structs.reverse().join('\n\n');
}

export default function JsonToRustStruct() {
  const { dict } = useLang();
  const t = dict.tools['json-to-rust-struct'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [structName, setStructName] = useState('MyStruct');
  const [derives, setDerives] = useState<DeriveMacro[]>(['Serialize', 'Deserialize', 'Debug']);
  const [renameAll, setRenameAll] = useState<RenameAllStrategy>('none');
  const [useOption, setUseOption] = useState(false);

  const convert = () => {
    try {
      const result = jsonToRustStruct(input, {
        structName: structName || 'MyStruct',
        derives,
        renameAll,
        useOption,
      });
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const toggleDerive = (derive: DeriveMacro) => {
    setDerives((prev) =>
      prev.includes(derive) ? prev.filter((d) => d !== derive) : [...prev, derive],
    );
  };

  const loadSample = () => {
    setInput(
      JSON.stringify(
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          isActive: true,
          age: 30,
          score: 95.5,
          address: { street: '123 Main St', city: 'Springfield', zipCode: '62701' },
          tags: ['developer', 'rust'],
          metadata: null,
        },
        null,
        2,
      ),
    );
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'JSON to Rust Struct Converter'}
      description={
        (t.pageDescription as string) ||
        'Convert JSON data to Rust struct definitions with serde support'
      }
      toolId="json-to-rust-struct"
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <button onClick={convert} className="btn btn-primary">
          {common.convert}
        </button>
        <button onClick={loadSample} className="btn btn-secondary">
          {common.loadSample}
        </button>
        <button
          onClick={() => {
            setInput('');
            setOutput('');
            setError('');
          }}
          className="btn btn-secondary"
        >
          {common.clear}
        </button>
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
          ✕ {common.error}: {error}
        </div>
      )}

      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 8,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
          {typeof t.options === 'string' ? t.options : 'Options'}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              {typeof t.structNameLabel === 'string' ? t.structNameLabel : 'Struct Name'}
            </label>
            <input
              value={structName}
              onChange={(e) => setStructName(e.target.value || 'MyStruct')}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: 12,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              {typeof t.renameAll === 'string' ? t.renameAll : 'Field Name Strategy'}
            </label>
            <select
              value={renameAll}
              onChange={(e) => setRenameAll(e.target.value as RenameAllStrategy)}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: 12,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 4,
                color: 'var(--text-primary)',
              }}
            >
              <option value="none">No change</option>
              <option value="camelCase">camelCase</option>
              <option value="snake_case">snake_case</option>
              <option value="PascalCase">PascalCase</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
            {typeof t.deriveMacros === 'string' ? t.deriveMacros : 'Derive Macros'}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(['Serialize', 'Deserialize', 'Debug', 'Clone', 'Default'] as DeriveMacro[]).map(
              (derive) => (
                <label
                  key={derive}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={derives.includes(derive)}
                    onChange={() => toggleDerive(derive)}
                    style={{ cursor: 'pointer' }}
                  />
                  {derive}
                </label>
              ),
            )}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={useOption}
              onChange={(e) => setUseOption(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            {typeof t.useOptionForNull === 'string' ? t.useOptionForNull : 'Use Option<T> for null values'}
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              JSON {common.input}
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30, ...}'
            style={{
              minHeight: 350,
              fontFamily: 'JetBrains Mono, monospace',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              padding: 12,
              fontSize: 12,
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              Rust Struct
            </label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={common.resultPlaceholder}
            style={{
              minHeight: 350,
              fontFamily: 'JetBrains Mono, monospace',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              padding: 12,
              fontSize: 12,
              opacity: output ? 1 : 0.5,
              resize: 'vertical',
            }}
          />
        </div>
      </div>

      {typeof t.seoTitle === 'string' && (
        <div
          style={{
            marginTop: 30,
            paddingTop: 20,
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
            {t.seoTitle}
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
            }}
          >
            {t.seoContent as string}
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
