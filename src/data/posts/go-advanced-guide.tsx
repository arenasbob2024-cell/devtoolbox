'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Go Advanced Guide: Goroutines, Generics, Concurrency Patterns, and Production Best Practices',
    description: 'Master advanced Go programming: goroutines and channels (fan-in/fan-out), context package, generics with type constraints, error handling patterns, interfaces and composition, concurrency patterns (worker pool, pipeline, semaphore), table-driven testing and fuzzing, struct tags and reflection, memory management (escape analysis, sync.Pool), HTTP server patterns, database access with connection pooling, Go modules and workspaces, and profiling with pprof.',
    tldr: 'Go excels at concurrent, high-performance systems. Use goroutines with channels for fan-in/fan-out patterns, context for cancellation propagation, and generics for type-safe reusable code. Handle errors with errors.Is/As and sentinel errors. Apply concurrency patterns like worker pools and pipelines for throughput. Write table-driven tests and fuzz tests. Use sync.Pool to reduce GC pressure, pprof for CPU/memory profiling, and graceful shutdown for production HTTP servers.',
    tldrZh: 'Go 擅长并发和高性能系统。使用 goroutine 配合 channel 实现 fan-in/fan-out 模式，context 传播取消信号，泛型编写类型安全的复用代码。通过 errors.Is/As 和哨兵错误处理异常。应用 worker pool 和 pipeline 等并发模式提升吞吐量。编写表驱动测试和模糊测试。使用 sync.Pool 减少 GC 压力，pprof 进行 CPU/内存分析，生产 HTTP 服务器实现优雅关闭。',
  },
  zh: {
    title: 'Go 高级编程指南：Goroutine、泛型、并发模式与生产实践',
    description: '全面掌握 Go 高级编程：goroutine 和 channel（fan-in/fan-out）、context 包、泛型与类型约束、错误处理模式、接口与组合、并发模式（worker pool、pipeline、信号量）、表驱动测试与模糊测试、结构体标签与反射、内存管理（逃逸分析、sync.Pool）、HTTP 服务器模式、数据库访问与连接池、Go Modules 与工作区、pprof 性能分析。',
    tldr: 'Go 擅长并发和高性能系统。使用 goroutine 配合 channel 实现 fan-in/fan-out 模式，context 传播取消信号，泛型编写类型安全的复用代码。通过 errors.Is/As 和哨兵错误处理异常。应用 worker pool 和 pipeline 等并发模式提升吞吐量。编写表驱动测试和模糊测试。使用 sync.Pool 减少 GC 压力，pprof 进行 CPU/内存分析，生产 HTTP 服务器实现优雅关闭。',
    tldrZh: 'Go 擅长并发和高性能系统。使用 goroutine 配合 channel 实现 fan-in/fan-out 模式，context 传播取消信号，泛型编写类型安全的复用代码。通过 errors.Is/As 和哨兵错误处理异常。应用 worker pool 和 pipeline 等并发模式提升吞吐量。编写表驱动测试和模糊测试。使用 sync.Pool 减少 GC 压力，pprof 进行 CPU/内存分析，生产 HTTP 服务器实现优雅关闭。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are goroutines and how do they differ from OS threads?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Goroutines are lightweight, user-space threads managed by the Go runtime. They start with only 2-8 KB of stack (which grows dynamically), compared to OS threads that typically use 1-8 MB. The Go scheduler multiplexes thousands of goroutines onto a small number of OS threads using an M:N scheduling model. You can easily run millions of goroutines on a single machine.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the context package work for cancellation in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The context package provides a way to propagate cancellation signals, deadlines, and request-scoped values across goroutines. Use context.WithCancel for manual cancellation, context.WithTimeout for automatic timeout-based cancellation, and context.WithDeadline for absolute deadline cancellation. Always pass context as the first function parameter and check ctx.Done() in long-running operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Go generics work with type constraints?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go generics (introduced in Go 1.18) use type parameters with constraints defined as interfaces. The comparable constraint allows == and != operators. The any constraint (alias for interface{}) accepts all types. You can define custom constraints using interface unions (e.g., int | float64 | string). The golang.org/x/exp/constraints package provides common numeric constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best practice for error handling in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use error wrapping with fmt.Errorf and %w verb to add context while preserving the original error. Check errors with errors.Is for sentinel error comparison and errors.As for type assertion. Define sentinel errors as package-level variables (var ErrNotFound = errors.New("not found")). Never discard errors with _ = fn(); always handle or propagate them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a worker pool pattern in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A worker pool pattern uses a fixed number of goroutines (workers) that read from a shared jobs channel and write results to a results channel. This limits concurrency, prevents resource exhaustion, and provides backpressure. Create workers with a for loop launching goroutines, send jobs through the jobs channel, close it when done, and collect results from the results channel.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write table-driven tests and fuzz tests in Go?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Table-driven tests define a slice of test cases with input and expected output, then loop through them using t.Run for subtests. Fuzz tests (Go 1.18+) use f.Fuzz to automatically generate random inputs. Add seed corpus with f.Add, then define a fuzz function. Run with go test -fuzz=FuzzFunctionName. Fuzz testing finds edge cases that manual tests miss.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does escape analysis work in Go and how can I use sync.Pool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Escape analysis determines whether a variable can stay on the stack or must be allocated on the heap. Use go build -gcflags="-m" to see escape decisions. Variables escape when returned as pointers, stored in interfaces, or captured by closures. sync.Pool provides a set of temporary objects that can be reused to reduce GC pressure. Call pool.Get() to acquire and pool.Put() to return objects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I profile Go applications with pprof?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Import net/http/pprof and register its handlers. Access CPU profiles at /debug/pprof/profile, heap profiles at /debug/pprof/heap, goroutine stacks at /debug/pprof/goroutine. Use go tool pprof to analyze profiles interactively. The top command shows hottest functions, list shows annotated source, and web generates flame graphs. Use benchstat to compare benchmark results across changes.',
      },
    },
  ],
};

export default function GoAdvancedGuide({ lang }: { lang: string }) {
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

  const ulStyle: React.CSSProperties = {
    lineHeight: '1.8',
    color: '#374151',
    marginBottom: '16px',
    paddingLeft: '24px',
  };

  const tldrBoxStyle: React.CSSProperties = {
    background: '#f0f9ff',
    borderLeft: '4px solid #0ea5e9',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
    color: '#0c4a6e',
  };

  const keyTakeawaysStyle: React.CSSProperties = {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '20px 24px',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '0.95rem',
    lineHeight: '1.7',
  };

  const inlineCodeStyle: React.CSSProperties = {
    background: '#f1f5f9',
    color: '#dc2626',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  };

  const strongStyle: React.CSSProperties = {
    color: '#0f172a',
  };

  const tipBoxStyle: React.CSSProperties = {
    background: '#fefce8',
    borderLeft: '4px solid #eab308',
    padding: '14px 18px',
    borderRadius: '0 8px 8px 0',
    marginBottom: '24px',
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: '#713f12',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '8px', color: '#0369a1', fontSize: '1.05rem' }}>
          TL;DR
        </strong>
        {isZh ? t.tldrZh : t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={keyTakeawaysStyle}>
        <strong style={{ display: 'block', marginBottom: '10px', color: '#1e293b', fontSize: '1.05rem' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ ...ulStyle, marginBottom: '0' }}>
          <li>{isZh ? 'goroutine 极其轻量（2-8 KB 栈），可轻松运行数百万个' : 'Goroutines are extremely lightweight (2-8 KB stack), easily run millions concurrently'}</li>
          <li>{isZh ? '使用 context 包在 goroutine 间传播取消信号和超时' : 'Use context package to propagate cancellation and timeouts across goroutines'}</li>
          <li>{isZh ? '泛型通过类型约束实现类型安全的复用代码' : 'Generics provide type-safe reusable code through type constraints'}</li>
          <li>{isZh ? '用 errors.Is/As 和 %w 包装实现结构化错误处理' : 'Use errors.Is/As with %w wrapping for structured error handling'}</li>
          <li>{isZh ? 'worker pool、pipeline、信号量是核心并发模式' : 'Worker pools, pipelines, and semaphores are core concurrency patterns'}</li>
          <li>{isZh ? '表驱动测试 + 模糊测试是 Go 测试的最佳实践' : 'Table-driven tests + fuzz testing are Go testing best practices'}</li>
          <li>{isZh ? 'pprof 和 benchstat 是性能优化的必备工具' : 'pprof and benchstat are essential tools for performance optimization'}</li>
        </ul>
      </div>

      {/* Introduction */}
      <p style={pStyle}>
        {isZh
          ? 'Go 是一门为并发、网络服务和系统编程设计的语言。本指南覆盖 13 个高级主题，从 goroutine 和 channel 到性能分析工具 pprof，帮助你编写生产级的 Go 代码。每个部分都有实用代码示例和最佳实践建议。'
          : 'Go is a language designed for concurrency, network services, and systems programming. This guide covers 13 advanced topics, from goroutines and channels to the pprof profiling tool, helping you write production-grade Go code. Each section includes practical code examples and best practice recommendations.'}
      </p>

      {/* Section 1: Goroutines & Channels */}
      <h2 style={h2Style}>{isZh ? '1. Goroutine 与 Channel（fan-in/fan-out）' : '1. Goroutines & Channels (Fan-In/Fan-Out)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'goroutine 是 Go 运行时管理的轻量级线程，初始栈仅 2-8 KB。channel 是 goroutine 间通信的管道。fan-out 模式将工作分发给多个 goroutine，fan-in 将多个 channel 的结果合并到一个 channel。'
          : 'Goroutines are lightweight threads managed by the Go runtime with an initial stack of just 2-8 KB. Channels are the conduit for communication between goroutines. The fan-out pattern distributes work to multiple goroutines, while fan-in merges results from multiple channels into one.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Fan-In/Fan-Out 示例' : 'Fan-In/Fan-Out Example'}</h3>
      <pre style={preStyle}><code>{'func fanOut(input <-chan int, workers int) []<-chan int {\n' +
'  channels := make([]<-chan int, workers)\n' +
'  for i := 0; i < workers; i++ {\n' +
'    channels[i] = process(input)\n' +
'  }\n' +
'  return channels\n' +
'}\n\n' +
'func fanIn(channels ...<-chan int) <-chan int {\n' +
'  merged := make(chan int)\n' +
'  var wg sync.WaitGroup\n' +
'  for _, ch := range channels {\n' +
'    wg.Add(1)\n' +
'    go func(c <-chan int) {\n' +
'      defer wg.Done()\n' +
'      for v := range c { merged <- v }\n' +
'    }(ch)\n' +
'  }\n' +
'  go func() { wg.Wait(); close(merged) }()\n' +
'  return merged\n' +
'}'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用无缓冲 channel 实现同步通信，有缓冲 channel 实现异步通信。关闭 channel 会向所有接收者广播零值——这是通知多个 goroutine 的惯用方式。'
          : 'Use unbuffered channels for synchronous communication and buffered channels for async. Closing a channel broadcasts zero values to all receivers -- the idiomatic way to signal multiple goroutines.'}
      </div>

      {/* Section 2: Context Package */}
      <h2 style={h2Style}>{isZh ? '2. Context 包（取消、超时、值传递）' : '2. Context Package (Cancellation, Timeout, Values)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'context 包提供跨 goroutine 传播取消信号、截止时间和请求作用域值的机制。context.WithCancel 用于手动取消，context.WithTimeout 用于超时取消，context.WithValue 用于传递请求元数据（谨慎使用）。'
          : 'The context package provides mechanisms to propagate cancellation signals, deadlines, and request-scoped values across goroutines. Use context.WithCancel for manual cancellation, context.WithTimeout for timeout-based cancellation, and context.WithValue for request metadata (use sparingly).'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Context 超时示例' : 'Context Timeout Example'}</h3>
      <pre style={preStyle}><code>{'func fetchData(ctx context.Context, url string) ([]byte, error) {\n' +
'  ctx, cancel := context.WithTimeout(ctx, 5*time.Second)\n' +
'  defer cancel()\n' +
'  req, err := http.NewRequestWithContext(ctx, "GET", url, nil)\n' +
'  if err != nil { return nil, err }\n' +
'  resp, err := http.DefaultClient.Do(req)\n' +
'  if err != nil {\n' +
'    if ctx.Err() == context.DeadlineExceeded {\n' +
'      return nil, fmt.Errorf("request timed out: %w", err)\n' +
'    }\n' +
'    return nil, err\n' +
'  }\n' +
'  defer resp.Body.Close()\n' +
'  return io.ReadAll(resp.Body)\n' +
'}'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '永远不要传递 context.Background() 到生产代码的深层调用。从 HTTP handler 获取的请求 context 包含截止时间和取消信号，应一路传递到数据库查询和外部 API 调用。'
          : 'Never pass context.Background() deep into production code. The request context from HTTP handlers carries deadlines and cancellation -- propagate it all the way down to database queries and external API calls.'}
      </div>
      <p style={pStyle}>
        {isZh
          ? 'context.WithValue 应仅用于请求作用域的数据（如 trace ID、认证令牌），不要用它传递函数参数。键应使用未导出类型避免冲突。'
          : 'context.WithValue should only be used for request-scoped data (trace IDs, auth tokens), not for passing function parameters. Use unexported types for keys to avoid collisions across packages.'}
      </p>

      {/* Section 3: Generics */}
      <h2 style={h2Style}>{isZh ? '3. 泛型（类型约束、comparable、any）' : '3. Generics (Type Constraints, Comparable, Any)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 1.18 引入泛型，通过类型参数和约束实现类型安全的复用代码。在泛型之前，开发者不得不为每种类型复制相同的逻辑或使用 interface{} 牺牲类型安全。comparable 约束允许 == 和 != 操作，适用于 map 键类型。any 是 interface{} 的别名，接受任意类型。自定义约束使用接口联合类型定义，如 int | float64 | string。'
          : 'Go 1.18 introduced generics with type parameters and constraints for type-safe reusable code. Before generics, developers had to duplicate logic for each type or sacrifice type safety with interface{}. The comparable constraint enables == and != operators and is suitable for map key types. any is an alias for interface{} that accepts any type. Define custom constraints using interface union types like int | float64 | string.'}
      </p>
      <h3 style={h3Style}>{isZh ? '泛型约束示例' : 'Generics Constraint Example'}</h3>
      <pre style={preStyle}><code>{'type Number interface {\n' +
'  ~int | ~int32 | ~int64 | ~float32 | ~float64\n' +
'}\n\n' +
'func Sum[T Number](nums []T) T {\n' +
'  var total T\n' +
'  for _, n := range nums { total += n }\n' +
'  return total\n' +
'}\n\n' +
'func Filter[T any](slice []T, predicate func(T) bool) []T {\n' +
'  result := make([]T, 0)\n' +
'  for _, v := range slice {\n' +
'    if predicate(v) { result = append(result, v) }\n' +
'  }\n' +
'  return result\n' +
'}\n' +
'// Usage: evens := Filter([]int{1,2,3,4}, func(n int) bool { return n%2==0 })'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '波浪号（~）前缀表示底层类型约束——~int 匹配所有底层类型为 int 的类型（包括 type UserID int 这样的自定义类型）。这在处理领域特定类型时非常有用。'
          : 'The tilde (~) prefix indicates an underlying type constraint -- ~int matches all types whose underlying type is int (including custom types like type UserID int). This is invaluable when working with domain-specific types.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '不要过度使用泛型。如果具体类型就能满足需求，就不要引入类型参数。泛型最适合容器类型（切片、映射操作）、算法（排序、过滤）和数据结构（树、链表）。'
          : 'Do not overuse generics. If concrete types suffice, avoid type parameters. Generics work best for container types (slice/map operations), algorithms (sort, filter), and data structures (trees, linked lists).'}
      </div>

      {/* Section 4: Error Handling */}
      <h2 style={h2Style}>{isZh ? '4. 错误处理（errors.Is/As、包装、哨兵错误）' : '4. Error Handling (errors.Is/As, Wrapping, Sentinel Errors)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 使用显式错误返回而非异常机制，这是该语言最独特的设计决策之一。if err != nil 模式虽然冗长，但使错误处理路径清晰可见。用 fmt.Errorf 的 %w 动词包装错误以添加上下文，同时保留原始错误链。errors.Is 沿着 Unwrap 链比较哨兵错误，errors.As 沿着链进行类型断言。定义包级别哨兵错误用于外部比较，这是 Go 中最惯用的错误处理模式。'
          : 'Go uses explicit error returns instead of exceptions, one of the language most distinctive design decisions. The if err != nil pattern, while verbose, makes error handling paths clearly visible. Wrap errors with fmt.Errorf and the %w verb to add context while preserving the original error chain. errors.Is walks the Unwrap chain for sentinel comparison, and errors.As walks the chain for type assertion. Define package-level sentinel errors for external comparison -- the most idiomatic error handling pattern in Go.'}
      </p>
      <h3 style={h3Style}>{isZh ? '错误处理模式' : 'Error Handling Patterns'}</h3>
      <pre style={preStyle}><code>{'var ErrNotFound = errors.New("resource not found")\n' +
'var ErrForbidden = errors.New("access forbidden")\n\n' +
'type ValidationError struct {\n' +
'  Field   string\n' +
'  Message string\n' +
'}\n' +
'func (e *ValidationError) Error() string {\n' +
'  return fmt.Sprintf("validation: %s - %s", e.Field, e.Message)\n' +
'}\n\n' +
'func GetUser(id string) (*User, error) {\n' +
'  user, err := db.Find(id)\n' +
'  if err != nil {\n' +
'    if errors.Is(err, sql.ErrNoRows) {\n' +
'      return nil, fmt.Errorf("GetUser(%s): %w", id, ErrNotFound)\n' +
'    }\n' +
'    return nil, fmt.Errorf("GetUser(%s): %w", id, err)\n' +
'  }\n' +
'  return user, nil\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '在错误链中，errors.Is 沿着 Unwrap 链比较错误值，errors.As 沿着链查找匹配类型。使用 %w 包装保留错误链，使用 %v 创建新错误（断开链）。推荐在公共 API 中导出哨兵错误，以便调用者使用 errors.Is 检查。'
          : 'In error chains, errors.Is walks the Unwrap chain comparing error values, while errors.As walks the chain looking for a matching type. Use %w to preserve the chain; use %v to create a new error (breaking the chain). Export sentinel errors in public APIs so callers can check with errors.Is.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '考虑使用自定义错误类型携带结构化元数据（HTTP 状态码、错误码、重试信息），而非仅依赖错误字符串。这使得错误处理更加精确和可编程。'
          : 'Consider custom error types carrying structured metadata (HTTP status codes, error codes, retry info) rather than relying solely on error strings. This makes error handling more precise and programmable.'}
      </div>

      {/* Section 5: Interfaces & Composition */}
      <h2 style={h2Style}>{isZh ? '5. 接口与组合（嵌入、隐式实现）' : '5. Interfaces & Composition (Embedding, Implicit Implementation)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 接口是隐式实现的——不需要 implements 关键字，只要类型实现了接口定义的所有方法就自动满足接口。这种设计鼓励面向行为编程而非面向类型编程。接口组合通过嵌入小接口构建大接口（如 io.ReadWriter 嵌入 io.Reader 和 io.Writer）。优先使用小接口（1-2 个方法），在消费者端定义接口而非生产者端，这使得代码更灵活且易于测试。'
          : 'Go interfaces are implemented implicitly -- no implements keyword needed. A type automatically satisfies an interface by implementing all its methods. This design encourages behavior-oriented programming rather than type-oriented programming. Interface composition builds larger interfaces by embedding smaller ones (e.g., io.ReadWriter embeds io.Reader and io.Writer). Prefer small interfaces (1-2 methods) and define interfaces at the consumer side, not the producer side, making code more flexible and testable.'}
      </p>
      <h3 style={h3Style}>{isZh ? '接口组合示例' : 'Interface Composition Example'}</h3>
      <pre style={preStyle}><code>{'type Reader interface { Read(p []byte) (int, error) }\n' +
'type Writer interface { Write(p []byte) (int, error) }\n' +
'type Closer interface { Close() error }\n' +
'type ReadWriteCloser interface {\n' +
'  Reader\n' +
'  Writer\n' +
'  Closer\n' +
'}\n\n' +
'// Accept interfaces, return structs\n' +
'type UserStore interface {\n' +
'  GetUser(ctx context.Context, id string) (*User, error)\n' +
'  SaveUser(ctx context.Context, u *User) error\n' +
'}\n\n' +
'type Service struct { store UserStore }\n' +
'func NewService(s UserStore) *Service {\n' +
'  return &Service{store: s}\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '遵循 "接受接口，返回结构体" 原则。在消费者包中定义接口（而非实现者包中），这样可以避免不必要的依赖耦合。小接口（1-2 个方法）比大接口更容易实现和模拟测试。'
          : 'Follow the principle of "accept interfaces, return structs." Define interfaces in the consumer package, not the implementer package, to avoid unnecessary coupling. Small interfaces (1-2 methods) are easier to implement and mock for testing.'}
      </p>

      {/* Section 6: Concurrency Patterns */}
      <h2 style={h2Style}>{isZh ? '6. 并发模式（Worker Pool、Pipeline、信号量）' : '6. Concurrency Patterns (Worker Pool, Pipeline, Semaphore)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'worker pool 使用固定数量的 goroutine 处理 jobs channel 中的任务。pipeline 将处理步骤串联成 channel 链。信号量使用带缓冲的 channel 限制并发数，防止资源耗尽。这三种模式是 Go 并发编程的基础构件。'
          : 'A worker pool uses a fixed number of goroutines processing tasks from a jobs channel. Pipelines chain processing stages via channels. Semaphores use buffered channels to limit concurrency and prevent resource exhaustion. These three patterns are the building blocks of Go concurrent programming.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Worker Pool 与信号量' : 'Worker Pool & Semaphore'}</h3>
      <pre style={preStyle}><code>{'func WorkerPool(jobs <-chan Job, results chan<- Result, workers int) {\n' +
'  var wg sync.WaitGroup\n' +
'  for i := 0; i < workers; i++ {\n' +
'    wg.Add(1)\n' +
'    go func() {\n' +
'      defer wg.Done()\n' +
'      for job := range jobs {\n' +
'        results <- job.Process()\n' +
'      }\n' +
'    }()\n' +
'  }\n' +
'  wg.Wait()\n' +
'  close(results)\n' +
'}\n\n' +
'// Semaphore with buffered channel\n' +
'sem := make(chan struct{}, 10) // max 10 concurrent\n' +
'for _, url := range urls {\n' +
'  sem <- struct{}{}\n' +
'  go func(u string) {\n' +
'    defer func() { <-sem }()\n' +
'    fetch(u)\n' +
'  }(url)\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'pipeline 模式将处理分为多个阶段，每个阶段通过 channel 连接。数据从一端流入，经过过滤、转换、聚合等步骤后从另一端流出。每个阶段独立运行在自己的 goroutine 中，实现天然的并行处理。'
          : 'The pipeline pattern divides processing into stages connected via channels. Data flows in one end, passes through filtering, transformation, and aggregation steps, then exits the other end. Each stage runs independently in its own goroutine, enabling natural parallel processing.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 errgroup.Group（golang.org/x/sync/errgroup）替代手动管理 WaitGroup + 错误收集。errgroup 自动处理第一个错误的取消传播，代码更简洁。'
          : 'Use errgroup.Group (golang.org/x/sync/errgroup) instead of manually managing WaitGroup + error collection. errgroup automatically handles cancellation propagation on the first error, resulting in cleaner code.'}
      </div>

      {/* Section 7: Testing */}
      <h2 style={h2Style}>{isZh ? '7. 测试（表驱动、基准测试、模糊测试）' : '7. Testing (Table-Driven, Benchmarks, Fuzzing)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 内置了强大的测试框架，无需第三方库即可完成大多数测试需求。表驱动测试使用测试用例切片配合 t.Run 子测试，是 Go 社区最推荐的测试模式。基准测试以 Benchmark 为前缀并使用 b.N 循环。模糊测试（Go 1.18+）使用 f.Fuzz 自动生成随机输入发现边界情况。'
          : 'Go has a powerful built-in testing framework that handles most testing needs without third-party libraries. Table-driven tests use a test case slice with t.Run subtests and are the most recommended testing pattern in the Go community. Benchmarks use the Benchmark prefix with b.N loops. Fuzz tests (Go 1.18+) use f.Fuzz to auto-generate random inputs and discover edge cases.'}
      </p>
      <h3 style={h3Style}>{isZh ? '表驱动测试与模糊测试' : 'Table-Driven & Fuzz Test'}</h3>
      <pre style={preStyle}><code>{'func TestAdd(t *testing.T) {\n' +
'  tests := []struct {\n' +
'    name     string\n' +
'    a, b     int\n' +
'    expected int\n' +
'  }{\n' +
'    {"positive", 2, 3, 5},\n' +
'    {"negative", -1, -2, -3},\n' +
'    {"zero", 0, 0, 0},\n' +
'  }\n' +
'  for _, tt := range tests {\n' +
'    t.Run(tt.name, func(t *testing.T) {\n' +
'      if got := Add(tt.a, tt.b); got != tt.expected {\n' +
'        t.Errorf("Add(%d,%d)=%d, want %d", tt.a, tt.b, got, tt.expected)\n' +
'      }\n' +
'    })\n' +
'  }\n' +
'}\n\n' +
'func FuzzReverse(f *testing.F) {\n' +
'  f.Add("hello")\n' +
'  f.Fuzz(func(t *testing.T, s string) {\n' +
'    rev := Reverse(s)\n' +
'    if Reverse(rev) != s { t.Errorf("double reverse mismatch") }\n' +
'  })\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '基准测试使用 func BenchmarkXxx(b *testing.B) 签名，在 b.N 循环内运行被测代码。使用 b.ResetTimer() 排除初始化时间，b.ReportAllocs() 报告内存分配。运行：go test -bench=. -benchmem -count=5。'
          : 'Benchmarks use the func BenchmarkXxx(b *testing.B) signature and run the tested code inside a b.N loop. Use b.ResetTimer() to exclude setup time and b.ReportAllocs() to report memory allocations. Run with: go test -bench=. -benchmem -count=5.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '使用 t.Parallel() 标记可以并行运行的测试，加速测试套件。但要注意共享状态——并行测试不能修改同一个变量。使用 testcontainers-go 进行集成测试，自动管理 Docker 容器生命周期。'
          : 'Mark tests with t.Parallel() for concurrent execution to speed up the test suite. But beware of shared state -- parallel tests must not modify the same variable. Use testcontainers-go for integration tests to automatically manage Docker container lifecycles.'}
      </div>

      {/* Section 8: Struct Tags & Reflection */}
      <h2 style={h2Style}>{isZh ? '8. 结构体标签与反射（json、自定义标签）' : '8. Struct Tags & Reflection (JSON, Custom Tags)'}</h2>
      <p style={pStyle}>
        {isZh
          ? '结构体标签是附加在字段上的元数据字符串，是 Go 中实现声明式编程的主要方式。标准库用 json 和 xml 标签控制序列化，ORM 库用 db 标签映射数据库列，验证库用 validate 标签定义校验规则。reflect 包可在运行时读取标签值。自定义标签可实现字段级的配置和验证逻辑，但要注意反射的性能开销。'
          : 'Struct tags are metadata strings attached to fields and are the primary way to achieve declarative programming in Go. The standard library uses json and xml tags to control serialization, ORM libraries use db tags for database column mapping, and validation libraries use validate tags for rules. The reflect package reads tag values at runtime. Custom tags enable field-level configuration and validation logic, but be aware of reflection performance overhead.'}
      </p>
      <h3 style={h3Style}>{isZh ? '结构体标签与反射示例' : 'Struct Tags & Reflection Example'}</h3>
      <pre style={preStyle}><code>{'type User struct {\n' +
'  ID    int    `json:"id" db:"user_id" validate:"required"`\n' +
'  Name  string `json:"name" validate:"min=2,max=50"`\n' +
'  Email string `json:"email,omitempty" validate:"email"`\n' +
'}\n\n' +
'func PrintTags(v interface{}) {\n' +
'  t := reflect.TypeOf(v)\n' +
'  for i := 0; i < t.NumField(); i++ {\n' +
'    field := t.Field(i)\n' +
'    jsonTag := field.Tag.Get("json")\n' +
'    dbTag := field.Tag.Get("db")\n' +
'    fmt.Printf("%s: json=%s db=%s\\n", field.Name, jsonTag, dbTag)\n' +
'  }\n' +
'}\n' +
'// Output: ID: json=id db=user_id\n' +
'//         Name: json=name db=\n' +
'//         Email: json=email,omitempty db='}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '反射性能较差，生产代码中应避免在热路径上使用。如果需要高性能的序列化/反序列化，考虑使用代码生成工具（如 easyjson、msgp）替代运行时反射。'
          : 'Reflection is slow -- avoid it on hot paths in production code. For high-performance serialization/deserialization, consider code generation tools (easyjson, msgp) instead of runtime reflection.'}
      </div>

      {/* Section 9: Memory Management */}
      <h2 style={h2Style}>{isZh ? '9. 内存管理（逃逸分析、sync.Pool）' : '9. Memory Management (Escape Analysis, sync.Pool)'}</h2>
      <p style={pStyle}>
        {isZh
          ? '理解 Go 的内存分配对编写高性能代码至关重要。逃逸分析是编译器决定变量在栈还是堆上分配的过程。栈分配快且无 GC 开销，堆分配则需要垃圾回收器介入。返回指针、存入接口或被闭包捕获的变量会逃逸到堆。sync.Pool 提供可复用的临时对象池，减少 GC 压力，适合高频分配场景如 HTTP 请求处理中的缓冲区。'
          : 'Understanding Go memory allocation is critical for writing high-performance code. Escape analysis is the compiler process that determines whether a variable is allocated on the stack or heap. Stack allocation is fast with zero GC overhead, while heap allocation requires garbage collector involvement. Variables escape to the heap when returned as pointers, stored in interfaces, or captured by closures. sync.Pool provides a reusable pool of temporary objects to reduce GC pressure in high-allocation scenarios like buffer management in HTTP request processing.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'sync.Pool 示例' : 'sync.Pool Example'}</h3>
      <pre style={preStyle}><code>{'// go build -gcflags="-m" to see escape analysis\n\n' +
'var bufPool = sync.Pool{\n' +
'  New: func() interface{} {\n' +
'    return new(bytes.Buffer)\n' +
'  },\n' +
'}\n\n' +
'func ProcessRequest(data []byte) string {\n' +
'  buf := bufPool.Get().(*bytes.Buffer)\n' +
'  defer func() {\n' +
'    buf.Reset()\n' +
'    bufPool.Put(buf)\n' +
'  }()\n' +
'  buf.Write(data)\n' +
'  buf.WriteString("-processed")\n' +
'  return buf.String()\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '栈分配比堆分配快得多且无 GC 开销。减少逃逸的技巧：返回值而非指针（除非对象很大）、避免将局部变量存入接口类型、使用数组而非切片（大小已知时）。sync.Pool 在 GC 时会被清空，因此不适合存储必须持久化的对象。'
          : 'Stack allocation is much faster than heap allocation with zero GC overhead. Tips to reduce escapes: return values instead of pointers (unless objects are large), avoid storing locals into interface types, use arrays instead of slices (when size is known). sync.Pool is cleared on GC, so it is not suitable for objects that must persist.'}
      </p>

      {/* Section 10: HTTP Server Patterns */}
      <h2 style={h2Style}>{isZh ? '10. HTTP 服务器模式（中间件、路由、优雅关闭）' : '10. HTTP Server Patterns (Middleware, Routing, Graceful Shutdown)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 的 net/http 标准库足够强大，可以构建生产级 HTTP 服务器。生产环境需要中间件链（日志、认证、CORS、限流、恢复 panic）、结构化路由和优雅关闭。Go 1.22+ 增强了 net/http 路由，支持 HTTP 方法匹配和路径参数（如 GET /users/{id}）。使用 signal.NotifyContext 捕获 SIGINT/SIGTERM 终止信号，http.Server.Shutdown 方法等待活跃连接完成后再退出。'
          : 'Go standard library net/http is powerful enough for production HTTP servers. Production environments need middleware chains (logging, auth, CORS, rate limiting, panic recovery), structured routing, and graceful shutdown. Go 1.22+ enhanced net/http routing with HTTP method matching and path parameters (e.g., GET /users/{id}). Use signal.NotifyContext to catch SIGINT/SIGTERM termination signals, and http.Server.Shutdown to wait for active connections to complete before exiting.'}
      </p>
      <h3 style={h3Style}>{isZh ? '中间件与优雅关闭' : 'Middleware & Graceful Shutdown'}</h3>
      <pre style={preStyle}><code>{'func LoggingMiddleware(next http.Handler) http.Handler {\n' +
'  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n' +
'    start := time.Now()\n' +
'    next.ServeHTTP(w, r)\n' +
'    log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))\n' +
'  })\n' +
'}\n\n' +
'func main() {\n' +
'  mux := http.NewServeMux()\n' +
'  mux.HandleFunc("GET /api/users/{id}", getUser)\n' +
'  srv := &http.Server{Addr: ":8080", Handler: LoggingMiddleware(mux)}\n' +
'  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)\n' +
'  defer stop()\n' +
'  go func() { srv.ListenAndServe() }()\n' +
'  <-ctx.Done()\n' +
'  shutCtx, c := context.WithTimeout(context.Background(), 10*time.Second)\n' +
'  defer c()\n' +
'  srv.Shutdown(shutCtx)\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '中间件可以链式组合：handler = LoggingMiddleware(AuthMiddleware(CORSMiddleware(mux)))。Go 1.22 的增强路由支持方法匹配和路径参数，减少了对第三方路由库的依赖。使用 ReadTimeout、WriteTimeout 和 IdleTimeout 防止慢客户端耗尽服务器资源。'
          : 'Middleware can be chained: handler = LoggingMiddleware(AuthMiddleware(CORSMiddleware(mux))). Go 1.22 enhanced routing supports method matching and path parameters, reducing the need for third-party routers. Set ReadTimeout, WriteTimeout, and IdleTimeout to prevent slow clients from exhausting server resources.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '生产环境中始终实现优雅关闭。不要直接调用 os.Exit()——它不会执行 defer 语句也不会等待活跃请求完成。使用 signal.NotifyContext 监听 SIGINT/SIGTERM，给服务器 10-30 秒的排空时间。'
          : 'Always implement graceful shutdown in production. Never call os.Exit() directly -- it skips deferred calls and does not wait for active requests. Use signal.NotifyContext for SIGINT/SIGTERM and give the server 10-30 seconds to drain.'}
      </div>

      {/* Section 11: Database Access */}
      <h2 style={h2Style}>{isZh ? '11. 数据库访问（database/sql、sqlx、连接池）' : '11. Database Access (database/sql, sqlx, Connection Pooling)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'database/sql 是 Go 标准库的数据库抽象层，提供通用接口和内置连接池。它通过驱动模式支持 PostgreSQL、MySQL、SQLite 等多种数据库。设置 MaxOpenConns、MaxIdleConns 和 ConnMaxLifetime 优化连接池。sqlx 扩展了标准库，支持结构体扫描和命名参数。始终使用参数化查询防止 SQL 注入。'
          : 'database/sql is the standard library database abstraction layer in Go, providing a generic interface with built-in connection pooling. It supports PostgreSQL, MySQL, SQLite and more through a driver pattern. Configure MaxOpenConns, MaxIdleConns, and ConnMaxLifetime to optimize the pool. sqlx extends the standard library with struct scanning and named parameters. Always use parameterized queries to prevent SQL injection.'}
      </p>
      <h3 style={h3Style}>{isZh ? '数据库连接池与查询' : 'Connection Pool & Query'}</h3>
      <pre style={preStyle}><code>{'db, err := sql.Open("postgres", connStr)\n' +
'db.SetMaxOpenConns(25)\n' +
'db.SetMaxIdleConns(10)\n' +
'db.SetConnMaxLifetime(5 * time.Minute)\n\n' +
'// sqlx: struct scanning\n' +
'type User struct {\n' +
'  ID    int    `db:"id"`\n' +
'  Name  string `db:"name"`\n' +
'  Email string `db:"email"`\n' +
'}\n\n' +
'func GetUsers(ctx context.Context, db *sqlx.DB) ([]User, error) {\n' +
'  var users []User\n' +
'  err := db.SelectContext(ctx, &users,\n' +
'    "SELECT id, name, email FROM users WHERE active = $1", true)\n' +
'  return users, err\n' +
'}'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? 'MaxOpenConns 限制到数据库的最大连接数，MaxIdleConns 控制空闲连接池大小，ConnMaxLifetime 防止使用过期连接。典型生产配置：MaxOpenConns=25, MaxIdleConns=10, ConnMaxLifetime=5m。始终使用 context 传递到数据库查询以支持取消和超时。'
          : 'MaxOpenConns limits the maximum connections to the database, MaxIdleConns controls the idle pool size, and ConnMaxLifetime prevents using stale connections. Typical production config: MaxOpenConns=25, MaxIdleConns=10, ConnMaxLifetime=5m. Always pass context to database queries for cancellation and timeout support.'}
      </p>

      {/* Section 12: Go Modules & Workspaces */}
      <h2 style={h2Style}>{isZh ? '12. Go Modules 与工作区（go.mod、replace、workspace）' : '12. Go Modules & Workspaces (go.mod, replace, workspace)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go Modules 是 Go 的官方依赖管理系统，从 Go 1.11 引入并在 Go 1.16 成为默认模式。go.mod 声明模块路径、Go 版本和依赖列表。replace 指令用于本地开发时替换依赖路径。Go 1.18+ 的工作区（go.work）允许同时开发多个相关模块，无需修改各自的 go.mod 文件。这对微服务和 monorepo 项目尤其有用。'
          : 'Go Modules is the official dependency management system, introduced in Go 1.11 and default since Go 1.16. go.mod declares the module path, Go version, and dependency list. The replace directive substitutes dependency paths during local development. Go 1.18+ workspaces (go.work) enable simultaneous development of multiple related modules without modifying individual go.mod files. This is especially useful for microservices and monorepo projects.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'Modules 与工作区配置' : 'Modules & Workspace Config'}</h3>
      <pre style={preStyle}><code>{'// go.mod\n' +
'module github.com/myorg/myapp\n' +
'go 1.22\n' +
'require (\n' +
'  github.com/gin-gonic/gin v1.9.1\n' +
'  github.com/jmoiron/sqlx v1.3.5\n' +
')\n' +
'replace github.com/myorg/shared => ../shared\n\n' +
'// go.work (multi-module workspace)\n' +
'go 1.22\n' +
'use (\n' +
'  ./api\n' +
'  ./shared\n' +
'  ./worker\n' +
')\n\n' +
'// Commands: go work init ./api ./shared\n' +
'//           go work sync\n' +
'//           go mod tidy'}</code></pre>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? 'go.work 文件不应提交到版本控制——它是本地开发配置。将其添加到 .gitignore。replace 指令在 go.mod 中也应仅用于开发，发布前应移除。使用 go mod tidy 清理未使用的依赖。'
          : 'The go.work file should not be committed to version control -- it is local development configuration. Add it to .gitignore. The replace directive in go.mod should also only be used during development and removed before publishing. Use go mod tidy to clean up unused dependencies.'}
      </div>

      {/* Section 13: Profiling & Optimization */}
      <h2 style={h2Style}>{isZh ? '13. 性能分析与优化（pprof、trace、benchstat）' : '13. Profiling & Optimization (pprof, trace, benchstat)'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'pprof 提供 CPU、内存、goroutine 和阻塞分析。导入 net/http/pprof 暴露 HTTP 端点。go tool pprof 交互式分析火焰图。benchstat 比较不同版本的基准测试结果，判断优化是否有统计显著性。'
          : 'pprof provides CPU, memory, goroutine, and block profiling. Import net/http/pprof to expose HTTP endpoints. Use go tool pprof for interactive analysis and flame graphs. benchstat compares benchmark results across versions to determine if optimizations are statistically significant.'}
      </p>
      <h3 style={h3Style}>{isZh ? 'pprof 性能分析' : 'pprof Profiling'}</h3>
      <pre style={preStyle}><code>{'import _ "net/http/pprof"\n\n' +
'func main() {\n' +
'  go func() { http.ListenAndServe(":6060", nil) }()\n' +
'  // ... your app code\n' +
'}\n\n' +
'// CLI profiling commands:\n' +
'// go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30\n' +
'// go tool pprof http://localhost:6060/debug/pprof/heap\n' +
'// go tool pprof -http=:8081 cpu.prof    # web UI\n\n' +
'// Benchmark and compare:\n' +
'// go test -bench=. -count=10 > old.txt\n' +
'// (make changes)\n' +
'// go test -bench=. -count=10 > new.txt\n' +
'// benchstat old.txt new.txt'}</code></pre>
      <p style={pStyle}>
        {isZh
          ? '常用 pprof 分析类型：profile（CPU）、heap（内存分配）、goroutine（goroutine 栈）、block（阻塞操作）、mutex（互斥锁争用）。生产环境中保持 pprof 端点开启但限制访问（内部网络或认证保护）。使用 -http 标志在浏览器中查看交互式火焰图。'
          : 'Common pprof profile types: profile (CPU), heap (memory allocations), goroutine (goroutine stacks), block (blocking operations), mutex (mutex contention). Keep pprof endpoints enabled in production but restrict access (internal network or auth-protected). Use the -http flag to view interactive flame graphs in the browser.'}
      </p>
      <div style={tipBoxStyle}>
        <strong>{isZh ? '提示：' : 'Tip: '}</strong>
        {isZh
          ? '优化前先用 benchmark 建立基线数据。修改后再次运行 benchmark，使用 benchstat 比较结果。只有统计显著的改进才值得合并。过早优化是万恶之源——先让代码正确，再让它快。'
          : 'Establish baseline data with benchmarks before optimizing. After changes, run benchmarks again and compare with benchstat. Only statistically significant improvements are worth merging. Premature optimization is the root of all evil -- make it correct first, then make it fast.'}
      </div>

      {/* Summary */}
      <h2 style={h2Style}>{isZh ? '总结' : 'Summary'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Go 的强大之处在于其简洁的并发模型、显式的错误处理和卓越的工具链。掌握 goroutine 与 channel 模式、context 取消传播、泛型类型约束、以及 pprof 性能分析，能够构建高效可靠的生产级系统。结合 worker pool、pipeline 等并发模式和表驱动测试，你的 Go 代码将兼具高性能和高可维护性。'
          : 'Go excels through its simple concurrency model, explicit error handling, and excellent tooling. Mastering goroutine and channel patterns, context cancellation propagation, generic type constraints, and pprof profiling empowers you to build efficient and reliable production systems. Combined with concurrency patterns like worker pools and pipelines plus table-driven testing, your Go code will achieve both high performance and maintainability.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '建议的学习路线：先理解 goroutine 和 channel 的基础，然后学习 context 包和错误处理模式，接着深入并发模式和测试，最后掌握性能分析和优化技巧。每个概念都建立在前一个概念之上，形成完整的高级 Go 知识体系。'
          : 'Recommended learning path: start with goroutine and channel fundamentals, then learn context and error handling patterns, proceed to concurrency patterns and testing, and finally master profiling and optimization. Each concept builds on the previous one, forming a complete advanced Go knowledge framework.'}
      </p>

      {/* Best Practices Summary Table */}
      <h2 style={h2Style}>{isZh ? '最佳实践速查表' : 'Best Practices Quick Reference'}</h2>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px 14px', textAlign: 'left', background: '#1e293b', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '主题' : 'Topic'}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', background: '#1e293b', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '推荐做法' : 'Do'}
              </th>
              <th style={{ padding: '10px 14px', textAlign: 'left', background: '#1e293b', color: '#f1f5f9', fontWeight: '600' }}>
                {isZh ? '避免做法' : 'Avoid'}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '并发' : 'Concurrency'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '使用 channel 通信，errgroup 管理' : 'Channel communication, errgroup management'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '共享内存无保护，裸 goroutine 泄露' : 'Unprotected shared memory, bare goroutine leaks'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '错误处理' : 'Errors'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '%w 包装，errors.Is/As 检查' : '%w wrapping, errors.Is/As checking'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '字符串比较错误，丢弃错误' : 'String-comparing errors, discarding errors'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '接口' : 'Interfaces'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '小接口，消费者端定义' : 'Small interfaces, consumer-side definition'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '大接口，过早抽象' : 'Large interfaces, premature abstraction'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '测试' : 'Testing'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '表驱动 + 模糊 + 基准测试' : 'Table-driven + fuzz + benchmarks'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '硬编码测试值，跳过边界测试' : 'Hard-coded test values, skipping edge cases'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '性能' : 'Performance'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? 'pprof 分析后再优化' : 'Profile with pprof before optimizing'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '过早优化，猜测瓶颈' : 'Premature optimization, guessing bottlenecks'}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: '600' }}>
                {isZh ? '内存' : 'Memory'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? 'sync.Pool 复用，减少逃逸' : 'sync.Pool reuse, reduce escapes'}
              </td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #e2e8f0', color: '#374151' }}>
                {isZh ? '频繁分配大对象，忽略 GC 压力' : 'Frequent large allocations, ignoring GC pressure'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <h2 style={h2Style}>{isZh ? '常见问题' : 'Frequently Asked Questions'}</h2>

      <h3 style={h3Style}>{isZh ? 'goroutine 与操作系统线程有什么区别？' : 'What are goroutines and how do they differ from OS threads?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'goroutine 是 Go 运行时管理的用户态轻量级线程，初始栈仅 2-8 KB（动态增长），而操作系统线程通常使用 1-8 MB。Go 调度器使用 M:N 模型将数千个 goroutine 多路复用到少量 OS 线程上，单机可轻松运行数百万个 goroutine。'
          : 'Goroutines are lightweight user-space threads managed by the Go runtime. They start with only 2-8 KB of stack (dynamically growing), compared to OS threads that typically use 1-8 MB. The Go scheduler multiplexes thousands of goroutines onto a small number of OS threads using an M:N model, easily running millions on a single machine.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'context 包如何实现取消？' : 'How does the context package work for cancellation in Go?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'context 包跨 goroutine 传播取消信号、截止时间和请求作用域值。使用 context.WithCancel 手动取消，context.WithTimeout 超时取消，context.WithDeadline 绝对截止时间取消。始终将 context 作为函数第一个参数，在长时间运行的操作中检查 ctx.Done()。'
          : 'The context package propagates cancellation signals, deadlines, and request-scoped values across goroutines. Use context.WithCancel for manual cancellation, context.WithTimeout for timeout-based, and context.WithDeadline for absolute deadline cancellation. Always pass context as the first parameter and check ctx.Done() in long-running operations.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Go 泛型如何与类型约束配合使用？' : 'How do Go generics work with type constraints?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Go 泛型使用定义为接口的类型约束。comparable 约束允许 == 和 != 运算符。any 约束接受所有类型。可以使用接口联合定义自定义约束（如 int | float64 | string）。golang.org/x/exp/constraints 提供常用数值约束。'
          : 'Go generics use type parameters with constraints defined as interfaces. The comparable constraint allows == and != operators. any accepts all types. Define custom constraints using interface unions (e.g., int | float64 | string). The golang.org/x/exp/constraints package provides common numeric constraints.'}
      </p>

      <h3 style={h3Style}>{isZh ? 'Go 错误处理的最佳实践是什么？' : 'What is the best practice for error handling in Go?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '使用 fmt.Errorf 和 %w 动词包装错误以添加上下文。errors.Is 比较哨兵错误，errors.As 进行类型断言。将哨兵错误定义为包级别变量。永远不要用 _ = fn() 丢弃错误，始终处理或传播。'
          : 'Use error wrapping with fmt.Errorf and the %w verb to add context. Check errors with errors.Is for sentinel comparison and errors.As for type assertion. Define sentinel errors as package-level variables. Never discard errors with _ = fn(); always handle or propagate them.'}
      </p>

      <h3 style={h3Style}>{isZh ? '什么是 Go 中的 worker pool 模式？' : 'What is a worker pool pattern in Go?'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'worker pool 使用固定数量的 goroutine 从共享的 jobs channel 读取任务并将结果写入 results channel。这限制了并发数，防止资源耗尽，并提供背压。用 for 循环启动 worker goroutine，通过 jobs channel 发送任务，完成后关闭 channel，从 results channel 收集结果。'
          : 'A worker pool uses a fixed number of goroutines reading from a shared jobs channel and writing results to a results channel. This limits concurrency, prevents resource exhaustion, and provides backpressure. Launch workers with a for loop, send jobs through the jobs channel, close it when done, and collect results.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何编写表驱动测试和模糊测试？' : 'How do I write table-driven tests and fuzz tests in Go?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '表驱动测试定义包含输入和预期输出的测试用例切片，然后使用 t.Run 循环执行子测试。模糊测试（Go 1.18+）使用 f.Fuzz 自动生成随机输入，用 f.Add 添加种子语料库。运行 go test -fuzz=FuzzFunctionName。模糊测试能发现手动测试遗漏的边界情况。'
          : 'Table-driven tests define a slice of test cases with input and expected output, looping through them with t.Run. Fuzz tests (Go 1.18+) use f.Fuzz to auto-generate random inputs with f.Add for seed corpus. Run with go test -fuzz=FuzzFunctionName. Fuzz testing finds edge cases manual tests miss.'}
      </p>

      <h3 style={h3Style}>{isZh ? '逃逸分析和 sync.Pool 如何工作？' : 'How does escape analysis work and how can I use sync.Pool?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '逃逸分析决定变量在栈还是堆上分配。使用 go build -gcflags="-m" 查看逃逸决策。返回指针、存入接口或被闭包捕获的变量会逃逸到堆。sync.Pool 提供可复用的临时对象集合，用 pool.Get() 获取、pool.Put() 归还，减少 GC 压力。'
          : 'Escape analysis determines whether a variable stays on the stack or escapes to the heap. Use go build -gcflags="-m" to see decisions. Variables escape when returned as pointers, stored in interfaces, or captured by closures. sync.Pool provides reusable temporary objects -- call pool.Get() to acquire and pool.Put() to return, reducing GC pressure.'}
      </p>

      <h3 style={h3Style}>{isZh ? '如何使用 pprof 分析 Go 应用性能？' : 'How do I profile Go applications with pprof?'}</h3>
      <p style={pStyle}>
        {isZh
          ? '导入 net/http/pprof 并注册其 handler。通过 /debug/pprof/profile 获取 CPU 分析，/debug/pprof/heap 获取堆内存分析，/debug/pprof/goroutine 获取 goroutine 栈。使用 go tool pprof 交互式分析：top 显示热点函数，list 显示源码注解，web 生成火焰图。使用 benchstat 比较不同版本的基准测试结果。'
          : 'Import net/http/pprof and register its handlers. Access CPU profiles at /debug/pprof/profile, heap profiles at /debug/pprof/heap, goroutine stacks at /debug/pprof/goroutine. Use go tool pprof interactively: top shows hottest functions, list shows annotated source, and web generates flame graphs. Use benchstat to compare benchmark results across versions.'}
      </p>
    </>
  );
}
