'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

class Base58 {
  static encode(buffer: Uint8Array): string {
    let encoded = '';
    let num = 0n;

    for (let i = 0; i < buffer.length; i++) {
      num = num * 256n + BigInt(buffer[i]);
    }

    if (num === 0n) {
      return ALPHABET[0];
    }

    while (num > 0n) {
      const remainder = Number(num % 58n);
      encoded = ALPHABET[remainder] + encoded;
      num = num / 58n;
    }

    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
      encoded = ALPHABET[0] + encoded;
    }

    return encoded;
  }

  static decode(encoded: string): Uint8Array {
    let num = 0n;

    for (let i = 0; i < encoded.length; i++) {
      const digit = ALPHABET.indexOf(encoded[i]);
      if (digit === -1) {
        throw new Error(`Invalid character: ${encoded[i]}`);
      }
      num = num * 58n + BigInt(digit);
    }

    const bytes: number[] = [];
    while (num > 0n) {
      bytes.unshift(Number(num % 256n));
      num = num / 256n;
    }

    for (let i = 0; i < encoded.length && encoded[i] === ALPHABET[0]; i++) {
      bytes.unshift(0);
    }

    return new Uint8Array(bytes.length === 0 ? [0] : bytes);
  }

}

async function sha256(bytes: Uint8Array): Promise<Uint8Array> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Base58Check requires Web Crypto support');
  }
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return new Uint8Array(digest);
}

async function appendBase58CheckChecksum(payload: Uint8Array): Promise<Uint8Array> {
  const first = await sha256(payload);
  const second = await sha256(first);
  const withChecksum = new Uint8Array(payload.length + 4);
  withChecksum.set(payload);
  withChecksum.set(second.slice(0, 4), payload.length);
  return withChecksum;
}

async function verifyBase58Check(decoded: Uint8Array): Promise<Uint8Array> {
  if (decoded.length < 5) {
    throw new Error('Invalid Base58Check input');
  }

  const payload = decoded.slice(0, -4);
  const checksum = decoded.slice(-4);
  const expected = (await appendBase58CheckChecksum(payload)).slice(-4);

  for (let i = 0; i < checksum.length; i++) {
    if (checksum[i] !== expected[i]) {
      throw new Error('Invalid Base58Check checksum');
    }
  }

  return payload;
}

export default function Base58Encoder() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['base58-encoder'];

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [useCheck, setUseCheck] = useState(false);
  const [error, setError] = useState('');

  const process = useCallback(async () => {
    try {
      setError('');
      if (!input.trim()) {
        setError('Please enter input data');
        return;
      }

      let result = '';

      if (mode === 'encode') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        result = Base58.encode(useCheck ? await appendBase58CheckChecksum(bytes) : bytes);
      } else {
        try {
          const decoded = Base58.decode(input);
          const payload = useCheck ? await verifyBase58Check(decoded) : decoded;
          result = new TextDecoder().decode(payload);
        } catch (err) {
          throw err instanceof Error ? err : new Error('Invalid Base58 input');
        }
      }

      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setOutput('');
    }
  }, [input, mode, useCheck]);

  const handleSwap = useCallback(() => {
    setInput(output);
    setOutput(input);
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setError('');
  }, [input, output, mode]);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    fontSize: 13,
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-primary)',
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none',
    resize: 'vertical',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: 'var(--accent-blue)',
    color: 'white',
    transition: 'opacity 0.2s',
  };

  const secondaryButtonStyle: React.CSSProperties = {
    padding: '8px 16px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: '1px solid var(--border-color)',
    cursor: 'pointer',
    background: 'var(--bg-input)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s',
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="base58-encoder">
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => setMode('encode')}
            style={{
              ...secondaryButtonStyle,
              background: mode === 'encode' ? 'var(--accent-blue)' : 'var(--bg-input)',
              color: mode === 'encode' ? 'white' : 'var(--text-primary)',
              borderColor: mode === 'encode' ? 'var(--accent-blue)' : 'var(--border-color)',
            }}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            style={{
              ...secondaryButtonStyle,
              background: mode === 'decode' ? 'var(--accent-blue)' : 'var(--bg-input)',
              color: mode === 'decode' ? 'white' : 'var(--text-primary)',
              borderColor: mode === 'decode' ? 'var(--accent-blue)' : 'var(--border-color)',
            }}
          >
            Decode
          </button>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer', marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={useCheck}
            onChange={(e) => setUseCheck(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Use Base58Check (with checksum)
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            Input {mode === 'encode' ? '(Text)' : '(Base58)'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base58 string to decode...'}
            rows={10}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
            Output {mode === 'encode' ? '(Base58)' : '(Text)'}
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
            rows={10}
            style={{ ...inputStyle, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
          />
        </div>
      </div>

      {error && (
        <div style={{
          padding: 12,
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgb(239, 68, 68)',
          borderRadius: 6,
          color: 'rgb(239, 68, 68)',
          fontSize: 12,
          marginBottom: 16,
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={process} style={buttonStyle}>
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button onClick={handleSwap} style={secondaryButtonStyle}>
          Swap
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} style={secondaryButtonStyle}>
          Clear
        </button>
        {output && (
          <>
            <CopyButton text={output} label={dict.common.copy} />
          </>
        )}
      </div>

      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-color)',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: 'var(--text-primary)' }}>
          Base58 Alphabet
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", wordBreak: 'break-all', lineHeight: 1.8 }}>
          {ALPHABET}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8 }}>
          Base58 uses 58 alphanumeric characters (excludes 0, O, I, l to avoid confusion). Commonly used in Bitcoin addresses.
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
