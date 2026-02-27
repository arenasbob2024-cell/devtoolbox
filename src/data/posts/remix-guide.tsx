'use client';
import React from 'react';

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Remix Framework Guide 2026: Web Standards, Nested Routes, and Progressive Enhancement',
    intro: 'Remix is a full-stack React framework built on web standards that embraces progressive enhancement and server-side rendering. Instead of inventing new abstractions, Remix leverages the browser platform — using standard HTML forms, HTTP caching, and the Fetch API — to build fast, resilient web applications. Whether you are building a SaaS dashboard, e-commerce site, or content platform, Remix delivers a developer experience that produces applications working even before JavaScript loads in the browser.',
    tldr: 'Remix is a full-stack React framework that uses web standards (HTML forms, HTTP caching, Fetch API) for data loading via loaders, mutations via actions, and nested routing for parallel data fetching. It supports progressive enhancement out of the box, has built-in error boundaries at every route level, and deploys to any JavaScript runtime including Node.js, Cloudflare Workers, Deno, and Vercel Edge Functions.',
    keyTakeaway1: 'Remix uses web standards like HTML forms and HTTP caching instead of client-side state management, making apps work without JavaScript enabled.',
    keyTakeaway2: 'Nested routes enable parallel data loading and granular error boundaries, eliminating waterfall requests common in other frameworks.',
    keyTakeaway3: 'Loaders run on the server for GET requests and actions handle POST/PUT/DELETE, providing a clear separation of reads and writes.',
    keyTakeaway4: 'Progressive enhancement means forms and navigation work without JavaScript, then enhance with client-side transitions when JS loads.',
    keyTakeaway5: 'Remix deploys anywhere JavaScript runs — Node.js, Cloudflare Workers, Deno, Vercel, Fly.io, and AWS Lambda.',
    keyTakeaway6: 'Built-in streaming with defer allows you to send critical data immediately while loading slower data in parallel.',

    h2WhatIs: 'What Is Remix and Its Philosophy?',
    whatIsDesc: 'Remix is a React framework created by the team behind React Router. Its core philosophy is to build on the web platform rather than abstract it away. Where other frameworks introduce custom APIs for data fetching, caching, and mutations, Remix maps these operations directly to HTTP primitives — loaders correspond to GET requests, actions correspond to POST requests, and headers control caching.',
    whatIsDesc2: 'This approach means that a Remix application is fundamentally an HTTP server that renders React components. The framework handles the complexity of server rendering, code splitting, prefetching, and revalidation while exposing a simple mental model: every route is a module with a loader for reading data, an action for writing data, and a default export component for the UI.',

    h2Comparison: 'Remix vs Next.js Comparison',
    comparisonDesc: 'Both Remix and Next.js are full-stack React frameworks, but they differ significantly in their approach to data loading, routing, and rendering strategies.',

    h2Routing: 'File-Based Routing and Nested Routes',
    routingDesc: 'Remix uses a file-based routing system where files in the app/routes directory become URL routes. The key innovation is nested routing — routes can be nested inside parent routes, and each segment of the URL maps to a specific route module. Parent routes render an Outlet component where child routes appear.',
    routingDesc2: 'Nested routes are more than an organizational pattern. Each nested route loads its data in parallel with sibling routes, eliminating the waterfall pattern where a parent must finish loading before children can start. This parallel loading is one of the biggest performance advantages Remix offers.',

    h2Loaders: 'Loaders and Server-Side Data Loading',
    loadersDesc: 'Loaders are functions that run on the server to provide data to your route components. They execute on every GET request and return data that is automatically serialized and made available to the component via the useLoaderData hook. Loaders never run in the browser — they are server-only code.',
    loadersDesc2: 'Because loaders run on the server, you can safely access databases, call internal APIs, read environment variables, and use server-only dependencies directly. There is no need for an intermediate API layer or client-side fetching library.',

    h2Actions: 'Actions and Form Handling',
    actionsDesc: 'Actions are the counterpart to loaders. While loaders handle data reading (GET requests), actions handle data mutations (POST, PUT, PATCH, DELETE). When a form submits in Remix, the action function runs on the server, processes the form data, and Remix automatically revalidates all loaders on the page to show the updated data.',
    actionsDesc2: 'This pattern is inspired by how traditional HTML forms work. The form submits data to the server, the server processes it and redirects, and the browser fetches the new page. Remix enhances this flow with client-side transitions when JavaScript is available, but the core behavior works without JS.',

    h2ErrorBoundaries: 'Error Boundaries and Error Handling',
    errorDesc: 'Remix has built-in error handling at every route level using React error boundaries. Each route module can export an ErrorBoundary component that catches errors from its loader, action, or rendering. Because routes are nested, an error in a child route only replaces that portion of the page — the parent layout and sibling routes continue working.',
    errorDesc2: 'This granular error handling means a failing comment section does not take down the entire page. Users can still interact with the rest of the application while seeing a meaningful error message in the affected area.',

    h2ResourceRoutes: 'Resource Routes and API Endpoints',
    resourceDesc: 'Resource routes are routes that do not render a UI component. Instead, they return non-HTML responses like JSON, XML, images, or PDFs. You create a resource route by exporting a loader or action without a default component export. This makes Remix a capable API server alongside your UI routes.',
    resourceDesc2: 'Resource routes are useful for building API endpoints consumed by mobile apps, generating RSS feeds, creating webhook handlers, serving dynamic images, and handling file downloads.',

    h2Streaming: 'Streaming and Deferred Data',
    streamingDesc: 'Remix supports streaming responses using the defer utility and the Await component. Instead of waiting for all data to load before sending the response, you can send critical data immediately while slower data loads in the background. The browser progressively renders the page as data arrives.',
    streamingDesc2: 'This pattern is particularly valuable when you have a mix of fast and slow data sources. The user sees the page shell and critical content instantly, while less critical sections show loading states that resolve as their data arrives.',

    h2Styling: 'CSS and Styling Approaches',
    stylingDesc: 'Remix supports multiple CSS strategies. You can use plain CSS files with the links export, CSS modules, Tailwind CSS, CSS-in-JS libraries, and any other styling approach. The links export in route modules lets you load CSS files only for the routes that need them, automatically handling loading and unloading as users navigate.',
    stylingDesc2: 'Route-scoped CSS is a unique advantage. When a user navigates away from a route, Remix removes that route CSS from the page, preventing style accumulation that causes performance issues in large applications.',

    h2Auth: 'Authentication Patterns',
    authDesc: 'Authentication in Remix typically uses cookie-based sessions, aligning with web standards. Remix provides a session storage API that supports cookies, file-based sessions, and custom session backends. Because loaders and actions run on the server, you can validate sessions and protect routes without exposing authentication logic to the client.',
    authDesc2: 'The pattern is straightforward: create a session storage instance, read the session in your loader to check authentication, redirect unauthenticated users, and set the session in your action after login. Remix handles serializing the session cookie automatically.',

    h2Deployment: 'Deployment Targets',
    deploymentDesc: 'One of Remix greatest strengths is its runtime flexibility. Because Remix builds on the Web Fetch API standard, it runs anywhere that supports this API. Official adapters and community templates cover all major platforms.',
    h3Vercel: 'Deploying to Vercel',
    h3Cloudflare: 'Deploying to Cloudflare Workers',
    h3FlyIo: 'Deploying to Fly.io',

    h2Migration: 'Migration from Next.js to Remix',
    migrationDesc: 'Migrating from Next.js to Remix involves several conceptual shifts. The data loading model changes from getServerSideProps/getStaticProps to loaders, API routes become actions and resource routes, and pages directory structure maps to the routes directory with nested layouts.',
    migrationStep1: '1. Replace getServerSideProps with loader functions — the data flows through useLoaderData instead of page props.',
    migrationStep2: '2. Convert API routes to actions (for mutations) or resource routes (for GET endpoints).',
    migrationStep3: '3. Move _app.tsx and _document.tsx logic into root.tsx — Remix uses a single root route for document structure.',
    migrationStep4: '4. Replace next/link with Remix Link component and next/router with useNavigate or useLocation.',
    migrationStep5: '5. Replace next/image with standard img tags or a third-party image optimization service — Remix does not include built-in image optimization.',
    migrationStep6: '6. Convert useEffect-based data fetching to loaders for initial data and useFetcher for in-page mutations.',

    h2BestPractices: 'Best Practices and Performance',
    bpDesc: 'Following these practices will help you build performant and maintainable Remix applications.',
    bp1: 'Use loaders for all initial data loading instead of useEffect or client-side fetching libraries.',
    bp2: 'Leverage nested routes to parallelize data loading and provide granular error boundaries.',
    bp3: 'Use the native Form component instead of fetch calls for mutations — it enables progressive enhancement automatically.',
    bp4: 'Implement HTTP caching headers in your loaders using the headers export to enable CDN and browser caching.',
    bp5: 'Use defer for non-critical data that can load after the initial page render.',
    bp6: 'Prefer cookie-based sessions over JWT tokens stored in localStorage for authentication.',
    bp7: 'Use resource routes for API endpoints instead of creating a separate API server.',
    bp8: 'Leverage the prefetch prop on Link components to preload route data on hover or viewport entry.',
    bp9: 'Keep route modules focused — extract shared logic into utility files and shared UI into component files.',
    bp10: 'Use useFetcher for in-page mutations and data loading that should not cause a navigation.',

    h2Faq: 'Frequently Asked Questions',
    faq1Q: 'What is Remix used for?',
    faq1A: 'Remix is used for building full-stack React web applications including SaaS platforms, e-commerce sites, content management systems, dashboards, and any application that benefits from server-side rendering and progressive enhancement. Its web-standards approach makes it especially good for apps that need to work reliably across different network conditions.',
    faq2Q: 'How is Remix different from Next.js?',
    faq2A: 'Remix focuses on web standards and progressive enhancement, using HTML forms for mutations and HTTP caching for performance. Next.js offers more rendering strategies (SSG, ISR, SSR, RSC) and includes built-in image optimization. Remix has nested routes with parallel data loading, while Next.js uses a flat routing model with React Server Components for streaming.',
    faq3Q: 'Does Remix work without JavaScript enabled?',
    faq3A: 'Yes. Remix applications progressively enhance from a baseline of server-rendered HTML with standard form submissions. Navigation, form submissions, and core functionality work without client-side JavaScript. When JavaScript loads, Remix adds client-side transitions, optimistic UI, and pending states.',
    faq4Q: 'What is a loader in Remix?',
    faq4A: 'A loader is a server-side function exported from a route module that runs on every GET request. It fetches data from databases, APIs, or other sources and returns it to the route component. Loaders never run in the browser, so you can safely use server-only code like database queries and environment variables.',
    faq5Q: 'What is an action in Remix?',
    faq5A: 'An action is a server-side function exported from a route module that handles non-GET requests (POST, PUT, PATCH, DELETE). Actions process form submissions and mutations, then Remix automatically revalidates all loaders on the page to reflect the updated data. Actions enable the form-based mutation pattern that works with or without JavaScript.',
    faq6Q: 'Can I deploy Remix to Cloudflare Workers?',
    faq6A: 'Yes. Remix has an official Cloudflare adapter that lets you deploy to Cloudflare Workers and Pages. Because Remix builds on the Web Fetch API, it runs natively on edge runtimes. You get global distribution, low latency, and access to Cloudflare services like KV, D1, and R2.',
    faq7Q: 'How do nested routes work in Remix?',
    faq7A: 'Nested routes in Remix map URL segments to route modules arranged in a hierarchy. A parent route renders a layout with an Outlet component where the child route appears. Each nested route has its own loader, action, and error boundary. Data for all matched routes loads in parallel, eliminating request waterfalls.',
    faq8Q: 'Is Remix still maintained after the React Router merger?',
    faq8A: 'Yes. The Remix team merged the framework capabilities into React Router v7, which means React Router now includes all Remix features like loaders, actions, and server rendering. You can use React Router v7 as a full Remix replacement, and the team continues active development under the React Router name.',
  },
  zh: {
    title: 'Remix 框架指南 2026：Web 标准、嵌套路由与渐进增强',
    intro: 'Remix 是一个基于 Web 标准构建的全栈 React 框架，拥抱渐进增强和服务端渲染。Remix 不发明新抽象，而是利用浏览器平台——使用标准 HTML 表单、HTTP 缓存和 Fetch API——来构建快速、弹性的 Web 应用。无论你是构建 SaaS 仪表盘、电商网站还是内容平台，Remix 都能提供即使在 JavaScript 加载之前也能工作的应用。',
    tldr: 'Remix 是一个全栈 React 框架，使用 Web 标准（HTML 表单、HTTP 缓存、Fetch API）通过 loader 加载数据、通过 action 处理变更、通过嵌套路由并行获取数据。它开箱支持渐进增强，在每个路由层级都有内置错误边界，可部署到任何 JavaScript 运行时，包括 Node.js、Cloudflare Workers、Deno 和 Vercel Edge Functions。',
    keyTakeaway1: 'Remix 使用 HTML 表单和 HTTP 缓存等 Web 标准，而非客户端状态管理，使应用在禁用 JavaScript 时也能工作。',
    keyTakeaway2: '嵌套路由支持并行数据加载和细粒度错误边界，消除了其他框架中常见的瀑布请求。',
    keyTakeaway3: 'Loader 在服务端处理 GET 请求，Action 处理 POST/PUT/DELETE，提供读写操作的清晰分离。',
    keyTakeaway4: '渐进增强意味着表单和导航在没有 JavaScript 时也能工作，当 JS 加载后增强为客户端过渡。',
    keyTakeaway5: 'Remix 可以部署到任何运行 JavaScript 的地方——Node.js、Cloudflare Workers、Deno、Vercel、Fly.io 和 AWS Lambda。',
    keyTakeaway6: '内置的 defer 流式传输允许你立即发送关键数据，同时并行加载较慢的数据。',

    h2WhatIs: '什么是 Remix 及其设计理念？',
    whatIsDesc: 'Remix 是由 React Router 团队创建的 React 框架。其核心理念是在 Web 平台上构建，而非将其抽象化。Remix 将操作直接映射到 HTTP 原语——loader 对应 GET 请求，action 对应 POST 请求，headers 控制缓存。',
    whatIsDesc2: '这种方式意味着 Remix 应用本质上是一个渲染 React 组件的 HTTP 服务器。框架处理服务端渲染、代码分割、预取和重新验证的复杂性，同时暴露简单的心智模型：每个路由都是一个模块，有 loader 读取数据、action 写入数据、默认导出组件作为 UI。',

    h2Comparison: 'Remix vs Next.js 对比',
    comparisonDesc: 'Remix 和 Next.js 都是全栈 React 框架，但在数据加载、路由和渲染策略上有显著差异。',

    h2Routing: '基于文件的路由与嵌套路由',
    routingDesc: 'Remix 使用基于文件的路由系统，app/routes 目录中的文件成为 URL 路由。关键创新是嵌套路由——路由可以嵌套在父路由内，URL 的每个段映射到特定的路由模块。',
    routingDesc2: '嵌套路由不仅仅是组织模式。每个嵌套路由与兄弟路由并行加载数据，消除了父路由必须先加载完毕子路由才能开始的瀑布模式。',

    h2Loaders: 'Loader 与服务端数据加载',
    loadersDesc: 'Loader 是在服务端运行的函数，为路由组件提供数据。它们在每个 GET 请求时执行，返回的数据通过 useLoaderData hook 自动提供给组件。Loader 永远不在浏览器中运行。',
    loadersDesc2: '因为 loader 在服务端运行，你可以安全地访问数据库、调用内部 API、读取环境变量和使用服务端专用依赖。无需中间 API 层或客户端获取库。',

    h2Actions: 'Action 与表单处理',
    actionsDesc: 'Action 是 loader 的对应物。Loader 处理数据读取（GET 请求），action 处理数据变更（POST、PUT、PATCH、DELETE）。表单提交时，action 在服务端运行，处理表单数据，然后 Remix 自动重新验证页面上的所有 loader。',
    actionsDesc2: '这种模式的灵感来自传统 HTML 表单的工作方式。当 JavaScript 可用时，Remix 用客户端过渡增强此流程，但核心行为无需 JS 也能工作。',

    h2ErrorBoundaries: '错误边界与错误处理',
    errorDesc: 'Remix 使用 React 错误边界在每个路由层级内置错误处理。每个路由模块可以导出一个 ErrorBoundary 组件来捕获 loader、action 或渲染中的错误。由于路由是嵌套的，子路由的错误只替换页面的那部分。',
    errorDesc2: '这种细粒度的错误处理意味着评论区的失败不会导致整个页面崩溃。用户仍然可以与应用的其余部分交互。',

    h2ResourceRoutes: '资源路由与 API 端点',
    resourceDesc: '资源路由是不渲染 UI 组件的路由。它们返回 JSON、XML、图片或 PDF 等非 HTML 响应。通过导出 loader 或 action 而不导出默认组件来创建资源路由。',
    resourceDesc2: '资源路由适用于构建移动应用消费的 API 端点、生成 RSS feed、创建 webhook 处理器、提供动态图片和处理文件下载。',

    h2Streaming: '流式传输与延迟数据',
    streamingDesc: 'Remix 使用 defer 工具和 Await 组件支持流式响应。你可以立即发送关键数据，而较慢的数据在后台加载。浏览器在数据到达时逐步渲染页面。',
    streamingDesc2: '当你有快慢数据源混合时，这种模式特别有价值。用户立即看到页面骨架和关键内容，而不太关键的部分显示加载状态并在数据到达时解析。',

    h2Styling: 'CSS 与样式方案',
    stylingDesc: 'Remix 支持多种 CSS 策略。你可以使用纯 CSS 文件配合 links 导出、CSS Modules、Tailwind CSS、CSS-in-JS 库等。路由模块中的 links 导出让你仅为需要的路由加载 CSS 文件。',
    stylingDesc2: '路由作用域的 CSS 是独特优势。当用户离开一个路由时，Remix 会从页面移除该路由的 CSS，防止大型应用中样式累积导致的性能问题。',

    h2Auth: '认证模式',
    authDesc: 'Remix 中的认证通常使用基于 Cookie 的会话，符合 Web 标准。Remix 提供支持 Cookie、基于文件的会话和自定义会话后端的会话存储 API。',
    authDesc2: '模式很直观：创建会话存储实例，在 loader 中读取会话检查认证，重定向未认证用户，在 action 中登录后设置会话。',

    h2Deployment: '部署目标',
    deploymentDesc: 'Remix 最大的优势之一是运行时灵活性。因为构建在 Web Fetch API 标准上，它可以在任何支持此 API 的地方运行。',
    h3Vercel: '部署到 Vercel',
    h3Cloudflare: '部署到 Cloudflare Workers',
    h3FlyIo: '部署到 Fly.io',

    h2Migration: '从 Next.js 迁移到 Remix',
    migrationDesc: '从 Next.js 迁移到 Remix 涉及几个概念转变。数据加载模型从 getServerSideProps/getStaticProps 变为 loader，API 路由变为 action 和资源路由。',
    migrationStep1: '1. 用 loader 函数替换 getServerSideProps——数据通过 useLoaderData 而非页面 props 流转。',
    migrationStep2: '2. 将 API 路由转换为 action（变更）或资源路由（GET 端点）。',
    migrationStep3: '3. 将 _app.tsx 和 _document.tsx 逻辑移入 root.tsx——Remix 使用单个根路由作为文档结构。',
    migrationStep4: '4. 用 Remix Link 组件替换 next/link，用 useNavigate 或 useLocation 替换 next/router。',
    migrationStep5: '5. 用标准 img 标签或第三方图片优化服务替换 next/image——Remix 不包含内置图片优化。',
    migrationStep6: '6. 将基于 useEffect 的数据获取转换为 loader（初始数据）和 useFetcher（页面内变更）。',

    h2BestPractices: '最佳实践与性能',
    bpDesc: '遵循这些实践将帮助你构建高性能、可维护的 Remix 应用。',
    bp1: '使用 loader 进行所有初始数据加载，而非 useEffect 或客户端获取库。',
    bp2: '利用嵌套路由并行化数据加载并提供细粒度错误边界。',
    bp3: '使用原生 Form 组件而非 fetch 调用进行变更——它自动启用渐进增强。',
    bp4: '在 loader 中通过 headers 导出实现 HTTP 缓存头以启用 CDN 和浏览器缓存。',
    bp5: '对非关键数据使用 defer，允许它在初始页面渲染后加载。',
    bp6: '认证优先使用基于 Cookie 的会话，而非存储在 localStorage 中的 JWT 令牌。',
    bp7: '使用资源路由作为 API 端点，而非创建单独的 API 服务器。',
    bp8: '利用 Link 组件的 prefetch 属性在悬停或进入视口时预加载路由数据。',
    bp9: '保持路由模块的专注——将共享逻辑提取到工具文件，共享 UI 提取到组件文件。',
    bp10: '使用 useFetcher 进行不应引起导航的页面内变更和数据加载。',

    h2Faq: '常见问题',
    faq1Q: 'Remix 用来做什么？',
    faq1A: 'Remix 用于构建全栈 React Web 应用，包括 SaaS 平台、电商网站、内容管理系统、仪表盘等。其 Web 标准方式使其特别适合需要在不同网络条件下可靠工作的应用。',
    faq2Q: 'Remix 和 Next.js 有什么不同？',
    faq2A: 'Remix 专注于 Web 标准和渐进增强，使用 HTML 表单进行变更，HTTP 缓存进行性能优化。Next.js 提供更多渲染策略（SSG、ISR、SSR、RSC）并包含内置图片优化。Remix 的嵌套路由支持并行数据加载，Next.js 使用 React Server Components 进行流式传输。',
    faq3Q: 'Remix 在禁用 JavaScript 时能工作吗？',
    faq3A: '可以。Remix 应用从服务端渲染 HTML 和标准表单提交的基线渐进增强。导航、表单提交和核心功能无需客户端 JavaScript 即可工作。',
    faq4Q: '什么是 Remix 中的 Loader？',
    faq4A: 'Loader 是从路由模块导出的服务端函数，在每个 GET 请求时运行。它从数据库、API 或其他源获取数据并返回给路由组件。Loader 永远不在浏览器中运行。',
    faq5Q: '什么是 Remix 中的 Action？',
    faq5A: 'Action 是处理非 GET 请求（POST、PUT、PATCH、DELETE）的服务端函数。Action 处理表单提交和变更，然后 Remix 自动重新验证页面上的所有 loader 以反映更新的数据。',
    faq6Q: '可以将 Remix 部署到 Cloudflare Workers 吗？',
    faq6A: '可以。Remix 有官方 Cloudflare 适配器。因为 Remix 构建在 Web Fetch API 上，它原生运行在边缘运行时，提供全球分发、低延迟和 Cloudflare KV、D1、R2 等服务的访问。',
    faq7Q: 'Remix 中的嵌套路由如何工作？',
    faq7A: '嵌套路由将 URL 段映射到按层次排列的路由模块。父路由渲染带有 Outlet 组件的布局，子路由出现在其中。每个嵌套路由有自己的 loader、action 和错误边界，所有匹配路由的数据并行加载。',
    faq8Q: 'Remix 在与 React Router 合并后还在维护吗？',
    faq8A: '是的。Remix 团队将框架功能合并到了 React Router v7 中，这意味着 React Router 现在包含所有 Remix 功能。团队在 React Router 名称下继续积极开发。',
  },
};

export default function RemixGuide({ lang }: { lang: string }) {
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

      {/* What Is Remix */}
      <h2 style={sectionTitle}>{t.h2WhatIs}</h2>
      <p style={para}>{t.whatIsDesc}</p>
      <p style={para}>{t.whatIsDesc2}</p>

      <pre style={codeBlock}><code>{'# Create a new Remix project\n'
        + 'npx create-remix@latest my-remix-app\n'
        + '\n'
        + '# Project structure\n'
        + 'my-remix-app/\n'
        + '  app/\n'
        + '    entry.client.tsx    # Client entry point\n'
        + '    entry.server.tsx    # Server entry point\n'
        + '    root.tsx            # Root layout route\n'
        + '    routes/             # File-based routes\n'
        + '  public/               # Static assets\n'
        + '  remix.config.js       # Remix configuration\n'
        + '  package.json'}</code></pre>

      {/* Remix vs Next.js */}
      <h2 style={sectionTitle}>{t.h2Comparison}</h2>
      <p style={para}>{t.comparisonDesc}</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Feature</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Remix</th>
              <th style={{ border: '1px solid #e2e8f0', padding: '8px 12px', textAlign: 'left' }}>Next.js</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Data Loading', 'Loaders (server-only)', 'RSC / getServerSideProps'],
              ['Mutations', 'Actions + HTML Forms', 'Server Actions / API Routes'],
              ['Routing', 'Nested routes with Outlet', 'Flat + layout groups'],
              ['Rendering', 'SSR + Streaming', 'SSR / SSG / ISR / RSC'],
              ['Progressive Enhancement', 'Built-in (works without JS)', 'Manual implementation'],
              ['Image Optimization', 'No built-in solution', 'next/image built-in'],
              ['Caching Strategy', 'HTTP Cache-Control headers', 'ISR + Data Cache'],
              ['Runtime Targets', 'Any JS runtime (edge/node)', 'Node.js + Edge Runtime'],
              ['Error Handling', 'Per-route ErrorBoundary', 'error.tsx per segment'],
              ['Form Handling', 'Native Form + useActionData', 'Server Actions + useFormState'],
            ].map(([feature, remix, next], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px', fontWeight: 600 }}>{feature}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{remix}</td>
                <td style={{ border: '1px solid #e2e8f0', padding: '8px 12px' }}>{next}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File-Based Routing */}
      <h2 style={sectionTitle}>{t.h2Routing}</h2>
      <p style={para}>{t.routingDesc}</p>
      <p style={para}>{t.routingDesc2}</p>

      <pre style={codeBlock}><code>{'// File-based routing examples\n'
        + '// app/routes/_index.tsx        -> /\n'
        + '// app/routes/about.tsx         -> /about\n'
        + '// app/routes/blog._index.tsx   -> /blog\n'
        + '// app/routes/blog.\\$slug.tsx   -> /blog/:slug\n'
        + '// app/routes/blog.tsx          -> /blog (layout)\n'
        + '\n'
        + '// app/routes/blog.tsx — Parent layout route\n'
        + 'import { Outlet } from "@remix-run/react";\n'
        + '\n'
        + 'export default function BlogLayout() {\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>My Blog</h1>\n'
        + '      <nav>/* shared blog navigation */</nav>\n'
        + '      <Outlet />  {/* Child route renders here */}\n'
        + '    </div>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// app/routes/blog._index.tsx — Blog listing\n'
        + 'export default function BlogIndex() {\n'
        + '  return <p>Select a blog post from the list.</p>;\n'
        + '}'}</code></pre>

      {/* Loaders */}
      <h2 style={sectionTitle}>{t.h2Loaders}</h2>
      <p style={para}>{t.loadersDesc}</p>
      <p style={para}>{t.loadersDesc2}</p>

      <pre style={codeBlock}><code>{'import { json } from "@remix-run/node";\n'
        + 'import type { LoaderFunctionArgs } from "@remix-run/node";\n'
        + 'import { useLoaderData } from "@remix-run/react";\n'
        + 'import { db } from "~/utils/db.server";\n'
        + '\n'
        + '// Loader runs on the server for every GET request\n'
        + 'export async function loader({ params }: LoaderFunctionArgs) {\n'
        + '  const post = await db.post.findUnique({\n'
        + '    where: { slug: params.slug },\n'
        + '  });\n'
        + '\n'
        + '  if (!post) {\n'
        + '    throw new Response("Not Found", { status: 404 });\n'
        + '  }\n'
        + '\n'
        + '  return json({ post });\n'
        + '}\n'
        + '\n'
        + '// Component receives loader data via hook\n'
        + 'export default function BlogPost() {\n'
        + '  const { post } = useLoaderData<typeof loader>();\n'
        + '  return (\n'
        + '    <article>\n'
        + '      <h1>{post.title}</h1>\n'
        + '      <div dangerouslySetInnerHTML={{ __html: post.content }} />\n'
        + '    </article>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Actions */}
      <h2 style={sectionTitle}>{t.h2Actions}</h2>
      <p style={para}>{t.actionsDesc}</p>
      <p style={para}>{t.actionsDesc2}</p>

      <pre style={codeBlock}><code>{'import { json, redirect } from "@remix-run/node";\n'
        + 'import type { ActionFunctionArgs } from "@remix-run/node";\n'
        + 'import { Form, useActionData } from "@remix-run/react";\n'
        + '\n'
        + 'export async function action({ request }: ActionFunctionArgs) {\n'
        + '  const formData = await request.formData();\n'
        + '  const title = formData.get("title");\n'
        + '  const content = formData.get("content");\n'
        + '\n'
        + '  const errors: Record<string, string> = {};\n'
        + '  if (!title) errors.title = "Title is required";\n'
        + '  if (!content) errors.content = "Content is required";\n'
        + '\n'
        + '  if (Object.keys(errors).length > 0) {\n'
        + '    return json({ errors }, { status: 400 });\n'
        + '  }\n'
        + '\n'
        + '  const post = await db.post.create({\n'
        + '    data: { title: String(title), content: String(content) },\n'
        + '  });\n'
        + '\n'
        + '  return redirect("/blog/" + post.slug);\n'
        + '}\n'
        + '\n'
        + 'export default function NewPost() {\n'
        + '  const actionData = useActionData<typeof action>();\n'
        + '  return (\n'
        + '    <Form method="post">\n'
        + '      <label>\n'
        + '        Title\n'
        + '        <input type="text" name="title" />\n'
        + '      </label>\n'
        + '      {actionData?.errors?.title && (\n'
        + '        <p style={{ color: "red" }}>{actionData.errors.title}</p>\n'
        + '      )}\n'
        + '      <label>\n'
        + '        Content\n'
        + '        <textarea name="content" rows={10} />\n'
        + '      </label>\n'
        + '      {actionData?.errors?.content && (\n'
        + '        <p style={{ color: "red" }}>{actionData.errors.content}</p>\n'
        + '      )}\n'
        + '      <button type="submit">Create Post</button>\n'
        + '    </Form>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Error Boundaries */}
      <h2 style={sectionTitle}>{t.h2ErrorBoundaries}</h2>
      <p style={para}>{t.errorDesc}</p>
      <p style={para}>{t.errorDesc2}</p>

      <pre style={codeBlock}><code>{'import { useRouteError, isRouteErrorResponse } from "@remix-run/react";\n'
        + '\n'
        + '// Each route can export its own ErrorBoundary\n'
        + 'export function ErrorBoundary() {\n'
        + '  const error = useRouteError();\n'
        + '\n'
        + '  if (isRouteErrorResponse(error)) {\n'
        + '    return (\n'
        + '      <div>\n'
        + '        <h2>{error.status} {error.statusText}</h2>\n'
        + '        <p>{error.data}</p>\n'
        + '      </div>\n'
        + '    );\n'
        + '  }\n'
        + '\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h2>Something went wrong</h2>\n'
        + '      <p>{error instanceof Error ? error.message : "Unknown error"}</p>\n'
        + '    </div>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// Errors bubble up to nearest ErrorBoundary\n'
        + '// Parent layouts keep working when child errors\n'
        + '// app/routes/dashboard.tsx (layout with error boundary)\n'
        + '// app/routes/dashboard.analytics.tsx (if this errors,\n'
        + '//   only the analytics panel shows error UI,\n'
        + '//   sidebar and header keep working)'}</code></pre>

      {/* Resource Routes */}
      <h2 style={sectionTitle}>{t.h2ResourceRoutes}</h2>
      <p style={para}>{t.resourceDesc}</p>
      <p style={para}>{t.resourceDesc2}</p>

      <pre style={codeBlock}><code>{'// app/routes/api.posts.tsx — JSON API endpoint\n'
        + 'import { json } from "@remix-run/node";\n'
        + 'import type { LoaderFunctionArgs } from "@remix-run/node";\n'
        + '\n'
        + 'export async function loader({ request }: LoaderFunctionArgs) {\n'
        + '  const url = new URL(request.url);\n'
        + '  const page = Number(url.searchParams.get("page") || "1");\n'
        + '  const posts = await db.post.findMany({\n'
        + '    take: 20,\n'
        + '    skip: (page - 1) * 20,\n'
        + '  });\n'
        + '  return json({ posts, page });\n'
        + '}\n'
        + '\n'
        + '// app/routes/rss[.]xml.tsx — RSS feed\n'
        + 'export async function loader() {\n'
        + '  const posts = await db.post.findMany({ take: 25 });\n'
        + '  const rss = generateRssFeed(posts);\n'
        + '  return new Response(rss, {\n'
        + '    headers: {\n'
        + '      "Content-Type": "application/xml",\n'
        + '      "Cache-Control": "public, max-age=3600",\n'
        + '    },\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Streaming */}
      <h2 style={sectionTitle}>{t.h2Streaming}</h2>
      <p style={para}>{t.streamingDesc}</p>
      <p style={para}>{t.streamingDesc2}</p>

      <pre style={codeBlock}><code>{'import { defer } from "@remix-run/node";\n'
        + 'import { Await, useLoaderData } from "@remix-run/react";\n'
        + 'import { Suspense } from "react";\n'
        + '\n'
        + 'export async function loader() {\n'
        + '  // Critical data — awaited before sending response\n'
        + '  const product = await db.product.findUnique({ where: { id: 1 } });\n'
        + '\n'
        + '  // Non-critical data — streams in after initial render\n'
        + '  const reviewsPromise = db.review.findMany({ where: { productId: 1 } });\n'
        + '  const relatedPromise = db.product.findMany({ where: { categoryId: product.categoryId } });\n'
        + '\n'
        + '  return defer({\n'
        + '    product,                   // Resolved — available immediately\n'
        + '    reviews: reviewsPromise,    // Promise — streams in later\n'
        + '    related: relatedPromise,    // Promise — streams in later\n'
        + '  });\n'
        + '}\n'
        + '\n'
        + 'export default function ProductPage() {\n'
        + '  const { product, reviews, related } = useLoaderData<typeof loader>();\n'
        + '  return (\n'
        + '    <div>\n'
        + '      <h1>{product.name}</h1>\n'
        + '      <p>{product.description}</p>\n'
        + '\n'
        + '      <Suspense fallback={<p>Loading reviews...</p>}>\n'
        + '        <Await resolve={reviews}>\n'
        + '          {(resolvedReviews) => (\n'
        + '            <ul>\n'
        + '              {resolvedReviews.map((r) => (\n'
        + '                <li key={r.id}>{r.text}</li>\n'
        + '              ))}\n'
        + '            </ul>\n'
        + '          )}\n'
        + '        </Await>\n'
        + '      </Suspense>\n'
        + '    </div>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* Styling */}
      <h2 style={sectionTitle}>{t.h2Styling}</h2>
      <p style={para}>{t.stylingDesc}</p>
      <p style={para}>{t.stylingDesc2}</p>

      <pre style={codeBlock}><code>{'// Route-scoped CSS with links export\n'
        + 'import type { LinksFunction } from "@remix-run/node";\n'
        + 'import styles from "~/styles/dashboard.css?url";\n'
        + '\n'
        + 'export const links: LinksFunction = () => [\n'
        + '  { rel: "stylesheet", href: styles },\n'
        + '];\n'
        + '\n'
        + '// Tailwind CSS setup\n'
        + '// 1. Install: npm install -D tailwindcss postcss autoprefixer\n'
        + '// 2. Add tailwind.config.ts\n'
        + '// 3. Import in app/root.tsx:\n'
        + 'import stylesheet from "~/tailwind.css?url";\n'
        + '\n'
        + 'export const links: LinksFunction = () => [\n'
        + '  { rel: "stylesheet", href: stylesheet },\n'
        + '];\n'
        + '\n'
        + '// CSS Modules\n'
        + 'import styles from "./button.module.css";\n'
        + '\n'
        + 'export function Button({ children }) {\n'
        + '  return <button className={styles.primary}>{children}</button>;\n'
        + '}'}</code></pre>

      {/* Authentication */}
      <h2 style={sectionTitle}>{t.h2Auth}</h2>
      <p style={para}>{t.authDesc}</p>
      <p style={para}>{t.authDesc2}</p>

      <pre style={codeBlock}><code>{'// app/utils/session.server.ts\n'
        + 'import { createCookieSessionStorage, redirect } from "@remix-run/node";\n'
        + '\n'
        + 'const sessionStorage = createCookieSessionStorage({\n'
        + '  cookie: {\n'
        + '    name: "__session",\n'
        + '    httpOnly: true,\n'
        + '    maxAge: 60 * 60 * 24 * 7, // 1 week\n'
        + '    path: "/",\n'
        + '    sameSite: "lax",\n'
        + '    secrets: [process.env.SESSION_SECRET!],\n'
        + '    secure: process.env.NODE_ENV === "production",\n'
        + '  },\n'
        + '});\n'
        + '\n'
        + 'export async function requireUser(request: Request) {\n'
        + '  const session = await sessionStorage.getSession(\n'
        + '    request.headers.get("Cookie")\n'
        + '  );\n'
        + '  const userId = session.get("userId");\n'
        + '  if (!userId) throw redirect("/login");\n'
        + '  return userId;\n'
        + '}\n'
        + '\n'
        + 'export async function createUserSession(userId: string, redirectTo: string) {\n'
        + '  const session = await sessionStorage.getSession();\n'
        + '  session.set("userId", userId);\n'
        + '  return redirect(redirectTo, {\n'
        + '    headers: {\n'
        + '      "Set-Cookie": await sessionStorage.commitSession(session),\n'
        + '    },\n'
        + '  });\n'
        + '}'}</code></pre>

      {/* Deployment */}
      <h2 style={sectionTitle}>{t.h2Deployment}</h2>
      <p style={para}>{t.deploymentDesc}</p>

      <h3 style={subTitle}>{t.h3Vercel}</h3>
      <pre style={codeBlock}><code>{'# Create Remix app with Vercel template\n'
        + 'npx create-remix@latest --template remix-run/remix/templates/vercel\n'
        + '\n'
        + '# remix.config.js\n'
        + 'module.exports = {\n'
        + '  serverBuildTarget: "vercel",\n'
        + '  server: process.env.NODE_ENV === "development"\n'
        + '    ? undefined\n'
        + '    : "./server.js",\n'
        + '};\n'
        + '\n'
        + '# Deploy\n'
        + 'npx vercel --prod'}</code></pre>

      <h3 style={subTitle}>{t.h3Cloudflare}</h3>
      <pre style={codeBlock}><code>{'# Create Remix app for Cloudflare Workers\n'
        + 'npx create-remix@latest --template remix-run/remix/templates/cloudflare-workers\n'
        + '\n'
        + '# wrangler.toml\n'
        + 'name = "my-remix-app"\n'
        + 'main = "./build/index.js"\n'
        + 'compatibility_date = "2024-01-01"\n'
        + '\n'
        + '[site]\n'
        + 'bucket = "./public"\n'
        + '\n'
        + '# Access Cloudflare bindings in loaders\n'
        + '# export async function loader({ context }) {\n'
        + '#   const kv = context.env.MY_KV;\n'
        + '#   const value = await kv.get("key");\n'
        + '#   return json({ value });\n'
        + '# }\n'
        + '\n'
        + '# Deploy\n'
        + 'npx wrangler deploy'}</code></pre>

      <h3 style={subTitle}>{t.h3FlyIo}</h3>
      <pre style={codeBlock}><code>{'# Create Remix app with Fly.io template\n'
        + 'npx create-remix@latest --template remix-run/remix/templates/fly\n'
        + '\n'
        + '# fly.toml\n'
        + 'app = "my-remix-app"\n'
        + 'primary_region = "iad"\n'
        + '\n'
        + '[http_service]\n'
        + '  internal_port = 3000\n'
        + '  force_https = true\n'
        + '  auto_stop_machines = true\n'
        + '  auto_start_machines = true\n'
        + '\n'
        + '# Dockerfile (included in template)\n'
        + '# Multi-stage build for minimal image size\n'
        + '\n'
        + '# Deploy\n'
        + 'fly launch\n'
        + 'fly deploy'}</code></pre>

      {/* Migration */}
      <h2 style={sectionTitle}>{t.h2Migration}</h2>
      <p style={para}>{t.migrationDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.migrationStep1}</li>
        <li style={listItem}>{t.migrationStep2}</li>
        <li style={listItem}>{t.migrationStep3}</li>
        <li style={listItem}>{t.migrationStep4}</li>
        <li style={listItem}>{t.migrationStep5}</li>
        <li style={listItem}>{t.migrationStep6}</li>
      </ul>

      <pre style={codeBlock}><code>{'// Next.js — getServerSideProps\n'
        + 'export async function getServerSideProps({ params }) {\n'
        + '  const post = await db.post.findUnique({ where: { slug: params.slug } });\n'
        + '  return { props: { post } };\n'
        + '}\n'
        + 'export default function Post({ post }) {\n'
        + '  return <h1>{post.title}</h1>;\n'
        + '}\n'
        + '\n'
        + '// Remix equivalent — loader\n'
        + 'import { json } from "@remix-run/node";\n'
        + 'import { useLoaderData } from "@remix-run/react";\n'
        + '\n'
        + 'export async function loader({ params }) {\n'
        + '  const post = await db.post.findUnique({ where: { slug: params.slug } });\n'
        + '  if (!post) throw new Response("Not Found", { status: 404 });\n'
        + '  return json({ post });\n'
        + '}\n'
        + 'export default function Post() {\n'
        + '  const { post } = useLoaderData<typeof loader>();\n'
        + '  return <h1>{post.title}</h1>;\n'
        + '}'}</code></pre>

      {/* Best Practices */}
      <h2 style={sectionTitle}>{t.h2BestPractices}</h2>
      <p style={para}>{t.bpDesc}</p>
      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={listItem}>{t.bp1}</li>
        <li style={listItem}>{t.bp2}</li>
        <li style={listItem}>{t.bp3}</li>
        <li style={listItem}>{t.bp4}</li>
        <li style={listItem}>{t.bp5}</li>
        <li style={listItem}>{t.bp6}</li>
        <li style={listItem}>{t.bp7}</li>
        <li style={listItem}>{t.bp8}</li>
        <li style={listItem}>{t.bp9}</li>
        <li style={listItem}>{t.bp10}</li>
      </ul>

      <pre style={codeBlock}><code>{'// HTTP caching with headers export\n'
        + 'import type { HeadersFunction } from "@remix-run/node";\n'
        + '\n'
        + 'export const headers: HeadersFunction = () => ({\n'
        + '  "Cache-Control": "public, max-age=300, s-maxage=3600",\n'
        + '});\n'
        + '\n'
        + '// Prefetching links for faster navigation\n'
        + 'import { Link } from "@remix-run/react";\n'
        + '\n'
        + 'function Nav() {\n'
        + '  return (\n'
        + '    <nav>\n'
        + '      <Link to="/dashboard" prefetch="intent">\n'
        + '        Dashboard\n'
        + '      </Link>\n'
        + '      <Link to="/settings" prefetch="viewport">\n'
        + '        Settings\n'
        + '      </Link>\n'
        + '    </nav>\n'
        + '  );\n'
        + '}\n'
        + '\n'
        + '// useFetcher for non-navigation mutations\n'
        + 'import { useFetcher } from "@remix-run/react";\n'
        + '\n'
        + 'function LikeButton({ postId }) {\n'
        + '  const fetcher = useFetcher();\n'
        + '  const isLiking = fetcher.state !== "idle";\n'
        + '  return (\n'
        + '    <fetcher.Form method="post" action="/api/like">\n'
        + '      <input type="hidden" name="postId" value={postId} />\n'
        + '      <button type="submit" disabled={isLiking}>\n'
        + '        {isLiking ? "Liking..." : "Like"}\n'
        + '      </button>\n'
        + '    </fetcher.Form>\n'
        + '  );\n'
        + '}'}</code></pre>

      {/* FAQ */}
      <h2 style={sectionTitle}>{t.h2Faq}</h2>
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
          <p style={{ lineHeight: '1.7' }}>{faq.a}</p>
        </div>
      ))}
    </article>
  );
}
