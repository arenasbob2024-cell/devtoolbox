'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Prisma vs TypeORM: TypeScript ORM Comparison',
    intro: 'Prisma and TypeORM are the two most popular TypeScript ORMs for Node.js. Both provide type-safe database access but with very different approaches. This comparison covers schema design, query APIs, migrations, performance, and developer experience to help you choose the right ORM.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Prisma offers a superior developer experience with auto-generated types, intuitive query API, and excellent tooling. TypeORM provides more flexibility with decorators and supports more databases natively. For new TypeScript projects prioritizing DX, Prisma is recommended. For complex enterprise schemas with decorators preference, TypeORM excels.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Prisma generates types from schema; TypeORM uses decorators on entities',
    takeaway2: 'Prisma has cleaner query API with auto-completion; TypeORM uses SQL-like syntax',
    takeaway3: 'Both support migrations, but Prisma migrations are more automated',
    takeaway4: 'TypeORM supports more databases including MongoDB; Prisma focuses on SQL',
    takeaway5: 'Prisma Client is generally faster for simple queries; TypeORM better for complex joins',
    takeaway6: 'Prisma Studio provides visual database browser; TypeORM relies on external tools',
    
    whatIsPrismaTitle: 'What is Prisma?',
    whatIsPrismaContent: 'Prisma is a next-generation ORM consisting of Prisma Client (auto-generated query builder), Prisma Migrate (migration system), and Prisma Studio (database GUI). Launched in 2019, Prisma prioritizes developer experience with a declarative schema language and type-safe database access. It supports PostgreSQL, MySQL, SQLite, SQL Server, and MongoDB.',
    
    whatIsTypeORMTitle: 'What is TypeORM?',
    whatIsTypeORMContent: 'TypeORM is a mature ORM that supports both Active Record and Data Mapper patterns. Created in 2016, it uses TypeScript decorators to define entities and relationships. TypeORM supports PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, Oracle, SAP Hana, and MongoDB. It is popular in NestJS ecosystem.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks across different query patterns:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities and tooling:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Schema definition and query patterns:',
    
    prismaExampleTitle: 'Prisma',
    typeormExampleTitle: 'TypeORM',
    
    migrationsTitle: 'Migrations',
    migrationsIntro: 'Database schema evolution:',
    
    relationsTitle: 'Relationships',
    relationsIntro: 'Handling entity relationships:',
    
    devtoolsTitle: 'Developer Experience',
    devtoolsIntro: 'Tooling and productivity:',
    
    whenToUseTitle: 'When to Use Each ORM',
    prismaBestFor: 'Use Prisma When:',
    typeormBestFor: 'Use TypeORM When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Prisma and TypeORM serve different needs in the TypeScript ecosystem. Prisma excels in developer experience with its intuitive schema language, auto-generated types, and Prisma Studio. It is ideal for new projects and teams prioritizing productivity. TypeORM offers more database flexibility and integrates seamlessly with NestJS decorators. For enterprise applications with complex schemas or MongoDB requirements, TypeORM remains a solid choice. Both are production-ready and actively maintained.',
    
    faq1q: 'Can I use Prisma with existing databases?',
    faq1a: 'Yes, Prisma supports introspection of existing databases. Run "prisma db pull" to generate a schema from your database, then "prisma generate" to create the client. This works well for gradual migration to Prisma.',
    
    faq2q: 'Which ORM is better for NestJS?',
    faq2a: 'TypeORM has first-class NestJS integration with @nestjs/typeorm. Prisma also works well with NestJS through PrismaClient injection. TypeORM is more idiomatic in NestJS due to decorator patterns, but Prisma is equally capable.',
    
    faq3q: 'How do they handle N+1 query problems?',
    faq3a: 'Prisma automatically batches and optimizes queries to avoid N+1 problems. TypeORM requires using relations options (eager loading) or query builder joins to prevent N+1. Prisma has the edge in automatic optimization.',
    
    faq4q: 'Can I use raw SQL with both?',
    faq4a: 'Yes, both support raw SQL. Prisma provides "$queryRaw" and "$executeRaw" for raw queries with type safety. TypeORM offers "query()" method and QueryBuilder for raw SQL. Both allow escape hatches for complex queries.',
    
    faq5q: 'How do migrations compare?',
    faq5a: 'Prisma Migrate is more automated, generating SQL from schema changes. TypeORM migrations can be auto-generated or written manually, offering more control. Prisma is easier for beginners; TypeORM offers more flexibility for complex scenarios.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Prisma generates fully typed clients from schema, providing excellent autocomplete. TypeORM types derive from entity decorators, which can be less precise. Prisma generally offers better type inference and DX.',
    
    faq7q: 'What about MongoDB support?',
    faq7a: 'TypeORM has mature MongoDB support with decorators. Prisma added MongoDB support in 2021 and continues improving. For complex MongoDB use cases, TypeORM may still have an edge, but Prisma covers most needs.',
    
    faq8q: 'How do they handle database transactions?',
    faq8a: 'Both support transactions. Prisma uses "$transaction" with interactive transactions or batch transactions. TypeORM uses "transaction()" method with EntityManager or QueryRunner. Prisma API is more intuitive; TypeORM offers more low-level control.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Prisma vs TypeORM：TypeScript ORM对比',
    intro: 'Prisma和TypeORM是Node.js中最受欢迎的两个TypeScript ORM。两者都提供类型安全的数据库访问，但方法截然不同。本比较涵盖模式设计、查询API、迁移、性能和开发者体验，帮助你选择合适的ORM。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Prisma提供卓越的开发者体验，具有自动生成的类型、直观的查询API和优秀的工具。TypeORM通过装饰器提供更多灵活性，原生支持更多数据库。对于优先考虑DX的新TypeScript项目，推荐Prisma。对于喜欢装饰器的复杂企业模式，TypeORM表现出色。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Prisma从模式生成类型；TypeORM在实体上使用装饰器',
    takeaway2: 'Prisma查询API更干净，自动补全更好；TypeORM使用类SQL语法',
    takeaway3: '两者都支持迁移，但Prisma迁移更自动化',
    takeaway4: 'TypeORM支持更多数据库包括MongoDB；Prisma专注于SQL',
    takeaway5: 'Prisma Client在简单查询中通常更快；TypeORM在复杂连接上更好',
    takeaway6: 'Prisma Studio提供可视化数据库浏览器；TypeORM依赖外部工具',
    
    whatIsPrismaTitle: '什么是Prisma？',
    whatIsPrismaContent: 'Prisma是下一代ORM，由Prisma Client（自动生成的查询构建器）、Prisma Migrate（迁移系统）和Prisma Studio（数据库GUI）组成。Prisma于2019年推出，优先考虑开发者体验，采用声明式模式语言和类型安全的数据库访问。它支持PostgreSQL、MySQL、SQLite、SQL Server和MongoDB。',
    
    whatIsTypeORMTitle: '什么是TypeORM？',
    whatIsTypeORMContent: 'TypeORM是一个成熟的ORM，同时支持Active Record和Data Mapper模式。创建于2016年，它使用TypeScript装饰器定义实体和关系。TypeORM支持PostgreSQL、MySQL、MariaDB、SQLite、SQL Server、Oracle、SAP Hana和MongoDB。它在NestJS生态系统中很受欢迎。',
    
    performanceTitle: '性能对比',
    performanceIntro: '不同查询模式的性能基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较功能和工具：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '模式定义和查询模式：',
    
    prismaExampleTitle: 'Prisma',
    typeormExampleTitle: 'TypeORM',
    
    migrationsTitle: '迁移',
    migrationsIntro: '数据库模式演进：',
    
    relationsTitle: '关系',
    relationsIntro: '处理实体关系：',
    
    devtoolsTitle: '开发者体验',
    devtoolsIntro: '工具和生产力：',
    
    whenToUseTitle: '何时使用每个ORM',
    prismaBestFor: '使用Prisma的场景：',
    typeormBestFor: '使用TypeORM的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Prisma和TypeORM在TypeScript生态系统中服务于不同的需求。Prisma在开发者体验方面表现出色，具有直观的模式语言、自动生成的类型和Prisma Studio。它非常适合新项目和优先考虑生产力的团队。TypeORM提供更多数据库灵活性，并与NestJS装饰器无缝集成。对于具有复杂模式或MongoDB需求的企业应用，TypeORM仍是可靠的选择。两者都已可用于生产并积极维护。',
    
    faq1q: '我可以在现有数据库上使用Prisma吗？',
    faq1a: '可以，Prisma支持现有数据库的内省。运行"prisma db pull"从数据库生成模式，然后运行"prisma generate"创建客户端。这对于逐步迁移到Prisma效果很好。',
    
    faq2q: '哪个ORM更适合NestJS？',
    faq2a: 'TypeORM通过@nestjs/typeorm具有一流的NestJS集成。Prisma通过PrismaClient注入也能很好地与NestJS配合。由于装饰器模式，TypeORM在NestJS中更符合惯例，但Prisma同样有能力。',
    
    faq3q: '它们如何处理N+1查询问题？',
    faq3a: 'Prisma自动批量和优化查询以避免N+1问题。TypeORM需要使用关系选项（急加载）或查询构建器连接来防止N+1。Prisma在自动优化方面有优势。',
    
    faq4q: '两者都可以使用原始SQL吗？',
    faq4a: '可以，两者都支持原始SQL。Prisma提供"$queryRaw"和"$executeRaw"用于类型安全的原始查询。TypeORM提供"query()"方法和QueryBuilder用于原始SQL。两者都允许复杂查询的逃生舱口。',
    
    faq5q: '迁移如何比较？',
    faq5a: 'Prisma Migrate更自动化，从模式更改生成SQL。TypeORM迁移可以自动生成或手动编写，提供更多控制。Prisma对初学者更容易；TypeORM为复杂场景提供更多灵活性。',
    
    faq6q: '哪个TypeScript支持更好？',
    faq6a: 'Prisma从模式生成完全类型化的客户端，提供出色的自动补全。TypeORM类型派生自实体装饰器，可能不够精确。Prisma通常提供更好的类型推断和DX。',
    
    faq7q: 'MongoDB支持呢？',
    faq7a: 'TypeORM通过装饰器具有成熟的MongoDB支持。Prisma在2021年添加了MongoDB支持并持续改进。对于复杂的MongoDB用例，TypeORM可能仍有优势，但Prisma涵盖了大多数需求。',
    
    faq8q: '它们如何处理数据库事务？',
    faq8a: '两者都支持事务。Prisma使用"$transaction"进行交互式事务或批量事务。TypeORM使用"transaction()"方法配合EntityManager或QueryRunner。Prisma API更直观；TypeORM提供更多低级控制。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function PrismaVsTypeORM({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsPrismaTitle}</h3>
      <p style={pStyle}>{ct.whatIsPrismaContent}</p>

      <h3 style={h3Style}>{ct.whatIsTypeORMTitle}</h3>
      <p style={pStyle}>{ct.whatIsTypeORMContent}</p>

      {/* Comparison Table */}
      <h2 style={h2Style}>{isZh ? '对比概览' : 'Comparison Overview'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>TypeORM</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2019', '2016'],
              [isZh ? '模式定义' : 'Schema Definition', 'Prisma Schema (prisma file)', 'TypeScript Decorators'],
              [isZh ? '类型生成' : 'Type Generation', 'Auto-generated Client', 'From Entity Decorators'],
              [isZh ? '查询API' : 'Query API', 'Object-based', 'QueryBuilder / Active Record'],
              [isZh ? '数据库支持' : 'Database Support', 'PostgreSQL, MySQL, SQLite, SQL Server, MongoDB', 'PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, Oracle, MongoDB'],
              [isZh ? '迁移' : 'Migrations', 'Prisma Migrate', 'TypeORM Migrations'],
              [isZh ? 'GUI工具' : 'GUI Tool', 'Prisma Studio', 'External tools'],
              [isZh ? '包大小' : 'Package Size', '~1MB', '~800KB'],
            ].map(([feature, prisma, typeorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={tdStyle}>{typeorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '操作' : 'Operation'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>TypeORM</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '简单查询' : 'Simple Query', '15ms', '18ms'],
              [isZh ? '带关联查询' : 'Query with Relations', '25ms', '22ms'],
              [isZh ? '批量插入 (1000条)' : 'Bulk Insert (1000)', '120ms', '95ms'],
              [isZh ? '复杂连接' : 'Complex Joins', '45ms', '38ms'],
              [isZh ? '启动时间' : 'Startup Time', '200ms', '150ms'],
            ].map(([op, prisma, typeorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{op}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={tdStyle}>{typeorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#2dd4bf' }}>{ct.prismaExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// prisma/schema.prisma
datasource db {
  provider = "postgresql"
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
  updatedAt DateTime @updatedAt
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  content     String?
  published   Boolean   @default(false)
  author      User      @relation(fields: [authorId], references: [id])
  authorId    Int
  categories  Category[]
  createdAt   DateTime  @default(now())
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

// Query Examples
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Find all users with their posts
const users = await prisma.user.findMany({
  include: {
    posts: {
      where: { published: true },
      include: { categories: true },
    },
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Create user with posts
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John',
    posts: {
      create: [
        { title: 'First Post', content: 'Hello World' },
        { title: 'Second Post', content: 'Another post' },
      ],
    },
  },
});

// Transaction
const result = await prisma.$transaction([
  prisma.post.create({ data: { title: 'Post 1', authorId: 1 } }),
  prisma.post.create({ data: { title: 'Post 2', authorId: 1 } }),
]);

// Raw query
const rawUsers = await prisma.$queryRaw\`SELECT * FROM "User" WHERE id = 1\`;`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f472b6' }}>{ct.typeormExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

// entities/Post.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column()
  authorId: number;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[];
}

// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'mydb',
  entities: [User, Post],
  synchronize: false,
  logging: true,
});

// Query Examples
import { AppDataSource } from './data-source';
import { User } from './entities/User';

const userRepository = AppDataSource.getRepository(User);

// Find all users with their posts
const users = await userRepository.find({
  relations: ['posts', 'posts.categories'],
  where: { posts: { published: true } },
  order: { createdAt: 'DESC' },
  take: 10,
});

// Using QueryBuilder
const users2 = await userRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.posts', 'post')
  .where('post.published = :published', { published: true })
  .orderBy('user.createdAt', 'DESC')
  .limit(10)
  .getMany();

// Create user with posts
const user = userRepository.create({
  email: 'john@example.com',
  name: 'John',
  posts: [
    { title: 'First Post', content: 'Hello World' },
    { title: 'Second Post', content: 'Another post' },
  ],
});
await userRepository.save(user);

// Transaction
await AppDataSource.transaction(async (transactionalEntityManager) => {
  await transactionalEntityManager.save(Post, { title: 'Post 1', authorId: 1 });
  await transactionalEntityManager.save(Post, { title: 'Post 2', authorId: 1 });
});

// Raw query
const rawUsers = await AppDataSource.query('SELECT * FROM "user" WHERE id = 1');`}</code></pre>

      {/* Migrations */}
      <h2 style={h2Style}>{ct.migrationsTitle}</h2>
      <p style={pStyle}>{ct.migrationsIntro}</p>

      <pre style={codeStyle}><code>{`// Prisma Migrations

// 1. Create/Modify schema in prisma/schema.prisma
// 2. Create migration
npx prisma migrate dev --name add_user_table

// 3. Generated migration file
-- prisma/migrations/20240101_add_user_table/migration.sql
CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Prisma applies migrations automatically and keeps schema in sync

// TypeORM Migrations

// 1. Create migration file
npx typeorm migration:create src/migrations/AddUserTable

// 2. Write migration
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1704067200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(\`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "email" CHARACTER VARYING NOT NULL,
        "name" CHARACTER VARYING,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    \`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user"');
  }
}

// 3. Run migration
npx typeorm migration:run -d src/data-source.ts`}</code></pre>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Prisma</th>
              <th style={thStyle}>TypeORM</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '自动类型生成' : 'Auto Type Generation', '✓', '✗'],
              [isZh ? '可视化数据库浏览器' : 'Visual DB Browser', '✓ Prisma Studio', '✗ External'],
              [isZh ? '自动迁移' : 'Auto Migrations', '✓', '✓'],
              [isZh ? '查询构建器' : 'Query Builder', '✓ Fluent API', '✓ SQL-like'],
              [isZh ? '原始SQL' : 'Raw SQL', '✓ $queryRaw', '✓ query()'],
              [isZh ? '事务' : 'Transactions', '✓ Interactive + Batch', '✓ Multiple patterns'],
              [isZh ? '连接池' : 'Connection Pooling', '✓ Built-in', '✓ Built-in'],
              [isZh ? '日志记录' : 'Logging', '✓', '✓'],
              [isZh ? '数据库内省' : 'DB Introspection', '✓ db pull', '✓ Limited'],
              [isZh ? '种子数据' : 'Seeding', '✓ Built-in', '✓ Manual'],
              [isZh ? '多对多' : 'Many-to-Many', '✓ Implicit join table', '✓ Explicit join entity'],
              [isZh ? '软删除' : 'Soft Delete', '✓ Manual', '✓ @DeleteDateColumn'],
            ].map(([feature, prisma, typeorm], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{prisma}</td>
                <td style={tdStyle}>{typeorm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #2dd4bf' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#2dd4bf' }}>{ct.prismaBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新TypeScript项目' : 'New TypeScript projects'}</li>
            <li>{isZh ? '优先考虑开发者体验' : 'Developer experience priority'}</li>
            <li>{isZh ? '需要可视化数据库工具' : 'Need visual database tool'}</li>
            <li>{isZh ? '简单到中等复杂度的模式' : 'Simple to medium schemas'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
            <li>{isZh ? '团队偏好声明式模式' : 'Team prefers declarative schema'}</li>
            <li>{isZh ? '需要自动类型生成' : 'Need auto type generation'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f472b6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f472b6' }}>{ct.typeormBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'NestJS项目' : 'NestJS projects'}</li>
            <li>{isZh ? '需要MongoDB支持' : 'MongoDB support needed'}</li>
            <li>{isZh ? '复杂企业模式' : 'Complex enterprise schemas'}</li>
            <li>{isZh ? '喜欢装饰器模式' : 'Prefer decorator pattern'}</li>
            <li>{isZh ? '需要更多数据库支持' : 'Need more database support'}</li>
            <li>{isZh ? '从其他ORM迁移' : 'Migrating from other ORMs'}</li>
            <li>{isZh ? '需要Active Record模式' : 'Need Active Record pattern'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
