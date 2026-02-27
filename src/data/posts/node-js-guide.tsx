'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Node.js and what is it used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Node.js is a cross-platform, open-source JavaScript runtime built on Chrome\'s V8 engine. It is primarily used for building backend web servers, REST APIs, real-time applications (chat, gaming), CLI tools, microservices, and streaming applications. Its non-blocking I/O model makes it ideal for I/O-intensive workloads.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Node.js event loop work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The event loop is the core mechanism that allows Node.js to perform non-blocking I/O despite being single-threaded. It offloads operations like file reads and network calls to the OS or libuv thread pool, then processes their callbacks when complete. The loop phases are: timers, pending callbacks, idle/prepare, poll, check (setImmediate), and close callbacks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between require() and import in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'require() is the CommonJS (CJS) module system, synchronous and the default in Node.js. import/export is ES Modules (ESM), asynchronous and the modern standard. To use ESM in Node.js, either rename files to .mjs or set "type": "module" in package.json. Modern Node.js supports both, but mixing them requires careful configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle errors in async/await Node.js code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wrap async/await code in try/catch blocks for synchronous-style error handling. For Express.js, use an async wrapper or express-async-errors to propagate errors to the error-handling middleware. Always handle process-level errors with process.on("uncaughtException") and process.on("unhandledRejection") as a last resort, but prefer proper try/catch in application code.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best way to manage environment variables in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the dotenv package to load a .env file during development. Never commit .env to version control — add it to .gitignore. Commit a .env.example with empty values as documentation. In production, set environment variables directly through your hosting platform (Heroku, Vercel, AWS, etc.) rather than deploying .env files.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement JWT authentication in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install jsonwebtoken and bcrypt. Hash passwords with bcrypt before storing. On login, verify the password with bcrypt.compare(), then sign a JWT with jwt.sign() using a secret key. On protected routes, verify the token with jwt.verify() in middleware. Store tokens in httpOnly cookies (preferred) or localStorage, and set a short expiration (15m–1h) with refresh token rotation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use Node.js, Deno, or Bun for a new project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Node.js is the safest choice for production due to its massive ecosystem (npm), long-term support, and community. Bun is excellent for new projects where speed and tooling simplicity matter — it is a near-drop-in replacement with faster startup and install times. Deno is ideal for TypeScript-first teams who value security by default and Web API compatibility. All three are production-ready in 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy a Node.js application to production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use PM2 as a process manager on a VPS or bare metal server — it handles clustering, auto-restart on crash, and log management. For containerized deployments, build a Docker image with a multi-stage Dockerfile and deploy via Docker Compose or Kubernetes. Set NODE_ENV=production, use a reverse proxy (Nginx) in front of Node.js, enable HTTPS with Let\'s Encrypt, and monitor with a tool like Prometheus or Datadog.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'Node.js Complete Guide: Backend Development Tutorial 2026',
    description:
      'Master Node.js backend development with this comprehensive guide. Covers event loop, Express.js, REST APIs, JWT auth, file system, database integration, testing, deployment with PM2 and Docker, and a Node.js vs Deno vs Bun comparison.',
    content: 'en',
  },
  zh: {
    title: 'Node.js 完整指南：后端开发教程 2026',
    description:
      '通过本综合指南掌握 Node.js 后端开发。涵盖事件循环、Express.js、REST API、JWT 认证、文件系统、数据库集成、测试、PM2 和 Docker 部署，以及 Node.js vs Deno vs Bun 对比。',
    content: 'zh',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Node.js Quick Reference
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>Node.js runs JavaScript on the server using Chrome's V8 engine with a non-blocking, event-driven I/O model.</li>
          <li>Use Express.js for routing and middleware; structure apps with controllers, services, and routes folders.</li>
          <li>Authenticate with JWT + bcrypt; store tokens in httpOnly cookies; always hash passwords before saving.</li>
          <li>Use PM2 for production process management; Docker for containerized deployments.</li>
          <li>Never block the event loop — use async/await, streams, and worker threads for CPU-heavy tasks.</li>
        </ul>
      </div>

      <h2>What Is Node.js?</h2>
      <p>
        <strong>Node.js</strong> is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Chrome's V8 JavaScript engine and released by Ryan Dahl in 2009, Node.js enables developers to use JavaScript for server-side programming — unifying web development around a single language for both frontend and backend.
      </p>
      <p>
        Unlike traditional server-side languages that create a new thread per request (Apache/PHP model), Node.js uses a <strong>single-threaded, event-driven, non-blocking I/O</strong> model. This architecture makes it exceptionally efficient for I/O-bound workloads: web servers, REST APIs, real-time chat, streaming services, and microservices.
      </p>
      <p>
        As of 2026, Node.js powers some of the most visited websites and APIs on the internet, with over 1 billion npm package downloads daily. The Node.js ecosystem — centered around npm — is the largest software registry in the world.
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
          <li>Node.js uses the V8 engine and libuv for non-blocking, event-driven I/O.</li>
          <li>The event loop is single-threaded but offloads I/O to the OS kernel and thread pool.</li>
          <li>npm has over 2 million packages — the largest ecosystem in software development.</li>
          <li>Express.js is the de-facto standard for building HTTP servers and APIs in Node.js.</li>
          <li>JWT + bcrypt is the most common authentication pattern for stateless REST APIs.</li>
          <li>PM2 enables zero-downtime deployment, clustering, and process monitoring.</li>
          <li>Node.js, Deno, and Bun are all viable in 2026; Node.js wins on ecosystem maturity.</li>
        </ul>
      </div>

      <h2>Node.js Architecture: Event Loop and Non-Blocking I/O</h2>
      <p>
        Understanding Node.js's architecture is essential before writing production code. The most important concept is the <strong>event loop</strong> — the mechanism that enables Node.js to handle thousands of concurrent connections without creating new OS threads.
      </p>

      <h3>The Single-Threaded Model</h3>
      <p>
        Node.js JavaScript code runs on a <strong>single thread</strong>. This sounds like a limitation, but in practice it is a strength for I/O-bound applications. When Node.js needs to read a file or make a network request, it delegates that work to the operating system (via libuv), then continues processing other tasks. When the OS finishes, it queues a callback in the event loop.
      </p>
      <pre><code className="language-javascript">{`// WRONG: Blocking the event loop (never do this)
const data = fs.readFileSync('/large-file.csv'); // blocks all other requests!
process(data);

// CORRECT: Non-blocking with callback
fs.readFile('/large-file.csv', 'utf8', (err, data) => {
  if (err) throw err;
  process(data);
});

// BETTER: Non-blocking with async/await
async function loadData() {
  const data = await fs.promises.readFile('/large-file.csv', 'utf8');
  process(data);
}`}</code></pre>

      <h3>Event Loop Phases</h3>
      <p>
        The event loop processes callbacks in six phases per tick. Understanding these phases helps debug timing issues and write predictable async code:
      </p>
      <pre><code className="language-javascript">{`// Event loop phase demonstration
setTimeout(() => console.log('1: setTimeout'), 0);       // timers phase
setImmediate(() => console.log('2: setImmediate'));       // check phase
process.nextTick(() => console.log('3: nextTick'));       // microtask (before next phase)
Promise.resolve().then(() => console.log('4: Promise')); // microtask (before next phase)

console.log('5: synchronous');

// Output order:
// 5: synchronous
// 3: nextTick        (microtasks run before next event loop phase)
// 4: Promise         (microtasks run before next event loop phase)
// 1: setTimeout      (timers phase)
// 2: setImmediate    (check phase)`}</code></pre>

      <h3>libuv Thread Pool</h3>
      <p>
        Although JavaScript runs on one thread, Node.js uses <strong>libuv's thread pool</strong> (default: 4 threads) for blocking operations that the OS cannot handle asynchronously — such as file system operations, DNS lookups, and cryptographic operations.
      </p>
      <pre><code className="language-javascript">{`// Increase thread pool for CPU-heavy crypto or file operations
// Set before importing any module that uses the thread pool
process.env.UV_THREADPOOL_SIZE = '8'; // max 128

// Worker threads for CPU-intensive JavaScript (not I/O)
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Main thread: spawn a worker for CPU work
  const worker = new Worker(__filename, { workerData: { n: 42 } });
  worker.on('message', result => console.log('Result:', result));
  worker.on('error', err => console.error(err));
} else {
  // Worker thread: perform CPU-intensive computation
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  parentPort.postMessage(fibonacci(workerData.n));
}`}</code></pre>

      <h2>Installing Node.js: nvm and Version Management</h2>
      <p>
        Always install Node.js via <strong>nvm</strong> (Node Version Manager) rather than the system package manager. This lets you switch between Node.js versions per project and avoids permission issues with global npm packages.
      </p>
      <pre><code className="language-bash">{`# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc  # or ~/.zshrc

# Install and use specific Node.js versions
nvm install 20    # LTS (recommended for production)
nvm install 22    # Current
nvm use 20

# Set default version
nvm alias default 20

# Per-project version via .nvmrc
echo "20" > .nvmrc
nvm use           # reads .nvmrc automatically

# Check installed versions
nvm ls
node --version    # v20.x.x
npm --version     # 10.x.x`}</code></pre>

      <h2>Core Modules: Built-In Node.js APIs</h2>
      <p>
        Node.js ships with a rich set of built-in modules. No npm install needed — just <code>require()</code> or <code>import</code> them directly.
      </p>

      <h3>fs — File System</h3>
      <pre><code className="language-javascript">{`const fs = require('fs');
const path = require('path');

// Read file (async — recommended)
async function readConfig() {
  const filePath = path.join(__dirname, 'config.json');
  const raw = await fs.promises.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

// Write file (create or overwrite)
await fs.promises.writeFile('output.txt', 'Hello World\\n', 'utf8');

// Append to file
await fs.promises.appendFile('log.txt', new Date().toISOString() + '\\n');

// Check if file exists
try {
  await fs.promises.access('config.json', fs.constants.F_OK);
  console.log('File exists');
} catch {
  console.log('File not found');
}

// List directory contents
const entries = await fs.promises.readdir('./src', { withFileTypes: true });
entries.forEach(entry => {
  if (entry.isDirectory()) console.log('DIR:', entry.name);
  else console.log('FILE:', entry.name);
});

// Create directory (recursive)
await fs.promises.mkdir('./logs/2026', { recursive: true });

// Delete file
await fs.promises.unlink('temp.txt');

// Rename/move file
await fs.promises.rename('old.txt', 'new.txt');`}</code></pre>

      <h3>path — File Path Utilities</h3>
      <pre><code className="language-javascript">{`const path = require('path');

path.join('/users', 'alice', 'docs');       // '/users/alice/docs'
path.resolve('src', 'index.js');            // absolute path from cwd
path.dirname('/home/alice/file.txt');       // '/home/alice'
path.basename('/home/alice/file.txt');      // 'file.txt'
path.extname('style.min.css');              // '.css'
path.parse('/home/user/notes.txt');
// { root: '/', dir: '/home/user', base: 'notes.txt', ext: '.txt', name: 'notes' }

// Always use path.join for cross-platform paths (avoids Windows / Linux issues)
const configPath = path.join(__dirname, '..', 'config', 'app.json');`}</code></pre>

      <h3>http / https — HTTP Server</h3>
      <pre><code className="language-javascript">{`const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
});`}</code></pre>

      <h3>events — EventEmitter</h3>
      <pre><code className="language-javascript">{`const { EventEmitter } = require('events');

class OrderService extends EventEmitter {
  async placeOrder(order) {
    // process order...
    const result = await processPayment(order);
    this.emit('order:placed', { orderId: result.id, order });
    return result;
  }
}

const orderService = new OrderService();

orderService.on('order:placed', ({ orderId, order }) => {
  console.log(\`Order \${orderId} placed, sending confirmation email...\`);
  sendEmail(order.email, 'Order Confirmation', orderTemplate(orderId));
});

// Once (fires only once)
orderService.once('order:placed', () => {
  console.log('First order ever placed!');
});`}</code></pre>

      <h3>stream — Streaming Data</h3>
      <pre><code className="language-javascript">{`const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');

// Pipe a large file through gzip compression to an output file
// This processes the file in chunks — never loads the whole file into memory
async function compressFile(input, output) {
  await pipeline(
    fs.createReadStream(input),
    zlib.createGzip(),
    fs.createWriteStream(output)
  );
  console.log(\`Compressed \${input} -> \${output}\`);
}

await compressFile('large-dataset.csv', 'large-dataset.csv.gz');

// Transform stream: process CSV line by line
const { Transform } = require('stream');
const { createInterface } = require('readline');

const lineCounter = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\\n').length - 1;
    this.lineCount = (this.lineCount || 0) + lines;
    callback(null, chunk); // pass through unchanged
  }
});`}</code></pre>

      <h3>crypto — Cryptography</h3>
      <pre><code className="language-javascript">{`const crypto = require('crypto');

// Generate a random token (for API keys, password reset tokens)
const token = crypto.randomBytes(32).toString('hex');
console.log(token); // 64-char hex string

// HMAC signature (for webhook verification)
function verifyWebhook(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  );
}

// Hash a value (for non-password data like cache keys)
const hash = crypto.createHash('sha256').update('some-data').digest('hex');

// AES-256-GCM encryption (for PII at rest)
function encrypt(text, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString('hex'), tag: tag.toString('hex'), data: encrypted.toString('hex') };
}`}</code></pre>

      <h2>npm and package.json: Dependency Management</h2>
      <p>
        npm (Node Package Manager) is the default package manager for Node.js. The <code>package.json</code> file is the manifest that describes your project, its dependencies, scripts, and metadata.
      </p>

      <h3>package.json Essentials</h3>
      <pre><code className="language-json">{`{
  "name": "my-api-server",
  "version": "1.2.3",
  "description": "A production-ready REST API",
  "main": "src/index.js",
  "type": "commonjs",
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "build": "tsc",
    "db:migrate": "node scripts/migrate.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2",
    "supertest": "^6.3.4",
    "eslint": "^8.55.0"
  }
}`}</code></pre>

      <h3>Semantic Versioning and Lock Files</h3>
      <p>
        npm uses <strong>semantic versioning (semver)</strong>: <code>MAJOR.MINOR.PATCH</code>. Version range prefixes control which updates are allowed:
      </p>
      <pre><code className="language-bash">{`# Semver ranges in package.json
"express": "4.18.2"   # exact — only this version
"express": "~4.18.2"  # patch updates only — 4.18.x
"express": "^4.18.2"  # minor + patch — 4.x.x (most common)
"express": "*"        # any version (dangerous in production!)

# package-lock.json / yarn.lock
# Lock files record the exact resolved version of every dependency
# ALWAYS commit lock files to version control for reproducible builds

npm install              # install using package-lock.json
npm install --frozen-lockfile  # fail if lock file would be updated (CI)
npm ci                   # clean install using lock file (fastest in CI)

# Managing dependencies
npm install express              # save to dependencies
npm install -D jest              # save to devDependencies
npm uninstall lodash             # remove package
npm update                       # update to allowed versions
npm outdated                     # show outdated packages
npm audit                        # check for security vulnerabilities
npm audit fix                    # auto-fix vulnerabilities`}</code></pre>

      <h2>Express.js: Building HTTP Servers and APIs</h2>
      <p>
        <strong>Express.js</strong> is the most popular Node.js web framework. It is minimal and unopinionated, providing routing, middleware support, and request/response handling without imposing a rigid project structure.
      </p>

      <h3>Basic Express Server</h3>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json());                    // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form data

// Route definition
app.get('/', (req, res) => {
  res.json({ message: 'API is running', version: '1.0.0' });
});

// Route with URL parameter
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err); // pass to error handler
  }
});

// Route with query parameters
app.get('/products', (req, res) => {
  const { page = 1, limit = 20, category } = req.query;
  // fetch products with pagination...
  res.json({ products: [], page: Number(page), limit: Number(limit) });
});

// POST route
app.post('/users', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // validation, hashing, saving...
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
});

// Error-handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(3000, () => console.log('Express running on port 3000'));`}</code></pre>

      <h3>Express Router for Modular Routes</h3>
      <pre><code className="language-javascript">{`// routes/users.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/',         authenticate, userController.list);
router.post('/',                       userController.create);
router.get('/:id',      authenticate, userController.getById);
router.put('/:id',      authenticate, userController.update);
router.delete('/:id',   authenticate, userController.remove);

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/v1/users', usersRouter);

// controllers/userController.js — keeps routes thin
exports.list = async (req, res, next) => {
  try {
    const users = await UserService.list(req.query);
    res.json(users);
  } catch (err) {
    next(err);
  }
};`}</code></pre>

      <h3>Custom Middleware</h3>
      <pre><code className="language-javascript">{`// Request logger middleware
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.originalUrl} \${res.statusCode} \${duration}ms\`);
  });
  next(); // MUST call next() or the request hangs
}

// Rate limiting middleware
const requestCounts = new Map();
function rateLimiter(maxRequests = 100, windowMs = 60000) {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    const requests = (requestCounts.get(key) || []).filter(t => t > windowStart);
    if (requests.length >= maxRequests) {
      return res.status(429).json({ error: 'Too Many Requests' });
    }
    requests.push(now);
    requestCounts.set(key, requests);
    next();
  };
}

// CORS middleware
function cors(allowedOrigins) {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  };
}

app.use(requestLogger);
app.use(rateLimiter(60, 60000)); // 60 req/min
app.use(cors(['https://myapp.com', 'http://localhost:3000']));`}</code></pre>

      <h2>Environment Variables and Configuration</h2>
      <p>
        Hardcoding secrets in source code is the most common security mistake in Node.js applications. Use environment variables for all secrets, connection strings, and environment-specific configuration.
      </p>
      <pre><code className="language-bash">{`# .env (never commit this file!)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
REDIS_URL=redis://localhost:6379
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
BCRYPT_ROUNDS=12

# .env.example (commit this file — documents required variables)
NODE_ENV=
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
REDIS_URL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
BCRYPT_ROUNDS=`}</code></pre>

      <pre><code className="language-javascript">{`// config/env.js — validate all required vars at startup
require('dotenv').config();

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(\`Missing required environment variable: \${name}\`);
  return value;
}

module.exports = {
  NODE_ENV:       process.env.NODE_ENV || 'development',
  PORT:           parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL:   required('DATABASE_URL'),
  JWT_SECRET:     required('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REDIS_URL:      process.env.REDIS_URL || 'redis://localhost:6379',
  BCRYPT_ROUNDS:  parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  isProd:         process.env.NODE_ENV === 'production',
  isDev:          process.env.NODE_ENV === 'development',
};

// Usage in any file
const config = require('./config/env');
console.log(\`Starting on port \${config.PORT} in \${config.NODE_ENV} mode\`);`}</code></pre>

      <h2>Building REST APIs: CRUD with Express.js</h2>
      <p>
        A well-designed REST API follows consistent conventions for URLs, HTTP methods, and status codes. Here is a complete example of a CRUD API for a <code>posts</code> resource:
      </p>
      <pre><code className="language-javascript">{`// routes/posts.js — Complete CRUD REST API
const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { createPostSchema, updatePostSchema } = require('../schemas/post');

// GET /api/posts — list with pagination and filtering
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20, tag, authorId } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const where = {};
    if (tag) where.tag = tag;
    if (authorId) where.authorId = authorId;

    const [posts, total] = await Promise.all([
      Post.findMany({ where, limit: Number(limit), offset, orderBy: 'createdAt DESC' }),
      Post.count({ where }),
    ]);

    res.json({
      data: posts,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:id — single resource
router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /api/posts — create
router.post('/', authenticate, validate(createPostSchema), async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, authorId: req.user.id });
    res.status(201).json(post);  // 201 Created
  } catch (err) {
    next(err);
  }
});

// PUT /api/posts/:id — full update
router.put('/:id', authenticate, validate(updatePostSchema), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    const updated = await Post.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/posts/:id — partial update
router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    const updated = await Post.partialUpdate(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await Post.delete(req.params.id);
    res.status(204).send(); // 204 No Content
  } catch (err) {
    next(err);
  }
});

module.exports = router;`}</code></pre>

      <h2>Authentication: JWT and bcrypt</h2>
      <p>
        The most common authentication pattern for Node.js REST APIs is <strong>JWT (JSON Web Tokens)</strong> combined with <strong>bcrypt</strong> for password hashing. Never store plain-text passwords.
      </p>
      <pre><code className="language-javascript">{`const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/env');

// --- Password Hashing ---
// Hash password before saving to database
async function hashPassword(plainText) {
  return bcrypt.hash(plainText, config.BCRYPT_ROUNDS); // rounds=12 takes ~300ms
}

// Verify password during login
async function verifyPassword(plainText, hash) {
  return bcrypt.compare(plainText, hash); // timing-safe comparison built in
}

// --- JWT Token Generation ---
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { sub: userId, type: 'access' },
    config.JWT_SECRET,
    { expiresIn: '15m', issuer: 'myapp' }
  );
  const refreshToken = jwt.sign(
    { sub: userId, type: 'refresh' },
    config.JWT_SECRET,
    { expiresIn: '7d', issuer: 'myapp' }
  );
  return { accessToken, refreshToken };
}

// --- Auth Middleware ---
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, config.JWT_SECRET, { issuer: 'myapp' });
    if (payload.type !== 'access') throw new Error('Wrong token type');
    req.user = { id: payload.sub };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// --- Auth Routes ---
// POST /auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const tokens = generateTokens(user.id);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: config.isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({ user: { id: user.id, name, email }, accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const tokens = generateTokens(user.id);
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: config.isProd, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ user: { id: user.id, name: user.name, email }, accessToken: tokens.accessToken });
  } catch (err) {
    next(err);
  }
});`}</code></pre>

      <h2>Database Integration</h2>
      <p>
        Node.js works with any database. Here are connection patterns for the two most common choices: <strong>PostgreSQL</strong> (relational) and <strong>MongoDB</strong> (document).
      </p>

      <h3>PostgreSQL with node-postgres (pg)</h3>
      <pre><code className="language-javascript">{`const { Pool } = require('pg');
const config = require('./config/env');

// Connection pool (reuse connections — critical for performance)
const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,               // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: config.isProd ? { rejectUnauthorized: false } : false,
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});

// Query helper with automatic connection management
async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release(); // always return connection to pool
  }
}

// Transactions
async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// Example usage
const { rows } = await query(
  'SELECT id, name, email FROM users WHERE id = $1',
  [userId]
);`}</code></pre>

      <h3>MongoDB with the Official Driver</h3>
      <pre><code className="language-javascript">{`const { MongoClient, ObjectId } = require('mongodb');
const config = require('./config/env');

let db;

async function connectDB() {
  const client = new MongoClient(config.MONGODB_URI, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();
  db = client.db('myapp');
  console.log('MongoDB connected');

  // Create indexes for performance
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('posts').createIndex({ authorId: 1, createdAt: -1 });
  await db.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  return db;
}

// CRUD operations
async function createUser(userData) {
  const result = await db.collection('users').insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return { _id: result.insertedId, ...userData };
}

async function findUserById(id) {
  return db.collection('users').findOne({ _id: new ObjectId(id) });
}

async function listPosts(authorId, { page = 1, limit = 20 } = {}) {
  return db.collection('posts')
    .find({ authorId: new ObjectId(authorId) })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
}`}</code></pre>

      <h2>Testing with Jest</h2>
      <p>
        Automated testing is non-negotiable for production Node.js applications. <strong>Jest</strong> is the most popular testing framework, and <strong>Supertest</strong> is the standard for testing Express HTTP endpoints.
      </p>
      <pre><code className="language-javascript">{`// __tests__/userService.test.js
const UserService = require('../services/userService');
const { query } = require('../db');

// Mock the database module
jest.mock('../db');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should hash the password before saving', async () => {
      const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
      query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await UserService.create({
        name: 'Alice',
        email: 'alice@example.com',
        password: 'plaintext123',
      });

      expect(query).toHaveBeenCalledTimes(1);
      const [sql, params] = query.mock.calls[0];
      expect(sql).toContain('INSERT INTO users');
      expect(params[2]).not.toBe('plaintext123'); // password should be hashed
      expect(params[2]).toMatch(/^\$2b\$/);       // bcrypt hash prefix
      expect(result).toEqual(mockUser);
    });

    it('should throw on duplicate email', async () => {
      const error = new Error('duplicate key value');
      error.code = '23505';
      query.mockRejectedValueOnce(error);

      await expect(
        UserService.create({ name: 'Bob', email: 'existing@test.com', password: 'pass' })
      ).rejects.toThrow('Email already exists');
    });
  });
});

// __tests__/posts.route.test.js — Integration test
const request = require('supertest');
const app = require('../app');
const { generateTokens } = require('../auth');

describe('POST /api/posts', () => {
  const tokens = generateTokens('test-user-id');

  it('should create a post when authenticated', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', \`Bearer \${tokens.accessToken}\`)
      .send({ title: 'Test Post', content: 'Hello world', tag: 'nodejs' })
      .expect(201);

    expect(res.body).toMatchObject({
      title: 'Test Post',
      content: 'Hello world',
      authorId: 'test-user-id',
    });
    expect(res.body.id).toBeDefined();
  });

  it('should return 401 when not authenticated', async () => {
    await request(app)
      .post('/api/posts')
      .send({ title: 'Test' })
      .expect(401);
  });
});`}</code></pre>

      <h2>Deployment: PM2 and Docker</h2>

      <h3>PM2 Process Manager</h3>
      <pre><code className="language-javascript">{`// ecosystem.config.js — PM2 configuration
module.exports = {
  apps: [{
    name: 'api-server',
    script: 'src/index.js',
    instances: 'max',       // use all CPU cores
    exec_mode: 'cluster',   // cluster mode for load balancing
    watch: false,           // don't watch files in production
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }],
};`}</code></pre>

      <pre><code className="language-bash">{`# PM2 commands
npm install -g pm2

pm2 start ecosystem.config.js --env production   # start in production mode
pm2 status                                        # show all processes
pm2 logs api-server                               # tail logs
pm2 monit                                         # live monitoring dashboard
pm2 reload api-server                             # zero-downtime reload
pm2 restart api-server                            # full restart
pm2 delete api-server                             # stop and delete

# Auto-start on system reboot
pm2 startup                                       # generate startup command
pm2 save                                          # save current process list`}</code></pre>

      <h3>Dockerfile for Node.js</h3>
      <pre><code className="language-dockerfile">{`# Multi-stage Dockerfile for minimal production image
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files first (layer caching)
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Copy source and build (TypeScript or similar)
COPY . .
RUN npm run build 2>/dev/null || echo "No build step"

# Stage 2: Production image
FROM node:20-alpine AS production
WORKDIR /app

# Security: run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --frozen-lockfile --only=production && npm cache clean --force

# Copy built app from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Use non-root user
USER appuser

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "src/index.js"]`}</code></pre>

      <h2>Node.js vs Deno vs Bun: Runtime Comparison 2026</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Node.js 22</th>
            <th>Deno 2.x</th>
            <th>Bun 1.x</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Engine</td><td>V8 (Google)</td><td>V8 (Google)</td><td>JavaScriptCore (Apple)</td></tr>
          <tr><td>Language</td><td>C++</td><td>Rust</td><td>Zig</td></tr>
          <tr><td>TypeScript</td><td>Native (strip-types flag)</td><td>Native, first-class</td><td>Native, first-class</td></tr>
          <tr><td>Package Manager</td><td>npm / pnpm / yarn</td><td>deno add (npm compat)</td><td>bun install (built-in)</td></tr>
          <tr><td>Test Runner</td><td>node --test / Jest</td><td>deno test (built-in)</td><td>bun test (built-in)</td></tr>
          <tr><td>Bundler</td><td>webpack / vite / esbuild</td><td>deno compile / bundle</td><td>bun build (built-in)</td></tr>
          <tr><td>npm Compatibility</td><td>100%</td><td>~95%</td><td>~98%</td></tr>
          <tr><td>Security Model</td><td>Unrestricted</td><td>Permissions required</td><td>Unrestricted</td></tr>
          <tr><td>HTTP Server</td><td>Bun ~4x faster</td><td>~2x faster than Node</td><td>Fastest (native)</td></tr>
          <tr><td>Startup Time</td><td>~50ms</td><td>~70ms</td><td>~5ms</td></tr>
          <tr><td>npm Packages</td><td>2M+ packages</td><td>npm + deno.land</td><td>npm + JSR</td></tr>
          <tr><td>LTS Support</td><td>Yes (Active LTS)</td><td>No formal LTS</td><td>No formal LTS</td></tr>
          <tr><td>Best For</td><td>Production, enterprise</td><td>TypeScript-first teams</td><td>Speed, new projects</td></tr>
        </tbody>
      </table>

      <h2>Performance Tips: Clustering, Caching, and More</h2>

      <h3>Clustering — Use All CPU Cores</h3>
      <pre><code className="language-javascript">{`const cluster = require('cluster');
const os = require('os');
const app = require('./app');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(\`Primary \${process.pid} starting \${numCPUs} workers\`);

  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died. Restarting...\`);
    cluster.fork(); // Auto-restart crashed workers
  });
} else {
  app.listen(3000);
  console.log(\`Worker \${process.pid} started\`);
}`}</code></pre>

      <h3>In-Memory Caching with TTL</h3>
      <pre><code className="language-javascript">{`// Simple LRU cache with TTL (or use the 'lru-cache' npm package)
class TTLCache {
  constructor(maxSize = 1000, ttlMs = 60000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }
    // LRU: move to end
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      // Delete oldest entry (first in Map iteration order)
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}

const cache = new TTLCache(500, 5 * 60 * 1000); // 500 entries, 5-min TTL

// Cache middleware for Express routes
function cacheMiddleware(ttlSeconds = 60) {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    const key = req.originalUrl;
    const cached = cache.get(key);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache.set(key, data);
      res.setHeader('X-Cache', 'MISS');
      return originalJson(data);
    };
    next();
  };
}

app.get('/api/products', cacheMiddleware(300), productController.list);`}</code></pre>

      <h2>Security Best Practices</h2>
      <pre><code className="language-javascript">{`const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Helmet sets security headers: X-Frame-Options, X-XSS-Protection, HSTS, CSP, etc.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting to prevent brute force and DoS
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // max 5 login attempts
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/auth/login', authLimiter);

// Input validation with Zod
const { z } = require('zod');
const createUserSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(100).regex(/[A-Z]/, 'Must contain uppercase'),
});

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Validation failed', details: result.error.issues });
    }
    req.body = result.data;
    next();
  };
}

// SQL injection prevention — always use parameterized queries
// NEVER do this:
// db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);  // VULNERABLE!

// Always do this:
// db.query('SELECT * FROM users WHERE email = $1', [email]);   // SAFE`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is Node.js and what is it used for?</h3>
      <p>
        Node.js is a cross-platform JavaScript runtime built on Chrome's V8 engine. It is used for building backend web servers, REST APIs, real-time applications, CLI tools, and microservices. Its non-blocking I/O model makes it ideal for high-concurrency I/O-intensive workloads.
      </p>

      <h3>How does the Node.js event loop work?</h3>
      <p>
        The event loop is what allows Node.js to be non-blocking despite running on a single thread. It offloads I/O operations to the OS kernel, then processes their callbacks when complete. The loop has six phases: timers, pending callbacks, idle/prepare, poll, check (setImmediate), and close callbacks. Microtasks (promises, process.nextTick) run between each phase.
      </p>

      <h3>What is the difference between require() and import in Node.js?</h3>
      <p>
        <code>require()</code> is CommonJS (CJS) — synchronous and the traditional Node.js module system. <code>import/export</code> is ES Modules (ESM) — asynchronous and the modern standard. Use ESM for new projects by setting <code>"type": "module"</code> in package.json or using <code>.mjs</code> file extensions.
      </p>

      <h3>How do I handle errors in async/await Node.js code?</h3>
      <p>
        Use <code>try/catch</code> blocks around async operations. In Express.js, always call <code>next(err)</code> from async route handlers to propagate errors to the error-handling middleware (the 4-argument <code>(err, req, res, next)</code> function). Use <code>process.on('unhandledRejection')</code> as a last resort to catch missed rejections.
      </p>

      <h3>What is the best way to manage environment variables in Node.js?</h3>
      <p>
        Use <code>dotenv</code> to load a <code>.env</code> file during development. Never commit <code>.env</code> to version control. Commit a <code>.env.example</code> with empty values. Validate required variables at startup so the app fails fast with a clear error if any are missing. In production, set variables through your hosting platform.
      </p>

      <h3>How do I implement JWT authentication in Node.js?</h3>
      <p>
        Install <code>jsonwebtoken</code> and <code>bcrypt</code>. Hash passwords with <code>bcrypt.hash()</code> before storing. On login, verify with <code>bcrypt.compare()</code>, then sign a JWT with <code>jwt.sign()</code>. Protect routes with middleware that calls <code>jwt.verify()</code>. Store access tokens short-lived (15m) and use refresh tokens in httpOnly cookies for security.
      </p>

      <h3>Should I use Node.js, Deno, or Bun for a new project?</h3>
      <p>
        Node.js is the safest for production due to its ecosystem and LTS support. Bun is excellent for new projects needing speed and a great developer experience. Deno suits TypeScript-first teams who value security-by-default. All are production-ready in 2026.
      </p>

      <h3>How do I deploy a Node.js application to production?</h3>
      <p>
        Use <strong>PM2</strong> on a VPS for process management with clustering and auto-restart. Use <strong>Docker</strong> for containerized deployments with a multi-stage Dockerfile. Set <code>NODE_ENV=production</code>, use Nginx as a reverse proxy, enable HTTPS via Let's Encrypt, and monitor with PM2's built-in dashboard or a dedicated APM tool.
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
          border: '2px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Node.js 快速参考
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>Node.js 使用 Chrome V8 引擎在服务器端运行 JavaScript，采用非阻塞事件驱动的 I/O 模型。</li>
          <li>使用 Express.js 进行路由和中间件处理；按 controllers、services、routes 文件夹组织项目。</li>
          <li>使用 JWT + bcrypt 进行认证；将 token 存储在 httpOnly cookie 中；始终在保存前哈希密码。</li>
          <li>在生产环境使用 PM2 进行进程管理；使用 Docker 进行容器化部署。</li>
          <li>永远不要阻塞事件循环——对 CPU 密集型任务使用 async/await、流和 Worker 线程。</li>
        </ul>
      </div>

      <h2>什么是 Node.js？</h2>
      <p>
        <strong>Node.js</strong> 是一个开源、跨平台的 JavaScript 运行时环境，能在浏览器之外执行 JavaScript 代码。它基于 Chrome 的 V8 JavaScript 引擎构建，由 Ryan Dahl 于 2009 年发布，使开发者能够将 JavaScript 用于服务器端编程，从而实现前后端统一使用同一种语言。
      </p>
      <p>
        与每个请求创建新线程的传统服务器端语言（Apache/PHP 模型）不同，Node.js 使用<strong>单线程、事件驱动、非阻塞 I/O</strong> 模型。这种架构对于 I/O 密集型工作负载非常高效：Web 服务器、REST API、实时聊天、流媒体服务和微服务。
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
          <li>Node.js 使用 V8 引擎和 libuv 实现非阻塞、事件驱动的 I/O。</li>
          <li>事件循环是单线程的，但将 I/O 卸载到操作系统内核和线程池。</li>
          <li>npm 拥有超过 200 万个包——是软件开发中最大的生态系统。</li>
          <li>Express.js 是在 Node.js 中构建 HTTP 服务器和 API 的事实标准。</li>
          <li>JWT + bcrypt 是无状态 REST API 中最常见的认证模式。</li>
          <li>PM2 支持零停机部署、集群和进程监控。</li>
          <li>2026 年 Node.js、Deno 和 Bun 都可用于生产；Node.js 在生态系统成熟度上胜出。</li>
        </ul>
      </div>

      <h2>Node.js 架构：事件循环与非阻塞 I/O</h2>
      <p>
        在编写生产代码之前，理解 Node.js 的架构至关重要。最重要的概念是<strong>事件循环</strong>——这是使 Node.js 能够在不创建新操作系统线程的情况下处理数千个并发连接的机制。
      </p>

      <h3>单线程模型</h3>
      <p>
        Node.js JavaScript 代码运行在<strong>单线程</strong>上。这听起来像是一个限制，但对于 I/O 密集型应用来说实际上是一个优势。当 Node.js 需要读取文件或发起网络请求时，它将工作委托给操作系统（通过 libuv），然后继续处理其他任务。当操作系统完成后，它在事件循环中排队一个回调。
      </p>
      <pre><code className="language-javascript">{`// 错误做法：阻塞事件循环（永远不要这样做）
const data = fs.readFileSync('/large-file.csv'); // 阻塞所有其他请求！
process(data);

// 正确做法：使用回调的非阻塞方式
fs.readFile('/large-file.csv', 'utf8', (err, data) => {
  if (err) throw err;
  process(data);
});

// 更好的做法：使用 async/await 的非阻塞方式
async function loadData() {
  const data = await fs.promises.readFile('/large-file.csv', 'utf8');
  process(data);
}`}</code></pre>

      <h3>事件循环阶段</h3>
      <p>
        事件循环每次循环处理六个阶段的回调。理解这些阶段有助于调试时序问题并编写可预测的异步代码：
      </p>
      <pre><code className="language-javascript">{`setTimeout(() => console.log('1: setTimeout'), 0);       // 定时器阶段
setImmediate(() => console.log('2: setImmediate'));       // 检查阶段
process.nextTick(() => console.log('3: nextTick'));       // 微任务（下一阶段前）
Promise.resolve().then(() => console.log('4: Promise')); // 微任务（下一阶段前）

console.log('5: 同步代码');

// 输出顺序：
// 5: 同步代码
// 3: nextTick        (微任务在下一个事件循环阶段前运行)
// 4: Promise         (微任务在下一个事件循环阶段前运行)
// 1: setTimeout      (定时器阶段)
// 2: setImmediate    (检查阶段)`}</code></pre>

      <h2>npm 与 package.json：依赖管理</h2>
      <pre><code className="language-json">{`{
  "name": "my-api-server",
  "version": "1.2.3",
  "description": "生产就绪的 REST API",
  "main": "src/index.js",
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest --coverage",
    "lint": "eslint src/"
  },
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2",
    "supertest": "^6.3.4"
  }
}`}</code></pre>

      <h2>Express.js：构建 HTTP 服务器和 API</h2>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();

app.use(express.json());

// 基本路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// 带参数的路由
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: '用户未找到' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// 错误处理中间件（必须有 4 个参数）
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || '服务器内部错误' });
});

app.listen(3000, () => console.log('Express 运行在端口 3000'));`}</code></pre>

      <h2>环境变量与配置</h2>
      <pre><code className="language-bash">{`# .env（永远不要提交此文件！）
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
JWT_SECRET=your-super-secret-key

# .gitignore
.env
.env.local
.env.production`}</code></pre>

      <pre><code className="language-javascript">{`// config/env.js — 启动时验证所有必要变量
require('dotenv').config();

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(\`缺少必要的环境变量：\${name}\`);
  return value;
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: required('DATABASE_URL'),
  JWT_SECRET: required('JWT_SECRET'),
};`}</code></pre>

      <h2>构建 REST API：CRUD 操作</h2>
      <pre><code className="language-javascript">{`// 完整的 CRUD REST API 示例
router.get('/api/posts', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const [posts, total] = await Promise.all([
      Post.findMany({ limit: Number(limit), offset: (Number(page) - 1) * Number(limit) }),
      Post.count(),
    ]);
    res.json({ data: posts, meta: { page: Number(page), total } });
  } catch (err) {
    next(err);
  }
});

router.post('/api/posts', authenticate, async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, authorId: req.user.id });
    res.status(201).json(post);   // 201 Created
  } catch (err) {
    next(err);
  }
});

router.delete('/api/posts/:id', authenticate, async (req, res, next) => {
  try {
    await Post.delete(req.params.id);
    res.status(204).send();       // 204 No Content
  } catch (err) {
    next(err);
  }
});`}</code></pre>

      <h2>认证：JWT 与 bcrypt</h2>
      <pre><code className="language-javascript">{`const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 注册时哈希密码
const hashedPassword = await bcrypt.hash(plainText, 12); // 12轮，约300ms

// 登录时验证密码
const isValid = await bcrypt.compare(plainText, hashedPassword);

// 生成 JWT
const token = jwt.sign(
  { sub: userId, type: 'access' },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// 认证中间件
function authenticate(req, res, next) {
  const token = req.headers.authorization?.slice(7);
  if (!token) return res.status(401).json({ error: '未认证' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ error: 'token 无效或已过期' });
  }
}`}</code></pre>

      <h2>Node.js vs Deno vs Bun 对比</h2>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>Node.js 22</th>
            <th>Deno 2.x</th>
            <th>Bun 1.x</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>引擎</td><td>V8</td><td>V8</td><td>JavaScriptCore</td></tr>
          <tr><td>TypeScript 支持</td><td>原生（实验性）</td><td>原生一等公民</td><td>原生一等公民</td></tr>
          <tr><td>包管理器</td><td>npm/pnpm/yarn</td><td>deno add</td><td>内置 bun install</td></tr>
          <tr><td>npm 兼容性</td><td>100%</td><td>~95%</td><td>~98%</td></tr>
          <tr><td>安全模型</td><td>无限制</td><td>需要权限声明</td><td>无限制</td></tr>
          <tr><td>HTTP 性能</td><td>基准</td><td>约快 2 倍</td><td>约快 4 倍</td></tr>
          <tr><td>LTS 支持</td><td>有（Active LTS）</td><td>无正式 LTS</td><td>无正式 LTS</td></tr>
          <tr><td>最适合</td><td>生产、企业级</td><td>TypeScript 优先团队</td><td>追求速度的新项目</td></tr>
        </tbody>
      </table>

      <h2>部署：PM2 与 Docker</h2>
      <pre><code className="language-javascript">{`// ecosystem.config.js — PM2 配置
module.exports = {
  apps: [{
    name: 'api-server',
    script: 'src/index.js',
    instances: 'max',        // 使用所有 CPU 核心
    exec_mode: 'cluster',    // 集群模式
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};`}</code></pre>

      <pre><code className="language-bash">{`# PM2 常用命令
pm2 start ecosystem.config.js --env production
pm2 status          # 查看所有进程
pm2 logs api-server # 查看日志
pm2 reload api-server # 零停机重载
pm2 startup && pm2 save # 开机自启`}</code></pre>

      <h2>常见问题</h2>

      <h3>Node.js 是什么，用于什么？</h3>
      <p>Node.js 是基于 Chrome V8 引擎的跨平台 JavaScript 运行时。主要用于构建后端 Web 服务器、REST API、实时应用（聊天、游戏）、CLI 工具和微服务。其非阻塞 I/O 模型使其非常适合高并发 I/O 密集型工作负载。</p>

      <h3>Node.js 事件循环如何工作？</h3>
      <p>事件循环让 Node.js 在单线程的情况下实现非阻塞。它将 I/O 操作卸载到操作系统内核，完成后处理其回调。循环有六个阶段：定时器、挂起回调、空闲/准备、轮询、检查（setImmediate）和关闭回调。Promise 和 process.nextTick 等微任务在每个阶段之间运行。</p>

      <h3>如何在 Node.js 中处理 async/await 错误？</h3>
      <p>用 try/catch 块包裹 async 操作。在 Express.js 中，始终在异步路由处理器中调用 <code>next(err)</code> 将错误传递到错误处理中间件。使用 <code>process.on('unhandledRejection')</code> 作为捕获遗漏 rejection 的最后手段。</p>

      <h3>如何在 Node.js 中管理环境变量？</h3>
      <p>使用 <code>dotenv</code> 在开发时加载 <code>.env</code> 文件。永远不要将 <code>.env</code> 提交到版本控制。提交一个带有空值的 <code>.env.example</code> 作为文档。在启动时验证必要的变量，以便在任何变量缺失时快速失败。在生产环境中，通过托管平台设置环境变量。</p>

      <h3>如何实现 JWT 认证？</h3>
      <p>安装 <code>jsonwebtoken</code> 和 <code>bcrypt</code>。用 <code>bcrypt.hash()</code> 哈希密码后再存储。登录时用 <code>bcrypt.compare()</code> 验证，然后用 <code>jwt.sign()</code> 签发 JWT。用中间件调用 <code>jwt.verify()</code> 保护路由。访问 token 设置短有效期（15m），使用 httpOnly cookie 中的刷新 token 来提升安全性。</p>

      <h3>新项目应该选择 Node.js、Deno 还是 Bun？</h3>
      <p>Node.js 因其生态系统和 LTS 支持是生产环境最安全的选择。Bun 非常适合需要速度和出色开发体验的新项目。Deno 适合重视默认安全性和 Web API 兼容性的 TypeScript 优先团队。2026 年三者都可以用于生产。</p>

      <h3>如何将 Node.js 应用部署到生产环境？</h3>
      <p>在 VPS 上使用 PM2 进行进程管理，支持集群和自动重启。使用多阶段 Dockerfile 进行容器化部署，通过 Docker Compose 或 Kubernetes 部署。设置 <code>NODE_ENV=production</code>，在 Node.js 前使用 Nginx 作为反向代理，通过 Let's Encrypt 启用 HTTPS，并使用 PM2 内置仪表板或专用 APM 工具进行监控。</p>

      <h3>如何避免 Node.js 中的内存泄漏？</h3>
      <p>
        常见原因和解决方法：（1）未移除的事件监听器——组件销毁时调用 <code>emitter.removeListener()</code>；（2）无淘汰策略的缓存——使用带 TTL 的 LRU 缓存；（3）闭包持有大对象引用——让变量超出作用域；（4）未关闭的数据库连接——始终在 finally 块中释放连接。使用 Chrome DevTools 的内存分析器来查找泄漏。
      </p>
    </>
  );
}

export default function NodeJsGuide({ lang }: { lang: string }) {
  const isChinese = lang === 'zh';
  const t = translations[isChinese ? 'zh' : 'en'];

  return (
    <>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article title and meta */}
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={{ color: '#475569', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.7' }}>
        {t.description}
      </p>

      {/* Render bilingual content */}
      {isChinese ? <ChineseContent /> : <EnglishContent />}
    </>
  );
}
