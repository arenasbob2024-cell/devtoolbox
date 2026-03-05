'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'JWT vs Session: Session Management Comparison',
    intro: 'JWT (JSON Web Tokens) and server-side sessions are the two primary approaches for managing user authentication state in web applications. Sessions store state on the server with a session ID in the client cookie, while JWTs store all session data in a self-contained token. Each approach has distinct trade-offs in scalability, security, and complexity.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose sessions for traditional server-rendered apps, strong security requirements, and when you need immediate token revocation. Choose JWT for stateless APIs, microservices, and distributed systems where server-side storage is costly. For modern applications, a hybrid approach often works best.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Sessions store state server-side; JWTs are stateless and self-contained',
    takeaway2: 'Sessions enable immediate revocation; JWT revocation is complex',
    takeaway3: 'JWTs scale horizontally without shared storage',
    takeaway4: 'Sessions have smaller client footprint',
    takeaway5: 'Both need HTTPS and secure cookie handling',
    takeaway6: 'JWT payload is readable by anyone (not encrypted by default)',
    
    whatIsJWTTitle: 'What is JWT?',
    whatIsJWTContent: 'JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. JWTs are self-contained tokens that include claims (user data, metadata) and are cryptographically signed. They are stateless - all information needed to verify the token is contained within it, making them ideal for distributed systems.',
    
    whatIsSessionTitle: 'What is Server-Side Session?',
    whatIsSessionContent: 'Server-side sessions store user authentication state on the server, typically in memory, database, or distributed cache like Redis. The client receives only a session ID (usually in a cookie), which references the stored session data. This approach provides full control over session lifecycle and immediate revocation capability.',
    
    comparisonTitle: 'Architecture Comparison',
    comparisonIntro: 'How each approach handles authentication:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key characteristics:',
    
    codeExampleTitle: 'Implementation Examples',
    codeExampleIntro: 'Code patterns for each approach:',
    
    jwtExampleTitle: 'JWT Implementation',
    sessionExampleTitle: 'Session Implementation',
    
    securityTitle: 'Security Considerations',
    securityIntro: 'Security aspects of each approach:',
    
    useCasesTitle: 'Best Use Cases',
    jwtBestFor: 'JWT is Best For:',
    sessionBestFor: 'Sessions are Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'The JWT vs session debate is not about one being universally better. Sessions excel when you need immediate control, strong security guarantees, and have a manageable user base. JWTs shine in distributed architectures, microservices, and scenarios requiring horizontal scalability. Consider a hybrid approach: use sessions for web apps and short-lived JWTs for API access, or implement refresh token patterns to combine the benefits of both.',
    
    faq1q: 'Can I use both JWT and sessions together?',
    faq1a: 'Yes, many applications use a hybrid approach. For example, maintain a server session for web authentication while issuing JWTs for API access. Or use sessions as the primary mechanism with JWT refresh tokens for mobile apps.',
    
    faq2q: 'How do I invalidate a JWT immediately?',
    faq2a: 'JWTs cannot be truly invalidated without additional infrastructure. Common solutions include: short expiration times with refresh tokens, maintaining a token blacklist/revocation list, using token versions that can be invalidated, or implementing sliding sessions that require re-validation.',
    
    faq3q: 'Are JWTs more secure than sessions?',
    faq3a: 'Neither is inherently more secure. Sessions protect data server-side but require secure session ID handling. JWTs expose claims but protect integrity via signatures. Both need HTTPS, secure cookies, and proper implementation. Sessions offer easier revocation, which can be a security advantage.',
    
    faq4q: 'What about JWT size overhead?',
    faq4a: 'JWTs include all claims in each request, which can be larger than a session ID. However, modern networks handle this overhead well. Consider keeping JWT claims minimal and using reference tokens for large data. Gzip compression in APIs can also help.',
    
    faq5q: 'How do sessions scale across multiple servers?',
    faq5a: 'Sessions require shared storage for horizontal scaling. Options include: sticky sessions (load balancer), session replication between servers, or external session store like Redis. Redis is the most common solution for distributed session storage.',
    
    faq6q: 'Should JWTs be stored in localStorage or cookies?',
    faq6a: 'For web applications, HttpOnly cookies with SameSite attributes are recommended to prevent XSS attacks. localStorage is vulnerable to XSS but easier for SPAs. Never store sensitive data in localStorage. Consider cookie-based JWT storage with CSRF protection.',
    
    faq7q: 'What is the refresh token pattern?',
    faq7a: 'The refresh token pattern uses short-lived access tokens (JWTs) paired with long-lived refresh tokens stored securely. When the access token expires, the refresh token obtains a new one. This provides JWT benefits while enabling token revocation and better security.',
    
    faq8q: 'How does CORS affect JWT vs sessions?',
    faq8a: 'JWTs work well with CORS since they are sent in Authorization headers. Sessions with cookies require credentials: include in fetch and proper CORS configuration. Cross-domain cookies have restrictions, making JWTs sometimes easier for API-only architectures.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'JWT vs Session：会话管理对比',
    intro: 'JWT（JSON Web Tokens）和服务器端会话是管理 Web 应用中用户认证状态的两种主要方法。会话在服务器上存储状态，客户端 cookie 中只有会话 ID，而 JWT 在自包含令牌中存储所有会话数据。每种方法在可扩展性、安全性和复杂性方面都有明显的权衡。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为传统的服务器渲染应用、强安全需求和需要立即令牌撤销的场景选择会话。为无状态 API、微服务和服务器端存储成本高的分布式系统选择 JWT。对于现代应用，混合方法通常效果最好。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '会话在服务器端存储状态；JWT 是无状态和自包含的',
    takeaway2: '会话允许立即撤销；JWT 撤销很复杂',
    takeaway3: 'JWT 可以在没有共享存储的情况下水平扩展',
    takeaway4: '会话的客户端占用更小',
    takeaway5: '两者都需要 HTTPS 和安全的 cookie 处理',
    takeaway6: 'JWT 负载任何人都可以读取（默认不加密）',
    
    whatIsJWTTitle: '什么是 JWT？',
    whatIsJWTContent: 'JSON Web Token (JWT) 是一个开放标准 (RFC 7519)，用于在各方之间安全地传输信息作为 JSON 对象。JWT 是自包含令牌，包含声明（用户数据、元数据）并经过加密签名。它们是无状态的 - 验证令牌所需的所有信息都包含在其中，使其成为分布式系统的理想选择。',
    
    whatIsSessionTitle: '什么是服务器端会话？',
    whatIsSessionContent: '服务器端会话将用户认证状态存储在服务器上，通常在内存、数据库或分布式缓存（如 Redis）中。客户端只接收会话 ID（通常在 cookie 中），它引用存储的会话数据。这种方法提供对会话生命周期的完全控制和立即撤销能力。',
    
    comparisonTitle: '架构对比',
    comparisonIntro: '每种方法如何处理认证：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键特征的并排比较：',
    
    codeExampleTitle: '实现示例',
    codeExampleIntro: '每种方法的代码模式：',
    
    jwtExampleTitle: 'JWT 实现',
    sessionExampleTitle: 'Session 实现',
    
    securityTitle: '安全考虑',
    securityIntro: '每种方法的安全方面：',
    
    useCasesTitle: '最佳用例',
    jwtBestFor: 'JWT 最适合：',
    sessionBestFor: 'Session 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'JWT vs 会话的争论不是关于哪个普遍更好。当你需要立即控制、强安全保证和可管理的用户群时，会话表现出色。JWT 在分布式架构、微服务和需要水平扩展的场景中表现出色。考虑混合方法：为 Web 应用使用会话，为 API 访问使用短期 JWT，或实现刷新令牌模式来结合两者的好处。',
    
    faq1q: '我可以同时使用 JWT 和会话吗？',
    faq1a: '可以，许多应用使用混合方法。例如，为 Web 认证维护服务器会话，同时为 API 访问发布 JWT。或者使用会话作为主要机制，为移动应用使用 JWT 刷新令牌。',
    
    faq2q: '如何立即使 JWT 失效？',
    faq2a: 'JWT 不能在没有额外基础设施的情况下真正失效。常见解决方案包括：短期过期时间配合刷新令牌、维护令牌黑名单/撤销列表、使用可以失效的令牌版本，或实现需要重新验证的滑动会话。',
    
    faq3q: 'JWT 比会话更安全吗？',
    faq3a: '两者都不是天生更安全。会话在服务器端保护数据，但需要安全的会话 ID 处理。JWT 暴露声明，但通过签名保护完整性。两者都需要 HTTPS、安全 cookie 和正确实现。会话提供更容易的撤销，这可以是一个安全优势。',
    
    faq4q: 'JWT 大小开销怎么样？',
    faq4a: 'JWT 在每个请求中包含所有声明，可能比会话 ID 大。然而，现代网络可以很好地处理这个开销。考虑保持 JWT 声明最小化，对大数据使用引用令牌。API 中的 Gzip 压缩也可以帮助。',
    
    faq5q: '会话如何在多个服务器之间扩展？',
    faq5a: '会话需要共享存储才能水平扩展。选项包括：粘性会话（负载均衡器）、服务器之间的会话复制，或外部会话存储如 Redis。Redis 是分布式会话存储最常见的解决方案。',
    
    faq6q: 'JWT 应该存储在 localStorage 还是 cookies 中？',
    faq6a: '对于 Web 应用，推荐使用带 SameSite 属性的 HttpOnly cookies 来防止 XSS 攻击。localStorage 容易受到 XSS 攻击，但对 SPA 来说更容易。永远不要在 localStorage 中存储敏感数据。考虑基于 cookie 的 JWT 存储配合 CSRF 保护。',
    
    faq7q: '什么是刷新令牌模式？',
    faq7a: '刷新令牌模式使用短期访问令牌 (JWT) 配对长期刷新令牌，安全存储。当访问令牌过期时，刷新令牌获取新的。这提供了 JWT 的好处，同时启用令牌撤销和更好的安全性。',
    
    faq8q: 'CORS 如何影响 JWT vs 会话？',
    faq8a: 'JWT 与 CORS 配合良好，因为它们在 Authorization 头中发送。带 cookies 的会话需要在 fetch 中使用 credentials: include 和正确的 CORS 配置。跨域 cookies 有限制，使 JWT 有时对纯 API 架构更容易。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function JWTVsSession({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

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

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsJWTTitle}</h3>
      <p style={pStyle}>{ct.whatIsJWTContent}</p>

      <h3 style={h3Style}>{ct.whatIsSessionTitle}</h3>
      <p style={pStyle}>{ct.whatIsSessionContent}</p>

      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>JWT</th>
              <th style={thStyle}>{isZh ? '会话' : 'Session'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '状态存储' : 'State Storage', isZh ? '客户端（令牌内）' : 'Client (in token)', isZh ? '服务器端' : 'Server-side'],
              [isZh ? '可扩展性' : 'Scalability', isZh ? '天然水平扩展' : 'Naturally horizontal', isZh ? '需要共享存储' : 'Requires shared storage'],
              [isZh ? '令牌撤销' : 'Token Revocation', isZh ? '复杂' : 'Complex', isZh ? '即时' : 'Immediate'],
              [isZh ? '令牌大小' : 'Token Size', '1-4KB+', '20-50 bytes'],
              [isZh ? '跨域支持' : 'Cross-domain', isZh ? '容易' : 'Easy', isZh ? '需要配置' : 'Requires config'],
              [isZh ? '实现复杂度' : 'Complexity', isZh ? '中等' : 'Medium', isZh ? '较低' : 'Lower'],
              [isZh ? '移动端支持' : 'Mobile Support', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
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

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>JWT</th>
              <th style={thStyle}>{isZh ? '会话' : 'Session'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '服务器内存' : 'Server Memory', isZh ? '无状态' : 'Stateless', isZh ? '每用户内存' : 'Per-user memory'],
              [isZh ? '数据库查询' : 'DB Queries', isZh ? '验证时无' : 'None on verify', isZh ? '每次请求' : 'Per request'],
              [isZh ? '负载均衡' : 'Load Balancing', isZh ? '任意服务器' : 'Any server', isZh ? '粘性或共享' : 'Sticky or shared'],
              [isZh ? '数据安全' : 'Data Security', isZh ? '签名（可见）' : 'Signed (visible)', isZh ? '服务器端安全' : 'Server-side secure'],
              [isZh ? '过期处理' : 'Expiration', isZh ? '内置exp声明' : 'Built-in exp claim', isZh ? '服务器控制' : 'Server controlled'],
              [isZh ? '并发登录' : 'Concurrent Logins', isZh ? '难限制' : 'Hard to limit', isZh ? '容易控制' : 'Easy to control'],
            ].map(([cap, jwt, session], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{jwt}</td>
                <td style={tdStyle}>{session}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.jwtExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// JWT Generation (Node.js with jsonwebtoken)\nimport jwt from "jsonwebtoken";\n\nconst JWT_SECRET = process.env.JWT_SECRET;\n\n// Generate JWT\nfunction generateToken(user) {\n  return jwt.sign(\n    {\n      userId: user.id,\n      email: user.email,\n      role: user.role\n    },\n    JWT_SECRET,\n    { expiresIn: "1h" }\n  );\n}\n\n// JWT Verification Middleware\nfunction verifyToken(req, res, next) {\n  const token = req.headers.authorization?.split(" ")[1];\n  \n  if (!token) {\n    return res.status(401).json({ error: "No token provided" });\n  }\n  \n  try {\n    const decoded = jwt.verify(token, JWT_SECRET);\n    req.user = decoded;\n    next();\n  } catch (err) {\n    return res.status(401).json({ error: "Invalid token" });\n  }\n}\n\n// Refresh Token Pattern\nfunction generateRefreshToken(user) {\n  return jwt.sign(\n    { userId: user.id, type: "refresh" },\n    JWT_SECRET,\n    { expiresIn: "7d" }\n  );\n}'}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.sessionExampleTitle}</h3>
      <pre style={codeStyle}><code>{'// Session Implementation (Express with express-session)\nimport session from "express-session";\nimport RedisStore from "connect-redis";\nimport { createClient } from "redis";\n\n// Redis for distributed sessions\nconst redisClient = createClient({ url: process.env.REDIS_URL });\nawait redisClient.connect();\n\napp.use(\n  session({\n    store: new RedisStore({ client: redisClient }),\n    secret: process.env.SESSION_SECRET,\n    resave: false,\n    saveUninitialized: false,\n    cookie: {\n      secure: true, // HTTPS only\n      httpOnly: true, // No JS access\n      sameSite: "strict",\n      maxAge: 1000 * 60 * 60 * 24 // 24 hours\n    }\n  })\n);\n\n// Login\napp.post("/login", async (req, res) => {\n  const user = await authenticateUser(req.body);\n  if (user) {\n    req.session.userId = user.id;\n    req.session.role = user.role;\n    res.json({ success: true });\n  }\n});\n\n// Logout (immediate revocation)\napp.post("/logout", (req, res) => {\n  req.session.destroy((err) => {\n    res.clearCookie("connect.sid");\n    res.json({ success: true });\n  });\n});\n\n// Auth Middleware\nfunction requireAuth(req, res, next) {\n  if (req.session.userId) {\n    next();\n  } else {\n    res.status(401).json({ error: "Unauthorized" });\n  }\n}'}</code></pre>

      <h2 style={h2Style}>{ct.securityTitle}</h2>
      <p style={pStyle}>{ct.securityIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>JWT Security</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用强签名算法(RS256/ES256)，保持负载最小，实现刷新令牌轮换，使用短期过期时间，通过HTTPS传输，考虑加密敏感声明。主要风险：令牌无法立即撤销、XSS可窃取localStorage中的令牌。' : 'Use strong signing algorithms (RS256/ES256), keep payload minimal, implement refresh token rotation, use short expiration, transmit via HTTPS, consider encrypting sensitive claims. Main risks: token cannot be immediately revoked, XSS can steal tokens from localStorage.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>{isZh ? '会话安全' : 'Session Security'}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用HttpOnly和Secure cookie属性，实现CSRF保护，安全存储会话数据，定期轮换会话ID，设置合理的超时。主要风险：会话 fixation、CSRF攻击、会话存储需要安全配置。' : 'Use HttpOnly and Secure cookie attributes, implement CSRF protection, securely store session data, regularly rotate session IDs, set reasonable timeouts. Main risks: session fixation, CSRF attacks, session store requires secure configuration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.jwtBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '无状态API' : 'Stateless APIs'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '移动应用' : 'Mobile applications'}</li>
            <li>{isZh ? '单页应用(SPA)' : 'Single-page apps'}</li>
            <li>{isZh ? '跨域认证' : 'Cross-domain authentication'}</li>
            <li>{isZh ? '第三方API访问' : 'Third-party API access'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.sessionBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '传统Web应用' : 'Traditional web apps'}</li>
            <li>{isZh ? '需要立即撤销' : 'Need immediate revocation'}</li>
            <li>{isZh ? '敏感数据处理' : 'Sensitive data handling'}</li>
            <li>{isZh ? '企业内部应用' : 'Enterprise internal apps'}</li>
            <li>{isZh ? '合规要求' : 'Compliance requirements'}</li>
            <li>{isZh ? '并发登录控制' : 'Concurrent login control'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> {' • '} 
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> {' • '} 
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

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
