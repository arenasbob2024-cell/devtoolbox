'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

const STATUS_CODES: { code: number; name: string; desc: string }[] = [
  { code: 100, name: 'Continue', desc: 'Server received request headers' },
  { code: 101, name: 'Switching Protocols', desc: 'Upgrade requested' },
  { code: 200, name: 'OK', desc: 'Request succeeded' },
  { code: 201, name: 'Created', desc: 'Resource created' },
  { code: 204, name: 'No Content', desc: 'Success, no body' },
  { code: 301, name: 'Moved Permanently', desc: 'Redirect permanently' },
  { code: 302, name: 'Found', desc: 'Temporary redirect' },
  { code: 304, name: 'Not Modified', desc: 'Use cached version' },
  { code: 400, name: 'Bad Request', desc: 'Invalid syntax' },
  { code: 401, name: 'Unauthorized', desc: 'Authentication required' },
  { code: 403, name: 'Forbidden', desc: 'Access denied' },
  { code: 404, name: 'Not Found', desc: 'Resource not found' },
  { code: 405, name: 'Method Not Allowed', desc: 'HTTP method not allowed' },
  { code: 422, name: 'Unprocessable Entity', desc: 'Validation error' },
  { code: 429, name: 'Too Many Requests', desc: 'Rate limit exceeded' },
  { code: 500, name: 'Internal Server Error', desc: 'Server error' },
  { code: 502, name: 'Bad Gateway', desc: 'Invalid response from upstream' },
  { code: 503, name: 'Service Unavailable', desc: 'Server overloaded' },
];

export default function HttpStatus() {
  const { dict } = useLang();
  const t = dict.tools['http-status'];
  const [query, setQuery] = useState('');

  const filtered = STATUS_CODES.filter(
    s => !query || String(s.code).includes(query) || s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="http-status">
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by code or name (e.g. 404, Not Found)"
          style={{ width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 8, border: '1px solid var(--border-color)' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(({ code, name, desc }) => (
          <div key={code} style={{ background: 'var(--bg-input)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: code >= 400 ? 'var(--accent-rose)' : code >= 300 ? 'var(--accent-orange)' : 'var(--accent-emerald)', minWidth: 50 }}>{code}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>No matching status codes.</div>
      )}
    </ToolLayout>
  );
}
