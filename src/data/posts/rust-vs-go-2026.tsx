'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Rust vs Go in 2026: Performance, Memory Safety, and When to Use Each',
    intro: 'Rust and Go are two of the most popular systems programming languages in 2026. Both offer strong concurrency support, excellent tooling, and growing ecosystems, but they make fundamentally different trade-offs. Go prioritizes simplicity and fast compilation, while Rust prioritizes zero-cost abstractions and memory safety without a garbage collector. This guide provides an in-depth comparison to help you choose the right language for your next project.',
    h2Philosophy: 'Language Philosophy',
    goPhilosophy: 'Go was created at Google in 2009 by Robert Griesemer, Rob Pike, and Ken Thompson. Its design philosophy centers on simplicity, readability, and fast compilation. Go deliberately omits features like inheritance and operator overloading to keep the language small and easy to learn. The mantra is: clear is better than clever.',
    rustPhilosophy: 'Rust was created at Mozilla and reached 1.0 in 2015. Its design philosophy centers on safety, concurrency, and performance. Rust uses an ownership system with borrowing rules enforced at compile time to guarantee memory safety without a garbage collector. The mantra is: fearless concurrency.',
    h2Performance: 'Performance Comparison',
    perfIntro: 'Both languages produce compiled native binaries, but their runtime characteristics differ significantly.',
    thMetric: 'Metric',
    thGo: 'Go 1.23',
    thRust: 'Rust 1.82',
    metricCompile: 'Compile time (medium project)',
    metricRuntime: 'Runtime performance',
    metricMemory: 'Memory usage',
    metricBinary: 'Binary size (hello world)',
    metricStartup: 'Startup time',
    metricGC: 'Garbage collection',
    valGoCompile: '~2-5 seconds',
    valRustCompile: '~30-120 seconds',
    valGoRuntime: 'Good (within 2-5x of C)',
    valRustRuntime: 'Excellent (on par with C/C++)',
    valGoMemory: 'Moderate (GC overhead)',
    valRustMemory: 'Minimal (no GC, zero-cost abstractions)',
    valGoBinary: '~1.8 MB',
    valRustBinary: '~300 KB (stripped)',
    valGoStartup: 'Fast (~5ms)',
    valRustStartup: 'Very fast (~1ms)',
    valGoGC: 'Yes (low-latency, concurrent)',
    valRustGC: 'None (ownership system)',
    h2MemorySafety: 'Memory Safety',
    memoryIntro: 'Memory safety is where Rust and Go take radically different approaches, both achieving safety but through completely different mechanisms.',
    h3GoMemory: 'Go: Garbage Collection',
    goMemoryDesc: 'Go uses a concurrent, tri-color mark-and-sweep garbage collector. The GC runs concurrently with your program, keeping pause times under 1ms in most cases. You allocate memory freely, and the GC reclaims it when no references remain. This simplifies programming but adds runtime overhead and can cause occasional latency spikes.',
    h3RustMemory: 'Rust: Ownership and Borrowing',
    rustMemoryDesc: 'Rust uses an ownership system enforced at compile time. Every value has exactly one owner, and when the owner goes out of scope, the value is dropped. References (borrows) can be either shared (immutable) or exclusive (mutable), but never both simultaneously. This prevents data races, use-after-free, double-free, and null pointer dereferences at compile time with zero runtime cost.',
    h2Concurrency: 'Concurrency Models',
    concurrencyIntro: 'Both languages excel at concurrency, but with different paradigms.',
    h3GoConcurrency: 'Go: Goroutines and Channels',
    goConcurrencyDesc: 'Go uses goroutines, which are lightweight green threads managed by the Go runtime. You can spawn millions of goroutines with minimal overhead. Communication between goroutines uses channels, following the CSP (Communicating Sequential Processes) model. The select statement enables multiplexing over multiple channels.',
    h3RustConcurrency: 'Rust: Async/Await and Threads',
    rustConcurrencyDesc: 'Rust provides both OS threads and async/await for concurrency. The async runtime (typically tokio or async-std) provides a lightweight task system similar to goroutines. The ownership system prevents data races at compile time, making concurrent code safer. The Send and Sync traits enforce thread safety guarantees.',
    h2ErrorHandling: 'Error Handling',
    h3GoErrors: 'Go: Multiple Return Values',
    goErrorsDesc: 'Go uses explicit error returns. Functions that can fail return (value, error) tuples. The caller must check the error explicitly. This is simple and explicit but can lead to verbose error-handling code.',
    h3RustErrors: 'Rust: Result and Option Types',
    rustErrorsDesc: 'Rust uses the Result<T, E> and Option<T> types for error handling. The ? operator provides concise error propagation. Pattern matching enforces exhaustive error handling. There are no null values in Rust, eliminating an entire class of bugs.',
    h2Ecosystem: 'Ecosystem and Tooling',
    h3GoEcosystem: 'Go Ecosystem',
    goEcosystemDesc: 'Go has a mature ecosystem with excellent standard library coverage. The go tool provides building, testing, formatting, vetting, and module management in a single binary. Popular frameworks include Gin and Echo for web, gRPC for services, and a strong container ecosystem (Docker and Kubernetes are written in Go).',
    h3RustEcosystem: 'Rust Ecosystem',
    rustEcosystemDesc: 'Rust has a rapidly growing ecosystem centered around crates.io and the cargo build system. Cargo handles dependencies, building, testing, documentation generation, and publishing. Popular frameworks include Actix-web and Axum for web, tonic for gRPC, and libraries like serde for serialization.',
    h2UseCases: 'Use Cases: When to Choose Each',
    h3ChooseGo: 'Choose Go When:',
    goUseCases: 'Cloud-native services and microservices|DevOps and infrastructure tooling (CLI tools, Kubernetes operators)|API servers and web backends|Rapid prototyping with team onboarding speed|Network services and proxies|Projects where fast compilation matters',
    h3ChooseRust: 'Choose Rust When:',
    rustUseCases: 'Systems programming (OS, drivers, embedded)|Performance-critical applications (game engines, databases)|WebAssembly targets|Command-line tools that need small binaries and fast startup|Security-critical code where memory safety is paramount|Real-time systems where GC pauses are unacceptable',
    h2Learning: 'Learning Curve',
    learningIntro: 'The learning curve is one of the biggest differences between Go and Rust.',
    goLearning: 'Go can be learned productively in a few days to a week. The language spec is small, the standard library is well-documented, and the conventions (gofmt, error handling patterns) are well-established. Most developers coming from Python, Java, or C can be productive quickly.',
    rustLearning: 'Rust has a steeper learning curve, typically taking weeks to months to become productive. The ownership and borrowing system, lifetimes, trait bounds, and advanced type system features require significant investment. However, once mastered, Rust developers report that the compiler catches entire categories of bugs that would otherwise be found at runtime.',
    h2Comparison: 'Feature Comparison Table',
    thFeature: 'Feature',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Rust faster than Go?',
    faq1A: 'In most benchmarks, Rust is 2-5x faster than Go for CPU-bound tasks and uses significantly less memory due to the absence of garbage collection. For I/O-bound tasks (web servers, database queries), the difference is smaller because the bottleneck is network or disk, not computation.',
    faq2Q: 'Can Rust replace Go?',
    faq2A: 'Not universally. Go excels in scenarios where development speed, team onboarding, and simplicity matter more than raw performance. Rust excels where performance, memory safety without GC, and zero-cost abstractions are critical. Many organizations use both: Go for services and Rust for performance-critical components.',
    faq3Q: 'Which has better job prospects?',
    faq3A: 'Go currently has more job listings due to its wider adoption in cloud infrastructure and web backends. Rust jobs are growing rapidly, especially in systems programming, blockchain, security, and companies like Amazon, Microsoft, and Google adopting Rust for critical infrastructure. Both are excellent for career growth.',
    faq4Q: 'Is Go easier than Rust?',
    faq4A: 'Yes, significantly. Go was designed for simplicity and can be learned in days. Rust requires understanding ownership, borrowing, lifetimes, and traits, which typically takes weeks to months. However, Rust catches more bugs at compile time, potentially saving debugging time later.',
    faq5Q: 'Which should I learn first?',
    faq5A: 'If you are new to systems programming, start with Go. Its simplicity lets you focus on learning concepts like concurrency and static typing without fighting the compiler. If you already know C/C++ or want to deeply understand memory management, Rust is a natural progression that teaches excellent programming habits.',
  },
  zh: {
    title: 'Rust vs Go 2026：性能、内存安全和选择指南',
    intro: 'Rust 和 Go 是 2026 年最流行的两种系统编程语言。两者都提供强大的并发支持、出色的工具链和不断增长的生态系统，但它们在设计上做出了根本不同的权衡。Go 优先考虑简单性和快速编译，而 Rust 优先考虑零成本抽象和无垃圾回收器的内存安全。',
    h2Philosophy: '语言哲学',
    goPhilosophy: 'Go 由 Google 的 Robert Griesemer、Rob Pike 和 Ken Thompson 于 2009 年创建。其设计理念以简单性、可读性和快速编译为中心。Go 有意省略了继承和运算符重载等特性，以保持语言的小巧和易学性。',
    rustPhilosophy: 'Rust 由 Mozilla 创建，于 2015 年达到 1.0 版本。其设计理念以安全性、并发性和性能为中心。Rust 使用在编译时强制执行的所有权系统和借用规则来保证内存安全，而无需垃圾回收器。',
    h2Performance: '性能比较',
    perfIntro: '两种语言都生成编译的原生二进制文件，但它们的运行时特性存在显著差异。',
    thMetric: '指标',
    thGo: 'Go 1.23',
    thRust: 'Rust 1.82',
    metricCompile: '编译时间（中等项目）',
    metricRuntime: '运行时性能',
    metricMemory: '内存使用',
    metricBinary: '二进制大小（hello world）',
    metricStartup: '启动时间',
    metricGC: '垃圾回收',
    valGoCompile: '约 2-5 秒',
    valRustCompile: '约 30-120 秒',
    valGoRuntime: '良好（C 的 2-5 倍内）',
    valRustRuntime: '优秀（与 C/C++ 持平）',
    valGoMemory: '中等（GC 开销）',
    valRustMemory: '极少（无 GC，零成本抽象）',
    valGoBinary: '约 1.8 MB',
    valRustBinary: '约 300 KB（stripped）',
    valGoStartup: '快速（约 5ms）',
    valRustStartup: '非常快（约 1ms）',
    valGoGC: '是（低延迟、并发）',
    valRustGC: '无（所有权系统）',
    h2MemorySafety: '内存安全',
    memoryIntro: '内存安全是 Rust 和 Go 采取根本不同方法的领域。',
    h3GoMemory: 'Go：垃圾回收',
    goMemoryDesc: 'Go 使用并发的三色标记-清除垃圾回收器。GC 与程序并发运行，在大多数情况下暂停时间低于 1ms。',
    h3RustMemory: 'Rust：所有权和借用',
    rustMemoryDesc: 'Rust 使用在编译时强制执行的所有权系统。每个值都有唯一的所有者，当所有者超出作用域时，值被丢弃。引用可以是共享的（不可变）或独占的（可变），但不能同时存在。',
    h2Concurrency: '并发模型',
    concurrencyIntro: '两种语言都擅长并发，但使用不同的范式。',
    h3GoConcurrency: 'Go：Goroutine 和 Channel',
    goConcurrencyDesc: 'Go 使用 goroutine，这是由 Go 运行时管理的轻量级绿色线程。你可以以极小的开销创建数百万个 goroutine。goroutine 之间使用 channel 通信。',
    h3RustConcurrency: 'Rust：Async/Await 和线程',
    rustConcurrencyDesc: 'Rust 同时提供操作系统线程和 async/await 并发机制。异步运行时（通常是 tokio 或 async-std）提供类似 goroutine 的轻量级任务系统。',
    h2ErrorHandling: '错误处理',
    h3GoErrors: 'Go：多返回值',
    goErrorsDesc: 'Go 使用显式错误返回。可能失败的函数返回 (value, error) 元组。调用者必须显式检查错误。',
    h3RustErrors: 'Rust：Result 和 Option 类型',
    rustErrorsDesc: 'Rust 使用 Result<T, E> 和 Option<T> 类型进行错误处理。? 运算符提供简洁的错误传播。模式匹配强制执行穷举错误处理。',
    h2Ecosystem: '生态系统和工具',
    h3GoEcosystem: 'Go 生态系统',
    goEcosystemDesc: 'Go 拥有成熟的生态系统和出色的标准库覆盖。go 工具在单个二进制文件中提供构建、测试、格式化和模块管理。',
    h3RustEcosystem: 'Rust 生态系统',
    rustEcosystemDesc: 'Rust 拥有以 crates.io 和 cargo 构建系统为中心的快速增长生态系统。cargo 处理依赖、构建、测试和发布。',
    h2UseCases: '使用场景：何时选择哪个',
    h3ChooseGo: '选择 Go 的场景：',
    goUseCases: '云原生服务和微服务|DevOps 和基础设施工具|API 服务器和 Web 后端|快速原型开发|网络服务和代理|需要快速编译的项目',
    h3ChooseRust: '选择 Rust 的场景：',
    rustUseCases: '系统编程（操作系统、驱动、嵌入式）|性能关键应用（游戏引擎、数据库）|WebAssembly 目标|需要小二进制和快速启动的 CLI 工具|安全关键代码|实时系统',
    h2Learning: '学习曲线',
    learningIntro: '学习曲线是 Go 和 Rust 之间最大的差异之一。',
    goLearning: 'Go 可以在几天到一周内学会并高效使用。语言规范小、标准库文档完善、约定成熟。',
    rustLearning: 'Rust 的学习曲线更陡峭，通常需要数周到数月才能高效使用。所有权、借用系统、生命周期和特征约束需要大量投入。',
    h2Comparison: '功能对比表',
    thFeature: '功能',
    h2Faq: '常见问题',
    faq1Q: 'Rust 比 Go 快吗？',
    faq1A: '在大多数基准测试中，Rust 在 CPU 密集型任务上比 Go 快 2-5 倍，并且由于没有垃圾回收而使用的内存明显更少。',
    faq2Q: 'Rust 能取代 Go 吗？',
    faq2A: '不能普遍取代。Go 在开发速度和简单性比原始性能更重要的场景中表现出色。许多组织同时使用两者。',
    faq3Q: '哪个就业前景更好？',
    faq3A: 'Go 目前的职位更多。Rust 的职位增长迅速，尤其是在系统编程和区块链领域。两者都适合职业发展。',
    faq4Q: 'Go 比 Rust 容易吗？',
    faq4A: '是的，明显更容易。Go 为简单性而设计，可以在几天内学会。Rust 需要理解所有权、借用、生命周期和特征。',
    faq5Q: '应该先学哪个？',
    faq5A: '如果你是系统编程新手，从 Go 开始。如果你已经了解 C/C++ 或想深入理解内存管理，Rust 是自然的进阶选择。',
  },
};

const goMemoryCode = `// Go: Memory is managed by the garbage collector
func processData() []byte {
    data := make([]byte, 1024)  // allocated on heap
    // ... use data ...
    return data  // GC will free when no references remain
}

func main() {
    for i := 0; i < 1000000; i++ {
        result := processData()
        _ = result
        // GC handles cleanup automatically
    }
}`;

const rustMemoryCode = `// Rust: Ownership system manages memory at compile time
fn process_data() -> Vec\u003cu8\u003e {
    let data = vec![0u8; 1024];  // allocated on heap
    data  // ownership transferred to caller
}   // if not returned, data is dropped here

fn main() {
    let result = process_data();  // result owns the data
    // result is dropped at end of scope, memory freed

    // Borrowing: share without transferring ownership
    let data = vec![1, 2, 3];
    let sum = calculate_sum(&data);  // borrow (immutable ref)
    println!("Data: {:?}, Sum: {}", data, sum);
}

fn calculate_sum(data: &[u8]) -> u32 {
    data.iter().map(|&x| x as u32).sum()
}`;

const goConcurrencyCode = `// Go: Goroutines and channels
func main() {
    ch := make(chan string, 10)

    // Spawn goroutines
    for i := 0; i < 10; i++ {
        go func(id int) {
            result := fmt.Sprintf("Worker %d done", id)
            ch \u003c- result  // send to channel
        }(i)
    }

    // Collect results
    for i := 0; i < 10; i++ {
        fmt.Println(\u003c-ch)  // receive from channel
    }
}

// Select for multiplexing channels
func multiplex(ch1, ch2 \u003c-chan string) {
    for {
        select {
        case msg := \u003c-ch1:
            fmt.Println("ch1:", msg)
        case msg := \u003c-ch2:
            fmt.Println("ch2:", msg)
        case \u003c-time.After(5 * time.Second):
            fmt.Println("timeout")
            return
        }
    }
}`;

const rustConcurrencyCode = `// Rust: Async/await with tokio
use tokio::sync::mpsc;

#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(10);

    for i in 0..10 {
        let tx = tx.clone();
        tokio::spawn(async move {
            let result = format!("Worker {} done", i);
            tx.send(result).await.unwrap();
        });
    }
    drop(tx);  // close sender

    while let Some(msg) = rx.recv().await {
        println!("{}", msg);
    }
}

// OS threads with Arc\u003cMutex\u003cT\u003e\u003e for shared state
use std::sync::{Arc, Mutex};
use std::thread;

fn threaded_example() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}`;

const goErrorCode = `// Go: Explicit error returns
func readFile(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("reading %s: %w", path, err)
    }
    return data, nil
}

func main() {
    data, err := readFile("config.json")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))
}`;

const rustErrorCode = `// Rust: Result type with ? operator
use std::fs;
use std::io;

fn read_file(path: &str) -> Result\u003cString, io::Error\u003e {
    let data = fs::read_to_string(path)?;  // ? propagates error
    Ok(data)
}

fn main() -> Result\u003c(), Box\u003cdyn std::error::Error\u003e\u003e {
    let data = read_file("config.json")?;
    println!("{}", data);

    // Pattern matching for exhaustive handling
    match read_file("missing.txt") {
        Ok(content) => println!("{}", content),
        Err(e) => eprintln!("Error: {}", e),
    }

    // Option\u003cT\u003e for nullable values (no null in Rust)
    let numbers = vec![1, 2, 3];
    match numbers.get(5) {
        Some(val) => println!("Found: {}", val),
        None => println!("Index out of bounds"),
    }

    Ok(())
}`;

const goToolchainCode = `# Go toolchain
go build ./...          # compile
go test ./...           # test
go fmt ./...            # format code
go vet ./...            # static analysis
go mod tidy             # manage dependencies

# Popular Go projects: Docker, Kubernetes, Terraform, Prometheus
# Web: Gin, Echo, Fiber, Chi
# gRPC: google.golang.org/grpc`;

const rustToolchainCode = `# Cargo toolchain
cargo build             # compile
cargo test              # test
cargo fmt               # format code
cargo clippy            # linting
cargo doc --open        # generate docs
cargo bench             # benchmarks

# Popular Rust projects: ripgrep, fd, bat, Deno, Alacritty
# Web: Actix-web, Axum, Rocket, Warp
# Async: Tokio, async-std`;

export default function RustVsGo2026({ lang }: { lang: string }) {
  const t = translations[lang] || translations.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t.faq1Q, acceptedAnswer: { '@type': 'Answer', text: t.faq1A } },
      { '@type': 'Question', name: t.faq2Q, acceptedAnswer: { '@type': 'Answer', text: t.faq2A } },
      { '@type': 'Question', name: t.faq3Q, acceptedAnswer: { '@type': 'Answer', text: t.faq3A } },
      { '@type': 'Question', name: t.faq4Q, acceptedAnswer: { '@type': 'Answer', text: t.faq4A } },
      { '@type': 'Question', name: t.faq5Q, acceptedAnswer: { '@type': 'Answer', text: t.faq5A } },
    ],
  };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* Language Philosophy */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Philosophy}</h2>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Go</h3>
      <p style={{ marginBottom: '1rem' }}>{t.goPhilosophy}</p>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Rust</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rustPhilosophy}</p>

      {/* Performance */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Performance}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.perfIntro}</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thMetric}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thGo}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thRust}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.metricCompile, t.valGoCompile, t.valRustCompile],
              [t.metricRuntime, t.valGoRuntime, t.valRustRuntime],
              [t.metricMemory, t.valGoMemory, t.valRustMemory],
              [t.metricBinary, t.valGoBinary, t.valRustBinary],
              [t.metricStartup, t.valGoStartup, t.valRustStartup],
              [t.metricGC, t.valGoGC, t.valRustGC],
            ].map(([metric, go, rust], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{metric}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{go}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{rust}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Memory Safety */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2MemorySafety}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.memoryIntro}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3GoMemory}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.goMemoryDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{goMemoryCode}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3RustMemory}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rustMemoryDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{rustMemoryCode}</code></pre>

      {/* Concurrency */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Concurrency}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.concurrencyIntro}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3GoConcurrency}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.goConcurrencyDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{goConcurrencyCode}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3RustConcurrency}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rustConcurrencyDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{rustConcurrencyCode}</code></pre>

      {/* Error Handling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2ErrorHandling}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3GoErrors}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.goErrorsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{goErrorCode}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3RustErrors}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rustErrorsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{rustErrorCode}</code></pre>

      {/* Ecosystem */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Ecosystem}</h2>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3GoEcosystem}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.goEcosystemDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{goToolchainCode}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3RustEcosystem}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.rustEcosystemDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{rustToolchainCode}</code></pre>

      {/* Use Cases */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2UseCases}</h2>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ChooseGo}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {t.goUseCases.split('|').map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3ChooseRust}</h3>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        {t.rustUseCases.split('|').map((item, i) => (
          <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
        ))}
      </ul>

      {/* Learning Curve */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Learning}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.learningIntro}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#60a5fa' }}>Go</h4>
          <p style={{ fontSize: '0.875rem' }}>{t.goLearning}</p>
        </div>
        <div style={{ backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#fb923c' }}>Rust</h4>
          <p style={{ fontSize: '0.875rem' }}>{t.rustLearning}</p>
        </div>
      </div>

      {/* Feature Comparison */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Comparison}</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'rgba(55,65,81,0.5)' }}>
            <tr>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>{t.thFeature}</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Go</th>
              <th style={{ border: '1px solid #374151', padding: '0.5rem 1rem', textAlign: 'left' }}>Rust</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Generics', 'Yes (since 1.18)', 'Yes (from day one)'],
              ['Inheritance', 'No (embedding)', 'No (traits + composition)'],
              ['Null safety', 'No (nil exists)', 'Yes (Option type)'],
              ['Pattern matching', 'switch (limited)', 'match (exhaustive)'],
              ['Macros', 'go generate', 'Declarative + procedural'],
              ['C interop', 'cgo (overhead)', 'FFI (zero-cost)'],
              ['Cross-compilation', 'GOOS/GOARCH', 'rustup target add'],
              ['Package manager', 'go modules', 'cargo + crates.io'],
              ['Language server', 'gopls', 'rust-analyzer'],
            ].map(([feat, go, rust], i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{feat}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{go}</td>
                <td style={{ border: '1px solid #374151', padding: '0.5rem 1rem' }}>{rust}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Faq}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A],
          [t.faq4Q, t.faq4A], [t.faq5Q, t.faq5A],
        ].map(([q, a], i) => (
          <div key={i} style={{ border: '1px solid #374151', borderRadius: '0.5rem', padding: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{q}</h3>
            <p style={{ color: '#d1d5db' }}>{a}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
