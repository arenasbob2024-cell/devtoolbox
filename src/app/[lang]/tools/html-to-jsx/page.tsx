'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function htmlToJsx(html: string): string {
  let jsx = html;

  jsx = jsx.replace(/\bclass=/g, 'className=');
  jsx = jsx.replace(/\bfor=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

  jsx = jsx.replace(/style="([^"]*)"/g, (_, styleStr: string) => {
    const props = styleStr.split(';').filter(Boolean).map(prop => {
      const [key, ...vals] = prop.split(':');
      if (!key || vals.length === 0) return '';
      const camelKey = key.trim().replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
      const value = vals.join(':').trim();
      const numMatch = value.match(/^(-?\d+\.?\d*)(px)?$/);
      if (numMatch && numMatch[2]) return `${camelKey}: ${numMatch[1]}`;
      if (numMatch && !numMatch[2]) return `${camelKey}: ${numMatch[1]}`;
      return `${camelKey}: "${value}"`;
    }).filter(Boolean);
    return `style={{${props.join(', ')}}}`;
  });

  const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  for (const tag of voidElements) {
    const regex = new RegExp(`<(${tag})(\\s[^>]*)?\\/?>(?!\\s*<\\/${tag}>)`, 'gi');
    jsx = jsx.replace(regex, (_match, tagName, attrs) => `<${tagName}${attrs || ''} />`);
  }

  const attrMap: Record<string, string> = {
    'tabindex': 'tabIndex', 'readonly': 'readOnly', 'maxlength': 'maxLength',
    'minlength': 'minLength', 'cellpadding': 'cellPadding', 'cellspacing': 'cellSpacing',
    'colspan': 'colSpan', 'rowspan': 'rowSpan', 'enctype': 'encType',
    'novalidate': 'noValidate', 'crossorigin': 'crossOrigin', 'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus', 'autoplay': 'autoPlay',
  };

  for (const [htmlAttr, jsxAttr] of Object.entries(attrMap)) {
    jsx = jsx.replace(new RegExp(`\\b${htmlAttr}=`, 'g'), `${jsxAttr}=`);
    jsx = jsx.replace(new RegExp(`\\b${htmlAttr}\\b(?!=)`, 'g'), jsxAttr);
  }

  jsx = jsx.replace(/\bon([a-z]+)=/g, (_, event: string) => `on${event.charAt(0).toUpperCase() + event.slice(1)}=`);

  return jsx;
}

export default function HtmlToJsx() {
  const { dict } = useLang();
  const t = dict.tools['html-to-jsx'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => { try { setOutput(htmlToJsx(input)); } catch { setOutput('Error converting HTML to JSX'); } };

  const loadSample = () => {
    setInput(`<div class="container">
  <h1 class="title" style="color: red; font-size: 24px;">Hello World</h1>
  <label for="email">Email:</label>
  <input type="email" id="email" tabindex="1" readonly />
  <img src="photo.jpg" alt="Photo">
  <br>
  <hr>
  <!-- This is a comment -->
  <button onclick="handleClick()" class="btn">Click Me</button>
</div>`);
  };

  return (
    <ToolLayout title={(t.pageTitle as string) || 'HTML to JSX Converter'} description={(t.pageDescription as string) || 'Convert HTML to JSX for React'} toolId="html-to-jsx">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>HTML</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='<div class="container">...</div>' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSX</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={common.resultPlaceholder} style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace', opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
      {typeof t.seoTitle === 'string' && (
        <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent as string}</p>
        </div>
      )}
    </ToolLayout>
  );
}
