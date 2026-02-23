'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Deno 2 Complete Guide: Node.js Compatibility, npm Support, and Migration',
    intro: 'Deno 2 represents a major evolution in the JavaScript and TypeScript runtime landscape. With full Node.js compatibility, native npm package support, and a refined developer experience, Deno 2 bridges the gap between the modern runtime vision and the practical needs of existing Node.js ecosystems. This guide covers everything you need to know about Deno 2, from its new features to migration strategies.',
    h2WhatNew: 'What Is New in Deno 2',
    whatNewDesc: 'Deno 2 introduces several groundbreaking changes that make it a practical choice for production applications. The most significant change is backward compatibility with Node.js and npm, which removes the biggest barrier to adoption.',
    h3NodeCompat: 'Full Node.js Compatibility',
    nodeCompatDesc: 'Deno 2 includes a Node.js compatibility layer that supports the vast majority of Node.js built-in modules including fs, path, http, crypto, stream, and child_process. You can import Node.js modules using the node: prefix, and most npm packages work without modification.',
    h3NpmSupport: 'Native npm Support',
    npmSupportDesc: 'Deno 2 can import npm packages directly using the npm: specifier. No node_modules directory is created by default - packages are cached globally. You can also use a package.json if you prefer the traditional Node.js workflow.',
    h3Permissions: 'Refined Permission System',
    permissionsDesc: 'Deno retains its security-first permission system but now supports more granular controls. You can allow specific file paths, network hosts, and environment variables. The --allow-all flag grants all permissions for development convenience.',
    h3Std: 'Standard Library Updates',
    stdDesc: 'The Deno standard library has been stabilized with clear versioning. Key modules include @std/fs for file operations, @std/http for HTTP servers, @std/testing for test utilities, and @std/async for async helpers.',
    h2GettingStarted: 'Getting Started with Deno 2',
    gettingStartedDesc: 'Installing and running Deno 2 is straightforward. Deno ships as a single binary with no external dependencies.',
    h2Config: 'Configuration with deno.json',
    configDesc: 'Deno 2 uses deno.json (or deno.jsonc) for project configuration. This file replaces the need for tsconfig.json, package.json (optionally), and various tool configs.',
    h2NodeMigration: 'Migrating from Node.js',
    migrationDesc: 'Migrating an existing Node.js project to Deno 2 is more practical than ever. Here is a step-by-step approach.',
    h3Step1: 'Step 1: Add deno.json',
    step1Desc: 'Create a deno.json file in your project root. You can keep your existing package.json alongside it during the transition.',
    h3Step2: 'Step 2: Update Imports',
    step2Desc: 'Convert Node.js built-in imports to use the node: prefix. Update npm package imports to use the npm: specifier or keep using bare specifiers with an import map.',
    h3Step3: 'Step 3: Handle CommonJS',
    step3Desc: 'Deno 2 supports CommonJS modules through the node: compatibility layer. For your own code, convert require() calls to ESM import statements. For dependencies, most work automatically.',
    h3Step4: 'Step 4: Update Scripts',
    step4Desc: 'Replace npm scripts with Deno tasks in deno.json. Deno tasks support shell-like syntax and can run any command.',
    h2WebFrameworks: 'Web Frameworks in Deno 2',
    webFrameworksDesc: 'Deno 2 supports multiple approaches to building web applications, from the built-in Deno.serve() to popular frameworks.',
    h3Fresh: 'Fresh Framework',
    freshDesc: 'Fresh is the official Deno web framework. It uses islands architecture for selective client-side hydration, supports JSX/TSX, and requires zero configuration.',
    h3Oak: 'Oak Middleware',
    oakDesc: 'Oak is a middleware framework inspired by Koa.js. It provides a familiar API for developers coming from the Express/Koa ecosystem.',
    h3Express: 'Express.js Compatibility',
    expressDesc: 'Thanks to npm compatibility, you can run Express.js applications directly in Deno 2 with minimal changes.',
    h2Testing: 'Testing in Deno 2',
    testingDesc: 'Deno includes a built-in test runner with support for assertions, mocking, benchmarking, and code coverage. No additional test framework is needed.',
    h2Deploy: 'Deployment Options',
    deployDesc: 'Deno 2 applications can be deployed to various platforms including Deno Deploy (edge), Docker containers, traditional VPS, and serverless platforms.',
    h3DenoDeploy: 'Deno Deploy',
    denoDeployDesc: 'Deno Deploy is a globally distributed edge hosting platform designed specifically for Deno. It offers zero-config deployment, automatic HTTPS, and sub-millisecond cold start times.',
    h3Docker: 'Docker Deployment',
    dockerDesc: 'Deno works well in Docker containers. The official Deno Docker image is lightweight and production-ready.',
    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'Can I use my existing npm packages with Deno 2?',
    faq1A: 'Yes. Deno 2 supports npm packages natively using the npm: specifier. The vast majority of npm packages work without modification, including popular ones like express, prisma, next, and react.',
    faq2Q: 'Is Deno 2 production-ready?',
    faq2A: 'Yes. Deno 2 is designed for production use. Companies like Slack, Netlify, and Supabase use Deno in production. The runtime has been battle-tested and the stability guarantees are clear.',
    faq3Q: 'Should I migrate from Node.js to Deno 2?',
    faq3A: 'For new projects, Deno 2 is an excellent choice with better defaults (TypeScript, security, modern APIs). For existing projects, migration is practical but optional. Consider migrating if you want better security, native TypeScript support, or a more modern developer experience.',
    faq4Q: 'How does Deno 2 compare to Bun?',
    faq4A: 'Both are modern JavaScript runtimes. Bun focuses on raw speed and Node.js drop-in compatibility. Deno focuses on security (permission system), web standards compliance, and TypeScript-first development. Deno 2 has better security defaults; Bun has faster startup and bundling.',
    faq5Q: 'Does Deno 2 support TypeScript out of the box?',
    faq5A: 'Yes. Deno supports TypeScript natively without any configuration. You can run .ts and .tsx files directly. Type checking can be enabled with the --check flag.',
  },
  zh: {
    title: 'Deno 2 完全指南：Node.js 兼容性、npm 支持和迁移',
    intro: 'Deno 2 代表了 JavaScript 和 TypeScript 运行时领域的重大进化。凭借完全的 Node.js 兼容性、原生 npm 包支持和精炼的开发体验，Deno 2 弥合了现代运行时愿景和现有 Node.js 生态系统实际需求之间的差距。',
    h2WhatNew: 'Deno 2 的新特性',
    whatNewDesc: 'Deno 2 引入了多项突破性变化，使其成为生产应用的实际选择。最重大的变化是与 Node.js 和 npm 的向后兼容性。',
    h3NodeCompat: '完全的 Node.js 兼容性',
    nodeCompatDesc: 'Deno 2 包含 Node.js 兼容层，支持绝大多数 Node.js 内置模块，包括 fs、path、http、crypto、stream 和 child_process。',
    h3NpmSupport: '原生 npm 支持',
    npmSupportDesc: 'Deno 2 可以使用 npm: 说明符直接导入 npm 包。默认不创建 node_modules 目录，包被全局缓存。',
    h3Permissions: '精细化权限系统',
    permissionsDesc: 'Deno 保留了安全优先的权限系统，但现在支持更细粒度的控制。可以允许特定的文件路径、网络主机和环境变量。',
    h3Std: '标准库更新',
    stdDesc: 'Deno 标准库已经稳定化并提供清晰的版本控制。关键模块包括文件操作、HTTP 服务器、测试工具和异步辅助函数。',
    h2GettingStarted: 'Deno 2 入门',
    gettingStartedDesc: '安装和运行 Deno 2 非常简单。Deno 作为单个二进制文件分发，没有外部依赖。',
    h2Config: '使用 deno.json 配置',
    configDesc: 'Deno 2 使用 deno.json（或 deno.jsonc）进行项目配置。此文件替代了 tsconfig.json 和 package.json。',
    h2NodeMigration: '从 Node.js 迁移',
    migrationDesc: '将现有 Node.js 项目迁移到 Deno 2 比以往任何时候都更加实际。以下是分步方法。',
    h3Step1: '步骤 1：添加 deno.json',
    step1Desc: '在项目根目录创建 deno.json 文件。过渡期间可以保留现有的 package.json。',
    h3Step2: '步骤 2：更新导入',
    step2Desc: '将 Node.js 内置导入转换为使用 node: 前缀。将 npm 包导入更新为使用 npm: 说明符。',
    h3Step3: '步骤 3：处理 CommonJS',
    step3Desc: 'Deno 2 通过 node: 兼容层支持 CommonJS 模块。对于你自己的代码，将 require() 转换为 ESM import。',
    h3Step4: '步骤 4：更新脚本',
    step4Desc: '用 deno.json 中的 Deno 任务替换 npm 脚本。Deno 任务支持类 shell 语法。',
    h2WebFrameworks: 'Deno 2 中的 Web 框架',
    webFrameworksDesc: 'Deno 2 支持多种方式构建 Web 应用，从内置的 Deno.serve() 到流行的框架。',
    h3Fresh: 'Fresh 框架',
    freshDesc: 'Fresh 是官方的 Deno Web 框架。它使用岛屿架构进行选择性客户端水合，支持 JSX/TSX。',
    h3Oak: 'Oak 中间件',
    oakDesc: 'Oak 是受 Koa.js 启发的中间件框架，为来自 Express/Koa 生态系统的开发者提供熟悉的 API。',
    h3Express: 'Express.js 兼容性',
    expressDesc: '得益于 npm 兼容性，你可以在 Deno 2 中直接运行 Express.js 应用，只需最小的更改。',
    h2Testing: 'Deno 2 中的测试',
    testingDesc: 'Deno 包含内置的测试运行器，支持断言、模拟、基准测试和代码覆盖率。无需额外的测试框架。',
    h2Deploy: '部署选项',
    deployDesc: 'Deno 2 应用可以部署到各种平台，包括 Deno Deploy、Docker 容器和传统 VPS。',
    h3DenoDeploy: 'Deno Deploy',
    denoDeployDesc: 'Deno Deploy 是专为 Deno 设计的全球分布式边缘托管平台，提供零配置部署和自动 HTTPS。',
    h3Docker: 'Docker 部署',
    dockerDesc: 'Deno 在 Docker 容器中运行良好。官方 Deno Docker 镜像轻量且适合生产使用。',
    h2Faq: '常见问题',
    faq1Q: '可以在 Deno 2 中使用现有的 npm 包吗？',
    faq1A: '可以。Deno 2 使用 npm: 说明符原生支持 npm 包。绝大多数 npm 包无需修改即可工作。',
    faq2Q: 'Deno 2 已经准备好用于生产了吗？',
    faq2A: '是的。Deno 2 为生产使用而设计。Slack、Netlify 和 Supabase 等公司在生产中使用 Deno。',
    faq3Q: '应该从 Node.js 迁移到 Deno 2 吗？',
    faq3A: '对于新项目，Deno 2 是出色的选择。对于现有项目，迁移是可行的但可选的。',
    faq4Q: 'Deno 2 与 Bun 相比如何？',
    faq4A: '两者都是现代 JavaScript 运行时。Bun 专注于原始速度，Deno 专注于安全性和 Web 标准合规性。',
    faq5Q: 'Deno 2 开箱即用支持 TypeScript 吗？',
    faq5A: '是的。Deno 原生支持 TypeScript，无需任何配置。可以直接运行 .ts 和 .tsx 文件。',
  },
};

export default function Deno2Guide({ lang }: { lang: string }) {
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

      {/* What's New */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WhatNew}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.whatNewDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NodeCompat}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.nodeCompatDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Using Node.js built-in modules in Deno 2
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { EventEmitter } from "node:events";

const content = readFileSync(join(".", "config.json"), "utf-8");
const hash = createHash("sha256").update(content).digest("hex");
console.log("Config hash:", hash);

// Node.js streams work too
import { Readable, Transform } from "node:stream";
const readable = Readable.from(["hello", "world"]);`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3NpmSupport}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.npmSupportDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Import npm packages directly
import express from "npm:express@4";
import { z } from "npm:zod";
import chalk from "npm:chalk@5";
import _ from "npm:lodash";

// Or use an import map in deno.json
// deno.json:
// {
//   "imports": {
//     "express": "npm:express@4",
//     "zod": "npm:zod",
//     "chalk": "npm:chalk@5"
//   }
// }

// Then import normally:
// import express from "express";`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Permissions}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.permissionsDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Granular permissions
deno run --allow-read=./data --allow-write=./output server.ts
deno run --allow-net=api.example.com:443 fetch.ts
deno run --allow-env=DATABASE_URL,API_KEY app.ts

# Allow all permissions (development only)
deno run --allow-all server.ts
# Or use the shorthand
deno run -A server.ts

# Run with no permissions (most secure)
deno run sandboxed.ts`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Std}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.stdDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Deno standard library (jsr:@std/)
import { ensureDir, copy } from "jsr:@std/fs";
import { parse } from "jsr:@std/flags";
import { assertEquals } from "jsr:@std/assert";
import { delay } from "jsr:@std/async";

await ensureDir("./output");
await copy("./src", "./output/src", { overwrite: true });

const args = parse(Deno.args, {
  string: ["port"],
  default: { port: "3000" },
});`}</code></pre>

      {/* Getting Started */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2GettingStarted}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.gettingStartedDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install Deno
curl -fsSL https://deno.land/install.sh | sh    # macOS/Linux
irm https://deno.land/install.ps1 | iex          # Windows

# Verify installation
deno --version
# deno 2.x.x
# v8 12.x.x
# typescript 5.x.x

# Create a new project
deno init my-project
cd my-project

# Run a TypeScript file directly
deno run main.ts

# Run with watch mode
deno run --watch main.ts

# Format, lint, and test
deno fmt
deno lint
deno test`}</code></pre>

      {/* Configuration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Config}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.configDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// deno.json
{
  "tasks": {
    "dev": "deno run --watch --allow-all main.ts",
    "start": "deno run --allow-net --allow-read main.ts",
    "test": "deno test --allow-all",
    "build": "deno compile --output=app main.ts"
  },
  "imports": {
    "@std/http": "jsr:@std/http@^1.0.0",
    "@std/assert": "jsr:@std/assert@^1.0.0",
    "express": "npm:express@4",
    "zod": "npm:zod@^3.22"
  },
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "fmt": {
    "semiColons": true,
    "singleQuote": true,
    "lineWidth": 100
  },
  "lint": {
    "rules": {
      "tags": ["recommended"]
    }
  }
}`}</code></pre>

      {/* Migration */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2NodeMigration}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.migrationDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step1}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step1Desc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step2}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step2Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Before (Node.js)
const fs = require("fs");
const path = require("path");
const express = require("express");

// After (Deno 2)
import fs from "node:fs";
import path from "node:path";
import express from "npm:express@4";

// Or use Deno-native APIs
const content = await Deno.readTextFile("./config.json");
const joined = new URL("./data/file.txt", import.meta.url);`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step3}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step3Desc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Step4}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.step4Desc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// package.json scripts:
// "scripts": {
//   "dev": "nodemon server.ts",
//   "test": "jest",
//   "build": "tsc && node dist/index.js"
// }

// deno.json tasks:
// "tasks": {
//   "dev": "deno run --watch --allow-all server.ts",
//   "test": "deno test --allow-all",
//   "build": "deno compile --output=app server.ts"
// }`}</code></pre>

      {/* Web Frameworks */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2WebFrameworks}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.webFrameworksDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>Deno.serve() (Built-in)</h3>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Simple HTTP server with Deno.serve()
Deno.serve({ port: 3000 }, async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/hello") {
    return Response.json({ message: "Hello from Deno 2!" });
  }

  if (url.pathname === "/api/data" && req.method === "POST") {
    const body = await req.json();
    return Response.json({ received: body }, { status: 201 });
  }

  return new Response("Not Found", { status: 404 });
});

console.log("Server running on http://localhost:3000");`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Express}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.expressDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// Express.js running in Deno 2
import express from "npm:express@4";
import cors from "npm:cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", (_req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.listen(3000, () => {
  console.log("Express on Deno 2: http://localhost:3000");
});`}</code></pre>

      {/* Testing */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Testing}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.testingDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`// math.test.ts
import { assertEquals, assertThrows } from "jsr:@std/assert";

function add(a: number, b: number): number {
  return a + b;
}

Deno.test("add function", () => {
  assertEquals(add(2, 3), 5);
  assertEquals(add(-1, 1), 0);
  assertEquals(add(0, 0), 0);
});

Deno.test("async test", async () => {
  const response = await fetch("https://api.example.com/data");
  assertEquals(response.status, 200);
});

Deno.test({
  name: "test with permissions",
  permissions: { read: true, net: false },
  fn() {
    const data = Deno.readTextFileSync("./test-data.txt");
    assertEquals(data.length > 0, true);
  },
});

// Run: deno test
// Run with coverage: deno test --coverage=./cov`}</code></pre>

      {/* Deployment */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>{t.h2Deploy}</h2>
      <p style={{ marginBottom: '1rem' }}>{t.deployDesc}</p>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3DenoDeploy}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.denoDeployDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Install deployctl
deno install -A jsr:@deno/deployctl

# Deploy to Deno Deploy
deployctl deploy --project=my-app main.ts

# Or link to GitHub for automatic deployments`}</code></pre>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '0.75rem' }}>{t.h3Docker}</h3>
      <p style={{ marginBottom: '1rem' }}>{t.dockerDesc}</p>
      <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', fontSize: '0.875rem' }}><code>{`# Dockerfile for Deno 2
FROM denoland/deno:2.0.0

WORKDIR /app

# Cache dependencies
COPY deno.json deno.lock ./
RUN deno install

# Copy source
COPY . .

# Cache the main module
RUN deno cache main.ts

EXPOSE 3000

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]`}</code></pre>

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
