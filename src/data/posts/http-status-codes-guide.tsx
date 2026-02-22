'use client';

import Link from 'next/link';

export default function HttpStatusCodesGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are HTTP Status Codes?</h2>
      <p>
        <strong>HTTP status codes</strong> are three-digit numbers returned by a server in response to a client&apos;s request. Every time your browser visits a webpage or your application calls an API, the server responds with a status code indicating whether the request succeeded, failed, or requires further action. Understanding HTTP status codes is essential for building robust APIs, debugging network issues, and creating proper error handling.
      </p>
      <p>
        Status codes are grouped into five classes by their first digit: <strong>1xx</strong> (Informational), <strong>2xx</strong> (Success), <strong>3xx</strong> (Redirection), <strong>4xx</strong> (Client Error), and <strong>5xx</strong> (Server Error). This guide covers every commonly used status code with practical examples of when to use each in REST APIs.
      </p>
      <p>
        <Link href={`/${lang}/tools/http-status`} style={{ fontWeight: 600 }}>Look up any HTTP status code instantly with our HTTP Status Code Reference tool.</Link>
      </p>

      <h2>1xx Informational Responses</h2>
      <p>
        1xx status codes indicate that the server received the request and the client should continue. These are rarely encountered in typical web development but are important for specific protocols and long-running connections.
      </p>

      <h3>100 Continue</h3>
      <p>
        The server received the request headers and the client should proceed to send the body. This is used with the <code>Expect: 100-continue</code> header, allowing the client to check if the server will accept the request before sending a large body.
      </p>
      <pre><code className="language-http">{`# Client sends headers first
POST /upload HTTP/1.1
Host: api.example.com
Content-Length: 50000000
Expect: 100-continue

# Server responds: OK, send the body
HTTP/1.1 100 Continue`}</code></pre>

      <h3>101 Switching Protocols</h3>
      <p>
        The server is switching to a different protocol as requested by the client. Most commonly seen when upgrading from HTTP to WebSocket.
      </p>
      <pre><code className="language-http">{`# WebSocket upgrade request
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade

# Server agrees to switch
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade`}</code></pre>

      <h3>103 Early Hints</h3>
      <p>
        Allows the server to send preliminary headers before the final response, enabling the browser to start preloading resources while the server prepares the full response.
      </p>

      <h2>2xx Success</h2>
      <p>
        2xx status codes indicate the request was successfully received, understood, and accepted. These are the codes you want to see in your API responses.
      </p>

      <h3>200 OK</h3>
      <p>
        The most common success code. The request succeeded and the response body contains the requested data. Use 200 for successful GET requests and PUT/PATCH updates that return the updated resource.
      </p>
      <pre><code className="language-http">{`# GET request - return data
GET /api/users/123
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 123, "name": "Alice", "email": "alice@example.com"}`}</code></pre>
      <pre><code className="language-javascript">{`// REST API: When to use 200
// GET /users - list users
// GET /users/123 - get a specific user
// PUT /users/123 - update a user (return updated resource)
// PATCH /users/123 - partial update (return updated resource)
// POST /search - search (when not creating a resource)`}</code></pre>

      <h3>201 Created</h3>
      <p>
        A new resource was successfully created. Use 201 for POST requests that create a new entity. The response should include the created resource and a <code>Location</code> header pointing to the new resource.
      </p>
      <pre><code className="language-http">{`# POST request - create new resource
POST /api/users
Content-Type: application/json

{"name": "Bob", "email": "bob@example.com"}

HTTP/1.1 201 Created
Location: /api/users/456
Content-Type: application/json

{"id": 456, "name": "Bob", "email": "bob@example.com"}`}</code></pre>

      <h3>202 Accepted</h3>
      <p>
        The request has been accepted for processing, but processing is not yet complete. Use 202 for asynchronous operations like batch jobs, email sending, or video processing where the result is not immediately available.
      </p>
      <pre><code className="language-http">{`# Async operation
POST /api/reports/generate
HTTP/1.1 202 Accepted
Content-Type: application/json

{"status": "processing", "jobId": "abc-123", "checkUrl": "/api/jobs/abc-123"}`}</code></pre>

      <h3>204 No Content</h3>
      <p>
        The request succeeded but there is no content to return. Use 204 for successful DELETE requests and PUT/PATCH updates when you do not need to return the updated resource.
      </p>
      <pre><code className="language-http">{`# DELETE request - resource removed, nothing to return
DELETE /api/users/123
HTTP/1.1 204 No Content

# PUT request - update succeeded, no body needed
PUT /api/users/123/settings
HTTP/1.1 204 No Content`}</code></pre>

      <h2>3xx Redirection</h2>
      <p>
        3xx status codes indicate the client must take additional action to complete the request, usually by following a redirect to a different URL.
      </p>

      <h3>301 Moved Permanently</h3>
      <p>
        The resource has permanently moved to a new URL. Search engines transfer SEO value to the new URL. Browsers and clients cache this redirect. Use 301 when you permanently rename or restructure URLs.
      </p>
      <pre><code className="language-http">{`# Old URL permanently redirects to new URL
GET /old-page
HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-page

# Common use cases:
# - HTTP to HTTPS redirect
# - www to non-www (or vice versa)
# - Old URL structure to new URL structure
# - Domain migration`}</code></pre>

      <h3>302 Found (Temporary Redirect)</h3>
      <p>
        The resource is temporarily available at a different URL. The client should continue using the original URL for future requests. Use 302 for temporary redirects like maintenance pages or A/B testing.
      </p>
      <pre><code className="language-http">{`# Temporary redirect (e.g., during maintenance)
GET /dashboard
HTTP/1.1 302 Found
Location: /maintenance

# Or redirect after form submission
POST /login
HTTP/1.1 302 Found
Location: /dashboard`}</code></pre>

      <h3>303 See Other</h3>
      <p>
        The response to the request can be found at a different URL using a GET request. Used to redirect after a POST/PUT/DELETE to prevent form resubmission (Post/Redirect/Get pattern).
      </p>

      <h3>304 Not Modified</h3>
      <p>
        The resource has not been modified since the last request. The client should use its cached copy. This code is critical for performance &mdash; it saves bandwidth by avoiding retransmitting unchanged resources.
      </p>
      <pre><code className="language-http">{`# Client sends conditional request
GET /api/users/123
If-None-Match: "etag-abc123"

# Server: resource unchanged, use your cache
HTTP/1.1 304 Not Modified

# Or with date-based caching
GET /api/data
If-Modified-Since: Tue, 15 Jan 2026 12:00:00 GMT

HTTP/1.1 304 Not Modified`}</code></pre>

      <h3>307 Temporary Redirect</h3>
      <p>
        Like 302, but guarantees the HTTP method will not change. If the original request was POST, the redirect will also be POST. Use 307 when you need to preserve the request method.
      </p>

      <h3>308 Permanent Redirect</h3>
      <p>
        Like 301, but guarantees the HTTP method will not change. Use 308 when you need a permanent redirect that preserves POST/PUT methods.
      </p>

      <h2>4xx Client Errors</h2>
      <p>
        4xx status codes indicate the client made an error. The request contains bad syntax, invalid parameters, or lacks proper authentication. The client should modify the request before retrying.
      </p>

      <h3>400 Bad Request</h3>
      <p>
        The server cannot process the request due to a client error: malformed syntax, invalid parameters, or missing required fields. This is the general-purpose client error code.
      </p>
      <pre><code className="language-http">{`# Missing required field
POST /api/users
Content-Type: application/json

{"name": "Alice"}

HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [
    {"field": "email", "message": "Email is required"},
    {"field": "name", "message": "Name must be at least 2 characters"}
  ]
}`}</code></pre>
      <pre><code className="language-javascript">{`// Common causes of 400 errors:
// - Missing required request body fields
// - Invalid JSON syntax
// - Invalid query parameters
// - Invalid date formats
// - Number out of range
// - Invalid enum values`}</code></pre>

      <h3>401 Unauthorized</h3>
      <p>
        The request requires authentication. The client must provide valid credentials (API key, JWT token, or session cookie). Despite the name, this is about <em>authentication</em> (identity), not authorization (permissions).
      </p>
      <pre><code className="language-http">{`# No token provided
GET /api/profile
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer

{"error": "Unauthorized", "message": "Authentication token is required"}

# Expired or invalid token
GET /api/profile
Authorization: Bearer expired-token-here
HTTP/1.1 401 Unauthorized

{"error": "Unauthorized", "message": "Token has expired"}`}</code></pre>

      <h3>403 Forbidden</h3>
      <p>
        The server understood the request but refuses to authorize it. Unlike 401, the client&apos;s identity is known but they lack permission to access the resource. Re-authenticating will not help.
      </p>
      <pre><code className="language-http">{`# Authenticated but not authorized
GET /api/admin/users
Authorization: Bearer valid-user-token

HTTP/1.1 403 Forbidden
{"error": "Forbidden", "message": "Admin role required"}

# 401 vs 403:
# 401: "I don't know who you are. Please log in."
# 403: "I know who you are, but you can't access this."`}</code></pre>

      <h3>404 Not Found</h3>
      <p>
        The server cannot find the requested resource. This is the most recognized error code on the web. In APIs, use 404 when a specific resource does not exist.
      </p>
      <pre><code className="language-http">{`# Resource does not exist
GET /api/users/999999
HTTP/1.1 404 Not Found

{"error": "Not Found", "message": "User with ID 999999 does not exist"}

# Invalid endpoint
GET /api/nonexistent
HTTP/1.1 404 Not Found

{"error": "Not Found", "message": "Endpoint /api/nonexistent does not exist"}`}</code></pre>

      <h3>405 Method Not Allowed</h3>
      <p>
        The HTTP method is not supported for the requested resource. The response must include an <code>Allow</code> header listing the supported methods.
      </p>
      <pre><code className="language-http">{`# DELETE not allowed on this endpoint
DELETE /api/users
HTTP/1.1 405 Method Not Allowed
Allow: GET, POST

{"error": "Method Not Allowed", "message": "DELETE is not supported. Use GET or POST."}`}</code></pre>

      <h3>409 Conflict</h3>
      <p>
        The request conflicts with the current state of the resource. Use 409 for duplicate entries, version conflicts, or operations that violate business rules.
      </p>
      <pre><code className="language-http">{`# Duplicate email
POST /api/users
{"name": "Alice", "email": "alice@example.com"}

HTTP/1.1 409 Conflict
{"error": "Conflict", "message": "A user with email alice@example.com already exists"}

# Optimistic locking conflict
PUT /api/articles/123
If-Match: "etag-old-version"

HTTP/1.1 409 Conflict
{"error": "Conflict", "message": "Resource was modified by another request"}`}</code></pre>

      <h3>422 Unprocessable Entity</h3>
      <p>
        The request is syntactically correct but semantically invalid. Use 422 for validation errors where the JSON is well-formed but the values are wrong. Some APIs use 400 instead; both approaches are valid.
      </p>
      <pre><code className="language-http">{`# Valid JSON but invalid values
POST /api/users
{"name": "A", "email": "not-an-email", "age": -5}

HTTP/1.1 422 Unprocessable Entity
{
  "error": "Validation Error",
  "details": [
    {"field": "name", "message": "Must be at least 2 characters"},
    {"field": "email", "message": "Must be a valid email address"},
    {"field": "age", "message": "Must be a positive number"}
  ]
}`}</code></pre>

      <h3>429 Too Many Requests</h3>
      <p>
        The client has sent too many requests in a given time period (rate limiting). The response should include a <code>Retry-After</code> header indicating when the client can retry.
      </p>
      <pre><code className="language-http">{`# Rate limit exceeded
GET /api/data
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706792400

{"error": "Too Many Requests", "message": "Rate limit exceeded. Try again in 60 seconds."}`}</code></pre>

      <h2>5xx Server Errors</h2>
      <p>
        5xx status codes indicate the server failed to fulfill a valid request. These are server-side problems that the client cannot fix by modifying their request.
      </p>

      <h3>500 Internal Server Error</h3>
      <p>
        A generic server-side error. Something went wrong on the server that was not expected. This is the catch-all error code for unhandled exceptions, crashes, or bugs.
      </p>
      <pre><code className="language-http">{`# Server encountered an unexpected error
GET /api/users
HTTP/1.1 500 Internal Server Error

{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please try again later.",
  "requestId": "req-abc-123"
}`}</code></pre>
      <pre><code className="language-javascript">{`// Best practices for 500 errors:
// - Log the full error details server-side
// - Return a generic message to the client (no stack traces!)
// - Include a request ID for debugging
// - Set up monitoring/alerting for 500 errors
// - Never expose internal implementation details`}</code></pre>

      <h3>501 Not Implemented</h3>
      <p>
        The server does not support the functionality required to fulfill the request. Use 501 for API endpoints that are planned but not yet built.
      </p>
      <pre><code className="language-http">{`# Feature not yet implemented
POST /api/v2/export
HTTP/1.1 501 Not Implemented

{"error": "Not Implemented", "message": "Export feature is coming in v2.1"}`}</code></pre>

      <h3>502 Bad Gateway</h3>
      <p>
        The server, acting as a gateway or proxy, received an invalid response from the upstream server. Common with reverse proxies (Nginx), load balancers, and API gateways when the backend service is down or responding incorrectly.
      </p>
      <pre><code className="language-http">{`# Nginx cannot reach the backend
GET /api/data
HTTP/1.1 502 Bad Gateway

# Common causes:
# - Backend service crashed
# - Backend not started
# - Misconfigured proxy settings
# - Network issues between proxy and backend
# - Backend returning malformed responses`}</code></pre>

      <h3>503 Service Unavailable</h3>
      <p>
        The server is temporarily unable to handle requests. Use 503 during planned maintenance, when the server is overloaded, or when a critical dependency is down. Include a <code>Retry-After</code> header when possible.
      </p>
      <pre><code className="language-http">{`# Planned maintenance
GET /api/users
HTTP/1.1 503 Service Unavailable
Retry-After: 3600

{"error": "Service Unavailable", "message": "Server is under maintenance. Expected back at 14:00 UTC."}

# Database connection pool exhausted
GET /api/data
HTTP/1.1 503 Service Unavailable
Retry-After: 30

{"error": "Service Unavailable", "message": "Server temporarily overloaded. Please retry."}`}</code></pre>

      <h3>504 Gateway Timeout</h3>
      <p>
        The server, acting as a gateway, did not receive a timely response from the upstream server. Similar to 502 but specifically about timeout rather than an invalid response.
      </p>
      <pre><code className="language-http">{`# Backend took too long to respond
GET /api/heavy-report
HTTP/1.1 504 Gateway Timeout

# Common causes:
# - Slow database queries
# - Long-running computations
# - Upstream service timeout
# - Network latency issues`}</code></pre>

      <h2>HTTP Status Codes Quick Reference Table</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>Code</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>When to Use</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['200', 'OK', 'Successful GET, PUT, PATCH requests'],
              ['201', 'Created', 'Successful POST that creates a resource'],
              ['204', 'No Content', 'Successful DELETE or update with no response body'],
              ['301', 'Moved Permanently', 'Permanent URL change (SEO redirect)'],
              ['302', 'Found', 'Temporary redirect'],
              ['304', 'Not Modified', 'Resource unchanged, use cached version'],
              ['400', 'Bad Request', 'Invalid syntax, missing fields'],
              ['401', 'Unauthorized', 'Missing or invalid authentication'],
              ['403', 'Forbidden', 'Authenticated but not authorized'],
              ['404', 'Not Found', 'Resource does not exist'],
              ['405', 'Method Not Allowed', 'HTTP method not supported for endpoint'],
              ['409', 'Conflict', 'Duplicate entry or version conflict'],
              ['422', 'Unprocessable Entity', 'Validation errors (semantic)'],
              ['429', 'Too Many Requests', 'Rate limit exceeded'],
              ['500', 'Internal Server Error', 'Unhandled server exception'],
              ['502', 'Bad Gateway', 'Upstream server returned invalid response'],
              ['503', 'Service Unavailable', 'Server maintenance or overloaded'],
              ['504', 'Gateway Timeout', 'Upstream server timed out'],
            ].map(([code, name, use]) => (
              <tr key={code} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '8px 12px', fontWeight: 700, fontFamily: 'monospace', color: Number(code) < 300 ? '#22c55e' : Number(code) < 400 ? '#3b82f6' : Number(code) < 500 ? '#f59e0b' : '#ef4444' }}>{code}</td>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{name}</td>
                <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>REST API Status Code Best Practices</h2>
      <ul>
        <li><strong>Be specific</strong>: Use 201 for creation, not 200. Use 204 for deletion, not 200. Specific codes help clients handle responses correctly.</li>
        <li><strong>Use 4xx for client errors, 5xx for server errors</strong>: If the client can fix the problem by changing the request, use 4xx. If the problem is on the server, use 5xx.</li>
        <li><strong>Include error details</strong>: Return a JSON body with error message, error code, and details (especially for 400/422 validation errors).</li>
        <li><strong>Never expose internals in 5xx</strong>: Do not include stack traces, database errors, or internal paths in error responses. Log them server-side and return a generic message.</li>
        <li><strong>Use Retry-After headers</strong>: For 429 (rate limiting) and 503 (maintenance), include a <code>Retry-After</code> header to tell clients when to retry.</li>
        <li><strong>Include Location headers for 201</strong>: When creating resources, include a <code>Location</code> header pointing to the new resource URL.</li>
        <li><strong>Consistent error format</strong>: Use the same error response structure throughout your API for easy client-side error handling.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between 401 and 403?</h3>
      <p>
        <strong>401 Unauthorized</strong> means the client has not provided authentication credentials or the credentials are invalid. The solution is to log in or provide a valid token. <strong>403 Forbidden</strong> means the client is authenticated (the server knows who they are) but lacks permission to access the resource. Re-authenticating will not help; the user needs different permissions or a different role.
      </p>

      <h3>Should I use 400 or 422 for validation errors?</h3>
      <p>
        Both are valid choices. <strong>400 Bad Request</strong> is more commonly used and widely understood. <strong>422 Unprocessable Entity</strong> is more specific: the syntax is correct but the semantic content is invalid. Popular frameworks like Rails use 422 for validation errors, while many REST APIs use 400. The important thing is consistency within your API.
      </p>

      <h3>When should I use 404 vs 204?</h3>
      <p>
        Use <strong>404</strong> when the resource genuinely does not exist and the client needs to know. Use <strong>204</strong> when the request succeeded but there is simply no content to return (like a successful DELETE). If a GET request finds no results for a collection, return <strong>200</strong> with an empty array, not 404.
      </p>

      <h3>What is the difference between 302 and 307?</h3>
      <p>
        Both are temporary redirects. <strong>302 Found</strong> historically allowed browsers to change the HTTP method (e.g., POST became GET after redirect). <strong>307 Temporary Redirect</strong> guarantees the method and body are preserved. Use 307 when redirecting POST or PUT requests to ensure the method does not change. For GET redirects, 302 and 307 behave identically.
      </p>

      <h3>How should I handle 5xx errors in my application?</h3>
      <p>
        Implement retry logic with exponential backoff for 500, 502, 503, and 504 errors. For 503, honor the <code>Retry-After</code> header if present. Log the error with the request ID for debugging. Display a user-friendly error message and offer a retry option. Set up monitoring to alert your team when 5xx error rates spike.
      </p>
    </>
  );
}
