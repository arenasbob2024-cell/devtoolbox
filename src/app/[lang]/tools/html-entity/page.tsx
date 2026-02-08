'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function encodeHtmlEntities(str: string): string {
  return str.replace(/[&<>"'\/]/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };
    return entities[char] || char;
  });
}

function encodeAllHtmlEntities(str: string): string {
  return [...str].map(char => {
    const code = char.charCodeAt(0);
    if (code > 127 || /[&<>"'\/]/.test(char)) {
      return `&#${code};`;
    }
    return char;
  }).join('');
}

function decodeHtmlEntities(str: string): string {
  const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (textarea) {
    textarea.innerHTML = str;
    return textarea.value;
  }
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

export default function HtmlEntity() {
  const { dict } = useLang();
  const t = dict.tools['html-entity'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'encodeAll' | 'decode'>('encode');

  const process = () => {
    switch (mode) {
      case 'encode': setOutput(encodeHtmlEntities(input)); break;
      case 'encodeAll': setOutput(encodeAllHtmlEntities(input)); break;
      case 'decode': setOutput(decodeHtmlEntities(input)); break;
    }
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="html-entity"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)}
          style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}>
          <option value="encode">{t.encodeSpecial}</option>
          <option value="encodeAll">{t.encodeAll}</option>
          <option value="decode">{dict.common.decode}</option>
        </select>
        <button onClick={process} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{dict.common.encode}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode.includes('encode') ? '<div class="test">Hello & World</div>' : '&lt;div&gt;Hello&lt;/div&gt;'}
            style={{ minHeight: 250 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.resultPlaceholder}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 250, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
      </div>
    </ToolLayout>
  );
}
