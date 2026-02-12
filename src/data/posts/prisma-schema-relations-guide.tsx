'use client';
import React from 'react';
import Link from 'next/link';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prisma Schema & Relations Guide: The Definitive Reference',
    intro: 'Prisma is the most popular TypeScript ORM, and its schema-first approach makes database modeling intuitive and type-safe. Whether you are building a new project or migrating from raw SQL, understanding Prisma schema syntax, relations, and queries is essential. This comprehensive guide covers everything from basic model definitions to advanced patterns like soft deletes and multi-tenancy.',
    linkSqlToPrisma: 'Convert SQL to Prisma schema instantly with our free tool \u2192',
    linkJsonToTs: 'Generate TypeScript types from JSON for your API responses \u2192',

    h2WhatIsPrisma: 'What is Prisma?',
    whatIsPrismaDesc: 'Prisma is a next-generation ORM for Node.js and TypeScript. Unlike traditional ORMs that map classes to tables, Prisma uses a <strong>schema-first approach</strong> where you define your data model in a <code>.prisma</code> file, and Prisma generates a fully type-safe client from it.',
    whatIsPrismaComponents: '<ul><li><strong>Prisma Schema</strong> \u2014 a declarative data modeling language (<code>schema.prisma</code>)</li><li><strong>Prisma Client</strong> \u2014 an auto-generated, type-safe query builder for Node.js and TypeScript</li><li><strong>Prisma Migrate</strong> \u2014 a declarative migration system that keeps your database schema in sync</li><li><strong>Prisma Studio</strong> \u2014 a GUI to view and edit data in your database</li></ul>',
    whatIsPrismaWhy: 'Prisma eliminates the impedance mismatch between your application code and the database. You get full autocompletion, compile-time error checking, and no more writing raw SQL for basic CRUD operations.',

    h2SchemaBasics: 'Schema Basics',
    schemaBasicsDesc: 'Every Prisma project starts with a <code>schema.prisma</code> file. It contains three main blocks: <strong>datasource</strong>, <strong>generator</strong>, and <strong>model</strong> definitions.',
    schemaBasicsNote: 'The datasource block configures your database connection. The generator block tells Prisma what client to generate. Models define your database tables.',

    h2FieldTypes: 'Field Types',
    fieldTypesDesc: 'Prisma supports a rich set of scalar types that map to native database column types. Understanding these types is crucial for designing your schema correctly.',
    fieldTypesTable: '<table><thead><tr><th>Prisma Type</th><th>TypeScript Type</th><th>PostgreSQL</th><th>MySQL</th></tr></thead><tbody><tr><td><code>String</code></td><td><code>string</code></td><td><code>text</code></td><td><code>varchar(191)</code></td></tr><tr><td><code>Int</code></td><td><code>number</code></td><td><code>integer</code></td><td><code>int</code></td></tr><tr><td><code>Float</code></td><td><code>number</code></td><td><code>double precision</code></td><td><code>double</code></td></tr><tr><td><code>Boolean</code></td><td><code>boolean</code></td><td><code>boolean</code></td><td><code>tinyint(1)</code></td></tr><tr><td><code>DateTime</code></td><td><code>Date</code></td><td><code>timestamp(3)</code></td><td><code>datetime(3)</code></td></tr><tr><td><code>Json</code></td><td><code>JsonValue</code></td><td><code>jsonb</code></td><td><code>json</code></td></tr><tr><td><code>Bytes</code></td><td><code>Buffer</code></td><td><code>bytea</code></td><td><code>longblob</code></td></tr><tr><td><code>BigInt</code></td><td><code>bigint</code></td><td><code>bigint</code></td><td><code>bigint</code></td></tr><tr><td><code>Decimal</code></td><td><code>Decimal</code></td><td><code>decimal(65,30)</code></td><td><code>decimal(65,30)</code></td></tr></tbody></table>',
    fieldTypesEnumDesc: 'Prisma also supports <strong>enums</strong>, which are particularly useful for status fields, roles, and other fixed-value columns:',

    h2FieldModifiers: 'Field Modifiers & Attributes',
    fieldModifiersDesc: 'Field modifiers and attributes control how fields behave at the database level. They are the building blocks of a well-designed schema.',
    fieldModifiersTable: '<table><thead><tr><th>Attribute</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>?</code></td><td>Makes a field optional (nullable)</td><td><code>bio String?</code></td></tr><tr><td><code>[]</code></td><td>Makes a field a list (array)</td><td><code>tags String[]</code></td></tr><tr><td><code>@id</code></td><td>Marks the primary key</td><td><code>id Int @id @default(autoincrement())</code></td></tr><tr><td><code>@unique</code></td><td>Adds a unique constraint</td><td><code>email String @unique</code></td></tr><tr><td><code>@default()</code></td><td>Sets a default value</td><td><code>role Role @default(USER)</code></td></tr><tr><td><code>@map()</code></td><td>Maps field to a different column name</td><td><code>createdAt DateTime @map("created_at")</code></td></tr><tr><td><code>@@map()</code></td><td>Maps model to a different table name</td><td><code>@@map("blog_posts")</code></td></tr><tr><td><code>@updatedAt</code></td><td>Auto-updates on record change</td><td><code>updatedAt DateTime @updatedAt</code></td></tr><tr><td><code>@relation()</code></td><td>Defines a relation to another model</td><td><code>author User @relation(fields: [authorId], references: [id])</code></td></tr></tbody></table>',

    h2Relations: 'Relations',
    relationsDesc: 'Relations are the heart of any relational database, and Prisma makes them declarative and type-safe. There are three fundamental relation types.',
    relationsOneToOneTitle: 'One-to-One',
    relationsOneToOneDesc: 'Each record in one model corresponds to exactly one record in another model. The foreign key side must include <code>@unique</code> on the relation scalar field.',
    relationsOneToManyTitle: 'One-to-Many',
    relationsOneToManyDesc: 'The most common relation type. One record can be associated with many records in another model. The "many" side holds the foreign key.',
    relationsManyToManyTitle: 'Many-to-Many',
    relationsManyToManyDesc: 'Prisma supports both <strong>implicit</strong> and <strong>explicit</strong> many-to-many relations. Implicit relations let Prisma manage the join table; explicit relations give you full control.',
    relationsManyToManyImplicit: 'Implicit many-to-many (Prisma manages the join table):',
    relationsManyToManyExplicit: 'Explicit many-to-many (you define the join table):',

    h2SelfRelations: 'Self-Relations',
    selfRelationsDesc: 'Self-relations occur when a model references itself. They are common in tree structures, social graphs, and organizational hierarchies.',
    selfRelationsTreeTitle: 'Tree Structure (Parent-Child)',
    selfRelationsTreeDesc: 'A category can have many sub-categories, and each sub-category belongs to one parent:',
    selfRelationsFollowTitle: 'Followers / Following',
    selfRelationsFollowDesc: 'A many-to-many self-relation where users can follow other users:',

    h2Indexes: 'Indexes',
    indexesDesc: 'Indexes dramatically improve query performance. Prisma provides several index types through model-level attributes.',
    indexesTable: '<table><thead><tr><th>Attribute</th><th>Purpose</th><th>Example</th></tr></thead><tbody><tr><td><code>@@index</code></td><td>Creates a standard index</td><td><code>@@index([email])</code></td></tr><tr><td><code>@@unique</code></td><td>Creates a composite unique constraint</td><td><code>@@unique([tenantId, email])</code></td></tr><tr><td><code>@@id</code></td><td>Creates a composite primary key</td><td><code>@@id([postId, tagId])</code></td></tr><tr><td><code>@@fulltext</code></td><td>Creates a full-text search index (MySQL)</td><td><code>@@fulltext([title, content])</code></td></tr></tbody></table>',
    indexesNote: 'Always add indexes to columns that appear in WHERE clauses, JOIN conditions, and ORDER BY. Monitor slow queries and add indexes accordingly.',

    h2Migrations: 'Migrations',
    migrationsDesc: 'Prisma Migrate generates SQL migration files from schema changes. This gives you a versioned history of every database change.',
    migrationsWorkflowTitle: 'Migration Workflow',
    migrationsWorkflow: '<ol><li>Edit your <code>schema.prisma</code> file</li><li>Run <code>npx prisma migrate dev --name descriptive_name</code></li><li>Prisma generates a SQL migration file in <code>prisma/migrations/</code></li><li>Prisma applies the migration to your development database</li><li>Prisma regenerates the Prisma Client</li></ol>',
    migrationsCommandsTitle: 'Key Commands',
    migrationsDbPushNote: '<strong>prisma db push</strong> is ideal for prototyping \u2014 it syncs the schema without creating migration files. Use <strong>prisma migrate dev</strong> for production workflows where you need a migration history.',

    h2PrismaClient: 'Prisma Client Queries',
    prismaClientDesc: 'Prisma Client provides an intuitive, type-safe API for all database operations. Every query is validated at compile time, so typos in field names or incorrect types are caught before your code runs.',
    prismaClientFindTitle: 'Reading Data',
    prismaClientCreateTitle: 'Creating Data',
    prismaClientUpdateTitle: 'Updating Data',
    prismaClientFilterTitle: 'Filtering & Relations',
    prismaClientFilterDesc: 'Prisma provides a powerful filtering API with support for logical operators, relation queries, and aggregation:',

    h2Advanced: 'Advanced Patterns',
    advancedMiddlewareTitle: 'Middleware',
    advancedMiddlewareDesc: 'Prisma middleware lets you intercept queries before or after they execute. This is perfect for logging, soft deletes, and access control:',
    advancedSoftDeleteTitle: 'Soft Delete',
    advancedSoftDeleteDesc: 'Instead of permanently deleting records, mark them as deleted with a timestamp. Use middleware to automatically filter them out:',
    advancedMultiTenancyTitle: 'Multi-Tenancy',
    advancedMultiTenancyDesc: 'Add a <code>tenantId</code> field to every model and use Prisma middleware to automatically scope queries to the current tenant:',
    advancedRawSqlTitle: 'Raw SQL',
    advancedRawSqlDesc: 'When you need full control or complex queries that Prisma Client cannot express, use raw SQL:',

    h2Comparison: 'Prisma vs TypeORM vs Drizzle',
    comparisonDesc: 'Choosing the right ORM depends on your project needs. Here is a comparison of the three most popular TypeScript ORMs:',
    compFeature: 'Feature',
    compPrisma: 'Prisma',
    compTypeORM: 'TypeORM',
    compDrizzle: 'Drizzle',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'What databases does Prisma support?',
    faq1a: 'Prisma supports PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, MongoDB, and CockroachDB. Each database has its own Prisma provider in the datasource block.',
    faq2q: 'Can I use Prisma with an existing database?',
    faq2a: 'Yes. Run npx prisma db pull to introspect your existing database and generate a Prisma schema from it. This is called "introspection" and works with all supported databases.',
    faq3q: 'How does Prisma handle migrations in production?',
    faq3a: 'Use npx prisma migrate deploy in production. It applies all pending migrations in order without generating new ones. Never use prisma migrate dev or prisma db push in production.',
    faq4q: 'Is Prisma slower than raw SQL?',
    faq4a: 'Prisma adds minimal overhead for most queries. The generated SQL is highly optimized. For complex analytical queries, you can use prisma.$queryRaw to write raw SQL while still getting type-safe results.',
    faq5q: 'How do I handle database seeding with Prisma?',
    faq5a: 'Create a prisma/seed.ts file, add a seed script to your package.json, and run npx prisma db seed. Prisma will execute your seed file after migrations. You can use createMany for bulk inserts.',
  },
  zh: {
    title: 'Prisma Schema 与关系完全指南：权威参考',
    intro: 'Prisma 是最流行的 TypeScript ORM，它的 schema 优先方法使数据库建模变得直观且类型安全。无论你是在构建新项目还是从原始 SQL 迁移，理解 Prisma schema 语法、关系和查询都至关重要。本综合指南涵盖了从基本模型定义到软删除和多租户等高级模式的所有内容。',
    linkSqlToPrisma: '使用我们的免费工具即时将 SQL 转换为 Prisma Schema \u2192',
    linkJsonToTs: '从 JSON 生成 TypeScript 类型用于 API 响应 \u2192',

    h2WhatIsPrisma: '什么是 Prisma？',
    whatIsPrismaDesc: 'Prisma 是面向 Node.js 和 TypeScript 的下一代 ORM。与传统 ORM 将类映射到表不同，Prisma 使用 <strong>schema 优先方法</strong>，你在 <code>.prisma</code> 文件中定义数据模型，Prisma 从中生成完全类型安全的客户端。',
    whatIsPrismaComponents: '<ul><li><strong>Prisma Schema</strong> \u2014 声明式数据建模语言（<code>schema.prisma</code>）</li><li><strong>Prisma Client</strong> \u2014 自动生成的、类型安全的 Node.js 和 TypeScript 查询构建器</li><li><strong>Prisma Migrate</strong> \u2014 声明式迁移系统，保持数据库 schema 同步</li><li><strong>Prisma Studio</strong> \u2014 查看和编辑数据库数据的图形界面</li></ul>',
    whatIsPrismaWhy: 'Prisma 消除了应用程序代码和数据库之间的阻抗不匹配。你可以获得完整的自动补全、编译时错误检查，不再需要为基本的 CRUD 操作编写原始 SQL。',

    h2SchemaBasics: 'Schema 基础',
    schemaBasicsDesc: '每个 Prisma 项目都从 <code>schema.prisma</code> 文件开始。它包含三个主要块：<strong>datasource</strong>（数据源）、<strong>generator</strong>（生成器）和 <strong>model</strong>（模型）定义。',
    schemaBasicsNote: 'datasource 块配置数据库连接。generator 块告诉 Prisma 生成什么客户端。model 定义数据库表。',

    h2FieldTypes: '字段类型',
    fieldTypesDesc: 'Prisma 支持丰富的标量类型，映射到原生数据库列类型。理解这些类型对于正确设计 schema 至关重要。',
    fieldTypesTable: '<table><thead><tr><th>Prisma 类型</th><th>TypeScript 类型</th><th>PostgreSQL</th><th>MySQL</th></tr></thead><tbody><tr><td><code>String</code></td><td><code>string</code></td><td><code>text</code></td><td><code>varchar(191)</code></td></tr><tr><td><code>Int</code></td><td><code>number</code></td><td><code>integer</code></td><td><code>int</code></td></tr><tr><td><code>Float</code></td><td><code>number</code></td><td><code>double precision</code></td><td><code>double</code></td></tr><tr><td><code>Boolean</code></td><td><code>boolean</code></td><td><code>boolean</code></td><td><code>tinyint(1)</code></td></tr><tr><td><code>DateTime</code></td><td><code>Date</code></td><td><code>timestamp(3)</code></td><td><code>datetime(3)</code></td></tr><tr><td><code>Json</code></td><td><code>JsonValue</code></td><td><code>jsonb</code></td><td><code>json</code></td></tr><tr><td><code>Bytes</code></td><td><code>Buffer</code></td><td><code>bytea</code></td><td><code>longblob</code></td></tr><tr><td><code>BigInt</code></td><td><code>bigint</code></td><td><code>bigint</code></td><td><code>bigint</code></td></tr><tr><td><code>Decimal</code></td><td><code>Decimal</code></td><td><code>decimal(65,30)</code></td><td><code>decimal(65,30)</code></td></tr></tbody></table>',
    fieldTypesEnumDesc: 'Prisma 还支持 <strong>枚举（enum）</strong>，特别适用于状态字段、角色和其他固定值列：',

    h2FieldModifiers: '字段修饰符与属性',
    fieldModifiersDesc: '字段修饰符和属性控制字段在数据库层面的行为。它们是良好 schema 设计的基础。',
    fieldModifiersTable: '<table><thead><tr><th>属性</th><th>用途</th><th>示例</th></tr></thead><tbody><tr><td><code>?</code></td><td>使字段可选（可为空）</td><td><code>bio String?</code></td></tr><tr><td><code>[]</code></td><td>使字段成为列表（数组）</td><td><code>tags String[]</code></td></tr><tr><td><code>@id</code></td><td>标记主键</td><td><code>id Int @id @default(autoincrement())</code></td></tr><tr><td><code>@unique</code></td><td>添加唯一约束</td><td><code>email String @unique</code></td></tr><tr><td><code>@default()</code></td><td>设置默认值</td><td><code>role Role @default(USER)</code></td></tr><tr><td><code>@map()</code></td><td>映射字段到不同的列名</td><td><code>createdAt DateTime @map("created_at")</code></td></tr><tr><td><code>@@map()</code></td><td>映射模型到不同的表名</td><td><code>@@map("blog_posts")</code></td></tr><tr><td><code>@updatedAt</code></td><td>记录变更时自动更新</td><td><code>updatedAt DateTime @updatedAt</code></td></tr><tr><td><code>@relation()</code></td><td>定义与另一模型的关系</td><td><code>author User @relation(fields: [authorId], references: [id])</code></td></tr></tbody></table>',

    h2Relations: '关系',
    relationsDesc: '关系是任何关系型数据库的核心，Prisma 使它们变得声明式且类型安全。有三种基本关系类型。',
    relationsOneToOneTitle: '一对一',
    relationsOneToOneDesc: '一个模型中的每条记录对应另一个模型中的恰好一条记录。外键端必须在关系标量字段上包含 <code>@unique</code>。',
    relationsOneToManyTitle: '一对多',
    relationsOneToManyDesc: '最常见的关系类型。一条记录可以与另一个模型中的多条记录关联。"多"的一方持有外键。',
    relationsManyToManyTitle: '多对多',
    relationsManyToManyDesc: 'Prisma 支持<strong>隐式</strong>和<strong>显式</strong>多对多关系。隐式关系让 Prisma 管理连接表；显式关系让你完全控制。',
    relationsManyToManyImplicit: '隐式多对多（Prisma 管理连接表）：',
    relationsManyToManyExplicit: '显式多对多（你定义连接表）：',

    h2SelfRelations: '自关系',
    selfRelationsDesc: '自关系发生在模型引用自身时。它们在树结构、社交图和组织层级中很常见。',
    selfRelationsTreeTitle: '树结构（父子关系）',
    selfRelationsTreeDesc: '一个分类可以有多个子分类，每个子分类属于一个父分类：',
    selfRelationsFollowTitle: '关注者/关注中',
    selfRelationsFollowDesc: '多对多自关系，用户可以关注其他用户：',

    h2Indexes: '索引',
    indexesDesc: '索引可以显著提升查询性能。Prisma 通过模型级属性提供多种索引类型。',
    indexesTable: '<table><thead><tr><th>属性</th><th>用途</th><th>示例</th></tr></thead><tbody><tr><td><code>@@index</code></td><td>创建标准索引</td><td><code>@@index([email])</code></td></tr><tr><td><code>@@unique</code></td><td>创建复合唯一约束</td><td><code>@@unique([tenantId, email])</code></td></tr><tr><td><code>@@id</code></td><td>创建复合主键</td><td><code>@@id([postId, tagId])</code></td></tr><tr><td><code>@@fulltext</code></td><td>创建全文搜索索引（MySQL）</td><td><code>@@fulltext([title, content])</code></td></tr></tbody></table>',
    indexesNote: '始终为出现在 WHERE 子句、JOIN 条件和 ORDER BY 中的列添加索引。监控慢查询并相应添加索引。',

    h2Migrations: '迁移',
    migrationsDesc: 'Prisma Migrate 从 schema 变更生成 SQL 迁移文件。这为你提供了每次数据库变更的版本化历史。',
    migrationsWorkflowTitle: '迁移工作流',
    migrationsWorkflow: '<ol><li>编辑 <code>schema.prisma</code> 文件</li><li>运行 <code>npx prisma migrate dev --name 描述性名称</code></li><li>Prisma 在 <code>prisma/migrations/</code> 中生成 SQL 迁移文件</li><li>Prisma 将迁移应用到开发数据库</li><li>Prisma 重新生成 Prisma Client</li></ol>',
    migrationsCommandsTitle: '关键命令',
    migrationsDbPushNote: '<strong>prisma db push</strong> 非常适合原型开发——它同步 schema 而不创建迁移文件。在需要迁移历史的生产工作流中使用 <strong>prisma migrate dev</strong>。',

    h2PrismaClient: 'Prisma Client 查询',
    prismaClientDesc: 'Prisma Client 为所有数据库操作提供直观、类型安全的 API。每个查询都在编译时验证，因此字段名拼写错误或类型不正确会在代码运行前被捕获。',
    prismaClientFindTitle: '读取数据',
    prismaClientCreateTitle: '创建数据',
    prismaClientUpdateTitle: '更新数据',
    prismaClientFilterTitle: '过滤与关系',
    prismaClientFilterDesc: 'Prisma 提供强大的过滤 API，支持逻辑运算符、关系查询和聚合：',

    h2Advanced: '高级模式',
    advancedMiddlewareTitle: '中间件',
    advancedMiddlewareDesc: 'Prisma 中间件让你在查询执行前后拦截查询。这非常适合日志记录、软删除和访问控制：',
    advancedSoftDeleteTitle: '软删除',
    advancedSoftDeleteDesc: '不要永久删除记录，而是用时间戳标记为已删除。使用中间件自动过滤它们：',
    advancedMultiTenancyTitle: '多租户',
    advancedMultiTenancyDesc: '在每个模型中添加 <code>tenantId</code> 字段，并使用 Prisma 中间件自动将查询范围限定到当前租户：',
    advancedRawSqlTitle: '原始 SQL',
    advancedRawSqlDesc: '当你需要完全控制或 Prisma Client 无法表达的复杂查询时，使用原始 SQL：',

    h2Comparison: 'Prisma vs TypeORM vs Drizzle',
    comparisonDesc: '选择合适的 ORM 取决于你的项目需求。以下是三个最流行的 TypeScript ORM 的比较：',
    compFeature: '特性',
    compPrisma: 'Prisma',
    compTypeORM: 'TypeORM',
    compDrizzle: 'Drizzle',

    faqTitle: '常见问题',
    faq1q: 'Prisma 支持哪些数据库？',
    faq1a: 'Prisma 支持 PostgreSQL、MySQL、MariaDB、SQLite、SQL Server、MongoDB 和 CockroachDB。每个数据库在 datasource 块中有自己的 Prisma provider。',
    faq2q: '可以在现有数据库上使用 Prisma 吗？',
    faq2a: '可以。运行 npx prisma db pull 来内省现有数据库并从中生成 Prisma schema。这称为"内省"，适用于所有支持的数据库。',
    faq3q: 'Prisma 如何在生产环境中处理迁移？',
    faq3a: '在生产环境中使用 npx prisma migrate deploy。它按顺序应用所有待处理的迁移，而不生成新的迁移。永远不要在生产环境中使用 prisma migrate dev 或 prisma db push。',
    faq4q: 'Prisma 比原始 SQL 慢吗？',
    faq4a: '对于大多数查询，Prisma 增加的开销很小。生成的 SQL 经过高度优化。对于复杂的分析查询，你可以使用 prisma.$queryRaw 编写原始 SQL，同时仍然获得类型安全的结果。',
    faq5q: '如何使用 Prisma 进行数据库种子填充？',
    faq5a: '创建 prisma/seed.ts 文件，在 package.json 中添加 seed 脚本，然后运行 npx prisma db seed。Prisma 将在迁移后执行种子文件。你可以使用 createMany 进行批量插入。',
  },
};

export default function PrismaSchemaRelationsGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
    ],
  };

  return (
    <article className="prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p className="text-lg leading-relaxed mb-8">{t.intro}</p>

      <p>
        <Link href={`/${lang}/tools/sql-to-prisma`} style={{ fontWeight: 600 }}>
          {t.linkSqlToPrisma}
        </Link>
      </p>

      {/* Section 1: What is Prisma */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2WhatIsPrisma}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.whatIsPrismaDesc }} />
      <div dangerouslySetInnerHTML={{ __html: t.whatIsPrismaComponents }} />
      <p className="mb-4">{t.whatIsPrismaWhy}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Install Prisma
npm install prisma --save-dev
npm install @prisma/client

// Initialize a new Prisma project
npx prisma init

// This creates:
// prisma/schema.prisma  — your data model
// .env                  — database connection URL`}</code></pre>

      {/* Section 2: Schema Basics */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2SchemaBasics}</h2>
      <p dangerouslySetInnerHTML={{ __html: t.schemaBasicsDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// prisma/schema.prisma

// 1. Datasource — where your data lives
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 2. Generator — what client to generate
generator client {
  provider = "prisma-client-js"
}

// 3. Model — your database tables
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
  MODERATOR
}`}</code></pre>

      <p className="text-sm text-gray-400 mt-2">{t.schemaBasicsNote}</p>

      {/* Section 3: Field Types */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2FieldTypes}</h2>
      <p className="mb-4">{t.fieldTypesDesc}</p>
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: t.fieldTypesTable }} />

      <p className="mt-6 mb-4" dangerouslySetInnerHTML={{ __html: t.fieldTypesEnumDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model Order {
  id        Int         @id @default(autoincrement())
  status    OrderStatus @default(PENDING)
  total     Decimal
  items     Json        // flexible JSON column
  metadata  Bytes?      // binary data
  createdAt DateTime    @default(now())
}

// Using cuid() or uuid() for string IDs
model Product {
  id    String @id @default(cuid())
  // or: id String @id @default(uuid())
  name  String
  price Float
}`}</code></pre>

      {/* Section 4: Field Modifiers */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2FieldModifiers}</h2>
      <p className="mb-4">{t.fieldModifiersDesc}</p>
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: t.fieldModifiersTable }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?                        // optional field
  bio       String?  @db.Text              // native type mapping
  tags      String[]                       // array field (PostgreSQL)
  role      Role     @default(USER)
  score     Float    @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt      @map("updated_at")

  @@map("users")                           // table name in DB
  @@index([email])
}`}</code></pre>

      {/* Section 5: Relations */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2Relations}</h2>
      <p className="mb-4">{t.relationsDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.relationsOneToOneTitle}</h3>
      <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.relationsOneToOneDesc }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  profile Profile?
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  avatar String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique  // @unique makes it one-to-one
}`}</code></pre>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`// Query with one-to-one relation
const userWithProfile = await prisma.user.findUnique({
  where: { id: 1 },
  include: { profile: true },
});
// userWithProfile.profile?.bio`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.relationsOneToManyTitle}</h3>
      <p className="mb-4">{t.relationsOneToManyDesc}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  posts Post[]                        // one user has many posts
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String?
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int                        // foreign key
}

model Comment {
  id      Int    @id @default(autoincrement())
  text    String
  post    Post   @relation(fields: [postId], references: [id])
  postId  Int
  author  User   @relation(fields: [authorId], references: [id])
  authorId Int
}`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.relationsManyToManyTitle}</h3>
      <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.relationsManyToManyDesc }} />

      <p className="font-semibold mt-4 mb-2">{t.relationsManyToManyImplicit}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model Post {
  id         Int        @id @default(autoincrement())
  title      String
  categories Category[]  // implicit many-to-many
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]                        // implicit many-to-many
}

// Prisma auto-creates a _CategoryToPost join table`}</code></pre>

      <p className="font-semibold mt-4 mb-2">{t.relationsManyToManyExplicit}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model Post {
  id   Int       @id @default(autoincrement())
  title String
  tags  PostTag[]
}

model Tag {
  id    Int       @id @default(autoincrement())
  name  String    @unique
  posts PostTag[]
}

// Explicit join table — you control extra fields
model PostTag {
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  tag       Tag      @relation(fields: [tagId], references: [id])
  tagId     Int
  assignedAt DateTime @default(now())
  assignedBy String?

  @@id([postId, tagId])               // composite primary key
}`}</code></pre>

      {/* Section 6: Self-Relations */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2SelfRelations}</h2>
      <p className="mb-4">{t.selfRelationsDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.selfRelationsTreeTitle}</h3>
      <p className="mb-4">{t.selfRelationsTreeDesc}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model Category {
  id       Int        @id @default(autoincrement())
  name     String
  parent   Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  parentId Int?
  children Category[] @relation("CategoryTree")
}

// Query: Get category with all children
const category = await prisma.category.findUnique({
  where: { id: 1 },
  include: {
    children: {
      include: { children: true },  // nested children
    },
  },
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.selfRelationsFollowTitle}</h3>
      <p className="mb-4">{t.selfRelationsFollowDesc}</p>

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`model User {
  id         Int    @id @default(autoincrement())
  name       String
  followers  User[] @relation("UserFollows")
  following  User[] @relation("UserFollows")
}

// Follow a user
await prisma.user.update({
  where: { id: 1 },
  data: {
    following: { connect: { id: 2 } },
  },
});

// Get user with followers and following
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    followers: true,
    following: true,
  },
});`}</code></pre>

      {/* Section 7: Indexes */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2Indexes}</h2>
      <p className="mb-4">{t.indexesDesc}</p>
      <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: t.indexesTable }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`model User {
  id       Int    @id @default(autoincrement())
  email    String @unique
  tenantId String
  name     String

  @@unique([tenantId, email])           // composite unique
  @@index([tenantId])                   // index for tenant queries
  @@index([name])                       // index for name searches
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  published Boolean  @default(false)
  createdAt DateTime @default(now())

  @@index([authorId])                   // index for author lookups
  @@index([published, createdAt])       // composite for published feed
  @@fulltext([title, content])          // full-text search (MySQL)
}`}</code></pre>

      <p className="text-sm text-gray-400 mt-2">{t.indexesNote}</p>

      {/* Section 8: Migrations */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2Migrations}</h2>
      <p className="mb-4">{t.migrationsDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.migrationsWorkflowTitle}</h3>
      <div dangerouslySetInnerHTML={{ __html: t.migrationsWorkflow }} />

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.migrationsCommandsTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`# Create and apply a migration (development)
npx prisma migrate dev --name add_user_profile

# Apply pending migrations (production)
npx prisma migrate deploy

# Reset database and re-apply all migrations
npx prisma migrate reset

# Push schema without creating migration files (prototyping)
npx prisma db push

# Pull existing database schema into Prisma
npx prisma db pull

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (GUI)
npx prisma studio

# Seed the database
npx prisma db seed`}</code></pre>

      <p className="text-sm text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: t.migrationsDbPushNote }} />

      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm mt-4"><code>{`// Example migration file: prisma/migrations/20240101_add_user_profile/migration.sql
-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "bio" TEXT NOT NULL,
    "avatar" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;`}</code></pre>

      {/* Section 9: Prisma Client Queries */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2PrismaClient}</h2>
      <p className="mb-4">{t.prismaClientDesc}</p>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.prismaClientFindTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Find one by unique field
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
});

// Find one or throw
const user = await prisma.user.findUniqueOrThrow({
  where: { id: 1 },
});

// Find first matching
const admin = await prisma.user.findFirst({
  where: { role: 'ADMIN' },
});

// Find many with pagination
const users = await prisma.user.findMany({
  where: { role: 'USER' },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 20,
  select: {                           // select specific fields
    id: true,
    email: true,
    name: true,
  },
});

// Count records
const userCount = await prisma.user.count({
  where: { role: 'USER' },
});

// Aggregate
const stats = await prisma.order.aggregate({
  _avg: { total: true },
  _sum: { total: true },
  _count: true,
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.prismaClientCreateTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Create a single record
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    role: 'USER',
  },
});

// Create with nested relation
const userWithPosts = await prisma.user.create({
  data: {
    email: 'bob@example.com',
    name: 'Bob',
    posts: {
      create: [
        { title: 'First Post', content: 'Hello World' },
        { title: 'Second Post', content: 'Prisma is great' },
      ],
    },
  },
  include: { posts: true },
});

// Create many records
const result = await prisma.user.createMany({
  data: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
    { email: 'user3@example.com', name: 'User 3' },
  ],
  skipDuplicates: true,               // skip records with unique conflicts
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.prismaClientUpdateTitle}</h3>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Update a single record
const user = await prisma.user.update({
  where: { email: 'alice@example.com' },
  data: { name: 'Alice Smith' },
});

// Update many
const result = await prisma.user.updateMany({
  where: { role: 'USER' },
  data: { role: 'MEMBER' },
});

// Upsert (create or update)
const user = await prisma.user.upsert({
  where: { email: 'alice@example.com' },
  update: { name: 'Alice Updated' },
  create: {
    email: 'alice@example.com',
    name: 'Alice New',
  },
});

// Delete
await prisma.user.delete({
  where: { id: 1 },
});

// Delete many
await prisma.post.deleteMany({
  where: { published: false },
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.prismaClientFilterTitle}</h3>
      <p className="mb-4">{t.prismaClientFilterDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Complex filtering
const posts = await prisma.post.findMany({
  where: {
    AND: [
      { published: true },
      {
        OR: [
          { title: { contains: 'prisma', mode: 'insensitive' } },
          { content: { contains: 'typescript', mode: 'insensitive' } },
        ],
      },
    ],
    author: {
      role: 'ADMIN',                  // filter by relation
    },
    createdAt: {
      gte: new Date('2024-01-01'),    // greater than or equal
    },
  },
  include: {
    author: {
      select: { name: true, email: true },
    },
    _count: {
      select: { comments: true },     // count related comments
    },
  },
  orderBy: [
    { createdAt: 'desc' },
  ],
  take: 10,
});

// Transaction
const [newUser, updatedPost] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'new@example.com', name: 'New' } }),
  prisma.post.update({ where: { id: 1 }, data: { published: true } }),
]);`}</code></pre>

      {/* Section 10: Advanced Patterns */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2Advanced}</h2>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.advancedMiddlewareTitle}</h3>
      <p className="mb-4">{t.advancedMiddlewareDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Logging middleware
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    \`\${params.model}.\${params.action} took \${after - before}ms\`
  );
  return result;
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.advancedSoftDeleteTitle}</h3>
      <p className="mb-4">{t.advancedSoftDeleteDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Schema
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  deletedAt DateTime? // null = not deleted
  // ...
}

// Soft delete middleware
prisma.$use(async (params, next) => {
  // Intercept delete -> update with deletedAt
  if (params.model === 'Post' && params.action === 'delete') {
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };
  }

  // Intercept deleteMany -> updateMany
  if (params.model === 'Post' && params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data) {
      params.args.data['deletedAt'] = new Date();
    } else {
      params.args['data'] = { deletedAt: new Date() };
    }
  }

  // Filter out soft-deleted records on find
  if (params.model === 'Post' && params.action === 'findMany') {
    if (!params.args.where) params.args.where = {};
    params.args.where['deletedAt'] = null;
  }

  return next(params);
});`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.advancedMultiTenancyTitle}</h3>
      <p className="mb-4" dangerouslySetInnerHTML={{ __html: t.advancedMultiTenancyDesc }} />
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Schema
model User {
  id       Int    @id @default(autoincrement())
  email    String
  tenantId String

  @@unique([tenantId, email])
  @@index([tenantId])
}

// Multi-tenancy middleware
function createTenantMiddleware(tenantId: string) {
  return prisma.$use(async (params, next) => {
    // Automatically inject tenantId on create
    if (params.action === 'create') {
      params.args.data.tenantId = tenantId;
    }

    // Automatically scope queries to tenant
    if (['findMany', 'findFirst', 'updateMany', 'deleteMany'].includes(params.action)) {
      if (!params.args.where) params.args.where = {};
      params.args.where.tenantId = tenantId;
    }

    return next(params);
  });
}`}</code></pre>

      <h3 className="text-xl font-semibold mt-8 mb-3">{t.advancedRawSqlTitle}</h3>
      <p className="mb-4">{t.advancedRawSqlDesc}</p>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm"><code>{`// Tagged template for safe parameterized queries
const email = 'alice@example.com';
const user = await prisma.$queryRaw\`
  SELECT * FROM "User" WHERE email = \${email}
\`;

// Unparameterized raw query (use with caution)
const result = await prisma.$queryRawUnsafe(
  'SELECT * FROM "User" WHERE id = $1',
  1
);

// Execute raw SQL (INSERT, UPDATE, DELETE)
const affected = await prisma.$executeRaw\`
  UPDATE "User" SET name = \${'Alice Smith'}
  WHERE email = \${email}
\`;

// Raw SQL with type safety using Prisma.sql
import { Prisma } from '@prisma/client';

const orderBy = Prisma.sql\`ORDER BY "createdAt" DESC\`;
const users = await prisma.$queryRaw\`
  SELECT id, email, name FROM "User"
  \${orderBy}
  LIMIT 10
\`;`}</code></pre>

      {/* Section 11: Comparison Table */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.h2Comparison}</h2>
      <p className="mb-4">{t.comparisonDesc}</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.compFeature}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.compPrisma}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.compTypeORM}</th>
              <th className="border border-gray-700 px-4 py-2 text-left">{t.compDrizzle}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '方法' : 'Approach'}</td>
              <td className="border border-gray-700 px-4 py-2">Schema-first</td>
              <td className="border border-gray-700 px-4 py-2">Code-first / Entity</td>
              <td className="border border-gray-700 px-4 py-2">Code-first / SQL-like</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '类型安全' : 'Type Safety'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '完全自动生成' : 'Full (auto-generated)'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '部分（装饰器）' : 'Partial (decorators)'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '完全（推断）' : 'Full (inferred)'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '迁移' : 'Migrations'}</td>
              <td className="border border-gray-700 px-4 py-2">Prisma Migrate</td>
              <td className="border border-gray-700 px-4 py-2">TypeORM CLI</td>
              <td className="border border-gray-700 px-4 py-2">Drizzle Kit</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '查询风格' : 'Query Style'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '对象 API' : 'Object API'}</td>
              <td className="border border-gray-700 px-4 py-2">QueryBuilder / Repository</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '类 SQL 构建器' : 'SQL-like builder'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '原始 SQL' : 'Raw SQL'}</td>
              <td className="border border-gray-700 px-4 py-2">$queryRaw / $executeRaw</td>
              <td className="border border-gray-700 px-4 py-2">query()</td>
              <td className="border border-gray-700 px-4 py-2">sql``</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '学习曲线' : 'Learning Curve'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '低' : 'Low'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '中等' : 'Medium'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '中等' : 'Medium'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '包大小' : 'Bundle Size'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '较大（引擎二进制）' : 'Larger (engine binary)'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '中等' : 'Medium'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '小' : 'Small'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? 'Edge 兼容' : 'Edge Runtime'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '通过 Accelerate/Driver Adapters' : 'Via Accelerate / Driver Adapters'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '不支持' : 'No'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '原生支持' : 'Native'}</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '数据库支持' : 'DB Support'}</td>
              <td className="border border-gray-700 px-4 py-2">PG, MySQL, SQLite, MSSQL, MongoDB</td>
              <td className="border border-gray-700 px-4 py-2">PG, MySQL, SQLite, MSSQL, Oracle</td>
              <td className="border border-gray-700 px-4 py-2">PG, MySQL, SQLite</td>
            </tr>
            <tr>
              <td className="border border-gray-700 px-4 py-2 font-semibold">{lang === 'zh' ? '最适合' : 'Best For'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '快速开发、类型安全' : 'Rapid dev, type safety'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '企业级、NestJS' : 'Enterprise, NestJS'}</td>
              <td className="border border-gray-700 px-4 py-2">{lang === 'zh' ? '性能、Edge、SQL 控制' : 'Performance, Edge, SQL control'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 12: FAQ */}
      <h2 className="text-2xl font-bold mt-10 mb-4">{t.faqTitle}</h2>
      <div className="space-y-6">
        {[
          [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a],
          [t.faq4q, t.faq4a], [t.faq5q, t.faq5a],
        ].map(([q, a], i) => (
          <div key={i} className="border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{q}</h3>
            <p className="text-gray-300">{a}</p>
          </div>
        ))}
      </div>

      {/* Related Tool Links */}
      <div className="mt-10 p-6 bg-gray-800/50 rounded-lg">
        <p className="mb-3">
          <Link href={`/${lang}/tools/sql-to-prisma`} style={{ fontWeight: 600 }}>
            {t.linkSqlToPrisma}
          </Link>
        </p>
        <p>
          <Link href={`/${lang}/tools/json-to-typescript`} style={{ fontWeight: 600 }}>
            {t.linkJsonToTs}
          </Link>
        </p>
      </div>
    </article>
  );
}
