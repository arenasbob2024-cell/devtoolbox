'use client';

import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';
import { encodeForUrl, decodeFromUrl, getHashParams, setHashParams } from '@/lib/url-state';

function decodeJwt(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('invalidFormat');

  const decodeBase64Url = (str: string) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return JSON.parse(atob(base64));
  };

  const header = decodeBase64Url(parts[0]);
  const payload = decodeBase64Url(parts[1]);

  return { header, payload, signature: parts[2] };
}

export default function JwtDecoder() {
  const { dict, lang } = useLang();
  const t = dict.tools['jwt-decoder'];

  const [input, setInput] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  // Restore state from URL hash on mount
  useEffect(() => {
    const params = getHashParams();
    if (params.token) {
      const decoded = decodeFromUrl(params.token);
      if (decoded) {
        setInput(decoded);
        // Auto-decode
        try {
          const result = decodeJwt(decoded.trim());
          setHeader(JSON.stringify(result.header, null, 2));
          setPayload(JSON.stringify(result.payload, null, 2));
          setSignature(result.signature);
        } catch { /* silently ignore invalid JWT from URL */ }
      }
    }
  }, []);

  const handleShare = () => {
    if (!input) return;
    const params = { token: encodeForUrl(input) };
    setHashParams(params);
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  const decode = () => {
    try {
      setError('');
      const result = decodeJwt(input.trim());
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setSignature(result.signature);
    } catch (e: unknown) {
      const msg = e instanceof Error && e.message === 'invalidFormat' ? t.invalidFormat : t.invalidJwt;
      setError(msg);
      setHeader(''); setPayload(''); setSignature('');
    }
  };

  const loadSample = () => {
    setInput('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="jwt-decoder"
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600 }}>{t.jwtToken}</label>
          <button onClick={loadSample} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.loadSample}</button>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder={t.placeholder}
          style={{ minHeight: 100 }} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={decode} className="btn btn-primary">{t.decodeJwt}</button>
        <button onClick={handleShare} className="btn btn-secondary" title="Share via URL">
          {shareCopied ? '\u2713 Link Copied!' : '\uD83D\uDD17 Share'}
        </button>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)',
        }}>✕ {error}</div>
      )}

      {header && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: t.header, value: header, color: '#f43f5e' },
            { label: t.payload, value: payload, color: '#8b5cf6' },
            { label: t.signature, value: signature, color: '#10b981' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px',
              border: '1px solid var(--border-color)', borderLeft: `3px solid ${color}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color }}>{label}</span>
                <CopyButton text={value} />
              </div>
              <pre style={{ fontSize: 12, fontFamily: 'monospace', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0, wordBreak: 'break-all' }}>
                {value}
              </pre>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>

      {/* FAQ Section */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What is JWT and why is it used?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>JWT (JSON Web Token) is a compact, self-contained way to transmit information as a JSON object. It's widely used for authentication and authorization in APIs. The token is signed, so the server can verify it hasn't been tampered with. See <a href={`/${lang}/tools/hash-generator`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Hash Generator</a> for understanding token signatures.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Is it safe to paste my JWT token here?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>This tool runs entirely in your browser—no data is sent to any server. However, JWTs often contain sensitive user information, so be careful pasting production tokens. Never share tokens with untrusted tools or paste them in public channels.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What's the difference between JWT and JWE?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>JWT (Signed) proves the token wasn't modified and shows the payload in plain text (base64 encoded). JWE (Encrypted) encrypts the payload so only the intended recipient can read it. Use JWE when the payload contains truly sensitive data that shouldn't be visible to anyone with the token.</div>
          </div>
          <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-input)' }}>
            <div style={{ padding: '14px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>What is the "exp" claim and why does it matter?</div>
            <div style={{ padding: '0 16px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>The "exp" (expiration time) claim specifies when the token is no longer valid. Check this with your <a href={`/${lang}/tools/timestamp-converter`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>Unix timestamp converter</a> to see if a token has expired. Always validate token expiration on the server before trusting it.</div>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What is JWT and why is it used?", "acceptedAnswer": { "@type": "Answer", "text": "JWT (JSON Web Token) is a compact, self-contained way to transmit information as a JSON object. It's widely used for authentication and authorization in APIs and is signed for verification." } },
            { "@type": "Question", "name": "Is it safe to paste my JWT token here?", "acceptedAnswer": { "@type": "Answer", "text": "This tool runs entirely in your browser with no data sent to servers. However, be careful pasting production tokens as they contain sensitive user information. Never share tokens with untrusted tools." } },
            { "@type": "Question", "name": "What's the difference between JWT and JWE?", "acceptedAnswer": { "@type": "Answer", "text": "JWT (Signed) proves authenticity and shows the payload in plain text. JWE (Encrypted) encrypts the payload so only the intended recipient can read it. Use JWE for sensitive data." } },
            { "@type": "Question", "name": "What is the 'exp' claim and why does it matter?", "acceptedAnswer": { "@type": "Answer", "text": "The 'exp' (expiration time) claim specifies when the token is no longer valid. Always validate token expiration on the server before trusting it." } }
          ]
        }) }} />
      </div>
    </ToolLayout>
  );
}
