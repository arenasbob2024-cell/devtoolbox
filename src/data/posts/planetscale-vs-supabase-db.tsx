'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'PlanetScale vs Supabase Database: Serverless Database Comparison',
    intro: 'PlanetScale and Supabase offer different approaches to serverless databases. PlanetScale provides a MySQL-compatible serverless database with branching and non-blocking schema changes, while Supabase offers a PostgreSQL-based platform with built-in authentication, storage, and real-time features. This comparison helps you choose the right database for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose PlanetScale if you need MySQL compatibility, branch-based schema management, and zero-downtime migrations. Choose Supabase if you want PostgreSQL with built-in auth, storage, real-time subscriptions, and a complete backend-as-a-service. For teams already comfortable with PostgreSQL, Supabase offers more integrated features.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'PlanetScale is MySQL-compatible, Supabase is PostgreSQL-based',
    takeaway2: 'PlanetScale offers database branching for safe schema changes',
    takeaway3: 'Supabase includes auth, storage, real-time, and edge functions',
    takeaway4: 'PlanetScale has no cold starts, Supabase may have brief cold starts',
    takeaway5: 'Supabase is open-source and self-hostable, PlanetScale is proprietary',
    takeaway6: 'PlanetScale excels at scaling, Supabase excels at developer velocity',
    
    whatIsPlanetScaleTitle: 'What is PlanetScale?',
    whatIsPlanetScaleContent: 'PlanetScale is a serverless MySQL-compatible database platform built on Vitess, the technology that scales YouTube. It introduces database branching for schema changes, allowing you to test migrations safely before deploying. With non-blocking schema changes and automatic scaling, PlanetScale is designed for teams that need reliable, scalable MySQL without operational overhead.',
    
    whatIsSupabaseTitle: 'What is Supabase Database?',
    whatIsSupabaseContent: 'Supabase is an open-source Firebase alternative built on PostgreSQL. Beyond the database, it provides authentication, storage, real-time subscriptions, and edge functions. Supabase gives you the full power of PostgreSQL with extensions like pgvector for AI applications, PostGIS for geospatial data, and built-in row-level security.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the cost structure of each platform:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing core database and platform capabilities:',
    
    branchingTitle: 'Database Branching',
    branchingIntro: 'PlanetScale unique feature for safe schema migrations:',
    
    performanceTitle: 'Performance & Scaling',
    performanceIntro: 'How each platform handles performance at scale:',
    
    developerTitle: 'Developer Experience',
    developerIntro: 'Tools and workflows for developers:',
    
    whenToUseTitle: 'When to Use Each Database',
    planetscaleBestFor: 'Use PlanetScale When:',
    supabaseBestFor: 'Use Supabase When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both PlanetScale and Supabase are excellent choices depending on your needs. Choose PlanetScale for MySQL workloads requiring safe schema migrations and extreme scalability. Choose Supabase when you want PostgreSQL power with a complete backend solution including auth, storage, and real-time features. For startups and teams prioritizing developer velocity, Supabase offers more integrated features out of the box. For enterprises with MySQL expertise and complex scaling needs, PlanetScale is the stronger choice.',
    
    faq1q: 'Can I use PlanetScale with PostgreSQL?',
    faq1a: 'No, PlanetScale is MySQL-compatible only. If you need PostgreSQL, Supabase or Neon are better alternatives. PlanetScale chose MySQL because of Vitess proven scaling technology.',
    
    faq2q: 'Does Supabase support database branching?',
    faq2a: 'Supabase supports branching but it works differently from PlanetScale. Supabase branches are separate database instances that can be merged back, while PlanetScale branches are specifically designed for schema migrations.',
    
    faq3q: 'Which is better for AI applications?',
    faq3a: 'Supabase has native pgvector support for vector embeddings, making it ideal for AI/ML applications. PlanetScale would require external vector databases like Pinecone or Weaviate for similar functionality.',
    
    faq4q: 'Can I self-host Supabase?',
    faq4a: 'Yes, Supabase is fully open-source and can be self-hosted on your own infrastructure. PlanetScale is a proprietary service with no self-hosted option.',
    
    faq5q: 'Does PlanetScale have cold starts?',
    faq5a: 'No, PlanetScale does not have cold starts. It uses a connection pooling architecture that keeps connections warm, ensuring consistent performance even after periods of inactivity.',
    
    faq6q: 'Which has better free tier?',
    faq6a: 'Supabase offers a generous free tier with 500MB database, 1GB storage, and 50,000 monthly active users. PlanetScale free tier includes 1 database, 1 billion row reads, and 10 million row writes per month.',
    
    faq7q: 'Can I migrate from MySQL to Supabase?',
    faq7a: 'Yes, but it requires converting MySQL schema and data to PostgreSQL format. Tools like pgLoader can help automate the migration. PlanetScale allows direct MySQL migration since it is MySQL-compatible.',
    
    faq8q: 'Which is better for real-time applications?',
    faq8a: 'Supabase has built-in real-time subscriptions using PostgreSQL replication. PlanetScale does not offer real-time features natively and would require additional infrastructure like Pusher or Ably.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'PlanetScale vs Supabase Database：无服务器数据库对比',
    intro: 'PlanetScale和Supabase提供不同的无服务器数据库方案。PlanetScale提供兼容MySQL的无服务器数据库，支持分支和非阻塞模式变更，而Supabase提供基于PostgreSQL的平台，内置认证、存储和实时功能。本比较帮助你为下一个项目选择合适的数据库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '如果你需要MySQL兼容性、基于分支的模式管理和零停机迁移，选择PlanetScale。如果你想要PostgreSQL并内置认证、存储、实时订阅和完整的后端即服务，选择Supabase。对于已经熟悉PostgreSQL的团队，Supabase提供更多集成功能。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'PlanetScale兼容MySQL，Supabase基于PostgreSQL',
    takeaway2: 'PlanetScale提供数据库分支用于安全模式变更',
    takeaway3: 'Supabase包含认证、存储、实时和边缘函数',
    takeaway4: 'PlanetScale无冷启动，Supabase可能有短暂冷启动',
    takeaway5: 'Supabase开源可自托管，PlanetScale是专有服务',
    takeaway6: 'PlanetScale擅长扩展，Supabase擅长开发效率',
    
    whatIsPlanetScaleTitle: '什么是PlanetScale？',
    whatIsPlanetScaleContent: 'PlanetScale是基于Vitess构建的兼容MySQL的无服务器数据库平台，Vitess是YouTube使用的扩展技术。它引入数据库分支用于模式变更，允许你在部署前安全地测试迁移。凭借非阻塞模式变更和自动扩展，PlanetScale为需要可靠、可扩展MySQL而无需运维开销的团队而设计。',
    
    whatIsSupabaseTitle: '什么是Supabase Database？',
    whatIsSupabaseContent: 'Supabase是基于PostgreSQL构建的开源Firebase替代方案。除了数据库，它还提供认证、存储、实时订阅和边缘函数。Supabase让你获得PostgreSQL的全部功能，包括用于AI应用的pgvector扩展、用于地理空间数据的PostGIS，以及内置的行级安全。',
    
    pricingTitle: '定价对比',
    pricingIntro: '了解每个平台的成本结构：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较核心数据库和平台能力：',
    
    branchingTitle: '数据库分支',
    branchingIntro: 'PlanetScale独特的安全模式迁移功能：',
    
    performanceTitle: '性能与扩展',
    performanceIntro: '每个平台如何处理规模性能：',
    
    developerTitle: '开发者体验',
    developerIntro: '面向开发者的工具和工作流：',
    
    whenToUseTitle: '何时使用每个数据库',
    planetscaleBestFor: '使用PlanetScale的场景：',
    supabaseBestFor: '使用Supabase的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，根据你的需求，PlanetScale和Supabase都是优秀的选择。对于需要安全模式迁移和极端可扩展性的MySQL工作负载，选择PlanetScale。当你想要PostgreSQL的强大功能并配以后端解决方案(包括认证、存储和实时功能)时，选择Supabase。对于优先考虑开发效率的初创公司和团队，Supabase开箱即用提供更多集成功能。对于拥有MySQL专业知识和复杂扩展需求的企业，PlanetScale是更强的选择。',
    
    faq1q: '我可以在PlanetScale中使用PostgreSQL吗？',
    faq1a: '不可以，PlanetScale仅兼容MySQL。如果你需要PostgreSQL，Supabase或Neon是更好的选择。PlanetScale选择MySQL是因为Vitess经过验证的扩展技术。',
    
    faq2q: 'Supabase支持数据库分支吗？',
    faq2a: 'Supabase支持分支，但工作方式与PlanetScale不同。Supabase分支是可以合并回去的独立数据库实例，而PlanetScale分支专门用于模式迁移。',
    
    faq3q: '哪个更适合AI应用？',
    faq3a: 'Supabase原生支持pgvector用于向量嵌入，使其非常适合AI/ML应用。PlanetScale需要外部向量数据库如Pinecone或Weaviate来实现类似功能。',
    
    faq4q: '我可以自托管Supabase吗？',
    faq4a: '可以，Supabase完全开源，可以在你自己的基础设施上自托管。PlanetScale是专有服务，没有自托管选项。',
    
    faq5q: 'PlanetScale有冷启动吗？',
    faq5a: '没有，PlanetScale没有冷启动。它使用连接池架构保持连接温暖，即使在长时间不活动后也能确保一致的性能。',
    
    faq6q: '哪个免费层更好？',
    faq6a: 'Supabase提供慷慨的免费层：500MB数据库、1GB存储、50,000月活跃用户。PlanetScale免费层包括1个数据库、每月10亿行读取和1000万行写入。',
    
    faq7q: '我可以从MySQL迁移到Supabase吗？',
    faq7a: '可以，但需要将MySQL模式和数据转换为PostgreSQL格式。pgLoader等工具可以帮助自动化迁移。PlanetScale允许直接MySQL迁移，因为它是MySQL兼容的。',
    
    faq8q: '哪个更适合实时应用？',
    faq8a: 'Supabase使用PostgreSQL复制内置实时订阅。PlanetScale不原生提供实时功能，需要额外的基础设施如Pusher或Ably。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PlanetScaleVsSupabaseDB({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #000', background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(60,179,113,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.tldrTitle}</h3>
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

      <h3 style={h3Style}>{ct.whatIsPlanetScaleTitle}</h3>
      <p style={pStyle}>{ct.whatIsPlanetScaleContent}</p>

      <h3 style={h3Style}>{ct.whatIsSupabaseTitle}</h3>
      <p style={pStyle}>{ct.whatIsSupabaseContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '计划' : 'Plan'}</th>
              <th style={thStyle}>PlanetScale</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '1 DB, 1B rows read/mo, 10M writes/mo', '2 DBs, 500MB, 50K MAU'],
              [isZh ? '入门级' : 'Hobby/Pro', '$29/mo (Scout)', '$25/mo (Pro)'],
              [isZh ? '按读取计费' : 'Per Read', '$1.25 per 1M rows', isZh ? '已包含' : 'Included'],
              [isZh ? '按写入计费' : 'Per Write', '$12.50 per 1M rows', isZh ? '已包含' : 'Included'],
              [isZh ? '存储费用' : 'Storage', '$2.50 per GB', '$0.125 per GB'],
              [isZh ? '连接池' : 'Connection Pooling', isZh ? '内置' : 'Built-in', isZh ? '内置' : 'Built-in'],
              [isZh ? '分支费用' : 'Branching', 'Free (limited)', '$0.32 per GB/hr'],
            ].map(([plan, planetscale, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{plan}</td>
                <td style={tdStyle}>{planetscale}</td>
                <td style={{ ...tdStyle, color: '#3ecf8e' }}>{supabase}</td>
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
              <th style={thStyle}>PlanetScale</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库引擎' : 'Database Engine', 'MySQL (Vitess)', 'PostgreSQL'],
              [isZh ? '数据库分支' : 'Database Branching', isZh ? '原生支持' : 'Native', isZh ? '支持' : 'Supported'],
              [isZh ? '非阻塞迁移' : 'Non-blocking Migrations', isZh ? '是' : 'Yes', isZh ? '否' : 'No'],
              [isZh ? '内置认证' : 'Built-in Auth', isZh ? '否' : 'No', isZh ? '是(RLS支持)' : 'Yes (with RLS)'],
              [isZh ? '文件存储' : 'File Storage', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '实时订阅' : 'Real-time', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '边缘函数' : 'Edge Functions', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
              [isZh ? '向量搜索' : 'Vector Search', isZh ? '否' : 'No', 'pgvector'],
              [isZh ? '自动备份' : 'Auto Backups', isZh ? '是' : 'Yes', isZh ? '是' : 'Yes'],
              [isZh ? '可自托管' : 'Self-hostable', isZh ? '否' : 'No', isZh ? '是' : 'Yes'],
            ].map(([feature, planetscale, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{planetscale}</td>
                <td style={{ ...tdStyle, color: '#3ecf8e' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.branchingTitle}</h2>
      <p style={pStyle}>{ct.branchingIntro}</p>

      <pre style={codeStyle}><code>{`// PlanetScale Database Branching

// 1. Create a branch from production
pscale branch create add-users-table main

// 2. Make schema changes in the branch
// schema.sql:
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// 3. Apply changes to branch
pscale database restore-diff mydb add-users-table --dir schema

// 4. Test changes in branch (separate data)
pscale shell mydb add-users-table

// 5. Create deploy request
pscale deploy-request create mydb add-users-table

// 6. Review and deploy (zero downtime)
pscale deploy-request deploy mydb 1

// Supabase Branching (different approach)
// 1. Create branch via dashboard or CLI
supabase branches create add-users-table

// 2. Run migrations
supabase db push

// 3. Reset branch to main
supabase branches reset add-users-table

// 4. Merge branch back
supabase branches merge add-users-table`}</code></pre>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '性能指标' : 'Performance Metric'}</th>
              <th style={thStyle}>PlanetScale</th>
              <th style={thStyle}>Supabase</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '冷启动' : 'Cold Starts', isZh ? '无' : 'None', isZh ? '短暂(~1s)' : 'Brief (~1s)'],
              [isZh ? '自动扩展' : 'Auto-scaling', isZh ? '是(Vitess分片)' : 'Yes (Vitess sharding)', isZh ? '是(计算分离)' : 'Yes (compute separation)'],
              [isZh ? '读取副本' : 'Read Replicas', isZh ? '自动' : 'Automatic', isZh ? '可配置' : 'Configurable'],
              [isZh ? '连接池' : 'Connection Pooling', isZh ? '内置' : 'Built-in', 'PgBouncer (built-in)'],
              [isZh ? '最大连接数' : 'Max Connections', isZh ? '无限(通过池)' : 'Unlimited (via pool)', isZh ? '取决于计划' : 'Plan-dependent'],
              [isZh ? '区域部署' : 'Regional Deployments', isZh ? '多区域支持' : 'Multi-region', isZh ? '多区域支持' : 'Multi-region'],
            ].map(([metric, planetscale, supabase], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{planetscale}</td>
                <td style={{ ...tdStyle, color: '#3ecf8e' }}>{supabase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.developerTitle}</h2>
      <p style={pStyle}>{ct.developerIntro}</p>

      <pre style={codeStyle}><code>{`// Developer Experience Comparison

// PLANETSCALE - MySQL with Prisma
// schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

// Query
const user = await prisma.user.findUnique({
  where: { email: "user@example.com" },
  include: { posts: true }
});

// SUPABASE - PostgreSQL with built-in features
// Schema with RLS
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  created_at timestamp default now()
);

-- Enable RLS
alter table users enable row level security;

-- Policy: Users can only see their own data
create policy "Users can view own data"
  on users for select
  using (auth.uid() = id);

// Query with client
const { data, error } = await supabase
  .from("users")
  .select("*, posts(*)")
  .eq("email", "user@example.com")
  .single();

// Real-time subscription
supabase
  .channel("users")
  .on("postgres_changes", 
    { event: "INSERT", schema: "public" },
    (payload) => console.log(payload)
  )
  .subscribe();`}</code></pre>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.planetscaleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'MySQL技术栈' : 'MySQL tech stack'}</li>
            <li>{isZh ? '需要零停机迁移' : 'Need zero-downtime migrations'}</li>
            <li>{isZh ? '频繁模式变更' : 'Frequent schema changes'}</li>
            <li>{isZh ? '高流量应用' : 'High-traffic applications'}</li>
            <li>{isZh ? '团队熟悉MySQL' : 'Team familiar with MySQL'}</li>
            <li>{isZh ? '需要水平扩展' : 'Need horizontal scaling'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3ecf8e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3ecf8e' }}>{ct.supabaseBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'PostgreSQL技术栈' : 'PostgreSQL tech stack'}</li>
            <li>{isZh ? '需要内置认证' : 'Need built-in authentication'}</li>
            <li>{isZh ? '实时应用' : 'Real-time applications'}</li>
            <li>{isZh ? 'AI/向量搜索' : 'AI/vector search'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '需要文件存储' : 'Need file storage'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(0,0,0,0.1), rgba(62,207,142,0.1))', borderRadius: 12, border: '1px solid rgba(0,0,0,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/sql-formatter'} style={{ color: '#3ecf8e', textDecoration: 'none' }}>SQL Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3ecf8e', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3ecf8e', textDecoration: 'none' }}>Base64 Encoder</a>
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
