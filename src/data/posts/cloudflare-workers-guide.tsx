'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cloudflare Workers Complete Guide: Edge Computing, D1, R2, and KV',
    intro: 'Cloudflare Workers is a serverless edge computing platform that runs your code across 300+ data centers worldwide. Unlike traditional serverless platforms that run in specific regions, Workers execute at the edge closest to the user, delivering sub-millisecond cold start times and ultra-low latency. Combined with D1 (SQLite database), R2 (object storage), KV (key-value store), and Durable Objects (stateful compute), Workers provides a complete platform for building globally distributed applications.',
    h2WhatAre: 'What Are Cloudflare Workers?',
    whatAreDesc: 'Workers are JavaScript/TypeScript functions that run on the Cloudflare edge network. They intercept HTTP requests and can return responses, modify requests, or proxy to origin servers. Workers use the V8 JavaScript engine (same as Chrome) but run in a lightweight isolate instead of a full Node.js runtime.',
    h3KeyFeatures: 'Key Features',
    feat1: 'Sub-millisecond cold starts (no container boot, V8 isolates)',
    feat2: '0ms scheduling: code runs immediately, no queue wait',
    feat3: 'Global deployment: 300+ data centers, runs where the user is',
    feat4: 'Web-standard APIs: fetch, Request, Response, crypto, streams',
    feat5: 'Free tier: 100,000 requests per day, 10ms CPU per request',
    feat6: 'Automatic scaling: handles traffic spikes without configuration',
    h2GettingStarted: 'Getting Started',
    gettingStartedDesc: 'Create and deploy a Worker in minutes using the Wrangler CLI.',
    h2RequestHandling: 'Request Handling Patterns',
    requestDesc: 'Workers use the Web Standards fetch event model. Your Worker exports a default object with a fetch handler.',
    h3Routing: 'URL Routing',
    routingDesc: 'Workers do not have a built-in router, but you can implement routing with URL pattern matching or use a framework like Hono.',
    h3Middleware: 'Middleware Pattern',
    middlewareDesc: 'Implement middleware for authentication, logging, CORS, and other cross-cutting concerns.',
    h2KV: 'KV: Key-Value Storage',
    kvDesc: 'Workers KV is a globally distributed, eventually consistent key-value store. It is optimized for high-read, low-write workloads with data replicated to all edge locations.',
    h2D1: 'D1: SQLite at the Edge',
    d1Desc: 'D1 is Cloudflare\'s serverless SQL database built on SQLite. It runs at the edge, providing low-latency database access without managing servers. D1 supports full SQL, transactions, and automatic replication.',
    h2R2: 'R2: Object Storage',
    r2Desc: 'R2 is S3-compatible object storage with zero egress fees. It is ideal for storing images, files, backups, and static assets. R2 is accessible from Workers, the S3 API, or public URLs.',
    h2DurableObjects: 'Durable Objects: Stateful Edge',
    durableObjectsDesc: 'Durable Objects provide strongly consistent, stateful compute at the edge. Each object has a unique ID, persistent storage, and guaranteed single-instance execution. They are perfect for real-time collaboration, gaming, and stateful APIs.',
    h2Hono: 'Building with Hono Framework',
    honoDesc: 'Hono is a lightweight web framework designed for edge runtimes including Cloudflare Workers. It provides routing, middleware, and type safety with excellent performance.',
    h2Cron: 'Scheduled Workers (Cron Triggers)',
    cronDesc: 'Workers support scheduled execution using cron triggers. These are useful for periodic tasks like data cleanup, report generation, and health checks.',
    h2Performance: 'Performance Best Practices',
    bp1: 'Use the Cache API to cache responses at the edge',
    bp2: 'Minimize KV reads by caching values in memory within a request',
    bp3: 'Use streaming responses for large payloads instead of buffering',
    bp4: 'Keep Worker scripts small to minimize cold start time',
    bp5: 'Use D1 batch queries to reduce round trips',
    bp6: 'Leverage R2 for static assets instead of inlining large data',
    bp7: 'Use Durable Objects for coordination instead of external state',
    bp8: 'Enable Smart Placement for Workers that frequently call origin servers',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'How much does Cloudflare Workers cost?',
    faq1A: 'The free tier includes 100,000 requests per day with 10ms CPU time per invocation. The paid plan (Workers Paid, $5/month) includes 10 million requests, 30ms CPU time, D1 (5GB storage, 5M reads/day), KV (1GB storage), and R2 (10GB storage, 10M reads/month). Additional usage is billed per request.',
    faq2Q: 'Can Workers replace a traditional backend?',
    faq2A: 'For many applications, yes. With D1 for database, R2 for file storage, KV for caching, and Durable Objects for stateful logic, Workers provide a complete backend platform. However, Workers have CPU time limits (30ms free, 30s paid) and cannot maintain long-running connections without Durable Objects.',
    faq3Q: 'Is D1 production-ready?',
    faq3A: 'D1 is generally available and production-ready. It supports full SQL, transactions, and automatic read replication. However, it has write limits and is eventually consistent for reads across regions. For write-heavy workloads, consider using D1 with Durable Objects or an external database.',
    faq4Q: 'How do Workers compare to AWS Lambda?',
    faq4A: 'Workers have faster cold starts (sub-millisecond vs 100ms-1s for Lambda), run closer to users (300+ locations vs ~30 regions), and are simpler to deploy. Lambda supports more languages, longer execution times (up to 15 minutes), and larger payloads. Workers are better for latency-sensitive edge logic; Lambda is better for compute-heavy backend tasks.',
    faq5Q: 'Can I use npm packages in Workers?',
    faq5A: 'Yes, with the node_compat flag in wrangler.toml. Many npm packages work in Workers, but those relying on Node.js-specific APIs (fs, child_process, net) will not work. Popular packages like zod, jose, hono, and itty-router work well. Use the compatibility_flags setting to enable specific Node.js APIs.',
  },
  zh: {
    title: 'Cloudflare Workers 完全指南：边缘计算、D1、R2 和 KV',
    intro: 'Cloudflare Workers 是一个无服务器边缘计算平台，在全球 300+ 数据中心运行你的代码。与在特定区域运行的传统无服务器平台不同，Workers 在最靠近用户的边缘执行，提供亚毫秒级冷启动和超低延迟。',
    h2WhatAre: '什么是 Cloudflare Workers？',
    whatAreDesc: 'Workers 是在 Cloudflare 边缘网络上运行的 JavaScript/TypeScript 函数。它们使用 V8 引擎在轻量级隔离环境中运行。',
    h3KeyFeatures: '主要特性',
    feat1: '亚毫秒级冷启动（V8 隔离，无容器启动）',
    feat2: '0ms 调度：代码立即运行',
    feat3: '全球部署：300+ 数据中心',
    feat4: 'Web 标准 API：fetch、Request、Response、crypto',
    feat5: '免费层：每天 100,000 请求',
    feat6: '自动扩展：无需配置即可处理流量峰值',
    h2GettingStarted: '入门',
    gettingStartedDesc: '使用 Wrangler CLI 在几分钟内创建和部署 Worker。',
    h2RequestHandling: '请求处理模式',
    requestDesc: 'Workers 使用 Web 标准 fetch 事件模型。',
    h3Routing: 'URL 路由',
    routingDesc: 'Workers 没有内置路由器，但可以使用 URL 模式匹配或 Hono 框架实现路由。',
    h3Middleware: '中间件模式',
    middlewareDesc: '实现认证、日志、CORS 等横切关注点的中间件。',
    h2KV: 'KV：键值存储',
    kvDesc: 'Workers KV 是全球分布的最终一致性键值存储，优化用于高读低写工作负载。',
    h2D1: 'D1：边缘 SQLite',
    d1Desc: 'D1 是基于 SQLite 构建的无服务器 SQL 数据库，在边缘运行，提供低延迟数据库访问。',
    h2R2: 'R2：对象存储',
    r2Desc: 'R2 是兼容 S3 的对象存储，零出口费用。适合存储图片、文件和静态资源。',
    h2DurableObjects: 'Durable Objects：有状态边缘',
    durableObjectsDesc: 'Durable Objects 在边缘提供强一致性、有状态计算。适合实时协作和游戏。',
    h2Hono: '使用 Hono 框架构建',
    honoDesc: 'Hono 是为边缘运行时设计的轻量级 Web 框架，提供路由、中间件和类型安全。',
    h2Cron: '定时 Workers（Cron 触发器）',
    cronDesc: 'Workers 支持使用 cron 触发器进行定时执行，适合周期性任务。',
    h2Performance: '性能最佳实践',
    bp1: '使用 Cache API 在边缘缓存响应',
    bp2: '在请求内缓存 KV 值以减少读取',
    bp3: '对大型负载使用流式响应',
    bp4: '保持 Worker 脚本小巧以减少冷启动时间',
    bp5: '使用 D1 批量查询减少往返',
    bp6: '使用 R2 存储静态资源',
    bp7: '使用 Durable Objects 进行协调',
    bp8: '为频繁调用源服务器的 Workers 启用智能放置',
    h2Faq: '常见问题',
    faq1Q: 'Cloudflare Workers 费用多少？',
    faq1A: '免费层包括每天 100,000 请求。付费计划每月 5 美元，包括 1000 万请求、D1、KV 和 R2。',
    faq2Q: 'Workers 能取代传统后端吗？',
    faq2A: '对于许多应用可以。D1 用于数据库、R2 用于文件存储、KV 用于缓存、Durable Objects 用于有状态逻辑。',
    faq3Q: 'D1 已经准备好用于生产了吗？',
    faq3A: 'D1 已正式可用且适合生产使用。支持完整 SQL、事务和自动读复制。',
    faq4Q: 'Workers 与 AWS Lambda 相比如何？',
    faq4A: 'Workers 冷启动更快、距离用户更近、部署更简单。Lambda 支持更多语言和更长执行时间。',
    faq5Q: '可以在 Workers 中使用 npm 包吗？',
    faq5A: '可以，使用 node_compat 标志。依赖 Node.js 特定 API 的包不工作，但 zod、hono 等流行包可以正常使用。',
  },
};

export default function CloudflareWorkersGuide({ lang }: { lang: string }) {
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
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* What Are Workers */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatAre}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whatAreDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3KeyFeatures}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.feat1, t.feat2, t.feat3, t.feat4, t.feat5, t.feat6].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Getting Started */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2GettingStarted}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.gettingStartedDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install Wrangler CLI
npm install -g wrangler

# Authenticate
wrangler login

# Create a new Worker project
npm create cloudflare@latest my-worker
cd my-worker

# Project structure
# my-worker/
# ├── src/
# │   └── index.ts       # Worker entry point
# ├── wrangler.toml       # Configuration
# ├── package.json
# └── tsconfig.json

# Local development
wrangler dev

# Deploy to production
wrangler deploy`}</code></pre>

      {/* Request Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2RequestHandling}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.requestDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// src/index.ts - Basic Worker
export interface Env {
  MY_KV: KVNamespace;
  MY_DB: D1Database;
  MY_BUCKET: R2Bucket;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // Simple routing
    switch (url.pathname) {
      case "/":
        return new Response("Hello from the Edge!", {
          headers: { "content-type": "text/plain" },
        });

      case "/api/data":
        return Response.json({ time: Date.now(), edge: true });

      case "/api/headers":
        const headers: Record<string, string> = {};
        request.headers.forEach((v, k) => (headers[k] = v));
        return Response.json(headers);

      default:
        return new Response("Not Found", { status: 404 });
    }
  },
};`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Routing}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.routingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// URL Pattern-based routing (built-in Web API)
const routes = [
  { pattern: new URLPattern({ pathname: "/api/users/:id" }), handler: getUser },
  { pattern: new URLPattern({ pathname: "/api/users" }), handler: listUsers },
  { pattern: new URLPattern({ pathname: "/api/posts/:slug" }), handler: getPost },
];

async function getUser(request: Request, params: Record<string, string>) {
  return Response.json({ id: params.id, name: "Alice" });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = request.url;

    for (const route of routes) {
      const match = route.pattern.exec(url);
      if (match) {
        return route.handler(request, match.pathname.groups);
      }
    }
    return new Response("Not Found", { status: 404 });
  },
};`}</code></pre>

      {/* KV */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2KV}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.kvDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// wrangler.toml
// [[kv_namespaces]]
// binding = "CACHE"
// id = "abc123"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const cacheKey = \`page:\${url.pathname}\`;

    // Read from KV (returns null if not found)
    const cached = await env.CACHE.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: { "x-cache": "hit", "content-type": "text/html" },
      });
    }

    // Generate and cache the response
    const html = \`<html><body><h1>Page: \${url.pathname}</h1></body></html>\`;

    // Store in KV with 1 hour TTL
    await env.CACHE.put(cacheKey, html, { expirationTtl: 3600 });

    return new Response(html, {
      headers: { "x-cache": "miss", "content-type": "text/html" },
    });
  },
};

// KV supports JSON, text, streams, and ArrayBuffer
// await env.CACHE.put("config", JSON.stringify(config));
// const config = await env.CACHE.get("config", "json");`}</code></pre>

      {/* D1 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2D1}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.d1Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Create D1 database
// wrangler d1 create my-database

// wrangler.toml
// [[d1_databases]]
// binding = "DB"
// database_name = "my-database"
// database_id = "xxx-xxx"

// schema.sql
// CREATE TABLE users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT NOT NULL,
//   email TEXT UNIQUE NOT NULL,
//   created_at TEXT DEFAULT (datetime('now'))
// );

// Apply schema: wrangler d1 execute my-database --file=schema.sql

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/users" && request.method === "GET") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM users ORDER BY created_at DESC LIMIT 50"
      ).all();
      return Response.json(results);
    }

    if (url.pathname === "/api/users" && request.method === "POST") {
      const { name, email } = await request.json<{ name: string; email: string }>();
      const result = await env.DB.prepare(
        "INSERT INTO users (name, email) VALUES (?, ?)"
      ).bind(name, email).run();
      return Response.json({ id: result.meta.last_row_id }, { status: 201 });
    }

    // Batch queries (single round trip)
    if (url.pathname === "/api/stats") {
      const [users, posts] = await env.DB.batch([
        env.DB.prepare("SELECT COUNT(*) as count FROM users"),
        env.DB.prepare("SELECT COUNT(*) as count FROM posts"),
      ]);
      return Response.json({
        users: users.results[0],
        posts: posts.results[0],
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};`}</code></pre>

      {/* R2 */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2R2}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.r2Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// wrangler.toml
// [[r2_buckets]]
// binding = "STORAGE"
// bucket_name = "my-files"

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // remove leading /

    // Upload file
    if (request.method === "PUT") {
      await env.STORAGE.put(key, request.body, {
        httpMetadata: {
          contentType: request.headers.get("content-type") || "application/octet-stream",
        },
      });
      return Response.json({ key, uploaded: true });
    }

    // Download file
    if (request.method === "GET") {
      const object = await env.STORAGE.get(key);
      if (!object) return new Response("Not Found", { status: 404 });

      return new Response(object.body, {
        headers: {
          "content-type": object.httpMetadata?.contentType || "application/octet-stream",
          "etag": object.httpEtag,
        },
      });
    }

    // Delete file
    if (request.method === "DELETE") {
      await env.STORAGE.delete(key);
      return Response.json({ key, deleted: true });
    }

    return new Response("Method not allowed", { status: 405 });
  },
};`}</code></pre>

      {/* Hono */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Hono}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.honoDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Using Hono framework with Workers
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";

type Bindings = { DB: D1Database; STORAGE: R2Bucket; JWT_SECRET: string };
const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use("/api/*", cors());
app.use("/api/protected/*", async (c, next) => {
  const jwtMiddleware = jwt({ secret: c.env.JWT_SECRET });
  return jwtMiddleware(c, next);
});

// Routes
app.get("/", (c) => c.text("Hello Hono on Workers!"));

app.get("/api/users", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM users").all();
  return c.json(results);
});

app.post("/api/users", async (c) => {
  const { name, email } = await c.req.json();
  const result = await c.env.DB.prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
  ).bind(name, email).run();
  return c.json({ id: result.meta.last_row_id }, 201);
});

app.get("/api/protected/me", (c) => {
  const payload = c.get("jwtPayload");
  return c.json({ user: payload });
});

export default app;`}</code></pre>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {[t.bp1, t.bp2, t.bp3, t.bp4, t.bp5, t.bp6, t.bp7, t.bp8].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
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
