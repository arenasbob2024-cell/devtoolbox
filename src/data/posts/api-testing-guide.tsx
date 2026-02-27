'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'API Testing Complete Guide — cURL, fetch, Postman, supertest, k6 and More',
    description: 'Complete API testing guide covering HTTP methods, cURL, JavaScript fetch/axios, Postman/Insomnia, supertest, Python httpx, mock servers, contract testing, load testing, and OpenAPI documentation.',
  },
  zh: {
    title: 'API 测试完整指南 — cURL、fetch、Postman、supertest、k6 等',
    description: '完整的 API 测试指南，涵盖 HTTP 方法、cURL、JavaScript fetch/axios、Postman/Insomnia、supertest、Python httpx、模拟服务器、契约测试、负载测试和 OpenAPI 文档。',
  },
};

export default function ApiTestingGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between GET, POST, PUT, PATCH, and DELETE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GET retrieves data without side effects and is idempotent and safe (calling it multiple times has the same result, no server state changes). POST creates a new resource or triggers an action — it is neither idempotent nor safe. PUT replaces an entire resource at a known URL — it is idempotent (doing it twice has the same result as once). PATCH partially updates a resource by sending only the changed fields — it may or may not be idempotent depending on implementation. DELETE removes a resource — it is idempotent (deleting the same resource twice results in the resource being absent either way).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most common HTTP status codes I should know?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '200 OK (request succeeded), 201 Created (resource created, used after POST), 204 No Content (success with no body, common after DELETE), 301/302 redirects, 400 Bad Request (invalid input), 401 Unauthorized (missing/invalid authentication), 403 Forbidden (authenticated but lacks permission), 404 Not Found, 409 Conflict (e.g., duplicate resource), 422 Unprocessable Entity (validation errors), 429 Too Many Requests (rate limited), 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test an API that requires authentication with cURL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For Bearer token authentication: curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/endpoint. For Basic auth: curl -u username:password https://api.example.com/endpoint. For API key in header: curl -H "X-API-Key: YOUR_KEY" https://api.example.com/endpoint. For API key in query string: curl "https://api.example.com/endpoint?api_key=YOUR_KEY". To send a JSON body with POST: curl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' https://api.example.com/endpoint.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between unit testing and integration testing for APIs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unit tests test individual functions or modules in isolation with mocked dependencies — they run fast and are useful for testing business logic. Integration tests test the full HTTP request-response cycle including middleware, routing, database queries, and response serialization. Tools like supertest (Node.js) and pytest + httpx (Python) are used for integration testing. For APIs, integration tests catch configuration bugs, middleware issues, and serialization errors that unit tests miss. Contract tests go one step further and verify that API consumers and providers agree on the API schema.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Mock Service Worker (MSW) and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mock Service Worker (MSW) intercepts HTTP requests at the network level using a Service Worker in the browser or a server-side interceptor in Node.js. Unlike traditional mocking that stubs the fetch/axios library, MSW intercepts actual network requests, making tests closer to reality. Use MSW when testing React/Vue/Angular components that make API calls — it works with any HTTP library transparently. It is ideal for frontend tests and Storybook stories. For backend integration tests, tools like json-server or WireMock are more appropriate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is consumer-driven contract testing with Pact?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Consumer-driven contract testing (CDC) ensures that API consumers (e.g., a frontend app) and providers (API server) agree on the API contract independently. The consumer writes tests that record interactions (request/response pairs) into a "pact" file. The provider then verifies it can fulfill those interactions by replaying the recorded requests. This enables independent deployment — if the provider passes the pact tests, it is safe to deploy without coordinating with the consumer. Pact is the most popular CDC framework and supports JavaScript, Java, Python, Go, and many other languages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I load test an API with k6?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'k6 is a developer-friendly load testing tool written in Go with a JavaScript scripting API. Write a test script with http.get() or http.post() calls, define virtual users (vus) and duration in the options object. Key metrics to watch: http_req_duration (latency percentiles p95/p99), http_req_failed (error rate), and http_reqs (throughput). Typical load test stages: ramp up virtual users gradually, hold at target load, then ramp down. Use thresholds to fail the test automatically if p95 latency exceeds your SLA (e.g., p(95) < 500ms).',
        },
      },
      {
        '@type': 'Question',
        name: 'What should be in an OpenAPI 3.1 spec?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An OpenAPI 3.1 spec describes your API in a machine-readable YAML or JSON file. It includes: info (title, version, description), servers (base URLs for different environments), paths (endpoint definitions with HTTP methods), requestBody (input schema with required fields), responses (status codes with response schemas), components/schemas (reusable data models), and security (authentication schemes). OpenAPI 3.1 aligns fully with JSON Schema, enabling precise validation. Tools like Swagger UI, Redoc, and Scalar generate interactive documentation from the spec automatically.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/api-testing-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          API testing spans multiple layers: manual exploration with <strong>cURL</strong> and <strong>Postman</strong>,
          automated integration tests with <strong>supertest</strong> (Node.js) or <strong>httpx + pytest</strong>{' '}
          (Python), mock servers with <strong>MSW</strong> or <strong>json-server</strong> for frontend development,
          and load testing with <strong>k6</strong> or <strong>Artillery</strong>. Document your API with{' '}
          <strong>OpenAPI 3.1</strong> and enforce contracts with <strong>Pact</strong>. Convert any cURL command
          to code in your language with our{' '}
          <Link href={`/${lang}/tools/curl-to-code`} style={{ color: '#0284c7' }}>cURL to code converter</Link>.
        </p>
      </div>

      {/* Section 1: HTTP Methods & Status Codes */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        HTTP Methods and Status Codes — The Foundation of API Testing
      </h2>
      <p>
        Understanding HTTP semantics is the prerequisite for effective API testing. Every test makes assumptions
        about idempotency, safety, and expected status codes.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        HTTP Method Semantics
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Method</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Idempotent?</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Safe?</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Typical Success Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>GET</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Retrieve resource</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>200 OK</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>POST</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Create resource or trigger action</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>201 Created</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>PUT</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Replace full resource</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>200 OK or 204</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>PATCH</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Partial update</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Depends</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>200 OK or 204</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>DELETE</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Remove resource</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>204 No Content</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        HTTP Status Code Reference
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Code</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>When to Use</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['200', 'OK', 'Successful GET, PUT, PATCH'],
              ['201', 'Created', 'Successful POST that created a resource; include Location header'],
              ['204', 'No Content', 'Successful DELETE or PUT/PATCH with no response body'],
              ['400', 'Bad Request', 'Invalid input, malformed JSON, missing required fields'],
              ['401', 'Unauthorized', 'Missing or invalid authentication credentials'],
              ['403', 'Forbidden', 'Authenticated but lacks permission for this action'],
              ['404', 'Not Found', 'Resource does not exist'],
              ['409', 'Conflict', 'Duplicate resource, concurrent modification conflict'],
              ['422', 'Unprocessable Entity', 'Validation errors (preferred over 400 for validation)'],
              ['429', 'Too Many Requests', 'Rate limit exceeded; include Retry-After header'],
              ['500', 'Internal Server Error', 'Unexpected server error; log it, never expose details'],
              ['503', 'Service Unavailable', 'Server overloaded or down for maintenance'],
            ].map(([code, name, when], i) => (
              <tr key={code} style={i % 2 !== 0 ? { background: '#fafafa' } : {}}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>{code}</code></td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{name}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: cURL */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        cURL API Testing — Essential Flags and Patterns
      </h2>
      <p>
        <code>curl</code> is the universal API testing tool available on every platform. Mastering its flags makes
        ad-hoc API exploration and CI debugging much faster.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ─── Basic request flags ─────────────────────────────────────────────────────
curl https://api.example.com/users          # GET (default)
curl -X POST https://api.example.com/users  # -X method
curl -v https://api.example.com/users       # -v verbose (shows headers)
curl -I https://api.example.com/users       # -I HEAD only (headers)
curl -L https://example.com/redirect        # -L follow redirects

# ─── Headers and authentication ──────────────────────────────────────────────
curl -H "Authorization: Bearer TOKEN" https://api.example.com/me
curl -H "X-API-Key: mykey" -H "Accept: application/json" https://api.example.com/data
curl -u username:password https://api.example.com/basic-auth  # Basic auth
curl --oauth2-bearer TOKEN https://api.example.com/oauth     # OAuth2

# ─── Sending request body ────────────────────────────────────────────────────
# JSON body (modern curl 7.82+)
curl --json '{"name":"Alice","email":"alice@example.com"}' https://api.example.com/users

# JSON body (older curl)
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}' \
  https://api.example.com/users

# Form data (application/x-www-form-urlencoded)
curl -X POST -d "name=Alice&email=alice@example.com" https://api.example.com/users

# Multipart form (file upload)
curl -X POST -F "file=@photo.jpg" -F "userId=123" https://api.example.com/upload

# ─── Output and inspection ───────────────────────────────────────────────────
curl -s https://api.example.com/users | jq '.'           # pretty-print JSON
curl -s https://api.example.com/users | jq '.[0].email'  # extract field
curl -w "\nStatus: %{http_code}\nTime: %{time_total}s\n" \
  https://api.example.com/users -o /dev/null             # status + timing only

# ─── Save and replay ─────────────────────────────────────────────────────────
curl -c cookies.txt -b cookies.txt https://api.example.com/login  # cookie jar
curl -o response.json https://api.example.com/data                # save body`}</code></pre>
      <p>
        The <code>-v</code> flag is essential for debugging — it shows the full request and response including
        TLS handshake, request headers, response headers, and body. Pipe the output through{' '}
        <code>grep -i &quot;content-type\|status&quot;</code> to focus on specific headers.
      </p>

      {/* Section 3: JavaScript fetch & axios */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JavaScript fetch and axios — Error Handling, Interceptors, and Retry
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ─── fetch with proper error handling ───────────────────────────────────────
// NOTE: fetch() only rejects on network failure — 4xx/5xx are NOT errors!
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);  // 10s timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${getToken()}\`,
        ...options?.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new ApiError(response.status, response.statusText, errorBody);
    }

    // 204 No Content has no body
    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Request timed out after 10 seconds');
    }
    throw err;
  }
}

class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: unknown
  ) {
    super(\`HTTP \${status}: \${statusText}\`);
  }
}

// Usage
const user = await apiFetch<User>('https://api.example.com/me');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Axios with Interceptors and Automatic Retry
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import axios, { AxiosInstance, AxiosError } from 'axios';

// Create a configured axios instance
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Request interceptor: attach auth token ───────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// ─── Response interceptor: handle 401 refresh + retry ────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (v: unknown) => void; reject: (e: unknown) => void }> = [];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post('/auth/refresh');
        localStorage.setItem('accessToken', data.accessToken);
        failedQueue.forEach(({ resolve }) => resolve(null));
        failedQueue = [];
        return api(originalRequest);
      } catch (refreshError) {
        failedQueue.forEach(({ reject }) => reject(refreshError));
        failedQueue = [];
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;`}</code></pre>

      {/* Section 4: Postman / Insomnia */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Postman and Insomnia — Collections, Tests, and Newman CLI
      </h2>
      <p>
        Postman and Insomnia are GUI API clients that add collection organization, environment variables, pre-request
        scripts, and test assertions on top of raw HTTP requests.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Postman Test Scripts (JavaScript)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Postman "Tests" tab — runs after each response
// Access: pm.response, pm.environment, pm.globals, pm.collectionVariables

// ─── Status code assertions ───────────────────────────────────────────────────
pm.test("Status code is 200", () => {
  pm.response.to.have.status(200);
});

pm.test("Response time is under 500ms", () => {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

// ─── Response body assertions ──────────────────────────────────────────────────
pm.test("Response has required fields", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property('id');
  pm.expect(json.email).to.be.a('string').and.include('@');
  pm.expect(json.role).to.be.oneOf(['admin', 'user', 'editor']);
});

// ─── Extract and save to environment ─────────────────────────────────────────
pm.test("Save access token", () => {
  const json = pm.response.json();
  pm.environment.set("accessToken", json.accessToken);
  pm.environment.set("userId", json.user.id);
});

// ─── Pre-request script (runs before sending) ─────────────────────────────────
// Add HMAC signature to request
const timestamp = Date.now().toString();
const signature = CryptoJS.HmacSHA256(
  timestamp + pm.environment.get("apiSecret"),
  pm.environment.get("apiKey")
).toString();
pm.request.headers.add({ key: "X-Timestamp", value: timestamp });
pm.request.headers.add({ key: "X-Signature", value: signature });`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Newman CLI — Run Postman Collections in CI
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install -g newman newman-reporter-htmlextra

# Run a collection with environment file
newman run MyAPI.postman_collection.json \
  -e production.postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/api-test-report.html

# Run with iteration data (data-driven testing)
newman run MyAPI.postman_collection.json \
  --iteration-data test-data.json \
  --iteration-count 5

# GitHub Actions integration
# .github/workflows/api-tests.yml
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g newman
      - run: newman run collection.json -e env.json --bail`}</code></pre>

      {/* Section 5: supertest */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js supertest — Integration Testing Express APIs
      </h2>
      <p>
        <code>supertest</code> fires real HTTP requests against your Express app without starting a server,
        making it the standard choice for Node.js API integration tests.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install --save-dev supertest @types/supertest vitest`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// tests/users.test.ts
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../src/app';           // your Express app (not .listen())
import { db } from '../src/db';

beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();                 // seed test data
});

afterAll(async () => {
  await db.destroy();
});

describe('GET /users', () => {
  it('returns 200 with user list', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + TEST_TOKEN)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      email: expect.stringContaining('@'),
    });
  });

  it('returns 401 without token', async () => {
    await request(app).get('/users').expect(401);
  });
});

describe('POST /users', () => {
  it('creates a new user and returns 201', async () => {
    const newUser = { name: 'Bob', email: 'bob@example.com', role: 'user' };

    const res = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
      .send(newUser)
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe(newUser.email);
    expect(res.headers.location).toMatch(/\/users\/.+/);
  });

  it('returns 422 for invalid email', async () => {
    const res = await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
      .send({ name: 'Bad', email: 'not-an-email', role: 'user' })
      .expect(422);

    expect(res.body.errors).toContainEqual(
      expect.objectContaining({ field: 'email' })
    );
  });

  it('returns 409 for duplicate email', async () => {
    await request(app)
      .post('/users')
      .set('Authorization', 'Bearer ' + ADMIN_TOKEN)
      .send({ name: 'Alice', email: 'alice@example.com', role: 'user' })
      .expect(409);
  });
});`}</code></pre>

      {/* Section 6: Python httpx + pytest */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python httpx and pytest — Async API Testing
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install httpx pytest pytest-asyncio respx`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# tests/test_api.py
import pytest
import httpx
from httpx import AsyncClient

BASE_URL = "https://api.example.com"

# ─── Synchronous client ────────────────────────────────────────────────────────
def test_get_users():
    with httpx.Client(base_url=BASE_URL, timeout=10.0) as client:
        response = client.get("/users", headers={"Authorization": f"Bearer {TOKEN}"})
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

# ─── Async client ──────────────────────────────────────────────────────────────
@pytest.mark.asyncio
async def test_create_user():
    async with AsyncClient(base_url=BASE_URL) as client:
        response = await client.post(
            "/users",
            json={"name": "Alice", "email": "alice@example.com"},
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
        )
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["email"] == "alice@example.com"

# ─── Fixtures for shared setup ────────────────────────────────────────────────
@pytest.fixture
def auth_client():
    with httpx.Client(
        base_url=BASE_URL,
        headers={"Authorization": f"Bearer {TOKEN}"},
        timeout=10.0,
    ) as client:
        yield client

def test_get_profile(auth_client):
    response = auth_client.get("/me")
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

# ─── Mocking with respx ───────────────────────────────────────────────────────
import respx
from httpx import Response

@respx.mock
def test_external_api_call():
    respx.get("https://external-api.com/data").mock(
        return_value=Response(200, json={"value": 42})
    )

    with httpx.Client() as client:
        response = client.get("https://external-api.com/data")

    assert response.json()["value"] == 42
    assert respx.calls.call_count == 1`}</code></pre>

      {/* Section 7: Mock API servers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Mock API Servers — json-server, MSW, Mockoon, WireMock
      </h2>
      <p>
        Mock servers let frontend developers work independently from the backend, enable testing without real
        external dependencies, and reproduce edge cases on demand.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        json-server — Zero-Config REST Mock
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install -g json-server

# db.json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob",   "email": "bob@example.com"   }
  ],
  "posts": []
}

# Start on port 3001
json-server --watch db.json --port 3001

# Automatically supports:
# GET    /users          → list all
# GET    /users/1        → get by id
# POST   /users          → create (auto-assigns id)
# PUT    /users/1        → replace
# PATCH  /users/1        → partial update
# DELETE /users/1        → delete
# GET    /users?name=Alice       → filter
# GET    /users?_sort=name&_order=asc  → sort
# GET    /users?_page=1&_limit=10      → paginate`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        MSW (Mock Service Worker) — Intercept at Network Level
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install msw --save-dev
npx msw init public/  # generate service worker file

# src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Alice', email: 'alice@example.com' },
    ]);
  }),

  http.post('https://api.example.com/users', async ({ request }) => {
    const body = await request.json() as { name: string; email: string };
    return HttpResponse.json(
      { id: crypto.randomUUID(), ...body },
      { status: 201 }
    );
  }),

  // Simulate error states
  http.get('https://api.example.com/error-endpoint', () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }),
];

// src/mocks/browser.ts (for browser)
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
export const worker = setupWorker(...handlers);

// src/mocks/server.ts (for Node.js/Vitest)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);

// vitest.setup.ts
import { server } from './src/mocks/server';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}</code></pre>

      {/* Section 8: Contract Testing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        API Contract Testing — Pact, OpenAPI Validation, and schemathesis
      </h2>
      <p>
        Contract tests verify that API consumers and providers agree on the API interface, enabling independent
        deployment without integration environment dependencies.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pact Consumer-Driven Contract Testing (JavaScript)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install @pact-foundation/pact --save-dev

// consumer.pact.test.ts — run on the consumer (frontend) side
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { fetchUser } from '../src/api/users';
import path from 'path';

const { like, string } = MatchersV3;

const provider = new PactV3({
  consumer: 'frontend-app',
  provider: 'user-api',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('User API contract', () => {
  it('fetches a user by ID', () => {
    return provider.addInteraction({
      states: [{ description: 'user 123 exists' }],
      uponReceiving: 'a request for user 123',
      withRequest: {
        method: 'GET',
        path: '/users/123',
        headers: { Accept: 'application/json' },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          id: like('123'),
          name: like('Alice'),
          email: string(),
        },
      },
    }).executeTest(async (mockServer) => {
      const user = await fetchUser('123', mockServer.url);
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
    });
  });
});
// Pact writes a pact file to /pacts/frontend-app-user-api.json
// Provider side runs: pact-provider-verifier verifying against this file`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        OpenAPI Spec Validation with schemathesis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install schemathesis

# Automatically generate and run tests from OpenAPI spec
schemathesis run https://api.example.com/openapi.json \
  --checks all \
  --auth "Bearer TOKEN" \
  --base-url https://api.example.com \
  --hypothesis-max-examples 100

# schemathesis generates random valid (and invalid) inputs for every endpoint
# and checks for: 5xx responses, schema validation failures,
# response content-type mismatches, and more

# Run against local spec file
schemathesis run ./openapi.yaml --base-url http://localhost:3000`}</code></pre>

      {/* Section 9: Load testing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Load Testing — k6, Artillery, and Apache Bench
      </h2>
      <p>
        Load tests validate that your API meets performance SLAs under realistic and peak traffic conditions.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        k6 Load Test Script
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// k6-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('error_rate');
const responseTime = new Trend('response_time');

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // ramp up to 10 VUs
    { duration: '1m',  target: 50 },   // ramp up to 50 VUs
    { duration: '2m',  target: 50 },   // hold at 50 VUs
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],  // 95th %ile < 500ms
    http_req_failed: ['rate<0.01'],                   // error rate < 1%
    error_rate: ['rate<0.05'],
  },
};

const BASE_URL = 'https://api.example.com';
const TOKEN = __ENV.API_TOKEN;

export function setup() {
  // Runs once before load — e.g., create test user
  const res = http.post(\`\${BASE_URL}/auth/login\`, JSON.stringify({
    email: 'loadtest@example.com',
    password: 'testpass',
  }), { headers: { 'Content-Type': 'application/json' } });
  return { token: res.json('accessToken') };
}

export default function (data) {
  const headers = {
    'Authorization': \`Bearer \${data.token}\`,
    'Content-Type': 'application/json',
  };

  // Test 1: List users
  const listRes = http.get(\`\${BASE_URL}/users\`, { headers });
  check(listRes, {
    'list: status 200': (r) => r.status === 200,
    'list: has data': (r) => r.json('length') > 0,
  });
  errorRate.add(listRes.status !== 200);
  responseTime.add(listRes.timings.duration);

  sleep(1);  // think time between requests

  // Test 2: Create user
  const createRes = http.post(\`\${BASE_URL}/users\`, JSON.stringify({
    name: 'Load Test User',
    email: \`loadtest+\${Date.now()}@example.com\`,
  }), { headers });
  check(createRes, { 'create: status 201': (r) => r.status === 201 });

  sleep(0.5);
}

// Run: k6 run k6-test.js -e API_TOKEN=mytoken`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Artillery YAML Config and Apache Bench
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# artillery-config.yml
config:
  target: 'https://api.example.com'
  phases:
    - duration: 60
      arrivalRate: 10     # 10 new users per second for 60s
    - duration: 120
      arrivalRate: 50     # ramp to 50/s for 2 minutes
  defaults:
    headers:
      Authorization: 'Bearer {{ $processEnvironment.API_TOKEN }}'
      Content-Type: 'application/json'

scenarios:
  - name: "API smoke test"
    flow:
      - get:
          url: '/users'
          expect:
            - statusCode: 200
      - post:
          url: '/users'
          json:
            name: '{{ $randomString(8) }}'
            email: '{{ $randomString(8) }}@test.com'
          expect:
            - statusCode: 201

# Run: artillery run artillery-config.yml

# ─── Apache Bench (ab) — quick smoke test ────────────────────────────────────
# -n total requests, -c concurrent requests
ab -n 1000 -c 50 -H "Authorization: Bearer TOKEN" \
  https://api.example.com/users

# ─── wrk — modern high-performance benchmarking ──────────────────────────────
# -t threads, -c connections, -d duration
wrk -t4 -c100 -d30s https://api.example.com/users`}</code></pre>

      {/* Section 10: API Documentation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        API Documentation — OpenAPI 3.1, Swagger UI, and JSDoc
      </h2>
      <p>
        Good API documentation is testable documentation. An OpenAPI spec serves as both human-readable docs and
        machine-readable contract for validation, mocking, and SDK generation.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        OpenAPI 3.1 Spec Structure
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# openapi.yaml
openapi: '3.1.0'
info:
  title: My API
  version: '1.0.0'
  description: 'A sample API demonstrating OpenAPI 3.1 structure'
  contact:
    email: api@example.com

servers:
  - url: https://api.example.com
    description: Production
  - url: http://localhost:3000
    description: Local development

security:
  - bearerAuth: []

paths:
  /users:
    get:
      summary: List all users
      operationId: listUsers
      tags: [Users]
      parameters:
        - name: limit
          in: query
          schema: { type: integer, default: 20, maximum: 100 }
        - name: email
          in: query
          schema: { type: string, format: email }
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/User' }
        '401':
          $ref: '#/components/responses/Unauthorized'

    post:
      summary: Create a user
      operationId: createUser
      tags: [Users]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: '#/components/schemas/CreateUserInput' }
      responses:
        '201':
          description: User created
          headers:
            Location:
              schema: { type: string, example: '/users/123' }
          content:
            application/json:
              schema: { $ref: '#/components/schemas/User' }
        '422':
          $ref: '#/components/responses/ValidationError'

components:
  schemas:
    User:
      type: object
      required: [id, email, name, createdAt]
      properties:
        id:   { type: string, format: uuid }
        email: { type: string, format: email }
        name:  { type: string }
        role:  { type: string, enum: [admin, user, editor] }
        createdAt: { type: string, format: date-time }

    CreateUserInput:
      type: object
      required: [email, name]
      properties:
        email: { type: string, format: email }
        name:  { type: string, minLength: 2, maxLength: 100 }
        role:  { type: string, enum: [user, editor], default: user }

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  responses:
    Unauthorized:
      description: Authentication required
      content:
        application/json:
          schema:
            type: object
            properties:
              error: { type: string }
    ValidationError:
      description: Validation failed
      content:
        application/json:
          schema:
            type: object
            properties:
              errors:
                type: array
                items:
                  type: object
                  properties:
                    field: { type: string }
                    message: { type: string }`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Swagger UI and Redoc Setup
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Express: serve Swagger UI from your API
npm install swagger-ui-express yaml

import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import YAML from 'yaml';

const spec = YAML.parse(readFileSync('./openapi.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
// → http://localhost:3000/docs

# FastAPI auto-generates OpenAPI + Swagger UI at /docs
# (no configuration needed — decorators define the schema)

# Redoc (clean read-only documentation)
npx @redocly/cli preview-docs openapi.yaml
# Or serve statically:
npx @redocly/cli build-docs openapi.yaml --output docs/index.html`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          <strong>Convert any cURL command to code</strong> — paste a <code>curl</code> command into our{' '}
          <Link href={`/${lang}/tools/curl-to-code`} style={{ color: '#2563eb', fontWeight: 600 }}>
            cURL to code converter
          </Link>{' '}
          to get equivalent JavaScript fetch, axios, Python httpx, Go, or Ruby code instantly.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>GET is safe and idempotent</strong>; POST is neither. Always return 201 with a Location header after successful POST creation.</li>
          <li><strong>cURL -v shows everything</strong>: use it with <code>grep -i</code> to isolate specific headers during debugging. Pipe output to <code>jq</code> for JSON formatting.</li>
          <li><strong>fetch() does not throw on 4xx/5xx</strong>: always check <code>response.ok</code> or <code>response.status</code> explicitly.</li>
          <li><strong>Axios interceptors</strong> are the right place to handle token refresh and global error normalization — keep them out of individual API calls.</li>
          <li><strong>supertest for Node.js integration tests</strong>: test the full HTTP stack including middleware, routing, and response serialization without starting a real server.</li>
          <li><strong>MSW intercepts at the network level</strong>: works with any fetch/axios call transparently and is the best mock for React component tests.</li>
          <li><strong>Contract tests with Pact</strong> enable independent deployment — if the provider passes pact tests, it is safe to deploy without coordinating with consumers.</li>
          <li><strong>k6 thresholds fail the test automatically</strong>: set <code>p(95)&lt;500</code> and <code>rate&lt;0.01</code> to catch regressions in CI.</li>
          <li><strong>OpenAPI 3.1 is both documentation and contract</strong>: generate mocks, validate responses, and create SDKs from a single source of truth.</li>
          <li><strong>schemathesis auto-generates test cases</strong> from your OpenAPI spec — it finds edge cases (empty strings, null values, boundary numbers) that hand-written tests miss.</li>
        </ul>
      </div>
    </article>
  );
}
