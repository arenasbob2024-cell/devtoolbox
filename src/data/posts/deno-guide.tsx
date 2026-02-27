'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Deno Runtime Complete Guide: Security, TypeScript, HTTP Servers, Testing, and Deployment in 2026',
    intro: 'Deno is a modern, secure runtime for JavaScript and TypeScript built on V8 and written in Rust. Created by Ryan Dahl (the original creator of Node.js), Deno addresses the design regrets of Node.js by providing first-class TypeScript support, a security-by-default permission system, built-in tooling (formatter, linter, test runner, bundler), web-standard APIs, and native npm compatibility. Whether you are starting a new project or evaluating alternatives to Node.js, this guide covers everything from Deno basics through production deployment.',
    tldr: 'Deno is a secure JavaScript/TypeScript runtime written in Rust with V8. It runs TypeScript natively without configuration, enforces security through a granular permission system (--allow-read, --allow-net, etc.), includes a rich standard library via jsr:@std, supports npm packages natively, provides built-in tools (deno fmt, deno lint, deno test, deno bench), uses deno.json for project configuration and tasks, ships with Deno.serve() for high-performance HTTP servers, and deploys to the edge via Deno Deploy. The Fresh framework offers islands-based SSR. Deno is production-ready and used by Slack, Netlify, and Supabase.',
    keyTakeaway1: 'Deno runs TypeScript and JSX/TSX natively without any build step, transpiler configuration, or tsconfig.json setup.',
    keyTakeaway2: 'The permission system is secure by default: scripts cannot access the file system, network, or environment unless you explicitly grant permission flags.',
    keyTakeaway3: 'Deno standard library (jsr:@std) provides stable, reviewed modules for HTTP, file system, testing, cryptography, and async utilities.',
    keyTakeaway4: 'Native npm compatibility via npm: specifiers means the vast majority of the npm ecosystem works in Deno without modification.',
    keyTakeaway5: 'Built-in tooling replaces entire categories of third-party packages: deno fmt (Prettier), deno lint (ESLint), deno test (Jest), deno bench (benchmarking).',
    keyTakeaway6: 'Deno Deploy provides globally distributed edge hosting with sub-millisecond cold starts, automatic HTTPS, and zero-config deployment from GitHub.',

    h2Basics: 'Deno Basics: Installation and First Steps',
    basicsDesc: 'Deno ships as a single binary executable with no external dependencies. Installation takes seconds and gives you a complete development environment including TypeScript compiler, formatter, linter, and test runner.',
    basicsInstall: 'Install Deno on any platform:',
    basicsFirstScript: 'Your first Deno script runs TypeScript directly:',

    h2Security: 'Security and the Permission System',
    securityDesc: 'Deno is secure by default. Unlike Node.js, a Deno script cannot read files, access the network, or read environment variables unless you explicitly grant permission. This sandboxed execution model prevents supply-chain attacks and limits the damage from compromised dependencies.',
    securityFlags: 'Permission flags explained:',
    securityGranular: 'You can combine flags and scope them to specific resources:',

    h2TypeScript: 'First-Class TypeScript Support',
    typescriptDesc: 'Deno supports TypeScript out of the box with zero configuration. You can run .ts and .tsx files directly. The TypeScript compiler is built into the Deno binary and uses SWC for fast transpilation. Type checking is available on demand with the --check flag, allowing you to choose between speed and safety.',
    typescriptConfig: 'TypeScript configuration through deno.json:',
    typescriptExamples: 'TypeScript features that work immediately:',

    h2StdLib: 'The Deno Standard Library',
    stdLibDesc: 'The Deno standard library (@std) is a collection of high-quality, reviewed modules maintained by the Deno team. Distributed through JSR (JavaScript Registry), it provides stable APIs for common tasks without requiring third-party packages. Each module is independently versioned and audited.',
    stdLibModules: 'Core standard library modules:',

    h2HttpServer: 'Building HTTP Servers with Deno.serve()',
    httpServerDesc: 'Deno provides Deno.serve() as the primary API for creating HTTP servers. Built on hyper (a Rust HTTP library), it uses web-standard Request and Response objects, supports streaming, WebSockets, and handles thousands of concurrent connections efficiently.',
    httpServerBasic: 'A basic HTTP server with routing:',
    httpServerAdvanced: 'A more complete server with middleware pattern:',

    h2FileSystem: 'File System Operations',
    fileSystemDesc: 'Deno provides both synchronous and asynchronous file system APIs through the Deno namespace. These APIs require --allow-read and --allow-write permissions. Deno also supports the Node.js node:fs module for compatibility.',
    fileSystemOps: 'Common file system operations:',
    fileSystemStreaming: 'Streaming file operations for large files:',

    h2Testing: 'Testing with Deno',
    testingDesc: 'Deno includes a built-in test runner that supports test definitions, assertions, async tests, test steps, mocking, snapshot testing, and code coverage. No additional packages or configuration are needed. Run tests with deno test and get coverage with --coverage.',
    testingBasic: 'Writing and organizing tests:',
    testingAdvanced: 'Advanced testing with mocking and steps:',

    h2Tasks: 'Tasks and Configuration with deno.json',
    tasksDesc: 'The deno.json (or deno.jsonc) file is the central configuration for Deno projects. It replaces package.json scripts (via tasks), tsconfig.json (via compilerOptions), and import maps (via imports). Tasks support cross-platform shell syntax and can chain commands.',
    tasksConfig: 'A complete deno.json configuration:',
    tasksImportMap: 'Import maps centralize dependency management:',

    h2Npm: 'npm Compatibility',
    npmDesc: 'Deno supports npm packages natively through the npm: specifier. Packages are downloaded and cached globally without creating a node_modules directory by default. Most popular npm packages including Express, React, Prisma, and thousands of others work without modification.',
    npmUsage: 'Using npm packages in Deno:',
    npmNodeBuiltins: 'Node.js built-in modules via node: specifier:',

    h2Deploy: 'Deployment with Deno Deploy',
    deployDesc: 'Deno Deploy is a globally distributed edge hosting platform built specifically for Deno. It runs your code on servers close to your users across 35+ regions, with automatic HTTPS, instant deployments from GitHub, and a generous free tier. It uses the same V8 isolate technology as Cloudflare Workers.',
    deploySetup: 'Setting up a Deno Deploy project:',
    deployFeatures: 'Deno Deploy provides KV (key-value) storage, cron jobs, and BroadcastChannel for distributed state:',

    h2Fresh: 'The Fresh Framework',
    freshDesc: 'Fresh is the official full-stack web framework for Deno. It uses islands architecture for selective client-side hydration, renders pages on the server by default, supports JSX/TSX, and requires zero build step. Fresh routes are file-system based, and islands are the only components that ship JavaScript to the browser.',
    freshSetup: 'Creating and understanding a Fresh project:',
    freshIslands: 'Fresh islands architecture for interactive components:',

    h2VsNode: 'Deno vs Node.js: Detailed Comparison',
    vsNodeDesc: 'Deno and Node.js are both JavaScript runtimes built on V8, but they differ significantly in design philosophy, security model, and developer experience. This comparison helps you decide which runtime fits your project.',
    vsNodeTable: 'Feature comparison:',
    vsNodeWhen: 'When to choose Deno: new projects that benefit from TypeScript-first development, security-sensitive applications, edge deployments, and teams that want built-in tooling without configuring Prettier, ESLint, Jest, and bundlers separately. When to choose Node.js: legacy projects with deep npm dependency trees, frameworks that require specific Node.js features, and teams with established Node.js workflows.',

    h2BestPractices: 'Best Practices',
    bp1: 'Always use the minimum required permissions. Never use --allow-all in production. Scope permissions to specific paths and hosts.',
    bp2: 'Pin dependency versions in your import map (deno.json imports). Use exact versions for reproducible builds.',
    bp3: 'Use deno.lock to lock dependency versions. Run deno cache --lock=deno.lock to verify integrity.',
    bp4: 'Prefer Deno-native APIs (Deno.readTextFile, Deno.serve) over Node.js compatibility modules for better performance and smaller footprint.',
    bp5: 'Run deno fmt and deno lint in CI pipelines. They are fast, opinionated, and consistent across teams.',
    bp6: 'Use Deno.test with steps for integration tests. Steps provide clear output and independent pass/fail status.',
    bp7: 'Deploy to Deno Deploy for edge performance. Use Deno KV for distributed state instead of external databases when possible.',
    bp8: 'Compile standalone binaries with deno compile for CLI tools and internal utilities that need to run without Deno installed.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Is Deno ready for production use?',
    faq1A: 'Yes. Deno is production-ready and used by companies including Slack, Netlify, Supabase, and GitHub. The runtime has been stable since 1.0 and the Deno 2 release solidified backward compatibility and npm support. Deno Deploy handles billions of requests monthly.',
    faq2Q: 'Can I use npm packages with Deno?',
    faq2A: 'Yes. Deno supports npm packages natively using the npm: specifier (e.g., import express from "npm:express@4"). Most npm packages work without modification. You can also use a package.json and node_modules if you prefer the traditional Node.js workflow.',
    faq3Q: 'How does the Deno permission system work?',
    faq3A: 'Deno runs scripts in a sandbox by default with no file, network, or environment access. You grant permissions explicitly via flags: --allow-read for file system, --allow-net for network, --allow-env for environment variables, --allow-run for subprocesses. Permissions can be scoped to specific paths and hosts.',
    faq4Q: 'Do I need to configure TypeScript to use it with Deno?',
    faq4A: 'No. Deno runs TypeScript natively without any tsconfig.json, build step, or transpiler setup. The TypeScript compiler is built into the Deno binary. You can optionally customize compiler options in deno.json, but it works out of the box.',
    faq5Q: 'What is the difference between Deno and Bun?',
    faq5A: 'Both are modern JavaScript runtimes. Deno uses V8 and is written in Rust, focusing on security (permission system), web standards compliance, and TypeScript-first development. Bun uses JavaScriptCore and is written in Zig, focusing on raw execution speed and Node.js drop-in compatibility. Deno has more mature security defaults; Bun has faster startup and install times.',
    faq6Q: 'What is Deno Deploy and how much does it cost?',
    faq6A: 'Deno Deploy is a globally distributed edge hosting platform. The free tier includes 100,000 requests per day, 1 GB outbound transfer, and Deno KV storage. The Pro tier costs 20 dollars per month with 5 million requests, 100 GB transfer, and higher KV limits. It deploys automatically from GitHub with zero configuration.',
    faq7Q: 'Can I migrate an existing Node.js project to Deno?',
    faq7A: 'Yes. Deno 2 provides strong Node.js compatibility. Migrate incrementally: add a deno.json, update imports to use node: prefix for Node.js built-ins and npm: for packages, replace npm scripts with Deno tasks, and convert CommonJS to ESM. Most projects can migrate without rewriting application logic.',
    faq8Q: 'What is the Fresh framework?',
    faq8A: 'Fresh is the official Deno web framework using islands architecture. It renders pages on the server by default, only shipping JavaScript for interactive components (islands). It supports file-system routing, JSX/TSX, middleware, and integrates with Deno Deploy. Fresh requires no build step and starts instantly.',
  },
  zh: {
    title: 'Deno 运行时完全指南：安全、TypeScript、HTTP 服务器、测试和部署 2026',
    intro: 'Deno 是一个现代、安全的 JavaScript 和 TypeScript 运行时，基于 V8 引擎，使用 Rust 编写。由 Ryan Dahl（Node.js 的原始创建者）打造，Deno 通过提供一流的 TypeScript 支持、默认安全的权限系统、内置工具（格式化器、检查器、测试运行器、打包器）、Web 标准 API 和原生 npm 兼容性来解决 Node.js 的设计缺憾。本指南涵盖从 Deno 基础到生产部署的所有内容。',
    tldr: 'Deno 是使用 Rust 编写的安全 JavaScript/TypeScript 运行时。它原生运行 TypeScript，通过细粒度权限系统实施安全性，包含丰富的标准库，原生支持 npm 包，提供内置工具（deno fmt、deno lint、deno test、deno bench），使用 deno.json 配置项目和任务，提供 Deno.serve() 高性能 HTTP 服务器，并通过 Deno Deploy 部署到边缘。Fresh 框架提供基于岛屿的 SSR。',
    keyTakeaway1: 'Deno 原生运行 TypeScript 和 JSX/TSX，无需任何构建步骤、转译器配置或 tsconfig.json。',
    keyTakeaway2: '权限系统默认安全：脚本无法访问文件系统、网络或环境，除非明确授予权限标志。',
    keyTakeaway3: 'Deno 标准库（jsr:@std）提供稳定的、经过审查的 HTTP、文件系统、测试、加密和异步工具模块。',
    keyTakeaway4: '通过 npm: 说明符的原生 npm 兼容性意味着绝大多数 npm 生态系统可在 Deno 中无需修改即可工作。',
    keyTakeaway5: '内置工具替代了整个类别的第三方包：deno fmt（Prettier）、deno lint（ESLint）、deno test（Jest）、deno bench。',
    keyTakeaway6: 'Deno Deploy 提供全球分布式边缘托管，具有亚毫秒级冷启动、自动 HTTPS 和从 GitHub 零配置部署。',

    h2Basics: 'Deno 基础：安装和第一步',
    basicsDesc: 'Deno 作为单个二进制可执行文件分发，没有外部依赖。安装只需几秒钟，即可获得完整的开发环境。',
    basicsInstall: '在任何平台上安装 Deno：',
    basicsFirstScript: '你的第一个 Deno 脚本直接运行 TypeScript：',

    h2Security: '安全和权限系统',
    securityDesc: 'Deno 默认安全。与 Node.js 不同，Deno 脚本不能读取文件、访问网络或读取环境变量，除非你明确授予权限。',
    securityFlags: '权限标志说明：',
    securityGranular: '可以组合标志并将其限定到特定资源：',

    h2TypeScript: '一流的 TypeScript 支持',
    typescriptDesc: 'Deno 开箱即用支持 TypeScript，零配置。你可以直接运行 .ts 和 .tsx 文件。TypeScript 编译器内置在 Deno 二进制文件中。',
    typescriptConfig: '通过 deno.json 配置 TypeScript：',
    typescriptExamples: '立即可用的 TypeScript 功能：',

    h2StdLib: 'Deno 标准库',
    stdLibDesc: 'Deno 标准库（@std）是由 Deno 团队维护的高质量审查模块集合，通过 JSR 分发。',
    stdLibModules: '核心标准库模块：',

    h2HttpServer: '使用 Deno.serve() 构建 HTTP 服务器',
    httpServerDesc: 'Deno 提供 Deno.serve() 作为创建 HTTP 服务器的主要 API，基于 hyper（Rust HTTP 库）构建。',
    httpServerBasic: '带路由的基本 HTTP 服务器：',
    httpServerAdvanced: '更完整的中间件模式服务器：',

    h2FileSystem: '文件系统操作',
    fileSystemDesc: 'Deno 通过 Deno 命名空间提供同步和异步文件系统 API，需要 --allow-read 和 --allow-write 权限。',
    fileSystemOps: '常见文件系统操作：',
    fileSystemStreaming: '大文件的流式操作：',

    h2Testing: '使用 Deno 测试',
    testingDesc: 'Deno 包含内置测试运行器，支持测试定义、断言、异步测试、测试步骤、模拟、快照测试和代码覆盖率。',
    testingBasic: '编写和组织测试：',
    testingAdvanced: '使用模拟和步骤的高级测试：',

    h2Tasks: '使用 deno.json 配置任务',
    tasksDesc: 'deno.json 文件是 Deno 项目的中央配置，替代 package.json 脚本、tsconfig.json 和导入映射。',
    tasksConfig: '完整的 deno.json 配置：',
    tasksImportMap: '导入映射集中管理依赖：',

    h2Npm: 'npm 兼容性',
    npmDesc: 'Deno 通过 npm: 说明符原生支持 npm 包。包被全局下载和缓存，默认不创建 node_modules 目录。',
    npmUsage: '在 Deno 中使用 npm 包：',
    npmNodeBuiltins: '通过 node: 说明符使用 Node.js 内置模块：',

    h2Deploy: '使用 Deno Deploy 部署',
    deployDesc: 'Deno Deploy 是专为 Deno 构建的全球分布式边缘托管平台，在 35+ 个区域运行代码。',
    deploySetup: '设置 Deno Deploy 项目：',
    deployFeatures: 'Deno Deploy 提供 KV 存储、定时任务和 BroadcastChannel：',

    h2Fresh: 'Fresh 框架',
    freshDesc: 'Fresh 是 Deno 的官方全栈 Web 框架，使用岛屿架构进行选择性客户端水合，默认在服务器端渲染页面。',
    freshSetup: '创建和理解 Fresh 项目：',
    freshIslands: 'Fresh 岛屿架构的交互组件：',

    h2VsNode: 'Deno 与 Node.js：详细对比',
    vsNodeDesc: 'Deno 和 Node.js 都是基于 V8 的 JavaScript 运行时，但在设计理念、安全模型和开发体验上有显著差异。',
    vsNodeTable: '功能对比：',
    vsNodeWhen: '选择 Deno：新项目、安全敏感应用、边缘部署、需要内置工具的团队。选择 Node.js：遗留项目、需要特定 Node.js 功能的框架、已有 Node.js 工作流的团队。',

    h2BestPractices: '最佳实践',
    bp1: '始终使用最小所需权限。生产环境中不要使用 --allow-all。将权限限定到特定路径和主机。',
    bp2: '在导入映射中固定依赖版本。使用确切版本以实现可重现的构建。',
    bp3: '使用 deno.lock 锁定依赖版本。运行 deno cache --lock=deno.lock 验证完整性。',
    bp4: '优先使用 Deno 原生 API，而非 Node.js 兼容模块，以获得更好的性能。',
    bp5: '在 CI 管道中运行 deno fmt 和 deno lint。它们快速、有主见且团队一致。',
    bp6: '使用 Deno.test 的步骤进行集成测试。步骤提供清晰的输出和独立的通过/失败状态。',
    bp7: '部署到 Deno Deploy 以获得边缘性能。尽可能使用 Deno KV 代替外部数据库。',
    bp8: '使用 deno compile 编译独立二进制文件，用于 CLI 工具和不需要安装 Deno 的内部工具。',

    h2Faq: '常见问题',
    faq1Q: 'Deno 已经准备好用于生产了吗？',
    faq1A: '是的。Deno 已被 Slack、Netlify、Supabase 和 GitHub 等公司在生产中使用。运行时自 1.0 以来一直稳定，Deno 2 巩固了向后兼容性和 npm 支持。',
    faq2Q: '可以在 Deno 中使用 npm 包吗？',
    faq2A: '可以。Deno 使用 npm: 说明符原生支持 npm 包。大多数 npm 包无需修改即可工作。也可以使用 package.json 和 node_modules。',
    faq3Q: 'Deno 权限系统如何工作？',
    faq3A: 'Deno 默认在沙箱中运行脚本。通过标志显式授予权限：--allow-read 用于文件系统，--allow-net 用于网络，--allow-env 用于环境变量。权限可限定到特定路径和主机。',
    faq4Q: '需要配置 TypeScript 才能在 Deno 中使用吗？',
    faq4A: '不需要。Deno 原生运行 TypeScript，无需任何 tsconfig.json 或构建步骤。TypeScript 编译器内置在 Deno 二进制文件中。',
    faq5Q: 'Deno 和 Bun 有什么区别？',
    faq5A: '两者都是现代 JavaScript 运行时。Deno 使用 V8，专注于安全性和 Web 标准。Bun 使用 JavaScriptCore，专注于执行速度和 Node.js 兼容性。',
    faq6Q: 'Deno Deploy 是什么，费用多少？',
    faq6A: 'Deno Deploy 是全球分布式边缘托管平台。免费套餐包括每天 10 万请求和 1 GB 出站传输。Pro 套餐每月 20 美元。',
    faq7Q: '可以将现有 Node.js 项目迁移到 Deno 吗？',
    faq7A: '可以。Deno 2 提供强大的 Node.js 兼容性。增量迁移：添加 deno.json，更新导入使用 node: 和 npm: 前缀，替换 npm 脚本为 Deno 任务。',
    faq8Q: 'Fresh 框架是什么？',
    faq8A: 'Fresh 是 Deno 的官方 Web 框架，使用岛屿架构。默认在服务器端渲染页面，仅为交互组件发送 JavaScript。支持文件系统路由和 JSX/TSX。',
  },
};

export default function DenoGuide({ lang }: { lang: string }) {
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

      {/* Deno Basics */}
      <h2 style={sectionTitle}>{t.h2Basics}</h2>
      <p style={para}>{t.basicsDesc}</p>
      <p style={para}>{t.basicsInstall}</p>
      <pre style={codeBlock}><code>{'# Install Deno (macOS / Linux)\n'
        + 'curl -fsSL https://deno.land/install.sh | sh\n'
        + '\n'
        + '# Install Deno (Windows PowerShell)\n'
        + 'irm https://deno.land/install.ps1 | iex\n'
        + '\n'
        + '# Install via Homebrew (macOS)\n'
        + 'brew install deno\n'
        + '\n'
        + '# Verify installation\n'
        + 'deno --version\n'
        + '# deno 2.x.x\n'
        + '# v8 12.x.x\n'
        + '# typescript 5.x.x\n'
        + '\n'
        + '# Initialize a new project\n'
        + 'deno init my-app\n'
        + 'cd my-app\n'
        + '# Creates: main.ts, main_test.ts, deno.json\n'
        + '\n'
        + '# Useful commands\n'
        + 'deno run main.ts          # Run a script\n'
        + 'deno run --watch main.ts  # Run with auto-reload\n'
        + 'deno fmt                  # Format code\n'
        + 'deno lint                 # Lint code\n'
        + 'deno test                 # Run tests\n'
        + 'deno bench                # Run benchmarks\n'
        + 'deno compile main.ts      # Compile to binary'}</code></pre>

      <p style={para}>{t.basicsFirstScript}</p>
      <pre style={codeBlock}><code>{'// main.ts — runs directly with: deno run main.ts\n'
        + 'interface User {\n'
        + '  name: string;\n'
        + '  age: number;\n'
        + '  email: string;\n'
        + '}\n'
        + '\n'
        + 'function greet(user: User): string {\n'
        + '  return "Hello, " + user.name + "! You are " + user.age + " years old.";\n'
        + '}\n'
        + '\n'
        + 'const user: User = {\n'
        + '  name: "Alice",\n'
        + '  age: 30,\n'
        + '  email: "alice@example.com",\n'
        + '};\n'
        + '\n'
        + 'console.log(greet(user));\n'
        + '\n'
        + '// Fetch data from a URL (web-standard fetch)\n'
        + 'const response = await fetch("https://api.github.com/zen");\n'
        + 'const wisdom = await response.text();\n'
        + 'console.log("GitHub Zen:", wisdom);'}</code></pre>

      {/* Security */}
      <h2 style={sectionTitle}>{t.h2Security}</h2>
      <p style={para}>{t.securityDesc}</p>
      <p style={para}>{t.securityFlags}</p>
      <pre style={codeBlock}><code>{'# Permission flags\n'
        + '--allow-read          Read file system\n'
        + '--allow-write         Write file system\n'
        + '--allow-net           Network access\n'
        + '--allow-env           Environment variables\n'
        + '--allow-run           Run subprocesses\n'
        + '--allow-ffi           Foreign function interface\n'
        + '--allow-sys           System information\n'
        + '--allow-all / -A      All permissions (dev only)\n'
        + '\n'
        + '# No permissions — script is fully sandboxed\n'
        + 'deno run sandboxed.ts\n'
        + '\n'
        + '# Runtime will prompt for permission if not granted:\n'
        + '# Deno requests read access to "./config.json".\n'
        + '# Allow? [y/n/A] (y = allow, n = deny, A = allow all)'}</code></pre>

      <p style={para}>{t.securityGranular}</p>
      <pre style={codeBlock}><code>{'# Scoped permissions — only allow what is needed\n'
        + 'deno run \\\n'
        + '  --allow-read=./data,./config \\\n'
        + '  --allow-write=./output \\\n'
        + '  --allow-net=api.example.com:443,cdn.example.com \\\n'
        + '  --allow-env=DATABASE_URL,API_KEY \\\n'
        + '  server.ts\n'
        + '\n'
        + '# Deny specific permissions (blocklist)\n'
        + 'deno run \\\n'
        + '  --allow-net --deny-net=evil.com \\\n'
        + '  --allow-read --deny-read=/etc/passwd \\\n'
        + '  app.ts\n'
        + '\n'
        + '# Programmatic permission check\n'
        + '# const status = await Deno.permissions.query(\n'
        + '#   { name: "read", path: "./secrets" }\n'
        + '# );\n'
        + '# console.log(status.state); // "granted" | "denied" | "prompt"'}</code></pre>

      {/* TypeScript */}
      <h2 style={sectionTitle}>{t.h2TypeScript}</h2>
      <p style={para}>{t.typescriptDesc}</p>
      <p style={para}>{t.typescriptConfig}</p>
      <pre style={codeBlock}><code>{'// deno.json — TypeScript configuration\n'
        + '{\n'
        + '  "compilerOptions": {\n'
        + '    "strict": true,\n'
        + '    "jsx": "react-jsx",\n'
        + '    "jsxImportSource": "react",\n'
        + '    "lib": ["deno.window", "dom"],\n'
        + '    "experimentalDecorators": true,\n'
        + '    "emitDecoratorMetadata": true\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '# Type-check your code (not done by default for speed)\n'
        + '# deno check main.ts\n'
        + '# deno run --check main.ts'}</code></pre>

      <p style={para}>{t.typescriptExamples}</p>
      <pre style={codeBlock}><code>{'// Advanced TypeScript — works out of the box\n'
        + 'type Result<T, E = Error> =\n'
        + '  | { ok: true; value: T }\n'
        + '  | { ok: false; error: E };\n'
        + '\n'
        + 'function safeParse<T>(json: string): Result<T> {\n'
        + '  try {\n'
        + '    return { ok: true, value: JSON.parse(json) as T };\n'
        + '  } catch (e) {\n'
        + '    return { ok: false, error: e as Error };\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + 'interface Config {\n'
        + '  port: number;\n'
        + '  host: string;\n'
        + '  debug: boolean;\n'
        + '}\n'
        + '\n'
        + 'const result = safeParse<Config>(\'{"port":3000,"host":"localhost","debug":true}\');\n'
        + 'if (result.ok) {\n'
        + '  console.log("Server port:", result.value.port);\n'
        + '}\n'
        + '\n'
        + '// Enums, generics, utility types — all native\n'
        + 'type DeepPartial<T> = {\n'
        + '  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];\n'
        + '};\n'
        + '\n'
        + 'const partial: DeepPartial<Config> = { port: 8080 };'}</code></pre>

      {/* Standard Library */}
      <h2 style={sectionTitle}>{t.h2StdLib}</h2>
      <p style={para}>{t.stdLibDesc}</p>
      <p style={para}>{t.stdLibModules}</p>
      <pre style={codeBlock}><code>{'// Deno Standard Library — import from jsr:@std\n'
        + 'import { ensureDir, copy, walk } from "jsr:@std/fs";\n'
        + 'import { join, resolve, basename } from "jsr:@std/path";\n'
        + 'import { assertEquals, assertThrows } from "jsr:@std/assert";\n'
        + 'import { delay } from "jsr:@std/async";\n'
        + 'import { parse as parseFlags } from "jsr:@std/cli/parse-args";\n'
        + 'import { encodeBase64, decodeBase64 } from "jsr:@std/encoding/base64";\n'
        + 'import { crypto } from "jsr:@std/crypto";\n'
        + 'import { serveDir } from "jsr:@std/http/file-server";\n'
        + '\n'
        + '// File system utilities\n'
        + 'await ensureDir("./output/logs");\n'
        + 'await copy("./src", "./backup/src", { overwrite: true });\n'
        + '\n'
        + '// Walk a directory tree\n'
        + 'for await (const entry of walk("./src", { exts: [".ts"] })) {\n'
        + '  console.log("Found:", entry.path);\n'
        + '}\n'
        + '\n'
        + '// Parse CLI flags\n'
        + 'const args = parseFlags(Deno.args, {\n'
        + '  string: ["port", "host"],\n'
        + '  boolean: ["verbose"],\n'
        + '  default: { port: "3000", host: "localhost" },\n'
        + '});\n'
        + '\n'
        + '// Encoding\n'
        + 'const encoded = encodeBase64("Hello Deno");\n'
        + 'console.log(encoded); // "SGVsbG8gRGVubw=="'}</code></pre>

      {/* HTTP Server */}
      <h2 style={sectionTitle}>{t.h2HttpServer}</h2>
      <p style={para}>{t.httpServerDesc}</p>
      <p style={para}>{t.httpServerBasic}</p>
      <pre style={codeBlock}><code>{'// server.ts — Basic HTTP server with routing\n'
        + '// Run: deno run --allow-net server.ts\n'
        + '\n'
        + 'Deno.serve({ port: 3000 }, (req: Request): Response => {\n'
        + '  const url = new URL(req.url);\n'
        + '\n'
        + '  // JSON API endpoint\n'
        + '  if (url.pathname === "/api/health") {\n'
        + '    return Response.json({ status: "ok", uptime: Deno.uptime() });\n'
        + '  }\n'
        + '\n'
        + '  // Dynamic route with URL params\n'
        + '  if (url.pathname.startsWith("/api/users/")) {\n'
        + '    const id = url.pathname.split("/").pop();\n'
        + '    return Response.json({ id, name: "User " + id });\n'
        + '  }\n'
        + '\n'
        + '  // Query parameters\n'
        + '  if (url.pathname === "/api/search") {\n'
        + '    const query = url.searchParams.get("q") || "";\n'
        + '    return Response.json({ query, results: [] });\n'
        + '  }\n'
        + '\n'
        + '  // HTML response\n'
        + '  if (url.pathname === "/") {\n'
        + '    return new Response("<h1>Welcome to Deno</h1>", {\n'
        + '      headers: { "Content-Type": "text/html" },\n'
        + '    });\n'
        + '  }\n'
        + '\n'
        + '  return new Response("Not Found", { status: 404 });\n'
        + '});\n'
        + '\n'
        + 'console.log("Server running at http://localhost:3000");'}</code></pre>

      <p style={para}>{t.httpServerAdvanced}</p>
      <pre style={codeBlock}><code>{'// Middleware pattern with Deno.serve()\n'
        + 'type Handler = (req: Request) => Response | Promise<Response>;\n'
        + 'type Middleware = (req: Request, next: Handler) => Response | Promise<Response>;\n'
        + '\n'
        + 'const logger: Middleware = async (req, next) => {\n'
        + '  const start = performance.now();\n'
        + '  const res = await next(req);\n'
        + '  const ms = (performance.now() - start).toFixed(1);\n'
        + '  console.log(req.method + " " + new URL(req.url).pathname + " " + res.status + " " + ms + "ms");\n'
        + '  return res;\n'
        + '};\n'
        + '\n'
        + 'const cors: Middleware = async (req, next) => {\n'
        + '  const res = await next(req);\n'
        + '  res.headers.set("Access-Control-Allow-Origin", "*");\n'
        + '  return res;\n'
        + '};\n'
        + '\n'
        + 'function compose(mws: Middleware[], h: Handler): Handler {\n'
        + '  return mws.reduceRight((next, mw) => (req) => mw(req, next), h);\n'
        + '}\n'
        + '\n'
        + 'const app = compose([logger, cors], () => {\n'
        + '  return Response.json({ message: "Hello from Deno!" });\n'
        + '});\n'
        + 'Deno.serve({ port: 3000 }, app);'}</code></pre>

      {/* File System */}
      <h2 style={sectionTitle}>{t.h2FileSystem}</h2>
      <p style={para}>{t.fileSystemDesc}</p>
      <p style={para}>{t.fileSystemOps}</p>
      <pre style={codeBlock}><code>{'// File system operations\n'
        + '// Run: deno run --allow-read --allow-write fs-demo.ts\n'
        + '\n'
        + '// Read a text file\n'
        + 'const content = await Deno.readTextFile("./config.json");\n'
        + 'console.log(content);\n'
        + '\n'
        + '// Write a text file\n'
        + 'await Deno.writeTextFile("./output.txt", "Hello from Deno!");\n'
        + '\n'
        + '// Read/write binary files\n'
        + 'const bytes = await Deno.readFile("./image.png");\n'
        + 'await Deno.writeFile("./copy.png", bytes);\n'
        + '\n'
        + '// Create directory (recursive)\n'
        + 'await Deno.mkdir("./output/nested/dir", { recursive: true });\n'
        + '\n'
        + '// List directory contents\n'
        + 'for await (const entry of Deno.readDir("./src")) {\n'
        + '  console.log(entry.name, entry.isFile ? "file" : "dir");\n'
        + '}\n'
        + '\n'
        + '// File info (stat)\n'
        + 'const info = await Deno.stat("./config.json");\n'
        + 'console.log("Size:", info.size, "bytes");\n'
        + 'console.log("Modified:", info.mtime);\n'
        + '\n'
        + '// Remove files and directories\n'
        + 'await Deno.remove("./temp.txt");\n'
        + 'await Deno.remove("./temp-dir", { recursive: true });\n'
        + '\n'
        + '// Rename / move\n'
        + 'await Deno.rename("./old.txt", "./new.txt");\n'
        + '\n'
        + '// Check if file exists\n'
        + 'try {\n'
        + '  await Deno.stat("./maybe.txt");\n'
        + '  console.log("File exists");\n'
        + '} catch {\n'
        + '  console.log("File not found");\n'
        + '}'}</code></pre>

      <p style={para}>{t.fileSystemStreaming}</p>
      <pre style={codeBlock}><code>{'// Streaming with ReadableStream (web standard)\n'
        + 'const bigFile = await Deno.open("./data.csv");\n'
        + 'for await (const chunk of bigFile.readable) {\n'
        + '  console.log("Received", chunk.length, "bytes");\n'
        + '}\n'
        + '\n'
        + '// Watch for file changes\n'
        + 'const watcher = Deno.watchFs("./src");\n'
        + 'for await (const event of watcher) {\n'
        + '  console.log("Event:", event.kind, event.paths);\n'
        + '}'}</code></pre>

      {/* Testing */}
      <h2 style={sectionTitle}>{t.h2Testing}</h2>
      <p style={para}>{t.testingDesc}</p>
      <p style={para}>{t.testingBasic}</p>
      <pre style={codeBlock}><code>{'// math.ts\n'
        + 'export function add(a: number, b: number): number {\n'
        + '  return a + b;\n'
        + '}\n'
        + '\n'
        + 'export function divide(a: number, b: number): number {\n'
        + '  if (b === 0) throw new Error("Division by zero");\n'
        + '  return a / b;\n'
        + '}\n'
        + '\n'
        + '// math_test.ts — Run: deno test math_test.ts\n'
        + 'import { assertEquals, assertThrows } from "jsr:@std/assert";\n'
        + 'import { add, divide } from "./math.ts";\n'
        + '\n'
        + 'Deno.test("add positive numbers", () => {\n'
        + '  assertEquals(add(2, 3), 5);\n'
        + '});\n'
        + '\n'
        + 'Deno.test("add negative numbers", () => {\n'
        + '  assertEquals(add(-1, -2), -3);\n'
        + '});\n'
        + '\n'
        + 'Deno.test("divide numbers", () => {\n'
        + '  assertEquals(divide(10, 2), 5);\n'
        + '});\n'
        + '\n'
        + 'Deno.test("divide by zero throws", () => {\n'
        + '  assertThrows(\n'
        + '    () => divide(10, 0),\n'
        + '    Error,\n'
        + '    "Division by zero"\n'
        + '  );\n'
        + '});\n'
        + '\n'
        + '# Run tests with coverage\n'
        + '# deno test --coverage=./cov\n'
        + '# deno coverage ./cov --lcov > coverage.lcov'}</code></pre>

      <p style={para}>{t.testingAdvanced}</p>
      <pre style={codeBlock}><code>{'// Advanced testing with steps, mocking, and async\n'
        + 'import { assertEquals } from "jsr:@std/assert";\n'
        + 'import { stub, returnsNext } from "jsr:@std/testing/mock";\n'
        + '\n'
        + '// Test steps — group related assertions\n'
        + 'Deno.test("user CRUD operations", async (t) => {\n'
        + '  let userId: string;\n'
        + '\n'
        + '  await t.step("create user", () => {\n'
        + '    userId = "user-123";\n'
        + '    assertEquals(typeof userId, "string");\n'
        + '  });\n'
        + '\n'
        + '  await t.step("read user", () => {\n'
        + '    assertEquals(userId, "user-123");\n'
        + '  });\n'
        + '\n'
        + '  await t.step("delete user", () => {\n'
        + '    userId = "";\n'
        + '    assertEquals(userId, "");\n'
        + '  });\n'
        + '});\n'
        + '\n'
        + '// Mocking with stubs\n'
        + 'Deno.test("mocking fetch", async () => {\n'
        + '  const fetchStub = stub(\n'
        + '    globalThis,\n'
        + '    "fetch",\n'
        + '    returnsNext([\n'
        + '      Promise.resolve(new Response(\'{"id":1}\', { status: 200 })),\n'
        + '    ])\n'
        + '  );\n'
        + '\n'
        + '  try {\n'
        + '    const res = await fetch("https://api.example.com/data");\n'
        + '    const data = await res.json();\n'
        + '    assertEquals(data.id, 1);\n'
        + '  } finally {\n'
        + '    fetchStub.restore();\n'
        + '  }\n'
        + '});\n'
        + '\n'
        + '// Async test with resource sanitizers\n'
        + 'Deno.test({\n'
        + '  name: "async database test",\n'
        + '  sanitizeResources: false,\n'
        + '  sanitizeOps: false,\n'
        + '  async fn() {\n'
        + '    // Test with open resources...\n'
        + '  },\n'
        + '});'}</code></pre>

      {/* Tasks and Configuration */}
      <h2 style={sectionTitle}>{t.h2Tasks}</h2>
      <p style={para}>{t.tasksDesc}</p>
      <p style={para}>{t.tasksConfig}</p>
      <pre style={codeBlock}><code>{'// deno.json — Complete project configuration\n'
        + '{\n'
        + '  "tasks": {\n'
        + '    "dev": "deno run --watch --allow-all src/main.ts",\n'
        + '    "start": "deno run --allow-net --allow-read --allow-env src/main.ts",\n'
        + '    "test": "deno test --allow-all --coverage=./coverage",\n'
        + '    "test:watch": "deno test --allow-all --watch",\n'
        + '    "check": "deno check src/main.ts",\n'
        + '    "lint": "deno lint",\n'
        + '    "fmt": "deno fmt",\n'
        + '    "build": "deno compile --output=dist/app src/main.ts",\n'
        + '    "bench": "deno bench --allow-all",\n'
        + '    "ci": "deno fmt --check && deno lint && deno check src/main.ts && deno test --allow-all"\n'
        + '  },\n'
        + '  "compilerOptions": {\n'
        + '    "strict": true,\n'
        + '    "jsx": "react-jsx",\n'
        + '    "jsxImportSource": "preact"\n'
        + '  },\n'
        + '  "fmt": {\n'
        + '    "semiColons": true,\n'
        + '    "singleQuote": true,\n'
        + '    "lineWidth": 100,\n'
        + '    "indentWidth": 2,\n'
        + '    "exclude": ["dist/", "coverage/"]\n'
        + '  },\n'
        + '  "lint": {\n'
        + '    "rules": {\n'
        + '      "tags": ["recommended"],\n'
        + '      "exclude": ["no-unused-vars"]\n'
        + '    },\n'
        + '    "exclude": ["dist/"]\n'
        + '  },\n'
        + '  "test": {\n'
        + '    "include": ["src/", "tests/"]\n'
        + '  },\n'
        + '  "lock": true\n'
        + '}'}</code></pre>

      <p style={para}>{t.tasksImportMap}</p>
      <pre style={codeBlock}><code>{'// deno.json — Import map section\n'
        + '{\n'
        + '  "imports": {\n'
        + '    "@std/http": "jsr:@std/http@^1.0.0",\n'
        + '    "@std/assert": "jsr:@std/assert@^1.0.0",\n'
        + '    "@std/fs": "jsr:@std/fs@^1.0.0",\n'
        + '    "@std/path": "jsr:@std/path@^1.0.0",\n'
        + '    "@std/async": "jsr:@std/async@^1.0.0",\n'
        + '    "express": "npm:express@4",\n'
        + '    "zod": "npm:zod@^3.22",\n'
        + '    "drizzle-orm": "npm:drizzle-orm@^0.30",\n'
        + '    "@/": "./src/"\n'
        + '  }\n'
        + '}\n'
        + '\n'
        + '// Now import with clean paths:\n'
        + '// import { assertEquals } from "@std/assert";\n'
        + '// import { z } from "zod";\n'
        + '// import { db } from "@/lib/database.ts";'}</code></pre>

      {/* npm Compatibility */}
      <h2 style={sectionTitle}>{t.h2Npm}</h2>
      <p style={para}>{t.npmDesc}</p>
      <p style={para}>{t.npmUsage}</p>
      <pre style={codeBlock}><code>{'// Using npm packages in Deno\n'
        + 'import express from "npm:express@4";\n'
        + 'import { z } from "npm:zod";\n'
        + 'import chalk from "npm:chalk@5";\n'
        + 'import _ from "npm:lodash";\n'
        + '\n'
        + '// Zod schema validation\n'
        + 'const UserSchema = z.object({\n'
        + '  name: z.string().min(1),\n'
        + '  email: z.string().email(),\n'
        + '  age: z.number().int().positive(),\n'
        + '});\n'
        + '\n'
        + 'type User = z.infer<typeof UserSchema>;\n'
        + '\n'
        + 'const result = UserSchema.safeParse({ name: "Bob", email: "bob@test.com", age: 25 });\n'
        + 'if (result.success) {\n'
        + '  console.log(chalk.green("Valid user: " + result.data.name));\n'
        + '}\n'
        + '\n'
        + '// Express server in Deno\n'
        + 'const app = express();\n'
        + 'app.get("/", (_req, res) => {\n'
        + '  res.json({ runtime: "deno", framework: "express" });\n'
        + '});\n'
        + 'app.listen(3000, () => {\n'
        + '  console.log("Express on Deno at http://localhost:3000");\n'
        + '});\n'
        + '\n'
        + '// Run: deno run --allow-net --allow-read --allow-env server.ts'}</code></pre>

      <p style={para}>{t.npmNodeBuiltins}</p>
      <pre style={codeBlock}><code>{'// Node.js built-in modules via node: specifier\n'
        + 'import { readFileSync, writeFileSync } from "node:fs";\n'
        + 'import { join, resolve } from "node:path";\n'
        + 'import { createHash, randomUUID } from "node:crypto";\n'
        + 'import { EventEmitter } from "node:events";\n'
        + 'import { Buffer } from "node:buffer";\n'
        + 'import { setTimeout } from "node:timers/promises";\n'
        + '\n'
        + '// These work identically to Node.js\n'
        + 'const configPath = join(".", "config.json");\n'
        + 'const data = readFileSync(configPath, "utf-8");\n'
        + 'const hash = createHash("sha256").update(data).digest("hex");\n'
        + 'console.log("Hash:", hash);\n'
        + '\n'
        + '// EventEmitter\n'
        + 'const emitter = new EventEmitter();\n'
        + 'emitter.on("data", (msg: string) => console.log("Received:", msg));\n'
        + 'emitter.emit("data", "hello from node:events");\n'
        + '\n'
        + '// Buffer operations\n'
        + 'const buf = Buffer.from("Hello Deno", "utf-8");\n'
        + 'console.log(buf.toString("base64")); // SGVsbG8gRGVubw=='}</code></pre>

      {/* Deployment */}
      <h2 style={sectionTitle}>{t.h2Deploy}</h2>
      <p style={para}>{t.deployDesc}</p>
      <p style={para}>{t.deploySetup}</p>
      <pre style={codeBlock}><code>{'# Deploy to Deno Deploy\n'
        + '\n'
        + '# 1. Install deployctl CLI\n'
        + 'deno install -A jsr:@deno/deployctl\n'
        + '\n'
        + '# 2. Create main.ts for edge deployment\n'
        + '# Deno.serve((req: Request) => {\n'
        + '#   return new Response("Hello from the edge!");\n'
        + '# });\n'
        + '\n'
        + '# 3. Deploy from CLI\n'
        + 'deployctl deploy --project=my-app main.ts\n'
        + '\n'
        + '# 4. Or connect GitHub for auto-deploy:\n'
        + '#    - Go to dash.deno.com\n'
        + '#    - Create project > Link to GitHub repo\n'
        + '#    - Set entrypoint to main.ts\n'
        + '#    - Every push to main triggers deployment\n'
        + '\n'
        + '# Docker deployment (alternative)\n'
        + '# FROM denoland/deno:latest\n'
        + '# WORKDIR /app\n'
        + '# COPY . .\n'
        + '# RUN deno cache main.ts\n'
        + '# EXPOSE 3000\n'
        + '# CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]'}</code></pre>

      <p style={para}>{t.deployFeatures}</p>
      <pre style={codeBlock}><code>{'// Deno Deploy features: KV, Cron, BroadcastChannel\n'
        + '\n'
        + '// Deno KV — distributed key-value storage\n'
        + 'const kv = await Deno.openKv();\n'
        + '\n'
        + '// Store a value\n'
        + 'await kv.set(["users", "alice"], { name: "Alice", visits: 0 });\n'
        + '\n'
        + '// Read a value\n'
        + 'const entry = await kv.get(["users", "alice"]);\n'
        + 'console.log(entry.value); // { name: "Alice", visits: 0 }\n'
        + '\n'
        + '// Atomic transactions\n'
        + 'await kv.atomic()\n'
        + '  .check(entry) // Ensure no concurrent modification\n'
        + '  .set(["users", "alice"], { name: "Alice", visits: 1 })\n'
        + '  .commit();\n'
        + '\n'
        + '// List entries by prefix\n'
        + 'const users = kv.list({ prefix: ["users"] });\n'
        + 'for await (const user of users) {\n'
        + '  console.log(user.key, user.value);\n'
        + '}\n'
        + '\n'
        + '// Deno Cron — scheduled tasks\n'
        + 'Deno.cron("cleanup", "0 0 * * *", async () => {\n'
        + '  console.log("Running daily cleanup...");\n'
        + '  // Delete expired entries\n'
        + '});\n'
        + '\n'
        + '// BroadcastChannel — cross-isolate messaging\n'
        + 'const channel = new BroadcastChannel("updates");\n'
        + 'channel.onmessage = (e) => console.log("Update:", e.data);'}</code></pre>

      {/* Fresh Framework */}
      <h2 style={sectionTitle}>{t.h2Fresh}</h2>
      <p style={para}>{t.freshDesc}</p>
      <p style={para}>{t.freshSetup}</p>
      <pre style={codeBlock}><code>{'# Create a Fresh project\n'
        + 'deno run -A -r https://fresh.deno.dev my-fresh-app\n'
        + 'cd my-fresh-app\n'
        + 'deno task start\n'
        + '\n'
        + '# Fresh project structure:\n'
        + '# my-fresh-app/\n'
        + '#   routes/           File-based routes\n'
        + '#     index.tsx       GET / (server-rendered)\n'
        + '#     about.tsx       GET /about\n'
        + '#     api/joke.ts     GET /api/joke (API route)\n'
        + '#     [name].tsx      GET /:name (dynamic route)\n'
        + '#     _middleware.ts  Middleware for all routes\n'
        + '#   islands/          Interactive components (client JS)\n'
        + '#     Counter.tsx     Ships JavaScript to the browser\n'
        + '#   components/       Server-only components (no JS shipped)\n'
        + '#   static/           Static files\n'
        + '#   fresh.gen.ts      Auto-generated manifest\n'
        + '#   deno.json         Project config\n'
        + '\n'
        + '// routes/index.tsx — Server-rendered page\n'
        + '// export default function Home() {\n'
        + '//   return (\n'
        + '//     <div>\n'
        + '//       <h1>Welcome to Fresh</h1>\n'
        + '//       <Counter start={0} />\n'
        + '//     </div>\n'
        + '//   );\n'
        + '// }'}</code></pre>

      <p style={para}>{t.freshIslands}</p>
      <pre style={codeBlock}><code>{'// islands/Counter.tsx — Interactive island component\n'
        + '// Only this component ships JavaScript to the browser\n'
        + 'import { useSignal } from "@preact/signals";\n'
        + '\n'
        + 'interface CounterProps {\n'
        + '  start: number;\n'
        + '}\n'
        + '\n'
        + 'export default function Counter(props: CounterProps) {\n'
        + '  const count = useSignal(props.start);\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <p>Count: {count}</p>\n'
        + '      <button onClick={() => count.value--}>-1</button>\n'
        + '      <button onClick={() => count.value++}>+1</button>\n'
        + '    </div>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// routes/api/joke.ts — API route\n'
        + '// import { FreshContext } from "$fresh/server.ts";\n'
        + '// const JOKES = ["Why do programmers prefer dark mode?...",];\n'
        + '// export const handler = (_req: Request, _ctx: FreshContext) => {\n'
        + '//   const joke = JOKES[Math.floor(Math.random() * JOKES.length)];\n'
        + '//   return new Response(JSON.stringify({ joke }), {\n'
        + '//     headers: { "Content-Type": "application/json" },\n'
        + '//   });\n'
        + '// };'}</code></pre>

      {/* Deno vs Node.js */}
      <h2 style={sectionTitle}>{t.h2VsNode}</h2>
      <p style={para}>{t.vsNodeDesc}</p>
      <p style={para}>{t.vsNodeTable}</p>
      <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr>
              <th style={headerCell}>Feature</th>
              <th style={headerCell}>Deno</th>
              <th style={headerCell}>Node.js</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={cellStyle}>Language</td><td style={cellStyle}>Rust + V8</td><td style={cellStyle}>C++ + V8</td></tr>
            <tr><td style={cellStyle}>TypeScript</td><td style={cellStyle}>Native, zero config</td><td style={cellStyle}>Via tsx/ts-node (native in v22+)</td></tr>
            <tr><td style={cellStyle}>Security</td><td style={cellStyle}>Sandboxed by default</td><td style={cellStyle}>Unrestricted by default</td></tr>
            <tr><td style={cellStyle}>Package Manager</td><td style={cellStyle}>Built-in (deno add)</td><td style={cellStyle}>npm / yarn / pnpm</td></tr>
            <tr><td style={cellStyle}>Module System</td><td style={cellStyle}>ESM only (CJS via compat)</td><td style={cellStyle}>CJS + ESM</td></tr>
            <tr><td style={cellStyle}>Formatter</td><td style={cellStyle}>Built-in (deno fmt)</td><td style={cellStyle}>Prettier (external)</td></tr>
            <tr><td style={cellStyle}>Linter</td><td style={cellStyle}>Built-in (deno lint)</td><td style={cellStyle}>ESLint (external)</td></tr>
            <tr><td style={cellStyle}>Test Runner</td><td style={cellStyle}>Built-in (deno test)</td><td style={cellStyle}>Built-in (node --test) / Jest</td></tr>
            <tr><td style={cellStyle}>npm Compatibility</td><td style={cellStyle}>~95%+ via npm: specifier</td><td style={cellStyle}>100% native</td></tr>
            <tr><td style={cellStyle}>Web APIs</td><td style={cellStyle}>Extensive (fetch, Streams, etc.)</td><td style={cellStyle}>Partial (fetch added in v18)</td></tr>
            <tr><td style={cellStyle}>Edge Hosting</td><td style={cellStyle}>Deno Deploy (built-in)</td><td style={cellStyle}>Vercel / Cloudflare (external)</td></tr>
            <tr><td style={cellStyle}>Ecosystem Maturity</td><td style={cellStyle}>5+ years, growing</td><td style={cellStyle}>15+ years, massive</td></tr>
            <tr><td style={cellStyle}>Config Files</td><td style={cellStyle}>Single deno.json</td><td style={cellStyle}>package.json + tsconfig + .eslintrc + ...</td></tr>
          </tbody>
        </table>
      </div>
      <p style={para}>{t.vsNodeWhen}</p>

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
      <pre style={codeBlock}><code>{'# Recommended CI pipeline for Deno projects\n'
        + '# .github/workflows/ci.yml\n'
        + '#\n'
        + '# name: CI\n'
        + '# on: [push, pull_request]\n'
        + '# jobs:\n'
        + '#   test:\n'
        + '#     runs-on: ubuntu-latest\n'
        + '#     steps:\n'
        + '#       - uses: actions/checkout@v4\n'
        + '#       - uses: denoland/setup-deno@v2\n'
        + '#         with:\n'
        + '#           deno-version: v2.x\n'
        + '#       - run: deno fmt --check\n'
        + '#       - run: deno lint\n'
        + '#       - run: deno check src/main.ts\n'
        + '#       - run: deno test --allow-all --coverage=cov\n'
        + '#       - run: deno coverage cov --lcov > coverage.lcov'}</code></pre>

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
