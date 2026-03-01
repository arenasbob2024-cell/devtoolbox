'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Hono vs Express.js: The New Minimal Web Framework Battle',
    intro: 'Express.js has dominated Node.js web development for over a decade, but Hono is emerging as a modern alternative designed for the edge computing era. This comprehensive comparison examines performance, developer experience, ecosystem, and real-world use cases to help you choose the right framework for your next project.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Hono offers superior performance (5x+ faster), runs on any JavaScript runtime (Node.js, Deno, Bun, Cloudflare Workers), and has a modern TypeScript-first design. Express.js remains the safe choice for legacy projects and teams needing extensive middleware ecosystem. For new projects in 2025, Hono is the recommended choice.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Hono is 5-10x faster than Express.js with significantly lower memory usage',
    takeaway2: 'Hono runs everywhere: Node.js, Deno, Bun, Cloudflare Workers, AWS Lambda',
    takeaway3: 'Express.js has the largest middleware ecosystem but many are outdated',
    takeaway4: 'Hono is TypeScript-first with excellent type inference out of the box',
    takeaway5: 'Both frameworks have similar APIs, making migration relatively easy',
    takeaway6: 'Hono\'s built-in middleware covers most common use cases',
    
    whatIsHonoTitle: 'What is Hono?',
    whatIsHonoContent: 'Hono is a lightweight, fast, and portable web framework designed for edge computing. Created in 2022 by Yusuke Wada, Hono (meaning "flame" in Japanese) prioritizes speed and portability. It uses the Web Standard Request/Response API, allowing it to run on any JavaScript runtime without modification.',
    
    whatIsExpressTitle: 'What is Express.js?',
    whatIsExpressContent: 'Express.js, created in 2009, is the de facto standard for Node.js web frameworks. Its minimalist, unopinionated approach has made it the foundation of countless web applications and APIs. With over 30 million weekly downloads on npm, Express remains the most widely used Node.js framework.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks using wrk on an AWS c6i.xlarge instance:',
    
    helloWorldTitle: 'Hello World Benchmark',
    helloWorldIntro: 'Simple JSON response test with 100 concurrent connections:',
    
    middlewareTitle: 'Middleware Performance',
    middlewareIntro: 'Testing with common middleware (CORS, body parsing, logging):',
    
    memoryTitle: 'Memory Usage',
    memoryIntro: 'Memory consumption under load (1000 concurrent connections):',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing built-in capabilities and ecosystem:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Similar APIs make migration straightforward:',
    
    expressExampleTitle: 'Express.js',
    honoExampleTitle: 'Hono',
    
    middlewareEcosystemTitle: 'Middleware Ecosystem',
    middlewareEcosystemIntro: 'Both frameworks have rich middleware options:',
    
    honoBuiltInTitle: 'Hono Built-in Middleware',
    expressPopularTitle: 'Popular Express Middleware',
    
    typescriptTitle: 'TypeScript Experience',
    typescriptIntro: 'TypeScript support comparison:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'Where can you deploy each framework?',
    
    migrationTitle: 'Migration from Express to Hono',
    migrationIntro: 'Step-by-step migration guide:',
    
    whenToUseTitle: 'When to Use Each Framework',
    honoBestFor: 'Use Hono When:',
    expressBestFor: 'Use Express When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Hono represents the future of JavaScript web frameworks. Its performance advantages, runtime portability, and modern design make it the ideal choice for new projects. Express.js remains a solid choice for maintaining existing applications, but new development should seriously consider Hono. The future of web development is edge-first, multi-runtime, and TypeScript-native - all strengths of Hono.',
    
    faq1q: 'Is Hono production-ready?',
    faq1a: 'Yes, Hono is production-ready and used by companies like Cloudflare, Deno, and others in production environments. It has reached version 4.x with stable APIs and is actively maintained with regular updates.',
    
    faq2q: 'Can I use Express middleware with Hono?',
    faq2a: 'Not directly, as they have different APIs. However, Hono has middleware equivalents for most popular Express middleware, and many packages work with both. The Hono ecosystem includes CORS, body parsing, authentication, and other common middleware.',
    
    faq3q: 'Is Hono faster than Fastify?',
    faq3a: 'In most benchmarks, Hono and Fastify have comparable performance, both significantly faster than Express. Hono\'s advantage is its portability across runtimes, while Fastify is optimized specifically for Node.js.',
    
    faq4q: 'How do I deploy Hono to Cloudflare Workers?',
    faq4a: 'Hono works natively on Cloudflare Workers without any adapter. Simply use the Web Standard API and deploy with wrangler. Hono\'s use of Request/Response API makes it ideal for edge platforms.',
    
    faq5q: 'Can Hono replace Express in existing projects?',
    faq5a: 'Yes, but it requires migrating your middleware and route handlers. The API is similar enough that route logic transfers easily. Start by migrating one route at a time or use Hono for new microservices.',
    
    faq6q: 'Does Hono support WebSocket?',
    faq6a: 'Hono has built-in WebSocket support for Node.js and Deno. For Cloudflare Workers, you can use Durable Objects with WebSockets. The API is straightforward and well-documented.',
    
    faq7q: 'Is Hono good for building REST APIs?',
    faq7a: 'Absolutely. Hono\'s built-in validation, TypeScript support, and middleware make it excellent for REST API development. It includes helpers for common patterns like OpenAPI/Swagger integration.',
    
    faq8q: 'What about file uploads in Hono?',
    faq8a: 'Hono has built-in support for multipart/form-data file uploads via the hono/multipart middleware. It works consistently across all supported runtimes.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Hono vs Express.js：新的极简Web框架之战',
    intro: 'Express.js十多年来一直主导着Node.js Web开发，但Hono作为专为边缘计算时代设计的现代替代品正在崛起。本全面比较考察性能、开发者体验、生态系统和真实用例，帮助你为下一个项目选择合适的框架。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Hono提供卓越的性能（快5倍以上），可在任何JavaScript运行时（Node.js、Deno、Bun、Cloudflare Workers）上运行，并具有现代的TypeScript优先设计。Express.js对于遗留项目和需要广泛中间件生态系统的团队仍然是安全的选择。对于2025年的新项目，推荐使用Hono。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Hono比Express.js快5-10倍，内存使用量显著更低',
    takeaway2: 'Hono随处运行：Node.js、Deno、Bun、Cloudflare Workers、AWS Lambda',
    takeaway3: 'Express.js拥有最大的中间件生态系统，但许多已过时',
    takeaway4: 'Hono是TypeScript优先，开箱即用提供出色的类型推断',
    takeaway5: '两个框架有类似的API，使迁移相对容易',
    takeaway6: 'Hono的内置中间件涵盖大多数常见用例',
    
    whatIsHonoTitle: '什么是Hono？',
    whatIsHonoContent: 'Hono是一个轻量级、快速、可移植的Web框架，专为边缘计算设计。Hono（日语意为"火焰"）由Yusuke Wada于2022年创建，优先考虑速度和可移植性。它使用Web标准Request/Response API，允许它在任何JavaScript运行时上无需修改即可运行。',
    
    whatIsExpressTitle: '什么是Express.js？',
    whatIsExpressContent: 'Express.js创建于2009年，是Node.js Web框架的事实标准。其极简、无倾向性的方法使其成为无数Web应用和API的基础。Express在npm上每周有超过3000万次下载，仍然是最广泛使用的Node.js框架。',
    
    performanceTitle: '性能对比',
    performanceIntro: '在AWS c6i.xlarge实例上使用wrk的性能基准测试：',
    
    helloWorldTitle: 'Hello World 基准测试',
    helloWorldIntro: '使用100个并发连接进行简单JSON响应测试：',
    
    middlewareTitle: '中间件性能',
    middlewareIntro: '测试常用中间件（CORS、请求体解析、日志记录）：',
    
    memoryTitle: '内存使用',
    memoryIntro: '负载下的内存消耗（1000个并发连接）：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较内置功能和生态系统：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '类似的API使迁移变得简单直接：',
    
    expressExampleTitle: 'Express.js',
    honoExampleTitle: 'Hono',
    
    middlewareEcosystemTitle: '中间件生态系统',
    middlewareEcosystemIntro: '两个框架都有丰富的中间件选项：',
    
    honoBuiltInTitle: 'Hono内置中间件',
    expressPopularTitle: '流行的Express中间件',
    
    typescriptTitle: 'TypeScript体验',
    typescriptIntro: 'TypeScript支持对比：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '你可以在哪里部署每个框架？',
    
    migrationTitle: '从Express迁移到Hono',
    migrationIntro: '分步迁移指南：',
    
    whenToUseTitle: '何时使用每个框架',
    honoBestFor: '使用Hono的场景：',
    expressBestFor: '使用Express的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Hono代表着JavaScript Web框架的未来。其性能优势、运行时可移植性和现代设计使其成为新项目的理想选择。Express.js对于维护现有应用仍然是可靠的选择，但新开发应该认真考虑Hono。Web开发的未来是边缘优先、多运行时和TypeScript原生——这些都是Hono的优势。',
    
    faq1q: 'Hono已经可以用于生产了吗？',
    faq1a: '是的，Hono已经可以用于生产，被Cloudflare、Deno等公司在生产环境中使用。它已达到4.x版本，API稳定，并积极维护，定期更新。',
    
    faq2q: '我可以在Hono中使用Express中间件吗？',
    faq2a: '不能直接，因为它们有不同的API。然而，Hono有大多数流行Express中间件的等效中间件，许多包可以两者通用。Hono生态系统包括CORS、请求体解析、认证和其他常见中间件。',
    
    faq3q: 'Hono比Fastify快吗？',
    faq3a: '在大多数基准测试中，Hono和Fastify具有可比的性能，都比Express快得多。Hono的优势在于其跨运行时的可移植性，而Fastify专门为Node.js优化。',
    
    faq4q: '如何将Hono部署到Cloudflare Workers？',
    faq4a: 'Hono无需任何适配器即可在Cloudflare Workers上原生工作。只需使用Web标准API并用wrangler部署。Hono使用Request/Response API使其成为边缘平台的理想选择。',
    
    faq5q: 'Hono可以在现有项目中替代Express吗？',
    faq5a: '可以，但需要迁移你的中间件和路由处理器。API足够相似，路由逻辑容易转移。开始时可以一次迁移一个路由，或将Hono用于新的微服务。',
    
    faq6q: 'Hono支持WebSocket吗？',
    faq6a: 'Hono为Node.js和Deno提供内置WebSocket支持。对于Cloudflare Workers，你可以将Durable Objects与WebSockets一起使用。API简单且文档完善。',
    
    faq7q: 'Hono适合构建REST API吗？',
    faq7a: '当然。Hono的内置验证、TypeScript支持和中间件使其非常适合REST API开发。它包括OpenAPI/Swagger集成等常见模式的辅助工具。',
    
    faq8q: 'Hono中的文件上传呢？',
    faq8a: 'Hono通过hono/multipart中间件内置支持multipart/form-data文件上传。它在所有支持的运行时上一致工作。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function HonoVsExpressFrameworkComparison({ lang }: { lang: string }) {
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
      <h2 style={h2Style}>{ct.overviewTitle}</h2>
      <p style={pStyle}>{ct.overviewContent}</p>

      <h3 style={h3Style}>{ct.whatIsHonoTitle}</h3>
      <p style={pStyle}>{ct.whatIsHonoContent}</p>

      <h3 style={h3Style}>{ct.whatIsExpressTitle}</h3>
      <p style={pStyle}>{ct.whatIsExpressContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Express.js</th>
              <th style={thStyle}>Hono</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2009', '2022'],
              [isZh ? '设计目标' : 'Design Goal', 'Simplicity', 'Speed + Portability'],
              [isZh ? 'API标准' : 'API Standard', 'Node.js req/res', 'Web Standards (Request/Response)'],
              [isZh ? 'TypeScript支持' : 'TypeScript', isZh ? '需额外配置' : 'Requires setup', isZh ? '原生支持' : 'Native'],
              [isZh ? '运行时支持' : 'Runtime Support', 'Node.js only', 'Node.js, Deno, Bun, Workers'],
              [isZh ? '包大小' : 'Package Size', '~210KB', '~20KB'],
              [isZh ? '依赖数量' : 'Dependencies', '30+', '0'],
            ].map(([feature, express, hono], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{express}</td>
                <td style={{ ...tdStyle, color: '#f59e0b' }}>{hono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.helloWorldTitle}</h3>
      <p style={pStyle}>{ct.helloWorldIntro}</p>

      <pre style={codeStyle}><code>{`// Express Hello World
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000);

// Hono Hello World
import { Hono } from 'hono';
const app = new Hono();

app.get('/', (c) => {
  return c.json({ message: 'Hello World' });
});

export default app;`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Express.js</th>
              <th style={thStyle}>Hono</th>
              <th style={thStyle}>{isZh ? '提升' : 'Improvement'}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒' : 'Requests/sec', '~12,000', '~68,000', '5.7x'],
              [isZh ? '延迟 (p99)' : 'Latency (p99)', '18ms', '3ms', '6x'],
              [isZh ? '内存使用 (启动)' : 'Memory (startup)', '~45MB', '~8MB', '5.6x'],
              [isZh ? '内存使用 (负载下)' : 'Memory (under load)', '~120MB', '~25MB', '4.8x'],
            ].map(([metric, express, hono, improvement], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{express}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{improvement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.middlewareTitle}</h3>
      <p style={pStyle}>{ct.middlewareIntro}</p>

      <pre style={codeStyle}><code>{`// Express with middleware
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.post('/api/users', (req, res) => {
  res.json({ created: req.body });
});

// Hono with middleware
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { bodyLimit } from 'hono/body-limit';

const app = new Hono();
app.use('*', cors());
app.use('*', logger());
app.use('*', bodyLimit({ maxSize: 1024 * 1024 })); // 1MB

app.post('/api/users', async (c) => {
  const body = await c.req.json();
  return c.json({ created: body });
});`}</code></pre>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '配置' : 'Configuration'}</th>
              <th style={thStyle}>Express.js</th>
              <th style={thStyle}>Hono</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'CORS + Helmet + Logger + Body Parser' : 'CORS + Helmet + Logger + Body Parser', '~8,500 req/s', '~52,000 req/s'],
              [isZh ? '仅JSON响应' : 'JSON response only', '~12,000 req/s', '~68,000 req/s'],
            ].map(([config, express, hono], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{config}</td>
                <td style={tdStyle}>{express}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
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
              <th style={thStyle}>Express.js</th>
              <th style={thStyle}>Hono</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '路由' : 'Routing', isZh ? '内置' : 'Built-in', isZh ? '内置 (含模式匹配)' : 'Built-in (with pattern matching)'],
              [isZh ? '中间件' : 'Middleware', isZh ? '需安装' : 'External install', isZh ? '丰富的内置中间件' : 'Rich built-in middleware'],
              [isZh ? 'CORS' : 'CORS', isZh ? 'cors包' : 'cors package', 'hono/cors (内置)'],
              [isZh ? 'Body解析' : 'Body Parsing', isZh ? 'body-parser包' : 'body-parser package', isZh ? '内置' : 'Built-in'],
              [isZh ? 'JWT认证' : 'JWT Auth', isZh ? 'jsonwebtoken包' : 'jsonwebtoken package', 'hono/jwt (内置)'],
              [isZh ? 'Cookie处理' : 'Cookies', isZh ? 'cookie-parser包' : 'cookie-parser package', 'hono/cookie (内置)'],
              [isZh ? '缓存' : 'Caching', isZh ? '需外部包' : 'External packages', 'hono/cache (内置)'],
              [isZh ? 'HTML模板' : 'HTML Templating', isZh ? '需选择模板引擎' : 'Choose template engine', isZh ? 'JSX支持内置' : 'JSX support built-in'],
              [isZh ? '验证' : 'Validation', isZh ? 'joi/yup/zod' : 'joi/yup/zod', '@hono/zod-validator'],
              [isZh ? 'OpenAPI/Swagger' : 'OpenAPI/Swagger', isZh ? '需配置' : 'Requires setup', '@hono/zod-openapi'],
            ].map(([feature, express, hono], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{express}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.expressExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Express.js - Complete API example
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.query('SELECT id, email, name FROM users');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/users', async (req, res) => {
  const { email, name } = req.body;
  
  try {
    const result = await db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name]
    );
    res.status(201).json({ user: result[0] });
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.get('/api/users/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!user.length) return res.status(404).json({ error: 'Not found' });
    res.json({ user: user[0] });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}</code></pre>

      <h3 style={{ ...h3Style, color: '#f59e0b' }}>{ct.honoExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Hono - Complete API example
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { jwt } from 'hono/jwt';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', cors());

// Validation schemas
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// Public routes
app.get('/api/users', async (c) => {
  try {
    const users = await db.query('SELECT id, email, name FROM users');
    return c.json({ users });
  } catch {
    return c.json({ error: 'Database error' }, 500);
  }
});

app.post('/api/users', zValidator('json', userSchema), async (c) => {
  const { email, name } = c.req.valid('json');
  
  try {
    const result = await db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [email, name]
    );
    return c.json({ user: result[0] }, 201);
  } catch {
    return c.json({ error: 'Invalid data' }, 400);
  }
});

// Protected routes
app.use('/api/users/*', jwt({ secret: process.env.JWT_SECRET! }));

app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  const payload = c.get('jwtPayload');
  
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!user.length) return c.json({ error: 'Not found' }, 404);
    return c.json({ user: user[0] });
  } catch {
    return c.json({ error: 'Database error' }, 500);
  }
});

// Error handling
app.onError((err, c) => {
  console.error(\`\${err}\`);
  return c.json({ error: 'Internal server error' }, 500);
});

// Not found
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

export default app;`}</code></pre>

      {/* TypeScript */}
      <h2 style={h2Style}>{ct.typescriptTitle}</h2>
      <p style={pStyle}>{ct.typescriptIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Express.js</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '需要@types/express，类型定义有时过时。请求/响应对象的类型扩展需要额外配置。社区维护的类型可能滞后于新版本。' : 'Requires @types/express, type definitions sometimes outdated. Type extension for request/response objects requires additional configuration. Community-maintained types may lag behind new versions.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f59e0b' }}>
          <strong style={{ color: '#f59e0b' }}>Hono</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '原生TypeScript编写，一流的类型支持。自动推断路径参数、查询参数和请求体类型。Context对象完全类型化，中间件可以修改类型上下文。' : 'Written in native TypeScript with first-class support. Automatically infers path params, query params, and body types. Context object is fully typed, middleware can modify type context.'}
          </p>
        </div>
      </div>

      <pre style={codeStyle}><code>{`// Hono TypeScript - Type-safe routes
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

// Types are automatically inferred
app.get('/api/users/:id', async (c) => {
  // id is typed as string
  const id = c.req.param('id');
  
  // query parameters are typed
  const page = c.req.query('page'); // string | undefined
  
  // Response is type-checked
  return c.json({ 
    id, 
    name: 'John',
    // TypeScript will error if you return wrong type
  });
});

// With Zod validation - types flow through
const schema = z.object({
  email: z.string().email(),
  age: z.number().min(0),
});

app.post('/api/users', zValidator('json', schema), async (c) => {
  // validated is typed as { email: string, age: number }
  const validated = c.req.valid('json');
  
  // TypeScript knows the exact shape
  console.log(validated.email); // ✓
  console.log(validated.name);  // ✗ TypeScript error!
  
  return c.json({ success: true });
});`}</code></pre>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Express.js</th>
              <th style={thStyle}>Hono</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Node.js', '✓ Native', '✓ Native'],
              ['Deno', isZh ? '需适配' : 'Requires adapter', '✓ Native'],
              ['Bun', '✓ Compatible', '✓ Native'],
              ['Cloudflare Workers', isZh ? '需适配器' : 'Requires adapter', '✓ Native'],
              ['Deno Deploy', isZh ? '需适配器' : 'Requires adapter', '✓ Native'],
              ['Vercel Edge', isZh ? '需适配器' : 'Requires adapter', '✓ Native'],
              ['AWS Lambda', '✓ serverless-http', '✓ @hono/aws-lambda'],
              ['Fly.io', '✓ Docker', '✓ Docker / Native'],
              ['Railway', '✓ Native', '✓ Native'],
            ].map(([platform, express, hono], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={tdStyle}>{express}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{hono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Migration */}
      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: Express to Hono

// 1. Install dependencies
// npm uninstall express cors helmet morgan body-parser
// npm install hono @hono/node-server

// 2. Update imports
// Before:
import express from 'express';
import cors from 'cors';

// After:
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

// 3. Update app initialization
// Before:
const app = express();

// After:
const app = new Hono();

// 4. Update middleware
// Before:
app.use(cors());
app.use(express.json());

// After:
app.use('*', cors());
// JSON parsing is built-in, no middleware needed!

// 5. Update route handlers
// Before:
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// After:
app.get('/users', (c) => {
  return c.json({ users: [] });
});

// 6. Update error handling
// Before:
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// After:
app.onError((err, c) => {
  return c.json({ error: err.message }, 500);
});

// 7. Start server (Node.js only)
// Before:
app.listen(3000);

// After:
serve({ fetch: app.fetch, port: 3000 });`}</code></pre>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f59e0b' }}>{ct.honoBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '新项目开发' : 'New project development'}</li>
            <li>{isZh ? '边缘计算/无服务器' : 'Edge computing / serverless'}</li>
            <li>{isZh ? '高性能API' : 'High-performance APIs'}</li>
            <li>{isZh ? 'Cloudflare Workers' : 'Cloudflare Workers'}</li>
            <li>{isZh ? 'TypeScript优先项目' : 'TypeScript-first projects'}</li>
            <li>{isZh ? '多运行时部署' : 'Multi-runtime deployment'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.expressBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '遗留代码维护' : 'Legacy codebase maintenance'}</li>
            <li>{isZh ? '团队熟悉Express生态' : 'Team familiar with Express ecosystem'}</li>
            <li>{isZh ? '依赖特定中间件' : 'Dependencies on specific middleware'}</li>
            <li>{isZh ? 'Node.js专用部署' : 'Node.js-only deployments'}</li>
            <li>{isZh ? '企业级应用(已验证)' : 'Enterprise apps (proven)'}</li>
            <li>{isZh ? '需要丰富文档和教程' : 'Need extensive docs/tutorials'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/uuid-generator`} style={{ color: '#3b82f6', textDecoration: 'none' }}>UUID Generator</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
