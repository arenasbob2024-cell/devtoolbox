'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Kysely vs Drizzle ORM: TypeScript SQL Query Builders 2025',
    intro: 'Kysely and Drizzle are two modern TypeScript-first SQL query builders that provide type-safe database access without the overhead of traditional ORMs. Kysely focuses on being a pure query builder with excellent TypeScript inference, while Drizzle offers both a query builder and ORM-like features with an SQL-like syntax. This comparison helps you choose the right tool for your TypeScript project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Kysely for pure type-safe query building with excellent IDE support and when you want full control over SQL. Choose Drizzle for a batteries-included solution with schema management, migrations, and ORM-like features while staying close to SQL.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both provide excellent TypeScript type safety and autocomplete',
    takeaway2: 'Kysely is a pure query builder; Drizzle includes ORM features',
    takeaway3: 'Drizzle has built-in migrations and schema management',
    takeaway4: 'Kysely has better complex query type inference',
    takeaway5: 'Drizzle supports more databases including SQLite and Turso',
    takeaway6: 'Both are lightweight compared to traditional ORMs like TypeORM or Prisma',
    
    whatIsKyselyTitle: 'What is Kysely?',
    whatIsKyselyContent: 'Kysely is a type-safe SQL query builder for TypeScript created by the team at Kubo. It provides excellent type inference, allowing you to write SQL queries with full TypeScript support. Kysely is a pure query builder without ORM features like entity management or migrations. It supports PostgreSQL, MySQL, and SQLite.',
    
    whatIsDrizzleTitle: 'What is Drizzle ORM?',
    whatIsDrizzleContent: 'Drizzle ORM is a TypeScript ORM and query builder that aims to be "the best of both worlds" between ORMs and query builders. It provides a schema-first approach with SQL-like syntax, built-in migrations, and zero runtime overhead. Drizzle supports PostgreSQL, MySQL, SQLite, Turso, and Planetscale.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Query examples for both libraries:',
    
    kyselyExampleTitle: 'Kysely Examples',
    drizzleExampleTitle: 'Drizzle Examples',
    
    dataSourceTitle: 'Database Support',
    dataSourceIntro: 'Supported databases and drivers:',
    
    alertingTitle: 'When to Choose',
    alertingIntro: 'Decision criteria:',
    
    useCasesTitle: 'Best Use Cases',
    kyselyBestFor: 'Kysely is Best For:',
    drizzleBestFor: 'Drizzle is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Kysely and Drizzle represent the modern approach to database access in TypeScript. Kysely excels as a pure query builder with unmatched type inference for complex queries. Drizzle offers a more complete solution with schema management, migrations, and ORM conveniences while maintaining SQL familiarity. Choose Kysely for maximum type safety in complex queries, Drizzle for a full-featured database toolkit.',
    
    faq1q: 'Can I use both in the same project?',
    faq1a: 'Technically yes, but it is not recommended. They have different connection management and type systems. Choose one based on your needs: Kysely for pure query building, Drizzle if you need schema management and migrations.',
    
    faq2q: 'How do they compare to Prisma?',
    faq2a: 'Both are lighter than Prisma and generate no runtime overhead. Prisma has a schema DSL and generates a client, while Kysely and Drizzle work directly with TypeScript. Prisma has better tooling but is heavier. Kysely and Drizzle offer better performance and smaller bundle sizes.',
    
    faq3q: 'Which has better performance?',
    faq3a: 'Both have minimal runtime overhead since they are query builders, not heavy ORMs. Drizzle claims to be the fastest TypeScript ORM in benchmarks. The real difference is negligible for most applications. Both compile to efficient SQL.',
    
    faq4q: 'How is migration support?',
    faq4a: 'Drizzle has built-in migration generation and management with drizzle-kit. Kysely does not include migrations but works well with external tools like kysely-codegen for type generation and custom migration solutions.',
    
    faq5q: 'What about edge and serverless environments?',
    faq5a: 'Both work well in serverless. Drizzle has better edge database support including Turso, Neon, and PlanetScale. Kysely works with any standard SQL database. For edge-first architectures, Drizzle has more integrations.',
    
    faq6q: 'How is the learning curve?',
    faq6a: 'Both require understanding SQL. Kysely has a more method-chaining API that maps directly to SQL. Drizzle uses SQL-like template literals and functions. Developers familiar with SQL can pick up either quickly. Drizzle may feel more natural for SQL developers.',
    
    faq7q: 'What about complex queries?',
    faq7a: 'Kysely excels at complex queries with excellent type inference for joins, subqueries, and CTEs. Drizzle supports complex queries but type inference can be less precise in very complex scenarios. For analytical queries, Kysely has an edge.',
    
    faq8q: 'Which is more actively maintained?',
    faq8a: 'Both are actively maintained with growing communities. Drizzle has seen rapid adoption and frequent updates. Kysely has steady development from a dedicated team. Both have active GitHub repositories and Discord communities.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Kysely vs Drizzle ORM：TypeScript SQL 查询构建器 2025',
    intro: 'Kysely 和 Drizzle 是两个现代的 TypeScript 优先 SQL 查询构建器，提供类型安全的数据库访问，没有传统 ORM 的开销。Kysely 专注于作为纯查询构建器，具有出色的 TypeScript 推断，而 Drizzle 提供查询构建器和类似 ORM 的功能，采用类 SQL 语法。本对比帮助你为 TypeScript 项目选择合适的工具。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为纯类型安全查询构建和出色的 IDE 支持，以及想要完全控制 SQL 时选择 Kysely。为包含模式管理、迁移和类似 ORM 功能的一体化解决方案，同时保持接近 SQL 时选择 Drizzle。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两者都提供出色的 TypeScript 类型安全和自动补全',
    takeaway2: 'Kysely 是纯查询构建器；Drizzle 包含 ORM 功能',
    takeaway3: 'Drizzle 有内置迁移和模式管理',
    takeaway4: 'Kysely 对复杂查询有更好的类型推断',
    takeaway5: 'Drizzle 支持更多数据库，包括 SQLite 和 Turso',
    takeaway6: '与 TypeORM 或 Prisma 等传统 ORM 相比，两者都很轻量',
    
    whatIsKyselyTitle: '什么是 Kysely？',
    whatIsKyselyContent: 'Kysely 是由 Kubo 团队创建的 TypeScript 类型安全 SQL 查询构建器。它提供出色的类型推断，让你可以用完整的 TypeScript 支持编写 SQL 查询。Kysely 是纯查询构建器，没有实体管理或迁移等 ORM 功能。它支持 PostgreSQL、MySQL 和 SQLite。',
    
    whatIsDrizzleTitle: '什么是 Drizzle ORM？',
    whatIsDrizzleContent: 'Drizzle ORM 是一个 TypeScript ORM 和查询构建器，旨在成为 ORM 和查询构建器之间的"两全其美"。它提供模式优先的方法、类 SQL 语法、内置迁移和零运行时开销。Drizzle 支持 PostgreSQL、MySQL、SQLite、Turso 和 PlanetScale。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个库的查询示例：',
    
    kyselyExampleTitle: 'Kysely 示例',
    drizzleExampleTitle: 'Drizzle 示例',
    
    dataSourceTitle: '数据库支持',
    dataSourceIntro: '支持的数据库和驱动：',
    
    alertingTitle: '选择指南',
    alertingIntro: '决策标准：',
    
    useCasesTitle: '最佳用例',
    kyselyBestFor: 'Kysely 最适合：',
    drizzleBestFor: 'Drizzle 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Kysely 和 Drizzle 代表了 TypeScript 中数据库访问的现代方法。Kysely 作为纯查询构建器，在复杂查询的类型推断方面无与伦比。Drizzle 提供更完整的解决方案，包括模式管理、迁移和 ORM 便利功能，同时保持 SQL 的熟悉感。为复杂查询中的最大类型安全选择 Kysely，为全功能数据库工具包选择 Drizzle。',
    
    faq1q: '可以在同一个项目中同时使用两者吗？',
    faq1a: '技术上可以，但不推荐。它们有不同的连接管理和类型系统。根据你的需求选择一个：Kysely 用于纯查询构建，Drizzle 如果你需要模式管理和迁移。',
    
    faq2q: '它们与 Prisma 相比如何？',
    faq2a: '两者都比 Prisma 更轻量，不产生运行时开销。Prisma 有模式 DSL 并生成客户端，而 Kysely 和 Drizzle 直接与 TypeScript 一起工作。Prisma 有更好的工具但更重。Kysely 和 Drizzle 提供更好的性能和更小的包大小。',
    
    faq3q: '哪个性能更好？',
    faq3a: '两者都有最小的运行时开销，因为它们是查询构建器，不是重型 ORM。Drizzle 声称是基准测试中最快的 TypeScript ORM。对于大多数应用，实际差异可以忽略不计。两者都编译为高效的 SQL。',
    
    faq4q: '迁移支持如何？',
    faq4a: 'Drizzle 通过 drizzle-kit 内置迁移生成和管理。Kysely 不包含迁移，但与外部工具如 kysely-codegen 配合良好，用于类型生成和自定义迁移解决方案。',
    
    faq5q: '边缘和无服务器环境如何？',
    faq5a: '两者在无服务器中都运行良好。Drizzle 有更好的边缘数据库支持，包括 Turso、Neon 和 PlanetScale。Kysely 与任何标准 SQL 数据库一起工作。对于边缘优先架构，Drizzle 有更多集成。',
    
    faq6q: '学习曲线如何？',
    faq6a: '两者都需要理解 SQL。Kysely 有更多直接映射到 SQL的方法链式 API。Drizzle 使用类 SQL 模板字面量和函数。熟悉 SQL 的开发者可以快速上手任何一个。Drizzle 对 SQL 开发者可能感觉更自然。',
    
    faq7q: '复杂查询如何？',
    faq7a: 'Kysely 在复杂查询方面表现出色，对连接、子查询和 CTE 有出色的类型推断。Drizzle 支持复杂查询，但在非常复杂的场景中类型推断可能不太精确。对于分析查询，Kysely 有优势。',
    
    faq8q: '哪个维护更活跃？',
    faq8a: '两者都在积极维护，社区不断增长。Drizzle 看到了快速采用和频繁更新。Kysely 由专门的团队稳定开发。两者都有活跃的 GitHub 仓库和 Discord 社区。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function KyselyVsDrizzle({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsKyselyTitle}</h3>
      <p style={pStyle}>{ct.whatIsKyselyContent}</p>

      <h3 style={h3Style}>{ct.whatIsDrizzleTitle}</h3>
      <p style={pStyle}>{ct.whatIsDrizzleContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Kysely</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '类型' : 'Type', isZh ? '纯查询构建器' : 'Pure Query Builder', 'ORM + Query Builder'],
              [isZh ? '类型推断' : 'Type Inference', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? '迁移' : 'Migrations', isZh ? '外部工具' : 'External tools', isZh ? '内置' : 'Built-in'],
              [isZh ? '模式管理' : 'Schema Management', isZh ? '手动' : 'Manual', isZh ? 'drizzle-kit' : 'drizzle-kit'],
              [isZh ? '运行时开销' : 'Runtime Overhead', isZh ? '零' : 'Zero', isZh ? '极小' : 'Minimal'],
              [isZh ? 'SQL 接近度' : 'SQL Closeness', isZh ? '方法链' : 'Method chaining', isZh ? '模板字面量' : 'Template literals'],
            ].map(([feature, kysely, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{kysely}</td>
                <td style={tdStyle}>{drizzle}</td>
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
              <th style={thStyle}>Kysely</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '连接' : 'Joins', isZh ? '完整类型推断' : 'Full type inference', isZh ? '支持' : 'Supported'],
              [isZh ? '子查询' : 'Subqueries', isZh ? '优秀' : 'Excellent', isZh ? '良好' : 'Good'],
              [isZh ? 'CTE' : 'CTEs', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '事务' : 'Transactions', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '批量操作' : 'Batch Operations', isZh ? '支持' : 'Supported', isZh ? '支持' : 'Supported'],
              [isZh ? '关系加载' : 'Relation Loading', isZh ? '手动' : 'Manual', isZh ? '内置' : 'Built-in'],
            ].map(([cap, kysely, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{kysely}</td>
                <td style={tdStyle}>{drizzle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#8b5cf6' }}>{ct.kyselyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Kysely: Schema Definition (TypeScript types)
interface Database {
  users: {
    id: Generated\\<number\\>
    name: string
    email: string
    created_at: Generated\\<Date\\>
  }
  posts: {
    id: Generated\\<number\\>
    title: string
    content: string
    author_id: number
    created_at: Generated\\<Date\\>
  }
}

// Kysely: Initialize
import { Kysely, PostgresAdapter } from 'kysely'
const db = new Kysely\\<Database\\>({ dialect: new PostgresAdapter(...) })

// Kysely: Basic Query
const users = await db
  .selectFrom('users')
  .where('name', 'like', '%alice%')
  .orderBy('created_at', 'desc')
  .limit(10)
  .execute()

// Kysely: Join with Type Inference
const postsWithAuthors = await db
  .selectFrom('posts')
  .innerJoin('users', 'users.id', 'posts.author_id')
  .select([
    'posts.id',
    'posts.title',
    'users.name as author_name',
    'users.email'
  ])
  .execute()

// Kysely: Complex Query with CTE
const result = await db
  .with('active_users', (db) => db
    .selectFrom('users')
    .where('last_login', '>', new Date(Date.now() - 86400000))
    .select(['id', 'name'])
  )
  .selectFrom('active_users')
  .innerJoin('posts', 'posts.author_id', 'active_users.id')
  .select(['active_users.name', 'posts.title'])
  .execute()

// Kysely: Insert
await db.insertInto('users').values({
  name: 'Alice',
  email: 'alice@example.com'
}).execute()

// Kysely: Update
await db.updateTable('users')
  .set({ name: 'Alice Updated' })
  .where('id', '=', 1)
  .execute()`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.drizzleExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Drizzle: Schema Definition
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow()
})

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  authorId: integer('author_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow()
})

// Drizzle: Initialize
import { drizzle } from 'drizzle-orm/postgres-js'
const db = drizzle({ schema: { users, posts } })

// Drizzle: Basic Query (SQL-like)
const result = await db.select()
  .from(users)
  .where(ilike(users.name, '%alice%'))
  .orderBy(desc(users.createdAt))
  .limit(10)

// Drizzle: Join
const postsWithAuthors = await db
  .select({
    id: posts.id,
    title: posts.title,
    authorName: users.name,
    authorEmail: users.email
  })
  .from(posts)
  .innerJoin(users, eq(posts.authorId, users.id))

// Drizzle: Insert
await db.insert(users).values({
  name: 'Alice',
  email: 'alice@example.com'
})

// Drizzle: Update
await db.update(users)
  .set({ name: 'Alice Updated' })
  .where(eq(users.id, 1))

// Drizzle: Relations (ORM-like)
import { relations } from 'drizzle-orm'

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))

// Drizzle: Query with Relations
const userWithPosts = await db.query.users.findFirst({
  with: { posts: true },
  where: eq(users.id, 1)
})`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '数据库' : 'Database'}</th>
              <th style={thStyle}>Kysely</th>
              <th style={thStyle}>Drizzle</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['PostgreSQL', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              ['MySQL', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              ['SQLite', isZh ? '支持' : 'Yes', isZh ? '支持' : 'Yes'],
              ['Turso', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              ['PlanetScale', isZh ? '不支持' : 'No', isZh ? '支持' : 'Yes'],
              ['Neon', isZh ? '支持（PostgreSQL）' : 'Yes (PostgreSQL)', isZh ? '支持' : 'Yes'],
            ].map(([db, kysely, drizzle], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{db}</td>
                <td style={tdStyle}>{kysely}</td>
                <td style={tdStyle}>{drizzle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #8b5cf6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#8b5cf6' }}>{ct.kyselyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '复杂分析查询' : 'Complex analytical queries'}</li>
            <li>{isZh ? '需要精确类型推断' : 'Precise type inference needed'}</li>
            <li>{isZh ? '现有迁移工具' : 'Existing migration tools'}</li>
            <li>{isZh ? 'SQL 爱好者' : 'SQL enthusiasts'}</li>
            <li>{isZh ? '最小化依赖' : 'Minimal dependencies'}</li>
            <li>{isZh ? '遗留数据库' : 'Legacy databases'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.drizzleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目' : 'New projects'}</li>
            <li>{isZh ? '需要迁移管理' : 'Migration management needed'}</li>
            <li>{isZh ? '边缘数据库' : 'Edge databases'}</li>
            <li>{isZh ? 'ORM 便利功能' : 'ORM conveniences'}</li>
            <li>{isZh ? 'Serverless 应用' : 'Serverless apps'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
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
