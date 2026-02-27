'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Redis Complete Guide: Data Structures, Caching, Clustering, and Performance Tuning',
    description:
      'Master Redis from fundamentals to production: data structures (strings, lists, sets, sorted sets, hashes, streams), caching strategies (TTL, eviction, cache-aside, write-through), Pub/Sub and Streams, transactions and Lua scripting, Cluster and Sentinel HA, Node.js and Python clients, rate limiting algorithms, session management, RediSearch and RedisJSON, performance tuning (RDB/AOF, memory optimization), security (ACL, TLS), and monitoring with Prometheus.',
    tldr: 'Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It supports strings, lists, sets, sorted sets, hashes, and streams. For caching, use TTL-based expiration with cache-aside or write-through patterns. Redis Cluster provides horizontal scaling and automatic failover. Use ioredis for Node.js and redis-py for Python. Secure with ACLs, TLS, and network isolation. Monitor with INFO, SLOWLOG, and Prometheus exporters.',
    tldrZh: 'Redis 是一个内存数据结构存储，可用作数据库、缓存、消息代理和流引擎。它支持字符串、列表、集合、有序集合、哈希和流。缓存场景使用基于 TTL 的过期策略配合 cache-aside 或 write-through 模式。Redis Cluster 提供水平扩展和自动故障转移。Node.js 推荐 ioredis，Python 推荐 redis-py。通过 ACL、TLS 和网络隔离保障安全。使用 INFO、SLOWLOG 和 Prometheus 导出器进行监控。',
  },
  zh: {
    title: 'Redis 完全指南：数据结构、缓存、集群与性能调优',
    description:
      '从基础到生产环境全面掌握 Redis：数据结构（字符串、列表、集合、有序集合、哈希、流）、缓存策略（TTL、淘汰策略、cache-aside、write-through）、发布/订阅与 Streams、事务与 Lua 脚本、Cluster 与 Sentinel 高可用、Node.js 与 Python 客户端、限流算法、会话管理、RediSearch 与 RedisJSON、性能调优（RDB/AOF、内存优化）、安全（ACL、TLS）以及 Prometheus 监控。',
    tldr: 'Redis 是一个内存数据结构存储，可用作数据库、缓存、消息代理和流引擎。它支持字符串、列表、集合、有序集合、哈希和流。缓存场景使用基于 TTL 的过期策略配合 cache-aside 或 write-through 模式。Redis Cluster 提供水平扩展和自动故障转移。Node.js 推荐 ioredis，Python 推荐 redis-py。通过 ACL、TLS 和网络隔离保障安全。使用 INFO、SLOWLOG 和 Prometheus 导出器进行监控。',
    tldrZh: 'Redis 是一个内存数据结构存储，可用作数据库、缓存、消息代理和流引擎。它支持字符串、列表、集合、有序集合、哈希和流。缓存场景使用基于 TTL 的过期策略配合 cache-aside 或 write-through 模式。Redis Cluster 提供水平扩展和自动故障转移。Node.js 推荐 ioredis，Python 推荐 redis-py。通过 ACL、TLS 和网络隔离保障安全。使用 INFO、SLOWLOG 和 Prometheus 导出器进行监控。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Redis and what are its primary use cases?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store. It can be used as a database, cache, message broker, and streaming engine. Primary use cases include session caching, real-time analytics, leaderboards, rate limiting, pub/sub messaging, job queues, and full-text search with RediSearch. Redis supports strings, lists, sets, sorted sets, hashes, streams, bitmaps, HyperLogLogs, and geospatial indexes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Redis caching work and what eviction policies are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redis caching stores frequently accessed data in memory for sub-millisecond reads. You set TTL (time-to-live) on keys using EXPIRE or SET EX commands. When memory is full, Redis eviction policies determine which keys to remove: noeviction (return errors), allkeys-lru (remove least recently used), allkeys-lfu (remove least frequently used), volatile-lru (LRU among keys with TTL), volatile-lfu (LFU among keys with TTL), allkeys-random, volatile-random, and volatile-ttl (remove keys closest to expiration).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Redis Cluster and Redis Sentinel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redis Sentinel provides high availability for standalone Redis by monitoring masters, detecting failures, and promoting replicas to master automatically. It does not shard data. Redis Cluster provides both high availability AND horizontal scaling by sharding data across multiple nodes using 16384 hash slots. Each master handles a subset of slots and has replicas for failover. Use Sentinel for HA with a single dataset; use Cluster when data exceeds single-node memory or you need write scaling.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I implement rate limiting with Redis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redis supports several rate limiting algorithms: Fixed Window (increment a counter per time window using INCR and EXPIRE), Sliding Window Log (store timestamps in a sorted set and count entries within the window using ZRANGEBYSCORE), Token Bucket (decrement tokens atomically with Lua scripts, refill periodically), and Leaky Bucket (use a sorted set as a queue, process at fixed rate). The sliding window approach with sorted sets is most common: ZADD the current timestamp, ZREMRANGEBYSCORE to prune old entries, then ZCARD to count.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use Redis Pub/Sub vs Redis Streams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redis Pub/Sub is fire-and-forget messaging: publishers send messages to channels and all connected subscribers receive them in real time, but messages are lost if no subscriber is listening. Redis Streams (XADD/XREAD/XREADGROUP) provide persistent, append-only log-based messaging with consumer groups, acknowledgments (XACK), and message replay. Use Pub/Sub for ephemeral notifications and real-time updates. Use Streams for reliable event processing, task queues, and audit logs where message durability and exactly-once processing matter.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best Redis clients for Node.js and Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For Node.js, ioredis is the recommended client. It supports Cluster, Sentinel, pipelining, Lua scripting, and streams with a promise-based API. For Python, redis-py (redis package) is the standard choice, supporting connection pooling, pipelines, Pub/Sub, and Cluster. For async Python, use redis.asyncio (built into redis-py 4.2+). Both clients support automatic reconnection, connection pooling, and all Redis commands.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I optimize Redis memory usage and performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Optimize Redis memory by choosing compact data structures (hashes for small objects, intsets for small integer sets), enabling ziplist encoding for small collections (hash-max-ziplist-entries, list-max-ziplist-size), setting appropriate maxmemory and eviction policies, using UNLINK instead of DEL for large keys, and compressing values before storing. For performance, use pipelining to batch commands (10-100x throughput improvement), use Lua scripts for atomic multi-step operations, enable lazy freeing (lazyfree-lazy-eviction), and monitor slow queries with SLOWLOG.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I secure a Redis deployment in production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Secure Redis by: enabling ACLs (Access Control Lists) to create users with specific command and key permissions, setting strong passwords with requirepass, enabling TLS encryption for data in transit, binding to specific interfaces (bind 127.0.0.1) and using firewall rules, disabling dangerous commands (rename-command FLUSHALL ""), running Redis as a non-root user, keeping Redis updated, and using protected-mode yes. Never expose Redis directly to the internet.',
      },
    },
  ],
};

export default function RedisGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  const strongStyle: React.CSSProperties = {
    color: '#0f172a',
  };

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginBottom: '0' }}>
          <li>{isZh ? 'Redis 支持 6 种核心数据结构：字符串、列表、集合、有序集合、哈希和流' : 'Redis supports 6 core data structures: strings, lists, sets, sorted sets, hashes, and streams'}</li>
          <li>{isZh ? '使用 cache-aside 模式配合 TTL 进行缓存，按业务选择合适的淘汰策略' : 'Use cache-aside pattern with TTL for caching; choose eviction policy based on your workload'}</li>
          <li>{isZh ? 'Pub/Sub 适用于实时广播，Streams 适用于可靠的事件处理和消费者组' : 'Pub/Sub for real-time broadcast, Streams for reliable event processing with consumer groups'}</li>
          <li>{isZh ? '使用 Lua 脚本实现原子性多步操作，避免竞态条件' : 'Use Lua scripts for atomic multi-step operations to avoid race conditions'}</li>
          <li>{isZh ? 'Redis Cluster 提供自动分片和故障转移，Sentinel 提供独立 Redis 的高可用' : 'Redis Cluster for auto-sharding and failover; Sentinel for standalone Redis HA'}</li>
          <li>{isZh ? '通过管道（pipelining）批处理命令可提升 10-100 倍吞吐量' : 'Pipeline commands for 10-100x throughput improvement over individual commands'}</li>
          <li>{isZh ? '使用 ACL、TLS、网络隔离保障生产安全，禁止直接暴露到公网' : 'Secure production with ACLs, TLS, network isolation; never expose Redis to the internet'}</li>
          <li>{isZh ? '使用 INFO、SLOWLOG 和 Prometheus Redis Exporter 进行监控和告警' : 'Monitor with INFO, SLOWLOG, and Prometheus Redis Exporter for alerting'}</li>
        </ul>
      </div>

      {/* Section 1: Redis Data Structures */}
      <h2 style={h2Style}>{isZh ? '1. Redis 数据结构' : '1. Redis Data Structures'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 不仅仅是一个键值存储。它是一个数据结构服务器，支持多种丰富的数据类型，每种类型都有一组专用命令。理解这些数据结构是有效使用 Redis 的基础。'
          : 'Redis is more than a simple key-value store. It is a data structure server that supports multiple rich data types, each with a dedicated set of commands. Understanding these data structures is the foundation for using Redis effectively.'}
      </p>

      <h3 style={h3Style}>{isZh ? '字符串 (Strings)' : 'Strings'}</h3>
      <p style={pStyle}>
        {isZh
          ? '字符串是 Redis 最基础的数据类型。它可以存储文本、整数或二进制数据（最大 512MB）。字符串支持原子性的 INCR/DECR 操作，非常适合计数器和分布式锁。'
          : 'Strings are the most basic Redis data type. They can hold text, integers, or binary data (up to 512MB). Strings support atomic INCR/DECR operations, making them ideal for counters and distributed locks.'}
      </p>
      <pre style={preStyle}><code>{'# String operations\n' +
'SET user:1001:name "Alice"\n' +
'GET user:1001:name                    # "Alice"\n\n' +
'# Atomic increment/decrement\n' +
'SET page:views 0\n' +
'INCR page:views                       # 1\n' +
'INCRBY page:views 10                  # 11\n\n' +
'# Set with TTL (seconds)\n' +
'SET session:abc123 "user_data" EX 3600\n' +
'TTL session:abc123                    # 3600\n\n' +
'# Set only if not exists (distributed lock)\n' +
'SET lock:order:5001 "worker-1" NX EX 30\n\n' +
'# Multiple operations\n' +
'MSET user:1:name "Alice" user:1:email "alice@example.com"\n' +
'MGET user:1:name user:1:email'}</code></pre>

      <h3 style={h3Style}>{isZh ? '列表 (Lists)' : 'Lists'}</h3>
      <p style={pStyle}>
        {isZh
          ? '列表是有序的字符串集合，底层使用快速列表（quicklist）实现。支持两端的推入和弹出操作，非常适合消息队列、最近活动记录和时间线。'
          : 'Lists are ordered collections of strings backed by quicklists. They support push/pop from both ends, making them ideal for message queues, recent activity feeds, and timelines.'}
      </p>
      <pre style={preStyle}><code>{'# List operations — task queue\n' +
'LPUSH queue:emails "email_1" "email_2" "email_3"\n' +
'RPOP queue:emails                     # "email_1" (FIFO)\n' +
'LLEN queue:emails                     # 2\n\n' +
'# Blocking pop (wait up to 30s)\n' +
'BRPOP queue:emails 30\n\n' +
'# Recent activity feed (keep last 100)\n' +
'LPUSH feed:user:1001 "liked post #42"\n' +
'LTRIM feed:user:1001 0 99\n' +
'LRANGE feed:user:1001 0 9             # Last 10 items'}</code></pre>

      <h3 style={h3Style}>{isZh ? '集合 (Sets)' : 'Sets'}</h3>
      <p style={pStyle}>
        {isZh
          ? '集合是无序的唯一字符串集合。支持交集、并集和差集运算，适合标签系统、唯一访客计数和好友关系。'
          : 'Sets are unordered collections of unique strings. They support intersection, union, and difference operations, ideal for tagging, unique visitor counting, and social relationships.'}
      </p>
      <pre style={preStyle}><code>{'# Set operations — tagging\n' +
'SADD article:1001:tags "redis" "database" "nosql"\n' +
'SADD article:1002:tags "redis" "caching" "performance"\n\n' +
'# Intersection — articles sharing tags\n' +
'SINTER article:1001:tags article:1002:tags  # ["redis"]\n\n' +
'# Union — all tags\n' +
'SUNION article:1001:tags article:1002:tags\n' +
'# ["redis", "database", "nosql", "caching", "performance"]\n\n' +
'# Membership check\n' +
'SISMEMBER article:1001:tags "redis"   # 1 (true)\n' +
'SCARD article:1001:tags               # 3 (count)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '有序集合 (Sorted Sets)' : 'Sorted Sets'}</h3>
      <p style={pStyle}>
        {isZh
          ? '有序集合类似于集合，但每个元素都关联一个分数（score），元素按分数排序。非常适合排行榜、优先级队列和时间序列索引。'
          : 'Sorted sets are like sets but each member has an associated score. Members are ordered by score, making them perfect for leaderboards, priority queues, and time-series indexing.'}
      </p>
      <pre style={preStyle}><code>{'# Sorted set — game leaderboard\n' +
'ZADD leaderboard 1500 "player:alice"\n' +
'ZADD leaderboard 2200 "player:bob"\n' +
'ZADD leaderboard 1800 "player:charlie"\n' +
'ZADD leaderboard 3100 "player:diana"\n\n' +
'# Top 3 players (highest scores)\n' +
'ZREVRANGE leaderboard 0 2 WITHSCORES\n' +
'# ["player:diana", "3100", "player:bob", "2200", "player:charlie", "1800"]\n\n' +
'# Rank of a player (0-indexed, descending)\n' +
'ZREVRANK leaderboard "player:bob"     # 1\n\n' +
'# Increment score\n' +
'ZINCRBY leaderboard 500 "player:alice"  # 2000\n\n' +
'# Range by score\n' +
'ZRANGEBYSCORE leaderboard 1500 2500 WITHSCORES'}</code></pre>

      <h3 style={h3Style}>{isZh ? '哈希 (Hashes)' : 'Hashes'}</h3>
      <p style={pStyle}>
        {isZh
          ? '哈希是字段-值对的集合，类似于对象或字典。适合存储对象数据（用户档案、配置项等），比将 JSON 序列化为字符串更高效。'
          : 'Hashes are collections of field-value pairs, like objects or dictionaries. They are ideal for storing object data (user profiles, configurations) and are more efficient than serializing JSON into strings.'}
      </p>
      <pre style={preStyle}><code>{'# Hash — user profile\n' +
'HSET user:1001 name "Alice" email "alice@example.com" age 28 role "admin"\n' +
'HGET user:1001 name                   # "Alice"\n' +
'HGETALL user:1001\n' +
'# {name: "Alice", email: "alice@example.com", age: "28", role: "admin"}\n\n' +
'# Update specific fields\n' +
'HSET user:1001 age 29 last_login "2026-02-28"\n\n' +
'# Increment numeric field\n' +
'HINCRBY user:1001 login_count 1\n\n' +
'# Check field existence\n' +
'HEXISTS user:1001 email               # 1 (true)\n' +
'HDEL user:1001 role'}</code></pre>

      <h3 style={h3Style}>{isZh ? '流 (Streams)' : 'Streams'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Redis Streams 是 5.0 引入的追加日志数据结构，支持消费者组、消息确认和持久化。类似于 Apache Kafka 的轻量级替代品。'
          : 'Redis Streams, introduced in Redis 5.0, are an append-only log data structure with consumer groups, acknowledgments, and persistence. They serve as a lightweight alternative to Apache Kafka.'}
      </p>
      <pre style={preStyle}><code>{'# Stream — event log\n' +
'XADD events * type "order" user_id "1001" amount "59.99"\n' +
'XADD events * type "payment" user_id "1001" status "completed"\n\n' +
'# Read last 10 events\n' +
'XREVRANGE events + - COUNT 10\n\n' +
'# Create consumer group\n' +
'XGROUP CREATE events order-processors $ MKSTREAM\n\n' +
'# Consumer reads (blocks up to 5000ms)\n' +
'XREADGROUP GROUP order-processors worker-1 COUNT 1 BLOCK 5000 STREAMS events >\n\n' +
'# Acknowledge processed message\n' +
'XACK events order-processors 1677000000000-0\n\n' +
'# Check pending messages\n' +
'XPENDING events order-processors - + 10'}</code></pre>

      {/* Data Structure Comparison Table */}
      <h3 style={h3Style}>{isZh ? '数据结构对比' : 'Data Structure Comparison'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '类型' : 'Type'}</th>
            <th style={thStyle}>{isZh ? '最佳用途' : 'Best For'}</th>
            <th style={thStyle}>{isZh ? '时间复杂度' : 'Time Complexity'}</th>
            <th style={thStyle}>{isZh ? '最大大小' : 'Max Size'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>String</strong></td>
            <td style={tdStyle}>{isZh ? '缓存、计数器、分布式锁' : 'Caching, counters, distributed locks'}</td>
            <td style={tdStyle}>O(1)</td>
            <td style={tdStyle}>512 MB</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>List</strong></td>
            <td style={tdStyle}>{isZh ? '队列、活动流、最近项' : 'Queues, activity feeds, recent items'}</td>
            <td style={tdStyle}>O(1) push/pop</td>
            <td style={tdStyle}>4B+ {isZh ? '元素' : 'elements'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>Set</strong></td>
            <td style={tdStyle}>{isZh ? '标签、唯一值、关系' : 'Tags, unique values, relationships'}</td>
            <td style={tdStyle}>O(1) add/check</td>
            <td style={tdStyle}>4B+ {isZh ? '成员' : 'members'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>Sorted Set</strong></td>
            <td style={tdStyle}>{isZh ? '排行榜、范围查询、优先级队列' : 'Leaderboards, range queries, priority queues'}</td>
            <td style={tdStyle}>O(log N)</td>
            <td style={tdStyle}>4B+ {isZh ? '成员' : 'members'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>Hash</strong></td>
            <td style={tdStyle}>{isZh ? '对象存储、用户档案、配置' : 'Object storage, user profiles, config'}</td>
            <td style={tdStyle}>O(1) per field</td>
            <td style={tdStyle}>4B+ {isZh ? '字段' : 'fields'}</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong style={strongStyle}>Stream</strong></td>
            <td style={tdStyle}>{isZh ? '事件日志、消息队列、审计' : 'Event logs, message queues, audit trails'}</td>
            <td style={tdStyle}>O(1) append</td>
            <td style={tdStyle}>{isZh ? '受内存限制' : 'Memory limited'}</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2: Redis as Cache */}
      <h2 style={h2Style}>{isZh ? '2. Redis 缓存策略' : '2. Redis as Cache'}</h2>
      <p style={pStyle}>
        {isZh
          ? '缓存是 Redis 最常见的用途之一。正确的缓存策略可以将数据库负载降低 80% 以上，并将响应时间从数百毫秒降至亚毫秒级。'
          : 'Caching is one of the most common use cases for Redis. A proper caching strategy can reduce database load by 80% or more and cut response times from hundreds of milliseconds to sub-millisecond.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'TTL 策略与淘汰策略' : 'TTL Strategies & Eviction Policies'}</h3>
      <pre style={preStyle}><code>{'# TTL strategies\n' +
'SET product:1001 \'{"name":"Widget","price":29.99}\' EX 3600    # 1 hour\n' +
'SET user:session:abc \'{"uid":1001}\' PX 1800000               # 30 min (ms)\n\n' +
'# Check remaining TTL\n' +
'TTL product:1001                      # seconds remaining\n' +
'PTTL user:session:abc                 # milliseconds remaining\n\n' +
'# Refresh TTL on access (sliding expiration)\n' +
'GET product:1001\n' +
'EXPIRE product:1001 3600\n\n' +
'# Set TTL only if key exists\n' +
'EXPIRE product:9999 3600              # 0 (key does not exist)\n\n' +
'# Remove TTL (make persistent)\n' +
'PERSIST product:1001\n\n' +
'# --- Eviction policies (redis.conf) ---\n' +
'# maxmemory 4gb\n' +
'# maxmemory-policy allkeys-lru        # Best for general caching\n' +
'# maxmemory-policy allkeys-lfu        # Best for skewed workloads\n' +
'# maxmemory-policy volatile-lru       # Only evict keys with TTL\n' +
'# maxmemory-policy volatile-ttl       # Evict soonest-expiring first\n' +
'# maxmemory-policy noeviction         # Return errors when full'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Cache-Aside vs Write-Through 模式' : 'Cache-Aside vs Write-Through Patterns'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Cache-Aside（旁路缓存）是最常用的模式：应用先查缓存，未命中则查数据库并写入缓存。Write-Through 模式在每次写入数据库时同步更新缓存，保证一致性但增加写延迟。'
          : 'Cache-Aside is the most common pattern: the application checks the cache first; on a miss, it reads from the database and populates the cache. Write-Through updates the cache synchronously on every database write, ensuring consistency at the cost of write latency.'}
      </p>
      <pre style={preStyle}><code>{'// Cache-Aside pattern (Node.js with ioredis)\n' +
'async function getUser(userId: string) {\n' +
'  const cacheKey = `user:\${userId}`;\n\n' +
'  // 1. Check cache\n' +
'  const cached = await redis.get(cacheKey);\n' +
'  if (cached) {\n' +
'    return JSON.parse(cached);  // Cache hit\n' +
'  }\n\n' +
'  // 2. Cache miss — fetch from DB\n' +
'  const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);\n\n' +
'  // 3. Populate cache with TTL\n' +
'  await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);\n\n' +
'  return user;\n' +
'}\n\n' +
'// Write-Through pattern\n' +
'async function updateUser(userId: string, data: Partial<User>) {\n' +
'  // 1. Update database\n' +
'  const user = await db.query(\n' +
'    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",\n' +
'    [data.name, data.email, userId]\n' +
'  );\n\n' +
'  // 2. Update cache synchronously\n' +
'  const cacheKey = `user:\${userId}`;\n' +
'  await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);\n\n' +
'  return user;\n' +
'}\n\n' +
'// Cache invalidation on delete\n' +
'async function deleteUser(userId: string) {\n' +
'  await db.query("DELETE FROM users WHERE id = $1", [userId]);\n' +
'  await redis.del(`user:\${userId}`);\n' +
'}'}</code></pre>

      {/* Section 3: Redis Pub/Sub & Streams */}
      <h2 style={h2Style}>{isZh ? '3. Redis Pub/Sub 与 Streams' : '3. Redis Pub/Sub & Streams'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 提供两种消息传递机制：Pub/Sub 用于实时即发即忘广播，Streams 用于持久化的可靠消息处理。'
          : 'Redis provides two messaging mechanisms: Pub/Sub for real-time fire-and-forget broadcast, and Streams for persistent, reliable message processing.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Pub/Sub 实时消息' : 'Pub/Sub Real-Time Messaging'}</h3>
      <pre style={preStyle}><code>{'// Publisher (Node.js)\n' +
'import Redis from "ioredis";\n' +
'const publisher = new Redis();\n\n' +
'async function publishEvent(channel: string, event: object) {\n' +
'  await publisher.publish(channel, JSON.stringify(event));\n' +
'}\n\n' +
'// Publish order events\n' +
'await publishEvent("orders", {\n' +
'  type: "order.created",\n' +
'  orderId: "ORD-5001",\n' +
'  userId: "1001",\n' +
'  total: 99.99,\n' +
'  timestamp: Date.now(),\n' +
'});\n\n' +
'// Subscriber\n' +
'const subscriber = new Redis();\n\n' +
'subscriber.subscribe("orders", "payments", (err, count) => {\n' +
'  console.log(`Subscribed to \${count} channels`);\n' +
'});\n\n' +
'subscriber.on("message", (channel, message) => {\n' +
'  const event = JSON.parse(message);\n' +
'  console.log(`[\${channel}] \${event.type}:`, event);\n' +
'});\n\n' +
'// Pattern subscription (wildcard)\n' +
'subscriber.psubscribe("orders.*", (err, count) => {\n' +
'  console.log(`Pattern subscribed to \${count} patterns`);\n' +
'});\n\n' +
'subscriber.on("pmessage", (pattern, channel, message) => {\n' +
'  console.log(`[\${pattern}] \${channel}:`, message);\n' +
'});'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Streams 与消费者组' : 'Streams with Consumer Groups'}</h3>
      <pre style={preStyle}><code>{'// Redis Streams with consumer groups (Node.js)\n' +
'import Redis from "ioredis";\n' +
'const redis = new Redis();\n\n' +
'// Producer: add events to stream\n' +
'async function addOrderEvent(order: { id: string; userId: string; total: number }) {\n' +
'  const id = await redis.xadd(\n' +
'    "stream:orders",\n' +
'    "*",                          // Auto-generate ID\n' +
'    "orderId", order.id,\n' +
'    "userId", order.userId,\n' +
'    "total", String(order.total),\n' +
'    "timestamp", String(Date.now())\n' +
'  );\n' +
'  return id;\n' +
'}\n\n' +
'// Create consumer group (run once)\n' +
'await redis.xgroup("CREATE", "stream:orders", "order-service", "$", "MKSTREAM")\n' +
'  .catch(() => {}); // Ignore if group already exists\n\n' +
'// Consumer: read and process\n' +
'async function consumeOrders(consumerName: string) {\n' +
'  while (true) {\n' +
'    const results = await redis.xreadgroup(\n' +
'      "GROUP", "order-service", consumerName,\n' +
'      "COUNT", "10",\n' +
'      "BLOCK", "5000",            // Block 5s if no messages\n' +
'      "STREAMS", "stream:orders", ">"\n' +
'    );\n\n' +
'    if (results) {\n' +
'      for (const [stream, messages] of results) {\n' +
'        for (const [id, fields] of messages) {\n' +
'          // Process the order\n' +
'          console.log(`Processing order \${fields[1]} for user \${fields[3]}`);\n\n' +
'          // Acknowledge after successful processing\n' +
'          await redis.xack("stream:orders", "order-service", id);\n' +
'        }\n' +
'      }\n' +
'    }\n' +
'  }\n' +
'}\n\n' +
'// Start consumers\n' +
'consumeOrders("worker-1");\n' +
'consumeOrders("worker-2");'}</code></pre>

      {/* Section 4: Transactions & Lua Scripting */}
      <h2 style={h2Style}>{isZh ? '4. Redis 事务与 Lua 脚本' : '4. Redis Transactions & Lua Scripting'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 事务（MULTI/EXEC）保证一组命令的原子执行。但对于需要条件逻辑的场景，Lua 脚本是更强大的选择——脚本在服务端原子执行，无竞态条件。'
          : 'Redis transactions (MULTI/EXEC) guarantee atomic execution of a group of commands. For scenarios requiring conditional logic, Lua scripts are more powerful -- scripts execute atomically on the server with no race conditions.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'MULTI/EXEC 事务' : 'MULTI/EXEC Transactions'}</h3>
      <pre style={preStyle}><code>{'# Basic transaction\n' +
'MULTI\n' +
'SET account:1001:balance 500\n' +
'SET account:1002:balance 300\n' +
'EXEC\n' +
'# Both commands execute atomically\n\n' +
'# Optimistic locking with WATCH\n' +
'WATCH account:1001:balance\n' +
'# Read current balance\n' +
'GET account:1001:balance              # "500"\n' +
'MULTI\n' +
'DECRBY account:1001:balance 100\n' +
'INCRBY account:1002:balance 100\n' +
'EXEC\n' +
'# EXEC returns nil if account:1001:balance changed between WATCH and EXEC\n' +
'# Application must retry in that case'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Lua 脚本（原子操作）' : 'Lua Scripting (Atomic Operations)'}</h3>
      <pre style={preStyle}><code>{'-- Lua: atomic transfer between accounts\n' +
'-- KEYS[1] = source account, KEYS[2] = destination account\n' +
'-- ARGV[1] = transfer amount\n\n' +
'local source_balance = tonumber(redis.call("GET", KEYS[1]))\n' +
'local amount = tonumber(ARGV[1])\n\n' +
'if source_balance >= amount then\n' +
'  redis.call("DECRBY", KEYS[1], amount)\n' +
'  redis.call("INCRBY", KEYS[2], amount)\n' +
'  return 1  -- success\n' +
'else\n' +
'  return 0  -- insufficient funds\n' +
'end'}</code></pre>
      <pre style={preStyle}><code>{'// Execute Lua script from Node.js (ioredis)\n' +
'const transferScript = `\n' +
'local source_balance = tonumber(redis.call("GET", KEYS[1]))\n' +
'local amount = tonumber(ARGV[1])\n' +
'if source_balance >= amount then\n' +
'  redis.call("DECRBY", KEYS[1], amount)\n' +
'  redis.call("INCRBY", KEYS[2], amount)\n' +
'  return 1\n' +
'else\n' +
'  return 0\n' +
'end\n' +
'`;\n\n' +
'// Define custom command\n' +
'redis.defineCommand("transfer", {\n' +
'  numberOfKeys: 2,\n' +
'  lua: transferScript,\n' +
'});\n\n' +
'// Use it\n' +
'const result = await (redis as any).transfer(\n' +
'  "account:1001:balance",\n' +
'  "account:1002:balance",\n' +
'  "100"\n' +
');\n' +
'console.log(result === 1 ? "Transfer successful" : "Insufficient funds");'}</code></pre>

      {/* Section 5: Redis Cluster & Sentinel */}
      <h2 style={h2Style}>{isZh ? '5. Redis Cluster 与 Sentinel' : '5. Redis Cluster & Sentinel'}</h2>
      <p style={pStyle}>
        {isZh
          ? '生产环境的 Redis 需要高可用性和可扩展性。Redis Sentinel 提供自动故障转移，Redis Cluster 提供数据分片和分布式处理。'
          : 'Production Redis requires high availability and scalability. Redis Sentinel provides automatic failover, while Redis Cluster provides data sharding and distributed processing.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Redis Sentinel 配置' : 'Redis Sentinel Configuration'}</h3>
      <pre style={preStyle}><code>{'# sentinel.conf\n' +
'port 26379\n' +
'sentinel monitor mymaster 127.0.0.1 6379 2\n' +
'sentinel down-after-milliseconds mymaster 5000\n' +
'sentinel failover-timeout mymaster 60000\n' +
'sentinel parallel-syncs mymaster 1\n' +
'sentinel auth-pass mymaster your_strong_password\n\n' +
'# Start sentinel\n' +
'redis-sentinel /etc/redis/sentinel.conf\n\n' +
'# Check sentinel status\n' +
'redis-cli -p 26379 SENTINEL masters\n' +
'redis-cli -p 26379 SENTINEL replicas mymaster\n' +
'redis-cli -p 26379 SENTINEL get-master-addr-by-name mymaster'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Redis Cluster 部署' : 'Redis Cluster Deployment'}</h3>
      <pre style={preStyle}><code>{'# Create a 6-node cluster (3 masters + 3 replicas)\n' +
'# Start 6 Redis instances on ports 7000-7005\n' +
'for port in 7000 7001 7002 7003 7004 7005; do\n' +
'  mkdir -p /etc/redis/cluster/$port\n' +
'  cat > /etc/redis/cluster/$port/redis.conf << EOF\n' +
'port $port\n' +
'cluster-enabled yes\n' +
'cluster-config-file nodes-$port.conf\n' +
'cluster-node-timeout 5000\n' +
'appendonly yes\n' +
'appendfilename "appendonly-$port.aof"\n' +
'requirepass your_password\n' +
'masterauth your_password\n' +
'EOF\n' +
'  redis-server /etc/redis/cluster/$port/redis.conf &\n' +
'done\n\n' +
'# Create the cluster\n' +
'redis-cli --cluster create \\\n' +
'  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \\\n' +
'  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\\n' +
'  --cluster-replicas 1 -a your_password\n\n' +
'# Check cluster info\n' +
'redis-cli -p 7000 -a your_password CLUSTER INFO\n' +
'redis-cli -p 7000 -a your_password CLUSTER NODES\n\n' +
'# Add a new node\n' +
'redis-cli --cluster add-node 127.0.0.1:7006 127.0.0.1:7000 -a your_password\n\n' +
'# Reshard slots to the new node\n' +
'redis-cli --cluster reshard 127.0.0.1:7000 -a your_password'}</code></pre>

      <h3 style={h3Style}>{isZh ? '连接 Redis Cluster（Node.js）' : 'Connecting to Redis Cluster (Node.js)'}</h3>
      <pre style={preStyle}><code>{'import Redis from "ioredis";\n\n' +
'// Connect to Redis Cluster\n' +
'const cluster = new Redis.Cluster(\n' +
'  [\n' +
'    { host: "127.0.0.1", port: 7000 },\n' +
'    { host: "127.0.0.1", port: 7001 },\n' +
'    { host: "127.0.0.1", port: 7002 },\n' +
'  ],\n' +
'  {\n' +
'    redisOptions: {\n' +
'      password: "your_password",\n' +
'    },\n' +
'    scaleReads: "slave",              // Read from replicas\n' +
'    natMap: {},                        // NAT mapping if needed\n' +
'  }\n' +
');\n\n' +
'// Connect to Sentinel\n' +
'const sentinel = new Redis({\n' +
'  sentinels: [\n' +
'    { host: "127.0.0.1", port: 26379 },\n' +
'    { host: "127.0.0.1", port: 26380 },\n' +
'    { host: "127.0.0.1", port: 26381 },\n' +
'  ],\n' +
'  name: "mymaster",\n' +
'  password: "your_password",\n' +
'  sentinelPassword: "sentinel_password",\n' +
'});'}</code></pre>

      {/* Section 6: Redis with Node.js */}
      <h2 style={h2Style}>{isZh ? '6. Redis 与 Node.js' : '6. Redis with Node.js'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'ioredis 是 Node.js 最推荐的 Redis 客户端，支持集群、Sentinel、管道、Lua 脚本和流。它提供基于 Promise 的 API 和自动重连机制。'
          : 'ioredis is the recommended Redis client for Node.js. It supports Cluster, Sentinel, pipelining, Lua scripting, and Streams with a Promise-based API and automatic reconnection.'}
      </p>

      <h3 style={h3Style}>{isZh ? '连接与管道' : 'Connection & Pipelining'}</h3>
      <pre style={preStyle}><code>{'import Redis from "ioredis";\n\n' +
'// Basic connection with options\n' +
'const redis = new Redis({\n' +
'  host: "127.0.0.1",\n' +
'  port: 6379,\n' +
'  password: "your_password",\n' +
'  db: 0,\n' +
'  maxRetriesPerRequest: 3,\n' +
'  retryStrategy(times) {\n' +
'    const delay = Math.min(times * 50, 2000);\n' +
'    return delay;\n' +
'  },\n' +
'  lazyConnect: true,                  // Connect on first command\n' +
'});\n\n' +
'await redis.connect();\n\n' +
'// --- Pipelining: batch commands (10-100x throughput) ---\n' +
'const pipeline = redis.pipeline();\n' +
'for (let i = 0; i < 1000; i++) {\n' +
'  pipeline.set(`key:\${i}`, `value:\${i}`, "EX", 3600);\n' +
'}\n' +
'const results = await pipeline.exec();\n' +
'// results: [[null, "OK"], [null, "OK"], ...]\n\n' +
'// Pipeline with mixed read/write\n' +
'const pipe = redis.pipeline();\n' +
'pipe.hgetall("user:1001");\n' +
'pipe.lrange("feed:1001", 0, 9);\n' +
'pipe.zrevrange("leaderboard", 0, 4, "WITHSCORES");\n' +
'pipe.get("config:feature_flags");\n' +
'const [user, feed, topPlayers, flags] = await pipe.exec();\n\n' +
'// --- Connection pool pattern ---\n' +
'class RedisPool {\n' +
'  private pool: Redis[] = [];\n' +
'  private index = 0;\n\n' +
'  constructor(private size: number, private options: object) {\n' +
'    for (let i = 0; i < size; i++) {\n' +
'      this.pool.push(new Redis(options));\n' +
'    }\n' +
'  }\n\n' +
'  getClient(): Redis {\n' +
'    const client = this.pool[this.index % this.size];\n' +
'    this.index++;\n' +
'    return client;\n' +
'  }\n\n' +
'  async disconnectAll(): Promise<void> {\n' +
'    await Promise.all(this.pool.map((c) => c.quit()));\n' +
'  }\n' +
'}'}</code></pre>

      {/* Section 7: Redis with Python */}
      <h2 style={h2Style}>{isZh ? '7. Redis 与 Python' : '7. Redis with Python'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'redis-py 是 Python 的标准 Redis 客户端。从 4.2 版本开始内置 async 支持。支持连接池、管道、Pub/Sub 和集群。'
          : 'redis-py is the standard Redis client for Python. Since version 4.2, it includes built-in async support. It supports connection pooling, pipelines, Pub/Sub, and Cluster.'}
      </p>
      <pre style={preStyle}><code>{'import redis\nimport json\nfrom datetime import timedelta\n\n' +
'# Connection pool (recommended for production)\n' +
'pool = redis.ConnectionPool(\n' +
'    host="127.0.0.1",\n' +
'    port=6379,\n' +
'    password="your_password",\n' +
'    db=0,\n' +
'    max_connections=20,\n' +
'    decode_responses=True,           # Auto-decode bytes to str\n' +
')\n' +
'r = redis.Redis(connection_pool=pool)\n\n' +
'# Basic operations\n' +
'r.set("user:1001", json.dumps({"name": "Alice", "email": "alice@example.com"}))\n' +
'r.expire("user:1001", timedelta(hours=1))\n' +
'user = json.loads(r.get("user:1001"))\n\n' +
'# Pipeline (batch commands)\n' +
'with r.pipeline() as pipe:\n' +
'    pipe.hset("product:1", mapping={"name": "Widget", "price": "29.99", "stock": "150"})\n' +
'    pipe.hset("product:2", mapping={"name": "Gadget", "price": "49.99", "stock": "75"})\n' +
'    pipe.expire("product:1", 3600)\n' +
'    pipe.expire("product:2", 3600)\n' +
'    results = pipe.execute()\n\n' +
'# Pub/Sub\n' +
'pubsub = r.pubsub()\n' +
'pubsub.subscribe("notifications")\n\n' +
'for message in pubsub.listen():\n' +
'    if message["type"] == "message":\n' +
'        data = json.loads(message["data"])\n' +
'        print(f"Received: {data}")\n\n' +
'# --- Async redis (built-in since 4.2) ---\n' +
'import redis.asyncio as aioredis\n\n' +
'async def async_example():\n' +
'    r = aioredis.Redis(\n' +
'        host="127.0.0.1",\n' +
'        port=6379,\n' +
'        password="your_password",\n' +
'        decode_responses=True,\n' +
'    )\n\n' +
'    await r.set("async_key", "async_value", ex=3600)\n' +
'    value = await r.get("async_key")\n' +
'    print(f"Async value: {value}")\n\n' +
'    # Async pipeline\n' +
'    async with r.pipeline() as pipe:\n' +
'        await pipe.set("k1", "v1").set("k2", "v2").execute()\n\n' +
'    await r.aclose()'}</code></pre>

      {/* Section 8: Rate Limiting */}
      <h2 style={h2Style}>{isZh ? '8. Redis 限流' : '8. Rate Limiting with Redis'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 的原子操作和过期机制使其成为实现分布式限流的理想选择。以下是三种常见的限流算法实现。'
          : 'Redis atomic operations and expiration make it ideal for distributed rate limiting. Here are three common rate limiting algorithm implementations.'}
      </p>

      <h3 style={h3Style}>{isZh ? '滑动窗口限流' : 'Sliding Window Rate Limiter'}</h3>
      <pre style={preStyle}><code>{'// Sliding Window with Sorted Set (Node.js)\n' +
'async function slidingWindowRateLimit(\n' +
'  redis: Redis,\n' +
'  key: string,\n' +
'  limit: number,\n' +
'  windowSec: number\n' +
'): Promise<{ allowed: boolean; remaining: number; retryAfter: number }> {\n' +
'  const now = Date.now();\n' +
'  const windowStart = now - windowSec * 1000;\n\n' +
'  const pipe = redis.pipeline();\n' +
'  pipe.zremrangebyscore(key, 0, windowStart);   // Remove expired\n' +
'  pipe.zadd(key, String(now), `\${now}:` + Math.random());\n' +
'  pipe.zcard(key);                               // Count in window\n' +
'  pipe.expire(key, windowSec);                   // Auto-cleanup\n\n' +
'  const results = await pipe.exec();\n' +
'  const count = results![2][1] as number;\n\n' +
'  if (count > limit) {\n' +
'    // Get oldest entry to calculate retry-after\n' +
'    const oldest = await redis.zrange(key, 0, 0, "WITHSCORES");\n' +
'    const retryAfter = oldest.length > 1\n' +
'      ? Math.ceil((Number(oldest[1]) + windowSec * 1000 - now) / 1000)\n' +
'      : windowSec;\n\n' +
'    return { allowed: false, remaining: 0, retryAfter };\n' +
'  }\n\n' +
'  return { allowed: true, remaining: limit - count, retryAfter: 0 };\n' +
'}\n\n' +
'// Usage: 100 requests per 60 seconds\n' +
'const result = await slidingWindowRateLimit(redis, "rate:user:1001", 100, 60);\n' +
'if (!result.allowed) {\n' +
'  res.status(429).json({\n' +
'    error: "Rate limit exceeded",\n' +
'    retryAfter: result.retryAfter,\n' +
'  });\n' +
'}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '令牌桶算法（Lua 脚本）' : 'Token Bucket Algorithm (Lua Script)'}</h3>
      <pre style={preStyle}><code>{'-- Token Bucket Lua Script\n' +
'-- KEYS[1] = bucket key\n' +
'-- ARGV[1] = max tokens, ARGV[2] = refill rate (tokens/sec)\n' +
'-- ARGV[3] = current timestamp (ms), ARGV[4] = tokens to consume\n\n' +
'local key = KEYS[1]\n' +
'local max_tokens = tonumber(ARGV[1])\n' +
'local refill_rate = tonumber(ARGV[2])\n' +
'local now = tonumber(ARGV[3])\n' +
'local requested = tonumber(ARGV[4])\n\n' +
'-- Get current state\n' +
'local data = redis.call("HMGET", key, "tokens", "last_refill")\n' +
'local tokens = tonumber(data[1]) or max_tokens\n' +
'local last_refill = tonumber(data[2]) or now\n\n' +
'-- Calculate refill\n' +
'local elapsed = (now - last_refill) / 1000\n' +
'local new_tokens = math.min(max_tokens, tokens + elapsed * refill_rate)\n\n' +
'-- Check if enough tokens\n' +
'if new_tokens >= requested then\n' +
'  new_tokens = new_tokens - requested\n' +
'  redis.call("HMSET", key, "tokens", new_tokens, "last_refill", now)\n' +
'  redis.call("EXPIRE", key, math.ceil(max_tokens / refill_rate) * 2)\n' +
'  return {1, math.floor(new_tokens)}  -- allowed, remaining\n' +
'else\n' +
'  redis.call("HMSET", key, "tokens", new_tokens, "last_refill", now)\n' +
'  redis.call("EXPIRE", key, math.ceil(max_tokens / refill_rate) * 2)\n' +
'  local wait = math.ceil((requested - new_tokens) / refill_rate)\n' +
'  return {0, wait}  -- denied, retry_after_seconds\n' +
'end'}</code></pre>

      <h3 style={h3Style}>{isZh ? '漏桶算法' : 'Leaky Bucket Algorithm'}</h3>
      <pre style={preStyle}><code>{'# Leaky Bucket with Redis (Python)\n' +
'import time\nimport redis\n\n' +
'class LeakyBucket:\n' +
'    def __init__(self, r: redis.Redis, key: str, capacity: int, leak_rate: float):\n' +
'        """\n' +
'        capacity: max requests in the bucket\n' +
'        leak_rate: requests processed per second\n' +
'        """\n' +
'        self.r = r\n' +
'        self.key = key\n' +
'        self.capacity = capacity\n' +
'        self.leak_rate = leak_rate\n\n' +
'    def allow(self) -> bool:\n' +
'        now = time.time()\n' +
'        pipe = self.r.pipeline()\n\n' +
'        # Remove leaked (processed) requests\n' +
'        pipe.zremrangebyscore(self.key, 0, now - self.capacity / self.leak_rate)\n' +
'        pipe.zcard(self.key)  # Current queue size\n' +
'        _, queue_size = pipe.execute()\n\n' +
'        if queue_size < self.capacity:\n' +
'            # Add request to queue\n' +
'            self.r.zadd(self.key, {f"{now}:{id(self)}": now})\n' +
'            self.r.expire(self.key, int(self.capacity / self.leak_rate) + 10)\n' +
'            return True\n\n' +
'        return False  # Bucket is full\n\n' +
'# Usage: 10 requests max, processes 2/sec\n' +
'bucket = LeakyBucket(r, "leaky:api:user:1001", capacity=10, leak_rate=2.0)\n' +
'if bucket.allow():\n' +
'    print("Request accepted")\n' +
'else:\n' +
'    print("Rate limited — bucket full")'}</code></pre>

      {/* Section 9: Session Management */}
      <h2 style={h2Style}>{isZh ? '9. 会话管理' : '9. Session Management'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 是分布式会话存储的理想选择。它支持快速读写、自动过期和跨服务器的会话共享。'
          : 'Redis is ideal for distributed session storage. It supports fast reads/writes, automatic expiration, and session sharing across servers.'}
      </p>

      <h3 style={h3Style}>{isZh ? '分布式会话（Express.js）' : 'Distributed Sessions (Express.js)'}</h3>
      <pre style={preStyle}><code>{'import express from "express";\n' +
'import session from "express-session";\n' +
'import RedisStore from "connect-redis";\n' +
'import Redis from "ioredis";\n\n' +
'const redis = new Redis({\n' +
'  host: "127.0.0.1",\n' +
'  port: 6379,\n' +
'  password: "your_password",\n' +
'});\n\n' +
'const app = express();\n\n' +
'app.use(\n' +
'  session({\n' +
'    store: new RedisStore({ client: redis, prefix: "sess:" }),\n' +
'    secret: "your-session-secret",\n' +
'    resave: false,\n' +
'    saveUninitialized: false,\n' +
'    cookie: {\n' +
'      secure: true,                   // HTTPS only\n' +
'      httpOnly: true,                 // No JS access\n' +
'      maxAge: 24 * 60 * 60 * 1000,   // 24 hours\n' +
'      sameSite: "lax",\n' +
'    },\n' +
'  })\n' +
');\n\n' +
'// Session is automatically stored in Redis\n' +
'app.post("/login", async (req, res) => {\n' +
'  const { username, password } = req.body;\n' +
'  const user = await authenticateUser(username, password);\n\n' +
'  if (user) {\n' +
'    req.session.userId = user.id;\n' +
'    req.session.role = user.role;\n' +
'    res.json({ message: "Logged in" });\n' +
'  } else {\n' +
'    res.status(401).json({ error: "Invalid credentials" });\n' +
'  }\n' +
'});\n\n' +
'// Logout — destroy session in Redis\n' +
'app.post("/logout", (req, res) => {\n' +
'  req.session.destroy((err) => {\n' +
'    if (err) return res.status(500).json({ error: "Logout failed" });\n' +
'    res.clearCookie("connect.sid");\n' +
'    res.json({ message: "Logged out" });\n' +
'  });\n' +
'});'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'JWT + Redis（令牌黑名单）' : 'JWT + Redis (Token Blacklist)'}</h3>
      <pre style={preStyle}><code>{'import jwt from "jsonwebtoken";\nimport Redis from "ioredis";\n\n' +
'const redis = new Redis();\nconst JWT_SECRET = process.env.JWT_SECRET!;\n\n' +
'// Issue JWT\n' +
'function issueToken(userId: string, role: string): string {\n' +
'  return jwt.sign(\n' +
'    { sub: userId, role },\n' +
'    JWT_SECRET,\n' +
'    { expiresIn: "1h", jti: crypto.randomUUID() }\n' +
'  );\n' +
'}\n\n' +
'// Revoke JWT by adding to blacklist\n' +
'async function revokeToken(token: string): Promise<void> {\n' +
'  const decoded = jwt.decode(token) as jwt.JwtPayload;\n' +
'  if (!decoded?.jti || !decoded?.exp) return;\n\n' +
'  const ttl = decoded.exp - Math.floor(Date.now() / 1000);\n' +
'  if (ttl > 0) {\n' +
'    await redis.set(`blacklist:\${decoded.jti}`, "1", "EX", ttl);\n' +
'  }\n' +
'}\n\n' +
'// Verify JWT (check blacklist)\n' +
'async function verifyToken(token: string): Promise<jwt.JwtPayload | null> {\n' +
'  try {\n' +
'    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;\n\n' +
'    // Check if token is blacklisted\n' +
'    const isBlacklisted = await redis.exists(`blacklist:\${decoded.jti}`);\n' +
'    if (isBlacklisted) return null;\n\n' +
'    return decoded;\n' +
'  } catch {\n' +
'    return null;\n' +
'  }\n' +
'}\n\n' +
'// Middleware\n' +
'async function authMiddleware(req: any, res: any, next: any) {\n' +
'  const token = req.headers.authorization?.replace("Bearer ", "");\n' +
'  if (!token) return res.status(401).json({ error: "No token" });\n\n' +
'  const payload = await verifyToken(token);\n' +
'  if (!payload) return res.status(401).json({ error: "Invalid token" });\n\n' +
'  req.user = payload;\n' +
'  next();\n' +
'}'}</code></pre>

      {/* Section 10: Redis Search & JSON */}
      <h2 style={h2Style}>{isZh ? '10. RediSearch 与 RedisJSON' : '10. Redis Search & JSON'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'RediSearch 模块为 Redis 添加了全文搜索、二级索引和聚合功能。RedisJSON 允许在 Redis 中原生存储和操作 JSON 文档。两者结合可以构建强大的文档搜索系统。'
          : 'The RediSearch module adds full-text search, secondary indexing, and aggregation to Redis. RedisJSON allows native JSON document storage and manipulation. Together they enable powerful document search systems.'}
      </p>
      <pre style={preStyle}><code>{'# --- RedisJSON ---\n' +
'# Store JSON document\n' +
'JSON.SET product:1001 $ \'{"name":"Wireless Mouse","brand":"TechCo","price":29.99,"category":"electronics","tags":["wireless","ergonomic","bluetooth"],"specs":{"dpi":1600,"battery":"AA","weight":"85g"}}\'\n\n' +
'# Read nested fields\n' +
'JSON.GET product:1001 $.name             # \'"Wireless Mouse"\'\n' +
'JSON.GET product:1001 $.specs.dpi        # \'1600\'\n' +
'JSON.GET product:1001 $.tags[0]          # \'"wireless"\'\n\n' +
'# Update nested fields\n' +
'JSON.SET product:1001 $.price 24.99\n' +
'JSON.NUMINCRBY product:1001 $.specs.dpi 400  # 2000\n' +
'JSON.ARRAPPEND product:1001 $.tags \'"usb-c"\'\n\n' +
'# --- RediSearch ---\n' +
'# Create search index on JSON documents\n' +
'FT.CREATE idx:products ON JSON PREFIX 1 product: SCHEMA\n' +
'  $.name AS name TEXT WEIGHT 5.0\n' +
'  $.brand AS brand TEXT\n' +
'  $.category AS category TAG\n' +
'  $.price AS price NUMERIC SORTABLE\n' +
'  $.tags[*] AS tags TAG\n\n' +
'# Full-text search\n' +
'FT.SEARCH idx:products "wireless mouse" LIMIT 0 10\n\n' +
'# Filter by category and price range\n' +
'FT.SEARCH idx:products "@category:{electronics} @price:[10 50]" SORTBY price ASC\n\n' +
'# Autocomplete suggestions\n' +
'FT.SUGADD autocomplete "Wireless Mouse" 100\n' +
'FT.SUGADD autocomplete "Wireless Keyboard" 90\n' +
'FT.SUGGET autocomplete "wire" FUZZY MAX 5\n\n' +
'# Aggregation — average price per category\n' +
'FT.AGGREGATE idx:products "*"\n' +
'  GROUPBY 1 @category\n' +
'  REDUCE AVG 1 @price AS avg_price\n' +
'  REDUCE COUNT 0 AS total\n' +
'  SORTBY 2 @avg_price DESC'}</code></pre>

      <h3 style={h3Style}>{isZh ? '在 Node.js 中使用 RediSearch' : 'Using RediSearch in Node.js'}</h3>
      <pre style={preStyle}><code>{'import { createClient, SchemaFieldTypes } from "redis";\n\n' +
'const client = createClient({ url: "redis://localhost:6379" });\n' +
'await client.connect();\n\n' +
'// Create index\n' +
'try {\n' +
'  await client.ft.create("idx:products", {\n' +
'    "$.name": { type: SchemaFieldTypes.TEXT, AS: "name", WEIGHT: 5 },\n' +
'    "$.brand": { type: SchemaFieldTypes.TEXT, AS: "brand" },\n' +
'    "$.category": { type: SchemaFieldTypes.TAG, AS: "category" },\n' +
'    "$.price": { type: SchemaFieldTypes.NUMERIC, AS: "price", SORTABLE: true },\n' +
'  }, { ON: "JSON", PREFIX: "product:" });\n' +
'} catch (e) {\n' +
'  // Index already exists\n' +
'}\n\n' +
'// Store products as JSON\n' +
'await client.json.set("product:2001", "$", {\n' +
'  name: "Mechanical Keyboard",\n' +
'  brand: "KeyTech",\n' +
'  category: "electronics",\n' +
'  price: 89.99,\n' +
'  tags: ["mechanical", "rgb", "cherry-mx"],\n' +
'});\n\n' +
'// Search\n' +
'const results = await client.ft.search("idx:products", "@category:{electronics} @price:[50 100]", {\n' +
'  SORTBY: { BY: "price", DIRECTION: "ASC" },\n' +
'  LIMIT: { from: 0, size: 10 },\n' +
'});\n\n' +
'console.log(`Found \${results.total} products:`);\n' +
'for (const doc of results.documents) {\n' +
'  console.log(doc.id, doc.value);\n' +
'}'}</code></pre>

      {/* Section 11: Performance Tuning */}
      <h2 style={h2Style}>{isZh ? '11. Redis 性能调优' : '11. Redis Performance Tuning'}</h2>
      <p style={pStyle}>
        {isZh
          ? '优化 Redis 性能需要从内存管理、持久化配置和命令优化三个方面入手。以下是生产环境中的关键调优参数。'
          : 'Optimizing Redis performance requires attention to memory management, persistence configuration, and command optimization. Here are the key tuning parameters for production.'}
      </p>

      <h3 style={h3Style}>{isZh ? '内存优化' : 'Memory Optimization'}</h3>
      <pre style={preStyle}><code>{'# redis.conf — Memory optimization\n\n' +
'# Set memory limit\n' +
'maxmemory 4gb\n' +
'maxmemory-policy allkeys-lfu\n\n' +
'# Ziplist encoding for small hashes (saves 5-10x memory)\n' +
'hash-max-ziplist-entries 128\n' +
'hash-max-ziplist-value 64\n\n' +
'# Ziplist encoding for small sorted sets\n' +
'zset-max-ziplist-entries 128\n' +
'zset-max-ziplist-value 64\n\n' +
'# Listpack for small lists\n' +
'list-max-ziplist-size -2      # 8kb per node\n' +
'list-compress-depth 1         # Compress all but head/tail\n\n' +
'# Intset for small integer sets\n' +
'set-max-intset-entries 512\n\n' +
'# Lazy freeing (non-blocking deletes)\n' +
'lazyfree-lazy-eviction yes\n' +
'lazyfree-lazy-expire yes\n' +
'lazyfree-lazy-server-del yes\n' +
'replica-lazy-flush yes'}</code></pre>

      <h3 style={h3Style}>{isZh ? '持久化：RDB vs AOF' : 'Persistence: RDB vs AOF'}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
            <th style={thStyle}>RDB</th>
            <th style={thStyle}>AOF</th>
            <th style={thStyle}>RDB + AOF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '机制' : 'Mechanism'}</td>
            <td style={tdStyle}>{isZh ? '定期快照' : 'Point-in-time snapshots'}</td>
            <td style={tdStyle}>{isZh ? '追加写操作日志' : 'Append-only write log'}</td>
            <td style={tdStyle}>{isZh ? '两者结合' : 'Both combined'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '数据丢失风险' : 'Data loss risk'}</td>
            <td style={tdStyle}>{isZh ? '取决于快照间隔' : 'Up to snapshot interval'}</td>
            <td style={tdStyle}>{isZh ? '最多丢失 1 秒' : 'Up to 1 second'}</td>
            <td style={tdStyle}>{isZh ? '最多丢失 1 秒' : 'Up to 1 second'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '恢复速度' : 'Recovery speed'}</td>
            <td style={tdStyle}>{isZh ? '快' : 'Fast'}</td>
            <td style={tdStyle}>{isZh ? '慢（重放日志）' : 'Slow (replay log)'}</td>
            <td style={tdStyle}>{isZh ? '快（先加载 RDB）' : 'Fast (loads RDB first)'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '写性能影响' : 'Write performance'}</td>
            <td style={tdStyle}>{isZh ? 'fork 时短暂影响' : 'Brief pause on fork'}</td>
            <td style={tdStyle}>{isZh ? '持续少量开销' : 'Continuous small overhead'}</td>
            <td style={tdStyle}>{isZh ? '两者都有' : 'Both'}</td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '建议' : 'Recommendation'}</td>
            <td style={tdStyle}>{isZh ? '仅缓存场景' : 'Cache-only use'}</td>
            <td style={tdStyle}>{isZh ? '需要持久化' : 'When durability needed'}</td>
            <td style={{ ...tdStyle, fontWeight: '600' }}>{isZh ? '生产环境推荐' : 'Recommended for production'}</td>
          </tr>
        </tbody>
      </table>

      <pre style={preStyle}><code>{'# redis.conf — Persistence configuration\n\n' +
'# RDB snapshots\n' +
'save 900 1          # Snapshot if 1+ keys changed in 900s\n' +
'save 300 10         # Snapshot if 10+ keys changed in 300s\n' +
'save 60 10000       # Snapshot if 10000+ keys changed in 60s\n' +
'rdbcompression yes\n' +
'rdbchecksum yes\n' +
'dbfilename dump.rdb\n' +
'dir /var/lib/redis\n\n' +
'# AOF (recommended for production)\n' +
'appendonly yes\n' +
'appendfilename "appendonly.aof"\n' +
'appendfsync everysec          # Fsync every second (best tradeoff)\n' +
'# appendfsync always          # Fsync after every write (safest, slowest)\n' +
'# appendfsync no              # Let OS decide (fastest, riskiest)\n\n' +
'# AOF rewrite (compact the log)\n' +
'auto-aof-rewrite-percentage 100\n' +
'auto-aof-rewrite-min-size 64mb\n' +
'aof-use-rdb-preamble yes      # Hybrid format (fast load + AOF durability)'}</code></pre>

      <h3 style={h3Style}>{isZh ? '性能基准与诊断' : 'Benchmarking & Diagnostics'}</h3>
      <pre style={preStyle}><code>{'# Built-in benchmark tool\n' +
'redis-benchmark -h 127.0.0.1 -p 6379 -c 50 -n 100000 -q\n\n' +
'# Benchmark specific commands\n' +
'redis-benchmark -t set,get,lpush,lpop,zadd -n 100000 -q\n\n' +
'# Benchmark with pipeline\n' +
'redis-benchmark -t set -n 1000000 -P 16 -q\n\n' +
'# Latency diagnostics\n' +
'redis-cli --latency                    # Continuous latency sampling\n' +
'redis-cli --latency-history -i 5       # Latency over time (5s intervals)\n' +
'redis-cli --latency-dist               # Latency histogram\n' +
'redis-cli --intrinsic-latency 10       # System baseline latency (10s)\n\n' +
'# Memory analysis\n' +
'redis-cli INFO memory\n' +
'redis-cli MEMORY DOCTOR\n' +
'redis-cli MEMORY USAGE user:1001       # Bytes used by specific key\n\n' +
'# Find big keys (scan without blocking)\n' +
'redis-cli --bigkeys\n' +
'redis-cli --memkeys'}</code></pre>

      {/* Section 12: Redis Security */}
      <h2 style={h2Style}>{isZh ? '12. Redis 安全' : '12. Redis Security'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 默认设计为在可信网络中运行。生产环境必须配置认证、网络隔离和访问控制来保护数据安全。'
          : 'Redis is designed to run in trusted networks by default. Production deployments must configure authentication, network isolation, and access controls to protect data.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'ACL（访问控制列表）' : 'ACL (Access Control Lists)'}</h3>
      <pre style={preStyle}><code>{'# redis.conf — ACL configuration\n\n' +
'# Default user (disable or set strong password)\n' +
'requirepass your_very_strong_password_here\n\n' +
'# Create users with specific permissions\n' +
'# user <username> on|off [password] [commands] [keys]\n\n' +
'# Read-only user for analytics\n' +
'user analytics on >analytics_pass ~analytics:* +get +mget +hgetall +zrange +lrange -@all\n\n' +
'# Application user with limited commands\n' +
'user webapp on >webapp_secret_pass ~user:* ~session:* ~cache:* +@read +@write +@set +@hash -@admin -@dangerous\n\n' +
'# Admin user (all permissions)\n' +
'user admin on >admin_super_secret ~* +@all\n\n' +
'# Disable default user (after creating named users)\n' +
'user default off\n\n' +
'# --- Runtime ACL management ---\n' +
'ACL SETUSER readonly on >readonly_pass ~cache:* +get +mget\n' +
'ACL LIST                                # List all users\n' +
'ACL WHOAMI                              # Current user\n' +
'ACL GETUSER webapp                      # Get user details\n' +
'ACL DELUSER temp_user                   # Delete user\n' +
'ACL LOG 10                              # Last 10 ACL violations'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'TLS 加密与网络安全' : 'TLS Encryption & Network Security'}</h3>
      <pre style={preStyle}><code>{'# redis.conf — TLS configuration\n\n' +
'# Enable TLS\n' +
'tls-port 6380\n' +
'port 0                                  # Disable non-TLS port\n\n' +
'tls-cert-file /etc/redis/tls/redis.crt\n' +
'tls-key-file /etc/redis/tls/redis.key\n' +
'tls-ca-cert-file /etc/redis/tls/ca.crt\n\n' +
'# Require client certificate (mutual TLS)\n' +
'tls-auth-clients yes\n\n' +
'# TLS for replication\n' +
'tls-replication yes\n\n' +
'# TLS for cluster bus\n' +
'tls-cluster yes\n\n' +
'# --- Network security ---\n\n' +
'# Bind to specific interfaces only\n' +
'bind 127.0.0.1 10.0.1.5              # Localhost + private network\n\n' +
'# Enable protected mode\n' +
'protected-mode yes\n\n' +
'# Disable dangerous commands\n' +
'rename-command FLUSHALL ""\n' +
'rename-command FLUSHDB ""\n' +
'rename-command DEBUG ""\n' +
'rename-command CONFIG "REDIS_CONFIG_8fj3k"  # Rename to obscure name\n\n' +
'# --- Firewall rules (iptables) ---\n' +
'# Allow only app servers\n' +
'# iptables -A INPUT -p tcp --dport 6379 -s 10.0.1.0/24 -j ACCEPT\n' +
'# iptables -A INPUT -p tcp --dport 6379 -j DROP'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'TLS 连接（Node.js）' : 'TLS Connection (Node.js)'}</h3>
      <pre style={preStyle}><code>{'import Redis from "ioredis";\nimport fs from "fs";\n\n' +
'const redis = new Redis({\n' +
'  host: "redis.example.com",\n' +
'  port: 6380,\n' +
'  username: "webapp",\n' +
'  password: "webapp_secret_pass",\n' +
'  tls: {\n' +
'    ca: fs.readFileSync("/path/to/ca.crt"),\n' +
'    cert: fs.readFileSync("/path/to/client.crt"),\n' +
'    key: fs.readFileSync("/path/to/client.key"),\n' +
'    rejectUnauthorized: true,\n' +
'  },\n' +
'});'}</code></pre>

      {/* Section 13: Redis Monitoring & Observability */}
      <h2 style={h2Style}>{isZh ? '13. Redis 监控与可观测性' : '13. Redis Monitoring & Observability'}</h2>
      <p style={pStyle}>
        {isZh
          ? '监控是维护健康 Redis 部署的关键。Redis 提供内置的 INFO 命令和 SLOWLOG，结合 Prometheus + Grafana 可以实现全面的可观测性。'
          : 'Monitoring is essential for maintaining a healthy Redis deployment. Redis provides built-in INFO and SLOWLOG commands, and combined with Prometheus + Grafana, you can achieve comprehensive observability.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'INFO 命令与关键指标' : 'INFO Command & Key Metrics'}</h3>
      <pre style={preStyle}><code>{'# Essential monitoring commands\n' +
'redis-cli INFO server                   # Version, uptime, OS info\n' +
'redis-cli INFO memory                   # Memory usage details\n' +
'redis-cli INFO stats                    # Ops/sec, hits, misses\n' +
'redis-cli INFO replication              # Master/replica status\n' +
'redis-cli INFO clients                  # Connected clients\n' +
'redis-cli INFO keyspace                 # DB key counts\n\n' +
'# Key metrics to monitor:\n' +
'# used_memory / used_memory_rss         — Memory usage\n' +
'# connected_clients                     — Active connections\n' +
'# instantaneous_ops_per_sec             — Current throughput\n' +
'# keyspace_hits / keyspace_misses       — Cache hit ratio\n' +
'# evicted_keys                          — Keys removed by eviction\n' +
'# rejected_connections                  — Max clients reached\n' +
'# rdb_last_bgsave_status                — Last snapshot status\n\n' +
'# Calculate hit ratio\n' +
'# hit_ratio = keyspace_hits / (keyspace_hits + keyspace_misses) * 100\n' +
'# Target: > 95% for caching workloads\n\n' +
'# SLOWLOG — queries exceeding threshold\n' +
'CONFIG SET slowlog-log-slower-than 10000   # Log queries > 10ms\n' +
'CONFIG SET slowlog-max-len 128\n' +
'SLOWLOG GET 10                              # Last 10 slow queries\n' +
'SLOWLOG LEN                                 # Total slow query count\n' +
'SLOWLOG RESET                               # Clear the log\n\n' +
'# Real-time command monitoring (use briefly, high overhead)\n' +
'redis-cli MONITOR                           # Prints all commands\n\n' +
'# Client list (debug connections)\n' +
'redis-cli CLIENT LIST\n' +
'redis-cli CLIENT KILL ID 123               # Kill specific client'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Prometheus + Grafana 监控' : 'Prometheus + Grafana Monitoring'}</h3>
      <pre style={preStyle}><code>{'# docker-compose.yml — Redis monitoring stack\n' +
'version: "3.8"\n' +
'services:\n' +
'  redis:\n' +
'    image: redis:7-alpine\n' +
'    ports:\n' +
'      - "6379:6379"\n' +
'    command: redis-server --requirepass your_password\n' +
'    volumes:\n' +
'      - redis_data:/data\n\n' +
'  redis-exporter:\n' +
'    image: oliver006/redis_exporter:latest\n' +
'    ports:\n' +
'      - "9121:9121"\n' +
'    environment:\n' +
'      REDIS_ADDR: redis://redis:6379\n' +
'      REDIS_PASSWORD: your_password\n' +
'    depends_on:\n' +
'      - redis\n\n' +
'  prometheus:\n' +
'    image: prom/prometheus:latest\n' +
'    ports:\n' +
'      - "9090:9090"\n' +
'    volumes:\n' +
'      - ./prometheus.yml:/etc/prometheus/prometheus.yml\n\n' +
'  grafana:\n' +
'    image: grafana/grafana:latest\n' +
'    ports:\n' +
'      - "3000:3000"\n' +
'    environment:\n' +
'      GF_SECURITY_ADMIN_PASSWORD: admin\n\n' +
'volumes:\n' +
'  redis_data:'}</code></pre>
      <pre style={preStyle}><code>{'# prometheus.yml\n' +
'global:\n' +
'  scrape_interval: 15s\n\n' +
'scrape_configs:\n' +
'  - job_name: "redis"\n' +
'    static_configs:\n' +
'      - targets: ["redis-exporter:9121"]\n' +
'    metrics_path: /metrics'}</code></pre>

      <h3 style={h3Style}>{isZh ? '告警规则' : 'Alerting Rules'}</h3>
      <pre style={preStyle}><code>{'# prometheus-alerts.yml\n' +
'groups:\n' +
'  - name: redis_alerts\n' +
'    rules:\n' +
'      - alert: RedisHighMemoryUsage\n' +
'        expr: redis_memory_used_bytes / redis_memory_max_bytes > 0.85\n' +
'        for: 5m\n' +
'        labels:\n' +
'          severity: warning\n' +
'        annotations:\n' +
'          summary: "Redis memory usage above 85%"\n' +
'          description: "Redis instance {{ $labels.instance }} memory at {{ $value | humanizePercentage }}"\n\n' +
'      - alert: RedisHighLatency\n' +
'        expr: redis_commands_duration_seconds_total / redis_commands_processed_total > 0.01\n' +
'        for: 2m\n' +
'        labels:\n' +
'          severity: critical\n' +
'        annotations:\n' +
'          summary: "Redis average latency above 10ms"\n\n' +
'      - alert: RedisLowHitRatio\n' +
'        expr: |\n' +
'          redis_keyspace_hits_total /\n' +
'          (redis_keyspace_hits_total + redis_keyspace_misses_total) < 0.9\n' +
'        for: 10m\n' +
'        labels:\n' +
'          severity: warning\n' +
'        annotations:\n' +
'          summary: "Redis cache hit ratio below 90%"\n\n' +
'      - alert: RedisReplicationBroken\n' +
'        expr: redis_connected_slaves < 1\n' +
'        for: 1m\n' +
'        labels:\n' +
'          severity: critical\n' +
'        annotations:\n' +
'          summary: "Redis has no connected replicas"\n\n' +
'      - alert: RedisTooManyConnections\n' +
'        expr: redis_connected_clients > 1000\n' +
'        for: 5m\n' +
'        labels:\n' +
'          severity: warning\n' +
'        annotations:\n' +
'          summary: "Redis has over 1000 connected clients"'}</code></pre>

      <h3 style={h3Style}>{isZh ? '自定义健康检查脚本' : 'Custom Health Check Script'}</h3>
      <pre style={preStyle}><code>{'#!/bin/bash\n' +
'# redis-health-check.sh — Quick Redis health report\n\n' +
'REDIS_CLI="redis-cli -a your_password --no-auth-warning"\n\n' +
'echo "=== Redis Health Report ==="\n' +
'echo ""\n\n' +
'# Uptime\n' +
'UPTIME=$($REDIS_CLI INFO server | grep uptime_in_days | tr -d "\\r")\n' +
'echo "Uptime: $UPTIME"\n\n' +
'# Memory\n' +
'USED_MEM=$($REDIS_CLI INFO memory | grep used_memory_human | tr -d "\\r")\n' +
'MAX_MEM=$($REDIS_CLI CONFIG GET maxmemory | tail -1)\n' +
'echo "Memory: $USED_MEM (max: $MAX_MEM bytes)"\n\n' +
'# Hit ratio\n' +
'HITS=$($REDIS_CLI INFO stats | grep keyspace_hits | cut -d: -f2 | tr -d "\\r")\n' +
'MISSES=$($REDIS_CLI INFO stats | grep keyspace_misses | cut -d: -f2 | tr -d "\\r")\n' +
'if [ "$HITS" -gt 0 ] 2>/dev/null; then\n' +
'  RATIO=$(echo "scale=2; $HITS * 100 / ($HITS + $MISSES)" | bc)\n' +
'  echo "Hit Ratio: $RATIO%"\n' +
'fi\n\n' +
'# Connected clients\n' +
'CLIENTS=$($REDIS_CLI INFO clients | grep connected_clients | tr -d "\\r")\n' +
'echo "Clients: $CLIENTS"\n\n' +
'# Ops per second\n' +
'OPS=$($REDIS_CLI INFO stats | grep instantaneous_ops_per_sec | tr -d "\\r")\n' +
'echo "Throughput: $OPS"\n\n' +
'# Slow queries\n' +
'SLOW=$($REDIS_CLI SLOWLOG LEN)\n' +
'echo "Slow queries: $SLOW"\n\n' +
'# Evicted keys\n' +
'EVICTED=$($REDIS_CLI INFO stats | grep evicted_keys | tr -d "\\r")\n' +
'echo "Evicted: $EVICTED"\n\n' +
'echo ""\n' +
'echo "=== End Report ==="'}</code></pre>

      {/* Summary Section */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Summary'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Redis 是现代应用架构中不可或缺的组件。从简单的缓存到复杂的实时数据处理，Redis 的丰富数据结构和高性能使其成为开发者的首选。以下是选择正确 Redis 模式的快速参考：'
          : 'Redis is an indispensable component in modern application architectures. From simple caching to complex real-time data processing, Redis rich data structures and high performance make it a go-to choice for developers. Here is a quick reference for choosing the right Redis pattern:'}
      </p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{isZh ? '场景' : 'Use Case'}</th>
            <th style={thStyle}>{isZh ? '推荐方案' : 'Recommended Approach'}</th>
            <th style={thStyle}>{isZh ? '关键命令' : 'Key Commands'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{isZh ? '缓存' : 'Caching'}</td>
            <td style={tdStyle}>{isZh ? 'Cache-aside + TTL + LFU 淘汰' : 'Cache-aside + TTL + LFU eviction'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>SET EX</code>, <code style={inlineCodeStyle}>GET</code>, <code style={inlineCodeStyle}>DEL</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '排行榜' : 'Leaderboards'}</td>
            <td style={tdStyle}>{isZh ? '有序集合' : 'Sorted Sets'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>ZADD</code>, <code style={inlineCodeStyle}>ZREVRANGE</code>, <code style={inlineCodeStyle}>ZINCRBY</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '限流' : 'Rate Limiting'}</td>
            <td style={tdStyle}>{isZh ? '滑动窗口（有序集合）或令牌桶（Lua）' : 'Sliding window (sorted set) or token bucket (Lua)'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>ZADD</code>, <code style={inlineCodeStyle}>ZRANGEBYSCORE</code>, <code style={inlineCodeStyle}>EVALSHA</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '会话管理' : 'Sessions'}</td>
            <td style={tdStyle}>{isZh ? '哈希 + TTL 或 connect-redis' : 'Hashes + TTL or connect-redis'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>HSET</code>, <code style={inlineCodeStyle}>HGETALL</code>, <code style={inlineCodeStyle}>EXPIRE</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '消息队列' : 'Message Queue'}</td>
            <td style={tdStyle}>{isZh ? 'Streams + 消费者组' : 'Streams + Consumer Groups'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>XADD</code>, <code style={inlineCodeStyle}>XREADGROUP</code>, <code style={inlineCodeStyle}>XACK</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '实时通知' : 'Real-time Notifications'}</td>
            <td style={tdStyle}>Pub/Sub</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>PUBLISH</code>, <code style={inlineCodeStyle}>SUBSCRIBE</code>, <code style={inlineCodeStyle}>PSUBSCRIBE</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '全文搜索' : 'Full-text Search'}</td>
            <td style={tdStyle}>RediSearch + RedisJSON</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>FT.CREATE</code>, <code style={inlineCodeStyle}>FT.SEARCH</code>, <code style={inlineCodeStyle}>JSON.SET</code></td>
          </tr>
          <tr>
            <td style={tdStyle}>{isZh ? '分布式锁' : 'Distributed Lock'}</td>
            <td style={tdStyle}>{isZh ? 'SET NX EX + Lua 续期' : 'SET NX EX + Lua renewal'}</td>
            <td style={tdStyle}><code style={inlineCodeStyle}>SET NX EX</code>, <code style={inlineCodeStyle}>EVALSHA</code></td>
          </tr>
        </tbody>
      </table>

      <p style={pStyle}>
        {isZh
          ? '无论你是将 Redis 用作缓存层、消息代理还是主数据库，本指南涵盖的模式和最佳实践将帮助你构建高性能、可靠和安全的 Redis 部署。记住始终使用连接池、管道化批量命令、配置适当的持久化策略，以及通过 ACL 和 TLS 保障安全。'
          : 'Whether you use Redis as a caching layer, message broker, or primary data store, the patterns and best practices covered in this guide will help you build high-performance, reliable, and secure Redis deployments. Always use connection pools, pipeline batch commands, configure appropriate persistence, and secure with ACLs and TLS.'}
      </p>
    </>
  );
}
