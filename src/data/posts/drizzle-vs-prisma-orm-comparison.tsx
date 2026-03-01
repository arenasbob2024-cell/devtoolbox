'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Drizzle ORM vs Prisma: TypeScript ORM Showdown',
    intro: 'TypeScript ORMs have evolved significantly, with Drizzle and Prisma emerging as the two dominant choices for modern web development. Prisma pioneered the schema-first approach with excellent developer experience, while Drizzle offers a lightweight, SQL-first alternative with unmatched type safety. This guide compares both ORMs across performance, flexibility, and developer experience.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Drizzle ORM offers superior performance, SQL-first flexibility, and edge runtime compatibility with zero dependencies. Prisma provides the best developer experience, automatic migrations, and powerful data tools. Choose Drizzle for performance-critical applications and teams comfortable with SQL. Choose Prisma for maximum productivity and when you prefer a schema-first approach.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Drizzle is significantly faster with near-zero runtime overhead',
    takeaway2: 'Prisma offers superior tooling including Studio and Migrate',
    takeaway3: 'Drizzle runs natively on edge runtimes (Cloudflare Workers, Vercel Edge)',
    takeaway4: 'Prisma\'s generated client provides unmatched autocompletion',
    takeaway5: 'Drizzle gives you full SQL control while maintaining type safety',
    takeaway6: 'Prisma has better database introspection and relationship handling',
    
    whatIsDrizzleTitle: 'What is Drizzle ORM?',
    whatIsDrizzleContent: 'Drizzle ORM is a lightweight, SQL-like ORM for TypeScript. Released in 2022, it takes a radically different approach from traditional ORMs. Instead of abstracting away SQL, Drizzle embraces it. Your schema is defined in TypeScript, and queries look almost identical to SQL while maintaining full type safety.',
    
    whatIsPrismaTitle: 'What is Prisma?',
    whatIsPrismaContent: 'Prisma is a next-generation ORM that introduced the schema-first approach. Released in 2019, it uses a declarative schema language to define your data model, then generates a fully-typed client. Prisma includes powerful tools like Prisma Studio (visual database management) and Prisma Migrate (schema migrations).',
    
    philosophyTitle: 'Design Philosophy',
    philosophyIntro: 'The fundamental difference between these ORMs lies in their design philosophy:',
    
    drizzlePhilosophyTitle: 'Drizzle: SQL-First',
    drizzlePhilosophyContent: 'Drizzle believes developers should know SQL. It provides a thin, type-safe layer over SQL without hiding the underlying queries. This approach gives you full control, predictable performance, and the ability to optimize queries directly.',
    
    prismaPhilosophyTitle: 'Prisma: Schema-First',
    prismaPhilosophyContent: 'Prisma abstracts database details behind a declarative schema and provides a high-level API for data access. This approach prioritizes developer productivity, type safety, and consistent patterns across your application.',
    
    schemaComparisonTitle: 'Schema Definition Comparison',
    schemaComparisonIntro: 'Comparing how you define your database schema in each ORM:',
    
    queryComparisonTitle: 'Query Syntax Comparison',
    queryComparisonIntro: 'How queries look in each ORM:',
    
    performanceTitle: 'Performance Benchmarks',
    performanceIntro: 'Real-world performance comparison for common operations:',
    
    migrationsTitle: 'Migration Strategies',
    migrationsIntro: 'How each ORM handles database schema migrations:',
    
    edgeSupportTitle: 'Edge Runtime Support',
    edgeSupportIntro: 'Running ORMs on edge functions and serverless:',
    
    toolingTitle: 'Developer Tooling',
    toolingIntro: 'The ecosystem and tools available for each ORM:',
    
    useCasesTitle: 'When to Use Each ORM',
    drizzleBestFor: 'Drizzle is Best For:',
    prismaBestFor: 'Prisma is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Both Drizzle and Prisma are excellent choices for TypeScript ORMs in 2025. Drizzle represents the future of SQL-first, edge-native database access with unmatched performance. Prisma continues to deliver the best developer experience with powerful tooling and mature ecosystem. The choice ultimately depends on your team\'s SQL comfort level, performance requirements, and deployment targets. Many teams successfully use both: Drizzle for edge functions and performance-critical paths, Prisma for traditional server applications.',
    
    faq1q: 'Is Drizzle production-ready?',
    faq1a: 'Yes, Drizzle ORM is production-ready and has reached version 0.30+. It\'s used by companies like Vercel, Cloudflare, and many startups in production. While newer than Prisma, it has proven stable and reliable.',
    
    faq2q: 'Can I use Drizzle with my existing database?',
    faq2a: 'Yes, Drizzle Kit provides introspection capabilities to generate TypeScript schema from an existing database. While not as comprehensive as Prisma\'s introspection, it works well for most PostgreSQL, MySQL, and SQLite databases.',
    
    faq3q: 'Does Prisma work on Cloudflare Workers?',
    faq3a: 'Prisma can work on Cloudflare Workers using Prisma Accelerate (a connection pooling service) or by using the Data Proxy. Native edge support without external services is not available due to Prisma\'s Rust query engine requiring a binary.',
    
    faq4q: 'Which ORM has better TypeScript support?',
    faq4a: 'Both have excellent TypeScript support but in different ways. Drizzle infers types from your TypeScript schema definition, providing type safety without code generation. Prisma generates types from your schema file, with extremely precise types for relations and queries.',
    
    faq5q: 'Can I switch from Prisma to Drizzle?',
    faq5a: 'Yes, but it requires rewriting your schema and queries. The database itself doesn\'t need changes. Drizzle Kit can help introspect your existing database to generate the initial schema. Expect to spend time adapting your query patterns to Drizzle\'s SQL-first approach.',
    
    faq6q: 'Does Drizzle support soft deletes?',
    faq6a: 'Drizzle supports soft deletes through its query builder or by using views. Unlike Prisma, there\'s no built-in middleware for soft deletes, but you can implement it using query filters or database triggers.',
    
    faq7q: 'Which ORM is better for beginners?',
    faq7a: 'Prisma is generally more beginner-friendly due to its excellent documentation, visual tools (Studio), and higher-level abstractions. Drizzle requires more SQL knowledge but rewards experienced developers with better performance and control.',
    
    faq8q: 'Can I use both ORMs in the same project?',
    faq8a: 'Yes, you can use Drizzle for edge functions and Prisma for traditional server code in the same project. This hybrid approach lets you leverage each ORM\'s strengths. Just be careful about managing database connections and migrations.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Drizzle ORM vs Prisma：TypeScript ORM 对比',
    intro: 'TypeScript ORM已经显著发展，Drizzle和Prisma成为现代Web开发的两个主导选择。Prisma开创了以模式优先的方法，提供出色的开发者体验，而Drizzle提供了轻量级、SQL优先的替代方案，具有无与伦比的类型安全。本指南在性能、灵活性和开发者体验方面比较这两个ORM。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Drizzle ORM提供卓越的性能、SQL优先的灵活性和零依赖的边缘运行时兼容性。Prisma提供最佳的开发者体验、自动迁移和强大的数据工具。对于性能关键型应用和熟悉SQL的团队，选择Drizzle。对于最大生产力和偏好模式优先方法的场景，选择Prisma。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Drizzle速度快得多，运行时开销接近零',
    takeaway2: 'Prisma提供优越的工具，包括Studio和Migrate',
    takeaway3: 'Drizzle在边缘运行时（Cloudflare Workers、Vercel Edge）上原生运行',
    takeaway4: 'Prisma生成的客户端提供无与伦比的自动补全',
    takeaway5: 'Drizzle让你完全控制SQL，同时保持类型安全',
    takeaway6: 'Prisma有更好的数据库内省和关系处理',
    
    whatIsDrizzleTitle: '什么是Drizzle ORM？',
    whatIsDrizzleContent: 'Drizzle ORM是一个轻量级的、类似SQL的TypeScript ORM。于2022年发布，它采取了与传统ORM截然不同的方法。Drizzle不是将SQL抽象掉，而是拥抱它。你的模式用TypeScript定义，查询看起来几乎与SQL相同，同时保持完全类型安全。',
    
    whatIsPrismaTitle: '什么是Prisma？',
    whatIsPrismaContent: 'Prisma是引入了模式优先方法的次世代ORM。于2019年发布，它使用声明式模式语言定义你的数据模型，然后生成完全类型化的客户端。Prisma包括强大的工具，如Prisma Studio（可视化数据库管理）和Prisma Migrate（模式迁移）。',
    
    philosophyTitle: '设计理念',
    philosophyIntro: '这两个ORM之间的根本差异在于它们的设计理念：',
    
    drizzlePhilosophyTitle: 'Drizzle：SQL优先',
    drizzlePhilosophyContent: 'Drizzle相信开发者应该了解SQL。它在SQL之上提供了一个薄而类型安全的层，不隐藏底层查询。这种方法让你完全控制、可预测的性能，以及直接优化查询的能力。',
    
    prismaPhilosophyTitle: 'Prisma：模式优先',
    prismaPhilosophyContent: 'Prisma在声明式模式后面抽象数据库细节，并提供高级API进行数据访问。这种方法优先考虑开发者生产力、类型安全和跨应用的一致模式。',
    
    schemaComparisonTitle: '模式定义对比',
    schemaComparisonIntro: '比较在每个ORM中如何定义数据库模式：',
    
    queryComparisonTitle: '查询语法对比',
    queryComparisonIntro: '每个ORM中的查询看起来如何：',
    
    performanceTitle: '性能基准测试',
    performanceIntro: '常见操作的真实性能对比：',
    
    migrationsTitle: '迁移策略',
    migrationsIntro: '每个ORM如何处理数据库模式迁移：',
    
    edgeSupportTitle: '边缘运行时支持',
    edgeSupportIntro: '在边缘函数和serverless上运行ORM：',
    
    toolingTitle: '开发者工具',
    toolingIntro: '每个ORM可用的生态系统和工具：',
    
    useCasesTitle: '何时使用每个ORM',
    drizzleBestFor: 'Drizzle 最适合：',
    prismaBestFor: 'Prisma 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Drizzle和Prisma都是2025年TypeScript ORM的绝佳选择。Drizzle代表了SQL优先、边缘原生数据库访问的未来，具有无与伦比的性能。Prisma继续通过强大的工具和成熟的生态系统提供最佳的开发者体验。选择最终取决于你团队的SQL舒适度、性能要求和部署目标。许多团队成功地同时使用两者：Drizzle用于边缘函数和性能关键路径，Prisma用于传统服务器应用。',
    
    faq1q: 'Drizzle已经可以用于生产了吗？',
    faq1a: '是的，Drizzle ORM已经可以用于生产，已达到0.30+版本。它被Vercel、Cloudflare和许多初创公司用于生产环境。虽然比Prisma新，但它已经证明了稳定性和可靠性。',
    
    faq2q: '我可以在现有数据库中使用Drizzle吗？',
    faq2a: '是的，Drizzle Kit提供内省功能，可以从现有数据库生成TypeScript模式。虽然不如Prisma的内省全面，但它适用于大多数PostgreSQL、MySQL和SQLite数据库。',
    
    faq3q: 'Prisma可以在Cloudflare Workers上工作吗？',
    faq3a: 'Prisma可以使用Prisma Accelerate（连接池服务）或使用Data Proxy在Cloudflare Workers上工作。由于Prisma的Rust查询引擎需要二进制文件，因此没有外部服务就无法获得原生边缘支持。',
    
    faq4q: '哪个ORM有更好的TypeScript支持？',
    faq4a: '两者都有出色的TypeScript支持，但方式不同。Drizzle从TypeScript模式定义推断类型，无需代码生成即可提供类型安全。Prisma从模式文件生成类型，为关系和查询提供极其精确的类型。',
    
    faq5q: '我可以从Prisma切换到Drizzle吗？',
    faq5a: '可以，但需要重写你的模式和查询。数据库本身不需要更改。Drizzle Kit可以帮助内省你的现有数据库以生成初始模式。预计需要花时间将查询模式适应Drizzle的SQL优先方法。',
    
    faq6q: 'Drizzle支持软删除吗？',
    faq6a: 'Drizzle通过其查询构建器或使用视图支持软删除。与Prisma不同，没有内置的中间件用于软删除，但你可以使用查询过滤器或数据库触发器实现它。',
    
    faq7q: '哪个ORM更适合初学者？',
    faq7a: 'Prisma通常对初学者更友好，因为它有出色的文档、可视化工具（Studio）和高级抽象。Drizzle需要更多的SQL知识，但通过更好的性能和控制回报有经验的开发者。',
    
    faq8q: '我可以在同一个项目中使用两个ORM吗？',
    faq8a: '是的，你可以在同一个项目中将Drizzle用于边缘函数，将Prisma用于传统服务器代码。这种混合方法让你能够利用每个ORM的优势。只需注意管理数据库连接和迁移。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function DrizzleVsPrismaOrmComparison({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? 'ORM概述' : 'ORM Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#c2f0c2' }}>{ct.whatIsDrizzleTitle}</h3>
      <p style={pStyle}>{ct.whatIsDrizzleContent}</p>

      <h3 style={{ ...h3Style, color: '#5a67d8' }}>{ct.whatIsPrismaTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrismaContent}</p>

      {/* Philosophy */}
      <h2 style={h2Style}>{ct.philosophyTitle}</h2>
      <p style={pStyle}>{ct.philosophyIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #c2f0c2' }}>
          <strong style={{ color: '#22c55e' }}>{ct.drizzlePhilosophyTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.drizzlePhilosophyContent}</p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #5a67d8' }}>
          <strong style={{ color: '#5a67d8' }}>{ct.prismaPhilosophyTitle}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ct.prismaPhilosophyContent}</p>
        </div>
      </div>

      {/* Schema Comparison */}
      <h2 style={h2Style}>{ct.schemaComparisonTitle}</h2>
      <p style={pStyle}>{ct.schemaComparisonIntro}</p>

      <h3 style={{ ...h3Style, color: '#5a67d8' }}>Prisma Schema</h3>
      <pre style={codeStyle}><code>{`// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Post {
  id          String    @id @default(uuid())
  title       String
  slug        String    @unique
  content     String?
  published   Boolean   @default(false)
  publishedAt DateTime?
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  tags        Tag[]
  
  @@index([authorId])
  @@index([slug])
  @@map("posts")
}

model Profile {
  id     String  @id @default(uuid())
  bio    String?
  avatar String?
  user   User    @relation(fields: [userId], references: [id])
  userId String  @unique
  
  @@map("profiles")
}

model Tag {
  id    String @id @default(uuid())
  name  String @unique
  posts Post[]
  
  @@map("tags")
}

enum Role {
  USER
  ADMIN
  EDITOR
}`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Drizzle Schema</h3>
      <pre style={codeStyle}><code>{`// src/db/schema.ts
import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  boolean, 
  timestamp, 
  pgEnum,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enum definition
export const roleEnum = pgEnum('role', ['USER', 'ADMIN', 'EDITOR']);

// Tables
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  role: roleEnum('role').default('USER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
}));

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content'),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  authorId: uuid('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  authorIdx: index('author_idx').on(table.authorId),
  slugIdx: uniqueIndex('slug_idx').on(table.slug),
}));

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  bio: text('bio'),
  avatar: text('avatar'),
  userId: uuid('user_id').notNull().unique().references(() => users.id),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

// Many-to-many junction table
export const postTags = pgTable('post_tags', {
  postId: uuid('post_id').notNull().references(() => posts.id),
  tagId: uuid('tag_id').notNull().references(() => tags.id),
});

// Relations (for query builder)
export const usersRelations = relations(users, ({ one, many }) => ({
  posts: many(posts),
  profile: one(profiles),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  tags: many(postTags),
}));`}</code></pre>

      {/* Query Comparison */}
      <h2 style={h2Style}>{ct.queryComparisonTitle}</h2>
      <p style={pStyle}>{ct.queryComparisonIntro}</p>

      <h3 style={{ ...h3Style, color: '#5a67d8' }}>Prisma Queries</h3>
      <pre style={codeStyle}><code>{`// Prisma Client queries
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create user with posts
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
    posts: {
      create: [
        { title: 'Hello World', slug: 'hello-world' },
        { title: 'Second Post', slug: 'second-post' },
      ],
    },
  },
  include: { posts: true },
});

// Query with filters and relations
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'ADMIN' },
  },
  include: {
    author: { select: { name: true, email: true } },
    tags: true,
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Update with transaction
const [updatedPost, updatedUser] = await prisma.$transaction([
  prisma.post.update({
    where: { id: 'post-id' },
    data: { published: true },
  }),
  prisma.user.update({
    where: { id: 'user-id' },
    data: { role: 'EDITOR' },
  }),
]);

// Aggregation
const stats = await prisma.post.aggregate({
  where: { published: true },
  _count: true,
  _avg: { views: true },
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>Drizzle Queries</h3>
      <pre style={codeStyle}><code>{`// Drizzle ORM queries
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, desc, sql } from 'drizzle-orm';
import * as schema from './schema';

const db = drizzle(pool, { schema });

// Insert user with returning
const [user] = await db.insert(schema.users)
  .values({
    email: 'john@example.com',
    name: 'John Doe',
  })
  .returning();

// Insert posts
await db.insert(schema.posts).values([
  { title: 'Hello World', slug: 'hello-world', authorId: user.id },
  { title: 'Second Post', slug: 'second-post', authorId: user.id },
]);

// SQL-like query with joins
const posts = await db
  .select({
    id: schema.posts.id,
    title: schema.posts.title,
    slug: schema.posts.slug,
    authorName: schema.users.name,
    authorEmail: schema.users.email,
  })
  .from(schema.posts)
  .leftJoin(schema.users, eq(schema.posts.authorId, schema.users.id))
  .where(eq(schema.posts.published, true))
  .orderBy(desc(schema.posts.createdAt))
  .limit(10);

// Relational queries (similar to Prisma)
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: {
      where: eq(schema.posts.published, true),
      orderBy: desc(schema.posts.createdAt),
    },
    profile: true,
  },
  where: eq(schema.users.role, 'ADMIN'),
});

// Transaction
await db.transaction(async (tx) => {
  await tx.update(schema.posts)
    .set({ published: true })
    .where(eq(schema.posts.id, 'post-id'));
  
  await tx.update(schema.users)
    .set({ role: 'EDITOR' })
    .where(eq(schema.users.id, 'user-id'));
});

// Raw SQL when needed
const result = await db.execute(sql\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p.author_id = u.id
  WHERE p.published = true
  GROUP BY u.name
  ORDER BY post_count DESC
\`);`}</code></pre>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Drizzle</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>{isZh ? '差异' : 'Difference'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单查询' : 'Simple query', '~0.1ms', '~1.2ms', '12x'],
              [isZh ? '批量插入 1000行' : 'Bulk insert 1000 rows', '~15ms', '~85ms', '5.7x'],
              [isZh ? '复杂连接查询' : 'Complex join query', '~0.3ms', '~2.1ms', '7x'],
              [isZh ? '包大小' : 'Bundle size', '~15KB', '~2MB+', '130x smaller'],
              [isZh ? '冷启动' : 'Cold start', '~5ms', '~200ms', '40x'],
              [isZh ? '内存占用' : 'Memory usage', '~5MB', '~50MB', '10x'],
            ].map(([op, drizzle, prisma, diff], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{drizzle}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edge Support */}
      <h2 style={h2Style}>{ct.edgeSupportTitle}</h2>
      <p style={pStyle}>{ct.edgeSupportIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Drizzle</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '零依赖，纯TypeScript。在任何边缘运行时原生工作，包括Cloudflare Workers、Vercel Edge、Deno Deploy。无需外部服务。' : 'Zero dependencies, pure TypeScript. Works natively on any edge runtime including Cloudflare Workers, Vercel Edge, Deno Deploy. No external services required.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #5a67d8' }}>
          <strong style={{ color: '#5a67d8' }}>Prisma</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要Rust查询引擎二进制文件。在边缘运行时，必须使用Prisma Accelerate（付费）或Data Proxy（已弃用）。不能原生在Workers上运行。' : 'Requires Rust query engine binary. On edge runtimes, must use Prisma Accelerate (paid) or Data Proxy (deprecated). Cannot run natively on Workers.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`// Drizzle on Cloudflare Workers
import { drizzle } from 'drizzle-orm/d1';  // or neon, turso

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB);  // D1 database binding
    
    const users = await db.select().from(usersTable);
    
    return Response.json({ users });
  },
};

// Prisma on Cloudflare Workers (requires Accelerate)
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient({
  datasourceUrl: env.DATABASE_URL,
}).$extends(withAccelerate());

export default {
  async fetch(request: Request, env: Env) {
    const users = await prisma.user.findMany({
      cacheStrategy: { ttl: 60 },
    });
    
    return Response.json({ users });
  },
};`}</code></pre>

      {/* Use Cases */}
      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.drizzleBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '边缘计算/无服务器' : 'Edge computing / serverless'}</li>
            <li>{isZh ? '性能关键型应用' : 'Performance-critical applications'}</li>
            <li>{isZh ? 'SQL精通团队' : 'SQL-proficient teams'}</li>
            <li>{isZh ? '需要SQL控制' : 'Need SQL control'}</li>
            <li>{isZh ? '小型打包体积' : 'Small bundle size'}</li>
            <li>{isZh ? 'monorepo架构' : 'Monorepo architectures'}</li>
            <li>{isZh ? '现有SQL查询迁移' : 'Migrating existing SQL queries'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5a67d8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5a67d8' }}>{ct.prismaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '快速开发' : 'Rapid development'}</li>
            <li>{isZh ? '大型团队' : 'Large teams'}</li>
            <li>{isZh ? '需要可视化工具' : 'Need visual tools'}</li>
            <li>{isZh ? '复杂关系' : 'Complex relationships'}</li>
            <li>{isZh ? '自动迁移' : 'Automatic migrations'}</li>
            <li>{isZh ? '初学者友好' : 'Beginner-friendly'}</li>
            <li>{isZh ? '企业应用' : 'Enterprise applications'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(90,103,216,0.1))', borderRadius: 12, border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#22c55e', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/sql-formatter`} style={{ color: '#22c55e', textDecoration: 'none' }}>SQL Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#22c55e', textDecoration: 'none' }}>UUID Generator</a>
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
