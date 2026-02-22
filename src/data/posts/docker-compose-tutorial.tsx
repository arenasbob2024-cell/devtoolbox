'use client';

import Link from 'next/link';

export default function DockerComposeTutorial({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Is Docker Compose?</h2>
      <p>
        <strong>Docker Compose</strong> is a tool for defining and running multi-container Docker applications. Instead of managing each container individually with long <code>docker run</code> commands, you describe your entire application stack in a single <code>docker-compose.yml</code> (or <code>compose.yaml</code>) file. With one command &mdash; <code>docker compose up</code> &mdash; you can start all your services, networks, and volumes together.
      </p>
      <p>
        Docker Compose is essential for local development environments, CI/CD pipelines, and staging servers. It eliminates the &quot;works on my machine&quot; problem by ensuring every developer runs the exact same stack. This tutorial covers everything from basic syntax to production-ready configurations with real-world examples.
      </p>
      <p>
        <Link href={`/${lang}/tools/docker-compose-generator`} style={{ fontWeight: 600 }}>Generate docker-compose.yml files visually with our Docker Compose Generator.</Link>
      </p>

      <h2>Docker Compose File Structure</h2>
      <p>
        A <code>docker-compose.yml</code> file uses YAML syntax and consists of several top-level keys. The most important are <code>services</code>, <code>networks</code>, and <code>volumes</code>.
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml basic structure
version: "3.9"    # optional in newer Docker Compose

services:
  web:            # service name
    image: nginx:latest
    ports:
      - "8080:80"

  api:
    build: ./backend
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:        # named volume declaration

networks:
  default:        # customize default network
    driver: bridge`}</code></pre>

      <h2>Services: Defining Your Containers</h2>
      <p>
        Each entry under <code>services</code> defines a container. Services can use a pre-built image or build from a Dockerfile. Here are the most important service configuration options:
      </p>

      <h3>Using an Image</h3>
      <pre><code className="language-yaml">{`services:
  redis:
    image: redis:7-alpine         # official image with tag

  postgres:
    image: postgres:16            # specific version

  app:
    image: myregistry.com/myapp:latest   # custom registry`}</code></pre>

      <h3>Building from Dockerfile</h3>
      <pre><code className="language-yaml">{`services:
  api:
    # Simple build from current directory
    build: .

  frontend:
    # Build with custom Dockerfile and context
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        NODE_ENV: production
        API_URL: https://api.example.com
      target: production    # multi-stage build target

  backend:
    # Build and also tag the image
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: myapp-backend:latest   # tag built image`}</code></pre>

      <h2>Ports: Exposing Services</h2>
      <p>
        The <code>ports</code> key maps container ports to host ports, making services accessible from outside Docker.
      </p>
      <pre><code className="language-yaml">{`services:
  web:
    image: nginx
    ports:
      - "8080:80"          # HOST:CONTAINER
      - "443:443"          # HTTPS

  api:
    build: .
    ports:
      - "3000:3000"        # same port
      - "127.0.0.1:9229:9229"  # bind to localhost only (debugging)

  db:
    image: postgres:16
    ports:
      - "5432:5432"        # expose database
    # Or use 'expose' for inter-container access only (no host binding):
    expose:
      - "5432"`}</code></pre>

      <h2>Environment Variables</h2>
      <p>
        Environment variables configure your services without hardcoding values. Docker Compose supports inline variables, <code>.env</code> files, and external env files.
      </p>
      <pre><code className="language-yaml">{`services:
  api:
    build: .
    # Method 1: Inline key-value pairs
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://user:pass@db:5432/mydb
      REDIS_URL: redis://redis:6379
      JWT_SECRET: my-super-secret-key

    # Method 2: Load from .env file
    env_file:
      - .env
      - .env.local          # override with local values

    # Method 3: Pass host environment variable
    environment:
      - API_KEY              # passes $API_KEY from host
      - NODE_ENV=\${NODE_ENV:-development}  # with default`}</code></pre>
      <pre><code className="language-bash">{`# .env file example
POSTGRES_USER=myapp
POSTGRES_PASSWORD=secretpassword123
POSTGRES_DB=myapp_production
REDIS_PASSWORD=redispass
JWT_SECRET=change-this-in-production`}</code></pre>

      <h2>Volumes: Persist Data and Share Files</h2>
      <p>
        Volumes ensure data survives container restarts and allow sharing files between the host and containers. There are two types: named volumes (managed by Docker) and bind mounts (direct host path mapping).
      </p>
      <pre><code className="language-yaml">{`services:
  db:
    image: postgres:16
    volumes:
      # Named volume (persistent, Docker-managed)
      - db-data:/var/lib/postgresql/data

  api:
    build: .
    volumes:
      # Bind mount (for development - live code reload)
      - ./src:/app/src
      - ./package.json:/app/package.json

      # Anonymous volume (prevent container files from being overwritten)
      - /app/node_modules

      # Read-only bind mount
      - ./config/nginx.conf:/etc/nginx/nginx.conf:ro

# Declare named volumes at top level
volumes:
  db-data:
    driver: local
  redis-data:
    # External volume (must already exist)
    external: true`}</code></pre>

      <h2>Networks: Service Communication</h2>
      <p>
        Docker Compose creates a default network where all services can communicate using their service name as the hostname. You can also define custom networks for isolation.
      </p>
      <pre><code className="language-yaml">{`services:
  frontend:
    build: ./frontend
    networks:
      - frontend-net

  api:
    build: ./backend
    networks:
      - frontend-net      # accessible by frontend
      - backend-net       # accessible by database

  db:
    image: postgres:16
    networks:
      - backend-net       # NOT accessible by frontend (isolated)

networks:
  frontend-net:
    driver: bridge
  backend-net:
    driver: bridge
    # Internal network (no external access)
    internal: true`}</code></pre>

      <h2>depends_on: Service Startup Order</h2>
      <p>
        The <code>depends_on</code> key controls startup order. By default it only waits for the container to start, not for the service to be ready. Use health checks for readiness-based ordering.
      </p>
      <pre><code className="language-yaml">{`services:
  api:
    build: .
    depends_on:
      # Simple form: just wait for container to start
      - db
      - redis

  worker:
    build: .
    depends_on:
      # With condition: wait for service to be healthy
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
      api:
        condition: service_started

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 10s

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5`}</code></pre>

      <h2>Healthcheck: Monitor Service Health</h2>
      <p>
        Health checks tell Docker whether a container is functioning correctly. Docker periodically runs the specified command and marks the container as healthy, unhealthy, or starting.
      </p>
      <pre><code className="language-yaml">{`services:
  api:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s       # check every 30 seconds
      timeout: 10s        # fail if no response in 10s
      retries: 3          # mark unhealthy after 3 failures
      start_period: 40s   # grace period during startup

  db:
    image: mysql:8
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5`}</code></pre>

      <h2>Restart Policies</h2>
      <pre><code className="language-yaml">{`services:
  api:
    build: .
    restart: always          # always restart (even after manual stop)

  worker:
    build: .
    restart: on-failure      # restart only on non-zero exit code

  cron:
    image: alpine
    restart: unless-stopped  # restart unless manually stopped

  migration:
    build: .
    restart: "no"            # never restart (run once)`}</code></pre>

      <h2>Resource Limits</h2>
      <pre><code className="language-yaml">{`services:
  api:
    build: .
    deploy:
      resources:
        limits:
          cpus: "0.50"       # max 50% of one CPU
          memory: 512M       # max 512MB RAM
        reservations:
          cpus: "0.25"       # reserve 25% CPU
          memory: 256M       # reserve 256MB RAM`}</code></pre>

      <h2>Real-World Example 1: Node.js + PostgreSQL + Redis</h2>
      <p>
        A typical modern web application stack with a Node.js API, PostgreSQL database, and Redis cache:
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml - Node.js + PostgreSQL + Redis
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://appuser:apppass@db:5432/myapp
      REDIS_URL: redis://redis:6379
      JWT_SECRET: dev-secret-change-in-prod
    volumes:
      - ./src:/app/src          # live reload
      - /app/node_modules       # prevent overwrite
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppass
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d myapp"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass redispass
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "redispass", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

volumes:
  postgres-data:
  redis-data:`}</code></pre>

      <h2>Real-World Example 2: Python Flask + Redis + Celery</h2>
      <p>
        A Python application with an API server, Redis message broker, and Celery worker for background tasks:
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml - Python + Redis + Celery
services:
  web:
    build: .
    command: gunicorn --bind 0.0.0.0:5000 app:create_app()
    ports:
      - "5000:5000"
    environment:
      FLASK_ENV: development
      CELERY_BROKER_URL: redis://redis:6379/0
      CELERY_RESULT_BACKEND: redis://redis:6379/0
    volumes:
      - .:/app
    depends_on:
      redis:
        condition: service_healthy
    restart: unless-stopped

  worker:
    build: .
    command: celery -A app.celery worker --loglevel=info
    environment:
      CELERY_BROKER_URL: redis://redis:6379/0
      CELERY_RESULT_BACKEND: redis://redis:6379/0
    volumes:
      - .:/app
    depends_on:
      redis:
        condition: service_healthy
    restart: unless-stopped

  beat:
    build: .
    command: celery -A app.celery beat --loglevel=info
    environment:
      CELERY_BROKER_URL: redis://redis:6379/0
    volumes:
      - .:/app
    depends_on:
      redis:
        condition: service_healthy
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped`}</code></pre>

      <h2>Real-World Example 3: WordPress + MySQL + phpMyAdmin</h2>
      <p>
        A complete WordPress development environment with MySQL database and phpMyAdmin for database management:
      </p>
      <pre><code className="language-yaml">{`# docker-compose.yml - WordPress + MySQL + phpMyAdmin
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql:3306
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp-content:/var/www/html/wp-content
      - ./themes:/var/www/html/wp-content/themes
      - ./plugins:/var/www/html/wp-content/plugins
    depends_on:
      mysql:
        condition: service_healthy
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppass
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - "8081:80"
    environment:
      PMA_HOST: mysql
      PMA_USER: root
      PMA_PASSWORD: rootpass
    depends_on:
      - mysql
    restart: unless-stopped

volumes:
  wp-content:
  mysql-data:`}</code></pre>

      <h2>Essential Docker Compose Commands</h2>
      <pre><code className="language-bash">{`# Start all services (foreground)
docker compose up

# Start in detached mode (background)
docker compose up -d

# Start specific services only
docker compose up -d api db

# Rebuild images before starting
docker compose up -d --build

# Stop all services
docker compose down

# Stop and remove volumes (DESTROYS DATA)
docker compose down -v

# Stop and remove images
docker compose down --rmi all

# View running containers
docker compose ps

# View logs
docker compose logs
docker compose logs -f api          # follow specific service
docker compose logs --tail 100 api  # last 100 lines

# Execute command in running container
docker compose exec api sh
docker compose exec db psql -U appuser -d myapp

# Run a one-off command
docker compose run --rm api npm test

# Scale a service
docker compose up -d --scale worker=3

# Pull latest images
docker compose pull

# View resource usage
docker compose top`}</code></pre>

      <h2>Multi-Stage Builds with Compose</h2>
      <p>
        Multi-stage Dockerfiles reduce image size by separating build dependencies from runtime. Use the <code>target</code> key in Compose to select which stage to build:
      </p>
      <pre><code className="language-dockerfile">{`# Dockerfile (multi-stage)
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`}</code></pre>
      <pre><code className="language-yaml">{`# docker-compose.yml
services:
  api-dev:
    build:
      context: .
      target: builder        # use build stage for development
    volumes:
      - ./src:/app/src
    command: npm run dev

  api-prod:
    build:
      context: .
      target: production     # use production stage
    ports:
      - "3000:3000"`}</code></pre>

      <h2>Docker Compose Best Practices</h2>
      <ul>
        <li><strong>Use <code>.env</code> files for secrets</strong>: Never hardcode passwords or API keys in <code>docker-compose.yml</code>. Use <code>.env</code> files and add them to <code>.gitignore</code>.</li>
        <li><strong>Pin image versions</strong>: Use specific tags like <code>postgres:16-alpine</code> instead of <code>postgres:latest</code> to ensure reproducible builds.</li>
        <li><strong>Use health checks</strong>: Always add health checks to databases and critical services. Use <code>depends_on</code> with <code>condition: service_healthy</code> for reliable startup ordering.</li>
        <li><strong>Named volumes for data</strong>: Always use named volumes for database storage. Bind mounts are for development source code only.</li>
        <li><strong>Use Alpine images</strong>: Prefer <code>-alpine</code> image variants to minimize image size and attack surface.</li>
        <li><strong>Separate dev and prod configs</strong>: Use <code>docker-compose.override.yml</code> for development-specific settings that automatically merge with the base file.</li>
        <li><strong>Set resource limits</strong>: Use <code>deploy.resources</code> to prevent runaway containers from consuming all system resources.</li>
        <li><strong>Use restart policies</strong>: Set <code>restart: unless-stopped</code> for production services to ensure they recover from crashes.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>What is the difference between docker-compose and docker compose?</h3>
      <p>
        <code>docker-compose</code> (with hyphen) is the older standalone Python tool (V1). <code>docker compose</code> (with space) is the newer Go-based plugin integrated into Docker CLI (V2). Docker Compose V2 is now the default and recommended version. The syntax and features are nearly identical, but V2 is faster and better maintained. If you are starting new, always use <code>docker compose</code> (V2).
      </p>

      <h3>How do I access one service from another?</h3>
      <p>
        Services on the same Docker network can reach each other using the service name as the hostname. For example, if your <code>docker-compose.yml</code> has a service named <code>db</code>, your API can connect to it at <code>db:5432</code>. Docker&apos;s built-in DNS resolves service names to container IP addresses automatically.
      </p>

      <h3>How do I persist database data?</h3>
      <p>
        Use named volumes. For PostgreSQL: <code>volumes: [&quot;pgdata:/var/lib/postgresql/data&quot;]</code>. Declare the volume at the top level. Named volumes survive <code>docker compose down</code> but are destroyed by <code>docker compose down -v</code>. Never use bind mounts for database data in production.
      </p>

      <h3>How do I run database migrations with Compose?</h3>
      <p>
        Use a one-off <code>run</code> command: <code>docker compose run --rm api npm run migrate</code>. Or create a separate migration service with <code>restart: &quot;no&quot;</code> that runs once and exits. You can also use <code>docker-entrypoint-initdb.d/</code> for initial SQL scripts in PostgreSQL and MySQL containers.
      </p>

      <h3>How do I use different configs for dev and production?</h3>
      <p>
        Use override files. Docker Compose automatically loads <code>docker-compose.yml</code> and <code>docker-compose.override.yml</code>. Put production config in the base file and development overrides (bind mounts, debug ports) in the override file. For explicit control, use <code>docker compose -f docker-compose.yml -f docker-compose.prod.yml up</code>.
      </p>

      <h3>How do I rebuild a single service without stopping others?</h3>
      <p>
        Run <code>docker compose up -d --build api</code> to rebuild and restart only the &quot;api&quot; service. Other running services are not affected. Add <code>--no-deps</code> to skip restarting dependent services.
      </p>
    </>
  );
}
