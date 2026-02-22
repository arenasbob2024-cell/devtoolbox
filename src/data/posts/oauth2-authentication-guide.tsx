'use client';
import React from 'react';

export default function Oauth2AuthenticationGuide({ lang }: { lang: string }) {
  return (
    <article>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        OAuth 2.0 Authentication: Complete Implementation Guide
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 is the industry-standard protocol for authorization. It allows applications to
        obtain limited access to user accounts on third-party services without exposing user
        credentials. Every time you click &quot;Sign in with Google&quot; or &quot;Login with
        GitHub,&quot; OAuth 2.0 is the protocol powering that flow. Despite its ubiquity, OAuth 2.0
        is frequently misunderstood and incorrectly implemented, leading to security vulnerabilities
        that can expose user data.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        This guide covers the OAuth 2.0 specification from first principles, walks through each
        grant type with working code examples, explains the security considerations you must address,
        and shows you how to implement OAuth 2.0 in both client and server applications using
        modern best practices for 2026.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Core Concepts: Roles and Terminology
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 defines four distinct roles that participate in every authorization flow.
        Understanding these roles is essential before diving into implementation.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <strong>Resource Owner</strong> is the user who owns the data and grants access to it.
        When you authorize a third-party app to access your GitHub repositories, you are the
        resource owner.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <strong>Client</strong> is the application requesting access to the resource owner&apos;s
        data. This is your web app, mobile app, or CLI tool that wants to interact with the
        provider&apos;s API on behalf of the user.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <strong>Authorization Server</strong> authenticates the resource owner and issues access
        tokens to the client after obtaining the owner&apos;s consent. Examples include Google&apos;s
        OAuth server, GitHub&apos;s OAuth server, or your own authorization server.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The <strong>Resource Server</strong> hosts the protected resources. It accepts and validates
        access tokens, then serves the requested data. This is the API that the client wants to
        access — for example, the GitHub API or Google Calendar API.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        OAuth 2.0 Grant Types
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 defines several grant types (also called flows), each designed for a specific
        use case. Choosing the right grant type depends on the type of client application, the
        level of trust, and the user interaction model.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        1. Authorization Code Flow (Recommended for Web Apps)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The authorization code flow is the most secure and most commonly used grant type for
        server-side web applications. It involves two steps: first the client obtains an
        authorization code by redirecting the user to the authorization server, then the client
        exchanges this code for an access token using a back-channel (server-to-server) request.
        The access token is never exposed to the browser.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Step 1: Redirect user to authorization server
// Express.js route that initiates the OAuth flow

import express from 'express';
import crypto from 'crypto';

const app = express();

const OAUTH_CONFIG = {
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUri: 'https://myapp.com/auth/callback',
  scopes: ['openid', 'email', 'profile'],
};

// Generate a cryptographically random state parameter
// This prevents CSRF attacks
app.get('/auth/login', (req, res) => {
  const state = crypto.randomBytes(32).toString('hex');
  req.session.oauthState = state;

  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.clientId,
    redirect_uri: OAUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: OAUTH_CONFIG.scopes.join(' '),
    state: state,
    access_type: 'offline',  // Request refresh token
    prompt: 'consent',
  });

  res.redirect(\`\${OAUTH_CONFIG.authorizationUrl}?\${params}\`);
});`}</code>
      </pre>

      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Step 2: Handle the callback and exchange code for tokens
app.get('/auth/callback', async (req, res) => {
  const { code, state, error } = req.query;

  // Check for errors from the authorization server
  if (error) {
    return res.status(400).json({ error: \`Authorization failed: \${error}\` });
  }

  // Validate state parameter to prevent CSRF
  if (state !== req.session.oauthState) {
    return res.status(403).json({ error: 'Invalid state parameter — possible CSRF attack' });
  }
  delete req.session.oauthState;

  try {
    // Exchange authorization code for tokens (server-to-server)
    const tokenResponse = await fetch(OAUTH_CONFIG.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: OAUTH_CONFIG.redirectUri,
        client_id: OAUTH_CONFIG.clientId,
        client_secret: OAUTH_CONFIG.clientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Token exchange failed');
    }

    const tokens = await tokenResponse.json();
    // tokens contains: access_token, refresh_token, expires_in, token_type, id_token

    // Store tokens securely (server-side session or encrypted cookie)
    req.session.accessToken = tokens.access_token;
    req.session.refreshToken = tokens.refresh_token;
    req.session.tokenExpiry = Date.now() + tokens.expires_in * 1000;

    // Fetch user profile from the resource server
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: \`Bearer \${tokens.access_token}\` },
    });
    const userProfile = await userResponse.json();

    req.session.user = {
      id: userProfile.id,
      email: userProfile.email,
      name: userProfile.name,
      picture: userProfile.picture,
    };

    res.redirect('/dashboard');
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
});`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        2. Authorization Code Flow with PKCE (Recommended for SPAs and Mobile Apps)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Public clients — single-page applications (SPAs) and mobile apps — cannot securely store
        a client secret. PKCE (Proof Key for Code Exchange, pronounced &quot;pixy&quot;) solves
        this by introducing a dynamic secret generated per authorization request. The client
        creates a random code verifier, computes its SHA-256 hash (code challenge), sends the
        challenge with the authorization request, and sends the original verifier with the token
        exchange. The authorization server verifies that the verifier matches the challenge.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// PKCE implementation for a single-page application

// Generate PKCE code verifier and challenge
function generatePKCE(): { verifier: string; challenge: string } {
  // Code verifier: 43-128 character random string
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = base64UrlEncode(array);

  // Code challenge: SHA-256 hash of the verifier
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
    .then(hash => ({
      verifier,
      challenge: base64UrlEncode(new Uint8Array(hash)),
    }));
}

function base64UrlEncode(buffer: Uint8Array): string {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=+$/, '');
}

// Start the OAuth flow
async function startLogin() {
  const { verifier, challenge } = await generatePKCE();

  // Store verifier for later use during token exchange
  sessionStorage.setItem('pkce_verifier', verifier);

  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: 'your-client-id',
    redirect_uri: 'https://myapp.com/callback',
    response_type: 'code',
    scope: 'openid email profile',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  window.location.href = \`https://auth.example.com/authorize?\${params}\`;
}

// Handle the callback
async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');

  // Validate state
  if (state !== sessionStorage.getItem('oauth_state')) {
    throw new Error('Invalid state — possible CSRF attack');
  }

  const verifier = sessionStorage.getItem('pkce_verifier');

  // Exchange code for tokens — note: no client_secret needed
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://myapp.com/callback',
      client_id: 'your-client-id',
      code_verifier: verifier,  // Proves we started the flow
    }),
  });

  const tokens = await response.json();
  // Store access token in memory (not localStorage!)
  authState.accessToken = tokens.access_token;

  // Clean up
  sessionStorage.removeItem('pkce_verifier');
  sessionStorage.removeItem('oauth_state');
}`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        3. Client Credentials Flow (Machine-to-Machine)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The client credentials flow is used when the client itself is the resource owner — there is
        no user involved. This is ideal for server-to-server communication, background jobs, and
        microservice authentication where one service needs to call another.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Client Credentials flow — no user involved
async function getServiceToken(): Promise<string> {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Basic auth with client credentials
      'Authorization': \`Basic \${Buffer.from(
        \`\${CLIENT_ID}:\${CLIENT_SECRET}\`
      ).toString('base64')}\`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'read:orders write:orders',
    }),
  });

  const { access_token, expires_in } = await response.json();
  return access_token;
}

// Cache the token and refresh before expiry
class TokenManager {
  private token: string | null = null;
  private expiresAt: number = 0;

  async getToken(): Promise<string> {
    // Refresh token 60 seconds before expiry
    if (!this.token || Date.now() >= this.expiresAt - 60000) {
      const response = await fetch('https://auth.example.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          scope: 'read:orders',
        }),
      });
      const data = await response.json();
      this.token = data.access_token;
      this.expiresAt = Date.now() + data.expires_in * 1000;
    }
    return this.token;
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        4. Device Authorization Flow (Smart TVs, IoT)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Devices with limited input capabilities — smart TVs, game consoles, CLI tools — use the
        device authorization flow. The device displays a URL and a code, the user visits the URL
        on a separate device (phone or laptop), enters the code, and authorizes access. The device
        polls the authorization server until the user completes authorization.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Device Authorization Flow
async function deviceLogin() {
  // Step 1: Request device and user codes
  const deviceResponse = await fetch('https://auth.example.com/device/code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: 'device-client-id',
      scope: 'openid profile',
    }),
  });

  const {
    device_code,
    user_code,       // e.g., "ABCD-1234"
    verification_uri, // e.g., "https://auth.example.com/device"
    expires_in,
    interval,        // Polling interval in seconds
  } = await deviceResponse.json();

  // Step 2: Display to user
  console.log(\`Visit \${verification_uri} and enter code: \${user_code}\`);

  // Step 3: Poll for authorization
  const deadline = Date.now() + expires_in * 1000;

  while (Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, interval * 1000));

    const tokenResponse = await fetch('https://auth.example.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        client_id: 'device-client-id',
        device_code,
      }),
    });

    if (tokenResponse.ok) {
      const tokens = await tokenResponse.json();
      console.log('Authorized successfully!');
      return tokens;
    }

    const error = await tokenResponse.json();
    if (error.error === 'authorization_pending') continue;
    if (error.error === 'slow_down') {
      interval += 5;  // Back off
      continue;
    }
    throw new Error(\`Device auth failed: \${error.error}\`);
  }

  throw new Error('Device authorization timed out');
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Token Management and Refresh
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Access tokens are short-lived by design — typically 15 minutes to 1 hour. When an access
        token expires, the client uses a refresh token to obtain a new access token without
        requiring the user to re-authenticate. Refresh tokens are long-lived (days to months) and
        must be stored securely.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Automatic token refresh middleware
class AuthenticatedHttpClient {
  private accessToken: string;
  private refreshToken: string;
  private tokenExpiry: number;

  async request(url: string, options: RequestInit = {}): Promise<Response> {
    // Check if token is expired or about to expire
    if (Date.now() >= this.tokenExpiry - 30000) {
      await this.refreshAccessToken();
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': \`Bearer \${this.accessToken}\`,
      },
    });

    // Handle token expiry during request (race condition)
    if (response.status === 401) {
      await this.refreshAccessToken();
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': \`Bearer \${this.accessToken}\`,
        },
      });
    }

    return response;
  }

  private async refreshAccessToken(): Promise<void> {
    const response = await fetch('https://auth.example.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      // Refresh token expired or revoked — user must re-authenticate
      throw new AuthenticationError('Session expired — please log in again');
    }

    const tokens = await response.json();
    this.accessToken = tokens.access_token;
    this.tokenExpiry = Date.now() + tokens.expires_in * 1000;

    // Some providers issue a new refresh token with each refresh
    if (tokens.refresh_token) {
      this.refreshToken = tokens.refresh_token;
    }
  }
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Building Your Own OAuth 2.0 Server
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        If you need to act as an OAuth 2.0 provider — for example, if you are building a platform
        with a public API that third-party developers will integrate with — you need to implement
        an authorization server. Here is the core structure of an authorization code grant server.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// OAuth 2.0 Authorization Server — Express.js implementation
import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory stores (use a database in production)
const authCodes = new Map<string, AuthCodeEntry>();
const refreshTokens = new Map<string, RefreshTokenEntry>();

interface AuthCodeEntry {
  clientId: string;
  userId: string;
  redirectUri: string;
  scope: string;
  codeChallenge?: string;
  expiresAt: number;
}

// GET /authorize — Authorization endpoint
app.get('/authorize', async (req, res) => {
  const { client_id, redirect_uri, response_type, scope, state,
          code_challenge, code_challenge_method } = req.query;

  // Validate client
  const client = await db.clients.findOne({ clientId: client_id });
  if (!client || !client.redirectUris.includes(redirect_uri)) {
    return res.status(400).json({ error: 'invalid_client' });
  }

  if (response_type !== 'code') {
    return res.status(400).json({ error: 'unsupported_response_type' });
  }

  // Show consent screen (if user is authenticated)
  // After user consents, generate authorization code:
  const code = crypto.randomBytes(32).toString('hex');

  authCodes.set(code, {
    clientId: client_id as string,
    userId: req.session.userId,
    redirectUri: redirect_uri as string,
    scope: scope as string,
    codeChallenge: code_challenge as string,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });

  const redirectUrl = new URL(redirect_uri as string);
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state as string);

  res.redirect(redirectUrl.toString());
});

// POST /token — Token endpoint
app.post('/token', async (req, res) => {
  const { grant_type, code, redirect_uri, client_id,
          client_secret, code_verifier, refresh_token } = req.body;

  if (grant_type === 'authorization_code') {
    const entry = authCodes.get(code);

    if (!entry || entry.expiresAt < Date.now()) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    // Validate PKCE if code challenge was provided
    if (entry.codeChallenge && code_verifier) {
      const hash = crypto.createHash('sha256')
        .update(code_verifier).digest('base64url');
      if (hash !== entry.codeChallenge) {
        return res.status(400).json({ error: 'invalid_grant' });
      }
    }

    // Delete used code (one-time use)
    authCodes.delete(code);

    // Generate tokens
    const accessToken = jwt.sign(
      { sub: entry.userId, scope: entry.scope, client_id: entry.clientId },
      process.env.JWT_SECRET,
      { expiresIn: '1h', issuer: 'https://auth.myplatform.com' }
    );

    const newRefreshToken = crypto.randomBytes(48).toString('hex');
    refreshTokens.set(newRefreshToken, {
      userId: entry.userId,
      clientId: entry.clientId,
      scope: entry.scope,
    });

    res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      refresh_token: newRefreshToken,
      scope: entry.scope,
    });
  }
});`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Security Best Practices
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 security requires careful attention to detail. Here are the critical security
        measures every implementation must include.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Always use PKCE.</strong> As of OAuth 2.1, PKCE is required for all clients, not
        just public clients. It prevents authorization code interception attacks even for
        confidential clients.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Validate the state parameter.</strong> The state parameter prevents cross-site
        request forgery (CSRF) attacks. Generate a cryptographically random value, store it in the
        session before redirecting, and validate it in the callback. Never skip this check.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Store tokens securely.</strong> Access tokens in SPAs should be kept in memory —
        never in localStorage or sessionStorage where XSS attacks can steal them. For server-side
        apps, store tokens in encrypted server-side sessions. Refresh tokens require the highest
        level of protection — encrypt them at rest and use refresh token rotation.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Use exact redirect URI matching.</strong> The authorization server must perform
        exact string matching on redirect URIs. Wildcard or partial matching enables open redirect
        attacks that can steal authorization codes.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Implement token rotation.</strong> Issue a new refresh token with each token
        refresh. If a refresh token is used twice, revoke all tokens for that session — it
        indicates the refresh token was stolen and both the attacker and legitimate user tried to
        use it.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Request minimal scopes.</strong> Only request the scopes your application actually
        needs. Over-scoping increases the blast radius if tokens are compromised. Users are also
        more likely to approve access requests with limited scope.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        OAuth 2.0 vs OpenID Connect
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 is an authorization protocol — it tells you what the user can access, not who
        the user is. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that
        adds authentication. It introduces the ID token (a JWT containing user identity claims),
        the UserInfo endpoint, and a standardized set of scopes (openid, profile, email).
      </p>
      <div style={{ overflowX: 'auto' as const, marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid var(--border-color)', padding: 12, textAlign: 'left' }}>Aspect</th>
              <th style={{ border: '1px solid var(--border-color)', padding: 12, textAlign: 'left' }}>OAuth 2.0</th>
              <th style={{ border: '1px solid var(--border-color)', padding: 12, textAlign: 'left' }}>OpenID Connect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Purpose</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Authorization (access delegation)</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Authentication (identity verification)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Token</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Access token (opaque or JWT)</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Access token + ID token (JWT)</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>User Info</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Provider-specific API</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Standardized UserInfo endpoint</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Discovery</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>No standard</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>.well-known/openid-configuration</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Use Case</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>API access on behalf of user</td>
              <td style={{ border: '1px solid var(--border-color)', padding: 12 }}>Sign in with Google/GitHub/etc.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Common Vulnerabilities and Mitigations
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Authorization code injection:</strong> An attacker intercepts an authorization code
        and uses it on their own device. Mitigation: PKCE binds the code to the client that
        initiated the flow.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Token leakage via referrer headers:</strong> If the redirect page loads external
        resources, the authorization code in the URL may leak through the Referer header. Mitigation:
        Use the form_post response mode or immediately exchange the code and redirect to a clean URL.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Open redirect attacks:</strong> If the authorization server allows wildcards in
        redirect URIs, an attacker can redirect the user to a malicious site with the authorization
        code. Mitigation: Exact redirect URI matching only.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Insufficient scope validation:</strong> The resource server must validate that the
        access token has the required scopes for the requested operation. Simply checking token
        validity is not enough.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Choosing the Right Flow for Your Application
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        For traditional server-rendered web applications, use the Authorization Code flow with
        PKCE. For single-page applications, use Authorization Code with PKCE — the implicit flow
        is deprecated and should not be used. For native mobile applications, use Authorization
        Code with PKCE using a custom URI scheme or universal link for the redirect. For
        machine-to-machine communication with no user involvement, use the Client Credentials flow.
        For devices with limited input (TVs, CLI tools), use the Device Authorization flow.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        The Resource Owner Password Credentials (ROPC) grant is deprecated in OAuth 2.1 and should
        never be used in new applications. It requires the user to provide their credentials
        directly to the client application, which defeats the purpose of OAuth.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        OAuth 2.0 and OpenID Connect remain the foundation of modern authentication and
        authorization in 2026. Understanding the protocol deeply — its grant types, security
        requirements, and implementation details — is essential for building secure applications
        that protect user data while providing seamless authentication experiences.
      </p>
    </article>
  );
}
