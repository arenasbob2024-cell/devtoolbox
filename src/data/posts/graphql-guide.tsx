'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'GraphQL Complete Guide 2026: Schema, Apollo, Auth, Pagination & Performance',
    description: 'Master GraphQL from schema definition to production deployment. Covers SDL, Apollo Server, Apollo Client React hooks, JWT auth, cursor pagination, DataLoader, and performance optimization.',
    tldr: 'GraphQL is a query language and runtime that lets clients request exactly the data they need from a single endpoint. Use Apollo Server for the backend (resolvers, DataLoader for N+1), Apollo Client for React (useQuery, useMutation, useSubscription), cursor-based pagination for scalability, JWT in context for auth, and Redis caching + persisted queries for performance.',

    whatIsGraphqlTitle: 'What Is GraphQL?',
    whatIsGraphqlP1: 'GraphQL is a query language for APIs and a server-side runtime for executing those queries using a type system you define for your data. Developed at Facebook in 2012 and open-sourced in 2015, it solves fundamental problems with REST: over-fetching too much data, under-fetching too little (requiring multiple round trips), and rigid response shapes that do not adapt to diverse client needs.',
    whatIsGraphqlP2: 'At its core, GraphQL is schema-first. You define your entire data model in the Schema Definition Language (SDL) — types, queries, mutations, and subscriptions — and that schema becomes both documentation and a contract between your frontend and backend. Every GraphQL API exposes a single endpoint (typically /graphql) that accepts queries, mutations, or subscriptions as POST requests.',
    whatIsGraphqlP3: 'The key insight is that the client drives the response shape. Instead of a REST endpoint returning a fixed JSON structure, a GraphQL client sends a query describing exactly which fields it needs. The server resolves only those fields and returns precisely that shape — nothing more, nothing less.',

    sdlTitle: 'Schema Definition Language (SDL)',
    sdlP1: 'The Schema Definition Language is GraphQL\'s type system syntax. Every GraphQL API starts with a schema that defines all available types, queries, mutations, and subscriptions. The schema is the single source of truth for your API\'s capabilities.',
    sdlP2: 'SDL supports scalar types (Int, Float, String, Boolean, ID), object types, enum types, union types, interface types, and input types. Non-null fields are marked with !, and lists use [] notation. Understanding SDL thoroughly is the foundation of all GraphQL work.',

    apolloServerTitle: 'Apollo Server Setup & Resolvers',
    apolloServerP1: 'Apollo Server is the most popular GraphQL server for Node.js. It handles HTTP transport, query parsing and validation against your schema, resolver execution, error formatting, and introspection. Apollo Server 4 can be used as standalone or as middleware with Express, Fastify, or any Node HTTP framework.',
    apolloServerP2: 'Resolvers are functions that return the data for each field in your schema. They receive four arguments: parent (the resolved value from the parent field), args (the field\'s arguments from the query), context (shared request context — auth user, data sources, loaders), and info (field path, schema, directives). The N+1 problem — where fetching a list then individually fetching related records causes N+1 queries — is solved with DataLoader batching.',

    apolloClientTitle: 'Apollo Client with React Hooks',
    apolloClientP1: 'Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. For React, it provides hooks-based API: useQuery for fetching data, useMutation for sending mutations, and useSubscription for real-time updates. Apollo Client also includes a normalized in-memory cache (InMemoryCache) that automatically deduplicates and updates related data across components.',
    apolloClientP2: 'The InMemoryCache normalizes objects by __typename + id. When a mutation returns an updated object with the same ID as a cached object, every component displaying that data automatically re-renders — no manual state sync needed. Cache policies (cache-first, cache-and-network, network-only, no-cache) control when Apollo reads from cache vs. hits the network.',

    authTitle: 'Authentication and Authorization',
    authP1: 'Authentication in GraphQL is handled at the HTTP layer — typically via Authorization header with a JWT or session cookie — before any resolvers run. Apollo Server\'s context function runs on every request, decodes the token, and attaches the user to context, making it available to all resolvers.',
    authP2: 'Authorization (who can do what) is more nuanced in GraphQL because a single endpoint handles all operations. Common patterns include resolver-level guards (check context.user before resolving), schema directives (@auth, @hasRole), and middleware layers. The graphql-shield library provides a permission layer using rule composition.',

    paginationTitle: 'Pagination: Cursor-Based & Relay Spec',
    paginationP1: 'GraphQL supports two main pagination approaches: offset-based (skip/take or page/limit) and cursor-based. Offset pagination is simple but breaks under concurrent inserts or deletes. Cursor-based pagination uses an opaque cursor (typically a base64-encoded ID or timestamp) to point to a specific position in the dataset, making it stable under data mutations.',
    paginationP2: 'The Relay Connection Specification is the industry-standard cursor pagination contract. It defines a Connection type with edges (array of edge objects, each containing a node and cursor) and pageInfo (hasNextPage, hasPreviousPage, startCursor, endCursor). Most GraphQL clients including Apollo Client natively understand the Relay spec.',

    errorHandlingTitle: 'Error Handling in GraphQL',
    errorHandlingP1: 'GraphQL has a unique error model: every response returns HTTP 200, even when errors occur. Errors appear in a top-level errors array alongside any partial data. This differs fundamentally from REST where HTTP status codes communicate error categories. The errors array contains objects with message, locations, path (which field failed), and extensions (custom error codes).',
    errorHandlingP2: 'Best practice is to always return HTTP 200 for GraphQL errors and use the errors array, but return non-200 status only for transport-level failures (malformed JSON, missing query). In Apollo Server, throwing ApolloError (or its subclasses: AuthenticationError, ForbiddenError, UserInputError, NotFoundError) automatically populates the extensions.code field for clients to handle programmatically.',

    performanceTitle: 'Performance: DataLoader, Caching & Persisted Queries',
    performanceP1: 'The N+1 problem is the most common GraphQL performance pitfall. When resolving a list of posts and each post resolver fetches its author separately, you get N+1 database queries (1 for the list + N for authors). DataLoader solves this by batching all individual load() calls within a single event loop tick into a single batch request, and memoizing results within the same request.',
    performanceP2: 'Response caching can be implemented at multiple levels: Apollo Server\'s built-in @cacheControl directives set HTTP cache headers, Redis caching at the resolver level caches expensive computations, and Apollo Client\'s InMemoryCache handles client-side caching. Persisted queries replace full query strings with a hash, reducing request size and enabling GET-based CDN caching for queries.',

    comparisonTitle: 'GraphQL vs REST vs gRPC vs tRPC',
    comparisonP: 'Choosing the right API paradigm depends on your use case, team expertise, and infrastructure. Here is a comprehensive comparison of the four major API approaches in 2026:',

    faqTitle: 'Frequently Asked Questions',
    faq1q: 'Does GraphQL solve the over-fetching and under-fetching problem?',
    faq1a: 'Yes, this is GraphQL\'s primary design goal. Clients specify exactly which fields they need in their query, so the server returns precisely that data — no more, no less. This eliminates over-fetching (REST endpoints returning unused fields) and under-fetching (needing multiple REST round trips to assemble a complete page\'s data). For a complex dashboard page that needs user info, recent orders, and notifications, GraphQL does it in one request; REST would require three.',
    faq2q: 'How do GraphQL subscriptions work and when should I use them?',
    faq2a: 'Subscriptions are a GraphQL operation type (alongside Query and Mutation) that enables real-time data push from server to client via WebSocket connections. The server publishes events using a PubSub mechanism, and subscribed clients receive updates automatically. Use subscriptions for chat messages, live notifications, collaborative editing, stock price feeds, and any feature where clients need to react to server-side state changes in real time. For less frequent updates, polling with useQuery\'s pollInterval option is simpler to implement and scale.',
    faq3q: 'What is the difference between code-first and schema-first GraphQL?',
    faq3a: 'Schema-first (SDL-first) means you write the .graphql schema file manually, then write resolvers to match it. Code-first means you define your types in code (TypeScript decorators with TypeGraphQL, or objects with Pothos), and the SDL is generated automatically. Schema-first gives you the schema as a contract visible to all teams upfront; code-first avoids schema/resolver drift since types are co-located. Most large teams prefer schema-first for the explicit contract, while code-first is popular in TypeScript projects for end-to-end type safety without codegen.',
    faq4q: 'What is GraphQL Federation and when should I use it?',
    faq4a: 'GraphQL Federation (Apollo Federation) is a specification for composing multiple GraphQL subgraph services into a single unified supergraph API. Each team owns their subgraph schema (e.g., Users, Orders, Products), and a Router/Gateway stitches them together transparently. Use Federation when you have multiple backend services that each own part of the data graph and need to expose a unified API to clients — the microservices pattern for GraphQL. For monoliths or small teams, a single Apollo Server instance is simpler.',
    faq5q: 'How does GraphQL handle file uploads?',
    faq5a: 'GraphQL\'s default transport (JSON over HTTP) does not natively support binary file uploads. The community-standard solution is the GraphQL Multipart Request Specification (graphql-upload package for Node.js), which extends the GraphQL HTTP protocol to accept multipart/form-data with file streams mapped to query variables. Alternatively, many teams use a separate REST endpoint for file uploads and reference the returned URL in GraphQL mutations, keeping GraphQL for structured data only.',
    faq6q: 'Is GraphQL harder to cache than REST?',
    faq6a: 'Yes, HTTP-level caching is harder with GraphQL because all requests go to a single POST /graphql endpoint, so HTTP caches cannot differentiate responses by URL. Workarounds include: persisted queries (assign a hash ID to queries, use GET requests for cacheable queries — Apollo Client and Apollo Server both support this), Apollo Client\'s normalized InMemoryCache for client-side caching, CDN caching with Automatic Persisted Queries (APQ), and server-side response caching with Redis keyed on query + variables hash.',
    faq7q: 'What tools exist for GraphQL development and testing?',
    faq7a: 'Key tools: GraphiQL and Apollo Sandbox (in-browser IDE with schema explorer and query builder), Apollo Studio (cloud-based schema registry, operation metrics, alerts), GraphQL Inspector (schema diffing, breaking change detection), graphql-codegen (generate TypeScript types and React hooks from schema + operations), Rover CLI (Apollo Federation schema management), Postman and Insomnia (support GraphQL operations), and Apollo DevTools browser extension (inspect cache, active queries, mutations). For testing: Jest with @apollo/client MockedProvider for React components, and graphql-faker for generating mock data from schema.',
    faq8q: 'When should I NOT use GraphQL?',
    faq8a: 'Avoid GraphQL for: simple CRUD APIs where REST endpoints map naturally to resources; public APIs where consumers expect REST (most third-party developers know REST); file upload/download heavy workflows; services that primarily use HTTP caching (REST GET caching is much simpler); very small teams where GraphQL\'s setup overhead is not justified by benefits; and APIs consumed primarily by server-to-server calls where the flexibility of client-defined queries adds no value. tRPC is an excellent alternative for TypeScript monorepos where frontend and backend share the same codebase.',

    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'GraphQL uses a single endpoint and SDL schema to give clients full control over response shape, solving over/under-fetching.',
    takeaway2: 'Apollo Server resolvers receive (parent, args, context, info) — put auth user, DataLoaders, and data sources in context.',
    takeaway3: 'DataLoader is mandatory for production GraphQL: it batches N+1 resolver calls into single database queries per request tick.',
    takeaway4: 'Apollo Client\'s InMemoryCache normalizes by __typename + id, auto-updating all components when mutations return known objects.',
    takeaway5: 'Use cursor-based pagination (Relay spec) for stable, scalable pagination that handles concurrent data changes.',
    takeaway6: 'JWT auth lives in the HTTP layer; the context function decodes it before resolvers run.',
    takeaway7: 'Persisted queries + GET requests enable CDN caching for GraphQL; Redis handles server-side resolver cache.',
    takeaway8: 'GraphQL errors always return HTTP 200 — check the errors array, not the status code.',
  },
  zh: {
    title: 'GraphQL 完整指南 2026：Schema、Apollo、认证、分页与性能优化',
    description: '从 schema 定义到生产部署全面掌握 GraphQL。涵盖 SDL、Apollo Server、Apollo Client React Hooks、JWT 认证、游标分页、DataLoader 和性能优化。',
    tldr: 'GraphQL 是一种查询语言和运行时，让客户端可以从单一端点精确请求所需数据。使用 Apollo Server 构建后端（解析器、DataLoader 解决 N+1 问题），使用 Apollo Client 进行 React 开发（useQuery、useMutation、useSubscription），游标分页实现可扩展性，上下文中的 JWT 实现认证，Redis 缓存和持久化查询实现性能优化。',

    whatIsGraphqlTitle: '什么是 GraphQL？',
    whatIsGraphqlP1: 'GraphQL 是一种 API 查询语言和执行查询的服务端运行时，使用你为数据定义的类型系统。由 Facebook 于 2012 年开发、2015 年开源，它解决了 REST 的根本问题：过度获取太多数据、获取不足（需要多次往返），以及无法适应不同客户端需求的固定响应结构。',
    whatIsGraphqlP2: '其核心是 schema 优先。你用 Schema 定义语言（SDL）定义整个数据模型——类型、查询、变更和订阅——这个 schema 既是文档也是前后端之间的契约。每个 GraphQL API 都暴露单一端点（通常是 /graphql），接受 POST 请求形式的查询、变更或订阅。',
    whatIsGraphqlP3: '关键理念是客户端驱动响应结构。GraphQL 客户端发送描述所需精确字段的查询，服务器只解析这些字段并返回对应结构——不多不少。',

    sdlTitle: 'Schema 定义语言（SDL）',
    sdlP1: 'Schema 定义语言是 GraphQL 的类型系统语法。每个 GraphQL API 都从定义所有可用类型、查询、变更和订阅的 schema 开始。schema 是 API 能力的唯一真实来源。',
    sdlP2: 'SDL 支持标量类型（Int、Float、String、Boolean、ID）、对象类型、枚举类型、联合类型、接口类型和输入类型。非空字段用 ! 标记，列表使用 [] 表示法。深入理解 SDL 是所有 GraphQL 工作的基础。',

    apolloServerTitle: 'Apollo Server 设置与解析器',
    apolloServerP1: 'Apollo Server 是 Node.js 最流行的 GraphQL 服务器。它处理 HTTP 传输、查询解析和 schema 验证、解析器执行、错误格式化和自省。Apollo Server 4 可以独立使用，也可以作为 Express、Fastify 或任何 Node HTTP 框架的中间件。',
    apolloServerP2: '解析器是为 schema 中每个字段返回数据的函数。它们接收四个参数：parent（父字段的解析值）、args（查询中字段的参数）、context（共享请求上下文——认证用户、数据源、加载器）和 info（字段路径、schema、指令）。N+1 问题——获取列表后逐个获取关联记录导致 N+1 个查询——通过 DataLoader 批处理解决。',

    apolloClientTitle: 'Apollo Client 与 React Hooks',
    apolloClientP1: 'Apollo Client 是一个全面的 JavaScript 状态管理库，让你能用 GraphQL 管理本地和远程数据。对于 React，它提供基于 hooks 的 API：useQuery 用于获取数据，useMutation 用于发送变更，useSubscription 用于实时更新。Apollo Client 还包含规范化内存缓存（InMemoryCache），自动去重并在组件间更新相关数据。',
    apolloClientP2: 'InMemoryCache 通过 __typename + id 规范化对象。当变更返回与缓存对象相同 ID 的更新对象时，显示该数据的每个组件都会自动重新渲染——无需手动状态同步。缓存策略（cache-first、cache-and-network、network-only、no-cache）控制 Apollo 何时读取缓存还是请求网络。',

    authTitle: '认证与授权',
    authP1: 'GraphQL 的认证在 HTTP 层处理——通常通过带 JWT 或会话 cookie 的 Authorization 头——在任何解析器运行之前。Apollo Server 的 context 函数在每个请求上运行，解码令牌并将用户附加到 context，使其对所有解析器可用。',
    authP2: 'GraphQL 中的授权（谁能做什么）更加微妙，因为单一端点处理所有操作。常见模式包括解析器级守卫（解析前检查 context.user）、schema 指令（@auth、@hasRole）和中间件层。graphql-shield 库通过规则组合提供权限层。',

    paginationTitle: '分页：游标分页与 Relay 规范',
    paginationP1: 'GraphQL 支持两种主要分页方式：基于偏移的（skip/take 或 page/limit）和基于游标的。偏移分页简单但在并发插入或删除时会出问题。游标分页使用不透明游标（通常是 base64 编码的 ID 或时间戳）指向数据集中的特定位置，在数据变更时保持稳定。',
    paginationP2: 'Relay 连接规范是业界标准的游标分页契约。它定义了包含 edges（边对象数组，每个包含 node 和 cursor）和 pageInfo（hasNextPage、hasPreviousPage、startCursor、endCursor）的 Connection 类型。包括 Apollo Client 在内的大多数 GraphQL 客户端原生支持 Relay 规范。',

    errorHandlingTitle: 'GraphQL 错误处理',
    errorHandlingP1: 'GraphQL 有独特的错误模型：即使出现错误，每个响应都返回 HTTP 200。错误出现在顶级 errors 数组中，与任何部分数据并列。这与 REST 根本不同，REST 用 HTTP 状态码传达错误类别。errors 数组包含带有 message、locations、path（哪个字段失败）和 extensions（自定义错误代码）的对象。',
    errorHandlingP2: '最佳实践是始终为 GraphQL 错误返回 HTTP 200 并使用 errors 数组，只为传输层失败（格式错误的 JSON、缺少查询）返回非 200 状态。在 Apollo Server 中，抛出 ApolloError（或其子类：AuthenticationError、ForbiddenError、UserInputError、NotFoundError）会自动填充 extensions.code 字段供客户端以编程方式处理。',

    performanceTitle: '性能：DataLoader、缓存与持久化查询',
    performanceP1: 'N+1 问题是最常见的 GraphQL 性能陷阱。解析文章列表时，如果每个文章解析器单独获取作者，你会得到 N+1 个数据库查询（1 个获取列表 + N 个获取作者）。DataLoader 通过将单个事件循环 tick 内的所有 load() 调用批处理为单个批量请求来解决这个问题，并在同一请求内记忆化结果。',
    performanceP2: '响应缓存可以在多个级别实现：Apollo Server 的内置 @cacheControl 指令设置 HTTP 缓存头，解析器级别的 Redis 缓存缓存昂贵的计算，Apollo Client 的 InMemoryCache 处理客户端缓存。持久化查询用哈希替换完整查询字符串，减少请求大小并为查询启用基于 GET 的 CDN 缓存。',

    comparisonTitle: 'GraphQL vs REST vs gRPC vs tRPC',
    comparisonP: '选择正确的 API 范式取决于你的使用场景、团队专业知识和基础设施。以下是 2026 年四种主要 API 方式的全面比较：',

    faqTitle: '常见问题',
    faq1q: 'GraphQL 能解决过度获取和获取不足的问题吗？',
    faq1a: '是的，这是 GraphQL 的主要设计目标。客户端在查询中精确指定所需字段，服务器返回恰好那些数据。对于需要用户信息、最近订单和通知的复杂仪表板页面，GraphQL 只需一次请求；REST 则需要三次。',
    faq2q: 'GraphQL 订阅如何工作，什么时候应该使用？',
    faq2a: '订阅是一种 GraphQL 操作类型（与查询和变更并列），通过 WebSocket 连接实现从服务器到客户端的实时数据推送。服务器使用 PubSub 机制发布事件，订阅的客户端自动接收更新。对于不太频繁的更新，使用 useQuery 的 pollInterval 选项轮询更简单，且更易于扩展。',
    faq3q: '代码优先和 Schema 优先的 GraphQL 有什么区别？',
    faq3a: 'Schema 优先（SDL 优先）意味着手动编写 .graphql schema 文件，然后编写匹配的解析器。代码优先意味着用代码定义类型（使用 TypeGraphQL 的 TypeScript 装饰器或 Pothos），SDL 自动生成。大多数大型团队偏好 Schema 优先以获得显式契约，而代码优先在 TypeScript 项目中流行，可获得无需 codegen 的端到端类型安全。',
    faq4q: 'GraphQL Federation 是什么，什么时候应该使用？',
    faq4a: 'GraphQL Federation（Apollo Federation）是将多个 GraphQL 子图服务组合成单一统一超图 API 的规范。每个团队拥有自己的子图 schema（例如，用户、订单、产品），路由器/网关透明地将它们拼接在一起。当你有多个后端服务各自拥有数据图的一部分，且需要向客户端暴露统一 API 时使用 Federation——这是 GraphQL 的微服务模式。',
    faq5q: 'GraphQL 如何处理文件上传？',
    faq5a: 'GraphQL 的默认传输（HTTP 上的 JSON）不原生支持二进制文件上传。社区标准解决方案是 GraphQL 多部分请求规范（Node.js 的 graphql-upload 包），它扩展了 GraphQL HTTP 协议以接受将文件流映射到查询变量的 multipart/form-data。许多团队使用单独的 REST 端点进行文件上传，并在 GraphQL 变更中引用返回的 URL，将 GraphQL 仅用于结构化数据。',
    faq6q: 'GraphQL 比 REST 更难缓存吗？',
    faq6a: '是的，GraphQL 的 HTTP 级缓存更难，因为所有请求都去往单一的 POST /graphql 端点。解决方案包括：持久化查询（为查询分配哈希 ID，对可缓存查询使用 GET 请求）、Apollo Client 的规范化 InMemoryCache 用于客户端缓存、使用自动持久化查询（APQ）的 CDN 缓存，以及用 Redis 键入查询+变量哈希的服务端响应缓存。',
    faq7q: 'GraphQL 开发和测试有哪些工具？',
    faq7a: '关键工具：GraphiQL 和 Apollo Sandbox（带 schema 浏览器和查询构建器的浏览器 IDE）、Apollo Studio（基于云的 schema 注册表、操作指标、告警）、GraphQL Inspector（schema 差异、破坏性变更检测）、graphql-codegen（从 schema + 操作生成 TypeScript 类型和 React hooks）、Rover CLI（Apollo Federation schema 管理）、Apollo DevTools 浏览器扩展（检查缓存、活跃查询、变更）。',
    faq8q: '什么时候不应该使用 GraphQL？',
    faq8a: '以下情况避免使用 GraphQL：资源自然映射到端点的简单 CRUD API；消费者期望 REST 的公共 API；文件上传/下载繁重的工作流；主要使用 HTTP 缓存的服务；GraphQL 的设置开销不能被收益证明的非常小的团队；以及主要由服务到服务调用消费的 API，客户端定义查询的灵活性不增加价值。对于前后端共享代码库的 TypeScript 单体仓库，tRPC 是一个很好的替代方案。',

    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'GraphQL 使用单一端点和 SDL schema 让客户端完全控制响应结构，解决过度/不足获取问题。',
    takeaway2: 'Apollo Server 解析器接收 (parent, args, context, info)——将认证用户、DataLoader 和数据源放入 context。',
    takeaway3: 'DataLoader 对生产级 GraphQL 是必须的：它将 N+1 解析器调用批处理为每个请求 tick 的单次数据库查询。',
    takeaway4: 'Apollo Client 的 InMemoryCache 通过 __typename + id 规范化，当变更返回已知对象时自动更新所有组件。',
    takeaway5: '使用游标分页（Relay 规范）实现稳定、可扩展的分页，能处理并发数据变更。',
    takeaway6: 'JWT 认证在 HTTP 层处理；context 函数在解析器运行前解码令牌。',
    takeaway7: '持久化查询 + GET 请求为 GraphQL 启用 CDN 缓存；Redis 处理服务端解析器缓存。',
    takeaway8: 'GraphQL 错误始终返回 HTTP 200——检查 errors 数组，而不是状态码。',
  },
};

export default function GraphqlGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations['en'];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1q, acceptedAnswer: { '@type': 'Answer', text: t.faq1a } },
      { '@type': 'Question', name: t.faq2q, acceptedAnswer: { '@type': 'Answer', text: t.faq2a } },
      { '@type': 'Question', name: t.faq3q, acceptedAnswer: { '@type': 'Answer', text: t.faq3a } },
      { '@type': 'Question', name: t.faq4q, acceptedAnswer: { '@type': 'Answer', text: t.faq4a } },
      { '@type': 'Question', name: t.faq5q, acceptedAnswer: { '@type': 'Answer', text: t.faq5a } },
      { '@type': 'Question', name: t.faq6q, acceptedAnswer: { '@type': 'Answer', text: t.faq6a } },
      { '@type': 'Question', name: t.faq7q, acceptedAnswer: { '@type': 'Answer', text: t.faq7a } },
      { '@type': 'Question', name: t.faq8q, acceptedAnswer: { '@type': 'Answer', text: t.faq8a } },
    ],
  };

  const h2Style: React.CSSProperties = { fontSize: 22, fontWeight: 700, marginTop: 48, marginBottom: 16, color: 'var(--text-primary)' };
  const h3Style: React.CSSProperties = { fontSize: 17, fontWeight: 600, marginTop: 28, marginBottom: 10, color: '#6366f1' };
  const pStyle: React.CSSProperties = { lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 16 };
  const codeStyle: React.CSSProperties = {
    background: 'var(--bg-input, #1e1e2e)',
    border: '1px solid var(--border-color, #2d2d3f)',
    borderRadius: 8,
    padding: '16px 20px',
    overflowX: 'auto',
    fontSize: 13,
    lineHeight: 1.75,
    display: 'block',
    marginBottom: 24,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };
  const thStyle: React.CSSProperties = {
    background: 'var(--bg-input, #f8fafc)',
    border: '1px solid var(--border-color, #e2e8f0)',
    padding: '10px 14px',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 13,
  };
  const tdStyle: React.CSSProperties = {
    border: '1px solid var(--border-color, #e2e8f0)',
    padding: '10px 14px',
    fontSize: 13,
    verticalAlign: 'top',
    lineHeight: 1.6,
  };
  const tldrStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    borderRadius: '0 8px 8px 0',
    padding: '16px 20px',
    marginBottom: 32,
    lineHeight: 1.8,
    color: '#0c4a6e',
    fontSize: 15,
  };
  const takeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    padding: '20px 24px',
    marginBottom: 32,
  };
  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    background: '#6366f1',
    color: '#fff',
    borderRadius: 4,
    padding: '2px 8px',
    fontSize: 11,
    fontWeight: 700,
    marginRight: 8,
    verticalAlign: 'middle',
    letterSpacing: 0.5,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrStyle}>
        <strong style={{ display: 'block', marginBottom: 6, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, color: '#0284c7' }}>TL;DR</strong>
        {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: 12, fontSize: 15 }}>{t.takeawaysTitle}</strong>
        <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: 'var(--text-secondary, #475569)', fontSize: 14 }}>
          <li>{t.takeaway1}</li>
          <li>{t.takeaway2}</li>
          <li>{t.takeaway3}</li>
          <li>{t.takeaway4}</li>
          <li>{t.takeaway5}</li>
          <li>{t.takeaway6}</li>
          <li>{t.takeaway7}</li>
          <li>{t.takeaway8}</li>
        </ul>
      </div>

      {/* SECTION 1: What Is GraphQL */}
      <h2 style={h2Style}>{t.whatIsGraphqlTitle}</h2>
      <p style={pStyle}>{t.whatIsGraphqlP1}</p>
      <p style={pStyle}>{t.whatIsGraphqlP2}</p>
      <p style={pStyle}>{t.whatIsGraphqlP3}</p>

      <h3 style={h3Style}>Single Endpoint vs Multiple REST Endpoints</h3>
      <pre style={codeStyle}><code>{
'# REST: multiple endpoints, fixed shapes\n' +
'GET /api/users/42           # Returns ALL user fields (over-fetching)\n' +
'GET /api/users/42/posts     # Separate round trip (under-fetching)\n' +
'GET /api/users/42/followers # Yet another round trip\n' +
'\n' +
'# GraphQL: one endpoint, client-defined shape\n' +
'POST /graphql\n' +
'{\n' +
'  "query": "query { user(id: \\"42\\") { name avatar posts(limit: 3) { title } followersCount } }"\n' +
'}\n' +
'# Returns exactly: name, avatar, 3 post titles, follower count -- nothing else'
      }</code></pre>

      {/* SECTION 2: SDL */}
      <h2 style={h2Style}>{t.sdlTitle}</h2>
      <p style={pStyle}>{t.sdlP1}</p>
      <p style={pStyle}>{t.sdlP2}</p>

      <h3 style={h3Style}>Complete Schema Example with All SDL Features</h3>
      <pre style={codeStyle}><code>{
'# Custom scalars\n' +
'scalar DateTime\n' +
'scalar JSON\n' +
'\n' +
'# Enum types\n' +
'enum Role { ADMIN  EDITOR  VIEWER }\n' +
'enum PostStatus { DRAFT  PUBLISHED  ARCHIVED }\n' +
'\n' +
'# Interface\n' +
'interface Node { id: ID! }\n' +
'\n' +
'# Object types\n' +
'type User implements Node {\n' +
'  id: ID!\n' +
'  name: String!              # Non-null: field always present\n' +
'  email: String!\n' +
'  avatar: String             # Nullable: may be null\n' +
'  role: Role!\n' +
'  posts(limit: Int = 10, offset: Int = 0): [Post!]!\n' +
'  followersCount: Int!\n' +
'  createdAt: DateTime!\n' +
'}\n' +
'\n' +
'type Post implements Node {\n' +
'  id: ID!\n' +
'  title: String!\n' +
'  slug: String!\n' +
'  body: String!\n' +
'  status: PostStatus!\n' +
'  author: User!              # Resolved field -- triggers resolver\n' +
'  tags: [String!]!           # Non-null list of non-null strings\n' +
'  comments: [Comment!]!\n' +
'  publishedAt: DateTime      # Nullable DateTime\n' +
'  updatedAt: DateTime!\n' +
'}\n' +
'\n' +
'type Comment implements Node {\n' +
'  id: ID!\n' +
'  body: String!\n' +
'  author: User!\n' +
'  post: Post!\n' +
'  createdAt: DateTime!\n' +
'}\n' +
'\n' +
'# Input types (mutation arguments only)\n' +
'input CreatePostInput {\n' +
'  title: String!\n' +
'  body: String!\n' +
'  tags: [String!]\n' +
'  status: PostStatus = DRAFT   # Default value\n' +
'}\n' +
'\n' +
'input UpdatePostInput {\n' +
'  title: String    # All optional for partial update\n' +
'  body: String\n' +
'  tags: [String!]\n' +
'  status: PostStatus\n' +
'}\n' +
'\n' +
'input PostFilter {\n' +
'  status: PostStatus\n' +
'  authorId: ID\n' +
'  tag: String\n' +
'  search: String\n' +
'}\n' +
'\n' +
'# Root operation types\n' +
'type Query {\n' +
'  user(id: ID!): User\n' +
'  users(limit: Int = 20, offset: Int = 0): [User!]!\n' +
'  post(id: ID, slug: String): Post\n' +
'  posts(filter: PostFilter, limit: Int = 20, offset: Int = 0): [Post!]!\n' +
'  postsConnection(filter: PostFilter, first: Int, after: String): PostConnection!\n' +
'  me: User\n' +
'}\n' +
'\n' +
'type Mutation {\n' +
'  createPost(input: CreatePostInput!): Post!\n' +
'  updatePost(id: ID!, input: UpdatePostInput!): Post!\n' +
'  deletePost(id: ID!): Boolean!\n' +
'  publishPost(id: ID!): Post!\n' +
'  addComment(postId: ID!, body: String!): Comment!\n' +
'}\n' +
'\n' +
'type Subscription {\n' +
'  commentAdded(postId: ID!): Comment!\n' +
'  postPublished: Post!\n' +
'}\n' +
'\n' +
'# Relay-style cursor pagination types\n' +
'type PostConnection {\n' +
'  edges: [PostEdge!]!\n' +
'  pageInfo: PageInfo!\n' +
'  totalCount: Int!\n' +
'}\n' +
'type PostEdge {\n' +
'  node: Post!\n' +
'  cursor: String!\n' +
'}\n' +
'type PageInfo {\n' +
'  hasNextPage: Boolean!\n' +
'  hasPreviousPage: Boolean!\n' +
'  startCursor: String\n' +
'  endCursor: String\n' +
'}'
      }</code></pre>

      {/* SECTION 3: Apollo Server */}
      <h2 style={h2Style}>{t.apolloServerTitle}</h2>
      <p style={pStyle}>{t.apolloServerP1}</p>
      <p style={pStyle}>{t.apolloServerP2}</p>

      <h3 style={h3Style}>Apollo Server 4 with Express, Resolvers & DataLoader</h3>
      <pre style={codeStyle}><code>{
'// server.ts\n' +
'import { ApolloServer } from \'@apollo/server\';\n' +
'import { expressMiddleware } from \'@apollo/server/express4\';\n' +
'import { ApolloServerPluginDrainHttpServer } from \'@apollo/server/plugin/drainHttpServer\';\n' +
'import express from \'express\';\n' +
'import http from \'http\';\n' +
'import DataLoader from \'dataloader\';\n' +
'import { readFileSync } from \'fs\';\n' +
'\n' +
'const typeDefs = readFileSync(\'./schema.graphql\', \'utf-8\');\n' +
'\n' +
'// DataLoader factory -- create fresh loaders per request\n' +
'function createLoaders(db: Database) {\n' +
'  return {\n' +
'    // Batches N individual user.load(id) calls into:\n' +
'    // SELECT * FROM users WHERE id IN ($1, $2, ...$N)\n' +
'    userById: new DataLoader<string, User>(async (ids) => {\n' +
'      const users = await db.users.findByIds([...ids]);\n' +
'      const map = new Map(users.map((u: User) => [u.id, u]));\n' +
'      // Return in SAME ORDER as input ids (DataLoader requirement)\n' +
'      return ids.map(id => map.get(id) ?? new Error(\'User not found: \' + id));\n' +
'    }),\n' +
'    commentsByPostId: new DataLoader<string, Comment[]>(async (postIds) => {\n' +
'      const comments = await db.comments.findByPostIds([...postIds]);\n' +
'      const grouped = new Map<string, Comment[]>();\n' +
'      comments.forEach((c: Comment) => {\n' +
'        if (!grouped.has(c.postId)) grouped.set(c.postId, []);\n' +
'        grouped.get(c.postId)!.push(c);\n' +
'      });\n' +
'      return postIds.map(id => grouped.get(id) ?? []);\n' +
'    }),\n' +
'  };\n' +
'}\n' +
'\n' +
'const resolvers = {\n' +
'  Query: {\n' +
'    user: (_: unknown, { id }: { id: string }, { db }: Context) =>\n' +
'      db.users.findById(id),\n' +
'    posts: (_: unknown, { filter, limit, offset }: any, { db }: Context) =>\n' +
'      db.posts.findMany({ filter, limit, offset }),\n' +
'    postsConnection: async (_: unknown, { filter, first = 10, after }: any, { db }: Context) => {\n' +
'      const afterId = after ? Buffer.from(after, \'base64\').toString() : null;\n' +
'      const rows = await db.posts.findMany({\n' +
'        where: { ...filter, ...(afterId ? { id: { gt: afterId } } : {}) },\n' +
'        take: first + 1,\n' +
'        orderBy: { createdAt: \'desc\' },\n' +
'      });\n' +
'      const hasNextPage = rows.length > first;\n' +
'      const nodes = rows.slice(0, first);\n' +
'      const edges = nodes.map((node: any) => ({\n' +
'        node,\n' +
'        cursor: Buffer.from(node.id).toString(\'base64\'),\n' +
'      }));\n' +
'      return {\n' +
'        edges,\n' +
'        totalCount: await db.posts.count(filter),\n' +
'        pageInfo: {\n' +
'          hasNextPage,\n' +
'          hasPreviousPage: !!afterId,\n' +
'          startCursor: edges[0]?.cursor ?? null,\n' +
'          endCursor: edges[edges.length - 1]?.cursor ?? null,\n' +
'        },\n' +
'      };\n' +
'    },\n' +
'    me: (_: unknown, __: unknown, { user }: Context) => user ?? null,\n' +
'  },\n' +
'\n' +
'  Mutation: {\n' +
'    createPost: (_: unknown, { input }: any, { user, db }: Context) => {\n' +
'      if (!user) throw new AuthenticationError(\'Must be logged in\');\n' +
'      return db.posts.create({ ...input, authorId: user.id });\n' +
'    },\n' +
'    updatePost: async (_: unknown, { id, input }: any, { user, db }: Context) => {\n' +
'      const post = await db.posts.findById(id);\n' +
'      if (!post) throw new NotFoundError(\'Post\');\n' +
'      if (post.authorId !== user?.id) throw new ForbiddenError(\'Not your post\');\n' +
'      return db.posts.update(id, input);\n' +
'    },\n' +
'    deletePost: async (_: unknown, { id }: any, { user, db }: Context) => {\n' +
'      const post = await db.posts.findById(id);\n' +
'      if (post.authorId !== user?.id) throw new ForbiddenError(\'Not your post\');\n' +
'      await db.posts.delete(id);\n' +
'      return true;\n' +
'    },\n' +
'  },\n' +
'\n' +
'  // Field resolvers -- use loaders to prevent N+1\n' +
'  Post: {\n' +
'    author: (post: any, _: unknown, { loaders }: Context) =>\n' +
'      loaders.userById.load(post.authorId),\n' +
'    comments: (post: any, _: unknown, { loaders }: Context) =>\n' +
'      loaders.commentsByPostId.load(post.id),\n' +
'  },\n' +
'  User: {\n' +
'    posts: (user: any, { limit, offset }: any, { db }: Context) =>\n' +
'      db.posts.findByAuthorId(user.id, { limit, offset }),\n' +
'    followersCount: (user: any, _: unknown, { db }: Context) =>\n' +
'      db.follows.countByFolloweeId(user.id),\n' +
'  },\n' +
'  Subscription: {\n' +
'    commentAdded: {\n' +
'      subscribe: (_: unknown, { postId }: any, { pubsub }: Context) =>\n' +
'        pubsub.asyncIterator(\'COMMENT_ADDED_\' + postId),\n' +
'    },\n' +
'    postPublished: {\n' +
'      subscribe: (_: unknown, __: unknown, { pubsub }: Context) =>\n' +
'        pubsub.asyncIterator(\'POST_PUBLISHED\'),\n' +
'    },\n' +
'  },\n' +
'};\n' +
'\n' +
'// Bootstrap\n' +
'const app = express();\n' +
'const httpServer = http.createServer(app);\n' +
'const server = new ApolloServer({\n' +
'  typeDefs,\n' +
'  resolvers,\n' +
'  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],\n' +
'  introspection: process.env.NODE_ENV !== \'production\',\n' +
'});\n' +
'await server.start();\n' +
'app.use(\'/graphql\', express.json(), expressMiddleware(server, {\n' +
'  context: async ({ req }) => {\n' +
'    const token = req.headers.authorization?.replace(\'Bearer \', \'\');\n' +
'    const user = token ? await verifyJWT(token) : null;\n' +
'    return { user, db, loaders: createLoaders(db), pubsub, redis };\n' +
'  },\n' +
'}));\n' +
'await new Promise<void>(r => httpServer.listen({ port: 4000 }, r));\n' +
'console.log(\'GraphQL server ready at http://localhost:4000/graphql\');'
      }</code></pre>

      {/* SECTION 4: Apollo Client */}
      <h2 style={h2Style}>{t.apolloClientTitle}</h2>
      <p style={pStyle}>{t.apolloClientP1}</p>
      <p style={pStyle}>{t.apolloClientP2}</p>

      <h3 style={h3Style}>Apollo Client Setup with Auth, Error Handling & WebSocket</h3>
      <pre style={codeStyle}><code>{
'// lib/apollo-client.ts\n' +
'import { ApolloClient, InMemoryCache, createHttpLink, from, split } from \'@apollo/client\';\n' +
'import { setContext } from \'@apollo/client/link/context\';\n' +
'import { onError } from \'@apollo/client/link/error\';\n' +
'import { GraphQLWsLink } from \'@apollo/client/link/subscriptions\';\n' +
'import { createClient } from \'graphql-ws\';\n' +
'import { getMainDefinition } from \'@apollo/client/utilities\';\n' +
'\n' +
'const httpLink = createHttpLink({\n' +
'  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? \'/graphql\',\n' +
'});\n' +
'\n' +
'// Attach JWT from localStorage to every HTTP request\n' +
'const authLink = setContext((_, { headers }) => {\n' +
'  const token = typeof window !== \'undefined\' ? localStorage.getItem(\'token\') : null;\n' +
'  return {\n' +
'    headers: { ...headers, ...(token ? { authorization: \'Bearer \' + token } : {}) },\n' +
'  };\n' +
'});\n' +
'\n' +
'// Centralized error handling\n' +
'const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {\n' +
'  if (graphQLErrors) {\n' +
'    for (const err of graphQLErrors) {\n' +
'      if (err.extensions?.code === \'UNAUTHENTICATED\') {\n' +
'        // Could refresh token here and retry with forward(operation)\n' +
'        window.dispatchEvent(new CustomEvent(\'apollo:unauthenticated\'));\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'  if (networkError) console.error(\'[Network error]\', networkError);\n' +
'});\n' +
'\n' +
'// WebSocket link for subscriptions (browser only)\n' +
'const wsLink = typeof window !== \'undefined\'\n' +
'  ? new GraphQLWsLink(createClient({\n' +
'      url: (process.env.NEXT_PUBLIC_GRAPHQL_URL ?? \'/graphql\').replace(/^http/, \'ws\'),\n' +
'      connectionParams: () => ({ authToken: localStorage.getItem(\'token\') }),\n' +
'      retryAttempts: 5,\n' +
'    }))\n' +
'  : null;\n' +
'\n' +
'// Route subscriptions -> WS, everything else -> HTTP\n' +
'const splitLink = wsLink\n' +
'  ? split(\n' +
'      ({ query }) => {\n' +
'        const def = getMainDefinition(query);\n' +
'        return def.kind === \'OperationDefinition\' && def.operation === \'subscription\';\n' +
'      },\n' +
'      wsLink,\n' +
'      from([errorLink, authLink, httpLink])\n' +
'    )\n' +
'  : from([errorLink, authLink, httpLink]);\n' +
'\n' +
'export const apolloClient = new ApolloClient({\n' +
'  link: splitLink,\n' +
'  cache: new InMemoryCache({\n' +
'    typePolicies: {\n' +
'      Post: { keyFields: [\'slug\'] },  // Cache Post by slug, not id\n' +
'      Query: {\n' +
'        fields: {\n' +
'          posts: {\n' +
'            keyArgs: [\'filter\'],       // Separate cache per filter combo\n' +
'            merge(existing = [], incoming, { args }) {\n' +
'              const merged = [...existing];\n' +
'              const offset = args?.offset ?? 0;\n' +
'              incoming.forEach((item: any, i: number) => {\n' +
'                merged[offset + i] = item;\n' +
'              });\n' +
'              return merged;\n' +
'            },\n' +
'          },\n' +
'        },\n' +
'      },\n' +
'    },\n' +
'  }),\n' +
'  defaultOptions: {\n' +
'    watchQuery: { fetchPolicy: \'cache-and-network\', errorPolicy: \'all\' },\n' +
'    query: { fetchPolicy: \'cache-first\', errorPolicy: \'all\' },\n' +
'  },\n' +
'});\n'
      }</code></pre>

      <h3 style={h3Style}>useQuery, useMutation, useSubscription in React</h3>
      <pre style={codeStyle}><code>{
'\'use client\';\n' +
'import { useQuery, useMutation, useSubscription, gql } from \'@apollo/client\';\n' +
'\n' +
'const GET_POSTS = gql`\n' +
'  query GetPosts($filter: PostFilter, $limit: Int!, $offset: Int!) {\n' +
'    posts(filter: $filter, limit: $limit, offset: $offset) {\n' +
'      id slug title\n' +
'      author { id name avatar }\n' +
'      tags publishedAt\n' +
'    }\n' +
'  }\n' +
'`;\n' +
'\n' +
'const CREATE_POST = gql`\n' +
'  mutation CreatePost($input: CreatePostInput!) {\n' +
'    createPost(input: $input) { id slug title status author { id name } }\n' +
'  }\n' +
'`;\n' +
'\n' +
'const POST_PUBLISHED = gql`\n' +
'  subscription OnPostPublished {\n' +
'    postPublished { id slug title author { name } }\n' +
'  }\n' +
'`;\n' +
'\n' +
'export function PostFeed() {\n' +
'  // --- useQuery: fetch with cache + loading states ---\n' +
'  const { data, loading, error, fetchMore, refetch } = useQuery(GET_POSTS, {\n' +
'    variables: { filter: { status: \'PUBLISHED\' }, limit: 10, offset: 0 },\n' +
'    notifyOnNetworkStatusChange: true,\n' +
'    pollInterval: 0, // Set to ms > 0 for polling\n' +
'  });\n' +
'\n' +
'  // --- useMutation: with optimistic update + cache write ---\n' +
'  const [createPost, { loading: creating, error: mutError }] = useMutation(CREATE_POST, {\n' +
'    optimisticResponse: ({ input }) => ({\n' +
'      createPost: {\n' +
'        __typename: \'Post\',\n' +
'        id: \'temp-\' + Date.now(),\n' +
'        slug: input.title.toLowerCase().replace(/\\s+/g, \'-\'),\n' +
'        title: input.title,\n' +
'        status: \'DRAFT\',\n' +
'        author: { __typename: \'User\', id: \'current\', name: \'You\' },\n' +
'      },\n' +
'    }),\n' +
'    update(cache, { data: { createPost: newPost } }) {\n' +
'      cache.modify({\n' +
'        fields: {\n' +
'          posts(existingRefs = []) {\n' +
'            const ref = cache.writeFragment({\n' +
'              data: newPost,\n' +
'              fragment: gql`fragment NewPost on Post { id slug title status author { id name } }`,\n' +
'            });\n' +
'            return [ref, ...existingRefs];\n' +
'          },\n' +
'        },\n' +
'      });\n' +
'    },\n' +
'  });\n' +
'\n' +
'  // --- useSubscription: receive real-time published posts ---\n' +
'  useSubscription(POST_PUBLISHED, {\n' +
'    onData: ({ client, data }) => {\n' +
'      const published = data.data?.postPublished;\n' +
'      if (published) {\n' +
'        client.cache.modify({\n' +
'          fields: {\n' +
'            posts(existing = []) {\n' +
'              const ref = client.cache.writeFragment({\n' +
'                data: published,\n' +
'                fragment: gql`fragment PubPost on Post { id slug title author { name } }`,\n' +
'              });\n' +
'              return [ref, ...existing];\n' +
'            },\n' +
'          },\n' +
'        });\n' +
'      }\n' +
'    },\n' +
'  });\n' +
'\n' +
'  if (error) return <div>Error: {error.message}</div>;\n' +
'  if (loading && !data) return <div>Loading posts...</div>;\n' +
'\n' +
'  const { posts = [] } = data ?? {};\n' +
'\n' +
'  return (\n' +
'    <div>\n' +
'      <button\n' +
'        disabled={creating}\n' +
'        onClick={() => createPost({ variables: { input: { title: \'New Post\', body: \'...\' } } })}\n' +
'      >\n' +
'        {creating ? \'Creating...\' : \'New Post\'}\n' +
'      </button>\n' +
'      {posts.map((post: any) => (\n' +
'        <article key={post.slug}>\n' +
'          <h2>{post.title}</h2>\n' +
'          <small>by {post.author.name}</small>\n' +
'        </article>\n' +
'      ))}\n' +
'      <button onClick={() => fetchMore({ variables: { offset: posts.length } })}>\n' +
'        Load more\n' +
'      </button>\n' +
'    </div>\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* SECTION 5: Auth */}
      <h2 style={h2Style}>{t.authTitle}</h2>
      <p style={pStyle}>{t.authP1}</p>
      <p style={pStyle}>{t.authP2}</p>

      <h3 style={h3Style}>JWT Context Function + graphql-shield Permission Rules</h3>
      <pre style={codeStyle}><code>{
'// auth/jwt.ts\n' +
'import jwt from \'jsonwebtoken\';\n' +
'\n' +
'export async function verifyJWT(token: string): Promise<User | null> {\n' +
'  try {\n' +
'    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };\n' +
'    return await db.users.findById(payload.userId);\n' +
'  } catch {\n' +
'    return null;\n' +
'  }\n' +
'}\n' +
'\n' +
'// Context function (runs on every request before any resolver)\n' +
'export async function createContext({ req }: { req: Request }) {\n' +
'  const auth = req.headers.get(\'authorization\') ?? \'\';\n' +
'  const token = auth.startsWith(\'Bearer \') ? auth.slice(7) : null;\n' +
'  const user = token ? await verifyJWT(token) : null;\n' +
'  return { user, db, loaders: createLoaders(db), pubsub, redis };\n' +
'}\n' +
'\n' +
'// auth/permissions.ts -- graphql-shield\n' +
'import { shield, rule, and, or } from \'graphql-shield\';\n' +
'\n' +
'const isAuthenticated = rule({ cache: \'contextual\' })(\n' +
'  async (_, __, ctx: Context) => ctx.user !== null || \'Must be logged in\'\n' +
');\n' +
'\n' +
'const isAdmin = rule({ cache: \'contextual\' })(\n' +
'  async (_, __, ctx: Context) => ctx.user?.role === \'ADMIN\' || \'Admin only\'\n' +
');\n' +
'\n' +
'const isPostOwner = rule({ cache: \'strict\' })(\n' +
'  async (_, { id }, ctx: Context) => {\n' +
'    const post = await ctx.db.posts.findById(id);\n' +
'    return post?.authorId === ctx.user?.id || \'Not your post\';\n' +
'  }\n' +
');\n' +
'\n' +
'export const permissions = shield(\n' +
'  {\n' +
'    Query:    { me: isAuthenticated, users: isAdmin },\n' +
'    Mutation: {\n' +
'      createPost: isAuthenticated,\n' +
'      updatePost: and(isAuthenticated, or(isPostOwner, isAdmin)),\n' +
'      deletePost: and(isAuthenticated, or(isPostOwner, isAdmin)),\n' +
'    },\n' +
'  },\n' +
'  { fallbackError: \'Not authorized\', allowExternalErrors: true }\n' +
');\n' +
'\n' +
'// Schema directive alternative (@auth in SDL)\n' +
'// directive @auth on FIELD_DEFINITION\n' +
'// type Mutation {\n' +
'//   createPost(input: CreatePostInput!): Post! @auth\n' +
'// }\n' +
'//\n' +
'// Transformer using @graphql-tools/schema:\n' +
'// mapSchema(schema, {\n' +
'//   [MapperKind.OBJECT_FIELD]: (fieldConfig) => {\n' +
'//     if (!getDirective(schema, fieldConfig, \'auth\')?.[0]) return fieldConfig;\n' +
'//     const { resolve = defaultFieldResolver } = fieldConfig;\n' +
'//     return { ...fieldConfig, resolve(src, args, ctx, info) {\n' +
'//       if (!ctx.user) throw new AuthenticationError();\n' +
'//       return resolve(src, args, ctx, info);\n' +
'//     }};\n' +
'//   },\n' +
'// });'
      }</code></pre>

      {/* SECTION 6: Pagination */}
      <h2 style={h2Style}>{t.paginationTitle}</h2>
      <p style={pStyle}>{t.paginationP1}</p>
      <p style={pStyle}>{t.paginationP2}</p>

      <h3 style={h3Style}>Relay Cursor Pagination — Server & Client</h3>
      <pre style={codeStyle}><code>{
'// Server: postsConnection resolver\n' +
'async function postsConnection(\n' +
'  _: unknown,\n' +
'  { filter, first = 10, after }: { filter?: any; first?: number; after?: string },\n' +
'  { db }: Context\n' +
') {\n' +
'  // Decode the opaque cursor (base64 of the row ID)\n' +
'  const afterId = after\n' +
'    ? Buffer.from(after, \'base64\').toString(\'utf-8\')\n' +
'    : null;\n' +
'\n' +
'  // Fetch one extra row to determine if there is a next page\n' +
'  const rows = await db.posts.findMany({\n' +
'    where: { ...filter, ...(afterId ? { id: { gt: afterId } } : {}) },\n' +
'    orderBy: { createdAt: \'desc\' },\n' +
'    take: first + 1,\n' +
'  });\n' +
'\n' +
'  const hasNextPage = rows.length > first;\n' +
'  const nodes = rows.slice(0, first);\n' +
'  const edges = nodes.map((node: any) => ({\n' +
'    node,\n' +
'    cursor: Buffer.from(String(node.id)).toString(\'base64\'),\n' +
'  }));\n' +
'\n' +
'  return {\n' +
'    edges,\n' +
'    totalCount: await db.posts.count({ where: filter }),\n' +
'    pageInfo: {\n' +
'      hasNextPage,\n' +
'      hasPreviousPage: !!afterId,\n' +
'      startCursor: edges[0]?.cursor ?? null,\n' +
'      endCursor: edges[edges.length - 1]?.cursor ?? null,\n' +
'    },\n' +
'  };\n' +
'}\n' +
'\n' +
'// Client: useQuery with fetchMore (infinite scroll)\n' +
'const POSTS_CONNECTION = gql`\n' +
'  query PostsConnection($filter: PostFilter, $first: Int!, $after: String) {\n' +
'    postsConnection(filter: $filter, first: $first, after: $after) {\n' +
'      edges { cursor  node { id slug title author { name } } }\n' +
'      pageInfo { hasNextPage endCursor }\n' +
'      totalCount\n' +
'    }\n' +
'  }\n' +
'`;\n' +
'\n' +
'function PostsPaginated() {\n' +
'  const { data, fetchMore } = useQuery(POSTS_CONNECTION, {\n' +
'    variables: { first: 10 },\n' +
'  });\n' +
'\n' +
'  const conn = data?.postsConnection;\n' +
'\n' +
'  return (\n' +
'    <div>\n' +
'      {conn?.edges.map(({ node }: any) => (\n' +
'        <article key={node.id}><h3>{node.title}</h3></article>\n' +
'      ))}\n' +
'      {conn?.pageInfo.hasNextPage && (\n' +
'        <button\n' +
'          onClick={() =>\n' +
'            fetchMore({\n' +
'              variables: { after: conn.pageInfo.endCursor },\n' +
'              updateQuery(prev, { fetchMoreResult: next }) {\n' +
'                if (!next) return prev;\n' +
'                return {\n' +
'                  postsConnection: {\n' +
'                    ...next.postsConnection,\n' +
'                    edges: [\n' +
'                      ...prev.postsConnection.edges,\n' +
'                      ...next.postsConnection.edges,\n' +
'                    ],\n' +
'                  },\n' +
'                };\n' +
'              },\n' +
'            })\n' +
'          }\n' +
'        >\n' +
'          Load more ({conn.totalCount - conn.edges.length} remaining)\n' +
'        </button>\n' +
'      )}\n' +
'    </div>\n' +
'  );\n' +
'}'
      }</code></pre>

      {/* SECTION 7: Error Handling */}
      <h2 style={h2Style}>{t.errorHandlingTitle}</h2>
      <p style={pStyle}>{t.errorHandlingP1}</p>
      <p style={pStyle}>{t.errorHandlingP2}</p>

      <h3 style={h3Style}>Custom Error Classes + Response Shape + Client Handling</h3>
      <pre style={codeStyle}><code>{
'// errors.ts -- Custom error types with error codes\n' +
'import { GraphQLError } from \'graphql\';\n' +
'\n' +
'export class AuthenticationError extends GraphQLError {\n' +
'  constructor(msg = \'Authentication required\') {\n' +
'    super(msg, { extensions: { code: \'UNAUTHENTICATED\', http: { status: 401 } } });\n' +
'  }\n' +
'}\n' +
'export class ForbiddenError extends GraphQLError {\n' +
'  constructor(msg = \'Forbidden\') {\n' +
'    super(msg, { extensions: { code: \'FORBIDDEN\', http: { status: 403 } } });\n' +
'  }\n' +
'}\n' +
'export class NotFoundError extends GraphQLError {\n' +
'  constructor(resource: string) {\n' +
'    super(resource + \' not found\', { extensions: { code: \'NOT_FOUND\' } });\n' +
'  }\n' +
'}\n' +
'export class ValidationError extends GraphQLError {\n' +
'  constructor(msg: string, fields?: Record<string, string>) {\n' +
'    super(msg, { extensions: { code: \'VALIDATION_ERROR\', fields } });\n' +
'  }\n' +
'}\n' +
'\n' +
'// GraphQL response with errors (HTTP 200 always):\n' +
'// {\n' +
'//   "data": { "createPost": null },\n' +
'//   "errors": [{\n' +
'//     "message": "Authentication required",\n' +
'//     "locations": [{ "line": 2, "column": 3 }],\n' +
'//     "path": ["createPost"],\n' +
'//     "extensions": { "code": "UNAUTHENTICATED" }\n' +
'//   }]\n' +
'// }\n' +
'\n' +
'// Partial data with errors (errorPolicy: "all"):\n' +
'// {\n' +
'//   "data": { "me": { "name": "Alice" }, "adminStats": null },\n' +
'//   "errors": [{ "path": ["adminStats"], "extensions": { "code": "FORBIDDEN" } }]\n' +
'// }\n' +
'\n' +
'// Client: programmatic error handling by code\n' +
'function useTypedMutation(mutation: any, options?: any) {\n' +
'  const [mutate, result] = useMutation(mutation, {\n' +
'    errorPolicy: \'all\',\n' +
'    ...options,\n' +
'  });\n' +
'\n' +
'  function getErrorByCode(code: string) {\n' +
'    return result.error?.graphQLErrors.find(\n' +
'      (e) => e.extensions?.code === code\n' +
'    );\n' +
'  }\n' +
'\n' +
'  return [\n' +
'    mutate,\n' +
'    {\n' +
'      ...result,\n' +
'      isUnauthenticated: !!getErrorByCode(\'UNAUTHENTICATED\'),\n' +
'      isForbidden:       !!getErrorByCode(\'FORBIDDEN\'),\n' +
'      isNotFound:        !!getErrorByCode(\'NOT_FOUND\'),\n' +
'      validationFields:  getErrorByCode(\'VALIDATION_ERROR\')?.extensions?.fields,\n' +
'      isNetworkError:    !!result.error?.networkError,\n' +
'    },\n' +
'  ] as const;\n' +
'}'
      }</code></pre>

      {/* SECTION 8: Performance */}
      <h2 style={h2Style}>{t.performanceTitle}</h2>
      <p style={pStyle}>{t.performanceP1}</p>
      <p style={pStyle}>{t.performanceP2}</p>

      <h3 style={h3Style}>DataLoader Batching + Redis Resolver Cache + APQ</h3>
      <pre style={codeStyle}><code>{
'// DataLoader: the N+1 solution\n' +
'// Without DataLoader:\n' +
'//   Resolving 20 posts -> 20 x "SELECT * FROM users WHERE id = $1" = 21 queries\n' +
'// With DataLoader:\n' +
'//   Resolving 20 posts -> 1 x "SELECT * FROM users WHERE id IN (...)" = 2 queries\n' +
'\n' +
'import DataLoader from \'dataloader\';\n' +
'\n' +
'export function createUserLoader(db: any) {\n' +
'  return new DataLoader<string, any>(\n' +
'    async (ids) => {\n' +
'      const rows = await db.query(\n' +
'        \'SELECT * FROM users WHERE id = ANY($1::uuid[])\',\n' +
'        [[...ids]]\n' +
'      );\n' +
'      const map = new Map(rows.map((r: any) => [r.id, r]));\n' +
'      return ids.map(id => map.get(id) ?? new Error(\'User \' + id + \' not found\'));\n' +
'    },\n' +
'    { maxBatchSize: 500, cache: true }\n' +
'  );\n' +
'}\n' +
'\n' +
'// Redis caching at resolver level\n' +
'import type { Redis } from \'ioredis\';\n' +
'\n' +
'async function cachedResolver<T>(\n' +
'  redis: Redis,\n' +
'  key: string,\n' +
'  ttlSeconds: number,\n' +
'  fetchFn: () => Promise<T>\n' +
'): Promise<T> {\n' +
'  const cached = await redis.get(key);\n' +
'  if (cached) return JSON.parse(cached) as T;\n' +
'  const result = await fetchFn();\n' +
'  await redis.setex(key, ttlSeconds, JSON.stringify(result));\n' +
'  return result;\n' +
'}\n' +
'\n' +
'// Usage in resolver:\n' +
'Query: {\n' +
'  posts: async (_, args, { db, redis }) =>\n' +
'    cachedResolver(\n' +
'      redis,\n' +
'      \'posts:\' + JSON.stringify(args),\n' +
'      60, // 60 second TTL\n' +
'      () => db.posts.findMany(args)\n' +
'    ),\n' +
'},\n' +
'\n' +
'// Automatic Persisted Queries (APQ)\n' +
'// -- cuts request body from ~500B to ~50B\n' +
'// -- enables GET requests for CDN caching\n' +
'import { createPersistedQueryLink } from \'@apollo/client/link/persisted-queries\';\n' +
'import { sha256 } from \'crypto-hash\';\n' +
'\n' +
'const apqLink = createPersistedQueryLink({\n' +
'  sha256,\n' +
'  useGETForHashedQueries: true, // Enables CDN GET caching\n' +
'});\n' +
'\n' +
'// Client flow:\n' +
'// 1. Send: POST /graphql { extensions: { persistedQuery: { sha256Hash: "abc" } } }\n' +
'// 2. Server miss: returns PersistedQueryNotFound\n' +
'// 3. Client retries: POST /graphql { query: "...", extensions: { persistedQuery: { sha256Hash: "abc" } } }\n' +
'// 4. Server stores hash, executes, responds\n' +
'// 5. Next time: GET /graphql?extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%22abc%22%7D%7D\n' +
'// 6. CDN can cache this GET response!\n' +
'\n' +
'// @cacheControl directive (HTTP cache headers)\n' +
'// type Query {\n' +
'//   publicPosts: [Post!]! @cacheControl(maxAge: 300, scope: PUBLIC)\n' +
'//   me: User @cacheControl(maxAge: 0, scope: PRIVATE)\n' +
'// }'
      }</code></pre>

      {/* SECTION 9: Comparison Table */}
      <h2 style={h2Style}>{t.comparisonTitle}</h2>
      <p style={pStyle}>{t.comparisonP}</p>

      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={{ ...thStyle, color: '#e11d48' }}>GraphQL</th>
              <th style={{ ...thStyle, color: '#2563eb' }}>REST</th>
              <th style={{ ...thStyle, color: '#7c3aed' }}>gRPC</th>
              <th style={{ ...thStyle, color: '#059669' }}>tRPC</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Transport', 'HTTP + WebSocket', 'HTTP/1.1 or HTTP/2', 'HTTP/2 (binary)', 'HTTP (JSON)'],
              ['Endpoint', 'Single /graphql', 'One per resource', 'Service methods', 'Type-safe procedures'],
              ['Contract', 'SDL (.graphql file)', 'OpenAPI (optional)', 'Protocol Buffers', 'TypeScript types'],
              ['Type Safety', 'codegen required', 'OpenAPI + codegen', 'Built-in (proto gen)', 'Built-in (inferred)'],
              ['Over-fetching', 'Solved by design', 'Common problem', 'Solved (streaming)', 'Controlled per procedure'],
              ['HTTP Caching', 'Hard (needs APQ)', 'Simple GET caching', 'N/A', 'Needs setup'],
              ['Real-time', 'Subscriptions (WS)', 'SSE or WebSocket', 'Bidirectional streaming', 'Subscriptions'],
              ['File Upload', 'Multipart spec', 'Native multipart', 'Not standard', 'Separate REST endpoint'],
              ['Browser', 'Full support', 'Full support', 'grpc-web proxy only', 'Full support'],
              ['Learning Curve', 'Medium-High', 'Low', 'High', 'Low (TypeScript devs)'],
              ['N+1 Problem', 'DataLoader required', 'Managed per endpoint', 'Streaming mitigates', 'Co-location avoids it'],
              ['Versioning', 'Schema evolution', 'URL /v1 /v2', 'Proto backward compat', 'TypeScript refactor'],
              ['Ecosystem', 'Very large (Apollo)', 'Largest (universal)', 'Large (Google)', 'Growing (Vercel)'],
              ['Best For', 'Multi-client flexible APIs', 'Public/simple APIs', 'Internal microservices', 'Full-stack TS monorepo'],
            ].map(([feature, graphql, rest, grpc, trpc], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-input, rgba(0,0,0,0.02))' }}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{graphql}</td>
                <td style={tdStyle}>{rest}</td>
                <td style={tdStyle}>{grpc}</td>
                <td style={tdStyle}>{trpc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to use each */}
      <h3 style={h3Style}>Decision Guide: When to Use Each Approach</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 32 }}>
        {[
          {
            label: 'GraphQL',
            color: '#e11d48',
            bg: '#fff1f2',
            border: '#fecdd3',
            points: ['Multiple client types (web/mobile/IoT)', 'Complex nested data requirements', 'Rapid frontend iteration', 'Real-time subscriptions needed', 'Developer-facing flexible API'],
          },
          {
            label: 'REST',
            color: '#2563eb',
            bg: '#eff6ff',
            border: '#bfdbfe',
            points: ['Simple CRUD, URLs map to resources', 'Public API (universally understood)', 'Heavy HTTP GET caching', 'File upload/download workflows', 'Webhook / 3rd-party integrations'],
          },
          {
            label: 'gRPC',
            color: '#7c3aed',
            bg: '#f5f3ff',
            border: '#ddd6fe',
            points: ['High-performance internal services', 'Polyglot microservices (multi-language)', 'Bidirectional streaming required', 'Low-latency critical path', 'Contract-first with .proto files'],
          },
          {
            label: 'tRPC',
            color: '#059669',
            bg: '#ecfdf5',
            border: '#a7f3d0',
            points: ['Full-stack TypeScript monorepo', 'Next.js with shared type definitions', 'Small team, no separate API layer', 'Zero codegen, end-to-end types', 'Avoid REST/GraphQL boilerplate'],
          },
        ].map(({ label, color, bg, border, points }) => (
          <div key={label} style={{ background: bg, border: '1px solid ' + border, borderRadius: 8, padding: '14px 16px' }}>
            <div style={{ ...badgeStyle, background: color, marginBottom: 8, display: 'inline-block' }}>{label}</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.9, color: '#374151' }}>
              {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* SECTION 10: FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
      {[
        [t.faq1q, t.faq1a],
        [t.faq2q, t.faq2a],
        [t.faq3q, t.faq3a],
        [t.faq4q, t.faq4a],
        [t.faq5q, t.faq5a],
        [t.faq6q, t.faq6a],
        [t.faq7q, t.faq7a],
        [t.faq8q, t.faq8a],
      ].map(([q, a], i) => (
        <div
          key={i}
          style={{
            marginBottom: 16,
            padding: '16px 20px',
            background: 'var(--bg-input, #f8fafc)',
            borderRadius: 10,
            border: '1px solid var(--border-color, #e2e8f0)',
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
            {q}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary, #475569)', lineHeight: 1.75, margin: 0 }}>{a}</p>
        </div>
      ))}
    </div>
  );
}
