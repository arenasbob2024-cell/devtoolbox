'use client';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'System Design Interview Guide: Scalability, Architecture & Patterns (2026)',
    description: 'A comprehensive system design guide covering scalability, load balancers, caching, database sharding, CAP theorem, message queues, rate limiting, URL shortener design, social media feed design, CDN, microservices, and back-of-envelope calculations.',
  },
  zh: {
    title: '系统设计面试指南：可扩展性、架构与模式（2026）',
    description: '系统设计综合指南，涵盖可扩展性、负载均衡器、缓存、数据库分片、CAP定理、消息队列、限流、URL缩短器设计、社交媒体信息流设计、CDN、微服务和估算计算。',
  },
};

const codeStyle: React.CSSProperties = {
  background: 'var(--bg-input)',
  borderRadius: 8,
  padding: 16,
  overflowX: 'auto',
  fontSize: 13,
  lineHeight: 1.7,
  fontFamily: 'monospace',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)',
  margin: '12px 0',
};
const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 40,
  marginBottom: 16,
  color: 'var(--text-primary)',
};
const h3Style: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  marginTop: 24,
  color: 'var(--text-primary)',
};
const pStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  lineHeight: 1.8,
  marginBottom: 12,
};
const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: 14,
  margin: '16px 0',
};
const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid var(--border-color)',
  fontWeight: 700,
  color: 'var(--text-primary)',
  background: 'var(--bg-input)',
};
const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border-color)',
  color: 'var(--text-secondary)',
};

export default function SystemDesignGuide({ lang }: { lang: string }) {
  const t = translations[lang] || translations['en'];
  void t;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How should I approach a system design interview?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Follow a structured framework: clarify requirements (functional and non-functional), estimate scale (QPS, storage, bandwidth), propose high-level design, deep dive into components, then identify bottlenecks and trade-offs. Always drive the conversation and ask clarifying questions before jumping into design.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between horizontal and vertical scaling?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vertical scaling (scale up) means adding more CPU, RAM, or disk to a single server. It has a hard ceiling and creates a single point of failure. Horizontal scaling (scale out) adds more servers behind a load balancer. It is theoretically unlimited, fault-tolerant, but requires stateless services and distributed data management.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the CAP theorem?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CAP theorem states that a distributed system can only guarantee two of three properties simultaneously: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (system works despite network failures). Since network partitions always happen, you must choose between CP (consistent, may be unavailable) and AP (available, may return stale data).',
        },
      },
      {
        '@type': 'Question',
        name: 'What caching strategies should I know for system design?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key caching strategies include: Cache-aside (app checks cache first, writes to DB on miss), Write-through (write to cache and DB simultaneously), Write-back (write to cache, async flush to DB), and Read-through (cache handles DB reads transparently). Cache invalidation strategies include TTL-based expiry, event-driven invalidation, and cache-aside with versioning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does database sharding work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sharding partitions data across multiple database instances (shards). Each shard holds a subset of rows. Common sharding keys include user ID (range or hash-based), geographic region, or consistent hashing. Challenges include cross-shard queries, hotspot shards, and rebalancing when adding shards. Consistent hashing minimizes data movement when the shard count changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Kafka and RabbitMQ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kafka is a distributed log designed for high-throughput event streaming, with messages retained for a configurable period and consumers pulling at their own pace. RabbitMQ is a traditional message broker with push-based delivery, message acknowledgments, and routing via exchanges. Use Kafka for event sourcing, analytics, and audit logs. Use RabbitMQ for task queues, RPC patterns, and complex routing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you design a URL shortener like bit.ly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A URL shortener needs: a unique short code generator (base62 encoding of an auto-increment ID or MD5 hash prefix), a key-value store (Redis for hot URLs, DynamoDB/Cassandra for persistence), a redirect service (301 for permanent, 302 for analytics tracking), rate limiting per user, and analytics (click counts, geographic data). Scale with read replicas since reads vastly outnumber writes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the main rate limiting algorithms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The four main algorithms are: Token Bucket (tokens added at fixed rate, burst allowed up to bucket size), Leaky Bucket (requests queue and drain at fixed rate, no burst), Fixed Window Counter (count requests in fixed time window, boundary burst problem), and Sliding Window Log (track exact timestamps, most accurate but memory-intensive). Token bucket is the most widely used because it allows controlled bursting.',
        },
      },
    ],
  };

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>TL;DR</strong>
        <p style={{ margin: 0, color: '#0c4a6e', lineHeight: 1.7 }}>
          System design interviews test your ability to architect large-scale distributed systems. Start by clarifying requirements, then estimate scale (QPS, storage), propose a high-level design with load balancers, caching (Redis), databases (SQL + sharding or NoSQL), and message queues (Kafka). Discuss CAP theorem trade-offs, rate limiting algorithms, and walk through a concrete example like URL shortener or social media feed. Always identify bottlenecks and propose solutions.
        </p>
      </div>

      <p style={pStyle}>
        System design interviews are among the most challenging technical interviews — they are open-ended, require broad knowledge, and have no single correct answer. Companies like Google, Meta, Amazon, and Uber use system design interviews to evaluate senior engineers on their ability to architect scalable, reliable, and maintainable systems. This comprehensive guide covers every topic you need: from fundamental scaling concepts to designing real-world systems like URL shorteners and social media feeds, with practical patterns and back-of-envelope estimation techniques.
      </p>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: 12, fontSize: 16 }}>Key Takeaways</strong>
        <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', lineHeight: 2 }}>
          <li>Use a structured framework: requirements → estimation → high-level design → deep dive → bottlenecks</li>
          <li>Horizontal scaling is preferred; design stateless services from the start</li>
          <li>Cache aggressively at every layer: CDN, application cache (Redis), database query cache</li>
          <li>CAP theorem forces a trade-off: choose CP or AP based on your use case</li>
          <li>Shard databases by user ID or consistent hashing; use read replicas for read-heavy workloads</li>
          <li>Kafka for event streaming and audit logs; RabbitMQ for task queues</li>
          <li>Token bucket is the most practical rate limiting algorithm for most APIs</li>
          <li>Back-of-envelope math: 1M DAU * 10 requests = 10M req/day = ~115 QPS</li>
        </ul>
      </div>

      {/* Section 1: Interview Approach */}
      <h2 style={h2Style}>How to Approach System Design Interviews</h2>
      <p style={pStyle}>
        System design interviews succeed or fail based on how well you structure your thinking. Interviewers are not looking for the perfect answer — they want to see how you break down ambiguous problems, ask the right clarifying questions, reason about trade-offs, and communicate your thinking clearly. A structured framework makes the difference.
      </p>

      <h3 style={h3Style}>The Five-Step Framework</h3>
      <pre style={codeStyle}><code>{`STEP 1: Clarify Requirements (5 minutes)
  Functional requirements:
  - What does the system need to do?
  - Who are the users? What actions do they take?
  - Any specific features in scope / out of scope?

  Non-functional requirements:
  - Scale: How many daily active users (DAU)?
  - Availability: 99.9% (8.7h/year downtime) vs 99.99% (52min/year)?
  - Latency: P99 latency target? Read-heavy or write-heavy?
  - Consistency: Strong consistency or eventual consistency acceptable?
  - Durability: Can we lose any data?

STEP 2: Estimate Scale (5 minutes)
  - DAU → QPS (queries per second)
  - Storage requirements per year
  - Bandwidth: inbound and outbound
  - Number of servers needed

STEP 3: High-Level Design (10-15 minutes)
  - Draw the major components: clients, DNS, CDN, load balancers,
    web servers, app servers, cache, database, message queues
  - Explain the data flow for the main use case (e.g., write a tweet)

STEP 4: Deep Dive (15-20 minutes)
  - Go deep on 2-3 critical components the interviewer asks about
  - Justify technology choices (why PostgreSQL vs Cassandra?)
  - Discuss the database schema
  - Explain the API design

STEP 5: Identify Bottlenecks and Trade-offs (5 minutes)
  - Single points of failure?
  - How does the system handle 10x traffic?
  - What fails first? How do you monitor it?
  - What would you do differently given more time?`}</code></pre>

      <h3 style={h3Style}>Common Mistakes to Avoid</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Mistake</th>
            <th style={thStyle}>What to Do Instead</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Jumping into design immediately</td>
            <td style={tdStyle}>Spend 5 minutes clarifying requirements first</td>
          </tr>
          <tr>
            <td style={tdStyle}>No back-of-envelope estimation</td>
            <td style={tdStyle}>Always estimate QPS, storage, and bandwidth before designing</td>
          </tr>
          <tr>
            <td style={tdStyle}>Over-engineering from the start</td>
            <td style={tdStyle}>Start simple, then add complexity to solve identified bottlenecks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Ignoring the interviewer</td>
            <td style={tdStyle}>Ask clarifying questions, look for hints and feedback</td>
          </tr>
          <tr>
            <td style={tdStyle}>Forgetting failure scenarios</td>
            <td style={tdStyle}>Discuss what happens when each component fails</td>
          </tr>
          <tr>
            <td style={tdStyle}>Vague technology choices</td>
            <td style={tdStyle}>Justify every choice: "I choose Redis because..."</td>
          </tr>
        </tbody>
      </table>

      {/* Section 2: Scalability */}
      <h2 style={h2Style}>Scalability Fundamentals: Horizontal vs Vertical Scaling</h2>
      <p style={pStyle}>
        Scalability is the system's ability to handle increased load. The two fundamental approaches — vertical scaling and horizontal scaling — have very different trade-offs. Almost every large-scale system relies on horizontal scaling, but understanding when and why matters for system design interviews.
      </p>

      <h3 style={h3Style}>Vertical Scaling (Scale Up)</h3>
      <p style={pStyle}>
        Vertical scaling means upgrading a single server to a more powerful machine: more CPU cores, RAM, faster storage, or higher network bandwidth. It is the simplest approach — no application changes required. However, vertical scaling has hard physical limits (you cannot add infinite RAM to a single machine), is expensive at high specs, and creates a single point of failure. It also requires downtime for hardware upgrades in many cases.
      </p>
      <pre style={codeStyle}><code>{`Vertical Scaling Example:
  t3.micro  →  2 vCPU,  1 GB RAM    ($0.01/hr)
  t3.large  →  2 vCPU,  8 GB RAM    ($0.08/hr)
  m5.4xlarge → 16 vCPU, 64 GB RAM   ($0.77/hr)
  x1e.32xlarge → 128 vCPU, 3,904 GB RAM ($26.69/hr)

  Limits:
  - Single machine ceiling (AWS largest: 448 vCPU, 24 TB RAM)
  - Single point of failure (machine dies = outage)
  - Hardware upgrades often require downtime
  - Non-linear cost increase at high specs

  When to use vertical scaling:
  - Databases (PostgreSQL, MySQL) — easier to scale vertically first
  - Monolithic applications with shared state
  - Development/staging environments
  - When the bottleneck is CPU-bound on a single process`}</code></pre>

      <h3 style={h3Style}>Horizontal Scaling (Scale Out)</h3>
      <p style={pStyle}>
        Horizontal scaling adds more servers of the same type, distributing load across all instances behind a load balancer. It is theoretically unlimited, naturally fault-tolerant (losing one server is acceptable), and allows for cost-effective scaling using commodity hardware. The requirement is that your services must be stateless — session data, user context, and ephemeral state must be stored externally (Redis, database) rather than in the server process.
      </p>
      <pre style={codeStyle}><code>{`Horizontal Scaling Example:
  1 server (10K req/sec)
  → 10 servers behind load balancer (100K req/sec)
  → 100 servers behind load balancer (1M req/sec)
  → Add servers automatically with auto-scaling groups

  Requirements for horizontal scaling:
  ✓ Stateless services (no in-process session storage)
  ✓ Shared external session store (Redis, Memcached)
  ✓ Load balancer to distribute traffic
  ✓ Shared file storage (S3, NFS) — no local disk state
  ✓ Distributed cache consistency strategy
  ✓ Database can handle connections from N servers

  Auto-scaling policy (AWS example):
  - Scale out: add instance when CPU > 70% for 5 minutes
  - Scale in: remove instance when CPU < 30% for 15 minutes
  - Minimum: 2 instances (HA), Maximum: 50 instances
  - Warm-up time: 3 minutes (let new instance start before routing)`}</code></pre>

      <h3 style={h3Style}>Stateless vs Stateful Services</h3>
      <pre style={codeStyle}><code>{`Stateful (hard to scale horizontally):
  // Session stored in server memory — only works with 1 server
  // or sticky sessions (a specific user always goes to same server)
  app.post('/login', (req, res) => {
    req.session.userId = user.id;  // in-memory session
    req.session.cart = [];          // lost if server restarts
  });

Stateless (scales horizontally):
  // All state in Redis or JWT — any server can handle any request
  app.post('/login', async (req, res) => {
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
    // OR store session in Redis
    await redis.setex('session:' + sessionId, 3600, JSON.stringify({ userId: user.id }));
    res.json({ token });
  });

  // Any of 100 servers can authenticate this token
  app.get('/profile', authenticate, (req, res) => {
    res.json({ userId: req.user.id });
  });`}</code></pre>

      {/* Section 3: Load Balancers */}
      <h2 style={h2Style}>Load Balancers: L4 vs L7 and Routing Algorithms</h2>
      <p style={pStyle}>
        A load balancer distributes incoming traffic across a pool of backend servers, preventing any single server from becoming a bottleneck. Load balancers also provide health checking (automatically removing unhealthy servers), SSL termination, and connection pooling. Understanding the difference between Layer 4 and Layer 7 load balancers is critical for system design interviews.
      </p>

      <h3 style={h3Style}>Layer 4 (Transport) vs Layer 7 (Application) Load Balancers</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>L4 Load Balancer</th>
            <th style={thStyle}>L7 Load Balancer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Operates at</td>
            <td style={tdStyle}>TCP/UDP transport layer</td>
            <td style={tdStyle}>HTTP/HTTPS application layer</td>
          </tr>
          <tr>
            <td style={tdStyle}>Routing based on</td>
            <td style={tdStyle}>IP address, port</td>
            <td style={tdStyle}>URL path, headers, cookies, content</td>
          </tr>
          <tr>
            <td style={tdStyle}>Performance</td>
            <td style={tdStyle}>Very fast, minimal processing</td>
            <td style={tdStyle}>Slower (inspects packet content)</td>
          </tr>
          <tr>
            <td style={tdStyle}>SSL termination</td>
            <td style={tdStyle}>Pass-through or terminate</td>
            <td style={tdStyle}>Always terminates SSL</td>
          </tr>
          <tr>
            <td style={tdStyle}>Content-based routing</td>
            <td style={tdStyle}>Not possible</td>
            <td style={tdStyle}>Yes (/api/* → API servers, /* → web)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Examples</td>
            <td style={tdStyle}>AWS NLB, HAProxy TCP mode</td>
            <td style={tdStyle}>AWS ALB, Nginx, HAProxy HTTP mode</td>
          </tr>
          <tr>
            <td style={tdStyle}>Best for</td>
            <td style={tdStyle}>Non-HTTP protocols, ultra-low latency</td>
            <td style={tdStyle}>HTTP microservices, A/B testing, auth</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Load Balancing Algorithms</h3>
      <pre style={codeStyle}><code>{`1. Round Robin (default for most LBs)
   Request 1 → Server A
   Request 2 → Server B
   Request 3 → Server C
   Request 4 → Server A  (cycle repeats)

   Best for: servers with identical specs and similar request costs
   Problem: ignores current server load — a heavy request on Server A
            still sends the next request to Server A in rotation

2. Weighted Round Robin
   Server A weight=3, Server B weight=1, Server C weight=2
   → A, A, A, B, C, C, A, A, A, B, C, C ...

   Best for: servers with different hardware capacities

3. Least Connections
   Always routes to the server with the fewest active connections
   Server A: 100 connections
   Server B: 50 connections  ← new request goes here
   Server C: 80 connections

   Best for: long-lived connections (WebSocket, streaming)
             where some requests take much longer than others

4. Least Response Time
   Routes to the server with the lowest combination of
   active connections AND average response time

   Best for: maximizing end-user performance

5. IP Hash (Sticky Sessions)
   hash(client_ip) % num_servers = always same server for that IP

   Best for: stateful applications that cannot use external session store
   Problem: uneven distribution if IP addresses cluster; breaks if a
            server is removed (all its users get reassigned)

6. Random
   Routes to a randomly selected server
   Good for: simple setups, nearly identical to round robin at scale

7. Consistent Hashing
   Used by distributed caches and databases to minimize remapping
   when servers are added/removed. Only K/N keys need to be remapped
   (K = number of keys, N = number of servers).`}</code></pre>

      <h3 style={h3Style}>Health Checks and Failover</h3>
      <pre style={codeStyle}><code>{`# Nginx upstream with health checks
upstream api_servers {
    server api1.internal:8080 weight=3;
    server api2.internal:8080 weight=3;
    server api3.internal:8080 weight=2;

    # Passive health check: mark server as down after 3 failures
    # within 30 seconds; retry after 30 seconds
    server api4.internal:8080 max_fails=3 fail_timeout=30s backup;
}

# Active health check (Nginx Plus / HAProxy)
# Sends GET /health every 5 seconds, expects HTTP 200
# Removes server from pool if 2 consecutive checks fail
# Re-adds server after 3 consecutive successful checks`}</code></pre>

      {/* Section 4: Caching */}
      <h2 style={h2Style}>Caching Strategies: CDN, Redis, and Cache Invalidation</h2>
      <p style={pStyle}>
        Caching is one of the most powerful tools for scaling read-heavy systems. A well-designed caching layer can reduce database load by 90% or more, dramatically lowering latency and infrastructure costs. However, caching introduces complexity: stale data, cache invalidation, and cache stampedes. Understanding caching at every layer of the stack is essential for system design.
      </p>

      <h3 style={h3Style}>Caching Layers in a Web Application</h3>
      <pre style={codeStyle}><code>{`Client Request Flow (with all cache layers):

  Browser Cache (private)
    ↓ miss
  CDN Cache (shared, edge location, ~10ms)
    ↓ miss
  Load Balancer / Reverse Proxy Cache (Nginx, Varnish, ~1ms)
    ↓ miss
  Application Cache (Redis, Memcached, ~0.5ms)
    ↓ miss
  Database Query Cache (MySQL query cache, ~5ms)
    ↓ miss
  Database Storage (HDD: ~10ms, SSD: ~1ms, RAM: ~0.1ms)

Cache Hit Ratios (typical):
  CDN:         90-99% for static assets (images, JS, CSS)
  Redis:       70-90% for frequently accessed data
  DB cache:    30-60% depending on query patterns
  Browser:     80-95% for repeat visitors (with proper Cache-Control)`}</code></pre>

      <h3 style={h3Style}>Cache-Aside (Lazy Loading)</h3>
      <pre style={codeStyle}><code>{`// Most common pattern — application manages cache explicitly
async function getUserById(userId: string) {
  // 1. Check cache first
  const cached = await redis.get('user:' + userId);
  if (cached) {
    return JSON.parse(cached);  // Cache hit — return immediately
  }

  // 2. Cache miss — fetch from database
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

  // 3. Populate cache for next request (TTL = 1 hour)
  await redis.setex('user:' + userId, 3600, JSON.stringify(user));

  return user;
}

// On user update — invalidate cache
async function updateUser(userId: string, data: Partial<User>) {
  await db.query('UPDATE users SET ... WHERE id = $1', [userId]);
  await redis.del('user:' + userId);  // Force cache refresh on next read
}

Pros:  Only caches requested data; resilient to cache failure (falls through to DB)
Cons:  First request always hits DB; potential for stale data between invalidation`}</code></pre>

      <h3 style={h3Style}>Write-Through Cache</h3>
      <pre style={codeStyle}><code>{`// Write to cache AND database synchronously on every write
async function updateUser(userId: string, data: Partial<User>) {
  // Write to database first
  const user = await db.query('UPDATE users SET ... WHERE id = $1 RETURNING *', [userId]);

  // Immediately update cache — cache is always consistent
  await redis.setex('user:' + userId, 3600, JSON.stringify(user));

  return user;
}

Pros:  Cache always up-to-date; no stale reads after write
Cons:  Write latency increases (must wait for both DB and cache);
       cache may contain data that is never read (wasted memory)
Best for: user profiles, product catalog — data read frequently after update`}</code></pre>

      <h3 style={h3Style}>Write-Back (Write-Behind) Cache</h3>
      <pre style={codeStyle}><code>{`// Write to cache immediately; flush to DB asynchronously
async function updateViewCount(postId: string) {
  // Instant write to cache — returns immediately
  await redis.incr('post:' + postId + ':views');

  // Background worker flushes to DB every 30 seconds
  // (or on cache eviction, on shutdown)
}

// Background flush job
setInterval(async () => {
  const keys = await redis.keys('post:*:views');
  for (const key of keys) {
    const count = await redis.get(key);
    const postId = key.split(':')[1];
    await db.query('UPDATE posts SET views = $1 WHERE id = $2', [count, postId]);
  }
}, 30_000);

Pros:  Extremely fast writes; reduces DB write pressure; good for counters
Cons:  Data loss risk if cache fails before flush; complex consistency management
Best for: analytics counters, like counts, view counts, leaderboards`}</code></pre>

      <h3 style={h3Style}>Cache Invalidation Strategies</h3>
      <pre style={codeStyle}><code>{`1. TTL (Time-to-Live) — Simplest approach
   redis.setex('key', 300, value)  // Expires in 5 minutes
   Problem: stale data for up to TTL duration

2. Event-Driven Invalidation
   On database write → publish invalidation event
   Cache service subscribes → deletes affected keys
   // Using Redis Pub/Sub or Kafka
   publisher.publish('cache-invalidate', { key: 'user:' + userId });

3. Cache Versioning (best for complex invalidation)
   // Store version number in cache key
   const version = await redis.incr('user:' + userId + ':version');
   await redis.set('user:' + userId + ':v' + version, userData);
   // Old versions automatically become unreachable

4. Cache Stampede Prevention
   // Problem: Many requests miss cache simultaneously, all hit DB
   // Solution: Use mutex lock or probabilistic early expiration

   async function getCachedUser(userId: string) {
     const cached = await redis.get('user:' + userId);
     if (cached) return JSON.parse(cached);

     // Only one request fetches from DB; others wait
     const lock = await redis.set('lock:user:' + userId, '1',
       'EX', 5, 'NX');  // SET if Not eXists, expire 5s

     if (lock) {
       const user = await db.fetchUser(userId);
       await redis.setex('user:' + userId, 3600, JSON.stringify(user));
       await redis.del('lock:user:' + userId);
       return user;
     } else {
       // Wait for lock holder to populate cache
       await sleep(100);
       return getCachedUser(userId);
     }
   }`}</code></pre>

      {/* Section 5: Database Scaling */}
      <h2 style={h2Style}>Database Scaling: Read Replicas, Sharding, and Partitioning</h2>
      <p style={pStyle}>
        The database is typically the first bottleneck in a scaling system. A single database server can handle millions of queries per day, but beyond that, you need read replicas, sharding, or a purpose-built NoSQL database. Understanding when and how to scale your database is one of the most important system design skills.
      </p>

      <h3 style={h3Style}>Read Replicas</h3>
      <pre style={codeStyle}><code>{`Read Replica Setup:
  Primary (writes) → Replica 1 (reads)
                   → Replica 2 (reads)
                   → Replica 3 (reads)

  Replication lag: typically 10ms–100ms (async replication)
  Use case: 80% reads, 20% writes (typical web app)

Application code:
  const primaryDB = new Pool({ host: 'primary.db.internal' });
  const replicaDB = new Pool({ host: 'replica.db.internal' });

  // Writes always go to primary
  async function createUser(user: User) {
    return primaryDB.query('INSERT INTO users ...', [user]);
  }

  // Reads use replica (with eventual consistency accepted)
  async function getUser(id: string) {
    return replicaDB.query('SELECT * FROM users WHERE id = $1', [id]);
  }

  // Critical reads (e.g., after just writing) use primary
  async function getUserAfterUpdate(id: string) {
    return primaryDB.query('SELECT * FROM users WHERE id = $1', [id]);
  }

Scaling read replicas:
  - Add replicas to handle more read traffic
  - Use a read load balancer (PgBouncer, ProxySQL) to distribute reads
  - Hot data: cache in Redis to avoid even hitting replicas
  - RDS Aurora: 15 replicas, auto-failover in 30 seconds`}</code></pre>

      <h3 style={h3Style}>Sharding (Horizontal Partitioning)</h3>
      <p style={pStyle}>
        Sharding splits data across multiple database instances (shards), each responsible for a subset of rows. Unlike read replicas (which copy all data), sharding partitions data so no single shard holds everything. This allows each shard to be a smaller, more manageable database. Sharding is necessary when a single database (even with replicas) cannot handle write throughput or when the dataset is too large for one server.
      </p>
      <pre style={codeStyle}><code>{`Sharding Strategies:

1. Range-Based Sharding
   user_id 1–1M        → Shard 1
   user_id 1M–2M       → Shard 2
   user_id 2M–3M       → Shard 3

   Pros: Simple to reason about; easy range queries
   Cons: Hotspot problem — new users concentrate on latest shard

2. Hash-Based Sharding
   shard = hash(user_id) % num_shards

   user_id=1001: hash(1001) % 4 = Shard 2
   user_id=1002: hash(1002) % 4 = Shard 0
   user_id=1003: hash(1003) % 4 = Shard 3

   Pros: Even distribution; no hotspots
   Cons: Range queries require hitting all shards;
         adding shards requires rehashing (most data moves)

3. Consistent Hashing (best for dynamic shard count)
   Place shards on a virtual ring (0–2^32)
   Each shard owns a range of the ring
   Adding a shard: only the adjacent shard's data moves

   // Virtual nodes (vnodes) improve balance
   // Each physical shard has 150 virtual positions on the ring

4. Directory-Based Sharding
   Lookup table: user_id → shard_id
   Most flexible but adds lookup overhead;
   directory itself can become a bottleneck

Routing:
   Application → Shard Router → Correct Shard
   // Router must know the sharding key to route correctly
   function getShardForUser(userId: string): Database {
     const shardIndex = hashCode(userId) % NUM_SHARDS;
     return shards[shardIndex];
   }`}</code></pre>

      <h3 style={h3Style}>SQL vs NoSQL for Scaling</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Aspect</th>
            <th style={thStyle}>SQL (PostgreSQL, MySQL)</th>
            <th style={thStyle}>NoSQL (DynamoDB, Cassandra, MongoDB)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Schema</td>
            <td style={tdStyle}>Rigid, defined upfront</td>
            <td style={tdStyle}>Flexible, schema-less or schema-on-read</td>
          </tr>
          <tr>
            <td style={tdStyle}>ACID transactions</td>
            <td style={tdStyle}>Full ACID support</td>
            <td style={tdStyle}>Limited or eventual consistency</td>
          </tr>
          <tr>
            <td style={tdStyle}>Scaling</td>
            <td style={tdStyle}>Vertical primary; sharding complex</td>
            <td style={tdStyle}>Horizontal scaling built-in</td>
          </tr>
          <tr>
            <td style={tdStyle}>Query flexibility</td>
            <td style={tdStyle}>Arbitrary SQL queries, JOINs</td>
            <td style={tdStyle}>Limited queries; must know access patterns</td>
          </tr>
          <tr>
            <td style={tdStyle}>Write throughput</td>
            <td style={tdStyle}>~10K–50K writes/sec per node</td>
            <td style={tdStyle}>~100K–1M writes/sec (Cassandra)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Best for</td>
            <td style={tdStyle}>Financial data, user accounts, complex queries</td>
            <td style={tdStyle}>Time-series, social graphs, logs, catalogs</td>
          </tr>
        </tbody>
      </table>

      {/* Section 6: CAP Theorem */}
      <h2 style={h2Style}>CAP Theorem and Consistency Models</h2>
      <p style={pStyle}>
        CAP theorem (Brewer's theorem) is a fundamental principle of distributed systems. It states that a distributed data store can only guarantee two of three properties simultaneously: Consistency, Availability, and Partition Tolerance. Since network partitions are inevitable in any distributed system, you must choose between consistency and availability during a partition event.
      </p>

      <h3 style={h3Style}>The Three Properties Explained</h3>
      <pre style={codeStyle}><code>{`C — Consistency:
  Every read receives the most recent write or an error.
  All nodes see the same data at the same time.
  Example: After writing balance=\$100, all reads return \$100.

A — Availability:
  Every request receives a response (not an error),
  but the response might not be the most recent data.
  System stays responsive even if some nodes are down.

P — Partition Tolerance:
  System continues to operate despite network partitions
  (messages being dropped or delayed between nodes).
  You CANNOT avoid partitions in a distributed system.
  Therefore P is always required — choose C or A.

CP Systems (sacrifice availability):
  - Choose consistency over availability during partitions
  - May return errors or refuse writes to avoid stale reads
  - Examples: HBase, Zookeeper, Redis (with certain configs)
  - Use case: banking, financial ledgers, inventory management

AP Systems (sacrifice consistency):
  - Choose availability over consistency during partitions
  - Returns potentially stale data rather than errors
  - Examples: DynamoDB (default), Cassandra, CouchDB
  - Use case: social media, product catalogs, analytics

CA Systems — impossible in a real distributed system
  (can only exist if you never have network partitions, i.e., single node)`}</code></pre>

      <h3 style={h3Style}>Consistency Models Beyond CAP</h3>
      <pre style={codeStyle}><code>{`1. Strong Consistency (Linearizability)
   All reads see the most recent committed write.
   After write completes, all nodes return new value immediately.
   Cost: Higher latency (must wait for all replicas to acknowledge).
   Example: Google Spanner (uses TrueTime for global consistency)

2. Eventual Consistency
   All nodes will eventually converge to the same value.
   Reads may return stale data during convergence window.
   Cost: Potential for stale reads.
   Example: Amazon DynamoDB (default), Cassandra

3. Read-Your-Writes Consistency
   After you write data, you will always read your own writes.
   Other users may still see stale data.
   Implementation: Route your reads to the primary for 1 second
                   after a write, then switch to replica.
   Example: Facebook "reading your own posts" guarantee

4. Monotonic Read Consistency
   Once you've read a value, you will never read an older value.
   Example: Sticky sessions to same replica

5. Causal Consistency
   Causally related operations are seen in order.
   Example: Reply to a post always seen after the original post.

PACELC Model (extends CAP):
  When no Partition: trade-off between Latency and Consistency
  DynamoDB: PA/EL — prefer availability and low latency
  Spanner:  PC/EC — prefer consistency even at the cost of latency`}</code></pre>

      {/* Section 7: Message Queues */}
      <h2 style={h2Style}>Message Queues and Event Streaming: Kafka, RabbitMQ, SQS</h2>
      <p style={pStyle}>
        Message queues decouple services, enabling asynchronous communication, load leveling, and fault tolerance. Instead of Service A calling Service B directly (tight coupling), A publishes a message to a queue that B consumes at its own pace. This pattern is essential for building resilient, scalable systems. Understanding Kafka vs RabbitMQ vs SQS trade-offs is a common system design interview topic.
      </p>

      <h3 style={h3Style}>When to Use Message Queues</h3>
      <pre style={codeStyle}><code>{`Synchronous (direct) call — use when:
  - You need the response immediately
  - The operation is fast (< 100ms)
  - You need transactional guarantees
  - Example: Check user authentication, query product price

Asynchronous (message queue) — use when:
  - The operation is slow (email, video encoding, reports)
  - You want to decouple producer from consumer
  - Consumer is unreliable (can fail and retry)
  - You need to fan out to multiple consumers
  - Load leveling: absorb traffic spikes without dropping requests

Real-world examples:
  User registers → publish to queue → email welcome (async)
  Order placed → publish to queue → inventory, shipping, billing (fan-out)
  Video uploaded → publish to queue → transcoding workers (1-N relationship)
  Payment processed → publish to audit log → compliance system (event streaming)`}</code></pre>

      <h3 style={h3Style}>Kafka vs RabbitMQ vs AWS SQS</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Feature</th>
            <th style={thStyle}>Apache Kafka</th>
            <th style={thStyle}>RabbitMQ</th>
            <th style={thStyle}>AWS SQS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Model</td>
            <td style={tdStyle}>Distributed log (pull)</td>
            <td style={tdStyle}>Message broker (push)</td>
            <td style={tdStyle}>Managed queue (pull)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Message retention</td>
            <td style={tdStyle}>Days to forever (configurable)</td>
            <td style={tdStyle}>Until acknowledged</td>
            <td style={tdStyle}>Up to 14 days</td>
          </tr>
          <tr>
            <td style={tdStyle}>Throughput</td>
            <td style={tdStyle}>Millions/sec per cluster</td>
            <td style={tdStyle}>Thousands/sec</td>
            <td style={tdStyle}>Thousands/sec (auto-scales)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Ordering</td>
            <td style={tdStyle}>Per partition (strict)</td>
            <td style={tdStyle}>Per queue</td>
            <td style={tdStyle}>FIFO (optional), best-effort standard</td>
          </tr>
          <tr>
            <td style={tdStyle}>Consumer groups</td>
            <td style={tdStyle}>Yes (independent cursors)</td>
            <td style={tdStyle}>Competing consumers</td>
            <td style={tdStyle}>Multiple consumers (competing)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Replay</td>
            <td style={tdStyle}>Yes (seek to any offset)</td>
            <td style={tdStyle}>No (once consumed, gone)</td>
            <td style={tdStyle}>No</td>
          </tr>
          <tr>
            <td style={tdStyle}>Best for</td>
            <td style={tdStyle}>Event sourcing, analytics, audit</td>
            <td style={tdStyle}>Task queues, RPC, routing</td>
            <td style={tdStyle}>AWS-native, simple task queues</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>Kafka Architecture Essentials</h3>
      <pre style={codeStyle}><code>{`Kafka Concepts:
  Topic:      Named stream of messages (e.g., "user-events")
  Partition:  Ordered, append-only log (a topic has N partitions)
  Offset:     Position of a message within a partition
  Producer:   Writes messages to topics
  Consumer:   Reads messages from topics
  Consumer Group: Multiple consumers sharing partitions for parallel processing
  Broker:     Kafka server (typically 3+ for HA)
  Replication Factor: Each partition replicated to R brokers (typically 3)

Ordering guarantee:
  Messages in the same partition are strictly ordered.
  To ensure related messages are processed in order:
  → Publish with the same partition key (e.g., userId)
  → All messages for userId=123 always go to the same partition

Consumer Group parallelism:
  Topic with 4 partitions + Consumer Group with 4 consumers
  → Each consumer reads exactly 1 partition in parallel
  Topic with 4 partitions + Consumer Group with 2 consumers
  → Each consumer reads 2 partitions

  Rule: You cannot have more active consumers than partitions`}</code></pre>

      {/* Section 8: Rate Limiting */}
      <h2 style={h2Style}>Rate Limiting Algorithms</h2>
      <p style={pStyle}>
        Rate limiting protects APIs from abuse, ensures fair usage, and maintains service stability. Four main algorithms are used in production systems, each with different properties around burst handling, memory usage, and accuracy.
      </p>

      <h3 style={h3Style}>Token Bucket Algorithm</h3>
      <pre style={codeStyle}><code>{`Token Bucket:
  - Bucket holds up to N tokens (burst capacity)
  - Tokens added at fixed rate R (refill rate)
  - Each request consumes 1 token
  - Request rejected if bucket is empty

  Example: 100 tokens/min, burst up to 100
  At 9:00:00 — bucket full (100 tokens)
  9:00:01   — 10 requests → 90 tokens remain
  9:00:30   — 50 more tokens added → 140... capped at 100
  9:00:31   — 100 burst requests → bucket empty
  9:01:00   — 100 tokens refilled — burst allowed again

  Pros:  Allows controlled bursting; widely used (AWS, Stripe, GitHub)
  Cons:  Requires atomic operations (Redis INCR + EXPIRE)

Redis implementation (Lua for atomicity):
  local tokens = redis.call('get', KEYS[1])
  if tokens == false then tokens = tonumber(ARGV[1]) end
  tokens = tonumber(tokens)
  if tokens >= 1 then
    redis.call('set', KEYS[1], tokens - 1)
    redis.call('expire', KEYS[1], tonumber(ARGV[2]))
    return 1  -- allowed
  end
  return 0  -- rate limited`}</code></pre>

      <h3 style={h3Style}>Leaky Bucket Algorithm</h3>
      <pre style={codeStyle}><code>{`Leaky Bucket:
  - Requests enter a queue (the "bucket")
  - Requests processed at a fixed rate (the "leak")
  - If queue is full, reject new requests

  Acts like a queue with a constant drain rate.
  Guarantees a smooth, constant output rate.
  No bursting: requests always processed at rate R.

  Analogy: A bucket with a hole. Water (requests) enters the top;
           drains out the bottom at a constant rate.
           If more water enters than drains, bucket overflows.

  Pros:  Smooth output rate; good for protecting backend services
  Cons:  Requests can be delayed (queued); no burst handling
  Best for: API gateway protecting a downstream service with
            a fixed processing capacity`}</code></pre>

      <h3 style={h3Style}>Sliding Window Counter</h3>
      <pre style={codeStyle}><code>{`Sliding Window:
  Tracks request timestamps in a moving time window.
  No boundary burst problem (unlike fixed window).

  Implementation with Redis sorted sets:
  async function isAllowed(userId: string, limit: number, windowMs: number) {
    const now = Date.now();
    const windowStart = now - windowMs;
    const key = 'ratelimit:' + userId;

    // Remove expired timestamps
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count requests in window
    const count = await redis.zcard(key);
    if (count < limit) {
      // Add current request
      await redis.zadd(key, now, now.toString());
      await redis.expire(key, Math.ceil(windowMs / 1000));
      return true;  // allowed
    }
    return false;  // rate limited
  }

  Memory usage: O(requests_per_window) — higher than fixed window
  Best for: APIs needing accurate rate limiting without boundary bursts`}</code></pre>

      <h3 style={h3Style}>Rate Limiting at Scale</h3>
      <pre style={codeStyle}><code>{`Distributed Rate Limiting:
  Problem: 10 API servers, each with local rate limiter
  → user can make 10x the limit by hitting different servers

  Solution 1: Centralized Redis
    All servers check same Redis key → perfectly accurate
    Risk: Redis becomes a bottleneck / single point of failure

  Solution 2: Redis Cluster with local approximation
    Each server has local counter (fast)
    Periodically syncs with Redis (every 100ms)
    Slightly less accurate but much more scalable

  Solution 3: Approximate counting
    Each server allows limit/N requests locally (N = server count)
    Simple, no shared state, slightly overestimates usage

Rate limiting headers (follow RFC 6585 and Twitter conventions):
  X-RateLimit-Limit:     100     # max requests per window
  X-RateLimit-Remaining: 74      # remaining requests in current window
  X-RateLimit-Reset:     1709482800  # Unix timestamp when window resets
  Retry-After:           30      # seconds until retry (only on 429)

HTTP 429 Too Many Requests
  { "error": "Rate limit exceeded", "retryAfter": 30 }`}</code></pre>

      {/* Section 9: URL Shortener Design */}
      <h2 style={h2Style}>System Design Example: URL Shortener (bit.ly)</h2>
      <p style={pStyle}>
        The URL shortener is a classic system design interview question. It appears simple but requires reasoning about ID generation, database choice, caching, analytics, and scale. Here is a complete walkthrough.
      </p>

      <h3 style={h3Style}>Step 1: Requirements Clarification</h3>
      <pre style={codeStyle}><code>{`Functional Requirements:
  - User pastes a long URL, receives a short URL (e.g., bit.ly/abc123)
  - Clicking the short URL redirects to the original URL
  - Optional: custom aliases (bit.ly/my-custom-link)
  - Optional: link expiration
  - Optional: analytics (click count, geographic distribution)

Non-Functional Requirements:
  - 100M new URLs created per day
  - 10:1 read/write ratio → 1B redirects per day
  - URL records stored for 5 years
  - Availability: 99.99% (links must always resolve)
  - Redirect latency: < 50ms P99
  - Short URLs are NOT predictable (no sequential IDs visible)`}</code></pre>

      <h3 style={h3Style}>Step 2: Back-of-Envelope Estimation</h3>
      <pre style={codeStyle}><code>{`Writes:
  100M URLs/day = 100M / 86,400s ≈ 1,160 writes/sec

Reads (10:1 ratio):
  1B redirects/day = 1B / 86,400s ≈ 11,600 reads/sec

Storage:
  Each URL record: ~500 bytes (short code + long URL + metadata)
  100M URLs/day × 365 days × 5 years = 182.5B records
  182.5B × 500 bytes = ~91.25 TB over 5 years
  With compression: ~30-40 TB

Short code length:
  Base62 (a-z, A-Z, 0-9): 62 characters
  6 characters: 62^6 = 56.8 billion unique codes
  7 characters: 62^7 = 3.5 trillion unique codes
  → 7 characters is safe for 5 years at 100M URLs/day

Cache:
  20% of URLs generate 80% of traffic (Zipf's law / Pareto)
  Cache top 20% = 100M × 20% = 20M URLs
  20M × 500B = 10 GB → easily fits in Redis`}</code></pre>

      <h3 style={h3Style}>Step 3: High-Level Design</h3>
      <pre style={codeStyle}><code>{`URL Shortening Service Architecture:

  Client
    ↓
  CDN (cache popular redirects at edge)
    ↓
  Load Balancer
    ↓ ↓ ↓
  Web Servers (stateless, horizontally scaled)
    ↓
  ┌─────────────────────────────────┐
  │  Redis Cache                     │ ← Hot short codes (20M, ~10GB)
  │  short_code → long_url            │
  └─────────────────────────────────┘
    ↓ (cache miss)
  ┌─────────────────────────────────┐
  │  Primary DB (writes)             │
  │  Replica DB x3 (reads)           │ ← MySQL or Cassandra
  └─────────────────────────────────┘
    ↓
  Analytics Service (async via Kafka)
    ↓
  ClickHouse / BigQuery (analytics DB)`}</code></pre>

      <h3 style={h3Style}>Step 4: Short Code Generation</h3>
      <pre style={codeStyle}><code>{`Option 1: MD5/SHA256 Hash + Take First 7 chars
  md5("https://verylong.url/path?query=1") = "d41d8cd98f00b204..."
  shortCode = "d41d8cd"  ← first 7 chars

  Problem: ~0.01% hash collision rate (birthday paradox at 100M URLs)
  Must check DB for collision and rehash

Option 2: Auto-Increment ID + Base62 Encoding (recommended)
  id = 1000000001  (auto-increment from DB)
  shortCode = toBase62(1000000001) = "1QLbPm"

  function toBase62(num: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result;
  }

  Problem: Sequential IDs expose creation order, volume is guessable.
  Fix: Shuffle the base62 alphabet deterministically using a secret seed.

Option 3: Key Generation Service (KGS)
  Pre-generate millions of unique random 7-char codes
  Store in a "keys_not_used" table in Redis
  Application requests a key from KGS — immediate, no collision check
  After use, move to "keys_used" table

  Pros: Fast, no collision, no counter
  Cons: KGS is another service to maintain; single point of failure (mitigate with HA pair)`}</code></pre>

      <h3 style={h3Style}>Step 5: Redirect and Analytics</h3>
      <pre style={codeStyle}><code>{`Redirect implementation:
  GET /abc1234
  1. Check Redis cache for short code
  2. If hit: return 301 (permanent) or 302 (temporary redirect)
  3. If miss: query DB, populate Redis, redirect

  301 vs 302:
    301 Permanent — browser caches redirect; future requests go directly
                    to destination without hitting your server.
                    Better performance; bad for analytics (lose click data).
    302 Temporary — browser always requests your server first.
                    Enables analytics; slight extra latency.
    bit.ly uses 301 to minimize server load;
    analytics are captured by embedding a tracking pixel on destination.

Analytics (async, does not block redirect):
  On each click → publish to Kafka topic "link-clicks"
  {
    shortCode: "abc1234",
    timestamp: 1709482800,
    userAgent: "Mozilla/5.0...",
    ip: "203.0.113.42",
    country: "US"
  }
  → Consumer aggregates and writes to ClickHouse (analytics DB)
  → Dashboard queries: SELECT count(*) FROM clicks WHERE shortCode='abc1234'`}</code></pre>

      {/* Section 10: Social Media Feed */}
      <h2 style={h2Style}>System Design Example: Social Media Feed (Twitter/Instagram)</h2>
      <p style={pStyle}>
        Designing a social media feed is a common and challenging system design question. It requires reasoning about the fan-out problem, timeline generation strategies, ranking and personalization, and handling celebrity users with millions of followers.
      </p>

      <h3 style={h3Style}>The Fan-Out Problem</h3>
      <pre style={codeStyle}><code>{`Problem:
  User A (1M followers) posts a tweet.
  How do you update 1M followers' feeds efficiently?

  Naive approach: On each user's feed request, query all their followees' posts.
    SELECT p.* FROM posts p
    JOIN follows f ON f.followee_id = p.user_id
    WHERE f.follower_id = :userId
    ORDER BY p.created_at DESC LIMIT 20;

  At scale: If User B follows 500 accounts, this query joins millions of rows.
  With 10K concurrent users: system becomes unusable.

Two Main Strategies:

Fan-out on Write (Push Model):
  When celebrity posts → immediately push to all followers' feed caches.
  User A posts → write tweet to 1M pre-computed feed caches (fan-out)
  Feed read = O(1) (just read from cache)
  Write amplification: 1 post × 1M followers = 1M cache writes

Fan-out on Read (Pull Model):
  No precomputation on write.
  When user requests feed → query followees' recent posts on the fly.
  Feed read = O(followees) — can be slow for users following 1000 accounts.

Hybrid (used by Twitter/X, Instagram):
  Regular users (< 10K followers): Fan-out on write
  Celebrity users (> 1M followers): Fan-out on read (skip precomputation)
  On read: merge precomputed feeds of regular followees + on-the-fly
           query for celebrity followees → merge and rank`}</code></pre>

      <h3 style={h3Style}>Feed Storage Architecture</h3>
      <pre style={codeStyle}><code>{`Data Models:
  posts table:
    id, user_id, content, media_urls[], created_at, like_count, reply_count

  follows table:
    follower_id, followee_id, created_at
    Index: (follower_id, followee_id)

  feed_cache (Redis):
    Key:   "feed:user:{userId}"
    Value: Sorted Set, score=timestamp, member=postId
    Size:  Keep last 800 posts per user (older posts: query DB on scroll)

Timeline generation (fan-out on write):
  // On new post published
  async function fanOutPost(postId: string, authorId: string) {
    const followers = await getFollowers(authorId);  // paginated
    const chunks = chunk(followers, 100);

    // Parallel fan-out using Kafka
    for (const chunk of chunks) {
      await kafka.publish('fanout-queue', { postId, followers: chunk });
    }
  }

  // Fanout consumer (multiple workers)
  kafka.subscribe('fanout-queue', async ({ postId, followers, timestamp }) => {
    const pipeline = redis.pipeline();
    for (const followerId of followers) {
      pipeline.zadd('feed:user:' + followerId, timestamp, postId);
      pipeline.zremrangebyrank('feed:user:' + followerId, 0, -801); // keep 800
    }
    await pipeline.exec();
  });

Feed read:
  async function getFeed(userId: string, cursor?: number) {
    const postIds = await redis.zrevrangebyscore(
      'feed:user:' + userId,
      cursor || '+inf',
      '-inf',
      'LIMIT', 0, 20  // 20 posts per page
    );
    const posts = await batchGetPosts(postIds);  // Redis pipeline or DB IN query
    return posts;
  }`}</code></pre>

      {/* Section 11: CDN */}
      <h2 style={h2Style}>CDN and Content Delivery</h2>
      <p style={pStyle}>
        A Content Delivery Network (CDN) is a globally distributed network of edge servers that cache content close to end users. CDNs dramatically reduce latency for static assets (images, JS, CSS, videos) and can also accelerate dynamic content via optimized routing.
      </p>

      <h3 style={h3Style}>How CDNs Work</h3>
      <pre style={codeStyle}><code>{`Without CDN:
  User in Tokyo → Origin server in Virginia → 200ms round trip

With CDN:
  User in Tokyo → CDN edge in Tokyo (cached) → 5ms round trip

  First request (cache miss):
  Tokyo edge → Origin in Virginia (200ms, but only once)
  CDN caches response with TTL

  Subsequent requests (cache hit):
  Tokyo edge returns cached content → 5ms

CDN Caching by Content Type:
  Static assets (images, fonts, CSS, JS bundles):
    Cache-Control: public, max-age=31536000, immutable
    → Cache for 1 year; use content hashing for cache busting
    → main.abc123.js (hash changes when content changes)

  HTML pages:
    Cache-Control: no-cache  (or short TTL like 5 minutes)
    → Always validate with origin; stale HTML is risky

  API responses:
    Cache-Control: no-store  (for personalized or sensitive data)
    → Or public, max-age=60 for public, non-personalized endpoints

CDN Providers:
  Cloudflare:  Global anycast network, DDoS protection, free tier
  AWS CloudFront: Tight AWS integration (S3, Lambda@Edge)
  Fastly:      Real-time purging API, streaming support
  Akamai:      Enterprise, most PoPs worldwide`}</code></pre>

      {/* Section 12: Microservices vs Monolith */}
      <h2 style={h2Style}>Microservices vs Monolith Trade-offs</h2>
      <p style={pStyle}>
        The choice between microservices and a monolith is one of the most consequential architectural decisions. Most companies should start with a monolith and extract services only when specific pain points justify the overhead. Understanding the trade-offs helps you give nuanced answers in system design interviews.
      </p>

      <h3 style={h3Style}>Decision Framework</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Factor</th>
            <th style={thStyle}>Monolith</th>
            <th style={thStyle}>Microservices</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Team size</td>
            <td style={tdStyle}>Small (&lt; 10 engineers)</td>
            <td style={tdStyle}>Large (multiple teams, 50+ engineers)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Development speed</td>
            <td style={tdStyle}>Faster initial development</td>
            <td style={tdStyle}>Slower (service contracts, deployment pipelines)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Deployment complexity</td>
            <td style={tdStyle}>Single deployment unit</td>
            <td style={tdStyle}>Independent deployments per service</td>
          </tr>
          <tr>
            <td style={tdStyle}>Scaling granularity</td>
            <td style={tdStyle}>Scale everything or nothing</td>
            <td style={tdStyle}>Scale individual services independently</td>
          </tr>
          <tr>
            <td style={tdStyle}>Fault isolation</td>
            <td style={tdStyle}>One bug can crash everything</td>
            <td style={tdStyle}>Failure in one service is isolated</td>
          </tr>
          <tr>
            <td style={tdStyle}>Technology diversity</td>
            <td style={tdStyle}>One tech stack</td>
            <td style={tdStyle}>Best tool for each service</td>
          </tr>
          <tr>
            <td style={tdStyle}>Network latency</td>
            <td style={tdStyle}>In-process function calls (~microseconds)</td>
            <td style={tdStyle}>Network calls (~1-10ms per hop)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Distributed transactions</td>
            <td style={tdStyle}>Simple ACID transactions</td>
            <td style={tdStyle}>Complex (Saga pattern, eventual consistency)</td>
          </tr>
          <tr>
            <td style={tdStyle}>Observability</td>
            <td style={tdStyle}>Simple log files</td>
            <td style={tdStyle}>Distributed tracing required (Jaeger, Zipkin)</td>
          </tr>
        </tbody>
      </table>

      <h3 style={h3Style}>The Strangler Fig Pattern</h3>
      <pre style={codeStyle}><code>{`How to migrate from monolith to microservices incrementally:

Phase 1: Identify boundaries
  - Find bounded contexts (DDD) or high-churn modules
  - Start with services that have clear, stable interfaces
  - Extract: Authentication, Notification, File Upload are common first extractions

Phase 2: Strangler Fig migration
  Monolith   <-- API Gateway --> New Auth Service
  All other endpoints still handled by monolith

  1. Introduce API Gateway in front of monolith
  2. Extract one service (e.g., auth)
  3. Route /auth/* to new service; everything else to monolith
  4. Repeat for next service
  5. Eventually monolith is "strangled" — just a legacy facade

Phase 3: Database decomposition
  Hardest part: shared DB becomes per-service DB
  Strategy:
  1. Create new schema/table for the new service
  2. Dual-write to both old and new tables
  3. Backfill historical data
  4. Cut over reads to new table
  5. Remove old table from monolith

  Tools: Debezium (CDC), Flyway (migrations), Liquibase`}</code></pre>

      {/* Section 13: Back-of-Envelope Calculations */}
      <h2 style={h2Style}>Back-of-Envelope Calculations</h2>
      <p style={pStyle}>
        Back-of-envelope estimation is a required skill in system design interviews. Interviewers use these calculations to verify you understand the scale of the problem and to drive architecture decisions. You do not need exact numbers — order-of-magnitude estimates are sufficient.
      </p>

      <h3 style={h3Style}>Essential Numbers to Memorize</h3>
      <pre style={codeStyle}><code>{`Time:
  1 second = 1,000 milliseconds = 1,000,000 microseconds
  1 day    = 86,400 seconds ≈ 100,000 seconds (useful approximation)
  1 year   = 365 days ≈ 3.15 × 10^7 seconds ≈ 30M seconds

Latency Numbers (approximate):
  L1 cache:           ~0.5 ns
  L2 cache:           ~7 ns
  RAM access:         ~100 ns
  SSD read:           ~100 μs  (100,000 ns)
  HDD read:           ~10 ms   (10,000,000 ns)
  Network within DC:  ~0.5 ms
  Network cross-DC:   ~50–150 ms
  Packet US→Europe:   ~75 ms

Data sizes:
  1 char = 1 byte
  1 UUID = 16 bytes
  1 tweet (280 chars) = ~280 bytes
  1 medium image = ~300 KB
  1 HD video minute = ~100 MB
  1 TB = 10^12 bytes = 1,000 GB = 1,000,000 MB

Powers of 10:
  10^3  = 1 thousand (1K)
  10^6  = 1 million  (1M)
  10^9  = 1 billion  (1B)
  10^12 = 1 trillion (1T)

Throughput:
  1 Gbps network = 125 MB/s
  SSD sequential read: ~500 MB/s
  SSD random IOPS: ~100K IOPS
  HDD sequential read: ~100 MB/s
  HDD random IOPS: ~200 IOPS`}</code></pre>

      <h3 style={h3Style}>QPS Estimation Template</h3>
      <pre style={codeStyle}><code>{`Template: DAU → MAU → QPS

Example: Twitter-like system with 500M DAU

Daily Active Users: 500M
Average tweets read per user per day: 20
Read QPS = 500M × 20 / 86,400 ≈ 115,740 ≈ ~116K reads/sec

Average tweets written per user per day: 1 (most users read more than write)
Write QPS = 500M × 1 / 86,400 ≈ 5,787 ≈ ~6K writes/sec

Peak QPS (typically 2-3x average):
  Peak read QPS:  ~250K reads/sec
  Peak write QPS: ~15K writes/sec

Storage per day:
  6K writes/sec × 86,400s = ~518M tweets/day
  Per tweet: 280 chars + metadata = ~500 bytes
  Daily storage: 518M × 500 bytes = ~259 GB/day
  Per year: 259 GB × 365 = ~94.5 TB/year

Media (20% of tweets have an image, avg 300KB):
  518M × 20% × 300KB = ~31 TB/day for images
  Yearly: ~11.3 PB/year → use CDN + object storage (S3)`}</code></pre>

      <h3 style={h3Style}>Common Estimation Scenarios</h3>
      <pre style={codeStyle}><code>{`WhatsApp: 2B users, 100B messages/day
  Write QPS = 100B / 86,400 ≈ 1.16M messages/sec
  Average message size = 200 bytes
  Daily storage = 100B × 200B = 20 TB/day

YouTube: 1B hours watched per day
  1B hours × 3600s × 5 Mbps (HD bitrate) = 18,000 PB/day served
  → Most served by CDN (not origin servers)
  Upload: 500 hours of video uploaded per minute
  500 hours × 60 min/hr × 100 MB/min ≈ 3 TB/min raw video

Uber: 25M rides/day
  Write QPS: 25M / 86,400 ≈ 290 location updates/sec... but
  Driver location updates: every 5 seconds × 5M active drivers
  = 1M location updates/sec
  → Use time-series DB (InfluxDB) or Redis geospatial indexes

Instagram: 100M photos uploaded/day
  Write QPS: 100M / 86,400 ≈ 1,157 photo uploads/sec
  Storage per photo (with 3 resolutions): 3 × 300KB = 900KB
  Daily storage: 100M × 900KB = 90 TB/day
  → S3 + CDN; generate thumbnails via Lambda`}</code></pre>

      {/* Section 14: System Design Best Practices */}
      <h2 style={h2Style}>System Design Best Practices and Common Patterns</h2>
      <p style={pStyle}>
        Beyond specific technologies, experienced system designers internalize a set of patterns that apply across many different problems. Recognizing which patterns apply to a given scenario is what separates senior engineers from junior ones in system design interviews.
      </p>

      <h3 style={h3Style}>Reliability Patterns</h3>
      <pre style={codeStyle}><code>{`1. Circuit Breaker
   Prevent cascade failures: if Service B is slow/failing,
   stop calling it for 30 seconds instead of waiting for timeouts.
   States: Closed → Open (after N failures) → Half-Open (probe) → Closed
   Libraries: Resilience4j (Java), opossum (Node.js)

2. Retry with Exponential Backoff + Jitter
   // Avoid thundering herd: all clients retrying at same time
   const delay = Math.min(initialDelay * 2^attempt, maxDelay);
   const jitter = Math.random() * delay * 0.1;  // 10% jitter
   await sleep(delay + jitter);

3. Bulkhead Pattern
   Isolate resources per consumer to prevent one slow consumer
   from starving all others.
   Example: Separate thread pools / connection pools per downstream service.
   Netflix uses bulkheads in Hystrix to isolate service dependencies.

4. Saga Pattern (distributed transactions)
   For multi-service transactions (no 2-phase commit):
   Choreography: Each service emits events; others react.
   Orchestration: Central saga orchestrator calls each service.
   Compensation: If step N fails, run compensating transactions
                 for steps 1..N-1 to undo changes.

5. Idempotent Operations
   Design APIs so retrying a request has the same effect as calling once.
   Use idempotency keys: POST /payments with Idempotency-Key: uuid
   Server deduplicates by key → safe to retry on network failure.`}</code></pre>

      <h3 style={h3Style}>Data Patterns</h3>
      <pre style={codeStyle}><code>{`1. CQRS (Command Query Responsibility Segregation)
   Separate write model (commands) from read model (queries).
   Write side: normalized DB optimized for writes
   Read side: denormalized read models optimized for queries
   Sync via events or CDC (Change Data Capture)

   Use when: read and write workloads have very different shapes
   Example: Writes go to PostgreSQL; reads come from Elasticsearch

2. Event Sourcing
   Store the full history of state changes as events.
   Current state = replay all events from the beginning.
   Benefits: Audit log, time travel, event replay for new features.
   Challenges: Eventual consistency, event schema evolution.

3. Denormalization for Read Performance
   Store redundant data to avoid expensive JOINs at read time.
   Example: Store author name in each post row instead of joining users table.
   Trade-off: Write complexity (update all copies on change) vs read speed.

4. Two-Phase Commit (2PC) — use sparingly
   Coordinator asks all participants: "Can you commit?"
   If all say yes → coordinator sends commit to all.
   Problems: Blocking protocol, coordinator is SPOF, slow.
   Prefer: Saga pattern for most distributed transaction needs.`}</code></pre>

      <h3 style={h3Style}>Quick-Reference Architecture Checklist</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Component</th>
            <th style={thStyle}>Technology Options</th>
            <th style={thStyle}>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>Load Balancer</td>
            <td style={tdStyle}>AWS ALB, Nginx, HAProxy</td>
            <td style={tdStyle}>Distribute traffic, SSL termination, health checks</td>
          </tr>
          <tr>
            <td style={tdStyle}>Cache</td>
            <td style={tdStyle}>Redis, Memcached</td>
            <td style={tdStyle}>Session store, rate limiting, hot data caching</td>
          </tr>
          <tr>
            <td style={tdStyle}>Relational DB</td>
            <td style={tdStyle}>PostgreSQL, MySQL, Aurora</td>
            <td style={tdStyle}>Structured data, ACID transactions, complex queries</td>
          </tr>
          <tr>
            <td style={tdStyle}>NoSQL (wide-column)</td>
            <td style={tdStyle}>Cassandra, DynamoDB, HBase</td>
            <td style={tdStyle}>Time-series, write-heavy, huge scale</td>
          </tr>
          <tr>
            <td style={tdStyle}>Search</td>
            <td style={tdStyle}>Elasticsearch, OpenSearch</td>
            <td style={tdStyle}>Full-text search, faceted filtering</td>
          </tr>
          <tr>
            <td style={tdStyle}>Message Queue</td>
            <td style={tdStyle}>Kafka, RabbitMQ, SQS</td>
            <td style={tdStyle}>Async processing, event streaming, decoupling</td>
          </tr>
          <tr>
            <td style={tdStyle}>Object Storage</td>
            <td style={tdStyle}>S3, GCS, Azure Blob</td>
            <td style={tdStyle}>Images, videos, backups, static assets</td>
          </tr>
          <tr>
            <td style={tdStyle}>CDN</td>
            <td style={tdStyle}>Cloudflare, CloudFront, Fastly</td>
            <td style={tdStyle}>Static assets, global latency reduction</td>
          </tr>
          <tr>
            <td style={tdStyle}>API Gateway</td>
            <td style={tdStyle}>Kong, AWS API GW, Nginx</td>
            <td style={tdStyle}>Auth, rate limiting, routing, observability</td>
          </tr>
          <tr>
            <td style={tdStyle}>Monitoring</td>
            <td style={tdStyle}>Prometheus + Grafana, Datadog</td>
            <td style={tdStyle}>Metrics, alerting, dashboards</td>
          </tr>
          <tr>
            <td style={tdStyle}>Distributed Tracing</td>
            <td style={tdStyle}>Jaeger, Zipkin, OpenTelemetry</td>
            <td style={tdStyle}>Request tracing across microservices</td>
          </tr>
        </tbody>
      </table>

      <h2 style={h2Style}>Conclusion</h2>
      <p style={pStyle}>
        Mastering system design requires understanding not just individual components but how they fit together to form scalable, reliable, and maintainable systems. The most important skills are: asking the right clarifying questions, estimating scale before designing, knowing when to use SQL vs NoSQL vs cache, understanding the CAP theorem trade-offs in practice, and communicating your reasoning clearly.
      </p>
      <p style={pStyle}>
        Start every design with a simple, working system and only add complexity when you can point to a specific bottleneck that justifies it. A single PostgreSQL database with Redis caching serves millions of users when properly indexed and optimized — you do not always need Kafka and Cassandra from day one. The best system designers know which tools to apply and, equally importantly, when not to add more complexity.
      </p>
      <p style={pStyle}>
        Practice with common interview questions: design a URL shortener, a social media feed, a ride-sharing service, a distributed key-value store, or a video streaming platform. Work through each using the five-step framework: requirements, estimation, high-level design, deep dive, and bottlenecks. With enough practice, the patterns become second nature.
      </p>
    </article>
  );
}
