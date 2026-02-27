---
title: "Docker Compose Guide: Write docker-compose.yml Files — Complete Guide"
tags: docker, devops, javascript, webdev
canonical_url: https://viadreams.cc/en/blog/docker-compose-online-guide
published: true
---

Define and run multi-container Docker applications. Complete guide for docker-compose.yml structure, services, networks, volumes, and production best practices.

## docker-compose.yml Structure

```yaml
version: '3.9'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app
    networks:
      - frontend

  app:
    build: .
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    networks:
      - frontend
      - backend

  db:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    networks:
      - backend

volumes:
  postgres_data:

networks:
  frontend:
  backend:
    internal: true  # No external access
```

## Environment Variables — 4 Methods

```yaml
services:
  app:
    # Method 1: Inline
    environment:
      NODE_ENV: production

    # Method 2: .env auto-loading (same directory)
    # .env file is loaded automatically — no config needed

    # Method 3: env_file key
    env_file:
      - .env
      - .env.local

    # Method 4: Shell pass-through (no value = inherit from shell)
    environment:
      - AWS_ACCESS_KEY_ID  # Passes from shell
```

## Health Checks + depends_on Conditions

```yaml
services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  app:
    depends_on:
      db:
        condition: service_healthy  # Wait for health check to pass
      redis:
        condition: service_started  # Just wait for start
      migrations:
        condition: service_completed_successfully  # Wait for exit 0
```

## Profiles (dev vs prod)

```yaml
services:
  app:
    image: myapp:latest

  # Only starts with --profile dev
  adminer:
    image: adminer
    profiles: [dev]
    ports:
      - "8080:8080"

  # Only starts with --profile monitoring
  prometheus:
    image: prom/prometheus
    profiles: [monitoring]
```

```bash
# Start dev profile
docker compose --profile dev up

# Multiple profiles
COMPOSE_PROFILES=dev,monitoring docker compose up
```

## Override Files

```bash
# Base: docker-compose.yml
# Dev overrides: docker-compose.override.yml  ← auto-merged
# Prod: docker-compose.prod.yml

# Development (auto-merges base + override)
docker compose up

# Production (explicit merge)
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Common Commands

```bash
# Start services
docker compose up -d              # Detached
docker compose up --build         # Rebuild images

# Logs
docker compose logs -f app        # Follow app logs

# Execute commands
docker compose exec app sh        # Shell into running container
docker compose run --rm app npm test  # One-off command

# Scale (replicated mode)
docker compose up -d --scale app=3

# Cleanup
docker compose down               # Stop + remove containers
docker compose down -v            # Also remove volumes
docker compose down --rmi all     # Also remove images
```

## Production Best Practices

```yaml
services:
  app:
    image: myapp:1.2.3  # ✅ Pinned tag, not :latest
    restart: unless-stopped
    read_only: true
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    tmpfs:
      - /tmp
      - /var/run
```

## Quick Tool

Use **[DevToolBox Docker Compose Generator](https://viadreams.cc/en/tools/docker-compose-generator)** — generate docker-compose.yml files for common stacks instantly.

---

*Generate Docker Compose configs with [DevToolBox's free Docker Compose Generator](https://viadreams.cc/en/tools/docker-compose-generator).*
