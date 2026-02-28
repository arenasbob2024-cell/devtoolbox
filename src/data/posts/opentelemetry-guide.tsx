'use client';
import React from 'react';

const translations = {
  en: {
    title: 'OpenTelemetry Complete Guide: Unified Observability for Modern Applications',
    description:
      'Master OpenTelemetry from basics to production: architecture (API/SDK/Collector), three signals (traces/metrics/logs), installation for Node.js/Python/Go/Java, auto-instrumentation, manual instrumentation, context propagation, span attributes and events, exporters (OTLP/Jaeger/Zipkin/Prometheus), Collector configuration (receivers/processors/exporters/pipelines), sampling strategies, integrating with Grafana/Datadog/New Relic, Kubernetes deployment, and observability best practices.',
  },
  zh: {
    title: 'OpenTelemetry 完全指南：现代应用的统一可观测性',
    description:
      '从基础到生产环境全面掌握 OpenTelemetry：架构（API/SDK/Collector）、三大信号（追踪/指标/日志）、Node.js/Python/Go/Java 安装、自动埋点、手动埋点、上下文传播、Span 属性与事件、导出器（OTLP/Jaeger/Zipkin/Prometheus）、Collector 配置（接收器/处理器/导出器/管道）、采样策略、集成 Grafana/Datadog/New Relic、Kubernetes 部署和可观测性最佳实践。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OpenTelemetry and why should I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenTelemetry (OTel) is a vendor-neutral, open-source observability framework for generating, collecting, and exporting telemetry data (traces, metrics, and logs). It is a CNCF incubating project formed by merging OpenTracing and OpenCensus. You should use it because it provides a single, standardized API across languages, avoids vendor lock-in, and has broad industry adoption from all major cloud providers and observability platforms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the three pillars of observability in OpenTelemetry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The three pillars (signals) in OpenTelemetry are: Traces (distributed traces that follow a request across services, composed of spans), Metrics (numerical measurements over time like counters, gauges, and histograms), and Logs (timestamped text records with structured metadata). OpenTelemetry unifies all three signals with correlated context, enabling engineers to move seamlessly between traces, metrics, and logs during debugging.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the OpenTelemetry Collector and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The OpenTelemetry Collector is a vendor-agnostic proxy that receives, processes, and exports telemetry data. It has three main components: Receivers (accept data in various formats like OTLP, Jaeger, Zipkin, Prometheus), Processors (transform data by batching, filtering, sampling, or adding attributes), and Exporters (send data to backends like Jaeger, Prometheus, Datadog, or any OTLP-compatible endpoint). Pipelines connect these components for each signal type.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does auto-instrumentation work in OpenTelemetry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Auto-instrumentation automatically captures telemetry data from popular libraries and frameworks without code changes. In Node.js, you use the @opentelemetry/auto-instrumentations-node package. In Python, the opentelemetry-instrument CLI wraps your application. In Java, a Java agent JAR is attached at startup. Auto-instrumentation patches HTTP clients, database drivers, message queues, and web frameworks to automatically create spans and propagate context.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is context propagation in OpenTelemetry?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Context propagation is the mechanism that links spans across service boundaries to form a complete distributed trace. When a service makes an outbound request, the current trace context (trace ID, span ID, trace flags) is injected into request headers using W3C Trace Context or B3 format. The receiving service extracts this context and creates child spans under the same trace, enabling end-to-end visibility across microservices.',
      },
    },
    {
      '@type': 'Question',
      name: 'What sampling strategies does OpenTelemetry support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenTelemetry supports several sampling strategies: AlwaysOn (record everything), AlwaysOff (record nothing), TraceIdRatioBased (sample a percentage based on trace ID), ParentBased (respect the parent span decision), and Tail-based sampling (make decisions in the Collector after collecting all spans). Tail-based sampling is the most powerful as it can keep all error traces while sampling successful ones.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I deploy OpenTelemetry in Kubernetes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The recommended approach is using the OpenTelemetry Operator, which provides CRDs for managing Collectors and auto-instrumentation. Deploy Collectors as a DaemonSet (one per node) or Deployment (centralized). Use the Instrumentation CRD to inject auto-instrumentation into pods via annotations. The Operator also supports sidecar mode for per-pod Collector instances.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does OpenTelemetry integrate with Grafana, Datadog, and New Relic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenTelemetry integrates via exporters. Grafana receives OTLP data into Tempo (traces), Mimir (metrics), and Loki (logs). Datadog accepts OTLP via its Agent or OTLP ingest endpoints. New Relic has native OTLP support where you send data to their endpoint with a license key header. All three support the standard OTLP protocol, making backend migration straightforward.',
      },
    },
  ],
};

export default function OpentelemetryGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
  };

  const strongLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#0f172a',
  };

  return (
    <article style={{ maxWidth: '100%' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR */}
      <div style={tldrBoxStyle}>
        <strong style={strongLabelStyle}>TL;DR</strong>
        {isZh
          ? 'OpenTelemetry 是 CNCF 的开源可观测性框架，统一了分布式追踪、指标和日志。它提供跨语言的标准 API，通过 Collector 实现厂商无关的数据采集和导出，支持自动埋点和手动埋点，是构建现代可观测性平台的基石。'
          : 'OpenTelemetry is the CNCF open-source observability framework that unifies distributed traces, metrics, and logs. It provides a standardized API across languages, a vendor-agnostic Collector for data collection and export, supports auto and manual instrumentation, and is the foundation for building modern observability platforms.'}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={strongLabelStyle}>{isZh ? '核心要点' : 'Key Takeaways'}</strong>
        <ul style={{ ...ulStyle, marginBottom: 0 }}>
          <li>{isZh ? 'OTel 统一三大信号：追踪、指标和日志，并通过上下文关联' : 'OTel unifies three signals: traces, metrics, and logs with correlated context'}</li>
          <li>{isZh ? '架构分为 API（接口）、SDK（实现）和 Collector（数据管道）' : 'Architecture splits into API (interfaces), SDK (implementation), and Collector (data pipeline)'}</li>
          <li>{isZh ? '自动埋点可零代码修改生成遥测数据' : 'Auto-instrumentation generates telemetry data with zero code changes'}</li>
          <li>{isZh ? 'OTLP 是标准协议，所有主流后端均支持' : 'OTLP is the standard protocol supported by all major backends'}</li>
          <li>{isZh ? '尾部采样可在保留错误追踪的同时降低成本' : 'Tail-based sampling reduces costs while retaining error traces'}</li>
          <li>{isZh ? 'Kubernetes Operator 简化了集群内的部署和管理' : 'Kubernetes Operator simplifies in-cluster deployment and management'}</li>
        </ul>
      </div>

      {/* What is OpenTelemetry */}
      <h2 style={h2Style}>{isZh ? '什么是 OpenTelemetry？' : 'What Is OpenTelemetry?'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'OpenTelemetry（简称 OTel）是一个厂商中立的开源可观测性框架，用于生成、采集和导出遥测数据。它由 CNCF 托管，是 OpenTracing 和 OpenCensus 合并的产物，提供统一的 API、SDK 和工具覆盖追踪、指标和日志三大信号。'
          : 'OpenTelemetry (OTel) is a vendor-neutral, open-source observability framework for generating, collecting, and exporting telemetry data. Hosted by the CNCF, it was formed by merging OpenTracing and OpenCensus, providing a unified set of APIs, SDKs, and tools covering traces, metrics, and logs.'}
      </p>

      {/* Architecture */}
      <h2 style={h2Style}>{isZh ? 'OpenTelemetry 架构' : 'OpenTelemetry Architecture'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'OTel 架构由三层组成：API（定义接口）、SDK（提供实现）和 Collector（数据管道）。'
          : 'OTel architecture consists of three layers: API (defines interfaces), SDK (provides implementation), and Collector (data pipeline).'}
      </p>
      <pre style={preStyle}><code>{'Application Layer           Collector Layer            Backend Layer\n'
        + '+--------------------+     +--------------------+    +------------+\n'
        + '| OTel API           |     | Receivers          |    | Jaeger     |\n'
        + '|  TracerProvider     | --> |  otlp, jaeger,     | -> | Tempo      |\n'
        + '|  MeterProvider      |     |  prometheus, zipkin|    | Zipkin     |\n'
        + '|  LoggerProvider     |     +--------------------+    +------------+\n'
        + '+--------------------+     | Processors         |    | Prometheus |\n'
        + '| OTel SDK           |     |  batch, filter,    | -> | Mimir      |\n'
        + '|  SpanProcessor      |     |  attributes, sample|    | Datadog    |\n'
        + '|  MetricReader       |     +--------------------+    +------------+\n'
        + '|  LogRecordProcessor |     | Exporters          |    | New Relic  |\n'
        + '|  OTLP Exporter      |     |  otlp, prometheus, | -> | Grafana    |\n'
        + '+--------------------+     |  datadog, debug    |    | Loki       |\n'
        + '                           +--------------------+    +------------+'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'API 层' : 'API Layer'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'API 定义零依赖接口（TracerProvider、MeterProvider、LoggerProvider）。库作者安全依赖 API 埋点而不引入特定实现。'
          : 'The API defines zero-dependency interfaces (TracerProvider, MeterProvider, LoggerProvider). Library authors instrument against the API without pulling in specific implementations.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'SDK 层' : 'SDK Layer'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'SDK 提供 API 的具体实现，包括 Span 处理器、指标聚合器和导出器。应用开发者在入口配置 SDK。'
          : 'The SDK provides concrete implementations including Span processors, metric aggregators, and exporters. Application developers configure the SDK at the entry point.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Collector 层' : 'Collector Layer'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Collector 是独立服务，负责接收、处理和导出数据。它解耦应用与后端，支持批处理、重试和多目标导出。'
          : 'The Collector is a standalone service that receives, processes, and exports data. It decouples applications from backends, supporting batching, retries, and multi-destination export.'}
      </p>

      {/* Three Signals */}
      <h2 style={h2Style}>{isZh ? '三大信号' : 'Three Signals: Traces, Metrics, and Logs'}</h2>

      <h3 style={h3Style}>{isZh ? '分布式追踪（Traces）' : 'Distributed Traces'}</h3>
      <p style={pStyle}>
        {isZh
          ? '追踪记录请求在分布式系统中的完整路径。一个 Trace 由多个 Span 组成，通过 parent-child 关系形成树状结构。'
          : 'Traces record the complete path a request takes through a distributed system. A Trace is composed of multiple Spans forming a tree via parent-child relationships.'}
      </p>
      <pre style={preStyle}><code>{'Trace: [trace_id: abc123]\n'
        + '|\n'
        + '+-- Span A: API Gateway (root span, 250ms)\n'
        + '|   attributes: http.method=GET, http.url=/api/orders\n'
        + '|   +-- Span B: Order Service (200ms)\n'
        + '|   |   +-- Span C: DB Query (45ms, db.system=postgresql)\n'
        + '|   |   +-- Span D: Cache Lookup (3ms, db.system=redis)\n'
        + '|   +-- Span E: Payment Service (35ms, status=ERROR)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '指标（Metrics）' : 'Metrics'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'OTel 指标定义了 Counter（单调递增）、Histogram（分布统计）、Gauge（瞬时值）和 UpDownCounter（可增可减）。'
          : 'OTel Metrics defines Counter (monotonically increasing), Histogram (distribution), Gauge (instantaneous), and UpDownCounter (bidirectional).'}
      </p>

      <h3 style={h3Style}>{isZh ? '日志（Logs）' : 'Logs'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'OTel 日志通过 Bridge API 与现有日志框架（Log4j、SLF4J、Python logging）集成，将日志与追踪上下文关联。'
          : 'OTel Logs integrates with existing frameworks (Log4j, SLF4J, Python logging) via a Bridge API, correlating log records with trace context.'}
      </p>

      {/* Installation */}
      <h2 style={h2Style}>{isZh ? '安装与设置' : 'Installation and Setup'}</h2>

      <h3 style={h3Style}>Node.js</h3>
      <pre style={preStyle}><code>{'npm install @opentelemetry/api @opentelemetry/sdk-node \\\n'
        + '  @opentelemetry/auto-instrumentations-node \\\n'
        + '  @opentelemetry/exporter-trace-otlp-http \\\n'
        + '  @opentelemetry/exporter-metrics-otlp-http'}</code></pre>
      <pre style={preStyle}><code>{'// tracing.ts - Initialize OpenTelemetry\n'
        + 'import { NodeSDK } from \'@opentelemetry/sdk-node\';\n'
        + 'import { getNodeAutoInstrumentations } from\n'
        + '  \'@opentelemetry/auto-instrumentations-node\';\n'
        + 'import { OTLPTraceExporter } from\n'
        + '  \'@opentelemetry/exporter-trace-otlp-http\';\n'
        + 'import { OTLPMetricExporter } from\n'
        + '  \'@opentelemetry/exporter-metrics-otlp-http\';\n'
        + 'import { PeriodicExportingMetricReader } from\n'
        + '  \'@opentelemetry/sdk-metrics\';\n'
        + '\n'
        + 'const sdk = new NodeSDK({\n'
        + '  traceExporter: new OTLPTraceExporter({\n'
        + '    url: \'http://localhost:4318/v1/traces\',\n'
        + '  }),\n'
        + '  metricReader: new PeriodicExportingMetricReader({\n'
        + '    exporter: new OTLPMetricExporter({\n'
        + '      url: \'http://localhost:4318/v1/metrics\',\n'
        + '    }),\n'
        + '  }),\n'
        + '  instrumentations: [getNodeAutoInstrumentations()],\n'
        + '  serviceName: \'my-node-service\',\n'
        + '});\n'
        + '\n'
        + 'sdk.start();\n'
        + 'process.on(\'SIGTERM\', () => sdk.shutdown());'}</code></pre>

      <h3 style={h3Style}>Python</h3>
      <pre style={preStyle}><code>{'pip install opentelemetry-api opentelemetry-sdk \\\n'
        + '  opentelemetry-exporter-otlp opentelemetry-instrumentation\n'
        + '\n'
        + '# Auto-instrument - no code changes needed:\n'
        + 'opentelemetry-instrument \\\n'
        + '  --service_name my-python-service \\\n'
        + '  --traces_exporter otlp \\\n'
        + '  --metrics_exporter otlp \\\n'
        + '  --exporter_otlp_endpoint http://localhost:4317 \\\n'
        + '  python app.py'}</code></pre>

      <h3 style={h3Style}>Go</h3>
      <pre style={preStyle}><code>{'go get go.opentelemetry.io/otel \\\n'
        + '  go.opentelemetry.io/otel/sdk \\\n'
        + '  go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp\n'
        + '\n'
        + '// main.go\n'
        + 'func initTracer() (func(context.Context) error, error) {\n'
        + '  exporter, err := otlptracehttp.New(\n'
        + '    context.Background(),\n'
        + '    otlptracehttp.WithEndpoint("localhost:4318"),\n'
        + '    otlptracehttp.WithInsecure(),\n'
        + '  )\n'
        + '  if err != nil { return nil, err }\n'
        + '  tp := sdktrace.NewTracerProvider(\n'
        + '    sdktrace.WithBatcher(exporter),\n'
        + '    sdktrace.WithResource(resource.NewWithAttributes(\n'
        + '      semconv.SchemaURL,\n'
        + '      semconv.ServiceNameKey.String("my-go-service"),\n'
        + '    )),\n'
        + '  )\n'
        + '  otel.SetTracerProvider(tp)\n'
        + '  return tp.Shutdown, nil\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>Java</h3>
      <pre style={preStyle}><code>{'# Download the Java agent and run with your app\n'
        + 'curl -L -o opentelemetry-javaagent.jar \\\n'
        + '  https://github.com/open-telemetry/\\\n'
        + 'opentelemetry-java-instrumentation/releases/latest/\\\n'
        + 'download/opentelemetry-javaagent.jar\n'
        + '\n'
        + 'java -javaagent:opentelemetry-javaagent.jar \\\n'
        + '  -Dotel.service.name=my-java-service \\\n'
        + '  -Dotel.exporter.otlp.endpoint=http://localhost:4317 \\\n'
        + '  -jar myapp.jar'}</code></pre>

      {/* Auto-Instrumentation */}
      <h2 style={h2Style}>{isZh ? '自动埋点' : 'Auto-Instrumentation'}</h2>
      <p style={pStyle}>
        {isZh
          ? '自动埋点通过补丁或代理机制自动拦截常用库调用，无需修改业务代码即可生成 Span 和传播上下文。各语言支持的常见库：'
          : 'Auto-instrumentation patches popular libraries to generate spans and propagate context without code changes. Commonly supported libraries:'}
      </p>
      <ul style={ulStyle}>
        <li><strong>Node.js:</strong> Express, Fastify, HTTP, gRPC, pg, mysql2, Redis, MongoDB, AWS SDK</li>
        <li><strong>Python:</strong> Flask, Django, FastAPI, requests, psycopg2, SQLAlchemy, Redis, Celery</li>
        <li><strong>Go:</strong> net/http, gRPC, database/sql, Gin, Echo</li>
        <li><strong>Java:</strong> Spring Boot, Servlet, JDBC, Hibernate, Kafka, gRPC, OkHttp</li>
      </ul>

      {/* Manual Instrumentation */}
      <h2 style={h2Style}>{isZh ? '手动埋点' : 'Manual Instrumentation'}</h2>
      <p style={pStyle}>
        {isZh
          ? '手动埋点让你完全控制遥测数据，适合添加业务特定的 Span、自定义属性和指标。'
          : 'Manual instrumentation gives full control over telemetry data for business-specific spans, custom attributes, and metrics.'}
      </p>
      <pre style={preStyle}><code>{'import { trace, SpanStatusCode } from \'@opentelemetry/api\';\n'
        + '\n'
        + 'const tracer = trace.getTracer(\'order-service\', \'1.0.0\');\n'
        + '\n'
        + 'async function processOrder(orderId: string) {\n'
        + '  return tracer.startActiveSpan(\'processOrder\', async (span) => {\n'
        + '    try {\n'
        + '      span.setAttribute(\'order.id\', orderId);\n'
        + '      span.addEvent(\'order.validation.started\');\n'
        + '      const order = await validateOrder(orderId);\n'
        + '      span.addEvent(\'order.validation.completed\', {\n'
        + '        \'order.items_count\': order.items.length,\n'
        + '      });\n'
        + '      // Nested span for payment\n'
        + '      await tracer.startActiveSpan(\'processPayment\',\n'
        + '        async (paymentSpan) => {\n'
        + '          paymentSpan.setAttribute(\n'
        + '            \'payment.method\', order.paymentMethod);\n'
        + '          await chargePayment(order);\n'
        + '          paymentSpan.end();\n'
        + '        });\n'
        + '      span.setStatus({ code: SpanStatusCode.OK });\n'
        + '      return order;\n'
        + '    } catch (error) {\n'
        + '      span.setStatus({\n'
        + '        code: SpanStatusCode.ERROR,\n'
        + '        message: (error as Error).message,\n'
        + '      });\n'
        + '      span.recordException(error as Error);\n'
        + '      throw error;\n'
        + '    } finally {\n'
        + '      span.end();\n'
        + '    }\n'
        + '  });\n'
        + '}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '自定义指标' : 'Custom Metrics'}</h3>
      <pre style={preStyle}><code>{'import { metrics } from \'@opentelemetry/api\';\n'
        + 'const meter = metrics.getMeter(\'order-service\', \'1.0.0\');\n'
        + '\n'
        + '// Counter\n'
        + 'const orderCounter = meter.createCounter(\'orders.processed.total\',\n'
        + '  { description: \'Total orders processed\', unit: \'orders\' });\n'
        + '\n'
        + '// Histogram\n'
        + 'const durationHist = meter.createHistogram(\n'
        + '  \'orders.processing.duration\',\n'
        + '  { description: \'Processing time\', unit: \'ms\' });\n'
        + '\n'
        + '// Observable Gauge\n'
        + 'const activeGauge = meter.createObservableGauge(\n'
        + '  \'orders.active.count\',\n'
        + '  { description: \'Active orders\' });\n'
        + 'activeGauge.addCallback((r) => r.observe(getActiveCount()));\n'
        + '\n'
        + 'orderCounter.add(1, { \'order.type\': \'standard\' });\n'
        + 'durationHist.record(245, { \'order.type\': \'standard\' });'}</code></pre>

      {/* Context Propagation */}
      <h2 style={h2Style}>{isZh ? '上下文传播' : 'Context Propagation'}</h2>
      <p style={pStyle}>
        {isZh
          ? '上下文传播将跨服务的 Span 链接成完整追踪。W3C Trace Context 通过 traceparent 头注入 trace ID、span ID 和采样标志。'
          : 'Context propagation links spans across services into complete traces. W3C Trace Context injects trace ID, span ID, and sampling flags via the traceparent header.'}
      </p>
      <pre style={preStyle}><code>{'// W3C Trace Context header:\n'
        + '// traceparent: 00-<trace-id>-<parent-span-id>-<flags>\n'
        + '\n'
        + 'import { context, propagation } from \'@opentelemetry/api\';\n'
        + '\n'
        + '// Inject context into outgoing request\n'
        + 'function makeRequest(url: string) {\n'
        + '  const headers: Record<string, string> = {};\n'
        + '  propagation.inject(context.active(), headers);\n'
        + '  return fetch(url, { headers });\n'
        + '}\n'
        + '\n'
        + '// Extract context from incoming request\n'
        + 'function handleRequest(req: Request) {\n'
        + '  const ctx = propagation.extract(\n'
        + '    context.active(), req.headers);\n'
        + '  return context.with(ctx, () => {\n'
        + '    return tracer.startActiveSpan(\'handle\', (span) => {\n'
        + '      // child of caller span\n'
        + '      span.end();\n'
        + '    });\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Span Attributes & Events */}
      <h2 style={h2Style}>{isZh ? 'Span 属性与事件' : 'Span Attributes and Events'}</h2>
      <p style={pStyle}>
        {isZh
          ? '属性是键值对元数据，事件是 Span 内的时间点记录。OTel 语义约定标准化了常见属性名。'
          : 'Attributes are key-value metadata, events are point-in-time records within a span. OTel Semantic Conventions standardize common attribute names.'}
      </p>
      <pre style={preStyle}><code>{'// Semantic Conventions examples:\n'
        + '// HTTP: http.request.method, http.response.status_code, url.full\n'
        + '// DB:   db.system, db.statement, db.operation.name\n'
        + '// RPC:  rpc.system, rpc.service, rpc.method\n'
        + '\n'
        + 'span.setAttribute(\'http.request.method\', \'POST\');\n'
        + 'span.setAttribute(\'http.response.status_code\', 200);\n'
        + 'span.setAttribute(\'db.system\', \'postgresql\');\n'
        + 'span.setAttribute(\'db.statement\', \'SELECT * FROM orders WHERE id=?\');\n'
        + '\n'
        + 'span.addEvent(\'cache.miss\', {\n'
        + '  \'cache.key\': \'user:1234\',\n'
        + '  \'cache.backend\': \'redis\',\n'
        + '});\n'
        + '\n'
        + 'span.recordException(new Error(\'Connection timeout\'));'}</code></pre>

      {/* Exporters */}
      <h2 style={h2Style}>{isZh ? '导出器' : 'Exporters'}</h2>
      <p style={pStyle}>
        {isZh
          ? '导出器将遥测数据发送到后端。OTLP 是原生协议，所有主流后端均支持。'
          : 'Exporters send telemetry data to backends. OTLP is the native protocol supported by all major backends.'}
      </p>
      <ul style={ulStyle}>
        <li><strong>OTLP (gRPC / HTTP):</strong> {isZh ? '推荐标准协议，支持所有三种信号' : 'Recommended standard, supports all three signals'}</li>
        <li><strong>Jaeger:</strong> {isZh ? '直接导出到 Jaeger（Thrift 或 gRPC）' : 'Direct export to Jaeger (Thrift or gRPC)'}</li>
        <li><strong>Zipkin:</strong> {isZh ? 'Zipkin 兼容后端' : 'Zipkin-compatible backends'}</li>
        <li><strong>Prometheus:</strong> {isZh ? '暴露 /metrics 端点' : 'Expose /metrics endpoint for scraping'}</li>
        <li><strong>Console/Debug:</strong> {isZh ? '开发调试用' : 'For development debugging'}</li>
      </ul>

      {/* Collector Configuration */}
      <h2 style={h2Style}>{isZh ? 'Collector 配置' : 'Collector Configuration'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Collector 通过 YAML 定义接收器、处理器、导出器和管道。以下是完整的生产配置：'
          : 'The Collector is configured via YAML defining receivers, processors, exporters, and pipelines:'}
      </p>
      <pre style={preStyle}><code>{'# otel-collector-config.yaml\n'
        + 'receivers:\n'
        + '  otlp:\n'
        + '    protocols:\n'
        + '      grpc: { endpoint: 0.0.0.0:4317 }\n'
        + '      http: { endpoint: 0.0.0.0:4318 }\n'
        + '  prometheus:\n'
        + '    config:\n'
        + '      scrape_configs:\n'
        + '        - job_name: app-metrics\n'
        + '          scrape_interval: 15s\n'
        + '          static_configs:\n'
        + '            - targets: [\'app:9090\']\n'
        + '  jaeger:\n'
        + '    protocols:\n'
        + '      thrift_http: { endpoint: 0.0.0.0:14268 }\n'
        + '\n'
        + 'processors:\n'
        + '  batch:\n'
        + '    timeout: 5s\n'
        + '    send_batch_size: 1024\n'
        + '  resource:\n'
        + '    attributes:\n'
        + '      - key: environment\n'
        + '        value: production\n'
        + '        action: upsert\n'
        + '  filter:\n'
        + '    error_mode: ignore\n'
        + '    traces:\n'
        + '      span:\n'
        + '        - \'attributes["http.target"] == "/health"\'\n'
        + '  memory_limiter:\n'
        + '    check_interval: 1s\n'
        + '    limit_mib: 2048\n'
        + '    spike_limit_mib: 512\n'
        + '\n'
        + 'exporters:\n'
        + '  otlp/tempo:\n'
        + '    endpoint: tempo:4317\n'
        + '    tls: { insecure: true }\n'
        + '  otlp/mimir:\n'
        + '    endpoint: mimir:4317\n'
        + '    tls: { insecure: true }\n'
        + '  debug:\n'
        + '    verbosity: detailed\n'
        + '\n'
        + 'service:\n'
        + '  pipelines:\n'
        + '    traces:\n'
        + '      receivers: [otlp, jaeger]\n'
        + '      processors: [memory_limiter, filter, batch, resource]\n'
        + '      exporters: [otlp/tempo]\n'
        + '    metrics:\n'
        + '      receivers: [otlp, prometheus]\n'
        + '      processors: [memory_limiter, batch, resource]\n'
        + '      exporters: [otlp/mimir]\n'
        + '    logs:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [memory_limiter, batch, resource]\n'
        + '      exporters: [debug]'}</code></pre>

      <h3 style={h3Style}>{isZh ? '运行 Collector' : 'Running the Collector'}</h3>
      <pre style={preStyle}><code>{'# Docker\n'
        + 'docker run -d --name otel-collector \\\n'
        + '  -p 4317:4317 -p 4318:4318 \\\n'
        + '  -v ./otel-collector-config.yaml:/etc/otelcol/config.yaml \\\n'
        + '  otel/opentelemetry-collector-contrib:latest\n'
        + '\n'
        + '# Docker Compose\n'
        + 'services:\n'
        + '  otel-collector:\n'
        + '    image: otel/opentelemetry-collector-contrib:latest\n'
        + '    command: [\"--config=/etc/otelcol/config.yaml\"]\n'
        + '    volumes:\n'
        + '      - ./otel-collector-config.yaml:/etc/otelcol/config.yaml\n'
        + '    ports:\n'
        + '      - \"4317:4317\"   # OTLP gRPC\n'
        + '      - \"4318:4318\"   # OTLP HTTP\n'
        + '      - \"8888:8888\"   # Collector metrics'}</code></pre>

      {/* Sampling Strategies */}
      <h2 style={h2Style}>{isZh ? '采样策略' : 'Sampling Strategies'}</h2>
      <p style={pStyle}>
        {isZh
          ? '高流量系统中采集每条追踪不实际。采样策略在可观测性和成本之间取得平衡。'
          : 'Collecting every trace in high-traffic systems is impractical. Sampling strategies balance observability and cost.'}
      </p>

      <h3 style={h3Style}>{isZh ? '头部采样（SDK 端）' : 'Head-Based Sampling (SDK)'}</h3>
      <pre style={preStyle}><code>{'import {\n'
        + '  TraceIdRatioBasedSampler,\n'
        + '  ParentBasedSampler,\n'
        + '} from \'@opentelemetry/sdk-trace-base\';\n'
        + '\n'
        + '// ParentBased: respect parent decision, sample 10% of roots\n'
        + 'const sampler = new ParentBasedSampler({\n'
        + '  root: new TraceIdRatioBasedSampler(0.1),\n'
        + '});\n'
        + '\n'
        + 'const sdk = new NodeSDK({ sampler, /* ... */ });'}</code></pre>

      <h3 style={h3Style}>{isZh ? '尾部采样（Collector 端）' : 'Tail-Based Sampling (Collector)'}</h3>
      <p style={pStyle}>
        {isZh
          ? '尾部采样在 Collector 中看到完整追踪后决策，适合保留所有错误和高延迟追踪。'
          : 'Tail-based sampling decides in the Collector after seeing complete traces, ideal for retaining all error and high-latency traces.'}
      </p>
      <pre style={preStyle}><code>{'processors:\n'
        + '  tail_sampling:\n'
        + '    decision_wait: 10s\n'
        + '    num_traces: 100000\n'
        + '    policies:\n'
        + '      - name: error-policy\n'
        + '        type: status_code\n'
        + '        status_code: { status_codes: [ERROR] }\n'
        + '      - name: latency-policy\n'
        + '        type: latency\n'
        + '        latency: { threshold_ms: 2000 }\n'
        + '      - name: probabilistic-policy\n'
        + '        type: probabilistic\n'
        + '        probabilistic: { sampling_percentage: 5 }\n'
        + '      - name: string-attr-policy\n'
        + '        type: string_attribute\n'
        + '        string_attribute:\n'
        + '          key: priority\n'
        + '          values: [high, critical]'}</code></pre>

      {/* Backend Integration */}
      <h2 style={h2Style}>{isZh ? '集成可观测性后端' : 'Integrating with Observability Backends'}</h2>

      <h3 style={h3Style}>Grafana Stack (Tempo + Mimir + Loki)</h3>
      <pre style={preStyle}><code>{'exporters:\n'
        + '  otlp/tempo:\n'
        + '    endpoint: tempo:4317\n'
        + '    tls: { insecure: true }\n'
        + '  otlphttp/mimir:\n'
        + '    endpoint: http://mimir:9009/otlp\n'
        + '  otlphttp/loki:\n'
        + '    endpoint: http://loki:3100/otlp\n'
        + '\n'
        + 'service:\n'
        + '  pipelines:\n'
        + '    traces:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [batch]\n'
        + '      exporters: [otlp/tempo]\n'
        + '    metrics:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [batch]\n'
        + '      exporters: [otlphttp/mimir]\n'
        + '    logs:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [batch]\n'
        + '      exporters: [otlphttp/loki]'}</code></pre>

      <h3 style={h3Style}>Datadog</h3>
      <pre style={preStyle}><code>{'exporters:\n'
        + '  datadog:\n'
        + '    api:\n'
        + '      key: \"\\${DD_API_KEY}\"\n'
        + '      site: datadoghq.com\n'
        + '    traces:\n'
        + '      span_name_as_resource_name: true\n'
        + '\n'
        + 'service:\n'
        + '  pipelines:\n'
        + '    traces:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [batch]\n'
        + '      exporters: [datadog]'}</code></pre>

      <h3 style={h3Style}>New Relic</h3>
      <pre style={preStyle}><code>{'exporters:\n'
        + '  otlp/newrelic:\n'
        + '    endpoint: otlp.nr-data.net:4317\n'
        + '    headers:\n'
        + '      api-key: \"\\${NEW_RELIC_LICENSE_KEY}\"\n'
        + '\n'
        + 'service:\n'
        + '  pipelines:\n'
        + '    traces:\n'
        + '      receivers: [otlp]\n'
        + '      processors: [batch]\n'
        + '      exporters: [otlp/newrelic]'}</code></pre>

      {/* Kubernetes Deployment */}
      <h2 style={h2Style}>{isZh ? 'Kubernetes 部署' : 'Kubernetes Deployment'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'OpenTelemetry Operator 是 K8s 中管理 OTel 的推荐方式，提供 CRD 管理 Collector 和自动埋点注入。'
          : 'The OpenTelemetry Operator is the recommended way to manage OTel in Kubernetes, providing CRDs for Collectors and auto-instrumentation injection.'}
      </p>
      <pre style={preStyle}><code>{'# Install cert-manager + OTel Operator\n'
        + 'kubectl apply -f https://github.com/cert-manager/cert-manager/\\\n'
        + 'releases/download/v1.14.0/cert-manager.yaml\n'
        + '\n'
        + 'helm repo add open-telemetry \\\n'
        + '  https://open-telemetry.github.io/opentelemetry-helm-charts\n'
        + 'helm install otel-operator \\\n'
        + '  open-telemetry/opentelemetry-operator \\\n'
        + '  --namespace otel-system --create-namespace'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Collector CRD (DaemonSet)' : 'Collector CRD (DaemonSet Mode)'}</h3>
      <pre style={preStyle}><code>{'apiVersion: opentelemetry.io/v1beta1\n'
        + 'kind: OpenTelemetryCollector\n'
        + 'metadata:\n'
        + '  name: otel\n'
        + '  namespace: otel-system\n'
        + 'spec:\n'
        + '  mode: daemonset\n'
        + '  config:\n'
        + '    receivers:\n'
        + '      otlp:\n'
        + '        protocols:\n'
        + '          grpc: { endpoint: 0.0.0.0:4317 }\n'
        + '          http: { endpoint: 0.0.0.0:4318 }\n'
        + '    processors:\n'
        + '      batch: { timeout: 5s }\n'
        + '      k8sattributes:\n'
        + '        extract:\n'
        + '          metadata:\n'
        + '            - k8s.pod.name\n'
        + '            - k8s.namespace.name\n'
        + '            - k8s.deployment.name\n'
        + '      memory_limiter:\n'
        + '        check_interval: 1s\n'
        + '        limit_mib: 512\n'
        + '    exporters:\n'
        + '      otlp:\n'
        + '        endpoint: tempo.observability:4317\n'
        + '        tls: { insecure: true }\n'
        + '    service:\n'
        + '      pipelines:\n'
        + '        traces:\n'
        + '          receivers: [otlp]\n'
        + '          processors: [memory_limiter, k8sattributes, batch]\n'
        + '          exporters: [otlp]'}</code></pre>

      <h3 style={h3Style}>{isZh ? '自动埋点注入' : 'Auto-Instrumentation Injection'}</h3>
      <pre style={preStyle}><code>{'apiVersion: opentelemetry.io/v1alpha1\n'
        + 'kind: Instrumentation\n'
        + 'metadata:\n'
        + '  name: otel-instrumentation\n'
        + 'spec:\n'
        + '  exporter:\n'
        + '    endpoint: http://otel-collector.otel-system:4317\n'
        + '  propagators: [tracecontext, baggage]\n'
        + '  sampler:\n'
        + '    type: parentbased_traceidratio\n'
        + '    argument: \"0.25\"\n'
        + '  nodejs:\n'
        + '    image: ghcr.io/open-telemetry/opentelemetry-operator/\\\n'
        + 'autoinstrumentation-nodejs:latest\n'
        + '  python:\n'
        + '    image: ghcr.io/open-telemetry/opentelemetry-operator/\\\n'
        + 'autoinstrumentation-python:latest\n'
        + '---\n'
        + '# Annotate Deployment for auto-instrumentation\n'
        + 'apiVersion: apps/v1\n'
        + 'kind: Deployment\n'
        + 'metadata:\n'
        + '  name: my-node-app\n'
        + 'spec:\n'
        + '  template:\n'
        + '    metadata:\n'
        + '      annotations:\n'
        + '        instrumentation.opentelemetry.io/inject-nodejs: \"true\"\n'
        + '    spec:\n'
        + '      containers:\n'
        + '        - name: app\n'
        + '          image: my-node-app:latest'}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{isZh ? '最佳实践' : 'Best Practices'}</h2>

      <h3 style={h3Style}>{isZh ? '1. 遵循语义约定' : '1. Follow Semantic Conventions'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用标准属性名（如 http.request.method 而非 method），确保跨服务一致性并让后端自动解析。'
          : 'Use standard attribute names (e.g., http.request.method not method) for cross-service consistency and automatic backend parsing.'}
      </p>

      <h3 style={h3Style}>{isZh ? '2. 设置资源属性' : '2. Set Resource Attributes'}</h3>
      <pre style={preStyle}><code>{'import { Resource } from \'@opentelemetry/resources\';\n'
        + 'import {\n'
        + '  ATTR_SERVICE_NAME,\n'
        + '  ATTR_SERVICE_VERSION,\n'
        + '  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,\n'
        + '} from \'@opentelemetry/semantic-conventions\';\n'
        + '\n'
        + 'const resource = new Resource({\n'
        + '  [ATTR_SERVICE_NAME]: \'order-service\',\n'
        + '  [ATTR_SERVICE_VERSION]: \'2.1.0\',\n'
        + '  [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: \'production\',\n'
        + '});'}</code></pre>

      <h3 style={h3Style}>{isZh ? '3. 控制 Span 粒度' : '3. Control Span Granularity'}</h3>
      <p style={pStyle}>
        {isZh
          ? '为跨网络调用、数据库操作和关键业务操作创建 Span。避免在紧密循环中创建 Span。'
          : 'Create spans for network calls, database operations, and critical business operations. Avoid creating spans in tight loops.'}
      </p>

      <h3 style={h3Style}>{isZh ? '4. 正确处理 Span 生命周期' : '4. Handle Span Lifecycle Correctly'}</h3>
      <p style={pStyle}>
        {isZh
          ? '始终在 finally 块中结束 Span。对异步操作使用 startActiveSpan 保持上下文。'
          : 'Always end spans in a finally block. Use startActiveSpan for async operations to maintain context.'}
      </p>

      <h3 style={h3Style}>{isZh ? '5. 生产环境采样' : '5. Production Sampling'}</h3>
      <p style={pStyle}>
        {isZh
          ? '不要用 AlwaysOn。从 ParentBased + TraceIdRatio(0.1) 开始，配合尾部采样保留错误追踪。'
          : 'Never use AlwaysOn. Start with ParentBased + TraceIdRatio(0.1), add tail-based sampling to retain error traces.'}
      </p>

      <h3 style={h3Style}>{isZh ? '6. 使用 Collector' : '6. Use the Collector'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Collector 提供缓冲、重试、批处理和多目标导出。减少应用端网络连接和资源消耗。'
          : 'The Collector provides buffering, retries, batching, and multi-destination export. Reduces network connections and resource usage on the application side.'}
      </p>

      <h3 style={h3Style}>{isZh ? '7. 关联三大信号' : '7. Correlate All Three Signals'}</h3>
      <pre style={preStyle}><code>{'// Inject trace context into logs (Node.js + Winston)\n'
        + 'import { trace, context } from \'@opentelemetry/api\';\n'
        + 'import winston from \'winston\';\n'
        + '\n'
        + 'const logger = winston.createLogger({\n'
        + '  format: winston.format.combine(\n'
        + '    winston.format((info) => {\n'
        + '      const span = trace.getSpan(context.active());\n'
        + '      if (span) {\n'
        + '        const ctx = span.spanContext();\n'
        + '        info.trace_id = ctx.traceId;\n'
        + '        info.span_id = ctx.spanId;\n'
        + '      }\n'
        + '      return info;\n'
        + '    })(),\n'
        + '    winston.format.json()\n'
        + '  ),\n'
        + '  transports: [new winston.transports.Console()],\n'
        + '});\n'
        + '// Output: {"message":"Order processed",\n'
        + '//  "trace_id":"abc...","span_id":"def..."}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '8. Collector 资源限制' : '8. Set Collector Resource Limits'}</h3>
      <p style={pStyle}>
        {isZh
          ? '配置 memory_limiter 防 OOM，在 K8s 中设置 resources.limits，监控 Collector 自身指标。'
          : 'Configure memory_limiter to prevent OOM, set resources.limits in K8s, and monitor the Collector built-in metrics.'}
      </p>

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'OpenTelemetry 正在成为可观测性的事实标准。厂商中立设计让你一次埋点、导出到任何后端；三大信号的统一上下文关联让调试分布式系统不再是噩梦；Collector 的灵活管道让数据处理变得简单。从自动埋点开始快速获得价值，逐步添加手动埋点、优化采样、部署 Collector，最终建立生产就绪的全栈可观测性平台。'
          : 'OpenTelemetry is becoming the de facto standard for observability. Its vendor-neutral design lets you instrument once and export to any backend. Unified context correlation across all three signals makes debugging distributed systems manageable. The Collector flexible pipelines make data processing straightforward. Start with auto-instrumentation for quick value, then gradually add manual instrumentation, optimize sampling, deploy Collector pipelines, and build a production-ready, full-stack observability platform.'}
      </p>
    </article>
  );
}
