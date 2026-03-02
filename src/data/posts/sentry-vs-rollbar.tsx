'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Sentry vs Rollbar: Error Monitoring Comparison',
    intro: 'Sentry and Rollbar are leading error monitoring platforms that help developers identify, diagnose, and fix bugs in production. This comprehensive comparison examines features, pricing, performance, and real-world usage to help you choose the right error tracking solution.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Sentry excels at frontend error tracking with excellent source map support and performance monitoring. Rollbar offers superior grouping algorithms and more flexible pricing for high-volume applications. Choose Sentry for frontend-heavy applications and comprehensive observability; choose Rollbar for backend services and cost-effective high-volume error tracking.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Sentry has better frontend integration and source map support',
    takeaway2: 'Rollbar offers superior error grouping and deduplication',
    takeaway3: 'Sentry includes performance monitoring and session replay',
    takeaway4: 'Rollbar pricing is more predictable for high error volumes',
    takeaway5: 'Both support all major languages and frameworks',
    takeaway6: 'Sentry has larger ecosystem and community resources',
    
    whatIsSentryTitle: 'What is Sentry?',
    whatIsSentryContent: 'Sentry is a comprehensive error tracking and performance monitoring platform founded in 2012. Originally focused on Python/Django applications, it now supports all major languages and frameworks. Sentry provides real-time error alerts, stack traces, release tracking, and performance insights to help developers ship better software.',
    
    whatIsRollbarTitle: 'What is Rollbar?',
    whatIsRollbarContent: 'Rollbar is an error monitoring platform founded in 2012, designed to help developers find and fix errors in production. It features intelligent error grouping, person tracking, and detailed error context. Rollbar focuses on providing actionable error insights with minimal noise through its advanced deduplication algorithms.',
    
    errorGroupingTitle: 'Error Grouping & Intelligence',
    errorGroupingIntro: 'How each platform handles error analysis:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core error monitoring capabilities:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost structure differences:',
    
    codeExampleTitle: 'Integration Examples',
    codeExampleIntro: 'See how to integrate each platform:',
    
    sentryExampleTitle: 'Sentry Integration',
    rollbarExampleTitle: 'Rollbar Integration',
    
    whenToUseTitle: 'When to Use Each Platform',
    sentryBestFor: 'Use Sentry When:',
    rollbarBestFor: 'Use Rollbar When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Sentry and Rollbar are both excellent error monitoring solutions with different strengths. Sentry is ideal for teams wanting comprehensive observability with performance monitoring, session replay, and strong frontend support. Rollbar excels at pure error tracking with superior grouping algorithms and predictable pricing. For frontend-heavy applications, Sentry is often the better choice. For backend services with high error volumes, Rollbar offers better value. Many organizations use both: Sentry for frontend and Rollbar for backend.',
    
    faq1q: 'Can I use both Sentry and Rollbar together?',
    faq1a: 'Yes, many organizations use both platforms. For example, Sentry for frontend errors and performance, and Rollbar for backend error tracking. This approach provides comprehensive coverage but increases complexity and cost.',
    
    faq2q: 'Which has better error grouping?',
    faq2a: 'Rollbar is generally considered to have better error grouping algorithms, reducing noise from duplicate errors. Sentry has improved significantly but Rollbar remains the choice for teams prioritizing accurate error deduplication.',
    
    faq3q: 'Does Sentry support all programming languages?',
    faq3a: 'Sentry supports 30+ languages and frameworks including JavaScript, Python, Java, Ruby, Go, PHP, .NET, and more. Most popular languages have official SDKs with full feature support.',
    
    faq4q: 'What about source maps in Sentry vs Rollbar?',
    faq4a: 'Sentry has more mature source map handling with automatic upload via CLI and CI/CD integration. Rollbar also supports source maps but requires more manual configuration. For frontend applications, Sentry is typically easier.',
    
    faq5q: 'Which is better for React applications?',
    faq5a: 'Sentry is generally preferred for React applications due to better React SDK, source map support, and performance monitoring integration. The Sentry React SDK captures component names and props for easier debugging.',
    
    faq6q: 'How does pricing compare at scale?',
    faq6a: 'Rollbar pricing is based on error events, making it more predictable. Sentry charges by events and attachments, which can grow quickly with screenshots and sessions. For high-volume applications, Rollbar is often more cost-effective.',
    
    faq7q: 'Does Rollbar have performance monitoring?',
    faq7a: 'Rollbar focuses primarily on error monitoring and does not offer the same level of performance monitoring as Sentry. Sentry Performance provides distributed tracing, transaction monitoring, and metrics.',
    
    faq8q: 'Which has better notification integrations?',
    faq8a: 'Both platforms support popular integrations (Slack, PagerDuty, email, etc.). Sentry has more pre-built integrations while Rollbar offers flexible webhook configurations. Both meet most notification needs.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Sentry vs Rollbar：错误监控对比',
    intro: 'Sentry和Rollbar是领先的错误监控平台，帮助开发者识别、诊断和修复生产环境中的bug。本全面比较考察功能、定价、性能和实际使用，帮助你选择合适的错误追踪解决方案。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Sentry在前端错误追踪方面表现出色，具有优秀的source map支持和性能监控。Rollbar提供卓越的分组算法和更灵活的高容量应用定价。追求前端重应用和全面可观测性选择Sentry；追求后端服务和成本效益的高容量错误追踪选择Rollbar。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Sentry有更好的前端集成和source map支持',
    takeaway2: 'Rollbar提供卓越的错误分组和去重',
    takeaway3: 'Sentry包含性能监控和会话回放',
    takeaway4: 'Rollbar定价对高错误量更可预测',
    takeaway5: '两者都支持所有主要语言和框架',
    takeaway6: 'Sentry有更大的生态系统和社区资源',
    
    whatIsSentryTitle: '什么是Sentry？',
    whatIsSentryContent: 'Sentry是2012年成立的全面错误追踪和性能监控平台。最初专注于Python/Django应用，现在支持所有主要语言和框架。Sentry提供实时错误告警、堆栈跟踪、发布追踪和性能洞察，帮助开发者交付更好的软件。',
    
    whatIsRollbarTitle: '什么是Rollbar？',
    whatIsRollbarContent: 'Rollbar是2012年成立的错误监控平台，旨在帮助开发者发现和修复生产环境错误。它具有智能错误分组、用户追踪和详细错误上下文功能。Rollbar专注于通过高级去重算法提供可操作的错误洞察，同时保持最小噪音。',
    
    errorGroupingTitle: '错误分组与智能',
    errorGroupingIntro: '每个平台如何处理错误分析：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心错误监控能力：',
    
    pricingTitle: '定价对比',
    pricingIntro: '成本结构差异：',
    
    codeExampleTitle: '集成示例',
    codeExampleIntro: '查看如何集成每个平台：',
    
    sentryExampleTitle: 'Sentry集成',
    rollbarExampleTitle: 'Rollbar集成',
    
    whenToUseTitle: '何时使用每个平台',
    sentryBestFor: '使用Sentry的场景：',
    rollbarBestFor: '使用Rollbar的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Sentry和Rollbar都是优秀的错误监控解决方案，各有优势。Sentry非常适合想要全面可观测性的团队，包括性能监控、会话回放和强大的前端支持。Rollbar在纯错误追踪方面表现出色，具有卓越的分组算法和可预测的定价。对于前端重应用，Sentry通常是更好的选择。对于高错误量的后端服务，Rollbar提供更好的价值。许多组织同时使用两者：Sentry用于前端，Rollbar用于后端。',
    
    faq1q: '可以同时使用Sentry和Rollbar吗？',
    faq1a: '可以，许多组织同时使用两个平台。例如，Sentry用于前端错误和性能，Rollbar用于后端错误追踪。这种方法提供全面覆盖，但增加了复杂性和成本。',
    
    faq2q: '哪个错误分组更好？',
    faq2a: 'Rollbar通常被认为有更好的错误分组算法，减少重复错误的噪音。Sentry已显著改进，但对于优先考虑准确错误去重的团队，Rollbar仍是选择。',
    
    faq3q: 'Sentry支持所有编程语言吗？',
    faq3a: 'Sentry支持30+语言和框架，包括JavaScript、Python、Java、Ruby、Go、PHP、.NET等。大多数流行语言有官方SDK并提供完整功能支持。',
    
    faq4q: 'Sentry和Rollbar的source map支持如何？',
    faq4a: 'Sentry有更成熟的source map处理，通过CLI和CI/CD集成自动上传。Rollbar也支持source map但需要更多手动配置。对于前端应用，Sentry通常更容易。',
    
    faq5q: '哪个更适合React应用？',
    faq5a: 'Sentry通常更适合React应用，因为有更好的React SDK、source map支持和性能监控集成。Sentry React SDK捕获组件名称和props，更容易调试。',
    
    faq6q: '大规模定价如何比较？',
    faq6a: 'Rollbar定价基于错误事件，更可预测。Sentry按事件和附件收费，截图和会话可能快速增长。对于高容量应用，Rollbar通常更具成本效益。',
    
    faq7q: 'Rollbar有性能监控吗？',
    faq7a: 'Rollbar主要专注于错误监控，不提供与Sentry相同级别的性能监控。Sentry Performance提供分布式追踪、事务监控和指标。',
    
    faq8q: '哪个通知集成更好？',
    faq8a: '两个平台都支持流行的集成（Slack、PagerDuty、邮件等）。Sentry有更多预构建集成，而Rollbar提供灵活的webhook配置。两者都满足大多数通知需求。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function SentryVsRollbar({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsRollbarTitle}</h3>
      <p style={pStyle}>{ct.whatIsRollbarContent}</p>

      {/* Error Grouping */}
      <h2 style={h2Style}>{ct.errorGroupingTitle}</h2>
      <p style={pStyle}>{ct.errorGroupingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '能力' : 'Capability'}</th>
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Rollbar</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '分组算法' : 'Grouping Algorithm', 'Fingerprint-based', 'Advanced ML-based'],
              [isZh ? '去重准确性' : 'Deduplication', 'Good', 'Excellent'],
              [isZh ? '自定义规则' : 'Custom Rules', '✓ Fingerprinting', '✓ Grouping Rules'],
              [isZh ? '噪音减少' : 'Noise Reduction', 'Standard', 'Superior'],
              [isZh ? '堆栈跟踪分析' : 'Stack Trace Analysis', '✓', '✓'],
              [isZh ? '错误合并' : 'Error Merging', 'Manual/Auto', 'Smart Auto'],
              [isZh ? '根因分析' : 'Root Cause Analysis', 'Basic', 'Advanced'],
            ].map(([feature, sentry, rollbar], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rollbar}</td>
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
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Rollbar</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '错误追踪' : 'Error Tracking', '✓', '✓'],
              [isZh ? '性能监控' : 'Performance Monitoring', '✓ Full APM', 'Basic'],
              [isZh ? '会话回放' : 'Session Replay', '✓', '✗'],
              [isZh ? 'Source Maps' : 'Source Maps', '✓ Excellent', '✓ Good'],
              [isZh ? '发布追踪' : 'Release Tracking', '✓', '✓'],
              [isZh ? '用户追踪' : 'User Tracking', '✓', '✓ Person Tracking'],
              [isZh ? '自定义标签' : 'Custom Tags', '✓', '✓'],
              [isZh ? '面包屑' : 'Breadcrumbs', '✓', '✓'],
              [isZh ? '通知' : 'Notifications', '✓ Many Integrations', '✓ Flexible'],
              [isZh ? 'GraphQL支持' : 'GraphQL Support', '✓', '✓'],
              [isZh ? '自托管' : 'Self-hosted', '✓ Open Source', 'Limited'],
              [isZh ? '语言SDK' : 'Language SDKs', '30+', '20+'],
            ].map(([feature, sentry, rollbar], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={tdStyle}>{rollbar}</td>
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
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>Sentry</th>
              <th style={thStyle}>Rollbar</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '5K errors/month', '5K errors/month'],
              [isZh ? '团队计划' : 'Team Plan', '26/month (Developer)', '21/month (Startup)'],
              [isZh ? '企业计划' : 'Enterprise', 'Custom', 'Custom'],
              [isZh ? '按事件定价' : 'Per-Event Pricing', '0.0033/event', '0.00025/event (volume)'],
              [isZh ? '附件存储' : 'Attachment Storage', 'Extra cost', 'Included'],
              [isZh ? '团队成员' : 'Team Members', 'Per-seat pricing', 'Included in tier'],
              [isZh ? '1M错误/月预估' : '1M Errors/mo Est.', '500+', '250'],
            ].map(([plan, sentry, rollbar], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{sentry}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{rollbar}</td>
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
          <h3 style={{ ...h3Style, color: '#362d59' }}>{ct.sentryExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# Install Sentry SDK
npm install @sentry/react @sentry/tracing

// sentry.js (JavaScript/React)
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://xxx@sentry.io/123",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1,
  environment: "production",
  release: "myapp@1.0.0",
});

// Capture custom error
try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error);
}

// Add user context
Sentry.setUser({ id: "123", email: "user@example.com" });

// Add breadcrumb
Sentry.addBreadcrumb({
  category: "ui",
  message: "User clicked button",
  level: "info",
});

// Python
import sentry_sdk

sentry_sdk.init(
    dsn="https://xxx@sentry.io/123",
    traces_sample_rate=0.1,
)

# Capture error
try:
    risky_function()
except Exception as e:
    sentry_sdk.capture_exception(e)

# Node.js Express middleware
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

const app = require("express")();

Sentry.init({
  dsn: "https://xxx@sentry.io/123",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 0.1,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());`}</code></pre>
        </div>
        <div>
          <h3 style={{ ...h3Style, color: '#f9674e' }}>{ct.rollbarExampleTitle}</h3>
          <pre style={codeStyle}><code>{`# Install Rollbar SDK
npm install rollbar

// rollbar.js (JavaScript/React)
import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: "xxx",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: "1.0.0",
      }
    }
  }
});

// Capture error
try {
  riskyOperation();
} catch (error) {
  rollbar.error(error);
}

// With custom context
rollbar.error(error, { userId: "123", action: "checkout" });

// Log message
rollbar.info("User logged in", { userId: "123" });

// Python
import rollbar

rollbar.init(
    access_token="xxx",
    environment="production",
)

# Capture exception
try:
    risky_function()
except Exception as e:
    rollbar.report_exc_info()

# With extra data
rollbar.report_message("User action", "info", extra_data={"user_id": 123})

# Person tracking
rollbar.report_exc_info(extra_data={"person": {"id": "123", "email": "user@example.com"}})

# Node.js Express
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "xxx",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

app.use(rollbar.errorHandler());

// Custom error with request
app.get("/api/users/:id", (req, res) => {
  try {
    // ... code
  } catch (error) {
    rollbar.error(error, req);
    res.status(500).json({ error: "Internal error" });
  }
});`}</code></pre>
        </div>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #362d59' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#362d59' }}>{ct.sentryBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '前端应用' : 'Frontend applications'}</li>
            <li>{isZh ? '需要性能监控' : 'Need performance monitoring'}</li>
            <li>{isZh ? '会话回放需求' : 'Session replay needs'}</li>
            <li>{isZh ? 'React/Vue等SPA' : 'React/Vue SPAs'}</li>
            <li>{isZh ? '需要自托管' : 'Need self-hosting'}</li>
            <li>{isZh ? '全面可观测性' : 'Full observability stack'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f9674e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f9674e' }}>{ct.rollbarBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '后端服务' : 'Backend services'}</li>
            <li>{isZh ? '高错误量应用' : 'High error volume apps'}</li>
            <li>{isZh ? '成本敏感项目' : 'Budget-conscious projects'}</li>
            <li>{isZh ? '需要精确分组' : 'Need precise grouping'}</li>
            <li>{isZh ? 'API服务' : 'API services'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
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
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
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
