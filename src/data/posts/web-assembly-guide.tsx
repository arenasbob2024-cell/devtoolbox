'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'WebAssembly Guide: Wasm Fundamentals, Rust/C++ Compilation, JavaScript Interop & Performance',
    intro: 'WebAssembly (Wasm) is a binary instruction format designed as a portable compilation target for high-level languages. It enables near-native performance in web browsers and beyond. Since reaching W3C Recommendation status, WebAssembly has become a foundational technology for compute-intensive web applications, server-side runtimes, and edge computing. This guide covers everything from Wasm fundamentals to advanced topics like SIMD, threading, and upcoming proposals.',
    tldr: 'WebAssembly is a low-level binary format that runs at near-native speed in all major browsers. Compile from Rust (wasm-pack) or C/C++ (Emscripten), call Wasm functions from JavaScript via typed imports/exports, and leverage SIMD and threading for peak performance. WASI extends Wasm beyond the browser into server and edge environments.',
    keyTakeaways: 'Key Takeaways',
    kt1: 'Wasm delivers 1.2x to 2x native speed in browsers, far exceeding JavaScript for compute-heavy tasks.',
    kt2: 'Rust (wasm-pack + wasm-bindgen) offers the best ergonomics for Wasm development with zero-cost abstractions.',
    kt3: 'Emscripten compiles C/C++ codebases to Wasm, enabling legacy code reuse in the browser.',
    kt4: 'JavaScript interop uses imports/exports and TypedArrays for efficient data exchange with linear memory.',
    kt5: 'WASI provides a POSIX-like system interface, enabling Wasm modules to run outside the browser.',
    kt6: 'SIMD instructions and SharedArrayBuffer threading unlock parallel, vectorized computation in Wasm.',
    h2WhatIs: 'What Is WebAssembly?',
    whatIsDesc: 'WebAssembly is a binary instruction format for a stack-based virtual machine. It is designed to be a portable compilation target for programming languages, enabling deployment on the web for client and server applications. Wasm code is delivered in a compact binary format (.wasm files) that is decoded and compiled by the browser engine much faster than parsing equivalent JavaScript.',
    whatIsFormats: 'WebAssembly has two representations: the binary format (.wasm) used in production, and the text format (WAT - WebAssembly Text Format) used for debugging and manual inspection. WAT uses S-expressions and is human-readable. Modules are the fundamental unit of Wasm code, containing functions, tables, memory, and globals.',
    h2Memory: 'Memory Model',
    memoryDesc: 'WebAssembly uses a linear memory model. Memory is represented as a contiguous, resizable array of bytes. It is allocated in 64KB pages and can be shared between Wasm and JavaScript. The linear memory is bounds-checked at runtime, preventing buffer overflows from escaping the sandbox.',
    memoryShared: 'Shared memory (using SharedArrayBuffer) enables multiple Wasm instances or Web Workers to read and write the same memory region. This is essential for multi-threaded Wasm applications. Atomic operations ensure data consistency across threads.',
    h2Rust: 'Compiling from Rust',
    rustDesc: 'Rust is the most popular language for WebAssembly development thanks to its zero-cost abstractions, lack of a garbage collector, and excellent Wasm tooling. The wasm-pack tool handles building, testing, and publishing Rust-generated Wasm packages. The wasm-bindgen crate provides the bridge between Rust types and JavaScript.',
    rustSetup: 'To get started, install the Wasm target and wasm-pack. Create a new library crate and configure it with the cdylib crate type for Wasm output.',
    h2Cpp: 'Compiling from C/C++',
    cppDesc: 'Emscripten is the primary toolchain for compiling C and C++ code to WebAssembly. It provides a complete SDK including a compiler (emcc), system libraries, and JavaScript glue code generation. Emscripten can compile large existing codebases including game engines, codecs, and scientific libraries.',
    cppFlags: 'The emcc compiler supports various optimization flags. Use -O2 or -O3 for production builds, -g for debug info, and -s flags for Wasm-specific settings like ALLOW_MEMORY_GROWTH and EXPORTED_FUNCTIONS.',
    h2Interop: 'JavaScript Interop',
    interopDesc: 'WebAssembly modules communicate with JavaScript through imports and exports. Exported functions can be called from JavaScript, and imported functions allow Wasm to call back into JavaScript. Data exchange happens through linear memory using TypedArrays for efficient zero-copy access to Wasm memory from JavaScript.',
    interopTyped: 'TypedArrays such as Uint8Array, Float32Array, and Int32Array provide views into WebAssembly linear memory. This enables passing complex data structures between JavaScript and Wasm without serialization overhead.',
    h2Wasi: 'WASI (WebAssembly System Interface)',
    wasiDesc: 'WASI is a modular system interface for WebAssembly that provides POSIX-like APIs for file system access, networking, clocks, random numbers, and more. It enables Wasm modules to run outside the browser in runtimes like Wasmtime, Wasmer, and WasmEdge. WASI uses a capability-based security model where modules only get access to explicitly granted resources.',
    wasiRuntimes: 'Popular WASI runtimes include Wasmtime (Bytecode Alliance reference implementation), Wasmer (universal runtime with multiple backends), and WasmEdge (optimized for cloud-native and edge computing). Each supports different WASI proposals and embedding scenarios.',
    h2Performance: 'Performance Benchmarks vs JavaScript',
    perfDesc: 'WebAssembly consistently outperforms JavaScript for compute-intensive tasks. Benchmarks show Wasm achieving 1.2x to 2x near-native performance for numerical computation, while JavaScript typically runs at 3x to 10x slower than native. The gap is most significant for tight loops, integer arithmetic, and memory-intensive operations.',
    perfTable: 'Performance varies by workload type. For DOM manipulation and string processing, JavaScript may be faster due to the overhead of crossing the Wasm-JS boundary. For cryptography, image processing, physics simulations, and data compression, Wasm provides substantial speedups.',
    h2UseCases: 'Use Cases',
    useCasesDesc: 'WebAssembly excels in scenarios requiring high performance, code reuse from other languages, or sandboxed execution. Key use cases include image and video processing (Photon, FFmpeg.wasm), cryptographic operations (libsodium), game engines (Unity, Unreal), audio/video codecs (AV1, Opus), scientific computing (NumPy via Pyodide), CAD applications, and plugin systems.',
    h2Threading: 'Threading',
    threadingDesc: 'WebAssembly threading uses SharedArrayBuffer and Web Workers to enable parallel execution. The threads proposal adds atomic operations and shared linear memory. Wasm threads map to Web Workers in browsers, with each worker instantiating the same Wasm module with shared memory.',
    threadingNote: 'Threading requires cross-origin isolation headers (Cross-Origin-Opener-Policy: same-origin and Cross-Origin-Embedder-Policy: require-corp) to enable SharedArrayBuffer. Atomics provide wait/notify primitives for thread synchronization.',
    h2Simd: 'SIMD Instructions',
    simdDesc: 'WebAssembly SIMD (Single Instruction, Multiple Data) enables parallel processing of data using 128-bit vectors. It provides operations on packed integers and floating-point values, processing 4 float32 or 2 float64 values simultaneously. SIMD is particularly effective for image processing, audio DSP, matrix operations, and physics simulations.',
    simdSupport: 'The fixed-width 128-bit SIMD proposal is supported in all major browsers. Rust exposes SIMD through the std::arch::wasm32 module, while C/C++ uses the wasm_simd128.h header with familiar intrinsics.',
    h2Debugging: 'Debugging',
    debugDesc: 'Chrome DevTools provides native WebAssembly debugging support. You can set breakpoints in WAT or source-mapped high-level languages, inspect linear memory, view the call stack, and step through Wasm instructions. The DWARF debug format enables source-level debugging for C/C++ and Rust.',
    debugTools: 'Additional tools include wasm-tools (inspection, validation, transformation), wasm-objdump (disassembly), wasm-opt from Binaryen (optimization passes), and browser console logging via imported JavaScript functions.',
    h2Future: 'Future Proposals',
    futureDesc: 'The WebAssembly ecosystem continues to evolve with several significant proposals in various stages of standardization.',
    futureGC: 'The GC (Garbage Collection) proposal adds struct, array, and reference types to Wasm, enabling languages with garbage collectors (Java, Kotlin, Dart, Go) to compile to smaller, faster Wasm modules without shipping their own GC runtime.',
    futureComponent: 'The Component Model defines a higher-level module format with rich types, enabling Wasm components to compose with each other and with host environments using typed interfaces (WIT - Wasm Interface Type). This is the foundation for language-agnostic plugin systems.',
    futureStack: 'Stack Switching enables efficient coroutines, async/await, and lightweight green threads in WebAssembly without transforming the source code. This is critical for languages with built-in concurrency models.',
    h2BestPractices: 'Best Practices',
    bp1: 'Minimize Wasm-JS boundary crossings by batching operations and using shared memory.',
    bp2: 'Use wasm-opt from Binaryen to optimize Wasm binaries after compilation.',
    bp3: 'Stream-compile large modules with WebAssembly.compileStreaming() for faster startup.',
    bp4: 'Cache compiled modules in IndexedDB to avoid recompilation on subsequent visits.',
    bp5: 'Profile with browser DevTools to identify whether bottlenecks are in Wasm or in JS interop.',
    bp6: 'Use SIMD for data-parallel workloads like image processing and numerical computation.',
    bp7: 'Enable threading only when needed and ensure cross-origin isolation headers are set.',
    bp8: 'Keep Wasm modules small by excluding unused functions with link-time optimization (LTO).',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can WebAssembly replace JavaScript?',
    faq1A: 'No. WebAssembly is designed to complement JavaScript, not replace it. Wasm excels at compute-intensive tasks, while JavaScript handles DOM manipulation, event handling, and UI logic. Most applications use both: JavaScript for orchestration and Wasm for performance-critical code paths.',
    faq2Q: 'Is WebAssembly safe and sandboxed?',
    faq2A: 'Yes. WebAssembly runs in the same sandbox as JavaScript with the same security policies. It cannot access the DOM directly, make network requests, or access the file system without going through JavaScript or WASI APIs. Linear memory is bounds-checked, preventing buffer overflows from escaping the sandbox.',
    faq3Q: 'Which language should I use for WebAssembly?',
    faq3A: 'Rust is the most popular choice due to its excellent Wasm tooling, zero-cost abstractions, and lack of a garbage collector. C/C++ is ideal for porting existing codebases. AssemblyScript (TypeScript-like syntax) offers a gentle learning curve. Go, Kotlin, and C# also have Wasm support.',
    faq4Q: 'How much faster is WebAssembly than JavaScript?',
    faq4A: 'Typically 1.5x to 3x faster for compute-intensive tasks. The exact speedup depends on the workload: integer arithmetic and memory-intensive operations see the largest gains. For string processing and DOM interaction, the overhead of Wasm-JS boundary crossing can negate the speed advantage.',
    faq5Q: 'Can WebAssembly access the DOM?',
    faq5A: 'Not directly. WebAssembly cannot call DOM APIs natively. It must go through JavaScript imports to manipulate the DOM. Libraries like wasm-bindgen (Rust) and Emscripten (C++) provide convenient abstractions for DOM access from Wasm code.',
    faq6Q: 'What is WASI and why does it matter?',
    faq6A: 'WASI (WebAssembly System Interface) is a standardized API that lets Wasm modules access operating system features like file I/O, networking, and environment variables. It enables Wasm to run outside browsers in server, edge, and embedded environments, making it a universal runtime format.',
    faq7Q: 'Does WebAssembly support multithreading?',
    faq7A: 'Yes. The Wasm threads proposal enables shared linear memory via SharedArrayBuffer and atomic operations. In browsers, Wasm threads map to Web Workers. Cross-origin isolation headers are required. Languages like Rust and C++ can compile multi-threaded code to Wasm with pthreads support.',
    faq8Q: 'What are the main limitations of WebAssembly?',
    faq8A: 'Current limitations include no direct DOM access, overhead for frequent Wasm-JS boundary crossings, limited debugging compared to JavaScript, no built-in garbage collection (addressed by the GC proposal), and the need for cross-origin isolation for threading. Bundle sizes can also be large for complex applications.',
    thTask: 'Task',
    thWasm: 'Wasm',
    thJs: 'JavaScript',
    thSpeedup: 'Speedup',
  },
  zh: {
    title: 'WebAssembly 指南：Wasm 基础、Rust/C++ 编译、JavaScript 交互与性能优化',
    intro: 'WebAssembly（Wasm）是一种二进制指令格式，设计为高级语言的可移植编译目标。它在 Web 浏览器及其他环境中实现接近原生的性能。自成为 W3C 推荐标准以来，WebAssembly 已成为计算密集型 Web 应用、服务端运行时和边缘计算的基础技术。本指南涵盖从 Wasm 基础到 SIMD、线程和未来提案的所有内容。',
    tldr: 'WebAssembly 是一种低级二进制格式，在所有主流浏览器中以接近原生速度运行。可从 Rust（wasm-pack）或 C/C++（Emscripten）编译，通过类型化的导入/导出从 JavaScript 调用 Wasm 函数，并利用 SIMD 和线程实现最佳性能。WASI 将 Wasm 扩展到浏览器之外的服务器和边缘环境。',
    keyTakeaways: '关键要点',
    kt1: 'Wasm 在浏览器中提供 1.2 到 2 倍的原生速度，远超 JavaScript 处理计算密集型任务的能力。',
    kt2: 'Rust（wasm-pack + wasm-bindgen）凭借零成本抽象提供最佳的 Wasm 开发体验。',
    kt3: 'Emscripten 将 C/C++ 代码库编译为 Wasm，实现浏览器中的遗留代码复用。',
    kt4: 'JavaScript 互操作使用导入/导出和 TypedArrays 与线性内存进行高效数据交换。',
    kt5: 'WASI 提供类 POSIX 的系统接口，使 Wasm 模块能在浏览器外运行。',
    kt6: 'SIMD 指令和 SharedArrayBuffer 线程解锁 Wasm 中的并行向量化计算。',
    h2WhatIs: '什么是 WebAssembly？',
    whatIsDesc: 'WebAssembly 是一种基于栈式虚拟机的二进制指令格式。它被设计为编程语言的可移植编译目标，支持在 Web 上部署客户端和服务端应用。Wasm 代码以紧凑的二进制格式（.wasm 文件）交付，浏览器引擎对其解码和编译的速度远快于解析等效的 JavaScript。',
    whatIsFormats: 'WebAssembly 有两种表示形式：生产中使用的二进制格式（.wasm）和用于调试的文本格式（WAT）。模块是 Wasm 代码的基本单元，包含函数、表、内存和全局变量。',
    h2Memory: '内存模型',
    memoryDesc: 'WebAssembly 使用线性内存模型。内存表示为连续的可调整大小的字节数组，以 64KB 页为单位分配，可在 Wasm 和 JavaScript 之间共享。线性内存在运行时进行边界检查，防止缓冲区溢出逃逸沙箱。',
    memoryShared: '共享内存（使用 SharedArrayBuffer）使多个 Wasm 实例或 Web Workers 能够读写同一内存区域。原子操作确保跨线程的数据一致性。',
    h2Rust: '从 Rust 编译',
    rustDesc: 'Rust 是最流行的 WebAssembly 开发语言，得益于零成本抽象、无垃圾回收器和优秀的 Wasm 工具链。wasm-pack 处理构建、测试和发布。wasm-bindgen 提供 Rust 类型和 JavaScript 之间的桥梁。',
    rustSetup: '首先安装 Wasm 目标和 wasm-pack，创建新的库 crate 并配置 cdylib crate 类型。',
    h2Cpp: '从 C/C++ 编译',
    cppDesc: 'Emscripten 是将 C/C++ 编译为 WebAssembly 的主要工具链，提供完整的 SDK，包括编译器（emcc）、系统库和 JavaScript 胶水代码生成。',
    cppFlags: 'emcc 编译器支持多种优化标志。生产构建使用 -O2 或 -O3，调试使用 -g，Wasm 特定设置使用 -s 标志。',
    h2Interop: 'JavaScript 互操作',
    interopDesc: 'WebAssembly 模块通过导入和导出与 JavaScript 通信。导出函数可从 JavaScript 调用，导入函数允许 Wasm 回调 JavaScript。数据交换通过线性内存使用 TypedArrays 进行。',
    interopTyped: 'TypedArrays（如 Uint8Array、Float32Array）提供对 WebAssembly 线性内存的视图，实现无序列化开销的数据传递。',
    h2Wasi: 'WASI（WebAssembly 系统接口）',
    wasiDesc: 'WASI 是 WebAssembly 的模块化系统接口，提供类 POSIX 的文件系统、网络、时钟等 API。它使 Wasm 模块能在 Wasmtime、Wasmer 等运行时中运行，采用基于能力的安全模型。',
    wasiRuntimes: '流行的 WASI 运行时包括 Wasmtime、Wasmer 和 WasmEdge，各自支持不同的 WASI 提案和嵌入场景。',
    h2Performance: '与 JavaScript 的性能对比',
    perfDesc: 'WebAssembly 在计算密集型任务中始终优于 JavaScript。基准测试显示 Wasm 达到 1.2 到 2 倍的接近原生性能，而 JavaScript 通常比原生慢 3 到 10 倍。',
    perfTable: '性能因工作负载类型而异。对于加密、图像处理和数据压缩，Wasm 提供显著加速；对于 DOM 操作，JavaScript 可能更快。',
    h2UseCases: '使用场景',
    useCasesDesc: 'WebAssembly 擅长需要高性能、跨语言代码复用或沙箱执行的场景，包括图像处理、加密操作、游戏引擎、音视频编解码器和科学计算等。',
    h2Threading: '线程',
    threadingDesc: 'WebAssembly 线程使用 SharedArrayBuffer 和 Web Workers 实现并行执行。线程提案添加原子操作和共享线性内存。',
    threadingNote: '线程需要跨域隔离头（COOP 和 COEP）来启用 SharedArrayBuffer。原子操作提供等待/通知原语用于线程同步。',
    h2Simd: 'SIMD 指令',
    simdDesc: 'WebAssembly SIMD 使用 128 位向量实现数据并行处理，可同时处理 4 个 float32 或 2 个 float64 值。特别适用于图像处理、音频 DSP 和矩阵运算。',
    simdSupport: '固定宽度 128 位 SIMD 提案已在所有主流浏览器中支持。Rust 通过 std::arch::wasm32 模块暴露 SIMD。',
    h2Debugging: '调试',
    debugDesc: 'Chrome DevTools 提供原生 WebAssembly 调试支持，包括断点设置、线性内存检查、调用栈查看和指令步进。DWARF 调试格式支持源码级调试。',
    debugTools: '其他工具包括 wasm-tools、wasm-objdump、wasm-opt 和浏览器控制台日志。',
    h2Future: '未来提案',
    futureDesc: 'WebAssembly 生态系统持续发展，多个重要提案正在标准化的不同阶段。',
    futureGC: 'GC（垃圾回收）提案为 Wasm 添加结构体、数组和引用类型，使带 GC 的语言（Java、Kotlin、Go）能编译为更小更快的 Wasm 模块。',
    futureComponent: '组件模型定义了具有丰富类型的高级模块格式，使 Wasm 组件能通过 WIT 接口类型相互组合。',
    futureStack: '栈切换支持 Wasm 中的协程、async/await 和轻量级绿色线程。',
    h2BestPractices: '最佳实践',
    bp1: '通过批量操作和共享内存最小化 Wasm-JS 边界穿越。',
    bp2: '使用 Binaryen 的 wasm-opt 在编译后优化 Wasm 二进制文件。',
    bp3: '使用 WebAssembly.compileStreaming() 流式编译大模块以加快启动。',
    bp4: '在 IndexedDB 中缓存编译后的模块，避免重复编译。',
    bp5: '使用浏览器 DevTools 分析瓶颈在 Wasm 还是 JS 互操作中。',
    bp6: '对图像处理和数值计算等数据并行工作负载使用 SIMD。',
    bp7: '仅在需要时启用线程，并确保设置跨域隔离头。',
    bp8: '通过链接时优化（LTO）排除未使用的函数来保持 Wasm 模块小巧。',
    h2Faq: '常见问题',
    faq1Q: 'WebAssembly 能替代 JavaScript 吗？',
    faq1A: '不能。WebAssembly 旨在补充 JavaScript 而非替代它。Wasm 擅长计算密集型任务，JavaScript 处理 DOM 操作和 UI 逻辑。大多数应用同时使用两者。',
    faq2Q: 'WebAssembly 安全吗？',
    faq2A: '是的。WebAssembly 在与 JavaScript 相同的沙箱中运行。它不能直接访问 DOM、发起网络请求或访问文件系统。线性内存有边界检查。',
    faq3Q: '应该用什么语言开发 WebAssembly？',
    faq3A: 'Rust 是最流行的选择。C/C++ 适合移植现有代码库。AssemblyScript 提供较低的学习曲线。Go、Kotlin 和 C# 也支持 Wasm。',
    faq4Q: 'WebAssembly 比 JavaScript 快多少？',
    faq4A: '对于计算密集型任务通常快 1.5 到 3 倍。具体加速取决于工作负载类型。',
    faq5Q: 'WebAssembly 能访问 DOM 吗？',
    faq5A: '不能直接访问。Wasm 必须通过 JavaScript 导入来操作 DOM。wasm-bindgen 和 Emscripten 提供了便捷的 DOM 访问抽象。',
    faq6Q: '什么是 WASI？',
    faq6A: 'WASI 是一个标准化 API，让 Wasm 模块访问文件 I/O、网络等操作系统功能，使 Wasm 能在服务器和边缘环境中运行。',
    faq7Q: 'WebAssembly 支持多线程吗？',
    faq7A: '支持。Wasm 线程提案通过 SharedArrayBuffer 启用共享线性内存和原子操作。在浏览器中映射到 Web Workers。',
    faq8Q: 'WebAssembly 的主要限制是什么？',
    faq8A: '当前限制包括不能直接访问 DOM、频繁 Wasm-JS 边界穿越的开销、有限的调试支持、无内置垃圾回收，以及线程需要跨域隔离。',
    thTask: '任务',
    thWasm: 'Wasm',
    thJs: 'JavaScript',
    thSpeedup: '加速比',
  },
};

export default function WebAssemblyGuide({ lang }: { lang: string }) {
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
      { '@type': 'Question', name: t.faq6Q, acceptedAnswer: { '@type': 'Answer', text: t.faq6A } },
      { '@type': 'Question', name: t.faq7Q, acceptedAnswer: { '@type': 'Answer', text: t.faq7A } },
      { '@type': 'Question', name: t.faq8Q, acceptedAnswer: { '@type': 'Answer', text: t.faq8A } },
    ],
  };

  const sectionTitle: React.CSSProperties = { fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' };
  const subTitle: React.CSSProperties = { fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' };
  const paragraph: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', color: '#e5e7eb', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.6' };
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.925rem' };
  const thStyle: React.CSSProperties = { padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #e2e8f0', fontWeight: 600, backgroundColor: '#f8fafc' };
  const tdStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0' };
  const listStyle: React.CSSProperties = { paddingLeft: '1.5rem', marginBottom: '1rem' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.7' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR Box */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0 0.375rem 0.375rem 0' }}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ margin: 0, lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '0.375rem' }}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{t.keyTakeaways}</strong>
        <ul style={{ ...listStyle, marginBottom: 0 }}>
          <li style={listItem}>{t.kt1}</li>
          <li style={listItem}>{t.kt2}</li>
          <li style={listItem}>{t.kt3}</li>
          <li style={listItem}>{t.kt4}</li>
          <li style={listItem}>{t.kt5}</li>
          <li style={listItem}>{t.kt6}</li>
        </ul>
      </div>

      {/* Section 1: What Is WebAssembly */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={paragraph}>{t.whatIsDesc}</p>
      <p style={paragraph}>{t.whatIsFormats}</p>

      <h3 style={subTitle}>Binary Format (.wasm)</h3>
      <pre style={codeBlock}><code>{'# A compiled Wasm binary header (magic number + version)\n'
        + '00 61 73 6d  # \\0asm  (magic number)\n'
        + '01 00 00 00  # version 1\n'
        + '\n'
        + '# Wasm uses section-based encoding:\n'
        + '# Section 1  - Type section (function signatures)\n'
        + '# Section 3  - Function section (function declarations)\n'
        + '# Section 7  - Export section (exported names)\n'
        + '# Section 10 - Code section (function bodies)'}</code></pre>

      <h3 style={subTitle}>Text Format (WAT)</h3>
      <pre style={codeBlock}><code>{'(module\n'
        + '  ;; Define a function that adds two i32 values\n'
        + '  (func $add (param $a i32) (param $b i32) (result i32)\n'
        + '    local.get $a\n'
        + '    local.get $b\n'
        + '    i32.add\n'
        + '  )\n'
        + '\n'
        + '  ;; Export the function so JavaScript can call it\n'
        + '  (export "add" (func $add))\n'
        + '\n'
        + '  ;; Define and export a linear memory (1 page = 64KB)\n'
        + '  (memory (export "memory") 1)\n'
        + '\n'
        + '  ;; Global mutable variable\n'
        + '  (global $counter (mut i32) (i32.const 0))\n'
        + ')'}</code></pre>

      {/* Section 2: Memory Model */}
      <h2 style={sectionTitle}>{t.h2Memory}</h2>
      <p style={paragraph}>{t.memoryDesc}</p>
      <p style={paragraph}>{t.memoryShared}</p>

      <pre style={codeBlock}><code>{'(module\n'
        + '  ;; Declare linear memory: initial 1 page, max 10 pages\n'
        + '  ;; Each page = 64KB (65,536 bytes)\n'
        + '  (memory (export "memory") 1 10)\n'
        + '\n'
        + '  ;; Store a 32-bit integer at byte offset 0\n'
        + '  (func $store_value (param $offset i32) (param $value i32)\n'
        + '    local.get $offset\n'
        + '    local.get $value\n'
        + '    i32.store\n'
        + '  )\n'
        + '\n'
        + '  ;; Load a 32-bit integer from byte offset\n'
        + '  (func $load_value (param $offset i32) (result i32)\n'
        + '    local.get $offset\n'
        + '    i32.load\n'
        + '  )\n'
        + '\n'
        + '  ;; Grow memory by 1 page, returns previous page count or -1\n'
        + '  (func $grow (result i32)\n'
        + '    i32.const 1\n'
        + '    memory.grow\n'
        + '  )\n'
        + ')'}</code></pre>

      <h3 style={subTitle}>Accessing Memory from JavaScript</h3>
      <pre style={codeBlock}><code>{'// Access Wasm linear memory from JavaScript\n'
        + 'const memory = instance.exports.memory;\n'
        + '\n'
        + '// Create typed views into the memory buffer\n'
        + 'const bytes = new Uint8Array(memory.buffer);\n'
        + 'const ints = new Int32Array(memory.buffer);\n'
        + 'const floats = new Float64Array(memory.buffer);\n'
        + '\n'
        + '// Read/write values directly\n'
        + 'ints[0] = 42;          // Write i32 at byte offset 0\n'
        + 'floats[1] = 3.14159;   // Write f64 at byte offset 8\n'
        + '\n'
        + '// Copy a string into Wasm memory\n'
        + 'const encoder = new TextEncoder();\n'
        + 'const encoded = encoder.encode("Hello, Wasm!");\n'
        + 'bytes.set(encoded, 256); // Write at offset 256\n'
        + '\n'
        + '// IMPORTANT: views are invalidated when memory grows\n'
        + 'instance.exports.grow_memory();\n'
        + '// Must re-create views after growth\n'
        + 'const newBytes = new Uint8Array(memory.buffer);'}</code></pre>

      {/* Section 3: Compiling from Rust */}
      <h2 style={sectionTitle}>{t.h2Rust}</h2>
      <p style={paragraph}>{t.rustDesc}</p>
      <p style={paragraph}>{t.rustSetup}</p>

      <pre style={codeBlock}><code>{'# Install the Wasm target for Rust\n'
        + 'rustup target add wasm32-unknown-unknown\n'
        + '\n'
        + '# Install wasm-pack\n'
        + 'cargo install wasm-pack\n'
        + '\n'
        + '# Create a new library project\n'
        + 'cargo new --lib my-wasm-lib\n'
        + 'cd my-wasm-lib'}</code></pre>

      <h3 style={subTitle}>Cargo.toml Configuration</h3>
      <pre style={codeBlock}><code>{'[package]\n'
        + 'name = "my-wasm-lib"\n'
        + 'version = "0.1.0"\n'
        + 'edition = "2021"\n'
        + '\n'
        + '[lib]\n'
        + 'crate-type = ["cdylib", "rlib"]\n'
        + '\n'
        + '[dependencies]\n'
        + 'wasm-bindgen = "0.2"\n'
        + '\n'
        + '[dependencies.web-sys]\n'
        + 'version = "0.3"\n'
        + 'features = ["console", "Document", "Element", "Window"]\n'
        + '\n'
        + '[profile.release]\n'
        + 'opt-level = "s"     # Optimize for size\n'
        + 'lto = true          # Link-time optimization'}</code></pre>

      <h3 style={subTitle}>Rust Source with wasm-bindgen</h3>
      <pre style={codeBlock}><code>{'use wasm_bindgen::prelude::*;\n'
        + '\n'
        + '// Import JavaScript functions\n'
        + '#[wasm_bindgen]\n'
        + 'extern "C" {\n'
        + '    #[wasm_bindgen(js_namespace = console)]\n'
        + '    fn log(s: &str);\n'
        + '\n'
        + '    #[wasm_bindgen(js_namespace = Math)]\n'
        + '    fn random() -> f64;\n'
        + '}\n'
        + '\n'
        + '// Export a greeting function to JavaScript\n'
        + '#[wasm_bindgen]\n'
        + 'pub fn greet(name: &str) -> String {\n'
        + '    log(&format!("Hello from Wasm, {}!", name));\n'
        + '    format!("Hello, {}! Random: {:.4}", name, random())\n'
        + '}\n'
        + '\n'
        + '// Export a compute-intensive function\n'
        + '#[wasm_bindgen]\n'
        + 'pub fn fibonacci(n: u32) -> u64 {\n'
        + '    match n {\n'
        + '        0 => 0,\n'
        + '        1 => 1,\n'
        + '        _ => {\n'
        + '            let (mut a, mut b) = (0u64, 1u64);\n'
        + '            for _ in 2..=n {\n'
        + '                let temp = a + b;\n'
        + '                a = b;\n'
        + '                b = temp;\n'
        + '            }\n'
        + '            b\n'
        + '        }\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + '// Working with byte arrays\n'
        + '#[wasm_bindgen]\n'
        + 'pub fn sha256_hash(data: &[u8]) -> Vec<u8> {\n'
        + '    // Process byte data from JavaScript\n'
        + '    let mut hash = vec![0u8; 32];\n'
        + '    // ... hashing logic ...\n'
        + '    hash\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>Build and Use</h3>
      <pre style={codeBlock}><code>{'# Build with wasm-pack (generates pkg/ directory)\n'
        + 'wasm-pack build --target web --release\n'
        + '\n'
        + '# The pkg/ directory contains:\n'
        + '# - my_wasm_lib_bg.wasm  (compiled binary)\n'
        + '# - my_wasm_lib.js       (JS glue code)\n'
        + '# - my_wasm_lib.d.ts     (TypeScript types)\n'
        + '# - package.json         (npm package)'}</code></pre>

      <pre style={codeBlock}><code>{'// Using the Rust Wasm module in JavaScript\n'
        + 'import init, { greet, fibonacci } from "./pkg/my_wasm_lib.js";\n'
        + '\n'
        + 'async function main() {\n'
        + '  // Initialize the Wasm module\n'
        + '  await init();\n'
        + '\n'
        + '  // Call exported Rust functions\n'
        + '  const message = greet("Developer");\n'
        + '  console.log(message);\n'
        + '\n'
        + '  const fib50 = fibonacci(50);\n'
        + '  console.log("fib(50) =", fib50);\n'
        + '}\n'
        + '\n'
        + 'main();'}</code></pre>

      {/* Section 4: Compiling from C/C++ */}
      <h2 style={sectionTitle}>{t.h2Cpp}</h2>
      <p style={paragraph}>{t.cppDesc}</p>
      <p style={paragraph}>{t.cppFlags}</p>

      <pre style={codeBlock}><code>{'// image_filter.c - Example C code for Wasm compilation\n'
        + '#include <emscripten/emscripten.h>\n'
        + '#include <stdint.h>\n'
        + '#include <stdlib.h>\n'
        + '\n'
        + '// Export function with EMSCRIPTEN_KEEPALIVE\n'
        + 'EMSCRIPTEN_KEEPALIVE\n'
        + 'void grayscale(uint8_t* pixels, int length) {\n'
        + '    for (int i = 0; i < length; i += 4) {\n'
        + '        uint8_t r = pixels[i];\n'
        + '        uint8_t g = pixels[i + 1];\n'
        + '        uint8_t b = pixels[i + 2];\n'
        + '        uint8_t gray = (uint8_t)(0.299f * r\n'
        + '                     + 0.587f * g + 0.114f * b);\n'
        + '        pixels[i] = pixels[i+1] = pixels[i+2] = gray;\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + 'EMSCRIPTEN_KEEPALIVE\n'
        + 'uint8_t* create_buffer(int size) {\n'
        + '    return (uint8_t*)malloc(size);\n'
        + '}\n'
        + '\n'
        + 'EMSCRIPTEN_KEEPALIVE\n'
        + 'void destroy_buffer(uint8_t* ptr) {\n'
        + '    free(ptr);\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'# Compile with Emscripten\n'
        + 'emcc image_filter.c -o image_filter.js \\\n'
        + '  -s WASM=1 \\\n'
        + '  -s EXPORTED_FUNCTIONS="[\\\n'
        + "    '_grayscale', '_create_buffer', '_destroy_buffer'\\\n"
        + '  ]" \\\n'
        + '  -s EXPORTED_RUNTIME_METHODS="[\'ccall\',\'cwrap\']" \\\n'
        + '  -s ALLOW_MEMORY_GROWTH=1 \\\n'
        + '  -O3\n'
        + '\n'
        + '# For standalone Wasm (no JS glue):\n'
        + 'emcc image_filter.c -o image_filter.wasm \\\n'
        + '  -s STANDALONE_WASM=1 \\\n'
        + '  -s EXPORTED_FUNCTIONS="[\'_grayscale\']" \\\n'
        + '  --no-entry -O3'}</code></pre>

      {/* Section 5: JavaScript Interop */}
      <h2 style={sectionTitle}>{t.h2Interop}</h2>
      <p style={paragraph}>{t.interopDesc}</p>
      <p style={paragraph}>{t.interopTyped}</p>

      <pre style={codeBlock}><code>{'// Loading and instantiating a Wasm module\n'
        + 'async function loadWasm() {\n'
        + '  // Method 1: Streaming compilation (preferred)\n'
        + '  const response = await fetch("module.wasm");\n'
        + '  const { instance } = await WebAssembly\n'
        + '    .instantiateStreaming(response, {\n'
        + '      env: {\n'
        + '        // Import: JS function callable from Wasm\n'
        + '        log_value: (value) => console.log("Wasm:", value),\n'
        + '        get_time: () => Date.now(),\n'
        + '      },\n'
        + '      js: {\n'
        + '        mem: new WebAssembly.Memory({\n'
        + '          initial: 1, maximum: 10\n'
        + '        }),\n'
        + '      },\n'
        + '    });\n'
        + '\n'
        + '  // Call exported Wasm functions\n'
        + '  const result = instance.exports.add(10, 20);\n'
        + '  console.log("10 + 20 =", result); // 30\n'
        + '\n'
        + '  return instance;\n'
        + '}\n'
        + '\n'
        + '// Method 2: Module caching with IndexedDB\n'
        + 'async function loadCachedWasm() {\n'
        + '  const db = await openDB("wasm-cache", 1);\n'
        + '  let module = await db.get("modules", "myModule");\n'
        + '\n'
        + '  if (!module) {\n'
        + '    const response = await fetch("module.wasm");\n'
        + '    module = await WebAssembly\n'
        + '      .compileStreaming(response);\n'
        + '    await db.put("modules", module, "myModule");\n'
        + '  }\n'
        + '\n'
        + '  return WebAssembly.instantiate(module, imports);\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>TypedArray Data Exchange</h3>
      <pre style={codeBlock}><code>{'// Passing arrays between JavaScript and Wasm\n'
        + 'function processImageData(instance, imageData) {\n'
        + '  const { memory, process_pixels, alloc, dealloc } =\n'
        + '    instance.exports;\n'
        + '  const pixels = imageData.data; // Uint8ClampedArray\n'
        + '\n'
        + '  // Allocate memory in Wasm for the pixel data\n'
        + '  const ptr = alloc(pixels.length);\n'
        + '\n'
        + '  // Copy pixels into Wasm memory\n'
        + '  const wasmMemory = new Uint8Array(memory.buffer);\n'
        + '  wasmMemory.set(pixels, ptr);\n'
        + '\n'
        + '  // Process in Wasm (much faster than JS)\n'
        + '  process_pixels(ptr, pixels.length);\n'
        + '\n'
        + '  // Copy results back to JavaScript\n'
        + '  // Re-create view in case memory grew\n'
        + '  const result = new Uint8Array(memory.buffer);\n'
        + '  imageData.data.set(\n'
        + '    result.slice(ptr, ptr + pixels.length)\n'
        + '  );\n'
        + '\n'
        + '  // Free Wasm memory\n'
        + '  dealloc(ptr, pixels.length);\n'
        + '\n'
        + '  return imageData;\n'
        + '}'}</code></pre>

      {/* Section 6: WASI */}
      <h2 style={sectionTitle}>{t.h2Wasi}</h2>
      <p style={paragraph}>{t.wasiDesc}</p>
      <p style={paragraph}>{t.wasiRuntimes}</p>

      <pre style={codeBlock}><code>{'// Rust WASI example: file I/O\n'
        + 'use std::fs;\n'
        + 'use std::io::Write;\n'
        + '\n'
        + 'fn main() {\n'
        + '    // Read from stdin\n'
        + '    let mut input = String::new();\n'
        + '    std::io::stdin().read_line(&mut input)\n'
        + '        .expect("Failed to read");\n'
        + '\n'
        + '    // Write to a file (pre-opened directory)\n'
        + '    let mut file = fs::File::create("/output/result.txt")\n'
        + '        .expect("Cannot create file");\n'
        + '    write!(file, "Processed: {}", input.trim())\n'
        + '        .expect("Write failed");\n'
        + '\n'
        + '    // Read environment variable\n'
        + '    if let Ok(val) = std::env::var("CONFIG_PATH") {\n'
        + '        println!("Config: {}", val);\n'
        + '    }\n'
        + '\n'
        + '    println!("WASI module completed successfully");\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'# Compile Rust to WASI target\n'
        + 'rustup target add wasm32-wasi\n'
        + 'cargo build --target wasm32-wasi --release\n'
        + '\n'
        + '# Run with Wasmtime (capability-based access)\n'
        + 'wasmtime run \\\n'
        + '  --dir /output::/tmp/output \\\n'
        + '  --env CONFIG_PATH=/etc/app.conf \\\n'
        + '  target/wasm32-wasi/release/my_app.wasm\n'
        + '\n'
        + '# Run with Wasmer\n'
        + 'wasmer run my_app.wasm --dir /output::/tmp/output\n'
        + '\n'
        + '# Run with WasmEdge\n'
        + 'wasmedge --dir /output:/tmp/output my_app.wasm'}</code></pre>

      {/* Section 7: Performance Benchmarks */}
      <h2 style={sectionTitle}>{t.h2Performance}</h2>
      <p style={paragraph}>{t.perfDesc}</p>
      <p style={paragraph}>{t.perfTable}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>{t.thTask}</th>
            <th style={thStyle}>{t.thWasm}</th>
            <th style={thStyle}>{t.thJs}</th>
            <th style={thStyle}>{t.thSpeedup}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Fibonacci (n=45)</td><td style={tdStyle}>0.8ms</td><td style={tdStyle}>2.4ms</td><td style={tdStyle}>3.0x</td></tr>
          <tr><td style={tdStyle}>Matrix multiply 1024x1024</td><td style={tdStyle}>120ms</td><td style={tdStyle}>380ms</td><td style={tdStyle}>3.2x</td></tr>
          <tr><td style={tdStyle}>SHA-256 (1MB)</td><td style={tdStyle}>2.1ms</td><td style={tdStyle}>5.8ms</td><td style={tdStyle}>2.8x</td></tr>
          <tr><td style={tdStyle}>Image grayscale (4K)</td><td style={tdStyle}>3.2ms</td><td style={tdStyle}>12.1ms</td><td style={tdStyle}>3.8x</td></tr>
          <tr><td style={tdStyle}>JSON parse (1MB)</td><td style={tdStyle}>8.5ms</td><td style={tdStyle}>6.2ms</td><td style={tdStyle}>0.7x</td></tr>
          <tr><td style={tdStyle}>Sorting 1M integers</td><td style={tdStyle}>45ms</td><td style={tdStyle}>95ms</td><td style={tdStyle}>2.1x</td></tr>
          <tr><td style={tdStyle}>Regex matching</td><td style={tdStyle}>1.5ms</td><td style={tdStyle}>1.2ms</td><td style={tdStyle}>0.8x</td></tr>
          <tr><td style={tdStyle}>Zlib compress (1MB)</td><td style={tdStyle}>18ms</td><td style={tdStyle}>52ms</td><td style={tdStyle}>2.9x</td></tr>
        </tbody>
      </table>

      <pre style={codeBlock}><code>{'// Performance benchmarking example\n'
        + 'async function benchmark() {\n'
        + '  const { instance } = await WebAssembly\n'
        + '    .instantiateStreaming(fetch("bench.wasm"));\n'
        + '\n'
        + '  // Warm up\n'
        + '  for (let i = 0; i < 100; i++) {\n'
        + '    instance.exports.fibonacci(40);\n'
        + '  }\n'
        + '\n'
        + '  // Wasm benchmark\n'
        + '  const wasmStart = performance.now();\n'
        + '  for (let i = 0; i < 1000; i++) {\n'
        + '    instance.exports.fibonacci(40);\n'
        + '  }\n'
        + '  const wasmTime = performance.now() - wasmStart;\n'
        + '\n'
        + '  // JavaScript benchmark\n'
        + '  function jsFib(n) {\n'
        + '    if (n <= 1) return n;\n'
        + '    let a = 0, b = 1;\n'
        + '    for (let i = 2; i <= n; i++) {\n'
        + '      [a, b] = [b, a + b];\n'
        + '    }\n'
        + '    return b;\n'
        + '  }\n'
        + '\n'
        + '  const jsStart = performance.now();\n'
        + '  for (let i = 0; i < 1000; i++) jsFib(40);\n'
        + '  const jsTime = performance.now() - jsStart;\n'
        + '\n'
        + '  console.log("Wasm:", wasmTime.toFixed(2), "ms");\n'
        + '  console.log("JS:", jsTime.toFixed(2), "ms");\n'
        + '  console.log("Speedup:", (jsTime/wasmTime).toFixed(1)+"x");\n'
        + '}'}</code></pre>

      {/* Section 8: Use Cases */}
      <h2 style={sectionTitle}>{t.h2UseCases}</h2>
      <p style={paragraph}>{t.useCasesDesc}</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Examples</th>
            <th style={thStyle}>Why Wasm</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdStyle}>Image Processing</td><td style={tdStyle}>Photon, Squoosh, libvips</td><td style={tdStyle}>Pixel-level ops 3-5x faster</td></tr>
          <tr><td style={tdStyle}>Cryptography</td><td style={tdStyle}>libsodium, OpenSSL</td><td style={tdStyle}>Constant-time, no GC pauses</td></tr>
          <tr><td style={tdStyle}>Game Engines</td><td style={tdStyle}>Unity, Unreal, Godot</td><td style={tdStyle}>Port C++ engines to browser</td></tr>
          <tr><td style={tdStyle}>Audio/Video</td><td style={tdStyle}>FFmpeg.wasm, Opus, AV1</td><td style={tdStyle}>Real-time codec processing</td></tr>
          <tr><td style={tdStyle}>Scientific Computing</td><td style={tdStyle}>Pyodide, SciPy, NumPy</td><td style={tdStyle}>Run Python/C libs in browser</td></tr>
          <tr><td style={tdStyle}>CAD / 3D</td><td style={tdStyle}>AutoCAD Web, OpenSCAD</td><td style={tdStyle}>Heavy geometry calculations</td></tr>
          <tr><td style={tdStyle}>PDF / Document</td><td style={tdStyle}>pdf.js, Poppler</td><td style={tdStyle}>Complex parsing and rendering</td></tr>
          <tr><td style={tdStyle}>Plugin Systems</td><td style={tdStyle}>Figma, Shopify, Envoy</td><td style={tdStyle}>Sandboxed, language-agnostic</td></tr>
        </tbody>
      </table>

      {/* Section 9: Threading */}
      <h2 style={sectionTitle}>{t.h2Threading}</h2>
      <p style={paragraph}>{t.threadingDesc}</p>
      <p style={paragraph}>{t.threadingNote}</p>

      <pre style={codeBlock}><code>{'// Setting up Wasm threading with Web Workers\n'
        + '// Required HTTP headers for cross-origin isolation:\n'
        + '// Cross-Origin-Opener-Policy: same-origin\n'
        + '// Cross-Origin-Embedder-Policy: require-corp\n'
        + '\n'
        + '// Main thread: create shared memory and workers\n'
        + 'const sharedMemory = new WebAssembly.Memory({\n'
        + '  initial: 10,\n'
        + '  maximum: 100,\n'
        + '  shared: true,  // Requires SharedArrayBuffer\n'
        + '});\n'
        + '\n'
        + 'const module = await WebAssembly.compileStreaming(\n'
        + '  fetch("parallel.wasm")\n'
        + ');\n'
        + '\n'
        + '// Create worker threads\n'
        + 'const NUM_THREADS = navigator.hardwareConcurrency || 4;\n'
        + 'const workers = [];\n'
        + '\n'
        + 'for (let i = 0; i < NUM_THREADS; i++) {\n'
        + '  const worker = new Worker("wasm-worker.js");\n'
        + '  worker.postMessage({\n'
        + '    module,\n'
        + '    memory: sharedMemory,\n'
        + '    threadId: i,\n'
        + '    totalThreads: NUM_THREADS,\n'
        + '  });\n'
        + '  workers.push(worker);\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'// wasm-worker.js - Worker thread\n'
        + 'self.onmessage = async (e) => {\n'
        + '  const { module, memory, threadId, totalThreads } = e.data;\n'
        + '\n'
        + '  const instance = await WebAssembly.instantiate(module, {\n'
        + '    env: { memory },\n'
        + '  });\n'
        + '\n'
        + '  // Each worker processes its portion of data\n'
        + '  instance.exports.process_chunk(\n'
        + '    threadId,\n'
        + '    totalThreads\n'
        + '  );\n'
        + '\n'
        + '  self.postMessage({ done: true, threadId });\n'
        + '};'}</code></pre>

      {/* Section 10: SIMD */}
      <h2 style={sectionTitle}>{t.h2Simd}</h2>
      <p style={paragraph}>{t.simdDesc}</p>
      <p style={paragraph}>{t.simdSupport}</p>

      <pre style={codeBlock}><code>{'// Rust SIMD for WebAssembly\n'
        + 'use std::arch::wasm32::*;\n'
        + '\n'
        + '// SIMD-accelerated vector addition (f32x4)\n'
        + '#[target_feature(enable = "simd128")]\n'
        + 'pub unsafe fn add_vectors_simd(\n'
        + '    a: &[f32], b: &[f32], result: &mut [f32]\n'
        + ') {\n'
        + '    let len = a.len();\n'
        + '    let simd_len = len / 4 * 4; // Process 4 at a time\n'
        + '\n'
        + '    for i in (0..simd_len).step_by(4) {\n'
        + '        let va = v128_load(a[i..].as_ptr() as *const v128);\n'
        + '        let vb = v128_load(b[i..].as_ptr() as *const v128);\n'
        + '        let vr = f32x4_add(va, vb);\n'
        + '        v128_store(result[i..].as_mut_ptr() as *mut v128, vr);\n'
        + '    }\n'
        + '\n'
        + '    // Handle remaining elements\n'
        + '    for i in simd_len..len {\n'
        + '        result[i] = a[i] + b[i];\n'
        + '    }\n'
        + '}'}</code></pre>

      <pre style={codeBlock}><code>{'// C/C++ SIMD with Emscripten\n'
        + '#include <wasm_simd128.h>\n'
        + '\n'
        + '// SIMD dot product: 4 multiplies + horizontal add\n'
        + 'float dot_product_simd(\n'
        + '    const float* a, const float* b, int n\n'
        + ') {\n'
        + '    v128_t sum = wasm_f32x4_const(0, 0, 0, 0);\n'
        + '    int i;\n'
        + '\n'
        + '    for (i = 0; i + 3 < n; i += 4) {\n'
        + '        v128_t va = wasm_v128_load(&a[i]);\n'
        + '        v128_t vb = wasm_v128_load(&b[i]);\n'
        + '        sum = wasm_f32x4_add(\n'
        + '            sum, wasm_f32x4_mul(va, vb)\n'
        + '        );\n'
        + '    }\n'
        + '\n'
        + '    // Horizontal sum of the 4 lanes\n'
        + '    float result = wasm_f32x4_extract_lane(sum, 0)\n'
        + '                 + wasm_f32x4_extract_lane(sum, 1)\n'
        + '                 + wasm_f32x4_extract_lane(sum, 2)\n'
        + '                 + wasm_f32x4_extract_lane(sum, 3);\n'
        + '\n'
        + '    // Scalar remainder\n'
        + '    for (; i < n; i++) result += a[i] * b[i];\n'
        + '\n'
        + '    return result;\n'
        + '}\n'
        + '\n'
        + '// Compile: emcc -msimd128 -O3 simd.c -o simd.wasm'}</code></pre>

      {/* Section 11: Debugging */}
      <h2 style={sectionTitle}>{t.h2Debugging}</h2>
      <p style={paragraph}>{t.debugDesc}</p>
      <p style={paragraph}>{t.debugTools}</p>

      <pre style={codeBlock}><code>{'# wasm-tools: Swiss Army knife for Wasm\n'
        + '# Install\n'
        + 'cargo install wasm-tools\n'
        + '\n'
        + '# Validate a Wasm module\n'
        + 'wasm-tools validate module.wasm\n'
        + '\n'
        + '# Print module structure\n'
        + 'wasm-tools print module.wasm\n'
        + '\n'
        + '# Dump section info\n'
        + 'wasm-tools dump module.wasm\n'
        + '\n'
        + '# Convert WAT to Wasm binary\n'
        + 'wasm-tools parse module.wat -o module.wasm\n'
        + '\n'
        + '# Strip debug info for production\n'
        + 'wasm-tools strip module.wasm -o module.stripped.wasm\n'
        + '\n'
        + '# Optimize with Binaryen\n'
        + 'wasm-opt -O3 module.wasm -o module.opt.wasm\n'
        + 'wasm-opt -Oz module.wasm -o module.small.wasm  # Size'}</code></pre>

      <pre style={codeBlock}><code>{'// Debug logging: import console.log into Wasm\n'
        + 'const imports = {\n'
        + '  debug: {\n'
        + '    log_i32: (val) => console.log("[wasm i32]", val),\n'
        + '    log_f64: (val) => console.log("[wasm f64]", val),\n'
        + '    log_mem: (ptr, len) => {\n'
        + '      const bytes = new Uint8Array(\n'
        + '        memory.buffer, ptr, len\n'
        + '      );\n'
        + '      console.log("[wasm mem]",\n'
        + '        new TextDecoder().decode(bytes));\n'
        + '    },\n'
        + '    trace: (id) => {\n'
        + '      console.trace("[wasm trace] checkpoint", id);\n'
        + '    },\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Chrome DevTools Wasm debugging:\n'
        + '// 1. Open Sources panel\n'
        + '// 2. Find .wasm file in the file tree\n'
        + '// 3. Set breakpoints in WAT disassembly\n'
        + '// 4. Inspect locals, globals, memory in Scope panel\n'
        + '// 5. Enable DWARF for source-level C/Rust debugging:\n'
        + '//    Install "C/C++ DevTools Support" extension'}</code></pre>

      {/* Section 12: Future Proposals */}
      <h2 style={sectionTitle}>{t.h2Future}</h2>
      <p style={paragraph}>{t.futureDesc}</p>

      <h3 style={subTitle}>GC (Garbage Collection) Proposal</h3>
      <p style={paragraph}>{t.futureGC}</p>
      <pre style={codeBlock}><code>{';; GC proposal: struct and array types in WAT\n'
        + '(type $point (struct\n'
        + '  (field $x f64)\n'
        + '  (field $y f64)\n'
        + '))\n'
        + '\n'
        + '(type $points (array (ref $point)))\n'
        + '\n'
        + ';; Create a GC-managed struct\n'
        + '(func $make_point (param $x f64) (param $y f64)\n'
        + '                  (result (ref $point))\n'
        + '  (struct.new $point\n'
        + '    (local.get $x)\n'
        + '    (local.get $y)\n'
        + '  )\n'
        + ')\n'
        + '\n'
        + ';; Access struct fields\n'
        + '(func $distance (param $p (ref $point)) (result f64)\n'
        + '  (f64.sqrt\n'
        + '    (f64.add\n'
        + '      (f64.mul\n'
        + '        (struct.get $point $x (local.get $p))\n'
        + '        (struct.get $point $x (local.get $p)))\n'
        + '      (f64.mul\n'
        + '        (struct.get $point $y (local.get $p))\n'
        + '        (struct.get $point $y (local.get $p)))))\n'
        + ')'}</code></pre>

      <h3 style={subTitle}>Component Model</h3>
      <p style={paragraph}>{t.futureComponent}</p>
      <pre style={codeBlock}><code>{'// WIT (Wasm Interface Type) definition\n'
        + '// image-processor.wit\n'
        + 'package example:image-processor@1.0.0;\n'
        + '\n'
        + 'interface types {\n'
        + '  record image {\n'
        + '    width: u32,\n'
        + '    height: u32,\n'
        + '    pixels: list<u8>,\n'
        + '  }\n'
        + '\n'
        + '  enum filter {\n'
        + '    grayscale,\n'
        + '    blur,\n'
        + '    sharpen,\n'
        + '    edge-detect,\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'world image-processor {\n'
        + '  use types.{image, filter};\n'
        + '\n'
        + '  export apply-filter: func(\n'
        + '    img: image, f: filter\n'
        + '  ) -> image;\n'
        + '  export resize: func(\n'
        + '    img: image, w: u32, h: u32\n'
        + '  ) -> image;\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>Stack Switching</h3>
      <p style={paragraph}>{t.futureStack}</p>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <ol style={listStyle}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
      </ol>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A], [t.faq2Q, t.faq2A], [t.faq3Q, t.faq3A], [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A], [t.faq6Q, t.faq6A], [t.faq7Q, t.faq7A], [t.faq8Q, t.faq8A],
      ].map(([question, answer], index) => (
        <div key={index} style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{question}</h3>
          <p style={paragraph}>{answer}</p>
        </div>
      ))}
    </article>
  );
}
