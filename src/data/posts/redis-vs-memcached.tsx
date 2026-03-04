'use client';

import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Redis vs Memcached: In-Memory Cache Comparison 2025',
    intro: 'Redis and Memcached are the two most popular in-memory caching systems. While both provide fast key-value storage, Redis has evolved into a versatile data structures server with persistence, while Memcached remains focused on simple, high-performance object caching. This comparison helps you choose the right cache for your architecture.',
    
    tldrTitle: 'TL;DR - Quick Summary',
    tldrContent: 'Choose Redis for advanced data structures, persistence, pub/sub messaging, and when you need more than simple caching. Choose Memcached for straightforward object caching, simple key-value operations, and when you want maximum raw performance with minimal features.',
    
    takeawaysTitle: 'Key Takeaways',
    takeaway1: 'Redis supports multiple data types: strings, lists, sets, sorted sets, hashes, streams',
    takeaway2: 'Memcached is simpler but limited to string key-value pairs',
    takeaway3: 'Redis offers persistence (RDB snapshots, AOF logs); Memcached is volatile',
    takeaway4: 'Both are extremely fast with sub-millisecond latency',
    takeaway5: 'Redis has built-in replication, clustering, and Lua scripting',
    takeaway6: 'Memcached uses less memory overhead per cached item',
    
    whatIsRedisTitle: 'What is Redis?',
    whatIsRedisContent: 'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store released in 2009. Beyond caching, it serves as a database, message broker, and streaming engine. Redis supports diverse data structures including strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, and streams. It offers persistence, replication, clustering, and Lua scripting.',
    
    whatIsMemcachedTitle: 'What is Memcached?',
    whatIsMemcachedContent: 'Memcached is a high-performance, distributed memory object caching system created in 2003. Originally developed for LiveJournal, it provides a simple key-value store for small chunks of arbitrary data. Memcached is designed for simplicity and speed, offering basic GET/SET operations without persistence or advanced features.',
    
    performanceTitle: 'Feature Comparison',
    performanceIntro: 'Comparing core capabilities:',
    
    featuresTitle: 'Detailed Feature Matrix',
    featuresIntro: 'Side-by-side comparison of key features:',
    
    codeExampleTitle: 'Code Examples',
    codeExampleIntro: 'Usage examples for both caching systems:',
    
    redisExampleTitle: 'Redis Examples',
    memcachedExampleTitle: 'Memcached Examples',
    
    dataSourceTitle: 'Performance Characteristics',
    dataSourceIntro: 'Performance and scaling considerations:',
    
    alertingTitle: 'When to Choose',
    alertingIntro: 'Decision criteria:',
    
    useCasesTitle: 'Best Use Cases',
    redisBestFor: 'Redis is Best For:',
    memcachedBestFor: 'Memcached is Best For:',
    
    conclusionTitle: 'Conclusion',
    conclusionContent: 'Redis and Memcached serve overlapping but distinct needs. Redis is the Swiss Army knife of in-memory data, ideal when you need data structures, persistence, pub/sub, or complex operations. Memcached excels at pure, simple caching with minimal overhead. For modern applications, Redis has become the default choice due to its versatility, but Memcached remains valuable for simple, high-throughput caching scenarios.',
    
    faq1q: 'Can I use Redis as a primary database?',
    faq1a: 'Yes, Redis can serve as a primary database for certain use cases, especially with persistence enabled (RDB + AOF). It works well for session stores, leaderboards, real-time analytics, and message queues. However, for complex relational data or when you need ACID transactions across multiple records, a traditional database is better.',
    
    faq2q: 'Which is faster?',
    faq2a: 'For simple GET/SET operations, both achieve sub-millisecond latency with Memcached having a slight edge due to simpler architecture. However, the difference is negligible for most applications. Redis may be faster for complex operations since data structure operations are server-side rather than requiring multiple round trips.',
    
    faq3q: 'How do they handle memory management?',
    faq3a: 'Memcached uses slab allocation with LRU eviction per slab class. Redis offers more control: maxmemory policy (volatile-lru, allkeys-lru, volatile-ttl, etc.), memory optimization commands, and the ability to estimate memory usage. Redis 7.0+ has improved memory efficiency significantly.',
    
    faq4q: 'What about clustering and scaling?',
    faq4a: 'Redis Cluster provides automatic sharding, high availability with failover, and supports up to 1000 nodes. Memcached scaling is client-side through consistent hashing; it has no built-in clustering or failover. For distributed deployments, Redis offers more robust solutions.',
    
    faq5q: 'Can I run both together?',
    faq5a: 'Yes, this is common. Use Memcached for simple, high-throughput object caching (e.g., HTML fragments, database query results) and Redis for sessions, leaderboards, pub/sub, and data structures. They use different default ports (6379 for Redis, 11211 for Memcached).',
    
    faq6q: 'How does persistence affect Redis performance?',
    faq6a: 'RDB snapshots have minimal impact as they fork and write asynchronously. AOF has more overhead but can be tuned (appendfsync everysec is a good balance). Using both provides durability with acceptable performance impact. For pure caching, disable persistence.',
    
    faq7q: 'Which has better language support?',
    faq7a: 'Both have excellent client libraries for all major languages. Redis has more active development with official clients for Java, Python, Node.js, Go, and .NET. Memcached has mature, stable clients everywhere. Choose based on features needed, not client availability.',
    
    faq8q: 'What about cloud-managed services?',
    faq8a: 'Both are widely available as managed services. AWS offers ElastiCache for both Redis and Memcached. Google Cloud has Memorystore. Azure has Cache for Redis. Redis has more managed options including Redis Cloud (by Redis Inc.), Upstash, and others with free tiers.',
    
    tryTools: 'Try Our Related Tools',
  },
  zh: {
    title: 'Redis vs Memcached：内存缓存对比 2025',
    intro: 'Redis 和 Memcached 是两个最流行的内存缓存系统。虽然两者都提供快速的键值存储，但 Redis 已演变为具有持久化的多功能数据结构服务器，而 Memcached 仍专注于简单、高性能的对象缓存。本对比帮助你为架构选择合适的缓存。',
    
    tldrTitle: 'TL;DR - 快速总结',
    tldrContent: '为高级数据结构、持久化、发布/订阅消息传递和需要更多功能的场景选择 Redis。为简单的对象缓存、简单的键值操作和想要最小功能实现最大原始性能的场景选择 Memcached。',
    
    takeawaysTitle: '核心要点',
    takeaway1: 'Redis 支持多种数据类型：字符串、列表、集合、有序集合、哈希、流',
    takeaway2: 'Memcached 更简单但仅限于字符串键值对',
    takeaway3: 'Redis 提供持久化（RDB 快照、AOF 日志）；Memcached 是易失性的',
    takeaway4: '两者都极快，延迟低于毫秒',
    takeaway5: 'Redis 有内置复制、集群和 Lua 脚本',
    takeaway6: 'Memcached 每个缓存项使用更少的内存开销',
    
    whatIsRedisTitle: '什么是 Redis？',
    whatIsRedisContent: 'Redis（远程字典服务器）是 2009 年发布的开源内存数据结构存储。除了缓存，它还作为数据库、消息代理和流引擎。Redis 支持多种数据结构，包括字符串、哈希、列表、集合、有序集合、位图、HyperLogLog、地理空间索引和流。它提供持久化、复制、集群和 Lua 脚本。',
    
    whatIsMemcachedTitle: '什么是 Memcached？',
    whatIsMemcachedContent: 'Memcached 是 2003 年创建的高性能分布式内存对象缓存系统。最初为 LiveJournal 开发，它为小块任意数据提供简单的键值存储。Memcached 专为简单和速度设计，提供基本的 GET/SET 操作，没有持久化或高级功能。',
    
    performanceTitle: '功能对比',
    performanceIntro: '比较核心功能：',
    
    featuresTitle: '详细功能矩阵',
    featuresIntro: '关键功能的并排比较：',
    
    codeExampleTitle: '代码示例',
    codeExampleIntro: '两个缓存系统的使用示例：',
    
    redisExampleTitle: 'Redis 示例',
    memcachedExampleTitle: 'Memcached 示例',
    
    dataSourceTitle: '性能特征',
    dataSourceIntro: '性能和扩展考虑：',
    
    alertingTitle: '选择指南',
    alertingIntro: '决策标准：',
    
    useCasesTitle: '最佳用例',
    redisBestFor: 'Redis 最适合：',
    memcachedBestFor: 'Memcached 最适合：',
    
    conclusionTitle: '结论',
    conclusionContent: 'Redis 和 Memcached 服务于重叠但不同的需求。Redis 是内存数据的瑞士军刀，当你需要数据结构、持久化、发布/订阅或复杂操作时非常理想。Memcached 在纯粹、简单的缓存和最小开销方面表现出色。对于现代应用，Redis 因其多功能性已成为默认选择，但 Memcached 对于简单、高吞吐量缓存场景仍然有价值。',
    
    faq1q: '我可以将 Redis 作为主数据库使用吗？',
    faq1a: '可以，对于某些用例，Redis 可以作为主数据库，特别是在启用持久化（RDB + AOF）的情况下。它非常适合会话存储、排行榜、实时分析和消息队列。然而，对于复杂的关系数据或需要跨多条记录的 ACID 事务，传统数据库更好。',
    
    faq2q: '哪个更快？',
    faq2a: '对于简单的 GET/SET 操作，两者都实现亚毫秒延迟，Memcached 因更简单的架构略有优势。然而，对于大多数应用，差异可以忽略不计。对于复杂操作，Redis 可能更快，因为数据结构操作在服务器端执行，而不是需要多次往返。',
    
    faq3q: '它们如何处理内存管理？',
    faq3a: 'Memcached 使用 slab 分配，每个 slab 类有 LRU 驱逐。Redis 提供更多控制：maxmemory 策略（volatile-lru、allkeys-lru、volatile-ttl 等）、内存优化命令和估计内存使用的能力。Redis 7.0+ 显著提高了内存效率。',
    
    faq4q: '集群和扩展如何？',
    faq4a: 'Redis Cluster 提供自动分片、故障转移的高可用性，支持多达 1000 个节点。Memcached 扩展是通过一致性哈希在客户端进行的；它没有内置集群或故障转移。对于分布式部署，Redis 提供更健壮的解决方案。',
    
    faq5q: '可以同时运行两者吗？',
    faq5a: '可以，这很常见。使用 Memcached 进行简单、高吞吐量的对象缓存（如 HTML 片段、数据库查询结果），使用 Redis 进行会话、排行榜、发布/订阅和数据结构。它们使用不同的默认端口（Redis 为 6379，Memcached 为 11211）。',
    
    faq6q: '持久化如何影响 Redis 性能？',
    faq6a: 'RDB 快照影响最小，因为它们 fork 并异步写入。AOF 有更多开销但可以调整（appendfsync everysec 是很好的平衡）。同时使用两者可以提供可接受的性能影响的持久性。对于纯缓存，禁用持久化。',
    
    faq7q: '哪个有更好的语言支持？',
    faq7a: '两者对所有主要语言都有出色的客户端库。Redis 有更活跃的开发，为 Java、Python、Node.js、Go 和 .NET 提供官方客户端。Memcached 有成熟、稳定的客户端。根据所需功能选择，而不是客户端可用性。',
    
    faq8q: '云托管服务如何？',
    faq8a: '两者都广泛作为托管服务提供。AWS 为 Redis 和 Memcached 提供 ElastiCache。Google Cloud 有 Memorystore。Azure 有 Cache for Redis。Redis 有更多托管选项，包括 Redis Cloud（由 Redis Inc. 提供）、Upstash 和其他有免费层的选项。',
    
    tryTools: '试试我们的相关工具',
  },
};

export default function RedisVsMemcached({ lang }: { lang: string }) {
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

      <h2 style={h2Style}>{isZh ? '概述' : 'Overview'}</h2>

      <h3 style={h3Style}>{ct.whatIsRedisTitle}</h3>
      <p style={pStyle}>{ct.whatIsRedisContent}</p>

      <h3 style={h3Style}>{ct.whatIsMemcachedTitle}</h3>
      <p style={pStyle}>{ct.whatIsMemcachedContent}</p>

      <h2 style={h2Style}>{ct.performanceTitle}</h2>
      <p style={pStyle}>{ct.performanceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>Redis</th>
              <th style={thStyle}>Memcached</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '数据类型' : 'Data Types', isZh ? '多种（字符串、列表、集合等）' : 'Multiple (strings, lists, sets, etc.)', isZh ? '仅字符串' : 'Strings only'],
              [isZh ? '持久化' : 'Persistence', 'RDB, AOF', isZh ? '无' : 'None'],
              [isZh ? '复制' : 'Replication', isZh ? '主从复制' : 'Master-slave replication', isZh ? '不支持' : 'Not supported'],
              [isZh ? '集群' : 'Clustering', isZh ? '原生 Redis Cluster' : 'Native Redis Cluster', isZh ? '客户端分片' : 'Client-side sharding'],
              [isZh ? '事务' : 'Transactions', 'MULTI/EXEC', isZh ? '无' : 'None'],
              [isZh ? '发布/订阅' : 'Pub/Sub', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
              [isZh ? 'Lua 脚本' : 'Lua Scripting', isZh ? '支持' : 'Yes', isZh ? '不支持' : 'No'],
            ].map(([feature, redis, memcached], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{feature}</td>
                <td style={tdStyle}>{redis}</td>
                <td style={tdStyle}>{memcached}</td>
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
              <th style={thStyle}>{isZh ? '功能' : 'Capability'}</th>
              <th style={thStyle}>Redis</th>
              <th style={thStyle}>Memcached</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '线程模型' : 'Thread Model', isZh ? '单线程（6.0+ 多线程 I/O）' : 'Single-threaded (6.0+ multi-threaded I/O)', isZh ? '多线程' : 'Multi-threaded'],
              [isZh ? '内存效率' : 'Memory Efficiency', isZh ? '良好' : 'Good', isZh ? '优秀' : 'Excellent'],
              [isZh ? '过期策略' : 'Expiration', isZh ? '精确过期' : 'Precise expiration', isZh ? '惰性/主动过期' : 'Lazy/Active expiration'],
              [isZh ? 'LRU 驱逐' : 'LRU Eviction', isZh ? '可配置策略' : 'Configurable policies', isZh ? '每个 slab LRU' : 'Per-slab LRU'],
              [isZh ? '最大键大小' : 'Max Key Size', '512MB', '1MB'],
              [isZh ? '协议' : 'Protocol', 'RESP (Redis)', isZh ? '文本/二进制' : 'Text/Binary'],
            ].map(([cap, redis, memcached], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cap}</td>
                <td style={tdStyle}>{redis}</td>
                <td style={tdStyle}>{memcached}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.codeExampleTitle}</h2>
      <p style={pStyle}>{ct.codeExampleIntro}</p>

      <h3 style={{ ...h3Style, color: '#dc382d' }}>{ct.redisExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Redis: Basic String Operations
SET user:1001 '{"name":"Alice","email":"alice@example.com"}'
GET user:1001
SETEX session:abc123 3600 "user_data"  # Expire in 1 hour

# Redis: Hash Data Structure
HSET user:1001 name "Alice"
HSET user:1001 email "alice@example.com"
HSET user:1001 age 30
HGETALL user:1001

# Redis: List Operations (Queue)
LPUSH queue:emails '{"to":"bob@example.com","subject":"Hello"}'
RPOP queue:emails
LLEN queue:emails

# Redis: Sorted Set (Leaderboard)
ZADD leaderboard 1500 "player1"
ZADD leaderboard 2000 "player2"
ZADD leaderboard 1750 "player3"
ZREVRANGE leaderboard 0 9 WITHSCORES  # Top 10

# Redis: Pub/Sub
SUBSCRIBE notifications
PUBLISH notifications "New update available"

# Redis: Atomic Counter
INCR page:views
INCRBY api:rate_limit:user:1001 1

# Redis: Set with TTL
SADD online:users "user1" "user2" "user3"
EXPIRE online:users 300  # Expire in 5 minutes`}</code></pre>

      <h3 style={{ ...h3Style, color: '#5d8aa8' }}>{ct.memcachedExampleTitle}</h3>
      <pre style={codeStyle}><code>{`# Memcached: Basic Operations (using telnet/protocol)
set user:1001 0 3600 45
{"name":"Alice","email":"alice@example.com"}
STORED

get user:1001
VALUE user:1001 0 45
{"name":"Alice","email":"alice@example.com"}
END

delete user:1001
DELETED

# Using Python client (pymemcache)
from pymemcache.client.base import Client

client = Client(('localhost', 11211))

# Set with expiration (60 seconds)
client.set('user:1001', '{"name":"Alice"}', expire=60)

# Get
data = client.get('user:1001')

# Delete
client.delete('user:1001')

# Increment/Decrement
client.set('counter', '0')
client.incr('counter', 1)

# Using Node.js client
const memcached = require('memcached');
const client = new memcached('localhost:11211');

// Set with 1 hour expiration
client.set('user:1001', { name: 'Alice' }, 3600, (err) => {
  if (err) console.error(err);
});

// Get
client.get('user:1001', (err, data) => {
  if (err) console.error(err);
  console.log(data);
});`}</code></pre>

      <h2 style={h2Style}>{ct.dataSourceTitle}</h2>
      <p style={pStyle}>{ct.dataSourceIntro}</p>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '指标' : 'Metric'}</th>
              <th style={thStyle}>Redis</th>
              <th style={thStyle}>Memcached</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '读取延迟' : 'Read Latency', '~0.1-0.5ms', '~0.1-0.3ms'],
              [isZh ? '写入延迟' : 'Write Latency', '~0.1-0.5ms', '~0.1-0.3ms'],
              [isZh ? '每秒操作数' : 'Ops/Second', '100K-500K+', '200K-500K+'],
              [isZh ? '内存开销' : 'Memory Overhead', isZh ? '较高（更多元数据）' : 'Higher (more metadata)', isZh ? '较低' : 'Lower'],
              [isZh ? 'CPU 使用' : 'CPU Usage', isZh ? '中等' : 'Moderate', isZh ? '低' : 'Low'],
            ].map(([cat, redis, memcached], i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{cat}</td>
                <td style={tdStyle}>{redis}</td>
                <td style={tdStyle}>{memcached}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2Style}>{ct.useCasesTitle}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #dc382d' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#dc382d' }}>{ct.redisBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '会话存储' : 'Session storage'}</li>
            <li>{isZh ? '排行榜/计数器' : 'Leaderboards/counters'}</li>
            <li>{isZh ? '消息队列' : 'Message queues'}</li>
            <li>{isZh ? '实时分析' : 'Real-time analytics'}</li>
            <li>{isZh ? '发布/订阅系统' : 'Pub/sub systems'}</li>
            <li>{isZh ? '限流' : 'Rate limiting'}</li>
          </ul>
        </div>
        <div style={{ padding: 20, background: 'var(--bg-input)', borderRadius: 8, border: '1px solid var(--border-color)', borderTop: '4px solid #5d8aa8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#5d8aa8' }}>{ct.memcachedBestFor}</h3>
          <ul style={{ lineHeight: 2, color: 'var(--text-secondary)', paddingLeft: 20, margin: 0, fontSize: 14 }}>
            <li>{isZh ? '数据库查询缓存' : 'Database query caching'}</li>
            <li>{isZh ? 'HTML 片段缓存' : 'HTML fragment caching'}</li>
            <li>{isZh ? 'API 响应缓存' : 'API response caching'}</li>
            <li>{isZh ? '简单对象缓存' : 'Simple object caching'}</li>
            <li>{isZh ? '临时数据存储' : 'Temporary data storage'}</li>
            <li>{isZh ? '高吞吐量简单缓存' : 'High-throughput simple caching'}</li>
          </ul>
        </div>
      </div>

      <h2 style={h2Style}>{ct.conclusionTitle}</h2>
      <p style={pStyle}>{ct.conclusionContent}</p>

      <div style={{ padding: 20, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.3)', textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
        <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{ct.tryTools}</p>
        <a href={"/" + lang + "/tools/json-formatter"} style={{ color: '#3b82f6', textDecoration: 'none' }}>JSON Formatter</a> • {' '}
        <a href={"/" + lang + "/tools/base64-encoder"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Base64 Encoder</a> • {' '}
        <a href={"/" + lang + "/tools/hash-generator"} style={{ color: '#3b82f6', textDecoration: 'none' }}>Hash Generator</a>
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
