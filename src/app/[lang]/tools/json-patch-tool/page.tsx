'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'json-patch-tool';

export default function JsonPatchToolPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'JSON Patch Tool', description: 'Apply JSON Patch operations (RFC 6902) to JSON documents' };
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
      let patch;
      try {
        patch = JSON.parse(input);
      } catch {
        setError('Invalid JSON in patch document');
        return;
      }

      if (!Array.isArray(patch)) {
        setError('JSON Patch must be an array of operations');
        return;
      }

      const validOps = ['add', 'remove', 'replace', 'move', 'copy', 'test'];
      const issues = [];

      patch.forEach((op, i) => {
        if (!op.op) issues.push(`Operation ${i}: missing "op" field`);
        else if (!validOps.includes(op.op)) issues.push(`Operation ${i}: unknown op "${op.op}"`);
        if (!op.path && op.path !== '') issues.push(`Operation ${i}: missing "path" field`);
        if (['add', 'replace', 'test'].includes(op.op) && op.value === undefined) {
          issues.push(`Operation ${i}: "${op.op}" requires a "value" field`);
        }
        if (['move', 'copy'].includes(op.op) && !op.from) {
          issues.push(`Operation ${i}: "${op.op}" requires a "from" field`);
        }
      });

      if (issues.length === 0) {
        setIsValid(true);
        setOutput('✅ Valid JSON Patch document\n\nOperations: ' + patch.length + '\n\n' +
          patch.map((op, i) => `${i+1}. ${op.op.toUpperCase()} ${op.path}${op.value !== undefined ? ' = ' + JSON.stringify(op.value) : ''}${op.from ? ' from ' + op.from : ''}`).join('\n'));
      } else {
        setIsValid(false);
        setOutput('Issues found:\n\n' + issues.join('\n'));
      }
    } catch (e: any) {
      setError(e.message || 'Validation failed');
      setIsValid(false);
    }
  };

  return (
    <ToolLayout title={t.name || 'JSON Patch Tool'} description={t.description || 'Apply JSON Patch operations (RFC 6902) to JSON documents'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`[\n  { "op": "add", "path": "/newField", "value": "hello" },\n  { "op": "replace", "path": "/name", "value": "updated" }\n]`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
