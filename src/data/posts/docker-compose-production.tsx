'use client';

import Link from 'next/link';

export default function DockerComposeProduction({ lang }: { lang: string }) {
  return (
    <>
      <h2>Docker Compose for Production Environments</h2>
      <p>
        <strong>Docker Compose</strong> is often associated with local development, but with the right
        configuration it is a perfectly valid choice for production deployments — especially for small
        to medium applications, single-server setups, and teams without dedicated DevOps resources.
        This guide covers the patterns, configurations, and best practices that make Docker Compose
        production-ready.
      </p>
      <p>
        Before reading this guide, make sure you understand the basics covered in our{' '}
        <Link href={`/${lang}/blog/docker-compose-cheat-sheet`}>Docker Compose Cheat Sheet</Link>.
      </p>

      <h2>Development vs Production Configuration</h2>
      <p>
        The key principle for production Docker Compose is using separate files for environment-specific
        configuration via the <code>-f</code> flag or <code>extends</code> feature:
      </p>
      <pre><code className="language-text">{`docker-compose.yml           # Shared base configuration
docker-compose.override.yml  # Dev overrides (auto-loaded locally)
docker-compose.prod.yml      # Production overrides

# Run in development (auto-merges base + override):
docker compose up

# Run in production:
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`}</code></pre>
      <pre><code className="language-yaml">{`# docker-compose.yml (base)
version: '3.9'

services:
  app:
    image: myapp:latest
    restart: unless-stopped
    networks:
      - app-network
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  app-network:
    driver: bridge

volumes:
  db-data:`}</code></pre>
      <pre><code className="language-yaml">{`# docker-compose.override.yml (development, auto-loaded)
services:
  app:
    build: .                      # Build from source in dev
    volumes:
      - .:/app                    # Live reload with bind mount
      - /app/node_modules
    environment:
      - NODE_ENV=development
    ports:
      - "3000:3000"
    command: npm run dev

  db:
    ports:
      - "5432:5432"               # Expose DB port locally for tools`}</code></pre>
      <pre><code className="language-yaml">{`# docker-compose.prod.yml (production)
services:
  app:
    image: \${REGISTRY}/myapp:\${IMAGE_TAG:-latest}   # Use pre-built image
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/conf:/etc/letsencrypt:ro
      - ./certbot/www:/var/www/certbot:ro
    depends_on:
      - app`}</code></pre>

      <h2>Secrets Management</h2>
      <p>
        Never hardcode secrets in your compose files. Use Docker secrets or environment files
        with proper permissions:
      </p>
      <pre><code className="language-yaml">{`# Using Docker secrets (Swarm mode)
version: '3.9'

services:
  app:
    secrets:
      - db_password
      - api_key
    environment:
      DB_PASSWORD_FILE: /run/secrets/db_password
      API_KEY_FILE: /run/secrets/api_key

secrets:
  db_password:
    external: true              # Created with: docker secret create db_password -
  api_key:
    file: ./secrets/api_key.txt # Read from file (less secure)`}</code></pre>
      <pre><code className="language-bash">{`# Create secrets
echo "supersecretpassword" | docker secret create db_password -
docker secret ls

# .env.production (outside git, tight permissions)
chmod 600 .env.production

# Reference in compose
services:
  app:
    env_file:
      - .env.production         # Never commit this file!`}</code></pre>
      <pre><code className="language-bash">{`# .gitignore
.env
.env.production
.env.local
secrets/`}</code></pre>

      <h2>Nginx Reverse Proxy with SSL</h2>
      <p>
        A production setup always runs behind a reverse proxy. Here's a complete Nginx + Certbot
        (Let's Encrypt) configuration:
      </p>
      <pre><code className="language-yaml">{`# docker-compose.prod.yml with Nginx + Certbot
services:
  app:
    image: myapp:latest
    networks:
      - internal
    expose:
      - "3000"                  # Internal only, not published to host

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - certbot_conf:/etc/letsencrypt:ro
      - certbot_www:/var/www/certbot:ro
    depends_on:
      - app
    networks:
      - internal
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - certbot_conf:/etc/letsencrypt
      - certbot_www:/var/www/certbot
    command: certonly --webroot -w /var/www/certbot
             --email admin@example.com
             --agree-tos --no-eff-email
             -d example.com -d www.example.com

volumes:
  certbot_conf:
  certbot_www:

networks:
  internal:
    driver: bridge`}</code></pre>
      <pre><code className="language-nginx">{`# nginx/conf.d/app.conf
server {
    listen 80;
    server_name example.com www.example.com;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://app:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}`}</code></pre>

      <h2>Health Checks and Restart Policies</h2>
      <p>
        Production containers must have health checks so Docker knows when to restart them and
        dependent services know when they are ready:
      </p>
      <pre><code className="language-yaml">{`services:
  app:
    image: myapp:latest
    restart: unless-stopped       # Always restart unless manually stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s               # Check every 30 seconds
      timeout: 10s                # Fail if no response in 10s
      retries: 3                  # Mark unhealthy after 3 failures
      start_period: 40s           # Grace period on startup

  db:
    image: postgres:16
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
    command: redis-server --save 60 1 --loglevel warning

  worker:
    image: myapp:latest
    command: node worker.js
    depends_on:
      db:
        condition: service_healthy    # Wait for DB health check to pass
      redis:
        condition: service_healthy
    restart: unless-stopped`}</code></pre>

      <h2>Zero-Downtime Deployment Strategy</h2>
      <p>
        Achieving zero-downtime deployments with Docker Compose on a single server:
      </p>
      <pre><code className="language-bash">{`#!/bin/bash
# deploy.sh - Zero-downtime deployment script
set -e

IMAGE_TAG=\${1:-latest}
COMPOSE_FILE="docker-compose.yml -f docker-compose.prod.yml"

echo "Pulling new image..."
docker compose -f \$COMPOSE_FILE pull app

echo "Starting new container alongside old..."
docker compose -f \$COMPOSE_FILE up -d --no-deps --scale app=2 --no-recreate app

echo "Waiting for new container to be healthy..."
sleep 15

echo "Removing old container..."
OLD_CONTAINER=\$(docker compose -f \$COMPOSE_FILE ps -q app | head -1)
docker stop \$OLD_CONTAINER
docker rm \$OLD_CONTAINER

echo "Scaling back to 1 replica..."
docker compose -f \$COMPOSE_FILE up -d --no-deps --scale app=1 --no-recreate app

echo "Deployment complete!"
docker compose -f \$COMPOSE_FILE ps`}</code></pre>
      <pre><code className="language-bash">{`# Simpler approach: use --wait flag (Compose v2.1+)
docker compose -f docker-compose.yml -f docker-compose.prod.yml \
  pull && \
  up -d --wait                    # Waits for all healthchecks to pass

# Quick rollback
export IMAGE_TAG=previous-sha
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`}</code></pre>

      <h2>Logging and Monitoring</h2>
      <pre><code className="language-yaml">{`services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"           # Rotate after 10MB
        max-file: "5"             # Keep 5 rotated files

  # Or ship to centralized logging
  app_with_loki:
    logging:
      driver: loki
      options:
        loki-url: "http://loki:3100/loki/api/v1/push"
        loki-batch-size: "400"
        labels: "app=myapp,env=production"

  # Prometheus metrics scraping
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD}

volumes:
  prometheus_data:
  grafana_data:`}</code></pre>

      <h2>Database Backup Automation</h2>
      <pre><code className="language-yaml">{`services:
  db-backup:
    image: postgres:16-alpine
    environment:
      PGPASSWORD: \${POSTGRES_PASSWORD}
    volumes:
      - ./backups:/backups
    entrypoint: |
      sh -c 'while true; do
        pg_dump -h db -U \${POSTGRES_USER} \${POSTGRES_DB} |
          gzip > /backups/backup-\$\$(date +%Y%m%d-%H%M%S).sql.gz
        find /backups -name "*.sql.gz" -mtime +7 -delete
        echo "Backup complete, sleeping 24h..."
        sleep 86400
      done'
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped`}</code></pre>

      <h2>Resource Limits and Performance</h2>
      <pre><code className="language-yaml">{`services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'             # Max 1 CPU core
          memory: 512M            # Max 512 MB RAM
        reservations:
          cpus: '0.25'            # Guaranteed 0.25 CPU
          memory: 128M            # Guaranteed 128 MB RAM

  # For Compose v2 without Swarm
  app_standalone:
    cpus: 1.0                     # Compose v2 syntax (no deploy:)
    mem_limit: 512m
    memswap_limit: 512m           # Disable swap (same as mem_limit)
    cpu_shares: 512               # Relative weight (1024 = default)`}</code></pre>

      <h2>Production Deployment Checklist</h2>
      <pre><code className="language-text">{`Pre-deployment
  [ ] Images built with specific tags (not :latest in production)
  [ ] Secrets stored in .env files (not compose files), chmod 600
  [ ] Health checks configured for all critical services
  [ ] Restart policies set to unless-stopped or always
  [ ] Resource limits set to prevent OOM kills
  [ ] Logging configured with size limits

Networking & Security
  [ ] No unnecessary ports exposed to host (use expose: not ports:)
  [ ] Nginx/Traefik reverse proxy in front
  [ ] SSL/TLS configured and auto-renewing
  [ ] Security headers set in nginx config
  [ ] Internal network for service-to-service communication

Operations
  [ ] Database backup strategy in place
  [ ] Monitoring/alerting configured
  [ ] Deployment script with rollback capability
  [ ] CI/CD pipeline building and pushing images
  [ ] Log rotation configured`}</code></pre>

      <h2>Frequently Asked Questions</h2>

      <h3>Should I use Docker Compose or Kubernetes in production?</h3>
      <p>
        For single-server deployments, small teams, or simpler applications, Docker Compose is
        perfectly fine and much simpler to operate. Kubernetes is justified when you need multi-node
        scaling, advanced scheduling, or have a dedicated platform team. Don't over-engineer.
      </p>

      <h3>How do I update a single service without downtime?</h3>
      <p>
        Use <code>docker compose up -d --no-deps service-name</code> to recreate only that service.
        For true zero-downtime, scale to 2 replicas with load balancing (Nginx upstream), update one,
        then scale back.
      </p>

      <h3>How do I handle database migrations?</h3>
      <p>
        Run migrations as a separate one-shot service or as a startup command in the app container.
        Use the <code>depends_on</code> with <code>condition: service_healthy</code> to ensure the
        DB is ready before running migrations.
      </p>

      <p>
        For more Docker tips, check out our{' '}
        <Link href={`/${lang}/blog/docker-volumes-bind-mounts-guide`}>Docker Volumes Guide</Link> and
        the <Link href={`/${lang}/blog/dockerfile-best-practices-multi-stage`}>Dockerfile Best Practices</Link>{' '}
        guide.
      </p>
    </>
  );
}
