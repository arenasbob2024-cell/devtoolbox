'use client';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';
import { useState } from 'react';

export default function ENV_EDITOR() {
  const lang = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = () => {
    try {
      const result = input.split('\n').filter(l => l && !l.startsWith('#')).join('\n');
      setOutput(result);
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
  };

  return (
    <ToolLayout toolId="env-editor" lang={lang}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste content here..." className="w-full h-64 p-3 border rounded font-mono text-sm" />
        <button onClick={process} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Process</button>
        <textarea value={output} readOnly placeholder="Output will appear here..." className="w-full h-64 p-3 border rounded bg-gray-50 font-mono text-sm" />
      </div>
    </ToolLayout>
  );
}