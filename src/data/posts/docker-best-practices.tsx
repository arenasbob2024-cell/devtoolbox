'use client';

import Link from 'next/link';

export default function DockerBestPractices({ lang }: { lang: string }) {
  return (
    <>
      <h2>Why Docker Best Practices Matter</h2>
      <p>
        Docker containers are the backbone of modern application deployment. However, a poorly
        configured Docker setup can lead to bloated images, security vulnerabilities, slow builds,
        and unreliable deployments. Following best practices ensures your containers are small,
        secure, fast to build, and production-ready. This guide covers 20 essential tips that every
        developer and DevOps engineer should apply to their Docker workflows. For Docker Compose
        specifics, see our{' '}
        <Link href={`/${lang}/blog/docker-compose-tutorial`}>Docker Compose Tutorial</Link>.
      </p>

      <h2>1. Use Minimal Base Images</h2>
      <p>
        Start with the smallest base image that meets your needs. Alpine-based images are typically
        5-10x smaller than their Debian counterparts, which reduces download time, attack surface,
        and storage costs.
      </p>
      <pre><code className="language-dockerfile">{`# Bad: Full Debian image (~ 900 MB)
FROM node:20

# Better: Slim variant (~ 200 MB)
FROM node:20-slim

# Best: Alpine variant (~ 130 MB)
FROM node:20-alpine

# For Go: Scratch image (just your binary, ~ 10-20 MB)
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o /server .

FROM scratch
COPY --from=builder /server /server
ENTRYPOINT ["/server"]`}</code></pre>

      <h2>2. Use Multi-Stage Builds</h2>
      <p>
        Multi-stage builds let you use one image for building and another for running your
        application. Build dependencies, compilers, and source code stay out of the final image.
        Learn more in our{' '}
        <Link href={`/${lang}/blog/dockerfile-best-practices-multi-stage`}>Dockerfile Multi-Stage
        Best Practices</Link> guide.
      </p>
      <pre><code className="language-dockerfile">{`# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# Only copy what's needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]

# Result: Build tools, TypeScript source, devDependencies
# are NOT in the final image`}</code></pre>

      <h2>3. Leverage Build Cache Effectively</h2>
      <p>
        Docker caches each layer. Order your Dockerfile instructions from least-frequently changed to
        most-frequently changed. Copy dependency files before source code so that dependency
        installation is cached when only source code changes.
      </p>
      <pre><code className="language-dockerfile">{`# Bad: Any code change invalidates npm install cache
FROM node:20-alpine
WORKDIR /app
COPY . .                    # <-- ALL files copied first
RUN npm ci                  # <-- Runs every time ANY file changes
RUN npm run build

# Good: Dependencies cached separately from source code
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./   # <-- Step 1: deps files only
RUN npm ci                               # <-- Cached unless deps change
COPY . .                                 # <-- Step 2: source code
RUN npm run build                        # <-- Only runs when code changes`}</code></pre>

      <h2>4. Use .dockerignore</h2>
      <p>
        A <code>.dockerignore</code> file prevents unnecessary files from being sent to the Docker
        build context. This speeds up builds and prevents sensitive files from accidentally ending up
        in images.
      </p>
      <pre><code className="language-text">{`# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
.env
.env.*
*.md
LICENSE
docker-compose*.yml
Dockerfile*
.dockerignore
coverage/
.nyc_output
tests/
__tests__/
.vscode/
.idea/
*.swp
*.swo
dist/
build/`}</code></pre>

      <h2>5. Pin Dependency Versions</h2>
      <p>
        Always pin your base image versions and package versions. Using <code>latest</code> tags
        creates non-reproducible builds that can break unexpectedly when upstream images are updated.
      </p>
      <pre><code className="language-dockerfile">{`# Bad: Non-reproducible builds
FROM node:latest
FROM python:3
FROM nginx

# Good: Pinned versions for reproducibility
FROM node:20.11.1-alpine3.19
FROM python:3.12.2-slim-bookworm
FROM nginx:1.25.4-alpine

# Even better: Pin the SHA256 digest
FROM node:20.11.1-alpine3.19@sha256:abc123...

# For package managers, use lock files
COPY package-lock.json ./
RUN npm ci    # Uses exact versions from lock file

# For apt packages, pin versions
RUN apt-get update && apt-get install -y \\
    curl=7.88.1-10+deb12u5 \\
    && rm -rf /var/lib/apt/lists/*`}</code></pre>

      <h2>6. Run as Non-Root User</h2>
      <p>
        Never run your application as root inside a container. If an attacker compromises your
        application, running as root gives them full control of the container and potentially the
        host system.
      </p>
      <pre><code className="language-dockerfile">{`# Create a dedicated user and group
FROM node:20-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .
RUN npm ci --production

# Switch to non-root user BEFORE CMD
USER appuser

EXPOSE 3000
CMD ["node", "index.js"]

# Verify it works:
# docker run myapp whoami
# Output: appuser`}</code></pre>

      <h2>7. Use COPY Instead of ADD</h2>
      <p>
        <code>COPY</code> is more predictable than <code>ADD</code>. The <code>ADD</code> instruction
        has extra features (auto-extraction of archives, URL fetching) that can introduce unexpected
        behavior. Use <code>COPY</code> unless you specifically need those features.
      </p>
      <pre><code className="language-dockerfile">{`# Prefer COPY for transparency
COPY package.json ./
COPY src/ ./src/

# Only use ADD when you need auto-extraction
ADD archive.tar.gz /opt/

# Never use ADD for URLs — use curl instead
# Bad:
ADD https://example.com/file.tar.gz /tmp/
# Good:
RUN curl -fsSL https://example.com/file.tar.gz | tar xz -C /opt/`}</code></pre>

      <h2>8. Minimize Layer Count</h2>
      <p>
        Each <code>RUN</code>, <code>COPY</code>, and <code>ADD</code> instruction creates a new
        layer. Combine related commands into single <code>RUN</code> instructions to reduce the
        number of layers and the final image size.
      </p>
      <pre><code className="language-dockerfile">{`# Bad: 4 layers, apt cache left behind
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN rm -rf /var/lib/apt/lists/*

# Good: 1 layer, cache cleaned in same layer
RUN apt-get update && \\
    apt-get install -y --no-install-recommends \\
      curl \\
      git \\
    && rm -rf /var/lib/apt/lists/*`}</code></pre>

      <h2>9. Use Health Checks</h2>
      <p>
        Health checks tell Docker (and orchestrators like Kubernetes) whether your application is
        actually ready to serve traffic, not just whether the process is running.
      </p>
      <pre><code className="language-dockerfile">{`# HTTP health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# For applications without curl
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD node -e "require('http').get('http://localhost:3000/health', \\
  (r) => { process.exit(r.statusCode === 200 ? 0 : 1) })"

# TCP check for databases
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \\
  CMD pg_isready -U postgres || exit 1`}</code></pre>

      <h2>10. Handle Signals Properly</h2>
      <p>
        Use <code>exec</code> form for <code>CMD</code> and <code>ENTRYPOINT</code> so your
        application receives Linux signals (SIGTERM, SIGINT) directly. Shell form wraps your
        command in <code>/bin/sh -c</code>, which does not forward signals.
      </p>
      <pre><code className="language-dockerfile">{`# Bad: Shell form — signals go to /bin/sh, not your app
CMD npm start
ENTRYPOINT node server.js

# Good: Exec form — signals go directly to your process
CMD ["node", "server.js"]
ENTRYPOINT ["node", "server.js"]

# If you need shell processing, use exec
ENTRYPOINT ["/bin/sh", "-c", "exec node server.js"]`}</code></pre>

      <h2>11. Use Environment Variables Wisely</h2>
      <p>
        Separate configuration from code using environment variables. Never hard-code secrets or
        configuration values in your Dockerfile. For managing environment variables in Docker
        Compose, see our{' '}
        <Link href={`/${lang}/blog/docker-compose-secrets-environment-variables-guide`}>Docker
        Compose Secrets Guide</Link>.
      </p>
      <pre><code className="language-dockerfile">{`# Set defaults for non-sensitive configuration
ENV NODE_ENV=production
ENV PORT=3000
ENV LOG_LEVEL=info

# Never put secrets in ENV or ARG
# Bad:
ENV DATABASE_PASSWORD=my-secret-password
ARG API_KEY=sk-abc123

# Good: Pass secrets at runtime
# docker run -e DATABASE_PASSWORD=xxx myapp
# Or use Docker secrets / mounted files
# docker run -v ./secrets:/run/secrets myapp`}</code></pre>

      <h2>12. Scan for Vulnerabilities</h2>
      <p>
        Regularly scan your images for known vulnerabilities using tools like Docker Scout,
        Trivy, Snyk, or Grype.
      </p>
      <pre><code className="language-bash">{`# Docker Scout (built into Docker Desktop)
docker scout cves myapp:latest
docker scout recommendations myapp:latest

# Trivy (open source)
trivy image myapp:latest
trivy image --severity HIGH,CRITICAL myapp:latest

# Snyk
snyk container test myapp:latest

# Add scanning to CI/CD
# .github/workflows/docker.yml
# - name: Scan image
#   uses: aquasecurity/trivy-action@master
#   with:
#     image-ref: myapp:latest
#     exit-code: '1'
#     severity: 'CRITICAL,HIGH'`}</code></pre>

      <h2>13. Label Your Images</h2>
      <p>
        Labels add metadata to your images, making them easier to manage, audit, and automate.
        Follow the OCI image spec for standard label names.
      </p>
      <pre><code className="language-dockerfile">{`# Use OCI standard labels
LABEL org.opencontainers.image.title="My Application"
LABEL org.opencontainers.image.description="Production API server"
LABEL org.opencontainers.image.version="1.2.3"
LABEL org.opencontainers.image.created="2026-02-22T00:00:00Z"
LABEL org.opencontainers.image.source="https://github.com/org/repo"
LABEL org.opencontainers.image.authors="team@example.com"

# Query labels
# docker inspect --format='{{ index .Config.Labels "org.opencontainers.image.version" }}' myapp`}</code></pre>

      <h2>14. Use BuildKit Features</h2>
      <p>
        Docker BuildKit provides advanced features like parallel builds, better caching, and
        secret mounts that improve build performance and security.
      </p>
      <pre><code className="language-dockerfile">{`# syntax=docker/dockerfile:1

# Enable BuildKit
# DOCKER_BUILDKIT=1 docker build .

# Mount secrets without leaking them into layers
RUN --mount=type=secret,id=npm_token \\
    NPM_TOKEN=$(cat /run/secrets/npm_token) \\
    npm ci

# Cache mounts for package managers
RUN --mount=type=cache,target=/root/.npm \\
    npm ci

# Bind mounts for build context
RUN --mount=type=bind,source=package.json,target=package.json \\
    --mount=type=cache,target=/root/.npm \\
    npm install`}</code></pre>

      <h2>15. Optimize for Production Node.js</h2>
      <pre><code className="language-dockerfile">{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20-alpine
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy only production artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN addgroup -S app && adduser -S app -G app
USER app

ENV NODE_ENV=production
EXPOSE 3000

# Use dumb-init as PID 1
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]`}</code></pre>

      <h2>16. Optimize for Production Python</h2>
      <pre><code className="language-dockerfile">{`FROM python:3.12-slim AS builder
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gcc libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim
WORKDIR /app

# Copy only installed packages
COPY --from=builder /install /usr/local
COPY . .

RUN useradd -m appuser
USER appuser

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000
CMD ["gunicorn", "app:create_app()", "-w", "4", "-b", "0.0.0.0:8000"]`}</code></pre>

      <h2>17. Use Read-Only File Systems</h2>
      <pre><code className="language-bash">{`# Run containers with read-only root filesystem
docker run --read-only \\
  --tmpfs /tmp \\
  --tmpfs /var/run \\
  myapp:latest

# In docker-compose.yml
services:
  app:
    image: myapp:latest
    read_only: true
    tmpfs:
      - /tmp
      - /var/run
    volumes:
      - app-data:/app/data  # Only writable mount`}</code></pre>

      <h2>18. Implement Graceful Shutdown</h2>
      <pre><code className="language-typescript">{`// server.ts — Handle SIGTERM for graceful shutdown
import express from 'express';

const app = express();
const server = app.listen(3000);

// Graceful shutdown handler
function shutdown(signal: string) {
  console.log(\`Received \${signal}. Starting graceful shutdown...\`);

  server.close(() => {
    console.log('HTTP server closed');
    // Close database connections, flush logs, etc.
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));`}</code></pre>

      <h2>19. Use Docker Compose for Development</h2>
      <pre><code className="language-yaml">{`# docker-compose.dev.yml
services:
  app:
    build:
      context: .
      target: development      # Multi-stage target
    volumes:
      - .:/app                 # Hot reload
      - /app/node_modules      # Preserve container modules
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "dev"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:`}</code></pre>

      <h2>20. Automate with CI/CD</h2>
      <pre><code className="language-yaml">{`# .github/workflows/docker.yml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`}</code></pre>

      <h2>Quick Reference Checklist</h2>
      <table>
        <thead>
          <tr>
            <th>Practice</th>
            <th>Priority</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Use minimal base images</td><td>High</td><td>Image size, security</td></tr>
          <tr><td>Multi-stage builds</td><td>High</td><td>Image size</td></tr>
          <tr><td>Layer cache optimization</td><td>High</td><td>Build speed</td></tr>
          <tr><td>.dockerignore</td><td>High</td><td>Build speed, security</td></tr>
          <tr><td>Pin versions</td><td>High</td><td>Reproducibility</td></tr>
          <tr><td>Non-root user</td><td>High</td><td>Security</td></tr>
          <tr><td>COPY over ADD</td><td>Medium</td><td>Predictability</td></tr>
          <tr><td>Minimize layers</td><td>Medium</td><td>Image size</td></tr>
          <tr><td>Health checks</td><td>High</td><td>Reliability</td></tr>
          <tr><td>Signal handling</td><td>High</td><td>Graceful shutdown</td></tr>
          <tr><td>Env vars for config</td><td>High</td><td>Security, flexibility</td></tr>
          <tr><td>Vulnerability scanning</td><td>High</td><td>Security</td></tr>
          <tr><td>Image labels</td><td>Low</td><td>Maintainability</td></tr>
          <tr><td>BuildKit features</td><td>Medium</td><td>Build speed, security</td></tr>
          <tr><td>Read-only filesystem</td><td>Medium</td><td>Security</td></tr>
          <tr><td>Graceful shutdown</td><td>High</td><td>Reliability</td></tr>
          <tr><td>Docker Compose for dev</td><td>Medium</td><td>Developer experience</td></tr>
          <tr><td>CI/CD automation</td><td>High</td><td>Consistency</td></tr>
        </tbody>
      </table>

      <p>
        Following these 20 Docker best practices will dramatically improve the security, performance,
        and reliability of your containerized applications. For more Docker content, explore our{' '}
        <Link href={`/${lang}/blog/docker-compose-cheat-sheet`}>Docker Compose Cheat Sheet</Link>,{' '}
        <Link href={`/${lang}/blog/docker-volumes-bind-mounts-guide`}>Docker Volumes Guide</Link>,
        and use our{' '}
        <Link href={`/${lang}/tools/docker-compose-generator`}>Docker Compose Generator</Link> to
        scaffold your configuration files.
      </p>
    </>
  );
}
