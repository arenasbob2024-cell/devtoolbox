'use client';

const translations = {
  en: {
    title: 'JWT Decoder: Decode and Debug JWTs Online — Complete Guide',
    description:
      'Decode, verify, and debug JWT tokens online. Complete guide covering JWT structure, JavaScript, Python, security best practices, and common errors.',
  },
  zh: {
    title: 'JWT 解码器：在线解码和调试 JWT 完整指南',
    description:
      '在线解码、验证和调试 JWT token。涵盖 JWT 结构、JavaScript、Python、安全最佳实践的完整指南。',
  },
  fr: {
    title: 'Décodeur JWT : Décoder et Déboguer les JWT en Ligne',
    description:
      'Décodez, vérifiez et déboguez les tokens JWT en ligne. Guide complet couvrant la structure JWT, JavaScript, Python, bonnes pratiques de sécurité.',
  },
  de: {
    title: 'JWT Decoder: JWTs Online Dekodieren und Debuggen',
    description:
      'JWT-Tokens online dekodieren, verifizieren und debuggen. Vollständiger Leitfaden zu JWT-Struktur, JavaScript, Python und Sicherheit.',
  },
  es: {
    title: 'Decodificador JWT: Decodificar y Depurar JWTs Online',
    description:
      'Decodifica, verifica y depura tokens JWT online. Guía completa sobre estructura JWT, JavaScript, Python y buenas prácticas de seguridad.',
  },
  ja: {
    title: 'JWTデコーダー：JWTをオンラインでデコード・デバッグする完全ガイド',
    description:
      'JWTトークンをオンラインでデコード、検証、デバッグします。JWT構造、JavaScript、Python、セキュリティのベストプラクティスを網羅した完全ガイド。',
  },
  ko: {
    title: 'JWT 디코더: JWT를 온라인으로 디코딩 및 디버깅하는 완전 가이드',
    description:
      'JWT 토큰을 온라인으로 디코딩, 검증, 디버깅합니다. JWT 구조, JavaScript, Python, 보안 모범 사례를 다루는 완전 가이드.',
  },
};

export default function JwtDecoderOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a JWT token?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JWT (JSON Web Token) is a compact, URL-safe token format defined in RFC 7519. It consists of three Base64URL-encoded parts separated by dots: Header (algorithm and token type), Payload (claims/data), and Signature (cryptographic proof of authenticity). JWTs are widely used for authentication and authorization in web applications.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I decode a JWT token online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To decode a JWT online, paste the token into the DevToolBox JWT Decoder tool at viadreams.cc. The tool instantly splits the token into its three parts, Base64URL-decodes the header and payload, and displays the JSON claims — no secret key required. Note: decoding only reads the content; it does not verify the signature.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between decoding and verifying a JWT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Decoding a JWT means Base64URL-decoding the header and payload to read the JSON claims. Anyone can decode a JWT without any key. Verifying a JWT means checking the cryptographic signature using the secret key (HS256) or public key (RS256/ES256) to confirm the token was issued by a trusted party and has not been tampered with. Never trust a decoded-but-unverified JWT for authorization decisions.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the standard JWT claims?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard JWT claims include: iss (issuer — who issued the token), sub (subject — who the token is about), aud (audience — who it is intended for), exp (expiration time — Unix timestamp after which the token is invalid), iat (issued at — when it was created), nbf (not before — earliest valid time), and jti (JWT ID — unique identifier to prevent replay attacks). Custom claims can be added for application-specific data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to decode a JWT in a browser?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Decoding a JWT in a browser is safe for inspection purposes because decoding only reads the Base64URL-encoded data. However, avoid pasting production JWTs containing sensitive user data into third-party online tools. Our DevToolBox JWT Decoder processes tokens entirely client-side in your browser — no tokens are sent to our servers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does JWT verification fail with "invalid signature"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JWT signature verification fails for several reasons: (1) wrong secret or key used for verification, (2) the token was modified after signing, (3) algorithm mismatch (e.g., token signed with RS256 but verified with HS256), (4) encoding issues with the key (e.g., the key was not properly base64-decoded). Check that your verification code uses the exact same algorithm and key that was used to sign the token.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the "alg: none" JWT vulnerability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The "alg: none" attack is a critical JWT vulnerability where an attacker changes the algorithm in the JWT header to "none" and removes the signature. Vulnerable libraries would then accept the token as valid without any signature check. Always explicitly specify allowed algorithms in your JWT library (e.g., algorithms=["HS256"]) and never accept "none" as a valid algorithm.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I store JWTs in localStorage or httpOnly cookies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Storing JWTs in httpOnly cookies is generally more secure because JavaScript cannot access them, protecting against XSS attacks. localStorage is accessible to JavaScript, making tokens vulnerable if your site has an XSS vulnerability. However, httpOnly cookies require CSRF protection. For high-security applications, use httpOnly, Secure, SameSite=Strict cookies with short-lived access tokens and refresh token rotation.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', lineHeight: '1.7', color: '#374151' }}>
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Canonical / SEO meta — handled by page.tsx, but include og description */}
      <meta
        name="description"
        content={t.description}
      />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A JWT is a three-part token (<strong>Header.Payload.Signature</strong>) encoded in Base64URL.
          You can <strong>decode</strong> any JWT without a key to read its claims. Use the{' '}
          <a href="/en/tools/jwt-decoder" style={{ color: '#0369a1' }}>
            DevToolBox JWT Decoder
          </a>{' '}
          to inspect tokens instantly. Always <strong>verify</strong> the signature server-side before
          trusting any claim for authorization. This guide covers JWT anatomy, decoding vs verifying,
          JavaScript (manual + jsonwebtoken + jose), Python (PyJWT), claims reference, algorithms,
          security best practices, debugging, and real-world patterns.
        </p>
      </div>

      {/* Section 1 — What is a JWT? */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        1. What Is a JWT? Anatomy of a JSON Web Token
      </h2>
      <p>
        A <strong>JSON Web Token (JWT)</strong>, standardized in{' '}
        <a
          href="https://datatracker.ietf.org/doc/html/rfc7519"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0369a1' }}
        >
          RFC 7519
        </a>
        , is a compact, self-contained token for securely transmitting information as a JSON object.
        JWTs are used for authentication (OAuth 2.0, OpenID Connect), API authorization (Bearer
        tokens), and SSO. A JWT looks like three Base64URL-encoded strings separated by dots:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJzdWIiOiJ1c2VyXzEyMyIsIm5hbWUiOiJBbGljZSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAzNjAwfQ
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        The Three Parts
      </h3>
      <p>
        <strong>Header</strong> — Base64URL-decoded, the header is a JSON object specifying the
        algorithm and token type:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`{
  "alg": "HS256",   // Algorithm: HS256, RS256, ES256, etc.
  "typ": "JWT"      // Token type
}`}</code>
      </pre>
      <p>
        <strong>Payload</strong> — Contains the <em>claims</em>: assertions about the user and
        additional metadata:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`{
  "sub": "user_123",           // Subject: who this token is about
  "name": "Alice",             // Custom claim
  "iat": 1700000000,           // Issued At (Unix timestamp)
  "exp": 1700003600,           // Expiration (1 hour later)
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com"
}`}</code>
      </pre>
      <p>
        <strong>Signature</strong> — Created by the issuer using their secret/private key. For HS256:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secret
)`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        JWT vs Session Tokens vs API Keys
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Property
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                JWT
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Session Token
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                API Key
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Stateless', 'Yes', 'No (server stores session)', 'No (server stores key)'],
              ['Built-in Expiry', 'Yes (exp claim)', 'Server-side controlled', 'Usually no'],
              ['Self-contained', 'Yes (claims in token)', 'No (data in DB)', 'No (opaque)'],
              ['Revocation Support', 'Hard (needs blocklist)', 'Easy (delete session)', 'Easy (delete key)'],
              ['Payload Size', 'Medium (grows with claims)', 'Tiny (just an ID)', 'Tiny'],
              ['Use Case', 'Auth, SSO, microservices', 'Traditional web apps', 'Server-to-server'],
            ].map(([prop, jwt, session, apikey]) => (
              <tr key={prop}>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                  {prop}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{jwt}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{session}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{apikey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2 — Decoding vs Verifying */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        2. Decoding vs Verifying — A Critical Distinction
      </h2>
      <p>
        Many developers confuse <em>decoding</em> and <em>verifying</em> a JWT. Understanding the
        difference is essential for building secure applications.
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Action
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                What It Does
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Key Required?
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Safe for AuthZ?
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                Decode
              </td>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>
                Base64URL-decodes header + payload to read JSON
              </td>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>No</td>
              <td
                style={{
                  padding: '0.65rem',
                  border: '1px solid #e2e8f0',
                  color: '#dc2626',
                  fontWeight: 600,
                }}
              >
                NEVER
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                Verify
              </td>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>
                Validates signature + checks exp, iss, aud claims
              </td>
              <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>Yes</td>
              <td
                style={{
                  padding: '0.65rem',
                  border: '1px solid #e2e8f0',
                  color: '#16a34a',
                  fontWeight: 600,
                }}
              >
                YES
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>When to decode only:</strong> Debugging, logging, displaying user info in a UI after
        the token has already been verified server-side, reading non-security-sensitive metadata.
      </p>
      <p>
        <strong>When to verify:</strong> Any time you make an authorization decision based on a JWT
        claim. If you call <code>jwt.decode()</code> instead of <code>jwt.verify()</code> in your
        authorization middleware, an attacker can craft a token with arbitrary claims and bypass
        security entirely.
      </p>
      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          padding: '0.75rem 1rem',
          margin: '1rem 0',
        }}
      >
        <strong style={{ color: '#dc2626' }}>Security Warning:</strong> Never use decoded-only JWT
        data for authorization. Always verify the signature server-side with a trusted library before
        granting access.
      </div>

      {/* Section 3 — Decode Online */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        3. Decode JWT Online with DevToolBox
      </h2>
      <p>
        The{' '}
        <a href="/en/tools/jwt-decoder" style={{ color: '#0369a1' }}>
          DevToolBox JWT Decoder
        </a>{' '}
        is a free, client-side tool that lets you paste any JWT and instantly see:
      </p>
      <ul>
        <li>
          <strong>Header</strong> — algorithm (<code>alg</code>), token type (<code>typ</code>), key
          ID (<code>kid</code>)
        </li>
        <li>
          <strong>Payload</strong> — all claims with human-readable timestamps for{' '}
          <code>exp</code>, <code>iat</code>, <code>nbf</code>
        </li>
        <li>
          <strong>Signature</strong> — raw signature bytes (for visual inspection)
        </li>
        <li>
          <strong>Expiration status</strong> — whether the token is currently valid, expired, or not
          yet active
        </li>
      </ul>
      <p>
        All processing happens in your browser — tokens are never sent to any server. This makes it
        safe for inspecting tokens in development and staging environments.
      </p>

      {/* Section 4 — Decode Without Library */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        4. JavaScript — Decode a JWT Without a Library
      </h2>
      <p>
        Since a JWT is just Base64URL-encoded JSON, you can decode the header and payload with
        standard built-in functions — no library needed. Base64URL differs from Base64 by using{' '}
        <code>-</code> instead of <code>+</code> and <code>_</code> instead of <code>/</code>, with
        no padding.
      </p>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Browser (using atob)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`function decodeJWT(token) {
  const [headerB64, payloadB64, signature] = token.split('.');

  function base64UrlDecode(str) {
    // Replace URL-safe chars, add padding
    const base64 = str
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(str.length + (4 - (str.length % 4)) % 4, '=');
    return JSON.parse(atob(base64));
  }

  return {
    header: base64UrlDecode(headerB64),
    payload: base64UrlDecode(payloadB64),
    signature,
  };
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMyIsImV4cCI6MTcwMDAwMzYwMH0.abc';
const decoded = decodeJWT(token);
console.log(decoded.header);   // { alg: 'HS256', typ: 'JWT' }
console.log(decoded.payload);  // { sub: 'user_123', exp: 1700003600 }

// Check expiration
const isExpired = decoded.payload.exp * 1000 < Date.now();
console.log('Expired:', isExpired);`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Node.js (using Buffer)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`function decodeJWTNode(token) {
  const [headerB64, payloadB64, signature] = token.split('.');

  function base64UrlDecode(str) {
    // Buffer.from handles base64url directly in Node.js
    return JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));
  }

  return {
    header: base64UrlDecode(headerB64),
    payload: base64UrlDecode(payloadB64),
    signature,
  };
}

// Usage
const { header, payload } = decodeJWTNode(token);
console.log(header);   // { alg: 'HS256', typ: 'JWT' }
console.log(payload);  // { sub: 'user_123', iat: 1700000000, exp: 1700003600 }

// Human-readable expiration
const expDate = new Date(payload.exp * 1000);
console.log('Expires:', expDate.toISOString());`}</code>
      </pre>

      {/* Section 5 — jsonwebtoken */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        5. JavaScript — The jsonwebtoken Library
      </h2>
      <p>
        The <strong>jsonwebtoken</strong> package is the most popular JWT library for Node.js with
        millions of weekly downloads. Install it with <code>npm install jsonwebtoken</code>.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`const jwt = require('jsonwebtoken');
// ESM: import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET; // Never hardcode in production

// --- SIGN a token ---
const payload = {
  sub: 'user_123',
  name: 'Alice',
  role: 'admin',
};

const token = jwt.sign(payload, SECRET, {
  algorithm: 'HS256',
  expiresIn: '1h',      // or 3600 (seconds)
  issuer: 'https://auth.example.com',
  audience: 'https://api.example.com',
});

// --- VERIFY a token (validates signature + claims) ---
try {
  const verified = jwt.verify(token, SECRET, {
    algorithms: ['HS256'],      // Explicitly whitelist algorithms!
    issuer: 'https://auth.example.com',
    audience: 'https://api.example.com',
  });
  console.log('Valid token. Subject:', verified.sub);
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    console.error('Token has expired at:', err.expiredAt);
  } else if (err.name === 'JsonWebTokenError') {
    console.error('Invalid token:', err.message);
  } else if (err.name === 'NotBeforeError') {
    console.error('Token not active yet:', err.date);
  }
}

// --- DECODE only (no verification — for inspection/logging) ---
const decoded = jwt.decode(token, { complete: true });
console.log(decoded.header);  // { alg: 'HS256', typ: 'JWT' }
console.log(decoded.payload); // { sub: 'user_123', iat: ..., exp: ... }
// WARNING: jwt.decode() is NOT safe for authorization!`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Async Callback Style
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// Promisified verify
const verifyAsync = (token, secret, options) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

// Usage with async/await
async function authenticate(token) {
  const payload = await verifyAsync(token, SECRET, {
    algorithms: ['HS256'],
  });
  return payload;
}`}</code>
      </pre>

      {/* Section 6 — jose Library */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        6. JavaScript — The jose Library (Modern, Edge-Compatible)
      </h2>
      <p>
        The <strong>jose</strong> library is a modern, dependency-free JWT library that runs in
        Node.js, browser, Deno, Cloudflare Workers, and other edge runtimes. It supports all JWA
        algorithms and is ideal for RS256/ES256 with JWKS. Install with{' '}
        <code>npm install jose</code>.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`import { jwtVerify, SignJWT, createRemoteJWKSet, decodeJwt } from 'jose';

// --- SIGN with HS256 ---
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const token = await new SignJWT({ sub: 'user_123', role: 'admin' })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('1h')
  .setIssuer('https://auth.example.com')
  .setAudience('https://api.example.com')
  .sign(secret);

// --- VERIFY with HS256 ---
const { payload, protectedHeader } = await jwtVerify(token, secret, {
  issuer: 'https://auth.example.com',
  audience: 'https://api.example.com',
});
console.log(payload.sub); // 'user_123'

// --- VERIFY with RS256/ES256 using JWKS endpoint ---
// Ideal for OAuth 2.0 / OpenID Connect
const JWKS = createRemoteJWKSet(
  new URL('https://auth.example.com/.well-known/jwks.json')
);

const { payload: oauthPayload } = await jwtVerify(accessToken, JWKS, {
  issuer: 'https://auth.example.com',
  audience: 'your-client-id',
  algorithms: ['RS256'],
});

// --- DECODE only (no verification) ---
const claims = decodeJwt(token);
console.log(claims.exp); // Expiration timestamp`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Next.js Middleware with jose
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// middleware.ts (runs at the Edge)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const { payload } = await jwtVerify(token, secret);
    // Attach user info to headers for downstream handlers
    const headers = new Headers(req.headers);
    headers.set('x-user-id', payload.sub as string);
    return NextResponse.next({ request: { headers } });
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};`}</code>
      </pre>

      {/* Section 7 — Python PyJWT */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        7. Python — PyJWT
      </h2>
      <p>
        <strong>PyJWT</strong> is the standard JWT library for Python. Install it with{' '}
        <code>pip install PyJWT</code>. For RS256/ES256, also install{' '}
        <code>pip install cryptography</code>.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`import jwt
import os
from datetime import datetime, timedelta, timezone

SECRET = os.environ["JWT_SECRET"]

# --- ENCODE (sign) a token ---
payload = {
    "sub": "user_123",
    "name": "Alice",
    "iat": datetime.now(tz=timezone.utc),
    "exp": datetime.now(tz=timezone.utc) + timedelta(hours=1),
    "iss": "https://auth.example.com",
    "aud": "https://api.example.com",
}
token = jwt.encode(payload, SECRET, algorithm="HS256")
print(token)  # "eyJhbGci..."

# --- DECODE and VERIFY ---
try:
    decoded = jwt.decode(
        token,
        SECRET,
        algorithms=["HS256"],       # Explicitly whitelist!
        audience="https://api.example.com",
        issuer="https://auth.example.com",
    )
    print("Subject:", decoded["sub"])
except jwt.ExpiredSignatureError:
    print("Token has expired")
except jwt.InvalidAudienceError:
    print("Audience mismatch")
except jwt.InvalidIssuerError:
    print("Issuer mismatch")
except jwt.InvalidTokenError as e:
    print("Invalid token:", e)

# --- DECODE only (no verification) ---
# options={"verify_signature": False} disables sig check
unverified = jwt.decode(
    token,
    options={"verify_signature": False},
    algorithms=["HS256"],
)
print("Unverified payload:", unverified)
# WARNING: Only use this for inspection/debugging!`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Python — RS256 with a Public Key
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`from cryptography.hazmat.primitives import serialization

# Load RSA public key (for verification only)
with open("public_key.pem", "rb") as f:
    public_key = serialization.load_pem_public_key(f.read())

decoded = jwt.decode(
    token,
    public_key,
    algorithms=["RS256"],
    audience="https://api.example.com",
)

# Load RSA private key (for signing)
with open("private_key.pem", "rb") as f:
    private_key = serialization.load_pem_private_key(f.read(), password=None)

token = jwt.encode(payload, private_key, algorithm="RS256")`}</code>
      </pre>

      {/* Section 8 — JWT Claims Reference */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        8. JWT Claims Reference
      </h2>
      <p>
        The JWT specification defines a set of <em>registered claim names</em> with well-known
        meanings. All timestamps are Unix timestamps (seconds since epoch, not milliseconds).
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Claim
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Full Name
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Description
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Type
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Required?
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['iss', 'Issuer', 'Who issued the token (URL or identifier)', 'String', 'Recommended'],
              ['sub', 'Subject', 'Who the token is about (user ID)', 'String', 'Recommended'],
              ['aud', 'Audience', 'Intended recipient(s) of the token', 'String/Array', 'Recommended'],
              ['exp', 'Expiration', 'When the token expires (Unix timestamp)', 'Number', 'Strongly recommended'],
              ['iat', 'Issued At', 'When the token was created', 'Number', 'Recommended'],
              ['nbf', 'Not Before', 'Token not valid before this time', 'Number', 'Optional'],
              ['jti', 'JWT ID', 'Unique identifier (prevents replay attacks)', 'String', 'Optional'],
            ].map(([claim, name, desc, type, req]) => (
              <tr key={claim}>
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                  }}
                >
                  {claim}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{name}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{desc}</td>
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'monospace',
                  }}
                >
                  {type}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Validating Claims Manually (JavaScript)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`function validateClaims(payload, options = {}) {
  const now = Math.floor(Date.now() / 1000); // Current Unix timestamp

  // Check expiration (exp)
  if (payload.exp && payload.exp < now) {
    throw new Error(\`Token expired at \${new Date(payload.exp * 1000).toISOString()}\`);
  }

  // Check not-before (nbf)
  if (payload.nbf && payload.nbf > now) {
    throw new Error(\`Token not yet valid until \${new Date(payload.nbf * 1000).toISOString()}\`);
  }

  // Check issuer (iss)
  if (options.issuer && payload.iss !== options.issuer) {
    throw new Error(\`Invalid issuer: expected \${options.issuer}, got \${payload.iss}\`);
  }

  // Check audience (aud)
  if (options.audience) {
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(options.audience)) {
      throw new Error(\`Invalid audience: \${payload.aud}\`);
    }
  }

  return true;
}`}</code>
      </pre>

      {/* Section 9 — Algorithms */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        9. JWT Signing Algorithms Compared
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Algorithm
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Type
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Key Type
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Best For
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Security Level
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['HS256', 'Symmetric (HMAC)', 'Shared secret', 'Single service (same signer + verifier)', 'Good (if secret is strong)'],
              ['HS384', 'Symmetric (HMAC)', 'Shared secret', 'Same as HS256, larger digest', 'Good'],
              ['HS512', 'Symmetric (HMAC)', 'Shared secret', 'Same as HS256, largest digest', 'Good'],
              ['RS256', 'Asymmetric (RSA)', 'Private + Public key', 'Microservices, OAuth 2.0, OIDC', 'Strong'],
              ['RS384', 'Asymmetric (RSA)', 'Private + Public key', 'Higher security RSA', 'Strong'],
              ['ES256', 'Asymmetric (ECDSA)', 'EC Private + Public key', 'Mobile, IoT, performance-critical', 'Very Strong'],
              ['EdDSA', 'Asymmetric (Ed25519)', 'Ed25519 key pair', 'Modern systems, small tokens', 'Very Strong'],
              ['none', 'No signature', 'None', 'NEVER use in production', 'None (dangerous)'],
            ].map(([alg, type, key, use, level]) => (
              <tr
                key={alg}
                style={{ background: alg === 'none' ? '#fef2f2' : undefined }}
              >
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: alg === 'none' ? '#dc2626' : undefined,
                  }}
                >
                  {alg}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{type}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{key}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{use}</td>
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    color: alg === 'none' ? '#dc2626' : undefined,
                  }}
                >
                  {level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <strong>When to use HS256:</strong> When both the issuer and verifier are the same service
        and you can securely share a secret. Simple, fast, no key infrastructure needed.
      </p>
      <p>
        <strong>When to use RS256/ES256:</strong> In distributed systems where multiple services need
        to verify tokens but only one service should sign them. The auth server holds the private key;
        all other services use the public key (often fetched from a JWKS endpoint).
      </p>
      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '6px',
          padding: '0.75rem 1rem',
          margin: '1rem 0',
        }}
      >
        <strong style={{ color: '#dc2626' }}>The alg: none Attack:</strong> Some vulnerable JWT
        libraries accept tokens with <code>{"alg: 'none'"}</code> and no signature, treating them as
        valid. Always explicitly whitelist allowed algorithms and reject <code>none</code>. Never
        accept the algorithm from the token header without cross-checking it against your expected
        algorithm.
      </div>

      {/* Section 10 — Security Best Practices */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        10. JWT Security Best Practices
      </h2>
      <ul>
        <li>
          <strong>Always verify the signature</strong> — never use <code>decode()</code> for
          authorization; always use <code>verify()</code>.
        </li>
        <li>
          <strong>Validate critical claims</strong> — always check <code>exp</code>, <code>iss</code>
          , and <code>aud</code> during verification.
        </li>
        <li>
          <strong>Whitelist algorithms</strong> — explicitly specify allowed algorithms in your
          library, e.g., <code>algorithms: [&apos;HS256&apos;]</code>. Never accept{' '}
          <code>none</code>.
        </li>
        <li>
          <strong>Use HTTPS always</strong> — JWTs sent over HTTP can be intercepted. Always use TLS.
        </li>
        <li>
          <strong>Short-lived access tokens</strong> — keep access token expiry to 15 minutes or 1
          hour. Use refresh tokens for session persistence.
        </li>
        <li>
          <strong>Rotate refresh tokens</strong> — issue a new refresh token on every use (refresh
          token rotation) and invalidate the old one.
        </li>
        <li>
          <strong>Store tokens securely</strong> — prefer httpOnly, Secure, SameSite=Strict cookies
          over localStorage to prevent XSS access.
        </li>
        <li>
          <strong>No sensitive data in payload</strong> — the payload is only Base64URL-encoded, not
          encrypted. Anyone who obtains the token can decode it. Never put passwords, SSNs, or PII.
        </li>
        <li>
          <strong>Use strong secrets</strong> — for HS256, use at least 256 bits (32 bytes) of random
          entropy. Never use a dictionary word or short string.
        </li>
        <li>
          <strong>Implement token revocation</strong> — maintain a blocklist (Redis with TTL) for
          cases where you need to invalidate tokens before expiry (logout, password change).
        </li>
        <li>
          <strong>Clock skew tolerance</strong> — allow a small clock skew (up to 30 seconds) for{' '}
          <code>nbf</code> and <code>exp</code> validation when services have slightly different
          system clocks.
        </li>
      </ul>
      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        localStorage vs httpOnly Cookies — Tradeoffs
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Aspect
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                localStorage
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                httpOnly Cookie
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['XSS protection', 'Vulnerable (JS can read it)', 'Protected (JS cannot read it)'],
              ['CSRF protection', 'Immune (not auto-sent)', 'Requires CSRF token or SameSite'],
              ['CORS handling', 'Easy', 'Requires credentials: include'],
              ['Persistence', 'Until cleared', 'Controlled by Max-Age/Expires'],
              ['Mobile app use', 'Easy', 'Requires custom handling'],
              ['Recommendation', 'Avoid for sensitive tokens', 'Preferred for web apps'],
            ].map(([aspect, ls, cookie]) => (
              <tr key={aspect}>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                  {aspect}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{ls}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{cookie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 11 — Debugging Common Errors */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        11. Debugging Common JWT Errors
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Error
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Cause
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                Fix
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                'TokenExpiredError',
                'exp claim is in the past',
                'Refresh the token using a refresh token or re-authenticate',
              ],
              [
                'JsonWebTokenError: invalid signature',
                'Token tampered with, or wrong key used',
                'Check that the same key used to sign is used to verify',
              ],
              [
                'JsonWebTokenError: invalid algorithm',
                'alg in token header does not match expected',
                'Explicitly set algorithms whitelist; check token header',
              ],
              [
                'NotBeforeError',
                'nbf claim is in the future',
                'Allow clock skew tolerance (e.g., clockTolerance: 30)',
              ],
              [
                'Invalid audience',
                'aud claim does not match expected value',
                'Ensure aud in token matches the audience you specify during verify',
              ],
              [
                'Malformed JWT',
                'Token does not have 3 dot-separated parts',
                'Check token is not truncated; ensure Bearer prefix is stripped',
              ],
              [
                'Invalid issuer',
                'iss claim does not match expected issuer',
                'Check issuer URL matches exactly (trailing slash matters)',
              ],
              [
                'Clock skew',
                'Server clocks out of sync causing exp/nbf issues',
                'Sync clocks with NTP; add clockTolerance in verification options',
              ],
            ].map(([error, cause, fix]) => (
              <tr key={error}>
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    color: '#dc2626',
                  }}
                >
                  {error}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{cause}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Debug Checklist
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// 1. Decode the token first to inspect claims
const decoded = jwt.decode(token, { complete: true });
console.log('Header:', decoded?.header);
console.log('Payload:', decoded?.payload);

// 2. Check expiration manually
const now = Math.floor(Date.now() / 1000);
console.log('Current time:', now);
console.log('Token exp:', decoded?.payload?.exp);
console.log('Expired:', decoded?.payload?.exp < now);

// 3. Check issuer and audience
console.log('iss:', decoded?.payload?.iss);
console.log('aud:', decoded?.payload?.aud);

// 4. Verify with explicit options to get specific errors
try {
  jwt.verify(token, SECRET, {
    algorithms: ['HS256'],
    // Comment these out temporarily to isolate issues:
    // issuer: 'https://auth.example.com',
    // audience: 'https://api.example.com',
  });
} catch (err) {
  console.error('Verification error name:', err.name);
  console.error('Verification error message:', err.message);
}`}</code>
      </pre>

      {/* Section 12 — Real-World Patterns */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        12. Real-World JWT Patterns
      </h2>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Express.js Auth Middleware
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });
    req.user = payload;
    next();
  } catch (err) {
    const status = err.name === 'TokenExpiredError' ? 401 : 403;
    return res.status(status).json({ error: err.message });
  }
}

// Role-based access control
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Usage
app.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin area', user: req.user.sub });
});`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        Refresh Token Rotation Pattern
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// POST /auth/refresh
async function refreshTokens(req, res) {
  const { refreshToken } = req.cookies; // httpOnly cookie
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  // 1. Verify the refresh token
  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET, {
      algorithms: ['HS256'],
    });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }

  // 2. Check it exists in the database (rotation tracking)
  const stored = await db.refreshTokens.findOne({ token: refreshToken, userId: payload.sub });
  if (!stored) return res.status(401).json({ error: 'Refresh token reuse detected' });

  // 3. Delete the used refresh token (invalidate)
  await db.refreshTokens.deleteOne({ token: refreshToken });

  // 4. Issue new token pair
  const newAccessToken = jwt.sign(
    { sub: payload.sub, role: payload.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m', algorithms: ['HS256'] }
  );
  const newRefreshToken = jwt.sign(
    { sub: payload.sub },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // 5. Store new refresh token
  await db.refreshTokens.insertOne({ token: newRefreshToken, userId: payload.sub });

  // 6. Set httpOnly cookie + return access token
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken: newAccessToken });
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.15rem', fontWeight: '600', marginTop: '1.5rem', color: '#1e293b' }}>
        JWKS Endpoint for Microservices (jose)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1rem',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '0.875rem',
        }}
      >
        <code>{`// In any microservice — verify tokens issued by auth service
import { createRemoteJWKSet, jwtVerify } from 'jose';

// Fetch public keys from auth server's JWKS endpoint
// Keys are cached automatically by jose
const JWKS = createRemoteJWKSet(
  new URL(\`\${process.env.AUTH_SERVER}/.well-known/jwks.json\`)
);

async function verifyToken(token) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: process.env.AUTH_SERVER,
    audience: process.env.SERVICE_NAME,
    algorithms: ['RS256'],
  });
  return payload;
}

// Each microservice can verify tokens independently
// without sharing any secret — only the auth server has the private key`}</code>
      </pre>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1rem',
          marginTop: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
          <li>
            A JWT has three Base64URL-encoded parts: <strong>Header</strong>,{' '}
            <strong>Payload</strong>, and <strong>Signature</strong>, joined by dots.
          </li>
          <li>
            <strong>Decoding</strong> reads the claims without verifying authenticity.{' '}
            <strong>Verifying</strong> validates the cryptographic signature — always do this for
            authorization.
          </li>
          <li>
            Use the{' '}
            <a href="/en/tools/jwt-decoder" style={{ color: '#0369a1' }}>
              DevToolBox JWT Decoder
            </a>{' '}
            to inspect tokens instantly — all client-side, nothing sent to servers.
          </li>
          <li>
            In JavaScript, use <strong>jsonwebtoken</strong> for Node.js or <strong>jose</strong>{' '}
            for edge runtimes. In Python, use <strong>PyJWT</strong>.
          </li>
          <li>
            Standard claims: <code>iss</code>, <code>sub</code>, <code>aud</code>, <code>exp</code>,{' '}
            <code>iat</code>, <code>nbf</code>, <code>jti</code> — always validate them.
          </li>
          <li>
            Use <strong>HS256</strong> for single-service auth, <strong>RS256/ES256</strong> for
            distributed/microservice architectures.
          </li>
          <li>
            Never trust <code>alg: none</code>. Always whitelist algorithms explicitly. Never put
            sensitive data in the payload.
          </li>
          <li>
            Store JWTs in <strong>httpOnly cookies</strong> (not localStorage) to protect against XSS
            attacks.
          </li>
          <li>
            Use short-lived access tokens (15m–1h) with <strong>refresh token rotation</strong> for
            long-lived sessions.
          </li>
        </ul>
      </div>
    </article>
  );
}
