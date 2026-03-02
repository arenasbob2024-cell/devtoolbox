'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Grafana vs Datadog: Observability Platform Comparison',
    intro: 'Grafana and Datadog are leading observability platforms, each with distinct strengths. This comprehensive comparison examines features, pricing, architecture, and real-world usage to help you choose the right monitoring and observability solution for your infrastructure.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Grafana is open-source with flexible data source integration, ideal for organizations wanting control and cost predictability. Datadog is a SaaS platform with comprehensive built-in features, perfect for teams wanting an all-in-one solution. Choose Grafana for flexibility and lower cost at scale; choose Datadog for ease of use and faster time-to-value.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Grafana is open-source with 150+ data source integrations',
    takeaway2: 'Datadog offers unified SaaS platform with 600+ integrations',
    takeaway3: 'Grafana has predictable pricing; Datadog pricing scales with usage',
    takeaway4: 'Datadog provides better out-of-the-box experience',
    takeaway5: 'Grafana offers more customization and self-hosting options',
    takeaway6: 'Both support metrics, logs, traces, and alerting',
    
    whatIsGrafanaTitle: 'What is Grafana?',
    whatIsGrafanaContent: 'Grafana is an open-source analytics and interactive visualization platform developed by Grafana Labs. It connects to various data sources including Prometheus, InfluxDB, Elasticsearch, and cloud provider services. Grafana excels at creating beautiful, customizable dashboards and offers both self-hosted and cloud options.',
    
    whatIsDatadogTitle: 'What is Datadog?',
    whatIsDatadogContent: 'Datadog is a cloud-native monitoring and analytics platform founded in 2010. It provides a unified view of metrics, traces, and logs across your entire infrastructure. As a SaaS platform, Datadog eliminates operational overhead while offering comprehensive observability features out of the box.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'Core architectural differences:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing observability capabilities:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost structure differences:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'See how each platform is configured:',
    
    grafanaExampleTitle: 'Grafana Setup',
    datadogExampleTitle: 'Datadog Setup',
    
    whenToUseTitle: 'When to Use Each Platform',
    grafanaBestFor: 'Use Grafana When:',
    datadogBestFor: 'Use Datadog When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Grafana and Datadog represent different philosophies in observability. Grafana provides flexibility, cost control, and the ability to integrate with your existing tools, making it ideal for organizations with specific requirements or budget constraints. Datadog offers a comprehensive, unified experience with minimal setup, perfect for teams that want immediate value. Many organizations use both: Grafana for custom dashboards and Datadog for comprehensive monitoring.',
    
    faq1q: 'Can Grafana and Datadog work together?',
    faq1a: 'Yes, you can use the Datadog data source plugin for Grafana to visualize Datadog metrics in Grafana dashboards. This allows you to combine Datadog collection with Grafana visualization.',
    
    faq2q: 'Is Grafana really free?',
    faq2a: 'Grafana OSS is free and open-source. However, you pay for hosting and any commercial plugins. Grafana Cloud has a generous free tier and paid plans for larger usage. Enterprise features require a subscription.',
    
    faq3q: 'How does Datadog pricing work?',
    faq3a: 'Datadog uses per-host and per-ingestion pricing. Infrastructure monitoring starts at 15/host/month. APM, log management, and other features are priced separately. Costs can grow significantly with scale.',
    
    faq4q: 'Which has better alerting?',
    faq4a: 'Both have robust alerting. Grafana alerts are highly customizable with multi-condition rules. Datadog offers AI-powered anomaly detection and more pre-built alert templates. Choose based on your alert complexity needs.',
    
    faq5q: 'Does Grafana support distributed tracing?',
    faq5a: 'Yes, through Tempo (Grafana Labs tracing backend) or integration with Jaeger, Zipkin, and other tracing systems. The LGTM stack (Loki, Grafana, Tempo, Mimir) provides full observability.',
    
    faq6q: 'Can I migrate from Datadog to Grafana?',
    faq6a: 'Migration is possible but requires effort. You need to set up alternative backends (Prometheus, Loki, Tempo) and recreate dashboards and alerts. Consider starting with hybrid approach before full migration.',
    
    faq7q: 'Which is better for Kubernetes monitoring?',
    faq7a: 'Both excel at Kubernetes monitoring. Grafana with Prometheus is the de facto standard for K8s. Datadog offers easier setup with auto-discovery. Your choice depends on whether you prefer self-managed or managed solutions.',
    
    faq8q: 'What about log management?',
    faq8a: 'Grafana uses Loki for logs, which is cost-effective and integrates seamlessly with metrics. Datadog Logs offers more advanced parsing and analytics but at higher cost. Loki is great for high-volume, low-cost log storage.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Grafana vs Datadog：可观测性平台对比',
    intro: 'Grafana和Datadog是领先的可观测性平台，各有独特优势。本全面比较考察功能、定价、架构和实际使用，帮助你为基础设施选择合适的监控和可观测性解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Grafana是开源平台，具有灵活的数据源集成，适合希望控制成本的组织。Datadog是SaaS平台，具有全面的内置功能，非常适合想要一体化解决方案的团队。追求灵活性和大规模低成本选择Grafana；追求易用性和更快实现价值选择Datadog。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Grafana是开源平台，拥有150+数据源集成',
    takeaway2: 'Datadog提供统一SaaS平台，拥有600+集成',
    takeaway3: 'Grafana定价可预测；Datadog定价随使用量增长',
    takeaway4: 'Datadog提供更好的开箱即用体验',
    takeaway5: 'Grafana提供更多定制和自托管选项',
    takeaway6: '两者都支持指标、日志、追踪和告警',
    
    whatIsGrafanaTitle: '什么是Grafana？',
    whatIsGrafanaContent: 'Grafana是由Grafana Labs开发的开源分析和交互式可视化平台。它连接各种数据源，包括Prometheus、InfluxDB、Elasticsearch和云提供商服务。Grafana擅长创建美观、可定制的仪表板，并提供自托管和云选项。',
    
    whatIsDatadogTitle: '什么是Datadog？',
    whatIsDatadogContent: 'Datadog是2010年成立的云原生监控和分析平台。它提供整个基础设施的指标、追踪和日志统一视图。作为SaaS平台，Datadog消除了运维开销，同时提供开箱即用的全面可观测性功能。',
    
    architectureTitle: '架构对比',
    architectureIntro: '核心架构差异：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较可观测性能力：',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本结构差异：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '查看每个平台的配置：',
    
    grafanaExampleTitle: 'Grafana设置',
    datadogExampleTitle: 'Datadog设置',
    
    whenToUseTitle: '何时使用每个平台',
    grafanaBestFor: '使用Grafana的场景：',
    datadogBestFor: '使用Datadog的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Grafana和Datadog代表了可观测性的不同理念。Grafana提供灵活性、成本控制和与现有工具集成的能力，非常适合有特定需求或预算限制的组织。Datadog提供全面、统一的体验，设置最少，非常适合想要即时价值的团队。许多组织同时使用两者：Grafana用于自定义仪表板，Datadog用于全面监控。',
    
    faq1q: 'Grafana和Datadog可以一起使用吗？',
    faq1a: '可以，你可以使用Grafana的Datadog数据源插件在Grafana仪表板中可视化Datadog指标。这允许你将Datadog收集与Grafana可视化相结合。',
    
    faq2q: 'Grafana真的免费吗？',
    faq2a: 'Grafana OSS是免费开源的。但是，你需要支付托管和任何商业插件费用。Grafana Cloud有慷慨的免费层和更大使用量的付费计划。企业功能需要订阅。',
    
    faq3q: 'Datadog定价如何工作？',
    faq3a: 'Datadog使用按主机和按摄入量定价。基础设施监控从15/主机/月开始。APM、日志管理和其他功能单独定价。成本可能随规模显著增长。',
    
    faq4q: '哪个告警更好？',
    faq4a: '两者都有强大的告警功能。Grafana告警高度可定制，具有多条件规则。Datadog提供AI驱动的异常检测和更多预构建告警模板。根据你的告警复杂度需求选择。',
    
    faq5q: 'Grafana支持分布式追踪吗？',
    faq5a: '支持，通过Tempo（Grafana Labs追踪后端）或与Jaeger、Zipkin和其他追踪系统集成。LGTM技术栈（Loki、Grafana、Tempo、Mimir）提供完整可观测性。',
    
    faq6q: '可以从Datadog迁移到Grafana吗？',
    faq6a: '迁移是可能的但需要努力。你需要设置替代后端（Prometheus、Loki、Tempo）并重新创建仪表板和告警。在完全迁移之前考虑先采用混合方法。',
    
    faq7q: '哪个更适合Kubernetes监控？',
    faq7a: '两者都擅长Kubernetes监控。Grafana与Prometheus是K8s的事实标准。Datadog提供更简单的设置和自动发现。你的选择取决于你更喜欢自管理还是托管解决方案。',
    
    faq8q: '日志管理如何？',
    faq8a: 'Grafana使用Loki处理日志，成本效益高且与指标无缝集成。Datadog Logs提供更高级的解析和分析，但成本更高。Loki非常适合高容量、低成本的日志存储。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function GrafanaVsDatadog({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsGrafanaTitle}</h3>
      <p style={pStyle}>{ct.whatIsGrafanaContent}</p>

      <h3 style={h3Style}>{ct.whatIsDatadogTitle}</h3>
      <p style={pStyle}>{ct.whatIsDatadogContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型' : 'Type', 'Open Source + Cloud', 'SaaS Only'],
              [isZh ? '托管选项' : 'Hosting', 'Self-hosted / Cloud', 'SaaS Only'],
              [isZh ? '数据存储' : 'Data Storage', 'Multiple Backends', 'Proprietary'],
              [isZh ? '集成数量' : 'Integrations', '150+ Data Sources', '600+ Built-in'],
              [isZh ? '部署复杂度' : 'Deployment', 'Moderate', 'Simple'],
              [isZh ? '数据所有权' : 'Data Ownership', 'Full Control', 'Datadog Managed'],
              [isZh ? '仪表板' : 'Dashboards', 'Highly Customizable', 'Pre-built + Custom'],
              [isZh ? 'API访问' : 'API Access', 'Full API', 'Full API'],
            ].map(([feature, grafana, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f46800' }}>{grafana}</td>
                <td style={{ ...tdStyle, color: '#632ca6' }}>{datadog}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '指标' : 'Metrics', '✓ (Prometheus/Various)', '✓ Native'],
              [isZh ? '日志' : 'Logs', '✓ (Loki)', '✓ Native'],
              [isZh ? '追踪' : 'Tracing', '✓ (Tempo)', '✓ APM'],
              [isZh ? '告警' : 'Alerting', '✓ Advanced', '✓ AI-powered'],
              [isZh ? '仪表板' : 'Dashboards', '✓ Best-in-class', '✓ Comprehensive'],
              [isZh ? '基础设施监控' : 'Infrastructure', '✓', '✓ Auto-discovery'],
              [isZh ? '容器监控' : 'Container Monitoring', '✓', '✓ Native'],
              [isZh ? 'Kubernetes' : 'Kubernetes', '✓', '✓ Native'],
              [isZh ? '合成监控' : 'Synthetic Monitoring', '✓', '✓'],
              [isZh ? 'RUM' : 'RUM', '✓ Faro', '✓ Native'],
              [isZh ? '安全' : 'Security', 'Via Plugins', '✓ CSM'],
              [isZh ? 'CI/CD集成' : 'CI/CD Integration', '✓', '✓ CI Visibility'],
            ].map(([feature, grafana, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{grafana}</td>
                <td style={tdStyle}>{datadog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目' : 'Item'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', 'Yes (3 users)', '5 hosts (1 day)'],
              [isZh ? '基础设施监控' : 'Infrastructure', '0 (self-hosted)', '15/host/month'],
              [isZh ? '指标存储' : 'Metrics Storage', '0 (self-managed)', 'Per ingestion'],
              [isZh ? '日志' : 'Logs', '0 (Loki self-hosted)', '0.10/GB ingested'],
              [isZh ? 'APM' : 'APM', '0 (Tempo self-hosted)', '31/host/month'],
              [isZh ? '企业支持' : 'Enterprise Support', 'Custom', 'Included'],
              [isZh ? '100主机预估' : '100 Hosts Est.', '500-1000/month', '5000+/month'],
            ].map(([item, grafana, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{grafana}</td>
                <td style={tdStyle}>{datadog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div>
          <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.grafanaExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# docker-compose.yml for Grafana Stack
version: '3.8'

services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"

  tempo:
    image: grafana/tempo:latest
    ports:
      - "3200:3200"

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-storage:/var/lib/grafana

volumes:
  grafana-storage:

# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

# Grafana Dashboard JSON (excerpt)
{
  "dashboard": {
    "title": "Infrastructure Overview",
    "panels": [
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(cpu_seconds_total[5m])",
            "datasource": "Prometheus"
          }
        ]
      }
    ]
  }
}`}</code></pre>
        </div>
        <div>
          <h3 style={{ ...h3Style, color: '#632ca6' }}>{ct.datadogExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# Install Datadog Agent
DD_API_KEY=your_api_key bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

# datadog.yaml (Agent Configuration)
api_key: your_api_key
site: datadoghq.com

# Enable integrations
logs_enabled: true
apm_enabled: true
process_config:
  enabled: true

# Kubernetes DaemonSet
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: datadog
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:latest
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: DD_SITE
          value: datadoghq.com
        volumeMounts:
        - name: dockersocket
          mountPath: /var/run/docker.sock
        - name: procdir
          mountPath: /host/proc
          readOnly: true
      volumes:
      - name: dockersocket
        hostPath:
          path: /var/run/docker.sock
      - name: procdir
        hostPath:
          path: /proc

# Custom Metric (Python)
from datadog import statsd
statsd.increment('myapp.requests')
statsd.histogram('myapp.latency', latency_ms)`}</code></pre>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.grafanaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '预算敏感项目' : 'Budget-conscious projects'}</li>
            <li>{isZh ? '需要自托管' : 'Need self-hosting'}</li>
            <li>{isZh ? '多种数据源' : 'Multiple data sources'}</li>
            <li>{isZh ? '高度定制需求' : 'High customization needs'}</li>
            <li>{isZh ? '现有Prometheus用户' : 'Existing Prometheus users'}</li>
            <li>{isZh ? '数据主权要求' : 'Data sovereignty requirements'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #632ca6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#632ca6' }}>{ct.datadogBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速部署' : 'Quick deployment'}</li>
            <li>{isZh ? '一体化解决方案' : 'All-in-one solution'}</li>
            <li>{isZh ? '企业支持需求' : 'Enterprise support needs'}</li>
            <li>{isZh ? 'AI/ML功能' : 'AI/ML features'}</li>
            <li>{isZh ? '小型团队' : 'Small teams'}</li>
            <li>{isZh ? '预构建仪表板' : 'Pre-built dashboards'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a>
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
