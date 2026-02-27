'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'SWC (Speedy Web Compiler): The Rust-Based JavaScript/TypeScript Compiler — Complete Guide 2026',
    intro: 'SWC (Speedy Web Compiler) is a super-fast JavaScript and TypeScript compiler written in Rust. It can compile, minify, bundle, and transform modern JavaScript and TypeScript at speeds 20-70x faster than Babel. Originally created by Donny (kdy1), SWC has become a foundational tool in the modern web ecosystem, powering Next.js, Parcel, Deno, and Vercel. Whether you need a drop-in Babel replacement, a high-performance minifier, or a fast TypeScript transpiler, SWC delivers the speed and correctness required by production build systems.',
    tldr: 'SWC is a Rust-based JavaScript/TypeScript compiler that is 20-70x faster than Babel. It handles JSX/TSX transpilation, TypeScript stripping, decorator transforms, module system conversion (ESM/CJS/UMD/AMD), minification via swc-minify, and bundling via swcpack. Configure it through .swcrc or swc.config.js. SWC powers Next.js (default since v12), integrates with Vite and Webpack via plugins, and provides a plugin system for custom AST transformations in Rust or Wasm. Migrating from Babel is straightforward with near-complete feature parity.',
    keyTakeaway1: 'SWC is written in Rust, leveraging zero-cost abstractions and parallelism to achieve 20-70x faster compilation than Babel.',
    keyTakeaway2: 'It supports JSX, TSX, TypeScript, decorators (legacy and 2024), and all modern ECMAScript features out of the box.',
    keyTakeaway3: 'The .swcrc configuration file provides fine-grained control over parsing, transformations, module output, and minification.',
    keyTakeaway4: 'SWC powers Next.js by default since version 12, replacing Babel for dramatically faster builds and HMR.',
    keyTakeaway5: 'swcpack is the built-in bundler that provides tree-shaking, code splitting, and module resolution similar to Webpack.',
    keyTakeaway6: 'The Wasm-based plugin system lets you write custom AST transformations that run at near-native speed.',

    h2WhyFast: 'Why SWC Is So Fast',
    whyFastDesc: 'SWC achieves extraordinary compilation speed through several architectural advantages inherent to Rust and its internal design.',
    whyFast1: 'Written in Rust: Rust compiles to native machine code with zero-cost abstractions, no garbage collector, and deterministic memory management. This eliminates the runtime overhead that V8 introduces for JavaScript-based compilers like Babel.',
    whyFast2: 'Parallel processing: SWC processes multiple files concurrently using Rust threads. Each file is parsed, transformed, and emitted independently, saturating all CPU cores during compilation.',
    whyFast3: 'Single-pass transforms: SWC applies multiple transformations in a single AST traversal whenever possible, avoiding the repeated parse-transform-serialize cycles that Babel plugin chains require.',
    whyFast4: 'Efficient memory layout: Rust structs and enums use compact, stack-allocated memory layouts. The AST representation is cache-friendly, reducing memory access latency compared to JavaScript object graphs.',

    h2Install: 'Installation',
    installDesc: 'SWC provides multiple packages depending on your use case. The core CLI package handles standalone compilation, while integration packages connect SWC to your existing build tools.',

    h2Swcrc: '.swcrc Configuration',
    swcrcDesc: 'The .swcrc file is the primary configuration mechanism for SWC. It controls parsing behavior, transformation rules, module output format, minification settings, and environment targets. Place it in your project root alongside package.json.',
    swcrcBasic: 'A basic .swcrc for a React TypeScript project:',
    swcrcAdvanced: 'An advanced .swcrc with decorators, module aliases, and environment targets:',

    h2Parsing: 'Parsing and Syntax Support',
    parsingDesc: 'SWC includes a full-featured JavaScript and TypeScript parser that supports all ECMAScript 2024 features, JSX, TSX, decorators (both legacy and TC39 stage 3), dynamic imports, top-level await, import assertions, and optional chaining. The parser is configurable through the jsc.parser section of .swcrc.',
    parsingSyntax: 'Parser configuration for different syntax modes:',

    h2Transforms: 'Transformations',
    transformsDesc: 'SWC applies code transformations based on target environment and configuration. Transformations include JSX compilation, TypeScript stripping, decorator lowering, class properties, optional chaining, nullish coalescing, and many other ECMAScript proposals.',
    h3JSX: 'JSX and TSX Transformation',
    jsxDesc: 'SWC converts JSX syntax into function calls. It supports both the classic React.createElement runtime and the modern automatic JSX runtime introduced in React 17. The automatic runtime does not require importing React in every file.',
    h3Decorators: 'Decorator Support',
    decoratorsDesc: 'SWC supports both the legacy decorator specification (used by TypeScript experimentalDecorators) and the TC39 2024 decorator specification. The legacy mode is compatible with Angular, NestJS, MobX, and TypeORM. The 2024 spec is the standards-track version.',
    h3ClassProps: 'Class Properties and Private Fields',
    classPropsDesc: 'SWC transforms class fields, static properties, and private fields (using # syntax) into compatible output for older environments. With useDefineForClassFields enabled, class fields use Object.defineProperty semantics matching the TC39 specification.',

    h2Modules: 'Module Systems',
    modulesDesc: 'SWC can output code in four different module formats: ES Modules (ESM), CommonJS (CJS), UMD, and AMD. The module configuration determines how import/export statements are transformed in the output.',
    modulesESM: 'ES Modules (es6): Preserves import/export syntax. Use for modern bundlers, browsers with module support, and Node.js with type: "module".',
    modulesCJS: 'CommonJS (commonjs): Transforms to require/module.exports. Use for Node.js packages, Jest tests, and environments that do not support ESM.',
    modulesUMD: 'UMD (umd): Universal Module Definition that works in both browser globals and CommonJS. Use for library packages that must support multiple consumption patterns.',
    modulesAMD: 'AMD (amd): Asynchronous Module Definition for RequireJS and similar AMD loaders. Rarely needed in modern projects.',

    h2Minification: 'Minification with SWC',
    minificationDesc: 'SWC includes a built-in minifier (swc-minify) that is a Rust port of Terser. It performs dead code elimination, constant folding, identifier mangling, whitespace removal, and advanced optimizations like inlining and branch simplification. The minifier works for both JavaScript and supports source map generation.',
    minifyConfig: 'Minification configuration options:',
    minifyComparison: 'Benchmark comparison of minifiers:',

    h2Bundling: 'Bundling with swcpack',
    bundlingDesc: 'swcpack is the built-in bundler for SWC that handles module resolution, tree-shaking, code splitting, and output generation. While still marked as experimental, it demonstrates the direction SWC is heading as a complete build tool. Configure swcpack through spack.config.js in your project root.',
    bundlingConfig: 'Basic swcpack configuration:',

    h2NextJS: 'Integration with Next.js',
    nextjsDesc: 'Next.js has used SWC as its default compiler since version 12, replacing Babel entirely for most projects. This switch reduced Fast Refresh (HMR) speed by 3x and build times by up to 5x. Next.js automatically configures SWC through next.config.js, so you do not need a separate .swcrc file.',
    nextjsConfig: 'SWC configuration within next.config.js:',
    nextjsFeatures: 'Next.js SWC features include: styled-components and emotion support, automatic React runtime, import path optimization via modularizeImports, server-side dead code removal via removeConsole, TypeScript path aliases, and experimental server actions compilation.',

    h2Vite: 'Integration with Vite',
    viteDesc: 'Vite can use SWC as its JavaScript/TypeScript transformer through the @vitejs/plugin-react-swc plugin. This replaces the default esbuild-based JSX transformation with SWC, providing better Babel compatibility (decorators, legacy class properties) while maintaining similar speed.',
    viteConfig: 'Vite configuration with SWC:',

    h2Webpack: 'Integration with Webpack',
    webpackDesc: 'The swc-loader package provides a drop-in replacement for babel-loader in Webpack projects. It uses SWC for JavaScript and TypeScript compilation while keeping Webpack as the bundler. This is the fastest migration path for existing Webpack projects.',
    webpackConfig: 'Webpack configuration with swc-loader:',

    h2Plugins: 'Plugin System',
    pluginsDesc: 'SWC provides a Wasm-based plugin system that allows custom AST transformations. Plugins are written in Rust, compiled to WebAssembly, and loaded at runtime. This enables custom syntax transforms, code instrumentation, and compile-time code generation while maintaining near-native performance.',
    pluginsCreate: 'Creating a basic SWC plugin:',
    pluginsUse: 'Using plugins in .swcrc:',

    h2Migration: 'Migrating from Babel to SWC',
    migrationDesc: 'Migrating from Babel to SWC is straightforward for most projects because SWC supports the majority of common Babel presets and plugins. The main steps are replacing babel-loader or @babel/cli with SWC equivalents and translating your Babel configuration to .swcrc format.',
    migrationSteps: 'Step-by-step migration process:',
    migrationMapping: 'Common Babel preset and plugin mappings to SWC configuration:',

    h2BestPractices: 'Best Practices',
    bp1: 'Use SWC through your framework integration (Next.js, Vite, Parcel) when possible. Framework-level integration handles configuration automatically and ensures compatibility.',
    bp2: 'Run tsc --noEmit separately for type checking. SWC strips TypeScript types but does not validate them, just like esbuild.',
    bp3: 'Set the jsc.target option to match your minimum browser or Node.js support. This prevents unnecessary transformations for already-supported syntax.',
    bp4: 'Enable the minifier with compress and mangle for production builds. SWC minification is comparable to Terser in output quality but significantly faster.',
    bp5: 'Use ES module output format whenever possible. ESM enables better tree-shaking, static analysis, and compatibility with modern tools.',
    bp6: 'For monorepos, share a base .swcrc configuration using the extends field to maintain consistency across packages.',
    bp7: 'When migrating from Babel, test your output carefully. Some edge cases in decorator behavior or loose mode transforms may differ between Babel and SWC.',
    bp8: 'Use the SWC playground (swc.rs/playground) to test configuration changes and see the transformation output before updating your build pipeline.',

    h2Comparison: 'SWC vs Babel vs esbuild vs TypeScript Compiler',
    comparisonDesc: 'Understanding how SWC compares to other compilers helps you choose the right tool for your project.',
    compCol1: 'Feature',
    compCol2: 'SWC',
    compCol3: 'Babel',
    compCol4: 'esbuild',
    compCol5: 'tsc',
    compRow1: 'Language', compRow1V2: 'Rust', compRow1V3: 'JavaScript', compRow1V4: 'Go', compRow1V5: 'TypeScript',
    compRow2: 'Speed (10K files)', compRow2V2: '~1.2s', compRow2V3: '~45s', compRow2V4: '~0.8s', compRow2V5: '~60s',
    compRow3: 'Type checking', compRow3V2: 'No', compRow3V3: 'No', compRow3V4: 'No', compRow3V5: 'Yes',
    compRow4: 'Decorators (legacy)', compRow4V2: 'Yes', compRow4V3: 'Yes', compRow4V4: 'No', compRow4V5: 'Yes',
    compRow5: 'Plugin system', compRow5V2: 'Wasm plugins', compRow5V3: 'JS plugins (huge ecosystem)', compRow5V4: 'Go plugins (small)', compRow5V5: 'Compiler API',
    compRow6: 'Bundling', compRow6V2: 'swcpack (experimental)', compRow6V3: 'No', compRow6V4: 'Yes (built-in)', compRow6V5: 'No',
    compRow7: 'Minification', compRow7V2: 'Built-in (Terser-like)', compRow7V3: 'Via babel-minify', compRow7V4: 'Built-in', compRow7V5: 'No',
    compRow8: 'Framework adoption', compRow8V2: 'Next.js, Parcel, Deno', compRow8V3: 'Most (legacy)', compRow8V4: 'Vite (dev), tsup', compRow8V5: 'N/A (reference)',
    comparisonSummary: 'SWC excels at fast compilation with high Babel compatibility, making it ideal for large projects migrating from Babel and for framework integration (Next.js). esbuild is fastest for pure bundling and simple transpilation. Babel remains necessary for projects requiring niche plugins not yet supported by SWC. tsc is the only option when you need type checking during compilation.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Why is SWC faster than Babel?',
    faq1A: 'SWC is written in Rust, which compiles to native machine code with zero-cost abstractions and no garbage collector overhead. Babel runs in Node.js with JavaScript, which requires V8 JIT compilation, garbage collection pauses, and is single-threaded by default. SWC also applies multiple transformations in fewer AST passes, reducing redundant parsing and serialization.',
    faq2Q: 'Does SWC support TypeScript type checking?',
    faq2A: 'No. SWC strips TypeScript type annotations during compilation but does not perform type checking. This is a deliberate design choice for speed. You should run tsc --noEmit separately in your CI pipeline or development workflow to catch type errors.',
    faq3Q: 'Can SWC fully replace Babel?',
    faq3A: 'For most projects, yes. SWC supports JSX, TypeScript, decorators (legacy and 2024), class properties, optional chaining, nullish coalescing, and most common Babel presets. However, some niche Babel plugins (like macros or custom syntax extensions) may not have SWC equivalents yet. Check the SWC documentation for current compatibility.',
    faq4Q: 'How does SWC work with Next.js?',
    faq4A: 'Next.js has used SWC as its default compiler since version 12. Next.js automatically configures SWC based on your next.config.js settings. You do not need a separate .swcrc file. Next.js SWC integration includes styled-components support, import optimization, console removal, React automatic runtime, and experimental features like server actions.',
    faq5Q: 'What is swcpack and is it production-ready?',
    faq5A: 'swcpack is the built-in bundler for SWC that handles module resolution, tree-shaking, and code splitting. As of 2026, it is still marked as experimental. For production bundling, most teams use SWC as a compiler within Webpack (via swc-loader), Vite (via plugin-react-swc), or Next.js rather than using swcpack directly.',
    faq6Q: 'How do I write an SWC plugin?',
    faq6A: 'SWC plugins are written in Rust and compiled to WebAssembly. You create a Rust library that implements the visit_mut trait for AST transformation, compile it with swc_plugin_runner, and reference the .wasm file in your .swcrc configuration. The plugin API provides access to the full AST for custom transformations.',
    faq7Q: 'Is SWC compatible with existing Babel configuration?',
    faq7A: 'SWC does not read .babelrc files directly. You need to translate your Babel configuration to .swcrc format. Common mappings include: @babel/preset-env maps to jsc.target, @babel/preset-react maps to jsc.transform.react, @babel/preset-typescript maps to jsc.parser.syntax: "typescript", and @babel/plugin-proposal-decorators maps to jsc.parser.decorators: true.',
    faq8Q: 'Which should I choose: SWC or esbuild?',
    faq8A: 'Choose SWC if you need high Babel compatibility (decorators, legacy class properties, specific transform behaviors), are using Next.js, or need the Wasm plugin system for custom transforms. Choose esbuild if you need the absolute fastest bundling speed, a simpler configuration model, or are building a library with straightforward requirements. Both are excellent choices for modern JavaScript toolchains.',
  },
  zh: {
    title: 'SWC（Speedy Web Compiler）：基于 Rust 的 JavaScript/TypeScript 编译器 — 完整指南 2026',
    intro: 'SWC（Speedy Web Compiler）是一个用 Rust 编写的超快 JavaScript 和 TypeScript 编译器。它以比 Babel 快 20-70 倍的速度进行编译、压缩、打包和转换现代 JavaScript 和 TypeScript。SWC 由 Donny (kdy1) 创建，已成为现代 Web 生态系统中的基础工具，驱动着 Next.js、Parcel、Deno 和 Vercel。无论你需要 Babel 的替代品、高性能压缩器还是快速的 TypeScript 转译器，SWC 都能提供生产构建系统所需的速度和正确性。',
    tldr: 'SWC 是基于 Rust 的 JavaScript/TypeScript 编译器，速度比 Babel 快 20-70 倍。它处理 JSX/TSX 转译、TypeScript 剥离、装饰器转换、模块系统转换（ESM/CJS/UMD/AMD）、通过 swc-minify 的压缩以及通过 swcpack 的打包。通过 .swcrc 或 swc.config.js 配置。SWC 从 v12 起驱动 Next.js，通过插件与 Vite 和 Webpack 集成，并提供 Rust 或 Wasm 自定义 AST 转换的插件系统。从 Babel 迁移非常简单，功能几乎完全对等。',
    keyTakeaway1: 'SWC 用 Rust 编写，利用零成本抽象和并行性实现比 Babel 快 20-70 倍的编译速度。',
    keyTakeaway2: '开箱即用支持 JSX、TSX、TypeScript、装饰器（遗留和 2024）和所有现代 ECMAScript 特性。',
    keyTakeaway3: '.swcrc 配置文件对解析、转换、模块输出和压缩提供细粒度控制。',
    keyTakeaway4: '从 v12 起 SWC 作为 Next.js 的默认编译器，替代 Babel 实现更快的构建和 HMR。',
    keyTakeaway5: 'swcpack 是内置打包器，提供类似 Webpack 的 Tree-shaking、代码分割和模块解析。',
    keyTakeaway6: '基于 Wasm 的插件系统让你编写以接近原生速度运行的自定义 AST 转换。',

    h2WhyFast: '为什么 SWC 如此快速',
    whyFastDesc: 'SWC 通过 Rust 固有的架构优势和其内部设计实现了非凡的编译速度。',
    whyFast1: '用 Rust 编写：Rust 编译为原生机器码，具有零成本抽象、无垃圾回收器和确定性内存管理。这消除了 V8 为 Babel 等基于 JavaScript 的编译器引入的运行时开销。',
    whyFast2: '并行处理：SWC 使用 Rust 线程并发处理多个文件。每个文件独立解析、转换和输出，充分利用所有 CPU 核心。',
    whyFast3: '单遍转换：SWC 尽可能在单次 AST 遍历中应用多个转换，避免 Babel 插件链所需的重复解析-转换-序列化周期。',
    whyFast4: '高效内存布局：Rust 的结构体和枚举使用紧凑的栈分配内存布局。AST 表示对缓存友好，减少了与 JavaScript 对象图相比的内存访问延迟。',

    h2Install: '安装',
    installDesc: 'SWC 根据使用场景提供多个包。核心 CLI 包处理独立编译，集成包将 SWC 连接到现有构建工具。',

    h2Swcrc: '.swcrc 配置',
    swcrcDesc: '.swcrc 文件是 SWC 的主要配置机制。它控制解析行为、转换规则、模块输出格式、压缩设置和环境目标。将其放在项目根目录下与 package.json 并列。',
    swcrcBasic: '用于 React TypeScript 项目的基本 .swcrc：',
    swcrcAdvanced: '带有装饰器、模块别名和环境目标的高级 .swcrc：',

    h2Parsing: '解析和语法支持',
    parsingDesc: 'SWC 包含一个功能完整的 JavaScript 和 TypeScript 解析器，支持所有 ECMAScript 2024 特性、JSX、TSX、装饰器（遗留和 TC39 第 3 阶段）、动态导入、顶级 await、导入断言和可选链。解析器通过 .swcrc 的 jsc.parser 部分进行配置。',
    parsingSyntax: '不同语法模式的解析器配置：',

    h2Transforms: '转换',
    transformsDesc: 'SWC 根据目标环境和配置应用代码转换。转换包括 JSX 编译、TypeScript 剥离、装饰器降级、类属性、可选链、空值合并等。',
    h3JSX: 'JSX 和 TSX 转换',
    jsxDesc: 'SWC 将 JSX 语法转换为函数调用。它支持经典的 React.createElement 运行时和 React 17 引入的现代自动 JSX 运行时。自动运行时不需要在每个文件中导入 React。',
    h3Decorators: '装饰器支持',
    decoratorsDesc: 'SWC 支持遗留装饰器规范（TypeScript experimentalDecorators）和 TC39 2024 装饰器规范。遗留模式兼容 Angular、NestJS、MobX 和 TypeORM。2024 规范是标准轨道版本。',
    h3ClassProps: '类属性和私有字段',
    classPropsDesc: 'SWC 将类字段、静态属性和私有字段（使用 # 语法）转换为兼容旧环境的输出。启用 useDefineForClassFields 后，类字段使用符合 TC39 规范的 Object.defineProperty 语义。',

    h2Modules: '模块系统',
    modulesDesc: 'SWC 可以以四种不同的模块格式输出代码：ES 模块（ESM）、CommonJS（CJS）、UMD 和 AMD。模块配置决定输出中 import/export 语句的转换方式。',
    modulesESM: 'ES 模块 (es6)：保留 import/export 语法。用于现代打包器、支持模块的浏览器和 Node.js type: "module"。',
    modulesCJS: 'CommonJS (commonjs)：转换为 require/module.exports。用于 Node.js 包、Jest 测试和不支持 ESM 的环境。',
    modulesUMD: 'UMD (umd)：通用模块定义，可在浏览器全局和 CommonJS 中使用。用于需要支持多种使用模式的库包。',
    modulesAMD: 'AMD (amd)：用于 RequireJS 和类似 AMD 加载器的异步模块定义。在现代项目中很少需要。',

    h2Minification: '使用 SWC 进行压缩',
    minificationDesc: 'SWC 包含内置压缩器（swc-minify），它是 Terser 的 Rust 移植版本。它执行死代码消除、常量折叠、标识符混淆、空白移除以及内联和分支简化等高级优化。压缩器适用于 JavaScript 并支持 Source Map 生成。',
    minifyConfig: '压缩配置选项：',
    minifyComparison: '压缩器基准比较：',

    h2Bundling: '使用 swcpack 打包',
    bundlingDesc: 'swcpack 是 SWC 的内置打包器，处理模块解析、Tree-shaking、代码分割和输出生成。虽然仍标记为实验性，但它展示了 SWC 作为完整构建工具的发展方向。通过项目根目录的 spack.config.js 配置。',
    bundlingConfig: '基本 swcpack 配置：',

    h2NextJS: '与 Next.js 集成',
    nextjsDesc: 'Next.js 从 v12 起使用 SWC 作为默认编译器，完全替代了大多数项目中的 Babel。这一切换使 Fast Refresh（HMR）速度提升 3 倍，构建时间提升多达 5 倍。Next.js 通过 next.config.js 自动配置 SWC，无需单独的 .swcrc 文件。',
    nextjsConfig: 'next.config.js 中的 SWC 配置：',
    nextjsFeatures: 'Next.js SWC 功能包括：styled-components 和 emotion 支持、自动 React 运行时、通过 modularizeImports 的导入路径优化、通过 removeConsole 的服务端死代码移除、TypeScript 路径别名和实验性 server actions 编译。',

    h2Vite: '与 Vite 集成',
    viteDesc: 'Vite 可以通过 @vitejs/plugin-react-swc 插件使用 SWC 作为 JavaScript/TypeScript 转换器。这将默认的基于 esbuild 的 JSX 转换替换为 SWC，在保持类似速度的同时提供更好的 Babel 兼容性（装饰器、遗留类属性）。',
    viteConfig: '使用 SWC 的 Vite 配置：',

    h2Webpack: '与 Webpack 集成',
    webpackDesc: 'swc-loader 包为 Webpack 项目提供 babel-loader 的直接替代品。它使用 SWC 进行 JavaScript 和 TypeScript 编译，同时保留 Webpack 作为打包器。这是现有 Webpack 项目最快的迁移路径。',
    webpackConfig: '使用 swc-loader 的 Webpack 配置：',

    h2Plugins: '插件系统',
    pluginsDesc: 'SWC 提供基于 Wasm 的插件系统，允许自定义 AST 转换。插件用 Rust 编写，编译为 WebAssembly，在运行时加载。这使得自定义语法转换、代码检测和编译时代码生成成为可能，同时保持接近原生的性能。',
    pluginsCreate: '创建基本的 SWC 插件：',
    pluginsUse: '在 .swcrc 中使用插件：',

    h2Migration: '从 Babel 迁移到 SWC',
    migrationDesc: '对于大多数项目，从 Babel 迁移到 SWC 非常简单，因为 SWC 支持大多数常用的 Babel 预设和插件。主要步骤是将 babel-loader 或 @babel/cli 替换为 SWC 等效项，并将 Babel 配置转换为 .swcrc 格式。',
    migrationSteps: '逐步迁移过程：',
    migrationMapping: '常见 Babel 预设和插件到 SWC 配置的映射：',

    h2BestPractices: '最佳实践',
    bp1: '尽可能通过框架集成（Next.js、Vite、Parcel）使用 SWC。框架级集成自动处理配置并确保兼容性。',
    bp2: '单独运行 tsc --noEmit 进行类型检查。SWC 剥离 TypeScript 类型但不验证它们。',
    bp3: '设置 jsc.target 选项以匹配最低浏览器或 Node.js 支持。这避免了对已支持语法的不必要转换。',
    bp4: '为生产构建启用带有 compress 和 mangle 的压缩器。SWC 压缩在输出质量上与 Terser 相当但显著更快。',
    bp5: '尽可能使用 ES 模块输出格式。ESM 实现更好的 Tree-shaking、静态分析和与现代工具的兼容性。',
    bp6: '对于 monorepo，使用 extends 字段共享基础 .swcrc 配置以保持包间一致性。',
    bp7: '从 Babel 迁移时仔细测试输出。装饰器行为或松散模式转换中的某些边缘情况在 Babel 和 SWC 之间可能不同。',
    bp8: '使用 SWC playground (swc.rs/playground) 在更新构建管道之前测试配置更改并查看转换输出。',

    h2Comparison: 'SWC vs Babel vs esbuild vs TypeScript 编译器',
    comparisonDesc: '了解 SWC 与其他编译器的比较有助于为项目选择正确的工具。',
    compCol1: '特性', compCol2: 'SWC', compCol3: 'Babel', compCol4: 'esbuild', compCol5: 'tsc',
    compRow1: '编写语言', compRow1V2: 'Rust', compRow1V3: 'JavaScript', compRow1V4: 'Go', compRow1V5: 'TypeScript',
    compRow2: '速度（10K 文件）', compRow2V2: '~1.2秒', compRow2V3: '~45秒', compRow2V4: '~0.8秒', compRow2V5: '~60秒',
    compRow3: '类型检查', compRow3V2: '否', compRow3V3: '否', compRow3V4: '否', compRow3V5: '是',
    compRow4: '装饰器（遗留）', compRow4V2: '是', compRow4V3: '是', compRow4V4: '否', compRow4V5: '是',
    compRow5: '插件系统', compRow5V2: 'Wasm 插件', compRow5V3: 'JS 插件（庞大生态）', compRow5V4: 'Go 插件（小型）', compRow5V5: '编译器 API',
    compRow6: '打包', compRow6V2: 'swcpack（实验性）', compRow6V3: '否', compRow6V4: '是（内置）', compRow6V5: '否',
    compRow7: '压缩', compRow7V2: '内置（类 Terser）', compRow7V3: '通过 babel-minify', compRow7V4: '内置', compRow7V5: '否',
    compRow8: '框架采用', compRow8V2: 'Next.js、Parcel、Deno', compRow8V3: '大多数（遗留）', compRow8V4: 'Vite（开发）、tsup', compRow8V5: '不适用（参考）',
    comparisonSummary: 'SWC 擅长具有高 Babel 兼容性的快速编译，非常适合从 Babel 迁移的大型项目和框架集成（Next.js）。esbuild 在纯打包和简单转译方面最快。Babel 对于需要 SWC 尚不支持的小众插件的项目仍然必要。tsc 是编译期间需要类型检查时的唯一选项。',

    h2Faq: '常见问题',
    faq1Q: '为什么 SWC 比 Babel 快？',
    faq1A: 'SWC 用 Rust 编写，编译为原生机器码，具有零成本抽象和无垃圾回收器开销。Babel 在 Node.js 中运行 JavaScript，需要 V8 JIT 编译、垃圾回收暂停，默认是单线程的。SWC 还在更少的 AST 遍历中应用多个转换，减少冗余的解析和序列化。',
    faq2Q: 'SWC 支持 TypeScript 类型检查吗？',
    faq2A: '不支持。SWC 在编译期间剥离 TypeScript 类型注解但不执行类型检查。这是为了速度的刻意设计选择。你应该在 CI 管道或开发工作流中单独运行 tsc --noEmit 来捕获类型错误。',
    faq3Q: 'SWC 能完全替代 Babel 吗？',
    faq3A: '对于大多数项目可以。SWC 支持 JSX、TypeScript、装饰器、类属性、可选链、空值合并和大多数常用 Babel 预设。但是某些小众 Babel 插件可能还没有 SWC 等效项。',
    faq4Q: 'SWC 如何与 Next.js 配合？',
    faq4A: 'Next.js 从 v12 起使用 SWC 作为默认编译器。Next.js 根据 next.config.js 设置自动配置 SWC。不需要单独的 .swcrc 文件。集成包括 styled-components 支持、导入优化、console 移除等。',
    faq5Q: 'swcpack 是什么，它适合生产环境吗？',
    faq5A: 'swcpack 是 SWC 的内置打包器，处理模块解析、Tree-shaking 和代码分割。截至 2026 年，它仍标记为实验性。生产打包中大多数团队在 Webpack、Vite 或 Next.js 内使用 SWC 作为编译器。',
    faq6Q: '如何编写 SWC 插件？',
    faq6A: 'SWC 插件用 Rust 编写并编译为 WebAssembly。你创建一个实现 visit_mut trait 进行 AST 转换的 Rust 库，用 swc_plugin_runner 编译，在 .swcrc 配置中引用 .wasm 文件。',
    faq7Q: 'SWC 兼容现有的 Babel 配置吗？',
    faq7A: 'SWC 不直接读取 .babelrc 文件。你需要将 Babel 配置转换为 .swcrc 格式。常见映射包括：@babel/preset-env 映射到 jsc.target，@babel/preset-react 映射到 jsc.transform.react 等。',
    faq8Q: '应该选择 SWC 还是 esbuild？',
    faq8A: '如果需要高 Babel 兼容性、使用 Next.js 或需要 Wasm 插件系统，选择 SWC。如果需要最快的打包速度、更简单的配置或构建简单需求的库，选择 esbuild。两者都是现代 JavaScript 工具链的优秀选择。',
  },
};

export default function SwcGuide({ lang }: { lang: string }) {
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
  const para: React.CSSProperties = { marginBottom: '1rem', lineHeight: '1.7' };
  const codeBlock: React.CSSProperties = { backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#e5e7eb' };
  const listItem: React.CSSProperties = { marginBottom: '0.5rem', lineHeight: '1.6' };
  const cellStyle: React.CSSProperties = { padding: '0.75rem', borderBottom: '1px solid #e2e8f0', textAlign: 'left' };
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, background: '#f1f5f9' };

  return (
    <article style={{ maxWidth: 'none' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '2rem' }}>{t.intro}</p>

      {/* TL;DR */}
      <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1rem 1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1.1rem' }}>TL;DR</strong>
        <p style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>{t.tldr}</p>
      </div>

      {/* Key Takeaways */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <strong style={{ fontSize: '1.1rem' }}>Key Takeaways</strong>
        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>{t.keyTakeaway1}</li>
          <li style={listItem}>{t.keyTakeaway2}</li>
          <li style={listItem}>{t.keyTakeaway3}</li>
          <li style={listItem}>{t.keyTakeaway4}</li>
          <li style={listItem}>{t.keyTakeaway5}</li>
          <li style={listItem}>{t.keyTakeaway6}</li>
        </ul>
      </div>

      {/* Why SWC Is So Fast */}
      <h2 style={sectionTitle}>{t.h2WhyFast}</h2>
      <p style={para}>{t.whyFastDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>{t.whyFast1.split(':')[0]}:</strong>{t.whyFast1.substring(t.whyFast1.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast2.split(':')[0]}:</strong>{t.whyFast2.substring(t.whyFast2.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast3.split(':')[0]}:</strong>{t.whyFast3.substring(t.whyFast3.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast4.split(':')[0]}:</strong>{t.whyFast4.substring(t.whyFast4.indexOf(':') + 1)}</li>
      </ul>
      <pre style={codeBlock}><code>{'# Benchmark: Compile 10,000 TypeScript files\n'
        + '#\n'
        + '# SWC            1.2s    (Rust, parallel)\n'
        + '# esbuild        0.8s    (Go, parallel)\n'
        + '# Babel          45.0s   (JS, single-threaded)\n'
        + '# tsc            60.0s   (TS, single-threaded)\n'
        + '#\n'
        + '# SWC is 37-50x faster than Babel/tsc\n'
        + '# for equivalent compilation tasks'}</code></pre>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Install}</h2>
      <p style={para}>{t.installDesc}</p>
      <pre style={codeBlock}><code>{'# Core SWC CLI\n'
        + 'npm install --save-dev @swc/cli @swc/core\n'
        + '\n'
        + '# Compile a single file\n'
        + 'npx swc src/index.ts -o dist/index.js\n'
        + '\n'
        + '# Compile a directory\n'
        + 'npx swc src -d dist\n'
        + '\n'
        + '# Watch mode\n'
        + 'npx swc src -d dist --watch\n'
        + '\n'
        + '# Integration packages\n'
        + 'npm install --save-dev swc-loader            # Webpack\n'
        + 'npm install --save-dev @vitejs/plugin-react-swc  # Vite\n'
        + 'npm install --save-dev @swc/jest              # Jest\n'
        + '\n'
        + '# Verify installation\n'
        + 'npx swc --version\n'
        + '# @swc/cli: 0.4.x\n'
        + '# @swc/core: 1.7.x'}</code></pre>

      {/* .swcrc Configuration */}
      <h2 style={sectionTitle}>{t.h2Swcrc}</h2>
      <p style={para}>{t.swcrcDesc}</p>
      <h3 style={subTitle}>{t.swcrcBasic}</h3>
      <pre style={codeBlock}><code>{'// .swcrc — Basic React + TypeScript configuration\n'
        + '{\n'
        + '  "jsc": {\n'
        + '    "parser": {\n'
        + '      "syntax": "typescript",\n'
        + '      "tsx": true,\n'
        + '      "decorators": false,\n'
        + '      "dynamicImport": true\n'
        + '    },\n'
        + '    "transform": {\n'
        + '      "react": {\n'
        + '        "runtime": "automatic",\n'
        + '        "throwIfNamespace": true,\n'
        + '        "useBuiltins": true\n'
        + '      }\n'
        + '    },\n'
        + '    "target": "es2020",\n'
        + '    "loose": false,\n'
        + '    "externalHelpers": false\n'
        + '  },\n'
        + '  "module": {\n'
        + '    "type": "es6"\n'
        + '  },\n'
        + '  "minify": false,\n'
        + '  "sourceMaps": true\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.swcrcAdvanced}</h3>
      <pre style={codeBlock}><code>{'// .swcrc — Advanced configuration with decorators and aliases\n'
        + '{\n'
        + '  "jsc": {\n'
        + '    "parser": {\n'
        + '      "syntax": "typescript",\n'
        + '      "tsx": true,\n'
        + '      "decorators": true,\n'
        + '      "dynamicImport": true,\n'
        + '      "importAssertions": true\n'
        + '    },\n'
        + '    "transform": {\n'
        + '      "legacyDecorator": true,\n'
        + '      "decoratorMetadata": true,\n'
        + '      "react": {\n'
        + '        "runtime": "automatic",\n'
        + '        "importSource": "@emotion/react"\n'
        + '      }\n'
        + '    },\n'
        + '    "target": "es2021",\n'
        + '    "baseUrl": ".",\n'
        + '    "paths": {\n'
        + '      "@/*": ["./src/*"],\n'
        + '      "@components/*": ["./src/components/*"],\n'
        + '      "@utils/*": ["./src/utils/*"]\n'
        + '    },\n'
        + '    "externalHelpers": true\n'
        + '  },\n'
        + '  "module": {\n'
        + '    "type": "commonjs",\n'
        + '    "strict": true,\n'
        + '    "lazy": true\n'
        + '  },\n'
        + '  "env": {\n'
        + '    "targets": {\n'
        + '      "chrome": "90",\n'
        + '      "firefox": "88",\n'
        + '      "safari": "14",\n'
        + '      "node": "18"\n'
        + '    },\n'
        + '    "mode": "usage",\n'
        + '    "coreJs": "3.36"\n'
        + '  },\n'
        + '  "sourceMaps": true\n'
        + '}'}</code></pre>

      {/* Parsing */}
      <h2 style={sectionTitle}>{t.h2Parsing}</h2>
      <p style={para}>{t.parsingDesc}</p>
      <h3 style={subTitle}>{t.parsingSyntax}</h3>
      <pre style={codeBlock}><code>{'// TypeScript parser with all features enabled\n'
        + '"parser": {\n'
        + '  "syntax": "typescript",\n'
        + '  "tsx": true,\n'
        + '  "decorators": true,\n'
        + '  "dynamicImport": true,\n'
        + '  "importAssertions": true\n'
        + '}\n'
        + '\n'
        + '// JavaScript parser (ECMAScript)\n'
        + '"parser": {\n'
        + '  "syntax": "ecmascript",\n'
        + '  "jsx": true,\n'
        + '  "decorators": true,\n'
        + '  "decoratorsBeforeExport": true,\n'
        + '  "dynamicImport": true,\n'
        + '  "importAssertions": true,\n'
        + '  "topLevelAwait": true,\n'
        + '  "exportDefaultFrom": true\n'
        + '}'}</code></pre>

      {/* Transformations */}
      <h2 style={sectionTitle}>{t.h2Transforms}</h2>
      <p style={para}>{t.transformsDesc}</p>

      <h3 style={subTitle}>{t.h3JSX}</h3>
      <p style={para}>{t.jsxDesc}</p>
      <pre style={codeBlock}><code>{'// Input: JSX component\n'
        + 'function App() {\n'
        + '  return (\n'
        + '    <div style={{ padding: 16 }}>\n'
        + '      <h1>Hello SWC</h1>\n'
        + '      <Button onClick={handleClick}>Click me</Button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// Output with runtime: "automatic" (React 17+)\n'
        + '// SWC auto-inserts the jsx import\n'
        + 'import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";\n'
        + '\n'
        + 'function App() {\n'
        + '  return _jsxs("div", {\n'
        + '    style: { padding: 16 },\n'
        + '    children: [\n'
        + '      _jsx("h1", { children: "Hello SWC" }),\n'
        + '      _jsx(Button, { onClick: handleClick, children: "Click me" })\n'
        + '    ]\n'
        + '  });\n'
        + '}\n'
        + '\n'
        + '// Output with runtime: "classic"\n'
        + 'function App() {\n'
        + '  return React.createElement("div", { style: { padding: 16 } },\n'
        + '    React.createElement("h1", null, "Hello SWC"),\n'
        + '    React.createElement(Button, { onClick: handleClick }, "Click me")\n'
        + '  );\n'
        + '}'}</code></pre>

      <h3 style={subTitle}>{t.h3Decorators}</h3>
      <p style={para}>{t.decoratorsDesc}</p>
      <pre style={codeBlock}><code>{'// Input: TypeScript class with legacy decorators\n'
        + '// Requires: "decorators": true, "legacyDecorator": true\n'
        + 'import { Injectable, Controller, Get } from "@nestjs/common";\n'
        + '\n'
        + '@Injectable()\n'
        + 'class UserService {\n'
        + '  findAll() {\n'
        + '    return [{ id: 1, name: "Alice" }];\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '@Controller("/users")\n'
        + 'class UserController {\n'
        + '  constructor(private userService: UserService) {}\n'
        + '\n'
        + '  @Get()\n'
        + '  getUsers() {\n'
        + '    return this.userService.findAll();\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// SWC compiles decorators to __decorate() calls\n'
        + '// compatible with TypeScript emitDecoratorMetadata'}</code></pre>

      <h3 style={subTitle}>{t.h3ClassProps}</h3>
      <p style={para}>{t.classPropsDesc}</p>
      <pre style={codeBlock}><code>{'// Input: Modern class with all field types\n'
        + 'class Config {\n'
        + '  // Public field with initializer\n'
        + '  apiUrl = "https://api.example.com";\n'
        + '\n'
        + '  // Private field (# syntax)\n'
        + '  #secretKey = "abc123";\n'
        + '\n'
        + '  // Static field\n'
        + '  static version = "2.0.0";\n'
        + '\n'
        + '  // Static private field\n'
        + '  static #instances = 0;\n'
        + '\n'
        + '  constructor() {\n'
        + '    Config.#instances++;\n'
        + '  }\n'
        + '\n'
        + '  getSecret() {\n'
        + '    return this.#secretKey;\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// SWC transforms private fields to WeakMap\n'
        + '// when targeting older environments'}</code></pre>

      {/* Module Systems */}
      <h2 style={sectionTitle}>{t.h2Modules}</h2>
      <p style={para}>{t.modulesDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>ESM:</strong> {t.modulesESM}</li>
        <li style={listItem}><strong>CommonJS:</strong> {t.modulesCJS}</li>
        <li style={listItem}><strong>UMD:</strong> {t.modulesUMD}</li>
        <li style={listItem}><strong>AMD:</strong> {t.modulesAMD}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Input: ES module syntax\n'
        + 'import { readFile } from "fs/promises";\n'
        + 'import path from "path";\n'
        + 'export const loadConfig = async (file) => {\n'
        + '  const content = await readFile(path.resolve(file), "utf-8");\n'
        + '  return JSON.parse(content);\n'
        + '};\n'
        + 'export default loadConfig;\n'
        + '\n'
        + '// Output: CommonJS (module.type: "commonjs")\n'
        + '"use strict";\n'
        + 'Object.defineProperty(exports, "__esModule", { value: true });\n'
        + 'const _promises = require("fs/promises");\n'
        + 'const _path = _interopRequireDefault(require("path"));\n'
        + 'const loadConfig = async (file) => {\n'
        + '  const content = await (0, _promises.readFile)(\n'
        + '    _path.default.resolve(file), "utf-8"\n'
        + '  );\n'
        + '  return JSON.parse(content);\n'
        + '};\n'
        + 'exports.loadConfig = loadConfig;\n'
        + 'exports.default = loadConfig;\n'
        + '\n'
        + '// Output: UMD (module.type: "umd")\n'
        + '(function(global, factory) {\n'
        + '  if (typeof define === "function" && define.amd)\n'
        + '    define(["exports", "fs/promises", "path"], factory);\n'
        + '  else if (typeof exports !== "undefined")\n'
        + '    factory(exports, require("fs/promises"), require("path"));\n'
        + '  else {\n'
        + '    var mod = { exports: {} };\n'
        + '    factory(mod.exports);\n'
        + '    global.myModule = mod.exports;\n'
        + '  }\n'
        + '})(this, function(exports, _promises, _path) {\n'
        + '  // ... module code\n'
        + '});'}</code></pre>

      {/* Minification */}
      <h2 style={sectionTitle}>{t.h2Minification}</h2>
      <p style={para}>{t.minificationDesc}</p>
      <h3 style={subTitle}>{t.minifyConfig}</h3>
      <pre style={codeBlock}><code>{'// .swcrc — Minification configuration\n'
        + '{\n'
        + '  "jsc": {\n'
        + '    "parser": { "syntax": "typescript", "tsx": true },\n'
        + '    "target": "es2020",\n'
        + '    "minify": {\n'
        + '      "compress": {\n'
        + '        "dead_code": true,\n'
        + '        "drop_console": true,\n'
        + '        "drop_debugger": true,\n'
        + '        "pure_funcs": ["console.info", "console.debug"],\n'
        + '        "passes": 2,\n'
        + '        "toplevel": true,\n'
        + '        "unused": true\n'
        + '      },\n'
        + '      "mangle": {\n'
        + '        "toplevel": true,\n'
        + '        "keep_classnames": false,\n'
        + '        "keep_fnames": false\n'
        + '      }\n'
        + '    }\n'
        + '  },\n'
        + '  "minify": true\n'
        + '}\n'
        + '\n'
        + '// CLI minification\n'
        + '// npx swc src/index.ts -o dist/index.min.js --minify'}</code></pre>

      <h3 style={subTitle}>{t.minifyComparison}</h3>
      <pre style={codeBlock}><code>{'# Minification benchmark: 1MB JavaScript bundle\n'
        + '#\n'
        + '# swc-minify     0.4s    152 KB output\n'
        + '# esbuild        0.3s    155 KB output\n'
        + '# terser         8.2s    148 KB output\n'
        + '# uglify-js      12.1s   150 KB output\n'
        + '#\n'
        + '# swc-minify is 20x faster than Terser\n'
        + '# with comparable output size (2-3% larger)'}</code></pre>

      {/* Bundling */}
      <h2 style={sectionTitle}>{t.h2Bundling}</h2>
      <p style={para}>{t.bundlingDesc}</p>
      <h3 style={subTitle}>{t.bundlingConfig}</h3>
      <pre style={codeBlock}><code>{'// spack.config.js — swcpack bundler configuration\n'
        + 'const { config } = require("@swc/core/spack");\n'
        + '\n'
        + 'module.exports = config({\n'
        + '  entry: {\n'
        + '    web: __dirname + "/src/index.ts",\n'
        + '  },\n'
        + '  output: {\n'
        + '    path: __dirname + "/dist",\n'
        + '    name: "[name].bundle.js",\n'
        + '  },\n'
        + '  module: {},\n'
        + '  options: {\n'
        + '    jsc: {\n'
        + '      parser: {\n'
        + '        syntax: "typescript",\n'
        + '        tsx: true,\n'
        + '      },\n'
        + '      target: "es2020",\n'
        + '    },\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Run the bundler\n'
        + '// npx spack'}</code></pre>

      {/* Next.js Integration */}
      <h2 style={sectionTitle}>{t.h2NextJS}</h2>
      <p style={para}>{t.nextjsDesc}</p>
      <h3 style={subTitle}>{t.nextjsConfig}</h3>
      <pre style={codeBlock}><code>{'// next.config.js — SWC configuration in Next.js\n'
        + '/** @type {import("next").NextConfig} */\n'
        + 'const nextConfig = {\n'
        + '  // SWC is enabled by default since Next.js 12\n'
        + '  // These options customize its behavior\n'
        + '\n'
        + '  compiler: {\n'
        + '    // styled-components support\n'
        + '    styledComponents: true,\n'
        + '\n'
        + '    // Emotion CSS-in-JS support\n'
        + '    emotion: {\n'
        + '      sourceMap: true,\n'
        + '      autoLabel: "dev-only",\n'
        + '      labelFormat: "[local]",\n'
        + '    },\n'
        + '\n'
        + '    // Remove console.log in production\n'
        + '    removeConsole: {\n'
        + '      exclude: ["error", "warn"],\n'
        + '    },\n'
        + '\n'
        + '    // Import path optimization\n'
        + '    modularizeImports: {\n'
        + '      "lodash": {\n'
        + '        transform: "lodash/\\{\\{member}}",\n'
        + '      },\n'
        + '      "@mui/icons-material": {\n'
        + '        transform: "@mui/icons-material/\\{\\{member}}",\n'
        + '      },\n'
        + '    },\n'
        + '\n'
        + '    // React Server Components configuration\n'
        + '    reactRemoveProperties: true,\n'
        + '  },\n'
        + '\n'
        + '  // TypeScript path aliases work automatically\n'
        + '  // SWC reads tsconfig.json paths\n'
        + '};\n'
        + '\n'
        + 'module.exports = nextConfig;'}</code></pre>
      <p style={para}>{t.nextjsFeatures}</p>

      {/* Vite Integration */}
      <h2 style={sectionTitle}>{t.h2Vite}</h2>
      <p style={para}>{t.viteDesc}</p>
      <h3 style={subTitle}>{t.viteConfig}</h3>
      <pre style={codeBlock}><code>{'// vite.config.ts — Using SWC with Vite\n'
        + 'import { defineConfig } from "vite";\n'
        + 'import react from "@vitejs/plugin-react-swc";\n'
        + '\n'
        + 'export default defineConfig({\n'
        + '  plugins: [\n'
        + '    react({\n'
        + '      // Enable TypeScript decorators\n'
        + '      tsDecorators: true,\n'
        + '\n'
        + '      // Custom SWC plugins\n'
        + '      plugins: [\n'
        + '        ["@swc/plugin-styled-components", {}],\n'
        + '      ],\n'
        + '    }),\n'
        + '  ],\n'
        + '  build: {\n'
        + '    target: "es2020",\n'
        + '    sourcemap: true,\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// Installation:\n'
        + '// npm install --save-dev vite @vitejs/plugin-react-swc\n'
        + '// npm install --save-dev @swc/plugin-styled-components  (optional)'}</code></pre>

      {/* Webpack Integration */}
      <h2 style={sectionTitle}>{t.h2Webpack}</h2>
      <p style={para}>{t.webpackDesc}</p>
      <h3 style={subTitle}>{t.webpackConfig}</h3>
      <pre style={codeBlock}><code>{'// webpack.config.js — Using SWC with Webpack\n'
        + 'const path = require("path");\n'
        + '\n'
        + 'module.exports = {\n'
        + '  entry: "./src/index.tsx",\n'
        + '  output: {\n'
        + '    path: path.resolve(__dirname, "dist"),\n'
        + '    filename: "bundle.js",\n'
        + '  },\n'
        + '  module: {\n'
        + '    rules: [\n'
        + '      {\n'
        + '        test: /\\.(ts|tsx|js|jsx)\\$/,\n'
        + '        exclude: /node_modules/,\n'
        + '        use: {\n'
        + '          loader: "swc-loader",\n'
        + '          options: {\n'
        + '            jsc: {\n'
        + '              parser: {\n'
        + '                syntax: "typescript",\n'
        + '                tsx: true,\n'
        + '                decorators: true,\n'
        + '              },\n'
        + '              transform: {\n'
        + '                react: {\n'
        + '                  runtime: "automatic",\n'
        + '                },\n'
        + '              },\n'
        + '              target: "es2020",\n'
        + '            },\n'
        + '          },\n'
        + '        },\n'
        + '      },\n'
        + '    ],\n'
        + '  },\n'
        + '  resolve: {\n'
        + '    extensions: [".ts", ".tsx", ".js", ".jsx"],\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Migration from babel-loader:\n'
        + '// 1. npm uninstall babel-loader @babel/core @babel/preset-env\n'
        + '// 2. npm install --save-dev swc-loader @swc/core\n'
        + '// 3. Replace "babel-loader" with "swc-loader" in webpack config'}</code></pre>

      {/* Plugin System */}
      <h2 style={sectionTitle}>{t.h2Plugins}</h2>
      <p style={para}>{t.pluginsDesc}</p>
      <h3 style={subTitle}>{t.pluginsCreate}</h3>
      <pre style={codeBlock}><code>{'// Rust SWC plugin example (lib.rs)\n'
        + '// Cargo.toml dependency: swc_plugin_macro, swc_ecma_ast, swc_ecma_visit\n'
        + '\n'
        + 'use swc_plugin_macro::plugin_transform;\n'
        + 'use swc_ecma_ast::Program;\n'
        + 'use swc_ecma_visit::{VisitMut, VisitMutWith};\n'
        + '\n'
        + 'struct ConsoleRemover;\n'
        + '\n'
        + 'impl VisitMut for ConsoleRemover {\n'
        + '    fn visit_mut_call_expr(\n'
        + '        &mut self,\n'
        + '        call: &mut swc_ecma_ast::CallExpr,\n'
        + '    ) {\n'
        + '        // Visit children first\n'
        + '        call.visit_mut_children_with(self);\n'
        + '        // Custom transformation logic here\n'
        + '        // e.g., remove console.log calls\n'
        + '    }\n'
        + '}\n'
        + '\n'
        + '#[plugin_transform]\n'
        + 'fn process(program: Program, _config: String) -> Program {\n'
        + '    let mut visitor = ConsoleRemover;\n'
        + '    let mut program = program;\n'
        + '    program.visit_mut_with(&mut visitor);\n'
        + '    program\n'
        + '}\n'
        + '\n'
        + '// Build: cargo build --target wasm32-wasi --release'}</code></pre>

      <h3 style={subTitle}>{t.pluginsUse}</h3>
      <pre style={codeBlock}><code>{'// .swcrc — Using custom and community plugins\n'
        + '{\n'
        + '  "jsc": {\n'
        + '    "parser": { "syntax": "typescript", "tsx": true },\n'
        + '    "target": "es2020",\n'
        + '    "experimental": {\n'
        + '      "plugins": [\n'
        + '        // Community plugin (npm package)\n'
        + '        ["@swc/plugin-styled-components", {\n'
        + '          "displayName": true,\n'
        + '          "ssr": true\n'
        + '        }],\n'
        + '\n'
        + '        // Custom local plugin (.wasm file)\n'
        + '        ["./plugins/my-transform.wasm", {\n'
        + '          "option1": "value1"\n'
        + '        }],\n'
        + '\n'
        + '        // Emotion CSS-in-JS plugin\n'
        + '        ["@swc/plugin-emotion", {}]\n'
        + '      ]\n'
        + '    }\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* Migration from Babel */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <h3 style={subTitle}>{t.migrationSteps}</h3>
      <pre style={codeBlock}><code>{'# Step 1: Install SWC packages\n'
        + 'npm install --save-dev @swc/core @swc/cli\n'
        + '# For Webpack projects:\n'
        + 'npm install --save-dev swc-loader\n'
        + '# For Jest:\n'
        + 'npm install --save-dev @swc/jest\n'
        + '\n'
        + '# Step 2: Remove Babel packages\n'
        + 'npm uninstall @babel/core @babel/cli @babel/preset-env\n'
        + 'npm uninstall @babel/preset-react @babel/preset-typescript\n'
        + 'npm uninstall babel-loader babel-jest\n'
        + '\n'
        + '# Step 3: Create .swcrc from your babel config\n'
        + '# (see mapping table below)\n'
        + '\n'
        + '# Step 4: Update package.json scripts\n'
        + '# Before: "build": "babel src -d dist"\n'
        + '# After:  "build": "swc src -d dist"\n'
        + '\n'
        + '# Step 5: Update Jest config (jest.config.js)\n'
        + '# Before: transform: { "^.+\\\\.tsx?\\$": "babel-jest" }\n'
        + '# After:  transform: { "^.+\\\\.tsx?\\$": ["@swc/jest", {}] }\n'
        + '\n'
        + '# Step 6: Delete .babelrc or babel.config.js\n'
        + '# Step 7: Test build and fix any edge cases'}</code></pre>

      <h3 style={subTitle}>{t.migrationMapping}</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={headerCell}>Babel Config</th>
              <th style={headerCell}>SWC Equivalent (.swcrc)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['@babel/preset-env', 'jsc.target: "es2020" or env.targets'],
              ['@babel/preset-react', 'jsc.transform.react.runtime: "automatic"'],
              ['@babel/preset-typescript', 'jsc.parser.syntax: "typescript"'],
              ['@babel/plugin-proposal-decorators', 'jsc.parser.decorators: true + jsc.transform.legacyDecorator'],
              ['@babel/plugin-proposal-class-properties', 'Built-in (jsc.target controls output)'],
              ['@babel/plugin-transform-runtime', 'jsc.externalHelpers: true'],
              ['babel-plugin-module-resolver', 'jsc.baseUrl + jsc.paths'],
              ['babel-plugin-styled-components', '@swc/plugin-styled-components'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={cellStyle}>{row[0]}</td>
                <td style={cellStyle}>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Comparison Table */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={headerCell}>{t.compCol1}</th>
              <th style={headerCell}>{t.compCol2}</th>
              <th style={headerCell}>{t.compCol3}</th>
              <th style={headerCell}>{t.compCol4}</th>
              <th style={headerCell}>{t.compCol5}</th>
            </tr>
          </thead>
          <tbody>
            {[
              [t.compRow1, t.compRow1V2, t.compRow1V3, t.compRow1V4, t.compRow1V5],
              [t.compRow2, t.compRow2V2, t.compRow2V3, t.compRow2V4, t.compRow2V5],
              [t.compRow3, t.compRow3V2, t.compRow3V3, t.compRow3V4, t.compRow3V5],
              [t.compRow4, t.compRow4V2, t.compRow4V3, t.compRow4V4, t.compRow4V5],
              [t.compRow5, t.compRow5V2, t.compRow5V3, t.compRow5V4, t.compRow5V5],
              [t.compRow6, t.compRow6V2, t.compRow6V3, t.compRow6V4, t.compRow6V5],
              [t.compRow7, t.compRow7V2, t.compRow7V3, t.compRow7V4, t.compRow7V5],
              [t.compRow8, t.compRow8V2, t.compRow8V3, t.compRow8V4, t.compRow8V5],
            ].map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={cellStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={para}>{t.comparisonSummary}</p>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Complete SWC production workflow (package.json)\n'
        + '{\n'
        + '  "scripts": {\n'
        + '    "dev": "swc src -d dist --watch --source-maps",\n'
        + '    "build": "swc src -d dist --minify --source-maps",\n'
        + '    "typecheck": "tsc --noEmit",\n'
        + '    "test": "jest --config jest.config.js",\n'
        + '    "lint": "eslint src --ext .ts,.tsx",\n'
        + '    "ci": "npm run typecheck && npm run lint && npm run test && npm run build"\n'
        + '  },\n'
        + '  "devDependencies": {\n'
        + '    "@swc/cli": "^0.4.0",\n'
        + '    "@swc/core": "^1.7.0",\n'
        + '    "@swc/jest": "^0.2.0",\n'
        + '    "typescript": "^5.6.0"\n'
        + '  }\n'
        + '}'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
      {[
        [t.faq1Q, t.faq1A],
        [t.faq2Q, t.faq2A],
        [t.faq3Q, t.faq3A],
        [t.faq4Q, t.faq4A],
        [t.faq5Q, t.faq5A],
        [t.faq6Q, t.faq6A],
        [t.faq7Q, t.faq7A],
        [t.faq8Q, t.faq8A],
      ].map(([q, a], i) => (
        <div key={i} style={{ marginBottom: '1.5rem' }}>
          <h3 style={subTitle}>{q}</h3>
          <p style={para}>{a}</p>
        </div>
      ))}
    </article>
  );
}
