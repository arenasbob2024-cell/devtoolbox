'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'esbuild: The Fastest JavaScript Bundler — Complete Guide 2026',
    intro: 'esbuild is an extremely fast JavaScript and TypeScript bundler written in Go. It handles bundling, minification, transpilation, and tree-shaking at speeds 10-100x faster than traditional tools like Webpack, Rollup, or Parcel. Created by Evan Wallace (co-founder of Figma), esbuild achieves its performance by leveraging parallelism, avoiding unnecessary data transformations, and using a compiled language instead of JavaScript. Whether you need a standalone bundler or a high-speed foundation for tools like Vite and Snowpack, esbuild has become an essential part of the modern JavaScript toolchain.',
    tldr: 'esbuild is a Go-based JavaScript/TypeScript bundler that is 10-100x faster than Webpack or Rollup. It supports ESM and CommonJS, TypeScript and JSX out of the box, tree-shaking, minification, source maps, CSS bundling, a plugin API, watch mode, and a built-in dev server. Use the CLI for quick tasks, the JavaScript/Go API for programmatic builds, and plugins for custom transformations. esbuild powers the dev experience in Vite and is ideal for library bundling, fast CI builds, and any scenario where build speed is critical.',
    keyTakeaway1: 'esbuild is written in Go with heavy parallelism, making it 10-100x faster than JavaScript-based bundlers like Webpack.',
    keyTakeaway2: 'It supports TypeScript, JSX, ESM, CommonJS, CSS, and JSON out of the box with zero configuration.',
    keyTakeaway3: 'The plugin API lets you extend esbuild with custom loaders, resolvers, and transformations.',
    keyTakeaway4: 'Tree-shaking, minification, and code splitting work automatically to produce optimized production bundles.',
    keyTakeaway5: 'Watch mode and the built-in serve mode enable fast development workflows with instant rebuilds.',
    keyTakeaway6: 'esbuild powers Vite dev server and is widely used as a fast transpiler and bundler in modern toolchains.',

    h2WhyFast: 'Why esbuild Is So Fast',
    whyFastDesc: 'esbuild achieves its extraordinary speed through four key architectural decisions that set it apart from every JavaScript-based bundler.',
    whyFast1: 'Written in Go: Go compiles to native machine code and runs without a garbage collector pause storm. JavaScript bundlers run in V8 which has JIT compilation overhead, GC pauses, and single-threaded constraints.',
    whyFast2: 'Massive parallelism: esbuild uses all available CPU cores for parsing, linking, and code generation. Each phase is designed for concurrent execution. JavaScript bundlers are fundamentally limited by the single-threaded event loop.',
    whyFast3: 'Minimal data transformations: esbuild reads source files, parses them once into a compact AST representation, and writes output. It avoids the repeated string-to-AST-to-string conversions that plugin chains in Webpack and Rollup perform.',
    whyFast4: 'Memory efficiency: esbuild uses compact data structures and processes files in a streaming fashion. It avoids holding large intermediate representations in memory, resulting in lower memory usage even for large projects.',

    h2Install: 'Installation',
    installDesc: 'esbuild can be installed as a local npm dependency or globally. It ships platform-specific native binaries, so no compilation step is needed during installation.',

    h2CLI: 'CLI Usage',
    cliDesc: 'The esbuild CLI is the quickest way to bundle, minify, or transform files. It accepts all major options as command-line flags and is ideal for scripts, CI pipelines, and one-off tasks.',
    cliBasic: 'Basic bundling and common CLI flags:',
    cliAdvanced: 'Advanced CLI options for production builds:',

    h2JSApi: 'JavaScript API',
    jsApiDesc: 'The JavaScript API provides programmatic access to esbuild from Node.js scripts, build tools, and custom dev servers. It exposes three main functions: build, transform, and context.',
    jsApiBuild: 'The build function reads files from disk, bundles them, and writes output. It accepts all the same options as the CLI plus additional JavaScript-specific options like plugins.',
    jsApiTransform: 'The transform function operates on a single string of code without accessing the file system. It is useful for on-the-fly transpilation in dev servers and editor integrations.',
    jsApiContext: 'The context function creates a long-lived build context for watch mode and serve mode. It returns an object with rebuild, watch, serve, and dispose methods.',

    h2Loaders: 'Content Types and Loaders',
    loadersDesc: 'esbuild uses loaders to determine how to process each file type. The loader is selected based on the file extension, but can be overridden using the --loader flag or the loader option in the API. Each loader tells esbuild how to interpret the file content.',
    loaderJS: 'js / jsx — JavaScript and JSX files. JSX syntax is supported in both .js and .jsx files when configured.',
    loaderTS: 'ts / tsx — TypeScript and TSX files. esbuild strips type annotations but does not perform type checking. Use tsc --noEmit alongside esbuild for type safety.',
    loaderCSS: 'css — CSS files. esbuild bundles CSS imports, handles @import resolution, and supports CSS modules with the .module.css convention.',
    loaderJSON: 'json — JSON files are parsed and inlined as JavaScript objects. Tree-shaking works on individual JSON properties.',
    loaderText: 'text — Files are imported as a JavaScript string containing the file contents.',
    loaderBinary: 'binary — Files are imported as a Uint8Array of the file contents.',
    loaderBase64: 'base64 — Files are imported as a base64-encoded string.',
    loaderFile: 'file — Files are copied to the output directory and the import resolves to the output file path.',
    loaderDataURL: 'dataurl — Files are inlined as a data URL string.',

    h2Bundle: 'Bundling and Output Formats',
    bundleDesc: 'esbuild supports three output formats that determine how the bundled code is structured. Choosing the right format depends on your target environment and module system.',
    bundleESM: 'ESM (esm): Generates standard ES module output with import/export statements. Best for modern browsers, Node.js with type: "module", and library packages.',
    bundleCJS: 'CommonJS (cjs): Generates Node.js-style require/module.exports output. Use for Node.js packages that need to support older environments.',
    bundleIIFE: 'IIFE (iife): Wraps the code in an immediately invoked function expression. Use for script tags in browsers where module loading is not available.',

    h2CodeSplit: 'Code Splitting',
    codeSplitDesc: 'esbuild supports automatic code splitting for ESM output format. When splitting is enabled, shared modules between multiple entry points are extracted into separate chunk files, and dynamic import() expressions create additional chunks loaded on demand.',

    h2TreeShake: 'Tree-Shaking',
    treeShakeDesc: 'esbuild performs tree-shaking (dead code elimination) automatically during bundling. It analyzes the import/export graph and removes code that is never imported or used. Tree-shaking works at the statement level for ES modules and respects the sideEffects field in package.json.',
    treeShakeNote: 'For maximum tree-shaking effectiveness, use ES module syntax (import/export) instead of CommonJS (require/module.exports). CommonJS is dynamic and prevents static analysis of unused exports.',

    h2Minify: 'Minification',
    minifyDesc: 'esbuild includes a built-in minifier that reduces bundle size by removing whitespace, shortening identifiers, and applying code transformations. The minifier works for both JavaScript and CSS. It can be enabled as a single flag or configured individually for whitespace, identifiers, and syntax.',

    h2SourceMaps: 'Source Maps',
    sourceMapsDesc: 'Source maps allow debuggers to map bundled/minified code back to the original source files. esbuild supports several source map modes to match different deployment scenarios.',
    sourceMapLinked: 'linked — Generates a separate .map file and adds a sourceMappingURL comment to the output. Standard for production deployments.',
    sourceMapInline: 'inline — Embeds the entire source map as a base64 data URL inside the output file. Useful for development and small scripts.',
    sourceMapExternal: 'external — Generates a separate .map file but does NOT add a sourceMappingURL comment. Use when you want to upload source maps to an error tracking service without exposing them to end users.',
    sourceMapBoth: 'both — Generates a separate .map file AND embeds an inline source map. Rarely needed.',

    h2Plugins: 'Plugin API',
    pluginsDesc: 'The esbuild plugin API lets you intercept and customize the build process. Plugins can resolve import paths, load file contents, and transform code. The API is designed to be simple and fast, with two main hooks: onResolve and onLoad.',
    pluginsResolve: 'onResolve — Called when esbuild encounters an import path. Your callback can return a custom path, namespace, or external flag to control how the import is resolved.',
    pluginsLoad: 'onLoad — Called when esbuild needs to load a file. Your callback returns the file contents and loader type. Use this to support custom file formats, virtual modules, or pre-processing steps.',
    pluginsExample: 'Here is an example plugin that loads .txt files as ES modules and adds environment variables:',

    h2Watch: 'Watch Mode',
    watchDesc: 'Watch mode monitors source files for changes and automatically rebuilds when a change is detected. It uses the operating system file watcher for instant notifications rather than polling, making rebuilds near-instantaneous.',

    h2Serve: 'Serve Mode',
    serveDesc: 'The built-in serve mode starts a local HTTP server that serves the build output. It integrates with watch mode so every request triggers a rebuild if any files have changed. This provides a minimal development server without needing additional tooling.',

    h2Target: 'Target Environments',
    targetDesc: 'The target option tells esbuild which JavaScript version to output. esbuild automatically transforms modern syntax down to the specified target. Supported targets include ESNext, ES2015-ES2022, Chrome, Firefox, Safari, Edge, Node, iOS, and Android version numbers.',

    h2Platform: 'Platform Configuration',
    platformDesc: 'The platform option tells esbuild whether the code will run in the browser or in Node.js. This affects default settings for main fields, conditions, and built-in modules. Setting platform to "node" marks Node.js built-in modules as external by default. Setting platform to "browser" enables import.meta.url and ignores Node.js built-ins.',

    h2Define: 'Define and Environment Variables',
    defineDesc: 'The define option lets you replace global identifiers with constant expressions at build time. This is commonly used for environment variables, feature flags, and conditional compilation. The replacement happens at the AST level, so it works with tree-shaking to eliminate dead code branches.',

    h2Comparison: 'esbuild vs Webpack vs Rollup vs Vite',
    comparisonDesc: 'Understanding how esbuild compares to other bundlers helps you choose the right tool for your project. Each tool has different strengths and trade-offs.',
    compCol1: 'Feature',
    compCol2: 'esbuild',
    compCol3: 'Webpack',
    compCol4: 'Rollup',
    compCol5: 'Vite',
    compRow1: 'Language',
    compRow1V2: 'Go',
    compRow1V3: 'JavaScript',
    compRow1V4: 'JavaScript',
    compRow1V5: 'JS (uses esbuild + Rollup)',
    compRow2: 'Speed (1K modules)',
    compRow2V2: '~0.3s',
    compRow2V3: '~20s',
    compRow2V4: '~15s',
    compRow2V5: '~0.5s (dev), ~8s (build)',
    compRow3: 'Code splitting',
    compRow3V2: 'ESM only',
    compRow3V3: 'Full support',
    compRow3V4: 'Full support',
    compRow3V5: 'Full support',
    compRow4: 'Plugin ecosystem',
    compRow4V2: 'Small',
    compRow4V3: 'Largest',
    compRow4V4: 'Large',
    compRow4V5: 'Growing (Rollup-compatible)',
    compRow5: 'HMR',
    compRow5V2: 'No built-in',
    compRow5V3: 'Yes',
    compRow5V4: 'Via plugins',
    compRow5V5: 'Yes (instant)',
    compRow6: 'TypeScript',
    compRow6V2: 'Strip only',
    compRow6V3: 'Via ts-loader',
    compRow6V4: 'Via plugin',
    compRow6V5: 'Via esbuild',
    compRow7: 'CSS bundling',
    compRow7V2: 'Built-in',
    compRow7V3: 'Via loaders',
    compRow7V4: 'Via plugins',
    compRow7V5: 'Built-in',
    compRow8: 'Config complexity',
    compRow8V2: 'Minimal',
    compRow8V3: 'High',
    compRow8V4: 'Medium',
    compRow8V5: 'Low',
    comparisonSummary: 'esbuild excels at raw build speed, library bundling, and as a fast transpiler inside other tools. Webpack is best for complex applications needing full plugin ecosystems. Rollup is ideal for library publishing with advanced tree-shaking. Vite combines esbuild speed for development with Rollup quality for production.',

    h2BestPractices: 'Best Practices',
    bp1: 'Use esbuild for library bundling where speed and simple configuration matter most. For complex web applications, consider Vite which uses esbuild under the hood.',
    bp2: 'Always run tsc --noEmit separately for type checking. esbuild strips types but does not validate them.',
    bp3: 'Use the context API with watch mode for development instead of calling build repeatedly. The context reuses internal state for faster incremental rebuilds.',
    bp4: 'Set the target option to match your minimum supported environment. This ensures esbuild transforms only the syntax features your targets do not support.',
    bp5: 'Use the metafile option to analyze bundle composition. The generated JSON shows file sizes, import chains, and module duplication.',
    bp6: 'Enable tree-shaking by using ES module syntax and setting the sideEffects field in package.json to help esbuild eliminate unused code.',
    bp7: 'Use define for compile-time constants and environment variables. This enables dead code elimination for conditional branches.',
    bp8: 'For production builds, enable minification, source maps (linked mode), and set the appropriate target and platform options.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Why is esbuild so much faster than Webpack?',
    faq1A: 'esbuild is written in Go, which compiles to native machine code and runs with full parallelism across all CPU cores. Webpack runs in Node.js with JavaScript, which is single-threaded, has JIT compilation overhead, and garbage collection pauses. esbuild also minimizes data transformations by parsing each file once into a compact representation.',
    faq2Q: 'Does esbuild support TypeScript type checking?',
    faq2A: 'No. esbuild strips TypeScript type annotations during transpilation but does not perform type checking. This is by design for speed. You should run tsc --noEmit separately in your CI pipeline or as a pre-commit hook to catch type errors.',
    faq3Q: 'Can esbuild replace Webpack for a React application?',
    faq3A: 'For simple to medium React applications, yes. esbuild handles JSX, TypeScript, CSS, code splitting, and minification. However, for complex setups requiring HMR, Module Federation, or extensive plugin ecosystems, Webpack or Vite (which uses esbuild internally) is a better choice.',
    faq4Q: 'How does esbuild handle CSS?',
    faq4A: 'esbuild has a built-in CSS bundler that resolves @import statements, handles CSS modules (.module.css), performs minification, and generates source maps. It supports modern CSS syntax and can bundle CSS alongside JavaScript entry points.',
    faq5Q: 'What is the difference between esbuild and Vite?',
    faq5A: 'esbuild is a low-level bundler and transpiler focused on raw speed. Vite is a higher-level build tool that uses esbuild for dependency pre-bundling and TypeScript/JSX transpilation in development, but uses Rollup for production builds. Vite adds HMR, a dev server, framework plugins, and a richer configuration system on top of esbuild.',
    faq6Q: 'Does esbuild support code splitting?',
    faq6A: 'Yes, but only for the ESM output format. When you enable splitting with multiple entry points or dynamic import() expressions, esbuild extracts shared code into separate chunk files. IIFE and CommonJS formats do not support code splitting.',
    faq7Q: 'How do I use esbuild plugins?',
    faq7A: 'Plugins are JavaScript objects with a name and a setup function. The setup function receives a build object with onResolve and onLoad hooks. onResolve intercepts import path resolution, and onLoad provides file contents. Plugins are passed to the build or context function via the plugins option.',
    faq8Q: 'Is esbuild production-ready?',
    faq8A: 'Yes. esbuild has been stable and widely used in production since 2021. It powers the development experience in Vite (used by Vue, React, Svelte, and SolidJS frameworks), Amazon CDK, and many other tools. Its API has been stable with no breaking changes across minor versions.',
  },
  zh: {
    title: 'esbuild：最快的 JavaScript 打包工具 — 完整指南 2026',
    intro: 'esbuild 是一个用 Go 语言编写的极速 JavaScript 和 TypeScript 打包工具。它以比 Webpack、Rollup 或 Parcel 等传统工具快 10-100 倍的速度处理打包、压缩、转译和 Tree-shaking。esbuild 由 Evan Wallace（Figma 联合创始人）创建，通过利用并行性、避免不必要的数据转换以及使用编译语言而非 JavaScript 来实现其性能。无论你需要独立的打包工具还是 Vite 和 Snowpack 等工具的高速基础，esbuild 已成为现代 JavaScript 工具链中不可或缺的一部分。',
    tldr: 'esbuild 是基于 Go 的 JavaScript/TypeScript 打包工具，速度比 Webpack 或 Rollup 快 10-100 倍。它开箱即用支持 ESM 和 CommonJS、TypeScript 和 JSX、Tree-shaking、压缩、Source Map、CSS 打包、插件 API、监听模式和内置开发服务器。使用 CLI 进行快速任务，使用 JavaScript/Go API 进行编程构建，使用插件进行自定义转换。',
    keyTakeaway1: 'esbuild 用 Go 编写并大量使用并行处理，比 Webpack 等基于 JavaScript 的打包工具快 10-100 倍。',
    keyTakeaway2: '开箱即用支持 TypeScript、JSX、ESM、CommonJS、CSS 和 JSON，无需配置。',
    keyTakeaway3: '插件 API 让你可以用自定义加载器、解析器和转换来扩展 esbuild。',
    keyTakeaway4: 'Tree-shaking、压缩和代码分割自动工作，生成优化的生产包。',
    keyTakeaway5: '监听模式和内置服务模式实现快速开发工作流和即时重建。',
    keyTakeaway6: 'esbuild 驱动 Vite 开发服务器，在现代工具链中被广泛用作快速转译器和打包工具。',

    h2WhyFast: '为什么 esbuild 如此快速',
    whyFastDesc: 'esbuild 通过四个关键架构决策实现了非凡的速度，使其区别于所有基于 JavaScript 的打包工具。',
    whyFast1: '用 Go 编写：Go 编译为原生机器码，无需垃圾回收暂停风暴。JavaScript 打包工具在 V8 中运行，有 JIT 编译开销、GC 暂停和单线程限制。',
    whyFast2: '大规模并行：esbuild 使用所有可用 CPU 核心进行解析、链接和代码生成。JavaScript 打包工具受单线程事件循环的根本限制。',
    whyFast3: '最少数据转换：esbuild 读取源文件，将其解析为紧凑的 AST 表示一次，然后写入输出。它避免了 Webpack 和 Rollup 中插件链执行的重复字符串到 AST 到字符串转换。',
    whyFast4: '内存效率：esbuild 使用紧凑的数据结构并以流式方式处理文件，即使对于大型项目也能保持较低的内存使用。',

    h2Install: '安装',
    installDesc: 'esbuild 可以作为本地 npm 依赖或全局安装。它提供平台特定的原生二进制文件，安装时无需编译步骤。',

    h2CLI: 'CLI 使用',
    cliDesc: 'esbuild CLI 是打包、压缩或转换文件的最快方式。它接受所有主要选项作为命令行标志，非常适合脚本、CI 管道和一次性任务。',
    cliBasic: '基本打包和常用 CLI 标志：',
    cliAdvanced: '用于生产构建的高级 CLI 选项：',

    h2JSApi: 'JavaScript API',
    jsApiDesc: 'JavaScript API 提供从 Node.js 脚本、构建工具和自定义开发服务器对 esbuild 的编程访问。它暴露三个主要函数：build、transform 和 context。',
    jsApiBuild: 'build 函数从磁盘读取文件，打包它们并写入输出。它接受所有与 CLI 相同的选项以及额外的 JavaScript 特定选项如插件。',
    jsApiTransform: 'transform 函数在单个代码字符串上操作，不访问文件系统。适用于开发服务器和编辑器集成中的即时转译。',
    jsApiContext: 'context 函数为监听模式和服务模式创建长期构建上下文。它返回具有 rebuild、watch、serve 和 dispose 方法的对象。',

    h2Loaders: '内容类型和加载器',
    loadersDesc: 'esbuild 使用加载器来确定如何处理每种文件类型。加载器根据文件扩展名选择，但可以使用 --loader 标志或 API 中的 loader 选项覆盖。',
    loaderJS: 'js / jsx — JavaScript 和 JSX 文件。配置后 .js 和 .jsx 文件都支持 JSX 语法。',
    loaderTS: 'ts / tsx — TypeScript 和 TSX 文件。esbuild 剥离类型注解但不执行类型检查。',
    loaderCSS: 'css — CSS 文件。esbuild 打包 CSS 导入，处理 @import 解析，支持 CSS 模块。',
    loaderJSON: 'json — JSON 文件被解析并内联为 JavaScript 对象。Tree-shaking 作用于单个 JSON 属性。',
    loaderText: 'text — 文件作为包含文件内容的 JavaScript 字符串导入。',
    loaderBinary: 'binary — 文件作为文件内容的 Uint8Array 导入。',
    loaderBase64: 'base64 — 文件作为 base64 编码字符串导入。',
    loaderFile: 'file — 文件被复制到输出目录，导入解析为输出文件路径。',
    loaderDataURL: 'dataurl — 文件作为 data URL 字符串内联。',

    h2Bundle: '打包和输出格式',
    bundleDesc: 'esbuild 支持三种输出格式，决定打包代码的结构方式。选择正确的格式取决于目标环境和模块系统。',
    bundleESM: 'ESM (esm)：生成标准 ES 模块输出。适用于现代浏览器、Node.js type: "module" 和库包。',
    bundleCJS: 'CommonJS (cjs)：生成 Node.js 风格的 require/module.exports 输出。用于需要支持旧环境的 Node.js 包。',
    bundleIIFE: 'IIFE (iife)：将代码包装在立即调用函数表达式中。用于不支持模块加载的浏览器脚本标签。',

    h2CodeSplit: '代码分割',
    codeSplitDesc: 'esbuild 支持 ESM 输出格式的自动代码分割。启用分割后，多个入口点之间的共享模块被提取到单独的块文件中，动态 import() 表达式创建按需加载的额外块。',

    h2TreeShake: 'Tree-Shaking',
    treeShakeDesc: 'esbuild 在打包过程中自动执行 Tree-shaking（死代码消除）。它分析 import/export 图并移除从未导入或使用的代码。Tree-shaking 在语句级别工作并尊重 package.json 中的 sideEffects 字段。',
    treeShakeNote: '为了最大化 Tree-shaking 效果，使用 ES 模块语法（import/export）而非 CommonJS（require/module.exports）。CommonJS 是动态的，阻止对未使用导出的静态分析。',

    h2Minify: '压缩',
    minifyDesc: 'esbuild 包含内置压缩器，通过移除空白、缩短标识符和应用代码转换来减小包大小。压缩器同时适用于 JavaScript 和 CSS。可以作为单个标志启用或分别为空白、标识符和语法配置。',

    h2SourceMaps: 'Source Maps',
    sourceMapsDesc: 'Source Map 允许调试器将打包/压缩的代码映射回原始源文件。esbuild 支持多种 Source Map 模式以匹配不同的部署场景。',
    sourceMapLinked: 'linked — 生成单独的 .map 文件并在输出中添加 sourceMappingURL 注释。生产部署的标准做法。',
    sourceMapInline: 'inline — 将整个 Source Map 作为 base64 data URL 嵌入输出文件。适用于开发和小型脚本。',
    sourceMapExternal: 'external — 生成单独的 .map 文件但不添加 sourceMappingURL 注释。用于上传 Source Map 到错误跟踪服务但不向用户暴露。',
    sourceMapBoth: 'both — 生成单独的 .map 文件并嵌入内联 Source Map。很少需要。',

    h2Plugins: '插件 API',
    pluginsDesc: 'esbuild 插件 API 让你拦截和自定义构建过程。插件可以解析导入路径、加载文件内容和转换代码。API 设计简单高效，有两个主要钩子：onResolve 和 onLoad。',
    pluginsResolve: 'onResolve — 当 esbuild 遇到导入路径时调用。你的回调可以返回自定义路径、命名空间或 external 标志。',
    pluginsLoad: 'onLoad — 当 esbuild 需要加载文件时调用。你的回调返回文件内容和加载器类型。',
    pluginsExample: '以下是加载 .txt 文件为 ES 模块并添加环境变量的示例插件：',

    h2Watch: '监听模式',
    watchDesc: '监听模式监控源文件的变化，检测到变化时自动重建。它使用操作系统文件监视器进行即时通知而非轮询，使重建几乎是即时的。',

    h2Serve: '服务模式',
    serveDesc: '内置服务模式启动本地 HTTP 服务器来提供构建输出。它与监听模式集成，每个请求在文件发生变化时触发重建。这提供了一个最小化的开发服务器，无需额外工具。',

    h2Target: '目标环境',
    targetDesc: 'target 选项告诉 esbuild 输出哪个 JavaScript 版本。esbuild 自动将现代语法向下转换到指定的目标。支持的目标包括 ESNext、ES2015-ES2022、Chrome、Firefox、Safari、Edge、Node 版本号。',

    h2Platform: '平台配置',
    platformDesc: 'platform 选项告诉 esbuild 代码将在浏览器还是 Node.js 中运行。这影响主字段、条件和内置模块的默认设置。',

    h2Define: 'Define 和环境变量',
    defineDesc: 'define 选项让你在构建时用常量表达式替换全局标识符。常用于环境变量、功能标志和条件编译。替换在 AST 级别进行，可与 Tree-shaking 配合消除死代码分支。',

    h2Comparison: 'esbuild vs Webpack vs Rollup vs Vite',
    comparisonDesc: '了解 esbuild 与其他打包工具的比较有助于为项目选择正确的工具。每个工具都有不同的优势和权衡。',
    compCol1: '特性',
    compCol2: 'esbuild',
    compCol3: 'Webpack',
    compCol4: 'Rollup',
    compCol5: 'Vite',
    compRow1: '编写语言', compRow1V2: 'Go', compRow1V3: 'JavaScript', compRow1V4: 'JavaScript', compRow1V5: 'JS（使用 esbuild + Rollup）',
    compRow2: '速度（1K 模块）', compRow2V2: '~0.3秒', compRow2V3: '~20秒', compRow2V4: '~15秒', compRow2V5: '~0.5秒（开发），~8秒（构建）',
    compRow3: '代码分割', compRow3V2: '仅 ESM', compRow3V3: '完全支持', compRow3V4: '完全支持', compRow3V5: '完全支持',
    compRow4: '插件生态', compRow4V2: '小', compRow4V3: '最大', compRow4V4: '大', compRow4V5: '增长中（Rollup 兼容）',
    compRow5: 'HMR', compRow5V2: '无内置', compRow5V3: '是', compRow5V4: '通过插件', compRow5V5: '是（即时）',
    compRow6: 'TypeScript', compRow6V2: '仅剥离', compRow6V3: '通过 ts-loader', compRow6V4: '通过插件', compRow6V5: '通过 esbuild',
    compRow7: 'CSS 打包', compRow7V2: '内置', compRow7V3: '通过加载器', compRow7V4: '通过插件', compRow7V5: '内置',
    compRow8: '配置复杂度', compRow8V2: '最小', compRow8V3: '高', compRow8V4: '中等', compRow8V5: '低',
    comparisonSummary: 'esbuild 擅长原始构建速度、库打包和作为其他工具内的快速转译器。Webpack 最适合需要完整插件生态的复杂应用。Rollup 适合具有高级 Tree-shaking 的库发布。Vite 将 esbuild 的开发速度与 Rollup 的生产质量结合。',

    h2BestPractices: '最佳实践',
    bp1: '使用 esbuild 进行库打包，速度和简单配置最重要。对于复杂 Web 应用，考虑使用底层采用 esbuild 的 Vite。',
    bp2: '始终单独运行 tsc --noEmit 进行类型检查。esbuild 剥离类型但不验证它们。',
    bp3: '使用 context API 的监听模式进行开发，而不是重复调用 build。上下文重用内部状态以加快增量重建。',
    bp4: '设置 target 选项以匹配最低支持环境。',
    bp5: '使用 metafile 选项分析包组成。',
    bp6: '使用 ES 模块语法并设置 sideEffects 字段来启用 Tree-shaking。',
    bp7: '使用 define 进行编译时常量和环境变量，支持死代码消除。',
    bp8: '生产构建启用压缩、Source Map（linked 模式）并设置适当的 target 和 platform 选项。',

    h2Faq: '常见问题',
    faq1Q: '为什么 esbuild 比 Webpack 快这么多？',
    faq1A: 'esbuild 用 Go 编写，编译为原生机器码并在所有 CPU 核心上完全并行运行。Webpack 在 Node.js 中使用 JavaScript 运行，是单线程的，有 JIT 编译开销和垃圾回收暂停。esbuild 还通过每个文件只解析一次为紧凑表示来最小化数据转换。',
    faq2Q: 'esbuild 支持 TypeScript 类型检查吗？',
    faq2A: '不支持。esbuild 在转译时剥离 TypeScript 类型注解但不执行类型检查。这是为了速度而设计的。你应该在 CI 管道中单独运行 tsc --noEmit。',
    faq3Q: 'esbuild 能替代 Webpack 用于 React 应用吗？',
    faq3A: '对于简单到中等的 React 应用，可以。esbuild 处理 JSX、TypeScript、CSS、代码分割和压缩。但对于需要 HMR、模块联邦或广泛插件生态的复杂设置，Webpack 或 Vite 是更好的选择。',
    faq4Q: 'esbuild 如何处理 CSS？',
    faq4A: 'esbuild 有内置 CSS 打包器，解析 @import 语句，处理 CSS 模块，执行压缩并生成 Source Map。',
    faq5Q: 'esbuild 和 Vite 有什么区别？',
    faq5A: 'esbuild 是专注于原始速度的底层打包器和转译器。Vite 是更高级的构建工具，开发时使用 esbuild 进行依赖预打包和转译，生产时使用 Rollup。Vite 在 esbuild 之上添加了 HMR、开发服务器、框架插件和更丰富的配置系统。',
    faq6Q: 'esbuild 支持代码分割吗？',
    faq6A: '是的，但仅限 ESM 输出格式。启用分割后，共享模块被提取到单独的块文件中。IIFE 和 CommonJS 格式不支持代码分割。',
    faq7Q: '如何使用 esbuild 插件？',
    faq7A: '插件是具有 name 和 setup 函数的 JavaScript 对象。setup 函数接收具有 onResolve 和 onLoad 钩子的构建对象。插件通过 plugins 选项传递给 build 或 context 函数。',
    faq8Q: 'esbuild 适合生产环境吗？',
    faq8A: '是的。esbuild 自 2021 年以来一直稳定且广泛用于生产环境。它驱动 Vite 的开发体验，被 Vue、React、Svelte 和 SolidJS 框架使用。其 API 在次版本之间保持稳定且无破坏性变更。',
  },
};

export default function EsbuildGuide({ lang }: { lang: string }) {
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

      {/* Why esbuild Is So Fast */}
      <h2 style={sectionTitle}>{t.h2WhyFast}</h2>
      <p style={para}>{t.whyFastDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>{t.whyFast1.split(':')[0]}:</strong>{t.whyFast1.substring(t.whyFast1.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast2.split(':')[0]}:</strong>{t.whyFast2.substring(t.whyFast2.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast3.split(':')[0]}:</strong>{t.whyFast3.substring(t.whyFast3.indexOf(':') + 1)}</li>
        <li style={listItem}><strong>{t.whyFast4.split(':')[0]}:</strong>{t.whyFast4.substring(t.whyFast4.indexOf(':') + 1)}</li>
      </ul>
      <pre style={codeBlock}><code>{'# Benchmark: Bundle 1,000 modules (React + TypeScript)\n'
        + '#\n'
        + '# esbuild        0.33s   (Go, parallel)\n'
        + '# Rollup + terser 15.4s   (JS, single-threaded)\n'
        + '# Webpack 5       19.8s   (JS, single-threaded)\n'
        + '# Parcel 2         8.7s   (Rust parser + JS plugins)\n'
        + '#\n'
        + '# esbuild is 47-60x faster than Webpack/Rollup\n'
        + '# for equivalent bundling tasks'}</code></pre>

      {/* Installation */}
      <h2 style={sectionTitle}>{t.h2Install}</h2>
      <p style={para}>{t.installDesc}</p>
      <pre style={codeBlock}><code>{'# Install as a local dev dependency (recommended)\n'
        + 'npm install --save-dev esbuild\n'
        + '\n'
        + '# Install globally\n'
        + 'npm install -g esbuild\n'
        + '\n'
        + '# Verify installation\n'
        + 'npx esbuild --version\n'
        + '# 0.24.x\n'
        + '\n'
        + '# Using with yarn\n'
        + 'yarn add --dev esbuild\n'
        + '\n'
        + '# Using with pnpm\n'
        + 'pnpm add -D esbuild'}</code></pre>

      {/* CLI Usage */}
      <h2 style={sectionTitle}>{t.h2CLI}</h2>
      <p style={para}>{t.cliDesc}</p>
      <h3 style={subTitle}>{t.cliBasic}</h3>
      <pre style={codeBlock}><code>{'# Bundle a single entry point\n'
        + 'npx esbuild src/index.ts --bundle --outfile=dist/bundle.js\n'
        + '\n'
        + '# Bundle with ESM output format\n'
        + 'npx esbuild src/index.ts --bundle --format=esm --outfile=dist/bundle.mjs\n'
        + '\n'
        + '# Bundle for Node.js\n'
        + 'npx esbuild src/server.ts --bundle --platform=node --outfile=dist/server.js\n'
        + '\n'
        + '# Transpile TypeScript without bundling\n'
        + 'npx esbuild src/index.ts --outfile=dist/index.js\n'
        + '\n'
        + '# Bundle multiple entry points into an output directory\n'
        + 'npx esbuild src/app.ts src/worker.ts --bundle --outdir=dist\n'
        + '\n'
        + '# Bundle with JSX for React\n'
        + 'npx esbuild src/App.tsx --bundle --jsx=automatic --outfile=dist/app.js'}</code></pre>

      <h3 style={subTitle}>{t.cliAdvanced}</h3>
      <pre style={codeBlock}><code>{'# Production build with minification and source maps\n'
        + 'npx esbuild src/index.ts \\\n'
        + '  --bundle \\\n'
        + '  --minify \\\n'
        + '  --sourcemap \\\n'
        + '  --target=es2020 \\\n'
        + '  --format=esm \\\n'
        + '  --outfile=dist/bundle.js\n'
        + '\n'
        + '# With tree-shaking and external packages\n'
        + 'npx esbuild src/index.ts \\\n'
        + '  --bundle \\\n'
        + '  --minify \\\n'
        + '  --tree-shaking=true \\\n'
        + '  --external:react \\\n'
        + '  --external:react-dom \\\n'
        + '  --format=esm \\\n'
        + '  --outfile=dist/bundle.js\n'
        + '\n'
        + '# With define for environment variables\n'
        + 'npx esbuild src/index.ts \\\n'
        + '  --bundle \\\n'
        + '  --define:process.env.NODE_ENV=\\"production\\" \\\n'
        + '  --define:__VERSION__=\\"1.2.3\\" \\\n'
        + '  --outfile=dist/bundle.js\n'
        + '\n'
        + '# Analyze bundle with metafile\n'
        + 'npx esbuild src/index.ts --bundle --metafile=meta.json --outfile=dist/bundle.js\n'
        + 'npx esbuild --analyze=verbose < meta.json'}</code></pre>

      {/* JavaScript API */}
      <h2 style={sectionTitle}>{t.h2JSApi}</h2>
      <p style={para}>{t.jsApiDesc}</p>

      <h3 style={subTitle}>build()</h3>
      <p style={para}>{t.jsApiBuild}</p>
      <pre style={codeBlock}><code>{'import * as esbuild from "esbuild";\n'
        + '\n'
        + '// Basic build\n'
        + 'const result = await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outfile: "dist/bundle.js",\n'
        + '  format: "esm",\n'
        + '  target: "es2020",\n'
        + '  minify: true,\n'
        + '  sourcemap: true,\n'
        + '  metafile: true,\n'
        + '});\n'
        + '\n'
        + '// Analyze the bundle\n'
        + 'const analysis = await esbuild.analyzeMetafile(result.metafile);\n'
        + 'console.log(analysis);\n'
        + '\n'
        + '// Library build with multiple entry points\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts", "src/utils.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "dist",\n'
        + '  format: "esm",\n'
        + '  splitting: true,\n'
        + '  platform: "node",\n'
        + '  target: "node18",\n'
        + '  external: ["express", "pg"],\n'
        + '  packages: "external",\n'
        + '});'}</code></pre>

      <h3 style={subTitle}>transform()</h3>
      <p style={para}>{t.jsApiTransform}</p>
      <pre style={codeBlock}><code>{'import * as esbuild from "esbuild";\n'
        + '\n'
        + '// Transform TypeScript to JavaScript\n'
        + 'const tsCode = "const greet = (name: string): string => `Hello \\${name}`;";\n'
        + 'const result = await esbuild.transform(tsCode, {\n'
        + '  loader: "ts",\n'
        + '  target: "es2020",\n'
        + '});\n'
        + 'console.log(result.code);\n'
        + '// const greet = (name) => `Hello \\${name}`;\n'
        + '\n'
        + '// Minify JavaScript\n'
        + 'const minified = await esbuild.transform("const x = 1 + 2;", {\n'
        + '  minify: true,\n'
        + '});\n'
        + 'console.log(minified.code); // "const x=3;"\n'
        + '\n'
        + '// Transform JSX\n'
        + 'const jsx = await esbuild.transform(\n'
        + '  "const App = () => <div>Hello</div>;",\n'
        + '  { loader: "jsx", jsx: "automatic" }\n'
        + ');\n'
        + 'console.log(jsx.code);'}</code></pre>

      <h3 style={subTitle}>context()</h3>
      <p style={para}>{t.jsApiContext}</p>
      <pre style={codeBlock}><code>{'import * as esbuild from "esbuild";\n'
        + '\n'
        + '// Create a long-lived build context\n'
        + 'const ctx = await esbuild.context({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "dist",\n'
        + '  format: "esm",\n'
        + '  sourcemap: true,\n'
        + '});\n'
        + '\n'
        + '// Manual rebuild (reuses cached state)\n'
        + 'const result = await ctx.rebuild();\n'
        + '\n'
        + '// Start watching for file changes\n'
        + 'await ctx.watch();\n'
        + 'console.log("Watching for changes...");\n'
        + '\n'
        + '// Start a dev server on port 8000\n'
        + 'const { host, port } = await ctx.serve({\n'
        + '  servedir: "public",\n'
        + '  port: 8000,\n'
        + '});\n'
        + 'console.log("Serving at http://" + host + ":" + port);\n'
        + '\n'
        + '// Clean up when done\n'
        + '// await ctx.dispose();'}</code></pre>

      {/* Content Types and Loaders */}
      <h2 style={sectionTitle}>{t.h2Loaders}</h2>
      <p style={para}>{t.loadersDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>js / jsx</strong> — {t.loaderJS.split(' — ')[1]}</li>
        <li style={listItem}><strong>ts / tsx</strong> — {t.loaderTS.split(' — ')[1]}</li>
        <li style={listItem}><strong>css</strong> — {t.loaderCSS.split(' — ')[1]}</li>
        <li style={listItem}><strong>json</strong> — {t.loaderJSON.split(' — ')[1]}</li>
        <li style={listItem}><strong>text</strong> — {t.loaderText.split(' — ')[1]}</li>
        <li style={listItem}><strong>binary</strong> — {t.loaderBinary.split(' — ')[1]}</li>
        <li style={listItem}><strong>base64</strong> — {t.loaderBase64.split(' — ')[1]}</li>
        <li style={listItem}><strong>file</strong> — {t.loaderFile.split(' — ')[1]}</li>
        <li style={listItem}><strong>dataurl</strong> — {t.loaderDataURL.split(' — ')[1]}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Configure loaders in the JavaScript API\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "dist",\n'
        + '  loader: {\n'
        + '    ".png": "file",\n'
        + '    ".svg": "dataurl",\n'
        + '    ".txt": "text",\n'
        + '    ".woff2": "file",\n'
        + '    ".json": "json",\n'
        + '    ".csv": "text",\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// CLI loader override\n'
        + '// npx esbuild src/index.ts --bundle --loader:.svg=dataurl --loader:.txt=text'}</code></pre>

      {/* Bundling and Output Formats */}
      <h2 style={sectionTitle}>{t.h2Bundle}</h2>
      <p style={para}>{t.bundleDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>ESM:</strong> {t.bundleESM.split(': ')[1]}</li>
        <li style={listItem}><strong>CommonJS:</strong> {t.bundleCJS.split(': ')[1]}</li>
        <li style={listItem}><strong>IIFE:</strong> {t.bundleIIFE.split(': ')[1]}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Build a library with both ESM and CJS outputs\n'
        + 'import * as esbuild from "esbuild";\n'
        + '\n'
        + 'const shared = {\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  minify: true,\n'
        + '  sourcemap: true,\n'
        + '  target: "es2020",\n'
        + '  external: ["react", "react-dom"],\n'
        + '};\n'
        + '\n'
        + '// ESM output\n'
        + 'await esbuild.build({\n'
        + '  ...shared,\n'
        + '  format: "esm",\n'
        + '  outfile: "dist/index.mjs",\n'
        + '});\n'
        + '\n'
        + '// CommonJS output\n'
        + 'await esbuild.build({\n'
        + '  ...shared,\n'
        + '  format: "cjs",\n'
        + '  outfile: "dist/index.cjs",\n'
        + '});\n'
        + '\n'
        + '// IIFE output for browsers (global variable)\n'
        + 'await esbuild.build({\n'
        + '  ...shared,\n'
        + '  format: "iife",\n'
        + '  globalName: "MyLibrary",\n'
        + '  outfile: "dist/index.global.js",\n'
        + '});'}</code></pre>

      {/* Code Splitting */}
      <h2 style={sectionTitle}>{t.h2CodeSplit}</h2>
      <p style={para}>{t.codeSplitDesc}</p>
      <pre style={codeBlock}><code>{'// Enable code splitting (ESM format required)\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/home.ts", "src/about.ts"],\n'
        + '  bundle: true,\n'
        + '  splitting: true,\n'
        + '  format: "esm",\n'
        + '  outdir: "dist",\n'
        + '  chunkNames: "chunks/[name]-[hash]",\n'
        + '});\n'
        + '\n'
        + '// Dynamic imports also create separate chunks\n'
        + '// src/home.ts\n'
        + '// const module = await import("./heavy-module.ts");\n'
        + '// module.doSomething();\n'
        + '\n'
        + '// Output structure:\n'
        + '// dist/\n'
        + '//   home.js           (entry)\n'
        + '//   about.js          (entry)\n'
        + '//   chunks/shared-A1B2.js  (shared code)'}</code></pre>

      {/* Tree-Shaking */}
      <h2 style={sectionTitle}>{t.h2TreeShake}</h2>
      <p style={para}>{t.treeShakeDesc}</p>
      <p style={{ ...para, background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '0.75rem 1rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong>Note:</strong> {t.treeShakeNote}
      </p>
      <pre style={codeBlock}><code>{'// package.json — Mark the package as side-effect-free\n'
        + '{\n'
        + '  "name": "my-library",\n'
        + '  "sideEffects": false\n'
        + '}\n'
        + '\n'
        + '// Or specify files with side effects\n'
        + '{\n'
        + '  "name": "my-library",\n'
        + '  "sideEffects": ["./src/polyfills.js", "*.css"]\n'
        + '}\n'
        + '\n'
        + '// esbuild automatically removes unused exports\n'
        + '// src/utils.ts\n'
        + '// export function usedFunction() { ... }   <-- kept\n'
        + '// export function unusedFunction() { ... }  <-- removed\n'
        + '\n'
        + '// Force tree-shaking even without bundle mode\n'
        + '// npx esbuild src/index.ts --tree-shaking=true --outfile=dist/out.js'}</code></pre>

      {/* Minification */}
      <h2 style={sectionTitle}>{t.h2Minify}</h2>
      <p style={para}>{t.minifyDesc}</p>
      <pre style={codeBlock}><code>{'// Enable all minification\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  minify: true,  // Shorthand for all three below\n'
        + '  outfile: "dist/bundle.js",\n'
        + '});\n'
        + '\n'
        + '// Fine-grained minification control\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  minifyWhitespace: true,   // Remove whitespace\n'
        + '  minifyIdentifiers: true,  // Shorten variable names\n'
        + '  minifySyntax: true,       // Simplify expressions\n'
        + '  outfile: "dist/bundle.js",\n'
        + '});\n'
        + '\n'
        + '// CSS minification works the same way\n'
        + '// npx esbuild src/styles.css --minify --outfile=dist/styles.min.css\n'
        + '\n'
        + '// Minification transforms examples:\n'
        + '// true && x   -->  x\n'
        + '// if (a) b(); else c();  -->  a ? b() : c()\n'
        + '// "use strict" removed in ESM\n'
        + '// Dead code after return/throw removed'}</code></pre>

      {/* Source Maps */}
      <h2 style={sectionTitle}>{t.h2SourceMaps}</h2>
      <p style={para}>{t.sourceMapsDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>linked:</strong> {t.sourceMapLinked.split(' — ')[1]}</li>
        <li style={listItem}><strong>inline:</strong> {t.sourceMapInline.split(' — ')[1]}</li>
        <li style={listItem}><strong>external:</strong> {t.sourceMapExternal.split(' — ')[1]}</li>
        <li style={listItem}><strong>both:</strong> {t.sourceMapBoth.split(' — ')[1]}</li>
      </ul>
      <pre style={codeBlock}><code>{'// Source map modes\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  minify: true,\n'
        + '  outfile: "dist/bundle.js",\n'
        + '\n'
        + '  // Option 1: Linked (production — separate .map file)\n'
        + '  sourcemap: true,  // or sourcemap: "linked"\n'
        + '\n'
        + '  // Option 2: Inline (development — embedded in output)\n'
        + '  // sourcemap: "inline",\n'
        + '\n'
        + '  // Option 3: External (error tracking — no comment)\n'
        + '  // sourcemap: "external",\n'
        + '\n'
        + '  // Include source content in the map for offline debugging\n'
        + '  sourcesContent: true,\n'
        + '});'}</code></pre>

      {/* Plugin API */}
      <h2 style={sectionTitle}>{t.h2Plugins}</h2>
      <p style={para}>{t.pluginsDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
        <li style={listItem}><strong>onResolve:</strong> {t.pluginsResolve.split(' — ')[1]}</li>
        <li style={listItem}><strong>onLoad:</strong> {t.pluginsLoad.split(' — ')[1]}</li>
      </ul>
      <p style={para}>{t.pluginsExample}</p>
      <pre style={codeBlock}><code>{'import * as esbuild from "esbuild";\n'
        + 'import fs from "fs";\n'
        + '\n'
        + '// Plugin: Load .txt files as ES modules\n'
        + 'const txtPlugin = {\n'
        + '  name: "txt-loader",\n'
        + '  setup(build) {\n'
        + '    build.onLoad({ filter: /\\.txt$/ }, async (args) => {\n'
        + '      const text = await fs.promises.readFile(args.path, "utf8");\n'
        + '      return {\n'
        + '        contents: "export default " + JSON.stringify(text) + ";",\n'
        + '        loader: "js",\n'
        + '      };\n'
        + '    });\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Plugin: Replace environment variables at build time\n'
        + 'const envPlugin = {\n'
        + '  name: "env-loader",\n'
        + '  setup(build) {\n'
        + '    build.onResolve({ filter: /^env$/ }, (args) => ({\n'
        + '      path: args.path,\n'
        + '      namespace: "env-ns",\n'
        + '    }));\n'
        + '    build.onLoad({ filter: /.*/, namespace: "env-ns" }, () => ({\n'
        + '      contents: "export default " + JSON.stringify(process.env) + ";",\n'
        + '      loader: "json",\n'
        + '    }));\n'
        + '  },\n'
        + '};\n'
        + '\n'
        + '// Use plugins in build\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outfile: "dist/bundle.js",\n'
        + '  plugins: [txtPlugin, envPlugin],\n'
        + '});'}</code></pre>

      {/* Watch Mode */}
      <h2 style={sectionTitle}>{t.h2Watch}</h2>
      <p style={para}>{t.watchDesc}</p>
      <pre style={codeBlock}><code>{'// Watch mode using the context API\n'
        + 'import * as esbuild from "esbuild";\n'
        + '\n'
        + 'const ctx = await esbuild.context({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "dist",\n'
        + '  sourcemap: true,\n'
        + '  logLevel: "info",\n'
        + '});\n'
        + '\n'
        + '// Start watching — rebuilds on file changes\n'
        + 'await ctx.watch();\n'
        + 'console.log("Watching for file changes...");\n'
        + '\n'
        + '// To stop watching and clean up:\n'
        + '// await ctx.dispose();\n'
        + '\n'
        + '// CLI watch mode\n'
        + '// npx esbuild src/index.ts --bundle --outdir=dist --watch'}</code></pre>

      {/* Serve Mode */}
      <h2 style={sectionTitle}>{t.h2Serve}</h2>
      <p style={para}>{t.serveDesc}</p>
      <pre style={codeBlock}><code>{'// Serve mode with watch integration\n'
        + 'import * as esbuild from "esbuild";\n'
        + '\n'
        + 'const ctx = await esbuild.context({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "public/dist",\n'
        + '  sourcemap: true,\n'
        + '});\n'
        + '\n'
        + '// Start the dev server\n'
        + 'const { host, port } = await ctx.serve({\n'
        + '  servedir: "public",\n'
        + '  port: 3000,\n'
        + '  fallback: "public/index.html", // SPA fallback\n'
        + '});\n'
        + '\n'
        + 'console.log("Dev server: http://" + host + ":" + port);\n'
        + '\n'
        + '// Every HTTP request triggers a rebuild if files changed\n'
        + '// No need to call ctx.watch() separately\n'
        + '\n'
        + '// CLI serve mode\n'
        + '// npx esbuild src/index.ts --bundle --outdir=public/dist --servedir=public --serve=3000'}</code></pre>

      {/* Target Environments */}
      <h2 style={sectionTitle}>{t.h2Target}</h2>
      <p style={para}>{t.targetDesc}</p>
      <pre style={codeBlock}><code>{'// Target a JavaScript version\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  target: "es2020",\n'
        + '  outfile: "dist/bundle.js",\n'
        + '});\n'
        + '\n'
        + '// Target specific browsers\n'
        + '// target: ["chrome90", "firefox88", "safari14", "edge90"]\n'
        + '// Target Node.js: target: "node18"\n'
        + '// Target latest: target: "esnext"\n'
        + '\n'
        + '// Syntax transforms based on target:\n'
        + '// Optional chaining (?.)   -> target < es2020\n'
        + '// Nullish coalescing (??)  -> target < es2020\n'
        + '// Class fields             -> target < es2022\n'
        + '// Async/await              -> target < es2017'}</code></pre>

      {/* Platform Configuration */}
      <h2 style={sectionTitle}>{t.h2Platform}</h2>
      <p style={para}>{t.platformDesc}</p>
      <pre style={codeBlock}><code>{'// Browser platform (default) — resolves "browser" field in package.json\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/app.ts"],\n'
        + '  bundle: true,\n'
        + '  platform: "browser",\n'
        + '  outfile: "dist/app.js",\n'
        + '});\n'
        + '\n'
        + '// Node.js platform — marks fs, path, crypto as external\n'
        + 'await esbuild.build({\n'
        + '  entryPoints: ["src/server.ts"],\n'
        + '  bundle: true,\n'
        + '  platform: "node",\n'
        + '  target: "node18",\n'
        + '  outfile: "dist/server.js",\n'
        + '});\n'
        + '\n'
        + '// Neutral platform — no defaults, full control\n'
        + '// platform: "neutral"'}</code></pre>

      {/* Define and Environment Variables */}
      <h2 style={sectionTitle}>{t.h2Define}</h2>
      <p style={para}>{t.defineDesc}</p>
      <pre style={codeBlock}><code>{'await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outfile: "dist/bundle.js",\n'
        + '  define: {\n'
        + '    "process.env.NODE_ENV": \'"production"\',\n'
        + '    "__DEV__": "false",\n'
        + '    "__VERSION__": \'"1.2.3"\',\n'
        + '    "process.env.API_URL": \'"https://api.example.com"\',\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + '// In source code, this enables dead code elimination:\n'
        + '//\n'
        + '// if (process.env.NODE_ENV === "development") {\n'
        + '//   // This entire block is removed in production\n'
        + '//   enableDevTools();\n'
        + '// }\n'
        + '//\n'
        + '// if (__DEV__) {\n'
        + '//   console.log("debug info"); // Removed\n'
        + '// }\n'
        + '\n'
        + '// CLI equivalent:\n'
        + '// npx esbuild src/index.ts --bundle \\\n'
        + '//   --define:process.env.NODE_ENV=\\"production\\" \\\n'
        + '//   --define:__DEV__=false'}</code></pre>

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
      <pre style={codeBlock}><code>{'// Complete production build script (build.mjs)\n'
        + 'import * as esbuild from "esbuild";\n'
        + '\n'
        + 'const isProduction = process.env.NODE_ENV === "production";\n'
        + '\n'
        + 'const result = await esbuild.build({\n'
        + '  entryPoints: ["src/index.ts"],\n'
        + '  bundle: true,\n'
        + '  outdir: "dist",\n'
        + '  format: "esm",\n'
        + '  splitting: true,\n'
        + '  target: "es2020",\n'
        + '  platform: "browser",\n'
        + '  minify: isProduction,\n'
        + '  sourcemap: isProduction ? "linked" : "inline",\n'
        + '  metafile: true,\n'
        + '  define: {\n'
        + '    "process.env.NODE_ENV": isProduction ? \'"production"\' : \'"development"\',\n'
        + '  },\n'
        + '  loader: {\n'
        + '    ".png": "file",\n'
        + '    ".svg": "dataurl",\n'
        + '    ".woff2": "file",\n'
        + '  },\n'
        + '  chunkNames: "chunks/[name]-[hash]",\n'
        + '  assetNames: "assets/[name]-[hash]",\n'
        + '});\n'
        + '\n'
        + 'if (isProduction) {\n'
        + '  const analysis = await esbuild.analyzeMetafile(result.metafile);\n'
        + '  console.log(analysis);\n'
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
