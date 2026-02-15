'use client';

import { useState, useCallback, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

// MD5 implementation - pure JavaScript
function md5(str: string): string {
  function utf8Encode(s: string): Uint8Array {
    const bytes: number[] = [];
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c < 0x80) {
        bytes.push(c);
      } else if (c < 0x800) {
        bytes.push(0xc0 | (c >> 6));
        bytes.push(0x80 | (c & 0x3f));
      } else {
        bytes.push(0xe0 | (c >> 12));
        bytes.push(0x80 | ((c >> 6) & 0x3f));
        bytes.push(0x80 | (c & 0x3f));
      }
    }
    return new Uint8Array(bytes);
  }

  const utf8 = utf8Encode(str);
  const bytes = Array.from(utf8);

  // Padding
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);

  // Append length as 64-bit little-endian
  for (let i = 0; i < 8; i++) bytes.push((bitLen >>> (i * 8)) & 0xff);

  // Initialize MD5 state
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4,
    11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const K: number[] = [];
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
  }

  // Process each 64-byte chunk
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) {
      M[j] = bytes[offset + j * 4] | (bytes[offset + j * 4 + 1] << 8) | (bytes[offset + j * 4 + 2] << 16) | (bytes[offset + j * 4 + 3] << 24);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number, g: number;

      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }

      const temp = (F + A + K[i] + M[g]) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + ((temp << S[i]) | (temp >>> (32 - S[i])))) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  function toHex(n: number): string {
    return Array.from({ length: 4 }, (_, i) => ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0')).join('');
  }

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

// MD5 from ArrayBuffer
function md5Buffer(buffer: ArrayBuffer): string {
  const bytes = Array.from(new Uint8Array(buffer));

  // Padding
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);

  // Append length as 64-bit little-endian
  for (let i = 0; i < 8; i++) bytes.push((bitLen >>> (i * 8)) & 0xff);

  // Initialize MD5 state
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4,
    11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const K: number[] = [];
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
  }

  // Process each 64-byte chunk
  for (let offset = 0; offset < bytes.length; offset += 64) {
    const M: number[] = [];
    for (let j = 0; j < 16; j++) {
      M[j] = bytes[offset + j * 4] | (bytes[offset + j * 4 + 1] << 8) | (bytes[offset + j * 4 + 2] << 16) | (bytes[offset + j * 4 + 3] << 24);
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number, g: number;

      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }

      const temp = (F + A + K[i] + M[g]) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + ((temp << S[i]) | (temp >>> (32 - S[i])))) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  function toHex(n: number): string {
    return Array.from({ length: 4 }, (_, i) => ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0')).join('');
  }

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

// SHA hashing via Web Crypto API
async function shaHash(algorithm: string, message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// SHA hashing from ArrayBuffer
async function shaHashBuffer(algorithm: string, buffer: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface HashResult {
  algorithm: string;
  hash: string;
}

export default function MultiHashGenerator() {
  const { dict } = useLang();
  const t = dict.tools['multi-hash-generator'];

  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'text' | 'file'>('text');
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<HashResult[]>([]);
  const [uppercase, setUppercase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Compute text hashes
  const computeTextHashes = useCallback(async (text: string) => {
    if (!text) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const md5Result = md5(text);
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        shaHash('SHA-1', text),
        shaHash('SHA-256', text),
        shaHash('SHA-384', text),
        shaHash('SHA-512', text),
      ]);

      setResults([
        { algorithm: 'MD5', hash: md5Result },
        { algorithm: 'SHA-1', hash: sha1 },
        { algorithm: 'SHA-256', hash: sha256 },
        { algorithm: 'SHA-384', hash: sha384 },
        { algorithm: 'SHA-512', hash: sha512 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Compute file hashes
  const computeFileHashes = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const md5Result = md5Buffer(buffer);
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        shaHashBuffer('SHA-1', buffer),
        shaHashBuffer('SHA-256', buffer),
        shaHashBuffer('SHA-384', buffer),
        shaHashBuffer('SHA-512', buffer),
      ]);

      setResults([
        { algorithm: 'MD5', hash: md5Result },
        { algorithm: 'SHA-1', hash: sha1 },
        { algorithm: 'SHA-256', hash: sha256 },
        { algorithm: 'SHA-384', hash: sha384 },
        { algorithm: 'SHA-512', hash: sha512 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-hash on text input change
  useEffect(() => {
    if (mode === 'text') {
      computeTextHashes(input);
    }
  }, [input, mode, computeTextHashes]);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile) {
      setFile(selectedFile);
      setMode('file');
      computeFileHashes(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const formatHash = (hash: string) => (uppercase ? hash.toUpperCase() : hash);

  const handleCopyAll = () => {
    const text = results.map(r => `${r.algorithm}: ${formatHash(r.hash)}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="multi-hash-generator">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Left side - Input area */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => {
                setMode('text');
                setFile(null);
                setResults([]);
              }}
              style={{
                padding: '8px 12px',
                fontSize: 13,
                fontWeight: 600,
                border: mode === 'text' ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: mode === 'text' ? 'var(--accent-blue)' : 'var(--bg-input)',
                color: mode === 'text' ? 'white' : 'var(--text-primary)',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.textMode}
            </button>
            <button
              onClick={() => {
                setMode('file');
                setInput('');
                setResults([]);
              }}
              style={{
                padding: '8px 12px',
                fontSize: 13,
                fontWeight: 600,
                border: mode === 'file' ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                background: mode === 'file' ? 'var(--accent-blue)' : 'var(--bg-input)',
                color: mode === 'file' ? 'white' : 'var(--text-primary)',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.fileMode}
            </button>
          </div>

          {mode === 'text' ? (
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.inputPlaceholder}
              style={{
                width: '100%',
                minHeight: 200,
                padding: 12,
                fontSize: 13,
                border: '1px solid var(--border-color)',
                borderRadius: 8,
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                resize: 'vertical',
              }}
            />
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: dragActive ? '2px dashed var(--accent-blue)' : '2px dashed var(--border-color)',
                borderRadius: 8,
                padding: 32,
                textAlign: 'center',
                cursor: 'pointer',
                background: dragActive ? 'rgba(100, 150, 255, 0.05)' : 'var(--bg-input)',
                transition: 'all 0.2s',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.onchange = (e: any) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                };
                input.click();
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {file ? `${t.fileSelected}: ${file.name}` : t.dropFile}
              </p>
            </div>
          )}
        </div>

        {/* Right side - Results */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600 }}>{t.results}</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {results.length > 0 && (
                <button onClick={handleCopyAll} className="btn btn-primary" style={{ fontSize: 12, padding: '6px 10px' }}>
                  {dict.common.copyAll}
                </button>
              )}
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
                {t.uppercase}
              </label>
            </div>
          </div>

          {loading ? (
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 20px' }}>
              Hashing...
            </div>
          ) : results.length === 0 ? (
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 20px' }}>
              {t.noInput}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {results.map(result => (
                <div
                  key={result.algorithm}
                  style={{
                    background: 'var(--bg-input)',
                    borderRadius: 8,
                    padding: '12px 16px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{result.algorithm}</span>
                    <CopyButton text={formatHash(result.hash)} label={dict.common.copy} />
                  </div>
                  <code
                    style={{
                      fontSize: 11,
                      wordBreak: 'break-all',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      lineHeight: 1.4,
                    }}
                  >
                    {formatHash(result.hash)}
                  </code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          {t.seoContent}
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, marginTop: 20 }}>{t.featuresTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
          {t.features.map((feature: string, idx: number) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              • {feature}
            </li>
          ))}
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, marginTop: 20 }}>{t.algorithmsTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          {t.algorithms.map((algo: string, idx: number) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              • {algo}
            </li>
          ))}
        </ul>
      </div>
    </ToolLayout>
  );
}
