'use client';

import Link from 'next/link';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Nginx Config Guide: Write nginx.conf Files — Complete Guide               */
/* ────────────────────────────────────────────────────────────────────────── */

const translations = {
  en: {
    title: 'Nginx Config Guide: Write nginx.conf Files — Complete Guide',
    description:
      'Master nginx.conf configuration from scratch. Covers nginx.conf structure, static file serving, reverse proxy, SSL/TLS with Let\'s Encrypt, HTTP/2, load balancing, gzip, caching, rate limiting, security headers, logging, and debugging.',
  },
  zh: {
    title: 'Nginx 配置指南：编写 nginx.conf 完整教程',
    description:
      '从零掌握 nginx.conf 配置。涵盖 nginx.conf 结构、静态文件服务、反向代理、Let\'s Encrypt SSL/TLS、HTTP/2、负载均衡、gzip 压缩、缓存、速率限制、安全头、日志记录和调试。',
  },
};

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 48,
  marginBottom: 16,
  color: 'var(--text-primary)',
  lineHeight: 1.3,
};

const h3Style: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  marginTop: 32,
  marginBottom: 12,
  color: 'var(--text-primary)',
  lineHeight: 1.4,
};

const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
  marginBottom: 16,
};

const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: 'Menlo, Monaco, Consolas, monospace',
  color: '#e2e8f0',
};

const inlineCodeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 14,
  fontFamily: 'Menlo, Monaco, Consolas, monospace',
  color: 'var(--accent-blue)',
  fontWeight: 600,
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  border: '2px solid #bae6fd',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
};

const keyTakeawaysStyle: React.CSSProperties = {
  background: '#f8fafc',
  borderRadius: 12,
  padding: '20px 24px',
  marginBottom: 32,
  border: '1px solid #e2e8f0',
};

const tipBoxStyle: React.CSSProperties = {
  background: 'rgba(59,130,246,0.06)',
  border: '1px solid rgba(59,130,246,0.2)',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
};

const warningBoxStyle: React.CSSProperties = {
  background: 'rgba(245,158,11,0.06)',
  border: '1px solid rgba(245,158,11,0.3)',
  borderRadius: 8,
  padding: '14px 18px',
  marginBottom: 20,
  fontSize: 14,
  lineHeight: 1.7,
  color: 'var(--text-secondary)',
};

const thStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 700,
  fontSize: 14,
};

const tdStyle: React.CSSProperties = {
  border: '1px solid var(--border-color)',
  padding: '10px 14px',
  fontSize: 13,
};

const ctaBoxStyle: React.CSSProperties = {
  padding: 24,
  background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.08) 100%)',
  border: '1px solid rgba(59,130,246,0.2)',
  borderRadius: 12,
  marginTop: 16,
  marginBottom: 24,
};

export default function NginxConfigOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is the nginx.conf file located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main nginx.conf is typically at /etc/nginx/nginx.conf on Linux. Site-specific configs are usually in /etc/nginx/sites-available/ and symlinked to /etc/nginx/sites-enabled/, or in /etc/nginx/conf.d/ as *.conf files.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I reload nginx config without downtime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run "nginx -t" to test the config for syntax errors, then "nginx -s reload" or "systemctl reload nginx". This sends SIGHUP and reloads config gracefully with zero downtime.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between proxy_pass and fastcgi_pass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'proxy_pass forwards HTTP/HTTPS requests to an upstream server (Node.js, Python, Go, etc.). fastcgi_pass is used specifically for FastCGI applications like PHP-FPM, using the FastCGI protocol instead of HTTP.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I enable HTTP/2 in nginx?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add "http2" to the listen directive: "listen 443 ssl http2". HTTP/2 requires SSL/TLS. Nginx must be compiled with --with-http_v2_module (included by default in most distributions).',
        },
      },
      {
        '@type': 'Question',
        name: 'How does nginx load balancing work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nginx supports round-robin (default), least_conn (fewest active connections), ip_hash (sticky sessions by client IP), random, and weighted distribution. Define an upstream block with server entries, then use proxy_pass to reference it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I set up rate limiting in nginx?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use limit_req_zone in the http block to define a shared memory zone with a rate (e.g., "limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s"), then apply limit_req in server or location blocks with optional burst and nodelay parameters.',
        },
      },
      {
        '@type': 'Question',
        name: 'What security headers should nginx set?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essential security headers include: Strict-Transport-Security (HSTS), X-Frame-Options (clickjacking protection), X-Content-Type-Options (MIME sniffing), Content-Security-Policy (XSS/injection), Referrer-Policy, and Permissions-Policy.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I debug nginx configuration issues?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check syntax with "nginx -t", review /var/log/nginx/error.log for errors, use "nginx -T" to dump the full config, add "error_log /var/log/nginx/error.log debug" for verbose logging, and use "curl -I" to inspect response headers.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 820, margin: '0 auto', padding: '0 4px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#0369a1', marginBottom: 8 }}>
          TL;DR
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#0c4a6e' }}>
          Nginx configuration is organized in nested blocks: <code style={inlineCodeStyle}>main → events → http → server → location</code>. Use{' '}
          <code style={inlineCodeStyle}>proxy_pass</code> for reverse proxy, <code style={inlineCodeStyle}>upstream</code> for load balancing,{' '}
          <code style={inlineCodeStyle}>ssl_certificate</code> + <code style={inlineCodeStyle}>listen 443 ssl http2</code> for HTTPS, and{' '}
          <code style={inlineCodeStyle}>limit_req_zone</code> for rate limiting. Always test with{' '}
          <code style={inlineCodeStyle}>nginx -t</code> before reloading.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15, marginBottom: 10, color: 'var(--text-primary)' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 2 }}>
          <li>nginx.conf uses a hierarchical block structure: main, events, http, server, location</li>
          <li>Directives in outer blocks are inherited by inner blocks (can be overridden)</li>
          <li><code style={inlineCodeStyle}>proxy_pass</code> enables reverse proxy to Node.js, Python, Go, and other backends</li>
          <li>SSL/TLS with Let&apos;s Encrypt is free and automatable via certbot</li>
          <li>HTTP/2 requires SSL and the <code style={inlineCodeStyle}>http2</code> parameter on the listen directive</li>
          <li>Load balancing strategies: round-robin, least_conn, ip_hash, weighted</li>
          <li>Rate limiting uses shared memory zones defined in the http block</li>
          <li>Security headers (HSTS, CSP, X-Frame-Options) protect against common attacks</li>
          <li>Always validate config with <code style={inlineCodeStyle}>nginx -t</code> before reloading</li>
        </ul>
      </div>

      {/* Section 1: nginx.conf Structure */}
      <h2 style={h2Style}>1. nginx.conf Structure: The Block Hierarchy</h2>
      <p style={pStyle}>
        Every nginx configuration is built from nested blocks called <strong>contexts</strong>. Directives inside a context apply to that scope.
        Understanding the hierarchy is the foundation of writing correct nginx config.
      </p>
      <p style={pStyle}>
        The four main contexts are: <strong>main</strong> (global settings), <strong>events</strong> (connection handling),{' '}
        <strong>http</strong> (HTTP-specific settings), and <strong>server</strong> (virtual host). Inside server blocks,{' '}
        <strong>location</strong> blocks handle specific URL patterns.
      </p>
      <pre style={codeBlockStyle}><code>{`# /etc/nginx/nginx.conf — Top-level structure

# ── MAIN CONTEXT ──────────────────────────────────────────────────────────
user  nginx;                     # Worker process user
worker_processes  auto;          # Number of worker processes (auto = CPU cores)
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

# ── EVENTS CONTEXT ────────────────────────────────────────────────────────
events {
    worker_connections  1024;    # Max simultaneous connections per worker
    use epoll;                   # Event method (Linux: epoll, macOS: kqueue)
    multi_accept on;             # Accept multiple connections at once
}

# ── HTTP CONTEXT ──────────────────────────────────────────────────────────
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    # ── SERVER CONTEXT (virtual host) ─────────────────────────────────────
    server {
        listen       80;
        server_name  example.com www.example.com;

        # ── LOCATION CONTEXT (URL pattern matching) ────────────────────────
        location / {
            root   /var/www/html;
            index  index.html;
        }

        location /api/ {
            proxy_pass http://localhost:3000;
        }
    }
}
`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Most distributions (Ubuntu/Debian) split config across files. The main nginx.conf includes{' '}
        <code style={inlineCodeStyle}>/etc/nginx/conf.d/*.conf</code> and/or{' '}
        <code style={inlineCodeStyle}>/etc/nginx/sites-enabled/*</code>. Put each virtual host in its own file and symlink it:
        {' '}<code style={inlineCodeStyle}>ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/</code>
      </div>

      <h3 style={h3Style}>Key Main-Context Directives</h3>
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Directive</th>
              <th style={thStyle}>Default</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>worker_processes</code></td>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>Set to <code style={inlineCodeStyle}>auto</code> to match CPU cores</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>worker_connections</code></td>
              <td style={tdStyle}>512</td>
              <td style={tdStyle}>Max connections per worker; total = workers × connections</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>sendfile</code></td>
              <td style={tdStyle}>off</td>
              <td style={tdStyle}>Enable kernel-level file transfer (faster for static files)</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>keepalive_timeout</code></td>
              <td style={tdStyle}>75s</td>
              <td style={tdStyle}>How long to keep idle client connections open</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>server_tokens</code></td>
              <td style={tdStyle}>on</td>
              <td style={tdStyle}>Set to <code style={inlineCodeStyle}>off</code> to hide nginx version in headers</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 2: Static File Serving */}
      <h2 style={h2Style}>2. Static File Serving</h2>
      <p style={pStyle}>
        Nginx excels at serving static files. The key directives are <code style={inlineCodeStyle}>root</code> (the base directory) and{' '}
        <code style={inlineCodeStyle}>alias</code> (maps URL to a path). Understanding the difference between them prevents common path-building bugs.
      </p>
      <pre style={codeBlockStyle}><code>{`server {
    listen 80;
    server_name static.example.com;

    # ── root: URL path is appended to root ────────────────────────────────
    # Request: /images/logo.png → /var/www/html/images/logo.png
    root /var/www/html;

    location / {
        try_files $uri $uri/ =404;
        # try_files: 1. try exact file, 2. try as directory, 3. return 404
    }

    # ── alias: URL prefix is replaced with the alias path ─────────────────
    # Request: /static/app.js → /opt/frontend/dist/app.js
    location /static/ {
        alias /opt/frontend/dist/;
        expires 1y;                         # Cache for 1 year
        add_header Cache-Control "public, immutable";
        access_log off;                     # Skip logging for static assets
    }

    # ── Custom 404 / 50x error pages ─────────────────────────────────────
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;

    location = /50x.html {
        root /usr/share/nginx/html;
    }

    # ── SPA (Single Page App): always serve index.html ───────────────────
    location / {
        try_files $uri $uri/ /index.html;   # Fallback to index.html for client routing
    }

    # ── Prevent serving dotfiles (.env, .git, etc.) ───────────────────────
    location ~ /\\. {
        deny all;
        return 404;
    }
}
`}</code></pre>

      <h3 style={h3Style}>root vs alias — The Key Difference</h3>
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Directive</th>
              <th style={thStyle}>Request</th>
              <th style={thStyle}>File Served</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>root /var/www;</code> in <code style={inlineCodeStyle}>location /imgs/</code></td>
              <td style={tdStyle}>/imgs/a.png</td>
              <td style={tdStyle}>/var/www/imgs/a.png</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>alias /var/www/;</code> in <code style={inlineCodeStyle}>location /imgs/</code></td>
              <td style={tdStyle}>/imgs/a.png</td>
              <td style={tdStyle}>/var/www/a.png</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Use our{' '}
        <Link href="/en/blog/nginx-config-generator-online-guide" style={{ color: 'var(--accent-blue)' }}>
          Nginx Config Generator
        </Link>{' '}
        to build static file server configs visually without memorizing every directive.
      </div>

      {/* Section 3: Reverse Proxy */}
      <h2 style={h2Style}>3. Reverse Proxy with proxy_pass</h2>
      <p style={pStyle}>
        A reverse proxy sits in front of your application server (Node.js, Python, Go, Java) and forwards client requests to it.
        Nginx handles SSL termination, compression, and caching while your app server focuses on business logic.
      </p>
      <pre style={codeBlockStyle}><code>{`server {
    listen 80;
    server_name api.example.com;

    # ── Basic reverse proxy to a Node.js/Python app ───────────────────────
    location / {
        proxy_pass http://127.0.0.1:3000;   # App server address

        # Pass real client info to the upstream server
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support (needed for socket.io, etc.)
        proxy_http_version 1.1;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout  60s;
        proxy_send_timeout     60s;
        proxy_read_timeout     60s;

        # Buffer settings
        proxy_buffering         on;
        proxy_buffer_size       16k;
        proxy_buffers           4 32k;
        proxy_busy_buffers_size 64k;
    }

    # ── Proxy a specific path to a different service ────────────────────
    location /auth/ {
        proxy_pass http://127.0.0.1:4000/;  # Note trailing slash strips /auth prefix
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # ── PHP-FPM via FastCGI ────────────────────────────────────────────────
    location ~ \\.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Trailing Slash Gotcha:</strong> With <code style={inlineCodeStyle}>proxy_pass http://backend:3000</code> (no trailing slash),
        nginx appends the full URI. With <code style={inlineCodeStyle}>proxy_pass http://backend:3000/</code> (trailing slash), nginx strips
        the location prefix first. This matters when proxying sub-paths.
      </div>

      <h3 style={h3Style}>Common proxy_set_header Values Explained</h3>
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Header</th>
              <th style={thStyle}>Variable</th>
              <th style={thStyle}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>X-Real-IP</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>$remote_addr</code></td>
              <td style={tdStyle}>Client&apos;s real IP address</td>
            </tr>
            <tr>
              <td style={tdStyle}>X-Forwarded-For</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>$proxy_add_x_forwarded_for</code></td>
              <td style={tdStyle}>IP chain through proxies</td>
            </tr>
            <tr>
              <td style={tdStyle}>X-Forwarded-Proto</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>$scheme</code></td>
              <td style={tdStyle}>Original protocol (http/https)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Host</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>$host</code></td>
              <td style={tdStyle}>Original request Host header</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: SSL/TLS with Let's Encrypt */}
      <h2 style={h2Style}>4. SSL/TLS with Let&apos;s Encrypt</h2>
      <p style={pStyle}>
        Let&apos;s Encrypt provides free, automated SSL/TLS certificates. Install <code style={inlineCodeStyle}>certbot</code> and the nginx plugin,
        then certbot can obtain a certificate and automatically update your nginx config.
      </p>
      <pre style={codeBlockStyle}><code>{`# Step 1: Install certbot
# Ubuntu/Debian:
apt install certbot python3-certbot-nginx

# Step 2: Obtain certificate (certbot edits nginx config automatically)
certbot --nginx -d example.com -d www.example.com

# Step 3: Auto-renewal (certbot installs a systemd timer)
systemctl status certbot.timer
# Manual renewal test:
certbot renew --dry-run
`}</code></pre>

      <p style={pStyle}>After certbot runs, your server block will look like:</p>
      <pre style={codeBlockStyle}><code>{`server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # ── Certificate paths (set by certbot) ─────────────────────────────────
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # ── Modern SSL settings (Mozilla Intermediate compatibility) ───────────
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # ── Session caching (improves performance) ─────────────────────────────
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # ── OCSP Stapling ──────────────────────────────────────────────────────
    ssl_stapling        on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# ── HTTP → HTTPS redirect ─────────────────────────────────────────────────
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Security Tip:</strong> Disable TLS 1.0 and 1.1 by only listing <code style={inlineCodeStyle}>TLSv1.2 TLSv1.3</code>.
        Use <a href="https://ssl-config.mozilla.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>Mozilla SSL Config Generator</a>{' '}
        to generate modern, secure cipher suites for your nginx version.
      </div>

      {/* Section 5: HTTP/2 and HTTP/3 */}
      <h2 style={h2Style}>5. HTTP/2 and HTTP/3</h2>
      <p style={pStyle}>
        HTTP/2 dramatically improves performance through multiplexing (multiple requests on one connection), header compression (HPACK),
        and server push. It requires HTTPS in all major browsers.
      </p>
      <pre style={codeBlockStyle}><code>{`# ── HTTP/2 ────────────────────────────────────────────────────────────────
# Nginx 1.9.5+ supports HTTP/2
# Just add "http2" to the listen directive

server {
    listen 443 ssl http2;          # ← Enable HTTP/2 here
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # HTTP/2 tuning
    http2_max_concurrent_streams 128;
    http2_idle_timeout 3m;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}

# ── HTTP/3 (QUIC) ──────────────────────────────────────────────────────────
# Requires nginx 1.25+ compiled with --with-http_v3_module
# or OpenResty / nginxinc/nginx-quic

server {
    listen 443 ssl;
    listen 443 quic reuseport;     # ← Enable HTTP/3 via QUIC (UDP 443)
    http2 on;

    server_name example.com;
    ssl_certificate     /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.3;         # HTTP/3 requires TLS 1.3

    # Advertise HTTP/3 support via Alt-Svc header
    add_header Alt-Svc 'h3=":443"; ma=86400';

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>HTTP/1.1</th>
              <th style={thStyle}>HTTP/2</th>
              <th style={thStyle}>HTTP/3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Multiplexing</td>
              <td style={tdStyle}>No (pipelining limited)</td>
              <td style={tdStyle}>Yes</td>
              <td style={tdStyle}>Yes (QUIC streams)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Header compression</td>
              <td style={tdStyle}>No</td>
              <td style={tdStyle}>HPACK</td>
              <td style={tdStyle}>QPACK</td>
            </tr>
            <tr>
              <td style={tdStyle}>Transport</td>
              <td style={tdStyle}>TCP</td>
              <td style={tdStyle}>TCP</td>
              <td style={tdStyle}>UDP (QUIC)</td>
            </tr>
            <tr>
              <td style={tdStyle}>TLS required</td>
              <td style={tdStyle}>No</td>
              <td style={tdStyle}>In browsers (yes)</td>
              <td style={tdStyle}>Yes (TLS 1.3)</td>
            </tr>
            <tr>
              <td style={tdStyle}>HOL blocking</td>
              <td style={tdStyle}>Yes</td>
              <td style={tdStyle}>TCP level only</td>
              <td style={tdStyle}>No</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 6: Load Balancing */}
      <h2 style={h2Style}>6. Load Balancing</h2>
      <p style={pStyle}>
        Nginx&apos;s <code style={inlineCodeStyle}>upstream</code> block defines a pool of backend servers. Use <code style={inlineCodeStyle}>proxy_pass</code>{' '}
        pointing to the upstream name to distribute traffic. Nginx supports multiple balancing algorithms out of the box.
      </p>
      <pre style={codeBlockStyle}><code>{`http {
    # ── Round-Robin (default): requests distributed sequentially ───────────
    upstream backend_rr {
        server 10.0.0.1:3000;
        server 10.0.0.2:3000;
        server 10.0.0.3:3000;
    }

    # ── Weighted Round-Robin: server 1 gets 3x more traffic ────────────────
    upstream backend_weighted {
        server 10.0.0.1:3000 weight=3;
        server 10.0.0.2:3000 weight=1;
    }

    # ── least_conn: route to server with fewest active connections ──────────
    upstream backend_lc {
        least_conn;
        server 10.0.0.1:3000;
        server 10.0.0.2:3000;
        server 10.0.0.3:3000;
    }

    # ── ip_hash: sticky sessions — same client IP → same server ────────────
    upstream backend_sticky {
        ip_hash;
        server 10.0.0.1:3000;
        server 10.0.0.2:3000;
        # Mark one server as backup (only used when others are down)
        server 10.0.0.3:3000 backup;
    }

    # ── Health check & server parameters ──────────────────────────────────
    upstream backend_health {
        server 10.0.0.1:3000 max_fails=3 fail_timeout=30s;
        server 10.0.0.2:3000 max_fails=3 fail_timeout=30s;
        # max_fails: mark server as unavailable after N failed attempts
        # fail_timeout: timeframe for max_fails and duration of unavailability
    }

    server {
        listen 80;
        server_name lb.example.com;

        location / {
            proxy_pass http://backend_lc;       # Reference the upstream name
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            # Connection keepalive to upstream servers
            proxy_http_version 1.1;
            proxy_set_header Connection "";     # Remove Connection header for keepalive
        }
    }
}
`}</code></pre>

      <h3 style={h3Style}>Load Balancing Algorithms Compared</h3>
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Algorithm</th>
              <th style={thStyle}>Directive</th>
              <th style={thStyle}>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Round-Robin</td>
              <td style={tdStyle}>(default)</td>
              <td style={tdStyle}>Stateless apps with similar request times</td>
            </tr>
            <tr>
              <td style={tdStyle}>Weighted</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>weight=N</code></td>
              <td style={tdStyle}>Mixed-capacity server pools</td>
            </tr>
            <tr>
              <td style={tdStyle}>Least Connections</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>least_conn</code></td>
              <td style={tdStyle}>Variable-length requests (e.g., file uploads)</td>
            </tr>
            <tr>
              <td style={tdStyle}>IP Hash</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>ip_hash</code></td>
              <td style={tdStyle}>Stateful apps needing session persistence</td>
            </tr>
            <tr>
              <td style={tdStyle}>Random</td>
              <td style={tdStyle}><code style={inlineCodeStyle}>random</code></td>
              <td style={tdStyle}>Large clusters, avoid hot spots</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 7: Gzip Compression */}
      <h2 style={h2Style}>7. Gzip Compression</h2>
      <p style={pStyle}>
        Gzip reduces response size by 60–80% for text-based content (HTML, CSS, JS, JSON). This directly improves page load times,
        especially on slower connections. Enable it in the <code style={inlineCodeStyle}>http</code> block so it applies globally.
      </p>
      <pre style={codeBlockStyle}><code>{`http {
    # ── Enable gzip compression ────────────────────────────────────────────
    gzip on;
    gzip_vary on;              # Add Vary: Accept-Encoding header
    gzip_proxied any;          # Compress proxied responses too
    gzip_comp_level 6;         # Compression level 1-9 (6 is a good balance)
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 256;       # Don't compress tiny files (bytes)

    # Content types to compress
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/x-javascript
        application/json
        application/xml
        application/rss+xml
        application/atom+xml
        image/svg+xml
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        application/font-woff
        application/font-woff2;

    server {
        # ...
        # Serve pre-compressed .gz files if they exist (even faster)
        gzip_static on;     # Requires --with-http_gzip_static_module
    }
}
`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> For even better compression, use <strong>Brotli</strong> (typically 15–20% smaller than gzip).
        It requires the <code style={inlineCodeStyle}>ngx_brotli</code> module:{' '}
        <code style={inlineCodeStyle}>brotli on; brotli_comp_level 6; brotli_types text/plain text/css application/javascript application/json;</code>
      </div>

      {/* Section 8: Caching */}
      <h2 style={h2Style}>8. Caching: proxy_cache and Expires Headers</h2>
      <p style={pStyle}>
        Nginx has two caching layers: <strong>browser caching</strong> (via <code style={inlineCodeStyle}>expires</code> and{' '}
        <code style={inlineCodeStyle}>Cache-Control</code> headers) and <strong>proxy caching</strong> (storing upstream responses on disk
        via <code style={inlineCodeStyle}>proxy_cache</code>).
      </p>

      <h3 style={h3Style}>Browser Cache Headers (Expires)</h3>
      <pre style={codeBlockStyle}><code>{`server {
    # ── Cache static assets aggressively ──────────────────────────────────
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;         # Don't log static asset hits
    }

    # ── Cache HTML briefly (allow revalidation) ─────────────────────────
    location ~* \\.html$ {
        expires 1h;
        add_header Cache-Control "public, max-age=3600, must-revalidate";
    }

    # ── Never cache API responses ────────────────────────────────────────
    location /api/ {
        expires -1;
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        proxy_pass http://127.0.0.1:3000;
    }
}
`}</code></pre>

      <h3 style={h3Style}>Proxy Cache (Server-Side Caching)</h3>
      <pre style={codeBlockStyle}><code>{`http {
    # ── Define a cache zone (in the http block) ────────────────────────────
    # proxy_cache_path: path levels keys_zone name:size inactive max_size
    proxy_cache_path /var/cache/nginx
        levels=1:2
        keys_zone=api_cache:10m       # 10MB zone for keys (holds ~80k keys)
        max_size=1g                    # Max disk usage for cached responses
        inactive=60m                   # Evict if not accessed for 60 minutes
        use_temp_path=off;

    server {
        location /api/ {
            proxy_cache api_cache;                        # Use the cache zone
            proxy_cache_key "$scheme$request_method$host$request_uri";
            proxy_cache_valid 200 302  10m;              # Cache 200/302 for 10 min
            proxy_cache_valid 404      1m;               # Cache 404 for 1 min
            proxy_cache_use_stale error timeout updating http_500 http_502 http_503;
            proxy_cache_lock on;                         # Only one request populates cache
            proxy_cache_min_uses 2;                      # Cache after 2 hits

            # Add header to show cache status (HIT/MISS/BYPASS)
            add_header X-Cache-Status $upstream_cache_status;

            proxy_pass http://127.0.0.1:3000;
        }

        # Bypass cache for authenticated users or specific conditions
        location /api/user/ {
            proxy_cache_bypass $cookie_session $http_authorization;
            proxy_no_cache     $cookie_session $http_authorization;
            proxy_pass http://127.0.0.1:3000;
        }
    }
}
`}</code></pre>

      {/* Section 9: Rate Limiting */}
      <h2 style={h2Style}>9. Rate Limiting with limit_req</h2>
      <p style={pStyle}>
        Rate limiting protects your server from abuse, DDoS attacks, and runaway scrapers. Nginx uses a <strong>leaky bucket algorithm</strong>:{' '}
        requests fill a bucket at the rate they arrive; the bucket drains at a defined rate. Excess requests are delayed or rejected.
      </p>
      <pre style={codeBlockStyle}><code>{`http {
    # ── Define rate limit zones ────────────────────────────────────────────
    # Format: limit_req_zone <key> zone=<name>:<size> rate=<rate>;
    # Key: $binary_remote_addr uses 4 bytes per IP (more efficient than $remote_addr)

    limit_req_zone $binary_remote_addr zone=general:10m  rate=30r/m;  # 30 req/min
    limit_req_zone $binary_remote_addr zone=api:10m      rate=10r/s;  # 10 req/sec
    limit_req_zone $binary_remote_addr zone=login:10m    rate=5r/m;   # 5 req/min (brute force)
    limit_req_zone $binary_remote_addr zone=search:10m   rate=1r/s;   # 1 req/sec

    # Rate limit by API key instead of IP (for authenticated APIs)
    limit_req_zone $http_x_api_key zone=api_key:10m rate=100r/s;

    server {
        listen 80;

        # ── Apply rate limit to all requests ──────────────────────────────
        location / {
            limit_req zone=general burst=20 nodelay;
            # burst: allow up to 20 extra requests above the rate
            # nodelay: serve burst requests immediately (no artificial delay)
            proxy_pass http://127.0.0.1:3000;
        }

        # ── Stricter limit for API endpoints ──────────────────────────────
        location /api/ {
            limit_req zone=api burst=50 nodelay;
            limit_req_status 429;            # Return 429 Too Many Requests
            limit_req_log_level warn;        # Log at warn level

            proxy_pass http://127.0.0.1:3000;
        }

        # ── Very strict limit for login (prevent brute force) ─────────────
        location /api/auth/login {
            limit_req zone=login burst=3;    # Only burst 3, no nodelay → delay excess
            proxy_pass http://127.0.0.1:3000;
        }
    }
}
`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Parameter</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>zone=name</code></td>
              <td style={tdStyle}>Shared memory zone to use for tracking</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>burst=N</code></td>
              <td style={tdStyle}>Max requests queued above the rate limit</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>nodelay</code></td>
              <td style={tdStyle}>Process burst requests immediately (don&apos;t queue them)</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>delay=N</code></td>
              <td style={tdStyle}>Delay requests after N immediate requests</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>limit_req_status</code></td>
              <td style={tdStyle}>HTTP status code for rejected requests (default 503, prefer 429)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 10: Security Headers */}
      <h2 style={h2Style}>10. Security Headers</h2>
      <p style={pStyle}>
        HTTP security headers instruct browsers to enable built-in security mechanisms. Adding them to nginx is straightforward with{' '}
        <code style={inlineCodeStyle}>add_header</code>. Put shared headers in the <code style={inlineCodeStyle}>http</code> block
        or a shared config file.
      </p>
      <pre style={codeBlockStyle}><code>{`server {
    listen 443 ssl http2;
    server_name example.com;

    # ── HSTS: Force HTTPS for 1 year ───────────────────────────────────────
    # WARNING: Only add includeSubDomains if ALL subdomains support HTTPS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # ── Clickjacking protection ────────────────────────────────────────────
    add_header X-Frame-Options "SAMEORIGIN" always;
    # Use "DENY" to block all framing, "SAMEORIGIN" to allow same-origin frames

    # ── MIME sniffing protection ───────────────────────────────────────────
    add_header X-Content-Type-Options "nosniff" always;

    # ── XSS protection (legacy browsers) ──────────────────────────────────
    add_header X-XSS-Protection "1; mode=block" always;

    # ── Referrer Policy ────────────────────────────────────────────────────
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # ── Permissions Policy (restrict browser APIs) ─────────────────────────
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self)" always;

    # ── Content Security Policy (CSP) ────────────────────────────────────
    # Start with Report-Only mode to detect violations before enforcing
    add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.example.com; report-uri /csp-report" always;

    # ── Enforce CSP (when you're confident in your policy) ────────────────
    # add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; ..." always;

    # ── Hide nginx version ────────────────────────────────────────────────
    server_tokens off;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Important:</strong> The <code style={inlineCodeStyle}>always</code> flag on <code style={inlineCodeStyle}>add_header</code>{' '}
        ensures headers are sent even on error responses (4xx/5xx). Without it, headers only appear on 200, 201, 204, 206, 301, 302, 303, 304, 307, 308.
        Also: headers set in an inner block (<code style={inlineCodeStyle}>location</code>) reset all inherited headers from outer blocks — be explicit.
      </div>

      {/* Section 11: Logging */}
      <h2 style={h2Style}>11. Access Logging and Error Logging</h2>
      <p style={pStyle}>
        Nginx writes two types of logs: <strong>access logs</strong> (every request) and <strong>error logs</strong> (problems and nginx messages).
        Custom log formats help with analytics and debugging.
      </p>
      <pre style={codeBlockStyle}><code>{`http {
    # ── Custom log format ─────────────────────────────────────────────────
    # Named "main" — standard extended format
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" '
                    '$request_time $upstream_response_time';

    # JSON format (easier to parse with Logstash, Splunk, Datadog)
    log_format json_combined escape=json
        '{'
            '"time_local":"$time_local",'
            '"remote_addr":"$remote_addr",'
            '"request":"$request",'
            '"status": "$status",'
            '"body_bytes_sent":"$body_bytes_sent",'
            '"request_time":"$request_time",'
            '"http_referrer":"$http_referer",'
            '"http_user_agent":"$http_user_agent",'
            '"upstream_addr":"$upstream_addr",'
            '"upstream_response_time":"$upstream_response_time"'
        '}';

    # ── Global access and error logs ──────────────────────────────────────
    access_log /var/log/nginx/access.log main;
    error_log  /var/log/nginx/error.log warn;
    # Error log levels: debug, info, notice, warn, error, crit, alert, emerg

    server {
        # ── Per-server logs ───────────────────────────────────────────────
        access_log /var/log/nginx/example.com.access.log json_combined;
        error_log  /var/log/nginx/example.com.error.log  error;

        location /api/ {
            access_log /var/log/nginx/api.access.log main buffer=32k flush=5s;
            # buffer=32k: buffer writes (reduce disk I/O)
            # flush=5s: force flush every 5 seconds
            proxy_pass http://127.0.0.1:3000;
        }

        # ── Skip logging for health checks ───────────────────────────────
        location /healthz {
            access_log off;
            return 200 "OK";
        }

        # ── Conditional logging: skip bots and monitoring ──────────────────
        map $http_user_agent $log_ua {
            ~*Googlebot     0;
            ~*UptimeRobot   0;
            default         1;
        }
        # Apply in location: access_log /path/to/log main if=$log_ua;
    }
}
`}</code></pre>

      <h3 style={h3Style}>Useful Nginx Log Variables</h3>
      <div style={{ overflowX: 'auto', marginBottom: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Variable</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$remote_addr</code></td>
              <td style={tdStyle}>Client IP address</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$request_time</code></td>
              <td style={tdStyle}>Total request processing time (seconds)</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$upstream_response_time</code></td>
              <td style={tdStyle}>Time waiting for upstream response</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$upstream_cache_status</code></td>
              <td style={tdStyle}>HIT, MISS, BYPASS, EXPIRED, etc.</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$body_bytes_sent</code></td>
              <td style={tdStyle}>Response body size in bytes</td>
            </tr>
            <tr>
              <td style={tdStyle}><code style={inlineCodeStyle}>$http_referer</code></td>
              <td style={tdStyle}>Referrer URL from request</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 12: Common Mistakes and Debugging */}
      <h2 style={h2Style}>12. Common Mistakes and Debugging</h2>
      <p style={pStyle}>
        Even experienced engineers encounter nginx configuration issues. Here are the most common mistakes and how to debug them.
      </p>

      <h3 style={h3Style}>Debugging Workflow</h3>
      <pre style={codeBlockStyle}><code>{`# ── Step 1: Test config syntax ─────────────────────────────────────────────
nginx -t
# Output: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
#         nginx: configuration file /etc/nginx/nginx.conf test is successful

# ── Step 2: Dump complete merged config ────────────────────────────────────
nginx -T 2>/dev/null | less

# ── Step 3: Reload (zero-downtime) ────────────────────────────────────────
nginx -s reload
# or:
systemctl reload nginx

# ── Step 4: Check error log in real-time ────────────────────────────────────
tail -f /var/log/nginx/error.log

# ── Step 5: Enable debug logging temporarily ────────────────────────────────
# In nginx.conf:
error_log /var/log/nginx/error.log debug;
# Reload, reproduce the issue, check logs, then set back to warn

# ── Step 6: Test with curl ─────────────────────────────────────────────────
curl -I https://example.com                        # Check response headers
curl -v https://example.com                        # Verbose (see request + response)
curl -H "Host: example.com" http://localhost       # Test specific server block
curl -L -o /dev/null -s -w "%{http_code}" https://example.com  # Just status code

# ── Step 7: Check which nginx is running ──────────────────────────────────
nginx -v                         # Version
nginx -V                         # Version + compile flags + modules
ps aux | grep nginx              # Running processes
ss -tlnp | grep :80              # What's listening on port 80
`}</code></pre>

      <h3 style={h3Style}>Common Mistakes</h3>

      <div style={warningBoxStyle}>
        <strong>Mistake 1: Missing semicolons</strong>
        <pre style={{ ...codeBlockStyle, marginTop: 8, marginBottom: 4 }}><code>{`# Wrong — missing semicolon causes cryptic "unexpected }" error
location / {
    root /var/www/html    ← no semicolon!
}

# Correct
location / {
    root /var/www/html;
}`}</code></pre>
      </div>

      <div style={warningBoxStyle}>
        <strong>Mistake 2: Forgetting add_header inheritance reset</strong>
        <pre style={{ ...codeBlockStyle, marginTop: 8, marginBottom: 4 }}><code>{`# Wrong: security headers in http block are LOST in location block
http {
    add_header X-Frame-Options "SAMEORIGIN";  # Set here
    server {
        location / {
            add_header Content-Type "text/html";  # This RESETS all parent headers!
            # X-Frame-Options is now gone from this location
        }
    }
}

# Correct: repeat all headers or use include
location / {
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Content-Type "text/html";
}`}</code></pre>
      </div>

      <div style={warningBoxStyle}>
        <strong>Mistake 3: Conflicting location blocks</strong>
        <pre style={{ ...codeBlockStyle, marginTop: 8, marginBottom: 4 }}><code>{`# nginx location matching priority:
# 1. = (exact match) — highest priority
# 2. ^~ (prefix, no regex) — stops regex search if matched
# 3. ~ and ~* (regex) — case-sensitive / case-insensitive
# 4. / (prefix) — lowest priority catch-all

# Common confusion: this regex won't override the prefix below
location ~ \\.php$ { ... }
location /api/    { ... }  # Request to /api/index.php matches THIS (prefix wins over some regex)

# Use = for exact paths, ^~ to prevent regex matching
location = /favicon.ico { access_log off; return 204; }
location ^~ /static/    { root /var/www; expires 1y; }
`}</code></pre>
      </div>

      <div style={warningBoxStyle}>
        <strong>Mistake 4: proxy_pass trailing slash with prefixed locations</strong>
        <pre style={{ ...codeBlockStyle, marginTop: 8, marginBottom: 4 }}><code>{`# Behavior difference:
location /app/ {
    proxy_pass http://backend;         # /app/foo → upstream receives /app/foo
}
location /app/ {
    proxy_pass http://backend/;        # /app/foo → upstream receives /foo (strips /app/)
}
location /app/ {
    proxy_pass http://backend/app/;    # /app/foo → upstream receives /app/foo (explicit)
}`}</code></pre>
      </div>

      <div style={tipBoxStyle}>
        <strong>Quick Reference: Most Useful nginx Commands</strong>
        <pre style={{ ...codeBlockStyle, marginTop: 8, marginBottom: 0 }}><code>{`nginx -t              # Test configuration
nginx -T              # Test + dump full config
nginx -s reload       # Graceful reload
nginx -s quit         # Graceful shutdown
nginx -s stop         # Fast shutdown
systemctl status nginx
journalctl -u nginx --since "10 min ago"  # nginx systemd logs`}</code></pre>
      </div>

      {/* Section 13: Complete Production Example */}
      <h2 style={h2Style}>13. Complete Production nginx.conf Example</h2>
      <p style={pStyle}>
        Here is a full, production-ready configuration combining all the techniques covered: HTTPS, HTTP/2, reverse proxy,
        gzip, caching, rate limiting, and security headers.
      </p>
      <pre style={codeBlockStyle}><code>{`# /etc/nginx/nginx.conf

user nginx;
worker_processes auto;
worker_rlimit_nofile 65535;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 65535;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # ── Logging ────────────────────────────────────────────────────────────
    log_format main '$remote_addr - [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" $request_time';
    access_log /var/log/nginx/access.log main buffer=32k;
    error_log  /var/log/nginx/error.log warn;

    # ── Performance ────────────────────────────────────────────────────────
    sendfile           on;
    tcp_nopush         on;
    tcp_nodelay        on;
    keepalive_timeout  65;
    types_hash_max_size 2048;
    server_tokens      off;

    # ── Gzip ───────────────────────────────────────────────────────────────
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml font/woff2;

    # ── Rate Limiting Zones ─────────────────────────────────────────────────
    limit_req_zone $binary_remote_addr zone=global:10m rate=30r/s;
    limit_req_zone $binary_remote_addr zone=api:10m    rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m  rate=5r/m;

    # ── Proxy Cache ────────────────────────────────────────────────────────
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=main_cache:10m max_size=1g inactive=60m;

    # ── HTTP → HTTPS redirect ─────────────────────────────────────────────
    server {
        listen 80;
        server_name example.com www.example.com;
        return 301 https://$host$request_uri;
    }

    # ── Main HTTPS server ─────────────────────────────────────────────────
    server {
        listen 443 ssl http2;
        server_name example.com www.example.com;

        ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 1d;
        ssl_session_tickets off;
        ssl_stapling on;
        ssl_stapling_verify on;

        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'" always;

        root /var/www/html;

        # Static assets with long-term caching
        location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }

        # API with rate limiting and proxy caching
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_req_status 429;

            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_http_version 1.1;
            proxy_set_header Connection "";

            proxy_cache main_cache;
            proxy_cache_valid 200 5m;
            proxy_cache_bypass $http_cache_control;
            add_header X-Cache-Status $upstream_cache_status;
        }

        # Login endpoint — strict rate limit
        location /api/auth/ {
            limit_req zone=login burst=3;
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        # Health check — no rate limit, no cache, no logging
        location /healthz {
            access_log off;
            proxy_pass http://127.0.0.1:3000/healthz;
        }

        # SPA fallback
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Block dotfiles
        location ~ /\\. {
            deny all;
            return 404;
        }
    }
}
`}</code></pre>

      {/* CTA */}
      <div style={ctaBoxStyle}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 16, marginBottom: 8, color: 'var(--text-primary)' }}>
          Generate nginx.conf Visually
        </p>
        <p style={{ margin: '0 0 12px 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Use the DevToolBox Nginx Config Generator to build production-ready nginx configurations with a visual interface.
          Supports static sites, reverse proxy, load balancing, SSL, and more.
        </p>
        <Link
          href="/en/tools/nginx-config"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Open Nginx Config Generator →
        </Link>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>14. Frequently Asked Questions</h2>

      <h3 style={h3Style}>Where is the nginx.conf file located?</h3>
      <p style={pStyle}>
        The main nginx.conf is typically at <code style={inlineCodeStyle}>/etc/nginx/nginx.conf</code> on Linux systems.
        Site-specific configs live in <code style={inlineCodeStyle}>/etc/nginx/sites-available/</code> (symlinked to{' '}
        <code style={inlineCodeStyle}>/etc/nginx/sites-enabled/</code>) or as <code style={inlineCodeStyle}>*.conf</code> files in{' '}
        <code style={inlineCodeStyle}>/etc/nginx/conf.d/</code>. On macOS with Homebrew, it&apos;s at{' '}
        <code style={inlineCodeStyle}>/usr/local/etc/nginx/nginx.conf</code> or{' '}
        <code style={inlineCodeStyle}>/opt/homebrew/etc/nginx/nginx.conf</code>.
      </p>

      <h3 style={h3Style}>How do I reload nginx without downtime?</h3>
      <p style={pStyle}>
        Run <code style={inlineCodeStyle}>nginx -t</code> first to validate the config. If it passes, run{' '}
        <code style={inlineCodeStyle}>nginx -s reload</code> or <code style={inlineCodeStyle}>systemctl reload nginx</code>.
        This sends SIGHUP to the master process, which starts new workers with the updated config and gracefully drains old workers.
        Active connections continue on old workers until they finish — zero downtime.
      </p>

      <h3 style={h3Style}>What is the difference between proxy_pass and fastcgi_pass?</h3>
      <p style={pStyle}>
        <code style={inlineCodeStyle}>proxy_pass</code> proxies HTTP/HTTPS requests to an upstream server speaking HTTP
        (Node.js, Python/Gunicorn, Go, Ruby/Puma, etc.). <code style={inlineCodeStyle}>fastcgi_pass</code> communicates over
        the FastCGI protocol specifically for FastCGI applications like PHP-FPM.
        Use <code style={inlineCodeStyle}>fastcgi_pass</code> for PHP; use <code style={inlineCodeStyle}>proxy_pass</code> for everything else.
      </p>

      <h3 style={h3Style}>How does location block matching work?</h3>
      <p style={pStyle}>
        Nginx evaluates location blocks in this priority order: (1) <code style={inlineCodeStyle}>= /exact</code> — exact match, highest priority;
        (2) <code style={inlineCodeStyle}>^~ /prefix</code> — prefix match that stops regex evaluation;
        (3) <code style={inlineCodeStyle}>~ regex</code> or <code style={inlineCodeStyle}>~* regex</code> — regex, case-sensitive/insensitive;
        (4) <code style={inlineCodeStyle}>/prefix</code> — longest prefix match as fallback.
        When multiple prefix locations match, nginx picks the longest one, then checks regexes.
      </p>

      <h3 style={h3Style}>How do I set up WebSocket proxying?</h3>
      <p style={pStyle}>
        WebSocket upgrades require two special headers. Add to your proxy location:
      </p>
      <pre style={codeBlockStyle}><code>{`location /ws/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;   # Keep connection open for WebSocket
}`}</code></pre>

      <h3 style={h3Style}>How do I redirect www to non-www (or vice versa)?</h3>
      <pre style={codeBlockStyle}><code>{`# Redirect www.example.com → example.com
server {
    listen 443 ssl http2;
    server_name www.example.com;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    return 301 https://example.com$request_uri;
}

# Redirect example.com → www.example.com
server {
    listen 443 ssl http2;
    server_name example.com;
    ssl_certificate /etc/letsencrypt/live/www.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.example.com/privkey.pem;
    return 301 https://www.example.com$request_uri;
}`}</code></pre>

      {/* Related resources */}
      <h2 style={h2Style}>Related Tools and Resources</h2>
      <p style={pStyle}>Continue mastering nginx and web server configuration with these DevToolBox resources:</p>
      <ul style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 2.2, paddingLeft: 20 }}>
        <li>
          <Link href="/en/tools/nginx-config" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            Nginx Config Generator
          </Link>{' '}
          — Build nginx.conf files visually with all the options above
        </li>
        <li>
          <Link href="/en/tools/htaccess-generator" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            .htaccess Generator
          </Link>{' '}
          — Apache configuration generator for redirects, auth, caching
        </li>
        <li>
          <Link href="/en/tools/csp-generator" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            CSP Header Generator
          </Link>{' '}
          — Build Content-Security-Policy headers interactively
        </li>
        <li>
          <Link href="/en/blog/nginx-config-generator-online-guide" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            Nginx Config Generator Guide
          </Link>{' '}
          — In-depth guide to generating nginx configs for common use cases
        </li>
        <li>
          <Link href="/en/blog/nginx-location-block-regex-guide" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            Nginx Location Block Regex Guide
          </Link>{' '}
          — Master nginx location matching with regex examples
        </li>
        <li>
          <Link href="/en/blog/nginx-reverse-proxy-config" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            Nginx Reverse Proxy Config
          </Link>{' '}
          — Deep dive into reverse proxy patterns
        </li>
        <li>
          <Link href="/en/blog/nginx-vs-apache-2026" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
            Nginx vs Apache 2026
          </Link>{' '}
          — When to choose each web server
        </li>
      </ul>
    </article>
  );
}
