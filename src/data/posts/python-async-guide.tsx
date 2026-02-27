'use client';

import Link from 'next/link';

const translations = {
  en: {
    title: 'Python Async/Await and asyncio Complete Guide — aiohttp, FastAPI, asyncpg, Testing',
    description: 'Complete Python async guide covering async/await basics, asyncio Tasks, aiohttp client/server, FastAPI integration, asyncpg and SQLAlchemy async, concurrency patterns, mixing sync/async, and pytest-asyncio testing.',
  },
  zh: {
    title: 'Python Async/Await 与 asyncio 完整指南 — aiohttp、FastAPI、asyncpg、测试',
    description: '完整 Python 异步指南，涵盖 async/await 基础、asyncio 任务、aiohttp 客户端/服务端、FastAPI 集成、asyncpg 和 SQLAlchemy 异步、并发模式、同步/异步混用及 pytest-asyncio 测试。',
  },
};

export default function PythonAsyncGuide({ lang = 'en' }: { lang?: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between a coroutine and a regular function in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A regular Python function executes synchronously and blocks until it returns. A coroutine (defined with async def) returns a coroutine object when called — it does not execute immediately. To actually run the coroutine, you must either await it (inside another async function), pass it to asyncio.run(), or wrap it in an asyncio.Task via asyncio.create_task(). The key distinction: when a coroutine reaches an await expression, it suspends and yields control back to the event loop, allowing other coroutines to run concurrently on the same thread — unlike threads, there is no preemption.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the asyncio event loop and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The asyncio event loop is a single-threaded scheduler that manages coroutines, I/O callbacks, and timers. It runs a continuous loop: check for I/O events (using select/epoll/kqueue under the hood), wake up any coroutines waiting on completed I/O, and run them until they hit the next await. This is cooperative multitasking — coroutines must explicitly yield with await to allow others to run. CPU-bound code never yields and will block the entire event loop. asyncio.run() creates a new event loop, runs your coroutine to completion, then closes the loop. In Python 3.10+, there is exactly one running event loop per thread.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use asyncio.gather() vs asyncio.create_task()?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use asyncio.gather(*coros) when you want to run multiple coroutines concurrently and collect all their results. It returns when ALL tasks complete. Use asyncio.create_task() when you want to start a background task without waiting for it immediately — you can fire-and-forget or await it later. The critical difference: gather blocks until ALL complete (or first exception by default). create_task schedules the task to run concurrently but lets you proceed with other code. Use asyncio.wait() with FIRST_COMPLETED for race patterns (e.g., timeout vs result). Use TaskGroup (Python 3.11+) for structured concurrency with automatic cleanup.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I use aiohttp instead of requests for async code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The requests library is synchronous — calling requests.get() blocks the entire event loop thread until the HTTP response arrives, defeating the purpose of async. aiohttp is fully async: it uses non-blocking I/O so your event loop can handle other coroutines while waiting for HTTP responses. Use aiohttp.ClientSession inside an async context manager. Always reuse a single ClientSession per application (not per request) — creating a session per request is a common performance mistake because it does not reuse TCP connections from the connection pool.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I prevent blocking the event loop with CPU-bound code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CPU-bound code (image processing, heavy computation, JSON parsing of huge files) never yields and blocks the entire event loop. Solutions: (1) asyncio.to_thread(func, *args) — runs a sync function in a ThreadPoolExecutor thread pool (Python 3.9+). Best for I/O-bound sync code or moderate CPU work. (2) loop.run_in_executor(executor, func, *args) — lower-level version of to_thread, also supports ProcessPoolExecutor for true CPU parallelism. (3) For heavy CPU work, use ProcessPoolExecutor to bypass the GIL. (4) Consider numpy/numba/Cython to speed up computation and reduce blocking duration.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I limit concurrency in asyncio to avoid overwhelming a service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use asyncio.Semaphore to limit the number of concurrent coroutines: sem = asyncio.Semaphore(10) then async with sem: await fetch(url). This ensures at most 10 fetches run simultaneously regardless of how many tasks are queued. For rate limiting (requests per second), combine Semaphore with asyncio.sleep(). The tenacity library provides retry logic with exponential backoff. For producer/consumer patterns, use asyncio.Queue: producers put items, consumers get items, and Queue size naturally limits concurrent work.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I test async code with pytest?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Install pytest-asyncio and mark async test functions with @pytest.mark.asyncio. Configure asyncio_mode = "auto" in pytest.ini to avoid adding the decorator to every test. Use AsyncMock from unittest.mock to mock async functions and context managers. For database tests, use the anyio library with @pytest.mark.anyio for backend-agnostic async testing. pytest-asyncio\'s event_loop_scope determines whether the event loop is shared across a session, module, or individual test — use "module" or "session" scope to share database connections efficiently.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between asyncio.sleep(0) and asyncio.sleep(n)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'asyncio.sleep(0) yields control to the event loop for one iteration without actually waiting — it is the asyncio equivalent of "yielding the CPU." Use it to make long-running loops cooperative: add await asyncio.sleep(0) inside a tight loop to allow other coroutines to run. asyncio.sleep(n) schedules a callback after n seconds and suspends the coroutine until then. Never use time.sleep() in async code — it blocks the entire event loop thread. Use asyncio.sleep(0) sparingly; if you need it frequently, the real fix is to move CPU-bound work to a thread or process pool.',
        },
      },
    ],
  };

  return (
    <article style={{ lineHeight: '1.7', color: '#334155' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <link rel="canonical" href="https://viadreams.cc/en/blog/python-async-guide" />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0369a1', margin: '0 0 0.5rem 0' }}>TL;DR</p>
        <p style={{ margin: 0 }}>
          Python&apos;s <strong>asyncio</strong> enables single-threaded concurrency via coroutines and an event loop.
          Use <strong>async def / await</strong> for I/O-bound work, <strong>asyncio.gather()</strong> or{' '}
          <strong>TaskGroup</strong> for concurrent execution, <strong>aiohttp</strong> for HTTP, <strong>asyncpg</strong>{' '}
          or SQLAlchemy async for databases, and <strong>asyncio.to_thread()</strong> to run blocking code without stalling
          the loop. Use the{' '}
          <a href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#0284c7' }}>
            online JSON formatter
          </a>{' '}
          to inspect API responses while building your async services.
        </p>
      </div>

      {/* Section 1: async/await Basics */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        1. async/await Basics — Coroutines, Event Loop, and asyncio.run()
      </h2>
      <p>
        Python&apos;s async model is built on <strong>cooperative multitasking</strong>: coroutines voluntarily
        yield control at <code>await</code> points, allowing the event loop to run other coroutines. This is
        fundamentally different from threading (preemptive) or multiprocessing (separate processes).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import asyncio

# A coroutine — defined with async def
async def fetch_data(url: str) -> dict:
    print(f"Fetching {url}...")
    await asyncio.sleep(1)   # simulates I/O wait; yields to event loop
    return {"url": url, "data": "..."}

# Calling a coroutine returns a coroutine object — does NOT execute
coro = fetch_data("https://api.example.com")
print(type(coro))  # <class 'coroutine'>

# To execute: wrap with asyncio.run() (Python 3.7+)
async def main():
    result = await fetch_data("https://api.example.com")
    print(result)

asyncio.run(main())   # creates event loop, runs main(), closes loop

# Coroutine vs regular function:
def sync_fetch(url: str) -> dict:
    import time
    time.sleep(1)   # BLOCKS the entire process — no other code runs
    return {"url": url}

async def async_fetch(url: str) -> dict:
    await asyncio.sleep(1)   # suspends THIS coroutine; event loop runs others
    return {"url": url}`}</code></pre>

      <p>
        The <code>asyncio.run()</code> function is the standard entry point for async programs in Python 3.7+.
        It creates a new event loop, runs the given coroutine to completion, closes all async generators, and
        shuts down the executor before returning. <strong>Never call <code>asyncio.run()</code> inside an already
        running event loop</strong> (e.g., in Jupyter notebooks or inside another async function) — use
        <code>await</code> directly instead.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# Async context managers and async iterators
class AsyncDatabase:
    async def __aenter__(self):
        self.conn = await asyncio.sleep(0)  # simulated connect
        return self

    async def __aexit__(self, *args):
        await asyncio.sleep(0)  # simulated disconnect

    async def __aiter__(self):
        for i in range(5):
            await asyncio.sleep(0.1)
            yield i

async def main():
    # Async context manager
    async with AsyncDatabase() as db:
        pass

    # Async iterator
    async for row in AsyncDatabase():
        print(row)`}</code></pre>

      {/* Section 2: Tasks & Gather */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        2. Tasks and Gather — asyncio.create_task(), gather(), wait(), TaskGroup
      </h2>
      <p>
        Running coroutines one after another with <code>await</code> is sequential — useful for dependent steps
        but slow for independent I/O operations. For true concurrency, wrap coroutines in <strong>Tasks</strong>
        or use <code>gather()</code>.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import asyncio
import time

async def fetch(url: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"Response from {url}"

async def sequential():
    start = time.perf_counter()
    r1 = await fetch("url1", 1.0)
    r2 = await fetch("url2", 1.0)
    r3 = await fetch("url3", 1.0)
    print(f"Sequential: {time.perf_counter() - start:.1f}s")  # ~3.0s

async def concurrent_gather():
    start = time.perf_counter()
    r1, r2, r3 = await asyncio.gather(
        fetch("url1", 1.0),
        fetch("url2", 1.0),
        fetch("url3", 1.0),
    )
    print(f"Gather: {time.perf_counter() - start:.1f}s")  # ~1.0s

# asyncio.gather with exception handling
async def safe_gather():
    results = await asyncio.gather(
        fetch("url1", 1.0),
        fetch("url2", 1.0),
        asyncio.sleep(0.5),   # can mix different coroutines
        return_exceptions=True   # exceptions become result values, not raised
    )
    for r in results:
        if isinstance(r, Exception):
            print(f"Failed: {r}")
        else:
            print(f"OK: {r}")

# asyncio.create_task — fire and schedule immediately
async def background_tasks():
    task1 = asyncio.create_task(fetch("url1", 2.0), name="fetch-url1")
    task2 = asyncio.create_task(fetch("url2", 1.0), name="fetch-url2")
    # Do other work while tasks run concurrently
    await asyncio.sleep(0.5)
    # Now wait for both
    results = await asyncio.gather(task1, task2)
    return results

# Task cancellation
async def cancel_example():
    task = asyncio.create_task(fetch("slow-url", 10.0))
    await asyncio.sleep(1.0)
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task was cancelled")

# TaskGroup (Python 3.11+) — structured concurrency
async def taskgroup_example():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch("url1", 1.0))
        task2 = tg.create_task(fetch("url2", 0.5))
    # All tasks complete before exiting the block
    # If any task raises, all others are cancelled
    print(task1.result(), task2.result())

# asyncio.wait — more control over completion
async def wait_example():
    tasks = [asyncio.create_task(fetch(f"url{i}", i * 0.3)) for i in range(5)]
    done, pending = await asyncio.wait(
        tasks,
        timeout=1.0,
        return_when=asyncio.FIRST_EXCEPTION
    )
    for task in pending:
        task.cancel()`}</code></pre>

      {/* Section 3: asyncio Primitives */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        3. asyncio Primitives — sleep, timeout, Event, Queue, Lock
      </h2>
      <p>
        asyncio provides async-safe synchronization primitives that work within the single-threaded event loop.
        These are <strong>not</strong> thread-safe — use <code>threading</code> equivalents for multi-threaded code.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import asyncio

# asyncio.timeout (Python 3.11+) — cleaner timeout handling
async def fetch_with_timeout(url: str) -> str:
    try:
        async with asyncio.timeout(5.0):   # raises TimeoutError after 5s
            return await slow_fetch(url)
    except TimeoutError:
        return "timeout"

# asyncio.wait_for — older equivalent
async def fetch_wait_for(url: str) -> str:
    try:
        return await asyncio.wait_for(slow_fetch(url), timeout=5.0)
    except asyncio.TimeoutError:
        return "timeout"

# asyncio.Event — signal between coroutines
async def event_example():
    ready = asyncio.Event()

    async def producer():
        await asyncio.sleep(1.0)
        ready.set()   # signal all waiters

    async def consumer(name: str):
        await ready.wait()   # blocks until set()
        print(f"{name}: event received")

    await asyncio.gather(
        producer(),
        consumer("A"),
        consumer("B"),
    )

# asyncio.Queue — producer/consumer pipeline
async def queue_example():
    queue: asyncio.Queue[int] = asyncio.Queue(maxsize=10)

    async def producer():
        for i in range(20):
            await queue.put(i)   # blocks if queue is full
        await queue.put(None)    # sentinel

    async def consumer():
        while True:
            item = await queue.get()
            if item is None:
                break
            print(f"Processing {item}")
            queue.task_done()

    await asyncio.gather(producer(), consumer())

# asyncio.Lock — mutual exclusion
async def lock_example():
    lock = asyncio.Lock()
    shared_state = []

    async def worker(item: int):
        async with lock:   # only one worker at a time
            shared_state.append(item)

    await asyncio.gather(*[worker(i) for i in range(10)])

# asyncio.Semaphore — bounded concurrency
async def semaphore_example(urls: list[str]):
    sem = asyncio.Semaphore(5)   # max 5 concurrent requests

    async def bounded_fetch(url: str) -> str:
        async with sem:
            return await fetch(url)

    return await asyncio.gather(*[bounded_fetch(url) for url in urls])`}</code></pre>

      {/* Section 4: aiohttp Client */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        4. aiohttp Client — ClientSession, GET/POST, Rate Limiting, Retries
      </h2>
      <p>
        Never use the <code>requests</code> library inside async code — it blocks the event loop. <code>aiohttp</code>
        provides a fully async HTTP client with connection pooling, streaming, and WebSocket support.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# pip install aiohttp tenacity
import asyncio
import aiohttp
from tenacity import retry, stop_after_attempt, wait_exponential

# Basic GET — reuse ClientSession across all requests
async def fetch_all(urls: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:   # one session per app
        tasks = [fetch_one(session, url) for url in urls]
        return await asyncio.gather(*tasks)

async def fetch_one(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url, timeout=aiohttp.ClientTimeout(total=10)) as resp:
        resp.raise_for_status()
        return await resp.json()

# POST with JSON body and headers
async def post_data(session: aiohttp.ClientSession, url: str, payload: dict) -> dict:
    async with session.post(
        url,
        json=payload,
        headers={"Authorization": "Bearer token123", "Content-Type": "application/json"},
    ) as resp:
        if resp.status == 201:
            return await resp.json()
        text = await resp.text()
        raise ValueError(f"POST failed {resp.status}: {text}")

# Rate limiting with Semaphore + sleep
async def rate_limited_fetch(urls: list[str], rps: int = 10) -> list[dict]:
    sem = asyncio.Semaphore(rps)
    results = []

    async def fetch_with_limit(session: aiohttp.ClientSession, url: str) -> dict:
        async with sem:
            result = await fetch_one(session, url)
            await asyncio.sleep(1 / rps)   # simple rate limiter
            return result

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_with_limit(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Retry with exponential backoff using tenacity
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=10),
    reraise=True,
)
async def resilient_fetch(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as resp:
        resp.raise_for_status()
        return await resp.json()

# Streaming large responses
async def stream_download(url: str, filepath: str):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            with open(filepath, "wb") as f:
                async for chunk in resp.content.iter_chunked(8192):
                    f.write(chunk)`}</code></pre>

      {/* Section 5: aiohttp Server */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        5. aiohttp Server — Application, Routes, Middleware, StreamResponse
      </h2>
      <p>
        aiohttp also provides a lightweight async web server. It is lower-level than FastAPI but useful for
        high-performance services where you want minimal overhead.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# pip install aiohttp
from aiohttp import web
import json

# Route handlers
async def handle_get(request: web.Request) -> web.Response:
    name = request.match_info.get("name", "World")
    return web.json_response({"message": f"Hello, {name}!"})

async def handle_post(request: web.Request) -> web.Response:
    try:
        data = await request.json()
    except json.JSONDecodeError:
        raise web.HTTPBadRequest(text="Invalid JSON")

    # Access query params
    page = int(request.rel_url.query.get("page", 1))
    return web.json_response({"received": data, "page": page}, status=201)

# Streaming response
async def handle_stream(request: web.Request) -> web.StreamResponse:
    response = web.StreamResponse(
        headers={"Content-Type": "text/event-stream", "Cache-Control": "no-cache"}
    )
    await response.prepare(request)
    for i in range(10):
        await response.write(f"data: {i}\\n\\n".encode())
        await asyncio.sleep(0.5)
    return response

# Middleware
@web.middleware
async def auth_middleware(request: web.Request, handler):
    token = request.headers.get("Authorization", "").replace("Bearer ", "")
    if request.path.startswith("/api/") and not token:
        raise web.HTTPUnauthorized(text="Missing token")
    response = await handler(request)
    return response

@web.middleware
async def error_middleware(request: web.Request, handler):
    try:
        return await handler(request)
    except web.HTTPException:
        raise
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

# Application setup with startup/cleanup
async def startup(app: web.Application):
    app["db_pool"] = await create_db_pool()

async def cleanup(app: web.Application):
    await app["db_pool"].close()

def create_app() -> web.Application:
    app = web.Application(middlewares=[error_middleware, auth_middleware])
    app.on_startup.append(startup)
    app.on_cleanup.append(cleanup)

    app.router.add_get("/hello/{name}", handle_get)
    app.router.add_post("/api/items", handle_post)
    app.router.add_get("/stream", handle_stream)
    return app

if __name__ == "__main__":
    web.run_app(create_app(), host="0.0.0.0", port=8080)`}</code></pre>

      {/* Section 6: FastAPI Integration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        6. FastAPI Integration — async Endpoints, Lifespan, Background Tasks
      </h2>
      <p>
        FastAPI is the most popular Python web framework for async APIs. It runs on <strong>Uvicorn</strong> (an
        ASGI server) and supports both sync and async route handlers with automatic OpenAPI documentation.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# pip install fastapi uvicorn[standard] aiohttp
from fastapi import FastAPI, BackgroundTasks, Depends, HTTPException
from contextlib import asynccontextmanager
from typing import AsyncGenerator
import aiohttp

# Lifespan — replaces deprecated on_event startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    app.state.http_session = aiohttp.ClientSession()
    app.state.db_pool = await create_db_pool()
    print("Application started")
    yield
    # Shutdown
    await app.state.http_session.close()
    await app.state.db_pool.close()
    print("Application stopped")

app = FastAPI(lifespan=lifespan)

# Async dependency — shared across request
async def get_http_session(request) -> aiohttp.ClientSession:
    return request.app.state.http_session

# Async GET endpoint
@app.get("/items/{item_id}")
async def get_item(
    item_id: int,
    session: aiohttp.ClientSession = Depends(get_http_session)
) -> dict:
    async with session.get(f"https://api.upstream.com/items/{item_id}") as resp:
        if resp.status == 404:
            raise HTTPException(status_code=404, detail="Item not found")
        return await resp.json()

# Background task — runs after response is sent
async def send_notification(user_id: int, message: str):
    await asyncio.sleep(0)   # simulate async notification
    print(f"Notified user {user_id}: {message}")

@app.post("/orders", status_code=201)
async def create_order(
    order: dict,
    background_tasks: BackgroundTasks
) -> dict:
    order_id = 42  # create order in DB...
    background_tasks.add_task(send_notification, order["user_id"], f"Order {order_id} created")
    return {"order_id": order_id}

# Streaming response with Server-Sent Events
from fastapi.responses import StreamingResponse

@app.get("/stream")
async def stream_data():
    async def generator():
        for i in range(10):
            yield f"data: {i}\\n\\n"
            await asyncio.sleep(0.5)

    return StreamingResponse(generator(), media_type="text/event-stream")`}</code></pre>

      {/* Section 7: asyncpg & SQLAlchemy async */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        7. asyncpg and SQLAlchemy Async — Connections, Sessions, async_sessionmaker
      </h2>
      <p>
        Database drivers must be async for the event loop to remain unblocked during queries. <code>asyncpg</code>
        is the fastest PostgreSQL driver for Python. SQLAlchemy 2.0 provides a full async ORM layer on top of it.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# pip install asyncpg sqlalchemy[asyncio] greenlet
import asyncpg
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import select, String, Integer

# --- asyncpg direct usage ---
async def asyncpg_example():
    conn = await asyncpg.connect("postgresql://user:pass@localhost/mydb")
    try:
        # Parameterized queries prevent SQL injection
        row = await conn.fetchrow(
            "SELECT id, name FROM users WHERE id = $1", 42
        )
        rows = await conn.fetch("SELECT * FROM users LIMIT $1", 10)

        # Transaction
        async with conn.transaction():
            await conn.execute(
                "INSERT INTO users(name, email) VALUES($1, $2)",
                "Alice", "alice@example.com"
            )
    finally:
        await conn.close()

# Connection pool (recommended for production)
async def setup_pool() -> asyncpg.Pool:
    return await asyncpg.create_pool(
        "postgresql://user:pass@localhost/mydb",
        min_size=5,
        max_size=20,
        command_timeout=30,
    )

# --- SQLAlchemy 2.0 async ORM ---
class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(200), unique=True)

# Engine + session factory (create once at startup)
engine = create_async_engine(
    "postgresql+asyncpg://user:pass@localhost/mydb",
    pool_size=10,
    max_overflow=5,
    echo=False,
)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

# FastAPI dependency
async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise

# Repository pattern
async def get_user_by_id(session: AsyncSession, user_id: int) -> User | None:
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()

async def create_user(session: AsyncSession, name: str, email: str) -> User:
    user = User(name=name, email=email)
    session.add(user)
    await session.flush()   # get the generated ID without committing
    return user`}</code></pre>

      {/* Section 8: Concurrent Patterns */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        8. Concurrent Patterns — Semaphore, Producer/Consumer, Fan-Out
      </h2>
      <p>
        Real async applications need structured concurrency patterns. Here are the most common ones: bounded
        concurrency with Semaphore, producer/consumer pipelines, and fan-out/fan-in aggregation.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import asyncio
from typing import Any

# Pattern 1: Bounded concurrency with Semaphore
async def crawl(urls: list[str], max_concurrent: int = 10) -> list[Any]:
    sem = asyncio.Semaphore(max_concurrent)

    async def fetch_bounded(session, url: str) -> Any:
        async with sem:
            try:
                async with session.get(url, timeout=10) as resp:
                    return await resp.json()
            except Exception as e:
                return {"error": str(e), "url": url}

    import aiohttp
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_bounded(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Pattern 2: Producer/Consumer with asyncio.Queue
async def producer_consumer(items: list[Any], workers: int = 5):
    queue: asyncio.Queue = asyncio.Queue(maxsize=100)
    results = []

    async def producer():
        for item in items:
            await queue.put(item)
        # Send sentinel values to stop workers
        for _ in range(workers):
            await queue.put(None)

    async def consumer(worker_id: int):
        while True:
            item = await queue.get()
            if item is None:
                queue.task_done()
                return
            try:
                result = await process_item(item)
                results.append(result)
            finally:
                queue.task_done()

    await asyncio.gather(
        producer(),
        *[consumer(i) for i in range(workers)]
    )
    return results

async def process_item(item: Any) -> Any:
    await asyncio.sleep(0.1)   # simulated processing
    return {"processed": item}

# Pattern 3: Fan-out with multiple services
async def aggregate_data(user_id: int) -> dict:
    """Fetch user profile, orders, and preferences concurrently."""
    profile_task = asyncio.create_task(fetch_profile(user_id))
    orders_task  = asyncio.create_task(fetch_orders(user_id))
    prefs_task   = asyncio.create_task(fetch_preferences(user_id))

    # Use timeout for the entire aggregation
    try:
        async with asyncio.timeout(5.0):
            profile, orders, prefs = await asyncio.gather(
                profile_task, orders_task, prefs_task
            )
    except TimeoutError:
        # Cancel remaining tasks
        for task in [profile_task, orders_task, prefs_task]:
            task.cancel()
        raise

    return {"profile": profile, "orders": orders, "preferences": prefs}

async def fetch_profile(user_id: int) -> dict:
    await asyncio.sleep(0.3)
    return {"id": user_id, "name": "Alice"}

async def fetch_orders(user_id: int) -> list:
    await asyncio.sleep(0.5)
    return [{"id": 1, "total": 99.99}]

async def fetch_preferences(user_id: int) -> dict:
    await asyncio.sleep(0.2)
    return {"theme": "dark"}`}</code></pre>

      {/* Section 9: Mixing sync/await */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        9. Mixing Sync and Async — asyncio.to_thread(), run_in_executor(), Thread Safety
      </h2>
      <p>
        Real applications often need to call synchronous libraries (file I/O, legacy SDKs, CPU-bound code) from
        async code without blocking the event loop. Python provides two main mechanisms for this.
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`import asyncio
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import functools

# asyncio.to_thread — simplest approach (Python 3.9+)
# Runs sync function in the default ThreadPoolExecutor
async def read_file_async(path: str) -> str:
    # open() and f.read() are blocking — run in thread
    return await asyncio.to_thread(read_file_sync, path)

def read_file_sync(path: str) -> str:
    with open(path) as f:
        return f.read()

# Passing arguments
async def example():
    result = await asyncio.to_thread(
        functools.partial(expensive_sync, arg1="value", arg2=42)
    )

def expensive_sync(arg1: str, arg2: int) -> dict:
    import time
    time.sleep(1)   # blocking — safe in thread
    return {"arg1": arg1, "arg2": arg2}

# loop.run_in_executor — more control over executor
async def cpu_bound_example(data: list[int]) -> list[int]:
    loop = asyncio.get_running_loop()

    # ThreadPoolExecutor — shares memory, limited by GIL for CPU work
    with ThreadPoolExecutor(max_workers=4) as executor:
        result = await loop.run_in_executor(executor, sort_data, data)

    # ProcessPoolExecutor — true parallelism, bypasses GIL
    with ProcessPoolExecutor(max_workers=4) as executor:
        result = await loop.run_in_executor(executor, heavy_compute, data)

    return result

def sort_data(data: list[int]) -> list[int]:
    return sorted(data)

def heavy_compute(data: list[int]) -> list[int]:
    return [x ** 2 for x in data]  # CPU-intensive

# Async-to-sync bridge — calling async from sync context
# Useful when integrating async code into sync frameworks
def sync_wrapper(coroutine):
    """Run an async function from sync code."""
    try:
        loop = asyncio.get_running_loop()
        # Already in an async context — cannot use asyncio.run()
        # Schedule as a task instead
        import concurrent.futures
        future = asyncio.ensure_future(coroutine)
        return loop.run_until_complete(future)
    except RuntimeError:
        # No running loop — safe to use asyncio.run()
        return asyncio.run(coroutine)

# Thread safety: asyncio objects are NOT thread-safe
# Use asyncio.run_coroutine_threadsafe to call from threads
import threading

def call_from_thread(loop: asyncio.AbstractEventLoop, coro):
    future = asyncio.run_coroutine_threadsafe(coro, loop)
    return future.result(timeout=10)

# Example: background thread posting to async queue
async def main_with_thread():
    loop = asyncio.get_running_loop()
    queue: asyncio.Queue = asyncio.Queue()

    def thread_worker():
        # Thread-safe way to post to async queue
        asyncio.run_coroutine_threadsafe(queue.put("from thread"), loop)

    t = threading.Thread(target=thread_worker)
    t.start()
    item = await queue.get()
    print(f"Got: {item}")
    t.join()`}</code></pre>

      {/* Section 10: Testing async code */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        10. Testing Async Code — pytest-asyncio, anyio, AsyncMock, Event Loop Scope
      </h2>
      <p>
        Testing async code requires an async-aware test runner. <code>pytest-asyncio</code> is the standard choice;
        <code>anyio</code> is preferred for libraries that support multiple async backends (asyncio and trio).
      </p>
      <pre style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: 8, padding: 20, overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1rem' }}><code>{`# pip install pytest pytest-asyncio anyio httpx
# pytest.ini or pyproject.toml:
# [pytest]
# asyncio_mode = auto   # no need to add @pytest.mark.asyncio to every test

import pytest
import asyncio
from unittest.mock import AsyncMock, MagicMock, patch

# Basic async test
@pytest.mark.asyncio
async def test_fetch_data():
    result = await fetch_data("https://api.example.com")
    assert result["status"] == "ok"

# With asyncio_mode = auto (pytest.ini), no decorator needed:
async def test_simple():
    await asyncio.sleep(0)
    assert True

# Mocking async functions with AsyncMock
async def test_with_mock():
    mock_session = MagicMock()
    mock_response = AsyncMock()
    mock_response.json.return_value = {"id": 1, "name": "Alice"}
    mock_response.status = 200
    mock_session.get.return_value.__aenter__.return_value = mock_response

    with patch("mymodule.aiohttp.ClientSession", return_value=mock_session):
        result = await fetch_user(1)
    assert result["name"] == "Alice"

# Async fixtures
@pytest.fixture
async def db_session():
    engine = create_async_engine("postgresql+asyncpg://localhost/test_db")
    async with AsyncSessionLocal(engine) as session:
        yield session
        await session.rollback()

async def test_create_user(db_session):
    user = await create_user(db_session, "Bob", "bob@example.com")
    assert user.id is not None

# Event loop scope — share DB pool across all tests in a module
@pytest.fixture(scope="module")
async def db_pool():
    pool = await asyncpg.create_pool("postgresql://localhost/test_db")
    yield pool
    await pool.close()

# anyio — backend-agnostic testing
@pytest.mark.anyio
async def test_with_anyio():
    await asyncio.sleep(0)
    assert True

# Testing async generators
async def async_count(n: int):
    for i in range(n):
        await asyncio.sleep(0)
        yield i

async def test_async_generator():
    results = []
    async for value in async_count(5):
        results.append(value)
    assert results == [0, 1, 2, 3, 4]

# Testing timeout behavior
async def test_timeout_handling():
    with pytest.raises(asyncio.TimeoutError):
        async with asyncio.timeout(0.1):
            await asyncio.sleep(10)

# Parametrized async tests
@pytest.mark.parametrize("url,expected_status", [
    ("https://api.example.com/ok", 200),
    ("https://api.example.com/not-found", 404),
])
async def test_status_codes(url: str, expected_status: int):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            assert resp.status == expected_status`}</code></pre>

      {/* Quick Tool CTA */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: 700, color: '#15803d', margin: '0 0 0.5rem 0' }}>Quick Tool</p>
        <p style={{ margin: 0 }}>
          When debugging async API responses, use the{' '}
          <a href="https://viadreams.cc/en/tools/json-formatter" style={{ color: '#16a34a' }}>
            online JSON formatter
          </a>{' '}
          to pretty-print and validate the JSON payloads your async services send and receive.
        </p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '2rem' }}>
        <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.75rem 0' }}>Key Takeaways</p>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8' }}>
          <li><strong>Cooperative, not preemptive:</strong> coroutines must explicitly <code>await</code> to yield; CPU-bound code blocks the entire event loop.</li>
          <li><strong>One event loop per thread:</strong> use <code>asyncio.run()</code> as entry point; never call it from inside a running loop.</li>
          <li><strong>Prefer <code>for_each</code> gather/TaskGroup</strong> for concurrent I/O; sequential <code>await</code> is fine for dependent operations.</li>
          <li><strong>Never use <code>requests</code> in async code:</strong> use <code>aiohttp</code> with a shared <code>ClientSession</code> (one per app, not per request).</li>
          <li><strong>Block-safe sync code:</strong> use <code>asyncio.to_thread()</code> for I/O-bound sync, <code>ProcessPoolExecutor</code> for CPU-bound work.</li>
          <li><strong>asyncio objects are not thread-safe:</strong> use <code>asyncio.run_coroutine_threadsafe()</code> to interact from threads.</li>
          <li><strong>Semaphore for concurrency limits:</strong> prevents thundering-herd when making many concurrent requests to an external service.</li>
          <li><strong>Test with pytest-asyncio:</strong> set <code>asyncio_mode = "auto"</code> and use <code>AsyncMock</code> for mocking async dependencies.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '2rem', marginBottom: '1rem', color: '#1e293b' }}>
        Frequently Asked Questions
      </h2>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between a coroutine and a regular function?
      </h3>
      <p>
        A regular function blocks until it returns. A coroutine (<code>async def</code>) returns a coroutine
        object without executing — you must <code>await</code> it or schedule it as a Task. When a coroutine
        hits <code>await</code>, it suspends and yields control to the event loop, enabling other coroutines to
        run concurrently on the same thread.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the asyncio event loop?
      </h3>
      <p>
        A single-threaded scheduler that manages coroutines, I/O callbacks, and timers. It continuously polls for
        I/O events (via select/epoll), wakes up waiting coroutines, and runs them until the next <code>await</code>.
        CPU-bound code that never yields will block it entirely.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        When should I use gather() vs create_task()?
      </h3>
      <p>
        Use <code>asyncio.gather()</code> when you want to run multiple coroutines and collect all results —
        it waits for all to complete. Use <code>asyncio.create_task()</code> to schedule a coroutine in the
        background and await it later (or fire-and-forget). For Python 3.11+, prefer <code>TaskGroup</code> for
        structured concurrency with automatic cancellation on errors.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        Why use aiohttp instead of requests in async code?
      </h3>
      <p>
        <code>requests.get()</code> blocks the entire event loop thread — all other coroutines stall until it
        returns. <code>aiohttp</code> uses non-blocking I/O so the event loop remains free to run other
        coroutines during HTTP requests. Always reuse a single <code>ClientSession</code> per application for
        connection pool reuse.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I prevent blocking the event loop with CPU-bound code?
      </h3>
      <p>
        Use <code>await asyncio.to_thread(sync_func, *args)</code> to run synchronous code in a thread pool
        (Python 3.9+). For true CPU parallelism that bypasses the GIL, use{' '}
        <code>loop.run_in_executor(ProcessPoolExecutor(), func)</code>. Never call <code>time.sleep()</code>
        in async code — use <code>await asyncio.sleep()</code> instead.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I limit concurrency to avoid overwhelming an external service?
      </h3>
      <p>
        Use <code>asyncio.Semaphore(n)</code> — wrap each request in <code>async with sem:</code> to ensure at
        most <code>n</code> requests run simultaneously. Combine with <code>asyncio.sleep(1/rps)</code> for
        rate limiting by requests per second. The <code>tenacity</code> library adds exponential backoff retries.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        How do I test async code with pytest?
      </h3>
      <p>
        Install <code>pytest-asyncio</code> and set <code>asyncio_mode = "auto"</code> in <code>pytest.ini</code>.
        Write <code>async def test_*()</code> functions directly. Use <code>AsyncMock</code> from
        <code>unittest.mock</code> to mock async functions. Use <code>scope="module"</code> for async fixtures
        that should share state (like DB connection pools) across multiple tests.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '1.25rem', marginBottom: '0.5rem', color: '#1e293b' }}>
        What is the difference between asyncio.sleep(0) and asyncio.sleep(n)?
      </h3>
      <p>
        <code>asyncio.sleep(0)</code> yields control to the event loop for one iteration without actually
        waiting — useful to make long-running loops cooperative. <code>asyncio.sleep(n)</code> suspends the
        coroutine for <code>n</code> seconds. Never use <code>time.sleep()</code> in async code — it blocks
        the event loop thread entirely.
      </p>
    </article>
  );
}
