'use client';

import Link from 'next/link';

export default function JavascriptPromisesGuide({ lang }: { lang: string }) {
  return (
    <>
      <h2>What Are JavaScript Promises?</h2>
      <p>
        A <strong>Promise</strong> in JavaScript represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Before Promises, asynchronous code relied on callbacks, which led to deeply nested, hard-to-read code known as "callback hell." Promises provide a cleaner, more manageable way to handle async operations.
      </p>
      <p>
        A Promise exists in one of three states: <strong>pending</strong> (initial state, neither fulfilled nor rejected), <strong>fulfilled</strong> (the operation completed successfully), or <strong>rejected</strong> (the operation failed). Once a Promise settles (fulfilled or rejected), it is immutable and cannot change state again.
      </p>

      <h2>Creating Promises</h2>
      <pre><code className="language-typescript">{`// Creating a basic Promise
const myPromise = new Promise<string>((resolve, reject) => {
  // Async operation
  const success = true;

  if (success) {
    resolve('Operation succeeded!');
  } else {
    reject(new Error('Operation failed'));
  }
});

// Using the Promise
myPromise
  .then(result => console.log(result))   // "Operation succeeded!"
  .catch(error => console.error(error));

// Practical example: wrapping setTimeout
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Wrapping callback-based APIs
function readFileAsync(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// Promise that rejects after timeout
function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  return Promise.race([
    fetch(url),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), ms)
    ),
  ]);
}`}</code></pre>

      <h2>Promise Chaining</h2>
      <p>
        One of the most powerful features of Promises is chaining. Each <code>.then()</code> returns a new Promise, allowing you to compose async operations sequentially. If a <code>.then()</code> handler returns a value, the next <code>.then()</code> receives it. If it returns a Promise, the chain waits for it to resolve.
      </p>
      <pre><code className="language-typescript">{`// Sequential chain
fetch('/api/user/123')
  .then(response => {
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  })
  .then(user => {
    console.log('User:', user.name);
    return fetch(\`/api/posts?userId=\${user.id}\`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log('Posts:', posts.length);
    return posts;
  })
  .catch(error => {
    // Catches errors from ANY step in the chain
    console.error('Error:', error.message);
  })
  .finally(() => {
    // Always runs, regardless of success or failure
    console.log('Request completed');
  });

// Transforming data through the chain
function processOrder(orderId: string) {
  return getOrder(orderId)
    .then(order => validateOrder(order))
    .then(validOrder => calculateTotal(validOrder))
    .then(total => applyDiscount(total))
    .then(finalTotal => createInvoice(finalTotal));
}`}</code></pre>

      <h2>Async/Await: Syntactic Sugar for Promises</h2>
      <p>
        <code>async/await</code> is built on top of Promises and provides a synchronous-looking syntax for asynchronous code. An <code>async</code> function always returns a Promise, and <code>await</code> pauses execution until the Promise settles.
      </p>
      <pre><code className="language-typescript">{`// Converting Promise chain to async/await
async function getUserPosts(userId: string) {
  try {
    const userResponse = await fetch(\`/api/user/\${userId}\`);
    if (!userResponse.ok) throw new Error(\`HTTP \${userResponse.status}\`);

    const user = await userResponse.json();
    console.log('User:', user.name);

    const postsResponse = await fetch(\`/api/posts?userId=\${user.id}\`);
    const posts = await postsResponse.json();

    console.log('Posts:', posts.length);
    return posts;
  } catch (error) {
    console.error('Error:', error);
    throw error;  // Re-throw to let caller handle it
  } finally {
    console.log('Request completed');
  }
}

// Async arrow functions
const fetchData = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

// Async methods in classes
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status} \${response.statusText}\`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

const api = new ApiClient('https://api.example.com');
const users = await api.get<User[]>('/users');`}</code></pre>

      <h2>Promise.all: Parallel Execution</h2>
      <p>
        <code>Promise.all()</code> takes an array of Promises and returns a single Promise that resolves when all input Promises resolve. If any Promise rejects, the entire <code>Promise.all</code> rejects with that error. Use it when you need multiple independent async operations to complete.
      </p>
      <pre><code className="language-typescript">{`// Fetch multiple resources in parallel
async function getDashboardData(userId: string) {
  const [user, posts, notifications, settings] = await Promise.all([
    fetch(\`/api/users/\${userId}\`).then(r => r.json()),
    fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),
    fetch(\`/api/notifications/\${userId}\`).then(r => r.json()),
    fetch(\`/api/settings/\${userId}\`).then(r => r.json()),
  ]);

  return { user, posts, notifications, settings };
}

// With error handling
async function fetchAllUsers(ids: string[]) {
  try {
    const users = await Promise.all(
      ids.map(id => fetchUser(id))
    );
    return users;
  } catch (error) {
    // One failure = all fail
    console.error('Failed to fetch all users:', error);
    throw error;
  }
}

// Type-safe parallel fetching
async function fetchResources<T extends readonly Promise<any>[]>(
  ...promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  return Promise.all(promises) as any;
}

const [users, products] = await fetchResources(
  fetchUsers(),    // Promise<User[]>
  fetchProducts(), // Promise<Product[]>
);
// users: User[], products: Product[]`}</code></pre>

      <h2>Promise.allSettled: Handle Mixed Results</h2>
      <p>
        Unlike <code>Promise.all()</code>, <code>Promise.allSettled()</code> waits for all Promises to settle regardless of whether they fulfilled or rejected. It returns an array of objects describing each outcome. Use it when you want results from all operations, even if some fail.
      </p>
      <pre><code className="language-typescript">{`// Fetch multiple APIs, some might fail
async function fetchFromMultipleSources(urls: string[]) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.json()))
  );

  const successful = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .map(r => r.value);

  const failed = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map(r => r.reason);

  console.log(\`\${successful.length} succeeded, \${failed.length} failed\`);
  return { successful, failed };
}

// Batch operations with partial failure handling
async function deleteUsers(userIds: string[]) {
  const results = await Promise.allSettled(
    userIds.map(id => deleteUser(id))
  );

  const deleted = [];
  const errors = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      deleted.push(userIds[index]);
    } else {
      errors.push({ id: userIds[index], error: result.reason.message });
    }
  });

  return { deleted, errors };
}`}</code></pre>

      <h2>Promise.race and Promise.any</h2>
      <pre><code className="language-typescript">{`// Promise.race: First to settle (fulfill OR reject) wins
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    ),
  ]);
}

const data = await fetchWithTimeout(fetch('/api/data'), 5000);

// Promise.any: First to FULFILL wins (ignores rejections)
async function fetchFromFastestMirror(urls: string[]) {
  try {
    // Returns result from whichever mirror responds first
    const response = await Promise.any(
      urls.map(url => fetch(url))
    );
    return response.json();
  } catch (error) {
    // AggregateError: all promises rejected
    if (error instanceof AggregateError) {
      console.error('All mirrors failed:', error.errors);
    }
    throw error;
  }
}

const data2 = await fetchFromFastestMirror([
  'https://mirror1.example.com/api/data',
  'https://mirror2.example.com/api/data',
  'https://mirror3.example.com/api/data',
]);`}</code></pre>

      <h2>Error Handling Patterns</h2>
      <pre><code className="language-typescript">{`// Pattern 1: try/catch with async/await
async function handleRequest() {
  try {
    const data = await fetchData();
    return { success: true, data };
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      return { success: false, error: 'Network error' };
    }
    if (error instanceof SyntaxError) {
      // JSON parsing error
      return { success: false, error: 'Invalid response' };
    }
    return { success: false, error: 'Unknown error' };
  }
}

// Pattern 2: Go-style error handling (no try/catch)
async function to<T>(promise: Promise<T>): Promise<[null, T] | [Error, null]> {
  try {
    const result = await promise;
    return [null, result];
  } catch (error) {
    return [error as Error, null];
  }
}

// Usage
const [error, user] = await to(fetchUser('123'));
if (error) {
  console.error('Failed:', error.message);
  return;
}
console.log('User:', user.name);

// Pattern 3: Custom error classes
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public responseBody?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      \`API request failed: \${response.statusText}\`,
      body
    );
  }

  return response.json();
}

// Handle specific error types
try {
  const data = await apiRequest('/api/protected');
} catch (error) {
  if (error instanceof ApiError) {
    if (error.statusCode === 401) {
      redirectToLogin();
    } else if (error.statusCode === 429) {
      await delay(error.responseBody?.retryAfter || 5000);
      // Retry...
    }
  }
}`}</code></pre>

      <h2>Sequential vs Parallel Execution</h2>
      <pre><code className="language-typescript">{`// WRONG: Sequential execution (one at a time)
async function fetchSequential(ids: string[]) {
  const results = [];
  for (const id of ids) {
    // Each await blocks until the previous one completes
    const data = await fetchItem(id);
    results.push(data);
  }
  return results;
}

// RIGHT: Parallel execution (all at once)
async function fetchParallel(ids: string[]) {
  const results = await Promise.all(
    ids.map(id => fetchItem(id))
  );
  return results;
}

// BALANCED: Controlled concurrency
async function fetchWithConcurrency<T>(
  items: string[],
  fn: (item: string) => Promise<T>,
  concurrency: number = 5
): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const item of items) {
    const promise = fn(item).then(result => {
      results.push(result);
    });
    executing.push(promise);

    if (executing.length >= concurrency) {
      await Promise.race(executing);
      // Remove settled promises
      executing.splice(
        executing.findIndex(p =>
          p === Promise.race([p]).then(() => p)
        ),
        1
      );
    }
  }

  await Promise.all(executing);
  return results;
}

// Process 100 items, max 5 at a time
const results = await fetchWithConcurrency(
  userIds,
  id => fetchUser(id),
  5
);`}</code></pre>

      <h2>Async Iteration</h2>
      <pre><code className="language-typescript">{`// Async generators for streaming data
async function* fetchPages(baseUrl: string) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(\`\${baseUrl}?page=\${page}\`);
    const data = await response.json();

    yield data.items;

    hasMore = data.hasNextPage;
    page++;
  }
}

// Consuming async iterables
async function getAllItems() {
  const allItems = [];

  for await (const pageItems of fetchPages('/api/products')) {
    allItems.push(...pageItems);
    console.log(\`Fetched \${allItems.length} items so far\`);
  }

  return allItems;
}

// Real-time event stream
async function* eventStream(url: string) {
  const response = await fetch(url);
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\\n').filter(Boolean);

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        yield JSON.parse(line.slice(6));
      }
    }
  }
}

for await (const event of eventStream('/api/stream')) {
  console.log('Event:', event);
}`}</code></pre>

      <h2>Common Pitfalls</h2>

      <h3>1. Unhandled Promise Rejections</h3>
      <pre><code className="language-typescript">{`// BAD: Missing error handling
async function bad() {
  const data = await fetchData(); // Unhandled if this rejects!
}

// GOOD: Always handle rejections
async function good() {
  try {
    const data = await fetchData();
  } catch (error) {
    console.error('Failed:', error);
  }
}

// Global handler (safety net)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});`}</code></pre>

      <h3>2. Forgetting to Await</h3>
      <pre><code className="language-typescript">{`// BAD: Missing await - data is a Promise, not the value
async function bad() {
  const data = fetchData(); // No await!
  console.log(data); // Promise { <pending> }
}

// GOOD: Await the Promise
async function good() {
  const data = await fetchData();
  console.log(data); // actual data
}`}</code></pre>

      <h3>3. Await in Loops (Sequential When Parallel Is Better)</h3>
      <pre><code className="language-typescript">{`// BAD: Sequential (slow)
for (const url of urls) {
  const data = await fetch(url); // Each waits for previous
}

// GOOD: Parallel (fast)
const results = await Promise.all(
  urls.map(url => fetch(url))
);`}</code></pre>

      <h2>Promise vs Callback vs Observable</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Callback</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Promise</th>
              <th style={{ padding: '10px 12px', textAlign: 'left' }}>Observable (RxJS)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px 12px' }}>Single/Multiple values</td>
              <td style={{ padding: '10px 12px' }}>Single</td>
              <td style={{ padding: '10px 12px' }}>Single</td>
              <td style={{ padding: '10px 12px' }}>Multiple (stream)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px 12px' }}>Eager/Lazy</td>
              <td style={{ padding: '10px 12px' }}>Eager</td>
              <td style={{ padding: '10px 12px' }}>Eager</td>
              <td style={{ padding: '10px 12px' }}>Lazy (starts on subscribe)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px 12px' }}>Cancellation</td>
              <td style={{ padding: '10px 12px' }}>Manual</td>
              <td style={{ padding: '10px 12px' }}>AbortController</td>
              <td style={{ padding: '10px 12px' }}>unsubscribe()</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px 12px' }}>Composition</td>
              <td style={{ padding: '10px 12px' }}>Nested (callback hell)</td>
              <td style={{ padding: '10px 12px' }}>Chaining / async-await</td>
              <td style={{ padding: '10px 12px' }}>Operators (map, filter, merge)</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px' }}>Error Handling</td>
              <td style={{ padding: '10px 12px' }}>Error-first pattern</td>
              <td style={{ padding: '10px 12px' }}>.catch() / try-catch</td>
              <td style={{ padding: '10px 12px' }}>catchError operator</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Summary</h2>
      <p>
        JavaScript Promises and async/await are fundamental tools for handling asynchronous operations. Use <code>Promise.all()</code> for parallel execution, <code>Promise.allSettled()</code> when you need results from all operations regardless of failures, <code>Promise.race()</code> for timeouts, and <code>Promise.any()</code> for redundant sources. Always handle errors with try/catch blocks, avoid sequential awaits in loops when operations are independent, and use controlled concurrency for large batches. Mastering these patterns is essential for building performant, reliable JavaScript applications.
      </p>
    </>
  );
}
