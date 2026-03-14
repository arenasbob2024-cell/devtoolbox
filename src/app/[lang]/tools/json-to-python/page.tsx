'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type ConversionMode = 'dataclass' | 'typeddict' | 'pydantic';

interface PyType {
  name: string;
  optional: boolean;
}

export default function JsonToPython() {
  const { dict } = useLang();
  const t = dict.tools['json-to-python'];
  const [jsonInput, setJsonInput] = useState('');
  const [mode, setMode] = useState<ConversionMode>('dataclass');
  const [pythonOutput, setPythonOutput] = useState('');
  const [error, setError] = useState('');
  const [className, setClassName] = useState('DataModel');

  const getPythonType = (value: any): PyType => {
    if (value === null || value === undefined) {
      return { name: 'Any', optional: true };
    }
    if (typeof value === 'string') {
      return { name: 'str', optional: false };
    }
    if (typeof value === 'number') {
      return Number.isInteger(value) ? { name: 'int', optional: false } : { name: 'float', optional: false };
    }
    if (typeof value === 'boolean') {
      return { name: 'bool', optional: false };
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return { name: 'list[Any]', optional: false };
      }
      const itemType = getPythonType(value[0]);
      return { name: `list[${itemType.name}]`, optional: false };
    }
    if (typeof value === 'object') {
      return { name: 'dict[str, Any]', optional: false };
    }
    return { name: 'Any', optional: false };
  };

  const camelToSnake = (str: string): string => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  };

  const generateDataclass = (obj: any, className: string): string => {
    let code = `from dataclasses import dataclass\nfrom typing import Optional, Any\n\n@dataclass\nclass ${className}:\n`;
    const lines: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const pyType = getPythonType(value);
      const typeStr = pyType.optional ? `Optional[${pyType.name}]` : pyType.name;
      const fieldName = camelToSnake(key);
      lines.push(`    ${fieldName}: ${typeStr} = None`);
    }

    return code + (lines.length > 0 ? lines.join('\n') : '    pass');
  };

  const generateTypedDict = (obj: any, className: string): string => {
    let code = `from typing import TypedDict, Optional, Any\n\nclass ${className}(TypedDict, total=False):\n`;
    const lines: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const pyType = getPythonType(value);
      const typeStr = pyType.optional ? `Optional[${pyType.name}]` : pyType.name;
      const fieldName = camelToSnake(key);
      lines.push(`    ${fieldName}: ${typeStr}`);
    }

    return code + (lines.length > 0 ? lines.join('\n') : '    pass');
  };

  const generatePydantic = (obj: any, className: string): string => {
    let code = `from pydantic import BaseModel\nfrom typing import Optional, Any\n\nclass ${className}(BaseModel):\n`;
    const lines: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const pyType = getPythonType(value);
      const typeStr = pyType.optional ? `Optional[${pyType.name}]` : pyType.name;
      const fieldName = camelToSnake(key);
      lines.push(`    ${fieldName}: ${typeStr} = None`);
    }

    return code + (lines.length > 0 ? lines.join('\n') : '    pass');
  };

  const convert = () => {
    setError('');
    setPythonOutput('');

    if (!jsonInput.trim()) {
      setError('JSON input is required');
      return;
    }

    if (!className.trim()) {
      setError('Class name is required');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);

      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        setError('JSON must be an object (not array or primitive)');
        return;
      }

      let result = '';
      switch (mode) {
        case 'dataclass':
          result = generateDataclass(parsed, className);
          break;
        case 'typeddict':
          result = generateTypedDict(parsed, className);
          break;
        case 'pydantic':
          result = generatePydantic(parsed, className);
          break;
      }

      setPythonOutput(result);
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown error';
      setError(`JSON Parse Error: ${errorMsg}`);
    }
  };

  const loadSample = () => {
    const sample = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      isActive: true,
      score: 95.5,
      tags: ['python', 'json'],
    };
    setJsonInput(JSON.stringify(sample, null, 2));
  };

  const clear = () => {
    setJsonInput('');
    setPythonOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="json-to-python"
    >
      {/* Mode Selection and Controls */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>Mode:</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
            <input
              type="radio"
              value="dataclass"
              checked={mode === 'dataclass'}
              onChange={(e) => setMode(e.target.value as ConversionMode)}
              style={{ cursor: 'pointer' }}
            />
            Dataclass
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
            <input
              type="radio"
              value="typeddict"
              checked={mode === 'typeddict'}
              onChange={(e) => setMode(e.target.value as ConversionMode)}
              style={{ cursor: 'pointer' }}
            />
            TypedDict
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 14 }}>
            <input
              type="radio"
              value="pydantic"
              checked={mode === 'pydantic'}
              onChange={(e) => setMode(e.target.value as ConversionMode)}
              style={{ cursor: 'pointer' }}
            />
            Pydantic BaseModel
          </label>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Enter class name..."
            style={{
              padding: '8px 12px',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: 13,
              minWidth: 180,
            }}
          />
          <button onClick={convert} className="btn btn-primary">Convert</button>
          <button onClick={loadSample} className="btn btn-secondary">Load Sample</button>
          <button onClick={clear} className="btn btn-secondary">Clear</button>
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

      {/* Input and Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>JSON Input</label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Python Output</label>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            padding: 12,
            fontFamily: 'monospace',
            fontSize: 13,
            color: 'var(--text-primary)',
            minHeight: 350,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            position: 'relative',
          }}>
            {pythonOutput || '# Python code will appear here'}
            {pythonOutput && <CopyButton text={pythonOutput} />}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>What is JSON to Python Converter?</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
          This tool automatically converts JSON objects into Python class definitions. It supports three popular Python patterns: Dataclass, TypedDict, and Pydantic BaseModel. Perfect for developers who need to quickly generate Python type definitions from JSON data structures.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20, marginBottom: 16 }}>
          <li>Automatically detects JSON data types (string, number, boolean, array, object)</li>
          <li>Generates three Python patterns: Dataclass, TypedDict, and Pydantic BaseModel</li>
          <li>Converts camelCase keys to snake_case for Python naming conventions</li>
          <li>Handles nested objects and arrays with proper type annotations</li>
          <li>Supports Optional types for nullable fields</li>
          <li>One-click copy functionality for generated Python code</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Supported Conversion Modes</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Dataclass:</strong> Uses Python's @dataclass decorator for immutable data structures</li>
          <li><strong>TypedDict:</strong> Uses typing.TypedDict for dictionary-based type hints</li>
          <li><strong>Pydantic BaseModel:</strong> Uses Pydantic for data validation and serialization</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
