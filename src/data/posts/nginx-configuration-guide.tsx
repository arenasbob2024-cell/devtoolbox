'use client';

import Link from 'next/link';

export default function NginxConfigurationGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Nginx?</h2>
      <p>
        <strong>Nginx</strong> (pronounced "engine-x") is one of the most widely used web servers in the world. Originally created by Igor Sysoev to solve the C10K problem (handling 10,000+ concurrent connections), Nginx has evolved into a complete platform for web serving, reverse proxying, load balancing, and HTTP caching. As of 2026, Nginx powers roughly a third of all websites on the internet.
      </p>
      <p>
        This guide walks through every essential aspect of Nginx configuration, from basic server blocks to advanced reverse proxy setups, SSL/TLS termination, performance tuning, and security hardening. Whether you are deploying a static site, running a Node.js application behind a reverse proxy, or configuring a high-traffic production environment, this reference covers the patterns you need.
      </p>

      <h2>Understanding the Configuration File Structure</h2>
      <p>
        Nginx configuration follows a hierarchical block structure. The main configuration file is typically located at <code>/etc/nginx/nginx.conf</code>. Directives are organized into contexts: <code>main</code>, <code>events</code>, <code>http</code>, <code>server</code>, and <code>location</code>. Each context inherits directives from its parent, and more specific contexts override more general ones.
      </p>
      <pre><code className="language-nginx">{`# /etc/nginx/nginx.conf - Main configuration file

# Main context - global settings
user  nginx;
worker_processes  auto;          # Match number of CPU cores
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

# Events context - connection handling
events {
    worker_connections  1024;     # Max connections per worker
    multi_accept        on;       # Accept multiple connections at once
    use                 epoll;    # Linux: efficient event method
}

# HTTP context - web server settings
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';
    access_log /var/log/nginx/access.log main;

    # Performance
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout  65;
    gzip            on;

    # Include server blocks
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}`}</code></pre>

      <h3>Key Configuration Contexts</h3>
      <pre><code className="language-text">{`Context Hierarchy:

main                    # Global settings (worker processes, error log)
├── events              # Connection handling (worker_connections)
└── http                # HTTP server settings
    ├── upstream         # Backend server groups (load balancing)
    └── server           # Virtual host configuration
        └── location     # URL path matching and request handling

Inheritance Rule:
  Directives set at a higher level are inherited by all nested blocks
  unless explicitly overridden at a lower level.`}</code></pre>

      <h2>Server Blocks: Virtual Host Configuration</h2>
      <p>
        Server blocks (similar to Apache virtual hosts) allow you to serve multiple websites from a single Nginx instance. Each server block listens on specific ports and responds to specific domain names.
      </p>
      <pre><code className="language-nginx">{`# Basic static website
server {
    listen       80;
    listen       [::]:80;           # IPv6
    server_name  example.com www.example.com;
    root         /var/www/example.com/public;
    index        index.html index.htm;

    # Main location
    location / {
        try_files $uri $uri/ =404;
    }

    # Custom error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

# Redirect www to non-www
server {
    listen       80;
    server_name  www.example.com;
    return       301 https://example.com$request_uri;
}

# Redirect HTTP to HTTPS
server {
    listen       80;
    server_name  example.com;
    return       301 https://$server_name$request_uri;
}`}</code></pre>

      <h2>Location Blocks and URL Matching</h2>
      <p>
        The <code>location</code> directive is one of the most powerful features of Nginx. It defines how requests are handled based on the requested URI. Understanding the matching priority is essential for correct configuration.
      </p>
      <pre><code className="language-nginx">{`# Location matching priority (highest to lowest):
# 1. Exact match:           location = /path
# 2. Preferential prefix:   location ^~ /path
# 3. Regex (case-sensitive): location ~ \\.php$
# 4. Regex (case-insensitive): location ~* \\.(jpg|png|gif)$
# 5. Prefix match:          location /path

server {
    listen 80;
    server_name example.com;

    # Exact match - highest priority
    location = / {
        # Only matches exactly "/"
        return 200 "Homepage";
    }

    # Preferential prefix - stops regex search
    location ^~ /static/ {
        root /var/www/static;
        expires 30d;
    }

    # Regex match - case insensitive
    location ~* \\.(css|js|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        root /var/www/assets;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Prefix match for API
    location /api/ {
        proxy_pass http://backend;
    }

    # Default catch-all
    location / {
        try_files $uri $uri/ /index.html;
    }
}`}</code></pre>

      <h2>Reverse Proxy Configuration</h2>
      <p>
        One of the most common use cases for Nginx is acting as a reverse proxy in front of application servers like Node.js, Python, Go, or Java. The reverse proxy handles SSL termination, static file serving, caching, and load distribution while forwarding dynamic requests to the backend.
      </p>
      <pre><code className="language-nginx">{`# Reverse proxy for Node.js / Express application
upstream node_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate     /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    location / {
        proxy_pass http://node_backend;
        proxy_http_version 1.1;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Forward client information
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;

        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }

    # Serve static files directly (bypass proxy)
    location /static/ {
        alias /var/www/app/static/;
        expires 30d;
        add_header Cache-Control "public";
    }
}`}</code></pre>

      <h2>Load Balancing</h2>
      <p>
        Nginx supports several load balancing algorithms to distribute traffic across multiple backend servers. This is critical for high-availability production deployments.
      </p>
      <pre><code className="language-nginx">{`# Round Robin (default) - equal distribution
upstream app_servers {
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

# Least Connections - send to least busy server
upstream app_least {
    least_conn;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

# IP Hash - session persistence (same client -> same server)
upstream app_sticky {
    ip_hash;
    server 10.0.0.1:8080;
    server 10.0.0.2:8080;
    server 10.0.0.3:8080;
}

# Weighted distribution
upstream app_weighted {
    server 10.0.0.1:8080 weight=5;   # Gets 5x traffic
    server 10.0.0.2:8080 weight=3;   # Gets 3x traffic
    server 10.0.0.3:8080 weight=1;   # Gets 1x traffic (baseline)
}

# Health checks and failover
upstream app_resilient {
    server 10.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.2:8080 max_fails=3 fail_timeout=30s;
    server 10.0.0.3:8080 backup;     # Only used when others fail
}`}</code></pre>

      <h2>SSL/TLS Configuration</h2>
      <p>
        Proper SSL/TLS configuration is essential for security. Modern Nginx setups should enforce HTTPS, use strong cipher suites, and implement HSTS and OCSP stapling for optimal security and performance.
      </p>
      <pre><code className="language-nginx">{`server {
    listen 443 ssl http2;
    server_name example.com;

    # Certificate files (Let's Encrypt)
    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # Modern TLS configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # SSL session caching
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}`}</code></pre>

      <h2>Performance Tuning</h2>
      <p>
        Nginx is fast by default, but tuning specific settings based on your workload can yield significant improvements. The key areas are worker processes, connection handling, buffer sizes, gzip compression, and caching.
      </p>
      <pre><code className="language-nginx">{`# Worker tuning
worker_processes auto;           # One per CPU core
worker_rlimit_nofile 65535;      # Max open file descriptors

events {
    worker_connections 4096;     # Max connections per worker
    multi_accept on;
    use epoll;                   # Linux event notification
}

http {
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml
        application/rss+xml
        image/svg+xml;

    # File caching
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # Client body settings
    client_max_body_size 16m;
    client_body_buffer_size 128k;

    # Proxy caching
    proxy_cache_path /var/cache/nginx levels=1:2
                     keys_zone=app_cache:10m
                     max_size=1g
                     inactive=60m
                     use_temp_path=off;

    server {
        location /api/ {
            proxy_pass http://backend;
            proxy_cache app_cache;
            proxy_cache_valid 200 10m;
            proxy_cache_valid 404 1m;
            proxy_cache_use_stale error timeout updating;
            add_header X-Cache-Status $upstream_cache_status;
        }
    }
}`}</code></pre>

      <h2>Rate Limiting and Security</h2>
      <p>
        Nginx provides built-in rate limiting and access control to protect your servers from abuse, brute force attacks, and denial-of-service attempts.
      </p>
      <pre><code className="language-nginx">{`http {
    # Define rate limit zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    limit_conn_zone $binary_remote_addr zone=addr:10m;

    server {
        # API rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_req_status 429;
            proxy_pass http://backend;
        }

        # Strict rate limit for login
        location /login {
            limit_req zone=login burst=5;
            limit_req_status 429;
            proxy_pass http://backend;
        }

        # Connection limiting
        location /downloads/ {
            limit_conn addr 5;          # 5 connections per IP
            limit_rate 500k;            # 500KB/s per connection
            root /var/www/files;
        }

        # Block common attack patterns
        location ~* /(wp-admin|wp-login|xmlrpc\\.php) {
            return 403;
        }

        # Deny access to hidden files
        location ~ /\\. {
            deny all;
            access_log off;
            log_not_found off;
        }

        # IP-based access control
        location /admin/ {
            allow 10.0.0.0/8;
            allow 192.168.1.0/24;
            deny all;
            proxy_pass http://backend;
        }
    }
}`}</code></pre>

      <h2>Common Configuration Patterns</h2>
      <pre><code className="language-nginx">{`# Single Page Application (React, Vue, Angular)
server {
    listen 80;
    server_name app.example.com;
    root /var/www/spa/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# API Gateway with path-based routing
server {
    listen 443 ssl http2;
    server_name api.example.com;

    location /v1/users/ {
        proxy_pass http://user_service;
    }

    location /v1/orders/ {
        proxy_pass http://order_service;
    }

    location /v1/products/ {
        proxy_pass http://product_service;
    }
}

# CORS headers for API
location /api/ {
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Length' 0;
        return 204;
    }
    add_header 'Access-Control-Allow-Origin' '*' always;
    proxy_pass http://backend;
}`}</code></pre>

      <h2>Testing and Debugging</h2>
      <pre><code className="language-bash">{`# Test configuration syntax
sudo nginx -t

# Reload without downtime
sudo nginx -s reload

# View error logs
tail -f /var/log/nginx/error.log

# View access logs
tail -f /var/log/nginx/access.log

# Check which configuration files are loaded
nginx -T

# Debug specific requests (temporary)
# Add to server block:
#   error_log /var/log/nginx/debug.log debug;

# Check Nginx version and compiled modules
nginx -V`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between root and alias?</h3>
      <p>
        The <code>root</code> directive appends the URI to the specified path, so <code>root /var/www</code> with a request for <code>/images/logo.png</code> looks for <code>/var/www/images/logo.png</code>. The <code>alias</code> directive replaces the matched location path, so <code>location /images/</code> with <code>alias /data/pics/</code> would look for <code>/data/pics/logo.png</code>. Use <code>root</code> for standard document roots and <code>alias</code> when the file path does not mirror the URL structure.
      </p>

      <h3>How do I set up HTTPS with Let's Encrypt?</h3>
      <p>
        Install Certbot and run <code>sudo certbot --nginx -d example.com</code>. Certbot automatically obtains the certificate, modifies your Nginx configuration, and sets up auto-renewal via a cron job or systemd timer. Make sure port 80 is accessible for the ACME challenge during certificate issuance.
      </p>

      <h3>How many worker_connections should I set?</h3>
      <p>
        The total maximum connections your Nginx can handle is <code>worker_processes * worker_connections</code>. For most servers, 1024 per worker is a good starting point. High-traffic servers may need 4096 or higher. Each connection uses roughly 1-2 KB of memory, so 4096 connections per worker with 4 workers equals about 64 MB of connection overhead, which is very manageable on modern hardware.
      </p>

      <h3>Should I use Nginx or Apache?</h3>
      <p>
        Nginx excels at handling many concurrent connections with low memory usage, making it ideal for static content serving, reverse proxying, and high-concurrency workloads. Apache is better when you need per-directory configuration via <code>.htaccess</code> files or dynamic module loading. Many production setups use Nginx as a reverse proxy in front of Apache to get the best of both worlds.
      </p>

      <h2>Related Tools and Guides</h2>
      <ul>
        <li><Link href={`/${lang}/blog/nginx-config-examples`}>Nginx Config Examples</Link> - Copy-paste ready configuration snippets</li>
        <li><Link href={`/${lang}/blog/nginx-location-block-regex-guide`}>Nginx Location Block Regex Guide</Link> - Deep dive into location matching</li>
        <li><Link href={`/${lang}/blog/how-to-fix-cors-errors-complete-guide`}>How to Fix CORS Errors</Link> - Complete CORS troubleshooting guide</li>
        <li><Link href={`/${lang}/blog/csp-header-guide`}>CSP Header Guide</Link> - Content Security Policy configuration</li>
      </ul>
    </>
  );
}
