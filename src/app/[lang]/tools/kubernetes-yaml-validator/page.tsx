'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'kubernetes-yaml-validator';

export default function KubernetesYamlValidatorPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'Kubernetes YAML Validator', description: 'Validate Kubernetes manifest YAML files' };
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
      // Basic YAML parse check
      const lines = input.trim().split('\n');
      const issues = [];
      let hasApiVersion = false, hasKind = false, hasMetadata = false;

      // Check for YAML syntax
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('\t')) issues.push(`Line ${i+1}: Tab character found (use spaces in YAML)`);
        if (line.trim() && !line.startsWith('#') && !line.startsWith(' ') && !line.startsWith('-') && !line.includes(':') && !line.startsWith('---')) {
          issues.push(`Line ${i+1}: Missing key-value separator (:)`);
        }
      }

      if (input.includes('apiVersion:')) hasApiVersion = true;
      if (input.includes('kind:')) hasKind = true;
      if (input.includes('metadata:')) hasMetadata = true;

      if (!hasApiVersion) issues.push('Missing required field: apiVersion');
      if (!hasKind) issues.push('Missing required field: kind');
      if (!hasMetadata) issues.push('Missing required field: metadata');

      // Check known kinds
      const kindMatch = input.match(/kind:\s*(\w+)/);
      if (kindMatch) {
        const validKinds = ['Deployment', 'Service', 'Pod', 'ConfigMap', 'Secret', 'Namespace', 'Ingress', 'StatefulSet', 'DaemonSet', 'Job', 'CronJob', 'PersistentVolumeClaim', 'PersistentVolume', 'ServiceAccount', 'ClusterRole', 'ClusterRoleBinding', 'Role', 'RoleBinding', 'HorizontalPodAutoscaler', 'NetworkPolicy', 'ResourceQuota', 'LimitRange'];
        if (!validKinds.includes(kindMatch[1])) {
          issues.push(`Unknown kind: ${kindMatch[1]} (may be a CRD)`);
        }
      }

      if (issues.length === 0) {
        setIsValid(true);
        setOutput('✅ Valid Kubernetes YAML manifest\n\n' +
          'apiVersion: ' + (input.match(/apiVersion:\s*(.+)/)?.[1] || 'N/A') + '\n' +
          'kind: ' + (kindMatch?.[1] || 'N/A') + '\n' +
          'metadata.name: ' + (input.match(/name:\s*(.+)/)?.[1] || 'N/A'));
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
    <ToolLayout title={t.name || 'Kubernetes YAML Validator'} description={t.description || 'Validate Kubernetes manifest YAML files'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: my-app`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
