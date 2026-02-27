'use client';
import React from 'react';

const translations = {
  en: {
    title: 'Rust Beginner Guide: Ownership, Traits, Concurrency, and Common Patterns',
    description:
      'A comprehensive Rust beginner guide covering ownership and borrowing, structs and enums, pattern matching, traits and generics, error handling, collections, closures, smart pointers, concurrency, modules, macros, testing, and common design patterns.',
    tldr: 'Rust guarantees memory safety without garbage collection through its ownership system. Every value has a single owner, references must follow borrowing rules (one mutable XOR many immutable), and lifetimes ensure references never dangle. Use Result and the ? operator for error handling. Leverage pattern matching with match and if let. Use traits for polymorphism and generics for zero-cost abstractions. For concurrency, choose between threads with channels, Arc+Mutex for shared state, or async/await with tokio. Cargo manages packages, builds, and tests.',
    tldrZh: 'Rust 通过所有权系统在无垃圾回收的情况下保证内存安全。每个值有唯一所有者，引用必须遵守借用规则（一个可变引用或多个不可变引用），生命周期确保引用不会悬垂。使用 Result 和 ? 运算符处理错误。利用 match 和 if let 进行模式匹配。使用 trait 实现多态，泛型实现零成本抽象。并发方面，可选择线程+通道、Arc+Mutex 共享状态，或 tokio 的 async/await。Cargo 管理包、构建和测试。',
  },
  zh: {
    title: 'Rust 入门指南：所有权、Trait、并发与常见模式',
    description:
      '全面的 Rust 入门指南，涵盖所有权与借用、结构体与枚举、模式匹配、trait 与泛型、错误处理、集合、闭包、智能指针、并发、模块系统、宏、测试以及常见设计模式。',
    tldr: 'Rust 通过所有权系统在无垃圾回收的情况下保证内存安全。每个值有唯一所有者，引用必须遵守借用规则（一个可变引用或多个不可变引用），生命周期确保引用不会悬垂。使用 Result 和 ? 运算符处理错误。利用 match 和 if let 进行模式匹配。使用 trait 实现多态，泛型实现零成本抽象。并发方面，可选择线程+通道、Arc+Mutex 共享状态，或 tokio 的 async/await。Cargo 管理包、构建和测试。',
    tldrZh: 'Rust 通过所有权系统在无垃圾回收的情况下保证内存安全。每个值有唯一所有者，引用必须遵守借用规则（一个可变引用或多个不可变引用），生命周期确保引用不会悬垂。使用 Result 和 ? 运算符处理错误。利用 match 和 if let 进行模式匹配。使用 trait 实现多态，泛型实现零成本抽象。并发方面，可选择线程+通道、Arc+Mutex 共享状态，或 tokio 的 async/await。Cargo 管理包、构建和测试。',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ownership in Rust and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ownership is Rust\'s core memory management model. Each value has exactly one owner variable. When the owner goes out of scope, the value is dropped (freed). Assigning a value to another variable moves ownership, making the original variable invalid. This prevents double-free bugs and dangling pointers at compile time without needing a garbage collector.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between &T and &mut T in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '&T is an immutable (shared) reference that allows reading the value without taking ownership. &mut T is a mutable (exclusive) reference that allows modifying the value. Rust enforces a strict rule: you can have either one &mut T or any number of &T references at the same time, but not both. This prevents data races at compile time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does pattern matching work in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pattern matching in Rust uses the match expression to compare a value against a series of patterns. It is exhaustive, meaning the compiler requires you to handle every possible case. Patterns can destructure enums, structs, tuples, and references. Use if let for single-pattern matching and while let for loop-based pattern matching. Guards (if conditions) can add extra logic to match arms.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are traits in Rust and how do they compare to interfaces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Traits define shared behavior as a set of method signatures that types can implement. They are similar to interfaces in Java or TypeScript but also support default method implementations, associated types, and const generics. Traits enable polymorphism through static dispatch (impl Trait, generics with trait bounds) for zero-cost abstractions, or dynamic dispatch (dyn Trait) via vtables when the concrete type is not known at compile time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should I handle errors in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust uses the Result<T, E> enum for recoverable errors and panic! for unrecoverable errors. The ? operator propagates errors by returning early from a function if the Result is Err. For libraries, define custom error types with thiserror for automatic From implementations. For applications, use anyhow to collect any error type with context. Avoid unwrap() in production code; use expect() with descriptive messages or handle errors explicitly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main smart pointers in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Box<T> allocates data on the heap with single ownership. Rc<T> (reference counted) allows multiple owners in single-threaded code. Arc<T> (atomic reference counted) is the thread-safe version of Rc. RefCell<T> provides interior mutability with runtime borrow checking. Mutex<T> provides interior mutability with mutual exclusion for multi-threaded code. Combine them: Arc<Mutex<T>> for shared mutable state across threads.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does concurrency work in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust provides fearless concurrency through its ownership system. std::thread::spawn creates OS threads. Channels (mpsc::channel) enable message passing between threads. For shared state, use Arc<Mutex<T>> or Arc<RwLock<T>>. For async I/O, use async/await syntax with a runtime like tokio. The Send and Sync traits ensure thread safety at compile time: Send means a type can be transferred between threads, Sync means it can be shared via references.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I write tests in Rust?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rust has built-in testing support. Unit tests go in a #[cfg(test)] module inside the same file using #[test] attribute on functions. Integration tests go in a tests/ directory at the crate root. Doc tests are code examples in documentation comments (///) that are compiled and run automatically. Use assert!, assert_eq!, and assert_ne! macros. Test for expected panics with #[should_panic]. Run all tests with cargo test.',
      },
    },
  ],
};

export default function RustBeginnerGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[isZh ? 'zh' : 'en'];

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
          <li>{isZh ? '所有权系统在编译期保证内存安全，无需垃圾回收' : 'The ownership system guarantees memory safety at compile time without garbage collection'}</li>
          <li>{isZh ? '借用规则：同一时间只能有一个可变引用或多个不可变引用' : 'Borrowing rules: one mutable reference XOR many immutable references at any time'}</li>
          <li>{isZh ? '模式匹配是穷举的，编译器强制处理所有情况' : 'Pattern matching is exhaustive; the compiler forces you to handle every case'}</li>
          <li>{isZh ? 'Trait 提供零成本抽象的多态，泛型在编译期单态化' : 'Traits provide zero-cost polymorphism; generics are monomorphized at compile time'}</li>
          <li>{isZh ? '使用 Result + ? 运算符处理可恢复错误，避免生产代码中使用 unwrap()' : 'Use Result + ? operator for recoverable errors; avoid unwrap() in production code'}</li>
          <li>{isZh ? '智能指针：Box 堆分配、Rc/Arc 共享所有权、RefCell/Mutex 内部可变性' : 'Smart pointers: Box for heap, Rc/Arc for shared ownership, RefCell/Mutex for interior mutability'}</li>
          <li>{isZh ? 'Send 和 Sync trait 在编译期保证线程安全' : 'Send and Sync traits guarantee thread safety at compile time'}</li>
          <li>{isZh ? 'Cargo 管理依赖、构建、测试和发布，是 Rust 生态的核心' : 'Cargo manages dependencies, builds, tests, and publishing as the heart of the Rust ecosystem'}</li>
        </ul>
      </div>

      {/* Why Rust */}
      <h2 style={h2Style}>{isZh ? '为什么选择 Rust' : 'Why Choose Rust'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 是一门系统编程语言，专注于安全、并发和性能。它在编译期消除了内存安全问题（空指针、悬垂指针、数据竞争、缓冲区溢出），同时不依赖垃圾回收器，因此能达到与 C/C++ 相当的运行时性能。Rust 连续多年被 Stack Overflow 评为最受开发者喜爱的编程语言。'
          : 'Rust is a systems programming language focused on safety, concurrency, and performance. It eliminates memory safety issues (null pointers, dangling pointers, data races, buffer overflows) at compile time without relying on a garbage collector, achieving runtime performance comparable to C/C++. Rust has been voted the most loved programming language on Stack Overflow for multiple consecutive years.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Rust 适用于以下场景：系统编程（操作系统、驱动程序、嵌入式）、高性能网络服务（Web 服务器、代理、数据库）、命令行工具、WebAssembly 应用、游戏引擎、区块链和密码学。如果你的项目需要可预测的低延迟、内存安全保证或高并发处理能力，Rust 是一个优秀的选择。'
          : 'Rust is well-suited for: systems programming (operating systems, drivers, embedded), high-performance network services (web servers, proxies, databases), command-line tools, WebAssembly applications, game engines, blockchain, and cryptography. If your project requires predictable low latency, memory safety guarantees, or high-concurrency processing, Rust is an excellent choice.'}
      </p>

      {/* Section 1: Ownership & Borrowing */}
      <h2 style={h2Style}>{isZh ? '1. 所有权与借用' : '1. Ownership & Borrowing'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的所有权系统是其最独特的特性。每个值有且仅有一个所有者，当所有者离开作用域时值被自动释放。赋值操作默认移动所有权，使原变量失效。引用允许借用值而不获取所有权，分为不可变引用（&T）和可变引用（&mut T）。生命周期注解确保引用在其指向的数据有效期内使用。'
          : 'The ownership system is Rust\'s most distinctive feature. Every value has exactly one owner, and the value is automatically dropped when the owner goes out of scope. Assignment moves ownership by default, invalidating the original variable. References allow borrowing a value without taking ownership, either immutably (&T) or mutably (&mut T). Lifetime annotations ensure references are used while the data they point to is still valid.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '实现了 Copy trait 的类型（如 i32、f64、bool、char）在赋值时自动复制而非移动。堆分配类型如 String 和 Vec 不实现 Copy，必须显式调用 .clone() 来创建深拷贝。理解移动语义和 Copy 的区别是避免常见编译错误的关键。'
          : 'Types that implement the Copy trait (such as i32, f64, bool, char) are automatically copied on assignment rather than moved. Heap-allocated types like String and Vec do not implement Copy and require an explicit .clone() call for deep copies. Understanding the difference between move semantics and Copy is key to avoiding common compiler errors.'}
      </p>
      <pre style={preStyle}><code>{'fn main() {\n' +
'    let s1 = String::from("hello");  // s1 owns the String\n' +
'    let s2 = s1;                     // ownership moves to s2, s1 is invalid\n' +
'    // println!("{}", s1);           // compile error: value used after move\n\n' +
'    let s3 = s2.clone();             // deep copy, both s3 and s2 are valid\n\n' +
'    // Immutable borrowing: multiple readers allowed\n' +
'    let len = calculate_length(&s3);\n' +
'    println!("len of {} is {}", s3, len);\n\n' +
'    // Mutable borrowing: exclusive access\n' +
'    let mut s4 = String::from("hello");\n' +
'    change(&mut s4);\n' +
'}\n\n' +
'fn calculate_length(s: &String) -> usize { s.len() }\n' +
'fn change(s: &mut String) { s.push_str(", world"); }'}</code></pre>

      <h3 style={h3Style}>{isZh ? '字符串类型：String vs &str' : 'String Types: String vs &str'}</h3>
      <p style={pStyle}>
        {isZh
          ? 'Rust 有两种主要字符串类型：String 是堆分配的、可变的、拥有所有权的字符串；&str 是字符串切片引用，通常指向 String 的内容或字面量。函数参数一般接收 &str（更通用），返回值或需要拥有数据时使用 String。使用 .to_string()、String::from() 或 .into() 从 &str 创建 String。'
          : 'Rust has two main string types: String is a heap-allocated, mutable, owned string; &str is a string slice reference, typically pointing to a String\'s content or a literal. Function parameters generally accept &str (more flexible), while return values or owned data use String. Create a String from &str with .to_string(), String::from(), or .into().'}
      </p>

      {/* Section 2: Structs & Enums */}
      <h2 style={h2Style}>{isZh ? '2. 结构体与枚举' : '2. Structs & Enums'}</h2>
      <p style={pStyle}>
        {isZh
          ? '结构体（struct）用于将相关数据组合在一起，枚举（enum）用于定义一组可能的变体。impl 块为类型添加方法和关联函数。Rust 标准库中的 Option<T> 和 Result<T, E> 是最常用的枚举类型，分别表示可选值和可能失败的操作结果。'
          : 'Structs group related data together, and enums define a set of possible variants. Impl blocks add methods and associated functions to types. The standard library\'s Option<T> and Result<T, E> are the most commonly used enums, representing optional values and fallible operation results respectively.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Rust 有三种结构体形式：命名字段结构体（最常用）、元组结构体（如 struct Meters(f64)）和单元结构体（如 struct Marker）。枚举的每个变体可以包含不同类型和数量的数据，使其非常适合建模状态机和领域类型。'
          : 'Rust has three struct forms: named field structs (most common), tuple structs (e.g., struct Meters(f64)), and unit structs (e.g., struct Marker). Each enum variant can hold different types and amounts of data, making enums ideal for modeling state machines and domain types.'}
      </p>
      <pre style={preStyle}><code>{'struct User {\n' +
'    name: String,\n' +
'    email: String,\n' +
'    active: bool,\n' +
'}\n\n' +
'impl User {\n' +
'    fn new(name: &str, email: &str) -> Self {\n' +
'        Self { name: name.into(), email: email.into(), active: true }\n' +
'    }\n' +
'    fn deactivate(&mut self) { self.active = false; }\n' +
'}\n\n' +
'enum Shape {\n' +
'    Circle(f64),\n' +
'    Rectangle { width: f64, height: f64 },\n' +
'}\n\n' +
'impl Shape {\n' +
'    fn area(&self) -> f64 {\n' +
'        match self {\n' +
'            Shape::Circle(r) => std::f64::consts::PI * r * r,\n' +
'            Shape::Rectangle { width, height } => width * height,\n' +
'        }\n' +
'    }\n' +
'}'}</code></pre>

      {/* Section 3: Pattern Matching */}
      <h2 style={h2Style}>{isZh ? '3. 模式匹配' : '3. Pattern Matching'}</h2>
      <p style={pStyle}>
        {isZh
          ? '模式匹配是 Rust 最强大的控制流工具之一。match 表达式要求穷举所有可能情况。if let 用于只关心一种模式的场景，while let 用于循环中的模式匹配。解构可以深入提取嵌套数据结构中的值，守卫条件（guard）可以为匹配臂添加额外逻辑。'
          : 'Pattern matching is one of Rust\'s most powerful control flow tools. The match expression requires exhaustive handling of all possibilities. Use if let when you only care about one pattern, and while let for pattern matching in loops. Destructuring extracts values from nested data structures, and guards add extra logic to match arms.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '穷举性检查是 Rust 模式匹配的一大优势。当你向枚举添加新变体时，编译器会报告所有未处理该变体的 match 表达式，防止遗漏。使用 _ 通配符匹配所有剩余情况，使用 @ 绑定匹配到的值到一个变量。'
          : 'Exhaustiveness checking is a major advantage of Rust\'s pattern matching. When you add a new variant to an enum, the compiler reports every match expression that does not handle it, preventing omissions. Use the _ wildcard to match all remaining cases, and @ bindings to bind matched values to a variable.'}
      </p>
      <pre style={preStyle}><code>{'fn describe_number(n: i32) -> &\'static str {\n' +
'    match n {\n' +
'        0 => "zero",\n' +
'        1..=9 => "single digit",\n' +
'        10 | 20 | 30 => "round tens",\n' +
'        x if x < 0 => "negative",\n' +
'        _ => "other positive",\n' +
'    }\n' +
'}\n\n' +
'// if let for single-pattern matching\n' +
'let config: Option<&str> = Some("debug");\n' +
'if let Some(level) = config {\n' +
'    println!("Log level: {}", level);\n' +
'}\n\n' +
'// Destructuring nested structs\n' +
'let point = (3, -5);\n' +
'let (x, y) = point;\n' +
'match (x, y) {\n' +
'    (0, 0) => println!("origin"),\n' +
'    (x, 0) => println!("on x-axis at {}", x),\n' +
'    (0, y) => println!("on y-axis at {}", y),\n' +
'    (x, y) => println!("point at ({}, {})", x, y),\n' +
'}'}</code></pre>

      {/* Section 4: Traits & Generics */}
      <h2 style={h2Style}>{isZh ? '4. Trait 与泛型' : '4. Traits & Generics'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Trait 定义共享行为的方法集合，类似于其他语言中的接口但更强大。泛型通过 trait bound 约束类型参数，编译器在编译期将泛型单态化为具体类型，实现零成本抽象。impl Trait 语法可用于参数和返回类型的简写。dyn Trait 用于动态分派，通过虚表（vtable）在运行时确定调用的具体方法。'
          : 'Traits define a set of methods as shared behavior, similar to interfaces in other languages but more powerful. Generics constrain type parameters with trait bounds, and the compiler monomorphizes generics into concrete types at compile time for zero-cost abstractions. The impl Trait syntax is shorthand for parameters and return types. dyn Trait enables dynamic dispatch via vtables when the concrete type is resolved at runtime.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '常用标准库 trait 包括：Display（格式化输出）、Debug（调试输出）、Clone（深拷贝）、PartialEq/Eq（相等比较）、PartialOrd/Ord（排序比较）、Hash（哈希计算）、From/Into（类型转换）、Iterator（迭代器）、Drop（析构函数）。使用 #[derive] 属性可以自动实现大部分常用 trait。'
          : 'Common standard library traits include: Display (formatting), Debug (debug output), Clone (deep copy), PartialEq/Eq (equality), PartialOrd/Ord (ordering), Hash (hashing), From/Into (type conversion), Iterator (iteration), and Drop (destructor). Use the #[derive] attribute to auto-implement most common traits.'}
      </p>
      <pre style={preStyle}><code>{'trait Summary {\n' +
'    fn summarize(&self) -> String;    // required method\n' +
'    fn preview(&self) -> String {     // default implementation\n' +
'        format!("Read more: {}...", &self.summarize()[..20])\n' +
'    }\n' +
'}\n\n' +
'struct Article { title: String, content: String }\n\n' +
'impl Summary for Article {\n' +
'    fn summarize(&self) -> String {\n' +
'        format!("{}: {}", self.title, &self.content[..50])\n' +
'    }\n' +
'}\n\n' +
'// Static dispatch (monomorphized, zero-cost)\n' +
'fn notify(item: &impl Summary) { println!("{}", item.summarize()); }\n\n' +
'// Trait bound syntax (equivalent)\n' +
'fn notify_bound<T: Summary + Clone>(item: &T) { println!("{}", item.summarize()); }\n\n' +
'// Dynamic dispatch (vtable, runtime cost)\n' +
'fn print_all(items: &[&dyn Summary]) {\n' +
'    for item in items { println!("{}", item.summarize()); }\n' +
'}'}</code></pre>

      {/* Section 5: Error Handling */}
      <h2 style={h2Style}>{isZh ? '5. 错误处理' : '5. Error Handling'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 区分可恢复错误（Result<T, E>）和不可恢复错误（panic!）。? 运算符简化了错误传播，自动将 Err 值从函数返回。thiserror 库用于定义带有自动 From 实现的自定义错误类型，适合库开发。anyhow 库提供通用错误类型和上下文链，适合应用程序开发。'
          : 'Rust distinguishes between recoverable errors (Result<T, E>) and unrecoverable errors (panic!). The ? operator simplifies error propagation by automatically returning Err values from functions. The thiserror crate defines custom error types with automatic From implementations, ideal for libraries. The anyhow crate provides a universal error type with context chaining, ideal for applications.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Rust 没有异常（exception）机制。所有可能失败的操作都通过返回 Result 或 Option 来表示。这种设计强制调用者处理错误情况，消除了未处理异常导致的运行时崩溃。unwrap() 和 expect() 在遇到 Err/None 时会 panic，只应在原型开发或确定不会失败的场景中使用。生产代码应始终显式处理错误或使用 ? 传播。'
          : 'Rust has no exception mechanism. All fallible operations express failure through Result or Option return types. This design forces callers to handle error cases, eliminating runtime crashes from unhandled exceptions. unwrap() and expect() panic on Err/None and should only be used in prototypes or situations where failure is impossible. Production code should always handle errors explicitly or propagate with ?.'}
      </p>
      <pre style={preStyle}><code>{'use std::fs;\n' +
'use std::io;\n\n' +
'// The ? operator propagates errors automatically\n' +
'fn read_config(path: &str) -> Result<String, io::Error> {\n' +
'    let content = fs::read_to_string(path)?; // returns Err if fails\n' +
'    Ok(content.trim().to_string())\n' +
'}\n\n' +
'// Custom error with thiserror\n' +
'#[derive(Debug, thiserror::Error)]\n' +
'enum AppError {\n' +
'    #[error("IO error: {0}")]\n' +
'    Io(#[from] io::Error),\n' +
'    #[error("Parse error: {0}")]\n' +
'    Parse(#[from] std::num::ParseIntError),\n' +
'    #[error("Config key missing: {0}")]\n' +
'    MissingKey(String),\n' +
'}\n\n' +
'// anyhow for application code\n' +
'fn load_port() -> anyhow::Result<u16> {\n' +
'    let cfg = fs::read_to_string("config.txt")\n' +
'        .context("failed to read config")?;\n' +
'    let port: u16 = cfg.parse().context("invalid port number")?;\n' +
'    Ok(port)\n' +
'}'}</code></pre>

      {/* Section 6: Collections */}
      <h2 style={h2Style}>{isZh ? '6. 集合类型' : '6. Collections'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 标准库提供三种核心集合：Vec<T>（动态数组）、HashMap<K, V>（哈希映射）和 HashSet<T>（哈希集合）。迭代器是 Rust 集合操作的核心，提供惰性求值的链式操作，编译器会将其优化为与手写循环同等效率的代码。'
          : 'The Rust standard library provides three core collections: Vec<T> (dynamic array), HashMap<K, V> (hash map), and HashSet<T> (hash set). Iterators are central to Rust collection operations, providing lazy chained operations that the compiler optimizes to be as efficient as hand-written loops.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Vec 是最常用的集合，支持 push、pop、索引访问和切片操作。HashMap 的 entry API 是处理插入或更新操作的惯用方式，避免了重复查找。HashSet 基于 HashMap 实现，提供集合运算（并集、交集、差集）。所有集合都实现了 IntoIterator trait，可以在 for 循环中直接使用。'
          : 'Vec is the most commonly used collection, supporting push, pop, indexing, and slicing. HashMap\'s entry API is the idiomatic way to handle insert-or-update operations, avoiding duplicate lookups. HashSet is built on HashMap and provides set operations (union, intersection, difference). All collections implement IntoIterator and can be used directly in for loops.'}
      </p>
      <pre style={preStyle}><code>{'use std::collections::{HashMap, HashSet};\n\n' +
'fn main() {\n' +
'    // Vec: dynamic array\n' +
'    let mut nums = vec![1, 2, 3, 4, 5];\n' +
'    nums.push(6);\n' +
'    let doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();\n\n' +
'    // HashMap: key-value store\n' +
'    let mut scores: HashMap<&str, i32> = HashMap::new();\n' +
'    scores.insert("Alice", 95);\n' +
'    scores.entry("Bob").or_insert(80);\n' +
'    // Count word frequencies\n' +
'    let text = "hello world hello rust";\n' +
'    let mut freq = HashMap::new();\n' +
'    for word in text.split_whitespace() {\n' +
'        *freq.entry(word).or_insert(0) += 1;\n' +
'    }\n\n' +
'    // HashSet: unique values\n' +
'    let a: HashSet<i32> = [1, 2, 3].into();\n' +
'    let b: HashSet<i32> = [2, 3, 4].into();\n' +
'    let union: HashSet<_> = a.union(&b).collect();\n' +
'}'}</code></pre>

      {/* Section 7: Closures & Iterators */}
      <h2 style={h2Style}>{isZh ? '7. 闭包与迭代器' : '7. Closures & Iterators'}</h2>
      <p style={pStyle}>
        {isZh
          ? '闭包是可以捕获环境变量的匿名函数。Rust 根据闭包如何使用捕获的变量，自动推断其实现的 trait：Fn（不可变借用）、FnMut（可变借用）或 FnOnce（获取所有权）。迭代器适配器（map、filter、fold 等）是惰性的，只有在调用消费方法（如 collect、sum）时才执行。'
          : 'Closures are anonymous functions that can capture variables from their environment. Rust automatically infers which trait a closure implements based on how it uses captured variables: Fn (immutable borrow), FnMut (mutable borrow), or FnOnce (takes ownership). Iterator adapters (map, filter, fold, etc.) are lazy and only execute when a consuming method (collect, sum, etc.) is called.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '迭代器是 Rust 中处理序列数据的惯用方式，通常比手写的 for 循环更简洁且同样高效。编译器会将迭代器链优化为等效的循环代码（零成本抽象）。move 关键字强制闭包获取所有捕获变量的所有权，这在将闭包传递给线程或返回闭包时尤为重要。'
          : 'Iterators are the idiomatic way to process sequential data in Rust, often more concise than hand-written for loops and equally efficient. The compiler optimizes iterator chains into equivalent loop code (zero-cost abstraction). The move keyword forces a closure to take ownership of all captured variables, which is essential when passing closures to threads or returning closures.'}
      </p>
      <pre style={preStyle}><code>{'fn main() {\n' +
'    let multiplier = 3;\n' +
'    let multiply = |x: i32| x * multiplier;  // Fn: borrows multiplier\n\n' +
'    let mut count = 0;\n' +
'    let mut increment = || { count += 1; };    // FnMut: mutably borrows\n' +
'    increment();\n\n' +
'    let name = String::from("Alice");\n' +
'    let greet = move || println!("Hi, {}", name); // FnOnce: takes ownership\n\n' +
'    // Iterator chain: lazy evaluation\n' +
'    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n' +
'    let result: Vec<i32> = data.iter()\n' +
'        .filter(|&&x| x % 2 == 0)    // keep even numbers\n' +
'        .map(|&x| x * x)             // square them\n' +
'        .collect();                    // [4, 16, 36, 64, 100]\n\n' +
'    let sum: i32 = data.iter().fold(0, |acc, &x| acc + x); // 55\n' +
'    let max = data.iter().max();  // Some(&10)\n' +
'}'}</code></pre>

      {/* Section 8: Smart Pointers */}
      <h2 style={h2Style}>{isZh ? '8. 智能指针' : '8. Smart Pointers'}</h2>
      <p style={pStyle}>
        {isZh
          ? '智能指针是实现了 Deref 和 Drop trait 的结构体，不仅持有指向数据的指针，还拥有额外的元数据和能力。Box<T> 在堆上分配数据；Rc<T> 允许单线程中的多所有权；Arc<T> 是线程安全版本的 Rc；RefCell<T> 提供运行时借用检查的内部可变性；Mutex<T> 提供多线程互斥访问。'
          : 'Smart pointers are structs that implement Deref and Drop traits, holding not just a pointer to data but also additional metadata and capabilities. Box<T> allocates data on the heap. Rc<T> enables multiple ownership in single-threaded code. Arc<T> is the thread-safe version of Rc. RefCell<T> provides interior mutability with runtime borrow checking. Mutex<T> provides mutual exclusion for multi-threaded access.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '选择智能指针的经验法则：需要堆分配或递归类型用 Box；需要单线程共享所有权用 Rc；需要跨线程共享所有权用 Arc；需要单线程内部可变性用 RefCell；需要跨线程内部可变性用 Mutex 或 RwLock。常见组合模式是 Rc<RefCell<T>>（单线程共享可变状态）和 Arc<Mutex<T>>（多线程共享可变状态）。'
          : 'Rules of thumb for choosing smart pointers: Box for heap allocation or recursive types; Rc for single-threaded shared ownership; Arc for cross-thread shared ownership; RefCell for single-threaded interior mutability; Mutex or RwLock for cross-thread interior mutability. Common combinations are Rc<RefCell<T>> (single-threaded shared mutable state) and Arc<Mutex<T>> (multi-threaded shared mutable state).'}
      </p>
      <pre style={preStyle}><code>{'use std::cell::RefCell;\n' +
'use std::rc::Rc;\n' +
'use std::sync::{Arc, Mutex};\n\n' +
'fn main() {\n' +
'    // Box: heap allocation, single owner\n' +
'    let boxed: Box<i32> = Box::new(42);\n\n' +
'    // Rc: multiple owners (single-threaded)\n' +
'    let shared = Rc::new(String::from("shared data"));\n' +
'    let clone1 = Rc::clone(&shared);  // reference count: 2\n' +
'    println!("refs: {}", Rc::strong_count(&shared)); // 2\n\n' +
'    // RefCell: interior mutability (runtime borrow check)\n' +
'    let cell = RefCell::new(vec![1, 2, 3]);\n' +
'    cell.borrow_mut().push(4);  // mutable borrow at runtime\n\n' +
'    // Arc + Mutex: shared mutable state across threads\n' +
'    let counter = Arc::new(Mutex::new(0));\n' +
'    let c = Arc::clone(&counter);\n' +
'    std::thread::spawn(move || {\n' +
'        *c.lock().unwrap() += 1;\n' +
'    }).join().unwrap();\n' +
'    println!("count: {}", *counter.lock().unwrap()); // 1\n' +
'}'}</code></pre>

      {/* Section 9: Concurrency */}
      <h2 style={h2Style}>{isZh ? '9. 并发编程' : '9. Concurrency'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的所有权系统使并发编程安全可靠。标准库提供 OS 线程和通道（channel）进行消息传递。对于共享状态，使用 Arc<Mutex<T>>。对于异步 I/O 密集型工作负载，使用 async/await 语法配合 tokio 运行时。Send trait 标记类型可以安全地在线程间转移，Sync trait 标记类型可以安全地在线程间共享引用。'
          : 'Rust\'s ownership system makes concurrent programming safe and reliable. The standard library provides OS threads and channels for message passing. For shared state, use Arc<Mutex<T>>. For async I/O-bound workloads, use async/await syntax with the tokio runtime. The Send trait marks types safe to transfer between threads, and the Sync trait marks types safe to share references across threads.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的"无畏并发"意味着数据竞争在编译期被消除。如果代码编译通过，就不会有数据竞争。选择并发模型的经验法则：CPU 密集型计算用 rayon 进行数据并行；I/O 密集型任务用 tokio 的 async/await；简单的线程间通信用标准库的 channel；需要共享可变状态时用 Arc<Mutex<T>>。'
          : 'Rust\'s "fearless concurrency" means data races are eliminated at compile time. If your code compiles, there are no data races. Rules of thumb for choosing a concurrency model: CPU-bound computation uses rayon for data parallelism; I/O-bound tasks use tokio with async/await; simple inter-thread communication uses standard library channels; shared mutable state uses Arc<Mutex<T>>.'}
      </p>
      <pre style={preStyle}><code>{'use std::sync::mpsc;\n' +
'use std::thread;\n\n' +
'fn main() {\n' +
'    // Message passing with channels\n' +
'    let (tx, rx) = mpsc::channel();\n' +
'    let tx2 = tx.clone();\n\n' +
'    thread::spawn(move || { tx.send("from thread 1").unwrap(); });\n' +
'    thread::spawn(move || { tx2.send("from thread 2").unwrap(); });\n\n' +
'    for msg in rx.iter().take(2) {\n' +
'        println!("received: {}", msg);\n' +
'    }\n' +
'}\n\n' +
'// Async/await with tokio\n' +
'#[tokio::main]\n' +
'async fn main() {\n' +
'    let result = tokio::spawn(async {\n' +
'        reqwest::get("https://api.example.com/data")\n' +
'            .await.unwrap().text().await.unwrap()\n' +
'    }).await.unwrap();\n' +
'    println!("{}", result);\n' +
'}'}</code></pre>

      <h3 style={h3Style}>{isZh ? '选择并发模型' : 'Choosing a Concurrency Model'}</h3>
      <ul style={ulStyle}>
        <li><strong>{isZh ? '标准库线程' : 'std threads'}</strong> {isZh ? '— 适用于 CPU 密集型任务，每个线程有独立的栈空间（默认 8MB）' : '— best for CPU-bound tasks; each thread has its own stack (default 8MB)'}</li>
        <li><strong>mpsc::channel</strong> {isZh ? '— 多生产者单消费者通道，适合简单的线程间通信' : '— multi-producer single-consumer channel for simple inter-thread communication'}</li>
        <li><strong>Arc + Mutex</strong> {isZh ? '— 适合需要多线程共享和修改的状态，注意避免死锁' : '— for state shared and mutated by multiple threads; watch out for deadlocks'}</li>
        <li><strong>tokio async/await</strong> {isZh ? '— 适合 I/O 密集型（HTTP、数据库、文件），单线程可处理数千并发连接' : '— best for I/O-bound work (HTTP, databases, files); one thread can handle thousands of connections'}</li>
        <li><strong>rayon</strong> {isZh ? '— 数据并行，将 .iter() 替换为 .par_iter() 即可自动并行化' : '— data parallelism; replace .iter() with .par_iter() for automatic parallelization'}</li>
      </ul>

      {/* Section 10: Modules & Crates */}
      <h2 style={h2Style}>{isZh ? '10. 模块与包' : '10. Modules & Crates'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的模块系统由 crate（包）和 module（模块）组成。crate 是编译的最小单元，分为二进制 crate 和库 crate。mod 关键字声明模块，pub 控制可见性，use 引入路径。Cargo.toml 是项目的清单文件，管理依赖、版本和构建配置。工作区（workspace）可以管理多个相关的 crate。'
          : 'Rust\'s module system consists of crates (packages) and modules. A crate is the smallest compilation unit, either a binary crate or a library crate. The mod keyword declares modules, pub controls visibility, and use brings paths into scope. Cargo.toml is the project manifest managing dependencies, versions, and build configuration. Workspaces can manage multiple related crates.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '模块可以内联定义，也可以放在单独的文件中（src/module_name.rs 或 src/module_name/mod.rs）。pub(crate) 限制可见性为当前 crate 内部，pub(super) 限制为父模块。Cargo.toml 中的 [dependencies] 区域引入外部 crate，crates.io 是 Rust 官方的包注册中心。'
          : 'Modules can be defined inline or in separate files (src/module_name.rs or src/module_name/mod.rs). pub(crate) restricts visibility to the current crate, and pub(super) restricts to the parent module. The [dependencies] section in Cargo.toml pulls in external crates from crates.io, the official Rust package registry.'}
      </p>
      <pre style={preStyle}><code>{'// src/lib.rs\n' +
'pub mod auth {\n' +
'    pub struct Token(String);\n\n' +
'    impl Token {\n' +
'        pub fn new(secret: &str) -> Self {\n' +
'            Token(format!("tok_{}", secret))\n' +
'        }\n' +
'    }\n\n' +
'    mod internal {  // private module\n' +
'        pub fn validate(token: &str) -> bool {\n' +
'            token.starts_with("tok_")\n' +
'        }\n' +
'    }\n\n' +
'    pub fn is_valid(t: &Token) -> bool {\n' +
'        internal::validate(&t.0)\n' +
'    }\n' +
'}\n\n' +
'// src/main.rs\n' +
'use mylib::auth::Token;\n' +
'fn main() {\n' +
'    let t = Token::new("abc123");\n' +
'}'}</code></pre>

      <h3 style={h3Style}>{isZh ? 'Cargo.toml 示例' : 'Cargo.toml Example'}</h3>
      <pre style={preStyle}><code>{'[package]\n' +
'name = "my-project"\n' +
'version = "0.1.0"\n' +
'edition = "2021"\n\n' +
'[dependencies]\n' +
'serde = { version = "1.0", features = ["derive"] }\n' +
'serde_json = "1.0"\n' +
'tokio = { version = "1", features = ["full"] }\n' +
'anyhow = "1.0"\n' +
'tracing = "0.1"\n\n' +
'[dev-dependencies]\n' +
'criterion = "0.5"    # benchmarking\n\n' +
'[[bin]]\n' +
'name = "my-project"\n' +
'path = "src/main.rs"'}</code></pre>

      {/* Section 11: Macros */}
      <h2 style={h2Style}>{isZh ? '11. 宏' : '11. Macros'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的宏系统允许在编译期生成代码。声明式宏（macro_rules!）使用模式匹配对 token 树进行转换，类似于高级模板。过程宏（procedural macros）可以操作 Rust 的抽象语法树（AST），包括派生宏（#[derive]）、属性宏和函数式宏。标准库大量使用宏，如 vec!、println!、derive 等。'
          : 'Rust\'s macro system allows generating code at compile time. Declarative macros (macro_rules!) use pattern matching to transform token trees, acting as advanced templates. Procedural macros can manipulate Rust\'s abstract syntax tree (AST), including derive macros (#[derive]), attribute macros, and function-like macros. The standard library heavily uses macros like vec!, println!, and derive.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '宏与函数的关键区别：宏在编译期展开，可以接受可变数量的参数，可以生成新的类型和 trait 实现。声明式宏适合简单的代码生成（如创建集合字面量），过程宏适合复杂的代码生成（如序列化框架）。使用 cargo expand 可以查看宏展开后的代码。'
          : 'Key differences between macros and functions: macros expand at compile time, can accept a variable number of arguments, and can generate new types and trait implementations. Declarative macros suit simple code generation (like collection literals), while procedural macros suit complex code generation (like serialization frameworks). Use cargo expand to inspect expanded macro output.'}
      </p>
      <pre style={preStyle}><code>{'// Declarative macro: create a HashMap literal\n' +
'macro_rules! hashmap {\n' +
'    ($($key:expr => $val:expr),* $(,)?) => {{\n' +
'        let mut map = std::collections::HashMap::new();\n' +
'        $(map.insert($key, $val);)*\n' +
'        map\n' +
'    }};\n' +
'}\n\n' +
'let scores = hashmap! {\n' +
'    "Alice" => 95,\n' +
'    "Bob" => 87,\n' +
'    "Charlie" => 92,\n' +
'};\n\n' +
'// Derive macro usage (most common procedural macro)\n' +
'#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]\n' +
'struct Config {\n' +
'    host: String,\n' +
'    port: u16,\n' +
'    debug: bool,\n' +
'}'}</code></pre>

      {/* Section 12: Testing */}
      <h2 style={h2Style}>{isZh ? '12. 测试' : '12. Testing'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 内置了完善的测试框架。单元测试放在同一文件的 #[cfg(test)] 模块中，集成测试放在项目根目录的 tests/ 目录下，文档测试是 /// 注释中的代码示例会被自动编译运行。使用 assert!、assert_eq! 和 assert_ne! 宏进行断言。#[should_panic] 测试预期的 panic，cargo test 运行所有测试。'
          : 'Rust has a built-in testing framework. Unit tests live in a #[cfg(test)] module in the same file. Integration tests go in a tests/ directory at the crate root. Doc tests are code examples in /// comments that are automatically compiled and run. Use assert!, assert_eq!, and assert_ne! macros for assertions. #[should_panic] tests expected panics, and cargo test runs everything.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? '#[cfg(test)] 模块只在运行 cargo test 时编译，不会出现在发布构建中。集成测试中每个文件都是独立的 crate，只能访问公有 API。文档测试特别有用，因为它们既是文档又是测试，保证代码示例始终与实际行为一致。使用 cargo test -- --nocapture 可以在测试中看到 println! 输出。'
          : 'The #[cfg(test)] module is only compiled when running cargo test and is excluded from release builds. Each integration test file is a separate crate that can only access the public API. Doc tests are especially valuable because they serve as both documentation and tests, ensuring code examples stay in sync with actual behavior. Use cargo test -- --nocapture to see println! output during tests.'}
      </p>
      <pre style={preStyle}><code>{'pub fn add(a: i32, b: i32) -> i32 { a + b }\n' +
'pub fn divide(a: f64, b: f64) -> Result<f64, String> {\n' +
'    if b == 0.0 { Err("division by zero".into()) }\n' +
'    else { Ok(a / b) }\n' +
'}\n\n' +
'#[cfg(test)]\n' +
'mod tests {\n' +
'    use super::*;\n\n' +
'    #[test]\n' +
'    fn test_add() { assert_eq!(add(2, 3), 5); }\n\n' +
'    #[test]\n' +
'    fn test_divide_ok() {\n' +
'        assert!((divide(10.0, 3.0).unwrap() - 3.333).abs() < 0.01);\n' +
'    }\n\n' +
'    #[test]\n' +
'    fn test_divide_by_zero() {\n' +
'        assert!(divide(1.0, 0.0).is_err());\n' +
'    }\n\n' +
'    #[test]\n' +
'    #[should_panic(expected = "index out of bounds")]\n' +
'    fn test_panic() { let v = vec![1]; let _ = v[5]; }\n' +
'}'}</code></pre>

      {/* Section 13: Common Patterns */}
      <h2 style={h2Style}>{isZh ? '13. 常见设计模式' : '13. Common Patterns'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 的类型系统和所有权模型催生了独特的设计模式。Builder 模式用于构造复杂对象；Newtype 模式通过包装类型添加语义和类型安全；Typestate 模式利用类型系统在编译期强制状态转换的正确性；RAII（资源获取即初始化）确保资源在离开作用域时自动释放。'
          : 'Rust\'s type system and ownership model give rise to unique design patterns. The Builder pattern constructs complex objects step by step. The Newtype pattern wraps types to add semantics and type safety. The Typestate pattern uses the type system to enforce correct state transitions at compile time. RAII (Resource Acquisition Is Initialization) ensures resources are automatically released when they go out of scope.'}
      </p>
      <p style={pStyle}>
        {isZh
          ? 'Builder 模式在 Rust 中特别流行，因为 Rust 没有函数重载和默认参数。Newtype 模式的零成本抽象意味着包装类型在运行时与底层类型完全相同。RAII 是 Rust 资源管理的基石——文件句柄、网络连接和锁都在 Drop trait 中自动释放，确保不会泄漏。'
          : 'The Builder pattern is especially popular in Rust because Rust has no function overloading or default parameters. Newtype\'s zero-cost abstraction means the wrapper type is identical to the underlying type at runtime. RAII is the cornerstone of Rust resource management — file handles, network connections, and locks are all automatically released in Drop, ensuring no leaks.'}
      </p>
      <pre style={preStyle}><code>{'// Builder pattern\n' +
'struct ServerBuilder {\n' +
'    host: String,\n' +
'    port: u16,\n' +
'    max_connections: usize,\n' +
'}\n\n' +
'impl ServerBuilder {\n' +
'    fn new() -> Self {\n' +
'        Self { host: "127.0.0.1".into(), port: 8080, max_connections: 100 }\n' +
'    }\n' +
'    fn host(mut self, h: &str) -> Self { self.host = h.into(); self }\n' +
'    fn port(mut self, p: u16) -> Self { self.port = p; self }\n' +
'    fn build(self) -> String {\n' +
'        format!("{}:{} (max: {})", self.host, self.port, self.max_connections)\n' +
'    }\n' +
'}\n\n' +
'// Newtype pattern: type-safe wrapper\n' +
'struct Meters(f64);\n' +
'struct Kilometers(f64);\n' +
'impl From<Kilometers> for Meters {\n' +
'    fn from(km: Kilometers) -> Self { Meters(km.0 * 1000.0) }\n' +
'}'}</code></pre>

      {/* Common Compiler Errors */}
      <h2 style={h2Style}>{isZh ? '常见编译错误及解决方案' : 'Common Compiler Errors and Solutions'}</h2>
      <p style={pStyle}>
        {isZh
          ? 'Rust 编译器的错误信息非常详细且有帮助。以下是初学者最常遇到的编译错误及其解决方案。理解这些错误是掌握 Rust 的关键，因为编译器实际上是你最好的学习伙伴。'
          : 'Rust compiler error messages are highly detailed and helpful. Below are the most common compiler errors beginners encounter and how to fix them. Understanding these errors is key to mastering Rust, as the compiler is your best learning partner.'}
      </p>
      <pre style={preStyle}><code>{'// E0382: use of moved value\n' +
'let s = String::from("hello");\n' +
'let s2 = s;           // s is moved\n' +
'// println!("{}", s);  // error! Fix: use s2, or call s.clone()\n\n' +
'// E0502: cannot borrow as mutable, already borrowed as immutable\n' +
'let mut v = vec![1, 2, 3];\n' +
'let first = &v[0];    // immutable borrow\n' +
'// v.push(4);          // error! Fix: use first before push\n' +
'println!("{}", first); // use immutable borrow here\n' +
'v.push(4);             // now mutable borrow is ok\n\n' +
'// E0106: missing lifetime specifier\n' +
'// fn longest(a: &str, b: &str) -> &str  // error!\n' +
'fn longest<\'a>(a: &\'a str, b: &\'a str) -> &\'a str {\n' +
'    if a.len() > b.len() { a } else { b }\n' +
'}'}</code></pre>

      <p style={pStyle}>
        {isZh
          ? '生命周期错误（E0106）是初学者最困惑的问题。核心规则：如果函数返回一个引用，编译器需要知道返回值的生命周期与哪个输入参数相关联。大多数情况下，编译器可以自动推断（生命周期省略规则），但当有多个引用参数时需要手动标注。如果觉得生命周期太复杂，可以先使用拥有所有权的类型（如 String 代替 &str）来简化。'
          : 'Lifetime errors (E0106) are the most confusing for beginners. The core rule: if a function returns a reference, the compiler needs to know which input parameter\'s lifetime the return value is tied to. In most cases, the compiler infers this automatically (lifetime elision rules), but manual annotations are needed when there are multiple reference parameters. If lifetimes feel too complex, start by using owned types (e.g., String instead of &str) to simplify.'}
      </p>

      <h3 style={h3Style}>{isZh ? '编译器诊断技巧' : 'Compiler Diagnostic Tips'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '仔细阅读错误信息，Rust 编译器通常会建议具体的修复方案' : 'Read error messages carefully; the Rust compiler usually suggests specific fixes'}</li>
        <li>{isZh ? '使用 rustc --explain E0382 查看错误的详细解释和示例' : 'Use rustc --explain E0382 for detailed explanations and examples of any error code'}</li>
        <li>{isZh ? '使用 cargo clippy 获取更多代码改进建议' : 'Use cargo clippy for additional code improvement suggestions'}</li>
        <li>{isZh ? '使用 rust-analyzer IDE 插件获取实时错误提示和自动修复' : 'Use the rust-analyzer IDE plugin for real-time error hints and auto-fixes'}</li>
        <li>{isZh ? '遇到生命周期问题时，考虑是否可以用 clone() 或 owned 类型（String 代替 &str）简化' : 'When facing lifetime issues, consider if clone() or owned types (String instead of &str) can simplify things'}</li>
      </ul>

      {/* Summary / Cheat Sheet */}
      <h2 style={h2Style}>{isZh ? '总结速查表' : 'Quick Reference Cheat Sheet'}</h2>
      <h3 style={h3Style}>{isZh ? '所有权速查' : 'Ownership Quick Rules'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '每个值有且仅有一个所有者' : 'Every value has exactly one owner'}</li>
        <li>{isZh ? '赋值默认移动所有权（实现 Copy 的类型除外）' : 'Assignment moves ownership by default (except Copy types)'}</li>
        <li>{isZh ? '同一时间：一个 &mut T 或任意数量 &T，但不能同时存在' : 'At any time: one &mut T OR any number of &T, but not both'}</li>
        <li>{isZh ? '引用的生命周期不能超过被引用数据的生命周期' : 'References must not outlive the data they point to'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '错误处理速查' : 'Error Handling Quick Rules'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '可恢复错误用 Result<T, E>，不可恢复用 panic!' : 'Recoverable errors: Result<T, E>; unrecoverable: panic!'}</li>
        <li>{isZh ? '用 ? 传播错误，避免生产代码中使用 unwrap()' : 'Propagate with ?; avoid unwrap() in production'}</li>
        <li>{isZh ? '库用 thiserror，应用用 anyhow' : 'Libraries: thiserror; applications: anyhow'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '并发速查' : 'Concurrency Quick Rules'}</h3>
      <ul style={ulStyle}>
        <li>{isZh ? '消息传递：mpsc::channel' : 'Message passing: mpsc::channel'}</li>
        <li>{isZh ? '共享状态：Arc<Mutex<T>> 或 Arc<RwLock<T>>' : 'Shared state: Arc<Mutex<T>> or Arc<RwLock<T>>'}</li>
        <li>{isZh ? '异步 I/O：async/await + tokio' : 'Async I/O: async/await + tokio'}</li>
        <li>{isZh ? 'Send = 可跨线程转移，Sync = 可跨线程共享引用' : 'Send = transferable across threads; Sync = shareable across threads'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? 'Cargo 常用命令' : 'Cargo Common Commands'}</h3>
      <ul style={ulStyle}>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo new myproject</code> {isZh ? '— 创建新项目' : '— create a new project'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo build --release</code> {isZh ? '— 优化构建' : '— optimized build'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo test</code> {isZh ? '— 运行所有测试' : '— run all tests'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo clippy</code> {isZh ? '— 代码静态分析' : '— lint your code'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo doc --open</code> {isZh ? '— 生成并打开文档' : '— generate and open docs'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo fmt</code> {isZh ? '— 自动格式化代码' : '— auto-format your code'}</li>
        <li><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em' }}>cargo add serde</code> {isZh ? '— 添加依赖' : '— add a dependency'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '常用 trait 速查' : 'Common Traits Quick Reference'}</h3>
      <ul style={ulStyle}>
        <li><strong>Display</strong> {isZh ? '— 用户友好的格式化输出（用于 println! 的 {} 格式）' : '— user-friendly formatting (used by println! with {})'}</li>
        <li><strong>Debug</strong> {isZh ? '— 调试输出（用于 println! 的 {:?} 格式）' : '— debug output (used by println! with {:?})'}</li>
        <li><strong>Clone / Copy</strong> {isZh ? '— Clone 用于显式深拷贝，Copy 用于隐式按位复制' : '— Clone for explicit deep copy, Copy for implicit bitwise copy'}</li>
        <li><strong>From / Into</strong> {isZh ? '— 类型转换，实现 From 自动获得 Into' : '— type conversion; implementing From gives you Into for free'}</li>
        <li><strong>Iterator</strong> {isZh ? '— 只需实现 next() 方法即可获得 70+ 个适配器方法' : '— implement next() to get 70+ adapter methods for free'}</li>
        <li><strong>Deref / DerefMut</strong> {isZh ? '— 智能指针自动解引用' : '— smart pointer auto-dereferencing'}</li>
        <li><strong>Send / Sync</strong> {isZh ? '— 编译期线程安全标记' : '— compile-time thread safety markers'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '推荐 Crate' : 'Recommended Crates'}</h3>
      <ul style={ulStyle}>
        <li><strong>serde</strong> + <strong>serde_json</strong> {isZh ? '— 序列化与反序列化框架' : '— serialization/deserialization framework'}</li>
        <li><strong>tokio</strong> {isZh ? '— 异步运行时（async/await）' : '— async runtime for async/await'}</li>
        <li><strong>reqwest</strong> {isZh ? '— HTTP 客户端' : '— HTTP client'}</li>
        <li><strong>clap</strong> {isZh ? '— 命令行参数解析' : '— command-line argument parsing'}</li>
        <li><strong>thiserror</strong> / <strong>anyhow</strong> {isZh ? '— 错误处理' : '— error handling'}</li>
        <li><strong>tracing</strong> {isZh ? '— 结构化日志与分布式追踪' : '— structured logging and distributed tracing'}</li>
        <li><strong>sqlx</strong> {isZh ? '— 编译期检查的异步数据库驱动' : '— compile-time checked async database driver'}</li>
        <li><strong>axum</strong> {isZh ? '— 基于 tokio 的 Web 框架' : '— web framework built on tokio'}</li>
        <li><strong>rayon</strong> {isZh ? '— 数据并行计算' : '— data parallelism made easy'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? 'Rust vs 其他语言' : 'Rust vs Other Languages'}</h3>
      <ul style={ulStyle}>
        <li><strong>Rust vs C/C++</strong> {isZh ? '— 同等性能，但 Rust 在编译期消除内存安全问题，无需手动管理内存' : '— comparable performance, but Rust eliminates memory safety issues at compile time without manual memory management'}</li>
        <li><strong>Rust vs Go</strong> {isZh ? '— Rust 性能更高且无 GC 停顿，Go 学习曲线更平缓且编译更快' : '— Rust has higher performance with no GC pauses; Go has a gentler learning curve and faster compilation'}</li>
        <li><strong>Rust vs Java/C#</strong> {isZh ? '— Rust 无运行时开销和 GC，但学习曲线更陡；Java/C# 生态更成熟' : '— Rust has no runtime overhead or GC but a steeper learning curve; Java/C# have more mature ecosystems'}</li>
        <li><strong>Rust vs Python</strong> {isZh ? '— Rust 性能快 10-100 倍，适合性能关键路径；Python 适合快速原型和脚本' : '— Rust is 10-100x faster, ideal for performance-critical paths; Python excels at rapid prototyping and scripting'}</li>
        <li><strong>Rust vs TypeScript</strong> {isZh ? '— Rust 编译为原生代码或 WASM，TypeScript 运行在 JS 引擎上；两者都有强类型系统' : '— Rust compiles to native code or WASM; TypeScript runs on JS engines; both have strong type systems'}</li>
      </ul>

      <h3 style={h3Style}>{isZh ? '学习路径建议' : 'Suggested Learning Path'}</h3>
      <p style={pStyle}>
        {isZh
          ? '建议的 Rust 学习顺序：(1) 掌握所有权、借用和生命周期——这是 Rust 的核心概念；(2) 学习结构体、枚举和模式匹配——建立数据建模能力；(3) 理解 trait 和泛型——掌握抽象能力；(4) 学习错误处理和集合——写出实用代码；(5) 深入智能指针和并发——构建复杂系统；(6) 探索宏和高级模式——提升代码复用能力。每个阶段都配合实际项目练习，推荐从命令行工具开始，逐步过渡到 Web 服务。'
          : 'Recommended Rust learning order: (1) Master ownership, borrowing, and lifetimes — these are the core concepts; (2) Learn structs, enums, and pattern matching — build data modeling skills; (3) Understand traits and generics — master abstraction; (4) Learn error handling and collections — write practical code; (5) Dive into smart pointers and concurrency — build complex systems; (6) Explore macros and advanced patterns — improve code reuse. Practice with real projects at each stage. Start with CLI tools, then progress to web services.'}
      </p>

      <h3 style={h3Style}>{isZh ? '推荐学习资源' : 'Recommended Learning Resources'}</h3>
      <ul style={ulStyle}>
        <li><strong>The Rust Book</strong> {isZh ? '— 官方教程（doc.rust-lang.org/book），最全面的入门资源' : '— the official tutorial (doc.rust-lang.org/book), the most comprehensive beginner resource'}</li>
        <li><strong>Rust by Example</strong> {isZh ? '— 通过代码示例学习（doc.rust-lang.org/rust-by-example）' : '— learn through code examples (doc.rust-lang.org/rust-by-example)'}</li>
        <li><strong>Rustlings</strong> {isZh ? '— 交互式练习，通过修复编译错误学习' : '— interactive exercises that teach by fixing compiler errors'}</li>
        <li><strong>Exercism Rust Track</strong> {isZh ? '— 有导师指导的编程练习' : '— mentored coding exercises with feedback'}</li>
        <li><strong>std docs</strong> {isZh ? '— 标准库文档（doc.rust-lang.org/std），每个 API 都有示例' : '— standard library docs (doc.rust-lang.org/std) with examples for every API'}</li>
      </ul>
    </>
  );
}
