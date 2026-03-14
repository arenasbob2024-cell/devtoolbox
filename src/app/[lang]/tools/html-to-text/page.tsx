'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

export default function HtmlToText() {
  const { dict } = useLang();
  const t = (dict.tools as any)['html-to-text'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [preserveLinks, setPreserveLinks] = useState(false);
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);

  const convert = () => {
    let text = input;
    // Decode HTML entities
    const textarea = document.createElement('textarea');

    // Handle block elements with line breaks
    if (preserveLineBreaks) {
      text = text.replace(/<br\s*\/?>/gi, '\n');
      text = text.replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, '\n');
      text = text.replace(/<(hr)\s*\/?>/gi, '\n---\n');
    }

    // Extract links if preserving
    if (preserveLinks) {
      text = text.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '$2 ($1)');
    }

    // Remove all remaining HTML tags
    text = text.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    textarea.innerHTML = text;
    text = textarea.value;

    // Clean up whitespace
    text = text.replace(/[ \t]+/g, ' ');
    text = text.replace(/\n{3,}/g, '\n\n');
    text = text.trim();

    setOutput(text);
  };

  const loadSample = () => {
    setInput(`<html>
<body>
  <h1>Welcome to DevToolBox</h1>
  <p>This is a <strong>powerful</strong> set of <em>developer tools</em>.</p>
  <p>Visit our site at <a href="https://viadreams.cc">DevToolBox</a> for more.</p>
  <ul>
    <li>JSON Formatter</li>
    <li>Base64 Encoder</li>
    <li>UUID Generator</li>
  </ul>
  <p>Copyright &amp; &copy; 2024 DevToolBox. All rights reserved.</p>
</body>
</html>`);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="html-to-text">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">Convert</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
          <input type="checkbox" checked={preserveLinks} onChange={e => setPreserveLinks(e.target.checked)} /> Preserve links
        </label>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <input type="checkbox" checked={preserveLineBreaks} onChange={e => setPreserveLineBreaks(e.target.checked)} /> Preserve line breaks
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>HTML Input</label>
            <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your HTML here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Plain Text Output</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Converted text will appear here..." style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
