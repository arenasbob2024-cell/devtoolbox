'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prometheus vs InfluxDB: Time Series Database Comparison',
    intro: 'Prometheus and InfluxDB are two leading time series databases used for monitoring and observability. Prometheus is a CNCF graduated project designed for reliability and alerting, while InfluxDB offers a more flexible data model and SQL-like query language. This comparison examines their architecture, performance, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Prometheus for Kubernetes and cloud-native monitoring with its pull-based model and powerful alerting. Choose InfluxDB for IoT, high-cardinality data, and when you need SQL-like queries with Flux. Both excel at time series but serve different ecosystems: Prometheus for CNCF/Kubernetes, InfluxDB for IoT and general-purpose metrics.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Prometheus uses pull-based collection; InfluxDB supports push and pull',
    takeaway2: 'Prometheus has better Kubernetes integration; InfluxDB excels at IoT',
    takeaway3: 'InfluxDB supports higher cardinality with more efficient storage',
    takeaway4: 'Prometheus has built-in alerting with Alertmanager; InfluxDB uses external tools',
    takeaway5: 'PromQL is purpose-built for metrics; Flux offers more flexibility',
    takeaway6: 'Both offer long-term storage solutions through federation and integrations',
    
    whatIsPrometheusTitle: 'What is Prometheus?',
    whatIsPrometheusContent: 'Prometheus is an open-source monitoring and alerting toolkit originally built at SoundCloud in 2012. It became a CNCF graduated project in 2018. Prometheus uses a multi-dimensional data model with metric names and key-value pairs (labels), a pull-based collection over HTTP, and provides powerful querying through PromQL.',
    
    whatIsInfluxDBTitle: 'What is InfluxDB?',
    whatIsInfluxDBContent: 'InfluxDB is an open-source time series database developed by InfluxData, first released in 2013. It is optimized for fast, high-availability storage and retrieval of time series data. InfluxDB supports multiple data types, flexible schemas, and offers Flux, a powerful data scripting and query language.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark comparison for time series workloads:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core capabilities and architecture:',
    
    codeExampleTitle: 'Query Examples',
    codeExampleIntro: 'Query language comparison for common operations:',
    
    prometheusExampleTitle: 'PromQL (Prometheus)',
    influxdbExampleTitle: 'Flux (InfluxDB)',
    
    dataModelTitle: 'Data Model Comparison',
    dataModelIntro: 'How each system structures data:',
    
    alertingTitle: 'Alerting Capabilities',
    alertingIntro: 'Alerting features and integration:',
    
    useCasesTitle: 'Best Use Cases',
    prometheusBestFor: 'Prometheus is Best For:',
    influxdbBestFor: 'InfluxDB is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Prometheus and InfluxDB serve different but overlapping needs in the observability space. Prometheus excels in Kubernetes and cloud-native environments with its pull-based model and tight CNCF ecosystem integration. InfluxDB offers more flexibility for IoT, high-cardinality workloads, and scenarios requiring SQL-like queries. For modern Kubernetes deployments, Prometheus is often the default choice. For IoT, financial data, or general-purpose time series, InfluxDB provides more flexibility and better performance with high cardinality data.',
    
    faq1q: 'Can Prometheus and InfluxDB work together?',
    faq1a: 'Yes, you can use the InfluxDB Prometheus remote write endpoint to send Prometheus metrics to InfluxDB for long-term storage. Many organizations use Prometheus for collection and alerting while using InfluxDB for historical data analysis.',
    
    faq2q: 'Which handles high cardinality better?',
    faq2a: 'InfluxDB generally handles high cardinality better due to its storage engine (TSM) and data model design. Prometheus can struggle with millions of unique label combinations, though improvements continue with each release.',
    
    faq3q: 'What is Flux and how does it compare to PromQL?',
    faq3a: 'Flux is InfluxDB query language that offers more flexibility than PromQL. It supports joins, transformations, and more complex data processing. PromQL is simpler and purpose-built for metrics, making it easier to learn for common monitoring use cases.',
    
    faq4q: 'Does Prometheus support push-based metrics?',
    faq4a: 'Prometheus primarily uses pull-based collection. For push scenarios, you can use the Pushgateway for short-lived jobs or batch jobs. However, the pull model is the recommended approach for service discovery and monitoring.',
    
    faq5q: 'How do they compare for long-term storage?',
    faq5a: 'Prometheus is designed for local storage with federation for scaling. For long-term storage, integrate with Thanos, Cortex, or VictoriaMetrics. InfluxDB supports long-term storage natively with its storage engine and can handle years of historical data.',
    
    faq6q: 'Which is better for IoT applications?',
    faq6a: 'InfluxDB is typically better for IoT due to its flexible schema, high write throughput, push-based ingestion, and edge capabilities (Telegraf agent). Prometheus can work for IoT but is less suited for devices behind NAT or with intermittent connectivity.',
    
    faq7q: 'How do they handle multi-tenancy?',
    faq7a: 'InfluxDB has native multi-tenancy support with organizations and buckets. Prometheus is single-tenant by design; for multi-tenancy, you need to run multiple instances or use projects like Cortex or Thanos that add multi-tenancy layers.',
    
    faq8q: 'What about cluster support?',
    faq8a: 'Prometheus does not support clustering natively; each server is standalone. For HA, run multiple instances. InfluxDB Enterprise and InfluxDB Cloud offer clustering capabilities. Open-source InfluxDB 2.x is single-node.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Prometheus vs InfluxDB：时序数据库对比',
    intro: 'Prometheus和InfluxDB是两个领先的时序数据库，用于监控和 observability。Prometheus是CNCF毕业项目，专为可靠性和告警设计，而InfluxDB提供更灵活的数据模型和类SQL查询语言。本比较考察它们的架构、性能和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为Kubernetes和云原生监控选择Prometheus，它具有拉取模型和强大的告警功能。为IoT、高基数数据和需要类SQL查询的场景选择InfluxDB。两者都擅长时序数据但服务于不同生态系统：Prometheus用于CNCF/Kubernetes，InfluxDB用于IoT和通用指标。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Prometheus使用基于拉取的收集；InfluxDB支持推送和拉取',
    takeaway2: 'Prometheus有更好的Kubernetes集成；InfluxDB在IoT方面表现出色',
    takeaway3: 'InfluxDB以更高效的存储支持更高的基数',
    takeaway4: 'Prometheus通过Alertmanager内置告警；InfluxDB使用外部工具',
    takeaway5: 'PromQL专为指标设计；Flux提供更多灵活性',
    takeaway6: '两者都通过联邦和集成提供长期存储解决方案',
    
    whatIsPrometheusTitle: '什么是Prometheus？',
    whatIsPrometheusContent: 'Prometheus是一个开源监控和告警工具包，最初于2012年在SoundCloud构建。2018年成为CNCF毕业项目。Prometheus使用多维数据模型，包含指标名称和键值对（标签），通过HTTP进行基于拉取的收集，并通过PromQL提供强大的查询能力。',
    
    whatIsInfluxDBTitle: '什么是InfluxDB？',
    whatIsInfluxDBContent: 'InfluxDB是由InfluxData开发的开源时序数据库，于2013年首次发布。它专为时序数据的快速、高可用存储和检索而优化。InfluxDB支持多种数据类型、灵活的模式，并提供Flux，一种强大的数据脚本和查询语言。',
    
    performanceTitle: '性能对比',
    performanceIntro: '时序工作负载的基准比较：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心功能和架构：',
    
    codeExampleTitle: '查询示例',
    codeExampleIntro: '常见操作的查询语言比较：',
    
    prometheusExampleTitle: 'PromQL (Prometheus)',
    influxdbExampleTitle: 'Flux (InfluxDB)',
    
    dataModelTitle: '数据模型对比',
    dataModelIntro: '每个系统如何结构化数据：',
    
    alertingTitle: '告警能力',
    alertingIntro: '告警功能和集成：',
    
    useCasesTitle: '最佳用例',
    prometheusBestFor: 'Prometheus最适合：',
    influxdbBestFor: 'InfluxDB最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Prometheus和InfluxDB在 observability 领域服务于不同但有重叠的需求。Prometheus在Kubernetes和云原生环境中表现出色，具有其拉取模型和紧密的CNCF生态系统集成。InfluxDB为IoT、高基数工作负载和需要类SQL查询的场景提供更多灵活性。对于现代Kubernetes部署，Prometheus通常是默认选择。对于IoT、金融数据或通用时序，InfluxDB提供更多灵活性和对高基数数据更好的性能。',
    
    faq1q: 'Prometheus和InfluxDB可以一起工作吗？',
    faq1a: '是的，你可以使用InfluxDB的Prometheus远程写入端点将Prometheus指标发送到InfluxDB进行长期存储。许多组织使用Prometheus进行收集和告警，同时使用InfluxDB进行历史数据分析。',
    
    faq2q: '哪个更好地处理高基数？',
    faq2a: 'InfluxDB通常由于存储引擎（TSM）和数据模型设计而更好地处理高基数。Prometheus可能在数百万个唯一标签组合时遇到困难，尽管每个版本都在持续改进。',
    
    faq3q: '什么是Flux，它与PromQL相比如何？',
    faq3a: 'Flux是InfluxDB的查询语言，比PromQL提供更多灵活性。它支持连接、转换和更复杂的数据处理。PromQL更简单，专为指标设计，对于常见监控用例更容易学习。',
    
    faq4q: 'Prometheus支持基于推送的指标吗？',
    faq4a: 'Prometheus主要使用基于拉取的收集。对于推送场景，你可以使用Pushgateway处理短期作业或批处理作业。但是，拉取模型是服务发现和监控的推荐方法。',
    
    faq5q: '它们在长期存储方面如何比较？',
    faq5a: 'Prometheus设计用于本地存储，通过联邦进行扩展。对于长期存储，与Thanos、Cortex或VictoriaMetrics集成。InfluxDB通过其存储引擎原生支持长期存储，可以处理多年的历史数据。',
    
    faq6q: '哪个更适合IoT应用？',
    faq6a: 'InfluxDB通常更适合IoT，因为它具有灵活的模式、高写入吞吐量、基于推送的摄取和边缘能力（Telegraf代理）。Prometheus可以用于IoT，但不适合NAT后面的设备或间歇性连接的设备。',
    
    faq7q: '它们如何处理多租户？',
    faq7a: 'InfluxDB通过组织和存储桶原生支持多租户。Prometheus设计为单租户；对于多租户，你需要运行多个实例或使用像Cortex或Thanos这样添加多租户层的项目。',
    
    faq8q: '集群支持怎么样？',
    faq8a: 'Prometheus原生不支持集群；每个服务器都是独立的。对于HA，运行多个实例。InfluxDB Enterprise和InfluxDB Cloud提供集群能力。开源InfluxDB 2.x是单节点的。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PrometheusVsInfluxDB({ lang }: { lang: string }) {
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

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

      {/* Key Takeaways */}
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

      {/* Overview */}
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPrometheusTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrometheusContent}</p>

      <h3 style={h3Style}>{ct.whatIsInfluxDBTitle}</h3>
      <p style={pStyle}>{ct.whatIsInfluxDBContent}</p>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Prometheus</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '写入吞吐量' : 'Write Throughput', '100K-1M samples/s', '500K-2M samples/s'],
              [isZh ? '查询延迟' : 'Query Latency', isZh ? '低' : 'Low', isZh ? '低-中' : 'Low-Medium'],
              [isZh ? '压缩率' : 'Compression', '10-15x', '10-20x'],
              [isZh ? '基数限制' : 'Cardinality Limit', '~10M series', '~30M+ series'],
              [isZh ? '存储效率' : 'Storage Efficiency', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '内存使用' : 'Memory Usage', isZh ? '与基数成比例' : 'Proportional to cardinality', isZh ? '较低' : 'Lower'],
            ].map(([metric, prom, influx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{prom}</td>
                <td style={tdStyle}>{influx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Prometheus</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据模型' : 'Data Model', isZh ? '指标名+标签' : 'Metric name + labels', isZh ? '测量+标签+字段' : 'Measurement + tags + fields'],
              [isZh ? '收集模式' : 'Collection Mode', isZh ? '拉取为主' : 'Pull-based', isZh ? '推送和拉取' : 'Push and pull'],
              [isZh ? '查询语言' : 'Query Language', 'PromQL', 'Flux / InfluxQL'],
              [isZh ? '内置告警' : 'Built-in Alerting', isZh ? '是（Alertmanager）' : 'Yes (Alertmanager)', isZh ? '通过外部工具' : 'Via external tools'],
              [isZh ? '服务发现' : 'Service Discovery', isZh ? '内置' : 'Built-in', isZh ? '通过Telegraf' : 'Via Telegraf'],
              [isZh ? '生态系统' : 'Ecosystem', 'CNCF', 'InfluxData'],
              [isZh ? '集群支持' : 'Clustering', isZh ? '否（需Thanos等）' : 'No (needs Thanos etc)', isZh ? '企业版/云' : 'Enterprise/Cloud'],
              [isZh ? '许可证' : 'License', 'Apache 2.0', 'MIT (OSS) / Proprietary'],
            ].map(([feature, prom, influx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prom}</td>
                <td style={tdStyle}>{influx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Query Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#e6522c' }}>{ct.prometheusExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# PromQL - Prometheus Query Language

# Rate of HTTP requests per second (last 5 minutes)
rate(http_requests_total[5m])

# 95th percentile response time
histogram_quantile(0.95, 
  rate(http_request_duration_seconds_bucket[5m])
)

# CPU usage per instance, averaged over 5 minutes
100 - (
  avg by(instance) (
    rate(node_cpu_seconds_total{mode="idle"}[5m])
  ) * 100
)

# Memory usage percentage
(
  1 - (
    node_memory_MemAvailable_bytes / 
    node_memory_MemTotal_bytes
  )
) * 100

# Request error rate
sum(rate(http_requests_total{status=~"5.."}[5m])) 
  / 
sum(rate(http_requests_total[5m]))

# Top 10 endpoints by request count
topk(10, 
  sum by(endpoint) (
    rate(http_requests_total[5m])
  )
)

# Alerting rule example
groups:
  - name: node_alerts
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on instance"`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22adf6' }}>{ct.influxdbExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Flux - InfluxDB Query Language

// Rate of HTTP requests per second (last 5 minutes)
from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "http_requests")
  |> filter(fn: (r) => r._field == "count")
  |> rate(unit: 1s)

// 95th percentile response time
from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "http_request_duration")
  |> filter(fn: (r) => r._field == "value")
  |> quantile(q: 0.95)

// CPU usage per instance, averaged over 5 minutes
from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r.mode != "idle")
  |> group(columns: ["host"])
  |> mean()
  |> map(fn: (r) => ({ r with _value: r._value * 100.0 }))

// Memory usage percentage
from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "memory")
  |> filter(fn: (r) => r._field == "used" or r._field == "total")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> map(fn: (r) => ({ r with _value: (r.used / r.total) * 100.0 }))

// Request error rate
errors = from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "http_requests")
  |> filter(fn: (r) => r.status =~ /^5/)
  |> count()

total = from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "http_requests")
  |> count()

join(tables: {errors: errors, total: total}, on: ["_time"])
  |> map(fn: (r) => ({ r with _value: r._value_errors / r._value_total }))

// Alerting task example
option task = {
  name: "high-cpu-alert",
  every: 5m,
}

from(bucket: "metrics")
  |> range(start: -5m)
  |> filter(fn: (r) => r._measurement == "cpu")
  |> filter(fn: (r) => r.mode == "idle")
  |> mean()
  |> filter(fn: (r) => r._value < 0.2)
  |> alert(
    message: "CPU usage above 80%",
    crit: (r) => r._value < 0.2,
  )`}</code></pre>

      {/* Data Model */}
      <h2 style={h2Style}>{ct.dataModelTitle}</h2>
      <p style={pStyle}>{ct.dataModelIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #e6522c' }}>
          <strong style={{ color: '#e6522c' }}>Prometheus</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`metric_name{label1="value1", label2="value2"} sample_value timestamp

Example:
http_requests_total{method="GET", endpoint="/api/users", status="200"} 1234 1609459200000`}</pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22adf6' }}>
          <strong style={{ color: '#22adf6' }}>InfluxDB</strong>
          <pre style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`measurement,tag1=value1,tag2=value2 field1=value1,field2=value2 timestamp

Example:
http_requests,method=GET,endpoint=/api/users,status=200 count=1234,duration=0.052 1609459200000000000`}</pre>
        </div>
      </div>

      {/* Alerting */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>Prometheus</th>
              <th style={thStyle}>InfluxDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '内置告警' : 'Built-in Alerting', isZh ? '是' : 'Yes', isZh ? '有限' : 'Limited'],
              [isZh ? '告警管理器' : 'Alert Manager', 'Alertmanager', isZh ? '外部（Grafana等）' : 'External (Grafana etc)'],
              [isZh ? '静默和抑制' : 'Silencing & Inhibition', isZh ? '支持' : 'Supported', isZh ? '需要外部工具' : 'Requires external tool'],
              [isZh ? '通知渠道' : 'Notification Channels', 'Email, Slack, PagerDuty, etc.', isZh ? '通过集成' : 'Via integrations'],
              [isZh ? '告警规则语法' : 'Alert Rule Syntax', 'PromQL', 'Flux'],
            ].map(([cap, prom, influx], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{prom}</td>
                <td style={tdStyle}>{influx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #e6522c' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#e6522c' }}>{ct.prometheusBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Kubernetes监控' : 'Kubernetes monitoring'}</li>
            <li>{isZh ? '云原生应用' : 'Cloud-native applications'}</li>
            <li>{isZh ? '服务网格' : 'Service meshes'}</li>
            <li>{isZh ? 'CNCF生态系统' : 'CNCF ecosystem'}</li>
            <li>{isZh ? '基于告警的运维' : 'Alerting-based operations'}</li>
            <li>{isZh ? '动态服务发现' : 'Dynamic service discovery'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22adf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22adf6' }}>{ct.influxdbBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'IoT和边缘设备' : 'IoT and edge devices'}</li>
            <li>{isZh ? '高基数数据' : 'High-cardinality data'}</li>
            <li>{isZh ? '金融时间序列' : 'Financial time series'}</li>
            <li>{isZh ? '传感器数据' : 'Sensor data'}</li>
            <li>{isZh ? '复杂查询和分析' : 'Complex queries and analysis'}</li>
            <li>{isZh ? '长期数据存储' : 'Long-term data storage'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/timestamp-converter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Timestamp Converter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
      </div>

      {/* FAQ */}
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
