'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function formatXml(xml: string, indent: number): string {
  const str = xml.replace(/>\s+</g, '><').trim();
  const parts = str.match(/<[^>]+>|[^<]+/g) || [];
  let indentLevel = 0;
  let result = '';
  const pad = ' '.repeat(indent);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
      result += pad.repeat(indentLevel) + part + '\n';
    } else if (part.startsWith('<?') || part.startsWith('<!')) {
      result += part + '\n';
    } else if (part.startsWith('<')) {
      const tagMatch = part.match(/^<(\w+)/);
      const isSelfClosing = part.endsWith('/>') || ['img','br','hr','input','meta','link'].some(t => part.includes(`<${t}`));
      result += pad.repeat(indentLevel) + part + '\n';
      if (!isSelfClosing && !part.endsWith('/>')) indentLevel++;
    } else if (part.trim()) {
      result += pad.repeat(indentLevel) + part + '\n';
    }
  }
  return result.trim();
}

function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
}

function validateXml(xml: string): { valid: boolean; error?: string } {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const err = doc.querySelector('parsererror');
    if (err) return { valid: false, error: err.textContent || 'Parse error' };
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : 'Invalid XML' };
  }
}

export default function XmlFormatter() {
  const { dict } = useLang();
  const t = dict.tools['xml-formatter'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  const format = () => {
    const v = validateXml(input);
    if (!v.valid) {
      setError(v.error || dict.common.error);
      setOutput('');
      return;
    }
    setOutput(formatXml(input, indent));
    setError('');
  };

  const minify = () => {
    const v = validateXml(input);
    if (!v.valid) {
      setError(v.error || dict.common.error);
      setOutput('');
      return;
    }
    setOutput(minifyXml(input));
    setError('');
  };

  const validate = () => {
    const v = validateXml(input);
    if (v.valid) {
      setError('');
      setOutput('✓ Valid XML');
    } else {
      setError(v.error || dict.common.error);
      setOutput('');
    }
  };

  const loadSample = () => {
    setInput(`<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item id="1">
    <name>Example</name>
    <value>123</value>
  </item>
</root>`);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="xml-formatter">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button onClick={format} className="btn btn-primary">{dict.common.format} / {dict.common.beautify}</button>
        <button onClick={minify} className="btn btn-secondary">{dict.common.minify}</button>
        <button onClick={validate} className="btn btn-secondary">{dict.common.validate}</button>
        <button onClick={loadSample} className="btn btn-secondary">{dict.common.loadSample}</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Indent:</label>
          <select value={indent} onChange={e => setIndent(Number(e.target.value))} style={{ width: 60, padding: '4px 8px', fontSize: 12 }}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>
      {error && (
        <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--accent-rose)' }}>
          ✕ {dict.common.error}: {error}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.input}</label>
            <button onClick={() => { setInput(''); setOutput(''); setError(''); }} className="btn btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }}>{dict.common.clear}</button>
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste XML here..." style={{ minHeight: 350 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 350, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
    </ToolLayout>
  );
}
