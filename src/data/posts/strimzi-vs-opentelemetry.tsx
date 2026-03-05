'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Strimzi vs OpenTelemetry: Kafka Operator vs Observability Framework',
    intro: 'Strimzi and OpenTelemetry are two important tools in the cloud-native ecosystem, but they serve fundamentally different purposes. Strimzi is a Kubernetes operator for Apache Kafka, while OpenTelemetry is a vendor-neutral observability framework for distributed tracing, metrics, and logs. This comparison clarifies their distinct roles and how they can work together.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Strimzi and OpenTelemetry are complementary, not competing tools. Use Strimzi to run and manage Apache Kafka on Kubernetes. Use OpenTelemetry for distributed tracing, metrics collection, and observability across your entire application stack. Many organizations use both together.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Strimzi manages Kafka on Kubernetes; OpenTelemetry provides observability',
    takeaway2: 'Strimzi is a Kafka operator; OpenTelemetry is a telemetry framework',
    takeaway3: 'Both are CNCF projects with strong community support',
    takeaway4: 'They can be used together: instrument Kafka apps with OpenTelemetry',
    takeaway5: 'Strimzi handles Kafka lifecycle; OpenTelemetry handles instrumentation',
    takeaway6: 'Neither replaces the other - they solve different problems',
    
    whatIsStrimziTitle: 'What is Strimzi?',
    whatIsStrimziContent: 'Strimzi is an open-source Kubernetes operator for running Apache Kafka. It simplifies the deployment, management, and operation of Kafka clusters on Kubernetes. Strimzi provides Custom Resource Definitions (CRDs) for Kafka, Kafka Connect, Kafka MirrorMaker, and other Kafka components, enabling declarative management through Kubernetes.',
    
    whatIsOpentelemetryTitle: 'What is OpenTelemetry?',
    whatIsOpentelemetryContent: 'OpenTelemetry is a vendor-neutral observability framework for distributed tracing, metrics, and logs. It provides APIs, SDKs, and the OpenTelemetry Collector for instrumenting applications and collecting telemetry data. OpenTelemetry is a CNCF project that merged OpenTracing and OpenCensus, becoming the industry standard for observability instrumentation.',
    
    performanceTitle: 'Core Function Comparison',
    performanceIntro: 'Understanding their different purposes:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of capabilities:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Deployment and instrumentation examples:',
    
    strimziExampleTitle: 'Strimzi Kafka Cluster',
    opentelemetryExampleTitle: 'OpenTelemetry Instrumentation',
    
    dataSourceTitle: 'Integration Ecosystem',
    dataSourceIntro: 'Supported integrations and backends:',
    
    alertingTitle: 'Use Case Scenarios',
    alertingIntro: 'When to use each tool:',
    
    useCasesTitle: 'Best Use Cases',
    strimziBestFor: 'Strimzi is Best For:',
    opentelemetryBestFor: 'OpenTelemetry is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Strimzi and OpenTelemetry are not competitors but complementary tools in the cloud-native stack. Strimzi manages your Kafka infrastructure on Kubernetes, handling deployment, scaling, and configuration. OpenTelemetry provides observability across your entire application, including Kafka consumers and producers. Use Strimzi to run Kafka reliably, and use OpenTelemetry to understand what your applications and Kafka traffic are doing.',
    
    faq1q: 'Can OpenTelemetry monitor Strimzi Kafka?',
    faq1a: 'Yes, OpenTelemetry can monitor Kafka clusters managed by Strimzi. You can instrument Kafka brokers, consumers, and producers with OpenTelemetry to collect traces and metrics. Strimzi also exposes JMX metrics that can be collected and correlated with OpenTelemetry data.',
    
    faq2q: 'Which should I adopt first?',
    faq2a: 'It depends on your needs. If you need to run Kafka on Kubernetes, start with Strimzi. If you need application observability (tracing, metrics), start with OpenTelemetry. Ideally, adopt both as they address different requirements in a microservices architecture.',
    
    faq3q: 'Does Strimzi provide tracing?',
    faq3a: 'No, Strimzi does not provide distributed tracing. It manages Kafka infrastructure. For tracing Kafka message flows, you would instrument your producers and consumers with OpenTelemetry or similar tracing tools.',
    
    faq4q: 'Can I use OpenTelemetry without Kafka?',
    faq4a: 'Absolutely. OpenTelemetry is a general-purpose observability framework that works with any application, regardless of whether you use Kafka. It supports many languages, frameworks, and telemetry backends.',
    
    faq5q: 'What about Kafka metrics?',
    faq5a: 'Strimzi exports Kafka metrics via Prometheus endpoints. OpenTelemetry Collector can scrape these metrics and export them to various backends. You can combine Kafka infrastructure metrics from Strimzi with application traces from OpenTelemetry for complete observability.',
    
    faq6q: 'Are they both CNCF projects?',
    faq6a: 'Yes, both are CNCF projects. Strimzi is a CNCF sandbox project focused on Kafka on Kubernetes. OpenTelemetry is a CNCF incubating project and is now the industry standard for observability instrumentation.',
    
    faq7q: 'How do they work together?',
    faq7a: 'Strimzi manages your Kafka cluster while OpenTelemetry instruments your applications. When your Kafka producers and consumers are instrumented with OpenTelemetry, you can trace messages through Kafka, correlate with application traces, and get end-to-end visibility.',
    
    faq8q: 'What backends work with OpenTelemetry?',
    faq8a: 'OpenTelemetry supports many backends including Jaeger, Zipkin, Prometheus, Grafana Tempo, Datadog, New Relic, Splunk, and cloud provider services (AWS X-Ray, Google Cloud Trace, Azure Monitor). The collector can export to multiple backends simultaneously.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Strimzi vs OpenTelemetry：Kafka Operator vs 可观测性框架',
    intro: 'Strimzi 和 OpenTelemetry 是云原生生态系统中两个重要的工具，但它们服务于完全不同的目的。Strimzi 是 Apache Kafka 的 Kubernetes operator，而 OpenTelemetry 是用于分布式追踪、指标和日志的厂商中立可观测性框架。本比较阐明它们的不同角色以及如何协同工作。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Strimzi 和 OpenTelemetry 是互补的，而非竞争工具。使用 Strimzi 在 Kubernetes 上运行和管理 Apache Kafka。使用 OpenTelemetry 在整个应用堆栈中进行分布式追踪、指标收集和可观测性。许多组织同时使用两者。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Strimzi 管理 Kubernetes 上的 Kafka；OpenTelemetry 提供可观测性',
    takeaway2: 'Strimzi 是 Kafka operator；OpenTelemetry 是遥测框架',
    takeaway3: '两者都是 CNCF 项目，有强大的社区支持',
    takeaway4: '它们可以一起使用：用 OpenTelemetry 为 Kafka 应用插桩',
    takeaway5: 'Strimzi 处理 Kafka 生命周期；OpenTelemetry 处理应用插桩',
    takeaway6: '两者互不替代 - 它们解决不同的问题',
    
    whatIsStrimziTitle: '什么是 Strimzi？',
    whatIsStrimziContent: 'Strimzi 是用于运行 Apache Kafka 的开源 Kubernetes operator。它简化了 Kafka 集群在 Kubernetes 上的部署、管理和运维。Strimzi 为 Kafka、Kafka Connect、Kafka MirrorMaker 和其他 Kafka 组件提供自定义资源定义（CRD），通过 Kubernetes 实现声明式管理。',
    
    whatIsOpentelemetryTitle: '什么是 OpenTelemetry？',
    whatIsOpentelemetryContent: 'OpenTelemetry 是用于分布式追踪、指标和日志的厂商中立可观测性框架。它提供 API、SDK 和 OpenTelemetry Collector 用于应用插桩和收集遥测数据。OpenTelemetry 是合并了 OpenTracing 和 OpenCensus 的 CNCF 项目，已成为可观测性插桩的行业标准。',
    
    performanceTitle: '核心功能比较',
    performanceIntro: '理解它们的不同目的：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '部署和插桩示例：',
    
    strimziExampleTitle: 'Strimzi Kafka 集群',
    opentelemetryExampleTitle: 'OpenTelemetry 插桩',
    
    dataSourceTitle: '集成生态',
    dataSourceIntro: '支持的集成和后端：',
    
    alertingTitle: '使用场景',
    alertingIntro: '何时使用每个工具：',
    
    useCasesTitle: '最佳用例',
    strimziBestFor: 'Strimzi 最适合：',
    opentelemetryBestFor: 'OpenTelemetry 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Strimzi 和 OpenTelemetry 不是竞争对手，而是云原生堆栈中的互补工具。Strimzi 管理 Kubernetes 上的 Kafka 基础设施，处理部署、扩展和配置。OpenTelemetry 在整个应用中提供可观测性，包括 Kafka 消费者和生产者。使用 Strimzi 可靠地运行 Kafka，使用 OpenTelemetry 了解应用和 Kafka 流量在做什么。',
    
    faq1q: 'OpenTelemetry 可以监控 Strimzi Kafka 吗？',
    faq1a: '是的，OpenTelemetry 可以监控由 Strimzi 管理的 Kafka 集群。你可以用 OpenTelemetry 为 Kafka broker、消费者和生产者插桩来收集追踪和指标。Strimzi 也暴露 JMX 指标，可以与 OpenTelemetry 数据关联收集。',
    
    faq2q: '应该先采用哪个？',
    faq2a: '这取决于你的需求。如果需要在 Kubernetes 上运行 Kafka，从 Strimzi 开始。如果需要应用可观测性（追踪、指标），从 OpenTelemetry 开始。理想情况下，两者都采用，因为它们解决微服务架构中的不同需求。',
    
    faq3q: 'Strimzi 提供追踪功能吗？',
    faq3a: '不，Strimzi 不提供分布式追踪。它管理 Kafka 基础设施。要追踪 Kafka 消息流，你需要用 OpenTelemetry 或类似的追踪工具为生产者和消费者插桩。',
    
    faq4q: '可以不用 Kafka 使用 OpenTelemetry 吗？',
    faq4a: '当然可以。OpenTelemetry 是通用的可观测性框架，适用于任何应用，无论是否使用 Kafka。它支持多种语言、框架和遥测后端。',
    
    faq5q: 'Kafka 指标如何？',
    faq5a: 'Strimzi 通过 Prometheus 端点导出 Kafka 指标。OpenTelemetry Collector 可以抓取这些指标并导出到各种后端。你可以将 Strimzi 的 Kafka 基础设施指标与 OpenTelemetry 的应用追踪结合，获得完整的可观测性。',
    
    faq6q: '两者都是 CNCF 项目吗？',
    faq6a: '是的，两者都是 CNCF 项目。Strimzi 是专注于 Kubernetes 上 Kafka 的 CNCF 沙箱项目。OpenTelemetry 是 CNCF 孵化项目，现在是可观测性插桩的行业标准。',
    
    faq7q: '它们如何协同工作？',
    faq7a: 'Strimzi 管理 Kafka 集群，OpenTelemetry 为应用插桩。当你的 Kafka 生产者和消费者用 OpenTelemetry 插桩后，你可以追踪通过 Kafka 的消息，与应用追踪关联，获得端到端的可见性。',
    
    faq8q: 'OpenTelemetry 支持哪些后端？',
    faq8a: 'OpenTelemetry 支持多种后端，包括 Jaeger、Zipkin、Prometheus、Grafana Tempo、Datadog、New Relic、Splunk 和云提供商服务（AWS X-Ray、Google Cloud Trace、Azure Monitor）。Collector 可以同时导出到多个后端。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function StrimziVsOpentelemetry({ lang }: { lang: string }) {
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

  const strimziCode = '// Strimzi Kafka cluster deployment\n' +
    'apiVersion: kafka.strimzi.io/v1beta2\n' +
    'kind: Kafka\n' +
    'metadata:\n' +
    '  name: my-cluster\n' +
    '  namespace: kafka\n' +
    'spec:\n' +
    '  kafka:\n' +
    '    version: 3.5.1\n' +
    '    replicas: 3\n' +
    '    listeners:\n' +
    '      - name: plain\n' +
    '        port: 9092\n' +
    '        type: internal\n' +
    '        tls: false\n' +
    '      - name: tls\n' +
    '        port: 9093\n' +
    '        type: internal\n' +
    '        tls: true\n' +
    '    config:\n' +
    '      offsets.topic.replication.factor: 3\n' +
    '      transaction.state.log.replication.factor: 3\n' +
    '      transaction.state.log.min.isr: 2\n' +
    '    storage:\n' +
    '      type: jbod\n' +
    '      volumes:\n' +
    '      - id: 0\n' +
    '        type: persistent-claim\n' +
    '        size: 100Gi\n' +
    '        class: fast-ssd\n' +
    '  zookeeper:\n' +
    '    replicas: 3\n' +
    '    storage:\n' +
    '      type: persistent-claim\n' +
    '      size: 100Gi\n' +
    '\n' +
    '// Kafka Topic\n' +
    'apiVersion: kafka.strimzi.io/v1beta2\n' +
    'kind: KafkaTopic\n' +
    'metadata:\n' +
    '  name: my-topic\n' +
    '  namespace: kafka\n' +
    '  labels:\n' +
    '    strimzi.io/cluster: my-cluster\n' +
    'spec:\n' +
    '  partitions: 10\n' +
    '  replicas: 3\n' +
    '  config:\n' +
    '    retention.ms: 604800000';

  const otelCode = '// OpenTelemetry instrumentation (Node.js)\n' +
    'const { NodeTracerProvider } = require(\'@opentelemetry/sdk-trace-node\');\n' +
    'const { Resource } = require(\'@opentelemetry/resources\');\n' +
    'const { SemanticResourceAttributes } = require(\'@opentelemetry/semantic-conventions\');\n' +
    'const { JaegerExporter } = require(\'@opentelemetry/exporter-jaeger\');\n' +
    'const { SimpleSpanProcessor } = require(\'@opentelemetry/sdk-trace-base\');\n' +
    '\n' +
    '// Create provider\n' +
    'const provider = new NodeTracerProvider({\n' +
    '  resource: new Resource({\n' +
    '    [SemanticResourceAttributes.SERVICE_NAME]: \'my-service\',\n' +
    '  }),\n' +
    '});\n' +
    '\n' +
    '// Export to Jaeger\n' +
    'provider.addSpanProcessor(\n' +
    '  new SimpleSpanProcessor(\n' +
    '    new JaegerExporter({\n' +
    '      endpoint: \'http://jaeger:14268/api/traces\',\n' +
    '    })\n' +
    '  )\n' +
    ');\n' +
    '\n' +
    'provider.register();\n' +
    '\n' +
    '// OpenTelemetry Collector config (YAML)\n' +
    'receivers:\n' +
    '  otlp:\n' +
    '    protocols:\n' +
    '      grpc:\n' +
    '      http:\n' +
    '\n' +
    'exporters:\n' +
    '  jaeger:\n' +
    '    endpoint: jaeger:14250\n' +
    '    tls:\n' +
    '      insecure: true\n' +
    '  prometheus:\n' +
    '    endpoint: "0.0.0.0:8889"\n' +
    '\n' +
    'service:\n' +
    '  pipelines:\n' +
    '    traces:\n' +
    '      receivers: [otlp]\n' +
    '      exporters: [jaeger]\n' +
    '    metrics:\n' +
    '      receivers: [otlp]\n' +
    '      exporters: [prometheus]';

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      <div style={{ ...boxStyle, borderLeft: '4px solid #f59e0b', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(239,68,68,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsStrimziTitle}</h3>
      <p style={pStyle}>{ct.whatIsStrimziContent}</p>

      <h3 style={h3Style}>{ct.whatIsOpentelemetryTitle}</h3>
      <p style={pStyle}>{ct.whatIsOpentelemetryContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '维度' : 'Aspect'}</th>
              <th style={thStyle}>Strimzi</th>
              <th style={thStyle}>OpenTelemetry</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心功能' : 'Core Function', isZh ? 'Kafka 运维' : 'Kafka operations', isZh ? '可观测性' : 'Observability'],
              [isZh ? '类型' : 'Type', isZh ? 'Kubernetes Operator' : 'Kubernetes Operator', isZh ? '遥测框架' : 'Telemetry framework'],
              [isZh ? 'CNCF 状态' : 'CNCF Status', isZh ? '沙箱' : 'Sandbox', isZh ? '孵化中' : 'Incubating'],
              [isZh ? '主要输出' : 'Primary Output', isZh ? 'Kafka 集群' : 'Kafka clusters', isZh ? '追踪/指标/日志' : 'Traces/metrics/logs'],
              [isZh ? '厂商中立' : 'Vendor Neutral', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '语言支持' : 'Language Support', isZh ? 'Kafka 协议' : 'Kafka protocol', isZh ? '多语言 SDK' : 'Multi-language SDKs'],
              [isZh ? '部署目标' : 'Deployment Target', isZh ? 'Kubernetes' : 'Kubernetes', isZh ? '任何环境' : 'Any environment'],
              [isZh ? '替代品' : 'Alternatives', isZh ? 'Confluent, MSK' : 'Confluent, MSK', isZh ? 'Jaeger, Zipkin, Prometheus' : 'Jaeger, Zipkin, Prometheus'],
            ].map(([aspect, strimzi, otel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{strimzi}</td>
                <td style={tdStyle}>{otel}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Strimzi</th>
              <th style={thStyle}>OpenTelemetry</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '集群管理' : 'Cluster Management', isZh ? 'Kafka 专用' : 'Kafka specific', isZh ? '不适用' : 'N/A'],
              [isZh ? '分布式追踪' : 'Distributed Tracing', isZh ? '无' : 'None', isZh ? '核心功能' : 'Core feature'],
              [isZh ? '指标收集' : 'Metrics Collection', isZh ? 'Prometheus 导出' : 'Prometheus export', isZh ? '原生支持' : 'Native support'],
              [isZh ? '日志收集' : 'Log Collection', isZh ? '无' : 'None', isZh ? '原生支持' : 'Native support'],
              [isZh ? '自动扩展' : 'Auto Scaling', isZh ? 'Kafka 扩展' : 'Kafka scaling', isZh ? '不适用' : 'N/A'],
              [isZh ? '配置管理' : 'Config Management', isZh ? 'CRD 声明式' : 'CRD declarative', isZh ? 'Collector 配置' : 'Collector config'],
              [isZh ? '安全' : 'Security', isZh ? 'TLS, SCRAM, ACL' : 'TLS, SCRAM, ACL', isZh ? '传输安全' : 'Transport security'],
              [isZh ? '导出器' : 'Exporters', isZh ? 'JMX, Prometheus' : 'JMX, Prometheus', isZh ? '50+ 后端' : '50+ backends'],
            ].map(([cap, strimzi, otel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{strimzi}</td>
                <td style={tdStyle}>{otel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.strimziExampleTitle}</h3>
      <pre style={codeStyle}><code>{strimziCode}</code></pre>

      <h3 style={{ ...h3Style, color: '#ef4444' }}>{ct.opentelemetryExampleTitle}</h3>
      <pre style={codeStyle}><code>{otelCode}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Strimzi</th>
              <th style={thStyle}>OpenTelemetry</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '消息系统' : 'Messaging', isZh ? 'Kafka 专用' : 'Kafka specific', isZh ? '支持多系统' : 'Multi-system support'],
              [isZh ? '追踪后端' : 'Tracing Backends', isZh ? '无' : 'None', isZh ? 'Jaeger, Zipkin, Tempo...' : 'Jaeger, Zipkin, Tempo...'],
              [isZh ? '指标后端' : 'Metrics Backends', isZh ? 'Prometheus' : 'Prometheus', isZh ? 'Prometheus, Influx...' : 'Prometheus, Influx...'],
              [isZh ? 'Kubernetes' : 'Kubernetes', isZh ? '原生 CRD' : 'Native CRDs', isZh ? 'Operator 可选' : 'Operator optional'],
              [isZh ? '云服务' : 'Cloud Services', isZh ? '任何 K8s' : 'Any K8s', isZh ? 'AWS/GCP/Azure' : 'AWS/GCP/Azure'],
            ].map(([cat, strimzi, otel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{strimzi}</td>
                <td style={tdStyle}>{otel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Use Strimzi When:</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要在 Kubernetes 上部署 Kafka 集群，管理 Kafka 生命周期，配置 Kafka Connect，运行 Kafka MirrorMaker，需要声明式 Kafka 配置。' : 'You need to deploy Kafka clusters on Kubernetes, manage Kafka lifecycle, configure Kafka Connect, run Kafka MirrorMaker, declarative Kafka configuration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>Use OpenTelemetry When:</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要分布式追踪，收集应用指标，统一遥测数据收集，厂商中立的可观测性，追踪 Kafka 消息流。' : 'You need distributed tracing, collecting application metrics, unified telemetry collection, vendor-neutral observability, tracing Kafka message flows.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.strimziBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes 上 Kafka' : 'Kafka on Kubernetes'}</li>
            <li>{isZh ? '事件流平台' : 'Event streaming platform'}</li>
            <li>{isZh ? '消息队列' : 'Message queue'}</li>
            <li>{isZh ? '数据管道' : 'Data pipelines'}</li>
            <li>{isZh ? 'Kafka Connect' : 'Kafka Connect'}</li>
            <li>{isZh ? 'CDC 和流处理' : 'CDC and stream processing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ef4444' }}>{ct.opentelemetryBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '分布式追踪' : 'Distributed tracing'}</li>
            <li>{isZh ? 'APM 可观测性' : 'APM observability'}</li>
            <li>{isZh ? '指标收集' : 'Metrics collection'}</li>
            <li>{isZh ? '日志聚合' : 'Log aggregation'}</li>
            <li>{isZh ? '微服务监控' : 'Microservice monitoring'}</li>
            <li>{isZh ? '端到端可见性' : 'End-to-end visibility'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/yaml-validator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>YAML Validator</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
