'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Fly.io vs Railway vs Render: The Ultimate 2025 Cloud Platform Comparison',
    intro: 'Choosing the right cloud platform for your application deployment is crucial for performance, cost, and developer experience. This comprehensive comparison examines Fly.io, Railway, and Render across pricing, features, deployment experience, database support, and real-world use cases to help you make the best decision for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Fly.io excels at global edge deployments with granular per-second billing, ideal for distributed applications. Railway offers the best developer experience with generous free tier ($20 credit) and simple pricing. Render provides enterprise-grade features with strong compliance and the most comprehensive free tier for static sites. For most developers in 2025, Railway is the easiest to start with, while Fly.io is best for global scale.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Fly.io charges $0.10/GB-hour for memory with $5 monthly free credit, best for edge computing',
    takeaway2: 'Railway offers $5/month minimum with $20 free credit, excellent for rapid prototyping',
    takeaway3: 'Render starts at $7/month for Web Services ($0.013/hour), strongest for compliance',
    takeaway4: 'All three support Docker, but Railway has the fastest deployment experience',
    takeaway5: 'Fly.io has the most regions (30+), Render focuses on reliability, Railway on simplicity',
    takeaway6: 'Database support varies: Fly.io (Postgres/Redis), Railway (11+ databases), Render (Postgres/Redis)',
    
    whatIsFlyioTitle: 'What is Fly.io?',
    whatIsFlyioContent: 'Fly.io is a platform that runs applications close to users globally. Founded in 2017, it transforms containers into micro-VMs that run on physical hardware in 30+ regions worldwide. Unlike traditional cloud providers, Fly.io focuses on edge computing, allowing you to deploy applications literally anywhere in the world with automatic load balancing and failover.',
    
    whatIsRailwayTitle: 'What is Railway?',
    whatIsRailwayContent: 'Railway is an infrastructure platform designed for developers who want to ship fast. Launched in 2020, it simplifies deployment with automatic builds from GitHub, instant rollbacks, and a unique incremental pricing model. Railway\'s philosophy is "infrastructure as code" without the complexity - perfect for startups and side projects.',
    
    whatIsRenderTitle: 'What is Render?',
    whatIsRenderContent: 'Render is a unified cloud platform for hosting apps and databases. Founded in 2018 by former Google and Cloudflare engineers, it positions itself as the easiest way to deploy anything. Render emphasizes compliance (SOC 2, HIPAA-ready), automatic SSL, and zero-downtime deployments, making it popular with enterprises and regulated industries.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Detailed pricing breakdown as of 2025:',
    
    corePricingTitle: 'Core Pricing Models',
    corePricingIntro: 'Understanding each platform\'s billing approach:',
    
    performanceTitle: 'Performance & Regions',
    performanceIntro: 'Global infrastructure and performance characteristics:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing platform capabilities:',
    
    deploymentTitle: 'Deployment Experience',
    deploymentIntro: 'How easy is it to deploy and manage applications?',
    
    databaseTitle: 'Database Support',
    databaseIntro: 'Managed database offerings comparison:',
    
    whenToUseTitle: 'When to Use Each Platform',
    flyioBestFor: 'Use Fly.io When:',
    railwayBestFor: 'Use Railway When:',
    renderBestFor: 'Use Render When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice depends on your priorities. Railway wins for developer experience and rapid prototyping with its generous free tier and instant deployments. Fly.io is unmatched for global applications requiring edge computing and low latency worldwide. Render is the go-to choice for enterprises needing compliance, reliability, and zero-downtime guarantees. For most individual developers and startups, start with Railway; scale to Fly.io for global reach; consider Render for enterprise requirements.',
    
    faq1q: 'Which platform has the best free tier?',
    faq1a: 'Railway offers $5/month free credit (enough for small projects), Render provides free static sites and limited free Web Services, while Fly.io gives $5/month in credits. Railway\'s $20 trial credit makes it the best for experimentation.',
    
    faq2q: 'Can I migrate between these platforms easily?',
    faq2a: 'Yes, all three support Docker containers and standard databases. Export your data, update environment variables, and redeploy. Railway and Render both support GitHub integration, making migrations straightforward.',
    
    faq3q: 'Which is best for serverless functions?',
    faq3a: 'Fly.io Machines provide the most flexible serverless experience with per-second billing and global distribution. Render offers background workers, while Railway focuses on long-running services rather than serverless.',
    
    faq4q: 'How do they handle scaling?',
    faq4a: 'Fly.io offers automatic scaling with Fly Autoscale, Railway provides both manual and automatic scaling, and Render includes auto-scaling on paid plans. Fly.io\'s edge-first architecture makes it naturally scalable globally.',
    
    faq5q: 'Which platform is best for databases?',
    faq5a: 'Railway offers the widest variety (11+ database types) including PostgreSQL, MySQL, Redis, MongoDB, and more. Render and Fly.io focus on PostgreSQL and Redis. For specialized databases, Railway or external services like PlanetScale are recommended.',
    
    faq6q: 'Are these platforms suitable for production workloads?',
    faq6a: 'All three are production-ready. Render is SOC 2 compliant and HIPAA-ready. Fly.io is used by major companies like Discord and Gamesight. Railway is newer but has proven reliable for thousands of production applications.',
    
    faq7q: 'How does pricing compare for high-traffic applications?',
    faq7a: 'Fly.io\'s per-second billing scales efficiently with traffic spikes. Railway\'s resource-based pricing can become expensive at scale. Render\'s predictable pricing ($0.013/hour) makes budgeting easier for consistent workloads.',
    
    faq8q: 'Which platform has the best documentation?',
    faq8a: 'All three have excellent docs. Fly.io\'s documentation is technical and comprehensive. Railway\'s docs are beginner-friendly with great examples. Render\'s documentation emphasizes best practices and compliance.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Fly.io vs Railway vs Render：2025年云平台终极对比',
    intro: '为你的应用部署选择正确的云平台对于性能、成本和开发者体验至关重要。本全面比较从定价、功能、部署体验、数据库支持和实际用例等方面考察 Fly.io、Railway 和 Render，帮助你为下一个项目做出最佳决策。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Fly.io 在全球边缘部署方面表现出色，采用精细的按秒计费，非常适合分布式应用。Railway 提供最佳开发者体验，拥有慷慨的免费额度（$20 试用金）和简单定价。Render 提供企业级功能、强大的合规性以及静态站点最全面的免费层。对于2025年的大多数开发者，Railway 最容易上手，而 Fly.io 最适合全球规模化。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Fly.io 内存收费 $0.10/GB小时，每月 $5 免费额度，最适合边缘计算',
    takeaway2: 'Railway 最低 $5/月起，含 $20 免费额度，非常适合快速原型开发',
    takeaway3: 'Render Web Services $7/月起（$0.013/小时），合规性最强',
    takeaway4: '三者都支持 Docker，但 Railway 部署体验最快',
    takeaway5: 'Fly.io 区域最多（30+），Render 注重可靠性，Railway 注重简洁性',
    takeaway6: '数据库支持不同：Fly.io（Postgres/Redis），Railway（11+数据库），Render（Postgres/Redis）',
    
    whatIsFlyioTitle: '什么是 Fly.io？',
    whatIsFlyioContent: 'Fly.io 是一个在全球用户附近运行应用的平台。成立于2017年，它将容器转换为在30多个区域的物理硬件上运行的微虚拟机。与传统云提供商不同，Fly.io 专注于边缘计算，允许你在世界任何地方部署应用，并具有自动负载均衡和故障转移功能。',
    
    whatIsRailwayTitle: '什么是 Railway？',
    whatIsRailwayContent: 'Railway 是一个为希望快速交付的开发者设计的基础设施平台。2020年推出，它通过 GitHub 自动构建、即时回滚和独特的增量定价模型简化了部署。Railway 的理念是"基础设施即代码"但没有复杂性——非常适合初创公司和副业项目。',
    
    whatIsRenderTitle: '什么是 Render？',
    whatIsRenderContent: 'Render 是一个用于托管应用和数据库的统一云平台。由前 Google 和 Cloudflare 工程师于2018年创立，它定位为部署任何东西的最简单方式。Render 强调合规性（SOC 2、HIPAA就绪）、自动 SSL 和零停机部署，使其在企业界和受监管行业很受欢迎。',
    
    pricingTitle: '价格对比',
    pricingIntro: '2025年详细定价明细：',
    
    corePricingTitle: '核心定价模型',
    corePricingIntro: '了解每个平台的计费方式：',
    
    performanceTitle: '性能与区域',
    performanceIntro: '全球基础设施和性能特征：',
    
    featuresTitle: '功能对比',
    featuresIntro: '平台能力比较：',
    
    deploymentTitle: '部署体验',
    deploymentIntro: '部署和管理应用的便捷程度如何？',
    
    databaseTitle: '数据库支持',
    databaseIntro: '托管数据库产品对比：',
    
    whenToUseTitle: '何时使用各平台',
    flyioBestFor: '使用 Fly.io 的场景：',
    railwayBestFor: '使用 Railway 的场景：',
    renderBestFor: '使用 Render 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，选择取决于你的优先级。Railway 在开发者体验和快速原型开发方面胜出，拥有慷慨的免费层和即时部署。Fly.io 在需要边缘计算和全球低延迟的全球应用方面无可匹敌。Render 是需要合规性、可靠性和零停机保证的企业的首选。对于大多数个人开发者和初创公司，从 Railway 开始；规模化时使用 Fly.io；有企业需求时考虑 Render。',
    
    faq1q: '哪个平台的免费层最好？',
    faq1a: 'Railway 提供 $5/月免费额度（足够小型项目），Render 提供免费静态站点和有限的免费 Web Services，而 Fly.io 给予 $5/月额度。Railway 的 $20 试用金使其成为实验的最佳选择。',
    
    faq2q: '我可以轻松在这些平台之间迁移吗？',
    faq2a: '是的，三者都支持 Docker 容器和标准数据库。导出数据、更新环境变量、重新部署即可。Railway 和 Render 都支持 GitHub 集成，使迁移变得简单。',
    
    faq3q: '哪个最适合无服务器函数？',
    faq3a: 'Fly.io Machines 提供最灵活的无服务器体验，具有按秒计费和全球分发。Render 提供后台工作者，而 Railway 专注于长期运行的服务而非无服务器。',
    
    faq4q: '它们如何处理扩展？',
    faq4a: 'Fly.io 通过 Fly Autoscale 提供自动扩展，Railway 提供手动和自动扩展，Render 在付费计划中包含自动扩展。Fly.io 的边缘优先架构使其自然地在全球范围内可扩展。',
    
    faq5q: '哪个平台最适合数据库？',
    faq5a: 'Railway 提供最广泛的种类（11+ 数据库类型），包括 PostgreSQL、MySQL、Redis、MongoDB 等。Render 和 Fly.io 专注于 PostgreSQL 和 Redis。对于专门的数据库，推荐 Railway 或外部服务如 PlanetScale。',
    
    faq6q: '这些平台适合生产工作负载吗？',
    faq6a: '三者都已可用于生产。Render 符合 SOC 2 并就绪 HIPAA。Fly.io 被 Discord 和 Gamesight 等大公司使用。Railway 较新但已为数千个生产应用证明可靠。',
    
    faq7q: '高流量应用的定价如何比较？',
    faq7a: 'Fly.io 的按秒计费随流量高峰高效扩展。Railway 的基于资源的定价在规模化时可能变得昂贵。Render 的可预测定价（$0.013/小时）使一致工作负载的预算更容易。',
    
    faq8q: '哪个平台的文档最好？',
    faq8a: '三者都有出色的文档。Fly.io 的文档技术性强且全面。Railway 的文档对初学者友好，有很好的示例。Render 的文档强调最佳实践和合规性。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function FlyIoVsRailwayVsRender({ lang }: { lang: string }) {
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

      {/* Platform Overview */}
      <h2 style={h2Style}>{isZh ? '平台概述' : 'Platform Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.whatIsFlyioTitle}</h3>
      <p style={pStyle}>{ct.whatIsFlyioContent}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.whatIsRailwayTitle}</h3>
      <p style={pStyle}>{ct.whatIsRailwayContent}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.whatIsRenderTitle}</h3>
      <p style={pStyle}>{ct.whatIsRenderContent}</p>

      {/* Pricing Comparison */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <h3 style={h3Style}>{ct.corePricingTitle}</h3>
      <p style={pStyle}>{ct.corePricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价要素' : 'Pricing Factor'}</th>
              <th style={thStyle}>Fly.io</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费额度' : 'Free Tier', '$5/月额度', '$5/月额度 + $20试用', isZh ? '静态站点免费' : 'Free static sites'],
              [isZh ? '最低月费' : 'Minimum Cost', isZh ? '按需计费' : 'Pay-per-use', '$5/月起', '$7/月起'],
              [isZh ? 'CPU计费' : 'CPU Cost', '$0.0125/vCPU-hour', isZh ? '包含在套餐中' : 'Included in plan', '$0.008/CPU-hour'],
              [isZh ? '内存计费' : 'Memory Cost', '$0.10/GB-hour', isZh ? '包含在套餐中' : 'Included in plan', '$0.004/GB-hour'],
              [isZh ? '存储计费' : 'Storage Cost', '$0.15/GB-month', '$0.25/GB-month', '$0.25/GB-month'],
              [isZh ? '带宽计费' : 'Bandwidth Cost', '$0.02/GB', isZh ? '包含在套餐中' : 'Included', '$0.10/GB'],
              [isZh ? '计费周期' : 'Billing Cycle', isZh ? '按秒' : 'Per-second', isZh ? '按小时' : 'Hourly', isZh ? '按小时' : 'Hourly'],
            ].map(([factor, flyio, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{factor}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{flyio}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{railway}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{isZh ? '典型场景月成本估算' : 'Monthly Cost Estimates'}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Fly.io</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '小型应用 (1 vCPU, 1GB)' : 'Small App (1 vCPU, 1GB)', '~$10-15', '$5', '$7'],
              [isZh ? '中型应用 (2 vCPU, 4GB)' : 'Medium App (2 vCPU, 4GB)', '~$35-45', '$20', '$25'],
              [isZh ? '大型应用 (4 vCPU, 8GB)' : 'Large App (4 vCPU, 8GB)', '~$80-100', '$50', '$55'],
              [isZh ? '带数据库 (Postgres)' : 'With PostgreSQL', '+$7-15', '+$5', '+$7'],
            ].map(([scenario, flyio, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{flyio}</td>
                <td style={{ ...tdStyle, color: '#f59e0b', fontWeight: 700 }}>{railway}</td>
                <td style={tdStyle}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Fly.io</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '全球区域' : 'Global Regions', '30+', '9', '8'],
              [isZh ? '冷启动时间' : 'Cold Start', '~50ms', '~1-2s', '~2-5s'],
              [isZh ? '网络延迟 (全球)' : 'Network Latency', isZh ? '极低 (边缘)' : 'Very Low (Edge)', isZh ? '低' : 'Low', isZh ? '低' : 'Low'],
              [isZh ? '自动扩展' : 'Auto-scaling', '✓ Fly Autoscale', '✓', '✓ (付费计划)'],
              [isZh ? '负载均衡' : 'Load Balancing', isZh ? '内置全局' : 'Built-in Global', '✓', '✓'],
              [isZh ? 'CDN集成' : 'CDN Integration', isZh ? '内置' : 'Built-in', '✓', '✓ Cloudflare'],
              [isZh ? 'SSL证书' : 'SSL Certificates', isZh ? '自动' : 'Automatic', isZh ? '自动' : 'Automatic', isZh ? '自动' : 'Automatic'],
            ].map(([metric, flyio, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#8b5cf6' }}>{flyio}</td>
                <td style={tdStyle}>{railway}</td>
                <td style={tdStyle}>{render}</td>
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
              <th style={thStyle}>Fly.io</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Docker支持' : 'Docker Support', '✓', '✓', '✓'],
              [isZh ? 'GitHub集成' : 'GitHub Integration', '✓', '✓', '✓'],
              [isZh ? 'GitLab集成' : 'GitLab Integration', '✓', '✗', '✓'],
              [isZh ? '零停机部署' : 'Zero-downtime Deploy', '✓', '✓', '✓'],
              [isZh ? '回滚' : 'Rollbacks', '✓', '✓ 即时', '✓'],
              [isZh ? '环境变量' : 'Environment Variables', '✓', '✓', '✓'],
              [isZh ? '密钥管理' : 'Secrets Management', '✓', '✓', '✓'],
              [isZh ? '日志' : 'Logging', '✓', '✓', '✓'],
              [isZh ? '监控' : 'Monitoring', isZh ? '基础' : 'Basic', '✓', '✓'],
              [isZh ? 'Cron任务' : 'Cron Jobs', '✓ Machines', '✓', '✓ Cron Jobs'],
              [isZh ? '后台工作者' : 'Background Workers', '✓', '✓', '✓'],
              [isZh ? '私有网络' : 'Private Networking', '✓', '✓', '✓'],
              [isZh ? '团队协作' : 'Team Collaboration', '✓', '✓', '✓'],
              [isZh ? 'API访问' : 'API Access', '✓ GraphQL', '✓ GraphQL', '✓ REST'],
              [isZh ? 'Terraform提供者' : 'Terraform Provider', '✓', '✓', '✓'],
              [isZh ? 'SOC 2合规' : 'SOC 2 Compliance', '✗', '✗', '✓'],
              [isZh ? 'HIPAA就绪' : 'HIPAA Ready', '✗', '✗', '✓'],
            ].map(([feature, flyio, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{flyio}</td>
                <td style={tdStyle}>{railway}</td>
                <td style={{ ...tdStyle, color: render === '✓' ? '#22c55e' : 'inherit' }}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deployment Experience */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <pre style={codeStyle}><code>{`# Fly.io Deployment
# Install CLI
curl -L https://fly.io/install.sh | sh

# Login and launch
fly auth login
fly launch

# Deploy
fly deploy

# Scale globally
fly scale count 3 --region lax,sea,sjc

# Railway Deployment
# Connect GitHub repo at railway.app
# Or use CLI:
npm i -g @railway/cli
railway login
railway init
railway up

# Render Deployment
# Connect GitHub/GitLab at dashboard.render.com
# Or use render.yaml:
services:
  - type: web
    name: my-app
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start`}</code></pre>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #8b5cf6' }}>
          <strong style={{ color: '#8b5cf6' }}>Fly.io</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'CLI 功能强大，支持完整的资源管理。fly launch 可自动检测框架并生成配置。部署速度中等（~30-60秒），但全局分发需要额外时间。适合喜欢命令行的开发者。' : 'Powerful CLI for complete resource management. fly launch auto-detects frameworks and generates config. Deployment speed is moderate (~30-60s), but global distribution takes extra time. Great for CLI enthusiasts.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Railway</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '部署体验最快（~10-30秒）。GitHub 集成无缝，推送即部署。UI 直观，可视化编辑环境变量和配置。即时回滚是亮点。最适合快速迭代。' : 'Fastest deployment experience (~10-30s). Seamless GitHub integration with push-to-deploy. Intuitive UI for visual editing of environment variables and config. Instant rollbacks are a highlight. Best for rapid iteration.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Render</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '部署速度中等（~1-3分钟）。render.yaml 支持基础设施即代码。蓝绿部署保证零停机。审核流程完善，适合团队协作和企业级应用。' : 'Moderate deployment speed (~1-3 minutes). render.yaml supports infrastructure as code. Blue-green deployments ensure zero downtime. Robust review process, suitable for team collaboration and enterprise apps.'}
          </p>
        </div>
      </div>

      {/* Database Support */}
      <h2 style={h2Style}>{ct.databaseTitle}</h2>
      <p style={pStyle}>{ct.databaseIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '数据库' : 'Database'}</th>
              <th style={thStyle}>Fly.io</th>
              <th style={thStyle}>Railway</th>
              <th style={thStyle}>Render</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', '✓', '✓', '✓'],
              ['MySQL', '✗', '✓', '✗'],
              ['Redis', '✓', '✓', '✓'],
              ['MongoDB', '✗', '✓', '✗'],
              ['SQLite', '✓', '✓', '✗'],
              ['ClickHouse', '✗', '✓', '✗'],
              ['MariaDB', '✗', '✓', '✗'],
              ['PostgREST', '✗', '✓', '✗'],
              [isZh ? '自动备份' : 'Auto Backups', '✓', '✓', '✓'],
              [isZh ? '连接池' : 'Connection Pooling', '✓', '✓', '✓'],
              [isZh ? '只读副本' : 'Read Replicas', '✓', '✗', '✓'],
              [isZh ? '高可用' : 'High Availability', '✓', '✗', '✓ (付费)'],
            ].map(([db, flyio, railway, render], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{db}</td>
                <td style={tdStyle}>{flyio}</td>
                <td style={{ ...tdStyle, color: railway === '✓' ? '#f59e0b' : 'inherit' }}>{railway}</td>
                <td style={tdStyle}>{render}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.flyioBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '全球分布式应用' : 'Globally distributed apps'}</li>
            <li>{isZh ? '边缘计算需求' : 'Edge computing needs'}</li>
            <li>{isZh ? '低延迟要求' : 'Low latency requirements'}</li>
            <li>{isZh ? 'Docker容器化应用' : 'Docker containerized apps'}</li>
            <li>{isZh ? '微服务架构' : 'Microservices architecture'}</li>
            <li>{isZh ? '需要精细计费控制' : 'Granular billing control'}</li>
            <li>{isZh ? '多区域部署' : 'Multi-region deployment'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.railwayBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '初创公司和副业项目' : 'Startups and side projects'}</li>
            <li>{isZh ? '需要多种数据库' : 'Multiple database needs'}</li>
            <li>{isZh ? '开发者体验优先' : 'Developer experience first'}</li>
            <li>{isZh ? 'GitHub工作流集成' : 'GitHub workflow integration'}</li>
            <li>{isZh ? '预算有限的项目' : 'Budget-constrained projects'}</li>
            <li>{isZh ? '快速迭代部署' : 'Fast iteration deployment'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.renderBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要SOC 2/HIPAA合规' : 'SOC 2/HIPAA compliance'}</li>
            <li>{isZh ? '静态站点托管' : 'Static site hosting'}</li>
            <li>{isZh ? '零停机部署要求' : 'Zero-downtime requirements'}</li>
            <li>{isZh ? '团队协作项目' : 'Team collaboration projects'}</li>
            <li>{isZh ? '可预测的定价' : 'Predictable pricing'}</li>
            <li>{isZh ? '受监管行业' : 'Regulated industries'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/docker-compose-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Docker Compose Generator</a> • {' '}
        <a href={`/${lang}/tools/environment-variables`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Env Variables</a>
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
