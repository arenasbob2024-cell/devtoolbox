'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Prometheus Complete Guide: Monitoring and Alerting for Modern Infrastructure',
    description:
      'Master Prometheus from installation to production: architecture and components, prometheus.yml configuration, metric types (counter/gauge/histogram/summary), PromQL queries, recording rules, alerting rules and Alertmanager, service discovery, exporters, instrumenting Go/Python/Node.js apps, Grafana dashboards, federation, long-term storage with Thanos and Cortex, Kubernetes monitoring, and best practices.',
  },
  zh: {
    title: 'Prometheus 完全指南：现代基础设施的监控与告警',
    description:
      '从安装到生产环境全面掌握 Prometheus：架构与组件、prometheus.yml 配置、指标类型（计数器/仪表/直方图/摘要）、PromQL 查询、记录规则、告警规则与 Alertmanager、服务发现、导出器、Go/Python/Node.js 应用埋点、Grafana 仪表盘、联邦、Thanos/Cortex 长期存储、Kubernetes 监控和最佳实践。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Prometheus and what is it used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud in 2012. It collects metrics from configured targets at given intervals, evaluates rule expressions, displays results, and triggers alerts when conditions are observed. Prometheus is used for monitoring infrastructure, applications, and services in modern cloud-native environments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the four Prometheus metric types?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prometheus supports four metric types: Counter (monotonically increasing value, e.g., total HTTP requests), Gauge (value that can go up and down, e.g., current memory usage), Histogram (samples observations and counts them in configurable buckets, e.g., request duration), and Summary (similar to histogram but calculates configurable quantiles over a sliding time window).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Prometheus collect metrics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prometheus uses a pull-based model where the Prometheus server scrapes HTTP endpoints on monitored targets at configured intervals. Targets expose metrics in the Prometheus exposition format on a /metrics endpoint. For short-lived jobs, Prometheus provides a Pushgateway where jobs can push metrics before exiting. Service discovery mechanisms automatically find targets to scrape.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is PromQL and how do you use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PromQL (Prometheus Query Language) is a functional query language used to select and aggregate time series data in real time. It supports instant vectors, range vectors, and scalar values. Key operations include label matching, rate calculations, aggregations (sum, avg, max, min), and mathematical operations. PromQL is used in dashboards, alerting rules, and ad-hoc queries.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you set up alerting with Prometheus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alerting in Prometheus is a two-step process. First, define alerting rules in Prometheus that use PromQL expressions to define alert conditions and a for duration. When conditions are met, Prometheus sends alerts to Alertmanager. Alertmanager then handles deduplication, grouping, silencing, inhibition, and routing alerts to receivers like email, Slack, PagerDuty, or webhooks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you monitor Kubernetes with Prometheus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The recommended approach for Kubernetes monitoring is to use the kube-prometheus-stack Helm chart, which deploys Prometheus Operator, Grafana, Alertmanager, node-exporter, and kube-state-metrics. Prometheus Operator uses Custom Resource Definitions (ServiceMonitor, PodMonitor) for configuring scrape targets. It automatically discovers services and pods using Kubernetes service discovery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Thanos and Cortex for long-term storage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Thanos extends Prometheus with a sidecar that uploads TSDB blocks to object storage (S3, GCS). It provides global query view across multiple Prometheus instances and downsampling for long retention. Cortex is a horizontally scalable, multi-tenant storage backend that receives data via remote write. Thanos is simpler to deploy alongside existing Prometheus, while Cortex offers better multi-tenancy and horizontal scalability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Prometheus compare to other monitoring tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prometheus excels at metrics collection and alerting with its pull-based model, powerful PromQL, and native Kubernetes integration. Compared to Grafana Loki (logs), Jaeger (traces), Datadog (commercial SaaS), and InfluxDB (time-series database), Prometheus is purpose-built for metrics, is free and open-source, and has the largest ecosystem of exporters. It lacks built-in long-term storage and distributed features, which are addressed by Thanos or Cortex.',
      },
    },
  ],
};

export default function PrometheusGuide({ lang }: { lang: string }) {
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
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR */}
      <div style={tldrBoxStyle}>
        <strong>TL;DR</strong>
        <p style={{ margin: '8px 0 0 0' }}>
          {isZh
            ? 'Prometheus 是开源的监控和告警工具包，采用拉取模型从 /metrics 端点收集时间序列数据。它内置强大的 PromQL 查询语言、多维数据模型和原生告警功能。配合 Alertmanager 处理告警路由，配合 Grafana 构建仪表盘，配合 Thanos/Cortex 实现长期存储。Prometheus 是 Kubernetes 监控的事实标准。'
            : 'Prometheus is an open-source monitoring and alerting toolkit that uses a pull model to collect time series data from /metrics endpoints. It features a powerful PromQL query language, multi-dimensional data model, and native alerting. Pair it with Alertmanager for alert routing, Grafana for dashboards, and Thanos or Cortex for long-term storage. Prometheus is the de facto standard for Kubernetes monitoring.'}
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ color: '#0f172a', display: 'block', marginBottom: '8px' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151' }}>
          <li>{isZh ? 'Prometheus 使用拉取模型，从目标的 /metrics 端点主动抓取指标' : 'Prometheus uses a pull model, actively scraping metrics from target /metrics endpoints'}</li>
          <li>{isZh ? '四种指标类型：Counter、Gauge、Histogram 和 Summary' : 'Four metric types: Counter, Gauge, Histogram, and Summary'}</li>
          <li>{isZh ? 'PromQL 是强大的函数式查询语言，支持实时选择和聚合时间序列' : 'PromQL is a powerful functional query language for real-time time series selection and aggregation'}</li>
          <li>{isZh ? '告警分为两部分：Prometheus 定义规则，Alertmanager 处理路由和通知' : 'Alerting is two-part: Prometheus defines rules, Alertmanager handles routing and notification'}</li>
          <li>{isZh ? '丰富的导出器生态系统覆盖数据库、硬件、消息队列等' : 'A rich exporter ecosystem covers databases, hardware, message queues, and more'}</li>
          <li>{isZh ? 'Thanos 和 Cortex 解决长期存储和全局查询视图需求' : 'Thanos and Cortex address long-term storage and global query view needs'}</li>
        </ul>
      </div>

      {/* What is Prometheus */}
      <h2 style={h2Style}>{isZh ? '什么是 Prometheus？' : 'What Is Prometheus?'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 是一个开源的系统监控和告警工具包，最初由 SoundCloud 于 2012 年构建。2016 年，Prometheus 成为继 Kubernetes 之后第二个加入云原生计算基金会 (CNCF) 的项目，并于 2018 年毕业。它采用多维数据模型，通过指标名称和键值标签对标识时间序列数据。'
          : 'Prometheus is an open-source systems monitoring and alerting toolkit originally built at SoundCloud in 2012. In 2016, Prometheus became the second project to join the Cloud Native Computing Foundation (CNCF) after Kubernetes and graduated in 2018. It uses a multi-dimensional data model, identifying time series by metric name and key-value label pairs.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 的核心特性包括：拉取式 HTTP 采集模型、强大的 PromQL 查询语言、不依赖分布式存储的本地时序数据库、通过服务发现或静态配置发现目标、支持多种图形和仪表盘模式、以及内置告警管理。'
          : 'Core features of Prometheus include: a pull-based HTTP scrape model, the powerful PromQL query language, a local time-series database with no distributed storage dependency, target discovery via service discovery or static configuration, multiple graphing and dashboard modes, and built-in alert management.'}
      </p>

      {/* Architecture & Components */}
      <h2 style={h2Style}>{isZh ? '架构与组件' : 'Architecture & Components'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 生态系统由多个组件组成，大部分是可选的。理解这些组件如何协同工作是有效运维 Prometheus 的基础。'
          : 'The Prometheus ecosystem consists of multiple components, most of which are optional. Understanding how these components work together is fundamental to operating Prometheus effectively.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '组件' : 'Component'}</th>
            <th style={thStyle}>{isZh ? '职责' : 'Responsibility'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Prometheus Server</td><td style={tdStyle}>{isZh ? '抓取和存储时间序列数据' : 'Scrapes and stores time series data'}</td></tr>
          <tr><td style={tdStyle}>Alertmanager</td><td style={tdStyle}>{isZh ? '处理告警去重、分组、路由和通知' : 'Handles alert deduplication, grouping, routing, and notifications'}</td></tr>
          <tr><td style={tdStyle}>Pushgateway</td><td style={tdStyle}>{isZh ? '允许短生命周期任务推送指标' : 'Allows short-lived jobs to push metrics'}</td></tr>
          <tr><td style={tdStyle}>Exporters</td><td style={tdStyle}>{isZh ? '将第三方系统指标转换为 Prometheus 格式' : 'Translate third-party system metrics into Prometheus format'}</td></tr>
          <tr><td style={tdStyle}>Client Libraries</td><td style={tdStyle}>{isZh ? '在应用代码中埋点并暴露指标' : 'Instrument application code and expose metrics'}</td></tr>
          <tr><td style={tdStyle}>Service Discovery</td><td style={tdStyle}>{isZh ? '自动发现抓取目标' : 'Automatically discovers scrape targets'}</td></tr>
        </tbody>
      </table>

      {/* Installation */}
      <h2 style={h2Style}>{isZh ? '安装 Prometheus' : 'Installing Prometheus'}</h2>
      <h3 style={h3Style}>{isZh ? '使用 Docker 安装' : 'Install with Docker'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 Docker 是最快的启动方式。挂载配置文件和数据卷以实现持久化。'
          : 'Docker is the fastest way to get started. Mount your configuration file and a data volume for persistence.'}
      </p>
      <pre style={preStyle}><code>{'# Pull and run Prometheus with Docker\n' +
        'docker run -d \\\n' +
        '  --name prometheus \\\n' +
        '  -p 9090:9090 \\\n' +
        '  -v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml \\\n' +
        '  -v prometheus-data:/prometheus \\\n' +
        '  prom/prometheus:latest\n\n' +
        '# Verify it is running\n' +
        'curl http://localhost:9090/-/healthy'}</code></pre>

      <h3 style={h3Style}>{isZh ? '下载二进制文件安装' : 'Install from Binary'}</h3>
      <pre style={preStyle}><code>{'# Download Prometheus binary (Linux amd64)\n' +
        'wget https://github.com/prometheus/prometheus/releases/download/v2.53.0/prometheus-2.53.0.linux-amd64.tar.gz\n' +
        'tar xvfz prometheus-2.53.0.linux-amd64.tar.gz\n' +
        'cd prometheus-2.53.0.linux-amd64\n\n' +
        '# Start Prometheus\n' +
        './prometheus --config.file=prometheus.yml\n\n' +
        '# Create a systemd service for production\n' +
        'sudo useradd --no-create-home --shell /bin/false prometheus\n' +
        'sudo mkdir -p /etc/prometheus /var/lib/prometheus\n' +
        'sudo cp prometheus promtool /usr/local/bin/\n' +
        'sudo cp prometheus.yml /etc/prometheus/'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Docker Compose 完整栈' : 'Docker Compose Full Stack'}</h3>
      <pre style={preStyle}><code>{'# docker-compose.yml\n' +
        'services:\n' +
        '  prometheus:\n' +
        '    image: prom/prometheus:latest\n' +
        '    ports: ["9090:9090"]\n' +
        '    volumes:\n' +
        '      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n' +
        '      - prometheus-data:/prometheus\n' +
        '    command: ["--config.file=/etc/prometheus/prometheus.yml",\n' +
        '              "--storage.tsdb.retention.time=30d"]\n' +
        '  alertmanager:\n' +
        '    image: prom/alertmanager:latest\n' +
        '    ports: ["9093:9093"]\n' +
        '  grafana:\n' +
        '    image: grafana/grafana:latest\n' +
        '    ports: ["3000:3000"]\n' +
        'volumes:\n' +
        '  prometheus-data:'}</code></pre>

      {/* Configuration */}
      <h2 style={h2Style}>{isZh ? '配置 prometheus.yml' : 'Configuring prometheus.yml'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'prometheus.yml 是核心配置文件，定义了全局设置、抓取配置、告警规则文件路径和 Alertmanager 地址。'
          : 'prometheus.yml is the core configuration file that defines global settings, scrape configurations, alerting rule file paths, and Alertmanager addresses.'}
      </p>
      <pre style={preStyle}><code>{'# prometheus.yml - complete example\n' +
        'global:\n' +
        '  scrape_interval: 15s      # How often to scrape targets\n' +
        '  evaluation_interval: 15s  # How often to evaluate rules\n' +
        '  scrape_timeout: 10s       # Timeout per scrape request\n\n' +
        'alerting:\n' +
        '  alertmanagers:\n' +
        '    - static_configs:\n' +
        '        - targets:\n' +
        '            - alertmanager:9093\n\n' +
        'rule_files:\n' +
        '  - "alert-rules.yml"\n' +
        '  - "recording-rules.yml"\n\n' +
        'scrape_configs:\n' +
        '  # Monitor Prometheus itself\n' +
        '  - job_name: "prometheus"\n' +
        '    static_configs:\n' +
        '      - targets: ["localhost:9090"]\n\n' +
        '  # Monitor node exporter\n' +
        '  - job_name: "node"\n' +
        '    static_configs:\n' +
        '      - targets: ["node-exporter:9100"]\n' +
        '    scrape_interval: 10s\n\n' +
        '  # Monitor application with relabeling\n' +
        '  - job_name: "webapp"\n' +
        '    metrics_path: "/metrics"\n' +
        '    scheme: "https"\n' +
        '    static_configs:\n' +
        '      - targets: ["app1:8080", "app2:8080"]\n' +
        '        labels:\n' +
        '          env: "production"'}</code></pre>

      {/* Metric Types */}
      <h2 style={h2Style}>{isZh ? '指标类型' : 'Metric Types'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 定义了四种核心指标类型，每种都适用于不同的测量场景。选择正确的指标类型对有效监控至关重要。'
          : 'Prometheus defines four core metric types, each suited for different measurement scenarios. Choosing the correct type is essential for effective monitoring.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '类型' : 'Type'}</th>
            <th style={thStyle}>{isZh ? '行为' : 'Behavior'}</th>
            <th style={thStyle}>{isZh ? '示例' : 'Example'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Counter</td><td style={tdStyle}>{isZh ? '单调递增，仅在重启时重置' : 'Monotonically increasing, resets on restart'}</td><td style={tdStyle}>http_requests_total</td></tr>
          <tr><td style={tdStyle}>Gauge</td><td style={tdStyle}>{isZh ? '可以上升或下降的数值' : 'Value that can go up or down'}</td><td style={tdStyle}>node_memory_available_bytes</td></tr>
          <tr><td style={tdStyle}>Histogram</td><td style={tdStyle}>{isZh ? '将观测值分配到可配置的桶中' : 'Buckets observations into configurable bins'}</td><td style={tdStyle}>http_request_duration_seconds</td></tr>
          <tr><td style={tdStyle}>Summary</td><td style={tdStyle}>{isZh ? '在滑动窗口上计算分位数' : 'Calculates quantiles over a sliding window'}</td><td style={tdStyle}>rpc_duration_seconds</td></tr>
        </tbody>
      </table>
      <p style={pStyle}>
        {isZh ? '以下是各类型在 /metrics 端点上的示例输出。' : 'Here is example output for each type on the /metrics endpoint.'}
      </p>
      <pre style={preStyle}><code>{'# HELP http_requests_total Total HTTP requests\n' +
        '# TYPE http_requests_total counter\n' +
        'http_requests_total{method="GET",status="200"} 1234\n' +
        'http_requests_total{method="POST",status="201"} 56\n\n' +
        '# HELP node_memory_available_bytes Available memory in bytes\n' +
        '# TYPE node_memory_available_bytes gauge\n' +
        'node_memory_available_bytes 4.294967296e+09\n\n' +
        '# HELP http_request_duration_seconds Request duration histogram\n' +
        '# TYPE http_request_duration_seconds histogram\n' +
        'http_request_duration_seconds_bucket{le="0.05"} 2400\n' +
        'http_request_duration_seconds_bucket{le="0.1"} 2650\n' +
        'http_request_duration_seconds_bucket{le="0.5"} 2800\n' +
        'http_request_duration_seconds_bucket{le="+Inf"} 2834\n' +
        'http_request_duration_seconds_sum 150.72\n' +
        'http_request_duration_seconds_count 2834'}</code></pre>

      {/* PromQL Basics */}
      <h2 style={h2Style}>{isZh ? 'PromQL 基础' : 'PromQL Basics'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'PromQL 是 Prometheus 的函数式查询语言，用于实时选择和聚合时间序列数据。它是编写仪表盘和告警规则的核心。'
          : 'PromQL is the functional query language of Prometheus for real-time time series selection and aggregation. It is central to building dashboards and alerting rules.'}
      </p>

      <h3 style={h3Style}>{isZh ? '选择器与匹配器' : 'Selectors & Matchers'}</h3>
      <pre style={preStyle}><code>{'# Instant vector - select all time series for a metric\n' +
        'http_requests_total\n\n' +
        '# Label matching - exact match\n' +
        'http_requests_total{method="GET"}\n\n' +
        '# Regex matching\n' +
        'http_requests_total{status=~"5.."}\n\n' +
        '# Negative matching\n' +
        'http_requests_total{method!="DELETE"}\n\n' +
        '# Range vector - select 5 minutes of data\n' +
        'http_requests_total{method="GET"}[5m]\n\n' +
        '# Offset - query data from 1 hour ago\n' +
        'http_requests_total offset 1h'}</code></pre>

      <h3 style={h3Style}>{isZh ? '常用函数' : 'Common Functions'}</h3>
      <pre style={preStyle}><code>{'# rate() - per-second average rate of increase (for counters)\n' +
        'rate(http_requests_total[5m])\n\n' +
        '# irate() - instant rate based on last two data points\n' +
        'irate(http_requests_total[5m])\n\n' +
        '# increase() - total increase over a range\n' +
        'increase(http_requests_total[1h])\n\n' +
        '# histogram_quantile() - calculate percentiles\n' +
        'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))\n\n' +
        '# predict_linear() - predict value N seconds from now\n' +
        'predict_linear(node_filesystem_avail_bytes[6h], 24*3600)\n\n' +
        '# delta() - difference between first and last value\n' +
        'delta(process_resident_memory_bytes[1h])'}</code></pre>

      <h3 style={h3Style}>{isZh ? '聚合操作' : 'Aggregation Operators'}</h3>
      <pre style={preStyle}><code>{'# Sum across all instances\n' +
        'sum(rate(http_requests_total[5m]))\n\n' +
        '# Sum by specific label\n' +
        'sum by (method) (rate(http_requests_total[5m]))\n\n' +
        '# Average across instances\n' +
        'avg by (instance) (node_cpu_seconds_total)\n\n' +
        '# Top 5 by request rate\n' +
        'topk(5, sum by (handler) (rate(http_requests_total[5m])))\n\n' +
        '# Count of targets with >80% CPU\n' +
        'count(100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80)'}</code></pre>

      {/* Recording Rules */}
      <h2 style={h2Style}>{isZh ? '记录规则' : 'Recording Rules'}</h2>
      <p style={pStyle}>
        {isZh
          ? '记录规则预计算频繁使用或计算开销大的 PromQL 表达式，将结果存储为新的时间序列。这提高了仪表盘查询性能，也简化了告警规则的编写。'
          : 'Recording rules precompute frequently used or computationally expensive PromQL expressions, storing results as new time series. This improves dashboard query performance and simplifies alerting rule definitions.'}
      </p>
      <pre style={preStyle}><code>{'# recording-rules.yml\n' +
        'groups:\n' +
        '  - name: http_rules\n' +
        '    interval: 15s\n' +
        '    rules:\n' +
        '      # Request rate per service\n' +
        '      - record: job:http_requests_total:rate5m\n' +
        '        expr: sum by (job) (rate(http_requests_total[5m]))\n\n' +
        '      # Error rate percentage\n' +
        '      - record: job:http_errors:ratio5m\n' +
        '        expr: |\n' +
        '          sum by (job) (rate(http_requests_total{status=~"5.."}[5m]))\n' +
        '          /\n' +
        '          sum by (job) (rate(http_requests_total[5m]))\n\n' +
        '      # 95th percentile latency\n' +
        '      - record: job:http_duration_seconds:p95\n' +
        '        expr: histogram_quantile(0.95, sum by (job, le) (rate(http_request_duration_seconds_bucket[5m])))'}</code></pre>

      {/* Alerting Rules & Alertmanager */}
      <h2 style={h2Style}>{isZh ? '告警规则与 Alertmanager' : 'Alerting Rules & Alertmanager'}</h2>
      <p style={pStyle}>
        {isZh
          ? '告警在 Prometheus 中分两个阶段：Prometheus 服务器评估告警规则并发送触发的告警到 Alertmanager，Alertmanager 则负责去重、分组、静默、抑制和路由告警到正确的接收者。'
          : 'Alerting in Prometheus is a two-stage process: the Prometheus server evaluates alerting rules and sends firing alerts to Alertmanager, which handles deduplication, grouping, silencing, inhibition, and routing alerts to the correct receivers.'}
      </p>
      <h3 style={h3Style}>{isZh ? '告警规则示例' : 'Alerting Rules Example'}</h3>
      <pre style={preStyle}><code>{'# alert-rules.yml\n' +
        'groups:\n' +
        '  - name: critical_alerts\n' +
        '    rules:\n' +
        '      - alert: HighErrorRate\n' +
        '        expr: job:http_errors:ratio5m > 0.05\n' +
        '        for: 5m\n' +
        '        labels:\n' +
        '          severity: critical\n' +
        '        annotations:\n' +
        '          summary: "High error rate on {{ \\$labels.job }}"\n' +
        '          description: "Error rate is {{ \\$value | humanizePercentage }} for 5 min."\n\n' +
        '      - alert: InstanceDown\n' +
        '        expr: up == 0\n' +
        '        for: 2m\n' +
        '        labels:\n' +
        '          severity: critical\n' +
        '        annotations:\n' +
        '          summary: "Instance {{ \\$labels.instance }} is down"\n\n' +
        '      - alert: DiskSpaceLow\n' +
        '        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.1\n' +
        '        for: 10m\n' +
        '        labels:\n' +
        '          severity: warning\n' +
        '        annotations:\n' +
        '          summary: "Disk space below 10% on {{ \\$labels.instance }}"'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Alertmanager 配置' : 'Alertmanager Configuration'}</h3>
      <pre style={preStyle}><code>{'# alertmanager.yml\n' +
        'route:\n' +
        '  group_by: ["alertname", "job"]\n' +
        '  group_wait: 30s\n' +
        '  group_interval: 5m\n' +
        '  repeat_interval: 4h\n' +
        '  receiver: "default-email"\n' +
        '  routes:\n' +
        '    - match: { severity: critical }\n' +
        '      receiver: "pagerduty-critical"\n' +
        '    - match: { severity: warning }\n' +
        '      receiver: "slack-warnings"\n\n' +
        'receivers:\n' +
        '  - name: "default-email"\n' +
        '    email_configs:\n' +
        '      - to: "team@example.com"\n' +
        '  - name: "slack-warnings"\n' +
        '    slack_configs:\n' +
        '      - api_url: "https://hooks.slack.com/services/T00/B00/XXXX"\n' +
        '        channel: "#alerts"\n' +
        '  - name: "pagerduty-critical"\n' +
        '    pagerduty_configs:\n' +
        '      - service_key: "your-pagerduty-key"'}</code></pre>

      {/* Service Discovery */}
      <h2 style={h2Style}>{isZh ? '服务发现' : 'Service Discovery'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 支持多种服务发现机制，用于自动发现需要抓取的目标，无需手动维护静态配置。'
          : 'Prometheus supports multiple service discovery mechanisms to automatically find scrape targets without maintaining static configuration manually.'}
      </p>
      <pre style={preStyle}><code>{'scrape_configs:\n' +
        '  # File-based service discovery\n' +
        '  - job_name: "file-sd"\n' +
        '    file_sd_configs:\n' +
        '      - files:\n' +
        '          - "/etc/prometheus/targets/*.json"\n' +
        '        refresh_interval: 30s\n\n' +
        '  # Consul service discovery\n' +
        '  - job_name: "consul"\n' +
        '    consul_sd_configs:\n' +
        '      - server: "consul.example.com:8500"\n' +
        '        services: ["webapp", "api"]\n\n' +
        '  # DNS-based discovery\n' +
        '  - job_name: "dns"\n' +
        '    dns_sd_configs:\n' +
        '      - names: ["_prometheus._tcp.example.com"]\n' +
        '        type: SRV\n' +
        '        refresh_interval: 30s\n\n' +
        '  # EC2 discovery\n' +
        '  - job_name: "ec2"\n' +
        '    ec2_sd_configs:\n' +
        '      - region: us-east-1\n' +
        '        port: 9100\n' +
        '    relabel_configs:\n' +
        '      - source_labels: [__meta_ec2_tag_Environment]\n' +
        '        target_label: env'}</code></pre>

      {/* Exporters */}
      <h2 style={h2Style}>{isZh ? '导出器' : 'Exporters'}</h2>
      <p style={pStyle}>
        {isZh
          ? '导出器将第三方系统的指标转换为 Prometheus 格式。以下是最常用的导出器。'
          : 'Exporters translate third-party system metrics into Prometheus format. Below are the most commonly used exporters.'}
      </p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '导出器' : 'Exporter'}</th>
            <th style={thStyle}>{isZh ? '端口' : 'Port'}</th>
            <th style={thStyle}>{isZh ? '用途' : 'Purpose'}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>node_exporter</td><td style={tdStyle}>9100</td><td style={tdStyle}>{isZh ? 'Linux 硬件和操作系统指标' : 'Linux hardware and OS metrics'}</td></tr>
          <tr><td style={tdStyle}>blackbox_exporter</td><td style={tdStyle}>9115</td><td style={tdStyle}>{isZh ? 'HTTP/TCP/ICMP/DNS 探测' : 'HTTP/TCP/ICMP/DNS probing'}</td></tr>
          <tr><td style={tdStyle}>mysqld_exporter</td><td style={tdStyle}>9104</td><td style={tdStyle}>{isZh ? 'MySQL 服务器指标' : 'MySQL server metrics'}</td></tr>
          <tr><td style={tdStyle}>postgres_exporter</td><td style={tdStyle}>9187</td><td style={tdStyle}>{isZh ? 'PostgreSQL 服务器指标' : 'PostgreSQL server metrics'}</td></tr>
          <tr><td style={tdStyle}>redis_exporter</td><td style={tdStyle}>9121</td><td style={tdStyle}>{isZh ? 'Redis 服务器指标' : 'Redis server metrics'}</td></tr>
          <tr><td style={tdStyle}>nginx-exporter</td><td style={tdStyle}>9113</td><td style={tdStyle}>{isZh ? 'Nginx 连接和请求指标' : 'Nginx connection and request metrics'}</td></tr>
        </tbody>
      </table>

      <h3 style={h3Style}>{isZh ? 'node_exporter 部署' : 'Deploying node_exporter'}</h3>
      <pre style={preStyle}><code>{'# Run node_exporter with Docker\n' +
        'docker run -d \\\n' +
        '  --name node-exporter \\\n' +
        '  --net="host" \\\n' +
        '  --pid="host" \\\n' +
        '  -v "/:/host:ro,rslave" \\\n' +
        '  quay.io/prometheus/node-exporter:latest \\\n' +
        '  --path.rootfs=/host\n\n' +
        '# Verify metrics endpoint\n' +
        'curl http://localhost:9100/metrics | head -20'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'blackbox_exporter 配置' : 'Blackbox Exporter Configuration'}</h3>
      <pre style={preStyle}><code>{'# blackbox.yml\n' +
        'modules:\n' +
        '  http_2xx:\n' +
        '    prober: http\n' +
        '    timeout: 5s\n' +
        '    http:\n' +
        '      valid_http_versions: ["HTTP/1.1", "HTTP/2.0"]\n' +
        '      valid_status_codes: [200]\n' +
        '      follow_redirects: true\n\n' +
        '# prometheus.yml - scrape config for blackbox\n' +
        'scrape_configs:\n' +
        '  - job_name: "blackbox-http"\n' +
        '    metrics_path: /probe\n' +
        '    params:\n' +
        '      module: [http_2xx]\n' +
        '    static_configs:\n' +
        '      - targets:\n' +
        '          - https://example.com\n' +
        '          - https://api.example.com/health\n' +
        '    relabel_configs:\n' +
        '      - source_labels: [__address__]\n' +
        '        target_label: __param_target\n' +
        '      - source_labels: [__param_target]\n' +
        '        target_label: instance\n' +
        '      - target_label: __address__\n' +
        '        replacement: blackbox-exporter:9115'}</code></pre>

      {/* Instrumenting Applications */}
      <h2 style={h2Style}>{isZh ? '应用埋点' : 'Instrumenting Applications'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 提供官方客户端库，让你在应用代码中定义和暴露自定义指标。以下是 Go、Python 和 Node.js 的示例。'
          : 'Prometheus provides official client libraries to define and expose custom metrics in your application code. Below are examples for Go, Python, and Node.js.'}
      </p>

      <h3 style={h3Style}>Go</h3>
      <pre style={preStyle}><code>{'package main\n\n' +
        'import (\n' +
        '    "net/http"\n' +
        '    "github.com/prometheus/client_golang/prometheus"\n' +
        '    "github.com/prometheus/client_golang/prometheus/promhttp"\n' +
        ')\n\n' +
        'var httpRequests = prometheus.NewCounterVec(\n' +
        '    prometheus.CounterOpts{\n' +
        '        Name: "myapp_http_requests_total",\n' +
        '        Help: "Total HTTP requests.",\n' +
        '    },\n' +
        '    []string{"method", "status"},\n' +
        ')\n\n' +
        'func init() { prometheus.MustRegister(httpRequests) }\n\n' +
        'func main() {\n' +
        '    http.Handle("/metrics", promhttp.Handler())\n' +
        '    http.ListenAndServe(":8080", nil)\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>Python</h3>
      <pre style={preStyle}><code>{'# pip install prometheus-client\n' +
        'from prometheus_client import Counter, Histogram, start_http_server\n\n' +
        'REQUEST_COUNT = Counter("myapp_requests_total", "Total requests", ["method", "endpoint"])\n' +
        'REQUEST_LATENCY = Histogram(\n' +
        '    "myapp_request_duration_seconds", "Request latency",\n' +
        '    ["endpoint"], buckets=[0.01, 0.05, 0.1, 0.5, 1.0, 5.0]\n' +
        ')\n\n' +
        'def handle_request(method, endpoint):\n' +
        '    REQUEST_COUNT.labels(method=method, endpoint=endpoint).inc()\n' +
        '    with REQUEST_LATENCY.labels(endpoint=endpoint).time():\n' +
        '        process_request()\n\n' +
        'start_http_server(8000)  # Expose metrics on :8000/metrics'}</code></pre>

      <h3 style={h3Style}>Node.js</h3>
      <pre style={preStyle}><code>{'// npm install prom-client express\n' +
        'const client = require("prom-client");\n' +
        'const express = require("express");\n' +
        'const app = express();\n\n' +
        'client.collectDefaultMetrics();\n\n' +
        'const httpRequests = new client.Counter({\n' +
        '  name: "myapp_http_requests_total",\n' +
        '  help: "Total HTTP requests",\n' +
        '  labelNames: ["method", "route", "status"],\n' +
        '});\n\n' +
        'app.use((req, res, next) => {\n' +
        '  res.on("finish", () => {\n' +
        '    httpRequests.inc({ method: req.method, route: req.path, status: res.statusCode });\n' +
        '  });\n' +
        '  next();\n' +
        '});\n\n' +
        'app.get("/metrics", async (req, res) => {\n' +
        '  res.set("Content-Type", client.register.contentType);\n' +
        '  res.end(await client.register.metrics());\n' +
        '});\n' +
        'app.listen(3000);'}</code></pre>

      {/* Grafana Integration */}
      <h2 style={h2Style}>{isZh ? 'Grafana 集成' : 'Grafana Integration'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Grafana 是 Prometheus 最常用的可视化工具。在 Grafana 中添加 Prometheus 作为数据源后，你可以使用 PromQL 构建丰富的仪表盘。'
          : 'Grafana is the most popular visualization tool for Prometheus. After adding Prometheus as a data source in Grafana, you can use PromQL to build rich dashboards.'}
      </p>
      <pre style={preStyle}><code>{'# Grafana data source provisioning\n' +
        '# grafana/provisioning/datasources/prometheus.yml\n' +
        'apiVersion: 1\n' +
        'datasources:\n' +
        '  - name: Prometheus\n' +
        '    type: prometheus\n' +
        '    access: proxy\n' +
        '    url: http://prometheus:9090\n' +
        '    isDefault: true\n' +
        '    editable: true\n' +
        '    jsonData:\n' +
        '      timeInterval: "15s"\n' +
        '      httpMethod: POST'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '推荐社区仪表盘：Node Exporter Full (ID: 1860)、Prometheus Stats (ID: 2)、Kubernetes Cluster (ID: 6417)。以下是常用面板 PromQL 查询。'
          : 'Recommended community dashboards: Node Exporter Full (ID: 1860), Prometheus Stats (ID: 2), Kubernetes Cluster (ID: 6417). Here are common panel PromQL queries.'}
      </p>
      <pre style={preStyle}><code>{'# CPU Usage per Instance (percentage)\n' +
        '100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)\n\n' +
        '# Memory Usage (percentage)\n' +
        '(1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100\n\n' +
        '# Disk I/O (reads per second)\n' +
        'rate(node_disk_reads_completed_total[5m])\n\n' +
        '# Network traffic (bytes per second)\n' +
        'rate(node_network_receive_bytes_total{device!="lo"}[5m])\n\n' +
        '# HTTP request rate by status code\n' +
        'sum by (status) (rate(http_requests_total[5m]))'}</code></pre>

      {/* Federation */}
      <h2 style={h2Style}>{isZh ? '联邦' : 'Federation'}</h2>
      <p style={pStyle}>
        {isZh
          ? '联邦允许一个 Prometheus 服务器从另一个服务器抓取选定的时间序列数据。这对于多数据中心部署或按层级聚合指标非常有用。'
          : 'Federation allows one Prometheus server to scrape selected time series from another server. This is useful for multi-datacenter deployments or hierarchical aggregation of metrics.'}
      </p>
      <pre style={preStyle}><code>{'# Global Prometheus scraping from datacenter instances\n' +
        'scrape_configs:\n' +
        '  - job_name: "federate-dc1"\n' +
        '    scrape_interval: 30s\n' +
        '    honor_labels: true\n' +
        '    metrics_path: "/federate"\n' +
        '    params:\n' +
        '      "match[]":\n' +
        '        - \'{job="node"}\'\n' +
        '        - \'{job="webapp"}\'\n' +
        '        - \'{__name__=~"job:.*"}\'\n' +
        '    static_configs:\n' +
        '      - targets: ["prometheus-dc1.example.com:9090"]\n' +
        '        labels:\n' +
        '          datacenter: "dc1"'}</code></pre>

      {/* Long-term Storage */}
      <h2 style={h2Style}>{isZh ? '长期存储：Thanos 与 Cortex' : 'Long-Term Storage: Thanos & Cortex'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 本地存储适合短期保留（通常 15-30 天）。对于长期存储和全局查询视图，Thanos 和 Cortex 是两个主流解决方案。'
          : 'Prometheus local storage is suited for short-term retention (typically 15-30 days). For long-term storage and a global query view, Thanos and Cortex are the two leading solutions.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Thanos 架构' : 'Thanos Architecture'}</h3>
      <pre style={preStyle}><code>{'# Thanos Sidecar - runs alongside Prometheus\n' +
        'docker run -d --name thanos-sidecar \\\n' +
        '  quay.io/thanos/thanos:latest sidecar \\\n' +
        '  --tsdb.path=/prometheus \\\n' +
        '  --prometheus.url=http://prometheus:9090 \\\n' +
        '  --objstore.config-file=/etc/thanos/bucket.yml\n\n' +
        '# bucket.yml - S3 object storage\n' +
        'type: S3\n' +
        'config:\n' +
        '  bucket: "thanos-metrics"\n' +
        '  endpoint: "s3.amazonaws.com"\n\n' +
        '# Thanos Querier - global query view\n' +
        'docker run -d --name thanos-querier \\\n' +
        '  quay.io/thanos/thanos:latest query \\\n' +
        '  --store=thanos-sidecar-dc1:10901 \\\n' +
        '  --store=thanos-sidecar-dc2:10901'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Cortex 远程写入' : 'Cortex Remote Write'}</h3>
      <pre style={preStyle}><code>{'# prometheus.yml - remote write to Cortex\n' +
        'remote_write:\n' +
        '  - url: http://cortex-distributor:9009/api/v1/push\n' +
        '    queue_config:\n' +
        '      max_shards: 30\n' +
        '      max_samples_per_send: 1000'}</code></pre>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Thanos</th>
            <th style={thStyle}>Cortex</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>{isZh ? '数据摄入' : 'Data Ingestion'}</td><td style={tdStyle}>{isZh ? 'Sidecar 上传 TSDB 块' : 'Sidecar uploads TSDB blocks'}</td><td style={tdStyle}>{isZh ? '通过 remote_write 接收' : 'Receives via remote_write'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '多租户' : 'Multi-tenancy'}</td><td style={tdStyle}>{isZh ? '有限支持' : 'Limited'}</td><td style={tdStyle}>{isZh ? '原生支持' : 'Native support'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '部署复杂度' : 'Deployment'}</td><td style={tdStyle}>{isZh ? '较简单，附加到现有 Prometheus' : 'Simpler, attaches to existing Prometheus'}</td><td style={tdStyle}>{isZh ? '更复杂，独立服务' : 'More complex, standalone services'}</td></tr>
          <tr><td style={tdStyle}>{isZh ? '降采样' : 'Downsampling'}</td><td style={tdStyle}>{isZh ? '内置支持' : 'Built-in'}</td><td style={tdStyle}>{isZh ? '依赖外部' : 'External dependency'}</td></tr>
        </tbody>
      </table>

      {/* Kubernetes Monitoring */}
      <h2 style={h2Style}>{isZh ? 'Kubernetes 监控' : 'Kubernetes Monitoring'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 是 Kubernetes 监控的事实标准。kube-prometheus-stack Helm chart 提供了开箱即用的完整监控方案。'
          : 'Prometheus is the de facto standard for Kubernetes monitoring. The kube-prometheus-stack Helm chart provides a complete out-of-the-box monitoring solution.'}
      </p>
      <pre style={preStyle}><code>{'# Install kube-prometheus-stack with Helm\n' +
        'helm repo add prometheus-community \\\n' +
        '  https://prometheus-community.github.io/helm-charts\n' +
        'helm repo update\n\n' +
        'helm install monitoring prometheus-community/kube-prometheus-stack \\\n' +
        '  --namespace monitoring \\\n' +
        '  --create-namespace \\\n' +
        '  --set prometheus.prometheusSpec.retention=30d \\\n' +
        '  --set grafana.adminPassword=admin'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'ServiceMonitor 自定义资源' : 'ServiceMonitor Custom Resource'}</h3>
      <pre style={preStyle}><code>{'# ServiceMonitor for auto-discovering app metrics\n' +
        'apiVersion: monitoring.coreos.com/v1\n' +
        'kind: ServiceMonitor\n' +
        'metadata:\n' +
        '  name: webapp-monitor\n' +
        '  namespace: monitoring\n' +
        'spec:\n' +
        '  selector:\n' +
        '    matchLabels:\n' +
        '      app: webapp\n' +
        '  endpoints:\n' +
        '    - port: metrics\n' +
        '      interval: 15s\n' +
        '      path: /metrics\n' +
        '  namespaceSelector:\n' +
        '    matchNames:\n' +
        '      - production\n' +
        '      - staging'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Kubernetes 服务发现' : 'Kubernetes Service Discovery'}</h3>
      <pre style={preStyle}><code>{'# prometheus.yml - Kubernetes SD (without Operator)\n' +
        'scrape_configs:\n' +
        '  - job_name: "kubernetes-pods"\n' +
        '    kubernetes_sd_configs:\n' +
        '      - role: pod\n' +
        '    relabel_configs:\n' +
        '      # Only scrape pods with annotation prometheus.io/scrape=true\n' +
        '      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]\n' +
        '        action: keep\n' +
        '        regex: true\n' +
        '      # Use custom port from annotation\n' +
        '      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_port]\n' +
        '        action: replace\n' +
        '        target_label: __address__\n' +
        '        regex: (.+)\n' +
        '      # Use custom path from annotation\n' +
        '      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]\n' +
        '        action: replace\n' +
        '        target_label: __metrics_path__\n' +
        '        regex: (.+)'}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{isZh ? '最佳实践' : 'Best Practices'}</h2>
      <p style={pStyle}>
        {isZh
          ? '以下是运营 Prometheus 的关键最佳实践，帮助你避免常见陷阱。'
          : 'Here are key best practices for running Prometheus that help you avoid common pitfalls.'}
      </p>
      <ul style={ulStyle}>
        <li>{isZh ? '指标命名遵循约定：使用蛇形命名法，包含单位后缀（如 _seconds, _bytes, _total）' : 'Follow metric naming conventions: use snake_case with unit suffixes (_seconds, _bytes, _total)'}</li>
        <li>{isZh ? '限制标签基数：避免使用用户 ID 或请求 ID 等高基数标签' : 'Limit label cardinality: avoid high-cardinality labels like user IDs or request IDs'}</li>
        <li>{isZh ? '使用记录规则预计算频繁查询，而非每次都实时计算' : 'Use recording rules to precompute frequent queries instead of real-time calculation each time'}</li>
        <li>{isZh ? '为告警设置合理的 for 持续时间，避免因抖动产生噪音' : 'Set reasonable for durations on alerts to avoid noise from flapping'}</li>
        <li>{isZh ? '监控 Prometheus 自身：up, prometheus_tsdb_head_series, prometheus_tsdb_compaction_duration_seconds' : 'Monitor Prometheus itself: up, prometheus_tsdb_head_series, prometheus_tsdb_compaction_duration_seconds'}</li>
        <li>{isZh ? '使用 relabel_configs 在采集时过滤和转换标签，减少存储开销' : 'Use relabel_configs to filter and transform labels at scrape time to reduce storage overhead'}</li>
        <li>{isZh ? '设置合适的保留策略：默认 15 天，根据存储容量和查询需求调整' : 'Set appropriate retention: default is 15 days, adjust based on storage capacity and query needs'}</li>
        <li>{isZh ? '对于跨多个 Prometheus 实例的查询，使用联邦或 Thanos/Cortex' : 'For queries across multiple Prometheus instances, use federation or Thanos/Cortex'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '指标命名示例' : 'Metric Naming Examples'}</h3>
      <pre style={preStyle}><code>{'# Good metric names\n' +
        'http_requests_total              # counter with _total suffix\n' +
        'http_request_duration_seconds    # histogram with unit suffix\n' +
        'node_memory_available_bytes      # gauge with unit suffix\n' +
        'process_open_fds                 # gauge, no unit needed\n\n' +
        '# Bad metric names - avoid these\n' +
        'httpRequests                     # no camelCase\n' +
        'request_duration                 # missing unit suffix\n' +
        'http_request_duration_ms         # use base units (seconds not ms)\n' +
        'requests{user_id="12345"}        # high-cardinality label'}</code></pre>

      {/* Prometheus vs Alternatives */}
      <h2 style={h2Style}>{isZh ? 'Prometheus 与其他方案对比' : 'Prometheus vs Alternatives'}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>Prometheus</th>
            <th style={thStyle}>Datadog</th>
            <th style={thStyle}>InfluxDB</th>
            <th style={thStyle}>Victoria Metrics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '类型' : 'Type'}</td>
            <td style={tdStyle}>{isZh ? '开源，自托管' : 'Open-source, self-hosted'}</td>
            <td style={tdStyle}>{isZh ? '商业 SaaS' : 'Commercial SaaS'}</td>
            <td style={tdStyle}>{isZh ? '开源/商业' : 'Open-source / commercial'}</td>
            <td style={tdStyle}>{isZh ? '开源，自托管' : 'Open-source, self-hosted'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '数据模型' : 'Data Model'}</td>
            <td style={tdStyle}>{isZh ? '拉取式，多维标签' : 'Pull-based, multi-dimensional labels'}</td>
            <td style={tdStyle}>{isZh ? '推送式，标签+主机' : 'Push-based, tags + host'}</td>
            <td style={tdStyle}>{isZh ? '推送式，measurement+tag' : 'Push-based, measurement + tag'}</td>
            <td style={tdStyle}>{isZh ? '兼容 Prometheus' : 'Prometheus-compatible'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '查询语言' : 'Query Language'}</td>
            <td style={tdStyle}>PromQL</td>
            <td style={tdStyle}>{isZh ? '专有查询' : 'Proprietary'}</td>
            <td style={tdStyle}>InfluxQL / Flux</td>
            <td style={tdStyle}>MetricsQL (PromQL superset)</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '长期存储' : 'Long-term Storage'}</td>
            <td style={tdStyle}>{isZh ? '需要 Thanos/Cortex' : 'Requires Thanos/Cortex'}</td>
            <td style={tdStyle}>{isZh ? '内置' : 'Built-in'}</td>
            <td style={tdStyle}>{isZh ? '内置' : 'Built-in'}</td>
            <td style={tdStyle}>{isZh ? '内置，高压缩' : 'Built-in, high compression'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '成本' : 'Cost'}</td>
            <td style={tdStyle}>{isZh ? '免费（运维成本）' : 'Free (operational cost)'}</td>
            <td style={tdStyle}>{isZh ? '按主机/指标计费' : 'Per host/metric pricing'}</td>
            <td style={tdStyle}>{isZh ? '开源免费/企业版付费' : 'Free OSS / paid enterprise'}</td>
            <td style={tdStyle}>{isZh ? '免费（运维成本）' : 'Free (operational cost)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? 'K8s 集成' : 'K8s Integration'}</td>
            <td style={tdStyle}>{isZh ? '原生，事实标准' : 'Native, de facto standard'}</td>
            <td style={tdStyle}>{isZh ? '通过 Agent 支持' : 'Via agent'}</td>
            <td style={tdStyle}>{isZh ? '通过 Telegraf' : 'Via Telegraf'}</td>
            <td style={tdStyle}>{isZh ? '兼容 Prometheus 生态' : 'Prometheus ecosystem compatible'}</td>
          </tr>
        </tbody>
      </table>

      {/* Conclusion */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Conclusion'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Prometheus 是现代基础设施监控的基石。它的拉取模型、多维数据模型和强大的 PromQL 使其成为云原生环境的首选监控工具。从单节点 Docker 部署到大规模 Kubernetes 集群，Prometheus 都能提供可靠的指标采集和告警能力。配合 Grafana 构建可视化仪表盘，配合 Alertmanager 实现智能告警路由，配合 Thanos 或 Cortex 扩展到长期存储，你可以构建一个完整的、生产就绪的监控平台。无论你是刚开始接触监控还是需要扩展现有方案，Prometheus 都是一个值得投入的强大工具。'
          : 'Prometheus is the cornerstone of modern infrastructure monitoring. Its pull model, multi-dimensional data model, and powerful PromQL make it the monitoring tool of choice for cloud-native environments. From single-node Docker deployments to large-scale Kubernetes clusters, Prometheus provides reliable metric collection and alerting capabilities. Pair it with Grafana for visualization dashboards, Alertmanager for intelligent alert routing, and Thanos or Cortex for long-term storage to build a complete, production-ready monitoring platform. Whether you are just starting with monitoring or need to scale an existing solution, Prometheus is a powerful tool worth investing in.'}
      </p>
    </article>
  );
}
