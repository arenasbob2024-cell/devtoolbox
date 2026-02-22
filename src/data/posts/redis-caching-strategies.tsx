export default function RedisCachingStrategies() {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <h1>Redis Caching Strategies for Web Applications</h1>
      <p className="lead">
        Redis is the de-facto standard in-memory data store for caching in modern web applications. Choosing
        the right caching strategy can reduce database load by 90%, cut latency from hundreds of milliseconds
        to single digits, and let your application handle 10x the traffic without scaling your database.
        This guide covers the core caching patterns, eviction policies, and operational best practices used
        in production systems in 2026.
      </p>

      <h2>Why Redis for Caching?</h2>
      <p>
        Redis offers sub-millisecond read and write latency, rich data structures (strings, hashes, sorted
        sets, lists, streams), built-in TTL (time-to-live) expiration, Lua scripting for atomic operations,
        and Cluster mode for horizontal scaling. Unlike Memcached, Redis persists data to disk and supports
        replication, making it suitable for use cases beyond pure caching.
      </p>
      <ul>
        <li><strong>Latency</strong> - Sub-millisecond reads/writes vs. 5-50ms for a typical database query</li>
        <li><strong>Throughput</strong> - A single Redis node handles 100,000+ operations per second</li>
        <li><strong>Data structures</strong> - Hashes, sorted sets, and lists map cleanly to application objects</li>
        <li><strong>Atomic operations</strong> - INCR, SETNX, and Lua scripts prevent race conditions</li>
        <li><strong>Pub/Sub</strong> - Built-in messaging for cache invalidation across services</li>
      </ul>

      <h2>Core Caching Patterns</h2>

      <h3>1. Cache-Aside (Lazy Loading)</h3>
      <p>
        The most common pattern. The application checks the cache first. On a miss, it fetches from the
        database, writes the result to the cache, and returns it. The cache is populated only with data
        that is actually requested — no wasted memory for cold data.
      </p>
      <pre><code className="language-typescript">{`import { createClient } from 'redis';

const redis = createClient({ url: 'redis://localhost:6379' });
await redis.connect();

async function getUser(userId: string) {
  const cacheKey = \`user:\${userId}\`;

  // 1. Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached); // Cache hit
  }

  // 2. Cache miss — fetch from database
  const user = await db.users.findById(userId);
  if (!user) return null;

  // 3. Write to cache with TTL (300 seconds = 5 minutes)
  await redis.setEx(cacheKey, 300, JSON.stringify(user));

  return user;
}

async function updateUser(userId: string, data: Partial<User>) {
  await db.users.update(userId, data);

  // Invalidate cache after update
  await redis.del(\`user:\${userId}\`);
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Only caches requested data, resilient to cache failures (falls back to DB).
        <strong> Cons:</strong> Cache miss penalty on cold start; risk of stale data if invalidation is missed.
      </p>

      <h3>2. Write-Through</h3>
      <p>
        Every write goes to both the cache and the database synchronously. The cache is always consistent
        with the database. Reads are always cache hits after the first write.
      </p>
      <pre><code className="language-typescript">{`async function createProduct(product: Product) {
  // 1. Write to database
  const saved = await db.products.create(product);

  // 2. Write to cache immediately (write-through)
  const cacheKey = \`product:\${saved.id}\`;
  await redis.setEx(cacheKey, 3600, JSON.stringify(saved));

  // 3. Optionally update list caches
  await redis.del('products:all'); // Invalidate collection cache

  return saved;
}

async function getProduct(productId: string) {
  const cached = await redis.get(\`product:\${productId}\`);
  if (cached) return JSON.parse(cached);

  // Fallback for cold starts
  const product = await db.products.findById(productId);
  if (product) {
    await redis.setEx(\`product:\${productId}\`, 3600, JSON.stringify(product));
  }
  return product;
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Cache is always fresh, no stale reads.
        <strong> Cons:</strong> Write latency doubles (two writes per operation); cache fills with rarely-read data.
      </p>

      <h3>3. Write-Behind (Write-Back)</h3>
      <p>
        Writes go to the cache immediately and are flushed to the database asynchronously in batches.
        This dramatically reduces write latency but introduces a window of potential data loss.
      </p>
      <pre><code className="language-typescript">{`class WriteBehindCache {
  private pendingWrites = new Map<string, object>();
  private flushInterval: NodeJS.Timer;

  constructor(private redis: RedisClient, private db: Database) {
    // Flush dirty entries to DB every 5 seconds
    this.flushInterval = setInterval(() => this.flush(), 5000);
  }

  async set(key: string, value: object, ttlSeconds = 3600) {
    // 1. Write to cache immediately
    await this.redis.setEx(key, ttlSeconds, JSON.stringify(value));

    // 2. Queue for async DB write
    this.pendingWrites.set(key, value);
  }

  private async flush() {
    if (this.pendingWrites.size === 0) return;

    const batch = new Map(this.pendingWrites);
    this.pendingWrites.clear();

    // Batch write to database
    await this.db.batchUpsert([...batch.entries()]);
    console.log(\`Flushed \${batch.size} writes to database\`);
  }
}

// Use for high-frequency counters, view counts, session data
const cache = new WriteBehindCache(redis, db);
await cache.set(\`pageviews:\${articleId}\`, { count: newCount });`}</code></pre>
      <p>
        <strong>Pros:</strong> Extremely low write latency, ideal for counters and analytics.
        <strong> Cons:</strong> Risk of data loss if the cache crashes before flushing.
      </p>

      <h3>4. Read-Through</h3>
      <p>
        Similar to cache-aside, but the cache library itself handles fetching from the database on a miss.
        The application only talks to the cache layer — it never directly queries the database.
      </p>
      <pre><code className="language-typescript">{`class ReadThroughCache<T> {
  constructor(
    private redis: RedisClient,
    private loader: (key: string) => Promise<T | null>,
    private ttl: number = 300
  ) {}

  async get(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);

    // Cache handles the DB fetch transparently
    const value = await this.loader(key);
    if (value !== null) {
      await this.redis.setEx(key, this.ttl, JSON.stringify(value));
    }
    return value;
  }
}

// Application code is clean — no cache logic leaking into services
const userCache = new ReadThroughCache(
  redis,
  (id) => db.users.findById(id),
  300
);

const user = await userCache.get(\`user:\${userId}\`);`}</code></pre>

      <h2>Cache Invalidation Strategies</h2>
      <p>
        Cache invalidation is notoriously difficult. Phil Karlton famously said there are only two hard
        problems in computer science: cache invalidation and naming things.
      </p>

      <h3>TTL-Based Expiration</h3>
      <p>
        The simplest strategy — let cache entries expire after a fixed duration. Acceptable for data
        where a brief period of staleness is tolerable (product catalogs, user profiles, configuration).
      </p>
      <pre><code className="language-typescript">{`// Short TTL for frequently-changing data
await redis.setEx('stock:AAPL', 5, JSON.stringify(stockData));  // 5 seconds

// Medium TTL for semi-static data
await redis.setEx('user:profile:123', 300, JSON.stringify(profile)); // 5 minutes

// Long TTL for static content
await redis.setEx('config:feature-flags', 3600, JSON.stringify(flags)); // 1 hour

// No TTL for permanent data (use explicit invalidation)
await redis.set('lookup:country-codes', JSON.stringify(countries));`}</code></pre>

      <h3>Event-Driven Invalidation</h3>
      <p>
        Invalidate cache entries when the underlying data changes, using pub/sub or message queues to
        propagate invalidation across multiple service instances.
      </p>
      <pre><code className="language-typescript">{`// Publisher: Invalidate on write
async function updateProduct(id: string, data: Partial<Product>) {
  await db.products.update(id, data);
  await redis.del(\`product:\${id}\`);

  // Notify other services/instances
  await redis.publish('cache:invalidate', JSON.stringify({
    type: 'product',
    id,
    timestamp: Date.now(),
  }));
}

// Subscriber: Listen for invalidations
const subscriber = redis.duplicate();
await subscriber.connect();

await subscriber.subscribe('cache:invalidate', async (message) => {
  const { type, id } = JSON.parse(message);
  if (type === 'product') {
    await redis.del(\`product:\${id}\`);
    console.log(\`Cache invalidated: product:\${id}\`);
  }
});`}</code></pre>

      <h3>Cache Stampede Prevention</h3>
      <p>
        When a popular cache entry expires, hundreds of requests may simultaneously query the database
        (thundering herd). Use probabilistic early expiration or distributed locks to prevent this.
      </p>
      <pre><code className="language-typescript">{`import { promisify } from 'util';

// Mutex-based cache stampede prevention using SETNX
async function getWithLock(key: string, loader: () => Promise<any>, ttl = 300) {
  const lockKey = \`lock:\${key}\`;

  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Try to acquire lock (atomic SETNX with 10s timeout)
  const lockAcquired = await redis.set(lockKey, '1', {
    NX: true, // Only set if not exists
    EX: 10,   // Lock expires in 10 seconds
  });

  if (lockAcquired) {
    try {
      const value = await loader();
      await redis.setEx(key, ttl, JSON.stringify(value));
      return value;
    } finally {
      await redis.del(lockKey); // Release lock
    }
  } else {
    // Another process is loading — poll until ready
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 100));
      const result = await redis.get(key);
      if (result) return JSON.parse(result);
    }
    // Final fallback
    return loader();
  }
}`}</code></pre>

      <h2>Redis Data Structures for Caching</h2>

      <h3>Hashes for Object Caching</h3>
      <p>
        Store objects as Redis hashes to enable partial updates without fetching and re-serializing the
        entire object. More memory-efficient than storing JSON strings for large objects.
      </p>
      <pre><code className="language-typescript">{`// Store user as hash — enables field-level updates
await redis.hSet('user:123', {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
  lastLogin: Date.now().toString(),
});
await redis.expire('user:123', 3600);

// Update a single field without re-fetching the whole object
await redis.hSet('user:123', 'lastLogin', Date.now().toString());

// Fetch specific fields
const { name, email } = await redis.hGetAll('user:123');

// Fetch all fields
const user = await redis.hGetAll('user:123');`}</code></pre>

      <h3>Sorted Sets for Leaderboards and Rankings</h3>
      <pre><code className="language-typescript">{`// Add score to leaderboard
await redis.zAdd('leaderboard:global', {
  score: 9500,
  value: 'user:alice',
});

// Get top 10 players with scores
const top10 = await redis.zRangeWithScores('leaderboard:global', 0, 9, {
  REV: true, // Descending order
});

// Get a user's rank (0-indexed)
const rank = await redis.zRevRank('leaderboard:global', 'user:alice');
console.log(\`Alice is ranked #\${rank + 1}\`);`}</code></pre>

      <h2>Eviction Policies</h2>
      <p>
        When Redis reaches its memory limit (<code>maxmemory</code>), it evicts keys based on the
        configured policy. Choose the right policy for your use case:
      </p>
      <table>
        <thead>
          <tr>
            <th>Policy</th>
            <th>Behavior</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>noeviction</code></td>
            <td>Return errors when memory is full</td>
            <td>Databases, critical data</td>
          </tr>
          <tr>
            <td><code>allkeys-lru</code></td>
            <td>Evict least recently used keys</td>
            <td>General caching (recommended)</td>
          </tr>
          <tr>
            <td><code>volatile-lru</code></td>
            <td>Evict LRU keys with TTL set</td>
            <td>Mixed cache + persistent data</td>
          </tr>
          <tr>
            <td><code>allkeys-lfu</code></td>
            <td>Evict least frequently used keys</td>
            <td>Skewed access patterns</td>
          </tr>
          <tr>
            <td><code>volatile-ttl</code></td>
            <td>Evict keys with shortest TTL</td>
            <td>TTL-managed caches</td>
          </tr>
          <tr>
            <td><code>allkeys-random</code></td>
            <td>Evict random keys</td>
            <td>Uniform access patterns</td>
          </tr>
        </tbody>
      </table>
      <pre><code className="language-bash">{`# redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru

# Or set at runtime
redis-cli CONFIG SET maxmemory 2gb
redis-cli CONFIG SET maxmemory-policy allkeys-lru`}</code></pre>

      <h2>Monitoring and Observability</h2>
      <pre><code className="language-bash">{`# Check cache hit rate (critical metric — target > 90%)
redis-cli INFO stats | grep -E "keyspace_hits|keyspace_misses"
# keyspace_hits:1000000
# keyspace_misses:50000
# Hit rate: 1000000 / (1000000 + 50000) = 95.2%

# Monitor memory usage
redis-cli INFO memory | grep -E "used_memory_human|maxmemory_human"

# Scan for large keys (avoid KEYS in production)
redis-cli --bigkeys

# Monitor commands in real time
redis-cli MONITOR

# Slowlog — find commands taking > 10ms
redis-cli SLOWLOG GET 10`}</code></pre>

      <h2>Production Best Practices</h2>
      <ul>
        <li><strong>Always set TTLs</strong> — Unbounded cache growth will exhaust memory. Use <code>setEx</code> or set explicit expiry.</li>
        <li><strong>Use namespaced keys</strong> — Prefix keys with <code>service:type:id</code> (e.g., <code>api:user:123</code>) for clarity and bulk operations.</li>
        <li><strong>Monitor hit rate</strong> — A hit rate below 80% indicates your cache is not effective. Profile which keys are missed most.</li>
        <li><strong>Avoid large keys</strong> — Keys over 1MB slow down Redis and increase network I/O. Compress or paginate large values.</li>
        <li><strong>Use pipelining for bulk operations</strong> — Send multiple commands in a single round trip instead of one at a time.</li>
        <li><strong>Enable persistence selectively</strong> — For pure caches, disable RDB and AOF to save disk I/O. For session stores, enable AOF.</li>
        <li><strong>Use Redis Cluster for scale</strong> — Shard data across multiple nodes when a single instance cannot handle your throughput.</li>
        <li><strong>Implement circuit breakers</strong> — If Redis is unavailable, fall back to the database gracefully rather than returning errors.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>When should I use Redis vs. an in-process cache like a Map?</h3>
      <p>
        Use an in-process cache (a plain JavaScript <code>Map</code> or <code>node-cache</code>) for data
        local to a single instance — configuration, lookup tables, or computed values that are the same for
        every user. Use Redis when you need to share cached state across multiple application instances,
        require persistence, need pub/sub messaging, or manage session data that must survive process restarts.
      </p>

      <h3>What TTL should I use?</h3>
      <p>
        It depends on how frequently the underlying data changes and how much staleness is acceptable.
        A good starting point: 5 seconds for real-time data (stock prices), 5 minutes for user profiles,
        1 hour for product catalogs, 24 hours for static reference data. Always prefer shorter TTLs with
        explicit invalidation on writes over long TTLs with stale data.
      </p>

      <h3>How do I handle cache invalidation across microservices?</h3>
      <p>
        Use Redis Pub/Sub or a message broker (Kafka, RabbitMQ) to broadcast invalidation events. When
        service A writes to the database, it publishes an invalidation message. Service B, which cached
        the same data, receives the message and deletes its cache entries. This pattern keeps caches
        consistent without tight coupling between services.
      </p>

      <p>
        For parsing and validating complex JSON responses before caching them, try our{' '}
        <a href="/en/tools/json-formatter">JSON Formatter</a>. To explore API responses and understand
        cache-related HTTP headers, use our <a href="/en/tools/http-status-codes">HTTP Status Codes</a> reference.
      </p>
    </article>
  );
}
