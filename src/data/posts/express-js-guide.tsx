'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Express.js and why is it so popular?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Express.js is a minimal, unopinionated web framework for Node.js that provides routing, middleware support, and HTTP utilities without imposing a rigid structure. It is popular because it is lightweight (only ~500 lines of core code), extremely flexible, has a massive ecosystem of compatible middleware packages, and has been battle-tested in production since 2010. Over 30 million npm projects depend on Express.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Express.js still relevant in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Express.js remains the most downloaded Node.js framework with over 30 million weekly npm downloads in 2026. While newer frameworks like Fastify and Hono offer better performance, Express wins on ecosystem size, community knowledge, middleware compatibility, and ease of onboarding. For most CRUD APIs and web apps, Express performance is more than sufficient. It is the safe, pragmatic choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle async errors in Express.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Express 4, async errors thrown inside route handlers are NOT automatically caught. You must either wrap handlers in a try/catch and call next(err), or use the express-async-errors package which monkey-patches Express to handle rejected promises automatically. Express 5 (release candidate as of 2026) natively supports async/await error propagation without wrappers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between app.use() and app.get()?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'app.use() registers middleware that matches ALL HTTP methods and optionally a path prefix — it runs for every request matching the prefix. app.get() registers a route handler for GET requests at an exact path. Middleware registered with app.use() must call next() to pass control to the next handler, while route handlers typically end the request/response cycle with res.json() or res.send().',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I structure a large Express.js application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the MVC pattern: separate routes (routing layer), controllers (request handling), services (business logic), and models (data access). Create an Express Router for each resource and mount them on the main app. Keep middleware in a separate folder. Use environment variables for configuration. A common structure is: src/routes/, src/controllers/, src/services/, src/models/, src/middleware/, src/config/.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Express.js compare to Fastify in terms of performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fastify is typically 2-3x faster than Express in raw benchmarks, handling ~76,000 requests/second versus Express\'s ~28,000 req/s on the same hardware. Fastify achieves this through JSON schema validation, faster JSON serialization, and a more efficient routing algorithm. However, for most applications the bottleneck is the database, not the framework. Choose Express for ecosystem and ease of use, Fastify when throughput is a measured constraint.',
      },
    },
    {
      '@type': 'Question',
      name: 'What middleware is essential for a production Express.js app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Essential production middleware includes: helmet (HTTP security headers), cors (cross-origin resource sharing), compression (gzip response compression), express-rate-limit (rate limiting), morgan or pino-http (request logging), express.json() and express.urlencoded() (body parsing), and a centralized error handling middleware as the last app.use() call. For authentication, use passport.js or custom JWT middleware.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Express.js or NestJS for a new project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use Express.js for smaller APIs, microservices, or teams that prefer flexibility and minimal boilerplate. Use NestJS for large enterprise applications where opinionated architecture, dependency injection, TypeScript-first design, and built-in support for testing, OpenAPI, GraphQL, and WebSockets provide long-term maintainability benefits. NestJS actually uses Express (or Fastify) under the hood, so you get Express compatibility with added structure.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'Express.js Complete Guide: Build REST APIs with Node.js in 2026',
    description:
      'Master Express.js from scratch with this comprehensive tutorial. Learn routing, middleware, REST API design, JWT authentication, error handling, and how Express compares to Fastify, Koa, and Hapi in 2026.',
    tldr: 'Express.js is a minimal Node.js web framework for building REST APIs and web apps. Install with npm install express, define routes with app.get/post/put/delete, use middleware with app.use(), handle errors with a 4-argument middleware, and secure APIs with JWT + bcrypt. Express remains the most popular Node.js framework in 2026 with 30M+ weekly downloads.',
  },
  zh: {
    title: 'Express.js 完整指南：2026 年用 Node.js 构建 REST API',
    description:
      '从零开始掌握 Express.js。本教程涵盖路由、中间件、REST API 设计、JWT 认证、错误处理，以及 Express 与 Fastify、Koa、Hapi 的对比。',
    tldr: 'Express.js 是用于构建 REST API 和 Web 应用的最小化 Node.js Web 框架。通过 npm install express 安装，用 app.get/post/put/delete 定义路由，用 app.use() 使用中间件，用四参数中间件处理错误，并使用 JWT + bcrypt 保护 API。Express 在 2026 年仍是最流行的 Node.js 框架，每周下载量超过 3000 万次。',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '0 8px 8px 0',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Express.js Quick Reference
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.en.tldr}
        </p>
      </div>

      <h2>What Is Express.js?</h2>
      <p>
        <strong>Express.js</strong> is a fast, unopinionated, minimalist web framework for <strong>Node.js</strong>.
        Released in 2010 by TJ Holowaychuk and now maintained by the OpenJS Foundation, Express has become the
        de-facto standard for building HTTP servers and REST APIs in the Node.js ecosystem.
      </p>
      <p>
        The framework's philosophy is minimal by design: it provides only the essential tools — routing, middleware
        support, and HTTP request/response utilities — without imposing any particular project structure, template
        engine, or database layer. This flexibility is both Express's greatest strength and the reason it remains
        relevant in 2026 despite competition from newer frameworks.
      </p>
      <p>
        As of 2026, Express receives over <strong>30 million weekly downloads</strong> from npm, making it
        consistently one of the top 5 most downloaded packages in the entire JavaScript ecosystem. Over 30 million
        open-source projects list it as a dependency.
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Express.js is a thin layer on top of Node.js's <code>http</code> module with routing and middleware.</li>
          <li>Middleware functions are the building blocks — they process requests sequentially via <code>next()</code>.</li>
          <li>Use <code>express.Router()</code> to modularize routes and keep code organized.</li>
          <li>Always add a centralized error-handling middleware (4 arguments) as the last <code>app.use()</code> call.</li>
          <li>Secure production apps with helmet, cors, express-rate-limit, and JWT-based authentication.</li>
          <li>Fastify is 2–3x faster than Express but Express wins on ecosystem size and community knowledge.</li>
          <li>Express 5 (release candidate in 2026) adds native async/await error propagation.</li>
        </ul>
      </div>

      <h2>Getting Started: Installation and First Server</h2>
      <p>
        Express.js requires Node.js v18 or higher (LTS recommended). Install it with npm or your preferred package
        manager, then create your first HTTP server in under 10 lines.
      </p>
      <pre><code className="language-bash">{`# Initialize a new Node.js project
mkdir my-api && cd my-api
npm init -y

# Install Express
npm install express

# Install TypeScript types (optional but recommended)
npm install --save-dev @types/express typescript ts-node

# Create the entry file
touch index.js`}</code></pre>

      <p>The simplest possible Express server responds "Hello World" to all GET requests on port 3000:</p>
      <pre><code className="language-javascript">{`// index.js — Minimal Express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Express!' });
});

// Start the server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});`}</code></pre>

      <pre><code className="language-bash">{`# Run it
node index.js
# Server running on http://localhost:3000

# Test with curl
curl http://localhost:3000
# {"message":"Hello World from Express!"}`}</code></pre>

      <h3>Using TypeScript with Express</h3>
      <p>
        TypeScript provides type safety and better IDE support. Here is the same server with full TypeScript:
      </p>
      <pre><code className="language-typescript">{`// src/index.ts — Express with TypeScript
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express + TypeScript!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});

export default app;`}</code></pre>

      <h2>Routing: GET, POST, PUT, DELETE</h2>
      <p>
        Express routing maps HTTP methods and URL paths to handler functions. Every handler receives a <code>Request</code>{' '}
        object, a <code>Response</code> object, and an optional <code>next</code> function.
      </p>

      <h3>Basic Route Methods</h3>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();
app.use(express.json());

// GET — retrieve resources
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// POST — create a resource
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  // Create user in database...
  res.status(201).json({ id: 1, name, email });
});

// PUT — replace a resource entirely
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  // Update user in database...
  res.json({ id, name, email });
});

// PATCH — partial update
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  // Apply partial update...
  res.json({ id, ...req.body });
});

// DELETE — remove a resource
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  // Delete user from database...
  res.status(204).send(); // No content
});`}</code></pre>

      <h3>Route Parameters and Query Strings</h3>
      <pre><code className="language-javascript">{`// Route parameters — accessed via req.params
// URL: /users/42/posts/7
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
  // { userId: '42', postId: '7' }
});

// Query strings — accessed via req.query
// URL: /search?q=express&page=2&limit=10
app.get('/search', (req, res) => {
  const { q, page = '1', limit = '20' } = req.query;
  res.json({
    query: q,
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
  });
});

// Optional parameters with regex
app.get('/files/:filename(*)' , (req, res) => {
  res.json({ file: req.params.filename });
});`}</code></pre>

      <h3>Express Router — Modular Routes</h3>
      <p>
        For larger applications, use <code>express.Router()</code> to split routes into separate files. Each router
        is a mini Express application that handles its own middleware and routes.
      </p>
      <pre><code className="language-javascript">{`// src/routes/users.js
const express = require('express');
const router = express.Router();

// All routes here are relative to the mount path
router.get('/', (req, res) => {
  res.json({ users: [] }); // GET /api/users
});

router.post('/', (req, res) => {
  res.status(201).json({ created: true }); // POST /api/users
});

router.get('/:id', (req, res) => {
  res.json({ userId: req.params.id }); // GET /api/users/42
});

router.put('/:id', (req, res) => {
  res.json({ updated: req.params.id }); // PUT /api/users/42
});

router.delete('/:id', (req, res) => {
  res.status(204).send(); // DELETE /api/users/42
});

module.exports = router;

// src/app.js — mount the router
const express = require('express');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

module.exports = app;`}</code></pre>

      <h2>Middleware: The Core of Express</h2>
      <p>
        Middleware functions are functions that have access to the request object (<code>req</code>), the response object
        (<code>res</code>), and the next middleware function (<code>next</code>). They form a pipeline: each middleware
        either responds to the request or calls <code>next()</code> to pass control forward.
      </p>
      <p>
        This pipeline is what makes Express powerful — you can compose complex request processing from small,
        reusable pieces.
      </p>

      <h3>Built-in Middleware</h3>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();

// Parse JSON bodies (Content-Type: application/json)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies (HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Serve at a specific URL prefix:
app.use('/assets', express.static('public'));`}</code></pre>

      <h3>Third-Party Middleware</h3>
      <p>
        The npm ecosystem provides hundreds of middleware packages. These are the most essential for production:
      </p>
      <pre><code className="language-bash">{`npm install helmet cors morgan compression express-rate-limit`}</code></pre>
      <pre><code className="language-javascript">{`const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();

// Security headers (Content-Security-Policy, X-Frame-Options, etc.)
app.use(helmet());

// CORS — Allow requests from specific origins
app.use(cors({
  origin: ['https://myapp.com', 'https://www.myapp.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// HTTP request logging
app.use(morgan('combined')); // Apache-style log format
// or use 'dev' for concise colored output in development

// Gzip response compression
app.use(compression());

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

app.use(express.json());`}</code></pre>

      <h3>Custom Middleware</h3>
      <p>
        Writing custom middleware is straightforward — it is just a function. Use it for authentication, logging,
        request transformation, or any cross-cutting concern.
      </p>
      <pre><code className="language-javascript">{`// Request timing middleware
function requestTimer(req, res, next) {
  req.startTime = Date.now();

  // Override res.json to inject timing data
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const duration = Date.now() - req.startTime;
    res.set('X-Response-Time', duration + 'ms');
    return originalJson(body);
  };

  next();
}

// Request ID middleware
const { v4: uuidv4 } = require('uuid');
function requestId(req, res, next) {
  req.id = uuidv4();
  res.set('X-Request-Id', req.id);
  next();
}

// API key validation middleware
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }
  next();
}

// Route-level middleware — only applies to this route
app.get('/protected', validateApiKey, (req, res) => {
  res.json({ data: 'secret data' });
});

// Apply globally
app.use(requestTimer);
app.use(requestId);`}</code></pre>

      <h2>Request and Response Objects</h2>
      <p>
        Express extends Node.js's built-in <code>IncomingMessage</code> and <code>ServerResponse</code> with
        additional properties and methods that make request handling much more ergonomic.
      </p>

      <h3>Request Object (req)</h3>
      <pre><code className="language-javascript">{`app.post('/api/example/:id', (req, res) => {
  // Route parameters (from URL pattern)
  req.params.id;         // '42'
  req.params;            // { id: '42' }

  // Query string (from ?key=value)
  req.query.page;        // '2'
  req.query.limit;       // '10'

  // Request body (requires express.json() middleware)
  req.body.name;         // 'John Doe'
  req.body;              // { name: 'John Doe', email: '...' }

  // Headers
  req.headers['authorization']; // 'Bearer eyJhb...'
  req.get('Content-Type');      // 'application/json'

  // Other useful properties
  req.method;     // 'POST'
  req.path;       // '/api/example/42'
  req.url;        // '/api/example/42?page=2'
  req.hostname;   // 'api.example.com'
  req.ip;         // '192.168.1.1'
  req.protocol;   // 'https'
  req.secure;     // true (if HTTPS)

  // Cookies (with cookie-parser middleware)
  req.cookies.sessionId;
  req.signedCookies.authToken;
});`}</code></pre>

      <h3>Response Object (res)</h3>
      <pre><code className="language-javascript">{`app.get('/api/example', (req, res) => {
  // Send JSON response
  res.json({ success: true, data: [] });

  // Send with specific status code
  res.status(201).json({ created: true });
  res.status(404).json({ error: 'Not found' });

  // Send plain text or HTML
  res.send('Hello World');
  res.send('<h1>Hello</h1>');

  // Set headers
  res.set('X-Custom-Header', 'value');
  res.set({ 'X-A': '1', 'X-B': '2' });

  // Redirect
  res.redirect('/new-url');
  res.redirect(301, 'https://new-domain.com/path');

  // Download a file
  res.download('/path/to/file.pdf', 'report.pdf');

  // Send a file
  res.sendFile('/path/to/index.html');

  // Set cookie
  res.cookie('token', jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  });

  // Clear cookie
  res.clearCookie('token');

  // End without a body (e.g., for DELETE)
  res.status(204).end();
});`}</code></pre>

      <h2>Building a REST API: Full CRUD Example</h2>
      <p>
        Let us build a complete RESTful API for a blog application with proper HTTP semantics, status codes,
        and input validation. This example uses in-memory storage for clarity; replace it with a database in production.
      </p>
      <pre><code className="language-javascript">{`// src/routes/posts.js — Full CRUD REST API
const express = require('express');
const router = express.Router();

// In-memory store (replace with MongoDB/PostgreSQL in production)
let posts = [
  { id: 1, title: 'Getting Started with Express', content: 'Express is...', author: 'Alice', createdAt: new Date() },
  { id: 2, title: 'Middleware Deep Dive', content: 'Middleware is...', author: 'Bob', createdAt: new Date() },
];
let nextId = 3;

// GET /api/posts — List all posts (with pagination)
router.get('/', (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  const offset = (page - 1) * limit;

  const paginated = posts.slice(offset, offset + limit);

  res.json({
    data: paginated,
    meta: {
      total: posts.length,
      page,
      limit,
      totalPages: Math.ceil(posts.length / limit),
    },
  });
});

// GET /api/posts/:id — Get single post
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id, 10));
  if (!post) {
    return res.status(404).json({ error: 'Post not found', id: req.params.id });
  }
  res.json({ data: post });
});

// POST /api/posts — Create a post
router.post('/', (req, res) => {
  const { title, content, author } = req.body;

  // Basic validation
  if (!title || !content || !author) {
    return res.status(400).json({
      error: 'Validation failed',
      details: {
        title: !title ? 'Title is required' : null,
        content: !content ? 'Content is required' : null,
        author: !author ? 'Author is required' : null,
      },
    });
  }

  const newPost = { id: nextId++, title, content, author, createdAt: new Date() };
  posts.push(newPost);

  res.status(201)
    .set('Location', '/api/posts/' + newPost.id)
    .json({ data: newPost });
});

// PUT /api/posts/:id — Replace entire post
router.put('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'All fields required for PUT' });
  }

  posts[index] = { ...posts[index], title, content, author };
  res.json({ data: posts[index] });
});

// PATCH /api/posts/:id — Partial update
router.patch('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const allowedFields = ['title', 'content', 'author'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  posts[index] = { ...posts[index], ...updates };
  res.json({ data: posts[index] });
});

// DELETE /api/posts/:id — Delete a post
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }

  posts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;`}</code></pre>

      <h2>Authentication with JWT and bcrypt</h2>
      <p>
        JSON Web Tokens (JWT) are the standard for stateless REST API authentication. Combined with bcrypt for
        password hashing, they provide a secure authentication layer without server-side session storage.
      </p>
      <pre><code className="language-bash">{`npm install jsonwebtoken bcrypt
npm install --save-dev @types/jsonwebtoken @types/bcrypt`}</code></pre>

      <h3>User Registration and Login</h3>
      <pre><code className="language-javascript">{`// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET; // Never hardcode!
const JWT_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Simulated user store (use database in production)
const users = [];

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password — NEVER store plain text passwords
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = {
      id: users.length + 1,
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    };
    users.push(user);

    // Don't return the hash
    res.status(201).json({ data: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      // Use same error message to prevent user enumeration
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Sign access token (short-lived)
    const accessToken = jwt.sign(
      { sub: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Sign refresh token (long-lived, store in DB for rotation)
    const refreshToken = jwt.sign(
      { sub: user.id, type: 'refresh' },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );

    // Store refresh token in httpOnly cookie (more secure than localStorage)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;`}</code></pre>

      <h3>JWT Authentication Middleware</h3>
      <pre><code className="language-javascript">{`// src/middleware/authenticate.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.slice(7); // Remove 'Bearer '

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach decoded payload to request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(err);
  }
}

// Optional authentication (does not require token but uses it if present)
function optionalAuthenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();

  try {
    const token = authHeader.slice(7);
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    // Ignore invalid token for optional auth
  }
  next();
}

// Role-based authorization
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

module.exports = { authenticate, optionalAuthenticate, authorize };

// Usage in routes:
// app.get('/protected', authenticate, (req, res) => { ... });
// app.delete('/admin/users/:id', authenticate, authorize('admin'), (req, res) => { ... });`}</code></pre>

      <h2>Error Handling</h2>
      <p>
        Proper error handling is critical for production Express apps. Express has a special convention for error
        handling: middleware with <strong>four arguments</strong> (<code>err, req, res, next</code>) is treated as
        an error handler and only invoked when <code>next(err)</code> is called.
      </p>

      <h3>Centralized Error Handler</h3>
      <pre><code className="language-javascript">{`// src/middleware/errorHandler.js

class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Distinguish from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized error handling middleware — MUST be registered LAST
function errorHandler(err, req, res, next) {
  // Log error (use a proper logger like pino in production)
  console.error({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    requestId: req.id,
    method: req.method,
    url: req.url,
  });

  // Handle known operational errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: Object.values(err.errors).map(e => e.message),
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Handle syntax errors in JSON body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }

  // Handle database duplicate key errors (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ error: 'Duplicate value for ' + field });
  }

  // Generic server error — don't leak internal details in production
  const isDev = process.env.NODE_ENV === 'development';
  res.status(500).json({
    error: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack }),
  });
}

// 404 handler — place before errorHandler but after all routes
function notFound(req, res, next) {
  next(new AppError('Route ' + req.method + ' ' + req.path + ' not found', 404, 'NOT_FOUND'));
}

module.exports = { AppError, errorHandler, notFound };`}</code></pre>

      <h3>Async Error Handling</h3>
      <p>
        In Express 4, unhandled promise rejections do not automatically reach the error handler. Use one of these
        three patterns:
      </p>
      <pre><code className="language-javascript">{`// Pattern 1: try/catch (verbose but explicit)
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ data: user });
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Pattern 2: asyncHandler wrapper (cleaner)
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ data: user });
}));

// Pattern 3: express-async-errors package (zero boilerplate)
// npm install express-async-errors
require('express-async-errors'); // Import once at the top of app.js

app.get('/users/:id', async (req, res) => {
  // Thrown errors and rejected promises automatically reach error handler
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json({ data: user });
});

// Express 5 (native async support — no wrapper needed)
// app.get('/users/:id', async (req, res) => { ... });  Works out of the box`}</code></pre>

      <h3>Registering Middleware in the Right Order</h3>
      <pre><code className="language-javascript">{`// src/app.js — Correct middleware order
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// 1. Security middleware (first)
app.use(helmet());
app.use(cors());

// 2. Logging
app.use(morgan('dev'));

// 3. Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// 5. 404 handler (after all routes)
app.use(notFound);

// 6. Error handler (MUST be last, 4 parameters)
app.use(errorHandler);

module.exports = app;`}</code></pre>

      <h2>Express vs Fastify vs Koa vs Hapi</h2>
      <p>
        Choosing the right Node.js framework depends on your performance requirements, team familiarity, and
        ecosystem needs. Here is a comprehensive comparison of the four most popular options in 2026:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>Feature</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>Express 4/5</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>Fastify 4</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>Koa 2</th>
              <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', whiteSpace: 'nowrap' }}>Hapi 21</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Req/sec (benchmark)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~28,000</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~76,000</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~50,000</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>~30,000</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>TypeScript support</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Via @types/express</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Built-in (excellent)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Via @types/koa</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Via @hapi/hapi types</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Ecosystem / Plugins</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Largest (30M+ projects)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Growing (800+ plugins)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Medium</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Mature (enterprise)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Learning curve</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Very easy</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Easy–Medium</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Easy (minimal)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Steep</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Schema validation</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Manual / Joi / Zod</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Built-in (JSON Schema)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Manual / Joi</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Built-in (Joi)</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Async/await</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>v5 native; v4 needs wrapper</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Native</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Native (ctx-based)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Native</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>OpenAPI / Swagger</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>swagger-ui-express</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>@fastify/swagger (built-in)</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>koa-swagger-decorator</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>hapi-swagger</td>
            </tr>
            <tr style={{ background: '#f8fafc' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>Best for</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Most APIs, learning</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>High-throughput APIs</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Minimalist projects</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>Enterprise, config-heavy</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 14px', fontWeight: 600 }}>Weekly npm downloads</td>
              <td style={{ padding: '10px 14px' }}>30M+</td>
              <td style={{ padding: '10px 14px' }}>12M+</td>
              <td style={{ padding: '10px 14px' }}>1.5M+</td>
              <td style={{ padding: '10px 14px' }}>800K+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>When to Choose Each Framework</h3>
      <ul>
        <li>
          <strong>Express.js</strong> — Best for most use cases. Choose when team familiarity, ecosystem size,
          available middleware, and community resources matter. The safe default for REST APIs and web apps.
        </li>
        <li>
          <strong>Fastify</strong> — Choose when raw throughput is a measured requirement (high-volume microservices,
          data APIs). Built-in JSON schema validation and serialization provide both speed and structure.
        </li>
        <li>
          <strong>Koa</strong> — Choose for small, focused projects where you want minimal overhead and the
          <code>ctx</code> context object pattern. Created by the original Express team as a spiritual successor.
        </li>
        <li>
          <strong>Hapi</strong> — Choose for enterprise projects where extensive configuration, built-in Joi
          validation, caching, authentication plugins, and a strict security model are valued over raw performance.
        </li>
      </ul>

      <h2>Production Setup and Project Structure</h2>
      <p>
        A well-structured Express project separates concerns and makes the codebase maintainable as it grows.
        Here is the recommended layout for a production API:
      </p>
      <pre><code className="language-bash">{`my-api/
├── src/
│   ├── app.js              # Express app setup (no listen)
│   ├── server.js           # HTTP server (calls app.listen)
│   ├── config/
│   │   ├── index.js        # Environment config with validation
│   │   └── database.js     # Database connection
│   ├── routes/
│   │   ├── index.js        # Route aggregator
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── services/
│   │   ├── authService.js  # Business logic
│   │   └── userService.js
│   ├── models/
│   │   ├── User.js         # Database models (Mongoose/Prisma)
│   │   └── Post.js
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   └── utils/
│       ├── logger.js       # Pino logger
│       └── asyncHandler.js
├── tests/
│   ├── integration/
│   └── unit/
├── .env                    # Never commit!
├── .env.example            # Commit with empty values
├── .gitignore
├── package.json
└── Dockerfile`}</code></pre>

      <h3>Environment Configuration</h3>
      <pre><code className="language-javascript">{`// src/config/index.js
require('dotenv').config();

const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL', 'NODE_ENV'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error('Missing required environment variable: ' + envVar);
  }
}

module.exports = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  db: {
    url: process.env.DATABASE_URL,
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },
};`}</code></pre>

      <h2>Input Validation with Zod</h2>
      <p>
        Always validate and sanitize user input. Zod is the recommended validation library for TypeScript projects
        due to its excellent type inference and composable schema design.
      </p>
      <pre><code className="language-bash">{`npm install zod`}</code></pre>
      <pre><code className="language-typescript">{`// src/middleware/validate.ts
import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: result.error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    // Replace with validated + coerced data
    req.body = result.data.body;
    next();
  };
}

// Define schemas
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const getUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    search: z.string().optional(),
  }),
  body: z.object({}),
  params: z.object({}),
});

// Usage in routes
router.post('/users', validate(createUserSchema), createUserController);
router.get('/users', validate(getUsersSchema), getUsersController);`}</code></pre>

      <h2>Frequently Asked Questions</h2>
      <h3>What is Express.js and why is it so popular?</h3>
      <p>
        Express.js is a minimal, unopinionated web framework for Node.js that provides routing, middleware support,
        and HTTP utilities. It is popular because of its small footprint, flexibility, and the enormous ecosystem of
        compatible npm middleware. With over 30 million weekly downloads, Express remains the most widely used
        Node.js framework in 2026.
      </p>

      <h3>Is Express.js still relevant in 2026?</h3>
      <p>
        Absolutely. While newer frameworks like Fastify offer better raw performance, Express wins on ecosystem
        maturity, community knowledge, available tutorials, and the sheer number of compatible middleware packages.
        For the vast majority of web APIs and services, Express performance is more than adequate — the bottleneck
        is almost always the database or network, not the framework.
      </p>

      <h3>How do I handle async errors in Express.js?</h3>
      <p>
        In Express 4, unhandled promise rejections do not reach the error handler automatically. Use a{' '}
        <code>try/catch</code> with <code>next(err)</code>, wrap handlers with an <code>asyncHandler</code> utility,
        or install the <code>express-async-errors</code> package. Express 5 handles async errors natively.
      </p>

      <h3>What is the difference between app.use() and app.get()?</h3>
      <p>
        <code>app.use()</code> registers middleware that matches all HTTP methods and runs for every request matching
        a path prefix. <code>app.get()</code> registers a handler for GET requests at an exact path. Middleware
        must call <code>next()</code> to pass control forward; route handlers end the request/response cycle.
      </p>

      <h3>How do I structure a large Express.js application?</h3>
      <p>
        Use the MVC pattern: separate routes (routing layer), controllers (request handling logic), services
        (business logic), and models (data access). Mount <code>express.Router()</code> instances for each
        resource on the main app. Keep middleware in a dedicated folder and load environment configuration
        at startup with validation.
      </p>

      <h3>How does Express.js compare to Fastify in performance?</h3>
      <p>
        Fastify is typically 2–3x faster in benchmarks (~76K vs ~28K req/s). Fastify achieves this through
        built-in JSON schema compilation, faster routing, and optimized serialization. However, the performance
        gap rarely matters in practice since database queries dominate latency. Choose Express for ecosystem
        and ease; choose Fastify when throughput is a confirmed bottleneck.
      </p>

      <h3>What middleware is essential for production?</h3>
      <p>
        The essential production middleware stack is: <code>helmet</code> (security headers), <code>cors</code>,
        <code>compression</code> (gzip), <code>express-rate-limit</code>, a request logger (<code>morgan</code> or
        <code>pino-http</code>), <code>express.json()</code>, and a centralized error handler as the last{' '}
        <code>app.use()</code>. For authentication, add JWT middleware for protected routes.
      </p>

      <h3>Should I use Express.js or NestJS?</h3>
      <p>
        Use Express for smaller APIs, microservices, or projects where minimal boilerplate and flexibility are
        priorities. Use NestJS for large enterprise applications where opinionated architecture, dependency
        injection, and built-in TypeScript decorators provide long-term benefits. NestJS uses Express (or Fastify)
        under the hood, so the two are complementary rather than mutually exclusive.
      </p>
    </>
  );
}

function ChineseContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '0 8px 8px 0',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Express.js 快速参考
        </strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.8' }}>
          {translations.zh.tldr}
        </p>
      </div>

      <h2>什么是 Express.js？</h2>
      <p>
        <strong>Express.js</strong> 是一个快速、极简、非约束性的 <strong>Node.js</strong> Web 框架。由 TJ Holowaychuk 于 2010 年发布，现由 OpenJS 基金会维护。Express 已成为 Node.js 生态系统中构建 HTTP 服务器和 REST API 的事实标准。
      </p>
      <p>
        该框架的设计哲学是极简主义：它只提供核心工具——路由、中间件支持和 HTTP 请求/响应工具，不强制要求任何特定的项目结构、模板引擎或数据库层。这种灵活性是 Express 最大的优势，也是它在 2026 年面对众多新框架竞争时仍保持相关性的原因。
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>Express.js 是 Node.js <code>http</code> 模块之上的薄层，提供路由和中间件。</li>
          <li>中间件函数是构建模块——通过 <code>next()</code> 按顺序处理请求。</li>
          <li>使用 <code>express.Router()</code> 模块化路由，保持代码有序。</li>
          <li>始终将集中式错误处理中间件（4个参数）作为最后一个 <code>app.use()</code> 调用添加。</li>
          <li>使用 helmet、cors、express-rate-limit 和基于 JWT 的认证保护生产应用。</li>
          <li>Fastify 比 Express 快 2–3 倍，但 Express 在生态系统规模和社区知识方面占优。</li>
        </ul>
      </div>

      <h2>快速入门：安装与首个服务器</h2>
      <pre><code className="language-bash">{`# 初始化新的 Node.js 项目
mkdir my-api && cd my-api
npm init -y

# 安装 Express
npm install express

# 安装 TypeScript 类型（可选但推荐）
npm install --save-dev @types/express typescript ts-node`}</code></pre>

      <pre><code className="language-javascript">{`// index.js — 最简 Express 服务器
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Express 服务器运行正常！' });
});

app.listen(PORT, () => {
  console.log('服务器运行在 http://localhost:' + PORT);
});`}</code></pre>

      <h2>路由：GET、POST、PUT、DELETE</h2>
      <pre><code className="language-javascript">{`const express = require('express');
const router = express.Router();

// GET — 获取资源列表
router.get('/', (req, res) => {
  const { page = '1', limit = '20' } = req.query;
  res.json({ data: [], page: parseInt(page, 10), limit: parseInt(limit, 10) });
});

// POST — 创建资源
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: '缺少必填字段' });
  }
  res.status(201).json({ id: 1, name, email });
});

// GET /:id — 获取单个资源
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id });
});

// PUT /:id — 完整替换资源
router.put('/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

// DELETE /:id — 删除资源
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

module.exports = router;`}</code></pre>

      <h2>中间件</h2>
      <pre><code className="language-javascript">{`const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// 安全头
app.use(helmet());

// 跨域资源共享
app.use(cors({ origin: ['https://myapp.com'], credentials: true }));

// 请求日志
app.use(morgan('combined'));

// 请求体解析
app.use(express.json({ limit: '10mb' }));

// 速率限制
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100,
  message: { error: '请求过于频繁，请稍后再试' },
});
app.use('/api/', limiter);`}</code></pre>

      <h2>JWT 认证</h2>
      <pre><code className="language-javascript">{`const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 注册：哈希密码
const hash = await bcrypt.hash(password, 12);

// 登录：验证并颁发 JWT
const match = await bcrypt.compare(password, user.passwordHash);
if (!match) return res.status(401).json({ error: '凭据无效' });

const token = jwt.sign(
  { sub: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
res.json({ accessToken: token });

// 认证中间件
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: '缺少认证令牌' });
  }
  try {
    req.user = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: err.name === 'TokenExpiredError' ? '令牌已过期' : '令牌无效' });
  }
}`}</code></pre>

      <h2>错误处理</h2>
      <pre><code className="language-javascript">{`// 集中式错误处理中间件（必须是最后一个 app.use）
function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message, code: err.code });
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : '服务器内部错误',
  });
}

// async 错误处理包装器
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// 使用示例
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('用户不存在', 404, 'NOT_FOUND');
  res.json({ data: user });
}));

app.use(errorHandler); // 必须最后注册`}</code></pre>

      <h2>常见问题</h2>
      <h3>Express.js 在 2026 年还值得学习吗？</h3>
      <p>
        当然值得。Express 每周下载量超过 3000 万次，是 Node.js 生态中最广泛使用的框架。大量工作机会、教程和中间件都基于 Express。即使你最终使用 NestJS 或 Fastify，理解 Express 的中间件模式也至关重要，因为这些框架都建立在相同概念之上。
      </p>

      <h3>Express 和 Fastify 哪个更好？</h3>
      <p>
        Fastify 在基准测试中比 Express 快 2–3 倍，内置 JSON Schema 验证和更快的序列化。但对大多数应用来说，瓶颈在数据库而非框架。Express 生态系统更大，学习资源更丰富。建议：默认选 Express，当吞吐量成为实测瓶颈时再考虑 Fastify。
      </p>

      <h3>如何处理 Express 中的异步错误？</h3>
      <p>
        Express 4 不会自动捕获未处理的 Promise 拒绝。使用以下三种方案之一：在 <code>try/catch</code> 中调用 <code>next(err)</code>；使用 <code>asyncHandler</code> 包装函数；或安装 <code>express-async-errors</code> 包。Express 5 原生支持 async/await 错误传播，无需额外处理。
      </p>
    </>
  );
}

export default function ExpressJsGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1>{t.title}</h1>
      <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '32px', lineHeight: '1.7' }}>
        {t.description}
      </p>
      {isZh ? <ChineseContent /> : <EnglishContent />}
    </>
  );
}
