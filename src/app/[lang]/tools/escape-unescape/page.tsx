'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function unescapeHtml(s: string): string {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function escapeJs(s: string): string {
  return JSON.stringify(s).slice(1, -1);
}

function unescapeJs(s: string): string {
  try {
    return JSON.parse('"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"');
  } catch {
    return s.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }
}

function escapeJson(s: string): string {
  return JSON.stringify(s).slice(1, -1);
}

export default function EscapeUnescape() {
  const { dict } = useLang();
  const t = dict.tools['escape-unescape'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'html-escape' | 'html-unescape' | 'js-escape' | 'js-unescape' | 'json-escape'>('html-escape');

  const run = () => {
    try {
      switch (mode) {
        case 'html-escape': setOutput(escapeHtml(input)); break;
        case 'html-unescape': setOutput(unescapeHtml(input)); break;
        case 'js-escape': setOutput(escapeJs(input)); break;
        case 'js-unescape': setOutput(unescapeJs(input)); break;
        case 'json-escape': setOutput(escapeJson(input)); break;
        default: setOutput('');
      }
    } catch {
      setOutput('');
    }
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="escape-unescape">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)} style={{ padding: '8px 12px', fontSize: 13 }}>
          <option value="html-escape">HTML Escape</option>
          <option value="html-unescape">HTML Unescape</option>
          <option value="js-escape">JavaScript Escape</option>
          <option value="js-unescape">JavaScript Unescape</option>
          <option value="json-escape">JSON Escape</option>
        </select>
        <button onClick={run} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clearAll}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{dict.common.input}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='e.g. <div>Hello</div>' style={{ minHeight: 200 }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>{dict.common.output}</label>
            <CopyButton text={output} />
          </div>
          <textarea value={output} readOnly placeholder={dict.common.resultPlaceholder} style={{ minHeight: 200, opacity: output ? 1 : 0.5 }} />
        </div>
      </div>
    </ToolLayout>
  );
}
