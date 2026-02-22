'use client';

import Link from 'next/link';

export default function RestApiDesignGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why REST API Design Matters</h2>
      <p>
        A well-designed REST API is intuitive, consistent, and easy to integrate. Poor API design
        leads to confused developers, increased support costs, breaking changes, and ultimately slower
        adoption. Whether you are building a public API, a microservices backend, or an internal
        service, following established design conventions saves time and reduces friction. This guide
        covers the essential best practices for designing REST APIs in 2026 with practical examples
        you can apply immediately. For related content, see our{' '}
        <Link href={`/${lang}/blog/rest-api-best-practices-guide`}>REST API Best Practices</Link> guide.
      </p>

      <h2>Resource Naming Conventions</h2>
      <p>
        Resources are the fundamental concept in REST. They represent the entities in your system.
        Resource URIs should be nouns (not verbs), use plural forms, and follow a consistent naming
        scheme. Use the <Link href={`/${lang}/tools/slug-generator`}>Slug Generator</Link> to create
        clean URL segments.
      </p>
      <pre><code className="language-text">{`# Good: Noun-based, plural, hierarchical
GET    /api/v1/users
GET    /api/v1/users/123
GET    /api/v1/users/123/orders
GET    /api/v1/users/123/orders/456
POST   /api/v1/users
PUT    /api/v1/users/123
PATCH  /api/v1/users/123
DELETE /api/v1/users/123

# Bad: Verb-based, inconsistent
GET    /api/v1/getUsers
POST   /api/v1/createUser
GET    /api/v1/user/123/getOrders
POST   /api/v1/deleteUser/123

# Resource naming rules:
# 1. Use plural nouns:          /users not /user
# 2. Use kebab-case:            /order-items not /orderItems
# 3. Use lowercase:             /users not /Users
# 4. Nest for relationships:    /users/123/posts
# 5. Max 3 levels of nesting:   /users/123/posts/456`}</code></pre>

      <h2>HTTP Methods and Their Semantics</h2>
      <p>
        Each HTTP method has specific semantics. Using them correctly makes your API predictable and
        self-documenting. Check our{' '}
        <Link href={`/${lang}/tools/http-status`}>HTTP Status Codes reference</Link> for response
        codes to pair with each method.
      </p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Action</th>
            <th>Idempotent</th>
            <th>Request Body</th>
            <th>Success Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>GET</strong></td>
            <td>Read resource(s)</td>
            <td>Yes</td>
            <td>No</td>
            <td>200 OK</td>
          </tr>
          <tr>
            <td><strong>POST</strong></td>
            <td>Create resource</td>
            <td>No</td>
            <td>Yes</td>
            <td>201 Created</td>
          </tr>
          <tr>
            <td><strong>PUT</strong></td>
            <td>Full replace</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>200 OK</td>
          </tr>
          <tr>
            <td><strong>PATCH</strong></td>
            <td>Partial update</td>
            <td>No*</td>
            <td>Yes</td>
            <td>200 OK</td>
          </tr>
          <tr>
            <td><strong>DELETE</strong></td>
            <td>Remove resource</td>
            <td>Yes</td>
            <td>No</td>
            <td>204 No Content</td>
          </tr>
          <tr>
            <td><strong>HEAD</strong></td>
            <td>Get headers only</td>
            <td>Yes</td>
            <td>No</td>
            <td>200 OK</td>
          </tr>
          <tr>
            <td><strong>OPTIONS</strong></td>
            <td>List allowed methods</td>
            <td>Yes</td>
            <td>No</td>
            <td>204 No Content</td>
          </tr>
        </tbody>
      </table>

      <h2>Request and Response Design</h2>
      <h3>Request Body Structure</h3>
      <pre><code className="language-json">{`// POST /api/v1/users — Create a new user
// Request:
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "admin",
  "preferences": {
    "language": "en",
    "timezone": "America/New_York",
    "notifications": {
      "email": true,
      "sms": false
    }
  }
}

// Response (201 Created):
{
  "data": {
    "id": "usr_abc123",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin",
    "preferences": {
      "language": "en",
      "timezone": "America/New_York",
      "notifications": {
        "email": true,
        "sms": false
      }
    },
    "createdAt": "2026-02-22T10:30:00Z",
    "updatedAt": "2026-02-22T10:30:00Z"
  }
}`}</code></pre>

      <h3>Consistent Response Envelope</h3>
      <pre><code className="language-typescript">{`// Standard response format for all endpoints
interface ApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  links?: {
    self: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
      code: string;
    }>;
    requestId: string;
    documentation?: string;
  };
}

// GET /api/v1/users?page=2&per_page=20
// Response (200 OK):
{
  "data": [
    { "id": "usr_abc123", "name": "Alice", "email": "alice@example.com" },
    { "id": "usr_def456", "name": "Bob", "email": "bob@example.com" }
  ],
  "meta": {
    "page": 2,
    "perPage": 20,
    "total": 145,
    "totalPages": 8
  },
  "links": {
    "self": "/api/v1/users?page=2&per_page=20",
    "first": "/api/v1/users?page=1&per_page=20",
    "prev": "/api/v1/users?page=1&per_page=20",
    "next": "/api/v1/users?page=3&per_page=20",
    "last": "/api/v1/users?page=8&per_page=20"
  }
}`}</code></pre>

      <h2>Error Handling</h2>
      <p>
        Consistent error responses are critical for developer experience. Always include an error
        code, human-readable message, and enough detail for the client to fix the problem.
      </p>
      <pre><code className="language-json">{`// 400 Bad Request — Validation error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address",
        "code": "INVALID_FORMAT"
      },
      {
        "field": "age",
        "message": "Must be between 18 and 120",
        "code": "OUT_OF_RANGE"
      }
    ],
    "requestId": "req_xyz789"
  }
}

// 401 Unauthorized
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired authentication token",
    "documentation": "https://api.example.com/docs/authentication",
    "requestId": "req_xyz790"
  }
}

// 404 Not Found
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "User with ID 'usr_invalid' not found",
    "requestId": "req_xyz791"
  }
}

// 429 Too Many Requests
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Try again in 30 seconds.",
    "requestId": "req_xyz792"
  }
}

// 500 Internal Server Error
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "req_xyz793"
  }
}`}</code></pre>

      <h2>Pagination</h2>
      <p>
        Always paginate list endpoints. Support multiple pagination strategies based on your use case.
      </p>
      <pre><code className="language-text">{`# Offset-based pagination (simple, good for small datasets)
GET /api/v1/users?page=3&per_page=20

# Cursor-based pagination (better for large/real-time datasets)
GET /api/v1/users?after=usr_abc123&limit=20

# Keyset pagination (efficient for sorted data)
GET /api/v1/users?created_after=2026-01-01&limit=20`}</code></pre>

      <pre><code className="language-typescript">{`// Express.js pagination implementation
app.get('/api/v1/users', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const perPage = Math.min(100, Math.max(1,
    parseInt(req.query.per_page as string) || 20
  ));
  const offset = (page - 1) * perPage;

  const [users, total] = await Promise.all([
    db.users.findMany({ skip: offset, take: perPage }),
    db.users.count(),
  ]);

  const totalPages = Math.ceil(total / perPage);
  const baseUrl = '/api/v1/users';

  res.json({
    data: users,
    meta: { page, perPage, total, totalPages },
    links: {
      self: \`\${baseUrl}?page=\${page}&per_page=\${perPage}\`,
      first: \`\${baseUrl}?page=1&per_page=\${perPage}\`,
      ...(page > 1 && {
        prev: \`\${baseUrl}?page=\${page - 1}&per_page=\${perPage}\`
      }),
      ...(page < totalPages && {
        next: \`\${baseUrl}?page=\${page + 1}&per_page=\${perPage}\`
      }),
      last: \`\${baseUrl}?page=\${totalPages}&per_page=\${perPage}\`,
    },
  });
});`}</code></pre>

      <h2>Filtering, Sorting, and Field Selection</h2>
      <pre><code className="language-text">{`# Filtering — use query parameters
GET /api/v1/users?role=admin&status=active
GET /api/v1/orders?created_after=2026-01-01&total_gte=100
GET /api/v1/products?category=electronics&price_lte=500

# Sorting — use sort parameter with +/- prefix
GET /api/v1/users?sort=-created_at          # Descending
GET /api/v1/users?sort=name                  # Ascending
GET /api/v1/users?sort=-created_at,+name     # Multiple

# Field selection — reduce response payload
GET /api/v1/users?fields=id,name,email
GET /api/v1/users/123?fields=name,avatar,posts.title

# Search — full-text search parameter
GET /api/v1/users?q=alice+johnson
GET /api/v1/products?search=wireless+keyboard`}</code></pre>

      <h2>Versioning</h2>
      <p>
        API versioning protects existing clients from breaking changes. There are three common
        approaches.
      </p>
      <pre><code className="language-text">{`# 1. URL path versioning (most common, recommended)
GET /api/v1/users
GET /api/v2/users

# 2. Header versioning
GET /api/users
Accept: application/vnd.myapi.v2+json

# 3. Query parameter versioning
GET /api/users?version=2`}</code></pre>

      <pre><code className="language-typescript">{`// Express.js versioned routes
import express from 'express';
import v1Router from './routes/v1';
import v2Router from './routes/v2';

const app = express();

// Mount versioned routes
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// v1/routes.ts
const router = express.Router();
router.get('/users', getUsersV1);
router.get('/users/:id', getUserV1);

// v2/routes.ts — same endpoints, new response format
const router = express.Router();
router.get('/users', getUsersV2);
router.get('/users/:id', getUserV2);`}</code></pre>

      <h2>Authentication and Authorization</h2>
      <p>
        Use standard authentication mechanisms. JWT Bearer tokens are the most common choice for
        stateless APIs. For detailed coverage, see our{' '}
        <Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication
        Guide</Link> and <Link href={`/${lang}/blog/jwt-authentication-guide`}>JWT Authentication
        Guide</Link>.
      </p>
      <pre><code className="language-typescript">{`// Authentication middleware
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string; role: string; email: string };
}

function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        code: 'MISSING_TOKEN',
        message: 'Authorization header with Bearer token required',
      },
    });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = { id: decoded.sub, role: decoded.role, email: decoded.email };
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token is invalid or expired',
      },
    });
  }
}

// Role-based authorization
function authorize(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions for this action',
        },
      });
    }
    next();
  };
}

// Apply to routes
app.get('/api/v1/users', authenticate, authorize('admin'), getUsers);
app.get('/api/v1/profile', authenticate, getProfile);`}</code></pre>

      <h2>Rate Limiting</h2>
      <pre><code className="language-typescript">{`// Rate limiting with standard headers
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  standardHeaders: true,     // RateLimit-* headers
  legacyHeaders: false,
  message: {
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests. Please try again later.',
    },
  },
});

app.use('/api/', apiLimiter);

// Response headers:
// RateLimit-Limit: 100
// RateLimit-Remaining: 87
// RateLimit-Reset: 1708646400`}</code></pre>

      <h2>HATEOAS: Hypermedia Links</h2>
      <p>
        HATEOAS (Hypermedia As The Engine Of Application State) makes your API self-discoverable by
        including links to related resources and available actions in responses.
      </p>
      <pre><code className="language-json">{`// GET /api/v1/orders/ord_123
{
  "data": {
    "id": "ord_123",
    "status": "pending",
    "total": 99.99,
    "items": [
      { "productId": "prod_456", "quantity": 2, "price": 49.99 }
    ]
  },
  "links": {
    "self": "/api/v1/orders/ord_123",
    "customer": "/api/v1/users/usr_789",
    "items": "/api/v1/orders/ord_123/items",
    "cancel": "/api/v1/orders/ord_123/cancel",
    "pay": "/api/v1/orders/ord_123/pay"
  },
  "actions": {
    "cancel": {
      "method": "POST",
      "href": "/api/v1/orders/ord_123/cancel"
    },
    "pay": {
      "method": "POST",
      "href": "/api/v1/orders/ord_123/pay",
      "fields": [
        { "name": "paymentMethod", "type": "string", "required": true }
      ]
    }
  }
}`}</code></pre>

      <h2>Caching</h2>
      <pre><code className="language-typescript">{`// Implement HTTP caching headers
app.get('/api/v1/products/:id', async (req, res) => {
  const product = await db.products.findById(req.params.id);

  // ETag for conditional requests
  const etag = generateETag(product);
  res.set('ETag', etag);

  // If client has current version, return 304
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end();
  }

  // Cache-Control for CDN and browser caching
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

  // Last-Modified for time-based caching
  res.set('Last-Modified', product.updatedAt.toUTCString());

  res.json({ data: product });
});

// Vary header for content negotiation
app.get('/api/v1/articles', (req, res) => {
  res.set('Vary', 'Accept-Language, Accept');
  // ...
});`}</code></pre>

      <h2>OpenAPI Documentation</h2>
      <pre><code className="language-yaml">{`# openapi.yaml — Document your API
openapi: 3.1.0
info:
  title: My REST API
  version: 1.0.0
  description: Production API for managing users and orders

servers:
  - url: https://api.example.com/v1

paths:
  /users:
    get:
      summary: List all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: per_page
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: Paginated user list
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserListResponse'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    User:
      type: object
      required: [id, name, email]
      properties:
        id:
          type: string
          example: usr_abc123
        name:
          type: string
          example: Alice Johnson
        email:
          type: string
          format: email`}</code></pre>

      <h2>REST API Design Checklist</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Practice</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>URLs</td><td>Use plural nouns for resources</td><td>Required</td></tr>
          <tr><td>URLs</td><td>Use kebab-case, lowercase</td><td>Required</td></tr>
          <tr><td>Methods</td><td>Use correct HTTP methods</td><td>Required</td></tr>
          <tr><td>Status Codes</td><td>Return appropriate status codes</td><td>Required</td></tr>
          <tr><td>Responses</td><td>Consistent response envelope</td><td>Required</td></tr>
          <tr><td>Errors</td><td>Structured error responses</td><td>Required</td></tr>
          <tr><td>Pagination</td><td>Paginate all list endpoints</td><td>Required</td></tr>
          <tr><td>Versioning</td><td>Version your API from day one</td><td>Required</td></tr>
          <tr><td>Auth</td><td>JWT or OAuth2 authentication</td><td>Required</td></tr>
          <tr><td>Rate Limiting</td><td>Protect against abuse</td><td>Required</td></tr>
          <tr><td>Caching</td><td>ETag and Cache-Control headers</td><td>Recommended</td></tr>
          <tr><td>HATEOAS</td><td>Include hypermedia links</td><td>Recommended</td></tr>
          <tr><td>Filtering</td><td>Query parameter filtering</td><td>Recommended</td></tr>
          <tr><td>Docs</td><td>OpenAPI specification</td><td>Required</td></tr>
          <tr><td>CORS</td><td>Configure CORS headers</td><td>Required</td></tr>
        </tbody>
      </table>

      <p>
        Designing a great REST API is about consistency, predictability, and developer experience.
        Follow these conventions from the start, document everything with OpenAPI, and your API
        consumers will thank you. For more API resources, explore our{' '}
        <Link href={`/${lang}/blog/how-to-fix-cors-errors-complete-guide`}>CORS Errors Guide</Link>,{' '}
        <Link href={`/${lang}/blog/http-status-codes-guide`}>HTTP Status Codes Guide</Link>, and{' '}
        <Link href={`/${lang}/tools/json-formatter`}>JSON Formatter</Link> for testing API responses.
      </p>
    </>
  );
}
