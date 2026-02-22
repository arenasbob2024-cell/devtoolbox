'use client';

import Link from 'next/link';

export default function JwtTokenGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is a JWT Token?</h2>
      <p>
        A <strong>JSON Web Token (JWT)</strong> is a compact, URL-safe token format used to securely transmit information between parties as a JSON object. JWTs are widely used for authentication, authorization, and information exchange in modern web applications, APIs, and microservices architectures.
      </p>
      <p>
        JWTs are defined in <strong>RFC 7519</strong> and have become the de facto standard for stateless authentication. Unlike traditional session-based authentication where the server stores session data, JWTs are self-contained tokens that carry all the necessary information within themselves. This makes them ideal for distributed systems, single-page applications (SPAs), and mobile apps.
      </p>
      <p>
        <Link href={`/${lang}/tools/jwt-decoder`} style={{ fontWeight: 600 }}>Decode and inspect JWT tokens instantly with our free online JWT Decoder.</Link>
      </p>

      <h2>JWT Token Structure: Header, Payload, Signature</h2>
      <p>
        Every JWT consists of three parts separated by dots (<code>.</code>): the <strong>header</strong>, the <strong>payload</strong>, and the <strong>signature</strong>. Each part is Base64URL-encoded.
      </p>
      <pre><code className="language-text">{`JWT Structure:

  xxxxx.yyyyy.zzzzz
    |      |      |
  Header Payload Signature

Example JWT:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Decoded:
  Header:    { "alg": "HS256", "typ": "JWT" }
  Payload:   { "sub": "1234567890", "name": "John Doe", "iat": 1516239022 }
  Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`}</code></pre>

      <h3>Header</h3>
      <p>
        The header typically contains two fields: the token type (<code>typ</code>), which is always <code>JWT</code>, and the signing algorithm (<code>alg</code>) being used, such as HMAC SHA256 (<code>HS256</code>) or RSA (<code>RS256</code>).
      </p>
      <pre><code className="language-json">{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>

      <h3>Payload (Claims)</h3>
      <p>
        The payload contains the claims -- statements about the user and additional metadata. There are three types of claims:
      </p>
      <p>
        <strong>Registered claims</strong> are predefined by the JWT specification. They include <code>iss</code> (issuer), <code>sub</code> (subject), <code>aud</code> (audience), <code>exp</code> (expiration time), <code>nbf</code> (not before), <code>iat</code> (issued at), and <code>jti</code> (JWT ID).
      </p>
      <p>
        <strong>Public claims</strong> are defined by users of JWTs and should be registered in the IANA JSON Web Token Registry to avoid collisions.
      </p>
      <p>
        <strong>Private claims</strong> are custom claims created to share information between parties that agree on using them.
      </p>
      <pre><code className="language-json">{`{
  "sub": "user-12345",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "admin",
  "iat": 1708588800,
  "exp": 1708675200,
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com"
}`}</code></pre>

      <h3>Signature</h3>
      <p>
        The signature is created by taking the encoded header, the encoded payload, a secret key, and the algorithm specified in the header. This ensures the token has not been tampered with.
      </p>
      <pre><code className="language-text">{`HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  your-256-bit-secret
)`}</code></pre>

      <h2>How JWT Authentication Works</h2>
      <p>
        JWT-based authentication follows a straightforward flow. The client authenticates with the server, receives a JWT, and includes it in subsequent requests.
      </p>
      <pre><code className="language-text">{`JWT Authentication Flow:

1. Client sends credentials (username + password)
   POST /api/auth/login
   { "email": "alice@example.com", "password": "..." }

2. Server validates credentials, creates JWT
   JWT = sign({ sub: "user-123", role: "admin" }, SECRET, { expiresIn: "1h" })

3. Server returns JWT to client
   { "token": "eyJhbGciOiJIUzI1NiIs..." }

4. Client stores JWT (localStorage, cookie, or memory)

5. Client includes JWT in every request
   GET /api/protected-resource
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

6. Server verifies JWT signature and checks expiration
   - Valid? -> Process request
   - Invalid/Expired? -> 401 Unauthorized`}</code></pre>

      <h2>Creating and Verifying JWTs in Node.js</h2>
      <p>
        The <code>jsonwebtoken</code> library is the most widely used package for creating and verifying JWTs in Node.js applications. Here is a complete example:
      </p>
      <pre><code className="language-javascript">{`// Install: npm install jsonwebtoken
const jwt = require('jsonwebtoken');

// Your secret key (in production, use environment variables)
const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-min-256-bits';

// ========== Creating a JWT ==========

function generateToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: '1h',         // Token expires in 1 hour
    issuer: 'myapp.com',     // Who issued the token
    audience: 'myapp-api',   // Who the token is intended for
  };

  return jwt.sign(payload, SECRET_KEY, options);
}

// Usage
const token = generateToken({
  id: 'user-123',
  email: 'alice@example.com',
  role: 'admin'
});
console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEy...

// ========== Verifying a JWT ==========

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, {
      issuer: 'myapp.com',
      audience: 'myapp-api',
    });
    return { valid: true, payload: decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Usage
const result = verifyToken(token);
if (result.valid) {
  console.log('User ID:', result.payload.sub);
  console.log('Role:', result.payload.role);
} else {
  console.log('Invalid token:', result.error);
}

// ========== Express.js Middleware ==========

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const result = verifyToken(token);

  if (!result.valid) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = result.payload;
  next();
}

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ userId: req.user.sub, role: req.user.role });
});`}</code></pre>

      <h2>Creating and Verifying JWTs in Python</h2>
      <p>
        Python developers can use the <code>PyJWT</code> library for JWT operations. Here is a complete example with Flask integration:
      </p>
      <pre><code className="language-python">{`# Install: pip install PyJWT
import jwt
import datetime

SECRET_KEY = "your-super-secret-key-min-256-bits"

# ========== Creating a JWT ==========

def generate_token(user_id, email, role):
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        "iss": "myapp.com",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

token = generate_token("user-123", "alice@example.com", "admin")
print(token)

# ========== Verifying a JWT ==========

def verify_token(token):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"],
            issuer="myapp.com",
        )
        return {"valid": True, "payload": payload}
    except jwt.ExpiredSignatureError:
        return {"valid": False, "error": "Token expired"}
    except jwt.InvalidTokenError as e:
        return {"valid": False, "error": str(e)}

result = verify_token(token)
print(result)

# ========== Flask Decorator ==========

from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "No token provided"}), 401

        token = auth_header.split(" ")[1]
        result = verify_token(token)

        if not result["valid"]:
            return jsonify({"error": result["error"]}), 401

        request.user = result["payload"]
        return f(*args, **kwargs)
    return decorated

@app.route("/api/profile")
@require_auth
def profile():
    return jsonify({"userId": request.user["sub"], "role": request.user["role"]})`}</code></pre>

      <h2>JWT Signing Algorithms: HS256 vs RS256 vs ES256</h2>
      <p>
        Choosing the right signing algorithm is critical for your JWT security. Here is a comparison of the most commonly used algorithms:
      </p>
      <pre><code className="language-text">{`JWT Signing Algorithm Comparison:

Algorithm  Type         Key             Best For
---------  ----------   ------------    ----------------------
HS256      Symmetric    Shared secret   Single-server apps
HS384      Symmetric    Shared secret   Higher security needs
HS512      Symmetric    Shared secret   Maximum HMAC security
RS256      Asymmetric   RSA key pair    Microservices, public APIs
RS384      Asymmetric   RSA key pair    Higher security needs
RS512      Asymmetric   RSA key pair    Maximum RSA security
ES256      Asymmetric   ECDSA P-256     Mobile, performance-sensitive
ES384      Asymmetric   ECDSA P-384     Higher security needs
ES512      Asymmetric   ECDSA P-521     Maximum ECDSA security
EdDSA      Asymmetric   Ed25519         Modern, fastest asymmetric

Symmetric (HS*):
  - Same key for signing and verification
  - Fast, simple
  - Secret must be shared between all services

Asymmetric (RS*, ES*, EdDSA):
  - Private key signs, public key verifies
  - No need to share private key
  - Ideal for distributed systems and third-party verification`}</code></pre>

      <h3>RS256 Example (Asymmetric)</h3>
      <pre><code className="language-javascript">{`const jwt = require('jsonwebtoken');
const fs = require('fs');

// Generate keys: openssl genrsa -out private.pem 2048
//                openssl rsa -in private.pem -pubout -out public.pem

const privateKey = fs.readFileSync('private.pem');
const publicKey = fs.readFileSync('public.pem');

// Sign with private key (auth server)
const token = jwt.sign(
  { sub: 'user-123', role: 'admin' },
  privateKey,
  { algorithm: 'RS256', expiresIn: '1h' }
);

// Verify with public key (any service)
const decoded = jwt.verify(token, publicKey, {
  algorithms: ['RS256']
});
console.log(decoded.sub); // "user-123"`}</code></pre>

      <h2>JWT vs Sessions: When to Use Each</h2>
      <p>
        Both JWTs and server-side sessions are valid approaches to authentication, but they have different trade-offs:
      </p>
      <pre><code className="language-text">{`JWT vs Session Comparison:

Feature              JWT (Stateless)            Session (Stateful)
-----------          ----------------           -------------------
Storage              Client-side                Server-side (Redis/DB)
Scalability          Excellent (no server state) Requires shared session store
Revocation           Difficult (use deny-list)  Easy (delete session)
Size                 Larger (payload in token)  Small (just session ID)
Cross-domain         Easy (Authorization header) Requires CORS cookie config
Mobile-friendly      Yes                        Cookie management needed
Offline support      Yes (token is self-contained) No (needs server check)
Server memory        None                       Proportional to active users

When to use JWT:
  - Microservices architecture
  - Mobile/SPA applications
  - Cross-domain authentication (SSO)
  - Stateless API authentication
  - Short-lived access tokens

When to use Sessions:
  - Traditional server-rendered apps
  - Need immediate token revocation
  - Small number of users / single server
  - Sensitive applications (banking)`}</code></pre>

      <h2>Refresh Token Pattern</h2>
      <p>
        In production applications, JWTs should have short expiration times (15 minutes to 1 hour). To avoid forcing users to log in repeatedly, implement the <strong>refresh token pattern</strong>.
      </p>
      <pre><code className="language-javascript">{`// ========== Refresh Token Implementation ==========

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// In-memory store (use Redis/DB in production)
const refreshTokens = new Map();

// Generate token pair on login
function login(user) {
  // Short-lived access token (15 min)
  const accessToken = jwt.sign(
    { sub: user.id, role: user.role },
    ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  // Long-lived refresh token (7 days)
  const refreshToken = jwt.sign(
    { sub: user.id, jti: crypto.randomUUID() },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // Store refresh token hash for revocation
  refreshTokens.set(user.id, refreshToken);

  return { accessToken, refreshToken };
}

// Refresh endpoint
app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // Check if refresh token is still valid (not revoked)
    const stored = refreshTokens.get(decoded.sub);
    if (stored !== refreshToken) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Issue new access token
    const newAccessToken = jwt.sign(
      { sub: decoded.sub, role: 'admin' },
      ACCESS_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Logout - revoke refresh token
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  refreshTokens.delete(req.user.sub);
  res.json({ message: 'Logged out' });
});`}</code></pre>

      <h2>Common JWT Security Mistakes (and How to Avoid Them)</h2>
      <p>
        JWTs are powerful but can introduce security vulnerabilities if implemented incorrectly. Here are the most common mistakes:
      </p>

      <h3>1. Storing Sensitive Data in the Payload</h3>
      <p>
        The JWT payload is Base64URL-encoded, not encrypted. Anyone can decode it. Never include passwords, credit card numbers, or other sensitive data in JWT claims.
      </p>
      <pre><code className="language-javascript">{`// BAD - sensitive data in payload
const badToken = jwt.sign({
  sub: 'user-123',
  password: 'mypassword',    // NEVER do this
  ssn: '123-45-6789',        // NEVER do this
  creditCard: '4111...',     // NEVER do this
}, SECRET);

// GOOD - minimal claims
const goodToken = jwt.sign({
  sub: 'user-123',
  role: 'admin',
  permissions: ['read', 'write'],
}, SECRET, { expiresIn: '15m' });`}</code></pre>

      <h3>2. Using the &quot;none&quot; Algorithm</h3>
      <p>
        The JWT specification includes an <code>alg: "none"</code> option that creates unsigned tokens. Always validate the algorithm on the server and reject unsigned tokens.
      </p>
      <pre><code className="language-javascript">{`// VULNERABLE - accepts any algorithm
const decoded = jwt.verify(token, SECRET);

// SECURE - explicitly specify allowed algorithms
const decoded = jwt.verify(token, SECRET, {
  algorithms: ['HS256']   // Only accept HS256
});`}</code></pre>

      <h3>3. Weak Secret Keys</h3>
      <p>
        For HMAC algorithms, the secret key must be at least 256 bits (32 bytes) long and cryptographically random. Short or predictable secrets can be brute-forced.
      </p>
      <pre><code className="language-bash">{`# Generate a secure secret key
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use openssl
openssl rand -hex 64`}</code></pre>

      <h3>4. Not Validating Expiration</h3>
      <p>
        Always set and check the <code>exp</code> claim. Without expiration, a stolen token can be used indefinitely.
      </p>

      <h3>5. Storing JWTs in localStorage</h3>
      <p>
        LocalStorage is vulnerable to XSS (Cross-Site Scripting) attacks. For web applications, store JWTs in <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code> cookies instead.
      </p>
      <pre><code className="language-javascript">{`// VULNERABLE - localStorage (accessible via JavaScript / XSS)
localStorage.setItem('token', jwt);

// SECURE - HttpOnly cookie (not accessible via JavaScript)
res.cookie('accessToken', jwt, {
  httpOnly: true,     // Cannot be read by JavaScript
  secure: true,       // Only sent over HTTPS
  sameSite: 'strict', // Prevents CSRF
  maxAge: 15 * 60 * 1000, // 15 minutes
  path: '/',
});`}</code></pre>

      <h2>Decoding JWT Tokens Without a Library</h2>
      <p>
        Since JWTs are just Base64URL-encoded JSON, you can decode the header and payload without any library. This is useful for debugging but does not verify the signature.
      </p>
      <pre><code className="language-javascript">{`// Decode JWT in the browser (no library needed)
function decodeJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');

  const decodeBase64Url = (str) => {
    // Add padding
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return JSON.parse(atob(str));
  };

  return {
    header: decodeBase64Url(parts[0]),
    payload: decodeBase64Url(parts[1]),
    signature: parts[2],
  };
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const decoded = decodeJwt(token);
console.log(decoded.header);  // { alg: "HS256", typ: "JWT" }
console.log(decoded.payload); // { sub: "1234567890", name: "John Doe", iat: 1516239022 }`}</code></pre>

      <h2>JWT Best Practices Checklist</h2>
      <p>
        Follow these best practices for secure JWT implementation in production:
      </p>
      <pre><code className="language-text">{`JWT Security Checklist:

  [x] Use strong, cryptographically random secret keys (256+ bits)
  [x] Set short expiration times (15 min for access tokens)
  [x] Implement refresh token rotation
  [x] Explicitly specify allowed algorithms during verification
  [x] Never store sensitive data in the payload
  [x] Use HttpOnly cookies instead of localStorage for web apps
  [x] Validate all registered claims (exp, iss, aud, nbf)
  [x] Use asymmetric algorithms (RS256/ES256) for distributed systems
  [x] Implement token revocation via deny-lists for critical apps
  [x] Always use HTTPS to prevent token interception
  [x] Keep payload size small (avoid bloating tokens)
  [x] Rotate signing keys periodically
  [x] Log and monitor failed verification attempts`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What does JWT stand for?</h3>
      <p>
        JWT stands for JSON Web Token. It is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. The information can be verified and trusted because it is digitally signed.
      </p>

      <h3>Can JWT tokens be hacked?</h3>
      <p>
        JWT tokens cannot be tampered with if properly implemented because the signature prevents modification. However, JWTs can be stolen through XSS attacks, man-in-the-middle attacks (without HTTPS), or insecure storage. The payload can always be decoded (it is not encrypted), so never store sensitive information in it. Use short expiration times and secure storage to minimize risk.
      </p>

      <h3>Should I use JWT or session cookies?</h3>
      <p>
        Use JWTs for stateless APIs, microservices, SPAs, and mobile apps where scalability matters. Use session cookies for traditional server-rendered applications, when you need immediate token revocation, or for highly sensitive applications like banking where fine-grained control is critical.
      </p>

      <h3>How long should a JWT token last?</h3>
      <p>
        Access tokens should expire in 15 minutes to 1 hour. Refresh tokens can last 7 to 30 days. The exact duration depends on your security requirements. Shorter expiration times are more secure but require more frequent token refreshes.
      </p>

      <h3>What is the difference between JWT and OAuth?</h3>
      <p>
        JWT is a token format, while OAuth 2.0 is an authorization framework. OAuth defines the flow for obtaining tokens, and JWTs are often used as the token format within OAuth flows. OAuth issues access tokens (which can be JWTs) and refresh tokens through defined grant types like authorization code, client credentials, and PKCE.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/tools/jwt-decoder`}>JWT Decoder</Link> - Decode and inspect JWT tokens online</li>
        <li><Link href={`/${lang}/tools/jwt-decoder-online`}>JWT Decoder Online</Link> - Advanced JWT analysis tool</li>
        <li><Link href={`/${lang}/tools/base64-encoder-decoder`}>Base64 Encoder/Decoder</Link> - Encode and decode Base64 strings</li>
        <li><Link href={`/${lang}/blog/jwt-token-explained`}>JWT Token Explained</Link> - Understanding JWT token structure</li>
        <li><Link href={`/${lang}/blog/jwt-decode-without-library`}>JWT Decode Without Library</Link> - Decode JWTs in the browser</li>
        <li><Link href={`/${lang}/blog/api-authentication-oauth-jwt-apikey`}>API Authentication Guide</Link> - OAuth, JWT, and API key patterns</li>
        <li><Link href={`/${lang}/blog/base64-encoding-guide`}>Base64 Encoding Guide</Link> - Complete Base64 developer reference</li>
      </ul>
    </>
  );
}
