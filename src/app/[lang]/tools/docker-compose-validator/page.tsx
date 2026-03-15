'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'docker-compose-validator';

export default function DockerComposeValidatorPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'Docker Compose Validator', description: 'Validate Docker Compose YAML configuration files' };
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
      const hasVersion = input.includes('version:');
      const hasServices = input.includes('services:');

      if (!hasServices) issues.push('Missing required field: services');

      // Check for tabs
      if (input.includes('\t')) issues.push('Tab characters found (use spaces in YAML)');

      // Check for common service fields
      const serviceMatches = input.match(/^  (\w[\w-]*):/gm);
      let serviceCount = 0;
      if (serviceMatches) {
        serviceMatches.forEach(svc => {
          const name = svc.trim().replace(':', '');
          if (['services', 'volumes', 'networks', 'configs', 'secrets'].includes(name)) return;
          serviceCount++;
        });
      }

      // Check for image or build
      if (hasServices && !input.includes('image:') && !input.includes('build:')) {
        issues.push('Warning: No image or build specified for any service');
      }

      if (issues.length === 0) {
        setIsValid(true);
        const version = input.match(/version:\s*["']?([\d.]+)["']?/)?.[1] || 'latest';
        setOutput('✅ Valid Docker Compose file\n\nCompose version: ' + version + '\nServices found: ' + serviceCount +
          (input.includes('volumes:') ? '\nVolumes: defined' : '') +
          (input.includes('networks:') ? '\nNetworks: defined' : ''));
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
    <ToolLayout title={t.name || 'Docker Compose Validator'} description={t.description || 'Validate Docker Compose YAML configuration files'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`version: "3.8"\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: mydb`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
