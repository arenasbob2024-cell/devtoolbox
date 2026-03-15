'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'openapi-validator';

export default function OpenapiValidatorPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'OpenAPI Validator', description: 'Validate OpenAPI/Swagger specification files' };
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
      let parsed;
      try {
        // Try JSON first
        parsed = JSON.parse(input);
      } catch {
        // Try basic YAML key-value
        const issues = [];
        const hasOpenapi = input.includes('openapi:');
        const hasSwagger = input.includes('swagger:');
        const hasInfo = input.includes('info:');
        const hasPaths = input.includes('paths:');

        if (!hasOpenapi && !hasSwagger) issues.push('Missing required field: openapi or swagger version');
        if (!hasInfo) issues.push('Missing required field: info');
        if (!hasPaths) issues.push('Missing required field: paths');

        if (input.includes('openapi: 3')) {
          const hasTitle = input.match(/title:\s*.+/);
          const hasVersion = input.match(/version:\s*.+/);
          if (!hasTitle) issues.push('info.title is required');
          if (!hasVersion) issues.push('info.version is required');
        }

        if (issues.length === 0) {
          setIsValid(true);
          const version = input.match(/(openapi|swagger):\s*(.+)/)?.[2] || 'unknown';
          setOutput('✅ Valid OpenAPI specification (YAML)\n\nVersion: ' + version);
        } else {
          setIsValid(false);
          setOutput('Issues found:\n\n' + issues.map((i, idx) => `${idx+1}. ${i}`).join('\n'));
        }
        return;
      }

      const issues = [];
      if (!parsed.openapi && !parsed.swagger) issues.push('Missing: openapi or swagger version');
      if (!parsed.info) issues.push('Missing: info object');
      else {
        if (!parsed.info.title) issues.push('Missing: info.title');
        if (!parsed.info.version) issues.push('Missing: info.version');
      }
      if (!parsed.paths) issues.push('Missing: paths object');

      if (issues.length === 0) {
        setIsValid(true);
        const pathCount = Object.keys(parsed.paths || {}).length;
        setOutput('✅ Valid OpenAPI specification\n\nVersion: ' + (parsed.openapi || parsed.swagger) + '\nTitle: ' + parsed.info?.title + '\nPaths: ' + pathCount);
      } else {
        setIsValid(false);
        setOutput('Issues found:\n\n' + issues.map((i, idx) => `${idx+1}. ${i}`).join('\n'));
      }
    } catch (e: any) {
      setError(e.message || 'Validation failed');
      setIsValid(false);
    }
  };

  return (
    <ToolLayout title={t.name || 'OpenAPI Validator'} description={t.description || 'Validate OpenAPI/Swagger specification files'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`openapi: 3.0.0\ninfo:\n  title: My API\n  version: 1.0.0\npaths:\n  /users:\n    get:\n      summary: Get users\n      responses:\n        200:\n          description: OK`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
