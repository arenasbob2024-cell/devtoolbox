'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'OpenTelemetry vs Jaeger: Observability Framework Comparison',
    intro: 'OpenTelemetry and Jaeger serve different but complementary roles in the observability ecosystem. OpenTelemetry is a vendor-neutral observability framework for generating and exporting telemetry data, while Jaeger is a distributed tracing backend for storing and analyzing traces. OpenTelemetry provides the instrumentation layer, and Jaeger provides the storage and visualization layer.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'OpenTelemetry is not a competitor to Jaeger—it is the instrumentation framework that feeds data to Jaeger and other backends. Use OpenTelemetry for instrumenting applications (metrics, logs, traces) with vendor-neutral APIs. Use Jaeger as a backend to store, visualize, and analyze the trace data collected by OpenTelemetry. They work together in a complete observability stack.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'OpenTelemetry is an instrumentation framework; Jaeger is a tracing backend',
    takeaway2: 'OpenTelemetry provides metrics, logs, and traces; Jaeger focuses on traces',
    takeaway3: 'OpenTelemetry is vendor-neutral; Jaeger is a specific implementation',
    takeaway4: 'Jaeger is the default backend for OpenTelemetry traces',
    takeaway5: 'OpenTelemetry is a CNCF project; Jaeger is a CNCF graduated project',
    takeaway6: 'Use both together for complete distributed tracing solution',
    
    whatIsOtelTitle: 'What is OpenTelemetry?',
    whatIsOtelContent: 'OpenTelemetry is a collection of tools, APIs, and SDKs for instrumenting, generating, collecting, and exporting telemetry data (metrics, logs, and traces). Formed by merging OpenTracing and OpenCensus in 2019, it is now the industry standard for cloud-native observability. OpenTelemetry provides vendor-neutral APIs that work with any observability backend.',
    
    whatIsJaegerTitle: 'What is Jaeger?',
    whatIsJaegerContent: 'Jaeger is an open-source, end-to-end distributed tracing platform developed by Uber. It monitors and troubleshoots microservices-based distributed systems, providing distributed context propagation, transaction monitoring, root cause analysis, and service dependency analysis. Jaeger can receive telemetry data from OpenTelemetry and other instrumentation frameworks.',
    
    performanceTitle: 'Role Comparison',
    performanceIntro: 'Understanding their different roles in observability:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Integration setup and usage:',
    
    otelExampleTitle: 'OpenTelemetry SDK Configuration',
    jaegerExampleTitle: 'Jaeger Backend Configuration',
    
    integrationTitle: 'Integration Patterns',
    integrationIntro: 'How they work together:',
    
    deploymentTitle: 'Deployment Models',
    deploymentIntro: 'Deployment and architecture:',
    
    useCasesTitle: 'Best Use Cases',
    otelBestFor: 'OpenTelemetry is Best For:',
    jaegerBestFor: 'Jaeger is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'OpenTelemetry and Jaeger are complementary technologies, not competitors. OpenTelemetry provides the instrumentation layer to collect telemetry data from applications, while Jaeger provides the backend to store, analyze, and visualize trace data. The standard pattern is to instrument applications with OpenTelemetry SDKs and send the trace data to Jaeger as the backend. This combination provides a complete, vendor-neutral observability solution with powerful distributed tracing capabilities.',
    
    faq1q: 'Do I need both OpenTelemetry and Jaeger?',
    faq1a: 'For distributed tracing, yes. OpenTelemetry provides instrumentation (SDKs to generate traces), while Jaeger provides the backend (storage and visualization). You can use OpenTelemetry with other backends, but Jaeger is the most popular open-source choice for OpenTelemetry traces.',
    
    faq2q: 'Can I use Jaeger without OpenTelemetry?',
    faq2a: 'Yes, Jaeger has its own client libraries (Jaeger clients) that can instrument applications directly. However, OpenTelemetry is now the recommended approach as it provides vendor neutrality and supports metrics and logs in addition to traces.',
    
    faq3q: 'What backends work with OpenTelemetry?',
    faq3a: 'OpenTelemetry works with many backends including Jaeger, Prometheus, commercial APM tools (Datadog, New Relic, Dynatrace), and cloud services (AWS X-Ray, Google Cloud Trace, Azure Monitor). OpenTelemetry Collector can export to multiple backends simultaneously.',
    
    faq4q: 'How do OpenTelemetry and Jaeger integrate?',
    faq4a: 'OpenTelemetry SDKs export trace data in OTLP format. Jaeger receives OTLP data natively (ports 4317 for gRPC, 4318 for HTTP). You can also use the OpenTelemetry Collector as a middle layer to process, filter, and route traces to Jaeger.',
    
    faq5q: 'Is OpenTelemetry replacing Jaeger clients?',
    faq5a: 'Yes, OpenTelemetry is the recommended instrumentation approach. Jaeger clients are in maintenance mode. New applications should use OpenTelemetry SDKs. The Jaeger team recommends OpenTelemetry for instrumentation.',
    
    faq6q: 'What about metrics and logs?',
    faq6a: 'OpenTelemetry provides unified APIs for traces, metrics, and logs. Jaeger only handles traces. For metrics, pair OpenTelemetry with Prometheus. For logs, use OpenTelemetry logs with backends like Loki or Elasticsearch.',
    
    faq7q: 'Which should I adopt first?',
    faq7a: 'Adopt OpenTelemetry SDKs for instrumentation first, as it provides vendor neutrality. Then deploy Jaeger as your trace backend. This approach lets you switch backends later without re-instrumenting your applications.',
    
    faq8q: 'What is the OpenTelemetry Collector?',
    faq8a: 'OpenTelemetry Collector is a proxy that receives telemetry data, processes it (filtering, transformation, enrichment), and exports it to one or more backends. It is deployed between your applications and backends like Jaeger, providing flexibility and reducing coupling.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'OpenTelemetry vs Jaeger：可观测性框架对比',
    intro: 'OpenTelemetry和Jaeger在可观测性生态中扮演不同但互补的角色。OpenTelemetry是一个供应商中立的可观测性框架，用于生成和导出遥测数据，而Jaeger是一个分布式追踪后端，用于存储和分析追踪数据。OpenTelemetry提供检测层，Jaeger提供存储和可视化层。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'OpenTelemetry不是Jaeger的竞争对手——它是向Jaeger和其他后端提供数据的检测框架。使用OpenTelemetry通过供应商中立的API检测应用程序（指标、日志、追踪）。使用Jaeger作为后端存储、可视化和分析OpenTelemetry收集的追踪数据。它们在完整的可观测性堆栈中协同工作。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'OpenTelemetry是检测框架；Jaeger是追踪后端',
    takeaway2: 'OpenTelemetry提供指标、日志和追踪；Jaeger专注于追踪',
    takeaway3: 'OpenTelemetry是供应商中立的；Jaeger是具体实现',
    takeaway4: 'Jaeger是OpenTelemetry追踪的默认后端',
    takeaway5: 'OpenTelemetry是CNCF项目；Jaeger是CNCF毕业项目',
    takeaway6: '两者结合使用构成完整的分布式追踪解决方案',
    
    whatIsOtelTitle: '什么是OpenTelemetry？',
    whatIsOtelContent: 'OpenTelemetry是一套用于检测、生成、收集和导出遥测数据（指标、日志和追踪）的工具、API和SDK集合。2019年由OpenTracing和OpenCensus合并而成，现在是云原生可观测性的行业标准。OpenTelemetry提供与任何可观测性后端兼容的供应商中立API。',
    
    whatIsJaegerTitle: '什么是Jaeger？',
    whatIsJaegerContent: 'Jaeger是由Uber开发的开源端到端分布式追踪平台。它监控和排查基于微服务的分布式系统，提供分布式上下文传播、事务监控、根因分析和服务依赖分析。Jaeger可以接收来自OpenTelemetry和其他检测框架的遥测数据。',
    
    performanceTitle: '角色对比',
    performanceIntro: '理解它们在可观测性中的不同角色：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '集成设置和使用：',
    
    otelExampleTitle: 'OpenTelemetry SDK配置',
    jaegerExampleTitle: 'Jaeger后端配置',
    
    integrationTitle: '集成模式',
    integrationIntro: '它们如何协同工作：',
    
    deploymentTitle: '部署模型',
    deploymentIntro: '部署和架构：',
    
    useCasesTitle: '最佳用例',
    otelBestFor: 'OpenTelemetry最适合：',
    jaegerBestFor: 'Jaeger最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'OpenTelemetry和Jaeger是互补技术，而非竞争对手。OpenTelemetry提供检测层以从应用程序收集遥测数据，而Jaeger提供后端以存储、分析和可视化追踪数据。标准模式是使用OpenTelemetry SDK检测应用程序，并将追踪数据发送到Jaeger作为后端。这种组合提供了完整的、供应商中立的可观测性解决方案，具有强大的分布式追踪能力。',
    
    faq1q: '我需要同时使用OpenTelemetry和Jaeger吗？',
    faq1a: '对于分布式追踪，是的。OpenTelemetry提供检测（生成追踪的SDK），而Jaeger提供后端（存储和可视化）。你可以将OpenTelemetry与其他后端一起使用，但Jaeger是OpenTelemetry追踪最受欢迎的开源选择。',
    
    faq2q: '我可以在没有OpenTelemetry的情况下使用Jaeger吗？',
    faq2a: '是的，Jaeger有自己的客户端库（Jaeger clients）可以直接检测应用程序。但是，OpenTelemetry现在是推荐的方法，因为它提供供应商中立性，并且除追踪外还支持指标和日志。',
    
    faq3q: '哪些后端与OpenTelemetry兼容？',
    faq3a: 'OpenTelemetry与许多后端兼容，包括Jaeger、Prometheus、商业APM工具（Datadog、New Relic、Dynatrace）和云服务（AWS X-Ray、Google Cloud Trace、Azure Monitor）。OpenTelemetry Collector可以同时导出到多个后端。',
    
    faq4q: 'OpenTelemetry和Jaeger如何集成？',
    faq4a: 'OpenTelemetry SDK以OTLP格式导出追踪数据。Jaeger原生接收OTLP数据（gRPC端口4317，HTTP端口4318）。你也可以使用OpenTelemetry Collector作为中间层来处理、过滤和路由追踪到Jaeger。',
    
    faq5q: 'OpenTelemetry正在取代Jaeger客户端吗？',
    faq5a: '是的，OpenTelemetry是推荐的检测方法。Jaeger客户端处于维护模式。新应用程序应使用OpenTelemetry SDK。Jaeger团队推荐使用OpenTelemetry进行检测。',
    
    faq6q: '指标和日志怎么样？',
    faq6a: 'OpenTelemetry为追踪、指标和日志提供统一的API。Jaeger只处理追踪。对于指标，将OpenTelemetry与Prometheus配对。对于日志，使用OpenTelemetry日志与Loki或Elasticsearch等后端。',
    
    faq7q: '我应该先采用哪个？',
    faq7a: '首先采用OpenTelemetry SDK进行检测，因为它提供供应商中立性。然后部署Jaeger作为你的追踪后端。这种方法让你以后可以切换后端而无需重新检测应用程序。',
    
    faq8q: '什么是OpenTelemetry Collector？',
    faq8a: 'OpenTelemetry Collector是一个代理，接收遥测数据，处理它（过滤、转换、丰富），并将其导出到一个或多个后端。它部署在你的应用程序和Jaeger等后端之间，提供灵活性并减少耦合。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function OpenTelemetryVsJaeger({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];
  const isZh = lang === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
      { '@type': 'Question', name: ct.faq6q, acceptedAnswer: { '@type': 'Answer', text: ct.faq6a } },
      { '@type': 'Question', name: ct.faq7q, acceptedAnswer: { '@type': 'Answer', text: ct.faq7a } },
      { '@type': 'Question', name: ct.faq8q, acceptedAnswer: { '@type': 'Answer', text: ct.faq8a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      <h2 style={h2Style}>{ct.takeawaysTitle}</h2>
      <div style={{ ...boxStyle, borderLeft: '4px solid #22c55e' }}>
        <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0 }}>
          <li>{ct.takeaway1}</li>
          <li>{ct.takeaway2}</li>
          <li>{ct.takeaway3}</li>
          <li>{ct.takeaway4}</li>
          <li>{ct.takeaway5}</li>
          <li>{ct.takeaway6}</li>
        </ul>
      </div>

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsOtelTitle}</h3>
      <p style={pStyle}>{ct.whatIsOtelContent}</p>

      <h3 style={h3Style}>{ct.whatIsJaegerTitle}</h3>
      <p style={pStyle}>{ct.whatIsJaegerContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>OpenTelemetry</th>
              <th style={thStyle}>Jaeger</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '角色' : 'Role', isZh ? '检测框架' : 'Instrumentation framework', isZh ? '追踪后端' : 'Tracing backend'],
              [isZh ? '功能范围' : 'Scope', isZh ? '追踪+指标+日志' : 'Traces + Metrics + Logs', isZh ? '仅追踪' : 'Traces only'],
              [isZh ? '数据流向' : 'Data Flow', isZh ? '生成和导出' : 'Generate and export', isZh ? '接收和存储' : 'Receive and store'],
              [isZh ? '供应商中立' : 'Vendor Neutral', isZh ? '是' : 'Yes', isZh ? '特定实现' : 'Specific implementation'],
              [isZh ? 'API类型' : 'API Type', isZh ? '供应商中立API' : 'Vendor-neutral APIs', isZh ? '存储和查询API' : 'Storage and query APIs'],
              [isZh ? '部署层' : 'Layer', isZh ? '应用层' : 'Application layer', isZh ? '基础设施层' : 'Infrastructure layer'],
              [isZh ? 'UI' : 'UI', isZh ? '无（导出到后端）' : 'None (exports to backend)', isZh ? '完整UI' : 'Full UI'],
              [isZh ? 'CNCF状态' : 'CNCF Status', isZh ? '孵化中' : 'Incubating', isZh ? '毕业' : 'Graduated'],
            ].map(([aspect, otel, jaeger], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{otel}</td>
                <td style={tdStyle}>{jaeger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>OpenTelemetry</th>
              <th style={thStyle}>Jaeger</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '分布式追踪' : 'Distributed Tracing', isZh ? '生成追踪' : 'Generate traces', isZh ? '存储和分析' : 'Store and analyze'],
              [isZh ? '指标' : 'Metrics', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? '日志' : 'Logs', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? 'Baggage' : 'Baggage', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '追踪可视化' : 'Trace Visualization', isZh ? '无（依赖后端）' : 'No (backend dependent)', isZh ? '内置UI' : 'Built-in UI'],
              [isZh ? '服务依赖图' : 'Service Dependency', isZh ? '无' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? '自适应采样' : 'Adaptive Sampling', isZh ? 'SDK配置' : 'SDK configuration', isZh ? '后端配置' : 'Backend configuration'],
              [isZh ? '导出器' : 'Exporters', 'Jaeger, Prometheus, Many vendors', isZh ? '不适用' : 'N/A'],
            ].map(([feature, otel, jaeger], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{otel}</td>
                <td style={tdStyle}>{jaeger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f5a623' }}>{ct.otelExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// OpenTelemetry SDK Configuration (Node.js)
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// Option 1: Direct export to Jaeger
const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

// Option 2: OTLP export to Jaeger (recommended)
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const otlpExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
  }),
});
provider.addSpanProcessor(new SimpleSpanProcessor(otlpExporter));
provider.register();

// Using OpenTelemetry API
const { trace } = require('@opentelemetry/api');
const tracer = trace.getTracer('my-service');

const span = tracer.startSpan('operation-name');
span.setAttribute('key', 'value');
span.end();

// OpenTelemetry Collector Configuration (config.yaml)
receivers:
  otlp:
    protocols:
      grpc:
      http:

exporters:
  jaeger:
    endpoint: jaeger-all-in-one:14250
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [jaeger]`}</code></pre>

      <h3 style={{ ...h3Style, color: '#60d0e4' }}>{ct.jaegerExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Jaeger Backend Configuration (docker-compose)
version: '3.8'
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    container_name: jaeger
    ports:
      - "16686:16686"  # UI
      - "14268:14268"  # HTTP collector
      - "4317:4317"    # OTLP gRPC
      - "4318:4318"    # OTLP HTTP
      - "6831:6831/udp"  # UDP Jaeger agent
    environment:
      - COLLECTOR_OTLP_ENABLED=true
      - LOG_LEVEL=info

# Jaeger with Elasticsearch storage
  jaeger-es:
    image: jaegertracing/all-in-one:latest
    environment:
      - SPAN_STORAGE_TYPE=elasticsearch
      - ES_SERVER_URLS=http://elasticsearch:9200
      - ES_INDEX_PREFIX=jaeger
    depends_on:
      - elasticsearch

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.10.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false

# Jaeger Query API Example
// GET /api/traces?service=my-service&limit=20
// Response: Trace data in JSON format

// Jaeger UI Access
// http://localhost:16686
// View services, traces, dependencies`}</code></pre>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成模式' : 'Integration Pattern'}</th>
              <th style={thStyle}>{isZh ? '描述' : 'Description'}</th>
              <th style={thStyle}>{isZh ? '用例' : 'Use Case'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '直接导出' : 'Direct Export', isZh ? 'OTel SDK → Jaeger' : 'OTel SDK → Jaeger', isZh ? '简单部署' : 'Simple deployment'],
              [isZh ? '通过Collector' : 'Via Collector', isZh ? 'OTel SDK → Collector → Jaeger' : 'OTel SDK → Collector → Jaeger', isZh ? '生产环境' : 'Production'],
              [isZh ? '多后端' : 'Multi-backend', isZh ? 'OTel SDK → Collector → Jaeger + Others' : 'OTel SDK → Collector → Jaeger + Others', isZh ? '混合监控' : 'Hybrid monitoring'],
              [isZh ? '渐进迁移' : 'Gradual Migration', isZh ? 'Jaeger Client → OTel SDK' : 'Jaeger Client → OTel SDK', isZh ? '现有应用' : 'Existing apps'],
            ].map(([pattern, desc, use], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{pattern}</td>
                <td style={tdStyle}>{desc}</td>
                <td style={tdStyle}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f5a623' }}>
          <strong style={{ color: '#f5a623' }}>OpenTelemetry Deployment</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'SDK部署在每个应用中（sidecar或库）。Collector作为独立服务部署，可以接收、处理和路由遥测数据。支持agent模式和gateway模式。' : 'SDKs deployed in each application (sidecar or library). Collector deployed as standalone service that can receive, process, and route telemetry data. Supports agent and gateway modes.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #60d0e4' }}>
          <strong style={{ color: '#60d0e4' }}>Jaeger Deployment</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持all-in-one（开发）和分布式部署（生产）。组件包括collector、query、agent。支持Kubernetes Operator和Helm charts。存储后端可选。' : 'Supports all-in-one (dev) and distributed deployment (prod). Components include collector, query, agent. Kubernetes Operator and Helm charts available. Multiple storage backends.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f5a623' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f5a623' }}>{ct.otelBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '应用检测和遥测收集' : 'Application instrumentation and telemetry collection'}</li>
            <li>{isZh ? '供应商中立的可观测性策略' : 'Vendor-neutral observability strategy'}</li>
            <li>{isZh ? '统一追踪、指标和日志' : 'Unified traces, metrics, and logs'}</li>
            <li>{isZh ? '多后端导出' : 'Multi-backend export'}</li>
            <li>{isZh ? '避免供应商锁定' : 'Avoiding vendor lock-in'}</li>
            <li>{isZh ? '自动检测和手动检测' : 'Auto and manual instrumentation'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #60d0e4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#60d0e4' }}>{ct.jaegerBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '分布式追踪存储和分析' : 'Distributed trace storage and analysis'}</li>
            <li>{isZh ? '追踪可视化和UI' : 'Trace visualization and UI'}</li>
            <li>{isZh ? '服务依赖分析' : 'Service dependency analysis'}</li>
            <li>{isZh ? '根因分析' : 'Root cause analysis'}</li>
            <li>{isZh ? 'OpenTelemetry追踪后端' : 'OpenTelemetry trace backend'}</li>
            <li>{isZh ? '云原生追踪平台' : 'Cloud-native tracing platform'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/url-parser"} style={{ color: '#3b82f6', textDecoration: 'none' }}>URL Parser</a>
      </div>

      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a],
        [ct.faq2q, ct.faq2a],
        [ct.faq3q, ct.faq3a],
        [ct.faq4q, ct.faq4a],
        [ct.faq5q, ct.faq5a],
        [ct.faq6q, ct.faq6a],
        [ct.faq7q, ct.faq7a],
        [ct.faq8q, ct.faq8a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
