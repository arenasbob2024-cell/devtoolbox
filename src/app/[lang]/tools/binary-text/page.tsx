'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

function textToBinary(s: string): string {
  return [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function binaryToText(bin: string): string {
  const bytes = bin.replace(/\s/g, '').match(/.{1,8}/g) || [];
  return bytes.map(b => String.fromCharCode(parseInt(b, 2))).join('');
}

export default function BinaryText() {
  const { dict } = useLang();
  const t = dict.tools['binary-text'];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'text2bin' | 'bin2text'>('text2bin');

  const convert = () => {
    try {
      if (mode === 'text2bin') setOutput(textToBinary(input));
      else setOutput(binaryToText(input));
    } catch {
      setOutput('');
    }
  };

  const swap = () => {
    setMode(m => m === 'text2bin' ? 'bin2text' : 'text2bin');
    setInput(output);
    setOutput('');
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="binary-text">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={mode} onChange={e => setMode(e.target.value as typeof mode)} style={{ padding: '8px 12px', fontSize: 13 }}>
          <option value="text2bin">Text → Binary</option>
          <option value="bin2text">Binary → Text</option>
        </select>
        <button onClick={convert} className="btn btn-primary">{dict.common.convert}</button>
        <button onClick={swap} className="btn btn-secondary">{dict.common.swap}</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="btn btn-secondary">{dict.common.clearAll}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{dict.common.input}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'text2bin' ? 'Hello' : '01001000 01100101 01101100 01101100 01101111'} style={{ minHeight: 200 }} />
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
