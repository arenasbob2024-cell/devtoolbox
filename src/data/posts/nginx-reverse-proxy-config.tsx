'use client';
import React from 'react';
import Link from 'next/link';

const codeBasicProxy = `# Basic reverse proxy configuration
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:3000;

        # Pass original request headers to the backend
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # Timeouts (seconds)
        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;

        # Buffer settings
        proxy_buffering    on;
        proxy_buffer_size  16k;
        proxy_buffers      4 16k;
    }
}`;

const codeSSL = `# Full SSL/TLS reverse proxy with HTTP redirect
server {
    listen 80;
    server_name example.com www.example.com;
    # Permanent redirect all HTTP traffic to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # SSL certificate (Let's Encrypt)
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Modern SSL settings (2026 recommended)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
    ssl_prefer_server_ciphers off;

    # SSL session cache
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;

    # HSTS: tell browsers to always use HTTPS (6 months)
    add_header Strict-Transport-Security "max-age=15768000" always;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}`;

const codeUpstreamLB = `# Load balancing across multiple backends
upstream app_servers {
    # Default: round-robin
    server 10.0.0.1:3000;
    server 10.0.0.2:3000;
    server 10.0.0.3:3000;

    # Least connections algorithm
    # least_conn;

    # IP hash (sticky sessions)
    # ip_hash;

    # Weighted distribution
    # server 10.0.0.1:3000 weight=3;
    # server 10.0.0.2:3000 weight=1;

    # Health checks (Nginx Plus only; use passive for open-source)
    server 10.0.0.3:3000 max_fails=3 fail_timeout=30s;

    # Keepalive connections to backends
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    # ... SSL config omitted for brevity ...

    location / {
        proxy_pass http://app_servers;

        proxy_set_header Host              \$host;
        proxy_set_header X-Real-IP         \$remote_addr;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Connection        "";
        proxy_http_version 1.1;

        proxy_connect_timeout 5s;
        proxy_read_timeout    60s;
    }
}`;

const codeWebSocket = `# WebSocket proxy configuration
server {
    listen 443 ssl http2;
    server_name ws.example.com;

    # ... SSL config ...

    location /ws/ {
        proxy_pass http://localhost:8080;

        # WebSocket upgrade headers
        proxy_http_version 1.1;
        proxy_set_header Upgrade    \$http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host            \$host;
        proxy_set_header X-Real-IP       \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;

        # Long timeout for persistent connections
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }

    # Regular HTTP traffic on the same server
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host              \$host;
        proxy_set_header X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}`;

const codeCaching = `# Caching with proxy_cache
proxy_cache_path /var/cache/nginx
    levels=1:2
    keys_zone=app_cache:10m
    max_size=1g
    inactive=60m
    use_temp_path=off;

server {
    listen 443 ssl http2;
    server_name example.com;

    # ... SSL config ...

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;

        # Enable cache
        proxy_cache         app_cache;
        proxy_cache_key     "\$scheme\$request_method\$host\$request_uri";
        proxy_cache_valid   200 302 10m;
        proxy_cache_valid   404     1m;

        # Return stale content while refreshing
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;

        # Add cache status header for debugging
        add_header X-Cache-Status \$upstream_cache_status;

        # Don't cache if Cookie or Authorization header present
        proxy_cache_bypass \$http_cookie \$http_authorization;
        proxy_no_cache     \$http_cookie \$http_authorization;
    }

    # Bypass cache for API routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_cache_bypass 1;
        proxy_no_cache     1;
    }
}`;

const codeProxyPassSlash = `# proxy_pass trailing slash behavior
# Rule: proxy_pass with a URI replaces the matching location prefix.
#       proxy_pass without a URI passes the full original request URI.

server {
    listen 80;
    server_name example.com;

    # Keep the /api/ prefix on the upstream request
    # Request:  /api/users?id=1
    # Upstream: http://api_backend/api/users?id=1
    location /api/ {
        proxy_pass http://api_backend;
    }

    # Strip the /app/ prefix before forwarding
    # Request:  /app/dashboard
    # Upstream: http://app_backend/dashboard
    location /app/ {
        proxy_pass http://app_backend/;
    }

    # Replace /docs/ with /manual/
    # Request:  /docs/install.html
    # Upstream: http://docs_backend/manual/install.html
    location /docs/ {
        proxy_pass http://docs_backend/manual/;
    }

    # In regex or named locations, do not add a URI part to proxy_pass.
    # Use rewrite or pass the full request URI explicitly instead.
    location ~ ^/files/(.*)$ {
        proxy_pass http://file_backend;
    }
}`;

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Nginx Reverse Proxy Configuration Guide: SSL, Upstream, Load Balancing',
    intro: 'A reverse proxy sits between your clients and backend servers, forwarding requests and returning responses. Nginx is the most popular choice for this role in 2026 — it handles SSL termination, load balancing, caching, and WebSocket proxying with minimal configuration. This guide covers every production-ready pattern you need.',
    slashTitle: 'Quick Answers: nginx proxy_pass Trailing Slash',
    slashIntro: 'The trailing slash question is really a URI replacement question: proxy_pass with a URI rewrites the matching location prefix; proxy_pass without a URI forwards the original request URI.',
    slashQ1: 'What happens with proxy_pass http://backend?',
    slashA1: 'No URI is specified, so Nginx forwards the full request URI. A request for /api/users reaches the upstream as /api/users.',
    slashQ2: 'What happens with proxy_pass http://backend/?',
    slashA2: 'The slash is a URI of /. Nginx replaces the matching location prefix with /, so location /api/ plus /api/users reaches the upstream as /users.',
    slashQ3: 'What happens with proxy_pass http://backend/service/?',
    slashA3: 'The /service/ URI replaces the matching location prefix. For location /api/, /api/users becomes /service/users upstream.',
    slashQ4: 'Can I use a URI part in regex or named locations?',
    slashA4: 'Avoid it. When Nginx cannot determine the prefix to replace, specify proxy_pass without a URI and use rewrite rules or variables deliberately.',
    slashMapTitle: 'Request Mapping Examples',
    basicTitle: 'Basic Reverse Proxy Setup',
    basicDesc: 'The simplest reverse proxy forwards all requests to a single backend server. The key headers ensure your backend sees the real client IP and protocol.',
    sslTitle: 'SSL/TLS Termination',
    sslDesc: 'SSL termination at Nginx means your backend servers only handle HTTP internally, simplifying their configuration. Nginx handles the encryption overhead.',
    upstreamTitle: 'Upstream Blocks and Load Balancing',
    upstreamDesc: 'The upstream block defines a pool of backend servers. Nginx supports round-robin, least-connections, and IP-hash load balancing algorithms.',
    websocketTitle: 'WebSocket Proxying',
    websocketDesc: 'WebSocket connections require special handling because they upgrade from HTTP to a persistent TCP connection. The Upgrade and Connection headers must be forwarded.',
    cachingTitle: 'Proxy Caching',
    cachingDesc: 'Nginx can cache backend responses to reduce load and improve latency for cacheable content.',
    dirTitle: 'Quick Reference: Key Directives',
    bestPracticesTitle: 'Production Best Practices',
    bp1: 'Always test configuration before reloading: nginx -t. Never reload without testing in production.',
    bp2: 'Use proxy_set_header X-Forwarded-Proto $scheme so your backend knows whether the original request was HTTP or HTTPS.',
    bp3: 'Set appropriate timeouts. The default proxy_read_timeout is 60s — increase for long-running requests (file uploads, reports).',
    bp4: 'Enable keepalive connections to backends using proxy_http_version 1.1 and keepalive in the upstream block for better performance.',
    bp5: 'Monitor /var/log/nginx/error.log and access.log. Set up log rotation with logrotate.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How do I pass the real client IP to my backend?',
    faq1a: 'Add these headers: proxy_set_header X-Real-IP $remote_addr and proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for. Then in your backend, read X-Real-IP (for the direct client) or the first entry in X-Forwarded-For. If using multiple proxies, configure trusted proxy IPs.',
    faq2q: 'How do I handle multiple backends with different paths?',
    faq2a: 'Use multiple location blocks: location /api/ { proxy_pass http://api-server:8080; } and location /app/ { proxy_pass http://app-server:3000/; }. The proxy_pass URI matters: a target with no URI keeps the matched prefix, while a target with a URI replaces the matched location prefix.',
    faq3q: 'What is the difference between proxy_pass with and without a trailing slash?',
    faq3a: 'Without a URI, proxy_pass http://backend forwards the full request URI including the location path. With a URI, proxy_pass http://backend/ replaces the matched location prefix with /. Example: location /app/ with proxy_pass http://backend/ forwards /app/page as /page.',
    faq4q: 'How do I debug proxy connection issues?',
    faq4a: 'Check /var/log/nginx/error.log first. Common issues: (1) upstream connection refused — backend not running or wrong port; (2) upstream timed out — increase proxy_read_timeout; (3) 502 Bad Gateway — backend crashed or returned invalid response. Add "error_log /var/log/nginx/error.log debug;" temporarily for verbose logging.',
    faq5q: 'How do I configure Nginx to use HTTP/2 for backends?',
    faq5a: 'Nginx\'s proxy module only supports HTTP/1.1 for upstream connections (as of 2026). HTTP/2 is only for client-to-Nginx connections (listen 443 ssl http2). To get HTTP/2 end-to-end, use grpc_pass instead of proxy_pass for gRPC backends, or use Nginx Plus which has HTTP/2 upstream support.',
    relatedTitle: 'Related Tools',
  },
  zh: {
    title: 'Nginx 反向代理配置指南：SSL、上游和负载均衡',
    intro: '反向代理位于客户端和后端服务器之间，转发请求并返回响应。Nginx 是 2026 年这一角色最流行的选择——它以最少的配置处理 SSL 终止、负载均衡、缓存和 WebSocket 代理。本指南涵盖了所有你需要的生产就绪模式。',
    slashTitle: '快速答案：nginx proxy_pass 尾部斜杠',
    slashIntro: 'proxy_pass 的尾部斜杠本质上是 URI 替换规则：带 URI 的 proxy_pass 会替换匹配到的 location 前缀；不带 URI 的 proxy_pass 会转发原始请求 URI。',
    slashQ1: 'proxy_pass http://backend 会发生什么？',
    slashA1: '没有指定 URI，因此 Nginx 会转发完整请求 URI。请求 /api/users 会作为 /api/users 到达上游。',
    slashQ2: 'proxy_pass http://backend/ 会发生什么？',
    slashA2: '这个斜杠本身就是 URI /。Nginx 会用 / 替换匹配到的 location 前缀，因此 location /api/ 下的 /api/users 会作为 /users 到达上游。',
    slashQ3: 'proxy_pass http://backend/service/ 会发生什么？',
    slashA3: '/service/ 这个 URI 会替换匹配到的 location 前缀。对于 location /api/，/api/users 会变成上游的 /service/users。',
    slashQ4: '正则 location 或 named location 里能使用 URI 部分吗？',
    slashA4: '应避免这样写。当 Nginx 无法确定要替换的前缀时，应使用不带 URI 的 proxy_pass，并有意识地配合 rewrite 或变量。',
    slashMapTitle: '请求映射示例',
    basicTitle: '基本反向代理设置',
    basicDesc: '最简单的反向代理将所有请求转发到单个后端服务器。关键头部确保你的后端看到真实的客户端 IP 和协议。',
    sslTitle: 'SSL/TLS 终止',
    sslDesc: '在 Nginx 处进行 SSL 终止意味着你的后端服务器只需在内部处理 HTTP，简化了它们的配置。Nginx 处理加密开销。',
    upstreamTitle: '上游块和负载均衡',
    upstreamDesc: 'upstream 块定义了一组后端服务器。Nginx 支持轮询、最少连接和 IP 哈希负载均衡算法。',
    websocketTitle: 'WebSocket 代理',
    websocketDesc: 'WebSocket 连接需要特殊处理，因为它们从 HTTP 升级为持久 TCP 连接。必须转发 Upgrade 和 Connection 头。',
    cachingTitle: '代理缓存',
    cachingDesc: 'Nginx 可以缓存后端响应，以减少可缓存内容的负载和延迟。',
    dirTitle: '快速参考：关键指令',
    bestPracticesTitle: '生产最佳实践',
    bp1: '重载前始终测试配置：nginx -t。在生产环境中永远不要不测试就重载。',
    bp2: '使用 proxy_set_header X-Forwarded-Proto $scheme，让后端知道原始请求是 HTTP 还是 HTTPS。',
    bp3: '设置适当的超时。默认的 proxy_read_timeout 是 60s——对于长时间运行的请求（文件上传、报告）需要增加。',
    bp4: '在上游块中使用 proxy_http_version 1.1 和 keepalive 启用到后端的 keepalive 连接，以获得更好的性能。',
    bp5: '监控 /var/log/nginx/error.log 和 access.log。使用 logrotate 设置日志轮换。',
    faqTitle: '常见问题',
    faq1q: '如何将真实客户端 IP 传递给后端？',
    faq1a: '添加这些头部：proxy_set_header X-Real-IP $remote_addr 和 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for。然后在后端，读取 X-Real-IP（直接客户端）或 X-Forwarded-For 中的第一个条目。如果使用多个代理，配置受信任的代理 IP。',
    faq2q: '如何处理具有不同路径的多个后端？',
    faq2a: '使用多个 location 块：location /api/ { proxy_pass http://api-server:8080; } 和 location /app/ { proxy_pass http://app-server:3000/; }。proxy_pass 的 URI 很重要：不带 URI 会保留匹配前缀，带 URI 会替换匹配到的 location 前缀。',
    faq3q: 'proxy_pass 有无尾部斜杠有什么区别？',
    faq3a: '不带 URI 时，proxy_pass http://backend 会转发包含 location 路径的完整请求 URI。带 URI 时，proxy_pass http://backend/ 会用 / 替换匹配到的 location 前缀。例如：location /app/ 搭配 proxy_pass http://backend/ 会将 /app/page 作为 /page 转发给后端。',
    faq4q: '如何调试代理连接问题？',
    faq4a: '首先检查 /var/log/nginx/error.log。常见问题：(1) upstream connection refused——后端未运行或端口错误；(2) upstream timed out——增加 proxy_read_timeout；(3) 502 Bad Gateway——后端崩溃或返回无效响应。临时添加 "error_log /var/log/nginx/error.log debug;" 进行详细日志记录。',
    faq5q: '如何配置 Nginx 对后端使用 HTTP/2？',
    faq5a: 'Nginx 的代理模块只支持上游连接的 HTTP/1.1（截至 2026 年）。HTTP/2 只适用于客户端到 Nginx 的连接（listen 443 ssl http2）。要实现端到端 HTTP/2，对 gRPC 后端使用 grpc_pass 而不是 proxy_pass，或使用支持 HTTP/2 上游的 Nginx Plus。',
    relatedTitle: '相关工具',
  },
};

export default function NginxReverseProxyConfig({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  const dirRows = [
    { directive: 'proxy_pass', desc: 'Upstream backend URL' },
    { directive: 'proxy_set_header', desc: 'Modify/add request headers to backend' },
    { directive: 'proxy_connect_timeout', desc: 'Time to establish connection to backend' },
    { directive: 'proxy_read_timeout', desc: 'Time to read response from backend' },
    { directive: 'proxy_send_timeout', desc: 'Time to send request to backend' },
    { directive: 'proxy_buffering', desc: 'Buffer backend responses (on/off)' },
    { directive: 'proxy_cache', desc: 'Enable caching using a named cache zone' },
    { directive: 'proxy_cache_valid', desc: 'Cache duration per status code' },
    { directive: 'proxy_http_version', desc: 'HTTP version for backend (set 1.1 for keepalive)' },
    { directive: 'upstream', desc: 'Define a pool of backend servers' },
    { directive: 'keepalive', desc: 'Max idle keepalive connections to backends' },
  ];

  const slashAnswerRows = [
    { q: t.slashQ1, a: t.slashA1 },
    { q: t.slashQ2, a: t.slashA2 },
    { q: t.slashQ3, a: t.slashA3 },
    { q: t.slashQ4, a: t.slashA4 },
  ];

  const slashMapRows = [
    { location: '/api/', proxyPass: 'http://backend', request: '/api/users', upstream: '/api/users' },
    { location: '/api/', proxyPass: 'http://backend/', request: '/api/users', upstream: '/users' },
    { location: '/docs/', proxyPass: 'http://backend/manual/', request: '/docs/install.html', upstream: '/manual/install.html' },
  ];

  const preStyle: React.CSSProperties = { background: '#1e1e1e', color: '#d4d4d4', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>{t.intro}</p>

      <section style={{ margin: '2rem 0', padding: '1.25rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.slashTitle}</h2>
        <p style={{ color: '#4a5568', lineHeight: 1.8 }}>{t.slashIntro}</p>
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.25rem' }}>
          {slashAnswerRows.map((row, i) => (
            <div key={i} style={{ padding: '1rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{row.q}</h3>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.7 }}>{row.a}</p>
            </div>
          ))}
        </div>
        <h3 style={{ marginTop: '1.5rem' }}>{t.slashMapTitle}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>location</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>proxy_pass</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>request</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>upstream URI</th>
              </tr>
            </thead>
            <tbody>
              {slashMapRows.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.location}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.proxyPass}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace' }}>{row.request}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontWeight: 600 }}>{row.upstream}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre style={{ ...preStyle, marginTop: '1.25rem' }}><code>{codeProxyPassSlash}</code></pre>
      </section>

      <h2>{t.basicTitle}</h2>
      <p>{t.basicDesc}</p>
      <pre style={preStyle}><code>{codeBasicProxy}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.sslTitle}</h2>
      <p>{t.sslDesc}</p>
      <pre style={preStyle}><code>{codeSSL}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.upstreamTitle}</h2>
      <p>{t.upstreamDesc}</p>
      <pre style={preStyle}><code>{codeUpstreamLB}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.websocketTitle}</h2>
      <p>{t.websocketDesc}</p>
      <pre style={preStyle}><code>{codeWebSocket}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.cachingTitle}</h2>
      <p>{t.cachingDesc}</p>
      <pre style={preStyle}><code>{codeCaching}</code></pre>

      <h2 style={{ marginTop: '2.5rem' }}>{t.dirTitle}</h2>
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Directive</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {dirRows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8f9fa' }}>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6', fontFamily: 'monospace', fontWeight: 600 }}>{row.directive}</td>
                <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: '2.5rem' }}>{t.bestPracticesTitle}</h2>
      <ol style={{ lineHeight: '2', paddingLeft: '1.5rem' }}>
        <li>{t.bp1}</li>
        <li>{t.bp2}</li>
        <li>{t.bp3}</li>
        <li>{t.bp4}</li>
        <li>{t.bp5}</li>
      </ol>

      <h2 style={{ marginTop: '2.5rem' }}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #38a169' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{q}</h3>
          <p style={{ margin: 0, color: '#4a5568' }}>{a}</p>
        </div>
      ))}

      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f0f4f8', borderRadius: '8px' }}>
        <h2 style={{ marginTop: 0 }}>{t.relatedTitle}</h2>
        <ul style={{ paddingLeft: '1.25rem', lineHeight: '2' }}>
          <li><Link href="/en/tools/curl-to-code" style={{ color: '#3182ce' }}>cURL to Code Converter</Link></li>
          <li><Link href="/en/tools/json-formatter" style={{ color: '#3182ce' }}>JSON Formatter</Link></li>
          <li><Link href="/en/tools/cors-tester" style={{ color: '#3182ce' }}>CORS Tester</Link></li>
        </ul>
      </div>
    </article>
  );
}
