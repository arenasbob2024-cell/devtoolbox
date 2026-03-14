'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import FaqSection from '@/components/FaqSection';
import { useLang } from '@/i18n/LangContext';

async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const { dict, lang } = useLang();
  const t = dict.tools['hash-generator'];
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [uppercase, setUppercase] = useState(false);

  const generate = async () => {
    if (!input) return;
    const algorithms: Record<string, string> = {
      'SHA-1': 'SHA-1',
      'SHA-256': 'SHA-256',
      'SHA-384': 'SHA-384',
      'SHA-512': 'SHA-512',
    };
    const results: Record<string, string> = {};
    for (const [name, algo] of Object.entries(algorithms)) {
      results[name] = await hashText(input, algo);
    }
    setHashes(results);
  };

  const formatHash = (hash: string) => uppercase ? hash.toUpperCase() : hash;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="hash-generator"
    >
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputText}</label>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          style={{ minHeight: 120 }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
        <button onClick={generate} className="btn btn-primary">{t.generateHashes}</button>
        <button onClick={() => { setInput(''); setHashes({}); }} className="btn btn-secondary">{dict.common.clear}</button>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', marginLeft: 'auto', cursor: 'pointer' }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} />
          {t.uppercase}
        </label>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Object.entries(hashes).map(([name, hash]) => (
            <div key={name} style={{
              background: 'var(--bg-input)',
              borderRadius: 8,
              padding: '12px 16px',
              border: '1px solid var(--border-color)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)' }}>{name}</span>
                <CopyButton text={formatHash(hash)} label={dict.common.copy} />
              </div>
              <code style={{
                fontSize: 12,
                wordBreak: 'break-all',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                lineHeight: 1.5,
              }}>
                {formatHash(hash)}
              </code>
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

      <FaqSection
        title={t.faqTitle}
        faqs={[
          {
            question: t.faqs[0].q,
            answer: (
              <>
                {t.faqs[0].a} Try our{' '}
                <a href={`/${lang}/tools/multi-hash-generator`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  Multi Hash Generator
                </a>{' '}
                to generate all hash types simultaneously, or create HMAC signatures with our{' '}
                <a href={`/${lang}/tools/hmac-generator`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  HMAC Generator
                </a>
                .
              </>
            ),
          },
          {
            question: t.faqs[1].q,
            answer: (
              <>
                {t.faqs[1].a} For password security, use our{' '}
                <a href={`/${lang}/tools/password-generator-online`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  Password Generator
                </a>{' '}
                to create strong passwords, then hash them with SHA-256 or bcrypt.
              </>
            ),
          },
          {
            question: 'Can I verify file integrity with hashing?',
            answer: (
              <>
                Yes. Hash your file and compare it with a known hash to verify the file hasn't been modified. Use our{' '}
                <a href={`/${lang}/tools/multi-hash-generator`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  Multi Hash Generator
                </a>{' '}
                if you need to generate multiple hashes at once for file verification.
              </>
            ),
          },
          {
            question: 'Is there a relationship between base64 and hashing?',
            answer: (
              <>
                No. Base64 is encoding (reversible), while hashing is cryptographic (irreversible). You might base64-encode a hash for transport, but they serve different purposes. Check our{' '}
                <a href={`/${lang}/tools/base64`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  Base64 Tool
                </a>{' '}
                to learn more about encoding.
              </>
            ),
          },
        ]}
        toolId="hash-generator"
        lang={lang}
      />
    </ToolLayout>
  );
}
