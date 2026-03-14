'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function JsToTsx() {
  const { dict } = useLang();
  const t = dict.tools['js-to-tsx'];
  const [jsInput, setJsInput] = useState(
    `function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const handleClick = (e) => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}`
  );
  const [options, setOptions] = useState({
    addReactImport: true,
    convertToFC: true,
    addTypeAnnotations: true,
    generateInterfaces: true,
  });

  const convertJsToTsx = (): string => {
    let code = jsInput.trim();

    // Add React import if needed
    if (options.addReactImport && !code.includes('import React')) {
      code = "import React from 'react';\n\n" + code;
    }

    // Convert function components
    if (options.convertToFC) {
      code = code.replace(
        /function\s+(\w+)\s*\(\s*({[^}]*}|\w+)?\s*\)/g,
        (match, name, params) => {
          const propsName = `${name}Props`;
          const typeAnnotation = params ? `: ${propsName}` : '';
          return `function ${name}(${params || ''}${typeAnnotation}): React.ReactElement`;
        }
      );
    }

    // Generate prop interfaces
    if (options.generateInterfaces) {
      const funcMatches = jsInput.match(/function\s+\w+\s*\(\s*{[^}]*}\s*\)/g) || [];
      const propsSet = new Set<string>();

      funcMatches.forEach(match => {
        const funcName = match.match(/function\s+(\w+)/)?.[1];
        if (funcName) {
          propsSet.add(funcName);
        }
      });

      let imports = '';
      propsSet.forEach(name => {
        const propsName = `${name}Props`;
        imports += `interface ${propsName} {\n  // TODO: Add property types\n  [key: string]: any;\n}\n\n`;
      });

      if (imports) {
        code = imports + code;
      }
    }

    // Add type annotations to useState calls
    if (options.addTypeAnnotations) {
      code = code.replace(
        /useState\(([^)]*)\)/g,
        (match, initialValue) => {
          const trimmed = initialValue.trim();
          if (trimmed === "''") return "useState<string>('')";
          if (trimmed === '""') return 'useState<string>("")';
          if (trimmed === '0' || /^\d+$/.test(trimmed)) return `useState<number>(${initialValue})`;
          if (trimmed === 'true' || trimmed === 'false') return `useState<boolean>(${initialValue})`;
          if (trimmed === '[]') return `useState<any[]>(${initialValue})`;
          if (trimmed === 'null' || trimmed === 'undefined') return `useState<any>(${initialValue})`;
          return match;
        }
      );

      // Add event handler types
      code = code.replace(/\(e\)\s*=>/g, '(e: React.MouseEvent<HTMLButtonElement>) =>');
      code = code.replace(/\(event\)\s*=>/g, '(event: React.FormEvent<HTMLFormElement>) =>');
      code = code.replace(/\(\s*e\s*:\s*\)\s*=>/g, '(e: React.ChangeEvent<HTMLInputElement>) =>');
    }

    return code;
  };

  const tsxOutput = convertJsToTsx();

  const handleLoadSample = () => {
    setJsInput(
      `function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const handleClick = (e) => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}`
    );
  };

  const handleClear = () => {
    setJsInput('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="js-to-tsx"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left panel - Input and options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* JS Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600 }}>{t.jsInputLabel || 'JavaScript / JSX Code'}</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={handleLoadSample}
                  className="btn btn-secondary"
                  style={{ fontSize: 12, padding: '4px 10px' }}
                >
                  {dict.common.loadSample}
                </button>
                <button
                  onClick={handleClear}
                  className="btn btn-secondary"
                  style={{ fontSize: 12, padding: '4px 10px' }}
                >
                  {dict.common.clear}
                </button>
              </div>
            </div>
            <textarea
              value={jsInput}
              onChange={e => setJsInput(e.target.value)}
              placeholder={t.jsInputPlaceholder || 'Paste your JavaScript/JSX code here...'}
              style={{
                width: '100%',
                height: 300,
                padding: 12,
                fontFamily: 'monospace',
                fontSize: 12,
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Options */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
          }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
              {t.optionsLabel || 'Conversion Options'}
            </label>
            {[
              { key: 'addReactImport', label: t.addReactImport || 'Add React import if missing' },
              { key: 'convertToFC', label: t.convertToFC || 'Convert to React.FC with type annotations' },
              { key: 'addTypeAnnotations', label: t.addTypeAnnotations || 'Add type annotations (useState, event handlers)' },
              { key: 'generateInterfaces', label: t.generateInterfaces || 'Generate prop interfaces' },
            ].map(({ key, label }) => (
              <label
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  cursor: 'pointer',
                  marginBottom: 8,
                }}
              >
                <input
                  type="checkbox"
                  checked={options[key as keyof typeof options]}
                  onChange={() => setOptions({ ...options, [key]: !options[key as keyof typeof options] })}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Right panel - Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* TSX Output */}
          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 600 }}>TypeScript / TSX Output</label>
              <CopyButton text={tsxOutput} />
            </div>
            <textarea
              value={tsxOutput}
              readOnly
              style={{
                flex: 1,
                padding: 12,
                fontFamily: 'monospace',
                fontSize: 12,
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                resize: 'none',
              }}
            />
          </div>

          {/* Info box */}
          <div style={{
            background: 'var(--bg-secondary)',
            borderRadius: 8,
            padding: 12,
            border: '1px solid var(--border-color)',
          }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              <strong>{t.tipLabel || 'Tip:'}</strong> {t.tipContent || 'This tool provides basic type annotations. Review and adjust types according to your component needs.'}
            </p>
          </div>
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