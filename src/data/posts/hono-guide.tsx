'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Hono: Ultra-Fast Web Framework for the Edge and Beyond',
    description: 'Complete guide to Hono — the ultra-fast web framework for Cloudflare Workers, Deno, Bun, Node.js, and AWS Lambda. Learn routing, middleware, validation, JWT auth, CORS, OpenAPI, RPC mode, and performance benchmarks.',
    intro: 'Hono is a small, simple, and ultra-fast web framework designed for the edge. With first-class TypeScript support and zero dependencies, Hono runs on virtually every JavaScript runtime: Cloudflare Workers, Deno, Bun, Node.js, Fastly, Netlify, AWS Lambda, and more. It delivers Express-like ergonomics with dramatically better performance and full type safety.',
    tldr: 'Hono is an ultra-fast, multi-runtime web framework (2.5x faster than Express) with built-in TypeScript support, middleware, validation via Zod, JWT auth, CORS, OpenAPI docs, and RPC mode for end-to-end type safety. It runs everywhere: Cloudflare Workers, Deno, Bun, Node.js, and AWS Lambda.',
    takeaway1: 'Runs on every major JS runtime with zero code changes — true write-once, deploy-anywhere.',
    takeaway2: 'Built-in middleware for JWT, CORS, ETag, logging, and compression eliminates external packages.',
    takeaway3: 'Zod-based validation provides runtime type checking with automatic TypeScript inference.',
    takeaway4: 'RPC mode enables end-to-end type safety between server and client without code generation.',
    takeaway5: 'OpenAPI integration auto-generates Swagger docs from your route definitions.',
    takeaway6: 'Handles 130K+ req/s on Bun, outperforming Express by 2.5x or more.',
    h2WhatIs: 'What Is Hono?',
    whatIsDesc: 'Hono (meaning "flame" in Japanese) is a lightweight web framework created by Yusuke Wada in 2022. Originally designed for Cloudflare Workers, it now supports every major JavaScript runtime. Hono uses Web Standard APIs (Request, Response, fetch) as its foundation, making it portable across runtimes without polyfills.',
    why1: 'Ultra-fast: RegExpRouter benchmarks at 130K+ req/s on Bun',
    why2: 'Tiny: core ~14KB minified, zero external dependencies',
    why3: 'Multi-runtime: Cloudflare Workers, Deno, Bun, Node.js, AWS Lambda, Fastly',
    why4: 'Type-safe: first-class TypeScript with inferred route types and RPC mode',
    why5: 'Rich middleware: JWT, CORS, ETag, logger, compress, basicAuth, secureHeaders built-in',
    why6: 'Web Standards: built on Request/Response, no proprietary abstractions',
    h2Install: 'Installation and Setup',
    installDesc: 'Hono provides starter templates for every runtime. Use the create-hono CLI to scaffold a new project.',
    h2Routing: 'Routing',
    routingDesc: 'Hono provides a powerful routing system with path parameters, wildcards, regex constraints, and optional segments.',
    h3BasicRoutes: 'Basic Routes',
    h3GroupedRoutes: 'Grouped and Nested Routes',
    groupedDesc: 'Use app.route() to organize routes into logical groups, keeping large applications maintainable.',
    h3RouteParams: 'Route Parameters and Wildcards',
    h2Middleware: 'Middleware',
    middlewareDesc: 'Middleware in Hono follows the onion model. Hono ships with rich built-in middleware and makes custom ones simple to create.',
    h3BuiltInMw: 'Built-in Middleware',
    h3CustomMw: 'Custom Middleware',
    h2Request: 'Request Handling',
    requestDesc: 'The Hono context object (c) provides convenient methods to access headers, query params, body, and more.',
    h2Response: 'Response Helpers',
    responseDesc: 'Hono provides ergonomic response helpers for JSON, HTML, text, redirects, streaming, and more.',
    h2Validation: 'Validation with Zod',
    validationDesc: 'Hono integrates with Zod through @hono/zod-validator, providing runtime validation with automatic TypeScript type inference.',
    h2Context: 'The Context Object',
    contextDesc: 'The context object (c) is the core of every Hono handler — it provides access to request, response helpers, variables, and execution context.',
    h2Adapters: 'Runtime Adapters',
    adaptersDesc: 'One of Hono\'s greatest strengths is multi-runtime support. The same code runs across different runtimes with minimal adapter changes.',
    h2ErrorHandling: 'Error Handling',
    errorDesc: 'Hono provides structured error handling through app.onError() and the HTTPException class for clean, consistent API error responses.',
    h2Testing: 'Testing',
    testingDesc: 'Hono provides a built-in test client via app.request() — no need to spin up a server.',
    h2JwtAuth: 'JWT Authentication',
    jwtDesc: 'Hono includes built-in JWT middleware for token verification, enabling complete authentication flows.',
    h2Cors: 'CORS Configuration',
    corsDesc: 'The built-in CORS middleware handles cross-origin requests with fine-grained control over origins, methods, and headers.',
    h2OpenApi: 'OpenAPI Integration',
    openApiDesc: 'The @hono/zod-openapi package defines routes with OpenAPI schemas and auto-generates Swagger documentation.',
    h2Rpc: 'RPC Mode',
    rpcDesc: 'Hono RPC provides end-to-end type safety between server and client without code generation. The client infers types directly from route definitions.',
    h2Perf: 'Performance Benchmarks',
    perfDesc: 'Hono consistently outperforms Express, Fastify, and Koa in benchmarks.',
    bench1: 'Hono (Bun): ~130,000 req/s',
    bench2: 'Fastify (Node.js): ~75,000 req/s',
    bench3: 'Express (Node.js): ~50,000 req/s',
    bench4: 'Hono (Deno): ~95,000 req/s',
    bench5: 'Hono (Workers): sub-ms cold start, ~80,000 req/s',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Hono and how is it different from Express?',
    faq1A: 'Hono is an ultra-fast, lightweight web framework built on Web Standard APIs. Unlike Express which only runs on Node.js, Hono runs on Cloudflare Workers, Deno, Bun, Node.js, and AWS Lambda. It is 2-3x faster, has first-class TypeScript support, zero dependencies, and built-in middleware for JWT, CORS, and validation.',
    faq2Q: 'Can Hono replace Express in production?',
    faq2A: 'Yes. Hono is production-ready and used by Cloudflare, Vercel, and many startups. It provides all Express features plus type safety, multi-runtime support, and significantly better performance.',
    faq3Q: 'Which JavaScript runtime is fastest for Hono?',
    faq3A: 'Bun delivers the highest throughput at 130K+ req/s. Deno is second at ~95K req/s. Cloudflare Workers provide the lowest latency due to edge deployment. On Node.js, Hono still outperforms Express by 2x+.',
    faq4Q: 'How does Hono handle validation?',
    faq4A: 'Hono integrates with Zod through @hono/zod-validator. You define schemas for body, query, headers, and params. The middleware validates automatically, returning 400 errors for invalid data with full TypeScript inference.',
    faq5Q: 'Does Hono support WebSockets?',
    faq5A: 'Yes. Hono supports WebSocket connections through hono/websocket on runtimes that support it (Cloudflare Workers with Durable Objects, Deno, Bun) with full type safety.',
    faq6Q: 'How do I deploy Hono to Cloudflare Workers?',
    faq6A: 'Create a project with "npm create hono@latest" and select cloudflare-workers. Write routes in src/index.ts, configure wrangler.toml, then deploy with "wrangler deploy". Hono has first-class Cloudflare support with typed bindings.',
    faq7Q: 'What is Hono RPC mode?',
    faq7A: 'RPC mode provides end-to-end type safety between server and client without code generation. Export the app type from server, use hc() to create a typed client that infers all route types and response shapes at compile time.',
    faq8Q: 'Can Hono generate OpenAPI documentation automatically?',
    faq8A: 'Yes. The @hono/zod-openapi package auto-generates a complete OpenAPI 3.0 spec from route definitions. You can serve Swagger UI directly from your Hono app, eliminating separate documentation maintenance.',
  },
  zh: {
    title: 'Hono：适用于边缘及更多场景的超快 Web 框架',
    description: 'Hono 完全指南 — 为 Cloudflare Workers、Deno、Bun、Node.js 和 AWS Lambda 构建的超快 Web 框架。',
    intro: 'Hono 是一个小巧、简洁、超快的 Web 框架，专为边缘计算设计。凭借一流的 TypeScript 支持和零依赖，Hono 几乎可以在所有 JavaScript 运行时上运行。',
    tldr: 'Hono 是超快的多运行时 Web 框架（比 Express 快 2.5 倍），内置 TypeScript、中间件、Zod 验证、JWT 认证、CORS、OpenAPI 和 RPC 模式。',
    takeaway1: '无需修改代码即可在所有主流 JavaScript 运行时上运行。',
    takeaway2: '内置 JWT、CORS、ETag、日志和压缩中间件。',
    takeaway3: '基于 Zod 的验证提供运行时类型检查和自动 TypeScript 推断。',
    takeaway4: 'RPC 模式提供端到端类型安全，无需代码生成。',
    takeaway5: 'OpenAPI 集成自动生成 Swagger 文档。',
    takeaway6: '在 Bun 上每秒处理 130K+ 请求，性能超过 Express 2.5 倍。',
    h2WhatIs: '什么是 Hono？',
    whatIsDesc: 'Hono（日语"火焰"）是 2022 年创建的轻量级 Web 框架，使用 Web 标准 API，无需 polyfill 即可跨运行时移植。',
    why1: '超快：RegExpRouter 在 Bun 上达到 130K+ 请求/秒',
    why2: '极小：核心约 14KB，零外部依赖',
    why3: '多运行时：Cloudflare Workers、Deno、Bun、Node.js、AWS Lambda',
    why4: '类型安全：一流 TypeScript 支持和 RPC 模式',
    why5: '丰富中间件：内置 JWT、CORS、ETag、日志、压缩等',
    why6: 'Web 标准：基于 Request/Response 构建',
    h2Install: '安装和设置',
    installDesc: 'Hono 为每个运行时提供启动模板。',
    h2Routing: '路由',
    routingDesc: 'Hono 提供强大的路由系统，支持路径参数、通配符和正则约束。',
    h3BasicRoutes: '基本路由',
    h3GroupedRoutes: '分组和嵌套路由',
    groupedDesc: '使用 app.route() 将路由组织成逻辑组。',
    h3RouteParams: '路由参数和通配符',
    h2Middleware: '中间件',
    middlewareDesc: 'Hono 中间件遵循洋葱模型，内置丰富中间件且易于自定义。',
    h3BuiltInMw: '内置中间件',
    h3CustomMw: '自定义中间件',
    h2Request: '请求处理',
    requestDesc: 'Hono 上下文对象提供便捷方法访问请求数据。',
    h2Response: '响应辅助函数',
    responseDesc: 'Hono 提供 JSON、HTML、文本、重定向、流式等响应辅助函数。',
    h2Validation: 'Zod 验证',
    validationDesc: 'Hono 通过 @hono/zod-validator 与 Zod 集成。',
    h2Context: '上下文对象',
    contextDesc: '上下文对象 (c) 是每个 Hono 处理器的核心。',
    h2Adapters: '运行时适配器',
    adaptersDesc: 'Hono 的多运行时支持是其最大优势之一。',
    h2ErrorHandling: '错误处理',
    errorDesc: 'Hono 通过 app.onError() 和 HTTPException 类提供结构化错误处理。',
    h2Testing: '测试',
    testingDesc: 'Hono 通过 app.request() 提供内置测试客户端。',
    h2JwtAuth: 'JWT 认证',
    jwtDesc: 'Hono 包含内置的 JWT 中间件用于令牌验证。',
    h2Cors: 'CORS 配置',
    corsDesc: '内置 CORS 中间件处理跨域请求。',
    h2OpenApi: 'OpenAPI 集成',
    openApiDesc: '@hono/zod-openapi 自动生成 Swagger 文档。',
    h2Rpc: 'RPC 模式',
    rpcDesc: 'RPC 模式提供端到端类型安全，无需代码生成。',
    h2Perf: '性能基准',
    perfDesc: 'Hono 在基准测试中持续超越 Express、Fastify 和 Koa。',
    bench1: 'Hono (Bun): ~130,000 请求/秒',
    bench2: 'Fastify (Node.js): ~75,000 请求/秒',
    bench3: 'Express (Node.js): ~50,000 请求/秒',
    bench4: 'Hono (Deno): ~95,000 请求/秒',
    bench5: 'Hono (Workers): 亚毫秒冷启动，~80,000 请求/秒',
    h2Faq: '常见问题',
    faq1Q: 'Hono 是什么，与 Express 有何不同？',
    faq1A: 'Hono 是基于 Web 标准 API 的超快轻量级框架，可在多个运行时运行，速度快 2-3 倍。',
    faq2Q: 'Hono 能在生产中替代 Express 吗？',
    faq2A: '可以。Hono 已生产就绪，被 Cloudflare、Vercel 等使用。',
    faq3Q: '哪个运行时对 Hono 最快？',
    faq3A: 'Bun 最高 130K+ 请求/秒，Deno 约 95K，Workers 延迟最低。',
    faq4Q: 'Hono 如何处理验证？',
    faq4A: '通过 @hono/zod-validator 与 Zod 集成，自动验证并推断类型。',
    faq5Q: 'Hono 支持 WebSocket 吗？',
    faq5A: '支持，通过 hono/websocket 在支持的运行时上使用。',
    faq6Q: '如何部署 Hono 到 Cloudflare Workers？',
    faq6A: '用 "npm create hono@latest" 创建项目，选 cloudflare-workers，然后 "wrangler deploy"。',
    faq7Q: 'Hono RPC 模式是什么？',
    faq7A: 'RPC 模式在服务器和客户端间提供端到端类型安全，无需代码生成。',
    faq8Q: 'Hono 能自动生成 OpenAPI 文档吗？',
    faq8A: '可以，@hono/zod-openapi 从路由定义自动生成 OpenAPI 3.0 规范。',
  },
};

export default function HonoGuide({ lang }: { lang: string }) {
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
  const cs = { backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' as const, fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem' };
  const h2s = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#0f172a' };
  const h3s = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem', color: '#1e293b' };
  const ps = { marginBottom: '1rem', lineHeight: '1.75' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '2rem', borderRadius: '0.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Key Takeaways</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', lineHeight: '1.6' }}>{item}</li>
          ))}
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      <h2 style={h2s}>{t.h2WhatIs}</h2>
      <p style={ps}>{t.whatIsDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {[t.why1, t.why2, t.why3, t.why4, t.why5, t.why6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{item}</li>
        ))}
      </ul>

      <h2 style={h2s}>{t.h2Install}</h2>
      <p style={ps}>{t.installDesc}</p>
      <pre style={cs}><code>{'# Create a new Hono project\n' +
        'npm create hono@latest my-app\n' +
        '\n' +
        '# Select your target runtime:\n' +
        '#   cloudflare-workers / deno / bun / nodejs / aws-lambda\n' +
        '\n' +
        'cd my-app && npm install\n' +
        '\n' +
        '# Or install manually\n' +
        'npm install hono\n' +
        '\n' +
        '# Project structure\n' +
        '# my-app/\n' +
        '# ├── src/index.ts    # Entry point\n' +
        '# ├── package.json\n' +
        '# ├── tsconfig.json\n' +
        '# └── wrangler.toml   # (Cloudflare only)'}</code></pre>

      <h2 style={h2s}>{t.h2Routing}</h2>
      <p style={ps}>{t.routingDesc}</p>
      <h3 style={h3s}>{t.h3BasicRoutes}</h3>
      <pre style={cs}><code>{'import { Hono } from \'hono\'\n' +
        'const app = new Hono()\n' +
        '\n' +
        'app.get(\'/\', (c) => c.text(\'Hello Hono!\'))\n' +
        '\n' +
        'app.post(\'/users\', async (c) => {\n' +
        '  const body = await c.req.json()\n' +
        '  return c.json({ id: 1, ...body }, 201)\n' +
        '})\n' +
        '\n' +
        'app.put(\'/users/:id\', async (c) => {\n' +
        '  const id = c.req.param(\'id\')\n' +
        '  const body = await c.req.json()\n' +
        '  return c.json({ id, ...body })\n' +
        '})\n' +
        '\n' +
        'app.delete(\'/users/:id\', (c) => {\n' +
        '  return c.json({ deleted: c.req.param(\'id\') })\n' +
        '})\n' +
        '\n' +
        'app.on([\'PUT\', \'PATCH\'], \'/items/:id\', (c) => {\n' +
        '  return c.json({ updated: true })\n' +
        '})\n' +
        '\n' +
        'app.all(\'/api/*\', (c) => c.json({ method: c.req.method }))\n' +
        '\n' +
        'export default app'}</code></pre>

      <h3 style={h3s}>{t.h3GroupedRoutes}</h3>
      <p style={ps}>{t.groupedDesc}</p>
      <pre style={cs}><code>{'import { Hono } from \'hono\'\n' +
        '\n' +
        '// routes/users.ts\n' +
        'const users = new Hono()\n' +
        'users.get(\'/\', (c) => c.json([{ id: 1, name: \'Alice\' }]))\n' +
        'users.get(\'/:id\', (c) => c.json({ id: c.req.param(\'id\') }))\n' +
        'users.post(\'/\', async (c) => c.json(await c.req.json(), 201))\n' +
        '\n' +
        '// routes/posts.ts\n' +
        'const posts = new Hono()\n' +
        'posts.get(\'/\', (c) => c.json([{ id: 1, title: \'Hello\' }]))\n' +
        'posts.get(\'/:id\', (c) => c.json({ id: c.req.param(\'id\') }))\n' +
        '\n' +
        '// Main app — mount route groups\n' +
        'const app = new Hono()\n' +
        'app.route(\'/api/users\', users)\n' +
        'app.route(\'/api/posts\', posts)\n' +
        'export default app'}</code></pre>

      <h3 style={h3s}>{t.h3RouteParams}</h3>
      <pre style={cs}><code>{'// Named parameters\n' +
        'app.get(\'/users/:id\', (c) => c.json({ id: c.req.param(\'id\') }))\n' +
        '\n' +
        '// Multiple parameters\n' +
        'app.get(\'/orgs/:orgId/repos/:repoId\', (c) => {\n' +
        '  const { orgId, repoId } = c.req.param()\n' +
        '  return c.json({ orgId, repoId })\n' +
        '})\n' +
        '\n' +
        '// Optional parameter\n' +
        'app.get(\'/articles/:slug/:format?\', (c) => {\n' +
        '  const format = c.req.param(\'format\') || \'html\'\n' +
        '  return c.json({ slug: c.req.param(\'slug\'), format })\n' +
        '})\n' +
        '\n' +
        '// Wildcard\n' +
        'app.get(\'/files/*\', (c) => c.text(\'File: \' + c.req.path))\n' +
        '\n' +
        '// Regex constraint\n' +
        'app.get(\'/posts/:id{[0-9]+}\', (c) => {\n' +
        '  return c.json({ id: Number(c.req.param(\'id\')) })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Middleware}</h2>
      <p style={ps}>{t.middlewareDesc}</p>
      <h3 style={h3s}>{t.h3BuiltInMw}</h3>
      <pre style={cs}><code>{'import { Hono } from \'hono\'\n' +
        'import { logger } from \'hono/logger\'\n' +
        'import { cors } from \'hono/cors\'\n' +
        'import { etag } from \'hono/etag\'\n' +
        'import { compress } from \'hono/compress\'\n' +
        'import { secureHeaders } from \'hono/secure-headers\'\n' +
        'import { basicAuth } from \'hono/basic-auth\'\n' +
        'import { bearerAuth } from \'hono/bearer-auth\'\n' +
        'import { prettyJSON } from \'hono/pretty-json\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'app.use(\'*\', logger())           // Log method, path, status\n' +
        'app.use(\'/api/*\', cors())         // Cross-origin requests\n' +
        'app.use(\'*\', etag())             // Caching headers\n' +
        'app.use(\'*\', compress())         // Gzip/brotli\n' +
        'app.use(\'*\', secureHeaders())    // CSP, X-Frame-Options\n' +
        'app.use(\'*\', prettyJSON())       // ?pretty for formatted output\n' +
        '\n' +
        'app.use(\'/admin/*\', basicAuth({\n' +
        '  username: \'admin\', password: \'secret\',\n' +
        '}))\n' +
        'app.use(\'/api/private/*\', bearerAuth({\n' +
        '  token: \'my-secret-token\',\n' +
        '}))'}</code></pre>

      <h3 style={h3s}>{t.h3CustomMw}</h3>
      <pre style={cs}><code>{'import { createMiddleware } from \'hono/factory\'\n' +
        '\n' +
        '// Timing middleware\n' +
        'const timer = createMiddleware(async (c, next) => {\n' +
        '  const start = Date.now()\n' +
        '  await next()\n' +
        '  c.header(\'X-Response-Time\', (Date.now() - start) + \'ms\')\n' +
        '})\n' +
        '\n' +
        '// Typed auth middleware\n' +
        'type Env = { Variables: { user: { id: string; role: string } } }\n' +
        '\n' +
        'const auth = createMiddleware<Env>(async (c, next) => {\n' +
        '  const token = c.req.header(\'Authorization\')\n' +
        '  if (!token) return c.json({ error: \'Unauthorized\' }, 401)\n' +
        '  c.set(\'user\', { id: \'123\', role: \'admin\' })\n' +
        '  await next()\n' +
        '})\n' +
        '\n' +
        'const app = new Hono<Env>()\n' +
        'app.use(\'*\', timer)\n' +
        'app.use(\'/protected/*\', auth)\n' +
        'app.get(\'/protected/profile\', (c) => {\n' +
        '  const user = c.get(\'user\')  // fully typed!\n' +
        '  return c.json({ user })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Request}</h2>
      <p style={ps}>{t.requestDesc}</p>
      <pre style={cs}><code>{'app.post(\'/upload\', async (c) => {\n' +
        '  // Headers\n' +
        '  const contentType = c.req.header(\'Content-Type\')\n' +
        '\n' +
        '  // Query parameters\n' +
        '  const page = c.req.query(\'page\')       // single\n' +
        '  const tags = c.req.queries(\'tag\')       // array\n' +
        '\n' +
        '  // JSON body\n' +
        '  const json = await c.req.json()\n' +
        '\n' +
        '  // Form data\n' +
        '  const form = await c.req.formData()\n' +
        '  const file = form.get(\'file\') as File\n' +
        '\n' +
        '  // URL info\n' +
        '  const url = c.req.url       // full URL\n' +
        '  const path = c.req.path     // pathname\n' +
        '  const method = c.req.method // HTTP method\n' +
        '\n' +
        '  // Path parameters\n' +
        '  const id = c.req.param(\'id\')\n' +
        '\n' +
        '  // Raw body\n' +
        '  const text = await c.req.text()\n' +
        '  const buffer = await c.req.arrayBuffer()\n' +
        '\n' +
        '  return c.json({ received: true })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Response}</h2>
      <p style={ps}>{t.responseDesc}</p>
      <pre style={cs}><code>{'// JSON, text, HTML responses\n' +
        'app.get(\'/json\', (c) => c.json({ message: \'hello\' }))\n' +
        'app.get(\'/error\', (c) => c.json({ error: \'not found\' }, 404))\n' +
        'app.get(\'/text\', (c) => c.text(\'Hello World\'))\n' +
        'app.get(\'/page\', (c) => c.html(\'<h1>Hello</h1>\'))\n' +
        '\n' +
        '// Redirects\n' +
        'app.get(\'/old\', (c) => c.redirect(\'/new\'))\n' +
        'app.get(\'/moved\', (c) => c.redirect(\'/permanent\', 301))\n' +
        '\n' +
        '// Headers and status\n' +
        'app.get(\'/custom\', (c) => {\n' +
        '  c.header(\'X-Custom\', \'value\')\n' +
        '  c.header(\'Cache-Control\', \'max-age=3600\')\n' +
        '  c.status(201)\n' +
        '  return c.json({ created: true })\n' +
        '})\n' +
        '\n' +
        '// Streaming\n' +
        'app.get(\'/stream\', (c) => {\n' +
        '  return c.streamText(async (stream) => {\n' +
        '    for (let i = 0; i < 5; i++) {\n' +
        '      await stream.writeln(\'Chunk \' + i)\n' +
        '      await stream.sleep(1000)\n' +
        '    }\n' +
        '  })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Validation}</h2>
      <p style={ps}>{t.validationDesc}</p>
      <pre style={cs}><code>{'import { z } from \'zod\'\n' +
        'import { zValidator } from \'@hono/zod-validator\'\n' +
        '\n' +
        '// Validate JSON body\n' +
        'const userSchema = z.object({\n' +
        '  name: z.string().min(1).max(100),\n' +
        '  email: z.string().email(),\n' +
        '  age: z.number().int().min(0).optional(),\n' +
        '})\n' +
        '\n' +
        'app.post(\'/users\', zValidator(\'json\', userSchema), (c) => {\n' +
        '  const body = c.req.valid(\'json\')  // fully typed\n' +
        '  return c.json({ user: body }, 201)\n' +
        '})\n' +
        '\n' +
        '// Validate query parameters\n' +
        'const listSchema = z.object({\n' +
        '  page: z.coerce.number().int().min(1).default(1),\n' +
        '  limit: z.coerce.number().int().max(100).default(20),\n' +
        '  search: z.string().optional(),\n' +
        '})\n' +
        '\n' +
        'app.get(\'/users\', zValidator(\'query\', listSchema), (c) => {\n' +
        '  const { page, limit, search } = c.req.valid(\'query\')\n' +
        '  return c.json({ page, limit, search })\n' +
        '})\n' +
        '\n' +
        '// Validate path params + custom error handling\n' +
        'app.get(\'/users/:id\',\n' +
        '  zValidator(\'param\', z.object({ id: z.coerce.number().positive() }),\n' +
        '    (result, c) => {\n' +
        '      if (!result.success) {\n' +
        '        return c.json({ errors: result.error.flatten() }, 422)\n' +
        '      }\n' +
        '    }\n' +
        '  ),\n' +
        '  (c) => c.json({ id: c.req.valid(\'param\').id })\n' +
        ')'}</code></pre>

      <h2 style={h2s}>{t.h2Context}</h2>
      <p style={ps}>{t.contextDesc}</p>
      <pre style={cs}><code>{'type AppEnv = {\n' +
        '  Bindings: { DATABASE_URL: string; API_KEY: string }\n' +
        '  Variables: { requestId: string }\n' +
        '}\n' +
        '\n' +
        'const app = new Hono<AppEnv>()\n' +
        '\n' +
        'app.use(\'*\', async (c, next) => {\n' +
        '  c.set(\'requestId\', crypto.randomUUID())\n' +
        '  await next()\n' +
        '})\n' +
        '\n' +
        'app.get(\'/demo\', (c) => {\n' +
        '  const url = c.req.url          // request URL\n' +
        '  const dbUrl = c.env.DATABASE_URL // env bindings\n' +
        '  const reqId = c.get(\'requestId\') // typed variables\n' +
        '  c.header(\'X-Request-Id\', reqId)  // set headers\n' +
        '  return c.json({ requestId: reqId, url })\n' +
        '})\n' +
        '\n' +
        '// waitUntil (Cloudflare Workers)\n' +
        'app.post(\'/webhook\', (c) => {\n' +
        '  c.executionCtx.waitUntil(\n' +
        '    fetch(\'https://analytics.example.com/track\', {\n' +
        '      method: \'POST\',\n' +
        '      body: JSON.stringify({ event: \'webhook\' }),\n' +
        '    })\n' +
        '  )\n' +
        '  return c.json({ ok: true })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Adapters}</h2>
      <p style={ps}>{t.adaptersDesc}</p>

      <h3 style={h3s}>Cloudflare Workers</h3>
      <pre style={cs}><code>{'// src/index.ts — Cloudflare Workers\n' +
        'import { Hono } from \'hono\'\n' +
        '\n' +
        'type Bindings = {\n' +
        '  MY_KV: KVNamespace\n' +
        '  MY_DB: D1Database\n' +
        '  MY_BUCKET: R2Bucket\n' +
        '  API_KEY: string\n' +
        '}\n' +
        '\n' +
        'const app = new Hono<{ Bindings: Bindings }>()\n' +
        '\n' +
        'app.get(\'/kv/:key\', async (c) => {\n' +
        '  const val = await c.env.MY_KV.get(c.req.param(\'key\'))\n' +
        '  return val ? c.json({ val }) : c.json({ error: \'Not found\' }, 404)\n' +
        '})\n' +
        '\n' +
        'app.get(\'/db/users\', async (c) => {\n' +
        '  const { results } = await c.env.MY_DB\n' +
        '    .prepare(\'SELECT * FROM users LIMIT 10\')\n' +
        '    .all()\n' +
        '  return c.json(results)\n' +
        '})\n' +
        '\n' +
        'export default app'}</code></pre>

      <h3 style={h3s}>Deno</h3>
      <pre style={cs}><code>{'// main.ts — Deno\n' +
        'import { Hono } from \'https://deno.land/x/hono/mod.ts\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'app.get(\'/\', (c) => c.text(\'Hello from Deno!\'))\n' +
        'app.get(\'/env\', (c) => {\n' +
        '  return c.json({ runtime: \'deno\', port: Deno.env.get(\'PORT\') })\n' +
        '})\n' +
        '\n' +
        'Deno.serve(app.fetch)\n' +
        '// Run: deno run --allow-net --allow-env main.ts'}</code></pre>

      <h3 style={h3s}>Bun</h3>
      <pre style={cs}><code>{'// index.ts — Bun (fastest runtime for Hono)\n' +
        'import { Hono } from \'hono\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'app.get(\'/\', (c) => c.text(\'Hello from Bun!\'))\n' +
        'app.get(\'/file\', async (c) => {\n' +
        '  const data = await Bun.file(\'./data.json\').json()\n' +
        '  return c.json(data)\n' +
        '})\n' +
        '\n' +
        'export default { port: 3000, fetch: app.fetch }\n' +
        '// Run: bun run index.ts'}</code></pre>

      <h3 style={h3s}>Node.js</h3>
      <pre style={cs}><code>{'// index.ts — Node.js\n' +
        'import { Hono } from \'hono\'\n' +
        'import { serve } from \'@hono/node-server\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'app.get(\'/\', (c) => c.text(\'Hello from Node.js!\'))\n' +
        'app.get(\'/health\', (c) => {\n' +
        '  return c.json({ status: \'ok\', version: process.version })\n' +
        '})\n' +
        '\n' +
        'serve({ fetch: app.fetch, port: 3000 })\n' +
        '// Install: npm install hono @hono/node-server\n' +
        '// Run: npx tsx index.ts'}</code></pre>

      <h3 style={h3s}>AWS Lambda</h3>
      <pre style={cs}><code>{'// lambda.ts — AWS Lambda\n' +
        'import { Hono } from \'hono\'\n' +
        'import { handle } from \'hono/aws-lambda\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'app.get(\'/\', (c) => c.text(\'Hello from Lambda!\'))\n' +
        'app.get(\'/items\', (c) => {\n' +
        '  return c.json([{ id: 1, name: \'Item A\' }])\n' +
        '})\n' +
        '\n' +
        '// Export handler for API Gateway or Lambda URL\n' +
        'export const handler = handle(app)'}</code></pre>

      <h2 style={h2s}>{t.h2ErrorHandling}</h2>
      <p style={ps}>{t.errorDesc}</p>
      <pre style={cs}><code>{'import { Hono } from \'hono\'\n' +
        'import { HTTPException } from \'hono/http-exception\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        '\n' +
        '// Global error handler\n' +
        'app.onError((err, c) => {\n' +
        '  if (err instanceof HTTPException) {\n' +
        '    return c.json(\n' +
        '      { error: err.message, status: err.status },\n' +
        '      err.status\n' +
        '    )\n' +
        '  }\n' +
        '  console.error(err)\n' +
        '  return c.json({ error: \'Internal Server Error\' }, 500)\n' +
        '})\n' +
        '\n' +
        '// 404 handler\n' +
        'app.notFound((c) => {\n' +
        '  return c.json({ error: \'Not Found\', path: c.req.path }, 404)\n' +
        '})\n' +
        '\n' +
        '// Throw HTTPException in handlers\n' +
        'app.get(\'/users/:id\', async (c) => {\n' +
        '  const user = await findUser(c.req.param(\'id\'))\n' +
        '  if (!user) {\n' +
        '    throw new HTTPException(404, {\n' +
        '      message: \'User not found\',\n' +
        '    })\n' +
        '  }\n' +
        '  return c.json(user)\n' +
        '})\n' +
        '\n' +
        '// Custom error with response\n' +
        'app.get(\'/protected\', (c) => {\n' +
        '  throw new HTTPException(401, {\n' +
        '    message: \'Authentication required\',\n' +
        '    res: new Response(\'Unauthorized\', {\n' +
        '      status: 401,\n' +
        '      headers: { \'WWW-Authenticate\': \'Bearer\' },\n' +
        '    }),\n' +
        '  })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2Testing}</h2>
      <p style={ps}>{t.testingDesc}</p>
      <pre style={cs}><code>{'// app.test.ts — using Vitest\n' +
        'import { describe, it, expect } from \'vitest\'\n' +
        'import app from \'./app\'\n' +
        '\n' +
        'describe(\'API\', () => {\n' +
        '  it(\'GET / returns OK\', async () => {\n' +
        '    const res = await app.request(\'/\')\n' +
        '    expect(res.status).toBe(200)\n' +
        '    expect(await res.text()).toBe(\'OK\')\n' +
        '  })\n' +
        '\n' +
        '  it(\'GET /users/:id returns user\', async () => {\n' +
        '    const res = await app.request(\'/users/42\')\n' +
        '    const data = await res.json()\n' +
        '    expect(data.id).toBe(\'42\')\n' +
        '  })\n' +
        '\n' +
        '  it(\'POST /users creates user\', async () => {\n' +
        '    const res = await app.request(\'/users\', {\n' +
        '      method: \'POST\',\n' +
        '      headers: { \'Content-Type\': \'application/json\' },\n' +
        '      body: JSON.stringify({ name: \'Alice\' }),\n' +
        '    })\n' +
        '    expect(res.status).toBe(201)\n' +
        '    const data = await res.json()\n' +
        '    expect(data.name).toBe(\'Alice\')\n' +
        '  })\n' +
        '\n' +
        '  it(\'returns 404 for unknown routes\', async () => {\n' +
        '    const res = await app.request(\'/nonexistent\')\n' +
        '    expect(res.status).toBe(404)\n' +
        '  })\n' +
        '\n' +
        '  it(\'handles auth with Bearer token\', async () => {\n' +
        '    const res = await app.request(\'/api/me\', {\n' +
        '      headers: { Authorization: \'Bearer my-token\' },\n' +
        '    })\n' +
        '    expect(res.status).toBe(200)\n' +
        '  })\n' +
        '})'}</code></pre>

      <h2 style={h2s}>{t.h2JwtAuth}</h2>
      <p style={ps}>{t.jwtDesc}</p>
      <pre style={cs}><code>{'import { Hono } from \'hono\'\n' +
        'import { jwt, sign } from \'hono/jwt\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        'const SECRET = \'my-jwt-secret-key\'\n' +
        '\n' +
        '// Login — generate token\n' +
        'app.post(\'/auth/login\', async (c) => {\n' +
        '  const { email, password } = await c.req.json()\n' +
        '  if (email !== \'admin@test.com\') {\n' +
        '    return c.json({ error: \'Invalid credentials\' }, 401)\n' +
        '  }\n' +
        '  const token = await sign({\n' +
        '    sub: \'user-123\', email, role: \'admin\',\n' +
        '    exp: Math.floor(Date.now() / 1000) + 3600,\n' +
        '  }, SECRET)\n' +
        '  return c.json({ token })\n' +
        '})\n' +
        '\n' +
        '// Protect routes\n' +
        'app.use(\'/api/*\', jwt({ secret: SECRET }))\n' +
        '\n' +
        'app.get(\'/api/me\', (c) => {\n' +
        '  const payload = c.get(\'jwtPayload\')\n' +
        '  return c.json({ userId: payload.sub, role: payload.role })\n' +
        '})\n' +
        '\n' +
        '// Role-based access control\n' +
        'const requireRole = (role: string) => async (c: any, next: any) => {\n' +
        '  if (c.get(\'jwtPayload\').role !== role) {\n' +
        '    return c.json({ error: \'Forbidden\' }, 403)\n' +
        '  }\n' +
        '  await next()\n' +
        '}\n' +
        '\n' +
        'app.delete(\'/api/admin/users/:id\', requireRole(\'admin\'),\n' +
        '  (c) => c.json({ deleted: c.req.param(\'id\') })\n' +
        ')'}</code></pre>

      <h2 style={h2s}>{t.h2Cors}</h2>
      <p style={ps}>{t.corsDesc}</p>
      <pre style={cs}><code>{'import { cors } from \'hono/cors\'\n' +
        '\n' +
        '// Allow all origins (development)\n' +
        'app.use(\'/api/*\', cors())\n' +
        '\n' +
        '// Restrict to specific origins (production)\n' +
        'app.use(\'/api/*\', cors({\n' +
        '  origin: [\'https://myapp.com\', \'https://staging.myapp.com\'],\n' +
        '  allowMethods: [\'GET\', \'POST\', \'PUT\', \'DELETE\'],\n' +
        '  allowHeaders: [\'Content-Type\', \'Authorization\'],\n' +
        '  exposeHeaders: [\'X-Total-Count\'],\n' +
        '  maxAge: 86400,\n' +
        '  credentials: true,\n' +
        '}))\n' +
        '\n' +
        '// Dynamic origin\n' +
        'app.use(\'/api/*\', cors({\n' +
        '  origin: (origin) => {\n' +
        '    return origin.endsWith(\'.myapp.com\') ? origin : \'https://myapp.com\'\n' +
        '  },\n' +
        '}))'}</code></pre>

      <h2 style={h2s}>{t.h2OpenApi}</h2>
      <p style={ps}>{t.openApiDesc}</p>
      <pre style={cs}><code>{'import { OpenAPIHono, createRoute, z } from \'@hono/zod-openapi\'\n' +
        'import { swaggerUI } from \'@hono/swagger-ui\'\n' +
        '\n' +
        'const app = new OpenAPIHono()\n' +
        '\n' +
        'const getUserRoute = createRoute({\n' +
        '  method: \'get\',\n' +
        '  path: \'/users/{id}\',\n' +
        '  request: {\n' +
        '    params: z.object({\n' +
        '      id: z.string().openapi({ example: \'123\' }),\n' +
        '    }),\n' +
        '  },\n' +
        '  responses: {\n' +
        '    200: {\n' +
        '      content: { \'application/json\': {\n' +
        '        schema: z.object({\n' +
        '          id: z.string(), name: z.string(), email: z.string().email(),\n' +
        '        }),\n' +
        '      }},\n' +
        '      description: \'User found\',\n' +
        '    },\n' +
        '  },\n' +
        '})\n' +
        '\n' +
        'app.openapi(getUserRoute, (c) => {\n' +
        '  const { id } = c.req.valid(\'param\')\n' +
        '  return c.json({ id, name: \'Alice\', email: \'a@b.com\' })\n' +
        '})\n' +
        '\n' +
        '// Serve OpenAPI spec + Swagger UI\n' +
        'app.doc(\'/doc\', {\n' +
        '  openapi: \'3.0.0\',\n' +
        '  info: { title: \'My API\', version: \'1.0.0\' },\n' +
        '})\n' +
        'app.get(\'/ui\', swaggerUI({ url: \'/doc\' }))'}</code></pre>

      <h2 style={h2s}>{t.h2Rpc}</h2>
      <p style={ps}>{t.rpcDesc}</p>
      <pre style={cs}><code>{'// ---- Server (server.ts) ----\n' +
        'import { Hono } from \'hono\'\n' +
        'import { zValidator } from \'@hono/zod-validator\'\n' +
        'import { z } from \'zod\'\n' +
        '\n' +
        'const app = new Hono()\n' +
        '  .get(\'/api/posts\', (c) => {\n' +
        '    return c.json([{ id: 1, title: \'Hello Hono\' }])\n' +
        '  })\n' +
        '  .post(\'/api/posts\',\n' +
        '    zValidator(\'json\', z.object({\n' +
        '      title: z.string(), content: z.string(),\n' +
        '    })),\n' +
        '    (c) => c.json({ id: 2, ...c.req.valid(\'json\') }, 201)\n' +
        '  )\n' +
        '\n' +
        'export type AppType = typeof app\n' +
        'export default app\n' +
        '\n' +
        '// ---- Client (client.ts) ----\n' +
        'import { hc } from \'hono/client\'\n' +
        'import type { AppType } from \'./server\'\n' +
        '\n' +
        'const client = hc<AppType>(\'http://localhost:3000\')\n' +
        '\n' +
        '// Fully typed — IDE autocomplete + compile-time checks\n' +
        'const res = await client.api.posts.$get()\n' +
        'const data = await res.json() // typed as { id: number; title: string }[]\n' +
        '\n' +
        'const newPost = await client.api.posts.$post({\n' +
        '  json: { title: \'New\', content: \'Hello!\' },\n' +
        '}) // TypeScript error if shape is wrong'}</code></pre>

      <h2 style={h2s}>{t.h2Perf}</h2>
      <p style={ps}>{t.perfDesc}</p>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>Benchmark Results (simple JSON, 10s)</p>
        <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
          {[t.bench1, t.bench2, t.bench3, t.bench4, t.bench5].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.4rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>{item}</li>
          ))}
        </ul>
      </div>
      <pre style={cs}><code>{'// Performance tips\n' +
        '// 1. RegExpRouter (default) — fastest for static routes\n' +
        'const app = new Hono()  // uses RegExpRouter\n' +
        '\n' +
        '// 2. LinearRouter — better for dynamic route registration\n' +
        'import { LinearRouter } from \'hono/router/linear-router\'\n' +
        'const app = new Hono({ router: new LinearRouter() })\n' +
        '\n' +
        '// 3. Use c.json() over new Response()\n' +
        'app.get(\'/fast\', (c) => c.json({ ok: true }))\n' +
        '\n' +
        '// 4. Stream large responses\n' +
        'app.get(\'/large\', (c) => {\n' +
        '  return c.streamText(async (stream) => {\n' +
        '    for (const chunk of data) await stream.write(chunk)\n' +
        '  })\n' +
        '})\n' +
        '\n' +
        '// 5. Cache with ETag\n' +
        'import { etag } from \'hono/etag\'\n' +
        'app.use(\'/api/*\', etag())'}</code></pre>

      <h2 style={h2s}>{t.h2Faq}</h2>
      {[
        { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A },
        { q: t.faq3Q, a: t.faq3A }, { q: t.faq4Q, a: t.faq4A },
        { q: t.faq5Q, a: t.faq5A }, { q: t.faq6Q, a: t.faq6A },
        { q: t.faq7Q, a: t.faq7A }, { q: t.faq8Q, a: t.faq8A },
      ].map((faq, i) => (
        <div key={i} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7', color: '#475569' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
