'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Jaeger vs Zipkin: Distributed Tracing Comparison',
    intro: 'Jaeger and Zipkin are two leading open-source distributed tracing systems. Both help monitor and troubleshoot microservices architectures by tracking requests across multiple services. Jaeger, originally developed by Uber, is now a CNCF graduated project. Zipkin, created by Twitter, pioneered open-source distributed tracing. This comparison examines their architectures, features, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Jaeger for cloud-native environments, scalability, and CNCF ecosystem integration. Choose Zipkin for simplicity, established ecosystems, and when you need a mature, battle-tested solution. Both support multiple storage backends and provide similar core tracing capabilities, but Jaeger offers better scalability while Zipkin has a simpler architecture.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Jaeger is CNCF graduated; Zipkin pioneered open-source tracing',
    takeaway2: 'Jaeger offers better scalability for large deployments',
    takeaway3: 'Zipkin has simpler architecture and easier setup',
    takeaway4: 'Both support OpenTracing and multiple storage backends',
    takeaway5: 'Jaeger has native support for OpenTelemetry',
    takeaway6: 'Zipkin has a larger library ecosystem for older frameworks',
    
    whatIsJaegerTitle: 'What is Jaeger?',
    whatIsJaegerContent: 'Jaeger is an open-source, end-to-end distributed tracing platform developed by Uber Technologies and released in 2017. It became a CNCF incubating project in 2018 and graduated in 2019. Jaeger is designed for monitoring and troubleshooting microservices-based distributed systems, providing distributed context propagation, distributed transaction monitoring, root cause analysis, and service dependency analysis.',
    
    whatIsZipkinTitle: 'What is Zipkin?',
    whatIsZipkinContent: 'Zipkin is a distributed tracing system created by Twitter in 2012 and open-sourced in 2015. It helps gather timing data needed to troubleshoot latency problems in service architectures. Zipkin provides both the collection and lookup of trace data, featuring a simple web UI that displays service dependencies and latency statistics.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core tracing capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Tracer setup and span creation:',
    
    jaegerExampleTitle: 'Jaeger Configuration',
    zipkinExampleTitle: 'Zipkin Configuration',
    
    storageTitle: 'Storage Backends',
    storageIntro: 'Supported storage options:',
    
    samplingTitle: 'Sampling Strategies',
    samplingIntro: 'Sampling and head-based vs tail-based sampling:',
    
    useCasesTitle: 'Best Use Cases',
    jaegerBestFor: 'Jaeger is Best For:',
    zipkinBestFor: 'Zipkin is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Jaeger and Zipkin both provide robust distributed tracing capabilities but target slightly different audiences. Jaeger excels in cloud-native, Kubernetes environments with its scalability and CNCF ecosystem integration. Zipkin is ideal for teams wanting a simpler, more mature solution with extensive library support. Your choice depends on your infrastructure complexity, scalability needs, and ecosystem preferences. Many organizations successfully use both, often migrating from Zipkin to Jaeger as they scale.',
    
    faq1q: 'Can Jaeger and Zipkin work together?',
    faq1a: 'Yes, Jaeger can ingest Zipkin format traces, allowing gradual migration. You can run Jaeger as a drop-in replacement for Zipkin collectors while maintaining compatibility with existing instrumentation.',
    
    faq2q: 'Which has better Kubernetes integration?',
    faq2a: 'Jaeger has superior Kubernetes integration as a CNCF project, with Helm charts, operators, and native support for Kubernetes service discovery. Zipkin works with Kubernetes but requires more manual configuration.',
    
    faq3q: 'What about OpenTelemetry support?',
    faq3a: 'Both support OpenTelemetry. Jaeger has native OpenTelemetry protocol (OTLP) support and is positioned as the default backend for OpenTelemetry. Zipkin also accepts OpenTelemetry data through exporters and bridges.',
    
    faq4q: 'Which is more scalable?',
    faq4a: 'Jaeger is designed for higher scalability with its microservices architecture, supporting horizontal scaling of individual components. It handles millions of traces per second at companies like Uber. Zipkin can scale but may require more effort for large deployments.',
    
    faq5q: 'How do they compare for latency?',
    faq5a: 'Both have low overhead. Jaeger uses UDP by default for minimal latency impact. Zipkin typically uses HTTP. For extremely latency-sensitive applications, Jaeger UDP mode may have a slight advantage.',
    
    faq6q: 'What storage backend should I use?',
    faq6a: 'For Jaeger, Elasticsearch is popular for production due to scalability, while Badger is good for development. For Zipkin, Elasticsearch or Cassandra are common choices. Both support multiple backends, so choose based on your existing infrastructure.',
    
    faq7q: 'Which has better visualization?',
    faq7a: 'Both provide similar visualization capabilities with dependency graphs, trace timelines, and latency histograms. Jaeger UI is more modern and responsive. Zipkin UI is simpler but functional. For advanced visualization, many users export to Grafana or other observability platforms.',
    
    faq8q: 'Is migration from one to another difficult?',
    faq8a: 'Migrating from Zipkin to Jaeger is relatively straightforward due to Jaeger Zipkin compatibility. You can keep existing instrumentation and gradually update to Jaeger client libraries. Reverse migration is also possible but less common.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Jaeger vs Zipkin：分布式追踪对比',
    intro: 'Jaeger和Zipkin是两个领先的开源分布式追踪系统。两者都通过跟踪跨多个服务的请求来帮助监控和排查微服务架构问题。Jaeger最初由Uber开发，现在是CNCF毕业项目。Zipkin由Twitter创建，开创了开源分布式追踪。本比较考察它们的架构、功能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为云原生环境、可扩展性和CNCF生态集成选择Jaeger。为简单性、成熟的生态系统和需要经实战检验的解决方案选择Zipkin。两者都支持多种存储后端并提供类似的核心追踪功能，但Jaeger提供更好的可扩展性，而Zipkin架构更简单。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Jaeger是CNCF毕业项目；Zipkin开创了开源追踪',
    takeaway2: 'Jaeger为大规模部署提供更好的可扩展性',
    takeaway3: 'Zipkin架构更简单，设置更容易',
    takeaway4: '两者都支持OpenTracing和多种存储后端',
    takeaway5: 'Jaeger原生支持OpenTelemetry',
    takeaway6: 'Zipkin为旧框架提供更大的库生态系统',
    
    whatIsJaegerTitle: '什么是Jaeger？',
    whatIsJaegerContent: 'Jaeger是由Uber Technologies开发的开源端到端分布式追踪平台，于2017年发布。它在2018年成为CNCF孵化项目，2019年毕业。Jaeger专为监控和排查基于微服务的分布式系统而设计，提供分布式上下文传播、分布式事务监控、根因分析和服务依赖分析。',
    
    whatIsZipkinTitle: '什么是Zipkin？',
    whatIsZipkinContent: 'Zipkin是由Twitter在2012年创建的分布式追踪系统，2015年开源。它帮助收集排查服务架构中延迟问题所需的时序数据。Zipkin提供追踪数据的收集和查找功能，具有显示服务依赖和延迟统计的简单Web UI。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心追踪能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '追踪器设置和span创建：',
    
    jaegerExampleTitle: 'Jaeger配置',
    zipkinExampleTitle: 'Zipkin配置',
    
    storageTitle: '存储后端',
    storageIntro: '支持的存储选项：',
    
    samplingTitle: '采样策略',
    samplingIntro: '采样和头部采样vs尾部采样：',
    
    useCasesTitle: '最佳用例',
    jaegerBestFor: 'Jaeger最适合：',
    zipkinBestFor: 'Zipkin最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Jaeger和Zipkin都提供强大的分布式追踪功能，但针对略有不同的受众。Jaeger在云原生、Kubernetes环境中以其可扩展性和CNCF生态集成表现出色。Zipkin非常适合需要更简单、更成熟解决方案和广泛库支持的团队。你的选择取决于基础设施复杂性、可扩展性需求和生态偏好。许多组织成功使用两者，通常随着规模扩大从Zipkin迁移到Jaeger。',
    
    faq1q: 'Jaeger和Zipkin可以一起工作吗？',
    faq1a: '是的，Jaeger可以接收Zipkin格式的追踪数据，允许逐步迁移。你可以将Jaeger作为Zipkin收集器的直接替代品运行，同时保持与现有检测的兼容性。',
    
    faq2q: '哪个有更好的Kubernetes集成？',
    faq2a: 'Jaeger作为CNCF项目具有更优越的Kubernetes集成，提供Helm charts、operator和Kubernetes服务发现的原生支持。Zipkin可以与Kubernetes配合使用，但需要更多手动配置。',
    
    faq3q: 'OpenTelemetry支持怎么样？',
    faq3a: '两者都支持OpenTelemetry。Jaeger原生支持OpenTelemetry协议（OTLP），定位为OpenTelemetry的默认后端。Zipkin也通过导出器和桥接接受OpenTelemetry数据。',
    
    faq4q: '哪个更具可扩展性？',
    faq4a: 'Jaeger专为更高可扩展性而设计，采用微服务架构，支持单个组件的水平扩展。它在Uber等公司每秒处理数百万追踪。Zipkin可以扩展，但大规模部署可能需要更多努力。',
    
    faq5q: '它们在延迟方面如何比较？',
    faq5a: '两者都有低开销。Jaeger默认使用UDP以最小化延迟影响。Zipkin通常使用HTTP。对于极端延迟敏感的应用，Jaeger UDP模式可能有轻微优势。',
    
    faq6q: '我应该使用什么存储后端？',
    faq6a: '对于Jaeger，Elasticsearch因其可扩展性而在生产中受欢迎，而Badger适合开发。对于Zipkin，Elasticsearch或Cassandra是常见选择。两者都支持多种后端，因此根据现有基础设施选择。',
    
    faq7q: '哪个有更好的可视化？',
    faq7a: '两者提供类似的可视化功能，包括依赖图、追踪时间线和延迟直方图。Jaeger UI更现代、响应更快。Zipkin UI更简单但功能完整。对于高级可视化，许多用户导出到Grafana或其他可观测平台。',
    
    faq8q: '从一个迁移到另一个困难吗？',
    faq8a: '由于Jaeger的Zipkin兼容性，从Zipkin迁移到Jaeger相对简单。你可以保留现有检测并逐步更新到Jaeger客户端库。反向迁移也是可能的，但不太常见。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function JaegerVsZipkin({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsJaegerTitle}</h3>
      <p style={pStyle}>{ct.whatIsJaegerContent}</p>

      <h3 style={h3Style}>{ct.whatIsZipkinTitle}</h3>
      <p style={pStyle}>{ct.whatIsZipkinContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Jaeger</th>
              <th style={thStyle}>Zipkin</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '开发方' : 'Developed By', 'Uber (CNCF)', 'Twitter'],
              [isZh ? '架构' : 'Architecture', isZh ? '微服务' : 'Microservices', isZh ? '单体/微服务' : 'Monolithic/Microservices'],
              [isZh ? '可扩展性' : 'Scalability', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '设置复杂度' : 'Setup Complexity', isZh ? '中等' : 'Medium', isZh ? '简单' : 'Simple'],
              [isZh ? 'OpenTelemetry支持' : 'OpenTelemetry Support', isZh ? '原生' : 'Native', isZh ? '通过导出器' : 'Via exporter'],
              [isZh ? '传输协议' : 'Transport', 'UDP, HTTP, gRPC', 'HTTP, Kafka, Scribe'],
              [isZh ? '自适应采样' : 'Adaptive Sampling', isZh ? '支持' : 'Yes', isZh ? '有限' : 'Limited'],
              [isZh ? '生态系统' : 'Ecosystem', isZh ? 'CNCF云原生' : 'CNCF Cloud Native', isZh ? '成熟库' : 'Mature libraries'],
            ].map(([feature, jaeger, zipkin], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{jaeger}</td>
                <td style={tdStyle}>{zipkin}</td>
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
              <th style={thStyle}>Jaeger</th>
              <th style={thStyle}>Zipkin</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '分布式上下文' : 'Distributed Context', isZh ? 'W3C TraceContext' : 'W3C TraceContext', 'B3, W3C'],
              [isZh ? '服务依赖图' : 'Service Dependency', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '根因分析' : 'Root Cause Analysis', isZh ? '高级' : 'Advanced', isZh ? '基础' : 'Basic'],
              [isZh ? '延迟直方图' : 'Latency Histograms', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '追踪比较' : 'Trace Comparison', isZh ? '支持' : 'Yes', isZh ? '有限' : 'Limited'],
              [isZh ? '自适应采样' : 'Adaptive Sampling', isZh ? '高级' : 'Advanced', isZh ? '无' : 'No'],
              [isZh ? 'Baggage' : 'Baggage', isZh ? '完全支持' : 'Full support', isZh ? '有限' : 'Limited'],
              [isZh ? '监控端点' : 'Metrics Endpoints', 'Prometheus', isZh ? 'Prometheus兼容' : 'Prometheus compatible'],
            ].map(([cap, jaeger, zipkin], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{jaeger}</td>
                <td style={tdStyle}>{zipkin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#60d0e4' }}>{ct.jaegerExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Jaeger Client Configuration (Go)
import (
    "github.com/uber/jaeger-client-go"
    jaegercfg "github.com/uber/jaeger-client-go/config"
)

func initJaeger(serviceName string) (opentracing.Tracer, io.Closer) {
    cfg := jaegercfg.Configuration{
        ServiceName: serviceName,
        Sampler: &jaegercfg.SamplerConfig{
            Type:  jaeger.SamplerTypeConst,
            Param: 1,
        },
        Reporter: &jaegercfg.ReporterConfig{
            LogSpans:           true,
            LocalAgentHostPort: "localhost:6831",
        },
    }
    tracer, closer, err := cfg.NewTracer(
        jaegercfg.Logger(jaeger.StdLogger),
    )
    if err != nil {
        panic(err)
    }
    return tracer, closer
}

// Creating spans
span := tracer.StartSpan("operation-name")
span.SetTag("key", "value")
defer span.Finish()

// Jaeger OpenTelemetry SDK Configuration (OTLP)
// Use OTLP exporter for OpenTelemetry
exporter, _ := otlptracehttp.New(ctx,
    otlptracehttp.WithEndpoint("localhost:4318"),
    otlptracehttp.WithInsecure(),
)

tp := trace.NewTracerProvider(
    trace.WithBatcher(exporter),
    trace.WithResource(resource.NewWithAttributes(
        semconv.SchemaURL,
        semconv.ServiceNameKey.String("my-service"),
    )),
)

otel.SetTracerProvider(tp)`}</code></pre>

      <h3 style={{ ...h3Style, color: '#e47200' }}>{ct.zipkinExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Zipkin Brave Configuration (Java)
import brave.Tracing;
import brave.sampler.Sampler;
import zipkin2.reporter.AsyncReporter;
import zipkin2.reporter.urlconnection.URLConnectionSender;

public class ZipkinConfig {
    public static Tracing init(String serviceName, String zipkinUrl) {
        AsyncReporter<Span> reporter = AsyncReporter.create(
            URLConnectionSender.create(zipkinUrl + "/api/v2/spans")
        );
        
        return Tracing.newBuilder()
            .localServiceName(serviceName)
            .spanReporter(reporter)
            .sampler(Sampler.ALWAYS_SAMPLE)
            .build();
    }
}

// Creating spans with Brave
Span span = tracer.nextSpan().name("operation-name");
try (Tracer.SpanInScope ws = tracer.withSpanInScope(span.start())) {
    span.tag("key", "value");
    // do work
} finally {
    span.finish();
}

// Zipkin JSON Configuration (docker-compose)
version: '3'
services:
  zipkin:
    image: openzipkin/zipkin
    container_name: zipkin
    ports:
      - "9411:9411"
    environment:
      - STORAGE_TYPE=elasticsearch
      - ES_HOSTS=elasticsearch:9200
      - ES_INDEX=zipkin
    depends_on:
      - elasticsearch`}</code></pre>

      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储类型' : 'Storage Type'}</th>
              <th style={thStyle}>Jaeger</th>
              <th style={thStyle}>Zipkin</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '内存' : 'In-Memory', isZh ? '支持（开发）' : 'Yes (dev)', isZh ? '支持（开发）' : 'Yes (dev)'],
              ['Cassandra', isZh ? '生产推荐' : 'Production ready', isZh ? '生产推荐' : 'Production ready'],
              ['Elasticsearch', isZh ? '生产推荐' : 'Production ready', isZh ? '生产推荐' : 'Production ready'],
              ['Kafka', isZh ? '仅存储' : 'Storage only', isZh ? '支持' : 'Yes'],
              [isZh ? 'BadgerDB' : 'BadgerDB', isZh ? '嵌入式存储' : 'Embedded storage', isZh ? '不支持' : 'No'],
              ['MySQL/PostgreSQL', isZh ? '实验性' : 'Experimental', isZh ? '支持' : 'Yes'],
            ].map(([storage, jaeger, zipkin], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{storage}</td>
                <td style={tdStyle}>{jaeger}</td>
                <td style={tdStyle}>{zipkin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.samplingTitle}</h2>
      <p style={pStyle}>{ct.samplingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #60d0e4' }}>
          <strong style={{ color: '#60d0e4' }}>Jaeger Sampling</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持常量、概率、速率限制和自适应采样。自适应采样根据服务和操作自动调整采样率，优化数据量和覆盖率。支持远程采样配置。' : 'Supports const, probabilistic, rate limiting, and adaptive sampling. Adaptive sampling automatically adjusts sampling rates based on service and operation, optimizing data volume and coverage. Supports remote sampling configuration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #e47200' }}>
          <strong style={{ color: '#e47200' }}>Zipkin Sampling</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持头部采样（常量、概率）。采样决策在追踪开始时做出。相比Jaeger缺乏自适应采样功能，需要手动配置采样率。' : 'Supports head-based sampling (const, probabilistic). Sampling decision is made at trace start. Lacks adaptive sampling compared to Jaeger, requiring manual sampling rate configuration.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #60d0e4' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#60d0e4' }}>{ct.jaegerBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes和云原生环境' : 'Kubernetes and cloud-native environments'}</li>
            <li>{isZh ? '大规模微服务架构' : 'Large-scale microservices architectures'}</li>
            <li>{isZh ? 'CNCF生态系统集成' : 'CNCF ecosystem integration'}</li>
            <li>{isZh ? '需要自适应采样' : 'Need for adaptive sampling'}</li>
            <li>{isZh ? 'OpenTelemetry采用' : 'OpenTelemetry adoption'}</li>
            <li>{isZh ? '高吞吐量追踪' : 'High-throughput tracing'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #e47200' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#e47200' }}>{ct.zipkinBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '简单部署和维护' : 'Simple deployment and maintenance'}</li>
            <li>{isZh ? '传统应用追踪' : 'Legacy application tracing'}</li>
            <li>{isZh ? '成熟库支持' : 'Mature library support'}</li>
            <li>{isZh ? '快速入门追踪' : 'Quick start with tracing'}</li>
            <li>{isZh ? '中小规模部署' : 'Small to medium deployments'}</li>
            <li>{isZh ? '团队不熟悉云原生' : 'Teams new to cloud-native'}</li>
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
