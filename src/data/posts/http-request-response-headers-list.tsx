'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    intro: 'HTTP headers are key-value pairs sent between client and server with every HTTP request and response. They carry metadata about the message body, authentication, caching, security policies, and more. This <strong>complete HTTP headers list and reference</strong> covers every header you need to know as a web developer, with practical examples and best practices.',
    linkTool: 'Look up HTTP status codes with our HTTP Status Code Checker \u2192',
    linkCurl: 'Convert curl commands with custom headers using our cURL to Code Converter \u2192',

    // Section 1: What are HTTP headers
    h2_what: 'What Are HTTP Headers?',
    p_what_1: 'HTTP headers are metadata fields included in HTTP requests and responses. They follow the format <code>Header-Name: value</code> and appear after the request/response line but before the body. Headers control how data is transmitted, cached, authenticated, and rendered.',
    p_what_2: 'Headers are grouped into four categories:',
    li_general: '<strong>General Headers</strong> \u2014 Apply to both requests and responses (e.g., <code>Connection</code>, <code>Date</code>)',
    li_request: '<strong>Request Headers</strong> \u2014 Sent by the client to provide context (e.g., <code>Accept</code>, <code>User-Agent</code>, <code>Authorization</code>)',
    li_response: '<strong>Response Headers</strong> \u2014 Sent by the server to describe the response (e.g., <code>Server</code>, <code>Set-Cookie</code>)',
    li_entity: '<strong>Entity Headers</strong> \u2014 Describe the body of the message (e.g., <code>Content-Type</code>, <code>Content-Length</code>)',

    // Section 2: Common Request Headers
    h2_request: 'Common Request Headers',
    p_request: 'Request headers are sent by the client (browser, API client, or curl) to tell the server what kind of response is expected, who is making the request, and how to handle the connection.',

    // Section 3: Common Response Headers
    h2_response: 'Common Response Headers',
    p_response: 'Response headers are sent by the server to provide metadata about the response. They control caching, set cookies, specify content types, and direct the client where to redirect.',

    // Section 4: Content Negotiation
    h2_negotiation: 'Content Negotiation Headers',
    p_negotiation: 'Content negotiation allows clients and servers to agree on the best representation of a resource. The client sends preference headers, and the server responds with the most appropriate version.',

    // Section 5: Caching Headers
    h2_caching: 'Caching Headers',
    p_caching: 'Caching headers are critical for web performance. They tell browsers and CDNs how long to store resources, when to revalidate, and how to handle stale content. Proper caching can reduce page load times by 50% or more.',

    // Section 6: Security Headers
    h2_security: 'Security Headers',
    p_security: 'Security headers protect your application from common web vulnerabilities like XSS, clickjacking, MIME sniffing, and protocol downgrade attacks. Every production website should implement these headers.',

    // Section 7: CORS Headers
    h2_cors: 'CORS Headers',
    p_cors: 'Cross-Origin Resource Sharing (CORS) headers control which origins can access your resources. When a browser makes a cross-origin request, it performs a preflight check to verify the server allows the request.',

    // Section 8: Authentication Headers
    h2_auth: 'Authentication Headers',
    p_auth: 'Authentication headers carry credentials between the client and server. Understanding the different authentication schemes is essential for building secure APIs.',

    // Section 9: Compression
    h2_compression: 'Compression Headers',
    p_compression: 'Compression headers enable the client and server to negotiate compressed transfer of response bodies. Compression typically reduces payload sizes by 60-80%, significantly improving load times.',

    // Section 10: Custom Headers
    h2_custom: 'Custom Headers',
    p_custom: 'Custom headers allow applications to pass additional metadata outside the standard HTTP specification. While the <code>X-</code> prefix convention was common, it has been deprecated by RFC 6648 (2012).',

    // Section 11: Headers in Code
    h2_code: 'HTTP Headers in Code',
    p_code: 'Here is how to set and read HTTP headers in the most common languages and tools. These examples cover both client-side and server-side usage.',

    // Section 12: Reference Table
    h2_reference: 'Complete HTTP Headers Reference Table',
    p_reference: 'This table lists all commonly used HTTP headers with their descriptions, example values, and whether they appear in requests, responses, or both.',
    th_header: 'Header',
    th_type: 'Type',
    th_description: 'Description',
    th_example: 'Example Value',

    // Section 13: FAQ
    h2_faq: 'Frequently Asked Questions',
    faq1_q: 'What is the difference between request headers and response headers?',
    faq1_a: 'Request headers are sent by the client (browser or API client) to the server, providing context about the request \u2014 such as accepted content types, authentication tokens, and user agent information. Response headers are sent by the server back to the client, providing metadata about the response \u2014 such as content type, caching rules, and security policies. Some headers like Content-Type can appear in both.',
    faq2_q: 'What are the most important security headers to implement?',
    faq2_a: 'The essential security headers are: Content-Security-Policy (CSP) to prevent XSS attacks, Strict-Transport-Security (HSTS) to enforce HTTPS, X-Content-Type-Options: nosniff to prevent MIME sniffing, X-Frame-Options to prevent clickjacking, and Referrer-Policy to control information leakage. Modern applications should also implement Permissions-Policy to restrict browser features.',
    faq3_q: 'Why was the X- prefix for custom headers deprecated?',
    faq3_a: 'RFC 6648 (published in 2012) deprecated the X- prefix convention because removing the prefix when a custom header became standardized caused compatibility issues. The recommendation is to choose a meaningful, unique header name without any prefix. However, many existing headers like X-Forwarded-For and X-Request-ID remain widely used for backward compatibility.',
    faq4_q: 'How does Cache-Control differ from Expires?',
    faq4_a: 'Cache-Control is the modern, more powerful caching header that uses relative time directives (e.g., max-age=3600 means "cache for 1 hour from now"). Expires uses an absolute date/time and is the older HTTP/1.0 approach. When both are present, Cache-Control takes precedence. Use Cache-Control in modern applications \u2014 it offers granular control with directives like no-cache, no-store, must-revalidate, public, and private.',
    faq5_q: 'What is a CORS preflight request and when does it happen?',
    faq5_a: 'A CORS preflight is an automatic OPTIONS request sent by the browser before certain cross-origin requests. It happens when the request uses methods other than GET, HEAD, or POST, or includes custom headers, or sends a Content-Type other than application/x-www-form-urlencoded, multipart/form-data, or text/plain. The server must respond with appropriate Access-Control-Allow-* headers. The browser caches preflight results based on the Access-Control-Max-Age header.',

    conclusion: 'Understanding HTTP headers is essential for building performant, secure, and well-architected web applications. Bookmark this reference for quick access to header names, values, and usage patterns.',
    linkToolBottom: 'Check HTTP status codes with our HTTP Status Code Tool \u2192',
    linkCurlBottom: 'Convert curl commands to any language with our cURL to Code Converter \u2192',
  },
  zh: {
    intro: 'HTTP 头部（Headers）是在每次 HTTP 请求和响应中客户端与服务器之间传输的键值对。它们携带了关于消息体、认证、缓存、安全策略等方面的元数据。本<strong>完整 HTTP 头部列表与参考指南</strong>涵盖了 Web 开发者需要了解的所有头部，附带实用示例和最佳实践。',
    linkTool: '使用我们的 HTTP 状态码工具查询状态码 \u2192',
    linkCurl: '使用 cURL 代码转换器转换带自定义头部的 curl 命令 \u2192',

    h2_what: '什么是 HTTP 头部？',
    p_what_1: 'HTTP 头部是包含在 HTTP 请求和响应中的元数据字段。它们遵循 <code>Header-Name: value</code> 的格式，出现在请求/响应行之后、消息体之前。头部控制数据的传输、缓存、认证和渲染方式。',
    p_what_2: '头部分为四类：',
    li_general: '<strong>通用头部（General Headers）</strong> \u2014 适用于请求和响应（如 <code>Connection</code>、<code>Date</code>）',
    li_request: '<strong>请求头部（Request Headers）</strong> \u2014 由客户端发送，提供上下文信息（如 <code>Accept</code>、<code>User-Agent</code>、<code>Authorization</code>）',
    li_response: '<strong>响应头部（Response Headers）</strong> \u2014 由服务器发送，描述响应信息（如 <code>Server</code>、<code>Set-Cookie</code>）',
    li_entity: '<strong>实体头部（Entity Headers）</strong> \u2014 描述消息体的内容（如 <code>Content-Type</code>、<code>Content-Length</code>）',

    h2_request: '常见请求头部',
    p_request: '请求头部由客户端（浏览器、API 客户端或 curl）发送，告诉服务器期望什么类型的响应、谁在发起请求以及如何处理连接。',

    h2_response: '常见响应头部',
    p_response: '响应头部由服务器发送，提供关于响应的元数据。它们控制缓存、设置 Cookie、指定内容类型并指示客户端重定向位置。',

    h2_negotiation: '内容协商头部',
    p_negotiation: '内容协商允许客户端和服务器就资源的最佳表示形式达成一致。客户端发送偏好头部，服务器返回最合适的版本。',

    h2_caching: '缓存头部',
    p_caching: '缓存头部对 Web 性能至关重要。它们告诉浏览器和 CDN 资源应存储多长时间、何时重新验证以及如何处理过期内容。合理的缓存可以将页面加载时间减少 50% 以上。',

    h2_security: '安全头部',
    p_security: '安全头部保护你的应用免受常见 Web 漏洞的攻击，如 XSS、点击劫持、MIME 嗅探和协议降级攻击。每个生产环境的网站都应实施这些头部。',

    h2_cors: 'CORS 头部',
    p_cors: '跨源资源共享（CORS）头部控制哪些来源可以访问你的资源。当浏览器发起跨源请求时，会执行预检检查以验证服务器是否允许该请求。',

    h2_auth: '认证头部',
    p_auth: '认证头部在客户端和服务器之间传递凭据。理解不同的认证方案对于构建安全的 API 至关重要。',

    h2_compression: '压缩头部',
    p_compression: '压缩头部使客户端和服务器能够协商响应体的压缩传输。压缩通常可以将有效载荷大小减少 60-80%，显著提升加载速度。',

    h2_custom: '自定义头部',
    p_custom: '自定义头部允许应用传递标准 HTTP 规范之外的附加元数据。虽然 <code>X-</code> 前缀约定曾经很常见，但已被 RFC 6648（2012 年）废弃。',

    h2_code: '代码中的 HTTP 头部',
    p_code: '以下是在最常见的语言和工具中设置和读取 HTTP 头部的方法。这些示例涵盖了客户端和服务器端的用法。',

    h2_reference: '完整 HTTP 头部参考表',
    p_reference: '此表列出了所有常用 HTTP 头部及其描述、示例值以及它们出现在请求、响应还是两者中。',
    th_header: '头部名称',
    th_type: '类型',
    th_description: '说明',
    th_example: '示例值',

    h2_faq: '常见问题',
    faq1_q: '请求头部和响应头部有什么区别？',
    faq1_a: '请求头部由客户端（浏览器或 API 客户端）发送到服务器，提供关于请求的上下文信息——例如接受的内容类型、认证令牌和用户代理信息。响应头部由服务器发送回客户端，提供关于响应的元数据——例如内容类型、缓存规则和安全策略。某些头部（如 Content-Type）可以同时出现在请求和响应中。',
    faq2_q: '最重要的安全头部有哪些？',
    faq2_a: '必要的安全头部包括：Content-Security-Policy（CSP）防止 XSS 攻击，Strict-Transport-Security（HSTS）强制使用 HTTPS，X-Content-Type-Options: nosniff 防止 MIME 嗅探，X-Frame-Options 防止点击劫持，Referrer-Policy 控制信息泄露。现代应用还应实施 Permissions-Policy 来限制浏览器功能。',
    faq3_q: '为什么自定义头部的 X- 前缀被废弃了？',
    faq3_a: 'RFC 6648（2012 年发布）废弃了 X- 前缀约定，因为当自定义头部成为标准时，移除前缀会导致兼容性问题。建议是选择一个有意义的、唯一的头部名称而不加任何前缀。但是许多现有头部（如 X-Forwarded-For 和 X-Request-ID）出于向后兼容仍被广泛使用。',
    faq4_q: 'Cache-Control 和 Expires 有什么区别？',
    faq4_a: 'Cache-Control 是现代的、更强大的缓存头部，使用相对时间指令（如 max-age=3600 表示"从现在起缓存 1 小时"）。Expires 使用绝对日期/时间，是旧的 HTTP/1.0 方式。当两者同时存在时，Cache-Control 优先。在现代应用中使用 Cache-Control——它提供了 no-cache、no-store、must-revalidate、public 和 private 等精细控制指令。',
    faq5_q: '什么是 CORS 预检请求？什么时候会触发？',
    faq5_a: 'CORS 预检是浏览器在某些跨源请求之前自动发送的 OPTIONS 请求。当请求使用 GET、HEAD 或 POST 以外的方法、包含自定义头部，或发送 application/x-www-form-urlencoded、multipart/form-data、text/plain 以外的 Content-Type 时会触发。服务器必须用适当的 Access-Control-Allow-* 头部响应。浏览器根据 Access-Control-Max-Age 头部缓存预检结果。',

    conclusion: '理解 HTTP 头部对于构建高性能、安全且架构良好的 Web 应用至关重要。收藏此参考指南，快速查阅头部名称、值和使用模式。',
    linkToolBottom: '使用 HTTP 状态码工具查询状态码 \u2192',
    linkCurlBottom: '使用 cURL 代码转换器将 curl 命令转换为任何语言 \u2192',
  },
};

export default function HttpRequestResponseHeadersList({ lang }: { lang: string }) {
  const s = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: s.faq1_q, acceptedAnswer: { '@type': 'Answer', text: s.faq1_a } },
      { '@type': 'Question', name: s.faq2_q, acceptedAnswer: { '@type': 'Answer', text: s.faq2_a } },
      { '@type': 'Question', name: s.faq3_q, acceptedAnswer: { '@type': 'Answer', text: s.faq3_a } },
      { '@type': 'Question', name: s.faq4_q, acceptedAnswer: { '@type': 'Answer', text: s.faq4_a } },
      { '@type': 'Question', name: s.faq5_q, acceptedAnswer: { '@type': 'Answer', text: s.faq5_a } },
    ],
  };

  const codeStyle: React.CSSProperties = { display: 'inline', background: 'rgba(139,92,246,0.1)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 13 };
  const thStyle: React.CSSProperties = { padding: '8px 12px', textAlign: 'left' };
  const tdStyle: React.CSSProperties = { padding: '8px 12px' };
  const trStyle: React.CSSProperties = { borderBottom: '1px solid var(--border-color)' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p dangerouslySetInnerHTML={{ __html: s.intro }} />
      <p><Link href={`/${lang}/tools/http-status`} style={{ fontWeight: 600 }}>{s.linkTool}</Link></p>
      <p><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600 }}>{s.linkCurl}</Link></p>

      {/* Section 1: What are HTTP Headers */}
      <h2>{s.h2_what}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.p_what_1 }} />
      <p>{s.p_what_2}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: s.li_general }} />
        <li dangerouslySetInnerHTML={{ __html: s.li_request }} />
        <li dangerouslySetInnerHTML={{ __html: s.li_response }} />
        <li dangerouslySetInnerHTML={{ __html: s.li_entity }} />
      </ul>
      <pre><code>{`GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
User-Agent: Mozilla/5.0
Connection: keep-alive

---

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: max-age=3600
X-Request-ID: abc-123-def
Content-Length: 1234`}</code></pre>

      {/* Section 2: Common Request Headers */}
      <h2>{s.h2_request}</h2>
      <p>{s.p_request}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 180 }}>Header</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Accept</code></td>
            <td style={tdStyle}>Tells the server what content types the client can handle</td>
            <td style={tdStyle}><code style={codeStyle}>application/json</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Authorization</code></td>
            <td style={tdStyle}>Carries authentication credentials (Bearer token, Basic auth, API key)</td>
            <td style={tdStyle}><code style={codeStyle}>Bearer eyJhbGci...</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Content-Type</code></td>
            <td style={tdStyle}>Specifies the media type of the request body</td>
            <td style={tdStyle}><code style={codeStyle}>application/json</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>User-Agent</code></td>
            <td style={tdStyle}>Identifies the client software making the request</td>
            <td style={tdStyle}><code style={codeStyle}>Mozilla/5.0 (Windows NT 10.0; Win64; x64)</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Cookie</code></td>
            <td style={tdStyle}>Sends stored cookies back to the server</td>
            <td style={tdStyle}><code style={codeStyle}>session_id=abc123; theme=dark</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Referer</code></td>
            <td style={tdStyle}>URL of the page that linked to the current request</td>
            <td style={tdStyle}><code style={codeStyle}>https://example.com/page</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Host</code></td>
            <td style={tdStyle}>The domain name and port of the server (required in HTTP/1.1)</td>
            <td style={tdStyle}><code style={codeStyle}>api.example.com</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Origin</code></td>
            <td style={tdStyle}>Indicates where the request originated from (used in CORS)</td>
            <td style={tdStyle}><code style={codeStyle}>https://myapp.com</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>If-None-Match</code></td>
            <td style={tdStyle}>Conditional request based on ETag; returns 304 if unchanged</td>
            <td style={tdStyle}><code style={codeStyle}>&quot;33a64df5&quot;</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>If-Modified-Since</code></td>
            <td style={tdStyle}>Conditional request based on date; returns 304 if unchanged</td>
            <td style={tdStyle}><code style={codeStyle}>Wed, 21 Oct 2025 07:28:00 GMT</code></td>
          </tr>
        </tbody>
      </table>

      {/* Section 3: Common Response Headers */}
      <h2>{s.h2_response}</h2>
      <p>{s.p_response}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 180 }}>Header</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Content-Type</code></td>
            <td style={tdStyle}>The media type of the response body</td>
            <td style={tdStyle}><code style={codeStyle}>text/html; charset=utf-8</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Set-Cookie</code></td>
            <td style={tdStyle}>Sets a cookie on the client with optional flags (HttpOnly, Secure, SameSite)</td>
            <td style={tdStyle}><code style={codeStyle}>session=abc123; HttpOnly; Secure</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Cache-Control</code></td>
            <td style={tdStyle}>Directives for caching mechanisms in browsers and CDNs</td>
            <td style={tdStyle}><code style={codeStyle}>public, max-age=3600</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Location</code></td>
            <td style={tdStyle}>URL to redirect the client to (used with 3xx status codes)</td>
            <td style={tdStyle}><code style={codeStyle}>https://example.com/new-page</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Server</code></td>
            <td style={tdStyle}>Information about the server software (often hidden for security)</td>
            <td style={tdStyle}><code style={codeStyle}>nginx/1.24.0</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>ETag</code></td>
            <td style={tdStyle}>A unique identifier for a specific version of a resource</td>
            <td style={tdStyle}><code style={codeStyle}>&quot;33a64df551425fcc55e&quot;</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>WWW-Authenticate</code></td>
            <td style={tdStyle}>Defines the authentication method the client should use (sent with 401)</td>
            <td style={tdStyle}><code style={codeStyle}>Bearer realm=&quot;api&quot;</code></td>
          </tr>
          <tr style={trStyle}>
            <td style={tdStyle}><code style={codeStyle}>Content-Length</code></td>
            <td style={tdStyle}>The size of the response body in bytes</td>
            <td style={tdStyle}><code style={codeStyle}>3495</code></td>
          </tr>
        </tbody>
      </table>

      {/* Section 4: Content Negotiation */}
      <h2>{s.h2_negotiation}</h2>
      <p>{s.p_negotiation}</p>
      <pre><code>{`# Client sends preferences
GET /api/data HTTP/1.1
Accept: application/json, text/html;q=0.9, */*;q=0.8
Accept-Language: en-US, en;q=0.9, fr;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Charset: utf-8

# Server responds with best match
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Language: en-US
Content-Encoding: gzip
Vary: Accept, Accept-Language, Accept-Encoding`}</code></pre>
      <p>The <code style={codeStyle}>q</code> parameter (quality value) ranges from 0 to 1 and indicates preference. Default is 1.0 (highest priority). The <code style={codeStyle}>Vary</code> response header tells caches which request headers affect the response, preventing incorrect cached versions from being served.</p>

      {/* Section 5: Caching Headers */}
      <h2>{s.h2_caching}</h2>
      <p>{s.p_caching}</p>
      <pre><code>{`# Aggressive caching for static assets (1 year)
Cache-Control: public, max-age=31536000, immutable

# No caching (API responses with sensitive data)
Cache-Control: no-store, no-cache, must-revalidate, private

# Revalidation caching (HTML pages)
Cache-Control: no-cache
ETag: "abc123"

# Time-based caching with revalidation
Cache-Control: public, max-age=3600, must-revalidate
Last-Modified: Tue, 15 Oct 2025 10:30:00 GMT

# Stale content while revalidating (modern approach)
Cache-Control: public, max-age=300, stale-while-revalidate=60

# Legacy HTTP/1.0 caching
Expires: Thu, 01 Dec 2025 16:00:00 GMT
Pragma: no-cache`}</code></pre>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 200 }}>Directive</th>
            <th style={thStyle}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>max-age=N</code></td><td style={tdStyle}>Cache for N seconds from the time of the request</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>s-maxage=N</code></td><td style={tdStyle}>Like max-age but only for shared caches (CDNs)</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>no-cache</code></td><td style={tdStyle}>Cache but revalidate with the server before each use</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>no-store</code></td><td style={tdStyle}>Do not cache the response at all</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>public</code></td><td style={tdStyle}>Any cache (browser, CDN, proxy) can store the response</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>private</code></td><td style={tdStyle}>Only the browser can cache the response (not CDNs)</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>must-revalidate</code></td><td style={tdStyle}>Once stale, the cache must revalidate before using the cached version</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>immutable</code></td><td style={tdStyle}>The resource will never change; skip revalidation entirely</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>stale-while-revalidate=N</code></td><td style={tdStyle}>Serve stale content for N seconds while fetching a fresh version in the background</td></tr>
        </tbody>
      </table>

      {/* Section 6: Security Headers */}
      <h2>{s.h2_security}</h2>
      <p>{s.p_security}</p>
      <pre><code>{`# Content Security Policy - prevents XSS
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-abc123'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.example.com

# HTTP Strict Transport Security - force HTTPS
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

# Prevent MIME type sniffing
X-Content-Type-Options: nosniff

# Prevent clickjacking
X-Frame-Options: DENY
# Modern alternative:
Content-Security-Policy: frame-ancestors 'none'

# Control referrer information
Referrer-Policy: strict-origin-when-cross-origin

# Restrict browser features
Permissions-Policy: camera=(), microphone=(), geolocation=(self), payment=()`}</code></pre>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 240 }}>Header</th>
            <th style={thStyle}>Protection Against</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Content-Security-Policy</code></td><td style={tdStyle}>XSS, code injection, unauthorized resource loading</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Strict-Transport-Security</code></td><td style={tdStyle}>Protocol downgrade attacks, cookie hijacking</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>X-Content-Type-Options</code></td><td style={tdStyle}>MIME sniffing attacks</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>X-Frame-Options</code></td><td style={tdStyle}>Clickjacking via iframes</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Referrer-Policy</code></td><td style={tdStyle}>Information leakage via Referer header</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Permissions-Policy</code></td><td style={tdStyle}>Unauthorized access to browser APIs (camera, mic, location)</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Cross-Origin-Opener-Policy</code></td><td style={tdStyle}>Cross-origin window attacks (Spectre-like)</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Cross-Origin-Embedder-Policy</code></td><td style={tdStyle}>Cross-origin resource loading without explicit permission</td></tr>
        </tbody>
      </table>

      {/* Section 7: CORS Headers */}
      <h2>{s.h2_cors}</h2>
      <p>{s.p_cors}</p>
      <pre><code>{`# Preflight request (sent by browser automatically)
OPTIONS /api/data HTTP/1.1
Origin: https://myapp.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization

# Preflight response (server must respond to allow the request)
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true

# Actual response with CORS headers
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Expose-Headers: X-Request-ID, X-RateLimit-Remaining
Content-Type: application/json`}</code></pre>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 280 }}>Header</th>
            <th style={thStyle}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Allow-Origin</code></td><td style={tdStyle}>Specifies which origin(s) can access the resource. Use a specific origin or <code style={codeStyle}>*</code> (not with credentials).</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Allow-Methods</code></td><td style={tdStyle}>HTTP methods allowed for cross-origin requests</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Allow-Headers</code></td><td style={tdStyle}>Custom headers allowed in cross-origin requests</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Allow-Credentials</code></td><td style={tdStyle}>Whether cookies and auth headers can be sent cross-origin</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Max-Age</code></td><td style={tdStyle}>How long the preflight result can be cached (in seconds)</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Expose-Headers</code></td><td style={tdStyle}>Response headers that JavaScript can access cross-origin</td></tr>
        </tbody>
      </table>

      {/* Section 8: Authentication Headers */}
      <h2>{s.h2_auth}</h2>
      <p>{s.p_auth}</p>
      <pre><code>{`# Basic Authentication (base64-encoded username:password)
GET /api/protected HTTP/1.1
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
# Decoded: username:password

# Bearer Token (JWT or OAuth2)
GET /api/data HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U

# API Key (custom header)
GET /api/data HTTP/1.1
X-API-Key: sk_live_abc123def456

# Server responds with 401 when authentication fails
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="api", error="invalid_token", error_description="The token has expired"

# Digest Authentication
Authorization: Digest username="admin", realm="api@example.com", nonce="abc123", uri="/api/data", response="def456"`}</code></pre>

      {/* Section 9: Compression */}
      <h2>{s.h2_compression}</h2>
      <p>{s.p_compression}</p>
      <pre><code>{`# Client tells server what compression it supports
GET /api/large-data HTTP/1.1
Accept-Encoding: gzip, deflate, br

# Server responds with compressed content
HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: application/json
Transfer-Encoding: chunked
Vary: Accept-Encoding`}</code></pre>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
            <th style={{ ...thStyle, width: 150 }}>Algorithm</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>gzip</code></td><td style={tdStyle}>Most widely supported compression. Good compression ratio.</td><td style={tdStyle}>Universal compatibility, text-based content</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>br</code> (Brotli)</td><td style={tdStyle}>Better compression than gzip (15-20% smaller). Requires HTTPS.</td><td style={tdStyle}>Modern browsers, static assets, HTTPS sites</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>deflate</code></td><td style={tdStyle}>Older algorithm, rarely used alone. Inconsistent implementations.</td><td style={tdStyle}>Legacy systems only</td></tr>
          <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>zstd</code></td><td style={tdStyle}>Newest algorithm. Excellent speed and compression ratio.</td><td style={tdStyle}>Emerging support, high-throughput APIs</td></tr>
        </tbody>
      </table>

      {/* Section 10: Custom Headers */}
      <h2>{s.h2_custom}</h2>
      <p dangerouslySetInnerHTML={{ __html: s.p_custom }} />
      <pre><code>{`# Common custom headers (still using X- prefix for compatibility)
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
X-Forwarded-For: 203.0.113.50, 70.41.3.18
X-Forwarded-Proto: https
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1672531200

# Modern naming (no X- prefix, per RFC 6648)
Request-ID: 550e8400-e29b-41d4-a716-446655440000
RateLimit-Limit: 1000
RateLimit-Remaining: 999
RateLimit-Reset: 1672531200

# Application-specific headers
Idempotency-Key: unique-operation-key-123
Retry-After: 120
Deprecation: true
Sunset: Sat, 01 Mar 2025 00:00:00 GMT`}</code></pre>
      <p><strong>Best Practices for Custom Headers:</strong></p>
      <ul>
        <li>Use meaningful, descriptive names without the <code style={codeStyle}>X-</code> prefix for new headers</li>
        <li>Keep existing <code style={codeStyle}>X-</code> prefixed headers for backward compatibility</li>
        <li>Document all custom headers in your API documentation</li>
        <li>Use <code style={codeStyle}>Request-ID</code> or <code style={codeStyle}>X-Request-ID</code> for distributed tracing</li>
        <li>Include rate limit information in response headers</li>
      </ul>

      {/* Section 11: Headers in Code */}
      <h2>{s.h2_code}</h2>
      <p>{s.p_code}</p>

      <h3>JavaScript (fetch API)</h3>
      <pre><code>{`// Setting request headers with fetch
const response = await fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here',
    'Accept': 'application/json',
    'X-Request-ID': crypto.randomUUID(),
  },
  body: JSON.stringify({ name: 'John' }),
});

// Reading response headers
console.log(response.headers.get('Content-Type'));
console.log(response.headers.get('X-RateLimit-Remaining'));

// Iterating all response headers
for (const [key, value] of response.headers.entries()) {
  console.log(\`\${key}: \${value}\`);
}`}</code></pre>

      <h3>JavaScript (axios)</h3>
      <pre><code>{`import axios from 'axios';

// Setting request headers with axios
const response = await axios.post('https://api.example.com/data',
  { name: 'John' },
  {
    headers: {
      'Authorization': 'Bearer your-token-here',
      'Content-Type': 'application/json',
      'Accept-Language': 'en-US',
    },
  }
);

// Reading response headers
console.log(response.headers['content-type']);
console.log(response.headers['x-ratelimit-remaining']);

// Setting default headers for all requests
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.headers.post['Content-Type'] = 'application/json';`}</code></pre>

      <h3>curl</h3>
      <pre><code>{`# Setting custom headers with curl
curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-token-here" \\
  -H "Accept: application/json" \\
  -H "X-Request-ID: $(uuidgen)" \\
  -d '{"name": "John"}'

# View response headers only
curl -I https://example.com

# View both request and response headers (verbose)
curl -v https://example.com

# Save response headers to a file
curl -D headers.txt https://example.com`}</code></pre>

      <h3>Node.js (http module)</h3>
      <pre><code>{`import http from 'node:http';

// Setting headers in an HTTP server response
const server = http.createServer((req, res) => {
  // Reading request headers
  console.log(req.headers['authorization']);
  console.log(req.headers['content-type']);

  // Setting response headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Request-ID', crypto.randomUUID());
  res.setHeader('Access-Control-Allow-Origin', 'https://myapp.com');

  // Set multiple values for a header
  res.setHeader('Set-Cookie', [
    'session=abc123; HttpOnly; Secure; SameSite=Strict',
    'theme=dark; Path=/; Max-Age=31536000',
  ]);

  res.writeHead(200);
  res.end(JSON.stringify({ message: 'Hello' }));
});`}</code></pre>

      {/* Section 12: Reference Table */}
      <h2>{s.h2_reference}</h2>
      <p>{s.p_reference}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24, minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ ...thStyle, width: 220 }}>{s.th_header}</th>
              <th style={{ ...thStyle, width: 80 }}>{s.th_type}</th>
              <th style={thStyle}>{s.th_description}</th>
              <th style={thStyle}>{s.th_example}</th>
            </tr>
          </thead>
          <tbody>
            {/* General */}
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Cache-Control</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Caching directives for request and response</td><td style={tdStyle}><code style={codeStyle}>max-age=3600, public</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Connection</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Control whether the connection stays open</td><td style={tdStyle}><code style={codeStyle}>keep-alive</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Date</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Date and time of the message</td><td style={tdStyle}><code style={codeStyle}>Tue, 15 Oct 2025 10:30:00 GMT</code></td></tr>
            {/* Request */}
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Accept</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Acceptable content types</td><td style={tdStyle}><code style={codeStyle}>application/json, text/html</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Accept-Encoding</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Acceptable compression algorithms</td><td style={tdStyle}><code style={codeStyle}>gzip, deflate, br</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Accept-Language</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Preferred response language</td><td style={tdStyle}><code style={codeStyle}>en-US, en;q=0.9</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Authorization</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Authentication credentials</td><td style={tdStyle}><code style={codeStyle}>Bearer eyJhbGci...</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Cookie</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Cookies sent to the server</td><td style={tdStyle}><code style={codeStyle}>session=abc123</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Host</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Server domain name</td><td style={tdStyle}><code style={codeStyle}>api.example.com</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>If-Modified-Since</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Conditional request by date</td><td style={tdStyle}><code style={codeStyle}>Wed, 21 Oct 2025 07:28:00 GMT</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>If-None-Match</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Conditional request by ETag</td><td style={tdStyle}><code style={codeStyle}>&quot;33a64df5&quot;</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Origin</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Origin of the request (for CORS)</td><td style={tdStyle}><code style={codeStyle}>https://myapp.com</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Referer</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>URL of the referring page</td><td style={tdStyle}><code style={codeStyle}>https://example.com/page</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>User-Agent</code></td><td style={tdStyle}>Request</td><td style={tdStyle}>Client software identification</td><td style={tdStyle}><code style={codeStyle}>Mozilla/5.0...</code></td></tr>
            {/* Response */}
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Access-Control-Allow-Origin</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Allowed CORS origin(s)</td><td style={tdStyle}><code style={codeStyle}>https://myapp.com</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Content-Encoding</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Compression algorithm used</td><td style={tdStyle}><code style={codeStyle}>gzip</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Content-Length</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Size of the body in bytes</td><td style={tdStyle}><code style={codeStyle}>3495</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Content-Security-Policy</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>CSP rules to prevent XSS</td><td style={tdStyle}><code style={codeStyle}>default-src &apos;self&apos;</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Content-Type</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Media type of the body</td><td style={tdStyle}><code style={codeStyle}>application/json; charset=utf-8</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>ETag</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Resource version identifier</td><td style={tdStyle}><code style={codeStyle}>&quot;33a64df551425fcc55e&quot;</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Expires</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Date/time after which response is stale</td><td style={tdStyle}><code style={codeStyle}>Thu, 01 Dec 2025 16:00:00 GMT</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Last-Modified</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Date the resource was last modified</td><td style={tdStyle}><code style={codeStyle}>Tue, 15 Oct 2025 10:30:00 GMT</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Location</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Redirect target URL</td><td style={tdStyle}><code style={codeStyle}>https://example.com/new</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Permissions-Policy</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Restrict browser features</td><td style={tdStyle}><code style={codeStyle}>camera=(), microphone=()</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Referrer-Policy</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Controls Referer header behavior</td><td style={tdStyle}><code style={codeStyle}>strict-origin-when-cross-origin</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Retry-After</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Seconds to wait before retrying</td><td style={tdStyle}><code style={codeStyle}>120</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Server</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Server software information</td><td style={tdStyle}><code style={codeStyle}>nginx/1.24.0</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Set-Cookie</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Set a cookie on the client</td><td style={tdStyle}><code style={codeStyle}>session=abc; HttpOnly; Secure</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Strict-Transport-Security</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Force HTTPS connections</td><td style={tdStyle}><code style={codeStyle}>max-age=63072000; includeSubDomains</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>Vary</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Headers that affect cached response selection</td><td style={tdStyle}><code style={codeStyle}>Accept, Accept-Encoding</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>WWW-Authenticate</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Authentication scheme required</td><td style={tdStyle}><code style={codeStyle}>Bearer realm=&quot;api&quot;</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>X-Content-Type-Options</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Prevent MIME sniffing</td><td style={tdStyle}><code style={codeStyle}>nosniff</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>X-Frame-Options</code></td><td style={tdStyle}>Response</td><td style={tdStyle}>Prevent clickjacking</td><td style={tdStyle}><code style={codeStyle}>DENY</code></td></tr>
            <tr style={trStyle}><td style={tdStyle}><code style={codeStyle}>X-Request-ID</code></td><td style={tdStyle}>Both</td><td style={tdStyle}>Unique request identifier for tracing</td><td style={tdStyle}><code style={codeStyle}>550e8400-e29b-41d4...</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* Section 13: FAQ */}
      <h2>{s.h2_faq}</h2>
      <h3>{s.faq1_q}</h3>
      <p>{s.faq1_a}</p>
      <h3>{s.faq2_q}</h3>
      <p>{s.faq2_a}</p>
      <h3>{s.faq3_q}</h3>
      <p>{s.faq3_a}</p>
      <h3>{s.faq4_q}</h3>
      <p>{s.faq4_a}</p>
      <h3>{s.faq5_q}</h3>
      <p>{s.faq5_a}</p>

      <p style={{ marginTop: 32 }}>{s.conclusion}</p>
      <p><Link href={`/${lang}/tools/http-status`} style={{ fontWeight: 600 }}>{s.linkToolBottom}</Link></p>
      <p><Link href={`/${lang}/tools/curl-to-code`} style={{ fontWeight: 600 }}>{s.linkCurlBottom}</Link></p>
    </>
  );
}
