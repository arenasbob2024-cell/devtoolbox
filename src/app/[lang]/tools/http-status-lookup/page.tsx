'use client';

import { useState, useMemo } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { useLang } from '@/i18n/LangContext';

interface HttpStatus {
  code: number;
  name: string;
  category: string;
  description: string;
  examples: string[];
  solutions?: string[];
}

const httpStatuses: HttpStatus[] = [
  // 1xx Informational
  {
    code: 100,
    name: 'Continue',
    category: '1xx Informational',
    description: 'The server has received the request headers and the client should proceed to send the request body.',
    examples: ['File upload', 'Large POST request'],
  },
  {
    code: 101,
    name: 'Switching Protocols',
    category: '1xx Informational',
    description: 'The requester has asked the server to switch protocols and the server agrees to do so.',
    examples: ['WebSocket upgrade', 'HTTP to HTTPS upgrade'],
  },
  {
    code: 103,
    name: 'Early Hints',
    category: '1xx Informational',
    description: 'Used to return some response headers before final HTTP message.',
    examples: ['Link preloading', 'Resource hints'],
  },

  // 2xx Success
  {
    code: 200,
    name: 'OK',
    category: '2xx Success',
    description: 'The request succeeded. The result meaning depends on the HTTP method used.',
    examples: ['GET returns data', 'POST creates resource', 'PUT updates resource'],
    solutions: ['Default response for successful HTTP requests. No action needed.'],
  },
  {
    code: 201,
    name: 'Created',
    category: '2xx Success',
    description: 'The request succeeded and a new resource was created as a result.',
    examples: ['POST creates new user', 'POST creates new article', 'POST creates new order'],
    solutions: ['The response should include a Location header with the URI of the new resource.'],
  },
  {
    code: 202,
    name: 'Accepted',
    category: '2xx Success',
    description: 'The request has been accepted for processing but processing has not been completed.',
    examples: ['Async job queued', 'Background task started', 'Batch processing initiated'],
    solutions: ['The server should provide a status URI where the client can check progress.'],
  },
  {
    code: 204,
    name: 'No Content',
    category: '2xx Success',
    description: 'The request succeeded but there is no content to return.',
    examples: ['DELETE successful', 'PUT successful', 'Options request'],
    solutions: ['Commonly used with DELETE or PUT requests. No response body is expected.'],
  },
  {
    code: 206,
    name: 'Partial Content',
    category: '2xx Success',
    description: 'The server is delivering only part of the resource due to a range header sent by the client.',
    examples: ['Video streaming', 'Resume downloads', 'Large file downloads'],
    solutions: ['Ensure Content-Range header is present in the response.'],
  },

  // 3xx Redirection
  {
    code: 300,
    name: 'Multiple Choices',
    category: '3xx Redirection',
    description: 'The request has more than one possible response.',
    examples: ['Multiple file formats available', 'Content negotiation fallback'],
  },
  {
    code: 301,
    name: 'Moved Permanently',
    category: '3xx Redirection',
    description: 'The URL of the requested resource has been changed permanently.',
    examples: ['Domain migration', 'URL restructure', 'Old API endpoint deprecated'],
    solutions: ['Update your bookmarks and links to use the new URL. Search engines will update their index.'],
  },
  {
    code: 302,
    name: 'Found',
    category: '3xx Redirection',
    description: 'The URI of the requested resource has been changed temporarily.',
    examples: ['Temporary redirect', 'Maintenance page', 'Load balancing'],
    solutions: ['Resubmit the request to the new location. The original URL is still valid.'],
  },
  {
    code: 303,
    name: 'See Other',
    category: '3xx Redirection',
    description: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
    examples: ['Form submission result', 'Post-Redirect-Get pattern'],
  },
  {
    code: 304,
    name: 'Not Modified',
    category: '3xx Redirection',
    description: 'The resource has not been modified. Use your cached copy.',
    examples: ['Browser cache hit', 'ETag matches', 'Conditional GET request'],
    solutions: ['Use the cached version of the resource. No need to re-download.'],
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    category: '3xx Redirection',
    description: 'The requested resource is temporarily at another URI, and the request method must not be changed.',
    examples: ['Temporary maintenance', 'Temporary load balancing'],
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    category: '3xx Redirection',
    description: 'The requested resource is permanently at another URI, and the request method must not be changed.',
    examples: ['Permanent migration', 'Protocol upgrade'],
  },

  // 4xx Client Error
  {
    code: 400,
    name: 'Bad Request',
    category: '4xx Client Error',
    description: 'The server cannot process the request due to client error (malformed request syntax).',
    examples: ['Invalid JSON', 'Missing required parameter', 'Invalid query string'],
    solutions: ['Check request format and parameters', 'Verify headers are correct', 'Validate JSON payload'],
  },
  {
    code: 401,
    name: 'Unauthorized',
    category: '4xx Client Error',
    description: 'Authentication is required and has failed or has not been provided.',
    examples: ['Missing API key', 'Invalid token', 'Expired session'],
    solutions: ['Include valid authentication credentials', 'Refresh or regenerate your API key', 'Log in again'],
  },
  {
    code: 403,
    name: 'Forbidden',
    category: '4xx Client Error',
    description: 'The client does not have access rights to the content.',
    examples: ['Insufficient permissions', 'Blocked IP address', 'Access restricted'],
    solutions: ['Check your permissions', 'Request access from administrator', 'Use correct account'],
  },
  {
    code: 404,
    name: 'Not Found',
    category: '4xx Client Error',
    description: 'The server cannot find the requested resource.',
    examples: ['Page deleted', 'Wrong URL', 'Endpoint no longer exists'],
    solutions: ['Check the URL for typos', 'Check if the resource exists', 'Try a search instead'],
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    category: '4xx Client Error',
    description: 'The request method is not supported by the server for the requested resource.',
    examples: ['POST to read-only endpoint', 'DELETE on non-deletable resource'],
    solutions: ['Use the correct HTTP method (GET, POST, PUT, DELETE, etc.)', 'Check API documentation'],
  },
  {
    code: 408,
    name: 'Request Timeout',
    category: '4xx Client Error',
    description: 'The server timed out waiting for the request.',
    examples: ['Slow network', 'Large file upload', 'Server overloaded'],
    solutions: ['Retry the request', 'Increase timeout settings', 'Check network connection'],
  },
  {
    code: 409,
    name: 'Conflict',
    category: '4xx Client Error',
    description: 'The request conflicts with the current state of the server (e.g., version conflict).',
    examples: ['Duplicate entry', 'Version mismatch', 'Concurrent update conflict'],
    solutions: ['Refresh data and retry', 'Resolve conflicts manually', 'Update to latest version'],
  },
  {
    code: 410,
    name: 'Gone',
    category: '4xx Client Error',
    description: 'The requested resource is no longer available and will not be available again.',
    examples: ['Permanently deleted resource', 'Deprecated API', 'Archived content'],
    solutions: ['The resource is permanently gone. Use alternative endpoints if available.'],
  },
  {
    code: 429,
    name: 'Too Many Requests',
    category: '4xx Client Error',
    description: 'The user has sent too many requests in a given amount of time (rate limiting).',
    examples: ['Rate limit exceeded', 'Too many API calls', 'Brute force detection'],
    solutions: ['Wait before retrying', 'Implement exponential backoff', 'Check rate limit headers'],
  },

  // 5xx Server Error
  {
    code: 500,
    name: 'Internal Server Error',
    category: '5xx Server Error',
    description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    examples: ['Code exception', 'Database error', 'Unhandled error'],
    solutions: ['Retry the request', 'Contact support', 'Check server logs'],
  },
  {
    code: 501,
    name: 'Not Implemented',
    category: '5xx Server Error',
    description: 'The server does not support the functionality required to fulfill the request.',
    examples: ['Feature not yet implemented', 'Unsupported HTTP method'],
  },
  {
    code: 502,
    name: 'Bad Gateway',
    category: '5xx Server Error',
    description: 'The server received an invalid response from an upstream server.',
    examples: ['Proxy error', 'Load balancer issue', 'Upstream service down'],
    solutions: ['Retry the request', 'Check upstream services', 'Check server configuration'],
  },
  {
    code: 503,
    name: 'Service Unavailable',
    category: '5xx Server Error',
    description: 'The server is currently unable to handle the request due to maintenance or overload.',
    examples: ['Maintenance window', 'Server overloaded', 'Service temporarily down'],
    solutions: ['Wait and retry later', 'Check status page', 'Contact support if it persists'],
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    category: '5xx Server Error',
    description: 'The server did not receive a timely response from an upstream server.',
    examples: ['Slow upstream server', 'Network timeout', 'Load balancer timeout'],
    solutions: ['Retry the request', 'Check network connection', 'Wait and try again'],
  },
];

export default function HttpStatusLookup() {
  const { dict } = useLang();
  const t = dict.tools['http-status-lookup'] as Record<string, unknown>;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(httpStatuses.map(s => s.category));
    return Array.from(cats).sort((a, b) => {
      const aNum = parseInt(a);
      const bNum = parseInt(b);
      return aNum - bNum;
    });
  }, []);

  const filteredStatuses = useMemo(() => {
    return httpStatuses.filter(status => {
      const matchesSearch = searchQuery === '' ||
        status.code.toString().includes(searchQuery) ||
        status.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        status.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === '' || status.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryColor = (category: string) => {
    if (category.startsWith('1')) return '#3b82f6'; // blue
    if (category.startsWith('2')) return '#22c55e'; // green
    if (category.startsWith('3')) return '#f59e0b'; // amber
    if (category.startsWith('4')) return '#ef4444'; // red
    if (category.startsWith('5')) return '#a855f7'; // purple
    return '#6b7280'; // gray
  };

  return (
    <ToolLayout
      title={(t.pageTitle as string) || 'HTTP Status Code Lookup'}
      description={(t.pageDescription as string) || 'Search and reference all HTTP status codes with detailed explanations'}
      toolId="http-status-lookup"
    >
      {/* Search and Filter */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by code, name, or description..."
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Category</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        {filteredStatuses.length > 0 ? (
          filteredStatuses.map(status => (
            <div
              key={status.code}
              style={{
                background: 'var(--bg-input)',
                border: `2px solid ${getCategoryColor(status.category)}`,
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div
                  style={{
                    background: getCategoryColor(status.category),
                    color: 'white',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontWeight: 600,
                    fontSize: 14,
                    minWidth: 50,
                    textAlign: 'center',
                  }}
                >
                  {status.code}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{status.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                    {status.category}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6 }}>
                {status.description}
              </p>

              {status.examples.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, margin: '0 0 6px 0', color: 'var(--text-secondary)' }}>
                    Common Examples:
                  </p>
                  <ul style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, paddingLeft: 20 }}>
                    {status.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              {status.solutions && status.solutions.length > 0 && (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, margin: '0 0 6px 0', color: 'var(--accent-emerald)' }}>
                    Solutions:
                  </p>
                  <ul style={{ fontSize: 13, color: 'var(--accent-emerald)', margin: 0, paddingLeft: 20 }}>
                    {status.solutions.map((solution, i) => (
                      <li key={i}>{solution}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontSize: 14 }}>No HTTP status codes found matching your search.</p>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>HTTP Status Codes Reference</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
          HTTP status codes are three-digit responses from a web server indicating the outcome of an HTTP request.
          They are grouped into five classes: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error),
          and 5xx (Server Error). Understanding these codes helps in debugging web applications and APIs.
        </p>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Common Status Code Categories</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>1xx Informational:</strong> Request received, continuing process</li>
          <li><strong>2xx Success:</strong> Request succeeded (200 OK, 201 Created, 204 No Content)</li>
          <li><strong>3xx Redirection:</strong> Further action needed (301 Moved, 302 Found, 304 Not Modified)</li>
          <li><strong>4xx Client Error:</strong> Client request error (400 Bad Request, 404 Not Found, 401 Unauthorized)</li>
          <li><strong>5xx Server Error:</strong> Server failed to fulfill request (500 Internal Error, 503 Service Unavailable)</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 16, marginBottom: 8 }}>Use Cases</h3>
        <ul style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Debugging API responses</li>
          <li>Understanding HTTP error messages</li>
          <li>Implementing proper error handling</li>
          <li>Web development and server configuration</li>
          <li>API testing and validation</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
