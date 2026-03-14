'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import FaqSection from '@/components/FaqSection';
import { useLang } from '@/i18n/LangContext';

export default function UrlEncoder() {
  const { dict, lang } = useLang();
  const t = dict.tools['url-encoder'];
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
      setOutput(`${dict.common.error}: Invalid input`);
    }
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
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
          }}>{dict.common.encode}</button>
          <button onClick={() => setMode('decode')} style={{
            padding: '8px 20px', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            background: mode === 'decode' ? 'var(--accent-blue)' : 'transparent',
            color: mode === 'decode' ? 'white' : 'var(--text-secondary)',
          }}>{dict.common.decode}</button>
        </div>
        <select value={encodeType} onChange={e => setEncodeType(e.target.value as 'component' | 'full')}
          style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}>
          <option value="component">{t.uriComponent}</option>
          <option value="full">{t.fullUri}</option>
        </select>
        <button onClick={process} className="btn btn-primary">{mode === 'encode' ? `${dict.common.encode} →` : `← ${dict.common.decode}`}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>
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
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder}
            style={{ minHeight: 250, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

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
                {t.faqs[0].a} Safe URL transmission is essential for APIs. Learn more with our{' '}
                <a href={`/${lang}/tools/http-request-builder`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  HTTP Request Builder
                </a>
                .
              </>
            ),
          },
          {
            question: t.faqs[1].q,
            answer: (
              <>
                {t.faqs[1].a} For example, encodeURIComponent("hello&world") includes the &, while encodeURI preserves it. Try our{' '}
                <a href={`/${lang}/tools/base64`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  Base64 Encoder
                </a>{' '}
                for another encoding method.
              </>
            ),
          },
          {
            question: t.faqs[2].q,
            answer: t.faqs[2].a,
          },
          {
            question: 'What about query string encoding?',
            answer: (
              <>
                Always use encodeURIComponent for query string values. Need to validate your URLs afterward? Try our{' '}
                <a href={`/${lang}/tools/url-parser`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
                  URL Parser
                </a>{' '}
                to break down URLs into components.
              </>
            ),
          },
        ]}
        toolId="url-encoder"
        lang={lang}
      />
    </ToolLayout>
  );
}
