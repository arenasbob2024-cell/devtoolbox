'use client';

const translations: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Monitoring & Observability Complete Guide 2026: Prometheus, Grafana, OpenTelemetry, Distributed Tracing, and SLOs',
    description: 'Master monitoring and observability: the three pillars (logs, metrics, traces), Prometheus + Grafana stack, OpenTelemetry, ELK/Loki, Jaeger, alerting strategies, SLI/SLO/SLA, APM tools, and infrastructure monitoring.',
  },
  zh: {
    title: '监控与可观测性完全指南 2026：Prometheus、Grafana、OpenTelemetry、分布式追踪与 SLO',
    description: '掌握监控与可观测性：三大支柱（日志、指标、追踪）、Prometheus + Grafana 技术栈、OpenTelemetry、ELK/Loki、Jaeger、告警策略、SLI/SLO/SLA、APM 工具与基础设施监控。',
  },
};

export default function MonitoringObservabilityGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between monitoring and observability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monitoring tells you when something is wrong by tracking predefined metrics and thresholds. Observability lets you understand why something is wrong by providing the ability to ask arbitrary questions about your system using logs, metrics, and traces. Monitoring is a subset of observability — you can have monitoring without observability, but not observability without monitoring.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the three pillars of observability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The three pillars are Logs (discrete event records with timestamps and context), Metrics (numerical measurements aggregated over time like request rate, error rate, latency), and Traces (end-to-end request paths through distributed systems showing timing and relationships between services). Together they provide complete visibility into system behavior.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Prometheus or Datadog for monitoring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prometheus is open-source, free, and ideal if you want full control and can manage infrastructure. Datadog is a managed SaaS platform that is easier to set up but costs significantly more at scale. Choose Prometheus + Grafana for cost control and customization. Choose Datadog for convenience, built-in integrations, and when you prefer not to manage monitoring infrastructure. Many organizations use Prometheus for metrics and Datadog for APM or vice versa.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is OpenTelemetry and why should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'OpenTelemetry (OTel) is a vendor-neutral, open-source observability framework for generating, collecting, and exporting telemetry data (traces, metrics, logs). You should use it because it prevents vendor lock-in — you can switch backends (Jaeger, Datadog, Grafana Cloud) without changing instrumentation code. It is the CNCF second-most-active project and is becoming the industry standard for telemetry.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between SLI, SLO, and SLA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SLI (Service Level Indicator) is a quantitative measure of service behavior, like request latency p99 or error rate. SLO (Service Level Objective) is a target value for an SLI, like p99 latency < 200ms or 99.9% availability. SLA (Service Level Agreement) is a contractual commitment with consequences (usually financial) for not meeting SLOs. SLIs feed into SLOs, and SLOs back SLAs.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I monitor a Node.js application with Prometheus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install the prom-client npm package, create a metrics endpoint (usually /metrics), and register default metrics plus custom counters, histograms, and gauges. Configure Prometheus to scrape your application endpoint. Use histograms for request duration and counters for request counts. The prom-client library handles metric collection and formatting in the Prometheus exposition format automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is distributed tracing and when do I need it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Distributed tracing tracks a request as it flows through multiple services in a microservices architecture. Each service creates a span, and spans are linked by a shared trace ID. You need it when a single user request touches 3+ services and you need to understand where latency comes from, which service caused a failure, or how services interact. Tools include Jaeger, Zipkin, Grafana Tempo, and Datadog APM.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I structure alerting to avoid alert fatigue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Structure alerts in tiers: P1 (critical, pages on-call, SLO is burning fast), P2 (warning, Slack notification, needs attention within hours), P3 (informational, ticket created, handle next business day). Alert on symptoms (high error rate) not causes (CPU spike). Use error budgets to decide when to alert. Every alert should be actionable — if the responder cannot do anything, remove the alert. Review and prune alerts quarterly.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: '1.6' }}>
          Observability goes beyond monitoring: instead of just knowing something is broken, you can understand why. The three pillars are Logs (event records), Metrics (numerical aggregates), and Traces (request paths across services). Use Prometheus + Grafana for metrics and dashboards, OpenTelemetry for vendor-neutral instrumentation, Loki or ELK for log aggregation, and Jaeger or Tempo for distributed tracing. Define SLIs, set SLOs, and use error budgets to balance reliability with feature velocity. Alert on symptoms, not causes, and structure alerts into severity tiers to prevent alert fatigue.
        </p>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>
        Modern distributed systems produce enormous volumes of telemetry data. A single user request might traverse an API gateway, authentication service, business logic service, cache layer, database, and message queue before returning a response. When that request fails or takes too long, you need to understand what happened across all those services. This guide covers the complete monitoring and observability stack: from fundamental concepts through production-grade implementations with Prometheus, Grafana, OpenTelemetry, distributed tracing, log aggregation, alerting strategies, SLO engineering, and APM tooling.
      </p>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1rem' }}>Key Takeaways</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[
            'Observability = Logs + Metrics + Traces working together to answer arbitrary questions about system behavior',
            'Prometheus is the industry standard for metrics collection; pair with Grafana for visualization and alerting',
            'OpenTelemetry provides vendor-neutral instrumentation — switch backends without code changes',
            'Distributed tracing (Jaeger, Tempo, Zipkin) is essential for debugging latency in microservices',
            'SLOs with error budgets give you a framework for balancing reliability and feature velocity',
            'Alert on symptoms (high error rate, SLO burn rate) not causes (CPU spike, disk usage)',
            'Use structured logging (JSON) with correlation IDs for cross-service log analysis',
            'Infrastructure monitoring (node_exporter, cAdvisor) provides the foundation for application monitoring',
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: '6px', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Section 1: Monitoring vs Observability */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Monitoring vs Observability: Understanding the Difference</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Monitoring and observability are related but distinct concepts. Monitoring is the practice of collecting, analyzing, and using information to track predefined metrics and detect known failure modes. It answers the question: is the system working? Observability is a property of a system that allows you to understand its internal state from its external outputs. It answers the question: why is the system not working?
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        A monitoring system watches dashboards and fires alerts when thresholds are breached. An observable system lets engineers ask arbitrary questions they did not anticipate when the system was designed. You can have comprehensive monitoring and still lack observability if your system cannot answer new, unexpected questions about its behavior.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Aspect</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Monitoring</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Observability</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Purpose', 'Detect known failure modes', 'Understand unknown failure modes'],
            ['Approach', 'Predefined dashboards and alerts', 'Ad-hoc exploration and querying'],
            ['Questions', 'Is the system up? Is latency normal?', 'Why did this specific request fail?'],
            ['Data', 'Aggregated metrics', 'High-cardinality data (traces, structured logs)'],
            ['Scope', 'Known unknowns', 'Unknown unknowns'],
            ['Tooling', 'Prometheus, Nagios, Zabbix', 'Honeycomb, Jaeger, Grafana Tempo'],
            ['Outcome', 'Alerts and dashboards', 'Root cause analysis in minutes'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 2: Three Pillars of Observability */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>The Three Pillars of Observability: Logs, Metrics, Traces</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Every observability strategy is built on three types of telemetry data. Each pillar provides a different lens on system behavior, and they are most powerful when correlated together.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Pillar 1: Logs</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Logs are discrete, timestamped records of events. They provide the most detailed context about what happened: which user, which endpoint, what parameters, what error message. The downside is volume — a busy service can produce gigabytes of logs per hour. Structured logging (JSON format) makes logs queryable and parseable by machines.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Structured logging with correlation IDs (Node.js with pino)
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  // Redact sensitive fields
  redact: ['req.headers.authorization', 'req.body.password'],
});

// Middleware to attach correlation ID
function correlationMiddleware(req, res, next) {
  const correlationId = req.headers['x-correlation-id'] || crypto.randomUUID();
  req.correlationId = correlationId;
  req.log = logger.child({
    correlationId,
    service: 'user-api',
    environment: process.env.NODE_ENV,
  });
  res.setHeader('x-correlation-id', correlationId);
  next();
}

// Usage in route handlers
app.get('/api/users/:id', async (req, res) => {
  req.log.info({ userId: req.params.id }, 'Fetching user');

  try {
    const user = await db.users.findById(req.params.id);
    req.log.info({ userId: req.params.id, found: !!user }, 'User lookup complete');
    res.json(user);
  } catch (err) {
    req.log.error({ userId: req.params.id, error: err.message, stack: err.stack },
      'Failed to fetch user');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Output:
// {"level":"info","time":1709001234567,"correlationId":"abc-123",
//  "service":"user-api","userId":"42","msg":"Fetching user"}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Pillar 2: Metrics</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Metrics are numerical measurements collected at regular intervals. They are lightweight, highly compressible, and ideal for dashboards, alerting, and trend analysis. The four primary metric types in Prometheus are: Counter (monotonically increasing, e.g., total requests), Gauge (can go up and down, e.g., current memory usage), Histogram (distribution of values in buckets, e.g., request latency), and Summary (similar to histogram but calculates quantiles client-side).
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Prometheus metric types in Node.js (prom-client)
import { Counter, Gauge, Histogram, Summary, Registry } from 'prom-client';

const register = new Registry();

// Counter: only goes up (resets on restart)
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Gauge: can go up or down
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register],
});

// Histogram: distribution of values (server-side quantile calculation)
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  // Buckets for latency: 5ms, 10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2.5s, 5s, 10s
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

// Summary: client-side quantile calculation
const requestSizeSummary = new Summary({
  name: 'http_request_size_bytes',
  help: 'HTTP request size in bytes',
  percentiles: [0.5, 0.9, 0.95, 0.99],
  registers: [register],
});

// Middleware to record metrics
function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer();
  activeConnections.inc();

  res.on('finish', () => {
    const labels = { method: req.method, route: req.route?.path || req.path, status_code: res.statusCode };
    end(labels);
    httpRequestsTotal.inc(labels);
    activeConnections.dec();
    requestSizeSummary.observe(parseInt(req.headers['content-length'] || '0'));
  });
  next();
}

// Expose /metrics endpoint for Prometheus scraping
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Pillar 3: Traces</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Traces represent the end-to-end journey of a request through a distributed system. Each trace contains multiple spans, where a span represents a single operation (e.g., an HTTP call, a database query, a cache lookup). Spans have a parent-child relationship forming a tree. The root span represents the initial request, and child spans represent downstream operations. Trace context (trace ID and span ID) is propagated between services via HTTP headers.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Trace anatomy — a distributed request across 3 services
//
// Trace ID: abc123def456
//
// [API Gateway]  ──────────────────────────────────  500ms
//   ├─[Auth Service]  ────────  120ms
//   │   └─[Redis Cache]  ──  15ms
//   └─[Order Service]  ─────────────────────  350ms
//       ├─[PostgreSQL Query]  ────────  80ms
//       ├─[Inventory Check (gRPC)]  ──────  150ms
//       │   └─[MongoDB Query]  ──  45ms
//       └─[Payment Service (HTTP)]  ──────  100ms
//           └─[Stripe API Call]  ──  70ms
//
// Each box is a "span" with:
//   - Span ID (unique to this operation)
//   - Parent Span ID (links to parent)
//   - Trace ID (shared across all spans)
//   - Start time, duration
//   - Tags/attributes (http.method, db.statement, error, etc.)
//   - Events/logs within the span

// W3C Trace Context headers (propagated between services):
// traceparent: 00-abc123def456-span789-01
//              version-traceId-parentSpanId-flags
// tracestate: vendor1=value1,vendor2=value2`}</code></pre>

      {/* Section 3: Prometheus + Grafana Stack */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Prometheus + Grafana Stack: Setup, PromQL, and Dashboards</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Prometheus is the de facto standard for metrics collection in cloud-native environments. It uses a pull-based model: Prometheus scrapes HTTP endpoints on your services at regular intervals. Grafana provides the visualization layer with powerful dashboards, alerting, and data source integration.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Docker Compose Setup: Full Prometheus + Grafana Stack</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:v2.51.0
    container_name: prometheus
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus/rules/:/etc/prometheus/rules/
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'
    ports:
      - '9090:9090'
    restart: unless-stopped

  grafana:
    image: grafana/grafana:11.0.0
    container_name: grafana
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=\${GRAFANA_PASSWORD:-admin}
      - GF_INSTALL_PLUGINS=grafana-clock-panel
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning/:/etc/grafana/provisioning/
      - ./grafana/dashboards/:/var/lib/grafana/dashboards/
    ports:
      - '3000:3000'
    restart: unless-stopped
    depends_on:
      - prometheus

  alertmanager:
    image: prom/alertmanager:v0.27.0
    container_name: alertmanager
    volumes:
      - ./alertmanager/alertmanager.yml:/etc/alertmanager/alertmanager.yml
    ports:
      - '9093:9093'
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:v1.8.0
    container_name: node-exporter
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--path.rootfs=/rootfs'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - '9100:9100'
    restart: unless-stopped

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:v0.49.1
    container_name: cadvisor
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    ports:
      - '8080:8080'
    restart: unless-stopped

volumes:
  prometheus_data:
  grafana_data:`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Prometheus Configuration</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  scrape_timeout: 10s

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

rule_files:
  - 'rules/*.yml'

scrape_configs:
  # Prometheus self-monitoring
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (host metrics)
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # cAdvisor (container metrics)
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  # Application services
  - job_name: 'user-api'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['user-api:3000']
        labels:
          service: 'user-api'
          environment: 'production'

  - job_name: 'order-api'
    metrics_path: '/metrics'
    static_configs:
      - targets: ['order-api:3001']
        labels:
          service: 'order-api'
          environment: 'production'

  # Kubernetes service discovery (when running in k8s)
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\\d+)?;(\\d+)
        replacement: '\$1:\$2'
        target_label: __address__`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Essential PromQL Queries</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        PromQL (Prometheus Query Language) is the query language for selecting and aggregating time series data. Mastering PromQL is essential for building useful dashboards and alert rules.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# === REQUEST RATE (RED Method: Rate) ===

# Total request rate (per second) over the last 5 minutes
rate(http_requests_total[5m])

# Request rate by service and status code
sum by (service, status_code) (rate(http_requests_total[5m]))

# Only 5xx error rate
sum(rate(http_requests_total{status_code=~"5.."}[5m]))

# === ERROR RATE (RED Method: Errors) ===

# Error ratio (percentage of requests that are errors)
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
  /
sum(rate(http_requests_total[5m]))
  * 100

# Error rate by route
sum by (route) (rate(http_requests_total{status_code=~"5.."}[5m]))
  /
sum by (route) (rate(http_requests_total[5m]))

# === LATENCY (RED Method: Duration) ===

# p50 latency (median)
histogram_quantile(0.5, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))

# p95 latency
histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))

# p99 latency by service
histogram_quantile(0.99,
  sum by (le, service) (rate(http_request_duration_seconds_bucket[5m]))
)

# Average request duration
rate(http_request_duration_seconds_sum[5m])
  /
rate(http_request_duration_seconds_count[5m])

# === SATURATION (USE Method) ===

# CPU usage percentage (node_exporter)
100 - (avg by (instance)
  (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory usage percentage
(1 - node_memory_AvailableBytes / node_memory_MemTotalBytes) * 100

# Disk usage percentage
(1 - node_filesystem_avail_bytes{mountpoint="/"}
  / node_filesystem_size_bytes{mountpoint="/"}) * 100

# Container CPU usage (cAdvisor)
sum by (name) (rate(container_cpu_usage_seconds_total[5m])) * 100

# Container memory usage
sum by (name) (container_memory_usage_bytes)
  /
sum by (name) (container_spec_memory_limit_bytes) * 100

# === APDEX SCORE ===
# Satisfied: < 300ms, Tolerating: < 1.2s, Frustrated: >= 1.2s
(
  sum(rate(http_request_duration_seconds_bucket{le="0.3"}[5m]))
  +
  sum(rate(http_request_duration_seconds_bucket{le="1.2"}[5m]))
)
/ 2
/ sum(rate(http_request_duration_seconds_count[5m]))`}</code></pre>

      {/* Section 4: OpenTelemetry */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>OpenTelemetry: Vendor-Neutral Instrumentation</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        OpenTelemetry (OTel) is the CNCF project that provides a unified standard for generating, collecting, and exporting telemetry data. It supports all three pillars (traces, metrics, logs) and works with virtually every observability backend. The key advantage is vendor neutrality: instrument your code once, then switch between Jaeger, Datadog, Grafana Cloud, or any OTLP-compatible backend without changing application code.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>OpenTelemetry Node.js Auto-Instrumentation</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// tracing.ts — Initialize OpenTelemetry BEFORE importing application code
// Run with: node -r ./tracing.js app.js
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
  ATTR_DEPLOYMENT_ENVIRONMENT,
} from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'user-api',
    [ATTR_SERVICE_VERSION]: '1.5.0',
    [ATTR_DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'development',
  }),

  // Export traces to an OTLP-compatible backend
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4318/v1/traces',
  }),

  // Export metrics
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4318/v1/metrics',
    }),
    exportIntervalMillis: 30000,
  }),

  // Auto-instrument common libraries
  instrumentations: [
    getNodeAutoInstrumentations({
      // Automatically instruments: express, http, pg, mysql, redis, grpc, etc.
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingPaths: ['/health', '/metrics', '/ready'],
      },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enhancedDatabaseReporting: true },
      '@opentelemetry/instrumentation-redis-4': { enabled: true },
    }),
  ],
});

sdk.start();
console.log('OpenTelemetry SDK initialized');

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown().then(() => process.exit(0));
});`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Custom Spans and Attributes</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Adding custom spans for business logic visibility
import { trace, SpanKind, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('user-api', '1.5.0');

async function processOrder(orderId: string, userId: string) {
  // Create a custom span
  return tracer.startActiveSpan('process-order', {
    kind: SpanKind.INTERNAL,
    attributes: {
      'order.id': orderId,
      'user.id': userId,
    },
  }, async (span) => {
    try {
      // Child span for validation
      const validationResult = await tracer.startActiveSpan('validate-order', async (validationSpan) => {
        const result = await validateOrder(orderId);
        validationSpan.setAttribute('order.items_count', result.itemCount);
        validationSpan.end();
        return result;
      });

      // Child span for payment
      await tracer.startActiveSpan('charge-payment', {
        kind: SpanKind.CLIENT,
        attributes: { 'payment.method': validationResult.paymentMethod },
      }, async (paymentSpan) => {
        await chargePayment(orderId, validationResult.total);
        paymentSpan.setAttribute('payment.amount', validationResult.total);
        paymentSpan.end();
      });

      // Add events (logs within a span)
      span.addEvent('order-processed', {
        'order.total': validationResult.total,
        'order.status': 'completed',
      });

      span.setStatus({ code: SpanStatusCode.OK });
      return { success: true };
    } catch (error) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
      span.recordException(error);
      throw error;
    } finally {
      span.end();
    }
  });
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>OpenTelemetry Collector Configuration</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# otel-collector-config.yaml
# The OTel Collector receives, processes, and exports telemetry data
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

  # Scrape Prometheus metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: 'otel-collector'
          scrape_interval: 10s
          static_configs:
            - targets: ['0.0.0.0:8888']

processors:
  batch:
    timeout: 5s
    send_batch_size: 1024

  # Add resource attributes
  resource:
    attributes:
      - key: deployment.environment
        value: production
        action: upsert

  # Filter out health check spans
  filter:
    spans:
      exclude:
        match_type: strict
        attributes:
          - key: http.target
            value: /health

  # Tail-based sampling: keep all error traces, sample 10% of success
  tail_sampling:
    decision_wait: 10s
    policies:
      - name: errors-policy
        type: status_code
        status_code: { status_codes: [ERROR] }
      - name: slow-traces
        type: latency
        latency: { threshold_ms: 1000 }
      - name: percentage-policy
        type: probabilistic
        probabilistic: { sampling_percentage: 10 }

exporters:
  # Export traces to Jaeger
  otlp/jaeger:
    endpoint: jaeger:4317
    tls:
      insecure: true

  # Export traces to Grafana Tempo
  otlp/tempo:
    endpoint: tempo:4317
    tls:
      insecure: true

  # Export metrics to Prometheus
  prometheusremotewrite:
    endpoint: http://prometheus:9090/api/v1/write

  # Export logs to Loki
  loki:
    endpoint: http://loki:3100/loki/api/v1/push

  # Debug exporter (prints to stdout)
  debug:
    verbosity: detailed

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch, resource, filter, tail_sampling]
      exporters: [otlp/jaeger, otlp/tempo]
    metrics:
      receivers: [otlp, prometheus]
      processors: [batch, resource]
      exporters: [prometheusremotewrite]
    logs:
      receivers: [otlp]
      processors: [batch, resource]
      exporters: [loki]`}</code></pre>

      {/* Section 5: Log Aggregation */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Log Aggregation: ELK Stack and Grafana Loki</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Log aggregation centralizes logs from all services into a single queryable system. The two dominant approaches are the ELK Stack (Elasticsearch, Logstash, Kibana) for full-text search, and Grafana Loki for label-based log aggregation that integrates natively with Grafana.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>ELK Stack Overview</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        The ELK Stack indexes the full text of every log line, enabling powerful full-text search with Lucene syntax. This provides maximum flexibility but comes with significant storage and compute costs. Elasticsearch requires substantial memory and disk for indexing.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# docker-compose.elk.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
    volumes:
      - es_data:/usr/share/elasticsearch/data
    ports:
      - '9200:9200'

  logstash:
    image: docker.elastic.co/logstash/logstash:8.13.0
    volumes:
      - ./logstash/pipeline/:/usr/share/logstash/pipeline/
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - '5601:5601'
    depends_on:
      - elasticsearch

volumes:
  es_data:

---
# logstash/pipeline/logstash.conf
input {
  beats { port => 5044 }
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [message] =~ /^\\{/ {
    json { source => "message" }
  }
  date {
    match => ["timestamp", "ISO8601"]
    target => "@timestamp"
  }
  mutate {
    remove_field => ["host", "agent"]
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "logs-%{[service]}-%{+YYYY.MM.dd}"
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Grafana Loki: Lightweight Log Aggregation</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Loki indexes only metadata labels (service name, log level, environment), not the log content itself. This makes it dramatically cheaper to run than Elasticsearch while still supporting powerful queries through LogQL. It integrates seamlessly with Grafana, allowing you to jump from a metric spike to the corresponding logs in one click.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Loki + Promtail setup (docker-compose)
services:
  loki:
    image: grafana/loki:3.0.0
    ports:
      - '3100:3100'
    volumes:
      - ./loki/loki-config.yml:/etc/loki/loki-config.yml
      - loki_data:/loki
    command: -config.file=/etc/loki/loki-config.yml

  promtail:
    image: grafana/promtail:3.0.0
    volumes:
      - ./promtail/promtail-config.yml:/etc/promtail/promtail-config.yml
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    command: -config.file=/etc/promtail/promtail-config.yml

---
# promtail/promtail-config.yml
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ['__meta_docker_container_name']
        target_label: 'container'
      - source_labels: ['__meta_docker_container_log_stream']
        target_label: 'stream'
    pipeline_stages:
      - json:
          expressions:
            level: level
            msg: msg
            service: service
            correlationId: correlationId
      - labels:
          level:
          service:
      - timestamp:
          source: time
          format: RFC3339Nano

---
# LogQL query examples
# Show all error logs from user-api
{service="user-api"} |= "error"

# Parse JSON and filter by status code
{service="user-api"} | json | status_code >= 500

# Count errors per minute by service
sum by (service) (count_over_time({level="error"}[1m]))

# Find logs with specific correlation ID
{service=~"user-api|order-api"} |= "correlation-id-abc123"

# Latency outliers (parse and filter)
{service="api-gateway"} | json | duration > 2s | line_format "slow: {{.path}} {{.duration}}"`}</code></pre>

      {/* Section 6: Distributed Tracing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Distributed Tracing: Jaeger, Zipkin, and Grafana Tempo</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Distributed tracing is essential for debugging latency and failures in microservices. When a request touches five services and takes 3 seconds, you need to see exactly which service introduced the delay. Tracing tools visualize request flow as a timeline (Gantt chart), making it immediately obvious where time is spent.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Jaeger Setup</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Jaeger all-in-one (development/testing)
docker run -d --name jaeger \\
  -p 6831:6831/udp \\
  -p 6832:6832/udp \\
  -p 5778:5778 \\
  -p 16686:16686 \\
  -p 4317:4317 \\
  -p 4318:4318 \\
  -p 14250:14250 \\
  -p 14268:14268 \\
  -p 14269:14269 \\
  jaegertracing/all-in-one:1.56

# Production: Jaeger with Elasticsearch backend
# docker-compose.jaeger-production.yml
services:
  jaeger-collector:
    image: jaegertracing/jaeger-collector:1.56
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - '14268:14268'   # HTTP collector
      - '4317:4317'     # OTLP gRPC
      - '4318:4318'     # OTLP HTTP

  jaeger-query:
    image: jaegertracing/jaeger-query:1.56
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
    ports:
      - '16686:16686'   # Jaeger UI

  jaeger-agent:
    image: jaegertracing/jaeger-agent:1.56
    command: ['--reporter.grpc.host-port=jaeger-collector:14250']
    ports:
      - '6831:6831/udp' # Thrift compact (legacy)

# Grafana Tempo (lightweight, S3-backed traces)
services:
  tempo:
    image: grafana/tempo:2.4.1
    command: ['-config.file=/etc/tempo/tempo.yml']
    volumes:
      - ./tempo/tempo.yml:/etc/tempo/tempo.yml
      - tempo_data:/tmp/tempo
    ports:
      - '3200:3200'   # Tempo API
      - '4317:4317'   # OTLP gRPC
      - '4318:4318'   # OTLP HTTP`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Tracing Tool Comparison</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Jaeger</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Zipkin</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Grafana Tempo</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Storage Backend', 'Elasticsearch, Cassandra, Kafka', 'Elasticsearch, MySQL, Cassandra', 'S3, GCS, Azure Blob, local disk'],
            ['Protocol', 'OTLP, Thrift, gRPC', 'HTTP/JSON, Thrift', 'OTLP, Jaeger, Zipkin'],
            ['Query Language', 'Tag-based search', 'Tag-based search', 'TraceQL (powerful query language)'],
            ['Sampling', 'Head + Remote sampling', 'Head sampling', 'Head + Tail sampling via OTel Collector'],
            ['UI', 'Built-in (excellent)', 'Built-in (good)', 'Grafana (rich integration)'],
            ['Cost at Scale', 'Medium (Elasticsearch)', 'Medium', 'Low (object storage)'],
            ['Best For', 'Standalone tracing', 'Simple setups', 'Grafana stack integration'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section 7: Alerting Strategies */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Alerting Strategies: PagerDuty, OpsGenie, and Alert Design</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Alerting is the bridge between observability and incident response. Bad alerting causes alert fatigue — engineers ignore alerts because they fire too often with false positives. Good alerting surfaces real problems that require human intervention, routes them to the right team, and provides enough context to start debugging immediately.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Alert Severity Tiers</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Severity</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Response Time</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Notification</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['P1 (Critical)', 'Immediate (< 5 min)', 'PagerDuty / OpsGenie page', 'Service down, data loss, SLO burn > 10x'],
            ['P2 (Warning)', 'Within 1 hour', 'Slack #alerts channel', 'Error rate elevated, SLO burn 2-5x, disk 85%'],
            ['P3 (Info)', 'Next business day', 'Jira ticket auto-created', 'Certificate expiring in 14 days, dependency deprecated'],
            ['P4 (Low)', 'Within sprint', 'Dashboard only', 'Non-critical performance degradation'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Prometheus Alert Rules and Alertmanager</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# prometheus/rules/alerts.yml
groups:
  - name: application-alerts
    rules:
      # P1: High error rate (> 5% for 5 minutes)
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m]))
          > 0.05
        for: 5m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: 'High error rate detected ({{ $value | humanizePercentage }})'
          description: 'Error rate is above 5% for the last 5 minutes.'
          runbook_url: 'https://wiki.internal/runbooks/high-error-rate'

      # P1: Service down (no requests for 5 minutes)
      - alert: ServiceDown
        expr: |
          up{job=~"user-api|order-api"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: 'Service {{ $labels.job }} is down'
          description: 'No scrape target responding for {{ $labels.instance }}'

      # P2: High latency (p99 > 2 seconds)
      - alert: HighLatency
        expr: |
          histogram_quantile(0.99,
            sum by (le, service) (rate(http_request_duration_seconds_bucket[5m]))
          ) > 2
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: 'High p99 latency for {{ $labels.service }}: {{ $value }}s'

      # P2: SLO burn rate alert (multi-window)
      - alert: SLOBurnRateHigh
        expr: |
          (
            sum(rate(http_requests_total{status_code=~"5.."}[1h]))
            / sum(rate(http_requests_total[1h]))
          ) > (14.4 * 0.001)
          and
          (
            sum(rate(http_requests_total{status_code=~"5.."}[5m]))
            / sum(rate(http_requests_total[5m]))
          ) > (14.4 * 0.001)
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: 'SLO burn rate is too high — error budget depleting fast'

  - name: infrastructure-alerts
    rules:
      # P2: Host disk almost full
      - alert: DiskSpaceLow
        expr: |
          (1 - node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) > 0.85
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: 'Disk usage above 85% on {{ $labels.instance }}'

      # P2: High memory usage
      - alert: HighMemoryUsage
        expr: |
          (1 - node_memory_AvailableBytes / node_memory_MemTotalBytes) > 0.9
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: 'Memory usage above 90% on {{ $labels.instance }}'

      # P3: Certificate expiring soon
      - alert: CertificateExpiringSoon
        expr: |
          probe_ssl_earliest_cert_expiry - time() < 86400 * 14
        for: 1h
        labels:
          severity: info
        annotations:
          summary: 'SSL certificate expiring in less than 14 days'

---
# alertmanager/alertmanager.yml
global:
  resolve_timeout: 5m

route:
  receiver: 'slack-default'
  group_by: ['alertname', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

  routes:
    # P1: Page on-call via PagerDuty
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      repeat_interval: 30m
      continue: true

    # P2: Slack notification
    - match:
        severity: warning
      receiver: 'slack-warnings'
      repeat_interval: 2h

    # P3: Create Jira ticket
    - match:
        severity: info
      receiver: 'jira-tickets'
      repeat_interval: 24h

receivers:
  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: '<your-pagerduty-integration-key>'
        severity: critical
        description: '{{ .GroupLabels.alertname }}: {{ .CommonAnnotations.summary }}'

  - name: 'slack-default'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#monitoring'
        title: '{{ .GroupLabels.alertname }}'
        text: '{{ .CommonAnnotations.description }}'

  - name: 'slack-warnings'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
        channel: '#alerts'
        title: '[WARNING] {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\\n{{ end }}'

  - name: 'jira-tickets'
    webhook_configs:
      - url: 'http://jira-webhook-bridge:8080/create-ticket'`}</code></pre>

      {/* Section 8: SLI, SLO, SLA and Error Budgets */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>SLI, SLO, SLA, and Error Budgets</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Service Level engineering provides a framework for making objective decisions about reliability vs. feature velocity. Instead of arguing about whether to ship a risky deployment or fix a performance issue, you look at your error budget and make a data-driven decision.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Definitions</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Term</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Definition</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['SLI (Service Level Indicator)', 'A quantitative measure of service behavior', 'p99 latency, error rate, availability'],
            ['SLO (Service Level Objective)', 'A target value or range for an SLI', '99.9% availability, p99 < 200ms'],
            ['SLA (Service Level Agreement)', 'A contractual commitment with consequences', '99.95% uptime or service credits issued'],
            ['Error Budget', 'The allowed amount of unreliability (1 - SLO)', '0.1% = 43.8 min/month downtime allowed'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Error Budget Calculation</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Error Budget Math
#
# SLO: 99.9% availability (per 30-day window)
# Error Budget = 1 - SLO = 0.1%
#
# Time budget:
#   30 days * 24 hours * 60 minutes = 43,200 minutes
#   43,200 * 0.001 = 43.2 minutes of allowed downtime per month
#
# Request budget:
#   If you serve 1,000,000 requests/month
#   1,000,000 * 0.001 = 1,000 failed requests allowed per month
#
# === SLO Comparison ===
# SLO     | Downtime/month | Downtime/year | Error Budget
# 99%     | 7.3 hours      | 3.65 days     | 1%
# 99.9%   | 43.8 min       | 8.77 hours    | 0.1%
# 99.95%  | 21.9 min       | 4.38 hours    | 0.05%
# 99.99%  | 4.38 min       | 52.6 min      | 0.01%
# 99.999% | 26.3 sec       | 5.26 min      | 0.001%
#
# Burn Rate Alerts:
# If error budget is consumed at 1x rate, it lasts exactly the window period.
# Alert when burn rate exceeds threshold:
#   - 14.4x burn rate (1-hour window) = budget exhausted in ~2 days → P1 page
#   - 6x burn rate (6-hour window)    = budget exhausted in ~5 days → P2 warning
#   - 3x burn rate (3-day window)     = budget exhausted in ~10 days → P3 ticket
#
# Multi-window approach (recommended):
# Fire alert only when BOTH short and long windows show high burn rate
# This reduces false positives from transient spikes`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Implementing SLOs in Prometheus</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# prometheus/rules/slo.yml
groups:
  - name: slo-rules
    rules:
      # Availability SLI: ratio of successful requests
      - record: sli:availability:ratio_rate5m
        expr: |
          sum(rate(http_requests_total{status_code!~"5.."}[5m]))
          /
          sum(rate(http_requests_total[5m]))

      # Latency SLI: ratio of requests faster than 200ms
      - record: sli:latency:ratio_rate5m
        expr: |
          sum(rate(http_request_duration_seconds_bucket{le="0.2"}[5m]))
          /
          sum(rate(http_request_duration_seconds_count[5m]))

      # Error budget remaining (30-day rolling window)
      - record: slo:error_budget_remaining:ratio
        expr: |
          1 - (
            (1 - sli:availability:ratio_rate5m)
            /
            (1 - 0.999)
          )

      # Burn rate (how fast error budget is being consumed)
      - record: slo:burn_rate:1h
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[1h]))
          / sum(rate(http_requests_total[1h]))
          / 0.001

      - record: slo:burn_rate:6h
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[6h]))
          / sum(rate(http_requests_total[6h]))
          / 0.001`}</code></pre>

      {/* Section 9: APM Tools Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Application Performance Monitoring: Datadog vs Grafana Cloud vs New Relic vs Elastic</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        APM (Application Performance Monitoring) tools provide end-to-end visibility into application performance. They combine traces, metrics, logs, and profiling into a single platform with auto-discovery, service maps, and AI-powered anomaly detection. The trade-off is cost: SaaS APM tools charge per host, per span, or per GB ingested.
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Feature</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Datadog</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Grafana Cloud</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>New Relic</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Elastic Observability</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Pricing Model', 'Per host + per feature', 'Usage-based (metrics, logs, traces)', 'Per GB ingested + per user', 'Per resource unit or self-hosted'],
            ['Free Tier', 'Limited (14-day trial)', 'Generous (10K metrics, 50GB logs)', '100 GB/month free forever', 'Free self-hosted (basic)'],
            ['Metrics', 'Custom + 800+ integrations', 'Prometheus/Mimir native', 'Dimensional metrics', 'Elasticsearch-based'],
            ['Logs', 'Full-text indexed', 'Loki (label-based)', 'Full-text indexed', 'Elasticsearch (full-text)'],
            ['Traces', 'Datadog APM (proprietary + OTel)', 'Tempo (OTel native)', 'New Relic APM + OTel', 'Elastic APM + OTel'],
            ['Service Map', 'Auto-generated, excellent', 'Basic (improving)', 'Auto-generated, good', 'Auto-generated, good'],
            ['Alerting', 'Built-in, powerful', 'Grafana Alerting (unified)', 'NRQL-based, flexible', 'Watcher + Kibana rules'],
            ['AI/ML', 'Watchdog (anomaly detection)', 'ML-based forecasting', 'AI ops, anomaly detection', 'ML anomaly detection'],
            ['Profiling', 'Continuous profiling', 'Pyroscope (continuous)', 'Thread profiler', 'Universal profiling'],
            ['Best For', 'Enterprise, all-in-one', 'OSS stack, cost-efficient', 'Startups, generous free tier', 'Log-heavy workloads'],
            ['Vendor Lock-in', 'High (proprietary agent)', 'Low (OSS stack)', 'Medium (NRQL, custom SDK)', 'Medium (Elasticsearch)'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Sentry for Error Tracking</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Sentry specializes in error tracking and crash reporting. It captures exceptions with full stack traces, breadcrumbs (user actions leading to the error), release tracking, and performance monitoring. It integrates with OpenTelemetry for distributed tracing.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// Sentry integration for Node.js
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.npm_package_version,

  integrations: [
    // Automatic performance instrumentation
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
    Sentry.prismaIntegration(),
    // Continuous profiling
    nodeProfilingIntegration(),
  ],

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  // Profile 100% of sampled transactions
  profilesSampleRate: 1.0,

  // Filter out non-actionable errors
  beforeSend(event) {
    // Ignore bot crawlers
    if (event.request?.headers?.['user-agent']?.includes('bot')) {
      return null;
    }
    return event;
  },
});

// Express error handler (must be AFTER all routes)
app.use(Sentry.expressErrorHandler());

// Manual error capture with context
app.post('/api/orders', async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.json(order);
  } catch (error) {
    Sentry.withScope((scope) => {
      scope.setUser({ id: req.userId, email: req.userEmail });
      scope.setTag('order.type', req.body.type);
      scope.setContext('order', { items: req.body.items, total: req.body.total });
      Sentry.captureException(error);
    });
    res.status(500).json({ error: 'Order creation failed' });
  }
});`}</code></pre>

      {/* Section 10: Infrastructure Monitoring */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Infrastructure Monitoring: node_exporter, cAdvisor, and Kubernetes</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Infrastructure monitoring provides the foundation layer. Application issues often trace back to infrastructure problems: CPU throttling, memory pressure, disk I/O saturation, or network packet loss. The USE method (Utilization, Saturation, Errors) provides a systematic framework for infrastructure monitoring.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>USE Method for Infrastructure</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', margin: '1.5rem 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Resource</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Utilization</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Saturation</th>
            <th style={{ border: '1px solid #e2e8f0', padding: '10px 14px', background: '#f8fafc', textAlign: 'left', fontWeight: 700 }}>Errors</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['CPU', 'node_cpu_seconds_total (% busy)', 'system.cpu.load_average', 'machine_check_exceptions'],
            ['Memory', 'node_memory_MemAvailable', 'node_memory_SwapFree', 'OOM killer events'],
            ['Disk I/O', 'node_disk_io_time_seconds', 'node_disk_io_time_weighted', 'node_disk_read_errors_total'],
            ['Network', 'node_network_receive_bytes', 'node_network_transmit_queue_len', 'node_network_receive_errs_total'],
            ['File Descriptors', 'process_open_fds / process_max_fds', 'Socket backlog length', 'connection refused errors'],
          ].map((row, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ border: '1px solid #e2e8f0', padding: '10px 14px' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Essential Grafana Dashboard Panels (PromQL)</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# === Node Exporter Dashboards ===

# CPU Usage per Core
100 - (avg by (instance, cpu)
  (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# CPU Load Average (1m, 5m, 15m)
node_load1  # 1-minute average
node_load5  # 5-minute average
node_load15 # 15-minute average

# Memory Usage (bytes and percentage)
node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes
(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100

# Disk Space Used (per mountpoint)
100 - (node_filesystem_avail_bytes{fstype!~"tmpfs|fuse.lxcfs"}
  / node_filesystem_size_bytes{fstype!~"tmpfs|fuse.lxcfs"} * 100)

# Disk I/O (reads and writes per second)
irate(node_disk_reads_completed_total[5m])
irate(node_disk_writes_completed_total[5m])

# Network Traffic (bytes per second)
irate(node_network_receive_bytes_total{device!="lo"}[5m])
irate(node_network_transmit_bytes_total{device!="lo"}[5m])

# === cAdvisor (Container Metrics) ===

# Container CPU Usage (percentage)
sum by (name) (rate(container_cpu_usage_seconds_total{image!=""}[5m])) * 100

# Container Memory Usage vs Limit
container_memory_usage_bytes{image!=""} / container_spec_memory_limit_bytes{image!=""} * 100

# Container Network I/O
sum by (name) (rate(container_network_receive_bytes_total[5m]))
sum by (name) (rate(container_network_transmit_bytes_total[5m]))

# Container Restart Count (detect crash loops)
increase(container_restart_count[1h])

# === Kubernetes Metrics (kube-state-metrics) ===

# Pod status (Running, Pending, Failed)
sum by (namespace, phase) (kube_pod_status_phase)

# Deployment replicas availability
kube_deployment_status_replicas_available
  / kube_deployment_spec_replicas

# Pod restart count (high restarts = crash loop)
sum by (namespace, pod) (increase(kube_pod_container_status_restarts_total[1h])) > 3

# Node resource pressure
kube_node_status_condition{condition="MemoryPressure",status="true"}
kube_node_status_condition{condition="DiskPressure",status="true"}`}</code></pre>

      {/* Section 11: Monitoring Node.js and Python Applications */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Monitoring Node.js and Python Applications</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Application-level monitoring captures runtime-specific metrics that infrastructure monitoring cannot see: event loop lag in Node.js, GIL contention in Python, connection pool exhaustion, and business-specific metrics like orders per minute or payment success rate.
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Node.js: Complete Monitoring Setup</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`// monitoring.ts — Complete Node.js monitoring setup
import { collectDefaultMetrics, Counter, Histogram, Gauge, Registry } from 'prom-client';

const register = new Registry();

// Collect default Node.js metrics:
// - process_cpu_seconds_total
// - process_resident_memory_bytes
// - nodejs_eventloop_lag_seconds
// - nodejs_active_handles_total
// - nodejs_active_requests_total
// - nodejs_heap_size_total_bytes
// - nodejs_gc_duration_seconds (GC pause times)
collectDefaultMetrics({ register, prefix: 'app_' });

// Custom business metrics
const ordersTotal = new Counter({
  name: 'business_orders_total',
  help: 'Total orders processed',
  labelNames: ['status', 'payment_method'],
  registers: [register],
});

const orderValue = new Histogram({
  name: 'business_order_value_dollars',
  help: 'Order value in dollars',
  buckets: [10, 25, 50, 100, 250, 500, 1000],
  registers: [register],
});

const dbPoolSize = new Gauge({
  name: 'db_pool_active_connections',
  help: 'Number of active database connections',
  registers: [register],
});

// Event loop lag monitoring (critical for Node.js)
const eventLoopLag = new Histogram({
  name: 'nodejs_eventloop_lag_p99_seconds',
  help: 'Event loop lag in seconds',
  buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1],
  registers: [register],
});

// Monitor event loop lag
let lastCheck = process.hrtime.bigint();
setInterval(() => {
  const now = process.hrtime.bigint();
  const diff = Number(now - lastCheck) / 1e9; // Convert ns to seconds
  const lag = diff - 1; // Subtract the expected 1-second interval
  if (lag > 0) eventLoopLag.observe(lag);
  lastCheck = now;
}, 1000);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid,
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  // Update connection pool gauge before serving
  dbPoolSize.set(pool.totalCount - pool.idleCount);
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export { register, ordersTotal, orderValue };`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Python: Prometheus + OpenTelemetry Monitoring</h3>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# monitoring.py — Python (FastAPI) monitoring setup
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
from prometheus_client import CollectorRegistry, multiprocess
from fastapi import FastAPI, Request, Response
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from opentelemetry.instrumentation.redis import RedisInstrumentor
import time

app = FastAPI()

# --- Prometheus Metrics ---
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status_code']
)

REQUEST_LATENCY = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration in seconds',
    ['method', 'endpoint'],
    buckets=[0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
)

ACTIVE_REQUESTS = Gauge(
    'http_active_requests',
    'Number of active HTTP requests'
)

DB_QUERY_DURATION = Histogram(
    'db_query_duration_seconds',
    'Database query duration',
    ['operation', 'table'],
    buckets=[0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5]
)

# --- Middleware for automatic metrics ---
@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    ACTIVE_REQUESTS.inc()
    start_time = time.time()

    response = await call_next(request)

    duration = time.time() - start_time
    endpoint = request.url.path
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=endpoint,
        status_code=response.status_code
    ).inc()
    REQUEST_LATENCY.labels(
        method=request.method,
        endpoint=endpoint
    ).observe(duration)
    ACTIVE_REQUESTS.dec()

    return response

@app.get("/metrics")
async def metrics():
    return Response(
        content=generate_latest(),
        media_type=CONTENT_TYPE_LATEST
    )

# --- OpenTelemetry Setup ---
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter(
    endpoint="http://otel-collector:4317"
))
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)

# Auto-instrument FastAPI, SQLAlchemy, Redis
FastAPIInstrumentor.instrument_app(app)
SQLAlchemyInstrumentor().instrument(engine=db_engine)
RedisInstrumentor().instrument()`}</code></pre>

      {/* Section 12: Production Architecture */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Production Observability Architecture</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        A production observability stack combines all the tools discussed into a cohesive architecture. The following diagram shows a recommended open-source stack that balances cost, flexibility, and capability.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Production Observability Architecture (Open-Source Stack)
#
#  ┌──────────────────────────────────────────────────────────┐
#  │                    Applications                          │
#  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
#  │  │ User API│  │Order API│  │ Payment │  │  Worker │   │
#  │  │ (OTel)  │  │ (OTel)  │  │ (OTel)  │  │ (OTel)  │   │
#  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘   │
#  └───────┼─────────────┼───────────┼────────────┼──────────┘
#          │  OTLP (traces, metrics, logs)         │
#          ▼             ▼           ▼             ▼
#  ┌──────────────────────────────────────────────────────────┐
#  │              OpenTelemetry Collector                      │
#  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐     │
#  │  │ Receivers│→ │Processors│→ │    Exporters       │     │
#  │  │ (OTLP)  │  │(batch,   │  │ ┌───────────────┐  │     │
#  │  │          │  │ filter,  │  │ │Traces → Tempo │  │     │
#  │  │          │  │ sampling)│  │ │Metrics→ Mimir │  │     │
#  │  │          │  │          │  │ │Logs → Loki    │  │     │
#  │  └──────────┘  └──────────┘  │ └───────────────┘  │     │
#  └──────────────────────────────┼────────────────────┘─────┘
#                                 ▼
#  ┌──────────────────────────────────────────────────────────┐
#  │                    Storage Layer                          │
#  │  ┌──────────┐  ┌──────────┐  ┌──────────┐               │
#  │  │ Grafana  │  │ Grafana  │  │ Grafana  │               │
#  │  │  Tempo   │  │  Mimir   │  │   Loki   │               │
#  │  │ (traces) │  │(metrics) │  │  (logs)  │               │
#  │  └────┬─────┘  └────┬─────┘  └────┬─────┘               │
#  └───────┼──────────────┼─────────────┼─────────────────────┘
#          │              │             │
#          ▼              ▼             ▼
#  ┌──────────────────────────────────────────────────────────┐
#  │                      Grafana                             │
#  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────────┐    │
#  │  │Dashbds │  │Alerting│  │Explore │  │ Correlate  │    │
#  │  │        │  │        │  │(ad-hoc)│  │(trace→log) │    │
#  │  └────────┘  └────────┘  └────────┘  └────────────┘    │
#  └──────────────────────────────────────────────────────────┘
#
# Infrastructure layer (separate scraping):
# ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐
# │node_exporter │  │  cAdvisor    │  │kube-state-metrics  │
# │(host metrics)│  │(containers)  │  │(k8s resources)     │
# └──────────────┘  └──────────────┘  └────────────────────┘`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Correlating Signals: From Metric Spike to Root Cause</h3>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        The real power of observability comes from correlating signals across all three pillars. When you see a spike in error rate on a Grafana dashboard, you should be able to click through to the traces that contributed to those errors, and from there to the specific log lines within the failing span. This workflow transforms hours of debugging into minutes.
      </p>
      <pre style={{ backgroundColor: '#111827', color: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem' }}><code>{`# Correlation workflow:
#
# 1. ALERT fires: "HighErrorRate > 5% for 5 minutes"
#    → Open Grafana dashboard
#
# 2. METRIC shows: POST /api/orders error rate spiked at 14:32
#    → Click "View exemplar traces" (Prometheus exemplars link to trace IDs)
#
# 3. TRACE shows: order-api → payment-service → Stripe API
#    Stripe API span has error: "rate_limit_exceeded"
#    Duration: 30s (timeout), normally 200ms
#    → Click span → "View logs for this span"
#
# 4. LOGS show: payment-service logs with matching trace ID
#    {"level":"error","traceId":"abc123","msg":"Stripe API rate limited",
#     "retries":3,"lastError":"429 Too Many Requests"}
#
# Root cause found in < 3 minutes:
#   Stripe API rate limiting caused payment timeouts,
#   which caused order creation to fail with 500 errors.
#
# Fix: Implement exponential backoff + circuit breaker for Stripe calls.

# Grafana data source configuration for correlation:
# grafana/provisioning/datasources/datasources.yml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    jsonData:
      exemplarTraceIdDestinations:
        - name: traceID
          datasourceUid: tempo

  - name: Tempo
    type: tempo
    uid: tempo
    url: http://tempo:3200
    jsonData:
      tracesToLogs:
        datasourceUid: loki
        tags: ['service']
        mappedTags: [{ key: 'service.name', value: 'service' }]
        mapTagNamesEnabled: true
        filterByTraceID: true
      tracesToMetrics:
        datasourceUid: prometheus
        tags: [{ key: 'service.name', value: 'service' }]

  - name: Loki
    type: loki
    uid: loki
    url: http://loki:3100
    jsonData:
      derivedFields:
        - name: TraceID
          matcherRegex: '"traceId":"(\\w+)"'
          url: '\$\${__value.raw}'
          datasourceUid: tempo`}</code></pre>

      {/* Section 13: Best Practices Checklist */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Monitoring and Observability Best Practices Checklist</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Use this checklist as a maturity model for your observability practice. Not every team needs everything on day one, but these are the practices that consistently distinguish well-operated services from fragile ones.
      </p>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1rem' }}>Level 1: Foundation</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: '0 0 16px 0' }}>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Health check endpoints on every service (/health, /ready)</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Structured logging (JSON) with consistent fields across all services</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Basic metrics: request rate, error rate, latency (RED method)</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Infrastructure monitoring: CPU, memory, disk, network</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>At least one dashboard per service showing key metrics</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Basic alerting: service down, high error rate, disk full</li>
        </ul>

        <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1rem' }}>Level 2: Intermediate</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: '0 0 16px 0' }}>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Distributed tracing with context propagation across all services</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Centralized log aggregation with search and filtering</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Correlation IDs linking logs, metrics, and traces</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>SLIs and SLOs defined for user-facing services</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Alert severity tiers with proper routing (page vs. Slack vs. ticket)</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Runbooks linked to every alert</li>
        </ul>

        <strong style={{ display: 'block', marginBottom: '12px', fontSize: '1rem' }}>Level 3: Advanced</strong>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Error budgets driving deployment decisions</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Tail-based sampling for efficient trace storage</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Continuous profiling for CPU and memory hotspots</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Anomaly detection and automated root cause analysis</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Synthetic monitoring and canary deployments</li>
          <li style={{ marginBottom: '4px', lineHeight: '1.6' }}>Chaos engineering integrated with observability</li>
        </ul>
      </div>

      {/* Section 14: Conclusion */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Conclusion</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Monitoring tells you when things are broken. Observability tells you why. Building a comprehensive observability practice requires investment across all three pillars — logs, metrics, and traces — with proper correlation between them. Start with the RED method (Rate, Errors, Duration) for application metrics and the USE method (Utilization, Saturation, Errors) for infrastructure. Define SLOs early so you have a framework for making reliability decisions. Use OpenTelemetry for instrumentation to avoid vendor lock-in. Alert on symptoms and SLO burn rates, not raw infrastructure metrics. And remember: the goal is not more data, but faster answers.
      </p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.75' }}>
        Whether you choose a fully managed platform like Datadog or build an open-source stack with Prometheus, Grafana, Loki, and Tempo, the principles remain the same. Instrument everything, correlate across signals, and build a culture where every production incident improves the system. The best observability investment is not a tool — it is the practice of asking better questions about your systems.
      </p>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
      {[
        {
          q: 'What is the difference between monitoring and observability?',
          a: 'Monitoring tells you when something is wrong by tracking predefined metrics and thresholds. Observability lets you understand why something is wrong by providing the ability to ask arbitrary questions about your system using logs, metrics, and traces. Monitoring is a subset of observability.',
        },
        {
          q: 'What are the three pillars of observability?',
          a: 'The three pillars are Logs (discrete event records), Metrics (numerical aggregates over time), and Traces (end-to-end request paths through distributed systems). They are most powerful when correlated together so you can jump from a metric spike to the relevant traces and logs.',
        },
        {
          q: 'Should I use Prometheus or Datadog?',
          a: 'Prometheus is open-source and free but requires you to manage infrastructure. Datadog is easier to set up but costs more at scale. Choose Prometheus + Grafana for cost control and flexibility, or Datadog for convenience and all-in-one functionality. Many teams use a hybrid approach.',
        },
        {
          q: 'What is OpenTelemetry and why does it matter?',
          a: 'OpenTelemetry is a vendor-neutral framework for telemetry data (traces, metrics, logs). It prevents vendor lock-in by letting you switch observability backends without changing application code. It is the CNCF second-most-active project and is becoming the industry standard.',
        },
        {
          q: 'What is the difference between SLI, SLO, and SLA?',
          a: 'SLI is a measurement (e.g., p99 latency). SLO is a target for that measurement (e.g., p99 < 200ms). SLA is a contractual agreement with consequences for missing the SLO (e.g., service credits). SLIs feed into SLOs, and SLOs back SLAs.',
        },
        {
          q: 'How do I avoid alert fatigue?',
          a: 'Alert on symptoms (high error rate, SLO burn) not causes (CPU spike). Every alert must be actionable. Tier alerts by severity: P1 pages on-call, P2 goes to Slack, P3 creates a ticket. Review and prune alerts quarterly. If nobody acts on an alert, delete it.',
        },
        {
          q: 'Do I need distributed tracing for a monolith?',
          a: 'Tracing is most valuable in microservices architectures where requests cross service boundaries. For a monolith, metrics and logs are usually sufficient. However, tracing can still help visualize the flow through different modules, database calls, and external API requests within a monolith.',
        },
        {
          q: 'How much should I spend on observability tooling?',
          a: 'A common benchmark is 5-10% of your infrastructure spend on observability. Start with open-source tools (Prometheus, Grafana, Loki, Tempo) to minimize cost. Move to managed solutions when the operational burden of self-hosting exceeds the licensing cost. Use tail-based sampling to reduce trace storage costs.',
        },
      ].map((faq, i) => (
        <details key={i} style={{ marginBottom: 12, padding: '12px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{faq.q}</summary>
          <p style={{ marginTop: 8, lineHeight: 1.7, color: '#475569' }}>{faq.a}</p>
        </details>
      ))}
    </article>
  );
}
