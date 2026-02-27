'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Redis Complete Guide: Data Types, Caching, Pub/Sub, Streams, and Production — 2025',
    description: 'Master Redis with this complete guide covering data types, Node.js ioredis, caching patterns, session storage, Pub/Sub, Streams, Python redis-py, rate limiting, transactions, and production deployment.',
  },
  zh: {
    title: 'Redis 完整指南：数据类型、缓存、发布/订阅、流和生产部署 — 2025',
    description: '全面掌握 Redis：数据类型、Node.js ioredis、缓存模式、会话存储、发布/订阅、Streams、Python redis-py、速率限制、事务和生产环境部署。',
  },
};

export default function RedisGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main Redis data types and when should I use each?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis offers 8 core data types: Strings for simple key-value pairs and counters; Lists (linked lists) for queues and recent activity feeds; Sets for unique membership and intersection/union operations; Sorted Sets for leaderboards and time-series data with scores; Hashes for storing objects as field-value maps; Streams for append-only event logs with consumer groups; HyperLogLog for approximate unique counting with minimal memory; Bitmaps for bit-level operations on strings for flags and analytics. Choose based on your access pattern: random access → Hash or String; ordered data → Sorted Set; deduplication → Set; message queue → Stream or List.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Cache-Aside and Write-Through caching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cache-Aside (lazy loading): the application checks the cache first; on miss, it reads from the database and populates the cache. The cache only contains data that has been requested, so cold start can cause many cache misses. Write-Through: on every write, the application writes to both the cache and the database synchronously, keeping them always in sync. The downside is write latency and potentially caching data that is never read. Write-Behind (write-back) is a variant where writes go to cache first and are flushed to the database asynchronously, improving write performance but risking data loss on crash. For most web applications, Cache-Aside is the most pragmatic choice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Redis Pub/Sub and Redis Streams differ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis Pub/Sub is fire-and-forget: messages are delivered only to currently connected subscribers; if a subscriber disconnects and reconnects, it misses messages sent during that time. There is no message persistence. Redis Streams are persistent, ordered logs: messages are stored permanently (until explicitly trimmed), each has a unique ID, consumers can read from any position, and consumer groups allow multiple consumers to share the workload with acknowledgment tracking. Use Pub/Sub for ephemeral real-time notifications where message loss is acceptable. Use Streams for durable event processing, microservice communication, and anywhere you need message replay or at-least-once delivery guarantees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between MULTI/EXEC transactions and Lua scripts in Redis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MULTI/EXEC queues commands and executes them atomically as a batch — no other client commands run between them. However, MULTI/EXEC does not support conditional logic; if a command fails, the others still execute. WATCH adds optimistic locking: if a watched key changes before EXEC, the entire transaction is aborted. Lua scripts (EVAL) run server-side with full scripting capability, conditional logic, and loops. They execute atomically just like MULTI/EXEC but allow complex operations that read a value and conditionally update based on it. For rate limiting or atomic check-and-set operations, Lua scripts are preferred because they combine the read and write in a single atomic operation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between RDB and AOF persistence in Redis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RDB (Redis Database Backup) takes point-in-time snapshots at configurable intervals (e.g., every 5 minutes if 1000 keys changed). It is compact and fast to restore but can lose up to the interval\'s worth of data on crash. AOF (Append Only File) logs every write operation; with fsync: always policy, it offers near-zero data loss but generates larger files and is slower to restart. You can use both simultaneously for best durability. In production, enable AOF with fsync: everysec (a good balance) and keep RDB for fast restores. For Redis as a pure cache (losing data is acceptable), you can disable both persistence entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement a sliding window rate limiter with Redis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The sliding window algorithm uses a Sorted Set where members are request timestamps and scores are the same timestamps. For each request: ZADD adds the current timestamp, ZREMRANGEBYSCORE removes entries older than the window (e.g., 60 seconds ago), ZCARD counts remaining entries. If the count exceeds the limit, reject the request. Use a Lua script to make this atomic: local count = redis.call("ZCARD", key) if count >= limit then return 0 else redis.call("ZADD", key, now, now) redis.call("EXPIRE", key, window) return 1 end. For high-traffic production use, consider using Redis modules like redis-cell which implements the token bucket algorithm natively.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Redis Sentinel and Redis Cluster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis Sentinel provides high availability for a single Redis instance with replication: it monitors the primary, automatically promotes a replica if the primary fails (failover), and provides service discovery so clients always find the current primary. It does NOT provide horizontal scaling — all data is on one shard. Redis Cluster provides both high availability AND horizontal scaling by sharding data across multiple nodes using hash slots (16384 total). Each shard has its own primary-replica pair. Cluster handles automatic failover AND distributes keys across nodes. Use Sentinel when your dataset fits in one machine but you need HA. Use Cluster when your dataset exceeds one node\'s memory or you need to distribute read/write load.',
        },
      },
      {
        '@type': 'Question',
        name: 'What maxmemory-policy should I use for Redis as a cache?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For a pure cache (it is acceptable to evict data), the most commonly recommended policy is allkeys-lru, which evicts the least recently used key across all keys when memory is full. This is predictable and works well for general caching. volatile-lru only evicts keys with an expiry set, which is safer if you mix cached and persistent data in the same Redis instance. allkeys-lfu (Least Frequently Used) is better than LRU for workloads with hot keys that are accessed infrequently but should stay in cache. If your data has no clear eviction preference and you want to prevent memory errors, use noeviction to get an error instead of silently losing data. Set maxmemory to about 80% of available RAM to leave room for Redis internal overhead.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/redis-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          <strong>Redis</strong> is an in-memory data structure store used as a database, cache, message broker, and
          streaming engine. It supports 8 data types — Strings, Lists, Sets, Sorted Sets, Hashes, Streams,
          HyperLogLog, and Bitmaps. For Node.js use <strong>ioredis</strong>, for Python use{' '}
          <strong>redis-py</strong>. Choose <strong>Cache-Aside</strong> for most caching, use{' '}
          <strong>Streams</strong> over Pub/Sub for durable messaging, and{' '}
          <strong>Lua scripts</strong> for atomic operations like rate limiting. In production, combine{' '}
          <strong>AOF + RDB</strong> persistence and use <strong>Sentinel</strong> or{' '}
          <strong>Cluster</strong> for high availability. Format your JSON payloads with our{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0284c7' }}>
            JSON Formatter
          </Link>{' '}
          before storing them in Redis.
        </p>
      </div>

      {/* Section 1: Redis Data Types */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Data Types — Commands and Use Cases
      </h2>
      <p>
        Redis is not just a key-value store — it is a data structure server. Choosing the right data type for
        your problem dramatically improves performance and simplifies your code.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        String
      </h3>
      <p>
        The most fundamental type. A String value can hold any binary-safe data up to 512 MB. Used for counters,
        session tokens, cached HTML fragments, and serialized JSON.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`SET user:1:name "Alice"
GET user:1:name               # "Alice"
INCR page:home:views          # atomic counter increment
INCRBY score:user:1 10        # increment by 10
SETEX session:abc123 3600 "{...}"  # set with 3600s TTL
SETNX lock:resource 1         # set only if not exists (distributed lock)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        List
      </h3>
      <p>
        A linked list of strings. O(1) push/pop from both ends makes it ideal for queues, stacks, and recent
        activity feeds. <code>LPUSH</code>/<code>RPOP</code> = queue; <code>LPUSH</code>/<code>LPOP</code> = stack.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`RPUSH jobs:queue "job1" "job2"   # enqueue
LPOP  jobs:queue                  # dequeue (FIFO)
BLPOP jobs:queue 30               # blocking pop (waits 30s for item)
LRANGE feed:user:1 0 9            # first 10 items (activity feed)
LTRIM feed:user:1 0 99            # keep only last 100 items`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Set
      </h3>
      <p>
        An unordered collection of unique strings. Great for membership checks, deduplication, and set operations
        (union, intersection, difference).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`SADD tags:post:1 "redis" "cache" "database"
SISMEMBER tags:post:1 "redis"   # 1 (true)
SMEMBERS tags:post:1            # all members
SCARD tags:post:1               # count = 3
SINTER tags:post:1 tags:post:2  # common tags
SUNION tags:post:1 tags:post:2  # all tags combined
SDIFF  tags:post:1 tags:post:2  # tags in post:1 but not post:2`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sorted Set
      </h3>
      <p>
        Like a Set but each member has a floating-point <strong>score</strong>. Members are always ordered by score.
        The perfect data structure for leaderboards, priority queues, and range queries.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`ZADD leaderboard 1500 "alice" 2300 "bob" 900 "charlie"
ZREVRANGE leaderboard 0 2 WITHSCORES  # top 3 with scores
ZRANK leaderboard "alice"             # rank (0-indexed)
ZINCRBY leaderboard 100 "alice"       # +100 points
ZRANGEBYSCORE leaderboard 1000 2000   # members with score 1000-2000
ZCOUNT leaderboard 1000 2000          # count in score range`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Hash
      </h3>
      <p>
        A map of field-value pairs, ideal for storing objects. More memory-efficient than storing a JSON string
        when you need to update individual fields.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`HSET user:1 name "Alice" email "alice@example.com" age 30
HGET user:1 name          # "Alice"
HMGET user:1 name email   # ["Alice", "alice@example.com"]
HGETALL user:1            # all field-value pairs
HINCRBY user:1 age 1      # increment age atomically
HDEL user:1 email         # delete a field
HEXISTS user:1 name       # 1 (true)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        HyperLogLog and Bitmaps
      </h3>
      <p>
        <strong>HyperLogLog</strong> estimates the cardinality (unique count) of large sets using very little
        memory (12 KB regardless of set size), with ~0.81% error. <strong>Bitmaps</strong> are string-backed
        bit arrays for space-efficient boolean flags.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# HyperLogLog — unique visitor counting
PFADD page:home:visitors "user1" "user2" "user3"
PFCOUNT page:home:visitors   # approximate unique count
PFMERGE all:visitors page:home:visitors page:about:visitors

# Bitmaps — daily active users (1 bit per user ID)
SETBIT active:2025-01-15 userId 1   # user was active
GETBIT active:2025-01-15 userId     # check if active
BITCOUNT active:2025-01-15          # total active users today
BITOP AND result active:2025-01-15 active:2025-01-14  # active both days`}</code></pre>

      {/* Section 2: Node.js ioredis */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js ioredis — Installation, Connection, and Core Operations
      </h2>
      <p>
        <strong>ioredis</strong> is the recommended Redis client for Node.js. It supports Redis Cluster, Sentinel,
        pipelining, Lua scripting, and full async/await syntax out of the box.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install ioredis`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Connection
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import Redis from 'ioredis';

// Basic connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  retryStrategy: (times) => Math.min(times * 50, 2000), // reconnect with backoff
  lazyConnect: true, // don't connect until first command
});

redis.on('connect', () => console.log('Redis connected'));
redis.on('error', (err) => console.error('Redis error:', err));
redis.on('close', () => console.warn('Redis connection closed'));

// TLS connection (Redis Cloud, ElastiCache with TLS)
const redisTls = new Redis({
  host: 'my-redis.cloud.redislabs.com',
  port: 6380,
  password: 'secret',
  tls: { rejectUnauthorized: false },
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Core Operations
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// SET / GET / DEL
await redis.set('user:1', JSON.stringify({ name: 'Alice' }));
const raw = await redis.get('user:1');
const user = raw ? JSON.parse(raw) : null;
await redis.del('user:1');

// Expiry
await redis.set('session:abc', 'data', 'EX', 3600); // expire in 1 hour
await redis.expire('mykey', 300);   // set/update TTL
const ttl = await redis.ttl('mykey'); // seconds remaining (-1 = no TTL, -2 = missing)
await redis.persist('mykey');         // remove TTL

// Check existence
const exists = await redis.exists('mykey'); // 1 or 0

// Hash operations
await redis.hset('user:2', 'name', 'Bob', 'age', '25');
const name = await redis.hget('user:2', 'name');
const all = await redis.hgetall('user:2'); // { name: 'Bob', age: '25' }

// Sorted set
await redis.zadd('scores', 100, 'alice', 200, 'bob');
const top = await redis.zrevrange('scores', 0, -1, 'WITHSCORES');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pipeline and Cluster
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Pipeline — batch commands in one round trip
const pipeline = redis.pipeline();
pipeline.set('key1', 'val1');
pipeline.set('key2', 'val2');
pipeline.get('key1');
pipeline.incr('counter');
const results = await pipeline.exec();
// results: [[null, 'OK'], [null, 'OK'], [null, 'val1'], [null, 1]]

// Redis Cluster
import { Cluster } from 'ioredis';
const cluster = new Cluster([
  { host: '127.0.0.1', port: 7000 },
  { host: '127.0.0.1', port: 7001 },
  { host: '127.0.0.1', port: 7002 },
], {
  redisOptions: { password: 'secret' },
  clusterRetryStrategy: (times) => Math.min(times * 100, 3000),
});`}</code></pre>

      {/* Section 3: Caching Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Caching Patterns — Cache-Aside, Write-Through, Write-Behind
      </h2>
      <p>
        The right caching pattern depends on your read/write ratio, consistency requirements, and tolerance for
        stale data.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Cache-Aside (Lazy Loading)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`async function getUser(id: string) {
  const cacheKey = \`user:\${id}\`;

  // 1. Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Cache miss — load from database
  const user = await db.users.findById(id);
  if (!user) return null;

  // 3. Populate cache with TTL
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  return user;
}

// Cache invalidation on write
async function updateUser(id: string, data: Partial<User>) {
  await db.users.update(id, data);
  await redis.del(\`user:\${id}\`); // invalidate — next read re-populates
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Write-Through
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`async function upsertProduct(id: string, data: Product) {
  // Write to DB and cache simultaneously
  const [dbResult] = await Promise.all([
    db.products.upsert(id, data),
    redis.set(\`product:\${id}\`, JSON.stringify(data), 'EX', 86400),
  ]);
  return dbResult;
}

// Reads are always fast since cache is always populated
async function getProduct(id: string) {
  const cached = await redis.get(\`product:\${id}\`);
  return cached ? JSON.parse(cached) : db.products.findById(id);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        TTL Best Practices
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Data Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Recommended TTL</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>User profiles</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1–24 hours</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Changes infrequently; invalidate on update</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>API responses</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>1–60 minutes</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Balance freshness vs. database load</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sessions</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>30 minutes–24 hours</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Match session timeout policy</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Rate limit counters</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Equal to window size</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Auto-reset when window expires</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Leaderboards</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No TTL or 24 hours</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Live data; regenerate on schedule</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 4: Session Storage */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Session Storage — express-session with connect-redis
      </h2>
      <p>
        Redis is the go-to session store for Node.js applications because it is fast, supports TTL-based
        expiry, and allows horizontal scaling across multiple server instances.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install express-session connect-redis ioredis`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const redisClient = new Redis({ host: 'localhost', port: 6379 });

app.use(session({
  store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
  secret: process.env.SESSION_SECRET!,
  resave: false,            // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    httpOnly: true,          // prevent JavaScript access
    sameSite: 'lax',         // CSRF protection
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in ms
  },
}));

// Session rotation after login to prevent session fixation
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);
  req.session.regenerate((err) => { // creates new session ID
    if (err) return res.status(500).send('Session error');
    req.session.userId = user.id;
    req.session.save(() => res.json({ ok: true }));
  });
});

// Logout — destroy session
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});`}</code></pre>

      {/* Section 5: Redis Pub/Sub */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Pub/Sub — Real-Time Messaging
      </h2>
      <p>
        Redis Pub/Sub enables message broadcasting to multiple subscribers in real time. A subscribed client
        receives all messages published to its channels while connected.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Publisher — uses a regular connection
const publisher = new Redis();
await publisher.publish('chat:room:1', JSON.stringify({
  user: 'Alice',
  message: 'Hello!',
  timestamp: Date.now(),
}));

// Subscriber — MUST be a dedicated connection (blocked in subscribe mode)
const subscriber = new Redis();
await subscriber.subscribe('chat:room:1', 'notifications:global');

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message);
  console.log(\`[\${channel}] \${data.user}: \${data.message}\`);
});

// Pattern subscriptions (glob-style)
await subscriber.psubscribe('chat:room:*');
subscriber.on('pmessage', (pattern, channel, message) => {
  console.log(\`Pattern \${pattern} matched \${channel}\`);
});

// Unsubscribe
await subscriber.unsubscribe('chat:room:1');
await subscriber.punsubscribe('chat:room:*');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Building a Chat Room with Redis Pub/Sub and Socket.IO
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { Server } from 'socket.io';
import Redis from 'ioredis';

const pub = new Redis();
const sub = new Redis();
const io = new Server(httpServer);

// Subscribe to all room channels
sub.psubscribe('chat:room:*');
sub.on('pmessage', (_pattern, channel, message) => {
  const roomId = channel.split(':')[2];
  io.to(roomId).emit('message', JSON.parse(message));
});

io.on('connection', (socket) => {
  socket.on('join', (roomId) => socket.join(roomId));

  socket.on('message', ({ roomId, text }) => {
    const payload = { user: socket.id, text, ts: Date.now() };
    // Publish to Redis — all server instances receive it
    pub.publish(\`chat:room:\${roomId}\`, JSON.stringify(payload));
  });
});`}</code></pre>

      {/* Section 6: Redis Streams */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Streams — Durable Event Logs with Consumer Groups
      </h2>
      <p>
        Redis Streams are append-only logs where each entry has a unique auto-generated ID
        (<code>milliseconds-sequence</code>). Unlike Pub/Sub, messages persist until explicitly deleted.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# XADD — append event to stream
XADD events:orders * action "placed" orderId "ord-123" userId "u-1"
# Returns: "1705000000000-0" (auto-generated ID: timestamp-sequence)

# XREAD — read new entries (blocking)
XREAD COUNT 10 BLOCK 5000 STREAMS events:orders $
# $ means "only new messages from now"

# XREAD from a specific ID
XREAD COUNT 10 STREAMS events:orders 0  # all messages from beginning

# XRANGE — range query
XRANGE events:orders - +           # all messages
XRANGE events:orders - + COUNT 10  # first 10
XRANGE events:orders 1705000000000-0 +  # from specific ID`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Consumer Groups — Distributed Processing
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Create consumer group
XGROUP CREATE events:orders order-processors $ MKSTREAM

# XREADGROUP — claim messages exclusively
XREADGROUP GROUP order-processors worker-1 COUNT 5 BLOCK 2000 STREAMS events:orders >
# > means "undelivered messages not yet assigned to any consumer"

# XACK — acknowledge processed message
XACK events:orders order-processors "1705000000000-0"

# Check pending messages (unacknowledged)
XPENDING events:orders order-processors - + 10

# Dead letter handling — claim messages pending too long
XAUTOCLAIM events:orders order-processors dead-letter-handler 60000 0-0 COUNT 10
# Reclaims messages idle for 60+ seconds`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Consumer Groups with ioredis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const STREAM = 'events:orders';
const GROUP = 'order-processors';
const CONSUMER = \`worker-\${process.pid}\`;

// Setup
await redis.xgroup('CREATE', STREAM, GROUP, '$', 'MKSTREAM').catch(() => {});

// Processing loop
async function processLoop() {
  while (true) {
    const results = await redis.xreadgroup(
      'GROUP', GROUP, CONSUMER,
      'COUNT', '10',
      'BLOCK', '2000',
      'STREAMS', STREAM, '>'
    ) as Array<[string, Array<[string, string[]]>]> | null;

    if (!results) continue;

    for (const [, messages] of results) {
      for (const [id, fields] of messages) {
        const data = Object.fromEntries(
          fields.reduce((acc, v, i) => i % 2 === 0 ? [...acc, [v]] : (acc[acc.length - 1].push(v), acc), [] as string[][])
        );
        await processOrder(data);
        await redis.xack(STREAM, GROUP, id);
      }
    }
  }
}`}</code></pre>

      {/* Section 7: Python redis-py */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python redis-py — Installation and Core Usage
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install redis`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import redis
import json
from datetime import timedelta

# Basic connection
r = redis.StrictRedis(
    host='localhost',
    port=6379,
    password=None,
    db=0,
    decode_responses=True,  # auto-decode bytes to str
)

# Core operations
r.set('user:1', json.dumps({'name': 'Alice', 'age': 30}))
user = json.loads(r.get('user:1'))

# With expiry
r.setex('session:abc', timedelta(hours=1), 'session_data')
r.expire('mykey', 300)
ttl = r.ttl('mykey')  # remaining seconds

# Hash
r.hset('product:1', mapping={'name': 'Widget', 'price': '9.99', 'stock': '100'})
price = r.hget('product:1', 'price')
product = r.hgetall('product:1')  # dict

# Pipeline
pipe = r.pipeline(transaction=False)  # non-transactional pipeline
pipe.set('k1', 'v1')
pipe.set('k2', 'v2')
pipe.incr('counter')
results = pipe.execute()  # [True, True, 1]`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Connection Pool and Async Support
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Connection pool (shared across threads)
pool = redis.ConnectionPool(
    host='localhost', port=6379, db=0,
    max_connections=20,
    decode_responses=True,
)
r = redis.StrictRedis(connection_pool=pool)

# Async with redis.asyncio (Python 3.7+)
import redis.asyncio as aioredis

async def main():
    async with aioredis.from_url(
        'redis://localhost:6379',
        encoding='utf-8',
        decode_responses=True,
    ) as r:
        await r.set('async_key', 'async_value')
        value = await r.get('async_key')
        print(value)  # 'async_value'

# Context manager for connection pool in FastAPI
from contextlib import asynccontextmanager
from fastapi import FastAPI

redis_pool: aioredis.Redis | None = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global redis_pool
    redis_pool = aioredis.from_url('redis://localhost:6379', decode_responses=True)
    yield
    await redis_pool.aclose()

app = FastAPI(lifespan=lifespan)`}</code></pre>

      {/* Section 8: Rate Limiting */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Rate Limiting with Redis — Sliding Window and Token Bucket
      </h2>
      <p>
        Redis is the ideal backend for distributed rate limiting because operations are atomic and sub-millisecond.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sliding Window with Sorted Set
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`async function slidingWindowRateLimit(
  identifier: string,  // e.g., IP address or user ID
  limit: number,       // max requests
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const key = \`ratelimit:\${identifier}\`;
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, '-inf', windowStart); // remove old entries
  pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`); // add current request
  pipeline.zcard(key);                                  // count requests in window
  pipeline.expire(key, windowSeconds + 1);              // auto-cleanup

  const results = await pipeline.exec();
  const count = results?.[2]?.[1] as number;
  const allowed = count <= limit;

  return { allowed, remaining: Math.max(0, limit - count) };
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Atomic Rate Limiter with Lua Script
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const rateLimitScript = \`
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local windowStart = now - window * 1000

redis.call('ZREMRANGEBYSCORE', key, '-inf', windowStart)
local count = redis.call('ZCARD', key)

if count >= limit then
  return {0, 0}  -- blocked, 0 remaining
end

redis.call('ZADD', key, now, now .. '-' .. math.random())
redis.call('EXPIRE', key, window + 1)
return {1, limit - count - 1}  -- allowed, remaining
\`;

// Register script
const rateLimitSha = await redis.script('LOAD', rateLimitScript);

// Execute atomically
const [allowed, remaining] = await redis.evalsha(
  rateLimitSha, 1,
  \`ratelimit:\${ip}\`,  // KEYS[1]
  '100',               // ARGV[1]: limit
  '60',                // ARGV[2]: window in seconds
  String(Date.now())   // ARGV[3]: now
) as [number, number];`}</code></pre>

      {/* Section 9: Redis Transactions */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Transactions — MULTI/EXEC/DISCARD and Optimistic Locking
      </h2>
      <p>
        Redis transactions group commands to execute atomically. No other client commands run between{' '}
        <code>MULTI</code> and <code>EXEC</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# MULTI/EXEC — basic transaction
MULTI
SET balance:alice 900
SET balance:bob 1100
INCR transactions:count
EXEC
# All three execute atomically, or none (if EXEC is aborted)

# DISCARD — cancel the transaction
MULTI
SET some:key "value"
DISCARD  # queued commands are discarded`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Optimistic Locking with WATCH
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Transfer funds atomically with optimistic locking
async function transfer(fromId: string, toId: string, amount: number): Promise<boolean> {
  const fromKey = \`balance:\${fromId}\`;
  const toKey = \`balance:\${toId}\`;

  while (true) { // retry loop
    await redis.watch(fromKey); // watch for changes

    const balance = parseInt(await redis.get(fromKey) || '0');
    if (balance < amount) {
      await redis.unwatch();
      return false; // insufficient funds
    }

    const result = await redis
      .multi()                                    // begin transaction
      .set(fromKey, String(balance - amount))
      .incrby(toKey, amount)
      .exec();                                    // returns null if WATCH key changed

    if (result !== null) return true; // success
    // null means conflict — retry
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pipeline vs Transaction
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Pipeline</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>MULTI/EXEC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Purpose</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Reduce network round trips</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Atomic execution guarantee</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Atomicity</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>No — other clients can interleave</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Yes — exclusive execution</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Conditional logic</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Not supported</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Use WATCH for optimistic locking</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Error handling</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Per-command results</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Errors in queue still execute; syntax errors abort</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Best for</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Bulk reads/writes for performance</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Bank transfers, inventory updates</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section 10: Production */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Production Redis — Persistence, Replication, Sentinel, Cluster
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Persistence — RDB vs AOF
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# redis.conf — recommended production persistence settings

# RDB snapshots
save 3600 1     # save if 1+ key changed in last 1 hour
save 300 100    # save if 100+ keys changed in last 5 minutes
save 60 10000   # save if 10000+ keys changed in last 1 minute
dbfilename dump.rdb
dir /var/lib/redis

# AOF (Append Only File)
appendonly yes
appendfsync everysec    # fsync every second (best balance)
# appendfsync always   # safest: fsync on every write (slower)
# appendfsync no       # OS decides when to flush (fastest, least safe)
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Memory Management
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Memory configuration in redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru  # evict LRU keys when memory full

# Policy options:
# noeviction         — return error when memory full (default; not for cache)
# allkeys-lru        — evict least recently used across all keys
# volatile-lru       — evict LRU from keys with TTL only
# allkeys-lfu        — evict least frequently used (Redis 4.0+)
# volatile-lfu       — evict LFU from keys with TTL only
# allkeys-random     — evict random keys
# volatile-random    — evict random keys with TTL
# volatile-ttl       — evict keys with shortest TTL first

# Monitor memory
redis-cli INFO memory | grep used_memory_human
redis-cli MEMORY USAGE user:1  # bytes for a specific key`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Redis Sentinel (High Availability)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2  # 2 sentinels must agree for failover
sentinel down-after-milliseconds mymaster 5000   # 5s to mark as down
sentinel failover-timeout mymaster 60000         # 60s failover timeout
sentinel parallel-syncs mymaster 1              # replicas to sync in parallel

# Connect to Sentinel with ioredis
const redis = new Redis({
  sentinels: [
    { host: 'sentinel-1', port: 26379 },
    { host: 'sentinel-2', port: 26379 },
    { host: 'sentinel-3', port: 26379 },
  ],
  name: 'mymaster',   // the master name in sentinel.conf
  password: 'secret',
  sentinelPassword: 'sentinel-secret',
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Monitoring
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Key monitoring commands
redis-cli INFO all                  # full server stats
redis-cli INFO stats | grep -E "instantaneous|ops_per_sec|keyspace_hits"
redis-cli INFO keyspace             # keys per database + expiry stats
redis-cli MONITOR                   # live command stream (dev only)
redis-cli SLOWLOG GET 10            # last 10 slow queries
redis-cli LATENCY HISTORY event     # latency history

# Hit rate (should be >95% for effective caching)
# keyspace_hits / (keyspace_hits + keyspace_misses)

# Key metrics to alert on:
# - memory usage > 80% of maxmemory
# - rejected_connections > 0
# - rdb_last_bgsave_status = err
# - aof_last_write_status = err`}</code></pre>

      {/* Section: Redis Security */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Security — Authentication, TLS, and ACLs
      </h2>
      <p>
        A default Redis installation listens on all interfaces with no authentication. For any
        internet-accessible deployment, securing Redis is critical.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# redis.conf — security hardening

# 1. Bind to localhost or private network only
bind 127.0.0.1 ::1
# OR for private network: bind 10.0.0.1

# 2. Require password (Redis 6+ supports ACLs instead)
requirepass your-strong-password-here

# 3. Disable dangerous commands by renaming them
rename-command FLUSHALL ""
rename-command FLUSHDB  ""
rename-command CONFIG   ""
rename-command DEBUG    ""
rename-command SHUTDOWN ""

# 4. Enable TLS (Redis 6+)
tls-port 6380
tls-cert-file /path/to/redis.crt
tls-key-file  /path/to/redis.key
tls-ca-cert-file /path/to/ca.crt
tls-auth-clients yes  # require client certificates`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Redis ACLs (Access Control Lists)
      </h3>
      <p>
        Redis 6 introduced ACLs, replacing the single <code>requirepass</code> with fine-grained per-user
        permissions. You can restrict users to specific commands and key patterns.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Create users via redis.conf or ACL commands at runtime

# In redis.conf (aclfile directive or inline):
# user default off nopass nocommands nokeys
# user app-user on >StrongP@ssw0rd ~cache:* ~session:* +GET +SET +DEL +EXPIRE +TTL
# user readonly-user on >ReadOnlyP@ss ~* +@read

# At runtime via redis-cli
ACL SETUSER app-user on >StrongP@ssw0rd ~cache:* +GET +SET +DEL +EXPIRE
ACL SETUSER readonly on >ReadOnlyP@ss ~* +@read -@write
ACL SETUSER analytics on >AnalyticsP@ss ~stats:* +PFADD +PFCOUNT +ZADD +ZRANGE

# List all users
ACL LIST

# Inspect a user
ACL GETUSER app-user

# Connect with a specific user
# redis-cli -u redis://app-user:StrongP@ssw0rd@localhost:6379`}</code></pre>

      {/* Section: Distributed Lock Pattern */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Distributed Locking with Redis — Redlock Pattern
      </h2>
      <p>
        Redis is widely used to implement distributed locks, ensuring that only one process executes a
        critical section at a time across multiple servers.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Simple distributed lock with ioredis
const LOCK_TTL_MS = 5000; // 5 seconds

async function acquireLock(resource: string, token: string): Promise<boolean> {
  // SET key value NX PX ttl — atomic: set only if not exists
  const result = await redis.set(
    \`lock:\${resource}\`,
    token,
    'NX',  // only set if not exists
    'PX',  // expiry in milliseconds
    LOCK_TTL_MS
  );
  return result === 'OK';
}

async function releaseLock(resource: string, token: string): Promise<boolean> {
  // Lua script ensures we only delete our own lock (atomic check-and-delete)
  const script = \`
    if redis.call("GET", KEYS[1]) == ARGV[1] then
      return redis.call("DEL", KEYS[1])
    else
      return 0
    end
  \`;
  const result = await redis.eval(script, 1, \`lock:\${resource}\`, token);
  return result === 1;
}

// Usage
async function withLock<T>(resource: string, fn: () => Promise<T>): Promise<T | null> {
  const token = \`\${Date.now()}-\${Math.random()}\`;
  const acquired = await acquireLock(resource, token);
  if (!acquired) return null; // lock held by another process

  try {
    return await fn();
  } finally {
    await releaseLock(resource, token);
  }
}

// Only one server runs this at a time
const result = await withLock('payment:user-123', async () => {
  // process payment exclusively
  return processPayment('user-123');
});`}</code></pre>

      {/* Section: Redis Common Patterns Reference */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Quick Reference — Common Redis Patterns
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Data Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Key Pattern</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Key Command</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Cache user object</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>String (JSON)</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>user:{'{id}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SET/GET + EX</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Session storage</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Hash</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>sess:{'{token}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HSET/HGETALL + EXPIRE</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Leaderboard</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sorted Set</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>lb:game:{'{gameId}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>ZADD/ZREVRANGE</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Job queue</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>List</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>queue:{'{name}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>RPUSH/BLPOP</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Unique visitors</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>HyperLogLog</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>uv:{'{date}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>PFADD/PFCOUNT</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Rate limiting</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Sorted Set</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>rl:{'{ip}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>ZADD/ZCARD + Lua</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Event stream</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Stream</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>events:{'{topic}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>XADD/XREADGROUP</td>
            </tr>
            <tr style={{ background: '#fafafa' }}>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Distributed lock</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>String</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>lock:{'{resource}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SET NX PX + Lua DEL</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Daily active flags</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>Bitmap</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}><code>dau:{'{date}'}</code></td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>SETBIT/BITCOUNT</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Tool CTA */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: 0 }}>
          <strong>Quick Tool:</strong> Before storing complex JSON objects in Redis, validate and format them with our{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#2563eb', fontWeight: 600 }}>
            JSON Formatter
          </Link>
          {' '}— instantly prettify, validate, and minify JSON payloads online.
        </p>
      </div>

      {/* Section: Redis Cluster configuration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Cluster Setup and Key Hashing
      </h2>
      <p>
        Redis Cluster automatically partitions data across multiple nodes using a hash slot mechanism.
        There are 16,384 hash slots total, and each node is responsible for a subset of them.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Minimal cluster: 3 primaries + 3 replicas = 6 nodes

# Create cluster (Redis 7+)
redis-cli --cluster create \
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
  --cluster-replicas 1

# Check cluster state
redis-cli -p 7000 CLUSTER INFO
redis-cli -p 7000 CLUSTER NODES

# Hash slots
# Key hash slot: CRC16(key) % 16384
# Keys in the same slot can be used in multi-key commands
# Use hash tags {} to force keys to same slot:
MSET {user:1}.name "Alice" {user:1}.email "alice@example.com"
# Both keys hash to the slot of "user:1" (the {} content)

# Cluster resharding
redis-cli --cluster reshard 127.0.0.1:7000 \
  --cluster-from <source-node-id> \
  --cluster-to <target-node-id> \
  --cluster-slots 1000 \
  --cluster-yes`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Multi-Key Operations in Cluster Mode
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// In cluster mode, multi-key operations (MGET, MSET, pipeline) require
// all keys to be on the same node. Use hash tags to guarantee this.

const cluster = new Cluster([{ host: '127.0.0.1', port: 7000 }]);

// ❌ This may fail in cluster mode — keys may be on different nodes
await cluster.mget('user:1:name', 'user:1:email');

// ✅ Use hash tags — {} content determines the slot
await cluster.mset('{user:1}:name', 'Alice', '{user:1}:email', 'alice@example.com');
await cluster.mget('{user:1}:name', '{user:1}:email'); // same slot — OK

// Pipeline in cluster mode with ioredis
// ioredis automatically routes pipelined commands to the correct node
const pipe = cluster.pipeline();
pipe.set('key1', 'val1');  // ioredis handles slot routing per command
pipe.get('key1');
await pipe.exec();`}</code></pre>

      {/* Section: Redis Debugging */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Debugging Redis — MONITOR, SLOWLOG, and LATENCY
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# MONITOR — stream all commands in real time (HIGH CPU, dev only)
redis-cli MONITOR
# 1705000000.123456 [0 127.0.0.1:52000] "SET" "user:1" "Alice"
# 1705000000.124000 [0 127.0.0.1:52000] "GET" "user:1"

# SLOWLOG — find slow commands
redis-cli CONFIG SET slowlog-log-slower-than 1000  # log queries > 1ms
redis-cli CONFIG SET slowlog-max-len 128
redis-cli SLOWLOG GET 10   # last 10 slow queries
redis-cli SLOWLOG RESET

# LATENCY — track latency events
redis-cli LATENCY HISTORY event
redis-cli LATENCY LATEST
redis-cli LATENCY RESET

# DEBUG OBJECT — inspect encoding and memory
redis-cli DEBUG OBJECT mykey
# Value at:0x7f... refcount:1 encoding:ziplist serializedlength:20 lru:...

# KEY analysis — find large keys
redis-cli --bigkeys              # scan for largest keys
redis-cli --memkeys              # memory usage per key pattern
redis-cli MEMORY USAGE user:1   # bytes for one key

# OBJECT ENCODING — check actual memory encoding used
redis-cli OBJECT ENCODING mylist    # "listpack" or "quicklist"
redis-cli OBJECT ENCODING myhash    # "listpack" or "hashtable"
redis-cli OBJECT ENCODING myzset    # "listpack" or "skiplist"`}</code></pre>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Choose the right data type</strong>: Sorted Sets for leaderboards, Hashes for objects, Streams for event logs, HyperLogLog for cardinality estimates.</li>
          <li><strong>Use ioredis for Node.js</strong>: it supports pipelining, Cluster, Sentinel, and Lua scripts natively with full async/await.</li>
          <li><strong>Cache-Aside is the most pragmatic pattern</strong>: lazy-load on miss, invalidate on write, always set a TTL to prevent stale data buildup.</li>
          <li><strong>Sessions in Redis</strong> require <code>connect-redis</code>, secure cookies, and session rotation on login to prevent fixation attacks.</li>
          <li><strong>Pub/Sub is fire-and-forget</strong>: use Streams with consumer groups for durable, at-least-once message delivery.</li>
          <li><strong>Lua scripts for atomicity</strong>: use <code>EVAL</code>/<code>EVALSHA</code> for complex check-and-set operations like rate limiting.</li>
          <li><strong>WATCH + MULTI/EXEC</strong> for optimistic locking — retry the transaction when WATCH detects a conflict.</li>
          <li><strong>Enable both AOF and RDB</strong> in production: AOF for minimal data loss, RDB for fast restore after a crash.</li>
          <li><strong>Set <code>maxmemory</code> and <code>maxmemory-policy</code></strong>: use <code>allkeys-lru</code> for pure caches; never leave Redis unbounded in production.</li>
          <li><strong>Sentinel for HA, Cluster for scale</strong>: use Sentinel when one shard is sufficient; add Cluster only when data or throughput exceeds a single node.</li>
        </ul>
      </div>
    </article>
  );
}
