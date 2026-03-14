'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface PugConverterOptions {
  indentSize: 2 | 4;
  useDivShortcuts: boolean;
  useDoubleQuotes: boolean;
}

function parseHtmlToPug(html: string, options: PugConverterOptions): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  if (parser.parseError) {
    throw new Error('Invalid HTML');
  }

  const lines: string[] = [];
  const indent = ' '.repeat(options.indentSize);

  function getTagSignature(node: Element): string {
    let tag = node.tagName.toLowerCase();
    const classes = Array.from(node.classList);
    const id = node.id;

    if (options.useDivShortcuts && tag === 'div' && (classes.length > 0 || id)) {
      tag = '';
    }

    let signature = tag;
    if (id) {
      signature += `#${id}`;
    }
    if (classes.length > 0) {
      signature += classes.map(c => `.${c}`).join('');
    }

    return signature;
  }

  function getAttributes(node: Element): string {
    const attrs = Array.from(node.attributes);
    const filtered = attrs.filter(attr => !['class', 'id'].includes(attr.name));

    if (filtered.length === 0) return '';

    const quote = options.useDoubleQuotes ? '"' : "'";
    const attrStr = filtered
      .map(attr => {
        if (attr.value === '' || attr.value === attr.name) {
          return attr.name;
        }
        return `${attr.name}=${quote}${attr.value}${quote}`;
      })
      .join(', ');

    return `(${attrStr})`;
  }

  function processNode(node: Node, depth: number): void {
    const currentIndent = indent.repeat(depth);

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const isSelfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tagName);

      const signature = getTagSignature(element);
      const attributes = getAttributes(element);
      let line = currentIndent + signature + attributes;

      const children = Array.from(node.childNodes);
      const hasChildren = children.some(n => n.nodeType !== Node.TEXT_NODE || (n.textContent?.trim() !== ''));

      if (!hasChildren && isSelfClosing) {
        lines.push(line);
      } else if (!hasChildren) {
        lines.push(line);
      } else {
        let textContent = '';
        let hasElementChildren = false;

        for (const child of children) {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent?.trim();
            if (text) {
              textContent = text;
            }
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            hasElementChildren = true;
          }
        }

        if (textContent && !hasElementChildren) {
          line += ` ${textContent}`;
          lines.push(line);
        } else {
          lines.push(line);
          for (const child of children) {
            processNode(child, depth + 1);
          }
        }
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        lines.push(currentIndent + `| ${text}`);
      }
    }
  }

  if (doc.documentElement) {
    const children = Array.from(doc.documentElement.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        processNode(child, 0);
      }
    }
  }

  return lines.join('\n');
}

export default function HtmlToPug() {
  const { dict } = useLang();
  const t = dict.tools['html-to-pug'] as Record<string, unknown>;
  const common = dict.common;

  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState<2 | 4>(2);
  const [useDivShortcuts, setUseDivShortcuts] = useState(true);
  const [useDoubleQuotes, setUseDoubleQuotes] = useState(true);

  const convert = () => {
    try {
      const result = parseHtmlToPug(input, {
        indentSize,
        useDivShortcuts,
        useDoubleQuotes,
      });
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Conversion error');
      setOutput('');
    }
  };

  const loadSample = () => {
    const sample = `<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <nav class="navbar navbar-dark">
    <a href="/" class="logo">DevToolBox</a>
  </nav>
  <div class="container">
    <h1>Welcome</h1>
    <form id="signup" class="form-group">
      <label>Name</label>
      <input type="text" name="name" required>
      <label>Email</label>
      <input type="email" name="email" required>
      <button type="submit">Sign Up</button>
    </form>
    <ul class="features">
      <li>Fast & Reliable</li>
      <li>Privacy Focused</li>
      <li>100% Free</li>
    </ul>
  </div>
</body>
</html>`;
    setInput(sample);
  };

  return (
    <ToolLayout
      title={t.pageTitle as string}
      description={t.pageDescription as string}
      toolId="html-to-pug"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{t.convertBtn as string}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={useDivShortcuts}
              onChange={e => setUseDivShortcuts(e.target.checked)}
            />
            {t.divShortcuts as string}
          </label>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={useDoubleQuotes}
              onChange={e => setUseDoubleQuotes(e.target.checked)}
            />
            {t.doubleQuotes as string}
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.indentSize as string}:</label>
            <select
              value={indentSize}
              onChange={e => setIndentSize(Number(e.target.value) as 2 | 4)}
              style={{ width: 50, padding: '4px 8px', fontSize: 12 }}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.inputLabel as string}</label>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t.inputPlaceholder as string}
            style={{ minHeight: 350 }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{t.outputLabel as string}</label>
            <CopyButton text={output} />
          </div>
          <textarea
            value={output}
            readOnly
            placeholder={t.outputPlaceholder as string}
            style={{ minHeight: 350, opacity: output ? 1 : 0.5 }}
          />
        </div>
      </div>

      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle as string}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent as string}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle as string}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 as string}</li>
          <li>{t.seoFeature2 as string}</li>
          <li>{t.seoFeature3 as string}</li>
          <li>{t.seoFeature4 as string}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
