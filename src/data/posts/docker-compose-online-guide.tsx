'use client';

import Link from 'next/link';

/* -------------------------------------------------------------------------- */
/*  Docker Compose Guide: Write docker-compose.yml Files — Complete Guide     */
/* -------------------------------------------------------------------------- */

const translations = {
  en: {
    title: 'Docker Compose Guide: Write docker-compose.yml Files — Complete Guide',
    description: 'Master Docker Compose from scratch: yml structure, services, networks, volumes, health checks, depends_on, profiles, override files, and production best practices.',
  },
  zh: {
    title: 'Docker Compose 完整指南：编写 docker-compose.yml 文件',
    description: '从零掌握 Docker Compose：yml 结构、服务、网络、数据卷、健康检查、depends_on、profiles、覆盖文件和生产最佳实践。',
  },
  fr: {
    title: 'Guide Docker Compose : Écrire des fichiers docker-compose.yml — Guide Complet',
    description: 'Maîtrisez Docker Compose de zéro : structure yml, services, réseaux, volumes, health checks, depends_on, profiles, fichiers override et bonnes pratiques en production.',
  },
  de: {
    title: 'Docker Compose Guide: docker-compose.yml Dateien schreiben — Vollständiger Leitfaden',
    description: 'Docker Compose von Grund auf meistern: yml-Struktur, Services, Netzwerke, Volumes, Health Checks, depends_on, Profile, Override-Dateien und Produktions-Best-Practices.',
  },
  es: {
    title: 'Guía Docker Compose: Escribir archivos docker-compose.yml — Guía Completa',
    description: 'Domina Docker Compose desde cero: estructura yml, servicios, redes, volúmenes, health checks, depends_on, profiles, archivos override y mejores prácticas en producción.',
  },
  ja: {
    title: 'Docker Compose ガイド：docker-compose.yml ファイルの書き方 — 完全ガイド',
    description: 'Docker Compose を基礎から習得：yml 構造、サービス、ネットワーク、ボリューム、ヘルスチェック、depends_on、プロファイル、オーバーライドファイル、本番環境のベストプラクティス。',
  },
  ko: {
    title: 'Docker Compose 가이드: docker-compose.yml 파일 작성 — 완전 가이드',
    description: 'Docker Compose를 처음부터 마스터: yml 구조, 서비스, 네트워크, 볼륨, 헬스 체크, depends_on, 프로필, 오버라이드 파일, 프로덕션 모범 사례.',
  },
};

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
  background: '#1e293b',
  color: '#e2e8f0',
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

const ulStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 16,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
  fontSize: 15,
};

const olStyle: React.CSSProperties = {
  paddingLeft: 24,
  marginBottom: 16,
  lineHeight: 1.8,
  color: 'var(--text-secondary)',
  fontSize: 15,
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

export default function DockerComposeOnlineGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const toolLink = `/${lang}/tools/docker-compose-generator`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the top-level structure of a docker-compose.yml file?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A docker-compose.yml file has four top-level keys: version (optional since Compose V2), services (required — defines each container), networks (optional — declares custom networks), and volumes (optional — declares named volumes). The services section is the core where you configure image, ports, environment, volumes, depends_on, and other container properties.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between named volumes and bind mounts in Docker Compose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Named volumes (e.g. db_data:/var/lib/postgresql/data) are managed by Docker and stored in /var/lib/docker/volumes/. They persist across container restarts and are portable. Bind mounts (e.g. ./src:/app/src) map a host path directly into the container, making them ideal for development hot-reloading. Named volumes are recommended for production databases and stateful services; bind mounts are best for source code in development.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does depends_on with condition: service_healthy work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The long-form depends_on syntax with condition: service_healthy makes Compose wait until the dependency\'s healthcheck reports healthy before starting the dependent service. You must define a healthcheck on the dependency service — for example, a PostgreSQL service with healthcheck using pg_isready. Without service_healthy, depends_on only controls start order but does not wait for actual readiness.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I use environment variables and .env files in Docker Compose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docker Compose automatically loads a .env file from the directory where you run docker compose. Variables defined there are available for substitution in docker-compose.yml using ${VAR_NAME} syntax. You can also use the env_file key to load one or more files of KEY=VALUE pairs into a container. Alternatively, list variables directly under the environment key as KEY=value strings or KEY: value mappings.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are Docker Compose profiles and how do I activate them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Profiles let you define optional services that only start when explicitly requested. Assign a profile to a service using the profiles key (e.g. profiles: [debug]). Services without a profiles key always start. Activate profiles with the --profile flag (docker compose --profile debug up) or by setting the COMPOSE_PROFILES environment variable. Common uses include separating dev tools, mock services, monitoring agents, and test databases.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is docker-compose.override.yml and how does file merging work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Docker Compose automatically merges docker-compose.override.yml on top of docker-compose.yml when both exist in the same directory. The override file is typically gitignored and contains developer-specific settings like extra port bindings or debug commands. For multiple environments, use -f flags: docker compose -f docker-compose.yml -f docker-compose.prod.yml up. Arrays like ports and volumes are concatenated; scalar values like image and command are replaced by the last file.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most important Docker Compose commands I should know?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Essential commands: docker compose up -d (start in background), docker compose down (stop and remove containers), docker compose down -v (also remove volumes), docker compose logs -f service (follow logs), docker compose exec service sh (open shell), docker compose ps (list running services), docker compose build (rebuild images), docker compose pull (update images), docker compose restart service (restart one service), docker compose run --rm service command (run one-off command).',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best practices for using Docker Compose in production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Production best practices: always pin image tags (never use :latest), set restart: unless-stopped for critical services, define memory and CPU limits under deploy.resources, use health checks for all services, externalize secrets with Docker secrets or env_file, configure a logging driver (json-file with max-size and max-file), use named volumes for persistent data, separate dev and prod configs using override files, and monitor with docker compose ps and logs regularly.',
        },
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TL;DR ─────────────────────────────────────────────────────────── */}
      <div style={tldrBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: '#0369a1' }}>
          TL;DR — Docker Compose in 30 Seconds
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: '#0c4a6e' }}>
          Docker Compose lets you define and run multi-container applications with a single YAML file.
          Run <code style={{ ...inlineCodeStyle, color: '#0369a1' }}>docker compose up -d</code> to start
          all services, <code style={{ ...inlineCodeStyle, color: '#0369a1' }}>docker compose down</code> to
          stop them. Use <strong>named volumes</strong> for databases, <strong>bind mounts</strong> for
          source code, <strong>healthchecks + depends_on</strong> for startup ordering, and
          <strong>profiles</strong> to separate dev/prod services. Pin image tags in production and always
          set restart policies.
        </p>
      </div>

      {/* ── Key Takeaways ─────────────────────────────────────────────────── */}
      <div style={keyTakeawaysStyle}>
        <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'var(--text-primary)' }}>
          Key Takeaways
        </p>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li>A <code style={inlineCodeStyle}>docker-compose.yml</code> has four top-level keys: <code style={inlineCodeStyle}>version</code>, <code style={inlineCodeStyle}>services</code>, <code style={inlineCodeStyle}>networks</code>, and <code style={inlineCodeStyle}>volumes</code></li>
          <li>Use <code style={inlineCodeStyle}>depends_on</code> with <code style={inlineCodeStyle}>condition: service_healthy</code> to wait for real readiness, not just container start</li>
          <li>Named volumes persist data; bind mounts sync host files into containers for development</li>
          <li>The <code style={inlineCodeStyle}>.env</code> file is automatically loaded for variable substitution in Compose files</li>
          <li>Override files (<code style={inlineCodeStyle}>docker-compose.override.yml</code>) layer dev settings on top of the base config</li>
          <li>Profiles (<code style={inlineCodeStyle}>profiles: [debug]</code>) let you selectively start optional services</li>
          <li>In production: pin image tags, set restart policies, define resource limits, and use health checks</li>
        </ul>
      </div>

      {/* ── Section 1: What is Docker Compose ────────────────────────────── */}
      <h2 style={h2Style}>What Is Docker Compose?</h2>
      <p style={pStyle}>
        Docker Compose is a tool for defining and running multi-container Docker applications. You describe
        your entire application stack — web servers, databases, caches, message queues — in a single
        <code style={inlineCodeStyle}>docker-compose.yml</code> file, and then spin everything up with
        one command.
      </p>
      <p style={pStyle}>
        The current version is <strong>Docker Compose V2</strong> (written in Go, bundled with Docker Desktop
        as <code style={inlineCodeStyle}>docker compose</code>). The older Python-based V1
        (<code style={inlineCodeStyle}>docker-compose</code> with a hyphen) reached end-of-life in 2023.
        All examples in this guide use the V2 syntax.
      </p>
      <p style={pStyle}>
        Want to generate a <code style={inlineCodeStyle}>docker-compose.yml</code> visually? Try the free{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
          Docker Compose Generator on DevToolBox
        </Link>{' '}
        — select services, configure options, and download a ready-to-use file in seconds.
      </p>

      {/* ── Section 2: File Structure ─────────────────────────────────────── */}
      <h2 style={h2Style}>docker-compose.yml Structure: The Four Top-Level Keys</h2>
      <p style={pStyle}>
        Every Compose file can contain four top-level keys. Only <code style={inlineCodeStyle}>services</code> is
        required; the rest are optional.
      </p>

      <pre style={codeBlockStyle}><code>{`# docker-compose.yml — annotated skeleton

version: "3.9"   # optional in Compose V2; omit or set to "3.9"

services:        # required — defines each container
  web:
    image: nginx:1.27-alpine
  db:
    image: postgres:16-alpine

networks:        # optional — custom network definitions
  frontend:
  backend:

volumes:         # optional — named volume declarations
  db_data:`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Note on the version field:</strong> Since Docker Compose V2, the <code style={inlineCodeStyle}>version</code> key
        is informational only and does not affect behavior. Compose automatically supports all Compose
        Specification features. You can safely omit it in new files.
      </div>

      <h3 style={h3Style}>Top-Level Keys Reference</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Key</th>
              <th style={thStyle}>Required</th>
              <th style={thStyle}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>version</code></td><td style={tdStyle}>No</td><td style={tdStyle}>Compose Specification version (informational in V2)</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>services</code></td><td style={tdStyle}>Yes</td><td style={tdStyle}>Container definitions — image, ports, volumes, env, etc.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>networks</code></td><td style={tdStyle}>No</td><td style={tdStyle}>Custom network declarations and driver options</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>volumes</code></td><td style={tdStyle}>No</td><td style={tdStyle}>Named volume declarations; can reference external volumes</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>configs</code></td><td style={tdStyle}>No</td><td style={tdStyle}>Config files mounted into services (Swarm-compatible)</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>secrets</code></td><td style={tdStyle}>No</td><td style={tdStyle}>Sensitive data injected as files in /run/secrets/</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 3: Common Service Definitions ─────────────────────────── */}
      <h2 style={h2Style}>Common Service Definitions: Web, Database, Cache</h2>
      <p style={pStyle}>
        The <code style={inlineCodeStyle}>services</code> section is where you spend most of your time.
        Each service maps to one container. Here is a realistic three-tier stack covering a Node.js web
        server, PostgreSQL database, and Redis cache:
      </p>

      <pre style={codeBlockStyle}><code>{`services:

  # ── Web application ──────────────────────────────────
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: development          # multi-stage build target
    image: myapp:dev
    container_name: myapp_web
    ports:
      - "3000:3000"                # host:container
    environment:
      NODE_ENV: development
      DATABASE_URL: postgres://user:pass@db:5432/mydb
      REDIS_URL: redis://cache:6379
    volumes:
      - .:/app                     # bind mount for hot-reload
      - /app/node_modules          # anonymous volume to preserve modules
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped
    networks:
      - frontend
      - backend

  # ── PostgreSQL database ───────────────────────────────
  db:
    image: postgres:16-alpine
    container_name: myapp_db
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - db_data:/var/lib/postgresql/data   # named volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # seed script
    ports:
      - "5432:5432"                # expose for local DB clients
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped
    networks:
      - backend

  # ── Redis cache ───────────────────────────────────────
  cache:
    image: redis:7-alpine
    container_name: myapp_cache
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3
    restart: unless-stopped
    networks:
      - backend

networks:
  frontend:
  backend:

volumes:
  db_data:
  redis_data:`}</code></pre>

      <h3 style={h3Style}>Key Service Properties</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Property</th>
              <th style={thStyle}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>image</code></td><td style={tdStyle}>Docker image to use. Specify a tag for reproducibility.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>build</code></td><td style={tdStyle}>Build from a Dockerfile. Can be a path string or an object with context, dockerfile, args, target.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>ports</code></td><td style={tdStyle}>Port mappings as "HOST:CONTAINER" strings. Omit HOST to assign random port.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>environment</code></td><td style={tdStyle}>Environment variables as KEY=value list or KEY: value mapping.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>volumes</code></td><td style={tdStyle}>Mount points as "SOURCE:TARGET:OPTIONS". Source can be host path, named volume, or omitted (anonymous).</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>networks</code></td><td style={tdStyle}>List of networks the container joins.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>depends_on</code></td><td style={tdStyle}>Startup dependencies with optional condition checks.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>restart</code></td><td style={tdStyle}>Restart policy: no, always, on-failure, unless-stopped.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>command</code></td><td style={tdStyle}>Override the default CMD from the image.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>entrypoint</code></td><td style={tdStyle}>Override the ENTRYPOINT from the image.</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 4: Environment Variables and .env Files ───────────────── */}
      <h2 style={h2Style}>Environment Variables and .env Files</h2>
      <p style={pStyle}>
        Docker Compose offers four ways to supply environment variables to containers. Each has different
        use cases and security implications.
      </p>

      <h3 style={h3Style}>Method 1: Inline environment key</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    environment:
      NODE_ENV: production
      PORT: "3000"
      # List syntax also works:
      # - NODE_ENV=production
      # - PORT=3000`}</code></pre>

      <h3 style={h3Style}>Method 2: .env file (automatic loading)</h3>
      <p style={pStyle}>
        Compose automatically reads a file named <code style={inlineCodeStyle}>.env</code> in the same
        directory as your <code style={inlineCodeStyle}>docker-compose.yml</code>. Variables defined
        there are available for substitution throughout the Compose file:
      </p>
      <pre style={codeBlockStyle}><code>{`# .env file (auto-loaded, NOT committed to git)
POSTGRES_USER=myuser
POSTGRES_PASSWORD=s3cur3p@ss
POSTGRES_DB=mydb
APP_PORT=3000`}</code></pre>
      <pre style={codeBlockStyle}><code>{`# docker-compose.yml using .env substitution
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: \${POSTGRES_DB}
  web:
    ports:
      - "\${APP_PORT}:3000"`}</code></pre>

      <h3 style={h3Style}>Method 3: env_file key</h3>
      <p style={pStyle}>
        The <code style={inlineCodeStyle}>env_file</code> key loads all variables from a file directly
        into the container environment. Unlike the <code style={inlineCodeStyle}>.env</code> approach,
        these variables are not available for Compose file substitution — they go straight into the
        container:
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    env_file:
      - .env              # loaded into container
      - .env.local        # merged on top (later files win)
      - path: .env.prod   # long form with required: true/false
        required: false`}</code></pre>

      <h3 style={h3Style}>Method 4: Shell environment pass-through</h3>
      <pre style={codeBlockStyle}><code>{`# When you list a key with no value, Compose reads it from the shell
services:
  web:
    environment:
      - SECRET_KEY         # value comes from shell: export SECRET_KEY=...
      - DATABASE_URL`}</code></pre>

      <div style={warningBoxStyle}>
        <strong>Security tip:</strong> Never hardcode secrets in <code style={inlineCodeStyle}>docker-compose.yml</code> if
        it is committed to version control. Use <code style={inlineCodeStyle}>.env</code> (gitignored) or
        Docker Secrets. Add <code style={inlineCodeStyle}>.env</code> to your <code style={inlineCodeStyle}>.gitignore</code> immediately.
      </div>

      {/* ── Section 5: Networking ─────────────────────────────────────────── */}
      <h2 style={h2Style}>Networking Between Containers</h2>
      <p style={pStyle}>
        By default, Compose creates a single default network for your project. All services on that
        network can reach each other using the <strong>service name as the hostname</strong>. No need
        to know IP addresses.
      </p>
      <pre style={codeBlockStyle}><code>{`# Containers on the same network communicate by service name:
# From the 'web' container, connect to PostgreSQL at:
#   host: db
#   port: 5432 (the container port, not the published host port)
DATABASE_URL=postgres://user:pass@db:5432/mydb`}</code></pre>

      <h3 style={h3Style}>Custom Networks</h3>
      <p style={pStyle}>
        Define multiple networks to isolate services. A common pattern is <strong>frontend</strong>
        (app + proxy) and <strong>backend</strong> (app + db + cache). The proxy can only reach
        the app; the database is completely isolated from the frontend:
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  nginx:
    image: nginx:alpine
    networks:
      - frontend       # proxy faces public internet

  web:
    image: myapp:latest
    networks:
      - frontend       # receives traffic from nginx
      - backend        # talks to db and cache

  db:
    image: postgres:16-alpine
    networks:
      - backend        # only reachable from web

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true     # no external internet access`}</code></pre>

      <h3 style={h3Style}>Network Drivers</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Driver</th>
              <th style={thStyle}>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>bridge</code></td><td style={tdStyle}>Default. Container-to-container on the same host.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>host</code></td><td style={tdStyle}>Container shares host network stack. No isolation.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>overlay</code></td><td style={tdStyle}>Multi-host networking (Docker Swarm).</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>none</code></td><td style={tdStyle}>Disables networking completely.</td></tr>
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>Connecting to an External Network</h3>
      <pre style={codeBlockStyle}><code>{`# Reference a network created outside Compose
networks:
  shared_infra:
    external: true   # Compose will not create this network
    name: my_infra_network`}</code></pre>

      {/* ── Section 6: Volumes ────────────────────────────────────────────── */}
      <h2 style={h2Style}>Volumes: Named Volumes vs Bind Mounts</h2>
      <p style={pStyle}>
        Volumes provide persistent storage that survives container restarts and removals. Docker Compose
        supports three volume types: named volumes, bind mounts, and anonymous volumes (deprecated in
        favor of named volumes for persistence).
      </p>

      <h3 style={h3Style}>Named Volumes (Production Recommended)</h3>
      <p style={pStyle}>
        Named volumes are managed by Docker, stored in <code style={inlineCodeStyle}>/var/lib/docker/volumes/</code>,
        and are the recommended approach for database data and other persistent state:
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  db:
    image: postgres:16-alpine
    volumes:
      - db_data:/var/lib/postgresql/data  # named volume

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  db_data:           # declare at top level
    driver: local
  redis_data:
    driver: local

# Commands:
# docker volume ls                       List all volumes
# docker volume inspect myproject_db_data  Inspect a volume
# docker volume rm myproject_db_data     Remove a volume (after down)
# docker compose down -v                 Remove containers AND volumes`}</code></pre>

      <h3 style={h3Style}>Bind Mounts (Development Recommended)</h3>
      <p style={pStyle}>
        Bind mounts map a host directory or file into the container. Perfect for development because
        code changes on your host are immediately visible inside the container:
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    image: node:20-alpine
    volumes:
      - .:/app                    # entire project into /app
      - /app/node_modules         # anonymous vol: preserve container modules
    working_dir: /app
    command: npm run dev

  # Mount a single config file (read-only):
  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro  # :ro = read-only`}</code></pre>

      <h3 style={h3Style}>Volume Mount Options</h3>
      <pre style={codeBlockStyle}><code>{`# Long-form volume syntax (more explicit):
volumes:
  - type: bind
    source: ./src
    target: /app/src
    read_only: false
  - type: volume
    source: db_data
    target: /var/lib/postgresql/data
    volume:
      nocopy: true    # don't copy container data to volume on create`}</code></pre>

      <div style={tipBoxStyle}>
        <strong>Named vs Bind summary:</strong> Use <strong>named volumes</strong> for database files,
        logs, and any data that must persist and be managed by Docker. Use <strong>bind mounts</strong> for
        source code in development where you want live editing. Never use bind mounts for database data
        in production — file permission mismatches and filesystem performance issues can cause problems.
      </div>

      {/* ── Section 7: Health Checks ──────────────────────────────────────── */}
      <h2 style={h2Style}>Health Checks</h2>
      <p style={pStyle}>
        Health checks allow Docker to determine whether a container is actually ready to serve requests,
        not just running. A container can be in one of three states: <code style={inlineCodeStyle}>starting</code>,
        <code style={inlineCodeStyle}>healthy</code>, or <code style={inlineCodeStyle}>unhealthy</code>.
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  # PostgreSQL with pg_isready health check
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: myuser
      POSTGRES_DB: mydb
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser -d mydb"]
      interval: 10s      # how often to run the check
      timeout: 5s        # how long to wait for a response
      retries: 5         # how many consecutive failures before unhealthy
      start_period: 30s  # grace period before checks start counting

  # Redis with redis-cli ping
  cache:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  # HTTP service health check using wget
  api:
    image: myapi:latest
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:8080/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  # HTTP service using curl
  web:
    image: myapp:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3`}</code></pre>

      <h3 style={h3Style}>Health Check test Formats</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Format</th>
              <th style={thStyle}>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>["NONE"]</code></td><td style={tdStyle}>Disables health check inherited from image.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>["CMD", "cmd", "arg"]</code></td><td style={tdStyle}>Runs command directly without a shell.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>["CMD-SHELL", "cmd arg"]</code></td><td style={tdStyle}>Runs command inside a shell (/bin/sh -c).</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 8: depends_on with Conditions ─────────────────────────── */}
      <h2 style={h2Style}>depends_on with Conditions</h2>
      <p style={pStyle}>
        The <code style={inlineCodeStyle}>depends_on</code> key controls startup order between services.
        The simple form (list of service names) only ensures containers start in order — it does NOT
        wait for a service to be ready. Use the long form with conditions for true readiness waiting.
      </p>

      <h3 style={h3Style}>Simple depends_on (start order only)</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    depends_on:
      - db
      - cache
  db:
    image: postgres:16-alpine
  cache:
    image: redis:7-alpine`}</code></pre>

      <h3 style={h3Style}>depends_on with condition: service_healthy</h3>
      <p style={pStyle}>
        This is the recommended approach for databases and services that take time to initialize.
        The dependent service starts only when the dependency's healthcheck returns healthy:
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy    # wait for db healthcheck to pass
        restart: true                 # restart web if db restarts
      cache:
        condition: service_started    # just wait for container to start
      migrations:
        condition: service_completed_successfully  # wait for job to finish

  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  cache:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]

  migrations:
    image: myapp:latest
    command: npm run migrate
    depends_on:
      db:
        condition: service_healthy`}</code></pre>

      <h3 style={h3Style}>Condition Values Reference</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Condition</th>
              <th style={thStyle}>Waits Until</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>service_started</code></td><td style={tdStyle}>Container has started (no readiness guarantee). Default.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>service_healthy</code></td><td style={tdStyle}>Container healthcheck reports healthy.</td></tr>
            <tr><td style={tdStyle}><code style={inlineCodeStyle}>service_completed_successfully</code></td><td style={tdStyle}>Container exited with code 0 (for one-off jobs).</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 9: Profiles ───────────────────────────────────────────── */}
      <h2 style={h2Style}>Profiles: Dev vs Prod Services</h2>
      <p style={pStyle}>
        Profiles let you define optional services in a single Compose file. Services assigned to a
        profile only start when that profile is explicitly activated. Services with no profile always
        start. This eliminates the need for separate Compose files for basic dev/prod differences.
      </p>
      <pre style={codeBlockStyle}><code>{`services:
  # Core services — always start
  web:
    image: myapp:latest
    ports:
      - "3000:3000"

  db:
    image: postgres:16-alpine

  # Development only tools — start with --profile dev
  adminer:
    image: adminer:latest
    profiles: [dev]
    ports:
      - "8080:8080"
    depends_on:
      - db

  mailhog:
    image: mailhog/mailhog:latest
    profiles: [dev]
    ports:
      - "8025:8025"  # web UI
      - "1025:1025"  # SMTP

  # Monitoring stack — start with --profile monitoring
  prometheus:
    image: prom/prometheus:latest
    profiles: [monitoring]
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    profiles: [monitoring]
    ports:
      - "3001:3000"

  # Debug tool — start with --profile debug
  redis-commander:
    image: rediscommander/redis-commander:latest
    profiles: [debug]
    ports:
      - "8081:8081"`}</code></pre>

      <h3 style={h3Style}>Activating Profiles</h3>
      <pre style={codeBlockStyle}><code>{`# Activate a single profile
docker compose --profile dev up -d

# Activate multiple profiles
docker compose --profile dev --profile monitoring up -d

# Via environment variable
export COMPOSE_PROFILES=dev,monitoring
docker compose up -d

# Run only a specific profiled service by name
docker compose run --rm adminer`}</code></pre>

      {/* ── Section 10: Override Files ────────────────────────────────────── */}
      <h2 style={h2Style}>Override Files: docker-compose.override.yml</h2>
      <p style={pStyle}>
        Docker Compose automatically merges <code style={inlineCodeStyle}>docker-compose.override.yml</code> on
        top of <code style={inlineCodeStyle}>docker-compose.yml</code> when you run
        <code style={inlineCodeStyle}>docker compose up</code>. This is ideal for developer-specific
        settings that should not be committed to version control.
      </p>

      <h3 style={h3Style}>Base file (docker-compose.yml) — committed to git</h3>
      <pre style={codeBlockStyle}><code>{`# docker-compose.yml — production-ready base
services:
  web:
    image: myapp:latest
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    volumes:
      - db_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  db_data:`}</code></pre>

      <h3 style={h3Style}>Override file (docker-compose.override.yml) — gitignored</h3>
      <pre style={codeBlockStyle}><code>{`# docker-compose.override.yml — developer overrides (gitignored)
services:
  web:
    build: .              # build from source in dev
    image: myapp:dev
    volumes:
      - .:/app            # live code reload
      - /app/node_modules
    environment:
      NODE_ENV: development
      DEBUG: "myapp:*"

  db:
    ports:
      - "5432:5432"       # expose DB port for local clients`}</code></pre>

      <h3 style={h3Style}>Production override (docker-compose.prod.yml)</h3>
      <pre style={codeBlockStyle}><code>{`# docker-compose.prod.yml — production layer
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"`}</code></pre>

      <pre style={codeBlockStyle}><code>{`# Use production override explicitly:
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Merge order: later files win for scalars, arrays are concatenated`}</code></pre>

      <h3 style={h3Style}>Merge Behavior</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Key Type</th>
              <th style={thStyle}>Merge Behavior</th>
              <th style={thStyle}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>Scalars (image, command)</td><td style={tdStyle}>Later file replaces earlier value</td><td style={tdStyle}>prod image tag overrides dev</td></tr>
            <tr><td style={tdStyle}>Arrays (ports, volumes)</td><td style={tdStyle}>Arrays are concatenated</td><td style={tdStyle}>All ports from both files are added</td></tr>
            <tr><td style={tdStyle}>Maps (environment)</td><td style={tdStyle}>Keys are merged; later wins for conflicts</td><td style={tdStyle}>Override can add or change env vars</td></tr>
          </tbody>
        </table>
      </div>

      {/* ── Section 11: Common Commands ───────────────────────────────────── */}
      <h2 style={h2Style}>Common Docker Compose Commands</h2>
      <p style={pStyle}>
        Here are the commands you will use daily, grouped by workflow:
      </p>

      <h3 style={h3Style}>Starting and Stopping</h3>
      <pre style={codeBlockStyle}><code>{`# Start all services in the background
docker compose up -d

# Start with forced rebuild
docker compose up -d --build

# Start specific services only
docker compose up -d web db

# Stop all services (keeps containers and volumes)
docker compose stop

# Stop and remove containers (keeps volumes and images)
docker compose down

# Stop, remove containers, volumes, AND networks
docker compose down -v

# Remove everything including images
docker compose down -v --rmi all`}</code></pre>

      <h3 style={h3Style}>Inspecting Services</h3>
      <pre style={codeBlockStyle}><code>{`# List running services and their status
docker compose ps

# List all (including stopped) services
docker compose ps -a

# View logs for all services
docker compose logs

# Follow logs in real time
docker compose logs -f

# Follow logs for a specific service
docker compose logs -f web

# Tail last 100 lines
docker compose logs --tail=100 web`}</code></pre>

      <h3 style={h3Style}>Executing Commands</h3>
      <pre style={codeBlockStyle}><code>{`# Open an interactive shell in a running container
docker compose exec web sh
docker compose exec web bash

# Run a one-off command (creates a new container, removes on exit)
docker compose run --rm web npm run migrate
docker compose run --rm web npx prisma db push

# Run as a specific user
docker compose exec --user node web sh

# Copy a file from container to host
docker compose cp web:/app/logs/error.log ./error.log`}</code></pre>

      <h3 style={h3Style}>Managing Images and Builds</h3>
      <pre style={codeBlockStyle}><code>{`# Build or rebuild images
docker compose build

# Build a specific service
docker compose build web

# Build without cache
docker compose build --no-cache web

# Pull latest images
docker compose pull

# List images used by services
docker compose images`}</code></pre>

      <h3 style={h3Style}>Scaling and Restarting</h3>
      <pre style={codeBlockStyle}><code>{`# Scale a service to N replicas (no resource limits needed)
docker compose up -d --scale worker=3

# Restart all services
docker compose restart

# Restart a single service
docker compose restart web

# View resource usage
docker compose top`}</code></pre>

      {/* ── Section 12: Multi-Stage Builds with Compose ───────────────────── */}
      <h2 style={h2Style}>Multi-Stage Builds with Docker Compose</h2>
      <p style={pStyle}>
        Multi-stage builds reduce image sizes significantly by separating build dependencies from
        the final runtime image. Docker Compose works seamlessly with multi-stage Dockerfiles via
        the <code style={inlineCodeStyle}>target</code> build argument.
      </p>

      <h3 style={h3Style}>Multi-Stage Dockerfile</h3>
      <pre style={codeBlockStyle}><code>{`# Dockerfile
# ── Stage 1: Install dependencies ────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ── Stage 2: Build the application ───────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 3: Development server ───────────────────────
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Stage 4: Production runner ────────────────────────
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]`}</code></pre>

      <h3 style={h3Style}>Compose targeting specific stages</h3>
      <pre style={codeBlockStyle}><code>{`# docker-compose.yml (base)
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: production     # use production stage
    image: myapp:latest`}</code></pre>

      <pre style={codeBlockStyle}><code>{`# docker-compose.override.yml (auto-merged in development)
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      target: development    # overrides to dev stage
      args:
        NODE_ENV: development
    image: myapp:dev
    volumes:
      - .:/app
      - /app/node_modules`}</code></pre>

      <h3 style={h3Style}>Build args and secrets</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NODE_ENV: production
        BUILD_DATE: \${BUILD_DATE}      # from shell env
        GIT_SHA: \${GIT_SHA}
      # BuildKit secret (doesn't leak into image layers)
      secrets:
        - npm_token

secrets:
  npm_token:
    environment: NPM_TOKEN            # reads from host shell`}</code></pre>

      {/* ── Section 13: Production Best Practices ────────────────────────── */}
      <h2 style={h2Style}>Production Best Practices</h2>
      <p style={pStyle}>
        Docker Compose is well-suited for single-host production deployments. Follow these practices
        to make your Compose-based production deployment reliable, secure, and maintainable.
      </p>

      <h3 style={h3Style}>1. Pin Image Tags</h3>
      <pre style={codeBlockStyle}><code>{`# BAD: floating tags break reproducibility
services:
  db:
    image: postgres:latest    # changes unexpectedly
  cache:
    image: redis              # same as :latest

# GOOD: pin to a specific version
services:
  db:
    image: postgres:16.2-alpine  # exact patch version
  cache:
    image: redis:7.2-alpine`}</code></pre>

      <h3 style={h3Style}>2. Restart Policies</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    restart: unless-stopped   # restart unless explicitly stopped
  db:
    restart: unless-stopped
  worker:
    restart: on-failure       # only restart on error exit codes
    # restart: always         # restart even on docker daemon restart`}</code></pre>

      <h3 style={h3Style}>3. Resource Limits</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 128M`}</code></pre>

      <h3 style={h3Style}>4. Logging Configuration</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    logging:
      driver: json-file
      options:
        max-size: "10m"    # rotate when file reaches 10MB
        max-file: "5"      # keep 5 rotated files`}</code></pre>

      <h3 style={h3Style}>5. Read-Only Containers</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    image: myapp:latest
    read_only: true            # filesystem is read-only
    tmpfs:
      - /tmp                   # allow writes to /tmp only
      - /var/run`}</code></pre>

      <h3 style={h3Style}>6. Security: Drop Capabilities</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    image: myapp:latest
    cap_drop:
      - ALL                    # drop all Linux capabilities
    cap_add:
      - NET_BIND_SERVICE       # only add what you need
    security_opt:
      - no-new-privileges:true`}</code></pre>

      <h3 style={h3Style}>7. Health Checks in Production</h3>
      <pre style={codeBlockStyle}><code>{`services:
  web:
    image: myapp:latest
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s   # longer grace period in production`}</code></pre>

      <h3 style={h3Style}>8. Secrets Management</h3>
      <pre style={codeBlockStyle}><code>{`# Using Docker Secrets (Swarm mode) or env files
services:
  db:
    image: postgres:16-alpine
    secrets:
      - db_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password

secrets:
  db_password:
    file: ./secrets/db_password.txt  # not committed to git
    # external: true                 # reference externally created secret`}</code></pre>

      <h3 style={h3Style}>Complete Production Example</h3>
      <pre style={codeBlockStyle}><code>{`# docker-compose.prod.yml — production ready
services:
  nginx:
    image: nginx:1.27-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - static_files:/var/www/static:ro
    depends_on:
      web:
        condition: service_healthy
    restart: unless-stopped
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"

  web:
    image: myapp:1.5.2       # pinned version
    env_file: .env.prod
    volumes:
      - static_files:/app/public
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "5"

  db:
    image: postgres:16.2-alpine
    volumes:
      - db_data:/var/lib/postgresql/data
    env_file: .env.prod
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER} -d \${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 2G

volumes:
  db_data:
  static_files:`}</code></pre>

      {/* ── CTA Box ───────────────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          Generate docker-compose.yml Instantly
        </p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: 15 }}>
          Select services visually, configure options, and get a production-ready
          <code style={inlineCodeStyle}>docker-compose.yml</code> in seconds. Free, no signup.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Open Docker Compose Generator
        </Link>
      </div>

      {/* ── Section 14: Debugging Tips ────────────────────────────────────── */}
      <h2 style={h2Style}>Debugging Docker Compose Issues</h2>

      <h3 style={h3Style}>Validate your Compose file</h3>
      <pre style={codeBlockStyle}><code>{`# Check syntax and print the merged config
docker compose config

# Validate without printing
docker compose config -q && echo "Config is valid"`}</code></pre>

      <h3 style={h3Style}>Common error: port already in use</h3>
      <pre style={codeBlockStyle}><code>{`Error: Bind for 0.0.0.0:5432 failed: port is already allocated

# Find what's using the port:
lsof -i :5432
# or
ss -tulpn | grep 5432

# Kill the process or change the host port in docker-compose.yml:
ports:
  - "5433:5432"    # map to a different host port`}</code></pre>

      <h3 style={h3Style}>Common error: container exiting immediately</h3>
      <pre style={codeBlockStyle}><code>{`# Check logs for the crashed container
docker compose logs web

# Run interactively to debug
docker compose run --rm web sh

# Check exit code
docker compose ps -a`}</code></pre>

      <h3 style={h3Style}>Inspect the merged configuration</h3>
      <pre style={codeBlockStyle}><code>{`# See exact configuration after all overrides are merged
docker compose -f docker-compose.yml -f docker-compose.override.yml config

# Useful for debugging profile interactions
docker compose --profile dev config`}</code></pre>

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What is the top-level structure of a docker-compose.yml file?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          A docker-compose.yml file has four top-level keys: <code style={inlineCodeStyle}>version</code> (optional
          since Compose V2), <code style={inlineCodeStyle}>services</code> (required), <code style={inlineCodeStyle}>networks</code> (optional),
          and <code style={inlineCodeStyle}>volumes</code> (optional). The services section is where you define
          each container with its image, ports, environment, volumes, and other settings.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What is the difference between named volumes and bind mounts?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Named volumes (e.g. <code style={inlineCodeStyle}>db_data:/var/lib/postgresql/data</code>) are managed by
          Docker and stored in <code style={inlineCodeStyle}>/var/lib/docker/volumes/</code>. They persist across
          restarts and are recommended for production databases. Bind mounts (e.g. <code style={inlineCodeStyle}>./src:/app/src</code>) map
          a host path into the container, ideal for development hot-reloading. Never use bind mounts for
          database data in production.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>How does depends_on with condition: service_healthy work?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          The long-form <code style={inlineCodeStyle}>depends_on</code> with <code style={inlineCodeStyle}>condition: service_healthy</code> makes
          Compose wait until the dependency&apos;s healthcheck reports healthy before starting the dependent service.
          You must define a <code style={inlineCodeStyle}>healthcheck</code> on the dependency. Without
          <code style={inlineCodeStyle}>service_healthy</code>, <code style={inlineCodeStyle}>depends_on</code> only
          controls start order but does not wait for readiness.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>How do I use .env files with Docker Compose?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Docker Compose automatically loads a <code style={inlineCodeStyle}>.env</code> file from the project
          directory. Variables there are available for substitution in the Compose file using
          <code style={inlineCodeStyle}>${'{VAR_NAME}'}</code> syntax. Use the <code style={inlineCodeStyle}>env_file</code> key
          to load variables directly into a container&apos;s environment. Always add <code style={inlineCodeStyle}>.env</code> to
          <code style={inlineCodeStyle}>.gitignore</code> to prevent committing secrets.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What are Docker Compose profiles and how do I activate them?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Profiles let you define optional services that only start when explicitly requested. Assign
          a profile with <code style={inlineCodeStyle}>profiles: [dev]</code>. Activate with
          <code style={inlineCodeStyle}>docker compose --profile dev up</code> or set
          <code style={inlineCodeStyle}>COMPOSE_PROFILES=dev</code>. Services with no profile always start.
          Common uses: debug tools, monitoring agents, mock services, test databases.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What is docker-compose.override.yml?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Compose automatically merges <code style={inlineCodeStyle}>docker-compose.override.yml</code> on top
          of <code style={inlineCodeStyle}>docker-compose.yml</code>. It is typically gitignored and contains
          developer-specific settings like bind mounts, extra ports, or debug commands. Arrays are
          concatenated; scalars in the override file replace the base file value.
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What Docker Compose commands should I know?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Essential commands: <code style={inlineCodeStyle}>docker compose up -d</code> (start),
          <code style={inlineCodeStyle}>docker compose down</code> (stop and remove),
          <code style={inlineCodeStyle}>docker compose logs -f</code> (follow logs),
          <code style={inlineCodeStyle}>docker compose exec service sh</code> (shell access),
          <code style={inlineCodeStyle}>docker compose ps</code> (status),
          <code style={inlineCodeStyle}>docker compose build</code> (rebuild images),
          <code style={inlineCodeStyle}>docker compose run --rm service cmd</code> (one-off task),
          <code style={inlineCodeStyle}>docker compose config</code> (validate file).
        </p>
      </div>

      <div style={faqItemStyle}>
        <p style={{ fontWeight: 700, marginBottom: 8 }}>What are production best practices for Docker Compose?</p>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>
          Pin image tags (never <code style={inlineCodeStyle}>:latest</code>), set
          <code style={inlineCodeStyle}>restart: unless-stopped</code>, define resource limits under
          <code style={inlineCodeStyle}>deploy.resources</code>, add health checks to all services,
          use <code style={inlineCodeStyle}>env_file</code> instead of hardcoding secrets, configure
          <code style={inlineCodeStyle}>json-file</code> logging with size limits, use named volumes for
          persistent data, and separate dev/prod configs with override files.
        </p>
      </div>

      {/* ── Summary ────────────────────────────────────────────────────────── */}
      <h2 style={h2Style}>Summary</h2>
      <p style={pStyle}>
        Docker Compose is an essential tool for any developer working with containerized applications.
        With a single <code style={inlineCodeStyle}>docker-compose.yml</code> file, you can define
        complex multi-service stacks with databases, caches, reverse proxies, and background workers.
      </p>
      <ul style={ulStyle}>
        <li><strong>Structure:</strong> Four top-level keys — services, networks, volumes, version</li>
        <li><strong>Services:</strong> Define web, db, and cache containers with image, ports, env, volumes</li>
        <li><strong>Environment:</strong> Use <code style={inlineCodeStyle}>.env</code> for substitution,
          <code style={inlineCodeStyle}>env_file</code> for container injection</li>
        <li><strong>Networking:</strong> Services reach each other by name; use custom networks for isolation</li>
        <li><strong>Volumes:</strong> Named volumes for persistence, bind mounts for dev hot-reload</li>
        <li><strong>Health checks:</strong> Use with <code style={inlineCodeStyle}>depends_on: condition: service_healthy</code> for true readiness</li>
        <li><strong>Profiles:</strong> Selectively start optional services with <code style={inlineCodeStyle}>profiles: [name]</code></li>
        <li><strong>Override files:</strong> Layer dev settings on top of a committed base config</li>
        <li><strong>Production:</strong> Pin tags, set restart policies, limits, health checks, and external secrets</li>
      </ul>
      <p style={pStyle}>
        Ready to build your stack? Use the{' '}
        <Link href={toolLink} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
          Docker Compose Generator
        </Link>{' '}
        to visually configure services and get a ready-to-use <code style={inlineCodeStyle}>docker-compose.yml</code> in seconds.
        Or explore related guides: the{' '}
        <Link href={`/${lang}/blog/docker-compose-yaml-errors`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
          Docker Compose YAML errors guide
        </Link>{' '}
        and{' '}
        <Link href={`/${lang}/blog/docker-volumes-bind-mounts-guide`} style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
          Docker volumes and bind mounts deep dive
        </Link>.
      </p>
    </article>
  );
}
