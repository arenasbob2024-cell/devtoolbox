'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'JWT Authentication Complete Guide — Structure, Security, and Implementation',
    description: 'Complete JWT authentication guide covering token structure, Node.js jsonwebtoken, Express middleware, Next.js App Router, Python PyJWT, refresh tokens, RS256, vulnerabilities, and OAuth2/OIDC.',
  },
  zh: {
    title: 'JWT 身份验证完整指南 — 结构、安全与实现',
    description: '完整的 JWT 身份验证指南，涵盖令牌结构、Node.js jsonwebtoken、Express 中间件、Next.js App Router、Python PyJWT、刷新令牌、RS256、漏洞及 OAuth2/OIDC。',
  },
};

export default function JwtAuthenticationGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three parts of a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JWT consists of three base64url-encoded parts separated by dots: Header, Payload, and Signature. The Header contains the token type ("JWT") and the signing algorithm (e.g., HS256 or RS256). The Payload contains claims — statements about the user and metadata like iss (issuer), sub (subject), exp (expiration), iat (issued at), and jti (JWT ID). The Signature is computed from the header and payload using the algorithm specified in the header, ensuring the token has not been tampered with.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between HS256 and RS256 in JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HS256 (HMAC-SHA256) is a symmetric algorithm — the same secret key is used to both sign and verify tokens. This is simple but requires that every service verifying tokens also knows the secret. RS256 (RSA-SHA256) is an asymmetric algorithm — a private key signs tokens and a public key verifies them. RS256 is preferred when multiple services need to verify tokens, since you can distribute the public key freely without exposing signing capability. RS256 also supports JWKS endpoints for automatic key rotation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I securely store JWTs in the browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The two main options are: (1) HttpOnly cookies — the JWT is stored in a cookie with HttpOnly and Secure flags, making it inaccessible to JavaScript and protected against XSS. This is the recommended approach for web apps. The downside is that you need to handle CSRF protection. (2) Memory (JavaScript variable) — safest against XSS but lost on page refresh. Never store JWTs in localStorage or sessionStorage because XSS attacks can read them. If using Authorization headers, store the token in memory and re-fetch after page refresh using a silent refresh with a long-lived HttpOnly cookie.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the alg:none JWT vulnerability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The "alg:none" attack exploits JWT libraries that accept tokens with no algorithm. An attacker modifies the header to set "alg": "none", removes the signature, and creates a forged token with arbitrary claims (e.g., admin: true). Vulnerable libraries then skip signature verification entirely. Always explicitly specify the expected algorithm when verifying tokens: jwt.verify(token, secret, { algorithms: ["HS256"] }). Never accept "none" as a valid algorithm in production code.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the JWT refresh token pattern work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The refresh token pattern uses two tokens: a short-lived access token (typically 15 minutes) for API authorization, and a long-lived refresh token (7-30 days) to obtain new access tokens. When the access token expires, the client silently sends the refresh token to a /auth/refresh endpoint to get a new access token without requiring the user to log in again. Refresh tokens should be stored in HttpOnly cookies, rotated on each use (one-time use), and tracked server-side (e.g., in Redis) so they can be revoked on logout.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can JWTs be invalidated before they expire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "By design, JWTs are stateless and cannot be invalidated — a valid token remains valid until its exp claim passes. To achieve forced invalidation (e.g., on logout or password change), you need a server-side blocklist. Store invalidated JWT IDs (jti claim) in Redis with a TTL equal to the token's remaining lifetime. On each request, check if the token's jti is in the blocklist and reject it if so. Alternatively, use very short-lived access tokens (5-15 minutes) so forced logout only requires waiting for expiry, combined with refresh token invalidation.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is a JWKS endpoint and why is it useful?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JWKS (JSON Web Key Set) endpoint is a public URL that exposes the public keys used to verify JWTs, formatted as a JSON object. This allows services to automatically fetch and cache the public key without manual configuration. The endpoint is typically at /.well-known/jwks.json. Libraries like jwks-rsa can automatically retrieve and rotate keys. JWKS is standard in OAuth2/OIDC providers like Auth0, Keycloak, and AWS Cognito, enabling zero-configuration token verification across microservices.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between JWT and session-based authentication?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Session-based auth stores session data server-side (database/Redis) and gives the client a session ID cookie. The server must look up the session on every request — this is stateful. JWT auth encodes claims in the token itself and verifies the signature cryptographically — this is stateless, requiring no database lookup per request. JWTs scale better horizontally since any server can verify the token without shared state. However, sessions are easier to invalidate (just delete the server-side record). JWTs are better for microservices and APIs; sessions are simpler for traditional server-rendered web apps.',
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

      <link rel="canonical" href="https://viadreams.cc/en/blog/jwt-authentication-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>JWT (JSON Web Token)</strong> is a compact, self-contained token format for transmitting authenticated
          claims between parties. A JWT has three base64url-encoded parts: <code>header.payload.signature</code>. Use{' '}
          <strong>HS256</strong> for single-service auth and <strong>RS256</strong> for multi-service architectures. Always
          set <code>exp</code>, verify the algorithm explicitly, and never store JWTs in localStorage. Use short-lived
          access tokens (15 min) combined with refresh tokens for the best balance of security and UX. Decode and inspect
          your tokens instantly with our{' '}
          <Link href={`/${lang}/tools/jwt-decoder`} style={{ color: '#0284c7' }}>online JWT decoder</Link>.
        </p>
      </div>

      {/* Section 1: JWT Structure */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT Structure — header.payload.signature
      </h2>
      <p>
        A <strong>JSON Web Token (JWT)</strong> is defined by RFC 7519 as a compact URL-safe means of representing claims
        to be transferred between two parties. Every JWT has exactly three parts, separated by dots (<code>.</code>), each
        individually base64url-encoded:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiJ1c2VyXzEyMyIsImlzcyI6ImFwaS5leGFtcGxlLmNvbSIsImV4cCI6MTcwOTQ3MzYwMCwiaWF0IjoxNzA5NDY2NDAwLCJqdGkiOiJ1dWlkLWFiYy0xMjMifQ
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

# Part 1 — Header (decoded):
{
  "alg": "HS256",   // signing algorithm
  "typ": "JWT"      // token type
}

# Part 2 — Payload (decoded):
{
  "sub": "user_123",                  // subject (user ID)
  "iss": "api.example.com",           // issuer
  "exp": 1709473600,                  // expiry (Unix timestamp)
  "iat": 1709466400,                  // issued at
  "jti": "uuid-abc-123",              // JWT ID (for revocation)
  "role": "admin",                    // custom claim
  "email": "alice@example.com"        // custom claim
}

# Part 3 — Signature:
HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secret
)`}</code></pre>
      <p>
        The <strong>header</strong> specifies the algorithm (<code>alg</code>) and token type (<code>typ</code>).
        The <strong>payload</strong> contains claims — the standard registered ones are:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Claim</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Full Name</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Required?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>iss</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Issuer</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Who issued the token (your domain or service name)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Recommended</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>sub</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Subject</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Who the token is about (user ID)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Recommended</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>exp</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Expiration Time</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Token is invalid after this Unix timestamp</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Critical</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>iat</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Issued At</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>When the token was created</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Recommended</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>jti</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>JWT ID</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Unique identifier for revocation/replay prevention</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Optional but useful</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Important:</strong> JWT payloads are base64url-encoded, not encrypted. Anyone who has the token can
        read the payload — do not store sensitive data like passwords, credit card numbers, or secrets in JWT claims.
        The signature only proves the token was not tampered with; it does not hide the contents.
      </p>

      {/* Section 2: Node.js jsonwebtoken */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Creating JWTs in Node.js with jsonwebtoken
      </h2>
      <p>
        The <code>jsonwebtoken</code> package is the standard Node.js library for creating and verifying JWTs.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;  // at least 32 chars in production

// ─── Sign (create) a JWT ─────────────────────────────────────────────────────
const token = jwt.sign(
  {
    sub: 'user_123',
    email: 'alice@example.com',
    role: 'admin',
  },
  SECRET,
  {
    expiresIn: '15m',       // 15 minutes for access tokens
    algorithm: 'HS256',
    issuer: 'api.example.com',
    audience: 'app.example.com',
    jwtid: crypto.randomUUID(),  // unique jti for revocation
  }
);

// ─── Verify a JWT ────────────────────────────────────────────────────────────
try {
  const decoded = jwt.verify(token, SECRET, {
    algorithms: ['HS256'],         // ALWAYS specify — prevents alg:none attack
    issuer: 'api.example.com',
    audience: 'app.example.com',
  }) as jwt.JwtPayload;

  console.log(decoded.sub);      // 'user_123'
  console.log(decoded.role);     // 'admin'
  console.log(decoded.exp);      // expiry timestamp
} catch (err) {
  if (err instanceof jwt.TokenExpiredError) {
    console.error('Token expired at', err.expiredAt);
  } else if (err instanceof jwt.JsonWebTokenError) {
    console.error('Invalid token:', err.message);
  } else if (err instanceof jwt.NotBeforeError) {
    console.error('Token not yet active');
  }
}

// ─── Decode without verifying (for debugging only) ───────────────────────────
const payload = jwt.decode(token);
console.log(payload);   // DO NOT use this for auth — signature is not verified`}</code></pre>
      <p>
        The <code>expiresIn</code> option accepts human-readable strings (<code>&apos;15m&apos;</code>,{' '}
        <code>&apos;7d&apos;</code>, <code>&apos;1h&apos;</code>) or numbers in seconds. The{' '}
        <code>algorithms</code> array in <code>verify()</code> is critical — without it, some older library
        versions accept the <code>alg:none</code> attack.
      </p>

      {/* Section 3: Express middleware */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT with Express Middleware
      </h2>
      <p>
        A well-structured Express JWT middleware extracts the Bearer token, verifies it, attaches the decoded payload
        to the request, and handles errors consistently.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: jwt.JwtPayload;
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.slice(7);  // Remove "Bearer " prefix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256'],
      issuer: 'api.example.com',
    }) as jwt.JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
    }
    return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' });
  }
}

// Optional: role-based authorization middleware
export function authorize(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (roles.length && !roles.includes(req.user.role as string)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Apply middleware to protected routes
router.get('/profile', authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

router.delete('/users/:id', authenticate, authorize('admin'), (req, res) => {
  res.json({ deleted: req.params.id });
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Refresh Token Endpoints in Express
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// POST /auth/login — issue both tokens
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await validateCredentials(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '15m', algorithm: 'HS256' }
  );

  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    process.env.REFRESH_SECRET!,
    { expiresIn: '7d', algorithm: 'HS256' }
  );

  // Store refresh token in HttpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

// POST /auth/refresh — issue new access token from refresh token
app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!, {
      algorithms: ['HS256'],
    }) as jwt.JwtPayload;

    const newAccessToken = jwt.sign(
      { sub: decoded.sub },
      process.env.JWT_SECRET!,
      { expiresIn: '15m', algorithm: 'HS256' }
    );

    res.json({ accessToken: newAccessToken });
  } catch {
    res.clearCookie('refreshToken');
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
});`}</code></pre>

      {/* Section 4: Next.js App Router JWT */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Next.js App Router JWT Authentication
      </h2>
      <p>
        Next.js 13+ App Router provides multiple integration points for JWT: server actions, route handlers, and
        middleware. The recommended approach stores JWTs in HttpOnly cookies and validates them in{' '}
        <code>middleware.ts</code>.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        middleware.ts — Protecting Routes at the Edge
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// middleware.ts (project root)
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';    // 'jose' is edge-compatible; jsonwebtoken is not

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    await jwtVerify(token, SECRET, {
      algorithms: ['HS256'],
      issuer: 'api.example.com',
    });
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken');
    return response;
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Server Action Login with Cookies
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await validateUser(email, password);
  if (!user) throw new Error('Invalid credentials');

  const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('api.example.com')
    .setExpirationTime('15m')
    .sign(SECRET);

  cookies().set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60,
    path: '/',
  });

  redirect('/dashboard');
}

export async function getCurrentUser() {
  const token = cookies().get('accessToken')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET, { algorithms: ['HS256'] });
    return payload;
  } catch {
    return null;
  }
}`}</code></pre>

      {/* Section 5: Python PyJWT */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python PyJWT and FastAPI JWT Integration
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install PyJWT cryptography`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "your-super-secret-key-at-least-32-chars"
ALGORITHM = "HS256"

def create_access_token(user_id: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "role": role,
        "iat": datetime.now(timezone.utc),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "iss": "api.example.com",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],      # always specify algorithms
            options={"require": ["exp", "sub", "iss"]},
            issuer="api.example.com",
        )
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid token: {e}")`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        FastAPI Dependency Injection for JWT Auth
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

app = FastAPI()
security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    token = credentials.credentials
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM], issuer="api.example.com")
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

@app.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user)):
    return {"user_id": current_user["sub"], "role": current_user["role"]}

def require_admin(current_user: dict = Depends(get_current_user)) -> dict:
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@app.delete("/users/{user_id}")
def delete_user(user_id: str, _: dict = Depends(require_admin)):
    return {"deleted": user_id}`}</code></pre>

      {/* Section 6: Refresh Token Pattern */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT Refresh Token Pattern — Access + Refresh Token Architecture
      </h2>
      <p>
        Short-lived access tokens combined with long-lived refresh tokens provide the best balance of security and
        user experience.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Token Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Lifetime</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Storage</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Access Token</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>15 minutes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Memory / HttpOnly cookie</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sent with every API request</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Refresh Token</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>7 days</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HttpOnly Secure cookie only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Obtains new access tokens</td>
            </tr>
          </tbody>
        </table>
      </div>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Redis-backed refresh token rotation
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

async function issueTokens(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: '15m', algorithm: 'HS256',
  });

  const refreshTokenId = crypto.randomUUID();
  const refreshToken = jwt.sign(
    { sub: userId, jti: refreshTokenId, type: 'refresh' },
    process.env.REFRESH_SECRET!,
    { expiresIn: '7d', algorithm: 'HS256' }
  );

  await redis.setEx(\`refresh:\${userId}:\${refreshTokenId}\`, 7 * 24 * 60 * 60, 'valid');
  return { accessToken, refreshToken };
}

async function rotateRefreshToken(refreshToken: string) {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!, {
    algorithms: ['HS256'],
  }) as jwt.JwtPayload;

  const key = \`refresh:\${decoded.sub}:\${decoded.jti}\`;
  const exists = await redis.get(key);

  if (!exists) {
    // Reuse detected — possible theft; invalidate all sessions
    await redis.del(await redis.keys(\`refresh:\${decoded.sub}:*\`));
    throw new Error('Refresh token reuse detected');
  }

  await redis.del(key);
  return issueTokens(decoded.sub as string);
}`}</code></pre>

      {/* Section 7: RS256 Asymmetric */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        RS256 Asymmetric JWT — Private Key Signing, Public Key Verification
      </h2>
      <p>
        RS256 uses an RSA key pair: the private key signs tokens (kept secret on the auth server only), and the public
        key verifies them (can be distributed freely to all services).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Generate RSA key pair (4096-bit recommended)
openssl genrsa -out private.pem 4096
openssl rsa -in private.pem -pubout -out public.pem`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Auth server: sign with private key
const token = jwt.sign(
  { sub: 'user_123', role: 'editor' },
  privateKey,
  {
    algorithm: 'RS256',
    expiresIn: '15m',
    keyid: 'key-2024-01',
    issuer: 'auth.example.com',
  }
);

// Any service: verify with public key
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256'],    // NEVER allow HS256 here — algorithm confusion attack!
  issuer: 'auth.example.com',
});

// JWKS endpoint — serve public keys for auto-discovery
import { createPublicKey } from 'crypto';
import { exportJWK } from 'jose';

app.get('/.well-known/jwks.json', async (req, res) => {
  const publicKeyObj = createPublicKey(publicKey);
  const jwk = await exportJWK(publicKeyObj);
  res.json({ keys: [{ ...jwk, kid: 'key-2024-01', use: 'sig', alg: 'RS256' }] });
});

// Consuming service: auto-fetch key from JWKS
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://auth.example.com/.well-known/jwks.json',
  cache: true,
  cacheMaxAge: 600000,
});

function getPublicKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    callback(err, key?.getPublicKey());
  });
}

jwt.verify(token, getPublicKey, { algorithms: ['RS256'] }, (err, decoded) => {
  if (err) console.error('Verification failed:', err.message);
  else console.log('Decoded:', decoded);
});`}</code></pre>

      {/* Section 8: Vulnerabilities */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Common JWT Vulnerabilities and How to Prevent Them
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        1. Algorithm Confusion / alg:none Attack
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// VULNERABLE: not specifying algorithms allows alg:none and RS256->HS256 confusion
jwt.verify(token, secret);

// RS256->HS256 confusion: attacker changes header alg to HS256,
// signs with the PUBLIC key (which is known). If the verifier uses
// the public key as an HS256 secret, verification passes!

// PREVENTION: always pass the algorithms array
jwt.verify(token, publicKey, { algorithms: ['RS256'] });   // RS256 only
jwt.verify(token, secret, { algorithms: ['HS256'] });       // HS256 only`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        2. Weak Secret Brute Force
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# HS256 tokens can be brute-forced offline — attacker needs only the token
hashcat -a 0 -m 16500 token.txt wordlist.txt

# Bad: short or dictionary-based secrets
JWT_SECRET=secret          # cracked in seconds
JWT_SECRET=myapp2024       # cracked in minutes

# Good: cryptographically random 256-bit secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# → e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        3. Missing Expiry and Sensitive Data in Payload
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// VULNERABLE: no expiry — stolen tokens are valid forever
const token = jwt.sign({ sub: userId }, secret);

// VULNERABLE: sensitive data in payload (base64url is NOT encryption!)
const token = jwt.sign({ password: 'abc123', creditCard: '4111...' }, secret);

// CORRECT: set expiry, store only minimal non-sensitive claims
const token = jwt.sign(
  { sub: user.id, role: user.role, scope: ['read', 'write'] },
  secret,
  { expiresIn: '15m' }
);

// For truly sensitive payloads: use JWE (JSON Web Encryption)
// JWE encrypts the payload with AES-256-GCM in addition to signing`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        4. Token Fixation and Missing Audience Validation
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// VULNERABLE: token issued for one service accepted by another
// (token fixation — a token for service A works on service B)

// PREVENTION: always set and validate the audience claim
const token = jwt.sign({ sub: userId }, secret, {
  audience: 'api.service-a.com',   // set intended audience
  issuer: 'auth.example.com',
});

jwt.verify(token, secret, {
  algorithms: ['HS256'],
  audience: 'api.service-a.com',   // reject tokens for other services
  issuer: 'auth.example.com',
});`}</code></pre>

      {/* Section 9: JWT vs Session */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        JWT vs Session-Based Authentication — When to Use Each
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Aspect</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>JWT (Stateless)</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Sessions (Stateful)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Server storage</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>None — token is self-contained</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Requires DB/Redis per session</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Horizontal scaling</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Easy — any server can verify</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Requires sticky sessions or shared store</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Instant logout/revocation</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Hard — requires blocklist in Redis</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Easy — delete session record</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Microservices</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Excellent — no shared state needed</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Difficult — requires shared session store</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Token/cookie size</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Large (hundreds of bytes per request)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Small (session ID only)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>CSRF risk</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#16a34a' }}>Low (Authorization header bypasses CSRF)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', color: '#dc2626' }}>Higher — needs explicit CSRF tokens</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Use JWT when:</strong> building microservices, mobile APIs, or multi-service architectures where
        multiple independent services need to verify tokens without a shared database. JWT is also the natural choice
        for OAuth2 and OpenID Connect.
      </p>
      <p>
        <strong>Use sessions when:</strong> building a traditional server-rendered web app where instant logout is
        critical, or when you need to store large amounts of user state server-side. Sessions are simpler to reason
        about for monolithic applications.
      </p>

      {/* Section 10: OAuth2 / OpenID Connect */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        OAuth2 and OpenID Connect — id_token vs access_token, PKCE, and Providers
      </h2>
      <p>
        OAuth2 is an authorization framework; OpenID Connect (OIDC) adds an identity layer on top. Both use JWTs
        extensively. Understanding the difference between <code>id_token</code> and <code>access_token</code> is
        critical for correct implementation.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Token</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Purpose</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Audience</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Contains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>id_token</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Authentication (who the user is)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Your application only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>User identity claims (email, name, sub)</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>access_token</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Authorization (what can be accessed)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Resource server (API)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Scopes, permissions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Authorization Code + PKCE Flow (SPAs and Mobile)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Step 1: Generate PKCE code verifier and challenge
const codeVerifier = crypto.randomBytes(32).toString('base64url');
const codeChallenge = crypto
  .createHash('sha256')
  .update(codeVerifier)
  .digest('base64url');

// Step 2: Redirect to authorization URL
const authUrl = new URL('https://auth.example.com/authorize');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', 'https://app.example.com/callback');
authUrl.searchParams.set('scope', 'openid email profile');
authUrl.searchParams.set('code_challenge', codeChallenge);
authUrl.searchParams.set('code_challenge_method', 'S256');
authUrl.searchParams.set('state', crypto.randomBytes(16).toString('hex'));

// Step 3: Exchange authorization code for tokens
const tokenResponse = await fetch('https://auth.example.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: 'https://app.example.com/callback',
    client_id: CLIENT_ID,
    code_verifier: codeVerifier,
  }),
});

const { access_token, id_token, refresh_token } = await tokenResponse.json();

// Step 4: Verify id_token via JWKS
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://auth.example.com/.well-known/jwks.json')
);

const { payload } = await jwtVerify(id_token, JWKS, {
  issuer: 'https://auth.example.com',
  audience: CLIENT_ID,
});
console.log(payload.sub, payload.email);`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Auth0, Keycloak, and Supabase Integrations
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// ─── Auth0 with Next.js ───────────────────────────────────────────────────────
npm install @auth0/nextjs-auth0

// app/api/auth/[auth0]/route.ts
import { handleAuth } from '@auth0/nextjs-auth0';
export const GET = handleAuth();

// Protected server component
import { getSession } from '@auth0/nextjs-auth0';
const session = await getSession();
// session.accessToken is the OAuth2 access_token (for calling APIs)
// session.user comes from the id_token claims

// ─── Supabase Auth (Next.js App Router) ──────────────────────────────────────
npm install @supabase/ssr @supabase/supabase-js

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabase = createServerClient(URL, ANON_KEY, {
  cookies: { getAll: () => cookies().getAll() }
});

const { data: { user } } = await supabase.auth.getUser();
// Supabase auto-handles JWT issuance, verification, and refresh

// ─── Keycloak JWT verification ────────────────────────────────────────────────
import { createRemoteJWKSet, jwtVerify } from 'jose';

const JWKS = createRemoteJWKSet(
  new URL('https://keycloak.example.com/realms/myrealm/protocol/openid-connect/certs')
);

const { payload } = await jwtVerify(token, JWKS, {
  issuer: 'https://keycloak.example.com/realms/myrealm',
  audience: 'my-client-id',
});`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          <strong>Decode and inspect your JWTs instantly</strong> — paste any token into our{' '}
          <Link href={`/${lang}/tools/jwt-decoder`} style={{ color: '#2563eb', fontWeight: 600 }}>
            online JWT decoder
          </Link>{' '}
          to view the header, payload, claims, expiry, and algorithm without any external tools.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>JWT = header.payload.signature</strong>: base64url-encoded, not encrypted — never put sensitive data in claims.</li>
          <li><strong>Always set exp</strong>: tokens without expiry are valid forever — a critical security risk.</li>
          <li><strong>Always specify algorithms</strong>: pass <code>{`{ algorithms: ['HS256'] }`}</code> to <code>jwt.verify()</code> to prevent alg:none and algorithm confusion attacks.</li>
          <li><strong>Use RS256 for microservices</strong>: distribute the public key freely; keep the private key only on the auth server. Expose keys via a JWKS endpoint.</li>
          <li><strong>Short-lived access tokens + refresh tokens</strong>: 15-minute access tokens with 7-day rotating refresh tokens stored in HttpOnly cookies.</li>
          <li><strong>Never store JWTs in localStorage</strong>: XSS attacks can steal them. Use HttpOnly cookies or in-memory storage.</li>
          <li><strong>Redis for revocation</strong>: track refresh token JTIs in Redis with TTL for instant logout and reuse detection.</li>
          <li><strong>Use PKCE for SPAs</strong>: the authorization code + PKCE flow is the secure standard for browser-based OAuth2 clients.</li>
          <li><strong>id_token vs access_token</strong>: id_token authenticates the user to your app; access_token authorizes calls to APIs.</li>
          <li><strong>Managed providers</strong> (Auth0, Supabase, Keycloak) handle key rotation, JWKS, and token refresh automatically — prefer them for production.</li>
        </ul>
      </div>
    </article>
  );
}
