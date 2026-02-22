'use client';

import Link from 'next/link';

export default function JwtAuthenticationGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is JWT Authentication?</h2>
      <p>
        <strong>JSON Web Token (JWT)</strong> is an open standard (RFC 7519) for securely transmitting information between parties as a compact, URL-safe token. JWTs are the most widely used method for implementing stateless authentication in modern web applications, APIs, and microservices. Unlike session-based authentication where the server stores session data, JWT authentication is stateless -- the token itself contains all the information needed to verify the user.
      </p>
      <p>
        This guide covers JWT structure, implementation in Node.js and frontend applications, security best practices, token refresh strategies, and common pitfalls to avoid.
      </p>

      <h2>JWT Structure: Header, Payload, Signature</h2>
      <p>
        A JWT consists of three Base64URL-encoded parts separated by dots: <code>header.payload.signature</code>
      </p>
      <pre><code className="language-text">{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Part 1 - Header (algorithm and token type):
{
  "alg": "HS256",
  "typ": "JWT"
}

Part 2 - Payload (claims/data):
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

Part 3 - Signature:
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)`}</code></pre>

      <h3>Standard JWT Claims</h3>
      <table>
        <thead>
          <tr><th>Claim</th><th>Full Name</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td><code>iss</code></td><td>Issuer</td><td>Who issued the token</td></tr>
          <tr><td><code>sub</code></td><td>Subject</td><td>Who the token represents (user ID)</td></tr>
          <tr><td><code>aud</code></td><td>Audience</td><td>Intended recipient of the token</td></tr>
          <tr><td><code>exp</code></td><td>Expiration</td><td>When the token expires (Unix timestamp)</td></tr>
          <tr><td><code>nbf</code></td><td>Not Before</td><td>Token is not valid before this time</td></tr>
          <tr><td><code>iat</code></td><td>Issued At</td><td>When the token was created</td></tr>
          <tr><td><code>jti</code></td><td>JWT ID</td><td>Unique identifier for the token</td></tr>
        </tbody>
      </table>

      <h2>Server-Side Implementation (Node.js/Express)</h2>

      <h3>Setting Up JWT Authentication</h3>
      <pre><code className="language-typescript">{`// auth.ts - JWT authentication module
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

// Configuration
const JWT_SECRET = process.env.JWT_SECRET!; // Use strong, random secret
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRY = '15m';   // Short-lived
const REFRESH_TOKEN_EXPIRY = '7d';   // Long-lived

// Types
interface UserPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// Generate token pair
function generateTokens(user: UserPayload): TokenPair {
  const accessToken = jwt.sign(
    {
      sub: user.userId,
      email: user.email,
      role: user.role,
      type: 'access',
    },
    JWT_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      issuer: 'myapp.com',
      audience: 'myapp.com',
    }
  );

  const refreshToken = jwt.sign(
    {
      sub: user.userId,
      type: 'refresh',
      jti: generateTokenId(), // Unique ID for revocation
    },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}

// Verify access token
function verifyAccessToken(token: string): UserPayload {
  const decoded = jwt.verify(token, JWT_SECRET, {
    issuer: 'myapp.com',
    audience: 'myapp.com',
  }) as jwt.JwtPayload;

  return {
    userId: decoded.sub!,
    email: decoded.email,
    role: decoded.role,
  };
}

function generateTokenId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}`}</code></pre>

      <h3>Login and Registration Endpoints</h3>
      <pre><code className="language-typescript">{`// routes/auth.ts
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || password.length < 8) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if user exists
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password with bcrypt
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await db.user.create({
      data: { email, password: hashedPassword, name, role: 'user' },
    });

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token hash in database
    await db.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(tokens.refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/auth/refresh',
    });

    res.status(201).json({
      accessToken: tokens.accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await db.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(tokens.refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    res.json({
      accessToken: tokens.accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});`}</code></pre>

      <h3>Authentication Middleware</h3>
      <pre><code className="language-typescript">{`// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

// Authentication middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

// Role-based authorization middleware
function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

// Usage in routes
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.delete('/api/users/:id', authenticate, authorize('admin'), (req, res) => {
  // Only admins can delete users
});`}</code></pre>

      <h2>Token Refresh Strategy</h2>
      <pre><code className="language-typescript">{`// POST /auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as jwt.JwtPayload;

    // Check if token exists in database (not revoked)
    const stored = await db.refreshToken.findFirst({
      where: {
        userId: decoded.sub!,
        tokenHash: hashToken(refreshToken),
        expiresAt: { gt: new Date() },
      },
    });

    if (!stored) {
      // Token was revoked or does not exist -- possible token theft
      // Revoke ALL refresh tokens for this user (security measure)
      await db.refreshToken.deleteMany({
        where: { userId: decoded.sub! },
      });
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Get user data
    const user = await db.user.findUnique({
      where: { id: decoded.sub! },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Rotate refresh token (issue new pair)
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Delete old refresh token
    await db.refreshToken.delete({ where: { id: stored.id } });

    // Store new refresh token
    await db.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: hashToken(tokens.refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/auth/refresh',
    });

    res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// POST /auth/logout
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    // Delete refresh token from database
    await db.refreshToken.deleteMany({
      where: {
        userId: req.user!.userId,
        tokenHash: hashToken(refreshToken),
      },
    });
  }

  res.clearCookie('refreshToken', { path: '/auth/refresh' });
  res.json({ message: 'Logged out successfully' });
});`}</code></pre>

      <h2>Frontend Implementation</h2>
      <pre><code className="language-typescript">{`// lib/auth.ts - Frontend authentication client
class AuthClient {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  // Login and store access token in memory
  async login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    this.accessToken = data.accessToken;
    return data.user;
  }

  // Authenticated fetch with automatic token refresh
  async authFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Ensure we have a valid token
    if (!this.accessToken) {
      this.accessToken = await this.refresh();
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: \`Bearer \${this.accessToken}\`,
      },
      credentials: 'include',
    });

    // If token expired, refresh and retry
    if (response.status === 401) {
      const errorData = await response.json();
      if (errorData.code === 'TOKEN_EXPIRED') {
        this.accessToken = await this.refresh();

        // Retry the original request
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: \`Bearer \${this.accessToken}\`,
          },
          credentials: 'include',
        });
      }
      throw new Error('Unauthorized');
    }

    return response;
  }

  // Refresh access token using refresh token cookie
  private async refresh(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        const data = await response.json();
        this.accessToken = data.accessToken;
        return data.accessToken;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async logout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: this.accessToken
        ? { Authorization: \`Bearer \${this.accessToken}\` }
        : {},
    });
    this.accessToken = null;
  }
}

export const auth = new AuthClient();

// Usage
const user = await auth.login('user@example.com', 'password123');
const response = await auth.authFetch('/api/profile');
const profile = await response.json();`}</code></pre>

      <h2>JWT vs Session-Based Authentication</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>JWT</th><th>Sessions</th></tr>
        </thead>
        <tbody>
          <tr><td>State</td><td>Stateless (token has all info)</td><td>Stateful (server stores session)</td></tr>
          <tr><td>Storage</td><td>Client-side (memory/cookie)</td><td>Server-side (DB/Redis)</td></tr>
          <tr><td>Scalability</td><td>Excellent (no server state)</td><td>Requires shared session store</td></tr>
          <tr><td>Revocation</td><td>Hard (need blocklist)</td><td>Easy (delete session)</td></tr>
          <tr><td>Cross-domain</td><td>Easy (pass in header)</td><td>Requires CORS configuration</td></tr>
          <tr><td>Mobile Apps</td><td>Excellent</td><td>Requires cookie support</td></tr>
          <tr><td>Microservices</td><td>Excellent</td><td>Requires centralized store</td></tr>
          <tr><td>Security</td><td>Token theft risk</td><td>CSRF risk (with cookies)</td></tr>
        </tbody>
      </table>

      <h2>Security Best Practices</h2>
      <ul>
        <li><strong>Use strong secrets</strong>: Generate at least 256-bit random secrets for HMAC signing. For production, prefer RS256 (asymmetric) over HS256 (symmetric).</li>
        <li><strong>Keep access tokens short-lived</strong>: 5-15 minutes is ideal. Short-lived tokens limit the damage window if a token is compromised.</li>
        <li><strong>Store access tokens in memory</strong>: Never store JWTs in localStorage or sessionStorage. Keep them in JavaScript variables (memory) and use HTTP-only cookies for refresh tokens.</li>
        <li><strong>Implement token rotation</strong>: Issue a new refresh token with each refresh request and invalidate the old one. This detects token reuse (theft).</li>
        <li><strong>Validate all claims</strong>: Always verify <code>iss</code>, <code>aud</code>, <code>exp</code>, and <code>type</code> claims. Do not just verify the signature.</li>
        <li><strong>Use HTTPS everywhere</strong>: Tokens transmitted over HTTP can be intercepted. Always use HTTPS in production.</li>
        <li><strong>Implement logout properly</strong>: Delete refresh tokens from the database and clear cookies. Consider maintaining a blocklist for access tokens if immediate revocation is needed.</li>
        <li><strong>Never put sensitive data in the payload</strong>: JWT payloads are Base64-encoded, not encrypted. Anyone can decode and read them.</li>
      </ul>

      <h3>Choosing the Right Algorithm</h3>
      <pre><code className="language-typescript">{`// HS256 (HMAC + SHA-256) - Symmetric
// Both parties share the same secret
// Simpler, good for single-server apps
jwt.sign(payload, 'shared-secret', { algorithm: 'HS256' });

// RS256 (RSA + SHA-256) - Asymmetric
// Private key signs, public key verifies
// Better for microservices (share only public key)
import fs from 'fs';
const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Sign with private key
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Verify with public key (any service can verify)
const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

// ES256 (ECDSA + SHA-256) - Asymmetric, shorter keys
// Recommended for new projects: smaller tokens, same security
// Generate keys: openssl ecparam -genkey -name prime256v1 -noout -out ec-private.pem
// Public key: openssl ec -in ec-private.pem -pubout -out ec-public.pem`}</code></pre>

      <h2>Common JWT Vulnerabilities and Prevention</h2>

      <h3>1. Algorithm Confusion Attack</h3>
      <pre><code className="language-typescript">{`// VULNERABLE: Accepts any algorithm
const decoded = jwt.verify(token, secret); // BAD

// SECURE: Explicitly specify allowed algorithms
const decoded = jwt.verify(token, secret, {
  algorithms: ['HS256'], // Only accept HS256
});

// For RS256
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256'], // Only accept RS256
});`}</code></pre>

      <h3>2. Token Storage Vulnerabilities</h3>
      <pre><code className="language-typescript">{`// BAD: localStorage is vulnerable to XSS
localStorage.setItem('token', accessToken); // DON'T DO THIS

// BAD: sessionStorage is also vulnerable to XSS
sessionStorage.setItem('token', accessToken); // DON'T DO THIS

// GOOD: Store in memory (JavaScript variable)
let accessToken: string | null = null; // Cleared on page refresh

// GOOD: Refresh token in HTTP-only, secure cookie
// Set by server:
res.cookie('refreshToken', token, {
  httpOnly: true,    // Not accessible via JavaScript
  secure: true,      // HTTPS only
  sameSite: 'strict', // CSRF protection
  path: '/auth',     // Only sent to auth endpoints
  maxAge: 7 * 24 * 60 * 60 * 1000,
});`}</code></pre>

      <h3>3. Missing Expiration Check</h3>
      <pre><code className="language-typescript">{`// ALWAYS set expiration
const token = jwt.sign(payload, secret, {
  expiresIn: '15m',   // Required for access tokens
});

// jsonwebtoken library checks exp by default
// But always verify it is present
if (!decoded.exp) {
  throw new Error('Token has no expiration');
}`}</code></pre>

      <h2>JWT in Microservices Architecture</h2>
      <pre><code className="language-text">{`Authentication Flow in Microservices:

1. Client -> Auth Service: Login (email/password)
2. Auth Service -> Client: Access Token (JWT) + Refresh Token (cookie)
3. Client -> API Gateway: Request + Bearer token
4. API Gateway: Verify JWT signature with public key
5. API Gateway -> Microservice: Forward request + decoded user claims
6. Microservice: Process request based on user claims

Key Points:
- Auth Service holds the private key (signs tokens)
- All other services hold the public key (verify tokens)
- No database lookup needed for verification
- Each service can extract user info from the token
- Use RS256 or ES256 for asymmetric verification`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        JWT authentication is powerful but requires careful implementation. The key principles are: keep access tokens short-lived and in memory, use HTTP-only cookies for refresh tokens, implement token rotation, validate all claims, and never store sensitive data in the payload. For most web applications, the access token + refresh token pattern with cookie-based refresh tokens provides the best balance of security and user experience.
      </p>
      <p>
        If your application does not need cross-domain authentication or microservice compatibility, traditional session-based authentication may be simpler and more secure. Choose the right tool for your architecture.
      </p>
      <p>
        Debug and inspect your JWT tokens with our <Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link>, generate secure password hashes with the <Link href={`/${lang}/tools/bcrypt-generator`}>Bcrypt Generator</Link>, and encode/decode Base64 data with the <Link href={`/${lang}/tools/base64`}>Base64 Encoder</Link>.
      </p>
    </>
  );
}
