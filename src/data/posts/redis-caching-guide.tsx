export default function RedisCachingGuide() {
  return (
    <>
      <h2>Redis Caching Strategies: Complete Developer Guide</h2>
      <p>
        Redis is the most popular in-memory data store used for caching, session management, real-time
        analytics, and message brokering. With sub-millisecond latency and support for rich data structures,
        Redis can dramatically improve application performance by reducing database load and API response
        times. This guide covers caching strategies, implementation patterns, and production best practices
        every developer should know in 2026.
      </p>

      <h2>Why Use Redis for Caching?</h2>
      <p>
        Caching is the practice of storing frequently accessed data in a fast-access layer to reduce the
        load on slower backends like databases or external APIs. Redis is the preferred caching solution
        because of its unique advantages:
      </p>
      <ul>
        <li><strong>Sub-millisecond latency</strong> - All data is stored in memory, providing read/write speeds orders of magnitude faster than disk-based databases</li>
        <li><strong>Rich data structures</strong> - Strings, hashes, lists, sets, sorted sets, streams, and more, allowing cache operations beyond simple key-value pairs</li>
        <li><strong>Built-in TTL</strong> - Automatic key expiration eliminates the need for manual cache cleanup</li>
        <li><strong>Atomic operations</strong> - INCR, DECR, SETNX, and Lua scripting provide thread-safe operations without external locking</li>
        <li><strong>Pub/Sub and Streams</strong> - Enable real-time cache invalidation across distributed systems</li>
        <li><strong>Persistence options</strong> - RDB snapshots and AOF logs allow data survival across restarts</li>
        <li><strong>Cluster mode</strong> - Horizontal scaling across multiple nodes for large datasets</li>
      </ul>

      <h2>Getting Started with Redis</h2>
      <pre><code>{`# Install Redis (macOS)
brew install redis
brew services start redis

# Install Redis (Ubuntu/Debian)
sudo apt update && sudo apt install redis-server
sudo systemctl enable redis-server

# Install Redis (Docker - recommended for development)
docker run -d --name redis -p 6379:6379 redis:7-alpine

# Verify installation
redis-cli ping
# Output: PONG

# Basic CLI operations
redis-cli
> SET user:1:name "Alice"
OK
> GET user:1:name
"Alice"
> SET session:abc123 "user_data" EX 3600  # Expires in 1 hour
OK
> TTL session:abc123
(integer) 3599
> DEL user:1:name
(integer) 1`}</code></pre>

      <h2>Connecting from Node.js</h2>
      <p>
        The two most popular Node.js Redis clients are <code>ioredis</code> (feature-rich, recommended)
        and <code>redis</code> (official client). Here is how to set up a reusable Redis connection:
      </p>
      <pre><code>{`// redis-client.ts
import Redis from "ioredis";

// Singleton connection
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  db: 0,
  maxRetriesPerRequest: 3,
  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  // Connection pool settings
  lazyConnect: true,
  enableReadyCheck: true,
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;

// Basic usage
import redis from "./redis-client";

// String operations
await redis.set("key", "value");
await redis.set("key", "value", "EX", 3600);  // with TTL
const value = await redis.get("key");

// Hash operations (great for objects)
await redis.hset("user:1", { name: "Alice", email: "alice@example.com", role: "admin" });
const user = await redis.hgetall("user:1");
// { name: "Alice", email: "alice@example.com", role: "admin" }

// JSON serialization
await redis.set("config", JSON.stringify({ theme: "dark", lang: "en" }));
const config = JSON.parse(await redis.get("config") || "{}");`}</code></pre>

      <h2>Caching Patterns</h2>

      <h3>1. Cache-Aside (Lazy Loading)</h3>
      <p>
        The most common pattern. The application checks the cache first. On a cache miss, it loads data
        from the database, stores it in the cache, and returns it. Data is only cached when requested.
      </p>
      <pre><code>{`import redis from "./redis-client";
import { db } from "./database";

async function getUser(userId: string) {
  const cacheKey = \`user:\${userId}\`;

  // 1. Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("Cache hit");
    return JSON.parse(cached);
  }

  // 2. Cache miss - load from database
  console.log("Cache miss");
  const user = await db.users.findById(userId);

  if (user) {
    // 3. Store in cache with TTL
    await redis.set(cacheKey, JSON.stringify(user), "EX", 3600);
  }

  return user;
}

// Invalidate cache on update
async function updateUser(userId: string, data: Partial<User>) {
  // Update database
  const user = await db.users.update(userId, data);

  // Delete cached version (next read will repopulate)
  await redis.del(\`user:\${userId}\`);

  return user;
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Only caches data that is actually requested. Resilient to cache failures (falls back to database).
        <strong>Cons:</strong> Cache miss penalty (three operations: cache check, DB read, cache write). Potential for stale data
        if the database is updated without cache invalidation.
      </p>

      <h3>2. Write-Through</h3>
      <p>
        Every write to the database simultaneously writes to the cache. This ensures the cache is always
        up-to-date but adds latency to write operations.
      </p>
      <pre><code>{`async function createProduct(data: ProductInput) {
  // Write to database
  const product = await db.products.create(data);

  // Immediately write to cache
  const cacheKey = \`product:\${product.id}\`;
  await redis.set(cacheKey, JSON.stringify(product), "EX", 7200);

  // Also update the product list cache
  await redis.del("products:list");

  return product;
}

async function updateProduct(id: string, data: Partial<ProductInput>) {
  // Update database
  const product = await db.products.update(id, data);

  // Update cache with fresh data
  const cacheKey = \`product:\${id}\`;
  await redis.set(cacheKey, JSON.stringify(product), "EX", 7200);

  return product;
}`}</code></pre>

      <h3>3. Write-Behind (Write-Back)</h3>
      <p>
        Writes go to the cache first and are asynchronously persisted to the database. This provides
        the fastest write performance but risks data loss if the cache fails before persistence.
      </p>
      <pre><code>{`import redis from "./redis-client";

// Write to cache immediately, persist to DB asynchronously
async function recordPageView(pageId: string) {
  // Increment counter in Redis (instant)
  const count = await redis.incr(\`pageviews:\${pageId}\`);

  // Add to a list for batch persistence
  await redis.lpush("pageviews:queue", JSON.stringify({
    pageId,
    count,
    timestamp: Date.now(),
  }));

  return count;
}

// Background worker: flush to database periodically
async function flushPageViews() {
  const batchSize = 100;
  const batch: string[] = [];

  for (let i = 0; i < batchSize; i++) {
    const item = await redis.rpop("pageviews:queue");
    if (!item) break;
    batch.push(item);
  }

  if (batch.length > 0) {
    const records = batch.map((item) => JSON.parse(item));
    await db.pageViews.bulkUpsert(records);
    console.log(\`Flushed \${records.length} page view records\`);
  }
}

// Run every 30 seconds
setInterval(flushPageViews, 30_000);`}</code></pre>

      <h3>4. Read-Through with Stale-While-Revalidate</h3>
      <p>
        Returns stale cached data immediately while refreshing the cache in the background. This
        provides the best user experience by eliminating cache miss latency for warm caches.
      </p>
      <pre><code>{`interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  maxAge: number;      // Fresh period in seconds
  staleAge: number;    // Stale-but-servable period in seconds
}

async function getWithSWR<T>(
  key: string,
  fetcher: () => Promise<T>,
  maxAge = 300,         // 5 minutes fresh
  staleAge = 3600       // 1 hour stale-while-revalidate
): Promise<T> {
  const cached = await redis.get(key);

  if (cached) {
    const entry: CacheEntry<T> = JSON.parse(cached);
    const age = (Date.now() - entry.cachedAt) / 1000;

    if (age < entry.maxAge) {
      // Fresh - return immediately
      return entry.data;
    }

    if (age < entry.staleAge) {
      // Stale but within revalidation window
      // Return stale data and refresh in background
      refreshCache(key, fetcher, maxAge, staleAge).catch(console.error);
      return entry.data;
    }
  }

  // No cache or expired - fetch synchronously
  return refreshCache(key, fetcher, maxAge, staleAge);
}

async function refreshCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  maxAge: number,
  staleAge: number
): Promise<T> {
  const data = await fetcher();
  const entry: CacheEntry<T> = {
    data,
    cachedAt: Date.now(),
    maxAge,
    staleAge,
  };
  await redis.set(key, JSON.stringify(entry), "EX", staleAge);
  return data;
}

// Usage
const products = await getWithSWR(
  "products:featured",
  () => db.products.findFeatured(),
  300,    // Fresh for 5 minutes
  3600    // Serve stale for up to 1 hour
);`}</code></pre>

      <h2>Cache Invalidation Strategies</h2>
      <p>
        Cache invalidation is notoriously one of the hardest problems in computer science. Here are
        practical strategies for keeping your cache consistent:
      </p>

      <h3>Pattern-Based Deletion</h3>
      <pre><code>{`// Delete all keys matching a pattern
async function invalidatePattern(pattern: string) {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await redis.scan(
      cursor, "MATCH", pattern, "COUNT", 100
    );
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } while (cursor !== "0");
}

// Invalidate all user-related caches
await invalidatePattern("user:42:*");

// Invalidate all product list caches
await invalidatePattern("products:list:*");`}</code></pre>

      <h3>Tag-Based Invalidation</h3>
      <pre><code>{`// Associate cache keys with tags for group invalidation
async function setWithTags(
  key: string,
  value: string,
  ttl: number,
  tags: string[]
) {
  const pipeline = redis.pipeline();
  pipeline.set(key, value, "EX", ttl);

  for (const tag of tags) {
    pipeline.sadd(\`tag:\${tag}\`, key);
    pipeline.expire(\`tag:\${tag}\`, ttl + 60);
  }

  await pipeline.exec();
}

async function invalidateTag(tag: string) {
  const keys = await redis.smembers(\`tag:\${tag}\`);
  if (keys.length > 0) {
    await redis.del(...keys, \`tag:\${tag}\`);
  }
}

// Cache a product with multiple tags
await setWithTags(
  "product:42",
  JSON.stringify(product),
  3600,
  ["products", "category:electronics", "featured"]
);

// Invalidate all electronics products
await invalidateTag("category:electronics");`}</code></pre>

      <h2>Cache Stampede Prevention</h2>
      <p>
        A cache stampede (also called thundering herd) occurs when many requests simultaneously encounter
        a cache miss and all hit the database at once. This can overwhelm your database. Use a distributed
        lock to ensure only one request rebuilds the cache:
      </p>
      <pre><code>{`async function getWithLock<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number
): Promise<T | null> {
  // Try cache first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Acquire lock to prevent stampede
  const lockKey = \`lock:\${key}\`;
  const lockAcquired = await redis.set(lockKey, "1", "EX", 10, "NX");

  if (lockAcquired) {
    try {
      // Double-check cache (another request may have populated it)
      const rechecked = await redis.get(key);
      if (rechecked) return JSON.parse(rechecked);

      // Fetch from source and populate cache
      const data = await fetcher();
      await redis.set(key, JSON.stringify(data), "EX", ttl);
      return data;
    } finally {
      await redis.del(lockKey);
    }
  }

  // Lock not acquired - wait and retry
  await new Promise((resolve) => setTimeout(resolve, 100));
  const retryResult = await redis.get(key);
  return retryResult ? JSON.parse(retryResult) : null;
}`}</code></pre>

      <h2>Redis Data Structures for Caching</h2>

      <h3>Sorted Sets for Leaderboards and Rankings</h3>
      <pre><code>{`// Add scores
await redis.zadd("leaderboard:daily", 1500, "player:alice");
await redis.zadd("leaderboard:daily", 2300, "player:bob");
await redis.zadd("leaderboard:daily", 1800, "player:charlie");

// Get top 10 players with scores
const top10 = await redis.zrevrange("leaderboard:daily", 0, 9, "WITHSCORES");
// ["player:bob", "2300", "player:charlie", "1800", "player:alice", "1500"]

// Get a player's rank (0-indexed)
const rank = await redis.zrevrank("leaderboard:daily", "player:alice");
// 2 (third place)`}</code></pre>

      <h3>HyperLogLog for Unique Counting</h3>
      <pre><code>{`// Count unique visitors (uses only 12KB per counter regardless of cardinality)
await redis.pfadd("visitors:2026-02-22", "user:1", "user:2", "user:3");
await redis.pfadd("visitors:2026-02-22", "user:1", "user:4");  // user:1 is deduplicated

const uniqueCount = await redis.pfcount("visitors:2026-02-22");
// 4 (approximate, 0.81% standard error)

// Merge multiple days for weekly count
await redis.pfmerge(
  "visitors:week8",
  "visitors:2026-02-17",
  "visitors:2026-02-18",
  "visitors:2026-02-19"
);`}</code></pre>

      <h2>Monitoring and Performance</h2>
      <pre><code>{`# Redis CLI monitoring commands
redis-cli INFO stats          # Hit/miss ratio, ops/sec
redis-cli INFO memory         # Memory usage details
redis-cli INFO keyspace       # Keys per database
redis-cli SLOWLOG GET 10      # 10 slowest recent commands
redis-cli DBSIZE              # Total number of keys
redis-cli MONITOR             # Real-time command stream (use briefly, high overhead)

# Key metrics to monitor:
# - Hit ratio: keyspace_hits / (keyspace_hits + keyspace_misses) > 95%
# - Memory usage: used_memory vs maxmemory
# - Connected clients: connected_clients
# - Evicted keys: evicted_keys (should be 0 ideally)
# - Ops per second: instantaneous_ops_per_sec`}</code></pre>

      <h2>Production Configuration</h2>
      <pre><code>{`# redis.conf - Key production settings

# Memory limit (set to 70-80% of available RAM)
maxmemory 4gb

# Eviction policy when maxmemory is reached
# allkeys-lru: Evict least recently used keys (recommended for caching)
# volatile-lru: Evict LRU keys with TTL set
# allkeys-lfu: Evict least frequently used keys
maxmemory-policy allkeys-lru

# Persistence (choose based on durability needs)
# RDB snapshots (fast restart, some data loss)
save 900 1        # Save if 1 key changed in 900 seconds
save 300 10       # Save if 10 keys changed in 300 seconds

# AOF (slower restart, minimal data loss)
appendonly yes
appendfsync everysec

# Connection limits
maxclients 10000
timeout 300       # Close idle connections after 5 minutes

# Security
requirepass your-strong-password-here
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG ""

# Performance tuning
tcp-keepalive 300
hz 10
dynamic-hz yes`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Set TTLs on every key</strong> - Prevents memory leaks from forgotten keys. Even long-lived caches should expire and be refreshed</li>
        <li><strong>Use meaningful key naming conventions</strong> - Follow a pattern like <code>entity:id:field</code> (e.g., <code>user:42:profile</code>). Colons are the standard separator</li>
        <li><strong>Avoid large values</strong> - Keep values under 100KB. Large values cause memory fragmentation and slow operations</li>
        <li><strong>Use pipelines for batch operations</strong> - Reduce round trips by sending multiple commands in a single pipeline</li>
        <li><strong>Monitor hit ratio</strong> - A healthy cache should have a hit ratio above 95%. Below that, revisit your caching strategy or TTLs</li>
        <li><strong>Handle cache failures gracefully</strong> - Your application should work without Redis, falling back to the database with degraded performance</li>
        <li><strong>Use connection pooling</strong> - Reuse connections instead of creating new ones for each operation</li>
        <li><strong>Serialize efficiently</strong> - Consider MessagePack or Protocol Buffers instead of JSON for large cached objects</li>
        <li><strong>Warm the cache on deploy</strong> - Pre-populate critical cache entries after deployment to avoid a wave of cache misses</li>
        <li><strong>Use separate Redis instances</strong> - Separate caching from session storage and pub/sub to isolate failure domains</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>Redis vs Memcached: Which should I use?</h3>
      <p>
        Redis is the better choice for most applications. It supports richer data structures (lists, sets,
        sorted sets, hashes), persistence, pub/sub, Lua scripting, and cluster mode. Memcached is simpler
        and may offer marginally better performance for pure key-value caching with very large values, but
        Redis has largely superseded it for new projects.
      </p>

      <h3>How much memory does Redis need?</h3>
      <p>
        Redis stores all data in memory plus some overhead (typically 50-100 bytes per key for metadata).
        A good rule of thumb: estimate your total data size, add 20-30% for Redis overhead, and set
        maxmemory to 70-80% of available RAM. Monitor <code>used_memory</code> and set alerts at 80%
        utilization.
      </p>

      <h3>What happens when Redis runs out of memory?</h3>
      <p>
        Behavior depends on the <code>maxmemory-policy</code> setting. With <code>allkeys-lru</code>,
        Redis evicts the least recently used keys to make room. With <code>noeviction</code> (default),
        write commands return errors. For caching, always set <code>allkeys-lru</code> or
        <code>allkeys-lfu</code> as the eviction policy.
      </p>

      <h3>Should I use Redis Cluster or Redis Sentinel?</h3>
      <p>
        Redis Sentinel provides high availability through automatic failover (master-replica). Redis Cluster
        provides both high availability and horizontal scaling by sharding data across multiple nodes. Use
        Sentinel when your data fits in a single node. Use Cluster when you need more capacity than a
        single node can provide. For most caching use cases, a managed service like AWS ElastiCache or
        Redis Cloud handles this complexity for you.
      </p>

      <h3>How do I handle cache invalidation in microservices?</h3>
      <p>
        Use Redis Pub/Sub or Redis Streams to broadcast invalidation events across services. When a service
        updates data, it publishes an invalidation message with the affected cache key or entity. Other
        services subscribe to these events and delete their local cache entries. This pattern ensures
        eventual consistency across service boundaries.
      </p>
    </>
  );
}
