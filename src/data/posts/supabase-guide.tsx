'use client';
import React from 'react';

/* ------------------------------------------------------------------ */
/*  Supabase Guide: Auth, Database, Realtime, Storage & Edge Functions */
/* ------------------------------------------------------------------ */

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Supabase Complete Guide: Database, Auth, Realtime, Storage & Edge Functions',
    description: 'Complete Supabase guide covering PostgreSQL database with Row Level Security, authentication (email, OAuth, magic links), real-time subscriptions, file storage, Edge Functions, TypeScript integration, and production best practices.',
    tldr: 'Supabase is an open-source Firebase alternative built on PostgreSQL. It provides a hosted Postgres database with Row Level Security, authentication (email, OAuth, magic links), real-time subscriptions via WebSockets, file storage with CDN, Edge Functions (Deno-based serverless), and auto-generated REST/GraphQL APIs. Use the @supabase/supabase-js client for full TypeScript support and generate types directly from your database schema.',
    h2WhatIs: 'What Is Supabase?',
    whatIsDesc: 'Supabase is an open-source Backend-as-a-Service (BaaS) built on top of PostgreSQL. It provides a suite of tools that replaces Firebase for projects that need a relational database. Unlike Firebase which uses a proprietary NoSQL database, Supabase gives you a full Postgres database with SQL support, joins, foreign keys, and advanced indexing.',
    h3SupaVsFire: 'Supabase vs Firebase Comparison',
    h2Setup: 'Setting Up a Supabase Project',
    setupDesc: 'You can start with the Supabase cloud platform or self-host using Docker. The cloud platform offers a generous free tier with 500MB database, 1GB file storage, and 50,000 monthly active users.',
    h2Database: 'Database: PostgreSQL with Row Level Security',
    dbDesc: 'Supabase gives you a full PostgreSQL database. You write standard SQL for migrations and use Row Level Security (RLS) to control access at the row level. RLS policies are evaluated on every query, ensuring that users can only see and modify data they are authorized to access.',
    h3CreateTables: 'Creating Tables and Migrations',
    h3RLS: 'Row Level Security (RLS)',
    rlsDesc: 'RLS is the core security model in Supabase. When enabled on a table, every query is filtered by the policies you define. Without RLS, anyone with the anon key can read all data in a table.',
    h3QueryData: 'Querying Data with the Client',
    queryDesc: 'The Supabase JavaScript client provides a fluent query builder that maps to PostgREST queries under the hood.',
    h2Auth: 'Authentication',
    authDesc: 'Supabase Auth supports email/password, magic links, phone OTP, and over 20 OAuth providers including Google, GitHub, Discord, and Apple. It manages user sessions with JWTs and integrates directly with RLS policies via the auth.uid() function.',
    h3EmailAuth: 'Email and Password Authentication',
    h3OAuthAuth: 'OAuth Providers (Google, GitHub)',
    h3MagicLink: 'Magic Link Authentication',
    h3AuthMiddleware: 'Protecting Routes with Auth Middleware',
    h2Realtime: 'Real-time Subscriptions',
    realtimeDesc: 'Supabase Realtime lets you listen to database changes (INSERT, UPDATE, DELETE) via WebSocket connections. It supports Postgres Changes, Broadcast (pub/sub messaging), and Presence (track online users). Realtime respects your RLS policies, so users only receive changes they are authorized to see.',
    h3PostgresChanges: 'Listening to Database Changes',
    h3Broadcast: 'Broadcast: Pub/Sub Messaging',
    h3Presence: 'Presence: Track Online Users',
    h2Storage: 'Storage: File Uploads',
    storageDesc: 'Supabase Storage manages files (images, videos, documents) in S3-compatible buckets with CDN caching. Buckets can be public or private. Private buckets require signed URLs for access. Storage integrates with RLS for fine-grained access control.',
    h3UploadFiles: 'Uploading and Downloading Files',
    h3StoragePolicies: 'Storage Security Policies',
    h2EdgeFunctions: 'Edge Functions',
    edgeDesc: 'Supabase Edge Functions are server-side TypeScript functions powered by Deno. They run close to users on the edge network and are ideal for webhooks, third-party API integrations, and custom server logic that cannot run on the client.',
    h3CreateEdge: 'Creating and Deploying Edge Functions',
    h3EdgeWithDb: 'Using Database and Auth in Edge Functions',
    h2TypeScript: 'TypeScript Integration and Type Generation',
    tsDesc: 'Supabase provides first-class TypeScript support. You can generate types directly from your database schema using the Supabase CLI, giving you full type safety for all queries, inserts, and updates.',
    h3GenerateTypes: 'Generating Types from Database Schema',
    h3TypedQueries: 'Using Generated Types in Queries',
    h2BestPractices: 'Best Practices for Production',
    bp1: 'Always enable RLS on every table: even internal tables should have policies',
    bp2: 'Use database migrations (supabase db diff) for all schema changes, never modify production directly',
    bp3: 'Create database indexes on columns used in WHERE, ORDER BY, and JOIN clauses',
    bp4: 'Use connection pooling (Supavisor) for serverless environments with many short-lived connections',
    bp5: 'Store the service_role key only on the server side, never expose it to the client',
    bp6: 'Use Edge Functions for sensitive operations like payment processing and email sending',
    bp7: 'Set up database backups and point-in-time recovery for production projects',
    bp8: 'Monitor query performance with pg_stat_statements and the Supabase dashboard',
    bp9: 'Use storage transform for on-the-fly image resizing instead of storing multiple sizes',
    bp10: 'Implement rate limiting on auth endpoints using Supabase rate limits or Edge Functions',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Supabase a good alternative to Firebase?',
    faq1A: 'Yes. Supabase provides equivalent features (auth, database, storage, real-time, serverless functions) but uses PostgreSQL instead of a NoSQL database. This makes it better for apps needing relational data, complex queries, and SQL joins. Supabase is open-source and can be self-hosted.',
    faq2Q: 'How much does Supabase cost?',
    faq2A: 'The free tier includes 500MB database, 1GB file storage, 50K monthly active users, and 500K Edge Function invocations. The Pro plan at $25/month adds 8GB database, 100GB storage, and higher limits. Enterprise plans offer dedicated infrastructure and SLAs.',
    faq3Q: 'Can I self-host Supabase?',
    faq3A: 'Yes. Supabase is fully open-source and provides Docker Compose files for self-hosting. You get all features including Auth, Realtime, Storage, and the dashboard. Self-hosting requires managing PostgreSQL, but gives you full data ownership.',
    faq4Q: 'How does Row Level Security work in Supabase?',
    faq4A: 'RLS is a PostgreSQL feature that filters every query based on policies you define. Policies use SQL expressions to check conditions like auth.uid() = user_id. When RLS is enabled, rows that do not match any policy are invisible. This provides database-level access control without server middleware.',
    faq5Q: 'Does Supabase support real-time subscriptions?',
    faq5A: 'Yes. Supabase Realtime supports three modes: Postgres Changes (listen to INSERT/UPDATE/DELETE on tables), Broadcast (pub/sub messaging between clients), and Presence (track which users are online). All modes use WebSocket connections and respect RLS policies.',
    faq6Q: 'What are Supabase Edge Functions?',
    faq6A: 'Edge Functions are server-side TypeScript/JavaScript functions powered by Deno that run on the edge network. They handle tasks like webhooks, API integrations, Stripe payments, and custom auth logic. They can access the database using the service_role key for admin operations.',
    faq7Q: 'How do I generate TypeScript types from Supabase?',
    faq7A: 'Run supabase gen types typescript --project-id your-project-id > src/types/database.ts. This generates types for all tables, views, and functions. Use the Database type with the Supabase client for full type safety on queries, inserts, and updates.',
    faq8Q: 'Can Supabase handle production workloads?',
    faq8A: 'Yes. Supabase runs on PostgreSQL which powers some of the largest applications in the world. The Pro and Enterprise plans include connection pooling, read replicas, daily backups, and point-in-time recovery. Many production applications including large SaaS platforms use Supabase.',
    keyTakeaway1: 'Supabase is built on PostgreSQL: you get full SQL, joins, indexes, and ACID transactions',
    keyTakeaway2: 'Row Level Security is the primary access control mechanism: enable it on every table',
    keyTakeaway3: 'Auth supports email, OAuth (20+ providers), magic links, and phone OTP out of the box',
    keyTakeaway4: 'Realtime subscriptions support database changes, broadcast, and presence tracking',
    keyTakeaway5: 'Edge Functions (Deno-based) handle server-side logic without managing infrastructure',
    keyTakeaway6: 'Generate TypeScript types from your schema for end-to-end type safety',
    keyTakeaway7: 'Use connection pooling, database indexes, and migrations for production readiness',
  },
  zh: {
    title: 'Supabase 完全指南：数据库、认证、实时订阅、存储与 Edge Functions',
    description: '完整的 Supabase 指南，涵盖 PostgreSQL 数据库与行级安全、认证（邮箱、OAuth、魔法链接）、实时订阅、文件存储、Edge Functions、TypeScript 集成和生产最佳实践。',
    tldr: 'Supabase 是基于 PostgreSQL 的开源 Firebase 替代方案。提供托管 Postgres 数据库（含行级安全）、认证（邮箱/OAuth/魔法链接）、实时订阅、文件存储、Edge Functions（基于 Deno 的无服务器函数）和自动生成的 REST/GraphQL API。使用 @supabase/supabase-js 客户端获得完整 TypeScript 支持。',
    h2WhatIs: '什么是 Supabase？',
    whatIsDesc: 'Supabase 是一个基于 PostgreSQL 构建的开源后端即服务（BaaS）。与使用专有 NoSQL 数据库的 Firebase 不同，Supabase 提供完整的 Postgres 数据库，支持 SQL、JOIN、外键和高级索引。',
    h3SupaVsFire: 'Supabase 与 Firebase 对比',
    h2Setup: '设置 Supabase 项目',
    setupDesc: '可以使用 Supabase 云平台或通过 Docker 自托管。免费层包括 500MB 数据库、1GB 文件存储和 50,000 月活跃用户。',
    h2Database: '数据库：PostgreSQL 与行级安全',
    dbDesc: 'Supabase 提供完整的 PostgreSQL 数据库。使用标准 SQL 编写迁移，使用行级安全（RLS）在行级别控制访问。',
    h3CreateTables: '创建表和迁移',
    h3RLS: '行级安全（RLS）',
    rlsDesc: 'RLS 是 Supabase 的核心安全模型。启用后，每个查询都会被你定义的策略过滤。',
    h3QueryData: '使用客户端查询数据',
    queryDesc: 'Supabase JavaScript 客户端提供流式查询构建器，底层映射到 PostgREST 查询。',
    h2Auth: '认证',
    authDesc: 'Supabase Auth 支持邮箱/密码、魔法链接、手机 OTP 和 20+ OAuth 提供商。使用 JWT 管理用户会话，通过 auth.uid() 函数与 RLS 策略直接集成。',
    h3EmailAuth: '邮箱和密码认证',
    h3OAuthAuth: 'OAuth 提供商（Google、GitHub）',
    h3MagicLink: '魔法链接认证',
    h3AuthMiddleware: '使用认证中间件保护路由',
    h2Realtime: '实时订阅',
    realtimeDesc: 'Supabase Realtime 通过 WebSocket 监听数据库变更（INSERT、UPDATE、DELETE）。支持 Postgres Changes、Broadcast 和 Presence。',
    h3PostgresChanges: '监听数据库变更',
    h3Broadcast: 'Broadcast：发布/订阅消息',
    h3Presence: 'Presence：追踪在线用户',
    h2Storage: '存储：文件上传',
    storageDesc: 'Supabase Storage 在 S3 兼容的存储桶中管理文件，支持 CDN 缓存。存储桶可以是公开或私有的。',
    h3UploadFiles: '上传和下载文件',
    h3StoragePolicies: '存储安全策略',
    h2EdgeFunctions: 'Edge Functions',
    edgeDesc: 'Edge Functions 是基于 Deno 的服务端 TypeScript 函数，在边缘网络运行，适合 webhook、第三方 API 集成和自定义服务器逻辑。',
    h3CreateEdge: '创建和部署 Edge Functions',
    h3EdgeWithDb: '在 Edge Functions 中使用数据库和认证',
    h2TypeScript: 'TypeScript 集成与类型生成',
    tsDesc: 'Supabase 提供一流的 TypeScript 支持。可以使用 Supabase CLI 直接从数据库 schema 生成类型。',
    h3GenerateTypes: '从数据库 Schema 生成类型',
    h3TypedQueries: '在查询中使用生成的类型',
    h2BestPractices: '生产最佳实践',
    bp1: '始终在每个表上启用 RLS',
    bp2: '使用数据库迁移（supabase db diff）进行所有 schema 变更',
    bp3: '在 WHERE、ORDER BY 和 JOIN 子句中使用的列上创建索引',
    bp4: '在无服务器环境中使用连接池（Supavisor）',
    bp5: '仅在服务端存储 service_role 密钥，永远不要暴露给客户端',
    bp6: '使用 Edge Functions 处理敏感操作',
    bp7: '为生产项目设置数据库备份和时间点恢复',
    bp8: '使用 pg_stat_statements 和 Supabase 仪表板监控查询性能',
    bp9: '使用存储转换进行即时图片缩放',
    bp10: '在认证端点上实施速率限制',
    h2Faq: '常见问题',
    faq1Q: 'Supabase 是 Firebase 的好替代品吗？',
    faq1A: '是的。Supabase 提供等效功能但使用 PostgreSQL 而非 NoSQL。更适合需要关系数据和复杂查询的应用。',
    faq2Q: 'Supabase 费用多少？',
    faq2A: '免费层包括 500MB 数据库、1GB 存储、50K 月活用户。Pro 计划 25 美元/月。',
    faq3Q: '可以自托管 Supabase 吗？',
    faq3A: '可以。Supabase 完全开源，提供 Docker Compose 文件用于自托管。',
    faq4Q: '行级安全如何工作？',
    faq4A: 'RLS 是 PostgreSQL 功能，根据你定义的策略过滤每个查询。使用 auth.uid() 等 SQL 表达式检查条件。',
    faq5Q: 'Supabase 支持实时订阅吗？',
    faq5A: '支持。包括 Postgres Changes、Broadcast 和 Presence 三种模式，均通过 WebSocket 连接。',
    faq6Q: '什么是 Edge Functions？',
    faq6A: 'Edge Functions 是基于 Deno 的服务端函数，在边缘网络运行，处理 webhook、API 集成等任务。',
    faq7Q: '如何从 Supabase 生成 TypeScript 类型？',
    faq7A: '运行 supabase gen types typescript 命令，为所有表、视图和函数生成类型。',
    faq8Q: 'Supabase 能处理生产工作负载吗？',
    faq8A: '可以。Supabase 基于 PostgreSQL 运行，Pro 和 Enterprise 计划提供连接池、只读副本和备份。',
    keyTakeaway1: 'Supabase 基于 PostgreSQL：支持完整 SQL、JOIN、索引和 ACID 事务',
    keyTakeaway2: '行级安全是主要的访问控制机制：在每个表上启用',
    keyTakeaway3: '认证支持邮箱、OAuth（20+ 提供商）、魔法链接和手机 OTP',
    keyTakeaway4: '实时订阅支持数据库变更、广播和在线状态追踪',
    keyTakeaway5: 'Edge Functions（基于 Deno）处理服务端逻辑',
    keyTakeaway6: '从 schema 生成 TypeScript 类型实现端到端类型安全',
    keyTakeaway7: '使用连接池、数据库索引和迁移确保生产就绪',
  },
};

const codeStyle = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' };
const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#334155' };
const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };

export default function SupabaseGuide({ lang }: { lang: string }) {
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

      {/* What Is Supabase */}
      <h2 style={h2Style}>{t.h2WhatIs}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>

      <h3 style={h3Style}>{t.h3SupaVsFire}</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Feature</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Supabase</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', fontWeight: 600 }}>Firebase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Database', 'PostgreSQL (relational, SQL)', 'Firestore (NoSQL, document)'],
              ['Auth', 'Email, OAuth 20+, magic links, phone', 'Email, OAuth, phone, anonymous'],
              ['Real-time', 'Postgres Changes, Broadcast, Presence', 'Firestore listeners, RTDB'],
              ['Storage', 'S3-compatible, CDN, transforms', 'Cloud Storage, CDN'],
              ['Functions', 'Edge Functions (Deno)', 'Cloud Functions (Node.js)'],
              ['Open Source', 'Yes (fully open-source)', 'No (proprietary)'],
              ['Self-hosting', 'Yes (Docker Compose)', 'No'],
              ['Pricing', 'Free: 500MB DB, Pro: $25/mo', 'Free: limited, Blaze: pay-as-you-go'],
              ['Query Language', 'SQL, PostgREST, GraphQL', 'Proprietary SDK queries'],
              ['Vendor Lock-in', 'Low (standard Postgres)', 'High (proprietary formats)'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.5rem 0.75rem', fontWeight: 500 }}>{row[0]}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>{row[1]}</td>
                <td style={{ padding: '0.5rem 0.75rem' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Setup */}
      <h2 style={h2Style}>{t.h2Setup}</h2>
      <p style={pStyle}>{t.setupDesc}</p>
      <pre style={codeStyle}><code>{'# Install Supabase CLI\n' +
        'npm install -g supabase\n\n' +
        '# Login to Supabase\n' +
        'supabase login\n\n' +
        '# Create a new project locally\n' +
        'supabase init\n\n' +
        '# Start local development (Docker required)\n' +
        'supabase start\n\n' +
        '# Output:\n' +
        '#   API URL:   http://localhost:54321\n' +
        '#   DB URL:    postgresql://postgres:postgres@localhost:54322/postgres\n' +
        '#   Studio:    http://localhost:54323\n' +
        '#   anon key:  eyJhbG...\n' +
        '#   service_role key: eyJhbG...\n\n' +
        '# Install the JavaScript client\n' +
        'npm install @supabase/supabase-js'}</code></pre>

      <pre style={codeStyle}><code>{'// lib/supabase.ts - Initialize the client\n' +
        'import { createClient } from \'@supabase/supabase-js\';\n\n' +
        'const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;\n' +
        'const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;\n\n' +
        'export const supabase = createClient(supabaseUrl, supabaseAnonKey);\n\n' +
        '// For server-side admin operations (never expose to client)\n' +
        'import { createClient as createAdmin } from \'@supabase/supabase-js\';\n\n' +
        'const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;\n' +
        'export const supabaseAdmin = createAdmin(supabaseUrl, serviceRoleKey);'}</code></pre>

      {/* Database */}
      <h2 style={h2Style}>{t.h2Database}</h2>
      <p style={pStyle}>{t.dbDesc}</p>

      <h3 style={h3Style}>{t.h3CreateTables}</h3>
      <pre style={codeStyle}><code>{'-- supabase/migrations/001_create_tables.sql\n\n' +
        '-- Profiles table (extends auth.users)\n' +
        'CREATE TABLE public.profiles (\n' +
        '  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,\n' +
        '  username TEXT UNIQUE NOT NULL,\n' +
        '  full_name TEXT,\n' +
        '  avatar_url TEXT,\n' +
        '  bio TEXT,\n' +
        '  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,\n' +
        '  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL\n' +
        ');\n\n' +
        '-- Posts table\n' +
        'CREATE TABLE public.posts (\n' +
        '  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n' +
        '  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\n' +
        '  title TEXT NOT NULL,\n' +
        '  content TEXT NOT NULL,\n' +
        '  slug TEXT UNIQUE NOT NULL,\n' +
        '  published BOOLEAN DEFAULT false,\n' +
        '  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,\n' +
        '  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL\n' +
        ');\n\n' +
        '-- Comments table\n' +
        'CREATE TABLE public.comments (\n' +
        '  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n' +
        '  post_id BIGINT REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,\n' +
        '  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,\n' +
        '  content TEXT NOT NULL,\n' +
        '  created_at TIMESTAMPTZ DEFAULT now() NOT NULL\n' +
        ');\n\n' +
        '-- Indexes for common queries\n' +
        'CREATE INDEX idx_posts_author ON public.posts(author_id);\n' +
        'CREATE INDEX idx_posts_slug ON public.posts(slug);\n' +
        'CREATE INDEX idx_posts_published ON public.posts(published) WHERE published = true;\n' +
        'CREATE INDEX idx_comments_post ON public.comments(post_id);\n\n' +
        '-- Auto-update updated_at column\n' +
        'CREATE OR REPLACE FUNCTION update_updated_at()\n' +
        'RETURNS TRIGGER AS $$\n' +
        'BEGIN\n' +
        '  NEW.updated_at = now();\n' +
        '  RETURN NEW;\n' +
        'END;\n' +
        '$$ LANGUAGE plpgsql;\n\n' +
        'CREATE TRIGGER profiles_updated_at\n' +
        '  BEFORE UPDATE ON public.profiles\n' +
        '  FOR EACH ROW EXECUTE FUNCTION update_updated_at();\n\n' +
        'CREATE TRIGGER posts_updated_at\n' +
        '  BEFORE UPDATE ON public.posts\n' +
        '  FOR EACH ROW EXECUTE FUNCTION update_updated_at();'}</code></pre>

      <h3 style={h3Style}>{t.h3RLS}</h3>
      <p style={pStyle}>{t.rlsDesc}</p>
      <pre style={codeStyle}><code>{'-- Enable RLS on all tables\n' +
        'ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;\n' +
        'ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;\n' +
        'ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;\n\n' +
        '-- Profiles: anyone can read, owners can update their own\n' +
        'CREATE POLICY "Public profiles are viewable by everyone"\n' +
        '  ON public.profiles FOR SELECT\n' +
        '  USING (true);\n\n' +
        'CREATE POLICY "Users can update their own profile"\n' +
        '  ON public.profiles FOR UPDATE\n' +
        '  USING (auth.uid() = id)\n' +
        '  WITH CHECK (auth.uid() = id);\n\n' +
        '-- Posts: published posts visible to all, authors manage own posts\n' +
        'CREATE POLICY "Published posts are viewable by everyone"\n' +
        '  ON public.posts FOR SELECT\n' +
        '  USING (published = true OR auth.uid() = author_id);\n\n' +
        'CREATE POLICY "Users can create posts"\n' +
        '  ON public.posts FOR INSERT\n' +
        '  WITH CHECK (auth.uid() = author_id);\n\n' +
        'CREATE POLICY "Users can update their own posts"\n' +
        '  ON public.posts FOR UPDATE\n' +
        '  USING (auth.uid() = author_id)\n' +
        '  WITH CHECK (auth.uid() = author_id);\n\n' +
        'CREATE POLICY "Users can delete their own posts"\n' +
        '  ON public.posts FOR DELETE\n' +
        '  USING (auth.uid() = author_id);\n\n' +
        '-- Comments: anyone reads, authenticated users create, owners delete\n' +
        'CREATE POLICY "Comments are viewable by everyone"\n' +
        '  ON public.comments FOR SELECT\n' +
        '  USING (true);\n\n' +
        'CREATE POLICY "Authenticated users can create comments"\n' +
        '  ON public.comments FOR INSERT\n' +
        '  WITH CHECK (auth.uid() = user_id);\n\n' +
        'CREATE POLICY "Users can delete their own comments"\n' +
        '  ON public.comments FOR DELETE\n' +
        '  USING (auth.uid() = user_id);'}</code></pre>

      <h3 style={h3Style}>{t.h3QueryData}</h3>
      <p style={pStyle}>{t.queryDesc}</p>
      <pre style={codeStyle}><code>{'// Fetch published posts with author profile\n' +
        'const { data: posts, error } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .select(\'\n' +
        '    id, title, slug, content, created_at,\n' +
        '    profiles:author_id (username, full_name, avatar_url)\n' +
        '  \')\n' +
        '  .eq(\'published\', true)\n' +
        '  .order(\'created_at\', { ascending: false })\n' +
        '  .limit(10);\n\n' +
        '// Fetch a single post by slug with comments\n' +
        'const { data: post } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .select(\'\n' +
        '    *, \n' +
        '    profiles:author_id (username, avatar_url),\n' +
        '    comments (id, content, created_at, profiles:user_id (username))\n' +
        '  \')\n' +
        '  .eq(\'slug\', \'my-first-post\')\n' +
        '  .single();\n\n' +
        '// Insert a new post\n' +
        'const { data, error } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .insert({\n' +
        '    author_id: user.id,\n' +
        '    title: \'My New Post\',\n' +
        '    content: \'Post content here...\',\n' +
        '    slug: \'my-new-post\',\n' +
        '    published: true,\n' +
        '  })\n' +
        '  .select()\n' +
        '  .single();\n\n' +
        '// Update a post\n' +
        'const { data, error } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .update({ title: \'Updated Title\', published: true })\n' +
        '  .eq(\'id\', postId)\n' +
        '  .select()\n' +
        '  .single();\n\n' +
        '// Delete a post\n' +
        'const { error } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .delete()\n' +
        '  .eq(\'id\', postId);\n\n' +
        '// Full-text search\n' +
        'const { data } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .select(\'id, title, slug\')\n' +
        '  .textSearch(\'title\', \'supabase & guide\');\n\n' +
        '// Pagination with range\n' +
        'const { data, count } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .select(\'*\', { count: \'exact\' })\n' +
        '  .eq(\'published\', true)\n' +
        '  .range(0, 9); // rows 0-9 (first 10)'}</code></pre>

      {/* Auth */}
      <h2 style={h2Style}>{t.h2Auth}</h2>
      <p style={pStyle}>{t.authDesc}</p>

      <h3 style={h3Style}>{t.h3EmailAuth}</h3>
      <pre style={codeStyle}><code>{'// Sign up with email and password\n' +
        'const { data, error } = await supabase.auth.signUp({\n' +
        '  email: \'user@example.com\',\n' +
        '  password: \'securePassword123\',\n' +
        '  options: {\n' +
        '    data: {\n' +
        '      username: \'johndoe\',\n' +
        '      full_name: \'John Doe\',\n' +
        '    },\n' +
        '  },\n' +
        '});\n\n' +
        '// Sign in with email and password\n' +
        'const { data, error } = await supabase.auth.signInWithPassword({\n' +
        '  email: \'user@example.com\',\n' +
        '  password: \'securePassword123\',\n' +
        '});\n\n' +
        '// Get current user\n' +
        'const { data: { user } } = await supabase.auth.getUser();\n\n' +
        '// Sign out\n' +
        'const { error } = await supabase.auth.signOut();\n\n' +
        '// Listen to auth state changes\n' +
        'supabase.auth.onAuthStateChange((event, session) => {\n' +
        '  console.log(\'Auth event:\', event);\n' +
        '  // event: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, etc.\n' +
        '  if (session) {\n' +
        '    console.log(\'User:\', session.user.email);\n' +
        '  }\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3OAuthAuth}</h3>
      <pre style={codeStyle}><code>{'// Sign in with Google\n' +
        'const { data, error } = await supabase.auth.signInWithOAuth({\n' +
        '  provider: \'google\',\n' +
        '  options: {\n' +
        '    redirectTo: \'https://yourapp.com/auth/callback\',\n' +
        '    queryParams: {\n' +
        '      access_type: \'offline\',\n' +
        '      prompt: \'consent\',\n' +
        '    },\n' +
        '  },\n' +
        '});\n\n' +
        '// Sign in with GitHub\n' +
        'const { data, error } = await supabase.auth.signInWithOAuth({\n' +
        '  provider: \'github\',\n' +
        '  options: {\n' +
        '    redirectTo: \'https://yourapp.com/auth/callback\',\n' +
        '    scopes: \'read:user user:email\',\n' +
        '  },\n' +
        '});\n\n' +
        '// Handle OAuth callback (in your callback route)\n' +
        '// app/auth/callback/route.ts\n' +
        'import { NextResponse } from \'next/server\';\n' +
        'import { createClient } from \'@supabase/supabase-js\';\n\n' +
        'export async function GET(request: Request) {\n' +
        '  const url = new URL(request.url);\n' +
        '  const code = url.searchParams.get(\'code\');\n\n' +
        '  if (code) {\n' +
        '    const supabase = createClient(\n' +
        '      process.env.NEXT_PUBLIC_SUPABASE_URL!,\n' +
        '      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!\n' +
        '    );\n' +
        '    await supabase.auth.exchangeCodeForSession(code);\n' +
        '  }\n\n' +
        '  return NextResponse.redirect(new URL(\'/dashboard\', request.url));\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>{t.h3MagicLink}</h3>
      <pre style={codeStyle}><code>{'// Send magic link email\n' +
        'const { data, error } = await supabase.auth.signInWithOtp({\n' +
        '  email: \'user@example.com\',\n' +
        '  options: {\n' +
        '    emailRedirectTo: \'https://yourapp.com/auth/callback\',\n' +
        '  },\n' +
        '});\n\n' +
        '// Phone OTP\n' +
        'const { data, error } = await supabase.auth.signInWithOtp({\n' +
        '  phone: \'+1234567890\',\n' +
        '});\n\n' +
        '// Verify phone OTP\n' +
        'const { data, error } = await supabase.auth.verifyOtp({\n' +
        '  phone: \'+1234567890\',\n' +
        '  token: \'123456\',\n' +
        '  type: \'sms\',\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3AuthMiddleware}</h3>
      <pre style={codeStyle}><code>{'// middleware.ts - Protect routes with Supabase Auth\n' +
        'import { createServerClient } from \'@supabase/ssr\';\n' +
        'import { NextResponse } from \'next/server\';\n' +
        'import type { NextRequest } from \'next/server\';\n\n' +
        'export async function middleware(request: NextRequest) {\n' +
        '  let response = NextResponse.next({\n' +
        '    request: { headers: request.headers },\n' +
        '  });\n\n' +
        '  const supabase = createServerClient(\n' +
        '    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n' +
        '    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n' +
        '    {\n' +
        '      cookies: {\n' +
        '        getAll() {\n' +
        '          return request.cookies.getAll();\n' +
        '        },\n' +
        '        setAll(cookies) {\n' +
        '          cookies.forEach(({ name, value, options }) => {\n' +
        '            response.cookies.set(name, value, options);\n' +
        '          });\n' +
        '        },\n' +
        '      },\n' +
        '    }\n' +
        '  );\n\n' +
        '  const { data: { user } } = await supabase.auth.getUser();\n\n' +
        '  // Redirect unauthenticated users to login\n' +
        '  if (!user && request.nextUrl.pathname.startsWith(\'/dashboard\')) {\n' +
        '    return NextResponse.redirect(new URL(\'/login\', request.url));\n' +
        '  }\n\n' +
        '  return response;\n' +
        '}\n\n' +
        'export const config = {\n' +
        '  matcher: [\'/dashboard/:path*\', \'/api/:path*\'],\n' +
        '};'}</code></pre>

      {/* Realtime */}
      <h2 style={h2Style}>{t.h2Realtime}</h2>
      <p style={pStyle}>{t.realtimeDesc}</p>

      <h3 style={h3Style}>{t.h3PostgresChanges}</h3>
      <pre style={codeStyle}><code>{'// Listen to all changes on the posts table\n' +
        'const channel = supabase\n' +
        '  .channel(\'posts-changes\')\n' +
        '  .on(\n' +
        '    \'postgres_changes\',\n' +
        '    {\n' +
        '      event: \'*\',       // INSERT, UPDATE, DELETE, or *\n' +
        '      schema: \'public\',\n' +
        '      table: \'posts\',\n' +
        '    },\n' +
        '    (payload) => {\n' +
        '      console.log(\'Change received:\', payload);\n' +
        '      // payload.eventType: INSERT | UPDATE | DELETE\n' +
        '      // payload.new: new row data (INSERT/UPDATE)\n' +
        '      // payload.old: old row data (UPDATE/DELETE)\n' +
        '    }\n' +
        '  )\n' +
        '  .subscribe();\n\n' +
        '// Listen to inserts on a specific user\'s posts\n' +
        'const channel2 = supabase\n' +
        '  .channel(\'my-posts\')\n' +
        '  .on(\n' +
        '    \'postgres_changes\',\n' +
        '    {\n' +
        '      event: \'INSERT\',\n' +
        '      schema: \'public\',\n' +
        '      table: \'comments\',\n' +
        '      filter: \'post_id=eq.42\',\n' +
        '    },\n' +
        '    (payload) => {\n' +
        '      console.log(\'New comment:\', payload.new);\n' +
        '    }\n' +
        '  )\n' +
        '  .subscribe();\n\n' +
        '// Unsubscribe when done\n' +
        'supabase.removeChannel(channel);'}</code></pre>

      <h3 style={h3Style}>{t.h3Broadcast}</h3>
      <pre style={codeStyle}><code>{'// Broadcast: send messages to all connected clients\n' +
        '// Useful for cursor positions, typing indicators, notifications\n\n' +
        'const channel = supabase.channel(\'room-1\');\n\n' +
        '// Listen for broadcast messages\n' +
        'channel\n' +
        '  .on(\'broadcast\', { event: \'cursor-move\' }, (payload) => {\n' +
        '    console.log(\'Cursor:\', payload.payload);\n' +
        '  })\n' +
        '  .subscribe();\n\n' +
        '// Send a broadcast message\n' +
        'channel.send({\n' +
        '  type: \'broadcast\',\n' +
        '  event: \'cursor-move\',\n' +
        '  payload: { x: 100, y: 200, userId: \'abc123\' },\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3Presence}</h3>
      <pre style={codeStyle}><code>{'// Presence: track who is online in a room\n' +
        'const channel = supabase.channel(\'room-1\');\n\n' +
        'channel\n' +
        '  .on(\'presence\', { event: \'sync\' }, () => {\n' +
        '    const state = channel.presenceState();\n' +
        '    console.log(\'Online users:\', Object.keys(state));\n' +
        '  })\n' +
        '  .on(\'presence\', { event: \'join\' }, ({ key, newPresences }) => {\n' +
        '    console.log(\'User joined:\', key, newPresences);\n' +
        '  })\n' +
        '  .on(\'presence\', { event: \'leave\' }, ({ key, leftPresences }) => {\n' +
        '    console.log(\'User left:\', key, leftPresences);\n' +
        '  })\n' +
        '  .subscribe(async (status) => {\n' +
        '    if (status === \'SUBSCRIBED\') {\n' +
        '      await channel.track({\n' +
        '        userId: user.id,\n' +
        '        username: user.username,\n' +
        '        onlineAt: new Date().toISOString(),\n' +
        '      });\n' +
        '    }\n' +
        '  });'}</code></pre>

      {/* Storage */}
      <h2 style={h2Style}>{t.h2Storage}</h2>
      <p style={pStyle}>{t.storageDesc}</p>

      <h3 style={h3Style}>{t.h3UploadFiles}</h3>
      <pre style={codeStyle}><code>{'// Upload a file to a public bucket\n' +
        'const file = event.target.files[0];\n' +
        'const fileName = Date.now() + \'-\' + file.name;\n\n' +
        'const { data, error } = await supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .upload(\'public/\' + fileName, file, {\n' +
        '    cacheControl: \'3600\',\n' +
        '    upsert: false,\n' +
        '    contentType: file.type,\n' +
        '  });\n\n' +
        '// Get public URL\n' +
        'const { data: urlData } = supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .getPublicUrl(\'public/\' + fileName);\n\n' +
        'console.log(\'Public URL:\', urlData.publicUrl);\n\n' +
        '// Download a file\n' +
        'const { data: blob, error } = await supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .download(\'public/\' + fileName);\n\n' +
        '// Create a signed URL for private files (expires in 1 hour)\n' +
        'const { data: signed, error } = await supabase.storage\n' +
        '  .from(\'documents\')\n' +
        '  .createSignedUrl(\'private/report.pdf\', 3600);\n\n' +
        '// List files in a directory\n' +
        'const { data: files, error } = await supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .list(\'public\', {\n' +
        '    limit: 100,\n' +
        '    offset: 0,\n' +
        '    sortBy: { column: \'created_at\', order: \'desc\' },\n' +
        '  });\n\n' +
        '// Delete a file\n' +
        'const { error } = await supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .remove([\'public/\' + fileName]);\n\n' +
        '// Image transforms (resize on the fly)\n' +
        'const { data: transformed } = supabase.storage\n' +
        '  .from(\'avatars\')\n' +
        '  .getPublicUrl(\'public/photo.jpg\', {\n' +
        '    transform: {\n' +
        '      width: 200,\n' +
        '      height: 200,\n' +
        '      resize: \'cover\',\n' +
        '      quality: 80,\n' +
        '    },\n' +
        '  });'}</code></pre>

      <h3 style={h3Style}>{t.h3StoragePolicies}</h3>
      <pre style={codeStyle}><code>{'-- Storage policies for the avatars bucket\n\n' +
        '-- Allow public read access\n' +
        'CREATE POLICY "Avatar images are publicly accessible"\n' +
        '  ON storage.objects FOR SELECT\n' +
        '  USING (bucket_id = \'avatars\');\n\n' +
        '-- Allow authenticated users to upload their own avatar\n' +
        'CREATE POLICY "Users can upload their own avatar"\n' +
        '  ON storage.objects FOR INSERT\n' +
        '  WITH CHECK (\n' +
        '    bucket_id = \'avatars\'\n' +
        '    AND auth.uid()::text = (storage.foldername(name))[1]\n' +
        '  );\n\n' +
        '-- Allow users to update their own avatar\n' +
        'CREATE POLICY "Users can update their own avatar"\n' +
        '  ON storage.objects FOR UPDATE\n' +
        '  USING (\n' +
        '    bucket_id = \'avatars\'\n' +
        '    AND auth.uid()::text = (storage.foldername(name))[1]\n' +
        '  );\n\n' +
        '-- Allow users to delete their own avatar\n' +
        'CREATE POLICY "Users can delete their own avatar"\n' +
        '  ON storage.objects FOR DELETE\n' +
        '  USING (\n' +
        '    bucket_id = \'avatars\'\n' +
        '    AND auth.uid()::text = (storage.foldername(name))[1]\n' +
        '  );'}</code></pre>

      {/* Edge Functions */}
      <h2 style={h2Style}>{t.h2EdgeFunctions}</h2>
      <p style={pStyle}>{t.edgeDesc}</p>

      <h3 style={h3Style}>{t.h3CreateEdge}</h3>
      <pre style={codeStyle}><code>{'# Create a new Edge Function\n' +
        'supabase functions new send-email\n\n' +
        '# Project structure:\n' +
        '# supabase/functions/send-email/index.ts\n\n' +
        '# Deploy the function\n' +
        'supabase functions deploy send-email\n\n' +
        '# Deploy all functions\n' +
        'supabase functions deploy\n\n' +
        '# Test locally\n' +
        'supabase functions serve send-email --no-verify-jwt'}</code></pre>

      <pre style={codeStyle}><code>{'// supabase/functions/send-email/index.ts\n' +
        'import { serve } from \'https://deno.land/std@0.177.0/http/server.ts\';\n\n' +
        'const corsHeaders = {\n' +
        '  \'Access-Control-Allow-Origin\': \'*\',\n' +
        '  \'Access-Control-Allow-Headers\': \'authorization, x-client-info, apikey, content-type\',\n' +
        '};\n\n' +
        'serve(async (req) => {\n' +
        '  // Handle CORS preflight\n' +
        '  if (req.method === \'OPTIONS\') {\n' +
        '    return new Response(\'ok\', { headers: corsHeaders });\n' +
        '  }\n\n' +
        '  try {\n' +
        '    const { to, subject, body } = await req.json();\n\n' +
        '    // Call an email API (e.g., Resend)\n' +
        '    const res = await fetch(\'https://api.resend.com/emails\', {\n' +
        '      method: \'POST\',\n' +
        '      headers: {\n' +
        '        Authorization: \'Bearer \' + Deno.env.get(\'RESEND_API_KEY\'),\n' +
        '        \'Content-Type\': \'application/json\',\n' +
        '      },\n' +
        '      body: JSON.stringify({\n' +
        '        from: \'noreply@yourapp.com\',\n' +
        '        to: to,\n' +
        '        subject: subject,\n' +
        '        html: body,\n' +
        '      }),\n' +
        '    });\n\n' +
        '    const data = await res.json();\n\n' +
        '    return new Response(JSON.stringify(data), {\n' +
        '      headers: { ...corsHeaders, \'Content-Type\': \'application/json\' },\n' +
        '      status: 200,\n' +
        '    });\n' +
        '  } catch (err) {\n' +
        '    return new Response(JSON.stringify({ error: err.message }), {\n' +
        '      headers: { ...corsHeaders, \'Content-Type\': \'application/json\' },\n' +
        '      status: 500,\n' +
        '    });\n' +
        '  }\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3EdgeWithDb}</h3>
      <pre style={codeStyle}><code>{'// supabase/functions/process-order/index.ts\n' +
        'import { serve } from \'https://deno.land/std@0.177.0/http/server.ts\';\n' +
        'import { createClient } from \'https://esm.sh/@supabase/supabase-js@2\';\n\n' +
        'serve(async (req) => {\n' +
        '  // Create Supabase client with service role (admin access)\n' +
        '  const supabase = createClient(\n' +
        '    Deno.env.get(\'SUPABASE_URL\') ?? \'\',\n' +
        '    Deno.env.get(\'SUPABASE_SERVICE_ROLE_KEY\') ?? \'\'\n' +
        '  );\n\n' +
        '  // Get user from auth header\n' +
        '  const authHeader = req.headers.get(\'Authorization\')!;\n' +
        '  const token = authHeader.replace(\'Bearer \', \'\');\n' +
        '  const { data: { user } } = await supabase.auth.getUser(token);\n\n' +
        '  if (!user) {\n' +
        '    return new Response(\'Unauthorized\', { status: 401 });\n' +
        '  }\n\n' +
        '  const { orderId } = await req.json();\n\n' +
        '  // Use admin client to bypass RLS for server operations\n' +
        '  const { data: order, error } = await supabase\n' +
        '    .from(\'orders\')\n' +
        '    .update({ status: \'processing\', processed_at: new Date().toISOString() })\n' +
        '    .eq(\'id\', orderId)\n' +
        '    .eq(\'user_id\', user.id)\n' +
        '    .select()\n' +
        '    .single();\n\n' +
        '  return new Response(JSON.stringify({ order }), {\n' +
        '    headers: { \'Content-Type\': \'application/json\' },\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* Invoke edge function from client */}
      <pre style={codeStyle}><code>{'// Invoke Edge Function from the client\n' +
        'const { data, error } = await supabase.functions.invoke(\'send-email\', {\n' +
        '  body: {\n' +
        '    to: \'user@example.com\',\n' +
        '    subject: \'Welcome!\',\n' +
        '    body: \'<h1>Welcome to our app</h1>\',\n' +
        '  },\n' +
        '});\n\n' +
        '// Invoke with custom headers\n' +
        'const { data, error } = await supabase.functions.invoke(\'process-order\', {\n' +
        '  body: { orderId: \'order_123\' },\n' +
        '  headers: { \'x-custom-header\': \'value\' },\n' +
        '});'}</code></pre>

      {/* TypeScript */}
      <h2 style={h2Style}>{t.h2TypeScript}</h2>
      <p style={pStyle}>{t.tsDesc}</p>

      <h3 style={h3Style}>{t.h3GenerateTypes}</h3>
      <pre style={codeStyle}><code>{'# Generate types from your remote database\n' +
        'supabase gen types typescript \\\n' +
        '  --project-id your-project-id \\\n' +
        '  > src/types/database.ts\n\n' +
        '# Or from a local database\n' +
        'supabase gen types typescript --local > src/types/database.ts\n\n' +
        '# Add to package.json scripts\n' +
        '# "gen-types": "supabase gen types typescript --project-id abc123 > src/types/database.ts"'}</code></pre>

      <pre style={codeStyle}><code>{'// Generated types look like this (src/types/database.ts)\n' +
        'export type Database = {\n' +
        '  public: {\n' +
        '    Tables: {\n' +
        '      profiles: {\n' +
        '        Row: {\n' +
        '          id: string;\n' +
        '          username: string;\n' +
        '          full_name: string | null;\n' +
        '          avatar_url: string | null;\n' +
        '          bio: string | null;\n' +
        '          created_at: string;\n' +
        '          updated_at: string;\n' +
        '        };\n' +
        '        Insert: {\n' +
        '          id: string;\n' +
        '          username: string;\n' +
        '          full_name?: string | null;\n' +
        '          avatar_url?: string | null;\n' +
        '          bio?: string | null;\n' +
        '        };\n' +
        '        Update: {\n' +
        '          username?: string;\n' +
        '          full_name?: string | null;\n' +
        '          avatar_url?: string | null;\n' +
        '          bio?: string | null;\n' +
        '        };\n' +
        '      };\n' +
        '      posts: {\n' +
        '        Row: {\n' +
        '          id: number;\n' +
        '          author_id: string;\n' +
        '          title: string;\n' +
        '          content: string;\n' +
        '          slug: string;\n' +
        '          published: boolean;\n' +
        '          created_at: string;\n' +
        '          updated_at: string;\n' +
        '        };\n' +
        '        Insert: {\n' +
        '          author_id: string;\n' +
        '          title: string;\n' +
        '          content: string;\n' +
        '          slug: string;\n' +
        '          published?: boolean;\n' +
        '        };\n' +
        '        Update: {\n' +
        '          title?: string;\n' +
        '          content?: string;\n' +
        '          slug?: string;\n' +
        '          published?: boolean;\n' +
        '        };\n' +
        '      };\n' +
        '    };\n' +
        '  };\n' +
        '};'}</code></pre>

      <h3 style={h3Style}>{t.h3TypedQueries}</h3>
      <pre style={codeStyle}><code>{'// lib/supabase.ts - Typed client\n' +
        'import { createClient } from \'@supabase/supabase-js\';\n' +
        'import type { Database } from \'@/types/database\';\n\n' +
        'export const supabase = createClient<Database>(\n' +
        '  process.env.NEXT_PUBLIC_SUPABASE_URL!,\n' +
        '  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!\n' +
        ');\n\n' +
        '// Now all queries are fully typed\n' +
        '// data is typed as Database["public"]["Tables"]["posts"]["Row"][]\n' +
        'const { data: posts } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .select(\'id, title, slug, published\');\n\n' +
        '// TypeScript enforces correct insert shape\n' +
        'const { data } = await supabase\n' +
        '  .from(\'posts\')\n' +
        '  .insert({\n' +
        '    author_id: user.id,    // required: string\n' +
        '    title: \'My Post\',      // required: string\n' +
        '    content: \'Content\',    // required: string\n' +
        '    slug: \'my-post\',       // required: string\n' +
        '    // published is optional (defaults to false)\n' +
        '  })\n' +
        '  .select()\n' +
        '  .single();\n\n' +
        '// Helper types for reuse\n' +
        'type Post = Database[\'public\'][\'Tables\'][\'posts\'][\'Row\'];\n' +
        'type PostInsert = Database[\'public\'][\'Tables\'][\'posts\'][\'Insert\'];\n' +
        'type PostUpdate = Database[\'public\'][\'Tables\'][\'posts\'][\'Update\'];\n' +
        'type Profile = Database[\'public\'][\'Tables\'][\'profiles\'][\'Row\'];\n\n' +
        '// Use in React components\n' +
        'function PostCard({ post }: { post: Post }) {\n' +
        '  return (\n' +
        '    <div>\n' +
        '      <h2>{post.title}</h2>\n' +
        '      <p>{post.content}</p>\n' +
        '      <time>{new Date(post.created_at).toLocaleDateString()}</time>\n' +
        '    </div>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8, t.bp9, t.bp10].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.75' }}>{item}</li>
        ))}
      </ul>

      <pre style={codeStyle}><code>{'-- Production-ready database setup checklist\n\n' +
        '-- 1. Enable RLS on ALL tables\n' +
        'DO $$\n' +
        'DECLARE\n' +
        '  t RECORD;\n' +
        'BEGIN\n' +
        '  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = \'public\'\n' +
        '  LOOP\n' +
        '    EXECUTE format(\'ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY\', t.tablename);\n' +
        '  END LOOP;\n' +
        'END $$;\n\n' +
        '-- 2. Create indexes for performance\n' +
        'CREATE INDEX CONCURRENTLY idx_posts_created\n' +
        '  ON public.posts(created_at DESC);\n\n' +
        '-- 3. Enable pg_stat_statements for query monitoring\n' +
        'CREATE EXTENSION IF NOT EXISTS pg_stat_statements;\n\n' +
        '-- 4. Check for missing indexes\n' +
        'SELECT\n' +
        '  relname AS table_name,\n' +
        '  seq_scan - idx_scan AS too_many_seq_scans,\n' +
        '  pg_size_pretty(pg_relation_size(relid)) AS table_size\n' +
        'FROM pg_stat_user_tables\n' +
        'WHERE seq_scan - idx_scan > 0\n' +
        'ORDER BY too_many_seq_scans DESC\n' +
        'LIMIT 10;'}</code></pre>

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
