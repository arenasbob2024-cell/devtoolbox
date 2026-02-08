'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';

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
      title="CSS Minifier / Beautifier"
      description="Minify CSS for production or beautify it for readability. Removes comments and extra whitespace."
      toolId="css-minifier"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setOutput(minifyCss(input))} className="btn btn-primary">Minify</button>
        <button onClick={() => setOutput(beautifyCss(input))} className="btn btn-secondary">Beautify</button>
        <button onClick={() => setInput(sampleCss)} className="btn btn-secondary">Load Sample</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">Clear</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Input CSS</label>
          <textarea value={input} onChange={e => setInput(e.target.value)}
            placeholder="Paste your CSS here..." style={{ minHeight: 350 }} />
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {input.length} characters
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Output</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder="Result..." style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
          {output && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              {output.length} characters
              {input.length > 0 && (
                <span> (saved {Math.round((1 - output.length / input.length) * 100)}%)</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>About CSS Minification</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CSS minification removes unnecessary characters like whitespace, comments, and semicolons to reduce file size. Smaller CSS files load faster, improving website performance and user experience. Use beautify mode to make minified CSS readable again.
        </p>
      </div>
    </ToolLayout>
  );
}
