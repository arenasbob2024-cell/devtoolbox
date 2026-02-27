'use client';

import React from 'react';

const translations = {
  en: {
    title: 'The Complete Nginx Guide: Installation, Configuration, Reverse Proxy, SSL, Load Balancing & Performance Tuning',
    description:
      'Master Nginx from beginner to production: installation, server blocks, location directives, reverse proxy, load balancing, SSL/TLS, caching, rate limiting, security headers, WebSocket proxy, gzip compression, performance tuning, and common configuration patterns.',
  },
  zh: {
    title: 'Nginx 完全指南：安装、配置、反向代理、SSL、负载均衡与性能调优',
    description:
      '从入门到生产环境全面掌握 Nginx：安装部署、server blocks、location 指令、反向代理、负载均衡、SSL/TLS 证书、缓存策略、速率限制、安全头、WebSocket 代理、gzip 压缩、性能调优以及常见配置模式。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between Nginx and Apache?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nginx uses an asynchronous, event-driven architecture that handles thousands of concurrent connections in a single worker process with minimal memory. Apache uses a process/thread-per-connection model by default (prefork/worker MPMs). Nginx excels at serving static files and reverse proxying, while Apache offers more flexible per-directory configuration via .htaccess files. For modern high-traffic sites, Nginx is generally preferred for its lower resource usage and higher concurrency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I set up a reverse proxy with Nginx?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the proxy_pass directive inside a location block: location / { proxy_pass http://127.0.0.1:3000; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; }. This forwards all requests to a backend running on port 3000 while preserving the original client information through headers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I configure SSL/TLS with Nginx and Let\'s Encrypt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install Certbot (apt install certbot python3-certbot-nginx), then run certbot --nginx -d yourdomain.com. Certbot automatically obtains a certificate and modifies your Nginx config to listen on port 443 with ssl_certificate and ssl_certificate_key directives. For best security, add ssl_protocols TLSv1.2 TLSv1.3, ssl_prefer_server_ciphers on, and enable HSTS. Certbot sets up auto-renewal via a systemd timer or cron job.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between location /, location =, location ~, and location ^~ in Nginx?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'location / is a prefix match (matches any URI starting with /). location = /path is an exact match with highest priority. location ~ pattern is a case-sensitive regex match, and location ~* is case-insensitive. location ^~ /path is a prefix match that stops regex checking if matched. Priority order: exact (=) > preferential prefix (^~) > regex (~ / ~*) > regular prefix (longest match). Understanding this order is crucial for correct routing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I configure Nginx load balancing across multiple backends?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Define an upstream block with your backend servers: upstream myapp { server 127.0.0.1:3001; server 127.0.0.1:3002; server 127.0.0.1:3003; }. Then proxy_pass to it: proxy_pass http://myapp;. Nginx supports round-robin (default), least_conn (fewest active connections), ip_hash (sticky sessions by client IP), and weighted distribution (server host weight=3). Add max_fails and fail_timeout for health checking.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I enable gzip compression in Nginx?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add gzip on; in the http block, then configure: gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript; gzip_min_length 1000; gzip_comp_level 5; gzip_vary on;. This compresses responses over 1KB for the specified MIME types. Level 5 balances CPU usage and compression ratio. Always set gzip_vary on so CDNs cache compressed and uncompressed versions separately.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I proxy WebSocket connections through Nginx?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WebSocket requires HTTP Upgrade headers. Add: location /ws { proxy_pass http://backend; proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade"; proxy_set_header Host $host; proxy_read_timeout 86400s; }. The key directives are proxy_http_version 1.1 and the Upgrade/Connection headers. Increase proxy_read_timeout to prevent Nginx from closing idle WebSocket connections.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement rate limiting in Nginx?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the limit_req module. First define a zone in the http block: limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;. Then apply it in a location block: limit_req zone=api burst=20 nodelay;. This allows 10 requests per second per IP with a burst queue of 20. The nodelay flag processes burst requests immediately rather than throttling them. Use limit_req_status 429 to return a proper Too Many Requests status code.',
      },
    },
  ],
};

export default function NginxGuide({ lang }: { lang: string }) {
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
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览 Nginx 核心知识' : 'TL;DR — Nginx Essentials in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? 'Nginx 是事件驱动、异步非阻塞的 Web 服务器，单进程可处理数万并发连接' : 'Nginx is an event-driven, non-blocking web server — a single worker handles tens of thousands of concurrent connections'}</li>
          <li>{isZh ? 'server block 定义虚拟主机，location block 控制 URI 路由和请求处理' : 'Server blocks define virtual hosts; location blocks control URI routing and request handling'}</li>
          <li>{isZh ? 'proxy_pass 实现反向代理，upstream block 实现多后端负载均衡' : 'proxy_pass enables reverse proxying; upstream blocks enable multi-backend load balancing'}</li>
          <li>{isZh ? 'Let\'s Encrypt + Certbot 提供免费自动化 SSL/TLS 证书' : 'Let\'s Encrypt + Certbot provides free, automated SSL/TLS certificates'}</li>
          <li>{isZh ? 'limit_req_zone 控制速率限制，防止 API 滥用和 DDoS' : 'limit_req_zone controls rate limiting to prevent API abuse and DDoS'}</li>
          <li>{isZh ? 'gzip 压缩可将文本资源体积减少 60-80%' : 'Gzip compression reduces text resource size by 60-80%'}</li>
          <li>{isZh ? 'worker_processes auto + worker_connections 4096 是高并发起点配置' : 'worker_processes auto + worker_connections 4096 is the starting point for high concurrency'}</li>
        </ul>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', marginBottom: '32px' }}>
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '8px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.9' }}>
          <li>{isZh ? 'Nginx 架构：master 进程管理 worker 进程，每个 worker 通过 epoll/kqueue 处理数千连接' : 'Nginx architecture: master process manages workers; each worker handles thousands of connections via epoll/kqueue'}</li>
          <li>{isZh ? 'Location 优先级：精确匹配 (=) > 优先前缀 (^~) > 正则 (~ / ~*) > 普通前缀（最长匹配）' : 'Location priority: exact (=) > preferential prefix (^~) > regex (~ / ~*) > regular prefix (longest match)'}</li>
          <li>{isZh ? '生产环境必须配置安全头：HSTS、CSP、X-Frame-Options、X-Content-Type-Options' : 'Production requires security headers: HSTS, CSP, X-Frame-Options, X-Content-Type-Options'}</li>
          <li>{isZh ? '负载均衡策略：轮询（默认）、least_conn、ip_hash、权重分配' : 'Load balancing strategies: round-robin (default), least_conn, ip_hash, weighted distribution'}</li>
          <li>{isZh ? 'WebSocket 代理需要 proxy_http_version 1.1 和 Upgrade/Connection 头' : 'WebSocket proxying requires proxy_http_version 1.1 and Upgrade/Connection headers'}</li>
          <li>{isZh ? '缓存配置：proxy_cache_path + proxy_cache 可大幅降低后端负载' : 'Caching: proxy_cache_path + proxy_cache drastically reduces backend load'}</li>
        </ul>
      </div>

      {/* Section 1: Installation */}
      <h2 style={h2Style}>
        {isZh ? '1. 安装与启动' : '1. Installation & Getting Started'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Nginx 可通过系统包管理器或官方仓库安装。推荐使用官方仓库以获取最新稳定版本。'
          : 'Nginx can be installed through your system package manager or the official repository. The official repo is recommended for the latest stable release.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? 'Ubuntu / Debian 安装' : 'Ubuntu / Debian Installation'}
      </h3>
      <pre style={preStyle}><code>{'# Install prerequisites\n'
        + 'sudo apt update\n'
        + 'sudo apt install -y curl gnupg2 ca-certificates lsb-release\n\n'
        + '# Add official Nginx signing key and repo\n'
        + 'curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo gpg --dearmor -o /usr/share/keyrings/nginx-archive-keyring.gpg\n'
        + 'echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu $(lsb_release -cs) nginx" | sudo tee /etc/apt/sources.list.d/nginx.list\n\n'
        + '# Install Nginx\n'
        + 'sudo apt update\n'
        + 'sudo apt install -y nginx\n\n'
        + '# Start and enable\n'
        + 'sudo systemctl start nginx\n'
        + 'sudo systemctl enable nginx\n'
        + 'sudo systemctl status nginx'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'CentOS / RHEL / Rocky 安装' : 'CentOS / RHEL / Rocky Installation'}
      </h3>
      <pre style={preStyle}><code>{'sudo yum install -y epel-release\n'
        + 'sudo yum install -y nginx\n'
        + 'sudo systemctl start nginx\n'
        + 'sudo systemctl enable nginx\n'
        + 'sudo firewall-cmd --permanent --add-service=http\n'
        + 'sudo firewall-cmd --permanent --add-service=https\n'
        + 'sudo firewall-cmd --reload'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'macOS (Homebrew)' : 'macOS (Homebrew)'}
      </h3>
      <pre style={preStyle}><code>{'brew install nginx\n'
        + 'brew services start nginx\n'
        + '# Config: /opt/homebrew/etc/nginx/nginx.conf\n'
        + '# Default port: 8080'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '关键目录结构' : 'Key Directory Structure'}
      </h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '路径' : 'Path'}</th>
            <th style={thStyle}>{isZh ? '用途' : 'Purpose'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>/etc/nginx/nginx.conf</td><td style={tdStyle}>{isZh ? '主配置文件' : 'Main config file'}</td></tr>
          <tr><td style={tdStyle}>/etc/nginx/conf.d/</td><td style={tdStyle}>{isZh ? '附加配置（推荐放 server blocks）' : 'Additional configs (recommended for server blocks)'}</td></tr>
          <tr><td style={tdStyle}>/etc/nginx/sites-available/</td><td style={tdStyle}>{isZh ? '可用站点（Debian 风格）' : 'Available sites (Debian-style)'}</td></tr>
          <tr><td style={tdStyle}>/etc/nginx/sites-enabled/</td><td style={tdStyle}>{isZh ? '已启用站点（符号链接）' : 'Enabled sites (symlinks)'}</td></tr>
          <tr><td style={tdStyle}>/var/log/nginx/</td><td style={tdStyle}>{isZh ? '访问日志和错误日志' : 'Access and error logs'}</td></tr>
          <tr><td style={tdStyle}>/var/www/html/</td><td style={tdStyle}>{isZh ? '默认 Web 根目录' : 'Default web root'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Essential Nginx commands\n'
        + 'nginx -t                      # Test config syntax\n'
        + 'sudo systemctl reload nginx   # Reload without downtime\n'
        + 'sudo systemctl restart nginx  # Full restart\n'
        + 'nginx -V                      # Show compile-time modules\n'
        + 'nginx -T                      # Dump full merged config'}</code></pre>

      {/* Section 2: Core Config Structure */}
      <h2 style={h2Style}>
        {isZh ? '2. 核心配置结构' : '2. Core Configuration Structure'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Nginx 配置采用层级上下文结构：main → events → http → server → location。理解这个层次是正确配置的基础。'
          : 'Nginx configuration uses a hierarchical context structure: main -> events -> http -> server -> location. Understanding this hierarchy is fundamental to correct configuration.'}
      </p>
      <pre style={preStyle}><code>{'# /etc/nginx/nginx.conf — Main configuration skeleton\n'
        + 'user  nginx;\n'
        + 'worker_processes  auto;           # One worker per CPU core\n'
        + 'error_log  /var/log/nginx/error.log warn;\n'
        + 'pid        /var/run/nginx.pid;\n\n'
        + 'events {\n'
        + '    worker_connections  4096;      # Max connections per worker\n'
        + '    multi_accept on;              # Accept multiple connections at once\n'
        + '    use epoll;                    # Linux: epoll, macOS: kqueue\n'
        + '}\n\n'
        + 'http {\n'
        + '    include       /etc/nginx/mime.types;\n'
        + '    default_type  application/octet-stream;\n\n'
        + '    # Logging\n'
        + '    log_format main \'$remote_addr - $remote_user [$time_local] \'\n'
        + '                    \'"$request" $status $body_bytes_sent \'\n'
        + '                    \'"$http_referer" "$http_user_agent"\';\n'
        + '    access_log /var/log/nginx/access.log main;\n\n'
        + '    # Performance\n'
        + '    sendfile        on;\n'
        + '    tcp_nopush      on;\n'
        + '    tcp_nodelay     on;\n'
        + '    keepalive_timeout  65;\n\n'
        + '    # Include server blocks\n'
        + '    include /etc/nginx/conf.d/*.conf;\n'
        + '}'}</code></pre>

      {/* Section 3: Server Blocks */}
      <h2 style={h2Style}>
        {isZh ? '3. Server Blocks（虚拟主机）' : '3. Server Blocks (Virtual Hosts)'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Server blocks 允许在同一台 Nginx 实例上托管多个域名。每个 server block 根据 server_name 和 listen 端口来匹配请求。'
          : 'Server blocks allow hosting multiple domains on a single Nginx instance. Each server block matches requests based on server_name and listen port.'}
      </p>
      <pre style={preStyle}><code>{'# /etc/nginx/conf.d/example.com.conf\nserver {\n'
        + '    listen 80;\n'
        + '    listen [::]:80;                # IPv6\n'
        + '    server_name example.com www.example.com;\n\n'
        + '    root /var/www/example.com/public;\n'
        + '    index index.html index.htm;\n\n'
        + '    # Access & error logs per site\n'
        + '    access_log /var/log/nginx/example.com.access.log;\n'
        + '    error_log  /var/log/nginx/example.com.error.log;\n\n'
        + '    location / {\n'
        + '        try_files $uri $uri/ =404;\n'
        + '    }\n\n'
        + '    # Custom error pages\n'
        + '    error_page 404 /404.html;\n'
        + '    error_page 500 502 503 504 /50x.html;\n'
        + '    location = /50x.html {\n'
        + '        root /usr/share/nginx/html;\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'WWW 到非 WWW 重定向' : 'WWW to Non-WWW Redirect'}
      </h3>
      <pre style={preStyle}><code>{'server {\n'
        + '    listen 80;\n'
        + '    server_name www.example.com;\n'
        + '    return 301 $scheme://example.com$request_uri;\n'
        + '}'}</code></pre>

      {/* Section 4: Location Blocks */}
      <h2 style={h2Style}>
        {isZh ? '4. Location 指令详解' : '4. Location Directives Deep Dive'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Location 指令决定 Nginx 如何处理不同的 URI。理解匹配优先级是避免路由问题的关键。'
          : 'Location directives determine how Nginx handles different URIs. Understanding match priority is the key to avoiding routing issues.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '修饰符' : 'Modifier'}</th>
            <th style={thStyle}>{isZh ? '类型' : 'Type'}</th>
            <th style={thStyle}>{isZh ? '优先级' : 'Priority'}</th>
            <th style={thStyle}>{isZh ? '说明' : 'Description'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>=</td><td style={tdStyle}>{isZh ? '精确匹配' : 'Exact'}</td><td style={tdStyle}>1</td><td style={tdStyle}>{isZh ? '精确匹配 URI，最高优先级' : 'Exact URI match, highest priority'}</td></tr>
          <tr><td style={tdStyle}>^~</td><td style={tdStyle}>{isZh ? '优先前缀' : 'Preferential prefix'}</td><td style={tdStyle}>2</td><td style={tdStyle}>{isZh ? '前缀匹配成功后跳过正则检查' : 'Stops regex checking if prefix matches'}</td></tr>
          <tr><td style={tdStyle}>~ </td><td style={tdStyle}>{isZh ? '区分大小写正则' : 'Case-sensitive regex'}</td><td style={tdStyle}>3</td><td style={tdStyle}>{isZh ? '正则表达式匹配（区分大小写）' : 'Regex match (case-sensitive)'}</td></tr>
          <tr><td style={tdStyle}>~*</td><td style={tdStyle}>{isZh ? '不区分大小写正则' : 'Case-insensitive regex'}</td><td style={tdStyle}>3</td><td style={tdStyle}>{isZh ? '正则表达式匹配（不区分大小写）' : 'Regex match (case-insensitive)'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '（无）' : '(none)'}</td><td style={tdStyle}>{isZh ? '前缀匹配' : 'Prefix'}</td><td style={tdStyle}>4</td><td style={tdStyle}>{isZh ? '普通前缀匹配（最长匹配优先）' : 'Regular prefix match (longest wins)'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Location matching examples\nserver {\n'
        + '    # 1. Exact match — highest priority\n'
        + '    location = / {\n'
        + '        # Only matches exactly "/"\n'
        + '        return 200 "Homepage";\n'
        + '    }\n\n'
        + '    # 2. Preferential prefix — skips regex\n'
        + '    location ^~ /static/ {\n'
        + '        # Any URI starting with /static/\n'
        + '        root /var/www/assets;\n'
        + '    }\n\n'
        + '    # 3. Case-sensitive regex\n'
        + '    location ~ \\.php$ {\n'
        + '        # URIs ending in .php\n'
        + '        fastcgi_pass unix:/run/php/php-fpm.sock;\n'
        + '    }\n\n'
        + '    # 4. Case-insensitive regex\n'
        + '    location ~* \\.(jpg|jpeg|png|gif|ico|svg)$ {\n'
        + '        expires 30d;\n'
        + '        add_header Cache-Control "public, immutable";\n'
        + '    }\n\n'
        + '    # 5. Regular prefix (fallback)\n'
        + '    location / {\n'
        + '        try_files $uri $uri/ /index.html;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 5: Reverse Proxy */}
      <h2 style={h2Style}>
        {isZh ? '5. 反向代理配置' : '5. Reverse Proxy Configuration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '反向代理是 Nginx 最常见的用途之一。它将客户端请求转发到后端应用服务器（Node.js、Python、Go 等），同时处理 SSL 终止、静态文件服务和负载均衡。'
          : 'Reverse proxying is one of the most common uses of Nginx. It forwards client requests to backend application servers (Node.js, Python, Go, etc.) while handling SSL termination, static file serving, and load balancing.'}
      </p>
      <pre style={preStyle}><code>{'# Reverse proxy to a Node.js / Next.js app\nserver {\n'
        + '    listen 80;\n'
        + '    server_name myapp.com;\n\n'
        + '    # Proxy all requests to backend\n'
        + '    location / {\n'
        + '        proxy_pass http://127.0.0.1:3000;\n\n'
        + '        # Preserve original client info\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n'
        + '        proxy_set_header X-Forwarded-Proto $scheme;\n\n'
        + '        # Timeouts\n'
        + '        proxy_connect_timeout 60s;\n'
        + '        proxy_send_timeout    60s;\n'
        + '        proxy_read_timeout    60s;\n\n'
        + '        # Buffering\n'
        + '        proxy_buffering on;\n'
        + '        proxy_buffer_size 4k;\n'
        + '        proxy_buffers 8 16k;\n'
        + '    }\n\n'
        + '    # Serve static files directly (bypass proxy)\n'
        + '    location /static/ {\n'
        + '        alias /var/www/myapp/static/;\n'
        + '        expires 30d;\n'
        + '        add_header Cache-Control "public, immutable";\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 6: Load Balancing */}
      <h2 style={h2Style}>
        {isZh ? '6. 负载均衡' : '6. Load Balancing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Nginx 通过 upstream 块将流量分发到多个后端服务器，实现高可用和水平扩展。'
          : 'Nginx distributes traffic across multiple backend servers via upstream blocks, enabling high availability and horizontal scaling.'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '策略' : 'Strategy'}</th>
            <th style={thStyle}>{isZh ? '指令' : 'Directive'}</th>
            <th style={thStyle}>{isZh ? '适用场景' : 'Use Case'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '轮询（默认）' : 'Round Robin (default)'}</td><td style={tdStyle}>—</td><td style={tdStyle}>{isZh ? '后端性能均匀' : 'Backends with equal capacity'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '最少连接' : 'Least Connections'}</td><td style={tdStyle}>least_conn</td><td style={tdStyle}>{isZh ? '请求处理时间差异大' : 'Varying request processing times'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? 'IP 哈希' : 'IP Hash'}</td><td style={tdStyle}>ip_hash</td><td style={tdStyle}>{isZh ? '需要会话保持' : 'Session persistence required'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '权重分配' : 'Weighted'}</td><td style={tdStyle}>weight=N</td><td style={tdStyle}>{isZh ? '后端性能不均匀' : 'Backends with different capacities'}</td></tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# Load balancing with health checks\nupstream backend {\n'
        + '    least_conn;                       # Use least connections strategy\n\n'
        + '    server 10.0.0.1:3000 weight=3;    # 3x traffic share\n'
        + '    server 10.0.0.2:3000 weight=2;    # 2x traffic share\n'
        + '    server 10.0.0.3:3000 weight=1;    # 1x traffic share\n\n'
        + '    server 10.0.0.4:3000 backup;      # Only used when others fail\n\n'
        + '    # Health check parameters\n'
        + '    # max_fails: number of failed attempts before marking down\n'
        + '    # fail_timeout: time to consider server unavailable\n'
        + '    server 10.0.0.1:3000 weight=3 max_fails=3 fail_timeout=30s;\n'
        + '}\n\n'
        + 'server {\n'
        + '    listen 80;\n'
        + '    server_name myapp.com;\n\n'
        + '    location / {\n'
        + '        proxy_pass http://backend;\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_next_upstream error timeout http_500 http_502 http_503;\n'
        + '        proxy_next_upstream_tries 3;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 7: SSL/TLS */}
      <h2 style={h2Style}>
        {isZh ? '7. SSL/TLS 配置' : '7. SSL/TLS Configuration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '现代网站必须使用 HTTPS。Let\'s Encrypt 提供免费证书，Certbot 自动化管理证书的获取和续签。'
          : 'Modern websites require HTTPS. Let\'s Encrypt provides free certificates, and Certbot automates certificate acquisition and renewal.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? 'Certbot 自动配置' : 'Certbot Automatic Setup'}
      </h3>
      <pre style={preStyle}><code>{'# Install Certbot\n'
        + 'sudo apt install -y certbot python3-certbot-nginx\n\n'
        + '# Obtain certificate and auto-configure Nginx\n'
        + 'sudo certbot --nginx -d example.com -d www.example.com\n\n'
        + '# Test auto-renewal\n'
        + 'sudo certbot renew --dry-run\n\n'
        + '# Certificates stored at:\n'
        + '# /etc/letsencrypt/live/example.com/fullchain.pem\n'
        + '# /etc/letsencrypt/live/example.com/privkey.pem'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '生产级 SSL 配置' : 'Production-Grade SSL Config'}
      </h3>
      <pre style={preStyle}><code>{'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    listen [::]:443 ssl http2;\n'
        + '    server_name example.com;\n\n'
        + '    # Certificate files\n'
        + '    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;\n'
        + '    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\n\n'
        + '    # Modern TLS settings\n'
        + '    ssl_protocols TLSv1.2 TLSv1.3;\n'
        + '    ssl_prefer_server_ciphers on;\n'
        + '    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;\n\n'
        + '    # SSL session cache\n'
        + '    ssl_session_cache shared:SSL:10m;\n'
        + '    ssl_session_timeout 1d;\n'
        + '    ssl_session_tickets off;\n\n'
        + '    # OCSP Stapling\n'
        + '    ssl_stapling on;\n'
        + '    ssl_stapling_verify on;\n'
        + '    resolver 8.8.8.8 8.8.4.4 valid=300s;\n'
        + '    resolver_timeout 5s;\n\n'
        + '    # ... your location blocks\n'
        + '}\n\n'
        + '# HTTP to HTTPS redirect\n'
        + 'server {\n'
        + '    listen 80;\n'
        + '    server_name example.com www.example.com;\n'
        + '    return 301 https://example.com$request_uri;\n'
        + '}'}</code></pre>

      {/* Section 8: Caching */}
      <h2 style={h2Style}>
        {isZh ? '8. 缓存配置' : '8. Caching Configuration'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Nginx 提供两种缓存机制：静态文件浏览器缓存（expires 指令）和反向代理缓存（proxy_cache）。合理使用缓存可以显著降低后端负载和响应延迟。'
          : 'Nginx provides two caching mechanisms: browser caching for static files (expires directive) and reverse proxy caching (proxy_cache). Proper caching significantly reduces backend load and response latency.'}
      </p>

      <h3 style={h3Style}>
        {isZh ? '静态文件浏览器缓存' : 'Static File Browser Caching'}
      </h3>
      <pre style={preStyle}><code>{'# Cache static assets with long expiration\nlocation ~* \\.(css|js|woff2|woff|ttf|eot)$ {\n'
        + '    expires 1y;\n'
        + '    add_header Cache-Control "public, immutable";\n'
        + '    access_log off;\n'
        + '}\n\n'
        + 'location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {\n'
        + '    expires 30d;\n'
        + '    add_header Cache-Control "public";\n'
        + '    access_log off;\n'
        + '}\n\n'
        + '# HTML files — no cache or short cache\n'
        + 'location ~* \\.html$ {\n'
        + '    expires 1h;\n'
        + '    add_header Cache-Control "public, must-revalidate";\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '反向代理缓存' : 'Reverse Proxy Cache'}
      </h3>
      <pre style={preStyle}><code>{'# Define cache zone in http block\nhttp {\n'
        + '    proxy_cache_path /var/cache/nginx levels=1:2\n'
        + '                     keys_zone=app_cache:10m\n'
        + '                     max_size=1g\n'
        + '                     inactive=60m\n'
        + '                     use_temp_path=off;\n'
        + '}\n\n'
        + '# Use cache in server/location\nserver {\n'
        + '    location / {\n'
        + '        proxy_pass http://backend;\n'
        + '        proxy_cache app_cache;\n'
        + '        proxy_cache_valid 200 302 10m;  # Cache 200/302 for 10 min\n'
        + '        proxy_cache_valid 404     1m;   # Cache 404 for 1 min\n'
        + '        proxy_cache_use_stale error timeout updating\n'
        + '                              http_500 http_502 http_503;\n'
        + '        proxy_cache_lock on;             # Prevent thundering herd\n\n'
        + '        # Show cache status in response header\n'
        + '        add_header X-Cache-Status $upstream_cache_status;\n'
        + '    }\n\n'
        + '    # Bypass cache for authenticated users\n'
        + '    location /api/ {\n'
        + '        proxy_pass http://backend;\n'
        + '        proxy_cache app_cache;\n'
        + '        proxy_cache_bypass $http_authorization;\n'
        + '        proxy_no_cache $http_authorization;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 9: Rate Limiting */}
      <h2 style={h2Style}>
        {isZh ? '9. 速率限制' : '9. Rate Limiting'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '速率限制保护后端免受流量洪峰、暴力攻击和 API 滥用。Nginx 使用漏桶算法（leaky bucket）来平滑请求速率。'
          : 'Rate limiting protects backends from traffic spikes, brute-force attacks, and API abuse. Nginx uses a leaky bucket algorithm to smooth request rates.'}
      </p>
      <pre style={preStyle}><code>{'# Define rate limit zones in http block\nhttp {\n'
        + '    # 10 requests/sec per IP for general traffic\n'
        + '    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;\n\n'
        + '    # 5 requests/min for login endpoints\n'
        + '    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;\n\n'
        + '    # 30 requests/sec per IP for API\n'
        + '    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;\n\n'
        + '    # Connection limiting\n'
        + '    limit_conn_zone $binary_remote_addr zone=perip:10m;\n'
        + '}\n\n'
        + 'server {\n'
        + '    # General rate limit\n'
        + '    location / {\n'
        + '        limit_req zone=general burst=20 nodelay;\n'
        + '        limit_req_status 429;\n'
        + '        proxy_pass http://backend;\n'
        + '    }\n\n'
        + '    # Strict rate limit on auth endpoints\n'
        + '    location /api/login {\n'
        + '        limit_req zone=login burst=3 nodelay;\n'
        + '        limit_req_status 429;\n'
        + '        proxy_pass http://backend;\n'
        + '    }\n\n'
        + '    # Connection limit (max 10 simultaneous per IP)\n'
        + '    location /downloads/ {\n'
        + '        limit_conn perip 10;\n'
        + '        limit_rate 500k;         # Throttle to 500KB/s per connection\n'
        + '        alias /var/www/files/;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 10: Security Headers */}
      <h2 style={h2Style}>
        {isZh ? '10. 安全头配置' : '10. Security Headers'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '安全响应头是防御 XSS、点击劫持和协议降级攻击的重要防线。以下头应该在所有生产环境中设置。'
          : 'Security response headers are a critical defense against XSS, clickjacking, and protocol downgrade attacks. These headers should be set in all production environments.'}
      </p>
      <pre style={preStyle}><code>{'# Security headers — add to server or http block\n\n'
        + '# HSTS: Force HTTPS for 1 year, include subdomains\n'
        + 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;\n\n'
        + '# Prevent clickjacking\n'
        + 'add_header X-Frame-Options "SAMEORIGIN" always;\n\n'
        + '# Prevent MIME-type sniffing\n'
        + 'add_header X-Content-Type-Options "nosniff" always;\n\n'
        + '# XSS protection (legacy browsers)\n'
        + 'add_header X-XSS-Protection "1; mode=block" always;\n\n'
        + '# Referrer policy\n'
        + 'add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n\n'
        + '# Permissions policy (restrict browser features)\n'
        + 'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;\n\n'
        + '# Content Security Policy (customize per site)\n'
        + 'add_header Content-Security-Policy "default-src \'self\'; script-src \'self\' \'unsafe-inline\' https://cdn.example.com; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https:; font-src \'self\' https://fonts.gstatic.com;" always;\n\n'
        + '# Hide Nginx version\n'
        + 'server_tokens off;'}</code></pre>

      {/* Section 11: WebSocket Proxy */}
      <h2 style={h2Style}>
        {isZh ? '11. WebSocket 代理' : '11. WebSocket Proxy'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'WebSocket 连接通过 HTTP Upgrade 机制建立。Nginx 需要显式传递 Upgrade 和 Connection 头才能正确代理 WebSocket 流量。'
          : 'WebSocket connections are established via the HTTP Upgrade mechanism. Nginx must explicitly pass Upgrade and Connection headers to correctly proxy WebSocket traffic.'}
      </p>
      <pre style={preStyle}><code>{'# WebSocket proxy configuration\nmap $http_upgrade $connection_upgrade {\n'
        + '    default upgrade;\n'
        + '    \'\'      close;\n'
        + '}\n\n'
        + 'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    server_name ws.example.com;\n\n'
        + '    location /ws {\n'
        + '        proxy_pass http://127.0.0.1:8080;\n'
        + '        proxy_http_version 1.1;\n\n'
        + '        # Required for WebSocket\n'
        + '        proxy_set_header Upgrade $http_upgrade;\n'
        + '        proxy_set_header Connection $connection_upgrade;\n\n'
        + '        # Preserve client info\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\n'
        + '        # Keep connection alive (default 60s may be too short)\n'
        + '        proxy_read_timeout 86400s;   # 24 hours\n'
        + '        proxy_send_timeout 86400s;\n'
        + '    }\n\n'
        + '    # Socket.IO specific path\n'
        + '    location /socket.io/ {\n'
        + '        proxy_pass http://127.0.0.1:8080;\n'
        + '        proxy_http_version 1.1;\n'
        + '        proxy_set_header Upgrade $http_upgrade;\n'
        + '        proxy_set_header Connection $connection_upgrade;\n'
        + '        proxy_set_header Host $host;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Section 12: Gzip Compression */}
      <h2 style={h2Style}>
        {isZh ? '12. Gzip 压缩' : '12. Gzip Compression'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Gzip 压缩将文本资源（HTML、CSS、JS、JSON）的传输体积减少 60-80%，显著提升页面加载速度。在 http 块中全局配置即可。'
          : 'Gzip compression reduces text resource transfer size (HTML, CSS, JS, JSON) by 60-80%, significantly improving page load speed. Configure globally in the http block.'}
      </p>
      <pre style={preStyle}><code>{'http {\n'
        + '    # Enable gzip\n'
        + '    gzip on;\n'
        + '    gzip_vary on;                    # Add Vary: Accept-Encoding header\n'
        + '    gzip_proxied any;                # Compress for proxied requests too\n'
        + '    gzip_comp_level 5;               # Balance: 1=fast/low, 9=slow/high\n'
        + '    gzip_min_length 1000;            # Skip files < 1KB\n'
        + '    gzip_http_version 1.1;\n\n'
        + '    # MIME types to compress\n'
        + '    gzip_types\n'
        + '        text/plain\n'
        + '        text/css\n'
        + '        text/xml\n'
        + '        text/javascript\n'
        + '        application/json\n'
        + '        application/javascript\n'
        + '        application/xml\n'
        + '        application/xml+rss\n'
        + '        application/atom+xml\n'
        + '        image/svg+xml\n'
        + '        font/woff2;\n\n'
        + '    # Disable gzip for old IE\n'
        + '    gzip_disable "msie6";\n'
        + '}'}</code></pre>

      {/* Section 13: Performance Tuning */}
      <h2 style={h2Style}>
        {isZh ? '13. 性能调优' : '13. Performance Tuning'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '高并发场景下，调整 Nginx 的 worker 参数、缓冲区大小和超时设置至关重要。以下是经过生产验证的调优参数。'
          : 'Under high concurrency, tuning Nginx worker parameters, buffer sizes, and timeout settings is crucial. Below are production-proven tuning parameters.'}
      </p>
      <pre style={preStyle}><code>{'# ---- Main context ----\n'
        + 'worker_processes auto;               # Match CPU cores\n'
        + 'worker_rlimit_nofile 65535;           # Max open file descriptors\n\n'
        + '# ---- Events context ----\n'
        + 'events {\n'
        + '    worker_connections 4096;           # Increase for high traffic\n'
        + '    multi_accept on;                   # Accept all pending connections\n'
        + '    use epoll;                         # Linux: epoll; macOS: kqueue\n'
        + '}\n\n'
        + '# ---- HTTP context ----\n'
        + 'http {\n'
        + '    # Sendfile: kernel-level file transfer\n'
        + '    sendfile on;\n'
        + '    tcp_nopush on;                     # Optimize packet size\n'
        + '    tcp_nodelay on;                    # Disable Nagle\'s algorithm\n\n'
        + '    # Keepalive\n'
        + '    keepalive_timeout 65;\n'
        + '    keepalive_requests 1000;           # Max requests per keepalive\n\n'
        + '    # Client body / headers\n'
        + '    client_max_body_size 50m;          # Max upload size\n'
        + '    client_body_buffer_size 128k;\n'
        + '    client_header_buffer_size 1k;\n'
        + '    large_client_header_buffers 4 16k;\n\n'
        + '    # Proxy buffers (for reverse proxy)\n'
        + '    proxy_buffer_size 4k;\n'
        + '    proxy_buffers 8 32k;\n'
        + '    proxy_busy_buffers_size 64k;\n\n'
        + '    # Open file cache\n'
        + '    open_file_cache max=10000 inactive=20s;\n'
        + '    open_file_cache_valid 30s;\n'
        + '    open_file_cache_min_uses 2;\n'
        + '    open_file_cache_errors on;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '系统内核调优' : 'System Kernel Tuning'}
      </h3>
      <pre style={preStyle}><code>{'# /etc/sysctl.conf — Linux kernel tuning for Nginx\n\n'
        + '# Increase max open files\n'
        + 'fs.file-max = 2097152\n\n'
        + '# Network tuning\n'
        + 'net.core.somaxconn = 65535\n'
        + 'net.core.netdev_max_backlog = 65535\n'
        + 'net.ipv4.tcp_max_syn_backlog = 65535\n\n'
        + '# TCP keepalive\n'
        + 'net.ipv4.tcp_keepalive_time = 600\n'
        + 'net.ipv4.tcp_keepalive_intvl = 60\n'
        + 'net.ipv4.tcp_keepalive_probes = 5\n\n'
        + '# Reuse sockets\n'
        + 'net.ipv4.tcp_tw_reuse = 1\n'
        + 'net.ipv4.tcp_fin_timeout = 15\n\n'
        + '# Apply: sudo sysctl -p'}</code></pre>

      {/* Section 14: Common Patterns */}
      <h2 style={h2Style}>
        {isZh ? '14. 常见配置模式' : '14. Common Configuration Patterns'}
      </h2>

      <h3 style={h3Style}>
        {isZh ? 'SPA (单页应用) 部署' : 'SPA (Single Page App) Deployment'}
      </h3>
      <pre style={preStyle}><code>{'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    server_name spa.example.com;\n'
        + '    root /var/www/spa/dist;\n\n'
        + '    # All routes fall back to index.html\n'
        + '    location / {\n'
        + '        try_files $uri $uri/ /index.html;\n'
        + '    }\n\n'
        + '    # Cache hashed static assets forever\n'
        + '    location /assets/ {\n'
        + '        expires 1y;\n'
        + '        add_header Cache-Control "public, immutable";\n'
        + '    }\n\n'
        + '    # API proxy\n'
        + '    location /api/ {\n'
        + '        proxy_pass http://127.0.0.1:8080;\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'WordPress / PHP-FPM' : 'WordPress / PHP-FPM'}
      </h3>
      <pre style={preStyle}><code>{'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    server_name blog.example.com;\n'
        + '    root /var/www/wordpress;\n'
        + '    index index.php index.html;\n\n'
        + '    location / {\n'
        + '        try_files $uri $uri/ /index.php?$args;\n'
        + '    }\n\n'
        + '    location ~ \\.php$ {\n'
        + '        include fastcgi_params;\n'
        + '        fastcgi_pass unix:/run/php/php8.2-fpm.sock;\n'
        + '        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n'
        + '        fastcgi_index index.php;\n'
        + '        fastcgi_read_timeout 300;\n'
        + '    }\n\n'
        + '    # Block access to sensitive files\n'
        + '    location ~ /\\.(ht|git|env) {\n'
        + '        deny all;\n'
        + '    }\n\n'
        + '    location = /xmlrpc.php {\n'
        + '        deny all;\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'Next.js / PM2 部署' : 'Next.js / PM2 Deployment'}
      </h3>
      <pre style={preStyle}><code>{'upstream nextjs {\n'
        + '    server 127.0.0.1:3000;\n'
        + '    keepalive 64;\n'
        + '}\n\n'
        + 'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    server_name nextapp.example.com;\n\n'
        + '    # Next.js static assets (/_next/static/)\n'
        + '    location /_next/static/ {\n'
        + '        alias /var/www/nextapp/.next/static/;\n'
        + '        expires 1y;\n'
        + '        add_header Cache-Control "public, immutable";\n'
        + '        access_log off;\n'
        + '    }\n\n'
        + '    # Public folder static files\n'
        + '    location /static/ {\n'
        + '        alias /var/www/nextapp/public/static/;\n'
        + '        expires 30d;\n'
        + '    }\n\n'
        + '    # Proxy everything else to Next.js\n'
        + '    location / {\n'
        + '        proxy_pass http://nextjs;\n'
        + '        proxy_http_version 1.1;\n'
        + '        proxy_set_header Upgrade $http_upgrade;\n'
        + '        proxy_set_header Connection "upgrade";\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n'
        + '        proxy_set_header X-Forwarded-Proto $scheme;\n'
        + '    }\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? 'CORS 配置' : 'CORS Configuration'}
      </h3>
      <pre style={preStyle}><code>{'location /api/ {\n'
        + '    # CORS headers\n'
        + '    add_header Access-Control-Allow-Origin "https://frontend.example.com" always;\n'
        + '    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;\n'
        + '    add_header Access-Control-Allow-Headers "Authorization, Content-Type, X-Requested-With" always;\n'
        + '    add_header Access-Control-Allow-Credentials "true" always;\n'
        + '    add_header Access-Control-Max-Age 86400 always;\n\n'
        + '    # Handle preflight requests\n'
        + '    if ($request_method = OPTIONS) {\n'
        + '        return 204;\n'
        + '    }\n\n'
        + '    proxy_pass http://backend;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '基本认证（HTTP Auth）' : 'Basic Authentication'}
      </h3>
      <pre style={preStyle}><code>{'# Create password file\n'
        + '# sudo apt install apache2-utils\n'
        + '# sudo htpasswd -c /etc/nginx/.htpasswd admin\n\n'
        + 'location /admin/ {\n'
        + '    auth_basic "Restricted Area";\n'
        + '    auth_basic_user_file /etc/nginx/.htpasswd;\n'
        + '    proxy_pass http://backend;\n'
        + '}\n\n'
        + '# Whitelist IPs (skip auth for trusted IPs)\n'
        + 'location /admin/ {\n'
        + '    satisfy any;\n'
        + '    allow 10.0.0.0/8;\n'
        + '    deny all;\n'
        + '    auth_basic "Restricted";\n'
        + '    auth_basic_user_file /etc/nginx/.htpasswd;\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>
        {isZh ? '自定义日志格式与条件日志' : 'Custom Log Format & Conditional Logging'}
      </h3>
      <pre style={preStyle}><code>{'http {\n'
        + '    # JSON log format for log aggregation (ELK, Loki)\n'
        + '    log_format json_log escape=json\n'
        + '        \'{"time":"$time_iso8601",\'\n'
        + '        \'"remote_addr":"$remote_addr",\'\n'
        + '        \'"method":"$request_method",\'\n'
        + '        \'"uri":"$request_uri",\'\n'
        + '        \'"status":$status,\'\n'
        + '        \'"body_bytes":$body_bytes_sent,\'\n'
        + '        \'"request_time":$request_time,\'\n'
        + '        \'"upstream_time":"$upstream_response_time",\'\n'
        + '        \'"user_agent":"$http_user_agent"}\';\n\n'
        + '    # Skip logging for health checks and static assets\n'
        + '    map $request_uri $loggable {\n'
        + '        ~*\\.(?:css|js|ico|png|jpg|svg|woff2)$ 0;\n'
        + '        /health                                 0;\n'
        + '        default                                 1;\n'
        + '    }\n\n'
        + '    access_log /var/log/nginx/access.json json_log if=$loggable;\n'
        + '}'}</code></pre>

      {/* Section 15: Complete Production Config */}
      <h2 style={h2Style}>
        {isZh ? '15. 完整生产配置模板' : '15. Complete Production Configuration Template'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '以下是一个汇总了所有最佳实践的完整生产配置模板，包含 SSL、安全头、缓存、Gzip、速率限制和反向代理。'
          : 'Below is a complete production template combining all best practices: SSL, security headers, caching, gzip, rate limiting, and reverse proxy.'}
      </p>
      <pre style={preStyle}><code>{'# /etc/nginx/conf.d/production.conf\n'
        + '# Complete production-ready configuration\n\n'
        + 'upstream app_backend {\n'
        + '    least_conn;\n'
        + '    server 127.0.0.1:3000 max_fails=3 fail_timeout=30s;\n'
        + '    server 127.0.0.1:3001 max_fails=3 fail_timeout=30s;\n'
        + '    keepalive 64;\n'
        + '}\n\n'
        + '# Rate limiting zones\n'
        + 'limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;\n'
        + 'limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;\n\n'
        + '# HTTP → HTTPS redirect\n'
        + 'server {\n'
        + '    listen 80;\n'
        + '    listen [::]:80;\n'
        + '    server_name example.com www.example.com;\n'
        + '    return 301 https://example.com$request_uri;\n'
        + '}\n\n'
        + '# WWW → non-WWW redirect\n'
        + 'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    server_name www.example.com;\n'
        + '    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;\n'
        + '    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\n'
        + '    return 301 https://example.com$request_uri;\n'
        + '}\n\n'
        + '# Main server\n'
        + 'server {\n'
        + '    listen 443 ssl http2;\n'
        + '    listen [::]:443 ssl http2;\n'
        + '    server_name example.com;\n\n'
        + '    # SSL\n'
        + '    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;\n'
        + '    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;\n'
        + '    ssl_protocols TLSv1.2 TLSv1.3;\n'
        + '    ssl_prefer_server_ciphers on;\n'
        + '    ssl_session_cache shared:SSL:10m;\n'
        + '    ssl_session_timeout 1d;\n'
        + '    ssl_stapling on;\n'
        + '    ssl_stapling_verify on;\n\n'
        + '    # Security headers\n'
        + '    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;\n'
        + '    add_header X-Frame-Options "SAMEORIGIN" always;\n'
        + '    add_header X-Content-Type-Options "nosniff" always;\n'
        + '    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n'
        + '    server_tokens off;\n\n'
        + '    # Logging\n'
        + '    access_log /var/log/nginx/example.com.access.log;\n'
        + '    error_log  /var/log/nginx/example.com.error.log warn;\n\n'
        + '    # Static assets\n'
        + '    location ~* \\.(css|js|woff2|woff|ttf|svg|ico)$ {\n'
        + '        root /var/www/example.com/public;\n'
        + '        expires 1y;\n'
        + '        add_header Cache-Control "public, immutable";\n'
        + '        access_log off;\n'
        + '    }\n\n'
        + '    location ~* \\.(jpg|jpeg|png|gif|webp|avif)$ {\n'
        + '        root /var/www/example.com/public;\n'
        + '        expires 30d;\n'
        + '        access_log off;\n'
        + '    }\n\n'
        + '    # API with rate limit\n'
        + '    location /api/ {\n'
        + '        limit_req zone=api burst=50 nodelay;\n'
        + '        limit_req_status 429;\n'
        + '        proxy_pass http://app_backend;\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n'
        + '        proxy_set_header X-Forwarded-Proto $scheme;\n'
        + '    }\n\n'
        + '    # Default proxy\n'
        + '    location / {\n'
        + '        limit_req zone=general burst=20 nodelay;\n'
        + '        proxy_pass http://app_backend;\n'
        + '        proxy_http_version 1.1;\n'
        + '        proxy_set_header Host $host;\n'
        + '        proxy_set_header X-Real-IP $remote_addr;\n'
        + '        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n'
        + '        proxy_set_header X-Forwarded-Proto $scheme;\n'
        + '        proxy_set_header Upgrade $http_upgrade;\n'
        + '        proxy_set_header Connection "upgrade";\n'
        + '    }\n\n'
        + '    # Block hidden files\n'
        + '    location ~ /\\. {\n'
        + '        deny all;\n'
        + '        access_log off;\n'
        + '        log_not_found off;\n'
        + '    }\n'
        + '}'}</code></pre>

      {/* Nginx vs Apache vs Caddy Comparison */}
      <h2 style={h2Style}>
        {isZh ? '16. Nginx vs Apache vs Caddy 对比' : '16. Nginx vs Apache vs Caddy Comparison'}
      </h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Nginx</th>
            <th style={thStyle}>Apache</th>
            <th style={thStyle}>Caddy</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '架构' : 'Architecture'}</td><td style={tdStyle}>{isZh ? '事件驱动、异步' : 'Event-driven, async'}</td><td style={tdStyle}>{isZh ? '进程/线程模型' : 'Process/thread model'}</td><td style={tdStyle}>{isZh ? 'Go 协程' : 'Go goroutines'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '内存占用' : 'Memory Usage'}</td><td style={tdStyle}>{isZh ? '极低' : 'Very low'}</td><td style={tdStyle}>{isZh ? '较高' : 'Higher'}</td><td style={tdStyle}>{isZh ? '低' : 'Low'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '自动 HTTPS' : 'Auto HTTPS'}</td><td style={tdStyle}>{isZh ? '需 Certbot' : 'Needs Certbot'}</td><td style={tdStyle}>{isZh ? '需 Certbot' : 'Needs Certbot'}</td><td style={tdStyle}>{isZh ? '内置自动' : 'Built-in automatic'}</td></tr>
          <tr><td style={tdStyle}>.htaccess</td><td style={tdStyle}>{isZh ? '不支持' : 'Not supported'}</td><td style={tdStyle}>{isZh ? '支持（性能开销）' : 'Supported (perf overhead)'}</td><td style={tdStyle}>{isZh ? '不支持' : 'Not supported'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '配置语法' : 'Config Syntax'}</td><td style={tdStyle}>{isZh ? '自定义（简洁）' : 'Custom (concise)'}</td><td style={tdStyle}>{isZh ? 'XML 风格' : 'XML-style'}</td><td style={tdStyle}>{isZh ? 'Caddyfile（极简）' : 'Caddyfile (minimal)'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '最佳场景' : 'Best For'}</td><td style={tdStyle}>{isZh ? '反向代理、高并发' : 'Reverse proxy, high concurrency'}</td><td style={tdStyle}>{isZh ? '共享主机、.htaccess' : 'Shared hosting, .htaccess'}</td><td style={tdStyle}>{isZh ? '快速部署、自动 TLS' : 'Quick deploy, auto TLS'}</td></tr>
        </tbody>
      </table>

      {/* Troubleshooting */}
      <h2 style={h2Style}>
        {isZh ? '17. 故障排查' : '17. Troubleshooting'}
      </h2>
      <pre style={preStyle}><code>{'# Check config syntax before reload\nnginx -t\n\n'
        + '# View error log in real time\ntail -f /var/log/nginx/error.log\n\n'
        + '# Check if Nginx is listening\nss -tlnp | grep nginx\n\n'
        + '# Test specific endpoints\ncurl -I https://example.com\ncurl -vk https://example.com 2>&1 | grep -i "ssl\\|tls\\|subject"\n\n'
        + '# Check worker processes\nps aux | grep nginx\n\n'
        + '# Dump full merged config (includes all includes)\nnginx -T\n\n'
        + '# Check file permissions for web root\nnamei -l /var/www/example.com/public/index.html\n\n'
        + '# Common issues:\n'
        + '# 502 Bad Gateway  → Backend is down or proxy_pass target unreachable\n'
        + '# 504 Gateway Timeout → Backend too slow, increase proxy_read_timeout\n'
        + '# 413 Entity Too Large → Increase client_max_body_size\n'
        + '# 403 Forbidden → Check file permissions and SELinux/AppArmor\n'
        + '# Permission denied on socket → Check nginx user and socket file perms'}</code></pre>

      {/* Conclusion */}
      <p style={pStyle}>
        {isZh
          ? 'Nginx 是现代 Web 基础设施的核心组件。从简单的静态文件服务到复杂的微服务反向代理和负载均衡，掌握本指南中的配置模式将帮助你构建高性能、安全、可扩展的生产环境。建议从基础配置开始，逐步添加 SSL、缓存、速率限制和安全头，并始终使用 nginx -t 验证配置变更。'
          : 'Nginx is a cornerstone of modern web infrastructure. From simple static file serving to complex microservice reverse proxying and load balancing, mastering the configuration patterns in this guide will help you build high-performance, secure, and scalable production environments. Start with a basic configuration, incrementally add SSL, caching, rate limiting, and security headers, and always validate changes with nginx -t before reloading.'}
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
