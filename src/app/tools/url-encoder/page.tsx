'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'full'>('component');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(encodeType === 'component' ? decodeURIComponent(input) : decodeURI(input));
      }
    } catch {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <ToolLayout
      title="URL Encoder / Decoder"
      description="Encode or decode URLs and URI components. Supports encodeURIComponent and encodeURI."
      toolId="url-encoder"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', background: 'var(--bg-input)', borderRadius: 8,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <button onClick={() => setMode('encode')} style={{
            padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === 'encode' ? 'var(--accent-blue)' : 'transparent',
            color: mode === 'encode' ? 'white' : 'var(--text-secondary)',
          }}>Encode</button>
          <button onClick={() => setMode('decode')} style={{
            padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === 'decode' ? 'var(--accent-blue)' : 'transparent',
            color: mode === 'decode' ? 'white' : 'var(--text-secondary)',
          }}>Decode</button>
        </div>
        <select value={encodeType} onChange={e => setEncodeType(e.target.value as 'component' | 'full')}
          style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}>
          <option value="component">URI Component</option>
          <option value="full">Full URI</option>
        </select>
        <button onClick={process} className="btn btn-primary">{mode === 'encode' ? 'Encode →' : '← Decode'}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">Clear</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world&lang=中文' : 'https%3A%2F%2Fexample.com'}
            style={{ minHeight: 250 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Output</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Result will appear here..."
            style={{ minHeight: 250, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About URL Encoding</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          URL encoding replaces unsafe ASCII characters with a &quot;%&quot; followed by two hexadecimal digits. This is essential for passing special characters in URLs, query parameters, and form data. Use <code>encodeURIComponent</code> for query parameters and <code>encodeURI</code> for full URLs.
        </p>
      </div>
    </ToolLayout>
  );
}
