'use client';
import React from 'react';

export default function RedisCachingPatterns({ lang }: { lang: string }) {
  return (
    <article>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Redis Caching Patterns: Complete Guide for Web Applications
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Redis is the most widely used in-memory data store for caching in web applications. It
        serves as the caching layer for companies of every scale, from startups to enterprises
        handling millions of requests per second. But simply adding Redis to your stack is not
        enough. Choosing the right caching pattern, setting appropriate TTLs, handling cache
        invalidation, and avoiding common pitfalls are what separate a well-cached application
        from one that introduces more problems than it solves.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        This guide covers the fundamental caching patterns used in production systems, complete
        with working code examples in Node.js and Python. You will learn cache-aside, write-through,
        write-behind, read-through, and refresh-ahead patterns, along with advanced topics like
        cache stampede prevention, distributed locking, and cache warming strategies.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Why Redis for Caching?
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Redis stores data entirely in memory, providing sub-millisecond read and write latency.
        A typical Redis instance can handle hundreds of thousands of operations per second on a
        single core. Beyond raw speed, Redis offers rich data structures (strings, hashes, lists,
        sets, sorted sets, streams), built-in TTL support, atomic operations, pub/sub messaging,
        Lua scripting, and cluster mode for horizontal scaling. These features make it far more
        versatile than a simple key-value cache.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Basic Redis connection and operations (Node.js with ioredis)
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  // Connection pool for high throughput
  lazyConnect: true,
  enableOfflineQueue: true,
});

redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Redis connected'));

// Basic operations
await redis.set('user:1001', JSON.stringify(userData), 'EX', 3600); // 1 hour TTL
const cached = await redis.get('user:1001');
const user = cached ? JSON.parse(cached) : null;`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Pattern 1: Cache-Aside (Lazy Loading)
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Cache-aside is the most common caching pattern. The application is responsible for reading
        from and writing to both the cache and the database. On a read, the application first checks
        the cache. If the data is found (cache hit), it returns immediately. If not (cache miss),
        it reads from the database, stores the result in the cache, and returns it. On a write, the
        application updates the database and invalidates (or updates) the cache entry.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Cache-Aside pattern implementation
class UserService {
  constructor(
    private redis: Redis,
    private db: Database
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    const cacheKey = \`user:\${userId}\`;

    // Step 1: Check cache
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      console.log(\`Cache HIT for \${cacheKey}\`);
      return JSON.parse(cached);
    }

    // Step 2: Cache miss — read from database
    console.log(\`Cache MISS for \${cacheKey}\`);
    const user = await this.db.users.findById(userId);

    if (!user) return null;

    // Step 3: Populate cache with TTL
    await this.redis.setex(
      cacheKey,
      3600,  // 1 hour TTL
      JSON.stringify(user)
    );

    return user;
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    // Step 1: Update database (source of truth)
    const updated = await this.db.users.update(userId, data);

    // Step 2: Invalidate cache
    await this.redis.del(\`user:\${userId}\`);

    // Also invalidate related caches
    await this.redis.del(\`user-profile:\${userId}\`);
    await this.redis.del(\`user-permissions:\${userId}\`);

    return updated;
  }

  async deleteUser(userId: string): Promise<void> {
    await this.db.users.delete(userId);

    // Delete all related cache keys using a pattern
    const keys = await this.redis.keys(\`user*:\${userId}\`);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}`}</code>
      </pre>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Pros:</strong> Simple to implement, only caches data that is actually requested,
        resilient to cache failures (application falls back to database). <strong>Cons:</strong> First
        request for any item is always a cache miss, potential for stale data between cache
        invalidation and next read, application code must manage both cache and database.
      </p>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Pattern 2: Write-Through
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        In the write-through pattern, data is written to the cache and the database simultaneously.
        Every write operation updates both stores before returning to the caller. This ensures the
        cache is always consistent with the database, eliminating the stale data problem of
        cache-aside. The trade-off is higher write latency since both stores must be updated.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Write-Through pattern implementation
class ProductService {
  constructor(
    private redis: Redis,
    private db: Database
  ) {}

  async createProduct(data: CreateProductInput): Promise<Product> {
    // Write to database first
    const product = await this.db.products.create(data);

    // Immediately write to cache (write-through)
    const cacheKey = \`product:\${product.id}\`;
    await this.redis.setex(cacheKey, 7200, JSON.stringify(product));

    // Also update the product list cache
    await this.updateProductListCache(product.categoryId);

    return product;
  }

  async updateProduct(productId: string, data: Partial<Product>): Promise<Product> {
    // Update database
    const product = await this.db.products.update(productId, data);

    // Update cache with new data (not invalidate — write-through)
    const cacheKey = \`product:\${productId}\`;
    await this.redis.setex(cacheKey, 7200, JSON.stringify(product));

    return product;
  }

  async getProduct(productId: string): Promise<Product | null> {
    const cacheKey = \`product:\${productId}\`;
    const cached = await this.redis.get(cacheKey);

    if (cached) return JSON.parse(cached);

    // Fallback to database (cold start or cache eviction)
    const product = await this.db.products.findById(productId);
    if (product) {
      await this.redis.setex(cacheKey, 7200, JSON.stringify(product));
    }
    return product;
  }

  private async updateProductListCache(categoryId: string): Promise<void> {
    const products = await this.db.products.findByCategory(categoryId);
    await this.redis.setex(
      \`products:category:\${categoryId}\`,
      1800,
      JSON.stringify(products)
    );
  }
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Pattern 3: Write-Behind (Write-Back)
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Write-behind reverses the write-through pattern. Data is written to the cache first and
        asynchronously persisted to the database. This provides the lowest write latency because
        the application does not wait for the database write. However, it introduces the risk of
        data loss if the cache fails before the data is persisted. This pattern is ideal for
        high-throughput write scenarios where eventual consistency is acceptable, such as view
        counters, analytics events, or session data.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Write-Behind pattern with Redis Streams for durability
class AnalyticsService {
  private flushInterval: NodeJS.Timeout;

  constructor(
    private redis: Redis,
    private db: Database
  ) {
    // Flush write-behind buffer every 5 seconds
    this.flushInterval = setInterval(() => this.flushToDatabase(), 5000);
  }

  async trackPageView(pageId: string, userId: string): Promise<void> {
    const timestamp = Date.now();

    // Write to cache immediately (fast)
    await this.redis.hincrby(\`page-views:\${pageId}\`, 'count', 1);
    await this.redis.hset(\`page-views:\${pageId}\`, 'lastViewed', timestamp.toString());

    // Add to write-behind queue (Redis Stream for durability)
    await this.redis.xadd(
      'write-behind:page-views',
      '*',  // Auto-generate ID
      'pageId', pageId,
      'userId', userId,
      'timestamp', timestamp.toString()
    );
  }

  private async flushToDatabase(): Promise<void> {
    // Read batch from write-behind queue
    const entries = await this.redis.xrange(
      'write-behind:page-views',
      '-', '+',
      'COUNT', '100'
    );

    if (entries.length === 0) return;

    // Batch insert to database
    const records = entries.map(([id, fields]) => ({
      pageId: fields[1],    // fields is [key, value, key, value, ...]
      userId: fields[3],
      timestamp: new Date(parseInt(fields[5])),
    }));

    try {
      await this.db.pageViews.insertMany(records);

      // Remove processed entries from the stream
      const ids = entries.map(([id]) => id);
      await this.redis.xdel('write-behind:page-views', ...ids);
    } catch (error) {
      console.error('Write-behind flush failed, entries remain in queue:', error);
      // Entries stay in the stream and will be retried on next flush
    }
  }

  async getPageViewCount(pageId: string): Promise<number> {
    // Read from cache (always up-to-date for this pattern)
    const count = await this.redis.hget(\`page-views:\${pageId}\`, 'count');
    return count ? parseInt(count, 10) : 0;
  }
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Pattern 4: Read-Through
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Read-through is similar to cache-aside but the cache itself is responsible for loading data
        from the database on a miss. The application only talks to the cache, never directly to the
        database for reads. This simplifies application code because the caching logic is
        encapsulated in a cache wrapper or middleware layer. You can implement this in application
        code with a generic wrapper function.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Read-Through cache wrapper
class ReadThroughCache {
  constructor(private redis: Redis) {}

  async get<T>(
    key: string,
    loader: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    // Try cache first
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss — use the loader to fetch from source
    const data = await loader();

    // Store in cache (fire-and-forget for read performance)
    this.redis.setex(key, ttlSeconds, JSON.stringify(data)).catch(err =>
      console.error('Cache write failed:', err)
    );

    return data;
  }

  async invalidate(pattern: string): Promise<number> {
    const keys = await this.redis.keys(pattern);
    if (keys.length === 0) return 0;
    return this.redis.del(...keys);
  }
}

// Usage — application code never touches the database directly for reads
const cache = new ReadThroughCache(redis);

app.get('/api/products/:id', async (req, res) => {
  const product = await cache.get(
    \`product:\${req.params.id}\`,
    () => db.products.findById(req.params.id),  // Loader function
    7200  // 2 hour TTL
  );

  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

app.get('/api/categories/:id/products', async (req, res) => {
  const products = await cache.get(
    \`category-products:\${req.params.id}\`,
    () => db.products.findByCategory(req.params.id),
    1800  // 30 minute TTL
  );
  res.json(products);
});`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Preventing Cache Stampede
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        A cache stampede (also called thundering herd) occurs when a popular cache key expires and
        many concurrent requests simultaneously hit the database to rebuild the cache. This can
        overwhelm the database with identical queries. There are several strategies to prevent this.
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Strategy 1: Distributed Locking
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Prevent stampede with distributed locks
class StampedeProtectedCache {
  constructor(private redis: Redis) {}

  async get<T>(
    key: string,
    loader: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached);

    // Try to acquire a lock
    const lockKey = \`lock:\${key}\`;
    const lockAcquired = await this.redis.set(
      lockKey, '1', 'NX', 'EX', 30  // Lock for 30 seconds max
    );

    if (lockAcquired) {
      try {
        // We got the lock — fetch from database
        const data = await loader();
        await this.redis.setex(key, ttlSeconds, JSON.stringify(data));
        return data;
      } finally {
        await this.redis.del(lockKey);
      }
    } else {
      // Another process is rebuilding the cache — wait and retry
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.get(key, loader, ttlSeconds);
    }
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        Strategy 2: Stale-While-Revalidate
      </h3>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Stale-while-revalidate: serve stale data while refreshing in background
class SWRCache {
  constructor(private redis: Redis) {}

  async get<T>(
    key: string,
    loader: () => Promise<T>,
    ttlSeconds: number = 3600,
    staleSeconds: number = 300  // Serve stale data for 5 more minutes
  ): Promise<T | null> {
    const entry = await this.redis.hgetall(\`swr:\${key}\`);

    if (entry.data) {
      const data = JSON.parse(entry.data);
      const expiresAt = parseInt(entry.expiresAt, 10);
      const staleAt = parseInt(entry.staleAt, 10);

      if (Date.now() < expiresAt) {
        // Fresh data — return immediately
        return data;
      }

      if (Date.now() < staleAt) {
        // Stale but within grace period — return stale data
        // and refresh in background
        this.refreshInBackground(key, loader, ttlSeconds, staleSeconds);
        return data;
      }
    }

    // No data or completely expired — blocking fetch
    return this.refresh(key, loader, ttlSeconds, staleSeconds);
  }

  private async refresh<T>(
    key: string,
    loader: () => Promise<T>,
    ttlSeconds: number,
    staleSeconds: number
  ): Promise<T> {
    const data = await loader();
    const now = Date.now();

    await this.redis.hmset(\`swr:\${key}\`, {
      data: JSON.stringify(data),
      expiresAt: (now + ttlSeconds * 1000).toString(),
      staleAt: (now + (ttlSeconds + staleSeconds) * 1000).toString(),
    });

    // Set overall key expiry for cleanup
    await this.redis.expire(\`swr:\${key}\`, ttlSeconds + staleSeconds);

    return data;
  }

  private refreshInBackground<T>(
    key: string,
    loader: () => Promise<T>,
    ttlSeconds: number,
    staleSeconds: number
  ): void {
    // Fire-and-forget background refresh
    this.refresh(key, loader, ttlSeconds, staleSeconds).catch(err =>
      console.error(\`Background refresh failed for \${key}:\`, err)
    );
  }
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Redis Data Structures for Caching
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Redis offers specialized data structures beyond simple strings that can significantly
        improve your caching efficiency. Using the right data structure for each use case reduces
        memory usage, simplifies operations, and enables patterns that are impossible with plain
        key-value storage.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Hash: Cache object fields individually (partial updates, partial reads)
// Better than serializing entire objects when you only need a few fields
await redis.hset('user:1001', {
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin',
  loginCount: '42',
  lastLogin: new Date().toISOString(),
});

// Read specific fields without deserializing entire object
const [name, role] = await redis.hmget('user:1001', 'name', 'role');

// Increment a single field atomically
await redis.hincrby('user:1001', 'loginCount', 1);


// Sorted Set: Leaderboard and ranking cache
await redis.zadd('leaderboard:weekly', 1500, 'player:alice');
await redis.zadd('leaderboard:weekly', 2300, 'player:bob');
await redis.zadd('leaderboard:weekly', 1800, 'player:charlie');

// Get top 10 players with scores
const topPlayers = await redis.zrevrange('leaderboard:weekly', 0, 9, 'WITHSCORES');

// Get a player's rank (0-indexed)
const aliceRank = await redis.zrevrank('leaderboard:weekly', 'player:alice');


// Set: Track unique items (e.g., unique visitors)
await redis.sadd('visitors:2026-02-22', 'user:1001', 'user:1002', 'user:1003');
await redis.sadd('visitors:2026-02-22', 'user:1001'); // Duplicate ignored

const uniqueCount = await redis.scard('visitors:2026-02-22'); // 3

// Intersection: users who visited on both days
const returningVisitors = await redis.sinter(
  'visitors:2026-02-21',
  'visitors:2026-02-22'
);


// List: Recent items cache (e.g., recent activity feed)
await redis.lpush('activity:user:1001', JSON.stringify({
  action: 'comment',
  target: 'post:500',
  timestamp: Date.now(),
}));

// Keep only last 100 activities
await redis.ltrim('activity:user:1001', 0, 99);

// Get last 20 activities
const recentActivity = await redis.lrange('activity:user:1001', 0, 19);`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Cache Invalidation Strategies
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Cache invalidation is famously one of the two hard problems in computer science. Here are
        the main strategies and when to use each one.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>TTL-based expiration</strong> is the simplest approach. Set a time-to-live on every
        cache entry and let Redis automatically expire it. This guarantees eventual consistency
        within the TTL window. Choose TTLs based on how stale the data can be: 5 minutes for
        product prices, 1 hour for user profiles, 24 hours for static reference data.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Event-based invalidation</strong> removes or updates cache entries when the
        underlying data changes. This provides near-real-time consistency but requires your
        application to know all the cache keys affected by a data change. Use Redis Pub/Sub or
        application events to broadcast invalidation signals across multiple application instances.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Version-based invalidation</strong> appends a version number to cache keys. When
        data changes, you increment the version, and old cache entries naturally become unreachable
        (and eventually expire via TTL). This avoids explicit deletion and works well for data that
        changes in bulk, like product catalogs.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Event-based invalidation with Redis Pub/Sub
class CacheInvalidator {
  private subscriber: Redis;

  constructor(private redis: Redis) {
    this.subscriber = redis.duplicate();
    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    this.subscriber.subscribe('cache:invalidate');

    this.subscriber.on('message', async (channel, message) => {
      const { pattern, keys } = JSON.parse(message);

      if (keys) {
        await this.redis.del(...keys);
      } else if (pattern) {
        const matchingKeys = await this.redis.keys(pattern);
        if (matchingKeys.length > 0) {
          await this.redis.del(...matchingKeys);
        }
      }
    });
  }

  // Call this when data changes
  async invalidate(keys: string[]): Promise<void> {
    // Publish to all application instances
    await this.redis.publish('cache:invalidate', JSON.stringify({ keys }));
  }

  async invalidatePattern(pattern: string): Promise<void> {
    await this.redis.publish('cache:invalidate', JSON.stringify({ pattern }));
  }
}

// Usage
const invalidator = new CacheInvalidator(redis);

// When a product is updated:
await db.products.update(productId, newData);
await invalidator.invalidate([
  \`product:\${productId}\`,
  \`category-products:\${product.categoryId}\`,
]);`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Cache Warming
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Cache warming pre-populates the cache with frequently accessed data before traffic arrives.
        This prevents the cold-start problem where the first requests after a deployment or cache
        flush all hit the database. Implement cache warming as part of your deployment pipeline or
        as a periodic background job.
      </p>
      <pre style={{ background: 'var(--bg-input)', borderRadius: 8, padding: 16, overflowX: 'auto' as const, border: '1px solid var(--border-color)' }}>
        <code style={{ fontFamily: 'monospace' }}>{`// Cache warming script — run during deployment
async function warmCache(redis: Redis, db: Database) {
  console.log('Starting cache warm-up...');

  // Warm top 100 most viewed products
  const topProducts = await db.products.findTopViewed(100);
  const pipeline = redis.pipeline();

  for (const product of topProducts) {
    pipeline.setex(
      \`product:\${product.id}\`,
      7200,
      JSON.stringify(product)
    );
  }

  // Warm category listings
  const categories = await db.categories.findAll();
  for (const category of categories) {
    const products = await db.products.findByCategory(category.id);
    pipeline.setex(
      \`category-products:\${category.id}\`,
      1800,
      JSON.stringify(products)
    );
  }

  // Warm site-wide config
  const config = await db.siteConfig.get();
  pipeline.setex('site:config', 86400, JSON.stringify(config));

  // Execute all writes in one round trip
  await pipeline.exec();

  console.log(\`Cache warmed: \${topProducts.length} products, \${categories.length} categories\`);
}`}</code>
      </pre>

      <h2 style={{ fontSize: 24, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
        Monitoring and Best Practices
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Monitor your cache hit ratio — this is the single most important metric. A well-tuned
        cache should achieve a hit ratio above 90%. Track cache memory usage to avoid eviction
        due to memory pressure. Monitor latency percentiles (p50, p95, p99) to catch performance
        degradation early.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Use consistent key naming conventions.</strong> Adopt a pattern like
        <code style={{ fontFamily: 'monospace' }}>entity:id</code> or <code style={{ fontFamily: 'monospace' }}>service:entity:id:field</code> and document it.
        Consistent naming makes debugging easier and prevents key collisions.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Always set TTLs.</strong> Never cache data without a TTL. Even for data that rarely
        changes, set a long TTL (24 hours) as a safety net. Without TTLs, stale data can persist
        indefinitely and cause subtle bugs.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Use Redis pipelines for batch operations.</strong> Pipelines send multiple commands
        to Redis in a single network round trip, reducing latency by orders of magnitude when
        performing bulk reads or writes.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Handle cache failures gracefully.</strong> Your application should never crash because
        Redis is unavailable. Wrap cache operations in try-catch blocks and fall back to the
        database. Redis is an optimization layer, not a data source.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        <strong>Compress large values.</strong> If you are caching large JSON objects (over 1KB),
        consider compressing them with gzip or lz4 before storing in Redis. This reduces memory
        usage and network transfer time at the cost of CPU for compression and decompression.
      </p>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
        Redis caching, when implemented correctly with the right patterns, transforms application
        performance. Start with cache-aside for simplicity, measure your hit ratios, and evolve
        toward more sophisticated patterns as your requirements demand. The key is to treat caching
        as a first-class engineering concern, not an afterthought.
      </p>
    </article>
  );
}
