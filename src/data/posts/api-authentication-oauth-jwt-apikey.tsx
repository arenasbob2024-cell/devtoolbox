'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'API Authentication: OAuth 2.0 vs JWT vs API Key — Complete Guide',
    intro: 'Choosing the right API authentication method is critical for security, scalability, and developer experience. This comprehensive guide compares API Keys, JWT Bearer Tokens, OAuth 2.0, session-based auth, and Basic Auth — with code examples, security considerations, and a decision framework to help you pick the best approach for your project.',

    overviewTitle: 'Why API Authentication Matters',
    overviewDesc1: 'Every API endpoint that handles user data or performs privileged operations must verify the identity of the caller. Without proper authentication, your API is open to data theft, unauthorized modifications, and abuse.',
    overviewDesc2: 'It is important to distinguish between authentication (authn) and authorization (authz). Authentication answers "Who are you?" — it verifies the caller\'s identity. Authorization answers "What can you do?" — it determines which resources and operations the authenticated caller is allowed to access. Most real-world systems need both: authenticate the user first, then check their permissions.',
    overviewDesc3: 'Modern APIs typically use one of five authentication strategies: API Keys, JWT Bearer Tokens, OAuth 2.0, session-based cookies, or HTTP Basic Auth. Each comes with different trade-offs in security, complexity, and use cases.',

    apiKeyTitle: 'API Keys',
    apiKeyDesc: 'An API key is a long, random string assigned to a client application. The client includes this key in every request so the server can identify and authorize the caller. API keys are the simplest form of API authentication.',
    apiKeyHow: 'How API Keys Work',
    apiKeyHowDesc: 'The server generates a unique key per client. The client sends the key in an HTTP header (recommended) or as a query parameter. The server looks up the key in a database, identifies the associated client/project, and applies rate limits and permissions.',
    apiKeyHeaderTitle: 'Header vs Query Parameter',
    apiKeyHeaderDesc: 'Sending keys in headers (e.g., X-API-Key or Authorization) is preferred because query parameters appear in server logs, browser history, and referrer headers, increasing the risk of key leakage.',
    apiKeyPros: 'Pros: Simple to implement, easy for developers to use, good for server-to-server communication, easy to rotate and revoke.',
    apiKeyCons: 'Cons: No user context (identifies app, not user), can be leaked in logs if sent as query param, no built-in expiration, anyone with the key has full access.',
    apiKeyCode: `// Express.js — API Key middleware
const express = require('express');
const app = express();

// API key validation middleware
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  // Look up key in database
  const client = await db.apiKeys.findOne({ key: apiKey, active: true });
  if (!client) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  // Attach client info for downstream use
  req.client = client;
  next();
}

app.get('/api/data', apiKeyAuth, (req, res) => {
  res.json({ data: 'protected resource', client: req.client.name });
});`,

    jwtTitle: 'Bearer Token / JWT Authentication',
    jwtDesc: 'JSON Web Tokens (JWT) provide stateless authentication by encoding user claims directly into the token. The client sends the token in the Authorization header using the Bearer scheme. The server verifies the token signature without any database lookup.',
    jwtStructure: 'A JWT consists of three Base64URL-encoded parts separated by dots: Header (algorithm and token type), Payload (user claims like sub, exp, role), and Signature (cryptographic proof of integrity). Because the payload is only encoded and not encrypted, never store sensitive data in it.',
    jwtStateless: 'Stateless Authentication',
    jwtStatelessDesc: 'Unlike sessions, the server does not need to store any state. The token itself contains all necessary user information. This makes JWT ideal for microservices and horizontally scaled architectures where sharing session stores across instances is impractical.',
    jwtCode: `// Express.js — JWT Bearer Token auth
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Login endpoint — issue token
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    SECRET,
    { expiresIn: '15m', issuer: 'https://api.example.com' }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    SECRET,
    { expiresIn: '7d' }
  );

  res.json({ accessToken, refreshToken });
});

// Auth middleware — verify Bearer token
function bearerAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/api/profile', bearerAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});`,

    oauthTitle: 'OAuth 2.0 Flows',
    oauthDesc: 'OAuth 2.0 is a delegation framework that lets users grant third-party applications limited access to their resources without sharing credentials. It is the standard behind "Sign in with Google/GitHub" buttons and API integrations.',
    oauthAuthCodeTitle: 'Authorization Code Flow',
    oauthAuthCodeDesc: 'The most secure flow for server-side web apps. The user is redirected to the authorization server, logs in, and is redirected back with a short-lived authorization code. The server exchanges this code for tokens via a back-channel request. The access token never touches the browser.',
    oauthClientCredTitle: 'Client Credentials Flow',
    oauthClientCredDesc: 'For machine-to-machine (M2M) communication where no user is involved. The client authenticates directly with the authorization server using its client_id and client_secret to obtain an access token. Common for backend services, cron jobs, and microservice communication.',
    oauthPkceTitle: 'Authorization Code with PKCE',
    oauthPkceDesc: 'Designed for public clients like single-page apps (SPAs) and mobile apps that cannot securely store a client_secret. PKCE (Proof Key for Code Exchange) adds a code_verifier/code_challenge pair to prevent authorization code interception attacks. This is now the recommended flow for all browser-based applications.',
    oauthCode: `// Express.js — OAuth 2.0 Authorization Code Flow
const axios = require('axios');

// Step 1: Redirect user to authorization server
app.get('/auth/github', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: 'https://myapp.com/auth/callback',
    scope: 'read:user user:email',
    state: generateRandomState(), // CSRF protection
  });
  res.redirect(\`https://github.com/login/oauth/authorize?\${params}\`);
});

// Step 2: Handle callback — exchange code for token
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!verifyState(state)) {
    return res.status(403).json({ error: 'Invalid state' });
  }

  // Exchange authorization code for access token
  const tokenRes = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: 'https://myapp.com/auth/callback',
    },
    { headers: { Accept: 'application/json' } }
  );

  const { access_token } = tokenRes.data;

  // Step 3: Use token to fetch user data
  const userRes = await axios.get('https://api.github.com/user', {
    headers: { Authorization: \`Bearer \${access_token}\` },
  });

  // Create session or issue your own JWT
  const jwt = issueJwt(userRes.data);
  res.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'lax' });
  res.redirect('/dashboard');
});`,

    sessionTitle: 'Session-Based Authentication',
    sessionDesc: 'Session-based auth is the traditional approach used by web applications. After login, the server creates a session object stored in a database or in-memory store (like Redis), and sends the client a session ID in a cookie. On every subsequent request, the browser automatically includes the cookie, and the server looks up the session.',
    sessionCsrf: 'Because cookies are sent automatically, session-based auth is vulnerable to Cross-Site Request Forgery (CSRF). To mitigate this, use CSRF tokens — a random value included in forms and verified on the server — and set the SameSite cookie attribute.',
    sessionCode: `// Express.js — Session-based auth with express-session
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // HTTPS only
    httpOnly: true,       // Not accessible via JS
    sameSite: 'lax',     // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  req.session.role = user.role;
  res.json({ message: 'Logged in' });
});

// Auth middleware
function sessionAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// Logout — destroy session
app.post('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});`,

    basicAuthTitle: 'HTTP Basic Authentication',
    basicAuthDesc: 'Basic Auth sends the username and password in the Authorization header, encoded as Base64. The format is Authorization: Basic base64(username:password). It is the simplest HTTP authentication scheme and is defined in RFC 7617.',
    basicAuthWhen: 'Basic Auth is still commonly used for internal APIs, development/staging environments, CI/CD pipelines, and simple webhooks. It should always be used over HTTPS, as Base64 is encoding, not encryption — the credentials can be trivially decoded.',
    basicAuthCode: `// Express.js — Basic Auth middleware
function basicAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="API"');
    return res.status(401).json({ error: 'Basic auth required' });
  }

  const base64 = header.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  // Validate credentials (use timing-safe comparison!)
  const valid = username === process.env.API_USER
    && crypto.timingSafeEqual(
         Buffer.from(password),
         Buffer.from(process.env.API_PASS)
       );

  if (!valid) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }
  req.user = { username };
  next();
}

// Usage
app.get('/api/internal', basicAuth, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user.username });
});

// Client-side request with Basic Auth
// curl -u username:password https://api.example.com/internal
// fetch('https://api.example.com/internal', {
//   headers: { Authorization: 'Basic ' + btoa('user:pass') }
// });`,

    comparisonTitle: 'Authentication Methods Comparison',
    comparisonDesc: 'Use this table to quickly compare all five authentication methods across key dimensions:',

    storageTitle: 'Token Storage Strategies',
    storageDesc: 'Where you store authentication tokens has a direct impact on security. The three main options each have different vulnerability profiles:',
    storageHttpOnly: 'httpOnly Cookies (Recommended)',
    storageHttpOnlyDesc: 'Tokens stored in httpOnly cookies cannot be accessed by JavaScript, making them immune to XSS attacks. The browser automatically sends them with requests. However, cookies are vulnerable to CSRF attacks, so you must use SameSite attributes and CSRF tokens.',
    storageLocal: 'localStorage',
    storageLocalDesc: 'Easy to implement and works well with SPAs. However, localStorage is accessible to any JavaScript on the page, making it vulnerable to XSS attacks. If an attacker injects malicious script, they can steal the token.',
    storageMemory: 'In-Memory (JavaScript Variable)',
    storageMemoryDesc: 'The most secure option against both XSS and CSRF because the token exists only in a JavaScript closure or variable. The downside is that tokens are lost on page refresh, requiring silent re-authentication.',
    storageCode: `// httpOnly Cookie approach (server-side)
res.cookie('access_token', token, {
  httpOnly: true,    // JS cannot read this cookie
  secure: true,      // HTTPS only
  sameSite: 'strict', // No cross-site sending
  maxAge: 900000,    // 15 minutes
  path: '/',
});

// localStorage approach (client-side) — less secure
localStorage.setItem('access_token', token);

// fetch with localStorage token
fetch('/api/data', {
  headers: { Authorization: \`Bearer \${localStorage.getItem('access_token')}\` }
});

// In-memory approach (client-side) — most secure
let accessToken = null; // lives only in closure

async function login(email, password) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  accessToken = data.accessToken; // stored only in memory
}

async function fetchProtected(url) {
  return fetch(url, {
    headers: { Authorization: \`Bearer \${accessToken}\` },
  });
}`,

    refreshTitle: 'Token Refresh Strategies',
    refreshDesc: 'Short-lived access tokens improve security but require a mechanism to obtain new tokens without re-authentication. Here are the main refresh strategies:',
    refreshRotation: 'Refresh Token Rotation',
    refreshRotationDesc: 'Each time a refresh token is used, a new refresh token is issued and the old one is invalidated. If a stolen refresh token is used after the legitimate user has already refreshed, the server detects the reuse and invalidates the entire token family, forcing re-authentication.',
    refreshSliding: 'Sliding Window Expiration',
    refreshSlidingDesc: 'The token expiration is extended with each successful request. If the user is actively using the app, they stay logged in. After a period of inactivity, the token expires. This is common in session-based systems.',
    refreshSilent: 'Silent Refresh (for SPAs)',
    refreshSilentDesc: 'The SPA uses a hidden iframe to call the authorization server and obtain a new access token without user interaction. This approach is being replaced by refresh token rotation with PKCE for better security.',
    refreshCode: `// Express.js — Refresh Token Rotation
const refreshTokens = new Map(); // In production, use Redis/DB

app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const payload = jwt.verify(refreshToken, SECRET);

    // Check if this refresh token has already been used (rotation)
    const stored = refreshTokens.get(payload.sub);
    if (!stored || stored.token !== refreshToken) {
      // Token reuse detected! Invalidate all tokens for this user
      refreshTokens.delete(payload.sub);
      return res.status(401).json({ error: 'Token reuse detected' });
    }

    // Issue new token pair
    const newAccessToken = jwt.sign(
      { sub: payload.sub, role: payload.role },
      SECRET,
      { expiresIn: '15m' }
    );
    const newRefreshToken = jwt.sign(
      { sub: payload.sub, type: 'refresh' },
      SECRET,
      { expiresIn: '7d' }
    );

    // Rotate: store new refresh token, invalidate old
    refreshTokens.set(payload.sub, {
      token: newRefreshToken,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});`,

    rateLimitTitle: 'Rate Limiting & Throttling',
    rateLimitDesc: 'Rate limiting protects your API from abuse and ensures fair usage among clients. It is especially important for public APIs that use API keys, where a single key could otherwise consume all available resources.',
    rateLimitHow: 'Most rate limiters use a sliding window or token bucket algorithm. When a client exceeds the limit, the server returns HTTP 429 Too Many Requests with a Retry-After header indicating when the client can retry.',
    rateLimitCode: `// Express.js — Rate limiting per API key
const rateLimit = require('express-rate-limit');

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                   // 100 requests per window
  standardHeaders: true,      // Return rate limit info in headers
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
  keyGenerator: (req) => {
    // Rate limit by API key or IP
    return req.headers['x-api-key'] || req.ip;
  },
});

app.use('/api/', globalLimiter);

// Stricter limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 min
  message: { error: 'Too many login attempts' },
});

app.use('/auth/login', authLimiter);

// Custom response headers:
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 73
// X-RateLimit-Reset: 1672531200
// Retry-After: 900 (seconds, only on 429)`,

    bestPracticesTitle: 'Security Best Practices',
    bp1: 'Always use HTTPS — Authentication tokens sent over HTTP can be intercepted by anyone on the network. Never deploy an API that accepts credentials over plain HTTP.',
    bp2: 'Use short-lived access tokens — Set access token expiration to 15-60 minutes. Combine with refresh tokens for longer sessions. A compromised short-lived token limits the window of attack.',
    bp3: 'Restrict scopes and permissions — Follow the principle of least privilege. API keys and OAuth tokens should only have the minimum permissions needed. Use granular scopes like read:users instead of broad admin access.',
    bp4: 'Implement key rotation — API keys and secrets should be rotated regularly. Support multiple active keys during the rotation period so clients can transition without downtime.',
    bp5: 'Validate and sanitize all input — Even with authentication, never trust client input. Validate token formats, check expiration, verify audience and issuer claims.',
    bp6: 'Log and monitor authentication events — Track failed login attempts, token refreshes, and unusual access patterns. Set up alerts for brute-force attempts and token reuse.',
    bp7: 'Use timing-safe comparisons — When comparing secrets, API keys, or tokens, always use constant-time comparison functions to prevent timing attacks.',
    bp8: 'Never expose secrets in client-side code — Client secrets, signing keys, and database credentials must never appear in frontend JavaScript, mobile app bundles, or public repositories.',

    faq1q: 'When should I use API Keys vs OAuth 2.0?',
    faq1a: 'Use API Keys for simple server-to-server integrations where you need to identify the calling application. Use OAuth 2.0 when you need delegated user authorization — i.e., when a third-party app needs to act on behalf of a user. OAuth provides granular scopes and user consent, while API keys are all-or-nothing.',
    faq2q: 'Is JWT better than session-based authentication?',
    faq2a: 'Neither is universally better. JWT is ideal for stateless, distributed systems (microservices, mobile APIs) because no server-side storage is needed. Session-based auth is better when you need easy revocation (just delete the session), smaller payloads, and simpler security model. Many production systems use both: JWT for API auth and sessions for web UI.',
    faq3q: 'How do I secure API keys in a frontend application?',
    faq3a: 'You cannot securely store API keys in frontend code — any secret in client-side JavaScript is exposed. Instead, create a backend proxy that holds the API key and forwards requests, use OAuth with PKCE for user-facing auth, or use restricted API keys with domain/IP allowlists and strict rate limits.',
    faq4q: 'What is the difference between authentication and authorization?',
    faq4a: 'Authentication (authn) verifies identity — confirming who the caller is (e.g., validating a JWT signature or checking credentials). Authorization (authz) determines permissions — what the authenticated caller is allowed to do (e.g., checking if the user has the "admin" role). Authentication always comes first; authorization depends on it.',
    faq5q: 'Should I build my own auth system or use a service?',
    faq5a: 'For most applications, use a proven auth service or library (Auth0, Firebase Auth, Supabase Auth, Passport.js). Rolling your own authentication is error-prone and security-critical. Build custom auth only if you have very specific requirements and a security-experienced team to maintain it.',

    tryTools: 'Try our related security tools',
  },
  zh: {
    title: 'API 认证方式详解：OAuth 2.0 vs JWT vs API Key 完整指南',
    intro: '选择正确的 API 认证方式对安全性、可扩展性和开发体验至关重要。本指南全面比较 API Key、JWT Bearer Token、OAuth 2.0、基于 Session 的认证和 Basic Auth — 包含代码示例、安全考量和决策框架，帮助你为项目选择最佳方案。',

    overviewTitle: '为什么 API 认证如此重要',
    overviewDesc1: '每个处理用户数据或执行特权操作的 API 端点都必须验证调用者的身份。没有适当的认证，你的 API 将面临数据被盗、未授权修改和滥用的风险。',
    overviewDesc2: '区分认证（authn）和授权（authz）非常重要。认证回答"你是谁？"— 验证调用者的身份。授权回答"你能做什么？"— 确定已认证的调用者可以访问哪些资源和操作。大多数实际系统两者都需要：先认证用户，然后检查其权限。',
    overviewDesc3: '现代 API 通常使用五种认证策略之一：API Key、JWT Bearer Token、OAuth 2.0、基于 Session 的 Cookie 或 HTTP Basic Auth。每种方式在安全性、复杂度和适用场景上都有不同的权衡。',

    apiKeyTitle: 'API Key 认证',
    apiKeyDesc: 'API Key 是分配给客户端应用的一串长随机字符串。客户端在每次请求中包含此密钥，以便服务器识别和授权调用者。API Key 是最简单的 API 认证形式。',
    apiKeyHow: 'API Key 工作原理',
    apiKeyHowDesc: '服务器为每个客户端生成唯一密钥。客户端在 HTTP 头（推荐）或查询参数中发送密钥。服务器在数据库中查找密钥，识别关联的客户端/项目，并应用速率限制和权限。',
    apiKeyHeaderTitle: 'Header vs 查询参数',
    apiKeyHeaderDesc: '在头部（如 X-API-Key 或 Authorization）中发送密钥是首选方式，因为查询参数会出现在服务器日志、浏览器历史记录和 Referer 头中，增加密钥泄露风险。',
    apiKeyPros: '优点：实现简单，开发者易于使用，适合服务器间通信，易于轮换和撤销。',
    apiKeyCons: '缺点：没有用户上下文（识别应用而非用户），如作为查询参数可能泄露在日志中，没有内置过期机制，任何拥有密钥的人都有完全访问权限。',
    apiKeyCode: `// Express.js — API Key 中间件
const express = require('express');
const app = express();

// API Key 验证中间件
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  // 在数据库中查找密钥
  const client = await db.apiKeys.findOne({ key: apiKey, active: true });
  if (!client) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  // 附加客户端信息供后续使用
  req.client = client;
  next();
}

app.get('/api/data', apiKeyAuth, (req, res) => {
  res.json({ data: 'protected resource', client: req.client.name });
});`,

    jwtTitle: 'Bearer Token / JWT 认证',
    jwtDesc: 'JSON Web Token (JWT) 通过将用户声明直接编码到令牌中来提供无状态认证。客户端使用 Bearer 方案在 Authorization 头中发送令牌。服务器无需任何数据库查询即可验证令牌签名。',
    jwtStructure: 'JWT 由三个 Base64URL 编码的部分组成，用点分隔：Header（算法和令牌类型）、Payload（用户声明如 sub、exp、role）和 Signature（完整性的加密证明）。因为负载只是编码而非加密，所以永远不要在其中存储敏感数据。',
    jwtStateless: '无状态认证',
    jwtStatelessDesc: '与 Session 不同，服务器不需要存储任何状态。令牌本身包含所有必要的用户信息。这使得 JWT 非常适合微服务和水平扩展架构，在这些场景中跨实例共享 Session 存储是不切实际的。',
    jwtCode: `// Express.js — JWT Bearer Token 认证
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// 登录端点 — 颁发令牌
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    SECRET,
    { expiresIn: '15m', issuer: 'https://api.example.com' }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    SECRET,
    { expiresIn: '7d' }
  );

  res.json({ accessToken, refreshToken });
});

// 认证中间件 — 验证 Bearer 令牌
function bearerAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

app.get('/api/profile', bearerAuth, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});`,

    oauthTitle: 'OAuth 2.0 授权流程',
    oauthDesc: 'OAuth 2.0 是一个委托框架，允许用户授予第三方应用对其资源的有限访问权限，而无需共享凭证。它是"使用 Google/GitHub 登录"按钮和 API 集成背后的标准。',
    oauthAuthCodeTitle: '授权码流程（Authorization Code）',
    oauthAuthCodeDesc: '最安全的服务端 Web 应用流程。用户被重定向到授权服务器，登录后带着短期授权码被重定向回来。服务器通过后端通道请求将授权码换取令牌。访问令牌永远不会接触浏览器。',
    oauthClientCredTitle: '客户端凭证流程（Client Credentials）',
    oauthClientCredDesc: '用于无用户参与的机器间（M2M）通信。客户端使用 client_id 和 client_secret 直接向授权服务器认证以获取访问令牌。常用于后端服务、定时任务和微服务通信。',
    oauthPkceTitle: '授权码 + PKCE 流程',
    oauthPkceDesc: '专为无法安全存储 client_secret 的公共客户端（如单页应用 SPA 和移动应用）设计。PKCE（Proof Key for Code Exchange）添加了 code_verifier/code_challenge 对来防止授权码拦截攻击。这是目前推荐的所有浏览器端应用流程。',
    oauthCode: `// Express.js — OAuth 2.0 授权码流程
const axios = require('axios');

// 第1步：将用户重定向到授权服务器
app.get('/auth/github', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: 'https://myapp.com/auth/callback',
    scope: 'read:user user:email',
    state: generateRandomState(), // CSRF 防护
  });
  res.redirect(\`https://github.com/login/oauth/authorize?\${params}\`);
});

// 第2步：处理回调 — 用授权码换取令牌
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!verifyState(state)) {
    return res.status(403).json({ error: 'Invalid state' });
  }

  // 用授权码换取访问令牌
  const tokenRes = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: 'https://myapp.com/auth/callback',
    },
    { headers: { Accept: 'application/json' } }
  );

  const { access_token } = tokenRes.data;

  // 第3步：使用令牌获取用户数据
  const userRes = await axios.get('https://api.github.com/user', {
    headers: { Authorization: \`Bearer \${access_token}\` },
  });

  // 创建 Session 或颁发自己的 JWT
  const jwt = issueJwt(userRes.data);
  res.cookie('token', jwt, { httpOnly: true, secure: true, sameSite: 'lax' });
  res.redirect('/dashboard');
});`,

    sessionTitle: '基于 Session 的认证',
    sessionDesc: '基于 Session 的认证是 Web 应用的传统方式。登录后，服务器创建一个存储在数据库或内存存储（如 Redis）中的 Session 对象，并通过 Cookie 向客户端发送 Session ID。在后续每次请求中，浏览器自动携带 Cookie，服务器查找对应的 Session。',
    sessionCsrf: '由于 Cookie 会自动发送，基于 Session 的认证容易受到跨站请求伪造（CSRF）攻击。为缓解此问题，使用 CSRF 令牌 — 包含在表单中并在服务器端验证的随机值 — 并设置 SameSite Cookie 属性。',
    sessionCode: `// Express.js — 使用 express-session 的 Session 认证
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,        // 仅 HTTPS
    httpOnly: true,       // JS 无法访问
    sameSite: 'lax',     // CSRF 防护
    maxAge: 24 * 60 * 60 * 1000, // 24 小时
  },
}));

// 登录
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users.findOne({ email });

  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.userId = user.id;
  req.session.role = user.role;
  res.json({ message: 'Logged in' });
});

// 认证中间件
function sessionAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

// 登出 — 销毁 Session
app.post('/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});`,

    basicAuthTitle: 'HTTP Basic 认证',
    basicAuthDesc: 'Basic Auth 在 Authorization 头中发送 Base64 编码的用户名和密码。格式为 Authorization: Basic base64(username:password)。它是最简单的 HTTP 认证方案，定义在 RFC 7617 中。',
    basicAuthWhen: 'Basic Auth 仍然常用于内部 API、开发/测试环境、CI/CD 流水线和简单的 Webhook。由于 Base64 是编码而非加密，凭证可以被轻易解码，因此必须始终通过 HTTPS 使用。',
    basicAuthCode: `// Express.js — Basic Auth 中间件
function basicAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="API"');
    return res.status(401).json({ error: 'Basic auth required' });
  }

  const base64 = header.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  // 验证凭证（使用时序安全比较！）
  const valid = username === process.env.API_USER
    && crypto.timingSafeEqual(
         Buffer.from(password),
         Buffer.from(process.env.API_PASS)
       );

  if (!valid) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }
  req.user = { username };
  next();
}

// 使用
app.get('/api/internal', basicAuth, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user.username });
});

// 客户端使用 Basic Auth 请求
// curl -u username:password https://api.example.com/internal
// fetch('https://api.example.com/internal', {
//   headers: { Authorization: 'Basic ' + btoa('user:pass') }
// });`,

    comparisonTitle: '认证方式对比表',
    comparisonDesc: '使用此表快速比较五种认证方式的关键维度：',

    storageTitle: '令牌存储策略',
    storageDesc: '令牌存储位置直接影响安全性。三种主要选项各有不同的漏洞特征：',
    storageHttpOnly: 'httpOnly Cookie（推荐）',
    storageHttpOnlyDesc: '存储在 httpOnly Cookie 中的令牌无法被 JavaScript 访问，因此免受 XSS 攻击。浏览器会自动在请求中携带它们。但 Cookie 容易受到 CSRF 攻击，所以必须使用 SameSite 属性和 CSRF 令牌。',
    storageLocal: 'localStorage',
    storageLocalDesc: '实现简单，与 SPA 配合良好。但 localStorage 可被页面上的任何 JavaScript 访问，容易受到 XSS 攻击。如果攻击者注入恶意脚本，就能窃取令牌。',
    storageMemory: '内存变量（JavaScript Variable）',
    storageMemoryDesc: '对 XSS 和 CSRF 最安全的选项，因为令牌只存在于 JavaScript 闭包或变量中。缺点是页面刷新时令牌会丢失，需要静默重新认证。',
    storageCode: `// httpOnly Cookie 方式（服务端）
res.cookie('access_token', token, {
  httpOnly: true,    // JS 无法读取此 Cookie
  secure: true,      // 仅 HTTPS
  sameSite: 'strict', // 禁止跨站发送
  maxAge: 900000,    // 15 分钟
  path: '/',
});

// localStorage 方式（客户端）— 安全性较低
localStorage.setItem('access_token', token);

// 使用 localStorage 令牌发起 fetch 请求
fetch('/api/data', {
  headers: { Authorization: \`Bearer \${localStorage.getItem('access_token')}\` }
});

// 内存变量方式（客户端）— 最安全
let accessToken = null; // 仅存在于闭包中

async function login(email, password) {
  const res = await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  accessToken = data.accessToken; // 仅存储在内存中
}

async function fetchProtected(url) {
  return fetch(url, {
    headers: { Authorization: \`Bearer \${accessToken}\` },
  });
}`,

    refreshTitle: '令牌刷新策略',
    refreshDesc: '短期访问令牌提高了安全性，但需要机制来获取新令牌而无需重新认证。以下是主要的刷新策略：',
    refreshRotation: '刷新令牌轮换（Refresh Token Rotation）',
    refreshRotationDesc: '每次使用刷新令牌时，都会颁发新的刷新令牌并使旧令牌失效。如果被盗的刷新令牌在合法用户已经刷新后被使用，服务器会检测到重用并使整个令牌族失效，强制重新认证。',
    refreshSliding: '滑动窗口过期',
    refreshSlidingDesc: '每次成功请求都会延长令牌过期时间。如果用户正在活跃使用应用，则保持登录状态。经过一段时间的不活动后，令牌过期。这在基于 Session 的系统中很常见。',
    refreshSilent: '静默刷新（适用于 SPA）',
    refreshSilentDesc: 'SPA 使用隐藏的 iframe 调用授权服务器，在无需用户交互的情况下获取新的访问令牌。出于安全考虑，这种方式正在被带有 PKCE 的刷新令牌轮换所取代。',
    refreshCode: `// Express.js — 刷新令牌轮换
const refreshTokens = new Map(); // 生产环境使用 Redis/数据库

app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }

  try {
    const payload = jwt.verify(refreshToken, SECRET);

    // 检查此刷新令牌是否已被使用过（轮换检测）
    const stored = refreshTokens.get(payload.sub);
    if (!stored || stored.token !== refreshToken) {
      // 检测到令牌重用！使该用户的所有令牌失效
      refreshTokens.delete(payload.sub);
      return res.status(401).json({ error: 'Token reuse detected' });
    }

    // 颁发新的令牌对
    const newAccessToken = jwt.sign(
      { sub: payload.sub, role: payload.role },
      SECRET,
      { expiresIn: '15m' }
    );
    const newRefreshToken = jwt.sign(
      { sub: payload.sub, type: 'refresh' },
      SECRET,
      { expiresIn: '7d' }
    );

    // 轮换：存储新刷新令牌，使旧令牌失效
    refreshTokens.set(payload.sub, {
      token: newRefreshToken,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});`,

    rateLimitTitle: '速率限制与节流',
    rateLimitDesc: '速率限制保护你的 API 免受滥用并确保客户端之间的公平使用。对于使用 API Key 的公共 API 尤为重要，否则单个密钥可能消耗所有可用资源。',
    rateLimitHow: '大多数速率限制器使用滑动窗口或令牌桶算法。当客户端超过限制时，服务器返回 HTTP 429 Too Many Requests 和 Retry-After 头，指示客户端何时可以重试。',
    rateLimitCode: `// Express.js — 按 API Key 的速率限制
const rateLimit = require('express-rate-limit');

// 全局速率限制
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100,                   // 每窗口 100 个请求
  standardHeaders: true,      // 在头部返回速率限制信息
  legacyHeaders: false,
  message: { error: '请求过多，请稍后重试' },
  keyGenerator: (req) => {
    // 按 API Key 或 IP 进行速率限制
    return req.headers['x-api-key'] || req.ip;
  },
});

app.use('/api/', globalLimiter);

// 认证端点的更严格限制
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 每 15 分钟仅 5 次登录尝试
  message: { error: '登录尝试过多' },
});

app.use('/auth/login', authLimiter);

// 自定义响应头：
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 73
// X-RateLimit-Reset: 1672531200
// Retry-After: 900（秒，仅在 429 时）`,

    bestPracticesTitle: '安全最佳实践',
    bp1: '始终使用 HTTPS — 通过 HTTP 发送的认证令牌可被网络上的任何人截获。永远不要部署通过明文 HTTP 接受凭证的 API。',
    bp2: '使用短期访问令牌 — 将访问令牌过期时间设为 15-60 分钟。配合刷新令牌处理更长的会话。泄露的短期令牌限制了攻击窗口。',
    bp3: '限制作用域和权限 — 遵循最小权限原则。API Key 和 OAuth 令牌应只具有所需的最小权限。使用细粒度作用域如 read:users 而非宽泛的 admin 访问。',
    bp4: '实施密钥轮换 — API Key 和密钥应定期轮换。在轮换期间支持多个活跃密钥，以便客户端平滑过渡无需停机。',
    bp5: '验证和清理所有输入 — 即使有认证，也永远不要信任客户端输入。验证令牌格式，检查过期时间，核实 audience 和 issuer 声明。',
    bp6: '记录和监控认证事件 — 跟踪失败的登录尝试、令牌刷新和异常访问模式。为暴力攻击和令牌重用设置告警。',
    bp7: '使用时序安全比较 — 比较密钥、API Key 或令牌时，始终使用恒定时间比较函数以防止时序攻击。',
    bp8: '永远不要在客户端代码中暴露密钥 — 客户端密钥、签名密钥和数据库凭证永远不能出现在前端 JavaScript、移动应用包或公共仓库中。',

    faq1q: '什么时候该用 API Key，什么时候该用 OAuth 2.0？',
    faq1a: '对于需要识别调用应用的简单服务器间集成，使用 API Key。当需要委托用户授权时使用 OAuth 2.0 — 即第三方应用需要代表用户操作时。OAuth 提供细粒度的作用域和用户同意，而 API Key 是全有或全无的。',
    faq2q: 'JWT 比基于 Session 的认证更好吗？',
    faq2a: '两者没有绝对优劣之分。JWT 适合无状态的分布式系统（微服务、移动 API），因为不需要服务端存储。基于 Session 的认证在需要轻松撤销（直接删除 Session）、更小的负载和更简单的安全模型时更好。许多生产系统同时使用两者：JWT 用于 API 认证，Session 用于 Web UI。',
    faq3q: '如何在前端应用中保护 API Key？',
    faq3a: '你无法在前端代码中安全存储 API Key — 客户端 JavaScript 中的任何密钥都会暴露。替代方案：创建持有 API Key 并转发请求的后端代理，使用 OAuth PKCE 进行面向用户的认证，或使用带有域名/IP 白名单和严格速率限制的受限 API Key。',
    faq4q: '认证（Authentication）和授权（Authorization）有什么区别？',
    faq4a: '认证（authn）验证身份 — 确认调用者是谁（例如验证 JWT 签名或检查凭证）。授权（authz）确定权限 — 已认证的调用者被允许做什么（例如检查用户是否具有 "admin" 角色）。认证总是在前；授权依赖于认证。',
    faq5q: '应该自建认证系统还是使用现有服务？',
    faq5a: '对于大多数应用，使用经过验证的认证服务或库（Auth0、Firebase Auth、Supabase Auth、Passport.js）。自建认证容易出错且属于安全关键部分。仅当你有非常特殊的需求且有安全经验丰富的团队来维护时，才自建认证。',

    tryTools: '试试我们相关的安全工具',
  },
};

export default function ApiAuthenticationOauthJwtApikey({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Section 1: Overview */}
      <h2 style={h2Style}>{ct.overviewTitle}</h2>
      <p style={pStyle}>{ct.overviewDesc1}</p>
      <p style={pStyle}>{ct.overviewDesc2}</p>
      <p style={pStyle}>{ct.overviewDesc3}</p>

      {/* Section 2: API Keys */}
      <h2 style={h2Style}>{ct.apiKeyTitle}</h2>
      <p style={pStyle}>{ct.apiKeyDesc}</p>
      <h3 style={h3Style}>{ct.apiKeyHow}</h3>
      <p style={pStyle}>{ct.apiKeyHowDesc}</p>
      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.apiKeyHeaderTitle}</h3>
      <p style={pStyle}>{ct.apiKeyHeaderDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {ct.apiKeyPros}
        </div>
        <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {ct.apiKeyCons}
        </div>
      </div>
      <pre style={codeStyle}><code>{ct.apiKeyCode}</code></pre>

      {/* Section 3: JWT / Bearer Token */}
      <h2 style={h2Style}>{ct.jwtTitle}</h2>
      <p style={pStyle}>{ct.jwtDesc}</p>
      <p style={pStyle}>{ct.jwtStructure}</p>
      <h3 style={h3Style}>{ct.jwtStateless}</h3>
      <p style={pStyle}>{ct.jwtStatelessDesc}</p>
      <pre style={codeStyle}><code>{ct.jwtCode}</code></pre>

      {/* Section 4: OAuth 2.0 */}
      <h2 style={h2Style}>{ct.oauthTitle}</h2>
      <p style={pStyle}>{ct.oauthDesc}</p>
      <h3 style={h3Style}>{ct.oauthAuthCodeTitle}</h3>
      <p style={pStyle}>{ct.oauthAuthCodeDesc}</p>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.oauthClientCredTitle}</h3>
      <p style={pStyle}>{ct.oauthClientCredDesc}</p>
      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.oauthPkceTitle}</h3>
      <p style={pStyle}>{ct.oauthPkceDesc}</p>
      <pre style={codeStyle}><code>{ct.oauthCode}</code></pre>

      {/* Section 5: Session-based Auth */}
      <h2 style={h2Style}>{ct.sessionTitle}</h2>
      <p style={pStyle}>{ct.sessionDesc}</p>
      <p style={pStyle}>{ct.sessionCsrf}</p>
      <pre style={codeStyle}><code>{ct.sessionCode}</code></pre>

      {/* Section 6: Basic Auth */}
      <h2 style={h2Style}>{ct.basicAuthTitle}</h2>
      <p style={pStyle}>{ct.basicAuthDesc}</p>
      <p style={pStyle}>{ct.basicAuthWhen}</p>
      <pre style={codeStyle}><code>{ct.basicAuthCode}</code></pre>

      {/* Section 7: Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Method</th>
              <th style={thStyle}>Security</th>
              <th style={thStyle}>Complexity</th>
              <th style={thStyle}>Stateless</th>
              <th style={thStyle}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['API Key', 'Low-Medium', 'Low', 'Yes', 'Server-to-server, public APIs'],
              ['JWT Bearer', 'Medium-High', 'Medium', 'Yes', 'SPAs, mobile apps, microservices'],
              ['OAuth 2.0', 'High', 'High', 'Yes', 'Third-party integrations, SSO'],
              ['Session/Cookie', 'Medium-High', 'Medium', 'No', 'Traditional web apps'],
              ['Basic Auth', 'Low', 'Low', 'Yes', 'Internal APIs, dev/staging'],
            ].map(([method, security, complexity, stateless, useCase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{method}</td>
                <td style={tdStyle}>{security}</td>
                <td style={tdStyle}>{complexity}</td>
                <td style={tdStyle}>{stateless}</td>
                <td style={tdStyle}>{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 8: Token Storage */}
      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.storageHttpOnly, desc: ct.storageHttpOnlyDesc, color: '#22c55e' },
          { title: ct.storageLocal, desc: ct.storageLocalDesc, color: '#f59e0b' },
          { title: ct.storageMemory, desc: ct.storageMemoryDesc, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{ct.storageCode}</code></pre>

      {/* Section 9: Token Refresh */}
      <h2 style={h2Style}>{ct.refreshTitle}</h2>
      <p style={pStyle}>{ct.refreshDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.refreshRotation, desc: ct.refreshRotationDesc, color: '#8b5cf6' },
          { title: ct.refreshSliding, desc: ct.refreshSlidingDesc, color: '#ec4899' },
          { title: ct.refreshSilent, desc: ct.refreshSilentDesc, color: '#06b6d4' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{ct.refreshCode}</code></pre>

      {/* Section 10: Rate Limiting */}
      <h2 style={h2Style}>{ct.rateLimitTitle}</h2>
      <p style={pStyle}>{ct.rateLimitDesc}</p>
      <p style={pStyle}>{ct.rateLimitHow}</p>
      <pre style={codeStyle}><code>{ct.rateLimitCode}</code></pre>

      {/* Section 11: Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.bp1}</li>
        <li>{ct.bp2}</li>
        <li>{ct.bp3}</li>
        <li>{ct.bp4}</li>
        <li>{ct.bp5}</li>
        <li>{ct.bp6}</li>
        <li>{ct.bp7}</li>
        <li>{ct.bp8}</li>
      </ul>

      {/* Related Tools CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/jwt-decoder`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JWT Decoder →
          </Link>
          <Link href={`/${lang}/tools/base64`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Base64 Encoder →
          </Link>
          <Link href={`/${lang}/tools/hash-generator`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Hash Generator →
          </Link>
        </div>
      </div>

      {/* Section 12: FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
