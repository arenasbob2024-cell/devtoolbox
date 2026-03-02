'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Upstash vs Vercel KV: Serverless Redis Comparison',
    intro: 'Serverless Redis is essential for modern applications needing caching, sessions, and real-time features. Upstash and Vercel KV are two leading solutions, but they differ significantly in pricing, features, and flexibility. This comparison helps you choose the right serverless Redis for your needs.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Upstash offers better pricing flexibility, more regions, broader Redis feature support, and works with any cloud provider. Vercel KV provides seamless Vercel integration but is limited to Vercel ecosystem and fewer features. For most developers, Upstash is the superior choice. Choose Vercel KV only if you are fully committed to Vercel.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Upstash offers per-request pricing, Vercel KV uses fixed tiers',
    takeaway2: 'Upstash supports 25+ regions, Vercel KV is limited to 4',
    takeaway3: 'Upstash works with any platform, Vercel KV requires Vercel',
    takeaway4: 'Upstash supports more Redis commands and data structures',
    takeaway5: 'Both offer global replication and low latency',
    takeaway6: 'Upstash has better free tier for development',
    
    whatIsUpstashTitle: 'What is Upstash?',
    whatIsUpstashContent: 'Upstash is a serverless Redis provider designed for modern cloud applications. Founded in 2021, it offers per-request pricing, global edge caching, and works with any cloud platform. Upstash supports Redis 6+ commands, Kafka, and QStash for message queuing.',
    
    whatIsVercelKVTitle: 'What is Vercel KV?',
    whatIsVercelKVContent: 'Vercel KV is a serverless Redis solution built on Upstash, exclusively for Vercel customers. Launched in 2023, it provides seamless integration with Vercel deployments, automatic environment variable injection, and usage-based pricing within Vercel ecosystem.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Cost analysis for different usage levels:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Redis capabilities and platform features:',
    
    regionsTitle: 'Global Regions',
    regionsIntro: 'Where can your Redis be deployed?',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Implementation comparison:',
    
    upstashExampleTitle: 'Upstash',
    vercelKvExampleTitle: 'Vercel KV',
    
    performanceTitle: 'Performance & Latency',
    performanceIntro: 'Speed and reliability metrics:',
    
    integrationTitle: 'Platform Integration',
    integrationIntro: 'How well does each integrate with your stack?',
    
    useCasesTitle: 'Common Use Cases',
    useCasesIntro: 'Best practices for serverless Redis:',
    
    whenToUseTitle: 'When to Use Each Solution',
    upstashBestFor: 'Use Upstash When:',
    vercelKvBestFor: 'Use Vercel KV When:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, Upstash is the clear winner for most serverless Redis use cases. Its flexible pricing, extensive region coverage, platform independence, and broader Redis feature support make it the superior choice. Vercel KV is only recommended if you are fully invested in the Vercel ecosystem and want the convenience of automatic integration. For teams using multiple cloud providers or wanting maximum flexibility, Upstash is the obvious choice.',
    
    faq1q: 'Can I migrate from Vercel KV to Upstash?',
    faq1a: 'Yes, migration is straightforward since Vercel KV is built on Upstash. Export your data, create an Upstash account, and update your connection strings. The Redis commands are compatible.',
    
    faq2q: 'Does Vercel KV support all Redis commands?',
    faq2a: 'Vercel KV supports a subset of Redis commands focused on common use cases. Upstash supports more commands including advanced data structures like Streams, Geo, and HyperLogLog.',
    
    faq3q: 'What about Redis persistence?',
    faq3a: 'Both offer data persistence. Upstash provides multiple persistence options including AOF and RDB. Vercel KV handles persistence automatically but with fewer configuration options.',
    
    faq4q: 'Can I use both in the same project?',
    faq4a: 'Yes, you can use both simultaneously. For example, use Vercel KV for session storage and Upstash for caching API responses. They are independent services.',
    
    faq5q: 'How do they handle cold starts?',
    faq5a: 'Both are designed for serverless with minimal cold starts. Upstash maintains warm connections and offers connection pooling. Vercel KV benefits from Vercel edge network integration.',
    
    faq6q: 'Which has better TypeScript support?',
    faq6a: 'Both have excellent TypeScript support. Upstash provides @upstash/redis with full type definitions. Vercel KV SDK is also fully typed and integrates with Vercel AI SDK.',
    
    faq7q: 'What about rate limiting?',
    faq7a: 'Upstash has a dedicated rate limiting library (@upstash/ratelimit) with sliding window, fixed window, and token bucket algorithms. Vercel KV can be used for rate limiting but requires custom implementation.',
    
    faq8q: 'Do they support Redis clusters?',
    faq8a: 'Upstash offers Redis clusters for high availability and scaling. Vercel KV is a managed single instance that handles scaling automatically but without explicit cluster configuration.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Upstash vs Vercel KV：无服务器Redis对比',
    intro: '无服务器Redis对于需要缓存、会话和实时功能的现代应用至关重要。Upstash和Vercel KV是两个领先的解决方案，但它们在定价、功能和灵活性方面有显著差异。本比较帮助你选择合适的无服务器Redis。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Upstash提供更好的定价灵活性、更多区域、更广泛的Redis功能支持，并可与任何云提供商一起使用。Vercel KV提供无缝的Vercel集成，但仅限于Vercel生态系统且功能较少。对于大多数开发者，Upstash是更优的选择。只有完全投入Vercel时才选择Vercel KV。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Upstash提供按请求定价，Vercel KV使用固定层级',
    takeaway2: 'Upstash支持25+区域，Vercel KV仅限4个',
    takeaway3: 'Upstash适用于任何平台，Vercel KV需要Vercel',
    takeaway4: 'Upstash支持更多Redis命令和数据结构',
    takeaway5: '两者都提供全球复制和低延迟',
    takeaway6: 'Upstash有更好的开发免费层',
    
    whatIsUpstashTitle: '什么是Upstash？',
    whatIsUpstashContent: 'Upstash是为现代云应用设计的无服务器Redis提供商。成立于2021年，它提供按请求定价、全球边缘缓存，并可与任何云平台一起使用。Upstash支持Redis 6+命令、Kafka和用于消息队列的QStash。',
    
    whatIsVercelKVTitle: '什么是Vercel KV？',
    whatIsVercelKVContent: 'Vercel KV是基于Upstash构建的无服务器Redis解决方案，专为Vercel客户提供。于2023年推出，它提供与Vercel部署的无缝集成、自动环境变量注入，以及Vercel生态系统内的基于使用量的定价。',
    
    pricingTitle: '定价对比',
    pricingIntro: '不同使用级别的成本分析：',
    
    featuresTitle: '功能对比',
    featuresIntro: 'Redis能力和平台功能：',
    
    regionsTitle: '全球区域',
    regionsIntro: '你的Redis可以部署在哪里？',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '实现比较：',
    
    upstashExampleTitle: 'Upstash',
    vercelKvExampleTitle: 'Vercel KV',
    
    performanceTitle: '性能与延迟',
    performanceIntro: '速度和可靠性指标：',
    
    integrationTitle: '平台集成',
    integrationIntro: '每个与你的技术栈集成得如何？',
    
    useCasesTitle: '常见用例',
    useCasesIntro: '无服务器Redis的最佳实践：',
    
    whenToUseTitle: '何时使用每个解决方案',
    upstashBestFor: '使用Upstash的场景：',
    vercelKvBestFor: '使用Vercel KV的场景：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Upstash是大多数无服务器Redis用例的明显赢家。其灵活的定价、广泛的区域覆盖、平台独立性和更广泛的Redis功能支持使其成为更优的选择。只有当你完全投资于Vercel生态系统并希望获得自动集成的便利时，才推荐使用Vercel KV。对于使用多个云提供商或希望获得最大灵活性的团队，Upstash是显而易见的选择。',
    
    faq1q: '我可以从Vercel KV迁移到Upstash吗？',
    faq1a: '可以，迁移很简单，因为Vercel KV是基于Upstash构建的。导出你的数据，创建Upstash账户，并更新你的连接字符串。Redis命令是兼容的。',
    
    faq2q: 'Vercel KV支持所有Redis命令吗？',
    faq2a: 'Vercel KV支持专注于常见用例的Redis命令子集。Upstash支持更多命令，包括Streams、Geo和HyperLogLog等高级数据结构。',
    
    faq3q: 'Redis持久化呢？',
    faq3a: '两者都提供数据持久化。Upstash提供多种持久化选项，包括AOF和RDB。Vercel KV自动处理持久化，但配置选项较少。',
    
    faq4q: '我可以在同一项目中同时使用两者吗？',
    faq4a: '可以，你可以同时使用两者。例如，使用Vercel KV进行会话存储，使用Upstash缓存API响应。它们是独立的服务。',
    
    faq5q: '它们如何处理冷启动？',
    faq5a: '两者都为无服务器设计，具有最小的冷启动。Upstash保持热连接并提供连接池。Vercel KV受益于Vercel边缘网络集成。',
    
    faq6q: '哪个有更好的TypeScript支持？',
    faq6a: '两者都有出色的TypeScript支持。Upstash提供带有完整类型定义的@upstash/redis。Vercel KV SDK也是完全类型化的，并与Vercel AI SDK集成。',
    
    faq7q: '速率限制呢？',
    faq7a: 'Upstash有专门的速率限制库（@upstash/ratelimit），支持滑动窗口、固定窗口和令牌桶算法。Vercel KV可用于速率限制，但需要自定义实现。',
    
    faq8q: '它们支持Redis集群吗？',
    faq8a: 'Upstash提供Redis集群以实现高可用性和扩展。Vercel KV是自动处理扩展的托管单实例，但没有明确的集群配置。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function UpstashVsKv({ lang }: { lang: string }) {
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

      <div style={{ ...boxStyle, borderLeft: '4px solid #3b82f6', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.tldrTitle}</h3>
        <p style={{ lineHeight: 1.8, color: 'var(--text-secondary)', margin: 0 }}>{ct.tldrContent}</p>
      </div>

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

      <h3 style={h3Style}>{ct.whatIsUpstashTitle}</h3>
      <p style={pStyle}>{ct.whatIsUpstashContent}</p>

      <h3 style={h3Style}>{ct.whatIsVercelKVTitle}</h3>
      <p style={pStyle}>{ct.whatIsVercelKVContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '项目' : 'Item'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Vercel KV</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '免费层' : 'Free Tier', '10,000 commands/day', '256MB storage, 1B commands'],
              [isZh ? '按请求计费' : 'Per-request', '$0.20 per 100K commands', 'Included in plan'],
              [isZh ? '存储费用' : 'Storage', '$0.25/GB/month', 'Included in plan'],
              [isZh ? '带宽费用' : 'Bandwidth', '$0.12/GB', 'Included in plan'],
              [isZh ? 'Pro起步价' : 'Pro Start', 'Pay per use', '$20/month (Pro plan)'],
              [isZh ? '最大数据库' : 'Max Databases', 'Unlimited', 'Per plan limits'],
            ].map(([item, upstash, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{item}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.featuresTitle}</h2>
      <p style={pStyle}>{ct.featuresIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '功能' : 'Feature'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Vercel KV</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'Redis版本' : 'Redis Version', '7.0+', '6.2'],
              [isZh ? '所有命令' : 'All Commands', '✓', isZh ? '子集' : 'Subset'],
              [isZh ? 'Streams' : 'Streams', '✓', '✗'],
              [isZh ? 'Geo命令' : 'Geo Commands', '✓', '✗'],
              [isZh ? 'Pub/Sub' : 'Pub/Sub', '✓', '✓'],
              [isZh ? 'Lua脚本' : 'Lua Scripts', '✓', '✓'],
              [isZh ? 'TLS加密' : 'TLS Encryption', '✓', '✓'],
              [isZh ? '数据导出' : 'Data Export', '✓', isZh ? '有限' : 'Limited'],
              [isZh ? '复制' : 'Replication', 'Multi-AZ', isZh ? '自动' : 'Automatic'],
              [isZh ? 'Vercel集成' : 'Vercel Integration', isZh ? '手动' : 'Manual', '✓ Native'],
            ].map(([feature, upstash, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.regionsTitle}</h2>
      <p style={pStyle}>{ct.regionsIntro}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #22c55e' }}>
          <strong style={{ color: '#22c55e' }}>Upstash (25+ Regions)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            US East, US West, EU West, EU Central, APAC, South America, Middle East, Africa
          </p>
        </div>
        <div style={{ padding: 16, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderLeft: '4px solid #3b82f6' }}>
          <strong style={{ color: '#3b82f6' }}>Vercel KV (4 Regions)</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Washington D.C., Frankfurt, Singapore, Sydney
          </p>
        </div>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#22c55e' }}>{ct.upstashExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Upstash: Works anywhere
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Basic operations
await redis.set('user:1', { name: 'John', email: 'john@example.com' });
const user = await redis.get('user:1');

// With expiration
await redis.set('session:abc', 'data', { ex: 3600 });

// Lists
await redis.lpush('queue:tasks', 'task1', 'task2');
const tasks = await redis.lrange('queue:tasks', 0, -1);

// Hashes
await redis.hset('user:1:profile', {
  name: 'John',
  age: 30,
  country: 'US'
});

// Rate limiting with @upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

const { success } = await ratelimit.limit('user_123');`}</code></pre>

      <h3 style={{ ...h3Style, color: '#3b82f6' }}>{ct.vercelKvExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Vercel KV: Vercel-specific
import kv from '@vercel/kv';

// Basic operations (similar to Upstash)
await kv.set('user:1', { name: 'John', email: 'john@example.com' });
const user = await kv.get('user:1');

// With expiration
await kv.set('session:abc', 'data', { ex: 3600 });

// Lists
await kv.lpush('queue:tasks', 'task1');
const tasks = await kv.lrange('queue:tasks', 0, -1);

// Hashes
await kv.hset('user:1:profile', {
  name: 'John',
  age: 30
});

// Works with Vercel Edge Functions
export const config = { runtime: 'edge' };

export default async function handler(req) {
  const count = await kv.incr('page:views');
  return new Response(JSON.stringify({ views: count }));
}

// Note: Environment variables auto-configured in Vercel
// UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN`}</code></pre>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Vercel KV</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '平均延迟' : 'Avg Latency', '<10ms', '<10ms'],
              [isZh ? '最大吞吐量' : 'Max Throughput', '100K+ ops/sec', '50K+ ops/sec'],
              [isZh ? 'SLA' : 'SLA', '99.9%', '99.9%'],
              [isZh ? '冷启动' : 'Cold Start', '<50ms', '<50ms'],
              [isZh ? '连接池' : 'Connection Pooling', '✓', '✓'],
            ].map(([metric, upstash, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={tdStyle}>{upstash}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.integrationTitle}</h2>
      <p style={pStyle}>{ct.integrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Vercel KV</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', '✓', '✓ Native'],
              ['Netlify', '✓', '✗'],
              ['Cloudflare Workers', '✓', '✗'],
              ['AWS Lambda', '✓', '✗'],
              ['Railway', '✓', '✗'],
              ['Render', '✓', '✗'],
              ['Self-hosted', '✓', '✗'],
            ].map(([platform, upstash, vercel], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{vercel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.whenToUseTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #22c55e' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#22c55e' }}>{ct.upstashBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '多平台部署' : 'Multi-platform deployment'}</li>
            <li>{isZh ? '需要高级Redis功能' : 'Need advanced Redis features'}</li>
            <li>{isZh ? '全球区域覆盖' : 'Global region coverage'}</li>
            <li>{isZh ? '灵活定价' : 'Flexible pricing'}</li>
            <li>{isZh ? '速率限制需求' : 'Rate limiting needs'}</li>
            <li>{isZh ? '避免供应商锁定' : 'Avoid vendor lock-in'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #3b82f6' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#3b82f6' }}>{ct.vercelKvBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '仅使用Vercel' : 'Vercel-only projects'}</li>
            <li>{isZh ? '简单缓存需求' : 'Simple caching needs'}</li>
            <li>{isZh ? 'Vercel团队计划' : 'Vercel Team plan'}</li>
            <li>{isZh ? '自动环境配置' : 'Auto env configuration'}</li>
            <li>{isZh ? '与Vercel AI SDK集成' : 'Vercel AI SDK integration'}</li>
            <li>{isZh ? '会话存储' : 'Session storage'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={'/' + lang + '/tools/json-formatter'} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={'/' + lang + '/tools/base64-encoder'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={'/' + lang + '/tools/hash-generator'} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
      </div>

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
