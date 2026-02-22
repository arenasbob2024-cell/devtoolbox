export default function WebWorkersGuide() {
  return (
    <>
      <h2>Web Workers, SharedWorker, and Service Workers: The Complete Guide</h2>
      <p>
        JavaScript runs on a single thread in the browser, which means heavy computation blocks the UI.
        Web Workers solve this by running scripts in background threads. This guide covers all three
        types of workers — Dedicated Workers for CPU-intensive tasks, SharedWorkers for cross-tab
        communication, and Service Workers for offline caching and background sync — with practical
        TypeScript examples for each.
      </p>

      <h2>Worker Types at a Glance</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Dedicated Worker</th>
            <th>SharedWorker</th>
            <th>Service Worker</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Scope</td><td>Single page/tab</td><td>Multiple pages (same origin)</td><td>All pages (same origin)</td></tr>
          <tr><td>Lifecycle</td><td>Lives with the page</td><td>Lives while any port is connected</td><td>Event-driven, independent of pages</td></tr>
          <tr><td>DOM access</td><td>No</td><td>No</td><td>No</td></tr>
          <tr><td>Network intercept</td><td>No</td><td>No</td><td>Yes (fetch event)</td></tr>
          <tr><td>Push notifications</td><td>No</td><td>No</td><td>Yes</td></tr>
          <tr><td>Use case</td><td>Heavy computation, parsing</td><td>Shared state across tabs</td><td>Offline, caching, background sync</td></tr>
          <tr><td>Communication</td><td>postMessage</td><td>MessagePort</td><td>postMessage + fetch events</td></tr>
        </tbody>
      </table>

      <h2>Dedicated Web Workers</h2>
      <p>
        Dedicated Workers are the simplest type. Each worker runs in its own thread and communicates
        with the main thread via <code>postMessage</code>. They are perfect for CPU-intensive tasks
        like image processing, data parsing, or complex calculations.
      </p>

      <h3>Basic Worker Setup</h3>
      <pre><code className="language-typescript">{`// worker.ts — runs in a background thread
self.addEventListener('message', (event: MessageEvent) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'FIBONACCI': {
      const result = fibonacci(payload.n);
      self.postMessage({ type: 'FIBONACCI_RESULT', result });
      break;
    }
    case 'SORT_LARGE_ARRAY': {
      const sorted = payload.data.sort((a: number, b: number) => a - b);
      self.postMessage({ type: 'SORT_RESULT', result: sorted });
      break;
    }
    case 'PARSE_CSV': {
      const rows = parseCSV(payload.text);
      self.postMessage({ type: 'CSV_RESULT', result: rows });
      break;
    }
  }
});

function fibonacci(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

function parseCSV(text: string): string[][] {
  return text.split('\\n').map(line =>
    line.split(',').map(cell => cell.trim())
  );
}`}</code></pre>
      <pre><code className="language-typescript">{`// main.ts — main thread
const worker = new Worker(
  new URL('./worker.ts', import.meta.url),
  { type: 'module' }
);

// Send work to the worker
worker.postMessage({
  type: 'FIBONACCI',
  payload: { n: 45 },
});

// Receive results
worker.addEventListener('message', (event) => {
  const { type, result } = event.data;
  switch (type) {
    case 'FIBONACCI_RESULT':
      console.log('Fibonacci result:', result);
      break;
    case 'SORT_RESULT':
      console.log('Sorted:', result.length, 'items');
      break;
  }
});

// Handle errors
worker.addEventListener('error', (event) => {
  console.error('Worker error:', event.message);
});

// Terminate when done
// worker.terminate();`}</code></pre>

      <h3>Transferable Objects — Zero-Copy Performance</h3>
      <pre><code className="language-typescript">{`// Transfer ArrayBuffers instead of copying (main thread)
const largeBuffer = new ArrayBuffer(1024 * 1024 * 100); // 100 MB
const view = new Float64Array(largeBuffer);

// Fill with data
for (let i = 0; i < view.length; i++) {
  view[i] = Math.random();
}

// Transfer ownership — zero copy, instant
worker.postMessage(
  { type: 'PROCESS_BUFFER', buffer: largeBuffer },
  [largeBuffer]  // Transfer list — buffer moves, not copied
);
// largeBuffer.byteLength === 0 after transfer (ownership moved)

// In worker — transfer back
self.addEventListener('message', (event) => {
  const { buffer } = event.data;
  const view = new Float64Array(buffer);

  // Process the data...
  for (let i = 0; i < view.length; i++) {
    view[i] = view[i] * 2;
  }

  // Transfer back to main thread
  self.postMessage(
    { type: 'PROCESSED', buffer },
    [buffer]
  );
});`}</code></pre>

      <h3>Worker Pool Pattern</h3>
      <pre><code className="language-typescript">{`// worker-pool.ts — reuse workers for multiple tasks
class WorkerPool {
  private workers: Worker[] = [];
  private queue: Array<{
    message: any;
    resolve: (value: any) => void;
    reject: (reason: any) => void;
  }> = [];
  private activeWorkers = new Set<Worker>();

  constructor(
    private workerUrl: URL,
    private poolSize: number = navigator.hardwareConcurrency || 4
  ) {
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(this.workerUrl, { type: 'module' });
      this.workers.push(worker);
    }
  }

  exec<T>(message: any): Promise<T> {
    return new Promise((resolve, reject) => {
      const availableWorker = this.workers.find(
        w => !this.activeWorkers.has(w)
      );

      if (availableWorker) {
        this.runTask(availableWorker, message, resolve, reject);
      } else {
        this.queue.push({ message, resolve, reject });
      }
    });
  }

  private runTask(
    worker: Worker,
    message: any,
    resolve: (value: any) => void,
    reject: (reason: any) => void
  ) {
    this.activeWorkers.add(worker);

    const onMessage = (event: MessageEvent) => {
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
      this.activeWorkers.delete(worker);
      resolve(event.data);
      this.processQueue();
    };

    const onError = (event: ErrorEvent) => {
      worker.removeEventListener('message', onMessage);
      worker.removeEventListener('error', onError);
      this.activeWorkers.delete(worker);
      reject(new Error(event.message));
      this.processQueue();
    };

    worker.addEventListener('message', onMessage);
    worker.addEventListener('error', onError);
    worker.postMessage(message);
  }

  private processQueue() {
    if (this.queue.length === 0) return;
    const availableWorker = this.workers.find(
      w => !this.activeWorkers.has(w)
    );
    if (!availableWorker) return;
    const { message, resolve, reject } = this.queue.shift()!;
    this.runTask(availableWorker, message, resolve, reject);
  }

  terminate() {
    this.workers.forEach(w => w.terminate());
  }
}

// Usage
const pool = new WorkerPool(
  new URL('./worker.ts', import.meta.url),
  4
);

const results = await Promise.all([
  pool.exec({ type: 'FIBONACCI', payload: { n: 40 } }),
  pool.exec({ type: 'FIBONACCI', payload: { n: 41 } }),
  pool.exec({ type: 'FIBONACCI', payload: { n: 42 } }),
  pool.exec({ type: 'FIBONACCI', payload: { n: 43 } }),
  pool.exec({ type: 'FIBONACCI', payload: { n: 44 } }),  // Queued
  pool.exec({ type: 'FIBONACCI', payload: { n: 45 } }),  // Queued
]);`}</code></pre>

      <h2>SharedWorker — Cross-Tab Communication</h2>
      <p>
        SharedWorkers are shared across all tabs, windows, and iframes of the same origin. They are
        useful for maintaining shared state — like a WebSocket connection or a shared cache — without
        duplicating it per tab.
      </p>
      <pre><code className="language-typescript">{`// shared-worker.ts
const connections: MessagePort[] = [];

self.addEventListener('connect', (event: MessageEvent) => {
  const port = (event as any).ports[0] as MessagePort;
  connections.push(port);

  port.addEventListener('message', (e: MessageEvent) => {
    const { type, payload } = e.data;

    switch (type) {
      case 'BROADCAST':
        // Send to all connected tabs
        connections.forEach(p => {
          p.postMessage({ type: 'BROADCAST', payload });
        });
        break;

      case 'GET_TAB_COUNT':
        port.postMessage({
          type: 'TAB_COUNT',
          count: connections.length,
        });
        break;

      case 'SYNC_STATE':
        // Relay state to all other tabs
        connections.forEach(p => {
          if (p !== port) {
            p.postMessage({ type: 'STATE_UPDATE', payload });
          }
        });
        break;
    }
  });

  port.start();

  // Notify all tabs of new connection
  connections.forEach(p => {
    p.postMessage({ type: 'TAB_COUNT', count: connections.length });
  });
});

// main.ts — connecting to SharedWorker
const sharedWorker = new SharedWorker(
  new URL('./shared-worker.ts', import.meta.url),
  { type: 'module', name: 'app-shared' }
);

const port = sharedWorker.port;
port.start();

port.addEventListener('message', (event) => {
  const { type, payload, count } = event.data;
  switch (type) {
    case 'TAB_COUNT':
      console.log('Active tabs:', count);
      break;
    case 'BROADCAST':
      console.log('Broadcast received:', payload);
      break;
    case 'STATE_UPDATE':
      console.log('State from another tab:', payload);
      break;
  }
});

// Broadcast a message to all tabs
port.postMessage({
  type: 'BROADCAST',
  payload: { user: 'Alice', action: 'logged_in' },
});`}</code></pre>

      <h2>Service Workers — Offline and Caching</h2>
      <p>
        Service Workers act as a network proxy between your app and the internet. They intercept fetch
        requests, serve cached responses, enable offline functionality, and handle push notifications
        and background sync.
      </p>

      <h3>Registration and Lifecycle</h3>
      <pre><code className="language-typescript">{`// main.ts — register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        '/sw.js',
        { scope: '/' }
      );
      console.log('SW registered:', registration.scope);

      // Check for updates periodically
      setInterval(() => registration.update(), 60 * 60 * 1000);
    } catch (error) {
      console.error('SW registration failed:', error);
    }
  });
}

// sw.js — service worker
const CACHE_NAME = 'app-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/offline.html',
];

// Install — cache static assets
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(STATIC_ASSETS)
    )
  );
  // Activate immediately without waiting for old SW to die
  (self as any).skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  // Claim all open clients immediately
  (self as any).clients.claim();
});`}</code></pre>

      <h3>Caching Strategies</h3>
      <pre><code className="language-typescript">{`// sw.js — fetch event with multiple strategies

self.addEventListener('fetch', (event: FetchEvent) => {
  const url = new URL(event.request.url);

  // Strategy 1: Cache First (static assets)
  if (url.pathname.match(/\\.(css|js|png|jpg|woff2)$/)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Strategy 2: Network First (API calls)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Strategy 3: Stale While Revalidate (pages)
  event.respondWith(staleWhileRevalidate(event.request));
});

// Cache First — fast for static assets
async function cacheFirst(request: Request): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First — fresh data, fallback to cache
async function networkFirst(request: Request): Promise<Response> {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

// Stale While Revalidate — serve cache, update in background
async function staleWhileRevalidate(request: Request): Promise<Response> {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached || caches.match('/offline.html'));

  return cached || fetchPromise as Promise<Response>;
}`}</code></pre>

      <h2>Real-World Example: Image Processing Worker</h2>
      <pre><code className="language-typescript">{`// image-worker.ts
self.addEventListener('message', async (event: MessageEvent) => {
  const { imageData, width, height, filter } = event.data;
  const pixels = new Uint8ClampedArray(imageData);

  switch (filter) {
    case 'grayscale':
      for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        pixels[i] = pixels[i+1] = pixels[i+2] = avg;
      }
      break;
    case 'sepia':
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i], g = pixels[i+1], b = pixels[i+2];
        pixels[i]   = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
        pixels[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
        pixels[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
      }
      break;
    case 'invert':
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i];
        pixels[i+1] = 255 - pixels[i+1];
        pixels[i+2] = 255 - pixels[i+2];
      }
      break;
  }

  self.postMessage(
    { imageData: pixels.buffer, width, height },
    [pixels.buffer]  // Transfer back
  );
});`}</code></pre>

      <h2>Browser Compatibility</h2>
      <table>
        <thead>
          <tr>
            <th>Worker Type</th>
            <th>Chrome</th>
            <th>Firefox</th>
            <th>Safari</th>
            <th>Edge</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Dedicated Worker</td><td>4+</td><td>3.5+</td><td>4+</td><td>12+</td></tr>
          <tr><td>SharedWorker</td><td>4+</td><td>29+</td><td>16+</td><td>79+</td></tr>
          <tr><td>Service Worker</td><td>40+</td><td>44+</td><td>11.1+</td><td>17+</td></tr>
          <tr><td>Worker Modules (type: module)</td><td>80+</td><td>114+</td><td>15+</td><td>80+</td></tr>
        </tbody>
      </table>

      <p>
        When debugging worker communication payloads, our <a href="/en/tools/json-formatter">JSON Formatter</a>{" "}
        helps inspect structured messages. For encoding binary data from workers, check our{" "}
        <a href="/en/tools/base64-encode-decode">Base64 Encoder</a>. Also read our{" "}
        <a href="/en/blog/web-performance-optimization">Web Performance Optimization</a> guide for
        more techniques to keep your app responsive.
      </p>
    </>
  );
}
