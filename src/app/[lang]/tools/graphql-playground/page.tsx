'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'graphql-playground';

export default function GraphqlPlaygroundPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'GraphQL Playground', description: 'Test and explore GraphQL queries online' };
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
      // Validate GraphQL query syntax
      const issues = [];
      const trimmed = input.trim();

      // Check for basic structure
      const hasQuery = /^(query|mutation|subscription|fragment|\{)/m.test(trimmed);
      if (!hasQuery) issues.push('Not a valid GraphQL operation. Must start with query, mutation, subscription, fragment, or {');

      // Check brace matching
      let braceCount = 0;
      let parenCount = 0;
      for (const c of trimmed) {
        if (c === '{') braceCount++;
        if (c === '}') braceCount--;
        if (c === '(') parenCount++;
        if (c === ')') parenCount--;
        if (braceCount < 0) { issues.push('Unexpected closing brace }'); break; }
        if (parenCount < 0) { issues.push('Unexpected closing parenthesis )'); break; }
      }
      if (braceCount !== 0) issues.push(`Unmatched braces: ${braceCount > 0 ? 'missing ' + braceCount + ' closing }' : 'extra closing }'}`);
      if (parenCount !== 0) issues.push(`Unmatched parentheses: ${parenCount > 0 ? 'missing closing )' : 'extra closing )'}`);

      // Extract operation info
      const opMatch = trimmed.match(/^(query|mutation|subscription)\s*(\w+)?/);
      const opType = opMatch?.[1] || (trimmed.startsWith('{') ? 'query' : 'unknown');
      const opName = opMatch?.[2] || 'Anonymous';

      // Count fields
      const fieldCount = (trimmed.match(/\w+\s*[{(]/g) || []).length;

      if (issues.length === 0) {
        setIsValid(true);
        setOutput('✅ Valid GraphQL ' + opType + '\n\nOperation: ' + opName + '\nType: ' + opType + '\nEstimated fields: ' + fieldCount + '\n\n# Formatted:\n' + trimmed);
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
    <ToolLayout title={t.name || 'GraphQL Playground'} description={t.description || 'Test and explore GraphQL queries online'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`query {\n  users {\n    id\n    name\n    email\n  }\n}`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
