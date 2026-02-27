'use client';

import React from 'react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I profile a Node.js application to find performance bottlenecks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the built-in --inspect flag to connect Chrome DevTools for CPU profiling and flame graphs. Run node --inspect-brk server.js, open chrome://inspect in Chrome, and start a recording. For production profiling, use clinic.js (npm install -g clinic) which provides doctor, flame, and bubbleprof sub-commands. The clinic doctor command identifies the most likely root cause of a performance problem automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the phases of the Node.js event loop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Node.js event loop has six phases: (1) Timers — executes setTimeout and setInterval callbacks; (2) Pending callbacks — I/O callbacks deferred to the next loop; (3) Idle/Prepare — internal use only; (4) Poll — retrieves new I/O events and executes callbacks; (5) Check — executes setImmediate callbacks; (6) Close callbacks — socket.on("close") etc. Microtasks (Promise.then, process.nextTick) run between every phase transition.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I detect and fix memory leaks in Node.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use process.memoryUsage() to monitor heap growth over time. Generate heap snapshots with v8.writeHeapSnapshot() or the heapdump package, then compare snapshots in Chrome DevTools Memory tab to find objects that are not being garbage collected. Common causes are: unbounded caches, forgotten event listeners (use emitter.removeListener or EventEmitter.once), closures holding large references, and circular references in global objects.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use worker_threads vs the cluster module?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use worker_threads for CPU-intensive JavaScript work within a single process — image processing, cryptography, complex calculations. Workers share memory via SharedArrayBuffer for zero-copy data transfer. Use the cluster module to run multiple Node.js instances across all CPU cores, each with its own memory — ideal for scaling HTTP servers. PM2 cluster mode wraps this automatically. For most web APIs, cluster/PM2 is simpler; use worker_threads only when you need parallelism within a request.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does caching improve Node.js performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Caching avoids redundant computations and database queries. In-memory caching (Map, lru-cache) is fastest but limited to a single process and lost on restart. Redis is the standard for distributed caching across multiple instances — use ioredis or node-redis. HTTP caching with Cache-Control headers lets browsers and CDNs cache responses. A typical stack is: in-process LRU for hot data, Redis for shared/persistent cache, and CDN for static assets.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is connection pooling and why is it important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Connection pooling reuses database connections instead of creating a new TCP connection and authentication handshake on every query. Creating a connection takes 5-100ms; a pooled connection takes under 1ms. For PostgreSQL, use pg with a Pool (default 10 connections). For MySQL, use mysql2 with createPool. For MongoDB, the native driver maintains an internal pool automatically. Always configure pool size based on your database server\'s max_connections and your CPU count.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I benchmark a Node.js HTTP server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use autocannon (npm install -g autocannon) for HTTP load testing: autocannon -c 100 -d 30 http://localhost:3000. It reports requests/sec, latency percentiles (p50/p95/p99), and throughput. For more advanced scenarios, wrk and wrk2 support Lua scripts. Always warm up the server before benchmarking, test with realistic payload sizes, and run benchmarks on the same hardware as production to avoid misleading results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Node.js faster than Bun or Deno for HTTP servers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In raw HTTP benchmarks, Bun is typically 2-4x faster than Node.js for simple hello-world servers due to its JavaScriptCore engine and native HTTP implementation. Deno is generally 1.5-2x faster than Node.js. However, real-world performance differences are smaller because database queries, I/O, and business logic dominate response time. For most production applications, Node.js performance is more than sufficient; architectural decisions (caching, connection pooling, async patterns) matter far more than runtime choice.',
      },
    },
  ],
};

const translations = {
  en: {
    title: 'Node.js Performance Guide: Event Loop, Profiling, and Optimization 2026',
    description:
      'Master Node.js performance optimization with this comprehensive guide. Covers event loop internals, CPU and memory profiling with clinic.js and Chrome DevTools, flame graphs, worker_threads, cluster mode, caching strategies, connection pooling, HTTP/2, compression, benchmarking with autocannon, and a Node.js vs Bun vs Deno performance comparison.',
  },
  zh: {
    title: 'Node.js 性能优化指南：事件循环、性能分析与调优 2026',
    description:
      '全面掌握 Node.js 性能优化。涵盖事件循环原理、使用 clinic.js 和 Chrome DevTools 进行 CPU 和内存分析、火焰图、worker_threads、集群模式、缓存策略、连接池、HTTP/2、压缩、autocannon 基准测试，以及 Node.js vs Bun vs Deno 性能对比。',
  },
};

function EnglishContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Node.js Performance Quick Reference
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>Never block the event loop — use async I/O, streams, and worker_threads for CPU work.</li>
          <li>Profile with <code>node --inspect</code> + Chrome DevTools or <code>clinic.js</code> for flamegraphs.</li>
          <li>Detect memory leaks with heap snapshots; common causes are forgotten listeners and unbounded caches.</li>
          <li>Use cluster module or PM2 cluster mode to utilize all CPU cores for HTTP servers.</li>
          <li>Cache hot data in-process (lru-cache) and shared state in Redis; pool database connections.</li>
          <li>Enable gzip/Brotli compression and HTTP/2 via Nginx in front of Node.js.</li>
          <li>Benchmark with autocannon; measure p99 latency, not just average req/sec.</li>
        </ul>
      </div>

      <h2>Why Node.js Performance Matters</h2>
      <p>
        Node.js is used by Netflix, LinkedIn, PayPal, and Uber to serve millions of requests per second.
        Its non-blocking, event-driven architecture makes it extremely efficient for I/O-bound workloads —
        but that same single-threaded model means a single blocking operation can freeze the entire server
        for all connected clients. Understanding Node.js performance is not optional; it is foundational
        to building reliable, scalable backend systems.
      </p>
      <p>
        This guide goes deep on every layer of Node.js performance: the runtime internals, profiling tools,
        memory management, parallelism, caching, network-level optimizations, and benchmarking methodology.
        Whether you are debugging a slow API endpoint or designing a high-throughput microservice from scratch,
        the techniques here apply directly.
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          Key Takeaways
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>The event loop has 6 phases; microtasks (Promises, nextTick) run between each phase.</li>
          <li>Blocking the event loop for more than ~10ms degrades all concurrent request latency.</li>
          <li>CPU profiling with flame graphs is the fastest way to find hot paths in production.</li>
          <li>Memory leaks in Node.js are usually event listeners, closures, or unbounded Maps/arrays.</li>
          <li>Connection pooling reduces query latency from 50-100ms to under 1ms per call.</li>
          <li>Bun is 2-4x faster than Node.js in microbenchmarks but architectural choices matter more.</li>
          <li>PM2 cluster mode doubles throughput on a 2-core machine with a single config line.</li>
        </ul>
      </div>

      <h2>Event Loop Deep Dive: Phases, Microtasks, and Macrotasks</h2>
      <p>
        The event loop is the heart of Node.js concurrency. Unlike multi-threaded servers that create
        an OS thread per connection, Node.js runs all JavaScript on a single thread. The event loop
        processes callbacks phase by phase, enabling non-blocking I/O without thread overhead.
      </p>

      <h3>The Six Event Loop Phases</h3>
      <pre><code className="language-text">{`Event Loop Iteration (one "tick"):

  ┌────────────────────────────────────────────┐
  │               Event Loop                  │
  │                                            │
  │  1. TIMERS          setTimeout / setInterval │
  │  2. PENDING CB      I/O errors from last tick│
  │  3. IDLE / PREPARE  internal use only       │
  │  4. POLL            fetch new I/O events    │
  │  5. CHECK           setImmediate()          │
  │  6. CLOSE CB        socket.on('close', ...) │
  │                                            │
  │  Between EVERY phase:                      │
  │    → drain process.nextTick queue          │
  │    → drain Promise microtask queue         │
  └────────────────────────────────────────────┘`}</code></pre>

      <h3>Microtasks vs Macrotasks</h3>
      <pre><code className="language-javascript">{`// Execution order demonstration
console.log('1: sync start');

setTimeout(() => console.log('2: setTimeout (macrotask)'), 0);
setImmediate(() => console.log('3: setImmediate (macrotask)'));

Promise.resolve()
  .then(() => console.log('4: Promise.then (microtask)'))
  .then(() => console.log('5: Promise.then chained (microtask)'));

process.nextTick(() => console.log('6: nextTick (microtask, highest priority)'));
process.nextTick(() => console.log('7: nextTick second'));

queueMicrotask(() => console.log('8: queueMicrotask'));

console.log('9: sync end');

// Output:
// 1: sync start
// 9: sync end
// 6: nextTick (microtask, highest priority)
// 7: nextTick second
// 4: Promise.then (microtask)
// 5: Promise.then chained (microtask)
// 8: queueMicrotask
// 2: setTimeout (macrotask)   <- order vs setImmediate depends on poll phase timing
// 3: setImmediate (macrotask)`}</code></pre>

      <h3>What Blocks the Event Loop</h3>
      <p>
        Any synchronous operation that takes a long time blocks every pending I/O callback,
        increasing latency for all users. Common culprits:
      </p>
      <pre><code className="language-javascript">{`// ❌ Blocking the event loop — NEVER do this in a server
const crypto = require('crypto');
const fs = require('fs');

// 1. Synchronous file I/O
const data = fs.readFileSync('/large-file.csv');         // blocks during disk read

// 2. JSON parsing of huge objects
const obj = JSON.parse(hugeJsonString);                  // can take 50-500ms for 100MB+

// 3. RegExp catastrophic backtracking
/^(a+)+$/.test('aaaaaaaaaaaaaaaaaab');                  // exponential time

// 4. CPU-bound loops without yield
for (let i = 0; i < 1_000_000_000; i++) { /* work */ } // blocks 1-5 seconds

// 5. Synchronous crypto
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512'); // blocks!

// ✅ Non-blocking alternatives
const data = await fs.promises.readFile('/large-file.csv');

// Split large JSON work into chunks
function parseChunked(str) {
  return new Promise(resolve => setImmediate(() => resolve(JSON.parse(str))));
}

// Async crypto
const hash = await new Promise((resolve, reject) =>
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) =>
    err ? reject(err) : resolve(key)
  )
);`}</code></pre>

      <h3>Measuring Event Loop Lag</h3>
      <pre><code className="language-javascript">{`// Monitor event loop delay in production
const { monitorEventLoopDelay } = require('perf_hooks');

const histogram = monitorEventLoopDelay({ resolution: 10 });
histogram.enable();

setInterval(() => {
  const lag = histogram.mean / 1e6; // nanoseconds to milliseconds
  const p99 = histogram.percentile(99) / 1e6;

  if (lag > 50) {
    console.warn(\`Event loop lag: mean=\${lag.toFixed(2)}ms p99=\${p99.toFixed(2)}ms\`);
  }

  histogram.reset();
}, 5000);

// Simple lag sampler (lightweight alternative)
let lastCheck = Date.now();
setInterval(() => {
  const now = Date.now();
  const lag = now - lastCheck - 100; // 100ms interval
  if (lag > 20) console.warn(\`Event loop lag: \${lag}ms\`);
  lastCheck = now;
}, 100).unref(); // .unref() prevents this timer from keeping the process alive`}</code></pre>

      <h2>Profiling Node.js Applications</h2>
      <p>
        Profiling is the process of measuring where your application spends time. Never optimize
        without profiling first — intuition is almost always wrong about hot paths.
      </p>

      <h3>Built-in: node --inspect with Chrome DevTools</h3>
      <pre><code className="language-bash">{`# Start with inspector enabled
node --inspect server.js

# Break on first line (wait for debugger before executing)
node --inspect-brk server.js

# For running servers: send SIGUSR1 to activate inspector
kill -SIGUSR1 <pid>

# Then open: chrome://inspect in Chrome
# Click "inspect" under Remote Target
# Navigate to Performance tab → Record → Apply load → Stop`}</code></pre>

      <h3>clinic.js — Automated Performance Analysis</h3>
      <pre><code className="language-bash">{`# Install globally
npm install -g clinic

# clinic doctor: identifies root cause of performance issue
clinic doctor -- node server.js
# Generates HTML report: Is it CPU? I/O? Memory? Async?

# clinic flame: generates CPU flame graph
clinic flame -- node server.js
# Shows where CPU time is being spent as interactive SVG

# clinic bubbleprof: profiles async operations
clinic bubbleprof -- node server.js
# Shows async operation chains and their durations

# Run load while clinic is profiling
# (in a separate terminal)
autocannon -c 100 -d 30 http://localhost:3000
# Then Ctrl+C the clinic process to generate report`}</code></pre>

      <h3>V8 CPU Profiler via --prof Flag</h3>
      <pre><code className="language-bash">{`# Generate V8 profiler log
node --prof server.js

# Apply load, then stop server
# This creates a file: isolate-0x....-v8.log

# Process the log into human-readable format
node --prof-process isolate-*.log > profile.txt

# Key sections to check in profile.txt:
# [Summary] — time in JS, C++, GC, idle
# [Bottom up (heavy) profile] — hottest functions
# [JavaScript] section — your code's hot paths`}</code></pre>

      <h3>0x — Single-Command Flame Graphs</h3>
      <pre><code className="language-bash">{`# Install 0x (zero-x)
npm install -g 0x

# Profile and generate flamegraph in one command
0x server.js

# With existing running process (Linux only)
0x --pid <pid>

# Output: flamegraph.html — open in browser
# Hot frames appear wider; look for wide frames in YOUR code
# Dark orange/red = hot path (high CPU time)`}</code></pre>

      <h2>Memory Management and Detecting Leaks</h2>
      <p>
        Memory leaks in Node.js cause heap growth over time, eventually leading to OOM (Out of Memory)
        crashes or degraded performance as garbage collection becomes more frequent.
      </p>

      <h3>Understanding V8 Heap Structure</h3>
      <pre><code className="language-javascript">{`// Check memory usage
const used = process.memoryUsage();
console.log({
  rss: Math.round(used.rss / 1024 / 1024) + ' MB',         // Resident Set Size
  heapTotal: Math.round(used.heapTotal / 1024 / 1024) + ' MB', // V8 heap allocated
  heapUsed: Math.round(used.heapUsed / 1024 / 1024) + ' MB',   // V8 heap in use
  external: Math.round(used.external / 1024 / 1024) + ' MB',   // C++ objects (Buffers)
  arrayBuffers: Math.round(used.arrayBuffers / 1024 / 1024) + ' MB',
});

// Monitor heap over time
setInterval(() => {
  const { heapUsed, heapTotal } = process.memoryUsage();
  const used = (heapUsed / 1024 / 1024).toFixed(1);
  const total = (heapTotal / 1024 / 1024).toFixed(1);
  console.log(\`Heap: \${used}MB / \${total}MB\`);
}, 10_000);`}</code></pre>

      <h3>Taking Heap Snapshots</h3>
      <pre><code className="language-javascript">{`// Method 1: Built-in v8 module (Node.js 11.13+)
const v8 = require('v8');
const path = require('path');
const fs = require('fs');

function takeHeapSnapshot() {
  const filename = \`heap-\${Date.now()}.heapsnapshot\`;
  const snapshotPath = path.join('/tmp', filename);
  const snapshot = v8.writeHeapSnapshot(snapshotPath);
  console.log('Heap snapshot written to:', snapshot);
  return snapshot;
}

// Take snapshot on demand via HTTP endpoint (useful in production)
app.get('/debug/heap', (req, res) => {
  const file = takeHeapSnapshot();
  res.download(file);
});

// Method 2: heapdump package (older approach)
// npm install heapdump
const heapdump = require('heapdump');
process.on('SIGUSR2', () => {
  heapdump.writeSnapshot((err, filename) => {
    if (!err) console.log('Heap snapshot:', filename);
  });
});
// Trigger: kill -USR2 <pid>`}</code></pre>

      <h3>Common Memory Leak Patterns and Fixes</h3>
      <pre><code className="language-javascript">{`// ❌ LEAK 1: Unbounded cache (Map that only grows)
const cache = new Map();
app.get('/user/:id', async (req, res) => {
  if (!cache.has(req.params.id)) {
    cache.set(req.params.id, await db.getUser(req.params.id));
  }
  res.json(cache.get(req.params.id));
  // Problem: cache never evicts entries → unbounded memory
});

// ✅ Fix: Use LRU cache with size limit
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 }); // 1000 items, 5min TTL

// ❌ LEAK 2: Event listener accumulation
function startPolling(emitter) {
  setInterval(() => emitter.emit('data', Date.now()), 1000);
  emitter.on('data', (ts) => processData(ts));
  // Called multiple times → listeners pile up
}

// ✅ Fix: Remove listener or use .once()
function startPolling(emitter) {
  const handler = (ts) => processData(ts);
  emitter.on('data', handler);
  return () => emitter.removeListener('data', handler); // return cleanup fn
}

// ❌ LEAK 3: Closure holding large buffer
function processRequest(largeBuffer) {
  const summary = computeSummary(largeBuffer);
  return {
    getSummary: () => summary,
    getOriginal: () => largeBuffer, // keeps largeBuffer in memory
  };
}

// ✅ Fix: Don't capture what you don't need
function processRequest(largeBuffer) {
  const summary = computeSummary(largeBuffer);
  // largeBuffer is now eligible for GC after this function returns
  return { getSummary: () => summary };
}

// ❌ LEAK 4: Global array accumulation
const requestLog = [];
app.use((req) => {
  requestLog.push({ url: req.url, time: Date.now() }); // grows forever
});

// ✅ Fix: Use circular buffer or stream to file
const MAX_LOG = 10000;
const requestLog = [];
app.use((req) => {
  requestLog.push({ url: req.url, time: Date.now() });
  if (requestLog.length > MAX_LOG) requestLog.shift(); // evict oldest
});`}</code></pre>

      <h3>memwatch-next for Automatic Leak Detection</h3>
      <pre><code className="language-javascript">{`// npm install @airbnb/node-memwatch
const memwatch = require('@airbnb/node-memwatch');

// Alert when heap grows significantly
memwatch.on('leak', (info) => {
  console.error('Memory leak detected:', info);
  // info: { start, end, growth, reason }
});

// Diff two heap snapshots to find what grew
const hd = new memwatch.HeapDiff();
// ... do some work ...
const diff = hd.end();
console.log('Heap diff:', JSON.stringify(diff.change, null, 2));
// Shows which object types grew and by how much`}</code></pre>

      <h2>CPU Profiling and Flame Graphs</h2>
      <p>
        A flame graph visualizes call stacks sampled during CPU profiling. Each box is a function;
        width represents the percentage of time spent in that function (including its callees).
        The color is arbitrary — look for <strong>wide plateaus</strong> in your own code.
      </p>

      <h3>Reading a Flame Graph</h3>
      <pre><code className="language-text">{`Flame Graph Reading Guide:

  Top    → most recently called function (on CPU right now)
  Bottom → entry point (main, HTTP handler, etc.)
  Width  → % of total CPU time (WIDE = slow = investigate!)
  Color  → arbitrary; orange = JS, green = C++, red = hot path (in some tools)

  Example pattern to look for:
  ┌─────────────────────────────────────────────────────┐
  │                 requestHandler                      │  ← wide = slow!
  │    dbQuery           │    serialize    │  validate  │
  │  pg.query │ JSON.str │ JSON.str       │             │
  └─────────────────────────────────────────────────────┘
                              ↑
              JSON.stringify appearing twice = optimization opportunity
              (cache the serialized result)`}</code></pre>

      <h3>Optimizing Based on Flame Graph Findings</h3>
      <pre><code className="language-javascript">{`// Scenario: JSON.stringify is hot in flame graph
// ❌ Serializing the same data on every request
app.get('/config', (req, res) => {
  res.json(buildConfig()); // builds + serializes on every hit
});

// ✅ Serialize once, send string directly
let cachedConfig = null;
let cacheTime = 0;
const CACHE_TTL = 60_000; // 1 minute

app.get('/config', (req, res) => {
  const now = Date.now();
  if (!cachedConfig || now - cacheTime > CACHE_TTL) {
    cachedConfig = JSON.stringify(buildConfig());
    cacheTime = now;
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(cachedConfig); // no serialization overhead
});

// Scenario: RegExp is hot
// ❌ Compiling RegExp on every call
function validate(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // recompiles each call
}

// ✅ Compile once at module level
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(email) {
  return EMAIL_RE.test(email);
}

// Scenario: Object creation in hot loop
// ❌ Creating temp objects in tight loop
function processItems(items) {
  return items.map(item => ({ ...item, processed: true, ts: Date.now() }));
}

// ✅ Reuse buffer array, minimize allocations
function processItems(items) {
  const result = new Array(items.length);
  const ts = Date.now(); // compute once
  for (let i = 0; i < items.length; i++) {
    result[i] = Object.assign({}, items[i], { processed: true, ts });
  }
  return result;
}`}</code></pre>

      <h2>Cluster Module and worker_threads for CPU-Bound Tasks</h2>
      <p>
        Node.js is single-threaded, but modern servers have 4-128 CPU cores. Two mechanisms
        let you utilize them: the <strong>cluster module</strong> for scaling HTTP servers across
        cores, and <strong>worker_threads</strong> for parallelizing CPU-bound JavaScript within
        a single process.
      </p>

      <h3>Cluster Module</h3>
      <pre><code className="language-javascript">{`// cluster.js — Master/Worker HTTP server
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const NUM_CPUS = os.cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} starting \${NUM_CPUS} workers\`);

  // Fork one worker per CPU core
  for (let i = 0; i < NUM_CPUS; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(\`Worker \${worker.process.pid} died (\${signal || code}). Restarting...\`);
    cluster.fork(); // automatic restart on crash
  });

  // Zero-downtime rolling restart
  process.on('SIGUSR2', () => {
    const workers = Object.values(cluster.workers);
    let i = 0;
    function restartNext() {
      if (i >= workers.length) return;
      const worker = workers[i++];
      worker.once('exit', () => {
        cluster.fork().once('listening', restartNext);
      });
      worker.disconnect();
    }
    restartNext();
  });

} else {
  // Worker process — each has its own event loop
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(\`Hello from worker \${process.pid}\`);
  });

  server.listen(3000, () => {
    console.log(\`Worker \${process.pid} listening on port 3000\`);
  });
}`}</code></pre>

      <h3>worker_threads for CPU-Intensive Work</h3>
      <pre><code className="language-javascript">{`// worker-pool.js — A simple worker thread pool
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');
const path = require('path');

class WorkerPool {
  constructor(workerScript, size = os.cpus().length) {
    this.workers = [];
    this.queue = [];
    this.workerScript = workerScript;

    for (let i = 0; i < size; i++) {
      this.addWorker();
    }
  }

  addWorker() {
    const worker = new Worker(this.workerScript);
    const state = { worker, idle: true };

    worker.on('message', (result) => {
      state.resolve(result);
      state.idle = true;
      this.processQueue();
    });

    worker.on('error', (err) => {
      state.reject(err);
      state.idle = true;
      this.processQueue();
    });

    this.workers.push(state);
  }

  processQueue() {
    if (this.queue.length === 0) return;
    const idleWorker = this.workers.find(w => w.idle);
    if (!idleWorker) return;

    const { data, resolve, reject } = this.queue.shift();
    idleWorker.idle = false;
    idleWorker.resolve = resolve;
    idleWorker.reject = reject;
    idleWorker.worker.postMessage(data);
  }

  run(data) {
    return new Promise((resolve, reject) => {
      this.queue.push({ data, resolve, reject });
      this.processQueue();
    });
  }
}

// cpu-task.worker.js — the worker script
if (!isMainThread) {
  parentPort.on('message', ({ type, payload }) => {
    let result;
    switch (type) {
      case 'fibonacci':
        result = fibonacci(payload.n);
        break;
      case 'hash':
        const crypto = require('crypto');
        result = crypto.createHash('sha256').update(payload.data).digest('hex');
        break;
    }
    parentPort.postMessage(result);
  });

  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Usage in main thread
if (isMainThread) {
  const pool = new WorkerPool('./cpu-task.worker.js', 4);

  app.post('/hash', async (req, res) => {
    // Offload CPU work to worker; main thread stays free for other requests
    const hash = await pool.run({ type: 'hash', payload: { data: req.body.text } });
    res.json({ hash });
  });
}`}</code></pre>

      <h3>SharedArrayBuffer for Zero-Copy Data Transfer</h3>
      <pre><code className="language-javascript">{`// Transfer large data between threads without copying
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Allocate shared memory
  const sharedBuffer = new SharedArrayBuffer(4 * 1024 * 1024); // 4MB
  const view = new Int32Array(sharedBuffer);

  // Fill with data
  for (let i = 0; i < view.length; i++) view[i] = i;

  const worker = new Worker(__filename, {
    workerData: { sharedBuffer },
  });

  worker.on('message', (sum) => {
    console.log('Sum computed by worker:', sum);
  });

} else {
  // Worker reads from shared memory — no data copy!
  const view = new Int32Array(workerData.sharedBuffer);

  let sum = 0;
  for (let i = 0; i < view.length; i++) sum += view[i];

  parentPort.postMessage(sum);
}`}</code></pre>

      <h2>Optimizing Async Code and Stream Processing</h2>
      <p>
        Poorly structured async code can serialize operations that could run in parallel, or
        process large datasets all at once instead of streaming. Both patterns cause unnecessary
        latency and memory pressure.
      </p>

      <h3>Parallel vs Sequential Async Operations</h3>
      <pre><code className="language-javascript">{`// ❌ Sequential (slow): 3 × 100ms = 300ms total
async function getUserData(userId) {
  const user = await db.getUser(userId);           // 100ms
  const orders = await db.getOrders(userId);       // 100ms
  const preferences = await db.getPrefs(userId);  // 100ms
  return { user, orders, preferences };
}

// ✅ Parallel (fast): max(100ms, 100ms, 100ms) = 100ms total
async function getUserData(userId) {
  const [user, orders, preferences] = await Promise.all([
    db.getUser(userId),
    db.getOrders(userId),
    db.getPrefs(userId),
  ]);
  return { user, orders, preferences };
}

// ✅ Parallel with error handling (one failure doesn't abort others)
async function getUserData(userId) {
  const results = await Promise.allSettled([
    db.getUser(userId),
    db.getOrders(userId),
    db.getPrefs(userId),
  ]);
  return results.map(r => r.status === 'fulfilled' ? r.value : null);
}

// ❌ Promise.all on large array: all N requests fire simultaneously
const users = await Promise.all(userIds.map(id => db.getUser(id)));
// If userIds has 10,000 items, this opens 10,000 DB connections at once!

// ✅ Batched concurrency with p-limit
const pLimit = require('p-limit');
const limit = pLimit(20); // max 20 concurrent operations

const users = await Promise.all(
  userIds.map(id => limit(() => db.getUser(id)))
);`}</code></pre>

      <h3>Stream Processing for Large Datasets</h3>
      <pre><code className="language-javascript">{`const fs = require('fs');
const { Transform, pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

// ❌ Load entire file into memory (OOM risk for large files)
async function processLargeFile(filePath) {
  const content = await fs.promises.readFile(filePath, 'utf8'); // could be 2GB!
  const lines = content.split('\n');
  return lines.map(processLine);
}

// ✅ Stream line by line — constant memory usage regardless of file size
async function processLargeFile(filePath, outputPath) {
  let lineCount = 0;
  let buffer = '';

  const lineProcessor = new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete last line

      for (const line of lines) {
        if (line.trim()) {
          lineCount++;
          this.push(processLine(line) + '\n');
        }
      }
      callback();
    },
    flush(callback) {
      if (buffer.trim()) {
        this.push(processLine(buffer) + '\n');
      }
      callback();
    },
  });

  await pipelineAsync(
    fs.createReadStream(filePath),
    lineProcessor,
    fs.createWriteStream(outputPath)
  );

  return lineCount;
}

// ✅ HTTP response streaming — send data as it's ready
app.get('/large-data', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.write('[');

  const cursor = db.collection('events').find().cursor();
  let first = true;

  for await (const doc of cursor) {
    if (!first) res.write(',');
    res.write(JSON.stringify(doc));
    first = false;
  }

  res.write(']');
  res.end();
});`}</code></pre>

      <h2>Caching Strategies</h2>
      <p>
        Caching is the single most impactful optimization for most Node.js applications.
        A database query that takes 20ms can become a sub-millisecond in-memory lookup.
        The key is choosing the right cache layer for each type of data.
      </p>

      <h3>In-Memory Caching with lru-cache</h3>
      <pre><code className="language-javascript">{`// npm install lru-cache
const { LRUCache } = require('lru-cache');

// Cache configuration
const userCache = new LRUCache({
  max: 5000,              // maximum number of items
  ttl: 1000 * 60 * 5,    // 5 minutes TTL
  updateAgeOnGet: true,   // reset TTL on access
  updateAgeOnHas: false,
  // Optional: size-based eviction
  maxSize: 50_000_000,    // 50MB max cache size
  sizeCalculation: (value) => JSON.stringify(value).length,
});

// Cache-aside pattern
async function getUser(userId) {
  const cached = userCache.get(userId);
  if (cached) return cached;

  const user = await db.query('SELECT * FROM users WHERE id = \$1', [userId]);
  userCache.set(userId, user);
  return user;
}

// Invalidate on mutation
async function updateUser(userId, data) {
  await db.query('UPDATE users SET ... WHERE id = \$1', [userId]);
  userCache.delete(userId); // invalidate cache entry
}

// Cache function results (memoization)
function memoize(fn, cache = new LRUCache({ max: 1000, ttl: 60_000 })) {
  return async function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = await fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const cachedFetchWeather = memoize(fetchWeather);`}</code></pre>

      <h3>Redis Caching with ioredis</h3>
      <pre><code className="language-javascript">{`// npm install ioredis
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  lazyConnect: true,
});

// Basic cache-aside with Redis
async function getCachedUser(userId) {
  const key = \`user:\${userId}\`;

  // Try Redis first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Fall back to DB
  const user = await db.getUser(userId);

  // Cache for 5 minutes (EX = seconds)
  await redis.set(key, JSON.stringify(user), 'EX', 300);

  return user;
}

// Atomic cache update (SET NX = only set if not exists)
async function acquireLock(lockKey, ttlSeconds = 30) {
  const result = await redis.set(lockKey, '1', 'NX', 'EX', ttlSeconds);
  return result === 'OK'; // true if lock acquired
}

// Redis pipelining: batch multiple commands in one round trip
async function getMultipleUsers(userIds) {
  const pipeline = redis.pipeline();
  userIds.forEach(id => pipeline.get(\`user:\${id}\`));
  const results = await pipeline.exec();
  // results: [[null, value1], [null, value2], ...]
  return results.map(([err, val]) => val ? JSON.parse(val) : null);
}

// Cache invalidation by pattern (use sparingly — SCAN, not KEYS)
async function invalidateUserCache(userId) {
  const pattern = \`user:\${userId}*\`;
  let cursor = '0';
  do {
    const [newCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
    cursor = newCursor;
    if (keys.length) await redis.del(...keys);
  } while (cursor !== '0');
}`}</code></pre>

      <h3>HTTP Response Caching</h3>
      <pre><code className="language-javascript">{`const express = require('express');
const app = express();

// Cache-Control headers strategy
app.get('/static-data', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
  // Browser + CDN cache for 24 hours
  res.json(getStaticData());
});

app.get('/api/users', (req, res) => {
  res.setHeader('Cache-Control', 'private, max-age=60');
  // Only browser caches; 60 seconds
  res.json(getUsers());
});

app.get('/api/realtime', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  // Never cache
  res.json(getRealtimeData());
});

// ETag for conditional requests
app.get('/api/product/:id', async (req, res) => {
  const product = await db.getProduct(req.params.id);
  const etag = \`"\${product.updatedAt.getTime()}"\`;

  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // Not Modified — no body sent
  }

  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.json(product);
});`}</code></pre>

      <h2>Connection Pooling for Databases</h2>
      <p>
        Every database query over a new TCP connection incurs a TCP handshake (~1ms on LAN),
        TLS handshake (~5-10ms), and database authentication (~5-50ms). Connection pooling
        eliminates this overhead by reusing existing authenticated connections.
      </p>

      <h3>PostgreSQL Connection Pool (node-postgres)</h3>
      <pre><code className="language-javascript">{`// npm install pg
const { Pool } = require('pg');

// Create pool once at startup — never recreate per request
const pool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Pool configuration
  min: 2,         // Keep at least 2 connections open
  max: 20,        // Never exceed 20 connections
  idleTimeoutMillis: 30_000,    // Close idle connections after 30s
  connectionTimeoutMillis: 5_000, // Fail fast if pool is exhausted

  // SSL for production
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: true, ca: process.env.DB_CA_CERT }
    : false,
});

// Monitor pool health
pool.on('connect', (client) => {
  console.log('New client connected to PostgreSQL');
});
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Helper with automatic connection management
async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;

  if (duration > 1000) {
    console.warn('Slow query detected:', { text, duration, rows: result.rowCount });
  }

  return result;
}

// For transactions: use a dedicated client
async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - \$1 WHERE id = \$2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + \$1 WHERE id = \$2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release(); // CRITICAL: always release back to pool
  }
}`}</code></pre>

      <h3>MySQL Connection Pool</h3>
      <pre><code className="language-javascript">{`// npm install mysql2
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,       // 0 = unlimited queue
  connectTimeout: 10_000,
  idleTimeout: 60_000,
});

// Use pool directly — no manual connection management for simple queries
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?', [userId]
);

// For prepared statements (better performance for repeated queries)
const [rows] = await pool.execute(
  'SELECT * FROM orders WHERE user_id = ? AND status = ?',
  [userId, 'active']
);`}</code></pre>

      <h3>MongoDB Connection Pool</h3>
      <pre><code className="language-javascript">{`// npm install mongodb
const { MongoClient } = require('mongodb');

let client;

async function getMongoClient() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      // Pool configuration
      minPoolSize: 5,
      maxPoolSize: 50,
      maxIdleTimeMS: 30_000,
      serverSelectionTimeoutMS: 5_000,
      socketTimeoutMS: 45_000,

      // Compression to reduce network I/O
      compressors: ['snappy', 'zlib'],
    });
    await client.connect();
  }
  return client;
}

// Usage
async function findUser(userId) {
  const mongoClient = await getMongoClient();
  const db = mongoClient.db('myapp');
  return db.collection('users').findOne({ _id: userId });
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  if (client) await client.close();
  process.exit(0);
});`}</code></pre>

      <h2>PM2 Cluster Mode vs Single Process</h2>
      <p>
        PM2 is the standard Node.js process manager for production deployments. Its cluster
        mode leverages the Node.js cluster module automatically, distributing incoming connections
        across multiple worker processes.
      </p>

      <h3>PM2 Ecosystem Configuration</h3>
      <pre><code className="language-javascript">{`// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'api-server',
      script: 'dist/server.js',        // compiled output
      cwd: '/var/www/myapp',

      // Cluster mode: runs one instance per CPU core
      instances: 'max',                // or a number like 4
      exec_mode: 'cluster',            // vs 'fork' (single process)

      // Memory management
      max_memory_restart: '512M',      // restart if heap exceeds 512MB

      // Zero-downtime reload
      wait_ready: true,                // wait for app.send('ready')
      listen_timeout: 10000,           // ms before considering restart failed
      kill_timeout: 5000,              // ms before force-killing

      // Environment
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        UV_THREADPOOL_SIZE: 8,         // increase libuv thread pool
      },

      // Logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/var/log/myapp/error.log',
      out_file: '/var/log/myapp/out.log',
      merge_logs: true,                // merge all instance logs

      // Auto-restart on file change (dev only)
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
    },
  ],
};`}</code></pre>

      <pre><code className="language-bash">{`# Start in production mode
pm2 start ecosystem.config.js --env production

# Reload all workers with zero downtime (rolling restart)
pm2 reload api-server

# Check cluster status
pm2 status
pm2 describe api-server

# Monitor CPU and memory in real time
pm2 monit

# View logs
pm2 logs api-server --lines 100

# Save process list and enable startup on boot
pm2 startup
pm2 save

# Scale up/down without downtime
pm2 scale api-server 8    # scale to 8 instances
pm2 scale api-server +2   # add 2 more instances`}</code></pre>

      <h3>Single Process vs Cluster Comparison</h3>
      <pre><code className="language-text">{`Node.js Process Mode Comparison:

                    Fork (single)    Cluster (max)    cluster+sticky
Cores used         1               all CPUs          all CPUs
Requests/sec       ~10k            ~10k × CPU count  ~10k × CPU count
Memory overhead    base            base × N workers  base × N workers
WebSocket support  ✓               ✗ (round-robin)   ✓ (sticky sessions)
Shared memory      N/A             via Redis         via Redis
Session state      in-process      must use Redis    must use Redis
Good for           dev, serverless HTTP APIs          WS, real-time apps`}</code></pre>

      <h2>HTTP/2 and Compression</h2>
      <p>
        Network-level optimizations can dramatically reduce response times, especially for
        high-latency connections. HTTP/2 multiplexing eliminates head-of-line blocking,
        and compression reduces payload sizes by 60-90% for JSON and HTML.
      </p>

      <h3>HTTP/2 with Node.js</h3>
      <pre><code className="language-javascript">{`// Native HTTP/2 server (Node.js built-in)
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('/etc/ssl/private.key'),
  cert: fs.readFileSync('/etc/ssl/certificate.crt'),

  // HTTP/2 settings
  settings: {
    headerTableSize: 4096,
    enablePush: true,
    initialWindowSize: 65535,
    maxFrameSize: 16384,
    maxConcurrentStreams: 1000,
  },
});

server.on('stream', (stream, headers) => {
  const path = headers[':path'];

  if (path === '/api/data') {
    stream.respond({ ':status': 200, 'content-type': 'application/json' });
    stream.end(JSON.stringify({ data: 'hello http2' }));
  }

  // HTTP/2 Server Push — push CSS before browser asks for it
  if (path === '/index.html') {
    stream.pushStream({ ':path': '/styles.css' }, (err, pushStream) => {
      if (err) return;
      pushStream.respond({ ':status': 200, 'content-type': 'text/css' });
      fs.createReadStream('./public/styles.css').pipe(pushStream);
    });

    stream.respond({ ':status': 200, 'content-type': 'text/html' });
    fs.createReadStream('./public/index.html').pipe(stream);
  }
});

server.listen(443);`}</code></pre>

      <h3>Nginx as HTTP/2 Terminator (Recommended)</h3>
      <pre><code className="language-nginx">{`# /etc/nginx/sites-available/myapp.conf
server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate     /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

    # Modern TLS configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript
               application/x-javascript text/xml application/xml
               application/xml+rss text/javascript image/svg+xml;
    gzip_comp_level 6;      # 1-9; 6 is sweet spot

    # Brotli (better compression than gzip, requires ngx_brotli module)
    brotli on;
    brotli_comp_level 6;
    brotli_types text/plain text/css application/json application/javascript;

    # Upstream connection pool to Node.js
    upstream nodejs {
        least_conn;                    # route to least-busy worker
        keepalive 64;                  # keep 64 connections to Node.js open
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
    }

    location /api/ {
        proxy_pass http://nodejs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;

        # Performance headers
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
}`}</code></pre>

      <h3>Compression in Node.js/Express</h3>
      <pre><code className="language-javascript">{`// npm install compression
const compression = require('compression');
const express = require('express');
const app = express();

// Enable gzip/deflate compression for all responses
app.use(compression({
  level: 6,             // 0-9 (6 is default sweet spot)
  threshold: 1024,      // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));

// Manual Brotli/gzip with Accept-Encoding negotiation
const zlib = require('zlib');

app.get('/large-data', async (req, res) => {
  const data = JSON.stringify(await getLargeDataset());
  const acceptEncoding = req.headers['accept-encoding'] || '';

  if (/\bbr\b/.test(acceptEncoding)) {
    res.setHeader('Content-Encoding', 'br');
    res.setHeader('Content-Type', 'application/json');
    zlib.brotliCompress(data, (err, compressed) => {
      if (err) return res.json(JSON.parse(data));
      res.send(compressed);
    });
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    zlib.gzip(data, (err, compressed) => {
      if (err) return res.json(JSON.parse(data));
      res.send(compressed);
    });
  } else {
    res.json(JSON.parse(data));
  }
});`}</code></pre>

      <h2>Node.js Benchmarking with autocannon and wrk</h2>
      <p>
        Benchmarking provides objective data about your application's throughput and latency
        characteristics. Focus on percentile latency (p95, p99) rather than just average — your
        slowest users determine the true user experience.
      </p>

      <h3>autocannon</h3>
      <pre><code className="language-bash">{`# Install autocannon
npm install -g autocannon

# Basic benchmark: 100 concurrent connections, 30 seconds
autocannon -c 100 -d 30 http://localhost:3000/api/users

# Output:
# Running 30s test @ http://localhost:3000/api/users
# 100 connections
#
# Stat         Avg      Stdev    Max
# Latency      2.04 ms  0.61 ms  18 ms
# Req/Sec      48312.8  2245.13  51200
# Bytes/Sec    8.45 MB  392 kB   8.97 MB
#
# 1449k requests in 30.01s, 253 MB read

# With POST body and custom headers
autocannon -c 50 -d 20 \
  -m POST \
  -H 'Content-Type: application/json' \
  -b '{"email":"test@example.com","password":"secret"}' \
  http://localhost:3000/api/login

# Compare before/after optimization
autocannon -c 100 -d 30 --json http://localhost:3000 > before.json
# ... make changes ...
autocannon -c 100 -d 30 --json http://localhost:3000 > after.json

# Multiple endpoints in sequence
autocannon -c 100 -d 10 http://localhost:3000/api/a
autocannon -c 100 -d 10 http://localhost:3000/api/b`}</code></pre>

      <h3>autocannon Programmatic API</h3>
      <pre><code className="language-javascript">{`// npm install autocannon
const autocannon = require('autocannon');

async function benchmark(url, options = {}) {
  const result = await autocannon({
    url,
    connections: 100,
    duration: 30,
    pipelining: 1,
    ...options,
  });

  console.table({
    'Requests/sec': result.requests.average,
    'Latency p50 (ms)': result.latency.p50,
    'Latency p95 (ms)': result.latency.p95,
    'Latency p99 (ms)': result.latency.p99,
    'Latency max (ms)': result.latency.max,
    'Throughput (MB/s)': (result.throughput.average / 1024 / 1024).toFixed(2),
    'Errors': result.errors,
    '2xx responses': result['2xx'],
    'Non-2xx': result.non2xx,
  });

  return result;
}

// Run benchmark and fail CI if performance regresses
async function runPerfTest() {
  const result = await benchmark('http://localhost:3000/api/health');

  const P99_THRESHOLD = 50;  // 50ms p99 SLA
  const RPS_THRESHOLD = 5000; // minimum 5k req/sec

  if (result.latency.p99 > P99_THRESHOLD) {
    throw new Error(\`p99 latency \${result.latency.p99}ms exceeds threshold \${P99_THRESHOLD}ms\`);
  }
  if (result.requests.average < RPS_THRESHOLD) {
    throw new Error(\`Throughput \${result.requests.average} rps below threshold \${RPS_THRESHOLD} rps\`);
  }

  console.log('Performance test PASSED');
}

runPerfTest().catch(err => { console.error(err); process.exit(1); });`}</code></pre>

      <h3>wrk and wrk2</h3>
      <pre><code className="language-bash">{`# Install wrk (macOS)
brew install wrk

# Basic wrk test
wrk -t12 -c400 -d30s http://localhost:3000/api/users
# -t: threads (use number of CPU cores)
# -c: connections
# -d: duration

# wrk with Lua script for custom requests
cat > post.lua << 'EOF'
wrk.method = "POST"
wrk.body   = '{"user":"test"}'
wrk.headers["Content-Type"] = "application/json"
EOF

wrk -t4 -c100 -d30s -s post.lua http://localhost:3000/api/users

# wrk2 for constant-rate testing (measures coordinated omission correctly)
# install from https://github.com/giltene/wrk2
wrk2 -t4 -c100 -d30s -R10000 http://localhost:3000
# -R: target request rate (10k rps)
# Reports HDR histogram for accurate p99.9 latency`}</code></pre>

      <h2>Common Performance Anti-Patterns</h2>
      <p>
        These patterns are frequently found in Node.js codebases and have a measurable negative
        impact on performance. Recognize them in code reviews and refactor aggressively.
      </p>

      <pre><code className="language-javascript">{`// ❌ ANTI-PATTERN 1: N+1 queries
// Fetches 1 order list + N separate user queries
app.get('/orders', async (req, res) => {
  const orders = await db.query('SELECT * FROM orders');
  const enriched = await Promise.all(
    orders.map(async order => ({
      ...order,
      user: await db.query('SELECT * FROM users WHERE id = \$1', [order.userId]),
    }))
  );
  res.json(enriched);
});

// ✅ Fix: JOIN or batch fetch
app.get('/orders', async (req, res) => {
  const orders = await db.query(\`
    SELECT o.*, u.name, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
  \`);
  res.json(orders.rows);
});

// ❌ ANTI-PATTERN 2: Awaiting in a loop (serial execution)
async function sendNotifications(userIds) {
  for (const id of userIds) {
    await emailService.send(id); // sends one at a time!
  }
}

// ✅ Fix: parallel with concurrency limit
const pLimit = require('p-limit');
const limit = pLimit(10);

async function sendNotifications(userIds) {
  await Promise.all(userIds.map(id => limit(() => emailService.send(id))));
}

// ❌ ANTI-PATTERN 3: Creating a new DB client per request
app.get('/user/:id', async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect(); // new TCP + auth handshake every request!
  const user = await client.db('app').collection('users').findOne({ _id: req.params.id });
  await client.close();
  res.json(user);
});

// ✅ Fix: Create client once at startup (see connection pooling section)

// ❌ ANTI-PATTERN 4: Synchronous JSON stringify for large objects in hot path
app.get('/report', async (req, res) => {
  const report = await generateFullReport(); // 5MB object
  res.json(report); // synchronously serializes 5MB, blocks event loop!
});

// ✅ Fix: Stream the JSON response or use a streaming serializer
const { Readable } = require('stream');
const JSONStream = require('jsonstream'); // npm install JSONStream

app.get('/report', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const cursor = db.collection('report_items').find();
  cursor.pipe(JSONStream.stringify()).pipe(res);
});

// ❌ ANTI-PATTERN 5: Missing index on queried fields
// SELECT * FROM users WHERE email = 'x@y.com' — full table scan without index!

// ✅ Fix: Always index columns used in WHERE, JOIN, ORDER BY
// PostgreSQL:
// CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
// MongoDB:
// db.users.createIndex({ email: 1 }, { unique: true });

// ❌ ANTI-PATTERN 6: Ignoring backpressure in streams
readable.on('data', (chunk) => {
  writable.write(chunk); // may write faster than consumer can handle
});

// ✅ Fix: Use pipeline or handle backpressure
const { pipeline } = require('stream/promises');
await pipeline(readable, transform, writable);`}</code></pre>

      <h2>Comparison: Node.js vs Bun vs Deno Performance</h2>
      <p>
        All three runtimes have improved significantly in 2026. Here is a realistic comparison
        based on community benchmarks and production reports. Remember: runtime speed is rarely
        the bottleneck in real applications — database I/O and business logic dominate.
      </p>

      <table>
        <thead>
          <tr>
            <th>Benchmark</th>
            <th>Node.js 22</th>
            <th>Deno 2.x</th>
            <th>Bun 1.x</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTTP hello world (req/sec)</td>
            <td>~85k</td>
            <td>~130k (1.5x)</td>
            <td>~250k (3x)</td>
          </tr>
          <tr>
            <td>JSON parse/stringify</td>
            <td>Baseline</td>
            <td>~10% faster</td>
            <td>~30% faster</td>
          </tr>
          <tr>
            <td>Startup time</td>
            <td>~50ms</td>
            <td>~30ms</td>
            <td>~5ms</td>
          </tr>
          <tr>
            <td>npm package install</td>
            <td>Baseline (npm)</td>
            <td>~10% faster</td>
            <td>10-30x faster</td>
          </tr>
          <tr>
            <td>File I/O throughput</td>
            <td>Baseline</td>
            <td>~5% faster</td>
            <td>~20% faster</td>
          </tr>
          <tr>
            <td>Memory baseline</td>
            <td>~35MB</td>
            <td>~40MB</td>
            <td>~25MB</td>
          </tr>
          <tr>
            <td>npm ecosystem compat</td>
            <td>100%</td>
            <td>~95%</td>
            <td>~98%</td>
          </tr>
          <tr>
            <td>TypeScript native</td>
            <td>Partial (v22)</td>
            <td>Full</td>
            <td>Full</td>
          </tr>
          <tr>
            <td>Real-world app perf delta</td>
            <td>Baseline</td>
            <td>5-15% faster</td>
            <td>10-20% faster</td>
          </tr>
          <tr>
            <td>Production maturity</td>
            <td>Excellent</td>
            <td>Good</td>
            <td>Good</td>
          </tr>
          <tr>
            <td>Best use case</td>
            <td>Enterprise, large teams</td>
            <td>TypeScript-first APIs</td>
            <td>New projects, CLIs</td>
          </tr>
        </tbody>
      </table>

      <h3>When the Runtime Choice Actually Matters</h3>
      <pre><code className="language-text">{`Runtime performance matters most for:
  ✓ CLI tools with fast startup (Bun wins significantly)
  ✓ Serverless functions (cold start time → Bun/Deno)
  ✓ CPU-bound computation (Bun's JavaScriptCore is faster for some ops)
  ✓ High-fan-out HTTP proxies with minimal business logic

Runtime performance matters least for:
  ✗ APIs backed by a database (DB latency >> runtime overhead)
  ✗ Applications with in-process caching (cache hits dominate)
  ✗ Microservices with substantial business logic
  ✗ Long-lived processes (startup time irrelevant)

Rule of thumb:
  If DB query = 5ms and your Node.js overhead = 0.1ms,
  switching to Bun (overhead ~0.03ms) saves 0.07ms per request.
  Fixing the missing index (5ms → 0.1ms) saves 4.9ms per request.

  Profile and optimize your own code first.`}</code></pre>

      <h2>Performance Monitoring in Production</h2>
      <pre><code className="language-javascript">{`// Minimal production performance instrumentation
const { performance, PerformanceObserver } = require('perf_hooks');

// 1. Time async operations
async function timedDbQuery(sql, params) {
  const start = performance.now();
  try {
    const result = await pool.query(sql, params);
    const duration = performance.now() - start;

    // Log slow queries
    if (duration > 100) {
      console.warn(\`Slow query (\${duration.toFixed(1)}ms): \${sql.substring(0, 100)}\`);
    }

    // Report to APM (Datadog, New Relic, etc.)
    metrics.histogram('db.query.duration', duration, { sql: sql.split(' ')[0] });

    return result;
  } catch (err) {
    metrics.increment('db.query.error');
    throw err;
  }
}

// 2. Express middleware for request timing
app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6; // ms
    const route = req.route ? req.route.path : req.path;

    metrics.histogram('http.request.duration', duration, {
      method: req.method,
      route,
      status: res.statusCode,
    });

    if (duration > 1000) {
      console.warn(\`Slow request: \${req.method} \${req.path} \${duration.toFixed(0)}ms\`);
    }
  });

  next();
});

// 3. GC monitoring
const gcStats = { count: 0, totalDuration: 0 };
const gcObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    gcStats.count++;
    gcStats.totalDuration += entry.duration;
    if (entry.duration > 100) {
      console.warn(\`GC pause: \${entry.detail.type} \${entry.duration.toFixed(1)}ms\`);
    }
  }
});
gcObserver.observe({ type: 'gc', buffered: true });

// Report GC metrics every minute
setInterval(() => {
  metrics.gauge('gc.count', gcStats.count);
  metrics.gauge('gc.total_duration_ms', gcStats.totalDuration);
  gcStats.count = 0;
  gcStats.totalDuration = 0;
}, 60_000);`}</code></pre>

      <h2>FAQ</h2>

      <h3>How do I profile a Node.js application to find performance bottlenecks?</h3>
      <p>
        Use the built-in <code>--inspect</code> flag to connect Chrome DevTools for CPU profiling
        and flame graphs. Run <code>node --inspect-brk server.js</code>, open <code>chrome://inspect</code>,
        and start a recording in the Performance tab. For production profiling, use clinic.js
        (<code>npm install -g clinic</code>), which provides <code>clinic doctor</code>,
        <code>clinic flame</code>, and <code>clinic bubbleprof</code> sub-commands.
        The <code>clinic doctor</code> command identifies the most likely root cause automatically.
      </p>

      <h3>What are the phases of the Node.js event loop?</h3>
      <p>
        The Node.js event loop has six phases: (1) Timers — executes setTimeout and setInterval
        callbacks; (2) Pending callbacks — I/O callbacks deferred to the next loop; (3) Idle/Prepare
        — internal use only; (4) Poll — retrieves new I/O events and executes callbacks; (5) Check
        — executes setImmediate callbacks; (6) Close callbacks. Microtasks (Promise.then,
        process.nextTick) run between every phase transition, with process.nextTick having higher
        priority than Promise callbacks.
      </p>

      <h3>How do I detect and fix memory leaks in Node.js?</h3>
      <p>
        Monitor heap growth over time with <code>process.memoryUsage()</code>. When you suspect
        a leak, take heap snapshots with <code>v8.writeHeapSnapshot()</code> before and after
        a period of high load, then compare them in Chrome DevTools Memory tab — objects that
        grew indicate the leak source. Common causes are forgotten event listeners, unbounded
        Map/array caches, and closures holding references to large objects.
      </p>

      <h3>When should I use worker_threads vs the cluster module?</h3>
      <p>
        Use <code>worker_threads</code> for CPU-intensive JavaScript work within a single process
        — image processing, cryptography, complex calculations — where you want to share memory
        via SharedArrayBuffer. Use the cluster module (or PM2 cluster mode) to run multiple
        Node.js processes across all CPU cores, each with its own memory, for scaling HTTP servers.
        For most web APIs, PM2 cluster mode is simpler; use worker_threads only when you need
        parallelism within a single request handler.
      </p>

      <h3>How does caching improve Node.js performance?</h3>
      <p>
        Caching avoids redundant database queries and computations. In-process LRU caches
        (lru-cache) serve data in under 0.1ms vs 5-50ms for a database query. Redis is the
        standard for distributed caching across multiple Node.js instances. HTTP caching with
        Cache-Control headers lets browsers and CDNs serve responses without hitting your server
        at all. A typical production stack combines all three layers.
      </p>

      <h3>How do I benchmark a Node.js HTTP server?</h3>
      <p>
        Use autocannon (<code>npm install -g autocannon</code>): run
        <code>autocannon -c 100 -d 30 http://localhost:3000</code> for 100 concurrent connections
        over 30 seconds. It reports req/sec, latency percentiles (p50/p95/p99), and throughput.
        Always warm up the server for 10-15 seconds before measuring, use realistic payload sizes,
        and focus on p99 latency rather than average — your slowest users define the experience.
      </p>

      <h3>What is connection pooling and why is it important?</h3>
      <p>
        Connection pooling reuses existing authenticated database connections instead of creating
        a new TCP + TLS + auth handshake on every query. A new connection costs 5-100ms; a pooled
        connection costs under 1ms. For PostgreSQL use <code>pg.Pool</code>, for MySQL use
        <code>mysql2.createPool</code>, and MongoDB manages its own pool internally. Configure
        pool size based on your database server's <code>max_connections</code> and your
        application's concurrency needs.
      </p>

      <h3>Is Node.js fast enough compared to Bun or Deno?</h3>
      <p>
        In raw HTTP benchmarks, Bun is 2-4x faster than Node.js and Deno is 1.5-2x faster.
        However, real-world differences are much smaller because database I/O, caching, and
        business logic dominate response time. For most production applications backed by a
        database, switching runtimes yields less than 10% improvement. Optimizing queries,
        adding indexes, and implementing caching will deliver 10-100x more impact than changing
        the runtime. Choose Node.js for its ecosystem maturity and LTS guarantees; consider Bun
        for CLI tools where startup time matters.
      </p>
    </>
  );
}

function ChineseContent() {
  return (
    <>
      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          borderLeft: '4px solid #0ea5e9',
          padding: '16px',
          margin: '24px 0',
          borderRadius: '4px',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          TL;DR — Node.js 性能速查
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.8' }}>
          <li>永远不要阻塞事件循环——使用异步 I/O、流和 worker_threads 处理 CPU 密集任务。</li>
          <li>使用 <code>node --inspect</code> + Chrome DevTools 或 <code>clinic.js</code> 生成火焰图进行分析。</li>
          <li>通过堆快照检测内存泄漏；常见原因是遗忘的监听器和无界缓存。</li>
          <li>使用 cluster 模块或 PM2 集群模式充分利用所有 CPU 核心。</li>
          <li>用 lru-cache 缓存热点数据，用 Redis 缓存共享状态；池化数据库连接。</li>
          <li>通过前置 Nginx 启用 gzip/Brotli 压缩和 HTTP/2。</li>
          <li>用 autocannon 进行基准测试；关注 p99 延迟，而非仅看平均 req/sec。</li>
        </ul>
      </div>

      <h2>为什么 Node.js 性能很重要</h2>
      <p>
        Netflix、LinkedIn、PayPal 和 Uber 都使用 Node.js 每秒处理数百万请求。
        其非阻塞、事件驱动架构对 I/O 密集型工作负载极为高效——但同样的单线程模型意味着
        一个阻塞操作会让所有连接用户的整个服务器陷入停顿。理解 Node.js 性能不是可选项，
        而是构建可靠、可扩展后端系统的基础。
      </p>
      <p>
        本指南深入覆盖 Node.js 性能的每个层面：运行时内部机制、分析工具、内存管理、
        并行性、缓存、网络级优化和基准测试方法论。无论你是在调试一个慢 API 端点，
        还是从头设计高吞吐量微服务，这里的技术都直接适用。
      </p>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '20px',
          borderRadius: '8px',
          margin: '24px 0',
        }}
      >
        <strong style={{ fontSize: '1rem', color: '#1e293b', display: 'block', marginBottom: '12px' }}>
          核心要点
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155', lineHeight: '1.8' }}>
          <li>事件循环有 6 个阶段；微任务（Promise、nextTick）在每个阶段转换之间运行。</li>
          <li>阻塞事件循环超过约 10ms 会降低所有并发请求的延迟。</li>
          <li>使用火焰图进行 CPU 分析是找到生产环境热点路径的最快方式。</li>
          <li>Node.js 内存泄漏通常是事件监听器、闭包或无界 Map/数组。</li>
          <li>连接池将查询延迟从 50-100ms 降低到每次调用不到 1ms。</li>
          <li>Bun 在微基准测试中比 Node.js 快 2-4 倍，但架构选择更重要。</li>
          <li>PM2 集群模式在 2 核机器上只需一行配置即可使吞吐量翻倍。</li>
        </ul>
      </div>

      <h2>事件循环深入解析：阶段、微任务和宏任务</h2>
      <p>
        事件循环是 Node.js 并发性的核心。与每个连接创建一个操作系统线程的多线程服务器不同，
        Node.js 在单线程上运行所有 JavaScript。事件循环逐阶段处理回调，
        实现无线程开销的非阻塞 I/O。
      </p>

      <h3>六个事件循环阶段</h3>
      <pre><code className="language-text">{`事件循环迭代（一次"tick"）:

  ┌────────────────────────────────────────────┐
  │               事件循环                     │
  │                                            │
  │  1. TIMERS          setTimeout / setInterval│
  │  2. PENDING CB      上次tick延迟的I/O回调   │
  │  3. IDLE / PREPARE  仅供内部使用            │
  │  4. POLL            获取新I/O事件           │
  │  5. CHECK           setImmediate()          │
  │  6. CLOSE CB        socket.on('close', ...) │
  │                                            │
  │  每个阶段之间：                             │
  │    → 清空 process.nextTick 队列            │
  │    → 清空 Promise 微任务队列               │
  └────────────────────────────────────────────┘`}</code></pre>

      <h3>什么会阻塞事件循环</h3>
      <pre><code className="language-javascript">{`// ❌ 阻塞事件循环 — 服务器中绝对不要这样做
const data = fs.readFileSync('/large-file.csv');   // 阻塞磁盘读取
const obj = JSON.parse(hugejsonString);            // 100MB+可能需要500ms
for (let i = 0; i < 1_000_000_000; i++) {}        // 阻塞1-5秒

// ✅ 非阻塞替代方案
const data = await fs.promises.readFile('/large-file.csv');

// 将大型JSON工作拆分为块
function parseChunked(str) {
  return new Promise(resolve => setImmediate(() => resolve(JSON.parse(str))));
}

// 异步加密
const hash = await new Promise((resolve, reject) =>
  crypto.pbkdf2(password, salt, 100000, 64, 'sha512',
    (err, key) => err ? reject(err) : resolve(key))
);`}</code></pre>

      <h2>Node.js 应用分析</h2>

      <h3>内置：node --inspect 配合 Chrome DevTools</h3>
      <pre><code className="language-bash">{`# 启用检查器
node --inspect server.js

# 在第一行暂停（等待调试器）
node --inspect-brk server.js

# 对运行中的服务器：发送 SIGUSR1 激活检查器
kill -SIGUSR1 <pid>

# 然后在Chrome中打开：chrome://inspect
# 点击 Remote Target 下的 "inspect"
# 转到 Performance 标签 → Record → 施加负载 → Stop`}</code></pre>

      <h3>clinic.js — 自动化性能分析</h3>
      <pre><code className="language-bash">{`# 全局安装
npm install -g clinic

# clinic doctor：识别性能问题根本原因
clinic doctor -- node server.js
# 生成HTML报告：是CPU？I/O？内存？异步？

# clinic flame：生成CPU火焰图
clinic flame -- node server.js
# 以交互式SVG显示CPU时间消耗在哪里

# clinic bubbleprof：分析异步操作
clinic bubbleprof -- node server.js
# 显示异步操作链及其持续时间

# 在clinic分析时施加负载（在另一个终端）
autocannon -c 100 -d 30 http://localhost:3000
# 然后 Ctrl+C 停止clinic进程以生成报告`}</code></pre>

      <h2>内存管理和检测泄漏</h2>

      <h3>常见内存泄漏模式与修复</h3>
      <pre><code className="language-javascript">{`// ❌ 泄漏1：无界缓存（只增不减的Map）
const cache = new Map();
app.get('/user/:id', async (req, res) => {
  if (!cache.has(req.params.id)) {
    cache.set(req.params.id, await db.getUser(req.params.id));
  }
  res.json(cache.get(req.params.id));
  // 问题：缓存永不淘汰 → 无限内存增长
});

// ✅ 修复：使用有大小限制的LRU缓存
const LRU = require('lru-cache');
const cache = new LRU({ max: 1000, ttl: 1000 * 60 * 5 }); // 1000项，5分钟TTL

// ❌ 泄漏2：事件监听器堆积
function startPolling(emitter) {
  setInterval(() => emitter.emit('data', Date.now()), 1000);
  emitter.on('data', (ts) => processData(ts));
  // 多次调用 → 监听器堆积
}

// ✅ 修复：移除监听器或使用 .once()
function startPolling(emitter) {
  const handler = (ts) => processData(ts);
  emitter.on('data', handler);
  return () => emitter.removeListener('data', handler); // 返回清理函数
}

// ✅ 取堆快照进行对比分析
const v8 = require('v8');
function takeHeapSnapshot() {
  const filename = \`heap-\${Date.now()}.heapsnapshot\`;
  return v8.writeHeapSnapshot(\`/tmp/\${filename}\`);
}

// 通过HTTP端点按需获取快照
app.get('/debug/heap', (req, res) => {
  const file = takeHeapSnapshot();
  res.download(file);
});`}</code></pre>

      <h2>CPU 分析和火焰图</h2>
      <pre><code className="language-bash">{`# 使用0x生成火焰图（推荐）
npm install -g 0x
0x server.js

# 生成 flamegraph.html — 在浏览器中打开
# 较宽的框架 = 消耗更多CPU时间
# 在你自己的代码中寻找宽平台

# 使用V8内置分析器
node --prof server.js
# 施加负载后停止服务器，生成 isolate-*.log
node --prof-process isolate-*.log > profile.txt`}</code></pre>

      <h2>Cluster 模块和 worker_threads</h2>

      <h3>PM2 集群模式（推荐用于HTTP服务器）</h3>
      <pre><code className="language-javascript">{`// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-server',
    script: 'dist/server.js',
    instances: 'max',          // 每个CPU核心一个实例
    exec_mode: 'cluster',      // 集群模式
    max_memory_restart: '512M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
  }],
};`}</code></pre>

      <h3>worker_threads 用于CPU密集型任务</h3>
      <pre><code className="language-javascript">{`const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // 将CPU密集型工作卸载到worker
  app.post('/process-image', async (req, res) => {
    const result = await new Promise((resolve, reject) => {
      const worker = new Worker('./image-processor.js', {
        workerData: { imageBuffer: req.body },
        transferList: [req.body.buffer], // 零拷贝传输
      });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
    res.json(result);
  });
} else {
  // Worker线程：执行CPU密集型工作，不阻塞主事件循环
  const result = processImage(workerData.imageBuffer);
  parentPort.postMessage(result);
}`}</code></pre>

      <h2>缓存策略</h2>
      <pre><code className="language-javascript">{`// 三层缓存策略

// 第1层：进程内LRU缓存（最快，< 0.1ms）
const { LRUCache } = require('lru-cache');
const localCache = new LRUCache({ max: 5000, ttl: 60_000 });

// 第2层：Redis分布式缓存（跨进程共享，< 1ms）
const redis = require('ioredis');
const client = new redis(process.env.REDIS_URL);

// 第3层：数据库（最慢，5-50ms）
async function getData(key) {
  // 检查本地缓存
  let data = localCache.get(key);
  if (data) return data;

  // 检查Redis
  const cached = await client.get(\`cache:\${key}\`);
  if (cached) {
    data = JSON.parse(cached);
    localCache.set(key, data); // 预热本地缓存
    return data;
  }

  // 从数据库获取
  data = await db.getData(key);
  await client.set(\`cache:\${key}\`, JSON.stringify(data), 'EX', 300);
  localCache.set(key, data);
  return data;
}`}</code></pre>

      <h2>数据库连接池</h2>
      <pre><code className="language-javascript">{`// PostgreSQL连接池配置
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  min: 2,                          // 保持至少2个连接
  max: 20,                         // 不超过20个连接
  idleTimeoutMillis: 30_000,       // 30秒后关闭空闲连接
  connectionTimeoutMillis: 5_000,  // 连接池耗尽时5秒超时
});

// 事务使用专用客户端
async function transfer(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE accounts SET balance = balance - \$1 WHERE id = \$2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + \$1 WHERE id = \$2',
      [amount, toId]
    );
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release(); // 关键：始终释放回连接池
  }
}`}</code></pre>

      <h2>Node.js vs Bun vs Deno 性能对比</h2>
      <table>
        <thead>
          <tr>
            <th>基准测试</th>
            <th>Node.js 22</th>
            <th>Deno 2.x</th>
            <th>Bun 1.x</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTTP hello world（req/sec）</td>
            <td>~85k</td>
            <td>~130k (1.5x)</td>
            <td>~250k (3x)</td>
          </tr>
          <tr>
            <td>JSON 解析/序列化</td>
            <td>基准</td>
            <td>快约10%</td>
            <td>快约30%</td>
          </tr>
          <tr>
            <td>启动时间</td>
            <td>~50ms</td>
            <td>~30ms</td>
            <td>~5ms</td>
          </tr>
          <tr>
            <td>npm 包安装</td>
            <td>基准</td>
            <td>快约10%</td>
            <td>快10-30倍</td>
          </tr>
          <tr>
            <td>内存基线</td>
            <td>~35MB</td>
            <td>~40MB</td>
            <td>~25MB</td>
          </tr>
          <tr>
            <td>npm生态兼容性</td>
            <td>100%</td>
            <td>~95%</td>
            <td>~98%</td>
          </tr>
          <tr>
            <td>真实应用性能差异</td>
            <td>基准</td>
            <td>快5-15%</td>
            <td>快10-20%</td>
          </tr>
          <tr>
            <td>生产成熟度</td>
            <td>优秀</td>
            <td>良好</td>
            <td>良好</td>
          </tr>
        </tbody>
      </table>

      <h2>用 autocannon 进行基准测试</h2>
      <pre><code className="language-bash">{`# 安装autocannon
npm install -g autocannon

# 基础基准测试：100并发连接，持续30秒
autocannon -c 100 -d 30 http://localhost:3000/api/users

# 关注输出中的关键指标：
# Latency p50/p95/p99 — 延迟百分位
# Req/Sec — 每秒请求数
# Bytes/Sec — 吞吐量
# Non-2xx — 错误率（应为0）

# 测试POST端点
autocannon -c 50 -d 20 \
  -m POST \
  -H 'Content-Type: application/json' \
  -b '{"email":"test@example.com"}' \
  http://localhost:3000/api/users

# 性能测试集成到CI/CD
# 若p99延迟 > 50ms或RPS < 5000则失败`}</code></pre>

      <h2>常见问题</h2>

      <h3>如何分析 Node.js 应用以找到性能瓶颈？</h3>
      <p>
        使用内置的 <code>--inspect</code> 标志连接 Chrome DevTools 进行 CPU 分析和火焰图。
        运行 <code>node --inspect-brk server.js</code>，在 Chrome 中打开 <code>chrome://inspect</code>，
        在 Performance 标签中开始录制。对于生产分析，使用 clinic.js
        (<code>npm install -g clinic</code>)，它提供 <code>clinic doctor</code>、
        <code>clinic flame</code> 和 <code>clinic bubbleprof</code> 子命令。
      </p>

      <h3>Node.js 事件循环有哪些阶段？</h3>
      <p>
        Node.js 事件循环有六个阶段：(1) Timers — 执行 setTimeout 和 setInterval 回调；
        (2) Pending callbacks — 推迟到下次循环的 I/O 回调；(3) Idle/Prepare — 仅供内部使用；
        (4) Poll — 获取新 I/O 事件并执行回调；(5) Check — 执行 setImmediate 回调；
        (6) Close callbacks。微任务（Promise.then、process.nextTick）在每次阶段转换之间运行，
        process.nextTick 优先级高于 Promise 回调。
      </p>

      <h3>如何检测和修复 Node.js 内存泄漏？</h3>
      <p>
        使用 <code>process.memoryUsage()</code> 随时间监控堆增长。
        当怀疑有泄漏时，使用 <code>v8.writeHeapSnapshot()</code> 在高负载前后各取一个堆快照，
        然后在 Chrome DevTools 内存标签中比较它们——增长的对象指示泄漏源。
        常见原因是遗忘的事件监听器、无界 Map/数组缓存和持有大对象引用的闭包。
      </p>

      <h3>什么时候应该使用 worker_threads vs cluster 模块？</h3>
      <p>
        对于单进程内的 CPU 密集型 JavaScript 工作（图像处理、加密、复杂计算）使用
        <code>worker_threads</code>——在这里你可以通过 SharedArrayBuffer 共享内存实现零拷贝数据传输。
        使用 cluster 模块（或 PM2 集群模式）跨所有 CPU 核心运行多个 Node.js 进程，
        每个进程有自己的内存——非常适合扩展 HTTP 服务器。
        对于大多数 Web API，PM2 集群模式更简单；只有在需要在单个请求处理程序内实现并行时
        才使用 worker_threads。
      </p>

      <h3>连接池是什么，为什么重要？</h3>
      <p>
        连接池重用已认证的数据库连接，而不是在每次查询时创建新的 TCP + TLS + 认证握手。
        创建新连接需要 5-100ms；池化连接不到 1ms。PostgreSQL 使用 <code>pg.Pool</code>，
        MySQL 使用 <code>mysql2.createPool</code>，MongoDB 在内部自动管理连接池。
        根据数据库服务器的 max_connections 和应用程序的并发需求配置池大小。
      </p>

      <h3>如何对 Node.js HTTP 服务器进行基准测试？</h3>
      <p>
        使用 autocannon (<code>npm install -g autocannon</code>)：
        运行 <code>autocannon -c 100 -d 30 http://localhost:3000</code> 进行 100 个并发连接
        持续 30 秒的测试。它报告 req/sec、延迟百分位（p50/p95/p99）和吞吐量。
        始终先预热服务器 10-15 秒，使用真实的有效负载大小，并关注 p99 延迟而非平均值。
      </p>

      <h3>Node.js 与 Bun 或 Deno 相比性能如何？</h3>
      <p>
        在原始 HTTP 基准测试中，Bun 比 Node.js 快 2-4 倍，Deno 快 1.5-2 倍。
        然而，现实差异要小得多，因为数据库 I/O、缓存和业务逻辑主导响应时间。
        对于大多数有数据库支持的生产应用，切换运行时带来的改善不到 10%。
        优化查询、添加索引和实施缓存将带来 10-100 倍更大的影响。
        选择 Node.js 是为了其生态系统成熟度和 LTS 保证；
        对于启动时间重要的 CLI 工具可以考虑 Bun。
      </p>

      <h3>如何避免 Node.js 中的常见性能反模式？</h3>
      <p>
        最常见的反模式：(1) N+1 查询——使用 JOIN 或批量获取替代循环中的单独查询；
        (2) 循环中的 await——使用 Promise.all 配合 p-limit 进行有界并发；
        (3) 每次请求创建数据库客户端——在启动时创建一次连接池；
        (4) 在热路径中同步序列化大型 JSON——缓存序列化结果或使用流式序列化；
        (5) 查询字段缺少索引——在 WHERE、JOIN 和 ORDER BY 列上添加索引。
      </p>
    </>
  );
}

export default function NodePerformanceGuide({ lang }: { lang: string }) {
  const isChinese = lang === 'zh';
  const t = translations[isChinese ? 'zh' : 'en'];

  return (
    <>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article title and meta */}
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>
        {t.title}
      </h1>
      <p style={{ color: '#475569', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.7' }}>
        {t.description}
      </p>

      {/* Render bilingual content */}
      {isChinese ? <ChineseContent /> : <EnglishContent />}
    </>
  );
}
