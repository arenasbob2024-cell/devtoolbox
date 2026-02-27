'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Redis Complete Guide: Data Types, Caching, Pub/Sub, Clustering, and Rate Limiting — 2026',
    description:
      'Master Redis with this comprehensive guide: data structures (Strings, Lists, Sets, Sorted Sets, Hashes, Streams), Node.js ioredis, Python redis-py, caching strategies, session management, Pub/Sub, Redis Cluster, Sentinel, rate limiting, and comparison with Memcached and DynamoDB.',
    tldr:
      'Redis is an in-memory data structure store used as a database, cache, message broker, and streaming engine. It offers 8 core data types, sub-millisecond latency, and first-class support for patterns like caching, session storage, pub/sub, rate limiting, and leaderboards. Use ioredis for Node.js, redis-py for Python. In production, combine AOF + RDB persistence and use Sentinel or Cluster for high availability.',
  },
  zh: {
    title: 'Redis 完整指南：数据类型、缓存、发布/订阅、集群和限速 — 2026',
    description:
      '全面掌握 Redis：数据结构（String、List、Set、Sorted Set、Hash、Stream）、Node.js ioredis、Python redis-py、缓存策略、会话管理、Pub/Sub、Redis Cluster、Sentinel、限速，以及与 Memcached 和 DynamoDB 的对比。',
    tldr:
      'Redis 是一个内存数据结构存储，用作数据库、缓存、消息代理和流引擎。它提供 8 种核心数据类型、亚毫秒延迟，以及对缓存、会话、发布/订阅、限速和排行榜等模式的原生支持。',
  },
};

export default function RedisGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Redis and what is it used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis (Remote Dictionary Server) is an open-source, in-memory data structure store. It is used as a database, cache, message broker, and streaming engine. Common use cases include caching API responses and database query results, session storage for web applications, real-time leaderboards and counters, rate limiting, pub/sub messaging, and job queues. Its sub-millisecond latency and rich data structures make it the most popular in-memory data store.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the main Redis data types and when should I use each?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis offers 8 core data types: Strings for simple key-value pairs, counters, and serialized JSON; Lists (linked lists) for queues, stacks, and recent activity feeds; Sets for unique membership and intersection/union operations; Sorted Sets for leaderboards and range queries by score; Hashes for storing objects as field-value maps; Streams for append-only event logs with consumer groups; HyperLogLog for approximate unique counting with minimal memory; Bitmaps for bit-level operations on strings for flags and analytics.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Cache-Aside and Write-Through caching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cache-Aside (lazy loading): the application checks the cache first; on miss, it reads from the database and populates the cache. The cache only contains data that has been requested. Write-Through: on every write, the application writes to both the cache and the database synchronously, keeping them always in sync. Write-Behind (write-back) is a variant where writes go to cache first and are flushed to the database asynchronously, improving write performance but risking data loss on crash. For most web applications, Cache-Aside is the most pragmatic choice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Redis Pub/Sub and Redis Streams differ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis Pub/Sub is fire-and-forget: messages are delivered only to currently connected subscribers and there is no persistence. Redis Streams are persistent, ordered logs where messages are stored permanently until explicitly trimmed, each has a unique ID, and consumer groups allow multiple consumers to share workload with acknowledgment tracking. Use Pub/Sub for ephemeral real-time notifications where message loss is acceptable. Use Streams for durable event processing and anywhere you need message replay or at-least-once delivery guarantees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Redis Sentinel and Redis Cluster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis Sentinel provides high availability for a single Redis instance: it monitors the primary, automatically promotes a replica if the primary fails, and provides service discovery. It does NOT provide horizontal scaling. Redis Cluster provides both high availability AND horizontal scaling by sharding data across multiple nodes using 16384 hash slots. Use Sentinel when your dataset fits in one machine but you need HA. Use Cluster when your dataset exceeds one node memory or you need to distribute load.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I implement rate limiting with Redis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The sliding window algorithm uses a Sorted Set where members are request timestamps and scores are the same timestamps. For each request: ZADD adds the current timestamp, ZREMRANGEBYSCORE removes entries older than the window (e.g., 60 seconds ago), ZCARD counts remaining entries. If the count exceeds the limit, reject the request. Use a Lua script to make this atomic. For high-traffic use, consider redis-cell which implements the token bucket algorithm natively.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between RDB and AOF persistence in Redis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RDB (Redis Database Backup) takes point-in-time snapshots at configurable intervals. It is compact and fast to restore but can lose data since the last snapshot on crash. AOF (Append Only File) logs every write operation; with fsync: everysec policy, it offers near-zero data loss. You can use both simultaneously for best durability. For a pure cache where losing data is acceptable, you can disable both persistence entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Redis compare to Memcached and DynamoDB?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Redis supports rich data structures (Lists, Sets, Sorted Sets, Hashes, Streams), persistence, Pub/Sub, and Lua scripting. Memcached is simpler: it only supports string key-value pairs, has no persistence, and is best for straightforward caching with multi-threading. DynamoDB is a fully managed NoSQL database with unlimited scale and strong consistency guarantees, but has much higher latency than Redis (single-digit milliseconds vs sub-millisecond). Choose Redis for feature-rich in-memory operations, Memcached for simple high-throughput caching, and DynamoDB for durable cloud-native storage at scale.',
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
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', fontSize: '1rem' }}>
          TL;DR
        </p>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          <strong>Redis</strong> is an in-memory data structure store used as a database, cache, message broker,
          and streaming engine. It supports 8 core data types — Strings, Lists, Sets, Sorted Sets, Hashes,
          Streams, HyperLogLog, and Bitmaps — with sub-millisecond latency. For Node.js use{' '}
          <strong>ioredis</strong>; for Python use <strong>redis-py</strong>. Choose{' '}
          <strong>Cache-Aside</strong> for most caching, <strong>Streams</strong> over Pub/Sub for durable
          messaging, and <strong>Lua scripts</strong> for atomic operations. In production, combine{' '}
          <strong>AOF + RDB</strong> persistence and use <strong>Sentinel</strong> or{' '}
          <strong>Cluster</strong> for high availability. Format your JSON payloads with our{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0284c7' }}>
            JSON Formatter
          </Link>{' '}
          before storing them in Redis.
        </p>
      </div>

      {/* ───────────────────────────────────────────
          SECTION 1 — What is Redis and Use Cases
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        What Is Redis and Why Use It?
      </h2>
      <p>
        <strong>Redis</strong> (Remote Dictionary Server) is an open-source, BSD-licensed, in-memory
        data structure store. Originally created by Salvatore Sanfilippo in 2009 and now maintained by
        Redis Ltd., it has become the most widely deployed in-memory database in the world — used by
        Twitter, GitHub, Slack, Stack Overflow, and millions of other applications.
      </p>
      <p>
        Unlike a traditional database where data is stored on disk and loaded into memory for queries,
        Redis stores everything in RAM by design. This produces sub-millisecond read and write latency —
        typically under 1ms — making it orders of magnitude faster than disk-based databases.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Core Use Cases
      </h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Caching</strong> — Cache expensive database query results, API responses, and rendered
          HTML fragments to reduce latency and database load. The most common Redis use case.
        </li>
        <li>
          <strong>Session storage</strong> — Store user sessions in Redis with automatic TTL expiration.
          Stateless horizontally-scaled servers can all share the same session store.
        </li>
        <li>
          <strong>Rate limiting</strong> — Implement per-IP, per-user, or per-API-key request limits
          using atomic Redis operations. Used by Stripe, Cloudflare, and virtually every major API.
        </li>
        <li>
          <strong>Leaderboards</strong> — Sorted Sets provide a native data structure for real-time
          ranking with O(log N) insert and O(log N + M) range queries.
        </li>
        <li>
          <strong>Pub/Sub messaging</strong> — Fan-out messages to multiple subscribers for real-time
          notifications, chat systems, and live dashboards.
        </li>
        <li>
          <strong>Job queues</strong> — Use Lists as FIFO queues with blocking pops for reliable
          background job processing without a dedicated queue broker.
        </li>
        <li>
          <strong>Distributed locks</strong> — Acquire and release locks across multiple servers using
          atomic SET NX operations, enabling safe concurrent access to shared resources.
        </li>
        <li>
          <strong>Real-time analytics</strong> — Count unique visitors with HyperLogLog, track daily
          active users with Bitmaps, and aggregate time-series data with Sorted Sets.
        </li>
      </ul>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Installing Redis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# macOS (Homebrew)
brew install redis
brew services start redis

# Ubuntu / Debian
sudo apt-get install redis-server
sudo systemctl enable redis-server

# Docker (recommended for development)
docker run -d --name redis -p 6379:6379 redis:7-alpine

# Docker with persistence
docker run -d --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:7-alpine redis-server --appendonly yes

# Verify connection
redis-cli ping   # PONG`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 2 — Data Structures
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Data Structures — Commands and Use Cases
      </h2>
      <p>
        Redis is not just a key-value store — it is a data structure server. Choosing the right data type
        for your problem dramatically improves performance and simplifies your code. Each data type is
        implemented with highly optimized internal encodings.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Strings
      </h3>
      <p>
        The most fundamental type. A String value can hold any binary-safe data up to 512 MB. Used for
        counters, session tokens, cached HTML fragments, and serialized JSON objects.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`SET user:1:name "Alice"
GET user:1:name               # "Alice"
MSET user:1:name "Alice" user:1:age "30"
MGET user:1:name user:1:age   # ["Alice", "30"]

# Counters (atomic, no race conditions)
INCR  page:home:views         # increment by 1
INCRBY score:user:1 10        # increment by 10
DECR  inventory:item:42       # decrement by 1
DECRBY inventory:item:42 5    # decrement by 5

# Expiry variants
SETEX session:abc123 3600 "{...}"  # set with 3600s TTL
SET   session:abc123 "{...}" EX 3600 NX  # set if not exists, expire 3600s
SETNX lock:resource 1         # set only if not exists (distributed lock)

# Append and length
APPEND log:today "event1\n"   # append to string
STRLEN user:1:name            # 5`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Lists
      </h3>
      <p>
        A linked list of strings. O(1) push/pop from both ends makes it ideal for queues, stacks, and
        recent activity feeds. <code>LPUSH</code>/<code>RPOP</code> = queue (FIFO);{' '}
        <code>LPUSH</code>/<code>LPOP</code> = stack (LIFO).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`RPUSH jobs:queue "job1" "job2" "job3"   # enqueue (right push)
LPOP  jobs:queue                          # dequeue (left pop, FIFO)
RPOP  jobs:queue                          # pop from right end (LIFO)
BLPOP jobs:queue 30                       # blocking pop — waits up to 30s

# Activity feeds
LPUSH feed:user:1 "Post by Alice"   # prepend (newest first)
LRANGE feed:user:1 0 9              # read first 10 (most recent)
LTRIM  feed:user:1 0 99             # keep only last 100 items
LLEN   feed:user:1                  # list length

# Random access and update
LINDEX feed:user:1 0       # get first item
LSET   feed:user:1 0 "..."  # update first item
LINSERT feed:user:1 BEFORE "job2" "job1.5"  # insert before element`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sets
      </h3>
      <p>
        An unordered collection of unique strings. Great for membership checks, deduplication, and set
        operations (union, intersection, difference). All operations are O(1) or O(N).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`SADD  tags:post:1 "redis" "cache" "database"
SADD  tags:post:2 "cache" "nosql" "performance"
SISMEMBER tags:post:1 "redis"     # 1 (true)
SMEMBERS  tags:post:1             # {"redis", "cache", "database"}
SCARD     tags:post:1             # 3 (cardinality)
SREM      tags:post:1 "database"  # remove member

# Set operations
SINTER tags:post:1 tags:post:2    # intersection: {"cache"}
SUNION tags:post:1 tags:post:2    # union: all unique tags
SDIFF  tags:post:1 tags:post:2    # difference: {"redis"} (in 1, not 2)

# Store result in new key
SINTERSTORE result:tags tags:post:1 tags:post:2
SUNIONSTORE all:tags    tags:post:1 tags:post:2

# Unique user tracking (who liked a post)
SADD post:456:likes "user:1" "user:2" "user:3"
SISMEMBER post:456:likes "user:1"   # has user 1 liked it?`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sorted Sets
      </h3>
      <p>
        Like a Set but each member has a floating-point <strong>score</strong>. Members are always
        ordered by score. The perfect data structure for leaderboards, priority queues, and range queries.
        Insert and score-update are O(log N).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`ZADD leaderboard 1500 "alice" 2300 "bob" 900 "charlie" 3100 "dave"

# Range queries
ZRANGE    leaderboard 0 -1 WITHSCORES      # ascending by score
ZREVRANGE leaderboard 0 2  WITHSCORES      # top 3 (descending)
ZRANGEBYSCORE leaderboard 1000 2000        # score between 1000-2000
ZREVRANGEBYSCORE leaderboard 2000 1000     # same, descending

# Rank operations (0-indexed)
ZRANK    leaderboard "alice"   # rank ascending  (0 = lowest)
ZREVRANK leaderboard "alice"   # rank descending (0 = highest)
ZSCORE   leaderboard "alice"   # get current score

# Updates
ZINCRBY leaderboard 100 "alice"    # +100 points atomically
ZADD    leaderboard GT 1600 "alice" # update only if new score > current

# Count and remove
ZCOUNT  leaderboard 1000 2000      # members with score in range
ZCARD   leaderboard                # total members
ZREM    leaderboard "charlie"      # remove a member
ZPOPMAX leaderboard                # remove and return highest scorer`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Hashes
      </h3>
      <p>
        A map of field-value pairs, ideal for storing objects. More memory-efficient than storing a JSON
        string when you need to update individual fields without deserializing and reserializing the
        entire object.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`HSET user:1 name "Alice" email "alice@example.com" age 30 role "admin"
HGET    user:1 name              # "Alice"
HMGET   user:1 name email        # ["Alice", "alice@example.com"]
HGETALL user:1                   # all field-value pairs as flat array
HKEYS   user:1                   # ["name", "email", "age", "role"]
HVALS   user:1                   # ["Alice", "alice@example.com", "30", "admin"]
HLEN    user:1                   # 4 (number of fields)

# Atomic field updates
HINCRBY  user:1 age 1            # increment age atomically
HINCRBYFLOAT user:1 score 1.5   # increment float field

# Field management
HDEL    user:1 email             # delete a field
HEXISTS user:1 name              # 1 (true)
HSETNX  user:1 created_at "..."  # set only if field doesn't exist

# Partial reads for performance
HMGET user:1 name role           # fetch only what you need`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Streams
      </h3>
      <p>
        Redis Streams are append-only logs where each entry has a unique auto-generated ID
        (<code>milliseconds-sequence</code>). Unlike Pub/Sub, messages persist until explicitly deleted.
        Used for event sourcing, activity logs, and durable message queues.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# XADD — append event (auto-generates ID: timestamp-sequence)
XADD events:orders * action "placed" orderId "ord-123" userId "u-1"
# Returns: "1705000000000-0"

# Limit stream length (trim to most recent 1000 entries)
XADD events:orders MAXLEN ~ 1000 * action "placed" orderId "ord-124"

# XREAD — read entries
XREAD COUNT 10 STREAMS events:orders 0-0     # from beginning
XREAD COUNT 10 BLOCK 5000 STREAMS events:orders $  # block, only new

# XRANGE — range query by ID
XRANGE events:orders - +           # all messages
XRANGE events:orders - + COUNT 10  # first 10
XLEN events:orders                 # total entries

# Consumer Groups for distributed processing
XGROUP CREATE events:orders order-processors $ MKSTREAM
XREADGROUP GROUP order-processors worker-1 COUNT 5 BLOCK 2000 STREAMS events:orders >
XACK events:orders order-processors "1705000000000-0"  # acknowledge

# Check pending (unacknowledged) messages
XPENDING events:orders order-processors - + 10`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        HyperLogLog and Bitmaps
      </h3>
      <p>
        <strong>HyperLogLog</strong> estimates cardinality (unique count) of large sets using only 12 KB
        of memory regardless of set size, with a ~0.81% standard error. Perfect for unique visitor
        counting. <strong>Bitmaps</strong> are string-backed bit arrays for space-efficient boolean flags.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# HyperLogLog — unique visitor counting
PFADD  page:home:visitors "user1" "user2" "user3"
PFADD  page:home:visitors "user1"   # already exists — no change
PFCOUNT page:home:visitors           # approximate count: 3
PFMERGE all:visitors page:home:visitors page:about:visitors

# Bitmaps — daily active users (1 bit per user ID)
# userId 42 was active on 2026-02-01
SETBIT  dau:2026-02-01 42 1
GETBIT  dau:2026-02-01 42          # 1 (active)
BITCOUNT dau:2026-02-01            # total active users today

# Bit operations across days
BITOP AND result dau:2026-02-01 dau:2026-02-02  # active both days
BITOP OR  result dau:2026-02-01 dau:2026-02-02  # active either day`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 3 — Redis CLI Commands
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis CLI — Essential Commands and Key Management
      </h2>
      <p>
        The Redis CLI (<code>redis-cli</code>) is the primary tool for interacting with Redis, debugging
        issues, and running administrative commands. It connects to Redis over TCP and supports
        interactive and batch modes.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Connect
redis-cli                              # connect to localhost:6379
redis-cli -h 192.168.1.10 -p 6379     # custom host/port
redis-cli -a "password"               # authenticate
redis-cli -u redis://user:pass@host:6379  # URL format
redis-cli --tls -h redis.example.com  # TLS connection

# Key management
KEYS "user:*"            # DANGER: scans all keys (avoid in production)
SCAN 0 MATCH "user:*" COUNT 100  # safe incremental scan
TYPE  mykey              # string / list / set / zset / hash / stream
TTL   mykey              # seconds until expiry (-1 = no TTL, -2 = gone)
PTTL  mykey              # milliseconds until expiry
PERSIST mykey            # remove TTL (make key permanent)
RENAME oldkey newkey     # rename a key
EXISTS key1 key2         # count how many of these keys exist

# Server info
INFO server              # server version, mode, memory
INFO replication         # replica status, role, lag
INFO stats               # command stats, hit/miss rates
INFO keyspace            # keys per database with TTL counts
DBSIZE                   # total number of keys in current DB

# Flush (DANGEROUS — irreversible)
FLUSHDB   # delete all keys in current database
FLUSHALL  # delete all keys in ALL databases

# Select database (0-15)
SELECT 1   # switch to database 1 (default is 0)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Key Naming Conventions
      </h3>
      <p>
        Redis keys are arbitrary binary strings up to 512 MB. Follow these conventions to keep your
        keyspace organized and avoid collisions:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Recommended: colon-separated namespacing
# object-type : identifier : field (optional)
user:1001:profile          # hash for user profile
user:1001:sessions         # set of active session IDs
post:456:comments          # sorted set by timestamp
cache:api:products:all     # cached API response
lock:payment:order-789     # distributed lock
ratelimit:ip:203.0.113.5   # rate limit counter
job:queue:email            # email job queue (list)
stream:events:orders       # event stream

# Use short, consistent prefixes for memory efficiency
# Long keys waste memory — "u:1001" vs "user:1001"
# Use OBJECT ENCODING to verify internal structure
OBJECT ENCODING user:1001:profile   # "listpack" (small) or "hashtable"`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 4 — Node.js ioredis
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Node.js Redis Client — ioredis Setup and Core Operations
      </h2>
      <p>
        <strong>ioredis</strong> is the recommended Redis client for Node.js. It supports Redis Cluster,
        Sentinel, pipelining, Lua scripting, and full async/await syntax. The official <code>redis</code>{' '}
        npm package (node-redis v4+) is also widely used and is the default for{' '}
        <code>connect-redis</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install ioredis
# or
npm install redis`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Connection and Configuration
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import Redis from 'ioredis';

// Standard connection
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: 0,                          // database index (0-15)
  maxRetriesPerRequest: 3,        // per-request retry limit
  enableReadyCheck: true,         // wait for LOADING state to clear
  lazyConnect: false,             // connect on construction
  retryStrategy: (times) => {
    if (times > 10) return null;  // give up after 10 retries
    return Math.min(times * 100, 3000); // exponential backoff up to 3s
  },
});

// Connection events
redis.on('connect',    () => console.log('Redis: connected'));
redis.on('ready',      () => console.log('Redis: ready'));
redis.on('error',      (err) => console.error('Redis error:', err));
redis.on('close',      () => console.warn('Redis: connection closed'));
redis.on('reconnecting', (ms: number) => console.log('Redis: reconnecting in ' + ms + 'ms'));

// TLS connection (Redis Cloud, ElastiCache with TLS)
const redisTls = new Redis({
  host: 'my-redis.cache.amazonaws.com',
  port: 6380,
  password: process.env.REDIS_PASSWORD,
  tls: {},
  enableTLSForSentinelMode: false,
});

// URL format (convenient for environment variables)
const redisUrl = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Core Operations with ioredis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// String operations
await redis.set('user:1', JSON.stringify({ name: 'Alice', age: 30 }));
const raw = await redis.get('user:1');
const user = raw ? JSON.parse(raw) : null;

// Set with expiry
await redis.set('session:abc', 'data', 'EX', 3600);  // seconds
await redis.set('otp:5551234', '6839', 'PX', 300000); // milliseconds

// TTL management
const ttl = await redis.ttl('session:abc');  // seconds remaining
await redis.expire('mykey', 600);            // reset/set TTL
await redis.persist('mykey');                // remove TTL

// Check and delete
const exists = await redis.exists('mykey');  // 1 = exists, 0 = not
await redis.del('key1', 'key2', 'key3');     // delete multiple keys

// Hash operations
await redis.hset('user:2', 'name', 'Bob', 'age', '25', 'role', 'user');
const name = await redis.hget('user:2', 'name');
const all  = await redis.hgetall('user:2'); // { name: 'Bob', ... }
await redis.hincrby('user:2', 'age', 1);   // atomic field increment

// Sorted set — leaderboard
await redis.zadd('scores', 100, 'alice', 200, 'bob', 150, 'charlie');
const top3 = await redis.zrevrange('scores', 0, 2, 'WITHSCORES');
await redis.zincrby('scores', 50, 'alice');

// List — job queue
await redis.rpush('jobs:email', JSON.stringify({ to: 'user@example.com' }));
const job = await redis.blpop('jobs:email', 5); // block up to 5s`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Pipelining for Batch Operations
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Pipeline — batch multiple commands in ONE network round trip
const pipeline = redis.pipeline();
pipeline.set('key1', 'val1');
pipeline.set('key2', 'val2');
pipeline.get('key1');
pipeline.hset('user:3', 'name', 'Carol');
pipeline.incr('counter');
const results = await pipeline.exec();
// results: [[null, 'OK'], [null, 'OK'], [null, 'val1'], [null, 0], [null, 1]]
// Each result is [error, value]

// Pipeline with error handling
const pipe = redis.pipeline();
pipe.set('k1', 'v1');
pipe.set('k2', 'v2');
const res = await pipe.exec();
if (res) {
  for (const [err, val] of res) {
    if (err) console.error('Command error:', err);
    else console.log('Result:', val);
  }
}`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 5 — Caching Strategies
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Caching Strategies — Cache-Aside, Write-Through, Write-Behind
      </h2>
      <p>
        The right caching pattern depends on your read/write ratio, consistency requirements, and
        tolerance for stale data. Choosing wrong leads to cache stampedes, stale reads, or unnecessary
        write latency.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Cache-Aside (Lazy Loading)
      </h3>
      <p>
        The most widely used pattern. The application manages the cache explicitly: check cache first,
        load from DB on miss, populate cache for future reads. Simple, pragmatic, and handles failures
        gracefully.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Cache-Aside in TypeScript with ioredis
async function getUser(id: string): Promise<User | null> {
  const cacheKey = 'user:' + id;

  // 1. Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as User;
  }

  // 2. Cache miss — load from database
  const user = await db.users.findById(id);
  if (!user) return null;

  // 3. Populate cache with TTL
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  return user;
}

// Cache invalidation on update
async function updateUser(id: string, data: Partial<User>): Promise<User> {
  const updated = await db.users.update(id, data);
  // Invalidate the cached version — next read will re-populate
  await redis.del('user:' + id);
  return updated;
}

// Cache invalidation on delete
async function deleteUser(id: string): Promise<void> {
  await db.users.delete(id);
  await redis.del('user:' + id);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Write-Through
      </h3>
      <p>
        Write to both the cache and database on every write. Cache is always populated so reads never
        miss. The downside is added write latency and potentially caching data that is never read.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`async function upsertProduct(id: string, data: Product): Promise<Product> {
  // Write to DB and cache simultaneously
  const [dbResult] = await Promise.all([
    db.products.upsert(id, data),
    redis.set('product:' + id, JSON.stringify(data), 'EX', 86400),
  ]);
  return dbResult;
}

// Reads always hit cache since it is always populated on writes
async function getProduct(id: string): Promise<Product | null> {
  const cached = await redis.get('product:' + id);
  if (cached) return JSON.parse(cached) as Product;
  // Fallback for cache warmup or cache flush scenarios
  return db.products.findById(id);
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Write-Behind (Write-Back)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Write to cache immediately, flush to DB asynchronously
// Best for high-write workloads; risk: data loss if Redis crashes before flush

async function recordPageView(pageId: string): Promise<void> {
  // Atomic increment in Redis (in-memory, instant)
  await redis.incr('views:' + pageId);
}

// Background job runs every 60 seconds to flush to database
async function flushViewsToDB(): Promise<void> {
  const keys = await redis.keys('views:*');
  if (keys.length === 0) return;

  const pipeline = redis.pipeline();
  for (const key of keys) {
    pipeline.getdel(key); // atomic get-and-delete (Redis 6.2+)
  }
  const results = await pipeline.exec();

  for (let i = 0; i < keys.length; i++) {
    const pageId = keys[i].replace('views:', '');
    const views   = parseInt((results?.[i]?.[1] as string) || '0');
    if (views > 0) {
      await db.pages.incrementViews(pageId, views);
    }
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        TTL Best Practices
      </h3>
      <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Data Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Recommended TTL</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Strategy</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['User profiles', '1–24 hours', 'Invalidate on profile update'],
              ['API responses', '1–60 minutes', 'Balance freshness vs. database load'],
              ['Auth sessions', '30 min – 24 hours', 'Match session timeout policy'],
              ['Rate limit counters', 'Equal to window size', 'Auto-reset when window expires'],
              ['Leaderboards', 'No TTL or 24 hours', 'Regenerate on schedule if needed'],
              ['OTP / verification codes', '5–15 minutes', 'Short window for security'],
              ['Product catalog', '1–12 hours', 'Invalidate on product update'],
              ['Distributed locks', '5–30 seconds', 'Must be short to prevent deadlocks'],
            ].map(([type, ttl, strategy], i) => (
              <tr key={type} style={{ background: i % 2 === 1 ? '#fafafa' : undefined }}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{type}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{ttl}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0' }}>{strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────────────────────────────────────────
          SECTION 6 — Session Management
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Session Management with Redis
      </h2>
      <p>
        Redis is the go-to session store for web applications. Sessions need to be shared across multiple
        server instances, expire automatically, and load quickly. Redis satisfies all three requirements.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Node.js — express-session with connect-redis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`npm install express-session connect-redis ioredis`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import express from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';

const app = express();
const redisClient = new Redis({ host: 'localhost', port: 6379 });

app.use(session({
  store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
  secret: process.env.SESSION_SECRET!,
  resave: false,              // don't save if unmodified
  saveUninitialized: false,   // don't create until something stored
  rolling: true,              // reset TTL on each request (sliding window)
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
    httpOnly: true,           // prevent JavaScript access (XSS defense)
    sameSite: 'lax',          // CSRF protection
    maxAge: 1000 * 60 * 60 * 24,  // 24 hours
  },
}));

// Login — prevent session fixation by regenerating session ID
app.post('/login', async (req, res) => {
  const user = await authenticateUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  req.session.regenerate((err) => {  // new session ID, old data wiped
    if (err) return res.status(500).json({ error: 'Session error' });
    req.session.userId   = user.id;
    req.session.userRole = user.role;
    req.session.save(() => res.json({ ok: true, userId: user.id }));
  });
});

// Logout — destroy session completely
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

// Auth middleware
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

declare module 'express-session' {
  interface SessionData {
    userId: string;
    userRole: string;
  }
}`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Python — Flask Session with Redis
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install flask flask-session redis`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`from flask import Flask, session, request, jsonify
from flask_session import Session
import redis

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.StrictRedis(host='localhost', port=6379)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True  # sign session cookie
app.config['SESSION_KEY_PREFIX'] = 'sess:'

Session(app)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = authenticate(data['email'], data['password'])
    if not user:
        return jsonify({'error': 'Invalid credentials'}), 401

    session.clear()       # prevent session fixation
    session['user_id'] = user['id']
    session['role']    = user['role']
    return jsonify({'ok': True})

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'ok': True})`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 7 — Pub/Sub and Message Queues
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Pub/Sub and Message Queues — Real-Time Notifications
      </h2>
      <p>
        Redis Pub/Sub enables message broadcasting to multiple subscribers in real time. A subscribed
        client receives all messages published to its channels while connected. For durable messaging
        where messages must survive subscriber restarts, use Redis Streams instead.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import Redis from 'ioredis';

// IMPORTANT: subscriber must use a DEDICATED connection
// (a subscribed client cannot run other commands)
const publisher  = new Redis({ host: 'localhost', port: 6379 });
const subscriber = new Redis({ host: 'localhost', port: 6379 });

// Subscribe to channels
await subscriber.subscribe('chat:room:1', 'notifications:global');

// Handle incoming messages
subscriber.on('message', (channel: string, message: string) => {
  const data = JSON.parse(message);
  console.log('[' + channel + '] ' + data.user + ': ' + data.text);
});

// Pattern subscription — subscribe to all channels matching glob
await subscriber.psubscribe('chat:room:*', 'events:*');
subscriber.on('pmessage', (pattern: string, channel: string, message: string) => {
  console.log('Pattern ' + pattern + ' matched channel ' + channel);
  // Route to appropriate handler
  if (channel.startsWith('chat:')) handleChatMessage(channel, message);
  if (channel.startsWith('events:')) handleEvent(channel, message);
});

// Publish a message
await publisher.publish('chat:room:1', JSON.stringify({
  user: 'Alice',
  text: 'Hello everyone!',
  timestamp: Date.now(),
}));

// Broadcast notification to all users
await publisher.publish('notifications:global', JSON.stringify({
  type: 'announcement',
  title: 'System maintenance in 30 minutes',
}));

// Unsubscribe
await subscriber.unsubscribe('chat:room:1');`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Socket.IO + Redis Pub/Sub for Horizontally Scaled Chat
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { Server } from 'socket.io';
import Redis from 'ioredis';
import http from 'http';

const httpServer = http.createServer(app);
const io  = new Server(httpServer, { cors: { origin: '*' } });
const pub = new Redis();
const sub = new Redis();

// Subscribe once — Redis fan-out reaches all Socket.IO server instances
sub.psubscribe('chat:room:*');
sub.on('pmessage', (_pattern: string, channel: string, message: string) => {
  const roomId = channel.split(':')[2];
  io.to('room:' + roomId).emit('message', JSON.parse(message));
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId: string) => {
    socket.join('room:' + roomId);
    socket.emit('joined', { roomId });
  });

  socket.on('send-message', ({ roomId, text }: { roomId: string; text: string }) => {
    const payload = { userId: socket.id, text, ts: Date.now() };
    // Publish to Redis — ALL server instances receive it via Pub/Sub
    pub.publish('chat:room:' + roomId, JSON.stringify(payload));
  });

  socket.on('leave-room', (roomId: string) => {
    socket.leave('room:' + roomId);
  });
});`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 8 — Redis Cluster and Sentinel
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis Cluster and Sentinel — High Availability and Sharding
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Redis Sentinel — Automatic Failover
      </h3>
      <p>
        Sentinel monitors a primary Redis instance and its replicas. When the primary is unreachable,
        Sentinel coordinates an automatic promotion of a replica to become the new primary. Clients
        discover the current primary via Sentinel, so failover is transparent.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# sentinel.conf — deploy 3+ Sentinels for quorum
sentinel monitor mymaster 127.0.0.1 6379 2  # 2 sentinels must agree
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
sentinel parallel-syncs mymaster 1

# replica replication setup (redis.conf on replica nodes)
replicaof 127.0.0.1 6379   # point to primary
replica-read-only yes        # replicas are read-only by default

# ioredis with Sentinel
const redis = new Redis({
  sentinels: [
    { host: 'sentinel-1.internal', port: 26379 },
    { host: 'sentinel-2.internal', port: 26379 },
    { host: 'sentinel-3.internal', port: 26379 },
  ],
  name: 'mymaster',          // must match sentinel monitor name
  password: process.env.REDIS_PASSWORD,
  sentinelPassword: process.env.SENTINEL_PASSWORD,
  role: 'master',            // always write to primary
  // role: 'slave'           // read from a replica (read scaling)
});`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Redis Cluster — Horizontal Sharding
      </h3>
      <p>
        Redis Cluster partitions data across multiple nodes using 16,384 hash slots. Each key maps to
        one slot, and each node owns a subset of slots. The minimum recommended setup is 3 primaries
        with 3 replicas (6 nodes total).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# redis.conf for cluster nodes
cluster-enabled yes
cluster-config-file nodes-7000.conf
cluster-node-timeout 5000
appendonly yes

# Create cluster (Redis 7+)
redis-cli --cluster create \
  127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
  127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
  --cluster-replicas 1

# Check cluster health
redis-cli -p 7000 CLUSTER INFO
redis-cli -p 7000 CLUSTER NODES

# Key hashing — keys are assigned slots by CRC16(key) % 16384
# Hash tags {} force multiple keys to the same slot
MSET {user:1}.profile "..." {user:1}.settings "..."  # same slot
MGET {user:1}.profile {user:1}.settings              # guaranteed same node`}</code></pre>

      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import { Cluster } from 'ioredis';

const cluster = new Cluster([
  { host: '127.0.0.1', port: 7000 },
  { host: '127.0.0.1', port: 7001 },
  { host: '127.0.0.1', port: 7002 },
], {
  redisOptions: {
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: 3,
  },
  clusterRetryStrategy: (times: number) => Math.min(times * 100, 3000),
  enableReadyCheck: true,
  scaleReads: 'slave',  // distribute reads to replicas
});

// ioredis handles slot routing automatically
await cluster.set('{user:1}:name', 'Alice');
await cluster.set('{user:1}:email', 'alice@example.com');
const [name, email] = await cluster.mget('{user:1}:name', '{user:1}:email');`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 9 — Rate Limiting
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Rate Limiting with Redis — Sliding Window Algorithm
      </h2>
      <p>
        Redis is the ideal backend for distributed rate limiting. Its atomic operations ensure no race
        conditions across multiple server instances, and sub-millisecond latency keeps overhead minimal.
      </p>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Sliding Window with Sorted Set
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Sliding window rate limiter using Sorted Set
// Each member = unique request ID, score = timestamp

async function slidingWindowRateLimit(
  identifier: string,   // e.g., IP address or "user:1001"
  limit: number,        // max requests allowed
  windowSeconds: number // window duration in seconds
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key       = 'ratelimit:' + identifier;
  const now       = Date.now();
  const windowMs  = windowSeconds * 1000;
  const windowStart = now - windowMs;

  const pipeline = redis.pipeline();
  // 1. Remove timestamps older than window
  pipeline.zremrangebyscore(key, '-inf', windowStart);
  // 2. Add current request timestamp as member+score
  pipeline.zadd(key, now, now + '-' + Math.random().toString(36).slice(2));
  // 3. Count all requests in window
  pipeline.zcard(key);
  // 4. Set key to expire after window (auto-cleanup)
  pipeline.expire(key, windowSeconds + 1);

  const results = await pipeline.exec();
  const count   = results?.[2]?.[1] as number;
  const allowed = count <= limit;
  const resetAt = now + windowMs;

  return {
    allowed,
    remaining: Math.max(0, limit - count),
    resetAt,
  };
}

// Express middleware
import { Request, Response, NextFunction } from 'express';

export function rateLimitMiddleware(limit: number, windowSeconds: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const identifier = req.ip || 'unknown';
    const result = await slidingWindowRateLimit(identifier, limit, windowSeconds);

    // Set standard rate limit headers
    res.set('X-RateLimit-Limit',     String(limit));
    res.set('X-RateLimit-Remaining', String(result.remaining));
    res.set('X-RateLimit-Reset',     String(Math.ceil(result.resetAt / 1000)));

    if (!result.allowed) {
      res.set('Retry-After', String(windowSeconds));
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: windowSeconds,
      });
    }

    next();
  };
}

// Usage: 100 requests per minute per IP
app.use('/api/', rateLimitMiddleware(100, 60));`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Atomic Rate Limiter with Lua Script
      </h3>
      <p>
        The pipeline approach above has a tiny non-atomic window between the ZCARD and ZADD. For
        high-traffic endpoints, use a Lua script to make the entire operation atomic:
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Lua script for fully atomic sliding window rate limiting
const RATE_LIMIT_SCRIPT = [
  'local key = KEYS[1]',
  'local limit = tonumber(ARGV[1])',
  'local window = tonumber(ARGV[2])',
  'local now = tonumber(ARGV[3])',
  'local windowStart = now - window * 1000',
  '',
  'redis.call("ZREMRANGEBYSCORE", key, "-inf", windowStart)',
  'local count = redis.call("ZCARD", key)',
  '',
  'if count >= limit then',
  '  return {0, 0}',
  'end',
  '',
  'local member = now .. "-" .. math.random()',
  'redis.call("ZADD", key, now, member)',
  'redis.call("EXPIRE", key, window + 1)',
  'return {1, limit - count - 1}',
].join('\n');

// Load script once at startup for best performance
let rateLimitSha: string;
async function initRateLimiter() {
  rateLimitSha = await redis.script('LOAD', RATE_LIMIT_SCRIPT) as string;
}

async function atomicRateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number }> {
  const [allowed, remaining] = await redis.evalsha(
    rateLimitSha,
    1,
    'ratelimit:' + identifier,  // KEYS[1]
    String(limit),              // ARGV[1]
    String(windowSeconds),      // ARGV[2]
    String(Date.now())          // ARGV[3]
  ) as [number, number];

  return { allowed: allowed === 1, remaining };
}`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 10 — Python redis-py
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Python redis-py — Installation and Core Usage
      </h2>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`pip install redis`}</code></pre>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`import redis
import json
from datetime import timedelta

# Basic connection
r = redis.StrictRedis(
    host=os.environ.get('REDIS_HOST', 'localhost'),
    port=int(os.environ.get('REDIS_PORT', 6379)),
    password=os.environ.get('REDIS_PASSWORD'),
    db=0,
    decode_responses=True,   # auto-decode bytes -> str
    socket_connect_timeout=5,
    socket_timeout=5,
    retry_on_timeout=True,
)

# Verify connection
r.ping()  # raises ConnectionError if unreachable

# String operations
r.set('user:1', json.dumps({'name': 'Alice', 'age': 30}))
raw  = r.get('user:1')         # returns str (because decode_responses=True)
user = json.loads(raw) if raw else None

# With expiry
r.setex('session:abc', timedelta(hours=1), 'session_data')
r.set('otp:5551234', '839271', ex=300)  # 5 minutes
r.expire('mykey', 600)
ttl = r.ttl('mykey')           # seconds remaining

# Hash operations
r.hset('product:1', mapping={'name': 'Widget', 'price': '9.99', 'stock': '100'})
price   = r.hget('product:1', 'price')         # '9.99'
product = r.hgetall('product:1')               # dict
r.hincrby('product:1', 'stock', -1)            # atomic decrement

# Sorted set — leaderboard
r.zadd('leaderboard', {'alice': 1500, 'bob': 2300, 'charlie': 900})
top3 = r.zrevrange('leaderboard', 0, 2, withscores=True)
# [('bob', 2300.0), ('alice', 1500.0), ('charlie', 900.0)]
r.zincrby('leaderboard', 100, 'alice')

# Pipeline — batch operations
pipe = r.pipeline(transaction=False)  # non-transactional for performance
pipe.set('k1', 'v1')
pipe.set('k2', 'v2')
pipe.incr('counter')
results = pipe.execute()   # [True, True, 1]`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Connection Pool and Async (redis.asyncio)
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Shared connection pool (thread-safe)
import redis

pool = redis.ConnectionPool(
    host='localhost',
    port=6379,
    db=0,
    max_connections=20,
    decode_responses=True,
)
r = redis.StrictRedis(connection_pool=pool)

# ============================================================
# Async usage with FastAPI
# ============================================================
import redis.asyncio as aioredis
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends

redis_client: aioredis.Redis | None = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global redis_client
    redis_client = await aioredis.from_url(
        'redis://localhost:6379',
        encoding='utf-8',
        decode_responses=True,
        max_connections=20,
    )
    yield
    await redis_client.aclose()

app = FastAPI(lifespan=lifespan)

async def get_redis() -> aioredis.Redis:
    return redis_client  # type: ignore

@app.get('/user/{user_id}')
async def get_user(user_id: str, redis: aioredis.Redis = Depends(get_redis)):
    cached = await redis.get('user:' + user_id)
    if cached:
        return json.loads(cached)
    user = await fetch_user_from_db(user_id)
    await redis.set('user:' + user_id, json.dumps(user), ex=3600)
    return user`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 11 — Comparison Table
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Redis vs Memcached vs DynamoDB — Comparison
      </h2>
      <p>
        Choosing the right in-memory or NoSQL store depends on your data model, consistency
        requirements, and operational constraints. Here is how the three most popular options compare:
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#1e293b', color: '#f8fafc' }}>
              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '2px solid #334155', minWidth: 160 }}>Feature</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '2px solid #334155', minWidth: 160 }}>Redis</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '2px solid #334155', minWidth: 160 }}>Memcached</th>
              <th style={{ padding: '12px 14px', textAlign: 'left', borderBottom: '2px solid #334155', minWidth: 160 }}>DynamoDB</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Data model', 'Rich data structures (String, List, Set, ZSet, Hash, Stream)', 'String key-value only', 'Tables with partition + sort key; flexible attributes'],
              ['Persistence', 'RDB snapshots + AOF write log', 'None — memory only', 'Fully durable (SSD-backed, 3x replication)'],
              ['Latency', 'Sub-millisecond (<1 ms)', 'Sub-millisecond (<1 ms)', 'Single-digit ms (1–10 ms typical)'],
              ['Throughput', 'Millions of ops/sec (single node)', 'Millions of ops/sec (multi-thread)', 'Unlimited (auto-scaled, pay per use)'],
              ['Scalability', 'Vertical + Cluster (manual sharding)', 'Horizontal (consistent hashing)', 'Fully managed, unlimited horizontal scale'],
              ['Replication', 'Primary-replica, Sentinel, Cluster', 'None built-in', 'Multi-AZ, Global Tables (multi-region)'],
              ['Transactions', 'MULTI/EXEC, WATCH, Lua scripts', 'None', 'ACID transactions on multiple items (up to 25)'],
              ['Pub/Sub', 'Built-in Pub/Sub + Streams', 'None', 'Via DynamoDB Streams + Lambda'],
              ['TTL support', 'Per-key EXPIRE / EXPIREAT', 'Per-item expiry on SET', 'Per-item TTL attribute'],
              ['Max value size', '512 MB per string', '1 MB per item', '400 KB per item'],
              ['Query flexibility', 'Key-based + range (ZSet/Stream)', 'Key-based only', 'Key + indexes (GSI/LSI), no full-table scan'],
              ['Security', 'ACLs, TLS, auth (Redis 6+)', 'SASL auth, no ACLs', 'IAM, VPC, encryption at rest/transit'],
              ['Managed service', 'Redis Cloud, AWS ElastiCache, GCP Memorystore', 'AWS ElastiCache for Memcached', 'AWS DynamoDB (fully managed)'],
              ['Cost model', 'Instance-based (pay for RAM)', 'Instance-based', 'Pay per read/write unit + storage'],
              ['Best for', 'Caching, sessions, leaderboards, Pub/Sub, rate limiting, job queues', 'Simple high-throughput object caching (multi-threaded workloads)', 'Durable, scalable NoSQL at any scale; serverless apps; event-driven'],
            ].map(([feature, redis, memcached, dynamo], i) => (
              <tr key={feature} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff', verticalAlign: 'top' }}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', fontWeight: 600, color: '#1e293b' }}>{feature}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0', color: '#166534', background: i % 2 === 0 ? '#f0fdf4' : '#f9fefb' }}>{redis}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>{memcached}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}>{dynamo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        When to Choose Each
      </h3>
      <ul style={{ lineHeight: 1.9 }}>
        <li>
          <strong>Choose Redis</strong> when you need rich data structures, persistence options,
          Pub/Sub messaging, Lua scripting, or Cluster sharding. Redis is the right default for
          caching, sessions, leaderboards, rate limiting, and job queues.
        </li>
        <li>
          <strong>Choose Memcached</strong> when you need a simple, high-throughput object cache and
          can leverage its multi-threading for CPU-heavy workloads. It has a smaller feature set but
          can outperform Redis in specific pure-caching benchmarks with multiple CPU cores.
        </li>
        <li>
          <strong>Choose DynamoDB</strong> when you need a fully managed, infinitely scalable NoSQL
          database with strong durability guarantees. It is the right choice for serverless
          applications, tables with unpredictable traffic, and when you want zero operational overhead.
          Add <strong>DAX</strong> (DynamoDB Accelerator) in front of DynamoDB to get microsecond
          latency for hot reads.
        </li>
      </ul>

      {/* ───────────────────────────────────────────
          SECTION 12 — Production Configuration
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Production Redis — Persistence, Memory, and Security
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Persistence — RDB and AOF
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# redis.conf — recommended production persistence

# RDB snapshots (point-in-time backups)
save 3600 1       # save if 1+ key changed in last 1 hour
save 300 100      # save if 100+ keys changed in 5 minutes
save 60 10000     # save if 10000+ keys changed in 1 minute
dbfilename dump.rdb
dir /var/lib/redis
rdbcompression yes
rdbchecksum yes

# AOF — append only file (near-zero data loss)
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec        # flush every second (best balance)
# appendfsync always        # safest: flush per write (slower)
# appendfsync no            # OS decides when to flush

# AOF rewrite to keep file size manageable
auto-aof-rewrite-percentage 100   # rewrite when AOF doubles in size
auto-aof-rewrite-min-size 64mb    # but only if file is >= 64 MB

# Use BOTH for maximum durability:
# - RDB for fast restart (smaller file, loads faster)
# - AOF for minimal data loss (last second of writes)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Memory Management
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Memory limit and eviction policy
maxmemory 2gb
maxmemory-policy allkeys-lru     # evict LRU keys when memory full

# Eviction policy options:
# noeviction       — return error when memory full (default; not for cache)
# allkeys-lru      — evict least recently used across ALL keys
# volatile-lru     — evict LRU from keys WITH TTL only
# allkeys-lfu      — evict least frequently used (Redis 4.0+, better for hot keys)
# volatile-lfu     — evict LFU from keys with TTL only
# allkeys-random   — evict random keys
# volatile-random  — evict random keys with TTL
# volatile-ttl     — evict keys with shortest TTL first

# Check memory usage
redis-cli INFO memory | grep used_memory_human
redis-cli MEMORY USAGE user:1001   # bytes used by a specific key
redis-cli MEMORY DOCTOR            # advice on memory configuration
redis-cli --bigkeys                # scan for largest keys (slow on big datasets)`}</code></pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>
        Security Hardening
      </h3>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# redis.conf — security

# 1. Bind to localhost or private network interface ONLY
bind 127.0.0.1 ::1
protected-mode yes

# 2. Require password (Redis < 6) or use ACLs (Redis 6+)
requirepass your-strong-password-here

# 3. Disable dangerous commands by renaming them to empty string
rename-command FLUSHALL   ""
rename-command FLUSHDB    ""
rename-command CONFIG     "CONFIG-a84b2c9d"  # rename to secret name
rename-command DEBUG      ""
rename-command SHUTDOWN   ""
rename-command SLAVEOF    ""

# 4. Enable TLS (Redis 6+)
tls-port 6380
tls-cert-file /etc/redis/redis.crt
tls-key-file  /etc/redis/redis.key
tls-ca-cert-file /etc/redis/ca.crt

# 5. ACLs — fine-grained per-user permissions (Redis 6+)
# In redis.conf
aclfile /etc/redis/users.acl

# users.acl file format:
# user default off nopass nocommands nokeys
# user app-user on >StrongP@ss ~cache:* ~sess:* +GET +SET +DEL +EXPIRE +TTL
# user readonly on >ReadOnlyP@ss ~* +@read

# At runtime:
# ACL SETUSER app-user on >StrongP@ss ~cache:* +GET +SET +DEL +EXPIRE
# ACL LIST
# ACL GETUSER app-user`}</code></pre>

      {/* Quick Tool CTA */}
      <div
        style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '8px',
          padding: '1rem 1.25rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Quick Tool:</strong> Before storing complex JSON objects in Redis, validate and minify
          them with our{' '}
          <Link href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#2563eb', fontWeight: 600 }}>
            JSON Formatter
          </Link>
          {' '}— instantly prettify, validate, and minify JSON payloads online for free.
        </p>
      </div>

      {/* ───────────────────────────────────────────
          SECTION 13 — Distributed Lock
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Distributed Locking — Redlock Pattern
      </h2>
      <p>
        Redis is widely used to implement distributed locks, ensuring that only one process executes
        a critical section at a time across multiple servers. The key insight is that{' '}
        <code>SET key value NX PX ttl</code> is atomic — it only sets the key if it does not already
        exist.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem' }}><code>{`const LOCK_TTL_MS = 5000; // 5 seconds — must be longer than critical section

async function acquireLock(resource: string, token: string): Promise<boolean> {
  // Atomic: set only if NOT exists, expire after TTL
  const result = await redis.set(
    'lock:' + resource,
    token,
    'NX',  // only set if key does not exist
    'PX',  // expiry in milliseconds
    LOCK_TTL_MS
  );
  return result === 'OK';
}

// Release lock ONLY if we own it (Lua ensures atomic check-and-delete)
const RELEASE_SCRIPT = [
  'if redis.call("GET", KEYS[1]) == ARGV[1] then',
  '  return redis.call("DEL", KEYS[1])',
  'else',
  '  return 0',
  'end',
].join('\n');

async function releaseLock(resource: string, token: string): Promise<boolean> {
  const result = await redis.eval(RELEASE_SCRIPT, 1, 'lock:' + resource, token);
  return result === 1;
}

// Higher-level helper: acquire, run, release
async function withLock<T>(
  resource: string,
  fn: () => Promise<T>,
  timeoutMs = 5000
): Promise<T> {
  const token = Date.now() + '-' + Math.random().toString(36).slice(2);
  const acquired = await acquireLock(resource, token);
  if (!acquired) throw new Error('Could not acquire lock for: ' + resource);

  try {
    return await fn();
  } finally {
    await releaseLock(resource, token);
  }
}

// Usage: ensure only one server processes this payment at a time
const result = await withLock('payment:order-789', async () => {
  const order = await db.orders.findById('order-789');
  if (order.status === 'paid') return order; // idempotent guard
  await chargeCard(order.paymentMethod, order.total);
  return db.orders.updateStatus('order-789', 'paid');
});`}</code></pre>

      {/* ───────────────────────────────────────────
          SECTION 14 — Quick Reference Table
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Quick Reference — Redis Patterns at a Glance
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Use Case</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Data Type</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Key Pattern</th>
              <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>Core Commands</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Cache object', 'String (JSON)', 'cache:user:{id}', 'SET EX / GET / DEL'],
              ['Session storage', 'Hash', 'sess:{token}', 'HSET / HGETALL / EXPIRE'],
              ['Leaderboard', 'Sorted Set', 'lb:game:{gameId}', 'ZADD / ZREVRANGE / ZINCRBY'],
              ['Job queue (FIFO)', 'List', 'queue:{name}', 'RPUSH / BLPOP'],
              ['Rate limiting', 'Sorted Set', 'rl:{ip}:{route}', 'ZADD / ZCARD / ZREMRANGEBYSCORE'],
              ['Unique visitors', 'HyperLogLog', 'uv:{date}:{page}', 'PFADD / PFCOUNT'],
              ['DAU bitmap', 'Bitmap', 'dau:{date}', 'SETBIT / BITCOUNT'],
              ['Pub/Sub channel', 'Pub/Sub', 'chat:room:{id}', 'PUBLISH / SUBSCRIBE'],
              ['Event log', 'Stream', 'events:{topic}', 'XADD / XREADGROUP / XACK'],
              ['Distributed lock', 'String', 'lock:{resource}', 'SET NX PX / Lua DEL'],
              ['Object fields', 'Hash', 'user:{id}', 'HSET / HGET / HINCRBY'],
              ['Tag membership', 'Set', 'tags:post:{id}', 'SADD / SISMEMBER / SINTER'],
              ['Counter', 'String', 'views:{page}', 'INCR / INCRBY'],
              ['Recent activity', 'List', 'feed:user:{id}', 'LPUSH / LRANGE / LTRIM'],
            ].map(([useCase, dataType, keyPattern, commands], i) => (
              <tr key={useCase} style={{ background: i % 2 === 1 ? '#fafafa' : undefined }}>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0' }}>{useCase}</td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0' }}><code style={{ fontSize: '0.8rem' }}>{dataType}</code></td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0' }}><code style={{ fontSize: '0.8rem' }}>{keyPattern}</code></td>
                <td style={{ padding: '9px 12px', borderBottom: '1px solid #e2e8f0' }}><code style={{ fontSize: '0.8rem' }}>{commands}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────────────────────────────────────────
          FAQ
      ─────────────────────────────────────────── */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is Redis and what is it used for?
      </h3>
      <p>
        Redis is an open-source in-memory data structure store. It is used as a database, cache,
        message broker, and streaming engine. Its sub-millisecond latency and rich data structures
        make it ideal for caching, session storage, leaderboards, rate limiting, Pub/Sub messaging,
        and job queues.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I connect to Redis from Node.js?
      </h3>
      <p>
        Use <code>ioredis</code> (recommended) or the official <code>redis</code> npm package (node-redis v4).
        With ioredis: <code>{'const redis = new Redis({ host: "localhost", port: 6379 })'}</code>.
        For production, pass a <code>retryStrategy</code> function for automatic reconnection with
        exponential backoff. Always use connection pooling and store credentials in environment variables.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between Cache-Aside and Write-Through?
      </h3>
      <p>
        Cache-Aside (lazy loading) checks the cache first; on miss it loads from the database and
        populates the cache. The cache only holds data that has been requested. Write-Through writes
        to both cache and database on every mutation, keeping them synchronized. Cache-Aside is more
        common because it only caches what is actually read, but Write-Through eliminates cache misses
        entirely for recently written data.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do Redis Pub/Sub and Streams differ?
      </h3>
      <p>
        Pub/Sub is fire-and-forget: messages are only delivered to currently connected subscribers
        and are not persisted. If a subscriber disconnects, it misses messages. Streams are persistent
        append-only logs with consumer groups, acknowledgment tracking, and the ability to replay from
        any position. Use Pub/Sub for ephemeral notifications; use Streams for durable, at-least-once
        event processing.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between Redis Sentinel and Redis Cluster?
      </h3>
      <p>
        Sentinel provides high availability for a single Redis instance: it monitors the primary,
        promotes a replica if the primary fails, and handles client service discovery. All data
        lives on one shard. Cluster provides both HA and horizontal sharding across multiple nodes
        using 16,384 hash slots. Use Sentinel when your data fits on one node; use Cluster when
        you need to distribute data across multiple nodes.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What maxmemory-policy should I use?
      </h3>
      <p>
        For a pure cache (losing data is acceptable), use <code>allkeys-lru</code> — it evicts the
        least recently used key across all keys. Use <code>allkeys-lfu</code> if you have hotspot
        keys that are accessed infrequently but should stay in cache. Use <code>volatile-lru</code>{' '}
        if you store both cached and permanent data in the same Redis instance. Never use{' '}
        <code>noeviction</code> for a cache — it will return errors instead of evicting.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How does Redis compare to Memcached?
      </h3>
      <p>
        Redis is a feature-rich in-memory store with 8 data types, persistence (RDB + AOF), Pub/Sub,
        Lua scripting, Cluster, Sentinel, and Transactions. Memcached is simpler: it stores string
        values only, has no persistence, and uses multi-threading to leverage multiple CPU cores —
        which can give it a throughput edge in pure caching workloads on multi-core machines. For
        most applications, Redis is the better default choice due to its versatility.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the RDB vs AOF persistence difference?
      </h3>
      <p>
        RDB takes periodic point-in-time snapshots. It is compact and restores quickly, but can lose
        up to the snapshot interval worth of data on crash. AOF logs every write operation; with{' '}
        <code>appendfsync everysec</code>, it loses at most one second of data. AOF files are larger
        and take longer to load on restart. For production, enable both: AOF for minimal data loss
        and RDB for fast disaster recovery. For a pure ephemeral cache, disable both for maximum
        performance.
      </p>

      {/* ───────────────────────────────────────────
          Key Takeaways
      ─────────────────────────────────────────── */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginTop: '2.5rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', fontSize: '1rem' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.9 }}>
          <li>
            <strong>Choose the right data type</strong>: Sorted Sets for leaderboards/rate-limiting,
            Hashes for objects, Lists for queues, Streams for event logs, HyperLogLog for
            cardinality estimates.
          </li>
          <li>
            <strong>Use ioredis for Node.js</strong>: it supports pipelining, Cluster, Sentinel,
            Lua scripts, and full async/await with automatic reconnection.
          </li>
          <li>
            <strong>Cache-Aside is the most pragmatic caching pattern</strong>: lazy-load on miss,
            invalidate on write, always set a TTL to prevent stale data accumulation.
          </li>
          <li>
            <strong>Pub/Sub is fire-and-forget</strong>: use Streams with consumer groups for
            durable, at-least-once message delivery and replay capability.
          </li>
          <li>
            <strong>Use Lua scripts for atomic operations</strong>: rate limiting, distributed locks,
            and any check-and-set pattern must be wrapped in a Lua script to be truly atomic.
          </li>
          <li>
            <strong>Enable both AOF and RDB in production</strong>: AOF for minimal data loss,
            RDB for fast recovery. For pure caches, disable both for maximum throughput.
          </li>
          <li>
            <strong>Set maxmemory and maxmemory-policy</strong>: use <code>allkeys-lru</code> for
            caches; never leave Redis memory unbounded in production.
          </li>
          <li>
            <strong>Sentinel for HA, Cluster for scale</strong>: Sentinel manages failover for a
            single shard; add Cluster only when your data or throughput exceeds a single node.
          </li>
          <li>
            <strong>Redis beats Memcached on features</strong>; both beat DynamoDB on latency.
            Choose based on your need for data structures, persistence, and managed scale.
          </li>
          <li>
            <strong>Secure Redis in production</strong>: bind to private interfaces, set a strong
            password, enable ACLs for per-user access control, and disable dangerous commands.
          </li>
        </ul>
      </div>
    </article>
  );
}
