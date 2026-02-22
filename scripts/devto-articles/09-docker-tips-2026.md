---
title: "Docker Tips That Actually Matter in 2026"
published: false
description: "Practical Docker tips for faster builds, smaller images, and better security. No fluff, just things that work."
tags: docker, devops, tutorial, productivity
canonical_url: https://viadreams.cc/en/blog/docker-security-best-practices
cover_image: https://viadreams.cc/og-image.png
---

After running Docker in production for years, here are the tips that actually make a difference.

## 1. Multi-Stage Builds Are Non-Negotiable

Stop shipping build tools in your production images:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

This typically reduces image size by 60-80%.

## 2. Layer Caching Strategy

Docker caches layers from top to bottom. Order your Dockerfile instructions from least to most frequently changing:

```dockerfile
# Changes rarely
FROM node:20-alpine
WORKDIR /app

# Changes occasionally
COPY package*.json ./
RUN npm ci

# Changes frequently
COPY . .
RUN npm run build
```

This way, `npm ci` only runs when dependencies change, not every code change.

## 3. Use .dockerignore

Your `.dockerignore` should be as thorough as your `.gitignore`:

```
node_modules
.git
.env
*.md
.next
dist
coverage
.vscode
```

This speeds up the build context transfer significantly for large projects.

## 4. Health Checks

Add health checks so Docker knows when your app is actually ready:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
```

## 5. Non-Root User

Running as root in a container is a security risk:

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

## 6. Pin Your Base Images

Don't use `node:latest`. Pin to a specific version:

```dockerfile
# Bad
FROM node:latest

# Good
FROM node:20.11-alpine3.19
```

## 7. Docker Compose for Development

Use Docker Compose with watch mode for a smooth dev experience:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json
```

## Useful Resources

- [Docker Security Best Practices](https://viadreams.cc/en/blog/docker-security-best-practices) - comprehensive security guide
- [Docker Networking Guide](https://viadreams.cc/en/blog/docker-networking-guide) - bridge, host, overlay networks explained
- [Kubernetes Beginners Guide](https://viadreams.cc/en/blog/kubernetes-beginners-guide) - from Docker to K8s

**More developer tools at [DevToolBox](https://viadreams.cc)** - 200+ free tools including JSON formatter, Base64 encoder, regex builder, and more.
