'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Sentry vs Datadog: Error Tracking vs Full-Stack Monitoring',
    intro: 'Sentry and Datadog are two leading observability platforms with different strengths. Sentry excels at error tracking and performance monitoring for applications, while Datadog offers comprehensive infrastructure monitoring, log management, and APM. This comparison helps you choose the right tool for your observability needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Sentry if your primary focus is application error tracking, release monitoring, and developer-centric debugging. Choose Datadog if you need full-stack observability including infrastructure, logs, metrics, and APM in a unified platform. Sentry is more affordable for small teams, while Datadog offers enterprise-scale features at a higher price point.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Sentry specializes in error tracking with superior stack trace analysis and context',
    takeaway2: 'Datadog provides unified metrics, logs, and traces in a single platform',
    takeaway3: 'Sentry offers better developer experience for debugging application errors',
    takeaway4: 'Datadog excels at infrastructure and cloud service monitoring',
    takeaway5: 'Sentry pricing is more predictable; Datadog can become expensive at scale',
    takeaway6: 'Both offer excellent integrations with popular frameworks and cloud services',
    
    whatIsSentryTitle: 'What is Sentry?',
    whatIsSentryContent: 'Sentry is an application monitoring platform focused on error tracking and performance monitoring. Founded in 2012, it helps developers identify, prioritize, and fix errors in real-time. Sentry provides detailed context for every error including stack traces, breadcrumbs, user environment, and release information.',
    
    whatIsDatadogTitle: 'What is Datadog?',
    whatIsDatadogContent: 'Datadog is a comprehensive observability platform founded in 2010. It combines infrastructure monitoring, application performance monitoring (APM), log management, and security monitoring in a unified platform. Datadog is widely used by enterprises for full-stack observability across cloud environments.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities and focus areas:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Integration examples for both platforms:',
    
    sentryExampleTitle: 'Sentry Integration',
    datadogExampleTitle: 'Datadog Integration',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost structure and pricing models:',
    
    useCasesTitle: 'Best Use Cases',
    sentryBestFor: 'Sentry is Best For:',
    datadogBestFor: 'Datadog is Best For:',
    
    migrationTitle: 'Migration Considerations',
    migrationIntro: 'Things to consider when switching platforms:',
    
    whenToUseTitle: 'When to Choose Each Platform',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Sentry and Datadog serve different but overlapping needs. For development teams focused on application quality and error resolution, Sentry provides an unmatched developer experience at a reasonable price. For organizations needing comprehensive infrastructure visibility alongside application monitoring, Datadog offers an integrated solution at enterprise scale. Many teams use both: Sentry for deep error analysis and Datadog for infrastructure and operational metrics.',
    
    faq1q: 'Can Sentry replace Datadog entirely?',
    faq1a: 'For application error tracking, Sentry can replace Datadog. However, if you need infrastructure monitoring, log aggregation, and comprehensive observability, Datadog provides a more complete solution. Many teams use Sentry for errors and a simpler tool for basic infrastructure monitoring.',
    
    faq2q: 'Which tool has better alerting capabilities?',
    faq2a: 'Datadog offers more sophisticated alerting with composite alerts, anomaly detection, and forecasting. Sentry provides solid alerting for error-based events but is less flexible for metric-based alerts. For complex alerting needs, Datadog has the advantage.',
    
    faq3q: 'How do they compare for frontend monitoring?',
    faq3a: 'Sentry has excellent frontend SDKs with detailed browser error tracking, session replay, and user feedback. Datadog also offers Real User Monitoring (RUM) but Sentry generally provides better context for debugging frontend issues.',
    
    faq4q: 'Is there a free tier available?',
    faq4a: 'Yes, both offer free tiers. Sentry provides a generous free tier for individual developers and small teams with 5,000 errors/month. Datadog offers a 14-day free trial and a free tier for 1 host with limited features.',
    
    faq5q: 'Which is better for microservices?',
    faq5a: 'Datadog excels at microservices with distributed tracing, service maps, and infrastructure correlation. Sentry supports distributed tracing but focuses on error flows. For complex microservices architectures, Datadog provides better operational visibility.',
    
    faq6q: 'How is the learning curve for each?',
    faq6a: 'Sentry has a gentler learning curve with a focused feature set. Developers can become productive quickly. Datadog has more features to learn but provides comprehensive documentation. Both offer good onboarding experiences.',
    
    faq7q: 'Can I use both tools together?',
    faq7a: 'Yes, many organizations use both together. Sentry handles application error tracking while Datadog manages infrastructure and operational monitoring. Integration between them is possible through webhooks and APIs.',
    
    faq8q: 'Which has better Kubernetes integration?',
    faq8a: 'Datadog has superior Kubernetes integration with automatic discovery, cluster monitoring, and container metrics out of the box. Sentry integrates well with Kubernetes for application monitoring but does not provide infrastructure-level visibility.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Sentry vs Datadog：错误追踪 vs 全栈监控',
    intro: 'Sentry和Datadog是两个领先的 observability 平台，各有不同优势。Sentry在应用程序错误追踪和性能监控方面表现出色，而Datadog提供全面的基础设施监控、日志管理和APM。本比较帮助你根据 observability 需求选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '如果你主要关注应用程序错误追踪、发布监控和以开发者为中心的调试，选择Sentry。如果你需要在统一平台中获得全栈 observability 包括基础设施、日志、指标和APM，选择Datadog。Sentry对小团队更实惠，而Datadog以更高的价格提供企业级功能。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Sentry专注于错误追踪，提供卓越的堆栈跟踪分析和上下文',
    takeaway2: 'Datadog在单一平台中提供统一的指标、日志和追踪',
    takeaway3: 'Sentry为调试应用程序错误提供更好的开发者体验',
    takeaway4: 'Datadog在基础设施和云服务监控方面表现出色',
    takeaway5: 'Sentry定价更可预测；Datadog在规模化时可能变得昂贵',
    takeaway6: '两者都与流行的框架和云服务提供出色的集成',
    
    whatIsSentryTitle: '什么是Sentry？',
    whatIsSentryContent: 'Sentry是一个专注于错误追踪和性能监控的应用程序监控平台。成立于2012年，它帮助开发者实时识别、优先处理和修复错误。Sentry为每个错误提供详细的上下文，包括堆栈跟踪、面包屑、用户环境和发布信息。',
    
    whatIsDatadogTitle: '什么是Datadog？',
    whatIsDatadogContent: 'Datadog是一个全面的 observability 平台，成立于2010年。它在统一平台中结合了基础设施监控、应用程序性能监控（APM）、日志管理和安全监控。Datadog被企业广泛用于云环境中的全栈 observability。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能和重点领域：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个平台的集成示例：',
    
    sentryExampleTitle: 'Sentry集成',
    datadogExampleTitle: 'Datadog集成',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本结构和定价模型：',
    
    useCasesTitle: '最佳用例',
    sentryBestFor: 'Sentry最适合：',
    datadogBestFor: 'Datadog最适合：',
    
    migrationTitle: '迁移注意事项',
    migrationIntro: '切换平台时需要考虑的事项：',
    
    whenToUseTitle: '何时选择每个平台',
    
    conclusionTitle: '结论',
    conclusionContent: 'Sentry和Datadog服务于不同但有重叠的需求。对于专注于应用程序质量和错误解决的开发团队，Sentry以合理的价格提供无与伦比的开发者体验。对于需要全面基础设施可见性和应用程序监控的组织，Datadog提供企业级的集成解决方案。许多团队同时使用两者：Sentry用于深度错误分析，Datadog用于基础设施和运营指标。',
    
    faq1q: 'Sentry可以完全替代Datadog吗？',
    faq1a: '对于应用程序错误追踪，Sentry可以替代Datadog。但是，如果你需要基础设施监控、日志聚合和全面的 observability，Datadog提供更完整的解决方案。许多团队使用Sentry处理错误，并使用更简单的工具进行基础基础设施监控。',
    
    faq2q: '哪个工具的告警功能更好？',
    faq2a: 'Datadog提供更复杂的告警功能，包括组合告警、异常检测和预测。Sentry为基于错误的事件提供可靠的告警，但对于基于指标的告警灵活性较低。对于复杂的告警需求，Datadog有优势。',
    
    faq3q: '它们在前端监控方面如何比较？',
    faq3a: 'Sentry有出色的前端SDK，提供详细的浏览器错误追踪、会话回放和用户反馈。Datadog也提供真实用户监控（RUM），但Sentry通常为调试前端问题提供更好的上下文。',
    
    faq4q: '有免费层吗？',
    faq4a: '是的，两者都提供免费层。Sentry为个人开发者和小团队提供慷慨的免费层，每月5,000个错误。Datadog提供14天免费试用和1个主机的免费层，功能有限。',
    
    faq5q: '哪个更适合微服务？',
    faq5a: 'Datadog在微服务方面表现出色，提供分布式追踪、服务地图和基础设施关联。Sentry支持分布式追踪但专注于错误流。对于复杂的微服务架构，Datadog提供更好的运营可见性。',
    
    faq6q: '它们的学习曲线如何？',
    faq6a: 'Sentry学习曲线较平缓，功能集专注。开发者可以快速变得高效。Datadog有更多功能需要学习，但提供全面的文档。两者都提供良好的入门体验。',
    
    faq7q: '我可以同时使用两个工具吗？',
    faq7a: '是的，许多组织同时使用两者。Sentry处理应用程序错误追踪，而Datadog管理基础设施和运营监控。它们之间可以通过webhook和API进行集成。',
    
    faq8q: '哪个有更好的Kubernetes集成？',
    faq8a: 'Datadog有卓越的Kubernetes集成，开箱即用地提供自动发现、集群监控和容器指标。Sentry与Kubernetes集成良好用于应用程序监控，但不提供基础设施级别的可见性。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SentryVsDatadog({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsSentryTitle}</h3>
      <p style={pStyle}>{ct.whatIsSentryContent}</p>

      <h3 style={h3Style}>{ct.whatIsDatadogTitle}</h3>
      <p style={pStyle}>{ct.whatIsDatadogContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '核心定位' : 'Core Focus', isZh ? '错误追踪' : 'Error Tracking', isZh ? '全栈监控' : 'Full-Stack Monitoring'],
              [isZh ? '错误追踪' : 'Error Tracking', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '性能监控' : 'Performance Monitoring', isZh ? '应用级' : 'Application-level', isZh ? '全栈APM' : 'Full-stack APM'],
              [isZh ? '基础设施监控' : 'Infrastructure', isZh ? '基础' : 'Basic', isZh ? '全面' : 'Comprehensive'],
              [isZh ? '日志管理' : 'Log Management', isZh ? '基础' : 'Basic', isZh ? '强大' : 'Powerful'],
              [isZh ? '分布式追踪' : 'Distributed Tracing', isZh ? '支持' : 'Supported', isZh ? '优秀' : 'Excellent'],
              [isZh ? '用户会话回放' : 'Session Replay', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '定价模型' : 'Pricing Model', isZh ? '按事件' : 'Per Event', isZh ? '按主机/使用量' : 'Per Host/Usage'],
            ].map(([feature, sentry, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={tdStyle}>{datadog}</td>
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
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '堆栈跟踪分析' : 'Stack Trace Analysis', isZh ? '源码映射、变量、面包屑' : 'Source maps, vars, breadcrumbs', isZh ? '标准堆栈跟踪' : 'Standard stack traces'],
              [isZh ? '发布追踪' : 'Release Tracking', isZh ? '内置、自动关联错误' : 'Built-in, auto error correlation', isZh ? '通过APM支持' : 'Via APM'],
              [isZh ? '告警' : 'Alerting', isZh ? '基于错误' : 'Error-based', isZh ? '多维度、异常检测' : 'Multi-dimensional, anomaly detection'],
              [isZh ? '仪表盘' : 'Dashboards', isZh ? '发布和错误聚焦' : 'Release & error focused', isZh ? '完全自定义' : 'Fully customizable'],
              [isZh ? '云集成' : 'Cloud Integrations', '20+', '600+'],
              [isZh ? 'SDK支持' : 'SDK Support', '30+ 语言/框架', '30+ 语言/框架'],
              [isZh ? '自托管' : 'Self-hosted', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? 'SaaS' : 'SaaS', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
            ].map(([feature, sentry, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={tdStyle}>{datadog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#9333ea' }}>{ct.sentryExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Sentry - Node.js Integration
import * as Sentry from "@sentry/node";

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  release: process.env.npm_package_version,
});

// Capture custom error with context
try {
  await processPayment(orderData);
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: "payment",
    },
    user: {
      id: user.id,
      email: user.email,
    },
    extra: {
      orderId: orderData.id,
      amount: orderData.amount,
    },
  });
}

// Add breadcrumbs for context
Sentry.addBreadcrumb({
  category: "api",
  message: "Called payment gateway",
  level: "info",
});

// Performance monitoring
const transaction = Sentry.startTransaction({
  op: "http.server",
  name: "POST /api/checkout",
});

// ... your code

transaction.finish();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#632ca6' }}>{ct.datadogExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Datadog - Node.js Integration
import tracer from "dd-trace";

// Initialize Datadog tracer
tracer.init({
  service: "my-api",
  env: process.env.NODE_ENV,
  version: process.env.npm_package_version,
});

// Trace custom operation
const span = tracer.startSpan("process.payment");
try {
  await processPayment(orderData);
  span.setTag("payment.status", "success");
  span.setTag("order.id", orderData.id);
} catch (error) {
  span.setTag("error", error);
  tracer.scope().activate(span, () => {
    throw error;
  });
} finally {
  span.finish();
}

// Custom metrics
const dogstatsd = require("datadog-metrics");
dogstatsd.init({ host: "localhost", prefix: "myapp." });

dogstatsd.increment("payment.attempt");
dogstatsd.histogram("payment.duration", durationMs);
dogstatsd.gauge("queue.size", queueLength);

// Log correlation
const logger = require("pino")({
  base: {
    dd: {
      trace_id: span.context().toTraceId(),
      span_id: span.context().toSpanId(),
    },
  },
});`}</code></pre>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Datadog</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', isZh ? '5,000 错误/月' : '5,000 errors/month', isZh ? '1主机，5指标' : '1 host, 5 metrics'],
              [isZh ? '团队版' : 'Team', isZh ? '26美元/月' : '$26/month', isZh ? '15美元/主机/月' : '$15/host/month'],
              [isZh ? '企业版' : 'Enterprise', isZh ? '自定义' : 'Custom', isZh ? '自定义' : 'Custom'],
              [isZh ? '按量计费' : 'Usage-based', isZh ? '按事件' : 'Per event', isZh ? '多维度（主机、日志、追踪）' : 'Multi-dimensional (hosts, logs, traces)'],
              [isZh ? '可预测性' : 'Predictability', isZh ? '高' : 'High', isZh ? '中（可能超支）' : 'Medium (can exceed)'],
            ].map(([plan, sentry, datadog], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={tdStyle}>{datadog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #9333ea' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#9333ea' }}>{ct.sentryBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '应用程序错误追踪' : 'Application error tracking'}</li>
            <li>{isZh ? '发布质量监控' : 'Release quality monitoring'}</li>
            <li>{isZh ? '前端错误调试' : 'Frontend error debugging'}</li>
            <li>{isZh ? '小型到中型团队' : 'Small to medium teams'}</li>
            <li>{isZh ? '开发者优先的调试' : 'Developer-first debugging'}</li>
            <li>{isZh ? '移动应用监控' : 'Mobile app monitoring'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #632ca6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#632ca6' }}>{ct.datadogBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '全栈基础设施监控' : 'Full-stack infrastructure monitoring'}</li>
            <li>{isZh ? 'Kubernetes和云环境' : 'Kubernetes and cloud environments'}</li>
            <li>{isZh ? '分布式系统追踪' : 'Distributed system tracing'}</li>
            <li>{isZh ? '日志聚合和分析' : 'Log aggregation and analysis'}</li>
            <li>{isZh ? '企业级部署' : 'Enterprise deployments'}</li>
            <li>{isZh ? 'SRE和运维团队' : 'SRE and operations teams'}</li>
          </ul>
        </div>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration checklist: Sentry to Datadog or vice versa

// 1. Audit current usage
// - List all error types being tracked
// - Document alert rules and thresholds
// - Export dashboard configurations
// - Note custom integrations

// 2. Parallel deployment
// - Install new SDK alongside existing
// - Compare error capture rates
// - Validate alerting behavior
// - Test in staging first

// 3. Data migration considerations
// - Historical data cannot be migrated
// - Set up overlap period for comparison
// - Document baseline metrics

// 4. Team training
// - Different UI paradigms
// - New query languages (Datadog uses its own)
// - Alert rule translation

// 5. Cutover steps
// - Disable old alerts
// - Update notification channels
// - Remove old SDK
// - Monitor for gaps`}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/jwt-decoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
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
