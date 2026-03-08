'use client';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';
import { useState } from 'react';

export default function SQL_EXPLAINER() {
  const lang = useLang();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const process = () => {
    try {
      const result = 'Query Plan: ' + input.substring(0,100);
      setOutput(result);
    } catch (e) {
      setOutput('Error: ' + e.message);
    }
  };

  return (
    <ToolLayout toolId="sql-explainer" lang={lang}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste content here..." className="w-full h-64 p-3 border rounded font-mono text-sm" />
        <button onClick={process} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Process</button>
        <textarea value={output} readOnly placeholder="Output will appear here..." className="w-full h-64 p-3 border rounded bg-gray-50 font-mono text-sm" />
      </div>
    </ToolLayout>
  );
}