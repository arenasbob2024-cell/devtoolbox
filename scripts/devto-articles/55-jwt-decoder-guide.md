---
title: "JWT Decoder: Decode and Debug JWTs Online — Complete Guide"
tags: jwt, authentication, security, webdev
canonical_url: https://viadreams.cc/en/blog/jwt-decoder-online-guide
published: true
---

Decode, verify, and debug JWT tokens. Here's the complete developer guide.

## JWT Structure

A JWT has three base64url-encoded parts: `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Decoded header: `{"alg":"HS256","typ":"JWT"}`
Decoded payload: `{"sub":"1234567890","name":"Alice","iat":1516239022}`

## Decode Without Library (JavaScript)

```javascript
function decodeJWT(token) {
  const [header, payload, signature] = token.split('.');

  const decode = (str) =>
    JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));

  return {
    header: decode(header),
    payload: decode(payload),
    signature,  // raw base64url — not decoded
  };
}

const { header, payload } = decodeJWT(token);
console.log(payload.sub);  // "1234567890"
console.log(payload.exp);  // Unix timestamp
```

## jsonwebtoken Library

```javascript
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Sign
const token = jwt.sign(
  { sub: 'user123', name: 'Alice', role: 'admin' },
  SECRET,
  { expiresIn: '1h', issuer: 'myapp' }
);

// Verify (validates signature + claims)
try {
  const decoded = jwt.verify(token, SECRET, { issuer: 'myapp' });
  console.log(decoded.sub);  // "user123"
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    console.log('Token expired at:', err.expiredAt);
  } else if (err.name === 'JsonWebTokenError') {
    console.log('Invalid token:', err.message);
  }
}

// Decode only (NO signature verification — unsafe for auth)
const payload = jwt.decode(token);
```

## jose Library (RS256, JWKS)

```javascript
import { jwtVerify, createRemoteJWKSet } from 'jose';

// RS256 with JWKS endpoint (OAuth/OIDC)
const JWKS = createRemoteJWKSet(
  new URL('https://auth.example.com/.well-known/jwks.json')
);

const { payload } = await jwtVerify(token, JWKS, {
  issuer: 'https://auth.example.com',
  audience: 'my-api',
});

console.log(payload.sub);
```

## Python — PyJWT

```python
import jwt

SECRET = "your-secret-key"

# Encode
token = jwt.encode(
    {"sub": "user123", "name": "Alice", "exp": datetime.utcnow() + timedelta(hours=1)},
    SECRET,
    algorithm="HS256"
)

# Decode + verify
try:
    payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    print(payload["sub"])
except jwt.ExpiredSignatureError:
    print("Token expired")
except jwt.InvalidTokenError as e:
    print(f"Invalid: {e}")
```

## Standard JWT Claims

| Claim | Name | Description |
|-------|------|-------------|
| `iss` | Issuer | Who issued the token |
| `sub` | Subject | User identifier |
| `aud` | Audience | Intended recipient |
| `exp` | Expiration | Unix timestamp, reject after |
| `iat` | Issued At | Creation time |
| `nbf` | Not Before | Valid starting time |
| `jti` | JWT ID | Unique token identifier |

## Algorithm Comparison

| Algorithm | Type | Key | Use Case |
|-----------|------|-----|----------|
| HS256 | Symmetric | Shared secret | Internal services |
| RS256 | Asymmetric | RSA key pair | Public APIs |
| ES256 | Asymmetric | ECDSA key pair | Mobile apps |

## Security Best Practices

- Always verify signature before trusting claims
- Validate `exp`, `iss`, `aud` claims
- Use `httpOnly` cookies (not localStorage) to prevent XSS
- Keep expiry short (15min–1h) + refresh tokens
- Never put passwords or sensitive PII in payload
- Guard against `alg: none` attack — always specify allowed algorithms

## Quick Tool

For instant JWT decoding, use **[DevToolBox JWT Decoder](https://viadreams.cc/en/tools/jwt-decoder)** — paste a token to see header, payload, and signature breakdown instantly.

---

*Decode and debug JWTs instantly with [DevToolBox's free JWT Decoder](https://viadreams.cc/en/tools/jwt-decoder).*
