'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Bun Complete Guide 2026: The All-in-One JavaScript Runtime',
    description: 'Master Bun runtime with this comprehensive guide covering installation, Bun.serve HTTP server, bun install package manager, bun build bundler, bun test runner, SQLite, file I/O, shell scripting, macros, and comparison with Node.js and Deno.',
    intro: 'Bun is an all-in-one JavaScript runtime, package manager, bundler, and test runner built from the ground up for speed. Written in Zig and powered by the JavaScriptCore engine (the same engine used by Safari), Bun delivers dramatically faster startup times, package installs, and HTTP throughput compared to Node.js. This guide covers every major feature of Bun in 2026, from the basics to advanced capabilities like SQLite integration, shell scripting, and macros.',
    tldr: 'Bun is a fast, all-in-one JavaScript and TypeScript runtime written in Zig. It replaces Node.js, npm, webpack, and Jest with a single tool. It uses JavaScriptCore instead of V8, installs packages 25x faster than npm, has a built-in bundler, test runner, SQLite client, and HTTP server. It is production-ready in 2026 with near-complete Node.js compatibility.',
    keyTakeaway1: 'Bun uses JavaScriptCore (WebKit engine) and Zig for maximum performance, achieving 4x faster startup than Node.js.',
    keyTakeaway2: 'bun install is up to 25x faster than npm thanks to binary lockfiles, global cache, and native code.',
    keyTakeaway3: 'Bun.serve() provides a high-performance HTTP server handling 100K+ requests per second out of the box.',
    keyTakeaway4: 'Built-in SQLite, test runner, bundler, and .env loading eliminate the need for external dependencies.',
    keyTakeaway5: 'Near-complete Node.js API compatibility means most npm packages work without modification.',
    h2WhyFast: 'Why Bun Is Fast: Zig and JavaScriptCore',
    whyFastDesc: 'Bun achieves its speed through two key architectural decisions. First, it is written in Zig, a low-level systems language designed for performance-critical software. Zig has no hidden control flow, no garbage collector, and compiles to highly optimized machine code. Second, Bun uses JavaScriptCore (JSC) from WebKit rather than V8 (used by Node.js and Deno). JSC has a faster startup time because it uses a lightweight interpreter tier before JIT compilation kicks in, whereas V8 eagerly compiles code. This means Bun scripts start executing almost instantly.',
    h2Install: 'Installation and Getting Started',
    installDesc: 'Bun installs as a single binary with no external dependencies. It works on macOS, Linux, and Windows (via WSL or native).',
    h2PackageManager: 'Package Manager: bun install',
    packageManagerDesc: 'Bun includes the fastest JavaScript package manager available. It reads package.json, resolves dependencies from the npm registry, and writes to node_modules. The speed advantage comes from a binary lockfile (bun.lockb), parallel HTTP requests using native code, a global package cache, and symlink-based node_modules similar to pnpm.',
    h2Bundler: 'Bundler: bun build',
    bundlerDesc: 'Bun includes a production-ready JavaScript and TypeScript bundler. It supports tree shaking, code splitting, minification, source maps, and multiple output targets (browser, node, bun). It aims to be a faster alternative to esbuild and webpack for most use cases.',
    h2TestRunner: 'Test Runner: bun test',
    testRunnerDesc: 'Bun has a built-in test runner with a Jest-compatible API. It supports describe, test, expect, beforeAll, afterAll, beforeEach, afterEach, mocking, snapshots, and code coverage. Tests run significantly faster than Jest because there is no separate transpilation step and the runtime itself is faster.',
    h2HttpServer: 'HTTP Server: Bun.serve()',
    httpServerDesc: 'Bun.serve() is a high-performance HTTP server built into the runtime. It uses the Web standard Request and Response APIs, supports WebSocket upgrades, TLS, streaming, and can handle over 100,000 requests per second on modest hardware.',
    h2FileIO: 'File I/O: Bun.file() and Bun.write()',
    fileIODesc: 'Bun provides optimized file I/O APIs that are significantly faster than Node.js equivalents. Bun.file() creates a lazy reference to a file, and Bun.write() writes data to disk. Both support text, JSON, ArrayBuffer, Blob, and streams.',
    h2SQLite: 'Built-in SQLite: bun:sqlite',
    sqliteDesc: 'Bun includes a native SQLite client via the bun:sqlite module. There is no need to install any npm package. It is one of the fastest SQLite bindings available for any JavaScript runtime, supporting prepared statements, transactions, WAL mode, and typed results.',
    h2Shell: 'Shell Scripting: Bun Shell',
    shellDesc: 'Bun includes a cross-platform shell (Bun.$) that lets you run shell commands directly from JavaScript or TypeScript. It works on macOS, Linux, and Windows without requiring bash. You can pipe commands, redirect output, and use template literals for interpolation.',
    h2Macros: 'Macros: Compile-Time Code Execution',
    macrosDesc: 'Bun macros allow you to run JavaScript functions at bundle time and inline the results into the output. This is useful for embedding build metadata, reading configuration files, or generating code at compile time rather than runtime.',
    h2Comparison: 'Bun vs Node.js vs Deno: Feature Comparison',
    comparisonDesc: 'Here is a detailed comparison of the three major JavaScript runtimes in 2026.',
    h2BestPractices: 'Best Practices for Using Bun in Production',
    bp1: 'Commit bun.lockb to version control for reproducible installs. Use --frozen-lockfile in CI pipelines to ensure lockfile consistency.',
    bp2: 'Use Bun.serve() for new HTTP services. It outperforms Express and Fastify on raw throughput while using standard Web APIs.',
    bp3: 'Leverage the built-in SQLite for local databases, caching layers, and session storage instead of adding external dependencies.',
    bp4: 'Use bun build with --minify and --splitting for production frontend bundles. Enable source maps for debugging.',
    bp5: 'Take advantage of automatic .env loading. Bun reads .env, .env.local, and .env.production without the dotenv package.',
    bp6: 'Write tests using bun test with the built-in Jest-compatible API. No configuration or extra packages needed.',
    h2Migration: 'Migrating from Node.js to Bun',
    migrationDesc: 'Migrating an existing Node.js project to Bun is straightforward because Bun implements the vast majority of Node.js APIs. Here is a step-by-step approach.',
    faq1Q: 'Is Bun production-ready in 2026?',
    faq1A: 'Yes. Bun 1.0 reached stability in September 2023, and subsequent 1.x releases have achieved near-complete Node.js API compatibility. Companies like Vercel, Figma, and Snap use Bun in production. The runtime passes over 99% of the Node.js test suite.',
    faq2Q: 'Does Bun work with all npm packages?',
    faq2A: 'Almost all npm packages work with Bun. It implements Node.js built-in modules including fs, path, crypto, http, net, stream, and child_process. Edge cases exist for packages that use native Node.js C++ addons (.node files), though most popular native packages have been ported.',
    faq3Q: 'Can I use Bun with Next.js, Remix, or Astro?',
    faq3A: 'Yes for the package manager (bun install) and script runner (bun run dev). For the runtime, Next.js and Astro have experimental Bun support. Remix works well with Bun as the runtime. The package manager is fully compatible with all frameworks today.',
    faq4Q: 'How does Bun compare to Deno?',
    faq4A: 'Both are modern JavaScript runtimes aiming to improve on Node.js. Bun focuses on raw speed and Node.js drop-in compatibility, while Deno focuses on security (permission system) and web standards. Bun is faster for startup, installs, and HTTP throughput. Deno has a more mature permission model and better TypeScript type checking.',
    faq5Q: 'Why does Bun use JavaScriptCore instead of V8?',
    faq5A: 'JavaScriptCore (JSC) from WebKit has a faster startup time than V8 because it starts with a lightweight interpreter before JIT-compiling hot paths. This architecture is ideal for CLI tools, serverless functions, and short-lived scripts where startup time matters. V8 eagerly compiles code which helps long-running servers but hurts startup.',
    faq6Q: 'Does Bun support TypeScript natively?',
    faq6A: 'Yes. Bun transpiles TypeScript files on the fly with no configuration needed. You can run .ts and .tsx files directly with bun run file.ts. The transpiler is built into the runtime and is significantly faster than tsc or ts-node. Note that Bun transpiles but does not type-check; use tsc --noEmit for type checking.',
    faq7Q: 'What is the Bun binary lockfile (bun.lockb)?',
    faq7A: 'bun.lockb is a binary-format lockfile that stores resolved package versions, checksums, and registry URLs. It is much faster to parse than JSON-based lockfiles like package-lock.json or yarn.lock. You can view its contents in human-readable form by running bun bun.lockb. Commit it to version control for reproducible installs.',
    faq8Q: 'Can I use Bun for frontend bundling in production?',
    faq8A: 'Yes. bun build supports tree shaking, code splitting, minification, CSS bundling, and multiple output formats. It handles JSX, TypeScript, and CSS out of the box. For large-scale production apps, it is competitive with esbuild and Vite, though the ecosystem plugins are more limited.',
    faqTitle: 'Frequently Asked Questions',
  },
  zh: {
    title: 'Bun 完全指南 2026：全能 JavaScript 运行时',
    description: '全面掌握 Bun 运行时，涵盖安装、Bun.serve HTTP 服务器、bun install 包管理器、bun build 打包器、bun test 测试运行器、SQLite、文件 I/O、Shell 脚本、宏以及与 Node.js 和 Deno 的对比。',
    intro: 'Bun 是一个从头构建的全能 JavaScript 运行时、包管理器、打包器和测试运行器，专注于速度。它用 Zig 编写，由 JavaScriptCore 引擎（Safari 使用的同一引擎）驱动，与 Node.js 相比，Bun 提供了显著更快的启动时间、包安装和 HTTP 吞吐量。本指南涵盖 2026 年 Bun 的每个主要功能。',
    tldr: 'Bun 是一个用 Zig 编写的快速、全能 JavaScript 和 TypeScript 运行时。它用单一工具替代了 Node.js、npm、webpack 和 Jest。它使用 JavaScriptCore 而非 V8，安装包比 npm 快 25 倍，内置打包器、测试运行器、SQLite 客户端和 HTTP 服务器。',
    keyTakeaway1: 'Bun 使用 JavaScriptCore（WebKit 引擎）和 Zig 实现最高性能，启动速度比 Node.js 快 4 倍。',
    keyTakeaway2: 'bun install 通过二进制锁文件、全局缓存和原生代码，比 npm 快多达 25 倍。',
    keyTakeaway3: 'Bun.serve() 提供开箱即用的高性能 HTTP 服务器，可处理每秒 10 万以上请求。',
    keyTakeaway4: '内置 SQLite、测试运行器、打包器和 .env 加载消除了对外部依赖的需求。',
    keyTakeaway5: '近乎完整的 Node.js API 兼容性意味着大多数 npm 包无需修改即可工作。',
    h2WhyFast: '为什么 Bun 很快：Zig 和 JavaScriptCore',
    whyFastDesc: 'Bun 通过两个关键架构决策实现速度。首先，它用 Zig 编写，一种为性能关键软件设计的低级系统语言。其次，Bun 使用 WebKit 的 JavaScriptCore 而非 V8，JSC 启动时间更快，因为它在 JIT 编译之前使用轻量级解释器层。',
    h2Install: '安装和入门',
    installDesc: 'Bun 作为单个二进制文件安装，无外部依赖。支持 macOS、Linux 和 Windows。',
    h2PackageManager: '包管理器：bun install',
    packageManagerDesc: 'Bun 包含最快的 JavaScript 包管理器。速度优势来自二进制锁文件、并行 HTTP 请求、全局包缓存和基于符号链接的 node_modules。',
    h2Bundler: '打包器：bun build',
    bundlerDesc: 'Bun 包含生产就绪的打包器，支持 tree shaking、代码分割、压缩、source maps 和多种输出目标。',
    h2TestRunner: '测试运行器：bun test',
    testRunnerDesc: 'Bun 有一个内置的 Jest 兼容 API 测试运行器，支持 describe、test、expect、mock 和代码覆盖率。',
    h2HttpServer: 'HTTP 服务器：Bun.serve()',
    httpServerDesc: 'Bun.serve() 是内置的高性能 HTTP 服务器，使用 Web 标准的 Request 和 Response API。',
    h2FileIO: '文件 I/O：Bun.file() 和 Bun.write()',
    fileIODesc: 'Bun 提供优化的文件 I/O API，比 Node.js 等效方法显著更快。',
    h2SQLite: '内置 SQLite：bun:sqlite',
    sqliteDesc: 'Bun 通过 bun:sqlite 模块包含原生 SQLite 客户端，无需安装任何 npm 包。',
    h2Shell: 'Shell 脚本：Bun Shell',
    shellDesc: 'Bun 包含跨平台 shell（Bun.$），可直接从 JavaScript 或 TypeScript 运行 shell 命令。',
    h2Macros: '宏：编译时代码执行',
    macrosDesc: 'Bun 宏允许在打包时运行 JavaScript 函数并将结果内联到输出中。',
    h2Comparison: 'Bun vs Node.js vs Deno：功能对比',
    comparisonDesc: '以下是 2026 年三大 JavaScript 运行时的详细对比。',
    h2BestPractices: '在生产环境使用 Bun 的最佳实践',
    bp1: '将 bun.lockb 提交到版本控制。在 CI 中使用 --frozen-lockfile。',
    bp2: '新 HTTP 服务使用 Bun.serve()，它在原始吞吐量上优于 Express 和 Fastify。',
    bp3: '利用内置 SQLite 做本地数据库、缓存层和会话存储。',
    bp4: '使用 bun build 配合 --minify 和 --splitting 进行生产前端打包。',
    bp5: '利用自动 .env 加载，无需 dotenv 包。',
    bp6: '使用 bun test 及内置 Jest 兼容 API 编写测试。',
    h2Migration: '从 Node.js 迁移到 Bun',
    migrationDesc: '将现有 Node.js 项目迁移到 Bun 非常简单，因为 Bun 实现了绝大多数 Node.js API。',
    faq1Q: '2026 年 Bun 是否可以用于生产？',
    faq1A: '是的。Bun 1.0 于 2023 年 9 月达到稳定，后续 1.x 版本实现了近乎完整的 Node.js API 兼容性。',
    faq2Q: 'Bun 与所有 npm 包兼容吗？',
    faq2A: '几乎所有 npm 包都可以在 Bun 中工作。使用原生 C++ 插件的包可能存在边缘情况。',
    faq3Q: 'Bun 可以与 Next.js、Remix 或 Astro 一起使用吗？',
    faq3A: '可以用于包管理器和脚本运行器。运行时方面，Next.js 和 Astro 有实验性支持。',
    faq4Q: 'Bun 与 Deno 相比如何？',
    faq4A: 'Bun 专注于速度和 Node.js 兼容性，Deno 专注于安全性和 Web 标准。',
    faq5Q: '为什么 Bun 使用 JavaScriptCore 而非 V8？',
    faq5A: 'JSC 启动时间更快，因为它在 JIT 编译之前使用轻量级解释器层，适合 CLI 工具和 Serverless。',
    faq6Q: 'Bun 原生支持 TypeScript 吗？',
    faq6A: '是的。Bun 即时转译 TypeScript 文件，无需配置。可以直接运行 .ts 和 .tsx 文件。',
    faq7Q: 'Bun 二进制锁文件（bun.lockb）是什么？',
    faq7A: 'bun.lockb 是二进制格式的锁文件，比 JSON 锁文件解析快得多。',
    faq8Q: 'Bun 可以用于生产前端打包吗？',
    faq8A: '可以。bun build 支持 tree shaking、代码分割、压缩和 CSS 打包。',
    faqTitle: '常见问题',
  },
};

/* ── code block strings (using string concatenation, NO template literal variables) ── */

const codeInstall =
  '# Install Bun (macOS / Linux)\n' +
  'curl -fsSL https://bun.sh/install | bash\n' +
  '\n' +
  '# Install via npm (alternative)\n' +
  'npm install -g bun\n' +
  '\n' +
  '# Install via Homebrew (macOS)\n' +
  'brew install oven-sh/bun/bun\n' +
  '\n' +
  '# Windows (native support)\n' +
  'powershell -c "irm bun.sh/install.ps1 | iex"\n' +
  '\n' +
  '# Verify installation\n' +
  'bun --version  # 1.x.x\n' +
  '\n' +
  '# Create a new project\n' +
  'bun init\n' +
  '# Creates: package.json, tsconfig.json, index.ts, README.md\n' +
  '\n' +
  '# Run a TypeScript file directly (no config needed)\n' +
  'bun run index.ts\n' +
  '\n' +
  '# Run with watch mode (auto-restart on changes)\n' +
  'bun --watch run index.ts';

const codePackageManager =
  '# Install all dependencies from package.json\n' +
  'bun install\n' +
  '\n' +
  '# Add a dependency\n' +
  'bun add express\n' +
  'bun add zod @types/node\n' +
  '\n' +
  '# Add dev dependency\n' +
  'bun add -d typescript prettier eslint\n' +
  '\n' +
  '# Add global package\n' +
  'bun add -g serve\n' +
  '\n' +
  '# Remove a package\n' +
  'bun remove lodash\n' +
  '\n' +
  '# Update all packages\n' +
  'bun update\n' +
  '\n' +
  '# Run a script from package.json\n' +
  'bun run build\n' +
  'bun run dev\n' +
  '\n' +
  '# CI mode: fail if lockfile is out of date\n' +
  'bun install --frozen-lockfile\n' +
  '\n' +
  '# View lockfile as human-readable text\n' +
  'bun bun.lockb\n' +
  '\n' +
  '# Execute a package binary (like npx)\n' +
  'bunx create-next-app@latest my-app\n' +
  'bunx prettier --write .';

const codeBundler =
  '# Bundle for the browser\n' +
  'bun build ./src/index.ts --outdir ./dist --target browser\n' +
  '\n' +
  '# Bundle for Node.js\n' +
  'bun build ./src/server.ts --outdir ./dist --target node\n' +
  '\n' +
  '# Bundle for Bun runtime\n' +
  'bun build ./src/app.ts --outdir ./dist --target bun\n' +
  '\n' +
  '# With minification and code splitting\n' +
  'bun build ./src/index.ts \\\n' +
  '  --outdir ./dist \\\n' +
  '  --target browser \\\n' +
  '  --minify \\\n' +
  '  --splitting \\\n' +
  '  --sourcemap=external\n' +
  '\n' +
  '# Programmatic API (build.ts)\n' +
  'const result = await Bun.build({\n' +
  '  entrypoints: ["./src/index.ts", "./src/worker.ts"],\n' +
  '  outdir: "./dist",\n' +
  '  target: "browser",\n' +
  '  minify: true,\n' +
  '  splitting: true,\n' +
  '  sourcemap: "external",\n' +
  '  naming: "[dir]/[name]-[hash].[ext]",\n' +
  '  define: {\n' +
  '    "process.env.NODE_ENV": JSON.stringify("production"),\n' +
  '  },\n' +
  '});\n' +
  '\n' +
  'if (!result.success) {\n' +
  '  for (const msg of result.logs) {\n' +
  '    console.error(msg);\n' +
  '  }\n' +
  '}';

const codeTestRunner =
  '// math.test.ts\n' +
  'import { describe, test, expect, beforeAll, mock } from "bun:test";\n' +
  '\n' +
  'describe("math utilities", () => {\n' +
  '  test("adds two numbers", () => {\n' +
  '    expect(2 + 3).toBe(5);\n' +
  '  });\n' +
  '\n' +
  '  test("array contains value", () => {\n' +
  '    const fruits = ["apple", "banana", "cherry"];\n' +
  '    expect(fruits).toContain("banana");\n' +
  '    expect(fruits).toHaveLength(3);\n' +
  '  });\n' +
  '\n' +
  '  test("object matching", () => {\n' +
  '    const user = { name: "Alice", age: 30, role: "admin" };\n' +
  '    expect(user).toMatchObject({ name: "Alice", role: "admin" });\n' +
  '  });\n' +
  '\n' +
  '  test("async operations", async () => {\n' +
  '    const data = await Promise.resolve({ status: "ok" });\n' +
  '    expect(data.status).toBe("ok");\n' +
  '  });\n' +
  '\n' +
  '  test("error throwing", () => {\n' +
  '    expect(() => { throw new Error("fail"); }).toThrow("fail");\n' +
  '  });\n' +
  '});\n' +
  '\n' +
  '// Mocking example\n' +
  'const mockFetch = mock(() => Promise.resolve({ ok: true }));\n' +
  'test("mock function", () => {\n' +
  '  mockFetch();\n' +
  '  expect(mockFetch).toHaveBeenCalledTimes(1);\n' +
  '});';

const codeTestRunnerCLI =
  '# Run all tests\n' +
  'bun test\n' +
  '\n' +
  '# Run specific test file\n' +
  'bun test src/utils.test.ts\n' +
  '\n' +
  '# Watch mode\n' +
  'bun test --watch\n' +
  '\n' +
  '# With code coverage\n' +
  'bun test --coverage\n' +
  '\n' +
  '# Filter tests by name\n' +
  'bun test --test-name-pattern "math"\n' +
  '\n' +
  '# Set timeout (default 5000ms)\n' +
  'bun test --timeout 10000';

const codeHttpServer =
  '// server.ts — High-performance HTTP server\n' +
  'const server = Bun.serve({\n' +
  '  port: 3000,\n' +
  '  fetch(req) {\n' +
  '    const url = new URL(req.url);\n' +
  '\n' +
  '    if (url.pathname === "/") {\n' +
  '      return new Response("Hello from Bun!");\n' +
  '    }\n' +
  '\n' +
  '    if (url.pathname === "/api/users") {\n' +
  '      const users = [\n' +
  '        { id: 1, name: "Alice" },\n' +
  '        { id: 2, name: "Bob" },\n' +
  '      ];\n' +
  '      return Response.json(users);\n' +
  '    }\n' +
  '\n' +
  '    if (url.pathname === "/api/stream") {\n' +
  '      const stream = new ReadableStream({\n' +
  '        start(controller) {\n' +
  '          controller.enqueue("chunk 1\\n");\n' +
  '          controller.enqueue("chunk 2\\n");\n' +
  '          controller.close();\n' +
  '        },\n' +
  '      });\n' +
  '      return new Response(stream);\n' +
  '    }\n' +
  '\n' +
  '    return new Response("Not Found", { status: 404 });\n' +
  '  },\n' +
  '});\n' +
  '\n' +
  'console.log("Server running at http://localhost:" + server.port);';

const codeHttpWebSocket =
  '// WebSocket server with Bun.serve()\n' +
  'Bun.serve({\n' +
  '  port: 3000,\n' +
  '  fetch(req, server) {\n' +
  '    // Upgrade HTTP request to WebSocket\n' +
  '    if (server.upgrade(req)) {\n' +
  '      return; // Return nothing if upgraded\n' +
  '    }\n' +
  '    return new Response("Upgrade failed", { status: 500 });\n' +
  '  },\n' +
  '  websocket: {\n' +
  '    open(ws) {\n' +
  '      console.log("Client connected");\n' +
  '      ws.send("Welcome!");\n' +
  '    },\n' +
  '    message(ws, message) {\n' +
  '      console.log("Received:", message);\n' +
  '      ws.send("Echo: " + message);\n' +
  '    },\n' +
  '    close(ws) {\n' +
  '      console.log("Client disconnected");\n' +
  '    },\n' +
  '  },\n' +
  '});';

const codeFileIO =
  '// Reading files\n' +
  'const file = Bun.file("./data.json");\n' +
  'console.log(file.size);       // File size in bytes\n' +
  'console.log(file.type);       // MIME type\n' +
  '\n' +
  'const text = await file.text();       // Read as string\n' +
  'const json = await file.json();       // Parse as JSON\n' +
  'const buffer = await file.arrayBuffer(); // Read as ArrayBuffer\n' +
  'const bytes = await file.bytes();     // Read as Uint8Array\n' +
  '\n' +
  '// Writing files\n' +
  'await Bun.write("output.txt", "Hello, Bun!");\n' +
  'await Bun.write("data.json", JSON.stringify({ key: "value" }));\n' +
  'await Bun.write("copy.txt", Bun.file("original.txt"));\n' +
  '\n' +
  '// Write Response body to file\n' +
  'const response = await fetch("https://example.com/data.json");\n' +
  'await Bun.write("downloaded.json", response);\n' +
  '\n' +
  '// Streaming large files\n' +
  'const writer = Bun.file("large-output.txt").writer();\n' +
  'writer.write("line 1\\n");\n' +
  'writer.write("line 2\\n");\n' +
  'writer.flush();\n' +
  'writer.end();';

const codeSQLite =
  '// Built-in SQLite — no npm install needed\n' +
  'import { Database } from "bun:sqlite";\n' +
  '\n' +
  '// Open or create a database\n' +
  'const db = new Database("myapp.db");\n' +
  '\n' +
  '// Enable WAL mode for better concurrent performance\n' +
  'db.exec("PRAGMA journal_mode = WAL");\n' +
  '\n' +
  '// Create a table\n' +
  'db.exec(`\n' +
  '  CREATE TABLE IF NOT EXISTS users (\n' +
  '    id INTEGER PRIMARY KEY AUTOINCREMENT,\n' +
  '    name TEXT NOT NULL,\n' +
  '    email TEXT UNIQUE NOT NULL,\n' +
  '    created_at TEXT DEFAULT CURRENT_TIMESTAMP\n' +
  '  )\n' +
  '`);\n' +
  '\n' +
  '// Prepared statements (safe from SQL injection)\n' +
  'const insertUser = db.prepare(\n' +
  '  "INSERT INTO users (name, email) VALUES (?, ?)"\n' +
  ');\n' +
  'insertUser.run("Alice", "alice@example.com");\n' +
  'insertUser.run("Bob", "bob@example.com");\n' +
  '\n' +
  '// Query with typed results\n' +
  'const allUsers = db.prepare("SELECT * FROM users").all();\n' +
  'console.log(allUsers);\n' +
  '// [{ id: 1, name: "Alice", ... }, { id: 2, name: "Bob", ... }]\n' +
  '\n' +
  '// Transactions for batch operations\n' +
  'const insertMany = db.transaction((users) => {\n' +
  '  for (const user of users) {\n' +
  '    insertUser.run(user.name, user.email);\n' +
  '  }\n' +
  '});\n' +
  '\n' +
  'insertMany([\n' +
  '  { name: "Charlie", email: "charlie@example.com" },\n' +
  '  { name: "Diana", email: "diana@example.com" },\n' +
  ']);';

const codeShell =
  '// Bun Shell — cross-platform shell scripting\n' +
  'import { $ } from "bun";\n' +
  '\n' +
  '// Run a command and get output\n' +
  'const result = await $`ls -la`.text();\n' +
  'console.log(result);\n' +
  '\n' +
  '// Pipe commands\n' +
  'const count = await $`cat package.json | wc -l`.text();\n' +
  'console.log("Lines:", count.trim());\n' +
  '\n' +
  '// Use variables safely (auto-escaped)\n' +
  'const filename = "my file.txt";\n' +
  'await $`touch ${filename}`;\n' +
  'await $`echo "hello" > ${filename}`;\n' +
  '\n' +
  '// Redirect output to a file\n' +
  'await $`echo "build log" > build.log`;\n' +
  '\n' +
  '// Check exit code\n' +
  'const proc = await $`grep -r "TODO" src/`.nothrow();\n' +
  'if (proc.exitCode === 0) {\n' +
  '  console.log("Found TODOs:", proc.text());\n' +
  '} else {\n' +
  '  console.log("No TODOs found");\n' +
  '}\n' +
  '\n' +
  '// Run in background\n' +
  'const server = $`bun run server.ts`.spawn();\n' +
  '// ... do other work ...\n' +
  'server.kill();';

const codeMacros =
  '// macros.ts — runs at compile time, NOT runtime\n' +
  'export function getBuildTime() {\n' +
  '  return new Date().toISOString();\n' +
  '}\n' +
  '\n' +
  'export function getGitCommit() {\n' +
  '  const proc = Bun.spawnSync(["git", "rev-parse", "--short", "HEAD"]);\n' +
  '  return proc.stdout.toString().trim();\n' +
  '}\n' +
  '\n' +
  '// app.ts — import with { type: "macro" }\n' +
  'import { getBuildTime, getGitCommit } from "./macros" with { type: "macro" };\n' +
  '\n' +
  '// These calls are evaluated at bundle time\n' +
  '// and replaced with their return values\n' +
  'console.log("Built at:", getBuildTime());\n' +
  'console.log("Commit:", getGitCommit());\n' +
  '\n' +
  '// After bundling, the output becomes:\n' +
  '// console.log("Built at:", "2026-02-28T10:30:00.000Z");\n' +
  '// console.log("Commit:", "a1b2c3d");';

const codeMigration =
  '// Step 1: Replace npm/yarn/pnpm with bun\n' +
  '# Delete old lockfiles and node_modules\n' +
  'rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml\n' +
  '\n' +
  '# Install with Bun\n' +
  'bun install\n' +
  '\n' +
  '// Step 2: Update package.json scripts\n' +
  '// Before:\n' +
  '// "dev": "nodemon src/server.ts"\n' +
  '// "test": "jest --coverage"\n' +
  '// "build": "tsc && webpack"\n' +
  '\n' +
  '// After:\n' +
  '// "dev": "bun --watch src/server.ts"\n' +
  '// "test": "bun test --coverage"\n' +
  '// "build": "bun build src/index.ts --outdir dist"\n' +
  '\n' +
  '// Step 3: Remove unnecessary devDependencies\n' +
  'bun remove ts-node nodemon dotenv jest ts-jest\n' +
  '# Bun handles TypeScript, watching, .env, and testing natively\n' +
  '\n' +
  '// Step 4: Update imports (most work as-is)\n' +
  '// Node.js built-in modules work without changes:\n' +
  'import fs from "node:fs";\n' +
  'import path from "node:path";\n' +
  'import crypto from "node:crypto";\n' +
  '// These all work identically in Bun';

export default function BunGuide({ lang }: { lang: string }) {
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

  const comparisonRows = [
    { feature: 'Engine', bun: 'JavaScriptCore', node: 'V8', deno: 'V8' },
    { feature: 'Written In', bun: 'Zig + C++', node: 'C++', deno: 'Rust' },
    { feature: 'TypeScript', bun: 'Native (transpile)', node: 'Via --strip-types (22+)', deno: 'Native (type-check)' },
    { feature: 'Package Manager', bun: 'Built-in (bun install)', node: 'npm / yarn / pnpm', deno: 'Built-in (deno add)' },
    { feature: 'Bundler', bun: 'Built-in (bun build)', node: 'External (webpack/vite)', deno: 'Built-in' },
    { feature: 'Test Runner', bun: 'Built-in (Jest API)', node: 'Built-in (node --test)', deno: 'Built-in (deno test)' },
    { feature: 'HTTP Server', bun: 'Bun.serve()', node: 'http.createServer()', deno: 'Deno.serve()' },
    { feature: 'SQLite', bun: 'Built-in (bun:sqlite)', node: 'Via npm (better-sqlite3)', deno: 'Via npm' },
    { feature: 'Security Model', bun: 'Unrestricted', node: 'Unrestricted', deno: 'Permission-based' },
    { feature: 'npm Compatibility', bun: '~99%', node: '100%', deno: '~95%+' },
    { feature: '.env Loading', bun: 'Automatic', node: 'Via dotenv', deno: 'Via --env flag' },
    { feature: 'Startup Speed', bun: '~4x faster', node: 'Baseline', deno: '~1.5x faster' },
  ];

  const preStyle: React.CSSProperties = {
    background: '#1e1e1e',
    color: '#d4d4d4',
    padding: '1.25rem',
    borderRadius: '8px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  };

  const h2Style: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginTop: '2.5rem',
    marginBottom: '1rem',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '0.75rem',
  };

  const pStyle: React.CSSProperties = {
    marginBottom: '1rem',
    lineHeight: '1.7',
  };

  const listItem: React.CSSProperties = {
    marginBottom: '0.5rem',
    lineHeight: '1.7',
  };

  const thStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '0.875rem',
    fontWeight: 600,
  };

  const tdStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.875rem',
  };

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
        </ul>
      </div>

      {/* Why Bun Is Fast */}
      <h2 style={h2Style}>{t.h2WhyFast}</h2>
      <p style={pStyle}>{t.whyFastDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Aspect</th>
              <th style={thStyle}>Bun (JavaScriptCore)</th>
              <th style={thStyle}>Node.js / Deno (V8)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Startup Strategy</td>
              <td style={tdStyle}>Interpreter first, then JIT</td>
              <td style={tdStyle}>Eager compilation</td>
            </tr>
            <tr>
              <td style={tdStyle}>Implementation Language</td>
              <td style={tdStyle}>Zig (no GC, no hidden control flow)</td>
              <td style={tdStyle}>C++ (Node) / Rust (Deno)</td>
            </tr>
            <tr>
              <td style={tdStyle}>Startup Time</td>
              <td style={tdStyle}>~5ms for hello world</td>
              <td style={tdStyle}>~20ms for hello world</td>
            </tr>
            <tr>
              <td style={tdStyle}>I/O Layer</td>
              <td style={tdStyle}>Custom event loop (io_uring on Linux)</td>
              <td style={tdStyle}>libuv</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Installation */}
      <h2 style={h2Style}>{t.h2Install}</h2>
      <p style={pStyle}>{t.installDesc}</p>
      <pre style={preStyle}><code>{codeInstall}</code></pre>

      {/* Package Manager */}
      <h2 style={h2Style}>{t.h2PackageManager}</h2>
      <p style={pStyle}>{t.packageManagerDesc}</p>
      <pre style={preStyle}><code>{codePackageManager}</code></pre>

      <h3 style={h3Style}>Install Speed Benchmarks</h3>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Package Manager</th>
              <th style={thStyle}>Warm Cache</th>
              <th style={thStyle}>Cold Cache</th>
              <th style={thStyle}>Lockfile Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, fontWeight: 600 }}>bun install</td>
              <td style={tdStyle}>1.2s</td>
              <td style={tdStyle}>4.1s</td>
              <td style={tdStyle}>Binary (bun.lockb)</td>
            </tr>
            <tr>
              <td style={tdStyle}>pnpm install</td>
              <td style={tdStyle}>9.4s</td>
              <td style={tdStyle}>15.2s</td>
              <td style={tdStyle}>YAML</td>
            </tr>
            <tr>
              <td style={tdStyle}>yarn install</td>
              <td style={tdStyle}>14.1s</td>
              <td style={tdStyle}>22.8s</td>
              <td style={tdStyle}>Custom text</td>
            </tr>
            <tr>
              <td style={tdStyle}>npm install</td>
              <td style={tdStyle}>28.3s</td>
              <td style={tdStyle}>38.7s</td>
              <td style={tdStyle}>JSON</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bundler */}
      <h2 style={h2Style}>{t.h2Bundler}</h2>
      <p style={pStyle}>{t.bundlerDesc}</p>
      <pre style={preStyle}><code>{codeBundler}</code></pre>

      {/* Test Runner */}
      <h2 style={h2Style}>{t.h2TestRunner}</h2>
      <p style={pStyle}>{t.testRunnerDesc}</p>
      <pre style={preStyle}><code>{codeTestRunner}</code></pre>
      <h3 style={h3Style}>Test Runner CLI Options</h3>
      <pre style={preStyle}><code>{codeTestRunnerCLI}</code></pre>

      {/* HTTP Server */}
      <h2 style={h2Style}>{t.h2HttpServer}</h2>
      <p style={pStyle}>{t.httpServerDesc}</p>
      <pre style={preStyle}><code>{codeHttpServer}</code></pre>
      <h3 style={h3Style}>WebSocket Server</h3>
      <pre style={preStyle}><code>{codeHttpWebSocket}</code></pre>

      {/* File I/O */}
      <h2 style={h2Style}>{t.h2FileIO}</h2>
      <p style={pStyle}>{t.fileIODesc}</p>
      <pre style={preStyle}><code>{codeFileIO}</code></pre>

      {/* SQLite */}
      <h2 style={h2Style}>{t.h2SQLite}</h2>
      <p style={pStyle}>{t.sqliteDesc}</p>
      <pre style={preStyle}><code>{codeSQLite}</code></pre>

      {/* Shell Scripting */}
      <h2 style={h2Style}>{t.h2Shell}</h2>
      <p style={pStyle}>{t.shellDesc}</p>
      <pre style={preStyle}><code>{codeShell}</code></pre>

      {/* Macros */}
      <h2 style={h2Style}>{t.h2Macros}</h2>
      <p style={pStyle}>{t.macrosDesc}</p>
      <pre style={preStyle}><code>{codeMacros}</code></pre>

      {/* Comparison Table */}
      <h2 style={h2Style}>{t.h2Comparison}</h2>
      <p style={pStyle}>{t.comparisonDesc}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={thStyle}>Bun</th>
              <th style={thStyle}>Node.js</th>
              <th style={thStyle}>Deno</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i}>
                <td style={{ ...tdStyle, fontWeight: 600 }}>{row.feature}</td>
                <td style={tdStyle}>{row.bun}</td>
                <td style={tdStyle}>{row.node}</td>
                <td style={tdStyle}>{row.deno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h2 style={h2Style}>{t.h2BestPractices}</h2>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}><strong>Lockfile management:</strong> {t.bp1}</li>
        <li style={listItem}><strong>HTTP services:</strong> {t.bp2}</li>
        <li style={listItem}><strong>SQLite usage:</strong> {t.bp3}</li>
        <li style={listItem}><strong>Bundling:</strong> {t.bp4}</li>
        <li style={listItem}><strong>Environment variables:</strong> {t.bp5}</li>
        <li style={listItem}><strong>Testing:</strong> {t.bp6}</li>
      </ul>

      {/* Migration */}
      <h2 style={h2Style}>{t.h2Migration}</h2>
      <p style={pStyle}>{t.migrationDesc}</p>
      <pre style={preStyle}><code>{codeMigration}</code></pre>

      <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', padding: '1rem 1.5rem', marginTop: '1.5rem', marginBottom: '2rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
        <strong style={{ fontSize: '1rem' }}>Migration Tips</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li style={listItem}>Start by using Bun only as a package manager (bun install) while keeping Node.js as the runtime. This is the lowest-risk migration path.</li>
          <li style={listItem}>Gradually switch scripts from node to bun. Test each one in isolation before moving to the next.</li>
          <li style={listItem}>If a native Node.js addon does not work, check the Bun compatibility tracker or use a pure-JS alternative.</li>
          <li style={listItem}>Docker images: use oven/bun as the base image for production containers. It is significantly smaller than node images.</li>
          <li style={listItem}>For CI pipelines, use bun install --frozen-lockfile and bun test to ensure consistency.</li>
        </ul>
      </div>

      {/* When to Choose Bun */}
      <h2 style={h2Style}>When to Choose Bun Over Node.js or Deno</h2>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Use Case</th>
              <th style={thStyle}>Best Runtime</th>
              <th style={thStyle}>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>CLI tools and scripts</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Bun</td>
              <td style={tdStyle}>Fastest startup time, built-in TypeScript, shell scripting</td>
            </tr>
            <tr>
              <td style={tdStyle}>Serverless functions</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Bun</td>
              <td style={tdStyle}>Cold start under 5ms vs 20ms+ for Node.js</td>
            </tr>
            <tr>
              <td style={tdStyle}>High-throughput APIs</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Bun</td>
              <td style={tdStyle}>Bun.serve() handles 100K+ req/s with Web standard APIs</td>
            </tr>
            <tr>
              <td style={tdStyle}>Enterprise with strict security</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Deno</td>
              <td style={tdStyle}>Permission-based security model, auditable access</td>
            </tr>
            <tr>
              <td style={tdStyle}>Large legacy Node.js codebase</td>
              <td style={{ ...tdStyle, fontWeight: 600 }}>Node.js</td>
              <td style={tdStyle}>100% compatibility, largest ecosystem, most battle-tested</td>
            </tr>
            <tr>
              <td style={tdStyle}>Monorepo with many packages</td>
              <td style={tdStyle}>Bun or pnpm</td>
              <td style={tdStyle}>Bun install speed wins; pnpm has more mature workspace tooling</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <h2 style={h2Style}>{t.faqTitle}</h2>
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
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{faq.q}</h3>
          <p style={{ lineHeight: '1.7', color: '#374151' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
