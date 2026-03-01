'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Neon vs Supabase: Serverless PostgreSQL Comparison',
    intro: 'Serverless PostgreSQL has revolutionized how developers deploy and scale databases. Neon and Supabase are the two leading platforms offering managed PostgreSQL with unique approaches. This comprehensive guide compares features, pricing, performance, and developer experience to help you choose the right platform for your application.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Neon excels with its serverless architecture, branch-based workflows, and pay-per-use pricing ideal for variable workloads. Supabase shines with its all-in-one platform approach, including authentication, storage, and real-time subscriptions. Choose Neon for pure database needs with maximum scale-to-zero efficiency; choose Supabase for full-stack applications needing integrated services.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Neon offers true serverless scaling with instant branch creation and scale-to-zero',
    takeaway2: 'Supabase provides a complete backend platform beyond just PostgreSQL',
    takeaway3: 'Neon\'s branching feature enables database-per-tenant and preview environments',
    takeaway4: 'Supabase Realtime enables live data synchronization out of the box',
    takeaway5: 'Both offer generous free tiers; pricing diverges based on usage patterns',
    takeaway6: 'Neon is better for multi-tenant SaaS; Supabase is better for rapid full-stack development',
    
    whatIsNeonTitle: 'What is Neon?',
    whatIsNeonContent: 'Neon is a serverless PostgreSQL platform built on a revolutionary architecture that separates storage and compute. Founded in 2021 by former PostgreSQL contributors, Neon enables instant database branching, scale-to-zero capabilities, and pay-per-use pricing. Its unique storage engine allows for nearly instantaneous cloning of databases of any size.',
    
    whatIsSupabaseTitle: 'What is Supabase?',
    whatIsSupabaseContent: 'Supabase is an open-source Firebase alternative that provides a complete backend platform built on PostgreSQL. Founded in 2020, Supabase offers not just managed PostgreSQL but also authentication, instant APIs, real-time subscriptions, and storage. It aims to be a one-stop solution for building applications without managing multiple services.',
    
    architectureTitle: 'Architecture Comparison',
    architectureIntro: 'Understanding how each platform works under the hood:',
    
    neonArchTitle: 'Neon Serverless Architecture',
    neonArchContent: 'Neon separates storage and compute. The storage layer is a custom-built, multi-tenant system that maintains the actual data pages. Compute nodes (PostgreSQL instances) are ephemeral and can be scaled independently. This enables instant branching (copy-on-write), automatic scaling, and true scale-to-zero where you pay nothing when the database is idle.',
    
    supabaseArchTitle: 'Supabase Platform Architecture',
    supabaseArchContent: 'Supabase runs standard PostgreSQL on dedicated or shared infrastructure. Each project gets its own PostgreSQL instance. The platform adds a realtime server for WebSocket subscriptions, GoTrue for authentication, and a storage API. This provides more predictable performance but without the scale-to-zero capabilities of Neon.',
    
    branchingTitle: 'Database Branching',
    branchingIntro: 'One of Neon\'s standout features is database branching - a game-changer for development workflows:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing the capabilities of each platform:',
    
    performanceTitle: 'Performance Analysis',
    performanceIntro: 'Real-world performance characteristics:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding costs for different usage patterns:',
    
    freeTierTitle: 'Free Tier Comparison',
    
    useCasesTitle: 'When to Use Each Platform',
    neonBestFor: 'Neon is Best For:',
    supabaseBestFor: 'Supabase is Best For:',
    
    integrationTitle: 'Integration and Ecosystem',
    integrationIntro: 'How each platform integrates with the broader ecosystem:',
    
    migrationTitle: 'Migration Guide',
    migrationIntro: 'Moving between platforms or from self-hosted PostgreSQL:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Neon and Supabase offer compelling serverless PostgreSQL solutions, but they serve different needs. Neon\'s architecture is optimized for variable workloads, multi-tenant applications, and scenarios requiring database branching. Supabase excels when you need a complete backend platform with authentication, storage, and real-time features. Many developers even use both: Neon for production databases requiring scale-to-zero efficiency, and Supabase for rapid prototyping and applications needing integrated services.',
    
    faq1q: 'Can I use Supabase Auth with Neon database?',
    faq1a: 'Yes, you can use Supabase Auth as a standalone service with a Neon database. However, this requires manual integration as they are separate services. You would use Supabase Auth for authentication and Neon for data storage, connecting them via your application code.',
    
    faq2q: 'Does Neon support PostGIS and other PostgreSQL extensions?',
    faq2a: 'Neon supports many popular PostgreSQL extensions including PostGIS for geospatial data, pgvector for vector operations, and common extensions like pg_trgm, uuid-ossp, and more. However, the extension support may not be as extensive as self-hosted PostgreSQL.',
    
    faq3q: 'How does Supabase Realtime work?',
    faq3a: 'Supabase Realtime uses PostgreSQL\'s logical replication to listen for database changes and broadcasts them via WebSocket connections. This enables live data synchronization without polling. It supports INSERT, UPDATE, DELETE events and can be filtered by user permissions.',
    
    faq4q: 'Is Neon truly serverless?',
    faq4a: 'Yes, Neon is architected as a serverless database. Compute resources can scale to zero when idle (after a configurable timeout), meaning you pay only for storage during idle periods. When a query comes in, the compute node starts within milliseconds.',
    
    faq5q: 'Can I export data from these platforms?',
    faq5a: 'Both platforms allow data export. Supabase provides a SQL dump feature and allows connections from standard PostgreSQL clients. Neon supports pg_dump and logical replication for migrations. Neither platform locks in your data.',
    
    faq6q: 'Which is better for a startup with unpredictable traffic?',
    faq6a: 'Neon is generally better for unpredictable traffic due to its scale-to-zero capability and pay-per-use compute pricing. You won\'t pay for compute resources during idle periods. Supabase charges for always-on instances, which can be more expensive for sporadic workloads.',
    
    faq7q: 'Do these platforms support connection pooling?',
    faq7a: 'Yes, both support connection pooling. Supabase includes PgBouncer by default. Neon has built-in connection pooling with configurable pool sizes. This is essential for serverless applications that may create many short-lived connections.',
    
    faq8q: 'Can I run these platforms on my own infrastructure?',
    faq8a: 'Supabase is open-source and can be self-hosted. Neon\'s core technology is also open-sourced, but the full platform as a service is only available through their managed offering. For self-hosted alternatives, consider standard PostgreSQL with connection pooling.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Neon vs Supabase：无服务器PostgreSQL对比',
    intro: '无服务器PostgreSQL彻底改变了开发者部署和扩展数据库的方式。Neon和Supabase是两个领先的平台，提供具有独特方法的托管PostgreSQL。本指南全面比较功能、定价、性能和开发者体验，帮助你为应用选择合适的平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Neon凭借其无服务器架构、基于分支的工作流和按需付费定价在可变工作负载方面表现出色。Supabase以其一体化平台方法脱颖而出，包括认证、存储和实时订阅。选择Neon用于纯数据库需求并最大化缩放到零的效率；选择Supabase用于需要集成服务的全栈应用。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Neon提供真正的无服务器扩展，支持即时分支创建和缩放到零',
    takeaway2: 'Supabase提供超越PostgreSQL的完整后端平台',
    takeaway3: 'Neon的分支功能支持每租户数据库和预览环境',
    takeaway4: 'Supabase Realtime开箱即用地实现实时数据同步',
    takeaway5: '两者都提供慷慨的免费层；定价基于使用模式而分化',
    takeaway6: 'Neon更适合多租户SaaS；Supabase更适合快速全栈开发',
    
    whatIsNeonTitle: '什么是Neon？',
    whatIsNeonContent: 'Neon是一个基于革命性架构构建的无服务器PostgreSQL平台，将存储和计算分离。Neon由前PostgreSQL贡献者于2021年创立，支持即时数据库分支、缩放到零功能和按需付费定价。其独特的存储引擎允许几乎即时克隆任何大小的数据库。',
    
    whatIsSupabaseTitle: '什么是Supabase？',
    whatIsSupabaseContent: 'Supabase是一个开源的Firebase替代品，提供基于PostgreSQL的完整后端平台。Supabase成立于2020年，不仅提供托管PostgreSQL，还提供认证、即时API、实时订阅和存储。它旨在成为构建应用的一站式解决方案，无需管理多个服务。',
    
    architectureTitle: '架构对比',
    architectureIntro: '了解每个平台在底层如何工作：',
    
    neonArchTitle: 'Neon无服务器架构',
    neonArchContent: 'Neon将存储和计算分离。存储层是一个定制的多租户系统，维护实际的数据页。计算节点（PostgreSQL实例）是临时的，可以独立扩展。这支持即时分支（写时复制）、自动扩展和真正的缩放到零，当数据库空闲时你无需支付任何费用。',
    
    supabaseArchTitle: 'Supabase平台架构',
    supabaseArchContent: 'Supabase在专用或共享基础设施上运行标准PostgreSQL。每个项目获得自己的PostgreSQL实例。平台添加了用于WebSocket订阅的实时服务器、用于认证的GoTrue和存储API。这提供了更可预测的性能，但没有Neon的缩放到零功能。',
    
    branchingTitle: '数据库分支',
    branchingIntro: 'Neon的突出功能之一是数据库分支——这是开发工作流的变革者：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较每个平台的功能：',
    
    performanceTitle: '性能分析',
    performanceIntro: '真实世界的性能特征：',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解不同使用模式的成本：',
    
    freeTierTitle: '免费层对比',
    
    useCasesTitle: '何时使用每个平台',
    neonBestFor: 'Neon 最适合：',
    supabaseBestFor: 'Supabase 最适合：',
    
    integrationTitle: '集成和生态系统',
    integrationIntro: '每个平台如何与更广泛的生态系统集成：',
    
    migrationTitle: '迁移指南',
    migrationIntro: '在平台之间或从自托管PostgreSQL迁移：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Neon和Supabase都提供引人注目的无服务器PostgreSQL解决方案，但它们服务于不同的需求。Neon的架构针对可变工作负载、多租户应用和需要数据库分支的场景进行了优化。Supabase在你需要具有认证、存储和实时功能的完整后端平台时表现出色。许多开发者甚至同时使用两者：Neon用于需要缩放到零效率的生产数据库，Supabase用于快速原型设计和需要集成服务的应用。',
    
    faq1q: '我可以将Supabase Auth与Neon数据库一起使用吗？',
    faq1a: '是的，你可以将Supabase Auth作为独立服务与Neon数据库一起使用。然而，这需要手动集成，因为它们是独立的服务。你将使用Supabase Auth进行认证，使用Neon进行数据存储，通过应用代码连接它们。',
    
    faq2q: 'Neon支持PostGIS和其他PostgreSQL扩展吗？',
    faq2a: 'Neon支持许多流行的PostgreSQL扩展，包括用于地理空间数据的PostGIS、用于向量操作的pgvector以及pg_trgm、uuid-ossp等常见扩展。但是，扩展支持可能不如自托管PostgreSQL广泛。',
    
    faq3q: 'Supabase Realtime如何工作？',
    faq3a: 'Supabase Realtime使用PostgreSQL的逻辑复制来监听数据库变更，并通过WebSocket连接广播它们。这实现了实时数据同步而无需轮询。它支持INSERT、UPDATE、DELETE事件，可以按用户权限过滤。',
    
    faq4q: 'Neon是真正的无服务器吗？',
    faq4a: '是的，Neon被架构为无服务器数据库。计算资源可以在空闲时缩放到零（在可配置的超时后），意味着在空闲期间你只需支付存储费用。当查询进来时，计算节点在毫秒内启动。',
    
    faq5q: '我可以从这些平台导出数据吗？',
    faq5a: '两个平台都允许数据导出。Supabase提供SQL转储功能，并允许从标准PostgreSQL客户端连接。Neon支持pg_dump和逻辑复制进行迁移。两个平台都不会锁定你的数据。',
    
    faq6q: '对于流量不可预测的初创公司，哪个更好？',
    faq6a: 'Neon通常更适合不可预测的流量，因为它具有缩放到零功能和按需付费计算定价。在空闲期间你不会为计算资源付费。Supabase对始终在线的实例收费，对于零星工作负载可能更昂贵。',
    
    faq7q: '这些平台支持连接池吗？',
    faq7a: '是的，两者都支持连接池。Supabase默认包含PgBouncer。Neon具有内置连接池，可配置池大小。这对于可能创建许多短连接的 serverless 应用至关重要。',
    
    faq8q: '我可以在自己的基础设施上运行这些平台吗？',
    faq8a: 'Supabase是开源的，可以自托管。Neon的核心技术也已开源，但完整的平台即服务仅通过其托管产品提供。对于自托管替代品，请考虑使用标准PostgreSQL并配合连接池。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NeonVsSupabasePostgres({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '平台概述' : 'Platform Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#00e5a0' }}>{ct.whatIsNeonTitle}</h3>
      <p style={pStyle}>{ct.whatIsNeonContent}</p>

      <h3 style={{ ...h3Style, color: '#3ecf8e' }}>{ct.whatIsSupabaseTitle}</h3>
      <p style={pStyle}>{ct.whatIsSupabaseContent}</p>

      {/* Architecture */}
      <h2 style={h2Style}>{ct.architectureTitle}</h2>
      <p style={pStyle}>{ct.architectureIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #00e5a0' }}>
          <strong style={{ color: '#00e5a0' }}>{ct.neonArchTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.neonArchContent}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3ecf8e' }}>
          <strong style={{ color: '#3ecf8e' }}>{ct.supabaseArchTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.supabaseArchContent}</p>
        </div>
      </div>

      {/* Features Comparison */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'PostgreSQL版本' : 'PostgreSQL Version', '15, 16', '15, 16'],
              [isZh ? '自动扩展' : 'Auto-scaling', isZh ? '是，包括缩放到零' : 'Yes, including scale-to-zero', isZh ? '否（固定实例）' : 'No (fixed instances)'],
              [isZh ? '数据库分支' : 'Database Branching', isZh ? '原生支持，即时' : 'Native, instant', isZh ? '有限（仅通过CLI）' : 'Limited (CLI only)'],
              [isZh ? '认证' : 'Authentication', isZh ? '需外部服务' : 'External service required', 'GoTrue (内置)'],
              [isZh ? '实时订阅' : 'Realtime Subscriptions', isZh ? '需外部服务' : 'External service required', 'Realtime (内置)'],
              [isZh ? '文件存储' : 'File Storage', isZh ? '需外部服务' : 'External service required', 'Storage API (内置)'],
              [isZh ? '边缘函数' : 'Edge Functions', isZh ? '需外部服务' : 'External service required', 'Deno Edge Functions'],
              [isZh ? '连接池' : 'Connection Pooling', isZh ? '内置PgBouncer' : 'Built-in PgBouncer', 'PgBouncer'],
              [isZh ? '只读副本' : 'Read Replicas', isZh ? '通过分支' : 'Via branching', isZh ? '是' : 'Yes'],
              [isZh ? '时间点恢复' : 'Point-in-time Recovery', isZh ? '是（7-30天）' : 'Yes (7-30 days)', isZh ? '是（7-90天）' : 'Yes (7-90 days)'],
              [isZh ? '扩展支持' : 'Extensions', '50+', '60+'],
              [isZh ? 'VPC/私有网络' : 'VPC/Private Network', isZh ? '企业版' : 'Enterprise', isZh ? '企业版' : 'Enterprise'],
            ].map(([feature, neon, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Branching Feature */}
      <h2 style={h2Style}>{ct.branchingTitle}</h2>
      <p style={pStyle}>{ct.branchingIntro}</p>

      <pre style={codeStyle}><code>{`// Neon Branching Example - Create branches for dev/staging

// Main production database
// → main (production)
//   → dev_branch (development)
//   → feature_auth (feature work)
//   → pr_123 (preview for PR #123)

// Create a branch via API
const branch = await fetch('https://api.neon.tech/v2/projects/my-project/branches', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer \${NEON_API_KEY}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    branch: {
      parent_id: 'main-branch-id',
      name: 'feature-stripe-integration',
    },
  }),
});

// Use cases for branching:
// 1. Database-per-tenant isolation
// 2. Preview environments for every PR
// 3. Safe schema migrations testing
// 4. Production debugging without risk
// 5. Analytics workloads without impacting prod`}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动时间' : 'Cold Start Time', '~50ms', 'N/A (始终运行)'],
              [isZh ? '查询延迟（热）' : 'Query Latency (warm)', '5-20ms', '5-15ms'],
              [isZh ? '连接建立' : 'Connection Establishment', '10-30ms', '5-10ms'],
              [isZh ? '最大并发' : 'Max Concurrent Connections', '10,000+', '200-600'],
              [isZh ? '存储性能' : 'Storage Performance', isZh ? '基于NVMe' : 'NVMe-based', isZh ? '基于SSD' : 'SSD-based'],
              [isZh ? '分支创建时间' : 'Branch Creation Time', '< 1 second', 'N/A'],
            ].map(([metric, neon, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <h3 style={h3Style}>{ct.freeTierTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '资源' : 'Resource'}</th>
              <th style={thStyle}>Neon Free</th>
              <th style={thStyle}>Supabase Free</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库数量' : 'Databases', 'Unlimited projects', '2 projects'],
              [isZh ? '存储' : 'Storage', '500 MB', '500 MB'],
              [isZh ? '计算资源' : 'Compute', '0.25 vCPU (auto-suspend)', 'Shared (always-on)'],
              [isZh ? '带宽' : 'Bandwidth', 'Unlimited', '2 GB/month'],
              [isZh ? 'API请求' : 'API Requests', 'Unlimited', 'Unlimited'],
              [isZh ? '连接池' : 'Connection Pooling', isZh ? '无限' : 'Unlimited', isZh ? '无限' : 'Unlimited'],
              [isZh ? '分支' : 'Branching', isZh ? '无限分支' : 'Unlimited branches', 'N/A'],
            ].map(([resource, neon, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{resource}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{isZh ? '付费层对比' : 'Paid Tier Comparison'}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '层级' : 'Tier'}</th>
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Starter', '$0 (pay for usage beyond free)', '$0 (pay as you go)'],
              ['Pro', '$19/month + compute', '$25/month + usage'],
              ['Team/Scale', '$69/month + compute', '$599/month'],
              ['Enterprise', isZh ? '定制' : 'Custom', isZh ? '定制' : 'Custom'],
            ].map(([tier, neon, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{tier}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00e5a0' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00e5a0' }}>{ct.neonBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多租户SaaS应用' : 'Multi-tenant SaaS applications'}</li>
            <li>{isZh ? '流量可变的工作负载' : 'Variable traffic workloads'}</li>
            <li>{isZh ? '数据库分支工作流' : 'Database branching workflows'}</li>
            <li>{isZh ? '每个PR的预览环境' : 'Preview environments per PR'}</li>
            <li>{isZh ? '成本敏感的应用' : 'Cost-sensitive applications'}</li>
            <li>{isZh ? '已拥有认证/存储方案' : 'Already have auth/storage solutions'}</li>
            <li>{isZh ? '纯PostgreSQL需求' : 'Pure PostgreSQL needs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3ecf8e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3ecf8e' }}>{ct.supabaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速全栈开发' : 'Rapid full-stack development'}</li>
            <li>{isZh ? '实时应用（聊天、游戏）' : 'Real-time apps (chat, games)'}</li>
            <li>{isZh ? '需要内置认证' : 'Need built-in authentication'}</li>
            <li>{isZh ? '文件存储需求' : 'File storage requirements'}</li>
            <li>{isZh ? '初创公司MVP开发' : 'Startup MVP development'}</li>
            <li>{isZh ? '无服务器函数' : 'Serverless functions'}</li>
            <li>{isZh ? 'Firebase迁移' : 'Firebase migrations'}</li>
          </ul>
        </div>
      </div>

      {/* Integration */}
      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <pre style={codeStyle}><code>{`// Neon with Prisma/Drizzle
// .env
DATABASE_URL="postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/dbname?sslmode=require"

// prisma/schema.prisma
// Neon works with any ORM that supports PostgreSQL
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Using with connection pooling (recommended for serverless)
DATABASE_URL="postgresql://user:pass@ep-xyz-pooler.us-east-1.aws.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/dbname?sslmode=require"

// Supabase with client libraries
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

// Database queries
const { data: users, error } = await supabase
  .from('users')
  .select('*')
  .eq('status', 'active')

// Realtime subscriptions
const subscription = supabase
  .channel('users')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'users' },
    (payload) => console.log('Change received!', payload)
  )
  .subscribe()

// Authentication
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})`}</code></pre>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// From self-hosted to Neon
# 1. Export your existing database
pg_dump -h localhost -U postgres -d mydb > mydb.sql

# 2. Create Neon database and get connection string
# 3. Import to Neon
psql "postgresql://user:pass@ep-xyz.us-east-1.aws.neon.tech/dbname" < mydb.sql

# From Neon to Supabase (or vice versa)
# 1. Use pg_dump to export
pg_dump "\$NEON_CONNECTION_STRING" > backup.sql

# 2. Import to Supabase
psql "\$SUPABASE_CONNECTION_STRING" < backup.sql

# For large databases, consider using logical replication
# or tools like @snaplet/snap for subsetted copies`}</code></pre>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,229,160,0.1), rgba(62,207,142,0.1))', borderRadius: 12, border: '1px solid rgba(0,229,160,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#00e5a0', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#00e5a0', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/sql-formatter`} style={{ color: '#00e5a0', textDecoration: 'none' }}>SQL Formatter</a>
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
