'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Drizzle ORM vs Prisma: TypeScript ORM Comparison 2025',
    intro: 'TypeScript ORMs have evolved significantly, with Drizzle ORM and Prisma leading the pack. Drizzle offers a SQL-like approach with minimal abstraction, while Prisma provides a comprehensive toolkit with its own schema language. This comparison helps you choose the right ORM for your TypeScript project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Drizzle ORM is lightweight, fast, and stays close to SQL - perfect for developers who want control. Prisma offers a complete solution with migrations, studio, and auto-generated types - ideal for teams wanting an all-in-one solution. Choose Drizzle for performance and flexibility, Prisma for developer experience and tooling.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Drizzle is 10-20x lighter than Prisma in bundle size',
    takeaway2: 'Prisma has built-in migrations and visual database browser',
    takeaway3: 'Drizzle uses TypeScript for schema, Prisma has its own DSL',
    takeaway4: 'Both provide excellent TypeScript type safety',
    takeaway5: 'Drizzle queries look like SQL, Prisma uses intuitive API',
    takeaway6: 'Drizzle supports edge runtimes, Prisma has limited support',
    
    whatIsDrizzleTitle: 'What is Drizzle ORM?',
    whatIsDrizzleContent: 'Drizzle ORM is a TypeScript ORM designed for SQL lovers. It provides a SQL-like query builder with full TypeScript support while staying lightweight. Drizzle lets you write queries that look like SQL, use your existing SQL knowledge, and get excellent type inference. It works with PostgreSQL, MySQL, and SQLite.',
    
    whatIsPrismaTitle: 'What is Prisma?',
    whatIsPrismaContent: 'Prisma is a next-generation ORM that includes a schema language, migration system, and database client. It uses its own declarative schema syntax (Prisma Schema) and generates a fully typed client. Prisma also includes Prisma Studio for visual database management and works with PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Benchmarks and runtime characteristics:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and tooling:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Schema definition and queries in both ORMs:',
    
    drizzleExampleTitle: 'Drizzle ORM',
    prismaExampleTitle: 'Prisma',
    
    migrationsTitle: 'Migrations Strategy',
    migrationsIntro: 'How each handles database migrations:',
    
    edgeRuntimeTitle: 'Edge Runtime Support',
    edgeRuntimeIntro: 'Compatibility with edge and serverless environments:',
    
    whenToUseTitle: 'When to Use Each',
    drizzleBestFor: 'Use Drizzle When:',
    prismaBestFor: 'Use Prisma When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both Drizzle and Prisma are excellent choices with different strengths. Drizzle appeals to developers who want SQL-like syntax, minimal abstraction, and edge runtime support. It is ideal for performance-critical applications and serverless deployments. Prisma excels with its comprehensive tooling, visual database management, and team-friendly features. For new projects, consider your team\'s SQL expertise and deployment environment. Many teams use both: Prisma for complex applications, Drizzle for edge/serverless microservices.',
    
    faq1q: 'Is Drizzle ORM production-ready?',
    faq1a: 'Yes, Drizzle is production-ready and used by many companies. It reached version 1.0 in 2024 and has a growing ecosystem. Major companies like Vercel use Drizzle in production.',
    
    faq2q: 'Can I use Prisma with edge functions?',
    faq2a: 'Prisma has limited edge runtime support through Prisma Accelerate and driver adapters. However, it is not as seamless as Drizzle, which was designed with edge support from the start.',
    
    faq3q: 'Which is faster, Drizzle or Prisma?',
    faq3a: 'Drizzle is generally faster due to its lightweight nature and lack of a separate query engine. Benchmarks show Drizzle can be 2-5x faster for simple queries. Prisma\'s performance is acceptable for most applications.',
    
    faq4q: 'How do migrations compare?',
    faq4a: 'Prisma has a mature migration system with automatic diffing and version control. Drizzle offers kit-based migrations that are more manual but give you full control. Both integrate well with CI/CD pipelines.',
    
    faq5q: 'Can I switch between Drizzle and Prisma?',
    faq5a: 'Yes, but it requires rewriting your schema and queries. Since both support standard databases, you can migrate incrementally. Start with one for new projects rather than planning to switch.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both provide excellent type safety. Drizzle uses TypeScript for schema definition, giving native IDE support. Prisma generates types from its schema file. Both infer types for queries and results.',
    
    faq7q: 'Does Drizzle support relations?',
    faq7a: 'Yes, Drizzle supports relations with its relational query API. You can define relations in your schema and query with joins. The API is more SQL-like compared to Prisma\'s nested includes.',
    
    faq8q: 'What about database providers?',
    faq8a: 'Prisma supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. Drizzle supports PostgreSQL, MySQL, and SQLite with plans for more. Both cover the most common databases.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Drizzle ORM vs Prisma：TypeScript ORM对比 2025',
    intro: 'TypeScript ORM已经显著发展，Drizzle ORM和Prisma处于领先地位。Drizzle提供类似SQL的方法和最小的抽象，而Prisma提供带有自己模式语言的全面工具包。本比较帮助你为TypeScript项目选择合适的ORM。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Drizzle ORM轻量、快速，贴近SQL——适合想要控制力的开发者。Prisma提供完整解决方案，包括迁移、studio和自动生成类型——适合需要一体化解决方案的团队。追求性能和灵活性选Drizzle，追求开发体验和工具选Prisma。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Drizzle的包体积比Prisma小10-20倍',
    takeaway2: 'Prisma内置迁移和可视化数据库浏览器',
    takeaway3: 'Drizzle用TypeScript定义模式，Prisma有自己的DSL',
    takeaway4: '两者都提供出色的TypeScript类型安全',
    takeaway5: 'Drizzle查询像SQL，Prisma使用直观的API',
    takeaway6: 'Drizzle支持边缘运行时，Prisma支持有限',
    
    whatIsDrizzleTitle: '什么是Drizzle ORM？',
    whatIsDrizzleContent: 'Drizzle ORM是为SQL爱好者设计的TypeScript ORM。它提供类似SQL的查询构建器，完全支持TypeScript，同时保持轻量。Drizzle让你编写类似SQL的查询，利用现有的SQL知识，并获得出色的类型推断。它支持PostgreSQL、MySQL和SQLite。',
    
    whatIsPrismaTitle: '什么是Prisma？',
    whatIsPrismaContent: 'Prisma是下一代ORM，包括模式语言、迁移系统和数据库客户端。它使用自己的声明式模式语法（Prisma Schema）并生成完全类型化的客户端。Prisma还包括用于可视化数据库管理的Prisma Studio，支持PostgreSQL、MySQL、SQLite、SQL Server和MongoDB。',
    
    performanceTitle: '性能对比',
    performanceIntro: '基准测试和运行时特征：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较能力和工具：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个ORM的模式定义和查询：',
    
    drizzleExampleTitle: 'Drizzle ORM',
    prismaExampleTitle: 'Prisma',
    
    migrationsTitle: '迁移策略',
    migrationsIntro: '各自如何处理数据库迁移：',
    
    edgeRuntimeTitle: '边缘运行时支持',
    edgeRuntimeIntro: '与边缘和无服务器环境的兼容性：',
    
    whenToUseTitle: '何时使用哪个',
    drizzleBestFor: '使用Drizzle的场景：',
    prismaBestFor: '使用Prisma的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Drizzle和Prisma都是优秀的选择，各有优势。Drizzle吸引喜欢SQL语法、最小抽象和边缘运行时支持的开发者。它非常适合性能关键型应用和无服务器部署。Prisma以其全面的工具、可视化数据库管理和团队友好功能脱颖而出。对于新项目，考虑团队的SQL专业知识和部署环境。许多团队同时使用两者：Prisma用于复杂应用，Drizzle用于边缘/无服务器微服务。',
    
    faq1q: 'Drizzle ORM已经可以用于生产了吗？',
    faq1a: '是的，Drizzle已经可以用于生产，被许多公司使用。它在2024年达到1.0版本，生态系统不断增长。Vercel等大公司在生产中使用Drizzle。',
    
    faq2q: '我可以在边缘函数中使用Prisma吗？',
    faq2a: 'Prisma通过Prisma Accelerate和驱动适配器提供有限的边缘运行时支持。然而，它不如Drizzle那样无缝，Drizzle从一开始就为边缘支持而设计。',
    
    faq3q: 'Drizzle和Prisma哪个更快？',
    faq3a: '由于其轻量级特性和没有单独的查询引擎，Drizzle通常更快。基准测试显示Drizzle在简单查询上可以快2-5倍。Prisma的性能对大多数应用来说是可以接受的。',
    
    faq4q: '迁移如何比较？',
    faq4a: 'Prisma有成熟的迁移系统，具有自动差异和版本控制。Drizzle提供基于kit的迁移，更手动但给你完全控制。两者都能很好地与CI/CD管道集成。',
    
    faq5q: '我可以在Drizzle和Prisma之间切换吗？',
    faq5a: '可以，但需要重写你的模式和查询。由于两者都支持标准数据库，你可以逐步迁移。新项目从一开始就选择一个，而不是计划切换。',
    
    faq6q: '哪个TypeScript支持更好？',
    faq6a: '两者都提供出色的类型安全。Drizzle使用TypeScript定义模式，提供原生IDE支持。Prisma从其模式文件生成类型。两者都能推断查询和结果的类型。',
    
    faq7q: 'Drizzle支持关联吗？',
    faq7a: '是的，Drizzle通过其关联查询API支持关联。你可以在模式中定义关联并使用join查询。API比Prisma的嵌套include更像SQL。',
    
    faq8q: '数据库提供商呢？',
    faq8a: 'Prisma支持PostgreSQL、MySQL、SQLite、SQL Server、MongoDB和CockroachDB。Drizzle支持PostgreSQL、MySQL和SQLite，计划支持更多。两者都覆盖最常见的数据库。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DrizzleOrmVsPrisma({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsDrizzleTitle}</h3>
      <p style={pStyle}>{ct.whatIsDrizzleContent}</p>

      <h3 style={h3Style}>{ct.whatIsPrismaTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrismaContent}</p>

      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Drizzle ORM</th>
              <th style={thStyle}>Prisma</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2022', '2019'],
              [isZh ? '模式定义' : 'Schema Definition', 'TypeScript', 'Prisma Schema DSL'],
              [isZh ? '查询风格' : 'Query Style', 'SQL-like', 'API-based'],
              [isZh ? '查询引擎' : 'Query Engine', isZh ? '无（直接SQL）' : 'None (direct SQL)', isZh ? '二进制引擎' : 'Binary engine'],
              [isZh ? '包大小' : 'Package Size', '~40KB', '~800KB'],
              [isZh ? '依赖数量' : 'Dependencies', '1', '10+'],
              [isZh ? '运行时要求' : 'Runtime', isZh ? '任意JS运行时' : 'Any JS runtime', isZh ? '需二进制文件' : 'Binary required'],
            ].map(([feature, drizzle, prisma], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{drizzle}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{prisma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Drizzle ORM</th>
              <th style={thStyle}>Prisma</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单查询延迟' : 'Simple Query Latency', '~2ms', '~8ms'],
              [isZh ? '复杂查询延迟' : 'Complex Query Latency', '~15ms', '~35ms'],
              [isZh ? '启动时间' : 'Startup Time', '<10ms', '~200ms'],
              [isZh ? '内存占用' : 'Memory Usage', '~10MB', '~50MB'],
              [isZh ? '包体积' : 'Bundle Size', '~40KB', '~800KB'],
              [isZh ? '冷启动影响' : 'Cold Start Impact', isZh ? '极小' : 'Minimal', isZh ? '中等' : 'Moderate'],
            ].map(([metric, drizzle, prisma], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{drizzle}</td>
                <td style={tdStyle}>{prisma}</td>
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
              <th style={thStyle}>Drizzle ORM</th>
              <th style={thStyle}>Prisma</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型安全' : 'Type Safety', isZh ? '原生TypeScript' : 'Native TypeScript', isZh ? '生成类型' : 'Generated types'],
              [isZh ? '迁移系统' : 'Migrations', 'drizzle-kit', 'Prisma Migrate'],
              [isZh ? '可视化工具' : 'Visual Tool', isZh ? '无（可用Studio）' : 'None (Studio available)', 'Prisma Studio'],
              [isZh ? '内省' : 'Introspection', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '种子数据' : 'Seeding', isZh ? '手动' : 'Manual', isZh ? '内置支持' : 'Built-in'],
              [isZh ? '多数据库' : 'Multi-DB', 'PG, MySQL, SQLite', 'PG, MySQL, SQLite, SQL Server, MongoDB'],
              [isZh ? '边缘运行时' : 'Edge Runtime', isZh ? '完全支持' : 'Full support', isZh ? '有限支持' : 'Limited'],
              [isZh ? '联表查询' : 'Joins', isZh ? 'SQL风格API' : 'SQL-style API', isZh ? 'Include API' : 'Include API'],
              [isZh ? '事务' : 'Transactions', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              [isZh ? '原始SQL' : 'Raw SQL', isZh ? '一等公民' : 'First-class', isZh ? '支持' : 'Yes'],
            ].map(([feature, drizzle, prisma], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{drizzle}</td>
                <td style={{ ...tdStyle, color: '#3b82f6' }}>{prisma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.drizzleExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Drizzle ORM - Schema and Queries
import { pgTable, serial, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, desc } from 'drizzle-orm';

// Schema defined in TypeScript
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: varchar('content'),
  authorId: integer('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Initialize
const db = drizzle(process.env.DATABASE_URL);

// Queries - SQL-like syntax
// Select all users
const allUsers = await db.select().from(users);

// Select with where clause
const user = await db.select()
  .from(users)
  .where(eq(users.email, 'test@example.com'));

// Select with join
const userPosts = await db.select()
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))
  .where(eq(users.id, 1))
  .orderBy(desc(posts.createdAt));

// Insert
const newUser = await db.insert(users)
  .values({ email: 'new@example.com', name: 'John' })
  .returning();

// Update
await db.update(users)
  .set({ name: 'Jane' })
  .where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));

// Transaction
await db.transaction(async (tx) => {
  const user = await tx.insert(users)
    .values({ email: 'tx@example.com' })
    .returning();
  await tx.insert(posts)
    .values({ title: 'First Post', authorId: user[0].id });
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.prismaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Prisma - Schema and Queries

// schema.prisma file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

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
  createdAt DateTime @default(now())
}

// Usage in TypeScript
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Queries - API-based syntax
// Select all users
const allUsers = await prisma.user.findMany();

// Select with where clause
const user = await prisma.user.findUnique({
  where: { email: 'test@example.com' }
});

// Select with include (relations)
const userPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      orderBy: { createdAt: 'desc' }
    }
  }
});

// Create
const newUser = await prisma.user.create({
  data: {
    email: 'new@example.com',
    name: 'John'
  }
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });

// Transaction
await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({
    data: { email: 'tx@example.com' }
  });
  await tx.post.create({
    data: { 
      title: 'First Post', 
      authorId: user.id 
    }
  });
});`}</code></pre>

      <h2 style={h2Style}>{ct.migrationsTitle}</h2>
      <p style={pStyle}>{ct.migrationsIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Drizzle Migrations</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '使用drizzle-kit生成迁移SQL文件。可以推送到数据库或手动执行SQL。支持内省现有数据库。迁移是纯SQL，给你完全控制。' : 'Use drizzle-kit to generate migration SQL files. Can push to database or execute SQL manually. Supports introspecting existing databases. Migrations are pure SQL, giving you full control.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Prisma Migrate</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '自动从schema.prisma生成迁移。内置版本控制和历史。支持迁移回滚和原型开发模式。更自动化，但灵活性稍低。' : 'Automatically generates migrations from schema.prisma. Built-in versioning and history. Supports migration rollback and prototyping mode. More automated, but less flexibility.'}
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.edgeRuntimeTitle}</h2>
      <p style={pStyle}>{ct.edgeRuntimeIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Drizzle ORM</th>
              <th style={thStyle}>Prisma</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Cloudflare Workers', isZh ? '完全支持' : 'Full support', isZh ? '通过Accelerate' : 'Via Accelerate'],
              ['Vercel Edge', isZh ? '完全支持' : 'Full support', isZh ? '有限支持' : 'Limited'],
              ['Deno Deploy', isZh ? '完全支持' : 'Full support', isZh ? '有限支持' : 'Limited'],
              ['Bun', isZh ? '完全支持' : 'Full support', isZh ? '支持' : 'Yes'],
              ['AWS Lambda', isZh ? '完全支持' : 'Full support', isZh ? '支持' : 'Yes'],
              ['Node.js', isZh ? '完全支持' : 'Full support', isZh ? '完全支持' : 'Full support'],
            ].map(([platform, drizzle, prisma], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{drizzle}</td>
                <td style={tdStyle}>{prisma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.drizzleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '边缘/无服务器部署' : 'Edge / serverless deployments'}</li>
            <li>{isZh ? 'SQL专家团队' : 'Teams with SQL expertise'}</li>
            <li>{isZh ? '性能关键应用' : 'Performance-critical apps'}</li>
            <li>{isZh ? '最小依赖需求' : 'Minimal dependency needs'}</li>
            <li>{isZh ? '直接SQL控制' : 'Direct SQL control'}</li>
            <li>{isZh ? '快速冷启动需求' : 'Fast cold start requirements'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.prismaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '团队协作项目' : 'Team collaboration projects'}</li>
            <li>{isZh ? '需要可视化工具' : 'Need visual tooling'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '复杂迁移需求' : 'Complex migration needs'}</li>
            <li>{isZh ? '多数据库支持' : 'Multi-database support'}</li>
            <li>{isZh ? '传统Node.js部署' : 'Traditional Node.js deployments'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/sql-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>SQL Formatter</a> • {' '}
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
