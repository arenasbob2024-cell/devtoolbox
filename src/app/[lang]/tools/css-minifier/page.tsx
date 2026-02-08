'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\s+/g, ' ')            // collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // remove space around selectors
    .replace(/;}/g, '}')             // remove last semicolon
    .trim();
}

function beautifyCss(css: string): string {
  let result = css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\s+/g, ' ')
    .trim();

  let indent = 0;
  let output = '';
  for (let i = 0; i < result.length; i++) {
    const char = result[i];
    if (char === '{') {
      indent++;
      output += ' {\n' + '  '.repeat(indent);
    } else if (char === '}') {
      indent--;
      output += '\n' + '  '.repeat(indent) + '}\n' + '  '.repeat(indent);
    } else if (char === ';') {
      output += ';\n' + '  '.repeat(indent);
    } else if (char === ',' && result[i + 1] !== ' ') {
      output += ', ';
    } else {
      output += char;
    }
  }
  return output.replace(/\n\s*\n/g, '\n').trim();
}

export default function CssMinifier() {
  const { dict } = useLang();
  const t = dict.tools['css-minifier'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const sampleCss = `/* Reset styles */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 40px 20px;
  text-align: center;
  border-radius: 12px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}`;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="css-minifier"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(minifyCss(input))} className="btn btn-primary">{dict.common.minify}</button>
        <button onClick={() => setOutput(beautifyCss(input))} className="btn btn-secondary">{dict.common.beautify}</button>
        <button onClick={() => setInput(sampleCss)} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{t.inputCss}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder={t.placeholder} style={{ minHeight: 350 }} />
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {input.length} {dict.common.characters}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.resultPlaceholder}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
          {output && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {output.length} {dict.common.characters}
              {input.length > 0 && (
                <span> ({dict.common.saved} {Math.round((1 - output.length / input.length) * 100)}%)</span>
              )}
            </div>
          )}
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
