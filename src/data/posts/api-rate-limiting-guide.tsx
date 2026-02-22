export default function ApiRateLimitingGuide() {
  return (
    <>
      <h2>API Rate Limiting: Strategies and Implementation Guide</h2>
      <p>
        Rate limiting is a critical technique for protecting APIs from abuse, ensuring fair usage, and maintaining
        service stability. Whether you are building a public API, a SaaS platform, or an internal microservice,
        understanding rate limiting strategies is essential. This guide covers the major algorithms, implementation
        patterns, and best practices used by production APIs in 2026.
      </p>

      <h2>Why Rate Limiting Matters</h2>
      <p>
        Without rate limiting, a single client can overwhelm your API, causing cascading failures for all users.
        Rate limiting serves multiple critical purposes:
      </p>
      <ul>
        <li><strong>Abuse prevention</strong> - Stop malicious actors from brute-forcing endpoints, scraping data, or launching DDoS attacks</li>
        <li><strong>Fair resource allocation</strong> - Ensure no single tenant monopolizes shared infrastructure</li>
        <li><strong>Cost control</strong> - Prevent unexpected cloud computing bills from traffic spikes</li>
        <li><strong>Service stability</strong> - Keep response times consistent under load</li>
        <li><strong>Compliance</strong> - Meet SLA commitments and regulatory requirements</li>
      </ul>

      <h2>Rate Limiting Algorithms</h2>

      <h3>1. Fixed Window Counter</h3>
      <p>
        The simplest algorithm. Divide time into fixed windows (e.g., 1-minute intervals) and count requests
        in each window. When the count exceeds the limit, reject until the next window starts.
      </p>
      <pre><code>{`// Fixed Window Counter implementation
class FixedWindowCounter {
  private counts = new Map<string, { count: number; windowStart: number }>();
  private windowSize: number; // in milliseconds
  private limit: number;

  constructor(windowSizeMs: number, limit: number) {
    this.windowSize = windowSizeMs;
    this.limit = limit;
  }

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const windowStart = Math.floor(now / this.windowSize) * this.windowSize;
    const record = this.counts.get(clientId);

    if (!record || record.windowStart !== windowStart) {
      // New window — reset counter
      this.counts.set(clientId, { count: 1, windowStart });
      return true;
    }

    if (record.count < this.limit) {
      record.count++;
      return true;
    }

    return false; // Rate limited
  }
}

// 100 requests per minute
const limiter = new FixedWindowCounter(60_000, 100);`}</code></pre>
      <p>
        <strong>Pros:</strong> Simple to implement, low memory usage.
        <strong>Cons:</strong> Boundary burst problem — a client can make 200 requests in 2 seconds by hitting
        the last second of one window and the first second of the next.
      </p>

      <h3>2. Sliding Window Log</h3>
      <p>
        Stores the timestamp of every request and counts how many fall within the sliding window. This eliminates
        the boundary burst problem but uses more memory.
      </p>
      <pre><code>{`class SlidingWindowLog {
  private logs = new Map<string, number[]>();
  private windowSize: number;
  private limit: number;

  constructor(windowSizeMs: number, limit: number) {
    this.windowSize = windowSizeMs;
    this.limit = limit;
  }

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowSize;

    let timestamps = this.logs.get(clientId) || [];

    // Remove expired timestamps
    timestamps = timestamps.filter(t => t > windowStart);

    if (timestamps.length < this.limit) {
      timestamps.push(now);
      this.logs.set(clientId, timestamps);
      return true;
    }

    this.logs.set(clientId, timestamps);
    return false;
  }
}

// 100 requests per 60 seconds (true sliding window)
const limiter = new SlidingWindowLog(60_000, 100);`}</code></pre>
      <p>
        <strong>Pros:</strong> Precise, no boundary burst issue.
        <strong>Cons:</strong> Higher memory usage (stores every timestamp), not ideal for high-traffic APIs.
      </p>

      <h3>3. Sliding Window Counter</h3>
      <p>
        A hybrid approach that combines the low memory of fixed windows with the accuracy of sliding windows.
        It calculates a weighted count based on the overlap between the current and previous windows.
      </p>
      <pre><code>{`class SlidingWindowCounter {
  private windows = new Map<string, { prev: number; curr: number; prevStart: number; currStart: number }>();
  private windowSize: number;
  private limit: number;

  constructor(windowSizeMs: number, limit: number) {
    this.windowSize = windowSizeMs;
    this.limit = limit;
  }

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    const currStart = Math.floor(now / this.windowSize) * this.windowSize;
    const prevStart = currStart - this.windowSize;
    let record = this.windows.get(clientId);

    if (!record || record.currStart !== currStart) {
      // Slide window
      record = {
        prev: record?.currStart === prevStart ? record.curr : 0,
        curr: 0,
        prevStart,
        currStart,
      };
    }

    // Weight the previous window by how much of it overlaps
    const elapsed = now - currStart;
    const weight = 1 - elapsed / this.windowSize;
    const estimatedCount = record.prev * weight + record.curr;

    if (estimatedCount < this.limit) {
      record.curr++;
      this.windows.set(clientId, record);
      return true;
    }

    return false;
  }
}`}</code></pre>
      <p>
        <strong>Pros:</strong> Low memory (only 2 counters per client), smooth rate limiting, no bursts.
        <strong>Cons:</strong> Slightly approximate count (but close enough for production use).
      </p>

      <h3>4. Token Bucket</h3>
      <p>
        The most widely used algorithm. A bucket holds tokens that are refilled at a constant rate. Each request
        consumes a token. When the bucket is empty, requests are rejected. This naturally allows short bursts
        while maintaining an average rate.
      </p>
      <pre><code>{`class TokenBucket {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();
  private capacity: number;    // max tokens
  private refillRate: number;  // tokens per second

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
  }

  isAllowed(clientId: string, tokensNeeded = 1): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(clientId, bucket);
    }

    // Refill tokens based on elapsed time
    const elapsed = (now - bucket.lastRefill) / 1000;
    bucket.tokens = Math.min(
      this.capacity,
      bucket.tokens + elapsed * this.refillRate
    );
    bucket.lastRefill = now;

    if (bucket.tokens >= tokensNeeded) {
      bucket.tokens -= tokensNeeded;
      return true;
    }

    return false;
  }
}

// 10 tokens max, refill 2 tokens per second
// Allows bursts of 10, sustained rate of 2/sec
const limiter = new TokenBucket(10, 2);`}</code></pre>
      <p>
        <strong>Pros:</strong> Allows controlled bursts, smooth rate limiting, intuitive to configure.
        <strong>Cons:</strong> Slightly more complex than fixed window.
      </p>

      <h3>5. Leaky Bucket</h3>
      <p>
        Similar to token bucket, but requests are processed at a constant rate regardless of arrival pattern.
        Incoming requests are queued, and the queue drains at a fixed rate. Overflow is rejected.
      </p>
      <pre><code>{`class LeakyBucket {
  private buckets = new Map<string, { queue: number; lastDrain: number }>();
  private capacity: number;   // max queue size
  private drainRate: number;  // requests processed per second

  constructor(capacity: number, drainRate: number) {
    this.capacity = capacity;
    this.drainRate = drainRate;
  }

  isAllowed(clientId: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { queue: 0, lastDrain: now };
      this.buckets.set(clientId, bucket);
    }

    // Drain queue based on elapsed time
    const elapsed = (now - bucket.lastDrain) / 1000;
    bucket.queue = Math.max(0, bucket.queue - elapsed * this.drainRate);
    bucket.lastDrain = now;

    if (bucket.queue < this.capacity) {
      bucket.queue += 1;
      return true;
    }

    return false;
  }
}

// Queue up to 20 requests, process 5 per second
const limiter = new LeakyBucket(20, 5);`}</code></pre>
      <p>
        <strong>Pros:</strong> Produces a smooth, constant output rate. Prevents bursts.
        <strong>Cons:</strong> No burst allowance, potential latency from queuing.
      </p>

      <h2>Algorithm Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Memory</th>
            <th>Accuracy</th>
            <th>Burst Handling</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fixed Window</td><td>Very Low</td><td>Low</td><td>Edge bursts</td><td>Simple internal APIs</td></tr>
          <tr><td>Sliding Window Log</td><td>High</td><td>Exact</td><td>No bursts</td><td>Low-volume, strict APIs</td></tr>
          <tr><td>Sliding Window Counter</td><td>Low</td><td>Near-exact</td><td>Smooth</td><td>Most APIs (recommended)</td></tr>
          <tr><td>Token Bucket</td><td>Low</td><td>Good</td><td>Controlled bursts</td><td>Public APIs, CDNs</td></tr>
          <tr><td>Leaky Bucket</td><td>Low</td><td>Good</td><td>No bursts</td><td>Message queues, streaming</td></tr>
        </tbody>
      </table>

      <h2>HTTP Response Headers</h2>
      <p>
        Well-designed APIs communicate rate limit status through standard HTTP headers. This allows clients
        to implement adaptive behavior and avoid unnecessary rejections.
      </p>
      <pre><code>{`// Standard rate limit headers (RFC 6585 / draft-ietf-httpapi-ratelimit-headers)
HTTP/1.1 200 OK
X-RateLimit-Limit: 100        // Max requests per window
X-RateLimit-Remaining: 42     // Requests remaining in current window
X-RateLimit-Reset: 1708646400 // Unix timestamp when window resets
Retry-After: 30               // Seconds to wait (on 429 response)

// When rate limited
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 30
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1708646400

{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please retry after 30 seconds.",
  "retryAfter": 30
}`}</code></pre>

      <h2>Express.js Middleware Implementation</h2>
      <p>
        Here is a production-ready rate limiting middleware for Express.js using the token bucket algorithm
        with Redis for distributed state.
      </p>
      <pre><code>{`import { Request, Response, NextFunction } from "express";

interface RateLimitConfig {
  windowMs: number;
  max: number;
  keyGenerator?: (req: Request) => string;
  message?: string;
}

function rateLimit(config: RateLimitConfig) {
  const {
    windowMs,
    max,
    keyGenerator = (req) => req.ip || "unknown",
    message = "Too many requests, please try again later.",
  } = config;

  const store = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();
    let record = store.get(key);

    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + windowMs };
      store.set(key, record);
    }

    record.count++;
    const remaining = Math.max(0, max - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    // Set rate limit headers
    res.set("X-RateLimit-Limit", String(max));
    res.set("X-RateLimit-Remaining", String(remaining));
    res.set("X-RateLimit-Reset", String(Math.ceil(record.resetTime / 1000)));

    if (record.count > max) {
      res.set("Retry-After", String(resetSeconds));
      return res.status(429).json({
        error: "rate_limit_exceeded",
        message,
        retryAfter: resetSeconds,
      });
    }

    next();
  };
}

// Usage
app.use("/api/", rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // 100 requests per window
}));

// Stricter limit for auth endpoints
app.use("/api/auth/", rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 5,               // 5 attempts per minute
  message: "Too many login attempts. Please wait before trying again.",
}));`}</code></pre>

      <h2>Distributed Rate Limiting with Redis</h2>
      <p>
        For applications running multiple instances behind a load balancer, in-memory rate limiting does not
        work because each instance has its own counter. Redis provides a shared, atomic counter.
      </p>
      <pre><code>{`import Redis from "ioredis";

const redis = new Redis();

async function slidingWindowRateLimit(
  clientId: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = \`ratelimit:\${clientId}\`;
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;

  // Atomic Redis operations using a pipeline
  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(key, 0, windowStart); // Remove expired entries
  pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`); // Add current request
  pipeline.zcard(key); // Count requests in window
  pipeline.expire(key, windowSeconds); // Set TTL for cleanup

  const results = await pipeline.exec();
  const count = results?.[2]?.[1] as number;

  const allowed = count <= limit;
  const remaining = Math.max(0, limit - count);
  const resetAt = Math.ceil((now + windowSeconds * 1000) / 1000);

  if (!allowed) {
    // Remove the request we just added since it was rejected
    await redis.zrem(key, \`\${now}-\${Math.random()}\`);
  }

  return { allowed, remaining, resetAt };
}

// Usage
const result = await slidingWindowRateLimit("user:123", 100, 60);
if (!result.allowed) {
  res.status(429).json({ error: "rate_limit_exceeded" });
}`}</code></pre>

      <h2>Rate Limiting Strategies by Tier</h2>
      <p>
        Most production APIs implement tiered rate limits based on authentication level and subscription plan:
      </p>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Rate Limit</th>
            <th>Burst</th>
            <th>Identification</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Anonymous</td><td>60/hour</td><td>10/minute</td><td>IP address</td></tr>
          <tr><td>Free</td><td>1,000/hour</td><td>100/minute</td><td>API key</td></tr>
          <tr><td>Pro</td><td>10,000/hour</td><td>500/minute</td><td>API key</td></tr>
          <tr><td>Enterprise</td><td>100,000/hour</td><td>5,000/minute</td><td>API key + IP</td></tr>
        </tbody>
      </table>

      <h2>Client-Side Rate Limit Handling</h2>
      <p>
        Well-behaved API clients should detect rate limits and implement exponential backoff with jitter to
        avoid thundering herd problems.
      </p>
      <pre><code>{`async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.status !== 429) {
      return response;
    }

    if (attempt === maxRetries) {
      throw new Error("Rate limit exceeded after max retries");
    }

    // Get retry delay from header or use exponential backoff
    const retryAfter = response.headers.get("Retry-After");
    let delayMs: number;

    if (retryAfter) {
      delayMs = parseInt(retryAfter, 10) * 1000;
    } else {
      // Exponential backoff with jitter
      const baseDelay = Math.pow(2, attempt) * 1000;
      const jitter = Math.random() * 1000;
      delayMs = baseDelay + jitter;
    }

    console.log(\`Rate limited. Retrying in \${delayMs}ms (attempt \${attempt + 1})\`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  throw new Error("Unreachable");
}`}</code></pre>

      <h2>Best Practices</h2>
      <ul>
        <li><strong>Always return rate limit headers</strong> - Include <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code>, and <code>Retry-After</code> in every response</li>
        <li><strong>Use 429 status code</strong> - Never return 200 with an error body for rate-limited requests</li>
        <li><strong>Identify by API key, not just IP</strong> - Multiple users may share an IP (corporate NAT, VPN)</li>
        <li><strong>Implement multiple tiers</strong> - Different endpoints need different limits (auth vs read vs write)</li>
        <li><strong>Document your limits</strong> - Publish rate limits in your API documentation</li>
        <li><strong>Use Redis for distributed systems</strong> - In-memory counters do not work across multiple instances</li>
        <li><strong>Consider burst allowance</strong> - Token bucket is ideal because it allows short bursts without exceeding average rate</li>
        <li><strong>Log rate limit events</strong> - Monitor who gets rate-limited and adjust limits accordingly</li>
        <li><strong>Exempt health checks</strong> - Do not rate-limit monitoring and health check endpoints</li>
        <li><strong>Graceful degradation</strong> - Consider returning cached responses instead of hard rejecting</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between rate limiting and throttling?</h3>
      <p>
        Rate limiting rejects excess requests immediately with a 429 status code. Throttling delays (queues)
        excess requests and processes them later at a controlled rate. Rate limiting is simpler and more common
        for APIs, while throttling is used in streaming and real-time systems.
      </p>

      <h3>Should I rate limit by IP address or API key?</h3>
      <p>
        Use API keys when available, as multiple users may share the same IP address (corporate networks, VPNs).
        Fall back to IP-based limiting for unauthenticated endpoints. For maximum protection, combine both:
        per-key limits for fairness and per-IP limits for abuse prevention.
      </p>

      <h3>Which algorithm should I choose?</h3>
      <p>
        For most APIs, the <strong>sliding window counter</strong> provides the best balance of accuracy and
        simplicity. If you need burst allowance (e.g., a public API), use the <strong>token bucket</strong>.
        Use the <strong>fixed window</strong> only for simple internal services where boundary bursts are acceptable.
      </p>

      <h3>How do I handle rate limiting in a microservices architecture?</h3>
      <p>
        Use a centralized rate limiter at the API gateway level (e.g., Kong, NGINX, AWS API Gateway) for global
        limits. For service-to-service communication, implement local rate limiters with circuit breakers.
        Redis or Memcached provides shared state across instances.
      </p>

      <h3>What rate limits should I set for my API?</h3>
      <p>
        Start with generous limits and tighten based on actual usage patterns. Common starting points are
        100 requests per 15 minutes for authenticated users and 20 requests per 15 minutes for anonymous
        access. Monitor your infrastructure capacity and adjust accordingly.
      </p>
    </>
  );
}
