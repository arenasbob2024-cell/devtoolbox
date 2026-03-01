'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Cloudflare Workers vs Vercel Edge Functions: 2025 Edge Computing Showdown',
    intro: 'Cloudflare Workers and Vercel Edge Functions are the two leading serverless edge computing platforms in 2025. This comprehensive comparison examines performance, pricing, features, developer experience, and real-world use cases to help you choose the right platform for your next edge-first application.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Cloudflare Workers offers zero cold starts, 300+ edge locations, and unmatched pricing ($0.50/million requests). Vercel Edge Functions provides superior Next.js integration, excellent DX, and seamless frontend-to-edge workflow. Choose Cloudflare for maximum performance and cost efficiency; choose Vercel for Next.js-centric projects and developer experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Cloudflare Workers: 0ms cold start vs Vercel Edge: ~50ms cold start',
    takeaway2: 'Cloudflare has 300+ edge locations vs Vercel\'s 70+ locations',
    takeaway3: 'Cloudflare pricing: $0.50/million requests; Vercel Pro: $20/month minimum',
    takeaway4: 'Vercel Edge excels at Next.js integration; Cloudflare offers more storage options',
    takeaway5: 'Both platforms support standard Web APIs, making code portable',
    takeaway6: 'Cloudflare D1 and Durable Objects provide unique edge database capabilities',
    
    whatIsCFTitle: 'What is Cloudflare Workers?',
    whatIsCFContent: 'Cloudflare Workers is a serverless platform that runs your code at the edge of Cloudflare\'s global network. Launched in 2017, it uses the V8 JavaScript engine (not Node.js) to execute JavaScript, TypeScript, Rust, or C++ compiled to WebAssembly. With 300+ data centers worldwide, Workers code runs milliseconds from virtually every internet user.',
    
    whatIsVercelTitle: 'What is Vercel Edge Functions?',
    whatIsVercelContent: 'Vercel Edge Functions is a serverless edge computing platform integrated deeply with Next.js and the Vercel deployment ecosystem. Built on the same runtime as Cloudflare Workers (V8 isolates), it provides seamless edge functionality for React applications, offering automatic ISR, edge middleware, and streaming SSR at 70+ edge locations worldwide.',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Real-world performance metrics from 2025 benchmarks:',
    
    coldStartTitle: 'Cold Start Performance',
    coldStartIntro: 'Time to first byte (TTFB) for cold function invocations:',
    
    latencyTitle: 'Edge Latency',
    latencyIntro: 'Average response latency from nearest edge location:',
    
    throughputTitle: 'Throughput & Concurrency',
    throughputIntro: 'Maximum sustained throughput under load:',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Detailed pricing breakdown for 2025:',
    
    freeTierTitle: 'Free Tier',
    paidTierTitle: 'Paid Tier Pricing',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Platform capabilities and storage options:',
    
    storageTitle: 'Storage Options',
    storageIntro: 'Database and storage solutions on each platform:',
    
    dxTitle: 'Developer Experience',
    dxIntro: 'Development workflow and tooling comparison:',
    
    deploymentTitle: 'Deployment Options',
    deploymentIntro: 'How to deploy and manage your edge applications:',
    
    whenToUseTitle: 'When to Use Each Platform',
    cfBestFor: 'Use Cloudflare Workers When:',
    vercelBestFor: 'Use Vercel Edge When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, both platforms are excellent choices for edge computing. Cloudflare Workers leads in raw performance (0ms cold starts), global coverage (300+ locations), and cost efficiency ($0.50/million requests). Vercel Edge Functions excels in developer experience, Next.js integration, and frontend-to-edge workflow. For performance-critical APIs and cost-sensitive applications, choose Cloudflare. For Next.js applications and teams prioritizing DX, choose Vercel. Many organizations use both: Cloudflare for APIs and Vercel for frontend.',
    
    faq1q: 'Can I use Node.js packages in Cloudflare Workers?',
    faq1a: 'Cloudflare Workers runs on V8, not Node.js, so Node.js-specific APIs aren\'t available. However, many npm packages work if they don\'t depend on Node.js built-ins. Cloudflare also provides node_compat mode for better compatibility, and packages like wrangler automatically bundle compatible dependencies.',
    
    faq2q: 'Can Vercel Edge Functions access databases?',
    faq2a: 'Yes, Vercel Edge Functions can connect to Vercel KV (Redis), Vercel Postgres, and external databases via HTTP. However, TCP connections aren\'t supported at the edge, so you need databases that offer REST/HTTP APIs or use connection pooling services like Prisma Accelerate.',
    
    faq3q: 'What\'s the difference between Vercel Edge and Serverless Functions?',
    faq3a: 'Vercel Edge Functions run on V8 isolates at 70+ edge locations with ~50ms cold starts, ideal for personalization and auth. Serverless Functions run on AWS Lambda with longer cold starts (~200ms) but full Node.js compatibility, better for heavy computation and database operations.',
    
    faq4q: 'Can I migrate from Vercel Edge to Cloudflare Workers?',
    faq4a: 'Yes, both platforms use standard Web APIs (Request/Response). Code using fetch, Headers, URL, and other Web Standards ports easily. Frameworks like Hono, Remix, and Next.js (via @cloudflare/next-on-pages) support both platforms, making migration straightforward.',
    
    faq5q: 'How does Cloudflare D1 compare to Vercel KV?',
    faq5a: 'Cloudflare D1 is a SQLite database at the edge with SQL query support, ideal for structured data and complex queries. Vercel KV is a Redis-based key-value store, excellent for caching and session storage but limited to key-value operations. D1 supports relations, indexes, and full SQL; KV is simpler but faster for simple lookups.',
    
    faq6q: 'What are Durable Objects in Cloudflare Workers?',
    faq6a: 'Durable Objects are stateful compute units that provide strongly consistent coordination and storage. They\'re ideal for real-time collaborative apps, WebSocket connections, rate limiting, and any use case requiring consistent state. Each object has a unique ID and maintains in-memory state with automatic persistence.',
    
    faq7q: 'Is Vercel Edge Functions free forever?',
    faq7a: 'Vercel\'s free tier includes 100GB bandwidth and unlimited edge function invocations. However, for production apps, you\'ll likely need the Pro plan ($20/month) for features like analytics, password protection, and priority support. Edge function execution time is also limited on free tier.',
    
    faq8q: 'Which platform is better for AI/ML at the edge?',
    faq8a: 'Both support AI workloads. Cloudflare Workers AI provides access to models like Llama, Mistral, and embedding models directly at the edge. Vercel integrates with AI SDK and providers like OpenAI and Anthropic. Cloudflare offers better pricing for AI inference; Vercel provides better React/streaming integration for AI UIs.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Cloudflare Workers vs Vercel Edge Functions：2025年边缘计算对决',
    intro: 'Cloudflare Workers 和 Vercel Edge Functions 是2025年两大领先的无服务器边缘计算平台。本全面比较考察性能、定价、功能、开发者体验和真实用例，帮助你为下一个边缘优先应用选择合适的平台。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Cloudflare Workers 提供零冷启动、300+ 边缘节点和无与伦比的定价（$0.50/百万请求）。Vercel Edge Functions 提供卓越的 Next.js 集成、出色的开发者体验和无缝的前端到边缘工作流。追求极致性能和成本效率选择 Cloudflare；Next.js 项目和注重开发体验选择 Vercel。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Cloudflare Workers：0ms 冷启动 vs Vercel Edge：~50ms 冷启动',
    takeaway2: 'Cloudflare 拥有 300+ 边缘节点 vs Vercel 的 70+ 节点',
    takeaway3: 'Cloudflare 定价：$0.50/百万请求；Vercel Pro：$20/月起',
    takeaway4: 'Vercel Edge 在 Next.js 集成方面表现出色；Cloudflare 提供更多存储选项',
    takeaway5: '两个平台都支持标准 Web API，代码可移植性强',
    takeaway6: 'Cloudflare D1 和 Durable Objects 提供独特的边缘数据库能力',
    
    whatIsCFTitle: '什么是 Cloudflare Workers？',
    whatIsCFContent: 'Cloudflare Workers 是一个无服务器平台，在 Cloudflare 全球网络的边缘运行你的代码。2017年推出，使用 V8 JavaScript 引擎（非 Node.js）执行 JavaScript、TypeScript、Rust 或编译为 WebAssembly 的 C++。在全球 300+ 个数据中心，Workers 代码距离几乎所有互联网用户仅毫秒之遥。',
    
    whatIsVercelTitle: '什么是 Vercel Edge Functions？',
    whatIsVercelContent: 'Vercel Edge Functions 是一个与 Next.js 和 Vercel 部署生态系统深度集成的无服务器边缘计算平台。基于与 Cloudflare Workers 相同的运行时（V8 isolates）构建，为 React 应用提供无缝的边缘功能，包括自动 ISR、边缘中间件和流式 SSR，在全球 70+ 边缘节点运行。',
    
    performanceTitle: '性能对比',
    performanceIntro: '2025年基准测试的真实性能指标：',
    
    coldStartTitle: '冷启动性能',
    coldStartIntro: '冷函数调用的首字节时间（TTFB）：',
    
    latencyTitle: '边缘延迟',
    latencyIntro: '从最近边缘节点的平均响应延迟：',
    
    throughputTitle: '吞吐量与并发',
    throughputIntro: '负载下的最大持续吞吐量：',
    
    pricingTitle: '定价对比',
    pricingIntro: '2025年详细定价分析：',
    
    freeTierTitle: '免费层',
    paidTierTitle: '付费层定价',
    
    featuresTitle: '功能对比',
    featuresIntro: '平台能力和存储选项：',
    
    storageTitle: '存储选项',
    storageIntro: '各平台的数据库和存储解决方案：',
    
    dxTitle: '开发者体验',
    dxIntro: '开发工作流和工具对比：',
    
    deploymentTitle: '部署选项',
    deploymentIntro: '如何部署和管理你的边缘应用：',
    
    whenToUseTitle: '何时使用每个平台',
    cfBestFor: '使用 Cloudflare Workers 的场景：',
    vercelBestFor: '使用 Vercel Edge 的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '2025年，两个平台都是边缘计算的绝佳选择。Cloudflare Workers 在原始性能（0ms 冷启动）、全球覆盖（300+ 节点）和成本效率（$0.50/百万请求）方面领先。Vercel Edge Functions 在开发者体验、Next.js 集成和前端到边缘工作流方面表现出色。对于性能关键的 API 和成本敏感的应用，选择 Cloudflare。对于 Next.js 应用和注重开发体验的团队，选择 Vercel。许多组织同时使用两者：Cloudflare 用于 API，Vercel 用于前端。',
    
    faq1q: '我可以在 Cloudflare Workers 中使用 Node.js 包吗？',
    faq1a: 'Cloudflare Workers 运行在 V8 上，不是 Node.js，所以 Node.js 特定的 API 不可用。然而，许多 npm 包如果不依赖 Node.js 内置模块就可以工作。Cloudflare 还提供 node_compat 模式以获得更好的兼容性，wrangler 等工具会自动打包兼容的依赖。',
    
    faq2q: 'Vercel Edge Functions 可以访问数据库吗？',
    faq2a: '可以，Vercel Edge Functions 可以连接 Vercel KV（Redis）、Vercel Postgres 和通过 HTTP 访问外部数据库。但是，边缘不支持 TCP 连接，所以你需要提供 REST/HTTP API 的数据库或使用 Prisma Accelerate 等连接池服务。',
    
    faq3q: 'Vercel Edge 和 Serverless Functions 有什么区别？',
    faq3a: 'Vercel Edge Functions 在 70+ 边缘位置的 V8 isolates 上运行，冷启动约 50ms，适合个性化和认证。Serverless Functions 在 AWS Lambda 上运行，冷启动更长（约 200ms）但提供完整的 Node.js 兼容性，更适合重计算和数据库操作。',
    
    faq4q: '我可以从 Vercel Edge 迁移到 Cloudflare Workers 吗？',
    faq4a: '可以，两个平台都使用标准 Web API（Request/Response）。使用 fetch、Headers、URL 和其他 Web 标准的代码可以轻松移植。Hono、Remix 和 Next.js（通过 @cloudflare/next-on-pages）等框架同时支持两个平台，使迁移变得简单。',
    
    faq5q: 'Cloudflare D1 和 Vercel KV 有什么区别？',
    faq5a: 'Cloudflare D1 是边缘 SQLite 数据库，支持 SQL 查询，适合结构化数据和复杂查询。Vercel KV 是基于 Redis 的键值存储，非常适合缓存和会话存储，但仅限于键值操作。D1 支持关系、索引和完整 SQL；KV 更简单但对简单查找更快。',
    
    faq6q: '什么是 Cloudflare Workers 中的 Durable Objects？',
    faq6a: 'Durable Objects 是有状态计算单元，提供强一致性的协调和存储。它们非常适合实时协作应用、WebSocket 连接、速率限制以及任何需要一致状态的用例。每个对象都有唯一 ID 并维护内存状态，自动持久化。',
    
    faq7q: 'Vercel Edge Functions 是永久免费的吗？',
    faq7a: 'Vercel 免费层包括 100GB 带宽和无限边缘函数调用。但是，对于生产应用，你可能需要 Pro 计划（$20/月）以获得分析、密码保护和优先支持等功能。免费层的边缘函数执行时间也有限制。',
    
    faq8q: '哪个平台更适合边缘 AI/ML？',
    faq8a: '两者都支持 AI 工作负载。Cloudflare Workers AI 直接在边缘提供 Llama、Mistral 和嵌入模型等。Vercel 与 AI SDK 和 OpenAI、Anthropic 等提供商集成。Cloudflare 为 AI 推理提供更好的定价；Vercel 为 AI UI 提供更好的 React/流式集成。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function CloudflareWorkersVsVercelEdge({ lang }: { lang: string }) {
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
  const h3Style: React.CSSProperties = { fontSize: 18, fontWeight: 600, marginTop: 24, marginBottom: 12, color: '#f97316' };
  const pStyle: React.CSSProperties = { lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 };
  const boxStyle: React.CSSProperties = { padding: 20, background: 'var(--bg-input)', borderRadius: 12, border: '1px solid var(--border-color)', marginBottom: 24 };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 30 }}>{ct.intro}</p>

      {/* TL;DR Box */}
      <div style={{ ...boxStyle, borderLeft: '4px solid #f97316', background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.tldrTitle}</h3>
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

      {/* Platform Overview */}
      <h2 style={h2Style}>{isZh ? '平台概述' : 'Platform Overview'}</h2>

      <h3 style={{ ...h3Style, color: '#f97316' }}>{ct.whatIsCFTitle}</h3>
      <p style={pStyle}>{ct.whatIsCFContent}</p>

      <h3 style={{ ...h3Style, color: '#000' }}>{ct.whatIsVercelTitle}</h3>
      <p style={pStyle}>{ct.whatIsVercelContent}</p>

      {/* Architecture Comparison */}
      <h2 style={h2Style}>{isZh ? '架构对比' : 'Architecture Comparison'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '首次发布' : 'First Release', '2017', '2020'],
              [isZh ? '运行时' : 'Runtime', 'V8 Isolates', 'V8 Isolates'],
              [isZh ? '边缘节点数' : 'Edge Locations', '300+', '70+'],
              [isZh ? '冷启动时间' : 'Cold Start', '0ms', '~50ms'],
              [isZh ? 'CPU时间限制' : 'CPU Time Limit', '10-900s (bundled)', '5-60s'],
              [isZh ? '内存限制' : 'Memory Limit', '128MB', '128MB'],
              [isZh ? '包大小限制' : 'Bundle Size', '1-10MB', '1-4MB'],
              [isZh ? '框架支持' : 'Framework Support', 'Hono, Remix, Astro, Next.js', 'Next.js (Native), Remix, Astro'],
            ].map(([feature, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f97316' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance */}
      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <h3 style={h3Style}>{ct.coldStartTitle}</h3>
      <p style={pStyle}>{ct.coldStartIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '场景' : 'Scenario'}</th>
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '轻量函数' : 'Light Function', '0ms', '~50ms'],
              [isZh ? '中型应用' : 'Medium App', '0ms', '~80ms'],
              [isZh ? '带依赖函数' : 'With Dependencies', '0ms', '~120ms'],
              [isZh ? '首次调用（真实）' : 'First Invocation (Real)', '<5ms', '50-150ms'],
            ].map(([scenario, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{scenario}</td>
                <td style={{ ...tdStyle, color: '#22c55e', fontWeight: 700 }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.latencyTitle}</h3>
      <p style={pStyle}>{ct.latencyIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '地区' : 'Region'}</th>
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '北美' : 'North America', '8-15ms', '15-30ms'],
              [isZh ? '欧洲' : 'Europe', '10-20ms', '20-40ms'],
              [isZh ? '亚太' : 'Asia Pacific', '15-30ms', '30-60ms'],
              [isZh ? '南美' : 'South America', '20-40ms', '40-80ms'],
              [isZh ? '非洲' : 'Africa', '25-50ms', '50-100ms'],
              [isZh ? '全球平均' : 'Global Average', '~20ms', '~40ms'],
            ].map(([region, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{region}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={h3Style}>{ct.throughputTitle}</h3>
      <p style={pStyle}>{ct.throughputIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求/秒（单实例）' : 'Requests/sec (single)', '~10,000', '~8,000'],
              [isZh ? '最大并发连接' : 'Max Concurrent', 'Unlimited*', '1000'],
              [isZh ? 'P99延迟' : 'P99 Latency', '25ms', '45ms'],
              [isZh ? '错误率（高负载）' : 'Error Rate (High Load)', '<0.01%', '<0.1%'],
            ].map(([metric, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <h3 style={h3Style}>{ct.freeTierTitle}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f97316' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>Cloudflare Workers Free</h4>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>100,000 {isZh ? '请求/天' : 'requests/day'}</li>
            <li>10ms CPU {isZh ? '时间/请求' : 'time/request'}</li>
            <li>Workers KV: 1GB</li>
            <li>D1: 5GB</li>
            <li>R2: 10GB</li>
            <li>{isZh ? '无限站点' : 'Unlimited sites'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>Vercel Edge Free (Hobby)</h4>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>100GB {isZh ? '带宽/月' : 'bandwidth/month'}</li>
            <li>{isZh ? '无限函数调用' : 'Unlimited invocations'}</li>
            <li>5GB {isZh ? '函数执行' : 'function execution'}</li>
            <li>Vercel KV: 30MB</li>
            <li>{isZh ? '单团队成员' : 'Single team member'}</li>
            <li>{isZh ? '社区支持' : 'Community support'}</li>
          </ul>
        </div>
      </div>

      <h3 style={h3Style}>{ct.paidTierTitle}</h3>
      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '资源' : 'Resource'}</th>
              <th style={thStyle}>Cloudflare Workers Paid</th>
              <th style={thStyle}>Vercel Pro ($20/mo)</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '请求定价' : 'Requests', '$0.50/million', isZh ? '包含在Pro中' : 'Included in Pro'],
              [isZh ? 'CPU时间' : 'CPU Time', '$0.02/GB-s (bundled)', isZh ? '包含' : 'Included'],
              [isZh ? '超出带宽' : 'Bandwidth Overage', '$0.05/GB', '$40/100GB'],
              [isZh ? 'KV读取' : 'KV Reads', '$0.50/million', '$0.20/million'],
              [isZh ? 'KV写入' : 'KV Writes', '$5.00/million', '$1.00/million'],
              [isZh ? 'D1/Postgres' : 'D1/Postgres', 'D1: $5/mo 25GB', 'Postgres: $0.308/GB'],
              [isZh ? '月最低消费' : 'Monthly Minimum', '$5 (Pay-as-you-go)', '$20'],
            ].map(([resource, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{resource}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
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
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Web标准API' : 'Web Standard APIs', '✓ Full', '✓ Full'],
              [isZh ? 'TypeScript支持' : 'TypeScript Support', '✓ Native', '✓ Native'],
              [isZh ? '环境变量' : 'Environment Variables', '✓ Secrets', '✓ Env vars'],
              [isZh ? '定时任务' : 'Cron Jobs', '✓ Cron Triggers', '✓ Cron Jobs'],
              [isZh ? 'WebSocket' : 'WebSocket', '✓ Durable Objects', '✓ (Limited)'],
              [isZh ? '流式响应' : 'Streaming Response', '✓', '✓'],
              [isZh ? '边缘缓存' : 'Edge Caching', '✓ Cache API', '✓ ISR'],
              [isZh ? '图片优化' : 'Image Optimization', '✓ Cloudflare Images', '✓ Next/Image'],
              [isZh ? 'AI推理' : 'AI Inference', '✓ Workers AI', '✓ AI SDK'],
              [isZh ? '实时日志' : 'Real-time Logs', '✓ Tail Workers', '✓ Log Drains'],
              [isZh ? '分析仪表板' : 'Analytics Dashboard', '✓ Analytics Engine', '✓ Vercel Analytics'],
            ].map(([feature, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#f97316' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Storage */}
      <h2 style={h2Style}>{ct.storageTitle}</h2>
      <p style={pStyle}>{ct.storageIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '存储类型' : 'Storage Type'}</th>
              <th style={thStyle}>Cloudflare</th>
              <th style={thStyle}>Vercel</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '键值存储' : 'Key-Value Store', 'Workers KV\n(Globally replicated)', 'Vercel KV\n(Upstash Redis)'],
              [isZh ? '关系型数据库' : 'Relational Database', 'D1 (SQLite at edge)', 'Vercel Postgres\n(Neon)'],
              [isZh ? '对象存储' : 'Object Storage', 'R2 (S3-compatible,\nno egress fees)', 'Vercel Blob\n(Cloudflare R2)'],
              [isZh ? '有状态协调' : 'Stateful Coordination', 'Durable Objects', '—'],
              [isZh ? '队列' : 'Queues', 'Cloudflare Queues', 'Vercel Queue (Beta)'],
              [isZh ? '向量存储' : 'Vector Store', 'Vectorize', 'Vercel AI (External)'],
            ].map(([type, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{type}</td>
                <td style={{ ...tdStyle, color: '#f97316', whiteSpace: 'pre-line' }}>{cf}</td>
                <td style={{ ...tdStyle, whiteSpace: 'pre-line' }}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Code Examples */}
      <h2 style={h2Style}>{isZh ? '代码示例' : 'Code Examples'}</h2>

      <h3 style={{ ...h3Style, color: '#f97316' }}>Cloudflare Workers</h3>
      <pre style={codeStyle}><code>{`// Cloudflare Workers - API with D1 Database
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    // GET /api/users
    if (url.pathname === '/api/users' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, email, name FROM users'
      ).all();
      
      return Response.json({ users: results }, { headers: corsHeaders });
    }
    
    // POST /api/users
    if (url.pathname === '/api/users' && request.method === 'POST') {
      const { email, name } = await request.json();
      
      const result = await env.DB.prepare(
        'INSERT INTO users (email, name) VALUES (?, ?) RETURNING *'
      ).bind(email, name).first();
      
      return Response.json({ user: result }, { 
        status: 201,
        headers: corsHeaders 
      });
    }
    
    // Rate limiting with KV
    const ip = request.headers.get('CF-Connecting-IP');
    const key = \`rate-limit:\${ip}\`;
    const count = await env.KV.get(key, { type: 'json' }) || 0;
    
    if (count > 100) {
      return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    
    await env.KV.put(key, count + 1, { expirationTtl: 60 });
    
    return Response.json({ error: 'Not found' }, { status: 404 });
  },
};`}</code></pre>

      <h3 style={{ ...h3Style, color: '#000' }}>Vercel Edge Functions</h3>
      <pre style={codeStyle}><code>{`// Vercel Edge Function - middleware.ts (Next.js)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/api/:path*',
  runtime: 'edge',
};

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  
  // Rate limiting with Vercel KV
  const ip = request.ip || 'anonymous';
  const key = \`rate-limit:\${ip}\`;
  
  const count = await fetch(\`https://\${process.env.KV_REST_API_URL}/get/\${key}\`, {
    headers: {
      'Authorization': \`Bearer \${process.env.KV_REST_API_TOKEN}\`,
    },
  }).then(r => r.json());
  
  if (count && count.result > 100) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
  
  // Increment counter
  await fetch(\`https://\${process.env.KV_REST_API_URL}/incr/\${key}\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.KV_REST_API_TOKEN}\`,
    },
  });
  
  // Continue to handler
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-edge-cache', 'HIT');
  response.headers.set('Access-Control-Allow-Origin', '*');
  
  return response;
}

// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = 'edge';

export async function GET() {
  // Using Vercel KV
  const cached = await kv.get('users');
  if (cached) {
    return NextResponse.json({ users: cached, cached: true });
  }
  
  // Fetch from database (using HTTP API)
  const users = await fetch(\`\${process.env.DATABASE_URL}/users\`)
    .then(r => r.json());
  
  // Cache for 60 seconds
  await kv.set('users', users, { ex: 60 });
  
  return NextResponse.json({ users, cached: false });
}`}</code></pre>

      {/* Developer Experience */}
      <h2 style={h2Style}>{ct.dxTitle}</h2>
      <p style={pStyle}>{ct.dxIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #f97316' }}>
          <strong style={{ color: '#f97316' }}>Cloudflare Workers</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? 'Wrangler CLI 提供本地开发、热重载、类型生成。Pages 集成简化前端部署。D1 和 KV 本地模拟。支持 Hono、Remix、Astro 等框架。学习曲线稍陡但功能强大。' : 'Wrangler CLI provides local dev, hot reload, type generation. Pages integration simplifies frontend deployment. Local D1 and KV simulation. Supports Hono, Remix, Astro frameworks. Steeper learning curve but powerful.'}
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #000' }}>
          <strong style={{ color: '#000' }}>Vercel Edge</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {isZh ? '与 Next.js 深度集成，零配置边缘部署。vercel dev 本地模拟边缘运行时。自动 Git 部署、预览部署、分析。最佳的 React/Next.js 开发体验。受限于 Vercel 生态系统。' : 'Deep Next.js integration, zero-config edge deployment. vercel dev locally simulates edge runtime. Auto Git deploys, preview deployments, analytics. Best-in-class React/Next.js DX. Locked into Vercel ecosystem.'}
          </p>
        </div>
      </div>

      {/* Deployment */}
      <h2 style={h2Style}>{ct.deploymentTitle}</h2>
      <p style={pStyle}>{ct.deploymentIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '部署方式' : 'Deployment Method'}</th>
              <th style={thStyle}>Cloudflare Workers</th>
              <th style={thStyle}>Vercel Edge</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['CLI', 'wrangler deploy', 'vercel deploy'],
              ['Git Integration', '✓ GitHub/GitLab', '✓ GitHub/GitLab/Bitbucket'],
              ['Dashboard', '✓ Cloudflare Dashboard', '✓ Vercel Dashboard'],
              ['API', '✓ REST API', '✓ REST API'],
              ['Preview URLs', '✓ Workers.dev', '✓ Preview deployments'],
              ['Rollback', '✓ Version history', '✓ Instant rollback'],
              ['Multi-environment', '✓ Environments', '✓ Preview/Production'],
              ['Monorepo', '✓ wrangler.toml', '✓ vercel.json'],
            ].map(([method, cf, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{method}</td>
                <td style={{ ...tdStyle, color: '#f97316' }}>{cf}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* When to Use */}
      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #f97316' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#f97316' }}>{ct.cfBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '高性能API和微服务' : 'High-performance APIs and microservices'}</li>
            <li>{isZh ? '全球用户覆盖（300+节点）' : 'Global user base (300+ locations)'}</li>
            <li>{isZh ? '成本敏感项目' : 'Cost-sensitive projects'}</li>
            <li>{isZh ? '需要D1或Durable Objects' : 'Need D1 or Durable Objects'}</li>
            <li>{isZh ? 'BFF（Backend for Frontend）' : 'BFF (Backend for Frontend)'}</li>
            <li>{isZh ? 'API网关和认证' : 'API gateway and authentication'}</li>
            <li>{isZh ? '实时协作应用' : 'Real-time collaborative apps'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #000' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#000' }}>{ct.vercelBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? 'Next.js应用' : 'Next.js applications'}</li>
            <li>{isZh ? 'React Server Components' : 'React Server Components'}</li>
            <li>{isZh ? '注重开发体验的团队' : 'Teams prioritizing DX'}</li>
            <li>{isZh ? '需要ISR和流式SSR' : 'Need ISR and streaming SSR'}</li>
            <li>{isZh ? '营销网站和博客' : 'Marketing sites and blogs'}</li>
            <li>{isZh ? '全栈React应用' : 'Full-stack React apps'}</li>
            <li>{isZh ? '快速原型开发' : 'Rapid prototyping'}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      {/* CTA */}
      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(234,88,12,0.1))', borderRadius: 12, border: '1px solid rgba(249,115,22,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#f97316', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#f97316', textDecoration: 'none' }}>JWT Decoder</a> • {' '}
        <a href={`/${lang}/tools/http-status`} style={{ color: '#f97316', textDecoration: 'none' }}>HTTP Status</a>
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
