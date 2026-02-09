'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface XmlNode {
  [key: string]: string | XmlNode | (string | XmlNode)[] | undefined;
}

function xmlToJson(xml: string): string {
  const trimmed = xml.trim();
  if (!trimmed) throw new Error('Empty input');

  function parseNodes(str: string): XmlNode | string {
    const result: XmlNode = {};

    // Remove XML declaration
    let s = str.replace(/<\?xml[^?]*\?>/g, '').trim();

    // Process CDATA sections first - replace with placeholders
    const cdataMap: Record<string, string> = {};
    let cdataIdx = 0;
    s = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_, content) => {
      const key = `__CDATA_${cdataIdx++}__`;
      cdataMap[key] = content;
      return key;
    });

    // Remove comments
    s = s.replace(/<!--[\s\S]*?-->/g, '');

    // Check if this is just text content (no tags)
    if (!/</.test(s)) {
      let text = s.trim();
      // Restore CDATA
      for (const [key, val] of Object.entries(cdataMap)) {
        text = text.replace(key, val);
      }
      return text;
    }

    // Match tags
    const tagRegex = /<(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*"[^"]*"|\s+[\w:.-]+\s*=\s*'[^']*')*)\s*(\/?)>/g;
    const tokens: { type: 'open' | 'close' | 'selfclose'; name: string; attrs: string; index: number; fullMatch: string }[] = [];
    let match;

    while ((match = tagRegex.exec(s)) !== null) {
      const isClose = match[1] === '/';
      const name = match[2];
      const attrs = match[3] || '';
      const isSelfClose = match[4] === '/';

      if (isClose) {
        tokens.push({ type: 'close', name, attrs: '', index: match.index, fullMatch: match[0] });
      } else if (isSelfClose) {
        tokens.push({ type: 'selfclose', name, attrs, index: match.index, fullMatch: match[0] });
      } else {
        tokens.push({ type: 'open', name, attrs, index: match.index, fullMatch: match[0] });
      }
    }

    if (tokens.length === 0) {
      let text = s.trim();
      for (const [key, val] of Object.entries(cdataMap)) {
        text = text.replace(key, val);
      }
      return text;
    }

    function parseAttributes(attrStr: string): Record<string, string> {
      const attrs: Record<string, string> = {};
      const attrRegex = /([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
      let m;
      while ((m = attrRegex.exec(attrStr)) !== null) {
        attrs[`@${m[1]}`] = m[2] !== undefined ? m[2] : m[3];
      }
      return attrs;
    }

    function addToResult(obj: XmlNode, key: string, value: string | XmlNode): void {
      if (key in obj) {
        const existing = obj[key];
        if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          obj[key] = [existing as string | XmlNode, value];
        }
      } else {
        obj[key] = value;
      }
    }

    let ti = 0;

    function processLevel(): XmlNode {
      const node: XmlNode = {};

      while (ti < tokens.length) {
        const token = tokens[ti];

        if (token.type === 'close') {
          return node;
        }

        if (token.type === 'selfclose') {
          const attrs = parseAttributes(token.attrs);
          const value = Object.keys(attrs).length > 0 ? attrs : '';
          addToResult(node, token.name, value as string | XmlNode);
          ti++;
          continue;
        }

        if (token.type === 'open') {
          const attrs = parseAttributes(token.attrs);
          const openEnd = token.index + token.fullMatch.length;

          // Find the matching close token
          let depth = 1;
          let closeIdx = ti + 1;
          while (closeIdx < tokens.length && depth > 0) {
            if (tokens[closeIdx].type === 'open' && tokens[closeIdx].name === token.name) depth++;
            if (tokens[closeIdx].type === 'close' && tokens[closeIdx].name === token.name) depth--;
            if (depth > 0) closeIdx++;
          }

          // Get inner content between open and close tags
          const closeToken = tokens[closeIdx];
          const innerContent = closeToken ? s.substring(openEnd, closeToken.index).trim() : '';

          // Restore CDATA in inner content
          let restoredContent = innerContent;
          for (const [key, val] of Object.entries(cdataMap)) {
            restoredContent = restoredContent.replace(key, val);
          }

          // Check if inner content has child tags
          const hasChildTags = /<[\w:.-]/.test(innerContent);

          let childValue: string | XmlNode;
          if (hasChildTags) {
            ti++;
            const children = processLevel();
            // Merge attributes
            childValue = { ...attrs, ...children };
          } else {
            // Text content only
            if (Object.keys(attrs).length > 0) {
              childValue = { ...attrs };
              if (restoredContent) {
                childValue['#text'] = restoredContent;
              }
            } else {
              childValue = restoredContent;
            }
            ti = closeIdx;
          }

          addToResult(node, token.name, childValue);
          ti++;
          continue;
        }

        ti++;
      }

      return node;
    }

    const parsed = processLevel();
    return Object.keys(parsed).length === 1 ? parsed : parsed;
  }

  const jsonResult = parseNodes(trimmed);
  return JSON.stringify(jsonResult, null, 2);
}

export default function XmlToJson() {
  const { dict } = useLang();
  const t = dict.tools['xml-to-json'] as Record<string, unknown>;
  const common = dict.common;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      if (!input.trim()) {
        setError('Please enter XML content');
        setOutput('');
        return;
      }
      const result = xmlToJson(input);
      setOutput(result);
      setError('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Invalid XML');
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(`<?xml version="1.0" encoding="UTF-8"?>
<library name="City Library">
  <books>
    <book id="1" isbn="978-0-13-468599-1">
      <title>The Rust Programming Language</title>
      <author>Steve Klabnik</author>
      <year>2019</year>
      <price currency="USD">39.99</price>
    </book>
    <book id="2" isbn="978-1-491-95028-0">
      <title>Programming TypeScript</title>
      <author>Boris Cherny</author>
      <year>2019</year>
      <price currency="USD">49.99</price>
    </book>
  </books>
  <members>
    <member id="101">
      <name>Alice Johnson</name>
      <email>alice@example.com</email>
    </member>
  </members>
  <metadata>
    <![CDATA[This is <raw> content & special characters]]>
  </metadata>
</library>`);
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'XML to JSON Converter'}
      description={(t.pageDescription as string) || 'Convert XML data to JSON format with attribute and CDATA support'}
      toolId="xml-to-json"
    >
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={convert} className="btn btn-primary">{common.convert}</button>
        <button onClick={loadSample} className="btn btn-secondary">{common.loadSample}</button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary">{common.clear}</button>
      </div>

      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {common.error}: {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>XML {common.input}</label>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='<root>\n  <item>value</item>\n</root>' style={{ minHeight: 350, fontFamily: 'JetBrains Mono, monospace' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>JSON</label>
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
