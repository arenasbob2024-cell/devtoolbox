'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError('');
      setOutput('✓ Valid JSON');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = {
      name: "DevToolBox",
      version: "1.0.0",
      features: ["JSON Formatter", "Base64 Encoder", "UUID Generator"],
      config: {
        theme: "dark",
        language: "en",
        notifications: true
      },
      users: 15000,
      active: true
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <ToolLayout
      title="JSON Formatter & Validator"
      description="Format, beautify, minify, and validate JSON data online. Supports syntax checking and custom indentation."
      toolId="json-formatter"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={format} className="btn btn-primary">Format / Beautify</button>
        <button onClick={minify} className="btn btn-secondary">Minify</button>
        <button onClick={validate} className="btn btn-secondary">Validate</button>
        <button onClick={loadSample} className="btn btn-secondary">Load Sample</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Indent:</label>
          <select
            value={indent}
            onChange={e => setIndent(Number(e.target.value))}
            style={{ width: 60, padding: '4px 8px', fontSize: 12 }}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
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
          ✕ Error: {error}
        </div>
      )}

      {/* Input / Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Input JSON</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>Clear</button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Paste your JSON here...\n\n{"key": "value"}'
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Output</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>What is JSON Formatter?</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. This JSON formatter tool helps you format, beautify, minify, and validate JSON data. Simply paste your JSON, click Format, and get a clean, readable output. Perfect for debugging API responses, config files, and data processing.
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Features</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Format & beautify JSON with custom indentation (2, 4, or 8 spaces)</li>
          <li>Minify JSON for production use</li>
          <li>Validate JSON syntax with detailed error messages</li>
          <li>100% client-side processing — your data never leaves your browser</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
