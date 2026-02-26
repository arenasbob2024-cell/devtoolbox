'use client';

import Link from 'next/link';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Nginx Config Generator - Generate nginx.conf Online — Comprehensive Guide */
/* ────────────────────────────────────────────────────────────────────────── */

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
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
  borderRadius: 8,
  padding: '16px 20px',
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.8,
  marginBottom: 20,
};

const inlineCodeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 14,
  fontFamily: 'monospace',
  color: 'var(--accent-blue)',
  fontWeight: 600,
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

const ctaBoxStyle: React.CSSProperties = {
  padding: 24,
  background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
  borderRadius: 12,
  border: '1px solid rgba(59,130,246,0.3)',
  textAlign: 'center' as const,
  marginBottom: 36,
  marginTop: 36,
};

const faqItemStyle: React.CSSProperties = {
  marginBottom: 16,
  padding: 16,
  background: 'var(--bg-input)',
  borderRadius: 8,
  border: '1px solid var(--border-color)',
};

export default function NginxConfigGeneratorOnlineGuide({ lang }: { lang: string }) {
  const toolLink = `/${lang}/tools/nginx-config`;

  const faqData = [
    {
      q: 'What is an Nginx config generator and why should I use one?',
      a: 'An Nginx config generator is an online tool that produces valid nginx.conf configuration files based on your requirements. Instead of writing directives from scratch and risking syntax errors, you select options like server type, SSL settings, reverse proxy backends, and caching rules, and the generator outputs a production-ready configuration. This saves time, reduces configuration mistakes, and helps developers who are not Nginx experts deploy secure, performant web servers quickly.',
    },
    {
      q: 'How do I set up Nginx as a reverse proxy for Node.js?',
      a: 'Create a server block that listens on port 80 (or 443 for HTTPS) and uses the proxy_pass directive to forward requests to your Node.js application, typically running on localhost:3000. Include proxy_set_header directives to pass the original Host, X-Real-IP, and X-Forwarded-For headers to your backend. Add proxy_http_version 1.1 and set the Upgrade and Connection headers for WebSocket support. Use an upstream block if you have multiple Node.js instances for load balancing.',
    },
    {
      q: 'What is the difference between Nginx and Apache for web serving?',
      a: 'Nginx uses an event-driven, asynchronous, non-blocking architecture that handles thousands of concurrent connections with minimal memory. Apache traditionally uses a process-per-request or thread-per-request model that consumes more RAM under load. Nginx excels at serving static files, reverse proxying, and load balancing. Apache offers .htaccess per-directory configuration and a larger selection of built-in modules. Many production environments use Nginx as a front-end reverse proxy with Apache behind it for PHP applications.',
    },
    {
      q: 'How do I enable HTTPS with Let\'s Encrypt on Nginx?',
      a: 'Install Certbot and run certbot --nginx -d yourdomain.com. Certbot automatically obtains a free TLS certificate, modifies your Nginx configuration to use it, and sets up automatic renewal. The certificate files are stored in /etc/letsencrypt/live/yourdomain.com/. You should also add an HTTP-to-HTTPS redirect server block, enable HSTS, configure modern TLS protocols (TLSv1.2 and TLSv1.3), and select strong cipher suites. An Nginx config generator can produce all of these settings automatically.',
    },
    {
      q: 'How do I configure Nginx for a Single Page Application like React or Vue?',
      a: 'For SPAs, the key directive is try_files $uri $uri/ /index.html inside your location / block. This tells Nginx to first look for the exact file requested, then a directory, and finally fall back to index.html for client-side routing. Set the root to your build output directory (e.g., /var/www/app/dist). Add long cache expiration headers for static assets in /assets/ and no-cache for index.html itself so users always get the latest version.',
    },
    {
      q: 'What are the most important Nginx security headers?',
      a: 'Essential security headers include: X-Frame-Options DENY or SAMEORIGIN to prevent clickjacking, X-Content-Type-Options nosniff to block MIME-type sniffing, X-XSS-Protection "1; mode=block" as a legacy XSS filter, Strict-Transport-Security with max-age=31536000 and includeSubDomains for HSTS, Referrer-Policy strict-origin-when-cross-origin for privacy, Content-Security-Policy to control resource loading, and Permissions-Policy to restrict browser features like camera and geolocation.',
    },
    {
      q: 'How do I configure Nginx load balancing with health checks?',
      a: 'Define an upstream block with your backend servers and select a load balancing method: round-robin (default), least_conn, ip_hash, or random with two choices. Add max_fails and fail_timeout parameters to each server for passive health checks. For example, server 10.0.0.1:3000 max_fails=3 fail_timeout=30s removes a server from the pool after 3 consecutive failures for 30 seconds. Mark backup servers with the backup keyword. Nginx Plus (commercial) adds active health checks that proactively test backends.',
    },
    {
      q: 'How do I optimize Nginx for maximum performance?',
      a: 'Set worker_processes to auto (one per CPU core) and worker_connections to 2048 or higher. Enable sendfile, tcp_nopush, and tcp_nodelay for efficient file transfer. Turn on gzip compression for text content with gzip_comp_level 4-6. Set keepalive_timeout to 65s and enable keepalive connections to upstream servers. Use open_file_cache to reduce filesystem lookups. Add expires headers for static assets (30 days for images, 1 year for versioned assets). Enable HTTP/2 with the http2 parameter on your listen directive.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TL;DR Box ─────────────────────────────────────────────── */}
      <div style={tldrBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#0c4a6e' }}>
          TL;DR
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#1e3a5f', margin: 0 }}>
          An <strong>Nginx config generator</strong> builds production-ready <code style={{ background: '#dbeafe', padding: '1px 5px', borderRadius: 3, fontSize: 13 }}>nginx.conf</code> files
          instantly from your requirements &mdash; server blocks, reverse proxy rules, SSL/TLS, load balancing, caching, gzip compression, security headers, and rate limiting.
          Instead of memorizing directive syntax, use our{' '}
          <Link href={toolLink} style={{ color: '#2563eb', fontWeight: 600 }}>free Nginx Config Generator</Link>{' '}
          to create, validate, and download your configuration in seconds. This guide explains every major Nginx concept so you understand what each directive does and why it matters.
        </p>
      </div>

      {/* ── Key Takeaways ─────────────────────────────────────────── */}
      <div style={keyTakeawaysStyle}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'var(--text-primary)' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, fontSize: 14, color: 'var(--text-secondary)' }}>
          <li>Nginx handles <strong>static serving, reverse proxy, load balancing, and SSL termination</strong> in a single lightweight process</li>
          <li>Server blocks define virtual hosts; location blocks route requests within each host</li>
          <li>Always test configuration with <code style={inlineCodeStyle}>nginx -t</code> before reloading</li>
          <li>Use <code style={inlineCodeStyle}>proxy_pass</code> to forward requests to Node.js, Python, Go, or any backend</li>
          <li>Enable <strong>gzip compression</strong>, <strong>security headers</strong>, and <strong>rate limiting</strong> in every production deployment</li>
          <li>An online Nginx config generator eliminates syntax errors and saves hours of manual configuration</li>
          <li>HTTP/2, keepalive connections, and open_file_cache provide significant performance gains</li>
        </ul>
      </div>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--text-primary)' }}>
          Generate Your Nginx Config Now
        </p>
        <p style={{ fontSize: 14, marginBottom: 16, color: 'var(--text-secondary)' }}>
          Skip the manual editing. Build a production-ready nginx.conf in seconds.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Open Nginx Config Generator &rarr;
        </Link>
      </div>

      {/* ── 1. What Is Nginx? ─────────────────────────────── */}
      <h2 style={h2Style}>1. What Is Nginx and Why Does It Matter?</h2>
      <p style={pStyle}>
        Nginx (pronounced &ldquo;engine-x&rdquo;) is an open-source, high-performance HTTP server, reverse proxy server, and load balancer originally created by Igor Sysoev in 2004. It powers more than 30% of all websites on the internet and is the default choice for modern cloud infrastructure, containerized deployments, and microservice architectures.
      </p>
      <p style={pStyle}>
        Unlike traditional web servers that spawn a new thread or process for every incoming connection, Nginx uses an <strong>event-driven, asynchronous, non-blocking</strong> architecture. A single Nginx worker process can handle thousands of simultaneous connections while consuming only a few megabytes of memory. This makes Nginx exceptionally efficient for serving static files, proxying application traffic, and terminating SSL/TLS connections.
      </p>
      <p style={pStyle}>
        The main configuration file lives at <code style={inlineCodeStyle}>/etc/nginx/nginx.conf</code>. Site-specific configurations typically go in <code style={inlineCodeStyle}>/etc/nginx/conf.d/</code> or <code style={inlineCodeStyle}>/etc/nginx/sites-available/</code> (with symlinks in <code style={inlineCodeStyle}>sites-enabled/</code>). An Nginx config generator helps you produce these files correctly without memorizing every directive.
      </p>

      {/* ── 2. Nginx Configuration File Structure ──────────── */}
      <h2 style={h2Style}>2. Nginx Configuration File Structure</h2>
      <p style={pStyle}>
        Every nginx.conf follows a hierarchical block structure. Understanding this hierarchy is essential before using any configuration generator, because each directive is valid only within certain contexts.
      </p>
      <pre style={codeBlockStyle}><code>{`# Main context (global settings)
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /run/nginx.pid;

events {
    worker_connections 2048;
    multi_accept on;
}

http {
    # HTTP context (shared across all virtual hosts)
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        # Server context (one virtual host)
        listen 80;
        server_name example.com;

        location / {
            # Location context (URL path matching)
            root /var/www/html;
            index index.html;
        }

        location /api/ {
            proxy_pass http://backend:3000;
        }
    }
}`}</code></pre>

      <h3 style={h3Style}>Context Hierarchy</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Context</th>
            <th style={thStyle}>Purpose</th>
            <th style={thStyle}>Common Directives</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>main</td><td style={tdStyle}>Global process-level settings</td><td style={tdStyle}>worker_processes, error_log, pid</td></tr>
          <tr><td style={tdStyle}>events</td><td style={tdStyle}>Connection handling configuration</td><td style={tdStyle}>worker_connections, multi_accept</td></tr>
          <tr><td style={tdStyle}>http</td><td style={tdStyle}>HTTP server settings shared across all sites</td><td style={tdStyle}>include, log_format, gzip, upstream</td></tr>
          <tr><td style={tdStyle}>server</td><td style={tdStyle}>Virtual host definition</td><td style={tdStyle}>listen, server_name, root, ssl_certificate</td></tr>
          <tr><td style={tdStyle}>location</td><td style={tdStyle}>Request URI matching and processing</td><td style={tdStyle}>proxy_pass, try_files, root, alias</td></tr>
        </tbody>
      </table>

      {/* ── 3. Server Blocks ─────────────────────────────── */}
      <h2 style={h2Style}>3. Server Blocks (Virtual Hosts)</h2>
      <p style={pStyle}>
        Server blocks are the Nginx equivalent of Apache virtual hosts. Each server block defines how Nginx should respond to requests for a specific domain name or IP:port combination. You can host multiple websites on a single Nginx instance by creating separate server blocks for each domain.
      </p>
      <pre style={codeBlockStyle}><code>{`# Site 1: example.com
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example;
    index index.html;
}

# Site 2: api.example.com
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}

# Default server (catch-all for unmatched domains)
server {
    listen 80 default_server;
    server_name _;
    return 444;  # Close connection without response
}`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> The <code style={inlineCodeStyle}>server_name</code> directive supports exact names, wildcards (<code style={inlineCodeStyle}>*.example.com</code>), and regular expressions (<code style={inlineCodeStyle}>~^www\.(.+)$</code>). Nginx evaluates them in order: exact match first, then longest wildcard prefix, then longest wildcard suffix, then first matching regex. Always define a <code style={inlineCodeStyle}>default_server</code> to handle unknown domain requests.
      </div>

      {/* ── 4. Location Directives ────────────────────────── */}
      <h2 style={h2Style}>4. Location Directives: Routing Requests</h2>
      <p style={pStyle}>
        Location blocks determine how Nginx processes requests based on the URI path. The matching behavior depends on the modifier used with the <code style={inlineCodeStyle}>location</code> directive. Understanding location matching priority is critical for correct routing.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Modifier</th>
            <th style={thStyle}>Match Type</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>=</code></td><td style={tdStyle}>Exact match</td><td style={tdStyle}>1 (highest)</td><td style={tdStyle}>location = /favicon.ico</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>^~</code></td><td style={tdStyle}>Prefix match (skip regex)</td><td style={tdStyle}>2</td><td style={tdStyle}>location ^~ /images/</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>~</code></td><td style={tdStyle}>Case-sensitive regex</td><td style={tdStyle}>3</td><td style={tdStyle}>{'location ~ \\.php$'}</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>~*</code></td><td style={tdStyle}>Case-insensitive regex</td><td style={tdStyle}>3</td><td style={tdStyle}>{'location ~* \\.(jpg|png|gif)$'}</td></tr>
          <tr><td style={tdStyle}>(none)</td><td style={tdStyle}>Prefix match</td><td style={tdStyle}>4 (lowest)</td><td style={tdStyle}>location /api/</td></tr>
        </tbody>
      </table>

      <pre style={codeBlockStyle}><code>{`server {
    listen 80;
    server_name example.com;

    # Exact match: highest priority
    location = / {
        return 200 "Homepage";
    }

    # Prefix with ^~ : skips regex matching
    location ^~ /static/ {
        root /var/www;
        expires 30d;
    }

    # Regex: matches .css and .js files
    location ~* \\.(css|js)$ {
        root /var/www/assets;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Standard prefix: lowest priority
    location /api/ {
        proxy_pass http://backend:3000;
    }

    # Catch-all for SPA routing
    location / {
        root /var/www/app;
        try_files $uri $uri/ /index.html;
    }
}`}</code></pre>

      {/* ── 5. Reverse Proxy Setup ────────────────────────── */}
      <h2 style={h2Style}>5. Reverse Proxy Configuration</h2>
      <p style={pStyle}>
        A reverse proxy sits between the client and your application server, forwarding HTTP requests and returning responses. This is the most common production deployment pattern for Node.js, Python (Django/Flask/FastAPI), Go, Ruby, and Java applications. Nginx handles SSL termination, static file serving, compression, and connection pooling, freeing your application to focus on business logic.
      </p>

      <h3 style={h3Style}>Basic Reverse Proxy for Node.js</h3>
      <pre style={codeBlockStyle}><code>{`server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        # Pass original client information
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Serve static files directly (bypass proxy)
    location /static/ {
        alias /var/www/app/public/static/;
        expires 30d;
        access_log off;
    }
}`}</code></pre>

      <h3 style={h3Style}>Reverse Proxy for Python (Gunicorn/uWSGI)</h3>
      <pre style={codeBlockStyle}><code>{`upstream python_backend {
    server unix:/run/gunicorn.sock;
}

server {
    listen 80;
    server_name api.example.com;

    client_max_body_size 10M;

    location / {
        proxy_pass http://python_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /media/ {
        alias /var/www/app/media/;
    }
}`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> When using Unix domain sockets (like Gunicorn or PHP-FPM), the <code style={inlineCodeStyle}>proxy_pass</code> target uses the <code style={inlineCodeStyle}>unix:</code> prefix. This eliminates TCP overhead and is faster than connecting via <code style={inlineCodeStyle}>localhost:port</code> for services on the same machine.
      </div>

      {/* ── 6. SSL/TLS Configuration ────────────────────── */}
      <h2 style={h2Style}>6. SSL/TLS Configuration</h2>
      <p style={pStyle}>
        HTTPS is mandatory for modern websites. Search engines rank HTTPS pages higher, browsers warn users about insecure HTTP sites, and HTTP/2 requires TLS. A proper SSL configuration involves obtaining certificates, configuring protocols and ciphers, enabling HSTS, and setting up OCSP stapling.
      </p>

      <h3 style={h3Style}>Full SSL Configuration with Let&apos;s Encrypt</h3>
      <pre style={codeBlockStyle}><code>{`# HTTP to HTTPS redirect
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # Certificate files (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # TLS protocols and ciphers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # SSL session caching
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # HSTS (1 year, include subdomains)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    root /var/www/html;
    index index.html;
}`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Warning:</strong> Never disable TLSv1.2 unless you are certain all your users support TLSv1.3 exclusively. Dropping TLSv1.0 and TLSv1.1 is recommended as they have known vulnerabilities. Always test your SSL configuration at{' '}
        <strong>ssllabs.com/ssltest</strong> to verify your grade.
      </div>

      {/* ── 7. Load Balancing ────────────────────────────── */}
      <h2 style={h2Style}>7. Load Balancing</h2>
      <p style={pStyle}>
        Nginx can distribute incoming traffic across multiple backend servers for high availability and horizontal scaling. The <code style={inlineCodeStyle}>upstream</code> block defines a pool of servers, and <code style={inlineCodeStyle}>proxy_pass</code> references it by name. Nginx supports several load balancing algorithms out of the box.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Algorithm</th>
            <th style={thStyle}>Directive</th>
            <th style={thStyle}>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Round Robin</td><td style={tdStyle}>(default)</td><td style={tdStyle}>Distributes requests evenly across all servers in order</td></tr>
          <tr><td style={tdStyle}>Least Connections</td><td style={tdStyle}>least_conn</td><td style={tdStyle}>Sends requests to the server with fewest active connections</td></tr>
          <tr><td style={tdStyle}>IP Hash</td><td style={tdStyle}>ip_hash</td><td style={tdStyle}>Routes requests from the same client IP to the same server (sticky sessions)</td></tr>
          <tr><td style={tdStyle}>Random</td><td style={tdStyle}>random two least_conn</td><td style={tdStyle}>Picks two random servers, sends to the one with fewer connections</td></tr>
          <tr><td style={tdStyle}>Weighted</td><td style={tdStyle}>weight=N on server</td><td style={tdStyle}>Servers with higher weight receive proportionally more requests</td></tr>
        </tbody>
      </table>

      <pre style={codeBlockStyle}><code>{`upstream app_cluster {
    least_conn;

    server 10.0.0.1:3000 weight=3;    # 3x more traffic
    server 10.0.0.2:3000 weight=2;    # 2x more traffic
    server 10.0.0.3:3000;             # default weight=1

    server 10.0.0.4:3000 backup;      # only used when others fail
    server 10.0.0.5:3000 down;        # temporarily removed

    # Passive health checks
    # max_fails=3: mark as down after 3 consecutive failures
    # fail_timeout=30s: try again after 30 seconds
    server 10.0.0.6:3000 max_fails=3 fail_timeout=30s;

    # Keepalive connections to backends
    keepalive 32;
}

server {
    listen 443 ssl http2;
    server_name app.example.com;

    location / {
        proxy_pass http://app_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_next_upstream error timeout http_500 http_502 http_503;
    }
}`}</code></pre>

      {/* ── 8. Caching ────────────────────────────────────── */}
      <h2 style={h2Style}>8. Caching Configuration</h2>
      <p style={pStyle}>
        Nginx caching operates at two levels: <strong>client-side caching</strong> (browser cache via HTTP headers) and <strong>proxy caching</strong> (Nginx stores backend responses locally). Proper caching can reduce server load by 80-90% and dramatically improve page load times for repeat visitors.
      </p>

      <h3 style={h3Style}>Browser Cache Headers (Static Assets)</h3>
      <pre style={codeBlockStyle}><code>{`# Cache static assets aggressively
location ~* \\.(jpg|jpeg|png|gif|ico|svg|webp)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

location ~* \\.(css|js)$ {
    expires 7d;
    add_header Cache-Control "public";
}

# Do not cache HTML (always fresh)
location ~* \\.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}`}</code></pre>

      <h3 style={h3Style}>Proxy Cache (Cache Backend Responses)</h3>
      <pre style={codeBlockStyle}><code>{`# Define cache zone in http context
proxy_cache_path /var/cache/nginx
    levels=1:2
    keys_zone=app_cache:10m     # 10MB metadata in memory
    max_size=1g                 # 1GB on disk
    inactive=60m                # Remove unused items after 60 min
    use_temp_path=off;

server {
    listen 80;
    server_name app.example.com;

    location /api/ {
        proxy_pass http://backend:3000;
        proxy_cache app_cache;
        proxy_cache_valid 200 10m;     # Cache 200 responses for 10 min
        proxy_cache_valid 404 1m;      # Cache 404 responses for 1 min
        proxy_cache_use_stale error timeout updating http_500 http_502;
        add_header X-Cache-Status $upstream_cache_status;
    }
}`}</code></pre>

      {/* ── 9. Gzip Compression ────────────────────────────── */}
      <h2 style={h2Style}>9. Gzip Compression</h2>
      <p style={pStyle}>
        Enabling gzip compression reduces the size of text-based responses by 60-90%, significantly improving page load times and reducing bandwidth costs. Nginx compresses responses on-the-fly before sending them to clients. Modern browsers all support gzip decoding transparently.
      </p>

      <pre style={codeBlockStyle}><code>{`http {
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 5;          # 1-9 (higher = more compression, more CPU)
    gzip_min_length 256;        # Don't compress tiny responses
    gzip_buffers 16 8k;

    # MIME types to compress
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml
        application/rss+xml
        application/atom+xml
        application/vnd.ms-fontobject
        font/opentype
        image/svg+xml;
}`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Set <code style={inlineCodeStyle}>gzip_comp_level</code> between 4 and 6 for the best balance of compression ratio and CPU usage. Level 9 provides only marginally better compression but uses significantly more CPU. Also consider pre-compressing static files with <code style={inlineCodeStyle}>gzip_static on</code> to serve pre-built .gz files without real-time compression overhead.
      </div>

      {/* ── 10. Security Headers ──────────────────────────── */}
      <h2 style={h2Style}>10. Security Headers</h2>
      <p style={pStyle}>
        HTTP security headers instruct browsers to enforce security policies that protect your users from common web attacks. Adding these headers to your Nginx configuration is one of the simplest yet most impactful security improvements you can make.
      </p>

      <pre style={codeBlockStyle}><code>{`server {
    # Prevent clickjacking
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Prevent MIME-type sniffing
    add_header X-Content-Type-Options "nosniff" always;

    # XSS protection (legacy browsers)
    add_header X-XSS-Protection "1; mode=block" always;

    # HTTPS enforcement (HSTS)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Referrer policy
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Content Security Policy
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;" always;

    # Permissions policy (restrict browser features)
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;

    # Hide Nginx version
    server_tokens off;
}`}</code></pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Header</th>
            <th style={thStyle}>Protection Against</th>
            <th style={thStyle}>Recommended Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>X-Frame-Options</td><td style={tdStyle}>Clickjacking</td><td style={tdStyle}>SAMEORIGIN or DENY</td></tr>
          <tr><td style={tdStyle}>X-Content-Type-Options</td><td style={tdStyle}>MIME sniffing</td><td style={tdStyle}>nosniff</td></tr>
          <tr><td style={tdStyle}>Strict-Transport-Security</td><td style={tdStyle}>Protocol downgrade</td><td style={tdStyle}>max-age=31536000; includeSubDomains</td></tr>
          <tr><td style={tdStyle}>Content-Security-Policy</td><td style={tdStyle}>XSS, data injection</td><td style={tdStyle}>Restrict script/style/image sources</td></tr>
          <tr><td style={tdStyle}>Referrer-Policy</td><td style={tdStyle}>Information leakage</td><td style={tdStyle}>strict-origin-when-cross-origin</td></tr>
          <tr><td style={tdStyle}>Permissions-Policy</td><td style={tdStyle}>Feature abuse</td><td style={tdStyle}>Disable camera, microphone, geolocation</td></tr>
        </tbody>
      </table>

      {/* ── 11. Rate Limiting ────────────────────────────── */}
      <h2 style={h2Style}>11. Rate Limiting</h2>
      <p style={pStyle}>
        Rate limiting protects your server from brute-force attacks, DDoS attempts, and API abuse. Nginx uses a <strong>leaky bucket</strong> algorithm through the <code style={inlineCodeStyle}>limit_req</code> module. You define a shared memory zone that tracks request rates by client IP, then apply limits to specific locations.
      </p>

      <pre style={codeBlockStyle}><code>{`http {
    # Define rate limit zones
    # 10 requests per second per IP (zone: 10MB shared memory)
    limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;

    # Stricter limit for login/auth endpoints
    limit_req_zone $binary_remote_addr zone=auth:10m rate=3r/s;

    # API rate limit by API key (from header)
    limit_req_zone $http_x_api_key zone=api:10m rate=100r/s;

    server {
        listen 80;
        server_name example.com;

        # General pages: allow burst of 20 with no delay for first 10
        location / {
            limit_req zone=general burst=20 nodelay;
            limit_req_status 429;
            root /var/www/html;
        }

        # Login page: strict rate limiting
        location /login {
            limit_req zone=auth burst=5;
            limit_req_status 429;
            proxy_pass http://backend:3000;
        }

        # API endpoints
        location /api/ {
            limit_req zone=api burst=50 nodelay;
            limit_req_status 429;
            proxy_pass http://backend:3000;
        }
    }
}`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Warning:</strong> When running behind a CDN or another reverse proxy, <code style={inlineCodeStyle}>$binary_remote_addr</code> will be the proxy IP, not the client IP. In that case, use <code style={inlineCodeStyle}>$http_x_forwarded_for</code> or <code style={inlineCodeStyle}>$http_x_real_ip</code> in the <code style={inlineCodeStyle}>limit_req_zone</code> definition, and ensure the upstream proxy is trusted via <code style={inlineCodeStyle}>set_real_ip_from</code> and <code style={inlineCodeStyle}>real_ip_header</code>.
      </div>

      {/* ── 12. Logging ──────────────────────────────────── */}
      <h2 style={h2Style}>12. Logging Configuration</h2>
      <p style={pStyle}>
        Nginx supports flexible logging through custom log formats. Access logs record every request, while error logs capture server-side problems. Proper logging is essential for debugging, monitoring, security auditing, and performance analysis.
      </p>

      <pre style={codeBlockStyle}><code>{`http {
    # Custom log format with timing information
    log_format detailed '$remote_addr - $remote_user [$time_local] '
                        '"$request" $status $body_bytes_sent '
                        '"$http_referer" "$http_user_agent" '
                        'rt=$request_time uct=$upstream_connect_time '
                        'uht=$upstream_header_time urt=$upstream_response_time';

    # JSON log format (for log aggregation tools)
    log_format json_combined escape=json
        '{"time":"$time_iso8601",'
        '"remote_addr":"$remote_addr",'
        '"method":"$request_method",'
        '"uri":"$request_uri",'
        '"status":$status,'
        '"body_bytes":$body_bytes_sent,'
        '"request_time":$request_time,'
        '"upstream_time":"$upstream_response_time",'
        '"user_agent":"$http_user_agent"}';

    # Apply to server blocks
    access_log /var/log/nginx/access.log detailed;
    error_log /var/log/nginx/error.log warn;

    server {
        # Per-site logging
        access_log /var/log/nginx/example.access.log json_combined;

        # Disable logging for health checks and static assets
        location = /health {
            access_log off;
            return 200 "OK";
        }

        location ~* \\.(jpg|png|css|js|ico)$ {
            access_log off;
        }
    }
}`}</code></pre>

      {/* ── 13. Common Patterns ────────────────────────────── */}
      <h2 style={h2Style}>13. Common Configuration Patterns</h2>
      <p style={pStyle}>
        Below are complete, production-ready Nginx configuration patterns for the most common deployment scenarios. Each can be generated automatically with our{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Nginx Config Generator</Link>.
      </p>

      <h3 style={h3Style}>Pattern 1: Static Website</h3>
      <pre style={codeBlockStyle}><code>{`server {
    listen 443 ssl http2;
    server_name blog.example.com;

    ssl_certificate /etc/letsencrypt/live/blog.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.example.com/privkey.pem;

    root /var/www/blog;
    index index.html;

    # Enable gzip for text content
    gzip on;
    gzip_types text/plain text/css application/json application/javascript image/svg+xml;
    gzip_min_length 256;

    # Cache static assets
    location ~* \\.(css|js|jpg|jpeg|png|gif|svg|woff2|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Clean URLs (no .html extension)
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    error_page 404 /404.html;
}`}</code></pre>

      <h3 style={h3Style}>Pattern 2: Single Page Application (React/Vue/Angular)</h3>
      <pre style={codeBlockStyle}><code>{`server {
    listen 443 ssl http2;
    server_name app.example.com;

    ssl_certificate /etc/letsencrypt/live/app.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;

    root /var/www/app/dist;
    index index.html;

    # SPA: all routes fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache versioned assets forever
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Do not cache index.html
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # API proxy to backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}</code></pre>

      <h3 style={h3Style}>Pattern 3: API Gateway</h3>
      <pre style={codeBlockStyle}><code>{`upstream users_service { server 10.0.1.1:3001; server 10.0.1.2:3001; }
upstream orders_service { server 10.0.2.1:3002; }
upstream payments_service { server 10.0.3.1:3003; }

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Global rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=50r/s;
    limit_req zone=api burst=100 nodelay;

    # CORS headers
    add_header Access-Control-Allow-Origin "https://app.example.com" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Authorization, Content-Type" always;

    # Route to microservices
    location /api/v1/users/ {
        proxy_pass http://users_service/;
    }

    location /api/v1/orders/ {
        proxy_pass http://orders_service/;
    }

    location /api/v1/payments/ {
        proxy_pass http://payments_service/;
    }

    # Health check endpoint
    location = /health {
        access_log off;
        return 200 '{"status":"ok"}';
        add_header Content-Type application/json;
    }
}`}</code></pre>

      <h3 style={h3Style}>Pattern 4: WordPress</h3>
      <pre style={codeBlockStyle}><code>{`server {
    listen 443 ssl http2;
    server_name wordpress.example.com;

    ssl_certificate /etc/letsencrypt/live/wordpress.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/wordpress.example.com/privkey.pem;

    root /var/www/wordpress;
    index index.php;

    client_max_body_size 64M;

    # WordPress permalinks
    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    # PHP-FPM processing
    location ~ \\.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_intercept_errors on;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
    }

    # Block access to sensitive files
    location ~ /\\. { deny all; }
    location ~* /(?:uploads|files)/.*\\.php$ { deny all; }
    location ~* /(wp-config|xmlrpc)\\.php$ { deny all; }

    # Cache static assets
    location ~* \\.(css|js|jpg|jpeg|png|gif|svg|woff2|ico)$ {
        expires 30d;
        access_log off;
    }
}`}</code></pre>

      {/* ── 14. Nginx vs Apache ────────────────────────────── */}
      <h2 style={h2Style}>14. Nginx vs Apache: Which Should You Choose?</h2>
      <p style={pStyle}>
        Both Nginx and Apache are production-grade web servers, but they have fundamentally different architectures and strengths. Understanding these differences helps you choose the right tool or combine them effectively.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Nginx</th>
            <th style={thStyle}>Apache</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Architecture</td><td style={tdStyle}>Event-driven, async, non-blocking</td><td style={tdStyle}>Process/thread per connection (prefork/worker MPM)</td></tr>
          <tr><td style={tdStyle}>Memory usage</td><td style={tdStyle}>Very low (fixed workers)</td><td style={tdStyle}>Higher (scales with connections)</td></tr>
          <tr><td style={tdStyle}>Static file serving</td><td style={tdStyle}>Extremely fast</td><td style={tdStyle}>Fast</td></tr>
          <tr><td style={tdStyle}>Concurrent connections</td><td style={tdStyle}>10,000+ with minimal RAM</td><td style={tdStyle}>Hundreds to low thousands</td></tr>
          <tr><td style={tdStyle}>.htaccess support</td><td style={tdStyle}>Not supported</td><td style={tdStyle}>Full support (per-directory config)</td></tr>
          <tr><td style={tdStyle}>Dynamic modules</td><td style={tdStyle}>Limited (compiled or dynamic since 1.9.11)</td><td style={tdStyle}>Extensive ecosystem (mod_rewrite, mod_php, etc.)</td></tr>
          <tr><td style={tdStyle}>Reverse proxy</td><td style={tdStyle}>Built-in, excellent</td><td style={tdStyle}>Via mod_proxy</td></tr>
          <tr><td style={tdStyle}>Configuration reload</td><td style={tdStyle}>Graceful reload, zero downtime</td><td style={tdStyle}>Graceful restart supported</td></tr>
          <tr><td style={tdStyle}>Best for</td><td style={tdStyle}>Static files, reverse proxy, load balancer, API gateway</td><td style={tdStyle}>PHP apps, shared hosting, .htaccess workflows</td></tr>
        </tbody>
      </table>

      <p style={pStyle}>
        <strong>Recommendation:</strong> Use Nginx as your primary web server and reverse proxy for most modern deployments. If you need .htaccess support (common in shared hosting or WordPress with plugins that rely on it), either use Apache behind Nginx or consider migrating .htaccess rules to Nginx location blocks. Our{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Nginx Config Generator</Link>{' '}
        can help translate common Apache patterns into equivalent Nginx configuration.
      </p>

      {/* ── 15. Performance Tuning ─────────────────────────── */}
      <h2 style={h2Style}>15. Performance Tuning</h2>
      <p style={pStyle}>
        Nginx is fast out of the box, but proper tuning can extract even more performance. These optimizations cover worker processes, connection handling, file I/O, and protocol-level improvements.
      </p>

      <h3 style={h3Style}>Worker and Connection Settings</h3>
      <pre style={codeBlockStyle}><code>{`# Set workers to number of CPU cores
worker_processes auto;

# Increase worker connection limit
events {
    worker_connections 4096;
    multi_accept on;
    use epoll;            # Linux only (most efficient)
}

http {
    # Efficient file transfer
    sendfile on;
    tcp_nopush on;        # Send headers and file in one packet
    tcp_nodelay on;       # Disable Nagle algorithm for low latency

    # Keepalive settings
    keepalive_timeout 65;
    keepalive_requests 1000;

    # File descriptor caching
    open_file_cache max=10000 inactive=30s;
    open_file_cache_valid 60s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # Buffer sizes
    client_body_buffer_size 16k;
    client_header_buffer_size 1k;
    large_client_header_buffers 4 8k;
    client_max_body_size 8m;

    # Timeouts
    client_body_timeout 12;
    client_header_timeout 12;
    send_timeout 10;

    # Enable HTTP/2 (on listen directive)
    # listen 443 ssl http2;
}`}</code></pre>

      <h3 style={h3Style}>Performance Tuning Checklist</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Setting</th>
            <th style={thStyle}>Recommended Value</th>
            <th style={thStyle}>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>worker_processes</td><td style={tdStyle}>auto</td><td style={tdStyle}>One worker per CPU core for optimal parallelism</td></tr>
          <tr><td style={tdStyle}>worker_connections</td><td style={tdStyle}>2048-4096</td><td style={tdStyle}>Total capacity = workers x connections</td></tr>
          <tr><td style={tdStyle}>sendfile</td><td style={tdStyle}>on</td><td style={tdStyle}>Kernel-level file transfer, bypasses userspace</td></tr>
          <tr><td style={tdStyle}>tcp_nopush</td><td style={tdStyle}>on</td><td style={tdStyle}>Combines headers and body into fewer TCP packets</td></tr>
          <tr><td style={tdStyle}>gzip_comp_level</td><td style={tdStyle}>4-6</td><td style={tdStyle}>Best compression/CPU trade-off</td></tr>
          <tr><td style={tdStyle}>open_file_cache</td><td style={tdStyle}>max=10000 inactive=30s</td><td style={tdStyle}>Reduces filesystem syscalls for frequently accessed files</td></tr>
          <tr><td style={tdStyle}>keepalive_timeout</td><td style={tdStyle}>65</td><td style={tdStyle}>Reuse TCP connections, reduce handshake overhead</td></tr>
          <tr><td style={tdStyle}>HTTP/2</td><td style={tdStyle}>Enable on 443 ssl</td><td style={tdStyle}>Multiplexing, header compression, server push</td></tr>
        </tbody>
      </table>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Check your system limits with <code style={inlineCodeStyle}>ulimit -n</code>. Each worker needs enough file descriptors for connections plus open files. Set <code style={inlineCodeStyle}>worker_rlimit_nofile 65535;</code> in the main context if needed. On Linux, also increase <code style={inlineCodeStyle}>net.core.somaxconn</code> and <code style={inlineCodeStyle}>net.ipv4.tcp_max_syn_backlog</code> in sysctl for high-traffic servers.
      </div>

      {/* ── 16. Common Directives Reference ────────────────── */}
      <h2 style={h2Style}>16. Essential Directives Quick Reference</h2>
      <p style={pStyle}>
        Here is a compact reference of the most frequently used Nginx directives, organized by function. These are the directives that an Nginx config generator handles automatically.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Directive</th>
            <th style={thStyle}>Context</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>listen</code></td><td style={tdStyle}>server</td><td style={tdStyle}>Port and protocol to listen on (e.g., 80, 443 ssl http2)</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>server_name</code></td><td style={tdStyle}>server</td><td style={tdStyle}>Domain name(s) for this virtual host</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>root</code></td><td style={tdStyle}>server, location</td><td style={tdStyle}>Document root directory for file serving</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>index</code></td><td style={tdStyle}>server, location</td><td style={tdStyle}>Default files to serve for directory requests</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>try_files</code></td><td style={tdStyle}>location</td><td style={tdStyle}>Try files in order, fall back to last option</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>proxy_pass</code></td><td style={tdStyle}>location</td><td style={tdStyle}>Forward requests to a backend server</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>upstream</code></td><td style={tdStyle}>http</td><td style={tdStyle}>Define a group of backend servers</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>ssl_certificate</code></td><td style={tdStyle}>server</td><td style={tdStyle}>Path to the SSL/TLS certificate chain</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>add_header</code></td><td style={tdStyle}>server, location</td><td style={tdStyle}>Add a custom HTTP response header</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>expires</code></td><td style={tdStyle}>location</td><td style={tdStyle}>Set Cache-Control max-age</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>gzip</code></td><td style={tdStyle}>http, server</td><td style={tdStyle}>Enable or disable response compression</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>limit_req_zone</code></td><td style={tdStyle}>http</td><td style={tdStyle}>Define rate limiting zone and parameters</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>client_max_body_size</code></td><td style={tdStyle}>server, location</td><td style={tdStyle}>Maximum upload/request body size</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>error_page</code></td><td style={tdStyle}>server, location</td><td style={tdStyle}>Custom error pages for HTTP status codes</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>access_log</code></td><td style={tdStyle}>http, server, location</td><td style={tdStyle}>Configure access log path and format</td></tr>
        </tbody>
      </table>

      {/* ── 17. Debugging and Testing ─────────────────────── */}
      <h2 style={h2Style}>17. Testing and Debugging Your Configuration</h2>
      <p style={pStyle}>
        Before applying any Nginx configuration change in production, always validate it first. A single typo can bring down your entire server. Here are the essential commands and techniques for safe Nginx configuration management.
      </p>

      <pre style={codeBlockStyle}><code>{`# Test configuration syntax (ALWAYS run before reload)
nginx -t

# Test and show the full parsed configuration
nginx -T

# Reload configuration without downtime
sudo nginx -s reload
# Or using systemctl:
sudo systemctl reload nginx

# View real-time error log
tail -f /var/log/nginx/error.log

# View access log with request timing
tail -f /var/log/nginx/access.log

# Check which Nginx processes are running
ps aux | grep nginx

# Verify Nginx is listening on expected ports
ss -tlnp | grep nginx

# Test specific URLs with curl
curl -I https://example.com          # Check response headers
curl -w "%{time_total}s\\n" -o /dev/null -s https://example.com  # Response time`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Important:</strong> Never use <code style={inlineCodeStyle}>nginx -s stop</code> or <code style={inlineCodeStyle}>systemctl restart nginx</code> in production unless absolutely necessary. These commands terminate existing connections. Always prefer <code style={inlineCodeStyle}>nginx -s reload</code> which gracefully starts new workers while old workers finish serving current requests.
      </div>

      {/* ── CTA mid-article ────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--text-primary)' }}>
          Stop Writing Nginx Configs by Hand
        </p>
        <p style={{ fontSize: 14, marginBottom: 16, color: 'var(--text-secondary)' }}>
          Select your server type, SSL settings, backend, caching rules, and security headers. Get a complete, validated nginx.conf instantly.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Try the Nginx Config Generator &rarr;
        </Link>
      </div>

      {/* ── 18. Best Practices Checklist ──────────────────── */}
      <h2 style={h2Style}>18. Production Deployment Checklist</h2>
      <p style={pStyle}>
        Before deploying your Nginx configuration to production, verify each of these items. This checklist represents the collective wisdom of thousands of production Nginx deployments.
      </p>

      <div style={{ ...keyTakeawaysStyle, marginTop: 16 }}>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2.2, fontSize: 14, color: 'var(--text-secondary)' }}>
          <li><strong>SSL/TLS:</strong> HTTPS enabled, HTTP redirects to HTTPS, TLSv1.2+ only, HSTS header set</li>
          <li><strong>Security headers:</strong> X-Frame-Options, X-Content-Type-Options, CSP, Permissions-Policy configured</li>
          <li><strong>Compression:</strong> Gzip enabled for text/html, text/css, application/javascript, application/json</li>
          <li><strong>Caching:</strong> Static assets have long expires headers, HTML files set to no-cache</li>
          <li><strong>Rate limiting:</strong> Applied to login endpoints, API routes, and form submissions</li>
          <li><strong>Logging:</strong> Access and error logs configured with rotation (logrotate)</li>
          <li><strong>server_tokens:</strong> Set to off to hide Nginx version</li>
          <li><strong>client_max_body_size:</strong> Set appropriately for your application (not unlimited)</li>
          <li><strong>Backup:</strong> Configuration files backed up before changes</li>
          <li><strong>Test:</strong> Configuration validated with <code style={inlineCodeStyle}>nginx -t</code> before every reload</li>
          <li><strong>Monitoring:</strong> Nginx status module enabled (<code style={inlineCodeStyle}>stub_status</code>) for metrics collection</li>
          <li><strong>Firewall:</strong> Only ports 80 and 443 exposed to the internet</li>
        </ul>
      </div>

      {/* ── 19. FAQ ──────────────────────────────────────── */}
      <h2 style={h2Style}>19. Frequently Asked Questions</h2>

      {faqData.map((item, i) => (
        <div key={i} style={faqItemStyle}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--text-primary)' }}>
            Q: {item.q}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
            <strong>A:</strong> {item.a}
          </p>
        </div>
      ))}

      {/* ── Conclusion ────────────────────────────────────── */}
      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Nginx is an incredibly powerful and efficient web server that serves as the backbone of modern web infrastructure. From simple static file serving to complex microservice API gateways with load balancing and SSL termination, a well-configured Nginx deployment provides the performance, security, and reliability your applications need.
      </p>
      <p style={pStyle}>
        However, Nginx configuration syntax has a steep learning curve with hundreds of directives, each valid only in specific contexts. A single misplaced semicolon or incorrect directive can cause the entire configuration to fail. That is why an <strong>Nginx config generator</strong> is invaluable: it eliminates syntax errors, applies best practices automatically, and lets you focus on architecture rather than memorizing directive names.
      </p>
      <p style={pStyle}>
        Whether you are deploying a new project or optimizing an existing server, our{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>free Nginx Config Generator</Link>{' '}
        can produce a complete, production-ready nginx.conf tailored to your exact requirements in seconds. Combine it with the knowledge from this guide, and you will have Nginx configurations that are secure, performant, and maintainable.
      </p>
    </div>
  );
}
