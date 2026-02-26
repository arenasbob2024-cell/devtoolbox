'use client';

import Link from 'next/link';

export default function JwtDecoderOnlineGuide({ lang }: { lang: string }) {
  return (
    <>
      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          A JWT (JSON Web Token) is a compact, URL-safe token format used for authentication, authorization, and information exchange. You can decode any JWT to inspect its header and payload without a secret key. Use our <Link href={`/${lang}/tools/jwt-decoder`}>free JWT decoder online</Link> to paste a token and instantly see every claim. This guide explains JWT structure, standard claims, decoding in JavaScript, Python, Go, and Java, signing algorithms, security best practices, and common mistakes.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1.05em' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>A JWT consists of three Base64URL-encoded parts: <strong>Header</strong>, <strong>Payload</strong>, and <strong>Signature</strong>, separated by dots.</li>
          <li>Decoding a JWT only reveals the header and payload. It does <strong>not</strong> verify the signature. Verification requires the signing key.</li>
          <li>Standard claims like <code>exp</code>, <code>iss</code>, <code>sub</code>, and <code>aud</code> control token expiration, issuer, subject, and audience.</li>
          <li>Never store sensitive data (passwords, credit card numbers) in JWT payloads because anyone can decode them.</li>
          <li>Use asymmetric algorithms (RS256, ES256, EdDSA) for distributed systems and HS256 only when the signer and verifier are the same service.</li>
          <li>Always validate the <code>exp</code> claim server-side and reject expired tokens.</li>
        </ul>
      </div>

      <h2>What Is a JWT and Why Decode It?</h2>
      <p>
        A <strong>JSON Web Token (JWT)</strong>, defined in <a href="https://datatracker.ietf.org/doc/html/rfc7519" target="_blank" rel="noopener noreferrer">RFC 7519</a>, is a compact, self-contained token format for securely transmitting information between parties as a JSON object. JWTs are widely used in modern web applications for authentication (OAuth 2.0, OpenID Connect), API authorization (bearer tokens), single sign-on (SSO), and information exchange between microservices.
      </p>
      <p>
        When you work with JWTs, you frequently need to <strong>decode</strong> them to inspect the claims inside. Common scenarios include debugging authentication failures, verifying token expiration, checking issued-at timestamps, confirming audience and issuer values, and understanding what permissions or scopes a token carries. A <strong>JWT decoder</strong> parses the Base64URL-encoded header and payload without verifying the cryptographic signature, giving you instant visibility into the token contents.
      </p>
      <p>
        While libraries exist for every programming language, an <strong>online JWT decoder</strong> provides instant results without writing code. Paste your token, see the decoded header and payload, and identify issues in seconds. Try our <Link href={`/${lang}/tools/jwt-decoder`}>JWT decoder tool</Link> to get started.
      </p>

      <h2>JWT Decoder Online &mdash; Inspect Tokens Instantly</h2>
      <p>
        Our <Link href={`/${lang}/tools/jwt-decoder`}>free JWT decoder online tool</Link> lets you paste any JWT and immediately see:
      </p>
      <ul>
        <li><strong>Header</strong>: The algorithm (<code>alg</code>) and token type (<code>typ</code>).</li>
        <li><strong>Payload</strong>: All claims including <code>sub</code>, <code>iss</code>, <code>aud</code>, <code>exp</code>, <code>iat</code>, <code>nbf</code>, custom claims, and more.</li>
        <li><strong>Signature</strong>: The raw signature bytes (displayed but not verified without a key).</li>
        <li><strong>Expiration status</strong>: Whether the token is expired based on the <code>exp</code> claim.</li>
      </ul>
      <p>
        The tool runs entirely in your browser. No tokens are sent to any server. This makes it safe for inspecting production tokens during debugging. It works as a <strong>JWT debugger</strong>, <strong>JWT token decoder</strong>, and <strong>JWT inspector</strong> all in one.
      </p>
      <p>
        Here is an example JWT you can paste into the decoder:
      </p>
      <pre><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`}</code></pre>
      <p>
        Decoded, the header reveals <code>{`{"alg":"HS256","typ":"JWT"}`}</code> and the payload contains <code>sub</code>, <code>name</code>, and <code>iat</code> claims.
      </p>

      <h2>JWT Structure Deep Dive</h2>
      <p>
        Every JWT is a string of three Base64URL-encoded segments separated by periods (<code>.</code>):
      </p>
      <pre><code>{`<Header>.<Payload>.<Signature>`}</code></pre>
      <p>
        Each segment serves a distinct purpose:
      </p>

      <h3>1. Header</h3>
      <p>
        The header is a JSON object that describes the token type and the signing algorithm. It is Base64URL-encoded to form the first segment.
      </p>
      <pre><code className="language-json">{`{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "my-key-id-2026"
}`}</code></pre>
      <p>
        The <code>alg</code> field specifies the algorithm used to sign the token (e.g., HS256, RS256, ES256, EdDSA). The optional <code>kid</code> (Key ID) field helps the verifier select the correct public key from a JWKS (JSON Web Key Set) endpoint, which is essential in key rotation scenarios.
      </p>

      <h3>2. Payload</h3>
      <p>
        The payload contains the <strong>claims</strong> &mdash; statements about the user and additional metadata. Claims are categorized as registered (standardized by RFC 7519), public (collision-resistant names), and private (custom claims agreed upon between parties).
      </p>
      <pre><code className="language-json">{`{
  "sub": "user-42",
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com",
  "exp": 1735689600,
  "iat": 1735686000,
  "nbf": 1735686000,
  "jti": "unique-token-id-abc123",
  "roles": ["admin", "editor"],
  "email": "user@example.com"
}`}</code></pre>

      <h3>3. Signature</h3>
      <p>
        The signature ensures the token has not been tampered with. For HMAC-based algorithms, the signature is computed as:
      </p>
      <pre><code>{`HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)`}</code></pre>
      <p>
        For RSA or ECDSA algorithms, the private key signs the data and the corresponding public key verifies it. The <strong>JWT decoder</strong> only decodes the first two parts; it does not verify the signature. To verify, you need the secret (symmetric) or public key (asymmetric).
      </p>

      <h2>Standard JWT Claims Explained</h2>
      <p>
        RFC 7519 defines seven registered claim names. Understanding these is critical for implementing JWT-based authentication correctly:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Claim</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Full Name</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>iss</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Issuer</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Identifies the principal that issued the JWT. Typically a URL like <code>https://auth.example.com</code>.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>sub</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Subject</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The subject of the token, usually a user ID or username.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>aud</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Audience</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String or Array</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The intended recipients. A token with <code>aud: "https://api.example.com"</code> should only be accepted by that API.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>exp</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Expiration Time</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Number (Unix timestamp)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The time after which the token must not be accepted. Always validate this server-side.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>nbf</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Not Before</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Number (Unix timestamp)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>The time before which the token must not be accepted. Useful for delayed activation.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>iat</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Issued At</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Number (Unix timestamp)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>When the token was created. Useful for determining token age.</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><code>jti</code></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>JWT ID</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>String</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>A unique identifier for the token. Prevents replay attacks when tracked server-side.</td>
          </tr>
        </tbody>
      </table>
      <p>
        When you <strong>decode a JWT</strong> with our <Link href={`/${lang}/tools/jwt-decoder`}>online tool</Link>, all of these claims are displayed with human-readable timestamps for <code>exp</code>, <code>nbf</code>, and <code>iat</code>.
      </p>

      <h2>Decoding JWTs in JavaScript</h2>
      <p>
        In browser or Node.js environments, you can decode a JWT without any library using the built-in <code>atob</code> function (or <code>Buffer</code> in Node.js). Remember: decoding is not verification.
      </p>
      <h3>Method 1: Using atob (Browser)</h3>
      <pre><code className="language-javascript">{`function decodeJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: expected 3 parts');
  }

  // Base64URL to Base64 conversion
  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  // Decode and parse
  const payload = JSON.parse(atob(base64));
  return payload;
}

// Usage
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyLTQyIiwiZXhwIjoxNzM1Njg5NjAwfQ.signature';
const claims = decodeJwt(token);
console.log(claims.sub); // "user-42"
console.log(new Date(claims.exp * 1000)); // Expiration date`}</code></pre>

      <h3>Method 2: Using jose Library (Recommended for Production)</h3>
      <p>
        The <code>jose</code> library provides type-safe JWT handling with full verification support. Install it with <code>npm install jose</code>:
      </p>
      <pre><code className="language-javascript">{`import { decodeJwt, jwtVerify } from 'jose';

// Decode only (no verification)
const claims = decodeJwt(token);
console.log(claims);

// Full verification with a secret
const secret = new TextEncoder().encode('your-256-bit-secret');
const { payload, protectedHeader } = await jwtVerify(token, secret, {
  issuer: 'https://auth.example.com',
  audience: 'https://api.example.com',
});
console.log(payload.sub);       // "user-42"
console.log(protectedHeader.alg); // "HS256"`}</code></pre>

      <h3>Method 3: Using Node.js Buffer</h3>
      <pre><code className="language-javascript">{`function decodeJwtNode(token) {
  const payload = token.split('.')[1];
  const decoded = Buffer.from(payload, 'base64url').toString('utf8');
  return JSON.parse(decoded);
}

const claims = decodeJwtNode(token);
console.log(claims);`}</code></pre>

      <h2>Decoding JWTs in Python</h2>
      <p>
        Python developers typically use the <code>PyJWT</code> library (<code>pip install pyjwt</code>) for both decoding and verification:
      </p>
      <pre><code className="language-python">{`import jwt
import json
import base64

# Method 1: Using PyJWT (recommended)
# Decode without verification
claims = jwt.decode(token, options={"verify_signature": False})
print(claims["sub"])  # "user-42"
print(claims["exp"])  # 1735689600

# Decode WITH verification
claims = jwt.decode(
    token,
    key="your-secret-key",
    algorithms=["HS256"],
    audience="https://api.example.com",
    issuer="https://auth.example.com",
)

# Method 2: Manual decoding (no dependencies)
def decode_jwt_manual(token: str) -> dict:
    """Decode a JWT payload without verification."""
    parts = token.split(".")
    if len(parts) != 3:
        raise ValueError("Invalid JWT format")

    payload = parts[1]
    # Add padding if necessary
    padding = 4 - len(payload) % 4
    if padding != 4:
        payload += "=" * padding

    decoded = base64.urlsafe_b64decode(payload)
    return json.loads(decoded)

claims = decode_jwt_manual(token)
print(claims)`}</code></pre>
      <p>
        For RSA-signed tokens, pass the public key instead of a shared secret:
      </p>
      <pre><code className="language-python">{`from jwt import PyJWKClient

# Fetch public keys from JWKS endpoint
jwks_client = PyJWKClient("https://auth.example.com/.well-known/jwks.json")
signing_key = jwks_client.get_signing_key_from_jwt(token)

claims = jwt.decode(
    token,
    key=signing_key.key,
    algorithms=["RS256"],
    audience="https://api.example.com",
)`}</code></pre>

      <h2>Decoding JWTs in Go and Java</h2>

      <h3>Go: Using golang-jwt</h3>
      <p>
        The <code>golang-jwt/jwt/v5</code> package is the standard Go library for JWT handling:
      </p>
      <pre><code className="language-go">{`package main

import (
    "encoding/base64"
    "encoding/json"
    "fmt"
    "strings"

    "github.com/golang-jwt/jwt/v5"
)

// Method 1: Decode without verification
func decodeJWT(tokenString string) (jwt.MapClaims, error) {
    parts := strings.Split(tokenString, ".")
    if len(parts) != 3 {
        return nil, fmt.Errorf("invalid JWT: expected 3 parts")
    }

    payload, err := base64.RawURLEncoding.DecodeString(parts[1])
    if err != nil {
        return nil, err
    }

    var claims jwt.MapClaims
    if err := json.Unmarshal(payload, &claims); err != nil {
        return nil, err
    }
    return claims, nil
}

// Method 2: Parse and verify
func verifyJWT(tokenString string, secret []byte) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v",
                token.Header["alg"])
        }
        return secret, nil
    })
}

func main() {
    tokenString := "eyJhbGciOiJIUzI1NiJ9..."
    claims, _ := decodeJWT(tokenString)
    fmt.Println("Subject:", claims["sub"])
}`}</code></pre>

      <h3>Java: Using java-jwt and jjwt</h3>
      <p>
        Java has two popular JWT libraries. Here are examples for both:
      </p>
      <pre><code className="language-java">{`// Using auth0/java-jwt
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

DecodedJWT decoded = JWT.decode(tokenString);
System.out.println("Subject: " + decoded.getSubject());
System.out.println("Issuer: " + decoded.getIssuer());
System.out.println("Expires: " + decoded.getExpiresAt());
System.out.println("Algorithm: " + decoded.getAlgorithm());

// Access custom claims
String role = decoded.getClaim("role").asString();
List<String> scopes = decoded.getClaim("scopes").asList(String.class);

// Using io.jsonwebtoken/jjwt (verification included)
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;

Claims claims = Jwts.parserBuilder()
    .setSigningKey(secretKey)
    .requireIssuer("https://auth.example.com")
    .requireAudience("https://api.example.com")
    .build()
    .parseClaimsJws(tokenString)
    .getBody();

System.out.println("Subject: " + claims.getSubject());
System.out.println("Expiration: " + claims.getExpiration());`}</code></pre>

      <h2>JWT Signing Algorithms Compared</h2>
      <p>
        Choosing the right signing algorithm is one of the most important JWT decisions. The algorithm determines both security and architecture:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Algorithm</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Key Size</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Best For</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>HS256</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Symmetric (HMAC)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>256-bit secret</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Single-service apps where signer and verifier share the same secret</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fastest</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>RS256</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Asymmetric (RSA)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2048+ bit key pair</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Distributed systems, JWKS, third-party verification</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Slower signing, fast verification</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>ES256</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Asymmetric (ECDSA)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>P-256 curve</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Mobile apps, smaller token sizes, modern systems</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fast, compact signatures</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>EdDSA</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Asymmetric (Ed25519)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Ed25519 curve</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Highest security, new projects, post-quantum readiness</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Fastest asymmetric</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}><strong>PS256</strong></td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Asymmetric (RSA-PSS)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>2048+ bit key pair</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Financial systems, compliance-heavy environments</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Similar to RS256</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Recommendation:</strong> For new projects, use <strong>ES256</strong> or <strong>EdDSA</strong>. They provide strong security with compact signatures and fast performance. Use RS256 if you need broad library compatibility. Avoid HS256 in distributed systems because sharing secrets across services increases attack surface.
      </p>

      <h2>JWT Security Best Practices</h2>
      <p>
        JWTs are powerful but can introduce serious vulnerabilities if misused. Follow these best practices to keep your authentication secure:
      </p>
      <ol>
        <li>
          <strong>Always validate the signature server-side.</strong> Never trust a JWT just because it decodes successfully. Decoding reveals the claims, but verification confirms the token was issued by your trusted authority and has not been tampered with.
        </li>
        <li>
          <strong>Check the <code>exp</code> claim on every request.</strong> Tokens should have short lifetimes (15 minutes for access tokens, hours to days for refresh tokens). Reject expired tokens immediately.
        </li>
        <li>
          <strong>Validate <code>iss</code> and <code>aud</code> claims.</strong> Ensure the token was issued by your auth server and is intended for your API. This prevents tokens issued for one service from being used on another.
        </li>
        <li>
          <strong>Never put sensitive data in the payload.</strong> The payload is only Base64URL-encoded, not encrypted. Anyone who intercepts the token can decode it. Never include passwords, credit card numbers, or PII beyond what is necessary.
        </li>
        <li>
          <strong>Use HTTPS everywhere.</strong> JWTs transmitted over unencrypted connections can be intercepted. Always use TLS/HTTPS for API calls carrying bearer tokens.
        </li>
        <li>
          <strong>Implement token revocation.</strong> Since JWTs are stateless, you cannot invalidate them by default. Maintain a server-side blocklist for critical scenarios (user logout, password change, account compromise).
        </li>
        <li>
          <strong>Rotate signing keys regularly.</strong> Use the <code>kid</code> header claim with a JWKS endpoint to support key rotation without downtime.
        </li>
        <li>
          <strong>Set the <code>alg</code> allowlist on the verifier.</strong> Never allow <code>{'"alg":"none"'}</code>. Explicitly specify which algorithms your verifier accepts to prevent algorithm confusion attacks.
        </li>
        <li>
          <strong>Store tokens securely on the client.</strong> In browsers, use HttpOnly, Secure, SameSite cookies rather than localStorage. In mobile apps, use the platform keychain or secure storage.
        </li>
        <li>
          <strong>Use refresh token rotation.</strong> Issue a new refresh token with each access token refresh and invalidate the old one. This limits the damage if a refresh token is compromised.
        </li>
      </ol>

      <h2>Common JWT Mistakes and How to Fix Them</h2>
      <p>
        These are the most frequent JWT-related bugs and security issues developers encounter:
      </p>

      <h3>Mistake 1: Not Validating the Signature</h3>
      <p>
        Decoding a JWT is not the same as verifying it. If your server only decodes the token and reads the claims without verifying the signature, an attacker can forge tokens with any claims they want.
      </p>
      <pre><code className="language-javascript">{`// WRONG: Only decoding, not verifying
const claims = JSON.parse(atob(token.split('.')[1]));
if (claims.role === 'admin') { /* grant access */ }

// CORRECT: Verify signature first
const { payload } = await jwtVerify(token, publicKey, {
  algorithms: ['RS256'],
  issuer: 'https://auth.example.com',
});
if (payload.role === 'admin') { /* grant access */ }`}</code></pre>

      <h3>Mistake 2: Accepting Expired Tokens</h3>
      <p>
        Always check the <code>exp</code> claim. Most JWT libraries do this by default, but custom implementations often skip it.
      </p>
      <pre><code className="language-python">{`# WRONG: Ignoring expiration
claims = jwt.decode(token, options={"verify_exp": False})

# CORRECT: Let the library reject expired tokens (default behavior)
claims = jwt.decode(token, key=secret, algorithms=["HS256"])`}</code></pre>

      <h3>Mistake 3: Using alg: none</h3>
      <p>
        The <code>none</code> algorithm means the token has no signature. If your verifier accepts <code>none</code>, anyone can create valid tokens. Always specify an explicit algorithm allowlist.
      </p>

      <h3>Mistake 4: Storing Tokens in localStorage</h3>
      <p>
        Tokens in localStorage are accessible to any JavaScript running on the page, making them vulnerable to XSS attacks. Use HttpOnly cookies instead, which cannot be accessed by JavaScript.
      </p>

      <h3>Mistake 5: Token Lifetime Too Long</h3>
      <p>
        Tokens with long lifetimes (days or weeks) give attackers a large window to exploit stolen tokens. Use short-lived access tokens (5-15 minutes) with refresh tokens for long sessions.
      </p>

      <h3>Mistake 6: Confusing Encoding with Encryption</h3>
      <p>
        Base64URL encoding is <strong>not</strong> encryption. Anyone can decode a JWT payload. If you need encrypted tokens, use JWE (JSON Web Encryption, RFC 7516) instead of JWS (JSON Web Signature).
      </p>

      <h2>JWT vs Session Tokens vs API Keys</h2>
      <p>
        Understanding when to use JWTs versus other authentication mechanisms helps you make the right architectural decision:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>JWT</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Session Token</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>API Key</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>State</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stateless (self-contained)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stateful (server-side store)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Stateless (lookup required)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Revocation</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Requires blocklist or short TTL</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Instant (delete from store)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Instant (delete from database)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Scalability</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Excellent (no shared state)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Requires shared session store</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Good (simple DB lookup)</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Payload</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Contains claims (user data)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Opaque ID only</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Opaque key only</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Best For</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>SPAs, microservices, SSO</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Traditional web apps</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Third-party API access</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Size</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Larger (claims included)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Small (just an ID)</td>
            <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>Small (just a key)</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Use JWTs when</strong> you need stateless authentication across multiple services (microservices, SPAs with separate API backends, SSO). <strong>Use session tokens when</strong> you need instant revocation and your app is a traditional server-rendered website. <strong>Use API keys when</strong> you need to identify third-party applications rather than individual users.
      </p>

      <h2>Advanced: Creating JWTs with Different Algorithms</h2>
      <p>
        Here is a quick reference for creating JWTs in Node.js with different algorithms using the <code>jose</code> library:
      </p>
      <pre><code className="language-javascript">{`import { SignJWT, importPKCS8, importSPKI } from 'jose';

// HS256 (symmetric)
const secret = new TextEncoder().encode('my-256-bit-secret-key-here-min32');
const hs256Token = await new SignJWT({ sub: 'user-42', role: 'admin' })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setIssuer('https://auth.example.com')
  .setAudience('https://api.example.com')
  .setExpirationTime('15m')
  .sign(secret);

// RS256 (asymmetric - RSA)
const privateKey = await importPKCS8(rsaPrivateKeyPem, 'RS256');
const rs256Token = await new SignJWT({ sub: 'user-42' })
  .setProtectedHeader({ alg: 'RS256', kid: 'rsa-key-2026' })
  .setIssuedAt()
  .setExpirationTime('15m')
  .sign(privateKey);

// ES256 (ECDSA P-256)
const ecPrivateKey = await importPKCS8(ecPrivateKeyPem, 'ES256');
const es256Token = await new SignJWT({ sub: 'user-42' })
  .setProtectedHeader({ alg: 'ES256', kid: 'ec-key-2026' })
  .setIssuedAt()
  .setExpirationTime('15m')
  .sign(ecPrivateKey);`}</code></pre>

      <h2>Debugging JWT Issues: A Troubleshooting Checklist</h2>
      <p>
        When authentication fails with JWTs, follow this systematic checklist:
      </p>
      <ol>
        <li><strong>Decode the token</strong> using our <Link href={`/${lang}/tools/jwt-decoder`}>JWT decoder</Link> to inspect the header and payload.</li>
        <li><strong>Check <code>exp</code></strong>: Is the token expired? Compare the <code>exp</code> Unix timestamp with the current time.</li>
        <li><strong>Check <code>nbf</code></strong>: Is the token being used before its <code>nbf</code> (not-before) time?</li>
        <li><strong>Verify <code>iss</code></strong>: Does the issuer match what your API expects?</li>
        <li><strong>Verify <code>aud</code></strong>: Does the audience match your API identifier?</li>
        <li><strong>Check <code>alg</code></strong>: Does the algorithm in the header match what your verifier expects?</li>
        <li><strong>Check for clock skew</strong>: Are server clocks synchronized? A few seconds of drift can cause <code>exp</code>/<code>nbf</code> validation failures. Most libraries support a clock tolerance setting.</li>
        <li><strong>Verify key matching</strong>: For asymmetric algorithms, ensure the <code>kid</code> in the header matches a key in your JWKS endpoint.</li>
        <li><strong>Check token transport</strong>: Is the token being sent in the <code>Authorization: Bearer</code> header? Is it URL-encoded correctly?</li>
        <li><strong>Inspect the full error message</strong>: Library-specific error messages usually indicate exactly which validation step failed.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>

      <div itemScope itemType="https://schema.org/FAQPage">
        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is a JWT decoder?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A JWT decoder is a tool that parses the Base64URL-encoded header and payload of a JSON Web Token, displaying the claims in a human-readable format. Decoding does not verify the cryptographic signature. It only reveals the token contents. You can <Link href={`/${lang}/tools/jwt-decoder`}>decode JWTs online here</Link>.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Is it safe to decode a JWT online?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Yes, if the tool runs entirely in your browser (client-side). Our JWT decoder processes tokens locally using JavaScript without sending any data to a server. However, avoid pasting production tokens into server-side decoders because the token data would be transmitted over the network.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">What is the difference between decoding and verifying a JWT?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Decoding extracts the header and payload from the Base64URL-encoded segments. Anyone can decode a JWT. Verifying checks the cryptographic signature using the signing key (shared secret for HMAC, or public key for RSA/ECDSA). A verified JWT proves the token was created by a trusted issuer and has not been modified.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Can I decode a JWT without the secret key?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Yes. The header and payload of a JWT are only Base64URL-encoded, not encrypted. You can decode them without any key. The secret or private key is only needed to verify the signature or to create new tokens. This is why you should never store sensitive data like passwords in JWT payloads.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Why does my JWT have three parts separated by dots?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              A JWT consists of three Base64URL-encoded segments: the header (algorithm and type), the payload (claims), and the signature. They are concatenated with period (dot) separators. This format is defined by RFC 7519 and enables compact, URL-safe token transmission.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">Which JWT signing algorithm should I use?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              For new projects, use ES256 (ECDSA with P-256) or EdDSA (Ed25519) for the best balance of security and performance. Use RS256 when you need maximum library compatibility. Only use HS256 when the same service both signs and verifies tokens. Never use the "none" algorithm in production.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How long should a JWT access token last?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Access tokens should have short lifetimes, typically 5 to 15 minutes. This limits the window of exposure if a token is compromised. Use refresh tokens (with longer lifetimes of hours to days) to obtain new access tokens without re-authentication. Implement refresh token rotation for additional security.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
          <h3 itemProp="name">How do I check if a JWT is expired?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text">
              Decode the JWT and look at the <code>exp</code> (expiration time) claim, which is a Unix timestamp in seconds. Compare it to the current time: if <code>exp</code> is less than <code>Date.now() / 1000</code>, the token is expired. Our <Link href={`/${lang}/tools/jwt-decoder`}>online decoder</Link> shows expiration status automatically.
            </p>
          </div>
        </div>
      </div>

      <h2>Conclusion</h2>
      <p>
        JWTs are a fundamental building block of modern web authentication and authorization. Whether you are debugging an authentication flow, auditing token claims, or learning how JWTs work, a reliable <strong>JWT decoder</strong> is an essential tool in every developer's toolkit.
      </p>
      <p>
        Key points to remember: always verify signatures server-side, keep access tokens short-lived, never store sensitive data in payloads, validate <code>iss</code>/<code>aud</code>/<code>exp</code> claims, and choose asymmetric algorithms (ES256, EdDSA, RS256) for distributed systems. Use our <Link href={`/${lang}/tools/jwt-decoder`}>free JWT decoder online</Link> to inspect your tokens instantly, and bookmark this guide for reference when implementing JWT-based authentication.
      </p>
    </>
  );
}
