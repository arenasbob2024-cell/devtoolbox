'use client';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  Drizzle ORM Guide: Type-Safe SQL for TypeScript                   */
/* ------------------------------------------------------------------ */

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Drizzle ORM Complete Guide: Type-Safe SQL for TypeScript in 2026',
    description: 'Complete Drizzle ORM guide covering schema definition, PostgreSQL/MySQL/SQLite adapters, type-safe queries, relations, joins, migrations with drizzle-kit, Drizzle Studio, serverless integration, transactions, prepared statements, and performance best practices.',
    tldr: 'Drizzle ORM is a lightweight, type-safe TypeScript ORM that lets you write SQL-like queries with full autocompletion and compile-time type checking. It supports PostgreSQL, MySQL, and SQLite with zero runtime overhead. Define schemas in TypeScript, run migrations with drizzle-kit, browse data with Drizzle Studio, and deploy to serverless environments with minimal bundle size. Drizzle gives you the power of raw SQL with the safety of TypeScript.',
    h2WhatIs: 'What Is Drizzle ORM?',
    whatIsDesc: 'Drizzle ORM is a TypeScript ORM that takes a fundamentally different approach from traditional ORMs. Instead of abstracting SQL away behind method chains, Drizzle embraces SQL syntax and maps it directly to TypeScript. Every query you write looks like SQL but has full type inference, autocompletion, and compile-time validation. There is no query builder magic or hidden runtime overhead.',
    h3WhyDrizzle: 'Why Choose Drizzle?',
    why1: 'SQL-like syntax: queries read like SQL, not method chains',
    why2: 'Type-safe: full TypeScript inference from schema to query results',
    why3: 'Lightweight: zero dependencies, minimal bundle size (~7.4KB gzipped)',
    why4: 'Serverless-ready: no connection pooling issues, works with edge runtimes',
    why5: 'Multi-database: PostgreSQL, MySQL, SQLite with the same API',
    why6: 'Drizzle Kit: schema migrations, push, and introspection from CLI',
    why7: 'Drizzle Studio: browser-based database GUI for viewing and editing data',
    h2Comparison: 'Drizzle vs Prisma vs TypeORM',
    comparisonDesc: 'Each ORM makes different trade-offs. Drizzle prioritizes SQL familiarity and minimal overhead. Prisma prioritizes developer experience with its schema language. TypeORM follows traditional ORM patterns with decorators.',
    h2Schema: 'Schema Definition',
    schemaDesc: 'Drizzle schemas are written in plain TypeScript files. Each table is defined using helper functions that map directly to SQL column types. The schema serves as both your database definition and your TypeScript types.',
    h3Postgres: 'PostgreSQL Schema',
    h3Mysql: 'MySQL Schema',
    h3Sqlite: 'SQLite Schema',
    h2Setup: 'Project Setup and Configuration',
    setupDesc: 'Setting up Drizzle requires installing the ORM package, a database driver, and drizzle-kit for migrations. The configuration is minimal compared to other ORMs.',
    h2Queries: 'Type-Safe Queries',
    queriesDesc: 'Drizzle provides two query APIs: the SQL-like core API and the relational query API. The core API mirrors SQL syntax directly. The relational API provides a more declarative way to fetch nested data.',
    h3Select: 'SELECT Queries',
    h3Insert: 'INSERT Operations',
    h3Update: 'UPDATE Operations',
    h3Delete: 'DELETE Operations',
    h2Relations: 'Relations and Joins',
    relationsDesc: 'Drizzle supports both explicit SQL joins and a relational query API for nested data fetching. Relations are defined separately from the schema, keeping your table definitions clean.',
    h3DefineRelations: 'Defining Relations',
    h3Joins: 'SQL Joins',
    h3RelationalQueries: 'Relational Queries',
    h2Migrations: 'Migrations with drizzle-kit',
    migrationsDesc: 'Drizzle Kit generates SQL migration files by comparing your TypeScript schema against the current database state. It supports generate, push, and introspect workflows.',
    h3Generate: 'Generating Migrations',
    h3Push: 'Push (Development)',
    h3Introspect: 'Introspect Existing Database',
    h2Studio: 'Drizzle Studio',
    studioDesc: 'Drizzle Studio is a browser-based database GUI that comes built into drizzle-kit. Run one command and get a visual interface for browsing tables, editing rows, running queries, and inspecting your schema. It connects directly to your database using the same drizzle.config.ts configuration.',
    h2Integration: 'Framework Integration',
    integrationDesc: 'Drizzle works with any TypeScript runtime. Here are patterns for the most popular frameworks.',
    h3Nextjs: 'Next.js Integration',
    h3Hono: 'Hono Integration',
    h3Serverless: 'Serverless and Edge',
    h2Transactions: 'Transactions and Prepared Statements',
    transactionsDesc: 'Drizzle supports database transactions for atomic operations and prepared statements for repeated queries with better performance.',
    h3TransactionUsage: 'Using Transactions',
    h3PreparedStatements: 'Prepared Statements',
    h2Performance: 'Performance Optimization',
    perfDesc: 'Drizzle is already one of the fastest TypeScript ORMs due to its thin abstraction layer. These patterns help you get even better performance in production.',
    bp1: 'Use select() with specific columns instead of select() with all columns to reduce data transfer',
    bp2: 'Create database indexes on columns used in WHERE, ORDER BY, and JOIN conditions',
    bp3: 'Use prepared statements for frequently executed queries to skip query planning',
    bp4: 'Batch related writes in transactions to reduce round trips',
    bp5: 'Use connection pooling (pg Pool, PlanetScale serverless driver) for serverless',
    bp6: 'Enable query logging in development to catch N+1 queries early',
    bp7: 'Use the relational query API for nested data instead of multiple sequential queries',
    bp8: 'Add .limit() to all queries that return lists to prevent unbounded result sets',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How does Drizzle ORM compare to Prisma?',
    faq1A: 'Drizzle uses TypeScript for schema definition and SQL-like query syntax, while Prisma uses its own schema language (schema.prisma) and a method-chain API. Drizzle has zero dependencies and a smaller bundle size (~7.4KB vs ~2MB for Prisma Client). Drizzle gives you more control over the generated SQL, while Prisma provides a higher level of abstraction. Drizzle works better in serverless and edge environments due to its minimal footprint.',
    faq2Q: 'Does Drizzle support MongoDB or other NoSQL databases?',
    faq2A: 'No. Drizzle ORM is designed exclusively for SQL databases: PostgreSQL, MySQL, and SQLite. It embraces SQL rather than abstracting it away. For MongoDB, consider Mongoose or Prisma which supports MongoDB.',
    faq3Q: 'Can I use Drizzle with an existing database?',
    faq3A: 'Yes. Use drizzle-kit introspect to generate TypeScript schema files from an existing database. The command reads your database structure and creates matching Drizzle schema definitions that you can use immediately.',
    faq4Q: 'Is Drizzle production-ready?',
    faq4A: 'Yes. Drizzle ORM is used in production by many companies and has a stable v0.30+ API. It is actively maintained, has comprehensive TypeScript types, and its thin abstraction layer means fewer potential bugs between your code and the database.',
    faq5Q: 'How do I handle database migrations in production?',
    faq5A: 'Use drizzle-kit generate to create SQL migration files, then run them with drizzle-kit migrate or use the migrate() function in your application code during startup. Store migration files in version control and apply them in CI/CD pipelines.',
    faq6Q: 'Does Drizzle work with serverless platforms?',
    faq6A: 'Yes. Drizzle is ideal for serverless environments because of its minimal bundle size and zero dependencies. It works with Vercel Edge Functions, Cloudflare Workers, AWS Lambda, and Deno Deploy. Use serverless-compatible drivers like @neondatabase/serverless, @planetscale/database, or better-sqlite3.',
    faq7Q: 'What is Drizzle Studio and how do I use it?',
    faq7A: 'Drizzle Studio is a browser-based database GUI included with drizzle-kit. Run npx drizzle-kit studio to start it. It provides a visual interface for browsing tables, editing data, running queries, and inspecting your schema. It uses the same drizzle.config.ts connection settings.',
    faq8Q: 'How do I handle relations in Drizzle?',
    faq8A: 'Drizzle provides two approaches. For explicit joins, use the SQL-like leftJoin, innerJoin, and fullJoin methods. For nested data fetching, define relations using the relations() function and use the relational query API (db.query.tableName.findMany) with the with option to include related data.',
    keyTakeaway1: 'Drizzle ORM provides SQL-like TypeScript queries with full type inference and zero runtime overhead',
    keyTakeaway2: 'Supports PostgreSQL, MySQL, and SQLite with consistent APIs and database-specific features',
    keyTakeaway3: 'Schema definitions in TypeScript double as both database DDL and application types',
    keyTakeaway4: 'drizzle-kit handles migrations (generate, push, introspect) and includes Drizzle Studio for browsing data',
    keyTakeaway5: 'Minimal bundle size (~7.4KB) makes Drizzle ideal for serverless and edge deployments',
    keyTakeaway6: 'Relations support both SQL joins and a declarative relational query API for nested data',
    keyTakeaway7: 'Transactions, prepared statements, and selective column queries optimize production performance',
  },
  zh: {
    title: 'Drizzle ORM 完全指南：TypeScript 类型安全的 SQL ORM (2026)',
    description: '完整的 Drizzle ORM 指南，涵盖 schema 定义、PostgreSQL/MySQL/SQLite 适配器、类型安全查询、关系、连接、drizzle-kit 迁移、Drizzle Studio、无服务器集成、事务、预处理语句和性能最佳实践。',
    tldr: 'Drizzle ORM 是一个轻量级、类型安全的 TypeScript ORM，使用类 SQL 语法编写查询，提供完整自动补全和编译时类型检查。支持 PostgreSQL、MySQL 和 SQLite，零运行时开销。用 TypeScript 定义 schema，用 drizzle-kit 运行迁移，用 Drizzle Studio 浏览数据，轻松部署到无服务器环境。',
    h2WhatIs: '什么是 Drizzle ORM？',
    whatIsDesc: 'Drizzle ORM 是一个采用根本不同方法的 TypeScript ORM。它不像传统 ORM 那样用方法链隐藏 SQL，而是拥抱 SQL 语法并将其直接映射到 TypeScript。每个查询看起来像 SQL，但具有完整的类型推断、自动补全和编译时验证。',
    h3WhyDrizzle: '为什么选择 Drizzle？',
    why1: '类 SQL 语法：查询读起来像 SQL，而非方法链',
    why2: '类型安全：从 schema 到查询结果的完整 TypeScript 推断',
    why3: '轻量级：零依赖，最小包体积（gzip 后约 7.4KB）',
    why4: '无服务器就绪：无连接池问题，适用于边缘运行时',
    why5: '多数据库：PostgreSQL、MySQL、SQLite 使用相同 API',
    why6: 'Drizzle Kit：CLI 工具提供 schema 迁移、推送和内省',
    why7: 'Drizzle Studio：基于浏览器的数据库 GUI，用于查看和编辑数据',
    h2Comparison: 'Drizzle vs Prisma vs TypeORM',
    comparisonDesc: '每个 ORM 有不同的权衡。Drizzle 优先考虑 SQL 熟悉度和最小开销。Prisma 优先考虑开发者体验。TypeORM 遵循传统 ORM 模式。',
    h2Schema: 'Schema 定义',
    schemaDesc: 'Drizzle schema 用纯 TypeScript 文件编写。每个表使用直接映射到 SQL 列类型的辅助函数定义。schema 同时作为数据库定义和 TypeScript 类型。',
    h3Postgres: 'PostgreSQL Schema',
    h3Mysql: 'MySQL Schema',
    h3Sqlite: 'SQLite Schema',
    h2Setup: '项目设置和配置',
    setupDesc: '设置 Drizzle 需要安装 ORM 包、数据库驱动和 drizzle-kit。配置比其他 ORM 简单得多。',
    h2Queries: '类型安全查询',
    queriesDesc: 'Drizzle 提供两种查询 API：类 SQL 核心 API 和关系查询 API。核心 API 直接映射 SQL 语法，关系 API 提供更声明式的嵌套数据获取方式。',
    h3Select: 'SELECT 查询',
    h3Insert: 'INSERT 操作',
    h3Update: 'UPDATE 操作',
    h3Delete: 'DELETE 操作',
    h2Relations: '关系和连接',
    relationsDesc: 'Drizzle 同时支持显式 SQL 连接和关系查询 API。关系与 schema 分开定义，保持表定义整洁。',
    h3DefineRelations: '定义关系',
    h3Joins: 'SQL 连接',
    h3RelationalQueries: '关系查询',
    h2Migrations: '使用 drizzle-kit 迁移',
    migrationsDesc: 'Drizzle Kit 通过对比 TypeScript schema 和当前数据库状态生成 SQL 迁移文件。支持 generate、push 和 introspect 工作流。',
    h3Generate: '生成迁移',
    h3Push: 'Push（开发环境）',
    h3Introspect: '内省现有数据库',
    h2Studio: 'Drizzle Studio',
    studioDesc: 'Drizzle Studio 是 drizzle-kit 内置的浏览器数据库 GUI。运行一个命令即可获得可视化界面，用于浏览表、编辑行、运行查询和检查 schema。',
    h2Integration: '框架集成',
    integrationDesc: 'Drizzle 适用于任何 TypeScript 运行时。以下是最流行框架的集成模式。',
    h3Nextjs: 'Next.js 集成',
    h3Hono: 'Hono 集成',
    h3Serverless: '无服务器和边缘',
    h2Transactions: '事务和预处理语句',
    transactionsDesc: 'Drizzle 支持数据库事务用于原子操作，预处理语句用于提高重复查询的性能。',
    h3TransactionUsage: '使用事务',
    h3PreparedStatements: '预处理语句',
    h2Performance: '性能优化',
    perfDesc: 'Drizzle 由于薄抽象层已经是最快的 TypeScript ORM 之一。这些模式帮助你在生产中获得更好的性能。',
    bp1: '使用 select() 指定列而非查询所有列以减少数据传输',
    bp2: '为 WHERE、ORDER BY 和 JOIN 条件中使用的列创建数据库索引',
    bp3: '对频繁执行的查询使用预处理语句以跳过查询规划',
    bp4: '在事务中批量处理相关写入以减少往返',
    bp5: '在无服务器环境中使用连接池',
    bp6: '在开发中启用查询日志以尽早发现 N+1 查询',
    bp7: '使用关系查询 API 获取嵌套数据，而非多次顺序查询',
    bp8: '对所有返回列表的查询添加 .limit() 以防止无限结果集',
    h2Faq: '常见问题',
    faq1Q: 'Drizzle ORM 与 Prisma 相比如何？',
    faq1A: 'Drizzle 使用 TypeScript 定义 schema 和类 SQL 查询语法，Prisma 使用自己的 schema 语言。Drizzle 零依赖、包体积更小，更适合无服务器环境。',
    faq2Q: 'Drizzle 支持 MongoDB 吗？',
    faq2A: '不支持。Drizzle 专为 SQL 数据库设计：PostgreSQL、MySQL 和 SQLite。MongoDB 可以考虑 Mongoose 或 Prisma。',
    faq3Q: '可以对现有数据库使用 Drizzle 吗？',
    faq3A: '可以。使用 drizzle-kit introspect 从现有数据库生成 TypeScript schema 文件。',
    faq4Q: 'Drizzle 生产环境可用吗？',
    faq4A: '可以。Drizzle ORM 被许多公司在生产中使用，API 稳定，积极维护。',
    faq5Q: '生产环境如何处理数据库迁移？',
    faq5A: '使用 drizzle-kit generate 创建迁移文件，然后在 CI/CD 中运行。将迁移文件存入版本控制。',
    faq6Q: 'Drizzle 适用于无服务器平台吗？',
    faq6A: '非常适合。Drizzle 包体积小、零依赖，适用于 Vercel Edge、Cloudflare Workers、AWS Lambda。',
    faq7Q: '什么是 Drizzle Studio？',
    faq7A: 'Drizzle Studio 是 drizzle-kit 内置的浏览器数据库 GUI。运行 npx drizzle-kit studio 启动。',
    faq8Q: '如何处理 Drizzle 中的关系？',
    faq8A: 'Drizzle 提供两种方式：显式 SQL JOIN 和关系查询 API（使用 relations() 函数和 with 选项）。',
    keyTakeaway1: 'Drizzle ORM 提供类 SQL 的 TypeScript 查询，具有完整类型推断和零运行时开销',
    keyTakeaway2: '支持 PostgreSQL、MySQL 和 SQLite，API 一致且有数据库特定功能',
    keyTakeaway3: 'TypeScript 中的 schema 定义同时充当数据库 DDL 和应用类型',
    keyTakeaway4: 'drizzle-kit 处理迁移（generate、push、introspect）并包含 Drizzle Studio',
    keyTakeaway5: '最小包体积（约 7.4KB）使 Drizzle 非常适合无服务器和边缘部署',
    keyTakeaway6: '关系支持 SQL 连接和声明式关系查询 API',
    keyTakeaway7: '事务、预处理语句和选择性列查询优化生产性能',
  },
};

const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' };
const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#334155' };
const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };

export default function DrizzleOrmGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  return (
    <article style={{ maxWidth: '820px', lineHeight: '1.75', color: '#334155' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.4rem', color: '#0369a1' }}>TL;DR</strong>
        <p style={{ margin: 0 }}>{t.tldr}</p>
      </div>

      {/* What Is Drizzle ORM */}
      <h2 style={h2Style}>{t.h2WhatIs}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>

      <h3 style={h3Style}>{t.h3WhyDrizzle}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.why1, t.why2, t.why3, t.why4, t.why5, t.why6, t.why7].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Drizzle vs Prisma vs TypeORM */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Drizzle</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Prisma</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>TypeORM</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Schema language', 'TypeScript', 'Prisma Schema (.prisma)', 'TypeScript decorators'],
              ['Query style', 'SQL-like', 'Method chaining', 'Repository / QueryBuilder'],
              ['Type safety', 'Full (inferred from schema)', 'Full (generated client)', 'Partial (decorators)'],
              ['Bundle size', '~7.4KB gzipped', '~2MB (Prisma Client)', '~1.5MB'],
              ['Dependencies', 'Zero', 'Prisma Engine (Rust)', 'Many (reflect-metadata, etc.)'],
              ['Databases', 'PostgreSQL, MySQL, SQLite', 'PostgreSQL, MySQL, SQLite, MongoDB, SQL Server', 'PostgreSQL, MySQL, SQLite, many more'],
              ['Serverless', 'Excellent (minimal overhead)', 'Good (engine binary needed)', 'Poor (heavy startup)'],
              ['Migrations', 'drizzle-kit generate/push', 'prisma migrate', 'TypeORM CLI'],
              ['GUI Tool', 'Drizzle Studio', 'Prisma Studio', 'None built-in'],
              ['Raw SQL', 'First-class (sql`` tag)', 'prisma.$queryRaw', 'query()'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>{row[0]}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>{row[1]}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>{row[2]}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Schema Definition */}
      <h2 style={h2Style}>{t.h2Schema}</h2>
      <p style={pStyle}>{t.schemaDesc}</p>

      <h3 style={h3Style}>{t.h3Postgres}</h3>
      <pre style={codeStyle}><code>{'// src/db/schema.ts\n' +
        'import {\n' +
        '  pgTable, serial, varchar, text, integer,\n' +
        '  timestamp, boolean, pgEnum, uniqueIndex\n' +
        '} from "drizzle-orm/pg-core";\n\n' +
        '// Define an enum\n' +
        'export const roleEnum = pgEnum("role", ["admin", "user", "guest"]);\n\n' +
        '// Users table\n' +
        'export const users = pgTable("users", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  name: varchar("name", { length: 255 }).notNull(),\n' +
        '  email: varchar("email", { length: 255 }).notNull().unique(),\n' +
        '  role: roleEnum("role").default("user").notNull(),\n' +
        '  bio: text("bio"),\n' +
        '  isActive: boolean("is_active").default(true).notNull(),\n' +
        '  createdAt: timestamp("created_at").defaultNow().notNull(),\n' +
        '  updatedAt: timestamp("updated_at").defaultNow().notNull(),\n' +
        '}, (table) => ({\n' +
        '  emailIdx: uniqueIndex("email_idx").on(table.email),\n' +
        '}));\n\n' +
        '// Posts table\n' +
        'export const posts = pgTable("posts", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  title: varchar("title", { length: 500 }).notNull(),\n' +
        '  content: text("content").notNull(),\n' +
        '  published: boolean("published").default(false).notNull(),\n' +
        '  authorId: integer("author_id").notNull()\n' +
        '    .references(() => users.id, { onDelete: "cascade" }),\n' +
        '  createdAt: timestamp("created_at").defaultNow().notNull(),\n' +
        '});\n\n' +
        '// Comments table\n' +
        'export const comments = pgTable("comments", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  body: text("body").notNull(),\n' +
        '  postId: integer("post_id").notNull()\n' +
        '    .references(() => posts.id, { onDelete: "cascade" }),\n' +
        '  authorId: integer("author_id").notNull()\n' +
        '    .references(() => users.id, { onDelete: "cascade" }),\n' +
        '  createdAt: timestamp("created_at").defaultNow().notNull(),\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3Mysql}</h3>
      <pre style={codeStyle}><code>{'// src/db/schema.ts (MySQL)\n' +
        'import {\n' +
        '  mysqlTable, serial, varchar, text,\n' +
        '  int, timestamp, boolean, mysqlEnum\n' +
        '} from "drizzle-orm/mysql-core";\n\n' +
        'export const users = mysqlTable("users", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  name: varchar("name", { length: 255 }).notNull(),\n' +
        '  email: varchar("email", { length: 255 }).notNull().unique(),\n' +
        '  role: mysqlEnum("role", ["admin", "user", "guest"])\n' +
        '    .default("user").notNull(),\n' +
        '  createdAt: timestamp("created_at").defaultNow().notNull(),\n' +
        '});\n\n' +
        'export const posts = mysqlTable("posts", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  title: varchar("title", { length: 500 }).notNull(),\n' +
        '  content: text("content").notNull(),\n' +
        '  authorId: int("author_id").notNull()\n' +
        '    .references(() => users.id),\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3Sqlite}</h3>
      <pre style={codeStyle}><code>{'// src/db/schema.ts (SQLite)\n' +
        'import {\n' +
        '  sqliteTable, integer, text\n' +
        '} from "drizzle-orm/sqlite-core";\n\n' +
        'export const users = sqliteTable("users", {\n' +
        '  id: integer("id").primaryKey({ autoIncrement: true }),\n' +
        '  name: text("name").notNull(),\n' +
        '  email: text("email").notNull().unique(),\n' +
        '  role: text("role", { enum: ["admin", "user", "guest"] })\n' +
        '    .default("user").notNull(),\n' +
        '  createdAt: text("created_at")\n' +
        '    .default("CURRENT_TIMESTAMP").notNull(),\n' +
        '});\n\n' +
        'export const posts = sqliteTable("posts", {\n' +
        '  id: integer("id").primaryKey({ autoIncrement: true }),\n' +
        '  title: text("title").notNull(),\n' +
        '  content: text("content").notNull(),\n' +
        '  authorId: integer("author_id").notNull()\n' +
        '    .references(() => users.id),\n' +
        '});'}</code></pre>

      {/* Project Setup */}
      <h2 style={h2Style}>{t.h2Setup}</h2>
      <p style={pStyle}>{t.setupDesc}</p>
      <pre style={codeStyle}><code>{'# Install Drizzle ORM + PostgreSQL driver\n' +
        'npm install drizzle-orm postgres\n' +
        'npm install -D drizzle-kit\n\n' +
        '# Or with MySQL\n' +
        'npm install drizzle-orm mysql2\n' +
        'npm install -D drizzle-kit\n\n' +
        '# Or with SQLite\n' +
        'npm install drizzle-orm better-sqlite3\n' +
        'npm install -D drizzle-kit @types/better-sqlite3'}</code></pre>

      <pre style={codeStyle}><code>{'// drizzle.config.ts\n' +
        'import { defineConfig } from "drizzle-kit";\n\n' +
        'export default defineConfig({\n' +
        '  schema: "./src/db/schema.ts",\n' +
        '  out: "./drizzle",\n' +
        '  dialect: "postgresql",\n' +
        '  dbCredentials: {\n' +
        '    url: process.env.DATABASE_URL!,\n' +
        '  },\n' +
        '});'}</code></pre>

      <pre style={codeStyle}><code>{'// src/db/index.ts\n' +
        'import { drizzle } from "drizzle-orm/postgres-js";\n' +
        'import postgres from "postgres";\n' +
        'import * as schema from "./schema";\n\n' +
        'const connection = postgres(process.env.DATABASE_URL!);\n' +
        'export const db = drizzle(connection, { schema });\n\n' +
        '// For MySQL:\n' +
        '// import { drizzle } from "drizzle-orm/mysql2";\n' +
        '// import mysql from "mysql2/promise";\n' +
        '// const pool = mysql.createPool(process.env.DATABASE_URL!);\n' +
        '// export const db = drizzle(pool, { schema });\n\n' +
        '// For SQLite:\n' +
        '// import { drizzle } from "drizzle-orm/better-sqlite3";\n' +
        '// import Database from "better-sqlite3";\n' +
        '// const sqlite = new Database("local.db");\n' +
        '// export const db = drizzle(sqlite, { schema });'}</code></pre>

      {/* Type-Safe Queries */}
      <h2 style={h2Style}>{t.h2Queries}</h2>
      <p style={pStyle}>{t.queriesDesc}</p>

      <h3 style={h3Style}>{t.h3Select}</h3>
      <pre style={codeStyle}><code>{'import { eq, gt, like, and, or, desc, asc, count, sql } from "drizzle-orm";\n' +
        'import { db } from "./db";\n' +
        'import { users, posts } from "./db/schema";\n\n' +
        '// Select all users\n' +
        'const allUsers = await db.select().from(users);\n' +
        '// Type: { id: number; name: string; email: string; role: string; ... }[]\n\n' +
        '// Select specific columns\n' +
        'const userNames = await db.select({\n' +
        '  id: users.id,\n' +
        '  name: users.name,\n' +
        '}).from(users);\n' +
        '// Type: { id: number; name: string }[]\n\n' +
        '// WHERE clause with conditions\n' +
        'const activeAdmins = await db.select()\n' +
        '  .from(users)\n' +
        '  .where(\n' +
        '    and(\n' +
        '      eq(users.role, "admin"),\n' +
        '      eq(users.isActive, true)\n' +
        '    )\n' +
        '  );\n\n' +
        '// Complex filtering\n' +
        'const searchResults = await db.select()\n' +
        '  .from(users)\n' +
        '  .where(\n' +
        '    or(\n' +
        '      like(users.name, "%alice%"),\n' +
        '      like(users.email, "%alice%")\n' +
        '    )\n' +
        '  )\n' +
        '  .orderBy(desc(users.createdAt))\n' +
        '  .limit(10)\n' +
        '  .offset(0);\n\n' +
        '// Aggregation\n' +
        'const userCount = await db.select({\n' +
        '  role: users.role,\n' +
        '  total: count(),\n' +
        '}).from(users).groupBy(users.role);\n' +
        '// Type: { role: string; total: number }[]'}</code></pre>

      <h3 style={h3Style}>{t.h3Insert}</h3>
      <pre style={codeStyle}><code>{'// Insert a single row\n' +
        'const newUser = await db.insert(users).values({\n' +
        '  name: "Alice",\n' +
        '  email: "alice@example.com",\n' +
        '  role: "admin",\n' +
        '}).returning();\n' +
        '// Returns: { id: 1, name: "Alice", ... }[]\n\n' +
        '// Insert multiple rows\n' +
        'await db.insert(users).values([\n' +
        '  { name: "Bob", email: "bob@example.com" },\n' +
        '  { name: "Charlie", email: "charlie@example.com" },\n' +
        ']);\n\n' +
        '// Upsert (insert or update on conflict)\n' +
        'await db.insert(users)\n' +
        '  .values({ name: "Alice", email: "alice@example.com" })\n' +
        '  .onConflictDoUpdate({\n' +
        '    target: users.email,\n' +
        '    set: { name: "Alice Updated" },\n' +
        '  });'}</code></pre>

      <h3 style={h3Style}>{t.h3Update}</h3>
      <pre style={codeStyle}><code>{'// Update rows matching a condition\n' +
        'await db.update(users)\n' +
        '  .set({\n' +
        '    role: "admin",\n' +
        '    updatedAt: new Date(),\n' +
        '  })\n' +
        '  .where(eq(users.email, "alice@example.com"));\n\n' +
        '// Update with returning\n' +
        'const updated = await db.update(users)\n' +
        '  .set({ isActive: false })\n' +
        '  .where(eq(users.id, 1))\n' +
        '  .returning({ id: users.id, name: users.name });'}</code></pre>

      <h3 style={h3Style}>{t.h3Delete}</h3>
      <pre style={codeStyle}><code>{'// Delete rows matching a condition\n' +
        'await db.delete(users)\n' +
        '  .where(eq(users.id, 1));\n\n' +
        '// Delete with returning\n' +
        'const deleted = await db.delete(posts)\n' +
        '  .where(\n' +
        '    and(\n' +
        '      eq(posts.published, false),\n' +
        '      gt(posts.createdAt, new Date("2024-01-01"))\n' +
        '    )\n' +
        '  )\n' +
        '  .returning();\n\n' +
        '// Delete all rows (use with caution)\n' +
        '// await db.delete(users);'}</code></pre>

      {/* Relations and Joins */}
      <h2 style={h2Style}>{t.h2Relations}</h2>
      <p style={pStyle}>{t.relationsDesc}</p>

      <h3 style={h3Style}>{t.h3DefineRelations}</h3>
      <pre style={codeStyle}><code>{'// src/db/relations.ts\n' +
        'import { relations } from "drizzle-orm";\n' +
        'import { users, posts, comments } from "./schema";\n\n' +
        '// User has many posts and comments\n' +
        'export const usersRelations = relations(users, ({ many }) => ({\n' +
        '  posts: many(posts),\n' +
        '  comments: many(comments),\n' +
        '}));\n\n' +
        '// Post belongs to user, has many comments\n' +
        'export const postsRelations = relations(posts, ({ one, many }) => ({\n' +
        '  author: one(users, {\n' +
        '    fields: [posts.authorId],\n' +
        '    references: [users.id],\n' +
        '  }),\n' +
        '  comments: many(comments),\n' +
        '}));\n\n' +
        '// Comment belongs to post and user\n' +
        'export const commentsRelations = relations(comments, ({ one }) => ({\n' +
        '  post: one(posts, {\n' +
        '    fields: [comments.postId],\n' +
        '    references: [posts.id],\n' +
        '  }),\n' +
        '  author: one(users, {\n' +
        '    fields: [comments.authorId],\n' +
        '    references: [users.id],\n' +
        '  }),\n' +
        '}));'}</code></pre>

      <h3 style={h3Style}>{t.h3Joins}</h3>
      <pre style={codeStyle}><code>{'// Inner join: users with their posts\n' +
        'const usersWithPosts = await db.select({\n' +
        '  userId: users.id,\n' +
        '  userName: users.name,\n' +
        '  postTitle: posts.title,\n' +
        '  postCreated: posts.createdAt,\n' +
        '}).from(users)\n' +
        '  .innerJoin(posts, eq(users.id, posts.authorId))\n' +
        '  .where(eq(posts.published, true));\n\n' +
        '// Left join: all users, including those without posts\n' +
        'const allUsersWithPosts = await db.select({\n' +
        '  userId: users.id,\n' +
        '  userName: users.name,\n' +
        '  postTitle: posts.title,\n' +
        '}).from(users)\n' +
        '  .leftJoin(posts, eq(users.id, posts.authorId));\n\n' +
        '// Multi-table join\n' +
        'const postWithComments = await db.select({\n' +
        '  postTitle: posts.title,\n' +
        '  commentBody: comments.body,\n' +
        '  authorName: users.name,\n' +
        '}).from(posts)\n' +
        '  .innerJoin(comments, eq(posts.id, comments.postId))\n' +
        '  .innerJoin(users, eq(comments.authorId, users.id))\n' +
        '  .where(eq(posts.id, 1));'}</code></pre>

      <h3 style={h3Style}>{t.h3RelationalQueries}</h3>
      <pre style={codeStyle}><code>{'// Fetch user with their posts and comments (nested)\n' +
        'const userWithData = await db.query.users.findFirst({\n' +
        '  where: eq(users.id, 1),\n' +
        '  with: {\n' +
        '    posts: {\n' +
        '      where: eq(posts.published, true),\n' +
        '      orderBy: [desc(posts.createdAt)],\n' +
        '      limit: 5,\n' +
        '      with: {\n' +
        '        comments: {\n' +
        '          with: {\n' +
        '            author: true,\n' +
        '          },\n' +
        '        },\n' +
        '      },\n' +
        '    },\n' +
        '  },\n' +
        '});\n' +
        '// Result type is fully inferred:\n' +
        '// {\n' +
        '//   id: number; name: string; email: string;\n' +
        '//   posts: {\n' +
        '//     id: number; title: string;\n' +
        '//     comments: { body: string; author: { name: string } }[]\n' +
        '//   }[]\n' +
        '// }\n\n' +
        '// Find many with filtering\n' +
        'const recentPosts = await db.query.posts.findMany({\n' +
        '  where: eq(posts.published, true),\n' +
        '  orderBy: [desc(posts.createdAt)],\n' +
        '  limit: 20,\n' +
        '  with: {\n' +
        '    author: {\n' +
        '      columns: { id: true, name: true },\n' +
        '    },\n' +
        '  },\n' +
        '});'}</code></pre>

      {/* Migrations */}
      <h2 style={h2Style}>{t.h2Migrations}</h2>
      <p style={pStyle}>{t.migrationsDesc}</p>

      <h3 style={h3Style}>{t.h3Generate}</h3>
      <pre style={codeStyle}><code>{'# Generate a migration from schema changes\n' +
        'npx drizzle-kit generate\n\n' +
        '# Output: drizzle/0001_cool_migration.sql\n' +
        '# CREATE TABLE "users" (\n' +
        '#   "id" serial PRIMARY KEY NOT NULL,\n' +
        '#   "name" varchar(255) NOT NULL,\n' +
        '#   "email" varchar(255) NOT NULL,\n' +
        '#   ...\n' +
        '# );\n\n' +
        '# Apply migrations programmatically\n' +
        '# In your application entry point:\n' +
        '# import { migrate } from "drizzle-orm/postgres-js/migrator";\n' +
        '# await migrate(db, { migrationsFolder: "./drizzle" });'}</code></pre>

      <h3 style={h3Style}>{t.h3Push}</h3>
      <pre style={codeStyle}><code>{'# Push schema directly to database (development only)\n' +
        '# Skips migration files, applies changes immediately\n' +
        'npx drizzle-kit push\n\n' +
        '# Check what changes would be applied\n' +
        'npx drizzle-kit check'}</code></pre>

      <h3 style={h3Style}>{t.h3Introspect}</h3>
      <pre style={codeStyle}><code>{'# Generate Drizzle schema from existing database\n' +
        'npx drizzle-kit introspect\n\n' +
        '# Output: drizzle/schema.ts\n' +
        '# This creates TypeScript schema files that match\n' +
        '# your existing database structure.\n' +
        '# Useful for migrating from another ORM or raw SQL.'}</code></pre>

      {/* Drizzle Studio */}
      <h2 style={h2Style}>{t.h2Studio}</h2>
      <p style={pStyle}>{t.studioDesc}</p>
      <pre style={codeStyle}><code>{'# Launch Drizzle Studio\n' +
        'npx drizzle-kit studio\n\n' +
        '# Opens a browser GUI at https://local.drizzle.studio\n' +
        '# Features:\n' +
        '# - Browse all tables and their data\n' +
        '# - Edit rows inline\n' +
        '# - Run custom SQL queries\n' +
        '# - View table schemas and relations\n' +
        '# - Filter and sort data\n' +
        '# - Export query results\n' +
        '#\n' +
        '# Uses the same drizzle.config.ts for DB connection.\n' +
        '# No additional setup required.'}</code></pre>

      {/* Framework Integration */}
      <h2 style={h2Style}>{t.h2Integration}</h2>
      <p style={pStyle}>{t.integrationDesc}</p>

      <h3 style={h3Style}>{t.h3Nextjs}</h3>
      <pre style={codeStyle}><code>{'// src/db/index.ts (Next.js with Neon serverless)\n' +
        'import { drizzle } from "drizzle-orm/neon-http";\n' +
        'import { neon } from "@neondatabase/serverless";\n' +
        'import * as schema from "./schema";\n\n' +
        'const sql = neon(process.env.DATABASE_URL!);\n' +
        'export const db = drizzle(sql, { schema });\n\n' +
        '// app/users/page.tsx (Server Component)\n' +
        'import { db } from "@/db";\n' +
        'import { users } from "@/db/schema";\n' +
        'import { desc } from "drizzle-orm";\n\n' +
        'export default async function UsersPage() {\n' +
        '  const allUsers = await db.select()\n' +
        '    .from(users)\n' +
        '    .orderBy(desc(users.createdAt))\n' +
        '    .limit(50);\n\n' +
        '  return (\n' +
        '    <ul>\n' +
        '      {allUsers.map(user => (\n' +
        '        <li key={user.id}>{user.name}</li>\n' +
        '      ))}\n' +
        '    </ul>\n' +
        '  );\n' +
        '}\n\n' +
        '// app/api/users/route.ts (Route Handler)\n' +
        'import { NextResponse } from "next/server";\n' +
        'import { db } from "@/db";\n' +
        'import { users } from "@/db/schema";\n\n' +
        'export async function POST(request: Request) {\n' +
        '  const body = await request.json();\n' +
        '  const newUser = await db.insert(users)\n' +
        '    .values(body)\n' +
        '    .returning();\n' +
        '  return NextResponse.json(newUser[0]);\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>{t.h3Hono}</h3>
      <pre style={codeStyle}><code>{'// src/index.ts (Hono with Drizzle)\n' +
        'import { Hono } from "hono";\n' +
        'import { drizzle } from "drizzle-orm/postgres-js";\n' +
        'import postgres from "postgres";\n' +
        'import { users } from "./db/schema";\n' +
        'import { eq } from "drizzle-orm";\n\n' +
        'const sql = postgres(process.env.DATABASE_URL!);\n' +
        'const db = drizzle(sql);\n\n' +
        'const app = new Hono();\n\n' +
        'app.get("/users", async (c) => {\n' +
        '  const allUsers = await db.select().from(users);\n' +
        '  return c.json(allUsers);\n' +
        '});\n\n' +
        'app.get("/users/:id", async (c) => {\n' +
        '  const id = Number(c.req.param("id"));\n' +
        '  const user = await db.select().from(users)\n' +
        '    .where(eq(users.id, id));\n' +
        '  if (!user.length) return c.json({ error: "Not found" }, 404);\n' +
        '  return c.json(user[0]);\n' +
        '});\n\n' +
        'export default app;'}</code></pre>

      <h3 style={h3Style}>{t.h3Serverless}</h3>
      <pre style={codeStyle}><code>{'// Cloudflare Workers with D1 (SQLite)\n' +
        'import { drizzle } from "drizzle-orm/d1";\n' +
        'import * as schema from "./schema";\n\n' +
        'export default {\n' +
        '  async fetch(request: Request, env: Env) {\n' +
        '    const db = drizzle(env.DB, { schema });\n' +
        '    const allUsers = await db.select().from(schema.users);\n' +
        '    return Response.json(allUsers);\n' +
        '  },\n' +
        '};\n\n' +
        '// Vercel Edge with Neon\n' +
        'import { drizzle } from "drizzle-orm/neon-http";\n' +
        'import { neon } from "@neondatabase/serverless";\n\n' +
        'export const runtime = "edge";\n\n' +
        'export async function GET() {\n' +
        '  const sql = neon(process.env.DATABASE_URL!);\n' +
        '  const db = drizzle(sql);\n' +
        '  const result = await db.select().from(users);\n' +
        '  return Response.json(result);\n' +
        '}\n\n' +
        '// AWS Lambda with PlanetScale\n' +
        'import { drizzle } from "drizzle-orm/planetscale-serverless";\n' +
        'import { Client } from "@planetscale/database";\n\n' +
        'const client = new Client({ url: process.env.DATABASE_URL! });\n' +
        'const db = drizzle(client);'}</code></pre>

      {/* Transactions and Prepared Statements */}
      <h2 style={h2Style}>{t.h2Transactions}</h2>
      <p style={pStyle}>{t.transactionsDesc}</p>

      <h3 style={h3Style}>{t.h3TransactionUsage}</h3>
      <pre style={codeStyle}><code>{'// Basic transaction\n' +
        'await db.transaction(async (tx) => {\n' +
        '  // All operations inside share the same transaction\n' +
        '  const [newUser] = await tx.insert(users)\n' +
        '    .values({ name: "Alice", email: "alice@example.com" })\n' +
        '    .returning();\n\n' +
        '  await tx.insert(posts).values({\n' +
        '    title: "First Post",\n' +
        '    content: "Hello world!",\n' +
        '    authorId: newUser.id,\n' +
        '  });\n\n' +
        '  // If any operation fails, all changes are rolled back\n' +
        '});\n\n' +
        '// Nested transaction with savepoints\n' +
        'await db.transaction(async (tx) => {\n' +
        '  await tx.insert(users)\n' +
        '    .values({ name: "Bob", email: "bob@example.com" });\n\n' +
        '  try {\n' +
        '    await tx.transaction(async (nestedTx) => {\n' +
        '      await nestedTx.insert(posts).values({\n' +
        '        title: "Draft",\n' +
        '        content: "...",\n' +
        '        authorId: 999, // invalid FK\n' +
        '      });\n' +
        '    });\n' +
        '  } catch (e) {\n' +
        '    // Nested transaction rolled back,\n' +
        '    // outer transaction continues\n' +
        '    console.log("Nested transaction failed:", e);\n' +
        '  }\n' +
        '  // Bob is still inserted\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3PreparedStatements}</h3>
      <pre style={codeStyle}><code>{'import { sql, placeholder } from "drizzle-orm";\n\n' +
        '// Prepared statement with placeholder\n' +
        'const getUserById = db.select()\n' +
        '  .from(users)\n' +
        '  .where(eq(users.id, placeholder("id")))\n' +
        '  .prepare("get_user_by_id");\n\n' +
        '// Execute with different values (reuses query plan)\n' +
        'const user1 = await getUserById.execute({ id: 1 });\n' +
        'const user2 = await getUserById.execute({ id: 2 });\n\n' +
        '// Prepared statement with multiple placeholders\n' +
        'const searchUsers = db.select()\n' +
        '  .from(users)\n' +
        '  .where(\n' +
        '    and(\n' +
        '      eq(users.role, placeholder("role")),\n' +
        '      eq(users.isActive, placeholder("active"))\n' +
        '    )\n' +
        '  )\n' +
        '  .limit(placeholder("limit"))\n' +
        '  .prepare("search_users");\n\n' +
        'const admins = await searchUsers.execute({\n' +
        '  role: "admin",\n' +
        '  active: true,\n' +
        '  limit: 10,\n' +
        '});\n\n' +
        '// Raw SQL when needed\n' +
        'const result = await db.execute(\n' +
        '  sql`SELECT * FROM users WHERE name ILIKE ${"%" + search + "%"}`\n' +
        ');'}</code></pre>

      {/* Performance Optimization */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      <pre style={codeStyle}><code>{'// Performance patterns\n\n' +
        '// 1. Select only needed columns\n' +
        'const names = await db.select({\n' +
        '  id: users.id,\n' +
        '  name: users.name,\n' +
        '}).from(users); // faster than db.select().from(users)\n\n' +
        '// 2. Add indexes in schema\n' +
        'import { index } from "drizzle-orm/pg-core";\n\n' +
        'export const posts = pgTable("posts", {\n' +
        '  id: serial("id").primaryKey(),\n' +
        '  title: varchar("title", { length: 500 }).notNull(),\n' +
        '  authorId: integer("author_id").notNull(),\n' +
        '  published: boolean("published").default(false),\n' +
        '  createdAt: timestamp("created_at").defaultNow(),\n' +
        '}, (table) => ({\n' +
        '  authorIdx: index("author_idx").on(table.authorId),\n' +
        '  publishedIdx: index("published_idx")\n' +
        '    .on(table.published, table.createdAt),\n' +
        '}));\n\n' +
        '// 3. Batch operations in transactions\n' +
        'await db.transaction(async (tx) => {\n' +
        '  await tx.insert(posts).values(batchOfPosts);\n' +
        '  await tx.update(users)\n' +
        '    .set({ updatedAt: new Date() })\n' +
        '    .where(eq(users.id, authorId));\n' +
        '});\n\n' +
        '// 4. Always use .limit()\n' +
        'const recent = await db.select().from(posts)\n' +
        '  .orderBy(desc(posts.createdAt))\n' +
        '  .limit(20);  // never fetch unbounded result sets\n\n' +
        '// 5. Enable query logging\n' +
        'const db = drizzle(connection, {\n' +
        '  schema,\n' +
        '  logger: true,  // logs all queries to console\n' +
        '});'}</code></pre>

      {/* FAQ */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.4rem', color: '#1e293b' }}>{q}</h3>
          <p style={{ margin: 0, lineHeight: '1.75' }}>{a}</p>
        </div>
      ))}

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.9' }}>
          <li>{t.keyTakeaway1}</li>
          <li>{t.keyTakeaway2}</li>
          <li>{t.keyTakeaway3}</li>
          <li>{t.keyTakeaway4}</li>
          <li>{t.keyTakeaway5}</li>
          <li>{t.keyTakeaway6}</li>
          <li>{t.keyTakeaway7}</li>
        </ul>
      </div>
    </article>
  );
}
