'use client';

import { useState, useCallback } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface Header {
  key: string;
  value: string;
}

interface HistoryItem {
  url: string;
  method: string;
  timestamp: number;
}

export default function ApiTester() {
  const { dict } = useLang();
  const t = dict.tools['api-tester'];
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [bodyText, setBodyText] = useState('');
  const [activeTab, setActiveTab] = useState<'json' | 'form' | 'raw'>('json');
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleSendRequest = useCallback(async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    setLoading(true);
    const startTime = performance.now();

    try {
      const requestHeaders: Record<string, string> = {};
      for (const h of headers) {
        if (h.key && h.value) {
          requestHeaders[h.key] = h.value;
        }
      }

      const config: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        config.body = bodyText;
      }

      const response = await fetch(url, config);
      const endTime = performance.now();
      const time = Math.round(endTime - startTime);

      setStatusCode(response.status);
      setResponseTime(time);

      const respHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        respHeaders[key] = value;
      });
      setResponseHeaders(respHeaders);

      const contentType = response.headers.get('content-type') || '';
      let body = await response.text();

      if (contentType.includes('application/json')) {
        try {
          const parsed = JSON.parse(body);
          body = JSON.stringify(parsed, null, 2);
        } catch { }
      }

      setResponseBody(body);

      setHistory((prev) => [{ url, method, timestamp: Date.now() }, ...prev.slice(0, 9)]);
    } catch (error) {
      setStatusCode(null);
      setResponseTime(null);
      setResponseBody(
        `Error: ${error instanceof Error ? error.message : 'Failed to send request. This may be due to CORS restrictions if the API does not allow cross-origin requests from this domain.'}`
      );
      setResponseHeaders({});
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, bodyText]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (idx: number) => {
    setHeaders(headers.filter((_, i) => i !== idx));
  };

  const updateHeader = (idx: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[idx] = { key, value };
    setHeaders(newHeaders);
  };

  return (
    <ToolLayout title={t.pageTitle} description={t.pageDescription} toolId="api-tester">
      {statusCode && (
        <div
          style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: statusCode >= 200 && statusCode < 300 ? '#d4edda' : '#f8d7da',
            border: `1px solid ${statusCode >= 200 && statusCode < 300 ? '#28a745' : '#f5c6cb'}`,
            borderRadius: '4px',
            color: statusCode >= 200 && statusCode < 300 ? '#155724' : '#721c24',
          }}
        >
          Status: {statusCode} | Time: {responseTime}ms
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontFamily: 'monospace',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', marginBottom: '16px', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
          </select>
        </div>
        <button
          onClick={handleSendRequest}
          disabled={loading}
          className="btn btn-primary"
          style={{ alignSelf: 'flex-end' }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Headers</label>
        <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '8px' }}>
          {headers.map((h, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="Header name"
                value={h.key}
                onChange={(e) => updateHeader(idx, e.target.value, h.value)}
                style={{
                  padding: '6px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              />
              <input
                type="text"
                placeholder="Header value"
                value={h.value}
                onChange={(e) => updateHeader(idx, h.key, e.target.value)}
                style={{
                  padding: '6px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                }}
              />
              <button
                onClick={() => removeHeader(idx)}
                className="btn btn-secondary"
                style={{ fontSize: '12px', padding: '4px 8px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button onClick={addHeader} className="btn btn-secondary" style={{ fontSize: '12px' }}>
          Add Header
        </button>
      </div>

      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', borderBottom: '1px solid #ddd' }}>
            <button
              onClick={() => setActiveTab('json')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'json' ? '#007bff' : '#f0f0f0',
                color: activeTab === 'json' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
              }}
            >
              JSON
            </button>
            <button
              onClick={() => setActiveTab('form')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'form' ? '#007bff' : '#f0f0f0',
                color: activeTab === 'form' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
              }}
            >
              Form Data
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              style={{
                padding: '8px 16px',
                backgroundColor: activeTab === 'raw' ? '#007bff' : '#f0f0f0',
                color: activeTab === 'raw' ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px 4px 0 0',
                cursor: 'pointer',
              }}
            >
              Raw
            </button>
          </div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Request Body</label>
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder="Enter request body..."
            style={{
              width: '100%',
              height: '150px',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>
      )}

      {responseBody && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Response</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }} />
            {responseBody && <CopyButton text={responseBody} label="Copy Response" />}
          </div>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '12px',
              maxHeight: '300px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {responseBody}
          </div>
        </div>
      )}

      {Object.keys(responseHeaders).length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Response Headers</label>
          <div
            style={{
              padding: '8px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '12px',
              maxHeight: '150px',
              overflowY: 'auto',
            }}
          >
            {Object.entries(responseHeaders).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h3>Recent Requests</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setUrl(item.url);
                  setMethod(item.method);
                }}
                style={{
                  padding: '8px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  marginBottom: '4px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              >
                {item.method} {item.url}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '32px', padding: '12px', backgroundColor: '#fff3cd', borderRadius: '4px', color: '#856404' }}>
        <strong>Note:</strong> Due to CORS restrictions, this tool can only test APIs that allow cross-origin requests from this domain. Many public APIs work fine.
      </div>
    </ToolLayout>
  );
}
