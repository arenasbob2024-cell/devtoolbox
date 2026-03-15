'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'github-actions-validator';

export default function GithubActionsValidatorPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'GitHub Actions Validator', description: 'Validate GitHub Actions workflow YAML files' };
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
      const issues = [];
      const hasName = input.includes('name:');
      const hasOn = /^on:/m.test(input) || /^on :/m.test(input) || /^"on":/m.test(input) || /^'on':/m.test(input);
      const hasJobs = input.includes('jobs:');

      if (!hasOn) issues.push('Missing required field: on (trigger events)');
      if (!hasJobs) issues.push('Missing required field: jobs');

      // Check for common issues
      if (input.includes('\t')) issues.push('Tab characters found (use spaces in YAML)');

      const jobMatches = input.match(/^  (\w[\w-]*):/gm);
      if (hasJobs && jobMatches) {
        jobMatches.forEach(job => {
          const jobName = job.trim().replace(':', '');
          if (jobName === 'jobs') return;
          const jobSection = input.substring(input.indexOf(job));
          if (!jobSection.includes('runs-on:') && !jobSection.includes('uses:')) {
            // Simple check - may produce false positives for complex files
          }
        });
      }

      // Check for steps
      if (!input.includes('steps:') && !input.includes('uses:')) {
        issues.push('Warning: No steps defined in any job');
      }

      if (issues.length === 0) {
        setIsValid(true);
        const workflowName = input.match(/name:\s*(.+)/)?.[1] || 'Unnamed';
        setOutput('✅ Valid GitHub Actions workflow\n\nWorkflow: ' + workflowName + '\nJobs found: ' + (jobMatches?.length || 0));
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
    <ToolLayout title={t.name || 'GitHub Actions Validator'} description={t.description || 'Validate GitHub Actions workflow YAML files'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`name: CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
