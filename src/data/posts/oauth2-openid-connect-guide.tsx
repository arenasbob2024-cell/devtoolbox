export default function Oauth2OpenidConnectGuide() {
  return (
    <>
      <h2>OAuth 2.0 and OpenID Connect: The Complete Implementation Guide</h2>
      <p>
        OAuth 2.0 is the industry standard for authorization — it lets users grant third-party
        applications limited access to their resources without sharing passwords. OpenID Connect (OIDC)
        builds on top of OAuth 2.0 to add authentication — verifying who the user is. This guide covers
        both protocols, their flows, token types, and practical implementation with Node.js and TypeScript.
      </p>

      <h2>OAuth 2.0 vs OpenID Connect</h2>
      <table>
        <thead>
          <tr>
            <th>Aspect</th>
            <th>OAuth 2.0</th>
            <th>OpenID Connect</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Purpose</td><td>Authorization (what can you access?)</td><td>Authentication (who are you?)</td></tr>
          <tr><td>Token</td><td>Access Token</td><td>ID Token + Access Token</td></tr>
          <tr><td>Token format</td><td>Opaque or JWT</td><td>Always JWT (ID Token)</td></tr>
          <tr><td>User info</td><td>Not defined</td><td>/userinfo endpoint + ID Token claims</td></tr>
          <tr><td>Scopes</td><td>Custom (read, write, etc.)</td><td>openid, profile, email</td></tr>
          <tr><td>Discovery</td><td>Not defined</td><td>.well-known/openid-configuration</td></tr>
          <tr><td>Use case</td><td>API access (GitHub API, Google Drive)</td><td>Login with Google/GitHub/etc.</td></tr>
        </tbody>
      </table>

      <h2>OAuth 2.0 Grant Types</h2>
      <table>
        <thead>
          <tr>
            <th>Grant Type</th>
            <th>Use Case</th>
            <th>Client Type</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Authorization Code</td><td>Web apps with a backend</td><td>Confidential</td></tr>
          <tr><td>Authorization Code + PKCE</td><td>SPAs, mobile apps</td><td>Public</td></tr>
          <tr><td>Client Credentials</td><td>Machine-to-machine (no user)</td><td>Confidential</td></tr>
          <tr><td>Device Code</td><td>TVs, IoT, CLI tools</td><td>Public</td></tr>
          <tr><td>Refresh Token</td><td>Renewing expired access tokens</td><td>Both</td></tr>
        </tbody>
      </table>

      <h2>Authorization Code Flow (with PKCE)</h2>
      <p>
        This is the recommended flow for all modern applications. PKCE (Proof Key for Code Exchange)
        protects against authorization code interception attacks and is required for public clients.
      </p>
      <pre><code className="language-text">{`┌──────────┐                              ┌──────────────────┐
│  Browser  │                              │  Auth Server     │
│  (Client) │                              │  (e.g., Google)  │
└─────┬─────┘                              └────────┬─────────┘
      │                                             │
      │  1. Generate code_verifier + code_challenge  │
      │  2. Redirect to /authorize                   │
      │  ─────────────────────────────────────────►  │
      │     ?response_type=code                      │
      │     &client_id=xxx                           │
      │     &redirect_uri=xxx                        │
      │     &scope=openid profile email              │
      │     &code_challenge=xxx                      │
      │     &code_challenge_method=S256              │
      │     &state=random_csrf_token                 │
      │                                              │
      │  3. User logs in + consents                  │
      │                                              │
      │  4. Redirect back with code                  │
      │  ◄─────────────────────────────────────────  │
      │     ?code=AUTH_CODE&state=random_csrf_token  │
      │                                              │
      │  5. Exchange code for tokens (POST /token)   │
      │  ─────────────────────────────────────────►  │
      │     grant_type=authorization_code            │
      │     &code=AUTH_CODE                          │
      │     &code_verifier=xxx                       │
      │                                              │
      │  6. Receive tokens                           │
      │  ◄─────────────────────────────────────────  │
      │     { access_token, id_token, refresh_token }│
      └──────────────────────────────────────────────┘`}</code></pre>

      <h3>Implementation</h3>
      <pre><code className="language-typescript">{`// lib/oauth.ts — OAuth 2.0 + PKCE utilities
import crypto from 'node:crypto';

// Step 1: Generate PKCE code verifier and challenge
export function generatePKCE() {
  const codeVerifier = crypto.randomBytes(32)
    .toString('base64url');

  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');

  return { codeVerifier, codeChallenge };
}

// Step 2: Build the authorization URL
export function buildAuthUrl(config: {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
  codeChallenge: string;
  state: string;
}) {
  const url = new URL(config.authEndpoint);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('scope', config.scopes.join(' '));
  url.searchParams.set('code_challenge', config.codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('state', config.state);
  return url.toString();
}

// Step 3: Exchange authorization code for tokens
export async function exchangeCode(config: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret?: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    code: config.code,
    redirect_uri: config.redirectUri,
    code_verifier: config.codeVerifier,
  });

  if (config.clientSecret) {
    body.set('client_secret', config.clientSecret);
  }

  const response = await fetch(config.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(\`Token exchange failed: \${error.error_description}\`);
  }

  return response.json() as Promise<{
    access_token: string;
    id_token?: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
  }>;
}`}</code></pre>

      <h3>Express.js Route Handlers</h3>
      <pre><code className="language-typescript">{`// routes/auth.ts
import { Router } from 'express';
import { generatePKCE, buildAuthUrl, exchangeCode } from '../lib/oauth';

const router = Router();

// Google OIDC configuration
const GOOGLE_CONFIG = {
  authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userinfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: 'http://localhost:3000/auth/callback',
  scopes: ['openid', 'profile', 'email'],
};

// Step 1: Start login — redirect to Google
router.get('/login', (req, res) => {
  const { codeVerifier, codeChallenge } = generatePKCE();
  const state = crypto.randomBytes(16).toString('hex');

  // Store in session for verification
  req.session.codeVerifier = codeVerifier;
  req.session.oauthState = state;

  const authUrl = buildAuthUrl({
    ...GOOGLE_CONFIG,
    codeChallenge,
    state,
  });

  res.redirect(authUrl);
});

// Step 2: Handle callback — exchange code for tokens
router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;

  // Check for errors
  if (error) {
    return res.redirect(\`/login?error=\${error}\`);
  }

  // Verify state to prevent CSRF
  if (state !== req.session.oauthState) {
    return res.status(403).json({ error: 'Invalid state parameter' });
  }

  try {
    const tokens = await exchangeCode({
      tokenEndpoint: GOOGLE_CONFIG.tokenEndpoint,
      clientId: GOOGLE_CONFIG.clientId,
      clientSecret: GOOGLE_CONFIG.clientSecret,
      code: code as string,
      redirectUri: GOOGLE_CONFIG.redirectUri,
      codeVerifier: req.session.codeVerifier!,
    });

    // Decode the ID token (for OIDC)
    const idToken = decodeJWT(tokens.id_token!);

    // Create session
    req.session.user = {
      sub: idToken.sub,
      email: idToken.email,
      name: idToken.name,
      picture: idToken.picture,
    };
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;

    // Clean up PKCE/state from session
    delete req.session.codeVerifier;
    delete req.session.oauthState;

    res.redirect('/dashboard');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.redirect('/login?error=token_exchange_failed');
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

export default router;`}</code></pre>

      <h2>ID Token (JWT) Validation</h2>
      <pre><code className="language-typescript">{`// lib/jwt.ts — ID Token validation
import crypto from 'node:crypto';

interface IDTokenClaims {
  iss: string;    // Issuer
  sub: string;    // Subject (user ID)
  aud: string;    // Audience (your client ID)
  exp: number;    // Expiration time
  iat: number;    // Issued at
  nonce?: string; // Nonce (if sent in auth request)
  email?: string;
  name?: string;
  picture?: string;
}

// Decode JWT without verification (for reading claims)
export function decodeJWT(token: string): IDTokenClaims {
  const [, payload] = token.split('.');
  return JSON.parse(
    Buffer.from(payload, 'base64url').toString('utf-8')
  );
}

// Full ID Token validation
export async function validateIDToken(
  idToken: string,
  config: {
    issuer: string;
    clientId: string;
    jwksUri: string;
  }
): Promise<IDTokenClaims> {
  const [headerB64, payloadB64, signatureB64] = idToken.split('.');

  // 1. Decode header to get key ID
  const header = JSON.parse(
    Buffer.from(headerB64, 'base64url').toString('utf-8')
  );

  // 2. Fetch JWKS and find the signing key
  const jwksResponse = await fetch(config.jwksUri);
  const jwks = await jwksResponse.json();
  const signingKey = jwks.keys.find(
    (key: any) => key.kid === header.kid && key.use === 'sig'
  );

  if (!signingKey) throw new Error('Signing key not found');

  // 3. Verify signature
  const publicKey = crypto.createPublicKey({ key: signingKey, format: 'jwk' });
  const data = Buffer.from(\`\${headerB64}.\${payloadB64}\`);
  const signature = Buffer.from(signatureB64, 'base64url');
  const isValid = crypto.verify(
    header.alg === 'RS256' ? 'sha256' : 'sha384',
    data,
    publicKey,
    signature
  );

  if (!isValid) throw new Error('Invalid signature');

  // 4. Validate claims
  const claims = decodeJWT(idToken);
  const now = Math.floor(Date.now() / 1000);

  if (claims.iss !== config.issuer) throw new Error('Invalid issuer');
  if (claims.aud !== config.clientId) throw new Error('Invalid audience');
  if (claims.exp < now) throw new Error('Token expired');

  return claims;
}`}</code></pre>

      <h2>Client Credentials Flow (Machine-to-Machine)</h2>
      <pre><code className="language-typescript">{`// For server-to-server communication (no user involved)
export async function getM2MToken(config: {
  tokenEndpoint: string;
  clientId: string;
  clientSecret: string;
  scopes: string[];
}): Promise<string> {
  const response = await fetch(config.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: \`Basic \${Buffer.from(
        \`\${config.clientId}:\${config.clientSecret}\`
      ).toString('base64')}\`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: config.scopes.join(' '),
    }),
  });

  const data = await response.json();
  return data.access_token;
}

// Usage — microservice calling another microservice
const token = await getM2MToken({
  tokenEndpoint: 'https://auth.example.com/oauth/token',
  clientId: process.env.SERVICE_CLIENT_ID!,
  clientSecret: process.env.SERVICE_CLIENT_SECRET!,
  scopes: ['orders:read', 'inventory:write'],
});

const orders = await fetch('https://api.example.com/orders', {
  headers: { Authorization: \`Bearer \${token}\` },
});`}</code></pre>

      <h2>Refresh Token Rotation</h2>
      <pre><code className="language-typescript">{`// lib/token-refresh.ts
interface TokenStore {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

let tokenStore: TokenStore | null = null;

export async function getValidAccessToken(): Promise<string> {
  if (!tokenStore) throw new Error('Not authenticated');

  // Return current token if not expired (with 60s buffer)
  if (Date.now() < (tokenStore.expiresAt - 60) * 1000) {
    return tokenStore.accessToken;
  }

  // Refresh the token
  const response = await fetch('https://auth.example.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: tokenStore.refreshToken,
      client_id: process.env.CLIENT_ID!,
    }),
  });

  if (!response.ok) {
    tokenStore = null;  // Clear invalid tokens
    throw new Error('Refresh token expired — user must re-authenticate');
  }

  const data = await response.json();

  // Update stored tokens (refresh token rotation)
  tokenStore = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || tokenStore.refreshToken,
    expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
  };

  return tokenStore.accessToken;
}`}</code></pre>

      <h2>Security Best Practices</h2>
      <ul>
        <li><strong>Always use PKCE</strong> — even for confidential clients, PKCE adds defense-in-depth</li>
        <li><strong>Validate the state parameter</strong> — prevents CSRF attacks on the callback endpoint</li>
        <li><strong>Validate ID tokens fully</strong> — check signature, issuer, audience, and expiration</li>
        <li><strong>Use short-lived access tokens</strong> — 5-15 minutes; rely on refresh tokens for longevity</li>
        <li><strong>Rotate refresh tokens</strong> — issue a new refresh token with each use; invalidate the old one</li>
        <li><strong>Store tokens securely</strong> — httpOnly cookies on the server; never in localStorage for SPAs</li>
        <li><strong>Use exact redirect URIs</strong> — do not use wildcards; register every redirect URI</li>
        <li><strong>Implement token revocation</strong> — call the revocation endpoint on logout</li>
      </ul>

      <h2>OIDC Discovery</h2>
      <pre><code className="language-typescript">{`// Automatically discover OAuth/OIDC endpoints from the provider
export async function discoverOIDC(issuer: string) {
  const response = await fetch(
    \`\${issuer}/.well-known/openid-configuration\`
  );
  return response.json() as Promise<{
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    jwks_uri: string;
    scopes_supported: string[];
    response_types_supported: string[];
    grant_types_supported: string[];
    end_session_endpoint?: string;
    revocation_endpoint?: string;
  }>;
}

// Usage
const google = await discoverOIDC('https://accounts.google.com');
// google.authorization_endpoint → "https://accounts.google.com/o/oauth2/v2/auth"
// google.token_endpoint → "https://oauth2.googleapis.com/token"
// google.jwks_uri → "https://www.googleapis.com/oauth2/v3/certs"`}</code></pre>

      <p>
        Decode and inspect your JWT tokens with our <a href="/en/tools/jwt-decoder">JWT Decoder</a> tool.
        For understanding the Base64 encoding used in tokens, try our{" "}
        <a href="/en/tools/base64-encode-decode">Base64 Encoder/Decoder</a>. For a broader look at
        API authentication methods, read our{" "}
        <a href="/en/blog/api-authentication-oauth-jwt-apikey">API Authentication Guide</a>.
      </p>
    </>
  );
}
