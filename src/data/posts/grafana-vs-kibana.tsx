'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Grafana vs Kibana: Visualization Platform Comparison',
    intro: 'Grafana and Kibana are two leading visualization and observability platforms. While both create dashboards and visualizations, they have different origins and strengths. Grafana started as a metrics visualization tool, while Kibana is part of the Elastic Stack focused on log analytics. This comparison examines their capabilities, integrations, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Grafana for multi-source metrics visualization, alerting, and heterogeneous infrastructure monitoring. Choose Kibana for deep log analysis, Elasticsearch data exploration, and when you are already invested in the Elastic Stack. Both can visualize metrics and logs, but Grafana excels at metrics while Kibana excels at log analytics.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Grafana supports 30+ data sources; Kibana is optimized for Elasticsearch',
    takeaway2: 'Kibana has superior log exploration and full-text search capabilities',
    takeaway3: 'Grafana offers more flexible alerting with multiple notification channels',
    takeaway4: 'Both have strong dashboarding and visualization capabilities',
    takeaway5: 'Kibana includes machine learning features for anomaly detection',
    takeaway6: 'Grafana has better multi-tenancy and team management features',
    
    whatIsGrafanaTitle: 'What is Grafana?',
    whatIsGrafanaContent: 'Grafana is an open-source analytics and interactive visualization platform developed by Grafana Labs. Released in 2014, it supports multiple data sources including Prometheus, InfluxDB, Elasticsearch, and cloud services. Grafana is known for its flexible dashboarding, alerting capabilities, and extensive plugin ecosystem.',
    
    whatIsKibanaTitle: 'What is Kibana?',
    whatIsKibanaContent: 'Kibana is a data visualization dashboard for Elasticsearch, part of the Elastic Stack (ELK). Originally released in 2013, it provides visualization, exploration, and analysis capabilities for data stored in Elasticsearch. Kibana excels at log analytics, full-text search, and includes machine learning features.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Dashboard and alert configuration:',
    
    grafanaExampleTitle: 'Grafana Dashboard Config',
    kibanaExampleTitle: 'Kibana Dashboard Config',
    
    dataSourceTitle: 'Data Source Support',
    dataSourceIntro: 'Supported backends and integrations:',
    
    alertingTitle: 'Alerting Capabilities',
    alertingIntro: 'Alerting and notification features:',
    
    useCasesTitle: 'Best Use Cases',
    grafanaBestFor: 'Grafana is Best For:',
    kibanaBestFor: 'Kibana is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Grafana and Kibana serve complementary but overlapping needs. Grafana is the choice for multi-source metrics visualization, heterogeneous infrastructure monitoring, and teams needing flexible alerting. Kibana excels when your primary data lives in Elasticsearch, especially for log analytics, security analytics, and full-text search. Many organizations use both: Kibana for log exploration within the Elastic Stack and Grafana for cross-platform metrics and alerting.',
    
    faq1q: 'Can I use Grafana with Elasticsearch data?',
    faq1a: 'Yes, Grafana has native Elasticsearch support as a data source. You can visualize Elasticsearch data in Grafana dashboards. However, Kibana provides deeper integration with Elasticsearch features like advanced aggregations, machine learning, and Canvas visualizations.',
    
    faq2q: 'Which is better for log analysis?',
    faq2a: 'Kibana is better for log analysis due to its tight integration with Elasticsearch, powerful full-text search, Discover interface, and log-specific visualizations. Grafana can visualize log metrics but is not designed for log exploration.',
    
    faq3q: 'How do they compare for alerting?',
    faq3a: 'Grafana has more flexible alerting with support for multiple data sources, complex conditions, and numerous notification channels. Kibana alerting is powerful but tied to Elasticsearch data. For heterogeneous environments, Grafana alerting is more versatile.',
    
    faq4q: 'Can I use both tools together?',
    faq4a: 'Yes, this is common. Use Kibana for deep log analysis in the Elastic Stack and Grafana for cross-platform metrics dashboards and alerting. You can even embed Kibana visualizations in Grafana dashboards.',
    
    faq5q: 'What about pricing and licensing?',
    faq5a: 'Both offer open-source versions. Grafana Enterprise adds enterprise features, LDAP, and support. Kibana is open-source with Elastic Stack, but advanced security and machine learning require an Elastic license. Cloud versions are available for both.',
    
    faq6q: 'Which has better Kubernetes integration?',
    faq6a: 'Grafana has excellent Kubernetes integration with Prometheus, Loki, and Tempo support. Kibana integrates with Kubernetes via Filebeat and Metricbeat for log and metric collection into Elasticsearch. Both work well with Kubernetes but serve different needs.',
    
    faq7q: 'What about machine learning features?',
    faq7a: 'Kibana includes built-in machine learning for anomaly detection, forecasting, and unusual term detection on Elasticsearch data. Grafana does not have native ML but integrates with external ML tools and can visualize ML outputs.',
    
    faq8q: 'Which is easier to learn?',
    faq8a: 'Grafana is generally easier to start with for metrics visualization. Kibana has more features and can be complex, especially for advanced analytics. Both have extensive documentation and community resources.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Grafana vs Kibana：可视化平台对比',
    intro: 'Grafana和Kibana是两个领先的可视化和 observability 平台。虽然两者都创建仪表盘和可视化，但它们有不同的起源和优势。Grafana始于指标可视化工具，而Kibana是Elastic Stack的一部分，专注于日志分析。本比较考察它们的功能、集成和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为多源指标可视化、告警和异构基础设施监控选择Grafana。为深度日志分析、Elasticsearch数据探索和已经投入Elastic Stack的场景选择Kibana。两者都可以可视化指标和日志，但Grafana在指标方面表现出色，而Kibana在日志分析方面表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Grafana支持30+数据源；Kibana针对Elasticsearch优化',
    takeaway2: 'Kibana具有卓越的日志探索和全文搜索能力',
    takeaway3: 'Grafana提供更灵活的告警和多个通知渠道',
    takeaway4: '两者都有强大的仪表盘和可视化能力',
    takeaway5: 'Kibana包括机器学习功能用于异常检测',
    takeaway6: 'Grafana有更好的多租户和团队管理功能',
    
    whatIsGrafanaTitle: '什么是Grafana？',
    whatIsGrafanaContent: 'Grafana是由Grafana Labs开发的开源分析和交互式可视化平台。2014年发布，它支持多种数据源，包括Prometheus、InfluxDB、Elasticsearch和云服务。Grafana以其灵活的仪表盘、告警功能和广泛的插件生态系统而闻名。',
    
    whatIsKibanaTitle: '什么是Kibana？',
    whatIsKibanaContent: 'Kibana是Elasticsearch的数据可视化仪表盘，是Elastic Stack（ELK）的一部分。最初于2013年发布，它为存储在Elasticsearch中的数据提供可视化、探索和分析功能。Kibana在日志分析、全文搜索方面表现出色，并包括机器学习功能。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '仪表盘和告警配置：',
    
    grafanaExampleTitle: 'Grafana仪表盘配置',
    kibanaExampleTitle: 'Kibana仪表盘配置',
    
    dataSourceTitle: '数据源支持',
    dataSourceIntro: '支持的后端和集成：',
    
    alertingTitle: '告警能力',
    alertingIntro: '告警和通知功能：',
    
    useCasesTitle: '最佳用例',
    grafanaBestFor: 'Grafana最适合：',
    kibanaBestFor: 'Kibana最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Grafana和Kibana服务于互补但有重叠的需求。Grafana是多源指标可视化、异构基础设施监控和需要灵活告警的团队的选择。当你的主要数据存储在Elasticsearch中时，Kibana表现出色，特别是对于日志分析、安全分析和全文搜索。许多组织同时使用两者：Kibana用于Elastic Stack内的日志探索，Grafana用于跨平台指标和告警。',
    
    faq1q: '我可以在Grafana中使用Elasticsearch数据吗？',
    faq1a: '是的，Grafana原生支持Elasticsearch作为数据源。你可以在Grafana仪表盘中可视化Elasticsearch数据。但是，Kibana与Elasticsearch功能有更深入的集成，如高级聚合、机器学习和Canvas可视化。',
    
    faq2q: '哪个更适合日志分析？',
    faq2a: 'Kibana更适合日志分析，因为它与Elasticsearch紧密集成，具有强大的全文搜索、Discover界面和日志专用可视化。Grafana可以可视化日志指标，但不是为日志探索设计的。',
    
    faq3q: '它们在告警方面如何比较？',
    faq3a: 'Grafana有更灵活的告警功能，支持多种数据源、复杂条件和众多通知渠道。Kibana告警功能强大但与Elasticsearch数据绑定。对于异构环境，Grafana告警更通用。',
    
    faq4q: '我可以同时使用两个工具吗？',
    faq4a: '是的，这很常见。使用Kibana在Elastic Stack中进行深度日志分析，使用Grafana进行跨平台指标仪表盘和告警。你甚至可以在Grafana仪表盘中嵌入Kibana可视化。',
    
    faq5q: '定价和许可怎么样？',
    faq5a: '两者都提供开源版本。Grafana Enterprise添加企业功能、LDAP和支持。Kibana与Elastic Stack是开源的，但高级安全和机器学习需要Elastic许可证。两者都有云版本可用。',
    
    faq6q: '哪个有更好的Kubernetes集成？',
    faq6a: 'Grafana通过Prometheus、Loki和Tempo支持具有出色的Kubernetes集成。Kibana通过Filebeat和Metricbeat与Kubernetes集成，用于日志和指标收集到Elasticsearch。两者都与Kubernetes良好配合但服务于不同需求。',
    
    faq7q: '机器学习功能怎么样？',
    faq7a: 'Kibana包含内置机器学习，用于Elasticsearch数据上的异常检测、预测和不寻常术语检测。Grafana没有原生ML但与外部ML工具集成并可以可视化ML输出。',
    
    faq8q: '哪个更容易学习？',
    faq8a: 'Grafana通常更容易开始用于指标可视化。Kibana有更多功能，可能更复杂，特别是对于高级分析。两者都有广泛的文档和社区资源。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function GrafanaVsKibana({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsKibanaTitle}</h3>
      <p style={pStyle}>{ct.whatIsKibanaContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Kibana</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '多源可视化' : 'Multi-source visualization', isZh ? 'Elasticsearch分析' : 'Elasticsearch analytics'],
              [isZh ? '数据源支持' : 'Data Sources', '30+ 原生支持', isZh ? 'Elasticsearch优化' : 'Elasticsearch optimized'],
              [isZh ? '日志分析' : 'Log Analysis', isZh ? '基础' : 'Basic', isZh ? '强大' : 'Powerful'],
              [isZh ? '指标可视化' : 'Metrics Visualization', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '告警系统' : 'Alerting', isZh ? '灵活、多渠道' : 'Flexible, multi-channel', isZh ? 'Elasticsearch绑定' : 'Elasticsearch tied'],
              [isZh ? '机器学习' : 'Machine Learning', isZh ? '外部集成' : 'External integration', isZh ? '内置' : 'Built-in'],
              [isZh ? '全文搜索' : 'Full-text Search', isZh ? '有限' : 'Limited', isZh ? '强大' : 'Powerful'],
              [isZh ? '插件系统' : 'Plugin System', isZh ? '丰富' : 'Rich', isZh ? '良好' : 'Good'],
            ].map(([feature, grafana, kibana], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{grafana}</td>
                <td style={tdStyle}>{kibana}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Kibana</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '仪表盘' : 'Dashboards', isZh ? '高度可定制' : 'Highly customizable', isZh ? '丰富模板' : 'Rich templates'],
              [isZh ? '注释' : 'Annotations', isZh ? '支持多源' : 'Multi-source support', isZh ? 'Elasticsearch注释' : 'Elasticsearch annotations'],
              [isZh ? '变量/模板' : 'Variables/Templates', isZh ? '强大' : 'Powerful', isZh ? '支持' : 'Supported'],
              [isZh ? '团队管理' : 'Team Management', isZh ? '优秀' : 'Excellent', isZh ? '基础' : 'Basic'],
              [isZh ? '权限控制' : 'Permissions', isZh ? '细粒度' : 'Fine-grained', isZh ? '基于角色' : 'Role-based'],
              [isZh ? '报告' : 'Reporting', isZh ? '企业版' : 'Enterprise', isZh ? '内置' : 'Built-in'],
              [isZh ? 'Canvas' : 'Canvas', isZh ? '无' : 'No', isZh ? '支持' : 'Yes'],
              [isZh ? '地图可视化' : 'Maps', 'GeoJSON, Worldmap', isZh ? '地图可视化' : 'Maps visualization'],
            ].map(([cap, grafana, kibana], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{grafana}</td>
                <td style={tdStyle}>{kibana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.grafanaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Grafana Dashboard JSON Configuration
{
  "dashboard": {
    "title": "Application Monitoring",
    "tags": ["app", "monitoring"],
    "timezone": "browser",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} - {{endpoint}}",
            "refId": "A"
          }
        ],
        "gridPos": {
          "x": 0,
          "y": 0,
          "w": 12,
          "h": 8
        }
      },
      {
        "title": "Error Rate",
        "type": "stat",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100",
            "refId": "A"
          }
        ],
        "options": {
          "colorMode": "background",
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {"color": "green", "value": null},
              {"color": "yellow", "value": 1},
              {"color": "red", "value": 5}
            ]
          }
        }
      }
    ]
  },
  "overwrite": true
}

// Grafana Alert Rule (using Grafana 8+ alerting)
{
  "uid": "high-error-rate",
  "title": "High Error Rate Alert",
  "condition": "B",
  "data": [
    {
      "refId": "A",
      "queryType": "range",
      "datasourceUid": "prometheus",
      "model": {
        "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) * 100"
      }
    },
    {
      "refId": "B",
      "datasourceUid": "-100",
      "model": {
        "type": "reduce",
        "expression": "A",
        "reducer": "last"
      }
    }
  ],
  "noDataState": "NoData",
  "execErrState": "Alerting",
  "for": "5m"
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.kibanaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Kibana Dashboard Configuration (saved object)
{
  "type": "dashboard",
  "attributes": {
    "title": "Log Analytics Dashboard",
    "description": "Application log analysis",
    "panelsJSON": [
      {
        "id": "1",
        "type": "visualization",
        "gridData": {
          "x": 0,
          "y": 0,
          "w": 24,
          "h": 15
        },
        "panelRefName": "panel_0"
      },
      {
        "id": "2",
        "type": "search",
        "gridData": {
          "x": 0,
          "y": 15,
          "w": 24,
          "h": 15
        },
        "panelRefName": "panel_1"
      }
    ],
    "optionsJSON": {
      "useMargins": true,
      "syncColors": true
    }
  },
  "references": [
    {
      "name": "panel_0",
      "type": "visualization",
      "id": "error-rate-over-time"
    },
    {
      "name": "panel_1",
      "type": "search",
      "id": "error-logs-search"
    }
  ]
}

// Kibana Alerting Rule (using Kibana 7.13+ alerting)
{
  "alert": {
    "name": "High Error Rate",
    "schedule": {
      "interval": "5m"
    },
    "throttle": "10m",
    "params": {
      "aggType": "count",
      "termSize": 10,
      "thresholdComparator": ">",
      "timeWindowSize": 5,
      "timeWindowUnit": "m",
      "groupBy": "top",
      "threshold": [100],
      "index": ["logs-*"],
      "timeField": "@timestamp"
    },
    "actions": [
      {
        "group": "threshold_met",
        "id": "slack-webhook",
        "params": {
          "message": "Alert: Error count exceeded threshold"
        }
      }
    ]
  }
}`}</code></pre>

      {/* Data Sources */}
      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '类别' : 'Category'}</th>
              <th style={thStyle}>Grafana</th>
              <th style={thStyle}>Kibana</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '时序数据库' : 'Time Series DBs', 'Prometheus, InfluxDB, Graphite, TimescaleDB', isZh ? '通过Elasticsearch' : 'Via Elasticsearch'],
              [isZh ? '关系数据库' : 'Relational DBs', 'PostgreSQL, MySQL, MSSQL, Oracle', isZh ? '通过Elasticsearch JDBC' : 'Via Elasticsearch JDBC'],
              [isZh ? '云服务' : 'Cloud Services', 'AWS CloudWatch, Azure Monitor, GCP', isZh ? '有限' : 'Limited'],
              [isZh ? '日志系统' : 'Logging Systems', 'Loki, Elasticsearch', 'Elasticsearch (原生)'],
              [isZh ? '追踪系统' : 'Tracing Systems', 'Jaeger, Tempo, Zipkin', isZh ? 'APM集成' : 'APM integration'],
            ].map(([cat, grafana, kibana], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{grafana}</td>
                <td style={tdStyle}>{kibana}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alerting */}
      <h2 style={h2Style}>{ct.alertingTitle}</h2>
      <p style={pStyle}>{ct.alertingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>Grafana Alerting</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '支持30+数据源告警，灵活的告警规则，支持静默和抑制，丰富的通知渠道（Slack、PagerDuty、Email、Webhook等），支持告警分组和路由。' : 'Alerting for 30+ data sources, flexible alert rules, silencing and inhibition support, rich notification channels (Slack, PagerDuty, Email, Webhook, etc.), alert grouping and routing support.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>Kibana Alerting</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '针对Elasticsearch数据优化，支持阈值、异常检测和ML告警，与Elastic Stack安全集成，内置动作和Webhook支持。' : 'Optimized for Elasticsearch data, supports threshold, anomaly detection, and ML alerts, integrated with Elastic Stack security, built-in actions and webhook support.'}
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.grafanaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多源指标可视化' : 'Multi-source metrics visualization'}</li>
            <li>{isZh ? '混合基础设施监控' : 'Hybrid infrastructure monitoring'}</li>
            <li>{isZh ? 'Kubernetes和云原生' : 'Kubernetes and cloud-native'}</li>
            <li>{isZh ? '跨团队仪表盘共享' : 'Cross-team dashboard sharing'}</li>
            <li>{isZh ? '灵活告警系统' : 'Flexible alerting system'}</li>
            <li>{isZh ? 'IoT和边缘监控' : 'IoT and edge monitoring'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.kibanaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '深度日志分析' : 'Deep log analysis'}</li>
            <li>{isZh ? 'Elastic Stack用户' : 'Elastic Stack users'}</li>
            <li>{isZh ? '安全信息和事件管理' : 'Security information and event management'}</li>
            <li>{isZh ? '全文搜索' : 'Full-text search'}</li>
            <li>{isZh ? 'APM和分布式追踪' : 'APM and distributed tracing'}</li>
            <li>{isZh ? '机器学习分析' : 'Machine learning analytics'}</li>
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
        <a href={"/" + lang + "/tools/regex-tester"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Regex Tester</a> • {' '}
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
