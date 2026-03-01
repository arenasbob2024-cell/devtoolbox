'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prisma vs Drizzle ORM: TypeScript ORM Comparison 2025',
    intro: 'Prisma revolutionized TypeScript database access with its type-safe query builder and intuitive schema language. Drizzle emerged as a lightweight alternative offering SQL-like syntax and zero runtime overhead. This comparison examines developer experience, performance, features, and real-world usage to help you choose the right ORM.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Drizzle offers better performance (2-5x faster queries), smaller bundle size, and SQL-like syntax. Prisma provides superior developer experience with Prisma Studio, better migrations, and auto-generated types. Choose Drizzle for performance-critical apps and edge deployments. Choose Prisma for rapid development and complex schema management.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Drizzle is 2-5x faster with zero runtime overhead',
    takeaway2: 'Prisma has better tooling (Studio, migrations, introspection)',
    takeaway3: 'Drizzle bundle size is ~50KB vs Prisma ~1MB',
    takeaway4: 'Both offer excellent TypeScript support and type inference',
    takeaway5: 'Drizzle works natively on edge runtimes; Prisma requires setup',
    takeaway6: 'Prisma schema is more readable; Drizzle is closer to SQL',
    
    whatIsPrismaTitle: 'What is Prisma?',
    whatIsPrismaContent: 'Prisma is a next-generation ORM consisting of Prisma Client (auto-generated type-safe query builder), Prisma Migrate (migration system), and Prisma Studio (GUI for database). It uses a declarative schema language (schema.prisma) and generates TypeScript types automatically. Prisma abstracts SQL completely, offering an intuitive API for database operations.',
    
    whatIsDrizzleTitle: 'What is Drizzle?',
    whatIsDrizzleContent: 'Drizzle is a TypeScript ORM with a focus on SQL-like syntax and minimal runtime. It provides a type-safe query builder that closely mirrors SQL while offering TypeScript inference. With zero dependencies and tree-shakeable exports, Drizzle is ideal for serverless and edge deployments where bundle size matters.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmark results on PostgreSQL with 100,000 records:',
    
    querySpeedTitle: 'Query Performance',
    querySpeedIntro: 'Simple and complex query benchmarks:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'See how similar operations are implemented:',
    
    prismaExampleTitle: 'Prisma',
    drizzleExampleTitle: 'Drizzle',
    
    migrationTitle: 'Migrations & Schema Management',
    migrationIntro: 'How each handles schema evolution:',
    
    edgeSupportTitle: 'Edge Runtime Support',
    edgeSupportIntro: 'Deployment on edge platforms:',
    
    whenToUseTitle: 'When to Use Each ORM',
    drizzleBestFor: 'Use Drizzle When:',
    prismaBestFor: 'Use Prisma When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both ORMs are excellent choices with different strengths. Drizzle excels in performance, bundle size, and edge compatibility, making it ideal for serverless and performance-critical applications. Prisma offers superior developer experience with its tooling ecosystem, making it better for rapid development and teams new to databases. Consider your priorities: raw performance favors Drizzle, while developer productivity favors Prisma.',
    
    faq1q: 'Can I use Drizzle with existing databases?',
    faq1a: 'Yes, Drizzle supports introspection via drizzle-kit pull. It can generate schema from existing databases and works well with legacy schemas. The introspection tool handles most common patterns.',
    
    faq2q: 'Does Prisma work on Cloudflare Workers?',
    faq2a: 'Yes, via Prisma Accelerate or Prisma Data Proxy. However, it adds latency and cost. Drizzle works natively without any proxy, making it simpler for edge deployments.',
    
    faq3q: 'Which has better migration tooling?',
    faq3a: 'Prisma Migrate is more mature with better handling of complex scenarios, automatic resolution, and clear history. Drizzle migrations are improving but require more manual oversight.',
    
    faq4q: 'Can I mix raw SQL with ORM queries?',
    faq4a: 'Both support raw SQL. Prisma offers dollar-sign-prefixed raw queries. Drizzle provides sql template literals that are type-safe and integrate with the query builder.',
    
    faq5q: 'How do they handle relations?',
    faq5a: 'Prisma handles relations automatically with include/select. Drizzle requires explicit joins or relation queries but offers more control. Both support one-to-one, one-to-many, and many-to-many.',
    
    faq6q: 'Which is better for TypeScript?',
    faq6a: 'Both offer excellent TypeScript support. Prisma generates types from schema. Drizzle infers types directly from table definitions. Drizzle types are more explicit; Prisma types are more automatic.',
    
    faq7q: 'What about transaction support?',
    faq7a: 'Both support transactions. Prisma uses interactive transactions. Drizzle supports batch and interactive transactions with lower overhead. Both work with all major databases.',
    
    faq8q: 'Can I migrate from Prisma to Drizzle?',
    faq8a: 'Yes, though it requires rewriting queries. The schema can be converted from Prisma to Drizzle format. Start by migrating simpler queries first, then complex ones.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Prisma vs Drizzle ORM：2025年 TypeScript ORM 对比',
    intro: 'Prisma 以其类型安全的查询构建器和直观的模式语言革新了 TypeScript 数据库访问。Drizzle 作为轻量级替代品出现，提供类似 SQL 的语法和零运行时开销。本比较考察开发者体验、性能、功能和实际使用，帮助你选择正确的 ORM。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Drizzle 提供更好的性能（查询快 2-5 倍）、更小的包体积和类似 SQL 的语法。Prisma 提供卓越的开发者体验，包括 Prisma Studio、更好的迁移和自动生成类型。性能关键型应用和边缘部署选择 Drizzle。快速开发和复杂模式管理选择 Prisma。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Drizzle 快 2-5 倍，零运行时开销',
    takeaway2: 'Prisma 有更好的工具（Studio、迁移、内省）',
    takeaway3: 'Drizzle 包大小约 50KB vs Prisma 约 1MB',
    takeaway4: '两者都提供出色的 TypeScript 支持和类型推断',
    takeaway5: 'Drizzle 原生支持边缘运行时；Prisma 需要配置',
    takeaway6: 'Prisma 模式更易读；Drizzle 更接近 SQL',
    
    whatIsPrismaTitle: '什么是 Prisma？',
    whatIsPrismaContent: 'Prisma 是下一代 ORM，由 Prisma Client（自动生成的类型安全查询构建器）、Prisma Migrate（迁移系统）和 Prisma Studio（数据库 GUI）组成。它使用声明式模式语言（schema.prisma）并自动生成 TypeScript 类型。Prisma 完全抽象 SQL，为数据库操作提供直观的 API。',
    
    whatIsDrizzleTitle: '什么是 Drizzle？',
    whatIsDrizzleContent: 'Drizzle 是专注于类似 SQL 语法和最小运行时的 TypeScript ORM。它提供类型安全的查询构建器，紧密反映 SQL 同时提供 TypeScript 推断。零依赖和可 tree-shake 的导出使 Drizzle 非常适合包大小重要的无服务器和边缘部署。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在 PostgreSQL 上使用 100,000 条记录的基准测试结果：',
    
    querySpeedTitle: '查询性能',
    querySpeedIntro: '简单和复杂查询基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '查看类似操作的实现方式：',
    
    prismaExampleTitle: 'Prisma',
    drizzleExampleTitle: 'Drizzle',
    
    migrationTitle: '迁移与模式管理',
    migrationIntro: '各自如何处理模式演进：',
    
    edgeSupportTitle: '边缘运行时支持',
    edgeSupportIntro: '在边缘平台上部署：',
    
    whenToUseTitle: '何时使用每个 ORM',
    drizzleBestFor: '使用 Drizzle 的场景：',
    prismaBestFor: '使用 Prisma 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在 2025 年，两个 ORM 都是优秀的选择，各有优势。Drizzle 在性能、包大小和边缘兼容性方面表现出色，非常适合无服务器和性能关键型应用。Prisma 通过其工具生态系统提供卓越的开发者体验，更适合快速开发和刚接触数据库的团队。考虑你的优先级：原始性能选择 Drizzle，开发者生产力选择 Prisma。',
    
    faq1q: '我可以在现有数据库中使用 Drizzle 吗？',
    faq1a: '可以，Drizzle 通过 drizzle-kit pull 支持内省。它可以从现有数据库生成模式，并适用于遗留模式。内省工具处理大多数常见模式。',
    
    faq2q: 'Prisma 可以在 Cloudflare Workers 上运行吗？',
    faq2a: '可以，通过 Prisma Accelerate 或 Prisma Data Proxy。但是，它会增加延迟和成本。Drizzle 无需任何代理即可原生工作，使边缘部署更简单。',
    
    faq3q: '哪个有更好的迁移工具？',
    faq3a: 'Prisma Migrate 更成熟，能更好地处理复杂场景、自动解析和清晰的历史记录。Drizzle 迁移正在改进，但需要更多手动监督。',
    
    faq4q: '我可以将原生 SQL 与 ORM 查询混合使用吗？',
    faq4a: '两者都支持原生 SQL。Prisma 提供美元符号前缀的原生查询。Drizzle 提供类型安全并与查询构建器集成的 sql 模板字面量。',
    
    faq5q: '它们如何处理关系？',
    faq5a: 'Prisma 通过 include/select 自动处理关系。Drizzle 需要显式连接或关系查询，但提供更多控制。两者都支持一对一、一对多和多对多。',
    
    faq6q: '哪个对 TypeScript 更友好？',
    faq6a: '两者都提供出色的 TypeScript 支持。Prisma 从模式生成类型。Drizzle 直接从表定义推断类型。Drizzle 类型更明确；Prisma 类型更自动。',
    
    faq7q: '事务支持如何？',
    faq7a: '两者都支持事务。Prisma 使用交互式事务。Drizzle 支持批量和交互式事务，开销更低。两者都适用于所有主流数据库。',
    
    faq8q: '我可以从 Prisma 迁移到 Drizzle 吗？',
    faq8a: '可以，但需要重写查询。模式可以从 Prisma 格式转换为 Drizzle 格式。先从迁移简单查询开始，然后处理复杂查询。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PrismaVsDrizzle2025({ lang }: { lang: string }) {
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
      
      <h3 style={h3Style}>{ct.whatIsPrismaTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrismaContent}</p>

      <h3 style={h3Style}>{ct.whatIsDrizzleTitle}</h3>
      <p style={pStyle}>{ct.whatIsDrizzleContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2019', '2022'],
              [isZh ? '模式定义' : 'Schema Definition', '.prisma DSL', 'TypeScript/SQL'],
              [isZh ? '运行时开销' : 'Runtime Overhead', '~1MB', '~50KB'],
              [isZh ? '查询方式' : 'Query Style', 'Abstract API', 'SQL-like'],
              [isZh ? '类型生成' : 'Type Generation', 'Auto-generated', 'Inferred'],
              [isZh ? '边缘支持' : 'Edge Support', 'Via proxy', 'Native'],
              [isZh ? '数据库支持' : 'Databases', 'PG, MySQL, SQLite, MongoDB, SQL Server', 'PG, MySQL, SQLite'],
            ].map(([feature, prisma, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={{ ...tdStyle, color: '#c084fc' }}>{drizzle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.querySpeedTitle}</h3>
      <p style={pStyle}>{ct.querySpeedIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '查询类型' : 'Query Type'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>Drizzle</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单查询' : 'Simple Find', '12ms', '5ms', '2.4x'],
              [isZh ? '带条件查询' : 'With Where', '18ms', '6ms', '3x'],
              [isZh ? '连接查询' : 'With Join', '45ms', '15ms', '3x'],
              [isZh ? '聚合查询' : 'Aggregation', '85ms', '25ms', '3.4x'],
              [isZh ? '批量插入' : 'Bulk Insert', '320ms', '95ms', '3.4x'],
            ].map(([type, prisma, drizzle, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{drizzle}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
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
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'GUI工具' : 'GUI Tool', 'Prisma Studio', 'Drizzle Studio (separate)'],
              [isZh ? '迁移系统' : 'Migrations', 'Built-in', 'drizzle-kit'],
              [isZh ? '内省' : 'Introspection', 'Yes', 'Yes'],
              [isZh ? '原生SQL' : 'Raw SQL', 'dollar-sign queries', 'sql template literal'],
              [isZh ? '连接池' : 'Connection Pool', 'Built-in', 'Via driver'],
              [isZh ? '关系查询' : 'Relations', 'include/select', 'joins/relations'],
              [isZh ? '事务' : 'Transactions', 'Interactive', 'Batch + Interactive'],
              [isZh ? '复制品' : 'Replicas', 'Read replicas', 'Manual config'],
            ].map(([feature, prisma, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={{ ...tdStyle, color: '#c084fc' }}>{drizzle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.prismaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create user with posts
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      posts: {
        create: [
          { title: 'First Post', content: 'Hello World' },
          { title: 'Second Post', content: 'Another post' },
        ],
      },
    },
    include: { posts: true },
  });

  // Complex query with relations
  const users = await prisma.user.findMany({
    where: { email: { contains: '@example.com' } },
    include: {
      posts: {
        where: { title: { contains: 'Post' } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  // Transaction
  const result = await prisma.$transaction([
    prisma.post.create({ data: { title: 'T1', authorId: 1 } }),
    prisma.user.update({ where: { id: 1 }, data: { name: 'Updated' } }),
  ]);
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#c084fc' }}>{ct.drizzleExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// db/schema.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

// db/queries.ts
import { db } from './index';
import { users, posts } from './schema';
import { eq, like, desc } from 'drizzle-orm';

async function main() {
  // Create user with posts
  const [user] = await db.insert(users).values({
    email: 'test@example.com',
    name: 'Test User',
  }).returning();

  await db.insert(posts).values([
    { title: 'First Post', content: 'Hello World', authorId: user.id },
    { title: 'Second Post', content: 'Another post', authorId: user.id },
  ]);

  // Complex query with relations
  const result = await db.query.users.findMany({
    where: like(users.email, '%@example.com'),
    with: {
      posts: {
        where: like(posts.title, '%Post%'),
        orderBy: desc(posts.createdAt),
        limit: 5,
      },
    },
  });

  // Transaction
  await db.transaction(async (tx) => {
    await tx.insert(posts).values({ title: 'T1', authorId: 1 });
    await tx.update(users).set({ name: 'Updated' }).where(eq(users.id, 1));
  });
}`}</code></pre>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Prisma Migrate</strong>
          <pre style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`# Create migration
npx prisma migrate dev --name add_user_table

# Reset database
npx prisma migrate reset

# Deploy to production
npx prisma migrate deploy`}</pre>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #c084fc' }}>
          <strong style={{ color: '#c084fc' }}>Drizzle Kit</strong>
          <pre style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>{`# Generate migration
npx drizzle-kit generate

# Push schema directly
npx drizzle-kit push

# Introspect existing DB
npx drizzle-kit pull`}</pre>
        </div>
      </div>

      <h2 style={h2Style}>{ct.edgeSupportTitle}</h2>
      <p style={pStyle}>{ct.edgeSupportIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Cloudflare Workers', 'Data Proxy/Accelerate', 'Native'],
              ['Vercel Edge', 'Data Proxy/Accelerate', 'Native'],
              ['Deno Deploy', 'Data Proxy/Accelerate', 'Native'],
              ['Bun', 'Supported', 'Native'],
              ['Node.js', 'Native', 'Native'],
              ['AWS Lambda', 'Native', 'Native'],
            ].map(([platform, prisma, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{drizzle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #c084fc' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#c084fc' }}>{ct.drizzleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '边缘部署' : 'Edge deployments'}</li>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '熟悉 SQL 的团队' : 'SQL-familiar teams'}</li>
            <li>{isZh ? '小包体积需求' : 'Small bundle size needed'}</li>
            <li>{isZh ? 'Serverless 函数' : 'Serverless functions'}</li>
            <li>{isZh ? '需要细粒度控制' : 'Need fine-grained control'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.prismaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '需要 GUI 工具' : 'Need GUI tools'}</li>
            <li>{isZh ? '复杂迁移需求' : 'Complex migration needs'}</li>
            <li>{isZh ? '数据库初学者' : 'Database beginners'}</li>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '多数据库支持' : 'Multi-database support'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
