'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Application Security Engineering: OWASP Top 10, AuthN/AuthZ, Input Validation, Secrets Management & DevSecOps',
    description:
      'Complete application security engineering guide covering OWASP Top 10, authentication and authorization, input validation, CSRF/XSS/SQLi prevention, secrets management, dependency scanning, CSP, CORS, API security, encryption at rest and in transit, security headers, and DevSecOps CI/CD integration.',
  },
  zh: {
    title: '应用安全工程：OWASP Top 10、认证授权、输入验证、密钥管理与 DevSecOps',
    description:
      '全面的应用安全工程指南，涵盖 OWASP Top 10、认证与授权、输入验证、CSRF/XSS/SQLi 防护、密钥管理、依赖扫描、CSP、CORS、API 安全、静态/传输加密、安全头和 DevSecOps CI/CD 集成。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the OWASP Top 10 and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The OWASP Top 10 is a regularly updated list of the most critical web application security risks published by the Open Web Application Security Project. It matters because it represents a broad consensus on the most dangerous flaws. Many compliance frameworks (PCI DSS, SOC 2, ISO 27001) reference OWASP as a baseline standard. Addressing the Top 10 significantly reduces your attack surface.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between authentication and authorization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Authentication (AuthN) verifies identity — confirming that a user is who they claim to be through credentials like passwords, tokens, or biometrics. Authorization (AuthZ) determines permissions — what an authenticated user is allowed to do. Authentication answers "who are you?" while authorization answers "what can you access?" Both are required for secure systems, and they should be implemented as separate, composable layers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I prevent SQL injection in modern applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use parameterized queries or prepared statements exclusively — never concatenate user input into SQL strings. ORMs like Prisma, SQLAlchemy, and ActiveRecord use parameterized queries by default. Additionally, apply the principle of least privilege to database accounts, validate and sanitize all inputs, and use a Web Application Firewall (WAF) as an additional defense layer. Regular code reviews and SAST tools can catch injection vulnerabilities early.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Content Security Policy (CSP) and how do I implement it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Content Security Policy is an HTTP response header that controls which resources a browser is allowed to load for a page. A strict CSP prevents XSS by blocking inline scripts and restricting script sources. Start with Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; and tighten from there. Use nonce-based or hash-based CSP for inline scripts instead of 'unsafe-inline'. Report violations with report-uri or report-to directives.",
      },
    },
    {
      '@type': 'Question',
      name: 'How should I manage secrets like API keys and database passwords?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never store secrets in source code, environment files committed to version control, or client-side code. Use a dedicated secrets manager such as HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, or Azure Key Vault. For local development, use .env files that are gitignored. In CI/CD, use pipeline-level secret variables. Rotate secrets regularly, audit access, and use short-lived tokens where possible. Pre-commit hooks with tools like git-secrets or truffleHog can prevent accidental commits of credentials.',
      },
    },
    {
      '@type': 'Question',
      name: 'What security headers should every web application set?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Essential security headers include: Strict-Transport-Security (HSTS) to enforce HTTPS; Content-Security-Policy to prevent XSS; X-Content-Type-Options: nosniff to prevent MIME-type sniffing; X-Frame-Options: DENY or SAMEORIGIN to prevent clickjacking; Referrer-Policy: strict-origin-when-cross-origin to limit referrer leakage; Permissions-Policy to disable unnecessary browser features; and Cache-Control: no-store for sensitive pages. Use securityheaders.com to audit your configuration.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I secure REST APIs against common attacks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Secure REST APIs by implementing proper authentication (OAuth 2.0, JWT with RS256), rate limiting per endpoint and per user, input validation on all parameters, CORS whitelisting, request size limits, and pagination for list endpoints. Use API keys for identification (not authentication), validate Content-Type headers, return minimal error information to clients, log all access attempts, and version your API to maintain backward compatibility during security updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I integrate security into a CI/CD pipeline (DevSecOps)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DevSecOps integrates security checks into every stage of CI/CD. In the commit stage, run pre-commit hooks for secret detection (git-secrets, truffleHog). In the build stage, run SAST tools (Semgrep, CodeQL, SonarQube) and dependency scanning (npm audit, Snyk, Dependabot). In the test stage, run DAST tools (OWASP ZAP, Burp Suite) against staging environments. In the deploy stage, scan container images (Trivy, Grype) and validate Infrastructure as Code (Checkov, tfsec). Fail the pipeline on critical findings and track security debt alongside technical debt.',
      },
    },
  ],
};

export default function SecurityGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '24px',
    fontSize: '0.95rem',
  };

  const thStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#1e293b',
  };

  const tdStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0',
    padding: '10px 14px',
    color: '#374151',
  };

  const liStyle: React.CSSProperties = {
    marginBottom: '8px',
    lineHeight: '1.7',
    color: '#374151',
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '12px 0' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0369a1', margin: '0 0 12px 0' }}>
          {isZh ? 'TL;DR — 应用安全速查' : 'TL;DR — Application Security Quick Reference'}
        </h2>
        <p style={{ color: '#0c4a6e', lineHeight: '1.8', margin: '0' }}>
          {isZh
            ? '应用安全工程涵盖从设计到部署的全流程。使用参数化查询防止 SQLi，CSP 防止 XSS，SameSite Cookie + CSRF Token 防止 CSRF。密码使用 bcrypt/Argon2id 哈希，JWT 使用 RS256/EdDSA 签名。密钥存储在 Vault 或云密钥管理器中，不提交代码仓库。设置 HSTS、X-Frame-Options、X-Content-Type-Options 等安全头。在 CI/CD 中集成 SAST、DAST、依赖扫描和容器扫描，实现 DevSecOps。'
            : 'Application security engineering spans design through deployment. Use parameterized queries to prevent SQLi, CSP to prevent XSS, and SameSite cookies with CSRF tokens to prevent CSRF. Hash passwords with bcrypt/Argon2id, sign JWTs with RS256/EdDSA. Store secrets in Vault or cloud secret managers — never in code. Set HSTS, X-Frame-Options, X-Content-Type-Options, and other security headers. Integrate SAST, DAST, dependency scanning, and container scanning in CI/CD for DevSecOps.'}
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li style={liStyle}>
            {isZh
              ? '始终使用参数化查询——永远不要将用户输入拼接到 SQL 中。'
              : 'Always use parameterized queries — never concatenate user input into SQL.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '实施 CSP 头和输出编码以防止 XSS 攻击。'
              : 'Implement CSP headers and output encoding to prevent XSS attacks.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '认证（AuthN）和授权（AuthZ）必须作为独立的可组合层实现。'
              : 'Authentication (AuthN) and authorization (AuthZ) must be separate, composable layers.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '使用 Vault 或云密钥管理器管理密钥——永远不提交到版本控制。'
              : 'Use Vault or cloud secret managers for secrets — never commit them to version control.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '在 CI/CD 每次运行中集成 SAST、依赖扫描和容器镜像扫描。'
              : 'Integrate SAST, dependency scanning, and container image scanning in every CI/CD run.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '对所有 API 端点实施速率限制、输入验证和 CORS 白名单。'
              : 'Enforce rate limiting, input validation, and CORS whitelisting on all API endpoints.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '静态数据使用 AES-256-GCM 加密，传输数据使用 TLS 1.3。'
              : 'Encrypt data at rest with AES-256-GCM and data in transit with TLS 1.3.'}
          </li>
          <li style={liStyle}>
            {isZh
              ? '安全是持续过程，不是一次性检查——将安全债务与技术债务一起追踪。'
              : 'Security is a continuous process, not a one-time check — track security debt alongside tech debt.'}
          </li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={pStyle}>
        {isZh
          ? '应用安全工程不仅仅是修补漏洞——它是将安全思维融入软件开发全生命周期的系统方法。从威胁建模到安全编码、从密钥管理到 CI/CD 安全集成，本指南涵盖了构建安全应用程序所需的一切。无论您是全栈开发者、后端工程师还是 DevOps 工程师，掌握这些安全实践对于保护用户数据和业务至关重要。'
          : 'Application security engineering is more than patching vulnerabilities — it is a systematic approach to embedding security thinking across the entire software development lifecycle. From threat modeling to secure coding, from secrets management to CI/CD security integration, this guide covers everything needed to build secure applications. Whether you are a full-stack developer, backend engineer, or DevOps practitioner, mastering these security practices is essential for protecting user data and business assets.'}
      </p>

      {/* ===================== OWASP TOP 10 ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'OWASP Top 10 概览（2021 版）' : 'OWASP Top 10 Overview (2021 Edition)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'OWASP Top 10 是最广泛认可的 Web 应用安全风险排名。2021 版反映了现代威胁格局，新增了不安全设计、软件和数据完整性失败、SSRF 三个类别。'
          : 'The OWASP Top 10 is the most widely recognized ranking of web application security risks. The 2021 edition reflects the modern threat landscape with three new categories: Insecure Design, Software and Data Integrity Failures, and SSRF.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '编号' : 'ID'}</th>
            <th style={thStyle}>{isZh ? '名称' : 'Name'}</th>
            <th style={thStyle}>{isZh ? '关键防御' : 'Key Defense'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>A01</td><td style={tdStyle}>{isZh ? '访问控制失效' : 'Broken Access Control'}</td><td style={tdStyle}>{isZh ? '最小权限、RBAC、服务端校验' : 'Least privilege, RBAC, server-side checks'}</td></tr>
          <tr><td style={tdStyle}>A02</td><td style={tdStyle}>{isZh ? '加密失败' : 'Cryptographic Failures'}</td><td style={tdStyle}>{isZh ? 'TLS 1.3、AES-256-GCM、密钥轮换' : 'TLS 1.3, AES-256-GCM, key rotation'}</td></tr>
          <tr><td style={tdStyle}>A03</td><td style={tdStyle}>{isZh ? '注入' : 'Injection'}</td><td style={tdStyle}>{isZh ? '参数化查询、输入验证、WAF' : 'Parameterized queries, input validation, WAF'}</td></tr>
          <tr><td style={tdStyle}>A04</td><td style={tdStyle}>{isZh ? '不安全设计' : 'Insecure Design'}</td><td style={tdStyle}>{isZh ? '威胁建模、安全设计模式' : 'Threat modeling, secure design patterns'}</td></tr>
          <tr><td style={tdStyle}>A05</td><td style={tdStyle}>{isZh ? '安全配置错误' : 'Security Misconfiguration'}</td><td style={tdStyle}>{isZh ? '安全基线、自动化配置审计' : 'Hardened baselines, automated config audits'}</td></tr>
          <tr><td style={tdStyle}>A06</td><td style={tdStyle}>{isZh ? '易受攻击和过时组件' : 'Vulnerable Components'}</td><td style={tdStyle}>{isZh ? '依赖扫描、SCA、自动补丁' : 'Dependency scanning, SCA, auto-patching'}</td></tr>
          <tr><td style={tdStyle}>A07</td><td style={tdStyle}>{isZh ? '身份认证和鉴别失败' : 'Auth Failures'}</td><td style={tdStyle}>{isZh ? 'MFA、速率限制、安全会话管理' : 'MFA, rate limiting, secure sessions'}</td></tr>
          <tr><td style={tdStyle}>A08</td><td style={tdStyle}>{isZh ? '软件和数据完整性失败' : 'Integrity Failures'}</td><td style={tdStyle}>{isZh ? '签名验证、安全 CI/CD 管道' : 'Signature verification, secure CI/CD pipelines'}</td></tr>
          <tr><td style={tdStyle}>A09</td><td style={tdStyle}>{isZh ? '安全日志和监控失败' : 'Logging Failures'}</td><td style={tdStyle}>{isZh ? '结构化日志、告警、SIEM' : 'Structured logging, alerting, SIEM'}</td></tr>
          <tr><td style={tdStyle}>A10</td><td style={tdStyle}>{isZh ? '服务端请求伪造' : 'SSRF'}</td><td style={tdStyle}>{isZh ? 'URL 白名单、网络隔离' : 'URL allowlists, network segmentation'}</td></tr>
        </tbody>
      </table>

      {/* ===================== AUTHENTICATION & AUTHORIZATION ===================== */}
      <h2 style={h2Style}>
        {isZh ? '认证与授权（AuthN / AuthZ）' : 'Authentication & Authorization (AuthN / AuthZ)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '认证验证用户身份，授权决定用户能做什么。二者必须作为独立层实现，以便灵活组合和审计。'
          : 'Authentication verifies user identity, authorization determines what that user can do. These must be separate layers for flexibility, auditability, and defense in depth.'}
      </p>

      <h3 style={h3Style}>{isZh ? '密码安全' : 'Password Security'}</h3>
      <pre style={preStyle}><code>
        {'// Password hashing with bcrypt (Node.js)\n'}
        {'import bcrypt from \'bcrypt\';\n\n'}
        {'const SALT_ROUNDS = 12;\n\n'}
        {'async function hashPassword(plaintext: string): Promise<string> {\n'}
        {'  return bcrypt.hash(plaintext, SALT_ROUNDS);\n'}
        {'}\n\n'}
        {'async function verifyPassword(\n'}
        {'  plaintext: string,\n'}
        {'  hash: string\n'}
        {'): Promise<boolean> {\n'}
        {'  return bcrypt.compare(plaintext, hash);\n'}
        {'}\n\n'}
        {'// Password policy enforcement\n'}
        {'function validatePassword(pw: string): string[] {\n'}
        {'  const errors: string[] = [];\n'}
        {'  if (pw.length < 12) errors.push(\'Min 12 characters\');\n'}
        {'  if (!/[A-Z]/.test(pw)) errors.push(\'Need uppercase\');\n'}
        {'  if (!/[0-9]/.test(pw)) errors.push(\'Need digit\');\n'}
        {'  if (!/[^A-Za-z0-9]/.test(pw)) errors.push(\'Need special char\');\n'}
        {'  return errors;\n'}
        {'}'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'JWT 安全实践' : 'JWT Security Best Practices'}</h3>
      <pre style={preStyle}><code>
        {'// JWT with RS256 (asymmetric — recommended)\n'}
        {'import jwt from \'jsonwebtoken\';\n'}
        {'import fs from \'fs\';\n\n'}
        {'const privateKey = fs.readFileSync(\'./keys/private.pem\');\n'}
        {'const publicKey = fs.readFileSync(\'./keys/public.pem\');\n\n'}
        {'function signToken(payload: object): string {\n'}
        {'  return jwt.sign(payload, privateKey, {\n'}
        {'    algorithm: \'RS256\',\n'}
        {'    expiresIn: \'15m\',    // Short-lived access tokens\n'}
        {'    issuer: \'myapp.com\',\n'}
        {'    audience: \'myapp-api\',\n'}
        {'  });\n'}
        {'}\n\n'}
        {'function verifyToken(token: string): jwt.JwtPayload {\n'}
        {'  return jwt.verify(token, publicKey, {\n'}
        {'    algorithms: [\'RS256\'], // CRITICAL: whitelist algorithms\n'}
        {'    issuer: \'myapp.com\',\n'}
        {'    audience: \'myapp-api\',\n'}
        {'  }) as jwt.JwtPayload;\n'}
        {'}'}
      </code></pre>
      <p style={pStyle}>
        {isZh
          ? 'JWT 安全要点：始终白名单签名算法（禁用 "none"），使用短期访问令牌 + 长期刷新令牌，验证 issuer、audience 和 expiration，将刷新令牌存储在 HttpOnly cookie 中。'
          : 'JWT security essentials: always whitelist signing algorithms (disable "none"), use short-lived access tokens with long-lived refresh tokens, validate issuer, audience, and expiration, and store refresh tokens in HttpOnly cookies.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'OAuth 2.0 / OIDC 流程' : 'OAuth 2.0 / OIDC Flows'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '流程' : 'Flow'}</th>
            <th style={thStyle}>{isZh ? '适用场景' : 'Use Case'}</th>
            <th style={thStyle}>{isZh ? '安全注意' : 'Security Note'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Authorization Code + PKCE</td><td style={tdStyle}>{isZh ? 'SPA、移动应用、服务端应用' : 'SPAs, mobile apps, server apps'}</td><td style={tdStyle}>{isZh ? '推荐用于所有客户端' : 'Recommended for all clients'}</td></tr>
          <tr><td style={tdStyle}>Client Credentials</td><td style={tdStyle}>{isZh ? '服务间通信 (M2M)' : 'Service-to-service (M2M)'}</td><td style={tdStyle}>{isZh ? '仅限受信服务端' : 'Trusted backends only'}</td></tr>
          <tr><td style={tdStyle}>Device Code</td><td style={tdStyle}>{isZh ? '无浏览器设备 (CLI, IoT)' : 'Browserless devices (CLI, IoT)'}</td><td style={tdStyle}>{isZh ? '短期轮询码' : 'Short-lived polling codes'}</td></tr>
          <tr><td style={tdStyle}>Implicit (Legacy)</td><td style={tdStyle}>{isZh ? '已弃用' : 'Deprecated'}</td><td style={tdStyle}>{isZh ? '不安全——改用 PKCE' : 'Insecure — migrate to PKCE'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'RBAC 与 ABAC 授权模型' : 'RBAC vs ABAC Authorization Models'}</h3>
      <pre style={preStyle}><code>
        {'// RBAC middleware example (Express.js)\n'}
        {'type Role = \'admin\' | \'editor\' | \'viewer\';\n\n'}
        {'const permissions: Record<Role, string[]> = {\n'}
        {'  admin:  [\'read\', \'write\', \'delete\', \'manage_users\'],\n'}
        {'  editor: [\'read\', \'write\'],\n'}
        {'  viewer: [\'read\'],\n'}
        {'};\n\n'}
        {'function requirePermission(permission: string) {\n'}
        {'  return (req: Request, res: Response, next: NextFunction) => {\n'}
        {'    const userRole = req.user?.role as Role;\n'}
        {'    if (!permissions[userRole]?.includes(permission)) {\n'}
        {'      return res.status(403).json({ error: \'Forbidden\' });\n'}
        {'    }\n'}
        {'    next();\n'}
        {'  };\n'}
        {'}\n\n'}
        {'// Usage\n'}
        {'app.delete(\'/api/posts/:id\',\n'}
        {'  authenticate,\n'}
        {'  requirePermission(\'delete\'),\n'}
        {'  deletePostHandler\n'}
        {');'}
      </code></pre>

      {/* ===================== INPUT VALIDATION ===================== */}
      <h2 style={h2Style}>
        {isZh ? '输入验证与数据清洗' : 'Input Validation & Data Sanitization'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '所有用户输入都是不可信的。验证应在服务端强制执行（客户端验证仅为用户体验），并遵循白名单优于黑名单的原则。'
          : 'All user input is untrusted. Validation must be enforced server-side (client-side validation is UX only), and should follow a whitelist-over-blacklist approach.'}
      </p>
      <pre style={preStyle}><code>
        {'// Zod schema validation (TypeScript)\n'}
        {'import { z } from \'zod\';\n\n'}
        {'const CreateUserSchema = z.object({\n'}
        {'  email: z.string().email().max(254),\n'}
        {'  name: z.string().min(1).max(100)\n'}
        {'    .regex(/^[a-zA-Z\\s\\-\']+$/),  // Whitelist chars\n'}
        {'  age: z.number().int().min(13).max(150),\n'}
        {'  role: z.enum([\'user\', \'editor\']),  // Enum whitelist\n'}
        {'  bio: z.string().max(500).optional(),\n'}
        {'});\n\n'}
        {'// In route handler\n'}
        {'app.post(\'/api/users\', (req, res) => {\n'}
        {'  const result = CreateUserSchema.safeParse(req.body);\n'}
        {'  if (!result.success) {\n'}
        {'    return res.status(400).json({\n'}
        {'      error: \'Validation failed\',\n'}
        {'      details: result.error.flatten(),\n'}
        {'    });\n'}
        {'  }\n'}
        {'  // result.data is typed and validated\n'}
        {'  createUser(result.data);\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '输入验证清单' : 'Input Validation Checklist'}</h3>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}>{isZh ? '验证类型、长度、范围和格式' : 'Validate type, length, range, and format'}</li>
        <li style={liStyle}>{isZh ? '使用白名单（允许列表）而非黑名单' : 'Use allowlists (whitelists) over blocklists'}</li>
        <li style={liStyle}>{isZh ? '验证 Content-Type 头' : 'Validate Content-Type headers'}</li>
        <li style={liStyle}>{isZh ? '对 HTML 输出进行上下文感知编码' : 'Apply context-aware encoding for HTML output'}</li>
        <li style={liStyle}>{isZh ? '规范化 Unicode 后再验证' : 'Normalize Unicode before validation'}</li>
        <li style={liStyle}>{isZh ? '限制文件上传类型、大小和存储位置' : 'Restrict file upload types, sizes, and storage locations'}</li>
        <li style={liStyle}>{isZh ? '服务端验证不可被绕过——客户端验证仅为辅助' : 'Server-side validation cannot be bypassed — client-side is supplementary'}</li>
      </ul>

      {/* ===================== XSS PREVENTION ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'XSS 防护（跨站脚本攻击）' : 'XSS Prevention (Cross-Site Scripting)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'XSS 攻击通过在页面中注入恶意脚本来窃取 cookie、劫持会话或重定向用户。防护需要输出编码和 CSP 的多层防御。'
          : 'XSS attacks inject malicious scripts into pages to steal cookies, hijack sessions, or redirect users. Prevention requires defense in depth with output encoding and CSP.'}
      </p>
      <pre style={preStyle}><code>
        {'// Context-aware output encoding\n'}
        {'import DOMPurify from \'dompurify\';\n\n'}
        {'// HTML context — sanitize user-generated HTML\n'}
        {'const safeHTML = DOMPurify.sanitize(userInput, {\n'}
        {'  ALLOWED_TAGS: [\'b\', \'i\', \'em\', \'strong\', \'a\', \'p\'],\n'}
        {'  ALLOWED_ATTR: [\'href\'],\n'}
        {'});\n\n'}
        {'// JavaScript context — NEVER interpolate into JS\n'}
        {'// BAD:  <script>var x = "' + '\\${userInput}' + '";</script>\n'}
        {'// GOOD: Pass data via data attributes or JSON\n\n'}
        {'// URL context — validate scheme\n'}
        {'function isSafeUrl(url: string): boolean {\n'}
        {'  try {\n'}
        {'    const parsed = new URL(url);\n'}
        {'    return [\'http:\', \'https:\'].includes(parsed.protocol);\n'}
        {'  } catch {\n'}
        {'    return false;\n'}
        {'  }\n'}
        {'}'}
      </code></pre>

      {/* ===================== CSRF PREVENTION ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'CSRF 防护（跨站请求伪造）' : 'CSRF Prevention (Cross-Site Request Forgery)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CSRF 攻击诱导已认证用户执行非预期操作。现代防护结合 SameSite Cookie 和 CSRF Token 实现双重保护。'
          : 'CSRF attacks trick authenticated users into performing unintended actions. Modern prevention combines SameSite cookies with CSRF tokens for double protection.'}
      </p>
      <pre style={preStyle}><code>
        {'// Express.js CSRF protection setup\n'}
        {'import csrf from \'csurf\';\n'}
        {'import cookieParser from \'cookie-parser\';\n\n'}
        {'app.use(cookieParser());\n\n'}
        {'// Cookie settings for session\n'}
        {'app.use(session({\n'}
        {'  cookie: {\n'}
        {'    httpOnly: true,      // No JS access\n'}
        {'    secure: true,        // HTTPS only\n'}
        {'    sameSite: \'lax\',     // CSRF protection layer 1\n'}
        {'    maxAge: 3600000,     // 1 hour\n'}
        {'  },\n'}
        {'  // ... session store config\n'}
        {'}));\n\n'}
        {'// CSRF token middleware (layer 2)\n'}
        {'const csrfProtection = csrf({ cookie: true });\n'}
        {'app.use(csrfProtection);\n\n'}
        {'// Provide token to client\n'}
        {'app.get(\'/form\', (req, res) => {\n'}
        {'  res.render(\'form\', { csrfToken: req.csrfToken() });\n'}
        {'});\n\n'}
        {'// Token auto-validated on POST/PUT/DELETE\n'}
        {'app.post(\'/transfer\', (req, res) => {\n'}
        {'  // csrfProtection already verified the token\n'}
        {'  processTransfer(req.body);\n'}
        {'});'}
      </code></pre>

      {/* ===================== SQL INJECTION ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'SQL 注入防护' : 'SQL Injection Prevention'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'SQL 注入允许攻击者执行任意数据库查询。唯一可靠的防护是参数化查询——永远不要字符串拼接。'
          : 'SQL injection allows attackers to execute arbitrary database queries. The only reliable defense is parameterized queries — never string concatenation.'}
      </p>
      <pre style={preStyle}><code>
        {'// VULNERABLE — never do this\n'}
        {'const query = `SELECT * FROM users WHERE id = ' + "\\${userId}" + '`;\n\n'}
        {'// SAFE — parameterized query (node-postgres)\n'}
        {'const { rows } = await pool.query(\n'}
        {'  \'SELECT * FROM users WHERE id = $1 AND org_id = $2\',\n'}
        {'  [userId, orgId]\n'}
        {');\n\n'}
        {'// SAFE — ORM (Prisma)\n'}
        {'const user = await prisma.user.findUnique({\n'}
        {'  where: { id: userId },\n'}
        {'  select: { id: true, name: true, email: true },\n'}
        {'});\n\n'}
        {'// SAFE — Query builder (Knex)\n'}
        {'const users = await knex(\'users\')\n'}
        {'  .where({ org_id: orgId })\n'}
        {'  .andWhere(\'created_at\', \'>\', since)\n'}
        {'  .select(\'id\', \'name\', \'email\');'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '数据库安全加固' : 'Database Security Hardening'}</h3>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}>{isZh ? '最小权限原则——应用账户只授予必要权限' : 'Least privilege — application accounts get only needed permissions'}</li>
        <li style={liStyle}>{isZh ? '只读副本用于报表查询' : 'Use read replicas for reporting queries'}</li>
        <li style={liStyle}>{isZh ? '启用查询日志和慢查询告警' : 'Enable query logging and slow-query alerting'}</li>
        <li style={liStyle}>{isZh ? '网络隔离——数据库不暴露到公网' : 'Network segmentation — databases never exposed to public internet'}</li>
        <li style={liStyle}>{isZh ? '加密连接（require SSL/TLS）' : 'Encrypted connections (require SSL/TLS)'}</li>
      </ul>

      {/* ===================== SECRETS MANAGEMENT ===================== */}
      <h2 style={h2Style}>
        {isZh ? '密钥与凭证管理' : 'Secrets & Credential Management'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '泄露的密钥是最常见的安全事件之一。GitHub 每天检测到数千个泄露的密钥。正确的密钥管理是安全基础设施的核心。'
          : 'Leaked secrets are among the most common security incidents. GitHub detects thousands of leaked secrets daily. Proper secrets management is foundational to secure infrastructure.'}
      </p>
      <pre style={preStyle}><code>
        {'# .gitignore — MUST include these\n'}
        {'.env\n'}
        {'.env.*\n'}
        {'*.pem\n'}
        {'*.key\n'}
        {'*.p12\n'}
        {'credentials.json\n'}
        {'service-account.json\n\n'}
        {'# Pre-commit hook for secret detection\n'}
        {'# Install: pip install detect-secrets\n'}
        {'# .pre-commit-config.yaml\n'}
        {'repos:\n'}
        {'  - repo: https://github.com/Yelp/detect-secrets\n'}
        {'    rev: v1.4.0\n'}
        {'    hooks:\n'}
        {'      - id: detect-secrets\n'}
        {'        args: [\'--baseline\', \'.secrets.baseline\']'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '密钥管理方案对比' : 'Secrets Management Solutions'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '方案' : 'Solution'}</th>
            <th style={thStyle}>{isZh ? '类型' : 'Type'}</th>
            <th style={thStyle}>{isZh ? '适用场景' : 'Best For'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>HashiCorp Vault</td><td style={tdStyle}>{isZh ? '自托管/云' : 'Self-hosted/Cloud'}</td><td style={tdStyle}>{isZh ? '大型组织、动态密钥' : 'Large orgs, dynamic secrets'}</td></tr>
          <tr><td style={tdStyle}>AWS Secrets Manager</td><td style={tdStyle}>{isZh ? '云原生' : 'Cloud-native'}</td><td style={tdStyle}>{isZh ? 'AWS 生态系统' : 'AWS ecosystem'}</td></tr>
          <tr><td style={tdStyle}>GCP Secret Manager</td><td style={tdStyle}>{isZh ? '云原生' : 'Cloud-native'}</td><td style={tdStyle}>{isZh ? 'GCP 生态系统' : 'GCP ecosystem'}</td></tr>
          <tr><td style={tdStyle}>Azure Key Vault</td><td style={tdStyle}>{isZh ? '云原生' : 'Cloud-native'}</td><td style={tdStyle}>{isZh ? 'Azure 生态系统' : 'Azure ecosystem'}</td></tr>
          <tr><td style={tdStyle}>SOPS + Age</td><td style={tdStyle}>{isZh ? '文件加密' : 'File encryption'}</td><td style={tdStyle}>{isZh ? 'GitOps、小团队' : 'GitOps, small teams'}</td></tr>
          <tr><td style={tdStyle}>Doppler</td><td style={tdStyle}>{isZh ? 'SaaS' : 'SaaS'}</td><td style={tdStyle}>{isZh ? '多环境密钥同步' : 'Multi-env secret syncing'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>
        {'// Fetching secrets at runtime (Node.js + AWS)\n'}
        {'import { SecretsManagerClient,\n'}
        {'  GetSecretValueCommand } from \'@aws-sdk/client-secrets-manager\';\n\n'}
        {'const client = new SecretsManagerClient({ region: \'us-east-1\' });\n\n'}
        {'async function getSecret(name: string): Promise<string> {\n'}
        {'  const cmd = new GetSecretValueCommand({\n'}
        {'    SecretId: name,\n'}
        {'  });\n'}
        {'  const resp = await client.send(cmd);\n'}
        {'  return resp.SecretString ?? \'\';\n'}
        {'}\n\n'}
        {'// Usage — never hardcode secrets\n'}
        {'const dbPassword = await getSecret(\'prod/db/password\');'}
      </code></pre>

      {/* ===================== DEPENDENCY SCANNING ===================== */}
      <h2 style={h2Style}>
        {isZh ? '依赖扫描与 SCA' : 'Dependency Scanning & SCA'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '软件供应链攻击日益增多。每个依赖都是潜在的攻击面。自动化依赖扫描应在每次 CI 构建中运行。'
          : 'Software supply chain attacks are increasing. Every dependency is a potential attack surface. Automated dependency scanning should run on every CI build.'}
      </p>
      <pre style={preStyle}><code>
        {'# npm audit — built-in Node.js\n'}
        {'npm audit --production\n'}
        {'npm audit fix\n\n'}
        {'# Snyk — comprehensive SCA\n'}
        {'npx snyk test\n'}
        {'npx snyk monitor  # continuous monitoring\n\n'}
        {'# pip-audit — Python\n'}
        {'pip-audit --require-hashes\n\n'}
        {'# cargo audit — Rust\n'}
        {'cargo install cargo-audit\n'}
        {'cargo audit\n\n'}
        {'# Trivy — container + filesystem\n'}
        {'trivy fs --severity HIGH,CRITICAL .\n'}
        {'trivy image myapp:latest'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '供应链安全策略' : 'Supply Chain Security Strategies'}</h3>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}>{isZh ? '锁定依赖版本（package-lock.json, yarn.lock）' : 'Pin dependency versions (package-lock.json, yarn.lock)'}</li>
        <li style={liStyle}>{isZh ? '启用 Dependabot 或 Renovate 自动更新' : 'Enable Dependabot or Renovate for automated updates'}</li>
        <li style={liStyle}>{isZh ? '审查新依赖的维护状态和安全历史' : 'Review new dependencies for maintenance status and security history'}</li>
        <li style={liStyle}>{isZh ? '使用 Socket.dev 检测可疑包行为' : 'Use Socket.dev to detect suspicious package behavior'}</li>
        <li style={liStyle}>{isZh ? '考虑私有注册表（Verdaccio, Artifactory）' : 'Consider private registries (Verdaccio, Artifactory)'}</li>
        <li style={liStyle}>{isZh ? '验证包签名（npm provenance, sigstore）' : 'Verify package signatures (npm provenance, sigstore)'}</li>
      </ul>

      {/* ===================== CSP ===================== */}
      <h2 style={h2Style}>
        {isZh ? '内容安全策略（CSP）' : 'Content Security Policy (CSP)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CSP 是防止 XSS 最有效的 HTTP 头之一。它指定浏览器允许加载哪些资源来源，从根本上限制脚本注入的影响。'
          : 'CSP is one of the most effective HTTP headers for preventing XSS. It specifies which resource origins the browser is allowed to load, fundamentally limiting the impact of script injection.'}
      </p>
      <pre style={preStyle}><code>
        {'# Strict CSP — recommended starting point\n'}
        {'Content-Security-Policy:\n'}
        {'  default-src \'self\';\n'}
        {'  script-src \'self\' \'nonce-{RANDOM}\';\n'}
        {'  style-src \'self\' \'unsafe-inline\';\n'}
        {'  img-src \'self\' data: https:;\n'}
        {'  font-src \'self\';\n'}
        {'  connect-src \'self\' https://api.myapp.com;\n'}
        {'  frame-ancestors \'none\';\n'}
        {'  base-uri \'self\';\n'}
        {'  form-action \'self\';\n'}
        {'  upgrade-insecure-requests;\n\n'}
        {'# Nonce-based CSP in Express.js\n'}
        {'import crypto from \'crypto\';\n\n'}
        {'app.use((req, res, next) => {\n'}
        {'  const nonce = crypto.randomBytes(16).toString(\'base64\');\n'}
        {'  res.locals.cspNonce = nonce;\n'}
        {'  res.setHeader(\'Content-Security-Policy\',\n'}
        {'    `default-src \'self\'; ` +\n'}
        {'    `script-src \'self\' \'nonce-' + '\\${nonce}' + '\'; ` +\n'}
        {'    `style-src \'self\' \'unsafe-inline\'; ` +\n'}
        {'    `img-src \'self\' data: https:;`\n'}
        {'  );\n'}
        {'  next();\n'}
        {'});'}
      </code></pre>

      {/* ===================== CORS ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'CORS 跨域资源共享' : 'CORS (Cross-Origin Resource Sharing)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'CORS 控制哪些外部域可以访问您的 API。配置不当的 CORS 策略是常见的安全漏洞。'
          : 'CORS controls which external domains can access your API. Misconfigured CORS policies are a common security vulnerability.'}
      </p>
      <pre style={preStyle}><code>
        {'// Secure CORS configuration (Express.js)\n'}
        {'import cors from \'cors\';\n\n'}
        {'// NEVER use: cors({ origin: \'*\' }) for authenticated APIs\n\n'}
        {'const allowedOrigins = [\n'}
        {'  \'https://myapp.com\',\n'}
        {'  \'https://admin.myapp.com\',\n'}
        {'];\n\n'}
        {'app.use(cors({\n'}
        {'  origin: (origin, callback) => {\n'}
        {'    if (!origin || allowedOrigins.includes(origin)) {\n'}
        {'      callback(null, true);\n'}
        {'    } else {\n'}
        {'      callback(new Error(\'Not allowed by CORS\'));\n'}
        {'    }\n'}
        {'  },\n'}
        {'  methods: [\'GET\', \'POST\', \'PUT\', \'DELETE\'],\n'}
        {'  allowedHeaders: [\'Content-Type\', \'Authorization\'],\n'}
        {'  credentials: true,     // Allow cookies\n'}
        {'  maxAge: 86400,         // Preflight cache: 24h\n'}
        {'}));'}
      </code></pre>

      {/* ===================== API SECURITY ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'API 安全' : 'API Security'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'API 是现代应用的核心攻击面。安全的 API 需要认证、授权、速率限制、输入验证和适当的错误处理。'
          : 'APIs are the primary attack surface of modern applications. Secure APIs require authentication, authorization, rate limiting, input validation, and proper error handling.'}
      </p>
      <pre style={preStyle}><code>
        {'// Rate limiting with sliding window (Express)\n'}
        {'import rateLimit from \'express-rate-limit\';\n\n'}
        {'// Global rate limit\n'}
        {'const globalLimiter = rateLimit({\n'}
        {'  windowMs: 15 * 60 * 1000,  // 15 minutes\n'}
        {'  max: 100,                   // 100 requests per window\n'}
        {'  standardHeaders: true,\n'}
        {'  legacyHeaders: false,\n'}
        {'});\n\n'}
        {'// Strict limit for auth endpoints\n'}
        {'const authLimiter = rateLimit({\n'}
        {'  windowMs: 15 * 60 * 1000,\n'}
        {'  max: 5,                     // 5 attempts per 15 min\n'}
        {'  skipSuccessfulRequests: true,\n'}
        {'});\n\n'}
        {'app.use(\'/api/\', globalLimiter);\n'}
        {'app.use(\'/api/auth/login\', authLimiter);\n'}
        {'app.use(\'/api/auth/register\', authLimiter);'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'API 安全清单' : 'API Security Checklist'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '层面' : 'Layer'}</th>
            <th style={thStyle}>{isZh ? '措施' : 'Measure'}</th>
            <th style={thStyle}>{isZh ? '工具/方法' : 'Tools/Methods'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '认证' : 'Authentication'}</td><td style={tdStyle}>OAuth 2.0 / JWT</td><td style={tdStyle}>Auth0, Clerk, Keycloak</td></tr>
          <tr><td style={tdStyle}>{isZh ? '授权' : 'Authorization'}</td><td style={tdStyle}>RBAC / ABAC</td><td style={tdStyle}>Casbin, OPA, Cedar</td></tr>
          <tr><td style={tdStyle}>{isZh ? '速率限制' : 'Rate Limiting'}</td><td style={tdStyle}>{isZh ? '滑动窗口 / 令牌桶' : 'Sliding window / Token bucket'}</td><td style={tdStyle}>express-rate-limit, Redis</td></tr>
          <tr><td style={tdStyle}>{isZh ? '输入验证' : 'Input Validation'}</td><td style={tdStyle}>{isZh ? 'Schema 验证' : 'Schema validation'}</td><td style={tdStyle}>Zod, Joi, AJV</td></tr>
          <tr><td style={tdStyle}>{isZh ? '请求限制' : 'Request Limits'}</td><td style={tdStyle}>{isZh ? '负载大小、查询深度' : 'Payload size, query depth'}</td><td style={tdStyle}>body-parser, graphql-depth-limit</td></tr>
          <tr><td style={tdStyle}>{isZh ? '日志审计' : 'Audit Logging'}</td><td style={tdStyle}>{isZh ? '结构化日志' : 'Structured logging'}</td><td style={tdStyle}>Winston, Pino, ELK</td></tr>
        </tbody>
      </table>

      {/* ===================== ENCRYPTION ===================== */}
      <h2 style={h2Style}>
        {isZh ? '加密：静态与传输' : 'Encryption: At Rest & In Transit'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '加密保护数据免受未授权访问。传输加密（TLS）保护网络通信，静态加密保护存储的数据。两者都是合规要求（GDPR、HIPAA、PCI DSS）的基础。'
          : 'Encryption protects data from unauthorized access. Transit encryption (TLS) protects network communication, while at-rest encryption protects stored data. Both are foundational for compliance (GDPR, HIPAA, PCI DSS).'}
      </p>

      <h3 style={h3Style}>{isZh ? '传输加密（TLS）' : 'Encryption In Transit (TLS)'}</h3>
      <pre style={preStyle}><code>
        {'# Nginx TLS 1.3 configuration\n'}
        {'server {\n'}
        {'  listen 443 ssl http2;\n'}
        {'  server_name myapp.com;\n\n'}
        {'  ssl_certificate     /etc/letsencrypt/live/myapp.com/fullchain.pem;\n'}
        {'  ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;\n\n'}
        {'  ssl_protocols TLSv1.2 TLSv1.3;\n'}
        {'  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:\n'}
        {'            ECDHE-RSA-AES128-GCM-SHA256:\n'}
        {'            ECDHE-ECDSA-AES256-GCM-SHA384:\n'}
        {'            ECDHE-RSA-AES256-GCM-SHA384;\n'}
        {'  ssl_prefer_server_ciphers off;\n\n'}
        {'  # HSTS — force HTTPS for 2 years\n'}
        {'  add_header Strict-Transport-Security\n'}
        {'    "max-age=63072000; includeSubDomains; preload" always;\n'}
        {'}'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '静态加密' : 'Encryption At Rest'}</h3>
      <pre style={preStyle}><code>
        {'// AES-256-GCM encryption (Node.js)\n'}
        {'import crypto from \'crypto\';\n\n'}
        {'const ALGORITHM = \'aes-256-gcm\';\n\n'}
        {'interface EncryptedData {\n'}
        {'  iv: string;\n'}
        {'  tag: string;\n'}
        {'  ciphertext: string;\n'}
        {'}\n\n'}
        {'function encrypt(plaintext: string, key: Buffer): EncryptedData {\n'}
        {'  const iv = crypto.randomBytes(12); // 96-bit IV for GCM\n'}
        {'  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);\n'}
        {'  let ciphertext = cipher.update(plaintext, \'utf8\', \'hex\');\n'}
        {'  ciphertext += cipher.final(\'hex\');\n'}
        {'  return {\n'}
        {'    iv: iv.toString(\'hex\'),\n'}
        {'    tag: cipher.getAuthTag().toString(\'hex\'),\n'}
        {'    ciphertext,\n'}
        {'  };\n'}
        {'}\n\n'}
        {'function decrypt(data: EncryptedData, key: Buffer): string {\n'}
        {'  const decipher = crypto.createDecipheriv(\n'}
        {'    ALGORITHM, key,\n'}
        {'    Buffer.from(data.iv, \'hex\')\n'}
        {'  );\n'}
        {'  decipher.setAuthTag(Buffer.from(data.tag, \'hex\'));\n'}
        {'  let plaintext = decipher.update(data.ciphertext, \'hex\', \'utf8\');\n'}
        {'  plaintext += decipher.final(\'utf8\');\n'}
        {'  return plaintext;\n'}
        {'}'}
      </code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
            <th style={thStyle}>{isZh ? '推荐算法' : 'Recommended Algorithm'}</th>
            <th style={thStyle}>{isZh ? '注意事项' : 'Notes'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '密码哈希' : 'Password hashing'}</td><td style={tdStyle}>Argon2id / bcrypt</td><td style={tdStyle}>{isZh ? '不可逆，带盐' : 'Irreversible, salted'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '对称加密' : 'Symmetric encryption'}</td><td style={tdStyle}>AES-256-GCM</td><td style={tdStyle}>{isZh ? '认证加密，防篡改' : 'Authenticated encryption, tamper-proof'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '非对称加密' : 'Asymmetric encryption'}</td><td style={tdStyle}>RSA-OAEP / X25519</td><td style={tdStyle}>{isZh ? '密钥交换、数字签名' : 'Key exchange, digital signatures'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '数据完整性' : 'Data integrity'}</td><td style={tdStyle}>HMAC-SHA256</td><td style={tdStyle}>{isZh ? '验证未被篡改' : 'Verify no tampering'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '令牌签名' : 'Token signing'}</td><td style={tdStyle}>EdDSA / RS256</td><td style={tdStyle}>{isZh ? 'JWT、API 签名' : 'JWTs, API signatures'}</td></tr>
        </tbody>
      </table>

      {/* ===================== SECURITY HEADERS ===================== */}
      <h2 style={h2Style}>
        {isZh ? '安全头配置' : 'Security Headers Configuration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '安全头是最简单但最有效的防御手段之一。正确配置的安全头可以防止大量常见攻击。'
          : 'Security headers are among the simplest yet most effective defenses. Properly configured security headers prevent a wide range of common attacks.'}
      </p>
      <pre style={preStyle}><code>
        {'// Comprehensive security headers middleware\n'}
        {'import helmet from \'helmet\';\n\n'}
        {'app.use(helmet({\n'}
        {'  contentSecurityPolicy: {\n'}
        {'    directives: {\n'}
        {'      defaultSrc: ["\'self\'"],\n'}
        {'      scriptSrc: ["\'self\'"],\n'}
        {'      styleSrc: ["\'self\'", "\'unsafe-inline\'"],\n'}
        {'      imgSrc: ["\'self\'", "data:", "https:"],\n'}
        {'      connectSrc: ["\'self\'"],\n'}
        {'      fontSrc: ["\'self\'"],\n'}
        {'      frameAncestors: ["\'none\'"],\n'}
        {'    },\n'}
        {'  },\n'}
        {'  hsts: {\n'}
        {'    maxAge: 63072000,  // 2 years\n'}
        {'    includeSubDomains: true,\n'}
        {'    preload: true,\n'}
        {'  },\n'}
        {'  referrerPolicy: {\n'}
        {'    policy: \'strict-origin-when-cross-origin\',\n'}
        {'  },\n'}
        {'}));\n\n'}
        {'// Additional headers not covered by Helmet\n'}
        {'app.use((req, res, next) => {\n'}
        {'  res.setHeader(\'Permissions-Policy\',\n'}
        {'    \'camera=(), microphone=(), geolocation=()\');\n'}
        {'  res.setHeader(\'X-Permitted-Cross-Domain-Policies\', \'none\');\n'}
        {'  next();\n'}
        {'});'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? '安全头参考表' : 'Security Headers Reference'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '头名称' : 'Header'}</th>
            <th style={thStyle}>{isZh ? '推荐值' : 'Recommended Value'}</th>
            <th style={thStyle}>{isZh ? '防护' : 'Protects Against'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Strict-Transport-Security</td><td style={tdStyle}>max-age=63072000; includeSubDomains; preload</td><td style={tdStyle}>{isZh ? '降级攻击、中间人' : 'Downgrade attacks, MITM'}</td></tr>
          <tr><td style={tdStyle}>Content-Security-Policy</td><td style={tdStyle}>{isZh ? '见上方 CSP 章节' : 'See CSP section above'}</td><td style={tdStyle}>XSS, {isZh ? '数据注入' : 'data injection'}</td></tr>
          <tr><td style={tdStyle}>X-Content-Type-Options</td><td style={tdStyle}>nosniff</td><td style={tdStyle}>{isZh ? 'MIME 类型嗅探' : 'MIME-type sniffing'}</td></tr>
          <tr><td style={tdStyle}>X-Frame-Options</td><td style={tdStyle}>DENY</td><td style={tdStyle}>{isZh ? '点击劫持' : 'Clickjacking'}</td></tr>
          <tr><td style={tdStyle}>Referrer-Policy</td><td style={tdStyle}>strict-origin-when-cross-origin</td><td style={tdStyle}>{isZh ? '信息泄露' : 'Information leakage'}</td></tr>
          <tr><td style={tdStyle}>Permissions-Policy</td><td style={tdStyle}>camera=(), microphone=(), geolocation=()</td><td style={tdStyle}>{isZh ? '功能滥用' : 'Feature abuse'}</td></tr>
          <tr><td style={tdStyle}>Cache-Control</td><td style={tdStyle}>no-store (sensitive pages)</td><td style={tdStyle}>{isZh ? '缓存中毒、数据泄露' : 'Cache poisoning, data leaks'}</td></tr>
        </tbody>
      </table>

      {/* ===================== DEVSECOPS CI/CD ===================== */}
      <h2 style={h2Style}>
        {isZh ? 'DevSecOps CI/CD 集成' : 'DevSecOps CI/CD Integration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'DevSecOps 将安全检查嵌入开发流程的每个阶段，实现"左移安全"——尽早发现并修复漏洞，成本最低。'
          : 'DevSecOps embeds security checks into every stage of the development workflow, achieving "shift-left security" — finding and fixing vulnerabilities as early as possible when the cost is lowest.'}
      </p>
      <pre style={preStyle}><code>
        {'# GitHub Actions — security pipeline\n'}
        {'name: Security Pipeline\n'}
        {'on: [push, pull_request]\n\n'}
        {'jobs:\n'}
        {'  secret-scan:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'        with:\n'}
        {'          fetch-depth: 0\n'}
        {'      - uses: trufflesecurity/trufflehog@main\n'}
        {'        with:\n'}
        {'          extra_args: --only-verified\n\n'}
        {'  sast:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - uses: returntocorp/semgrep-action@v1\n'}
        {'        with:\n'}
        {'          config: >-\n'}
        {'            p/security-audit\n'}
        {'            p/owasp-top-ten\n\n'}
        {'  dependency-scan:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - run: npm ci\n'}
        {'      - run: npm audit --audit-level=high\n'}
        {'      - uses: snyk/actions/node@master\n'}
        {'        env:\n'}
        {'          SNYK_TOKEN: ' + '\\${{ secrets.SNYK_TOKEN }}\n\n'}
        {'  container-scan:\n'}
        {'    runs-on: ubuntu-latest\n'}
        {'    steps:\n'}
        {'      - uses: actions/checkout@v4\n'}
        {'      - run: docker build -t myapp:test .\n'}
        {'      - uses: aquasecurity/trivy-action@master\n'}
        {'        with:\n'}
        {'          image-ref: myapp:test\n'}
        {'          severity: HIGH,CRITICAL\n'}
        {'          exit-code: 1'}
      </code></pre>

      <h3 style={h3Style}>{isZh ? 'DevSecOps 工具链' : 'DevSecOps Toolchain'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '阶段' : 'Stage'}</th>
            <th style={thStyle}>{isZh ? '工具' : 'Tools'}</th>
            <th style={thStyle}>{isZh ? '检查内容' : 'Checks'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '提交前' : 'Pre-commit'}</td><td style={tdStyle}>detect-secrets, git-secrets, truffleHog</td><td style={tdStyle}>{isZh ? '密钥泄露检测' : 'Secret leak detection'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '静态分析' : 'SAST'}</td><td style={tdStyle}>Semgrep, CodeQL, SonarQube</td><td style={tdStyle}>{isZh ? '代码漏洞模式' : 'Code vulnerability patterns'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '依赖扫描' : 'SCA'}</td><td style={tdStyle}>Snyk, npm audit, Dependabot</td><td style={tdStyle}>{isZh ? '已知 CVE 漏洞' : 'Known CVE vulnerabilities'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '容器扫描' : 'Container Scan'}</td><td style={tdStyle}>Trivy, Grype, Snyk Container</td><td style={tdStyle}>{isZh ? '镜像漏洞和配置' : 'Image vulnerabilities and config'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? 'IaC 扫描' : 'IaC Scan'}</td><td style={tdStyle}>Checkov, tfsec, KICS</td><td style={tdStyle}>{isZh ? '基础设施配置错误' : 'Infra misconfiguration'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '动态测试' : 'DAST'}</td><td style={tdStyle}>OWASP ZAP, Burp Suite, Nuclei</td><td style={tdStyle}>{isZh ? '运行时漏洞' : 'Runtime vulnerabilities'}</td></tr>
        </tbody>
      </table>

      {/* ===================== SECURITY ARCHITECTURE ===================== */}
      <h2 style={h2Style}>
        {isZh ? '安全架构模式' : 'Security Architecture Patterns'}
      </h2>

      <h3 style={h3Style}>{isZh ? '零信任架构' : 'Zero Trust Architecture'}</h3>
      <p style={pStyle}>
        {isZh
          ? '零信任的核心原则是"永不信任，始终验证"。每个请求都必须经过认证、授权和加密，无论来源是内部还是外部。'
          : 'The core principle of Zero Trust is "never trust, always verify." Every request must be authenticated, authorized, and encrypted, regardless of whether it originates from inside or outside the network.'}
      </p>
      <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
        <li style={liStyle}>{isZh ? '微分段——服务之间使用 mTLS 通信' : 'Micro-segmentation — services communicate via mTLS'}</li>
        <li style={liStyle}>{isZh ? '每次请求都验证身份和权限' : 'Verify identity and permissions on every request'}</li>
        <li style={liStyle}>{isZh ? '最小权限访问——仅授予必要的权限' : 'Least privilege access — grant only what is needed'}</li>
        <li style={liStyle}>{isZh ? '持续监控和日志——假设已被入侵' : 'Continuous monitoring and logging — assume breach'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '威胁建模（STRIDE）' : 'Threat Modeling (STRIDE)'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '威胁' : 'Threat'}</th>
            <th style={thStyle}>{isZh ? '含义' : 'Meaning'}</th>
            <th style={thStyle}>{isZh ? '缓解措施' : 'Mitigation'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Spoofing</td><td style={tdStyle}>{isZh ? '冒充身份' : 'Impersonating identity'}</td><td style={tdStyle}>{isZh ? '强认证、MFA' : 'Strong auth, MFA'}</td></tr>
          <tr><td style={tdStyle}>Tampering</td><td style={tdStyle}>{isZh ? '篡改数据' : 'Modifying data'}</td><td style={tdStyle}>{isZh ? '完整性校验、签名' : 'Integrity checks, signatures'}</td></tr>
          <tr><td style={tdStyle}>Repudiation</td><td style={tdStyle}>{isZh ? '否认操作' : 'Denying actions'}</td><td style={tdStyle}>{isZh ? '审计日志、不可否认性' : 'Audit logs, non-repudiation'}</td></tr>
          <tr><td style={tdStyle}>Info Disclosure</td><td style={tdStyle}>{isZh ? '信息泄露' : 'Exposing information'}</td><td style={tdStyle}>{isZh ? '加密、访问控制' : 'Encryption, access control'}</td></tr>
          <tr><td style={tdStyle}>DoS</td><td style={tdStyle}>{isZh ? '拒绝服务' : 'Denial of service'}</td><td style={tdStyle}>{isZh ? '速率限制、CDN、弹性伸缩' : 'Rate limiting, CDN, auto-scaling'}</td></tr>
          <tr><td style={tdStyle}>Elevation</td><td style={tdStyle}>{isZh ? '权限提升' : 'Privilege escalation'}</td><td style={tdStyle}>{isZh ? 'RBAC、最小权限' : 'RBAC, least privilege'}</td></tr>
        </tbody>
      </table>

      {/* ===================== SECURITY MONITORING ===================== */}
      <h2 style={h2Style}>
        {isZh ? '安全日志与监控' : 'Security Logging & Monitoring'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '没有日志和监控，安全事件无法被检测和响应。结构化日志和实时告警是安全运营的基础。'
          : 'Without logging and monitoring, security incidents cannot be detected or responded to. Structured logging and real-time alerting are the foundation of security operations.'}
      </p>
      <pre style={preStyle}><code>
        {'// Structured security logging (Pino)\n'}
        {'import pino from \'pino\';\n\n'}
        {'const logger = pino({\n'}
        {'  level: \'info\',\n'}
        {'  redact: [\'req.headers.authorization\',\n'}
        {'           \'req.headers.cookie\',\n'}
        {'           \'body.password\'],  // Never log secrets\n'}
        {'});\n\n'}
        {'// Security event logging\n'}
        {'function logSecurityEvent(event: {\n'}
        {'  type: string;\n'}
        {'  userId?: string;\n'}
        {'  ip: string;\n'}
        {'  details: string;\n'}
        {'  severity: \'low\' | \'medium\' | \'high\' | \'critical\';\n'}
        {'}) {\n'}
        {'  logger.warn({\n'}
        {'    securityEvent: true,\n'}
        {'    ...event,\n'}
        {'    timestamp: new Date().toISOString(),\n'}
        {'  });\n'}
        {'}\n\n'}
        {'// Example: log failed authentication\n'}
        {'logSecurityEvent({\n'}
        {'  type: \'AUTH_FAILURE\',\n'}
        {'  ip: req.ip,\n'}
        {'  details: \'Invalid credentials for user@example.com\',\n'}
        {'  severity: \'medium\',\n'}
        {'});'}
      </code></pre>

      {/* ===================== CONCLUSION ===================== */}
      <h2 style={h2Style}>
        {isZh ? '总结：构建安全文化' : 'Conclusion: Building a Security Culture'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '应用安全不是一次性任务，而是持续的工程实践。从 OWASP Top 10 的基础防护到 DevSecOps 的自动化集成，每一层安全措施都为整体防御增加了深度。将安全视为功能而非负担——投入安全的时间将在防止数据泄露和维护用户信任方面带来巨大回报。'
          : 'Application security is not a one-time task but a continuous engineering practice. From the foundational defenses of the OWASP Top 10 to automated DevSecOps integration, every security layer adds depth to your overall defense. Treat security as a feature, not a burden — the time invested in security pays enormous dividends in preventing data breaches and maintaining user trust.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '关键行动清单：1) 立即启用安全头；2) 审计所有 SQL 查询确认使用参数化；3) 配置 CSP；4) 在 CI 中添加依赖扫描；5) 实施密钥管理方案；6) 定期进行威胁建模和渗透测试。安全是旅程，不是终点。'
          : 'Action checklist: 1) Enable security headers now; 2) Audit all SQL queries for parameterization; 3) Configure CSP; 4) Add dependency scanning to CI; 5) Implement a secrets management solution; 6) Conduct regular threat modeling and penetration testing. Security is a journey, not a destination.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
