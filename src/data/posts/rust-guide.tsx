'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Rust Programming Language Complete Guide 2026: Ownership, Async, and Web Development',
    description: 'A comprehensive Rust programming guide covering ownership and borrowing, lifetimes, structs and enums, pattern matching, error handling with Result and Option, traits and generics, closures and iterators, async Rust with Tokio, Cargo package manager, common data structures, and web frameworks like Actix-web and Axum.',
    tldr: 'Rust gives you C/C++ performance with memory safety guaranteed at compile time — no garbage collector, no null pointer exceptions, no data races. Learn ownership (each value has one owner), borrowing (&T for read, &mut T for write), and lifetimes (how long references are valid). Use Result<T,E> for recoverable errors and Option<T> for nullable values. For async web services use Axum or Actix-web on top of Tokio runtime. Cargo is the best-in-class package manager: cargo new, cargo build, cargo test, cargo doc.',
  },
  zh: {
    title: 'Rust 编程语言完全指南 2026：所有权、异步与 Web 开发',
    description: '全面的 Rust 编程指南，涵盖所有权与借用、生命周期、结构体与枚举、模式匹配、Result 和 Option 错误处理、trait 与泛型、闭包与迭代器、Tokio 异步运行时、Cargo 包管理器、常用数据结构以及 Actix-web 和 Axum Web 框架。',
    tldr: 'Rust 在编译时保证内存安全，提供 C/C++ 级别的性能——无垃圾回收器、无空指针异常、无数据竞争。掌握所有权（每个值只有一个所有者）、借用（&T 只读借用，&mut T 可变借用）和生命周期（引用的有效时长）。用 Result<T,E> 处理可恢复错误，Option<T> 处理可空值。异步 Web 服务使用基于 Tokio 运行时的 Axum 或 Actix-web。Cargo 是一流的包管理器：cargo new、cargo build、cargo test、cargo doc。',
  },
};

export default function RustGuide({ lang }: { lang: string }) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const isZh = lang === 'zh';

  const faqData = [
    {
      question: isZh ? 'Rust 的所有权系统是什么？' : 'What is Rust\'s ownership system?',
      answer: isZh
        ? 'Rust 的所有权系统是其内存安全的核心机制，无需垃圾回收器。三条规则：1) 每个值有且只有一个所有者；2) 当所有者离开作用域，值被自动释放（drop）；3) 值在任意时刻只能有一个可变引用或多个不可变引用，但不能同时存在两者。这些规则在编译时强制执行，消除了悬空指针、重复释放和数据竞争等内存安全问题。'
        : 'Rust\'s ownership system is the core mechanism for memory safety without a garbage collector. Three rules: 1) Each value has exactly one owner; 2) When the owner goes out of scope, the value is automatically dropped (freed); 3) At any given time a value can have either one mutable reference (&mut T) OR any number of immutable references (&T), but not both simultaneously. These rules are enforced at compile time, eliminating dangling pointers, double frees, and data races.',
    },
    {
      question: isZh ? '借用和引用有什么区别？' : 'What is the difference between borrowing and references in Rust?',
      answer: isZh
        ? '引用（&T）是借用的语法形式，借用是操作的语义描述。不可变借用 &T 允许读取但不允许修改，可以同时存在多个。可变借用 &mut T 允许读写，但在同一作用域内同一数据只能有一个可变借用存在，且不能与不可变借用共存。借用检查器（borrow checker）在编译时验证所有引用在其被使用期间都是有效的，防止悬空引用。'
        : 'A reference (&T) is the syntactic form; borrowing is the semantic concept. An immutable borrow &T allows reading but not modification, and multiple immutable borrows can coexist. A mutable borrow &mut T allows reading and writing, but only one mutable borrow of the same data can exist in a given scope, and it cannot coexist with immutable borrows. The borrow checker validates at compile time that all references remain valid for their entire lifetime, preventing dangling references.',
    },
    {
      question: isZh ? '什么是生命周期，什么时候需要标注生命周期？' : 'What are lifetimes and when do I need to annotate them?',
      answer: isZh
        ? '生命周期描述引用保持有效的作用域范围，防止悬空引用。Rust 编译器通过生命周期省略规则（lifetime elision rules）在大多数情况下自动推断生命周期。需要显式标注的场景：函数返回引用时（返回值的生命周期必须与某个参数生命周期关联）、结构体包含引用字段时、在 impl 块中实现含引用的方法时。语法：fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str，表示返回值的生命周期不长于 x 和 y 中较短的那个。'
        : 'Lifetimes describe the scope for which a reference remains valid, preventing dangling references. The Rust compiler uses lifetime elision rules to infer lifetimes in most cases automatically. Explicit annotation is required when: a function returns a reference (the return lifetime must be tied to a parameter lifetime), a struct holds reference fields, or implementing methods with references in impl blocks. Syntax: fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str — meaning the return value lives no longer than the shorter of x and y.',
    },
    {
      question: isZh ? 'Result 和 Option 有什么区别？' : 'What is the difference between Result and Option in Rust?',
      answer: isZh
        ? 'Option<T> 表示一个值可能存在（Some(T)）也可能不存在（None），用于可空值场景，例如哈希表查找或可选配置。Result<T, E> 表示操作可能成功（Ok(T)）或失败（Err(E)），用于错误处理，例如文件 I/O、网络请求、解析操作。? 运算符可在返回 Result 或 Option 的函数中自动传播错误或 None：遇到 Err 或 None 时立即返回，否则解包值继续执行。生产代码中应优先使用 ? 运算符而非 unwrap()，避免 panic。'
        : 'Option<T> represents a value that may or may not exist — Some(T) or None — used for nullable values like hash map lookups or optional configuration. Result<T, E> represents an operation that may succeed (Ok(T)) or fail (Err(E)), used for error handling in file I/O, network requests, and parsing. The ? operator propagates errors or None automatically in functions returning Result or Option: it returns early on Err/None or unwraps the value to continue. Always prefer ? over unwrap() in production code to avoid panics.',
    },
    {
      question: isZh ? 'trait 和接口有什么区别？' : 'How are Rust traits different from interfaces in other languages?',
      answer: isZh
        ? 'Rust 的 trait 类似于其他语言的接口，但更强大。区别：1) Rust trait 可以有默认方法实现；2) 可以为外部类型实现自己的 trait（孤儿规则：trait 或类型至少有一个在当前 crate 中定义）；3) trait object（dyn Trait）支持运行时多态，泛型约束（T: Trait）支持零成本的静态多态；4) trait 可以作为函数参数（impl Trait 语法）或返回类型。标准库中重要的 trait 包括 Clone、Copy、Debug、Display、Iterator、From/Into 和 Serialize/Deserialize（serde）。'
        : 'Rust traits are similar to interfaces but more powerful. Key differences: 1) Traits can have default method implementations; 2) You can implement your own trait for an external type (orphan rule: either the trait or the type must be defined in the current crate); 3) Trait objects (dyn Trait) support runtime polymorphism while generic bounds (T: Trait) provide zero-cost static dispatch; 4) Traits can be used as function parameters (impl Trait syntax) or return types. Important standard library traits include Clone, Copy, Debug, Display, Iterator, From/Into, and Serialize/Deserialize (via serde).',
    },
    {
      question: isZh ? 'Tokio 是什么？如何在 Rust 中编写异步代码？' : 'What is Tokio and how do I write async code in Rust?',
      answer: isZh
        ? 'Tokio 是 Rust 最主流的异步运行时，提供异步 I/O、任务调度、定时器和网络原语。Rust 的 async/await 语法生成状态机（Future），Tokio 运行时负责轮询和执行这些 Future。关键概念：async fn 返回 impl Future；.await 暂停当前任务直到 Future 完成；tokio::spawn 创建并发任务（类似 goroutine）；tokio::select! 同时等待多个 Future，取先完成的。使用 #[tokio::main] 宏初始化运行时并运行 async main 函数。'
        : 'Tokio is Rust\'s most popular async runtime, providing async I/O, task scheduling, timers, and network primitives. Rust\'s async/await syntax generates state machines (Futures), and the Tokio runtime polls and drives these Futures. Key concepts: async fn returns impl Future; .await suspends the current task until the Future completes; tokio::spawn creates concurrent tasks (similar to goroutines); tokio::select! waits on multiple Futures and takes the first to complete. Use the #[tokio::main] macro to initialize the runtime and run the async main function.',
    },
    {
      question: isZh ? 'Rust 和 C++ 相比有什么优势？' : 'What advantages does Rust have over C++?',
      answer: isZh
        ? 'Rust 相对 C++ 的主要优势：1) 内存安全：编译器通过所有权和借用检查消除悬空指针、缓冲区溢出、数据竞争，而 C++ 依赖程序员手动管理；2) 并发安全：Send 和 Sync trait 使数据竞争在编译时不可能发生；3) 更现代的工具链：Cargo 提供统一的包管理、构建系统和测试框架；4) 更友好的错误提示：Rust 编译器的错误信息明确指出问题所在；5) 无未定义行为（在 safe Rust 中）。性能方面两者相当，底层都可以做零成本抽象，但 C++ 的生态系统和历史代码库更成熟。'
        : 'Rust\'s main advantages over C++: 1) Memory safety: the compiler eliminates dangling pointers, buffer overflows, and data races through ownership and borrow checking, whereas C++ relies on programmer discipline; 2) Concurrency safety: Send and Sync traits make data races impossible at compile time; 3) Better tooling: Cargo provides a unified package manager, build system, and test runner; 4) Superior error messages: Rust\'s compiler pinpoints exact problems with actionable suggestions; 5) No undefined behavior in safe Rust. Performance is comparable — both support zero-cost abstractions — but C++ has a more mature ecosystem and larger legacy codebase.',
    },
    {
      question: isZh ? '如何在 Rust 中构建 Web API？' : 'How do I build a web API in Rust?',
      answer: isZh
        ? '主流选择是 Axum 或 Actix-web。Axum（tokio-rs/axum）基于 Tower 中间件生态和 Tokio，使用 Extractor 模式解析请求（Path、Query、Json），路由通过 Router::new().route() 定义，适合熟悉 Tower 生态的团队。Actix-web 是高性能 actor 模型框架，性能基准测试中常名列前茅，API 风格更接近传统 Web 框架。两者都使用 serde 进行 JSON 序列化，sqlx 或 SeaORM 连接数据库，tower-http 处理 CORS/日志/压缩中间件。'
        : 'The mainstream choices are Axum or Actix-web. Axum (tokio-rs/axum) is built on the Tower middleware ecosystem and Tokio, using an Extractor pattern to parse requests (Path, Query, Json), with routing defined via Router::new().route() — ideal for teams familiar with the Tower ecosystem. Actix-web is a high-performance actor-model framework that consistently ranks near the top in benchmarks, with an API style closer to traditional web frameworks. Both use serde for JSON serialization, sqlx or SeaORM for database access, and tower-http for CORS/logging/compression middleware.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <article style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1rem', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1e293b', lineHeight: '1.7' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '16px', margin: '24px 0', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#0369a1', marginBottom: '0.5rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TL;DR</p>
        <p style={{ margin: 0, color: '#0c4a6e', fontSize: '1rem' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '8px', margin: '24px 0' }}>
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>
          {isZh ? '核心要点' : 'Key Takeaways'}
        </h2>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Rust 通过所有权系统在编译时消除内存安全问题，无需垃圾回收器，性能与 C/C++ 相当。' : 'Rust eliminates memory safety issues at compile time through the ownership system — no garbage collector, performance equivalent to C/C++.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '每个值有且只有一个所有者；借用规则：同一时刻要么有多个 &T，要么只有一个 &mut T，两者不能共存。' : 'Every value has exactly one owner; borrowing rules: either multiple &T or exactly one &mut T at a time — never both simultaneously.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? '用 Result<T,E> 处理可恢复错误，用 Option<T> 处理可空值；? 运算符自动传播错误，避免 unwrap() panic。' : 'Use Result<T,E> for recoverable errors and Option<T> for nullable values; the ? operator propagates errors automatically — avoid unwrap() in production.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'trait 是 Rust 的多态机制；泛型约束（T: Trait）实现零成本静态分发，dyn Trait 支持运行时动态分发。' : 'Traits are Rust\'s polymorphism mechanism; generic bounds (T: Trait) give zero-cost static dispatch while dyn Trait enables runtime dynamic dispatch.'}</li>
          <li style={{ marginBottom: '0.5rem', color: '#334155' }}>{isZh ? 'Tokio 是最主流的异步运行时；Axum 和 Actix-web 是构建高性能 Web API 的首选框架。' : 'Tokio is the dominant async runtime; Axum and Actix-web are the top choices for building high-performance web APIs.'}</li>
          <li style={{ marginBottom: '0', color: '#334155' }}>{isZh ? 'Cargo 是一流的包管理器和构建工具：cargo new、cargo build、cargo test、cargo clippy、cargo doc 覆盖完整开发工作流。' : 'Cargo is a best-in-class package manager and build tool: cargo new, cargo build, cargo test, cargo clippy, and cargo doc cover the entire development workflow.'}</li>
        </ul>
      </div>

      {/* Section 1: What is Rust */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '1. 什么是 Rust？为什么开发者喜爱它？' : '1. What Is Rust and Why Do Developers Love It?'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 是 Mozilla 在 2010 年开始开发、2015 年正式发布的系统编程语言。它的目标是提供 C/C++ 级别的性能，同时通过独特的所有权系统在编译时保证内存安全，无需垃圾回收器。Rust 连续九年（2016-2024）在 Stack Overflow 开发者调查中荣登"最受喜爱语言"榜首，已被 Linux 内核、Windows、Android、Firefox、Cloudflare、AWS、Meta、Google 等大型项目和公司采用。'
          : 'Rust is a systems programming language started by Mozilla in 2010 and officially released in 2015. Its goal is to deliver C/C++-level performance while guaranteeing memory safety at compile time through a unique ownership system — no garbage collector required. Rust has topped Stack Overflow\'s "Most Loved Language" survey for nine consecutive years (2016–2024) and has been adopted by the Linux kernel, Windows, Android, Firefox, Cloudflare, AWS, Meta, Google, and many other major projects.'}
      </p>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 解决的核心问题：C/C++ 中约 70% 的安全漏洞来自内存安全问题（悬空指针、缓冲区溢出、数据竞争）。Rust 通过编译时检查完全消除这类问题，而不是依赖运行时的垃圾回收或手动内存管理。'
          : 'The core problem Rust solves: roughly 70% of security vulnerabilities in C/C++ codebases stem from memory safety issues — dangling pointers, buffer overflows, data races. Rust eliminates these at compile time rather than relying on runtime garbage collection or manual memory management.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Your first Rust program\n' +
          'fn main() {\n' +
          '    // Variables are immutable by default\n' +
          '    let name = "Rust";\n' +
          '    let mut counter = 0;   // mut makes it mutable\n\n' +
          '    println!("Hello from {}!", name);\n\n' +
          '    // Loops, conditions, and expressions\n' +
          '    for i in 1..=5 {\n' +
          '        counter += i;\n' +
          '    }\n' +
          '    println!("Sum 1..5 = {}", counter);  // 15\n\n' +
          '    // Everything is an expression\n' +
          '    let result = if counter > 10 {\n' +
          '        "greater than 10"\n' +
          '    } else {\n' +
          '        "10 or less"\n' +
          '    };\n' +
          '    println!("Result: {}", result);\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Rust vs C++ vs Go — Language Comparison\n' +
          '=========================================\n\n' +
          'Feature              Rust              C++              Go\n' +
          '-------              ----              ---              --\n' +
          'Memory Safety        Compile-time      Manual           GC (runtime)\n' +
          'Garbage Collector    No                No               Yes\n' +
          'Null Safety          Option<T>         Raw pointers     nil (runtime)\n' +
          'Concurrency Safety   Compile-time      Manual           Goroutines+GC\n' +
          'Performance          C-equivalent      C-equivalent     ~20-50% slower\n' +
          'Compile Speed        Slower            Medium           Very fast\n' +
          'Runtime              Zero-size         Zero-size        Small runtime\n' +
          'Error Handling       Result<T,E>       Exceptions/codes errors (multiple return)\n' +
          'Generics             Yes (monomorphic) Yes (templates)  Yes (1.18+)\n' +
          'Async/Await          Yes (Tokio)       Yes (C++20)      Goroutines\n' +
          'Package Manager      Cargo             vcpkg/Conan/...  Go modules\n' +
          'Learning Curve       Steep             Very steep       Gentle\n' +
          'Best For             Systems, WebAsm   Systems, games   Cloud, CLIs, APIs\n\n' +
          'Choose Rust when:\n' +
          '  - Memory safety is critical (security software, OS kernels)\n' +
          '  - Zero-cost abstractions with no GC pauses (game engines, real-time)\n' +
          '  - WebAssembly targets\n' +
          '  - Embedded systems or resource-constrained environments\n\n' +
          'Choose C++ when:\n' +
          '  - Existing large C++ codebase\n' +
          '  - Graphics/game engines (Unreal, etc.)\n' +
          '  - Maximum ecosystem maturity\n\n' +
          'Choose Go when:\n' +
          '  - Cloud-native microservices and CLIs\n' +
          '  - Team prefers simplicity over raw performance\n' +
          '  - Fast build times are a priority'
        }</code>
      </pre>

      {/* Section 2: Installation and First Project */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '2. 安装 Rust 与创建第一个项目' : '2. Installing Rust and Creating Your First Project'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 通过 rustup 工具链管理器安装，rustup 可以管理多个 Rust 版本（stable、beta、nightly）和交叉编译目标。安装后，rustc 编译器、Cargo 包管理器和标准库文档全部就绪。'
          : 'Rust is installed through rustup, the toolchain manager, which handles multiple Rust versions (stable, beta, nightly) and cross-compilation targets. After installation, the rustc compiler, Cargo package manager, and standard library docs are all ready to use.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '安装与工具链管理' : 'Installation and Toolchain Management'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Install rustup (macOS/Linux)\n' +
          'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh\n\n' +
          '# Windows: download rustup-init.exe from https://rustup.rs\n\n' +
          '# Verify installation\n' +
          'rustc --version    # rustc 1.76.0 (07dca489a 2024-02-04)\n' +
          'cargo --version    # cargo 1.76.0\n\n' +
          '# Update Rust\n' +
          'rustup update\n\n' +
          '# Install nightly for experimental features\n' +
          'rustup install nightly\n' +
          'rustup default nightly\n\n' +
          '# Add a compilation target (cross-compile)\n' +
          'rustup target add wasm32-unknown-unknown    # WebAssembly\n' +
          'rustup target add x86_64-pc-windows-gnu    # Windows from Linux\n\n' +
          '# Install useful tools\n' +
          'cargo install cargo-watch   # auto-rebuild on change\n' +
          'cargo install cargo-expand  # expand macros\n' +
          'cargo install cargo-audit   # security vulnerability audit\n' +
          'cargo install cargo-flamegraph  # profiling\n' +
          'rustup component add clippy     # linter\n' +
          'rustup component add rustfmt    # formatter'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Cargo：Rust 的包管理器与构建系统' : 'Cargo: The Package Manager and Build System'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Create a new binary project\n' +
          'cargo new my-project\n' +
          'cd my-project\n\n' +
          '# Create a new library project\n' +
          'cargo new my-lib --lib\n\n' +
          '# Project structure\n' +
          'my-project/\n' +
          '  Cargo.toml     # project manifest (like package.json)\n' +
          '  Cargo.lock     # exact dependency versions (commit to VCS for bins)\n' +
          '  src/\n' +
          '    main.rs      # entry point for binary\n' +
          '  tests/         # integration tests\n' +
          '  benches/       # benchmarks\n' +
          '  examples/      # example programs\n\n' +
          '# Build commands\n' +
          'cargo build               # debug build (fast compile, slow runtime)\n' +
          'cargo build --release     # optimized build (slow compile, fast runtime)\n' +
          'cargo run                 # build + run\n' +
          'cargo run --release       # optimized run\n' +
          'cargo test                # run all tests\n' +
          'cargo test my_function    # run tests matching a name\n' +
          'cargo doc --open          # build and open documentation\n' +
          'cargo clippy              # lint with Clippy\n' +
          'cargo fmt                 # format code\n' +
          'cargo check               # fast type-check without producing binary\n' +
          'cargo clean               # remove build artifacts\n\n' +
          '# Cargo.toml example\n' +
          '[package]\n' +
          'name = "my-project"\n' +
          'version = "0.1.0"\n' +
          'edition = "2021"\n\n' +
          '[dependencies]\n' +
          'serde = { version = "1", features = ["derive"] }\n' +
          'tokio = { version = "1", features = ["full"] }\n' +
          'anyhow = "1"\n' +
          'reqwest = { version = "0.11", features = ["json"] }\n\n' +
          '[dev-dependencies]\n' +
          'mockall = "0.11"\n\n' +
          '[profile.release]\n' +
          'opt-level = 3\n' +
          'lto = true         # link-time optimization'
        }</code>
      </pre>

      {/* Section 3: Ownership, Borrowing, Lifetimes */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '3. 所有权、借用与生命周期' : '3. Ownership, Borrowing, and Lifetimes'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? '所有权系统是 Rust 最独特的特性，也是理解 Rust 的关键。它使 Rust 不需要垃圾回收器就能保证内存安全，也是初学者遇到的主要挑战——借用检查器（borrow checker）会在编译时拒绝不安全的代码。'
          : 'The ownership system is Rust\'s most unique feature and the key to understanding the language. It enables Rust to guarantee memory safety without a garbage collector, and is the primary challenge for beginners — the borrow checker rejects unsafe code at compile time.'}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '所有权规则与移动语义' : 'Ownership Rules and Move Semantics'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'fn main() {\n' +
          '    // Rule 1: each value has one owner\n' +
          '    let s1 = String::from("hello");   // s1 owns the String\n\n' +
          '    // Rule 2: when owner goes out of scope, value is dropped\n' +
          '    {\n' +
          '        let s2 = String::from("world");\n' +
          '        println!("{}", s2);   // s2 valid here\n' +
          '    }  // s2 dropped here, memory freed automatically\n\n' +
          '    // Move semantics: ownership transfer\n' +
          '    let s3 = s1;             // s1 is MOVED to s3\n' +
          '    // println!("{}", s1);  // ERROR: s1 is no longer valid!\n' +
          '    println!("{}", s3);      // OK\n\n' +
          '    // Clone: explicit deep copy\n' +
          '    let s4 = s3.clone();\n' +
          '    println!("{} and {}", s3, s4);  // both valid\n\n' +
          '    // Copy types (stack-allocated primitives): implicit copy\n' +
          '    let x = 5;\n' +
          '    let y = x;               // x is COPIED, not moved\n' +
          '    println!("{} and {}", x, y);  // both valid\n' +
          '    // Types that implement Copy: i32, f64, bool, char, tuples of Copy types\n' +
          '}\n\n' +
          '// Ownership and functions\n' +
          'fn takes_ownership(s: String) {    // s moves into this function\n' +
          '    println!("{}", s);\n' +
          '}  // s is dropped here\n\n' +
          'fn gives_ownership() -> String {   // returns ownership to caller\n' +
          '    String::from("mine")\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '借用与引用' : 'Borrowing and References'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'fn main() {\n' +
          '    let s = String::from("hello");\n\n' +
          '    // Immutable borrow: &T\n' +
          '    let len = calculate_length(&s);  // pass reference, not ownership\n' +
          '    println!("Length of s is: {}", len);  // s still valid here\n\n' +
          '    // Mutable borrow: &mut T\n' +
          '    let mut s2 = String::from("hello");\n' +
          '    change(&mut s2);\n' +
          '    println!("{}", s2);  // "hello, world"\n\n' +
          '    // Borrow rules demonstration\n' +
          '    let mut s3 = String::from("test");\n' +
          '    let r1 = &s3;      // immutable borrow 1 - OK\n' +
          '    let r2 = &s3;      // immutable borrow 2 - OK (multiple &T allowed)\n' +
          '    println!("{} {}", r1, r2);   // last use of r1, r2\n' +
          '    // r1 and r2 are no longer used after this point (NLL: Non-Lexical Lifetimes)\n' +
          '    let r3 = &mut s3;  // mutable borrow - OK (r1, r2 no longer active)\n' +
          '    r3.push_str(" done");\n' +
          '    // println!("{} {}", r1, r3); // ERROR: can\'t mix &T and &mut T\n' +
          '}\n\n' +
          'fn calculate_length(s: &String) -> usize {\n' +
          '    s.len()  // can read, cannot modify\n' +
          '}\n\n' +
          'fn change(s: &mut String) {\n' +
          '    s.push_str(", world");  // can modify through &mut\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '生命周期标注' : 'Lifetime Annotations'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Lifetime annotation: explicit when compiler can\'t infer\n' +
          '// \'a is a lifetime parameter (\'a is conventional, any letter works)\n\n' +
          '// Without annotation this would fail — compiler doesn\'t know\n' +
          '// if the return value lives as long as x or y\n' +
          'fn longest<\'a>(x: &\'a str, y: &\'a str) -> &\'a str {\n' +
          '    if x.len() > y.len() { x } else { y }\n' +
          '    // \'a means: return value lives at least as long as the\n' +
          '    // shorter of x and y\'s lifetimes\n' +
          '}\n\n' +
          '// Struct with a reference field — requires lifetime annotation\n' +
          'struct Excerpt<\'a> {\n' +
          '    text: &\'a str,   // text must live as long as this struct\n' +
          '}\n\n' +
          'impl<\'a> Excerpt<\'a> {\n' +
          '    fn announce(&self, msg: &str) -> &str {\n' +
          '        println!("Attention: {}", msg);\n' +
          '        self.text  // lifetime elision: return has same lifetime as &self\n' +
          '    }\n' +
          '}\n\n' +
          'fn main() {\n' +
          '    let s1 = String::from("long string");\n' +
          '    let result;\n' +
          '    {\n' +
          '        let s2 = String::from("xyz");\n' +
          '        result = longest(s1.as_str(), s2.as_str());\n' +
          '        println!("Longest: {}", result);  // OK: result used within s2\'s scope\n' +
          '    }\n' +
          '    // println!("{}", result);  // ERROR: s2 dropped, result might dangle\n' +
          '}'
        }</code>
      </pre>

      {/* Section 4: Structs, Enums, Pattern Matching */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '4. 结构体、枚举与模式匹配' : '4. Structs, Enums, and Pattern Matching'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 的枚举（enum）比大多数语言的枚举更强大——每个变体可以携带不同类型和数量的数据，本质上是代数数据类型（ADT）。结合穷举的模式匹配，可以写出类型安全且表达力极强的代码。'
          : "Rust's enums are far more powerful than enums in most languages — each variant can carry different types and amounts of data, making them algebraic data types (ADTs). Combined with exhaustive pattern matching, they enable type-safe and highly expressive code."}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '结构体与方法' : 'Structs and Methods'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Named struct\n' +
          '#[derive(Debug, Clone)]  // auto-implement Debug and Clone traits\n' +
          'struct User {\n' +
          '    username: String,\n' +
          '    email: String,\n' +
          '    active: bool,\n' +
          '    login_count: u32,\n' +
          '}\n\n' +
          '// Tuple struct (named tuple)\n' +
          'struct Point(f64, f64, f64);\n' +
          'struct Color(u8, u8, u8);\n\n' +
          '// Unit struct (no fields, useful for traits)\n' +
          'struct AlwaysEqual;\n\n' +
          '// Implementing methods\n' +
          'impl User {\n' +
          '    // Associated function (no self): constructor\n' +
          '    fn new(username: String, email: String) -> Self {\n' +
          '        User {\n' +
          '            username,\n' +
          '            email,\n' +
          '            active: true,\n' +
          '            login_count: 0,\n' +
          '        }\n' +
          '    }\n\n' +
          '    // Method with immutable borrow\n' +
          '    fn is_active(&self) -> bool {\n' +
          '        self.active\n' +
          '    }\n\n' +
          '    // Method with mutable borrow\n' +
          '    fn deactivate(&mut self) {\n' +
          '        self.active = false;\n' +
          '    }\n\n' +
          '    // Method that consumes self\n' +
          '    fn into_email(self) -> String {\n' +
          '        self.email\n' +
          '    }\n' +
          '}\n\n' +
          'fn main() {\n' +
          '    let mut user = User::new(\n' +
          '        String::from("alice"),\n' +
          '        String::from("alice@example.com"),\n' +
          '    );\n' +
          '    println!("{:?}", user);   // Debug output\n' +
          '    user.deactivate();\n\n' +
          '    // Struct update syntax\n' +
          '    let user2 = User {\n' +
          '        email: String::from("bob@example.com"),\n' +
          '        ..user   // remaining fields from user (moved)\n' +
          '    };\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '枚举与模式匹配' : 'Enums and Pattern Matching'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Enum with data in variants (ADT)\n' +
          '#[derive(Debug)]\n' +
          'enum Shape {\n' +
          '    Circle(f64),              // radius\n' +
          '    Rectangle(f64, f64),      // width, height\n' +
          '    Triangle { base: f64, height: f64 },  // named fields\n' +
          '}\n\n' +
          'impl Shape {\n' +
          '    fn area(&self) -> f64 {\n' +
          '        match self {\n' +
          '            Shape::Circle(r) => std::f64::consts::PI * r * r,\n' +
          '            Shape::Rectangle(w, h) => w * h,\n' +
          '            Shape::Triangle { base, height } => 0.5 * base * height,\n' +
          '        }\n' +
          '    }\n' +
          '}\n\n' +
          '// Message enum — common Rust pattern\n' +
          'enum Message {\n' +
          '    Quit,\n' +
          '    Move { x: i32, y: i32 },\n' +
          '    Write(String),\n' +
          '    ChangeColor(u8, u8, u8),\n' +
          '}\n\n' +
          '// Pattern matching — must be exhaustive\n' +
          'fn process_message(msg: Message) {\n' +
          '    match msg {\n' +
          '        Message::Quit => println!("Quitting"),\n' +
          '        Message::Move { x, y } => println!("Move to ({}, {})", x, y),\n' +
          '        Message::Write(text) => println!("Write: {}", text),\n' +
          '        Message::ChangeColor(r, g, b) => println!("Color: rgb({},{},{})", r, g, b),\n' +
          '    }\n' +
          '}\n\n' +
          '// if let — match a single pattern\n' +
          'fn check_coin(coin: Option<u32>) {\n' +
          '    if let Some(value) = coin {\n' +
          '        println!("Got {} cents", value);\n' +
          '    } else {\n' +
          '        println!("No coin");\n' +
          '    }\n' +
          '}\n\n' +
          '// while let — loop until pattern fails\n' +
          'fn drain_stack(stack: &mut Vec<i32>) {\n' +
          '    while let Some(top) = stack.pop() {\n' +
          '        println!("{}", top);\n' +
          '    }\n' +
          '}'
        }</code>
      </pre>

      {/* Section 5: Error Handling */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '5. 错误处理：Result 与 Option' : '5. Error Handling with Result and Option'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 没有异常机制。错误处理通过两种类型完成：Option<T> 处理值可能不存在的情况，Result<T, E> 处理操作可能失败的情况。这种显式的错误处理迫使开发者在编写代码时就考虑错误路径，是 Rust 程序可靠性高的重要原因。'
          : 'Rust has no exceptions. Error handling is done through two types: Option<T> for values that might not exist, and Result<T, E> for operations that might fail. This explicit error handling forces developers to address error paths at the point of writing, which is a major reason Rust programs are highly reliable.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use std::fs;\n' +
          'use std::num::ParseIntError;\n\n' +
          '// Option<T> — value might be absent\n' +
          'fn find_first_even(numbers: &[i32]) -> Option<i32> {\n' +
          '    numbers.iter().find(|&&n| n % 2 == 0).copied()\n' +
          '}\n\n' +
          '// Result<T, E> — operation might fail\n' +
          'fn parse_number(s: &str) -> Result<i32, ParseIntError> {\n' +
          '    s.trim().parse::<i32>()\n' +
          '}\n\n' +
          '// ? operator — early return on error\n' +
          'fn read_and_parse(path: &str) -> Result<i32, Box<dyn std::error::Error>> {\n' +
          '    let content = fs::read_to_string(path)?;   // returns Err if file missing\n' +
          '    let number = content.trim().parse::<i32>()?;  // returns Err if not a number\n' +
          '    Ok(number * 2)\n' +
          '}\n\n' +
          '// Handling Results with combinators\n' +
          'fn demonstrate_combinators() {\n' +
          '    // map: transform Ok value\n' +
          '    let doubled = parse_number("21").map(|n| n * 2);\n' +
          '    println!("{:?}", doubled);  // Ok(42)\n\n' +
          '    // and_then: chain fallible operations\n' +
          '    let result = parse_number("10")\n' +
          '        .and_then(|n| if n > 0 { Ok(n) } else { Err("0".parse::<i32>().unwrap_err()) });\n\n' +
          '    // unwrap_or: provide default value\n' +
          '    let val = parse_number("abc").unwrap_or(0);\n' +
          '    println!("{}", val);  // 0\n\n' +
          '    // unwrap_or_else: compute default lazily\n' +
          '    let val2 = parse_number("abc").unwrap_or_else(|e| {\n' +
          '        eprintln!("Parse error: {}", e);\n' +
          '        -1\n' +
          '    });\n\n' +
          '    // Option combinators\n' +
          '    let name: Option<&str> = Some("  alice  ");\n' +
          '    let trimmed = name.map(|s| s.trim());\n' +
          '    let upper = name.map(|s| s.trim()).map(|s| s.to_uppercase());\n\n' +
          '    // ok_or: convert Option to Result\n' +
          '    let result: Result<&str, &str> = name.ok_or("no name provided");\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? '自定义错误类型与 anyhow' : 'Custom Error Types and anyhow'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use std::fmt;\n\n' +
          '// Custom error type — best practice for library code\n' +
          '#[derive(Debug)]\n' +
          'enum AppError {\n' +
          '    Io(std::io::Error),\n' +
          '    Parse(std::num::ParseIntError),\n' +
          '    Custom(String),\n' +
          '}\n\n' +
          'impl fmt::Display for AppError {\n' +
          '    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n' +
          '        match self {\n' +
          '            AppError::Io(e) => write!(f, "IO error: {}", e),\n' +
          '            AppError::Parse(e) => write!(f, "Parse error: {}", e),\n' +
          '            AppError::Custom(msg) => write!(f, "Error: {}", msg),\n' +
          '        }\n' +
          '    }\n' +
          '}\n\n' +
          '// impl From<> enables automatic ? conversion\n' +
          'impl From<std::io::Error> for AppError {\n' +
          '    fn from(e: std::io::Error) -> Self { AppError::Io(e) }\n' +
          '}\n' +
          'impl From<std::num::ParseIntError> for AppError {\n' +
          '    fn from(e: std::num::ParseIntError) -> Self { AppError::Parse(e) }\n' +
          '}\n\n' +
          'fn process() -> Result<(), AppError> {\n' +
          '    let content = std::fs::read_to_string("data.txt")?;  // auto-converts io::Error\n' +
          '    let num: i32 = content.trim().parse()?;  // auto-converts ParseIntError\n' +
          '    if num < 0 {\n' +
          '        return Err(AppError::Custom("number must be positive".into()));\n' +
          '    }\n' +
          '    Ok(())\n' +
          '}\n\n' +
          '// --- OR use anyhow for application code ---\n' +
          '// Cargo.toml: anyhow = "1"\n' +
          'use anyhow::{Context, Result, bail, anyhow};\n\n' +
          'fn process_with_anyhow(path: &str) -> Result<i32> {\n' +
          '    let content = std::fs::read_to_string(path)\n' +
          '        .with_context(|| format!("Failed to read file: {}", path))?;\n' +
          '    let num: i32 = content.trim().parse()\n' +
          '        .context("File does not contain a valid integer")?;\n' +
          '    if num < 0 {\n' +
          '        bail!("number {} must be non-negative", num);\n' +
          '    }\n' +
          '    Ok(num)\n' +
          '}'
        }</code>
      </pre>

      {/* Section 6: Traits and Generics */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '6. Trait 与泛型' : '6. Traits and Generics'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Trait 定义共享行为，类似其他语言的接口，但支持默认实现和运算符重载。泛型（Generics）加上 trait 约束（bounds）实现零成本抽象：编译器为每个具体类型生成专用代码（单态化），运行时无任何额外开销。'
          : 'Traits define shared behavior, similar to interfaces in other languages but with default implementations and operator overloading. Generics combined with trait bounds enable zero-cost abstractions: the compiler generates specialized code for each concrete type (monomorphization), with no runtime overhead.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Define a trait\n' +
          'trait Summary {\n' +
          '    fn summarize_author(&self) -> String;  // required method\n\n' +
          '    // Default implementation\n' +
          '    fn summarize(&self) -> String {\n' +
          '        format!("(Read more from {}...)", self.summarize_author())\n' +
          '    }\n' +
          '}\n\n' +
          '#[derive(Debug)]\n' +
          'struct Article { title: String, author: String, content: String }\n\n' +
          'impl Summary for Article {\n' +
          '    fn summarize_author(&self) -> String { self.author.clone() }\n\n' +
          '    // Override default implementation\n' +
          '    fn summarize(&self) -> String {\n' +
          '        format!("{}, by {} — {}", self.title, self.author, &self.content[..50])\n' +
          '    }\n' +
          '}\n\n' +
          '// Generics with trait bounds — static dispatch (zero cost)\n' +
          'fn notify<T: Summary>(item: &T) {\n' +
          '    println!("Breaking news! {}", item.summarize());\n' +
          '}\n\n' +
          '// Multiple bounds with + syntax\n' +
          'fn notify_debug<T: Summary + std::fmt::Debug>(item: &T) {\n' +
          '    println!("{:?}", item);\n' +
          '    println!("{}", item.summarize());\n' +
          '}\n\n' +
          '// Where clause for complex bounds\n' +
          'fn complex_function<T, U>(t: &T, u: &U) -> String\n' +
          'where\n' +
          '    T: std::fmt::Display + Clone,\n' +
          '    U: Summary + std::fmt::Debug,\n' +
          '{\n' +
          '    format!("{} {}", t, u.summarize())\n' +
          '}\n\n' +
          '// impl Trait syntax (sugar for generics in simple cases)\n' +
          'fn notify_impl(item: &impl Summary) {\n' +
          '    println!("{}", item.summarize());\n' +
          '}\n\n' +
          '// Return impl Trait — return type is opaque\n' +
          'fn make_summarizable() -> impl Summary {\n' +
          '    Article {\n' +
          '        title: String::from("Test"),\n' +
          '        author: String::from("Alice"),\n' +
          '        content: String::from("Content here"),\n' +
          '    }\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Trait Objects — 动态分发' : 'Trait Objects — Dynamic Dispatch'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// dyn Trait — runtime polymorphism via vtable (like virtual in C++)\n' +
          'struct Tweet { username: String, content: String }\n' +
          'impl Summary for Tweet {\n' +
          '    fn summarize_author(&self) -> String { format!("@{}", self.username) }\n' +
          '}\n\n' +
          '// Vec of different types sharing a trait\n' +
          'fn print_all(items: &[Box<dyn Summary>]) {\n' +
          '    for item in items {\n' +
          '        println!("{}", item.summarize());\n' +
          '    }\n' +
          '}\n\n' +
          'fn main() {\n' +
          '    let article = Box::new(Article {\n' +
          '        title: "Rust Rules".into(),\n' +
          '        author: "Alice".into(),\n' +
          '        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit...".into(),\n' +
          '    });\n' +
          '    let tweet = Box::new(Tweet {\n' +
          '        username: "bob".into(),\n' +
          '        content: "Rust is amazing!".into(),\n' +
          '    });\n' +
          '    let items: Vec<Box<dyn Summary>> = vec![article, tweet];\n' +
          '    print_all(&items);\n' +
          '}\n\n' +
          '// Important standard library traits to implement:\n' +
          '// Clone      — explicit deep copy: #[derive(Clone)]\n' +
          '// Copy       — implicit bitwise copy (stack types): #[derive(Copy, Clone)]\n' +
          '// Debug      — {:?} formatting: #[derive(Debug)]\n' +
          '// Display    — {} formatting: impl fmt::Display\n' +
          '// Iterator   — .iter(), for loops: impl Iterator\n' +
          '// From/Into  — type conversions: impl From<T>\n' +
          '// PartialEq  — == operator: #[derive(PartialEq)]\n' +
          '// Hash       — use as HashMap key: #[derive(Hash, Eq, PartialEq)]'
        }</code>
      </pre>

      {/* Section 7: Closures and Iterators */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '7. 闭包与迭代器' : '7. Closures and Iterators'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 的迭代器是惰性的（lazy）：调用 .map()、.filter() 等适配器不会立即执行，只有在终结方法（.collect()、.sum()、.for_each()）被调用时才会执行。这种设计使得链式操作和底层循环一样高效——编译器能够完全优化掉迭代器抽象。'
          : "Rust's iterators are lazy: calling adaptors like .map() and .filter() does not execute immediately — only when a consuming method (.collect(), .sum(), .for_each()) is called. This design makes chained operations as efficient as hand-written loops — the compiler can fully optimize away the iterator abstraction."}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Closures — anonymous functions that capture their environment\n' +
          'fn main() {\n' +
          '    // Basic closure syntax\n' +
          '    let add = |x, y| x + y;          // type inferred\n' +
          '    let square = |x: i32| -> i32 { x * x };\n' +
          '    println!("{}", add(3, 4));    // 7\n\n' +
          '    // Capture by reference (Fn)\n' +
          '    let threshold = 10;\n' +
          '    let is_big = |n: &i32| n > &threshold;  // captures threshold by ref\n\n' +
          '    // Capture by value (move)\n' +
          '    let text = String::from("hello");\n' +
          '    let contains_hello = move |s: &str| s.contains(&text);  // moves text\n' +
          '    // text is moved into closure, cannot use it here\n\n' +
          '    // Three closure traits:\n' +
          '    // Fn     — borrows immutably, can be called multiple times\n' +
          '    // FnMut  — borrows mutably, can be called multiple times\n' +
          '    // FnOnce — consumes captured values, called only once\n\n' +
          '    let mut count = 0;\n' +
          '    let mut increment = || { count += 1; count };  // FnMut\n' +
          '    println!("{}", increment());  // 1\n' +
          '    println!("{}", increment());  // 2\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Iterator methods — zero-cost abstractions\n' +
          'fn iterator_examples() {\n' +
          '    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n' +
          '    // map: transform each element\n' +
          '    let doubled: Vec<i32> = numbers.iter().map(|&n| n * 2).collect();\n\n' +
          '    // filter: keep elements matching predicate\n' +
          '    let evens: Vec<&i32> = numbers.iter().filter(|&&n| n % 2 == 0).collect();\n\n' +
          '    // filter_map: filter + map in one step\n' +
          '    let parsed: Vec<i32> = vec!["1", "two", "3", "four"]\n' +
          '        .iter()\n' +
          '        .filter_map(|s| s.parse().ok())\n' +
          '        .collect();\n\n' +
          '    // fold/reduce: accumulate a value\n' +
          '    let sum = numbers.iter().fold(0, |acc, &n| acc + n);  // 55\n' +
          '    let sum2: i32 = numbers.iter().sum();  // shorthand for sum\n\n' +
          '    // chain: concatenate iterators\n' +
          '    let a = vec![1, 2, 3];\n' +
          '    let b = vec![4, 5, 6];\n' +
          '    let combined: Vec<i32> = a.iter().chain(b.iter()).copied().collect();\n\n' +
          '    // zip: pair two iterators\n' +
          '    let pairs: Vec<(i32, i32)> = a.iter().zip(b.iter()).map(|(&x, &y)| (x, y)).collect();\n\n' +
          '    // enumerate: add index\n' +
          '    for (i, val) in numbers.iter().enumerate() {\n' +
          '        println!("Index {}: {}", i, val);\n' +
          '    }\n\n' +
          '    // flat_map: map then flatten\n' +
          '    let words = vec!["hello world", "foo bar"];\n' +
          '    let all_words: Vec<&str> = words.iter().flat_map(|s| s.split_whitespace()).collect();\n\n' +
          '    // take/skip: limit or offset\n' +
          '    let first_three: Vec<i32> = numbers.iter().take(3).copied().collect();\n' +
          '    let skip_first: Vec<i32> = numbers.iter().skip(7).copied().collect();\n\n' +
          '    // any/all: boolean queries\n' +
          '    let has_even = numbers.iter().any(|&n| n % 2 == 0);  // true\n' +
          '    let all_positive = numbers.iter().all(|&n| n > 0);   // true\n\n' +
          '    // max, min, count\n' +
          '    let max = numbers.iter().max();       // Some(10)\n' +
          '    let count = numbers.iter().count();   // 10\n' +
          '}'
        }</code>
      </pre>

      {/* Section 8: Async Rust with Tokio */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '8. 异步 Rust：Tokio 运行时与 async/await' : '8. Async Rust: Tokio Runtime and async/await'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 的 async/await 是语言级别的语法糖，编译器将 async 函数转换为状态机（实现 Future trait）。与 JavaScript 的 async/await 不同，Rust 的 Future 是惰性的——创建一个 Future 不会立即执行任何操作，必须由运行时（如 Tokio）轮询才会执行。Tokio 是最主流的异步运行时，提供多线程工作窃取调度器。'
          : "Rust's async/await is language-level syntax sugar — the compiler transforms async functions into state machines (implementing the Future trait). Unlike JavaScript's async/await, Rust Futures are lazy: creating a Future does not execute anything; it must be polled by a runtime (like Tokio) to make progress. Tokio is the dominant async runtime with a multi-threaded work-stealing scheduler."}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Cargo.toml\n' +
          '[dependencies]\n' +
          'tokio = { version = "1", features = ["full"] }\n' +
          'reqwest = { version = "0.11", features = ["json"] }\n' +
          'serde = { version = "1", features = ["derive"] }\n' +
          'serde_json = "1"'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use tokio::time::{sleep, Duration};\n' +
          'use tokio::sync::{mpsc, Mutex};\n' +
          'use std::sync::Arc;\n\n' +
          '// #[tokio::main] initializes the Tokio runtime\n' +
          '#[tokio::main]\n' +
          'async fn main() -> anyhow::Result<()> {\n' +
          '    // Basic async/await\n' +
          '    let result = fetch_data("https://api.example.com/data").await?;\n' +
          '    println!("{:?}", result);\n\n' +
          '    // Concurrent tasks with tokio::spawn\n' +
          '    let handle1 = tokio::spawn(async {\n' +
          '        sleep(Duration::from_millis(100)).await;\n' +
          '        println!("Task 1 done");\n' +
          '        42\n' +
          '    });\n' +
          '    let handle2 = tokio::spawn(async {\n' +
          '        sleep(Duration::from_millis(50)).await;\n' +
          '        println!("Task 2 done");\n' +
          '        24\n' +
          '    });\n\n' +
          '    let (r1, r2) = tokio::join!(handle1, handle2);  // await both\n' +
          '    println!("Results: {} {}", r1?, r2?);\n\n' +
          '    // tokio::select! — race multiple futures\n' +
          '    tokio::select! {\n' +
          '        _ = sleep(Duration::from_millis(1000)) => println!("Timed out"),\n' +
          '        result = fetch_data("https://api.example.com") => {\n' +
          '            println!("Got result: {:?}", result);\n' +
          '        }\n' +
          '    }\n\n' +
          '    // Shared state with Arc<Mutex<T>>\n' +
          '    let counter = Arc::new(Mutex::new(0u32));\n' +
          '    let mut handles = vec![];\n' +
          '    for _ in 0..10 {\n' +
          '        let counter = Arc::clone(&counter);\n' +
          '        handles.push(tokio::spawn(async move {\n' +
          '            let mut lock = counter.lock().await;\n' +
          '            *lock += 1;\n' +
          '        }));\n' +
          '    }\n' +
          '    for h in handles { h.await?; }\n' +
          '    println!("Final count: {}", counter.lock().await);\n\n' +
          '    // Message passing with mpsc channels\n' +
          '    let (tx, mut rx) = mpsc::channel::<String>(32);\n' +
          '    tokio::spawn(async move {\n' +
          '        tx.send("hello".to_string()).await.unwrap();\n' +
          '        tx.send("world".to_string()).await.unwrap();\n' +
          '    });\n' +
          '    while let Some(msg) = rx.recv().await {\n' +
          '        println!("Received: {}", msg);\n' +
          '    }\n' +
          '    Ok(())\n' +
          '}\n\n' +
          'async fn fetch_data(url: &str) -> anyhow::Result<serde_json::Value> {\n' +
          '    let response = reqwest::get(url).await?;\n' +
          '    let json = response.json::<serde_json::Value>().await?;\n' +
          '    Ok(json)\n' +
          '}'
        }</code>
      </pre>

      {/* Section 9: Common Data Structures */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '9. Rust 常用数据结构：Vec、HashMap 与 BTreeMap' : '9. Common Rust Data Structures: Vec, HashMap, and BTreeMap'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 标准库提供了一套经过精心设计的数据结构。Vec<T> 是最常用的动态数组；HashMap<K, V> 提供 O(1) 平均查找，使用 SipHash 哈希算法（防哈希洪水攻击）；BTreeMap<K, V> 保持键的排序顺序，查找时间复杂度 O(log n)，适合需要有序遍历的场景。'
          : 'The Rust standard library provides a carefully designed set of data structures. Vec<T> is the most commonly used dynamic array; HashMap<K, V> provides O(1) average lookup using SipHash (protection against hash flooding attacks); BTreeMap<K, V> maintains sorted key order with O(log n) lookup, suitable for scenarios requiring ordered iteration.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use std::collections::{HashMap, BTreeMap, HashSet, BTreeSet, VecDeque, BinaryHeap};\n\n' +
          '// Vec<T> — dynamic array (most common collection)\n' +
          'fn vec_examples() {\n' +
          '    let mut v: Vec<i32> = Vec::new();\n' +
          '    let v2 = vec![1, 2, 3, 4, 5];  // macro shorthand\n\n' +
          '    v.push(1);              // O(1) amortized\n' +
          '    v.pop();                // O(1)\n' +
          '    v.insert(0, 99);       // O(n)\n' +
          '    v.remove(0);           // O(n)\n' +
          '    v.retain(|&x| x > 0);  // keep elements matching predicate\n' +
          '    v.sort();               // in-place sort O(n log n)\n' +
          '    v.sort_by(|a, b| b.cmp(a));  // reverse sort\n' +
          '    v.dedup();             // remove consecutive duplicates (sort first)\n\n' +
          '    // Slices — view into a Vec\n' +
          '    let slice: &[i32] = &v2[1..3];  // [2, 3]\n' +
          '    let first = v2.first();   // Option<&i32>\n' +
          '    let last = v2.last();     // Option<&i32>\n' +
          '    let len = v2.len();\n' +
          '    let is_empty = v2.is_empty();\n\n' +
          '    // Pre-allocate capacity for performance\n' +
          '    let mut v3: Vec<i32> = Vec::with_capacity(1000);\n' +
          '    for i in 0..1000 { v3.push(i); }  // no reallocation\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// HashMap<K, V> — O(1) average lookup\n' +
          'fn hashmap_examples() {\n' +
          '    let mut scores: HashMap<String, i32> = HashMap::new();\n\n' +
          '    // Insert\n' +
          '    scores.insert("Alice".to_string(), 100);\n' +
          '    scores.insert("Bob".to_string(), 85);\n\n' +
          '    // entry API — insert if not present\n' +
          '    scores.entry("Alice".to_string()).or_insert(0);\n' +
          '    scores.entry("Carol".to_string()).or_insert(0);  // inserts 0\n\n' +
          '    // entry with modification\n' +
          '    let count = scores.entry("Alice".to_string()).or_insert(0);\n' +
          '    *count += 10;  // now 110\n\n' +
          '    // Lookup\n' +
          '    let alice = scores.get("Alice");       // Option<&i32>\n' +
          '    let bob = scores["Bob"];               // panics if missing!\n' +
          '    let dave = scores.get("Dave").copied().unwrap_or(0);\n\n' +
          '    // Iterate\n' +
          '    for (name, score) in &scores {\n' +
          '        println!("{}: {}", name, score);\n' +
          '    }\n\n' +
          '    // Collect from iterator\n' +
          '    let map: HashMap<&str, i32> = vec![("a", 1), ("b", 2)]\n' +
          '        .into_iter()\n' +
          '        .collect();\n\n' +
          '    // Remove\n' +
          '    scores.remove("Bob");\n' +
          '    let contains = scores.contains_key("Alice");  // true\n' +
          '}\n\n' +
          '// BTreeMap<K, V> — sorted, O(log n) lookup\n' +
          'fn btreemap_examples() {\n' +
          '    let mut map: BTreeMap<&str, i32> = BTreeMap::new();\n' +
          '    map.insert("zebra", 1);\n' +
          '    map.insert("apple", 2);\n' +
          '    map.insert("mango", 3);\n\n' +
          '    // Iterates in sorted key order: apple, mango, zebra\n' +
          '    for (k, v) in &map { println!("{}: {}", k, v); }\n\n' +
          '    // Range queries — unique to BTreeMap\n' +
          '    use std::ops::Bound::Included;\n' +
          '    for (k, v) in map.range("a"..="m") {\n' +
          '        println!("{}: {}", k, v);  // apple, mango\n' +
          '    }\n' +
          '}'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// Other important collections\n' +
          'fn other_collections() {\n' +
          '    // HashSet<T> — unordered unique values, O(1) lookup\n' +
          '    let mut set: HashSet<i32> = HashSet::new();\n' +
          '    set.insert(1); set.insert(2); set.insert(1);  // dedup: {1, 2}\n' +
          '    let contains = set.contains(&1);  // true\n' +
          '    let union: HashSet<_> = set.union(&HashSet::from([2, 3])).collect();\n' +
          '    let intersection: HashSet<_> = set.intersection(&HashSet::from([1, 3])).collect();\n\n' +
          '    // BTreeSet<T> — sorted unique values\n' +
          '    let bset: BTreeSet<i32> = vec![3, 1, 4, 1, 5].into_iter().collect();\n' +
          '    // Iterates in sorted order: 1, 3, 4, 5\n\n' +
          '    // VecDeque<T> — double-ended queue, O(1) push/pop on both ends\n' +
          '    let mut deque: VecDeque<i32> = VecDeque::new();\n' +
          '    deque.push_back(1);\n' +
          '    deque.push_front(0);\n' +
          '    let front = deque.pop_front();  // Some(0)\n' +
          '    let back = deque.pop_back();    // Some(1)\n\n' +
          '    // BinaryHeap<T> — max-heap, O(log n) insert/pop\n' +
          '    let mut heap: BinaryHeap<i32> = BinaryHeap::new();\n' +
          '    heap.push(3); heap.push(1); heap.push(4); heap.push(2);\n' +
          '    let max = heap.pop();  // Some(4)\n' +
          '}'
        }</code>
      </pre>

      {/* Section 10: Rust for Web */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '10. Rust Web 开发：Axum 与 Actix-web' : '10. Rust for the Web: Axum and Actix-web'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 的 Web 框架已经成熟。Axum（由 Tokio 团队维护）和 Actix-web 是目前最主流的两个选择。两者在 TechEmpower 框架基准测试中都位居前列，远超大多数其他语言的框架。'
          : "Rust's web frameworks have matured significantly. Axum (maintained by the Tokio team) and Actix-web are the two dominant choices. Both rank near the top in TechEmpower framework benchmarks, far outperforming most frameworks in other languages."}
      </p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Axum：基于 Tower 生态的现代 Web 框架' : 'Axum: Modern Web Framework Built on Tower'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Cargo.toml\n' +
          '[dependencies]\n' +
          'axum = "0.7"\n' +
          'tokio = { version = "1", features = ["full"] }\n' +
          'serde = { version = "1", features = ["derive"] }\n' +
          'serde_json = "1"\n' +
          'tower-http = { version = "0.5", features = ["cors", "trace", "compression-gzip"] }\n' +
          'sqlx = { version = "0.7", features = ["postgres", "runtime-tokio-rustls", "uuid"] }\n' +
          'uuid = { version = "1", features = ["v4", "serde"] }'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use axum::{\n' +
          '    extract::{Path, Query, State, Json},\n' +
          '    http::StatusCode,\n' +
          '    response::{IntoResponse, Response},\n' +
          '    routing::{get, post, put, delete},\n' +
          '    Router,\n' +
          '};\n' +
          'use serde::{Deserialize, Serialize};\n' +
          'use std::sync::Arc;\n' +
          'use tokio::sync::RwLock;\n\n' +
          '#[derive(Debug, Clone, Serialize, Deserialize)]\n' +
          'struct User {\n' +
          '    id: u32,\n' +
          '    name: String,\n' +
          '    email: String,\n' +
          '}\n\n' +
          '#[derive(Debug, Clone, Deserialize)]\n' +
          'struct CreateUser {\n' +
          '    name: String,\n' +
          '    email: String,\n' +
          '}\n\n' +
          '#[derive(Debug, Clone, Deserialize)]\n' +
          'struct PaginationQuery {\n' +
          '    page: Option<u32>,\n' +
          '    per_page: Option<u32>,\n' +
          '}\n\n' +
          '// Shared application state\n' +
          'type AppState = Arc<RwLock<Vec<User>>>;\n\n' +
          '#[tokio::main]\n' +
          'async fn main() {\n' +
          '    let state: AppState = Arc::new(RwLock::new(vec![\n' +
          '        User { id: 1, name: "Alice".into(), email: "alice@example.com".into() },\n' +
          '    ]));\n\n' +
          '    let app = Router::new()\n' +
          '        .route("/users", get(list_users).post(create_user))\n' +
          '        .route("/users/:id", get(get_user).put(update_user).delete(delete_user))\n' +
          '        .route("/health", get(|| async { "OK" }))\n' +
          '        .with_state(state)\n' +
          '        .layer(\n' +
          '            tower_http::cors::CorsLayer::permissive()\n' +
          '        );\n\n' +
          '    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();\n' +
          '    println!("Listening on http://0.0.0.0:3000");\n' +
          '    axum::serve(listener, app).await.unwrap();\n' +
          '}\n\n' +
          '// GET /users?page=1&per_page=10\n' +
          'async fn list_users(\n' +
          '    State(state): State<AppState>,\n' +
          '    Query(params): Query<PaginationQuery>,\n' +
          ') -> Json<Vec<User>> {\n' +
          '    let users = state.read().await;\n' +
          '    let page = params.page.unwrap_or(1) as usize;\n' +
          '    let per_page = params.per_page.unwrap_or(10) as usize;\n' +
          '    let start = (page - 1) * per_page;\n' +
          '    let paginated: Vec<User> = users.iter().skip(start).take(per_page).cloned().collect();\n' +
          '    Json(paginated)\n' +
          '}\n\n' +
          '// GET /users/:id\n' +
          'async fn get_user(\n' +
          '    State(state): State<AppState>,\n' +
          '    Path(id): Path<u32>,\n' +
          ') -> Result<Json<User>, StatusCode> {\n' +
          '    let users = state.read().await;\n' +
          '    users.iter()\n' +
          '        .find(|u| u.id == id)\n' +
          '        .cloned()\n' +
          '        .map(Json)\n' +
          '        .ok_or(StatusCode::NOT_FOUND)\n' +
          '}\n\n' +
          '// POST /users\n' +
          'async fn create_user(\n' +
          '    State(state): State<AppState>,\n' +
          '    Json(payload): Json<CreateUser>,\n' +
          ') -> (StatusCode, Json<User>) {\n' +
          '    let mut users = state.write().await;\n' +
          '    let id = users.len() as u32 + 1;\n' +
          '    let user = User { id, name: payload.name, email: payload.email };\n' +
          '    users.push(user.clone());\n' +
          '    (StatusCode::CREATED, Json(user))\n' +
          '}\n\n' +
          '// PUT /users/:id\n' +
          'async fn update_user(\n' +
          '    State(state): State<AppState>,\n' +
          '    Path(id): Path<u32>,\n' +
          '    Json(payload): Json<CreateUser>,\n' +
          ') -> Result<Json<User>, StatusCode> {\n' +
          '    let mut users = state.write().await;\n' +
          '    if let Some(user) = users.iter_mut().find(|u| u.id == id) {\n' +
          '        user.name = payload.name;\n' +
          '        user.email = payload.email;\n' +
          '        Ok(Json(user.clone()))\n' +
          '    } else {\n' +
          '        Err(StatusCode::NOT_FOUND)\n' +
          '    }\n' +
          '}\n\n' +
          '// DELETE /users/:id\n' +
          'async fn delete_user(\n' +
          '    State(state): State<AppState>,\n' +
          '    Path(id): Path<u32>,\n' +
          ') -> StatusCode {\n' +
          '    let mut users = state.write().await;\n' +
          '    let len_before = users.len();\n' +
          '    users.retain(|u| u.id != id);\n' +
          '    if users.len() < len_before { StatusCode::NO_CONTENT } else { StatusCode::NOT_FOUND }\n' +
          '}'
        }</code>
      </pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
        {isZh ? 'Actix-web：高性能 Actor 模型 Web 框架' : 'Actix-web: High-Performance Actor-Model Web Framework'}
      </h3>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '# Cargo.toml\n' +
          '[dependencies]\n' +
          'actix-web = "4"\n' +
          'actix-cors = "0.7"\n' +
          'tokio = { version = "1", features = ["full"] }\n' +
          'serde = { version = "1", features = ["derive"] }\n' +
          'serde_json = "1"'
        }</code>
      </pre>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'use actix_web::{\n' +
          '    web, App, HttpServer, HttpResponse, Responder,\n' +
          '    middleware::Logger,\n' +
          '};\n' +
          'use serde::{Deserialize, Serialize};\n\n' +
          '#[derive(Serialize, Deserialize, Clone)]\n' +
          'struct Product {\n' +
          '    id: u32,\n' +
          '    name: String,\n' +
          '    price: f64,\n' +
          '}\n\n' +
          '#[derive(Deserialize)]\n' +
          'struct CreateProduct {\n' +
          '    name: String,\n' +
          '    price: f64,\n' +
          '}\n\n' +
          'async fn get_products() -> impl Responder {\n' +
          '    let products = vec![\n' +
          '        Product { id: 1, name: "Widget".into(), price: 9.99 },\n' +
          '    ];\n' +
          '    HttpResponse::Ok().json(products)\n' +
          '}\n\n' +
          'async fn create_product(body: web::Json<CreateProduct>) -> impl Responder {\n' +
          '    let product = Product {\n' +
          '        id: 1,\n' +
          '        name: body.name.clone(),\n' +
          '        price: body.price,\n' +
          '    };\n' +
          '    HttpResponse::Created().json(product)\n' +
          '}\n\n' +
          'async fn get_product_by_id(path: web::Path<u32>) -> impl Responder {\n' +
          '    let id = path.into_inner();\n' +
          '    HttpResponse::Ok().json(Product {\n' +
          '        id,\n' +
          '        name: format!("Product {}", id),\n' +
          '        price: 19.99,\n' +
          '    })\n' +
          '}\n\n' +
          '#[actix_web::main]\n' +
          'async fn main() -> std::io::Result<()> {\n' +
          '    HttpServer::new(|| {\n' +
          '        App::new()\n' +
          '            .wrap(Logger::default())\n' +
          '            .wrap(actix_cors::Cors::permissive())\n' +
          '            .service(\n' +
          '                web::scope("/api")\n' +
          '                    .route("/products", web::get().to(get_products))\n' +
          '                    .route("/products", web::post().to(create_product))\n' +
          '                    .route("/products/{id}", web::get().to(get_product_by_id))\n' +
          '            )\n' +
          '    })\n' +
          '    .bind("0.0.0.0:8080")?\n' +
          '    .run()\n' +
          '    .await\n' +
          '}'
        }</code>
      </pre>

      {/* Section 11: Testing */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '11. Rust 测试：单元测试、集成测试与基准测试' : '11. Testing in Rust: Unit Tests, Integration Tests, and Benchmarks'}
      </h2>
      <p style={{ color: '#334155', marginBottom: '1rem' }}>
        {isZh
          ? 'Rust 内置了测试框架，无需额外依赖。单元测试写在与被测代码同一文件的 #[cfg(test)] 模块中，可以访问私有函数。集成测试放在 tests/ 目录，只能访问公共 API。cargo test 命令自动发现和运行所有测试。'
          : 'Rust has a built-in test framework requiring no additional dependencies. Unit tests live in a #[cfg(test)] module in the same file as the code under test and can access private functions. Integration tests live in the tests/ directory and can only access the public API. The cargo test command automatically discovers and runs all tests.'}
      </p>

      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          '// src/lib.rs\n' +
          'pub fn add(a: i32, b: i32) -> i32 { a + b }\n' +
          'pub fn divide(a: f64, b: f64) -> Result<f64, String> {\n' +
          '    if b == 0.0 { Err("Division by zero".to_string()) }\n' +
          '    else { Ok(a / b) }\n' +
          '}\n\n' +
          '// Unit tests — same file, #[cfg(test)] module\n' +
          '#[cfg(test)]\n' +
          'mod tests {\n' +
          '    use super::*;   // import everything from parent module\n\n' +
          '    #[test]\n' +
          '    fn test_add() {\n' +
          '        assert_eq!(add(2, 3), 5);\n' +
          '        assert_eq!(add(-1, 1), 0);\n' +
          '        assert_ne!(add(1, 1), 3);\n' +
          '    }\n\n' +
          '    #[test]\n' +
          '    fn test_divide_success() {\n' +
          '        let result = divide(10.0, 2.0);\n' +
          '        assert!(result.is_ok());\n' +
          '        assert_eq!(result.unwrap(), 5.0);\n' +
          '    }\n\n' +
          '    #[test]\n' +
          '    fn test_divide_by_zero() {\n' +
          '        let result = divide(10.0, 0.0);\n' +
          '        assert!(result.is_err());\n' +
          '        assert_eq!(result.unwrap_err(), "Division by zero");\n' +
          '    }\n\n' +
          '    #[test]\n' +
          '    #[should_panic(expected = "index out of bounds")]\n' +
          '    fn test_panic() {\n' +
          '        let v = vec![1, 2, 3];\n' +
          '        let _ = v[99];   // intentional panic\n' +
          '    }\n\n' +
          '    #[test]\n' +
          '    #[ignore]   // run with: cargo test -- --ignored\n' +
          '    fn expensive_test() {\n' +
          '        // slow test skipped by default\n' +
          '    }\n' +
          '}\n\n' +
          '// Integration test: tests/integration_test.rs\n' +
          '// (separate file, can only use public API)\n' +
          '// use my_crate::{add, divide};\n' +
          '// #[test]\n' +
          '// fn test_public_api() {\n' +
          '//     assert_eq!(add(10, 20), 30);\n' +
          '// }\n\n' +
          '// Run specific tests\n' +
          '// cargo test               — run all tests\n' +
          '// cargo test test_add      — run tests matching "test_add"\n' +
          '// cargo test -- --nocapture  — show println! output\n' +
          '// cargo test -- --test-threads=1  — run single-threaded'
        }</code>
      </pre>

      {/* Section 12: FAQ */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? '常见问题解答' : 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem' }}
          >
            <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#1e293b' }}>
              {item.question}
            </h3>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.65' }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Summary Table */}
      <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #e2e8f0' }}>
        {isZh ? 'Rust 核心概念速查表' : 'Rust Core Concepts Quick Reference'}
      </h2>
      <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem 1.5rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
        <code>{
          'Rust Core Concepts — Quick Reference\n' +
          '=====================================\n\n' +
          'Concept                Syntax / Notes\n' +
          '-------                --------------\n' +
          'Immutable variable     let x = 5;\n' +
          'Mutable variable       let mut x = 5;\n' +
          'Type annotation        let x: i32 = 5;\n' +
          'Ownership transfer     let y = x;  // x is moved\n' +
          'Immutable borrow       let r = &x;\n' +
          'Mutable borrow         let r = &mut x;   (only one at a time)\n' +
          'Dereference            *r\n' +
          'String literal         &str (reference, stack)\n' +
          'Owned string           String (heap-allocated)\n' +
          'Option                 Some(val) | None\n' +
          'Result                 Ok(val) | Err(e)\n' +
          'Error propagation      ?  (replaces match Err(e) => return Err(e))\n' +
          'Struct                 struct Name { field: Type }\n' +
          'Tuple struct           struct Color(u8, u8, u8);\n' +
          'Enum variant           enum Msg { Quit, Move { x: i32 }, Write(String) }\n' +
          'Pattern match          match val { Variant(x) => expr, _ => default }\n' +
          'Closure                |args| body  or  |args| -> Type { body }\n' +
          'Generic function       fn foo<T: Trait>(x: T) -> T\n' +
          'Lifetime annotation    fn foo<\'a>(x: &\'a str) -> &\'a str\n' +
          'Trait definition       trait Name { fn method(&self) -> Type; }\n' +
          'Trait implementation   impl TraitName for TypeName { ... }\n' +
          'Trait object           Box<dyn Trait>  /  &dyn Trait\n' +
          'Async function         async fn foo() -> T { ... }\n' +
          'Await                  let val = future.await;\n' +
          'Spawn task             tokio::spawn(async { ... })\n' +
          'Arc (shared ownership) Arc::new(data) + Arc::clone(&arc)\n' +
          'Mutex (thread safety)  Mutex::new(data) + data.lock().await\n' +
          'Vec                    Vec::new() / vec![1,2,3]\n' +
          'HashMap                HashMap::new() + map.entry(k).or_insert(v)\n' +
          'Iterator chain         iter.filter(|x| ...).map(|x| ...).collect()\n' +
          'Derive macros          #[derive(Debug, Clone, Serialize, Deserialize)]\n' +
          'Test                   #[test] fn test_name() { assert_eq!(...); }\n' +
          'Conditional compile    #[cfg(test)] mod tests { ... }'
        }</code>
      </pre>
    </article>
  );
}
