'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Datadog vs New Relic: APM Platform Comparison',
    intro: 'Datadog and New Relic are two leading full-stack observability platforms. Both provide APM, infrastructure monitoring, log management, and distributed tracing. Datadog is known for its extensive integrations and cloud-native focus, while New Relic emphasizes ease of use and all-in-one observability. This comparison examines their features, pricing, and ideal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Datadog for extensive integrations, cloud-native environments, and advanced features. Choose New Relic for simplicity, transparent pricing, and quick time-to-value. Both offer comprehensive observability, but Datadog excels in integration breadth while New Relic excels in user experience and pricing clarity.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Datadog has 600+ integrations; New Relic has 500+ integrations',
    takeaway2: 'New Relic offers simpler, more transparent pricing',
    takeaway3: 'Datadog excels in Kubernetes and cloud-native monitoring',
    takeaway4: 'New Relic provides better ease of use and onboarding',
    takeaway5: 'Both support APM, infrastructure, logs, and distributed tracing',
    takeaway6: 'Datadog has more advanced security and CI/CD features',
    
    whatIsDatadogTitle: 'What is Datadog?',
    whatIsDatadogContent: 'Datadog is a monitoring and analytics platform for large-scale applications, launched in 2010. It provides infrastructure monitoring, APM, log management, distributed tracing, and security monitoring. Datadog is known for its extensive integration ecosystem, cloud-native architecture, and powerful visualization capabilities.',
    
    whatIsNewRelicTitle: 'What is New Relic?',
    whatIsNewRelicContent: 'New Relic is a full-stack observability platform founded in 2008. It offers APM, infrastructure monitoring, log management, distributed tracing, and real-time analytics. New Relic is recognized for its user-friendly interface, quick setup, and unified observability experience.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core observability capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Configuration Examples',
    codeExampleIntro: 'Agent and APM setup:',
    
    datadogExampleTitle: 'Datadog Configuration',
    newrelicExampleTitle: 'New Relic Configuration',
    
    pricingTitle: 'Pricing Models',
    pricingIntro: 'Pricing structure comparison:',
    
    integrationsTitle: 'Integration Ecosystem',
    integrationsIntro: 'Integration and ecosystem support:',
    
    useCasesTitle: 'Best Use Cases',
    datadogBestFor: 'Datadog is Best For:',
    newrelicBestFor: 'New Relic is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Datadog and New Relic provide comprehensive full-stack observability platforms. Datadog excels in cloud-native environments, extensive integrations, and advanced features like security monitoring and CI/CD visibility. New Relic stands out for its simplicity, transparent pricing, and excellent user experience. Choose Datadog for complex, cloud-native architectures requiring deep integration breadth. Choose New Relic for teams prioritizing ease of use, quick implementation, and predictable costs. Many organizations use both: New Relic for application teams and Datadog for infrastructure and DevOps teams.',
    
    faq1q: 'Which is more expensive?',
    faq1a: 'Datadog is generally more expensive, especially at scale. Datadog pricing is complex with per-host, per-ingest, and per-user pricing. New Relic offers simpler pricing based on data ingest (GB/day) with a free tier. For cost predictability, New Relic is often more budget-friendly.',
    
    faq2q: 'Which has better APM capabilities?',
    faq2a: 'Both have excellent APM capabilities. New Relic pioneered APM and has mature, user-friendly features. Datadog APM has caught up and offers powerful distributed tracing and service maps. For pure APM, New Relic may have a slight edge in usability, while Datadog excels in distributed tracing.',
    
    faq3q: 'Which is better for Kubernetes monitoring?',
    faq3a: 'Datadog has superior Kubernetes monitoring with automatic discovery, container metrics, and deep integration. New Relic also supports Kubernetes well but Datadog\'s cloud-native focus gives it an edge for complex containerized environments.',
    
    faq4q: 'Can I migrate from one to another?',
    faq4a: 'Yes, migration is possible but requires effort. You will need to replace agents, reconfigure dashboards, and adjust alert rules. Many organizations run both in parallel during migration. OpenTelemetry can help by providing vendor-neutral instrumentation.',
    
    faq5q: 'Which has better log management?',
    faq5a: 'Both offer strong log management with log-to-metrics correlation. Datadog has more advanced log processing features and better integration with its security platform. New Relic offers good log analytics with simpler pricing. For heavy log users, compare ingest costs carefully.',
    
    faq6q: 'What about AI/ML features?',
    faq6a: 'Both platforms have invested in AI/ML. Datadog offers Watchdog for anomaly detection and Bits for AI assistance. New Relic has NRQL AI for natural language queries and AI-assisted alerting. Datadog has more mature ML features, while New Relic makes AI more accessible.',
    
    faq7q: 'Which has better alerting?',
    faq7a: 'Both have robust alerting with multi-condition alerts, anomaly detection, and numerous integrations. Datadog offers more sophisticated alerting with machine learning and composite alerts. New Relic provides easier alert setup with good out-of-box configurations.',
    
    faq8q: 'Which is better for small teams?',
    faq8a: 'New Relic is often better for small teams due to simpler pricing, easier onboarding, and quick time-to-value. The free tier and straightforward cost structure make it accessible. Datadog can be overwhelming and expensive for smaller organizations.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Datadog vs New Relic：APM平台对比',
    intro: 'Datadog和New Relic是两个领先的全栈可观测性平台。两者都提供APM、基础设施监控、日志管理和分布式追踪。Datadog以其广泛的集成和云原生关注而闻名，而New Relic强调易用性和一体化可观测性。本比较考察它们的功能、定价和理想用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为广泛的集成、云原生环境和高级功能选择Datadog。为简单性、透明定价和快速价值实现选择New Relic。两者都提供全面的可观测性，但Datadog在集成广度方面表现出色，而New Relic在用户体验和定价清晰度方面表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Datadog有600+集成；New Relic有500+集成',
    takeaway2: 'New Relic提供更简单、更透明的定价',
    takeaway3: 'Datadog在Kubernetes和云原生监控方面表现出色',
    takeaway4: 'New Relic提供更好的易用性和入门体验',
    takeaway5: '两者都支持APM、基础设施、日志和分布式追踪',
    takeaway6: 'Datadog有更高级的安全和CI/CD功能',
    
    whatIsDatadogTitle: '什么是Datadog？',
    whatIsDatadogContent: 'Datadog是大规模应用的监控和分析平台，2010年推出。它提供基础设施监控、APM、日志管理、分布式追踪和安全监控。Datadog以其广泛的集成生态系统、云原生架构和强大的可视化能力而闻名。',
    
    whatIsNewRelicTitle: '什么是New Relic？',
    whatIsNewRelicContent: 'New Relic是成立于2008年的全栈可观测性平台。它提供APM、基础设施监控、日志管理、分布式追踪和实时分析。New Relic以其用户友好的界面、快速设置和统一的可观测性体验而著称。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心可观测性能力：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '配置示例',
    codeExampleIntro: '代理和APM设置：',
    
    datadogExampleTitle: 'Datadog配置',
    newrelicExampleTitle: 'New Relic配置',
    
    pricingTitle: '定价模型',
    pricingIntro: '定价结构对比：',
    
    integrationsTitle: '集成生态',
    integrationsIntro: '集成和生态系统支持：',
    
    useCasesTitle: '最佳用例',
    datadogBestFor: 'Datadog最适合：',
    newrelicBestFor: 'New Relic最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Datadog和New Relic都提供全面的全栈可观测性平台。Datadog在云原生环境、广泛集成和高级功能（如安全监控和CI/CD可见性）方面表现出色。New Relic以其简单性、透明定价和优秀的用户体验脱颖而出。为需要深度集成广度的复杂云原生架构选择Datadog。为优先考虑易用性、快速实施和可预测成本的团队选择New Relic。许多组织同时使用两者：New Relic用于应用团队，Datadog用于基础设施和DevOps团队。',
    
    faq1q: '哪个更贵？',
    faq1a: 'Datadog通常更贵，特别是在大规模情况下。Datadog定价复杂，包括按主机、按摄入量和按用户定价。New Relic基于数据摄入（GB/天）提供更简单的定价，并有免费层。对于成本可预测性，New Relic通常更经济。',
    
    faq2q: '哪个APM能力更好？',
    faq2a: '两者都有优秀的APM能力。New Relic开创了APM，具有成熟、用户友好的功能。Datadog APM已经赶上，提供强大的分布式追踪和服务地图。对于纯APM，New Relic在易用性方面可能略有优势，而Datadog在分布式追踪方面表现出色。',
    
    faq3q: '哪个更适合Kubernetes监控？',
    faq3a: 'Datadog具有更优越的Kubernetes监控，具有自动发现、容器指标和深度集成。New Relic也很好地支持Kubernetes，但Datadog的云原生关注使其在复杂容器化环境中具有优势。',
    
    faq4q: '我可以从一个迁移到另一个吗？',
    faq4a: '是的，迁移是可能的，但需要努力。你需要替换代理、重新配置仪表盘和调整告警规则。许多组织在迁移期间并行运行两者。OpenTelemetry可以通过提供供应商中立的检测来帮助。',
    
    faq5q: '哪个日志管理更好？',
    faq5a: '两者都提供强大的日志管理和日志到指标的关联。Datadog具有更高级的日志处理功能，并与安全平台更好地集成。New Relic提供良好的日志分析和更简单的定价。对于重度日志用户，仔细比较摄入成本。',
    
    faq6q: 'AI/ML功能怎么样？',
    faq6a: '两个平台都投资了AI/ML。Datadog提供Watchdog用于异常检测和Bits用于AI辅助。New Relic有NRQL AI用于自然语言查询和AI辅助告警。Datadog有更成熟的ML功能，而New Relic使AI更易于访问。',
    
    faq7q: '哪个告警更好？',
    faq7a: '两者都有强大的告警功能，支持多条件告警、异常检测和众多集成。Datadog提供更复杂的告警，具有机器学习和复合告警。New Relic提供更容易的告警设置和良好的开箱即用配置。',
    
    faq8q: '哪个更适合小团队？',
    faq8a: 'New Relic通常更适合小团队，因为定价更简单、入门更容易、价值实现更快。免费层和直接的成本结构使其易于访问。Datadog对较小的组织来说可能令人不知所措且昂贵。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DatadogVsNewRelic({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsDatadogTitle}</h3>
      <p style={pStyle}>{ct.whatIsDatadogContent}</p>

      <h3 style={h3Style}>{ct.whatIsNewRelicTitle}</h3>
      <p style={pStyle}>{ct.whatIsNewRelicContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Datadog</th>
              <th style={thStyle}>New Relic</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'APM' : 'APM', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '基础设施监控' : 'Infrastructure Monitoring', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '日志管理' : 'Log Management', isZh ? '强大' : 'Powerful', isZh ? '强大' : 'Powerful'],
              [isZh ? '分布式追踪' : 'Distributed Tracing', isZh ? '优秀' : 'Excellent', isZh ? '优秀' : 'Excellent'],
              [isZh ? '易用性' : 'Ease of Use', isZh ? '中等' : 'Medium', isZh ? '优秀' : 'Excellent'],
              [isZh ? '集成数量' : 'Integrations', '600+', '500+'],
              [isZh ? 'Kubernetes监控' : 'Kubernetes Monitoring', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '安全监控' : 'Security Monitoring', isZh ? '内置CSM' : 'Built-in CSM', isZh ? '有限' : 'Limited'],
            ].map(([feature, datadog, newrelic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{datadog}</td>
                <td style={tdStyle}>{newrelic}</td>
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
              <th style={thStyle}>Datadog</th>
              <th style={thStyle}>New Relic</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '服务地图' : 'Service Maps', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '实时分析' : 'Real-time Analytics', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '异常检测' : 'Anomaly Detection', 'Watchdog AI', 'AI-assisted'],
              [isZh ? '浏览器监控' : 'RUM', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '合成监控' : 'Synthetic Monitoring', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? 'CI/CD集成' : 'CI/CD Integration', isZh ? '深度' : 'Deep', isZh ? '基础' : 'Basic'],
              [isZh ? 'SLO/SLI跟踪' : 'SLO/SLI Tracking', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '笔记本/报告' : 'Notebooks/Reporting', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
            ].map(([cap, datadog, newrelic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{datadog}</td>
                <td style={tdStyle}>{newrelic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#632ca6' }}>{ct.datadogExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Datadog Agent Installation (Linux)
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=your-api-key \\
  DD_SITE="datadoghq.com" bash -c "$(curl -L \\
  https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

# Docker Installation
docker run -d --name dd-agent \\
  -v /var/run/docker.sock:/var/run/docker.sock:ro \\
  -v /proc/:/host/proc/:ro \\
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \\
  -e DD_API_KEY=your-api-key \\
  -e DD_SITE="datadoghq.com" \\
  gcr.io/datadoghq/agent:7

# Datadog APM (Node.js)
const tracer = require('dd-trace').init({
  service: 'my-service',
  env: 'production',
  logInjection: true,
  runtimeMetrics: true
});

// Automatic instrumentation
tracer.use('express', { service: 'my-express-app' });
tracer.use('pg', { service: 'my-postgres-db' });

// Custom spans
const span = tracer.startSpan('custom.operation');
span.setTag('custom.tag', 'value');
span.finish();

# Kubernetes Datadog Agent (Helm)
helm repo add datadog https://helm.datadoghq.com
helm install datadog-operator datadog/datadog-operator

# datadog-values.yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  site: datadoghq.com
  apm:
    enabled: true
  logs:
    enabled: true
  processAgent:
    enabled: true`}</code></pre>

      <h3 style={{ ...h3Style, color: '#008c99' }}>{ct.newrelicExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# New Relic Infrastructure Agent Installation (Linux)
curl -Ls https://download.newrelic.com/infrastructure_agent/gpg/newrelic-infra.gpg | \\
  sudo apt-key add -
echo "deb [arch=amd64] https://download.newrelic.com/infrastructure_agent/linux/apt \\
  $(lsb_release -s -c) main" | sudo tee /etc/apt/sources.list.d/newrelic-infra.list
sudo apt-get update
sudo apt-get install newrelic-infra

# Configure license key
sudo echo "license_key: YOUR_LICENSE_KEY" > /etc/newrelic-infra.yml
sudo systemctl start newrelic-infra

# New Relic APM (Node.js)
const newrelic = require('newrelic');

// Automatic instrumentation - add at top of app
// newrelic.js configuration
exports.config = {
  app_name: ['My Application', 'Production'],
  license_key: 'your-license-key',
  logging: {
    level: 'info'
  },
  distributed_tracing: {
    enabled: true
  },
  application_logging: {
    enabled: true
  }
};

// Custom instrumentation
newrelic.startBackgroundTransaction('my-background-task', () => {
  const segment = newrelic.getTransaction();
  // do work
  segment.end();
});

// Record custom metrics
newrelic.recordMetric('Custom/MyMetric', 42);
newrelic.incrementMetric('Custom/MyCounter', 1);

# Kubernetes New Relic (Helm)
helm repo add newrelic https://helm-charts.newrelic.com
helm install nri-bundle newrelic/nri-bundle \\
  --set global.licenseKey=YOUR_LICENSE_KEY \\
  --set global.cluster=my-k8s-cluster \\
  --set newrelic-infrastructure.privileged=true \\
  --set kube-state-metrics.enabled=true \\
  --set prometheus.enabled=true \\
  --set logging.enabled=true`}</code></pre>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Datadog</th>
              <th style={thStyle}>New Relic</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '定价模型' : 'Pricing Model', isZh ? '按主机/用户/摄入' : 'Per host/user/ingest', isZh ? '按数据摄入' : 'Per data ingest'],
              [isZh ? '免费层' : 'Free Tier', isZh ? '有限' : 'Limited', isZh ? '100 GB/月' : '100 GB/month'],
              [isZh ? '透明度' : 'Transparency', isZh ? '复杂' : 'Complex', isZh ? '简单' : 'Simple'],
              [isZh ? 'APM定价' : 'APM Pricing', '$31/月/主机（年付）', '$0.30/GB摄入'],
              [isZh ? '日志定价' : 'Log Pricing', '$0.10/GB摄入', '$0.30/GB摄入'],
              [isZh ? '成本可预测性' : 'Cost Predictability', isZh ? '中等' : 'Medium', isZh ? '高' : 'High'],
            ].map(([aspect, datadog, newrelic], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={tdStyle}>{datadog}</td>
                <td style={tdStyle}>{newrelic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.integrationsTitle}</h2>
      <p style={pStyle}>{ct.integrationsIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #632ca6' }}>
          <strong style={{ color: '#632ca6' }}>Datadog Integrations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '600+官方集成，包括云服务（AWS、GCP、Azure）、容器平台（Docker、Kubernetes）、数据库、消息队列、CI/CD工具。强大的API和自定义集成能力。自动服务发现。' : '600+ official integrations including cloud services (AWS, GCP, Azure), container platforms (Docker, Kubernetes), databases, message queues, CI/CD tools. Powerful API and custom integration capabilities. Automatic service discovery.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #008c99' }}>
          <strong style={{ color: '#008c99' }}>New Relic Integrations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '500+集成，覆盖主要云服务、容器、数据库和框架。Flex集成允许自定义数据收集。OpenTelemetry原生支持。良好的第三方市场生态。' : '500+ integrations covering major cloud services, containers, databases, and frameworks. Flex integration allows custom data collection. OpenTelemetry native support. Good third-party marketplace ecosystem.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #632ca6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#632ca6' }}>{ct.datadogBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '云原生和Kubernetes环境' : 'Cloud-native and Kubernetes environments'}</li>
            <li>{isZh ? '需要广泛集成的复杂架构' : 'Complex architectures requiring extensive integrations'}</li>
            <li>{isZh ? '安全和合规监控' : 'Security and compliance monitoring'}</li>
            <li>{isZh ? 'CI/CD管道可见性' : 'CI/CD pipeline visibility'}</li>
            <li>{isZh ? '大规模微服务部署' : 'Large-scale microservices deployments'}</li>
            <li>{isZh ? '需要高级分析功能' : 'Need for advanced analytics features'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #008c99' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#008c99' }}>{ct.newrelicBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '优先考虑易用性的团队' : 'Teams prioritizing ease of use'}</li>
            <li>{isZh ? '需要快速实现价值' : 'Need for quick time-to-value'}</li>
            <li>{isZh ? '预算敏感的组织' : 'Budget-conscious organizations'}</li>
            <li>{isZh ? '应用开发者为中心的监控' : 'Application developer-focused monitoring'}</li>
            <li>{isZh ? '中小型部署' : 'Small to medium deployments'}</li>
            <li>{isZh ? '需要透明的定价' : 'Need for transparent pricing'}</li>
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
