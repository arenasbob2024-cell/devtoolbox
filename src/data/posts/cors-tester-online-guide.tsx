'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'CORS Tester: Fix CORS Errors and Configure Cross-Origin Requests — Complete Guide',
    description: 'Fix CORS errors and configure cross-origin requests. Complete guide covering CORS headers, preflight requests, Express/Next.js/Nginx/FastAPI configuration, credentials, debugging, and security.',
  },
  zh: {
    title: 'CORS 测试器：修复 CORS 错误和配置跨域请求 — 完整指南',
    description: '修复 CORS 错误并配置跨域请求。含 CORS 响应头、预检请求、Express/Next.js/Nginx/FastAPI 配置、凭据、调试和安全性的完整指南。',
  },
};

export default function CorsTesterOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is CORS and why does it exist?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls how web pages can request resources from a different origin than the one that served the page. It exists to enforce the Same-Origin Policy (SOP), which prevents malicious websites from making unauthorized API calls using a visitor\'s credentials. An "origin" is defined as the combination of scheme (protocol), host (domain), and port — so https://api.example.com and https://app.example.com are different origins even though they share the same base domain.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a simple request and a preflight request?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A simple CORS request meets all of these criteria: method is GET, POST, or HEAD; Content-Type (if set) is application/x-www-form-urlencoded, multipart/form-data, or text/plain; no custom headers are added. For any other request — custom headers like Authorization or X-API-Key, methods like PUT/DELETE/PATCH, or Content-Type: application/json — the browser first sends an HTTP OPTIONS preflight request to check if the server allows it. The actual request is only sent if the server responds with appropriate Access-Control-Allow-* headers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I fix the "has been blocked by CORS policy" error?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fix depends on what you control: (1) If you control the server, add Access-Control-Allow-Origin header with your client\'s origin value. For Express, use the cors npm package. For Nginx, add add_header directives. (2) For credentials (cookies/auth), never use Access-Control-Allow-Origin: * — use the exact origin and also set Access-Control-Allow-Credentials: true. (3) For preflight failures, ensure your server handles OPTIONS requests and returns Access-Control-Allow-Methods and Access-Control-Allow-Headers. (4) In development, use a proxy (Vite proxy, webpack-dev-server proxy) to avoid CORS entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why can\'t I use Access-Control-Allow-Origin: * with credentials?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The browser explicitly forbids the combination of Access-Control-Allow-Origin: * and Access-Control-Allow-Credentials: true as a security measure. The wildcard * means "any origin," which combined with credentials would allow any malicious website to make authenticated requests using the victim\'s cookies or session. To support credentials (cookies, HTTP authentication), you must: (1) Set Access-Control-Allow-Origin to the exact requesting origin (e.g., https://app.example.com), (2) Set Access-Control-Allow-Credentials: true, (3) Set credentials: "include" in your fetch call or withCredentials: true in XMLHttpRequest.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I configure CORS in Express.js?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install the cors npm package and use it as middleware: const cors = require("cors"); app.use(cors({ origin: "https://yourapp.com", credentials: true }));. For multiple origins, use a function: origin: (origin, callback) => { const allowed = ["https://app1.com", "https://app2.com"]; callback(null, allowed.includes(origin)); }. For development, use origin: true to reflect any origin, but never in production. Always set methods and allowedHeaders explicitly for security.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add CORS headers in Next.js API routes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In Next.js App Router route handlers, set headers in the Response: return new Response(data, { headers: { "Access-Control-Allow-Origin": "https://yourapp.com", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Authorization" } }). Handle OPTIONS preflight separately. Alternatively, use next.config.js headers() for static header injection on all routes. The middleware.ts approach lets you apply CORS logic globally before the request reaches route handlers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does CORS affect WebSockets?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. WebSockets do not use CORS. The WebSocket protocol bypasses CORS because it uses an HTTP upgrade handshake that browsers allow from any origin. However, WebSocket servers should still validate the Origin header to prevent cross-site WebSocket hijacking (CSWSH). In Socket.IO, configure CORS via the cors option: io = new Server(server, { cors: { origin: "https://yourapp.com", credentials: true } }). For native WebSockets, validate req.headers.origin on the server during the upgrade handshake.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does my API work in Postman but fail in the browser with a CORS error?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CORS is a browser-enforced security policy, not a server-side restriction. Postman, curl, and server-to-server requests are not browsers and therefore do not enforce CORS. The server does not reject cross-origin requests — the browser intercepts the response and blocks it from JavaScript if the CORS headers are missing or incorrect. This is why the API "works" in Postman (no CORS enforcement) but fails in the browser. Electron apps, React Native mobile apps, and server-side fetch also bypass CORS for the same reason.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/cors-tester-online-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>CORS errors</strong> occur when a browser blocks a cross-origin request because the server did not
          return the right <code>Access-Control-Allow-*</code> headers. Fix them by adding the correct headers on the{' '}
          <em>server</em> — never on the client. Use the <strong>cors</strong> npm package for Express, the{' '}
          <strong>headers()</strong> config in Next.js, <strong>add_header</strong> directives in Nginx, and{' '}
          <strong>CORSMiddleware</strong> in FastAPI. For credentials (cookies), never use <code>*</code> as the origin.
          Use our{' '}
          <Link href={`/${lang}/tools/cors-tester`} style={{ color: '#0284c7' }}>online CORS tester</Link>{' '}
          to validate your headers instantly.
        </p>
      </div>

      {/* Section 1: What is CORS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is CORS? The Browser Security Model Explained
      </h2>
      <p>
        <strong>CORS (Cross-Origin Resource Sharing)</strong> is a W3C standard that governs how browsers handle HTTP
        requests initiated from one origin to a different origin. It is an extension — and controlled relaxation — of
        the <strong>Same-Origin Policy (SOP)</strong>, which has been a fundamental browser security boundary since the
        Netscape era.
      </p>
      <p>
        An <strong>origin</strong> is precisely defined as the triplet of:
      </p>
      <ul>
        <li><strong>Scheme</strong> (protocol): <code>http</code> vs <code>https</code></li>
        <li><strong>Host</strong>: <code>example.com</code> vs <code>api.example.com</code></li>
        <li><strong>Port</strong>: <code>:3000</code> vs <code>:8080</code> (default ports 80/443 are implicit)</li>
      </ul>
      <p>
        Two URLs are same-origin only if all three components match exactly. Consider these examples:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>URL Pair</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Same Origin?</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>https://example.com</code> vs <code>https://example.com/api</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Same scheme, host, port; path differs</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>https://example.com</code> vs <code>http://example.com</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Different scheme (https vs http)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>https://app.example.com</code> vs <code>https://api.example.com</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Different subdomain</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>https://example.com:3000</code> vs <code>https://example.com:4000</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Different port</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Without CORS, if you visited <code>evil.com</code>, its JavaScript could call{' '}
        <code>https://yourbank.com/api/transfer</code> using your session cookies, potentially draining your account.
        The Same-Origin Policy prevents this by blocking cross-origin requests from JavaScript. CORS provides a
        controlled mechanism for servers to explicitly opt-in to cross-origin access.
      </p>

      {/* Section 2: Simple vs Preflight */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Simple Requests vs Preflight Requests — When Does the Browser Send OPTIONS?
      </h2>
      <p>
        The browser uses different CORS handling depending on the request characteristics. Understanding this distinction
        is critical for debugging CORS issues.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Simple Requests
      </h3>
      <p>
        A request is considered <strong>simple</strong> (no preflight) if ALL of these conditions are true:
      </p>
      <ul>
        <li>Method is <code>GET</code>, <code>POST</code>, or <code>HEAD</code></li>
        <li>No custom request headers (beyond the CORS-safelisted headers)</li>
        <li><code>Content-Type</code> (if present) is one of: <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, or <code>text/plain</code></li>
        <li>No <code>ReadableStream</code> in the request body</li>
      </ul>
      <p>
        For simple requests, the browser sends the request directly with an <code>Origin</code> header. The server
        must respond with <code>Access-Control-Allow-Origin</code>. If missing, the browser blocks the response
        from JavaScript — but the request <em>was</em> made and the server processed it.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Preflight Requests (OPTIONS)
      </h3>
      <p>
        Anything outside the simple request criteria triggers a <strong>preflight</strong>: the browser automatically
        sends an HTTP <code>OPTIONS</code> request before the actual request. Common triggers:
      </p>
      <ul>
        <li>Method is <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>, or <code>CONNECT</code></li>
        <li>Custom headers like <code>Authorization</code>, <code>X-API-Key</code>, <code>X-Request-ID</code></li>
        <li><code>Content-Type: application/json</code> (the most common case — JSON APIs)</li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Preflight request the browser sends automatically
OPTIONS /api/users HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

# Server must respond with:
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400       # cache preflight for 24 hours

# Only after successful preflight does the browser send the actual request:
POST /api/users HTTP/1.1
Origin: https://app.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{"name": "Alice", "email": "alice@example.com"}`}</code></pre>
      <p>
        The <code>Access-Control-Max-Age</code> header is critical for performance — it tells the browser how long
        (in seconds) to cache the preflight result. Without it, the browser sends an OPTIONS request before every
        single API call. Set it to <code>86400</code> (24 hours) or higher for production.
      </p>

      {/* Section 3: CORS Response Headers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CORS Response Headers — Complete Reference
      </h2>
      <p>
        Servers communicate CORS permissions through response headers. Here is every CORS response header explained:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Header</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Example Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Allow-Origin</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Which origins can read the response</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>https://app.example.com</code> or <code>*</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Allow-Methods</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HTTP methods allowed for cross-origin requests</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>GET, POST, PUT, DELETE, OPTIONS</code></td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Allow-Headers</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Request headers the client is allowed to send</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Content-Type, Authorization, X-API-Key</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Allow-Credentials</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Whether cookies/auth can be included</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>true</code> (cannot use <code>*</code> as origin)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Max-Age</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Seconds to cache preflight response</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>86400</code></td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>Access-Control-Expose-Headers</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Non-simple headers exposed to JavaScript</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>X-Total-Count, X-Request-ID</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>Access-Control-Expose-Headers</code> is often overlooked. By default, JavaScript can only read a
        small set of &ldquo;simple&rdquo; response headers (<code>Cache-Control</code>, <code>Content-Language</code>,{' '}
        <code>Content-Type</code>, <code>Expires</code>, <code>Last-Modified</code>, <code>Pragma</code>). Any custom
        response headers like pagination metadata (<code>X-Total-Count</code>) or trace IDs (<code>X-Request-ID</code>)
        must be explicitly exposed.
      </p>

      {/* Section 4: CORS Error Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CORS Error Types and How to Diagnose Each
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        1. Missing Access-Control-Allow-Origin Header
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Browser console error:
Access to fetch at 'https://api.example.com/users' from origin
'https://app.example.com' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.

# Diagnosis: Server is not sending CORS headers at all.
# Fix: Add CORS middleware or headers to the server.`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        2. Origin Not Allowed
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Browser console error:
The 'Access-Control-Allow-Origin' header has a value 'https://prod.example.com'
that is not equal to the supplied origin 'https://staging.example.com'.

# Diagnosis: Server has CORS configured, but only allows a specific origin,
# and the requesting origin doesn't match.
# Fix: Add the requesting origin to the allowed list.`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        3. Credentials with Wildcard Origin
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Browser console error:
The value of the 'Access-Control-Allow-Origin' header in the response must not be
the wildcard '*' when the request's credentials mode is 'include'.

# Diagnosis: Server returns *, but client uses credentials: 'include'.
# Fix: Change Access-Control-Allow-Origin to the specific origin,
# and add Access-Control-Allow-Credentials: true.`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        4. Preflight Request Failure
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Browser console error:
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present.

# OR:
Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.

# Diagnosis: Server does not handle OPTIONS requests or doesn't include
# the requested method/header in the preflight response.
# Fix: Handle OPTIONS and return complete Access-Control-Allow-* headers.`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        5. Header Not Allowed in Preflight
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Browser console error:
Request header field Authorization is not allowed by
Access-Control-Allow-Headers in preflight response.

# Diagnosis: The Access-Control-Allow-Headers list does not include
# the header the client is sending.
# Fix: Add Authorization (and any other custom headers) to
# Access-Control-Allow-Headers.`}</code></pre>

      {/* Section 5: Node.js/Express CORS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js / Express CORS Configuration
      </h2>
      <p>
        The <code>cors</code> npm package is the standard solution for Express and Node.js HTTP servers. It handles
        preflight automatically and gives you a clean options API.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install cors
npm install --save-dev @types/cors`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import express from 'express';
import cors from 'cors';

const app = express();

// ─── Option 1: Allow a single specific origin ───────────────────────────────
app.use(cors({
  origin: 'https://app.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,                 // allow cookies
  maxAge: 86400,                     // cache preflight 24h
}));

// ─── Option 2: Allow multiple origins ───────────────────────────────────────
const allowedOrigins = [
  'https://app.example.com',
  'https://admin.example.com',
  'http://localhost:3000',           // dev only — remove in prod
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS: origin \${origin} not allowed\`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Option 3: Wildcard (no credentials, open API) ──────────────────────────
app.use(cors());  // equivalent to origin: '*'

// ─── Handle preflight for all routes explicitly ──────────────────────────────
// (cors middleware does this automatically, but explicit is clearer)
app.options('*', cors());

app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});`}</code></pre>
      <p>
        Key points when using the <code>cors</code> package:
      </p>
      <ul>
        <li>Always set <code>credentials: true</code> alongside a specific origin (never <code>*</code>) for cookie-based auth.</li>
        <li>The <code>origin</code> function receives <code>undefined</code> for requests with no <code>Origin</code> header (non-browser clients). Return <code>true</code> for these — they are not cross-origin requests.</li>
        <li><code>app.options(&apos;*&apos;, cors())</code> ensures preflight is handled even before route-specific middleware.</li>
        <li>Set <code>maxAge</code> to avoid repeated preflight requests from the same browser.</li>
      </ul>

      {/* Section 6: Next.js CORS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Next.js CORS — API Routes, Middleware, and App Router
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        App Router Route Handlers (Next.js 13+)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['https://app.example.com', 'http://localhost:3000'];

function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  return headers;
}

// Handle preflight
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  return NextResponse.json(
    { users: [] },
    { headers: corsHeaders(origin) }
  );
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const body = await req.json();
  return NextResponse.json(
    { created: true, data: body },
    { status: 201, headers: corsHeaders(origin) }
  );
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Next.js Middleware (Apply CORS Globally)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// middleware.ts (at project root, next to package.json)
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = ['https://app.example.com', 'http://localhost:3000'];

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': isAllowed ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowed) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return response;
}

export const config = {
  matcher: '/api/:path*',  // only apply to API routes
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        next.config.js Static Headers
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// next.config.js — applies CORS headers to all matched paths
// Note: only works for single static origin; use middleware for dynamic origins
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://app.example.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}</code></pre>

      {/* Section 7: Nginx CORS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Nginx CORS Configuration
      </h2>
      <p>
        When Nginx is used as a reverse proxy, you can handle CORS at the proxy layer. This is especially useful
        when you cannot modify the backend application code.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# /etc/nginx/sites-available/api.example.com

server {
    listen 443 ssl;
    server_name api.example.com;

    location /api/ {
        # Handle preflight OPTIONS requests
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin'  'https://app.example.com' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, X-API-Key' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age'        '86400' always;
            add_header 'Content-Type'                  'text/plain; charset=utf-8';
            add_header 'Content-Length'                '0';
            return 204;
        }

        # Add CORS headers to actual responses
        add_header 'Access-Control-Allow-Origin'      'https://app.example.com' always;
        add_header 'Access-Control-Allow-Methods'     'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers'     'Content-Type, Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Multiple Origins with Nginx Map
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# nginx.conf (http block)
map $http_origin $cors_origin {
    default "";
    "https://app.example.com"    "https://app.example.com";
    "https://admin.example.com"  "https://admin.example.com";
    "http://localhost:3000"      "http://localhost:3000";
}

# In server block:
server {
    location /api/ {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin'  $cors_origin always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            add_header 'Access-Control-Max-Age' '86400' always;
            return 204;
        }

        add_header 'Access-Control-Allow-Origin'      $cors_origin always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;

        proxy_pass http://localhost:8080;
    }
}`}</code></pre>
      <p>
        The <code>always</code> modifier ensures CORS headers are added even for error responses (4xx, 5xx). Without
        it, error responses from the upstream server will lack CORS headers, and the browser will not be able to
        read the error body — showing a generic network error instead.
      </p>

      {/* Section 8: Python Flask/FastAPI */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python Flask and FastAPI CORS Configuration
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        FastAPI CORSMiddleware
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# pip install fastapi uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ─── Single or multiple origins ────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://app.example.com",
        "https://admin.example.com",
        "http://localhost:3000",        # dev only
    ],
    allow_credentials=True,            # needed for cookies/auth
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type", "Authorization", "X-API-Key"],
    max_age=86400,                     # preflight cache 24h
    expose_headers=["X-Total-Count", "X-Request-ID"],  # expose custom headers
)

@app.get("/api/users")
async def get_users():
    return {"users": []}

@app.post("/api/users")
async def create_user(user: dict):
    return {"created": True, "user": user}

# ─── Allow all origins (public API, no credentials) ────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Flask with flask-cors
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# pip install flask flask-cors
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# ─── Apply CORS to all routes ───────────────────────────────────────────────
CORS(app,
     origins=["https://app.example.com", "http://localhost:3000"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     max_age=86400)

# ─── Per-resource CORS (more granular control) ───────────────────────────────
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://app.example.com"],
        "supports_credentials": True,
    },
    r"/public/*": {
        "origins": "*",
    }
})

@app.route("/api/users", methods=["GET"])
def get_users():
    return jsonify({"users": []})

# ─── Decorator approach (route-level) ───────────────────────────────────────
from flask_cors import cross_origin

@app.route("/public/data")
@cross_origin()
def public_data():
    return jsonify({"data": "accessible to everyone"})`}</code></pre>

      {/* Section 9: Credentials and Cookies */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Credentials and Cookies — The Most Misunderstood CORS Requirement
      </h2>
      <p>
        Sending cookies or HTTP authentication headers with a cross-origin request requires a specific and strict
        configuration on both the client and the server. Getting either side wrong causes a CORS error.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Client-Side: Enabling Credentials in Fetch and Axios
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ─── fetch API ──────────────────────────────────────────────────────────────
const response = await fetch('https://api.example.com/profile', {
  method: 'GET',
  credentials: 'include',    // send cookies cross-origin
  headers: {
    'Content-Type': 'application/json',
    // Session cookies are sent automatically; don't put them in headers
  },
});

// credentials options:
// 'omit'    - never send cookies (default for cross-origin)
// 'same-origin' - only send for same-origin requests
// 'include' - always send cookies (requires server CORS credentials support)

// ─── XMLHttpRequest ──────────────────────────────────────────────────────────
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;   // same as credentials: 'include' in fetch
xhr.open('GET', 'https://api.example.com/profile');
xhr.send();

// ─── axios ───────────────────────────────────────────────────────────────────
import axios from 'axios';

// Per-request:
const response = await axios.get('https://api.example.com/profile', {
  withCredentials: true,
});

// Global default (applies to all requests):
axios.defaults.withCredentials = true;

// Or with axios instance:
const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true,
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        SameSite Cookie Interaction with CORS
      </h3>
      <p>
        Even if CORS is configured correctly, cookies may not be sent if the <code>SameSite</code> attribute prevents
        cross-site transmission. The three values behave as follows:
      </p>
      <ul>
        <li>
          <strong><code>SameSite=Strict</code></strong>: Cookie is never sent in cross-site requests, regardless of CORS settings.
        </li>
        <li>
          <strong><code>SameSite=Lax</code></strong> (modern browser default): Cookie is sent for top-level navigations
          but not for cross-site <code>fetch</code> or <code>XMLHttpRequest</code>.
        </li>
        <li>
          <strong><code>SameSite=None; Secure</code></strong>: Cookie is sent in all cross-site requests. This is the
          value you need for cross-origin CORS with credentials. Requires <code>Secure</code> flag (HTTPS).
        </li>
      </ul>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Server: Set-Cookie for cross-origin use
Set-Cookie: session=abc123;
  SameSite=None;
  Secure;
  HttpOnly;
  Path=/

# Express (using cookie-session or express-session):
import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET!,
  cookie: {
    sameSite: 'none',        // allow cross-site
    secure: true,            // required when sameSite='none'
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,  // 24h
  },
}));`}</code></pre>

      {/* Section 10: Development Proxies */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CORS in Development — Webpack, Vite, and CRA Proxy
      </h2>
      <p>
        In local development, it is often easier to proxy API requests through the dev server than to configure CORS
        on the backend. The proxy makes the request from the same origin as the frontend, so CORS never applies.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Vite Proxy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      // Proxy /api/* to http://localhost:8080
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,   // changes Origin header to match target
        // rewrite: (path) => path.replace(/^\/api/, ''),  // strip /api prefix
      },
      // Proxy WebSocket connections
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
    },
  },
});

// In your code, use relative paths:
const response = await fetch('/api/users');
// Browser sends to http://localhost:5173/api/users
// Vite proxies to http://localhost:8080/api/users (no CORS)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        webpack-dev-server Proxy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,   // accept self-signed SSL in dev
        logLevel: 'debug',
      },
    },
  },
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Create React App Proxy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// package.json — simple proxy for all requests
{
  "proxy": "http://localhost:8080"
}

// For more control, use http-proxy-middleware:
// npm install http-proxy-middleware
// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};`}</code></pre>
      <p>
        This is why your app &ldquo;works in development but fails in production.&rdquo; The dev proxy removes CORS from the
        equation entirely. In production, you need actual CORS headers on the API server, or you need to serve the
        frontend and API from the same origin (recommended approach).
      </p>

      {/* Section 11: Debugging Workflow */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CORS Debugging Workflow — Browser DevTools and curl
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Step 1: Read the Browser Console Error
      </h3>
      <p>
        Open Chrome/Firefox DevTools, go to the Console tab, and read the exact error message. The error tells you
        precisely what is missing. Key phrases to look for:
      </p>
      <ul>
        <li>&ldquo;No &apos;Access-Control-Allow-Origin&apos; header is present&rdquo; — server sends no CORS headers at all</li>
        <li>&ldquo;has been blocked by CORS policy&rdquo; + origin mismatch — allowed origin doesn&apos;t match requesting origin</li>
        <li>&ldquo;does not pass access control check&rdquo; + preflight — OPTIONS request failed</li>
        <li>&ldquo;not allowed by Access-Control-Allow-Headers&rdquo; — missing header in preflight response</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Step 2: Inspect in the Network Tab
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# In Chrome/Firefox Network tab:
# 1. Look for an OPTIONS request — if present, check its response headers
# 2. Look at the failed request — check both request and response headers
# 3. Filter by "XHR" or "Fetch" to find API calls

# What to check in the OPTIONS preflight response:
# ✓ Access-Control-Allow-Origin: (your origin)
# ✓ Access-Control-Allow-Methods: (includes your method)
# ✓ Access-Control-Allow-Headers: (includes Authorization or custom headers)
# ✓ Status 200 or 204

# What to check in the actual request response:
# ✓ Access-Control-Allow-Origin: (your origin or *)
# ✓ Access-Control-Allow-Credentials: true (if using cookies)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Step 3: Test Preflight with curl
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Test preflight response manually:
curl -X OPTIONS https://api.example.com/users \\
  -H "Origin: https://app.example.com" \\
  -H "Access-Control-Request-Method: POST" \\
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \\
  -v 2>&1 | grep -i "access-control"

# Expected output:
# < Access-Control-Allow-Origin: https://app.example.com
# < Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# < Access-Control-Allow-Headers: Content-Type, Authorization
# < Access-Control-Allow-Credentials: true
# < Access-Control-Max-Age: 86400

# Test actual request:
curl -X GET https://api.example.com/users \\
  -H "Origin: https://app.example.com" \\
  -H "Authorization: Bearer mytoken" \\
  -v 2>&1 | grep -i "access-control"

# Test with credentials (simulate cookies):
curl -X GET https://api.example.com/profile \\
  -H "Origin: https://app.example.com" \\
  -b "session=abc123" \\
  -v`}</code></pre>

      {/* Section 12: Security Considerations */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        CORS Security Considerations — Pitfalls to Avoid
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The Dangers of Access-Control-Allow-Origin: *
      </h3>
      <p>
        Returning <code>Access-Control-Allow-Origin: *</code> is safe only for truly public, read-only APIs where you
        explicitly do not care which websites access the data. Never use wildcard origin for:
      </p>
      <ul>
        <li>APIs that accept <code>Authorization</code> headers or cookies</li>
        <li>APIs that return user-specific data</li>
        <li>APIs that perform state-changing operations (POST, PUT, DELETE)</li>
        <li>Internal APIs that should only be accessed by known clients</li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Origin Reflection Attack
      </h3>
      <p>
        A dangerous anti-pattern is blindly reflecting the <code>Origin</code> header back in the response without
        validating it. Some incorrect implementations do this:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// VULNERABLE: Reflecting any origin without validation
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', origin || '*');  // WRONG!
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// This is equivalent to using * but bypasses the browser's * + credentials check!
// Any website can make authenticated requests to your API.

// CORRECT: Validate against an allowlist
const ALLOWED_ORIGINS = new Set([
  'https://app.example.com',
  'https://admin.example.com',
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');  // IMPORTANT: tell caches origin matters
  }
  next();
});`}</code></pre>
      <p>
        The <code>Vary: Origin</code> header is critical when dynamically reflecting origins. Without it, CDNs and
        reverse proxy caches might serve a response with the wrong <code>Access-Control-Allow-Origin</code> to
        subsequent requests from different origins.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        The null Origin Attack
      </h3>
      <p>
        Never add <code>&quot;null&quot;</code> to your allowed origins list. The <code>Origin: null</code> header is sent by:
      </p>
      <ul>
        <li>Local HTML files opened with <code>file://</code></li>
        <li>Sandboxed iframes (<code>&lt;iframe sandbox&gt;</code>)</li>
        <li>Redirected cross-origin requests</li>
        <li>Data URLs</li>
      </ul>
      <p>
        Attackers can create sandboxed iframes to forge <code>Origin: null</code> and bypass your allowlist if you
        include <code>&quot;null&quot;</code>. Treat <code>null</code> as an untrusted origin.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        CORS vs CSRF
      </h3>
      <p>
        CORS and CSRF (Cross-Site Request Forgery) are related but separate concepts. CORS controls whether
        JavaScript can <em>read</em> cross-origin responses. CSRF involves unauthorized <em>state-changing</em>{' '}
        requests that the browser sends automatically (with cookies) from a malicious page. Key points:
      </p>
      <ul>
        <li>Proper CORS configuration with a strict origin allowlist reduces CSRF risk for JSON APIs.</li>
        <li>CORS does not protect against CSRF for simple requests (no preflight) or browser form submissions.</li>
        <li>Use CSRF tokens or the <code>SameSite</code> cookie attribute alongside CORS for complete protection.</li>
        <li>Custom headers like <code>X-API-Key</code> or <code>Content-Type: application/json</code> trigger preflights, which provide CSRF protection since browsers can&apos;t forge preflighted cross-site requests.</li>
      </ul>

      {/* Section 13: WebSocket CORS */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        WebSocket CORS — Different Rules, Similar Risks
      </h2>
      <p>
        WebSocket connections are initiated via an HTTP <code>Upgrade</code> request, but browsers do not apply
        CORS to WebSocket handshakes. This means WebSocket servers must implement their own origin validation to
        prevent cross-site WebSocket hijacking.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Socket.IO server CORS configuration
import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://app.example.com', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('message', (data) => {
    socket.emit('reply', { received: data });
  });
});

// Native WebSocket server — validate origin manually
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const ALLOWED_WS_ORIGINS = ['https://app.example.com', 'http://localhost:3000'];

wss.on('connection', (ws, req) => {
  const origin = req.headers.origin;

  // Close connection if origin is not allowed
  if (origin && !ALLOWED_WS_ORIGINS.includes(origin)) {
    ws.close(1008, 'Origin not allowed');
    return;
  }

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    ws.send('Echo: ' + message);
  });
});`}</code></pre>

      {/* Section 14: CORS in Different Environments */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Where CORS Does NOT Apply — Mobile Apps, Electron, Postman
      </h2>
      <p>
        CORS is exclusively a browser security mechanism. Many environments that make HTTP requests are not subject
        to CORS enforcement:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Environment</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>CORS Enforced?</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Explanation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Chrome, Firefox, Safari, Edge</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Yes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CORS is enforced by the browser engine</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Postman, Insomnia, Bruno</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Not a browser — no SOP/CORS enforcement</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>curl, wget, httpie</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Command-line tools, no browser context</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Node.js, Python requests, Go http</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server-side HTTP — no same-origin policy</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Electron apps</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>No (by default)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Runs in main process (Node.js), not browser renderer</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>React Native, Flutter mobile apps</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>No</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Native HTTP client, no browser SOP</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>WebView in mobile apps</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Depends</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Embedded browser engine may enforce CORS</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        This explains the common developer confusion: &ldquo;My request works in Postman but fails in the browser.&rdquo;
        The server sees the same request in both cases and returns the same response — it is the browser that
        intercepts and blocks the response when CORS headers are missing.
      </p>

      {/* Section 15: Common Mistakes Summary */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common CORS Mistakes and Their Fixes
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '6px', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ❌ MISTAKE 1: Adding CORS headers in the frontend
// (CORS headers must be set by the SERVER, not the client)
fetch('/api/data', {
  headers: {
    'Access-Control-Allow-Origin': '*',  // This does NOTHING
  }
});

// ❌ MISTAKE 2: Using wildcard with credentials
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Credentials', 'true');
// Browser will reject this combination!

// ✅ FIX 2:
res.setHeader('Access-Control-Allow-Origin', 'https://app.example.com');
res.setHeader('Access-Control-Allow-Credentials', 'true');

// ❌ MISTAKE 3: Not handling OPTIONS preflight
app.post('/api/data', handler);  // OPTIONS to /api/data will 404 or 405

// ✅ FIX 3: Handle OPTIONS (cors npm package does this automatically)
app.options('/api/data', cors());
app.post('/api/data', cors(), handler);

// ❌ MISTAKE 4: Missing Vary header with dynamic origins
if (allowedOrigins.has(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
  // Without Vary: Origin, CDN may cache and return wrong origin
}

// ✅ FIX 4: Add Vary: Origin header
res.setHeader('Vary', 'Origin');

// ❌ MISTAKE 5: Trailing slash mismatch
// Allowed origin: 'https://app.example.com'
// Request origin: 'https://app.example.com/'  (with trailing slash)
// These are NOT equal — be consistent with or without trailing slash

// ❌ MISTAKE 6: Setting CORS headers inside error handlers only
// CORS headers must be present even on error responses

// ✅ FIX 6: Use always modifier in Nginx, or set headers before sending errors
// In Express:
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  // CORS headers already set by middleware above
  res.status(500).json({ error: err.message });
});`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>CORS is server-side</strong>: CORS headers must be set by the server. Client-side changes cannot fix CORS errors.</li>
          <li><strong>Origin = scheme + host + port</strong>: All three must match for same-origin. Subdomains are different origins.</li>
          <li><strong>Use cors npm package</strong> for Express — it handles OPTIONS preflight automatically and covers all edge cases.</li>
          <li><strong>Never use wildcard + credentials</strong>: <code>Access-Control-Allow-Origin: *</code> cannot be combined with <code>Access-Control-Allow-Credentials: true</code>.</li>
          <li><strong>Validate origins against an allowlist</strong>, never blindly reflect the <code>Origin</code> header without checking.</li>
          <li><strong>Set <code>Vary: Origin</code></strong> when dynamically setting the origin to prevent CDN caching issues.</li>
          <li><strong>Set <code>Access-Control-Max-Age</code></strong> to a high value (86400) to cache preflights and avoid performance penalties.</li>
          <li><strong>For cookies, set <code>SameSite=None; Secure</code></strong> on the cookie in addition to CORS credentials support.</li>
          <li><strong>CORS does not apply</strong> to Postman, curl, Node.js, mobile apps — only browsers enforce CORS.</li>
          <li><strong>Dev proxy is the easiest dev solution</strong>: Vite proxy or webpack-dev-server proxy eliminates CORS in development.</li>
        </ul>
      </div>
    </article>
  );
}
