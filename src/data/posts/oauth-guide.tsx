'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OAuth 2.0 Complete Guide: Authorization Code, PKCE, OpenID Connect & Security Best Practices',
    description: 'Master OAuth 2.0 from first principles. Learn every grant type, JWT structure, PKCE, OpenID Connect, token storage, social login, and how to prevent common OAuth vulnerabilities.',

    tldr: 'OAuth 2.0 is a delegation framework — it lets users grant third-party apps limited access to their resources without sharing passwords. Use Authorization Code + PKCE for SPAs and mobile apps, Client Credentials for machine-to-machine, and OpenID Connect (OIDC) on top of OAuth 2.0 when you need identity (who the user is, not just what they can access).',

    keyTakeaways: 'Key Takeaways',
    kt1: 'OAuth 2.0 is for authorization (access); OpenID Connect adds authentication (identity) on top.',
    kt2: 'Always use Authorization Code + PKCE for browser and mobile apps — the Implicit flow is deprecated.',
    kt3: 'Access tokens should be short-lived (15 min); refresh tokens can be long-lived with rotation.',
    kt4: 'Store tokens in httpOnly cookies to protect against XSS; use CSRF tokens to protect against CSRF.',
    kt5: 'Always validate the state parameter to prevent CSRF in the OAuth callback.',
    kt6: 'JWT access tokens are self-contained — verify signature, expiry, issuer, and audience on every request.',

    // Section 1
    whatIsTitle: 'What Is OAuth 2.0 and Why Was It Created?',
    whatIsDesc1: 'Before OAuth, delegating API access was painful. If you wanted a third-party app to access your Google Drive, you had to give it your Google username and password. The app had full access to your entire account, you could not revoke access without changing your password, and the third party could do anything a human could do.',
    whatIsDesc2: 'OAuth 2.0 (RFC 6749, published 2012) solved this with a delegation model. Instead of sharing credentials, the user grants a third-party application a limited, scoped access token. The user approves specific permissions (scopes), the token expires automatically, and the user can revoke access at any time without changing their password.',
    whatIsDesc3: 'OAuth 2.0 defines four roles: the Resource Owner (the user), the Client (the third-party application), the Authorization Server (the service that issues tokens, e.g., Google\'s auth server), and the Resource Server (the API holding the protected resources, e.g., Google Drive API). These roles communicate through a series of redirects and back-channel requests.',
    whatIsDesc4: 'The key insight of OAuth 2.0 is that the user\'s credentials never reach the third-party application. The user authenticates directly with the Authorization Server (which they trust), and only the resulting token is handed to the client.',

    // Section 2
    versionsTitle: 'OAuth 2.0 vs OAuth 1.0 vs OpenID Connect',
    versionsDesc1: 'OAuth 1.0 (2007) required complex cryptographic request signing (HMAC-SHA1) for every API call. Every request had to include a timestamp, nonce, and signature computed from the request parameters and a shared secret. While secure, it was extremely difficult to implement correctly and was a poor developer experience.',
    versionsDesc2: 'OAuth 2.0 dropped mandatory request signing in favor of TLS (HTTPS) for transport security. This made implementation far simpler but introduced new complexity through the proliferation of grant types. OAuth 2.0 is a framework, not a protocol — implementations can vary significantly between providers.',
    versionsDesc3: 'OpenID Connect (OIDC) is a thin identity layer built on top of OAuth 2.0. Where OAuth 2.0 only handles authorization (can this app access this resource?), OIDC adds authentication (who is this user?). OIDC introduces the ID token — a JWT containing identity claims like name, email, and profile picture. If you need to know who the user is (not just that they authorized your app), use OIDC.',
    versionsCompareTitle: 'Quick Comparison',

    // Section 3
    conceptsTitle: 'Key Concepts: Roles, Scopes, and Tokens',
    conceptsRolesTitle: 'The Four OAuth 2.0 Roles',
    conceptsRolesDesc: 'Every OAuth 2.0 interaction involves four roles. The Resource Owner is typically the end user who owns the data. The Client is the application requesting access (your web app, mobile app, or backend service). The Authorization Server issues access tokens after authenticating the resource owner and obtaining authorization. The Resource Server hosts the protected resources and validates access tokens on each request.',
    conceptsScopesTitle: 'Scopes',
    conceptsScopesDesc: 'Scopes define the permissions being requested. They are space-separated strings that the client requests and the user approves. Examples include read:user, repo, openid, email, and profile. Well-designed OAuth servers use fine-grained scopes so users can grant minimal necessary permissions. Always request only the scopes your application actually needs.',
    conceptsTokensTitle: 'Token Types',
    conceptsTokensDesc: 'OAuth 2.0 uses three types of tokens. Access tokens are short-lived credentials (typically 15-60 minutes) that the client includes in API requests. Refresh tokens are long-lived credentials (days to months) used to obtain new access tokens without user re-authentication. ID tokens (OIDC only) are JWTs containing user identity claims — they are for the client to read, not for sending to resource servers.',

    // Section 4
    grantTypesTitle: 'Grant Types: Which Flow Should You Use?',
    grantTypesDesc: 'OAuth 2.0 defines multiple grant types (flows) for different client types and use cases. Picking the wrong grant type is the most common OAuth mistake.',

    authCodeTitle: 'Authorization Code Flow',
    authCodeDesc: 'The most widely used and most secure flow for server-side web applications. The client redirects the user to the Authorization Server, the user authenticates and consents, and the Authorization Server redirects back to the client with a short-lived authorization code. The client then exchanges this code for tokens via a direct server-to-server POST request. The access token never touches the browser.',
    authCodeWhen: 'Use when: You have a server-side component that can securely store the client_secret. Node.js, Python, Ruby, Java, and PHP web apps all qualify. The back-channel token exchange prevents the access token from appearing in browser history or logs.',

    implicitTitle: 'Implicit Flow (Deprecated)',
    implicitDesc: 'The Implicit flow was designed for SPAs that could not make server-side requests. The authorization server returned the access token directly in the URL fragment (#access_token=...). This was convenient but dangerous — tokens in URL fragments appear in browser history, referrer headers, and server logs. The Implicit flow is now deprecated by RFC 9700. Use Authorization Code + PKCE instead for all browser-based apps.',

    clientCredTitle: 'Client Credentials Flow',
    clientCredDesc: 'For machine-to-machine (M2M) communication where no user is involved. The client authenticates directly with the Authorization Server using its client_id and client_secret, and receives an access token. This is appropriate for backend services, cron jobs, microservice-to-microservice communication, and CI/CD pipelines. There is no redirect and no user interaction.',

    deviceFlowTitle: 'Device Authorization Flow',
    deviceFlowDesc: 'Designed for devices with limited input capabilities (smart TVs, gaming consoles, CLI tools). The device displays a short code and a URL. The user visits the URL on their phone or computer, enters the code, and authenticates. The device polls the Authorization Server until the user completes authentication. Used by tools like GitHub CLI and the AWS CLI.',

    pkceTitle: 'Authorization Code + PKCE (Recommended for SPAs and Mobile)',
    pkceDesc: 'PKCE (Proof Key for Code Exchange, pronounced "pixy") is an extension to the Authorization Code flow that eliminates the need for a client_secret for public clients. The client generates a random code_verifier, hashes it to produce a code_challenge, and sends the challenge with the authorization request. When exchanging the code for tokens, the client sends the original code_verifier. The server verifies that hash(code_verifier) == code_challenge, proving the token request came from the same client that started the flow.',
    pkceWhen: 'Use PKCE for: All single-page applications (SPAs), all mobile applications (iOS/Android), all native desktop applications, and any client that cannot securely store a client_secret. As of 2024, PKCE is recommended even for confidential clients (server-side apps) as an additional layer of protection.',

    grantTypesCode: '// Authorization Code + PKCE — Complete Implementation\n// Works for SPAs, mobile apps, and server-side apps\n\n// Step 1: Generate PKCE code_verifier and code_challenge\nfunction generateCodeVerifier() {\n  const array = new Uint8Array(32);\n  crypto.getRandomValues(array);\n  return btoa(String.fromCharCode(...array))\n    .replace(/\\+/g, \'-\')\n    .replace(/\\//g, \'_\')\n    .replace(/=/g, \'\');\n}\n\nasync function generateCodeChallenge(verifier) {\n  const encoder = new TextEncoder();\n  const data = encoder.encode(verifier);\n  const digest = await crypto.subtle.digest(\'SHA-256\', data);\n  return btoa(String.fromCharCode(...new Uint8Array(digest)))\n    .replace(/\\+/g, \'-\')\n    .replace(/\\//g, \'_\')\n    .replace(/=/g, \'\');\n}\n\n// Step 2: Build authorization URL and redirect\nasync function startOAuthFlow() {\n  const codeVerifier = generateCodeVerifier();\n  const codeChallenge = await generateCodeChallenge(codeVerifier);\n  const state = crypto.randomUUID(); // CSRF protection\n\n  // Store verifier and state securely (sessionStorage is OK for this)\n  sessionStorage.setItem(\'pkce_verifier\', codeVerifier);\n  sessionStorage.setItem(\'oauth_state\', state);\n\n  const params = new URLSearchParams({\n    response_type: \'code\',\n    client_id: \'YOUR_CLIENT_ID\',\n    redirect_uri: \'https://yourapp.com/callback\',\n    scope: \'openid email profile\',\n    state,\n    code_challenge: codeChallenge,\n    code_challenge_method: \'S256\',\n  });\n\n  window.location.href = \'https://accounts.google.com/o/oauth2/v2/auth?\' + params;\n}\n\n// Step 3: Handle callback — exchange code for tokens\nasync function handleCallback() {\n  const params = new URLSearchParams(window.location.search);\n  const code = params.get(\'code\');\n  const state = params.get(\'state\');\n  const error = params.get(\'error\');\n\n  if (error) throw new Error(\'OAuth error: \' + error);\n\n  // Validate state to prevent CSRF\n  const storedState = sessionStorage.getItem(\'oauth_state\');\n  if (state !== storedState) throw new Error(\'State mismatch — possible CSRF attack\');\n\n  const codeVerifier = sessionStorage.getItem(\'pkce_verifier\');\n  sessionStorage.removeItem(\'pkce_verifier\');\n  sessionStorage.removeItem(\'oauth_state\');\n\n  // Exchange code for tokens\n  const tokenResponse = await fetch(\'https://oauth2.googleapis.com/token\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/x-www-form-urlencoded\' },\n    body: new URLSearchParams({\n      grant_type: \'authorization_code\',\n      client_id: \'YOUR_CLIENT_ID\',\n      redirect_uri: \'https://yourapp.com/callback\',\n      code,\n      code_verifier: codeVerifier,\n    }),\n  });\n\n  const tokens = await tokenResponse.json();\n  // tokens.access_token, tokens.refresh_token, tokens.id_token\n  return tokens;\n}',

    clientCredCode: '// Client Credentials Flow — Machine-to-Machine\n// Node.js example\n\nasync function getM2MToken() {\n  const response = await fetch(\'https://auth.example.com/oauth/token\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/x-www-form-urlencoded\' },\n    body: new URLSearchParams({\n      grant_type: \'client_credentials\',\n      client_id: process.env.CLIENT_ID,\n      client_secret: process.env.CLIENT_SECRET,\n      scope: \'read:reports write:data\',\n    }),\n  });\n\n  const { access_token, expires_in } = await response.json();\n\n  // Cache the token until it expires (minus a buffer)\n  tokenCache.set(\'m2m_token\', {\n    token: access_token,\n    expiresAt: Date.now() + (expires_in - 60) * 1000, // 60s buffer\n  });\n\n  return access_token;\n}\n\nasync function getCachedM2MToken() {\n  const cached = tokenCache.get(\'m2m_token\');\n  if (cached && cached.expiresAt > Date.now()) {\n    return cached.token;\n  }\n  return getM2MToken();\n}\n\n// Usage in a service call\nasync function fetchInternalData() {\n  const token = await getCachedM2MToken();\n  const res = await fetch(\'https://internal-api.example.com/reports\', {\n    headers: { Authorization: \'Bearer \' + token },\n  });\n  return res.json();\n}',

    // Section 5
    tokensTitle: 'Access Tokens vs Refresh Tokens vs ID Tokens',
    accessTokenDesc: 'Access tokens are bearer credentials — whoever holds them can use them. They are typically short-lived (15 minutes to 1 hour) to limit the damage from theft. The client includes the access token in every API request via the Authorization: Bearer header. Access tokens may be opaque strings (the resource server validates them by calling an introspection endpoint) or self-contained JWTs (the resource server validates them locally using the public key).',
    refreshTokenDesc: 'Refresh tokens are long-lived credentials (1 day to 1 year, or non-expiring) that the client uses to obtain a new access token when the current one expires. Unlike access tokens, refresh tokens are only sent to the Authorization Server, never to the Resource Server. They must be stored securely. Refresh token rotation (issuing a new refresh token each time one is used) prevents indefinite reuse of a stolen refresh token.',
    idTokenDesc: 'ID tokens are JWTs issued by OpenID Connect providers. They contain identity claims (sub, name, email, picture, etc.) about the authenticated user. ID tokens are meant to be read by the client application — not sent to the Resource Server. To authenticate API requests, use the access token. The ID token answers "Who is this user?" while the access token answers "What can this app do?"',
    tokenLifecycleTitle: 'Token Lifecycle and Refresh',
    tokenLifecycleCode: '// Token refresh with rotation — Express.js backend\nconst jwt = require(\'jsonwebtoken\');\n\n// In-memory store (use Redis or database in production)\nconst refreshTokenStore = new Map();\n\napp.post(\'/auth/token/refresh\', async (req, res) => {\n  const { refresh_token } = req.body;\n  if (!refresh_token) {\n    return res.status(400).json({ error: \'refresh_token required\' });\n  }\n\n  let payload;\n  try {\n    payload = jwt.verify(refresh_token, process.env.REFRESH_SECRET);\n  } catch {\n    return res.status(401).json({ error: \'Invalid refresh token\' });\n  }\n\n  const stored = refreshTokenStore.get(payload.sub);\n  if (!stored || stored.token !== refresh_token) {\n    // Token reuse detected — invalidate family\n    refreshTokenStore.delete(payload.sub);\n    return res.status(401).json({ error: \'Refresh token reuse detected\' });\n  }\n\n  // Issue new access token\n  const accessToken = jwt.sign(\n    { sub: payload.sub, email: payload.email, scope: payload.scope },\n    process.env.ACCESS_SECRET,\n    { expiresIn: \'15m\', issuer: \'https://api.example.com\', audience: \'https://api.example.com\' }\n  );\n\n  // Rotate refresh token\n  const newRefreshToken = jwt.sign(\n    { sub: payload.sub, email: payload.email, scope: payload.scope },\n    process.env.REFRESH_SECRET,\n    { expiresIn: \'7d\' }\n  );\n  refreshTokenStore.set(payload.sub, {\n    token: newRefreshToken,\n    issuedAt: Date.now(),\n  });\n\n  res.json({\n    access_token: accessToken,\n    refresh_token: newRefreshToken,\n    token_type: \'Bearer\',\n    expires_in: 900,\n  });\n});',

    // Section 6
    jwtTitle: 'JWT Structure and Verification',
    jwtDesc1: 'JSON Web Tokens (JWT, RFC 7519) are the most common format for OAuth 2.0 access tokens and OIDC ID tokens. A JWT consists of three Base64URL-encoded parts separated by dots: Header.Payload.Signature.',
    jwtHeaderDesc: 'The Header specifies the signing algorithm (alg) and token type (typ). Common algorithms are HS256 (HMAC-SHA256, symmetric — same key for signing and verification) and RS256 (RSA-SHA256, asymmetric — private key signs, public key verifies). For distributed systems, RS256 is preferred because resource servers can verify tokens using the public key without needing the private key.',
    jwtPayloadDesc: 'The Payload contains claims — statements about the user and the token. Registered claims include iss (issuer), sub (subject/user ID), aud (audience), exp (expiration), iat (issued at), and jti (JWT ID for revocation). Public and private claims carry application-specific data like role, email, and scope. The payload is Base64URL encoded, not encrypted — never put sensitive data like passwords in a JWT payload.',
    jwtSigDesc: 'The Signature is computed as: Base64URL(Header) + "." + Base64URL(Payload) signed with the algorithm and key specified in the header. Verifying the signature proves that the token was issued by a trusted party and has not been tampered with.',
    jwtVerifyTitle: 'JWT Verification Checklist',
    jwtVerify1: 'Verify the signature using the correct algorithm and key (fetch the JWKS endpoint to get current public keys)',
    jwtVerify2: 'Check exp — reject tokens where exp < current time',
    jwtVerify3: 'Check iss — the issuer must match your expected Authorization Server URL',
    jwtVerify4: 'Check aud — the audience must include your API\'s identifier',
    jwtVerify5: 'Check nbf — if present, the token must not be used before this time',
    jwtVerify6: 'Check algorithm in header matches expected algorithm (prevent algorithm confusion attacks)',
    jwtCode: '// JWT verification — Node.js with jose library (recommended)\nimport { createRemoteJWKSet, jwtVerify } from \'jose\';\n\n// Fetch public keys from Authorization Server\'s JWKS endpoint\nconst JWKS = createRemoteJWKSet(\n  new URL(\'https://accounts.google.com/.well-known/jwks.json\')\n);\n\nasync function verifyAccessToken(token) {\n  const { payload } = await jwtVerify(token, JWKS, {\n    issuer: \'https://accounts.google.com\',\n    audience: \'https://api.yourapp.com\',\n    algorithms: [\'RS256\'],\n  });\n\n  // payload is verified — access claims safely\n  return {\n    userId: payload.sub,\n    email: payload.email,\n    scope: payload.scope,\n    expiresAt: new Date(payload.exp * 1000),\n  };\n}\n\n// Express.js middleware\nasync function requireAuth(req, res, next) {\n  const header = req.headers.authorization;\n  if (!header?.startsWith(\'Bearer \')) {\n    return res.status(401).json({ error: \'Bearer token required\' });\n  }\n  try {\n    const token = header.slice(7);\n    req.user = await verifyAccessToken(token);\n    next();\n  } catch (err) {\n    return res.status(401).json({ error: \'Invalid or expired token\', details: err.message });\n  }\n}\n\n// Python — JWT verification with PyJWT\n"""\nimport jwt\nfrom jwt import PyJWKClient\n\njwks_client = PyJWKClient("https://accounts.google.com/.well-known/jwks.json")\n\ndef verify_token(token: str) -> dict:\n    signing_key = jwks_client.get_signing_key_from_jwt(token)\n    payload = jwt.decode(\n        token,\n        signing_key.key,\n        algorithms=["RS256"],\n        audience="https://api.yourapp.com",\n        issuer="https://accounts.google.com",\n        options={"verify_exp": True}\n    )\n    return payload\n"""',

    // Section 7
    implTitle: 'Implementation Examples: Node.js and Python',
    implNodeTitle: 'Node.js: Complete OAuth 2.0 Server with Passport.js',
    implNodeCode: '// Node.js / Express — OAuth 2.0 with Passport.js\n// npm install passport passport-google-oauth20 express-session\n\nconst passport = require(\'passport\');\nconst { Strategy: GoogleStrategy } = require(\'passport-google-oauth20\');\nconst session = require(\'express-session\');\n\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  cookie: { secure: true, httpOnly: true, sameSite: \'lax\', maxAge: 24 * 3600 * 1000 },\n}));\napp.use(passport.initialize());\napp.use(passport.session());\n\npassport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL: \'https://yourapp.com/auth/google/callback\',\n  scope: [\'openid\', \'email\', \'profile\'],\n}, async (accessToken, refreshToken, profile, done) => {\n  // Find or create user in database\n  let user = await db.users.findOne({ googleId: profile.id });\n  if (!user) {\n    user = await db.users.create({\n      googleId: profile.id,\n      email: profile.emails[0].value,\n      name: profile.displayName,\n      picture: profile.photos[0].value,\n    });\n  }\n  // Store tokens if you need to call Google APIs on behalf of user\n  await db.tokens.upsert({\n    userId: user.id,\n    accessToken,          // short-lived Google access token\n    refreshToken,         // long-lived, only sent on first auth\n  });\n  return done(null, user);\n}));\n\npassport.serializeUser((user, done) => done(null, user.id));\npassport.deserializeUser(async (id, done) => {\n  const user = await db.users.findById(id);\n  done(null, user);\n});\n\n// Routes\napp.get(\'/auth/google\', passport.authenticate(\'google\'));\napp.get(\'/auth/google/callback\',\n  passport.authenticate(\'google\', { failureRedirect: \'/login\' }),\n  (req, res) => res.redirect(\'/dashboard\')\n);\napp.get(\'/auth/logout\', (req, res) => {\n  req.logout(() => res.redirect(\'/\'));\n});\n\n// Protected route\napp.get(\'/api/me\', ensureAuthenticated, (req, res) => {\n  res.json({ user: req.user });\n});\n\nfunction ensureAuthenticated(req, res, next) {\n  if (req.isAuthenticated()) return next();\n  res.status(401).json({ error: \'Not authenticated\' });\n}',

    implPythonTitle: 'Python: FastAPI + OAuth 2.0 (GitHub)',
    implPythonCode: '# Python FastAPI — GitHub OAuth 2.0\n# pip install fastapi httpx python-dotenv\n\nfrom fastapi import FastAPI, HTTPException, Request\nfrom fastapi.responses import RedirectResponse\nimport httpx\nimport secrets\nimport os\n\napp = FastAPI()\nstate_store = {}  # Use Redis in production\n\nGITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")\nGITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")\nREDIRECT_URI = "https://yourapp.com/auth/github/callback"\n\n@app.get("/auth/github")\nasync def github_login():\n    state = secrets.token_urlsafe(32)\n    state_store[state] = True\n    params = {\n        "client_id": GITHUB_CLIENT_ID,\n        "redirect_uri": REDIRECT_URI,\n        "scope": "read:user user:email",\n        "state": state,\n    }\n    url = "https://github.com/login/oauth/authorize?" + "&".join(\n        f"{k}={v}" for k, v in params.items()\n    )\n    return RedirectResponse(url)\n\n@app.get("/auth/github/callback")\nasync def github_callback(code: str, state: str):\n    # Validate state to prevent CSRF\n    if state not in state_store:\n        raise HTTPException(status_code=400, detail="Invalid state parameter")\n    del state_store[state]\n\n    async with httpx.AsyncClient() as client:\n        # Exchange code for access token\n        token_res = await client.post(\n            "https://github.com/login/oauth/access_token",\n            json={\n                "client_id": GITHUB_CLIENT_ID,\n                "client_secret": GITHUB_CLIENT_SECRET,\n                "code": code,\n                "redirect_uri": REDIRECT_URI,\n            },\n            headers={"Accept": "application/json"},\n        )\n        token_data = token_res.json()\n        access_token = token_data["access_token"]\n\n        # Fetch user profile\n        user_res = await client.get(\n            "https://api.github.com/user",\n            headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"},\n        )\n        user = user_res.json()\n\n    # Create session or JWT for your app\n    return {"user_id": user["id"], "login": user["login"], "email": user["email"]}',

    // Section 8
    securityTitle: 'OAuth 2.0 Security Best Practices',
    securityPkceTitle: 'Always Use PKCE for Public Clients',
    securityPkceDesc: 'Any client that cannot securely store a client_secret must use PKCE. This includes all browser-based apps and all mobile/desktop apps. PKCE prevents authorization code interception attacks where an attacker intercepts the callback URL and steals the authorization code. Without PKCE, a stolen authorization code can be exchanged for tokens.',
    securityStateTitle: 'Validate the State Parameter',
    securityStateDesc: 'The state parameter is your primary CSRF defense in OAuth flows. Generate a cryptographically random value, store it in session before redirecting, and verify it matches exactly when the callback arrives. Reject any callback where the state is missing or does not match. Failure to validate state exposes your users to CSRF attacks where an attacker can link their own OAuth code to a victim\'s account.',
    securityStorageTitle: 'Token Storage Strategy',
    securityStorageDesc: 'For server-side apps, store tokens in the server-side session (Redis-backed), never in the client. For SPAs, use memory storage for access tokens and httpOnly cookies for refresh tokens. Never store tokens in localStorage — XSS attacks can steal them. If you must use localStorage (e.g., for offline support), treat it as a cache and never store refresh tokens there.',
    securityTokenExpTitle: 'Short-Lived Access Tokens + Refresh Token Rotation',
    securityTokenExpDesc: 'Set access tokens to expire in 15-60 minutes. Use refresh token rotation so that every refresh request issues a new refresh token and invalidates the previous one. If a refresh token is used twice (by an attacker who stole it), the server detects the reuse and invalidates the entire token family, protecting the user.',
    securityRedirectTitle: 'Strict Redirect URI Validation',
    securityRedirectDesc: 'Register exact redirect URIs (not wildcard patterns) with your Authorization Server. The server should reject any authorization request whose redirect_uri does not exactly match a registered URI. Open redirect vulnerabilities in the redirect_uri allow attackers to intercept authorization codes. Never allow redirect_uri values that contain user-supplied data.',
    securityCode: '// Security checklist implementation\n\n// 1. Validate redirect_uri strictly (server-side)\nconst ALLOWED_REDIRECT_URIS = [\n  \'https://yourapp.com/auth/callback\',\n  \'https://staging.yourapp.com/auth/callback\',\n];\n\nfunction validateRedirectUri(uri) {\n  return ALLOWED_REDIRECT_URIS.includes(uri);\n}\n\n// 2. Validate state parameter\nfunction generateState() {\n  return Buffer.from(crypto.randomBytes(32)).toString(\'base64url\');\n}\n\nfunction validateState(received, stored) {\n  if (!received || !stored) return false;\n  // Use constant-time comparison to prevent timing attacks\n  return crypto.timingSafeEqual(\n    Buffer.from(received),\n    Buffer.from(stored)\n  );\n}\n\n// 3. Token introspection — verify opaque tokens\nasync function introspectToken(token) {\n  const res = await fetch(\'https://auth.example.com/oauth/introspect\', {\n    method: \'POST\',\n    headers: {\n      \'Content-Type\': \'application/x-www-form-urlencoded\',\n      \'Authorization\': \'Basic \' + Buffer.from(\n        process.env.CLIENT_ID + \':\' + process.env.CLIENT_SECRET\n      ).toString(\'base64\'),\n    },\n    body: new URLSearchParams({ token }),\n  });\n  const data = await res.json();\n  if (!data.active) throw new Error(\'Token is not active\');\n  return data;\n}\n\n// 4. Revoke tokens on logout\nasync function revokeToken(token, tokenTypeHint = \'access_token\') {\n  await fetch(\'https://auth.example.com/oauth/revoke\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/x-www-form-urlencoded\' },\n    body: new URLSearchParams({\n      token,\n      token_type_hint: tokenTypeHint,\n      client_id: process.env.CLIENT_ID,\n      client_secret: process.env.CLIENT_SECRET,\n    }),\n  });\n}',

    // Section 9
    socialTitle: 'Social Login: Google, GitHub, and Facebook OAuth',
    socialDesc: 'Social login (Sign in with Google/GitHub/Facebook) uses OAuth 2.0 under the hood. Each provider has slightly different scopes, endpoints, and token behaviors. Here is a comparison of the three most popular providers.',
    socialGoogleTitle: 'Google OAuth 2.0 / OIDC',
    socialGoogleDesc: 'Google implements both OAuth 2.0 and OpenID Connect. The authorization endpoint is https://accounts.google.com/o/oauth2/v2/auth. Use the openid scope to get an ID token, email for the user\'s email, and profile for name and picture. Google\'s tokens can be verified against the public keys at https://www.googleapis.com/oauth2/v3/certs.',
    socialGithubTitle: 'GitHub OAuth 2.0',
    socialGithubDesc: 'GitHub uses classic OAuth 2.0 (not OIDC — there is no ID token). Authorization endpoint: https://github.com/login/oauth/authorize. Token endpoint: https://github.com/login/oauth/access_token. Use scopes read:user and user:email to get the user\'s profile and email. GitHub access tokens do not expire unless revoked, so you must handle token revocation explicitly.',
    socialFacebookTitle: 'Facebook OAuth 2.0',
    socialFacebookDesc: 'Facebook Graph API uses OAuth 2.0. Authorization endpoint: https://www.facebook.com/v18.0/dialog/oauth. Request permissions (scopes) like email and public_profile. Facebook access tokens can be short-lived (1-2 hours) with the option to exchange for a long-lived token (60 days) using the client secret. Use the /me endpoint with the access token to fetch user data.',
    socialCode: '// Unified social login handler — Node.js\n// Works with Google, GitHub, Facebook\n\nconst PROVIDERS = {\n  google: {\n    authUrl: \'https://accounts.google.com/o/oauth2/v2/auth\',\n    tokenUrl: \'https://oauth2.googleapis.com/token\',\n    userUrl: \'https://openidconnect.googleapis.com/v1/userinfo\',\n    scope: \'openid email profile\',\n    clientId: process.env.GOOGLE_CLIENT_ID,\n    clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  },\n  github: {\n    authUrl: \'https://github.com/login/oauth/authorize\',\n    tokenUrl: \'https://github.com/login/oauth/access_token\',\n    userUrl: \'https://api.github.com/user\',\n    scope: \'read:user user:email\',\n    clientId: process.env.GITHUB_CLIENT_ID,\n    clientSecret: process.env.GITHUB_CLIENT_SECRET,\n  },\n  facebook: {\n    authUrl: \'https://www.facebook.com/v18.0/dialog/oauth\',\n    tokenUrl: \'https://graph.facebook.com/v18.0/oauth/access_token\',\n    userUrl: \'https://graph.facebook.com/me?fields=id,name,email,picture\',\n    scope: \'email,public_profile\',\n    clientId: process.env.FACEBOOK_APP_ID,\n    clientSecret: process.env.FACEBOOK_APP_SECRET,\n  },\n};\n\napp.get(\'/auth/:provider\', (req, res) => {\n  const provider = PROVIDERS[req.params.provider];\n  if (!provider) return res.status(404).json({ error: \'Unknown provider\' });\n\n  const state = generateState();\n  req.session.oauthState = state;\n  req.session.oauthProvider = req.params.provider;\n\n  const params = new URLSearchParams({\n    response_type: \'code\',\n    client_id: provider.clientId,\n    redirect_uri: \'https://yourapp.com/auth/callback\',\n    scope: provider.scope,\n    state,\n  });\n  res.redirect(provider.authUrl + \'?\' + params);\n});\n\napp.get(\'/auth/callback\', async (req, res) => {\n  const { code, state } = req.query;\n  const providerName = req.session.oauthProvider;\n  const provider = PROVIDERS[providerName];\n\n  if (!validateState(state, req.session.oauthState)) {\n    return res.status(403).json({ error: \'Invalid state\' });\n  }\n\n  // Exchange code for token\n  const tokenRes = await fetch(provider.tokenUrl, {\n    method: \'POST\',\n    headers: { \'Accept\': \'application/json\', \'Content-Type\': \'application/x-www-form-urlencoded\' },\n    body: new URLSearchParams({\n      grant_type: \'authorization_code\',\n      client_id: provider.clientId,\n      client_secret: provider.clientSecret,\n      code,\n      redirect_uri: \'https://yourapp.com/auth/callback\',\n    }),\n  });\n  const { access_token } = await tokenRes.json();\n\n  // Fetch user profile\n  const userRes = await fetch(provider.userUrl, {\n    headers: { Authorization: \'Bearer \' + access_token },\n  });\n  const profile = await userRes.json();\n\n  // Upsert user in your database\n  const user = await upsertUser(providerName, profile);\n  req.session.userId = user.id;\n  res.redirect(\'/dashboard\');\n});',

    // Section 10
    oidcTitle: 'OpenID Connect (OIDC) Explained',
    oidcDesc1: 'OpenID Connect is an identity layer built directly on top of OAuth 2.0. It adds a standardized way to authenticate users and retrieve their profile information. While OAuth 2.0 answers "Can this app access this resource?", OIDC answers "Who is this user?"',
    oidcDesc2: 'OIDC introduces three key additions to OAuth 2.0: the ID token (a JWT containing user identity claims), the UserInfo endpoint (for fetching additional claims beyond what fits in the ID token), and a standardized discovery document (.well-known/openid-configuration) that describes the provider\'s endpoints and capabilities.',
    oidcClaimsTitle: 'Standard OIDC Claims',
    oidcClaimsDesc: 'OIDC defines a set of standard claims in the ID token payload. The sub claim is the unique user identifier (do not use email as a user identifier — it can change). The name, given_name, and family_name claims provide the user\'s display name. The email and email_verified claims give the user\'s email and whether it has been verified. The picture claim is a URL to the user\'s profile photo.',
    oidcFlowTitle: 'OIDC Authorization Code Flow',
    oidcCode: '// OpenID Connect — Complete Implementation\n// Using the openid-client library (recommended)\n// npm install openid-client\n\nimport { Issuer, generators } from \'openid-client\';\n\n// Discovery — fetches .well-known/openid-configuration automatically\nconst googleIssuer = await Issuer.discover(\'https://accounts.google.com\');\n\nconst client = new googleIssuer.Client({\n  client_id: process.env.GOOGLE_CLIENT_ID,\n  client_secret: process.env.GOOGLE_CLIENT_SECRET,\n  redirect_uris: [\'https://yourapp.com/auth/callback\'],\n  response_types: [\'code\'],\n});\n\n// Generate auth URL with PKCE\napp.get(\'/auth/login\', (req, res) => {\n  const codeVerifier = generators.codeVerifier();\n  const codeChallenge = generators.codeChallenge(codeVerifier);\n  const state = generators.state();\n  const nonce = generators.nonce(); // OIDC-specific replay protection\n\n  req.session.codeVerifier = codeVerifier;\n  req.session.state = state;\n  req.session.nonce = nonce;\n\n  const url = client.authorizationUrl({\n    scope: \'openid email profile\',\n    code_challenge: codeChallenge,\n    code_challenge_method: \'S256\',\n    state,\n    nonce,\n  });\n  res.redirect(url);\n});\n\n// Handle callback\napp.get(\'/auth/callback\', async (req, res) => {\n  const params = client.callbackParams(req);\n\n  // Exchange code for tokens — validates state, nonce, and token claims\n  const tokenSet = await client.callback(\n    \'https://yourapp.com/auth/callback\',\n    params,\n    {\n      code_verifier: req.session.codeVerifier,\n      state: req.session.state,\n      nonce: req.session.nonce,\n    }\n  );\n\n  // tokenSet.access_token — use to call APIs\n  // tokenSet.id_token — contains user identity\n  // tokenSet.claims() — parsed ID token payload\n\n  const claims = tokenSet.claims();\n  // claims.sub — unique user ID (stable, use as primary key)\n  // claims.email — user email\n  // claims.name — display name\n  // claims.picture — avatar URL\n  // claims.email_verified — boolean\n\n  const user = await upsertUser({\n    oidcSub: claims.sub,\n    email: claims.email,\n    name: claims.name,\n    picture: claims.picture,\n  });\n\n  req.session.userId = user.id;\n  res.redirect(\'/dashboard\');\n});',

    // Section 11
    comparisonTitle: 'OAuth 2.0 vs SAML vs JWT: Which to Choose?',
    comparisonDesc: 'Three protocols dominate enterprise identity and API security. Understanding when to use each saves significant architectural pain.',
    samlDesc: 'SAML 2.0 (Security Assertion Markup Language) is an XML-based protocol designed for enterprise Single Sign-On (SSO). It is widely supported by enterprise IdPs (Identity Providers) like Active Directory Federation Services, Okta, and OneLogin. SAML assertions are larger than JWTs, XML-based, and often signed with XML-DSig. SAML is the right choice when your customers are enterprises with existing Active Directory/LDAP infrastructure and you need to support SSO to multiple services under one corporate identity.',
    jwtCompDesc: 'JWT by itself is not an authentication protocol — it is a token format. JWTs can be used as OAuth 2.0 access tokens, OIDC ID tokens, or standalone stateless session tokens. The confusion arises because many systems use JWTs for authentication without implementing OAuth 2.0. This is fine for internal systems but lacks the standardized delegation, scopes, and token revocation that OAuth 2.0 provides.',
    oauthCompDesc: 'OAuth 2.0 is the right choice for API authorization, third-party integrations, and building identity platforms (when combined with OIDC). It is the most flexible of the three and is supported by every major identity provider.',

    // Section 12
    vulnTitle: 'Common OAuth Vulnerabilities and Prevention',
    csrf: 'CSRF in OAuth Callback',
    csrfDesc: 'An attacker initiates an OAuth flow, gets a valid authorization code, then tricks a victim into clicking the callback URL with the attacker\'s code. If the victim\'s session is used to exchange the code, the victim\'s account becomes linked to the attacker\'s identity. Prevention: always validate the state parameter. The state value must match exactly what was stored in the user\'s session before the redirect.',
    openRedirect: 'Open Redirect via redirect_uri',
    openRedirectDesc: 'If the Authorization Server does not strictly validate the redirect_uri, an attacker can supply a malicious URI and steal the authorization code when it is redirected there. Prevention: register exact URIs (no wildcards), validate strictly server-side, and never accept redirect_uri values containing user-controlled data.',
    tokenLeakage: 'Authorization Code / Token Leakage via Referrer',
    tokenLeakageDesc: 'If the callback page loads third-party resources (analytics, ads, fonts), the authorization code in the URL may leak via the Referrer header. Prevention: use the Referrer-Policy: no-referrer header, process and remove the code from the URL immediately after extraction, and use PKCE so a stolen code cannot be exchanged without the code_verifier.',
    mixedAudience: 'Confused Deputy / Audience Confusion',
    mixedAudienceDesc: 'An attacker tricks a service into accepting a token issued for a different audience. For example, using a Google ID token issued for app A to authenticate to app B. Prevention: always verify the aud (audience) claim matches your own API identifier. Never accept tokens without audience validation.',
    tokenSub: 'Token Substitution',
    tokenSubDesc: 'An attacker swaps a token from one context to another. For example, using an access token issued for read scope to call a write endpoint if the endpoint does not check scopes. Prevention: validate scopes on every protected endpoint, not just at the gateway.',
    vulnCode: '// Scope validation middleware — Express.js\nfunction requireScope(...requiredScopes) {\n  return (req, res, next) => {\n    const tokenScopes = (req.user.scope || \'\').split(\' \');\n    const hasAllScopes = requiredScopes.every(s => tokenScopes.includes(s));\n    if (!hasAllScopes) {\n      return res.status(403).json({\n        error: \'insufficient_scope\',\n        required: requiredScopes,\n        granted: tokenScopes,\n      });\n    }\n    next();\n  };\n}\n\n// Usage\napp.get(\'/api/reports\', requireAuth, requireScope(\'read:reports\'), getReports);\napp.post(\'/api/data\', requireAuth, requireScope(\'write:data\'), createData);\napp.delete(\'/api/data/:id\', requireAuth, requireScope(\'write:data\', \'admin\'), deleteData);\n\n// Audience validation in token verification\nasync function verifyTokenStrict(token) {\n  const { payload } = await jwtVerify(token, JWKS, {\n    issuer: process.env.EXPECTED_ISSUER,\n    audience: process.env.API_IDENTIFIER, // e.g. "https://api.yourapp.com"\n    algorithms: [\'RS256\'],\n    clockTolerance: 30, // 30 second clock skew allowance\n  });\n  return payload;\n}',

    // FAQ
    faq1q: 'What is the difference between OAuth 2.0 and OpenID Connect?',
    faq1a: 'OAuth 2.0 is an authorization framework that lets applications request access to resources on behalf of a user. It does not define how to authenticate users or exchange user identity information. OpenID Connect (OIDC) is a thin identity layer built on top of OAuth 2.0 that adds user authentication. OIDC introduces the ID token (a JWT with identity claims like name, email, and profile picture) and a standardized UserInfo endpoint. Use OAuth 2.0 alone when you only need resource access; use OIDC when you need to know who the user is.',
    faq2q: 'Should I use the Implicit flow or Authorization Code + PKCE for my SPA?',
    faq2a: 'Always use Authorization Code + PKCE for SPAs. The Implicit flow (where the access token is returned directly in the URL fragment) is deprecated as of OAuth 2.0 Security Best Current Practice (RFC 9700). The Implicit flow exposes tokens in browser history and referrer headers. PKCE solves the same problem (no client_secret needed for public clients) without the security issues.',
    faq3q: 'Where should I store OAuth tokens in a browser?',
    faq3a: 'The safest approach is to store refresh tokens in httpOnly, Secure, SameSite=Strict cookies (inaccessible to JavaScript, thus protected from XSS) and keep access tokens only in memory (a JavaScript variable or closure). Never store refresh tokens in localStorage — any XSS vulnerability on your page can steal them. If you use cookie storage, implement CSRF protection with the SameSite attribute and CSRF tokens.',
    faq4q: 'How do refresh tokens and access token rotation work?',
    faq4a: 'Access tokens are short-lived (15 minutes to 1 hour). When they expire, the client uses its refresh token to request a new access token from the Authorization Server. With refresh token rotation, each refresh request issues a new refresh token and invalidates the previous one. If a stolen refresh token is used after the legitimate user has already used it, the server detects the reuse (the old token is already invalidated) and revokes the entire token family, forcing re-authentication. This limits the damage window of a stolen refresh token.',
    faq5q: 'What is PKCE and why is it necessary?',
    faq5a: 'PKCE (Proof Key for Code Exchange) is an extension that prevents authorization code interception attacks for public clients (SPAs, mobile apps) that cannot securely store a client_secret. The client generates a random code_verifier, hashes it to create a code_challenge, and sends the challenge with the authorization request. When exchanging the code for tokens, the client sends the original verifier. The server hashes it and checks it matches the stored challenge. An attacker who intercepts the authorization code cannot exchange it without the original code_verifier.',
    faq6q: 'What is the difference between OAuth 2.0 scopes and roles?',
    faq6a: 'Scopes in OAuth 2.0 represent the permissions a client application is requesting on behalf of a user (e.g., read:contacts, write:calendar). They are coarse-grained and defined by the resource server. Roles (RBAC — Role-Based Access Control) are typically user-level attributes (admin, editor, viewer) that determine what a user can do in your system. Both are often used together: OAuth scopes limit what the application can do, while roles (embedded as claims in the access token) determine what the user is allowed to do within those scopes.',
    faq7q: 'How do I revoke an OAuth access token?',
    faq7a: 'For JWT access tokens, true revocation is difficult because they are self-contained and valid until expiry. Common approaches include: maintaining a token revocation list (blocklist) checked on each request (fast with Redis), using short-lived access tokens (15 min) so stolen tokens expire quickly, and calling the Authorization Server\'s revocation endpoint (RFC 7009) for refresh tokens. For opaque tokens, call the introspection endpoint on each request — the Authorization Server tracks active tokens and returns active: false for revoked ones.',
    faq8q: 'Can OAuth 2.0 replace a traditional username/password login?',
    faq8a: 'OAuth 2.0 + OpenID Connect can fully replace traditional login. Users authenticate with a trusted identity provider (Google, GitHub, your own OIDC server) and your application receives verified identity claims. You never store passwords. This improves security (no password database to breach) and UX (no registration forms). However, you add a dependency on the identity provider. For maximum resilience, support both social login and a local password option, or use an identity service like Auth0 or Supabase Auth that handles both.',

    tryTools: 'Try our related security tools',
  },

  zh: {
    title: 'OAuth 2.0 完整指南：授权码、PKCE、OpenID Connect 与安全最佳实践',
    description: '从原理到实践掌握 OAuth 2.0。学习每种授权类型、JWT 结构、PKCE、OpenID Connect、令牌存储、社交登录以及如何防止常见 OAuth 漏洞。',

    tldr: 'OAuth 2.0 是一个委托授权框架——它让用户能够授权第三方应用有限访问其资源，而无需共享密码。对于 SPA 和移动应用使用授权码 + PKCE 流程，机器间通信使用客户端凭证流程，当需要身份认证（用户是谁，而不仅仅是能访问什么）时，在 OAuth 2.0 之上使用 OpenID Connect（OIDC）。',

    keyTakeaways: '核心要点',
    kt1: 'OAuth 2.0 用于授权（访问权限）；OpenID Connect 在其之上添加了认证（身份）功能。',
    kt2: '对于浏览器和移动应用，始终使用授权码 + PKCE 流程——隐式流程已被废弃。',
    kt3: '访问令牌应短期有效（15 分钟）；刷新令牌可以长期有效，但需配合轮换机制。',
    kt4: '在 httpOnly Cookie 中存储令牌以防止 XSS；使用 CSRF 令牌防止 CSRF 攻击。',
    kt5: '始终验证 state 参数，以防止 OAuth 回调中的 CSRF 攻击。',
    kt6: 'JWT 访问令牌是自包含的——在每次请求时验证签名、过期时间、颁发者和受众。',

    whatIsTitle: 'OAuth 2.0 是什么？为什么要创建它？',
    whatIsDesc1: '在 OAuth 出现之前，委托 API 访问权限非常痛苦。如果你想让第三方应用访问你的 Google Drive，你必须把 Google 用户名和密码都给它。该应用拥有对你整个账户的完全访问权限，你无法在不更改密码的情况下撤销访问，第三方可以做任何人类能做的事情。',
    whatIsDesc2: 'OAuth 2.0（RFC 6749，2012 年发布）通过委托模型解决了这个问题。用户不共享凭证，而是授予第三方应用一个有限范围的访问令牌。用户批准特定权限（作用域），令牌自动过期，用户可以随时撤销访问权限，无需更改密码。',
    whatIsDesc3: 'OAuth 2.0 定义了四个角色：资源所有者（用户）、客户端（第三方应用）、授权服务器（颁发令牌的服务，如 Google 的认证服务器）和资源服务器（持有受保护资源的 API，如 Google Drive API）。这些角色通过一系列重定向和后端通道请求进行通信。',
    whatIsDesc4: 'OAuth 2.0 的关键洞见是，用户的凭证永远不会到达第三方应用。用户直接向授权服务器（其信任的服务）进行认证，只有生成的令牌才会交给客户端。',

    versionsTitle: 'OAuth 2.0 vs OAuth 1.0 vs OpenID Connect',
    versionsDesc1: 'OAuth 1.0（2007 年）要求对每个 API 调用进行复杂的密码学请求签名（HMAC-SHA1）。每个请求都必须包含时间戳、nonce 和从请求参数与共享密钥计算出的签名。虽然安全，但实现起来极其困难，开发体验很差。',
    versionsDesc2: 'OAuth 2.0 放弃了强制性的请求签名，转而使用 TLS（HTTPS）进行传输安全。这使实现更简单，但通过多种授权类型引入了新的复杂性。OAuth 2.0 是一个框架，而非协议——不同提供商的实现可能差异显著。',
    versionsDesc3: 'OpenID Connect（OIDC）是构建在 OAuth 2.0 之上的轻量级身份层。OAuth 2.0 只处理授权（该应用能否访问此资源？），OIDC 在此基础上添加了认证（这个用户是谁？）。OIDC 引入了 ID 令牌——一个包含 name、email 和头像等身份声明的 JWT。如果你需要知道用户是谁（而不仅仅是他们授权了你的应用），请使用 OIDC。',
    versionsCompareTitle: '快速对比',

    conceptsTitle: '核心概念：角色、作用域和令牌',
    conceptsRolesTitle: 'OAuth 2.0 的四个角色',
    conceptsRolesDesc: '每次 OAuth 2.0 交互都涉及四个角色。资源所有者通常是拥有数据的终端用户。客户端是请求访问权限的应用程序（你的 Web 应用、移动应用或后端服务）。授权服务器在认证资源所有者并获得授权后颁发访问令牌。资源服务器托管受保护的资源，并在每次请求时验证访问令牌。',
    conceptsScopesTitle: '作用域（Scopes）',
    conceptsScopesDesc: '作用域定义了正在请求的权限。它们是客户端请求、用户批准的空格分隔字符串。示例包括 read:user、repo、openid、email 和 profile。设计良好的 OAuth 服务器使用细粒度作用域，让用户可以授予最小必要权限。始终只请求应用实际需要的作用域。',
    conceptsTokensTitle: '令牌类型',
    conceptsTokensDesc: 'OAuth 2.0 使用三种类型的令牌。访问令牌是短期凭证（通常 15-60 分钟），客户端在 API 请求中使用。刷新令牌是长期凭证（数天到数月），用于在不重新认证的情况下获取新的访问令牌。ID 令牌（仅限 OIDC）是包含用户身份声明的 JWT——供客户端读取，不应发送给资源服务器。',

    grantTypesTitle: '授权类型：该使用哪种流程？',
    grantTypesDesc: 'OAuth 2.0 为不同的客户端类型和使用场景定义了多种授权类型（流程）。选错授权类型是最常见的 OAuth 错误。',

    authCodeTitle: '授权码流程',
    authCodeDesc: '对于服务端 Web 应用最广泛使用、最安全的流程。客户端将用户重定向到授权服务器，用户认证并同意后，授权服务器带着短期授权码将用户重定向回客户端。客户端随后通过直接的服务器对服务器 POST 请求将此授权码换取令牌。访问令牌永远不会接触浏览器。',
    authCodeWhen: '适用场景：你有一个可以安全存储 client_secret 的服务端组件。Node.js、Python、Ruby、Java 和 PHP Web 应用都符合条件。后端通道令牌交换防止访问令牌出现在浏览器历史记录或日志中。',

    implicitTitle: '隐式流程（已废弃）',
    implicitDesc: '隐式流程是为无法发起服务端请求的 SPA 设计的。授权服务器直接在 URL 片段（#access_token=...）中返回访问令牌。这很方便但很危险——URL 片段中的令牌会出现在浏览器历史记录、Referrer 头和服务器日志中。隐式流程现已被 RFC 9700 废弃。对于所有基于浏览器的应用，请改用授权码 + PKCE。',

    clientCredTitle: '客户端凭证流程',
    clientCredDesc: '用于无用户参与的机器间（M2M）通信。客户端使用其 client_id 和 client_secret 直接向授权服务器进行认证，并获取访问令牌。适用于后端服务、定时任务、微服务间通信和 CI/CD 流水线。没有重定向，没有用户交互。',

    deviceFlowTitle: '设备授权流程',
    deviceFlowDesc: '专为输入能力有限的设备（智能电视、游戏机、CLI 工具）设计。设备显示一个短代码和一个 URL。用户在手机或电脑上访问该 URL，输入代码并认证。设备轮询授权服务器直到用户完成认证。被 GitHub CLI 和 AWS CLI 等工具使用。',

    pkceTitle: '授权码 + PKCE（SPA 和移动端推荐）',
    pkceDesc: 'PKCE（Proof Key for Code Exchange，发音为"pixy"）是授权码流程的扩展，无需公共客户端提供 client_secret。客户端生成一个随机的 code_verifier，将其哈希为 code_challenge，并在授权请求中发送该 challenge。在用授权码换取令牌时，客户端发送原始的 code_verifier。服务器验证 hash(code_verifier) == code_challenge，证明令牌请求来自发起流程的同一客户端。',
    pkceWhen: '适用于：所有单页应用（SPA）、所有移动应用（iOS/Android）、所有原生桌面应用，以及任何无法安全存储 client_secret 的客户端。截至 2024 年，PKCE 也被推荐用于机密客户端（服务端应用）作为额外的保护层。',

    grantTypesCode: '// 授权码 + PKCE — 完整实现\n// 适用于 SPA、移动应用和服务端应用\n\n// 第1步：生成 PKCE code_verifier 和 code_challenge\nfunction generateCodeVerifier() {\n  const array = new Uint8Array(32);\n  crypto.getRandomValues(array);\n  return btoa(String.fromCharCode(...array))\n    .replace(/\\+/g, \'-\')\n    .replace(/\\//g, \'_\')\n    .replace(/=/g, \'\');\n}\n\nasync function generateCodeChallenge(verifier) {\n  const encoder = new TextEncoder();\n  const data = encoder.encode(verifier);\n  const digest = await crypto.subtle.digest(\'SHA-256\', data);\n  return btoa(String.fromCharCode(...new Uint8Array(digest)))\n    .replace(/\\+/g, \'-\')\n    .replace(/\\//g, \'_\')\n    .replace(/=/g, \'\');\n}\n\n// 第2步：构建授权 URL 并重定向\nasync function startOAuthFlow() {\n  const codeVerifier = generateCodeVerifier();\n  const codeChallenge = await generateCodeChallenge(codeVerifier);\n  const state = crypto.randomUUID();\n\n  sessionStorage.setItem(\'pkce_verifier\', codeVerifier);\n  sessionStorage.setItem(\'oauth_state\', state);\n\n  const params = new URLSearchParams({\n    response_type: \'code\',\n    client_id: \'YOUR_CLIENT_ID\',\n    redirect_uri: \'https://yourapp.com/callback\',\n    scope: \'openid email profile\',\n    state,\n    code_challenge: codeChallenge,\n    code_challenge_method: \'S256\',\n  });\n\n  window.location.href = \'https://accounts.google.com/o/oauth2/v2/auth?\' + params;\n}',

    clientCredCode: '// 客户端凭证流程 — 机器间通信\nasync function getM2MToken() {\n  const response = await fetch(\'https://auth.example.com/oauth/token\', {\n    method: \'POST\',\n    headers: { \'Content-Type\': \'application/x-www-form-urlencoded\' },\n    body: new URLSearchParams({\n      grant_type: \'client_credentials\',\n      client_id: process.env.CLIENT_ID,\n      client_secret: process.env.CLIENT_SECRET,\n      scope: \'read:reports write:data\',\n    }),\n  });\n  const { access_token, expires_in } = await response.json();\n  return access_token;\n}',

    tokensTitle: '访问令牌 vs 刷新令牌 vs ID 令牌',
    accessTokenDesc: '访问令牌是持有者凭证——持有它的任何人都可以使用它。它们通常短期有效（15 分钟到 1 小时），以限制被盗的损失。客户端通过 Authorization: Bearer 头在每个 API 请求中包含访问令牌。访问令牌可以是不透明字符串（资源服务器通过调用 introspection 端点来验证）或自包含的 JWT（资源服务器使用公钥在本地验证）。',
    refreshTokenDesc: '刷新令牌是长期凭证（1 天到 1 年，或永不过期），客户端用它在当前访问令牌过期时获取新的访问令牌。与访问令牌不同，刷新令牌只发送给授权服务器，永远不发送给资源服务器。它们必须安全存储。刷新令牌轮换（每次使用刷新令牌时颁发新的）可防止被盗的刷新令牌被无限期使用。',
    idTokenDesc: 'ID 令牌是 OpenID Connect 提供商颁发的 JWT。它们包含关于已认证用户的身份声明（sub、name、email、picture 等）。ID 令牌供客户端应用读取——不应发送给资源服务器。要认证 API 请求，使用访问令牌。ID 令牌回答"这个用户是谁？"，而访问令牌回答"这个应用可以做什么？"',
    tokenLifecycleTitle: '令牌生命周期与刷新',
    tokenLifecycleCode: '// 带轮换的令牌刷新 — Express.js 后端\n// 见英文版完整代码',

    jwtTitle: 'JWT 结构与验证',
    jwtDesc1: 'JSON Web Token（JWT，RFC 7519）是 OAuth 2.0 访问令牌和 OIDC ID 令牌最常见的格式。JWT 由三个 Base64URL 编码的部分组成，用点分隔：Header.Payload.Signature。',
    jwtHeaderDesc: 'Header 指定签名算法（alg）和令牌类型（typ）。常见算法有 HS256（HMAC-SHA256，对称——签名和验证使用同一密钥）和 RS256（RSA-SHA256，非对称——私钥签名，公钥验证）。对于分布式系统，RS256 更优，因为资源服务器可以使用公钥验证令牌，无需私钥。',
    jwtPayloadDesc: 'Payload 包含声明——关于用户和令牌的陈述。注册声明包括 iss（颁发者）、sub（主题/用户 ID）、aud（受众）、exp（过期时间）、iat（颁发时间）和 jti（用于撤销的 JWT ID）。公共和私有声明携带应用特定数据如 role、email 和 scope。Payload 是 Base64URL 编码的，而非加密——永远不要在 JWT Payload 中放置密码等敏感数据。',
    jwtSigDesc: '签名计算方式为：对 Base64URL(Header) + "." + Base64URL(Payload) 使用 header 中指定的算法和密钥进行签名。验证签名可证明令牌由受信任方颁发且未被篡改。',
    jwtVerifyTitle: 'JWT 验证清单',
    jwtVerify1: '使用正确的算法和密钥验证签名（从 JWKS 端点获取当前公钥）',
    jwtVerify2: '检查 exp——拒绝 exp < 当前时间的令牌',
    jwtVerify3: '检查 iss——颁发者必须与你的预期授权服务器 URL 匹配',
    jwtVerify4: '检查 aud——受众必须包含你的 API 标识符',
    jwtVerify5: '检查 nbf——如果存在，令牌在此时间之前不得使用',
    jwtVerify6: '检查 header 中的算法是否与预期算法匹配（防止算法混淆攻击）',
    jwtCode: '// JWT 验证 — Node.js（使用 jose 库，推荐）\n// 见英文版完整代码',

    implTitle: '实现示例：Node.js 和 Python',
    implNodeTitle: 'Node.js：使用 Passport.js 的完整 OAuth 2.0 服务器',
    implNodeCode: '// Node.js / Express — 使用 Passport.js 的 OAuth 2.0\n// 见英文版完整代码',
    implPythonTitle: 'Python：FastAPI + OAuth 2.0（GitHub）',
    implPythonCode: '# Python FastAPI — GitHub OAuth 2.0\n# 见英文版完整代码',

    securityTitle: 'OAuth 2.0 安全最佳实践',
    securityPkceTitle: '对公共客户端始终使用 PKCE',
    securityPkceDesc: '任何无法安全存储 client_secret 的客户端都必须使用 PKCE。这包括所有基于浏览器的应用和所有移动/桌面应用。PKCE 防止授权码拦截攻击，即攻击者拦截回调 URL 并窃取授权码。没有 PKCE，被盗的授权码可以被换取令牌。',
    securityStateTitle: '验证 state 参数',
    securityStateDesc: 'state 参数是 OAuth 流程中的主要 CSRF 防御手段。在重定向前生成密码学随机值并存储在 session 中，回调到来时验证它完全匹配。拒绝任何 state 缺失或不匹配的回调。不验证 state 会使用户暴露于 CSRF 攻击，攻击者可以将自己的 OAuth 码与受害者账户关联。',
    securityStorageTitle: '令牌存储策略',
    securityStorageDesc: '对于服务端应用，将令牌存储在服务端 session（Redis 支持）中，永远不要存在客户端。对于 SPA，访问令牌使用内存存储，刷新令牌使用 httpOnly Cookie。永远不要将令牌存储在 localStorage——XSS 攻击可以窃取它们。',
    securityTokenExpTitle: '短期访问令牌 + 刷新令牌轮换',
    securityTokenExpDesc: '将访问令牌设置为 15-60 分钟过期。使用刷新令牌轮换，每次刷新请求都颁发新的刷新令牌并使之前的令牌失效。如果刷新令牌被使用两次（被窃取的令牌被攻击者使用），服务器检测到重用并使整个令牌族失效，保护用户。',
    securityRedirectTitle: '严格的重定向 URI 验证',
    securityRedirectDesc: '在授权服务器注册精确的重定向 URI（不是通配符模式）。服务器应拒绝任何 redirect_uri 与注册 URI 不完全匹配的授权请求。redirect_uri 中的开放重定向漏洞允许攻击者拦截授权码。永远不允许包含用户提供数据的 redirect_uri 值。',
    securityCode: '// 安全检查清单实现\n// 见英文版完整代码',

    socialTitle: '社交登录：Google、GitHub 和 Facebook OAuth',
    socialDesc: '社交登录（使用 Google/GitHub/Facebook 登录）在底层使用 OAuth 2.0。每个提供商的作用域、端点和令牌行为略有不同。以下是三个最流行提供商的对比。',
    socialGoogleTitle: 'Google OAuth 2.0 / OIDC',
    socialGoogleDesc: 'Google 同时实现了 OAuth 2.0 和 OpenID Connect。授权端点为 https://accounts.google.com/o/oauth2/v2/auth。使用 openid 作用域获取 ID 令牌，email 获取用户邮件，profile 获取姓名和头像。Google 的令牌可以通过 https://www.googleapis.com/oauth2/v3/certs 的公钥进行验证。',
    socialGithubTitle: 'GitHub OAuth 2.0',
    socialGithubDesc: 'GitHub 使用经典 OAuth 2.0（非 OIDC——没有 ID 令牌）。授权端点：https://github.com/login/oauth/authorize。令牌端点：https://github.com/login/oauth/access_token。使用 read:user 和 user:email 作用域获取用户配置文件和邮件。除非撤销，GitHub 访问令牌不会过期，因此必须明确处理令牌撤销。',
    socialFacebookTitle: 'Facebook OAuth 2.0',
    socialFacebookDesc: 'Facebook Graph API 使用 OAuth 2.0。授权端点：https://www.facebook.com/v18.0/dialog/oauth。请求权限（作用域）如 email 和 public_profile。Facebook 访问令牌可以是短期的（1-2 小时），可选择使用 client secret 换取长期令牌（60 天）。使用带访问令牌的 /me 端点获取用户数据。',
    socialCode: '// 统一社交登录处理器\n// 见英文版完整代码',

    oidcTitle: 'OpenID Connect（OIDC）详解',
    oidcDesc1: 'OpenID Connect 是直接构建在 OAuth 2.0 之上的身份层。它添加了一种标准化的方式来认证用户并获取其配置文件信息。OAuth 2.0 回答"这个应用能访问此资源吗？"，而 OIDC 回答"这个用户是谁？"',
    oidcDesc2: 'OIDC 在 OAuth 2.0 基础上引入了三个关键补充：ID 令牌（包含用户身份声明的 JWT）、UserInfo 端点（用于获取超出 ID 令牌容量的额外声明）和标准化的发现文档（.well-known/openid-configuration，描述提供商的端点和功能）。',
    oidcClaimsTitle: '标准 OIDC 声明',
    oidcClaimsDesc: 'OIDC 在 ID 令牌 Payload 中定义了一组标准声明。sub 声明是唯一用户标识符（不要使用 email 作为用户标识符——它可能会变化）。name、given_name 和 family_name 声明提供用户的显示名称。email 和 email_verified 声明给出用户的邮件及其是否已验证。picture 声明是用户头像的 URL。',
    oidcFlowTitle: 'OIDC 授权码流程',
    oidcCode: '// OpenID Connect — 完整实现\n// 见英文版完整代码',

    comparisonTitle: 'OAuth 2.0 vs SAML vs JWT：如何选择？',
    comparisonDesc: '三种协议主导企业身份和 API 安全领域。了解何时使用哪种协议可以省去大量架构上的痛苦。',
    samlDesc: 'SAML 2.0（安全断言标记语言）是一种基于 XML 的协议，专为企业单点登录（SSO）设计。它被企业身份提供商（如 Active Directory 联合服务、Okta 和 OneLogin）广泛支持。SAML 断言比 JWT 更大，基于 XML，通常使用 XML-DSig 签名。当你的客户是拥有现有 Active Directory/LDAP 基础设施的企业，需要支持在企业身份下访问多个服务的 SSO 时，SAML 是正确的选择。',
    jwtCompDesc: 'JWT 本身不是认证协议——它是一种令牌格式。JWT 可以用作 OAuth 2.0 访问令牌、OIDC ID 令牌或独立的无状态 session 令牌。混淆来自于许多系统在没有实现 OAuth 2.0 的情况下使用 JWT 进行认证。对于内部系统这是可以的，但缺少 OAuth 2.0 提供的标准化委托、作用域和令牌撤销功能。',
    oauthCompDesc: 'OAuth 2.0 是 API 授权、第三方集成和构建身份平台（与 OIDC 结合时）的正确选择。它是三者中最灵活的，并受到所有主要身份提供商的支持。',

    vulnTitle: '常见 OAuth 漏洞与防御',
    csrf: 'OAuth 回调中的 CSRF 攻击',
    csrfDesc: '攻击者发起 OAuth 流程，获得有效的授权码，然后诱骗受害者点击带有攻击者授权码的回调 URL。如果使用受害者的 session 来换取令牌，受害者的账户将与攻击者的身份关联。防御：始终验证 state 参数。state 值必须与重定向前存储在用户 session 中的值完全匹配。',
    openRedirect: '通过 redirect_uri 的开放重定向',
    openRedirectDesc: '如果授权服务器不严格验证 redirect_uri，攻击者可以提供恶意 URI，在授权码被重定向到那里时窃取它。防御：注册精确的 URI（不使用通配符），在服务端严格验证，永远不接受包含用户控制数据的 redirect_uri 值。',
    tokenLeakage: '通过 Referrer 泄露授权码/令牌',
    tokenLeakageDesc: '如果回调页面加载第三方资源（分析、广告、字体），URL 中的授权码可能通过 Referrer 头泄露。防御：使用 Referrer-Policy: no-referrer 头，提取后立即处理并从 URL 中删除授权码，使用 PKCE 确保被盗的授权码在没有 code_verifier 的情况下无法被换取。',
    mixedAudience: '混淆代理/受众混淆',
    mixedAudienceDesc: '攻击者诱骗服务接受为不同受众颁发的令牌。例如，使用为应用 A 颁发的 Google ID 令牌向应用 B 认证。防御：始终验证 aud（受众）声明是否与你自己的 API 标识符匹配。永远不要接受没有受众验证的令牌。',
    tokenSub: '令牌替换',
    tokenSubDesc: '攻击者将一个上下文中的令牌换到另一个上下文。例如，如果端点不检查作用域，使用为读取作用域颁发的访问令牌调用写入端点。防御：在每个受保护端点验证作用域，而不仅仅是在网关处。',
    vulnCode: '// 作用域验证中间件\n// 见英文版完整代码',

    faq1q: 'OAuth 2.0 和 OpenID Connect 有什么区别？',
    faq1a: 'OAuth 2.0 是一个授权框架，允许应用代表用户请求对资源的访问权限。它没有定义如何认证用户或交换用户身份信息。OpenID Connect（OIDC）是构建在 OAuth 2.0 之上的轻量级身份层，添加了用户认证功能。OIDC 引入了 ID 令牌（包含 name、email 和头像等身份声明的 JWT）和标准化的 UserInfo 端点。当你只需要资源访问时使用 OAuth 2.0；当你需要知道用户是谁时使用 OIDC。',
    faq2q: '我的 SPA 应该使用隐式流程还是授权码 + PKCE？',
    faq2a: '对于 SPA，始终使用授权码 + PKCE。隐式流程（访问令牌直接在 URL 片段中返回）已被 OAuth 2.0 安全最佳当前实践（RFC 9700）废弃。隐式流程在浏览器历史记录和 Referrer 头中暴露令牌。PKCE 解决了同样的问题（公共客户端不需要 client_secret），但没有安全问题。',
    faq3q: '应该在浏览器中的哪里存储 OAuth 令牌？',
    faq3a: '最安全的方法是将刷新令牌存储在 httpOnly、Secure、SameSite=Strict Cookie 中（JavaScript 无法访问，因此受到 XSS 保护），并将访问令牌只保存在内存中（JavaScript 变量或闭包）。永远不要将刷新令牌存储在 localStorage——你页面上的任何 XSS 漏洞都可以窃取它们。如果使用 Cookie 存储，请使用 SameSite 属性和 CSRF 令牌实现 CSRF 保护。',
    faq4q: '刷新令牌和访问令牌轮换是如何工作的？',
    faq4a: '访问令牌是短期的（15 分钟到 1 小时）。当它们过期时，客户端使用其刷新令牌向授权服务器请求新的访问令牌。通过刷新令牌轮换，每次刷新请求都颁发新的刷新令牌并使之前的令牌失效。如果被盗的刷新令牌在合法用户已经使用后再次被使用，服务器检测到重用（旧令牌已失效）并撤销整个令牌族，强制重新认证。这限制了被盗刷新令牌的损害窗口。',
    faq5q: 'PKCE 是什么，为什么它是必要的？',
    faq5a: 'PKCE（Proof Key for Code Exchange）是一个扩展，可以防止无法安全存储 client_secret 的公共客户端（SPA、移动应用）遭受授权码拦截攻击。客户端生成随机的 code_verifier，将其哈希为 code_challenge，并在授权请求中发送 challenge。换取令牌时，客户端发送原始的 verifier。服务器对其哈希并检查是否与存储的 challenge 匹配。拦截授权码的攻击者无法在没有原始 code_verifier 的情况下换取令牌。',
    faq6q: 'OAuth 2.0 作用域和角色有什么区别？',
    faq6a: 'OAuth 2.0 中的作用域代表客户端应用代表用户请求的权限（如 read:contacts、write:calendar）。它们是粗粒度的，由资源服务器定义。角色（RBAC——基于角色的访问控制）通常是用户级属性（admin、editor、viewer），决定用户在系统中可以做什么。两者通常一起使用：OAuth 作用域限制应用可以做什么，而角色（作为访问令牌中的声明嵌入）决定用户在这些作用域内被允许做什么。',
    faq7q: '如何撤销 OAuth 访问令牌？',
    faq7a: '对于 JWT 访问令牌，真正的撤销很困难，因为它们是自包含的，在过期前有效。常见方法包括：维护在每次请求时检查的令牌撤销列表（使用 Redis 可以快速实现）、使用短期访问令牌（15 分钟）使被盗令牌快速过期，以及为刷新令牌调用授权服务器的撤销端点（RFC 7009）。对于不透明令牌，在每次请求时调用 introspection 端点——授权服务器跟踪活跃令牌，对已撤销的令牌返回 active: false。',
    faq8q: 'OAuth 2.0 能替代传统的用户名/密码登录吗？',
    faq8a: 'OAuth 2.0 + OpenID Connect 可以完全替代传统登录。用户通过受信任的身份提供商（Google、GitHub、你自己的 OIDC 服务器）进行认证，你的应用接收经过验证的身份声明。你永远不需要存储密码。这提高了安全性（没有密码数据库可供攻击）和用户体验（没有注册表单）。但是，你增加了对身份提供商的依赖。为了最大弹性，同时支持社交登录和本地密码选项，或使用同时处理两者的身份服务如 Auth0 或 Supabase Auth。',

    tryTools: '试试我们的相关安全工具',
  },
};

export default function OauthGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    padding: '16px 20px',
    overflowX: 'auto',
    fontSize: 13,
    lineHeight: 1.8,
  };
  const thStyle: React.CSSProperties = {
    background: 'var(--bg-input)',
    border: '1px solid var(--border-color)',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: 700,
  };
  const tdStyle: React.CSSProperties = {
    border: '1px solid var(--border-color)',
    padding: '10px 14px',
    fontSize: 13,
  };
  const h2Style: React.CSSProperties = {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 40,
    marginBottom: 16,
    color: 'var(--text-primary)',
  };
  const h3Style: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 12,
    color: '#3b82f6',
  };
  const pStyle: React.CSSProperties = {
    lineHeight: 1.8,
    color: 'var(--text-secondary)',
    marginBottom: 16,
  };

  const enCt = translations['en'];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 6 }}>TL;DR</strong>
        <p style={{ margin: 0, lineHeight: 1.7, color: '#0c4a6e', fontSize: 15 }}>{ct.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ display: 'block', marginBottom: 12, fontSize: 16 }}>{ct.keyTakeaways}</strong>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: 'var(--text-secondary)', fontSize: 14 }}>
          <li>{ct.kt1}</li>
          <li>{ct.kt2}</li>
          <li>{ct.kt3}</li>
          <li>{ct.kt4}</li>
          <li>{ct.kt5}</li>
          <li>{ct.kt6}</li>
        </ul>
      </div>

      {/* Section 1: What is OAuth 2.0 */}
      <h2 style={h2Style}>{ct.whatIsTitle}</h2>
      <p style={pStyle}>{ct.whatIsDesc1}</p>
      <p style={pStyle}>{ct.whatIsDesc2}</p>
      <p style={pStyle}>{ct.whatIsDesc3}</p>
      <p style={pStyle}>{ct.whatIsDesc4}</p>

      {/* Section 2: Versions Comparison */}
      <h2 style={h2Style}>{ct.versionsTitle}</h2>
      <p style={pStyle}>{ct.versionsDesc1}</p>
      <p style={pStyle}>{ct.versionsDesc2}</p>
      <p style={pStyle}>{ct.versionsDesc3}</p>
      <h3 style={h3Style}>{ct.versionsCompareTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Protocol</th>
              <th style={thStyle}>Purpose</th>
              <th style={thStyle}>Token Format</th>
              <th style={thStyle}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['OAuth 1.0', 'Authorization', 'Opaque', 'Legacy systems requiring request signing'],
              ['OAuth 2.0', 'Authorization', 'Opaque or JWT', 'API access delegation, modern apps'],
              ['OpenID Connect', 'Authentication + Authorization', 'JWT (ID token)', 'User identity + API access'],
              ['SAML 2.0', 'Authentication + Authorization', 'XML Assertion', 'Enterprise SSO with Active Directory'],
            ].map(([proto, purpose, format, useCase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{proto}</td>
                <td style={tdStyle}>{purpose}</td>
                <td style={tdStyle}>{format}</td>
                <td style={tdStyle}>{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 3: Key Concepts */}
      <h2 style={h2Style}>{ct.conceptsTitle}</h2>
      <h3 style={h3Style}>{ct.conceptsRolesTitle}</h3>
      <p style={pStyle}>{ct.conceptsRolesDesc}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Resource Owner', desc: 'The user who owns the data and grants access', color: '#3b82f6' },
          { title: 'Client', desc: 'The application requesting access to the resource', color: '#8b5cf6' },
          { title: 'Authorization Server', desc: 'Issues tokens after authenticating the user', color: '#f59e0b' },
          { title: 'Resource Server', desc: 'Hosts protected resources, validates tokens', color: '#22c55e' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '3px solid ' + item.color }}>
            <strong style={{ color: item.color, display: 'block', marginBottom: 6 }}>{item.title}</strong>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.conceptsScopesTitle}</h3>
      <p style={pStyle}>{ct.conceptsScopesDesc}</p>
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13 }}>
        {'scope=openid email profile read:user repo write:calendar'}
      </div>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.conceptsTokensTitle}</h3>
      <p style={pStyle}>{ct.conceptsTokensDesc}</p>

      {/* Section 4: Grant Types */}
      <h2 style={h2Style}>{ct.grantTypesTitle}</h2>
      <p style={pStyle}>{ct.grantTypesDesc}</p>

      <h3 style={h3Style}>{ct.authCodeTitle}</h3>
      <p style={pStyle}>{ct.authCodeDesc}</p>
      <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {ct.authCodeWhen}
      </div>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.implicitTitle}</h3>
      <p style={pStyle}>{ct.implicitDesc}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.clientCredTitle}</h3>
      <p style={pStyle}>{ct.clientCredDesc}</p>
      <pre style={codeStyle}><code>{enCt.clientCredCode}</code></pre>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.deviceFlowTitle}</h3>
      <p style={pStyle}>{ct.deviceFlowDesc}</p>

      <h3 style={{ ...h3Style, color: '#06b6d4' }}>{ct.pkceTitle}</h3>
      <p style={pStyle}>{ct.pkceDesc}</p>
      <div style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #06b6d4', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
        {ct.pkceWhen}
      </div>
      <pre style={codeStyle}><code>{enCt.grantTypesCode}</code></pre>

      {/* Grant type summary table */}
      <div style={{ overflowX: 'auto', marginBottom: 24, marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Grant Type</th>
              <th style={thStyle}>Client Type</th>
              <th style={thStyle}>User Interaction</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Authorization Code + PKCE', 'SPA, Mobile, Server', 'Yes', 'Recommended'],
              ['Authorization Code', 'Server-side', 'Yes', 'Recommended'],
              ['Client Credentials', 'Backend service', 'No (M2M)', 'Recommended'],
              ['Device Flow', 'TV, CLI, IoT', 'Yes (on other device)', 'Supported'],
              ['Implicit', 'Browser (legacy)', 'Yes', 'Deprecated'],
              ['Password (ROPC)', 'Trusted 1st-party', 'Yes (credentials)', 'Deprecated'],
            ].map(([grant, client, interaction, status], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{grant}</td>
                <td style={tdStyle}>{client}</td>
                <td style={tdStyle}>{interaction}</td>
                <td style={{
                  ...tdStyle,
                  color: status === 'Recommended' ? '#22c55e' : status === 'Deprecated' ? '#ef4444' : 'var(--text-secondary)',
                  fontWeight: 600,
                }}>{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 5: Token Types */}
      <h2 style={h2Style}>{ct.tokensTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Access Token', desc: ct.accessTokenDesc, color: '#3b82f6' },
          { title: 'Refresh Token', desc: ct.refreshTokenDesc, color: '#8b5cf6' },
          { title: 'ID Token (OIDC)', desc: ct.idTokenDesc, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid ' + item.color }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <h3 style={h3Style}>{ct.tokenLifecycleTitle}</h3>
      <pre style={codeStyle}><code>{enCt.tokenLifecycleCode}</code></pre>

      {/* Section 6: JWT Structure */}
      <h2 style={h2Style}>{ct.jwtTitle}</h2>
      <p style={pStyle}>{ct.jwtDesc1}</p>
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, color: '#ef4444' }}>Header</th>
              <th style={{ ...thStyle, color: '#f59e0b' }}>Payload</th>
              <th style={{ ...thStyle, color: '#22c55e' }}>Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{'{"alg":"RS256","typ":"JWT"}'}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{'{"sub":"1234","email":"user@example.com","exp":1735689600}'}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: 12 }}>{'RSASHA256(base64url(header)+"."+base64url(payload), privateKey)'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={pStyle}>{ct.jwtHeaderDesc}</p>
      <p style={pStyle}>{ct.jwtPayloadDesc}</p>
      <p style={pStyle}>{ct.jwtSigDesc}</p>
      <h3 style={h3Style}>{ct.jwtVerifyTitle}</h3>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 16 }}>
        <li>{ct.jwtVerify1}</li>
        <li>{ct.jwtVerify2}</li>
        <li>{ct.jwtVerify3}</li>
        <li>{ct.jwtVerify4}</li>
        <li>{ct.jwtVerify5}</li>
        <li>{ct.jwtVerify6}</li>
      </ul>
      <pre style={codeStyle}><code>{enCt.jwtCode}</code></pre>

      {/* Section 7: Implementation Examples */}
      <h2 style={h2Style}>{ct.implTitle}</h2>
      <h3 style={h3Style}>{ct.implNodeTitle}</h3>
      <pre style={codeStyle}><code>{enCt.implNodeCode}</code></pre>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.implPythonTitle}</h3>
      <pre style={codeStyle}><code>{enCt.implPythonCode}</code></pre>

      {/* Section 8: Security Best Practices */}
      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.securityPkceTitle, desc: ct.securityPkceDesc, color: '#3b82f6' },
          { title: ct.securityStateTitle, desc: ct.securityStateDesc, color: '#f59e0b' },
          { title: ct.securityStorageTitle, desc: ct.securityStorageDesc, color: '#8b5cf6' },
          { title: ct.securityTokenExpTitle, desc: ct.securityTokenExpDesc, color: '#22c55e' },
          { title: ct.securityRedirectTitle, desc: ct.securityRedirectDesc, color: '#ef4444' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid ' + item.color }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{enCt.securityCode}</code></pre>

      {/* Section 9: Social Login */}
      <h2 style={h2Style}>{ct.socialTitle}</h2>
      <p style={pStyle}>{ct.socialDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { title: ct.socialGoogleTitle, desc: ct.socialGoogleDesc, color: '#ef4444', badge: 'OAuth 2.0 + OIDC' },
          { title: ct.socialGithubTitle, desc: ct.socialGithubDesc, color: '#1f2937', badge: 'OAuth 2.0 only' },
          { title: ct.socialFacebookTitle, desc: ct.socialFacebookDesc, color: '#3b82f6', badge: 'OAuth 2.0' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <strong style={{ color: item.color }}>{item.title}</strong>
              <span style={{ fontSize: 11, background: item.color, color: '#fff', padding: '2px 8px', borderRadius: 999 }}>{item.badge}</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{enCt.socialCode}</code></pre>

      {/* Section 10: OIDC */}
      <h2 style={h2Style}>{ct.oidcTitle}</h2>
      <p style={pStyle}>{ct.oidcDesc1}</p>
      <p style={pStyle}>{ct.oidcDesc2}</p>
      <h3 style={h3Style}>{ct.oidcClaimsTitle}</h3>
      <p style={pStyle}>{ct.oidcClaimsDesc}</p>
      <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8 }}>
        {'{\n  "sub": "10769150350006150715113082367",\n  "iss": "https://accounts.google.com",\n  "aud": "your-client-id.apps.googleusercontent.com",\n  "exp": 1735689600,\n  "iat": 1735686000,\n  "email": "alice@example.com",\n  "email_verified": true,\n  "name": "Alice Smith",\n  "picture": "https://lh3.googleusercontent.com/...",\n  "nonce": "abc123"\n}'}
      </div>
      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.oidcFlowTitle}</h3>
      <pre style={codeStyle}><code>{enCt.oidcCode}</code></pre>

      {/* Section 11: Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Protocol</th>
              <th style={thStyle}>Token Format</th>
              <th style={thStyle}>Complexity</th>
              <th style={thStyle}>Identity</th>
              <th style={thStyle}>Best For</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['OAuth 2.0', 'Opaque / JWT', 'Medium', 'No', 'API authorization, 3rd-party access'],
              ['OAuth 2.0 + OIDC', 'JWT (ID token)', 'Medium', 'Yes', 'Social login, modern SSO'],
              ['SAML 2.0', 'XML Assertion', 'High', 'Yes', 'Enterprise SSO, Active Directory'],
              ['JWT (standalone)', 'JWT', 'Low', 'Optional', 'Stateless sessions, microservices'],
            ].map(([proto, format, complexity, identity, useCase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{proto}</td>
                <td style={tdStyle}>{format}</td>
                <td style={tdStyle}>{complexity}</td>
                <td style={{ ...tdStyle, color: identity === 'Yes' ? '#22c55e' : identity === 'No' ? '#ef4444' : 'var(--text-secondary)' }}>{identity}</td>
                <td style={tdStyle}>{useCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'SAML 2.0', desc: ct.samlDesc, color: '#8b5cf6' },
          { title: 'JWT (standalone)', desc: ct.jwtCompDesc, color: '#f59e0b' },
          { title: 'OAuth 2.0', desc: ct.oauthCompDesc, color: '#3b82f6' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid ' + item.color }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Section 12: Vulnerabilities */}
      <h2 style={h2Style}>{ct.vulnTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { title: ct.csrf, desc: ct.csrfDesc, color: '#ef4444' },
          { title: ct.openRedirect, desc: ct.openRedirectDesc, color: '#f59e0b' },
          { title: ct.tokenLeakage, desc: ct.tokenLeakageDesc, color: '#8b5cf6' },
          { title: ct.mixedAudience, desc: ct.mixedAudienceDesc, color: '#06b6d4' },
          { title: ct.tokenSub, desc: ct.tokenSubDesc, color: '#ec4899' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid ' + item.color }}>
            <strong style={{ color: item.color, display: 'block', marginBottom: 6 }}>{item.title}</strong>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <pre style={codeStyle}><code>{enCt.vulnCode}</code></pre>

      {/* Related Tools CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={'/' + lang + '/tools/jwt-decoder'} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JWT Decoder →
          </Link>
          <Link href={'/' + lang + '/tools/hash-generator'} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Hash Generator →
          </Link>
          <Link href={'/' + lang + '/tools/base64'} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Base64 Encoder →
          </Link>
          <Link href={'/' + lang + '/tools/url-encoder'} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            URL Encoder →
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
