'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface TomlError {
  line: number;
  message: string;
}

export default function TomlEditor() {
  const { dict } = useLang();
  const t = dict.tools['toml-editor'];
  const [tomlInput, setTomlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [errors, setErrors] = useState<TomlError[]>([]);
  const [convertMode, setConvertMode] = useState<'toml-to-json' | 'json-to-toml'>('toml-to-json');

  const parseToml = (input: string): { data: Record<string, any>; errors: TomlError[] } => {
    const errors: TomlError[] = [];
    const result: Record<string, any> = {};

    if (!input.trim()) return { data: result, errors };

    const lines = input.split('\n');
    let currentSection: Record<string, any> = result;
    let currentPath: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) continue;

      // Section header
      if (trimmed.startsWith('[')) {
        if (!trimmed.endsWith(']')) {
          errors.push({ line: lineNum, message: 'Invalid section header' });
          continue;
        }
        const sectionName = trimmed.slice(1, -1).trim();
        currentPath = sectionName.split('.');
        currentSection = result;

        for (const part of currentPath) {
          if (!currentSection[part]) currentSection[part] = {};
          currentSection = currentSection[part];
        }
        continue;
      }

      // Key-value pair
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) {
        errors.push({ line: lineNum, message: 'Missing = operator' });
        continue;
      }

      const key = trimmed.substring(0, eqIndex).trim();
      const valueStr = trimmed.substring(eqIndex + 1).trim();

      if (!key) {
        errors.push({ line: lineNum, message: 'Empty key' });
        continue;
      }

      try {
        let value: any = valueStr;

        if (valueStr === 'true') value = true;
        else if (valueStr === 'false') value = false;
        else if (valueStr === 'null') value = null;
        else if (!isNaN(Number(valueStr)) && valueStr !== '') value = Number(valueStr);
        else if (valueStr.startsWith('"') && valueStr.endsWith('"')) {
          value = JSON.parse(valueStr);
        } else if (valueStr.startsWith("'") && valueStr.endsWith("'")) {
          value = valueStr.slice(1, -1);
        } else if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
          value = JSON.parse(valueStr);
        } else if (valueStr.startsWith('{') && valueStr.endsWith('}')) {
          value = JSON.parse(valueStr);
        }

        currentSection[key] = value;
      } catch {
        errors.push({ line: lineNum, message: 'Invalid value format' });
      }
    }

    return { data: result, errors };
  };

  const stringifyToml = (obj: Record<string, any>, prefix = ''): string => {
    let result = '';

    for (const [key, value] of Object.entries(obj)) {
      if (value === null) continue;

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (Object.keys(value).length > 0) {
          const sectionName = prefix ? `${prefix}.${key}` : key;
          result += `\n[${sectionName}]\n`;
          result += stringifyToml(value as Record<string, any>, sectionName);
        }
      } else if (Array.isArray(value)) {
        result += `${key} = ${JSON.stringify(value)}\n`;
      } else if (typeof value === 'string') {
        result += `${key} = "${value}"\n`;
      } else {
        result += `${key} = ${value}\n`;
      }
    }

    return result;
  };

  const convertToml = () => {
    setErrors([]);
    setJsonOutput('');

    if (!tomlInput.trim()) {
      setErrors([{ line: 0, message: 'Input is empty' }]);
      return;
    }

    const { data, errors: parseErrors } = parseToml(tomlInput);

    if (parseErrors.length > 0) {
      setErrors(parseErrors);
    }

    setJsonOutput(JSON.stringify(data, null, 2));
  };

  const convertJsonToToml = () => {
    setErrors([]);
    setJsonOutput('');

    if (!tomlInput.trim()) {
      setErrors([{ line: 0, message: 'Input is empty' }]);
      return;
    }

    try {
      const parsed = JSON.parse(tomlInput);
      const tomlStr = stringifyToml(parsed);
      setJsonOutput(tomlStr);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setErrors([{ line: 0, message: msg }]);
    }
  };

  const convert = () => {
    if (convertMode === 'toml-to-json') {
      convertToml();
    } else {
      convertJsonToToml();
    }
  };

  const loadSampleToml = () => {
    const sample = `# This is a TOML example
title = "DevToolBox"
version = "1.0.0"
debug = true

[owner]
name = "John Doe"
email = "john@example.com"

[database]
server = "192.168.1.1"
ports = [8001, 8001, 8002]
maxRetries = 3
enabled = true`;
    setTomlInput(sample);
    setJsonOutput('');
    setErrors([]);
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="toml-editor"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Mode:</label>
          <select
            value={convertMode}
            onChange={(e) => {
              setConvertMode(e.target.value as 'toml-to-json' | 'json-to-toml');
              setJsonOutput('');
              setErrors([]);
            }}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: 13,
            }}
          >
            <option value="toml-to-json">TOML → JSON</option>
            <option value="json-to-toml">JSON → TOML</option>
          </select>
        </div>
        <button onClick={convert} className="btn btn-primary">Convert</button>
        <button onClick={loadSampleToml} className="btn btn-secondary">Load Sample</button>
        <button
          onClick={() => {
            setTomlInput('');
            setJsonOutput('');
            setErrors([]);
          }}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '12px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>✕ Errors ({errors.length}):</div>
          {errors.map((err, i) => (
            <div key={i}>
              {err.line > 0 ? `Line ${err.line}: ` : ''}{err.message}
            </div>
          ))}
        </div>
      )}

      {/* Input/Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {convertMode === 'toml-to-json' ? 'TOML Input' : 'JSON Input'}
            </label>
          </div>
          <textarea
            value={tomlInput}
            onChange={(e) => setTomlInput(e.target.value)}
            placeholder={convertMode === 'toml-to-json' ? 'Paste TOML content...' : 'Paste JSON content...'}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>
              {convertMode === 'toml-to-json' ? 'JSON Output' : 'TOML Output'}
            </label>
            {jsonOutput && <CopyButton text={jsonOutput} />}
          </div>
          <textarea
            value={jsonOutput}
            readOnly
            placeholder="Output will appear here..."
            style={{ minHeight: 350, background: 'var(--bg-secondary)', cursor: 'default' }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About TOML Editor</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          TOML (Tom's Obvious, Minimal Language) is a configuration file format that is easy to read and write. Our TOML editor allows you to parse, validate, and convert TOML to JSON and vice versa with full syntax error reporting.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Parse TOML and validate syntax with line number error reporting</li>
          <li>Convert TOML to JSON format for easy processing</li>
          <li>Convert JSON to TOML for configuration files</li>
          <li>Support for sections, arrays, strings, numbers, booleans, and null values</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
