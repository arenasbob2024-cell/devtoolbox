import Link from 'next/link';

export default function JwtTokenExplained({ lang }: { lang: string }) {
  const t: Record<string, Record<string, string>> = {
    en: {
      title: 'How JWT Works: A Complete Guide to JSON Web Tokens',
      intro: 'JSON Web Tokens (JWT) are the most widely used standard for stateless authentication in modern web applications. This guide explains how JWT works, its structure, security best practices, and common pitfalls.',
      whatTitle: 'What is JWT?',
      whatDesc: 'A JWT is a compact, URL-safe token that carries claims (data) between two parties. It consists of three parts separated by dots: Header.Payload.Signature. The token is Base64URL-encoded, making it suitable for HTTP headers, cookies, and URLs.',
      structureTitle: 'JWT Structure Decoded',
      headerTitle: 'Header',
      headerDesc: 'The header identifies the algorithm used to sign the token:',
      payloadTitle: 'Payload (Claims)',
      payloadDesc: 'The payload contains claims — statements about the user and metadata:',
      signatureTitle: 'Signature',
      signatureDesc: 'The signature ensures the token has not been tampered with:',
      flowTitle: 'How JWT Authentication Works',
      step1: '1. User sends credentials (email/password) to the login endpoint',
      step2: '2. Server verifies credentials against the database',
      step3: '3. Server creates a JWT with user data in the payload and signs it with a secret key',
      step4: '4. Server sends the JWT back to the client',
      step5: '5. Client stores the JWT (httpOnly cookie or memory)',
      step6: '6. Client sends JWT in Authorization header with each request: Bearer <token>',
      step7: '7. Server verifies the signature and extracts user data from the payload',
      vsSessionTitle: 'JWT vs Session-Based Auth',
      claimsTitle: 'Common JWT Claims',
      securityTitle: 'Security Best Practices',
      sec1: 'Always verify signatures — Never trust a JWT without verification. Use a well-tested library.',
      sec2: 'Use short expiration times — Set exp to 15-60 minutes. Use refresh tokens for longer sessions.',
      sec3: 'Store in httpOnly cookies — Prevents XSS attacks from reading the token. Add Secure and SameSite flags.',
      sec4: 'Never store sensitive data in payload — JWT payloads are Base64-encoded, not encrypted. Anyone can decode them.',
      sec5: 'Use strong secrets — For HMAC, use at least 256 bits of randomness. For RSA/EC, use proper key sizes.',
      sec6: 'Implement token revocation — Use a blacklist or short-lived tokens with refresh tokens.',
      vulnTitle: 'Common JWT Vulnerabilities',
      vuln1Title: 'alg: "none" Attack',
      vuln1Desc: 'An attacker modifies the header to use no algorithm. Fix: Always validate the algorithm on the server side. Never accept "none".',
      vuln2Title: 'Secret Key Brute Force',
      vuln2Desc: 'Weak HMAC secrets can be brute-forced with tools like jwt-cracker. Fix: Use at least 256-bit random secrets.',
      vuln3Title: 'Token Replay',
      vuln3Desc: 'A stolen token can be reused until it expires. Fix: Use short expiration, bind to IP/device, implement refresh rotation.',
      implTitle: 'Implementation Example',
      tryTool: 'Decode and inspect any JWT instantly',
      faq1q: 'Is JWT encrypted?',
      faq1a: 'No. Standard JWT (JWS) is only signed, not encrypted. The payload is Base64URL-encoded and can be decoded by anyone. Use JWE (JSON Web Encryption) if you need to hide the payload content.',
      faq2q: 'Should I store JWT in localStorage or cookies?',
      faq2a: 'httpOnly cookies are more secure because JavaScript cannot access them, preventing XSS token theft. localStorage is vulnerable to XSS but easier to implement for SPAs.',
      faq3q: 'How do I handle JWT expiration?',
      faq3a: 'Use a short-lived access token (15-60 min) with a longer-lived refresh token. When the access token expires, use the refresh token to get a new one without re-authentication.',
      faq4q: 'What is the difference between HS256 and RS256?',
      faq4a: 'HS256 (HMAC-SHA256) uses a shared secret for both signing and verification — both parties need the same key. RS256 (RSA-SHA256) uses a private key to sign and a public key to verify — ideal for distributed systems.',
      faq5q: 'Can I revoke a JWT?',
      faq5a: 'JWTs are stateless, so they cannot be directly revoked. Common approaches: maintain a token blacklist, use very short expiration times, or implement a token version/generation system in the database.',
    },
    zh: {
      title: 'JWT 工作原理：JSON Web Token 完全指南',
      intro: 'JSON Web Token (JWT) 是现代 Web 应用中最广泛使用的无状态认证标准。本指南详细解释 JWT 的工作原理、结构、安全最佳实践和常见陷阱。',
      whatTitle: '什么是 JWT？',
      whatDesc: 'JWT 是一种紧凑的、URL 安全的令牌，用于在两方之间传递声明（数据）。它由三部分组成，用点分隔：Header.Payload.Signature。令牌经过 Base64URL 编码，适用于 HTTP 头、Cookie 和 URL。',
      structureTitle: 'JWT 结构解析',
      headerTitle: 'Header（头部）', headerDesc: '头部标识用于签名令牌的算法：',
      payloadTitle: 'Payload（负载/声明）', payloadDesc: '负载包含声明 — 关于用户和元数据的信息：',
      signatureTitle: 'Signature（签名）', signatureDesc: '签名确保令牌未被篡改：',
      flowTitle: 'JWT 认证流程',
      step1: '1. 用户向登录端点发送凭证（邮箱/密码）',
      step2: '2. 服务器验证凭证',
      step3: '3. 服务器用用户数据创建 JWT 并用密钥签名',
      step4: '4. 服务器将 JWT 返回给客户端',
      step5: '5. 客户端存储 JWT（httpOnly cookie 或内存）',
      step6: '6. 客户端在每次请求中通过 Authorization 头发送 JWT',
      step7: '7. 服务器验证签名并从负载中提取用户数据',
      vsSessionTitle: 'JWT vs 基于 Session 的认证',
      claimsTitle: '常见 JWT 声明',
      securityTitle: '安全最佳实践',
      sec1: '始终验证签名 — 不要信任未验证的 JWT。使用经过充分测试的库。',
      sec2: '使用短过期时间 — 将 exp 设置为 15-60 分钟。使用刷新令牌处理更长的会话。',
      sec3: '存储在 httpOnly cookie 中 — 防止 XSS 攻击读取令牌。添加 Secure 和 SameSite 标志。',
      sec4: '不要在负载中存储敏感数据 — JWT 负载是 Base64 编码的，不是加密的。任何人都可以解码。',
      sec5: '使用强密钥 — HMAC 至少使用 256 位随机性。RSA/EC 使用适当的密钥长度。',
      sec6: '实现令牌撤销 — 使用黑名单或短期令牌配合刷新令牌。',
      vulnTitle: '常见 JWT 漏洞',
      vuln1Title: 'alg: "none" 攻击', vuln1Desc: '攻击者修改头部以不使用算法。修复：始终在服务端验证算法，不接受 "none"。',
      vuln2Title: '密钥暴力破解', vuln2Desc: '弱 HMAC 密钥可被暴力破解。修复：至少使用 256 位随机密钥。',
      vuln3Title: '令牌重放', vuln3Desc: '被盗的令牌可在过期前被重用。修复：使用短过期时间，绑定 IP/设备，实现刷新令牌轮换。',
      implTitle: '实现示例',
      tryTool: '即时解码和检查任何 JWT',
      faq1q: 'JWT 是加密的吗？', faq1a: '不是。标准 JWT (JWS) 只是签名，未加密。负载是 Base64URL 编码的，任何人都可以解码。如需隐藏负载内容，使用 JWE。',
      faq2q: '应该将 JWT 存储在 localStorage 还是 cookie 中？', faq2a: 'httpOnly cookie 更安全，因为 JavaScript 无法访问，防止 XSS 窃取令牌。localStorage 容易受 XSS 攻击但更容易实现。',
      faq3q: '如何处理 JWT 过期？', faq3a: '使用短期访问令牌（15-60分钟）配合长期刷新令牌。访问令牌过期时，用刷新令牌获取新的。',
      faq4q: 'HS256 和 RS256 有什么区别？', faq4a: 'HS256 使用共享密钥签名和验证。RS256 使用私钥签名、公钥验证 — 适合分布式系统。',
      faq5q: '可以撤销 JWT 吗？', faq5a: 'JWT 是无状态的，不能直接撤销。常见方法：维护令牌黑名单、使用极短过期时间、或在数据库中实现令牌版本系统。',
    },
  };
  const ct = t[lang] || t['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <h2 style={h2Style}>{ct.whatTitle}</h2>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>{ct.whatDesc}</p>
      <pre style={codeStyle}><code>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

   Header          Payload              Signature
(algorithm)    (user claims)       (verification hash)`}</code></pre>

      <h2 style={h2Style}>{ct.structureTitle}</h2>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' }}>{ct.headerTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 12 }}>{ct.headerDesc}</p>
      <pre style={codeStyle}><code>{`{
  "alg": "HS256",    // Algorithm: HMAC-SHA256
  "typ": "JWT"       // Token type
}`}</code></pre>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#22c55e' }}>{ct.payloadTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 12 }}>{ct.payloadDesc}</p>
      <pre style={codeStyle}><code>{`{
  "sub": "1234567890",      // Subject (user ID)
  "name": "John Doe",       // Custom claim
  "email": "john@example.com",
  "role": "admin",           // Custom claim
  "iss": "https://api.example.com",  // Issuer
  "aud": "https://app.example.com",  // Audience
  "iat": 1516239022,        // Issued at (Unix timestamp)
  "exp": 1516242622         // Expiration (1 hour later)
}`}</code></pre>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#f59e0b' }}>{ct.signatureTitle}</h3>
      <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 12 }}>{ct.signatureDesc}</p>
      <pre style={codeStyle}><code>{`HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret_key
)`}</code></pre>

      <h2 style={h2Style}>{ct.flowTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {[ct.step1, ct.step2, ct.step3, ct.step4, ct.step5, ct.step6, ct.step7].map((step, i) => (
          <div key={i} style={{ padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {step}
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{ct.vsSessionTitle}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>JWT (Token-based)</th>
              <th style={thStyle}>Session (Server-side)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Storage', 'Client-side (cookie/memory)', 'Server-side (database/Redis)'],
              ['Scalability', 'Stateless — scales easily', 'Requires shared session store'],
              ['Server load', 'No DB lookup per request', 'DB/Redis lookup each request'],
              ['Revocation', 'Hard (need blacklist)', 'Easy (delete session)'],
              ['Size', 'Larger (contains claims)', 'Small session ID'],
              ['Mobile-friendly', 'Yes (no cookies needed)', 'Harder without cookies'],
              ['Security', 'Vulnerable if secret leaked', 'Vulnerable to session fixation'],
            ].map(([feature, jwt, session], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jwt}</td>
                <td style={tdStyle}>{session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.claimsTitle}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr><th style={thStyle}>Claim</th><th style={thStyle}>Name</th><th style={thStyle}>Description</th></tr>
          </thead>
          <tbody>
            {[
              ['iss', 'Issuer', 'Who created the token (e.g., your auth server URL)'],
              ['sub', 'Subject', 'The user or entity the token represents (usually user ID)'],
              ['aud', 'Audience', 'Intended recipient (e.g., your API URL)'],
              ['exp', 'Expiration', 'Unix timestamp after which the token is invalid'],
              ['iat', 'Issued At', 'Unix timestamp when the token was created'],
              ['nbf', 'Not Before', 'Token is not valid before this timestamp'],
              ['jti', 'JWT ID', 'Unique identifier to prevent token replay'],
            ].map(([claim, name, desc], i) => (
              <tr key={i}>
                <td style={tdStyle}><code style={{ color: 'var(--accent-blue)' }}>{claim}</code></td>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{name}</td>
                <td style={tdStyle}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.sec1}</li>
        <li>{ct.sec2}</li>
        <li>{ct.sec3}</li>
        <li>{ct.sec4}</li>
        <li>{ct.sec5}</li>
        <li>{ct.sec6}</li>
      </ul>

      <h2 style={h2Style}>{ct.vulnTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.vuln1Title, desc: ct.vuln1Desc, color: '#ef4444' },
          { title: ct.vuln2Title, desc: ct.vuln2Desc, color: '#f59e0b' },
          { title: ct.vuln3Title, desc: ct.vuln3Desc, color: '#8b5cf6' },
        ].map((v, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${v.color}` }}>
            <strong style={{ color: v.color }}>{v.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      <h2 style={h2Style}>{ct.implTitle}</h2>
      <pre style={codeStyle}><code>{`// Node.js with jsonwebtoken library
const jwt = require('jsonwebtoken');

// Sign (create token)
const token = jwt.sign(
  { sub: user.id, name: user.name, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h', issuer: 'https://api.example.com' }
);

// Verify (validate token)
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    issuer: 'https://api.example.com',
    algorithms: ['HS256'],  // Prevent alg switching!
  });
  console.log(decoded.sub); // User ID
} catch (err) {
  // Token is invalid or expired
  console.error('JWT verification failed:', err.message);
}

// Express middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}`}</code></pre>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTool}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/tools/jwt-decoder`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            JWT Decoder →
          </Link>
          <Link href={`/${lang}/tools/base64`} style={{ color: 'var(--accent-blue)', fontWeight: 700, fontSize: 15 }}>
            Base64 Encoder →
          </Link>
        </div>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
