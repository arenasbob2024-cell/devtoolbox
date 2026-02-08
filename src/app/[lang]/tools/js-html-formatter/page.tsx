'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

type Mode = 'js' | 'html';

/* ---------- JS minify / beautify ---------- */
function minifyJs(code: string): string {
  return code
    .replace(/\/\/.*$/gm, '')               // single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')        // multi-line comments
    .replace(/\s+/g, ' ')                    // collapse whitespace
    .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1')
    .replace(/;\}/g, '}')
    .trim();
}

function beautifyJs(code: string): string {
  // Simple JS beautifier
  const minified = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  let indent = 0;
  let out = '';
  let inString: string | null = null;
  let prevChar = '';

  for (let i = 0; i < minified.length; i++) {
    const ch = minified[i];
    // Track strings
    if (!inString && (ch === '"' || ch === "'" || ch === '`')) {
      inString = ch;
      out += ch;
      continue;
    }
    if (inString && ch === inString && prevChar !== '\\') {
      inString = null;
      out += ch;
      prevChar = ch;
      continue;
    }
    if (inString) { out += ch; prevChar = ch; continue; }

    if (ch === '{') {
      indent++;
      out += ' {\n' + '  '.repeat(indent);
    } else if (ch === '}') {
      indent = Math.max(0, indent - 1);
      out = out.replace(/\s+$/, '');
      out += '\n' + '  '.repeat(indent) + '}\n' + '  '.repeat(indent);
    } else if (ch === ';') {
      out += ';\n' + '  '.repeat(indent);
    } else if (ch === ',' && minified[i + 1] !== ' ') {
      out += ', ';
    } else {
      out += ch;
    }
    prevChar = ch;
  }
  return out.replace(/\n\s*\n/g, '\n').trim();
}

/* ---------- HTML minify / beautify ---------- */
function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')        // comments
    .replace(/\s+/g, ' ')                   // collapse whitespace
    .replace(/>\s+</g, '><')               // between tags
    .trim();
}

function beautifyHtml(html: string): string {
  // Remove existing formatting
  const flat = html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  const selfClosing = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr']);
  const tokens = flat.match(/<[^>]+>|[^<]+/g) || [];

  let indent = 0;
  let out = '';
  for (const token of tokens) {
    const trimmed = token.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('</')) {
      // Closing tag
      indent = Math.max(0, indent - 1);
      out += '  '.repeat(indent) + trimmed + '\n';
    } else if (trimmed.startsWith('<')) {
      out += '  '.repeat(indent) + trimmed + '\n';
      const tagMatch = trimmed.match(/^<(\w+)/);
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : '';
      if (!selfClosing.has(tagName) && !trimmed.endsWith('/>') && !trimmed.startsWith('<!')) {
        indent++;
      }
    } else {
      out += '  '.repeat(indent) + trimmed + '\n';
    }
  }
  return out.trim();
}

export default function JsHtmlFormatter() {
  const { dict } = useLang();
  const t = (dict.tools as unknown as Record<string, Record<string, string>>)['js-html-formatter'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('js');

  const handleMinify = () => setOutput(mode === 'js' ? minifyJs(input) : minifyHtml(input));
  const handleBeautify = () => setOutput(mode === 'js' ? beautifyJs(input) : beautifyHtml(input));

  const sampleJs = `// Example JavaScript
function greetUser(name) {
  if (!name) {
    console.log("Hello, World!");
    return;
  }
  const greeting = "Hello, " + name + "!";
  console.log(greeting);
  return greeting;
}

const users = ["Alice", "Bob", "Charlie"];
users.forEach(function(user) {
  greetUser(user);
});`;

  const sampleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <h1>Welcome</h1>
    <p>This is a sample HTML page.</p>
  </main>
</body>
</html>`;

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="js-html-formatter"
    >
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'var(--bg-input)', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {(['js', 'html'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setInput(''); setOutput(''); }}
            style={{
              padding: '6px 18px',
              borderRadius: 6,
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              background: mode === m ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))' : 'transparent',
              color: mode === m ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
          >
            {m === 'js' ? 'JavaScript' : 'HTML'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleMinify} className="btn btn-primary">{dict.common.minify}</button>
        <button onClick={handleBeautify} className="btn btn-secondary">{dict.common.beautify}</button>
        <button onClick={() => setInput(mode === 'js' ? sampleJs : sampleHtml)} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>
            {t.inputLabel} ({mode === 'js' ? 'JavaScript' : 'HTML'})
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={mode === 'js' ? t.jsPlaceholder : t.htmlPlaceholder}
            style={{ minHeight: 350 }}
          />
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {input.length} {dict.common.characters}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output}</label>
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
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.seoContent}</p>
      </div>
    </ToolLayout>
  );
}
