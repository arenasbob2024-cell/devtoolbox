'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// Simple TOML parser for common use cases
function parseToml(input: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = input.split('\n');
  let currentSection: Record<string, any> = result;
  let currentSectionPath: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Remove comments
    const commentIdx = line.indexOf('#');
    if (commentIdx >= 0) {
      const beforeComment = line.substring(0, commentIdx);
      if (!beforeComment.includes('"') && !beforeComment.includes("'")) {
        line = beforeComment.trim();
      }
    }

    // Skip empty lines
    if (!line) continue;

    // Array of tables [[name]]
    if (line.match(/^\[\[.+\]\]$/)) {
      const tableName = line.slice(2, -2).trim();
      currentSectionPath = tableName.split('.');
      if (!result[currentSectionPath[0]]) {
        result[currentSectionPath[0]] = [];
      }
      const arrayItem: Record<string, any> = {};
      (result[currentSectionPath[0]] as any[]).push(arrayItem);
      currentSection = arrayItem;
      continue;
    }

    // Table section [name]
    if (line.match(/^\[.+\]$/)) {
      const tableName = line.slice(1, -1).trim();
      currentSectionPath = tableName.split('.');
      let obj = result;
      for (let j = 0; j < currentSectionPath.length - 1; j++) {
        const key = currentSectionPath[j];
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
      }
      const finalKey = currentSectionPath[currentSectionPath.length - 1];
      if (!obj[finalKey]) obj[finalKey] = {};
      currentSection = obj[finalKey];
      continue;
    }

    // Key-value pair
    const eqIdx = line.indexOf('=');
    if (eqIdx > 0) {
      const key = line.substring(0, eqIdx).trim();
      let value = line.substring(eqIdx + 1).trim();

      // Parse value
      let parsed: any = value;
      if (value.startsWith('"') && value.endsWith('"')) {
        // String
        parsed = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        // Single quoted string
        parsed = value.slice(1, -1);
      } else if (value.startsWith('"""') && value.endsWith('"""')) {
        // Multi-line string
        parsed = value.slice(3, -3);
      } else if (value.startsWith("'''") && value.endsWith("'''")) {
        // Multi-line string (single quotes)
        parsed = value.slice(3, -3);
      } else if (value.toLowerCase() === 'true') {
        parsed = true;
      } else if (value.toLowerCase() === 'false') {
        parsed = false;
      } else if (value.match(/^-?\d+$/)) {
        // Integer
        parsed = parseInt(value, 10);
      } else if (value.match(/^-?\d+\.\d+$/)) {
        // Float
        parsed = parseFloat(value);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Array
        try {
          const arrayStr = value.slice(1, -1).trim();
          if (arrayStr === '') {
            parsed = [];
          } else {
            const items = arrayStr.split(',').map((item) => {
              const trimmed = item.trim();
              if (trimmed.startsWith('"') && trimmed.endsWith('"')) return trimmed.slice(1, -1);
              if (trimmed.toLowerCase() === 'true') return true;
              if (trimmed.toLowerCase() === 'false') return false;
              if (/^-?\d+$/.test(trimmed)) return parseInt(trimmed, 10);
              if (/^-?\d+\.\d+$/.test(trimmed)) return parseFloat(trimmed);
              return trimmed;
            });
            parsed = items;
          }
        } catch {
          parsed = value;
        }
      } else if (value.startsWith('{') && value.endsWith('}')) {
        // Inline table
        try {
          const tableStr = value.slice(1, -1).trim();
          const inlineTable: Record<string, any> = {};
          if (tableStr) {
            const pairs = tableStr.split(',');
            for (const pair of pairs) {
              const pairParts = pair.split('=');
              if (pairParts.length === 2) {
                const k = pairParts[0].trim();
                const v = pairParts[1].trim();
                if (v.startsWith('"') && v.endsWith('"')) {
                  inlineTable[k] = v.slice(1, -1);
                } else if (v.toLowerCase() === 'true') {
                  inlineTable[k] = true;
                } else if (v.toLowerCase() === 'false') {
                  inlineTable[k] = false;
                } else if (/^-?\d+$/.test(v)) {
                  inlineTable[k] = parseInt(v, 10);
                } else {
                  inlineTable[k] = v;
                }
              }
            }
          }
          parsed = inlineTable;
        } catch {
          parsed = value;
        }
      }

      currentSection[key] = parsed;
    }
  }

  return result;
}

// Convert JSON to TOML
function jsonToToml(obj: any, prefix = ''): string {
  let result = '';
  const keys = Object.keys(obj);

  // First pass: add simple key-value pairs
  for (const key of keys) {
    const value = obj[key];
    if (value === null || value === undefined) continue;

    const isObject = typeof value === 'object' && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const isArrayOfObjects = isArray && value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0]);

    if (!isObject && !isArrayOfObjects) {
      result += `${key} = `;
      if (typeof value === 'string') {
        result += `"${value.replace(/"/g, '\\"')}"`;
      } else if (typeof value === 'boolean') {
        result += value ? 'true' : 'false';
      } else if (Array.isArray(value)) {
        result += '[' + value.map((v) => {
          if (typeof v === 'string') return `"${v}"`;
          return String(v);
        }).join(', ') + ']';
      } else {
        result += String(value);
      }
      result += '\n';
    }
  }

  // Second pass: add sections and array of tables
  for (const key of keys) {
    const value = obj[key];
    if (value === null || value === undefined) continue;

    const isObject = typeof value === 'object' && !Array.isArray(value);
    const isArray = Array.isArray(value);
    const isArrayOfObjects = isArray && value.length > 0 && typeof value[0] === 'object' && !Array.isArray(value[0]);

    if (isObject && !isArrayOfObjects) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      result += `\n[${newPrefix}]\n`;
      result += jsonToToml(value, newPrefix);
    } else if (isArrayOfObjects) {
      for (const item of value) {
        const newPrefix = prefix ? `${prefix}.${key}` : key;
        result += `\n[[${newPrefix}]]\n`;
        result += jsonToToml(item, newPrefix);
      }
    }
  }

  return result;
}

export default function TomlEditor() {
  const { dict } = useLang();
  const t = dict.tools['toml-editor'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'edit' | 'toml-to-json' | 'json-to-toml'>('edit');
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | ''>('');
  const [errorMsg, setErrorMsg] = useState('');

  const validateToml = () => {
    setErrorMsg('');
    setValidationStatus('');

    if (!input.trim()) {
      setErrorMsg(dict.common.error + ': ' + t.inputRequired);
      return;
    }

    try {
      parseToml(input);
      setValidationStatus('valid');
      setErrorMsg('');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Parse error';
      setValidationStatus('invalid');
      setErrorMsg(msg);
    }
  };

  const convertTomlToJson = () => {
    setErrorMsg('');
    setOutput('');

    if (!input.trim()) {
      setErrorMsg(dict.common.error + ': ' + t.inputRequired);
      return;
    }

    try {
      const parsed = parseToml(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setValidationStatus('valid');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Parse error';
      setErrorMsg(msg);
      setValidationStatus('invalid');
    }
  };

  const convertJsonToToml = () => {
    setErrorMsg('');
    setOutput('');

    if (!input.trim()) {
      setErrorMsg(dict.common.error + ': ' + t.inputRequired);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const tomlStr = jsonToToml(parsed).trim();
      setOutput(tomlStr);
      setValidationStatus('valid');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Parse error';
      setErrorMsg(msg);
      setValidationStatus('invalid');
    }
  };

  const loadSample = () => {
    const sample = `[package]
name = "my-project"
version = "1.0.0"
edition = "2021"
authors = ["John Doe <john@example.com>"]

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }

[[bin]]
name = "app"
path = "src/main.rs"

[profile.release]
opt-level = 3
lto = true`;
    setInput(sample);
    setOutput('');
    setValidationStatus('');
    setErrorMsg('');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setValidationStatus('');
    setErrorMsg('');
  };

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    setOutput('');
    setValidationStatus('');
    setErrorMsg('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="toml-editor">
      {/* Mode Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 16,
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <button
          onClick={() => handleModeChange('edit')}
          style={{
            padding: '10px 16px',
            border: 'none',
            background: mode === 'edit' ? 'var(--bg-secondary)' : 'transparent',
            color: mode === 'edit' ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            borderBottom: mode === 'edit' ? '2px solid var(--accent-blue)' : '2px solid transparent',
          }}
        >
          {t.editValidateTab}
        </button>
        <button
          onClick={() => handleModeChange('toml-to-json')}
          style={{
            padding: '10px 16px',
            border: 'none',
            background: mode === 'toml-to-json' ? 'var(--bg-secondary)' : 'transparent',
            color: mode === 'toml-to-json' ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            borderBottom: mode === 'toml-to-json' ? '2px solid var(--accent-blue)' : '2px solid transparent',
          }}
        >
          {t.tomlToJsonTab}
        </button>
        <button
          onClick={() => handleModeChange('json-to-toml')}
          style={{
            padding: '10px 16px',
            border: 'none',
            background: mode === 'json-to-toml' ? 'var(--bg-secondary)' : 'transparent',
            color: mode === 'json-to-toml' ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            borderBottom: mode === 'json-to-toml' ? '2px solid var(--accent-blue)' : '2px solid transparent',
          }}
        >
          {t.jsonToTomlTab}
        </button>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {mode === 'edit' && (
          <button onClick={validateToml} className="btn btn-primary">
            {t.validateBtn}
          </button>
        )}
        {mode === 'toml-to-json' && (
          <button onClick={convertTomlToJson} className="btn btn-primary">
            {t.convertBtn}
          </button>
        )}
        {mode === 'json-to-toml' && (
          <button onClick={convertJsonToToml} className="btn btn-primary">
            {t.convertBtn}
          </button>
        )}
        <button onClick={loadSample} className="btn btn-secondary">
          {dict.common.loadSample}
        </button>
        <button onClick={clearAll} className="btn btn-secondary">
          {dict.common.clear}
        </button>
      </div>

      {/* Error */}
      {errorMsg && (
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
          ✕ {errorMsg}
        </div>
      )}

      {/* Validation Status */}
      {validationStatus && mode === 'edit' && (
        <div
          style={{
            background:
              validationStatus === 'valid' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            border:
              validationStatus === 'valid'
                ? '1px solid rgba(34, 197, 94, 0.3)'
                : '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: validationStatus === 'valid' ? 'var(--accent-green)' : 'var(--accent-rose)',
          }}
        >
          {validationStatus === 'valid' ? '✓ ' + t.validToml : '✕ ' + t.invalidToml}
        </div>
      )}

      {/* Editor and Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {mode === 'json-to-toml' ? t.jsonInputLabel : t.tomlInputLabel}
            </label>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setValidationStatus('');
              setErrorMsg('');
            }}
            placeholder={mode === 'json-to-toml' ? t.jsonInputPlaceholder : t.tomlInputPlaceholder}
            style={{
              minHeight: 400,
              fontFamily: 'monospace',
              fontSize: 13,
              padding: 12,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              resize: 'vertical',
            }}
          />
        </div>
        <div>
          <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {mode === 'json-to-toml' ? t.tomlOutputLabel : t.jsonOutputLabel}
            </label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder}
            style={{
              minHeight: 400,
              fontFamily: 'monospace',
              fontSize: 13,
              padding: 12,
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              cursor: 'default',
            }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div
        style={{
          marginTop: 30,
          paddingTop: 20,
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>
          {t.seoFeaturesTitle}
        </h3>
        <ul
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            paddingLeft: 20,
          }}
        >
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
