'use client';

const translations = {
  en: {
    title: 'Advanced Go (Golang) Guide: Concurrency, Generics, Performance & Production Patterns',
    description:
      'Deep dive into advanced Go programming: goroutines, channels, context, generics, sync primitives, memory model, pprof profiling, table-driven tests, REST APIs with Gin/Chi, GORM vs sqlx vs pgx, multi-stage Dockerfiles, and Go vs Rust vs Node.js comparison.',
  },
  zh: {
    title: 'Go (Golang) 高级指南：并发、泛型、性能与生产模式',
    description:
      '深入学习 Go 高级编程：goroutine、channel、context、泛型、sync 原语、内存模型、pprof 性能分析、表驱动测试、Gin/Chi REST API、GORM vs sqlx vs pgx、多阶段 Dockerfile，以及 Go vs Rust vs Node.js 对比。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between buffered and unbuffered channels in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unbuffered channels (make(chan T)) block the sender until a receiver is ready, and block the receiver until a sender sends — they provide synchronization. Buffered channels (make(chan T, n)) allow up to n values to be sent without a receiver being ready. Use unbuffered channels for synchronization and rendezvous, buffered for decoupling producer/consumer speeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Go context package work for cancellation and deadlines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The context package propagates cancellation signals, deadlines, and request-scoped values down a call chain. context.WithCancel returns a cancel function you must call to release resources. context.WithDeadline and context.WithTimeout automatically cancel at a specific time. Always pass context.Context as the first argument and check ctx.Err() or ctx.Done() in long-running operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Go generics work and when should I use them?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go generics (Go 1.18+) use type parameters with constraints defined by interfaces. Syntax: func Map[T, U any](s []T, f func(T) U) []U. Use generics for type-safe data structures (stacks, queues, sets), utility functions (Map, Filter, Reduce), and APIs that need to work across multiple types without code duplication. Avoid generics for simple cases where an interface suffices.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Go memory model and how do I avoid race conditions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Go memory model defines when one goroutine is guaranteed to observe writes made by another. Without synchronization (channels, sync.Mutex, sync/atomic), writes may not be visible across goroutines. Use the -race flag (go test -race) to detect data races. Prefer channels for communication and sync.Mutex for protecting shared state.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I profile a Go application with pprof?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Import net/http/pprof in your main package to expose /debug/pprof endpoints. Capture a CPU profile with: go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30. For heap profiles use /debug/pprof/heap. Analyze interactively with the pprof CLI or go tool pprof -http=:8080 for a web UI with flame graphs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between GORM, sqlx, and pgx for database access in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GORM is a full-featured ORM with associations, hooks, migrations, and auto-join — great for rapid development but adds abstraction overhead. sqlx is a thin extension over database/sql providing struct scanning and named queries while keeping raw SQL control. pgx is a native PostgreSQL driver with superior performance, full PostgreSQL type support, and connection pooling via pgxpool. Choose sqlx or pgx for performance-critical apps and GORM for CRUD-heavy admin tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write table-driven tests in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Table-driven tests define a slice of test cases (structs with input, expected output, and description), then loop over them calling t.Run for subtests. This pattern reduces repetition, makes adding new cases trivial, and provides clear failure messages. Use testify/assert for readable assertions, and run with go test -v to see each subtest name.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Go compare to Rust and Node.js for backend development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go offers the best balance: faster than Node.js with true parallelism, simpler than Rust with a garbage collector, and excellent tooling. Rust delivers maximum performance and memory safety without GC but has a steep learning curve. Node.js has the largest ecosystem and is ideal for I/O-heavy real-time apps. Choose Go for microservices, APIs, and DevOps tooling; Rust for systems programming and WebAssembly; Node.js for teams with heavy JavaScript expertise.',
      },
    },
  ],
};

export default function GolangAdvancedGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const preStyle: React.CSSProperties = {
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '24px',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.65',
    marginBottom: '24px',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginTop: '48px',
    marginBottom: '16px',
    color: '#1e293b',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '8px',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginTop: '28px',
    marginBottom: '12px',
    color: '#1e293b',
  };

  const pStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem',
    marginBottom: '24px',
  };

  const thStyle: React.CSSProperties = {
    padding: '10px 14px',
    textAlign: 'left',
    background: '#1e293b',
    color: '#f1f5f9',
    fontWeight: '600',
  };

  const tdStyle: React.CSSProperties = {
    padding: '9px 14px',
    borderBottom: '1px solid #e2e8f0',
    color: '#374151',
    verticalAlign: 'top',
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', marginBottom: '16px' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', lineHeight: '1.7', margin: '0' }}>
          {t.description}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <strong style={{ fontSize: '1rem', color: '#0369a1', display: 'block', marginBottom: '8px' }}>
          {isZh ? 'TL;DR — 60 秒速览 Go 高级特性' : 'TL;DR — Advanced Go in 60 Seconds'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c4a6e', lineHeight: '1.9' }}>
          <li>{isZh ? 'Goroutine 比 OS 线程轻量约 1000 倍；channel 是首选通信方式' : 'Goroutines are ~1000x lighter than OS threads; channels are the preferred communication mechanism'}</li>
          <li>{isZh ? 'context 包用于跨 goroutine 传播取消、超时和请求值' : 'context propagates cancellation, deadlines, and request-scoped values across goroutines'}</li>
          <li>{isZh ? 'Go 1.18+ 泛型：类型参数 + 接口约束，消除重复代码' : 'Go 1.18+ generics: type parameters + interface constraints eliminate code duplication'}</li>
          <li>{isZh ? 'sync 包：Mutex、RWMutex、WaitGroup、Once、Pool 应对共享状态' : 'sync package: Mutex, RWMutex, WaitGroup, Once, Pool for shared state'}</li>
          <li>{isZh ? 'pprof + trace 定位 CPU 热点和内存泄漏' : 'pprof + trace pinpoint CPU hotspots and memory leaks'}</li>
          <li>{isZh ? '表驱动测试 + 基准测试 + fuzz 测试是 Go 测试三件套' : 'Table-driven tests + benchmarks + fuzz testing are the Go testing trifecta'}</li>
          <li>{isZh ? '多阶段 Dockerfile 将镜像从 ~1GB 压缩到 ~20MB' : 'Multi-stage Dockerfiles shrink images from ~1GB to ~20MB'}</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <strong style={{ fontSize: '1rem', color: '#334155', display: 'block', marginBottom: '10px' }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: '1.9' }}>
          <li>{isZh ? '不要通过共享内存通信，要通过通信共享内存' : "Don't communicate by sharing memory; share memory by communicating"}</li>
          <li>{isZh ? 'errors.Is / errors.As / fmt.Errorf %w 形成完整的错误链' : 'errors.Is / errors.As / fmt.Errorf %w form a complete error wrapping chain'}</li>
          <li>{isZh ? '接口应在使用方定义，而非提供方——保持小巧' : 'Interfaces should be defined at the consumer, not the producer — keep them small'}</li>
          <li>{isZh ? 'sync.Pool 减少 GC 压力，适合高频临时对象' : 'sync.Pool reduces GC pressure for frequently allocated temporary objects'}</li>
          <li>{isZh ? 'Go 内存模型：没有同步原语就没有可见性保证' : 'Go memory model: no visibility guarantee without synchronization primitives'}</li>
          <li>{isZh ? 'go test -race 应集成到每个 CI 流水线' : 'go test -race should be in every CI pipeline'}</li>
        </ul>
      </div>

      {/* Section 1: Goroutines and Channels */}
      <h2 style={h2Style}>
        {isZh ? '1. Goroutine 与 Channel 深度解析' : '1. Goroutines and Channels: Deep Dive'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Goroutine 是 Go 并发模型的核心。它们由 Go 运行时调度，初始栈仅 2KB（可动态增长），可轻松创建数百万个。Channel 是 goroutine 间的类型化通信管道，遵循 CSP（通信顺序进程）模型。'
          : 'Goroutines are the cornerstone of Go\'s concurrency model. Managed by the Go runtime, they start with only ~2KB of stack space (growing dynamically), making it practical to run millions simultaneously. Channels are typed conduits between goroutines, following the CSP (Communicating Sequential Processes) model.'}
      </p>

      <h3 style={h3Style}>{isZh ? '无缓冲 vs 有缓冲 Channel' : 'Unbuffered vs Buffered Channels'}</h3>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\nfunc main() {\n\t// Unbuffered channel — sender blocks until receiver is ready\n\tunbuffered := make(chan int)\n\tgo func() {\n\t\tfmt.Println("Sending...")\n\t\tunbuffered <- 42 // blocks here until main() receives\n\t\tfmt.Println("Sent!")\n\t}()\n\ttime.Sleep(100 * time.Millisecond)\n\tval := <-unbuffered\n\tfmt.Println("Received:", val)\n\n\t// Buffered channel — sender only blocks when buffer is full\n\tbuffered := make(chan string, 3)\n\tbuffered <- "a" // does not block\n\tbuffered <- "b" // does not block\n\tbuffered <- "c" // does not block\n\t// buffered <- "d" // would block — buffer full\n\n\tfmt.Println(<-buffered) // a\n\tfmt.Println(<-buffered) // b\n\tfmt.Println(<-buffered) // c\n\n\t// Range over channel (close signals completion)\n\tch := make(chan int, 5)\n\tfor i := 1; i <= 5; i++ {\n\t\tch <- i\n\t}\n\tclose(ch) // must close to stop range\n\tfor v := range ch {\n\t\tfmt.Print(v, " ") // 1 2 3 4 5\n\t}\n\tfmt.Println()\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'select 语句与 Done 模式' : 'select Statement and Done Patterns'}</h3>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"fmt"\n\t"time"\n)\n\n// Fan-in: merge multiple channels into one\nfunc fanIn(ch1, ch2 <-chan string) <-chan string {\n\tout := make(chan string)\n\tgo func() {\n\t\tdefer close(out)\n\t\tfor {\n\t\t\tselect {\n\t\t\tcase v, ok := <-ch1:\n\t\t\t\tif !ok { ch1 = nil } else { out <- v }\n\t\t\tcase v, ok := <-ch2:\n\t\t\t\tif !ok { ch2 = nil } else { out <- v }\n\t\t\t}\n\t\t\tif ch1 == nil && ch2 == nil {\n\t\t\t\treturn\n\t\t\t}\n\t\t}\n\t}()\n\treturn out\n}\n\n// Done channel pattern — signal goroutines to stop\nfunc worker(done <-chan struct{}, id int) {\n\tfor {\n\t\tselect {\n\t\tcase <-done:\n\t\t\tfmt.Printf("Worker %d stopping\\n", id)\n\t\t\treturn\n\t\tdefault:\n\t\t\t// do work\n\t\t\tfmt.Printf("Worker %d working\\n", id)\n\t\t\ttime.Sleep(200 * time.Millisecond)\n\t\t}\n\t}\n}\n\nfunc main() {\n\tdone := make(chan struct{})\n\tfor i := 1; i <= 3; i++ {\n\t\tgo worker(done, i)\n\t}\n\ttime.Sleep(500 * time.Millisecond)\n\tclose(done) // broadcasts stop to ALL goroutines listening on done\n\ttime.Sleep(100 * time.Millisecond)\n\n\t// Timeout with select\n\tch := make(chan int)\n\tselect {\n\tcase v := <-ch:\n\t\tfmt.Println("Got:", v)\n\tcase <-time.After(1 * time.Second):\n\t\tfmt.Println("Timed out")\n\t}\n}'
      }</code></pre>

      {/* Section 2: Context Package */}
      <h2 style={h2Style}>
        {isZh ? '2. context 包：取消、超时与请求值' : '2. Context Package: Cancellation, Deadlines, and Values'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'context.Context 是跨 API 边界传递取消信号、截止时间和请求范围值的标准方式。它是第一个参数的惯例，几乎所有 I/O 操作、数据库查询和 HTTP 请求都应接受 context。'
          : 'context.Context is the standard mechanism for passing cancellation signals, deadlines, and request-scoped values across API boundaries. It is convention to pass it as the first argument, and virtually all I/O operations, database queries, and HTTP requests should accept a context.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"context"\n\t"database/sql"\n\t"fmt"\n\t"time"\n)\n\n// Always pass context as first argument\nfunc fetchUser(ctx context.Context, db *sql.DB, id int) (string, error) {\n\tvar name string\n\t// QueryRowContext respects cancellation/deadline\n\terr := db.QueryRowContext(ctx, "SELECT name FROM users WHERE id = $1", id).Scan(&name)\n\treturn name, err\n}\n\nfunc main() {\n\t// WithCancel — manual cancellation\n\tctx, cancel := context.WithCancel(context.Background())\n\tdefer cancel() // always defer cancel to release resources\n\n\tgo func() {\n\t\ttime.Sleep(2 * time.Second)\n\t\tcancel() // cancel from another goroutine\n\t}()\n\n\tselect {\n\tcase <-ctx.Done():\n\t\tfmt.Println("Cancelled:", ctx.Err()) // context.Canceled\n\t}\n\n\t// WithTimeout — auto-cancel after duration\n\tctxTO, cancelTO := context.WithTimeout(context.Background(), 500*time.Millisecond)\n\tdefer cancelTO()\n\n\t// Simulate slow operation\n\tresultCh := make(chan string, 1)\n\tgo func() {\n\t\ttime.Sleep(1 * time.Second) // slower than timeout\n\t\tresultCh <- "result"\n\t}()\n\n\tselect {\n\tcase r := <-resultCh:\n\t\tfmt.Println("Got:", r)\n\tcase <-ctxTO.Done():\n\t\tfmt.Println("Timeout:", ctxTO.Err()) // context.DeadlineExceeded\n\t}\n\n\t// WithDeadline — cancel at absolute time\n\tdeadline := time.Now().Add(3 * time.Second)\n\tctxDL, cancelDL := context.WithDeadline(context.Background(), deadline)\n\tdefer cancelDL()\n\tfmt.Println("Deadline set at:", deadline)\n\tfmt.Println("Time remaining:", time.Until(ctxDL.Deadline()))\n\n\t// WithValue — attach request-scoped data (use typed keys!)\n\ttype contextKey string\n\tconst userIDKey contextKey = "userID"\n\n\tctxVal := context.WithValue(context.Background(), userIDKey, 42)\n\tuserID := ctxVal.Value(userIDKey).(int)\n\tfmt.Println("User ID from context:", userID)\n}'
      }</code></pre>

      {/* Section 3: Interface Design and Embedding */}
      <h2 style={h2Style}>
        {isZh ? '3. 接口设计与嵌入' : '3. Interface Design and Embedding'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 接口是隐式满足的——类型无需声明它实现了某接口，只要方法签名匹配即可。最佳实践是在消费方定义小接口，而非在提供方定义大接口。接口嵌入可组合多个接口。'
          : 'Go interfaces are satisfied implicitly — a type need not declare that it implements an interface; method signature matching is sufficient. Best practice is to define small interfaces at the consumer, not large interfaces at the producer. Interface embedding composes multiple interfaces.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"strings"\n)\n\n// Small, focused interfaces (the Go way)\ntype Reader interface {\n\tRead(p []byte) (n int, err error)\n}\n\ntype Writer interface {\n\tWrite(p []byte) (n int, err error)\n}\n\n// Embedding composes interfaces\ntype ReadWriter interface {\n\tReader\n\tWriter\n}\n\n// Stringer is satisfied by any type with a String() string method\ntype Stringer interface {\n\tString() string\n}\n\n// Define interfaces at the point of use\ntype UserStore interface {\n\tGetUser(id int) (User, error)\n\tCreateUser(u User) error\n}\n\ntype User struct {\n\tID   int\n\tName string\n\tEmail string\n}\n\n// Concrete implementation\ntype PostgresUserStore struct {\n\t// db *sql.DB\n}\n\nfunc (s *PostgresUserStore) GetUser(id int) (User, error) {\n\t// real DB query here\n\treturn User{ID: id, Name: "Alice", Email: "alice@example.com"}, nil\n}\n\nfunc (s *PostgresUserStore) CreateUser(u User) error {\n\t// real DB insert here\n\treturn nil\n}\n\n// Function accepts interface, not concrete type\nfunc printUser(store UserStore, id int) {\n\tu, err := store.GetUser(id)\n\tif err != nil {\n\t\tfmt.Println("Error:", err)\n\t\treturn\n\t}\n\tfmt.Printf("User: %+v\\n", u)\n}\n\n// Type assertion and type switch\nfunc describe(i interface{}) {\n\tswitch v := i.(type) {\n\tcase int:\n\t\tfmt.Printf("int: %d\\n", v)\n\tcase string:\n\t\tfmt.Printf("string: %q\\n", v)\n\tcase Stringer:\n\t\tfmt.Printf("Stringer: %s\\n", v.String())\n\tdefault:\n\t\tfmt.Printf("unknown: %T\\n", v)\n\t}\n}\n\nfunc main() {\n\tstore := &PostgresUserStore{}\n\tprintUser(store, 1)\n\n\t// Interface value holding *strings.Reader satisfies io.ReadWriter\n\tvar rw io.ReadWriter = strings.NewReader("hello")\n\t_ = rw\n\n\tdescribe(42)\n\tdescribe("hello")\n}'
      }</code></pre>

      {/* Section 4: Error Wrapping */}
      <h2 style={h2Style}>
        {isZh ? '4. 错误包装：fmt.Errorf %w、errors.Is、errors.As' : '4. Error Wrapping: fmt.Errorf %w, errors.Is, errors.As'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 1.13 引入了标准错误包装机制。fmt.Errorf 使用 %w 谓词包装错误并保留错误链。errors.Is 检查链中是否存在特定错误值，errors.As 提取链中特定类型的错误。'
          : 'Go 1.13 introduced the standard error wrapping mechanism. fmt.Errorf with the %w verb wraps errors while preserving the chain. errors.Is checks if a specific error value exists in the chain; errors.As extracts an error of a specific type from the chain.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"errors"\n\t"fmt"\n)\n\n// Sentinel errors — compare with errors.Is\nvar (\n\tErrNotFound   = errors.New("not found")\n\tErrPermission = errors.New("permission denied")\n\tErrDatabase   = errors.New("database error")\n)\n\n// Custom error type for structured errors\ntype ValidationError struct {\n\tField   string\n\tMessage string\n}\n\nfunc (e *ValidationError) Error() string {\n\treturn fmt.Sprintf("validation error: %s — %s", e.Field, e.Message)\n}\n\nfunc getUser(id int) (string, error) {\n\tif id <= 0 {\n\t\t// Wrap with context using %w\n\t\treturn "", fmt.Errorf("getUser: invalid id %d: %w", id, ErrNotFound)\n\t}\n\tif id == 999 {\n\t\tdbErr := fmt.Errorf("connection refused")\n\t\treturn "", fmt.Errorf("getUser: DB query failed: %w", fmt.Errorf("%w: %w", ErrDatabase, dbErr))\n\t}\n\treturn "Alice", nil\n}\n\nfunc updateUser(id int, name string) error {\n\tif len(name) == 0 {\n\t\treturn &ValidationError{Field: "name", Message: "cannot be empty"}\n\t}\n\tif id <= 0 {\n\t\treturn fmt.Errorf("updateUser: %w", ErrPermission)\n\t}\n\treturn nil\n}\n\nfunc main() {\n\t// errors.Is — checks the entire error chain\n\t_, err := getUser(-1)\n\tif errors.Is(err, ErrNotFound) {\n\t\tfmt.Println("Not found:", err)\n\t}\n\n\t_, err = getUser(999)\n\tif errors.Is(err, ErrDatabase) {\n\t\tfmt.Println("Database issue:", err)\n\t}\n\n\t// errors.As — extract concrete type from chain\n\terr = updateUser(1, "")\n\tvar valErr *ValidationError\n\tif errors.As(err, &valErr) {\n\t\tfmt.Printf("Field: %s, Message: %s\\n", valErr.Field, valErr.Message)\n\t}\n\n\terr = updateUser(-1, "Alice")\n\tif errors.Is(err, ErrPermission) {\n\t\tfmt.Println("Permission denied:", err)\n\t}\n\n\t// Unwrap manually\n\twrapped := fmt.Errorf("outer: %w", fmt.Errorf("inner: %w", ErrNotFound))\n\tfmt.Println("Unwrap chain:", errors.Unwrap(errors.Unwrap(wrapped)))\n}'
      }</code></pre>

      {/* Section 5: Generics */}
      <h2 style={h2Style}>
        {isZh ? '5. Go 1.18+ 泛型：类型参数与约束' : '5. Generics in Go 1.18+: Type Parameters and Constraints'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '泛型允许编写可在多种类型上工作的类型安全代码，无需重复。类型参数用方括号声明，约束用接口定义。golang.org/x/exp/constraints 提供常用约束，如 Ordered、Integer 等。'
          : 'Generics allow writing type-safe code that works across multiple types without duplication. Type parameters are declared in square brackets, and constraints are defined using interfaces. The golang.org/x/exp/constraints package provides common constraints like Ordered and Integer.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"fmt"\n)\n\n// Constraint: any type that supports < and >\ntype Ordered interface {\n\t~int | ~int8 | ~int16 | ~int32 | ~int64 |\n\t\t~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |\n\t\t~float32 | ~float64 | ~string\n}\n\n// Generic function with type parameter T constrained to Ordered\nfunc Min[T Ordered](a, b T) T {\n\tif a < b {\n\t\treturn a\n\t}\n\treturn b\n}\n\nfunc Max[T Ordered](a, b T) T {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}\n\n// Map, Filter, Reduce — generic functional utilities\nfunc Map[T, U any](s []T, f func(T) U) []U {\n\tresult := make([]U, len(s))\n\tfor i, v := range s {\n\t\tresult[i] = f(v)\n\t}\n\treturn result\n}\n\nfunc Filter[T any](s []T, pred func(T) bool) []T {\n\tvar result []T\n\tfor _, v := range s {\n\t\tif pred(v) {\n\t\t\tresult = append(result, v)\n\t\t}\n\t}\n\treturn result\n}\n\nfunc Reduce[T, U any](s []T, init U, f func(U, T) U) U {\n\tacc := init\n\tfor _, v := range s {\n\t\tacc = f(acc, v)\n\t}\n\treturn acc\n}\n\n// Generic Stack data structure\ntype Stack[T any] struct {\n\titems []T\n}\n\nfunc (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }\nfunc (s *Stack[T]) Pop() (T, bool) {\n\tif len(s.items) == 0 {\n\t\tvar zero T\n\t\treturn zero, false\n\t}\n\tv := s.items[len(s.items)-1]\n\ts.items = s.items[:len(s.items)-1]\n\treturn v, true\n}\nfunc (s *Stack[T]) Len() int { return len(s.items) }\n\n// Generic Set\ntype Set[T comparable] map[T]struct{}\n\nfunc NewSet[T comparable](items ...T) Set[T] {\n\ts := make(Set[T])\n\tfor _, item := range items {\n\t\ts[item] = struct{}{}\n\t}\n\treturn s\n}\nfunc (s Set[T]) Contains(v T) bool { _, ok := s[v]; return ok }\nfunc (s Set[T]) Add(v T) { s[v] = struct{}{} }\n\nfunc main() {\n\tfmt.Println(Min(3, 5))        // 3\n\tfmt.Println(Min("apple", "banana")) // apple\n\tfmt.Println(Max(3.14, 2.71)) // 3.14\n\n\tnums := []int{1, 2, 3, 4, 5}\n\tdoubled := Map(nums, func(n int) int { return n * 2 })\n\tfmt.Println(doubled) // [2 4 6 8 10]\n\n\tevens := Filter(nums, func(n int) bool { return n%2 == 0 })\n\tfmt.Println(evens) // [2 4]\n\n\tsum := Reduce(nums, 0, func(acc, n int) int { return acc + n })\n\tfmt.Println(sum) // 15\n\n\tvar s Stack[string]\n\ts.Push("a")\n\ts.Push("b")\n\tv, _ := s.Pop()\n\tfmt.Println(v, s.Len()) // b 1\n\n\tset := NewSet("go", "rust", "python")\n\tfmt.Println(set.Contains("go"))   // true\n\tfmt.Println(set.Contains("java")) // false\n}'
      }</code></pre>

      {/* Section 6: sync Package */}
      <h2 style={h2Style}>
        {isZh ? '6. sync 包：Mutex、RWMutex、WaitGroup、Once、Pool' : '6. sync Package: Mutex, RWMutex, WaitGroup, Once, Pool'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'sync 包提供低级同步原语。当共享状态无法用 channel 优雅表达时使用 Mutex。RWMutex 允许多个并发读但独占写。WaitGroup 等待一组 goroutine 完成。Once 确保初始化只执行一次。Pool 缓存对象以减少 GC 压力。'
          : 'The sync package provides low-level synchronization primitives. Use Mutex when shared state cannot be elegantly expressed with channels. RWMutex allows multiple concurrent reads but exclusive writes. WaitGroup waits for a set of goroutines to finish. Once ensures initialization runs exactly once. Pool caches objects to reduce GC pressure.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"sync/atomic"\n)\n\n// Mutex — protect shared state\ntype SafeCounter struct {\n\tmu sync.Mutex\n\tcount int\n}\n\nfunc (c *SafeCounter) Increment() {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\tc.count++\n}\n\nfunc (c *SafeCounter) Value() int {\n\tc.mu.Lock()\n\tdefer c.mu.Unlock()\n\treturn c.count\n}\n\n// RWMutex — multiple concurrent readers, one exclusive writer\ntype Cache struct {\n\tmu   sync.RWMutex\n\tdata map[string]string\n}\n\nfunc (c *Cache) Get(key string) (string, bool) {\n\tc.mu.RLock() // multiple goroutines can hold RLock simultaneously\n\tdefer c.mu.RUnlock()\n\tv, ok := c.data[key]\n\treturn v, ok\n}\n\nfunc (c *Cache) Set(key, val string) {\n\tc.mu.Lock() // exclusive lock — no readers while writing\n\tdefer c.mu.Unlock()\n\tc.data[key] = val\n}\n\n// WaitGroup — wait for all goroutines to finish\nfunc processItems(items []string) {\n\tvar wg sync.WaitGroup\n\tfor _, item := range items {\n\t\twg.Add(1)\n\t\tgo func(i string) {\n\t\t\tdefer wg.Done()\n\t\t\tfmt.Println("Processing:", i)\n\t\t}(item)\n\t}\n\twg.Wait() // blocks until all Done() calls\n\tfmt.Println("All items processed")\n}\n\n// Once — singleton initialization\nvar (\n\tinstance *Cache\n\tonce     sync.Once\n)\n\nfunc GetCache() *Cache {\n\tonce.Do(func() {\n\t\tinstance = &Cache{data: make(map[string]string)}\n\t\tfmt.Println("Cache initialized once")\n\t})\n\treturn instance\n}\n\n// Pool — reuse objects, reduce allocations\nvar bufPool = sync.Pool{\n\tNew: func() interface{} {\n\t\treturn make([]byte, 0, 1024) // allocate 1KB buffer\n\t},\n}\n\nfunc processRequest(data string) {\n\tbuf := bufPool.Get().([]byte)\n\tdefer bufPool.Put(buf[:0]) // reset slice length before returning\n\tbuf = append(buf, data...)\n\tfmt.Printf("Processed %d bytes\\n", len(buf))\n}\n\n// Atomic operations — lock-free for simple counters\nvar atomicCounter int64\n\nfunc incrementAtomic() {\n\tatomic.AddInt64(&atomicCounter, 1)\n}\n\nfunc main() {\n\tc := &SafeCounter{}\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 1000; i++ {\n\t\twg.Add(1)\n\t\tgo func() {\n\t\t\tdefer wg.Done()\n\t\t\tc.Increment()\n\t\t}()\n\t}\n\twg.Wait()\n\tfmt.Println("Counter:", c.Value()) // always 1000\n\n\tcache := GetCache()\n\tcache.Set("user:1", "Alice")\n\tv, _ := cache.Get("user:1")\n\tfmt.Println("Cached:", v)\n\n\tprocessItems([]string{"a", "b", "c", "d"})\n\tprocessRequest("hello world")\n\n\tfor i := 0; i < 100; i++ {\n\t\twg.Add(1)\n\t\tgo func() { defer wg.Done(); incrementAtomic() }()\n\t}\n\twg.Wait()\n\tfmt.Println("Atomic counter:", atomic.LoadInt64(&atomicCounter))\n}'
      }</code></pre>

      {/* Section 7: Memory Model and Race Conditions */}
      <h2 style={h2Style}>
        {isZh ? '7. Go 内存模型与竞态条件' : '7. Go Memory Model and Race Conditions'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 内存模型定义了在 goroutine 之间何时能保证观察到写入。没有同步原语，两个 goroutine 对同一变量的并发读写就是数据竞争（data race），结果未定义。使用 go test -race 或 go build -race 启用竞态检测器。'
          : 'The Go memory model defines when a goroutine is guaranteed to observe writes made by another goroutine. Without synchronization primitives, concurrent reads and writes to the same variable constitute a data race with undefined behavior. Use go test -race or go build -race to enable the race detector.'}
      </p>
      <pre style={preStyle}><code>{
'// DATA RACE — DO NOT DO THIS\n// var counter int\n// for i := 0; i < 1000; i++ {\n//   go func() { counter++ }() // race: concurrent writes!\n// }\n\n// Fix 1: Use a Mutex\n// Fix 2: Use atomic operations\n// Fix 3: Use a channel\n\npackage main\n\nimport (\n\t"fmt"\n\t"sync"\n\t"sync/atomic"\n)\n\n// Happens-before relationship examples:\n// 1. Channel send happens-before the corresponding channel receive\n// 2. sync.Mutex.Lock() happens-before the corresponding Unlock()\n// 3. sync.WaitGroup.Done() happens-before Wait() returns\n\n// Channel as synchronization (no mutex needed)\nfunc safeWithChannel() {\n\tch := make(chan int, 1)\n\tvar data int\n\n\t// Writer goroutine\n\tgo func() {\n\t\tdata = 42 // write\n\t\tch <- 1   // signal: write is complete\n\t}()\n\n\t<-ch // receive happens-after send, so data=42 is visible\n\tfmt.Println("Data:", data)\n}\n\n// Detecting races: build/test with -race flag\n// go build -race ./...\n// go test -race ./...\n\n// sync/atomic for simple lock-free counters\ntype AtomicCounter struct {\n\tn int64\n}\n\nfunc (c *AtomicCounter) Inc()        { atomic.AddInt64(&c.n, 1) }\nfunc (c *AtomicCounter) Load() int64 { return atomic.LoadInt64(&c.n) }\nfunc (c *AtomicCounter) Store(v int64) { atomic.StoreInt64(&c.n, v) }\nfunc (c *AtomicCounter) CAS(old, new int64) bool {\n\treturn atomic.CompareAndSwapInt64(&c.n, old, new)\n}\n\n// Double-checked locking with sync.Once (correct pattern)\nvar (\n\tdbInstance *DatabaseClient\n\tdbOnce     sync.Once\n)\n\ntype DatabaseClient struct{ url string }\n\nfunc GetDB(url string) *DatabaseClient {\n\tdbOnce.Do(func() {\n\t\tdbInstance = &DatabaseClient{url: url}\n\t})\n\treturn dbInstance\n}\n\nfunc main() {\n\tsafeWithChannel()\n\n\tvar c AtomicCounter\n\tvar wg sync.WaitGroup\n\tfor i := 0; i < 10000; i++ {\n\t\twg.Add(1)\n\t\tgo func() { defer wg.Done(); c.Inc() }()\n\t}\n\twg.Wait()\n\tfmt.Println("Atomic count:", c.Load()) // always 10000\n\n\tdb1 := GetDB("postgres://localhost/mydb")\n\tdb2 := GetDB("postgres://other/db") // ignored — Once already ran\n\tfmt.Println("Same instance:", db1 == db2) // true\n}'
      }</code></pre>

      {/* Section 8: Profiling with pprof */}
      <h2 style={h2Style}>
        {isZh ? '8. 性能分析：pprof 与 trace' : '8. Profiling Go Apps: pprof and trace'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 内置了强大的性能分析工具。net/http/pprof 通过 HTTP 端点暴露 CPU、内存、goroutine 等剖析数据。runtime/pprof 可在代码中直接写入剖析文件。go tool trace 提供更细粒度的执行跟踪。'
          : 'Go has powerful built-in profiling tools. net/http/pprof exposes CPU, memory, goroutine, and other profiles via HTTP endpoints. runtime/pprof writes profiles programmatically. go tool trace provides fine-grained execution tracing with goroutine scheduling visibility.'}
      </p>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"log"\n\t"net/http"\n\t_ "net/http/pprof" // blank import registers /debug/pprof handlers\n\t"os"\n\t"runtime"\n\t"runtime/pprof"\n\t"runtime/trace"\n)\n\nfunc main() {\n\t// --- HTTP pprof server (for long-running services) ---\n\t// Simply import net/http/pprof and start an HTTP server\n\tgo func() {\n\t\tlog.Println(http.ListenAndServe("localhost:6060", nil))\n\t}()\n\t// Then capture profiles:\n\t// CPU:  go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30\n\t// Heap: go tool pprof http://localhost:6060/debug/pprof/heap\n\t// Goroutines: http://localhost:6060/debug/pprof/goroutine?debug=2\n\t// Web UI: go tool pprof -http=:8080 profile.pb.gz\n\n\t// --- File-based CPU profile (for CLI tools / benchmarks) ---\n\tcpuFile, _ := os.Create("cpu.prof")\n\tdefer cpuFile.Close()\n\tpprof.StartCPUProfile(cpuFile)\n\tdefer pprof.StopCPUProfile()\n\n\t// --- Heap profile at program exit ---\n\tdefer func() {\n\t\theapFile, _ := os.Create("heap.prof")\n\t\tdefer heapFile.Close()\n\t\truntime.GC() // force GC before heap snapshot\n\t\tpprof.WriteHeapProfile(heapFile)\n\t}()\n\n\t// --- Execution trace ---\n\ttraceFile, _ := os.Create("trace.out")\n\tdefer traceFile.Close()\n\ttrace.Start(traceFile)\n\tdefer trace.Stop()\n\t// Analyze: go tool trace trace.out\n\n\t// --- Memory stats ---\n\tvar stats runtime.MemStats\n\truntime.ReadMemStats(&stats)\n\tlog.Printf("Alloc: %v MiB", stats.Alloc/1024/1024)\n\tlog.Printf("TotalAlloc: %v MiB", stats.TotalAlloc/1024/1024)\n\tlog.Printf("Sys: %v MiB", stats.Sys/1024/1024)\n\tlog.Printf("NumGC: %v", stats.NumGC)\n\t// your application logic here...\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'pprof 命令速查' : 'pprof Command Reference'}</h3>
      <pre style={preStyle}><code>{
'# Capture 30-second CPU profile from running service\ngo tool pprof http://localhost:6060/debug/pprof/profile?seconds=30\n\n# Capture heap profile\ngo tool pprof http://localhost:6060/debug/pprof/heap\n\n# Open interactive web UI with flame graphs\ngo tool pprof -http=:8080 cpu.prof\n\n# Analyze profile in CLI\n(pprof) top10        # top 10 functions by CPU time\n(pprof) top10 -cum   # top 10 by cumulative time\n(pprof) list main.   # show line-by-line for main package\n(pprof) web          # open SVG in browser\n(pprof) pdf          # export to PDF\n\n# Run benchmarks with profiling\ngo test -bench=BenchmarkMyFunc -cpuprofile=cpu.prof -memprofile=mem.prof\ngo tool pprof -http=:8080 cpu.prof\n\n# Execution trace\ngo test -trace=trace.out\ngo tool trace trace.out\n\n# Check for goroutine leaks\ncurl http://localhost:6060/debug/pprof/goroutine?debug=2'
      }</code></pre>

      {/* Section 9: Testing Patterns */}
      <h2 style={h2Style}>
        {isZh ? '9. Go 测试模式：表驱动测试、基准测试、Fuzz 测试' : '9. Go Testing Patterns: Table-Driven Tests, Benchmarks, Fuzz Testing'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 的 testing 包内置支持单元测试、基准测试和（1.18+）模糊测试。表驱动测试是 Go 惯用法，通过定义测试用例切片并用 t.Run 运行子测试。基准测试用 testing.B 测量性能。Fuzz 测试自动生成输入发现边界情况。'
          : 'Go\'s testing package natively supports unit tests, benchmarks, and (1.18+) fuzz tests. Table-driven testing is idiomatic Go: define a slice of test cases and run subtests with t.Run. Benchmarks measure performance with testing.B. Fuzz testing auto-generates inputs to discover edge cases.'}
      </p>
      <pre style={preStyle}><code>{
'package calculator_test\n\nimport (\n\t"testing"\n\t"errors"\n)\n\nfunc Divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("division by zero")\n\t}\n\treturn a / b, nil\n}\n\n// Table-driven tests\nfunc TestDivide(t *testing.T) {\n\tt.Parallel() // run in parallel with other tests\n\n\ttests := []struct {\n\t\tname    string\n\t\ta, b    float64\n\t\twant    float64\n\t\twantErr bool\n\t}{\n\t\t{name: "basic division", a: 10, b: 2, want: 5},\n\t\t{name: "negative numbers", a: -6, b: 3, want: -2},\n\t\t{name: "float result", a: 1, b: 3, want: 0.3333333333333333},\n\t\t{name: "divide by zero", a: 5, b: 0, wantErr: true},\n\t\t{name: "zero numerator", a: 0, b: 5, want: 0},\n\t}\n\n\tfor _, tt := range tests {\n\t\ttt := tt // capture range variable for t.Parallel()\n\t\tt.Run(tt.name, func(t *testing.T) {\n\t\t\tt.Parallel()\n\t\t\tgot, err := Divide(tt.a, tt.b)\n\t\t\tif (err != nil) != tt.wantErr {\n\t\t\t\tt.Errorf("Divide(%v, %v) error = %v, wantErr %v", tt.a, tt.b, err, tt.wantErr)\n\t\t\t\treturn\n\t\t\t}\n\t\t\tif !tt.wantErr && got != tt.want {\n\t\t\t\tt.Errorf("Divide(%v, %v) = %v, want %v", tt.a, tt.b, got, tt.want)\n\t\t\t}\n\t\t})\n\t}\n}\n\n// Benchmark\nfunc BenchmarkDivide(b *testing.B) {\n\tb.ReportAllocs() // report memory allocations\n\tfor i := 0; i < b.N; i++ {\n\t\t_, err := Divide(1000, 7)\n\t\tif err != nil {\n\t\t\tb.Fatal(err)\n\t\t}\n\t}\n}\n\n// Fuzz test (Go 1.18+)\nfunc FuzzDivide(f *testing.F) {\n\t// Seed corpus\n\tf.Add(10.0, 2.0)\n\tf.Add(-5.0, 3.0)\n\tf.Add(0.0, 1.0)\n\n\tf.Fuzz(func(t *testing.T, a, b float64) {\n\t\t// Invariant: if b != 0, result * b should approximate a\n\t\tresult, err := Divide(a, b)\n\t\tif b == 0 {\n\t\t\tif err == nil {\n\t\t\t\tt.Errorf("expected error when dividing by zero")\n\t\t\t}\n\t\t\treturn\n\t\t}\n\t\tif err != nil {\n\t\t\tt.Errorf("unexpected error: %v", err)\n\t\t}\n\t\t_ = result\n\t})\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? '测试辅助工具与模拟' : 'Test Helpers and Mocking'}</h3>
      <pre style={preStyle}><code>{
'package main\n\nimport (\n\t"net/http"\n\t"net/http/httptest"\n\t"testing"\n\t"encoding/json"\n)\n\n// Mock interface for testing\ntype MockUserStore struct {\n\tusers map[int]string\n}\n\nfunc (m *MockUserStore) GetUser(id int) (string, error) {\n\tif name, ok := m.users[id]; ok {\n\t\treturn name, nil\n\t}\n\treturn "", errors.New("not found")\n}\n\n// httptest — test HTTP handlers without starting a server\nfunc TestUserHandler(t *testing.T) {\n\thandler := func(w http.ResponseWriter, r *http.Request) {\n\t\tw.Header().Set("Content-Type", "application/json")\n\t\tjson.NewEncoder(w).Encode(map[string]string{"name": "Alice"})\n\t}\n\n\treq := httptest.NewRequest(http.MethodGet, "/users/1", nil)\n\trec := httptest.NewRecorder()\n\n\thandler(rec, req)\n\n\tif rec.Code != http.StatusOK {\n\t\tt.Errorf("expected 200, got %d", rec.Code)\n\t}\n\n\tvar body map[string]string\n\tjson.NewDecoder(rec.Body).Decode(&body)\n\tif body["name"] != "Alice" {\n\t\tt.Errorf("expected Alice, got %s", body["name"])\n\t}\n}\n\n// TestMain for setup/teardown\nfunc TestMain(m *testing.M) {\n\t// Setup: start DB, seed data, etc.\n\tsetupTestDB()\n\n\t// Run tests\n\texitCode := m.Run()\n\n\t// Teardown\n\tteardownTestDB()\n\tos.Exit(exitCode)\n}'
      }</code></pre>

      {/* Section 10: REST APIs */}
      <h2 style={h2Style}>
        {isZh ? '10. 用 Gin / Chi / Echo 构建 REST API' : '10. Building REST APIs with Gin, Chi, and Echo'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 生态有多个优秀的 HTTP 框架。Gin 是最流行的高性能框架，内置路由、中间件、JSON 绑定和验证。Chi 是轻量级路由器，兼容标准 net/http。Echo 提供类似 Gin 的 API，性能出色。标准库 net/http 本身已足够用于简单场景。'
          : 'The Go ecosystem has several excellent HTTP frameworks. Gin is the most popular high-performance framework with built-in routing, middleware, JSON binding, and validation. Chi is a lightweight router compatible with standard net/http. Echo offers a Gin-like API with excellent performance. The standard net/http is sufficient for simple use cases.'}
      </p>
      <pre style={preStyle}><code>{
'// go get github.com/gin-gonic/gin\npackage main\n\nimport (\n\t"net/http"\n\t"strconv"\n\n\t"github.com/gin-gonic/gin"\n)\n\ntype User struct {\n\tID    int    `json:"id"`\n\tName  string `json:"name" binding:"required,min=2,max=50"`\n\tEmail string `json:"email" binding:"required,email"`\n}\n\ntype UserService struct {\n\tusers map[int]User\n\tnextID int\n}\n\nfunc NewUserService() *UserService {\n\treturn &UserService{users: make(map[int]User), nextID: 1}\n}\n\nfunc main() {\n\tr := gin.Default() // includes Logger and Recovery middleware\n\tsvc := NewUserService()\n\n\t// Middleware\n\tr.Use(func(c *gin.Context) {\n\t\tc.Header("X-Request-ID", "req-123")\n\t\tc.Next()\n\t})\n\n\tv1 := r.Group("/api/v1")\n\t{\n\t\tv1.GET("/users", func(c *gin.Context) {\n\t\t\t// Query params\n\t\t\tpage, _ := strconv.Atoi(c.DefaultQuery("page", "1"))\n\t\t\tlimit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))\n\t\t\t_ = page\n\t\t\t_ = limit\n\n\t\t\tvar users []User\n\t\t\tfor _, u := range svc.users {\n\t\t\t\tusers = append(users, u)\n\t\t\t}\n\t\t\tc.JSON(http.StatusOK, gin.H{"data": users, "total": len(users)})\n\t\t})\n\n\t\tv1.GET("/users/:id", func(c *gin.Context) {\n\t\t\tid, err := strconv.Atoi(c.Param("id"))\n\t\t\tif err != nil {\n\t\t\t\tc.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})\n\t\t\t\treturn\n\t\t\t}\n\t\t\tuser, ok := svc.users[id]\n\t\t\tif !ok {\n\t\t\t\tc.JSON(http.StatusNotFound, gin.H{"error": "user not found"})\n\t\t\t\treturn\n\t\t\t}\n\t\t\tc.JSON(http.StatusOK, user)\n\t\t})\n\n\t\tv1.POST("/users", func(c *gin.Context) {\n\t\t\tvar u User\n\t\t\t// ShouldBindJSON validates based on struct tags\n\t\t\tif err := c.ShouldBindJSON(&u); err != nil {\n\t\t\t\tc.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})\n\t\t\t\treturn\n\t\t\t}\n\t\t\tu.ID = svc.nextID\n\t\t\tsvc.nextID++\n\t\t\tsvc.users[u.ID] = u\n\t\t\tc.JSON(http.StatusCreated, u)\n\t\t})\n\n\t\tv1.DELETE("/users/:id", func(c *gin.Context) {\n\t\t\tid, _ := strconv.Atoi(c.Param("id"))\n\t\t\tdelete(svc.users, id)\n\t\t\tc.Status(http.StatusNoContent)\n\t\t})\n\t}\n\n\tr.Run(":8080") // listen on :8080\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'Chi 路由器示例（兼容 net/http）' : 'Chi Router Example (net/http Compatible)'}</h3>
      <pre style={preStyle}><code>{
'// go get github.com/go-chi/chi/v5\npackage main\n\nimport (\n\t"encoding/json"\n\t"net/http"\n\n\t"github.com/go-chi/chi/v5"\n\t"github.com/go-chi/chi/v5/middleware"\n)\n\nfunc main() {\n\tr := chi.NewRouter()\n\n\t// Standard middleware\n\tr.Use(middleware.RequestID)\n\tr.Use(middleware.RealIP)\n\tr.Use(middleware.Logger)\n\tr.Use(middleware.Recoverer)\n\tr.Use(middleware.Compress(5))\n\n\tr.Route("/api/v1", func(r chi.Router) {\n\t\tr.Route("/users", func(r chi.Router) {\n\t\t\tr.Get("/", listUsers)\n\t\t\tr.Post("/", createUser)\n\n\t\t\t// URL parameters with chi.URLParam\n\t\t\tr.Route("/{id}", func(r chi.Router) {\n\t\t\t\tr.Get("/", getUser)\n\t\t\t\tr.Put("/", updateUser)\n\t\t\t\tr.Delete("/", deleteUser)\n\t\t\t})\n\t\t})\n\t})\n\n\thttp.ListenAndServe(":8080", r)\n}\n\nfunc listUsers(w http.ResponseWriter, r *http.Request) {\n\tw.Header().Set("Content-Type", "application/json")\n\tjson.NewEncoder(w).Encode([]map[string]string{{"id": "1", "name": "Alice"}})\n}\n\nfunc createUser(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusCreated)\n\tjson.NewEncoder(w).Encode(map[string]string{"status": "created"})\n}\n\nfunc getUser(w http.ResponseWriter, r *http.Request) {\n\tid := chi.URLParam(r, "id")\n\tjson.NewEncoder(w).Encode(map[string]string{"id": id})\n}\n\nfunc updateUser(w http.ResponseWriter, r *http.Request) {\n\tjson.NewEncoder(w).Encode(map[string]string{"status": "updated"})\n}\n\nfunc deleteUser(w http.ResponseWriter, r *http.Request) {\n\tw.WriteHeader(http.StatusNoContent)\n}'
      }</code></pre>

      {/* Section 11: Database */}
      <h2 style={h2Style}>
        {isZh ? '11. 数据库：GORM vs sqlx vs pgx 对比' : '11. Database: GORM vs sqlx vs pgx'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '三个库各有侧重：GORM 是全功能 ORM，适合快速开发和 CRUD；sqlx 是 database/sql 的薄封装，保留 SQL 控制权；pgx 是原生 PostgreSQL 驱动，性能最佳，支持所有 PG 特有类型。'
          : 'Each library has a distinct focus: GORM is a full-featured ORM ideal for rapid development; sqlx is a thin wrapper over database/sql preserving SQL control; pgx is a native PostgreSQL driver delivering the best performance with full PG type support.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'GORM — 全功能 ORM' : 'GORM — Full-Featured ORM'}</h3>
      <pre style={preStyle}><code>{
'// go get gorm.io/gorm gorm.io/driver/postgres\npackage main\n\nimport (\n\t"gorm.io/driver/postgres"\n\t"gorm.io/gorm"\n\t"gorm.io/gorm/logger"\n\t"time"\n)\n\ntype User struct {\n\tgorm.Model // embeds ID, CreatedAt, UpdatedAt, DeletedAt\n\tName  string `gorm:"not null;size:100"`\n\tEmail string `gorm:"uniqueIndex;not null"`\n\tAge   int\n\tPosts []Post `gorm:"foreignKey:UserID"`\n}\n\ntype Post struct {\n\tgorm.Model\n\tTitle   string `gorm:"not null"`\n\tContent string `gorm:"type:text"`\n\tUserID  uint\n}\n\nfunc main() {\n\tdsn := "host=localhost user=postgres password=secret dbname=myapp port=5432"\n\tdb, err := gorm.Open(postgres.Open(dsn), &gorm.Config{\n\t\tLogger: logger.Default.LogMode(logger.Info),\n\t})\n\tif err != nil {\n\t\tpanic("failed to connect to database")\n\t}\n\n\t// Auto-migrate\n\tdb.AutoMigrate(&User{}, &Post{})\n\n\t// Create\n\tuser := User{Name: "Alice", Email: "alice@example.com", Age: 30}\n\tresult := db.Create(&user)\n\tif result.Error != nil {\n\t\tpanic(result.Error)\n\t}\n\n\t// Read with associations\n\tvar u User\n\tdb.Preload("Posts").First(&u, user.ID)\n\n\t// Update\n\tdb.Model(&u).Updates(User{Name: "Alice Smith", Age: 31})\n\t// Or update specific field\n\tdb.Model(&u).Update("email", "alice.smith@example.com")\n\n\t// Delete (soft delete with gorm.Model)\n\tdb.Delete(&u)\n\t// Hard delete\n\tdb.Unscoped().Delete(&u)\n\n\t// Find with conditions\n\tvar users []User\n\tdb.Where("age > ?", 25).\n\t\tOrder("name ASC").\n\t\tLimit(10).\n\t\tOffset(0).\n\t\tFind(&users)\n\n\t// Raw SQL\n\tdb.Raw("SELECT id, name FROM users WHERE email = ?", "alice@example.com").Scan(&u)\n\n\t// Transaction\n\tdb.Transaction(func(tx *gorm.DB) error {\n\t\tif err := tx.Create(&User{Name: "Bob", Email: "bob@example.com"}).Error; err != nil {\n\t\t\treturn err // rollback\n\t\t}\n\t\treturn nil // commit\n\t})\n\n\t// Connection pool\n\tsqlDB, _ := db.DB()\n\tsqlDB.SetMaxIdleConns(10)\n\tsqlDB.SetMaxOpenConns(100)\n\tsqlDB.SetConnMaxLifetime(time.Hour)\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'sqlx — 薄封装，保留 SQL 控制' : 'sqlx — Thin Wrapper, Full SQL Control'}</h3>
      <pre style={preStyle}><code>{
'// go get github.com/jmoiron/sqlx\npackage main\n\nimport (\n\t"context"\n\t"github.com/jmoiron/sqlx"\n\t_ "github.com/lib/pq" // PostgreSQL driver\n)\n\ntype User struct {\n\tID    int    `db:"id"`\n\tName  string `db:"name"`\n\tEmail string `db:"email"`\n}\n\nfunc main() {\n\tdb, err := sqlx.Connect("postgres",\n\t\t"host=localhost user=postgres password=secret dbname=myapp sslmode=disable")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer db.Close()\n\n\tctx := context.Background()\n\n\t// Get single row into struct\n\tvar u User\n\terr = db.GetContext(ctx, &u, "SELECT * FROM users WHERE id = $1", 1)\n\n\t// Select multiple rows into slice\n\tvar users []User\n\terr = db.SelectContext(ctx, &users, "SELECT * FROM users WHERE age > $1 ORDER BY name", 25)\n\n\t// Named queries (cleaner for inserts/updates)\n\t_, err = db.NamedExecContext(ctx,\n\t\t"INSERT INTO users (name, email) VALUES (:name, :email)",\n\t\t&User{Name: "Alice", Email: "alice@example.com"})\n\n\t// NamedQuery for SELECT\n\trows, err := db.NamedQueryContext(ctx,\n\t\t"SELECT * FROM users WHERE name = :name",\n\t\tmap[string]interface{}{"name": "Alice"})\n\tif err == nil {\n\t\tdefer rows.Close()\n\t\tfor rows.Next() {\n\t\t\tvar user User\n\t\t\trows.StructScan(&user)\n\t\t}\n\t}\n\n\t// Transaction\n\ttx, err := db.BeginTxx(ctx, nil)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer tx.Rollback() // no-op if committed\n\t_, err = tx.ExecContext(ctx, "UPDATE users SET name = $1 WHERE id = $2", "Alice Updated", 1)\n\tif err != nil {\n\t\treturn\n\t}\n\ttx.Commit()\n\n\t_ = u\n\t_ = users\n\t_ = err\n}'
      }</code></pre>

      <h3 style={h3Style}>{isZh ? 'pgx — 原生 PostgreSQL 驱动，性能最佳' : 'pgx — Native PostgreSQL Driver, Best Performance'}</h3>
      <pre style={preStyle}><code>{
'// go get github.com/jackc/pgx/v5\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\t"github.com/jackc/pgx/v5"\n\t"github.com/jackc/pgx/v5/pgxpool"\n)\n\ntype User struct {\n\tID    int32\n\tName  string\n\tEmail string\n}\n\nfunc main() {\n\tctx := context.Background()\n\n\t// Connection pool (recommended for production)\n\tpool, err := pgxpool.New(ctx, "postgres://postgres:secret@localhost/myapp")\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer pool.Close()\n\n\t// Configure pool\n\tconfig, _ := pgxpool.ParseConfig("postgres://postgres:secret@localhost/myapp")\n\tconfig.MaxConns = 20\n\tconfig.MinConns = 5\n\tpool2, _ := pgxpool.NewWithConfig(ctx, config)\n\tdefer pool2.Close()\n\n\t// Query single row\n\tvar u User\n\terr = pool.QueryRow(ctx,\n\t\t"SELECT id, name, email FROM users WHERE id = $1", 1).\n\t\tScan(&u.ID, &u.Name, &u.Email)\n\tif err != nil {\n\t\tif err == pgx.ErrNoRows {\n\t\t\tfmt.Println("No user found")\n\t\t}\n\t}\n\n\t// Query multiple rows\n\trows, err := pool.Query(ctx, "SELECT id, name, email FROM users ORDER BY id")\n\tdefer rows.Close()\n\tfor rows.Next() {\n\t\tvar user User\n\t\trows.Scan(&user.ID, &user.Name, &user.Email)\n\t\tfmt.Printf("%+v\\n", user)\n\t}\n\n\t// Exec (insert, update, delete)\n\ttag, err := pool.Exec(ctx,\n\t\t"INSERT INTO users (name, email) VALUES ($1, $2)",\n\t\t"Alice", "alice@example.com")\n\tfmt.Println("Rows affected:", tag.RowsAffected())\n\n\t// Batch queries (send multiple queries in one roundtrip)\n\tb := &pgx.Batch{}\n\tb.Queue("SELECT 1")\n\tb.Queue("SELECT 2")\n\tresults := pool.SendBatch(ctx, b)\n\tdefer results.Close()\n\n\t// Transaction\n\ttx, _ := pool.Begin(ctx)\n\tdefer tx.Rollback(ctx)\n\ttx.Exec(ctx, "UPDATE users SET name = $1 WHERE id = $2", "Alice Smith", 1)\n\ttx.Commit(ctx)\n\n\t_ = err\n\t_ = u\n}'
      }</code></pre>

      {/* Comparison Table: GORM vs sqlx vs pgx */}
      <h3 style={h3Style}>{isZh ? 'GORM vs sqlx vs pgx 对比表' : 'GORM vs sqlx vs pgx Comparison'}</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
              <th style={thStyle}>GORM</th>
              <th style={thStyle}>sqlx</th>
              <th style={thStyle}>pgx</th>
            </tr>
          </thead>
          <tbody>
            {[
              [isZh ? '抽象层级' : 'Abstraction', isZh ? '高（ORM）' : 'High (ORM)', isZh ? '低（SQL）' : 'Low (SQL)', isZh ? '最低（原生驱动）' : 'Lowest (native driver)'],
              [isZh ? '性能' : 'Performance', isZh ? '中等' : 'Medium', isZh ? '良好' : 'Good', isZh ? '最佳' : 'Best'],
              [isZh ? 'SQL 控制' : 'SQL Control', isZh ? '部分' : 'Partial', isZh ? '完整' : 'Full', isZh ? '完整' : 'Full'],
              [isZh ? '迁移' : 'Migrations', isZh ? '内置 AutoMigrate' : 'Built-in AutoMigrate', isZh ? '需外部工具' : 'External tool', isZh ? '需外部工具' : 'External tool'],
              [isZh ? 'PG 特有类型' : 'PG-specific types', isZh ? '有限支持' : 'Limited', isZh ? '有限支持' : 'Limited', isZh ? '完整支持' : 'Full support'],
              [isZh ? '连接池' : 'Connection pool', isZh ? '通过 database/sql' : 'Via database/sql', isZh ? '通过 database/sql' : 'Via database/sql', isZh ? '原生 pgxpool' : 'Native pgxpool'],
              [isZh ? '适用场景' : 'Best for', isZh ? 'CRUD 密集型、管理后台' : 'CRUD-heavy admin tools', isZh ? '需要 SQL 控制的应用' : 'Apps needing SQL control', isZh ? '高性能生产应用' : 'High-perf production apps'],
            ].map(([feature, gorm, sqlxVal, pgxVal], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#334155' }}>{feature}</td>
                <td style={tdStyle}>{gorm}</td>
                <td style={tdStyle}>{sqlxVal}</td>
                <td style={tdStyle}>{pgxVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 12: Multi-Stage Docker */}
      <h2 style={h2Style}>
        {isZh ? '12. Go 应用的多阶段 Dockerfile' : '12. Dockerfile for Go: Multi-Stage Builds'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '多阶段构建是 Go 容器化的最佳实践。构建阶段使用完整的 Go 镜像（~1GB）编译二进制文件，最终阶段只复制二进制到极小的 scratch 或 distroless 镜像，将最终镜像压缩到 ~10-20MB。'
          : 'Multi-stage builds are the Go containerization best practice. The build stage uses the full Go image (~1GB) to compile the binary; the final stage copies only the binary into a minimal scratch or distroless image, shrinking the final image to ~10-20MB.'}
      </p>
      <pre style={preStyle}><code>{
'# syntax=docker/dockerfile:1\n\n# ---- Build Stage ----\nFROM golang:1.22-alpine AS builder\n\n# Install build dependencies\nRUN apk add --no-cache git ca-certificates tzdata\n\nWORKDIR /build\n\n# Cache dependencies separately (layer caching optimization)\nCOPY go.mod go.sum ./\nRUN go mod download\n\n# Copy source code\nCOPY . .\n\n# Build the binary\n# CGO_ENABLED=0 produces a static binary (no glibc dependency)\n# -ldflags trims debug info for smaller binary\n# -trimpath removes file system paths from binary\nRUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \\\n    -ldflags="-w -s -X main.version=1.0.0 -X main.buildTime=$(date -u +%Y%m%dT%H%M%S)" \\\n    -trimpath \\\n    -o /app/server \\\n    ./cmd/server\n\n# ---- Runtime Stage (scratch = minimal, ~0MB base) ----\nFROM scratch\n\n# Copy timezone data and CA certificates for HTTPS\nCOPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo\nCOPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/\n\n# Copy the binary\nCOPY --from=builder /app/server /server\n\n# Non-root user (scratch: use numeric UID)\nUSER 65534:65534\n\nEXPOSE 8080\nENTRYPOINT ["/server"]\n\n---\n# Alternative: use distroless for debugging capability\nFROM gcr.io/distroless/static-debian12:nonroot AS runtime\nCOPY --from=builder /app/server /server\nUSER nonroot:nonroot\nEXPOSE 8080\nENTRYPOINT ["/server"]'
      }</code></pre>

      <h3 style={h3Style}>docker-compose.yml {isZh ? '用于本地开发' : 'for Local Development'}</h3>
      <pre style={preStyle}><code>{
'version: "3.9"\n\nservices:\n  api:\n    build:\n      context: .\n      dockerfile: Dockerfile\n      target: builder  # stop at builder stage for dev\n    command: go run ./cmd/server\n    ports:\n      - "8080:8080"\n      - "6060:6060"  # pprof\n    environment:\n      - DATABASE_URL=postgres://postgres:secret@db:5432/myapp\n      - REDIS_URL=redis://cache:6379\n      - LOG_LEVEL=debug\n    volumes:\n      - .:/build:cached  # live reload with air\n    depends_on:\n      db:\n        condition: service_healthy\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: postgres\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: myapp\n    volumes:\n      - pg_data:/var/lib/postgresql/data\n    ports:\n      - "5432:5432"\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U postgres"]\n      interval: 5s\n      timeout: 5s\n      retries: 5\n\n  cache:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n\n  migrate:\n    image: migrate/migrate\n    volumes:\n      - ./migrations:/migrations\n    command:\n      [\n        "-path", "/migrations",\n        "-database", "postgres://postgres:secret@db:5432/myapp?sslmode=disable",\n        "up"\n      ]\n    depends_on:\n      db:\n        condition: service_healthy\n\nvolumes:\n  pg_data:'
      }</code></pre>

      {/* Section 13: Go vs Rust vs Node.js */}
      <h2 style={h2Style}>
        {isZh ? '13. Go vs Rust vs Node.js 后端对比' : '13. Go vs Rust vs Node.js: Backend Comparison'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? '三者各有所长，适用于不同场景。Go 在开发效率和运行时性能之间取得了最佳平衡；Rust 提供最高性能和内存安全，但学习曲线陡峭；Node.js 拥有最大的生态系统，适合 I/O 密集型和实时应用。'
          : 'Each language excels in different scenarios. Go achieves the best balance between development speed and runtime performance. Rust delivers maximum performance and memory safety with a steep learning curve. Node.js has the largest ecosystem and is ideal for I/O-heavy and real-time applications.'}
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>{isZh ? '维度' : 'Dimension'}</th>
              <th style={{ ...thStyle, color: '#38bdf8' }}>Go</th>
              <th style={{ ...thStyle, color: '#f97316' }}>Rust</th>
              <th style={{ ...thStyle, color: '#a3e635' }}>Node.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                isZh ? '运行时性能' : 'Runtime Performance',
                isZh ? '极佳（编译型，GC）' : 'Excellent (compiled, GC)',
                isZh ? '最佳（无 GC，零开销）' : 'Best (no GC, zero-cost)',
                isZh ? '良好（V8 JIT）' : 'Good (V8 JIT)',
              ],
              [
                isZh ? '内存使用' : 'Memory Usage',
                isZh ? '低（GC 管理）' : 'Low (GC managed)',
                isZh ? '最低（手动控制）' : 'Lowest (manual)',
                isZh ? '中等（V8 堆）' : 'Medium (V8 heap)',
              ],
              [
                isZh ? '并发模型' : 'Concurrency Model',
                isZh ? 'Goroutine + Channel（CSP）' : 'Goroutines + Channels (CSP)',
                isZh ? 'async/await + Tokio' : 'async/await + Tokio',
                isZh ? '事件循环（单线程）' : 'Event loop (single-threaded)',
              ],
              [
                isZh ? '学习曲线' : 'Learning Curve',
                isZh ? '平缓（语法简单）' : 'Gentle (simple syntax)',
                isZh ? '陡峭（所有权/借用）' : 'Steep (ownership/borrow)',
                isZh ? '低（JS 基础）' : 'Low (JS foundation)',
              ],
              [
                isZh ? '编译速度' : 'Compile Speed',
                isZh ? '极快（秒级）' : 'Very fast (seconds)',
                isZh ? '慢（分钟级大项目）' : 'Slow (minutes for large)',
                isZh ? '无编译（解释型）' : 'None (interpreted)',
              ],
              [
                isZh ? '生态系统' : 'Ecosystem',
                isZh ? '中等，专注后端' : 'Medium, backend-focused',
                isZh ? '成长中，crates.io' : 'Growing, crates.io',
                isZh ? '庞大，npm 200万+包' : 'Huge, npm 2M+ packages',
              ],
              [
                isZh ? '部署' : 'Deployment',
                isZh ? '单一静态二进制' : 'Single static binary',
                isZh ? '单一静态二进制' : 'Single static binary',
                isZh ? '需要 Node.js 运行时' : 'Requires Node.js runtime',
              ],
              [
                isZh ? '最适合' : 'Best For',
                isZh ? '微服务、API、DevOps 工具' : 'Microservices, APIs, DevOps',
                isZh ? '系统编程、WebAssembly' : 'Systems, WebAssembly',
                isZh ? '实时应用、全栈 JS' : 'Real-time, full-stack JS',
              ],
            ].map(([dim, goVal, rustVal, nodeVal], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#334155' }}>{dim}</td>
                <td style={tdStyle}>{goVal}</td>
                <td style={tdStyle}>{rustVal}</td>
                <td style={tdStyle}>{nodeVal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <pre style={preStyle}><code>{
'# Performance benchmark reference (approx, varies by workload):\n# HTTP requests/sec (hello world):\n#   Rust (axum/hyper):   ~400,000 req/s\n#   Go (fasthttp):       ~350,000 req/s\n#   Go (net/http):       ~150,000 req/s\n#   Node.js (uWebSocket):~280,000 req/s\n#   Node.js (Fastify):   ~60,000 req/s\n\n# Memory footprint (idle REST API):\n#   Rust:    ~3 MB\n#   Go:      ~15 MB\n#   Node.js: ~60 MB\n\n# Startup time:\n#   Rust:    ~5ms\n#   Go:      ~10ms\n#   Node.js: ~200ms (without bundling)\n\n# Choose Go when:\n# - Team productivity > absolute performance\n# - Building microservices or Kubernetes operators\n# - Need fast compilation + easy deployment\n# - Writing CLIs, gRPC services, data pipelines\n\n# Choose Rust when:\n# - Zero-copy, zero-allocation is required\n# - Building OS kernels, embedded systems, WebAssembly\n# - Memory safety without GC pauses is critical\n\n# Choose Node.js when:\n# - Team is JavaScript-native\n# - Building real-time apps (Socket.IO, SSE)\n# - Sharing code between frontend and backend\n# - Rapid prototyping with NPM ecosystem'
      }</code></pre>

      {/* Quick Reference */}
      <h2 style={h2Style}>
        {isZh ? 'Go 高级命令速查' : 'Advanced Go Commands Quick Reference'}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginBottom: '32px' }}>
        {[
          { cmd: 'go test -race ./...', desc: isZh ? '启用竞态检测器运行测试' : 'Run tests with race detector' },
          { cmd: 'go test -bench=. -benchmem', desc: isZh ? '运行基准测试并报告内存' : 'Benchmarks with memory stats' },
          { cmd: 'go test -fuzz=FuzzXxx', desc: isZh ? '运行 fuzz 测试' : 'Run fuzz test' },
          { cmd: 'go test -coverprofile=c.out && go tool cover -html=c.out', desc: isZh ? '生成 HTML 覆盖率报告' : 'Generate HTML coverage report' },
          { cmd: 'go tool pprof -http=:8080 cpu.prof', desc: isZh ? 'pprof Web UI（含火焰图）' : 'pprof web UI with flame graph' },
          { cmd: 'go build -gcflags="-m" ./...', desc: isZh ? '打印逃逸分析结果' : 'Print escape analysis' },
          { cmd: 'go vet ./...', desc: isZh ? '静态分析，发现常见错误' : 'Static analysis for common mistakes' },
          { cmd: 'golangci-lint run', desc: isZh ? '运行 50+ linter（需安装）' : 'Run 50+ linters (install separately)' },
          { cmd: 'go mod graph | dot -Tpng > deps.png', desc: isZh ? '可视化依赖图' : 'Visualize dependency graph' },
          { cmd: 'go generate ./...', desc: isZh ? '运行 //go:generate 注释' : 'Run //go:generate directives' },
        ].map(({ cmd, desc }, i) => (
          <div
            key={i}
            style={{
              background: '#0f172a',
              borderRadius: '8px',
              padding: '14px 18px',
            }}
          >
            <code style={{ color: '#38bdf8', fontSize: '0.8rem', display: 'block', marginBottom: '6px', wordBreak: 'break-all' }}>{cmd}</code>
            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{desc}</span>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <h2 style={h2Style}>
        {isZh ? '总结' : 'Conclusion'}
      </h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 的高级特性——goroutine/channel 并发、context 取消传播、泛型、sync 原语、pprof 性能分析——共同构成了一个强大的生产级工具箱。理解内存模型和竞态条件是编写正确并发代码的基础；表驱动测试和基准测试确保代码的正确性和性能；多阶段 Dockerfile 让部署轻量高效。'
          : 'Go\'s advanced features — goroutine/channel concurrency, context cancellation propagation, generics, sync primitives, and pprof profiling — together form a powerful production-ready toolbox. Understanding the memory model and race conditions is foundational for correct concurrent code. Table-driven tests and benchmarks ensure correctness and performance. Multi-stage Dockerfiles make deployment lightweight and efficient.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '无论构建高吞吐量微服务、Kubernetes operator、CLI 工具还是数据管道，Go 都以最小的运行时开销、极佳的可读性和卓越的工具链提供所需的一切。掌握这些高级模式，你将能够自信地构建可扩展、可维护的 Go 系统。'
          : 'Whether building high-throughput microservices, Kubernetes operators, CLI tools, or data pipelines, Go provides everything needed with minimal runtime overhead, excellent readability, and an outstanding toolchain. Master these advanced patterns, and you will be confident building scalable, maintainable Go systems.'}
      </p>

      {/* FAQ */}
      <h2 style={h2Style}>
        {isZh ? '常见问题' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqSchema.mainEntity.map((faq, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '20px 24px',
              background: '#ffffff',
            }}
          >
            <h3 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b', margin: '0 0 10px 0' }}>
              {faq.name}
            </h3>
            <p style={{ color: '#475569', lineHeight: '1.7', margin: '0' }}>
              {faq.acceptedAnswer.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
