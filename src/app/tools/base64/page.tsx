'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const process = () => {
    try {
      setError('');
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
      }
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 string' : 'Encoding error');
      setOutput('');
    }
  };

  const swap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <ToolLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 strings back to plain text. Supports UTF-8."
      toolId="base64"
    >
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setMode('encode')}
            style={{
              padding: '8px 20px',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === 'encode' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'encode' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            style={{
              padding: '8px 20px',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === 'decode' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'decode' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            Decode
          </button>
        </div>
        <button onClick={process} className="btn btn-primary">
          {mode === 'encode' ? 'Encode →' : '← Decode'}
        </button>
        <button onClick={swap} className="btn btn-secondary">⇅ Swap</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">Clear</button>
      </div>

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
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            style={{ minHeight: 300 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            style={{ minHeight: 300, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About Base64 Encoding</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It&apos;s commonly used for encoding data in URLs, emails, HTML, and APIs. This tool supports full UTF-8 encoding and decoding.
        </p>
      </div>
    </ToolLayout>
  );
}
