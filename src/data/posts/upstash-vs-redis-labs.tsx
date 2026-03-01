'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Upstash vs Redis Labs: Serverless Redis Comparison 2025',
    intro: 'Redis has become essential for modern applications, but choosing between managed services can be challenging. This comprehensive comparison examines Upstash and Redis Labs (Redis Cloud) across pricing, performance, features, and developer experience to help you make the right choice for your serverless and cloud-native applications.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Upstash excels for serverless and edge applications with per-request pricing, global low latency, and HTTP-based API. Redis Labs (Redis Cloud) is better for traditional workloads requiring enterprise features, larger datasets, and advanced data structures. For serverless apps in 2025, Upstash offers better value and developer experience.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Upstash offers per-request pricing ideal for serverless workloads with unpredictable traffic',
    takeaway2: 'Redis Labs provides more enterprise features including Redis modules and larger dataset support',
    takeaway3: 'Upstash uses HTTP/WebSocket API, eliminating connection pool management',
    takeaway4: 'Both offer global replication, but Upstash is optimized for edge computing',
    takeaway5: 'Upstash has a generous free tier (10,000 requests/day) for development',
    takeaway6: 'Redis Labs offers better support for traditional server deployments',
    
    whatIsUpstashTitle: 'What is Upstash?',
    whatIsUpstashContent: 'Upstash is a serverless Redis provider designed for modern cloud-native applications. Founded in 2020, it offers a fully managed Redis service with HTTP-based access, per-request pricing, and global edge deployment. Upstash eliminates the complexity of connection pooling and provides seamless integration with serverless platforms like Vercel, Netlify, and Cloudflare Workers.',
    
    whatIsRedisLabsTitle: 'What is Redis Labs (Redis Cloud)?',
    whatIsRedisLabsContent: 'Redis Labs, now known as Redis Inc., offers Redis Cloud - a fully managed Redis service. Founded in 2011, it provides enterprise-grade Redis with support for all Redis modules (RediSearch, RedisGraph, RedisJSON, etc.), advanced security features, and multi-cloud deployment options. Redis Cloud is used by major enterprises for high-performance caching and real-time applications.',
    
    pricingTitle: 'Pricing Comparison',
    pricingIntro: 'Understanding the pricing models is crucial for choosing the right service:',
    
    performanceTitle: 'Performance Comparison',
    performanceIntro: 'Performance benchmarks for typical serverless workloads:',
    
    featuresTitle: 'Feature Comparison',
    featuresIntro: 'Comparing capabilities across both platforms:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Integration patterns for both services:',
    
    upstashExampleTitle: 'Upstash Integration',
    redisLabsExampleTitle: 'Redis Cloud Integration',
    
    serverlessIntegrationTitle: 'Serverless Integration',
    serverlessIntegrationIntro: 'How each service integrates with popular serverless platforms:',
    
    useCasesTitle: 'Best Use Cases',
    upstashBestFor: 'Choose Upstash For:',
    redisLabsBestFor: 'Choose Redis Cloud For:',
    
    migrationTitle: 'Migration Considerations',
    migrationIntro: 'Key points when migrating between services:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'In 2025, the choice between Upstash and Redis Cloud depends on your architecture. For serverless and edge applications, Upstash provides superior developer experience with HTTP-based API, per-request pricing, and seamless platform integrations. Redis Cloud remains the choice for enterprise applications requiring advanced Redis modules, larger datasets, and traditional deployment patterns. Many teams use both: Upstash for serverless workloads and Redis Cloud for core infrastructure.',
    
    faq1q: 'Can I use Upstash with any Redis client?',
    faq1a: 'Yes, Upstash supports the Redis protocol, so you can use any Redis client. Additionally, Upstash provides an HTTP API that works in environments where TCP connections are limited, like Cloudflare Workers or browsers.',
    
    faq2q: 'Does Redis Cloud support serverless platforms?',
    faq2a: 'Yes, Redis Cloud works with serverless platforms, but it requires connection pooling or VPC peering for optimal performance. Upstash is designed specifically for serverless with built-in HTTP support.',
    
    faq3q: 'What is the maximum dataset size?',
    faq3a: 'Upstash supports up to 10GB per database in standard plans. Redis Cloud supports much larger datasets (up to 500GB+) depending on the plan. For big data use cases, Redis Cloud is the better choice.',
    
    faq4q: 'How does global replication work?',
    faq4a: 'Both services offer global replication. Upstash provides multi-region replication with automatic failover optimized for edge access. Redis Cloud offers Active-Active replication for geo-distributed applications.',
    
    faq5q: 'Is there a free tier?',
    faq5a: 'Yes, both offer free tiers. Upstash provides 10,000 requests/day and 256MB storage forever free. Redis Cloud offers a 30MB free tier. Upstash\'s free tier is more generous for development.',
    
    faq6q: 'Which is better for rate limiting?',
    faq6a: 'Both work well for rate limiting. Upstash provides a dedicated rate limiting library (@upstash/ratelimit) optimized for serverless. Redis Cloud works with standard Redis rate limiting patterns.',
    
    faq7q: 'Can I use Redis modules with Upstash?',
    faq7a: 'Upstash supports basic Redis commands and some extensions like JSON. However, Redis Cloud offers full support for all Redis modules including RediSearch, RedisGraph, RedisTimeSeries, and RedisBloom.',
    
    faq8q: 'How does pricing scale with traffic?',
    faq8a: 'Upstash uses per-request pricing ($0.20 per 100K requests), making it predictable for variable traffic. Redis Cloud uses capacity-based pricing, which can be more cost-effective for consistent high-throughput workloads.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Upstash vs Redis Labs：2025年无服务器Redis对比',
    intro: 'Redis已成为现代应用的核心组件，但在托管服务之间做出选择可能具有挑战性。本全面比较从定价、性能、功能特性和开发者体验等方面考察Upstash和Redis Labs（Redis Cloud），帮助你为无服务器和云原生应用做出正确选择。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: 'Upstash凭借按请求定价、全球低延迟和基于HTTP的API，在无服务器和边缘应用方面表现出色。Redis Labs（Redis Cloud）更适合需要企业功能、大数据集和高级数据结构的传统工作负载。对于2025年的无服务器应用，Upstash提供更好的性价比和开发者体验。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Upstash提供按请求定价，非常适合流量不可预测的无服务器工作负载',
    takeaway2: 'Redis Labs提供更多企业功能，包括Redis模块和更大数据集支持',
    takeaway3: 'Upstash使用HTTP/WebSocket API，无需管理连接池',
    takeaway4: '两者都提供全球复制，但Upstash针对边缘计算进行了优化',
    takeaway5: 'Upstash提供慷慨的免费套餐（每日10,000请求）用于开发',
    takeaway6: 'Redis Labs对传统服务器部署提供更好的支持',
    
    whatIsUpstashTitle: '什么是Upstash？',
    whatIsUpstashContent: 'Upstash是一个专为现代云原生应用设计的无服务器Redis提供商。成立于2020年，提供基于HTTP访问、按请求定价和全球边缘部署的全托管Redis服务。Upstash消除了连接池管理的复杂性，并与Vercel、Netlify和Cloudflare Workers等无服务器平台无缝集成。',
    
    whatIsRedisLabsTitle: '什么是Redis Labs（Redis Cloud）？',
    whatIsRedisLabsContent: 'Redis Labs（现名Redis Inc.）提供Redis Cloud——一个全托管的Redis服务。成立于2011年，提供企业级Redis，支持所有Redis模块（RediSearch、RedisGraph、RedisJSON等）、高级安全特性和多云部署选项。Redis Cloud被大型企业用于高性能缓存和实时应用。',
    
    pricingTitle: '定价对比',
    pricingIntro: '理解定价模型对于选择合适的服务至关重要：',
    
    performanceTitle: '性能对比',
    performanceIntro: '典型无服务器工作负载的性能基准测试：',
    
    featuresTitle: '功能对比',
    featuresIntro: '比较两个平台的功能特性：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个服务的集成模式：',
    
    upstashExampleTitle: 'Upstash集成',
    redisLabsExampleTitle: 'Redis Cloud集成',
    
    serverlessIntegrationTitle: '无服务器集成',
    serverlessIntegrationIntro: '每个服务如何与流行的无服务器平台集成：',
    
    useCasesTitle: '最佳用例',
    upstashBestFor: '选择Upstash的场景：',
    redisLabsBestFor: '选择Redis Cloud的场景：',
    
    migrationTitle: '迁移注意事项',
    migrationIntro: '在服务之间迁移时的关键点：',
    
    conclusionTitle: '结论',
    conclusionContent: '在2025年，Upstash和Redis Cloud之间的选择取决于你的架构。对于无服务器和边缘应用，Upstash凭借基于HTTP的API、按请求定价和无缝平台集成提供卓越的开发者体验。Redis Cloud仍然是需要高级Redis模块、更大数据集和传统部署模式的企业应用的选择。许多团队同时使用两者：Upstash用于无服务器工作负载，Redis Cloud用于核心基础设施。',
    
    faq1q: '我可以用任何Redis客户端使用Upstash吗？',
    faq1a: '是的，Upstash支持Redis协议，所以你可以使用任何Redis客户端。此外，Upstash提供HTTP API，可在TCP连接受限的环境中工作，如Cloudflare Workers或浏览器。',
    
    faq2q: 'Redis Cloud支持无服务器平台吗？',
    faq2a: '是的，Redis Cloud可以与无服务器平台配合使用，但需要连接池或VPC对等连接以获得最佳性能。Upstash专门为无服务器设计，内置HTTP支持。',
    
    faq3q: '最大数据集大小是多少？',
    faq3a: 'Upstash在标准计划中支持每个数据库最多10GB。Redis Cloud根据计划支持更大数据集（最大500GB+）。对于大数据用例，Redis Cloud是更好的选择。',
    
    faq4q: '全球复制如何工作？',
    faq4a: '两个服务都提供全球复制。Upstash提供针对边缘访问优化的多区域复制和自动故障转移。Redis Cloud为地理分布式应用提供Active-Active复制。',
    
    faq5q: '有免费套餐吗？',
    faq5a: '是的，两者都提供免费套餐。Upstash提供每日10,000请求和256MB存储的永久免费。Redis Cloud提供30MB免费套餐。Upstash的免费套餐对开发更慷慨。',
    
    faq6q: '哪个更适合速率限制？',
    faq6a: '两者都适合速率限制。Upstash提供专门针对无服务器优化的速率限制库（@upstash/ratelimit）。Redis Cloud使用标准Redis速率限制模式。',
    
    faq7q: '我可以在Upstash中使用Redis模块吗？',
    faq7a: 'Upstash支持基本Redis命令和一些扩展如JSON。然而，Redis Cloud提供所有Redis模块的完整支持，包括RediSearch、RedisGraph、RedisTimeSeries和RedisBloom。',
    
    faq8q: '定价如何随流量扩展？',
    faq8a: 'Upstash使用按请求定价（每100K请求$0.20），使可变流量的成本可预测。Redis Cloud使用基于容量的定价，对于一致的高吞吐量工作负载可能更具成本效益。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function UpstashVsRedisLabs({ lang }: { lang: string }) {
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

      <h3 style={h3Style}>{ct.whatIsRedisLabsTitle}</h3>
      <p style={pStyle}>{ct.whatIsRedisLabsContent}</p>

      <h2 style={h2Style}>{ct.pricingTitle}</h2>
      <p style={pStyle}>{ct.pricingIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '方面' : 'Aspect'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Redis Cloud</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '定价模型' : 'Pricing Model', isZh ? '按请求' : 'Per-request', isZh ? '按容量' : 'Capacity-based'],
              [isZh ? '免费套餐' : 'Free Tier', '10K requests/day, 256MB', '30MB database'],
              [isZh ? '起步价格' : 'Starting Price', '$0.20/100K requests', '$5/month'],
              [isZh ? '数据传输' : 'Data Transfer', isZh ? '包含在请求价格中' : 'Included in price', isZh ? '额外收费' : 'Additional charges'],
              [isZh ? '最大数据库大小' : 'Max Database Size', '10GB', '500GB+'],
              [isZh ? '复制' : 'Replication', isZh ? '免费' : 'Free', isZh ? '高级功能' : 'Premium feature'],
              [isZh ? '备份' : 'Backups', isZh ? '自动' : 'Automatic', isZh ? '按使用量收费' : 'Usage-based'],
            ].map(([aspect, upstash, redis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{aspect}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{redis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Redis Cloud</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '平均延迟（全球）' : 'Avg Latency (Global)', '<10ms', '<15ms'],
              [isZh ? '边缘延迟' : 'Edge Latency', '<5ms', isZh ? '需要VPC' : 'Requires VPC'],
              [isZh ? '冷启动影响' : 'Cold Start Impact', isZh ? '最小' : 'Minimal', isZh ? '中等' : 'Moderate'],
              [isZh ? '最大连接数' : 'Max Connections', isZh ? '无限制（HTTP）' : 'Unlimited (HTTP)', isZh ? '按计划限制' : 'Plan-based limit'],
              [isZh ? '吞吐量' : 'Throughput', '100K+ req/sec', '500K+ req/sec'],
            ].map(([metric, upstash, redis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{metric}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{redis}</td>
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
              <th style={thStyle}>Redis Cloud</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? 'HTTP API' : 'HTTP API', '✓', isZh ? '通过代理' : 'Via proxy'],
              [isZh ? 'Redis协议' : 'Redis Protocol', '✓', '✓'],
              [isZh ? 'TLS加密' : 'TLS Encryption', '✓', '✓'],
              [isZh ? '全球复制' : 'Global Replication', '✓', '✓'],
              [isZh ? '持久化' : 'Persistence', '✓', '✓'],
              [isZh ? 'Redis模块' : 'Redis Modules', isZh ? '有限' : 'Limited', '✓ Full'],
              [isZh ? 'RedisJSON' : 'RedisJSON', '✓', '✓'],
              [isZh ? 'RediSearch' : 'RediSearch', '✗', '✓'],
              [isZh ? 'RedisGraph' : 'RedisGraph', '✗', '✓'],
              [isZh ? 'VPC对等' : 'VPC Peering', '✗', '✓'],
              [isZh ? '私有链接' : 'Private Link', '✗', '✓'],
              [isZh ? '多租户' : 'Multi-tenancy', '✓', '✓'],
            ].map(([feature, upstash, redis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{upstash}</td>
                <td style={tdStyle}>{redis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#00d9ff' }}>{ct.upstashExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Upstash - Serverless Redis with HTTP API
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Initialize client (works everywhere - no connection pool needed)
const redis = Redis.fromEnv();

// Basic operations
await redis.set('user:1', { name: 'John', email: 'john@example.com' });
const user = await redis.get('user:1');
await redis.del('user:1');

// Rate limiting (built-in library)
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
});

const { success, limit, reset, remaining } = await ratelimit.limit('user:123');

if (!success) {
  return new Response('Too many requests', { status: 429 });
}

// Pub/Sub
await redis.publish('channel', 'message');
await redis.subscribe('channel', (message) => {
  console.log('Received:', message);
});

// JSON operations
await redis.json.set('product:1', '$', {
  name: 'Widget',
  price: 99.99,
  tags: ['electronics', 'gadgets']
});
const price = await redis.json.get('product:1', '$.price');

// Pipeline for batch operations
const pipeline = redis.pipeline();
pipeline.set('key1', 'value1');
pipeline.set('key2', 'value2');
pipeline.get('key1');
await pipeline.exec();`}</code></pre>

      <h3 style={{ ...h3Style, color: '#dc382d' }}>{ct.redisLabsExampleTitle}</h3>
      <pre style={codeStyle}><code>{`// Redis Cloud - Traditional Redis client
import { createClient } from 'redis';

// Initialize client with connection pooling
const client = createClient({
  url: 'redis://default:password@redis-xxxxx.c1.us-east-1.ec2.cloud.redislabs.com:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500),
  },
});

await client.connect();

// Basic operations
await client.set('user:1', JSON.stringify({ name: 'John', email: 'john@example.com' }));
const user = JSON.parse(await client.get('user:1'));
await client.del('user:1');

// Rate limiting (manual implementation)
const rateLimit = async (key: string, limit: number, window: number) => {
  const current = await client.incr(key);
  
  if (current === 1) {
    await client.expire(key, window);
  }
  
  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current),
    reset: await client.ttl(key),
  };
};

// Pub/Sub
const subscriber = client.duplicate();
await subscriber.connect();
await subscriber.subscribe('channel', (message) => {
  console.log('Received:', message);
});
await client.publish('channel', 'message');

// Search with RediSearch module
await client.ft.create('products', {
  name: { type: 'TEXT' },
  price: { type: 'NUMERIC', sortable: true },
});

const results = await client.ft.search('products', '@name:Widget @price:[0 100]');

// JSON with RedisJSON module
await client.json.set('product:1', '$', {
  name: 'Widget',
  price: 99.99,
  tags: ['electronics', 'gadgets']
});

// Pipeline
const pipeline = client.multi();
pipeline.set('key1', 'value1');
pipeline.set('key2', 'value2');
pipeline.get('key1');
await pipeline.exec();`}</code></pre>

      <h2 style={h2Style}>{ct.serverlessIntegrationTitle}</h2>
      <p style={pStyle}>{ct.serverlessIntegrationIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '平台' : 'Platform'}</th>
              <th style={thStyle}>Upstash</th>
              <th style={thStyle}>Redis Cloud</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Vercel', isZh ? '官方集成' : 'Official Integration', isZh ? '需配置' : 'Manual setup'],
              ['Netlify', isZh ? '官方集成' : 'Official Integration', isZh ? '需配置' : 'Manual setup'],
              ['Cloudflare Workers', '✓ Native HTTP', isZh ? '需外部代理' : 'External proxy'],
              ['AWS Lambda', '✓', '✓ VPC'],
              ['Google Cloud Functions', '✓', '✓ VPC'],
              ['Azure Functions', '✓', '✓ VNet'],
            ].map(([platform, upstash, redis], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{platform}</td>
                <td style={{ ...tdStyle, color: '#22c55e' }}>{upstash}</td>
                <td style={tdStyle}>{redis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #00d9ff' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#00d9ff' }}>{ct.upstashBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '无服务器应用' : 'Serverless applications'}</li>
            <li>{isZh ? '边缘计算' : 'Edge computing'}</li>
            <li>{isZh ? 'API速率限制' : 'API rate limiting'}</li>
            <li>{isZh ? '会话存储' : 'Session storage'}</li>
            <li>{isZh ? '实时分析' : 'Real-time analytics'}</li>
            <li>{isZh ? '小型到中型数据集' : 'Small to medium datasets'}</li>
            <li>{isZh ? '初创公司/MVP' : 'Startups/MVPs'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #dc382d' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#dc382d' }}>{ct.redisLabsBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '企业级应用' : 'Enterprise applications'}</li>
            <li>{isZh ? '大数据集（100GB+）' : 'Large datasets (100GB+)'}</li>
            <li>{isZh ? '全文搜索' : 'Full-text search'}</li>
            <li>{isZh ? '图数据库' : 'Graph databases'}</li>
            <li>{isZh ? '时序数据' : 'Time-series data'}</li>
            <li>{isZh ? '传统服务器部署' : 'Traditional server deployments'}</li>
            <li>{isZh ? '需要VPC/私有链接' : 'VPC/Private Link required'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.migrationTitle}</h2>
      <p style={pStyle}>{ct.migrationIntro}</p>

      <pre style={codeStyle}><code>{`// Migration: Redis Cloud to Upstash

// 1. Export data from Redis Cloud
// redis-cli -h redis-xxxxx.c1.us-east-1.ec2.cloud.redislabs.com \\
//   -p 6379 -a your-password --rdb dump.rdb

// 2. Or use DUMP/RESTORE for selective migration
const sourceClient = createClient({ url: 'redis-cloud-url' });
const destClient = new Redis({ url: 'upstash-url' });

const keys = await sourceClient.keys('*');
for (const key of keys) {
  const ttl = await sourceClient.ttl(key);
  const dump = await sourceClient.dump(key);
  await destClient.restore(key, ttl > 0 ? ttl : 0, dump);
}

// 3. Update environment variables
// REDIS_URL=redis://... -> UPSTASH_REDIS_REST_URL=...
// REDIS_PASSWORD=... -> UPSTASH_REDIS_REST_TOKEN=...

// 4. Update code to use @upstash/redis
// Before:
// import { createClient } from 'redis';
// const client = createClient({ url: process.env.REDIS_URL });
// await client.connect();

// After:
// import { Redis } from '@upstash/redis';
// const redis = Redis.fromEnv(); // Auto-configured from env

// 5. Handle connection pooling differences
// Upstash: No pooling needed (HTTP-based)
// Redis Cloud: Pooling handled by client library`}</code></pre>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={`/${lang}/tools/json-formatter`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={`/${lang}/tools/base64-encoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={`/${lang}/tools/jwt-decoder`} style={{ color: '#3b82f6', textDecoration: 'none' }}>JWT Decoder</a>
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
