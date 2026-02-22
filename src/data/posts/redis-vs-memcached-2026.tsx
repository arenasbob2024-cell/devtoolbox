export default function RedisVsMemcached2026() {
  return (
    <>
      <h2>Redis vs Memcached in 2026: Which In-Memory Store Should You Choose?</h2>
      <p>
        Redis and Memcached are the two most widely deployed in-memory data stores. Both deliver
        sub-millisecond response times, but they serve different architectural niches. Redis has
        evolved into a multi-model database with streams, JSON documents, and vector search, while
        Memcached remains a lean, focused caching layer. This comparison covers performance, features,
        persistence, clustering, and real-world use cases to help you decide.
      </p>

      <h2>Quick Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Redis 7.4+</th>
            <th>Memcached 1.6+</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Data structures</td><td>Strings, Hashes, Lists, Sets, Sorted Sets, Streams, JSON, Bitmaps, HyperLogLog</td><td>Strings (key-value only)</td></tr>
          <tr><td>Max value size</td><td>512 MB</td><td>1 MB (default, configurable)</td></tr>
          <tr><td>Threading</td><td>Single-threaded command execution, multi-threaded I/O (7.0+)</td><td>Multi-threaded from the start</td></tr>
          <tr><td>Persistence</td><td>RDB snapshots + AOF log</td><td>None (pure cache)</td></tr>
          <tr><td>Replication</td><td>Built-in primary-replica</td><td>None built-in</td></tr>
          <tr><td>Clustering</td><td>Redis Cluster (hash slots)</td><td>Client-side consistent hashing</td></tr>
          <tr><td>Pub/Sub</td><td>Yes (including Streams)</td><td>No</td></tr>
          <tr><td>Scripting</td><td>Lua, Redis Functions</td><td>No</td></tr>
          <tr><td>Memory efficiency</td><td>Higher overhead per key</td><td>Lower overhead, slab allocator</td></tr>
          <tr><td>Protocol</td><td>RESP3</td><td>ASCII + binary</td></tr>
          <tr><td>License (2026)</td><td>RSALv2 / SSPLv1 (or Valkey fork: BSD)</td><td>BSD</td></tr>
        </tbody>
      </table>

      <h2>Redis: Beyond Caching</h2>
      <p>
        Redis started as a cache but has grown into a versatile data platform. Its rich data structures
        make it suitable for session storage, real-time leaderboards, rate limiting, message queues,
        and even full-text search via RediSearch.
      </p>

      <h3>Core Data Structure Examples</h3>
      <pre><code className="language-bash">{`# Strings — basic key-value caching
SET user:1001:session "abc123" EX 3600    # Expires in 1 hour
GET user:1001:session

# Hashes — structured objects without serialization
HSET user:1001 name "Alice" email "alice@example.com" plan "pro"
HGET user:1001 name                        # "Alice"
HGETALL user:1001                          # All fields

# Lists — queues and recent activity
LPUSH notifications:1001 "New message from Bob"
LPUSH notifications:1001 "Order shipped"
LRANGE notifications:1001 0 9             # Last 10 notifications

# Sets — unique collections, intersections
SADD user:1001:tags "javascript" "vue" "redis"
SADD user:1002:tags "python" "redis" "docker"
SINTER user:1001:tags user:1002:tags      # {"redis"} — common interests

# Sorted Sets — leaderboards, rankings
ZADD leaderboard 2500 "player:alice"
ZADD leaderboard 1800 "player:bob"
ZADD leaderboard 3100 "player:carol"
ZREVRANGE leaderboard 0 2 WITHSCORES     # Top 3 by score

# Streams — event log / message queue
XADD orders * product "widget" quantity 3 user_id 1001
XADD orders * product "gadget" quantity 1 user_id 1002
XREAD COUNT 10 STREAMS orders 0           # Read all events`}</code></pre>

      <h3>Redis with Node.js</h3>
      <pre><code className="language-typescript">{`import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
  },
});

client.on('error', (err) => console.error('Redis error:', err));
await client.connect();

// Basic caching pattern
async function getCachedUser(userId: string) {
  const cacheKey = \`user:\${userId}\`;

  // Check cache first
  const cached = await client.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Cache miss — fetch from database
  const user = await db.users.findById(userId);
  if (user) {
    await client.set(cacheKey, JSON.stringify(user), { EX: 300 }); // 5 min TTL
  }
  return user;
}

// Rate limiting with sliding window
async function isRateLimited(
  ip: string,
  limit: number = 100,
  windowSec: number = 60
): Promise<boolean> {
  const key = \`ratelimit:\${ip}\`;
  const now = Date.now();
  const windowStart = now - windowSec * 1000;

  const multi = client.multi();
  multi.zRemRangeByScore(key, 0, windowStart);   // Remove old entries
  multi.zAdd(key, { score: now, value: \`\${now}\` }); // Add current
  multi.zCard(key);                                // Count in window
  multi.expire(key, windowSec);                    // Auto-cleanup

  const results = await multi.exec();
  const requestCount = results[2] as number;
  return requestCount > limit;
}

// Pub/Sub for real-time notifications
const subscriber = client.duplicate();
await subscriber.connect();

await subscriber.subscribe('chat:room:42', (message) => {
  console.log('New message:', JSON.parse(message));
});

// Publisher
await client.publish('chat:room:42', JSON.stringify({
  user: 'Alice',
  text: 'Hello everyone!',
  timestamp: Date.now(),
}));`}</code></pre>

      <h3>Redis Persistence Configuration</h3>
      <pre><code className="language-bash">{`# redis.conf — persistence options

# RDB snapshots (point-in-time dumps)
save 900 1        # Save if 1 key changed in 900 seconds
save 300 10       # Save if 10 keys changed in 300 seconds
save 60 10000     # Save if 10000 keys changed in 60 seconds
dbfilename dump.rdb
dir /var/lib/redis

# AOF (Append Only File) — more durable
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec          # Good balance of performance and durability
# appendfsync always          # Maximum durability, slower
# appendfsync no              # Let OS decide (fastest, least durable)

# Hybrid persistence (Redis 7+) — recommended
aof-use-rdb-preamble yes      # RDB for bulk + AOF for recent changes`}</code></pre>

      <h2>Memcached: Pure Speed Caching</h2>
      <p>
        Memcached does one thing exceptionally well: fast, distributed key-value caching. Its slab
        allocator avoids memory fragmentation, its multi-threaded architecture scales linearly with
        cores, and its simplicity means there are fewer things that can go wrong.
      </p>

      <h3>Memcached with Node.js</h3>
      <pre><code className="language-typescript">{`import Memcached from 'memcached';

const memcached = new Memcached('localhost:11211', {
  retries: 2,
  retry: 1000,
  timeout: 5000,
  poolSize: 25,
});

// Basic cache pattern
function getFromCache<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    memcached.get(key, (err, data) => {
      if (err) return reject(err);
      resolve(data ? JSON.parse(data) : null);
    });
  });
}

function setInCache(key: string, value: unknown, ttl: number = 300): Promise<void> {
  return new Promise((resolve, reject) => {
    memcached.set(key, JSON.stringify(value), ttl, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// Cache-aside pattern
async function getProduct(productId: string) {
  const cacheKey = \`product:\${productId}\`;
  const cached = await getFromCache(cacheKey);
  if (cached) return cached;

  const product = await db.products.findById(productId);
  if (product) await setInCache(cacheKey, product, 600);
  return product;
}

// Multi-server consistent hashing
const pool = new Memcached([
  'cache1.internal:11211:2',  // weight 2 (more capacity)
  'cache2.internal:11211:1',
  'cache3.internal:11211:1',
]);`}</code></pre>

      <h3>Memcached Configuration</h3>
      <pre><code className="language-bash">{`# /etc/memcached.conf

# Memory allocation
-m 4096                    # 4 GB of memory
-I 2m                      # Max item size 2 MB (default 1 MB)

# Network
-l 0.0.0.0                 # Listen on all interfaces
-p 11211                   # Port
-U 0                       # Disable UDP (security)

# Threading
-t 8                       # 8 worker threads (match CPU cores)
-R 20                      # Max requests per event

# Connection limits
-c 2048                    # Max connections
-b 2048                    # Backlog queue

# Memory management
-f 1.25                    # Slab growth factor
-n 48                      # Min slab chunk size

# Logging
-v                         # Verbose logging`}</code></pre>

      <h2>Performance Benchmarks (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Benchmark</th>
            <th>Redis 7.4</th>
            <th>Memcached 1.6</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>GET throughput (single thread)</td><td>~250K ops/sec</td><td>~300K ops/sec</td></tr>
          <tr><td>SET throughput (single thread)</td><td>~220K ops/sec</td><td>~280K ops/sec</td></tr>
          <tr><td>GET throughput (multi-core, 8 threads)</td><td>~800K ops/sec</td><td>~1.5M ops/sec</td></tr>
          <tr><td>p99 latency (GET)</td><td>~0.3 ms</td><td>~0.2 ms</td></tr>
          <tr><td>Memory per key (100-byte value)</td><td>~120 bytes overhead</td><td>~70 bytes overhead</td></tr>
        </tbody>
      </table>
      <p>
        Memcached wins on raw throughput for simple GET/SET operations due to its native multi-threading
        and slab allocator. Redis closes the gap with I/O threading (Redis 7+) and wins when you need
        data structures beyond simple strings.
      </p>

      <h2>When to Choose Redis</h2>
      <ul>
        <li><strong>Session storage</strong> — built-in expiration, persistence, replication</li>
        <li><strong>Real-time leaderboards</strong> — sorted sets with O(log N) insert and rank lookup</li>
        <li><strong>Rate limiting</strong> — atomic operations, sliding windows with sorted sets</li>
        <li><strong>Message queues</strong> — Streams with consumer groups, guaranteed delivery</li>
        <li><strong>Pub/Sub</strong> — real-time chat, notifications, event broadcasting</li>
        <li><strong>Data durability matters</strong> — RDB + AOF persistence</li>
        <li><strong>Complex data</strong> — you need hashes, lists, sets, not just strings</li>
      </ul>

      <h2>When to Choose Memcached</h2>
      <ul>
        <li><strong>Simple key-value caching</strong> — HTML fragments, API responses, query results</li>
        <li><strong>Maximum throughput</strong> — multi-threaded performance on high-core machines</li>
        <li><strong>Memory efficiency</strong> — lower per-key overhead matters at billions of keys</li>
        <li><strong>No persistence needed</strong> — pure cache that can rebuild from source</li>
        <li><strong>Simplicity</strong> — fewer moving parts, easier to operate and debug</li>
        <li><strong>Large objects</strong> — configurable slab sizes handle large values well</li>
      </ul>

      <h2>Running with Docker</h2>
      <pre><code className="language-yaml">{`# docker-compose.yml
services:
  redis:
    image: redis:7.4-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: >
      redis-server
      --appendonly yes
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s

  memcached:
    image: memcached:1.6-alpine
    ports:
      - "11211:11211"
    command: >
      memcached
      -m 512
      -t 4
      -c 1024
      -I 2m
    healthcheck:
      test: ["CMD-SHELL", "echo stats | nc localhost 11211"]
      interval: 10s

volumes:
  redis_data:`}</code></pre>

      <h2>The Valkey Fork</h2>
      <p>
        After Redis changed its license to RSALv2/SSPLv1 in 2024, the Linux Foundation created Valkey —
        a BSD-licensed fork of Redis 7.2. Major cloud providers (AWS, Google Cloud, Oracle) back Valkey.
        If open-source licensing matters to your organization, Valkey is a drop-in replacement for Redis
        with the same API, data structures, and performance.
      </p>
      <pre><code className="language-bash">{`# Valkey is API-compatible — just change the image
docker run -d --name valkey -p 6379:6379 valkey/valkey:7.2

# Existing Redis clients work without changes
redis-cli -h localhost -p 6379 PING  # PONG`}</code></pre>

      <h2>Conclusion</h2>
      <p>
        Choose Redis when you need data structures, persistence, pub/sub, or scripting. Choose Memcached
        when you need maximum throughput for simple key-value caching with minimal overhead. In 2026,
        many production architectures use both — Redis for sessions and real-time features, Memcached
        for high-volume page fragment caching.
      </p>

      <p>
        Validate your Redis configuration files with our <a href="/en/tools/json-formatter">JSON Formatter</a>.
        For understanding container networking between cache services, read our{" "}
        <a href="/en/blog/docker-compose-cheat-sheet">Docker Compose Cheat Sheet</a>. If you are building
        APIs that sit in front of your cache layer, check out our{" "}
        <a href="/en/blog/rest-api-best-practices-guide">REST API Best Practices</a> guide.
      </p>
    </>
  );
}
