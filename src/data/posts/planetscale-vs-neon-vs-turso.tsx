'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'PlanetScale vs Neon vs Turso: Serverless Database Comparison 2025',
    intro: 'Choosing the right serverless database in 2025? PlanetScale, Neon, and Turso represent three distinct approaches to modern database infrastructure. This comprehensive comparison covers performance, pricing, features, and real-world use cases to help you make the best choice for your project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'PlanetScale excels with MySQL compatibility and branching workflows. Neon offers the best PostgreSQL experience with serverless architecture and database branching. Turso leads in edge computing with SQLite compatibility and the lowest read costs. For most new projects in 2025, choose Neon for PostgreSQL needs, PlanetScale for MySQL ecosystems, and Turso for edge-first applications.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'PlanetScale: MySQL-compatible with powerful branching, ideal for teams with MySQL expertise',
    takeaway2: 'Neon: PostgreSQL-native serverless with branching, best DX for Postgres developers',
    takeaway3: 'Turso: SQLite at the edge with lowest latency, perfect for globally distributed apps',
    takeaway4: 'Turso offers the lowest read pricing at $0.10/million rows vs PlanetScale\'s $0.40',
    takeaway5: 'PlanetScale provides the most generous free tier: 1 billion row reads/month',
    takeaway6: 'All three support database branching for development workflows',
    
    whatIsPlanetScaleTitle: 'What is PlanetScale?',
    whatIsPlanetScaleContent: 'PlanetScale is a serverless MySQL-compatible database platform built on Vitess, the same technology that powers YouTube. Founded in 2018, it pioneered database branching for development workflows. PlanetScale offers a familiar MySQL experience with modern serverless benefits like automatic scaling, no connection pooling concerns, and branching for safe schema changes.',
    
    whatIsNeonTitle: 'What is Neon?',
    whatIsNeonContent: 'Neon is a serverless PostgreSQL platform designed specifically for modern cloud development. Founded in 2021, it introduced the concept of serverless Postgres with database branching and instant scaling. Neon separates storage and compute, enabling features like point-in-time branching, automatic scaling to zero when idle, and branching workflows similar to Git.',
    
    whatIsTursoTitle: 'What is Turso?',
    whatIsTursoContent: 'Turso is an edge database platform built on libSQL (a SQLite fork) designed for globally distributed applications. Founded in 2022, it brings SQLite\'s simplicity and performance to the edge computing era. Turso allows you to embed databases at the edge, close to your users, with micro-second latency and automatic replication.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world performance metrics across different scenarios:',
    
    latencyTitle: 'Latency Comparison',
    latencyIntro: 'Average query latency from different regions:',
    
    throughputTitle: 'Throughput & Scalability',
    throughputIntro: 'Maximum sustainable throughput and scaling behavior:',
    
    coldStartTitle: 'Cold Start Performance',
    coldStartIntro: 'Time to first query after idle period:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Detailed pricing breakdown for each platform (2025):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing key features across platforms:',
    
    branchingTitle: 'Database Branching',
    branchingIntro: 'How each platform handles database branching:',
    
    scalingTitle: 'Scaling & Regions',
    scalingIntro: 'Global distribution and scaling capabilities:',
    
    dxTitle: 'Developer Experience',
    dxIntro: 'Development workflow and tooling comparison:',
    
    whenToUseTitle: 'When to Use Each Platform',
    planetScaleBestFor: 'Use PlanetScale When:',
    neonBestFor: 'Use Neon When:',
    tursoBestFor: 'Use Turso When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Each platform excels in different scenarios. PlanetScale is ideal for teams invested in the MySQL ecosystem who need enterprise-grade branching workflows. Neon offers the best PostgreSQL serverless experience with excellent developer tooling. Turso leads for edge-first applications requiring ultra-low latency globally. Consider your existing tech stack, scaling needs, and deployment architecture when choosing. For most new serverless projects in 2025, Neon provides the best balance of features and PostgreSQL compatibility.',
    
    faq1q: 'Which database is best for serverless functions?',
    faq1a: 'All three work well with serverless. Neon has the fastest cold starts (sub-100ms) and scales to zero automatically. Turso offers the lowest latency from edge locations. PlanetScale handles connection pooling automatically, which is crucial for serverless environments.',
    
    faq2q: 'Can I migrate from MySQL to PlanetScale?',
    faq2a: 'Yes, PlanetScale is MySQL-compatible, so migration is straightforward. You can import existing MySQL databases using their import tool or mysqldump. The Vitess layer handles sharding and scaling transparently.',
    
    faq3q: 'Does Neon support all PostgreSQL extensions?',
    faq3a: 'Neon supports most popular PostgreSQL extensions including pg_vector, PostGIS, hstore, and others. Some extensions requiring superuser access may have limitations. Check their documentation for the complete list of supported extensions.',
    
    faq4q: 'How does Turso achieve edge latency?',
    faq4a: 'Turso replicates your database to edge locations worldwide using libSQL. Each read replica is embedded close to users, enabling micro-second latency. Writes are asynchronously replicated to maintain consistency.',
    
    faq5q: 'Which has the best free tier?',
    faq5a: 'It depends on usage patterns. PlanetScale offers 1 billion row reads/month free. Neon provides 0.5GB storage with unlimited projects. Turso gives 9GB total storage. For high-read applications, PlanetScale\'s free tier is most generous. For storage-heavy needs, Turso offers more capacity.',
    
    faq6q: 'Can I use these with Prisma/Drizzle?',
    faq6a: 'All three platforms work with modern ORMs. Neon and PlanetScale have official Prisma integrations. Turso works with Drizzle ORM via the libSQL driver. All support standard database connection protocols.',
    
    faq7q: 'How does database branching work?',
    faq7a: 'All three platforms offer Git-like branching. You can create a branch from production, make schema changes or test migrations, then promote or merge back. This enables safe development workflows without affecting production data.',
    
    faq8q: 'Which is most cost-effective at scale?',
    faq8a: 'Turso has the lowest read costs ($0.10/million rows). For read-heavy applications, Turso is most economical. For write-heavy workloads, compare based on your specific patterns. All three offer volume discounts at enterprise scale.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'PlanetScale vs Neon vs Turso：2025年无服务器数据库对比',
    intro: '在2025年选择合适的无服务器数据库？PlanetScale、Neon和Turso代表了现代数据库基础设施的三种不同方法。本全面比较涵盖性能、定价、功能和真实用例，帮助你为项目做出最佳选择。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'PlanetScale以MySQL兼容性和分支工作流著称。Neon提供最佳PostgreSQL体验，采用无服务器架构和数据库分支。Turso在边缘计算领域领先，具有SQLite兼容性和最低的读取成本。对于2025年的大多数新项目，PostgreSQL需求选择Neon，MySQL生态系统选择PlanetScale，边缘优先应用选择Turso。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'PlanetScale：MySQL兼容，强大的分支功能，适合有MySQL经验的团队',
    takeaway2: 'Neon：PostgreSQL原生无服务器，分支支持，为Postgres开发者提供最佳体验',
    takeaway3: 'Turso：边缘SQLite，最低延迟，适合全球分布式应用',
    takeaway4: 'Turso提供最低的读取定价：每百万行$0.10，而PlanetScale为$0.40',
    takeaway5: 'PlanetScale提供最慷慨的免费额度：每月10亿行读取',
    takeaway6: '三个平台都支持数据库分支开发工作流',
    
    whatIsPlanetScaleTitle: '什么是PlanetScale？',
    whatIsPlanetScaleContent: 'PlanetScale是基于Vitess构建的无服务器MySQL兼容数据库平台，Vitess也是支撑YouTube的技术。成立于2018年，它率先将数据库分支引入开发工作流。PlanetScale提供熟悉的MySQL体验，同时具备现代无服务器优势：自动扩展、无需担心连接池、安全模式变更的分支功能。',
    
    whatIsNeonTitle: '什么是Neon？',
    whatIsNeonContent: 'Neon是专为现代云开发设计的无服务器PostgreSQL平台。成立于2021年，它引入了无服务器Postgres概念，支持数据库分支和即时扩展。Neon将存储和计算分离，实现了时间点分支、空闲时自动缩放到零、类似Git的分支工作流等功能。',
    
    whatIsTursoTitle: '什么是Turso？',
    whatIsTursoContent: 'Turso是基于libSQL（SQLite分支）构建的边缘数据库平台，专为全球分布式应用设计。成立于2022年，它将SQLite的简单性和性能带入边缘计算时代。Turso允许你在边缘嵌入数据库，靠近用户，实现微秒级延迟和自动复制。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同场景下的真实性能指标：',
    
    latencyTitle: '延迟对比',
    latencyIntro: '不同地区的平均查询延迟：',
    
    throughputTitle: '吞吐量与扩展性',
    throughputIntro: '最大可持续吞吐量和扩展行为：',
    
    coldStartTitle: '冷启动性能',
    coldStartIntro: '空闲后首次查询的时间：',
    
    pricingTitle: '定价对比',
    pricingIntro: '各平台详细定价明细（2025年）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '各平台关键功能比较：',
    
    branchingTitle: '数据库分支',
    branchingIntro: '各平台如何处理数据库分支：',
    
    scalingTitle: '扩展与地域',
    scalingIntro: '全球分布和扩展能力：',
    
    dxTitle: '开发体验',
    dxIntro: '开发工作流和工具对比：',
    
    whenToUseTitle: '何时使用各平台',
    planetScaleBestFor: '使用PlanetScale的场景：',
    neonBestFor: '使用Neon的场景：',
    tursoBestFor: '使用Turso的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '每个平台在不同场景下各有优势。PlanetScale适合已投资MySQL生态系统且需要企业级分支工作流的团队。Neon提供最佳PostgreSQL无服务器体验和出色的开发工具。Turso在需要超低全球延迟的边缘优先应用中领先。选择时考虑你现有的技术栈、扩展需求和部署架构。对于2025年大多数新的无服务器项目，Neon在功能和PostgreSQL兼容性之间提供了最佳平衡。',
    
    faq1q: '哪个数据库最适合无服务器函数？',
    faq1a: '三者都能很好地配合无服务器。Neon冷启动最快（低于100ms）并自动缩放到零。Turso从边缘位置提供最低延迟。PlanetScale自动处理连接池，这对无服务器环境至关重要。',
    
    faq2q: '我可以从MySQL迁移到PlanetScale吗？',
    faq2a: '可以，PlanetScale兼容MySQL，迁移很直接。你可以使用他们的导入工具或mysqldump导入现有MySQL数据库。Vitess层透明地处理分片和扩展。',
    
    faq3q: 'Neon支持所有PostgreSQL扩展吗？',
    faq3a: 'Neon支持大多数流行的PostgreSQL扩展，包括pg_vector、PostGIS、hstore等。一些需要超级用户权限的扩展可能有限制。请查看他们的文档获取完整支持列表。',
    
    faq4q: 'Turso如何实现边缘延迟？',
    faq4a: 'Turso使用libSQL将你的数据库复制到全球边缘位置。每个读取副本都嵌入在靠近用户的位置，实现微秒级延迟。写入操作异步复制以保持一致性。',
    
    faq5q: '哪个免费额度最好？',
    faq5a: '取决于使用模式。PlanetScale每月免费提供10亿行读取。Neon提供0.5GB存储和无限项目。Turso提供9GB总存储。对于高读取应用，PlanetScale的免费额度最慷慨。对于存储密集型需求，Turso提供更多容量。',
    
    faq6q: '我可以将这些与Prisma/Drizzle一起使用吗？',
    faq6a: '三个平台都支持现代ORM。Neon和PlanetScale有官方Prisma集成。Turso通过libSQL驱动程序与Drizzle ORM配合使用。所有平台都支持标准数据库连接协议。',
    
    faq7q: '数据库分支如何工作？',
    faq7a: '三个平台都提供类似Git的分支。你可以从生产环境创建分支，进行模式更改或测试迁移，然后提升或合并回来。这实现了不影响生产数据的安全开发工作流。',
    
    faq8q: '大规模时哪个最经济？',
    faq8a: 'Turso读取成本最低（每百万行$0.10）。对于读取密集型应用，Turso最经济。对于写入密集型工作负载，根据你的具体模式进行比较。三个平台都提供企业级批量折扣。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PlanetScaleVsNeonVsTurso({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '平台概览' : 'Platform Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#f472b6' }}>{ct.whatIsPlanetScaleTitle}</h3>
      <p style={pStyle}>{ct.whatIsPlanetScaleContent}</p>

      <h3 style={{ ...h3Style, color: '#22d3ee' }}>{ct.whatIsNeonTitle}</h3>
      <p style={pStyle}>{ct.whatIsNeonContent}</p>

      <h3 style={{ ...h3Style, color: '#fbbf24' }}>{ct.whatIsTursoTitle}</h3>
      <p style={pStyle}>{ct.whatIsTursoContent}</p>

      {/* Overview Table */}
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库引擎' : 'Database Engine', 'MySQL (Vitess)', 'PostgreSQL', 'SQLite (libSQL)'],
              [isZh ? '主要定位' : 'Primary Focus', 'Branching & Scale', 'Serverless Postgres', 'Edge Computing'],
              [isZh ? '成立年份' : 'Founded', '2018', '2021', '2022'],
              [isZh ? '免费额度' : 'Free Tier', '1B row reads/mo', '0.5GB storage', '9GB storage'],
              [isZh ? '读取定价' : 'Read Pricing', '$0.40/million rows', '$0.12/million rows', '$0.10/million rows'],
              [isZh ? '数据库分支' : 'Branching', '✓', '✓', '✓'],
              [isZh ? '边缘部署' : 'Edge Deploy', '✗', 'Limited', '✓ Native'],
            ].map(([feature, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{turso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.latencyTitle}</h3>
      <p style={pStyle}>{ct.latencyIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '地区' : 'Region'}</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '美国东部' : 'US East', '8-15ms', '10-20ms', '2-5ms'],
              [isZh ? '美国西部' : 'US West', '15-25ms', '15-30ms', '2-5ms'],
              [isZh ? '欧洲' : 'Europe', '25-40ms', '20-35ms', '2-5ms'],
              [isZh ? '亚太地区' : 'Asia Pacific', '50-80ms', '45-70ms', '2-5ms'],
              [isZh ? '边缘位置' : 'Edge (nearest)', 'N/A', 'N/A', '<1ms'],
            ].map(([region, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{region}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 600 }}>{turso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.throughputTitle}</h3>
      <p style={pStyle}>{ct.throughputIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '最大并发连接' : 'Max Concurrent Conns', '10,000+', '10,000+', 'Unlimited'],
              [isZh ? '自动扩展' : 'Auto-scaling', '✓', '✓', '✓'],
              [isZh ? '连接池' : 'Connection Pooling', 'Built-in', 'Built-in', 'N/A (edge)'],
              [isZh ? '写入吞吐' : 'Write Throughput', 'High', 'Medium-High', 'Medium'],
            ].map(([metric, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{turso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.coldStartTitle}</h3>
      <p style={pStyle}>{ct.coldStartIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f472b6' }}>
          <strong style={{ color: '#f472b6' }}>PlanetScale</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            ~500ms - {isZh ? '计算层需要预热，但连接池已就绪' : 'Compute layer warmup needed, but connection pool ready'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22d3ee' }}>
          <strong style={{ color: '#22d3ee' }}>Neon</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            ~50-100ms - {isZh ? '专为无服务器设计，冷启动极快' : 'Designed for serverless, extremely fast cold starts'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #fbbf24' }}>
          <strong style={{ color: '#fbbf24' }}>Turso</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            &lt;10ms - {isZh ? '边缘部署，几乎无冷启动' : 'Edge deployment, virtually no cold start'}
          </p>
        </div>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '定价项' : 'Pricing'}</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '读取' : 'Reads', '$0.40/million rows', '$0.12/million rows', '$0.10/million rows'],
              [isZh ? '写入' : 'Writes', '$1.00/million rows', '$1.30/million rows', '$0.50/million rows'],
              [isZh ? '存储' : 'Storage', '$1.00/GB/mo', '$0.12/GB/mo', '$0.50/GB/mo'],
              [isZh ? '免费读取' : 'Free Reads', '1 billion/mo', '19 million/mo', 'Unlimited (9GB)'],
              [isZh ? '免费存储' : 'Free Storage', '5GB', '0.5GB', '9GB total'],
              [isZh ? '免费项目' : 'Free Projects', '1', 'Unlimited', '3 databases'],
            ].map(([item, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{turso}</td>
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
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库分支' : 'Database Branching', '✓ Full', '✓ Full', '✓ Basic'],
              [isZh ? '模式迁移' : 'Schema Migrations', '✓ Safe', '✓ Standard', '✓ Manual'],
              [isZh ? '时间点恢复' : 'Point-in-Time Recovery', '✓', '✓', '✓'],
              [isZh ? '自动备份' : 'Auto Backups', '✓ Daily', '✓ Continuous', '✓ Continuous'],
              [isZh ? '多区域复制' : 'Multi-region Replication', '✓', 'Limited', '✓ Edge'],
              [isZh ? '横向扩展' : 'Horizontal Scaling', '✓ Vitess', '✓ Auto', '✓ Embedded'],
              [isZh ? '全文搜索' : 'Full-text Search', '✓ MySQL', '✓ Postgres', '✓ SQLite FTS5'],
              [isZh ? '向量搜索' : 'Vector Search', '✗', '✓ pgvector', '✗'],
              [isZh ? 'Web控制台' : 'Web Console', '✓ Excellent', '✓ Good', '✓ Basic'],
            ].map(([feature, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{turso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Branching */}
      <h2 style={h2Style}>{ct.branchingTitle}</h2>
      <p style={pStyle}>{ct.branchingIntro}</p>

      <pre style={codeStyle}><code>{`# PlanetScale Branching
# Create a development branch
pscale branch create my-db dev-branch

# Make schema changes safely
pscale shell my-db dev-branch
> ALTER TABLE users ADD COLUMN phone VARCHAR(20);

# Create deploy request (like PR for databases)
pscale deploy-request create my-db dev-branch

# Neon Branching
# Create instant branch
neon branches create --project-id my-project dev-branch

# Connect to branch
psql postgres://user:pass@ep-dev-branch.us-east-2.aws.neon.tech/neondb

# Reset or promote branch
neon branches reset dev-branch --parent
neon branches set-primary dev-branch

# Turso Branching
# Create database branch
turso db create my-db-dev --from my-db

# List all databases/branches
turso db list

# Replicate to edge locations
turso db replicate my-db fra  # Frankfurt`}</code></pre>

      {/* Developer Experience */}
      <h2 style={h2Style}>{ct.dxTitle}</h2>
      <p style={pStyle}>{ct.dxIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '工具/特性' : 'Tool/Feature'}</th>
              <th style={{ ...thStyle, color: '#f472b6' }}>PlanetScale</th>
              <th style={{ ...thStyle, color: '#22d3ee' }}>Neon</th>
              <th style={{ ...thStyle, color: '#fbbf24' }}>Turso</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['CLI', 'pscale', 'neon', 'turso'],
              ['Prisma', '✓ Official', '✓ Official', '✗'],
              ['Drizzle', '✓', '✓', '✓ Official'],
              [isZh ? '服务端驱动' : 'Serverless Drivers', 'Node.js', 'HTTP/WebSocket', 'libSQL/HTTP'],
              [isZh ? 'ORM兼容性' : 'ORM Compatibility', 'All MySQL ORMs', 'All Postgres ORMs', 'Drizzle, Kysely'],
              [isZh ? '本地开发' : 'Local Development', 'pscale cli', 'neon local', 'turso dev'],
            ].map(([tool, ps, neon, turso], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{tool}</td>
                <td style={tdStyle}>{ps}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{turso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={codeStyle}><code>{`// Connection Examples

// PlanetScale with Prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // mysql://...@aws.connect.psdb.cloud/db
}

// Neon with Prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // postgres://...@ep-xyz.neon.tech/neondb
}

// Turso with Drizzle
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://my-db.turso.io',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

// Neon serverless driver (edge-optimized)
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const users = await sql\`SELECT * FROM users\`;`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f472b6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f472b6' }}>{ct.planetScaleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'MySQL生态系统' : 'MySQL ecosystem'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '需要分片的超大规模' : 'Sharding at scale'}</li>
            <li>{isZh ? '复杂模式迁移' : 'Complex schema migrations'}</li>
            <li>{isZh ? '团队协作分支' : 'Team branching workflows'}</li>
            <li>{isZh ? '高读取量应用' : 'High read volume apps'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22d3ee' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22d3ee' }}>{ct.neonBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'PostgreSQL项目' : 'PostgreSQL projects'}</li>
            <li>{isZh ? '无服务器函数' : 'Serverless functions'}</li>
            <li>{isZh ? 'AI/向量搜索' : 'AI/vector search (pgvector)'}</li>
            <li>{isZh ? 'Prisma用户' : 'Prisma users'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '开发/测试分支' : 'Dev/test branching'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #fbbf24' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#fbbf24' }}>{ct.tursoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '边缘计算应用' : 'Edge computing apps'}</li>
            <li>{isZh ? '全球分布式用户' : 'Globally distributed users'}</li>
            <li>{isZh ? '超低延迟需求' : 'Ultra-low latency needs'}</li>
            <li>{isZh ? '嵌入式/IoT' : 'Embedded/IoT'}</li>
            <li>{isZh ? '本地优先应用' : 'Local-first apps'}</li>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
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
        <a href={`/${lang}/tools/sql-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>SQL Formatter</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
