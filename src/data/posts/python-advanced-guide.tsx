'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Advanced Python Guide: Type Hints, Async, Metaclasses, Pattern Matching & Performance Optimization',
    subtitle: 'A comprehensive deep-dive into Python\'s most powerful features, from advanced type annotations to concurrency patterns and design patterns.',
    tldr: 'Python 3.10+ offers a mature ecosystem of advanced features that enable production-grade software engineering. This guide covers type hints with generics and Protocol, dataclasses and Pydantic v2 validation, decorator patterns including class decorators and parameterized decorators, context managers and generator protocols, async/await with task groups and semaphores, metaclasses and descriptors, structural pattern matching with guard clauses, memory management with __slots__ and weakref, concurrency comparisons (threading vs multiprocessing vs asyncio), pytest testing patterns, modern Python packaging with pyproject.toml and uv, performance optimization with profiling and Cython, and classic design patterns implemented idiomatically in Python.',
    takeaway1: 'Type hints with TypeVar, ParamSpec, and Protocol enable fully typed generic APIs with zero runtime cost.',
    takeaway2: 'Pydantic v2 provides 5-50x faster validation than v1 with Rust-powered core.',
    takeaway3: 'Parameterized decorators and class decorators unlock metaprogramming for cross-cutting concerns.',
    takeaway4: 'asyncio task groups (Python 3.11+) provide structured concurrency with automatic cleanup.',
    takeaway5: 'Pattern matching with guard clauses replaces complex if/elif chains with declarative logic.',
    takeaway6: '__slots__ reduces per-instance memory by 40-60% and speeds up attribute access.',
    takeaway7: 'uv is the modern Python package manager: 10-100x faster than pip with built-in venv management.',
    introTitle: 'Why Advanced Python Matters',
    introP1: 'Python\'s simplicity makes it the most popular language for beginners, but its advanced features make it equally powerful for building production systems, data pipelines, and high-performance APIs. Modern Python (3.10+) includes a type system rivaling TypeScript, structural pattern matching like Rust, and async capabilities that handle thousands of concurrent connections.',
    introP2: 'This guide walks through 13 advanced topics with production-ready code examples. Whether you are building a FastAPI service, a data engineering pipeline, or a CLI tool, mastering these features will make your code more maintainable, performant, and correct.',
    typeHintsTitle: '1. Type Hints & Generics',
    typeHintsP1: 'Python\'s type system has evolved dramatically since PEP 484. Modern type hints support generics with TypeVar, callable signatures with ParamSpec, structural subtyping with Protocol, and self-referencing types. These annotations are checked by tools like mypy, pyright, and ruff at development time with zero runtime overhead.',
    typeHintsP2: 'TypeVar creates generic type variables that preserve type relationships. ParamSpec (PEP 612) captures function parameter signatures for decorator typing. Protocol (PEP 544) enables structural subtyping where any class with matching methods satisfies the protocol without explicit inheritance.',
    typeHintsP3: 'Python 3.12 introduced the new type parameter syntax (PEP 695) that simplifies generic definitions with a cleaner [T] syntax instead of TypeVar declarations.',
    dataclassesTitle: '2. Dataclasses & Pydantic Models',
    dataclassesP1: 'Dataclasses (PEP 557) eliminate boilerplate for data-holding classes by auto-generating __init__, __repr__, __eq__, and more. They support default values, field factories, post-init processing, slots, and frozen (immutable) instances.',
    dataclassesP2: 'Pydantic v2 takes data modeling further with runtime validation, serialization, JSON Schema generation, and settings management. Built on a Rust core (pydantic-core), v2 is 5-50x faster than v1 and is the foundation of FastAPI.',
    dataclassesP3: 'Choose dataclasses for simple internal data structures and Pydantic for external boundaries where validation matters: API request/response bodies, configuration files, database records, and event schemas.',
    decoratorsTitle: '3. Decorators Deep Dive',
    decoratorsP1: 'Decorators are Python\'s most powerful metaprogramming tool. They modify functions or classes at definition time using the @decorator syntax. Beyond simple wrappers, Python supports parameterized decorators, class decorators, decorator stacking, and functools.wraps for preserving metadata.',
    decoratorsP2: 'A decorator is simply a callable that takes a function and returns a function. Parameterized decorators add an outer function that returns the actual decorator. Class decorators take a class and return a modified class, enabling patterns like singleton, registration, and auto-serialization.',
    decoratorsP3: 'Always use functools.wraps on wrapper functions to preserve the original function\'s __name__, __doc__, and __module__. Without it, debugging and documentation tools show the wrapper\'s metadata instead.',
    contextTitle: '4. Context Managers & Generators',
    contextP1: 'Context managers handle resource lifecycle with guaranteed cleanup via the with statement. They implement __enter__ and __exit__ (or __aenter__/__aexit__ for async). The contextlib module provides shortcuts like @contextmanager, suppress(), and ExitStack for composing multiple managers.',
    contextP2: 'Generators produce values lazily with yield, enabling memory-efficient iteration over large datasets. Generator expressions provide inline syntax. The yield from syntax (PEP 380) delegates to sub-generators, enabling clean recursive generation and coroutine composition.',
    contextP3: 'Async context managers combine async/await with resource management, essential for database connections, HTTP sessions, and file I/O in async code.',
    asyncTitle: '5. Async/Await Patterns',
    asyncP1: 'asyncio is Python\'s built-in framework for concurrent I/O-bound operations. A single thread handles thousands of connections using cooperative multitasking. The async/await syntax makes asynchronous code nearly as readable as synchronous code.',
    asyncP2: 'asyncio.gather runs multiple coroutines concurrently and collects results. Semaphores limit concurrent access to shared resources. Task groups (Python 3.11+, PEP 654) provide structured concurrency with automatic cancellation on failure.',
    asyncP3: 'For production async code, use asyncio.TaskGroup for structured concurrency, aiohttp or httpx for HTTP requests, asyncpg for PostgreSQL, and motor for MongoDB. Always handle cancellation properly and use asyncio.shield for critical operations.',
    metaclassesTitle: '6. Metaclasses & Descriptors',
    metaclassesP1: 'Metaclasses are the classes of classes. When you define a class, Python uses its metaclass (usually type) to create it. Custom metaclasses intercept class creation to add validation, register classes, modify attributes, or enforce coding patterns.',
    metaclassesP2: 'Descriptors implement __get__, __set__, and __delete__ to control attribute access on instances. They power Python\'s property, staticmethod, classmethod, and ORM fields. The __set_name__ hook (PEP 487) lets descriptors know their attribute name automatically.',
    metaclassesP3: 'In most cases, prefer __init_subclass__ (PEP 487) over custom metaclasses. It provides a simpler hook for customizing subclass creation without the complexity of metaclass inheritance.',
    patternTitle: '7. Pattern Matching',
    patternP1: 'Structural pattern matching (PEP 634, Python 3.10+) brings match/case statements that destructure and match data by shape. Unlike switch statements in other languages, Python\'s match works with sequences, mappings, classes, and nested structures.',
    patternP2: 'Guard clauses (if conditions) add runtime checks to pattern cases. Capture patterns bind matched values to names. Or patterns (|) match multiple alternatives. Wildcard (_) matches anything without binding.',
    patternP3: 'Pattern matching excels at parsing command structures, handling API responses with different shapes, processing AST nodes, and implementing state machines.',
    memoryTitle: '8. Memory Management',
    memoryP1: '__slots__ restricts instance attributes to a fixed set, replacing the per-instance __dict__ with a more compact representation. This reduces memory usage by 40-60% and speeds up attribute access. It is essential for classes with millions of instances.',
    memoryP2: 'weakref creates references that do not prevent garbage collection, crucial for caches, observer patterns, and avoiding circular reference leaks. The gc module provides control over the garbage collector including debugging reference cycles.',
    memoryP3: 'For memory profiling, use tracemalloc (built-in), memory_profiler, or objgraph. Track allocations, find memory leaks, and optimize data structures to reduce your application\'s memory footprint.',
    concurrencyTitle: '9. Concurrency: Threading vs Multiprocessing vs Asyncio',
    concurrencyP1: 'Python offers three concurrency models, each suited to different workloads. Threading uses OS threads sharing the same memory space but is limited by the GIL for CPU-bound work. Multiprocessing uses separate processes with full CPU parallelism but higher memory overhead. Asyncio uses a single-threaded event loop for I/O-bound concurrency.',
    concurrencyP2: 'For I/O-bound tasks (HTTP requests, database queries, file operations), use asyncio. For CPU-bound tasks (data processing, image manipulation, ML training), use multiprocessing. Threading works for I/O-bound tasks when async is not an option, or when integrating with C libraries that release the GIL.',
    concurrencyP3: 'Python 3.13 introduced a free-threaded build (PEP 703) that removes the GIL, enabling true thread parallelism. This is still experimental but represents the future of Python concurrency.',
    pytestTitle: '10. Testing with pytest',
    pytestP1: 'pytest is the de facto standard for Python testing. It provides a simpler syntax than unittest, powerful fixtures for setup/teardown, parametrize for data-driven tests, and a rich plugin ecosystem.',
    pytestP2: 'Fixtures manage test dependencies and state. They support scopes (function, class, module, session) and automatic cleanup with yield. The conftest.py file shares fixtures across test modules without imports.',
    pytestP3: 'Use unittest.mock or pytest-mock for isolating units under test. Parametrize generates multiple test cases from data. Markers (@pytest.mark) categorize tests for selective execution.',
    packagingTitle: '11. Python Packaging',
    packagingP1: 'Modern Python packaging centers on pyproject.toml (PEP 621), replacing setup.py and setup.cfg. It defines project metadata, dependencies, build system, and tool configuration in one file.',
    packagingP2: 'Build backends include setuptools (standard), Hatch (modern), Poetry (dependency management + publishing), and PDM (PEP 582). uv (from Astral, makers of ruff) is the fastest package installer and resolver, 10-100x faster than pip.',
    packagingP3: 'For new projects in 2026, use uv for dependency management: uv init to create a project, uv add for dependencies, uv run to execute scripts, and uv publish to upload to PyPI. It handles virtual environments automatically.',
    performanceTitle: '12. Performance Optimization',
    performanceP1: 'Start optimization with profiling: cProfile for function-level timing, line_profiler for line-by-line analysis, and py-spy for sampling-based profiling of production code. Never optimize without profiling first.',
    performanceP2: 'Memoization with functools.lru_cache and functools.cache eliminates redundant computation. NumPy vectorization replaces Python loops with C-level operations for 10-100x speedups on numerical data.',
    performanceP3: 'For maximum performance, Cython compiles Python to C with optional static typing. Alternatives include Numba (JIT for numerical code), mypyc (compiles type-annotated Python), and PyO3 (write Python extensions in Rust).',
    patternsTitle: '13. Design Patterns in Python',
    patternsP1: 'Classic design patterns look different in Python because of first-class functions, duck typing, and dynamic features. Many Gang of Four patterns that require complex class hierarchies in Java become simple functions or decorators in Python.',
    patternsP2: 'The Singleton pattern uses module-level instances or __new__. The Factory pattern leverages dictionaries of callables. The Observer pattern uses weakref sets. The Strategy pattern passes functions directly. Python\'s dynamic nature makes many patterns lighter than their Java counterparts.',
    patternsP3: 'Understanding when to apply these patterns and when Python\'s built-in features suffice is key to writing idiomatic, maintainable code.',
    conclusionTitle: 'Conclusion',
    conclusionP1: 'Advanced Python features transform the language from a scripting tool into a full-scale software engineering platform. Type hints catch bugs before runtime. Async/await handles massive concurrency. Pattern matching makes complex logic declarative. And modern tooling like uv and ruff makes the developer experience fast and reliable.',
    conclusionP2: 'Start with the features most relevant to your current project. Type hints and dataclasses provide immediate value for any codebase. Async/await and testing patterns are essential for web services. Metaclasses and descriptors become important as you build frameworks and libraries. Performance optimization and design patterns round out your toolkit for building production-grade Python applications.',
    faq1Q: 'What is the difference between TypeVar and Protocol in Python?',
    faq1A: 'TypeVar creates generic type variables that preserve specific types through function calls (like T in generics). Protocol defines structural subtyping interfaces where any class with matching methods satisfies the protocol without inheriting from it. Use TypeVar for generic containers and functions; use Protocol for defining expected behavior interfaces.',
    faq2Q: 'When should I use dataclasses vs Pydantic?',
    faq2A: 'Use dataclasses for simple internal data structures where validation is not needed. Use Pydantic for external data boundaries like API inputs, configuration files, and database records where runtime validation, serialization, and JSON Schema generation are required. Pydantic v2 is also significantly faster due to its Rust core.',
    faq3Q: 'How does asyncio compare to threading in Python?',
    faq3A: 'asyncio uses a single-threaded event loop for cooperative concurrency, ideal for I/O-bound tasks with thousands of connections. Threading uses OS threads but is limited by the GIL for CPU-bound work. asyncio generally has lower overhead and is easier to reason about, but requires async-compatible libraries.',
    faq4Q: 'What is structural pattern matching in Python?',
    faq4A: 'Structural pattern matching (match/case, Python 3.10+) destructures and matches data by shape. Unlike simple switch statements, it handles sequences, mappings, class instances, and nested structures. Guard clauses add conditional logic within cases. It excels at parsing complex data structures.',
    faq5Q: 'How do __slots__ improve Python performance?',
    faq5A: '__slots__ replaces the per-instance __dict__ dictionary with a fixed-size array of attribute slots. This reduces memory usage by 40-60% per instance and speeds up attribute access. It is critical for classes with millions of instances like data processing records or game entities.',
    faq6Q: 'What is the recommended Python packaging tool in 2026?',
    faq6A: 'uv (from Astral) is the recommended tool for new projects. It is 10-100x faster than pip, handles virtual environments automatically, supports pyproject.toml natively, and provides commands for project creation, dependency management, and publishing. Poetry and PDM remain popular alternatives.',
    faq7Q: 'When should I use metaclasses vs __init_subclass__?',
    faq7A: '__init_subclass__ (PEP 487) is simpler and preferred for most subclass customization needs like validation and registration. Use metaclasses only when you need to intercept class creation itself, modify the class namespace before creation, or control the class hierarchy. Most real-world code never needs custom metaclasses.',
    faq8Q: 'How do I choose between Cython, Numba, and PyO3 for performance?',
    faq8A: 'Use Cython for gradual optimization of existing Python code with optional type annotations. Use Numba for JIT-compiling numerical functions with NumPy arrays (no code changes needed). Use PyO3 for writing high-performance Python extensions in Rust with full control. For most cases, start with profiling and algorithmic improvements before reaching for compiled solutions.',
  },
  zh: {
    title: '高级 Python 指南：类型提示、异步、元类、模式匹配与性能优化',
    subtitle: '深入探讨 Python 最强大的特性，从高级类型注解到并发模式和设计模式。',
    tldr: 'Python 3.10+ 提供了一个成熟的高级特性生态系统，支持生产级软件工程。本指南涵盖带泛型和 Protocol 的类型提示、dataclass 和 Pydantic v2 验证、装饰器模式（包括类装饰器和参数化装饰器）、上下文管理器和生成器协议、带 task group 和信号量的 async/await、元类和描述符、带守卫子句的结构化模式匹配、使用 __slots__ 和 weakref 的内存管理、并发比较（threading vs multiprocessing vs asyncio）、pytest 测试模式、使用 pyproject.toml 和 uv 的现代 Python 打包、使用 profiling 和 Cython 的性能优化，以及用 Python 惯用方式实现的经典设计模式。',
    takeaway1: '带 TypeVar、ParamSpec 和 Protocol 的类型提示实现完全类型化的泛型 API，零运行时开销。',
    takeaway2: 'Pydantic v2 比 v1 快 5-50 倍，基于 Rust 驱动的核心。',
    takeaway3: '参数化装饰器和类装饰器解锁横切关注点的元编程。',
    takeaway4: 'asyncio task group（Python 3.11+）提供自动清理的结构化并发。',
    takeaway5: '带守卫子句的模式匹配用声明式逻辑替代复杂的 if/elif 链。',
    takeaway6: '__slots__ 减少每实例内存 40-60%，加速属性访问。',
    takeaway7: 'uv 是现代 Python 包管理器：比 pip 快 10-100 倍，内置 venv 管理。',
    introTitle: '为什么高级 Python 很重要',
    introP1: 'Python 的简洁性使其成为初学者最流行的语言，但其高级特性使其同样适合构建生产系统、数据管道和高性能 API。现代 Python（3.10+）包含媲美 TypeScript 的类型系统、类似 Rust 的结构化模式匹配，以及能处理数千并发连接的异步能力。',
    introP2: '本指南通过 13 个高级主题和生产就绪的代码示例进行讲解。无论你是在构建 FastAPI 服务、数据工程管道还是 CLI 工具，掌握这些特性将使你的代码更易维护、更高性能、更正确。',
    typeHintsTitle: '1. 类型提示与泛型',
    typeHintsP1: 'Python 的类型系统自 PEP 484 以来发展显著。现代类型提示支持带 TypeVar 的泛型、带 ParamSpec 的可调用签名、带 Protocol 的结构化子类型和自引用类型。这些注解由 mypy、pyright 和 ruff 等工具在开发时检查，零运行时开销。',
    typeHintsP2: 'TypeVar 创建保持类型关系的泛型类型变量。ParamSpec（PEP 612）捕获函数参数签名用于装饰器类型标注。Protocol（PEP 544）实现结构化子类型，任何具有匹配方法的类都满足协议，无需显式继承。',
    typeHintsP3: 'Python 3.12 引入了新的类型参数语法（PEP 695），用更简洁的 [T] 语法简化泛型定义，替代 TypeVar 声明。',
    dataclassesTitle: '2. Dataclass 与 Pydantic 模型',
    dataclassesP1: 'Dataclass（PEP 557）通过自动生成 __init__、__repr__、__eq__ 等方法消除数据类的样板代码。它们支持默认值、字段工厂、初始化后处理、slots 和冻结（不可变）实例。',
    dataclassesP2: 'Pydantic v2 通过运行时验证、序列化、JSON Schema 生成和设置管理进一步扩展数据建模。基于 Rust 核心（pydantic-core），v2 比 v1 快 5-50 倍，是 FastAPI 的基础。',
    dataclassesP3: '简单内部数据结构使用 dataclass，外部边界（API 请求/响应体、配置文件、数据库记录、事件 schema）需要验证时使用 Pydantic。',
    decoratorsTitle: '3. 装饰器深入探讨',
    decoratorsP1: '装饰器是 Python 最强大的元编程工具。它们使用 @decorator 语法在定义时修改函数或类。除了简单包装器外，Python 支持参数化装饰器、类装饰器、装饰器堆叠和 functools.wraps 保留元数据。',
    decoratorsP2: '装饰器本质上是一个接受函数并返回函数的可调用对象。参数化装饰器添加一个外层函数来返回实际的装饰器。类装饰器接受一个类并返回修改后的类，实现单例、注册和自动序列化等模式。',
    decoratorsP3: '始终在包装函数上使用 functools.wraps 以保留原始函数的 __name__、__doc__ 和 __module__。否则调试和文档工具会显示包装器的元数据。',
    contextTitle: '4. 上下文管理器与生成器',
    contextP1: '上下文管理器通过 with 语句处理资源生命周期，保证清理。它们实现 __enter__ 和 __exit__（异步版本为 __aenter__/__aexit__）。contextlib 模块提供 @contextmanager、suppress() 和 ExitStack 等快捷方式。',
    contextP2: '生成器通过 yield 惰性产生值，实现对大数据集的内存高效迭代。生成器表达式提供内联语法。yield from 语法（PEP 380）委托给子生成器，实现干净的递归生成和协程组合。',
    contextP3: '异步上下文管理器结合 async/await 和资源管理，对异步代码中的数据库连接、HTTP 会话和文件 I/O 至关重要。',
    asyncTitle: '5. Async/Await 模式',
    asyncP1: 'asyncio 是 Python 内置的 I/O 密集型并发操作框架。单线程使用协作式多任务处理数千个连接。async/await 语法使异步代码几乎和同步代码一样可读。',
    asyncP2: 'asyncio.gather 并发运行多个协程并收集结果。信号量限制对共享资源的并发访问。Task group（Python 3.11+，PEP 654）提供失败时自动取消的结构化并发。',
    asyncP3: '生产异步代码使用 asyncio.TaskGroup 实现结构化并发，httpx 用于 HTTP 请求，asyncpg 用于 PostgreSQL，motor 用于 MongoDB。始终正确处理取消并对关键操作使用 asyncio.shield。',
    metaclassesTitle: '6. 元类与描述符',
    metaclassesP1: '元类是类的类。定义类时，Python 使用其元类（通常是 type）来创建它。自定义元类拦截类创建以添加验证、注册类、修改属性或强制编码规范。',
    metaclassesP2: '描述符实现 __get__、__set__ 和 __delete__ 来控制实例上的属性访问。它们驱动 Python 的 property、staticmethod、classmethod 和 ORM 字段。__set_name__ 钩子（PEP 487）让描述符自动获知其属性名。',
    metaclassesP3: '大多数情况下，优先使用 __init_subclass__（PEP 487）而非自定义元类。它提供更简单的钩子来自定义子类创建，无需元类继承的复杂性。',
    patternTitle: '7. 模式匹配',
    patternP1: '结构化模式匹配（PEP 634，Python 3.10+）带来按数据形状解构和匹配的 match/case 语句。与其他语言的 switch 不同，Python 的 match 可处理序列、映射、类实例和嵌套结构。',
    patternP2: '守卫子句（if 条件）为模式 case 添加运行时检查。捕获模式将匹配值绑定到名称。或模式（|）匹配多个备选项。通配符（_）匹配任何内容但不绑定。',
    patternP3: '模式匹配擅长解析命令结构、处理不同形状的 API 响应、处理 AST 节点和实现状态机。',
    memoryTitle: '8. 内存管理',
    memoryP1: '__slots__ 将实例属性限制为固定集合，用更紧凑的表示替代每实例的 __dict__。这减少 40-60% 的内存使用并加速属性访问。对有数百万实例的类至关重要。',
    memoryP2: 'weakref 创建不阻止垃圾回收的引用，对缓存、观察者模式和避免循环引用泄漏至关重要。gc 模块提供对垃圾回收器的控制，包括调试引用循环。',
    memoryP3: '内存分析使用 tracemalloc（内置）、memory_profiler 或 objgraph。跟踪分配、发现内存泄漏并优化数据结构以减少应用程序的内存占用。',
    concurrencyTitle: '9. 并发：Threading vs Multiprocessing vs Asyncio',
    concurrencyP1: 'Python 提供三种并发模型，各适合不同的工作负载。Threading 使用共享内存的 OS 线程，但 CPU 密集型工作受 GIL 限制。Multiprocessing 使用独立进程实现完全 CPU 并行但内存开销更高。Asyncio 使用单线程事件循环实现 I/O 密集型并发。',
    concurrencyP2: 'I/O 密集型任务（HTTP 请求、数据库查询、文件操作）使用 asyncio。CPU 密集型任务（数据处理、图像处理、ML 训练）使用 multiprocessing。当无法使用 async 或与释放 GIL 的 C 库集成时使用 threading。',
    concurrencyP3: 'Python 3.13 引入了自由线程构建（PEP 703），移除 GIL，实现真正的线程并行。这仍是实验性的，但代表了 Python 并发的未来。',
    pytestTitle: '10. 使用 pytest 测试',
    pytestP1: 'pytest 是 Python 测试的事实标准。它提供比 unittest 更简单的语法、用于 setup/teardown 的强大 fixture、用于数据驱动测试的 parametrize 和丰富的插件生态。',
    pytestP2: 'Fixture 管理测试依赖和状态。它们支持作用域（function、class、module、session）和使用 yield 的自动清理。conftest.py 文件无需导入即可在测试模块间共享 fixture。',
    pytestP3: '使用 unittest.mock 或 pytest-mock 隔离被测单元。Parametrize 从数据生成多个测试用例。Marker（@pytest.mark）对测试分类以选择性执行。',
    packagingTitle: '11. Python 打包',
    packagingP1: '现代 Python 打包以 pyproject.toml（PEP 621）为中心，替代 setup.py 和 setup.cfg。它在一个文件中定义项目元数据、依赖、构建系统和工具配置。',
    packagingP2: '构建后端包括 setuptools（标准）、Hatch（现代）、Poetry（依赖管理+发布）和 PDM（PEP 582）。uv（来自 Astral，ruff 的制作者）是最快的包安装器和解析器，比 pip 快 10-100 倍。',
    packagingP3: '2026 年新项目使用 uv 管理依赖：uv init 创建项目，uv add 添加依赖，uv run 执行脚本，uv publish 上传到 PyPI。它自动处理虚拟环境。',
    performanceTitle: '12. 性能优化',
    performanceP1: '从分析开始优化：cProfile 用于函数级计时，line_profiler 用于逐行分析，py-spy 用于生产代码的采样式分析。永远不要在没有分析的情况下优化。',
    performanceP2: 'functools.lru_cache 和 functools.cache 的记忆化消除冗余计算。NumPy 向量化用 C 级操作替代 Python 循环，数值数据获得 10-100 倍加速。',
    performanceP3: '要获得最高性能，Cython 将 Python 编译为带可选静态类型的 C。替代方案包括 Numba（数值代码 JIT）、mypyc（编译类型注解的 Python）和 PyO3（用 Rust 编写 Python 扩展）。',
    patternsTitle: '13. Python 中的设计模式',
    patternsP1: '经典设计模式在 Python 中因一等函数、鸭子类型和动态特性而不同。许多在 Java 中需要复杂类层次结构的 GoF 模式在 Python 中变成简单的函数或装饰器。',
    patternsP2: '单例模式使用模块级实例或 __new__。工厂模式利用可调用对象的字典。观察者模式使用 weakref 集合。策略模式直接传递函数。Python 的动态特性使许多模式比 Java 对应物更轻量。',
    patternsP3: '理解何时应用这些模式、何时 Python 的内置特性就足够是编写惯用、可维护代码的关键。',
    conclusionTitle: '总结',
    conclusionP1: '高级 Python 特性将语言从脚本工具转变为全面的软件工程平台。类型提示在运行前捕获 bug。Async/await 处理大规模并发。模式匹配使复杂逻辑声明化。uv 和 ruff 等现代工具使开发体验快速可靠。',
    conclusionP2: '从与当前项目最相关的特性开始。类型提示和 dataclass 为任何代码库提供即时价值。Async/await 和测试模式对 Web 服务至关重要。元类和描述符在构建框架和库时变得重要。性能优化和设计模式完善你构建生产级 Python 应用的工具集。',
    faq1Q: 'Python 中 TypeVar 和 Protocol 的区别是什么？',
    faq1A: 'TypeVar 创建在函数调用中保持特定类型的泛型类型变量（如泛型中的 T）。Protocol 定义结构化子类型接口，任何具有匹配方法的类都满足协议无需继承。泛型容器和函数使用 TypeVar；定义期望行为接口使用 Protocol。',
    faq2Q: '何时使用 dataclass 和 Pydantic？',
    faq2A: '不需要验证的简单内部数据结构使用 dataclass。需要运行时验证、序列化和 JSON Schema 生成的外部数据边界（如 API 输入、配置文件、数据库记录）使用 Pydantic。Pydantic v2 由于 Rust 核心速度显著更快。',
    faq3Q: 'asyncio 和 threading 在 Python 中如何比较？',
    faq3A: 'asyncio 使用单线程事件循环实现协作式并发，适合有数千连接的 I/O 密集型任务。Threading 使用 OS 线程但 CPU 密集型工作受 GIL 限制。asyncio 通常开销更低且更易推理，但需要异步兼容的库。',
    faq4Q: 'Python 的结构化模式匹配是什么？',
    faq4A: '结构化模式匹配（match/case，Python 3.10+）按形状解构和匹配数据。与简单的 switch 语句不同，它处理序列、映射、类实例和嵌套结构。守卫子句在 case 内添加条件逻辑。它擅长解析复杂数据结构。',
    faq5Q: '__slots__ 如何提升 Python 性能？',
    faq5A: '__slots__ 用固定大小的属性槽数组替代每实例的 __dict__ 字典。这减少每实例 40-60% 的内存使用并加速属性访问。对有数百万实例的类（如数据处理记录或游戏实体）至关重要。',
    faq6Q: '2026 年推荐的 Python 打包工具是什么？',
    faq6A: 'uv（来自 Astral）是新项目推荐的工具。比 pip 快 10-100 倍，自动处理虚拟环境，原生支持 pyproject.toml，提供项目创建、依赖管理和发布命令。Poetry 和 PDM 仍是流行的替代选择。',
    faq7Q: '何时使用元类和 __init_subclass__？',
    faq7A: '__init_subclass__（PEP 487）更简单，适合大多数子类自定义需求如验证和注册。仅在需要拦截类创建本身、创建前修改类命名空间或控制类层次结构时使用元类。大多数真实世界代码永远不需要自定义元类。',
    faq8Q: '如何在 Cython、Numba 和 PyO3 之间选择以提升性能？',
    faq8A: 'Cython 用于带可选类型注解的现有 Python 代码的渐进优化。Numba 用于 JIT 编译带 NumPy 数组的数值函数（无需改代码）。PyO3 用于用 Rust 编写高性能 Python 扩展实现完全控制。大多数情况下，先分析和改进算法，再使用编译方案。',
  },
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '2rem',
};

const headingStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: '1rem',
  marginTop: '2.5rem',
  lineHeight: 1.3,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: '1.35rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: '0.75rem',
  marginTop: '2rem',
  lineHeight: 1.4,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.05rem',
  lineHeight: 1.8,
  color: '#374151',
  marginBottom: '1rem',
};

const codeBlockStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#e2e8f0',
  padding: '1.25rem',
  borderRadius: '8px',
  overflowX: 'auto',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  marginBottom: '1.5rem',
  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
};

const tldrBoxStyle: React.CSSProperties = {
  background: '#f0f9ff',
  borderLeft: '4px solid #0ea5e9',
  padding: '1.25rem 1.5rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '2rem',
  fontSize: '1.05rem',
  lineHeight: 1.7,
  color: '#0c4a6e',
};

const takeawaysBoxStyle: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '2rem',
};

const takeawayItemStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.7,
  color: '#334155',
  marginBottom: '0.5rem',
  paddingLeft: '0.5rem',
};

const tableContainerStyle: React.CSSProperties = {
  overflowX: 'auto',
  marginBottom: '2rem',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

const thStyle: React.CSSProperties = {
  background: '#1e293b',
  color: '#f8fafc',
  padding: '0.75rem 1rem',
  textAlign: 'left',
  fontWeight: 600,
  borderBottom: '2px solid #334155',
};

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid #e2e8f0',
  color: '#374151',
};

const tdAltStyle: React.CSSProperties = {
  ...tdStyle,
  background: '#f8fafc',
};

const tipBoxStyle: React.CSSProperties = {
  background: '#f0fdf4',
  borderLeft: '4px solid #22c55e',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#14532d',
};

const warningBoxStyle: React.CSSProperties = {
  background: '#fffbeb',
  borderLeft: '4px solid #f59e0b',
  padding: '1rem 1.25rem',
  borderRadius: '0 8px 8px 0',
  marginBottom: '1.5rem',
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#78350f',
};

const inlineCodeStyle: React.CSSProperties = {
  background: '#f1f5f9',
  color: '#dc2626',
  padding: '0.15rem 0.4rem',
  borderRadius: '4px',
  fontSize: '0.9em',
  fontFamily: "'Fira Code', Consolas, monospace",
};

export default function PythonAdvancedGuide({ lang }: { lang: string }) {
  const isZh = lang === 'zh';
  const t = translations[lang] || translations['en'];

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

  return (
    <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Title */}
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>
          {t.subtitle}
        </p>
      </header>

      {/* TL;DR Box */}
      <div style={tldrBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0369a1', fontSize: '1.1rem' }}>
          TL;DR
        </strong>
        {t.tldr}
      </div>

      {/* Key Takeaways */}
      <div style={takeawaysBoxStyle}>
        <strong style={{ display: 'block', marginBottom: '0.75rem', color: '#1e293b', fontSize: '1.1rem' }}>
          {isZh ? '关键要点' : 'Key Takeaways'}
        </strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway1}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway2}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway3}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway4}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway5}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway6}</li>
          <li style={takeawayItemStyle}>&#10003; {t.takeaway7}</li>
        </ul>
      </div>

      {/* Introduction */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.introTitle}</h2>
        <p style={paragraphStyle}>{t.introP1}</p>
        <p style={paragraphStyle}>{t.introP2}</p>
      </section>

      {/* 1. Type Hints & Generics */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.typeHintsTitle}</h2>
        <p style={paragraphStyle}>{t.typeHintsP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? 'TypeVar 与泛型约束' : 'TypeVar & Generic Constraints'}</h3>
        <p style={paragraphStyle}>{t.typeHintsP2}</p>
        <pre style={codeBlockStyle}><code>{
          'from typing import TypeVar, Generic, Protocol, ParamSpec, Callable\n'
          + 'from collections.abc import Sequence\n\n'
          + '# Basic TypeVar with constraints\n'
          + 'T = TypeVar("T")\n'
          + 'S = TypeVar("S", bound=str)  # Upper bound: must be str or subclass\n'
          + 'Num = TypeVar("Num", int, float)  # Value restriction: only int or float\n\n'
          + 'def first(items: Sequence[T]) -> T:\n'
          + '    """Return the first item, preserving the exact type."""\n'
          + '    return items[0]\n\n'
          + 'reveal_type(first([1, 2, 3]))       # int\n'
          + 'reveal_type(first(["a", "b"]))      # str\n'
          + 'reveal_type(first([(1, 2), (3,)]))  # tuple[int, ...]\n\n'
          + '# Generic class with TypeVar\n'
          + 'class Stack(Generic[T]):\n'
          + '    def __init__(self) -> None:\n'
          + '        self._items: list[T] = []\n\n'
          + '    def push(self, item: T) -> None:\n'
          + '        self._items.append(item)\n\n'
          + '    def pop(self) -> T:\n'
          + '        return self._items.pop()\n\n'
          + '    def peek(self) -> T:\n'
          + '        return self._items[-1]\n\n'
          + 'int_stack: Stack[int] = Stack()\n'
          + 'int_stack.push(42)       # OK\n'
          + '# int_stack.push("oops") # Type error!'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'ParamSpec 与 Protocol' : 'ParamSpec & Protocol'}</h3>
        <p style={paragraphStyle}>{t.typeHintsP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# ParamSpec — preserve function signatures in decorators\n'
          + 'P = ParamSpec("P")\n'
          + 'R = TypeVar("R")\n\n'
          + 'def logged(func: Callable[P, R]) -> Callable[P, R]:\n'
          + '    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:\n'
          + '        print(f"Calling {func.__name__}")\n'
          + '        return func(*args, **kwargs)\n'
          + '    return wrapper\n\n'
          + '@logged\n'
          + 'def add(x: int, y: int) -> int:\n'
          + '    return x + y\n\n'
          + 'add(1, 2)      # OK — type checker knows signature\n'
          + '# add("a", "b") # Type error: expected int\n\n'
          + '# Protocol — structural subtyping (duck typing with types)\n'
          + 'class Renderable(Protocol):\n'
          + '    def render(self) -> str: ...\n\n'
          + 'class Button:\n'
          + '    def render(self) -> str:\n'
          + '        return "<button>Click</button>"\n\n'
          + 'class Chart:\n'
          + '    def render(self) -> str:\n'
          + '        return "<svg>...</svg>"\n\n'
          + 'def display(widget: Renderable) -> None:\n'
          + '    print(widget.render())\n\n'
          + 'display(Button())  # OK — Button has render() -> str\n'
          + 'display(Chart())   # OK — Chart has render() -> str\n\n'
          + '# Python 3.12+ new syntax (PEP 695)\n'
          + 'def first_new[T](items: Sequence[T]) -> T:\n'
          + '    return items[0]'
        }</code></pre>
      </section>

      {/* 2. Dataclasses & Pydantic */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.dataclassesTitle}</h2>
        <p style={paragraphStyle}>{t.dataclassesP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? 'Dataclass 高级用法' : 'Advanced Dataclass Usage'}</h3>
        <pre style={codeBlockStyle}><code>{
          'from dataclasses import dataclass, field, asdict, astuple\n'
          + 'from typing import Optional\n'
          + 'from datetime import datetime\n\n'
          + '@dataclass(frozen=True, slots=True)  # Immutable + memory efficient\n'
          + 'class Point:\n'
          + '    x: float\n'
          + '    y: float\n\n'
          + '    @property\n'
          + '    def distance(self) -> float:\n'
          + '        return (self.x ** 2 + self.y ** 2) ** 0.5\n\n'
          + '@dataclass\n'
          + 'class User:\n'
          + '    name: str\n'
          + '    email: str\n'
          + '    age: int\n'
          + '    tags: list[str] = field(default_factory=list)\n'
          + '    created_at: datetime = field(default_factory=datetime.now)\n'
          + '    _password_hash: str = field(default="", repr=False, compare=False)\n\n'
          + '    def __post_init__(self) -> None:\n'
          + '        """Validate after __init__ runs."""\n'
          + '        if self.age < 0:\n'
          + '            raise ValueError("Age must be non-negative")\n'
          + '        if "@" not in self.email:\n'
          + '            raise ValueError("Invalid email")\n\n'
          + 'user = User("Alice", "alice@example.com", 30, ["admin"])\n'
          + 'print(asdict(user))    # Convert to dict\n'
          + 'print(astuple(user))   # Convert to tuple'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'Pydantic v2 模型验证' : 'Pydantic v2 Model Validation'}</h3>
        <p style={paragraphStyle}>{t.dataclassesP2}</p>
        <pre style={codeBlockStyle}><code>{
          'from pydantic import BaseModel, Field, field_validator, model_validator\n'
          + 'from pydantic import ConfigDict, EmailStr\n'
          + 'from datetime import datetime\n\n'
          + 'class Address(BaseModel):\n'
          + '    street: str\n'
          + '    city: str\n'
          + '    country: str = "US"\n'
          + '    zip_code: str = Field(pattern=r"^\\d{5}(-\\d{4})?$")\n\n'
          + 'class UserCreate(BaseModel):\n'
          + '    model_config = ConfigDict(str_strip_whitespace=True)\n\n'
          + '    name: str = Field(min_length=1, max_length=100)\n'
          + '    email: EmailStr\n'
          + '    age: int = Field(ge=0, le=150)\n'
          + '    address: Address\n'
          + '    tags: list[str] = Field(default_factory=list, max_length=10)\n\n'
          + '    @field_validator("name")\n'
          + '    @classmethod\n'
          + '    def name_must_be_title_case(cls, v: str) -> str:\n'
          + '        return v.title()\n\n'
          + '    @model_validator(mode="after")\n'
          + '    def check_age_for_minors(self) -> "UserCreate":\n'
          + '        if self.age < 18 and "minor" not in self.tags:\n'
          + '            self.tags.append("minor")\n'
          + '        return self\n\n'
          + '# Automatic validation + serialization\n'
          + 'user = UserCreate(\n'
          + '    name="  alice smith  ",\n'
          + '    email="alice@example.com",\n'
          + '    age=25,\n'
          + '    address={"street": "123 Main St", "city": "NYC", "zip_code": "10001"},\n'
          + ')\n'
          + 'print(user.model_dump_json(indent=2))  # JSON serialization\n'
          + 'print(user.model_json_schema())          # JSON Schema generation'
        }</code></pre>
        <p style={paragraphStyle}>{t.dataclassesP3}</p>
      </section>

      {/* 3. Decorators Deep Dive */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.decoratorsTitle}</h2>
        <p style={paragraphStyle}>{t.decoratorsP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '参数化装饰器' : 'Parameterized Decorators'}</h3>
        <p style={paragraphStyle}>{t.decoratorsP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import functools\n'
          + 'import time\n'
          + 'from typing import Callable, TypeVar, ParamSpec\n\n'
          + 'P = ParamSpec("P")\n'
          + 'R = TypeVar("R")\n\n'
          + '# Simple decorator with functools.wraps\n'
          + 'def timer(func: Callable[P, R]) -> Callable[P, R]:\n'
          + '    @functools.wraps(func)\n'
          + '    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:\n'
          + '        start = time.perf_counter()\n'
          + '        result = func(*args, **kwargs)\n'
          + '        elapsed = time.perf_counter() - start\n'
          + '        print(f"{func.__name__} took {elapsed:.4f}s")\n'
          + '        return result\n'
          + '    return wrapper\n\n'
          + '# Parameterized decorator (decorator factory)\n'
          + 'def retry(max_attempts: int = 3, delay: float = 1.0):\n'
          + '    """Retry a function on failure with exponential backoff."""\n'
          + '    def decorator(func: Callable[P, R]) -> Callable[P, R]:\n'
          + '        @functools.wraps(func)\n'
          + '        def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:\n'
          + '            last_exception: Exception | None = None\n'
          + '            for attempt in range(max_attempts):\n'
          + '                try:\n'
          + '                    return func(*args, **kwargs)\n'
          + '                except Exception as e:\n'
          + '                    last_exception = e\n'
          + '                    wait = delay * (2 ** attempt)\n'
          + '                    print(f"Attempt {attempt + 1} failed, retrying in {wait}s")\n'
          + '                    time.sleep(wait)\n'
          + '            raise last_exception  # type: ignore\n'
          + '        return wrapper\n'
          + '    return decorator\n\n'
          + '@retry(max_attempts=5, delay=0.5)\n'
          + '@timer\n'
          + 'def fetch_data(url: str) -> dict:\n'
          + '    """Fetch data from API with retry logic."""\n'
          + '    import urllib.request\n'
          + '    import json\n'
          + '    with urllib.request.urlopen(url) as resp:\n'
          + '        return json.loads(resp.read())'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '类装饰器' : 'Class Decorators'}</h3>
        <p style={paragraphStyle}>{t.decoratorsP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# Class decorator: auto-register all subclasses\n'
          + '_registry: dict[str, type] = {}\n\n'
          + 'def register(cls: type) -> type:\n'
          + '    """Register a class in the global registry."""\n'
          + '    _registry[cls.__name__] = cls\n'
          + '    return cls\n\n'
          + '@register\n'
          + 'class JSONParser:\n'
          + '    def parse(self, data: str) -> dict:\n'
          + '        import json\n'
          + '        return json.loads(data)\n\n'
          + '@register\n'
          + 'class XMLParser:\n'
          + '    def parse(self, data: str) -> dict:\n'
          + '        # XML parsing logic\n'
          + '        return {}\n\n'
          + 'print(_registry)  # {"JSONParser": <class>, "XMLParser": <class>}\n\n'
          + '# Class decorator: singleton pattern\n'
          + 'def singleton(cls: type) -> type:\n'
          + '    instances: dict[type, object] = {}\n'
          + '    @functools.wraps(cls, updated=())\n'
          + '    def get_instance(*args, **kwargs):\n'
          + '        if cls not in instances:\n'
          + '            instances[cls] = cls(*args, **kwargs)\n'
          + '        return instances[cls]\n'
          + '    return get_instance  # type: ignore\n\n'
          + '@singleton\n'
          + 'class DatabaseConnection:\n'
          + '    def __init__(self, url: str) -> None:\n'
          + '        self.url = url\n'
          + '        print(f"Connecting to {url}")\n\n'
          + 'db1 = DatabaseConnection("postgres://localhost/mydb")\n'
          + 'db2 = DatabaseConnection("postgres://localhost/mydb")\n'
          + 'print(db1 is db2)  # True — same instance'
        }</code></pre>
      </section>

      {/* 4. Context Managers & Generators */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.contextTitle}</h2>
        <p style={paragraphStyle}>{t.contextP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '上下文管理器模式' : 'Context Manager Patterns'}</h3>
        <pre style={codeBlockStyle}><code>{
          'from contextlib import contextmanager, asynccontextmanager, ExitStack\n'
          + 'from typing import Generator, AsyncGenerator\n'
          + 'import time\n\n'
          + '# Class-based context manager\n'
          + 'class Timer:\n'
          + '    def __init__(self, label: str) -> None:\n'
          + '        self.label = label\n'
          + '        self.elapsed: float = 0.0\n\n'
          + '    def __enter__(self) -> "Timer":\n'
          + '        self.start = time.perf_counter()\n'
          + '        return self\n\n'
          + '    def __exit__(self, exc_type, exc_val, exc_tb) -> bool:\n'
          + '        self.elapsed = time.perf_counter() - self.start\n'
          + '        print(f"{self.label}: {self.elapsed:.4f}s")\n'
          + '        return False  # Do not suppress exceptions\n\n'
          + 'with Timer("data processing") as t:\n'
          + '    data = [i ** 2 for i in range(1_000_000)]\n\n'
          + '# Generator-based context manager (simpler)\n'
          + '@contextmanager\n'
          + 'def temp_directory() -> Generator[str, None, None]:\n'
          + '    import tempfile, shutil\n'
          + '    path = tempfile.mkdtemp()\n'
          + '    try:\n'
          + '        yield path  # Provide the resource\n'
          + '    finally:\n'
          + '        shutil.rmtree(path)  # Guaranteed cleanup\n\n'
          + 'with temp_directory() as tmpdir:\n'
          + '    print(f"Working in {tmpdir}")\n\n'
          + '# ExitStack — compose multiple context managers dynamically\n'
          + 'def process_files(paths: list[str]) -> list[str]:\n'
          + '    with ExitStack() as stack:\n'
          + '        files = [stack.enter_context(open(p)) for p in paths]\n'
          + '        return [f.read() for f in files]'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '生成器与 yield from' : 'Generators & yield from'}</h3>
        <p style={paragraphStyle}>{t.contextP2}</p>
        <pre style={codeBlockStyle}><code>{
          'from typing import Generator, Iterator\n\n'
          + '# Generator for memory-efficient processing\n'
          + 'def read_large_file(path: str, chunk_size: int = 8192) -> Generator[str, None, None]:\n'
          + '    """Read a large file in chunks without loading it all."""\n'
          + '    with open(path) as f:\n'
          + '        while chunk := f.read(chunk_size):\n'
          + '            yield chunk\n\n'
          + '# yield from — delegate to sub-generator\n'
          + 'def flatten(nested: list) -> Generator:\n'
          + '    """Recursively flatten nested lists."""\n'
          + '    for item in nested:\n'
          + '        if isinstance(item, list):\n'
          + '            yield from flatten(item)  # Delegate recursion\n'
          + '        else:\n'
          + '            yield item\n\n'
          + 'data = [1, [2, 3], [4, [5, 6]], 7]\n'
          + 'print(list(flatten(data)))  # [1, 2, 3, 4, 5, 6, 7]\n\n'
          + '# Generator pipeline — compose data transformations\n'
          + 'def lines(path: str) -> Iterator[str]:\n'
          + '    with open(path) as f:\n'
          + '        yield from f\n\n'
          + 'def strip(it: Iterator[str]) -> Iterator[str]:\n'
          + '    for line in it:\n'
          + '        yield line.strip()\n\n'
          + 'def non_empty(it: Iterator[str]) -> Iterator[str]:\n'
          + '    for line in it:\n'
          + '        if line:\n'
          + '            yield line\n\n'
          + '# Compose: file -> strip -> non_empty -> process\n'
          + '# pipeline = non_empty(strip(lines("data.txt")))\n'
          + '# for line in pipeline:\n'
          + '#     process(line)'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '异步上下文管理器' : 'Async Context Managers'}</h3>
        <p style={paragraphStyle}>{t.contextP3}</p>
        <pre style={codeBlockStyle}><code>{
          'import asyncio\n\n'
          + '@asynccontextmanager\n'
          + 'async def db_transaction(conn) -> AsyncGenerator:\n'
          + '    """Async context manager for database transactions."""\n'
          + '    tx = await conn.begin()\n'
          + '    try:\n'
          + '        yield tx\n'
          + '        await tx.commit()\n'
          + '    except Exception:\n'
          + '        await tx.rollback()\n'
          + '        raise\n\n'
          + '# Usage:\n'
          + '# async with db_transaction(conn) as tx:\n'
          + '#     await tx.execute("INSERT INTO users ...")'
        }</code></pre>
      </section>

      {/* 5. Async/Await Patterns */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.asyncTitle}</h2>
        <p style={paragraphStyle}>{t.asyncP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? 'asyncio.gather 与信号量' : 'asyncio.gather & Semaphores'}</h3>
        <p style={paragraphStyle}>{t.asyncP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import asyncio\n'
          + 'import httpx\n\n'
          + 'async def fetch_url(client: httpx.AsyncClient, url: str) -> dict:\n'
          + '    """Fetch a single URL."""\n'
          + '    response = await client.get(url)\n'
          + '    return {"url": url, "status": response.status_code}\n\n'
          + 'async def fetch_all(urls: list[str]) -> list[dict]:\n'
          + '    """Fetch multiple URLs concurrently."""\n'
          + '    async with httpx.AsyncClient() as client:\n'
          + '        tasks = [fetch_url(client, url) for url in urls]\n'
          + '        results = await asyncio.gather(*tasks, return_exceptions=True)\n'
          + '        return [r for r in results if isinstance(r, dict)]\n\n'
          + '# Semaphore — limit concurrent connections\n'
          + 'async def fetch_with_limit(urls: list[str], max_concurrent: int = 10):\n'
          + '    semaphore = asyncio.Semaphore(max_concurrent)\n\n'
          + '    async def limited_fetch(client: httpx.AsyncClient, url: str):\n'
          + '        async with semaphore:  # At most max_concurrent at once\n'
          + '            return await fetch_url(client, url)\n\n'
          + '    async with httpx.AsyncClient() as client:\n'
          + '        tasks = [limited_fetch(client, url) for url in urls]\n'
          + '        return await asyncio.gather(*tasks)'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'Task Group（Python 3.11+）' : 'Task Groups (Python 3.11+)'}</h3>
        <p style={paragraphStyle}>{t.asyncP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# TaskGroup — structured concurrency (Python 3.11+)\n'
          + 'async def process_batch(items: list[str]) -> list[str]:\n'
          + '    results: list[str] = []\n\n'
          + '    async with asyncio.TaskGroup() as tg:\n'
          + '        for item in items:\n'
          + '            tg.create_task(process_item(item))\n\n'
          + '    # All tasks completed successfully here\n'
          + '    # If ANY task raises, ALL are cancelled automatically\n'
          + '    return results\n\n'
          + 'async def process_item(item: str) -> str:\n'
          + '    await asyncio.sleep(0.1)  # Simulate I/O\n'
          + '    return f"processed: {item}"\n\n'
          + '# Producer-consumer with asyncio.Queue\n'
          + 'async def producer(queue: asyncio.Queue[str], items: list[str]):\n'
          + '    for item in items:\n'
          + '        await queue.put(item)\n'
          + '    await queue.put("")  # Sentinel to signal done\n\n'
          + 'async def consumer(queue: asyncio.Queue[str], name: str):\n'
          + '    while True:\n'
          + '        item = await queue.get()\n'
          + '        if item == "":  # Sentinel\n'
          + '            await queue.put("")  # Pass sentinel to other consumers\n'
          + '            break\n'
          + '        print(f"{name} processing: {item}")\n'
          + '        await asyncio.sleep(0.1)\n'
          + '        queue.task_done()\n\n'
          + 'async def main():\n'
          + '    queue: asyncio.Queue[str] = asyncio.Queue(maxsize=100)\n'
          + '    items = [f"item-{i}" for i in range(50)]\n\n'
          + '    async with asyncio.TaskGroup() as tg:\n'
          + '        tg.create_task(producer(queue, items))\n'
          + '        for i in range(3):  # 3 consumers\n'
          + '            tg.create_task(consumer(queue, f"worker-{i}"))'
        }</code></pre>
      </section>

      {/* 6. Metaclasses & Descriptors */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.metaclassesTitle}</h2>
        <p style={paragraphStyle}>{t.metaclassesP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '自定义元类' : 'Custom Metaclass'}</h3>
        <pre style={codeBlockStyle}><code>{
          '# Metaclass that validates class attributes\n'
          + 'class ValidatedMeta(type):\n'
          + '    def __new__(mcs, name: str, bases: tuple, namespace: dict):\n'
          + '        # Ensure all public methods have docstrings\n'
          + '        for attr_name, attr_value in namespace.items():\n'
          + '            if callable(attr_value) and not attr_name.startswith("_"):\n'
          + '                if not attr_value.__doc__:\n'
          + '                    raise TypeError(\n'
          + '                        f"{name}.{attr_name} must have a docstring"\n'
          + '                    )\n'
          + '        return super().__new__(mcs, name, bases, namespace)\n\n'
          + 'class APIHandler(metaclass=ValidatedMeta):\n'
          + '    def get(self, request):\n'
          + '        """Handle GET request."""\n'
          + '        pass\n\n'
          + '    def post(self, request):\n'
          + '        """Handle POST request."""\n'
          + '        pass\n\n'
          + '# This would raise TypeError:\n'
          + '# class BadHandler(metaclass=ValidatedMeta):\n'
          + '#     def get(self, request):  # No docstring!\n'
          + '#         pass'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '描述符与 __set_name__' : 'Descriptors & __set_name__'}</h3>
        <p style={paragraphStyle}>{t.metaclassesP2}</p>
        <pre style={codeBlockStyle}><code>{
          '# Descriptor for validated attributes\n'
          + 'class Validated:\n'
          + '    def __init__(self, *, min_val: float = float("-inf"), max_val: float = float("inf")):\n'
          + '        self.min_val = min_val\n'
          + '        self.max_val = max_val\n\n'
          + '    def __set_name__(self, owner: type, name: str) -> None:\n'
          + '        """Called automatically when class is created."""\n'
          + '        self.public_name = name\n'
          + '        self.private_name = f"_{name}"\n\n'
          + '    def __get__(self, obj, objtype=None):\n'
          + '        if obj is None:\n'
          + '            return self\n'
          + '        return getattr(obj, self.private_name, None)\n\n'
          + '    def __set__(self, obj, value: float) -> None:\n'
          + '        if not isinstance(value, (int, float)):\n'
          + '            raise TypeError(f"{self.public_name} must be a number")\n'
          + '        if not (self.min_val <= value <= self.max_val):\n'
          + '            raise ValueError(\n'
          + '                f"{self.public_name} must be between "\n'
          + '                f"{self.min_val} and {self.max_val}"\n'
          + '            )\n'
          + '        setattr(obj, self.private_name, value)\n\n'
          + 'class Product:\n'
          + '    price = Validated(min_val=0, max_val=10_000)\n'
          + '    quantity = Validated(min_val=0, max_val=1_000_000)\n\n'
          + '    def __init__(self, name: str, price: float, quantity: int):\n'
          + '        self.name = name\n'
          + '        self.price = price        # Triggers Validated.__set__\n'
          + '        self.quantity = quantity   # Triggers Validated.__set__\n\n'
          + 'p = Product("Widget", 29.99, 100)  # OK\n'
          + '# Product("Bad", -5, 10)           # ValueError!'
        }</code></pre>

        <div style={tipBoxStyle}>
          <strong>{isZh ? '提示：' : 'Tip:'}</strong>{' '}
          {isZh
            ? '大多数情况下，__init_subclass__ 比自定义元类更简单。仅在需要控制类创建过程本身时使用元类。'
            : 'Prefer __init_subclass__ over custom metaclasses for most subclass customization. Use metaclasses only when you need control over the class creation process itself.'}
        </div>

        <pre style={codeBlockStyle}><code>{
          '# __init_subclass__ — simpler alternative to metaclasses\n'
          + 'class PluginBase:\n'
          + '    _plugins: dict[str, type] = {}\n\n'
          + '    def __init_subclass__(cls, *, plugin_name: str = "", **kwargs):\n'
          + '        super().__init_subclass__(**kwargs)\n'
          + '        name = plugin_name or cls.__name__.lower()\n'
          + '        PluginBase._plugins[name] = cls\n\n'
          + 'class JSONPlugin(PluginBase, plugin_name="json"):\n'
          + '    pass\n\n'
          + 'class YAMLPlugin(PluginBase, plugin_name="yaml"):\n'
          + '    pass\n\n'
          + 'print(PluginBase._plugins)  # {"json": <class>, "yaml": <class>}'
        }</code></pre>
      </section>

      {/* 7. Pattern Matching */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.patternTitle}</h2>
        <p style={paragraphStyle}>{t.patternP1}</p>
        <p style={paragraphStyle}>{t.patternP2}</p>

        <h3 style={subHeadingStyle}>{isZh ? '结构化模式匹配示例' : 'Structural Pattern Matching Examples'}</h3>
        <pre style={codeBlockStyle}><code>{
          'from dataclasses import dataclass\n\n'
          + '# Matching sequences and mappings\n'
          + 'def process_command(command: list[str]) -> str:\n'
          + '    match command:\n'
          + '        case ["quit" | "exit"]:\n'
          + '            return "Goodbye!"\n'
          + '        case ["hello", name]:\n'
          + '            return f"Hello, {name}!"\n'
          + '        case ["add", *numbers] if all(n.isdigit() for n in numbers):\n'
          + '            total = sum(int(n) for n in numbers)\n'
          + '            return f"Sum: {total}"\n'
          + '        case ["set", key, value]:\n'
          + '            return f"Setting {key} = {value}"\n'
          + '        case _:\n'
          + '            return "Unknown command"\n\n'
          + 'print(process_command(["hello", "Alice"]))  # Hello, Alice!\n'
          + 'print(process_command(["add", "1", "2", "3"]))  # Sum: 6\n\n'
          + '# Matching class instances\n'
          + '@dataclass\n'
          + 'class Point:\n'
          + '    x: float\n'
          + '    y: float\n\n'
          + '@dataclass\n'
          + 'class Circle:\n'
          + '    center: Point\n'
          + '    radius: float\n\n'
          + '@dataclass\n'
          + 'class Rectangle:\n'
          + '    top_left: Point\n'
          + '    width: float\n'
          + '    height: float\n\n'
          + 'def describe_shape(shape) -> str:\n'
          + '    match shape:\n'
          + '        case Circle(center=Point(x=0, y=0), radius=r):\n'
          + '            return f"Circle at origin with radius {r}"\n'
          + '        case Circle(center=Point(x=x, y=y), radius=r) if r > 100:\n'
          + '            return f"Large circle at ({x}, {y})"\n'
          + '        case Rectangle(width=w, height=h) if w == h:\n'
          + '            return f"Square with side {w}"\n'
          + '        case Rectangle(width=w, height=h):\n'
          + '            return f"Rectangle {w}x{h}"\n'
          + '        case _:\n'
          + '            return "Unknown shape"'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '匹配映射和 API 响应' : 'Matching Mappings & API Responses'}</h3>
        <p style={paragraphStyle}>{t.patternP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# Matching dict-like structures (API responses)\n'
          + 'def handle_response(response: dict) -> str:\n'
          + '    match response:\n'
          + '        case {"status": "ok", "data": {"users": [first, *rest]}}:\n'
          + '            return f"Found {1 + len(rest)} users, first: {first}"\n'
          + '        case {"status": "ok", "data": data}:\n'
          + '            return f"Success with data: {data}"\n'
          + '        case {"status": "error", "code": code, "message": msg}:\n'
          + '            return f"Error {code}: {msg}"\n'
          + '        case {"status": "error", **rest}:\n'
          + '            return f"Error with details: {rest}"\n'
          + '        case _:\n'
          + '            return "Unexpected response format"\n\n'
          + 'print(handle_response({\n'
          + '    "status": "ok",\n'
          + '    "data": {"users": ["Alice", "Bob", "Charlie"]}\n'
          + '}))  # Found 3 users, first: Alice\n\n'
          + 'print(handle_response({\n'
          + '    "status": "error",\n'
          + '    "code": 404,\n'
          + '    "message": "Not found"\n'
          + '}))  # Error 404: Not found'
        }</code></pre>
      </section>

      {/* 8. Memory Management */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.memoryTitle}</h2>
        <p style={paragraphStyle}>{t.memoryP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '__slots__ 与内存优化' : '__slots__ & Memory Optimization'}</h3>
        <pre style={codeBlockStyle}><code>{
          'import sys\n'
          + 'import weakref\n'
          + 'import gc\n\n'
          + '# Without __slots__: each instance has a __dict__\n'
          + 'class PointRegular:\n'
          + '    def __init__(self, x: float, y: float):\n'
          + '        self.x = x\n'
          + '        self.y = y\n\n'
          + '# With __slots__: fixed attribute storage, no __dict__\n'
          + 'class PointSlots:\n'
          + '    __slots__ = ("x", "y")\n\n'
          + '    def __init__(self, x: float, y: float):\n'
          + '        self.x = x\n'
          + '        self.y = y\n\n'
          + '# Memory comparison\n'
          + 'regular = PointRegular(1.0, 2.0)\n'
          + 'slotted = PointSlots(1.0, 2.0)\n\n'
          + 'print(f"Regular: {sys.getsizeof(regular)} + {sys.getsizeof(regular.__dict__)} bytes")\n'
          + 'print(f"Slotted: {sys.getsizeof(slotted)} bytes (no __dict__)")\n'
          + '# Regular: ~56 + ~104 = 160 bytes\n'
          + '# Slotted: ~56 bytes (60% less memory!)\n\n'
          + '# With 1 million instances:\n'
          + '# Regular: ~160 MB\n'
          + '# Slotted: ~56 MB'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'Weakref 与垃圾回收' : 'Weakref & Garbage Collection'}</h3>
        <p style={paragraphStyle}>{t.memoryP2}</p>
        <pre style={codeBlockStyle}><code>{
          '# weakref — references that do not prevent GC\n'
          + 'class ExpensiveObject:\n'
          + '    def __init__(self, name: str):\n'
          + '        self.name = name\n'
          + '    def __del__(self):\n'
          + '        print(f"Deleting {self.name}")\n\n'
          + '# WeakValueDictionary for caching\n'
          + 'cache: weakref.WeakValueDictionary[str, ExpensiveObject] = (\n'
          + '    weakref.WeakValueDictionary()\n'
          + ')\n\n'
          + 'obj = ExpensiveObject("data-1")\n'
          + 'cache["data-1"] = obj\n\n'
          + 'print("data-1" in cache)  # True\n'
          + 'del obj                    # No more strong references\n'
          + 'gc.collect()               # Force garbage collection\n'
          + 'print("data-1" in cache)  # False — obj was collected\n\n'
          + '# Memory profiling with tracemalloc\n'
          + 'import tracemalloc\n\n'
          + 'tracemalloc.start()\n\n'
          + '# ... your code here ...\n'
          + 'data = [dict(x=i, y=i**2) for i in range(100_000)]\n\n'
          + 'snapshot = tracemalloc.take_snapshot()\n'
          + 'top_stats = snapshot.statistics("lineno")\n'
          + 'for stat in top_stats[:5]:\n'
          + '    print(stat)'
        }</code></pre>
        <p style={paragraphStyle}>{t.memoryP3}</p>
      </section>

      {/* 9. Concurrency */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.concurrencyTitle}</h2>
        <p style={paragraphStyle}>{t.concurrencyP1}</p>

        {/* Comparison Table */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>{isZh ? '特性' : 'Feature'}</th>
                <th style={thStyle}>threading</th>
                <th style={thStyle}>multiprocessing</th>
                <th style={thStyle}>asyncio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={tdStyle}>{isZh ? '适用场景' : 'Best For'}</td>
                <td style={tdStyle}>{isZh ? 'I/O密集(兼容旧代码)' : 'I/O-bound (legacy)'}</td>
                <td style={tdStyle}>{isZh ? 'CPU密集型' : 'CPU-bound'}</td>
                <td style={tdStyle}>{isZh ? 'I/O密集(现代)' : 'I/O-bound (modern)'}</td>
              </tr>
              <tr>
                <td style={tdAltStyle}>GIL</td>
                <td style={tdAltStyle}>{isZh ? '受限' : 'Limited by GIL'}</td>
                <td style={tdAltStyle}>{isZh ? '不受限(独立进程)' : 'No GIL (separate processes)'}</td>
                <td style={tdAltStyle}>{isZh ? '单线程(无需)' : 'Single-threaded (N/A)'}</td>
              </tr>
              <tr>
                <td style={tdStyle}>{isZh ? '内存' : 'Memory'}</td>
                <td style={tdStyle}>{isZh ? '共享' : 'Shared'}</td>
                <td style={tdStyle}>{isZh ? '独立(高开销)' : 'Separate (high overhead)'}</td>
                <td style={tdStyle}>{isZh ? '共享(低开销)' : 'Shared (low overhead)'}</td>
              </tr>
              <tr>
                <td style={tdAltStyle}>{isZh ? '扩展性' : 'Scalability'}</td>
                <td style={tdAltStyle}>{isZh ? '数十个线程' : '~dozens of threads'}</td>
                <td style={tdAltStyle}>{isZh ? '与CPU核心数相当' : '~CPU core count'}</td>
                <td style={tdAltStyle}>{isZh ? '数千任务' : '~thousands of tasks'}</td>
              </tr>
              <tr>
                <td style={tdStyle}>{isZh ? '调试难度' : 'Debugging'}</td>
                <td style={tdStyle}>{isZh ? '困难(竞态)' : 'Hard (race conditions)'}</td>
                <td style={tdStyle}>{isZh ? '中等' : 'Medium'}</td>
                <td style={tdStyle}>{isZh ? '较容易(单线程)' : 'Easier (single-threaded)'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 style={subHeadingStyle}>{isZh ? '并发模式对比代码' : 'Concurrency Pattern Comparison'}</h3>
        <p style={paragraphStyle}>{t.concurrencyP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import asyncio\n'
          + 'from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor\n'
          + 'import time\n\n'
          + '# I/O-bound: asyncio wins\n'
          + 'async def async_fetch_all(urls: list[str]) -> list:\n'
          + '    async def fetch(url: str):\n'
          + '        await asyncio.sleep(0.1)  # Simulate network I/O\n'
          + '        return url\n'
          + '    return await asyncio.gather(*[fetch(u) for u in urls])\n\n'
          + '# I/O-bound: threading alternative\n'
          + 'def threaded_fetch_all(urls: list[str]) -> list:\n'
          + '    def fetch(url: str) -> str:\n'
          + '        time.sleep(0.1)  # Simulate network I/O\n'
          + '        return url\n'
          + '    with ThreadPoolExecutor(max_workers=20) as executor:\n'
          + '        return list(executor.map(fetch, urls))\n\n'
          + '# CPU-bound: multiprocessing wins\n'
          + 'def cpu_task(n: int) -> int:\n'
          + '    """CPU-intensive computation."""\n'
          + '    return sum(i * i for i in range(n))\n\n'
          + 'def parallel_compute(numbers: list[int]) -> list[int]:\n'
          + '    with ProcessPoolExecutor() as executor:\n'
          + '        return list(executor.map(cpu_task, numbers))\n\n'
          + '# Benchmark results (1000 URLs / 10 CPU tasks):\n'
          + '# asyncio:         ~0.1s (1000 concurrent coroutines)\n'
          + '# threading (20):  ~5.0s (20 threads, batched)\n'
          + '# multiprocessing: ~1.5s (CPU-bound, 8 cores)'
        }</code></pre>
        <p style={paragraphStyle}>{t.concurrencyP3}</p>
      </section>

      {/* 10. Testing with pytest */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.pytestTitle}</h2>
        <p style={paragraphStyle}>{t.pytestP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? 'Fixture 与参数化' : 'Fixtures & Parametrize'}</h3>
        <p style={paragraphStyle}>{t.pytestP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import pytest\n'
          + 'from unittest.mock import AsyncMock, patch, MagicMock\n\n'
          + '# conftest.py — shared fixtures\n'
          + '@pytest.fixture\n'
          + 'def sample_user() -> dict:\n'
          + '    return {"name": "Alice", "email": "alice@test.com", "age": 30}\n\n'
          + '@pytest.fixture\n'
          + 'def db_session():\n'
          + '    """Create a test database session with rollback."""\n'
          + '    session = create_test_session()\n'
          + '    yield session          # Provide to test\n'
          + '    session.rollback()     # Cleanup after test\n'
          + '    session.close()\n\n'
          + '@pytest.fixture(scope="module")\n'
          + 'def api_client():\n'
          + '    """Shared HTTP client for the entire test module."""\n'
          + '    client = TestClient(app)\n'
          + '    yield client\n'
          + '    client.close()\n\n'
          + '# Parametrize — generate multiple test cases\n'
          + '@pytest.mark.parametrize("input_val, expected", [\n'
          + '    ("hello", "HELLO"),\n'
          + '    ("World", "WORLD"),\n'
          + '    ("", ""),\n'
          + '    ("123abc", "123ABC"),\n'
          + '    ("already UPPER", "ALREADY UPPER"),\n'
          + '])\n'
          + 'def test_uppercase(input_val: str, expected: str):\n'
          + '    assert input_val.upper() == expected\n\n'
          + '# Parametrize with IDs for clear test names\n'
          + '@pytest.mark.parametrize("a, b, expected", [\n'
          + '    pytest.param(1, 2, 3, id="positive"),\n'
          + '    pytest.param(-1, 1, 0, id="negative-positive"),\n'
          + '    pytest.param(0, 0, 0, id="zeros"),\n'
          + '])\n'
          + 'def test_add(a: int, b: int, expected: int):\n'
          + '    assert a + b == expected'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'Mocking 与异步测试' : 'Mocking & Async Testing'}</h3>
        <p style={paragraphStyle}>{t.pytestP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# Mocking external services\n'
          + 'class UserService:\n'
          + '    def __init__(self, api_client):\n'
          + '        self.api_client = api_client\n\n'
          + '    async def get_user(self, user_id: int) -> dict:\n'
          + '        response = await self.api_client.get(f"/users/{user_id}")\n'
          + '        return response.json()\n\n'
          + 'def test_get_user_with_mock():\n'
          + '    mock_client = MagicMock()\n'
          + '    mock_client.get.return_value.json.return_value = {\n'
          + '        "id": 1, "name": "Alice"\n'
          + '    }\n'
          + '    service = UserService(mock_client)\n'
          + '    # ... test logic\n\n'
          + '# Async test (pytest-asyncio)\n'
          + '@pytest.mark.asyncio\n'
          + 'async def test_async_fetch():\n'
          + '    mock_client = AsyncMock()\n'
          + '    mock_client.get.return_value.json.return_value = {"status": "ok"}\n\n'
          + '    service = UserService(mock_client)\n'
          + '    result = await service.get_user(1)\n'
          + '    assert result == {"status": "ok"}\n'
          + '    mock_client.get.assert_called_once_with("/users/1")\n\n'
          + '# Patching module-level dependencies\n'
          + '@patch("myapp.services.requests.get")\n'
          + 'def test_external_api(mock_get):\n'
          + '    mock_get.return_value.status_code = 200\n'
          + '    mock_get.return_value.json.return_value = {"data": [1, 2, 3]}\n'
          + '    # ... test your function that calls requests.get\n\n'
          + '# Custom markers for test categorization\n'
          + '@pytest.mark.slow\n'
          + 'def test_large_dataset_processing():\n'
          + '    """Run with: pytest -m slow"""\n'
          + '    pass\n\n'
          + '@pytest.mark.integration\n'
          + 'def test_database_connection():\n'
          + '    """Run with: pytest -m integration"""\n'
          + '    pass'
        }</code></pre>
      </section>

      {/* 11. Python Packaging */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.packagingTitle}</h2>
        <p style={paragraphStyle}>{t.packagingP1}</p>

        <h3 style={subHeadingStyle}>pyproject.toml</h3>
        <pre style={codeBlockStyle}><code>{
          '# pyproject.toml — modern Python project configuration\n'
          + '[project]\n'
          + 'name = "my-awesome-lib"\n'
          + 'version = "1.0.0"\n'
          + 'description = "A high-performance data processing library"\n'
          + 'readme = "README.md"\n'
          + 'license = {text = "MIT"}\n'
          + 'requires-python = ">=3.11"\n'
          + 'authors = [{name = "Alice", email = "alice@example.com"}]\n'
          + 'keywords = ["data", "processing", "etl"]\n'
          + 'classifiers = [\n'
          + '    "Programming Language :: Python :: 3.11",\n'
          + '    "Programming Language :: Python :: 3.12",\n'
          + '    "Programming Language :: Python :: 3.13",\n'
          + ']\n\n'
          + 'dependencies = [\n'
          + '    "httpx>=0.27",\n'
          + '    "pydantic>=2.0",\n'
          + '    "rich>=13.0",\n'
          + ']\n\n'
          + '[project.optional-dependencies]\n'
          + 'dev = ["pytest>=8.0", "ruff>=0.8", "mypy>=1.13"]\n'
          + 'docs = ["mkdocs-material>=9.0"]\n\n'
          + '[project.scripts]\n'
          + 'my-cli = "my_lib.cli:main"\n\n'
          + '[build-system]\n'
          + 'requires = ["hatchling"]\n'
          + 'build-backend = "hatchling.build"\n\n'
          + '[tool.ruff]\n'
          + 'line-length = 88\n'
          + 'target-version = "py311"\n\n'
          + '[tool.ruff.lint]\n'
          + 'select = ["E", "F", "I", "UP", "B", "SIM"]\n\n'
          + '[tool.mypy]\n'
          + 'python_version = "3.11"\n'
          + 'strict = true\n\n'
          + '[tool.pytest.ini_options]\n'
          + 'asyncio_mode = "auto"\n'
          + 'testpaths = ["tests"]'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'uv：现代 Python 包管理' : 'uv: Modern Python Package Management'}</h3>
        <p style={paragraphStyle}>{t.packagingP2}</p>
        <pre style={codeBlockStyle}><code>{
          '# Install uv\n'
          + 'curl -LsSf https://astral.sh/uv/install.sh | sh\n\n'
          + '# Create a new project\n'
          + 'uv init my-project\n'
          + 'cd my-project\n\n'
          + '# Add dependencies (resolves and installs in seconds)\n'
          + 'uv add httpx pydantic rich\n'
          + 'uv add --dev pytest ruff mypy\n\n'
          + '# Run scripts (auto-creates venv if needed)\n'
          + 'uv run python main.py\n'
          + 'uv run pytest\n'
          + 'uv run ruff check .\n\n'
          + '# Pin Python version\n'
          + 'uv python pin 3.12\n\n'
          + '# Lock dependencies for reproducibility\n'
          + 'uv lock\n\n'
          + '# Build and publish\n'
          + 'uv build\n'
          + 'uv publish\n\n'
          + '# Run a one-off script with inline dependencies\n'
          + 'uv run --with requests --with rich script.py\n\n'
          + '# Speed comparison (adding 10 packages):\n'
          + '# pip:    45.2s\n'
          + '# poetry: 32.1s\n'
          + '# uv:     0.4s  (100x faster!)'
        }</code></pre>
        <p style={paragraphStyle}>{t.packagingP3}</p>
      </section>

      {/* 12. Performance Optimization */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.performanceTitle}</h2>
        <p style={paragraphStyle}>{t.performanceP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '分析与记忆化' : 'Profiling & Memoization'}</h3>
        <pre style={codeBlockStyle}><code>{
          'import cProfile\n'
          + 'import functools\n'
          + 'import time\n\n'
          + '# cProfile — function-level profiling\n'
          + 'def profile_me():\n'
          + '    data = [i ** 2 for i in range(1_000_000)]\n'
          + '    sorted_data = sorted(data, reverse=True)\n'
          + '    return sum(sorted_data[:100])\n\n'
          + 'cProfile.run("profile_me()", sort="cumulative")\n'
          + '# Output:\n'
          + '#   ncalls  tottime  percall  cumtime  percall filename:lineno(function)\n'
          + '#        1    0.000    0.000    0.412    0.412 <string>:1(<module>)\n'
          + '#        1    0.231    0.231    0.412    0.412 script.py:5(profile_me)\n'
          + '#        1    0.181    0.181    0.181    0.181 {built-in method builtins.sorted}\n\n'
          + '# functools.lru_cache — memoization\n'
          + '@functools.lru_cache(maxsize=128)\n'
          + 'def fibonacci(n: int) -> int:\n'
          + '    if n < 2:\n'
          + '        return n\n'
          + '    return fibonacci(n - 1) + fibonacci(n - 2)\n\n'
          + '# Without cache: fibonacci(35) takes ~5 seconds\n'
          + '# With cache: fibonacci(35) takes ~0.00001 seconds\n'
          + 'print(fibonacci(100))  # Instant!\n'
          + 'print(fibonacci.cache_info())  # Hits, misses, size\n\n'
          + '# functools.cache — unlimited cache (Python 3.9+)\n'
          + '@functools.cache\n'
          + 'def expensive_computation(x: int, y: int) -> float:\n'
          + '    time.sleep(1)  # Simulate expensive work\n'
          + '    return (x ** y) / (x + y)'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'NumPy 向量化 vs Python 循环' : 'NumPy Vectorization vs Python Loops'}</h3>
        <p style={paragraphStyle}>{t.performanceP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import numpy as np\n'
          + 'import time\n\n'
          + '# Python loop: slow\n'
          + 'def python_distance(x1, y1, x2, y2):\n'
          + '    """Calculate distances using pure Python."""\n'
          + '    distances = []\n'
          + '    for i in range(len(x1)):\n'
          + '        d = ((x1[i] - x2[i])**2 + (y1[i] - y2[i])**2) ** 0.5\n'
          + '        distances.append(d)\n'
          + '    return distances\n\n'
          + '# NumPy vectorized: fast\n'
          + 'def numpy_distance(x1, y1, x2, y2):\n'
          + '    """Calculate distances using NumPy vectorization."""\n'
          + '    return np.sqrt((x1 - x2)**2 + (y1 - y2)**2)\n\n'
          + '# Benchmark with 1 million points\n'
          + 'n = 1_000_000\n'
          + 'x1 = np.random.rand(n)\n'
          + 'y1 = np.random.rand(n)\n'
          + 'x2 = np.random.rand(n)\n'
          + 'y2 = np.random.rand(n)\n\n'
          + 'start = time.perf_counter()\n'
          + 'python_distance(list(x1), list(y1), list(x2), list(y2))\n'
          + 'python_time = time.perf_counter() - start\n\n'
          + 'start = time.perf_counter()\n'
          + 'numpy_distance(x1, y1, x2, y2)\n'
          + 'numpy_time = time.perf_counter() - start\n\n'
          + 'print(f"Python: {python_time:.3f}s")\n'
          + 'print(f"NumPy:  {numpy_time:.3f}s")\n'
          + 'print(f"Speedup: {python_time / numpy_time:.0f}x")\n'
          + '# Python: 1.234s\n'
          + '# NumPy:  0.012s\n'
          + '# Speedup: ~100x'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? 'Cython 与编译加速' : 'Cython & Compiled Acceleration'}</h3>
        <p style={paragraphStyle}>{t.performanceP3}</p>
        <pre style={codeBlockStyle}><code>{
          '# math_ops.pyx — Cython source file\n'
          + '# cython: language_level=3\n\n'
          + 'def primes_python(int limit):\n'
          + '    """Find primes up to limit using Sieve of Eratosthenes."""\n'
          + '    cdef int i, j\n'
          + '    cdef list sieve = [True] * (limit + 1)\n'
          + '    cdef list result = []\n\n'
          + '    for i in range(2, limit + 1):\n'
          + '        if sieve[i]:\n'
          + '            result.append(i)\n'
          + '            for j in range(i * i, limit + 1, i):\n'
          + '                sieve[j] = False\n'
          + '    return result\n\n'
          + '# setup.py for Cython\n'
          + '# from setuptools import setup\n'
          + '# from Cython.Build import cythonize\n'
          + '# setup(ext_modules=cythonize("math_ops.pyx"))\n\n'
          + '# Alternative: Numba JIT (no Cython setup needed)\n'
          + '# from numba import njit\n'
          + '# @njit\n'
          + '# def fast_sum(arr):\n'
          + '#     total = 0.0\n'
          + '#     for val in arr:\n'
          + '#         total += val\n'
          + '#     return total'
        }</code></pre>

        <div style={warningBoxStyle}>
          <strong>{isZh ? '注意：' : 'Warning:'}</strong>{' '}
          {isZh
            ? '永远先分析再优化。过早优化是万恶之源。使用 cProfile 或 py-spy 找到真正的瓶颈，然后针对性地优化。'
            : 'Always profile before optimizing. Premature optimization is the root of all evil. Use cProfile or py-spy to find real bottlenecks, then optimize targeted areas.'}
        </div>
      </section>

      {/* 13. Design Patterns */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.patternsTitle}</h2>
        <p style={paragraphStyle}>{t.patternsP1}</p>

        <h3 style={subHeadingStyle}>{isZh ? '单例与工厂模式' : 'Singleton & Factory Patterns'}</h3>
        <pre style={codeBlockStyle}><code>{
          '# Singleton — using module-level instance (Pythonic way)\n'
          + '# config.py\n'
          + 'class _Config:\n'
          + '    def __init__(self):\n'
          + '        self._settings: dict = {}\n\n'
          + '    def get(self, key: str, default=None):\n'
          + '        return self._settings.get(key, default)\n\n'
          + '    def set(self, key: str, value) -> None:\n'
          + '        self._settings[key] = value\n\n'
          + 'config = _Config()  # Module-level singleton\n'
          + '# Usage: from config import config\n\n'
          + '# Factory — using a registry dictionary\n'
          + 'from typing import Protocol\n\n'
          + 'class Serializer(Protocol):\n'
          + '    def serialize(self, data: dict) -> str: ...\n'
          + '    def deserialize(self, raw: str) -> dict: ...\n\n'
          + 'class JSONSerializer:\n'
          + '    def serialize(self, data: dict) -> str:\n'
          + '        import json\n'
          + '        return json.dumps(data)\n'
          + '    def deserialize(self, raw: str) -> dict:\n'
          + '        import json\n'
          + '        return json.loads(raw)\n\n'
          + 'class YAMLSerializer:\n'
          + '    def serialize(self, data: dict) -> str:\n'
          + '        import yaml\n'
          + '        return yaml.dump(data)\n'
          + '    def deserialize(self, raw: str) -> dict:\n'
          + '        import yaml\n'
          + '        return yaml.safe_load(raw)\n\n'
          + '_serializers: dict[str, type[Serializer]] = {\n'
          + '    "json": JSONSerializer,\n'
          + '    "yaml": YAMLSerializer,\n'
          + '}\n\n'
          + 'def get_serializer(format: str) -> Serializer:\n'
          + '    """Factory function to create serializers."""\n'
          + '    cls = _serializers.get(format)\n'
          + '    if cls is None:\n'
          + '        raise ValueError(f"Unknown format: {format}")\n'
          + '    return cls()'
        }</code></pre>

        <h3 style={subHeadingStyle}>{isZh ? '观察者与策略模式' : 'Observer & Strategy Patterns'}</h3>
        <p style={paragraphStyle}>{t.patternsP2}</p>
        <pre style={codeBlockStyle}><code>{
          'import weakref\n'
          + 'from typing import Callable\n\n'
          + '# Observer pattern with weakref\n'
          + 'class EventEmitter:\n'
          + '    def __init__(self):\n'
          + '        self._listeners: dict[str, list[weakref.ref]] = {}\n\n'
          + '    def on(self, event: str, callback: Callable) -> None:\n'
          + '        if event not in self._listeners:\n'
          + '            self._listeners[event] = []\n'
          + '        self._listeners[event].append(weakref.ref(callback))\n\n'
          + '    def emit(self, event: str, *args, **kwargs) -> None:\n'
          + '        if event not in self._listeners:\n'
          + '            return\n'
          + '        alive = []\n'
          + '        for ref in self._listeners[event]:\n'
          + '            callback = ref()\n'
          + '            if callback is not None:\n'
          + '                callback(*args, **kwargs)\n'
          + '                alive.append(ref)\n'
          + '        self._listeners[event] = alive  # Prune dead refs\n\n'
          + '# Strategy pattern — functions as strategies\n'
          + 'from typing import Callable\n\n'
          + 'SortStrategy = Callable[[list], list]\n\n'
          + 'def bubble_sort(data: list) -> list:\n'
          + '    arr = data.copy()\n'
          + '    for i in range(len(arr)):\n'
          + '        for j in range(len(arr) - i - 1):\n'
          + '            if arr[j] > arr[j + 1]:\n'
          + '                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n'
          + '    return arr\n\n'
          + 'def quick_sort(data: list) -> list:\n'
          + '    if len(data) <= 1:\n'
          + '        return data\n'
          + '    pivot = data[len(data) // 2]\n'
          + '    left = [x for x in data if x < pivot]\n'
          + '    middle = [x for x in data if x == pivot]\n'
          + '    right = [x for x in data if x > pivot]\n'
          + '    return quick_sort(left) + middle + quick_sort(right)\n\n'
          + 'class DataProcessor:\n'
          + '    def __init__(self, strategy: SortStrategy = sorted):\n'
          + '        self.sort = strategy  # Inject strategy\n\n'
          + '    def process(self, data: list) -> list:\n'
          + '        return self.sort(data)\n\n'
          + 'processor = DataProcessor(strategy=quick_sort)\n'
          + 'print(processor.process([3, 1, 4, 1, 5, 9]))  # [1, 1, 3, 4, 5, 9]'
        }</code></pre>
        <p style={paragraphStyle}>{t.patternsP3}</p>
      </section>

      {/* Conclusion */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>{t.conclusionTitle}</h2>
        <p style={paragraphStyle}>{t.conclusionP1}</p>
        <p style={paragraphStyle}>{t.conclusionP2}</p>
      </section>

      {/* FAQ */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>FAQ</h2>

        {[
          { q: t.faq1Q, a: t.faq1A },
          { q: t.faq2Q, a: t.faq2A },
          { q: t.faq3Q, a: t.faq3A },
          { q: t.faq4Q, a: t.faq4A },
          { q: t.faq5Q, a: t.faq5A },
          { q: t.faq6Q, a: t.faq6A },
          { q: t.faq7Q, a: t.faq7A },
          { q: t.faq8Q, a: t.faq8A },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>
              {faq.q}
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#475569' }}>
              {faq.a}
            </p>
          </div>
        ))}
      </section>
    </article>
  );
}
