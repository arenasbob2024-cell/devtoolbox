'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

function inflateRaw(data: Uint8Array): string {
  // Use pako-like inflate via DecompressionStream if available, fallback to manual
  try {
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(data);
    writer.close();
    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    return new Promise<string>((resolve, reject) => {
      function pump(): void {
        reader.read().then(({ done, value }) => {
          if (done) {
            const combined = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
            let offset = 0;
            for (const c of chunks) { combined.set(c, offset); offset += c.length; }
            resolve(new TextDecoder().decode(combined));
            return;
          }
          chunks.push(value);
          pump();
        }).catch(reject);
      }
      pump();
    }) as unknown as string;
  } catch {
    return new TextDecoder().decode(data);
  }
}

function formatXml(xml: string): string {
  let formatted = '';
  let indent = 0;
  const lines = xml.replace(/>\s*</g, '><').split(/(<[^>]+>)/g).filter(Boolean);
  for (const token of lines) {
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      formatted += '  '.repeat(indent) + token + '\n';
    } else if (token.startsWith('<') && !token.startsWith('<?') && !token.endsWith('/>') && !token.includes('</')) {
      formatted += '  '.repeat(indent) + token + '\n';
      indent++;
    } else if (token.startsWith('<?') || token.endsWith('/>')) {
      formatted += '  '.repeat(indent) + token + '\n';
    } else {
      formatted += '  '.repeat(indent) + token + '\n';
    }
  }
  return formatted.trim();
}

export default function SamlDecoderTool() {
  const { dict } = useLang();
  const t = dict.tools['saml-decoder'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'response' | 'request'>('response');
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const params = getHashParams();
    if (params.mode === 'response' || params.mode === 'request') setMode(params.mode);
    if (params.input) {
      const decoded = decodeFromUrl(params.input);
      if (decoded) setInput(decoded);
    }
  }, []);

  const handleShare = () => {
    if (!input) return;
    setHashParams({ input: encodeForUrl(input), mode });
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const decodeSaml = async () => {
    setError('');
    setOutput('');
    try {
      let xml = '';
      const trimmed = input.trim();

      if (mode === 'request') {
        // SAML Request: URL-encoded + Base64 + Deflate
        let b64 = trimmed;
        try {
          b64 = decodeURIComponent(b64);
        } catch { /* already decoded */ }
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        // Try deflate-raw decompression
        try {
          const ds = new DecompressionStream('deflate-raw');
          const writer = ds.writable.getWriter();
          writer.write(bytes);
          writer.close();
          const reader = ds.readable.getReader();
          const chunks: Uint8Array[] = [];
          let done = false;
          while (!done) {
            const result = await reader.read();
            if (result.done) { done = true; break; }
            chunks.push(result.value);
          }
          const combined = new Uint8Array(chunks.reduce((a, c) => a + c.length, 0));
          let offset = 0;
          for (const c of chunks) { combined.set(c, offset); offset += c.length; }
          xml = new TextDecoder().decode(combined);
        } catch {
          // Maybe not compressed, just base64
          xml = new TextDecoder().decode(bytes);
        }
      } else {
        // SAML Response: just Base64
        let b64 = trimmed;
        try {
          b64 = decodeURIComponent(b64);
        } catch { /* already decoded */ }
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        xml = new TextDecoder().decode(bytes);
      }

      // Check if it looks like XML
      if (!xml.trim().startsWith('<')) {
        setError(t.invalidSaml || 'Invalid SAML data. Could not decode to XML.');
        return;
      }

      setOutput(formatXml(xml));
    } catch (e: unknown) {
      setError(t.decodingError || `Decoding error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="saml-decoder">
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          borderRadius: 8,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => setMode('response')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'response' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'response' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {t.samlResponse || 'SAML Response'}
          </button>
          <button
            onClick={() => setMode('request')}
            style={{
              padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: mode === 'request' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'request' ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {t.samlRequest || 'SAML Request'}
          </button>
        </div>
        <button onClick={decodeSaml} className="btn btn-primary">
          {dict.common.decode} →
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
        <button onClick={handleShare} className="btn btn-secondary" style={{ marginLeft: 'auto' }} title="Share via URL">
          {shareCopied ? '✓ Link Copied!' : '🔗 Share'}
        </button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.encodedSaml || 'Encoded SAML'}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder || 'Paste your Base64-encoded SAML response or request here...'}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.decodedXml || 'Decoded XML'}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={dict.common.resultPlaceholder}
            style={{ minHeight: 350, fontFamily: 'monospace', fontSize: 12, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'About SAML Decoder'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'SAML (Security Assertion Markup Language) is an XML-based framework for exchanging authentication and authorization data between identity providers and service providers. SAML responses and requests are typically Base64-encoded. This tool decodes SAML tokens and formats the XML for easy reading. It supports both SAML Response (Base64 only) and SAML Request (Base64 + Deflate compression).'}
        </p>
      </div>
    </ToolLayout>
  );
}
