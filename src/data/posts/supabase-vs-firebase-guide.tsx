'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Supabase vs Firebase 2026: The Definitive Comparison Guide for Developers',
    intro: '<strong>Supabase</strong> and <strong>Firebase</strong> are the two most popular Backend-as-a-Service (BaaS) platforms in 2026, but they represent fundamentally different philosophies. Supabase is an open-source PostgreSQL-based platform that gives you a full relational database with SQL power, while Firebase is Google\'s proprietary NoSQL platform optimized for rapid prototyping and mobile-first applications. This guide compares every aspect — database architecture, authentication, storage, realtime capabilities, pricing, security, and more — with real code examples to help you make the right choice.',
    tldr: '<strong>TL;DR:</strong> Choose <strong>Supabase</strong> if you need SQL, complex queries, open source, self-hosting, or relational data modeling. Choose <strong>Firebase</strong> if you want rapid prototyping, tight Google Cloud integration, mature mobile SDKs, or NoSQL flexibility for hierarchical data. Supabase is cheaper at scale (PostgreSQL pricing vs Firebase\'s read/write billing), has Row Level Security for fine-grained access control, and can be self-hosted. Firebase has a more mature ecosystem, better offline support, and excels at real-time mobile apps. Both offer generous free tiers. For most new web projects in 2026, Supabase is the stronger default choice.',
    takeaways_title: 'Key Takeaways',
    takeaway1: 'Supabase uses PostgreSQL (relational, SQL) while Firebase uses Firestore/RTDB (NoSQL, document-based) — this is the most fundamental difference.',
    takeaway2: 'Supabase is fully open source (Apache 2.0) and can be self-hosted. Firebase is proprietary and locked to Google Cloud.',
    takeaway3: 'Firebase charges per read/write operation, which can cause surprise bills. Supabase charges for compute and storage, making costs more predictable.',
    takeaway4: 'Supabase Row Level Security (RLS) provides database-level access control. Firebase Security Rules are a custom DSL evaluated outside the database.',
    takeaway5: 'Firebase has superior offline support and mobile SDKs, making it the better choice for offline-first mobile apps.',
    takeaway6: 'Supabase auto-generates TypeScript types from your database schema. Firebase requires manual type definitions or code generation tools.',
    h2_philosophy: 'Philosophy and Architecture',
    philosophyP1: 'The core difference between Supabase and Firebase comes down to <strong>open source relational vs proprietary NoSQL</strong>. Supabase wraps existing open-source tools — PostgreSQL, GoTrue, PostgREST, Realtime, and Storage — behind a unified API. You own your data and can migrate or self-host at any time.',
    philosophyP2: 'Firebase is a collection of Google Cloud services (Firestore, Authentication, Cloud Functions, Hosting, Cloud Storage) presented through client SDKs. It is deeply integrated with the Google Cloud ecosystem, offering services like Analytics, Crashlytics, Remote Config, and ML Kit that have no Supabase equivalent.',
    h2_database: 'Database: PostgreSQL vs Firestore',
    dbP1: 'This is where the two platforms diverge most dramatically. Supabase gives you a full PostgreSQL database with all the power of SQL — JOINs, aggregations, window functions, CTEs, full-text search, and extensions like PostGIS for geospatial data. Firestore is a document-oriented NoSQL database where data is stored as collections of documents with nested subcollections.',
    dbP2: 'Here is how you would model a blog with users, posts, and comments on each platform:',
    h3_supabase_db: 'Supabase: PostgreSQL Schema',
    h3_firebase_db: 'Firebase: Firestore Data Model',
    dbP3: '<strong>Query power comparison:</strong> PostgreSQL can execute complex queries that are impossible or extremely expensive in Firestore. Aggregations, JOINs across tables, subqueries, window functions, and recursive CTEs all work natively. In Firestore, you typically need to denormalize data (duplicate it across documents) and use Cloud Functions for anything beyond basic queries.',
    h2_feature: 'Feature Comparison Table',
    h2_auth: 'Authentication',
    authP1: 'Both platforms provide comprehensive authentication solutions. Supabase Auth (based on GoTrue) and Firebase Auth support email/password, social OAuth, phone OTP, and magic links. Firebase additionally supports anonymous auth and has deeper integration with Google Sign-In.',
    h3_supabase_auth: 'Supabase Auth',
    h3_firebase_auth: 'Firebase Auth',
    authP2: 'Firebase Auth has a slight edge in mobile development with pre-built UI components (FirebaseUI) for Android, iOS, and web. Supabase Auth is more developer-friendly for web apps and integrates directly with Row Level Security policies.',
    h2_storage: 'Storage Comparison',
    storageP1: 'Both platforms offer file storage with CDN delivery. Supabase Storage is built on S3-compatible object storage with direct PostgreSQL integration — you can use RLS policies on storage buckets. Firebase Cloud Storage uses Google Cloud Storage under the hood.',
    h3_supabase_storage: 'Supabase Storage',
    h3_firebase_storage: 'Firebase Cloud Storage',
    h2_realtime: 'Realtime Capabilities',
    realtimeP1: 'Realtime is where Firebase originally made its name. Firebase Realtime Database was designed from the ground up for live data synchronization. Firestore added real-time listeners later. Supabase Realtime, powered by Phoenix (Elixir), offers three modes: Postgres Changes (listen to database changes), Broadcast (pub/sub messaging), and Presence (track online users).',
    h3_supabase_realtime: 'Supabase Realtime',
    h3_firebase_realtime: 'Firebase Realtime Listeners',
    realtimeP2: 'Firebase\'s offline persistence gives it a significant advantage for mobile apps — data is cached locally and synced when the device comes back online. Supabase does not have built-in offline support.',
    h2_functions: 'Edge Functions vs Cloud Functions',
    functionsP1: 'Supabase Edge Functions run on Deno at the edge (low latency, globally distributed). Firebase Cloud Functions run on Node.js in a specific region. Edge Functions have faster cold starts (~50ms vs ~500ms-3s for Cloud Functions) but have a 150MB memory limit.',
    h3_supabase_fn: 'Supabase Edge Function (Deno)',
    h3_firebase_fn: 'Firebase Cloud Function (Node.js)',
    h2_pricing: 'Pricing Comparison',
    pricingP1: 'Pricing is one of the biggest differentiators and often the deciding factor. Firebase charges per operation (reads, writes, deletes), which can lead to unpredictable costs. Supabase charges for compute resources and storage, making costs more predictable.',
    pricingP2: 'Here is a real cost comparison at different scales:',
    h3_free_tier: 'Free Tier Comparison',
    h3_10k: 'Estimated Cost: 10,000 Monthly Active Users',
    h3_100k: 'Estimated Cost: 100,000 MAU',
    h3_1m: 'Estimated Cost: 1,000,000 MAU',
    pricingP3: '<strong>Key insight:</strong> Firebase costs can spike unpredictably due to read-heavy operations. A single Firestore listener on a frequently-updated document can consume millions of reads per month. Supabase pricing is more linear and predictable because it is based on compute and storage rather than operations.',
    h2_security: 'Security Model: RLS vs Security Rules',
    securityP1: 'Supabase uses PostgreSQL Row Level Security (RLS) — policies written in SQL that are enforced at the database level. Firebase uses Security Rules — a custom JSON-like DSL that is evaluated in a sandboxed environment outside the database.',
    h3_supabase_rls: 'Supabase Row Level Security',
    h3_firebase_rules: 'Firebase Security Rules',
    securityP2: 'RLS advantages: policies are SQL (familiar), enforced at the database level (cannot be bypassed), composable with views and functions. Firebase Rules advantages: easier to learn initially, pattern matching for document paths, and validation built in.',
    h2_typescript: 'TypeScript Support',
    tsP1: 'Supabase has a major advantage here. The Supabase CLI can generate TypeScript types directly from your PostgreSQL schema with <code>supabase gen types typescript</code>. Every query returns properly typed results. Firebase requires manual type definitions or third-party tools like firebase-admin with Zod validation.',
    h2_selfhost: 'Self-Hosting and Vendor Lock-In',
    selfhostP1: 'Supabase can be fully self-hosted using Docker Compose. The entire stack — PostgreSQL, GoTrue, PostgREST, Realtime, Storage, Studio — is open source. This means zero vendor lock-in: your data is in a standard PostgreSQL database that can be migrated to any PostgreSQL host.',
    selfhostP2: 'Firebase cannot be self-hosted. Your data lives in Google Cloud, and migrating away requires significant effort. Firestore data must be exported to JSON/CSV and transformed for a different database. Cloud Functions must be rewritten. Authentication providers must be reconfigured.',
    h2_framework: 'Framework Integration',
    frameworkP1: 'Both platforms provide SDKs for major frameworks, but the developer experience differs:',
    h2_performance: 'Performance Benchmarks',
    perfP1: 'Performance varies significantly based on query patterns, data size, and region configuration. Here are typical benchmarks for common operations:',
    h2_when_supabase: 'When to Choose Supabase',
    whenSupabase: 'You need complex SQL queries (JOINs, aggregations, CTEs)|You want an open-source stack you can self-host|Your data is relational (users, orders, products with relationships)|You need database-level access control (RLS)|You want auto-generated TypeScript types|You are building a web application (Next.js, SvelteKit, Nuxt)|You need PostGIS for geospatial queries|You want predictable, usage-based pricing|You need to avoid vendor lock-in|You are comfortable with SQL and relational modeling',
    h2_when_firebase: 'When to Choose Firebase',
    whenFirebase: 'You are building a mobile-first app (iOS/Android)|You need offline-first data synchronization|You want rapid prototyping with minimal backend code|You are deeply invested in the Google Cloud ecosystem|You need Analytics, Crashlytics, or Remote Config|Your data is hierarchical or document-oriented|You need pre-built auth UI components (FirebaseUI)|You want Firebase Hosting with CDN and preview channels|You need A/B testing and feature flags built in|Your team is more comfortable with NoSQL',
    h2_migration: 'Migration Guide: Firebase to Supabase',
    migrationP1: 'Migrating from Firebase to Supabase is a common path as projects grow and need SQL capabilities. Here is a high-level migration guide:',
    migrationStep1: '<strong>1. Export Firestore data:</strong> Use the Firebase CLI (<code>firebase firestore:export</code>) or the Admin SDK to export your collections as JSON. For large datasets, use the BigQuery export feature.',
    migrationStep2: '<strong>2. Design PostgreSQL schema:</strong> Convert your document-based data model to a relational schema. Flatten nested subcollections into separate tables with foreign keys. Normalize duplicate data.',
    migrationStep3: '<strong>3. Import data:</strong> Use the Supabase SQL editor or <code>psql</code> to create tables and import data. Supabase also supports CSV imports through the dashboard.',
    migrationStep4: '<strong>4. Migrate Authentication:</strong> Supabase can import Firebase Auth users. Export your Firebase users with the Admin SDK and use the Supabase Admin API to create them with preserved UIDs.',
    migrationStep5: '<strong>5. Replace Security Rules with RLS:</strong> Convert your Firebase Security Rules to PostgreSQL RLS policies. This usually results in simpler, more maintainable access control.',
    migrationStep6: '<strong>6. Update client code:</strong> Replace Firebase SDK calls with Supabase client calls. The APIs are similar enough that this is usually straightforward.',
    h2_production: 'Production Best Practices',
    h3_supabase_prod: 'Supabase Production Tips',
    supabaseTips: 'Enable RLS on every table — even if you think it is unnecessary|Use database migrations (Supabase CLI) instead of manual schema changes|Set up connection pooling (PgBouncer) for serverless environments|Monitor query performance with pg_stat_statements|Use Edge Functions for webhook handlers and API routes|Enable Point-in-Time Recovery for production databases|Set up database backups and test restore procedures|Use read replicas for read-heavy workloads',
    h3_firebase_prod: 'Firebase Production Tips',
    firebaseTips: 'Always set Security Rules before deploying — default open rules are a security risk|Use composite indexes proactively for complex queries|Monitor Firestore usage carefully to avoid bill spikes|Use batched writes for bulk operations (max 500 per batch)|Enable Firestore bundle generation for frequently-read data|Use Cloud Functions 2nd gen for better performance and longer timeouts|Implement offline persistence only when needed (it increases SDK size)|Use Firebase App Check to prevent API abuse',
    h2_community: 'Community and Ecosystem',
    communityP1: 'Firebase has a larger and more mature ecosystem, with over 8 years of production use. Google Developer Groups, extensive documentation, and thousands of tutorials make it easy to find answers. Supabase has a rapidly growing community, excellent documentation, and an active Discord with over 30,000 members. Supabase\'s open-source nature means the community contributes extensions, tools, and self-hosting guides.',
    h2_faq: 'Frequently Asked Questions',
    faq1Q: 'Is Supabase a drop-in replacement for Firebase?',
    faq1A: 'No. Supabase and Firebase have fundamentally different database architectures (PostgreSQL vs Firestore). While Supabase covers similar features (auth, storage, realtime, functions), the data modeling, query patterns, and security approaches are different. Migration requires redesigning your data model.',
    faq2Q: 'Which is cheaper, Supabase or Firebase?',
    faq2A: 'Supabase is generally cheaper at scale because it charges for compute and storage rather than per-operation. Firebase read-heavy apps can see unexpected costs. However, for small projects within free tiers, both are effectively free. At 100K MAU, Supabase typically costs 40-60% less.',
    faq3Q: 'Can Supabase handle realtime as well as Firebase?',
    faq3A: 'For most web application use cases, yes. Supabase Realtime supports Postgres Changes, Broadcast, and Presence channels. However, Firebase has superior offline synchronization and conflict resolution for mobile apps. If offline-first is critical, Firebase still leads.',
    faq4Q: 'Is Supabase production-ready?',
    faq4A: 'Yes. As of 2026, Supabase has been Generally Available (GA) for over two years. Thousands of companies run production workloads on Supabase, including apps with millions of users. The platform offers 99.9% uptime SLA on Pro plans and above.',
    faq5Q: 'Can I use Firebase and Supabase together?',
    faq5A: 'Technically yes, but it is not recommended. Some teams use Firebase for mobile features (analytics, crashlytics, push notifications) while using Supabase as the primary database and auth provider. This adds complexity and should only be done when specific Firebase services have no Supabase equivalent.',
    faq6Q: 'Which has better TypeScript support?',
    faq6A: 'Supabase has significantly better TypeScript support. The CLI generates types directly from your database schema, giving you end-to-end type safety. Firebase requires manual type definitions for Firestore documents, and the SDK types are less precise for query results.',
    faq7Q: 'Can I self-host Supabase?',
    faq7A: 'Yes. Supabase provides an official Docker Compose setup for self-hosting. You get the full stack: PostgreSQL, Auth, Storage, Realtime, Edge Functions, and Studio dashboard. Many companies self-host Supabase for data sovereignty, compliance, or cost reasons.',
    faq8Q: 'Which should I choose for a new project in 2026?',
    faq8A: 'For web applications (Next.js, SvelteKit, Nuxt), choose Supabase — the SQL power, TypeScript types, and open-source nature make it the stronger default. For mobile-first apps with offline requirements and Google ecosystem integration, choose Firebase. For rapid prototyping where you are unsure of the final architecture, either works — but Supabase gives you more room to grow.',
  },
  zh: {
    title: 'Supabase vs Firebase 2026：开发者权威比较指南',
    intro: '<strong>Supabase</strong> 和 <strong>Firebase</strong> 是 2026 年最流行的两个后端即服务（BaaS）平台，但它们代表着截然不同的理念。Supabase 是基于 PostgreSQL 的开源平台，提供完整的关系型数据库和 SQL 能力；Firebase 是 Google 的专有 NoSQL 平台，针对快速原型开发和移动端应用进行了优化。本指南从数据库架构、认证、存储、实时功能、定价、安全等各个方面进行对比，并附真实代码示例，帮助你做出正确选择。',
    tldr: '<strong>TL;DR:</strong> 需要 SQL、复杂查询、开源、自托管或关系型数据建模，选 <strong>Supabase</strong>。需要快速原型、Google Cloud 深度集成、成熟移动 SDK 或层级化数据的 NoSQL 灵活性，选 <strong>Firebase</strong>。Supabase 在规模化时更便宜（PostgreSQL 定价 vs Firebase 按读写计费），有行级安全（RLS）做细粒度访问控制，且可自托管。Firebase 生态更成熟，离线支持更好，擅长实时移动应用。两者都有慷慨的免费额度。2026 年大多数新 Web 项目建议默认选 Supabase。',
    takeaways_title: '关键要点',
    takeaway1: 'Supabase 使用 PostgreSQL（关系型、SQL），Firebase 使用 Firestore/RTDB（NoSQL、文档型）— 这是最根本的区别。',
    takeaway2: 'Supabase 完全开源（Apache 2.0），可自托管。Firebase 是专有的，锁定在 Google Cloud。',
    takeaway3: 'Firebase 按读/写操作收费，可能导致账单意外飙升。Supabase 按计算资源和存储收费，成本更可预测。',
    takeaway4: 'Supabase 行级安全（RLS）提供数据库级访问控制。Firebase 安全规则是在数据库外部评估的自定义 DSL。',
    takeaway5: 'Firebase 的离线支持和移动 SDK 更出色，是离线优先移动应用的更好选择。',
    takeaway6: 'Supabase 可从数据库 schema 自动生成 TypeScript 类型。Firebase 需要手动类型定义或第三方代码生成工具。',
    h2_philosophy: '理念与架构',
    philosophyP1: 'Supabase 和 Firebase 的核心区别在于<strong>开源关系型 vs 专有 NoSQL</strong>。Supabase 封装了现有的开源工具 — PostgreSQL、GoTrue、PostgREST、Realtime 和 Storage — 提供统一的 API。你拥有自己的数据，可随时迁移或自托管。',
    philosophyP2: 'Firebase 是 Google Cloud 服务的集合（Firestore、Authentication、Cloud Functions、Hosting、Cloud Storage），通过客户端 SDK 呈现。它与 Google Cloud 生态深度集成，提供 Analytics、Crashlytics、Remote Config、ML Kit 等 Supabase 没有的服务。',
    h2_database: '数据库：PostgreSQL vs Firestore',
    dbP1: '这是两个平台差异最大的地方。Supabase 提供完整的 PostgreSQL 数据库，拥有 SQL 的全部能力 — JOIN、聚合、窗口函数、CTE、全文搜索以及 PostGIS 等扩展。Firestore 是面向文档的 NoSQL 数据库，数据以集合和文档的形式存储。',
    dbP2: '以下是在两个平台上建模博客（用户、文章、评论）的方式：',
    h3_supabase_db: 'Supabase：PostgreSQL Schema',
    h3_firebase_db: 'Firebase：Firestore 数据模型',
    dbP3: '<strong>查询能力对比：</strong>PostgreSQL 可以执行 Firestore 中不可能或成本极高的复杂查询。聚合、跨表 JOIN、子查询、窗口函数和递归 CTE 都原生支持。在 Firestore 中，通常需要反规范化数据（在文档间复制）并使用 Cloud Functions 处理基本查询以外的需求。',
    h2_feature: '功能对比表',
    h2_auth: '认证',
    authP1: '两个平台都提供全面的认证方案。Supabase Auth（基于 GoTrue）和 Firebase Auth 都支持邮箱/密码、社交 OAuth、手机验证码和魔术链接。Firebase 还支持匿名认证，与 Google 登录集成更深。',
    h3_supabase_auth: 'Supabase Auth',
    h3_firebase_auth: 'Firebase Auth',
    authP2: 'Firebase Auth 在移动开发方面略有优势，提供预构建的 UI 组件（FirebaseUI）。Supabase Auth 对 Web 应用更友好，直接与行级安全策略集成。',
    h2_storage: '存储对比',
    storageP1: '两个平台都提供带 CDN 的文件存储。Supabase Storage 基于 S3 兼容的对象存储，与 PostgreSQL 直接集成 — 可以对存储桶使用 RLS 策略。Firebase Cloud Storage 底层使用 Google Cloud Storage。',
    h3_supabase_storage: 'Supabase Storage',
    h3_firebase_storage: 'Firebase Cloud Storage',
    h2_realtime: '实时功能',
    realtimeP1: '实时功能是 Firebase 成名之处。Firebase 实时数据库从一开始就为实时数据同步而设计。Supabase Realtime 由 Phoenix（Elixir）驱动，提供三种模式：Postgres Changes（监听数据库变更）、Broadcast（发布/订阅消息）和 Presence（跟踪在线用户）。',
    h3_supabase_realtime: 'Supabase Realtime',
    h3_firebase_realtime: 'Firebase 实时监听器',
    realtimeP2: 'Firebase 的离线持久化为移动应用提供了显著优势 — 数据在本地缓存，设备重新上线时自动同步。Supabase 没有内置离线支持。',
    h2_functions: 'Edge Functions vs Cloud Functions',
    functionsP1: 'Supabase Edge Functions 在 Deno 上运行于边缘节点（低延迟、全球分布）。Firebase Cloud Functions 在 Node.js 上运行于特定区域。Edge Functions 冷启动更快（约 50ms vs Cloud Functions 的 500ms-3s），但内存限制为 150MB。',
    h3_supabase_fn: 'Supabase Edge Function (Deno)',
    h3_firebase_fn: 'Firebase Cloud Function (Node.js)',
    h2_pricing: '定价对比',
    pricingP1: '定价是最大的差异化因素之一，往往是决定性因素。Firebase 按操作（读、写、删除）收费，可能导致不可预测的成本。Supabase 按计算资源和存储收费，成本更可预测。',
    pricingP2: '以下是不同规模下的真实成本对比：',
    h3_free_tier: '免费额度对比',
    h3_10k: '预估成本：10,000 月活用户',
    h3_100k: '预估成本：100,000 月活用户',
    h3_1m: '预估成本：1,000,000 月活用户',
    pricingP3: '<strong>关键洞察：</strong>Firebase 成本可能因读密集型操作而意外飙升。一个 Firestore 监听器在频繁更新的文档上每月可消耗数百万次读取。Supabase 定价更线性、更可预测，因为它基于计算和存储而非操作次数。',
    h2_security: '安全模型：RLS vs 安全规则',
    securityP1: 'Supabase 使用 PostgreSQL 行级安全（RLS）— 用 SQL 编写的策略，在数据库层面强制执行。Firebase 使用安全规则 — 一种类 JSON 的自定义 DSL，在数据库外部的沙箱环境中评估。',
    h3_supabase_rls: 'Supabase 行级安全',
    h3_firebase_rules: 'Firebase 安全规则',
    securityP2: 'RLS 优势：策略是 SQL（熟悉）、在数据库层面强制执行（无法绕过）、可与视图和函数组合。Firebase 规则优势：初学更容易、支持文档路径模式匹配、内置验证。',
    h2_typescript: 'TypeScript 支持',
    tsP1: 'Supabase 在这方面有重大优势。Supabase CLI 可以直接从 PostgreSQL schema 生成 TypeScript 类型（<code>supabase gen types typescript</code>）。每个查询返回正确类型化的结果。Firebase 需要手动类型定义或 Zod 验证等第三方工具。',
    h2_selfhost: '自托管与供应商锁定',
    selfhostP1: 'Supabase 可以使用 Docker Compose 完全自托管。整个技术栈 — PostgreSQL、GoTrue、PostgREST、Realtime、Storage、Studio — 都是开源的。这意味着零供应商锁定：你的数据在标准 PostgreSQL 数据库中，可迁移到任何 PostgreSQL 主机。',
    selfhostP2: 'Firebase 无法自托管。你的数据存在 Google Cloud 中，迁移需要大量工作。Firestore 数据必须导出为 JSON/CSV 并转换为其他数据库格式。Cloud Functions 必须重写。认证提供商必须重新配置。',
    h2_framework: '框架集成',
    frameworkP1: '两个平台都为主流框架提供 SDK，但开发体验有所不同：',
    h2_performance: '性能基准',
    perfP1: '性能因查询模式、数据量和区域配置而异。以下是常见操作的典型基准：',
    h2_when_supabase: '何时选择 Supabase',
    whenSupabase: '需要复杂 SQL 查询（JOIN、聚合、CTE）|需要可自托管的开源技术栈|数据是关系型的（用户、订单、产品间有关联）|需要数据库级访问控制（RLS）|需要自动生成 TypeScript 类型|正在构建 Web 应用（Next.js、SvelteKit、Nuxt）|需要 PostGIS 地理空间查询|需要可预测的按用量定价|需要避免供应商锁定|熟悉 SQL 和关系型建模',
    h2_when_firebase: '何时选择 Firebase',
    whenFirebase: '构建移动优先应用（iOS/Android）|需要离线优先数据同步|需要用最少的后端代码快速原型|深度投入 Google Cloud 生态|需要 Analytics、Crashlytics 或 Remote Config|数据是层级化或文档导向的|需要预构建的认证 UI 组件（FirebaseUI）|需要带 CDN 和预览通道的 Firebase Hosting|需要内置的 A/B 测试和功能标记|团队更熟悉 NoSQL',
    h2_migration: '迁移指南：Firebase 迁移到 Supabase',
    migrationP1: '随着项目增长需要 SQL 能力，从 Firebase 迁移到 Supabase 是常见路径。以下是高层迁移指南：',
    migrationStep1: '<strong>1. 导出 Firestore 数据：</strong>使用 Firebase CLI（<code>firebase firestore:export</code>）或 Admin SDK 将集合导出为 JSON。大数据集可使用 BigQuery 导出功能。',
    migrationStep2: '<strong>2. 设计 PostgreSQL schema：</strong>将文档数据模型转换为关系型 schema。将嵌套子集合展平为带外键的独立表。规范化重复数据。',
    migrationStep3: '<strong>3. 导入数据：</strong>使用 Supabase SQL 编辑器或 <code>psql</code> 创建表并导入数据。Supabase 仪表板也支持 CSV 导入。',
    migrationStep4: '<strong>4. 迁移认证：</strong>Supabase 可导入 Firebase Auth 用户。用 Admin SDK 导出 Firebase 用户，用 Supabase Admin API 创建并保留 UID。',
    migrationStep5: '<strong>5. 用 RLS 替换安全规则：</strong>将 Firebase 安全规则转换为 PostgreSQL RLS 策略。这通常会产生更简单、更易维护的访问控制。',
    migrationStep6: '<strong>6. 更新客户端代码：</strong>将 Firebase SDK 调用替换为 Supabase 客户端调用。API 足够相似，通常很直接。',
    h2_production: '生产环境最佳实践',
    h3_supabase_prod: 'Supabase 生产建议',
    supabaseTips: '在每个表上启用 RLS — 即使你认为没必要|使用数据库迁移（Supabase CLI）而非手动修改 schema|为无服务器环境设置连接池（PgBouncer）|使用 pg_stat_statements 监控查询性能|使用 Edge Functions 处理 webhook 和 API 路由|为生产数据库启用时间点恢复|设置数据库备份并测试恢复流程|对读密集型工作负载使用只读副本',
    h3_firebase_prod: 'Firebase 生产建议',
    firebaseTips: '部署前务必设置安全规则 — 默认开放规则是安全风险|主动为复杂查询创建复合索引|仔细监控 Firestore 用量以避免账单飙升|批量操作使用批量写入（每批最多 500 个）|为频繁读取的数据启用 Firestore bundle 生成|使用 Cloud Functions 2nd gen 获得更好性能|仅在需要时启用离线持久化（会增加 SDK 大小）|使用 Firebase App Check 防止 API 滥用',
    h2_community: '社区与生态',
    communityP1: 'Firebase 拥有更大更成熟的生态，已有 8 年以上的生产使用历史。Supabase 社区增长迅速，文档优秀，Discord 活跃成员超过 30,000。Supabase 的开源特性意味着社区贡献了扩展、工具和自托管指南。',
    h2_faq: '常见问题',
    faq1Q: 'Supabase 是 Firebase 的直接替代品吗？',
    faq1A: '不是。Supabase 和 Firebase 有根本不同的数据库架构（PostgreSQL vs Firestore）。虽然 Supabase 覆盖了类似功能（认证、存储、实时、函数），但数据建模、查询模式和安全方法不同。迁移需要重新设计数据模型。',
    faq2Q: '哪个更便宜，Supabase 还是 Firebase？',
    faq2A: 'Supabase 在规模化时通常更便宜，因为它按计算和存储收费而非按操作。Firebase 读密集型应用可能出现意外成本。在 100K 月活时，Supabase 通常便宜 40-60%。',
    faq3Q: 'Supabase 的实时功能能和 Firebase 一样好吗？',
    faq3A: '对于大多数 Web 应用场景，是的。但 Firebase 在移动应用的离线同步和冲突解决方面仍然领先。',
    faq4Q: 'Supabase 适合生产环境吗？',
    faq4A: '是的。截至 2026 年，Supabase 已正式发布（GA）超过两年。数千家公司在 Supabase 上运行生产负载。Pro 计划及以上提供 99.9% 正常运行时间 SLA。',
    faq5Q: '可以同时使用 Firebase 和 Supabase 吗？',
    faq5A: '技术上可以，但不推荐。某些团队用 Firebase 做移动特性（分析、崩溃报告、推送通知），同时用 Supabase 做主数据库和认证。',
    faq6Q: '哪个的 TypeScript 支持更好？',
    faq6A: 'Supabase 的 TypeScript 支持明显更好。CLI 直接从数据库 schema 生成类型，提供端到端类型安全。',
    faq7Q: '可以自托管 Supabase 吗？',
    faq7A: '可以。Supabase 提供官方 Docker Compose 自托管方案。你可以获得完整技术栈：PostgreSQL、Auth、Storage、Realtime、Edge Functions 和 Studio 仪表板。',
    faq8Q: '2026 年新项目应该选哪个？',
    faq8A: 'Web 应用（Next.js、SvelteKit、Nuxt）选 Supabase。有离线需求的移动优先应用和 Google 生态集成选 Firebase。快速原型两者都行，但 Supabase 有更大的成长空间。',
  },
};

export default function SupabaseVsFirebaseGuide({ lang }: { lang: string }) {
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
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Intro */}
      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }} dangerouslySetInnerHTML={{ __html: t.intro }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ margin: 0, lineHeight: '1.7', color: '#0c4a6e' }} dangerouslySetInnerHTML={{ __html: t.tldr }} />
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b' }}>{t.takeaways_title}</h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#334155' }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Philosophy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_philosophy}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: t.philosophyP1 }} />
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: t.philosophyP2 }} />

      {/* Database */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_database}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: t.dbP1 }} />
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.dbP2}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_db}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'-- Supabase: Relational schema with SQL\n' +
'CREATE TABLE users (\n' +
'  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n' +
'  email TEXT UNIQUE NOT NULL,\n' +
'  display_name TEXT,\n' +
'  avatar_url TEXT,\n' +
'  created_at TIMESTAMPTZ DEFAULT now()\n' +
');\n\n' +
'CREATE TABLE posts (\n' +
'  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n' +
'  author_id UUID REFERENCES users(id) ON DELETE CASCADE,\n' +
'  title TEXT NOT NULL,\n' +
'  content TEXT,\n' +
'  published BOOLEAN DEFAULT false,\n' +
'  created_at TIMESTAMPTZ DEFAULT now()\n' +
');\n\n' +
'CREATE TABLE comments (\n' +
'  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n' +
'  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,\n' +
'  author_id UUID REFERENCES users(id) ON DELETE CASCADE,\n' +
'  body TEXT NOT NULL,\n' +
'  created_at TIMESTAMPTZ DEFAULT now()\n' +
');\n\n' +
'-- Complex query: Top 5 authors by comment count\n' +
'SELECT u.display_name, COUNT(c.id) AS comment_count\n' +
'FROM users u\n' +
'JOIN posts p ON p.author_id = u.id\n' +
'JOIN comments c ON c.post_id = p.id\n' +
'WHERE p.published = true\n' +
'GROUP BY u.id\n' +
'ORDER BY comment_count DESC\n' +
'LIMIT 5;'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_db}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// Firebase: Document-based NoSQL structure\n' +
'// Collection: users/{userId}\n' +
'{\n' +
'  "email": "alice@example.com",\n' +
'  "displayName": "Alice",\n' +
'  "avatarUrl": "https://...",\n' +
'  "createdAt": "2026-01-15T10:30:00Z"\n' +
'}\n\n' +
'// Collection: posts/{postId}\n' +
'{\n' +
'  "authorId": "user_abc123",\n' +
'  "authorName": "Alice",  // Denormalized!\n' +
'  "title": "My First Post",\n' +
'  "content": "Hello world...",\n' +
'  "published": true,\n' +
'  "commentCount": 42,     // Denormalized counter!\n' +
'  "createdAt": "2026-01-20T14:00:00Z"\n' +
'}\n\n' +
'// Subcollection: posts/{postId}/comments/{commentId}\n' +
'{\n' +
'  "authorId": "user_xyz789",\n' +
'  "authorName": "Bob",    // Denormalized!\n' +
'  "body": "Great post!",\n' +
'  "createdAt": "2026-01-20T15:30:00Z"\n' +
'}\n\n' +
'// Note: "Top 5 authors by comments" requires\n' +
'// a Cloud Function to aggregate across collections'
      }</code></pre>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: t.dbP3 }} />

      {/* Feature Comparison Table */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_feature}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Database', 'PostgreSQL (relational, SQL)', 'Firestore (NoSQL) + RTDB'],
              ['Auth', 'GoTrue (email, OAuth, phone, MFA)', 'Firebase Auth (email, OAuth, phone, anonymous)'],
              ['Storage', 'S3-compatible, RLS policies', 'Google Cloud Storage, Security Rules'],
              ['Realtime', 'Postgres Changes, Broadcast, Presence', 'Firestore listeners, RTDB'],
              ['Functions', 'Edge Functions (Deno, global)', 'Cloud Functions (Node.js, regional)'],
              ['Hosting', 'No built-in (use Vercel/Netlify)', 'Firebase Hosting (CDN, previews)'],
              ['Offline support', 'No built-in', 'Excellent (Firestore persistence)'],
              ['TypeScript types', 'Auto-generated from schema', 'Manual definitions'],
              ['Self-hosting', 'Yes (Docker Compose)', 'No'],
              ['Open source', 'Yes (Apache 2.0)', 'No (proprietary)'],
              ['Admin dashboard', 'Supabase Studio', 'Firebase Console'],
              ['Analytics', 'Via PostHog/Plausible', 'Firebase Analytics (built-in)'],
              ['ML/AI', 'pgvector extension', 'ML Kit, Vertex AI integration'],
              ['Push notifications', 'Via third-party', 'Firebase Cloud Messaging'],
            ].map(([feat, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem', fontWeight: 500 }}>{feat}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Authentication */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_auth}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.authP1}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_auth}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'import { createClient } from \'@supabase/supabase-js\';\n\n' +
'const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);\n\n' +
'// Email/password sign up\n' +
'const { data, error } = await supabase.auth.signUp({\n' +
'  email: \'user@example.com\',\n' +
'  password: \'secure-password-123\',\n' +
'});\n\n' +
'// OAuth (Google, GitHub, Discord, etc.)\n' +
'const { data, error } = await supabase.auth.signInWithOAuth({\n' +
'  provider: \'google\',\n' +
'  options: { redirectTo: \'https://myapp.com/callback\' },\n' +
'});\n\n' +
'// Phone OTP\n' +
'const { data, error } = await supabase.auth.signInWithOtp({\n' +
'  phone: \'+1234567890\',\n' +
'});\n\n' +
'// Get current user\n' +
'const { data: { user } } = await supabase.auth.getUser();\n\n' +
'// Listen to auth state changes\n' +
'supabase.auth.onAuthStateChange((event, session) => {\n' +
'  console.log(event, session);\n' +
'});'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_auth}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'import { getAuth, createUserWithEmailAndPassword,\n' +
'  signInWithPopup, GoogleAuthProvider,\n' +
'  RecaptchaVerifier, signInWithPhoneNumber,\n' +
'  onAuthStateChanged } from \'firebase/auth\';\n\n' +
'const auth = getAuth();\n\n' +
'// Email/password sign up\n' +
'const userCredential = await createUserWithEmailAndPassword(\n' +
'  auth, \'user@example.com\', \'secure-password-123\'\n' +
');\n\n' +
'// OAuth (Google)\n' +
'const provider = new GoogleAuthProvider();\n' +
'const result = await signInWithPopup(auth, provider);\n\n' +
'// Phone auth\n' +
'const recaptcha = new RecaptchaVerifier(auth, \'recaptcha\', {});\n' +
'const confirmation = await signInWithPhoneNumber(\n' +
'  auth, \'+1234567890\', recaptcha\n' +
');\n' +
'await confirmation.confirm(\'123456\'); // OTP code\n\n' +
'// Listen to auth state changes\n' +
'onAuthStateChanged(auth, (user) => {\n' +
'  if (user) console.log(\'Signed in:\', user.uid);\n' +
'  else console.log(\'Signed out\');\n' +
'});'
      }</code></pre>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.authP2}</p>

      {/* Storage */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_storage}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.storageP1}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_storage}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// Upload a file\n' +
'const { data, error } = await supabase.storage\n' +
'  .from(\'avatars\')\n' +
'  .upload(\'user-123/profile.png\', file, {\n' +
'    cacheControl: \'3600\',\n' +
'    upsert: true,\n' +
'  });\n\n' +
'// Get public URL\n' +
'const { data: { publicUrl } } = supabase.storage\n' +
'  .from(\'avatars\')\n' +
'  .getPublicUrl(\'user-123/profile.png\');\n\n' +
'// Generate signed URL (time-limited access)\n' +
'const { data: { signedUrl } } = await supabase.storage\n' +
'  .from(\'private-docs\')\n' +
'  .createSignedUrl(\'report.pdf\', 3600);\n\n' +
'// Image transformation on the fly\n' +
'const { data: { publicUrl: thumb } } = supabase.storage\n' +
'  .from(\'avatars\')\n' +
'  .getPublicUrl(\'user-123/profile.png\', {\n' +
'    transform: { width: 200, height: 200, resize: \'cover\' },\n' +
'  });'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_storage}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'import { getStorage, ref, uploadBytes,\n' +
'  getDownloadURL } from \'firebase/storage\';\n\n' +
'const storage = getStorage();\n\n' +
'// Upload a file\n' +
'const storageRef = ref(storage, \'avatars/user-123/profile.png\');\n' +
'const snapshot = await uploadBytes(storageRef, file, {\n' +
'  contentType: \'image/png\',\n' +
'  customMetadata: { uploadedBy: \'user-123\' },\n' +
'});\n\n' +
'// Get download URL\n' +
'const downloadUrl = await getDownloadURL(storageRef);\n\n' +
'// Upload with progress tracking\n' +
'const uploadTask = uploadBytesResumable(storageRef, file);\n' +
'uploadTask.on(\'state_changed\',\n' +
'  (snapshot) => {\n' +
'    const progress = (snapshot.bytesTransferred /\n' +
'      snapshot.totalBytes) * 100;\n' +
'    console.log(\'Upload: \' + progress + \'%\');\n' +
'  },\n' +
'  (error) => console.error(error),\n' +
'  () => getDownloadURL(uploadTask.snapshot.ref)\n' +
');'
      }</code></pre>

      {/* Realtime */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_realtime}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.realtimeP1}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_realtime}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// 1. Postgres Changes: Listen to database changes\n' +
'const channel = supabase\n' +
'  .channel(\'posts-changes\')\n' +
'  .on(\'postgres_changes\',\n' +
'    { event: \'*\', schema: \'public\', table: \'posts\' },\n' +
'    (payload) => {\n' +
'      console.log(\'Change:\', payload.eventType, payload.new);\n' +
'    }\n' +
'  )\n' +
'  .subscribe();\n\n' +
'// 2. Broadcast: Pub/sub for ephemeral messages\n' +
'const room = supabase.channel(\'room-1\');\n' +
'room.on(\'broadcast\', { event: \'cursor\' }, (payload) => {\n' +
'  updateCursorPosition(payload.x, payload.y);\n' +
'});\n' +
'room.subscribe();\n' +
'room.send({ type: \'broadcast\', event: \'cursor\',\n' +
'  payload: { x: 100, y: 200 } });\n\n' +
'// 3. Presence: Track online users\n' +
'const presence = supabase.channel(\'online-users\');\n' +
'presence.on(\'presence\', { event: \'sync\' }, () => {\n' +
'  const state = presence.presenceState();\n' +
'  console.log(\'Online:\', Object.keys(state).length);\n' +
'});\n' +
'presence.subscribe(async (status) => {\n' +
'  if (status === \'SUBSCRIBED\') {\n' +
'    await presence.track({ user_id: \'abc\', name: \'Alice\' });\n' +
'  }\n' +
'});'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_realtime}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'import { getFirestore, collection, query, where,\n' +
'  onSnapshot, orderBy, limit } from \'firebase/firestore\';\n\n' +
'const db = getFirestore();\n\n' +
'// Listen to a single document\n' +
'const unsub = onSnapshot(doc(db, \'posts\', \'post-1\'),\n' +
'  (doc) => {\n' +
'    console.log(\'Current data:\', doc.data());\n' +
'  }\n' +
');\n\n' +
'// Listen to a filtered query\n' +
'const q = query(\n' +
'  collection(db, \'posts\'),\n' +
'  where(\'published\', \'==\', true),\n' +
'  orderBy(\'createdAt\', \'desc\'),\n' +
'  limit(20)\n' +
');\n\n' +
'const unsubscribe = onSnapshot(q, (snapshot) => {\n' +
'  snapshot.docChanges().forEach((change) => {\n' +
'    if (change.type === \'added\') {\n' +
'      console.log(\'New post:\', change.doc.data());\n' +
'    }\n' +
'    if (change.type === \'modified\') {\n' +
'      console.log(\'Updated:\', change.doc.data());\n' +
'    }\n' +
'    if (change.type === \'removed\') {\n' +
'      console.log(\'Removed:\', change.doc.id);\n' +
'    }\n' +
'  });\n' +
'});\n\n' +
'// Firebase also supports offline persistence\n' +
'// Data is cached locally and synced when online\n' +
'// enableIndexedDbPersistence(db); // Firestore\n' +
'// enableNetwork(db) / disableNetwork(db)'
      }</code></pre>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.realtimeP2}</p>

      {/* Edge Functions vs Cloud Functions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_functions}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.functionsP1}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_fn}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// supabase/functions/send-welcome-email/index.ts\n' +
'import { serve } from \'https://deno.land/std@0.177.0/http/server.ts\';\n' +
'import { createClient } from \'https://esm.sh/@supabase/supabase-js@2\';\n\n' +
'serve(async (req) => {\n' +
'  const { email, name } = await req.json();\n\n' +
'  // Access Supabase with service role key\n' +
'  const supabase = createClient(\n' +
'    Deno.env.get(\'SUPABASE_URL\')!,\n' +
'    Deno.env.get(\'SUPABASE_SERVICE_ROLE_KEY\')!\n' +
'  );\n\n' +
'  // Send email via Resend\n' +
'  const res = await fetch(\'https://api.resend.com/emails\', {\n' +
'    method: \'POST\',\n' +
'    headers: {\n' +
'      \'Authorization\': \'Bearer \' + Deno.env.get(\'RESEND_API_KEY\'),\n' +
'      \'Content-Type\': \'application/json\',\n' +
'    },\n' +
'    body: JSON.stringify({\n' +
'      from: \'hello@myapp.com\',\n' +
'      to: email,\n' +
'      subject: \'Welcome, \' + name + \'!\',\n' +
'      html: \'<h1>Welcome to our app!</h1>\',\n' +
'    }),\n' +
'  });\n\n' +
'  return new Response(JSON.stringify({ sent: true }),\n' +
'    { headers: { \'Content-Type\': \'application/json\' } });\n' +
'});\n\n' +
'// Deploy: supabase functions deploy send-welcome-email\n' +
'// Cold start: ~50ms | Max memory: 150MB'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_fn}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// functions/src/index.ts\n' +
'import { onCall, HttpsError } from \'firebase-functions/v2/https\';\n' +
'import { onDocumentCreated } from\n' +
'  \'firebase-functions/v2/firestore\';\n' +
'import * as admin from \'firebase-admin\';\n\n' +
'admin.initializeApp();\n\n' +
'// Callable function\n' +
'export const sendWelcomeEmail = onCall(async (request) => {\n' +
'  if (!request.auth) {\n' +
'    throw new HttpsError(\'unauthenticated\', \'Login required\');\n' +
'  }\n\n' +
'  const { email, name } = request.data;\n' +
'  // Send email with your preferred service\n' +
'  await sendEmail(email, name);\n' +
'  return { sent: true };\n' +
'});\n\n' +
'// Firestore trigger: runs when a new user doc is created\n' +
'export const onUserCreated = onDocumentCreated(\n' +
'  \'users/{userId}\',\n' +
'  async (event) => {\n' +
'    const userData = event.data?.data();\n' +
'    await admin.messaging().send({\n' +
'      topic: \'new-users\',\n' +
'      notification: {\n' +
'        title: \'New user joined!\',\n' +
'        body: userData?.displayName + \' signed up\',\n' +
'      },\n' +
'    });\n' +
'  }\n' +
');\n\n' +
'// Deploy: firebase deploy --only functions\n' +
'// Cold start: ~500ms-3s | Max memory: 8GB'
      }</code></pre>

      {/* Pricing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_pricing}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.pricingP1}</p>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.pricingP2}</p>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>{t.h3_free_tier}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Resource</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase Free</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase Free (Spark)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Database', '500 MB PostgreSQL', '1 GB Firestore storage'],
              ['Auth', 'Unlimited MAU', '50K MAU (phone: 10K/mo)'],
              ['Storage', '1 GB', '5 GB'],
              ['Realtime', '200 concurrent connections', '100 simultaneous RTDB connections'],
              ['Functions', '500K invocations/mo', '2M invocations/mo'],
              ['Bandwidth', '5 GB', '10 GB/mo (Hosting)'],
              ['Firestore reads', 'N/A (SQL queries)', '50K reads/day'],
              ['Firestore writes', 'N/A', '20K writes/day'],
            ].map(([res, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{res}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>{t.h3_10k}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Component</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase Pro</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase Blaze</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Base plan', '$25/mo', '$0 (pay-as-you-go)'],
              ['Database/Reads', 'Included (8 GB DB)', '~$15/mo (30M reads)'],
              ['Auth', 'Included', '~$5/mo (phone OTP)'],
              ['Storage', 'Included (100 GB)', '~$3/mo (20 GB)'],
              ['Functions', 'Included (2M)', '~$2/mo (1M invocations)'],
              ['Estimated total', '$25-35/mo', '$25-45/mo'],
            ].map(([comp, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{comp}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>{t.h3_100k}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Component</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase Pro</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase Blaze</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Base plan', '$25/mo', '$0 (pay-as-you-go)'],
              ['Database/Reads', '+$50 (compute addon)', '~$180/mo (300M reads)'],
              ['Auth', 'Included', '~$25/mo (phone + email)'],
              ['Storage', '+$20 (500 GB)', '~$15/mo (100 GB)'],
              ['Functions', '+$10 (10M invocations)', '~$20/mo (5M invocations)'],
              ['Estimated total', '$105-150/mo', '$240-400/mo'],
            ].map(([comp, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{comp}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem' }}>{t.h3_1m}</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Component</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase Team</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase Blaze</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Base plan', '$599/mo', '$0 (pay-as-you-go)'],
              ['Database/Reads', 'Included (large compute)', '~$1,800/mo (3B reads)'],
              ['Auth', 'Included', '~$250/mo'],
              ['Storage', 'Included (2 TB)', '~$80/mo (500 GB)'],
              ['Functions', 'Included (50M)', '~$150/mo (50M invocations)'],
              ['Estimated total', '$599-900/mo', '$2,280-3,500/mo'],
            ].map(([comp, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{comp}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7', marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: t.pricingP3 }} />

      {/* Security */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_security}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.securityP1}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_rls}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'-- Enable RLS on the posts table\n' +
'ALTER TABLE posts ENABLE ROW LEVEL SECURITY;\n\n' +
'-- Anyone can read published posts\n' +
'CREATE POLICY "Public posts are viewable"\n' +
'  ON posts FOR SELECT\n' +
'  USING (published = true);\n\n' +
'-- Users can only insert their own posts\n' +
'CREATE POLICY "Users can create own posts"\n' +
'  ON posts FOR INSERT\n' +
'  WITH CHECK (auth.uid() = author_id);\n\n' +
'-- Users can only update/delete their own posts\n' +
'CREATE POLICY "Users can update own posts"\n' +
'  ON posts FOR UPDATE\n' +
'  USING (auth.uid() = author_id);\n\n' +
'CREATE POLICY "Users can delete own posts"\n' +
'  ON posts FOR DELETE\n' +
'  USING (auth.uid() = author_id);\n\n' +
'-- Admin role can do everything\n' +
'CREATE POLICY "Admins have full access"\n' +
'  ON posts FOR ALL\n' +
'  USING (EXISTS (\n' +
'    SELECT 1 FROM user_roles\n' +
'    WHERE user_id = auth.uid() AND role = \'admin\'\n' +
'  ));'
      }</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_rules}</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// firestore.rules\n' +
'rules_version = \'2\';\n' +
'service cloud.firestore {\n' +
'  match /databases/{database}/documents {\n\n' +
'    // Posts collection\n' +
'    match /posts/{postId} {\n' +
'      // Anyone can read published posts\n' +
'      allow read: if resource.data.published == true;\n\n' +
'      // Authenticated users can create posts\n' +
'      allow create: if request.auth != null\n' +
'        && request.resource.data.authorId\n' +
'           == request.auth.uid;\n\n' +
'      // Only the author can update/delete\n' +
'      allow update, delete: if request.auth != null\n' +
'        && resource.data.authorId\n' +
'           == request.auth.uid;\n\n' +
'      // Comments subcollection\n' +
'      match /comments/{commentId} {\n' +
'        allow read: if true;\n' +
'        allow create: if request.auth != null;\n' +
'        allow update, delete:\n' +
'          if request.auth.uid\n' +
'             == resource.data.authorId;\n' +
'      }\n' +
'    }\n\n' +
'    // Admin override using custom claims\n' +
'    match /{document=**} {\n' +
'      allow read, write:\n' +
'        if request.auth.token.admin == true;\n' +
'    }\n' +
'  }\n' +
'}'
      }</code></pre>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.securityP2}</p>

      {/* TypeScript */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_typescript}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: t.tsP1 }} />
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'// Supabase: Auto-generated types\n' +
'// Run: supabase gen types typescript --local > types/supabase.ts\n\n' +
'import { createClient } from \'@supabase/supabase-js\';\n' +
'import type { Database } from \'./types/supabase\';\n\n' +
'const supabase = createClient<Database>(URL, KEY);\n\n' +
'// Fully typed! IDE knows the shape of every table\n' +
'const { data: posts } = await supabase\n' +
'  .from(\'posts\')         // autocomplete table names\n' +
'  .select(\'id, title, users(display_name)\') // typed joins\n' +
'  .eq(\'published\', true); // typed filter values\n\n' +
'// posts is typed as:\n' +
'// { id: string; title: string;\n' +
'//   users: { display_name: string } | null }[]\n\n' +
'// ---- Firebase: Manual types ----\n' +
'// You must define interfaces yourself\n' +
'interface Post {\n' +
'  authorId: string;\n' +
'  title: string;\n' +
'  content: string;\n' +
'  published: boolean;\n' +
'  createdAt: Timestamp;\n' +
'}\n\n' +
'// Type assertion required on every query\n' +
'const snapshot = await getDocs(\n' +
'  collection(db, \'posts\') as CollectionReference<Post>\n' +
');\n' +
'const posts = snapshot.docs.map(doc => doc.data());'
      }</code></pre>

      {/* Self-hosting */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_selfhost}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.selfhostP1}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{
'# Self-host Supabase with Docker Compose\n' +
'git clone https://github.com/supabase/supabase\n' +
'cd supabase/docker\n' +
'cp .env.example .env\n' +
'# Edit .env: POSTGRES_PASSWORD, JWT_SECRET, SITE_URL, SMTP\n\n' +
'docker compose up -d\n\n' +
'# Services: PostgreSQL (:5432), PostgREST (:3000),\n' +
'# GoTrue Auth (:9999), Realtime (:4000), Storage (:5000),\n' +
'# Studio (:3000), Kong API Gateway (:8000)'
      }</code></pre>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.selfhostP2}</p>

      {/* Framework Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_framework}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.frameworkP1}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Framework</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Next.js', '@supabase/ssr (SSR-ready, cookie auth)', 'firebase/app + manual SSR setup'],
              ['React', '@supabase/supabase-js', 'firebase/app + reactfire'],
              ['React Native', '@supabase/supabase-js (works directly)', 'react-native-firebase (excellent)'],
              ['Flutter', 'supabase_flutter (official)', 'FlutterFire (official, very mature)'],
              ['SvelteKit', '@supabase/ssr', 'firebase/app (manual setup)'],
              ['Vue / Nuxt', '@supabase/supabase-js', 'vuefire / nuxt-vuefire'],
              ['Swift (iOS)', 'supabase-swift (official)', 'Firebase iOS SDK (very mature)'],
              ['Kotlin (Android)', 'supabase-kt (community)', 'Firebase Android SDK (best-in-class)'],
            ].map(([fw, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fw}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_performance}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.perfP1}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Operation</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Supabase</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Firebase</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Simple read (by ID)', '~5-15ms', '~10-30ms'],
              ['Filtered query (indexed)', '~10-30ms', '~15-50ms'],
              ['Complex JOIN query', '~20-80ms', 'N/A (requires denormalization)'],
              ['Write (single row/doc)', '~10-20ms', '~20-50ms'],
              ['Batch write (100 items)', '~30-60ms (single transaction)', '~100-300ms (batched writes)'],
              ['Full-text search', '~15-40ms (pg_trgm/tsvector)', 'N/A (use Algolia/Typesense)'],
              ['Edge Function cold start', '~50ms', 'N/A'],
              ['Cloud Function cold start', 'N/A', '~500ms-3s'],
              ['Realtime message delivery', '~50-100ms', '~20-80ms'],
              ['Auth token verification', '~2-5ms (JWT local)', '~5-15ms (token verification)'],
            ].map(([op, supa, fire], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{op}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{supa}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{fire}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Choose Supabase */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_when_supabase}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#34d399' }}>{t.h2_when_supabase}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.whenSupabase.split('|').map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ backgroundColor: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#fbbf24' }}>{t.h2_when_firebase}</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
            {t.whenFirebase.split('|').map((item, i) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Migration Guide */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_migration}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.migrationP1}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[t.migrationStep1, t.migrationStep2, t.migrationStep3, t.migrationStep4, t.migrationStep5, t.migrationStep6].map((step, i) => (
          <div key={i} style={{ backgroundColor: 'rgba(55,65,81,0.3)', padding: '0.75rem 1rem', borderRadius: '0.5rem', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: step }} />
        ))}
      </div>

      {/* Production Best Practices */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_production}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_supabase_prod}</h3>
      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
        {t.supabaseTips.split('|').map((tip, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{tip}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3_firebase_prod}</h3>
      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
        {t.firebaseTips.split('|').map((tip, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{tip}</li>
        ))}
      </ul>

      {/* Community */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_community}</h2>
      <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>{t.communityP1}</p>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2_faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
          [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
