---
title: "Nginx Config Guide: Write nginx.conf Files — Complete Guide"
tags: nginx, devops, webdev, javascript
canonical_url: https://viadreams.cc/en/blog/nginx-config-online-guide
published: true
---

Master nginx configuration. Complete guide for nginx.conf structure, reverse proxy, SSL/TLS, load balancing, caching, rate limiting, and security headers.

## nginx.conf Block Hierarchy

```nginx
# main context
worker_processes auto;
error_log /var/log/nginx/error.log warn;

events {
  worker_connections 1024;
}

http {
  include mime.types;
  sendfile on;

  server {
    listen 80;
    server_name example.com;

    location / {
      root /var/www/html;
      index index.html;
    }
  }
}
```

## Reverse Proxy with proxy_pass

```nginx
server {
  listen 80;

  location /api/ {
    proxy_pass http://localhost:3000/;  # Trailing slash strips /api prefix
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket support
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

## SSL/TLS with Let's Encrypt

```nginx
server {
  listen 443 ssl http2;
  server_name example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  # Modern cipher suites (TLS 1.2+)
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
  ssl_prefer_server_ciphers off;

  # OCSP stapling
  ssl_stapling on;
  ssl_stapling_verify on;
}

# HTTP → HTTPS redirect
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}
```

## Load Balancing

```nginx
upstream backend {
  least_conn;  # or: round_robin (default), ip_hash

  server 10.0.0.1:3000 weight=3;
  server 10.0.0.2:3000 weight=1;
  server 10.0.0.3:3000 backup;  # Standby
  
  keepalive 32;
}

server {
  location / {
    proxy_pass http://backend;
  }
}
```

## Rate Limiting

```nginx
# Define zone: 10MB stores ~160K IP addresses
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

server {
  location /api/ {
    limit_req zone=api burst=20 nodelay;
    limit_req_status 429;
  }

  location /login {
    limit_req zone=login burst=3;
  }
}
```

## Security Headers

```nginx
server {
  # HSTS (after confirming HTTPS works)
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  
  # Prevent clickjacking
  add_header X-Frame-Options "SAMEORIGIN" always;
  
  # MIME sniffing
  add_header X-Content-Type-Options "nosniff" always;
  
  # Referrer policy
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  
  # Content Security Policy
  add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'" always;
  
  # Remove server version
  server_tokens off;
}
```

## Gzip Compression

```nginx
http {
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_comp_level 6;
  gzip_types
    text/plain text/css application/json
    application/javascript text/xml application/xml
    image/svg+xml;
}
```

## Caching

```nginx
# Browser caching
location ~* \.(js|css|png|jpg|ico|woff2)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Proxy cache zone
proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=api_cache:10m
                 max_size=100m inactive=60m use_temp_path=off;

location /api/ {
  proxy_cache api_cache;
  proxy_cache_valid 200 10m;
  proxy_cache_use_stale error timeout;
}
```

## Common Debugging

```bash
# Test config (always before reload!)
nginx -t

# Reload without downtime
nginx -s reload

# Check error log
tail -f /var/log/nginx/error.log

# Test from CLI
curl -I https://example.com
curl -v http://localhost/api/health
```

## Quick Tool

Use **[DevToolBox Nginx Config Generator](https://viadreams.cc/en/tools/nginx-config-generator)** — generate nginx.conf for reverse proxy, SSL, load balancing instantly.

---

*Generate Nginx configs with [DevToolBox's free Nginx Config Generator](https://viadreams.cc/en/tools/nginx-config-generator).*
