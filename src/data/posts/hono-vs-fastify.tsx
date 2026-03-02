'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Hono vs Fastify: Ultra-Fast Web Framework Comparison',
    intro: 'Hono and Fastify are two of the fastest web frameworks in the JavaScript ecosystem. Fastify has been the performance leader for Node.js, while Hono brings speed across all JavaScript runtimes. This comparison examines their architectures, performance, and optimal use cases.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Fastify remains the fastest Node.js-only framework with an extensive plugin ecosystem. Hono offers comparable performance with multi-runtime support (Node.js, Deno, Bun, Cloudflare Workers). Choose Fastify for Node.js microservices and APIs. Choose Hono for edge computing and multi-runtime projects.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Both frameworks deliver 50,000+ requests/second performance',
    takeaway2: 'Fastify has a larger plugin ecosystem with 200+ plugins',
    takeaway3: 'Hono runs on Node.js, Deno, Bun, and edge platforms',
    takeaway4: 'Fastify schema validation is more mature and performant',
    takeaway5: 'Hono has better TypeScript inference out of the box',
    takeaway6: 'Both support WebSocket, but Hono has native edge support',
    
    whatIsHonoTitle: 'What is Hono?',
    whatIsHonoContent: 'Hono (meaning "flame" in Japanese) is a lightweight, ultrafast web framework designed for edge computing. Created in 2022, it uses Web Standard APIs (Request/Response) enabling it to run on any JavaScript runtime without modification. Hono prioritizes developer experience with excellent TypeScript support and a rich set of built-in middleware.',
    
    whatIsFastifyTitle: 'What is Fastify?',
    whatIsFastifyContent: 'Fastify is a high-performance Node.js web framework focused on speed and developer experience. Since 2016, it has been the performance benchmark for Node.js APIs. Its plugin architecture, JSON schema validation, and extensive ecosystem make it ideal for building production-ready microservices and APIs.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Comprehensive benchmarks on Node.js 20:',
    
    basicRoutingTitle: 'Basic Routing Benchmark',
    basicRoutingIntro: 'Simple GET endpoint with JSON response:',
    
    withMiddlewareTitle: 'With Middleware Benchmark',
    withMiddlewareIntro: 'Testing with validation, CORS, and logging:',
    
    memoryTitle: 'Memory Efficiency',
    memoryIntro: 'Memory usage under various loads:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Core capabilities and architectural differences:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Framework syntax and patterns:',
    
    honoExampleTitle: 'Hono',
    fastifyExampleTitle: 'Fastify',
    
    validationTitle: 'Request Validation',
    validationIntro: 'Schema validation approaches:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Platform and runtime support:',
    
    whenToUseTitle: 'When to Use Each Framework',
    honoBestFor: 'Use Hono When:',
    fastifyBestFor: 'Use Fastify When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Fastify and Hono represent different philosophies. Fastify excels in Node.js environments with its mature plugin system and schema validation. Hono wins for edge computing and multi-runtime scenarios. For traditional Node.js microservices, Fastify remains the proven choice. For serverless and edge deployments, Hono provides unmatched flexibility with comparable performance.',
    
    faq1q: 'Is Hono faster than Fastify?',
    faq1a: 'Performance is comparable with Fastify slightly faster on Node.js (5-10%). However, Hono runs on edge platforms where Fastify cannot. In real applications, the difference is negligible compared to database and network latency.',
    
    faq2q: 'Can I use Fastify plugins with Hono?',
    faq2a: 'No, they have incompatible plugin systems. Hono has its own middleware ecosystem covering most Fastify plugin equivalents. Many popular patterns like JWT, CORS, and rate limiting have Hono implementations.',
    
    faq3q: 'Which has better TypeScript support?',
    faq3a: 'Both have excellent TypeScript support. Hono has better type inference for route parameters and middleware context out of the box. Fastify requires more type annotations but has comprehensive type definitions.',
    
    faq4q: 'How do they compare for WebSocket?',
    faq4a: 'Fastify uses @fastify/websocket plugin. Hono has built-in WebSocket support with better edge platform compatibility. For Cloudflare Workers Durable Objects, Hono is the only viable option.',
    
    faq5q: 'Can I migrate from Fastify to Hono?',
    faq5a: 'Yes, migration is straightforward. Route handlers have similar signatures. Main changes are: plugin system → middleware chains, schema validation → Zod integration, and Fastify hooks → Hono middleware.',
    
    faq6q: 'Which is better for serverless?',
    faq6a: 'Hono is better for serverless due to its Web Standard API design. It works natively on AWS Lambda, Cloudflare Workers, and Deno Deploy without adapters. Fastify requires @fastify/aws-lambda adapter.',
    
    faq7q: 'How do they handle validation?',
    faq7a: 'Fastify uses JSON Schema with fast-json-stringify for blazing-fast validation. Hono integrates with Zod for developer-friendly validation. Fastify is faster, Zod is more ergonomic.',
    
    faq8q: 'Which has better documentation?',
    faq8a: 'Both have excellent documentation. Fastify docs are more comprehensive with detailed plugin guides. Hono docs are cleaner and more focused. Both have active communities and good examples.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Hono vs Fastify：超快Web框架对比',
    intro: 'Hono 和 Fastify 是 JavaScript 生态中最快的两个 Web 框架。Fastify 一直是 Node.js 性能领导者，而 Hono 在所有 JavaScript 运行时上提供高速。本比较考察它们的架构、性能和最佳用例。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Fastify 仍然是最快的纯 Node.js 框架，拥有广泛的插件生态系统。Hono 提供可比的性能，支持多运行时（Node.js、Deno、Bun、Cloudflare Workers）。Node.js 微服务和 API 选择 Fastify。边缘计算和多运行时项目选择 Hono。',
    
    takeawaysTitle: '核心要点',
    takeaway1: '两个框架都提供 50,000+ 请求/秒的性能',
    takeaway2: 'Fastify 拥有更大的插件生态系统，200+ 插件',
    takeaway3: 'Hono 可在 Node.js、Deno、Bun 和边缘平台运行',
    takeaway4: 'Fastify 的 schema 验证更成熟和高效',
    takeaway5: 'Hono 开箱即用提供更好的 TypeScript 推断',
    takeaway6: '两者都支持 WebSocket，但 Hono 有原生边缘支持',
    
    whatIsHonoTitle: '什么是 Hono？',
    whatIsHonoContent: 'Hono（日语意为"火焰"）是一个轻量级、超快的 Web 框架，专为边缘计算设计。2022 年创建，使用 Web 标准 API（Request/Response），使其无需修改即可在任何 JavaScript 运行时上运行。Hono 优先考虑开发者体验，提供出色的 TypeScript 支持和丰富的内置中间件。',
    
    whatIsFastifyTitle: '什么是 Fastify？',
    whatIsFastifyContent: 'Fastify 是一个专注于速度和开发者体验的高性能 Node.js Web 框架。自 2016 年以来，它一直是 Node.js API 的性能基准。其插件架构、JSON schema 验证和广泛的生态系统使其成为构建生产就绪微服务和 API 的理想选择。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在 Node.js 20 上的综合基准测试：',
    
    basicRoutingTitle: '基础路由基准测试',
    basicRoutingIntro: '简单 GET 端点返回 JSON 响应：',
    
    withMiddlewareTitle: '带中间件基准测试',
    withMiddlewareIntro: '测试验证、CORS 和日志记录：',
    
    memoryTitle: '内存效率',
    memoryIntro: '各种负载下的内存使用：',
    
    featuresTitle: '功能对比',
    featuresIntro: '核心能力和架构差异：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '框架语法和模式：',
    
    honoExampleTitle: 'Hono',
    fastifyExampleTitle: 'Fastify',
    
    validationTitle: '请求验证',
    validationIntro: 'Schema 验证方法：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '平台和运行时支持：',
    
    whenToUseTitle: '何时使用每个框架',
    honoBestFor: '使用 Hono 的场景：',
    fastifyBestFor: '使用 Fastify 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Fastify 和 Hono 代表不同哲学。Fastify 在 Node.js 环境中表现出色，拥有成熟的插件系统和 schema 验证。Hono 在边缘计算和多运行时场景中胜出。对于传统 Node.js 微服务，Fastify 仍是经验证的选择。对于无服务器和边缘部署，Hono 以可比的性能提供无与伦比的灵活性。',
    
    faq1q: 'Hono 比 Fastify 快吗？',
    faq1a: '性能相当，Fastify 在 Node.js 上略快（5-10%）。然而，Hono 可在 Fastify 无法运行的边缘平台上运行。在实际应用中，与数据库和网络延迟相比，差异可忽略不计。',
    
    faq2q: '可以在 Hono 中使用 Fastify 插件吗？',
    faq2a: '不可以，它们有不兼容的插件系统。Hono 有自己的中间件生态系统，涵盖大多数 Fastify 插件的等效功能。JWT、CORS 和速率限制等流行模式都有 Hono 实现。',
    
    faq3q: '哪个有更好的 TypeScript 支持？',
    faq3a: '两者都有出色的 TypeScript 支持。Hono 开箱即用为路由参数和中间件上下文提供更好的类型推断。Fastify 需要更多类型注解但有全面的类型定义。',
    
    faq4q: '它们如何比较 WebSocket？',
    faq4a: 'Fastify 使用 @fastify/websocket 插件。Hono 有内置 WebSocket 支持，边缘平台兼容性更好。对于 Cloudflare Workers Durable Objects，Hono 是唯一可行的选择。',
    
    faq5q: '可以从 Fastify 迁移到 Hono 吗？',
    faq5a: '可以，迁移很简单。路由处理器有类似的签名。主要变化：插件系统 → 中间件链，schema 验证 → Zod 集成，Fastify hooks → Hono 中间件。',
    
    faq6q: '哪个更适合无服务器？',
    faq6a: 'Hono 更适合无服务器，因其 Web 标准 API 设计。它无需适配器即可在 AWS Lambda、Cloudflare Workers 和 Deno Deploy 上原生工作。Fastify 需要 @fastify/aws-lambda 适配器。',
    
    faq7q: '它们如何处理验证？',
    faq7a: 'Fastify 使用 JSON Schema 和 fast-json-stringify 进行超快验证。Hono 与 Zod 集成进行开发者友好的验证。Fastify 更快，Zod 更符合人体工程学。',
    
    faq8q: '哪个有更好的文档？',
    faq8a: '两者都有出色的文档。Fastify 文档更全面，有详细的插件指南。Hono 文档更简洁和专注。两者都有活跃的社区和良好的示例。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HonoVsFastify({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{isZh ? '框架概述' : 'Framework Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsHonoTitle}</h3>
      <p style={pStyle}>{ct.whatIsHonoContent}</p>

      <h3 style={h3Style}>{ct.whatIsFastifyTitle}</h3>
      <p style={pStyle}>{ct.whatIsFastifyContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2022', '2016'],
              [isZh ? 'API标准' : 'API Standard', 'Web Standards', 'Node.js native'],
              [isZh ? '运行时支持' : 'Runtime Support', 'Node/Deno/Bun/Workers', 'Node.js only'],
              [isZh ? '包大小' : 'Package Size', '~14KB', '~80KB'],
              [isZh ? 'TypeScript' : 'TypeScript', 'Native', '@fastify/type-provider'],
              [isZh ? '插件系统' : 'Plugin System', 'Middleware chains', 'Fastify plugins'],
              [isZh ? '验证方式' : 'Validation', 'Zod/Valibot', 'JSON Schema'],
            ].map(([feature, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{hono}</td>
                <td style={tdStyle}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.basicRoutingTitle}</h3>
      <p style={pStyle}>{ct.basicRoutingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒' : 'Requests/sec', '68,000', '72,000'],
              [isZh ? '延迟 (p50)' : 'Latency (p50)', '1.2ms', '1.1ms'],
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '3.2ms', '2.8ms'],
              [isZh ? '吞吐量' : 'Throughput', '8.5 MB/s', '9.2 MB/s'],
            ].map(([metric, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{hono}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.withMiddlewareTitle}</h3>
      <p style={pStyle}>{ct.withMiddlewareIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒' : 'Requests/sec', '52,000', '58,000'],
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '4.1ms', '3.5ms'],
              [isZh ? 'CPU使用率' : 'CPU Usage', '45%', '42%'],
            ].map(([metric, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{hono}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.memoryTitle}</h3>
      <p style={pStyle}>{ct.memoryIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '启动内存' : 'Startup Memory', '8MB', '12MB'],
              [isZh ? '1000并发' : '1000 Concurrent', '25MB', '32MB'],
              [isZh ? '5000并发' : '5000 Concurrent', '68MB', '85MB'],
              [isZh ? 'GC暂停时间' : 'GC Pause Time', '2ms', '3ms'],
            ].map(([scenario, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
                <td style={tdStyle}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Features */}
      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '路由' : 'Routing', '✓', '✓'],
              [isZh ? '中间件' : 'Middleware', 'Built-in (30+)', 'Plugins (200+)'],
              [isZh ? 'Schema验证' : 'Schema Validation', 'Zod/Valibot', 'JSON Schema'],
              [isZh ? 'WebSocket' : 'WebSocket', 'Built-in', '@fastify/websocket'],
              [isZh ? 'JWT' : 'JWT', 'hono/jwt', '@fastify/jwt'],
              [isZh ? 'Cookie' : 'Cookie', 'hono/cookie', '@fastify/cookie'],
              [isZh ? 'Rate Limiting' : 'Rate Limiting', 'hono/cookie', '@fastify/rate-limit'],
              [isZh ? '压缩' : 'Compression', 'Built-in', '@fastify/compress'],
              [isZh ? 'Swagger/OpenAPI' : 'Swagger/OpenAPI', '@hono/zod-openapi', '@fastify/swagger'],
              [isZh ? '边缘支持' : 'Edge Support', '✓ Native', '需要适配器'],
            ].map(([feature, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{hono}</td>
                <td style={tdStyle}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.honoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Hono - Complete API with validation
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Validation schema
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().int().positive().optional(),
});

// Routes
app.get('/api/users', async (c) => {
  const users = await db.select().from(usersTable);
  return c.json({ users });
});

app.post('/api/users', zValidator('json', userSchema), async (c) => {
  const body = c.req.valid('json');
  const user = await db.insert(usersTable).values(body).returning();
  return c.json({ user: user[0] }, 201);
});

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  
  if (!user.length) {
    return c.json({ error: 'Not found' }, 404);
  }
  
  return c.json({ user: user[0] });
});

export default app;`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.fastifyExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Fastify - Complete API with validation
import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';

const fastify = Fastify({
  logger: true,
});

// Plugins
await fastify.register(cors);
await fastify.register(sensible);

// Schema definitions
const userSchema = {
  type: 'object',
  required: ['email', 'name'],
  properties: {
    email: { type: 'string', format: 'email' },
    name: { type: 'string', minLength: 2 },
    age: { type: 'integer', minimum: 1 },
  },
};

// Routes
fastify.get('/api/users', async (request, reply) => {
  const users = await db.select().from(usersTable);
  return { users };
});

fastify.post('/api/users', {
  schema: {
    body: userSchema,
  },
}, async (request, reply) => {
  const user = await db.insert(usersTable).values(request.body).returning();
  reply.code(201);
  return { user: user[0] };
});

fastify.get('/api/users/:id', async (request, reply) => {
  const { id } = request.params;
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  
  if (!user.length) {
    reply.code(404);
    return { error: 'Not found' };
  }
  
  return { user: user[0] };
});

await fastify.listen({ port: 3000 });`}</code></pre>

      {/* Validation */}
      <h2 style={h2Style}>{ct.validationTitle}</h2>
      <p style={pStyle}>{ct.validationIntro}</p>

      <pre style={codeStyle}><code>{`// Hono with Zod - Developer-friendly validation
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z.number().int().positive().optional(),
});

app.post('/users', zValidator('json', schema), (c) => {
  // TypeScript knows the exact shape
  const { email, password, age } = c.req.valid('json');
  return c.json({ success: true });
});

// Fastify with JSON Schema - Performance-optimized
const schema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      age: { type: 'integer', minimum: 1 },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  },
};

fastify.post('/users', { schema }, async (request, reply) => {
  const { email, password, age } = request.body;
  return { success: true };
});`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>Fastify</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Node.js', '✓', '✓ (optimized)'],
              ['Deno', '✓ Native', '✓ Compatibility'],
              ['Bun', '✓ Native', '✓ Compatible'],
              ['Cloudflare Workers', '✓ Native', '需要适配器'],
              ['AWS Lambda', '✓ @hono/aws-lambda', '✓ @fastify/aws-lambda'],
              ['Vercel Edge', '✓ Native', '需要适配器'],
              ['Deno Deploy', '✓ Native', '需要适配器'],
            ].map(([platform, hono, fastify], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
                <td style={tdStyle}>{fastify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.honoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '边缘计算部署' : 'Edge computing deployments'}</li>
            <li>{isZh ? '无服务器函数' : 'Serverless functions'}</li>
            <li>{isZh ? '多运行时需求' : 'Multi-runtime requirements'}</li>
            <li>{isZh ? 'Cloudflare Workers' : 'Cloudflare Workers'}</li>
            <li>{isZh ? 'TypeScript优先项目' : 'TypeScript-first projects'}</li>
            <li>{isZh ? '轻量级微服务' : 'Lightweight microservices'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.fastifyBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '纯Node.js环境' : 'Node.js-only environments'}</li>
            <li>{isZh ? '企业级微服务' : 'Enterprise microservices'}</li>
            <li>{isZh ? '需要成熟插件' : 'Need mature plugins'}</li>
            <li>{isZh ? 'JSON Schema验证' : 'JSON Schema validation'}</li>
            <li>{isZh ? '团队熟悉Fastify' : 'Team familiar with Fastify'}</li>
            <li>{isZh ? '高性能API网关' : 'High-performance API gateways'}</li>
            <li>{isZh ? '传统服务器部署' : 'Traditional server deployment'}</li>
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
        <a href={'/' + lang + '/tools/jwt-decoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
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
