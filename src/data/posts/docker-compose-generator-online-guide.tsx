'use client';

import Link from 'next/link';

/* -------------------------------------------------------------------------- */
/*  Docker Compose Generator -- Build docker-compose.yml Online Guide         */
/* -------------------------------------------------------------------------- */

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
  background: 'var(--bg-input)',
  border: '1px solid var(--border-color)',
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

export default function DockerComposeGeneratorOnlineGuide({ lang }: { lang: string }) {
  const toolLink = `/${lang}/tools/docker-compose-generator`;

  const faqData = [
    {
      q: 'What is a Docker Compose generator and why should I use one?',
      a: 'A Docker Compose generator is an online tool that helps you visually build docker-compose.yml files without memorizing YAML syntax. It prevents indentation errors, validates service configurations in real time, and produces production-ready Compose files in seconds. Using a generator is especially valuable for beginners learning Docker and for experienced developers who want to scaffold new projects quickly.',
    },
    {
      q: 'What is the difference between Compose file version 2 and version 3?',
      a: 'Version 2 was designed for single-host Docker Engine with features like depends_on conditions (service_healthy), resource limits under the service key, and variable substitution. Version 3 was introduced for Docker Swarm compatibility and moved resource constraints into the deploy section. Since Docker Compose V2 (the Go rewrite), the version field is optional and Compose merges features from both schemas automatically.',
    },
    {
      q: 'How do I pass environment variables to containers in Docker Compose?',
      a: 'There are four ways: 1) Inline with the environment key using KEY=value pairs. 2) Reference an external file with env_file pointing to a .env file. 3) Use variable substitution like ${VAR_NAME} which reads from the host shell or a .env file in the project directory. 4) Use Docker secrets for sensitive values in production. The .env file in the same directory as docker-compose.yml is loaded automatically by Compose.',
    },
    {
      q: 'How does depends_on work and can it wait for a service to be healthy?',
      a: 'The depends_on key controls startup order. In its simple form (a list of service names) it only ensures containers start in order, not that they are ready. To wait for actual readiness, use the long-form syntax with condition: service_healthy combined with a healthcheck on the dependency. For example, depends_on: db: condition: service_healthy makes the app wait until the database healthcheck passes.',
    },
    {
      q: 'What are Docker Compose profiles and when should I use them?',
      a: 'Profiles let you selectively start services. You assign profiles to services using the profiles key, and only services with no profile or a matching active profile start by default. Activate profiles with --profile flag or the COMPOSE_PROFILES environment variable. Common use cases include separating debug tools, monitoring stacks, or test databases from the core application services.',
    },
    {
      q: 'How do I use multiple Compose files and override files?',
      a: 'Docker Compose automatically merges docker-compose.yml with docker-compose.override.yml if it exists. You can also specify multiple files with -f flags: docker compose -f docker-compose.yml -f docker-compose.prod.yml up. Later files override earlier ones. This pattern is ideal for maintaining a base config for development and layering production settings like resource limits, restart policies, and external networks on top.',
    },
    {
      q: 'Should I use Docker Compose in production?',
      a: 'Docker Compose works well for single-host production deployments, small to medium applications, and CI/CD pipelines. For production, pin image tags, set restart policies, define resource limits, use health checks, externalize secrets, and configure logging drivers. For multi-host or high-availability needs, consider Kubernetes or Docker Swarm. Many teams use Compose for development and staging while running Kubernetes in production.',
    },
    {
      q: 'How do I generate a docker-compose.yml file online?',
      a: 'Use the free Docker Compose Generator tool on DevToolBox. Select services like PostgreSQL, Redis, or Nginx from the interface, configure ports, volumes, environment variables, and networks visually, then copy the generated YAML. The tool validates your configuration and produces well-formatted, production-ready docker-compose.yml files that you can download or paste directly into your project.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TL;DR ────────────────────────────────────────────────────────── */}
      <div style={tldrBoxStyle}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: '#0369a1' }}>
          TL;DR
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#0c4a6e', margin: 0 }}>
          A <strong>Docker Compose generator</strong> lets you visually build{' '}
          <code style={inlineCodeStyle}>docker-compose.yml</code> files without writing YAML
          by hand. This guide covers every aspect of Docker Compose: file structure,
          services, networks, volumes, environment variables, health checks, dependency
          management, profiles, override files, common multi-service patterns, and
          production best practices. Use our free{' '}
          <Link href={toolLink} style={{ color: '#0369a1', textDecoration: 'underline' }}>
            Docker Compose Generator
          </Link>{' '}
          to scaffold your next project in seconds.
        </p>
      </div>

      {/* ── Key Takeaways ────────────────────────────────────────────────── */}
      <div style={keyTakeawaysStyle}>
        <p style={{ fontWeight: 700, fontSize: 17, marginBottom: 12, color: 'var(--text-primary)' }}>
          Key Takeaways
        </p>
        <ul style={{ ...ulStyle, margin: 0 }}>
          <li>Docker Compose defines multi-container applications in a single YAML file with services, networks, and volumes.</li>
          <li>The Compose V2 CLI (<code style={inlineCodeStyle}>docker compose</code>) replaces the legacy Python-based <code style={inlineCodeStyle}>docker-compose</code> tool.</li>
          <li>Use <code style={inlineCodeStyle}>depends_on</code> with <code style={inlineCodeStyle}>condition: service_healthy</code> to wait for real readiness, not just container start.</li>
          <li>Profiles let you selectively enable services like debug tools or monitoring without separate Compose files.</li>
          <li>Override files (<code style={inlineCodeStyle}>docker-compose.override.yml</code>) keep your base config clean while layering environment-specific settings.</li>
          <li>For production: pin image tags, set restart policies, limit resources, enable health checks, and externalize secrets.</li>
          <li>An online Docker Compose generator eliminates YAML indentation errors and scaffolds projects in seconds.</li>
        </ul>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
          Build Your docker-compose.yml Online
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Skip the YAML headaches. Visually configure services, volumes, and networks then copy the result.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            padding: '10px 28px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Open Docker Compose Generator
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. What Is Docker Compose?                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>1. What Is Docker Compose?</h2>
      <p style={pStyle}>
        Docker Compose is a tool for defining and running multi-container Docker
        applications. Instead of managing individual <code style={inlineCodeStyle}>docker run</code>{' '}
        commands with lengthy flags, you describe your entire application stack in a
        declarative YAML file called <code style={inlineCodeStyle}>docker-compose.yml</code>.
        A single command&mdash;<code style={inlineCodeStyle}>docker compose up</code>&mdash;creates
        and starts all the services, networks, and volumes your application needs.
      </p>
      <p style={pStyle}>
        Compose is used everywhere: local development environments, CI/CD pipelines,
        staging servers, and even single-host production deployments. It bridges the gap
        between running one container at a time and orchestrating dozens of services
        with Kubernetes.
      </p>

      <h3 style={h3Style}>Why Use an Online Docker Compose Generator?</h3>
      <p style={pStyle}>
        YAML is notoriously sensitive to indentation. A single misplaced space can break
        your entire stack. A Docker Compose generator provides a visual interface where
        you select services, configure ports, volumes, and environment variables, then
        export a valid, well-formatted <code style={inlineCodeStyle}>docker-compose.yml</code>{' '}
        file. Benefits include:
      </p>
      <ul style={ulStyle}>
        <li>Zero YAML syntax errors&mdash;the generator handles formatting automatically.</li>
        <li>Pre-built templates for popular services like PostgreSQL, MySQL, Redis, Nginx, and more.</li>
        <li>Real-time validation of port mappings, volume mounts, and network configurations.</li>
        <li>Quick scaffolding for new projects&mdash;go from idea to running stack in minutes.</li>
        <li>Learning aid&mdash;see how visual choices translate to YAML syntax.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. Docker Compose File Structure                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>2. Docker Compose File Structure</h2>
      <p style={pStyle}>
        Every <code style={inlineCodeStyle}>docker-compose.yml</code> file is built around
        four top-level keys. Understanding this structure is essential before using any
        generator or writing Compose files by hand.
      </p>
      <pre style={codeBlockStyle}>
        <code>{`# docker-compose.yml — top-level structure
services:      # Define your application containers
  web:
    image: nginx:alpine
  api:
    build: ./api
  db:
    image: postgres:16

volumes:       # Declare persistent storage
  db-data:

networks:      # Define custom networks
  frontend:
  backend:

configs:       # (Optional) External configuration files
  nginx-conf:
    file: ./nginx.conf`}</code>
      </pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> The <code style={inlineCodeStyle}>version</code> field at the
        top of the file is no longer required since Docker Compose V2. Compose
        automatically detects and merges features from all schema versions.
      </div>

      <h3 style={h3Style}>Top-Level Keys Explained</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Purpose</th>
            <th style={thStyle}>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>services</code></td><td style={tdStyle}>Defines each container (image, build, ports, env, volumes, etc.)</td><td style={tdStyle}>Yes</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>volumes</code></td><td style={tdStyle}>Declares named volumes for persistent data</td><td style={tdStyle}>No</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>networks</code></td><td style={tdStyle}>Creates custom networks for service isolation</td><td style={tdStyle}>No</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>configs</code></td><td style={tdStyle}>Mounts configuration files into containers</td><td style={tdStyle}>No</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>secrets</code></td><td style={tdStyle}>Manages sensitive data like passwords and API keys</td><td style={tdStyle}>No</td></tr>
        </tbody>
      </table>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. Defining Services                                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>3. Defining Services</h2>
      <p style={pStyle}>
        Services are the heart of any Compose file. Each service becomes one or more
        running containers. Here is a complete reference of the most important service
        options.
      </p>

      <h3 style={h3Style}>Image vs Build</h3>
      <p style={pStyle}>
        You can either pull a pre-built image or build from a Dockerfile:
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  # Pull from Docker Hub
  redis:
    image: redis:7-alpine

  # Build from local Dockerfile
  api:
    build: ./api

  # Build with advanced options
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        NODE_ENV: production
        NEXT_PUBLIC_API_URL: https://api.example.com
      target: runner            # Multi-stage build target
      cache_from:
        - myapp-frontend:cache`}</code>
      </pre>

      <h3 style={h3Style}>Port Mapping</h3>
      <p style={pStyle}>
        Expose container ports to the host with the <code style={inlineCodeStyle}>ports</code> key.
        The format is <code style={inlineCodeStyle}>HOST:CONTAINER</code>:
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"                   # HTTP
      - "443:443"                 # HTTPS
      - "127.0.0.1:8080:80"      # Bind to localhost only
      - "3000-3005:3000-3005"     # Port range

  api:
    build: ./api
    ports:
      - "3000:3000"
    expose:
      - "9229"                    # Expose to other services only (debug port)`}</code>
      </pre>

      <div style={warningBoxStyle}>
        <strong>Warning:</strong> Avoid binding to <code style={inlineCodeStyle}>0.0.0.0</code>{' '}
        in production for internal services. Use <code style={inlineCodeStyle}>127.0.0.1:PORT:PORT</code>{' '}
        or rely on Docker networks for inter-service communication instead.
      </div>

      <h3 style={h3Style}>Restart Policies</h3>
      <p style={pStyle}>
        Control what happens when a container exits:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Policy</th>
            <th style={thStyle}>Behavior</th>
            <th style={thStyle}>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>no</code></td><td style={tdStyle}>Never restart (default)</td><td style={tdStyle}>One-off tasks, debugging</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>always</code></td><td style={tdStyle}>Always restart, even on clean exit</td><td style={tdStyle}>Critical services that must always run</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>unless-stopped</code></td><td style={tdStyle}>Restart unless manually stopped</td><td style={tdStyle}>Most production services</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>on-failure</code></td><td style={tdStyle}>Restart only on non-zero exit code</td><td style={tdStyle}>Workers, batch jobs</td></tr>
        </tbody>
      </table>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    image: myapp:latest
    restart: unless-stopped

  worker:
    image: myapp:latest
    command: ["node", "worker.js"]
    restart: on-failure`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. Environment Variables                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>4. Environment Variables</h2>
      <p style={pStyle}>
        Environment variables are the primary way to configure containers. Docker Compose
        supports multiple approaches, each suited to different use cases.
      </p>

      <h3 style={h3Style}>Inline Environment</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    image: myapp:latest
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: "5432"
      DB_NAME: myapp
      LOG_LEVEL: info`}</code>
      </pre>

      <h3 style={h3Style}>Using env_file</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    image: myapp:latest
    env_file:
      - .env                    # Loaded first
      - .env.production         # Overrides values from .env

# .env file format:
# DB_HOST=localhost
# DB_PORT=5432
# DB_PASSWORD=secret123`}</code>
      </pre>

      <h3 style={h3Style}>Variable Substitution</h3>
      <p style={pStyle}>
        Compose reads a <code style={inlineCodeStyle}>.env</code> file in the project root
        automatically and substitutes variables in the YAML:
      </p>
      <pre style={codeBlockStyle}>
        <code>{`# .env
POSTGRES_VERSION=16
APP_PORT=3000

# docker-compose.yml
services:
  db:
    image: postgres:\${POSTGRES_VERSION}
  api:
    ports:
      - "\${APP_PORT:-3000}:3000"     # Default to 3000 if not set`}</code>
      </pre>

      <div style={tipBoxStyle}>
        <strong>Best practice:</strong> Keep secrets out of{' '}
        <code style={inlineCodeStyle}>docker-compose.yml</code>. Use{' '}
        <code style={inlineCodeStyle}>env_file</code> for non-sensitive config and Docker
        secrets or a vault for passwords, API keys, and tokens.
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. Volumes                                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>5. Volumes: Persistent Data</h2>
      <p style={pStyle}>
        Volumes persist data beyond the lifecycle of a container. Without them, all data
        inside a container is lost when it stops or is recreated.
      </p>

      <h3 style={h3Style}>Named Volumes vs Bind Mounts</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  db:
    image: postgres:16
    volumes:
      # Named volume — managed by Docker, persists across restarts
      - db-data:/var/lib/postgresql/data

      # Bind mount — maps a host directory into the container
      - ./init-scripts:/docker-entrypoint-initdb.d

      # Read-only bind mount
      - ./pg-config/postgresql.conf:/etc/postgresql/postgresql.conf:ro

volumes:
  db-data:             # Declaration required for named volumes
    driver: local`}</code>
      </pre>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Named Volume</th>
            <th style={thStyle}>Bind Mount</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Managed by</td><td style={tdStyle}>Docker Engine</td><td style={tdStyle}>Host filesystem</td></tr>
          <tr><td style={tdStyle}>Portability</td><td style={tdStyle}>High (works on any host)</td><td style={tdStyle}>Low (path must exist)</td></tr>
          <tr><td style={tdStyle}>Performance</td><td style={tdStyle}>Better on macOS/Windows</td><td style={tdStyle}>Native on Linux</td></tr>
          <tr><td style={tdStyle}>Use case</td><td style={tdStyle}>Database storage, persistent data</td><td style={tdStyle}>Development hot-reload, config files</td></tr>
          <tr><td style={tdStyle}>Survives <code style={inlineCodeStyle}>docker compose down</code></td><td style={tdStyle}>Yes</td><td style={tdStyle}>Yes (data stays on host)</td></tr>
          <tr><td style={tdStyle}>Removed by <code style={inlineCodeStyle}>down -v</code></td><td style={tdStyle}>Yes</td><td style={tdStyle}>No</td></tr>
        </tbody>
      </table>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. Networks                                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>6. Networks: Service Communication</h2>
      <p style={pStyle}>
        By default, Docker Compose creates a single network for all services. Services
        can reach each other using their service name as a hostname. Custom networks let
        you isolate groups of services for security or clarity.
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  web:
    image: nginx:alpine
    networks:
      - frontend

  api:
    build: ./api
    networks:
      - frontend       # Can talk to web
      - backend        # Can talk to db

  db:
    image: postgres:16
    networks:
      - backend        # Isolated from web

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true     # No external access`}</code>
      </pre>

      <div style={tipBoxStyle}>
        <strong>Tip:</strong> Use <code style={inlineCodeStyle}>internal: true</code> on
        backend networks to prevent containers from accessing the internet. This is a
        simple but effective security measure for database and cache services.
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. Health Checks                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>7. Health Checks</h2>
      <p style={pStyle}>
        Health checks let Docker monitor whether a service is actually ready to accept
        traffic, not just running. They are critical for reliable dependency management
        with <code style={inlineCodeStyle}>depends_on</code>.
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s       # Check every 10 seconds
      timeout: 5s         # Fail if no response in 5s
      retries: 5          # Mark unhealthy after 5 failures
      start_period: 30s   # Grace period on startup

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 3

  api:
    build: ./api
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 10s`}</code>
      </pre>

      <h3 style={h3Style}>Common Health Check Commands</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Service</th>
            <th style={thStyle}>Health Check Command</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>PostgreSQL</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>pg_isready -U postgres</code></td></tr>
          <tr><td style={tdStyle}>MySQL</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>mysqladmin ping -h localhost</code></td></tr>
          <tr><td style={tdStyle}>Redis</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>redis-cli ping</code></td></tr>
          <tr><td style={tdStyle}>MongoDB</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>mongosh --eval &quot;db.adminCommand(&apos;ping&apos;)&quot;</code></td></tr>
          <tr><td style={tdStyle}>Elasticsearch</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>curl -f http://localhost:9200/_cluster/health</code></td></tr>
          <tr><td style={tdStyle}>HTTP API</td><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>curl -f http://localhost:PORT/health || exit 1</code></td></tr>
        </tbody>
      </table>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. Dependency Management                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>8. Dependency Management with depends_on</h2>
      <p style={pStyle}>
        The <code style={inlineCodeStyle}>depends_on</code> key controls the order in which
        services start. The simple list form only guarantees start order, not readiness.
        For true readiness, combine it with health checks.
      </p>

      <h3 style={h3Style}>Simple Form (Start Order Only)</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    build: ./api
    depends_on:
      - db
      - redis
  db:
    image: postgres:16
  redis:
    image: redis:7-alpine`}</code>
      </pre>

      <h3 style={h3Style}>Long Form with Health Conditions</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    build: ./api
    depends_on:
      db:
        condition: service_healthy     # Wait for DB healthcheck to pass
        restart: true                  # Restart api if db restarts
      redis:
        condition: service_healthy
      migrations:
        condition: service_completed_successfully  # Wait for one-off task

  db:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 5

  migrations:
    build: ./api
    command: ["npm", "run", "migrate"]
    depends_on:
      db:
        condition: service_healthy`}</code>
      </pre>

      <div style={warningBoxStyle}>
        <strong>Important:</strong> The <code style={inlineCodeStyle}>condition: service_healthy</code>{' '}
        syntax requires that the dependency service has a <code style={inlineCodeStyle}>healthcheck</code>{' '}
        defined. Without it, Compose will error with a &quot;has no healthcheck&quot; message.
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 9. Common Patterns                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>9. Common Docker Compose Patterns</h2>
      <p style={pStyle}>
        Below are production-tested patterns you can generate with our tool or adapt for
        your own projects.
      </p>

      <h3 style={h3Style}>Pattern 1: Web + API + Database + Cache</h3>
      <p style={pStyle}>
        The most common full-stack setup: a reverse proxy, an application server, a
        database, and a cache layer.
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
    depends_on:
      api:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - frontend

  api:
    build:
      context: ./api
      target: production
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://app:secret@db:5432/myapp
      REDIS_URL: redis://redis:6379
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - frontend
      - backend

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d myapp"]
      interval: 10s
      retries: 5
    restart: unless-stopped
    networks:
      - backend

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      retries: 3
    restart: unless-stopped
    networks:
      - backend

volumes:
  db-data:
  redis-data:

networks:
  frontend:
  backend:
    internal: true`}</code>
      </pre>

      <h3 style={h3Style}>Pattern 2: Full-Stack JavaScript (Next.js + PostgreSQL + Redis)</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://dev:devpass@db:5432/nextapp
      REDIS_URL: redis://redis:6379
      NEXTAUTH_SECRET: your-secret-here
      NEXTAUTH_URL: http://localhost:3000
    volumes:
      - .:/app                   # Hot reload in development
      - /app/node_modules        # Exclude node_modules from bind mount
      - /app/.next               # Exclude .next build cache
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: nextapp
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: devpass
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 5s
      retries: 10

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 5

volumes:
  pgdata:`}</code>
      </pre>

      <h3 style={h3Style}>Pattern 3: WordPress + MySQL + phpMyAdmin</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  wordpress:
    image: wordpress:6-apache
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wp-content:/var/www/html/wp-content
    depends_on:
      mysql:
        condition: service_healthy
    restart: unless-stopped

  mysql:
    image: mysql:8
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wp
      MYSQL_PASSWORD: wppass
      MYSQL_ROOT_PASSWORD: rootpass
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
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
      mysql:
        condition: service_healthy

volumes:
  wp-content:
  mysql-data:`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. Compose V2 vs V3 (Legacy Versions)                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>10. Compose File Versions: V2 vs V3</h2>
      <p style={pStyle}>
        Docker Compose historically used a <code style={inlineCodeStyle}>version</code> field
        to specify the file format. Understanding the differences helps when reading
        older Compose files or migrating legacy projects.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Version 2.x</th>
            <th style={thStyle}>Version 3.x</th>
            <th style={thStyle}>Current (no version field)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Target</td><td style={tdStyle}>Docker Engine (single host)</td><td style={tdStyle}>Docker Swarm</td><td style={tdStyle}>Both</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>depends_on</code> conditions</td><td style={tdStyle}>Supported</td><td style={tdStyle}>Not supported</td><td style={tdStyle}>Supported</td></tr>
          <tr><td style={tdStyle}>Resource limits</td><td style={tdStyle}>Under service key</td><td style={tdStyle}>Under <code style={inlineCodeStyle}>deploy</code></td><td style={tdStyle}>Both locations</td></tr>
          <tr><td style={tdStyle}><code style={inlineCodeStyle}>version</code> field</td><td style={tdStyle}>Required</td><td style={tdStyle}>Required</td><td style={tdStyle}>Optional (deprecated)</td></tr>
          <tr><td style={tdStyle}>CLI tool</td><td style={tdStyle}><code style={inlineCodeStyle}>docker-compose</code> (Python)</td><td style={tdStyle}><code style={inlineCodeStyle}>docker-compose</code></td><td style={tdStyle}><code style={inlineCodeStyle}>docker compose</code> (Go)</td></tr>
        </tbody>
      </table>

      <div style={tipBoxStyle}>
        <strong>Recommendation:</strong> For new projects, omit the{' '}
        <code style={inlineCodeStyle}>version</code> field entirely and use the latest{' '}
        <code style={inlineCodeStyle}>docker compose</code> (V2 CLI). This gives you access
        to all features from both legacy version schemas.
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 11. Docker Compose Profiles                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>11. Docker Compose Profiles</h2>
      <p style={pStyle}>
        Profiles let you include optional services that only start when explicitly
        activated. This keeps your default <code style={inlineCodeStyle}>docker compose up</code>{' '}
        lean while allowing access to debug tools, monitoring, or testing services on
        demand.
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    build: ./api
    # No profiles = always starts

  db:
    image: postgres:16
    # No profiles = always starts

  # Only starts with --profile debug
  pgadmin:
    image: dpage/pgadmin4
    ports:
      - "5050:80"
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@local.dev
      PGADMIN_DEFAULT_PASSWORD: admin
    profiles:
      - debug

  # Only starts with --profile monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
    profiles:
      - monitoring

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    profiles:
      - monitoring

  # Only starts with --profile test
  test-runner:
    build: ./api
    command: ["npm", "test"]
    profiles:
      - test`}</code>
      </pre>
      <pre style={codeBlockStyle}>
        <code>{`# Start only core services
docker compose up -d

# Start core + debug tools
docker compose --profile debug up -d

# Start core + monitoring
docker compose --profile monitoring up -d

# Start everything
docker compose --profile debug --profile monitoring up -d

# Or use environment variable
COMPOSE_PROFILES=debug,monitoring docker compose up -d`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 12. Override Files                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>12. Extending with Override Files</h2>
      <p style={pStyle}>
        Docker Compose automatically merges{' '}
        <code style={inlineCodeStyle}>docker-compose.yml</code> with{' '}
        <code style={inlineCodeStyle}>docker-compose.override.yml</code> if both exist. This
        pattern is the standard way to separate base configuration from
        environment-specific overrides.
      </p>

      <h3 style={h3Style}>Base File (docker-compose.yml)</h3>
      <pre style={codeBlockStyle}>
        <code>{`# docker-compose.yml — shared base config
services:
  api:
    build: ./api
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5
volumes:
  db-data:`}</code>
      </pre>

      <h3 style={h3Style}>Development Override (docker-compose.override.yml)</h3>
      <pre style={codeBlockStyle}>
        <code>{`# docker-compose.override.yml — auto-merged in dev
services:
  api:
    volumes:
      - .:/app                    # Hot reload
      - /app/node_modules
    ports:
      - "3000:3000"
      - "9229:9229"              # Debug port
    environment:
      NODE_ENV: development
      LOG_LEVEL: debug
  db:
    ports:
      - "5432:5432"              # Expose DB for local tools
    environment:
      POSTGRES_PASSWORD: devpass`}</code>
      </pre>

      <h3 style={h3Style}>Production Override</h3>
      <pre style={codeBlockStyle}>
        <code>{`# docker-compose.prod.yml — explicit -f flag needed
services:
  api:
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.0"
    environment:
      NODE_ENV: production
      LOG_LEVEL: warn
  db:
    restart: unless-stopped
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    deploy:
      resources:
        limits:
          memory: 1G

# Usage:
# docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 13. Production Best Practices                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>13. Production Best Practices</h2>
      <p style={pStyle}>
        Running Docker Compose in production requires careful attention to security,
        reliability, and performance. Follow these guidelines for stable deployments.
      </p>

      <h3 style={h3Style}>Security Checklist</h3>
      <ol style={olStyle}>
        <li><strong>Pin image tags</strong> &mdash; Never use <code style={inlineCodeStyle}>:latest</code> in production. Pin to specific versions like <code style={inlineCodeStyle}>postgres:16.2-alpine</code>.</li>
        <li><strong>Externalize secrets</strong> &mdash; Use Docker secrets, environment files outside version control, or a secrets manager. Never commit passwords to your Compose file.</li>
        <li><strong>Run as non-root</strong> &mdash; Add <code style={inlineCodeStyle}>user: &quot;1000:1000&quot;</code> or configure your Dockerfile to drop root privileges.</li>
        <li><strong>Set read-only filesystem</strong> &mdash; Use <code style={inlineCodeStyle}>read_only: true</code> on services that do not need to write, and mount tmpfs for temp directories.</li>
        <li><strong>Limit network exposure</strong> &mdash; Use <code style={inlineCodeStyle}>internal: true</code> on backend networks. Bind ports to <code style={inlineCodeStyle}>127.0.0.1</code> unless they need external access.</li>
        <li><strong>Drop Linux capabilities</strong> &mdash; Use <code style={inlineCodeStyle}>cap_drop: [ALL]</code> and only add back what you need with <code style={inlineCodeStyle}>cap_add</code>.</li>
      </ol>

      <h3 style={h3Style}>Reliability Checklist</h3>
      <ol style={olStyle}>
        <li><strong>Set restart policies</strong> &mdash; Use <code style={inlineCodeStyle}>restart: unless-stopped</code> for all long-running services.</li>
        <li><strong>Add health checks</strong> &mdash; Every service should have a healthcheck so Compose and monitoring tools can detect failures.</li>
        <li><strong>Use depends_on with conditions</strong> &mdash; Ensure services start only after their dependencies are truly ready.</li>
        <li><strong>Set resource limits</strong> &mdash; Prevent any single container from consuming all host memory or CPU.</li>
        <li><strong>Configure logging</strong> &mdash; Set log drivers and rotation to prevent disk exhaustion.</li>
      </ol>

      <h3 style={h3Style}>Production-Ready Template</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    image: myapp:1.2.3                      # Pinned tag
    restart: unless-stopped
    user: "1000:1000"
    read_only: true
    tmpfs:
      - /tmp
    cap_drop:
      - ALL
    security_opt:
      - no-new-privileges:true
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.0"
        reservations:
          memory: 256M
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
    depends_on:
      db:
        condition: service_healthy`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 14. Essential CLI Commands                                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>14. Essential Docker Compose CLI Commands</h2>
      <p style={pStyle}>
        These are the commands you will use daily when working with Docker Compose:
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Command</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose up -d</code></td><td style={tdStyle}>Start all services in detached mode</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose down</code></td><td style={tdStyle}>Stop and remove containers and networks</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose down -v</code></td><td style={tdStyle}>Also remove named volumes</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose ps</code></td><td style={tdStyle}>List running containers</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose logs -f api</code></td><td style={tdStyle}>Follow logs for a specific service</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose exec db psql -U postgres</code></td><td style={tdStyle}>Open an interactive shell in a running container</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose build --no-cache</code></td><td style={tdStyle}>Rebuild images without cache</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose pull</code></td><td style={tdStyle}>Pull latest images for all services</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose restart api</code></td><td style={tdStyle}>Restart a specific service</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose config</code></td><td style={tdStyle}>Validate and print the resolved Compose file</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose top</code></td><td style={tdStyle}>Show running processes per container</td></tr>
          <tr><td style={tdStyle}><code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose cp file.txt api:/app/</code></td><td style={tdStyle}>Copy files to/from a container</td></tr>
        </tbody>
      </table>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 15. Advanced Features                                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>15. Advanced Compose Features</h2>

      <h3 style={h3Style}>Docker Compose Watch (Hot Reload)</h3>
      <p style={pStyle}>
        Compose Watch (introduced in Docker Compose 2.22) automatically syncs file
        changes and rebuilds services during development:
      </p>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    build: ./api
    develop:
      watch:
        - action: sync
          path: ./api/src
          target: /app/src
        - action: rebuild
          path: ./api/package.json

# Usage: docker compose watch`}</code>
      </pre>

      <h3 style={h3Style}>Resource Limits</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1.5"
        reservations:
          memory: 256M
          cpus: "0.5"

  db:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: "2.0"
      replicas: 1               # Control replica count`}</code>
      </pre>

      <h3 style={h3Style}>Logging Configuration</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  api:
    logging:
      driver: json-file
      options:
        max-size: "10m"         # Rotate after 10MB
        max-file: "5"           # Keep 5 rotated files
        compress: "true"

  # Alternative: send to external logging
  worker:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://logserver:514"
        tag: "myapp-worker"`}</code>
      </pre>

      <h3 style={h3Style}>Init Containers and One-Off Tasks</h3>
      <pre style={codeBlockStyle}>
        <code>{`services:
  migrations:
    build: ./api
    command: ["npx", "prisma", "migrate", "deploy"]
    depends_on:
      db:
        condition: service_healthy
    restart: "no"               # Run once and exit

  seed:
    build: ./api
    command: ["npx", "prisma", "db", "seed"]
    depends_on:
      migrations:
        condition: service_completed_successfully
    restart: "no"

  api:
    build: ./api
    depends_on:
      seed:
        condition: service_completed_successfully`}</code>
      </pre>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 16. Troubleshooting                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>16. Troubleshooting Common Issues</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={thStyle}>Problem</th>
            <th style={thStyle}>Cause</th>
            <th style={thStyle}>Solution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>YAML parsing error</td>
            <td style={tdStyle}>Indentation mismatch or tab characters</td>
            <td style={tdStyle}>Use spaces only (2-space indent). Run <code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose config</code> to validate.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Port already in use</td>
            <td style={tdStyle}>Another process or container using the port</td>
            <td style={tdStyle}>Run <code style={{ fontFamily: 'monospace', fontSize: 12 }}>lsof -i :PORT</code> or change the host port mapping.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Container exits immediately</td>
            <td style={tdStyle}>No foreground process or crash on startup</td>
            <td style={tdStyle}>Check logs with <code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose logs SERVICE</code>. Ensure the command runs in foreground.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Volume permissions denied</td>
            <td style={tdStyle}>Container user does not own the mount path</td>
            <td style={tdStyle}>Set the correct <code style={{ fontFamily: 'monospace', fontSize: 12 }}>user:</code> or fix permissions in Dockerfile.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Service cannot reach another service</td>
            <td style={tdStyle}>Services on different networks</td>
            <td style={tdStyle}>Ensure both services share at least one network. Use service name as hostname.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Changes not reflected after rebuild</td>
            <td style={tdStyle}>Docker build cache</td>
            <td style={tdStyle}>Run <code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker compose build --no-cache SERVICE</code>.</td>
          </tr>
          <tr>
            <td style={tdStyle}>Out of disk space</td>
            <td style={tdStyle}>Accumulated images, volumes, and build cache</td>
            <td style={tdStyle}>Run <code style={{ fontFamily: 'monospace', fontSize: 12 }}>docker system prune -a --volumes</code> (caution: removes all unused data).</td>
          </tr>
        </tbody>
      </table>

      {/* ── CTA 2 ────────────────────────────────────────────────────────── */}
      <div style={ctaBoxStyle}>
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
          Generate Your docker-compose.yml Now
        </p>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
          Stop fighting with YAML indentation. Use our visual builder to create
          production-ready Compose files.
        </p>
        <Link
          href={toolLink}
          style={{
            display: 'inline-block',
            padding: '10px 28px',
            background: 'var(--accent-blue)',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Open Docker Compose Generator
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FAQ                                                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <h2 style={h2Style}>Frequently Asked Questions</h2>
      {faqData.map((item, i) => (
        <div key={i} style={faqItemStyle}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--text-primary)' }}>
            {item.q}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}
