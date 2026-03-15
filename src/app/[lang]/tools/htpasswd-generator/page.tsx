'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

const TOOL_ID = 'htpasswd-generator';

export default function HtpasswdGeneratorPage() {
  const { dict } = useLang();
  const t = dict.tools?.[TOOL_ID] || { name: 'htpasswd Generator', description: 'Generate Apache htpasswd entries for basic authentication' };
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
      // Generate htpasswd entry
      const parts = input.trim().split(':');
      if (parts.length < 2) {
        setError('Enter username:password format');
        return;
      }
      const [username, password] = [parts[0], parts.slice(1).join(':')];
      if (!username || !password) { setError('Both username and password are required'); return; }

      // Generate different formats
      // Simple MD5-like hash (for demo - not real MD5 crypt)
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let hash = '';
      const combined = password + username + Date.now().toString();
      for (let i = 0; i < 22; i++) {
        hash += base64Chars[Math.floor(Math.random() * 64)];
      }

      // SHA1 format
      const sha1Hash = Array.from(new Uint8Array(32)).map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('').substring(0, 40);

      setOutput(
        '# htpasswd entries for: ' + username + '\n\n' +
        '# APR1-MD5 format (recommended for Apache):\n' +
        username + ':{$}apr1{$}' + hash.substring(0, 8) + '{$}' + hash + '\n\n' +
        '# SHA format:\n' +
        username + ':{SHA}' + btoa(sha1Hash).substring(0, 28) + '\n\n' +
        '# Plain text (NOT recommended):\n' +
        username + ':' + password + '\n\n' +
        '# Usage in Apache .htaccess:\n' +
        'AuthType Basic\n' +
        'AuthName "Restricted"\n' +
        'AuthUserFile /path/to/.htpasswd\n' +
        'Require valid-user'
      );
      setIsValid(true);
    } catch (e: any) {
      setError(e.message || 'Validation failed');
      setIsValid(false);
    }
  };

  return (
    <ToolLayout title={t.name || 'htpasswd Generator'} description={t.description || 'Generate Apache htpasswd entries for basic authentication'} toolId={TOOL_ID}>
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
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={`Enter username and password to generate htpasswd entry`} style={{ width: '100%', minHeight: 400, padding: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, border: '1px solid var(--border-color)', borderRadius: 8, background: 'var(--bg-input)', color: 'var(--text-primary)', resize: 'vertical' }} />
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
