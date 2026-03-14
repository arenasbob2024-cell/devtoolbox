'use client';

import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import CopyButton from '@/components/CopyButton';
import { useLang } from '@/i18n/LangContext';

interface WebhookRequest {
  timestamp: number;
  method: string;
  headers: Record<string, string>;
  body: string;
}

export default function WebhookTester() {
  const { dict } = useLang();
  const t = dict.tools['webhook-tester'];
  const [webhookId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [requests, setRequests] = useState<WebhookRequest[]>([]);
  const [method, setMethod] = useState('POST');
  const [contentType, setContentType] = useState('application/json');
  const [requestBody, setRequestBody] = useState('');
  const [customHeaders, setCustomHeaders] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<WebhookRequest | null>(null);

  const webhookUrl = `https://webhook.test/${webhookId}`;

  const sendRequest = () => {
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'User-Agent': 'Webhook-Tester/1.0',
    };

    if (customHeaders.trim()) {
      const lines = customHeaders.trim().split('\n');
      lines.forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          headers[key] = value;
        }
      });
    }

    const newRequest: WebhookRequest = {
      timestamp: Date.now(),
      method,
      headers,
      body: requestBody,
    };

    setRequests([newRequest, ...requests]);
    setSelectedRequest(newRequest);
  };

  const loadSampleJson = () => {
    const sample = {
      event: 'payment.completed',
      timestamp: new Date().toISOString(),
      data: {
        order_id: '12345',
        amount: 99.99,
        currency: 'USD',
        customer: {
          id: 'cust_abc123',
          email: 'customer@example.com',
        },
      },
    };
    setRequestBody(JSON.stringify(sample, null, 2));
  };

  const loadSampleForm = () => {
    setRequestBody('user_id=123&action=login&timestamp=2026-03-14T12:00:00Z');
    setContentType('application/x-www-form-urlencoded');
  };

  const formatHeadersForDisplay = (headers: Record<string, string>): string => {
    return Object.entries(headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  const formatBodyForDisplay = (body: string): string => {
    try {
      const parsed = JSON.parse(body);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return body;
    }
  };

  return (
    <ToolLayout
      title={t.pageTitle}
      description={t.pageDescription}
      toolId="webhook-tester"
    >
      {/* Webhook URL Section */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
      }}>
        <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
          {t.webhookUrl || 'Your Webhook URL'}
        </label>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="text"
            value={webhookUrl}
            readOnly
            style={{ flex: 1, padding: '8px 12px', fontSize: 13, fontFamily: 'monospace' }}
          />
          <CopyButton text={webhookUrl} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
          {t.webhookInfo || 'Use this URL to send webhook requests. They will be captured and displayed below.'}
        </p>
      </div>

      {/* Test Request Builder */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{t.buildRequest || 'Build Test Request'}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
              {t.method || 'HTTP Method'}
            </label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
            >
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="GET">GET</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
              {t.contentType || 'Content-Type'}
            </label>
            <select
              value={contentType}
              onChange={e => setContentType(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', fontSize: 12 }}
            >
              <option value="application/json">application/json</option>
              <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
              <option value="text/plain">text/plain</option>
              <option value="application/xml">application/xml</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
            {t.requestBody || 'Request Body'}
          </label>
          <textarea
            value={requestBody}
            onChange={e => setRequestBody(e.target.value)}
            placeholder={t.bodyPlaceholder || 'Enter request body...'}
            style={{ width: '100%', minHeight: 120, fontFamily: 'monospace', fontSize: 12, padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 12, display: 'block', marginBottom: 4, color: 'var(--text-secondary)' }}>
            {t.customHeaders || 'Custom Headers (optional)'}
          </label>
          <textarea
            value={customHeaders}
            onChange={e => setCustomHeaders(e.target.value)}
            placeholder={t.headersPlaceholder || 'X-Custom-Header: value\nAuthorization: Bearer token'}
            style={{ width: '100%', minHeight: 80, fontFamily: 'monospace', fontSize: 12, padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={sendRequest} className="btn btn-primary">{t.sendButton || 'Send Request'}</button>
          <button onClick={loadSampleJson} className="btn btn-secondary">{t.sampleJson || 'Load JSON Sample'}</button>
          <button onClick={loadSampleForm} className="btn btn-secondary">{t.sampleForm || 'Load Form Sample'}</button>
        </div>
      </div>

      {/* Captured Requests */}
      <div>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
          {t.capturedRequests || 'Captured Requests'} ({requests.length})
        </h3>

        {requests.length === 0 ? (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-color)',
            borderRadius: 8,
            padding: 24,
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 13,
          }}>
            {t.noRequests || 'No requests captured yet. Send a test request above.'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Request List */}
            <div>
              {requests.map((req, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRequest(req)}
                  style={{
                    background: selectedRequest === req ? 'var(--accent-blue)' : 'var(--bg-secondary)',
                    border: `1px solid ${selectedRequest === req ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                    borderRadius: 6,
                    padding: 10,
                    marginBottom: 8,
                    cursor: 'pointer',
                    color: selectedRequest === req ? 'white' : 'var(--text-primary)',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{req.method}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>
                    {new Date(req.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Request Details */}
            {selectedRequest && (
              <div>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                    {t.headers || 'Headers'}
                  </label>
                  <textarea
                    readOnly
                    value={formatHeadersForDisplay(selectedRequest.headers)}
                    style={{ width: '100%', minHeight: 100, fontFamily: 'monospace', fontSize: 11, padding: '8px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                    {t.body || 'Body'}
                  </label>
                  <textarea
                    readOnly
                    value={formatBodyForDisplay(selectedRequest.body)}
                    style={{ width: '100%', minHeight: 150, fontFamily: 'monospace', fontSize: 11, padding: '8px' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{t.seoTitle || 'Test Webhooks in Real-Time'}</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {t.seoContent || 'Generate unique webhook URLs to test and debug webhook integrations. Capture incoming requests, inspect headers and body payload, and validate webhook implementations.'}
        </p>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>{t.seoFeaturesTitle || 'Features'}</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>{t.seoFeature1 || 'Generate unique webhook URLs for each session'}</li>
          <li>{t.seoFeature2 || 'Build and send test requests with custom headers'}</li>
          <li>{t.seoFeature3 || 'Capture and inspect all request details'}</li>
          <li>{t.seoFeature4 || 'Support for multiple content types and methods'}</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
