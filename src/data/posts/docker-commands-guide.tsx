'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Docker Commands Complete Guide: Build, Run, Debug, and Deploy Containers — 2024',
    description: 'Master Docker from the command line. Complete guide covering core commands, Dockerfile, multi-stage builds, volumes, networking, Docker Compose, debugging, registry publishing, security hardening, and production patterns.',
  },
  zh: {
    title: 'Docker 命令完整指南：构建、运行、调试与部署容器 — 2024',
    description: '从命令行掌握 Docker。含核心命令、Dockerfile、多阶段构建、卷、网络、Docker Compose、调试、镜像仓库发布、安全加固和生产模式的完整指南。',
  },
};

export default function DockerCommandsGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between docker run and docker start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'docker run creates a new container from an image and starts it immediately. It is equivalent to docker create followed by docker start. docker start restarts an existing stopped container without creating a new one — it retains the container\'s filesystem state and configuration from when it was created. Use docker run when you want a fresh container from an image. Use docker start when you want to resume a previously stopped container that may have data you want to preserve.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between CMD and ENTRYPOINT in a Dockerfile?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ENTRYPOINT defines the main executable of the container — it is not easily overridden at runtime. CMD provides default arguments to ENTRYPOINT, or defines the default command if ENTRYPOINT is not set. When both are set, CMD arguments are passed to ENTRYPOINT. CMD can be overridden by appending a command to docker run: docker run myimage custom-command. The best practice for tools is: ENTRYPOINT ["/app/server"] CMD ["--port", "8080"]. The user can override just the port with docker run myimage --port 9090 while keeping the binary fixed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a multi-stage Docker build and why use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multi-stage builds use multiple FROM statements in a single Dockerfile. Early stages (builder stages) compile code and install dependencies. The final stage copies only the compiled output from builder stages, discarding all build tools. This dramatically reduces final image size: a Go application might compile in a 800 MB golang:1.22 builder image but produce a final image of only 10 MB using scratch or distroless. Smaller images mean faster pulls, reduced attack surface, and lower storage costs. Use COPY --from=builder /app/binary /app/binary to pull artifacts from earlier stages.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a Docker volume and a bind mount?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A named volume (-v myvolume:/data) is managed entirely by Docker and stored in /var/lib/docker/volumes/. Docker controls the lifecycle and it is portable across hosts. A bind mount (-v /host/path:/container/path) maps a specific host directory into the container. Use bind mounts for development (live code reloading) and named volumes for production data persistence (databases). Named volumes have better performance on macOS/Windows (no filesystem translation overhead) and are the recommended approach for stateful containers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Docker networks work and when should I create a custom network?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docker has three built-in network drivers: bridge (default for single-host containers), host (container shares the host network stack), and overlay (multi-host for Docker Swarm). Containers on the same custom bridge network can resolve each other by container name using Docker\'s embedded DNS. Containers on the default bridge can only communicate by IP address. Always create a custom network for multi-container applications: docker network create myapp-net. In Docker Compose, a default network is automatically created for all services in the compose file.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run a shell inside a running Docker container?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use docker exec -it CONTAINER_ID bash (or sh for Alpine-based images that don\'t have bash). The -i flag keeps stdin open (interactive) and -t allocates a pseudo-TTY. To run a one-off command without an interactive shell: docker exec CONTAINER_ID cat /etc/hosts. If the container has already stopped, start it first: docker start CONTAINER_ID, then exec into it. For debugging minimal images without any shell, use docker run --rm -it --entrypoint sh IMAGE to override the entrypoint.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I publish a Docker image to Docker Hub?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'First, tag the image with your Docker Hub username: docker tag local-image:latest username/repo:tag. Then push: docker push username/repo:tag. Before pushing, authenticate with: docker login (or docker login --username USER for scripted environments using DOCKER_TOKEN). For automated CI/CD, use: echo $DOCKER_TOKEN | docker login --username $DOCKER_USER --password-stdin. For multi-architecture images (AMD64 + ARM64), use docker buildx build --platform linux/amd64,linux/arm64 --push -t username/repo:latest .',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I set resource limits for Docker containers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use --memory to limit RAM and --cpus to limit CPU: docker run --memory=512m --cpus=1.5 myimage. Without limits, a container can consume all host resources, causing other containers or the host OS to run out of memory. In Docker Compose, set limits under deploy.resources: limits: cpus: "0.5" memory: 256M. Use docker stats to monitor actual resource usage per container. For Kubernetes, set resources.requests and resources.limits in the pod spec — requests affect scheduling, limits trigger OOM kills.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/docker-commands-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Docker</strong> packages your application and dependencies into portable containers. Master{' '}
          <code>docker run/build/exec/logs</code> for daily use, write efficient <strong>Dockerfiles</strong> with
          multi-stage builds to minimize image size, use <strong>Docker Compose</strong> for multi-container dev
          environments, and apply security hardening (non-root user, read-only filesystem, secret management) before
          going to production. Use our{' '}
          <Link href={`/${lang}/tools/docker-compose`} style={{ color: '#0284c7' }}>Docker Compose generator</Link>{' '}
          to scaffold compose files instantly.
        </p>
      </div>

      {/* Section 1: Core Docker Commands */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Core Docker Commands — pull, run, stop, rm, ps and Key Flags
      </h2>
      <p>
        These are the commands you will use every single day. Understanding their flags is the foundation of working
        productively with Docker.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Pull an image from a registry (Docker Hub by default)
docker pull nginx:latest
docker pull node:20-alpine          # alpine = minimal base image

# Run a container
docker run nginx                    # foreground, blocking
docker run -d nginx                 # -d = detached (background)
docker run -d -p 8080:80 nginx      # -p HOST:CONTAINER port mapping
docker run -d -p 8080:80 --name web nginx  # --name for easy reference

# Common flags:
# -d          run in background (detached)
# -p 8080:80  map host port 8080 → container port 80
# -v ./data:/data  mount host directory into container
# -e KEY=VAL  set environment variable
# --name      assign a name
# --rm        auto-remove container when it exits
# --network   connect to a specific network
# -it         interactive + TTY (for shells)

# Container lifecycle
docker ps                           # list running containers
docker ps -a                        # list all containers (including stopped)
docker stop web                     # graceful stop (SIGTERM → SIGKILL after 10s)
docker kill web                     # immediate stop (SIGKILL)
docker start web                    # restart stopped container
docker restart web                  # stop + start
docker rm web                       # remove stopped container
docker rm -f web                    # force remove running container

# Images
docker images                       # list local images
docker rmi nginx:latest             # remove image
docker image prune                  # remove all dangling images
docker system prune -a              # remove everything unused (images, containers, volumes, networks)

# Quick one-liners
docker run --rm -it ubuntu:22.04 bash    # throwaway interactive container
docker run --rm -v $(pwd):/work -w /work node:20 npm test  # run tests in container`}</code></pre>
      <p>
        Use <code>--rm</code> for short-lived containers (running a command, testing, building) to avoid accumulating
        stopped containers. Use named containers (<code>--name</code>) for services you start and stop repeatedly.
      </p>

      {/* Section 2: Docker Images & Dockerfile */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Docker Images — Dockerfile Instructions Explained
      </h2>
      <p>
        A Dockerfile is a recipe for building an image. Each instruction creates a new layer. Layers are cached, so
        order matters: put rarely-changing instructions early (base image, system deps) and frequently-changing
        instructions late (application code).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# syntax=docker/dockerfile:1

# FROM — base image (always first)
FROM node:20-alpine AS base

# LABEL — metadata (optional but good practice)
LABEL org.opencontainers.image.source="https://github.com/org/repo"

# ENV — environment variables (available at build and runtime)
ENV NODE_ENV=production
ENV PORT=3000

# ARG — build-time variables only (not available at runtime)
ARG BUILD_DATE
ARG GIT_COMMIT

# WORKDIR — set working directory (creates if not exists)
WORKDIR /app

# COPY — copy files from build context into image
COPY package.json package-lock.json ./   # copy dependency files first
RUN npm ci --only=production             # install (cached until package.json changes)

COPY . .                                 # copy source code (invalidates cache on any change)

# RUN — execute commands during build
RUN npm run build && \
    rm -rf src node_modules/.cache       # chain commands to reduce layers

# EXPOSE — document which port the app uses (informational, doesn't publish)
EXPOSE 3000

# USER — switch to non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# VOLUME — declare mount points for external volumes
VOLUME ["/app/data"]

# HEALTHCHECK — Docker health check command
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

# ENTRYPOINT — main executable (hard to override)
ENTRYPOINT ["node"]

# CMD — default arguments to ENTRYPOINT (easy to override)
CMD ["dist/server.js"]`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Build the image
docker build -t myapp:latest .
docker build -t myapp:1.0.0 -f Dockerfile.prod .   # custom Dockerfile
docker build --build-arg BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ) -t myapp .

# Tag for registry
docker tag myapp:latest registry.example.com/org/myapp:1.0.0

# Push
docker push registry.example.com/org/myapp:1.0.0`}</code></pre>

      {/* Section 3: Multi-stage Builds */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Multi-stage Builds — Minimize Image Size, Builder Pattern, .dockerignore
      </h2>
      <p>
        Multi-stage builds are the single most impactful optimization for Docker images. Compile or bundle your code in
        a fat builder image, then copy only the runtime artifacts into a minimal final image.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Node.js Multi-stage Example
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Stage 1: Install all dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                          # install dev + prod deps
COPY . .
RUN npm run build                   # compile TypeScript, bundle assets

# Stage 2: Production runtime (minimal)
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy only what's needed for runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

RUN adduser -D appuser && chown -R appuser /app
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]

# Result: builder = ~400 MB, runner = ~80 MB`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Go Multi-stage with scratch (10 MB final image)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server ./cmd/server

# Scratch = zero-byte base image (no OS, no shell)
FROM scratch AS runner
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]

# Alternative: use distroless for a shell-less but slightly larger image
# FROM gcr.io/distroless/base-debian12 AS runner`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        .dockerignore — Exclude Files from Build Context
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# .dockerignore — add to every Docker project
node_modules
.git
.gitignore
*.md
.env
.env.*
dist
.next
coverage
*.test.ts
*.spec.ts
Dockerfile*
docker-compose*
.dockerignore`}</code></pre>
      <p>
        A missing <code>.dockerignore</code> can accidentally send hundreds of megabytes (like <code>node_modules</code>{' '}
        or <code>.git</code>) to the Docker daemon as build context, massively slowing every build.
      </p>

      {/* Section 4: Volumes & Bind Mounts */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Volumes and Bind Mounts — Persistent Storage, Backup, Restore
      </h2>
      <p>
        Container filesystems are ephemeral — all data is lost when a container is removed. Use volumes or bind mounts
        to persist data outside the container lifecycle.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Named volume (managed by Docker, stored in /var/lib/docker/volumes/)
docker volume create pgdata
docker run -d --name postgres \
  -v pgdata:/var/lib/postgresql/data \  # named volume
  -e POSTGRES_PASSWORD=secret \
  postgres:16

# Bind mount (maps host path into container)
docker run -d --name app \
  -v $(pwd)/src:/app/src \    # bind mount — for dev with live reload
  -v $(pwd)/.env:/app/.env \  # single file bind mount
  node:20 npm run dev

# Read-only bind mount (security: prevent container from modifying)
docker run -d -v $(pwd)/config:/app/config:ro nginx

# tmpfs mount (in-memory, not persisted — for secrets, temp data)
docker run -d --tmpfs /app/tmp:rw,size=100m myapp

# Volume management commands
docker volume ls                          # list volumes
docker volume inspect pgdata              # details and mount point
docker volume rm pgdata                   # remove volume (data loss!)
docker volume prune                       # remove unused volumes

# Backup a volume
docker run --rm \
  -v pgdata:/source:ro \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/pgdata-$(date +%Y%m%d).tar.gz -C /source .

# Restore from backup
docker run --rm \
  -v pgdata:/dest \
  -v $(pwd)/backups:/backup:ro \
  alpine tar xzf /backup/pgdata-20240101.tar.gz -C /dest`}</code></pre>

      {/* Section 5: Networking */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Docker Networking — Bridge, Host, Overlay, Container DNS
      </h2>
      <p>
        Docker networking controls how containers communicate with each other and the outside world. Understanding the
        network drivers and DNS resolution prevents connectivity bugs in multi-container applications.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# List networks
docker network ls
# NETWORK ID   NAME      DRIVER    SCOPE
# bridge0abc   bridge    bridge    local   ← default network
# host0abc     host      host      local
# none0abc     none      null      local

# Create a custom bridge network
docker network create --driver bridge myapp-net

# Run containers on the same network — they resolve each other by name
docker run -d --name postgres --network myapp-net postgres:16
docker run -d --name api     --network myapp-net myapi:latest
# The api container can reach postgres at: postgres:5432

# Connect a running container to an additional network
docker network connect myapp-net existing-container

# Disconnect
docker network disconnect myapp-net container-name

# Inspect network (see all connected containers + IP addresses)
docker network inspect myapp-net

# Remove unused networks
docker network prune

# Host network mode — container shares host's network stack (Linux only)
docker run -d --network host nginx
# nginx binds directly to host port 80, no -p mapping needed

# Port publishing options
docker run -d -p 8080:80 nginx        # host 8080 → container 80
docker run -d -p 127.0.0.1:8080:80 nginx  # bind only to localhost
docker run -d -p 80 nginx             # random host port → 80 (see with docker port)
docker port container_name            # show all port mappings`}</code></pre>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Driver</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Container DNS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>bridge</code> (default)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Single-host multi-container apps</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>By name on custom bridge only</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>host</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Performance-critical, Linux only</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Same as host</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>overlay</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Docker Swarm multi-host</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>By service name across hosts</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>none</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Isolated, no network access</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>None</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 6: Docker Compose */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Docker Compose — Services, Networks, Volumes, Healthchecks, Override Files
      </h2>
      <p>
        Docker Compose defines multi-container applications in a single <code>docker-compose.yml</code> file. It handles
        service startup order, shared networks, named volumes, and environment variable management automatically.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# docker-compose.yml
version: "3.9"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        BUILD_ENV: production
    image: myapp/api:latest
    container_name: myapp-api
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://app:secret@postgres:5432/appdb
    env_file:
      - .env.production                  # load from .env file
    depends_on:
      postgres:
        condition: service_healthy       # wait for postgres healthcheck
      redis:
        condition: service_started
    networks:
      - backend
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 10s

  postgres:
    image: postgres:16-alpine
    container_name: myapp-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: myapp-redis
    restart: unless-stopped
    command: redis-server --requirepass secret --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redisdata:/data
    networks:
      - backend

  nginx:
    image: nginx:1.25-alpine
    container_name: myapp-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
    networks:
      - backend

volumes:
  pgdata:
  redisdata:

networks:
  backend:
    driver: bridge`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Common Compose commands
docker compose up -d                  # start all services in background
docker compose up -d api              # start only the api service
docker compose down                   # stop and remove containers + networks
docker compose down -v                # also remove volumes (data loss!)
docker compose ps                     # show service status
docker compose logs -f api            # follow logs for api service
docker compose exec api bash          # shell into running api container
docker compose build api              # rebuild only the api image
docker compose pull                   # pull latest images
docker compose restart api            # restart a service
docker compose scale api=3            # run 3 replicas (v2 syntax)

# Override files for dev vs prod:
# docker-compose.yml        — base config
# docker-compose.override.yml  — auto-merged for local dev
# docker-compose.prod.yml   — production overrides

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`}</code></pre>

      {/* Section 7: Docker Exec & Debugging */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Docker Exec and Debugging — logs, inspect, stats, top, cp
      </h2>
      <p>
        Knowing how to inspect and debug running containers is essential for diagnosing production issues. These commands
        let you look inside containers without modifying them.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Shell access
docker exec -it CONTAINER bash          # bash shell (use sh for Alpine)
docker exec -it CONTAINER sh            # sh shell (always available)
docker exec CONTAINER cat /etc/hosts    # run single command

# Logs
docker logs CONTAINER                   # all logs
docker logs -f CONTAINER                # follow (stream) logs
docker logs --tail 100 CONTAINER        # last 100 lines
docker logs --since 10m CONTAINER       # logs from last 10 minutes
docker logs --since 2024-01-01T00:00:00 CONTAINER

# Inspect — low-level container/image info (JSON)
docker inspect CONTAINER                # everything about a container
docker inspect --format '{{.State.Status}}' CONTAINER   # specific field
docker inspect --format '{{.NetworkSettings.IPAddress}}' CONTAINER
docker inspect --format '{{range .Mounts}}{{.Source}} → {{.Destination}}{{println}}{{end}}' CONTAINER

# Resource usage
docker stats                            # live CPU/RAM/network/disk for all containers
docker stats CONTAINER --no-stream     # single snapshot (no streaming)
docker top CONTAINER                    # processes running inside container (like ps aux)

# Copy files between host and container
docker cp CONTAINER:/app/logs/error.log ./error.log   # container → host
docker cp ./config.json CONTAINER:/app/config.json    # host → container

# Diff — show filesystem changes since container start
docker diff CONTAINER
# A = added, C = changed, D = deleted

# Image history — see each layer size
docker history myimage:latest
docker history --no-trunc myimage:latest   # full commands

# Dive tool for interactive layer exploration (if installed)
# dive myimage:latest`}</code></pre>
      <p>
        For containers that crash immediately on start (exit code non-zero), use{' '}
        <code>docker run --entrypoint sh IMAGE -c &quot;cat /app/crash.log&quot;</code> or override the entrypoint to
        keep the container alive: <code>docker run -it --entrypoint sh IMAGE</code>.
      </p>

      {/* Section 8: Registry & Publishing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Registry and Publishing — Docker Hub, GitHub GHCR, Multi-arch Buildx
      </h2>
      <p>
        Docker registries store and distribute images. Docker Hub is the default public registry. GitHub Container
        Registry (GHCR) is popular for open-source projects integrated with GitHub Actions.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Authenticate
docker login                                   # Docker Hub (interactive)
echo $TOKEN | docker login --username USER --password-stdin  # CI/CD

# Docker Hub tag convention: USERNAME/REPOSITORY:TAG
docker tag myapp:latest johndoe/myapp:1.0.0
docker tag myapp:latest johndoe/myapp:latest
docker push johndoe/myapp:1.0.0
docker push johndoe/myapp:latest

# GitHub Container Registry (GHCR)
echo $GITHUB_TOKEN | docker login ghcr.io --username $GITHUB_ACTOR --password-stdin
docker tag myapp:latest ghcr.io/org/myapp:1.0.0
docker push ghcr.io/org/myapp:1.0.0

# Private registry
docker login registry.example.com
docker tag myapp:latest registry.example.com/team/myapp:1.0.0
docker push registry.example.com/team/myapp:1.0.0

# Multi-architecture builds with Docker Buildx (AMD64 + ARM64)
docker buildx create --use --name multiarch
docker buildx inspect --bootstrap

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --push \
  -t johndoe/myapp:1.0.0 \
  -t johndoe/myapp:latest \
  .

# GitHub Actions workflow for auto-publish on push
# (See: .github/workflows/docker-publish.yml)
# - uses: docker/setup-qemu-action@v3          # QEMU for ARM emulation
# - uses: docker/setup-buildx-action@v3
# - uses: docker/login-action@v3
# - uses: docker/build-push-action@v5
#   with:
#     platforms: linux/amd64,linux/arm64
#     push: true
#     tags: ghcr.io/$\{{ github.repository }}:latest`}</code></pre>

      {/* Section 9: Security */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Docker Security — Non-root USER, Read-only Filesystem, Secrets, Image Scanning
      </h2>
      <p>
        Containers running as root with writable filesystems are a significant security risk. Apply these hardening
        practices before deploying to production.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Non-root User
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# In Dockerfile: create and switch to non-root user
FROM node:20-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node . .
USER node                             # switch to built-in 'node' user (uid=1000)

# Or create a custom user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Verify: container should NOT be running as root
docker exec CONTAINER id
# uid=1000(node) gid=1000(node)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Read-only Filesystem and Capability Dropping
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Read-only root filesystem (container can't write to image layers)
docker run -d \
  --read-only \
  --tmpfs /tmp \           # writable tmpfs for /tmp
  --tmpfs /app/cache \     # writable tmpfs for cache
  myapp

# Drop all Linux capabilities, add only what's needed
docker run -d \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \   # allow binding to ports < 1024
  myapp

# No new privileges — prevent privilege escalation
docker run -d --security-opt no-new-privileges myapp

# Seccomp profile — restrict syscalls
docker run -d --security-opt seccomp=./seccomp-profile.json myapp`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Secrets Management (not env vars)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# ❌ Bad: secrets in environment variables (visible in docker inspect)
docker run -e DATABASE_PASSWORD=mysecret myapp

# ✅ Better: Docker secrets (Swarm mode or Compose secrets)
# docker-compose.yml with secrets:
services:
  api:
    image: myapp
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password  # read from file

secrets:
  db_password:
    file: ./secrets/db_password.txt    # or external: true for Swarm

# In the app: read from file
const password = fs.readFileSync(process.env.DB_PASSWORD_FILE, 'utf8').trim();

# BuildKit secrets — for credentials used only during build
docker buildx build \
  --secret id=npm_token,src=$HOME/.npmrc \
  -t myapp .

# In Dockerfile:
RUN --mount=type=secret,id=npm_token,target=/root/.npmrc \
    npm ci`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Image Vulnerability Scanning with Trivy
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install Trivy (macOS)
brew install trivy

# Scan an image for vulnerabilities
trivy image myapp:latest
trivy image --severity HIGH,CRITICAL myapp:latest  # only high/critical

# Scan in CI/CD (fail if critical vulnerabilities found)
trivy image --exit-code 1 --severity CRITICAL myapp:latest

# Scan a Dockerfile for misconfigurations
trivy config ./Dockerfile`}</code></pre>

      {/* Section 10: Production Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Production Patterns — Restart Policies, Resource Limits, Health Checks, Rolling Updates
      </h2>
      <p>
        Running Docker in production requires restart policies, resource constraints, health monitoring, and update
        strategies to minimize downtime.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Restart Policies
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# restart policies:
# no             (default) — never restart
# on-failure     restart if exit code != 0
# on-failure:5   restart up to 5 times
# always         always restart (including after docker restart daemon)
# unless-stopped restart unless manually stopped (survives daemon restart)

docker run -d --restart unless-stopped myapp

# In docker-compose.yml:
services:
  api:
    restart: unless-stopped
  worker:
    restart: on-failure:3`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Resource Limits
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Hard limits (container killed if exceeded)
docker run -d \
  --memory=512m \          # 512 MB RAM limit
  --memory-swap=512m \     # disable swap (swap = memory-swap - memory)
  --cpus=1.5 \             # 1.5 CPU cores
  --pids-limit=100 \       # max 100 processes (prevents fork bombs)
  myapp

# In docker-compose.yml (v3 with deploy):
services:
  api:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 256M
        reservations:        # guaranteed minimum
          cpus: "0.25"
          memory: 128M`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Zero-downtime Rolling Updates
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '20px', borderRadius: 8, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Manual rolling update pattern (with Compose):
# 1. Pull new image
docker pull myapp:2.0.0

# 2. Update docker-compose.yml image tag to 2.0.0

# 3. Recreate only the changed service with no downtime
docker compose up -d --no-deps --build api

# Docker Swarm rolling update
docker service update \
  --image myapp:2.0.0 \
  --update-parallelism 1 \    # update 1 replica at a time
  --update-delay 30s \         # wait 30s between replicas
  --update-failure-action rollback \  # auto-rollback on failure
  myapp_api

# Rollback to previous version
docker service rollback myapp_api`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', padding: '1rem', margin: '2rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>Generate Docker Compose Files Instantly</p>
        <p style={{ margin: 0 }}>
          Use our{' '}
          <a
            href="https://viadreams.cc/en/tools/docker-compose"
            style={{ color: '#0284c7', textDecoration: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Docker Compose generator
          </a>{' '}
          to scaffold production-ready <code>docker-compose.yml</code> files with services, volumes, networks, and
          healthchecks — no boilerplate to remember.
        </p>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I reduce Docker image build time in CI/CD?
      </h3>
      <p>
        Cache Docker layers in CI. In GitHub Actions, use <code>cache-from</code> and <code>cache-to</code> with the
        registry cache or <code>actions/cache</code> for the local buildx cache. Structure your Dockerfile so dependency
        installation (slow, rarely changes) comes before code copy (fast, changes every commit). Use{' '}
        <code>COPY package.json . &amp;&amp; RUN npm ci</code> before <code>COPY . .</code>. For monorepos, only
        rebuild images whose context has changed using path-based triggers.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between docker-compose v2 and v3?
      </h3>
      <p>
        Compose file format v3 introduced <code>deploy</code> keys designed for Docker Swarm. In standalone Compose
        (non-Swarm), the <code>deploy</code> block is ignored. Version 2 of the Compose file format has direct
        <code>mem_limit</code> and <code>cpu_shares</code> keys that work in standalone mode. For modern usage, the
        Compose specification (no version number) unifies both — Docker Compose v2 CLI (the <code>docker compose</code>{' '}
        plugin, not the old <code>docker-compose</code> binary) uses the Compose Spec and supports resource limits via
        <code>deploy.resources</code> even without Swarm.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I see why a container keeps restarting?
      </h3>
      <p>
        Use <code>docker ps</code> to see the restart count, then <code>docker logs CONTAINER</code> to see the crash
        output. If the container exits too quickly for logs, use <code>docker inspect CONTAINER</code> and check{' '}
        <code>State.ExitCode</code> and <code>State.Error</code>. Override the entrypoint to keep the container alive
        for investigation: <code>docker run -it --entrypoint sh IMAGE</code>. Common causes: missing environment
        variables, wrong file paths, port already in use, out-of-memory (check <code>State.OOMKilled</code>), or a
        missing dependency service (use <code>depends_on</code> with healthchecks).
      </p>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Always use .dockerignore</strong>: Omitting it sends node_modules or .git as build context, massively slowing builds.</li>
          <li><strong>Multi-stage builds</strong> are the single best way to shrink image size — compile in a fat image, copy only the binary to a minimal one.</li>
          <li><strong>Order Dockerfile layers by change frequency</strong>: dependency install before code copy to maximize cache hits.</li>
          <li><strong>Use named volumes for data persistence</strong>, bind mounts for development live-reload.</li>
          <li><strong>Custom networks required for DNS</strong>: container name resolution only works on user-defined bridge networks, not the default bridge.</li>
          <li><strong>Run as non-root user</strong> in all production images — add a USER instruction before CMD.</li>
          <li><strong>Never put secrets in ENV variables</strong>: use Docker secrets or read from files mounted via tmpfs.</li>
          <li><strong>Set resource limits</strong> (<code>--memory</code>, <code>--cpus</code>) to prevent runaway containers from taking down the host.</li>
          <li><strong>Use healthchecks</strong> in Compose to ensure dependent services wait until truly ready, not just started.</li>
          <li><strong>Scan images with Trivy</strong> or similar tools in CI before pushing to production registries.</li>
        </ul>
      </div>
    </article>
  );
}
