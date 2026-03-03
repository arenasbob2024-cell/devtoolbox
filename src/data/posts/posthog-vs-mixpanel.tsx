'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'PostHog vs Mixpanel: Product Analytics Comparison 2025',
    intro: 'PostHog and Mixpanel are two leading product analytics platforms, but they take fundamentally different approaches. PostHog offers open-source self-hosting with product analytics, session replay, and feature flags, while Mixpanel provides a mature, cloud-native analytics platform. This comprehensive comparison helps you choose the right tool for your needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'PostHog is the better choice for privacy-conscious companies, startups wanting full-stack product tools, and teams preferring open-source solutions with self-hosting options. Mixpanel excels for enterprises needing mature analytics, advanced user segmentation, and dedicated customer success support. For most startups in 2025, PostHog offers better value.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'PostHog is open-source and can be self-hosted; Mixpanel is cloud-only',
    takeaway2: 'PostHog includes session replay, feature flags, and experimentation at no extra cost',
    takeaway3: 'Mixpanel has more mature user segmentation and funnel analysis',
    takeaway4: 'PostHog pricing is event-based and more predictable; Mixpanel uses MTUs',
    takeaway5: 'PostHog offers better data privacy control for regulated industries',
    takeaway6: 'Mixpanel has larger ecosystem integrations and longer track record',
    
    whatIsPosthogTitle: 'What is PostHog?',
    whatIsPosthogContent: 'PostHog is an open-source product analytics platform founded in 2020. It offers product analytics, session replay, feature flags, and experimentation in a single platform. PostHog can be self-hosted or used via cloud, giving companies full control over their data. It has raised over $27M from Y Combinator and other investors.',
    
    whatIsMixpanelTitle: 'What is Mixpanel?',
    whatIsMixpanelContent: 'Mixpanel, founded in 2009, is one of the pioneering product analytics platforms. It specializes in user behavior analytics, funnel analysis, and cohort tracking. With over $250M in funding and thousands of enterprise customers, Mixpanel has established itself as a mature, reliable analytics solution.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the pricing models is crucial for long-term planning:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Side-by-side feature comparison:',
    
    analyticsTitle: 'Analytics Capabilities',
    analyticsIntro: 'Core analytics features comparison:',
    
    dataPrivacyTitle: 'Data Privacy & Compliance',
    dataPrivacyIntro: 'Privacy and compliance considerations:',
    
    integrationTitle: 'Integrations',
    integrationIntro: 'Available integrations and SDKs:',
    
    whenToUseTitle: 'When to Use Each Platform',
    posthogBestFor: 'Use PostHog When:',
    mixpanelBestFor: 'Use Mixpanel When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, PostHog represents the modern approach to product analytics: open-source, self-hostable, and packed with features at a transparent price. For startups and privacy-conscious companies, PostHog offers exceptional value. Mixpanel remains the enterprise choice for teams needing mature analytics, proven reliability, and dedicated support. The best choice depends on your priorities: cost transparency and control (PostHog) vs maturity and ecosystem (Mixpanel).',
    
    faq1q: 'Can I migrate from Mixpanel to PostHog?',
    faq1a: 'Yes, PostHog provides migration tools and documentation for importing data from Mixpanel. The process involves exporting your Mixpanel data and using PostHog import APIs. Historical data migration is straightforward, though some advanced Mixpanel features may need reconfiguration.',
    
    faq2q: 'Is PostHog really free for self-hosting?',
    faq2a: 'PostHog is open-source and free to self-host. You pay only for infrastructure costs. However, the cloud version has a free tier up to 1 million events per month. Self-hosting requires technical resources for maintenance and scaling.',
    
    faq3q: 'Which has better real-time analytics?',
    faq3a: 'Mixpanel has historically had better real-time capabilities with sub-second data processing. PostHog has improved significantly and now offers near real-time analytics, typically within seconds of event ingestion.',
    
    faq4q: 'Does PostHog support GDPR compliance?',
    faq4a: 'Yes, PostHog is GDPR compliant and offers data residency options. Self-hosting gives you full control over data location. PostHog also provides tools for data deletion requests and consent management.',
    
    faq5q: 'Can I use both tools together?',
    faq5a: 'Yes, some companies use both: Mixpanel for deep user analytics and PostHog for session replay and experimentation. However, this increases complexity and cost. Most teams should choose one primary platform.',
    
    faq6q: 'Which is better for B2B vs B2C?',
    faq6a: 'Mixpanel historically excelled at B2C with its user-centric model. PostHog added B2B features like account-level analytics and is now competitive for both. For B2B SaaS, PostHog account analytics are particularly strong.',
    
    faq7q: 'How do session replays compare?',
    faq7a: 'PostHog session replay is included free and works well for debugging UX issues. Mixpanel does not have native session replay; you would need to integrate with tools like FullStory or LogRocket at additional cost.',
    
    faq8q: 'What about customer support?',
    faq8a: 'Mixpanel offers dedicated customer success managers for enterprise plans. PostHog provides community support, documentation, and Slack community. Paid PostHog plans include priority support, but enterprise support is less mature than Mixpanel.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'PostHog vs Mixpanel：2025年产品分析工具对比',
    intro: 'PostHog和Mixpanel是两个领先的产品分析平台，但采用了截然不同的方法。PostHog提供开源自托管方案，包含产品分析、会话回放和功能标志，而Mixpanel提供成熟的云原生分析平台。本全面对比帮助你选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'PostHog更适合注重隐私的公司、需要全栈产品工具的初创企业，以及偏好开源自托管方案的团队。Mixpanel则更适合需要成熟分析、高级用户细分和专属客户成功支持的企业。对于2025年大多数初创企业，PostHog提供更高性价比。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'PostHog开源可自托管；Mixpanel仅支持云端',
    takeaway2: 'PostHog免费包含会话回放、功能标志和实验功能',
    takeaway3: 'Mixpanel拥有更成熟的用户细分和漏斗分析',
    takeaway4: 'PostHog基于事件定价更可预测；Mixpanel使用MTU计费',
    takeaway5: 'PostHog为监管行业提供更好的数据隐私控制',
    takeaway6: 'Mixpanel拥有更大的生态系统集成和更长的历史',
    
    whatIsPosthogTitle: '什么是PostHog？',
    whatIsPosthogContent: 'PostHog是一个开源产品分析平台，成立于2020年。它在单一平台中提供产品分析、会话回放、功能标志和实验功能。PostHog可自托管或使用云端，让公司完全控制数据。它已从Y Combinator等投资者筹集超过2700万美元。',
    
    whatIsMixpanelTitle: '什么是Mixpanel？',
    whatIsMixpanelContent: 'Mixpanel成立于2009年，是产品分析平台的先驱之一。它专注于用户行为分析、漏斗分析和群组跟踪。Mixpanel已获得超过2.5亿美元融资，拥有数千家企业客户，已确立为成熟可靠的分析解决方案。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解定价模式对长期规划至关重要：',
    
    featuresTitle: '功能对比',
    featuresIntro: '并排功能比较：',
    
    analyticsTitle: '分析能力',
    analyticsIntro: '核心分析功能对比：',
    
    dataPrivacyTitle: '数据隐私与合规',
    dataPrivacyIntro: '隐私和合规考虑：',
    
    integrationTitle: '集成',
    integrationIntro: '可用的集成和SDK：',
    
    whenToUseTitle: '何时使用每个平台',
    posthogBestFor: '使用PostHog的场景：',
    mixpanelBestFor: '使用Mixpanel的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，PostHog代表了产品分析的现代方法：开源、可自托管、以透明价格提供丰富功能。对于初创企业和注重隐私的公司，PostHog提供卓越价值。Mixpanel仍然是企业选择，适合需要成熟分析、可靠性和专属支持的团队。最佳选择取决于你的优先级：成本透明度和控制（PostHog）vs 成熟度和生态系统（Mixpanel）。',
    
    faq1q: '可以从Mixpanel迁移到PostHog吗？',
    faq1a: '可以，PostHog提供迁移工具和文档用于从Mixpanel导入数据。过程包括导出Mixpanel数据并使用PostHog导入API。历史数据迁移很简单，但某些高级Mixpanel功能可能需要重新配置。',
    
    faq2q: 'PostHog自托管真的免费吗？',
    faq2a: 'PostHog是开源的，可免费自托管。你只需支付基础设施成本。但云端版本每月有高达100万事件的免费层。自托管需要技术资源进行维护和扩展。',
    
    faq3q: '哪个实时分析更好？',
    faq3a: 'Mixpanel历史上在实时能力方面更好，具有亚秒级数据处理。PostHog已大幅改进，现在提供接近实时的分析，通常在事件摄取后几秒内。',
    
    faq4q: 'PostHog支持GDPR合规吗？',
    faq4a: '是的，PostHog符合GDPR并提供数据驻留选项。自托管让你完全控制数据位置。PostHog还提供数据删除请求和同意管理工具。',
    
    faq5q: '可以同时使用两个工具吗？',
    faq5a: '可以，一些公司同时使用两者：Mixpanel用于深度用户分析，PostHog用于会话回放和实验。但这会增加复杂性和成本。大多数团队应选择一个主要平台。',
    
    faq6q: 'B2B和B2C哪个更好？',
    faq6a: 'Mixpanel历史上在B2C方面表现出色，以其以用户为中心的模型。PostHog添加了B2B功能如账户级分析，现在两者都有竞争力。对于B2B SaaS，PostHog账户分析特别强大。',
    
    faq7q: '会话回放比较如何？',
    faq7a: 'PostHog会话回放免费包含在内，适合调试UX问题。Mixpanel没有原生会话回放；你需要额外付费集成FullStory或LogRocket等工具。',
    
    faq8q: '客户支持如何？',
    faq8a: 'Mixpanel为企业计划提供专属客户成功经理。PostHog提供社区支持、文档和Slack社区。付费PostHog计划包括优先支持，但企业支持不如Mixpanel成熟。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PosthogVsMixpanel({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '平台概览' : 'Platform Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPosthogTitle}</h3>
      <p style={pStyle}>{ct.whatIsPosthogContent}</p>

      <h3 style={h3Style}>{ct.whatIsMixpanelTitle}</h3>
      <p style={pStyle}>{ct.whatIsMixpanelContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价项目' : 'Pricing Aspect'}</th>
              <th style={thStyle}>PostHog</th>
              <th style={thStyle}>Mixpanel</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '定价模式' : 'Pricing Model', isZh ? '按事件计费' : 'Event-based', isZh ? '按MTU计费' : 'MTU-based'],
              [isZh ? '免费层' : 'Free Tier', '1M events/month', '100K MTUs/month'],
              [isZh ? '起价' : 'Starting Price', '$0.00031/event', '$20/month'],
              [isZh ? '自托管' : 'Self-hosting', isZh ? '免费（开源）' : 'Free (open-source)', isZh ? '不支持' : 'Not available'],
              [isZh ? '会话回放' : 'Session Replay', isZh ? '免费包含' : 'Included free', isZh ? '需第三方工具' : 'Third-party required'],
              [isZh ? '功能标志' : 'Feature Flags', isZh ? '免费包含' : 'Included free', isZh ? '不支持' : 'Not available'],
              [isZh ? 'A/B测试' : 'A/B Testing', isZh ? '免费包含' : 'Included free', isZh ? '需额外付费' : 'Additional cost'],
            ].map(([feature, posthog, mixpanel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{posthog}</td>
                <td style={tdStyle}>{mixpanel}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>PostHog</th>
              <th style={thStyle}>Mixpanel</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '产品分析' : 'Product Analytics', '✓', '✓'],
              [isZh ? '会话回放' : 'Session Replay', '✓ Built-in', isZh ? '需第三方' : 'Third-party'],
              [isZh ? '功能标志' : 'Feature Flags', '✓ Built-in', '✗'],
              [isZh ? 'A/B测试' : 'Experimentation', '✓ Built-in', '✓ Add-on'],
              [isZh ? '漏斗分析' : 'Funnel Analysis', '✓', '✓ Advanced'],
              [isZh ? '群组分析' : 'Cohort Analysis', '✓', '✓ Advanced'],
              [isZh ? '用户画像' : 'User Profiles', '✓', '✓'],
              [isZh ? '数据仓库导出' : 'Data Warehouse Export', '✓', '✓'],
              [isZh ? 'SQL查询' : 'SQL Access', '✓', '✓'],
              [isZh ? '实时仪表盘' : 'Real-time Dashboards', '✓', '✓'],
            ].map(([feature, posthog, mixpanel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{posthog}</td>
                <td style={tdStyle}>{mixpanel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.dataPrivacyTitle}</h2>
      <p style={pStyle}>{ct.dataPrivacyIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>PostHog</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '开源代码可审计，支持自托管完全控制数据位置。GDPR、SOC 2、HIPAA合规。数据驻留选项覆盖美国、欧盟。' : 'Open-source code auditable, self-hosting for full data control. GDPR, SOC 2, HIPAA compliant. Data residency options for US and EU.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Mixpanel</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '仅云端，但企业计划提供数据驻留。GDPR、SOC 2、ISO 27001合规。无法自托管。' : 'Cloud-only, but enterprise plans offer data residency. GDPR, SOC 2, ISO 27001 compliant. No self-hosting option.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '集成类型' : 'Integration Type'}</th>
              <th style={thStyle}>PostHog</th>
              <th style={thStyle}>Mixpanel</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'SDK数量' : 'SDKs', '15+', '20+'],
              ['JavaScript', '✓', '✓'],
              ['React/React Native', '✓', '✓'],
              ['iOS (Swift)', '✓', '✓'],
              ['Android (Kotlin)', '✓', '✓'],
              ['Python', '✓', '✓'],
              ['Node.js', '✓', '✓'],
              ['Go', '✓', '✓'],
              [isZh ? '第三方集成' : 'Third-party Integrations', '50+', '150+'],
              [isZh ? '数据仓库' : 'Data Warehouses', 'BigQuery, Snowflake, Redshift', 'BigQuery, Snowflake, Redshift'],
            ].map(([type, posthog, mixpanel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{posthog}</td>
                <td style={tdStyle}>{mixpanel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.posthogBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '注重隐私的公司' : 'Privacy-conscious companies'}</li>
            <li>{isZh ? '初创企业和中小企业' : 'Startups and SMBs'}</li>
            <li>{isZh ? '需要自托管的团队' : 'Teams needing self-hosting'}</li>
            <li>{isZh ? '预算有限的项目' : 'Budget-conscious projects'}</li>
            <li>{isZh ? '需要全栈产品工具' : 'Full-stack product tools needed'}</li>
            <li>{isZh ? '监管行业（医疗、金融）' : 'Regulated industries'}</li>
            <li>{isZh ? '开发者主导的团队' : 'Developer-led teams'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.mixpanelBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '大型企业' : 'Large enterprises'}</li>
            <li>{isZh ? '需要成熟分析平台' : 'Mature analytics needed'}</li>
            <li>{isZh ? '复杂用户细分需求' : 'Complex segmentation needs'}</li>
            <li>{isZh ? '需要专属客户成功经理' : 'Dedicated customer success'}</li>
            <li>{isZh ? '大量第三方集成需求' : 'Many third-party integrations'}</li>
            <li>{isZh ? 'B2C高流量产品' : 'High-traffic B2C products'}</li>
            <li>{isZh ? '成熟产品团队' : 'Established product teams'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> •{' '}
        <a href={'/' + lang + '/tools/uuid-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> •{' '}
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
