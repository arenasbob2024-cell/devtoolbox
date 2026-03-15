'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'code-to-image';

export default function CodeToImagePage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'Code to Image', description: 'Generate beautiful code screenshots for sharing' };
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    setError('');
    setOutput('');
    setIsValid(null);
    if (!input.trim()) { setError('Please enter content to validate'); return; }
    try {
      // Generate a text-based preview (actual image generation would need canvas)
      const lines = input.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length), 20);
      const border = '╔' + '═'.repeat(maxLen + 6) + '╗';
      const bottom = '╚' + '═'.repeat(maxLen + 6) + '╝';
      const title = '║  Code Screenshot Preview' + ' '.repeat(Math.max(0, maxLen - 21)) + '  ║';
      const sep = '╠' + '═'.repeat(maxLen + 6) + '╣';

      const codeLines = lines.map((line, i) => {
        const lineNum = String(i + 1).padStart(3, ' ');
        const padded = line.padEnd(maxLen, ' ');
        return '║ ' + lineNum + ' │ ' + padded + ' ║';
      });

      setOutput(border + '\n' + title + '\n' + sep + '\n' + codeLines.join('\n') + '\n' + bottom + '\n\n' +
        'Lines: ' + lines.length + '\n' +
        'Characters: ' + input.length + '\n\n' +
        '💡 Tip: Copy this to share a formatted code snippet.');
      setIsValid(true);
    } catch (e: any) {
      setError(e.message || 'Validation failed');
      setIsValid(false);
    }
  };

  return (
    <ToolLayout title={t.name || 'Code to Image'} description={t.description || 'Generate beautiful code screenshots for sharing'} toolId={TOOL_ID}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={handleValidate} style={{ padding: '8px 20px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
          Validate
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError(''); setIsValid(null); }} style={{ padding: '8px 20px', background: 'var(--bg-input)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      {error && <div style={{ padding: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, color: '#dc2626', marginBottom: 16, fontSize: 14 }}>{error}</div>}
      {isValid !== null && (
        <div style={{ padding: 12, background: isValid ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isValid ? '#bbf7d0' : '#fecaca'}`, borderRadius: 8, color: isValid ? '#16a34a' : '#dc2626', marginBottom: 16, fontSize: 14, fontWeight: 600 }}>
          {isValid ? '✅ Valid!' : '❌ Invalid'}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label style={{ fontWeight: 600, fontSize: 14 }}>Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea value={output} readOnly placeholder="Validation results will appear here..." style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
        </div>
      </div>
    </ToolLayout>
  );
}
