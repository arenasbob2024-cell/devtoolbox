'use client';

import React from 'react';

const translations = {
  en: {
    title: 'API Design Guide: REST, GraphQL, gRPC, Versioning, Auth & Caching — 2026',
    description:
      'A comprehensive API design guide covering REST principles, GraphQL, gRPC, tRPC, WebSockets, OpenAPI/Swagger, versioning strategies, OAuth 2.0, JWT, rate limiting, error handling, pagination, and caching.',
    tldr:
      'Good API design starts with consistent resource naming, proper HTTP semantics, and strong versioning discipline. Use OpenAPI to document contracts, OAuth 2.0 / JWT for auth, RFC 7807 for error payloads, cursor-based pagination for large datasets, and ETags plus Cache-Control for caching. Choose REST for simplicity, GraphQL for flexibility, gRPC for performance, tRPC for full-stack TypeScript, and WebSockets for real-time.',
  },
  zh: {
    title: 'API 设计指南：REST、GraphQL、gRPC、版本管理、认证与缓存 — 2026',
    description:
      '全面的 API 设计指南，涵盖 REST 原则、GraphQL、gRPC、tRPC、WebSocket、OpenAPI/Swagger、版本策略、OAuth 2.0、JWT、限流、错误处理、分页和缓存。',
    tldr:
      '良好的 API 设计始于一致的资源命名、正确的 HTTP 语义和严格的版本规范。使用 OpenAPI 记录契约，OAuth 2.0/JWT 进行认证，RFC 7807 规范错误响应，游标分页处理大数据集，ETag 加 Cache-Control 实现缓存。简单场景选 REST，灵活查询选 GraphQL，高性能选 gRPC，全栈 TypeScript 选 tRPC，实时通信选 WebSocket。',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between REST and GraphQL?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'REST uses multiple endpoints with fixed response shapes defined by the server; each resource has its own URL. GraphQL uses a single endpoint where the client specifies exactly which fields it needs, eliminating over-fetching and under-fetching. REST is simpler to cache and debug; GraphQL is better for complex, nested data requirements and rapid frontend iteration.',
      },
    },
    {
      '@type': 'Question',
      name: 'What counts as a breaking change in a REST API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Breaking changes include: removing or renaming a field, changing a field\'s data type, changing HTTP method or status code semantics, removing an endpoint, making an optional parameter required, and changing authentication requirements. Non-breaking changes include: adding new optional fields, adding new endpoints, and adding new optional query parameters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which API versioning strategy is best?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'URL path versioning (/api/v1/users) is the most widely adopted because it is explicit, easy to test in a browser, and cacheable without custom headers. Header versioning keeps URLs clean but requires more client complexity. Query parameter versioning is generally discouraged for production APIs. The most important factor is consistency: pick one approach and apply it everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an API gateway and do I need one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An API gateway is a reverse proxy that sits in front of your backend services and handles cross-cutting concerns: authentication, rate limiting, request routing, SSL termination, logging, and response transformation. You likely need one if you have multiple microservices, need centralized rate limiting or auth, or want to expose a unified public API surface. Popular options include Kong, AWS API Gateway, Nginx, and Traefik.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I handle backward compatibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Follow the "expand and contract" pattern: first add new fields alongside old ones (expand), then deprecate old fields after clients have migrated (contract). Use the Sunset header to announce deprecation dates. Never remove a field without a deprecation period of at least 6 months. Make new fields optional. Use semantic versioning to signal breaking changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best pagination strategy for large datasets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cursor-based (keyset) pagination is best for large datasets: it is stable when records are inserted or deleted between requests, and it scales to millions of rows without the performance degradation of OFFSET. Use it with an opaque cursor (base64-encoded last-seen ID + sort key). Offset pagination is acceptable for small datasets or when users need to jump to arbitrary pages. Never use OFFSET > 10,000 in production databases.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use gRPC instead of REST?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use gRPC for internal microservice-to-microservice communication where performance is critical: it uses Protocol Buffers (binary serialization, 3-10x smaller than JSON), HTTP/2 (multiplexing, header compression), and supports bidirectional streaming. Use REST or GraphQL for public APIs that browser clients consume, since gRPC requires HTTP/2 and a protobuf library on the client.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I document an API effectively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write an OpenAPI 3.1 specification that serves as the single source of truth. Generate interactive documentation with Swagger UI or Redoc. Document every endpoint with a clear description, all request parameters and body schemas, all possible response codes and examples, and authentication requirements. Provide a getting-started guide, authentication walkthrough, and runnable curl examples. Keep docs in sync with code using contract testing.',
      },
    },
  ],
};

export default function ApiDesignGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <>
      {/* JSON-LD FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '0 8px 8px 0',
          padding: '16px 20px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          TL;DR
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: 1.6 }}>
          {t.tldr}
        </p>
      </div>

      {/* Key Takeaways Box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '40px',
        }}
      >
        <strong style={{ display: 'block', marginBottom: '12px', color: '#1e293b', fontSize: '16px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: 1.8 }}>
          <li>Use nouns for resource URLs (<code>/users</code>, <code>/orders</code>) and HTTP verbs for actions</li>
          <li>Version with URL path (<code>/api/v2</code>) and use <code>Sunset</code> headers for deprecation</li>
          <li>Implement OAuth 2.0 Authorization Code + PKCE for user-facing auth; API keys for server-to-server</li>
          <li>Document everything with OpenAPI 3.1 — it is the contract between teams</li>
          <li>Return <code>429 Too Many Requests</code> with <code>Retry-After</code> when rate limiting triggers</li>
          <li>Follow RFC 7807 Problem Details for all error responses</li>
          <li>Prefer cursor-based pagination over OFFSET for datasets larger than 1,000 rows</li>
          <li>Use ETags and <code>Cache-Control</code> to eliminate unnecessary network round trips</li>
        </ul>
      </div>

      <h2>Introduction: Why API Design Matters</h2>
      <p>
        An API is a contract between a provider and its consumers. A well-designed API is intuitive to learn,
        hard to misuse, easy to evolve, and a pleasure to debug. A poorly designed one creates friction at every
        layer: developers waste hours deciphering inconsistent naming, frontend teams make redundant requests
        because of over-fetching, and breaking changes cascade into production incidents.
      </p>
      <p>
        This guide covers every dimension of modern API design: REST principles and resource modeling,
        versioning strategies that let you evolve without breaking clients, authentication from API keys through
        OAuth 2.0, OpenAPI specification, rate limiting algorithms, RFC-compliant error handling, scalable
        pagination patterns, and caching strategies that reduce latency and server load. A comparison table
        helps you choose between REST, GraphQL, gRPC, tRPC, and WebSockets.
      </p>
      <p>
        Whether you are designing a brand-new public API, refactoring an aging internal service, or building a
        microservices platform, the principles here will help you ship an API your consumers will enjoy using for
        years.
      </p>

      {/* ─── SECTION 1: REST API Design Principles ─── */}
      <h2>1. REST API Design Principles</h2>
      <p>
        REST (Representational State Transfer), defined by Roy Fielding in his 2000 dissertation, is an
        architectural style built on six constraints: stateless client-server communication, a uniform interface,
        a layered system, cacheability, a code-on-demand capability (optional), and uniform resource
        identification. In practice, most APIs are &ldquo;REST-ish&rdquo; — they follow the naming and HTTP
        verb conventions without implementing full HATEOAS.
      </p>

      <h3>Resource Naming Conventions</h3>
      <p>
        Resources are the nouns of your API. Use plural nouns for collections, lowercase with hyphens for
        compound words, and nest sub-resources only when the child has no independent lifecycle.
      </p>
      <pre><code className="language-text">{`# Good resource naming
GET    /users                    # List all users
POST   /users                    # Create a user
GET    /users/42                 # Get user 42
PATCH  /users/42                 # Partial update
PUT    /users/42                 # Full replace
DELETE /users/42                 # Delete user 42

GET    /users/42/posts           # Posts belonging to user 42
GET    /users/42/posts/7         # A specific post

# Avoid verbs in URLs — HTTP method IS the verb
# Bad:  POST /createUser
# Good: POST /users

# Avoid deep nesting beyond 2 levels
# Bad:  GET /companies/1/departments/2/teams/3/members
# Good: GET /teams/3/members   (team ID is globally unique)

# Filter with query parameters, not paths
GET /orders?status=pending&customerId=42&sort=createdAt&order=desc`}</code></pre>

      <h3>HTTP Verbs and Their Semantics</h3>
      <p>
        Each HTTP method carries well-defined semantics. Respecting them makes your API predictable and enables
        caching, retry logic, and middleware to work correctly out of the box.
      </p>
      <pre><code className="language-text">{`Method   | Safe | Idempotent | Body  | Typical Use
---------|------|------------|-------|----------------------------
GET      |  Yes |   Yes      |  No   | Read resource(s)
POST     |  No  |   No       |  Yes  | Create resource or trigger action
PUT      |  No  |   Yes      |  Yes  | Replace entire resource
PATCH    |  No  |   No*      |  Yes  | Partial update
DELETE   |  No  |   Yes      |  No   | Delete resource
HEAD     |  Yes |   Yes      |  No   | Check existence / get headers
OPTIONS  |  Yes |   Yes      |  No   | CORS preflight / capability query

* PATCH can be made idempotent with conditional headers (If-Match)`}</code></pre>

      <h3>HTTP Status Codes</h3>
      <p>
        Use the most specific status code available. Clients and proxies make decisions based on status codes —
        a generic 200 for every response or a 500 when the client sent bad data destroys trust in your API.
      </p>
      <pre><code className="language-text">{`2xx — Success
  200 OK              — Successful GET, PUT, PATCH, DELETE with body
  201 Created         — Successful POST; include Location header with new resource URL
  202 Accepted        — Request accepted for async processing
  204 No Content      — Successful DELETE or PUT with no response body

3xx — Redirection
  301 Moved Permanently   — Resource URL changed permanently
  304 Not Modified        — Conditional GET, use cached version
  308 Permanent Redirect  — Like 301 but preserves HTTP method

4xx — Client Errors
  400 Bad Request         — Malformed request, validation failure
  401 Unauthorized        — Not authenticated (send WWW-Authenticate header)
  403 Forbidden           — Authenticated but lacks permission
  404 Not Found           — Resource does not exist
  409 Conflict            — State conflict (duplicate, version mismatch)
  422 Unprocessable Entity — Semantic validation failure
  429 Too Many Requests   — Rate limit exceeded (send Retry-After)

5xx — Server Errors
  500 Internal Server Error — Unexpected server failure
  502 Bad Gateway           — Upstream service failure
  503 Service Unavailable   — Server overloaded or in maintenance
  504 Gateway Timeout       — Upstream timed out`}</code></pre>

      <h3>HATEOAS — Hypermedia as the Engine of Application State</h3>
      <p>
        HATEOAS is the highest level of REST maturity (Richardson Maturity Model Level 3). Responses include
        links that guide clients to related actions, making the API self-discoverable without requiring clients
        to hard-code URL patterns. While full HATEOAS is rarely implemented in practice, including relevant
        links in responses is a good habit.
      </p>
      <pre><code className="language-json">{`{
  "id": 42,
  "name": "Alice",
  "email": "alice@example.com",
  "status": "active",
  "_links": {
    "self":   { "href": "/users/42",            "method": "GET" },
    "update": { "href": "/users/42",            "method": "PATCH" },
    "delete": { "href": "/users/42",            "method": "DELETE" },
    "posts":  { "href": "/users/42/posts",      "method": "GET" },
    "orders": { "href": "/orders?userId=42",    "method": "GET" }
  }
}`}</code></pre>

      {/* ─── SECTION 2: API Versioning Strategies ─── */}
      <h2>2. API Versioning Strategies</h2>
      <p>
        APIs evolve. Fields get renamed, endpoints restructured, and data models changed. Versioning lets you
        introduce breaking changes without disrupting existing clients. The key insight: version early, even if
        you start at v1 and never change it — adding versioning later is painful.
      </p>

      <h3>URL Path Versioning (Recommended)</h3>
      <p>
        The most widely adopted strategy. The version identifier appears in the URL path, making it immediately
        visible, bookmarkable, and cacheable without special client configuration.
      </p>
      <pre><code className="language-text">{`# URL path versioning
GET /api/v1/users
GET /api/v2/users

# Pros:
#  - Explicit and easy to test in a browser
#  - Works with all HTTP clients without configuration
#  - Cache-friendly (CDNs cache per URL by default)
#  - Easy to route to different backend implementations
#
# Cons:
#  - URL is no longer a pure resource identifier
#  - Requires maintaining multiple route trees`}</code></pre>

      <h3>Header Versioning</h3>
      <p>
        GitHub and Stripe use header-based versioning. The URL stays clean and represents a pure resource
        address. Versioning is a concern of the request, not the resource identity.
      </p>
      <pre><code className="language-text">{`# Custom header versioning (GitHub style)
GET /api/users
API-Version: 2026-01-01

# Accept header (media type / content negotiation)
GET /api/users
Accept: application/vnd.myapi.v2+json

# Pros:
#  - Clean URLs
#  - Allows fine-grained, date-based versioning
#
# Cons:
#  - Harder to test in a browser (need to set headers)
#  - Requires cache vary headers: Vary: API-Version
#  - More complex client configuration`}</code></pre>

      <h3>Versioning Best Practices and Sunset Policies</h3>
      <pre><code className="language-text">{`# Announce deprecation with HTTP headers
HTTP/1.1 200 OK
Deprecation: true
Sunset: Sat, 31 Dec 2026 23:59:59 GMT
Link: </api/v2/users>; rel="successor-version"

# Semantic versioning signals for API changes:
# MAJOR version — breaking changes (remove field, change type)
# MINOR version — backward-compatible additions (new optional field)
# PATCH version — backward-compatible fixes
#
# Industry guidance:
# - Maintain at least 2 major versions simultaneously
# - Give clients a minimum 6-month deprecation window
# - Log which version each client uses to track migration progress
# - Provide migration guides with every major version bump`}</code></pre>

      {/* ─── SECTION 3: Authentication and Authorization ─── */}
      <h2>3. Authentication and Authorization</h2>
      <p>
        Authentication verifies the identity of the caller. Authorization determines what they can do. A secure
        API design addresses both layers and applies the principle of least privilege throughout.
      </p>

      <h3>API Key Authentication</h3>
      <p>
        API keys are long random strings assigned to client applications. They are ideal for server-to-server
        communication where you need to identify and rate-limit a specific integration.
      </p>
      <pre><code className="language-javascript">{`// Sending an API key in a header (preferred)
fetch('https://api.example.com/v1/data', {
  headers: {
    'X-API-Key': 'sk_live_abc123xyz...',
    'Content-Type': 'application/json',
  },
});

// Express.js API key middleware
function apiKeyAuth(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key) {
    return res.status(401).json({ error: 'API key required' });
  }

  // Hash the key before DB lookup (never store raw keys)
  const keyHash = crypto
    .createHash('sha256')
    .update(key)
    .digest('hex');

  const client = await db.apiKeys.findOne({ hash: keyHash, active: true });
  if (!client) {
    return res.status(403).json({ error: 'Invalid or revoked API key' });
  }

  req.client = client;
  next();
}

// Best practices:
// - Prefix keys for identification: sk_live_, sk_test_, pk_
// - Store only the SHA-256 hash in your database (not the raw key)
// - Show the raw key only once at creation time
// - Support multiple active keys per account for rotation`}</code></pre>

      <h3>OAuth 2.0 + PKCE (User-Facing Auth)</h3>
      <p>
        OAuth 2.0 is the industry standard for delegated authorization. Use the Authorization Code flow with
        PKCE for any application where users grant access to their resources.
      </p>
      <pre><code className="language-javascript">{`// OAuth 2.0 Authorization Code + PKCE flow
// Step 1: Generate code verifier and challenge
function generatePkce() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
  return { verifier, challenge };
}

// Step 2: Redirect user to authorization server
function buildAuthUrl(clientId, redirectUri, scope) {
  const { verifier, challenge } = generatePkce();
  sessionStorage.setItem('pkce_verifier', verifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state: crypto.randomUUID(), // CSRF protection
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  return 'https://auth.example.com/authorize?' + params.toString();
}

// Step 3: Exchange code for tokens (server-side)
async function exchangeCode(code, redirectUri) {
  const verifier = sessionStorage.getItem('pkce_verifier');
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
      client_id: 'my-client-id',
    }),
  });
  return response.json();
  // Returns: { access_token, refresh_token, expires_in, token_type }
}`}</code></pre>

      <h3>JWT Bearer Tokens</h3>
      <p>
        JSON Web Tokens encode user claims into a cryptographically signed payload. They enable stateless
        authentication across microservices without shared session storage.
      </p>
      <pre><code className="language-javascript">{`// Issuing JWT access + refresh tokens (Node.js)
const jwt = require('jsonwebtoken');

function issueTokens(user) {
  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      scope: 'read:data write:data',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',       // Short-lived access token
      issuer: 'https://api.example.com',
      audience: 'https://api.example.com',
    }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh', jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  return { accessToken, refreshToken };
}

// Verifying a JWT in middleware
function jwtAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  try {
    const token = auth.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'https://api.example.com',
      audience: 'https://api.example.com',
    });
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? 'Token expired'
      : 'Invalid token';
    return res.status(401).json({ error: message });
  }
}`}</code></pre>

      <h3>OAuth Scopes and Authorization</h3>
      <pre><code className="language-text">{`# Scope design — granular, action-based
# Format: resource:action

read:users          — Read user profiles
write:users         — Create and update users
delete:users        — Delete users (rarely granted)
read:orders         — View order history
write:orders        — Create and modify orders
admin               — Full access (reserved for internal services)

# Token introspection endpoint (RFC 7662)
POST /oauth/introspect
Authorization: Basic <client_credentials>
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Response:
{
  "active": true,
  "sub": "user-42",
  "scope": "read:users read:orders",
  "exp": 1735689600,
  "iss": "https://auth.example.com"
}`}</code></pre>

      {/* ─── SECTION 4: OpenAPI / Swagger ─── */}
      <h2>4. OpenAPI / Swagger Specification</h2>
      <p>
        OpenAPI 3.1 is the industry standard for describing REST APIs. It is machine-readable (YAML or JSON),
        enabling automatic code generation, interactive documentation, contract testing, and mock servers. An
        OpenAPI spec is the contract between your backend and all consumers.
      </p>

      <h3>OpenAPI 3.1 YAML Structure</h3>
      <pre><code className="language-yaml">{`openapi: "3.1.0"
info:
  title: "User Management API"
  description: "Manage users, profiles, and authentication"
  version: "2.1.0"
  contact:
    name: "API Support"
    email: "api@example.com"
  license:
    name: "Apache 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"

servers:
  - url: "https://api.example.com/v2"
    description: "Production"
  - url: "https://staging-api.example.com/v2"
    description: "Staging"

security:
  - BearerAuth: []      # Applied globally; override per-operation

paths:
  /users:
    get:
      summary: "List users"
      operationId: "listUsers"
      tags: ["Users"]
      security:
        - BearerAuth: ["read:users"]
      parameters:
        - name: page
          in: query
          schema: { type: integer, minimum: 1, default: 1 }
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
        - name: status
          in: query
          schema: { type: string, enum: [active, inactive, suspended] }
      responses:
        "200":
          description: "Paginated list of users"
          headers:
            X-Total-Count:
              schema: { type: integer }
              description: "Total number of matching users"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UserList"
        "401":
          $ref: "#/components/responses/Unauthorized"
        "429":
          $ref: "#/components/responses/RateLimited"

    post:
      summary: "Create user"
      operationId: "createUser"
      tags: ["Users"]
      security:
        - BearerAuth: ["write:users"]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CreateUserRequest"
            examples:
              basic:
                summary: "Basic user creation"
                value:
                  name: "Alice Smith"
                  email: "alice@example.com"
                  role: "viewer"
      responses:
        "201":
          description: "User created successfully"
          headers:
            Location:
              schema: { type: string, format: uri }
              description: "URL of the newly created user"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "400":
          $ref: "#/components/responses/BadRequest"
        "409":
          $ref: "#/components/responses/Conflict"

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

  schemas:
    User:
      type: object
      required: [id, name, email, createdAt]
      properties:
        id:
          type: string
          format: uuid
          readOnly: true
          example: "550e8400-e29b-41d4-a716-446655440000"
        name:
          type: string
          minLength: 1
          maxLength: 100
          example: "Alice Smith"
        email:
          type: string
          format: email
          example: "alice@example.com"
        role:
          type: string
          enum: [admin, editor, viewer]
          default: viewer
        createdAt:
          type: string
          format: date-time
          readOnly: true

    CreateUserRequest:
      type: object
      required: [name, email]
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 100
        email:
          type: string
          format: email
        role:
          type: string
          enum: [editor, viewer]
          default: viewer

    UserList:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: "#/components/schemas/User"
        pagination:
          $ref: "#/components/schemas/Pagination"

    Pagination:
      type: object
      properties:
        page:    { type: integer }
        limit:   { type: integer }
        total:   { type: integer }
        hasMore: { type: boolean }

    Problem:
      type: object
      description: "RFC 7807 Problem Details"
      required: [type, title, status]
      properties:
        type:     { type: string, format: uri }
        title:    { type: string }
        status:   { type: integer }
        detail:   { type: string }
        instance: { type: string, format: uri }
        errors:
          type: array
          items:
            type: object
            properties:
              field:   { type: string }
              message: { type: string }

  responses:
    Unauthorized:
      description: "Authentication required"
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }
    BadRequest:
      description: "Validation failed"
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }
    Conflict:
      description: "Resource already exists"
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }
    RateLimited:
      description: "Rate limit exceeded"
      headers:
        Retry-After:
          schema: { type: integer }
          description: "Seconds until rate limit resets"
      content:
        application/problem+json:
          schema: { $ref: "#/components/schemas/Problem" }`}</code></pre>

      {/* ─── SECTION 5: Rate Limiting and Throttling ─── */}
      <h2>5. Rate Limiting and Throttling</h2>
      <p>
        Rate limiting protects your API from abuse, ensures fair resource allocation among clients, and
        maintains service stability under unexpected load. Every public API should implement rate limiting;
        internal APIs should too in microservice architectures.
      </p>

      <h3>Rate Limiting Algorithms</h3>
      <p>
        The choice of algorithm determines how bursty traffic is handled and how accurately limits are
        enforced:
      </p>
      <pre><code className="language-javascript">{`// Token Bucket — allows bursts up to bucket capacity
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;       // Max tokens (burst limit)
    this.tokens = capacity;         // Current tokens
    this.refillRate = refillRate;   // Tokens added per second
    this.lastRefill = Date.now();
  }

  consume(tokens = 1) {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;

    // Refill tokens based on elapsed time
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;  // Allowed
    }
    return false;   // Rate limited
  }
}

// Redis-backed sliding window counter (production-ready)
async function slidingWindowRateLimit(redis, key, limit, windowSeconds) {
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, '-inf', windowStart);    // Remove old entries
  pipeline.zadd(key, now, now.toString());                // Add current request
  pipeline.zcard(key);                                    // Count in window
  pipeline.expire(key, windowSeconds);

  const results = await pipeline.exec();
  const count = results[2][1];

  return {
    allowed: count <= limit,
    count,
    limit,
    remaining: Math.max(0, limit - count),
    resetAt: Math.ceil((now + windowSeconds * 1000) / 1000),
  };
}

// Express.js middleware with proper headers
async function rateLimitMiddleware(req, res, next) {
  const key = 'rl:' + (req.headers['x-api-key'] || req.ip);
  const result = await slidingWindowRateLimit(redis, key, 100, 60);

  // Always send rate limit headers
  res.set({
    'X-RateLimit-Limit':     result.limit,
    'X-RateLimit-Remaining': result.remaining,
    'X-RateLimit-Reset':     result.resetAt,
  });

  if (!result.allowed) {
    const retryAfter = result.resetAt - Math.floor(Date.now() / 1000);
    res.set('Retry-After', retryAfter);
    return res.status(429).json({
      type: 'https://api.example.com/errors/rate-limit-exceeded',
      title: 'Too Many Requests',
      status: 429,
      detail: 'You have exceeded 100 requests per minute.',
      retryAfter,
    });
  }

  next();
}`}</code></pre>

      <h3>Rate Limiting Tiers</h3>
      <pre><code className="language-text">{`# Tiered rate limits by plan / auth level
Plan      | Limit          | Window  | Burst
----------|----------------|---------|-------
Anonymous | 10 req         | 1 min   | No burst
Free      | 60 req         | 1 min   | 20 req/s
Pro       | 1,000 req      | 1 min   | 100 req/s
Business  | 10,000 req     | 1 min   | 500 req/s
Enterprise| Unlimited      | Custom  | Custom

# Different limits per endpoint category
POST /auth/login        → 5 req / 15 min (brute force protection)
GET  /api/search        → 30 req / min (expensive query)
POST /api/webhooks/test → 10 req / hour (side-effect-heavy)
GET  /api/v2/*          → Plan tier limits (general endpoints)`}</code></pre>

      {/* ─── SECTION 6: Error Handling Best Practices ─── */}
      <h2>6. Error Handling Best Practices</h2>
      <p>
        Consistent, informative error responses are one of the most undervalued aspects of API design. RFC 7807
        (Problem Details for HTTP APIs) defines a standard JSON structure for error payloads that most modern
        APIs have adopted.
      </p>

      <h3>RFC 7807 Problem Details</h3>
      <pre><code className="language-json">{`// Validation error — 400 Bad Request
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/validation-failed",
  "title": "Validation Failed",
  "status": 400,
  "detail": "The request body contains invalid fields.",
  "instance": "/users",
  "errors": [
    {
      "field": "email",
      "code": "INVALID_FORMAT",
      "message": "Must be a valid email address"
    },
    {
      "field": "name",
      "code": "REQUIRED",
      "message": "Name is required"
    }
  ]
}

// Not found — 404
HTTP/1.1 404 Not Found
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/resource-not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "No user exists with ID '99999'.",
  "instance": "/users/99999"
}

// Business logic conflict — 409
HTTP/1.1 409 Conflict
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/duplicate-email",
  "title": "Email Already Registered",
  "status": 409,
  "detail": "An account with alice@example.com already exists.",
  "instance": "/users",
  "suggestions": [
    "Sign in to your existing account",
    "Use a different email address",
    "Request a password reset"
  ]
}`}</code></pre>

      <h3>Error Handling Middleware (Node.js / Express)</h3>
      <pre><code className="language-javascript">{`// Centralized error handler
class ApiError extends Error {
  constructor(status, type, title, detail, extras = {}) {
    super(title);
    this.status = status;
    this.type = type;
    this.title = title;
    this.detail = detail;
    this.extras = extras;
  }

  toProblemDetails(instance) {
    return {
      type: this.type,
      title: this.title,
      status: this.status,
      detail: this.detail,
      instance,
      ...this.extras,
    };
  }
}

// Factory helpers
const Errors = {
  notFound: (resource, id) => new ApiError(
    404,
    'https://api.example.com/errors/not-found',
    'Resource Not Found',
    \`No \${resource} with ID '\${id}' was found.\`
  ),
  validation: (errors) => new ApiError(
    400,
    'https://api.example.com/errors/validation-failed',
    'Validation Failed',
    'The request contains invalid data.',
    { errors }
  ),
  conflict: (detail) => new ApiError(
    409,
    'https://api.example.com/errors/conflict',
    'Conflict',
    detail
  ),
};

// Express error middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .set('Content-Type', 'application/problem+json')
      .json(err.toProblemDetails(req.path));
  }

  // Zod / Joi validation errors
  if (err.name === 'ZodError') {
    const apiErr = Errors.validation(
      err.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
    );
    return res
      .status(400)
      .set('Content-Type', 'application/problem+json')
      .json(apiErr.toProblemDetails(req.path));
  }

  // Unexpected errors — log and return generic 500
  console.error('[UNHANDLED ERROR]', err);
  res.status(500)
     .set('Content-Type', 'application/problem+json')
     .json({
       type: 'https://api.example.com/errors/internal',
       title: 'Internal Server Error',
       status: 500,
       detail: 'An unexpected error occurred. It has been logged.',
       instance: req.path,
     });
});`}</code></pre>

      {/* ─── SECTION 7: API Pagination Patterns ─── */}
      <h2>7. API Pagination Patterns</h2>
      <p>
        Returning all records in a single response is a recipe for timeouts, memory exhaustion, and poor user
        experience. Pagination is non-negotiable for any collection endpoint that might grow beyond a few dozen
        records.
      </p>

      <h3>Offset Pagination</h3>
      <p>
        Simplest to implement and supports random page access. Breaks when records are inserted or deleted
        between requests. Becomes slow at high offsets due to database scans.
      </p>
      <pre><code className="language-javascript">{`// Offset pagination — simple but has limitations
GET /users?page=3&limit=20

// Response shape
{
  "data": [ /* 20 users */ ],
  "pagination": {
    "page": 3,
    "limit": 20,
    "total": 1247,
    "totalPages": 63,
    "hasNext": true,
    "hasPrev": true
  },
  "_links": {
    "self":  "/users?page=3&limit=20",
    "first": "/users?page=1&limit=20",
    "prev":  "/users?page=2&limit=20",
    "next":  "/users?page=4&limit=20",
    "last":  "/users?page=63&limit=20"
  }
}

// SQL — avoid high OFFSET
// Bad:  SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 100000;
// Good: Use keyset pagination below`}</code></pre>

      <h3>Cursor-Based (Keyset) Pagination — Recommended</h3>
      <p>
        Stable when data changes between requests, O(log n) performance regardless of page depth, and ideal for
        real-time feeds and large datasets.
      </p>
      <pre><code className="language-javascript">{`// Cursor-based pagination
GET /users?limit=20
GET /users?limit=20&cursor=eyJpZCI6NTAsImNyZWF0ZWRBdCI6IjIwMjYtMDEtMTUifQ

// Response
{
  "data": [ /* 20 users */ ],
  "pagination": {
    "hasNext": true,
    "hasPrev": false,
    "nextCursor": "eyJpZCI6NzAsImNyZWF0ZWRBdCI6IjIwMjYtMDItMDEifQ",
    "prevCursor": null,
    "limit": 20
  }
}

// Node.js cursor encoding/decoding
function encodeCursor(lastRecord) {
  const payload = JSON.stringify({
    id: lastRecord.id,
    createdAt: lastRecord.createdAt,
  });
  return Buffer.from(payload).toString('base64url');
}

function decodeCursor(cursor) {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64url').toString('utf-8'));
  } catch {
    throw new Error('Invalid cursor');
  }
}

// Efficient SQL query using keyset
async function getUsers(limit, cursor) {
  if (cursor) {
    const { id, createdAt } = decodeCursor(cursor);
    return db.query(
      \`SELECT * FROM users
       WHERE (created_at, id) < (\$1, \$2)
       ORDER BY created_at DESC, id DESC
       LIMIT \$3\`,
      [createdAt, id, limit + 1]  // fetch one extra to check hasNext
    );
  }
  return db.query(
    'SELECT * FROM users ORDER BY created_at DESC, id DESC LIMIT \$1',
    [limit + 1]
  );
}

// RFC 5988 Link headers (alternative to body pagination)
// Link: </users?cursor=abc123>; rel="next", </users?cursor=xyz789>; rel="prev"`}</code></pre>

      <h3>Pagination Strategy Comparison</h3>
      <pre><code className="language-text">{`Strategy         | Performance | Stable | Jump to Page | Best For
-----------------|-------------|--------|--------------|---------------------------
Offset / Page    | Degrades    | No     | Yes          | Small datasets, admin UIs
Cursor / Keyset  | Constant    | Yes    | No           | Large datasets, feeds
Seek (Keyset+)   | Constant    | Yes    | Partial      | Time-series data
GraphQL Relay    | Constant    | Yes    | No           | GraphQL APIs (Connections)`}</code></pre>

      {/* ─── SECTION 8: API Caching Strategies ─── */}
      <h2>8. API Caching Strategies</h2>
      <p>
        Caching is one of the highest-leverage performance optimizations available to API designers. Applied
        correctly, it reduces latency, cuts database load, lowers infrastructure costs, and improves resilience.
      </p>

      <h3>HTTP Caching Headers</h3>
      <pre><code className="language-text">{`# Cache-Control directives
Cache-Control: public, max-age=300            # Cache for 5 min (CDN + client)
Cache-Control: private, max-age=60            # Client-only cache (user-specific)
Cache-Control: no-cache                        # Validate with server before using cache
Cache-Control: no-store                        # Never cache (sensitive data)
Cache-Control: max-age=0, must-revalidate     # Stale-While-Revalidate alternative
Cache-Control: stale-while-revalidate=300     # Serve stale while fetching fresh

# Vary header — differentiate cache entries by request headers
Vary: Accept-Encoding, Accept-Language, Authorization

# Surrogate-Control (for CDNs, not forwarded to clients)
Surrogate-Control: max-age=3600

# Practical examples
GET /products/123         → Cache-Control: public, max-age=300, stale-while-revalidate=600
GET /users/me             → Cache-Control: private, max-age=60
GET /reports/annual       → Cache-Control: public, max-age=86400
POST /orders              → Cache-Control: no-store`}</code></pre>

      <h3>ETags and Conditional Requests</h3>
      <pre><code className="language-javascript">{`// ETags eliminate unnecessary data transfer
// Server sends ETag on first request
HTTP/1.1 200 OK
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d"
Cache-Control: max-age=300

// Client sends If-None-Match on subsequent request
GET /users/42
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d"

// If unchanged: 304 Not Modified (no body — saves bandwidth)
HTTP/1.1 304 Not Modified
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d"

// Express.js ETag middleware
const crypto = require('crypto');

function etagMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = function(data) {
    const body = JSON.stringify(data);
    const etag = '"' + crypto
      .createHash('md5')
      .update(body)
      .digest('hex') + '"';

    res.set('ETag', etag);

    // Check If-None-Match header
    if (req.headers['if-none-match'] === etag) {
      return res.status(304).end();
    }

    return originalJson(data);
  };

  next();
}

// Optimistic concurrency with If-Match
PATCH /users/42
If-Match: "33a64df551425fcc55e4d42a148795d9f25f89d"

// If ETag mismatch (someone else updated it):
HTTP/1.1 412 Precondition Failed
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/conflict",
  "title": "Resource Modified",
  "status": 412,
  "detail": "The resource was modified since you last retrieved it."
}`}</code></pre>

      <h3>Redis Caching Layer</h3>
      <pre><code className="language-javascript">{`// Redis cache-aside pattern for API responses
class ApiCache {
  constructor(redis, defaultTtl = 300) {
    this.redis = redis;
    this.defaultTtl = defaultTtl;
  }

  async get(key) {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);
    return null;
  }

  async set(key, value, ttl = this.defaultTtl) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async invalidate(...patterns) {
    const pipeline = this.redis.pipeline();
    for (const pattern of patterns) {
      const keys = await this.redis.keys(pattern);
      if (keys.length) pipeline.del(...keys);
    }
    await pipeline.exec();
  }

  cacheKey(req) {
    const query = new URLSearchParams(req.query).toString();
    return 'api:' + req.path + (query ? '?' + query : '');
  }
}

// Usage in route handler
app.get('/api/v2/products', async (req, res) => {
  const cacheKey = cache.cacheKey(req);
  const cached = await cache.get(cacheKey);

  if (cached) {
    return res.set('X-Cache', 'HIT')
              .set('Cache-Control', 'public, max-age=300')
              .json(cached);
  }

  const products = await db.products.findAll({ where: req.query });
  await cache.set(cacheKey, products, 300);

  res.set('X-Cache', 'MISS')
     .set('Cache-Control', 'public, max-age=300')
     .json(products);
});

// Invalidate on write
app.post('/api/v2/products', async (req, res) => {
  const product = await db.products.create(req.body);
  await cache.invalidate('api:/api/v2/products*');
  res.status(201)
     .set('Location', '/api/v2/products/' + product.id)
     .json(product);
});`}</code></pre>

      {/* ─── SECTION 9: Comparison Table ─── */}
      <h2>9. REST vs GraphQL vs gRPC vs tRPC vs WebSocket</h2>
      <p>
        No single protocol is universally best. The right choice depends on your client types, data complexity,
        performance requirements, and team expertise. Here is a comprehensive comparison to guide your decision:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}>Dimension</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>REST</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>GraphQL</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>gRPC</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>tRPC</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>WebSocket</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Protocol', 'HTTP/1.1+', 'HTTP/1.1+', 'HTTP/2', 'HTTP/1.1+ (via fetch)', 'TCP / WS'],
              ['Payload format', 'JSON / XML', 'JSON', 'Protobuf (binary)', 'JSON', 'Any (JSON common)'],
              ['Schema / Contract', 'OpenAPI (optional)', 'SDL (required)', 'Protobuf IDL (required)', 'TypeScript types', 'Custom (no standard)'],
              ['Type safety', 'Manual / codegen', 'Codegen (graphql-codegen)', 'Generated stubs', 'Native TypeScript E2E', 'None by default'],
              ['Over/under-fetching', 'Yes (fixed shapes)', 'None (client selects fields)', 'Fixed (but efficient)', 'None (server procedures)', 'N/A (streaming)'],
              ['Caching', 'Excellent (HTTP native)', 'Complex (POST-based)', 'No HTTP caching', 'Limited', 'Not applicable'],
              ['Browser support', 'All browsers', 'All browsers', 'grpc-web only', 'All browsers', 'All modern browsers'],
              ['Performance', 'Good', 'Good', 'Excellent', 'Good', 'Excellent (low latency)'],
              ['Streaming', 'SSE / polling', 'Subscriptions', 'Native bidirectional', 'via WebSocket adapter', 'Native bidirectional'],
              ['Learning curve', 'Low', 'Medium', 'High', 'Low (TS devs)', 'Medium'],
              ['Best for', 'Public APIs, simple CRUD', 'Complex data, mobile, BFF', 'Microservices, internal RPC', 'Full-stack TypeScript', 'Real-time, chat, gaming'],
              ['Tools', 'curl, Postman, Swagger', 'Apollo Studio, GraphiQL', 'grpcurl, BloomRPC', 'tRPC Playground', 'wscat, Postman'],
            ].map(([dim, ...vals], i) => (
              <tr
                key={dim}
                style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}
              >
                <td style={{ padding: '10px 16px', fontWeight: 600, color: '#334155', whiteSpace: 'nowrap', borderBottom: '1px solid #e2e8f0' }}>{dim}</td>
                {vals.map((v, j) => (
                  <td key={j} style={{ padding: '10px 16px', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Decision Framework</h3>
      <pre><code className="language-text">{`Choose REST when:
  - Building a public API that any client must consume
  - HTTP caching is important (CDN, public resources)
  - Your team already knows REST conventions
  - Simple CRUD resources with predictable data shapes

Choose GraphQL when:
  - Frontend teams need to iterate quickly on data requirements
  - You have a mobile app where bandwidth is constrained
  - You need to aggregate data from multiple microservices (BFF pattern)
  - Data has complex, nested relationships

Choose gRPC when:
  - Internal microservice-to-microservice communication
  - Performance is critical (financial systems, ML inference)
  - You need bidirectional streaming
  - You can enforce protobuf tooling across all services

Choose tRPC when:
  - Full-stack TypeScript monorepo (Next.js, Remix)
  - End-to-end type safety without codegen complexity
  - Small to medium applications with a single backend

Choose WebSockets when:
  - Real-time features: chat, live dashboards, collaborative editing
  - Bidirectional low-latency communication
  - Push notifications without polling overhead
  - Gaming or financial tick data`}</code></pre>

      {/* ─── SECTION 10: Additional Best Practices ─── */}
      <h2>10. Additional API Design Best Practices</h2>

      <h3>Request Validation</h3>
      <pre><code className="language-javascript">{`// Zod schema validation (TypeScript-first)
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  role: z.enum(['editor', 'viewer']).default('viewer'),
  age: z.number().int().min(13).max(120).optional(),
});

// Express middleware
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400)
        .set('Content-Type', 'application/problem+json')
        .json({
          type: 'https://api.example.com/errors/validation-failed',
          title: 'Validation Failed',
          status: 400,
          detail: 'Request body contains invalid fields.',
          errors: result.error.issues.map(i => ({
            field: i.path.join('.'),
            code: i.code,
            message: i.message,
          })),
        });
    }
    req.body = result.data; // use validated + coerced data
    next();
  };
}

app.post('/api/v2/users', validate(CreateUserSchema), async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201)
     .set('Location', '/api/v2/users/' + user.id)
     .json(user);
});`}</code></pre>

      <h3>Idempotency Keys</h3>
      <pre><code className="language-javascript">{`// Idempotency keys prevent duplicate operations on retries
// Client generates a UUID and includes it in the header
// Server stores the result keyed by idempotency key

// Client
const idempotencyKey = crypto.randomUUID();
await fetch('/api/v2/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify({ productId: 'prod_123', quantity: 2 }),
});

// Server middleware
async function idempotencyMiddleware(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key || req.method !== 'POST') return next();

  const cacheKey = 'idem:' + req.user.id + ':' + key;
  const cached = await redis.get(cacheKey);

  if (cached) {
    const { status, body } = JSON.parse(cached);
    return res.status(status).json(body);
  }

  // Capture response to cache
  const originalJson = res.json.bind(res);
  res.json = async function(body) {
    if (res.statusCode < 500) {
      await redis.setex(cacheKey, 86400, JSON.stringify({
        status: res.statusCode,
        body,
      }));
    }
    return originalJson(body);
  };

  next();
}`}</code></pre>

      <h3>API Security Checklist</h3>
      <pre><code className="language-text">{`# Security Checklist for Production APIs

Authentication & Authorization
  [x] Every endpoint requires authentication (or explicitly marks public routes)
  [x] Authorization checks happen server-side (never trust client-supplied roles)
  [x] Scope-based access control (read:users vs write:users vs admin)
  [x] Principle of least privilege applied to all service accounts

Input Validation & Injection
  [x] All input validated and sanitized before processing
  [x] SQL queries use parameterized statements / ORM
  [x] JSON schema validation on all request bodies
  [x] File upload validation (MIME type, size, virus scanning)

Transport Security
  [x] HTTPS enforced everywhere (HSTS header with preload)
  [x] TLS 1.2+ only (disable TLS 1.0/1.1)
  [x] CORS configured explicitly (no wildcard * in production)
  [x] Sensitive data never in URL query parameters or logs

Headers
  [x] X-Content-Type-Options: nosniff
  [x] X-Frame-Options: DENY
  [x] Content-Security-Policy configured
  [x] Server header removed (do not leak tech stack)
  [x] Referrer-Policy: strict-origin-when-cross-origin

Rate Limiting & Abuse Prevention
  [x] Rate limiting on all public endpoints
  [x] Stricter limits on auth and write endpoints
  [x] Captcha / bot detection on sensitive flows
  [x] Idempotency keys on non-idempotent operations

Monitoring
  [x] Structured logging with correlation IDs
  [x] Alert on unusual auth failure spikes
  [x] Track API version usage to manage deprecation
  [x] Distributed tracing across microservices`}</code></pre>

      {/* ─── FAQ Section ─── */}
      <h2>Frequently Asked Questions</h2>

      <h3>What counts as a breaking change in a REST API?</h3>
      <p>
        Breaking changes are modifications that cause existing clients to fail without code changes on their
        side. These include: removing or renaming a field or endpoint, changing a field&apos;s data type (e.g.,
        string to integer), making an optional parameter required, changing HTTP method semantics, altering
        authentication requirements, and changing error response structures. Non-breaking changes include:
        adding new optional fields, adding new endpoints, adding new optional query parameters, and adding new
        enum values (though clients must handle unknown enums gracefully).
      </p>

      <h3>Which API versioning strategy is best?</h3>
      <p>
        URL path versioning (<code>/api/v1/users</code>) is the most widely adopted because it is explicit,
        easy to test in a browser, and cacheable by CDNs without custom Vary headers. Header versioning keeps
        URLs clean but requires clients to set headers and CDNs to vary caches accordingly. Query parameter
        versioning (<code>?version=2</code>) is generally discouraged for production APIs. The most important
        factor is consistency — pick one approach and apply it uniformly across your entire API surface.
      </p>

      <h3>What is an API gateway and do I need one?</h3>
      <p>
        An API gateway is a reverse proxy that centralizes cross-cutting concerns: authentication, rate
        limiting, request routing, SSL termination, logging, and response transformation. You likely need one
        when you have multiple microservices behind a single external API surface, need centralized rate
        limiting or auth that individual services should not implement themselves, or want to support multiple
        client types (web, mobile, third-party) with different requirements. Popular options include Kong, AWS
        API Gateway, Azure API Management, and cloud-native options like Nginx and Traefik.
      </p>

      <h3>How should I handle backward compatibility?</h3>
      <p>
        Follow the &ldquo;expand and contract&rdquo; pattern: first add new fields alongside old ones while
        marking the old ones deprecated (expand), then remove the old fields after clients have migrated
        (contract). Use the <code>Sunset</code> HTTP header to announce deprecation timelines. Never remove a
        field without a minimum 6-month notice period. Design new fields as optional with sensible defaults.
        Use semantic versioning to signal breaking vs non-breaking changes, and maintain a public changelog.
      </p>

      <h3>What is the best pagination strategy for large datasets?</h3>
      <p>
        Cursor-based (keyset) pagination is best for large datasets: it performs at O(log n) regardless of
        depth by avoiding database scans, remains stable when records are inserted or deleted between requests,
        and does not suffer from the &ldquo;duplicate or skipped record&rdquo; problem of offset pagination.
        Use an opaque cursor (base64-encoded composite key of the last-seen sort column and ID). Reserve offset
        pagination for small datasets (under 1,000 rows) or admin interfaces where users need to jump to
        arbitrary pages.
      </p>

      <h3>When should I use gRPC instead of REST?</h3>
      <p>
        gRPC excels in internal microservice communication where performance is critical. Its advantages:
        Protocol Buffers serialize 3&ndash;10x smaller than JSON, HTTP/2 enables multiplexing and header
        compression, and bidirectional streaming is natively supported. Its limitations: gRPC requires HTTP/2
        (not available in all proxy configurations), browser support requires grpc-web (a translation layer),
        and protobuf tooling adds complexity. Use REST or GraphQL for any API that browser clients consume
        directly.
      </p>

      <h3>How do I document an API effectively?</h3>
      <p>
        Write an OpenAPI 3.1 specification as the single source of truth and commit it to version control
        alongside your code. Generate interactive documentation with Swagger UI or Redoc. Every endpoint should
        document: a clear purpose description, all parameters with types and validation rules, request body
        schema with examples, all possible response codes and their shapes, and authentication requirements.
        Supplement the reference docs with a getting-started guide, an authentication walkthrough, and
        runnable curl examples. Use contract testing (Dredd, Schemathesis) to keep docs and implementation in
        sync.
      </p>

      <h3>How do I prevent API abuse beyond rate limiting?</h3>
      <p>
        Rate limiting is the first line of defense, but a comprehensive abuse prevention strategy includes:
        CAPTCHA / bot detection on sensitive flows (registration, password reset), IP allowlisting for
        high-privilege internal APIs, request signing (HMAC) for webhooks to verify the sender, idempotency
        keys on non-idempotent POST operations to prevent duplicate charges or actions, anomaly detection
        alerts on unusual patterns (sudden spike from a single IP, repeated 4xx errors), and short-lived API
        keys with automatic rotation. For financial APIs, add additional layers: device fingerprinting,
        velocity checks, and fraud scoring.
      </p>

      {/* ─── Conclusion ─── */}
      <h2>Conclusion</h2>
      <p>
        Great API design is a multiplier. A well-designed API lets your consumers move fast, your team evolve
        confidently, and your infrastructure scale efficiently. The principles covered in this guide — resource
        naming, HTTP semantics, versioning discipline, OpenAPI documentation, OAuth 2.0 authentication, RFC
        7807 errors, cursor pagination, and HTTP caching — are not arbitrary conventions. They exist because
        thousands of teams have learned these lessons the hard way.
      </p>
      <p>
        Start with a solid OpenAPI spec before writing a single line of implementation code. Let it drive your
        code generation, mock servers, and contract tests. Version from day one. Implement rate limiting before
        you need it. Use cursor pagination for any collection that might grow. Return informative, structured
        errors. And choose between REST, GraphQL, gRPC, tRPC, and WebSockets based on what your clients
        actually need — not what is trending.
      </p>
      <p>
        An API is a long-term commitment to its consumers. Design it with the same care you would give to any
        public-facing product.
      </p>
    </>
  );
}
