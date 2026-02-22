'use client';

import Link from 'next/link';

export default function DockerSecurityBestPractices({ lang }: { lang: string }) {
  return (
    <>
      <h2>Docker Container Security: A Comprehensive Hardening Guide</h2>
      <p>
        Docker containers are the backbone of modern deployment pipelines, but their convenience can create a false sense of security. A misconfigured container can expose your host system, leak secrets, or provide an attacker with a foothold into your infrastructure. This guide covers Docker security best practices from image building to runtime configuration, covering the most critical areas you need to address to harden your containers for production.
      </p>
      <p>
        Whether you are running containers on a single server, Kubernetes, or a managed service like AWS ECS, these practices apply universally and will significantly reduce your attack surface.
      </p>

      <h2>Image Security: Building Secure Foundations</h2>
      <p>
        Security starts with the container image. A vulnerable base image, unnecessary packages, or leaked secrets in image layers can compromise your entire deployment before a single container starts running.
      </p>

      <h3>Use Minimal Base Images</h3>
      <p>
        Every package in your image is a potential attack vector. Minimize your attack surface by choosing the smallest base image that meets your requirements.
      </p>
      <pre><code className="language-dockerfile">{`# BAD: Full Ubuntu image (~77MB, hundreds of packages)
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y nodejs npm

# BETTER: Slim variant (~52MB, fewer packages)
FROM node:22-slim

# BEST: Alpine-based (~50MB, musl libc, minimal packages)
FROM node:22-alpine

# MOST SECURE: Distroless (no shell, no package manager)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["dist/server.js"]`}</code></pre>

      <table>
        <thead>
          <tr><th>Base Image</th><th>Size</th><th>CVEs (typical)</th><th>Shell Access</th><th>Use Case</th></tr>
        </thead>
        <tbody>
          <tr><td>ubuntu:24.04</td><td>~77MB</td><td>20-50</td><td>Yes</td><td>Development only</td></tr>
          <tr><td>node:22-slim</td><td>~52MB</td><td>10-30</td><td>Yes</td><td>General purpose</td></tr>
          <tr><td>node:22-alpine</td><td>~50MB</td><td>5-15</td><td>Yes</td><td>Production</td></tr>
          <tr><td>distroless/nodejs22</td><td>~40MB</td><td>0-5</td><td>No</td><td>High security</td></tr>
          <tr><td>scratch</td><td>~0MB</td><td>0</td><td>No</td><td>Static binaries (Go, Rust)</td></tr>
        </tbody>
      </table>

      <h3>Multi-Stage Builds</h3>
      <p>
        Multi-stage builds are essential for security. They ensure build tools, source code, and development dependencies never reach your production image.
      </p>
      <pre><code className="language-dockerfile">{`# Stage 1: Dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Stage 2: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Remove any .env files that might have been copied
RUN rm -f .env .env.local .env.production
RUN npm run build
# Prune dev dependencies
RUN npm prune --production

# Stage 3: Production (minimal runtime)
FROM node:22-alpine AS runner
WORKDIR /app

# Security: Create non-root user
RUN addgroup --system --gid 1001 appgroup && \\
    adduser --system --uid 1001 --ingroup appgroup appuser

# Security: Remove unnecessary tools
RUN apk --no-cache add dumb-init && \\
    rm -rf /var/cache/apk/* /tmp/*

# Copy only production artifacts
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Security: Run as non-root user
USER appuser

# Security: Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]`}</code></pre>

      <h2>Never Run as Root</h2>
      <p>
        Running containers as root is the single most common Docker security mistake. If an attacker exploits a vulnerability in your application, running as root gives them full control over the container -- and potentially the host system if other misconfigurations exist.
      </p>
      <pre><code className="language-dockerfile">{`# Create a non-root user in your Dockerfile
FROM node:22-alpine

# Create system user and group
RUN addgroup --system --gid 1001 appgroup && \\
    adduser --system --uid 1001 --ingroup appgroup appuser

# Set ownership of application directory
WORKDIR /app
COPY --chown=appuser:appgroup . .
RUN npm ci --production

# Switch to non-root user BEFORE CMD
USER appuser

# Verify: This should print "appuser" not "root"
# docker exec <container> whoami

CMD ["node", "server.js"]`}</code></pre>

      <pre><code className="language-yaml">{`# docker-compose.yml - Enforce non-root
services:
  api:
    build: .
    user: "1001:1001"
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=64m`}</code></pre>

      <h2>Secrets Management</h2>
      <p>
        Container secrets (API keys, database passwords, certificates) are a frequent source of breaches. Never bake secrets into images, pass them as build arguments, or store them in environment variables visible through <code>docker inspect</code>.
      </p>

      <h3>What NOT to Do</h3>
      <pre><code className="language-dockerfile">{`# NEVER: Hardcode secrets in Dockerfile
ENV DATABASE_URL=postgres://admin:password123@db:5432/myapp
ENV API_KEY=sk-live-abc123xyz

# NEVER: Use build args for secrets (they persist in image layers)
ARG DB_PASSWORD
ENV DATABASE_URL=postgres://admin:\${DB_PASSWORD}@db:5432/myapp

# NEVER: Copy secret files into the image
COPY .env /app/.env
COPY credentials.json /app/credentials.json`}</code></pre>

      <h3>Proper Secrets Management</h3>
      <pre><code className="language-yaml">{`# Docker Compose with secrets
services:
  api:
    build: .
    secrets:
      - db_password
      - api_key
    environment:
      # Reference secrets from files, not values
      DATABASE_URL_FILE: /run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt  # For development
    # external: true                  # For production (Docker Swarm)
  api_key:
    file: ./secrets/api_key.txt`}</code></pre>

      <pre><code className="language-typescript">{`// Read secrets from files (Docker secrets pattern)
import { readFileSync, existsSync } from 'fs';

function getSecret(name: string): string {
  // Docker secrets are mounted as files
  const secretPath = \`/run/secrets/\${name}\`;
  if (existsSync(secretPath)) {
    return readFileSync(secretPath, 'utf-8').trim();
  }

  // Fallback to environment variable for local development
  const envValue = process.env[name.toUpperCase()];
  if (envValue) {
    return envValue;
  }

  throw new Error(\`Secret '\${name}' not found\`);
}

// Usage
const dbPassword = getSecret('db_password');
const apiKey = getSecret('api_key');`}</code></pre>

      <h2>Network Security</h2>
      <p>
        Docker networking defaults can expose containers to unnecessary communication. Apply the principle of least privilege to your network configuration.
      </p>

      <h3>Isolate Container Networks</h3>
      <pre><code className="language-yaml">{`# docker-compose.yml - Network isolation
services:
  frontend:
    build: ./frontend
    networks:
      - frontend-net
    ports:
      - "443:3000"  # Only frontend is exposed

  api:
    build: ./api
    networks:
      - frontend-net   # Can communicate with frontend
      - backend-net    # Can communicate with database
    # No ports exposed to host!

  database:
    image: postgres:16-alpine
    networks:
      - backend-net    # Only accessible from backend network
    # No ports exposed to host!
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    networks:
      - backend-net
    command: redis-server --requirepass \${REDIS_PASSWORD}

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    internal: true   # No external access at all

volumes:
  pgdata:`}</code></pre>

      <h3>Restrict Container Capabilities</h3>
      <pre><code className="language-yaml">{`# Drop ALL capabilities, add back only what's needed
services:
  api:
    build: .
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE  # Only if binding to ports < 1024
    security_opt:
      - no-new-privileges:true
    # Prevent container from gaining additional privileges

  # For even stricter security, use read-only filesystem
  worker:
    build: .
    cap_drop:
      - ALL
    read_only: true
    tmpfs:
      - /tmp:noexec,nosuid,size=100m
      - /var/run:noexec,nosuid,size=10m`}</code></pre>

      <h2>Image Scanning and Vulnerability Management</h2>
      <p>
        Scanning images for known vulnerabilities should be part of your CI/CD pipeline. Multiple tools are available, and you should use at least one.
      </p>

      <h3>Trivy Scanner (Recommended)</h3>
      <pre><code className="language-bash">{`# Scan a local image
trivy image myapp:latest

# Scan with severity filter
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan and fail CI if critical vulnerabilities found
trivy image --exit-code 1 --severity CRITICAL myapp:latest

# Scan a Dockerfile for misconfigurations
trivy config Dockerfile

# Scan filesystem for secrets
trivy fs --scanners secret .

# Generate SBOM (Software Bill of Materials)
trivy image --format spdx-json --output sbom.json myapp:latest`}</code></pre>

      <h3>CI/CD Integration</h3>
      <pre><code className="language-yaml">{`# .github/workflows/docker-security.yml
name: Docker Security Scan

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build image
        run: docker build -t myapp:scan .

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:scan'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      - name: Upload scan results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run Dockle (Dockerfile best practices)
        uses: erzz/dockle-action@v1
        with:
          image: 'myapp:scan'
          exit-code: '1'
          failure-threshold: 'WARN'`}</code></pre>

      <h2>Runtime Security</h2>
      <p>
        Even with a secure image, runtime configuration can introduce vulnerabilities. These settings control what a container can do once it is running.
      </p>

      <h3>Resource Limits</h3>
      <pre><code className="language-yaml">{`# docker-compose.yml - Resource limits prevent DoS
services:
  api:
    build: .
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 512M
          pids: 100        # Prevent fork bombs
        reservations:
          cpus: '0.5'
          memory: 256M

    # Restart policy
    restart: unless-stopped

    # Health check
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

    # Logging limits (prevent disk exhaustion)
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"`}</code></pre>

      <h3>Seccomp and AppArmor Profiles</h3>
      <pre><code className="language-json">{`{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    {
      "names": [
        "read", "write", "open", "close", "stat", "fstat",
        "mmap", "mprotect", "munmap", "brk", "ioctl",
        "access", "pipe", "select", "sched_yield",
        "clone", "execve", "exit", "wait4", "kill",
        "fcntl", "flock", "fsync", "fdatasync",
        "getpid", "getuid", "getgid", "geteuid", "getegid",
        "socket", "connect", "accept", "sendto", "recvfrom",
        "bind", "listen", "setsockopt", "getsockopt",
        "epoll_create", "epoll_ctl", "epoll_wait",
        "futex", "nanosleep", "clock_gettime"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}`}</code></pre>
      <pre><code className="language-bash">{`# Run with custom seccomp profile
docker run --security-opt seccomp=./seccomp-profile.json myapp:latest

# Run with no-new-privileges (prevents privilege escalation)
docker run --security-opt no-new-privileges myapp:latest`}</code></pre>

      <h2>Docker Content Trust and Image Signing</h2>
      <p>
        Image signing ensures that the images you deploy are exactly what you built, with no tampering in transit. Docker Content Trust (DCT) uses Notary to sign and verify images.
      </p>
      <pre><code className="language-bash">{`# Enable Docker Content Trust
export DOCKER_CONTENT_TRUST=1

# Push a signed image
docker push myregistry/myapp:latest
# This will prompt for signing keys on first use

# Pull only signed images
docker pull myregistry/myapp:latest
# Fails if the image is not signed

# Verify image signatures
docker trust inspect --pretty myregistry/myapp:latest

# Using cosign (modern alternative, OCI-native)
# Sign an image
cosign sign --key cosign.key myregistry/myapp@sha256:abc123

# Verify an image
cosign verify --key cosign.pub myregistry/myapp@sha256:abc123`}</code></pre>

      <h2>Dockerfile Security Checklist</h2>
      <p>
        Use this checklist when reviewing Dockerfiles for security issues. Every item addresses a common misconfiguration that has led to real-world breaches.
      </p>
      <pre><code className="language-text">{`Docker Security Checklist:

IMAGE BUILDING
[ ] Using minimal base image (alpine, slim, or distroless)
[ ] Multi-stage build separates build and runtime
[ ] Base image pinned to specific digest (not just tag)
[ ] No secrets in Dockerfile or build args
[ ] .dockerignore excludes .env, .git, node_modules, secrets
[ ] Image scanned for CVEs in CI/CD pipeline
[ ] COPY used instead of ADD (ADD has URL/tar extraction risks)

USER & PERMISSIONS
[ ] Container runs as non-root user (USER directive)
[ ] File permissions are restrictive (no world-writable files)
[ ] no-new-privileges security option enabled

RUNTIME
[ ] All capabilities dropped, only required ones added back
[ ] Read-only filesystem where possible
[ ] Resource limits set (CPU, memory, PIDs)
[ ] Health check configured
[ ] Logging limits configured

NETWORK
[ ] Only necessary ports exposed
[ ] Internal networks for backend services
[ ] No --privileged flag used
[ ] Host networking avoided (--network=host)

SECRETS
[ ] Secrets injected at runtime (not build time)
[ ] Docker secrets or vault used for sensitive data
[ ] No secrets in environment variables visible via inspect

MONITORING
[ ] Container logs collected and monitored
[ ] Image vulnerabilities tracked over time
[ ] Runtime anomaly detection in place`}</code></pre>

      <h2>Monitoring and Incident Response</h2>
      <p>
        Security does not end at deployment. Continuous monitoring of your running containers is essential for detecting breaches, configuration drift, and anomalous behavior. Implement centralized logging with tools like Fluentd or the ELK stack, and set up alerts for suspicious activities such as unexpected network connections, file system modifications in read-only containers, or processes spawning shells.
      </p>
      <p>
        Runtime security tools like Falco can monitor system calls inside containers and alert on policy violations in real time. For example, Falco can detect when a container opens a shell, reads sensitive files like <code>/etc/shadow</code>, or makes outbound connections to unexpected IP addresses. Integrating these alerts into your incident response workflow ensures that even if a container is compromised, the breach is detected quickly and contained before it spreads to other parts of your infrastructure.
      </p>
      <p>
        Regularly audit your container configurations with tools like Docker Bench for Security, which runs automated checks based on the CIS Docker Benchmark. Schedule these audits as part of your monthly security review process to catch configuration drift and newly discovered best practices.
      </p>

      <h2>Common Docker Security Anti-Patterns</h2>
      <ul>
        <li><strong>Running as root</strong>: The default and the most dangerous. Always create and use a non-root user.</li>
        <li><strong>Using latest tag</strong>: Tags are mutable. Pin to a specific SHA256 digest for reproducibility: <code>FROM node@sha256:abc123...</code></li>
        <li><strong>Exposing Docker socket</strong>: Mounting <code>/var/run/docker.sock</code> gives the container full control over the host Docker daemon.</li>
        <li><strong>Using --privileged</strong>: This disables all security features. There is almost never a valid reason to use it in production.</li>
        <li><strong>Storing secrets in layers</strong>: Even if you delete a secret in a later layer, it exists in the image history. Use multi-stage builds or BuildKit secrets.</li>
        <li><strong>Ignoring image updates</strong>: Base images receive security patches regularly. Rebuild and redeploy images at least monthly.</li>
        <li><strong>No resource limits</strong>: A container without limits can consume all host resources, enabling denial-of-service attacks.</li>
        <li><strong>Host network mode</strong>: Using <code>--network=host</code> removes network isolation entirely.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Docker security is not a single configuration change but a set of practices applied across the entire container lifecycle -- from image building to runtime monitoring. The most impactful changes you can make are: using minimal base images, running as non-root, managing secrets properly, scanning for vulnerabilities, and applying the principle of least privilege to capabilities and networking.
      </p>
      <p>
        Start by auditing your existing Dockerfiles against the checklist above, integrate image scanning into your CI/CD pipeline, and gradually adopt more advanced protections like seccomp profiles and image signing. Every layer of security you add makes exploitation significantly harder for attackers.
      </p>
      <p>
        Use our <Link href={`/${lang}/tools/hash-generator`}>Hash Generator</Link> for verifying image digests, or check out the <Link href={`/${lang}/blog/git-branching-strategies`}>Git Branching Strategies guide</Link> for setting up secure development workflows.
      </p>
    </>
  );
}
