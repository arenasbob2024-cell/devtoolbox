'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Elastic Stack vs Splunk: Log Management Platform Comparison',
    intro: 'Elastic Stack (ELK) and Splunk are two leading platforms for log management, search, and analytics. While both handle massive log volumes, they differ significantly in architecture, pricing, and use cases. This comparison examines their capabilities, costs, and ideal scenarios.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Elastic Stack is open-source with lower total cost, ideal for teams comfortable managing infrastructure. Splunk offers enterprise features, better support, and easier deployment at a premium price. Choose Elastic for cost-conscious teams and open-source flexibility. Choose Splunk for enterprise requirements, compliance needs, and when support is critical.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Elastic Stack is open-source; Splunk is proprietary with licensing costs',
    takeaway2: 'Splunk has superior search language and enterprise features',
    takeaway3: 'Elastic Stack requires more operational expertise',
    takeaway4: 'Both handle petabyte-scale log volumes',
    takeaway5: 'Splunk includes built-in security analytics and SIEM',
    takeaway6: 'Elastic Stack has better cloud-native integration',
    
    whatIsElasticTitle: 'What is Elastic Stack?',
    whatIsElasticContent: 'Elastic Stack (formerly ELK Stack) is an open-source suite comprising Elasticsearch, Logstash, Kibana, and Beats. Elasticsearch provides distributed search and analytics, Logstash handles data ingestion, Kibana offers visualization, and Beats are lightweight data shippers. Managed by Elastic, it is widely adopted for log analytics, monitoring, and search use cases.',
    
    whatIsSplunkTitle: 'What is Splunk?',
    whatIsSplunkContent: 'Splunk is a proprietary platform for searching, monitoring, and analyzing machine-generated data. Founded in 2003, it pioneered log analytics for enterprises. Splunk offers comprehensive solutions for IT operations, security (SIEM), and business analytics. It is known for its powerful search language and enterprise-grade features.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Search Query Examples',
    codeExampleIntro: 'Log search syntax comparison:',
    
    elasticExampleTitle: 'Elasticsearch Query',
    splunkExampleTitle: 'Splunk SPL Query',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost structure differences:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'How each platform can be deployed:',
    
    useCasesTitle: 'Best Use Cases',
    elasticBestFor: 'Elastic Stack is Best For:',
    splunkBestFor: 'Splunk is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Elastic Stack and Splunk serve overlapping but distinct markets. Elastic Stack excels for cost-conscious organizations, DevOps teams, and cloud-native environments where open-source flexibility is valued. Splunk dominates in enterprise environments requiring compliance, security analytics, and vendor support. Many organizations use both: Elastic for development logs and Splunk for security and compliance. The choice ultimately depends on budget, expertise, and specific requirements.',
    
    faq1q: 'Can I migrate from Splunk to Elastic Stack?',
    faq1a: 'Yes, migration is possible but requires effort. Tools like Elastic Splunk Connector help migrate data and dashboards. The main challenges are query language differences and retraining teams. Plan for 3-6 months for a complete migration.',
    
    faq2q: 'Which is better for SIEM?',
    faq2a: 'Splunk has a more mature SIEM offering with pre-built detection rules, compliance frameworks, and case management. Elastic Security is improving rapidly but requires more configuration. For enterprise SIEM, Splunk has the edge.',
    
    faq3q: 'How do they handle log volume scaling?',
    faq3a: 'Both scale to petabytes. Elastic Stack scales horizontally by adding nodes. Splunk scales with indexers and search heads. Elastic requires more operational expertise; Splunk is easier to scale but costs increase with volume.',
    
    faq4q: 'What about real-time alerting?',
    faq4a: 'Both support real-time alerting. Splunk has more mature alerting with complex conditions and actions. Elastic Stack alerting (via Kibana or ElastAlert) is capable but less feature-rich. Both integrate with PagerDuty, Slack, and email.',
    
    faq5q: 'Which has better Kubernetes integration?',
    faq5a: 'Elastic Stack has excellent Kubernetes integration with Elastic Agent, Filebeat, and Metricbeat DaemonSets. Splunk integrates via Splunk Connect for Kubernetes. Both work well, but Elastic is more cloud-native by design.',
    
    faq6q: 'How does licensing work?',
    faq6a: 'Elastic Stack core is free under SSPL/Elastic License. Elastic Cloud and Enterprise features require subscription. Splunk uses ingest volume and/or workload pricing. Splunk can become very expensive at scale (often 10x+ Elastic cost).',
    
    faq7q: 'What about machine learning capabilities?',
    faq7a: 'Both offer ML. Splunk ML is more mature with built-in algorithms and the Machine Learning Toolkit. Elastic ML requires Platinum/Enterprise license but integrates well with anomaly detection and forecasting.',
    
    faq8q: 'Which is easier to learn?',
    faq8a: 'Elastic Stack uses Lucene query syntax and Kibana KQL, which are intuitive for developers. Splunk SPL is more powerful but has steeper learning curve. Basic operations are similar in difficulty; advanced Splunk requires more training.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Elastic Stack vs Splunk：日志管理平台对比',
    intro: 'Elastic Stack (ELK) 和 Splunk 是两个领先的日志管理、搜索和分析平台。虽然两者都能处理海量日志，但在架构、定价和用例上有显著差异。本比较考察它们的功能、成本和理想场景。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Elastic Stack 是开源的，总成本更低，适合能够管理基础设施的团队。Splunk 提供企业功能、更好的支持和更简单的部署，但价格昂贵。为注重成本的团队和开源灵活性选择 Elastic。为企业需求、合规要求和关键支持选择 Splunk。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Elastic Stack 是开源的；Splunk 是专有的，有许可成本',
    takeaway2: 'Splunk 有更优越的搜索语言和企业功能',
    takeaway3: 'Elastic Stack 需要更多运维专业知识',
    takeaway4: '两者都能处理 PB 级日志量',
    takeaway5: 'Splunk 包括内置安全分析和 SIEM',
    takeaway6: 'Elastic Stack 有更好的云原生集成',
    
    whatIsElasticTitle: '什么是 Elastic Stack？',
    whatIsElasticContent: 'Elastic Stack（原 ELK Stack）是一个开源套件，包括 Elasticsearch、Logstash、Kibana 和 Beats。Elasticsearch 提供分布式搜索和分析，Logstash 处理数据摄入，Kibana 提供可视化，Beats 是轻量级数据发送器。由 Elastic 管理，广泛用于日志分析、监控和搜索用例。',
    
    whatIsSplunkTitle: '什么是 Splunk？',
    whatIsSplunkContent: 'Splunk 是一个专有平台，用于搜索、监控和分析机器生成的数据。成立于 2003 年，它是企业日志分析的先驱。Splunk 为 IT 运维、安全（SIEM）和业务分析提供全面的解决方案。以其强大的搜索语言和企业级功能而闻名。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '搜索查询示例',
    codeExampleIntro: '日志搜索语法比较：',
    
    elasticExampleTitle: 'Elasticsearch 查询',
    splunkExampleTitle: 'Splunk SPL 查询',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本结构差异：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '各平台部署方式：',
    
    useCasesTitle: '最佳用例',
    elasticBestFor: 'Elastic Stack 最适合：',
    splunkBestFor: 'Splunk 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Elastic Stack 和 Splunk 服务于重叠但不同的市场。Elastic Stack 在注重成本的组织、DevOps 团队和云原生环境中表现出色，重视开源灵活性。Splunk 在需要合规、安全分析和供应商支持的企业环境中占主导地位。许多组织同时使用两者：Elastic 用于开发日志，Splunk 用于安全和合规。最终选择取决于预算、专业知识和具体需求。',
    
    faq1q: '我可以从 Splunk 迁移到 Elastic Stack 吗？',
    faq1a: '是的，迁移是可能的但需要努力。Elastic Splunk Connector 等工具帮助迁移数据和仪表盘。主要挑战是查询语言差异和团队再培训。计划 3-6 个月完成完整迁移。',
    
    faq2q: '哪个更适合 SIEM？',
    faq2a: 'Splunk 有更成熟的 SIEM 产品，具有预构建的检测规则、合规框架和案例管理。Elastic Security 正在快速改进但需要更多配置。对于企业 SIEM，Splunk 有优势。',
    
    faq3q: '它们如何处理日志量扩展？',
    faq3a: '两者都能扩展到 PB 级。Elastic Stack 通过添加节点水平扩展。Splunk 通过索引器和搜索头扩展。Elastic 需要更多运维专业知识；Splunk 更容易扩展但成本随量增加。',
    
    faq4q: '实时告警怎么样？',
    faq4a: '两者都支持实时告警。Splunk 有更成熟的告警，具有复杂条件和操作。Elastic Stack 告警（通过 Kibana 或 ElastAlert）有能力但功能较少。两者都集成 PagerDuty、Slack 和电子邮件。',
    
    faq5q: '哪个有更好的 Kubernetes 集成？',
    faq5a: 'Elastic Stack 通过 Elastic Agent、Filebeat 和 Metricbeat DaemonSets 有出色的 Kubernetes 集成。Splunk 通过 Splunk Connect for Kubernetes 集成。两者都很好，但 Elastic 更具云原生设计。',
    
    faq6q: '许可如何工作？',
    faq6a: 'Elastic Stack 核心在 SSPL/Elastic 许可下免费。Elastic Cloud 和企业功能需要订阅。Splunk 使用摄入量和/或工作负载定价。Splunk 在大规模时可能变得非常昂贵（通常是 Elastic 成本的 10 倍以上）。',
    
    faq7q: '机器学习功能怎么样？',
    faq7a: '两者都提供 ML。Splunk ML 更成熟，具有内置算法和机器学习工具包。Elastic ML 需要 Platinum/Enterprise 许可证但与异常检测和预测集成良好。',
    
    faq8q: '哪个更容易学习？',
    faq8a: 'Elastic Stack 使用 Lucene 查询语法和 Kibana KQL，对开发人员直观。Splunk SPL 更强大但学习曲线更陡。基本操作难度相似；高级 Splunk 需要更多培训。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function ElasticStackVsSplunk({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsElasticTitle}</h3>
      <p style={pStyle}>{ct.whatIsElasticContent}</p>

      <h3 style={h3Style}>{ct.whatIsSplunkTitle}</h3>
      <p style={pStyle}>{ct.whatIsSplunkContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Elastic Stack</th>
              <th style={thStyle}>Splunk</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '许可证' : 'License', isZh ? '开源 (SSPL)' : 'Open Source (SSPL)', isZh ? '专有' : 'Proprietary'],
              [isZh ? '搜索语言' : 'Search Language', 'Lucene / KQL', 'SPL (Splunk Processing Language)'],
              [isZh ? '数据摄入' : 'Data Ingestion', 'Logstash, Beats, Elastic Agent', isZh ? '通用转发器' : 'Universal Forwarder'],
              [isZh ? '可视化' : 'Visualization', 'Kibana', 'Splunk Dashboards'],
              [isZh ? '企业功能' : 'Enterprise Features', isZh ? '需订阅' : 'Requires subscription', isZh ? '内置' : 'Built-in'],
              [isZh ? 'SIEM' : 'SIEM', 'Elastic Security', 'Splunk Enterprise Security'],
              [isZh ? '支持' : 'Support', isZh ? '社区 + 企业' : 'Community + Enterprise', isZh ? '企业级' : 'Enterprise-grade'],
              [isZh ? '云服务' : 'Cloud Service', 'Elastic Cloud', 'Splunk Cloud'],
            ].map(([feature, elastic, splunk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{elastic}</td>
                <td style={tdStyle}>{splunk}</td>
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
              <th style={thStyle}>Elastic Stack</th>
              <th style={thStyle}>Splunk</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '实时搜索' : 'Real-time Search', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
              [isZh ? '分布式架构' : 'Distributed Architecture', isZh ? '原生分布式' : 'Native distributed', isZh ? '索引器集群' : 'Indexer clusters'],
              [isZh ? '机器学习' : 'Machine Learning', isZh ? '需企业许可' : 'Enterprise license', isZh ? '内置工具包' : 'Built-in toolkit'],
              [isZh ? '告警' : 'Alerting', isZh ? 'Kibana / ElastAlert' : 'Kibana / ElastAlert', isZh ? '高级告警' : 'Advanced alerting'],
              [isZh ? '合规报告' : 'Compliance Reporting', isZh ? '需配置' : 'Requires setup', isZh ? '预构建框架' : 'Pre-built frameworks'],
              [isZh ? 'API' : 'API', 'RESTful API', 'RESTful + SDK'],
              [isZh ? '认证' : 'Authentication', 'Native + SSO', 'Native + SSO + RBAC'],
              [isZh ? '可观测性' : 'Observability', 'APM, Logs, Metrics', isZh ? 'IT 服务分析' : 'IT Service Intelligence'],
            ].map(([cap, elastic, splunk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{elastic}</td>
                <td style={tdStyle}>{splunk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f46800' }}>{ct.elasticExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Elasticsearch Query DSL - Error Analysis
GET logs-*/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "level": "ERROR" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ]
    }
  },
  "aggs": {
    "error_types": {
      "terms": { "field": "error.type.keyword", "size": 10 }
    },
    "by_service": {
      "terms": { "field": "service.name.keyword", "size": 5 },
      "aggs": {
        "avg_response_time": {
          "avg": { "field": "response_time_ms" }
        }
      }
    }
  },
  "size": 100
}

// Kibana KQL (Kibana Query Language)
level: "ERROR" AND @timestamp >= now-1h AND service.name: "api-gateway"`}</code></pre>

      <h3 style={{ ...h3Style, color: '#00bfb3' }}>{ct.splunkExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Splunk SPL (Search Processing Language) - Error Analysis
index=logs level=ERROR earliest=-1h
| stats count by error.type, service.name
| sort -count
| head 10

# Advanced SPL with timechart and anomaly detection
index=logs earliest=-24h
| timechart span=5m count by service.name
| anomalylayer("api-gateway", "payment-service", "user-service")

# SPL for SIEM - Failed login detection
index=security action=login status=failed
| stats count by src_ip, user
| where count > 5
| table _time, src_ip, user, count
| sort -count`}</code></pre>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f46800' }}>
          <strong style={{ color: '#f46800' }}>Elastic Stack Pricing</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '核心免费（SSPL 许可）。Elastic Cloud 按资源使用计费，约 $95/月起。企业功能需订阅。自托管免费但需运维成本。' : 'Core is free (SSPL license). Elastic Cloud priced by resource usage, starting ~$95/month. Enterprise features require subscription. Self-hosted is free but requires operational cost.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00bfb3' }}>
          <strong style={{ color: '#00bfb3' }}>Splunk Pricing</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '按摄入量或工作负载计费。企业版起价约 $2,000/年。云版按数据量收费。大规模部署成本可达数十万美元/年。' : 'Priced by ingest volume or workload. Enterprise starts ~$2,000/year. Cloud charges by data volume. Large deployments can cost hundreds of thousands per year.'}
          </p>
        </div>
      </div>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '部署方式' : 'Deployment'}</th>
              <th style={thStyle}>Elastic Stack</th>
              <th style={thStyle}>Splunk</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自托管' : 'Self-hosted', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '云托管' : 'Managed Cloud', 'Elastic Cloud (AWS/GCP/Azure)', 'Splunk Cloud'],
              [isZh ? 'Kubernetes' : 'Kubernetes', 'ECK Operator, Helm Charts', 'Splunk Operator'],
              [isZh ? 'Docker' : 'Docker', 'Official Images', 'Official Images'],
              [isZh ? '混合部署' : 'Hybrid', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
            ].map(([dep, elastic, splunk], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{dep}</td>
                <td style={tdStyle}>{elastic}</td>
                <td style={tdStyle}>{splunk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f46800' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f46800' }}>{ct.elasticBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '注重成本的团队' : 'Cost-conscious teams'}</li>
            <li>{isZh ? 'DevOps 和云原生' : 'DevOps and cloud-native'}</li>
            <li>{isZh ? '开源偏好' : 'Open-source preference'}</li>
            <li>{isZh ? 'Kubernetes 环境' : 'Kubernetes environments'}</li>
            <li>{isZh ? '应用日志分析' : 'Application log analysis'}</li>
            <li>{isZh ? '中小规模部署' : 'Small to medium deployments'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00bfb3' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00bfb3' }}>{ct.splunkBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业合规需求' : 'Enterprise compliance'}</li>
            <li>{isZh ? '安全信息和事件管理' : 'Security SIEM'}</li>
            <li>{isZh ? '关键任务支持' : 'Mission-critical support'}</li>
            <li>{isZh ? '复杂企业环境' : 'Complex enterprise'}</li>
            <li>{isZh ? '预构建分析解决方案' : 'Pre-built analytics solutions'}</li>
            <li>{isZh ? '需要供应商支持' : 'Vendor support required'}</li>
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
