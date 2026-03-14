'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  timing: number;
}

export default function HttpMethodTester() {
  const { dict } = useLang();
  const t = dict.tools['http-method-tester'];
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = async () => {
    setError('');
    setResponse(null);
    setLoading(true);

    try {
      if (!url.trim()) {
        throw new Error('URL is required');
      }

      const headerObj: Record<string, string> = {};
      if (headers.trim()) {
        const headerLines = headers.split('\n');
        for (const line of headerLines) {
          const [key, value] = line.split(':').map(s => s.trim());
          if (key && value) {
            headerObj[key] = value;
          }
        }
      }

      const options: RequestInit = {
        method,
        headers: headerObj,
      };

      if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        options.body = body;
      }

      const startTime = performance.now();
      const res = await fetch(url, options);
      const endTime = performance.now();

      const responseBody = await res.text();
      const responseHeaders: Record<string, string> = {};

      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body: responseBody,
        timing: endTime - startTime,
      });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Request failed';
      setError(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => {
    setUrl('https://jsonplaceholder.typicode.com/posts/1');
    setMethod('GET');
    setHeaders('Content-Type: application/json');
    setBody('');
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'var(--accent-green)';
    if (status >= 300 && status < 400) return 'var(--accent-blue)';
    if (status >= 400 && status < 500) return 'var(--accent-yellow)';
    return 'var(--accent-rose)';
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="http-method-tester"
    >
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={sendRequest} disabled={loading} className="btn btn-primary">
          {loading ? 'Loading...' : dict.common.send}
        </button>
        <button onClick={loadSample} disabled={loading} className="btn btn-secondary">{dict.common.loadSample}</button>
        <button onClick={() => { setUrl(''); setMethod('GET'); setHeaders('Content-Type: application/json'); setBody(''); setResponse(null); setError(''); }} className="btn btn-secondary">{dict.common.clear}</button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--accent-rose)',
        }}>
          ✕ {error}
        </div>
      )}

      {/* Request Configuration */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Request</h3>

        {/* URL */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>URL</label>
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            style={{ width: '100%' }}
          />
        </div>

        {/* Method */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Method</label>
          <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%' }}>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
            <option>PATCH</option>
            <option>HEAD</option>
            <option>OPTIONS</option>
          </select>
        </div>

        {/* Headers */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Headers (one per line: Key: Value)</label>
          <textarea
            value={headers}
            onChange={e => setHeaders(e.target.value)}
            placeholder="Content-Type: application/json"
            style={{ minHeight: 80, fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>

        {/* Body */}
        {['POST', 'PUT', 'PATCH'].includes(method) && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, display: 'block' }}>Body</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder='{"name": "value"}'
              style={{ minHeight: 100, fontFamily: 'monospace', fontSize: 12 }}
            />
          </div>
        )}
      </div>

      {/* Response */}
      {response && (
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 8, padding: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Response</h3>

          {/* Status */}
          <div style={{ marginBottom: 12, display: 'flex', gap: 16, alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Status:</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: getStatusColor(response.status), marginLeft: 8 }}>
                {response.status} {response.statusText}
              </span>
            </div>
            <div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Timing:</span>
              <span style={{ fontSize: 14, fontWeight: 600, marginLeft: 8 }}>{response.timing.toFixed(2)}ms</span>
            </div>
          </div>

          {/* Response Headers */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: 'block' }}>Response Headers</label>
            <div style={{ background: 'var(--bg-primary)', padding: 12, borderRadius: 6, fontSize: 12, fontFamily: 'monospace', maxHeight: 150, overflow: 'auto' }}>
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key}>
                  <span style={{ color: 'var(--accent-blue)' }}>{key}</span>: {value}
                </div>
              ))}
            </div>
          </div>

          {/* Response Body */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, display: 'block' }}>Response Body</label>
            <textarea
              value={response.body}
              readOnly
              style={{ minHeight: 200, fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-primary)' }}
            />
            {response.body && <CopyButton text={response.body} />}
          </div>
        </div>
      )}

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1}</li>
          <li>{t.seoFeature2}</li>
          <li>{t.seoFeature3}</li>
          <li>{t.seoFeature4}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
