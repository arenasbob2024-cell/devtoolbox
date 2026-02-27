'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Advanced GraphQL Guide: Schema Design, Resolvers, Subscriptions, Federation & Performance',
    subtitle: 'A comprehensive deep-dive into production-ready GraphQL architecture, from schema patterns to federation and caching strategies.',
    tldr: 'GraphQL empowers teams to build flexible, efficient APIs. This guide covers schema-first vs code-first design, custom scalars, directives, resolver patterns (including DataLoader for N+1), subscriptions via WebSocket and SSE, Apollo Federation, authentication, error handling, caching with persisted queries, pagination strategies, file uploads, testing, monitoring, and a full GraphQL vs REST comparison.',
    takeaway1: 'Schema-first design promotes collaboration; code-first offers type safety and colocation of logic.',
    takeaway2: 'DataLoader is essential to solve the N+1 query problem in resolvers.',
    takeaway3: 'Apollo Federation enables scalable microservice-based GraphQL architectures.',
    takeaway4: 'Persisted queries and APQ dramatically reduce payload size and improve caching.',
    takeaway5: 'Cursor-based pagination outperforms offset-based for large, real-time datasets.',
    takeaway6: 'Subscriptions via WebSocket are ideal for real-time features like chat and notifications.',
    introTitle: 'Why Advanced GraphQL Matters',
    introP1: 'GraphQL has evolved far beyond simple query-response patterns. Modern production systems demand schema governance, federation across teams, real-time data via subscriptions, and sophisticated caching. This guide takes you through every critical topic.',
    introP2: 'Whether you are scaling a monolith into microservices, optimizing resolver performance, or implementing real-time features, this guide provides actionable patterns and code examples.',
    schemaTitle: '1. Schema Design: Schema-First vs Code-First',
    schemaP1: 'The schema-first approach defines your API contract in SDL (Schema Definition Language) files before writing any resolver logic. Teams can review, version, and collaborate on the schema independently of implementation.',
    schemaP2: 'The code-first approach generates the schema from your code using libraries like Nexus (TypeScript) or Strawberry (Python). This provides strong type safety, IDE autocompletion, and colocation of schema and logic.',
    schemaP3: 'Choosing between them depends on team size, workflow preferences, and tooling. Schema-first is popular in larger organizations with dedicated API design teams. Code-first is preferred by smaller teams that value rapid iteration.',
    scalarsTitle: '2. Custom Scalars & Directives',
    scalarsP1: 'Custom scalars like DateTime, JSON, URL, and EmailAddress let you enforce domain-specific validation at the schema level. Libraries like graphql-scalars provide dozens of production-ready scalars.',
    scalarsP2: 'Directives are schema annotations that modify execution behavior. Built-in directives include @deprecated and @skip. Custom directives enable powerful patterns like @auth, @cacheControl, and @rateLimit.',
    resolversTitle: '3. Resolver Patterns & the N+1 Problem',
    resolversP1: 'Resolvers are functions that populate each field in your schema. A naive implementation can trigger the N+1 problem: fetching a list of N items, then making N additional database calls for related data.',
    resolversP2: 'DataLoader solves this by batching and caching database calls within a single request. It collects all keys requested during a tick of the event loop, then makes a single batched query.',
    resolversP3: 'Best practices include creating a new DataLoader instance per request (to avoid cross-request caching), using the dataloader npm package, and structuring resolvers to be thin wrappers around service/data layers.',
    subscriptionsTitle: '4. Subscriptions: WebSocket & SSE',
    subscriptionsP1: 'GraphQL subscriptions enable real-time data delivery. The most common transport is WebSocket using the graphql-ws protocol (replacing the legacy subscriptions-transport-ws).',
    subscriptionsP2: 'Server-Sent Events (SSE) provide a simpler alternative for unidirectional real-time data. SSE works over standard HTTP, making it easier to deploy behind load balancers and proxies.',
    subscriptionsP3: 'Use subscriptions for chat applications, live notifications, real-time dashboards, collaborative editing, and any feature requiring push-based updates.',
    federationTitle: '5. Apollo Federation & Schema Stitching',
    federationP1: 'Apollo Federation allows multiple GraphQL services (subgraphs) to compose into a single unified supergraph. Each team owns its subgraph independently, and the Apollo Router merges them at runtime.',
    federationP2: 'Key Federation concepts include @key (entity identification), @external (referencing fields from other subgraphs), @requires (computed fields), and @provides (optimization hints).',
    federationP3: 'Schema stitching is an older alternative that merges schemas at the gateway level. While still used, Federation is now the recommended approach for most distributed GraphQL architectures.',
    authTitle: '6. Authentication & Authorization',
    authP1: 'Authentication identifies the user (typically via JWT or session tokens in HTTP headers). The token is parsed in middleware and attached to the GraphQL context object.',
    authP2: 'Authorization determines what the authenticated user can access. Common patterns include directive-based auth (@auth(role: ADMIN)), middleware resolvers, and schema-level field permissions.',
    authP3: 'For fine-grained access control, consider libraries like graphql-shield which let you define permission rules as a separate layer, keeping resolvers clean.',
    errorsTitle: '7. Error Handling',
    errorsP1: 'GraphQL returns errors in a structured errors array alongside partial data. This is fundamentally different from REST, where HTTP status codes convey error types.',
    errorsP2: 'Best practices include using custom error codes (UNAUTHENTICATED, FORBIDDEN, VALIDATION_ERROR), extending the errors array with an extensions field, and never leaking internal stack traces in production.',
    cachingTitle: '8. Caching Strategies',
    cachingP1: 'Client-side caching in Apollo Client uses a normalized in-memory cache keyed by __typename and id. This enables automatic cache updates after mutations.',
    cachingP2: 'Persisted queries store the full query string on the server and send only a hash from the client. This reduces payload size, prevents arbitrary query execution, and enables CDN caching.',
    cachingP3: 'Automatic Persisted Queries (APQ) negotiate between client and server: the client sends a hash first, and only sends the full query if the server has not seen it before.',
    paginationTitle: '9. Pagination: Cursor vs Offset',
    paginationP1: 'Offset-based pagination (LIMIT/OFFSET) is simple but has performance issues with large datasets and can produce duplicates when data changes between pages.',
    paginationP2: 'Cursor-based pagination uses an opaque cursor (typically a base64-encoded ID or timestamp) to mark the position. The Relay Connection specification defines a standard edges/node/pageInfo pattern.',
    paginationP3: 'Use cursor-based pagination for production APIs with large or frequently changing datasets. Reserve offset-based pagination for admin dashboards or small, static lists.',
    uploadsTitle: '10. File Uploads in GraphQL',
    uploadsP1: 'The graphql-multipart-request-spec defines how to send files via GraphQL using multipart/form-data. Libraries like graphql-upload handle the server-side parsing.',
    uploadsP2: 'An alternative approach is to use presigned URLs: the client requests an upload URL via a GraphQL mutation, uploads directly to cloud storage (S3, GCS), and then sends the file reference back via another mutation.',
    testingTitle: '11. Testing GraphQL APIs',
    testingP1: 'Unit test resolvers by mocking the context and data sources. Integration test the full GraphQL server using supertest or apollo-server-testing.',
    testingP2: 'Schema validation tests ensure your schema does not have breaking changes. Tools like graphql-inspector and Apollo Studio provide automated schema diffing and compatibility checks.',
    monitoringTitle: '12. Monitoring & Tracing',
    monitoringP1: 'Apollo Studio provides operation-level metrics including latency percentiles, error rates, and field-level usage analytics. This helps identify slow resolvers and unused fields.',
    monitoringP2: 'OpenTelemetry integration enables distributed tracing across your GraphQL gateway and downstream services. Each resolver execution becomes a span in the trace.',
    comparisonTitle: '13. GraphQL vs REST: Comprehensive Comparison',
    comparisonP1: 'The following table compares GraphQL and REST across key dimensions to help you choose the right approach for your use case.',
    faq1Q: 'What is the N+1 problem in GraphQL?',
    faq1A: 'The N+1 problem occurs when a query for N items triggers N additional database calls for related data. DataLoader solves this by batching all related queries into a single database call per tick of the event loop.',
    faq2Q: 'Should I use schema-first or code-first GraphQL?',
    faq2A: 'Schema-first is ideal for large teams that need a contract-driven workflow. Code-first works well for smaller teams that want type safety and colocation of schema with business logic.',
    faq3Q: 'How do subscriptions work in GraphQL?',
    faq3A: 'Subscriptions use a persistent connection (typically WebSocket) to push real-time updates from the server to the client whenever the subscribed data changes.',
    faq4Q: 'What is Apollo Federation?',
    faq4A: 'Apollo Federation is an architecture for composing multiple GraphQL services (subgraphs) into a single unified API (supergraph). Each team owns its subgraph, and the Apollo Router merges them.',
    faq5Q: 'How do I handle authentication in GraphQL?',
    faq5A: 'Parse the authentication token (JWT or session) in middleware, attach the user to the context object, and use directive-based or middleware-based authorization to protect fields and operations.',
    faq6Q: 'What are persisted queries?',
    faq6A: 'Persisted queries store the full query string on the server and send only a hash from the client. This reduces bandwidth, prevents arbitrary queries, and enables CDN-level caching.',
    faq7Q: 'Should I use cursor or offset pagination in GraphQL?',
    faq7A: 'Cursor-based pagination is recommended for large, real-time datasets. Offset-based is simpler but suffers from performance degradation and duplicate issues with changing data.',
    faq8Q: 'How do I test a GraphQL API?',
    faq8A: 'Unit test resolvers with mocked context and data sources. Integration test the full server with tools like supertest. Use schema validation tools like graphql-inspector to catch breaking changes.',
    conclusion: 'GraphQL offers immense power and flexibility for modern API development. By mastering schema design, resolver optimization, federation, caching, and real-time patterns, you can build APIs that are performant, scalable, and a joy for frontend teams to consume. Start with the patterns most relevant to your current challenges and incrementally adopt more advanced techniques as your system grows.',
  },
  zh: {
    title: '高级 GraphQL 指南：Schema 设计、解析器、订阅、Federation 与性能优化',
    subtitle: '深入探讨生产级 GraphQL 架构，从 Schema 模式到联邦架构和缓存策略的完整指南。',
    tldr: 'GraphQL 使团队能够构建灵活、高效的 API。本指南涵盖 schema-first 与 code-first 设计、自定义标量、指令、解析器模式（包括 DataLoader 解决 N+1 问题）、通过 WebSocket 和 SSE 的订阅、Apollo Federation、认证、错误处理、持久化查询缓存、分页策略、文件上传、测试、监控，以及完整的 GraphQL 与 REST 对比。',
    takeaway1: 'Schema-first 设计促进协作；Code-first 提供类型安全和逻辑共置。',
    takeaway2: 'DataLoader 是解决解析器中 N+1 查询问题的关键工具。',
    takeaway3: 'Apollo Federation 实现了基于微服务的可扩展 GraphQL 架构。',
    takeaway4: '持久化查询和 APQ 显著减少载荷大小并改善缓存效果。',
    takeaway5: '基于游标的分页在大型实时数据集上优于基于偏移量的分页。',
    takeaway6: '通过 WebSocket 的订阅非常适合聊天和通知等实时功能。',
    introTitle: '为什么高级 GraphQL 很重要',
    introP1: 'GraphQL 已经远远超出了简单的查询-响应模式。现代生产系统需要 Schema 治理、跨团队联邦、通过订阅的实时数据以及复杂的缓存策略。本指南将带您深入每个关键主题。',
    introP2: '无论您是将单体应用拆分为微服务、优化解析器性能还是实现实时功能，本指南都提供了可操作的模式和代码示例。',
    schemaTitle: '1. Schema 设计：Schema-First vs Code-First',
    schemaP1: 'Schema-first 方法在编写任何解析器逻辑之前，先在 SDL（Schema 定义语言）文件中定义 API 契约。团队可以独立于实现来审查、版本管理和协作 Schema。',
    schemaP2: 'Code-first 方法使用 Nexus（TypeScript）或 Strawberry（Python）等库从代码生成 Schema。这提供了强类型安全、IDE 自动补全以及 Schema 与逻辑的共置。',
    schemaP3: '选择哪种方法取决于团队规模、工作流偏好和工具链。Schema-first 在拥有专门 API 设计团队的大型组织中很流行。Code-first 受到重视快速迭代的小型团队青睐。',
    scalarsTitle: '2. 自定义标量与指令',
    scalarsP1: 'DateTime、JSON、URL 和 EmailAddress 等自定义标量允许您在 Schema 级别强制执行特定领域的验证。graphql-scalars 等库提供了数十个生产就绪的标量。',
    scalarsP2: '指令是修改执行行为的 Schema 注解。内置指令包括 @deprecated 和 @skip。自定义指令启用了 @auth、@cacheControl 和 @rateLimit 等强大模式。',
    resolversTitle: '3. 解析器模式与 N+1 问题',
    resolversP1: '解析器是为 Schema 中每个字段填充数据的函数。简单实现可能触发 N+1 问题：获取 N 个项目的列表，然后为相关数据发起 N 次额外的数据库调用。',
    resolversP2: 'DataLoader 通过在单个请求内批处理和缓存数据库调用来解决此问题。它收集事件循环中一个 tick 内请求的所有键，然后发起一次批量查询。',
    resolversP3: '最佳实践包括每个请求创建新的 DataLoader 实例（避免跨请求缓存）、使用 dataloader npm 包，以及将解析器构建为服务/数据层的薄封装。',
    subscriptionsTitle: '4. 订阅：WebSocket 与 SSE',
    subscriptionsP1: 'GraphQL 订阅支持实时数据传递。最常见的传输方式是使用 graphql-ws 协议的 WebSocket（替代旧版 subscriptions-transport-ws）。',
    subscriptionsP2: 'Server-Sent Events (SSE) 为单向实时数据提供了更简单的替代方案。SSE 在标准 HTTP 上工作，更容易部署在负载均衡器和代理后面。',
    subscriptionsP3: '将订阅用于聊天应用、实时通知、实时仪表板、协作编辑以及任何需要推送更新的功能。',
    federationTitle: '5. Apollo Federation 与 Schema 拼接',
    federationP1: 'Apollo Federation 允许多个 GraphQL 服务（子图）组合成一个统一的超级图。每个团队独立拥有其子图，Apollo Router 在运行时合并它们。',
    federationP2: 'Federation 的关键概念包括 @key（实体标识）、@external（引用其他子图的字段）、@requires（计算字段）和 @provides（优化提示）。',
    federationP3: 'Schema 拼接是一种较旧的替代方案，在网关级别合并 Schema。虽然仍在使用，但对于大多数分布式 GraphQL 架构，Federation 是推荐的方法。',
    authTitle: '6. 认证与授权',
    authP1: '认证识别用户身份（通常通过 HTTP 头中的 JWT 或会话令牌）。令牌在中间件中解析并附加到 GraphQL 上下文对象。',
    authP2: '授权确定已认证用户可以访问什么。常见模式包括基于指令的认证（@auth(role: ADMIN)）、中间件解析器和 Schema 级别的字段权限。',
    authP3: '对于细粒度访问控制，考虑使用 graphql-shield 等库，它允许您将权限规则定义为独立层，保持解析器的简洁。',
    errorsTitle: '7. 错误处理',
    errorsP1: 'GraphQL 在结构化的 errors 数组中返回错误，同时附带部分数据。这与 REST 有根本不同，REST 通过 HTTP 状态码传达错误类型。',
    errorsP2: '最佳实践包括使用自定义错误码（UNAUTHENTICATED、FORBIDDEN、VALIDATION_ERROR）、使用 extensions 字段扩展 errors 数组，以及在生产环境中不泄露内部堆栈跟踪。',
    cachingTitle: '8. 缓存策略',
    cachingP1: 'Apollo Client 中的客户端缓存使用以 __typename 和 id 为键的规范化内存缓存。这使得变更后的自动缓存更新成为可能。',
    cachingP2: '持久化查询将完整查询字符串存储在服务器上，客户端只发送哈希值。这减少了载荷大小，防止任意查询执行，并启用 CDN 缓存。',
    cachingP3: '自动持久化查询（APQ）在客户端和服务器之间协商：客户端先发送哈希值，只有在服务器未见过时才发送完整查询。',
    paginationTitle: '9. 分页：游标 vs 偏移量',
    paginationP1: '基于偏移量的分页（LIMIT/OFFSET）简单但在大数据集上有性能问题，并且当数据在页面之间变化时可能产生重复。',
    paginationP2: '基于游标的分页使用不透明的游标（通常是 base64 编码的 ID 或时间戳）来标记位置。Relay Connection 规范定义了标准的 edges/node/pageInfo 模式。',
    paginationP3: '对生产 API 中的大型或频繁变化的数据集使用基于游标的分页。对管理仪表板或小型静态列表使用基于偏移量的分页。',
    uploadsTitle: '10. GraphQL 中的文件上传',
    uploadsP1: 'graphql-multipart-request-spec 定义了如何通过 multipart/form-data 在 GraphQL 中发送文件。graphql-upload 等库处理服务器端解析。',
    uploadsP2: '另一种方法是使用预签名 URL：客户端通过 GraphQL mutation 请求上传 URL，直接上传到云存储（S3、GCS），然后通过另一个 mutation 发送文件引用。',
    testingTitle: '11. 测试 GraphQL API',
    testingP1: '通过模拟上下文和数据源对解析器进行单元测试。使用 supertest 或 apollo-server-testing 对完整 GraphQL 服务器进行集成测试。',
    testingP2: 'Schema 验证测试确保您的 Schema 没有破坏性更改。graphql-inspector 和 Apollo Studio 等工具提供自动化的 Schema 差异比较和兼容性检查。',
    monitoringTitle: '12. 监控与追踪',
    monitoringP1: 'Apollo Studio 提供操作级指标，包括延迟百分位、错误率和字段级使用分析。这有助于识别慢解析器和未使用的字段。',
    monitoringP2: 'OpenTelemetry 集成支持跨 GraphQL 网关和下游服务的分布式追踪。每个解析器执行都成为追踪中的一个 span。',
    comparisonTitle: '13. GraphQL vs REST：全面比较',
    comparisonP1: '下表从关键维度比较了 GraphQL 和 REST，帮助您为用例选择正确的方法。',
    faq1Q: 'GraphQL 中的 N+1 问题是什么？',
    faq1A: 'N+1 问题发生在查询 N 个项目时触发 N 次额外的数据库调用来获取相关数据。DataLoader 通过将所有相关查询批处理为事件循环每个 tick 中的一次数据库调用来解决此问题。',
    faq2Q: '应该使用 schema-first 还是 code-first GraphQL？',
    faq2A: 'Schema-first 适合需要契约驱动工作流的大型团队。Code-first 适合希望类型安全和 Schema 与业务逻辑共置的小型团队。',
    faq3Q: 'GraphQL 中的订阅如何工作？',
    faq3A: '订阅使用持久连接（通常是 WebSocket）在订阅的数据发生变化时，从服务器向客户端推送实时更新。',
    faq4Q: '什么是 Apollo Federation？',
    faq4A: 'Apollo Federation 是一种将多个 GraphQL 服务（子图）组合成单个统一 API（超级图）的架构。每个团队拥有自己的子图，Apollo Router 进行合并。',
    faq5Q: '如何在 GraphQL 中处理认证？',
    faq5A: '在中间件中解析认证令牌（JWT 或会话），将用户附加到上下文对象，并使用基于指令或中间件的授权来保护字段和操作。',
    faq6Q: '什么是持久化查询？',
    faq6A: '持久化查询将完整查询字符串存储在服务器上，客户端只发送哈希值。这减少了带宽，防止任意查询，并启用 CDN 级别的缓存。',
    faq7Q: '在 GraphQL 中应该使用游标还是偏移量分页？',
    faq7A: '对于大型实时数据集推荐使用基于游标的分页。基于偏移量更简单，但在数据变化时存在性能下降和重复问题。',
    faq8Q: '如何测试 GraphQL API？',
    faq8A: '使用模拟的上下文和数据源对解析器进行单元测试。使用 supertest 等工具对完整服务器进行集成测试。使用 graphql-inspector 等 Schema 验证工具捕获破坏性更改。',
    conclusion: 'GraphQL 为现代 API 开发提供了巨大的能力和灵活性。通过掌握 Schema 设计、解析器优化、联邦架构、缓存和实时模式，您可以构建高性能、可扩展且前端团队乐于使用的 API。从与当前挑战最相关的模式开始，随着系统增长逐步采用更高级的技术。',
  },
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: '1rem',
  marginTop: '2.5rem',
  lineHeight: 1.3,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: '1.35rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '0.75rem',
  marginTop: '2rem',
  lineHeight: 1.4,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.8,
  color: '#374151',
  marginBottom: '1rem',
};

const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '1.25rem',
  borderRadius: '8px',
  overflowX: 'auto',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  borderLeft: '4px solid #0ea5e9',
  padding: '1.25rem 1.5rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '2rem',
  fontSize: '1.05rem',
  lineHeight: 1.7,
  color: '#0c4a6e',
};

const takeawaysBoxStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '2rem',
};

const takeawayItemStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.7,
  color: '#334155',
  marginBottom: '0.5rem',
  paddingLeft: '0.5rem',
};

const tableContainerStyle: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: '2rem',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

const thStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#f8fafc',
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  borderBottom: '2px solid #334155',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#374151',
};

const tdAltStyle: React.CSSProperties = {
  ...tdStyle,
  background: '#f8fafc',
};

const tipBoxStyle: React.CSSProperties = {
  background: '#f0fdf4',
  borderLeft: '4px solid #22c55e',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#14532d',
};

const warningBoxStyle: React.CSSProperties = {
  background: '#fffbeb',
  borderLeft: '4px solid #f59e0b',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#78350f',
};

const inlineCodeStyle: React.CSSProperties = {
  background: '#f1f5f9',
  color: '#dc2626',
  padding: '0.15rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: "'Fira Code', Consolas, monospace",
};

export default function GraphqlAdvancedGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];

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
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Title */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
          {t.subtitle}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0369a1', fontSize: '1.1rem' }}>
          TL;DR
        </strong>
        {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', color: '#1e293b', fontSize: '1.1rem' }}>
          Key Takeaways
        </strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway1}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway2}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway3}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway4}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway5}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway6}</li>
        </ul>
      </div>

      {/* Introduction */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.introTitle}</h2>
        <p style={paragraphStyle}>{t.introP1}</p>
        <p style={paragraphStyle}>{t.introP2}</p>
      </section>

      {/* 1. Schema Design */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.schemaTitle}</h2>
        <p style={paragraphStyle}>{t.schemaP1}</p>

        <h3 style={subHeadingStyle}>Schema-First (SDL)</h3>
        <pre style={codeBlockStyle}><code>{
          '# schema.graphql\n'
          + 'type User {\n'
          + '  id: ID!\n'
          + '  name: String!\n'
          + '  email: String!\n'
          + '  posts: [Post!]!\n'
          + '  createdAt: DateTime!\n'
          + '}\n\n'
          + 'type Post {\n'
          + '  id: ID!\n'
          + '  title: String!\n'
          + '  content: String!\n'
          + '  author: User!\n'
          + '  tags: [String!]!\n'
          + '}\n\n'
          + 'type Query {\n'
          + '  user(id: ID!): User\n'
          + '  posts(first: Int, after: String): PostConnection!\n'
          + '}\n\n'
          + 'type Mutation {\n'
          + '  createPost(input: CreatePostInput!): Post!\n'
          + '  updateUser(id: ID!, input: UpdateUserInput!): User!\n'
          + '}'
        }</code></pre>

        <p style={paragraphStyle}>{t.schemaP2}</p>

        <h3 style={subHeadingStyle}>Code-First (Nexus / TypeScript)</h3>
        <pre style={codeBlockStyle}><code>{
          'import { objectType, queryType, makeSchema } from \'nexus\';\n\n'
          + 'const User = objectType({\n'
          + '  name: \'User\',\n'
          + '  definition(t) {\n'
          + '    t.nonNull.id(\'id\');\n'
          + '    t.nonNull.string(\'name\');\n'
          + '    t.nonNull.string(\'email\');\n'
          + '    t.nonNull.list.nonNull.field(\'posts\', {\n'
          + '      type: \'Post\',\n'
          + '      resolve: (parent, _args, ctx) =>\n'
          + '        ctx.db.post.findMany({ where: { authorId: parent.id } }),\n'
          + '    });\n'
          + '  },\n'
          + '});\n\n'
          + 'const Query = queryType({\n'
          + '  definition(t) {\n'
          + '    t.field(\'user\', {\n'
          + '      type: \'User\',\n'
          + '      args: { id: nonNull(idArg()) },\n'
          + '      resolve: (_root, args, ctx) =>\n'
          + '        ctx.db.user.findUnique({ where: { id: args.id } }),\n'
          + '    });\n'
          + '  },\n'
          + '});'
        }</code></pre>

        <p style={paragraphStyle}>{t.schemaP3}</p>
      </section>

      {/* 2. Custom Scalars & Directives */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.scalarsTitle}</h2>
        <p style={paragraphStyle}>{t.scalarsP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Custom scalar definition\n'
          + 'import { GraphQLScalarType, Kind } from \'graphql\';\n\n'
          + 'const DateTimeScalar = new GraphQLScalarType({\n'
          + '  name: \'DateTime\',\n'
          + '  description: \'ISO 8601 date-time string\',\n'
          + '  serialize(value: Date): string {\n'
          + '    return value.toISOString();\n'
          + '  },\n'
          + '  parseValue(value: string): Date {\n'
          + '    return new Date(value);\n'
          + '  },\n'
          + '  parseLiteral(ast): Date | null {\n'
          + '    if (ast.kind === Kind.STRING) {\n'
          + '      return new Date(ast.value);\n'
          + '    }\n'
          + '    return null;\n'
          + '  },\n'
          + '});'
        }</code></pre>

        <p style={paragraphStyle}>{t.scalarsP2}</p>

        <pre style={codeBlockStyle}><code>{
          '# Custom directive in SDL\n'
          + 'directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION\n'
          + 'directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT\n'
          + 'directive @rateLimit(max: Int!, window: String!) on FIELD_DEFINITION\n\n'
          + 'type Query {\n'
          + '  publicPosts: [Post!]!\n'
          + '  adminDashboard: Dashboard! @auth(requires: ADMIN)\n'
          + '  userProfile: User! @auth(requires: USER) @cacheControl(maxAge: 300)\n'
          + '  searchUsers(query: String!): [User!]! @rateLimit(max: 10, window: "1m")\n'
          + '}'
        }</code></pre>
      </section>

      {/* 3. Resolver Patterns & N+1 */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.resolversTitle}</h2>
        <p style={paragraphStyle}>{t.resolversP1}</p>

        <div style={warningBoxStyle}>
          <strong>Warning:</strong> Without DataLoader, a query for 50 users with their posts can trigger 51 database queries (1 for users + 50 for posts). This scales linearly and kills performance.
        </div>

        <p style={paragraphStyle}>{t.resolversP2}</p>

        <pre style={codeBlockStyle}><code>{
          'import DataLoader from \'dataloader\';\n\n'
          + '// Create DataLoader per request\n'
          + 'function createLoaders(db: Database) {\n'
          + '  return {\n'
          + '    postsByAuthor: new DataLoader<string, Post[]>(\n'
          + '      async (authorIds) => {\n'
          + '        const posts = await db.post.findMany({\n'
          + '          where: { authorId: { in: [...authorIds] } },\n'
          + '        });\n'
          + '        // Group posts by authorId\n'
          + '        const postMap = new Map<string, Post[]>();\n'
          + '        for (const post of posts) {\n'
          + '          const existing = postMap.get(post.authorId) || [];\n'
          + '          existing.push(post);\n'
          + '          postMap.set(post.authorId, existing);\n'
          + '        }\n'
          + '        return authorIds.map(id => postMap.get(id) || []);\n'
          + '      }\n'
          + '    ),\n'
          + '  };\n'
          + '}\n\n'
          + '// Resolver using DataLoader\n'
          + 'const resolvers = {\n'
          + '  User: {\n'
          + '    posts: (parent, _args, ctx) =>\n'
          + '      ctx.loaders.postsByAuthor.load(parent.id),\n'
          + '  },\n'
          + '};'
        }</code></pre>

        <p style={paragraphStyle}>{t.resolversP3}</p>

        <div style={tipBoxStyle}>
          <strong>Tip:</strong> Always create DataLoader instances in the context factory, not as global singletons. This ensures proper request isolation and prevents stale cache issues.
        </div>
      </section>

      {/* 4. Subscriptions */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.subscriptionsTitle}</h2>
        <p style={paragraphStyle}>{t.subscriptionsP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Server: graphql-ws subscription setup\n'
          + 'import { createServer } from \'http\';\n'
          + 'import { WebSocketServer } from \'ws\';\n'
          + 'import { useServer } from \'graphql-ws/lib/use/ws\';\n'
          + 'import { makeExecutableSchema } from \'@graphql-tools/schema\';\n\n'
          + 'const schema = makeExecutableSchema({ typeDefs, resolvers });\n'
          + 'const server = createServer(app);\n'
          + 'const wsServer = new WebSocketServer({\n'
          + '  server,\n'
          + '  path: \'/graphql\',\n'
          + '});\n\n'
          + 'useServer(\n'
          + '  {\n'
          + '    schema,\n'
          + '    context: async (ctx) => {\n'
          + '      const token = ctx.connectionParams?.authToken;\n'
          + '      const user = await verifyToken(token);\n'
          + '      return { user };\n'
          + '    },\n'
          + '    onConnect: async (ctx) => {\n'
          + '      console.log(\'Client connected\');\n'
          + '    },\n'
          + '    onDisconnect: (ctx) => {\n'
          + '      console.log(\'Client disconnected\');\n'
          + '    },\n'
          + '  },\n'
          + '  wsServer\n'
          + ');'
        }</code></pre>

        <p style={paragraphStyle}>{t.subscriptionsP2}</p>

        <pre style={codeBlockStyle}><code>{
          '# Subscription schema definition\n'
          + 'type Subscription {\n'
          + '  messageAdded(channelId: ID!): Message!\n'
          + '  notificationReceived(userId: ID!): Notification!\n'
          + '  postUpdated(postId: ID!): Post!\n'
          + '}\n\n'
          + 'type Message {\n'
          + '  id: ID!\n'
          + '  content: String!\n'
          + '  sender: User!\n'
          + '  timestamp: DateTime!\n'
          + '}'
        }</code></pre>

        <p style={paragraphStyle}>{t.subscriptionsP3}</p>
      </section>

      {/* 5. Apollo Federation */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.federationTitle}</h2>
        <p style={paragraphStyle}>{t.federationP1}</p>

        <pre style={codeBlockStyle}><code>{
          '# Users subgraph\n'
          + 'type User @key(fields: "id") {\n'
          + '  id: ID!\n'
          + '  name: String!\n'
          + '  email: String!\n'
          + '}\n\n'
          + 'type Query {\n'
          + '  me: User\n'
          + '}\n\n'
          + '# ------- Posts subgraph -------\n'
          + 'type Post @key(fields: "id") {\n'
          + '  id: ID!\n'
          + '  title: String!\n'
          + '  content: String!\n'
          + '  author: User!\n'
          + '}\n\n'
          + '# Extend User from another subgraph\n'
          + 'type User @key(fields: "id") {\n'
          + '  id: ID! @external\n'
          + '  posts: [Post!]!\n'
          + '}\n\n'
          + '# ------- Reviews subgraph -------\n'
          + 'type Review @key(fields: "id") {\n'
          + '  id: ID!\n'
          + '  rating: Int!\n'
          + '  body: String!\n'
          + '  post: Post!\n'
          + '  reviewer: User!\n'
          + '}'
        }</code></pre>

        <p style={paragraphStyle}>{t.federationP2}</p>

        <pre style={codeBlockStyle}><code>{
          '// Apollo Router configuration (router.yaml)\n'
          + 'supergraph:\n'
          + '  listen: 0.0.0.0:4000\n'
          + '  introspection: true\n\n'
          + 'headers:\n'
          + '  all:\n'
          + '    request:\n'
          + '      - propagate:\n'
          + '          named: authorization\n\n'
          + 'subgraphs:\n'
          + '  users:\n'
          + '    routing_url: http://users-service:4001/graphql\n'
          + '  posts:\n'
          + '    routing_url: http://posts-service:4002/graphql\n'
          + '  reviews:\n'
          + '    routing_url: http://reviews-service:4003/graphql'
        }</code></pre>

        <p style={paragraphStyle}>{t.federationP3}</p>
      </section>

      {/* 6. Authentication & Authorization */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.authTitle}</h2>
        <p style={paragraphStyle}>{t.authP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Context creation with auth\n'
          + 'import { ApolloServer } from \'@apollo/server\';\n'
          + 'import jwt from \'jsonwebtoken\';\n\n'
          + 'const server = new ApolloServer({ schema });\n\n'
          + 'app.use(\n'
          + '  \'/graphql\',\n'
          + '  expressMiddleware(server, {\n'
          + '    context: async ({ req }) => {\n'
          + '      const token = req.headers.authorization?.replace(\'Bearer \', \'\');\n'
          + '      let user = null;\n'
          + '      if (token) {\n'
          + '        try {\n'
          + '          user = jwt.verify(token, process.env.JWT_SECRET);\n'
          + '        } catch (e) {\n'
          + '          // Token invalid or expired\n'
          + '        }\n'
          + '      }\n'
          + '      return { user, loaders: createLoaders(db) };\n'
          + '    },\n'
          + '  })\n'
          + ');'
        }</code></pre>

        <p style={paragraphStyle}>{t.authP2}</p>

        <pre style={codeBlockStyle}><code>{
          '// graphql-shield authorization rules\n'
          + 'import { shield, rule, allow, deny } from \'graphql-shield\';\n\n'
          + 'const isAuthenticated = rule()(\n'
          + '  async (_parent, _args, ctx) => ctx.user !== null\n'
          + ');\n\n'
          + 'const isAdmin = rule()(\n'
          + '  async (_parent, _args, ctx) => ctx.user?.role === \'ADMIN\'\n'
          + ');\n\n'
          + 'const isOwner = rule()(\n'
          + '  async (parent, _args, ctx) => parent.userId === ctx.user?.id\n'
          + ');\n\n'
          + 'const permissions = shield({\n'
          + '  Query: {\n'
          + '    publicPosts: allow,\n'
          + '    me: isAuthenticated,\n'
          + '    adminDashboard: isAdmin,\n'
          + '  },\n'
          + '  Mutation: {\n'
          + '    createPost: isAuthenticated,\n'
          + '    deletePost: isOwner,\n'
          + '    banUser: isAdmin,\n'
          + '  },\n'
          + '});'
        }</code></pre>

        <p style={paragraphStyle}>{t.authP3}</p>
      </section>

      {/* 7. Error Handling */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.errorsTitle}</h2>
        <p style={paragraphStyle}>{t.errorsP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Custom GraphQL error classes\n'
          + 'import { GraphQLError } from \'graphql\';\n\n'
          + 'class AuthenticationError extends GraphQLError {\n'
          + '  constructor(message = \'Not authenticated\') {\n'
          + '    super(message, {\n'
          + '      extensions: {\n'
          + '        code: \'UNAUTHENTICATED\',\n'
          + '        http: { status: 401 },\n'
          + '      },\n'
          + '    });\n'
          + '  }\n'
          + '}\n\n'
          + 'class ForbiddenError extends GraphQLError {\n'
          + '  constructor(message = \'Forbidden\') {\n'
          + '    super(message, {\n'
          + '      extensions: {\n'
          + '        code: \'FORBIDDEN\',\n'
          + '        http: { status: 403 },\n'
          + '      },\n'
          + '    });\n'
          + '  }\n'
          + '}\n\n'
          + 'class ValidationError extends GraphQLError {\n'
          + '  constructor(message: string, field: string) {\n'
          + '    super(message, {\n'
          + '      extensions: {\n'
          + '        code: \'VALIDATION_ERROR\',\n'
          + '        field,\n'
          + '        http: { status: 400 },\n'
          + '      },\n'
          + '    });\n'
          + '  }\n'
          + '}'
        }</code></pre>

        <p style={paragraphStyle}>{t.errorsP2}</p>

        <div style={tipBoxStyle}>
          <strong>Tip:</strong> Use a <span style={inlineCodeStyle}>formatError</span> function in your Apollo Server configuration to strip stack traces and internal details before sending errors to clients in production.
        </div>
      </section>

      {/* 8. Caching Strategies */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.cachingTitle}</h2>
        <p style={paragraphStyle}>{t.cachingP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Apollo Client cache configuration\n'
          + 'import { ApolloClient, InMemoryCache } from \'@apollo/client\';\n\n'
          + 'const client = new ApolloClient({\n'
          + '  uri: \'/graphql\',\n'
          + '  cache: new InMemoryCache({\n'
          + '    typePolicies: {\n'
          + '      Query: {\n'
          + '        fields: {\n'
          + '          posts: {\n'
          + '            // Merge function for cursor-based pagination\n'
          + '            keyArgs: [\'filter\'],\n'
          + '            merge(existing, incoming, { args }) {\n'
          + '              if (!args?.after) return incoming;\n'
          + '              return {\n'
          + '                ...incoming,\n'
          + '                edges: [\n'
          + '                  ...(existing?.edges || []),\n'
          + '                  ...incoming.edges,\n'
          + '                ],\n'
          + '              };\n'
          + '            },\n'
          + '          },\n'
          + '        },\n'
          + '      },\n'
          + '    },\n'
          + '  }),\n'
          + '});'
        }</code></pre>

        <p style={paragraphStyle}>{t.cachingP2}</p>
        <p style={paragraphStyle}>{t.cachingP3}</p>

        <pre style={codeBlockStyle}><code>{
          '// Automatic Persisted Queries (APQ) setup\n'
          + 'import { ApolloClient, InMemoryCache, HttpLink } from \'@apollo/client\';\n'
          + 'import { createPersistedQueryLink } from \'@apollo/client/link/persisted-queries\';\n'
          + 'import { sha256 } from \'crypto-hash\';\n\n'
          + 'const httpLink = new HttpLink({ uri: \'/graphql\' });\n'
          + 'const persistedLink = createPersistedQueryLink({ sha256 });\n\n'
          + 'const client = new ApolloClient({\n'
          + '  link: persistedLink.concat(httpLink),\n'
          + '  cache: new InMemoryCache(),\n'
          + '});\n\n'
          + '// First request: sends hash only\n'
          + '// If server doesn\'t recognize hash -> client retries with full query\n'
          + '// Subsequent requests: hash only (server has cached the mapping)'
        }</code></pre>
      </section>

      {/* 9. Pagination */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.paginationTitle}</h2>
        <p style={paragraphStyle}>{t.paginationP1}</p>
        <p style={paragraphStyle}>{t.paginationP2}</p>

        <pre style={codeBlockStyle}><code>{
          '# Relay-style cursor pagination schema\n'
          + 'type PostConnection {\n'
          + '  edges: [PostEdge!]!\n'
          + '  pageInfo: PageInfo!\n'
          + '  totalCount: Int!\n'
          + '}\n\n'
          + 'type PostEdge {\n'
          + '  cursor: String!\n'
          + '  node: Post!\n'
          + '}\n\n'
          + 'type PageInfo {\n'
          + '  hasNextPage: Boolean!\n'
          + '  hasPreviousPage: Boolean!\n'
          + '  startCursor: String\n'
          + '  endCursor: String\n'
          + '}\n\n'
          + 'type Query {\n'
          + '  posts(\n'
          + '    first: Int\n'
          + '    after: String\n'
          + '    last: Int\n'
          + '    before: String\n'
          + '    filter: PostFilter\n'
          + '  ): PostConnection!\n'
          + '}'
        }</code></pre>

        <pre style={codeBlockStyle}><code>{
          '// Cursor pagination resolver\n'
          + 'const resolvers = {\n'
          + '  Query: {\n'
          + '    posts: async (_root, args, ctx) => {\n'
          + '      const { first = 20, after, filter } = args;\n'
          + '      const decodedCursor = after\n'
          + '        ? Buffer.from(after, \'base64\').toString(\'utf-8\')\n'
          + '        : null;\n\n'
          + '      const where = {\n'
          + '        ...(filter || {}),\n'
          + '        ...(decodedCursor\n'
          + '          ? { id: { gt: decodedCursor } }\n'
          + '          : {}),\n'
          + '      };\n\n'
          + '      const posts = await ctx.db.post.findMany({\n'
          + '        where,\n'
          + '        take: first + 1,\n'
          + '        orderBy: { id: \'asc\' },\n'
          + '      });\n\n'
          + '      const hasNextPage = posts.length > first;\n'
          + '      const edges = posts.slice(0, first).map(post => ({\n'
          + '        cursor: Buffer.from(post.id).toString(\'base64\'),\n'
          + '        node: post,\n'
          + '      }));\n\n'
          + '      return {\n'
          + '        edges,\n'
          + '        pageInfo: {\n'
          + '          hasNextPage,\n'
          + '          hasPreviousPage: !!after,\n'
          + '          startCursor: edges[0]?.cursor || null,\n'
          + '          endCursor: edges[edges.length - 1]?.cursor || null,\n'
          + '        },\n'
          + '        totalCount: await ctx.db.post.count({ where: filter }),\n'
          + '      };\n'
          + '    },\n'
          + '  },\n'
          + '};'
        }</code></pre>

        <p style={paragraphStyle}>{t.paginationP3}</p>
      </section>

      {/* 10. File Uploads */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.uploadsTitle}</h2>
        <p style={paragraphStyle}>{t.uploadsP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Presigned URL upload pattern\n'
          + 'const typeDefs = `\n'
          + '  type UploadResult {\n'
          + '    uploadUrl: String!\n'
          + '    fileKey: String!\n'
          + '  }\n\n'
          + '  type Mutation {\n'
          + '    requestUpload(filename: String!, contentType: String!): UploadResult!\n'
          + '    confirmUpload(fileKey: String!, postId: ID!): Post!\n'
          + '  }\n'
          + '`;\n\n'
          + 'const resolvers = {\n'
          + '  Mutation: {\n'
          + '    requestUpload: async (_root, { filename, contentType }, ctx) => {\n'
          + '      const fileKey = `uploads/\\${ctx.user.id}/\\${Date.now()}-\\${filename}`;\n'
          + '      const uploadUrl = await s3.getSignedUrl(\'putObject\', {\n'
          + '        Bucket: process.env.S3_BUCKET,\n'
          + '        Key: fileKey,\n'
          + '        ContentType: contentType,\n'
          + '        Expires: 300,\n'
          + '      });\n'
          + '      return { uploadUrl, fileKey };\n'
          + '    },\n'
          + '    confirmUpload: async (_root, { fileKey, postId }, ctx) => {\n'
          + '      return ctx.db.post.update({\n'
          + '        where: { id: postId },\n'
          + '        data: { imageUrl: `\\${CDN_URL}/\\${fileKey}` },\n'
          + '      });\n'
          + '    },\n'
          + '  },\n'
          + '};'
        }</code></pre>

        <p style={paragraphStyle}>{t.uploadsP2}</p>
      </section>

      {/* 11. Testing */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.testingTitle}</h2>
        <p style={paragraphStyle}>{t.testingP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// Integration testing with supertest\n'
          + 'import request from \'supertest\';\n'
          + 'import { createTestServer } from \'./test-utils\';\n\n'
          + 'describe(\'GraphQL API\', () => {\n'
          + '  let app;\n'
          + '  let testDb;\n\n'
          + '  beforeAll(async () => {\n'
          + '    testDb = await createTestDatabase();\n'
          + '    app = await createTestServer(testDb);\n'
          + '  });\n\n'
          + '  afterAll(async () => {\n'
          + '    await testDb.cleanup();\n'
          + '  });\n\n'
          + '  it(\'should fetch a user by ID\', async () => {\n'
          + '    const user = await testDb.createUser({ name: \'Alice\' });\n\n'
          + '    const res = await request(app)\n'
          + '      .post(\'/graphql\')\n'
          + '      .send({\n'
          + '        query: `\n'
          + '          query GetUser($id: ID!) {\n'
          + '            user(id: $id) {\n'
          + '              id\n'
          + '              name\n'
          + '              email\n'
          + '            }\n'
          + '          }\n'
          + '        `,\n'
          + '        variables: { id: user.id },\n'
          + '      })\n'
          + '      .expect(200);\n\n'
          + '    expect(res.body.data.user.name).toBe(\'Alice\');\n'
          + '    expect(res.body.errors).toBeUndefined();\n'
          + '  });\n\n'
          + '  it(\'should reject unauthenticated mutation\', async () => {\n'
          + '    const res = await request(app)\n'
          + '      .post(\'/graphql\')\n'
          + '      .send({\n'
          + '        query: `\n'
          + '          mutation {\n'
          + '            createPost(input: { title: "Test", content: "Body" }) {\n'
          + '              id\n'
          + '            }\n'
          + '          }\n'
          + '        `,\n'
          + '      })\n'
          + '      .expect(200);\n\n'
          + '    expect(res.body.errors[0].extensions.code)\n'
          + '      .toBe(\'UNAUTHENTICATED\');\n'
          + '  });\n'
          + '});'
        }</code></pre>

        <p style={paragraphStyle}>{t.testingP2}</p>
      </section>

      {/* 12. Monitoring & Tracing */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.monitoringTitle}</h2>
        <p style={paragraphStyle}>{t.monitoringP1}</p>

        <pre style={codeBlockStyle}><code>{
          '// OpenTelemetry tracing plugin for Apollo Server\n'
          + 'import { ApolloServerPlugin } from \'@apollo/server\';\n'
          + 'import { trace, SpanStatusCode } from \'@opentelemetry/api\';\n\n'
          + 'const tracingPlugin: ApolloServerPlugin = {\n'
          + '  async requestDidStart() {\n'
          + '    const tracer = trace.getTracer(\'graphql\');\n'
          + '    return {\n'
          + '      async executionDidStart() {\n'
          + '        return {\n'
          + '          willResolveField({ info }) {\n'
          + '            const span = tracer.startSpan(\n'
          + '              `\\${info.parentType.name}.\\${info.fieldName}`\n'
          + '            );\n'
          + '            return (error) => {\n'
          + '              if (error) {\n'
          + '                span.setStatus({\n'
          + '                  code: SpanStatusCode.ERROR,\n'
          + '                  message: error.message,\n'
          + '                });\n'
          + '              }\n'
          + '              span.end();\n'
          + '            };\n'
          + '          },\n'
          + '        };\n'
          + '      },\n'
          + '    };\n'
          + '  },\n'
          + '};'
        }</code></pre>

        <p style={paragraphStyle}>{t.monitoringP2}</p>
      </section>

      {/* 13. GraphQL vs REST Comparison */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.comparisonTitle}</h2>
        <p style={paragraphStyle}>{t.comparisonP1}</p>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Dimension</th>
                <th style={thStyle}>GraphQL</th>
                <th style={thStyle}>REST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}><strong>Data Fetching</strong></td>
                <td style={tdStyle}>Single endpoint, client specifies exact fields</td>
                <td style={tdStyle}>Multiple endpoints, server defines response shape</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Over/Under-fetching</strong></td>
                <td style={tdAltStyle}>Eliminated: client requests only needed fields</td>
                <td style={tdAltStyle}>Common: fixed responses may include too much or too little data</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Versioning</strong></td>
                <td style={tdStyle}>No versioning needed; deprecate fields with @deprecated</td>
                <td style={tdStyle}>URL-based versioning (v1, v2) or header-based</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Caching</strong></td>
                <td style={tdAltStyle}>Requires client-side or persisted query caching</td>
                <td style={tdAltStyle}>Native HTTP caching (ETags, Cache-Control)</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Error Handling</strong></td>
                <td style={tdStyle}>Always returns 200; errors in errors array with partial data</td>
                <td style={tdStyle}>HTTP status codes (4xx, 5xx) convey error types</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Real-Time</strong></td>
                <td style={tdAltStyle}>Built-in subscriptions via WebSocket</td>
                <td style={tdAltStyle}>Requires separate WebSocket or SSE implementation</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Type System</strong></td>
                <td style={tdStyle}>Strongly typed schema; self-documenting via introspection</td>
                <td style={tdStyle}>Optional (OpenAPI/Swagger); not enforced at runtime</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Tooling</strong></td>
                <td style={tdAltStyle}>GraphiQL, Apollo Studio, codegen, schema validation</td>
                <td style={tdAltStyle}>Postman, Swagger UI, curl, mature ecosystem</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>File Uploads</strong></td>
                <td style={tdStyle}>Requires multipart spec or presigned URL pattern</td>
                <td style={tdStyle}>Native multipart/form-data support</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Learning Curve</strong></td>
                <td style={tdAltStyle}>Steeper: schema design, resolvers, client libraries</td>
                <td style={tdAltStyle}>Lower: familiar HTTP methods, standard patterns</td>
              </tr>
              <tr>
                <td style={tdStyle}><strong>Performance</strong></td>
                <td style={tdStyle}>Can be optimized with DataLoader, persisted queries, APQ</td>
                <td style={tdStyle}>Straightforward but may require multiple roundtrips</td>
              </tr>
              <tr>
                <td style={tdAltStyle}><strong>Best For</strong></td>
                <td style={tdAltStyle}>Complex UIs, mobile apps, microservices aggregation</td>
                <td style={tdAltStyle}>Simple CRUD, public APIs, file-heavy services</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Frequently Asked Questions</h2>

        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq1Q}</h3>
          <p style={paragraphStyle}>{t.faq1A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq2Q}</h3>
          <p style={paragraphStyle}>{t.faq2A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq3Q}</h3>
          <p style={paragraphStyle}>{t.faq3A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq4Q}</h3>
          <p style={paragraphStyle}>{t.faq4A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq5Q}</h3>
          <p style={paragraphStyle}>{t.faq5A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq6Q}</h3>
          <p style={paragraphStyle}>{t.faq6A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq7Q}</h3>
          <p style={paragraphStyle}>{t.faq7A}</p>
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ ...subHeadingStyle, marginTop: '1rem' }}>{t.faq8Q}</h3>
          <p style={paragraphStyle}>{t.faq8A}</p>
        </div>
      </section>

      {/* Conclusion */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Conclusion</h2>
        <p style={paragraphStyle}>{t.conclusion}</p>
      </section>
    </article>
  );
}
