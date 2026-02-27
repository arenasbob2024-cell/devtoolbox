'use client';

const translations = {
  en: {
    title: 'JavaScript Promises Guide: async/await, Promise.all, Error Handling & Advanced Patterns',
    description:
      'Master JavaScript Promises with this complete guide. Covers async/await, Promise.all, Promise.allSettled, Promise.race, error handling, promisification, and real-world patterns with code examples.',
    content: 'en',
  },
  zh: {
    title: 'JavaScript Promise 完整指南：async/await、Promise.all、错误处理与高级模式',
    description:
      '全面掌握 JavaScript Promise。涵盖 async/await、Promise.all、Promise.allSettled、Promise.race、错误处理、promisification 以及真实场景的代码示例。',
    content: 'zh',
  },
};

export default function JavaScriptPromisesGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = t.content === 'zh';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the three states of a JavaScript Promise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JavaScript Promise has three mutually exclusive states: (1) Pending — the initial state; the operation has not completed yet. (2) Fulfilled — the operation completed successfully and the promise has a resolved value. (3) Rejected — the operation failed and the promise has a reason (error). Once a promise transitions from pending to either fulfilled or rejected, it is "settled" and its state never changes again.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between async/await and .then()/.catch()?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both async/await and .then()/.catch() work with Promises under the hood. async/await uses synchronous-looking syntax that is easier to read and debug, especially for sequential operations. Error handling uses familiar try/catch blocks. .then()/.catch() chains are more explicit about the asynchronous flow and are necessary when working inside non-async functions or when composing promise chains dynamically. async/await compiles down to promise chains, so they are functionally equivalent — choose based on readability.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Promise.all and Promise.allSettled?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Promise.all takes an array of promises and resolves with an array of results only if ALL promises fulfill. If any single promise rejects, Promise.all immediately rejects with that error (fail-fast behavior). Promise.allSettled waits for ALL promises to settle (either fulfill or reject) and always resolves with an array of result objects, each with a "status" field ("fulfilled" or "rejected") plus either "value" or "reason". Use Promise.all when all results are required and failure of any invalidates the whole operation. Use Promise.allSettled when you need results from all operations regardless of individual failures.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does "forgetting await" cause in async functions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Forgetting await before a Promise in an async function causes you to work with the Promise object itself instead of its resolved value. The variable will hold a Promise, not the data you expect. Comparisons and operations on Promise objects usually produce unexpected results (e.g., "if (result)" is always true for a Promise object). Additionally, errors thrown by the awaited operation will not be caught by a surrounding try/catch — they become unhandled rejections. Always use await or .then()/.catch() when consuming Promises.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run multiple async operations in parallel with async/await?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To run multiple async operations in parallel, start all promises before awaiting any of them. Use Promise.all with an array of promises: "const [a, b] = await Promise.all([fetchA(), fetchB()])". Avoid sequential awaits like "const a = await fetchA(); const b = await fetchB();" — this runs operations one at a time. A common mistake is using for...of with await inside a loop, which also runs sequentially. For parallel loops, map the array to promises and await Promise.all.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I add a timeout to a JavaScript Promise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use Promise.race to implement a timeout wrapper: create a "timeout promise" that rejects after N milliseconds using setTimeout, then race it against your actual promise. The pattern is: function withTimeout(promise, ms) { const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms)); return Promise.race([promise, timeout]); }. This pattern is widely used for fetch requests, database queries, and any operation that should not run indefinitely.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is promisification and how do I promisify a callback-based function?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Promisification converts callback-style functions (Node.js style: last argument is a callback with (error, result) signature) into Promise-returning functions. You can use Node.js's built-in util.promisify(fn) for standard Node-style callbacks, or wrap manually: function promisify(fn) { return (...args) => new Promise((resolve, reject) => fn(...args, (err, result) => err ? reject(err) : resolve(result))); }. Libraries like Bluebird also provide promisification utilities.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is Promise.withResolvers() and when should I use it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Promise.withResolvers() is a newer static method (ES2024, supported in Node 22+ and modern browsers) that returns an object containing a new Promise along with its resolve and reject functions: const { promise, resolve, reject } = Promise.withResolvers(). This is useful when you need to expose the resolve/reject functions outside the Promise constructor callback — a common pattern for building deferred objects, event-driven systems, or when you need to resolve a promise from a different scope. Previously this required the "deferred" pattern with external variable references.',
        },
      },
    ],
  };

  if (isZh) {
    return (
      <article style={{ maxWidth: '860px', margin: '0 auto', lineHeight: '1.8', color: '#374151' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <meta name="description" content={t.description} />

        {/* TL;DR Box */}
        <div
          style={{
            background: '#f0f9ff',
            border: '2px solid #0ea5e9',
            borderRadius: '10px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', fontSize: '1rem' }}>
            TL;DR — 快速摘要
          </p>
          <p style={{ margin: 0 }}>
            Promise 是 JavaScript 异步操作的基础。Promise 有三种状态：<strong>pending（等待）</strong>、
            <strong>fulfilled（已完成）</strong>、<strong>rejected（已拒绝）</strong>。
            使用 <strong>async/await</strong> 编写可读性更强的异步代码；
            使用 <strong>Promise.all</strong> 并行执行多个操作；
            使用 <strong>try/catch</strong> 或 <strong>.catch()</strong> 捕获错误；
            使用 <strong>Promise.race</strong> 实现超时；
            使用 <strong>Promise.allSettled</strong> 在部分失败时仍获取全部结果。
            本指南包含真实代码示例和常见错误的解决方案。
          </p>
        </div>

        {/* Key Takeaways */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', fontSize: '1rem' }}>
            核心要点
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.4rem' }}>Promise 是单次使用的异步结果容器，状态不可逆</li>
            <li style={{ marginBottom: '0.4rem' }}>async/await 是 Promise 链式调用的语法糖，本质相同</li>
            <li style={{ marginBottom: '0.4rem' }}>Promise.all 快速失败；Promise.allSettled 等待全部完成</li>
            <li style={{ marginBottom: '0.4rem' }}>错误必须用 .catch() 或 try/catch 显式捕获，否则成为未处理的拒绝</li>
            <li style={{ marginBottom: '0.4rem' }}>并行执行比串行 await 快得多</li>
            <li style={{ marginBottom: '0.4rem' }}>Promise.race 可实现超时和竞速场景</li>
            <li>避免回调地狱、嵌套 Promise 和忘记 await 等常见错误</li>
          </ul>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
          1. Promise 基础：状态与生命周期
        </h2>
        <p>
          在 Promise 诞生之前，JavaScript 使用回调函数处理异步操作。回调函数层层嵌套，形成臭名昭著的"回调地狱"。
          ES6（2015）引入的 <strong>Promise</strong> 提供了一种结构化的方式来表示异步操作的最终完成（或失败）。
        </p>
        <p>
          Promise 对象代表一个异步操作，它有三种互斥状态：
        </p>
        <ul>
          <li style={{ marginBottom: '0.5rem' }}><strong>Pending（等待）</strong>：初始状态，操作尚未完成</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Fulfilled（已完成）</strong>：操作成功完成，有一个结果值</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Rejected（已拒绝）</strong>：操作失败，有一个错误原因</li>
        </ul>
        <p>
          一旦 Promise 从 pending 状态过渡到 fulfilled 或 rejected，状态就"定格"了，永远不会再改变。
          已完成或已拒绝的 Promise 统称为"已敲定（settled）"。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// Promise 的三种状态
const pending   = new Promise(() => {});          // 永远等待
const fulfilled = Promise.resolve('success');     // 立即完成
const rejected  = Promise.reject(new Error('fail')); // 立即拒绝

// 使用 .then() 和 .catch() 处理结果
fulfilled
  .then(value => console.log('值:', value))       // 值: success
  .catch(err  => console.error('错误:', err));

rejected
  .then(value => console.log('不会执行'))
  .catch(err  => console.error('捕获到:', err.message)); // 捕获到: fail`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          .then()、.catch() 和 .finally()
        </h3>
        <p>
          Promise 的三个核心方法用于处理不同的结果：
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`fetch('https://api.example.com/users/1')
  .then(response => {
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();       // 返回新 Promise
  })
  .then(user => {
    console.log('用户名:', user.name);
    return user;
  })
  .catch(error => {
    // 捕获链上任何地方抛出的错误
    console.error('请求失败:', error.message);
    return null;                  // 可以恢复，返回默认值
  })
  .finally(() => {
    // 无论成功还是失败都执行
    // 适合清理操作：隐藏加载状态、关闭连接等
    console.log('请求已完成');
  });`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          2. 创建 Promise：new Promise()、resolve 和 reject
        </h2>
        <p>
          使用 <code>new Promise(executor)</code> 创建 Promise。executor 函数接收两个参数：
          <code>resolve</code>（成功时调用）和 <code>reject</code>（失败时调用）。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 基本用法
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 带结果的延迟
function delayedValue(value, ms) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

// 模拟随机成功/失败
function unreliableOperation() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    setTimeout(() => {
      if (success) resolve({ data: '操作成功', timestamp: Date.now() });
      else reject(new Error('操作随机失败'));
    }, 1000);
  });
}

// 包装回调风格的 API
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// 立即完成/拒绝的快捷方式
const ok  = Promise.resolve(42);
const err = Promise.reject(new TypeError('类型错误'));`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          3. Promise 链式调用
        </h2>
        <p>
          <code>.then()</code> 总是返回一个新的 Promise，这使得链式调用成为可能。
          链中某一步返回的值会传递到下一个 <code>.then()</code>；抛出的错误会传递到最近的 <code>.catch()</code>。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 正确的链式调用（扁平化，非嵌套）
fetchUser(userId)
  .then(user => fetchUserPosts(user.id))   // 返回新 Promise
  .then(posts => fetchComments(posts[0].id))
  .then(comments => renderComments(comments))
  .catch(err => showError(err));

// 错误传播：错误会跳过 .then() 直到遇到 .catch()
Promise.resolve(1)
  .then(v => { throw new Error('第2步出错'); })
  .then(v => console.log('这里不会执行'))
  .then(v => console.log('这里也不会执行'))
  .catch(err => console.log('捕获到:', err.message)); // 捕获到: 第2步出错

// 在 .catch() 后恢复链式调用
fetchData()
  .then(processData)
  .catch(err => {
    console.warn('使用缓存数据，原因:', err.message);
    return getCachedData();  // 返回备用值，链继续执行
  })
  .then(data => renderUI(data));  // 无论原始请求是否成功都会执行`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          4. async/await：现代异步语法
        </h2>
        <p>
          <code>async/await</code> 是 ES2017 引入的语法糖，让异步代码看起来像同步代码。
          <code>async</code> 函数始终返回一个 Promise；<code>await</code> 暂停函数执行直到 Promise 敲定。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// async 函数基本用法
async function fetchUserProfile(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  const user = await response.json();
  return user;
}

// try/catch 错误处理（等同于 .catch()）
async function getUserSafely(userId) {
  try {
    const user = await fetchUserProfile(userId);
    console.log('用户:', user.name);
    return user;
  } catch (error) {
    if (error.message.includes('404')) {
      console.warn('用户不存在');
      return null;
    }
    throw error;  // 重新抛出无法处理的错误
  } finally {
    console.log('fetchUserSafely 执行完毕');
  }
}

// 顶层 await（ES2022，在 ES 模块中可用）
const config = await loadConfig('./config.json');
console.log('配置已加载:', config.version);`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          串行执行 vs 并行执行
        </h3>
        <p>
          这是 async/await 最常见的性能陷阱：连续的 await 是串行执行的，
          如果操作之间互不依赖，应该并行执行。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 慢：串行执行，总耗时 = 300ms + 200ms + 400ms = 900ms
async function slowApproach() {
  const users    = await fetchUsers();    // 等待 300ms
  const products = await fetchProducts(); // 再等待 200ms
  const orders   = await fetchOrders();   // 再等待 400ms
  return { users, products, orders };
}

// 快：并行执行，总耗时 ≈ max(300, 200, 400) = 400ms
async function fastApproach() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders(),
  ]);
  return { users, products, orders };
}

// 数组并行处理
async function processAllItems(items) {
  // 正确：并行处理所有项
  const results = await Promise.all(items.map(item => processItem(item)));

  // 错误：for...of 中的 await 是串行的
  // for (const item of items) {
  //   await processItem(item);  // 逐个处理，很慢！
  // }
  return results;
}`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          5. Promise 组合器：all、allSettled、race、any
        </h2>
        <p>
          JavaScript 提供了四个静态方法来处理多个 Promise，每个方法有不同的"等待策略"：
        </p>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>方法</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>完成条件</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>失败条件</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>典型使用场景</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Promise.all', '全部完成', '任意一个拒绝', '需要所有结果才能继续'],
                ['Promise.allSettled', '全部敲定（无论结果）', '永不拒绝', '批量操作，需要全部状态'],
                ['Promise.race', '第一个敲定', '第一个拒绝', '超时、取第一个响应'],
                ['Promise.any', '第一个完成', '全部拒绝', '多个备用源，取最快成功的'],
              ].map(([method, resolve, reject, useCase]) => (
                <tr key={method}>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600, fontFamily: 'monospace' }}>{method}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{resolve}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{reject}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// Promise.all — 全部成功才完成，任一失败立即失败
const [user, posts, friends] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchFriends(id),
]);

// Promise.allSettled — 等待全部，获取每个的状态
const results = await Promise.allSettled([
  fetchPrimaryAPI(),
  fetchSecondaryAPI(),
  fetchTertiaryAPI(),
]);
results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('成功:', result.value);
  } else {
    console.warn('失败:', result.reason.message);
  }
});

// Promise.race — 第一个敲定的（成功或失败）
const firstResponse = await Promise.race([
  fetchFromServer1(),
  fetchFromServer2(),
  fetchFromServer3(),
]);

// Promise.any — 第一个成功的（忽略拒绝直到全部拒绝）
try {
  const fastest = await Promise.any([
    fetchFromCDN1(),
    fetchFromCDN2(),
    fetchFromCDN3(),
  ]);
  console.log('最快成功:', fastest);
} catch (aggregateError) {
  // 所有 Promise 都拒绝时抛出 AggregateError
  console.error('所有来源都失败:', aggregateError.errors);
}`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          6. 错误处理模式
        </h2>
        <p>
          正确处理 Promise 错误至关重要。未处理的 Promise 拒绝会导致 Node.js 进程崩溃
          （从 Node.js 15 开始），在浏览器中会触发 <code>unhandledrejection</code> 事件。
        </p>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 自定义错误类型
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// 区分错误类型进行处理
async function createUser(data) {
  try {
    validateUserData(data);  // 可能抛出 ValidationError
    const user = await apiCreateUser(data);  // 可能抛出 NetworkError
    return user;
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(\`字段 \${error.field} 验证失败: \${error.message}\`);
      return { error: 'validation', field: error.field };
    }
    if (error instanceof NetworkError && error.statusCode === 409) {
      console.warn('用户已存在');
      return { error: 'conflict' };
    }
    // 无法处理的错误：重新抛出
    throw error;
  }
}

// 全局未处理拒绝捕获（Node.js）
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
});

// 浏览器中的全局捕获
window.addEventListener('unhandledrejection', event => {
  console.error('未处理的 Promise 拒绝:', event.reason);
  event.preventDefault();
});`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          7. 高级模式
        </h2>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
          Promise.withResolvers()（ES2024）
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 旧写法：手动保存 resolve/reject
let resolve, reject;
const promise = new Promise((res, rej) => { resolve = res; reject = rej; });

// 新写法：Promise.withResolvers()（Node.js 22+）
const { promise, resolve, reject } = Promise.withResolvers();

// 使用场景：在不同作用域中控制 Promise
function createEventPromise(emitter, event) {
  const { promise, resolve, reject } = Promise.withResolvers();
  emitter.once(event, resolve);
  emitter.once('error', reject);
  return promise;
}

const connected = createEventPromise(socket, 'connect');
await connected;
console.log('已连接！');`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          Promisification：将回调转为 Promise
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`const { promisify } = require('util');
const fs = require('fs');

// Node.js 内置 util.promisify
const readFile  = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// 使用 promisified 函数
const content = await readFile('./config.json', 'utf8');
const config  = JSON.parse(content);

// 手动 promisify（通用模式）
function promisifyFn(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}

// 整个模块 promisify（Node.js fs.promises 已内置）
const fsPromises = fs.promises;
const data = await fsPromises.readFile('./data.txt', 'utf8');`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          8. 真实场景示例
        </h2>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
          带重试逻辑的 fetch
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status >= 500 && attempt < retries) {
          console.warn(\`尝试 \${attempt}/\${retries} 失败，重试中...\`);
          await new Promise(r => setTimeout(r, delay * attempt));
          continue;
        }
        throw new Error(\`HTTP \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise(r => setTimeout(r, delay * attempt));
    }
  }
}`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          超时包装器
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`function withTimeout(promise, ms, message = \`操作超时 (\${ms}ms)\`) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(message)), ms)
  );
  return Promise.race([promise, timeoutPromise]);
}

// 使用方式
try {
  const data = await withTimeout(
    fetch('https://slow-api.example.com/data'),
    5000,
    'API 请求超时（5秒）'
  );
  console.log(data);
} catch (error) {
  if (error.message.includes('超时')) {
    return getCachedData();
  }
  throw error;
}`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          并发控制（限制并发数）
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 限制并发数，避免同时发出过多请求
async function limitedConcurrency(tasks, concurrency = 5) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const promise = task().then(result => {
      executing.delete(promise);
      return result;
    });
    executing.add(promise);
    results.push(promise);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

// 使用示例：处理1000个URL，最多同时5个请求
const urls = Array.from({ length: 1000 }, (_, i) => \`/api/item/\${i}\`);
const tasks = urls.map(url => () => fetch(url).then(r => r.json()));
const allResults = await limitedConcurrency(tasks, 5);`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          9. 常见错误及解决方案
        </h2>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
          错误1：忘记 await
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 错误：没有 await，data 是 Promise 对象而不是值
async function wrong() {
  const data = fetchData();  // data = Promise { <pending> }
  console.log(data.name);   // undefined
  if (data) { ... }         // 总是 true！
}

// 正确：
async function correct() {
  const data = await fetchData();
  console.log(data.name);
}`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          错误2：吞掉错误（空的 catch）
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 错误：忽略错误，导致静默失败
async function wrong() {
  try {
    await doSomething();
  } catch (e) {
    // 空 catch：错误被吞掉！
  }
}

// 正确：至少记录错误
async function correct() {
  try {
    await doSomething();
  } catch (error) {
    console.error('操作失败:', error);
    throw error;
  }
}`}</code>
        </pre>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
          错误3：嵌套 Promise
        </h3>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.875rem', lineHeight: '1.6' }}>
          <code>{`// 错误：Promise 嵌套
fetchUser(id).then(user => {
  fetchPosts(user.id).then(posts => {
    renderPage(user, posts);
  });
});

// 正确：async/await
async function loadPage(id) {
  const user  = await fetchUser(id);
  const posts = await fetchPosts(user.id);
  return renderPage(user, posts);
}`}</code>
        </pre>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          10. 回调 vs Promise vs async/await 对比
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>特性</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>回调</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Promise</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>async/await</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['可读性', '差（嵌套）', '一般（链式）', '优秀（同步风格）'],
                ['错误处理', '容易遗漏', '.catch() 链', 'try/catch'],
                ['调试', '困难', '一般', '优秀（堆栈清晰）'],
                ['并行执行', '手动管理', 'Promise.all', 'await Promise.all'],
                ['TypeScript 支持', '一般', '好', '最好'],
                ['适用场景', '遗留代码', '组合操作', '一般首选'],
              ].map(([feature, cb, prom, aa]) => (
                <tr key={feature}>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>{feature}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{cb}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{prom}</td>
                  <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{aa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem', color: '#1e293b' }}>
          常见问题
        </h2>

        {[
          ['Promise 的三种状态是什么？', 'pending（等待）、fulfilled（已完成）、rejected（已拒绝）。一旦从 pending 过渡，状态永不改变。'],
          ['async/await 和 .then() 有什么区别？', 'async/await 是语法糖，底层仍是 Promise。async/await 更易读和调试，.then() 在动态组合链时更灵活。'],
          ['Promise.all 和 Promise.allSettled 的区别？', 'Promise.all 在任一失败时立即失败；Promise.allSettled 等待全部完成并返回每个的状态，永不失败。'],
          ['如何给 Promise 添加超时？', '使用 Promise.race([yourPromise, timeoutPromise])，timeoutPromise 在指定时间后拒绝。'],
          ['如何并行执行多个 async 操作？', '使用 await Promise.all([op1(), op2(), op3()])，不要连续使用多个独立的 await。'],
        ].map(([q, a]) => (
          <div key={q as string} style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.35rem' }}>{q as string}</p>
            <p style={{ margin: 0, color: '#475569' }}>{a as string}</p>
          </div>
        ))}
      </article>
    );
  }

  // English version
  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', lineHeight: '1.8', color: '#374151' }}>
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <meta name="description" content={t.description} />

      {/* TL;DR Box */}
      <div
        style={{
          background: '#f0f9ff',
          border: '2px solid #0ea5e9',
          borderRadius: '10px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', fontSize: '1rem' }}>
          TL;DR — Quick Summary
        </p>
        <p style={{ margin: 0 }}>
          Promises are the foundation of asynchronous JavaScript. A Promise has three states:{' '}
          <strong>pending</strong>, <strong>fulfilled</strong>, and <strong>rejected</strong>. Use{' '}
          <strong>async/await</strong> for readable async code; <strong>Promise.all</strong> for
          parallel execution; <strong>try/catch</strong> or <strong>.catch()</strong> for error
          handling; <strong>Promise.race</strong> for timeouts; and{' '}
          <strong>Promise.allSettled</strong> when you need all results even if some fail. This
          guide covers everything from basics to advanced patterns with real code examples.
        </p>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1e293b', fontSize: '1rem' }}>
          Key Takeaways
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.4rem' }}>A Promise is a single-use container for an async result — its state is immutable once settled</li>
          <li style={{ marginBottom: '0.4rem' }}>async/await is syntactic sugar over Promises — they are functionally identical</li>
          <li style={{ marginBottom: '0.4rem' }}>Promise.all fails fast; Promise.allSettled waits for all and never rejects</li>
          <li style={{ marginBottom: '0.4rem' }}>Errors must be explicitly caught with .catch() or try/catch — or they become unhandled rejections</li>
          <li style={{ marginBottom: '0.4rem' }}>Parallel execution with Promise.all is dramatically faster than sequential awaits</li>
          <li style={{ marginBottom: '0.4rem' }}>Promise.race enables timeout wrappers and fastest-source patterns</li>
          <li>Avoid forgetting await, swallowing errors, and nesting Promises (the Promise equivalent of callback hell)</li>
        </ul>
      </div>

      {/* Section 1 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        1. Promise Basics: States and Lifecycle
      </h2>
      <p>
        Before Promises, JavaScript handled asynchronous operations through nested callback
        functions — a pattern notorious for producing deeply indented, hard-to-maintain "callback
        hell." ES6 (2015) introduced <strong>Promises</strong> as a structured way to represent the
        eventual completion (or failure) of an asynchronous operation and its resulting value.
      </p>
      <p>
        A Promise object represents an asynchronous operation that has exactly three mutually
        exclusive states:
      </p>
      <ul>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Pending</strong> — The initial state. The operation has not yet completed.
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Fulfilled</strong> — The operation completed successfully and the Promise has a
          resolved value.
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Rejected</strong> — The operation failed and the Promise has a rejection reason
          (typically an Error object).
        </li>
      </ul>
      <p>
        Once a Promise transitions from pending to either fulfilled or rejected, it is{' '}
        <strong>settled</strong> — its state and value are permanently fixed. This immutability is
        a core guarantee of the Promise specification.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// The three Promise states
const pending   = new Promise(() => {});           // Never settles
const fulfilled = Promise.resolve('success');      // Immediately fulfilled
const rejected  = Promise.reject(new Error('fail')); // Immediately rejected

// Handle results with .then() and .catch()
fulfilled
  .then(value  => console.log('Value:', value))   // Value: success
  .catch(error => console.error('Error:', error));

rejected
  .then(value  => console.log('Never runs'))
  .catch(error => console.error('Caught:', error.message)); // Caught: fail

// .finally() runs regardless of outcome
fetch('/api/data')
  .then(res  => res.json())
  .catch(err => ({ error: err.message }))
  .finally(() => hideLoadingSpinner()); // Always executes`}</code>
      </pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 600,
          marginTop: '1.75rem',
          color: '#1e293b',
        }}
      >
        .then(), .catch(), and .finally()
      </h3>
      <p>
        The three core Promise handler methods cover every outcome scenario. Each returns a new
        Promise, enabling the fluent chaining pattern:
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// .then(onFulfilled, onRejected) — both params are optional
promise.then(
  value => console.log('Fulfilled with:', value),
  error => console.log('Rejected with:', error)   // rarely used
);

// Best practice: use .catch() instead of the second .then() arg
// .catch(onRejected) is shorthand for .then(undefined, onRejected)
fetch('/api/users')
  .then(response => {
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json();
  })
  .then(users => {
    renderUserList(users);
    return users.length;  // Pass a value to the next .then()
  })
  .then(count => console.log(\`Rendered \${count} users\`))
  .catch(error => {
    // Catches ALL errors from the entire chain above
    console.error('Failed to load users:', error.message);
    return [];   // Recover: return default value to continue the chain
  })
  .finally(() => {
    // Cleanup: runs whether fulfilled or rejected
    setLoading(false);
  });`}</code>
      </pre>

      {/* Section 2 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        2. Creating Promises: new Promise(), resolve, and reject
      </h2>
      <p>
        You create a Promise with the <code>new Promise(executor)</code> constructor. The executor
        function receives two parameters: <code>resolve</code> (call when the operation succeeds)
        and <code>reject</code> (call when it fails). The executor runs synchronously — the Promise
        body executes immediately.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Basic Promise constructor
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

await delay(1000);  // Pauses for 1 second

// Promise with a value
function delayedValue(value, ms) {
  return new Promise(resolve =>
    setTimeout(() => resolve(value), ms)
  );
}
const result = await delayedValue('hello', 500);  // 'hello' after 500ms

// Wrapping callback-based APIs
function readFileAsync(path, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Simulating an async operation with random failure
function unstableRequest() {
  return new Promise((resolve, reject) => {
    const willSucceed = Math.random() > 0.3;
    setTimeout(() => {
      if (willSucceed) resolve({ status: 'ok', data: [1, 2, 3] });
      else reject(new Error('Request failed: server unavailable'));
    }, Math.random() * 1000);
  });
}

// Shorthand static methods
const immediate = Promise.resolve({ id: 1, name: 'Alice' });
const failure   = Promise.reject(new TypeError('Expected string'));
// Always catch rejected promises or they become unhandled rejections
failure.catch(() => {});`}</code>
      </pre>

      {/* Section 3 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        3. Promise Chaining: Error Propagation and Return Values
      </h2>
      <p>
        Because <code>.then()</code> always returns a new Promise, you can chain operations in a
        flat, readable sequence. A value returned from a <code>.then()</code> handler becomes the
        resolved value of the next Promise in the chain. An error thrown in any step propagates
        through the chain to the nearest <code>.catch()</code>.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Correct: flat chain (not nested)
fetchUser(userId)
  .then(user => fetchUserPosts(user.id))     // Returns a Promise
  .then(posts => fetchComments(posts[0].id)) // Waits for posts first
  .then(comments => renderComments(comments))
  .catch(err => showErrorMessage(err));

// Error propagation: errors skip .then() handlers
Promise.resolve('start')
  .then(val => { throw new Error('step 2 failed'); })
  .then(val => console.log('skipped'))
  .then(val => console.log('also skipped'))
  .catch(err => console.log('Caught:', err.message)); // Caught: step 2 failed

// Recovering in .catch() — the chain continues after catching
fetchPrimary()
  .catch(err => {
    console.warn('Primary source failed, using backup:', err.message);
    return fetchBackup();  // Return backup Promise — chain resumes
  })
  .then(data => processData(data)); // Runs with backup data

// Passing multiple values through the chain
fetchOrderById(orderId)
  .then(order => {
    return Promise.all([
      Promise.resolve(order),          // Pass through the original
      fetchCustomer(order.customerId), // Fetch related data in parallel
    ]);
  })
  .then(([order, customer]) => generateInvoice(order, customer))
  .then(invoice => sendEmail(invoice))
  .catch(err => logError('Invoice generation failed', err));`}</code>
      </pre>

      {/* Section 4 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        4. async/await: The Modern Async Syntax
      </h2>
      <p>
        Introduced in ES2017, <strong>async/await</strong> is syntactic sugar that makes
        Promise-based code read like synchronous code. An <code>async</code> function always
        returns a Promise. The <code>await</code> keyword pauses execution of the async function
        until the awaited Promise settles, then resumes with the resolved value.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// async function always returns a Promise
async function greet(name) {
  return \`Hello, \${name}!\`;  // Auto-wrapped in Promise.resolve(...)
}
greet('Alice').then(console.log); // Hello, Alice!

// await pauses execution until the Promise settles
async function loadDashboard(userId) {
  const user     = await fetchUser(userId);      // Waits here
  const settings = await fetchSettings(user.id); // Then waits here
  const stats    = await fetchStats(user.id);    // Then waits here
  return { user, settings, stats };
}

// Error handling with try/catch
async function safeLoadDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const data = await fetchUserData(user.id);
    return renderDashboard(user, data);
  } catch (error) {
    if (error.status === 404) {
      return renderNotFound();
    }
    console.error('Dashboard load failed:', error);
    throw error;  // Re-throw errors you cannot handle here
  } finally {
    hideLoadingIndicator();  // Always runs
  }
}

// Top-level await (ES2022, in ES Modules)
const config = await loadConfig('./app.config.json');
console.log('App version:', config.version);`}</code>
      </pre>

      <h3
        style={{
          fontSize: '1.2rem',
          fontWeight: 600,
          marginTop: '1.75rem',
          color: '#1e293b',
        }}
      >
        Sequential vs. Parallel Execution — The Critical Performance Difference
      </h3>
      <p>
        The most common async/await performance mistake is using sequential <code>await</code>s
        for independent operations. Each sequential await adds its wait time to the total, while
        parallel execution only takes as long as the slowest operation.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// SLOW: Sequential — total time = 300 + 200 + 400 = 900ms
async function slowApproach() {
  const users    = await fetchUsers();     // Waits 300ms
  const products = await fetchProducts();  // Then waits 200ms more
  const orders   = await fetchOrders();    // Then waits 400ms more
  return { users, products, orders };
}

// FAST: Parallel — total time ≈ max(300, 200, 400) = 400ms
async function fastApproach() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders(),
  ]);
  return { users, products, orders };
}

// Parallel array processing (not sequential!)
async function processAllItems(items) {
  // Correct: start all at once, wait for all to finish
  return Promise.all(items.map(item => processItem(item)));
}

// Common mistake: for...of with await is sequential
async function sequentialByMistake(items) {
  const results = [];
  for (const item of items) {
    results.push(await processItem(item)); // Processes one at a time!
  }
  return results;
}`}</code>
      </pre>

      {/* Section 5 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        5. Promise Combinators: all, allSettled, race, any
      </h2>
      <p>
        JavaScript provides four static combinator methods for coordinating multiple Promises,
        each with a different resolution strategy suited to different use cases:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.9rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Method</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Resolves when</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Rejects when</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Best use case</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Promise.all', 'ALL fulfill', 'ANY single rejects (fail-fast)', 'All results required; one failure invalidates all'],
              ['Promise.allSettled', 'ALL settle (any status)', 'Never rejects', 'Batch ops; need all statuses including failures'],
              ['Promise.race', 'FIRST settles (any status)', 'FIRST rejects', 'Timeout wrapper; first-response wins'],
              ['Promise.any', 'FIRST fulfills', 'ALL reject (AggregateError)', 'Multiple fallback sources; first success wins'],
            ].map(([method, resolve, reject, useCase]) => (
              <tr key={method as string}>
                <td
                  style={{
                    padding: '0.65rem',
                    border: '1px solid #e2e8f0',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                  }}
                >
                  {method as string}
                </td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{resolve as string}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{reject as string}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{useCase as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Promise.all — all or nothing
try {
  const [user, posts, friends] = await Promise.all([
    fetchUser(id),
    fetchPosts(id),
    fetchFriends(id),
  ]);
  renderProfile(user, posts, friends);
} catch (error) {
  console.error('Profile load failed:', error.message);
}

// Promise.allSettled — batch operations with partial failure tolerance
const imageUploads = urls.map(url => uploadImage(url));
const outcomes = await Promise.allSettled(imageUploads);

let succeeded = 0, failed = 0;
outcomes.forEach((outcome, index) => {
  if (outcome.status === 'fulfilled') {
    console.log(\`Image \${index}: uploaded\`);
    succeeded++;
  } else {
    console.warn(\`Image \${index}: failed — \${outcome.reason.message}\`);
    failed++;
  }
});
console.log(\`\${succeeded} uploaded, \${failed} failed\`);

// Promise.race — take the first settled result (including rejections)
const firstCache = await Promise.race([
  fetchFromRedis(key),
  fetchFromMemcached(key),
]);

// Promise.any — first success, ignores individual rejections
try {
  const data = await Promise.any([
    fetchFromPrimaryDB(),
    fetchFromReplicaDB(),
    fetchFromCacheFallback(),
  ]);
  console.log('Got data from fastest source:', data);
} catch (aggregateError) {
  // Thrown only when ALL promises reject
  aggregateError.errors.forEach((err, i) =>
    console.error(\`Source \${i + 1}: \${err.message}\`)
  );
}`}</code>
      </pre>

      {/* Section 6 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        6. Error Handling Patterns
      </h2>
      <p>
        Robust error handling is where many async codebases fall short. Unhandled Promise
        rejections crash Node.js processes (since v15) and trigger warnings in browsers. Here
        are the essential patterns for handling async errors correctly.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Custom error classes for better categorization
class NetworkError extends Error {
  constructor(message, statusCode, endpoint) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
    this.endpoint = endpoint;
  }
}

class ValidationError extends Error {
  constructor(message, field, value) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(\`\${resource} with id \${id} not found\`);
    this.name = 'NotFoundError';
    this.resource = resource;
    this.id = id;
  }
}

// Differentiated error handling with instanceof
async function updateUserProfile(userId, data) {
  try {
    validateProfileData(data);           // Throws ValidationError
    const user = await fetchUser(userId); // Throws NetworkError or NotFoundError
    return await saveUser({ ...user, ...data });
  } catch (error) {
    if (error instanceof ValidationError) {
      return { success: false, error: 'validation', field: error.field };
    }
    if (error instanceof NotFoundError) {
      return { success: false, error: 'not_found' };
    }
    if (error instanceof NetworkError && error.statusCode >= 500) {
      throw error;  // Retry-able — let the caller handle
    }
    throw error;  // Unknown error — re-throw for upper layers
  }
}

// Global handlers (last resort)
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1); // Recommended in Node.js 15+
});

window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise rejection:', event.reason);
  reportToMonitoring(event.reason);
  event.preventDefault();
});`}</code>
      </pre>

      {/* Section 7 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        7. Advanced Patterns
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
        Promise.withResolvers() — ES2024
      </h3>
      <p>
        <code>Promise.withResolvers()</code> (Node.js 22+, Chrome 119+) returns an object
        containing a new Promise together with its <code>resolve</code> and <code>reject</code>{' '}
        functions — eliminating the need to capture them through the constructor callback.
      </p>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Old "deferred" pattern — verbose variable capture
let externalResolve, externalReject;
const deferred = new Promise((res, rej) => {
  externalResolve = res;
  externalReject  = rej;
});

// New: Promise.withResolvers() — clean and explicit
const { promise, resolve, reject } = Promise.withResolvers();

// Practical use: event-to-promise bridge
function waitForEvent(emitter, event, errorEvent = 'error') {
  const { promise, resolve, reject } = Promise.withResolvers();

  const onSuccess = data => { emitter.off(errorEvent, onError); resolve(data); };
  const onError   = err  => { emitter.off(event, onSuccess);    reject(err);  };

  emitter.once(event, onSuccess);
  emitter.once(errorEvent, onError);
  return promise;
}

const socket = createWebSocket('wss://api.example.com');
await waitForEvent(socket, 'open');
console.log('WebSocket connected!');

// Polyfill for older environments
if (!Promise.withResolvers) {
  Promise.withResolvers = function() {
    let resolve, reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
  };
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Promisifying Callback-Based APIs
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`const { promisify } = require('util');
const fs  = require('fs');
const dns = require('dns');

// Node.js util.promisify for standard (err, result) callbacks
const readFile  = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const dnsLookup = promisify(dns.lookup);

const config = JSON.parse(await readFile('./config.json', 'utf8'));
const { address } = await dnsLookup('example.com');

// Manual promisify utility for any callback-style function
function promisifyFn(fn, context = null) {
  return function promisified(...args) {
    return new Promise((resolve, reject) => {
      fn.call(context, ...args, (err, ...results) => {
        if (err) return reject(err);
        resolve(results.length <= 1 ? results[0] : results);
      });
    });
  };
}

// Modern Node.js: use fs/promises (already promisified)
import { readFile, writeFile, readdir } from 'fs/promises';

const content  = await readFile('./data.txt', 'utf8');
const fileList = await readdir('./src');
await writeFile('./output.txt', content.toUpperCase());`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Bounded Concurrency: Processing Large Datasets in Parallel
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Process items with a maximum concurrency limit
async function withBoundedConcurrency(items, processItem, concurrency = 5) {
  const results = new Array(items.length);
  const inFlight = new Set();

  for (let i = 0; i < items.length; i++) {
    const index = i;
    const promise = processItem(items[i]).then(result => {
      results[index] = result;
      inFlight.delete(promise);
    });
    inFlight.add(promise);

    if (inFlight.size >= concurrency) {
      await Promise.race(inFlight);  // Wait for a slot to open
    }
  }

  await Promise.all(inFlight);  // Wait for remaining in-flight
  return results;
}

// Usage: process 1000 items, 5 at a time
const userIds = Array.from({ length: 1000 }, (_, i) => i + 1);
const profiles = await withBoundedConcurrency(
  userIds,
  id => fetch(\`/api/users/\${id}\`).then(r => r.json()),
  5  // Max 5 concurrent requests
);`}</code>
      </pre>

      {/* Section 8 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        8. Real-World Examples
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
        Fetch with Retry Logic and Exponential Backoff
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`async function fetchWithRetry(url, options = {}, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10s timeout per attempt
      });

      // Don't retry client errors (4xx) except 429 (rate limit)
      if (!response.ok) {
        if (response.status < 500 && response.status !== 429) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        if (attempt < maxRetries) {
          // Respect Retry-After header or use exponential backoff
          const retryAfter = response.headers.get('Retry-After');
          const waitMs = retryAfter
            ? parseInt(retryAfter) * 1000
            : baseDelay * Math.pow(2, attempt - 1);
          console.warn(\`Attempt \${attempt}/\${maxRetries}: HTTP \${response.status}, retrying in \${waitMs}ms\`);
          await new Promise(resolve => setTimeout(resolve, waitMs));
          continue;
        }
        throw new Error(\`HTTP \${response.status} after \${maxRetries} attempts\`);
      }

      return await response.json();

    } catch (error) {
      if (error.name === 'TimeoutError') throw new Error('Request timed out');
      if (attempt === maxRetries) throw error;
      const waitMs = baseDelay * Math.pow(2, attempt - 1);
      console.warn(\`Attempt \${attempt} failed: \${error.message}. Retrying...\`);
      await new Promise(resolve => setTimeout(resolve, waitMs));
    }
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Timeout Wrapper with AbortController
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// Generic Promise timeout (works with any Promise)
function withTimeout(promise, ms, message) {
  const timeout = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(message ?? \`Operation timed out after \${ms}ms\`)),
      ms
    )
  );
  return Promise.race([promise, timeout]);
}

// Better for fetch: AbortController actually cancels the request
async function fetchWithAbort(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(\`Request to \${url} timed out after \${timeoutMs}ms\`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);  // Always clean up the timer
  }
}

// Usage
try {
  const data = await fetchWithAbort('https://api.example.com/slow-endpoint', 3000);
  renderData(data);
} catch (error) {
  showError(error.message);
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Concurrent Dashboard Loading
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`async function loadDashboard(userId) {
  // Start independent requests immediately (before any await)
  const [userPromise, settingsPromise] = [
    fetchUser(userId),
    fetchSettings(userId),
  ];

  // Wait for user first (needed to get user-dependent IDs)
  const user = await userPromise;

  // Now fetch all user-dependent data in parallel
  const [posts, followers, notifications, settings] = await Promise.all([
    fetchPosts(user.id, { limit: 10 }),
    fetchFollowers(user.id),
    fetchNotifications(user.id, { unreadOnly: true }),
    settingsPromise,  // Already in flight — just awaiting its result
  ]);

  return {
    user,
    posts,
    followers,
    notifications,
    settings,
    unreadCount: notifications.filter(n => !n.read).length,
  };
}`}</code>
      </pre>

      {/* Section 9 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        9. Common Mistakes and How to Fix Them
      </h2>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.5rem', color: '#1e293b' }}>
        Mistake 1: Forgetting await
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// WRONG: data is a Promise object, not the actual data
async function wrong() {
  const data = fetchUser(1);     // Missing await! data = Promise{<pending>}
  console.log(data.name);        // undefined — Promise has no .name
  if (data) { ... }              // Always true — Promise objects are truthy
}

// RIGHT: await the Promise to get the resolved value
async function correct() {
  const data = await fetchUser(1);  // data = { id: 1, name: 'Alice', ... }
  console.log(data.name);           // 'Alice'
}

// SUBTLE: forgetting await in a conditional
async function sneakyBug(userId) {
  const user = fetchUserIfExists(userId);  // Missing await!
  if (user) {                              // Always true! Promise is truthy
    await sendWelcomeEmail(user);          // user is a Promise, not a user object
  }
}

// Use ESLint rule @typescript-eslint/no-floating-promises to catch these`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Mistake 2: Swallowing Errors (Empty catch blocks)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// WRONG: errors are silently discarded — impossible to debug
async function silentFailure() {
  try {
    await doImportantWork();
  } catch (e) {
    // Empty catch: error gone forever. Network error? Bug? Nobody knows.
  }
}

// RIGHT: always log at minimum, or re-throw
async function properErrorHandling() {
  try {
    await doImportantWork();
  } catch (error) {
    console.error('doImportantWork failed:', error);
    // Option A: Re-throw so the caller can handle it
    throw error;
    // Option B: Return a fallback (only if failure is genuinely acceptable)
    // return fallbackValue;
  }
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Mistake 3: Nested Promises (Promise Callback Hell)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// WRONG: nested .then() — Promise callback hell
fetchUser(id).then(user => {
  fetchPosts(user.id).then(posts => {         // Nested!
    fetchComments(posts[0].id).then(comments => { // Even deeper!
      renderPage(user, posts, comments);
    });
  });
});

// RIGHT: flat async/await
async function loadPage(id) {
  const user     = await fetchUser(id);
  const posts    = await fetchPosts(user.id);      // Depends on user
  const comments = await fetchComments(posts[0].id); // Depends on posts
  return renderPage(user, posts, comments);
}`}</code>
      </pre>

      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '1.75rem', color: '#1e293b' }}>
        Mistake 4: Wrapping a Promise in new Promise() (Anti-Pattern)
      </h3>
      <pre
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          padding: '1.25rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
      >
        <code>{`// WRONG: wrapping an already-Promise-based API unnecessarily
function fetchDataWrong(url) {
  return new Promise((resolve, reject) => {
    fetch(url)               // fetch() already returns a Promise!
      .then(res => res.json())
      .then(resolve)         // Redundant
      .catch(reject);        // Error handling is also double-handled
  });
}

// RIGHT: just chain or use async/await directly
function fetchDataRight(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  });
}

async function fetchDataAsync(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}`}</code>
      </pre>

      {/* Section 10 */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1rem',
          color: '#1e293b',
        }}
      >
        10. Callbacks vs. Promises vs. async/await: Comparison Table
      </h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Aspect</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Callbacks</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>Promises</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e2e8f0' }}>async/await</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Readability', 'Poor (nesting)', 'Good (chaining)', 'Excellent (sync-like)'],
              ['Error handling', 'Easy to miss', '.catch() chain', 'try/catch blocks'],
              ['Stack traces', 'Truncated', 'Partial', 'Full and clear'],
              ['Debugging (breakpoints)', 'Difficult', 'Moderate', 'Excellent'],
              ['Parallel execution', 'Manual counters', 'Promise.all / .race', 'await Promise.all'],
              ['Conditional async flow', 'Complex nesting', 'Moderate', 'Simple (if/else, loops)'],
              ['TypeScript support', 'Weak', 'Good', 'Best (full type inference)'],
              ['Browser support', 'Universal', 'ES6+ (IE with polyfill)', 'ES2017+ (Babel for older)'],
              ['Learning curve', 'Low initially', 'Medium', 'Low (if Promises understood)'],
              ['Best for', 'Legacy codebases', 'Composing/chaining', 'Most new async code'],
            ].map(([aspect, cb, prom, aa]) => (
              <tr key={aspect as string}>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0', fontWeight: 600 }}>{aspect as string}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{cb as string}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{prom as string}</td>
                <td style={{ padding: '0.65rem', border: '1px solid #e2e8f0' }}>{aa as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginTop: '2.5rem',
          marginBottom: '1.25rem',
          color: '#1e293b',
        }}
      >
        Frequently Asked Questions
      </h2>

      {[
        {
          q: 'What are the three states of a JavaScript Promise?',
          a: "A Promise has three states: pending (initial — not yet settled), fulfilled (operation completed successfully with a value), and rejected (operation failed with a reason/error). Once settled (fulfilled or rejected), a Promise's state is permanent and never changes. You handle fulfilled Promises with .then() and rejected ones with .catch().",
        },
        {
          q: 'What is the difference between async/await and .then()/.catch()?',
          a: 'Both are built on the same Promise mechanism. async/await uses synchronous-style syntax making code easier to read, debug, and reason about — especially for sequential operations. Error handling uses familiar try/catch. .then()/.catch() chains are more explicit about the async nature and useful for dynamic composition. async/await compiles to .then()/.catch() under the hood, so choose based on readability. Most modern codebases prefer async/await.',
        },
        {
          q: 'What is the difference between Promise.all and Promise.allSettled?',
          a: 'Promise.all fails fast — if any one promise rejects, the whole Promise.all rejects immediately with that error. Use it when all results are required. Promise.allSettled waits for every promise to settle regardless of outcome and returns an array of { status, value/reason } objects. It never rejects. Use it for batch operations where you want all results, including failures.',
        },
        {
          q: 'How do I run multiple async operations in parallel?',
          a: 'Use Promise.all with an array of started promises: const [a, b] = await Promise.all([fetchA(), fetchB()]). The key is that fetchA() and fetchB() are invoked (started) before any await — this kicks off both operations simultaneously. Never use sequential awaits like: const a = await fetchA(); const b = await fetchB(); for independent operations — that runs them one at a time.',
        },
        {
          q: 'How do I add a timeout to a Promise?',
          a: 'Use Promise.race with a timeout Promise: function withTimeout(p, ms) { return Promise.race([p, new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))]); }. For fetch specifically, use AbortController: const ctrl = new AbortController(); setTimeout(() => ctrl.abort(), ms); await fetch(url, { signal: ctrl.signal }); — this properly cancels the underlying request rather than just abandoning it.',
        },
        {
          q: 'What happens if I forget await before a Promise?',
          a: "Without await, you receive the Promise object itself rather than its resolved value. The variable will be a Promise, not your data. Comparisons like if (result) are always true (Promises are objects). The Promise's errors will not be caught by surrounding try/catch blocks. TypeScript and ESLint (with the @typescript-eslint/no-floating-promises rule) can catch many forgotten-await bugs at compile time.",
        },
        {
          q: 'What is promisification?',
          a: "Promisification converts callback-style APIs (where the last argument is a callback(error, result) function) into Promise-returning functions. Node.js provides util.promisify(fn) for standard Node-style callbacks. You can also promisify manually: return new Promise((resolve, reject) => fn(...args, (err, result) => err ? reject(err) : resolve(result))). Node.js also provides fs/promises, dns/promises, and other built-in Promise APIs.",
        },
        {
          q: 'What is Promise.withResolvers() and when is it useful?',
          a: 'Promise.withResolvers() (ES2024) returns { promise, resolve, reject } — letting you access the resolver functions outside the constructor callback. It replaces the "deferred" pattern where you capture resolve/reject via closure. It is especially useful for converting event emitters to Promises, building cancellation tokens, and any case where you need to resolve/reject a Promise from a different scope or callback.',
        },
      ].map(({ q, a }) => (
        <div
          key={q}
          style={{
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <h3
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: '#1e293b',
              marginBottom: '0.5rem',
            }}
          >
            {q}
          </h3>
          <p style={{ margin: 0, color: '#475569', lineHeight: '1.7' }}>{a}</p>
        </div>
      ))}

      {/* Conclusion */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '1.25rem 1.5rem',
          marginTop: '2rem',
        }}
      >
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>
          Conclusion
        </p>
        <p style={{ margin: 0, color: '#475569' }}>
          JavaScript Promises and async/await are indispensable tools for modern web development.
          Mastering them means understanding Promise states, choosing the right combinator (
          <code>Promise.all</code> vs <code>Promise.allSettled</code> vs <code>Promise.race</code>
          ), handling errors explicitly at every level, and knowing when to run operations in
          parallel vs. sequentially. Avoid the common pitfalls — forgetting <code>await</code>,
          swallowing errors in empty catch blocks, and nesting Promises unnecessarily. With these
          patterns in hand, your async code will be reliable, performant, and easy to maintain.
          Use our{' '}
          <a href="/en/tools/json-formatter" style={{ color: '#0369a1' }}>
            JSON Formatter
          </a>{' '}
          and{' '}
          <a href="/en/tools/jwt-decoder" style={{ color: '#0369a1' }}>
            JWT Decoder
          </a>{' '}
          to debug the API responses you fetch with these async patterns.
        </p>
      </div>
    </article>
  );
}
