'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Neon vs PlanetScale: Serverless Database Comparison 2025',
    intro: 'Neon and PlanetScale represent two different approaches to serverless databases. Neon is a serverless PostgreSQL platform with features like database branching and instant scaling, while PlanetScale is a MySQL-compatible serverless database built on Vitess with branching and non-blocking schema changes. This comparison helps you choose the right serverless database for your application.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Neon for PostgreSQL compatibility, branching, and if you need PostgreSQL extensions. Choose PlanetScale for MySQL compatibility, non-blocking schema changes, and horizontal scaling with sharding built-in.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Neon is PostgreSQL-based; PlanetScale is MySQL-compatible',
    takeaway2: 'Both offer database branching for development workflows',
    takeaway3: 'PlanetScale excels at schema migrations without downtime',
    takeaway4: 'Neon supports PostgreSQL extensions and ecosystem',
    takeaway5: 'Both have generous free tiers for developers',
    takeaway6: 'PlanetScale uses Vitess for horizontal scaling; Neon scales compute independently',
    
    whatIsNeonTitle: 'What is Neon?',
    whatIsNeonContent: 'Neon is a serverless PostgreSQL platform designed for modern cloud applications. It separates storage and compute, allowing instant scaling and cost efficiency. Key features include database branching (like git branches), point-in-time restore, and support for PostgreSQL extensions. Neon is built for developer experience with features like connection pooling and serverless drivers.',
    
    whatIsPlanetscaleTitle: 'What is PlanetScale?',
    whatIsPlanetscaleContent: 'PlanetScale is a serverless database platform built on Vitess, the MySQL clustering system that powers YouTube. It offers MySQL compatibility with enterprise features like branching, non-blocking schema changes, and automatic sharding. PlanetScale focuses on safe schema migrations and horizontal scalability without application changes.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Connection and usage examples:',
    
    neonExampleTitle: 'Neon Examples',
    planetscaleExampleTitle: 'PlanetScale Examples',
    
    dataSourceTitle: 'Pricing & Limits',
    dataSourceIntro: 'Pricing tiers and limitations:',
    
    alertingTitle: 'When to Choose',
    alertingIntro: 'Decision criteria:',
    
    useCasesTitle: 'Best Use Cases',
    neonBestFor: 'Neon is Best For:',
    planetscaleBestFor: 'PlanetScale is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Neon and PlanetScale serve different database needs in the serverless space. Neon brings PostgreSQL to serverless with branching and extensions, ideal for teams invested in the PostgreSQL ecosystem. PlanetScale offers MySQL compatibility with superior schema migration workflows and horizontal scaling. Your choice depends on your database preference (PostgreSQL vs MySQL) and whether you prioritize extensions (Neon) or schema migrations (PlanetScale).',
    
    faq1q: 'Can I migrate from PostgreSQL to PlanetScale?',
    faq1a: 'PlanetScale is MySQL-compatible, not PostgreSQL. Migration requires schema and query conversion. Tools like pgloader can help, but expect effort for complex schemas. If you are deeply invested in PostgreSQL, Neon is the natural choice.',
    
    faq2q: 'How do branching workflows compare?',
    faq2a: 'Both offer git-like branching for databases. Neon branches are instant copies that share data with the parent. PlanetScale branches are separate database instances that can be merged back. Neon branches are faster to create; PlanetScale offers more control over merges.',
    
    faq3q: 'What about connection limits in serverless?',
    faq3a: 'Both handle serverless connection challenges. Neon uses a proxy for connection pooling and offers a serverless driver. PlanetScale provides connection pooling through its proxy. Both work well with serverless functions and edge runtimes.',
    
    faq4q: 'Which has better free tier?',
    faq4a: 'Neon offers 0.5 GB storage, 191 hours of compute per month free. PlanetScale offers 1 database branch, 1 billion row reads, 10 million row writes per month free. Both are generous for development. PlanetScale recently changed pricing, so review current limits.',
    
    faq5q: 'How do they handle scaling?',
    faq5a: 'Neon scales compute up/down instantly and auto-suspends idle databases. Storage scales automatically. PlanetScale uses Vitess sharding for horizontal scaling, spreading data across nodes. For vertical scaling, Neon is simpler; for massive horizontal scale, PlanetScale has the edge.',
    
    faq6q: 'What PostgreSQL extensions does Neon support?',
    faq6a: 'Neon supports many extensions including pg_vector, pg_stat_statements, hstore, and more. PostGIS for geospatial, pg_cron for scheduling, and others are available. Check Neon docs for the current list as support expands.',
    
    faq7q: 'Can I use ORM with both?',
    faq7a: 'Yes, both work with popular ORMs. Neon works with Prisma, Drizzle, Kysely, TypeORM, and any PostgreSQL client. PlanetScale works with Prisma (with limitations on foreign keys), Drizzle, and MySQL clients. Prisma integration is more mature with Neon.',
    
    faq8q: 'What about data residency and regions?',
    faq8a: 'Neon offers regions in AWS (US East, EU West, Asia Pacific). PlanetScale has regions across AWS and GCP globally. Both support data residency requirements. Check their status pages for current region availability.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Neon vs PlanetScale：Serverless 数据库对比 2025',
    intro: 'Neon 和 PlanetScale 代表了无服务器数据库的两种不同方法。Neon 是一个具有数据库分支和即时扩展等功能的无服务器 PostgreSQL 平台，而 PlanetScale 是基于 Vitess 构建的 MySQL 兼容无服务器数据库，具有分支和非阻塞模式更改。本对比帮助你为应用选择合适的无服务器数据库。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为 PostgreSQL 兼容性、分支和需要 PostgreSQL 扩展选择 Neon。为 MySQL 兼容性、非阻塞模式更改和内置分片的水平扩展选择 PlanetScale。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Neon 基于 PostgreSQL；PlanetScale 兼容 MySQL',
    takeaway2: '两者都为开发工作流提供数据库分支',
    takeaway3: 'PlanetScale 在无停机模式迁移方面表现出色',
    takeaway4: 'Neon 支持 PostgreSQL 扩展和生态系统',
    takeaway5: '两者都为开发者提供慷慨的免费层',
    takeaway6: 'PlanetScale 使用 Vitess 进行水平扩展；Neon 独立扩展计算',
    
    whatIsNeonTitle: '什么是 Neon？',
    whatIsNeonContent: 'Neon 是为现代云应用设计的无服务器 PostgreSQL 平台。它分离存储和计算，允许即时扩展和成本效率。主要功能包括数据库分支（类似 git 分支）、时间点恢复和对 PostgreSQL 扩展的支持。Neon 专为开发者体验构建，具有连接池和无服务器驱动等功能。',
    
    whatIsPlanetscaleTitle: '什么是 PlanetScale？',
    whatIsPlanetscaleContent: 'PlanetScale 是基于 Vitess（支持 YouTube 的 MySQL 集群系统）构建的无服务器数据库平台。它提供 MySQL 兼容性和企业功能，如分支、非阻塞模式更改和自动分片。PlanetScale 专注于安全的模式迁移和无需应用更改的水平可扩展性。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '连接和使用示例：',
    
    neonExampleTitle: 'Neon 示例',
    planetscaleExampleTitle: 'PlanetScale 示例',
    
    dataSourceTitle: '定价与限制',
    dataSourceIntro: '定价层级和限制：',
    
    alertingTitle: '选择指南',
    alertingIntro: '决策标准：',
    
    useCasesTitle: '最佳用例',
    neonBestFor: 'Neon 最适合：',
    planetscaleBestFor: 'PlanetScale 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Neon 和 PlanetScale 在无服务器领域服务于不同的数据库需求。Neon 将 PostgreSQL 带到无服务器，具有分支和扩展功能，适合投入 PostgreSQL 生态系统的团队。PlanetScale 提供 MySQL 兼容性和卓越的模式迁移工作流及水平扩展。你的选择取决于数据库偏好（PostgreSQL vs MySQL）以及你是优先考虑扩展（Neon）还是模式迁移（PlanetScale）。',
    
    faq1q: '我可以从 PostgreSQL 迁移到 PlanetScale 吗？',
    faq1a: 'PlanetScale 兼容 MySQL，不是 PostgreSQL。迁移需要模式和查询转换。pgloader 等工具可以帮助，但复杂模式需要大量工作。如果你深度投入 PostgreSQL，Neon 是自然的选择。',
    
    faq2q: '分支工作流如何比较？',
    faq2a: '两者都提供类似 git 的数据库分支。Neon 分支是与父级共享数据的即时副本。PlanetScale 分支是可以合并回去的独立数据库实例。Neon 分支创建更快；PlanetScale 对合并提供更多控制。',
    
    faq3q: '无服务器中的连接限制如何？',
    faq3a: '两者都处理无服务器连接挑战。Neon 使用代理进行连接池并提供无服务器驱动。PlanetScale 通过其代理提供连接池。两者都与无服务器函数和边缘运行时良好配合。',
    
    faq4q: '哪个免费层更好？',
    faq4a: 'Neon 提供 0.5 GB 存储、每月 191 小时计算免费。PlanetScale 提供 1 个数据库分支、每月 10 亿次行读取、1000 万次行写入免费。两者对开发都很慷慨。PlanetScale 最近更改了定价，请查看当前限制。',
    
    faq5q: '它们如何处理扩展？',
    faq5a: 'Neon 即时扩展计算上/下并自动挂起空闲数据库。存储自动扩展。PlanetScale 使用 Vitess 分片进行水平扩展，跨节点分布数据。对于垂直扩展，Neon 更简单；对于大规模水平扩展，PlanetScale 有优势。',
    
    faq6q: 'Neon 支持哪些 PostgreSQL 扩展？',
    faq6a: 'Neon 支持许多扩展，包括 pg_vector、pg_stat_statements、hstore 等。PostGIS 用于地理空间、pg_cron 用于调度等可用。查看 Neon 文档获取当前列表，因为支持在扩展。',
    
    faq7q: '两者都可以使用 ORM 吗？',
    faq7a: '可以，两者都与流行的 ORM 一起工作。Neon 与 Prisma、Drizzle、Kysely、TypeORM 和任何 PostgreSQL 客户端一起工作。PlanetScale 与 Prisma（外键有限制）、Drizzle 和 MySQL 客户端一起工作。Prisma 与 Neon 的集成更成熟。',
    
    faq8q: '数据驻留和区域如何？',
    faq8a: 'Neon 在 AWS（美国东部、欧盟西部、亚太）提供区域。PlanetScale 在全球 AWS 和 GCP 上有区域。两者都支持数据驻留要求。查看它们的状态页面获取当前区域可用性。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function NeonVsPlanetscale({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsNeonTitle}</h3>
      <p style={pStyle}>{ct.whatIsNeonContent}</p>

      <h3 style={h3Style}>{ct.whatIsPlanetscaleTitle}</h3>
      <p style={pStyle}>{ct.whatIsPlanetscaleContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>PlanetScale</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据库引擎' : 'Database Engine', 'PostgreSQL', 'MySQL (Vitess)'],
              [isZh ? '数据库分支' : 'Database Branching', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '模式迁移' : 'Schema Migrations', isZh ? '标准 PostgreSQL' : 'Standard PostgreSQL', isZh ? '非阻塞' : 'Non-blocking'],
              [isZh ? '水平扩展' : 'Horizontal Scaling', isZh ? '有限' : 'Limited', isZh ? '原生分片' : 'Native Sharding'],
              [isZh ? '自动挂起' : 'Auto-suspend', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? '扩展支持' : 'Extensions', isZh ? '丰富' : 'Rich', isZh ? '有限' : 'Limited'],
            ].map(([feature, neon, planetscale], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{planetscale}</td>
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
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>PlanetScale</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '时间点恢复' : 'Point-in-time Restore', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '连接池' : 'Connection Pooling', isZh ? '内置代理' : 'Built-in proxy', isZh ? '内置代理' : 'Built-in proxy'],
              [isZh ? '无服务器驱动' : 'Serverless Driver', '@neondatabase/serverless', '@planetscale/database-js'],
              [isZh ? '外键' : 'Foreign Keys', isZh ? '支持' : 'Yes', isZh ? '不支持（设计决策）' : 'No (design choice)'],
              [isZh ? '地理分布' : 'Geo-distribution', isZh ? '多区域' : 'Multi-region', isZh ? '多区域' : 'Multi-region'],
              [isZh ? '最大数据库大小' : 'Max Database Size', isZh ? '按计划' : 'Plan-based', isZh ? '按计划' : 'Plan-based'],
            ].map(([cap, neon, planetscale], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{planetscale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#00e5ff' }}>{ct.neonExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Neon: Connection with serverless driver
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Query
const users = await sql\\\`SELECT * FROM users WHERE active = true\\\`

// Neon: With Drizzle ORM
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

const client = neon(process.env.DATABASE_URL)
const db = drizzle(client)

// Neon: With Prisma
// schema.prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Neon: Create a branch (CLI)
// neon branch create my-feature-branch

// Neon: Use pg_vector extension
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Enable extension
await sql\\\`CREATE EXTENSION IF NOT EXISTS vector\\\`

// Create table with vector column
await sql\\\`
  CREATE TABLE embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT,
    embedding VECTOR(1536)
  )
\\\`

// Query with vector similarity
await sql\\\`
  SELECT content, 1 - (embedding <=> $1) as similarity
  FROM embeddings
  ORDER BY embedding <=> $1
  LIMIT 10
\\\`

// Vector similarity search
await sql\`
  SELECT content, 1 - (embedding \\<\\=> \\$1) as similarity
  FROM embeddings
  ORDER BY embedding \\<\\=> \\$1
  LIMIT 10
\\\`}</code></pre>

      <h3 style={{ ...h3Style, color: '#ff6b35' }}>{ct.planetscaleExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// PlanetScale: Connection with serverless driver
import { connect } from '@planetscale/database'

const config = {
  url: process.env.DATABASE_URL
}

const conn = connect(config)

// Query
const users = await conn.execute('SELECT * FROM users WHERE active = ?', [true])

// PlanetScale: With Drizzle ORM
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

const conn = connect({ url: process.env.DATABASE_URL })
const db = drizzle(conn)

// PlanetScale: Branch workflow (CLI)
// Create a development branch
// pscale branch create my-feature-branch my-database

// Switch to branch
// pscale branch switch my-feature-branch my-database

// Open a deploy request
// pscale deploy-request create my-database my-feature-branch

// PlanetScale: Schema migration (with pscale CLI)
// Schema changes are done via deploy requests
// No direct ALTER TABLE on production

// Create schema change file
// schema.sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// Apply via deploy request
// pscale shell my-database my-branch \\< schema.sql

// PlanetScale: Connection with Prisma
// Note: Foreign keys not supported
// schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"  // Required for PlanetScale
}`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Neon</th>
              <th style={thStyle}>PlanetScale</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层存储' : 'Free Tier Storage', '0.5 GB', '1 branch, varied limits'],
              [isZh ? '免费层计算' : 'Free Tier Compute', '191 hours/month', 'Included in plan'],
              [isZh ? '自动挂起' : 'Auto-suspend', isZh ? '5 分钟无活动' : '5 min inactivity', isZh ? '不适用' : 'N/A'],
              [isZh ? '付费起始' : 'Paid Starting', '$19/month (Pro)', '$29/month (Scout)'],
              [isZh ? '企业功能' : 'Enterprise', isZh ? '可用' : 'Available', isZh ? '可用' : 'Available'],
            ].map(([cat, neon, planetscale], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{neon}</td>
                <td style={tdStyle}>{planetscale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00e5ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00e5ff' }}>{ct.neonBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'PostgreSQL 爱好者' : 'PostgreSQL enthusiasts'}</li>
            <li>{isZh ? '需要扩展（pg_vector 等）' : 'Need extensions (pg_vector, etc.)'}</li>
            <li>{isZh ? 'AI/ML 应用' : 'AI/ML applications'}</li>
            <li>{isZh ? 'Prisma 项目' : 'Prisma projects'}</li>
            <li>{isZh ? '开发/测试分支' : 'Development/testing branching'}</li>
            <li>{isZh ? '间歇性工作负载' : 'Intermittent workloads'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #ff6b35' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#ff6b35' }}>{ct.planetscaleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'MySQL 用户' : 'MySQL users'}</li>
            <li>{isZh ? '频繁模式更改' : 'Frequent schema changes'}</li>
            <li>{isZh ? '高流量应用' : 'High-traffic applications'}</li>
            <li>{isZh ? '需要水平扩展' : 'Horizontal scaling needed'}</li>
            <li>{isZh ? '零停机部署' : 'Zero-downtime deployments'}</li>
            <li>{isZh ? '企业级可靠性' : 'Enterprise reliability'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
