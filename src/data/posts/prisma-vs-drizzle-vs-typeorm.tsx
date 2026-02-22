'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prisma vs Drizzle vs TypeORM: ORM Comparison 2026',
    intro: 'Choosing the right ORM (Object-Relational Mapping) for your TypeScript project shapes your entire data access layer. Prisma, Drizzle, and TypeORM represent three distinct philosophies: schema-first with code generation, SQL-first with type inference, and decorator-based with active record patterns. This comprehensive comparison examines each ORM across performance, developer experience, type safety, and production readiness to help you make an informed decision in 2026.',

    prismaTitle: 'Prisma: Schema-First, Full-Stack ORM',
    prismaDesc1: 'Prisma is a next-generation ORM that takes a schema-first approach. You define your data model in a Prisma schema file (.prisma), and Prisma generates a fully typed client, database migrations, and an introspection tool. The generated Prisma Client provides autocompletion for every query, including nested relations, filters, and aggregations.',
    prismaDesc2: 'Prisma has become the most popular TypeScript ORM, powering applications from startups to large enterprises. Its developer experience is unmatched: the schema language is intuitive, migrations are handled automatically, and the generated client catches errors at compile time rather than runtime.',
    prismaSchemaCode: `// prisma/schema.prisma
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
  role      Role     @default(USER)
  posts     Post[]
  profile   Profile?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("users")
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  slug        String    @unique
  content     String
  published   Boolean   @default(false)
  publishedAt DateTime?
  author      User      @relation(fields: [authorId], references: [id])
  authorId    Int
  tags        Tag[]
  comments    Comment[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([authorId])
  @@index([slug])
  @@map("posts")
}

model Comment {
  id        Int      @id @default(autoincrement())
  body      String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    Int
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  createdAt DateTime @default(now())

  @@map("comments")
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]

  @@map("tags")
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String?
  avatar String?
  user   User   @relation(fields: [userId], references: [id])
  userId Int    @unique

  @@map("profiles")
}

enum Role {
  USER
  AUTHOR
  ADMIN
}`,
    prismaQueryCode: `// Prisma Client — Query examples
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a user with nested relations
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    role: 'AUTHOR',
    profile: {
      create: {
        bio: 'Full-stack developer',
        avatar: 'https://example.com/alice.jpg',
      },
    },
  },
  include: {
    profile: true,
  },
});

// Query with filters, pagination, and sorting
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'AUTHOR' },
    tags: { some: { name: 'typescript' } },
  },
  include: {
    author: { select: { name: true, email: true } },
    tags: true,
    _count: { select: { comments: true } },
  },
  orderBy: { publishedAt: 'desc' },
  skip: 0,
  take: 10,
});

// Transaction with multiple operations
const [post, updatedUser] = await prisma.$transaction([
  prisma.post.create({
    data: {
      title: 'Getting Started with Prisma',
      slug: 'getting-started-prisma',
      content: '...',
      authorId: user.id,
      tags: {
        connectOrCreate: [
          { where: { name: 'prisma' }, create: { name: 'prisma' } },
          { where: { name: 'orm' }, create: { name: 'orm' } },
        ],
      },
    },
  }),
  prisma.user.update({
    where: { id: user.id },
    data: { role: 'AUTHOR' },
  }),
]);

// Aggregation
const stats = await prisma.post.aggregate({
  where: { published: true },
  _count: true,
  _avg: { authorId: true },
});

// Raw SQL when needed
const result = await prisma.$queryRaw\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p."authorId" = u.id
  WHERE p.published = true
  GROUP BY u.name
  ORDER BY post_count DESC
  LIMIT 10
\`;`,

    drizzleTitle: 'Drizzle: SQL-First, Lightweight ORM',
    drizzleDesc1: 'Drizzle ORM takes a radically different approach: it is SQL-first. Instead of abstracting away SQL, Drizzle embraces it. Your schema is defined in TypeScript, and queries look almost identical to SQL. Drizzle infers types from your schema definition, so you get full type safety without code generation.',
    drizzleDesc2: 'Drizzle is the lightest of the three ORMs, with zero dependencies and a tiny bundle size. It ships as a thin wrapper around SQL, meaning you always know exactly what query will be generated. For developers who know SQL well, Drizzle feels like writing SQL with TypeScript type safety bolted on.',
    drizzleSchemaCode: `// src/db/schema.ts — Drizzle schema definition
import {
  pgTable, serial, text, varchar, boolean,
  timestamp, integer, pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enum
export const roleEnum = pgEnum('role', ['USER', 'AUTHOR', 'ADMIN']);

// Tables
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: text('name'),
  role: roleEnum('role').default('USER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  authorId: integer('author_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  body: text('body').notNull(),
  postId: integer('post_id').references(() => posts.id, {
    onDelete: 'cascade',
  }).notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).unique().notNull(),
});

export const postsTags = pgTable('posts_tags', {
  postId: integer('post_id').references(() => posts.id).notNull(),
  tagId: integer('tag_id').references(() => tags.id).notNull(),
});

// Relations (for query builder)
export const usersRelations = relations(users, ({ many, one }) => ({
  posts: many(posts),
  profile: one(profiles),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  tags: many(postsTags),
}));`,
    drizzleQueryCode: `// Drizzle ORM — Query examples
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, and, desc, sql, count, like } from 'drizzle-orm';
import * as schema from './schema';

const db = drizzle(pool, { schema });

// Insert with returning
const [newUser] = await db.insert(schema.users)
  .values({
    email: 'alice@example.com',
    name: 'Alice',
    role: 'AUTHOR',
  })
  .returning();

// Select with joins — looks like SQL!
const postsWithAuthors = await db
  .select({
    id: schema.posts.id,
    title: schema.posts.title,
    slug: schema.posts.slug,
    authorName: schema.users.name,
    authorEmail: schema.users.email,
    commentCount: count(schema.comments.id),
  })
  .from(schema.posts)
  .leftJoin(schema.users, eq(schema.posts.authorId, schema.users.id))
  .leftJoin(schema.comments, eq(schema.posts.id, schema.comments.postId))
  .where(eq(schema.posts.published, true))
  .groupBy(schema.posts.id, schema.users.name, schema.users.email)
  .orderBy(desc(schema.posts.publishedAt))
  .limit(10)
  .offset(0);

// Relational query builder (Prisma-like API)
const usersWithPosts = await db.query.users.findMany({
  with: {
    posts: {
      where: eq(schema.posts.published, true),
      limit: 5,
      orderBy: desc(schema.posts.publishedAt),
      with: {
        comments: true,
      },
    },
  },
  limit: 10,
});

// Transaction
const result = await db.transaction(async (tx) => {
  const [post] = await tx.insert(schema.posts)
    .values({
      title: 'Drizzle ORM Guide',
      slug: 'drizzle-orm-guide',
      content: '...',
      authorId: newUser.id,
    })
    .returning();

  await tx.update(schema.users)
    .set({ role: 'AUTHOR' })
    .where(eq(schema.users.id, newUser.id));

  return post;
});

// Raw SQL with type safety
const topAuthors = await db.execute(sql\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p.author_id = u.id
  WHERE p.published = true
  GROUP BY u.name
  ORDER BY post_count DESC
  LIMIT 10
\`);`,

    typeormTitle: 'TypeORM: Decorator-Based, Full-Featured',
    typeormDesc1: 'TypeORM is the oldest and most feature-rich of the three ORMs. It uses TypeScript decorators to define entities and supports both Active Record and Data Mapper patterns. TypeORM was heavily inspired by Hibernate (Java) and Doctrine (PHP), making it familiar to developers coming from those ecosystems.',
    typeormDesc2: 'TypeORM supports a wide range of databases (PostgreSQL, MySQL, SQLite, SQL Server, Oracle, MongoDB) and provides advanced features like entity listeners, subscribers, custom repositories, and migrations. However, its TypeScript type safety has historically been weaker than Prisma and Drizzle.',
    typeormEntityCode: `// src/entities/User.ts — TypeORM entity definition
import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
  OneToOne, CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';

export enum Role {
  USER = 'USER',
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// src/entities/Post.ts
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index()
  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  published: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ name: 'author_id' })
  authorId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({ name: 'posts_tags' })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}`,
    typeormQueryCode: `// TypeORM — Query examples
import { AppDataSource } from './data-source';
import { User, Role } from './entities/User';
import { Post } from './entities/Post';

const userRepo = AppDataSource.getRepository(User);
const postRepo = AppDataSource.getRepository(Post);

// Create with relations
const user = userRepo.create({
  email: 'alice@example.com',
  name: 'Alice',
  role: Role.AUTHOR,
});
await userRepo.save(user);

// Query with QueryBuilder
const posts = await postRepo
  .createQueryBuilder('post')
  .leftJoinAndSelect('post.author', 'author')
  .leftJoinAndSelect('post.tags', 'tag')
  .loadRelationCountAndMap('post.commentCount', 'post.comments')
  .where('post.published = :published', { published: true })
  .andWhere('author.role = :role', { role: Role.AUTHOR })
  .orderBy('post.publishedAt', 'DESC')
  .skip(0)
  .take(10)
  .getMany();

// Find with options (simpler API)
const recentPosts = await postRepo.find({
  where: { published: true },
  relations: { author: true, tags: true },
  order: { publishedAt: 'DESC' },
  skip: 0,
  take: 10,
});

// Transaction
await AppDataSource.transaction(async (manager) => {
  const post = manager.create(Post, {
    title: 'TypeORM Guide',
    slug: 'typeorm-guide',
    content: '...',
    authorId: user.id,
  });
  await manager.save(post);

  user.role = Role.AUTHOR;
  await manager.save(user);
});

// Raw query
const topAuthors = await AppDataSource.query(\`
  SELECT u.name, COUNT(p.id) as post_count
  FROM users u
  LEFT JOIN posts p ON p.author_id = u.id
  WHERE p.published = true
  GROUP BY u.name
  ORDER BY post_count DESC
  LIMIT 10
\`);`,

    comparisonTitle: 'Feature Comparison Table',
    comparisonDesc: 'Compare all three ORMs across the dimensions that matter most for production applications:',

    perfTitle: 'Performance Benchmarks',
    perfDesc: 'Performance varies significantly depending on query complexity and usage patterns. Here are general observations from real-world benchmarks:',
    perfDrizzle: 'Drizzle ORM is consistently the fastest because it generates minimal SQL with almost no overhead. It has zero dependencies and a tiny runtime. For simple CRUD operations, Drizzle can be 2-5x faster than Prisma and comparable to raw SQL.',
    perfPrisma: 'Prisma uses a Rust-based query engine that runs as a sidecar process. This adds startup latency (cold start) but provides consistent performance for complex queries. Prisma 6 (2025) significantly improved performance with the Rust engine optimizations. Connection pooling with PgBouncer or Prisma Accelerate helps in serverless environments.',
    perfTypeorm: 'TypeORM performance is generally acceptable but can degrade with complex eager-loading patterns. The QueryBuilder produces efficient SQL, but the Active Record pattern with automatic relation loading can trigger N+1 queries if not carefully managed.',

    migrationsTitle: 'Migration Strategies',
    migrationsDesc: 'Database migrations are critical for production applications. Each ORM handles migrations differently:',
    migrationsPrisma: 'Prisma Migrate generates SQL migration files from schema changes automatically. You edit the .prisma schema, run npx prisma migrate dev, and Prisma creates a timestamped SQL migration. Migrations are stored in the prisma/migrations directory and can be reviewed, edited, and committed to version control.',
    migrationsDrizzle: 'Drizzle Kit generates SQL migrations by diffing your TypeScript schema against the database. Run npx drizzle-kit generate to create migration files. Drizzle migrations are plain SQL, giving you full control. Drizzle also supports push mode for rapid prototyping (applies schema changes directly without migration files).',
    migrationsTypeorm: 'TypeORM supports both auto-synchronization (for development) and manual migrations. Run npx typeorm migration:generate to create a migration from entity changes. TypeORM migrations are TypeScript files with up() and down() methods, giving you programmatic control over the migration process.',

    edgeCasesTitle: 'Edge Cases and Advanced Features',
    ec1Title: 'Serverless / Edge Runtime',
    ec1Desc: 'Prisma works in serverless but requires the Rust engine binary, increasing cold starts. Prisma Accelerate (hosted connection pooling) mitigates this. Drizzle works natively in edge runtimes (Cloudflare Workers, Vercel Edge) because it has zero binary dependencies. TypeORM is not well-suited for edge environments due to its heavy runtime.',
    ec2Title: 'Monorepo Support',
    ec2Desc: 'Drizzle has the best monorepo story because the schema is plain TypeScript that can be shared across packages. Prisma requires the generated client to be available in each package, which needs careful configuration. TypeORM entities can be shared but require decorator metadata, which adds configuration complexity.',
    ec3Title: 'Database-Specific Features',
    ec3Desc: 'Drizzle provides the most database-specific feature access because it maps closely to SQL. PostgreSQL features like JSONB operators, full-text search, and array types are directly accessible. Prisma abstracts some database-specific features behind its query engine. TypeORM supports many databases but lowest-common-denominator features may limit database-specific optimizations.',

    decisionTitle: 'Decision Framework',
    decisionDesc: 'Choose your ORM based on your team skills, project requirements, and priorities:',

    bestPracticesTitle: 'ORM Best Practices',
    bp1: 'Always use database indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY. ORMs do not add indexes automatically; you must define them in your schema.',
    bp2: 'Be explicit about relation loading. Avoid eager loading entire relation trees. Use select/include (Prisma), with (Drizzle), or select QueryBuilder methods (TypeORM) to load only what you need.',
    bp3: 'Use database transactions for operations that must be atomic. All three ORMs support transactions, but the API differs. Wrap related writes in a single transaction to ensure data consistency.',
    bp4: 'Monitor generated SQL in development. Enable query logging to see what SQL your ORM generates. Look for N+1 queries, unnecessary JOINs, and missing indexes.',
    bp5: 'Use connection pooling in production, especially in serverless environments. Each ORM has different pooling strategies: Prisma uses its engine pool, Drizzle uses the underlying driver pool, and TypeORM has built-in pooling.',
    bp6: 'Write database migrations instead of using auto-sync in production. Auto-sync can drop columns or tables unintentionally. Always review migration SQL before applying it to production.',
    bp7: 'Test your data access layer with integration tests against a real database. Use Docker to spin up a test database, run migrations, seed data, and verify queries return expected results.',
    bp8: 'Consider using raw SQL for complex queries. All three ORMs support raw queries. When the ORM abstraction fights you, drop down to SQL rather than fighting the ORM.',

    faq1q: 'Which ORM has the best TypeScript type safety?',
    faq1a: 'Drizzle and Prisma both provide excellent type safety, but through different mechanisms. Prisma generates types from the .prisma schema, giving you precise types for every query including nested includes and selects. Drizzle infers types from your TypeScript schema definition, providing type safety without code generation. TypeORM type safety is the weakest because decorators and runtime metadata do not provide the same compile-time guarantees.',
    faq2q: 'Can I switch ORMs mid-project?',
    faq2a: 'Switching ORMs is possible but expensive. Your data access layer needs to be rewritten, and schema definitions need to be converted. The difficulty depends on how tightly your application logic is coupled to the ORM. If you isolate data access in a repository layer, switching is much easier. The database itself does not change; only the TypeScript code that talks to it.',
    faq3q: 'Is Prisma too slow for production?',
    faq3a: 'No. Prisma is used in production by thousands of companies including large-scale applications. The Rust query engine adds some overhead compared to raw SQL, but for most applications the difference is negligible. Prisma 6 significantly improved performance. If you hit performance issues, use raw queries for hot paths, enable connection pooling, and profile your specific queries.',
    faq4q: 'Does Drizzle support MongoDB?',
    faq4a: 'No, Drizzle only supports SQL databases (PostgreSQL, MySQL, SQLite). If you need MongoDB support, Prisma (with the MongoDB connector) or Mongoose (dedicated MongoDB ODM) are better choices. TypeORM also has experimental MongoDB support, but it is not as mature as the SQL support.',
    faq5q: 'Which ORM should I choose for a new project in 2026?',
    faq5a: 'For most new TypeScript projects, start with Drizzle if your team knows SQL well and wants maximum performance and edge runtime compatibility. Choose Prisma if you want the best developer experience with automatic migrations and a visual studio (Prisma Studio). Choose TypeORM if you are coming from Java/C# and prefer the Active Record or Data Mapper patterns you already know. All three are production-ready; the best choice depends on your team skills and preferences.',

    tryTools: 'Try our related developer tools',
  },
  zh: {
    title: 'Prisma vs Drizzle vs TypeORM：2026 年 ORM 对比',
    intro: '为 TypeScript 项目选择正确的 ORM（对象关系映射）决定了你整个数据访问层的设计。Prisma、Drizzle 和 TypeORM 代表三种不同的理念：Schema 优先的代码生成、SQL 优先的类型推断、以及基于装饰器的活动记录模式。本文全面对比三者在性能、开发体验、类型安全和生产就绪性方面的表现，帮助你在 2026 年做出明智选择。',

    prismaTitle: 'Prisma：Schema 优先的全栈 ORM',
    prismaDesc1: 'Prisma 是新一代 ORM，采用 Schema 优先的方法。你在 Prisma schema 文件（.prisma）中定义数据模型，Prisma 会生成完全类型化的客户端、数据库迁移和内省工具。生成的 Prisma Client 为每个查询提供自动补全，包括嵌套关系、过滤器和聚合。',
    prismaDesc2: 'Prisma 已成为最流行的 TypeScript ORM，从初创公司到大型企业都在使用。其开发体验无与伦比：schema 语言直观，迁移自动处理，生成的客户端在编译时而非运行时捕获错误。',
    prismaSchemaCode: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  role  Role   @default(USER)
  posts Post[]
  @@map("users")
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  slug      String  @unique
  content   String
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
  @@map("posts")
}

enum Role { USER AUTHOR ADMIN }`,
    prismaQueryCode: `// Prisma Client — 查询示例
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 创建带嵌套关系的用户
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    name: 'Alice',
    role: 'AUTHOR',
  },
});

// 带过滤、分页和排序的查询
const posts = await prisma.post.findMany({
  where: { published: true },
  include: {
    author: { select: { name: true, email: true } },
    _count: { select: { comments: true } },
  },
  orderBy: { publishedAt: 'desc' },
  take: 10,
});

// 事务
const [post, updated] = await prisma.$transaction([
  prisma.post.create({ data: { title: 'Prisma 指南', slug: 'prisma-guide', content: '...', authorId: 1 } }),
  prisma.user.update({ where: { id: 1 }, data: { role: 'AUTHOR' } }),
]);`,

    drizzleTitle: 'Drizzle：SQL 优先的轻量级 ORM',
    drizzleDesc1: 'Drizzle ORM 采用完全不同的方法：SQL 优先。Drizzle 不是抽象掉 SQL，而是拥抱它。你的 schema 用 TypeScript 定义，查询看起来几乎与 SQL 相同。Drizzle 从 schema 定义中推断类型，因此无需代码生成即可获得完整的类型安全。',
    drizzleDesc2: 'Drizzle 是三者中最轻量的 ORM，零依赖且包体积极小。它作为 SQL 的薄包装层，意味着你总是知道会生成什么查询。对于熟悉 SQL 的开发者，Drizzle 感觉就像在写带有 TypeScript 类型安全的 SQL。',
    drizzleSchemaCode: `// src/db/schema.ts — Drizzle schema
import { pgTable, serial, text, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: text('name'),
  role: text('role').default('USER').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  published: boolean('published').default(false).notNull(),
  authorId: integer('author_id').references(() => users.id).notNull(),
});`,
    drizzleQueryCode: `// Drizzle ORM — 查询示例
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq, desc, count } from 'drizzle-orm';
import * as schema from './schema';

const db = drizzle(pool, { schema });

// 插入并返回
const [newUser] = await db.insert(schema.users)
  .values({ email: 'alice@example.com', name: 'Alice' })
  .returning();

// 带 JOIN 的查询 — 看起来就像 SQL！
const postsWithAuthors = await db
  .select({
    title: schema.posts.title,
    authorName: schema.users.name,
    commentCount: count(schema.comments.id),
  })
  .from(schema.posts)
  .leftJoin(schema.users, eq(schema.posts.authorId, schema.users.id))
  .where(eq(schema.posts.published, true))
  .orderBy(desc(schema.posts.publishedAt))
  .limit(10);

// 关系查询构建器（类 Prisma API）
const usersWithPosts = await db.query.users.findMany({
  with: { posts: { where: eq(schema.posts.published, true), limit: 5 } },
  limit: 10,
});`,

    typeormTitle: 'TypeORM：基于装饰器的全功能 ORM',
    typeormDesc1: 'TypeORM 是三者中最老且功能最丰富的 ORM。它使用 TypeScript 装饰器定义实体，同时支持活动记录（Active Record）和数据映射器（Data Mapper）模式。TypeORM 深受 Hibernate（Java）和 Doctrine（PHP）启发，对来自这些生态系统的开发者来说非常熟悉。',
    typeormDesc2: 'TypeORM 支持广泛的数据库（PostgreSQL、MySQL、SQLite、SQL Server、Oracle、MongoDB），提供实体监听器、订阅者、自定义仓库和迁移等高级功能。但其 TypeScript 类型安全历来弱于 Prisma 和 Drizzle。',
    typeormEntityCode: `// src/entities/User.ts — TypeORM 实体
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum Role { USER = 'USER', AUTHOR = 'AUTHOR', ADMIN = 'ADMIN' }

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}`,
    typeormQueryCode: `// TypeORM — 查询示例
const userRepo = AppDataSource.getRepository(User);
const postRepo = AppDataSource.getRepository(Post);

// 使用 QueryBuilder 查询
const posts = await postRepo
  .createQueryBuilder('post')
  .leftJoinAndSelect('post.author', 'author')
  .where('post.published = :published', { published: true })
  .orderBy('post.publishedAt', 'DESC')
  .take(10)
  .getMany();

// 使用 find 选项（更简单的 API）
const recentPosts = await postRepo.find({
  where: { published: true },
  relations: { author: true },
  order: { publishedAt: 'DESC' },
  take: 10,
});`,

    comparisonTitle: '功能对比表',
    comparisonDesc: '从对生产应用最重要的维度对比三种 ORM：',

    perfTitle: '性能基准',
    perfDesc: '性能因查询复杂度和使用模式而显著不同。以下是来自实际基准测试的一般观察：',
    perfDrizzle: 'Drizzle ORM 始终最快，因为它生成的 SQL 最精简，几乎没有开销。零依赖和极小的运行时。对于简单 CRUD 操作，Drizzle 可以比 Prisma 快 2-5 倍，接近原生 SQL 性能。',
    perfPrisma: 'Prisma 使用基于 Rust 的查询引擎作为独立进程运行。这增加了启动延迟（冷启动）但为复杂查询提供一致的性能。Prisma 6（2025）通过 Rust 引擎优化显著提升了性能。在无服务器环境中，使用 PgBouncer 或 Prisma Accelerate 进行连接池化有所帮助。',
    perfTypeorm: 'TypeORM 性能通常可接受，但复杂的预加载模式可能导致性能下降。QueryBuilder 生成高效的 SQL，但带自动关系加载的活动记录模式如不仔细管理可能触发 N+1 查询。',

    migrationsTitle: '迁移策略',
    migrationsDesc: '数据库迁移对生产应用至关重要。每种 ORM 处理迁移的方式不同：',
    migrationsPrisma: 'Prisma Migrate 自动从 schema 变更生成 SQL 迁移文件。编辑 .prisma schema，运行 npx prisma migrate dev，Prisma 创建带时间戳的 SQL 迁移。迁移存储在 prisma/migrations 目录中，可以审查、编辑和提交到版本控制。',
    migrationsDrizzle: 'Drizzle Kit 通过对比 TypeScript schema 与数据库来生成 SQL 迁移。运行 npx drizzle-kit generate 创建迁移文件。Drizzle 迁移是纯 SQL，给你完全控制权。Drizzle 还支持 push 模式用于快速原型开发。',
    migrationsTypeorm: 'TypeORM 支持自动同步（用于开发）和手动迁移。运行 npx typeorm migration:generate 从实体变更创建迁移。TypeORM 迁移是带 up() 和 down() 方法的 TypeScript 文件。',

    edgeCasesTitle: '边缘场景和高级功能',
    ec1Title: 'Serverless / Edge 运行时',
    ec1Desc: 'Prisma 可在 serverless 中使用但需要 Rust 引擎二进制文件，增加冷启动时间。Drizzle 因零二进制依赖可原生运行在边缘运行时（Cloudflare Workers、Vercel Edge）。TypeORM 因其重运行时不太适合边缘环境。',
    ec2Title: 'Monorepo 支持',
    ec2Desc: 'Drizzle 的 monorepo 体验最好，因为 schema 是纯 TypeScript，可跨包共享。Prisma 需要在每个包中提供生成的客户端。TypeORM 实体可以共享但需要装饰器元数据。',
    ec3Title: '数据库特定功能',
    ec3Desc: 'Drizzle 提供最多的数据库特定功能访问，因为它紧密映射到 SQL。PostgreSQL 功能如 JSONB 操作符、全文搜索和数组类型可直接使用。Prisma 将一些数据库特定功能抽象在查询引擎后面。',

    decisionTitle: '决策框架',
    decisionDesc: '根据你的团队技能、项目需求和优先级选择 ORM：',

    bestPracticesTitle: 'ORM 最佳实践',
    bp1: '始终在 WHERE 子句、JOIN 条件和 ORDER BY 中使用的列上添加数据库索引。ORM 不会自动添加索引，你必须在 schema 中定义它们。',
    bp2: '明确指定关系加载方式。避免预加载整个关系树。使用 select/include（Prisma）、with（Drizzle）或 QueryBuilder 的 select 方法（TypeORM）只加载需要的数据。',
    bp3: '对必须原子化的操作使用数据库事务。三种 ORM 都支持事务，但 API 不同。将相关写操作包装在单个事务中以确保数据一致性。',
    bp4: '在开发中监控生成的 SQL。启用查询日志查看 ORM 生成的 SQL。查找 N+1 查询、不必要的 JOIN 和缺失的索引。',
    bp5: '在生产环境中使用连接池，尤其是在 serverless 环境中。每种 ORM 有不同的连接池策略。',
    bp6: '在生产环境中使用数据库迁移而非自动同步。自动同步可能意外删除列或表。在应用到生产前始终审查迁移 SQL。',
    bp7: '使用集成测试针对真实数据库测试数据访问层。使用 Docker 启动测试数据库，运行迁移，填充数据，验证查询返回预期结果。',
    bp8: '对复杂查询考虑使用原生 SQL。三种 ORM 都支持原生查询。当 ORM 抽象与你对抗时，降级到 SQL 而非与 ORM 抗争。',

    faq1q: '哪个 ORM 的 TypeScript 类型安全性最好？',
    faq1a: 'Drizzle 和 Prisma 都提供出色的类型安全，但机制不同。Prisma 从 .prisma schema 生成类型，为每个查询（包括嵌套 include 和 select）提供精确类型。Drizzle 从 TypeScript schema 定义推断类型，无需代码生成即可提供类型安全。TypeORM 的类型安全最弱，因为装饰器和运行时元数据无法提供同等的编译时保证。',
    faq2q: '项目中途可以切换 ORM 吗？',
    faq2a: '可以但成本很高。数据访问层需要重写，schema 定义需要转换。难度取决于应用逻辑与 ORM 的耦合程度。如果在仓库层中隔离数据访问，切换会容易得多。数据库本身不需要变更，只有与之通信的 TypeScript 代码需要改变。',
    faq3q: 'Prisma 在生产环境中太慢了吗？',
    faq3a: '不是。Prisma 被数千家公司用于生产环境，包括大规模应用。Rust 查询引擎与原生 SQL 相比有一些开销，但对大多数应用来说差异可以忽略。Prisma 6 显著提升了性能。如果遇到性能问题，可以对热点路径使用原生查询、启用连接池并分析具体查询。',
    faq4q: 'Drizzle 支持 MongoDB 吗？',
    faq4a: '不支持，Drizzle 只支持 SQL 数据库（PostgreSQL、MySQL、SQLite）。如果需要 MongoDB 支持，Prisma（带 MongoDB 连接器）或 Mongoose（专用 MongoDB ODM）是更好的选择。TypeORM 也有实验性 MongoDB 支持，但不如 SQL 支持成熟。',
    faq5q: '2026 年新项目应该选哪个 ORM？',
    faq5a: '对于大多数新 TypeScript 项目：如果团队精通 SQL 且想要最大性能和边缘运行时兼容性，选 Drizzle。如果想要最佳开发体验（自动迁移和可视化工具 Prisma Studio），选 Prisma。如果来自 Java/C# 背景且偏好已知的 Active Record 或 Data Mapper 模式，选 TypeORM。三者都是生产就绪的，最佳选择取决于你的团队技能和偏好。',

    tryTools: '试试我们相关的开发者工具',
  },
};

export default function PrismaVsDrizzleVsTypeorm({ lang }: { lang: string }) {
  const ct = translations[lang] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: ct.faq1q, acceptedAnswer: { '@type': 'Answer', text: ct.faq1a } },
      { '@type': 'Question', name: ct.faq2q, acceptedAnswer: { '@type': 'Answer', text: ct.faq2a } },
      { '@type': 'Question', name: ct.faq3q, acceptedAnswer: { '@type': 'Answer', text: ct.faq3a } },
      { '@type': 'Question', name: ct.faq4q, acceptedAnswer: { '@type': 'Answer', text: ct.faq4a } },
      { '@type': 'Question', name: ct.faq5q, acceptedAnswer: { '@type': 'Answer', text: ct.faq5a } },
    ],
  };

  const codeStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '16px 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.8 };
  const thStyle: React.CSSProperties = { background: 'var(--bg-input)', border: '1px solid var(--border-color)', padding: '10px 14px', textAlign: 'left', fontWeight: 700 };
  const tdStyle: React.CSSProperties = { border: '1px solid var(--border-color)', padding: '10px 14px', fontSize: 13 };
  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#3b82f6' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* Prisma */}
      <h2 style={h2Style}>{ct.prismaTitle}</h2>
      <p style={pStyle}>{ct.prismaDesc1}</p>
      <p style={pStyle}>{ct.prismaDesc2}</p>
      <h3 style={h3Style}>Prisma Schema</h3>
      <pre style={codeStyle}><code>{ct.prismaSchemaCode}</code></pre>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>Prisma Queries</h3>
      <pre style={codeStyle}><code>{ct.prismaQueryCode}</code></pre>

      {/* Drizzle */}
      <h2 style={h2Style}>{ct.drizzleTitle}</h2>
      <p style={pStyle}>{ct.drizzleDesc1}</p>
      <p style={pStyle}>{ct.drizzleDesc2}</p>
      <h3 style={h3Style}>Drizzle Schema</h3>
      <pre style={codeStyle}><code>{ct.drizzleSchemaCode}</code></pre>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>Drizzle Queries</h3>
      <pre style={codeStyle}><code>{ct.drizzleQueryCode}</code></pre>

      {/* TypeORM */}
      <h2 style={h2Style}>{ct.typeormTitle}</h2>
      <p style={pStyle}>{ct.typeormDesc1}</p>
      <p style={pStyle}>{ct.typeormDesc2}</p>
      <h3 style={h3Style}>TypeORM Entities</h3>
      <pre style={codeStyle}><code>{ct.typeormEntityCode}</code></pre>
      <h3 style={{ ...h3Style, color: '#22c55e' }}>TypeORM Queries</h3>
      <pre style={codeStyle}><code>{ct.typeormQueryCode}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{ct.comparisonTitle}</h2>
      <p style={pStyle}>{ct.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>Drizzle</th>
              <th style={thStyle}>TypeORM</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Schema Definition', '.prisma file (DSL)', 'TypeScript objects', 'Decorators on classes'],
              ['Type Safety', 'Generated types (excellent)', 'Inferred types (excellent)', 'Decorator metadata (good)'],
              ['Query Style', 'Object API (Prisma Client)', 'SQL-like builder + relational', 'QueryBuilder + find options'],
              ['Code Generation', 'Required (prisma generate)', 'Not needed', 'Not needed'],
              ['Bundle Size', 'Large (Rust engine binary)', 'Tiny (zero dependencies)', 'Medium'],
              ['Performance', 'Good (Rust engine)', 'Excellent (near raw SQL)', 'Good (varies by pattern)'],
              ['Edge Runtime', 'With Accelerate only', 'Native support', 'Not supported'],
              ['Migrations', 'Prisma Migrate (automatic)', 'Drizzle Kit (SQL files)', 'CLI (TypeScript files)'],
              ['Visual Tool', 'Prisma Studio', 'Drizzle Studio', 'None built-in'],
              ['Databases', 'PG, MySQL, SQLite, SQL Server, MongoDB', 'PG, MySQL, SQLite', 'PG, MySQL, SQLite, MSSQL, Oracle, MongoDB'],
              ['Learning Curve', 'Low (intuitive schema DSL)', 'Medium (need SQL knowledge)', 'Medium-High (decorators + patterns)'],
              ['Community', 'Largest (most popular)', 'Growing fast', 'Mature but declining'],
            ].map(([feature, prisma, drizzle, typeorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={tdStyle}>{drizzle}</td>
                <td style={tdStyle}>{typeorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.perfTitle}</h2>
      <p style={pStyle}>{ct.perfDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Drizzle', desc: ct.perfDrizzle, color: '#22c55e' },
          { title: 'Prisma', desc: ct.perfPrisma, color: '#3b82f6' },
          { title: 'TypeORM', desc: ct.perfTypeorm, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Migrations */}
      <h2 style={h2Style}>{ct.migrationsTitle}</h2>
      <p style={pStyle}>{ct.migrationsDesc}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: 'Prisma Migrate', desc: ct.migrationsPrisma, color: '#3b82f6' },
          { title: 'Drizzle Kit', desc: ct.migrationsDrizzle, color: '#22c55e' },
          { title: 'TypeORM Migrations', desc: ct.migrationsTypeorm, color: '#f59e0b' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Edge Cases */}
      <h2 style={h2Style}>{ct.edgeCasesTitle}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        {[
          { title: ct.ec1Title, desc: ct.ec1Desc, color: '#8b5cf6' },
          { title: ct.ec2Title, desc: ct.ec2Desc, color: '#ec4899' },
          { title: ct.ec3Title, desc: ct.ec3Desc, color: '#06b6d4' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: `4px solid ${item.color}` }}>
            <strong style={{ color: item.color }}>{item.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Decision Framework */}
      <h2 style={h2Style}>{ct.decisionTitle}</h2>
      <p style={pStyle}>{ct.decisionDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Scenario</th>
              <th style={thStyle}>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['New TypeScript project, team knows SQL', 'Drizzle'],
              ['Best developer experience priority', 'Prisma'],
              ['Edge / serverless deployment', 'Drizzle'],
              ['Coming from Java / C# background', 'TypeORM'],
              ['Need MongoDB support', 'Prisma or Mongoose'],
              ['Maximum performance critical', 'Drizzle'],
              ['Rapid prototyping', 'Prisma'],
              ['Large enterprise with existing ORM patterns', 'TypeORM'],
              ['Monorepo architecture', 'Drizzle'],
              ['Full-stack framework (Next.js, Remix)', 'Prisma or Drizzle'],
            ].map(([scenario, rec], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={tdStyle}>{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={h2Style}>{ct.bestPracticesTitle}</h2>
      <ul style={{ lineHeight: 2.2, color: 'var(--text-secondary)', paddingLeft: 20, marginBottom: 24 }}>
        <li>{ct.bp1}</li><li>{ct.bp2}</li><li>{ct.bp3}</li><li>{ct.bp4}</li>
        <li>{ct.bp5}</li><li>{ct.bp6}</li><li>{ct.bp7}</li><li>{ct.bp8}</li>
      </ul>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>FAQ</h2>
      {[
        [ct.faq1q, ct.faq1a], [ct.faq2q, ct.faq2a], [ct.faq3q, ct.faq3a], [ct.faq4q, ct.faq4a], [ct.faq5q, ct.faq5a],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: 16, padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{q}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
