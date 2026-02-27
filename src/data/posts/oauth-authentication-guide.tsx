'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OAuth 2.0 Authentication Guide: From Authorization Flows to Production Security',
    intro: 'OAuth 2.0 is the industry standard protocol for authorization, powering social logins, API integrations, and secure resource sharing across the web. This comprehensive guide walks you through OAuth fundamentals, JWT tokens, OpenID Connect, session management, and production security patterns with practical code examples for Node.js and Next.js applications.',
    tldr: 'OAuth 2.0 delegates authorization without sharing credentials. Use Authorization Code + PKCE for web apps, JWT for stateless APIs, OpenID Connect for identity, and always store tokens in httpOnly cookies. Implement RBAC for permissions and MFA for sensitive operations.',
    s1Title: '1. OAuth 2.0 Fundamentals',
    s1p1: 'OAuth 2.0 is a delegation protocol that allows a third-party application to access user resources on a server without the user sharing their credentials. It defines four roles: Resource Owner (the user), Client (the application), Authorization Server (issues tokens), and Resource Server (hosts protected resources).',
    s1p2: 'OAuth 2.0 supports multiple grant types for different scenarios: Authorization Code (server-side apps), Client Credentials (machine-to-machine), Device Code (smart TVs, CLI tools), and Refresh Token (silent token renewal). The Implicit grant is deprecated in OAuth 2.1 in favor of Authorization Code with PKCE.',
    s1p3: 'Key terminology: access_token grants resource access (short-lived, 5-60 minutes), refresh_token obtains new access tokens (long-lived, days to months), scope limits what the token can do (read:user, write:repos), and state prevents CSRF attacks during the authorization flow.',
    s2Title: '2. Authorization Code Flow with PKCE',
    s2p1: 'The Authorization Code flow is the most secure OAuth grant for web and mobile applications. The client redirects the user to the authorization server, receives an authorization code via callback, then exchanges it for tokens via a secure back-channel request. The access token never touches the browser.',
    s2p2: 'PKCE (Proof Key for Code Exchange) adds protection against authorization code interception. The client generates a random code_verifier, derives a code_challenge via SHA-256, sends the challenge in the auth request, and proves possession of the verifier during token exchange. PKCE is now required for all public clients and recommended for confidential clients.',
    s2p3: 'The state parameter is a random string that prevents CSRF attacks. The client generates a unique state value, includes it in the authorization request, and verifies it matches when the callback is received. Always validate state before exchanging the authorization code.',
    s3Title: '3. JWT Deep Dive',
    s3p1: 'JSON Web Tokens (JWT) are compact, URL-safe tokens consisting of three Base64URL-encoded parts separated by dots: Header (algorithm and type), Payload (claims), and Signature (integrity proof). JWTs enable stateless authentication — the server verifies the signature without a database lookup.',
    s3p2: 'Standard claims include: iss (issuer), sub (subject/user ID), aud (audience), exp (expiration), iat (issued at), nbf (not before), and jti (unique token ID). Custom claims like role, permissions, and email can be added but keep payloads small since they are sent with every request.',
    s3p3: 'Always validate JWT tokens thoroughly: verify the signature algorithm matches expectations (prevent algorithm confusion attacks), check exp and nbf timestamps, validate iss and aud claims, and reject tokens with unexpected or missing claims. Use asymmetric keys (RS256/ES256) for distributed systems.',
    s4Title: '4. OpenID Connect (OIDC)',
    s4p1: 'OpenID Connect is an identity layer built on top of OAuth 2.0. While OAuth handles authorization (what can you access), OIDC handles authentication (who are you). It introduces the ID Token — a JWT containing user identity claims — and standardizes the UserInfo endpoint for retrieving profile data.',
    s4p2: 'OIDC defines standard scopes: openid (required, returns sub claim), profile (name, picture, locale), email (email, email_verified), address, and phone. The ID token is always a JWT and must be validated by the client. The access token is used to call the UserInfo endpoint for additional claims.',
    s4p3: 'OIDC Discovery allows clients to automatically configure endpoints by fetching /.well-known/openid-configuration from the provider. This returns the authorization endpoint, token endpoint, UserInfo endpoint, supported scopes, and JWKS URI for token verification.',
    s5Title: '5. Session Management',
    s5p1: 'Cookie-based sessions store a session ID in an httpOnly cookie. The server maintains session state in a store (Redis, database). Cookies are sent automatically by the browser, making them ideal for traditional web apps. Set secure, httpOnly, sameSite=lax, and appropriate maxAge for session cookies.',
    s5p2: 'Token-based sessions store JWT access tokens client-side. The client includes the token in Authorization headers. This approach is stateless and works well for SPAs and mobile apps. Store tokens in httpOnly cookies (not localStorage) to prevent XSS token theft.',
    s5p3: 'Refresh token rotation issues a new refresh token with each use and invalidates the old one. If a refresh token is used twice, it indicates theft — revoke all tokens for that user. Set refresh tokens with longer expiry (7-30 days) and store them securely server-side or in httpOnly cookies.',
    s6Title: '6. OAuth with Node.js (Passport.js)',
    s6p1: 'Passport.js is the most popular authentication middleware for Node.js with 500+ strategies. It integrates with Express via passport.initialize() and passport.session() middleware. Each strategy handles a specific authentication method (local, OAuth, SAML). Configure strategies with provider credentials and a verify callback.',
    s6p2: 'The verify callback receives the access token, refresh token, and user profile from the OAuth provider. Use it to find or create the user in your database, associate the OAuth account, and return the user object. Passport serializes and deserializes the user for session management.',
    s7Title: '7. OAuth with Next.js (Auth.js)',
    s7p1: 'Auth.js (formerly NextAuth.js) provides a complete authentication solution for Next.js applications. It supports 50+ OAuth providers out of the box, handles session management, CSRF protection, and token rotation automatically. Configuration is centralized in a single auth configuration file.',
    s7p2: 'Auth.js supports multiple session strategies: JWT (default, stateless) and database sessions (via Prisma, Drizzle, or other adapters). Use callbacks to customize the JWT payload, session object, and sign-in behavior. The middleware protects routes at the edge for optimal performance.',
    s8Title: '8. Social Login Integration',
    s8p1: 'Google OAuth requires creating credentials in the Google Cloud Console. Configure the OAuth consent screen with scopes (openid, email, profile), set authorized redirect URIs, and obtain client_id and client_secret. Google returns an ID token with verified email, name, and profile picture.',
    s8p2: 'GitHub OAuth is configured in Settings > Developer Settings > OAuth Apps. GitHub provides user profile, email, and repository access via scopes (read:user, user:email, repo). Apple Sign In requires an Apple Developer account and provides minimal user data (email, name) — the name is only sent on first login, so store it immediately.',
    s9Title: '9. Role-Based Access Control (RBAC)',
    s9p1: 'RBAC assigns permissions to roles, then assigns roles to users. Common roles include admin, editor, viewer, and custom roles. Define permissions as granular actions: users:read, users:write, posts:delete. Store roles in the database and include the role in JWT claims for stateless authorization checks.',
    s9p2: 'Implement authorization middleware that extracts the user role from the JWT, looks up the role permissions, and checks if the required permission is granted. Use a hierarchical permission model where admin inherits all editor permissions, and editor inherits all viewer permissions.',
    s10Title: '10. Token Security',
    s10p1: 'Never store tokens in localStorage or sessionStorage — they are accessible to any JavaScript on the page, making them vulnerable to XSS attacks. Instead, store access tokens in httpOnly cookies with secure and sameSite flags. For SPAs, use the Backend-for-Frontend (BFF) pattern where the server handles token storage.',
    s10p2: 'Implement CSRF protection for cookie-based tokens using the SameSite cookie attribute (lax or strict), custom request headers (X-Requested-With), and synchronizer token pattern. For APIs, use short-lived access tokens (5-15 minutes) and rotate refresh tokens on each use.',
    s11Title: '11. Multi-Factor Authentication (MFA)',
    s11p1: 'TOTP (Time-based One-Time Password) generates 6-digit codes using a shared secret and current timestamp. The server generates a secret, the user scans a QR code with an authenticator app (Google Authenticator, Authy), and enters codes during login. Always provide backup codes in case the user loses their device.',
    s11p2: 'WebAuthn (FIDO2) enables passwordless authentication using hardware security keys (YubiKey) or platform authenticators (Touch ID, Windows Hello). It uses public-key cryptography — the private key never leaves the device. WebAuthn is phishing-resistant because the browser verifies the origin before signing the challenge.',
    s12Title: '12. API Authentication Patterns',
    s12p1: 'API keys identify the calling application, not the user. Use them for server-to-server communication, rate limiting, and usage tracking. Send keys in the X-API-Key header (never in query parameters). Implement key rotation, per-key rate limits, and scope restrictions.',
    s12p2: 'OAuth scopes limit what an access token can do. Define granular scopes (read:users, write:posts, admin:settings) and validate them in middleware. Use rate limiting per client/user with token bucket or sliding window algorithms. Return standard 429 responses with Retry-After headers.',
    s13Title: '13. Security Best Practices',
    s13p1: 'Follow OWASP guidelines: validate all redirect URIs against a whitelist (prevent open redirect attacks), use exact string matching for redirect URIs (no wildcards), enforce HTTPS everywhere, implement proper token revocation, and log all authentication events for audit trails.',
    s13p2: 'Common vulnerabilities to prevent: authorization code injection (use PKCE), token leakage via referrer headers (use fragment-based redirects), insufficient redirect URI validation (use exact match), cross-site request forgery (use state parameter), and insecure token storage (use httpOnly cookies).',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between OAuth 2.0 and OpenID Connect?',
    faq1a: 'OAuth 2.0 is an authorization framework that grants access to resources. OpenID Connect is an identity layer on top of OAuth 2.0 that adds authentication — verifying who the user is. OAuth answers "what can you access" while OIDC answers "who are you" by providing ID tokens with user identity claims.',
    faq2q: 'Should I use JWT or session cookies for authentication?',
    faq2a: 'Use session cookies for traditional server-rendered web apps where you control the server. Use JWTs for stateless APIs, microservices, and mobile apps. For SPAs, consider the BFF pattern — store JWTs in httpOnly cookies on a backend proxy to get the security benefits of cookies with the flexibility of JWTs.',
    faq3q: 'Is the Implicit grant type still safe to use?',
    faq3a: 'No. The Implicit grant is deprecated in OAuth 2.1 because it exposes access tokens in the URL fragment, making them vulnerable to browser history attacks and referrer leakage. Use Authorization Code flow with PKCE instead, which is secure for both public and confidential clients.',
    faq4q: 'How should I store OAuth tokens in a browser application?',
    faq4a: 'Never store tokens in localStorage or sessionStorage as they are vulnerable to XSS attacks. Store them in httpOnly, secure, sameSite cookies. For SPAs, use the Backend-for-Frontend pattern where the server manages tokens and sets secure cookies for the browser.',
    faq5q: 'What is PKCE and do I need it?',
    faq5a: 'PKCE (Proof Key for Code Exchange) prevents authorization code interception attacks. The client creates a random verifier, sends a SHA-256 hash as a challenge during authorization, and proves possession of the verifier during token exchange. Yes, you need it — PKCE is required for all public clients and recommended for all OAuth flows.',
    faq6q: 'How do I implement token refresh without logging out the user?',
    faq6a: 'Use a refresh token stored in an httpOnly cookie. When the access token expires (typically after 5-15 minutes), the client or backend proxy sends the refresh token to the token endpoint to get a new access token. Implement silent refresh with an interceptor that retries failed requests after refreshing the token.',
    faq7q: 'What scopes should I request for social login?',
    faq7a: 'Request the minimum scopes needed. For social login, typically openid, email, and profile are sufficient. For Google, these provide verified email, name, and avatar. For GitHub, use read:user and user:email. Avoid requesting write scopes unless your app genuinely needs them — users are more likely to approve minimal scope requests.',
    faq8q: 'How do I protect against CSRF attacks with OAuth?',
    faq8a: 'Use the state parameter in all OAuth authorization requests. Generate a cryptographically random string, store it in the session, include it in the auth request, and verify it matches when the callback is received. Additionally, set SameSite=lax or strict on session cookies and validate the Origin header on token exchange requests.',
  },
  zh: {
    title: 'OAuth 2.0 认证完全指南：从授权流程到生产安全',
    intro: 'OAuth 2.0 是行业标准的授权协议，支撑着社交登录、API 集成和跨网络的安全资源共享。本综合指南将带你了解 OAuth 基础知识、JWT 令牌、OpenID Connect、会话管理以及生产安全模式，并提供 Node.js 和 Next.js 应用的实用代码示例。',
    tldr: 'OAuth 2.0 在不共享凭据的情况下委托授权。Web 应用使用授权码 + PKCE，API 使用 JWT 无状态认证，身份验证使用 OpenID Connect，始终将令牌存储在 httpOnly cookie 中。使用 RBAC 管理权限，敏感操作启用 MFA。',
    s1Title: '1. OAuth 2.0 基础知识',
    s1p1: 'OAuth 2.0 是一个委托协议，允许第三方应用在不共享用户凭据的情况下访问服务器上的用户资源。它定义了四个角色：资源所有者（用户）、客户端（应用程序）、授权服务器（签发令牌）和资源服务器（托管受保护的资源）。',
    s1p2: 'OAuth 2.0 支持多种授权类型：授权码（服务端应用）、客户端凭据（机器对机器）、设备码（智能电视、CLI 工具）和刷新令牌（静默令牌续期）。隐式授权在 OAuth 2.1 中已被弃用，改为使用带 PKCE 的授权码流程。',
    s1p3: '关键术语：access_token 授予资源访问权限（短期，5-60 分钟），refresh_token 获取新的访问令牌（长期，数天到数月），scope 限制令牌的操作范围（read:user、write:repos），state 防止授权流程中的 CSRF 攻击。',
    s2Title: '2. 带 PKCE 的授权码流程',
    s2p1: '授权码流程是 Web 和移动应用最安全的 OAuth 授权方式。客户端将用户重定向到授权服务器，通过回调接收授权码，然后通过安全的后端通道请求交换令牌。访问令牌永远不会出现在浏览器中。',
    s2p2: 'PKCE（代码交换证明密钥）增加了对授权码拦截的保护。客户端生成随机 code_verifier，通过 SHA-256 派生 code_challenge，在授权请求中发送 challenge，并在令牌交换时证明拥有 verifier。PKCE 现在是所有公共客户端的必须项，也推荐用于机密客户端。',
    s2p3: 'state 参数是防止 CSRF 攻击的随机字符串。客户端生成唯一的 state 值，将其包含在授权请求中，并在收到回调时验证其是否匹配。在交换授权码之前始终验证 state。',
    s3Title: '3. JWT 深度解析',
    s3p1: 'JSON Web Token（JWT）是紧凑的、URL 安全的令牌，由三个 Base64URL 编码部分组成，用点号分隔：头部（算法和类型）、载荷（声明）和签名（完整性证明）。JWT 实现无状态认证——服务器无需数据库查询即可验证签名。',
    s3p2: '标准声明包括：iss（签发者）、sub（主体/用户 ID）、aud（受众）、exp（过期时间）、iat（签发时间）、nbf（生效时间）和 jti（唯一令牌 ID）。可以添加 role、permissions 和 email 等自定义声明，但保持载荷精简，因为每个请求都会发送它。',
    s3p3: '始终彻底验证 JWT 令牌：验证签名算法是否符合预期（防止算法混淆攻击），检查 exp 和 nbf 时间戳，验证 iss 和 aud 声明，拒绝具有意外或缺失声明的令牌。分布式系统使用非对称密钥（RS256/ES256）。',
    s4Title: '4. OpenID Connect (OIDC)',
    s4p1: 'OpenID Connect 是构建在 OAuth 2.0 之上的身份层。OAuth 处理授权（你能访问什么），OIDC 处理认证（你是谁）。它引入了 ID Token——包含用户身份声明的 JWT——并标准化了用于获取用户资料数据的 UserInfo 端点。',
    s4p2: 'OIDC 定义了标准 scope：openid（必需，返回 sub 声明）、profile（姓名、头像、地区）、email（邮箱、邮箱验证状态）、address 和 phone。ID token 始终是 JWT，必须由客户端验证。访问令牌用于调用 UserInfo 端点获取额外声明。',
    s4p3: 'OIDC Discovery 允许客户端通过从提供者获取 /.well-known/openid-configuration 来自动配置端点。它返回授权端点、令牌端点、UserInfo 端点、支持的 scope 和用于令牌验证的 JWKS URI。',
    s5Title: '5. 会话管理',
    s5p1: '基于 Cookie 的会话将会话 ID 存储在 httpOnly cookie 中。服务器在存储（Redis、数据库）中维护会话状态。浏览器自动发送 Cookie，使其非常适合传统 Web 应用。为会话 cookie 设置 secure、httpOnly、sameSite=lax 和适当的 maxAge。',
    s5p2: '基于令牌的会话将 JWT 访问令牌存储在客户端。客户端在 Authorization 头中包含令牌。这种方法是无状态的，适合 SPA 和移动应用。将令牌存储在 httpOnly cookie 中（而非 localStorage）以防止 XSS 令牌窃取。',
    s5p3: '刷新令牌轮换在每次使用时签发新的刷新令牌并使旧令牌失效。如果刷新令牌被使用两次，表明令牌被盗——撤销该用户的所有令牌。设置较长的刷新令牌过期时间（7-30 天），并安全地存储在服务端或 httpOnly cookie 中。',
    s6Title: '6. Node.js 中的 OAuth（Passport.js）',
    s6p1: 'Passport.js 是 Node.js 最流行的认证中间件，拥有 500 多种策略。它通过 passport.initialize() 和 passport.session() 中间件与 Express 集成。每种策略处理特定的认证方式（本地、OAuth、SAML）。使用提供者凭据和验证回调配置策略。',
    s6p2: '验证回调接收来自 OAuth 提供者的访问令牌、刷新令牌和用户资料。用它在数据库中查找或创建用户，关联 OAuth 账户，并返回用户对象。Passport 为会话管理序列化和反序列化用户。',
    s7Title: '7. Next.js 中的 OAuth（Auth.js）',
    s7p1: 'Auth.js（前身为 NextAuth.js）为 Next.js 应用提供完整的认证解决方案。它开箱即用支持 50 多个 OAuth 提供者，自动处理会话管理、CSRF 保护和令牌轮换。配置集中在单个认证配置文件中。',
    s7p2: 'Auth.js 支持多种会话策略：JWT（默认，无状态）和数据库会话（通过 Prisma、Drizzle 或其他适配器）。使用回调自定义 JWT 载荷、会话对象和登录行为。中间件在边缘保护路由以获得最佳性能。',
    s8Title: '8. 社交登录集成',
    s8p1: 'Google OAuth 需要在 Google Cloud Console 中创建凭据。配置 OAuth 同意屏幕的 scope（openid、email、profile），设置授权重定向 URI，获取 client_id 和 client_secret。Google 返回包含已验证邮箱、姓名和头像的 ID token。',
    s8p2: 'GitHub OAuth 在 Settings > Developer Settings > OAuth Apps 中配置。GitHub 通过 scope（read:user、user:email、repo）提供用户资料、邮箱和仓库访问。Apple Sign In 需要 Apple Developer 账户，提供最少的用户数据（邮箱、姓名）——姓名只在首次登录时发送，请立即存储。',
    s9Title: '9. 基于角色的访问控制（RBAC）',
    s9p1: 'RBAC 将权限分配给角色，然后将角色分配给用户。常见角色包括 admin、editor、viewer 和自定义角色。将权限定义为细粒度操作：users:read、users:write、posts:delete。在数据库中存储角色，并在 JWT 声明中包含角色以进行无状态授权检查。',
    s9p2: '实现授权中间件，从 JWT 中提取用户角色，查找角色权限，并检查是否授予了所需权限。使用层级权限模型，admin 继承所有 editor 权限，editor 继承所有 viewer 权限。',
    s10Title: '10. 令牌安全',
    s10p1: '永远不要将令牌存储在 localStorage 或 sessionStorage 中——它们可被页面上的任何 JavaScript 访问，容易受到 XSS 攻击。将访问令牌存储在带有 secure 和 sameSite 标志的 httpOnly cookie 中。对于 SPA，使用 BFF（Backend-for-Frontend）模式，由服务器处理令牌存储。',
    s10p2: '使用 SameSite cookie 属性（lax 或 strict）、自定义请求头（X-Requested-With）和同步令牌模式为基于 cookie 的令牌实现 CSRF 保护。对于 API，使用短期访问令牌（5-15 分钟）并在每次使用时轮换刷新令牌。',
    s11Title: '11. 多因素认证（MFA）',
    s11p1: 'TOTP（基于时间的一次性密码）使用共享密钥和当前时间戳生成 6 位代码。服务器生成密钥，用户使用认证器应用（Google Authenticator、Authy）扫描二维码，并在登录时输入代码。始终提供备用代码以防用户丢失设备。',
    s11p2: 'WebAuthn（FIDO2）使用硬件安全密钥（YubiKey）或平台认证器（Touch ID、Windows Hello）实现无密码认证。它使用公钥密码学——私钥永远不会离开设备。WebAuthn 能抵御钓鱼攻击，因为浏览器在签署质询之前会验证来源。',
    s12Title: '12. API 认证模式',
    s12p1: 'API 密钥标识调用的应用程序，而非用户。用于服务器间通信、速率限制和使用跟踪。在 X-API-Key 头中发送密钥（永远不要放在查询参数中）。实现密钥轮换、每密钥速率限制和 scope 限制。',
    s12p2: 'OAuth scope 限制访问令牌的操作。定义细粒度 scope（read:users、write:posts、admin:settings）并在中间件中验证。使用令牌桶或滑动窗口算法按客户端/用户实现速率限制。返回带有 Retry-After 头的标准 429 响应。',
    s13Title: '13. 安全最佳实践',
    s13p1: '遵循 OWASP 指南：根据白名单验证所有重定向 URI（防止开放重定向攻击），使用精确字符串匹配重定向 URI（不使用通配符），全面强制 HTTPS，实施适当的令牌撤销，并记录所有认证事件以供审计追踪。',
    s13p2: '需要防范的常见漏洞：授权码注入（使用 PKCE）、通过 Referrer 头的令牌泄露（使用基于片段的重定向）、重定向 URI 验证不足（使用精确匹配）、跨站请求伪造（使用 state 参数）和不安全的令牌存储（使用 httpOnly cookie）。',
    faqTitle: '常见问题',
    faq1q: 'OAuth 2.0 和 OpenID Connect 有什么区别？',
    faq1a: 'OAuth 2.0 是一个授权框架，授予对资源的访问权限。OpenID Connect 是 OAuth 2.0 之上的身份层，添加了认证——验证用户是谁。OAuth 回答"你能访问什么"，而 OIDC 通过提供包含用户身份声明的 ID token 回答"你是谁"。',
    faq2q: '我应该使用 JWT 还是会话 Cookie 进行认证？',
    faq2a: '传统服务端渲染的 Web 应用使用会话 cookie。无状态 API、微服务和移动应用使用 JWT。对于 SPA，考虑 BFF 模式——在后端代理中将 JWT 存储在 httpOnly cookie 中，兼得 cookie 的安全性和 JWT 的灵活性。',
    faq3q: '隐式授权类型还安全吗？',
    faq3a: '不安全。隐式授权在 OAuth 2.1 中已被弃用，因为它在 URL 片段中暴露访问令牌，容易受到浏览器历史攻击和 Referrer 泄露。请改用带 PKCE 的授权码流程，它对公共和机密客户端都是安全的。',
    faq4q: '如何在浏览器应用中存储 OAuth 令牌？',
    faq4a: '永远不要将令牌存储在 localStorage 或 sessionStorage 中，它们容易受到 XSS 攻击。将它们存储在 httpOnly、secure、sameSite cookie 中。对于 SPA，使用 BFF 模式，由服务器管理令牌并为浏览器设置安全 cookie。',
    faq5q: '什么是 PKCE，我需要它吗？',
    faq5a: 'PKCE（代码交换证明密钥）防止授权码拦截攻击。客户端创建随机验证器，在授权时发送 SHA-256 哈希作为挑战，并在令牌交换时证明拥有验证器。是的，你需要它——PKCE 是所有公共客户端的必须项，也推荐用于所有 OAuth 流程。',
    faq6q: '如何在不注销用户的情况下实现令牌刷新？',
    faq6a: '使用存储在 httpOnly cookie 中的刷新令牌。当访问令牌过期时（通常 5-15 分钟后），客户端或后端代理向令牌端点发送刷新令牌以获取新的访问令牌。使用拦截器实现静默刷新，在刷新令牌后重试失败的请求。',
    faq7q: '社交登录应该请求哪些 scope？',
    faq7a: '请求最少需要的 scope。社交登录通常 openid、email 和 profile 就足够了。Google 提供已验证的邮箱、姓名和头像。GitHub 使用 read:user 和 user:email。除非你的应用真正需要，否则避免请求写入 scope——用户更可能批准最小 scope 请求。',
    faq8q: '如何防范 OAuth 中的 CSRF 攻击？',
    faq8a: '在所有 OAuth 授权请求中使用 state 参数。生成加密随机字符串，将其存储在会话中，包含在授权请求中，并在收到回调时验证是否匹配。此外，在会话 cookie 上设置 SameSite=lax 或 strict，并在令牌交换请求上验证 Origin 头。',
  },
};

const preStyle: React.CSSProperties = {
  background: '#1e293b',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  color: '#e2e8f0',
  border: '1px solid #334155',
  margin: '12px 0',
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
  color: 'var(--text-primary)',
};
const pStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  marginBottom: 12,
  fontSize: 15,
};
const tldrStyle: React.CSSProperties = {
  background: '#f0f9ff',
  borderLeft: '4px solid #0ea5e9',
  borderRadius: 8,
  padding: 16,
  margin: '20px 0',
  fontSize: 15,
  lineHeight: 1.8,
  color: '#0c4a6e',
};
const takeawayStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  padding: 16,
  margin: '20px 0',
};
const noteStyle: React.CSSProperties = {
  background: 'rgba(59,130,246,0.08)',
  border: '1px solid rgba(59,130,246,0.25)',
  borderRadius: 8,
  padding: 16,
  margin: '12px 0',
};
const warningStyle: React.CSSProperties = {
  background: 'rgba(234,179,8,0.08)',
  border: '1px solid rgba(234,179,8,0.3)',
  borderRadius: 8,
  padding: 16,
  margin: '12px 0',
};
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid var(--border-color)',
  fontWeight: 700,
  color: 'var(--text-primary)',
  background: 'var(--bg-input)',
};
const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
};

export default function OauthAuthenticationGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        {t.intro}
      </p>

      {/* TL;DR */}
      <div style={tldrStyle}>
        <strong style={{ color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: '8px 0 0 0', color: '#0c4a6e', lineHeight: 1.8 }}>
          {t.tldr}
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={takeawayStyle}>
        <h3 style={{
          fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 12,
          color: 'var(--text-primary)',
        }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h3>
        <ul style={{
          margin: 0, paddingLeft: 20, lineHeight: 2.0,
          color: 'var(--text-secondary)', fontSize: 14,
        }}>
          <li>{isZh ? '使用授权码 + PKCE 流程，隐式授权已弃用' : 'Use Authorization Code + PKCE flow; Implicit grant is deprecated'}</li>
          <li>{isZh ? '将令牌存储在 httpOnly cookie 中，避免 localStorage' : 'Store tokens in httpOnly cookies, never in localStorage'}</li>
          <li>{isZh ? '使用 OpenID Connect 进行用户身份验证，OAuth 仅用于授权' : 'Use OpenID Connect for user identity; OAuth is for authorization only'}</li>
          <li>{isZh ? '实现刷新令牌轮换以检测令牌被盗' : 'Implement refresh token rotation to detect token theft'}</li>
          <li>{isZh ? '使用 RBAC 实现细粒度权限控制' : 'Use RBAC for fine-grained permission control'}</li>
          <li>{isZh ? '敏感操作启用 MFA（TOTP 或 WebAuthn）' : 'Enable MFA (TOTP or WebAuthn) for sensitive operations'}</li>
          <li>{isZh ? '遵循 OWASP 指南验证重定向 URI 和防范注入' : 'Follow OWASP guidelines for redirect URI validation and injection prevention'}</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2 style={h2Style}>{t.s1Title}</h2>
      <p style={pStyle}>{t.s1p1}</p>
      <p style={pStyle}>{t.s1p2}</p>
      <p style={pStyle}>{t.s1p3}</p>
      <pre style={preStyle}><code>{
        '# OAuth 2.0 Grant Types Overview\n' +
        '\n' +
        '1. Authorization Code  (server-side web apps)\n' +
        '   User -> Auth Server -> Code -> Token Exchange\n' +
        '\n' +
        '2. Client Credentials   (machine-to-machine)\n' +
        '   Client -> Auth Server -> Token (no user)\n' +
        '\n' +
        '3. Device Code          (smart TV, CLI)\n' +
        '   Device shows code -> User enters on phone\n' +
        '\n' +
        '4. Refresh Token        (token renewal)\n' +
        '   Expired Token -> Refresh Token -> New Token\n' +
        '\n' +
        '# Deprecated in OAuth 2.1:\n' +
        '5. Implicit             -> Use Auth Code + PKCE\n' +
        '6. Password (ROPC)      -> Use Auth Code + PKCE'
      }</code></pre>

      {/* Section 2 */}
      <h2 style={h2Style}>{t.s2Title}</h2>
      <p style={pStyle}>{t.s2p1}</p>
      <p style={pStyle}>{t.s2p2}</p>
      <p style={pStyle}>{t.s2p3}</p>
      <pre style={preStyle}><code>{
        '// Authorization Code Flow with PKCE\n' +
        'const crypto = require(\'crypto\');\n' +
        '\n' +
        '// Step 1: Generate PKCE pair\n' +
        'const codeVerifier = crypto\n' +
        '  .randomBytes(32).toString(\'base64url\');\n' +
        'const codeChallenge = crypto\n' +
        '  .createHash(\'sha256\')\n' +
        '  .update(codeVerifier).digest(\'base64url\');\n' +
        '\n' +
        '// Step 2: Build authorization URL\n' +
        'const authUrl = \'https://auth.example.com/authorize\'\n' +
        '  + \'?response_type=code\'\n' +
        '  + \'&client_id=my_app\'\n' +
        '  + \'&redirect_uri=https://app.com/callback\'\n' +
        '  + \'&scope=openid%20email%20profile\'\n' +
        '  + \'&state=\' + csrfToken\n' +
        '  + \'&code_challenge=\' + codeChallenge\n' +
        '  + \'&code_challenge_method=S256\';'
      }</code></pre>

      {/* Section 3 */}
      <h2 style={h2Style}>{t.s3Title}</h2>
      <p style={pStyle}>{t.s3p1}</p>
      <p style={pStyle}>{t.s3p2}</p>
      <p style={pStyle}>{t.s3p3}</p>
      <pre style={preStyle}><code>{
        '// JWT verification with jose library\n' +
        'const { jwtVerify } = require(\'jose\');\n' +
        '\n' +
        'async function verifyToken(token, publicKey) {\n' +
        '  const { payload } = await jwtVerify(\n' +
        '    token,\n' +
        '    publicKey,\n' +
        '    {\n' +
        '      algorithms: [\'RS256\'],\n' +
        '      issuer: \'https://auth.example.com\',\n' +
        '      audience: \'my-api\',\n' +
        '      maxTokenAge: \'15m\',\n' +
        '    }\n' +
        '  );\n' +
        '  // payload.sub = user ID\n' +
        '  // payload.role = user role\n' +
        '  return payload;\n' +
        '}'
      }</code></pre>

      {/* JWT Structure Visualization */}
      <h3 style={h3Style}>
        {isZh ? 'JWT 结构' : 'JWT Structure'}
      </h3>
      <pre style={preStyle}><code>{
        '# JWT = Header.Payload.Signature\n' +
        '\n' +
        '# Header (Base64URL)\n' +
        '{\n' +
        '  "alg": "RS256",\n' +
        '  "typ": "JWT",\n' +
        '  "kid": "key-id-2024"\n' +
        '}\n' +
        '\n' +
        '# Payload (Base64URL)\n' +
        '{\n' +
        '  "iss": "https://auth.example.com",\n' +
        '  "sub": "user_123",\n' +
        '  "aud": "my-api",\n' +
        '  "exp": 1709251200,\n' +
        '  "iat": 1709250300,\n' +
        '  "role": "editor"\n' +
        '}\n' +
        '\n' +
        '# Signature\n' +
        '# RS256(base64(header) + "." + base64(payload),\n' +
        '#   privateKey)'
      }</code></pre>

      {/* Section 4 */}
      <h2 style={h2Style}>{t.s4Title}</h2>
      <p style={pStyle}>{t.s4p1}</p>
      <p style={pStyle}>{t.s4p2}</p>
      <p style={pStyle}>{t.s4p3}</p>
      <pre style={preStyle}><code>{
        '// Fetch OIDC Discovery configuration\n' +
        'const discoveryUrl =\n' +
        '  \'https://accounts.google.com\'\n' +
        '  + \'/.well-known/openid-configuration\';\n' +
        '\n' +
        'const config = await fetch(discoveryUrl)\n' +
        '  .then(r => r.json());\n' +
        '\n' +
        '// config.authorization_endpoint\n' +
        '// config.token_endpoint\n' +
        '// config.userinfo_endpoint\n' +
        '// config.jwks_uri\n' +
        '// config.scopes_supported:\n' +
        '//   ["openid","email","profile"]\n' +
        '// config.id_token_signing_alg_values:\n' +
        '//   ["RS256"]'
      }</code></pre>

      {/* Section 5 */}
      <h2 style={h2Style}>{t.s5Title}</h2>
      <p style={pStyle}>{t.s5p1}</p>
      <p style={pStyle}>{t.s5p2}</p>
      <p style={pStyle}>{t.s5p3}</p>
      <pre style={preStyle}><code>{
        '// Refresh token rotation middleware\n' +
        'app.post(\'/auth/refresh\', async (req, res) => {\n' +
        '  const { refreshToken } = req.cookies;\n' +
        '  const stored = await db.tokens.findOne({\n' +
        '    token: refreshToken, revoked: false\n' +
        '  });\n' +
        '  if (!stored) {\n' +
        '    // Token reuse detected - revoke all\n' +
        '    await db.tokens.updateMany(\n' +
        '      { userId: stored?.userId },\n' +
        '      { revoked: true }\n' +
        '    );\n' +
        '    return res.status(401).json({\n' +
        '      error: \'Token reuse detected\'\n' +
        '    });\n' +
        '  }\n' +
        '  await db.tokens.updateOne(\n' +
        '    { _id: stored._id }, { revoked: true }\n' +
        '  );\n' +
        '  // Issue new token pair...\n' +
        '});'
      }</code></pre>

      {/* Section 6 */}
      <h2 style={h2Style}>{t.s6Title}</h2>
      <p style={pStyle}>{t.s6p1}</p>
      <p style={pStyle}>{t.s6p2}</p>
      <pre style={preStyle}><code>{
        '// Passport.js GitHub OAuth strategy\n' +
        'const passport = require(\'passport\');\n' +
        'const GitHubStrategy =\n' +
        '  require(\'passport-github2\').Strategy;\n' +
        '\n' +
        'passport.use(new GitHubStrategy({\n' +
        '    clientID: process.env.GITHUB_ID,\n' +
        '    clientSecret: process.env.GITHUB_SECRET,\n' +
        '    callbackURL: \'/auth/github/callback\'\n' +
        '  },\n' +
        '  async (accessToken, refresh, profile, done) => {\n' +
        '    let user = await db.users.findOne({\n' +
        '      githubId: profile.id\n' +
        '    });\n' +
        '    if (!user) {\n' +
        '      user = await db.users.create({\n' +
        '        githubId: profile.id,\n' +
        '        name: profile.displayName,\n' +
        '        email: profile.emails?.[0]?.value\n' +
        '      });\n' +
        '    }\n' +
        '    return done(null, user);\n' +
        '  }\n' +
        '));'
      }</code></pre>

      {/* Section 7 */}
      <h2 style={h2Style}>{t.s7Title}</h2>
      <p style={pStyle}>{t.s7p1}</p>
      <p style={pStyle}>{t.s7p2}</p>
      <pre style={preStyle}><code>{
        '// auth.ts - Auth.js configuration\n' +
        'import NextAuth from \'next-auth\';\n' +
        'import GitHub from \'next-auth/providers/github\';\n' +
        'import Google from \'next-auth/providers/google\';\n' +
        '\n' +
        'export const { handlers, auth } = NextAuth({\n' +
        '  providers: [\n' +
        '    GitHub({ clientId: \'\', clientSecret: \'\' }),\n' +
        '    Google({ clientId: \'\', clientSecret: \'\' }),\n' +
        '  ],\n' +
        '  callbacks: {\n' +
        '    async jwt({ token, user }) {\n' +
        '      if (user) token.role = user.role;\n' +
        '      return token;\n' +
        '    },\n' +
        '    async session({ session, token }) {\n' +
        '      session.user.role = token.role;\n' +
        '      return session;\n' +
        '    },\n' +
        '  },\n' +
        '});'
      }</code></pre>

      {/* Section 8 */}
      <h2 style={h2Style}>{t.s8Title}</h2>
      <p style={pStyle}>{t.s8p1}</p>
      <p style={pStyle}>{t.s8p2}</p>
      <pre style={preStyle}><code>{
        '// Multi-provider social login config\n' +
        'const providers = {\n' +
        '  google: {\n' +
        '    authUrl: \'https://accounts.google.com\'\n' +
        '      + \'/o/oauth2/v2/auth\',\n' +
        '    tokenUrl: \'https://oauth2.googleapis.com\'\n' +
        '      + \'/token\',\n' +
        '    scopes: [\'openid\', \'email\', \'profile\'],\n' +
        '    userInfoUrl: \'https://www.googleapis.com\'\n' +
        '      + \'/oauth2/v3/userinfo\',\n' +
        '  },\n' +
        '  github: {\n' +
        '    authUrl: \'https://github.com\'\n' +
        '      + \'/login/oauth/authorize\',\n' +
        '    tokenUrl: \'https://github.com\'\n' +
        '      + \'/login/oauth/access_token\',\n' +
        '    scopes: [\'read:user\', \'user:email\'],\n' +
        '    userInfoUrl: \'https://api.github.com/user\',\n' +
        '  },\n' +
        '};'
      }</code></pre>

      {/* Section 9 */}
      <h2 style={h2Style}>{t.s9Title}</h2>
      <p style={pStyle}>{t.s9p1}</p>
      <p style={pStyle}>{t.s9p2}</p>
      <pre style={preStyle}><code>{
        '// RBAC middleware with permission check\n' +
        'const ROLES = {\n' +
        '  admin:  [\'users:*\', \'posts:*\', \'settings:*\'],\n' +
        '  editor: [\'posts:read\', \'posts:write\',\n' +
        '           \'posts:delete\', \'users:read\'],\n' +
        '  viewer: [\'posts:read\', \'users:read\'],\n' +
        '};\n' +
        '\n' +
        'function authorize(permission) {\n' +
        '  return (req, res, next) => {\n' +
        '    const userRole = req.user?.role;\n' +
        '    const perms = ROLES[userRole] || [];\n' +
        '    const allowed = perms.some(p =>\n' +
        '      p === permission ||\n' +
        '      p === permission.split(\':\')[0] + \':*\'\n' +
        '    );\n' +
        '    if (!allowed) return res.status(403)\n' +
        '      .json({ error: \'Forbidden\' });\n' +
        '    next();\n' +
        '  };\n' +
        '}'
      }</code></pre>

      {/* Section 10 */}
      <h2 style={h2Style}>{t.s10Title}</h2>
      <p style={pStyle}>{t.s10p1}</p>
      <div style={warningStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
          <strong style={{ color: '#b45309' }}>
            {isZh ? '安全警告：' : 'Security Warning:'}
          </strong>{' '}
          {isZh
            ? 'localStorage 和 sessionStorage 中的令牌可被任何注入的脚本读取。一个 XSS 漏洞就能导致所有用户令牌被盗。始终使用 httpOnly cookie。'
            : 'Tokens in localStorage and sessionStorage are readable by any injected script. A single XSS vulnerability can steal all user tokens. Always use httpOnly cookies.'}
        </p>
      </div>
      <p style={pStyle}>{t.s10p2}</p>
      <pre style={preStyle}><code>{
        '// Secure cookie token configuration\n' +
        'function setAuthCookies(res, tokens) {\n' +
        '  res.cookie(\'access_token\', tokens.access, {\n' +
        '    httpOnly: true,   // No JS access\n' +
        '    secure: true,     // HTTPS only\n' +
        '    sameSite: \'lax\',  // CSRF protection\n' +
        '    maxAge: 15 * 60 * 1000,  // 15 min\n' +
        '    path: \'/\',\n' +
        '  });\n' +
        '  res.cookie(\'refresh_token\', tokens.refresh, {\n' +
        '    httpOnly: true,\n' +
        '    secure: true,\n' +
        '    sameSite: \'strict\',\n' +
        '    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d\n' +
        '    path: \'/auth/refresh\', // Limit scope\n' +
        '  });\n' +
        '}'
      }</code></pre>

      {/* Section 11 */}
      <h2 style={h2Style}>{t.s11Title}</h2>
      <p style={pStyle}>{t.s11p1}</p>
      <p style={pStyle}>{t.s11p2}</p>
      <pre style={preStyle}><code>{
        '// TOTP setup and verification\n' +
        'const { authenticator } = require(\'otplib\');\n' +
        'const QRCode = require(\'qrcode\');\n' +
        '\n' +
        '// Generate secret for user\n' +
        'app.post(\'/mfa/setup\', auth, async (req, res) => {\n' +
        '  const secret = authenticator.generateSecret();\n' +
        '  const otpauth = authenticator.keyuri(\n' +
        '    req.user.email, \'MyApp\', secret\n' +
        '  );\n' +
        '  const qrCode = await QRCode.toDataURL(\n' +
        '    otpauth\n' +
        '  );\n' +
        '  await db.users.updateOne(\n' +
        '    { _id: req.user.id },\n' +
        '    { mfaSecret: secret, mfaEnabled: false }\n' +
        '  );\n' +
        '  res.json({ qrCode, secret });\n' +
        '});\n' +
        '\n' +
        '// Verify TOTP code\n' +
        'const isValid = authenticator.verify({\n' +
        '  token: userCode, secret: user.mfaSecret\n' +
        '});'
      }</code></pre>

      {/* Section 12 */}
      <h2 style={h2Style}>{t.s12Title}</h2>
      <p style={pStyle}>{t.s12p1}</p>
      <p style={pStyle}>{t.s12p2}</p>
      <pre style={preStyle}><code>{
        '// API key + OAuth scope middleware\n' +
        'function apiAuth(requiredScope) {\n' +
        '  return async (req, res, next) => {\n' +
        '    const apiKey = req.headers[\'x-api-key\'];\n' +
        '    const bearer = req.headers.authorization;\n' +
        '    if (apiKey) {\n' +
        '      const client = await db.apiKeys.findOne({\n' +
        '        key: apiKey, active: true\n' +
        '      });\n' +
        '      if (!client)\n' +
        '        return res.status(401)\n' +
        '          .json({ error: \'Invalid API key\' });\n' +
        '      if (!client.scopes.includes(requiredScope))\n' +
        '        return res.status(403)\n' +
        '          .json({ error: \'Insufficient scope\' });\n' +
        '      req.client = client;\n' +
        '    } else if (bearer) {\n' +
        '      // Verify OAuth bearer token + scope\n' +
        '      req.user = verifyBearer(bearer);\n' +
        '    }\n' +
        '    next();\n' +
        '  };\n' +
        '}'
      }</code></pre>

      {/* Section 13 */}
      <h2 style={h2Style}>{t.s13Title}</h2>
      <p style={pStyle}>{t.s13p1}</p>
      <p style={pStyle}>{t.s13p2}</p>
      <div style={noteStyle}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>
          <strong>{isZh ? '安全检查清单：' : 'Security Checklist:'}</strong>{' '}
          {isZh
            ? '始终使用 PKCE，验证 state 参数，精确匹配重定向 URI，令牌存储于 httpOnly cookie，使用短期访问令牌（15 分钟），轮换刷新令牌，全面启用 HTTPS，记录所有认证事件。'
            : 'Always use PKCE, validate state parameter, exact-match redirect URIs, store tokens in httpOnly cookies, use short-lived access tokens (15min), rotate refresh tokens, enforce HTTPS everywhere, log all auth events.'}
        </p>
      </div>
      <pre style={preStyle}><code>{
        '// Security headers middleware\n' +
        'app.use((req, res, next) => {\n' +
        '  // Prevent clickjacking\n' +
        '  res.setHeader(\'X-Frame-Options\', \'DENY\');\n' +
        '  // Strict transport security\n' +
        '  res.setHeader(\n' +
        '    \'Strict-Transport-Security\',\n' +
        '    \'max-age=31536000; includeSubDomains\'\n' +
        '  );\n' +
        '  // Content security policy\n' +
        '  res.setHeader(\n' +
        '    \'Content-Security-Policy\',\n' +
        '    "default-src \'self\'; script-src \'self\'"\n' +
        '  );\n' +
        '  // Prevent MIME sniffing\n' +
        '  res.setHeader(\n' +
        '    \'X-Content-Type-Options\', \'nosniff\'\n' +
        '  );\n' +
        '  next();\n' +
        '});'
      }</code></pre>

      {/* Auth Decision Guide */}
      <h2 style={h2Style}>
        {isZh ? '认证方案选择指南' : 'Authentication Decision Guide'}
      </h2>
      <div style={noteStyle}>
        <ul style={{
          margin: 0, paddingLeft: 20, lineHeight: 2.2,
          color: 'var(--text-secondary)', fontSize: 14,
        }}>
          <li>
            <strong>{isZh ? '服务端 Web 应用：' : 'Server-side web app:'}</strong>{' '}
            {isZh ? '授权码流程 + 服务端会话 + httpOnly cookie' : 'Auth Code flow + server sessions + httpOnly cookies'}
          </li>
          <li>
            <strong>{isZh ? '单页应用 (SPA)：' : 'Single-page app (SPA):'}</strong>{' '}
            {isZh ? '授权码 + PKCE + BFF 模式 + httpOnly cookie' : 'Auth Code + PKCE + BFF pattern + httpOnly cookies'}
          </li>
          <li>
            <strong>{isZh ? '移动应用：' : 'Mobile app:'}</strong>{' '}
            {isZh ? '授权码 + PKCE + 安全存储 (Keychain/Keystore)' : 'Auth Code + PKCE + secure storage (Keychain/Keystore)'}
          </li>
          <li>
            <strong>{isZh ? '微服务间通信：' : 'Microservice-to-microservice:'}</strong>{' '}
            {isZh ? '客户端凭据流程 + JWT + mTLS' : 'Client Credentials flow + JWT + mTLS'}
          </li>
          <li>
            <strong>{isZh ? '第三方 API 集成：' : 'Third-party API integration:'}</strong>{' '}
            {isZh ? 'API 密钥 + OAuth scope + 速率限制' : 'API keys + OAuth scopes + rate limiting'}
          </li>
          <li>
            <strong>{isZh ? 'IoT / CLI 工具：' : 'IoT / CLI tools:'}</strong>{' '}
            {isZh ? '设备码流程 + 短期令牌' : 'Device Code flow + short-lived tokens'}
          </li>
        </ul>
      </div>

      {/* OAuth Flow Comparison Table */}
      <h2 style={h2Style}>
        {isZh ? 'OAuth 流程对比' : 'OAuth Flow Comparison'}
      </h2>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '流程' : 'Flow'}</th>
              <th style={thStyle}>{isZh ? '适用场景' : 'Use Case'}</th>
              <th style={thStyle}>{isZh ? '安全级别' : 'Security'}</th>
              <th style={thStyle}>PKCE</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '授权码' : 'Auth Code', isZh ? '服务端 Web 应用' : 'Server-side web apps', isZh ? '高' : 'High', isZh ? '推荐' : 'Recommended'],
              [isZh ? '授权码 + PKCE' : 'Auth Code + PKCE', isZh ? 'SPA、移动应用' : 'SPAs, mobile apps', isZh ? '高' : 'High', isZh ? '必须' : 'Required'],
              [isZh ? '客户端凭据' : 'Client Credentials', isZh ? '机器对机器' : 'Machine-to-machine', isZh ? '中' : 'Medium', 'N/A'],
              [isZh ? '设备码' : 'Device Code', isZh ? '智能电视、CLI' : 'Smart TV, CLI', isZh ? '中' : 'Medium', 'N/A'],
              [isZh ? '隐式（已弃用）' : 'Implicit (Deprecated)', isZh ? '请勿使用' : 'Do not use', isZh ? '低' : 'Low', 'N/A'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                <td style={tdStyle}>{row[1]}</td>
                <td style={tdStyle}>{row[2]}</td>
                <td style={tdStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Token Storage Comparison */}
      <h3 style={h3Style}>
        {isZh ? '令牌存储方式对比' : 'Token Storage Comparison'}
      </h3>
      <div style={{ overflowX: 'auto', margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储方式' : 'Storage'}</th>
              <th style={thStyle}>{isZh ? 'XSS 安全' : 'XSS Safe'}</th>
              <th style={thStyle}>{isZh ? 'CSRF 安全' : 'CSRF Safe'}</th>
              <th style={thStyle}>{isZh ? '推荐' : 'Recommended'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['localStorage', isZh ? '否' : 'No', isZh ? '是' : 'Yes', isZh ? '不推荐' : 'No'],
              ['sessionStorage', isZh ? '否' : 'No', isZh ? '是' : 'Yes', isZh ? '不推荐' : 'No'],
              ['httpOnly Cookie', isZh ? '是' : 'Yes', isZh ? '需 SameSite' : 'With SameSite', isZh ? '推荐' : 'Yes'],
              [isZh ? '内存变量' : 'In-memory', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes', isZh ? '刷新时丢失' : 'Lost on refresh'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row[0]}</td>
                <td style={tdStyle}>{row[1]}</td>
                <td style={tdStyle}>{row[2]}</td>
                <td style={tdStyle}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        { q: t.faq1q, a: t.faq1a },
        { q: t.faq2q, a: t.faq2a },
        { q: t.faq3q, a: t.faq3a },
        { q: t.faq4q, a: t.faq4a },
        { q: t.faq5q, a: t.faq5a },
        { q: t.faq6q, a: t.faq6a },
        { q: t.faq7q, a: t.faq7a },
        { q: t.faq8q, a: t.faq8a },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 600, color: 'var(--text-primary)',
            marginBottom: 8, marginTop: i === 0 ? 16 : 24,
          }}>
            {faq.q}
          </h3>
          <p style={{
            color: 'var(--text-secondary)', lineHeight: 1.8,
            margin: 0, fontSize: 15,
          }}>
            {faq.a}
          </p>
        </div>
      ))}
    </div>
  );
}
