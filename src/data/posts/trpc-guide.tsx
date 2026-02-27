'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'tRPC: End-to-End Type-Safe APIs for TypeScript Full-Stack Apps',
    description: 'Learn how to build fully type-safe APIs with tRPC. This guide covers setup with Next.js and Express, routers, procedures, Zod validation, queries, mutations, middleware, context, error handling, React Query integration, subscriptions, testing, and performance optimization.',
    tldr: 'tRPC lets you build fully type-safe APIs without writing API schemas, code generation, or REST/GraphQL boilerplate. You define server procedures and call them from your client with full autocompletion and type checking. Changes to your API are caught by TypeScript at compile time, not by your users in production. It integrates natively with Zod for validation and React Query for data fetching.',
    keyTakeaway1: 'tRPC provides end-to-end type safety from server to client without schemas or code generation',
    keyTakeaway2: 'Built on top of React Query, giving you caching, deduplication, and background refetching for free',
    keyTakeaway3: 'Zod integration makes input validation type-safe and declarative',
    keyTakeaway4: 'Middleware and context enable authentication, authorization, and request-scoped data',
    keyTakeaway5: 'Works with Next.js App Router, Express, Fastify, and other frameworks',
    keyTakeaway6: 'Subscriptions via WebSockets for real-time features',
    h2WhatIs: 'What Is tRPC?',
    whatIsDesc: 'tRPC (TypeScript Remote Procedure Call) is a library that enables you to build type-safe APIs for TypeScript applications. Unlike REST or GraphQL, tRPC requires no API schema definition, no code generation step, and no runtime overhead for type checking. Your server-side procedure definitions become the single source of truth, and TypeScript ensures your client calls match exactly.',
    whatIsDesc2: 'With tRPC, when you rename a field on the server, TypeScript immediately flags every client usage that needs updating. When you add a required input parameter, the client code fails to compile until it provides it. This eliminates an entire class of bugs that traditionally plague full-stack development.',
    h2Setup: 'Setting Up tRPC with Next.js',
    setupDesc: 'The most common tRPC setup uses Next.js with the App Router. Here is how to install and configure everything from scratch.',
    h3Install: 'Installation',
    h3InitServer: 'Initialize the tRPC Server',
    h3AppRouter: 'Create the API Route Handler (Next.js App Router)',
    h3ClientSetup: 'Set Up the Client Provider',
    h2Express: 'Setting Up tRPC with Express',
    expressDesc: 'tRPC also works as a standalone Express middleware, which is useful if you are not using Next.js.',
    h2Routers: 'Routers and Procedures',
    routersDesc: 'Routers organize your API into logical groups. Procedures are the individual endpoints within a router. There are three types of procedures: queries (read data), mutations (write data), and subscriptions (real-time streams).',
    h3NestedRouters: 'Nested Routers',
    nestedRoutersDesc: 'You can nest routers to create a hierarchical API structure. This keeps your code organized as your API grows.',
    h2Validation: 'Input Validation with Zod',
    validationDesc: 'tRPC integrates with Zod for input validation. When you define an input schema, tRPC validates incoming data at runtime and infers the TypeScript type for your procedure handler automatically.',
    h3ComplexInputs: 'Complex Input Schemas',
    h2QueriesMutations: 'Queries and Mutations',
    queriesDesc: 'Queries fetch data and are called with useQuery on the client. Mutations modify data and are called with useMutation. Both are fully type-safe.',
    h3ClientCalls: 'Calling from the Client',
    h2Middleware: 'Middleware',
    middlewareDesc: 'Middleware lets you run shared logic before your procedures execute. Common uses include authentication checks, logging, rate limiting, and timing. Middleware can modify the context that gets passed to the procedure.',
    h3AuthMiddleware: 'Authentication Middleware',
    h2Context: 'Context',
    contextDesc: 'Context is data that is available to all procedures and middleware. It is created per-request and typically includes the database connection, the authenticated user, and other request-scoped state.',
    h2ErrorHandling: 'Error Handling',
    errorHandlingDesc: 'tRPC provides a TRPCError class for throwing structured errors with HTTP status codes. These errors are serialized and sent to the client where they can be caught and handled.',
    h3CustomFormatting: 'Custom Error Formatting',
    h2ReactQuery: 'React Query Integration',
    reactQueryDesc: 'tRPC wraps React Query (TanStack Query) to provide type-safe data fetching hooks. You get all React Query features like caching, background refetching, optimistic updates, and infinite queries with full type inference.',
    h3OptimisticUpdates: 'Optimistic Updates',
    h3InfiniteQueries: 'Infinite Queries',
    h2Subscriptions: 'Subscriptions (Real-Time)',
    subscriptionsDesc: 'Subscriptions use WebSockets to push data from the server to the client in real time. They are useful for chat applications, live dashboards, notifications, and collaborative editing.',
    h2Testing: 'Testing tRPC Procedures',
    testingDesc: 'You can test tRPC procedures directly by calling the router without an HTTP layer. This makes unit tests fast and simple.',
    h2Performance: 'Performance Tips',
    perfDesc: 'tRPC is already fast because it skips schema parsing and code generation, but there are additional optimizations you can apply.',
    perf1: 'Use HTTP batching: tRPC batches multiple requests into a single HTTP call by default, reducing network overhead',
    perf2: 'Enable transformer: Use superjson to serialize Dates, Maps, Sets, and other non-JSON types without manual conversion',
    perf3: 'Leverage React Query caching: Configure staleTime and gcTime to avoid unnecessary refetches',
    perf4: 'Use server-side calls: In Next.js Server Components, call procedures directly without HTTP overhead using createCallerFactory',
    perf5: 'Split routers: Use dynamic imports for large routers to reduce bundle size',
    perf6: 'Connection pooling: Reuse database connections in context creation instead of opening new ones per request',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How does tRPC differ from REST and GraphQL?',
    faq1A: 'REST requires manually maintaining API contracts and has no built-in type safety. GraphQL provides a schema but requires code generation to get TypeScript types. tRPC skips both the schema definition and code generation by using TypeScript inference directly. Your server code IS your API contract. The trade-off is that tRPC only works with TypeScript clients, while REST and GraphQL are language-agnostic.',
    faq2Q: 'Can I use tRPC with a non-TypeScript client (mobile app, Python)?',
    faq2A: 'tRPC is designed for TypeScript-to-TypeScript communication. For non-TypeScript clients, you can expose a REST or GraphQL API alongside tRPC, or use trpc-openapi to generate an OpenAPI spec from your tRPC router that any HTTP client can consume.',
    faq3Q: 'Does tRPC replace React Query?',
    faq3A: 'No, tRPC is built on top of React Query (TanStack Query). It uses React Query under the hood for caching, background refetching, optimistic updates, and all other React Query features. tRPC adds type-safe procedure calls on top of that foundation.',
    faq4Q: 'How do I handle file uploads with tRPC?',
    faq4A: 'tRPC does not natively handle multipart form data for file uploads. You can handle file uploads through a separate REST endpoint or use a presigned URL approach where tRPC returns a signed upload URL and the client uploads directly to cloud storage (S3, R2, etc).',
    faq5Q: 'Can I use tRPC without Next.js?',
    faq5A: 'Yes. tRPC has adapters for Express, Fastify, standalone Node.js HTTP server, AWS Lambda, Cloudflare Workers, and more. Next.js is the most common setup but not required. You can use any Node.js server framework.',
    faq6Q: 'Is tRPC production-ready?',
    faq6A: 'Yes. tRPC v11 is stable and used in production by companies of all sizes. It has been battle-tested since 2021 and is maintained actively by the core team and community contributors.',
    faq7Q: 'How do I version my tRPC API?',
    faq7A: 'Since tRPC is typically used within a single TypeScript monorepo, versioning is handled by your deployment process. If you need versioning for external consumers, use trpc-openapi to expose versioned REST endpoints alongside your tRPC procedures.',
    faq8Q: 'Does tRPC support server-side rendering?',
    faq8A: 'Yes. In Next.js, you can prefetch tRPC queries on the server using the createCaller API or React Server Components. The data is serialized to the client where React Query hydrates its cache, avoiding duplicate fetches on mount.',
  },
  zh: {
    title: 'tRPC：TypeScript 全栈应用的端到端类型安全 API',
    description: '学习如何使用 tRPC 构建完全类型安全的 API。本指南涵盖 Next.js 和 Express 设置、路由器、过程、Zod 验证、查询、变更、中间件、上下文、错误处理、React Query 集成、订阅、测试和性能优化。',
    tldr: 'tRPC 让你无需编写 API schema、代码生成或 REST/GraphQL 样板代码即可构建完全类型安全的 API。你在服务器上定义过程，然后从客户端调用，享有完整的自动补全和类型检查。API 的更改在编译时被 TypeScript 捕获，而不是在生产中由用户发现。它原生集成 Zod 进行验证，集成 React Query 进行数据获取。',
    keyTakeaway1: 'tRPC 无需 schema 或代码生成即可提供从服务器到客户端的端到端类型安全',
    keyTakeaway2: '基于 React Query 构建，免费获得缓存、去重和后台重新获取',
    keyTakeaway3: 'Zod 集成使输入验证类型安全且声明式',
    keyTakeaway4: '中间件和上下文实现认证、授权和请求范围数据',
    keyTakeaway5: '支持 Next.js App Router、Express、Fastify 等框架',
    keyTakeaway6: '通过 WebSocket 订阅实现实时功能',
    h2WhatIs: '什么是 tRPC？',
    whatIsDesc: 'tRPC（TypeScript 远程过程调用）是一个库，让你为 TypeScript 应用构建类型安全的 API。与 REST 或 GraphQL 不同，tRPC 不需要 API schema 定义、代码生成步骤或运行时类型检查开销。服务器端过程定义成为唯一的真相来源。',
    whatIsDesc2: '使用 tRPC，当你在服务器上重命名字段时，TypeScript 会立即标记每个需要更新的客户端用法。当你添加必需的输入参数时，客户端代码在提供之前无法编译。',
    h2Setup: '使用 Next.js 设置 tRPC',
    setupDesc: '最常见的 tRPC 设置使用 Next.js 的 App Router。以下是从零开始安装和配置的方法。',
    h3Install: '安装',
    h3InitServer: '初始化 tRPC 服务器',
    h3AppRouter: '创建 API 路由处理器（Next.js App Router）',
    h3ClientSetup: '设置客户端提供者',
    h2Express: '使用 Express 设置 tRPC',
    expressDesc: 'tRPC 也可以作为独立的 Express 中间件使用，适用于不使用 Next.js 的情况。',
    h2Routers: '路由器和过程',
    routersDesc: '路由器将 API 组织成逻辑组。过程是路由器中的单个端点。有三种类型：查询（读取数据）、变更（写入数据）和订阅（实时流）。',
    h3NestedRouters: '嵌套路由器',
    nestedRoutersDesc: '你可以嵌套路由器以创建层次化的 API 结构。随着 API 增长，这保持代码组织有序。',
    h2Validation: '使用 Zod 进行输入验证',
    validationDesc: 'tRPC 与 Zod 集成进行输入验证。定义输入 schema 时，tRPC 在运行时验证传入数据并自动推断过程处理器的 TypeScript 类型。',
    h3ComplexInputs: '复杂输入 Schema',
    h2QueriesMutations: '查询和变更',
    queriesDesc: '查询获取数据，在客户端用 useQuery 调用。变更修改数据，用 useMutation 调用。两者都完全类型安全。',
    h3ClientCalls: '从客户端调用',
    h2Middleware: '中间件',
    middlewareDesc: '中间件让你在过程执行前运行共享逻辑。常见用途包括认证检查、日志记录、速率限制和计时。',
    h3AuthMiddleware: '认证中间件',
    h2Context: '上下文',
    contextDesc: '上下文是所有过程和中间件可用的数据。它按请求创建，通常包含数据库连接、认证用户和其他请求范围状态。',
    h2ErrorHandling: '错误处理',
    errorHandlingDesc: 'tRPC 提供 TRPCError 类，用于抛出带 HTTP 状态码的结构化错误。这些错误被序列化并发送到客户端。',
    h3CustomFormatting: '自定义错误格式化',
    h2ReactQuery: 'React Query 集成',
    reactQueryDesc: 'tRPC 包装 React Query（TanStack Query）提供类型安全的数据获取 hooks。你可以获得所有 React Query 功能。',
    h3OptimisticUpdates: '乐观更新',
    h3InfiniteQueries: '无限查询',
    h2Subscriptions: '订阅（实时）',
    subscriptionsDesc: '订阅使用 WebSocket 将数据从服务器实时推送到客户端。适用于聊天、实时仪表板、通知等。',
    h2Testing: '测试 tRPC 过程',
    testingDesc: '你可以直接调用路由器来测试 tRPC 过程，无需 HTTP 层。这使单元测试快速而简单。',
    h2Performance: '性能优化技巧',
    perfDesc: 'tRPC 本身已经很快，但还有额外的优化可以应用。',
    perf1: '使用 HTTP 批处理：tRPC 默认将多个请求批处理为单个 HTTP 调用',
    perf2: '启用转换器：使用 superjson 序列化 Date、Map、Set 等非 JSON 类型',
    perf3: '利用 React Query 缓存：配置 staleTime 和 gcTime 避免不必要的重新获取',
    perf4: '使用服务端调用：在 Next.js Server Components 中直接调用过程',
    perf5: '拆分路由器：对大型路由器使用动态导入以减少包大小',
    perf6: '连接池：在上下文创建中重用数据库连接',
    h2Faq: '常见问题',
    faq1Q: 'tRPC 与 REST 和 GraphQL 有何不同？',
    faq1A: 'REST 需要手动维护 API 契约且没有内置类型安全。GraphQL 提供 schema 但需要代码生成获取 TypeScript 类型。tRPC 通过直接使用 TypeScript 推断跳过两者。缺点是 tRPC 仅适用于 TypeScript 客户端。',
    faq2Q: '能否将 tRPC 与非 TypeScript 客户端一起使用？',
    faq2A: 'tRPC 专为 TypeScript 到 TypeScript 通信设计。对于非 TypeScript 客户端，可以使用 trpc-openapi 生成 OpenAPI 规范。',
    faq3Q: 'tRPC 是否取代 React Query？',
    faq3A: '不是。tRPC 基于 React Query 构建，在其之上添加类型安全的过程调用。',
    faq4Q: '如何用 tRPC 处理文件上传？',
    faq4A: 'tRPC 不原生处理文件上传。可以使用单独的 REST 端点或预签名 URL 方式。',
    faq5Q: '不使用 Next.js 能用 tRPC 吗？',
    faq5A: '可以。tRPC 有 Express、Fastify、AWS Lambda、Cloudflare Workers 等适配器。',
    faq6Q: 'tRPC 可以用于生产吗？',
    faq6A: '可以。tRPC v11 稳定且被各种规模的公司用于生产环境。',
    faq7Q: '如何对 tRPC API 进行版本管理？',
    faq7A: '在 TypeScript monorepo 中，版本管理由部署流程处理。对于外部消费者，使用 trpc-openapi 暴露版本化的 REST 端点。',
    faq8Q: 'tRPC 支持服务端渲染吗？',
    faq8A: '支持。在 Next.js 中，可以使用 createCaller API 或 React Server Components 在服务器上预获取查询。',
  },
};

export default function TrpcGuide({ lang }: { lang: string }) {
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

  const codeStyle = {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };
  const h2Style = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#0f172a' };
  const h3Style = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' };
  const pStyle = { marginBottom: '1rem', lineHeight: '1.75' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem 1.5rem', borderRadius: '0 0.5rem 0.5rem 0', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.75' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.75rem' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.keyTakeaway1, t.keyTakeaway2, t.keyTakeaway3, t.keyTakeaway4, t.keyTakeaway5, t.keyTakeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* What Is tRPC */}
      <h2 style={h2Style}>{t.h2WhatIs}</h2>
      <p style={pStyle}>{t.whatIsDesc}</p>
      <p style={pStyle}>{t.whatIsDesc2}</p>
      <pre style={codeStyle}><code>{'// Traditional REST workflow:\n' +
        '// 1. Define REST routes on server\n' +
        '// 2. Write fetch calls on client\n' +
        '// 3. Manually type the response\n' +
        '// 4. Hope they stay in sync\n' +
        '\n' +
        '// tRPC workflow:\n' +
        '// 1. Define a procedure on the server\n' +
        'const appRouter = router({\n' +
        '  getUser: publicProcedure\n' +
        '    .input(z.object({ id: z.string() }))\n' +
        '    .query(({ input }) => {\n' +
        '      return db.user.findUnique({ where: { id: input.id } });\n' +
        '    }),\n' +
        '});\n' +
        '\n' +
        '// 2. Call it from the client — fully typed!\n' +
        'const { data } = trpc.getUser.useQuery({ id: "123" });\n' +
        '// data is automatically typed as User | null\n' +
        '// TypeScript error if you pass wrong input shape'}</code></pre>

      {/* Setup with Next.js */}
      <h2 style={h2Style}>{t.h2Setup}</h2>
      <p style={pStyle}>{t.setupDesc}</p>

      <h3 style={h3Style}>{t.h3Install}</h3>
      <pre style={codeStyle}><code>{'npm install @trpc/server @trpc/client @trpc/react-query \\\n' +
        '  @trpc/next @tanstack/react-query zod superjson'}</code></pre>

      <h3 style={h3Style}>{t.h3InitServer}</h3>
      <pre style={codeStyle}><code>{'// src/server/trpc.ts\n' +
        'import { initTRPC, TRPCError } from "@trpc/server";\n' +
        'import superjson from "superjson";\n' +
        'import { ZodError } from "zod";\n' +
        '\n' +
        'export const createTRPCContext = async (opts: {\n' +
        '  headers: Headers;\n' +
        '}) => {\n' +
        '  const session = await getServerSession();\n' +
        '  return {\n' +
        '    db: prisma,\n' +
        '    session,\n' +
        '    headers: opts.headers,\n' +
        '  };\n' +
        '};\n' +
        '\n' +
        'const t = initTRPC.context<typeof createTRPCContext>().create({\n' +
        '  transformer: superjson,\n' +
        '  errorFormatter({ shape, error }) {\n' +
        '    return {\n' +
        '      ...shape,\n' +
        '      data: {\n' +
        '        ...shape.data,\n' +
        '        zodError:\n' +
        '          error.cause instanceof ZodError\n' +
        '            ? error.cause.flatten()\n' +
        '            : null,\n' +
        '      },\n' +
        '    };\n' +
        '  },\n' +
        '});\n' +
        '\n' +
        'export const router = t.router;\n' +
        'export const publicProcedure = t.procedure;\n' +
        'export const createCallerFactory = t.createCallerFactory;'}</code></pre>

      <h3 style={h3Style}>{t.h3AppRouter}</h3>
      <pre style={codeStyle}><code>{'// src/app/api/trpc/[trpc]/route.ts\n' +
        'import { fetchRequestHandler } from "@trpc/server/adapters/fetch";\n' +
        'import { appRouter } from "@/server/routers/_app";\n' +
        'import { createTRPCContext } from "@/server/trpc";\n' +
        '\n' +
        'const handler = (req: Request) =>\n' +
        '  fetchRequestHandler({\n' +
        '    endpoint: "/api/trpc",\n' +
        '    req,\n' +
        '    router: appRouter,\n' +
        '    createContext: () =>\n' +
        '      createTRPCContext({ headers: req.headers }),\n' +
        '  });\n' +
        '\n' +
        'export { handler as GET, handler as POST };'}</code></pre>

      <h3 style={h3Style}>{t.h3ClientSetup}</h3>
      <pre style={codeStyle}><code>{'// src/lib/trpc.ts\n' +
        'import { createTRPCReact } from "@trpc/react-query";\n' +
        'import type { AppRouter } from "@/server/routers/_app";\n' +
        '\n' +
        'export const trpc = createTRPCReact<AppRouter>();\n' +
        '\n' +
        '// src/app/providers.tsx\n' +
        '"use client";\n' +
        'import { QueryClient, QueryClientProvider } from "@tanstack/react-query";\n' +
        'import { httpBatchLink } from "@trpc/client";\n' +
        'import { trpc } from "@/lib/trpc";\n' +
        'import superjson from "superjson";\n' +
        'import { useState } from "react";\n' +
        '\n' +
        'export function TRPCProvider({ children }: { children: React.ReactNode }) {\n' +
        '  const [queryClient] = useState(() => new QueryClient({\n' +
        '    defaultOptions: {\n' +
        '      queries: { staleTime: 5 * 60 * 1000 },\n' +
        '    },\n' +
        '  }));\n' +
        '  const [trpcClient] = useState(() =>\n' +
        '    trpc.createClient({\n' +
        '      links: [\n' +
        '        httpBatchLink({\n' +
        '          url: "/api/trpc",\n' +
        '          transformer: superjson,\n' +
        '        }),\n' +
        '      ],\n' +
        '    })\n' +
        '  );\n' +
        '\n' +
        '  return (\n' +
        '    <trpc.Provider client={trpcClient} queryClient={queryClient}>\n' +
        '      <QueryClientProvider client={queryClient}>\n' +
        '        {children}\n' +
        '      </QueryClientProvider>\n' +
        '    </trpc.Provider>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Express Setup */}
      <h2 style={h2Style}>{t.h2Express}</h2>
      <p style={pStyle}>{t.expressDesc}</p>
      <pre style={codeStyle}><code>{'// server.ts\n' +
        'import express from "express";\n' +
        'import * as trpcExpress from "@trpc/server/adapters/express";\n' +
        'import { appRouter } from "./routers/_app";\n' +
        'import { createTRPCContext } from "./trpc";\n' +
        '\n' +
        'const app = express();\n' +
        '\n' +
        'app.use(\n' +
        '  "/api/trpc",\n' +
        '  trpcExpress.createExpressMiddleware({\n' +
        '    router: appRouter,\n' +
        '    createContext: ({ req, res }) => ({\n' +
        '      db: prisma,\n' +
        '      session: req.session,\n' +
        '    }),\n' +
        '  })\n' +
        ');\n' +
        '\n' +
        'app.listen(3000, () => {\n' +
        '  console.log("Server running on port 3000");\n' +
        '});'}</code></pre>

      {/* Routers and Procedures */}
      <h2 style={h2Style}>{t.h2Routers}</h2>
      <p style={pStyle}>{t.routersDesc}</p>
      <pre style={codeStyle}><code>{'// src/server/routers/user.ts\n' +
        'import { z } from "zod";\n' +
        'import { router, publicProcedure, protectedProcedure } from "../trpc";\n' +
        '\n' +
        'export const userRouter = router({\n' +
        '  // Query: fetch data (GET-like)\n' +
        '  getById: publicProcedure\n' +
        '    .input(z.object({ id: z.string() }))\n' +
        '    .query(async ({ ctx, input }) => {\n' +
        '      return ctx.db.user.findUnique({\n' +
        '        where: { id: input.id },\n' +
        '      });\n' +
        '    }),\n' +
        '\n' +
        '  // Query: list with pagination\n' +
        '  list: publicProcedure\n' +
        '    .input(z.object({\n' +
        '      page: z.number().int().min(1).default(1),\n' +
        '      limit: z.number().int().min(1).max(100).default(20),\n' +
        '    }))\n' +
        '    .query(async ({ ctx, input }) => {\n' +
        '      const { page, limit } = input;\n' +
        '      const [users, total] = await Promise.all([\n' +
        '        ctx.db.user.findMany({\n' +
        '          skip: (page - 1) * limit,\n' +
        '          take: limit,\n' +
        '        }),\n' +
        '        ctx.db.user.count(),\n' +
        '      ]);\n' +
        '      return { users, total, pages: Math.ceil(total / limit) };\n' +
        '    }),\n' +
        '\n' +
        '  // Mutation: write data (POST/PUT/DELETE-like)\n' +
        '  update: protectedProcedure\n' +
        '    .input(z.object({\n' +
        '      id: z.string(),\n' +
        '      name: z.string().min(1).max(100).optional(),\n' +
        '      email: z.string().email().optional(),\n' +
        '    }))\n' +
        '    .mutation(async ({ ctx, input }) => {\n' +
        '      return ctx.db.user.update({\n' +
        '        where: { id: input.id },\n' +
        '        data: input,\n' +
        '      });\n' +
        '    }),\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3NestedRouters}</h3>
      <p style={pStyle}>{t.nestedRoutersDesc}</p>
      <pre style={codeStyle}><code>{'// src/server/routers/_app.ts\n' +
        'import { router } from "../trpc";\n' +
        'import { userRouter } from "./user";\n' +
        'import { postRouter } from "./post";\n' +
        'import { commentRouter } from "./comment";\n' +
        '\n' +
        'export const appRouter = router({\n' +
        '  user: userRouter,\n' +
        '  post: postRouter,\n' +
        '  comment: commentRouter,\n' +
        '});\n' +
        '\n' +
        '// Export the type for the client\n' +
        'export type AppRouter = typeof appRouter;\n' +
        '\n' +
        '// Client usage:\n' +
        '// trpc.user.getById.useQuery({ id: "123" })\n' +
        '// trpc.post.list.useQuery({ page: 1 })\n' +
        '// trpc.comment.create.useMutation()'}</code></pre>

      {/* Input Validation with Zod */}
      <h2 style={h2Style}>{t.h2Validation}</h2>
      <p style={pStyle}>{t.validationDesc}</p>
      <pre style={codeStyle}><code>{'import { z } from "zod";\n' +
        'import { router, publicProcedure } from "../trpc";\n' +
        '\n' +
        'export const productRouter = router({\n' +
        '  create: publicProcedure\n' +
        '    .input(\n' +
        '      z.object({\n' +
        '        name: z.string().min(1, "Name is required").max(200),\n' +
        '        price: z.number().positive("Price must be positive"),\n' +
        '        category: z.enum(["electronics", "clothing", "food"]),\n' +
        '        tags: z.array(z.string()).max(10).default([]),\n' +
        '        metadata: z.record(z.string(), z.unknown()).optional(),\n' +
        '      })\n' +
        '    )\n' +
        '    .mutation(async ({ ctx, input }) => {\n' +
        '      // input is fully typed:\n' +
        '      // {\n' +
        '      //   name: string;\n' +
        '      //   price: number;\n' +
        '      //   category: "electronics" | "clothing" | "food";\n' +
        '      //   tags: string[];\n' +
        '      //   metadata?: Record<string, unknown>;\n' +
        '      // }\n' +
        '      return ctx.db.product.create({ data: input });\n' +
        '    }),\n' +
        '});'}</code></pre>

      <h3 style={h3Style}>{t.h3ComplexInputs}</h3>
      <pre style={codeStyle}><code>{'// Reusable input schemas\n' +
        'const PaginationInput = z.object({\n' +
        '  cursor: z.string().nullish(),\n' +
        '  limit: z.number().int().min(1).max(100).default(20),\n' +
        '});\n' +
        '\n' +
        'const DateRangeInput = z.object({\n' +
        '  from: z.date(),\n' +
        '  to: z.date(),\n' +
        '}).refine(\n' +
        '  (data) => data.from <= data.to,\n' +
        '  { message: "Start date must be before end date" }\n' +
        ');\n' +
        '\n' +
        'const SearchInput = z.object({\n' +
        '  query: z.string().min(1).max(500),\n' +
        '  filters: z.object({\n' +
        '    category: z.enum(["all", "posts", "users"]).default("all"),\n' +
        '    dateRange: DateRangeInput.optional(),\n' +
        '    sortBy: z.enum(["relevance", "date", "popularity"]).default("relevance"),\n' +
        '  }).default({}),\n' +
        '  pagination: PaginationInput.default({}),\n' +
        '});\n' +
        '\n' +
        'export const searchRouter = router({\n' +
        '  search: publicProcedure\n' +
        '    .input(SearchInput)\n' +
        '    .query(async ({ ctx, input }) => {\n' +
        '      // All fields are validated and typed\n' +
        '      const { query, filters, pagination } = input;\n' +
        '      return ctx.db.search(query, filters, pagination);\n' +
        '    }),\n' +
        '});'}</code></pre>

      {/* Queries and Mutations */}
      <h2 style={h2Style}>{t.h2QueriesMutations}</h2>
      <p style={pStyle}>{t.queriesDesc}</p>

      <h3 style={h3Style}>{t.h3ClientCalls}</h3>
      <pre style={codeStyle}><code>{'// Using queries in React components\n' +
        'function UserProfile({ userId }: { userId: string }) {\n' +
        '  // Fully typed query — data type is inferred from server\n' +
        '  const { data: user, isLoading, error } = trpc.user.getById.useQuery(\n' +
        '    { id: userId },\n' +
        '    { enabled: !!userId }\n' +
        '  );\n' +
        '\n' +
        '  // Fully typed mutation\n' +
        '  const updateUser = trpc.user.update.useMutation({\n' +
        '    onSuccess: () => {\n' +
        '      // Invalidate and refetch the query after mutation\n' +
        '      utils.user.getById.invalidate({ id: userId });\n' +
        '    },\n' +
        '    onError: (err) => {\n' +
        '      // err.data?.zodError has field-level errors\n' +
        '      console.error("Update failed:", err.message);\n' +
        '    },\n' +
        '  });\n' +
        '\n' +
        '  const utils = trpc.useUtils();\n' +
        '\n' +
        '  if (isLoading) return <div>Loading...</div>;\n' +
        '  if (error) return <div>Error: {error.message}</div>;\n' +
        '\n' +
        '  return (\n' +
        '    <form onSubmit={(e) => {\n' +
        '      e.preventDefault();\n' +
        '      updateUser.mutate({\n' +
        '        id: userId,\n' +
        '        name: "New Name",  // TypeScript ensures valid fields\n' +
        '      });\n' +
        '    }}>\n' +
        '      <p>{user.name}</p>\n' +
        '      <p>{user.email}</p>\n' +
        '      <button type="submit" disabled={updateUser.isPending}>\n' +
        '        {updateUser.isPending ? "Saving..." : "Save"}\n' +
        '      </button>\n' +
        '    </form>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Middleware */}
      <h2 style={h2Style}>{t.h2Middleware}</h2>
      <p style={pStyle}>{t.middlewareDesc}</p>

      <h3 style={h3Style}>{t.h3AuthMiddleware}</h3>
      <pre style={codeStyle}><code>{'// src/server/trpc.ts\n' +
        'const isAuthed = t.middleware(async ({ ctx, next }) => {\n' +
        '  if (!ctx.session?.user) {\n' +
        '    throw new TRPCError({\n' +
        '      code: "UNAUTHORIZED",\n' +
        '      message: "You must be logged in",\n' +
        '    });\n' +
        '  }\n' +
        '  // Add user to context for downstream procedures\n' +
        '  return next({\n' +
        '    ctx: {\n' +
        '      session: ctx.session,\n' +
        '      user: ctx.session.user,  // Now guaranteed to exist\n' +
        '    },\n' +
        '  });\n' +
        '});\n' +
        '\n' +
        'export const protectedProcedure = t.procedure.use(isAuthed);\n' +
        '\n' +
        '// Logging middleware\n' +
        'const logger = t.middleware(async ({ path, type, next }) => {\n' +
        '  const start = Date.now();\n' +
        '  const result = await next();\n' +
        '  const duration = Date.now() - start;\n' +
        '  console.log(\n' +
        '    `[tRPC] \\${type} \\${path} - \\${duration}ms - ` +\n' +
        '    `\\${result.ok ? "OK" : "ERROR"}`\n' +
        '  );\n' +
        '  return result;\n' +
        '});\n' +
        '\n' +
        '// Role-based middleware\n' +
        'const isAdmin = t.middleware(async ({ ctx, next }) => {\n' +
        '  if (ctx.session?.user?.role !== "admin") {\n' +
        '    throw new TRPCError({\n' +
        '      code: "FORBIDDEN",\n' +
        '      message: "Admin access required",\n' +
        '    });\n' +
        '  }\n' +
        '  return next({ ctx });\n' +
        '});\n' +
        '\n' +
        'export const adminProcedure = protectedProcedure.use(isAdmin);'}</code></pre>

      {/* Context */}
      <h2 style={h2Style}>{t.h2Context}</h2>
      <p style={pStyle}>{t.contextDesc}</p>
      <pre style={codeStyle}><code>{'// src/server/context.ts\n' +
        'import { prisma } from "@/lib/prisma";\n' +
        'import { getServerSession } from "next-auth";\n' +
        'import { authOptions } from "@/lib/auth";\n' +
        '\n' +
        'export const createTRPCContext = async (opts: {\n' +
        '  headers: Headers;\n' +
        '}) => {\n' +
        '  const session = await getServerSession(authOptions);\n' +
        '\n' +
        '  return {\n' +
        '    // Database client — shared across all procedures\n' +
        '    db: prisma,\n' +
        '    // Authenticated session (null if not logged in)\n' +
        '    session,\n' +
        '    // Request headers for IP, user-agent, etc.\n' +
        '    headers: opts.headers,\n' +
        '    // Request ID for tracing\n' +
        '    requestId: crypto.randomUUID(),\n' +
        '  };\n' +
        '};\n' +
        '\n' +
        'export type Context = Awaited<ReturnType<typeof createTRPCContext>>;\n' +
        '\n' +
        '// Procedures access context via ctx:\n' +
        '// .query(async ({ ctx }) => {\n' +
        '//   ctx.db       — Prisma client\n' +
        '//   ctx.session  — Auth session\n' +
        '//   ctx.headers  — Request headers\n' +
        '// })'}</code></pre>

      {/* Error Handling */}
      <h2 style={h2Style}>{t.h2ErrorHandling}</h2>
      <p style={pStyle}>{t.errorHandlingDesc}</p>
      <pre style={codeStyle}><code>{'import { TRPCError } from "@trpc/server";\n' +
        '\n' +
        'export const postRouter = router({\n' +
        '  getById: publicProcedure\n' +
        '    .input(z.object({ id: z.string() }))\n' +
        '    .query(async ({ ctx, input }) => {\n' +
        '      const post = await ctx.db.post.findUnique({\n' +
        '        where: { id: input.id },\n' +
        '      });\n' +
        '\n' +
        '      if (!post) {\n' +
        '        throw new TRPCError({\n' +
        '          code: "NOT_FOUND",\n' +
        '          message: "Post not found",\n' +
        '        });\n' +
        '      }\n' +
        '\n' +
        '      // Check permission\n' +
        '      if (post.isPrivate && post.authorId !== ctx.session?.user?.id) {\n' +
        '        throw new TRPCError({\n' +
        '          code: "FORBIDDEN",\n' +
        '          message: "You do not have permission to view this post",\n' +
        '        });\n' +
        '      }\n' +
        '\n' +
        '      return post;\n' +
        '    }),\n' +
        '\n' +
        '  delete: protectedProcedure\n' +
        '    .input(z.object({ id: z.string() }))\n' +
        '    .mutation(async ({ ctx, input }) => {\n' +
        '      try {\n' +
        '        return await ctx.db.post.delete({\n' +
        '          where: { id: input.id, authorId: ctx.user.id },\n' +
        '        });\n' +
        '      } catch (e) {\n' +
        '        throw new TRPCError({\n' +
        '          code: "INTERNAL_SERVER_ERROR",\n' +
        '          message: "Failed to delete post",\n' +
        '          cause: e,\n' +
        '        });\n' +
        '      }\n' +
        '    }),\n' +
        '});\n' +
        '\n' +
        '// Available error codes:\n' +
        '// PARSE_ERROR          400\n' +
        '// BAD_REQUEST          400\n' +
        '// UNAUTHORIZED         401\n' +
        '// FORBIDDEN            403\n' +
        '// NOT_FOUND            404\n' +
        '// METHOD_NOT_SUPPORTED 405\n' +
        '// TIMEOUT              408\n' +
        '// CONFLICT             409\n' +
        '// TOO_MANY_REQUESTS    429\n' +
        '// INTERNAL_SERVER_ERROR 500'}</code></pre>

      <h3 style={h3Style}>{t.h3CustomFormatting}</h3>
      <pre style={codeStyle}><code>{'// Custom error formatting in initTRPC\n' +
        'const t = initTRPC.context<Context>().create({\n' +
        '  errorFormatter({ shape, error }) {\n' +
        '    return {\n' +
        '      ...shape,\n' +
        '      data: {\n' +
        '        ...shape.data,\n' +
        '        // Include Zod validation errors\n' +
        '        zodError:\n' +
        '          error.cause instanceof ZodError\n' +
        '            ? error.cause.flatten()\n' +
        '            : null,\n' +
        '      },\n' +
        '    };\n' +
        '  },\n' +
        '});\n' +
        '\n' +
        '// Client-side error handling\n' +
        'const mutation = trpc.user.update.useMutation({\n' +
        '  onError: (error) => {\n' +
        '    if (error.data?.zodError) {\n' +
        '      // Field-level validation errors\n' +
        '      const fieldErrors = error.data.zodError.fieldErrors;\n' +
        '      // { name: ["Too short"], email: ["Invalid email"] }\n' +
        '    } else {\n' +
        '      // General server error\n' +
        '      toast.error(error.message);\n' +
        '    }\n' +
        '  },\n' +
        '});'}</code></pre>

      {/* React Query Integration */}
      <h2 style={h2Style}>{t.h2ReactQuery}</h2>
      <p style={pStyle}>{t.reactQueryDesc}</p>

      <h3 style={h3Style}>{t.h3OptimisticUpdates}</h3>
      <pre style={codeStyle}><code>{'function TodoList() {\n' +
        '  const utils = trpc.useUtils();\n' +
        '  const todos = trpc.todo.list.useQuery();\n' +
        '\n' +
        '  const toggleTodo = trpc.todo.toggle.useMutation({\n' +
        '    // Optimistically update the UI before server responds\n' +
        '    onMutate: async (input) => {\n' +
        '      // Cancel any outgoing refetches\n' +
        '      await utils.todo.list.cancel();\n' +
        '\n' +
        '      // Snapshot the previous value\n' +
        '      const previousTodos = utils.todo.list.getData();\n' +
        '\n' +
        '      // Optimistically update the cache\n' +
        '      utils.todo.list.setData(undefined, (old) =>\n' +
        '        old?.map((t) =>\n' +
        '          t.id === input.id\n' +
        '            ? { ...t, completed: !t.completed }\n' +
        '            : t\n' +
        '        )\n' +
        '      );\n' +
        '\n' +
        '      return { previousTodos };\n' +
        '    },\n' +
        '    // If mutation fails, roll back to snapshot\n' +
        '    onError: (err, input, context) => {\n' +
        '      utils.todo.list.setData(undefined, context?.previousTodos);\n' +
        '    },\n' +
        '    // Always refetch after error or success\n' +
        '    onSettled: () => {\n' +
        '      utils.todo.list.invalidate();\n' +
        '    },\n' +
        '  });\n' +
        '\n' +
        '  return (\n' +
        '    <ul>\n' +
        '      {todos.data?.map((todo) => (\n' +
        '        <li key={todo.id} onClick={() => toggleTodo.mutate({ id: todo.id })}>\n' +
        '          {todo.completed ? "[x]" : "[ ]"} {todo.text}\n' +
        '        </li>\n' +
        '      ))}\n' +
        '    </ul>\n' +
        '  );\n' +
        '}'}</code></pre>

      <h3 style={h3Style}>{t.h3InfiniteQueries}</h3>
      <pre style={codeStyle}><code>{'// Server: cursor-based pagination\n' +
        'export const feedRouter = router({\n' +
        '  infiniteFeed: publicProcedure\n' +
        '    .input(z.object({\n' +
        '      cursor: z.string().nullish(),\n' +
        '      limit: z.number().min(1).max(50).default(20),\n' +
        '    }))\n' +
        '    .query(async ({ ctx, input }) => {\n' +
        '      const items = await ctx.db.post.findMany({\n' +
        '        take: input.limit + 1,\n' +
        '        cursor: input.cursor ? { id: input.cursor } : undefined,\n' +
        '        orderBy: { createdAt: "desc" },\n' +
        '      });\n' +
        '      let nextCursor: string | undefined;\n' +
        '      if (items.length > input.limit) {\n' +
        '        const nextItem = items.pop();\n' +
        '        nextCursor = nextItem?.id;\n' +
        '      }\n' +
        '      return { items, nextCursor };\n' +
        '    }),\n' +
        '});\n' +
        '\n' +
        '// Client: infinite scroll\n' +
        'function Feed() {\n' +
        '  const feed = trpc.feed.infiniteFeed.useInfiniteQuery(\n' +
        '    { limit: 20 },\n' +
        '    { getNextPageParam: (lastPage) => lastPage.nextCursor }\n' +
        '  );\n' +
        '\n' +
        '  return (\n' +
        '    <div>\n' +
        '      {feed.data?.pages.map((page) =>\n' +
        '        page.items.map((item) => (\n' +
        '          <PostCard key={item.id} post={item} />\n' +
        '        ))\n' +
        '      )}\n' +
        '      <button\n' +
        '        onClick={() => feed.fetchNextPage()}\n' +
        '        disabled={!feed.hasNextPage || feed.isFetchingNextPage}\n' +
        '      >\n' +
        '        {feed.isFetchingNextPage ? "Loading..." : "Load more"}\n' +
        '      </button>\n' +
        '    </div>\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Subscriptions */}
      <h2 style={h2Style}>{t.h2Subscriptions}</h2>
      <p style={pStyle}>{t.subscriptionsDesc}</p>
      <pre style={codeStyle}><code>{'// Server: WebSocket subscription\n' +
        'import { observable } from "@trpc/server/observable";\n' +
        'import { EventEmitter } from "events";\n' +
        '\n' +
        'const ee = new EventEmitter();\n' +
        '\n' +
        'export const chatRouter = router({\n' +
        '  sendMessage: protectedProcedure\n' +
        '    .input(z.object({\n' +
        '      roomId: z.string(),\n' +
        '      text: z.string().min(1).max(1000),\n' +
        '    }))\n' +
        '    .mutation(async ({ ctx, input }) => {\n' +
        '      const message = {\n' +
        '        id: crypto.randomUUID(),\n' +
        '        text: input.text,\n' +
        '        roomId: input.roomId,\n' +
        '        userId: ctx.user.id,\n' +
        '        createdAt: new Date(),\n' +
        '      };\n' +
        '      await ctx.db.message.create({ data: message });\n' +
        '      ee.emit("newMessage", message);\n' +
        '      return message;\n' +
        '    }),\n' +
        '\n' +
        '  onNewMessage: publicProcedure\n' +
        '    .input(z.object({ roomId: z.string() }))\n' +
        '    .subscription(({ input }) => {\n' +
        '      return observable((emit) => {\n' +
        '        const handler = (message: Message) => {\n' +
        '          if (message.roomId === input.roomId) {\n' +
        '            emit.next(message);\n' +
        '          }\n' +
        '        };\n' +
        '        ee.on("newMessage", handler);\n' +
        '        return () => ee.off("newMessage", handler);\n' +
        '      });\n' +
        '    }),\n' +
        '});\n' +
        '\n' +
        '// Client: subscribe to messages\n' +
        'function ChatRoom({ roomId }: { roomId: string }) {\n' +
        '  trpc.chat.onNewMessage.useSubscription(\n' +
        '    { roomId },\n' +
        '    {\n' +
        '      onData: (message) => {\n' +
        '        // Append new message to local state\n' +
        '        setMessages((prev) => [...prev, message]);\n' +
        '      },\n' +
        '      onError: (err) => {\n' +
        '        console.error("Subscription error:", err);\n' +
        '      },\n' +
        '    }\n' +
        '  );\n' +
        '}'}</code></pre>

      {/* Testing */}
      <h2 style={h2Style}>{t.h2Testing}</h2>
      <p style={pStyle}>{t.testingDesc}</p>
      <pre style={codeStyle}><code>{'// __tests__/user.test.ts\n' +
        'import { describe, it, expect, beforeEach } from "vitest";\n' +
        'import { appRouter } from "@/server/routers/_app";\n' +
        'import { createCallerFactory } from "@/server/trpc";\n' +
        'import { prisma } from "@/lib/__mocks__/prisma";\n' +
        '\n' +
        'const createCaller = createCallerFactory(appRouter);\n' +
        '\n' +
        'describe("user router", () => {\n' +
        '  it("should return a user by ID", async () => {\n' +
        '    const caller = createCaller({\n' +
        '      db: prisma,\n' +
        '      session: null,\n' +
        '      headers: new Headers(),\n' +
        '    });\n' +
        '\n' +
        '    prisma.user.findUnique.mockResolvedValue({\n' +
        '      id: "1",\n' +
        '      name: "Alice",\n' +
        '      email: "alice@example.com",\n' +
        '    });\n' +
        '\n' +
        '    const user = await caller.user.getById({ id: "1" });\n' +
        '    expect(user).toEqual({\n' +
        '      id: "1",\n' +
        '      name: "Alice",\n' +
        '      email: "alice@example.com",\n' +
        '    });\n' +
        '  });\n' +
        '\n' +
        '  it("should throw NOT_FOUND for missing user", async () => {\n' +
        '    const caller = createCaller({\n' +
        '      db: prisma,\n' +
        '      session: null,\n' +
        '      headers: new Headers(),\n' +
        '    });\n' +
        '\n' +
        '    prisma.user.findUnique.mockResolvedValue(null);\n' +
        '\n' +
        '    await expect(\n' +
        '      caller.user.getById({ id: "nonexistent" })\n' +
        '    ).rejects.toThrow("NOT_FOUND");\n' +
        '  });\n' +
        '\n' +
        '  it("should reject invalid input", async () => {\n' +
        '    const caller = createCaller({\n' +
        '      db: prisma,\n' +
        '      session: { user: { id: "1", role: "user" } },\n' +
        '      headers: new Headers(),\n' +
        '    });\n' +
        '\n' +
        '    await expect(\n' +
        '      caller.user.update({ id: "1", email: "not-an-email" })\n' +
        '    ).rejects.toThrow();\n' +
        '  });\n' +
        '\n' +
        '  it("should require auth for protected routes", async () => {\n' +
        '    const caller = createCaller({\n' +
        '      db: prisma,\n' +
        '      session: null,  // Not logged in\n' +
        '      headers: new Headers(),\n' +
        '    });\n' +
        '\n' +
        '    await expect(\n' +
        '      caller.user.update({ id: "1", name: "Hacker" })\n' +
        '    ).rejects.toThrow("UNAUTHORIZED");\n' +
        '  });\n' +
        '});'}</code></pre>

      {/* Performance Tips */}
      <h2 style={h2Style}>{t.h2Performance}</h2>
      <p style={pStyle}>{t.perfDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.perf1, t.perf2, t.perf3, t.perf4, t.perf5, t.perf6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', lineHeight: '1.75' }}>{item}</li>
        ))}
      </ul>
      <pre style={codeStyle}><code>{'// Server-side calls in Next.js Server Components\n' +
        '// (no HTTP overhead — direct function call)\n' +
        'import { createCallerFactory } from "@/server/trpc";\n' +
        'import { appRouter } from "@/server/routers/_app";\n' +
        '\n' +
        'const createCaller = createCallerFactory(appRouter);\n' +
        '\n' +
        'export default async function UserPage({\n' +
        '  params,\n' +
        '}: {\n' +
        '  params: { id: string };\n' +
        '}) {\n' +
        '  const caller = createCaller(await createTRPCContext({\n' +
        '    headers: headers(),\n' +
        '  }));\n' +
        '\n' +
        '  // Direct procedure call — no HTTP request\n' +
        '  const user = await caller.user.getById({ id: params.id });\n' +
        '\n' +
        '  return <UserProfileView user={user} />;\n' +
        '}'}</code></pre>

      {/* FAQ Section */}
      <h2 style={h2Style}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A },
        { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A },
        { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A },
        { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A },
        { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.75', color: '#475569' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
